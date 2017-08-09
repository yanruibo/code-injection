






















$(document).on("mobileinit", function(){
$.mobile.defaultPageTransition = 'none';
});




	var cantidad=10;
	var tiempoRefresco=15;
    var watchID = null;

$(document).ready(function(e) {
    cargarFeeds(cantidad);
    document.addEventListener("deviceready",startWatch(), false);
	setInterval(function() {
           cargarFeeds(cantidad);
	}, tiempoRefresco * 60000) 
/*
  function onDeviceReady() {
        navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
    }
*/

  $("#configurar").bind("pageshow", function() {
      $("#cantidad").val(cantidad).slider("refresh");
      $("#tiempo").val(tiempoRefresco).slider("refresh");
	  var shake = $("#shake");
	  if (watchID!=null){
    	  shake[0].selectedIndex = 1; 
	  }else{
    	 shake[0].selectedIndex =0; 
	  }
       shake.slider("refresh");
   });
		
   $("#volver").click(function(e) {
	   cantidad=$("#cantidad").val();
	   tiempoRefresco = $("#tiempo").val();
	     var shake = $("#shake");
	     if (shake[0].selectedIndex == 0){
			 	stopWatch();
		 }else{
			 if (watchID == null){
				startWatch();
			}
		 }
       cargarFeeds($("#cantidad").val());  
 	   $.mobile.changePage("#principal", "slide", false, true);
     });
	 
	 $("#refrescar").click(function(e) {
           cargarFeeds(cantidad);
     });
	 
	
	});


 function startWatch() {
        var options = { frequency: 3000 };
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
 }
  function stopWatch() {
     if (watchID) {
          navigator.accelerometer.clearWatch(watchID);
          watchID = null;
        }
    }
 
 
   function onSuccess(acceleration) {
	    var max = 1;
		if (Math.abs(acceleration.x) > max
			|| Math.abs(acceleration.y) > max
			|| Math.abs(acceleration.z) > max) {
		 	  cargarFeeds(cantidad);
        }
    }
 
 function onError() {
        alerta('Error al Agitar!','Interpenyes','Aceptar');
    }
	
function alerta(mensaje,titulo,boton) {
        navigator.notification.alert(mensaje,titulo,boton);
    }





function cargarFeeds(cantidad){
	try{
	    $.mobile.loadingMessage = "Recuperando Feeds";
        $.mobile.showPageLoadingMsg('');	
 		$.jGFeed('http://feeds.feedburner.com/FederaciInterpenyesPaterna',
 		function(feeds){
	 		if(!feeds){
		 		$.mobile.hidePageLoadingMsg();
		 		 alerta('Error , no se puede Obtener RSS!','Interpenyes','Aceptar');
				return false;
	 		}else{
	 			var lista = $('#lista');
			    lista.html("<li data-role='list-divider' data-theme='a'>" + cantidad + " Post, Actualizado: " + getFechaHora() + "</li>");
	  			for(var i=0; i<feeds.entries.length; i++){
					var entry = feeds.entries[i];
					var html="<li>";
		    			html+="<a href='"+ entry.link + "'><h3>"+ entry.title +"</h3>";
		    			html+="<p><strong>Publicada el:</strong> "+entry.publishedDate.substring(0,25) +"</p>";
						html+="</a></li>";
					lista.append(html);
					lista.listview("refresh");
	   			}	
				$.mobile.hidePageLoadingMsg();
	 	}}, cantidad);
		 
		 return true;
	}catch(err){
		  alerta('Error , no se puede Obtener RSS!','Interpenyes','Aceptar');
	}
 }

function getFechaHora(fec){
	var fec=new Date; 
	var dia=fec.getDate(); 
	var mes=fec.getMonth(); 
	var anio=fec.getFullYear(); 
	var horas = fec.getHours() ; 
	var minutos = fec.getMinutes() ; 
	var segundos = fec.getSeconds() ; 
	if (dia<10) dia='0'+dia; 
	if (mes<10) mes='0'+mes; 

	if (horas <10) horas = "0" + horas; 
	if (minutos <10) minutos = "0" + minutos; 
	if (segundos <10) segundos = "0" + segundos; 

   return anio+'/'+mes+'/'+dia+" "+horas+":"+minutos+":"+segundos
   ;  	
}














 

$(document).on("mobileinit", function(){
$.mobile.defaultPageTransition = 'none';

});




			$(document).on('pagebeforeshow', 'html', function(){       
    
});

            function onLoad()
            {
                 
				 
				  document.addEventListener("deviceready", onDeviceReady, true); 



				  
		  
				  
				  
            }

            

        

function exitFromApp()
             {
				 	
					navigator.app.exitApp();
				 
			 }






















!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
















