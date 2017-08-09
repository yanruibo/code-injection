






















﻿	/*! netBytes software */
var _nb_version_actual = "1.0.0";

var _nb_clave_app_version = "INGSA:Incidencias:version";
var _nb_clave_mis_datos_nombre = "INGSA:Incidencias:mis_datos_nombre";
var _nb_clave_mis_datos_telefono = "INGSA:Incidencias:mis_datos_telefono";
var _nb_clave_mis_datos_direccion = "INGSA:Incidencias:mis_datos_direccion";
var _nb_clave_incidencias_descripcion = "INGSA:Incidencias:incidencias_descripcion";
var _nb_clave_incidencias_lista = "INGSA:Incidencias:incidencias_lista";

window.onerror = function(msg, url, linenumber) {
    console.log("Error :" + msg + " in " + url + " at line " + linenumber);
};

function esDispositivoApple() {
	var deviceAgent = navigator.userAgent.toLowerCase();
    return deviceAgent.match(/(iphone|ipod|ipad)/);
}

function esDispositivoAndroid() {
	var deviceAgent = navigator.userAgent.toLowerCase();
    return deviceAgent.match(/android/);
}

function estanMisDatosRellenos() {
	var nombre = (almacenLocalObtenerClave(_nb_clave_mis_datos_nombre) || "");
	var telefono = (almacenLocalObtenerClave(_nb_clave_mis_datos_telefono) || "");
	var direccion = (almacenLocalObtenerClave(_nb_clave_mis_datos_direccion) || "");
	
	return (nombre.length > 0 && telefono.length > 0 && direccion.length > 0);
}

function mostrarAlerta(mensaje, titulo, textoBoton) {
    if(navigator.notification && navigator.notification.alert){
    	navigator.notification.alert(mensaje, null, titulo, textoBoton);
    } else {
    	alert(mensaje);
    }
}

function acercaDe() {
	mostrarAlerta("Informes y Gestiones - Administración de fincas\nComunicación de incidencias\nVersión 1.0", "Acerca de", "Aceptar");
}

function almacenLocalObtenerClave(clave) {
	return window.localStorage.getItem(clave);
}

function almacenLocalEliminarClave(clave) {
	return window.localStorage.removeItem(clave);
}

function almacenLocalGuardarClave(clave, valor) {
	window.localStorage.setItem(clave, valor);
}

function solicitarConfirmacion(mensaje, callback, textoBotones, titulo){

		//Set default values if not specified by the user.
	textoBotones = textoBotones || 'Sí,No';

	titulo = titulo || "Confirmación";

    	//Use Cordova version of the confirm box if possible.
    if(navigator.notification && navigator.notification.confirm){
            var _callback = function(index){
                if(callback){
                    callback(index == 1);
                }
            };

            navigator.notification.confirm(
            	mensaje,
                _callback,
                titulo,
                textoBotones
            );

        //Default to the usual JS confirm method.
    } else {
        invoke(callback, confirm(mensaje));
    }
}

function existeConexion() {
	var networkState = navigator.network.connection.type;

	return !(networkState == Connection.UNKNOWN || networkState == Connection.NONE);
}

function fechaHoraTexto(fecha) {
	var txt = "";
	if (fecha.getDate() >= 10)
		txt += fecha.getDate().toString() + "-";
	else
		txt += "0" + fecha.getDate().toString() + "-";
	if ((fecha.getMonth() + 1) >= 10)
		txt += (fecha.getMonth() + 1).toString() + "-";
	else
		txt += "0" + (fecha.getMonth() + 1).toString() + "-";
	txt += fecha.getFullYear().toString() + " ";
	if (fecha.getHours() >= 10)
		txt += fecha.getHours().toString() + ":";
	else
		txt += "0" + fecha.getHours().toString() + ":";
	if (fecha.getMinutes() >= 10)
		txt += fecha.getMinutes().toString() + ":";
	else
		txt += "0" + fecha.getMinutes().toString() + ":";
	if (fecha.getSeconds() >= 10)
		txt += fecha.getSeconds().toString();
	else
		txt += "0" + fecha.getSeconds().toString();
	return txt;
}

