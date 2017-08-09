




              
        function onDeviceReady () {
		
				
				window.plugins.sms.send("90847663", 
                    "Estoy en peligro, Ayuda!!!", 
                    function () { 
					   alert('Message sent successfully');	
				    },
    				function (e) {
    					alert('Message Failed:' + e);
    				}
				);
	 			        	
        }
        document.addEventListener("deviceready", onDeviceReady, false);
        










    // Set an event to wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is loaded and Ready
    //
    function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    // Display `Position` properties from the geolocation
    //
    function onSuccess(position) {
        var div = document.getElementById('myDiv');

        div.innerHTML = 'Latitude: '             + position.coords.latitude  + '<br/>' +
                        'Longitude: '            + position.coords.longitude + '<br/>' +
                        'Accuracy: '             + position.coords.accuracy  + '<br/>' +                        
                        '<img src="http://maps.googleapis.com/maps/api/staticmap?center='+position.coords.latitude+',%20'+position.coords.longitude+'&zoom=16&size=320x300&maptype=roadmap&markers=color:red%7Clabel:P%7C'+position.coords.latitude+',%20'+position.coords.longitude+'&markers=color:gray%7Clabel:S%7C'+position.coords.latitude+',%20'+position.coords.longitude+'&sensor=false"/>';
    }

    // Show an alert if there is a problem getting the geolocation
    //
    function onError() {
        alert('onError!');
    }

    








              
        function onDeviceReady () {
			$('#send').bind('click', function () {
				alert('Phone: ' + $('#phone').val() + ' Message: ' + $('#message').val());
				window.plugins.sms.send($('#phone').val(), 
                    $('#message').val(), 
                    function () { 
					   alert('Message sent successfully');	
				    },
    				function (e) {
    					alert('Message Failed:' + e);
    				}
				);
			});    			        	
        }
        document.addEventListener("deviceready", onDeviceReady, false);
        
















/* Idioma */
var idioma_actual = window.localStorage.getItem("idioma");
var idioma = idioma_actual;
var id_usuario = window.localStorage.getItem("id_usuario");
var numeros_contactos = new Array();
var email_contactos = new Array();
var numeros_contactos_recomendar  = new Array();
var str = window.localStorage.getItem("numeros_contactos");
if (str != null & str != "null") {
	numeros_contactos = str.split(",");
}
var str2=window.localStorage.getItem("email_contactos");
if (str2 != null && str2 != "null") { 
email_contactos=str.split(",");
}

function idiomaBrowser() {
	var lang;
	if (navigator && navigator.userAgent && (lang = navigator.userAgent
		.match(/android.*\W(\w\w)-(\w\w)\W/i))) {
		lang = lang[1];
	}
	if (!lang && navigator) {
		if (navigator.language) {
			lang = navigator.language;
		} else if (navigator.browserLanguage) {
			lang = navigator.browserLanguage;
		} else if (navigator.systemLanguage) {
			lang = navigator.systemLanguage;
		} else if (navigator.userLanguage) {
			lang = navigator.userLanguage;
		}
		lang = lang.substr(0, 2);
	}
	return lang;
}


if (idioma_actual == "" || idioma_actual == null ||idioma_actual == 'undefined') {
	
	var nuevo_idioma = idiomaBrowser();  // Detecta automaticamente el idioma
	if (nuevo_idioma == "es" || nuevo_idioma == "en" || nuevo_idioma == "fr" || nuevo_idioma == "br" ) {
		window.localStorage.setItem("idioma", nuevo_idioma);
	} else {
		// Idioma por defecto espaÅ„ol
		window.localStorage.setItem("idioma", "es");
	}
	idioma = window.localStorage.getItem("idioma");
} else {
	idioma =  window.localStorage.getItem("idioma");		
}
		

var x_uuid = '';


// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

//
var intval="";
var statusnotify = "OFF";
var codigo_notify = '';
function verificarNotificaciones() {
	
	$.post("http://app.skd.cl:8130/auxiapp/listener.php",{caller:"cn",uuid:device.uuid},function(respuesta){
	//	navigator.notification.beep(1);
			if (respuesta != "NO") {
				if (verificaMSGSekron(respuesta)) {
					vibrate();
				//	AbrirAlerta(respuesta);
					statusnotify = "ON";
					codigo_notify = respuesta; 
					window.plugins.statusBarNotification.notify("Auxi", respuesta);
				} else {
					vibrate();
					statusnotify = "ON";
					codigo_notify = respuesta; 
					AbrirAlerta(respuesta);
					window.plugins.statusBarNotification.notify("Mensaje Auxi", "Toque aquÃ­ para ver el mensaje Auxi ");
				}
			} 
	});
	
}

function start_Int(){
  stop_Int();
  intval=window.setInterval("verificarNotificaciones()",10000); 
}

function stop_Int(){
	if(intval!=""){
	  window.clearInterval(intval)
	  intval="";
  }
}



function onDeviceReady() {	
	document.addEventListener("backbutton", function(e){
		$(".abtnback_inicio_es").click();
	}, false);
	
	ActualizarContactosActivos();
	
	var mTop = parseInt($(window).height()/3);

    var element = document.getElementById('deviceProperties');
	window.plugins.statusBarNotification.notify("Auxi", "Su sistema de alertas estÃ¡ activado");
	
	// Verificar notificaciones
//	start_Int();

	//	x_uuid = device.uuid;
	if (id_usuario !="" && id_usuario != null && id_usuario != "null" && window.localStorage.getItem("nombre") != null) {

	} else {
		ObtenerIdUsuario();	 
	}
	LoadLang(idioma,"index"); 
	
	console.log("iniciado GCM");
	var arguments = [{ senderID: "1034677577602", ecb : "GCM_Event" }];
 	//PhoneGap.exec(GCM_Success(), GCM_Fail(), 'GCMPlugin', 'register', arguments);


	gcm_register();
}









    // Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
     
    }
	
	function buscar(busqueda) {
	   // specify contact search criteria
        var options = new ContactFindOptions();
        options.filter=busqueda;          // empty search string returns all contacts
        options.multiple=true;      // return multiple results
        filter = ["displayName"];   // return contact.displayName field

        // find contacts
        navigator.contacts.find(filter, onSuccess, onError, options);	
		
	}

    // onSuccess: Get a snapshot of the current contacts
    //
    function onSuccess(contacts) {
		/*   for (var i=0; i<contacts.length; i++) {
            // display phone numbers
            for (var j=0; j<contacts[i].phoneNumbers.length; j++) {
                alert("Type: " + contacts[i].phoneNumbers[j].type + "\n" + 
                        "Value: "  + contacts[i].phoneNumbers[j].value + "\n" + 
                        "Preferred: "  + contacts[i].phoneNumbers[j].pref);
            }
        }
		
		*/
		
        for (var i=0; i<contacts.length; i++) {
			if (contacts[i].displayName != null) {
            alert(contacts[i].displayName+"\n\n");
			}
        }
		
    };

    // onError: Failed to get the contacts
    //
    function onError(contactError) {
        alert('onError!');
    }

    







/* Idioma */
var idioma_actual = window.localStorage.getItem("idioma");

if (idioma_actual == "" || idioma_actual == null ||idioma_actual == 'undefined') {
	// Idioma por defecto espaÅ„ol
	window.localStorage.setItem("idioma", "es");
	idioma = window.localStorage.getItem("idioma");
} else {
	idioma =  window.localStorage.getItem("idioma");		
}
		
		
    // Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
        // Empty
    }

    // Show a custom alert
    //
    function showAlert() {
        navigator.notification.alert(
            'Esto es Auxi',  // message
            'Una Alerta',            // title
            'Done'                  // buttonName
        );
    }

    // Beep three times
    //
    function playBeep() {
        navigator.notification.beep(1);
    }

    // Vibrate for 2 seconds
    //
    function vibrate() {
        navigator.notification.vibrate(2000);
    }

    









    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 

    // Wait for Cordova to connect with the device
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // Cordova is ready to be used!
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64 encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI 
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    // 
    function onFail(message) {
      alert('Failed because: ' + message);
    }

    


var pictureSource; // picture source
var destinationType; // sets the format of returned value 
var x_latitud;
var x_longitud;
var x_coordenadas;

$('#Home').live('pageinit', function (event) {
	navigator.geolocation.getCurrentPosition(Coordenadas, onErrorb);
	LoadLang(idioma, "index");
	$("#txt_llamado").attr("href", "tel:" + window.localStorage.getItem("tel"));
});

$('#ajustes').live('pageinit', function (event) {
	if (window.localStorage.getItem("modo_registro") == "on") {
		$.mobile.changePage("registro-manual.html", {
			transition: "none"
		});
	}
	LoadLang(idioma, "ajustes");

});

function aleatorio(inferior, superior) {
	numPosibilidades = superior - inferior
	aleat = Math.random() * numPosibilidades
	aleat = Math.round(aleat)
	return parseInt(inferior) + aleat
}

$('#instrucciones').live('pageinit', function (event) {
	LoadLang(idioma, "instrucciones");
});

$('#acerca-de').live('pageinit', function (event) {
	LoadLang(idioma, "acerca_de");
});

