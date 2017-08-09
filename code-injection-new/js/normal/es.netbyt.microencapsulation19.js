
﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 


function onDeviceReady() {

	obtenerParametrosURL();
	
	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la información del evento.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info_menu" : "Error en la información del menú.",
		"fechas" : "Fechas",
		"sitio_web" : "Sitio web",
		"telefono" : "Teléfono",
		"contacto" : "Información de contacto",
		"persona_contacto" : "Persona de contacto",
		"correo_electronico": "Correo electrónico",
		"titulo" : "Información del evento",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the event's information.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info_menu" : "Error in menu information.",
		"fechas" : "Dates",
		"sitio_web" : "Website",
		"telefono" : "Telephone:",
		"contacto" : "Contact information",
		"persona_contacto" : "Contact person",
		"correo_electronico": "E-mail",
		"titulo" : "Event information",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	recogerEvento();
}

function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo + "</center>");
	$('#titulo_fechas').text(texto_idioma.fechas);
	$('#titulo_sitio_web').text(texto_idioma.sitio_web);
	$('#titulo_contacto').text(texto_idioma.contacto);
	
	
	
}

function recogerEvento() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerEvento();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerEvento() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var info_evento_cache = almacenLocalObtenerClave(_nb_clave_app_info_evento + idev + "-" + idioma_real);
	var info_evento;
	var ts_evento_ficha = "";
	if (info_evento_cache != null) {		
		info_evento = JSON.parse(info_evento_cache);
		if (info_evento.length > 0) {
			ts_evento_ficha = info_evento[0].ts;
		}
	}
	if (info_evento != null) {
        //console.log("info_evento = " + JSON.stringify(info_evento));
        if (info_evento[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            info_evento[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarInfoEvento(info_evento, info_evento, idev, idioma_real);
            return;
        }
    }
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_evento_ficha;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/info",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,/*
      		beforeSend: function (jqXHR) {
      			jqXHR.setRequestHeader('Accept-Encoding', 'gzip');
      	    },*/
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarInfoEvento(response, info_evento, idev, idioma_real);
               info_evento = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_info_evento + idev + "-" + idioma_real));
               info_evento[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_info_evento + idev + "-" + idioma_real, JSON.stringify(info_evento));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarInfoEvento(response, info_evento, idev, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		//console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			//errorEnDatos();
			mostrarPanelError(objResultado.error);
			return;
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				//mostrarAlerta("OK", "Eventos", "Aceptar");
				info_evento = response;
				almacenLocalGuardarClave(_nb_clave_app_info_evento + idev + "-" + idioma_real, JSON.stringify(info_evento));
				//console.log(info_evento[0].ts);
			}
			else {
				console.log("Información del evento en CACHE");
			}
				// Se procesa la información
			var objEvento = info_evento[1].row;
			
			$('#nombre_evento').text(objEvento.nom_evento);
			
			var logo_evento = "";
			if (objEvento.id_fichero_logo != 0) {
				logo_evento = "<center><img class='nb-icono-evento' id='nbe_img" + objEvento.id_fichero_logo + "' src='images/loading.gif' /></center><br />";
				$('#logo_evento').html(logo_evento);
				$('#logo_evento').css("display", "block");
			} else {
				$('#logo_evento').css("display", "none");
			}
			
			var cabecera_evento = "";
			if (objEvento.titulo != "")
				cabecera_evento += "<br /><p><strong>" + objEvento.titulo + "</strong></p><br />";
			if (objEvento.descripcion != "")
				cabecera_evento += "<p>" + objEvento.descripcion.replace(/\r\n/g, "<br />") + "</p>";
			if (logo_evento != "" || cabecera_evento != "") {
				$('#cabecera_evento').html(cabecera_evento);
				$('#cabecera_evento').css("display", "block");
			} else {
				$('#cabecera_evento').css("display", "none");
			}
			
			$('#fechas_evento').html("<br /><p>" + objEvento.lista_fechas.replace(/;/g, ",<br />") + "</p>");
			
			if (objEvento.sitio_web != "") {
					// Lo de 'navigator.app' es sólo para Android
				$('#sitio_web').attr("href", "javascript:navigator.app.loadUrl('" + objEvento.sitio_web + "', { openExternal: true });");
				$('#sitio_web').html("<p>" + objEvento.sitio_web.replace("http://", "").replace("https://", "") + "</p>");
				$('#lista_sitio_web').css("display", "block");
			} else {
				$('#lista_sitio_web').css("display", "none");
			}

			var existe_contacto = false;
			if (objEvento.info_contacto != "") {
				existe_contacto = true;
				$('#datos_contacto').html("<br /><p>" + objEvento.info_contacto.replace(/\r\n/g, "<br />") + "</p>");
				$('#datos_contacto').css("display", "block");
			} else {
				$('#datos_contacto').remove();
			}

			if (objEvento.persona_contacto != "") {
				existe_contacto = true;
				$('#persona_contacto').html("<br /><p><strong>" + texto_idioma.persona_contacto + "</strong>:<br />" + objEvento.persona_contacto + "</p>");
				$('#persona_contacto').css("display", "block");
			} else {
				$('#persona_contacto').remove();
			}

			if (objEvento.tfno_contacto != "") {
				existe_contacto = true;
				$('#enlace_tfno').attr("href", "tel:" + objEvento.tfno_contacto.replace(/ /g, ""));
				$('#enlace_tfno').html("<p><strong>" + texto_idioma.telefono + "</strong>: " + objEvento.tfno_contacto + "</p>");
				$('#tfno_contacto').css("display", "block");
			} else {
				$('#tfno_contacto').remove();
			}
			
			if (objEvento.correo_contacto != "") {
				existe_contacto = true;
				$('#enlace_correo').attr("href", "mailto:" + objEvento.correo_contacto.replace(/ /g, ""));
				$('#enlace_correo').html("<p><strong>" + texto_idioma.correo_electronico + "</strong>: " + objEvento.correo_contacto + "</p>");
				$('#correo_contacto').css("display", "block");
			} else {
				$('#correo_contacto').remove();
			}

			if (objEvento.url_facebook != "") {
					// Lo de 'navigator.app' es sólo para Android
				existe_contacto = true;
				$('#enlace_facebook').attr("href", "javascript:navigator.app.loadUrl('" + objEvento.url_facebook + "', { openExternal: true });");
				$('#enlace_facebook').html("<p><img src='images/facebook-120.png' class='nb-icono-info'/>&nbsp; Facebook</p>");
				$('#url_facebook').css("display", "block");
			} else {
				$('#url_facebook').remove();
			}

			if (objEvento.url_twitter != "") {
					// Lo de 'navigator.app' es sólo para Android
				existe_contacto = true;
				$('#enlace_twitter').attr("href", "javascript:navigator.app.loadUrl('" + objEvento.url_twitter + "', { openExternal: true });");
				$('#enlace_twitter').html("<p><img src='images/twitter-120.png' class='nb-icono-info'/>&nbsp; Facebook</p>");
				$('#url_twitter').css("display", "block");
			} else {
				$('#url_twitter').remove();
			}
			
			if (existe_contacto) {
				$('#lista_contacto').css("display", "block");
				$('#lista_contacto').find("li:last").addClass("ui-corner-bottom");
			}
			else
				$('#lista_contacto').css("display", "none");

			$("#lista_info_evento").listview('refresh');
			$("#lista_sitio_web").listview('refresh');
			$("#lista_contacto").listview('refresh');
			
			//console.log("CONTACTO = " + contacto);

			$('#info_evento').css("display", "block");
			
			if (objEvento.id_fichero_logo != 0) {
				var logo = {};
				logo.id = objEvento.id_fichero_logo;
				logo.ts = objEvento.ts_evento_logo;
				cargar_imagen(logo, true, "src", null);
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function errorEnDatos() {
	$('#info_evento').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info_menu);
}

























﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger los flash-posters del evento.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Flash-Posters",
		"titulo_principal" : "Flash-Posters",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the event's flash-posters.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Flash-Posters",
		"titulo_principal" : "Flash-Posters",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	recogerListasDatos();
}
    
function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo_principal + "</center>");
}

function recogerListasDatos() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerListasDatos();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerListasDatos() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var listas_datos_cache = almacenLocalObtenerClave(_nb_clave_app_listas_datos + idev + "-" + idioma_real);
	var listas_datos;
	var ts_listas_datos = "";
	if (listas_datos_cache != null) {		
		listas_datos = JSON.parse(listas_datos_cache);
		if (listas_datos.length > 0) {
			ts_listas_datos = listas_datos[0].ts;
		}
	}
	if (listas_datos != null) {
        //console.log("listas_datos = " + JSON.stringify(listas_datos));
        if (listas_datos[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
        	listas_datos[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarListasDatos(listas_datos, listas_datos, idev, idioma_real);
            return;
        }
    }
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_listas_datos;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/listas_datos",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarListasDatos(response, listas_datos, idev, idioma_real);
               listas_datos = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_listas_datos + idev + "-" + idioma_real));
               listas_datos[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_listas_datos + idev + "-" + idioma_real, JSON.stringify(listas_datos));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarListasDatos(response, listas_datos, idev, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		//console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			//errorEnDatos();
			mostrarPanelError(objResultado.error);
			return;
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				//mostrarAlerta("OK", "Eventos", "Aceptar");
				listas_datos = response;
				almacenLocalGuardarClave(_nb_clave_app_listas_datos + idev + "-" + idioma_real, JSON.stringify(listas_datos));
				//console.log(listas_datos[0].ts);
			}
			else {
				console.log("Información de listas datos en CACHE");
			}
				// Se procesa la información
			var nom_evento = listas_datos[0].nom_evento;
			$('#nombreEvento').html("<center>" + nom_evento + "</center>");
			var lista_listas_datos = listas_datos[1].listas_datos;
			var contador_listas_datos = lista_listas_datos.length - 1;
			
			var codigo = "";
			var lista_datos;
			for (var i=1 ; i<= contador_listas_datos ; i++) {
				lista_datos = lista_listas_datos[i];
				//console.log(lista_datos);

				codigo += "<li><a href='lista-datos-info.html?idld=" + lista_datos[0] + "' data-ajax='false'>";
				codigo += "<p><br /><strong>" + lista_datos[1] + "</strong><br /></p></a></li>";
			}
			
			$("#lista_listas_datos").html(codigo);
			$("#lista_listas_datos").listview("refresh");
			$("#lista_listas_datos").trigger("create");
			$('#listas_datos_contenido').css("display", "block");

		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function errorEnDatos() {
	$('#listas_datos_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info);
}




﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {
	obtenerParametrosURL();

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la información del ponente.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Ponente",
		"boton_ponentes" : "Ponentes",
		"boton_volver" : "Volver",
		"participa_en" : "Participa en",
		"poblacion" : "Población",
		"pais" : "País",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the information of the speaker.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Speaker",
		"boton_ponentes" : "Speakers",
		"boton_volver" : "Back",
		"participa_en" : "Participates in",
		"poblacion" : "City",
		"pais" : "Country",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);

	recogerPonente();
}

function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo + "</center>");
	if (urlParams.hasOwnProperty("ida")) {
		$('#boton_ponentes .ui-btn-text').text(texto_idioma.boton_volver);
		$('#boton_ponentes').attr('href', 'actividad.html?ida=' + urlParams.ida);
	}
	else
		$('#boton_ponentes .ui-btn-text').text(texto_idioma.boton_ponentes);
}

function recogerPonente() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerPonente();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerPonente() {
	var idev = "0";
	var idpo = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	if (urlParams.hasOwnProperty("idpo")) {
		idpo = urlParams.idpo;
	} else {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var ponente_cache = almacenLocalObtenerClave(_nb_clave_app_ponente + idev + "-" + idpo + "-" + idioma_real);
	var ponente;
	var ts_ponente = "";
	if (ponente_cache != null) {		
		ponente = JSON.parse(ponente_cache);
		if (ponente.length > 0) {
			ts_ponente = ponente[0].ts;
		}
	}
	if (ponente != null) {
        //console.log("ponente = " + JSON.stringify(ponente));
        if (ponente[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            ponente[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarPonente(ponente, ponente, idev, idpo, idioma_real);
            return;
        }
    }
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&idpo=" + idpo + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_ponente;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/ponente",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarPonente(response, ponente, idev, idpo, idioma_real);
               ponente = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_ponente + idev + "-" + idpo + "-" + idioma_real));
               ponente[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_ponente + idev + "-" + idpo + "-" + idioma_real, JSON.stringify(ponente));

      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarPonente(response, ponente, idev, idpo, idioma_real) {
	if (isArray(response) && response.length == 3) {
		var objResultado = response[0];
		
		//console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			//errorEnDatos();
			mostrarPanelError(objResultado.error);
			return;
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				//mostrarAlerta("OK", "Eventos", "Aceptar");
				ponente = response;
				almacenLocalGuardarClave(_nb_clave_app_ponente + idev + "-" + idpo + "-" + idioma_real, JSON.stringify(ponente));
				//console.log(ponente[0].ts);
			}
			else {
				console.log("Información del ponente en CACHE");
			}
			//console.log("PONENTE = " + JSON.stringify(ponente));
			
				// Se procesa la información
			var nom_evento = ponente[0].nom_evento;
			$('#nombreEvento').html("<center>" + nom_evento + "</center>");

				// Datos de la cabecera
			var datos_cabecera = ponente[1].row;
			
			//console.log("DATOS CABECERA = " + JSON.stringify(datos_cabecera));
			
			var codigo = "<li data-role='list-divider'>" + datos_cabecera.apellidos + ", " + datos_cabecera.nombre + "</li>";
			
			codigo += "<li><br />";
			var primero = true;
			if (datos_cabecera.organizacion != "") {
				codigo += "<p><strong>" + datos_cabecera.organizacion + "</strong></p>";
				primero = false;
			}
			if (datos_cabecera.puesto != "") {
				codigo += "<p><strong>" + datos_cabecera.puesto + "</strong></p>";
				primero = false;
			}
			if (datos_cabecera.descripcion != "") {
				if (!primero)
					codigo +="<br />";
				codigo += "<p>" + datos_cabecera.descripcion.replace(/\r\n/g, "<br />") + "</p>";
				primero = false;
			}
			if (datos_cabecera.poblacion != "") {
				if (!primero)
					codigo +="<br />";
				codigo += "<p><strong>" + texto_idioma.poblacion + "</strong>: " + datos_cabecera.poblacion + "</p>";
				primero = false;
			}
			if (datos_cabecera.pais != "") {
				if (!primero)
					codigo +="<br />";
				codigo += "<p><strong>" + texto_idioma.pais + "</strong>: " + datos_cabecera.pais + "</p>";
				primero = false;
			}
			codigo += "</li>";
			
			$("#ponente_cabecera").html(codigo);
			$("#ponente_cabecera").listview("refresh");
			$("#ponente_cabecera").trigger("create");

				// Actividade 
			var datos_actividades = ponente[2].actividades;
			var contador_actividades = datos_actividades.length - 1;
			
			//console.log("NUM_ACTIVIDADES: " + contador_actividades);
			
			var actividad;
			if (contador_actividades > 0) {
				codigo = "<li data-role='list-divider'>" + texto_idioma.participa_en + "</li>";
				for (var i=1 ; i<= contador_actividades ; i++) {
					actividad = datos_actividades[i];
					codigo += "<li><a href='actividad.html?ida=" + actividad[0] + "&idpo=" + idpo + "' data-ajax='false'><br /><p><strong>" + actividad[1] + "</strong>";
					codigo += "<br />" + actividad[3] + "<br />" + actividad[2] + "</p></a></li>";
				}
				
				$("#ponente_actividades").html(codigo);
				$("#ponente_actividades").listview("refresh");
				$("#ponente_actividades").trigger("create");

			}

			$('#ponente_contenido').css("display", "block");
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function errorEnDatos() {
	$('#ponente_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info);
}




﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

$(document).on("pageinit", function(){
	//console.log("PAGE_INIT");
    $("#lista_ponentes").listview({
        autodividers: true,
        autodividersSelector: function (li) {
            var out = li.attr("inicial");
            return out;
        }
    }).listview("refresh");
});

function onDeviceReady() {

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la lista de ponentes.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Ponentes",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the list of speakers.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Speakers",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	// Si es Android versión 2.X se desactiva el filtro
	if (device.platform == "Android" && device.version.substr(0, 2) == "2.")
		$('#lista_ponentes').prev("form.ui-listview-filter").toggle();

	mostrarPonentes();
}

function mostrarPonentes() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}

	recogerPonentes();
}

function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo + "</center>");
	$('#titulo_fechas').text(texto_idioma.fechas);
	$('#titulo_sitio_web').text(texto_idioma.sitio_web);
	$('#titulo_contacto').text(texto_idioma.contacto);
}

function recogerPonentes() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerPonentes();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerPonentes() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var ponentes_cache = almacenLocalObtenerClave(_nb_clave_app_ponentes + idev + "-" + idioma_real);
	var ponentes;
	var ts_ponentes = "";
	if (ponentes_cache != null) {		
		ponentes = JSON.parse(ponentes_cache);
		if (ponentes.length > 0) {
			ts_ponentes = ponentes[0].ts;
		}
	}
	if (ponentes != null) {
        //console.log("ponentes = " + JSON.stringify(ponentes));
        if (ponentes[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            ponentes[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarPonentes(ponentes, ponentes, idev, idioma_real);
            return;
        }
    }
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_ponentes;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/ponentes",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarPonentes(response, ponentes, idev, idioma_real);
               ponentes = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_ponentes + idev + "-" + idioma_real));
               ponentes[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_ponentes + idev + "-" + idioma_real, JSON.stringify(ponentes));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarPonentes(response, ponentes, idev, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		//console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			//errorEnDatos();
			mostrarPanelError(objResultado.error);
			return;
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				ponentes = response;
				almacenLocalGuardarClave(_nb_clave_app_ponentes + idev + "-" + idioma_real, JSON.stringify(ponentes));
				//console.log(ponentes[0].ts);
			}
			else {
				console.log("Información de ponentes en CACHE");
			}
				// Se procesa la información
			var nom_evento = ponentes[0].nom_evento;
			$('#nombreEvento').html("<center>" + nom_evento + "</center>");
			var lista_ponentes = ponentes[1].ponentes;
			var contador_ponentes = lista_ponentes.length - 1;
			//console.log(contador_ponentes);
			
			var codigo = "";
			for (var i=1 ; i<= contador_ponentes ; i++) {
				ponente = lista_ponentes[i];
				//console.log(ponente);
				
				codigo += "<li inicial='" + generarInicial(ponente[2]) + "'>";
				codigo += "<a href='ponente.html?idpo=" + ponente[0] + "' data-ajax='false'>";
				codigo += "<br /><p><strong>" + ponente[2] + ", " + ponente[1] + "</strong>";
				if (ponente[3] != "") {
					codigo += "<br />" + ponente[3];
				}
				if (ponente[4] != "") {
					if (ponente[3] != "")
						codigo += ", " + ponente[4];
					else
						codigo += "<br />" + ponente[4];
				}
				codigo += "</p></a>";
				codigo += "</li>";
			}
			
			$("#lista_ponentes").html(codigo);
			$("#lista_ponentes").listview("refresh");
			$("#lista_ponentes").trigger("create");
			$('#ponentes_contenido').css("display", "block");
			
			$("#ponentes_contenido").trigger("create");
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function generarInicial(texto) {
	var origen = "ÁÉÍÓÚÜÇ";
	var destino = "AEIOUUC";
	var indice;
    texto = $.trim(texto);

    if ( texto == "" ) {
        return "-";
    }
    if ( !isNaN(parseFloat(texto)) ) {
        return "0-9";
    } else {
        texto = texto.substring(0, 1).toUpperCase();
        indice = origen.indexOf(texto);
        if (indice >= 0)
        	texto = destino.substring(indice, indice + 1);
        return texto;
    }
}

function errorEnDatos() {
	$('#ponentes_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info_menu);
}












﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger los alojamientos del evento.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Alojamientos",
		"titulo_principal" : "Alojamientos del evento",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the event's agenda.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Accommodation",
		"titulo_principal" : "Event's accommodation",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	recogerAlojamientos();
}
    
function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo_principal + "</center>");
}

function recogerAlojamientos() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerAlojamientos();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerAlojamientos() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var alojamientos_cache = almacenLocalObtenerClave(_nb_clave_app_alojamientos + idev + "-" + idioma_real);
	var alojamientos;
	var ts_alojamientos = "";
	if (alojamientos_cache != null) {		
		alojamientos = JSON.parse(alojamientos_cache);
		if (alojamientos.length > 0) {
			ts_alojamientos = alojamientos[0].ts;
		}
	}
    if (alojamientos != null) {
        //console.log("alojamientos = " + JSON.stringify(alojamientos));
        if (alojamientos[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            alojamientos[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarAlojamientos(alojamientos, alojamientos, idev, idioma_real);
            return;
        }
    }
    
	var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_alojamientos;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/alojamientos",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarAlojamientos(response, alojamientos, idev, idioma_real);
               alojamientos = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_alojamientos + idev + "-" + idioma_real));
               alojamientos[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_alojamientos + idev + "-" + idioma_real, JSON.stringify(alojamientos));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarAlojamientos(response, alojamientos, idev, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		//console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			mostrarPanelError(objResultado.error);
			return;
            }
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				//mostrarAlerta("OK", "Eventos", "Aceptar");
				alojamientos = response;
				almacenLocalGuardarClave(_nb_clave_app_alojamientos + idev + "-" + idioma_real, JSON.stringify(alojamientos));
				//console.log(alojamientos[0].ts);
			}
			else {
				console.log("Información de alojamientos en CACHE");
			}
				// Se procesa la información
			var nom_evento = alojamientos[0].nom_evento;
			var info_alojamiento = alojamientos[0].info_alojamiento;
			$('#nombreEvento').html("<center>" + nom_evento + "</center>");
			var lista_alojamientos = alojamientos[1].alojamientos;
			var contador_alojamientos = lista_alojamientos.length - 1;
				// Info. Alojamiento
			if (info_alojamiento != ""){
				$("#info_alojamiento").html("<li><p><br />" + info_alojamiento.replace(/\r\n/g, "<br />") + "</p></li>");
				$("#info_alojamiento").listview("refresh");
				$("#info_alojamiento").trigger("create");
				$('#info_alojamiento_contenido').css("display", "block");
			}

			var codigo = "<li data-role='list-divider'>" + texto_idioma.titulo + "</li>";
			var alojamiento;
			var primero;
			for (var i=1 ; i<= contador_alojamientos ; i++) {
				primero = true;
				alojamiento = lista_alojamientos[i];
				//console.log(alojamiento);

				codigo += "<li><a href='alojamiento.html?idal=" + alojamiento[0] + "' data-ajax='false'>";
				codigo += "<p><br /><strong>" + alojamiento[1] + "</strong><br />";
				if (alojamiento[2] != "")
					codigo += alojamiento[2];
				if (alojamiento[3] != "") {
					primero = false;
					codigo += "<br />";
					codigo += alojamiento[3];
				}
				if (alojamiento[4] != "") {
					if (primero) {
						primero = false;
						codigo += "<br />";
					}
					else
						codigo += ", ";
					codigo += alojamiento[4];
				}
				if (alojamiento[5] != "") {
					if (primero) {
						primero = false;
						codigo += "<br />";
					}
					else
						codigo += ", ";
					codigo += alojamiento[5];
				}
				if (alojamiento[6] != "") {
					if (primero) {
						primero = false;
						codigo += "<br />";
					}
					else
						codigo += ", ";
					codigo += alojamiento[6];
				}
				codigo += "</p></a></li>";
			}
			
			$("#lista_alojamientos").html(codigo);
			$("#lista_alojamientos").listview("refresh");
			$("#lista_alojamientos").trigger("create");
			$('#alojamientos_contenido').css("display", "block");

		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function errorEnDatos() {
	$('#alojamientos_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info);
}











/* VerImagen */

function VerImagen() {
};

VerImagen.EVENTO_CERRAR = 1;

VerImagen.prototype.mostrarImagen = function(url, options) {
    options = options || {
        descripcion: ""
    };
    cordova.exec(this._onEvent, this._onError, "VerImagen", "mostrarImagen", [url, options]);
};

VerImagen.prototype.close = function() {
    cordova.exec(null, null, "VerImagen", "cerrar", []);
};

VerImagen.prototype._onEvent = function(data) {
    if (data.type == VerImagen.EVENTO_CERRAR && typeof window.plugins.VerImagen.onClose === "function") {
        window.plugins.VerImagen.onClose();
    }
};

VerImagen.prototype._onError = function(data) {
    if (typeof window.plugins.VerImagen.onError === "function") {
        window.plugins.VerImagen.onError(data);
    }
};

VerImagen.prototype.install = function(){
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.VerImagen) {
    window.plugins.VerImagen = new VerImagen();
}









﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {
	obtenerParametrosURL();

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la información de la actividad.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Actividad",
		"tipo_actividad" : "Tipo de actividad",
		"fecha" : "Fecha",
		"descripcion" : "Descripción",
		"eliminar_favoritas" : "Eliminar de favoritas",
		"anadir_favoritas" : "Añadir a favoritas",
		"localizacion" : "Localización",
		"ponentes" : "Ponentes",
		"boton_agenda" : "Prog.",
		"boton_volver" : "Volver",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the information of the activity.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Activity",
		"tipo_actividad" : "Type of activity",
		"fecha" : "Date",
		"descripcion" : "Description",
		"eliminar_favoritas" : "Remove from favourites",
		"anadir_favoritas" : "Add to favourites",
		"localizacion" : "Location",
		"ponentes" : "Speakers",
		"boton_agenda" : "Prog.",
		"boton_volver" : "Back",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	recogerActividad();
}

function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo + "</center>");
	if (urlParams.hasOwnProperty("idpo")) {
		$('#boton_agenda .ui-btn-text').text(texto_idioma.boton_volver);
		$('#boton_agenda').attr('href', 'ponente.html?idpo=' + urlParams.idpo);
	}
	else
		$('#boton_agenda .ui-btn-text').text(texto_idioma.boton_agenda);
	$('#anadir_fav').text(texto_idioma.anadir_favoritas);
	$('#eliminar_fav').text(texto_idioma.eliminar_favoritas);
}