function fecha_yyyymmddHHMMss_UTC(fecha) {
	var txt = fecha.getUTCFullYear().toString();
	if ((fecha.getUTCMonth() + 1) >= 10)
		txt += (fecha.getUTCMonth() + 1).toString();
	else
		txt += "0" + (fecha.getUTCMonth() + 1).toString();
	if (fecha.getUTCDate() >= 10)
		txt += fecha.getUTCDate().toString() + "-";
	else
		txt += "0" + fecha.getUTCDate().toString() + "-";
	if (fecha.getUTCHours() >= 10)
		txt += fecha.getUTCHours().toString();
	else
		txt += "0" + fecha.getUTCHours().toString();
	if (fecha.getUTCMinutes() >= 10)
		txt += fecha.getUTCMinutes().toString();
	else
		txt += "0" + fecha.getUTCMinutes().toString();
	if (fecha.getUTCSeconds() >= 10)
		txt += fecha.getUTCSeconds().toString();
	else
		txt += "0" + fecha.getUTCSeconds().toString();
	return txt;
}








/**
 * NB-Hermes plugin for Cordova
 * 
 * Plugin for sending e-mails from Cordova developments
 * Componente para el env�o de correos electr�nicos para desarrollos con Cordova
 * 
 * Copyright (c) 2012 - netBytes software
 * http://netbyt.es
 * 
 */

var NB_Hermes = function() {
	this.emptyMessage();
};

NB_Hermes.prototype.emptyMessage = function() {
	this.to = [];
	this.cc = [];
	this.bcc = [];
	this.subject = "";
	this.body = "";
	this.isHTML = false;
	this.attachments = [];
};

NB_Hermes.prototype.sendEmail = function(success, fail) {
	return cordova.exec(
		function(args) {
			success(args);
		},
		function(args) {
			fail(args);
		},
		'NB_Hermes',
		'sendEmail',
		[this.to, this.cc, this.bcc, this.subject, this.body, this.isHTML, this.attachments]
		);
};

	// Para versiones de Cordova/PhoneGap 1.6.1 a 1.9.X (excepto 1.9) descomenta este
	// bloque de c�digo y comenta el correspondiente a Cordova/PhoneGap 2.X

	// For Cordova/PhoneGap versions 1.6.1 to 1.9.X (except 1.9) uncomment this
	// block of code and comment the corresponding to Cordova/PhoneGap 2.X

/*
cordova.addConstructor(
	function() {
		if (!window.Cordova)
			window.Cordova = cordova;

		if (!window.plugins)
			window.plugins = {};

		window.plugins.NB_Hermes = new NB_Hermes();
	}
);
*/

	// Para versiones de Cordova/PhoneGap 2.X descomenta este bloque de c�digo y
	// comenta el correspondiente a Cordova/PhoneGap 1.6.1 a 1.9.X (excepto 1.9)

	// For Cordova/PhoneGap versions 2.X uncomment this block of code and
	// comment the corresponding to Cordova/PhoneGap 1.6.1 to 1.9.X

if (!window.plugins)
	window.plugins = {};
window.plugins.NB_Hermes = new NB_Hermes();


﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {
}

$('#homePage').live('pageshow', function(event){
	mostrarMenu();
	primerUso();
});

$(window).bind('orientationchange', function(event){
	mostrarMenu();
});

function mostrarMenu() {
	var wh = $(window).height();
	var ww = $(window).width();
	//console.log("wh = " + wh + ", ww = " + ww);

	$.each($('.nb-img-menu'), function() {
	    $(this).on("vmousedown", function(e) { $(this).css("opacity", 0.7); });
	    $(this).on("vmouseup", function(e) { $(this).css("opacity", 1.0); });
	    $(this).on("vmouseout", function(e) { $(this).css("opacity", 1.0); });
	});
	
	$("menuPage").on("vmousedown", function(e) {
		$.each($('.nb-img-menu'), function() {
		    $(this).css("opacity", 1.0);
		});
	});
}