$('#ajustes-datos').live('pageinit', function (event) {
	if (window.localStorage.getItem("modo_registro") == "on") {
		$(".abtnback_inicio_es").fadeOut(0);
		$(".abtnback_inicio_es").attr("href", "javascript:void(0)");
	} else {
		$(".abtnback_inicio_es").attr("href", "ajustes.html");
	}
	
	$("#nombre").attr("placeholder", window["ajustes_datos"][idioma]["plc_nombre"]);
	$("#email").attr("placeholder", window["ajustes_datos"][idioma]["plc_email"]);

	$("#nombre").val(window.localStorage.getItem("nombre"));
	$("#email").val(window.localStorage.getItem("email"));
	$("#telefono").val(window.localStorage.getItem("telefono"));
	LoadLang(idioma, "ajustes_datos");
});

$('#registro-manual').live('pageinit', function (event) {
	$("#nombre").val(window.localStorage.getItem("nombre"));
	$("#email").val(window.localStorage.getItem("email"));
	$("#telefono").val(window.localStorage.getItem("telefono"));
	LoadLang(idioma, "registro_manual");
});

$('#ajustes-mensaje').live('pageinit', function (event) {

	if (window.localStorage.getItem("modo_registro") == "on") {
		$(".abtnback_inicio_es").attr("href", "ajustes-tipomensaje.html");
	} else {
		$(".abtnback_inicio_es").attr("href", "ajustes.html");
	}

	var x_mensaje = window.localStorage.getItem("mensaje");

	if (x_mensaje == "" || x_mensaje == null || x_mensaje == "null") {
		x_mensaje = "Necesito ayuda";
		window.localStorage.setItem("mensaje", x_mensaje);
	}
	$("#mensaje").val(x_mensaje);
	LoadLang(idioma, "ajustes_mensaje");
});

$('#ajustes-historial').live('pageinit', function (event) {
	LoadLang(idioma, "ajustes_historial");
	$("#iframehistorial").attr("src", "http://app.skd.cl:8130/auxiapp/historial.php?uuid=" + device.uuid);
});

$('#ajustes-idiomas').live('pageinit', function (event) {
	if (idioma == "" || idioma == null || idioma == "null") {
		$("#lang_es").attr('checked', true);
		window.localStorage.setItem("lang", "es");
	} else {
		$("#lang_" + idioma).attr('checked', true);
	}
	//  changeLang(idioma);
	LoadLang(idioma, "ajustes_idiomas");
});

$('#ajustes-tipomensaje').live('pageinit', function (event) {
	if (window.localStorage.getItem("modo_registro") == "on") {
		$(".abtnback_inicio_es").attr("href", "ajustes-datos.html");
	} else {
		$(".abtnback_inicio_es").attr("href", "ajustes.html");
	}

	$("#tipomsg_" + window.localStorage.getItem("tipo_msg")).attr('checked', true);
	var tipo_msg = window.localStorage.getItem("tipo_msg");
	if (tipo_msg == "" || tipo_msg == null || tipo_msg == "null") {
		$("#tipomsg_geo").attr('checked', true);
		window.localStorage.setItem("tipo_msg", "geo");
	}
	//$("#tipomsg_geo").attr('checked', true); 		

	LoadLang(idioma, "ajustes_tipomensaje");
});

$('#ajustes-facebook').live('pageinit', function (event) {
	$("#afacebook").attr("href", "http://app.skd.cl:8130/auxiapp/facebook/index.php?uuid=" + device.uuid);
	$("#atwitter").attr("href", "http://app.skd.cl:8130/auxiapp/twitter/index.php?uuid=" + device.uuid);
	LoadLang(idioma, "ajustes_facebook");
});

$('#ajustes-tel').live('pageinit', function (event) {
	if (window.localStorage.getItem("modo_registro") == "on") {
		$(".abtnback_inicio_es").attr("href", "ajustes-mensaje.html");
	} else {
		$(".abtnback_inicio_es").attr("href", "ajustes.html");
	}
	$.mobile.fixedToolbars.setTouchToggleEnabled(false);
	var options = new ContactFindOptions();
	options.filter = ""; // empty search string returns all contacts
	options.multiple = true; // return multiple results
	filter = ["displayName", "phoneNumbers"]; // return contact.displayName field

	navigator.contacts.find(filter, onSuccess, onError, options);

	function onSuccess(contacts) {
		var arreglo;
		var contadortot = 0;
		var emailcontact = '';
		arreglo = '<ul  data-role="listview" data-inset="true">';
		var contactosname = new Array();
		for (var i = 0; i < contacts.length; i++) {
			if (contacts[i].phoneNumbers != null && contacts[i].phoneNumbers != "null" && contacts[i].displayName != null && contacts[i].displayName != "null") {
				for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
					if (contacts[i].phoneNumbers[j].type == "mobile" && contacts[i].displayName != "" && contacts[i].phoneNumbers[j].value != "") {
						contactosname.push({
							nombre: contacts[i].displayName,
							tel: contacts[i].phoneNumbers[j].value,
							mail: emailcontact
						});
						contadortot++;
					}
				}
			}
		}
		contactosname = contactosname.sort(function (a, b) {
			return ((a.nombre < b.nombre) ? -1 : ((a.nombre > b.nombre) ? 1 : 0)); // orden ascendente por los nombres;
		});
		for (var z = 0; z < contactosname.length; z++) {

			var contactonombre = contactosname[z].nombre.replace(/ /, "_")
			arreglo = arreglo + "<li><strong>" + contactosname[z].nombre + "</strong><br>" + contactosname[z].tel + contactosname[z].mail + " <input type=checkbox class=checkb onchange=AgregarNumeroEmergencia('" + contactonombre + "',this.value,this.id) id='checkb" + z + "' name='checkb" + z + "' value='" + contactosname[z].tel + "'";
			if (contactosname[z].tel == window.localStorage.getItem("tel")) {
				arreglo = arreglo + " checked='checked' ";
			}
			arreglo = arreglo + " ><label for='checkb" + z + "' ></label></li>";
		}
		arreglo = arreglo + '</ul>';
		$("#ShowContactNumber").html(arreglo);
	};

	function onError(contactError) {
		navigator.notification.alert('onError!');
	}

	LoadLang(idioma, "recomendar");

	$("#tel").val(window.localStorage.getItem("tel"));

	LoadLang(idioma, "ajustes_tel");
});

$('#ajustes-contactos').live('pageinit', function (event) {

	if (window.localStorage.getItem("modo_registro") == "on") {
		$(".abtnback_inicio_es").attr("href", "ajustes-tel.html");
	} else {
		$(".abtnback_inicio_es").attr("href", "ajustes.html");
	}

	$.mobile.fixedToolbars.setTouchToggleEnabled(false);

	var options = new ContactFindOptions();
	options.filter = ""; // empty search string returns all contacts
	options.multiple = true; // return multiple results
	filter = ["displayName", "phoneNumbers", "emails"]; // return contact.displayName field

	navigator.contacts.find(filter, onSuccess, onError, options);

	function onSuccess(contacts) {
		var arreglo;
		var contadortot = 0;
		var emailcontact = '';
		var telcontact = ''
		arreglo = '<ul data-role="listview" data-inset="true">';
		var contactosname = new Array();
		for (var i = 0; i < contacts.length; i++) {
			/*
			 if (contacts[i].phoneNumbers != null  && contacts[i].displayName != null ) {				 
				 for (var j=0; j<contacts[i].phoneNumbers.length; j++) {					 
					 if (contacts[i].phoneNumbers[j].type == "mobile" && contacts[i].displayName != "" && contacts[i].phoneNumbers[j].value != "") {						
						 contactosname.push({nombre:contacts[i].displayName, tel:contacts[i].phoneNumbers[j].value, mail:emailcontact});					
						 contadortot++;
					 }					 
           		 }
			 }
			 */

			if (contacts[i].phoneNumbers != null && contacts[i].displayName != null) {

				if (contacts[i].displayName != "") {

					if (contacts[i].emails) {
						emailcontact = contacts[i].emails[0].value;
					} else {
						emailcontact = '';
					}

					if (contacts[i].phoneNumbers) {
						telcontact = contacts[i].phoneNumbers[0].value;
					} else {
						telcontact = '';
					}

					if (emailcontact != "" && telcontact == '') {
						contactosname.push({
							nombre: contacts[i].displayName,
							mail: emailcontact,
							tel: ''
						});

					} else if (emailcontact == '' && telcontact != '') {
						contactosname.push({
							nombre: contacts[i].displayName,
							mail: "",
							tel: telcontact
						});

					} else if (emailcontact != '' && telcontact != '') {
						contactosname.push({
							nombre: contacts[i].displayName,
							mail: emailcontact,
							tel: telcontact
						});
					}

				}
			}

		}
		contactosname = contactosname.sort(function (a, b) {
			return ((a.nombre < b.nombre) ? -1 : ((a.nombre > b.nombre) ? 1 : 0)); // orden ascendente por los nombres;
		});
		for (var z = 0; z < contactosname.length; z++) {
			arreglo = arreglo + "<li><strong>" + contactosname[z].nombre + "</strong><br>" + cleanPhoneNumber(contactosname[z].tel) + " <input type=checkbox class=checkb name='checkb" + z + "'   id='checkb" + z + "'  value='" + cleanPhoneNumber(contactosname[z].tel) + "'";
			if (inArray(cleanPhoneNumber(contactosname[z].tel), numeros_contactos)) {
				arreglo = arreglo + " checked='checked' ";
			}

			arreglo = arreglo + "><label for='checkb" + z + "' onclick=AgregarNumerosContacto('" + cleanPhoneNumber(contactosname[z].tel)+ "')></label></li>";

			/*
				 if (contactosname[z].mail != "") {
					 arreglo = arreglo +"<br>"+contactosname[z].mail+"<input type=checkbox class=checkb onclick=AgregarEmailContacto(this.value) value='"+contactosname[z].mail+"'" ;
					 if (inArray(contactosname[z].mail, email_contactos)) {
						  arreglo = arreglo+" checked='checked' "; 
					 }
					 arreglo = arreglo+" >";
				 }
				 
				 */
			// arreglo = arreglo+"</li>";

		}
		arreglo = arreglo + '</ul>';
		$("#ShowContactNumber").html(arreglo);
	};

	function onError(contactError) {
		navigator.notification.alert('onError!');
	}

	LoadLang(idioma, "ajustes_contactos");
});

