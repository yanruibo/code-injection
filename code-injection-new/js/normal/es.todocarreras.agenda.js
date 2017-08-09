


 
        // ====================================================================
        // Gestión del ciclo de vida de la app
        // --------------------------------------------------------------------
         
        // Eventos Phonegap
        document.addEventListener("deviceready", aplicacionIniciada, false); // Al inciar la app
        document.addEventListener("pause", aplicaciónPausada, false);        // Al pausar la app
        document.addEventListener("resume", aplicaciónReiniciada, false);    // Al reiniciar la app
        document.addEventListener("online", phonegapOnline, false);          // Phonegap tiene acceso a internet
        document.addEventListener("offline", phonegapOffline, false);        // Phonegap NO tiene acceso a internet
        document.addEventListener("backbutton", atrasPulsado, false);        // Se ha pulsado la tecla atrás 
        document.addEventListener("menubutton", menuPulsado, false);         // Se ha pulsado la tecla menú
        document.addEventListener("searchbutton", menuPulsado, false);       // Se ha pulsado la tecla búsqueda
         
        /**
         * Aplicación iniciada
         */
        function aplicacionIniciada()
        {
        }
 
        /**
         * Aplicación pausada
         */
        function aplicaciónPausada()
        {
        }
 
        /**
         * Aplicación reiniciada
         */
        function aplicaciónReiniciada()
        {
        }
 
        /**
         * Phonegap tiene acceso a internet
         */
        function phonegapOnline()
        {
        }
 
        /**
         * Phonegap NO tiene acceso a internet
         */
        function phonegapOffline()
        {
        alert('no hay internet');
        }
 
        /**
         * Se ha pulsado la tecla atrás
         */
        function atrasPulsado()
        {
        }
 
        /**
         * Se ha pulsado la tecla atrás
         */
        function menuPulsado()
        {
        }
 
        /**
         * Se ha pulsado la tecla búsqueda
         */
        function busquedaPulsado()
        {
        }
         
        // ====================================================================
        // Llamadas a la API
        // --------------------------------------------------------------------
         
        /**
         * Pruebas de la API
         */
        function probarApi()
        {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
         
        /**
         * http://docs.phonegap.com/en/1.0.0/phonegap_geolocation_geolocation.md.html#Geolocation
         */
        function onSuccess(position) 
        {
            var mensaje =
                'Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + new Date(position.timestamp)      + '\n';
                           
            alert
            (
                mensaje,        // message
                alertDismissed, // callback
                'ĄError!',      // title
                'ĄHecho!'       // buttonName
            );
        };
 
        /**
         * http://docs.phonegap.com/en/1.0.0/phonegap_geolocation_geolocation.md.html#Geolocation
         */
        function onError(error)
        {
            var mensaje =
                'code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n';
                           
            navigator.notification.alert
            (
                mensaje,        // message
                alertDismissed, // callback
                'ĄError!',      // title
                'ĄHecho!'       // buttonName
            );
        }
 
        /**
         * http://docs.phonegap.com/en/1.0.0/phonegap_notification_notification.md.html#Notification
         */
        function alertDismissed()
        {
        }
         
    





 
        // ====================================================================
        // Gestión del ciclo de vida de la app
        // --------------------------------------------------------------------
         
        // Eventos Phonegap
        document.addEventListener("deviceready", aplicacionIniciada, false); // Al inciar la app
        document.addEventListener("pause", aplicaciónPausada, false);        // Al pausar la app
        document.addEventListener("resume", aplicaciónReiniciada, false);    // Al reiniciar la app
        document.addEventListener("online", phonegapOnline, false);          // Phonegap tiene acceso a internet
        document.addEventListener("offline", phonegapOffline, false);        // Phonegap NO tiene acceso a internet
        document.addEventListener("backbutton", atrasPulsado, false);        // Se ha pulsado la tecla atrás 
        document.addEventListener("menubutton", menuPulsado, false);         // Se ha pulsado la tecla menú
        document.addEventListener("searchbutton", menuPulsado, false);       // Se ha pulsado la tecla búsqueda
         
        /**
         * Aplicación iniciada
         */
        function aplicacionIniciada()
        {
        }
 
        /**
         * Aplicación pausada
         */
        function aplicaciónPausada()
        {
        }
 
        /**
         * Aplicación reiniciada
         */
        function aplicaciónReiniciada()
        {
        }
 
        /**
         * Phonegap tiene acceso a internet
         */
        function phonegapOnline()
        {
        }
 
        /**
         * Phonegap NO tiene acceso a internet
         */
        function phonegapOffline()
        {
        }
 
        /**
         * Se ha pulsado la tecla atrás
         */
        function atrasPulsado()
        {
        }
 
        /**
         * Se ha pulsado la tecla atrás
         */
        function menuPulsado()
        {
        }
 
        /**
         * Se ha pulsado la tecla búsqueda
         */
        function busquedaPulsado()
        {
        }
         
        // ====================================================================
        // Llamadas a la API
        // --------------------------------------------------------------------
         
        /**
         * Pruebas de la API
         */
        function probarApi()
        {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
         
        /**
         * http://docs.phonegap.com/en/1.0.0/phonegap_geolocation_geolocation.md.html#Geolocation
         */
        function onSuccess(position) 
        {
            var mensaje =
                'Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + new Date(position.timestamp)      + '\n';
                           
            alert
            (
                mensaje,        // message
                alertDismissed, // callback
                'ĄError!',      // title
                'ĄHecho!'       // buttonName
            );
        };
 
        /**
         * http://docs.phonegap.com/en/1.0.0/phonegap_geolocation_geolocation.md.html#Geolocation
         */
        function onError(error)
        {
            var mensaje =
                'code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n';
                           
            navigator.notification.alert
            (
                mensaje,        // message
                alertDismissed, // callback
                'ĄError!',      // title
                'ĄHecho!'       // buttonName
            );
        }
 
        /**
         * http://docs.phonegap.com/en/1.0.0/phonegap_notification_notification.md.html#Notification
         */
        function alertDismissed()
        {
        }
         
    







$(document).ready(function(){

  $.ajax({
    url: 'http://www.todocarreras.es/tag/guadalajara/feed/', // name of file you want to parse
    dataType: "xml",
    success: parse,
	error: function(){alert("Error: Something went wrong");}
  });
});

function parse(document){
$("#lista").append('<ul data-role="listview">');
  $(document).find("item").each(function(){
    $("#lista").append(
	'<li><a href="aaa.html">ISBN10: '+$(this).attr('fechacarrera').text()+ '</a></li>'
	);
  });
$("#lista").append('</ul>');
}






$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_parametrizado.php?variable=guadalajara",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+'</h3><p>Fecha de la prueba:'+data.date+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json.php",function(data) {

                $.each(data.posts, function(i,data){

                $('#output ul').append('<li><a href="#">'+data.title+'</a></li>');

                });
                $('#output ul').listview('refresh');
            }
        );      
    });             
});





 
        // ====================================================================
        // Gestión del ciclo de vida de la app
        // --------------------------------------------------------------------
         
        // Eventos Phonegap
        document.addEventListener("deviceready", aplicacionIniciada, false); // Al inciar la app
        document.addEventListener("pause", aplicaciónPausada, false);        // Al pausar la app
        document.addEventListener("resume", aplicaciónReiniciada, false);    // Al reiniciar la app
        document.addEventListener("online", phonegapOnline, false);          // Phonegap tiene acceso a internet
        document.addEventListener("offline", phonegapOffline, false);        // Phonegap NO tiene acceso a internet
        document.addEventListener("backbutton", atrasPulsado, false);        // Se ha pulsado la tecla atrás 
        document.addEventListener("menubutton", menuPulsado, false);         // Se ha pulsado la tecla menú
        document.addEventListener("searchbutton", menuPulsado, false);       // Se ha pulsado la tecla búsqueda
         
        /**
         * Aplicación iniciada
         */
        function aplicacionIniciada()
        {
        }
 
        /**
         * Aplicación pausada
         */
        function aplicaciónPausada()
        {
        }
 
        /**
         * Aplicación reiniciada
         */
        function aplicaciónReiniciada()
        {
        }
 
        /**
         * Phonegap tiene acceso a internet
         */
        function phonegapOnline()
        {
        }
 
        /**
         * Phonegap NO tiene acceso a internet
         */
        function phonegapOffline()
        {
        }
 
        /**
         * Se ha pulsado la tecla atrás
         */
        function atrasPulsado()
        {
        }
 
        /**
         * Se ha pulsado la tecla atrás
         */
        function menuPulsado()
        {
        }
 
        /**
         * Se ha pulsado la tecla búsqueda
         */
        function busquedaPulsado()
        {
        }
         
        // ====================================================================
        // Llamadas a la API
        // --------------------------------------------------------------------
         
        /**
         * Pruebas de la API
         */
        function probarApi()
        {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
         
        /**
         * http://docs.phonegap.com/en/1.0.0/phonegap_geolocation_geolocation.md.html#Geolocation
         */
        function onSuccess(position) 
        {
            var mensaje =
                'Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + new Date(position.timestamp)      + '\n';
                           
            alert
            (
                mensaje,        // message
                alertDismissed, // callback
                'ĄError!',      // title
                'ĄHecho!'       // buttonName
            );
        };
 
        /**
         * http://docs.phonegap.com/en/1.0.0/phonegap_geolocation_geolocation.md.html#Geolocation
         */
        function onError(error)
        {
            var mensaje =
                'code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n';
                           
            navigator.notification.alert
            (
                mensaje,        // message
                alertDismissed, // callback
                'ĄError!',      // title
                'ĄHecho!'       // buttonName
            );
        }
 
        /**
         * http://docs.phonegap.com/en/1.0.0/phonegap_notification_notification.md.html#Notification
         */
        function alertDismissed()
        {
        }
         
    











$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/novedades.json",function(data) {

                $.each(data.posts, function(i,data){

                $('#novedades').append('<br />'+data.texto);

                });
                
            }
        );      
    });             
});





     	$(document).ready(function(){
			$.ajax({
				type: "GET",
				url: "sites.xml",
				dataType: "xml",
				success: function(xml) {
					$(xml).find('site').each(function(){
						var id = $(this).attr('id');
						var title = $(this).find('title').text();
						var url = $(this).find('url').text();
						$('<div class="items" id="link_'+id+'"></div>').html('<a href="'+url+'">'+title+'</a>').appendTo('#page-wrap');
						$(this).find('desc').each(function(){
							var brief = $(this).find('brief').text();
							var long = $(this).find('long').text();
							$('<div class="brief"></div>').html(brief).appendTo('#link_'+id);
							$('<div class="long"></div>').html(long).appendTo('#link_'+id);
						});
					});
				}
			});
		});
     