function primerUso() {
	var version = almacenLocalObtenerClave(_nb_clave_app_version);
	if (version == null) {
		almacenLocalGuardarClave(_nb_clave_app_version, _nb_version_actual);
		almacenLocalGuardarClave(_nb_clave_mis_datos_nombre, "");
		almacenLocalGuardarClave(_nb_clave_mis_datos_telefono, "");
		almacenLocalGuardarClave(_nb_clave_mis_datos_direccion, "");
		almacenLocalGuardarClave(_nb_clave_incidencias_descripcion, "");
	} else {
		if (version != _nb_version_actual) {
			// Aquí vendrán los cambios de actualización de versiones
			switch(version)
			{
			case "1.0.alpha":
			  break;
			case "1.0.beta":
			  break;
			}
			
			almacenLocalGuardarClave(_nb_clave_app_version, _nb_version_actual);
		}
	}

	//almacenLocalGuardarClave(_nb_clave_incidencias_descripcion, "Incidencia de prueba 1");
	//almacenLocalGuardarClave(_nb_clave_incidencias_lista, '[{"id":0, "fichero":"/mnt/sdcard/Android/data/es.netbyt.ingsa.incidencias/cache/1351117773490.jpg", "bytes":17514},{"id":1, "fichero":"/mnt/sdcard/Android/data/es.netbyt.ingsa.incidencias/cache/1351117773490.jpg", "bytes":17514}]');
	//almacenLocalGuardarClave(_nb_clave_incidencias_lista, '[]');
	
	if (almacenLocalObtenerClave(_nb_clave_incidencias_lista) == null)
		almacenLocalGuardarClave(_nb_clave_incidencias_lista, '[]');
}









﻿	/*! netBytes software */

$(document).bind("mobileinit", function(){
	  $.mobile.defaultPageTransition = "none";
	});








﻿/*! netBytes software - menu.js */

var objFoto = {};

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {
	if (estanMisDatosRellenos())
		ocultarMensajeError();
	else {
		$("#mensaje-error-texto").text("Antes de poder comunicar una incidencia debe rellenar sus datos utilizando la opción del menú principal 'Mis datos'");
		mostrarMensajeError();
	}

	mostrarIncidencia();
    $("#txtIncidencia").on("vmouseout", function(e) {
    	almacenLocalGuardarClave(_nb_clave_incidencias_descripcion, $("#txtIncidencia").val());
    	}
    );
}

function comprobarMisDatos() {
	var datosRellenos = estanMisDatosRellenos();
	if (datosRellenos)
		ocultarMensajeError();
	else {
		$("#mensaje-error-texto").text("Antes de poder comunicar una incidencia debe rellenar sus datos utilizando la opción del menú principal 'Mis datos'");
		mostrarMensajeError();
	}
	return datosRellenos;
}

function ocultarMensajeError() {
	$("#mensaje-error").css("display", "none");
}

function mostrarMensajeError() {
	$("#mensaje-error").css("display", "table");
}

function vaciar() {
	almacenLocalGuardarClave(_nb_clave_incidencias_descripcion, $("#txtIncidencia").val());
	
	var callback = function(confirmado){
	    if (confirmado) {
            var arrayFotos = JSON.parse(almacenLocalObtenerClave(_nb_clave_incidencias_lista));
            for (var i = 0 ; i < arrayFotos.length ; i++) {
                var fichero = arrayFotos[i].fichero;
                borrarFotoFichero(fichero);
            }
	        almacenLocalGuardarClave(_nb_clave_incidencias_descripcion, "");
	        almacenLocalGuardarClave(_nb_clave_incidencias_lista, "[]");
	        mostrarIncidencia();
	    }
	};

	solicitarConfirmacion("¿Deseas borrar todo?", callback, "Sí,No", "Confirmación");
}