function recogerActividad() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerActividad();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerActividad() {
	var idev = "0";
	var ida = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	if (urlParams.hasOwnProperty("ida")) {
		ida = urlParams.ida;
	} else {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var actividad_cache = almacenLocalObtenerClave(_nb_clave_app_actividad + idev + "-" + ida + "-" + idioma_real);
	var actividad;
	var ts_actividad = "";
	if (actividad_cache != null) {		
		actividad = JSON.parse(actividad_cache);
		if (actividad.length > 0) {
			ts_actividad = actividad[0].ts;
		}
	}
    if (actividad != null) {
        console.log("actividad = " + JSON.stringify(actividad));
        if (actividad[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            actividad[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarActividad(actividad, actividad, idev, ida, idioma_real);
            return;
        }
    }
    
	var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&ida=" + ida + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_actividad;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/actividad",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarActividad(response, actividad, idev, ida, idioma_real);
               actividad = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_actividad + idev + "-" + ida + "-" + idioma_real));
               actividad[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_actividad + idev + "-" + ida + "-" + idioma_real, JSON.stringify(actividad));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarActividad(response, actividad, idev, ida, idioma_real) {
	if (isArray(response) && response.length == 3) {
		var objResultado = response[0];
		
		console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			mostrarPanelError(objResultado.error);
			return;
            }
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				//mostrarAlerta("OK", "Eventos", "Aceptar");
				actividad = response;
				almacenLocalGuardarClave(_nb_clave_app_actividad + idev + "-" + ida + "-" + idioma_real, JSON.stringify(actividad));
				console.log(actividad[0].ts);
			}
			else {
				console.log("Información de la actividad en CACHE");
			}
			//console.log("ACTIVIDAD = " + JSON.stringify(actividad));
			
				// Se procesa la información
			var nom_evento = actividad[0].nom_evento;
			$('#nombreEvento').html("<center>" + nom_evento + "</center>");

				// Se obtiene datos de favoritas
			var clave_favoritas = almacenLocalObtenerClave(_nb_clave_app_actividades_favoritas + idev);
			var favoritas = [];
			if (clave_favoritas != null)
				favoritas = JSON.parse(clave_favoritas);
			
				// Datos de la cabecera
			var datos_cabecera = actividad[1].row;
			
			//console.log("DATOS CABECERA = " + JSON.stringify(datos_cabecera));
			
				// Botones para añadir / eliminar de favoritas
			var clave_favoritas = almacenLocalObtenerClave(_nb_clave_app_actividades_favoritas + idev);
			var favoritas = [];
			if (clave_favoritas != null)
				favoritas = JSON.parse(clave_favoritas);
			if ( favoritas.indexOf(datos_cabecera.id_actividad) == -1 ) {
				$('#boton_favoritas_si').css("display", "block");
				$('#boton_favoritas_no').css("display", "none");
			} else {
				$('#boton_favoritas_si').css("display", "none");
				$('#boton_favoritas_no').css("display", "block");
			}
			
			var codigo = "<li data-role='list-divider'>" + datos_cabecera.nom_actividad + "</li>";
			
			codigo += "<li>";
			if ( favoritas.indexOf(datos_cabecera.id_actividad) != -1 )
				codigo += "<p style='float: right'><img src='images/favorito.png' width='24px' height='24px' /></p>";
			codigo += "<br /><p><strong>" + texto_idioma.tipo_actividad + "</strong>: " + datos_cabecera.nom_t_actividad + "</p>";
			codigo += "<p><strong>" + texto_idioma.fecha + "</strong>: " + datos_cabecera.fecha_hora + "</p>";
			if (datos_cabecera.descripcion != "")
				codigo += "<p><strong>" + texto_idioma.descripcion + "</strong>:<br />" + datos_cabecera.descripcion.replace(/\r\n/g, "<br />") + "</p>";
			codigo += "</li>";
			
			$("#actividad_cabecera").html(codigo);
			$("#actividad_cabecera").listview("refresh");
			$("#actividad_cabecera").trigger("create");

				// Lugar
			codigo = "<li data-role='list-divider'>" + texto_idioma.localizacion + "</li>";
			codigo += "<li><a href='edificio.html?ided=" + datos_cabecera.id_edificio + "&ida=" + ida + "' data-ajax='false'><br /><p><strong>" + datos_cabecera.nom_edificio + "</strong>";
			codigo += "<br />" + datos_cabecera.nom_recurso_edificio + "</p></a></li>";
			
			$("#actividad_lugar").html(codigo);
			$("#actividad_lugar").listview("refresh");
			$("#actividad_lugar").trigger("create");
			
				// Ponentes
			var datos_ponentes = actividad[2].ponentes;
			var contador_ponentes = datos_ponentes.length - 1;
			
			//console.log("NUM_PONENTES: " + contador_ponentes);
			
			var ponente;
			if (contador_ponentes > 0) {
				codigo = "<li data-role='list-divider'>" + texto_idioma.ponentes + "</li>";
				for (var i=1 ; i<= contador_ponentes ; i++) {
					ponente = datos_ponentes[i];
					codigo += "<li><a href='ponente.html?idpo=" + ponente[0] + "&ida=" + ida + "' data-ajax='false'><br /><p><strong>" + ponente[2] + ", " + ponente[1] + "</strong>";
					codigo += "<br />" + ponente[3] + "<br />" + ponente[4] + "</p></a></li>";
				}
				
				$("#actividad_ponentes").html(codigo);
				$("#actividad_ponentes").listview("refresh");
				$("#actividad_ponentes").trigger("create");

			}
			
			$('#actividad_contenido').css("display", "block");
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function favoritas(accion) {
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	ida = parseInt(urlParams.ida);
	
	var clave_favoritas = almacenLocalObtenerClave(_nb_clave_app_actividades_favoritas + idev);
	var favoritas = [];
	if (clave_favoritas != null)
		favoritas = JSON.parse(clave_favoritas);

	if (accion == "S") {
		if (favoritas.indexOf(ida) == -1) {
			favoritas.push(ida);
			almacenLocalGuardarClave(_nb_clave_app_actividades_favoritas + idev, JSON.stringify(favoritas));
		}
	} else {
		var indice = favoritas.indexOf(ida);
		if (indice != -1) {
			favoritas.splice(indice, 1);
			almacenLocalGuardarClave(_nb_clave_app_actividades_favoritas + idev, JSON.stringify(favoritas));
		}
	}
	
	leerActividad();
}

function errorEnDatos() {
	$('#actividad_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info);
}




﻿	/*! netBytes software */
var _nb_version_actual = "1.0.4";
var _nb_id_empresa = "10";
var segundos_cache = 120;
var _nb_directorio_ficheros = "/data/data/es.netbyt.microencapsulation19/ficheros";

var _nb_clave_app_version = "G.version";
var _nb_clave_app_id_evento = "G.id_evento";
var _nb_clave_app_idioma = "G.idioma";
var _nb_clave_app_idioma_real = "G.idioma_real";
var _nb_clave_app_codigo_autorizacion = "G.codigo_autorizacion";

var _nb_clave_app_ts_leer_notas_prensa = "G.ts_leer_notas_prensa";
var _nb_clave_app_ts_leer_avisos = "G.leer_avisos";

var _nb_clave_app_prefijo_fichero = "G.fich";
var _nb_clave_app_etiqueta_fichero = "nbe_img";

var _nb_clave_app_lista_eventos = "G.lista_eventos";
var _nb_clave_app_menu_inicio = "G.menu_inicio";
var _nb_clave_app_info_evento = "G.info_evento";
var _nb_clave_app_que_actividades = "G.que_actividades";
var _nb_clave_app_actividades_favoritas = "G.actividades_favoritas";
var _nb_clave_app_agenda = "G.agenda";
var _nb_clave_app_actividad = "G.actividad";
var _nb_clave_app_planos = "G.planos";
var _nb_clave_app_expositores = "G.expositores";
var _nb_clave_app_expositor = "G.expositor";
var _nb_clave_app_ponentes = "G.ponentes";
var _nb_clave_app_ponente = "G.ponente";
var _nb_clave_app_colaboradores = "G.colaboradores";
var _nb_clave_app_alojamientos = "G.alojamientos";
var _nb_clave_app_alojamiento = "G.alojamiento";
var _nb_clave_app_edificios = "G.edificios";
var _nb_clave_app_edificio = "G.edificio";
var _nb_clave_app_recurso = "G.recurso";
var _nb_clave_app_servicios = "G.servicios";
var _nb_clave_app_avisos = "G.avisos";
var _nb_clave_app_notas_prensa = "G.notas_prensa";
var _nb_clave_app_nota_prensa = "G.nota_prensa";
var _nb_clave_app_listas_datos = "G.listas_datos";
var _nb_clave_app_lista_datos_info = "G.lista_datos_info";

var urlParams = {};

var texto_es = {};
var texto_en = {};
var texto_idioma = {};

function obtenerParametrosURL() {
	var match,
	pl     = /\+/g,  // Regex for replacing addition symbol with a space
	search = /([^&=]+)=?([^&]*)/g,
	decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
	query  = window.location.search.substring(1);

    while (match = search.exec(query))
    	urlParams[decode(match[1])] = decode(match[2]);
}

function seleccionarIdioma(escribirTextoIdiomas) {
		// Selecciona el idioma
	//console.log("SELECCIONAR IDIOMA");
	
	var idioma = almacenLocalObtenerClave(_nb_clave_app_idioma);
	//console.log("IDIOMA CONFIG. = " + idioma);
	
	if (idioma == "A") {
		navigator.globalization.getPreferredLanguage(
			function (idioma) {
                //console.log("Prefered language = " + idioma.value);
				if (idioma.value.toLowerCase() == "español" || idioma.value.toLowerCase() == "es") {
					texto_idioma = texto_es;
                    almacenLocalGuardarClave(_nb_clave_app_idioma_real, "ES");
					//console.log("IDIOMA = es");
                    escribirTextoIdiomas();
				}
				else {
					texto_idioma = texto_en;
					almacenLocalGuardarClave(_nb_clave_app_idioma_real, "EN");
					//console.log("IDIOMA = en");
                    escribirTextoIdiomas();
				}
			},
			function (idioma) {
				texto_idioma = texto_es;
				almacenLocalGuardarClave(_nb_clave_app_idioma_real, "ES");
				//console.log("IDIOMA = es");
                escribirTextoIdiomas();
			}
		);
	} else if (idioma == "EN") {
		texto_idioma = texto_en;
		almacenLocalGuardarClave(_nb_clave_app_idioma_real, "EN");
		//console.log("IDIOMA = en");
        escribirTextoIdiomas();
	} else {
		texto_idioma = texto_es;
		almacenLocalGuardarClave(_nb_clave_app_idioma_real, "ES");
		//console.log("IDIOMA = es");
        escribirTextoIdiomas();
	}
	
}
	

function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}

function segundosDesde1970() {
    var fecha = new Date();
    return Math.floor(fecha.getTime() / 1000);
}

function fechaISO() {
    var fecha = new Date();
    return fecha.toISOString().substr(0, 10).replace(/-/g, "");
}

function inicializarVariables() {
	almacenLocalGuardarClave(_nb_clave_app_version, _nb_version_actual);
	almacenLocalGuardarClave(_nb_clave_app_id_evento, "0");	
	//almacenLocalGuardarClave(_nb_clave_app_idioma, "A");	// Automático
	almacenLocalGuardarClave(_nb_clave_app_idioma, "EN");	// English
	almacenLocalGuardarClave(_nb_clave_app_codigo_autorizacion, "");

	//console.log("Variables inicializadas");
}

function esClaveIntocable(clave) {
    return (clave == _nb_clave_app_version ||
            clave == _nb_clave_app_id_evento ||
            //clave == _nb_clave_app_lista_eventos ||
            clave == _nb_clave_app_idioma ||
            clave == _nb_clave_app_codigo_autorizacion
        );
}

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

function mostrarAlerta(mensaje, titulo, textoBoton) {
    if(navigator.notification && navigator.notification.alert){
    	navigator.notification.alert(mensaje, null, titulo, textoBoton);
    } else {
    	alert(mensaje);
    }
}

function acercaDe() {
	mostrarAlerta("netBytes software - Eventos\nVersión 1.0", "Acerca de", "Aceptar");
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
	textoBotones = textoBotones || ["Sí","No"];

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
	var networkState = navigator.connection.type;

	return !(networkState == Connection.UNKNOWN || networkState == Connection.NONE);
}

	// Carga una imagen del servidor.
	// Si está en CACHE no se recoge.
	// Si mostrar = TRUE se pinta. Si mostrar = FALSE sólo se guarda en CACHE (si no está)
	// modo_guardar: "src" ;  "html"
	// onFin: función llamada cuando el fichero esté disponible
/////////////// PENDIENTE DE CONSIDERAR ERRORES /////////////////
function cargar_imagen(imagen, mostrar, modo_guardar, onFin) {
	//console.log("Logo: id=" + imagen.id + ", ts=" + imagen.ts);
	
	var fichero = _nb_clave_app_etiqueta_fichero + imagen.id;
	if (modo_guardar == "html")
		fichero += ".html";
	var id_elemento = "#" + _nb_clave_app_etiqueta_fichero + imagen.id;
	var clave_fich_cache = _nb_clave_app_prefijo_fichero + imagen.id;
	var objFicheroString = almacenLocalObtenerClave(clave_fich_cache);
    var ts_cache = null;
    if (objFicheroString != null)
        ts_cache = (JSON.parse(objFicheroString)).ts;
	//console.log("ts_cache = " + ts_cache);
	var descargar = false;
	if (ts_cache == null) {
		descargar = true;
	}
	else {
		if (imagen.ts > ts_cache)
			descargar = true;
		else {
			if (mostrar)
				leerFicheroImagen(fichero, id_elemento);
			if (typeof onFin === "function")
				onFin(_nb_directorio_ficheros + "/" + fichero);
		}
	}
	
	//console.log(descargar);
	
	if (descargar) {
		try
	    {
			$.ajax({ 
	      		url: "http://resteventos.netbyt.es/fichero.aspx/imagen",
	      		type: "POST",
	      		data: "id=" + imagen.id,
	      		dataType: "jsonp",
	      		timeout: 20000,		// 20 s
	      		cache : false,
	      		success: function( response ) {
	      			//console.log("SUCCESS");

	      			guardarFichero(fichero, response[0].dataURI, modo_guardar, onFin);
                    var objFichero = {};
                    objFichero.ts = imagen.ts;
                    objFichero.num_bytes = response[0].dataURI.length;
	      			objFichero.fichero = fichero;
	      			almacenLocalGuardarClave(clave_fich_cache, JSON.stringify(objFichero));
	      			if (mostrar)
	      				$(id_elemento).attr('src', response[0].dataURI);
	      		},
	      		error: function(jqXHR, textStatus, errorThrown) {
	      			console.log("ERROR");
	      			if (mostrar)
	      				$(id_elemento).attr('src', "images/img-error.png");
	      			if (typeof onFin === "function")
	    				onFin("");
	    			},
	      		complete: function(jqXHR, textStatus) { 
	      			} 
	   		});
	    }
	    catch (err)
	    {
	    	if (mostrar)
	    		$(id_elemento).attr('src', "images/img-error.png");
	    	if (typeof onFin === "function")
				onFin("");
	    }
	}
	
}

function guardarFichero(nombre, contenido, modo_guardar, onFin) {
	//console.log("GUARDAR FICHERO: " + _nb_directorio_ficheros + '/' + nombre);
	window.requestFileSystem(
		LocalFileSystem.PERSISTENT,
		0,
		function (fileSystem) {
			//console.log("File System Root: " + fileSystem.root.fullPath);
			fileSystem.root.getDirectory(
				_nb_directorio_ficheros,
	        	{create: true, exclusive: false},
	        	function (dirEntry) {
	        		//console.log("DIRECTORIO CREADO.");
	        		dirEntry.getFile(
    		        	nombre,
    		        	{create: true, exclusive: false},
    		        	function (fileEntry) {
    		        		//console.log("CREAR FICHERO: " + fileEntry.name);
    		                fileEntry.createWriter(
    	                		function (writer) {
    	                	        writer.onwriteend = function(evt) {
    	                	            //console.log("Fichero escrito.");
    	                	            if (typeof onFin === "function")
    	                					onFin(_nb_directorio_ficheros + "/" + nombre);
    	                	        };
    	                	        if (modo_guardar == "src")
    	                	        	writer.write(contenido);
    	                	        else
    	                	        	writer.write("<html><body><img src='" + contenido + "' /></body></html>");
    	                	    },
    	                	    function (error) {
    	                	        console.log("Error: " + mensajeErrorFichero(error.code));
    	                	        if (typeof onFin === "function")
    	        	    				onFin("");
    	                	    }
    		                );
    		            },
    		            function (error) {
    		    	        console.log("Error: " + mensajeErrorFichero(error.code));
    		    	        if (typeof onFin === "function")
    		    				onFin("");
    		    	    }
    		        );
	            },
	            function (error) {
	    	        console.log("Error: " + mensajeErrorFichero(error.code));
	    	        if (typeof onFin === "function")
	    				onFin("");
	    	    }
			);
	    },
	    function (error) {
	        console.log("Error: " + mensajeErrorFichero(error.code));
	        if (typeof onFin === "function")
				onFin("");
	    }
	);
}

function borrarFicheroImagen(nombre, clave) {
    //console.log("BORRAR FICHERO: " + _nb_directorio_ficheros + "/" + nombre);
	//console.log("BORRAR FICHERO: " + nombre);
	window.requestFileSystem(
		LocalFileSystem.PERSISTENT,
		0,
		function (fileSystem) {
	        fileSystem.root.getFile(
	        	_nb_directorio_ficheros + "/" + nombre,
	        	null,
	        	function (fileEntry) {
	                fileEntry.remove(
	                	function (file) {
                            almacenLocalEliminarClave(clave);
                            //console.log("FICHERO BORRADO: " + nombre);
	                	},
	                	function (error) {
	            	        console.log("Error: " + mensajeErrorFichero(error.code) + " - " + nombre);
	            	    }
	                );
	            },
	            function (error) {
	    	        console.log("Error: " + mensajeErrorFichero(error.code) + " " + nombre);
	    	    }
	        );
	    },
	    function (error) {
	        console.log("Error: " + mensajeErrorFichero(error.code));
	    }
	);
}

/*

function borrarVariosFicherosImagen(array) {
    window.requestFileSystem(
		LocalFileSystem.PERSISTENT,
		0,
		function (fileSystem) {
            var nombre;
            var clave;
            
            for (key in array) {
                nombre = array[key].replace(_nb_clave_app_prefijo_fichero, _nb_clave_app_etiqueta_fichero);
                clave = array[key];
                console.log("Nombre = " + nombre);

                fileSystem.root.getFile(
                    _nb_directorio_ficheros + "/" + nombre,
                    null,
                    function (fileEntry) {
                        console.log("BORRAR FICHERO: " + fileEntry.name);
	
                        fileEntry.remove(
                            function (file) {
                                almacenLocalEliminarClave(clave);
                                console.log("FICHERO BORRADO: " + fileEntry.name);
                            },
                            function (error) {
                                console.log("Error: " + mensajeErrorFichero(error.code) + " - " + fileEntry.name);
                            }
                        );
                    },
                    function (error) {
                        console.log("Error: " + mensajeErrorFichero(error.code));
                    }
                );
            }
            
	    },
	    function (error) {
	        console.log("Error: " + mensajeErrorFichero(error.code));
	    }
	);
}
*/

function leerFicheroImagen(nombre, id_imagen) {
    //console.log("LEER FICHERO: " + _nb_directorio_ficheros + "/" + nombre);
	window.requestFileSystem(
		LocalFileSystem.PERSISTENT,
		0,
		function (fileSystem) {
	        fileSystem.root.getFile(
	        	_nb_directorio_ficheros + "/" + nombre,
	        	null,
	        	function (fileEntry) {
	                fileEntry.file(
	                	function (file) {
							var reader = new FileReader();
							reader.onloadend = function(evt) {
								console.log("Fichero leído.");
								$(id_imagen).attr('src', this.result);
								//$(id_imagen).trigger("create");
							};
							reader.readAsText(file);
	                	},
	                	function (error) {
	            	        console.log("Error: " + mensajeErrorFichero(error.code));
	            	    }
	                );
	            },
	            function (error) {
	    	        console.log("Error: " + mensajeErrorFichero(error.code));
	    	    }
	        );
	    },
	    function (error) {
	        console.log("Error: " + mensajeErrorFichero(error.code));
	    }
	);
}

function mensajeErrorFichero(codigo) {
	switch (codigo) {
	case FileError.NOT_FOUND_ERR:
		return "No encontrado";
		break;
	case FileError.SECURITY_ERR:
		return "Error de seguridad";
		break;
	case FileError.ABORT_ERR:
		return "Operación abortada";
		break;
	case FileError.NOT_READABLE_ERR:
		return "Error de lectura";
		break;
	case FileError.ENCODING_ERR:
		return "Error de codificación";
		break;
	case FileError.NO_MODIFICATION_ALLOWED_ERR:
		return "Modificación no permitida";
		break;
	case FileError.INVALID_STATE_ERR:
		return "Estado no válido";
		break;
	case FileError.SYNTAX_ERR:
		return "Error de sintaxis";
		break;
	case FileError.INVALID_MODIFICATION_ERR:
		return "Modificación no válida";
		break;
	case FileError.QUOTA_EXCEEDED_ERR:
		return "Capacidad excedida";
		break;
	case FileError.TYPE_MISMATCH_ERR:
		return "Tipo erróneo";
		break;
	case FileError.PATH_EXISTS_ERR:
		return "La ruta existe";
		break;
	}
	return "Error";
}

function mostrarPanelError(contenido) {
	$("#panelErrorContenido").html(contenido);
	$("#panelError").panel("open");
}

function bytesTexto(bytes, separador) {
    if (bytes < 1024)
        return bytes + " B";
    else if (bytes < (1024*1024))
        return Math.round(bytes / 1024) + " KB.";
    else {
        valor = Math.round((10 * bytes) / (1024*1024));
        return  Math.round(valor / 10) + separador + (valor % 10) + " MB.";
    }
}











﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger los mapas del evento.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Mapas",
		"titulo_principal" : "Mapas del evento",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the event's maps.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Maps",
		"titulo_principal" : "Event's maps",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	recogerPlanos();
}
    
function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo_principal + "</center>");
}

function recogerPlanos() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerPlanos();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerPlanos() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var planos_cache = almacenLocalObtenerClave(_nb_clave_app_planos + idev + "-" + idioma_real);
	var planos;
	var ts_planos = "";
	if (planos_cache != null) {		
		planos = JSON.parse(planos_cache);
		if (planos.length > 0) {
			ts_planos = planos[0].ts;
		}
	}
	if (planos != null) {
        //console.log("planos = " + JSON.stringify(planos));
        if (planos[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            planos[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarPlanos(planos, planos, idev, idioma_real);
            return;
        }
    }
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_planos;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/planos",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarPlanos(response, planos, idev, idioma_real);
               planos = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_planos + idev + "-" + idioma_real));
               planos[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_planos + idev + "-" + idioma_real, JSON.stringify(planos));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarPlanos(response, planos, idev, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		//console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			//errorEnDatos();
			mostrarPanelError(objResultado.error);
			return;
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				//mostrarAlerta("OK", "Eventos", "Aceptar");
				planos = response;
				almacenLocalGuardarClave(_nb_clave_app_planos + idev + "-" + idioma_real, JSON.stringify(planos));
				//console.log(planos[0].ts);
			}
			else {
				console.log("Información de planos en CACHE");
			}
				// Se procesa la información
			var nom_evento = planos[0].nom_evento;
			$('#nombreEvento').html("<center>" + nom_evento + "</center>");
			var lista_planos = planos[1].planos;
			var contador_planos = lista_planos.length - 1;
			//console.log("NUM_PLANOS: " + contador_planos);
			
			var codigo = "<li data-role='list-divider'>" + texto_idioma.titulo + "</li>";
			var plano;
			var info_plano = {};
			for (var i=1 ; i<= contador_planos ; i++) {
				plano = lista_planos[i];
				//console.log(plano);

				//codigo += "<li><a href='ver-plano.html?idp=" + plano[0] + "' data-ajax='false'>" + plano[1] + "</a></li>";
				info_plano.id = plano[2];
				info_plano.ts = plano[3];
				info_plano.desc = plano[1];
				codigo += "<li><a href='javascript:verPlano(" + JSON.stringify(info_plano).replace(/'/g, "###@@@###") + ");' data-ajax='false'><p><br />" + plano[1] + "</p></a></li>";
			}
			
			//console.log("CODIGO = " + codigo);
			$("#lista_planos").html(codigo);
			$("#lista_planos").listview("refresh");
			$("#lista_planos").trigger("create");
			$('#planos_contenido').css("display", "block");

		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function verPlano(info_plano) {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		
		//console.log(info_plano);
		
		try
        {
			setTimeout(function(){
			    $.mobile.loading('show');
			},200);
            cargar_imagen(info_plano, false, "html", function(fichero) {
				console.log("FICHERO = " + fichero);
					// Si el fichero está vacío se ha producido un error
				if (fichero != "") {
					setTimeout(function(){
					    $.mobile.loading('hide');
					},200);
					window.plugins.VerImagen.mostrarImagen(
							"file://" + fichero,
							{ descripcion: info_plano.desc.replace(/###@@@###/g, "'") }
						);
				} else {
					setTimeout(function(){
					    $.mobile.loading('hide');
					},200);
					$('#planos_contenido').css("display", "none");
					$('#recargar').css("display", "block");
					mostrarPanelError(texto_idioma.error_info);
				}
			});
        }
        catch (err)
        {
        	setTimeout(function(){
			    $.mobile.loading('hide');
			},200);
            $('#recargar').css("display", "block");
            mostrarPanelError(err.message);
        }
        setTimeout(function(){
		    $.mobile.loading('hide');
		},1);
	}
	else {
		$('#planos_contenido').css("display", "none");
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_comunicacion);
	}
}

function errorEnDatos() {
	$('#planos_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info);
}












﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger las notas de prensa.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Notas de prensa",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the press releases.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Press releases",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	mostrarNotasPrensa();
}

function mostrarNotasPrensa() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}

	recogerNotasPrensa();
}