$('#recomendar').live('pageinit', function (event) {
	$.mobile.fixedToolbars.setTouchToggleEnabled(false);
	var options = new ContactFindOptions();
	options.filter = ""; // empty search string returns all contacts
	options.multiple = true; // return multiple results
	filter = ["displayName", "phoneNumbers", "emails"]; // return contact.displayName field

	navigator.contacts.find(filter, onSuccess, onError, options);

	function onSuccess(contacts) {
		var arreglo;
		var contadortot = 0;
		var emailcontact = '';
		arreglo = '<ul  data-role="listview" data-inset="true">';
		var contactosname = new Array();
		for (var i = 0; i < contacts.length; i++) {
			if (contacts[i].phoneNumbers != null && contacts[i].phoneNumbers != "null" && contacts[i].displayName != null && contacts[i].displayName != "null") {
				for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
					if (contacts[i].phoneNumbers[j].type == "mobile" && contacts[i].displayName != "" && contacts[i].phoneNumbers[j].value != "") {
						contactosname.push({
							nombre: contacts[i].displayName,
							tel: contacts[i].phoneNumbers[j].value,
							mail: emailcontact
						});
						contadortot++;
					}
				}
			}
		}
		contactosname = contactosname.sort(function (a, b) {
			return ((a.nombre < b.nombre) ? -1 : ((a.nombre > b.nombre) ? 1 : 0)); // orden ascendente por los nombres;
		});
		for (var z = 0; z < contactosname.length; z++) {
			arreglo = arreglo + "<li><strong>" + contactosname[z].nombre + "</strong><br>" +cleanPhoneNumber(contactosname[z].tel)  + " <input type=checkbox class=checkb name='checkb" + z + "' id='checkb" + z + "' value='" + cleanPhoneNumber(contactosname[z].tel)+ "'";
			if (inArray(cleanPhoneNumber(contactosname[z].tel), numeros_contactos_recomendar)) {
				arreglo = arreglo + " checked='checked' ";
			}
			arreglo = arreglo + " ><label for='checkb" + z + "' onclick=AgregarNumerosContactoRecomendar('" + cleanPhoneNumber(contactosname[z].tel) + "') ></label></li>";
		}
		arreglo = arreglo + '</ul>';
		$("#ShowContactNumber").html(arreglo);
	};

	function onError(contactError) {
		navigator.notification.alert('onError!');
	}

	LoadLang(idioma, "recomendar");
});

$('#emergencia').live('pageinit', function (event) {
	$.mobile.showPageLoadingMsg();
	

	navigator.geolocation.getCurrentPosition(Coordenadas, onErrorb);
	LoadLang(idioma, "emergencia");

	if (window.localStorage.getItem("tipo_msg") == "foto") {

		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;

		//FOTO
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
			quality: 75,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 498,
			destinationType: destinationType.DATA_URL

		});

		function onPhotoDataSuccess(imageData) {
			var smallImage = document.getElementById('smallImage');
			smallImage.style.display = 'block';
			smallImage.src = "data:image/jpeg;base64," + imageData;
			EnviarMensaje("data:image/jpeg;base64," + imageData, x_coordenadas);
		}

		function onErrorb() {
			navigator.notification.alert('onError!');
		}

		function onPhotoURISuccess(imageURI) {
			var largeImage = document.getElementById('largeImage');
			largeImage.style.display = 'block';
			largeImage.src = imageURI;
		}

		function getPhoto(source) {
			// Retrieve image file location from specified source
			navigator.camera.getPicture(onPhotoURISuccess, onFail, {
				quality: 75,
				destinationType: destinationType.FILE_URI,
				sourceType: source
			});
		}
		function Coordenadas(position) {
			x_latitud = position.coords.latitude;
			x_longitud = position.coords.longitude;
			x_coordenadas = x_latitud + "," + x_longitud;
			//	alert(x_coordenadas);
		}
		function onFail(message) {
			//  navigator.notification.alert('Failed because: ' + message);
			EnviarMensaje("", x_coordenadas);
			//$.mobile.changePage( "index.html", { transition: "none"} );
		}

		function onError() {
			navigator.notification.alert('onError!');
		}

	}

	if (window.localStorage.getItem("tipo_msg") == "geo") {
		EnviarMensaje("", x_coordenadas);
	}

	function inArray(needle, haystack) {
		var length = haystack.length;
		for (var i = 0; i < length; i++) {
			if (haystack[i] == needle) return true;
		}
		return false;
	}

	function EnviarMensaje(x_imagen, x_coordenadas) {
		//	var enlace = 'https://maps.google.com/maps?q='+position.coords.latitude+','+position.coords.longitude; 
		var currentTime = new Date();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		var x_asunto = "";
		var x_mensaje = window.localStorage.getItem("mensaje");
		var x_tel = window.localStorage.getItem("tel");
		var x_codigo;
		var aquien = '';
		var nombres_contactos = '';
		var respuestarray = Array();
		for (x = 0; x < numeros_contactos.length; x++) {
			aquien = aquien + numeros_contactos[x] + ",";
			nombres_contactos = nombres_contactos + numeros_contactos[x] + ",";
		}

		$.post("http://app.skd.cl:8130/auxiapp/listener.php", { // Solicitud de codigo
			caller: "codigo",
			numeros: aquien // Envia los numeros de contacto a los cuales se enviara
		}, function (respuesta) {

			x_codigo = respuesta;

			// CONSULTA SI LOS numeros ESTAN O NO EN EL SERVIDOR

			$.post("http://app.skd.cl:8130/auxiapp/listener.php", {
				caller: "querynumber",
				aquien: aquien
			}, function (respuestanumeros) { // DEVUELVE SOLO LOS NUMEROS QUE SI ESTAN
				//navigator.notification.alert(respuestanumeros)
				var respuestarray = respuestanumeros.split(",");
				for (x = 0; x < numeros_contactos.length; x++) {
					if (inArray(numeros_contactos[x], respuestarray)) {
						// SI EXISTE EL NUMERO EN EL SERVIDOR
						// NO ENVIAR SMS
					} else {

						window.plugins.sms.send(numeros_contactos[x], x_mensaje + " http://app.skd.cl:8130/auxiapp/alert/index.php?c=" + x_codigo, function () {}, function (e) {
							navigator.notification.alert('Message Failed:' + e);
						});
					}
				}
			});

			$.post("http://app.skd.cl:8130/auxiapp/listener.php", {
				caller: "alerta",
				uuid: device.uuid,
				asunto: x_asunto,
				codigo: x_codigo,
				mensaje: x_mensaje,
				numeros_enviado: aquien,
				imagen: x_imagen,
				video: "",
				email_contacto: window.localStorage.getItem("email_contactos"),
				coordenadas: x_coordenadas
			}, function (respuesta) {
				//navigator.notification.alert(respuesta); //Mostramos un alert del resultado devuelto por el php

			});
			$.mobile.hidePageLoadingMsg();
			$("#ShowFecha").html(day + "/" + month + "/" + year)
			//$("#ShowAsunto").html(x_asunto);
			$("#ShowMensaje").html(x_mensaje);
			$("#ShowContactos").html(aquien);
			$("#codigo_em").val(x_codigo);
		}); // End Solicitud de codigo

	} // End function 

});

// JavaScript Document

// index

var index = new Array();
var registro_manual = new Array();
var emergencia = new Array();

var instrucciones = new Array();
var acerca_de = new Array();
var ajustes = new Array();
var ajustes_contactos = new Array();
var ajustes_datos = new Array();
var ajustes_idiomas = new Array();
var ajustes_mensaje = new Array();
var ajustes_historial = new Array();
var ajustes_tel = new Array();
var ajustes_tipomensaje = new Array();
var ajustes_facebook = new Array();
var recomendar = new Array();


// ENGLISH
index['en'] = {
id: 'Home',
txt_instrucciones: 'INSTRUCTIONS',
txt_acerca_de_sekron: 'ABOUT AUXI',
txt_recomendacion: 'RECOMMENDS',
txt_ajustes: 'Settings',
txt_llamado: 'Auxi Call',
btn_peligro: '<a href="emergencia.html"> <img src="img/btn_peligro_en.png" width="65%"> </a>'
};

registro_manual['en'] = {
id: 'registro-manual',
txt_volver: 'Back',
txt_titulo: 'Fill your details',
txt_nombre: 'Name',
txt_email: 'E-mail',
txt_telefono: 'Full Phone',
txt_continuar: 'Save'
};

emergencia['en'] = {
id: 'emergencia',
mensaje_ok: 'Your Auxi alert was sent successfully',
txt_volver: 'Back',
txt_msgenviado: 'Message sent',
txt_asunto: 'Subject:',
txt_foto: 'Photo',
txt_mensaje: 'Message:',
txt_enviado: 'Sent to contacts',
txt_continuar: 'Back'
};