function mostrarIncidencia() {
	var descripcion = almacenLocalObtenerClave(_nb_clave_incidencias_descripcion);
	$('#txtIncidencia').val(descripcion);
	var arrayFotos = JSON.parse(almacenLocalObtenerClave(_nb_clave_incidencias_lista));
	var contenidoHTML = '<div class="ui-grid-a">';
	for (var i = 0 ; i < arrayFotos.length ; i++){
		objFoto = arrayFotos[i];
		contenidoHTML += '<div class="ui-block-a"><img src="' + objFoto.fichero + '" width="auto" /><br />Tamaño: ' + Math.round(objFoto.bytes / 1024) + ' KB<br /><br /></div>';
		contenidoHTML += '<div class="ui-block-b"><a href="javascript:borrarFoto(' + i + ');" data-theme="a" data-role="button" data-inline="true" data-icon="delete" data-iconpos="notext" /></div>';
	}
	contenidoHTML += '</div>';
	$("#lista-fotos").html(contenidoHTML);
	//$('#incidenciaPage').trigger('create');
	$('#lista-fotos').trigger('create');
}

function borrarFoto(id) {
	almacenLocalGuardarClave(_nb_clave_incidencias_descripcion, $("#txtIncidencia").val());
	
	var callback = function(confirmado){
	    if(confirmado)
	    	borrarFotoID(id);
	};

	solicitarConfirmacion("¿Deseas borrar la fotografía?", callback, "Sí,No", "Confirmación");
}

function borrarFotoID(id) {
	var arrayFotos = JSON.parse(almacenLocalObtenerClave(_nb_clave_incidencias_lista));
	var fichero = arrayFotos[id].fichero;
	arrayFotos.splice(id, 1);
	almacenLocalGuardarClave(_nb_clave_incidencias_lista, JSON.stringify(arrayFotos));
	mostrarIncidencia();
	
	borrarFotoFichero(fichero);
}

function borrarFotoFichero(fichero) {
	window.resolveLocalFileSystemURI(
        fichero,
        function (entry) {
            entry.remove(
                function (entry) {
                    //console.log("Fichero borrado.");
                },
                function (error) {
                    console.log("Error borrando el fichero: " + error);
                }
                                                  )
            },
        function (evt) {
            console.log("Error accediendo al fichero: " + evt.target.error.code);
        }
    );
}

function fotoAlbum() {
	almacenLocalGuardarClave(_nb_clave_incidencias_descripcion, $("#txtIncidencia").val());
	
	objFoto = {};
	navigator.camera.getPicture(
			onCameraSuccessAlbum,
			onCameraError,
			{
				quality : 40,
				targetWidth: 640,
				targetHeight: 640,
				destinationType : Camera.DestinationType.FILE_URI,
				sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
			}
		);
}

function fotoCamara() {
	almacenLocalGuardarClave(_nb_clave_incidencias_descripcion, $("#txtIncidencia").val());
	
	objFoto = {};
	navigator.camera.getPicture(
			onCameraSuccess,
			onCameraError,
			{
				quality : 40,
				targetWidth: 640,
				targetHeight: 640,
				destinationType : Camera.DestinationType.FILE_URI,
				sourceType: Camera.PictureSourceType.CAMERA
			}
		);
}