function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo + "</center>");
}

function recogerNotasPrensa() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerNotasPrensa();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerNotasPrensa() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var notas_prensa_cache = almacenLocalObtenerClave(_nb_clave_app_notas_prensa + idev + "-" + idioma_real);
	var notas_prensa;
	var ts_notas_prensa = "";
	if (notas_prensa_cache != null) {		
		notas_prensa = JSON.parse(notas_prensa_cache);
		if (notas_prensa.length > 0) {
			ts_notas_prensa = notas_prensa[0].ts;
		}
	}
	if (notas_prensa != null) {
        //console.log("notas_prensa = " + JSON.stringify(notas_prensa));
        if (notas_prensa[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            notas_prensa[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarNotasPrensa(notas_prensa, notas_prensa, idev, idioma_real);
            return;
        }
    }
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_notas_prensa;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/notas_prensa",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarNotasPrensa(response, notas_prensa, idev, idioma_real);
               notas_prensa = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_notas_prensa + idev + "-" + idioma_real));
               notas_prensa[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_notas_prensa + idev + "-" + idioma_real, JSON.stringify(notas_prensa));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarNotasPrensa(response, notas_prensa, idev, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		//console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			//errorEnDatos();
			mostrarPanelError(objResultado.error);
			return;
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				notas_prensa = response;
				almacenLocalGuardarClave(_nb_clave_app_notas_prensa + idev + "-" + idioma_real, JSON.stringify(notas_prensa));
				//console.log(notas_prensa[0].ts);
			}
			else {
				console.log("Información de notas de prensa en CACHE");
			}
			
			almacenLocalGuardarClave(_nb_clave_app_ts_leer_notas_prensa + idev, notas_prensa[0].ts);

				// Se procesa la información
			var nom_evento = notas_prensa[0].nom_evento;
			$('#nombreEvento').html("<center>" + nom_evento + "</center>");
			var lista_notas_prensa = notas_prensa[1].notas_prensa;
			var contador_notas_prensa = lista_notas_prensa.length - 1;
			//console.log(contador_notas_prensa);
			
			var codigo = "";
			
			for (var i=1 ; i<= contador_notas_prensa ; i++) {
				nota_prensa = lista_notas_prensa[i];
				//console.log(nota_prensa);
				
				codigo += "<ul data-role='listview' data-inset='true'>";
				codigo += "<li data-role='list-divider'>" + nota_prensa[1] + "</li>";
				codigo += "<li><a href='nota_prensa.html?idnp=" + nota_prensa[0] + "' data-ajax='false'><br /><p><strong>" + nota_prensa[2] + "</strong></p>";
				if (nota_prensa[3] != "")
					codigo += "<br /><p>" + nota_prensa[3].replace(/\r\n/g, "<br />") + "</p>";
				codigo += "</a></li></ul>";
			}
			
			$("#lista_notas_prensa").html(codigo);
			$("#lista_notas_prensa").trigger("create");
			$('#notas_prensa_contenido').css("display", "block");
			
			$("#notas_prensa_contenido").trigger("create");
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function errorEnDatos() {
	$('#notas_prensa_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info_menu);
}




﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {
	obtenerParametrosURL();

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la información del alojamiento.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Alojamiento",
		"boton_alojamientos" : "Alojam.",
		"boton_alojamientos_largo" : "Alojamientos",
		"direccion" : "Dirección",
		"poblacion" : "Población",
		"provincia" : "Provincia",
		"pais" : "País",
		"codigo_postal" : "Código postal",
		"titulo_contacto" : "Información de contacto",
	    "persona_contacto" : "Persona de contacto",
	    "tfno_contacto" : "Teléfono",
	    "tfno_contacto2" : "Otro teléfono",
	    "fax_contacto" : "Fax",
	    "sitio_web_contacto" : "Sitio web",
	    "correo_contacto" : "Correo electrónico",
	    "titulo_localizacion" : "Localización",
	    "plano_localizacion" : "Plano de localización",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the accommodation's information.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Accommodation",
		"boton_alojamientos" : "Accom.",
		"boton_alojamientos_largo" : "Accommodations",
		"direccion" : "Address",
		"poblacion" : "City",
		"provincia" : "Province",
		"pais" : "Country",
		"codigo_postal" : "Postal code",
		"titulo_contacto" : "Contact information",
	    "persona_contacto" : "Contact person",
	    "tfno_contacto" : "Telephone",
	    "tfno_contacto2" : "Other telephone",
	    "fax_contacto" : "Fax",
	    "sitio_web_contacto" : "Website",
	    "correo_contacto" : "E-mail",
	    "titulo_localizacion" : "Location",
	    "plano_localizacion" : "Location map",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	recogerAlojamiento();
}

window.onorientationchange = function () {
    //Need at least 800 milliseconds
    setTimeout(changeOrientation, 1000);
}

function changeOrientation() {
    if ($(window).width() < 360)
        $('#id_boton_aloj').text(texto_idioma.boton_alojamientos);
    else
        $('#id_boton_aloj').text(texto_idioma.boton_alojamientos_largo);
}

function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo + "</center>");
	$('#titulo_contacto').text(texto_idioma.titulo_contacto);
	$('#titulo_localizacion').text(texto_idioma.titulo_localizacion);
    if ($(window).width() < 360)
        $('#id_boton_aloj').text(texto_idioma.boton_alojamientos);
    else
        $('#id_boton_aloj').text(texto_idioma.boton_alojamientos_largo);
}

function recogerAlojamiento() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerAlojamiento();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerAlojamiento() {
	var idev = "0";
	var idal = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	if (urlParams.hasOwnProperty("idal")) {
		idal = urlParams.idal;
	} else {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var alojamiento_cache = almacenLocalObtenerClave(_nb_clave_app_alojamiento + idev + "-" + idal + "-" + idioma_real);
	var alojamiento;
	var ts_alojamiento = "";
	if (alojamiento_cache != null) {		
		alojamiento = JSON.parse(alojamiento_cache);
		if (alojamiento.length > 0) {
			ts_alojamiento = alojamiento[0].ts;
		}
	}
    if (alojamiento != null) {
        //console.log("alojamiento = " + JSON.stringify(alojamiento));
        if (alojamiento[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            alojamiento[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarAlojamiento(alojamiento, alojamiento, idev, idal, idioma_real);
            return;
        }
    }
    
	var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&idal=" + idal + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_alojamiento;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/alojamiento",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarAlojamiento(response, alojamiento, idev, idal, idioma_real);
               alojamiento = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_alojamiento + idev + "-" + idal + "-" + idioma_real));
               alojamiento[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_alojamiento + idev + "-" + idal + "-" + idioma_real, JSON.stringify(alojamiento));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarAlojamiento(response, alojamiento, idev, idal, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		//console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			mostrarPanelError(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				alojamiento = response;
				almacenLocalGuardarClave(_nb_clave_app_alojamiento + idev + "-" + idal + "-" + idioma_real, JSON.stringify(alojamiento));
				//console.log(alojamiento[0].ts);
			}
			else {
				console.log("Información del alojamiento en CACHE");
			}
			//console.log("EXPOSITOR = " + JSON.stringify(alojamiento));
			
				// Se procesa la información
			$('#nombreEvento').html("<center>" + alojamiento[0].nom_evento + "</center>");

				// Datos de la cabecera
			var datos_cabecera = alojamiento[1].row;
			
			//console.log("DATOS CABECERA = " + JSON.stringify(datos_cabecera));

			hay_datos = false;
			var codigo = "<li data-role='list-divider'>" + datos_cabecera.nom_alojamiento + "</li><li><br />";
			
			if (datos_cabecera.direccion != "") {
				codigo += "<p><strong>" + texto_idioma.direccion + "</strong>: " + datos_cabecera.direccion + "</p>";
				hay_datos = true;
			}
			if (datos_cabecera.poblacion != "") {
				codigo += "<p><strong>" + texto_idioma.poblacion + "</strong>: " + datos_cabecera.poblacion + "</p>";
				hay_datos = true;
			}
			if (datos_cabecera.provincia != "") {
				codigo += "<p><strong>" + texto_idioma.provincia + "</strong>: " + datos_cabecera.provincia + "</p>";
				hay_datos = true;
			}
			if (datos_cabecera.pais != "") {
				codigo += "<p><strong>" + texto_idioma.pais + "</strong>: " + datos_cabecera.pais + "</p>";
				hay_datos = true;
			}
			if (datos_cabecera.codigo_postal != "") {
				codigo += "<p><strong>" + texto_idioma.codigo_postal + "</strong>: " + datos_cabecera.codigo_postal + "</p>";
				hay_datos = true;
			}
			codigo += "</li>";
			if (hay_datos) {
				$('#alojamiento_cabecera').css("display", "block");
				$("#alojamiento_cabecera").html(codigo);
				$("#alojamiento_cabecera").listview("refresh");
				$("#alojamiento_cabecera").trigger("create");
			} else {
				$('#alojamiento_cabecera').css("display", "none");
			}
			
			// Datos de contacto
			hay_datos = false;
			if (datos_cabecera.telefono != "") {
				$('#enlace_tfno').attr("href", "tel:" + datos_cabecera.telefono.replace(/ /g, ""));
				$('#enlace_tfno').html("<p><strong>" + texto_idioma.tfno_contacto + "</strong>: " + datos_cabecera.telefono + "</p>");
				$('#tfno_contacto').css("display", "block");
				hay_datos = true;
			} else {
				$('#tfno_contacto').remove();
			}
			if (datos_cabecera.telefono_2 != "") {
				$('#enlace_tfno2').attr("href", "tel:" + datos_cabecera.telefono_2.replace(/ /g, ""));
				$('#enlace_tfno2').html("<p><strong>" + texto_idioma.tfno_contacto2 + "</strong>: " + datos_cabecera.telefono_2 + "</p>");
				$('#tfno_contacto2').css("display", "block");
				hay_datos = true;
			} else {
				$('#tfno_contacto2').remove();
			}
			if (datos_cabecera.fax != "") {
				$('#fax_contacto').html("<br /><p><strong>" + texto_idioma.fax_contacto + "</strong>: " + datos_cabecera.fax + "</p>");
				$('#fax_contacto').css("display", "block");
				hay_datos = true;
			} else {
				$('#fax_contacto').remove();
			}
			if (datos_cabecera.sitio_web != "") {
				$('#enlace_sitio_web').attr("href", "javascript:navigator.app.loadUrl('" + datos_cabecera.sitio_web + "', { openExternal: true });");
				$('#enlace_sitio_web').html("<p><strong>" + texto_idioma.sitio_web_contacto + "</strong>: " + datos_cabecera.sitio_web.replace("http://", "").replace("https://", "") + "</p>");
				$('#sitio_web_contacto').css("display", "block");
				hay_datos = true;
			} else {
				$('#sitio_web_contacto').remove();
			}
			if (datos_cabecera.correo_contacto != "") {
				$('#enlace_correo').attr("href", "mailto:" + datos_cabecera.correo_contacto.replace(/ /g, ""));
				$('#enlace_correo').html("<p><strong>" + texto_idioma.correo_contacto + "</strong>: " + datos_cabecera.correo_contacto + "</p>");
				$('#correo_contacto').css("display", "block");
				hay_datos = true;
			} else {
				$('#correo_contacto').remove();
			}

			if (hay_datos) {
				$('#alojamiento_contacto').css("display", "block");
				$('#alojamiento_contacto').find("li:last").addClass("ui-corner-bottom");
			} else {
				$('#alojamiento_contacto').css("display", "none");
			}

				// Datos de localización en el evento
			var hay_datos = false;
			if (datos_cabecera.google_maps != '') {
				$('#enlace_loc_google').attr("href", "javascript:navigator.app.loadUrl('" + datos_cabecera.google_maps + "', { openExternal: true });");
				$('#enlace_loc_google').html("<p><strong>Google Maps</strong></p>");
				//$('#loc_google').css("display", "block");
				hay_datos = true;
			} else {
				$('#loc_google').remove();
			}
			if (datos_cabecera.id_fichero_plano != 0) {
				var info_mapa = {};
				info_mapa.id = datos_cabecera.id_fichero_mapa;
				info_mapa.ts = datos_cabecera.ts_alojamiento_mapa;
				info_mapa.desc = datos_cabecera.nom_alojamiento;
				$('#enlace_loc_plano').attr("href", "javascript:verPlano(" + JSON.stringify(info_mapa).replace(/'/g, "###@@@###") + ");");
				$('#enlace_loc_plano').html("<p><strong>" + texto_idioma.plano_localizacion + "</strong></p>");
				hay_datos = true;
			} else {
				$('#loc_plano').remove();
			}

			if (hay_datos) {
				$('#alojamiento_localizacion').css("display", "block");
				$('#alojamiento_localizacion').find("li:last").addClass("ui-corner-bottom");
			} else {
				$('#alojamiento_localizacion').css("display", "none");
			}
			
			
			$("#alojamiento_localizacion").listview('refresh');
			$("#alojamiento_contacto").listview('refresh');
			$('#alojamiento_contenido').css("display", "block");

		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}


function verPlano(info_plano) {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		
		//console.log(info_plano);
		try
        {
			setTimeout(function(){
			    $.mobile.loading('show');
			},200);
            cargar_imagen(info_plano, false, "html", function(fichero) {
				console.log("FICHERO = " + fichero);
					// Si el fichero está vacío se ha producido un error
				if (fichero != "") {
					setTimeout(function(){
					    $.mobile.loading('hide');
					},200);
					window.plugins.VerImagen.mostrarImagen(
							"file://" + fichero,
							{ descripcion: info_plano.desc.replace(/###@@@###/g, "'") }
						);
				} else {
					setTimeout(function(){
					    $.mobile.loading('hide');
					},200);
					$('#alojamiento_contenido').css("display", "none");
					$('#recargar').css("display", "block");
					mostrarPanelError(texto_idioma.error_info);
				}
			});
        }
        catch (err)
        {
        	setTimeout(function(){
			    $.mobile.loading('hide');
			},200);
            $('#recargar').css("display", "block");
            mostrarPanelError(err.message);
        }
        setTimeout(function(){
		    $.mobile.loading('hide');
		},200);
	}
	else {
		$('#alojamiento_contenido').css("display", "none");
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_comunicacion);
	}
}

function errorEnDatos() {
	$('#alojamiento_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info);
}




﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 


function onDeviceReady() {

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la agenda de actividades del evento.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"sel_todas" : "Todas",
		"sel_favoritas" : "Favoritas",
		"titulo" : "Programa",
		"alerta_agenda_vacia" : "El programa no tiene actividades",
		"alerta_favoritas_vacia" : "La lista de actividades favoritas está vacía",
		"alerta_titulo" : "Advertencia",
		"alerta_boton" : "Aceptar",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the event's agenda.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"sel_todas" : "All",
		"sel_favoritas" : "Favourites",
		"titulo" : "Program",
		"alerta_agenda_vacia" : "The program is empty",
		"alerta_favoritas_vacia" : "The list of favourite activities is empty",
		"alerta_titulo" : "Notice",
		"alerta_boton" : "OK",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	mostrarAgenda();
}

function mostrarAgenda() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var que_informacion = almacenLocalObtenerClave(_nb_clave_app_que_actividades + idev);
	if (que_informacion == null) {
		que_informacion = "T";
		almacenLocalGuardarClave(_nb_clave_app_que_actividades + idev, que_informacion);
	}
	
	console.log("QUE_INFORMACION = " + que_informacion);
	
	generarRadioBotones(que_informacion);
	
	recogerAgenda(que_informacion);
}

function generarRadioBotones(que_informacion) {
	var codigo = "<center><fieldset data-role='controlgroup' data-type='horizontal'><input data-theme='c' name='radioQueActividades' id='radio_todas' value='T' ##CHECKED_TODAS## type='radio' onchange='javascript:clickRadioButton(this);'><label for='radio_todas'>" + texto_idioma.sel_todas + "</label><input data-theme='c' name='radioQueActividades' id='radio_favoritas' value='F' ##CHECKED_FAVORITAS## type='radio' onchange='javascript:clickRadioButton(this);'><label for='radio_favoritas' class='nb-favoritas'><span style='vertical-align: top;'>" + texto_idioma.sel_favoritas + "</span>  <img src='images/favorito.png' width='15px' height='15px' /></label></fieldset></center>";

	if (que_informacion == "T") {
		codigo = codigo.replace("##CHECKED_TODAS##", "checked='true'");
		codigo = codigo.replace("##CHECKED_FAVORITAS##", "");
	} else {
		codigo = codigo.replace("##CHECKED_TODAS##", "");
		codigo = codigo.replace("##CHECKED_FAVORITAS##", "checked='true'");
	}

	$('#que_actividades').html(codigo);
	$('#que_actividades').trigger("create");
}

function clickRadioButton(rb){
	console.log("Tipo de actividad: " + rb.value);
	
	var idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	almacenLocalGuardarClave(_nb_clave_app_que_actividades + idev, rb.value);
	recogerAgenda(rb.value);
}

function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo + "</center>");
	$('#titulo_fechas').text(texto_idioma.fechas);
	$('#titulo_sitio_web').text(texto_idioma.sitio_web);
	$('#titulo_contacto').text(texto_idioma.contacto);
}

function recogerAgenda(que_informacion) {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerAgenda(que_informacion);
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerAgenda(que_informacion) {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var agenda_cache = almacenLocalObtenerClave(_nb_clave_app_agenda + idev + "-" + idioma_real);
	var agenda;
	var ts_agenda = "";
	if (agenda_cache != null) {		
		agenda = JSON.parse(agenda_cache);
		if (agenda.length > 0) {
			ts_agenda = agenda[0].ts;
		}
	}
    if (agenda != null) {
        //console.log("agenda = " + JSON.stringify(agenda));
        if (agenda[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            agenda[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarAgenda(agenda, agenda, idev, que_informacion, idioma_real);
            return;
        }
    }
    
	var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_agenda;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/agenda",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarAgenda(response, agenda, idev, que_informacion, idioma_real);
               agenda = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_agenda + idev + "-" + idioma_real));
               agenda[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_agenda + idev + "-" + idioma_real, JSON.stringify(agenda));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarAgenda(response, agenda, idev, que_informacion, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			mostrarPanelError(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				//mostrarAlerta("OK", "Eventos", "Aceptar");
				agenda = response;
				almacenLocalGuardarClave(_nb_clave_app_agenda + idev + "-" + idioma_real, JSON.stringify(agenda));
				console.log(agenda[0].ts);
			}
			else {
				console.log("Información de la agenda en CACHE");
			}
				// Se procesa la información
			var nom_evento = agenda[0].nom_evento;
			$('#nombreEvento').html("<center>" + nom_evento + "</center>");
			var lista_actividades = agenda[1].agenda;
			var contador_actividades = lista_actividades.length - 1;
			console.log(contador_actividades);
			
			var codigo = "";
			var fecha_anterior = "";
			
			var actividad;
			var clave_favoritas = almacenLocalObtenerClave(_nb_clave_app_actividades_favoritas + idev);
			var favoritas = [];
			if (clave_favoritas != null)
				favoritas = JSON.parse(clave_favoritas);
			for (var i=1 ; i<= contador_actividades ; i++) {
				actividad = lista_actividades[i];
				//console.log(actividad);
				
				if (que_informacion == "F" && favoritas.indexOf(actividad[0]) == -1)
					continue;
				
				if (fecha_anterior != actividad[4]) {
					codigo += "<li data-role='list-divider' id='" + actividad[7] + "'>" + actividad[4] + "</li>";
					fecha_anterior = actividad[4];
				}
				
				codigo += "<li><a href='actividad.html?ida=" + actividad[0] + "' data-ajax='false'>";
				codigo += "<table border='0' cellspacing='0' cellpadding='0'><tr><td valign='top'><p style='color:#0000FF; font-weight: bold;'>" + actividad[6] + "&nbsp;</p>";
				if (favoritas.indexOf(actividad[0]) >= 0) {
					codigo += "<img src='images/favorito.png' width='20' height='20' />";
				}
				codigo += "</td><td>";
				if (actividad[8] != "")
					codigo += "<p class='nb-ponentes-actividad'>" + actividad[8] + "</p>";
				codigo += "<p><strong>" + actividad[1] + "</strong></p>";
				codigo += "<p>" + actividad[5] + "<br />" + actividad[2] + "<br />";
				codigo += actividad[3] + "</p></td></tr></table></a></li>";
			}
			
			$("#lista_actividades").html(codigo);
			$("#lista_actividades").listview("refresh");
			$("#lista_actividades").trigger("create");
			$('#agenda_contenido').css("display", "block");
			
				// Se va a la fecha actual (si existe)
			/*var id_hoy = fechaISO();
			id_hoy = "20130910";
			if (id_hoy) {
				window.location.hash = id_hoy;
			}
			*/
			var id_hoy = document.getElementById(fechaISO());
			/////id_hoy = document.getElementById("20130911");
			if (id_hoy) {
				window.scrollTo(id_hoy.offsetLeft, id_hoy.offsetTop - 50);
			}
			
			
			if (que_informacion == "T" && contador_actividades == 0)
				mostrarAlerta(texto_idioma.alerta_agenda_vacia, texto_idioma.alerta_titulo, texto_idioma.alerta_boton);
			else if (que_informacion == "F" && favoritas.length == 0)
				mostrarAlerta(texto_idioma.alerta_favoritas_vacia, texto_idioma.alerta_titulo, texto_idioma.alerta_boton);

		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function errorEnDatos() {
	$('#agenda_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info);
}




﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger los edificios del evento.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Edificios",
		"titulo_principal" : "Edificios del evento",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the event's buildings.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Buildings",
		"titulo_principal" : "Event's buildings",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	recogerEdificios();
}
    
function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo_principal + "</center>");
}

function recogerEdificios() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerEdificios();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerEdificios() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var edificios_cache = almacenLocalObtenerClave(_nb_clave_app_edificios + idev + "-" + idioma_real);
	var edificios;
	var ts_edificios = "";
	if (edificios_cache != null) {		
		edificios = JSON.parse(edificios_cache);
		if (edificios.length > 0) {
			ts_edificios = edificios[0].ts;
		}
	}
	if (edificios != null) {
        //console.log("edificios = " + JSON.stringify(edificios));
        if (edificios[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            edificios[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarEdificios(edificios, edificios, idev, idioma_real);
            return;
        }
    }
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_edificios;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/edificios",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarEdificios(response, edificios, idev, idioma_real);
               edificios = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_edificios + idev + "-" + idioma_real));
               edificios[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_edificios + idev + "-" + idioma_real, JSON.stringify(edificios));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarEdificios(response, edificios, idev, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		//console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			//errorEnDatos();
			mostrarPanelError(objResultado.error);
			return;
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				//mostrarAlerta("OK", "Eventos", "Aceptar");
				edificios = response;
				almacenLocalGuardarClave(_nb_clave_app_edificios + idev + "-" + idioma_real, JSON.stringify(edificios));
				//console.log(edificios[0].ts);
			}
			else {
				console.log("Información de edificios en CACHE");
			}
				// Se procesa la información
			var nom_evento = edificios[0].nom_evento;
			$('#nombreEvento').html("<center>" + nom_evento + "</center>");
			var lista_edificios = edificios[1].edificios;
			var contador_edificios = lista_edificios.length - 1;
			
			var codigo = "<li data-role='list-divider'>" + texto_idioma.titulo + "</li>";
			var edificio;
			var primero;
			for (var i=1 ; i<= contador_edificios ; i++) {
				primero = true;
				edificio = lista_edificios[i];
				//console.log(edificio);

				codigo += "<li><a href='edificio.html?ided=" + edificio[0] + "' data-ajax='false'>";
				codigo += "<p><br /><strong>" + edificio[1] + "</strong><br />";
				if (edificio[2] != "")
					codigo += edificio[2];
				if (edificio[3] != "") {
					primero = false;
					codigo += "<br />";
					codigo += edificio[3];
				}
				if (edificio[4] != "") {
					if (primero) {
						primero = false;
						codigo += "<br />";
					}
					else
						codigo += ", ";
					codigo += edificio[4];
				}
				if (edificio[5] != "") {
					if (primero) {
						primero = false;
						codigo += "<br />";
					}
					else
						codigo += ", ";
					codigo += edificio[5];
				}
				if (edificio[6] != "") {
					if (primero) {
						primero = false;
						codigo += "<br />";
					}
					else
						codigo += ", ";
					codigo += edificio[6];
				}
				codigo += "</p></a></li>";
			}
			
			$("#lista_edificios").html(codigo);
			$("#lista_edificios").listview("refresh");
			$("#lista_edificios").trigger("create");
			$('#edificios_contenido').css("display", "block");

		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function errorEnDatos() {
	$('#edificios_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info);
}




















﻿/*! netBytes software - menu.js */


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    //console.log("DEVICE READY");
    
    obtenerParametrosURL();

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"boton_inicio" : "Volver",
		"boton_vaciar" : "Vaciar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la información del evento.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Configuración",
		"titulo_idioma" : "Idioma",
		"idioma_auto" : "Automático",
		"idioma_es" : "Español",
		"idioma_en" : "English",
        "alerta_vaciar_texto" : "Se han borrado los ficheros e información de los eventos",
        "alerta_vaciar_boton" : "Aceptar",
        "confirmar_texto" : "¿Deseas borrar los ficheros e información de los eventos?",
        "confirmar_boton_si" : "Sí",
        "confirmar_boton_no" : "No",
        "memoria_titulo" : "Uso de memoria",
        "memoria_texto" : "A continuación se muestra la memoria utilizada para almacenamiento local de información de eventos. Puede liberar la memoria utilizada pulsando el botón 'Vaciar'.",
        "separador_decimales" : ",",
        "codigo_titulo" : "Chequear un evento",
        "codigo_texto" : "Si dispone de un código de autorización para chequear un evento en preparación, introdúzcalo en la siguiente casilla y pulse el botón 'Acceder'. Para finalizar el chequeo borre el código y pulse el botón 'Acceder'.",
        "codigo_acceder" : "Acceder",
        "codigo_borrar" : "Borrar"
		
		};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"boton_inicio" : "Back",
		"boton_vaciar" : "Clear",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the event's information.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Settings",
		"titulo_idioma" : "Language",
		"idioma_auto" : "Automatic",
		"idioma_es" : "Español",
		"idioma_en" : "English",
        "alerta_vaciar_texto" : "Information and files of events have been deleted",
        "alerta_vaciar_boton" : "OK",
        "confirmar_texto" : "Do you want to delete the information and files of events?",
        "confirmar_boton_si" : "Yes",
        "confirmar_boton_no" : "No",
        "memoria_titulo" : "Memory usage",
        "memoria_texto" : "The following figure is the memory usage for local information storage of events. You can free the memory used by clicking the 'Clear' button.",
        "separador_decimales" : ".",
		"codigo_titulo" : "Test an event",
        "codigo_texto" : "If you have an authorization code to test an event in preparation, enter the code in the following cell and click the 'Access' button. If you want to end the test, clear the cell and click the 'Access' button.",
        "codigo_acceder" : "Access",
        "codigo_borrar" : "Clear"
		};

	texto_idioma = texto_es;

    //console.log("FIN");
    
    /*
    for (var key in window.localStorage)
        console.log("Clave: " + key);
    */

	seleccionarIdioma(escribirTextoIdiomas);

}