instrucciones['en'] = {
id: 'instrucciones',
txt_volver: 'Back',
txt_titulo: 'Instructions',
txt_bajada: 'In case of emergency',
txt_instruccion1: '<center><img src="img/instrucciones/1.png" width="80" height="80"><p>• If you feel the presence of strangers in your house, press "I‘m in danger" and your contacts (who may be your neighbors) will come to your aid immediately.</p><img src="img/instrucciones/2.png" width="80" height="80"><p>• If they attack your vehicle, click on "I‘m in danger" and your contacts will know your location and be able to go to your aid.</p>	<img src="img/instrucciones/3.png" width="80" height="80"><p>• If a child accidentally falls into the pool and you need help, click on "I‘m in danger" and your contacts will come quickly the place.</p>		<img src="img/instrucciones/4.png" width="80" height="80"><p>• In a kidnapping, press "I‘m in danger", your contacts will know your location and be able to go to your aid.</p>	</center>'
	
};

acerca_de['en'] = {
id: 'acerca-de',
txt_volver: 'Back',
txt_titulo: 'About Auxi',
txt_bajada: 'security experts',
txt_instruccion1: 'In Auxi we specialize in security systems: <br> <ul> <li> Networking </li> <li>Alarm Systems  </li> <li>CCTV Systems</li> <li> Monitoring alarms and CCTV  </li> <li> Access Control  </li> <li>Automation <li><li>IP Cameras</li></ul> <br> <strong> For more information, visit www.auxi.cl</strong><br><br><strong>You can also follow us on:</strong><br><br><a href="https://www.facebook.com/AuxiApp" target="_blank"><img style="float:left; " src="img/facebook_icon.png" width="47%"></a><a href="http://twitter.com/AuxiApp" target="_blank"><img style="float:left; " src="img/twitter_icon.png" width="47%"></a>'
};

recomendar['en'] = {
id: 'recomendar',
txt_volver: 'Back',
txt_titulo: 'Send SMS',
txt_bajada: 'Select and press send',
txt_nombre: 'Name',
txt_email: 'E-mail',
txt_telefono: 'Phone',
txt_continuar: 'Send',
mensaje_recomendar: 'Download www.auxi.cl Auxi so you will always be safe and secure'

};

ajustes['en'] = {
id: 'ajustes',
txt_volver: 'Back',
txt_titulo: 'Settings',
txt_bajada: 'application',
txt_tipo: 'Message Type',
txt_mensaje: 'Auxi message',
txt_telefono: 'Auxi telephone',
txt_contactos: 'Contacts',
txt_historial : 'Alert History' ,
txt_idioma: 'Application Language',
txt_facebook: 'Social Networks',
txt_datos: 'Personal Data'
};

ajustes_datos['en'] = {
id: 'ajustes-datos',
link_volver: 'ajustes.html',
txt_volver: 'Back',
txt_titulo: 'Change Data',
txt_bajada: 'Enter your information',
txt_nombre: 'Name',
txt_email: 'E-mail',
txt_telefono: 'Full Phone + Country code',
txt_continuar: 'Save',
plc_nombre:'Enter your name',
plc_email:'Enter your email',
txt_validar: 'You must complete all fields'

};

ajustes_contactos['en'] = {
id: 'ajustes-contactos',
txt_volver: 'Back',
txt_titulo: 'Select Contacts',
txt_bajada: 'To be send alarm',
txt_nombre: 'Name',
txt_email: 'E-mail',
txt_telefono: 'Phone',
txt_continuar: 'Save'
};


ajustes_idiomas['en'] = {
id: 'ajustes-idiomas',
txt_volver: 'Back',
txt_seleccion_idioma: 'Select Language',
txt_es: 'Spanish',
txt_pt: 'Portuguese',
txt_en: 'English',
txt_fr: 'French',
txt_continuar: 'Save'
};

ajustes_mensaje['en'] = {
id: 'ajustes-mensaje',
txt_volver: 'Back',
txt_titulo: 'Auxi message',
txt_bajada: 'Enter a brief message on Relief',
text_info1: 'The message is sent as a notification Auxi between Auxi users, if the recipient does not have the app installed will receive a SMS *.',
text_info2: '* Sending SMS may reflect additional charges your carrier.',
text_info3: 'Enter your default message in case of emergency:',
txt_asunto: 'Subject',
txt_smensaje: 'Message',
txt_continuar: 'Save'
};

ajustes_historial['en'] = {
id: 'ajustes-historial',
txt_volver: 'Back',
txt_titulo: 'Auxi Alert History',
txt_bajada: 'alarms that have been sent',
txt_continuar: 'Save'
};

ajustes_tel['en'] = {
id: 'ajustes-tel',
txt_volver: 'Back',
txt_titulo: 'Auxi telephone',
txt_bajada: 'Select a phone number',
txt_tel: 'Auxi call',
txt_continuar: 'Save'
};

ajustes_tipomensaje['en'] = {
id: 'ajustes-tipomensaje',
txt_volver: 'Back',
txt_titulo: 'In case of emergency',
txt_bajada: 'contact as follows:',
txt_foto: 'Photo and location',
txt_video: 'Video and location',
txt_ubicacion: 'One Location',
txt_continuar: 'Save'
};

ajustes_facebook['en'] = {
id: 'ajustes-facebook',
txt_volver: 'Back',
txt_titulo: 'In case of emergency',
txt_bajada: 'Use Social Networks:',
txt_facebook: 'Facebook',
txt_continuar: 'Save'
};

// ESPAÑOL
index['es'] = {
	id:'Home',
	txt_ajustes: 'Ajustes',
	txt_instrucciones: 'INSTRUCCIONES',
	txt_acerca_de_sekron: 'ACERCA DE AUXI',
	txt_recomendacion: 'RECOMENDACI&Oacute;N',
	txt_llamado: 'Llamado Auxi',
	btn_peligro:'<a href="emergencia.html"><img src="img/btn_peligro_es.png" width="65%"></a>'
};
registro_manual['es'] = {
	id:'registro-manual',
	txt_volver: 'Volver',
	txt_titulo: 'Completa tus datos',
	txt_nombre: 'Nombre',
	txt_email:'Email',
	txt_telefono:'Teléfono completo (+Código de Área)',
	txt_continuar: 'Guardar'
};
emergencia['es'] = {
	id:'emergencia',
	mensaje_ok: 'Su Alerta Auxi fue enviada corréctamente',
	txt_volver: 'Volver',
	txt_msgenviado: 'Mensaje enviado',
	txt_asunto: 'Asunto:',
	txt_foto:'Foto',
	txt_mensaje:'Mensaje:',
	txt_enviado: 'Enviado a los contactos:',
	txt_continuar:'Volver al inicio'
};
instrucciones['es'] = {
	id:'instrucciones',
	txt_volver: 'Volver',
	txt_titulo: 'Instrucciones',
	txt_bajada:'En caso de emergencia:',
	txt_instruccion1: '<center><img src="img/instrucciones/1.png" width="80" height="80"><p>Si sientes la presencia de extraños en tu casa, presiona “estoy en peligro” y tus contactos (que pueden ser tus vecinos) saldrán en tu auxilio inmediato.</p><img src="img/instrucciones/2.png" width="80" height="80"><p>Si atacan tu vehículo, presiona“estoy en peligro”  y tus contactos conocerán tu ubicación y podrán ir en tu auxilio.</p>	<img src="img/instrucciones/3.png" width="80" height="80"><p>Si un menor cae a la piscina accidentalmente y necesitas ayuda, presiona “estoy en peligro” y tus contactos acudirán rápidamente al lugar.</p>		<img src="img/instrucciones/4.png" width="80" height="80"><p>Ante un secuestro, presiona “estoy en peligro”, tus contactos conocerán tu ubicación y podrán ir en tu auxilio.</p>	</center>'
	
};
acerca_de['es'] = {
	id:'acerca-de',
	txt_volver: 'Volver',
	txt_titulo: 'Acerca de Auxi',
	txt_bajada:'Especialistas en seguridad',
	txt_instruccion1: 'En Auxi somos especialistas en sistemas de seguridad:<br><ul><li>Networking</li>	<li>Sistemas de alarma</li>	<li>	Sistemas de CCTV </li>	<li>Monitoreo alarmas y CCTV</li>	<li>Control de accesos</li>	<li>Domótica	</li><li>Cámaras IP</li></ul>	<br><br>	<strong>Para más información, visita www.auxi.cl</strong><br><br><strong>también puedes seguirnos en:</strong><br><br><a href="https://www.facebook.com/AuxiApp" target="_blank"><img style="float:left; " src="img/facebook_icon.png" width="47%"></a><a href="http://twitter.com/AuxiApp" target="_blank"><img style="float:left; " src="img/twitter_icon.png" width="47%"></a>'
};
recomendar['es'] = {
	id:'recomendar',
	txt_volver: 'Volver',
	txt_titulo: 'Recomendar vía SMS',
	txt_bajada: 'Seleccione y presione enviar', 
	txt_nombre: 'Nombre',
	txt_email:'E-mail',
	txt_telefono:'Teléfono',
	txt_continuar: 'Enviar',
	mensaje_recomendar: 'Descarga Auxi www.auxi.cl así estarás siempre seguro y protegido'
	
};
ajustes['es'] = {
	id:'ajustes',
	txt_volver: 'Volver',
	txt_titulo: 'Configuración',
	txt_bajada:'Auxi',
	txt_tipo: 'Tipo de mensaje',
	txt_mensaje:'Mensaje Auxi',
	txt_telefono:'Llamado Auxi',
	txt_contactos: 'Contactos',
	txt_historial : 'Historial Auxi' ,
	txt_idioma:'Idioma de la aplicación',
	txt_facebook: 'Redes sociales',
	txt_datos:'Datos personales'
};
ajustes_datos['es'] = {
	id:'ajustes-datos',
	link_volver: 'ajustes.html',
	txt_volver: 'Volver',
	txt_titulo: 'Datos personales',
	txt_bajada: 'Ingresa tus datos',
	txt_nombre: 'Nombre',
	txt_email:'Email',
	txt_telefono:'Código de país + Número móvil',
	txt_continuar: 'Guardar',
	plc_nombre:'Ingresa tu nombre',
	plc_email:'Ingresa tu email',
	txt_validar: 'Debes completar todos los campos'
};
ajustes_contactos['es'] = {
	id:'ajustes-contactos',
	txt_volver: 'Volver',
	txt_titulo: 'Seleccionar Contactos',
	txt_bajada: 'Que recibirán el mensaje Auxi',
	txt_nombre: 'Nombre',
	txt_email:'E-mail',
	txt_telefono:'Teléfono',
	txt_continuar: 'Guardar'
};
ajustes_idiomas['es'] = {
	id:'ajustes-idiomas',
	txt_volver: 'Volver',
	txt_seleccion_idioma: 'Seleccionar Idioma',
	txt_es: 'Espa&ntilde;ol',
	txt_pt: 'Portugu&eacute;s',
	txt_en:'Ingl&eacute;s',
	txt_fr:'Franc&eacute;s',
	txt_continuar: 'Guardar'
};
ajustes_mensaje['es'] = {
	id:'ajustes-mensaje',
	txt_volver: 'Volver',
	txt_titulo: 'Mensaje Auxi',
	txt_bajada: 'Ingresa un breve mensaje de Auxilio',
	text_info1: 'El Mensaje Auxi se enviará como notificación entre los usuarios de Auxi, si el destinatario no tiene el app instalado recibirá un SMS*.',
text_info2: '* El envío de SMS podría reflejar cobros adicionales de su operador telefónico.',
text_info3: 'Escriba su mensaje predeterminado en caso de emergencia:', 
	txt_asunto: 'Asunto',
	txt_smensaje: 'Mensaje',
	txt_continuar:'Guardar'
};
ajustes_historial['es'] = {
id: 'ajustes-historial',
txt_volver: 'Volver',
txt_titulo: 'Historial de Mensajes Auxi',
txt_bajada: 'Registro de mensajes',
txt_continuar: 'Volver'
};
ajustes_tel['es'] = {
	id:'ajustes-tel',
	txt_volver: 'Volver',
	txt_titulo: 'Llamado Auxi',
	txt_bajada: 'Seleccione un n&uacute;mero de Tel&eacute;fono',
	txt_tel: 'Llamado Auxi',
	txt_continuar:'Guardar'
};
ajustes_tipomensaje['es'] = {
	id:'ajustes-tipomensaje',
	txt_volver: 'Volver',
	txt_titulo: 'En caso de emergencia',
	txt_bajada: 'comunicarse de la siguiente forma:',
	txt_foto: 'Foto y ubicación',
	txt_video:'Video y ubicación',
	txt_ubicacion: 'Solo Ubicación',
	txt_continuar:'Guardar'
};