function onCameraSuccess(imageURL) {
	var fichero = imageURL;
	var arrayFotos = JSON.parse(almacenLocalObtenerClave(_nb_clave_incidencias_lista));
	objFoto["id"] = arrayFotos.length;
	objFoto["fichero"] = fichero;
	
	//console.log("URL imagen = " + imageURL);
	//console.log("fichero = " + fichero);
	window.resolveLocalFileSystemURI(
		imageURL,
		function (entry) {
			entry.file(
				function (file) {
					objFoto["bytes"] = file.size;
					var arrayFotos = JSON.parse(almacenLocalObtenerClave(_nb_clave_incidencias_lista));
					arrayFotos.push(objFoto);
					almacenLocalGuardarClave(_nb_clave_incidencias_lista, JSON.stringify(arrayFotos));
					mostrarIncidencia();
				},
				function (error) {
					console.log("Error obteniendo el tamaño del fichero: " + error);
				}
			)
		},
		function (evt) {
		    console.log("Error accediendo al fichero: " + evt.target.error.code);
		}
	);
}

function onCameraSuccessAlbum(imageURL) {
	if (imageURL.indexOf('?') >= 0)
		imageURL = imageURL.substr(0, imageURL.indexOf('?'));
	
	var fichero = imageURL;
	//console.log("URL imagen = " + imageURL);
	//console.log("fichero = " + fichero);

	// .../nombre.ext
	var nombre = fichero.substr(fichero.lastIndexOf('/') + 1);
	var ext = fichero.substr(fichero.lastIndexOf('.'));
	//var nuevo_nombre = fecha_yyyymmddHHMMss_UTC(new Date()) + ext;
	var nuevo_nombre = (new Date()).getTime() + ext;
	
	//console.log("nombre = " + nombre);
	//console.log("ext = " + ext);
	//console.log("nuevo_nombre = " + nuevo_nombre);

	window.resolveLocalFileSystemURI(
		imageURL,
		function (entry) {
			//console.log("fichero a renombrar: " + entry.fullPath);
			var carpeta = entry.fullPath.substr(0, entry.fullPath.lastIndexOf('/'));
			var nombre_carpeta = carpeta.substr(carpeta.lastIndexOf('/') + 1);
			//console.log("carpeta = " + carpeta);
			//console.log("nombre_carpeta = " + nombre_carpeta);
			//console.log("carpeta-b = " + (new DirectoryEntry(nombre_carpeta, carpeta)).fullPath);
			entry.moveTo(new DirectoryEntry(nombre_carpeta, carpeta), nuevo_nombre, 
				function (entry2) {
					var arrayFotos = JSON.parse(almacenLocalObtenerClave(_nb_clave_incidencias_lista));
					objFoto["id"] = arrayFotos.length;
					objFoto["fichero"] = entry2.fullPath;
					
					//console.log("URL imagen = " + imageURL);
					//console.log("fichero2 = " + entry2.fullPath);
					
					entry2.file(
						function (file) {
							objFoto["bytes"] = file.size;
							var arrayFotos = JSON.parse(almacenLocalObtenerClave(_nb_clave_incidencias_lista));
							arrayFotos.push(objFoto);
							almacenLocalGuardarClave(_nb_clave_incidencias_lista, JSON.stringify(arrayFotos));
							mostrarIncidencia();
						},
						function (error) {
							console.log("Error obteniendo el tamaño del fichero: " + error.code);
						}
					);
				},
				function (error) {
					console.log("Error renombrando el fichero: " + error.code);
				}
			);
		},
		function (evt) {
		    console.log("Error accediendo al fichero: " + evt.target.error.code);
		}
	);

}


function onCameraError(e) {
	console.log(e);
	$("#mensaje-error").html("Error obteniendo fotografía (" + e.code + "):<br />" + e);
}

function enviarDatos() {
	if (!comprobarMisDatos())
		return;
	
	var callback = function(confirmado){
	    if(confirmado)
	    	enviarIncidencia();
	};

	solicitarConfirmacion("¿Deseas enviar la incidencia?", callback, "Sí,No", "Confirmación");
}