function escribirTextoIdiomas() {
	//console.log("ESCRIBIR TEXTO IDIOMAS");
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#boton_inicio .ui-btn-text').text(texto_idioma.boton_inicio);
    $('#boton_vaciar .ui-btn-text').text(texto_idioma.boton_vaciar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo + "</center>");
	$('#eti_auto .ui-btn-text').text(texto_idioma.idioma_auto);
	$('#eti_es .ui-btn-text').text(texto_idioma.idioma_es);
	$('#eti_en .ui-btn-text').text(texto_idioma.idioma_en);
	$('#titulo_idioma').html("<strong>" + texto_idioma.titulo_idioma + "</strong>");
	
    $('#memoria_titulo').html("<strong>" + texto_idioma.memoria_titulo + "</strong>");
	$('#memoria_texto').html(texto_idioma.memoria_texto);
	$('#codigo_titulo').html("<strong>" + texto_idioma.codigo_titulo + "</strong>");
	$('#codigo_texto').html(texto_idioma.codigo_texto);
	$('#codigo_acceder .ui-btn-text').text(texto_idioma.codigo_acceder);
	$('#codigo_borrar .ui-btn-text').text(texto_idioma.codigo_borrar);
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    $('#valor_codigo').html(coda);
	
	var idioma = almacenLocalObtenerClave(_nb_clave_app_idioma);
	if (idioma == "A") {
		$('#idioma_auto').attr('checked', true).checkboxradio("refresh");
		$('#idioma_en').attr('checked', false).checkboxradio("refresh");
		$('#idioma_es').attr('checked', false).checkboxradio("refresh");
	} else if (idioma == "EN") {
		$('#idioma_auto').attr('checked', false).checkboxradio("refresh");
		$('#idioma_en').attr('checked', true).checkboxradio("refresh");
		$('#idioma_es').attr('checked', false).checkboxradio("refresh");
	} else {
		$('#idioma_auto').attr('checked', false).checkboxradio("refresh");
		$('#idioma_en').attr('checked', false).checkboxradio("refresh");
		$('#idioma_es').attr('checked', true).checkboxradio("refresh");
	}
    
    if (urlParams.hasOwnProperty("idev")) {
		$('#boton_inicio').attr('href', 'menu-evento.html?idev=' + urlParams.idev);
	}
    
    //console.log("FIN ESCRIBIR TEXTO IDIOMAS");
    
    calcularUsoMemoria();
}

function guardarIdioma(idioma) {
	almacenLocalGuardarClave(_nb_clave_app_idioma, idioma);
	seleccionarIdioma(escribirTextoIdiomas);
}

function calcularUsoMemoria() {
    //console.log("CALCULAR USO MEMORIA");
    
    var suma_bytes = 0;
    var bytes = 0;
    
    for (var key in window.localStorage) {
        //console.log("Clave: " + key);
        valor = almacenLocalObtenerClave(key);
        if (valor == null)
            bytes = 0
		else {
            bytes = valor.length;
            if (key.indexOf(_nb_clave_app_prefijo_fichero) == 0)
                bytes += (JSON.parse(almacenLocalObtenerClave(key))).num_bytes;
	}
        //console.log("     bytes: " + bytes);
        suma_bytes += bytes;
				} 
    
    $('#memoria_valor').html("<strong>" + texto_idioma.memoria_titulo + "</strong>: " + bytesTexto(suma_bytes, texto_idioma.separador_decimales));
    
    }

function liberarConfirmar() {
    solicitarConfirmacion(texto_idioma.confirmar_texto, liberar, [texto_idioma.confirmar_boton_si,texto_idioma.confirmar_boton_no] , texto_idioma.memoria_titulo);
    }

function liberar(ejecutar) {
    if (!ejecutar)
			return;
    
    var array_ficheros = [];
    var array_claves = [];
    for (var key in window.localStorage) {
        if (!esClaveIntocable(key)) {
            if (key.indexOf(_nb_clave_app_prefijo_fichero) == 0) {
                array_ficheros.push(key);
	} else {
                array_claves.push(key);
    }
    }
}

    var fichero;
    for (var key in array_ficheros) {
        fichero = (JSON.parse(almacenLocalObtenerClave(array_ficheros[key]))).fichero;
        //console.log("Borrar fichero con clave: " + array_ficheros[key] + " - " + fichero);
        borrarFicheroImagen(fichero, array_ficheros[key]);
}



    for (var key in array_claves) {
        //console.log("Borrar clave: " + array_claves[key]);
        almacenLocalEliminarClave(array_claves[key]);
}

    mostrarAlerta(texto_idioma.alerta_vaciar_texto, texto_idioma.memoria_titulo, texto_idioma.alerta_vaciar_boton);
    setTimeout(calcularUsoMemoria, 2000);
}

function guardarCodigo() {
    var coda = $("#valor_codigo").text();
    console.log("coda guardar = " + coda);
    almacenLocalGuardarClave(_nb_clave_app_codigo_autorizacion, coda);
        // id_evento = 0 + borrar listas eventos en idiomas
    almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
    almacenLocalEliminarClave(_nb_clave_app_lista_eventos + "-ES");
    almacenLocalEliminarClave(_nb_clave_app_lista_eventos + "-EN");
    $('#formCodigo').submit();
}

function borrarCodigo() {
    $("#valor_codigo").text("");
}

function tecla(digito) {
    var campo = $("#valor_codigo");
    var texto = campo.text();
    if (texto.length < 10)
        campo.text(texto + digito);
}


﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {
	obtenerParametrosURL();

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la información de la nota de prensa.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Nota de prensa",
		"boton_np" : "Notas p.",
		"boton_np_largo" : "Notas prensa",
		"mas_info" : "Más información",
	    "enlace_web" : "Enlace web",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the press release.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Press release",
		"boton_np" : "Press r.",
		"boton_np_largo" : "Press releases",
		"mas_info" : "More information",
	    "enlace_web" : "Web link",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	recogerNotaPrensa();
}

window.onorientationchange = function () {
    //Need at least 800 milliseconds
    setTimeout(changeOrientation, 1000);
}

function changeOrientation() {
    if ($(window).width() < 360)
        $('#id_boton_np').text(texto_idioma.boton_np);
    else
        $('#id_boton_np').text(texto_idioma.boton_np_largo);
}

function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo + "</center>");
	if ($(window).width() < 360)
	$('#id_boton_np').text(texto_idioma.boton_np);
    else
        $('#id_boton_np').text(texto_idioma.boton_np_largo);
}

