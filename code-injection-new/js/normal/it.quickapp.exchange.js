




		
		$(document).ready(function() {
			
			setTimeout(function() {
				$("#intro").remove();
				$("#content_home").toggle();
				$("#navbar_home").toggle();
			}, 3000);

		});
		
	

function InvioDati(campi){

			//alert(''+campi);
			
			var array_campi = campi.split(":");
			var linkFinale = "";

			for (x=0; x<array_campi.length; x++){
				var valore = document.getElementById(array_campi[x]).value;				
				valore = encodeURIComponent(valore);

				/* splitto la stringa perché ci sono nomi di var che possono essere uguali tra le varie formule;
				ho usato - perché _ l'ho usato per gli ID dei campi quindi ce ne sarebbero stati di più nell'ID */
				var campo=array_campi[x].split("-");

				//alert(''+campo[0]+' '+valore);
				linkFinale	= linkFinale+"&"+campo[0]+"="+valore;
				
				//alert(''+linkFinale);
			}
			
			return linkFinale;

		}

function CalcolaValuta(campi){

			//alert(''+campi);
			
			/* mostro il div di feedback loading */
			var div_progress="progress_valuta";
			$("#"+div_progress).toggle();
			
			var linkVar = InvioDati(campi);
			
			//alert(''+linkVar);
			
			link="http://www.quickapp.it/resources/valuta.php?"+linkVar;

			//alert(''+link);
			
			jQuery.ajax({
				url: link,
				type: 'GET',
				dataType: 'jsonp',
				timeout: 60000,
				error: function(){ 
					alert("Errore!");
					$("#"+div_progress).toggle();
				},
				success: function(json){
					$("#"+div_progress).remove();
					alert(""+json.messaggio);
				}	
			});
			
}