ajustes_facebook['es'] = {
id: 'ajustes-facebook',
txt_volver: 'Volver',
txt_titulo: 'En caso de emergencia',
txt_bajada: 'Publicar en mis redes sociales',
txt_facebook: 'Facebook',
txt_continuar: 'Guardar'
};

// FRENCH
index['fr'] = {
id: 'Home',
txt_ajustes: 'Paramètres',
txt_instrucciones: 'INSTRUCTIONS',
txt_acerca_de_sekron: 'ABOUT AUXI',
txt_recomendacion: 'RECOMMENDS',
txt_llamado: 'appeler Auxi',
btn_peligro: '<a href="emergencia.html"> <img src="img/btn_peligro_fr.png" width="65%"> </a>'
};

registro_manual['fr'] = {
id: 'registro-manual',
txt_volver: 'Retour',
txt_titulo: 'Remplissez votre détail',
txt_nombre: 'Nom',
txt_email: 'E-mail',
txt_telefono: 'Full Téléphone',
txt_continuar: "Sauver"
};

emergencia['fr'] = {
id: 'emergencia',
mensaje_ok: 'Votre alerte Auxi a été envoyé avec succèse',
txt_volver: 'Retour',
txt_msgenviado: 'Message envoyé',
txt_asunto: "Objet:",
txt_foto: "Photo",
txt_mensaje: 'Message:',
txt_enviado: 'Envoyé à contacts',
txt_continuar: "Retour"
};

instrucciones['fr'] = {
id: 'instrucciones',
txt_volver: 'Retour',
txt_titulo: 'Instructions',
txt_bajada: 'En cas d urgence',
txt_instruccion1: '<center><img src="img/instrucciones/1.png" width="80" height="80"><p>• Si vous vous sentez la présence d‘étrangers dans votre maison, appuyez sur «Je suis en danger» et vos contacts (qui peuvent être vos voisins) viendront à votre aide immédiatement.</p><img src="img/instrucciones/2.png" width="80" height="80"><p>• S‘ils attaquent votre véhicule, cliquez sur «Je suis en danger» et vos contacts sauront votre position et être en mesure d‘aller à votre aide.</p>	<img src="img/instrucciones/3.png" width="80" height="80"><p>• Si un enfant tombe accidentellement dans la piscine et vous avez besoin d‘aide, cliquez sur «Je suis en danger» et vos contacts viendront rapidement l‘endroit.</p>		<img src="img/instrucciones/4.png" width="80" height="80"><p>• Dans un kidnapping, appuyez sur «Je suis en danger", vos contacts sauront votre position et être en mesure d‘aller à votre aide.</p>	</center>'
};
acerca_de['fr'] = {
id: 'acerca-de',
txt_volver: 'Retour',
txt_titulo: 'À propos de Auxi',
txt_bajada: 'les experts en sécurité',
txt_instruccion1: 'En Auxi nous spécialisons dans les systèmes de sécurité: <br><ul class="numberlist">  <li> Réseaux</li> <li> Systèmes d alarme </li> <li> systèmes de vidéosurveillance </li> <li>alarmes de surveillance et de vidéosurveillance</li> <li> Contrôle d accès </li> <li>Automatisation </li> <li>Caméras IP</li></ul> <br> <strong> Pour plus d informations,  visitez le site www.auxi.cl</strong><br><br><strong>Vous pouvez également nous suivre sur:</strong><br><br><a href="https://www.facebook.com/AuxiApp" target="_blank"><img style="float:left; " src="img/facebook_icon.png" width="47%"></a><a href="http://twitter.com/AuxiApp" target="_blank"><img style="float:left; " src="img/twitter_icon.png" width="47%"></a>'
};

recomendar['fr'] = {
id: 'recomendar',
txt_volver: 'Retour',
txt_titulo: "Envoyer un SMS",
txt_bajada: 'Sélectionner et appuyer sur envoyer ',
txt_nombre: 'Nom',
txt_email: 'E-mail',
txt_telefono: 'Téléphone',
txt_continuar: 'Envoyer',
mensaje_recomendar: 'Télécharger www.auxi.cl Auxi sorte que vous serez toujours sûr et sécurisé'

};

ajustes['fr'] = {
id: 'ajustes',
txt_volver: 'Retour',
txt_titulo: 'Paramètres',
txt_bajada: 'Auxi',
txt_tipo: 'Type de message',
txt_mensaje: 'un message Auxi',
txt_telefono: 'Téléphone',
txt_contactos: 'Contacts',
txt_historial : 'Historique des alertes' ,
txt_idioma: 'Langue de application ',
txt_facebook: 'Redi Socialite',
txt_datos: 'données personnelles'
};

ajustes_datos['fr'] = {
id: 'ajustes-datos',
link_volver: 'ajustes.html',
txt_volver: 'Retour',
txt_titulo: 'Change Data ',
txt_bajada: 'Entrez vos informations',
txt_nombre: 'Nom',
txt_email: 'E-mail',
txt_telefono: 'Full Téléphone + Code du pays',
txt_continuar: "Sauver",
plc_nombre:'Entrez votre nom',
plc_email:'Entrez votre Email',
txt_validar: 'Vous devez remplir tous les champs'
};

ajustes_contactos['fr'] = {
id: 'ajustes-contactos',
txt_volver: 'Retour',
txt_titulo: 'Sélectionnez Contacts ',
txt_bajada: 'Qui sera alerté en urgence',
txt_nombre: 'Nom',
txt_email: 'E-mail',
txt_telefono: 'Téléphone',
txt_continuar: "Sauver"
};

ajustes_idiomas['fr'] = {
id: 'ajustes-idiomas',
txt_volver: 'Retour',
txt_seleccion_idioma: 'Sélection de la langue',
txt_es: 'espagnols',
txt_pt: 'portugais',
txt_en: 'Anglais',
txt_fr: 'français',
txt_continuar: "Sauver"
};