function recogerNotaPrensa() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerNotaPrensa();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerNotaPrensa() {
	var idev = "0";
	var idnp = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	if (urlParams.hasOwnProperty("idnp")) {
		idnp = urlParams.idnp;
	} else {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var nota_prensa_cache = almacenLocalObtenerClave(_nb_clave_app_nota_prensa + idev + "-" + idnp + "-" + idioma_real);
	var nota_prensa;
	var ts_nota_prensa = "";
	if (nota_prensa_cache != null) {		
		nota_prensa = JSON.parse(nota_prensa_cache);
		if (nota_prensa.length > 0) {
			ts_nota_prensa = nota_prensa[0].ts;
		}
	}
	if (nota_prensa != null) {
        //console.log("nota_prensa = " + JSON.stringify(nota_prensa));
        if (nota_prensa[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            nota_prensa[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarNotaPrensa(nota_prensa, nota_prensa, idev, idnp, idioma_real);
            return;
        }
    }
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&idnp=" + idnp + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_nota_prensa;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/nota_prensa",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarNotaPrensa(response, nota_prensa, idev, idnp, idioma_real);
               nota_prensa = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_nota_prensa + idev + "-" + idnp + "-" + idioma_real));
               nota_prensa[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_nota_prensa + idev + "-" + idnp + "-" + idioma_real, JSON.stringify(nota_prensa));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarNotaPrensa(response, nota_prensa, idev, idnp, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		//console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			//errorEnDatos();
			mostrarPanelError(objResultado.error);
			return;
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				nota_prensa = response;
				almacenLocalGuardarClave(_nb_clave_app_nota_prensa + idev + "-" + idnp + "-" + idioma_real, JSON.stringify(nota_prensa));
				//console.log(nota_prensa[0].ts);
			}
			else {
				console.log("Información de la nota_prensa en CACHE");
			}
			//console.log("NOTA_PRENSA = " + JSON.stringify(nota_prensa));
			
				// Se procesa la información
			$('#nombreEvento').html("<center>" + nota_prensa[0].nom_evento + "</center>");

				// Datos de la cabecera
			var datos_cabecera = nota_prensa[1].row;
			
			//console.log("DATOS CABECERA = " + JSON.stringify(datos_cabecera));

			hay_datos = false;
			var codigo = "<li data-role='list-divider'>" + datos_cabecera.titulo_nota_prensa + "</li><li><br />";
			
			if (datos_cabecera.fecha != "") {
				codigo += "<p style='color: #A23A3A;'><strong>" + datos_cabecera.fecha + "</strong></p><br />";
				hay_datos = true;
			}
			if (datos_cabecera.resumen != "") {
				codigo += "<p><strong>" + datos_cabecera.resumen.replace(/\r\n/g, "<br />") + "</strong></p><br />";
				hay_datos = true;
			}
			if (datos_cabecera.contenido != "") {
				codigo += "<p>" + datos_cabecera.contenido.replace(/\r\n/g, "<br />") + "</p><br />";
				hay_datos = true;
			}
			codigo += "</li>";
			if (hay_datos) {
				$('#nota_prensa_cabecera').css("display", "block");
				$("#nota_prensa_cabecera").html(codigo);
				$("#nota_prensa_cabecera").listview("refresh");
				$("#nota_prensa_cabecera").trigger("create");
			} else {
				$('#nota_prensa_cabecera').css("display", "none");
			}
			
			if (datos_cabecera.enlace_web != "") {
				$('#enlace_web_titulo').text(texto_idioma.mas_info);
				$('#enlace_enlace_web').attr("href", "javascript:navigator.app.loadUrl('" + datos_cabecera.enlace_web + "', { openExternal: true });");
				$('#enlace_enlace_web').html("<p><strong>" + texto_idioma.enlace_web + "</strong>: " + datos_cabecera.enlace_web.replace("http://", "").replace("https://", "") + "</p>");
				$('#enlace_web').css("display", "block");
				$('#nota_prensa_enlace').css("display", "block");
				$('#nota_prensa_enlace').find("li:last").addClass("ui-corner-bottom");
			} else {
				$('#nota_prensa_enlace').css("display", "none");
			}

			$("#nota_prensa_enlace").listview('refresh');
			$('#nota_prensa_contenido').css("display", "block");

		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function errorEnDatos() {
	$('#nota_prensa_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info);
}


























﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

/*
document.addEventListener('resume', function(event){
	console.log("RESUME index.js");
	recogerEventos(true);
}, false);
*/

function onDeviceReady() {
	//console.log("ON DEVICE READY");
	
	primerUso();
	
		// Se existe un evento seleccionado se va a su menú, excepto si se quiere seleccionar uno.
	obtenerParametrosURL();
	var idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	console.log("IDEV = " + idev);
	if (idev != "0" && !urlParams.hasOwnProperty("sel")) {
		console.log("SE REDIRIGE AL MENÚ");
		//window.location.replace("menu-evento.html?idev=" + idev);
		//window.location.href = "menu-evento.html?idev=" + idev;
        //$.mobile.changePage("menu-evento.html?idev=" + idev, { changeHash: true });
        $('#idev').val(idev);
        //$('#formMenu').submit();
        setTimeout(function(){$('#formMenu').submit();}, 500);
	} else {
		texto_es = {
			"seleccion_evento" : "Seleccione un evento",
			"boton_recargar" : "Recargar",
			"boton_cerrar" : "Cerrar",
			"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la lista de eventos.</p>",
			"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
			"error_info_eventos" : "Error en la información de eventos.",
            "codigo_titulo" : "Chequear un evento",
            "codigo_acceder" : "Acceder",
            "codigo_ayuda" : "Si dispone de un código de autorización para chequear un evento en preparación, introdúzcalo en la siguiente casilla y pulse el botón 'Acceder'.",
            "sin_eventos" : "<p>No hay eventos disponibles en este momento.</p>"
		};

		texto_en = {
			"seleccion_evento" : "Select an event",
			"boton_recargar" : "Reload",
			"boton_cerrar" : "Close",
			"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the list of events.</p>",
			"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
			"error_info_eventos" : "Error in events information.",
            "codigo_titulo" : "Test an event",
            "codigo_acceder" : "Access",
            "codigo_ayuda" : "If you have an authorization code to test an event in preparation, enter the code in the following cell and click the 'Access' button.",
            "sin_eventos" : "<p>There are no events at this moment.</p>"

		};

		texto_idioma = texto_es;

		seleccionarIdioma(escribirTextoIdiomas);

		/*
        $("#formCodigo").submit(function() {
            return false;
        });
        */

	}

}

function escribirTextoIdiomas() {
	$('#titulo_contenido').html("<center>" + texto_idioma.seleccion_evento + "</center>");
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	
    if (urlParams.hasOwnProperty("sel") && urlParams.sel == 2)
        recogerEventos(false);
    else
    
    recogerEventos(true);
}



function recogerEventos(con_cache) {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerEventos(con_cache);
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerEventos(con_cache) {
    console.log("CON CACHE: " + con_cache);
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    var lista_eventos = null;
    if (con_cache) {
    	var valor = almacenLocalObtenerClave(_nb_clave_app_lista_eventos + "-" + idioma_real);
    	if (valor != null)
    		lista_eventos = JSON.parse(valor);
    }
    var ts_eventos = "";
	if (lista_eventos != null) {
		if (lista_eventos.length > 0) {
			ts_eventos = lista_eventos[0].ts;
		}
        console.log("lista_eventos = " + JSON.stringify(lista_eventos));
        if (lista_eventos.length > 0 && lista_eventos[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            lista_eventos[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarEventosRecibidos(lista_eventos, lista_eventos, coda, idioma_real);
            return;
        }
    }
	
    var postString = "idemp=" + _nb_id_empresa + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_eventos;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/sel-eventos.aspx/lista",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarEventosRecibidos(response, lista_eventos, coda, idioma_real);
               lista_eventos = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_lista_eventos + "-" + idioma_real));
               lista_eventos[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_lista_eventos + "-" + idioma_real, JSON.stringify(lista_eventos));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarEventosRecibidos(response, lista_eventos, coda, idioma_real) {
	var array_logos = [];
	
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		var objEventos = response[1];
		
		if (objResultado.hasOwnProperty("error")) {
			errorEnDatos();
			return;
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				//mostrarAlerta("OK", "Eventos", "Aceptar");
				lista_eventos = response;
				almacenLocalGuardarClave(_nb_clave_app_lista_eventos + "-" + idioma_real, JSON.stringify(lista_eventos));
				console.log(lista_eventos[0].ts);
			}
			else {
				console.log("Lista de eventos en CACHE");
			}
				// Se procesa la lista
			var contador_eventos = lista_eventos[1].lista_eventos.length - 1;
			//console.log(contador_eventos);
            
            if (contador_eventos > 0) {
			var codigo = "<div id='lista_eventos'>";
			var evento;
			for (var i=1 ; i<= contador_eventos ; i++) {
				evento = lista_eventos[1].lista_eventos[i];
				//console.log(evento);
				codigo += "<ul data-role='listview' data-inset='true'>";
				codigo += "<li>";
				codigo += "<a href='menu-evento.html?idev=" + evento[0] + "' data-ajax='false'>";
				codigo += "<table border='0'>";
				codigo += "<tr valign='center'>";
				codigo += "<td>";
				if (evento[2] != 0) {
					codigo += "<img class='nb-icono-menu' id='nbe_img" + evento[2] + "' src='images/loading.gif' />";
					var logo = {};
					logo.id = evento[2];
					logo.ts = evento[3];
					array_logos.push(logo);
				}
				codigo += "</td>";
				codigo += "<td class='nb-texto-menu'>" + evento[1] + "</td>";
				codigo += "</tr>";
				codigo += "</table>";
				codigo += "</a>";
				codigo += "</li>";
				codigo += "</ul>";
			}
			codigo += "</div>";
			
			//console.log(codigo);
			
			$("#lista_eventos").html(codigo);
			$("#lista_eventos").trigger("create");

			
			cargarLogos(array_logos);
			} else {
                $("#lista_eventos").html(texto_idioma.sin_eventos);
                $("#lista_eventos").trigger("create");
                $('#recargar').css("display", "block");
            }
			
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function cargarLogos(array_logos) {
	for (var i in array_logos) {
		cargar_imagen(array_logos[i], true, "src", null);
	}
	//$("#lista_eventos").trigger("create");
}


function errorEnDatos() {
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info_eventos);
}

function primerUso() {
	var version = almacenLocalObtenerClave(_nb_clave_app_version);
	if (version == null) {
		inicializarVariables();
	} else {
		if (version != _nb_version_actual) {
			// Aquí vendrán los cambios de actualización de versiones
			switch(version)
			{
			case "1.0.alpha":
			  break;
			case "1.0.0":
				almacenLocalGuardarClave(_nb_clave_app_idioma, "EN");
			  break;
			}
			
			almacenLocalGuardarClave(_nb_clave_app_version, _nb_version_actual);
		}
	}

}
































﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {
	obtenerParametrosURL();

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la información del edificio.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Edificio",
		"boton_edificios" : "Edificios",
		"boton_volver" : "Volver",
		"direccion" : "Dirección",
		"poblacion" : "Población",
		"provincia" : "Provincia",
		"pais" : "País",
		"codigo_postal" : "Código postal",
		"titulo_contacto" : "Información de contacto",
	    "persona_contacto" : "Persona de contacto",
	    "tfno_contacto" : "Teléfono",
	    "tfno_contacto2" : "Otro teléfono",
	    "fax_contacto" : "Fax",
	    "sitio_web_contacto" : "Sitio web",
	    "correo_contacto" : "Correo electrónico",
	    "titulo_localizacion" : "Localización",
	    "plano_localizacion" : "Plano de localización",
	    "recursos" : "Recursos del edificio",
	    "ver_plano" : "Plano del recurso",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the accommodation's information.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Building",
		"boton_edificios" : "Buildings",
		"boton_volver" : "Back",
		"direccion" : "Address",
		"poblacion" : "City",
		"provincia" : "Province",
		"pais" : "Country",
		"codigo_postal" : "Postal code",
		"titulo_contacto" : "Contact information",
	    "persona_contacto" : "Contact person",
	    "tfno_contacto" : "Telephone",
	    "tfno_contacto2" : "Other telephone",
	    "fax_contacto" : "Fax",
	    "sitio_web_contacto" : "Website",
	    "correo_contacto" : "E-mail",
	    "titulo_localizacion" : "Location",
	    "plano_localizacion" : "Location map",
	    "recursos" : "Building resources",
	    "ver_plano" : "Resource map",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	recogerEdificio();
}

function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo + "</center>");
	$('#titulo_contacto').text(texto_idioma.titulo_contacto);
	$('#titulo_localizacion').text(texto_idioma.titulo_localizacion);
	$('#titulo_recursos').html("<center><p><strong>" + texto_idioma.recursos + "</strong></p></center>");
    
    if (urlParams.hasOwnProperty("idex")) {
		$('#boton_edificios .ui-btn-text').text(texto_idioma.boton_volver);
		$('#boton_edificios').attr('href', 'expositor.html?idex=' + urlParams.idex);
	} else if (urlParams.hasOwnProperty("ida")) {
		$('#boton_edificios .ui-btn-text').text(texto_idioma.boton_volver);
		$('#boton_edificios').attr('href', 'actividad.html?ida=' + urlParams.ida);
    } else {
		$('#boton_edificios .ui-btn-text').text(texto_idioma.boton_edificios);
		$('#boton_edificios').attr('href', 'edificios.html');
    }
}

function recogerEdificio() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerEdificio();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerEdificio() {
	var idev = "0";
	var ided = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	if (urlParams.hasOwnProperty("ided")) {
		ided = urlParams.ided;
	} else {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var edificio_cache = almacenLocalObtenerClave(_nb_clave_app_edificio + idev + "-" + ided + "-" + idioma_real);
	var edificio;
	var ts_edificio = "";
	if (edificio_cache != null) {		
		edificio = JSON.parse(edificio_cache);
		if (edificio.length > 0) {
			ts_edificio = edificio[0].ts;
		}
	}
	if (edificio != null) {
        //console.log("edificio = " + JSON.stringify(edificio));
        if (edificio[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            edificio[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarEdificio(edificio, edificio, idev, ided, idioma_real);
            return;
        }
    }
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&ided=" + ided + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_edificio;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/edificio",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarEdificio(response, edificio, idev, ided, idioma_real);
               edificio = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_edificio + idev + "-" + ided + "-" + idioma_real));
               edificio[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_edificio + idev + "-" + ided + "-" + idioma_real, JSON.stringify(edificio));

      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarEdificio(response, edificio, idev, ided, idioma_real) {
	if (isArray(response) && response.length == 3) {
		var objResultado = response[0];
		
		//console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			//errorEnDatos();
			mostrarPanelError(objResultado.error);
			return;
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				edificio = response;
				almacenLocalGuardarClave(_nb_clave_app_edificio + idev + "-" + ided + "-" + idioma_real, JSON.stringify(edificio));
				//console.log(edificio[0].ts);
			}
			else {
				console.log("Información del edificio en CACHE");
			}
			//console.log("EXPOSITOR = " + JSON.stringify(edificio));
			
				// Se procesa la información
			$('#nombreEvento').html("<center>" + edificio[0].nom_evento + "</center>");

				// Datos de la cabecera
			var datos_cabecera = edificio[1].row;
			
			//console.log("DATOS CABECERA = " + JSON.stringify(datos_cabecera));

			hay_datos = false;
			var codigo = "<li data-role='list-divider'>" + datos_cabecera.nom_edificio + "</li><li><br />";
			
			if (datos_cabecera.desc_edificio != "") {
				codigo += "<p>" + datos_cabecera.desc_edificio.replace(/\r\n/g, "<br />") + "</p><br />";
				hay_datos = true;
			}
			
			if (datos_cabecera.direccion != "") {
				codigo += "<p><strong>" + texto_idioma.direccion + "</strong>: " + datos_cabecera.direccion + "</p>";
				hay_datos = true;
			}
			if (datos_cabecera.poblacion != "") {
				codigo += "<p><strong>" + texto_idioma.poblacion + "</strong>: " + datos_cabecera.poblacion + "</p>";
				hay_datos = true;
			}
			if (datos_cabecera.provincia != "") {
				codigo += "<p><strong>" + texto_idioma.provincia + "</strong>: " + datos_cabecera.provincia + "</p>";
				hay_datos = true;
			}
			if (datos_cabecera.pais != "") {
				codigo += "<p><strong>" + texto_idioma.pais + "</strong>: " + datos_cabecera.pais + "</p>";
				hay_datos = true;
			}
			if (datos_cabecera.codigo_postal != "") {
				codigo += "<p><strong>" + texto_idioma.codigo_postal + "</strong>: " + datos_cabecera.codigo_postal + "</p>";
				hay_datos = true;
			}
			codigo += "</li>";
			if (hay_datos) {
				$('#edificio_cabecera').css("display", "block");
				$("#edificio_cabecera").html(codigo);
				$("#edificio_cabecera").listview("refresh");
				$("#edificio_cabecera").trigger("create");
			} else {
				$('#edificio_cabecera').css("display", "none");
			}
			
			// Datos de contacto
			hay_datos = false;
			if (datos_cabecera.telefono != "") {
				$('#enlace_tfno').attr("href", "tel:" + datos_cabecera.telefono.replace(/ /g, ""));
				$('#enlace_tfno').html("<p><strong>" + texto_idioma.tfno_contacto + "</strong>: " + datos_cabecera.telefono + "</p>");
				$('#tfno_contacto').css("display", "block");
				hay_datos = true;
			} else {
				$('#tfno_contacto').remove();
			}
			if (datos_cabecera.telefono_2 != "") {
				$('#enlace_tfno2').attr("href", "tel:" + datos_cabecera.telefono_2.replace(/ /g, ""));
				$('#enlace_tfno2').html("<p><strong>" + texto_idioma.tfno_contacto2 + "</strong>: " + datos_cabecera.telefono_2 + "</p>");
				$('#tfno_contacto2').css("display", "block");
				hay_datos = true;
			} else {
				$('#tfno_contacto2').remove();
			}
			if (datos_cabecera.fax != "") {
				$('#fax_contacto').html("<br /><p><strong>" + texto_idioma.fax_contacto + "</strong>: " + datos_cabecera.fax + "</p>");
				$('#fax_contacto').css("display", "block");
				hay_datos = true;
			} else {
				$('#fax_contacto').remove();
			}
			if (datos_cabecera.sitio_web != "") {
				$('#enlace_sitio_web').attr("href", "javascript:navigator.app.loadUrl('" + datos_cabecera.sitio_web + "', { openExternal: true });");
				$('#enlace_sitio_web').html("<p><strong>" + texto_idioma.sitio_web_contacto + "</strong>: " + datos_cabecera.sitio_web.replace("http://", "").replace("https://", "") + "</p>");
				$('#sitio_web_contacto').css("display", "block");
				hay_datos = true;
			} else {
				$('#sitio_web_contacto').remove();
			}
			if (datos_cabecera.correo_contacto != "") {
				$('#enlace_correo').attr("href", "mailto:" + datos_cabecera.correo_contacto.replace(/ /g, ""));
				$('#enlace_correo').html("<p><strong>" + texto_idioma.correo_contacto + "</strong>: " + datos_cabecera.correo_contacto + "</p>");
				$('#correo_contacto').css("display", "block");
				hay_datos = true;
			} else {
				$('#correo_contacto').remove();
			}

			if (hay_datos) {
				$('#edificio_contacto').css("display", "block");
				$('#edificio_contacto').find("li:last").addClass("ui-corner-bottom");
			} else {
				$('#edificio_contacto').css("display", "none");
			}

				// Datos de localización en el evento
			var hay_datos = false;
			if (datos_cabecera.google_maps != '') {
				$('#enlace_loc_google').attr("href", "javascript:navigator.app.loadUrl('" + datos_cabecera.google_maps + "', { openExternal: true });");
				$('#enlace_loc_google').html("<p><strong>Google Maps</strong></p>");
				//$('#loc_google').css("display", "block");
				hay_datos = true;
			} else {
				$('#loc_google').remove();
			}
			if (datos_cabecera.id_fichero_plano != 0) {
				var info_plano = {};
				info_plano.id = datos_cabecera.id_fichero_plano;
				info_plano.ts = datos_cabecera.ts_edificio_plano;
				info_plano.desc = datos_cabecera.nom_edificio;
				$('#enlace_loc_plano').attr("href", "javascript:verPlano(" + JSON.stringify(info_plano).replace(/'/g, "###@@@###") + ");");
				$('#enlace_loc_plano').html("<p><strong>" + texto_idioma.plano_localizacion + "</strong></p>");
				//$('#enlace_loc_edificio').css("display", "block");
				hay_datos = true;
			} else {
				$('#loc_plano').remove();
			}

			if (hay_datos) {
				$('#edificio_localizacion').css("display", "block");
				$('#edificio_localizacion').find("li:last").addClass("ui-corner-bottom");
			} else {
				$('#edificio_localizacion').css("display", "none");
			}
			
				// Recursos
			var datos_recursos = edificio[2].recursos;
			var contador_recursos = datos_recursos.length - 1;
			
			//console.log("NUM_RECURSOS: " + contador_recursos);
			
			var recurso;
			if (contador_recursos > 0) {
				codigo = "";
				var info_plano = {};
				for (var i=1 ; i<= contador_recursos ; i++) {
					codigo += "<div data-role='collapsible' data-theme='b' data-content-theme='b'>";
					recurso = datos_recursos[i];
					codigo += "<h4>" + recurso[1] + "</h4>";
					if (recurso[2] == "" && recurso[3] == 0)
						codigo += "<p>" + recurso[1] + "</p>";
					else {
						codigo += "<p>" + recurso[2].replace(/\r\n/g, '<br />') + "</p>";
						if (recurso[3] != 0) {
							info_plano.id = recurso[3];
							info_plano.ts = recurso[4];
							info_plano.desc = datos_cabecera.nom_edificio + " - " + recurso[1];
							codigo += "<div style='text-align:right;'>";
							codigo += "<a href='javascript:verPlano(" + JSON.stringify(info_plano).replace(/'/g, "###@@@###") + ");' data-ajax='false' data-theme='b' data-role='button' data-icon='arrow-r' data-iconpos='right' data-inline='true'>" + texto_idioma.ver_plano + "</a>";
							codigo += "</div>";
						}
					}
					
					codigo += "</div>";
				}
				//console.log(codigo);
				
				$("#edificio_recursos").html(codigo);
				$('#edificio_recursos').find('div[data-role=collapsible]').collapsible();
				//$("#edificio_recursos").collapsible();
				//$('#edificio_recursos').listview();
				$("#edificio_recursos").trigger("create");
				
			} else {
				$('#titulo_recursos').css("display", "none");
			}
			
			
			
			
			$("#edificio_localizacion").listview('refresh');
			$("#edificio_contacto").listview('refresh');
			$('#edificio_contenido').css("display", "block");

		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function verPlano(info_plano) {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		
		//console.log(info_plano);
		
		try
        {
			setTimeout(function(){
			    $.mobile.loading('show');
			},200);
            cargar_imagen(info_plano, false, "html", function(fichero) {
				console.log("FICHERO = " + fichero);
					// Si el fichero está vacío se ha producido un error
				if (fichero != "") {
					setTimeout(function(){
					    $.mobile.loading('hide');
					},200);
					window.plugins.VerImagen.mostrarImagen(
							"file://" + fichero,
							{ descripcion: info_plano.desc.replace(/###@@@###/g, "'") }
						);
				} else {
					setTimeout(function(){
					    $.mobile.loading('hide');
					},200);
					$('#edificio_contenido').css("display", "none");
					$('#recargar').css("display", "block");
					mostrarPanelError(texto_idioma.error_info);
				}
			});
        }
        catch (err)
        {
        	setTimeout(function(){
			    $.mobile.loading('hide');
			},200);
            $('#recargar').css("display", "block");
            mostrarPanelError(err.message);
        }
        setTimeout(function(){
		    $.mobile.loading('hide');
		},200);
	}
	else {
		$('#edificio_contenido').css("display", "none");
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_comunicacion);
	}
}

function errorEnDatos() {
	$('#edificio_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info);
}


















﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

$(document).on("pageinit", function(){
	//console.log("PAGE_INIT");
    $("#lista_servicios").listview({
        autodividers: true,
        autodividersSelector: function (li) {
            var out = li.attr("inicial");
            return out;
        }
    }).listview("refresh");
});

function onDeviceReady() {

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la lista de servicios.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Servicios",
		"expandir_todos" : "Expandir todos",
		"contraer_todos" : "Contraer todos",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the list of services.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Services",
		"expandir_todos" : "Expand all",
		"contraer_todos" : "Collapse all",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	mostrarServicios();
}

function mostrarServicios() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}

	recogerServicios();
}

function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo + "</center>");
	$('#expandir_todos .ui-btn-text').text(texto_idioma.expandir_todos);
	$('#contraer_todos .ui-btn-text').text(texto_idioma.contraer_todos);
}

function recogerServicios() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerServicios();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerServicios() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var servicios_cache = almacenLocalObtenerClave(_nb_clave_app_servicios + idev + "-" + idioma_real);
	var servicios;
	var ts_servicios = "";
	if (servicios_cache != null) {		
		servicios = JSON.parse(servicios_cache);
		if (servicios.length > 0) {
			ts_servicios = servicios[0].ts;
		}
	}
	if (servicios != null) {
        //console.log("servicios = " + JSON.stringify(servicios));
        if (servicios[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            servicios[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarServicios(servicios, servicios, idev, idioma_real);
            return;
        }
    }
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_servicios;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/servicios",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarServicios(response, servicios, idev, idioma_real);
               servicios = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_servicios + idev + "-" + idioma_real));
               servicios[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_servicios + idev + "-" + idioma_real, JSON.stringify(servicios));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarServicios(response, servicios, idev, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		//console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			//errorEnDatos();
			mostrarPanelError(objResultado.error);
			return;
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				servicios = response;
				almacenLocalGuardarClave(_nb_clave_app_servicios + idev + "-" + idioma_real, JSON.stringify(servicios));
				//console.log(servicios[0].ts);
			}
			else {
				console.log("Información de servicios en CACHE");
			}
				// Se procesa la información
			var nom_evento = servicios[0].nom_evento;
			$('#nombreEvento').html("<center>" + nom_evento + "</center>");
			var lista_servicios = servicios[1].servicios;
			var contador_servicios = lista_servicios.length - 1;
			//console.log(contador_servicios);
			
			var codigo = "";
			for (var i=1 ; i<= contador_servicios ; i++) {
				servicio = lista_servicios[i];
				//console.log(servicio);
				
				codigo += "<div data-role='collapsible' data-theme='b' data-content-theme='b' class='nb-expandible'>";
				codigo += "<h4>" + servicio[1] + "</h4>";
				codigo += "<p class='nb-servicios'>" + servicio[2].replace(/\r\n/g, "<br />") + "</p></div>";
			}
			
			//console.log(codigo);
			
			$("#servicios_contenido").html(codigo);
			$('#servicios_contenido').find('div[data-role=collapsible]').collapsible();
			$("#servicios_contenido").trigger("create");
			$("#servicios_contenido").css("display", "block");
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function todos(abrir) {
	if (abrir)
		$('#servicios_contenido').find('div[data-role=collapsible]').trigger('expand');
	else
		$('#servicios_contenido').find('div[data-role=collapsible]').trigger('collapse');
}

function errorEnDatos() {
	$('#servicios_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info_menu);
}




﻿	/*! netBytes software */

$(document).bind("mobileinit", function(){
	$.mobile.defaultPageTransition = "none";

	$.mobile.listview.prototype.options.autodividersSelector = function(elemento) {
		var origen = "ÁÉÍÓÚÜ";
		var destino = "AEIOUU";
		var indice;
	    var texto = $.trim( elemento.text() ) || null;
	    if ( !texto ) {
	        return null;
	    }
	    if ( !isNaN(parseFloat(texto)) ) {
	        return "0-9";
	    } else {
	        texto = texto.substring(0, 1).toUpperCase();
	        indice = origen.indexOf(texto);
	        if (indice >= 0)
	        	texto = destino.substring(indice, indice + 1);
	        return texto;
	    }
	};

});


﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {
	obtenerParametrosURL();

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la información del expositor.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Expositores",
		"boton_expositores" : "Exposit.",
		"boton_expositores_largo" : "Expositores",
		"producto_servicio" : "Producto / servicio",
		"que_presenta" : "Qué presenta",
		"info_adicional" : "Información adicional",
		"direccion" : "Dirección",
		"poblacion" : "Población",
		"provincia" : "Provincia",
		"pais" : "País",
		"codigo_postal" : "Código postal",
		"titulo_contacto" : "Información de contacto",
	    "persona_contacto" : "Persona de contacto",
	    "tfno_contacto" : "Teléfono",
	    "tfno_contacto2" : "Otro teléfono",
	    "fax_contacto" : "Fax",
	    "sitio_web_contacto" : "Sitio web",
	    "correo_contacto" : "Correo electrónico",
	    "titulo_localizacion" : "Localización en el evento",
	    "localizacion" : "Localización",
	    "plano_localizacion" : "Plano de localización",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the exhibitor's information.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Exhibitors",
		"boton_expositores" : "Exhibit.",
		"boton_expositores_largo" : "Exhibitors",
		"producto_servicio" : "Product / service",
		"que_presenta" : "What it presents",
		"info_adicional" : "Aditional information",
		"direccion" : "Address",
		"poblacion" : "City",
		"provincia" : "Province",
		"pais" : "Country",
		"codigo_postal" : "Postal code",
		"titulo_contacto" : "Contact information",
	    "persona_contacto" : "Contact person",
	    "tfno_contacto" : "Telephone",
	    "tfno_contacto2" : "Other telephone",
	    "fax_contacto" : "Fax",
	    "sitio_web_contacto" : "Website",
	    "correo_contacto" : "E-mail",
	    "titulo_localizacion" : "Location within the event",
	    "localizacion" : "Location",
	    "plano_localizacion" : "Location map",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	recogerExpositor();
}

window.onorientationchange = function () {
    //Need at least 800 milliseconds
    setTimeout(changeOrientation, 1000);
}

function changeOrientation() {
    /*switch (window.orientation) {
        case 0:
            // portrait, home bottom
        case 180:
            // portrait, home top
            console.log("portrait H: " + $(window).height() + " W: " + $(window).width());
            break;
        case -90:
            // landscape, home left
        case 90:
            // landscape, home right
            console.log("landscape H: " + $(window).height() + " W: " + $(window).width());
            break;
    }*/
    if ($(window).width() < 360)
        $('#id_boton_exp').text(texto_idioma.boton_expositores);
    else
        $('#id_boton_exp').text(texto_idioma.boton_expositores_largo);
}

function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo + "</center>");
	$('#titulo_contacto').text(texto_idioma.titulo_contacto);
	$('#titulo_localizacion').text(texto_idioma.titulo_localizacion);
    if ($(window).width() < 360)
        $('#id_boton_exp').text(texto_idioma.boton_expositores);
    else
        $('#id_boton_exp').text(texto_idioma.boton_expositores_largo);
}

function recogerExpositor() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerExpositor();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerExpositor() {
	var idev = "0";
	var idex = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	if (urlParams.hasOwnProperty("idex")) {
		idex = urlParams.idex;
	} else {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var expositor_cache = almacenLocalObtenerClave(_nb_clave_app_expositor + idev + "-" + idex + "-" + idioma_real);
	var expositor;
	var ts_expositor = "";
	if (expositor_cache != null) {		
		expositor = JSON.parse(expositor_cache);
		if (expositor.length > 0) {
			ts_expositor = expositor[0].ts;
		}
	}
	if (expositor != null) {
        //console.log("expositor = " + JSON.stringify(expositor));
        if (expositor[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            expositor[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarExpositor(expositor, expositor, idev, idex, idioma_real);
            return;
        }
    }
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&idex=" + idex + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_expositor;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/expositor",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarExpositor(response, expositor, idev, idex, idioma_real);
               expositor = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_expositor + idev + "-" + idex + "-" + idioma_real));
               expositor[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_expositor + idev + "-" + idex + "-" + idioma_real, JSON.stringify(expositor));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarExpositor(response, expositor, idev, idex, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		//console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			//errorEnDatos();
			mostrarPanelError(objResultado.error);
			return;
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				expositor = response;
				almacenLocalGuardarClave(_nb_clave_app_expositor + idev + "-" + idex + "-" + idioma_real, JSON.stringify(expositor));
				//console.log(expositor[0].ts);
			}
			else {
				console.log("Información del expositor en CACHE");
			}
			//console.log("EXPOSITOR = " + JSON.stringify(expositor));
			
				// Se procesa la información
			$('#nombreEvento').html("<center>" + expositor[0].nom_evento + "</center>");

				// Datos de la cabecera
			var datos_cabecera = expositor[1].row;
			
			//console.log("DATOS CABECERA = " + JSON.stringify(datos_cabecera));

			$('#nombre_expositor').text(datos_cabecera.nom_expositor);

			var logo_expositor = "";
			if (datos_cabecera.id_fichero_logo != 0) {
				logo_expositor = "<center><img class='nb-icono-evento' id='nbe_img" + datos_cabecera.id_fichero_logo + "' src='images/loading.gif' /></center>";
				$('#logo_expositor').html(logo_expositor);
				$('#logo_expositor').css("display", "block");
			} else {
				$('#logo_expositor').css("display", "none");
			}
			
			var codigo = "<br />";
			if (datos_cabecera.producto_servicio != "")
				codigo += "<p><strong>" + texto_idioma.producto_servicio + "</strong>: " + datos_cabecera.producto_servicio + "</p>";
			if (datos_cabecera.que_presenta != "")
				codigo += "<p><strong>" + texto_idioma.que_presenta + "</strong>: " + datos_cabecera.que_presenta + "</p>";

			$("#cabecera_expositor").html(codigo);
			$("#expositor_cabecera").listview("refresh");
			$("#expositor_cabecera").trigger("create");

				// Datos de localización en el evento
			var hay_datos = false;
			if (datos_cabecera.id_recurso_edificio != 0) {
				$('#enlace_loc_edificio').attr("href", "edificio.html?ided=" + datos_cabecera.id_edificio + "&idex=" + idex);
				$('#enlace_loc_edificio').html("<p><strong>" + datos_cabecera.nom_edificio + "</strong><br />" + datos_cabecera.nom_recurso_edificio + "</p>");
				$('#loc_edificio').css("display", "block");
				hay_datos = true;
			} else {
				$('#loc_edificio').remove();
			}
			if (datos_cabecera.localizacion != "") {
				$('#loc_expositor').html("<br /><p><strong>" + texto_idioma.localizacion + "</strong>: " + datos_cabecera.localizacion + "</p>");
				$('#loc_expositor').css("display", "block");
				hay_datos = true;
			} else {
				$('#loc_expositor').remove();
			}
			if (datos_cabecera.id_fichero_plano != 0) {
				var info_plano = {};
				info_plano.id = datos_cabecera.id_fichero_plano;
				info_plano.ts = datos_cabecera.ts_expositor_plano;
				info_plano.desc = datos_cabecera.nom_expositor;
				$('#enlace_loc_plano').attr("href", "javascript:verPlano(" + JSON.stringify(info_plano).replace(/'/g, "###@@@###") + ");");
				$('#enlace_loc_plano').html("<p><strong>" + texto_idioma.plano_localizacion + "</strong></p>");
				$('#loc_plano').css("display", "block");
				hay_datos = true;
			} else {
				$('#loc_plano').remove();
			}

			if (hay_datos) {
				$('#expositor_localizacion').css("display", "block");
				$('#expositor_localizacion').find("li:last").addClass("ui-corner-bottom");
			} else {
				$('#expositor_localizacion').css("display", "none");
			}
			
				// Información adicional
			hay_datos = false;
			var codigo = "<li data-role='list-divider'>" + texto_idioma.info_adicional + "</li><li><br />";
			
			if (datos_cabecera.direccion != "") {
				codigo += "<p><strong>" + texto_idioma.direccion + "</strong>: " + datos_cabecera.direccion + "</p>";
				hay_datos = true;
			}
			if (datos_cabecera.poblacion != "") {
				codigo += "<p><strong>" + texto_idioma.poblacion + "</strong>: " + datos_cabecera.poblacion + "</p>";
				hay_datos = true;
			}
			if (datos_cabecera.provincia != "") {
				codigo += "<p><strong>" + texto_idioma.provincia + "</strong>: " + datos_cabecera.provincia + "</p>";
				hay_datos = true;
			}
			if (datos_cabecera.pais != "") {
				codigo += "<p><strong>" + texto_idioma.pais + "</strong>: " + datos_cabecera.pais + "</p>";
				hay_datos = true;
			}
			if (datos_cabecera.codigo_postal != "") {
				codigo += "<p><strong>" + texto_idioma.codigo_postal + "</strong>: " + datos_cabecera.codigo_postal + "</p>";
				hay_datos = true;
			}
			codigo += "</li>";
			if (hay_datos) {
				$('#expositor_adicional').css("display", "block");
				$("#expositor_adicional").html(codigo);
				$("#expositor_adicional").listview("refresh");
				$("#expositor_adicional").trigger("create");
			} else {
				$('#expositor_adicional').css("display", "none");
			}
			
				// Datos de contacto
			hay_datos = false;
			if (datos_cabecera.persona_contacto != "") {
				$('#persona_contacto').html("<br /><p><strong>" + texto_idioma.persona_contacto + "</strong>: " + datos_cabecera.persona_contacto + "</p>");
				$('#persona_contacto').css("display", "block");
				hay_datos = true;
			} else {
				$('#persona_contacto').remove();
			}
			if (datos_cabecera.telefono != "") {
				$('#enlace_tfno').attr("href", "tel:" + datos_cabecera.telefono.replace(/ /g, ""));
				$('#enlace_tfno').html("<p><strong>" + texto_idioma.tfno_contacto + "</strong>: " + datos_cabecera.telefono + "</p>");
				$('#tfno_contacto').css("display", "block");
				hay_datos = true;
			} else {
				$('#tfno_contacto').remove();
			}
			if (datos_cabecera.telefono_2 != "") {
				$('#enlace_tfno2').attr("href", "tel:" + datos_cabecera.telefono_2.replace(/ /g, ""));
				$('#enlace_tfno2').html("<p><strong>" + texto_idioma.tfno_contacto2 + "</strong>: " + datos_cabecera.telefono_2 + "</p>");
				$('#tfno_contacto2').css("display", "block");
				hay_datos = true;
			} else {
				$('#tfno_contacto2').remove();
			}
			if (datos_cabecera.fax != "") {
				$('#fax_contacto').html("<br /><p><strong>" + texto_idioma.fax_contacto + "</strong>: " + datos_cabecera.fax + "</p>");
				$('#fax_contacto').css("display", "block");
				hay_datos = true;
			} else {
				$('#fax_contacto').remove();
			}
			if (datos_cabecera.sitio_web != "") {
				$('#enlace_sitio_web').attr("href", "javascript:navigator.app.loadUrl('" + datos_cabecera.sitio_web + "', { openExternal: true });");
				$('#enlace_sitio_web').html("<p><strong>" + texto_idioma.sitio_web_contacto + "</strong>: " + datos_cabecera.sitio_web.replace("http://", "").replace("https://", "") + "</p>");
				$('#sitio_web_contacto').css("display", "block");
				hay_datos = true;
			} else {
				$('#sitio_web_contacto').remove();
			}
			if (datos_cabecera.correo_contacto != "") {
				$('#enlace_correo').attr("href", "mailto:" + datos_cabecera.correo_contacto.replace(/ /g, ""));
				$('#enlace_correo').html("<p><strong>" + texto_idioma.correo_contacto + "</strong>: " + datos_cabecera.correo_contacto + "</p>");
				$('#correo_contacto').css("display", "block");
				hay_datos = true;
			} else {
				$('#correo_contacto').remove();
			}

			if (hay_datos) {
				$('#expositor_contacto').css("display", "block");
				$('#expositor_contacto').find("li:last").addClass("ui-corner-bottom");
			} else {
				$('#expositor_contacto').css("display", "none");
			}
			
			
			
			
			$("#expositor_localizacion").listview('refresh');
			$("#expositor_contacto").listview('refresh');
			$('#expositor_contenido').css("display", "block");
			
			if (datos_cabecera.id_fichero_logo != 0) {
				var logo = {};
				logo.id = datos_cabecera.id_fichero_logo;
				logo.ts = datos_cabecera.ts_expositor_logo;
				cargar_imagen(logo, true, "src", null);
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}


function verPlano(info_plano) {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		
		//console.log(info_plano);
		
		try
        {
			setTimeout(function(){
			    $.mobile.loading('show');
			},200);
            cargar_imagen(info_plano, false, "html", function(fichero) {
				console.log("FICHERO = " + fichero);
					// Si el fichero está vacío se ha producido un error
				if (fichero != "") {
					setTimeout(function(){
					    $.mobile.loading('hide');
					},200);
					window.plugins.VerImagen.mostrarImagen(
							"file://" + fichero,
							{ descripcion: info_plano.desc.replace(/###@@@###/g, "'") }
						);
				} else {
					setTimeout(function(){
					    $.mobile.loading('hide');
					},200);
					$('#expositor_contenido').css("display", "none");
					$('#recargar').css("display", "block");
					mostrarPanelError(texto_idioma.error_info);
				}
			});
        }
        catch (err)
        {
        	setTimeout(function(){
			    $.mobile.loading('hide');
			},200);
            $('#recargar').css("display", "block");
            mostrarPanelError(err.message);
        }
        setTimeout(function(){
		    $.mobile.loading('hide');
		},200);
	}
	else {
		$('#expositor_contenido').css("display", "none");
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_comunicacion);
	}
}

function errorEnDatos() {
	$('#expositor_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info);
}


﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {
	obtenerParametrosURL();

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la información de flash-posters.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Flash-Posters",
		"boton_lista" : "Flash",
		"boton_lista_largo" : "Flash-Posters",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the accommodation's information.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Flash-Posters",
		"boton_lista" : "Flash",
		"boton_lista_largo" : "Flash-Posters",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
		// Si es Android versión 2.X se desactiva el filtro
	if (device.platform == "Android" && device.version.substr(0, 2) == "2.")
		$('#lista_datos_info').prev("form.ui-listview-filter").toggle();
	
	recogerListaDatosInfo();
}

window.onorientationchange = function () {
    //Need at least 800 milliseconds
    setTimeout(changeOrientation, 1000);
}

function changeOrientation() {
    if ($(window).width() < 360)
        $('#id_boton_flash').text(texto_idioma.boton_lista);
    else
        $('#id_boton_flash').text(texto_idioma.boton_lista_largo);
}

function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo + "</center>");
    if ($(window).width() < 360)
        $('#id_boton_flash').text(texto_idioma.boton_lista);
    else
        $('#id_boton_flash').text(texto_idioma.boton_lista_largo);
}

function recogerListaDatosInfo() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerListaDatosInfo();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerListaDatosInfo() {
	var idev = "0";
	var idld = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	if (urlParams.hasOwnProperty("idld")) {
		idld = urlParams.idld;
	} else {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var lista_datos_info_cache = almacenLocalObtenerClave(_nb_clave_app_lista_datos_info + idev + "-" + idld + "-" + idioma_real);
	var lista_datos_info;
	var ts_lista_datos_info = "";
	if (lista_datos_info_cache != null) {		
		lista_datos_info = JSON.parse(lista_datos_info_cache);
		if (lista_datos_info.length > 0) {
			ts_lista_datos_info = lista_datos_info[0].ts;
		}
	}
    if (lista_datos_info != null) {
        //console.log("lista_datos_info = " + JSON.stringify(lista_datos_info));
        if (lista_datos_info[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
        	lista_datos_info[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarListaDatosInfo(lista_datos_info, lista_datos_info, idev, idld, idioma_real);
            return;
        }
    }
    
	var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&idld=" + idld + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_lista_datos_info;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/lista_datos_info",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarListaDatosInfo(response, lista_datos_info, idev, idld, idioma_real);
               lista_datos_info = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_lista_datos_info + idev + "-" + idld + "-" + idioma_real));
               lista_datos_info[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_lista_datos_info + idev + "-" + idld + "-" + idioma_real, JSON.stringify(lista_datos_info));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarListaDatosInfo(response, lista_datos_info, idev, idld, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
				mostrarPanelError(objResultado.error);
				return;
			}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				lista_datos_info = response;
				almacenLocalGuardarClave(_nb_clave_app_lista_datos_info + idev + "-" + idld + "-" + idioma_real, JSON.stringify(lista_datos_info));
				//console.log(lista_datos_info[0].ts);
			}
			else {
				console.log("Información del lista_datos_info en CACHE");
			}
			
				// Se procesa la información
			$('#nombreEvento').html("<center>" + lista_datos_info[0].nom_evento + "</center>");

			var lista_info = lista_datos_info[1].lista_datos_info;
			var contador_info = lista_info.length - 1;
			//console.log("lista_info = " + JSON.stringify(lista_info));
			
			var codigo = "<li data-role='list-divider'>" + lista_datos_info[0].nom_lista_datos + "</li>";
			var info;
			for (var i=1 ; i<= contador_info ; i++) {
				info = lista_info[i];
				//console.log(info);

				codigo += "<li><br /><p><strong>" + info[1] + "</strong><br />" + info[2] + "</p></li>";
			}
			
			$("#lista_datos_info").html(codigo);
			$("#lista_datos_info").listview("refresh");
			$("#lista_datos_info").trigger("create");
			$('#lista_datos_info_contenido').css("display", "block");

		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function errorEnDatos() {
	$('#lista_datos_info_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info);
}


















﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

$(document).on("pageinit", function(){
	console.log("PAGE_INIT");
    $("#lista_expositores").listview({
        autodividers: true,
        autodividersSelector: function (li) {
            var out = li.attr("inicial");
            return out;
        }
    }).listview("refresh");
});

function onDeviceReady() {

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la lista de expositores.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Expositores",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the list of exhibitors.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Exhibitors",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	mostrarExpositores();
}

function mostrarExpositores() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}

	recogerExpositores();
}

function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo + "</center>");
}

function recogerExpositores() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerExpositores();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerExpositores() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var expositores_cache = almacenLocalObtenerClave(_nb_clave_app_expositores + idev + "-" + idioma_real);
	var expositores;
	var ts_expositores = "";
	if (expositores_cache != null) {		
		expositores = JSON.parse(expositores_cache);
		if (expositores.length > 0) {
			ts_expositores = expositores[0].ts;
		}
	}
	if (expositores != null) {
        //console.log("expositores = " + JSON.stringify(expositores));
        if (expositores[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            expositores[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarExpositores(expositores, expositores, idev, idioma_real);
            return;
        }
    }
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_expositores;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/expositores",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarExpositores(response, expositores, idev, idioma_real);
               expositores = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_expositores + idev + "-" + idioma_real));
               expositores[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_expositores + idev + "-" + idioma_real, JSON.stringify(expositores));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarExpositores(response, expositores, idev, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		//console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			//errorEnDatos();
			mostrarPanelError(objResultado.error);
			return;
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				expositores = response;
				almacenLocalGuardarClave(_nb_clave_app_expositores + idev + "-" + idioma_real, JSON.stringify(expositores));
				//console.log(expositores[0].ts);
			}
			else {
				console.log("Información de expositores en CACHE");
			}
				// Se procesa la información
			var nom_evento = expositores[0].nom_evento;
			$('#nombreEvento').html("<center>" + nom_evento + "</center>");
			var lista_expositores = expositores[1].expositores;
			var contador_expositores = lista_expositores.length - 1;
			//console.log(contador_expositores);
			
			var codigo = "";
			var array_logos = [];
			
			for (var i=1 ; i<= contador_expositores ; i++) {
				expositor = lista_expositores[i];
				//console.log(expositor);
				
				codigo += "<li inicial='" + generarInicial(expositor[1]) + "'>";
				codigo += "<a href='expositor.html?idex=" + expositor[0] + "' data-ajax='false'>";
				codigo += "<table border='0'>";
				codigo += "<tr valign='center'>";
				codigo += "<td>";
				if (expositor[3] != 0) {
					codigo += "<img class='nb-icono-evento' id='nbe_img" + expositor[3] + "' src='images/loading.gif' /><br /><br />";
					var logo = {};
					logo.id = expositor[3];
					logo.ts = expositor[4];
					array_logos.push(logo);
				}
				codigo += "</td></tr>";
				codigo += "<tr valign='center'>";
				codigo += "<td class='nb-texto-menu'><p><strong>" + expositor[1] + "</strong></p><p>" + expositor[2] + "</p></td>";
				codigo += "</tr>";
				codigo += "</table>";
				codigo += "</a>";
				codigo += "</li>";
			}
			
			$("#lista_expositores").html(codigo);
			$("#lista_expositores").listview("refresh");
			$("#lista_expositores").trigger("create");
			$('#expositores_contenido').css("display", "block");
			
			$("#expositores_contenido").trigger("create");
			
			cargarLogos(array_logos);
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function generarInicial(texto) {
	var origen = "ÁÉÍÓÚÜ";
	var destino = "AEIOUU";
	var indice;
    texto = $.trim(texto);

    if ( texto == "" ) {
        return "-";
    }
    if ( !isNaN(parseFloat(texto)) ) {
        return "0-9";
    } else {
        texto = texto.substring(0, 1).toUpperCase();
        indice = origen.indexOf(texto);
        if (indice >= 0)
        	texto = destino.substring(indice, indice + 1);
        return texto;
    }
}

function cargarLogos(array_logos) {
	for (var i in array_logos) {
		cargar_imagen(array_logos[i], true, "src", null);
	}
}

function errorEnDatos() {
	$('#expositores_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info_menu);
}











﻿/*! netBytes software - menu.js */

var cancelar_descarga = false;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la información del evento.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Descargar contenido",
		"descargar_texto" : "<p>Esta opción permite descargar el contenido del evento. Tiene varias ventajas:<ul><li>Si se utiliza esta opción a través de un conexión a internet Wi-Fi, el consumo de datos posterior será menor porque cuando se utilice la aplicación la información ya estará en el dispositivo.</li><li>El funcionamiento de la aplicación será más rápido al tener que descargar menos información en el momento que se solicita.</li></ul></p><p>A pesar de descargar el contenido de un evento, seguirá siendo necesaria una conexión a internet para garantizar que la información está actualizada, pero el tráfico de datos será mínimo.</p>",
		"boton_descargar" : "Descargar",
		"boton_cancelar" : "Cancelar",
		"alerta_mensaje_descargado" : "Contenido descargado",
		"alerta_mensaje_cancelado" : "Descarga cancelada",
		"alerta_titulo" : "Descargar contenido",
		"alerta_boton" : "Aceptar",
		"confirmar_texto" : "¿Deseas descargar la información y ficheros del evento?",
        "confirmar_boton_si" : "Sí",
        "confirmar_boton_no" : "No",
        "cancelando" : "Cancelando...",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
		};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the event's information.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Download content",
		"descargar_texto" : "<p>This option allows you to download the event's information content. The advantages are:<ul><li>After using this option with a Wi-Fi internet connection, the internet data consumption while using the application will be lower because the information will have already been downloaded in the device.</li><li>The application will work faster, because less information will have to be downloaded when it is needed.</li></ul></p><p>Although the event's information had been downloaded, an internet connection will be needed in order to guarantee that the information presented by the application is up to date. The data traffic will be very low though.</p>",
		"boton_descargar" : "Download",
		"boton_cancelar" : "Cancel",
		"alerta_mensaje_descargado" : "Content downloaded",
		"alerta_mensaje_cancelado" : "Downloading canceled",
		"alerta_titulo" : "Download content",
		"alerta_boton" : "OK",
		"confirmar_texto" : "Do you want to download the event's information content?",
        "confirmar_boton_si" : "Yes",
        "confirmar_boton_no" : "No",
		"cancelando" : "Canceling...",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
		};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);

	recogerEvento();
    
}

function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo + "</center>");
	$('#descargar_texto').html(texto_idioma.descargar_texto);
	$('#boton_descargar .ui-btn-text').text(texto_idioma.boton_descargar);
	$('#boton_cancelar .ui-btn-text').text(texto_idioma.boton_cancelar);
	$('#cancelando').text(texto_idioma.cancelando);
}

function recogerEvento() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerEvento();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerEvento() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var info_evento_cache = almacenLocalObtenerClave(_nb_clave_app_info_evento + idev + "-" + idioma_real);
	var info_evento;
	var ts_evento_ficha = "";
	if (info_evento_cache != null) {		
		info_evento = JSON.parse(info_evento_cache);
		if (info_evento.length > 0) {
			ts_evento_ficha = info_evento[0].ts;
		}
	}
	if (info_evento != null) {
        //console.log("info_evento = " + JSON.stringify(info_evento));
        if (info_evento[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            info_evento[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarInfoEvento(info_evento, info_evento, idev, idioma_real);
            return;
        }
    }
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_evento_ficha;
	//console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/info",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,/*
      		beforeSend: function (jqXHR) {
      			jqXHR.setRequestHeader('Accept-Encoding', 'gzip');
      	    },*/
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarInfoEvento(response, info_evento, idev, idioma_real);
               info_evento = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_info_evento + idev + "-" + idioma_real));
               info_evento[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_info_evento + idev + "-" + idioma_real, JSON.stringify(info_evento));

      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarInfoEvento(response, info_evento, idev, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			mostrarPanelError(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				//mostrarAlerta("OK", "Eventos", "Aceptar");
				info_evento = response;
				almacenLocalGuardarClave(_nb_clave_app_info_evento + idev + "-" + idioma_real, JSON.stringify(info_evento));
				//console.log(info_evento[0].ts);
			}
			else {
				console.log("Información del evento en CACHE");
			}
				// Se procesa la información
			var objEvento = info_evento[1].row;
			
			$('#nombre_evento').html("<center>" + objEvento.nom_evento + "</center>");
			if (objEvento.id_fichero_logo != 0) {
				var logo = {};
				logo.id = objEvento.id_fichero_logo;
				logo.ts = objEvento.ts_evento_logo;
				cargar_imagen(logo, false, "src", null);
			}
			
			$('#descargar_contenido').css("display", "block");
			}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function descargarConfirmar() {
    solicitarConfirmacion(texto_idioma.confirmar_texto, descargar, [texto_idioma.confirmar_boton_si,texto_idioma.confirmar_boton_no] , texto_idioma.titulo);
}

function descargar(ejecutar) {
    if (!ejecutar)
        return;
    
	cancelar_descarga = false;
	
	$('#celda-1').attr("class", "nb-celda-no-activa");
	$('#celda-2').attr("class", "nb-celda-no-activa");
	$('#celda-3').attr("class", "nb-celda-no-activa");
	$('#celda-4').attr("class", "nb-celda-no-activa");
	$('#celda-5').attr("class", "nb-celda-no-activa");
	$('#celda-6').attr("class", "nb-celda-no-activa");
	$('#celda-7').attr("class", "nb-celda-no-activa");
	$('#celda-8').attr("class", "nb-celda-no-activa");
	$('#celda-9').attr("class", "nb-celda-no-activa");
	$('#celda-10').attr("class", "nb-celda-no-activa");
	$('#celda-11').attr("class", "nb-celda-no-activa");
	$('#celda-12').attr("class", "nb-celda-no-activa");
	
	$('#descargar').css("display", "none");
	$('#boton_cancelar').css("display", "block");
	$('#descargando').css("display", "block");
	
	etapa_1();
}

function cancelar() {
	cancelar_descarga = true;
	$('#cancelando').css("display", "block");
	$('#boton_cancelar').css("display", "none");
	/*
	$('#descargar').css("display", "block");
	$('#descargando').css("display", "none");
	*/
}

function cancelar_finalizar() {
	$('#cancelando').css("display", "none");
	$('#descargar').css("display", "block");
	$('#descargando').css("display", "none");
	mostrarAlerta(texto_idioma.alerta_mensaje_cancelado, texto_idioma.alerta_titulo, texto_idioma.alerta_boton);
}

    // Etapa 1 / Información del evento
function etapa_1() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var info_evento_cache = almacenLocalObtenerClave(_nb_clave_app_info_evento + idev + "-" + idioma_real);
	var info_evento;
	var ts_evento_ficha = "";
	if (info_evento_cache != null) {
		info_evento = JSON.parse(info_evento_cache);
		if (info_evento.length > 0) {
			ts_evento_ficha = info_evento[0].ts;
		}
	}	
    
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_evento_ficha;
	$('#celda-1').attr("class", "nb-celda-activa");
	
	try
    {
		$.ajax({
            url: "http://resteventos.netbyt.es/evento.aspx/info",
            type: 'POST',
            data: postString,
            dataType: "jsonp",
            timeout: 20000,		// 20 s
            cache : false,
            success: function( response ) {
                procesarInfoEventoEtapa1(response, info_evento, idev, idioma_real);
                var valor = almacenLocalObtenerClave(_nb_clave_app_info_evento + idev + "-" + idioma_real);
                if (valor != null) {
                    info_evento = JSON.parse(valor);
                info_evento[0].ts_limite = segundosDesde1970() + segundos_cache;
                almacenLocalGuardarClave(_nb_clave_app_info_evento + idev + "-" + idioma_real, JSON.stringify(info_evento));
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               errorDescarga(texto_idioma.error_comunicacion);
               },
            complete: function(jqXHR, textStatus) {
               if (textStatus == "success") {
                    console.log("INFO EVENTO DESCARGADO");
               if (cancelar_descarga)
                    cancelar_finalizar();
               else
                    leerAgenda(idev, coda, idioma_real);
               } else {
                    //console.log("cancelar etapa 1");
                    cancelar_descarga = true;
               }
            } 
        });
    }
    catch (err)
    {
		errorDescarga(err.message);
    }

}

function procesarInfoEventoEtapa1(response, info_evento, idev, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			mostrarPanelError(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				info_evento = response;
				almacenLocalGuardarClave(_nb_clave_app_info_evento + idev + "-" + idioma_real, JSON.stringify(info_evento));
				//console.log(info_evento[0].ts);
			}
        }
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

	// Etapa 2 / Agenda y actividades
function leerAgenda(idev, coda, idioma_real) {
	var agenda_cache = almacenLocalObtenerClave(_nb_clave_app_agenda + idev + "-" + idioma_real);
	var agenda;
	var ts_agenda = "";
	if (agenda_cache != null) {		
		agenda = JSON.parse(agenda_cache);
		if (agenda.length > 0) {
			ts_agenda = agenda[0].ts;
		}
	}
	var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_agenda;
	$('#celda-2').attr("class", "nb-celda-activa");
    
	try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/agenda",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
               procesarAgenda(response, agenda, idev, coda, idioma_real);
               var valor = almacenLocalObtenerClave(_nb_clave_app_agenda + idev + "-" + idioma_real);
               if (valor != null) {
                    agenda = JSON.parse(valor);
               agenda[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_agenda + idev + "-" + idioma_real, JSON.stringify(agenda));
               }
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			errorDescarga(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) {
      			if (textStatus == "success") {
	      			console.log("AGENDA DESCARGADA");
	      			if (cancelar_descarga)
	      				cancelar_finalizar();
	      			else
	      				leerPlanos(idev, coda, idioma_real);
      			} else {
	      			//console.log("cancelar etapa 2");
	      			cancelar_descarga = true;
	      		}
      		}
   		});
    }
    catch (err)
    {
    	errorDescarga(err.message);
    }
}

