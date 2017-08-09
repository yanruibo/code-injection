




		
		$(document).ready(function() {
			
			setTimeout(function() {
				$("#intro").remove();
				$("#content_home").show();
				$("#navbar_home").show();
				CaricaRSS();
			}, 3000);
			
		});
	

function InvioDati(campi){

			//alert(''+campi);
			
			var array_campi = campi.split(":");
			var linkFinale = "";

			for (x=0; x<array_campi.length; x++){
				
				//alert(''+array_campi[x]);
				
				var valore = document.getElementById(array_campi[x]).value;				
				valore = encodeURIComponent(valore);
				
				//alert(''+valore);
				
				/* splitto la stringa perché ci sono nomi di var che possono essere uguali tra le varie formule;
				ho usato - perché _ l'ho usato per gli ID dei campi quindi ce ne sarebbero stati di più nell'ID */
				var campo=array_campi[x].split("-");

				//alert(''+campo[0]+' '+valore);
				linkFinale	= linkFinale+"&"+campo[0]+"="+valore;
				
				//alert(''+linkFinale);
			}
			
			return linkFinale;

		}


function CaricaRSS(){

	var div_progress="progress_lista";
	var lista_ul="lista-androidplaya";
	$("#"+div_progress).show();
	$("#"+lista_ul).empty();
	
	link="http://www.quickapp.it/resources/androidplaya.php?pagina=rss";
	//alert(''+link);
			
			jQuery.ajax({
				url: link,
				type: 'GET',
				dataType: 'jsonp',
				timeout: 60000,
				error: function(){ 
					alert("Errore!");
					$("#"+div_progress).hide();
				},
				success: function(json){

					var html_lista="<li data-role=\"list-divider\">News da Android Playa</li>";
					$("#"+lista_ul).append(html_lista);
					$("#"+lista_ul).listview("refresh");
						
					for(i=0; i<json.length; i++){
						
						var html_articoli  = "<li><a href=\"#articolo\" onclick=\"javascript:CaricaGuid('"+json[i].guid+"')\">"+json[i].titolo+"</a></li>";
						$("#"+lista_ul).append(html_articoli);
						$("#"+lista_ul).listview("refresh");
					}
					
					$("#"+div_progress).hide();
			
				}	
			});
	
	
}

function CaricaGuid(guid){

	var div_progress="progress_articolo";
	var lista_ul="articolo-androidplaya";
	$("#"+div_progress).show();
	$("#"+lista_ul).empty();
	
	link="http://www.quickapp.it/resources/androidplaya.php?pagina=guid&guid="+guid;
	//alert(''+link);
			
			jQuery.ajax({
				url: link,
				type: 'GET',
				dataType: 'jsonp',
				timeout: 60000,
				error: function(){ 
					alert("Errore!");
					$("#"+div_progress).hide();
				},
				success: function(json){

					for(i=0; i<json.length; i++){
					
					var html_articolo  = "<li><h2><a href='"+json[i].link+"' rel='external'>"+json[i].titolo+"</a></h2><br /><br />"+json[i].description+"<br /><br />Pubblicato il: "+json[i].pubDate+"</li>";
					$("#"+lista_ul).append(html_articolo);
					
					}
					$("#"+div_progress).hide();
			
				}	
			});
	
	
}