function enviarIncidencia() {
	almacenLocalGuardarClave(_nb_clave_incidencias_descripcion, $("#txtIncidencia").val());
	
		// Mis datos
	var nombre = almacenLocalObtenerClave(_nb_clave_mis_datos_nombre);
	var telefono = almacenLocalObtenerClave(_nb_clave_mis_datos_telefono);
	var direccion = almacenLocalObtenerClave(_nb_clave_mis_datos_direccion);
	
	var contenido = "<h2>Comunicación de incidencia</h2>";
	contenido += "<p><b>Fecha y hora</b>: " + fechaHoraTexto(new Date()) + "</p>";

	contenido += "<p><b>Nombre</b>: " + nombre + "<br />";
	contenido += "<b>Teléfono de contacto</b>: " + telefono + "<br />";
	contenido += "<b>Dirección</b>: " + direccion + "</p>";

	contenido += "<p><b>Descripción de la incidencia</b>:<br />" + $("#txtIncidencia").val() + "</p>";
	
	var message = window.plugins.NB_Hermes;
	
	message.emptyMessage();
	//message.to.push("ruben@netbyt.es");
	message.to.push("fincas@informesygestiones.com");
	//message.cc.push("smauricio@informesygestiones.com");
	message.subject = "INGSA - Incidencias: comunicación de una incidencia";
	message.body = contenido;
	message.isHTML = true;
	
	var fichero;
	var arrayFotos = JSON.parse(almacenLocalObtenerClave(_nb_clave_incidencias_lista));
	for (var i = 0 ; i < arrayFotos.length ; i++) {
		fichero = arrayFotos[i].fichero;
		if (fichero.substr(0, 7) == "file://")
			fichero = fichero.substr(7);
		message.attachments.push(fichero);
	}
	
    window.plugins.NB_Hermes.sendEmail(
    	function() {
    		mostrarAlerta("Mensaje enviado", "Envío de correo", "Aceptar");
    	}, 
    	function(e) {
    		mostrarAlerta("Error enviando el mensaje de correo electrónico: " + e, "Envío de correo", "Aceptar");
    	}
    );

}









﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {
	if (estanMisDatosRellenos()) {
		ocultarMensajeError();
		vaciarCampos();
	}
	else {
		$("#mensaje-error-texto").text("Antes de poder comunicar una sugerencia, comentario u opinión debe rellenar sus datos utilizando la opción del menú principal 'Mis datos'");
		mostrarMensajeError();
	}
}

function comprobarMisDatos() {
	var datosRellenos = estanMisDatosRellenos();
	if (datosRellenos)
		ocultarMensajeError();
	else {
		$("#mensaje-error-texto").text("Antes de poder comunicar una sugerencia, comentario u opinión debe rellenar sus datos utilizando la opción del menú principal 'Mis datos'");
		mostrarMensajeError();
	}
	return datosRellenos;
}

function ocultarMensajeError() {
	$("#mensaje-error").css("display", "none");
}

function mostrarMensajeError() {
	$("#mensaje-error").css("display", "table");
}

function vaciar() {
	var callback = function(confirmado){
	    if(confirmado) {
	    	vaciarCampos();
	    }
	};

	solicitarConfirmacion("¿Deseas borrar todo?", callback, "Sí,No", "Confirmación");	
}

function vaciarCampos() {
   	$("#selAplicacion-3").attr('checked',true);
   	$("#selServicio-3").attr('checked',true);

	$("input[name*=selAplicacion]").each(function () { $(this).checkboxradio("refresh"); } );
	$("input[name*=selServicio]").each(function () { $(this).checkboxradio("refresh"); } );

   	$("#txtComentario").val("");
}

function enviarDatos() {
	if (!comprobarMisDatos())
		return;
	
	var callback = function(confirmado){
	    if(confirmado)
	    	enviarDatosCorreo();
	};

	solicitarConfirmacion("¿Deseas enviar la sugerencia, comentario u opinión?", callback, "Sí,No", "Confirmación");
}