function procesarAgenda(response, agenda, idev, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			errorDescarga(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				//mostrarAlerta("OK", "Eventos", "Aceptar");
				agenda = response;
				almacenLocalGuardarClave(_nb_clave_app_agenda + idev + "-" + idioma_real, JSON.stringify(agenda));
			}
				// Se procesa la información
			var lista_actividades = agenda[1].agenda;
			var contador_actividades = lista_actividades.length - 1;
			
			var codigo = "";
			for (var i=1 ; i<= contador_actividades ; i++) {
				actividad = lista_actividades[i];
				leerActividad(idev, actividad[0], coda, idioma_real);
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function leerActividad(idev, ida, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	var actividad_cache = almacenLocalObtenerClave(_nb_clave_app_actividad + idev + "-" + ida + "-" + idioma_real);
	var actividad;
	var ts_actividad = "";
	if (actividad_cache != null) {		
		actividad = JSON.parse(actividad_cache);
		if (actividad.length > 0) {
			ts_actividad = actividad[0].ts;
		}
	}
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&ida=" + ida + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_actividad;
	
	try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/actividad",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
               procesarActividad(response, actividad, idev, ida, idioma_real);
               var valor = almacenLocalObtenerClave(_nb_clave_app_actividad + idev + "-" + ida + "-" + idioma_real);
               if (valor != null) {
                    actividad = JSON.parse(valor);
               actividad[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_actividad + idev + "-" + ida + "-" + idioma_real, JSON.stringify(actividad));
               }
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			errorDescarga(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) {
      			if (textStatus != "success") {
      				cancelar_descarga = true;
      				} 
      			} 
   		});
    }
    catch (err)
    {
    	console.log("error: " + err.message);
    	errorDescarga(err.message);
    }
}

function procesarActividad(response, actividad, idev, ida, idioma_real) {
    if (cancelar_descarga) {
		return;
        }
	if (isArray(response) && response.length == 3) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			errorDescarga(objResultado.error);
			return;
			}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				actividad = response;
				almacenLocalGuardarClave(_nb_clave_app_actividad + idev + "-" + ida + "-" + idioma_real, JSON.stringify(actividad));
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}


	// Etapa 3 / Leer planos
function leerPlanos(idev, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	var planos_cache = almacenLocalObtenerClave(_nb_clave_app_planos + idev + "-" + idioma_real);
	var planos;
	var ts_planos = "";
	if (planos_cache != null) {		
		planos = JSON.parse(planos_cache);
		if (planos.length > 0) {
			ts_planos = planos[0].ts;
		}
	}
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_planos;
	$('#celda-3').attr("class", "nb-celda-activa");
    
	try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/planos",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
               procesarPlanos(response, planos, idev, idioma_real);
                var valor = almacenLocalObtenerClave(_nb_clave_app_planos + idev + "-" + idioma_real);
                if (valor != null) {
                    planos = JSON.parse(valor);
               planos[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_planos + idev + "-" + idioma_real, JSON.stringify(planos));
                }
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			errorDescarga(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			if (textStatus == "success") {
      				console.log("PLANOS DESCARGADOS");
	      			if (cancelar_descarga)
	      				cancelar_finalizar();
	      			else
	      				leerExpositores(idev, coda, idioma_real);
      			} else {
	      			cancelar_descarga = true;
	      		}
      		}
   		});
    }
    catch (err)
    {
    	errorDescarga(err.message);
    }
}

function procesarPlanos(response, planos, idev, idioma_real) {
    if (cancelar_descarga) {
		return;
        }
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			errorDescarga(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				//mostrarAlerta("OK", "Eventos", "Aceptar");
				planos = response;
				almacenLocalGuardarClave(_nb_clave_app_planos + idev + "-" + idioma_real, JSON.stringify(planos));
			}
				// Se procesa la información
			var lista_planos = planos[1].planos;
			var contador_planos = lista_planos.length - 1;
			
			var plano;
			var info_plano = {};
			for (var i=1 ; i<= contador_planos ; i++) {
				plano = lista_planos[i];
				info_plano.id = plano[2];
				info_plano.ts = plano[3];
				cargar_imagen(info_plano, false, "html", null);
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

	// Etapa 4 / Expositores
function leerExpositores(idev, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	var expositores_cache = almacenLocalObtenerClave(_nb_clave_app_expositores + idev + "-" + idioma_real);
	var expositores;
	var ts_expositores = "";
	if (expositores_cache != null) {		
		expositores = JSON.parse(expositores_cache);
		if (expositores.length > 0) {
			ts_expositores = expositores[0].ts;
		}
	}
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_expositores;
	$('#celda-4').attr("class", "nb-celda-activa");
    
	try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/expositores",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
               procesarExpositores(response, expositores, idev, coda, idioma_real);
               var valor = almacenLocalObtenerClave(_nb_clave_app_expositores + idev + "-" + idioma_real);
               if (valor != null) {
                    expositores = JSON.parse(valor);
               expositores[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_expositores + idev + "-" + idioma_real, JSON.stringify(expositores));
               }
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			errorDescarga(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			if (textStatus == "success") {
      				console.log("EXPOSITORES DESCARGADOS");
	      			if (cancelar_descarga)
	      				cancelar_finalizar();
	      			else
	      				leerPonentes(idev, coda, idioma_real);
      			} else {
	      			cancelar_descarga = true;
	      		}
      		}
   		});
    }
    catch (err)
    {
    	errorDescarga(err.message);
    }
}

function procesarExpositores(response, expositores, idev, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			errorDescarga(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				expositores = response;
				almacenLocalGuardarClave(_nb_clave_app_expositores + idev + "-" + idioma_real, JSON.stringify(expositores));
			}
				// Se procesa la información
			var lista_expositores = expositores[1].expositores;
			var contador_expositores = lista_expositores.length - 1;
			
			var codigo = "";
			var array_logos = [];
			
			for (var i=1 ; i<= contador_expositores ; i++) {
				expositor = lista_expositores[i];
				leerExpositor(idev, expositor[0], coda, idioma_real);
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function leerExpositor(idev, idex, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	var expositor_cache = almacenLocalObtenerClave(_nb_clave_app_expositor + idev + "-" + idex + "-" + idioma_real);
	var expositor;
	var ts_expositor = "";
	if (expositor_cache != null) {		
		expositor = JSON.parse(expositor_cache);
		if (expositor.length > 0) {
			ts_expositor = expositor[0].ts;
		}
	}
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&idex=" + idex + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_expositor;
	
	try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/expositor",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
               procesarExpositor(response, expositor, idev, idex, idioma_real);
               var valor = almacenLocalObtenerClave(_nb_clave_app_expositor + idev + "-" + idex + "-" + idioma_real);
               if (valor != null) {
                    expositor = JSON.parse(valor);
               expositor[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_expositor + idev + "-" + idex + "-" + idioma_real, JSON.stringify(expositor));
               }
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			errorDescarga(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) {
      			if (textStatus != "success")
      				cancelar_descarga = true;
      			} 
   		});
    }
    catch (err)
    {
    	errorDescarga(err.message);
    }
}