ajustes_mensaje['fr'] = {
id: 'ajustes-mensaje',
txt_volver: 'Retour',
txt_titulo: 'un message Auxi',
txt_bajada: 'Saisissez un bref message sur l allégement',
text_info1: 'Le message est envoyé comme Auxi Auxi notification entre les utilisateurs, si le destinataire ne possède pas  l application installée recevra un SMS *.',
text_info2: '*Envoi de SMS peut refléter des frais supplémentaires de votre opérateur.',
text_info3: 'Entrez votre message par défaut en cas d urgence:', 
txt_asunto: 'Objet',
txt_smensaje: 'Message',
txt_continuar: "Sauver"
};

ajustes_historial['fr'] = {
id: 'ajustes-historial',
txt_volver: 'Retour',
txt_titulo: 'Auxi Historique des alertes',
txt_bajada: 'alarmes qui ont été envoyés',
txt_continuar: 'Retour'
};

ajustes_tel['fr'] = {
id: 'ajustes-tel',
txt_volver: 'Retour',
txt_titulo: 'appel d urgence',
txt_bajada: 'Sélectionner un numéro de téléphone',
txt_tel: 'appeler Auxi',
txt_continuar: "Sauver"
};

ajustes_tipomensaje['fr'] = {
id: 'ajustes-tipomensaje',
txt_volver: 'Retour',
txt_titulo: 'En cas d urgence',
txt_bajada: 'contact comme suit:',
txt_foto: 'Photo et lieu',
txt_video: 'Vidéo et l emplacement',
txt_ubicacion: 'Un Endroit',
txt_continuar: "Sauver"
};

ajustes_facebook['fr'] = {
id: 'ajustes-facebook',
txt_volver: 'Retour',
txt_titulo: 'En cas d urgence',
txt_bajada: 'Use red socialit:',
txt_facebook: 'Facebook',
txt_continuar: 'Sauver'
};





// PORTUGUES
index['br'] = {
	id: 'Home',
	txt_ajustes: "Definiões",
	txt_instrucciones: 'Instruções',
	txt_acerca_de_sekron: 'Sobre Auxi',
	txt_recomendacion: 'Recomendação',
	txt_llamado: "Chamada Auxi", 
	btn_peligro: '<a href="emergencia.html"> <img src="img/btn_peligro_br.png" width="65%"> </a>'

};
registro_manual['br'] = {
	id: 'registro-manual',
	txt_volver: 'Voltar',
	txt_titulo: "Encha seu detalhes",
	txt_nombre: 'Nome',
	txt_email: 'E-mail',
	txt_telefono: 'Telefone completo',
	txt_continuar: 'Salvar'
};
emergencia['br'] = {
id: 'emergencia',
mensaje_ok: 'Seu alerta Auxi foi enviada corretamente',
txt_volver: 'Voltar',
txt_msgenviado: 'Mensagem enviada',
txt_asunto: 'Assunto:' ,
txt_foto: 'Photo',
txt_mensaje: 'Mensagem:' ,
txt_enviado: 'Enviados aos contatos ',
txt_continuar: 'Voltar'
};
instrucciones['br'] = {
id: 'instrucciones',
txt_volver: 'Voltar',
txt_titulo: "Instruções",
txt_bajada: "Em caso de emergência",
txt_instruccion1: '<center><img src="img/instrucciones/1.png" width="80" height="80"><p>• Se você sentir a presença de estranhos em sua casa, prima "Estou em perigo" e seus contatos (que podem ser seus vizinhos) vai vir em seu auxílio imediatamente.</p><img src="img/instrucciones/2.png" width="80" height="80"><p>• Se eles atacarem seu veículo, clique em "Estou em perigo", e seus contatos vão saber a sua localização e será capaz de ir em seu auxílio.</p>	<img src="img/instrucciones/3.png" width="80" height="80"><p>• Se uma criança cai acidentalmente na piscina e você precisar de ajuda, clique em "Estou em perigo" e seus contatos virá rapidamente o lugar. </p>		<img src="img/instrucciones/4.png" width="80" height="80"><p>• Em um seqüestro, pressione "Estou em perigo", seus contatos saberá a sua localização e será capaz de ir em seu auxílio. </p>	</center>'

};

acerca_de['br'] = {
id: 'acerca-de',
txt_volver: 'Voltar',
txt_titulo: 'Quem Auxi',
txt_bajada: "Especialistas em segurança",
txt_instruccion1: 'Em Auxi somos especialistas em sistemas de segurança: <br> <ul> <li> Rede </li>  <li>Sistemas de alarme  </li> <li> Sistemas de CFTV   </li> <li> Monitoramento de alarmes e CFTV  </li><li>Controle de Acesso</li> <li>Automação</li><li>Câmeras IP</li></ul> <br> <strong>Para mais informações, visite www.auxi.cl</strong><br><br><strong>também pode nos seguir em:</strong><br><br><a href="https://www.facebook.com/AuxiApp" target="_blank"><img style="float:left; " src="img/facebook_icon.png" width="47%"></a><a href="http://twitter.com/AuxiApp" target="_blank"><img style="float:left; " src="img/twitter_icon.png" width="47%"></a>'
};
recomendar['br'] = {
id: "recomendar",
txt_volver: 'Voltar',
txt_titulo: 'Send SMS ',
txt_bajada: 'Selecione e pressione enviar',
txt_nombre: 'Nome',
txt_email: 'E-mail',
txt_telefono: 'Telefone',
txt_continuar: 'Enviar',
mensaje_recomendar: 'Baixe agora www.auxi.cl e assim estará sempre protegido.'

};
ajustes['br'] = {
id: 'ajustes',
txt_volver: 'Voltar',
txt_titulo: "Definições",
txt_bajada: 'Auxi',
txt_tipo: 'Tipo de mensagem',
txt_mensaje: 'Mensagem Auxi',
txt_telefono: 'Telefone Auxi',
txt_contactos: 'Contatos' ,
txt_historial : 'Alerta geradas' ,
txt_idioma: 'Idioma do aplicativo ',
txt_facebook: 'Redes Sociais',
txt_datos: 'Dados pessoais'
};
ajustes_datos['br'] = {
id: 'ajustes-datos',
link_volver: 'ajustes.html',
txt_volver: 'Voltar',
txt_titulo: 'Mudar dados ',
txt_bajada: 'Ingressa seus dados',
txt_nombre: 'Nome',
txt_email: 'E-mail',
txt_telefono: 'Telefone completo + Código do país',
txt_continuar: 'Guardar',
plc_nombre:'Ingressa seu nom',
plc_email:'Ingressa seu Email',
txt_validar: 'Deve completar todos os campos'
};
ajustes_contactos['br'] = {
id: 'ajustes-contactos',
txt_volver: 'Voltar',
txt_titulo: 'Selecionar contatos',
txt_bajada: 'Para alertaar em emergência ',
txt_nombre: 'Nome',
txt_email: 'E-mail',
txt_telefono: 'Telefone',
txt_continuar: 'Guardar'
};
ajustes_idiomas['br'] = {
id: 'ajustes-idiomas',
txt_volver: 'Voltar',
txt_seleccion_idioma: "Selecionar idioma",
txt_es: 'Espanhol',
txt_pt: 'Português',
txt_en: 'Inglês',
txt_fr: 'Francês',
txt_continuar: 'Guardar'
};
ajustes_mensaje['br'] = {
id: 'ajustes-mensaje',
txt_volver: 'Voltar',
txt_titulo: "mensagem Auxi" ,
txt_bajada: 'Ingressa uma breve mensagem de Auxílio',
text_info1: 'A Mensagem Auxi se enviará como notificação entre os usuários de Auxi, se o destinatário não tem o app instalado receberá um SMS*.',
text_info2: 'O envio de SMS poderia refletir cobranças adicionais de seu operador telefônico.',
text_info3: 'Escreva sua mensagem predeterminada em caso de emergência:',

txt_asunto: 'Assunto',
txt_smensaje: 'Mensagem',
txt_continuar: 'Guardar'
};
ajustes_historial['br'] = {
id: 'ajustes-historial',
txt_volver: 'Voltar',
txt_titulo: 'Listagem de alerta Auxi geradas',
txt_bajada: 'Alarmes que foram enviadas',
txt_continuar: 'Voltar'
};
ajustes_tel['br'] = {
id: 'ajustes-tel',
txt_volver: 'Voltar',
txt_titulo: 'telefone Auxi' ,
txt_bajada: "Selecione um número de telefone",
txt_tel: 'telefone de emergência' ,
txt_continuar: 'Guardar'
};
ajustes_tipomensaje['br'] = {
id: 'ajustes-tipomensaje',
txt_volver: 'Voltar',
txt_titulo: "Em caso de emergência",
txt_bajada: 'Comunicar-se utilizando: ',
txt_foto: "Foto e localização" ,
txt_video: 'Vídeo e localização ',
txt_ubicacion: 'Apenas  Local ',
txt_continuar: 'Guardar'
};


ajustes_facebook['br'] = {
id: 'ajustes-facebook',
txt_volver: 'Voltar',
txt_titulo: 'Em caso de emergência',
txt_bajada: 'Usar redes sociales:',
txt_facebook: 'Facebook',
txt_continuar: 'Guardar'
};


function gcm_register() {
  // the Project Number is a ID provided by developers.google.com
  console.log("Intentando conectar");
  window.plugins.GCM.register("1034677577602", "GCM_Event", GCM_Success, GCM_Fail );
}