$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json.php",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                 +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});





 
        // ====================================================================
        // Gestión del ciclo de vida de la app
        // --------------------------------------------------------------------
         
        // Eventos Phonegap
        document.addEventListener("deviceready", aplicacionIniciada, false); // Al inciar la app
        document.addEventListener("pause", aplicaciónPausada, false);        // Al pausar la app
        document.addEventListener("resume", aplicaciónReiniciada, false);    // Al reiniciar la app
        document.addEventListener("online", phonegapOnline, false);          // Phonegap tiene acceso a internet
        document.addEventListener("offline", phonegapOffline, false);        // Phonegap NO tiene acceso a internet
        document.addEventListener("backbutton", atrasPulsado, false);        // Se ha pulsado la tecla atrás 
        document.addEventListener("menubutton", menuPulsado, false);         // Se ha pulsado la tecla menú
        document.addEventListener("searchbutton", menuPulsado, false);       // Se ha pulsado la tecla búsqueda
         
        /**
         * Aplicación iniciada
         */
        function aplicacionIniciada()
        {
        }
 
        /**
         * Aplicación pausada
         */
        function aplicaciónPausada()
        {
        }
 
        /**
         * Aplicación reiniciada
         */
        function aplicaciónReiniciada()
        {
        }
 
        /**
         * Phonegap tiene acceso a internet
         */
        function phonegapOnline()
        {
        }
 
        /**
         * Phonegap NO tiene acceso a internet
         */
        function phonegapOffline()
        {
        }
 
        /**
         * Se ha pulsado la tecla atrás
         */
        function atrasPulsado()
        {
        }
 
        /**
         * Se ha pulsado la tecla atrás
         */
        function menuPulsado()
        {
        }
 
        /**
         * Se ha pulsado la tecla búsqueda
         */
        function busquedaPulsado()
        {
        }
         
        // ====================================================================
        // Llamadas a la API
        // --------------------------------------------------------------------
         
        /**
         * Pruebas de la API
         */
        function probarApi()
        {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
         
        /**
         * http://docs.phonegap.com/en/1.0.0/phonegap_geolocation_geolocation.md.html#Geolocation
         */
        function onSuccess(position) 
        {
            var mensaje =
                'Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + new Date(position.timestamp)      + '\n';
                           
            alert
            (
                mensaje,        // message
                alertDismissed, // callback
                'ĄError!',      // title
                'ĄHecho!'       // buttonName
            );
        };
 
        /**
         * http://docs.phonegap.com/en/1.0.0/phonegap_geolocation_geolocation.md.html#Geolocation
         */
        function onError(error)
        {
            var mensaje =
                'code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n';
                           
            navigator.notification.alert
            (
                mensaje,        // message
                alertDismissed, // callback
                'ĄError!',      // title
                'ĄHecho!'       // buttonName
            );
        }
 
        /**
         * http://docs.phonegap.com/en/1.0.0/phonegap_notification_notification.md.html#Notification
         */
        function alertDismissed()
        {
        }
         
    



jQuery.DSt=(function(){var a={version:0.002005,get:function(b){var c=localStorage.getItem(b);if(c===undefined||c===null){c="null"}else{c=c.toString()}return JSON.parse(c)},set:function(b,c){return localStorage.setItem(b,JSON.stringify(c))},store:function(b){if(typeof(b)=="string"){b=document.getElementById(b)}if(!b||b.name==""){return this}var c=a._form_elt_key(b);if(b.type=="checkbox"){a.set(c,b.checked?1:0)}else{if(b.type=="radio"){a.set(c,a._radio_value(b))}else{a.set(c,b.value||"")}}return this},recall:function(b){if(typeof(b)=="string"){b=document.getElementById(b)}if(!b||b.name==""){return this}var c=a._form_elt_key(b);var d=a.get(c);if(b.type=="checkbox"){b.checked=!!d}else{if(b.type=="radio"){if(b.value==d){b.checked=true}}else{b.value=d||""}}return this},_form_elt_key:function(b){return"_form_"+b.form.name+"_field_"+b.name},_radio_value:function(e){if(typeof(e)=="string"){e=document.getElementById(e)}var f=e.form.elements[e.name];var b=f.length;var d=null;for(var c=0;c<b;c++){if(f[c].checked){d=f[c].value}}return d},recall_form:function(b){return a._apply_fn_to_form_inputs(b,a.recall)},store_form:function(b){return a._apply_fn_to_form_inputs(b,a.store)},_apply_fn_to_form_inputs:function(e,c){if(typeof(e)=="string"){e=document.getElementById(e)}var f=e.elements.length;for(var b=0;b<f;b++){var d=e.elements[b];if(d.tagName=="TEXTAREA"||d.tagName=="INPUT"&&d.type!="file"&&d.type!="button"&&d.type!="image"&&d.type!="password"&&d.type!="submit"&&d.type!="reset"){c(d)}}return this},_storage_types:function(){var b="";for(var c in window){if(c=="sessionStorage"||c=="globalStorage"||c=="localStorage"||c=="openDatabase"){b+=b?(" "+c):c}}return b},javascript_accepts_trailing_comma:false};return a})();





$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=las+palmas",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=valladolid",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=asturias",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=guipúzcoa",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?variable=A+Coruña&num=20&clave=Provincia",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=tarragona",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
               '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=guadalajara",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=ávila",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=almería",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=segovia",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=salamanca",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=granada",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=pontevedra",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
               '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=alicante",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=cádiz",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=murcia",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=navarra",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=Albacete",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=león",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=valencia",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=córdoba",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=málaga",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=huesca",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=ceuta",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=lleida",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
               '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=barcelona",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=lugo",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=santa+cruz+de+tenerife",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=castellón",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=toledo",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=la+rioja",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=huelva",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=soria",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=zamora",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=palencia",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=jaén",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&Variable=Álava",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
               '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=melilla",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=cáceres",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=cantabria",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=ciudad+real",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=teruel",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=zaragoza",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=sevilla",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=ourense",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=badajoz",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=madrid",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=illes+ballears",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=cuenca",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=burgos",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&clave=Provincia&variable=vizcaya",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&variable=Canicross&clave=Tipo+de+Prueba",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&variable=Trail&clave=Tipo+de+Prueba",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&variable=Cross&clave=Tipo+de+Prueba",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=10&variable=Carrera+de+Bomberos&clave=Tipo+de+Prueba",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
               '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&variable=Carrera+Popular&clave=Tipo+de+Prueba",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&variable=Kilómetro+Vertical&clave=Tipo+de+Prueba",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
               '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&variable=Carrera+de+Montaña&clave=Tipo+de+Prueba",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?num=20&variable=Orientación&clave=Tipo+de+Prueba",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?variable=ultra-maratón&num=20&clave=Distancia",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?variable=maratón&num=20&clave=Distancia",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?variable=entre+10km+y+media+maratón&num=20&clave=Distancia",function(data) {
        

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?variable=media+maratón&num=20&clave=Distancia",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?variable=menos+de+10km&num=20&clave=Distancia",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
                '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});







$(function() {
$(document).ready(function(){
        $.getJSON("http://www.todocarreras.es/web/json_param_final.php?variable=10km&num=20&clave=Distancia",function(data) {

                $.each(data.posts, function(i,data){

                $('#output').append('<div data-role="collapsible" data-collapsed-icon="arrow-r" and data-expanded-icon="arrow-d"><h3>'+data.title+
                '</h3><p><b>Fecha: </b>'
                +data.fecha+'</p>'+
                '<p><b>Tipo de carrera: </b>'
                +data.tipo+'</p>'+
                '<p><b>Localidad: </b>'
                +data.localidad+'</p>'+
                '<p><b>Provincia: </b>'
                +data.provincia+'</p>'+
                '<p><b>Distancia: </b>'
                +data.distancia+'</p>'+
              '<p><b>Tel&eacute;fono: </b><a href="tel:'+data.telefono+'">'
                +data.telefono+'</a></p>'+
                '<p><b>Cuota de Inscripci&oacute;n: </b>'
                +data.cuota+'</p></div>');

                });
                $('#output').collapsibleset('refresh');
            }
        );      
    });             
});