function procesarExpositor(response, expositor, idev, idex, idioma_real) {
	if (cancelar_descarga)
		return;
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			errorDescarga(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				expositor = response;
				almacenLocalGuardarClave(_nb_clave_app_expositor + idev + "-" + idex + "-" + idioma_real, JSON.stringify(expositor));
			}

				// Datos de la cabecera
			var datos_cabecera = expositor[1].row;
			
			if (datos_cabecera.id_fichero_logo != 0) {
				var logo = {};
				logo.id = datos_cabecera.id_fichero_logo;
				logo.ts = datos_cabecera.ts_expositor_logo;
				cargar_imagen(logo, false, "src", null);
			}
			if (datos_cabecera.id_fichero_plano != 0) {
				var info_plano = {};
				info_plano.id = datos_cabecera.id_fichero_plano;
				info_plano.ts = datos_cabecera.ts_expositor_plano;
				cargar_imagen(info_plano, false, "html", null);
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function leerPonentes(idev, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	var ponentes_cache = almacenLocalObtenerClave(_nb_clave_app_ponentes + idev + "-" + idioma_real);
	var ponentes;
	var ts_ponentes = "";
	if (ponentes_cache != null) {		
		ponentes = JSON.parse(ponentes_cache);
		if (ponentes.length > 0) {
			ts_ponentes = ponentes[0].ts;
		}
	}
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_ponentes;
	$('#celda-5').attr("class", "nb-celda-activa");
    
	try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/ponentes",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
               procesarPonentes(response, ponentes, idev, coda, idioma_real);
               var valor = almacenLocalObtenerClave(_nb_clave_app_ponentes + idev + "-" + idioma_real);
               if (valor != null) {
                    ponentes = JSON.parse(valor);
               ponentes[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_ponentes + idev + "-" + idioma_real, JSON.stringify(ponentes));
               }
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			errorDescarga(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			if (textStatus == "success") {
      				console.log("PONENTES DESCARGADOS");
	      			if (cancelar_descarga)
	      				cancelar_finalizar();
	      			else
	      				leerColaboradores(idev, coda, idioma_real);
      			} else {
	      			cancelar_descarga = true;
	      		}
      		}
   		});
    }
    catch (err)
    {
    	errorDescarga(err.message);
    }
}

function procesarPonentes(response, ponentes, idev, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			errorDescarga(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				ponentes = response;
				almacenLocalGuardarClave(_nb_clave_app_ponentes + idev + "-" + idioma_real, JSON.stringify(ponentes));
			}
				// Se procesa la información
			var lista_ponentes = ponentes[1].ponentes;
			var contador_ponentes = lista_ponentes.length - 1;

			var codigo = "";
			for (var i=1 ; i<= contador_ponentes ; i++) {
				ponente = lista_ponentes[i];
				leerPonente(idev, ponente[0], coda, idioma_real);
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function leerPonente(idev, idpo, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	var ponente_cache = almacenLocalObtenerClave(_nb_clave_app_ponente + idev + "-" + idpo + "-" + idioma_real);
	var ponente;
	var ts_ponente = "";
	if (ponente_cache != null) {		
		ponente = JSON.parse(ponente_cache);
		if (ponente.length > 0) {
			ts_ponente = ponente[0].ts;
		}
	}
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&idpo=" + idpo + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_ponente;
	
	try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/ponente",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
               procesarPonente(response, ponente, idev, idpo, idioma_real);
               var valor = almacenLocalObtenerClave(_nb_clave_app_ponente + idev + "-" + idpo + "-" + idioma_real);
               if (valor != null) {
                    ponente = JSON.parse(valor);
               ponente[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_ponente + idev + "-" + idpo + "-" + idioma_real, JSON.stringify(ponente));
               }
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			errorDescarga(texto_idioma.error_comunicacion);
    			},
			complete: function(jqXHR, textStatus) {
				if (textStatus != "success")
					cancelar_descarga = true;
				} 
   		});
    }
    catch (err)
    {
    	errorDescarga(err.message);
    }
}

function procesarPonente(response, ponente, idev, idpo, idioma_real) {
	if (cancelar_descarga)
		return;
	if (isArray(response) && response.length == 3) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			errorDescarga(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				//mostrarAlerta("OK", "Eventos", "Aceptar");
				ponente = response;
				almacenLocalGuardarClave(_nb_clave_app_ponente + idev + "-" + idpo + "-" + idioma_real, JSON.stringify(ponente));
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function leerColaboradores(idev, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	var colaboradores_cache = almacenLocalObtenerClave(_nb_clave_app_colaboradores + idev + "-" + idioma_real);
	var colaboradores;
	var ts_colaboradores = "";
	if (colaboradores_cache != null) {		
		colaboradores = JSON.parse(colaboradores_cache);
		if (colaboradores.length > 0) {
			ts_colaboradores = colaboradores[0].ts;
		}
	}
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_colaboradores;
	$('#celda-6').attr("class", "nb-celda-activa");
    
	try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/colaboradores",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
               procesarColaboradores(response, colaboradores, idev, idioma_real);
               var valor = almacenLocalObtenerClave(_nb_clave_app_colaboradores + idev + "-" + idioma_real);
               if (valor != null) {
                    colaboradores = JSON.parse(valor);
               colaboradores[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_colaboradores + idev + "-" + idioma_real, JSON.stringify(colaboradores));
               }
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			errorDescarga(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			if (textStatus == "success") {
      				console.log("COLABORADORES DESCARGADOS");
	      			if (cancelar_descarga)
	      				cancelar_finalizar();
	      			else
	      				leerAlojamientos(idev, coda, idioma_real);
      			} else {
	      			cancelar_descarga = true;
	      		}
      		}
   		});
    }
    catch (err)
    {
    	errorDescarga(err.message);
    }
}

function procesarColaboradores(response, colaboradores, idev, idioma_real) {
	if (cancelar_descarga)
		return;
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			errorDescarga(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				colaboradores = response;
				almacenLocalGuardarClave(_nb_clave_app_colaboradores + idev + "-" + idioma_real, JSON.stringify(colaboradores));
			}
				// Se procesa la información
			var lista_colaboradores = colaboradores[1].colaboradores;
			var contador_colaboradores = lista_colaboradores.length - 1;
			var logo = {};
			for (var i=1 ; i<= contador_colaboradores ; i++) {
				colaborador = lista_colaboradores[i];

				if (colaborador[5] != 0) {
					logo.id = colaborador[5];
					logo.ts = colaborador[6];
					cargar_imagen(logo, false, "src", null);
				}
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function leerAlojamientos(idev, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	var alojamientos_cache = almacenLocalObtenerClave(_nb_clave_app_alojamientos + idev + "-" + idioma_real);
	var alojamientos;
	var ts_alojamientos = "";
	if (alojamientos_cache != null) {		
		alojamientos = JSON.parse(alojamientos_cache);
		if (alojamientos.length > 0) {
			ts_alojamientos = alojamientos[0].ts;
		}
	}
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_alojamientos;
	$('#celda-7').attr("class", "nb-celda-activa");
    
	try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/alojamientos",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
               procesarAlojamientos(response, alojamientos, idev, coda, idioma_real);
               var valor = almacenLocalObtenerClave(_nb_clave_app_alojamientos + idev + "-" + idioma_real);
               if (valor != null) {
                    alojamientos = JSON.parse(valor);
               alojamientos[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_alojamientos + idev + "-" + idioma_real, JSON.stringify(alojamientos));
               }
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			errorDescarga(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			if (textStatus == "success") {
      				console.log("ALOJAMIENTOS DESCARGADOS");
	      			if (cancelar_descarga)
	      				cancelar_finalizar();
	      			else
	      				leerEdificios(idev, coda, idioma_real);
      			} else {
	      			cancelar_descarga = true;
	      		}
      		}
   		});
    }
    catch (err)
    {
    	errorDescarga(err.message);
    }
}

function procesarAlojamientos(response, alojamientos, idev, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			errorDescarga(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				alojamientos = response;
				almacenLocalGuardarClave(_nb_clave_app_alojamientos + idev + "-" + idioma_real, JSON.stringify(alojamientos));
			}
				// Se procesa la información
			var lista_alojamientos = alojamientos[1].alojamientos;
			var contador_alojamientos = lista_alojamientos.length - 1;
			
			var alojamiento;
			for (var i=1 ; i<= contador_alojamientos ; i++) {
				alojamiento = lista_alojamientos[i];
				
				leerAlojamiento(idev, alojamiento[0], coda, idioma_real);
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function leerAlojamiento(idev, idal, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	var alojamiento_cache = almacenLocalObtenerClave(_nb_clave_app_alojamiento + idev + "-" + idal + "-" + idioma_real);
	var alojamiento;
	var ts_alojamiento = "";
	if (alojamiento_cache != null) {		
		alojamiento = JSON.parse(alojamiento_cache);
		if (alojamiento.length > 0) {
			ts_alojamiento = alojamiento[0].ts;
		}
	}
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&idal=" + idal + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_alojamiento;
	
	try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/alojamiento",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
               procesarAlojamiento(response, alojamiento, idev, idal, idioma_real);
               var valor = almacenLocalObtenerClave(_nb_clave_app_alojamiento + idev + "-" + idal + "-" + idioma_real);
               if (valor != null) {
                    alojamiento = JSON.parse(valor);
               alojamiento[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_alojamiento + idev + "-" + idal + "-" + idioma_real, JSON.stringify(alojamiento));
               }
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			errorDescarga(texto_idioma.error_comunicacion);
    			},
			complete: function(jqXHR, textStatus) {
				if (textStatus != "success")
					cancelar_descarga = true;
			}
   		});
    }
    catch (err)
    {
    	errorDescarga(err.message);
    }
}

function procesarAlojamiento(response, alojamiento, idev, idal, idioma_real) {
	if (cancelar_descarga)
		return;
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			errorDescarga(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				alojamiento = response;
				almacenLocalGuardarClave(_nb_clave_app_alojamiento + idev + "-" + idal + "-" + idioma_real, JSON.stringify(alojamiento));
			}
				// Datos de la cabecera
			var datos_cabecera = alojamiento[1].row;

			if (datos_cabecera.id_fichero_mapa != 0) {
				var info_mapa = {};
				info_mapa.id = datos_cabecera.id_fichero_mapa;
				info_mapa.ts = datos_cabecera.ts_alojamiento_mapa;
				cargar_imagen(info_mapa, false, "html", null);
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function leerEdificios(idev, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	var edificios_cache = almacenLocalObtenerClave(_nb_clave_app_edificios + idev + "-" + idioma_real);
	var edificios;
	var ts_edificios = "";
	if (edificios_cache != null) {		
		edificios = JSON.parse(edificios_cache);
		if (edificios.length > 0) {
			ts_edificios = edificios[0].ts;
		}
	}
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_edificios;
	$('#celda-8').attr("class", "nb-celda-activa");
    
	try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/edificios",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
               procesarEdificios(response, edificios, idev, coda, idioma_real);
               var valor = almacenLocalObtenerClave(_nb_clave_app_edificios + idev + "-" + idioma_real);
               if (valor != null) {
                    edificios = JSON.parse(valor);
               edificios[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_edificios + idev + "-" + idioma_real, JSON.stringify(edificios));
               }
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			errorDescarga(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			if (textStatus == "success") {
      				console.log("EDIFICIOS DESCARGADOS");
	      			if (cancelar_descarga)
	      				cancelar_finalizar();
	      			else
	      				leerServicios(idev, coda, idioma_real);
      			} else {
	      			cancelar_descarga = true;
	      		}
      		}
   		});
    }
    catch (err)
    {
    	errorDescarga(err.message);
    }
}

function procesarEdificios(response, edificios, idev, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			errorDescarga(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				edificios = response;
				almacenLocalGuardarClave(_nb_clave_app_edificios + idev + "-" + idioma_real, JSON.stringify(edificios));
			}
				// Se procesa la información
			var lista_edificios = edificios[1].edificios;
			var contador_edificios = lista_edificios.length - 1;
			
			var edificio;
			for (var i=1 ; i<= contador_edificios ; i++) {
				edificio = lista_edificios[i];
				leerEdificio(idev, edificio[0], coda, idioma_real);
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function leerEdificio(idev, ided, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	var edificio_cache = almacenLocalObtenerClave(_nb_clave_app_edificio + idev + "-" + ided + "-" + idioma_real);
	var edificio;
	var ts_edificio = "";
	if (edificio_cache != null) {		
		edificio = JSON.parse(edificio_cache);
		if (edificio.length > 0) {
			ts_edificio = edificio[0].ts;
		}
	}
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&ided=" + ided + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_edificio;
	
	try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/edificio",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
               procesarEdificio(response, edificio, idev, ided, idioma_real);
               var valor = almacenLocalObtenerClave(_nb_clave_app_edificio + idev + "-" + ided + "-" + idioma_real);
               if (valor != null) {
                    edificio = JSON.parse(valor);
               edificio[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_edificio + idev + "-" + ided + "-" + idioma_real, JSON.stringify(edificio));
               }
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			errorDescarga(texto_idioma.error_comunicacion);
    			},
			complete: function(jqXHR, textStatus) {
				if (textStatus != "success")
					cancelar_descarga = true;
				}
   		});
    }
    catch (err)
    {
    	errorDescarga(err.message);
    }
}

function procesarEdificio(response, edificio, idev, ided, idioma_real) {
	if (cancelar_descarga)
		return;
	if (isArray(response) && response.length == 3) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			errorDescarga(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				edificio = response;
				almacenLocalGuardarClave(_nb_clave_app_edificio + idev + "-" + ided + "-" + idioma_real, JSON.stringify(edificio));
			}
				// Datos de la cabecera
			var datos_cabecera = edificio[1].row;

			if (datos_cabecera.id_fichero_plano != 0) {
				var info_plano = {};
				info_plano.id = datos_cabecera.id_fichero_plano;
				info_plano.ts = datos_cabecera.ts_edificio_plano;
				cargar_imagen(info_plano, false, "html", null);
			}

				// Recursos
			var datos_recursos = edificio[2].recursos;
			var contador_recursos = datos_recursos.length - 1;
			
			var recurso;
			if (contador_recursos > 0) {
				var info_plano = {};
				for (var i=1 ; i<= contador_recursos ; i++) {
					recurso = datos_recursos[i];
					if (recurso[3] != 0) {
						info_plano.id = recurso[3];
						info_plano.ts = recurso[4];
						cargar_imagen(info_plano, false, "html", null);
					}
				}
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function leerServicios(idev, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	var servicios_cache = almacenLocalObtenerClave(_nb_clave_app_servicios + idev + "-" + idioma_real);
	var servicios;
	var ts_servicios = "";
	if (servicios_cache != null) {		
		servicios = JSON.parse(servicios_cache);
		if (servicios.length > 0) {
			ts_servicios = servicios[0].ts;
		}
	}
	 
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_servicios;
	$('#celda-9').attr("class", "nb-celda-activa");
    
	try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/servicios",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
               procesarServicios(response, servicios, idev, idioma_real);
               var valor = almacenLocalObtenerClave(_nb_clave_app_servicios + idev + "-" + idioma_real);
               if (valor != null) {
                    servicios = JSON.parse(valor);
               servicios[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_servicios + idev + "-" + idioma_real, JSON.stringify(servicios));
               }
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			errorDescarga(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			if (textStatus == "success") {
      				console.log("SERVICIOS DESCARGADOS");
	      			if (cancelar_descarga)
	      				cancelar_finalizar();
	      			else
	      				leerNotasPrensa(idev, coda, idioma_real);
      			} else {
	      			cancelar_descarga = true;
	      		}
      		}
   		});
    }
    catch (err)
    {
    	errorDescarga(err.message);
    }
}

function procesarServicios(response, servicios, idev, idioma_real) {
	if (cancelar_descarga)
		return;
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			errorDescarga(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				servicios = response;
				almacenLocalGuardarClave(_nb_clave_app_servicios + idev + "-" + idioma_real, JSON.stringify(servicios));
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function leerNotasPrensa(idev, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	var notas_prensa_cache = almacenLocalObtenerClave(_nb_clave_app_notas_prensa + idev + "-" + idioma_real);
	var notas_prensa;
	var ts_notas_prensa = "";
	if (notas_prensa_cache != null) {		
		notas_prensa = JSON.parse(notas_prensa_cache);
		if (notas_prensa.length > 0) {
			ts_notas_prensa = notas_prensa[0].ts;
		}
	}
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_notas_prensa;
	$('#celda-10').attr("class", "nb-celda-activa");
    
	try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/notas_prensa",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
               procesarNotasPrensa(response, notas_prensa, idev, coda, idioma_real);
               var valor = almacenLocalObtenerClave(_nb_clave_app_notas_prensa + idev + "-" + idioma_real);
               if (valor != null) {
                    notas_prensa = JSON.parse(valor);
               notas_prensa[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_notas_prensa + idev + "-" + idioma_real, JSON.stringify(notas_prensa));
               }
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			errorDescarga(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			if (textStatus == "success") {
      				console.log("NOTAS DE PRENSA DESCARGADAS");
	      			if (cancelar_descarga)
	      				cancelar_finalizar();
	      			else
	      				leerAvisos(idev, coda, idioma_real);
      			} else {
	      			cancelar_descarga = true;
	      		}
      		}
   		});
    }
    catch (err)
    {
    	errorDescarga(err.message);
    }
}

function procesarNotasPrensa(response, notas_prensa, idev, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			errorDescarga(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				notas_prensa = response;
				almacenLocalGuardarClave(_nb_clave_app_notas_prensa + idev + "-" + idioma_real, JSON.stringify(notas_prensa));
			}
				// Se procesa la información
			var lista_notas_prensa = notas_prensa[1].notas_prensa;
			var contador_notas_prensa = lista_notas_prensa.length - 1;
			
			for (var i=1 ; i<= contador_notas_prensa ; i++) {
				nota_prensa = lista_notas_prensa[i];
				leerNotaPrensa(idev, nota_prensa[0], coda, idioma_real);
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function leerNotaPrensa(idev, idnp, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	var nota_prensa_cache = almacenLocalObtenerClave(_nb_clave_app_nota_prensa + idev + "-" + idnp + "-" + idioma_real);
	var nota_prensa;
	var ts_nota_prensa = "";
	if (nota_prensa_cache != null) {		
		nota_prensa = JSON.parse(nota_prensa_cache);
		if (nota_prensa.length > 0) {
			ts_nota_prensa = nota_prensa[0].ts;
		}
	}
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&idnp=" + idnp + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_nota_prensa;
	
	try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/nota_prensa",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
               procesarNotaPrensa(response, nota_prensa, idev, idnp, idioma_real);
               var valor = almacenLocalObtenerClave(_nb_clave_app_nota_prensa + idev + "-" + idnp + "-" + idioma_real);
               if (valor != null) {
                    nota_prensa = JSON.parse(valor);
               nota_prensa[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_nota_prensa + idev + "-" + idnp + "-" + idioma_real, JSON.stringify(nota_prensa));
               }
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			errorDescarga(texto_idioma.error_comunicacion);
    			},
			complete: function(jqXHR, textStatus) {
				if (textStatus != "success")
					cancelar_descarga = true;
				} 
   		});
    }
    catch (err)
    {
    	errorDescarga(err.message);
    }
}

function procesarNotaPrensa(response, nota_prensa, idev, idnp, idioma_real) {
	if (cancelar_descarga)
		return;
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			errorDescarga(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				nota_prensa = response;
				almacenLocalGuardarClave(_nb_clave_app_nota_prensa + idev + "-" + idnp + "-" + idioma_real, JSON.stringify(nota_prensa));
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function leerAvisos(idev, coda, idioma_real) {
	if (cancelar_descarga)
		return;
	var avisos_cache = almacenLocalObtenerClave(_nb_clave_app_avisos + idev + "-" + idioma_real);
	var avisos;
	var ts_avisos = "";
	if (avisos_cache != null) {		
		avisos = JSON.parse(avisos_cache);
		if (avisos.length > 0) {
			ts_avisos = avisos[0].ts;
		}
	}
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_avisos;
	$('#celda-11').attr("class", "nb-celda-activa");
    
	try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/avisos",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
               procesarAvisos(response, avisos, idev, idioma_real);
               var valor = almacenLocalObtenerClave(_nb_clave_app_avisos + idev + "-" + idioma_real);
               if (valor != null) {
                    avisos = JSON.parse(valor);
               avisos[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_avisos + idev + "-" + idioma_real, JSON.stringify(avisos));
               }
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			errorDescarga(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			if (textStatus == "success") {
      				console.log("AVISOS DESCARGADOS");
	      			if (cancelar_descarga)
	      				cancelar_finalizar();
	      			else
	      				leerMenuInicio(idev, coda, idioma_real);
      			} else {
	      			cancelar_descarga = true;
	      		}
      		}
   		});
    }
    catch (err)
    {
    	errorDescarga(err.message);
    }
}

function procesarAvisos(response, avisos, idev, idioma_real) {
	if (cancelar_descarga)
		return;
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			errorDescarga(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				avisos = response;
				almacenLocalGuardarClave(_nb_clave_app_avisos + idev + "-" + idioma_real, JSON.stringify(avisos));
				//console.log(avisos[0].ts);
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function leerMenuInicio(idev, coda, idioma_real) {
	var menu_inicio_cache = almacenLocalObtenerClave(_nb_clave_app_menu_inicio + idev + "-" + idioma_real);
	var menu_inicio = null;
	var ts_inicio = "";
	if (menu_inicio_cache != null) {		
		menu_inicio = JSON.parse(menu_inicio_cache);
		if (menu_inicio.length > 0) {
			ts_inicio = menu_inicio[0].ts;
		}
	}
	var ts_leer_notas_prensa = almacenLocalObtenerClave(_nb_clave_app_ts_leer_notas_prensa + idev) || "";
    var ts_leer_avisos = almacenLocalObtenerClave(_nb_clave_app_ts_leer_avisos + idev) || "";

    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&tsnp=" + ts_leer_notas_prensa + "&tsa=" + ts_leer_avisos + "&ts=" + ts_inicio;
	$('#celda-12').attr("class", "nb-celda-activa");
    
	try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/menu",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			procesarMenuInicio(response, menu_inicio, idev, idioma_real);
                var valor = almacenLocalObtenerClave(_nb_clave_app_menu_inicio + idev + "-" + idioma_real);
                if (valor != null) {
                    menu_inicio = JSON.parse(valor);
                menu_inicio[0].ts_limite = segundosDesde1970() + segundos_cache;
                almacenLocalGuardarClave(_nb_clave_app_menu_inicio + idev + "-" + idioma_real, JSON.stringify(menu_inicio));
                }
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			errorDescarga(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) {
                    if (textStatus == "success") {
                        console.log("MENU DESCARGADO");
                        mostrarAlerta(texto_idioma.alerta_mensaje_descargado, texto_idioma.alerta_titulo, texto_idioma.alerta_boton);
                        $('#descargar').css("display", "block");
                        $('#descargando').css("display", "none");
                    } else {
                        cancelar_descarga = true;
                    }
      			} 
   		});
    }
    catch (err)
    {
		errorDescarga(err.message);
    }
}

function procesarMenuInicio(response, menu_inicio, idev, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			mostrarPanelError(objResultado.error);
			return;
            }
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				menu_inicio = response;
                almacenLocalGuardarClave(_nb_clave_app_menu_inicio + idev + "-" + idioma_real, JSON.stringify(menu_inicio));
				//console.log(menu_inicio[0].ts);
			}
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}


function errorDescarga(mensaje) {
	cancelar_descarga= true;
	$('#cancelando').css("display", "none");
	$('#descargar').css("display", "block");
	$('#descargando').css("display", "none");
	
	$('#descargar_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(mensaje);
}

function errorEnDatos() {
	errorDescarga(texto_idioma.error_info_menu);
}


﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la lista de avisos.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Avisos",
		"expandir_todos" : "Expandir todos",
		"contraer_todos" : "Contraer todos",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the list of notices.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Notices",
		"expandir_todos" : "Expand all",
		"contraer_todos" : "Collapse all",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	mostrarAvisos();
}

function mostrarAvisos() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}

	recogerAvisos();
}

function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo + "</center>");
	$('#expandir_todos .ui-btn-text').text(texto_idioma.expandir_todos);
	$('#contraer_todos .ui-btn-text').text(texto_idioma.contraer_todos);
}

function recogerAvisos() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerAvisos();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerAvisos() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var avisos_cache = almacenLocalObtenerClave(_nb_clave_app_avisos + idev + "-" + idioma_real);
	var avisos;
	var ts_avisos = "";
	if (avisos_cache != null) {		
		avisos = JSON.parse(avisos_cache);
		if (avisos.length > 0) {
			ts_avisos = avisos[0].ts;
		}
	}
	if (avisos != null) {
        //console.log("avisos = " + JSON.stringify(avisos));
        if (avisos[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            avisos[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarAvisos(avisos, avisos, idev, idioma_real);
            return;
        }
    }
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_avisos;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/avisos",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
   				procesarAvisos(response, avisos, idev, idioma_real);
               avisos = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_avisos + idev + "-" + idioma_real));
               avisos[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_avisos + idev + "-" + idioma_real, JSON.stringify(avisos));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarAvisos(response, avisos, idev, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		//console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			mostrarPanelError(objResultado.error);
			return;
            }
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				avisos = response;
				almacenLocalGuardarClave(_nb_clave_app_avisos + idev + "-" + idioma_real, JSON.stringify(avisos));
				//console.log(avisos[0].ts);
			}
			else {
				console.log("Información de avisos en CACHE");
			}

			almacenLocalGuardarClave(_nb_clave_app_ts_leer_avisos + idev, avisos[0].ts);

				// Se procesa la información
			var nom_evento = avisos[0].nom_evento;
			$('#nombreEvento').html("<center>" + nom_evento + "</center>");
			var lista_avisos = avisos[1].avisos;
			var contador_avisos = lista_avisos.length - 1;
			//console.log(contador_avisos);
			
			var codigo = "";
			for (var i=1 ; i<= contador_avisos ; i++) {
				aviso = lista_avisos[i];
				//console.log(aviso);
				
				codigo += "<div data-role='collapsible' data-theme='b' data-content-theme='b'>";
				codigo += "<h4>" + aviso[1] + "<br />" + aviso[2] + "</h4>";
				codigo += "<p>" + aviso[3].replace(/\r\n/g, "<br />") + "</p></div>";
			}
			
			//console.log(codigo);
			
			$("#avisos_contenido").html(codigo);
			$('#avisos_contenido').find('div[data-role=collapsible]').collapsible();
			$("#avisos_contenido").trigger("create");
			$("#avisos_contenido").css("display", "block");
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function todos(abrir) {
	if (abrir)
		$('#avisos_contenido').find('div[data-role=collapsible]').trigger('expand');
	else
		$('#avisos_contenido').find('div[data-role=collapsible]').trigger('collapse');
}