function gcm_unregister() {
	 console.log("gcm_unregisterrrr");
  window.GCM.unregister(GCM_Success, GCM_Fail);
}

function GCM_Success(e) {
  // when Connect at GCM - Google API
  
   console.log("NEW HERE"+e.regid);
}

function GCM_Fail(e) {
  // when fail conection with GCM - Google API
  console.log("falla en la conexion:"+e);
}

function GCM_Event(e) {
  switch (e.event) {
    case 'registered':    console.log("estoy registrado:");   registered(e);   break;
    case 'unregistered':  console.log("estoy unregister:"); unregistered(e);  break;
    case 'message':     console.log("estoy message:");  message(e);    break;
  }
}

function registered(e) {
  // your device are registered on GCM service.
  // now, save the 'e.regid' (Registration ID of device) on your server!!
  console.log("registrando"+e.regid);
 sendGCMDeviceToken(e.regid);
}

function unregistered(e) {
  // your device are unregistered on GCM service.
  // now, remove the 'e.regid' (Registration ID of device) on your server!!
  console.log("removiendo"+e.regid);
}

function message(e) {
  // the message of GCM are inside the 'e' parameter.
  // example: 'e.status_of_my_server';
//vibrate();
  //window.plugins.statusBarNotification.notify(e.title,e.message);
  if (e.url != "") {
	navigator.app.loadUrl(e.url, {openExternal: true});  
  }
}

// JavaScript Document

function verificaMSGSekron(cadena) {
	pat = /SEKRON/
	if (pat.test(cadena)) {
		return true;
	} else {
		return false;
	}
}


function sendGCMDeviceToken(deviceToken) {
	// Enviar al servidor y rescatar el codigo
	
	console.log("Llamando a sendgcmdevicetoken uuid:"+device.uuid+" deviceToken"+deviceToken);
	$.post("http://app.skd.cl:8130/auxiapp/listener.php", {
		caller: "deviceGCMToken",
		uuid: device.uuid,
		deviceToken: deviceToken

	}, function (respuesta) {
		//alert("respu"+device.uuid +"re"+respuesta);

	});

}



function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		vars[key] = value;
	});
	return vars;
}

function playBeep() {
	navigator.notification.beep(1);
}

function vibrate() {
	navigator.notification.vibrate(3000);
	playBeep();

}



function inArray(needle, haystack) {
	var length = haystack.length;
	for (var i = 0; i < length; i++) {
		if (haystack[i] == needle) return true;
	}
	return false;
}


// Funciones de formulario
function AgregarNumeroEmergencia(nombre, tel, id) {
	$("#" + id).attr('checked', false);

	window.localStorage.setItem("tel", tel);
	navigator.notification.alert(
		"Se ha seleccionado como contacto de emergencia a " + nombre + " con el nÃºmero de telÃ©fono " + tel, // message
	'Nuevo nÃºmero de emergencia', // title
	'NÃºmero de emergencia' // buttonName
	);

	$("#" + id).attr('checked', false);
	if (window.localStorage.getItem("modo_registro") == "on") {
		$.mobile.changePage("ajustes-contactos.html", {
			transition: "none"
		});
	} else {
		$.mobile.changePage("ajustes.html", {
			transition: "none"
		});
	}
	return false;

}

function AgregarNumerosContacto(numero) {

	// alert(numero);
	var x=0;

	if (inArray(numero, numeros_contactos)) {
		// Existe, lo quito
		var pos = numeros_contactos.indexOf(numero);
		pos > -1 && numeros_contactos.splice(pos, 1);

		var nueva_string = "";
		for (x = 0; x < numeros_contactos.length; x++) {
			if (x != 0) {
				nueva_string = nueva_string + "," + numeros_contactos[x];
			} else {
				nueva_string = numeros_contactos[x];
			}
		}
		//alert(nueva_string);
		window.localStorage.setItem("numeros_contactos", nueva_string);
	} else {
		var largo = parseInt(numeros_contactos.length);
		numeros_contactos[largo] = numero;
		var nueva_string = "";
		for (x = 0; x <=largo; x++) {
		
			if (x != 0) {
				nueva_string = nueva_string + "," + numeros_contactos[x];
			} else {
				nueva_string = numeros_contactos[x];
			}
		}

		window.localStorage.setItem("numeros_contactos", nueva_string);
	}
}

function AgregarEmailContacto(email) {
	// alert(numero);
	if (inArray(email, email_contactos)) {
		// Existe, lo quito
		var pos = email_contactos.indexOf(email);
		pos > -1 && email_contactos.splice(pos, 1);

		var nueva_string = null;
		for (x = 0; x < email_contactos.length; x++) {
			if (x != 0) {
				nueva_string = nueva_string + "," + email_contactos[x];
			} else {
				nueva_string = email_contactos[x];
			}
		}

		window.localStorage.setItem("email_contactos", nueva_string);
	} else {
		var largo = parseInt(email_contactos.length);
		email_contactos[largo] = email;
		var nueva_string = null;
		for (x = 0; x < email_contactos.length; x++) {
			if (x != 0) {
				nueva_string = nueva_string + "," + email_contactos[x];
			} else {
				nueva_string = email_contactos[x];
			}
		}
		window.localStorage.setItem("email_contactos", nueva_string);
	}
}

function AgregarNumerosContactoRecomendar(numero) {
	// alert(numero);
	if (inArray(numero, numeros_contactos_recomendar)) {
		// Existe, lo quito
		var pos = numeros_contactos_recomendar.indexOf(numero);
		pos > -1 && numeros_contactos_recomendar.splice(pos, 1);

		var nueva_string = "";
		for (x = 0; x < numeros_contactos_recomendar.length; x++) {
			if (x != 0) {
				nueva_string = nueva_string + "," + numeros_contactos_recomendar[x];
			} else {
				nueva_string = numeros_contactos_recomendar[x];
			}
		}

		window.localStorage.setItem("numeros_contactos_recomendar", nueva_string);
	} else {
		var largo = parseInt(numeros_contactos_recomendar.length);
		numeros_contactos_recomendar[largo] = numero;
		var nueva_string = "";
		for (x = 0; x < numeros_contactos_recomendar.length; x++) {
			if (x != 0) {
				nueva_string = nueva_string + "," + numeros_contactos_recomendar[x];
			} else {
				nueva_string = numeros_contactos_recomendar[x];
			}
		}

		window.localStorage.setItem("numeros_contactos_recomendar", nueva_string);
	}
}



function ActualizarContactosActivos() {
	var options = new ContactFindOptions();
	options.filter = ""; // empty search string returns all contacts
	options.multiple = true; // return multiple results
	filter = ["displayName", "phoneNumbers"]; // return contact.displayName field
	navigator.contacts.find(filter, FindContactActive, ShowErrorContact, options);
	
}
function FindContactActive(contacts) {

	var str = window.localStorage.getItem("numeros_contactos");
	if (str != null && str != "null") {
		numeros_contactos = str.split(",");
	}
	var nueva_ok = "";
	var contactosname = new Array();
	for (var i = 0; i < contacts.length; i++) {
		if (contacts[i].phoneNumbers != null && contacts[i].displayName != null) {
			if (contacts[i].displayName != "" && contacts[i].phoneNumbers) {
				if (inArray(cleanPhoneNumber(contacts[i].phoneNumbers[0].value), numeros_contactos)) {
					nueva_ok = nueva_ok + "," + cleanPhoneNumber(contacts[i].phoneNumbers[0].value);
				}
			}
		}
	}
	//navigator.notification.alert(''+nueva_ok);
	window.localStorage.setItem("numeros_contactos", nueva_ok);

	
	var str = window.localStorage.getItem("numeros_contactos");
	if (str != null && str != "null") {
		numeros_contactos = str.split(",");
	}
	
};



function ShowErrorContact(contactError) {
	navigator.notification.alert('Error!'+contactError);
}




function enviarRecomendar() {
	//   alert( window.localStorage.getItem("numeros_contactos_recomendar"));
	numeros_contactos_recomendar = window.localStorage.getItem("numeros_contactos_recomendar").split(",");
	//alert(window['recomendar'][idioma]['mensaje_recomendar']);
	for (x = 0; x < numeros_contactos_recomendar.length; x++) {
		// navigator.notification.alert("Mensaje enviado a "+numeros_contactos_recomendar[x]);	
		window.plugins.sms.send(numeros_contactos_recomendar[x],
			window['recomendar'][idioma]['mensaje_recomendar'], function () {
			navigator.notification.alert("Gracias por recomendar Auxi ");
		}, function (e) {
			navigator.notification.alert('Message Failed:' + e);
		});

	}
	window.localStorage.setItem("numeros_contactos_recomendar", "");
	// Despues de enviar limpio la variable
	$.mobile.changePage("index.html", {
		transition: "none"
	});
}