function enviarDatosCorreo() {
		// Datos del formulario
	var selAplicacion = "3";
	$("input[name*=selAplicacion]:checked").each(function () {
		selAplicacion = ($(this).val());
		}
	);
	var selServicio = "3";
	$("input[name*=selServicio]:checked").each(function () {
		selServicio = ($(this).val());
		}
	);
    var txtComentario = $("#txtComentario").val().trim();
    	// Mis datos
	var nombre = almacenLocalObtenerClave(_nb_clave_mis_datos_nombre);
	var telefono = almacenLocalObtenerClave(_nb_clave_mis_datos_telefono);
	var direccion = almacenLocalObtenerClave(_nb_clave_mis_datos_direccion);
	
	var contenido = "<h2>Sugerencia, comentario u opinión</h2>";
	contenido += "<p><b>Fecha y hora</b>: " + fechaHoraTexto(new Date()) + "</p>";
    
	contenido += "<p><b>Nombre</b>: " + nombre + "<br />";
	contenido += "<b>Teléfono de contacto</b>: " + telefono + "<br />";
	contenido += "<b>Dirección</b>: " + direccion + "</p>";
    
	contenido += "<p><b>Valoración de la aplicación</b>: " + selAplicacion + "<br />";
	contenido += "<b>Valoración del servicio</b>: " + selServicio + "<br />";
	contenido += "<b>Comentario, sugerencia u opinión</b>:<br />" + txtComentario + "</p><p>&nbsp;</p>";
    
	var message = window.plugins.NB_Hermes;
	
	message.emptyMessage();
	//message.to.push("ruben@netbyt.es");
	message.to.push("fincas@informesygestiones.com");
	//message.cc.push("smauricio@informesygestiones.com");
	message.subject = "INGSA - Incidencias: comentario, sugerencia u opinión";
	message.body = contenido;
	message.isHTML = true;
    
	window.plugins.NB_Hermes.sendEmail(
		function() {
			mostrarAlerta("Mensaje enviado", "Envío de correo", "Aceptar");
		},
        function(e) {
            mostrarAlerta("Error enviando el mensaje de correo electrónico: " + e, "Envío de correo", "Aceptar");
        }
    );
}


﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {
		// Se rellena la información del usuario
	var nombre = almacenLocalObtenerClave(_nb_clave_mis_datos_nombre);
	var telefono = almacenLocalObtenerClave(_nb_clave_mis_datos_telefono);
	var direccion = almacenLocalObtenerClave(_nb_clave_mis_datos_direccion);
	$("input#txtNombre").val(nombre || "");
	$("input#txtTelefono").val(telefono || "");
	$("input#txtDireccion").val(direccion || "");
	
	ocultarMensajeError();
}

function ocultarMensajeError() {
	$("#mensaje-error").css("display", "none");
}

function mostrarMensajeError() {
	$("#mensaje-error").css("display", "table");
}

function guardarMisDatos() {
	ocultarMensajeError();
	
    var nombre = $("input#txtNombre").val().trim();
    var telefono = $("input#txtTelefono").val().trim();
    var direccion = $("input#txtDireccion").val().trim();
    
    var existeError = false;
    $("#mensaje-error-texto").text("");
    var contenido = "<ul>";
    
    if (nombre.length == 0) {
    	contenido += "<li>Se debe indicar nombre y apellidos.</li>";
    	existeError = true;
    }
    if (telefono.length == 0) {
    	contenido += "<li>Se debe indicar un teléfono de contacto.</li>";
    	existeError = true;
    }
    if (direccion.length == 0) {
    	contenido += "<li>Se debe indicar una dirección postal.</li>";
    	existeError = true;
    }
    
    
    if (existeError) {
    	$("#mensaje-error-texto").html(contenido + "</ul>");
    	mostrarMensajeError();
    } else {
    	almacenLocalGuardarClave(_nb_clave_mis_datos_nombre, nombre);
    	almacenLocalGuardarClave(_nb_clave_mis_datos_telefono, telefono);
    	almacenLocalGuardarClave(_nb_clave_mis_datos_direccion, direccion);

    	mostrarAlerta("La información se ha guardado", "Mis datos", "Aceptar");
    }

}