function errorEnDatos() {
	$('#avisos_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info_menu);
}












﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

/*
document.addEventListener('resume', function(event){
	console.log("RESUME menu-evento.js");
	recogerEvento();
}, false);
*/

function onDeviceReady() {
	obtenerParametrosURL();
	
    //var wh = $(window).height();
    //var ww = $(window).width();
    //console.log("HEIGHT = " + wh + ", WIDTH = " + ww);
	
	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"boton_eventos" : "Eventos",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la información del evento.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info_menu" : "Error en la información del menú.",
		"menu_informacion" : "Información",
		"menu_agenda" : "Programa",
		"menu_planos" : "Mapas",
		"menu_expositores" : "Expositores",
		"menu_ponentes" : "Ponentes",
		"menu_colaboradores" : "Colaboradores",
		"menu_listas_datos" : "Flash-Posters",
		"menu_alojamiento" : "Alojamiento",
		"menu_edificios" : "Edificios",
		"menu_servicios" : "Servicios",
		"menu_notas_prensa" : "Notas prensa",
		"menu_avisos" : "Avisos",
		"menu_download" : "Descargar",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
                
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"boton_eventos" : "Events",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the event's information.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info_menu" : "Error in menu information.",
		"menu_informacion" : "Information",
		"menu_agenda" : "Program",
		"menu_planos" : "Maps",
		"menu_expositores" : "Exhibitors",
		"menu_ponentes" : "Speakers",
		"menu_colaboradores" : "Sponsors",
		"menu_listas_datos" : "Flash-Posters",
		"menu_alojamiento" : "Accommodation",
		"menu_edificios" : "Buildings",
		"menu_servicios" : "Services",
		"menu_notas_prensa" : "Press releases",
		"menu_avisos" : "Notices",
		"menu_download" : "Download",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	//recogerEvento();
}

function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#boton_eventos .ui-btn-text').text(texto_idioma.boton_eventos);
    
    recogerEvento();
}


function recogerEvento() {
	if (existeConexion()) {
		//$("#menuEventoPage").find("#recargar").css("display", "none");
		$("#recargar").css("display", "none");
		leerEvento();
	}
	else {
		//$("#menuEventoPage").find("#recargar").css("display", "block");
        //$("#menuEventoPage").find("#panelErrorContenido").html(texto_idioma.error_sin_conexion);
        //$("#menuEventoPage").find("#panelError").panel("open");
        $("#recargar").css("display", "block");
        $("#panelErrorContenido").html(texto_idioma.error_sin_conexion);
        $("#panelError").panel("open");
	}
}

/*

function mostrarPanelError_Local(contenido) {
    $("#menuEventoPage").find("#recargar").css("display", "block");
    $("#menuEventoPage").find("#panelErrorContenido").html(contenido);
	$("#menuEventoPage").find("#panelError").panel("open");
}
*/

function leerEvento() {
	var idev = "0";
	
	if (!urlParams.hasOwnProperty("idev")) {
		idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
		if (idev == null) {
			//mostrarPanelError_Local("Falta parámetro");
			mostrarPanelError("Falta parámetro");
			return;
		}
	} else {
		idev = urlParams.idev;
		almacenLocalGuardarClave(_nb_clave_app_id_evento, idev);
        $('#boton_config').attr('href', 'configurar.html?idev=' + idev);
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    var ts_leer_notas_prensa = almacenLocalObtenerClave(_nb_clave_app_ts_leer_notas_prensa + idev) || "";
    var ts_leer_avisos = almacenLocalObtenerClave(_nb_clave_app_ts_leer_avisos + idev) || "";

	var menu_inicio_cache = almacenLocalObtenerClave(_nb_clave_app_menu_inicio + idev + "-" + idioma_real);
	var menu_inicio = null;
	var ts_inicio = "";
	if (menu_inicio_cache != null) {		
		menu_inicio = JSON.parse(menu_inicio_cache);
		if (menu_inicio.length > 0) {
			ts_inicio = menu_inicio[0].ts;
		}
	}
    if (menu_inicio != null) {
        //console.log("menu_inicio = " + JSON.stringify(menu_inicio));
        if (menu_inicio[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            menu_inicio[0].nuevo = false;
            console.log("(Se recoge de CACHE por TIEMPO)");
            procesarMenuInicio(menu_inicio, menu_inicio, idev, idioma_real);
            return;
        }
    }
    
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&tsnp=" + ts_leer_notas_prensa + "&tsa=" + ts_leer_avisos + "&ts=" + ts_inicio;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/menu",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
   				procesarMenuInicio(response, menu_inicio, idev, idioma_real);
                menu_inicio = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_menu_inicio + idev + "-" + idioma_real));
                menu_inicio[0].ts_limite = segundosDesde1970() + segundos_cache;
                almacenLocalGuardarClave(_nb_clave_app_menu_inicio + idev + "-" + idioma_real, JSON.stringify(menu_inicio));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			//mostrarPanelError_Local(texto_idioma.error_comunicacion);
    			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		//mostrarPanelError_Local(err.message);
        mostrarPanelError(err.message);
    }
}

function procesarMenuInicio(response, menu_inicio, idev, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		console.log("Resultado = " + JSON.stringify(objResultado));

		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
                mostrarPanelError(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				//mostrarAlerta("OK", "Eventos", "Aceptar");
				menu_inicio = response;
                almacenLocalGuardarClave(_nb_clave_app_menu_inicio + idev + "-" + idioma_real, JSON.stringify(menu_inicio));
				//console.log(menu_inicio[0].ts);
			}
			else {
				console.log("(Menú de inicio en CACHE válido)");
			}
				// Se procesa el menú
			var objMenu = menu_inicio[1].row;
			
			var menu_horiz = "";
			var menu_vert = "";
			var contador = 0;
			var limite_horiz = 6;
			var limite_vert = 3;
			
			menu_vert += "<tr>";
			menu_vert += genOpcionMenu('info-evento.html', 'imgv-1', 'images/01-informacion.png', texto_idioma.menu_informacion);
			
			menu_horiz += "<tr>";
			menu_horiz += genOpcionMenu('info-evento.html', 'imgh-1', 'images/01-informacion.png', texto_idioma.menu_informacion);
			
			++contador;
			
			if (objMenu.actividades == "S") {
				if ((contador % limite_vert) == 0) {
					menu_vert += "</tr><tr>";
				}
				menu_vert += genOpcionMenu('agenda.html', 'imgv-2', 'images/02-agenda.png', texto_idioma.menu_agenda);
				
				if ((contador % limite_horiz) == 0) {
					menu_horiz += "</tr><tr>";
				}
				menu_horiz += genOpcionMenu('agenda.html', 'imgh-2', 'images/02-agenda.png', texto_idioma.menu_agenda);

				++contador;
			}

			if (objMenu.listas_datos == "S") {
				if ((contador % limite_vert) == 0) {
					menu_vert += "</tr><tr>";
				}
				menu_vert += genOpcionMenu('listas-datos.html', 'imgv-4', 'images/04-flash-poster.png', texto_idioma.menu_listas_datos);
				
				if ((contador % limite_horiz) == 0) {
					menu_horiz += "</tr><tr>";
				}
				menu_horiz += genOpcionMenu('listas-datos.html', 'imgh-4', 'images/04-flash-poster.png', texto_idioma.menu_listas_datos);

				++contador;
			}
			
			if (objMenu.planos == "S") {
				if ((contador % limite_vert) == 0) {
					menu_vert += "</tr><tr>";
				}
				menu_vert += genOpcionMenu('planos.html', 'imgv-3', 'images/03-planos.png', texto_idioma.menu_planos);
				
				if ((contador % limite_horiz) == 0) {
					menu_horiz += "</tr><tr>";
				}
				menu_horiz += genOpcionMenu('planos.html', 'imgh-3', 'images/03-planos.png', texto_idioma.menu_planos);

				++contador;
			}
/*		
			if (objMenu.expositores == "S") {
				if ((contador % limite_vert) == 0) {
					menu_vert += "</tr><tr>";
				}
				menu_vert += genOpcionMenu('expositores.html', 'imgv-4', 'images/04-expositores.png', texto_idioma.menu_expositores);
				
				if ((contador % limite_horiz) == 0) {
					menu_horiz += "</tr><tr>";
				}
				menu_horiz += genOpcionMenu('expositores.html', 'imgh-4', 'images/04-expositores.png', texto_idioma.menu_expositores);

				++contador;
			}
*/			

			if (objMenu.ponentes == "S") {
				if ((contador % limite_vert) == 0) {
					menu_vert += "</tr><tr>";
				}
				menu_vert += genOpcionMenu('ponentes.html', 'imgv-5', 'images/05-ponentes.png', texto_idioma.menu_ponentes);
				
				if ((contador % limite_horiz) == 0) {
					menu_horiz += "</tr><tr>";
				}
				menu_horiz += genOpcionMenu('ponentes.html', 'imgh-5', 'images/05-ponentes.png', texto_idioma.menu_ponentes);

				++contador;
			}
		
			if (objMenu.colaboradores == "S") {
				if ((contador % limite_vert) == 0) {
					menu_vert += "</tr><tr>";
				}
				menu_vert += genOpcionMenu('colaboradores.html', 'imgv-6', 'images/06-colaboradores.png', texto_idioma.menu_colaboradores);
				
				if ((contador % limite_horiz) == 0) {
					menu_horiz += "</tr><tr>";
				}
				menu_horiz += genOpcionMenu('colaboradores.html', 'imgh-6', 'images/06-colaboradores.png', texto_idioma.menu_colaboradores);

				++contador;
			}

			if (objMenu.alojamientos == "S") {
				if ((contador % limite_vert) == 0) {
					menu_vert += "</tr><tr>";
				}
				menu_vert += genOpcionMenu('alojamientos.html', 'imgv-7', 'images/07-alojamiento.png', texto_idioma.menu_alojamiento);
				
				if ((contador % limite_horiz) == 0) {
					menu_horiz += "</tr><tr>";
				}
				menu_horiz += genOpcionMenu('alojamientos.html', 'imgh-7', 'images/07-alojamiento.png', texto_idioma.menu_alojamiento);

				++contador;
			}

			if (objMenu.edificios == "S") {
				if ((contador % limite_vert) == 0) {
					menu_vert += "</tr><tr>";
				}
				menu_vert += genOpcionMenu('edificios.html', 'imgv-8', 'images/08-edificios.png', texto_idioma.menu_edificios);
				
				if ((contador % limite_horiz) == 0) {
					menu_horiz += "</tr><tr>";
				}
				menu_horiz += genOpcionMenu('edificios.html', 'imgh-8', 'images/08-edificios.png', texto_idioma.menu_edificios);

				++contador;
			}

			if (objMenu.servicios == "S") {
				if ((contador % limite_vert) == 0) {
					menu_vert += "</tr><tr>";
				}
				menu_vert += genOpcionMenu('servicios.html', 'imgv-9', 'images/09-servicios.png', texto_idioma.menu_servicios);
				
				if ((contador % limite_horiz) == 0) {
					menu_horiz += "</tr><tr>";
				}
				menu_horiz += genOpcionMenu('servicios.html', 'imgh-9', 'images/09-servicios.png', texto_idioma.menu_servicios);

				++contador;
			}

			var ts_leer_notas_prensa = almacenLocalObtenerClave(_nb_clave_app_ts_leer_notas_prensa + idev) || "";
		    var ts_leer_avisos = almacenLocalObtenerClave(_nb_clave_app_ts_leer_avisos + idev) || "";

			if (objMenu.notas_prensa == "S") {
				if ((contador % limite_vert) == 0) {
					menu_vert += "</tr><tr>";
				}
				console.log("ts_leer_notas_prensa: " + ts_leer_notas_prensa);
				console.log("objMenu.ts_notas_prensa: " + objMenu.ts_notas_prensa);
				if (objMenu.num_notas_prensa_nuevas == 0 || (ts_leer_notas_prensa != "" && ts_leer_notas_prensa >= objMenu.ts_notas_prensa))
					menu_vert += genOpcionMenu('notas_prensa.html', 'imgv-10', 'images/10-notas-prensa.png', texto_idioma.menu_notas_prensa);
				else
					menu_vert += genOpcionMenuNumero('notas_prensa.html', 'imgv-10', 'images/10-notas-prensa.png', texto_idioma.menu_notas_prensa, objMenu.num_notas_prensa_nuevas);
				
				if ((contador % limite_horiz) == 0) {
					menu_horiz += "</tr><tr>";
				}
				if (objMenu.num_notas_prensa_nuevas == 0 || (ts_leer_notas_prensa != "" && ts_leer_notas_prensa >= objMenu.ts_notas_prensa))
					menu_horiz += genOpcionMenu('notas_prensa.html', 'imgh-10', 'images/10-notas-prensa.png', texto_idioma.menu_notas_prensa);
				else
					menu_horiz += genOpcionMenuNumero('notas_prensa.html', 'imgh-10', 'images/10-notas-prensa.png', texto_idioma.menu_notas_prensa, objMenu.num_notas_prensa_nuevas);

				++contador;
			}
			
			if (objMenu.avisos == "S") {
				if ((contador % limite_vert) == 0) {
					menu_vert += "</tr><tr>";
				}
				console.log("ts_leer_avisos: " + ts_leer_avisos);
				console.log("objMenu.ts_avisos: " + objMenu.ts_avisos);
				if (objMenu.num_avisos_nuevos == 0 || (ts_leer_avisos != "" && ts_leer_avisos >= objMenu.ts_avisos))
					menu_vert += genOpcionMenu('avisos.html', 'imgv-11', 'images/11-avisos.png', texto_idioma.menu_avisos);
				else
					menu_vert += genOpcionMenuNumero('avisos.html', 'imgv-11', 'images/11-avisos.png', texto_idioma.menu_avisos, objMenu.num_avisos_nuevos);
				
				if ((contador % limite_horiz) == 0) {
					menu_horiz += "</tr><tr>";
				}
				if (objMenu.num_avisos_nuevos == 0 || (ts_leer_avisos != "" && ts_leer_avisos >= objMenu.ts_avisos))
					menu_horiz += genOpcionMenu('avisos.html', 'imgv-11', 'images/11-avisos.png', texto_idioma.menu_avisos);
				else
					menu_horiz += genOpcionMenuNumero('avisos.html', 'imgv-11', 'images/11-avisos.png', texto_idioma.menu_avisos, objMenu.num_avisos_nuevos);
				
				++contador;
			}
			
			if ((contador % limite_vert) == 0) {
				menu_vert += "</tr><tr>";
			}
			menu_vert += genOpcionMenu('descargar-evento.html', 'imgv-12', 'images/12-download.png', texto_idioma.menu_download);
			
			if ((contador % limite_horiz) == 0) {
				menu_horiz += "</tr><tr>";
			}
			menu_horiz += genOpcionMenu('descargar-evento.html', 'imgh-12', 'images/12-download.png', texto_idioma.menu_download);

			++contador;
			
			var contador_vert = contador;
			var contador_horiz = contador;
			
			while ((contador_vert % limite_vert) > 0) {
				menu_vert += "<td>&nbsp;</td>";
				++contador_vert
			}
			menu_vert += "</tr>";
			
			while ((contador_horiz % limite_horiz) > 0) {
				menu_horiz += "<td>&nbsp;</td>";
				++contador_horiz
			}
			menu_horiz += "</tr>";
			
			$('#nombreEvento').html("<center>" + objMenu.nom_evento + "</center>");
			
			$('#nb-menu-vertical').html(menu_vert);
			$('#nb-menu-horizontal').html(menu_horiz);
			
			//$('#nb-contenido').trigger('create');
			
			//console.log($('#nb-contenido').html());

			$('#menu_evento').css("display", "block");
			
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function genOpcionMenu(enlace, num_imagen, imagen, texto) {
	return "<td align='center'><a href='" + enlace + "' data-ajax='false'><img id='" + num_imagen + "' class='nb-img-menu' src='" + imagen + "' /></a><br />" + texto + "</td>";	
}


function genOpcionMenuNumero(enlace, num_imagen, imagen, texto, numero) {
	return "<td align='center'><div style='position:relative;'><div class='nb-numero-menu'>" + numero + "</div><a href='" + enlace + "' data-ajax='false'><img id='" + num_imagen + "' class='nb-img-menu' src='" + imagen + "' /></a><br />" + texto + "</div></td>";
}

function errorEnDatos() {
	$('#menu_evento').css("display", "none");
	//mostrarPanelError_Local(texto_idioma.error_info_menu);
    mostrarPanelError(texto_idioma.error_info_menu);
}




﻿/*! netBytes software - menu.js */

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {

	texto_es = {
		"boton_recargar" : "Recargar",
		"boton_cerrar" : "Cerrar",
		"error_sin_conexion" : "<p>No existe conexión a internet.</p><p>Es necesaria una conexión a internet para recoger la lista de colaboradores.</p>",
		"error_comunicacion" : "<p>Error de comunicación.</p><p>Compruebe que dispone de conexión a internet y que funciona correctamente.</p>",
		"error_info" : "Error en la información.",
		"titulo" : "Colaboradores",
		"sitio_web" : "Sitio web",
        "sin_datos_titulo" : "Alerta",
        "sin_datos_texto" : "Sin datos. Es posible que el evento ya no esté disponible",
        "sin_datos_boton" : "Aceptar"
	};

	texto_en = {
		"boton_recargar" : "Reload",
		"boton_cerrar" : "Close",
		"error_sin_conexion" : "<p>Internet connection not available.</p><p>An internet connection is necessary in order to gather the list of sponsors.</p>",
		"error_comunicacion" : "<p>Communication error.</p><p>Check whether there is an internet connection and works correctly.</p>",
		"error_info" : "Error in information.",
		"titulo" : "Sponsors",
		"sitio_web" : "Website",
        "sin_datos_titulo" : "Alert",
        "sin_datos_texto" : "No data. There is a possibility that the event is not be available anymore.",
        "sin_datos_boton" : "OK"
	};

	texto_idioma = texto_es;

	seleccionarIdioma(escribirTextoIdiomas);
	
	mostrarColaboradores();
}

function mostrarColaboradores() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}

	recogerColaboradores();
}

function escribirTextoIdiomas() {
	$('#boton_recargar .ui-btn-text').text(texto_idioma.boton_recargar);
	$('#boton_cerrar .ui-btn-text').text(texto_idioma.boton_cerrar);
	$('#titulo_contenido').html("<center>" + texto_idioma.titulo + "</center>");
}

function recogerColaboradores() {
	if (existeConexion()) {
		$('#recargar').css("display", "none");
		leerColaboradores();
	}
	else {
		$('#recargar').css("display", "block");
		mostrarPanelError(texto_idioma.error_sin_conexion);
	}
}

function leerColaboradores() {
	var idev = "0";
	
	idev = almacenLocalObtenerClave(_nb_clave_app_id_evento);
	if (idev == null) {
		mostrarPanelError("Falta parámetro");
		return;
	}
	
	var coda = almacenLocalObtenerClave(_nb_clave_app_codigo_autorizacion) || "";
    var idioma_real = almacenLocalObtenerClave(_nb_clave_app_idioma_real);
    
	var colaboradores_cache = almacenLocalObtenerClave(_nb_clave_app_colaboradores + idev + "-" + idioma_real);
	var colaboradores;
	var ts_colaboradores = "";
	if (colaboradores_cache != null) {		
		colaboradores = JSON.parse(colaboradores_cache);
		if (colaboradores.length > 0) {
			ts_colaboradores = colaboradores[0].ts;
		}
	}
	if (colaboradores != null) {
        //console.log("colaboradores = " + JSON.stringify(colaboradores));
        if (colaboradores[0].ts_limite >= segundosDesde1970()) {   // No ha pasado el tiempo en cache
            colaboradores[0].nuevo = false;
            console.log("MENOS DE UN MINUTO");
            procesarColaboradores(colaboradores, colaboradores, idev, idioma_real);
            return;
        }
    }
	
    var postString = "idemp=" + _nb_id_empresa + "&idev=" + idev + "&coda=" + coda + "&ln=" + idioma_real + "&ts=" + ts_colaboradores;
	console.log("postString = " + postString);
	
	$.mobile.showPageLoadingMsg();
    try
    {
		$.ajax({ 
      		url: "http://resteventos.netbyt.es/evento.aspx/colaboradores",
      		type: 'POST',
      		data: postString,
      		dataType: "jsonp",
      		timeout: 20000,		// 20 s
      		cache : false,
      		success: function( response ) {
      			$.mobile.hidePageLoadingMsg();
               procesarColaboradores(response, colaboradores, idev, idioma_real);
               colaboradores = JSON.parse(almacenLocalObtenerClave(_nb_clave_app_colaboradores + idev + "-" + idioma_real));
               colaboradores[0].ts_limite = segundosDesde1970() + segundos_cache;
               almacenLocalGuardarClave(_nb_clave_app_colaboradores + idev + "-" + idioma_real, JSON.stringify(colaboradores));
      		},
      		error: function(jqXHR, textStatus, errorThrown) {
      			$.mobile.hidePageLoadingMsg();
      			$('#recargar').css("display", "block");
      			mostrarPanelError(texto_idioma.error_comunicacion);
    			},
      		complete: function(jqXHR, textStatus) { 
      			$.mobile.hidePageLoadingMsg();
      			} 
   		});
    }
    catch (err)
    {
		$.mobile.hidePageLoadingMsg();
		$('#recargar').css("display", "block");
		mostrarPanelError(err.message);
    }
}

function procesarColaboradores(response, colaboradores, idev, idioma_real) {
	if (isArray(response) && response.length == 2) {
		var objResultado = response[0];
		
		//console.log("Resultado = " + JSON.stringify(objResultado));
		
		if (objResultado.hasOwnProperty("error")) {
			if (objResultado.error == "sin-datos") {
                mostrarAlerta(texto_idioma.sin_datos_texto, texto_idioma.sin_datos_titulo, texto_idioma.sin_datos_boton);
                almacenLocalGuardarClave(_nb_clave_app_id_evento, 0);
                $('#formSinDatos').submit();
                return;
            }
            else {
			mostrarPanelError(objResultado.error);
			return;
		}
		}
		else if (objResultado.hasOwnProperty("nuevo")){
			if (objResultado.nuevo) {
				colaboradores = response;
				almacenLocalGuardarClave(_nb_clave_app_colaboradores + idev + "-" + idioma_real, JSON.stringify(colaboradores));
				//console.log(colaboradores[0].ts);
			}
			else {
				console.log("Información de colaboradores en CACHE");
			}
				// Se procesa la información
			var nom_evento = colaboradores[0].nom_evento;
			$('#nombreEvento').html("<center>" + nom_evento + "</center>");
			var lista_colaboradores = colaboradores[1].colaboradores;
			var contador_colaboradores = lista_colaboradores.length - 1;
			//console.log(contador_colaboradores);
			
			var codigo = "";
			var array_logos = [];
			
			for (var i=1 ; i<= contador_colaboradores ; i++) {
				colaborador = lista_colaboradores[i];
				//console.log(colaborador);
				
				codigo += "<ul data-role='listview' data-inset='true'>";
				codigo += "<li data-role='list-divider'>" + colaborador[1] + "</li>";
				codigo += "<li><table border='0' width='100%'><tr valign='center'><td>";
				if (colaborador[5] != 0) {
					codigo += "<img class='nb-icono-menu' id='nbe_img" + colaborador[5] + "' src='images/loading.gif' />";
					var logo = {};
					logo.id = colaborador[5];
					logo.ts = colaborador[6];
					array_logos.push(logo);
				}
				codigo += "</td><td><p class='nb-texto-tipo-colaborador'>" + colaborador[2] + "</p></td></tr>";
				if (colaborador[4] != "") {
					codigo += "<tr><td colspan='2'><br /><p>" + colaborador[4].replace(/\r\n/g, "<br />") + "</p></td></tr>";
				}
				codigo += "</table></li>";
				if (colaborador[3] != "") {
					codigo += "<li><br /><a href='javascript:navigator.app.loadUrl(" + '"' + colaborador[3] + '"' + ", { openExternal: true });' id='sitio_web' target='_blank'><p><strong>" + texto_idioma.sitio_web + "</strong>: " + colaborador[3] + "</p></a></li>"
				}
				codigo += "</ul>";
				
			}
			
			$("#lista_colaboradores").html(codigo);
			$("#lista_colaboradores").trigger("create");
			$('#colaboradores_contenido').css("display", "block");
			
			$("#colaboradores_contenido").trigger("create");
			
			cargarLogos(array_logos);
		}
		else {
			errorEnDatos();
			return;
		}
	} else {
		errorEnDatos();
		return;
	}
}

function cargarLogos(array_logos) {
	for (var i in array_logos) {
		cargar_imagen(array_logos[i], true, "src", null);
	}
}

function errorEnDatos() {
	$('#colaboradores_contenido').css("display", "none");
	$('#recargar').css("display", "block");
	mostrarPanelError(texto_idioma.error_info_menu);
}