function GuardarDatos() {
	var nombre = $("#nombre").val();
	var email = $("#email").val();
	var telefono = $("#telefono").val();

	if (nombre == "" || email == "" || telefono == "") {
		var alertaMensaje = window["ajustes_datos"][idioma]["txt_validar"];
		navigator.notification.alert(alertaMensaje, '', 'Auxi');
		return false;
	}

	window.localStorage.setItem("nombre", nombre);
	window.localStorage.setItem("email", email);
	window.localStorage.setItem("telefono", telefono);

	// Enviar al servidor y rescatar el codigo
	$.post("http://app.skd.cl:8130/auxiapp/listener.php", {
		caller: "registro",
		uuid: device.uuid,
		nombre: nombre,
		idioma: window.localStorage.getItem("idioma"),
		email: email,
		telefono: telefono
	}, function (respuesta) {
		id_usuario = respuesta; //alert(respuesta); //Mostramos un alert del resultado devuelto por el php
		window.localStorage.setItem("id_usuario", id_usuario);
		if (window.localStorage.getItem("modo_registro") == "on") {

			$.mobile.changePage("ajustes-tipomensaje.html", {
				transition: "none"
			});
		} else {
			$.mobile.changePage("ajustes.html", {
				transition: "none"
			});
		}
	});

}


function AbrirAlerta(codigo) {
	navigator.app.loadUrl("http://app.skd.cl:8130/auxiapp/alert/index.php?c=" + codigo, {
		openExternal: true
	});

}

function ChangeTipoMensaje(tipo) {
	if (tipo == "foto") {
		$(".checkbox_tipo").attr('checked', false);
		$("#tipomsg_" + tipo).attr('checked', true);
		window.localStorage.setItem("tipo_msg", tipo);
	} else if (tipo == "geo") {
		$(".checkbox_tipo").attr('checked', false);
		$("#tipomsg_" + tipo).attr('checked', true);
		window.localStorage.setItem("tipo_msg", tipo);
		window.localStorage.setItem("tipo_msg_geo", "on");
	} else {
		$("#tipomsg_" + tipo).attr('checked', false);
		navigator.notification.alert("Tipo de mensaje no disponible en esta versiÃ³n");
	}
}

function SaveTipoMensaje() {
	if (window.localStorage.getItem("modo_registro") == "on") {
		$.mobile.changePage("ajustes-mensaje.html", {
			transition: "none"
		});
	} else {
		$.mobile.changePage("ajustes.html", {
			transition: "none"
		});
	}

}

function GuardaMensaje() {
	//	var asunto = $("#asunto").val();
	var mensaje = $("#mensaje").val();
	//window.localStorage.setItem("asunto",asunto);
	window.localStorage.setItem("mensaje", mensaje);
	if (window.localStorage.getItem("modo_registro") == "on") {
		window.localStorage.setItem("instructivos", "");
		$.mobile.changePage("ajustes-contactos.html", {
			transition: "none"
		});
	} else {
		$.mobile.changePage("ajustes.html", {
			transition: "none"
		});
	}
}

function ContinuarTel() {
	if (window.localStorage.getItem("modo_registro") == "on") {
		$.mobile.changePage("ajustes-contactos.html", {
			transition: "none"
		});
	} else {
		$.mobile.changePage("ajustes.html", {
			transition: "none"
		});
	}
}

function ContinuarContacto() {
	if (window.localStorage.getItem("modo_registro") == "on") {

		window.localStorage.setItem("modo_registro", "off");
		//if (confirm("Para Iniciar la aplicaciÃ³n presione Aceptar\nSi desea continuar con ajustes adicionales presione Cancelar")) {
		window.location.href = 'index.html';
		/*	} else {
			$.mobile.changePage("ajustes.html", { transition: "none"} );
		}
		*/
	} else {
		$.mobile.changePage("ajustes.html", {
			transition: "none"
		});
	}

}

function GuardaTel() {
	var tel = $("#tel").val();
	window.localStorage.setItem("tel", tel);
	$.mobile.changePage("ajustes.html", {
		transition: "none"
	});
}

// Lang Function

function changeLang(newlang) {
	$(".checkboxlang").attr('checked', false);
	$("#lang_" + newlang).attr('checked', true);
	window.localStorage.setItem("idioma", newlang);
	idioma = newlang;

	$.post("http://app.skd.cl:8130/auxiapp/listener.php", {
		caller: "updateidioma",
		uuid: device.uuid,
		idioma: idioma
	}, function (respuesta) {

	});

	LoadLang(newlang, 'ajustes-idiomas');
}

function LoadLang(idioma, page) {
	var count = 0;
	for (var k in window[page][idioma]) {
		count++;
		if (count == 1) {
			var id = window[page][idioma][k];
		} else {
			if (!document.getElementById(k)) {} else {
				$("#" + id + " #" + k).html(window[page][idioma][k]);
				//document.getElementById(k).innerHTML=window[page][idioma][k];
			}
		}
	}
}

function Coordenadas(position) {
	x_latitud = position.coords.latitude;
	x_longitud = position.coords.longitude;
	x_coordenadas = x_latitud + "," + x_longitud;
	//	alert(x_coordenadas);
}

function onErrorb() {
	navigator.notification.alert('onError!');
}

function ChangeFacebook() {
	if ($("#facebook_check").attr('checked')) {
		window.localStorage.setItem("facebook", "on");
	} else {
		window.localStorage.setItem("facebook", "off");

	}
	//navigator.notification.alert(window.localStorage.getItem("facebook"));
}

function SaveLang() {
	$.mobile.changePage("ajustes.html", {
		transition: "none"
	});
}

function SaveFacebook() {
	if (window.localStorage.getItem("facebook") == "on") {
		document.location.href = "facebook.html?codigo=test"
	} else {
		$.mobile.changePage("ajustes.html", {
			transition: "none"
		});
	}
}

function ContinuarEmergencia() {
	var codigo = $("#codigo_em").val();
	if (window.localStorage.getItem("facebook") == "on") {
		document.location.href = "facebook.html" + "?codigo=" + codigo
	} else {
		window.location.href = 'index.html'
	}

}

function ObtenerIdUsuario() {
	$.mobile.showPageLoadingMsg();
	var x_info = $("#info").val();

	$.post("http://app.skd.cl:8130/auxiapp/listener.php", {
		caller: "obtener_id",
		uuid: device.uuid
	}, function (respuesta) {
		$.mobile.hidePageLoadingMsg();
		if (respuesta != "" && window.localStorage.getItem("nombre") != null) {
			id_usuario = respuesta;
			window.localStorage.setItem("id_usuario", id_usuario);
		} else {
			// Creamos un flag hasta que complete el registro de configuracion
			window.localStorage.setItem("modo_registro", "on");

			if (window.localStorage.getItem("instructivos") == "" || window.localStorage.getItem("instructivos") == null) {
				if (idioma != "") {
					var extension_idioma = '_' + idioma;
				} else {
					var extension_idioma = '';
				}
				window.localStorage.setItem("instructivos", "ok");
				window.location.href = 'instructivos/index' + extension_idioma + '.html';

			} else {

				$.mobile.changePage("ajustes-datos.html", {
					transition: "none"
				});
			}
		}
	});
}

function cleanPhoneNumber(tel) {
	return str_replace(" ", "", tel );
}


function str_replace(busca, repla, orig){
	str 	= new String(orig);
	rExp	= "/"+busca+"/g";
	rExp	= eval(rExp);
	newS	= String(repla);
	str = new String(str.replace(rExp, newS));
	return str;
}






var slider;
$(function(){
	slider = $('div.flexslider').flexslider({
		directionNav: false,
		slideshow: false,
		after: function(){
			var titulo = $('div.flexslider ul.slides li.flex-active-slide').find('div.caption').attr('data-titulo');
			var bajada = $('div.flexslider ul.slides li.flex-active-slide').find('div.caption').attr('data-title');
			$('#header div.info h2.subtitulo').hide().text(titulo).fadeIn();
			$('#header div.info p.bajada').hide().text(bajada).fadeIn();
		}
	});
});





var slider;
$(function(){
	slider = $('div.flexslider').flexslider({
		directionNav: false,
		slideshow: false,
		after: function(){
			var titulo = $('div.flexslider ul.slides li.flex-active-slide').find('div.caption').attr('data-titulo');
			var bajada = $('div.flexslider ul.slides li.flex-active-slide').find('div.caption').attr('data-title');
			$('#header div.info h2.subtitulo').hide().text(titulo).fadeIn();
			$('#header div.info p.bajada').hide().text(bajada).fadeIn();
		}
	});
});





var slider;
$(function(){
	slider = $('div.flexslider').flexslider({
		directionNav: false,
		slideshow: false,
		after: function(){
			var titulo = $('div.flexslider ul.slides li.flex-active-slide').find('div.caption').attr('data-titulo');
			var bajada = $('div.flexslider ul.slides li.flex-active-slide').find('div.caption').attr('data-title');
			$('#header div.info h2.subtitulo').hide().text(titulo).fadeIn();
			$('#header div.info p.bajada').hide().text(bajada).fadeIn();
		}
	});
});





var slider;
$(function(){
	slider = $('div.flexslider').flexslider({
		directionNav: false,
		slideshow: false,
		after: function(){
			var titulo = $('div.flexslider ul.slides li.flex-active-slide').find('div.caption').attr('data-titulo');
			var bajada = $('div.flexslider ul.slides li.flex-active-slide').find('div.caption').attr('data-title');
			$('#header div.info h2.subtitulo').hide().text(titulo).fadeIn();
			$('#header div.info p.bajada').hide().text(bajada).fadeIn();
		}
	});
});





var slider;
$(function(){
	slider = $('div.flexslider').flexslider({
		directionNav: false,
		slideshow: false,
		after: function(){
			var bajada = $('div.flexslider ul.slides li.flex-active-slide').find('div.caption').attr('data-title');
			$('#header div.info p.bajada').hide().text(bajada).fadeIn();
		}
	});
});

