




		
		var db;
		$(document).ready(function() {
			
			setTimeout(function() {
				$("#intro").remove();
				$("#content_home").show();
				$("#navbar_home").show();
				Carica();
			}, 3000);
		
		/* creo il database o se esiste lo richiamo */
		var shortName = 'Pagerank';
		var version = '1.0';
		var displayName = 'Quick Pagerank';
		var maxSize = 65536;
		db = openDatabase(shortName, version, displayName, maxSize);
		db.transaction(function(tx){
				tx.executeSql(
					'CREATE TABLE IF NOT EXISTS website ' +
					' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
					' url TEXT NOT NULL); '
				);
			}
		);

		});
	

		/* function per salvare i dati */
		function Salva(){
		
			$("#progress_pagerank").show();
			
			var pattern = new RegExp(); 
			pattern.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$"); 
			var val_url = $('#val-url').val(); //recupero il valore input
			
			var http = val_url.indexOf("http://", 0); //controllo se è stato inserito http://
			if(http!=0){ val_url="http://"+val_url; } //altrimenti lo aggiungo

			if((val_url!="") && pattern.test(val_url)){
			
				/* connessione db -> SQL per inserire i dati -> se ha successo uso la connessione e i risultati */
				db.transaction(function(tx){
					tx.executeSql(
						'INSERT INTO website ' +
						' (url) VALUES (?); ', 
						[val_url], function(){
							/* connessione db -> SQL per richiamare l'ultimo id inserito -> se ha successo uso la connessione e i risultati */
							db.transaction(function(tx){
								tx.executeSql('SELECT last_insert_rowid() AS numero_id;', [], function(tx, result){
						
									for (var i=0; i < result.rows.length; ++i){
										var row = result.rows.item(i);
										var key = row['numero_id']+1;
									}
									
								CalcolaPR(val_url, key); //calcolo il PR
								$("#val-url").val(""); //resetto l'input
								
								});
						
							});
			
						});
						
					});
				
			}
			else{
				alert("Please insert valid url!");
			}
			
			$("#progress_pagerank").hide();

		}
		
		/* function caricamento PR */
		function CalcolaPR(url, key){

			$("#progress_pagerank").show();
			
			link="http://www.quickapp.it/resources/pagerank.php?url="+url;
			//alert(''+link);
			jQuery.ajax({
				url: link,
				type: 'GET',
				dataType: 'jsonp',
				timeout: 60000,
				error: function(){ 
					alert("Errore!");
				},
				success: function(json){
					CaricaHtml(json.messaggio, url, key); //se recuperati i dati JSON avvio la function che aggiunge il nuovo HTML
				}	
			});
			
		}
			
		
		/* function di caricamento HTML */
		function CaricaHtml(pagerank, url, key){

			var html_key = "<li id=\""+key+"\"><a href=\""+url+"\" rel=\"external\" data-transition=\"slide\">"+url+"</a> <span class=\"ui-li-count\">"+pagerank+"</span><a href=\"#\" onclick=\"javascript:Cancella('"+key+"')\" data-role=\"button\" data-icon=\"delete\" data-theme=\"a\">Delete</a></li>";
			$('#lista-url').append(html_key);
			$("#lista-url").listview("refresh");
			$("#progress_pagerank").hide();
			
		}
		
		function Carica(){

			$("#progress_pagerank").show();
			$("#lista-url").empty();
			
			/* connessione db -> SQL per richiamare i dati -> se ha successo uso la connessione e i risultati */
			db.transaction(function(tx){
					tx.executeSql('SELECT * FROM  website ORDER BY url;', [], function(tx, result){
						
						for (var i=0; i < result.rows.length; ++i){
						
							var row = result.rows.item(i);
							var urldb = row['url'];
							var key = row['id'];

							CalcolaPR(urldb, key); //avvio la function che calcola il PR
							
						}
					});
				});
				
				$("#progress_pagerank").hide();
		
		}
		
		/* function cancella dati */
		function Cancella(key){

			/* connessione db -> SQL per cancellare i dati -> se ha successo rimuovo html */
			db.transaction(function(tx){
				tx.executeSql(
					'DELETE FROM website WHERE id=?; ', 
					[key], function(){	
						$('#'+key).remove();
				});
			
			});
			
		}
		
		function CancellaTutto(){
		
			db.transaction(function(tx){
				tx.executeSql(
					'DELETE FROM website; '
				);
				});
			
			$("#lista-url").empty();
			$("#lista-url").listview("refresh");
			
		}

