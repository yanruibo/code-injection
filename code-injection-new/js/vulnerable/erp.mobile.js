








 
var map;
var marker;
var infowindow;
var watchID;
 
$(document).ready(function(){
    document.addEventListener("deviceready", onDeviceReady, false);
    //for testing in Chrome browser uncomment
    //onDeviceReady();
});
 
//PhoneGap is ready function
function onDeviceReady() {
    $(window).unbind();
    $(window).bind('pageshow resize orientationchange', function(e){
        max_height();
    });
    max_height();
    google.load("maps", "3.8", {"callback": map, other_params: "sensor=true&language=en"});
}
 
function max_height(){
    var h = $('div[data-role="header"]').outerHeight(true);
    var f = $('div[data-role="footer"]').outerHeight(true);
    var w = $(window).height();
    var c = $('div[data-role="content"]');
    var c_h = c.height();
    var c_oh = c.outerHeight(true);
    var c_new = w - h - f - c_oh + c_h;
    var total = h + f + c_oh;
    if(c_h<c.get(0).scrollHeight){
        c.height(c.get(0).scrollHeight);
    }else{
        c.height(c_new);
    }
}
 
function map(){
    var latlng = new google.maps.LatLng(55.17, 23.76);
    var myOptions = {
      zoom: 6,
      center: latlng,
      streetViewControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);
 
    google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
        //get geoposition once
        //navigator.geolocation.getCurrentPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
        //watch for geoposition change
        watchID = navigator.geolocation.watchPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
    });
}
 
function geo_error(error){
    //comment
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}
 
function geo_success(position) {
 
    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    map.setZoom(15);
 
    var info =
    ('Latitude: '         + position.coords.latitude          + '<br>' +
    'Longitude: '         + position.coords.longitude         + '<br>' +
    'Altitude: '          + position.coords.altitude          + '<br>' +
    'Accuracy: '          + position.coords.accuracy          + '<br>' +
    'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br>' +
    'Heading: '           + position.coords.heading           + '<br>' +
    'Speed: '             + position.coords.speed             + '<br>' +
    'Timestamp: '         + new Date(position.timestamp));
 
    var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    if(!marker){
        //create marker
        marker = new google.maps.Marker({
            position: point,
            map: map
        });
    }else{
        //move marker to new position
        marker.setPosition(point);
    }
    if(!infowindow){
        infowindow = new google.maps.InfoWindow({
            content: info
        });
    }else{
        infowindow.setContent(info);
    }
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
}









	function contact(id) {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/contact/1/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "#homeList1";

		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res.result, function(index, result) {
						$(contentId).append(
								'<li><a href="#contactPart" onclick="contact('
										+ result + ')">' + result
										+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}


	function recherche() {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/allPartner/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "#homeList";

		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res.result, function(index, result) {

						$(contentId).append(
								'<li><a href="#contactPart" onclick=contact(\"'
										+ result + '")>' + result
										+ '</a></li>\n');
						//alert('<li><a href="#contactPart" onclick="contact("+result+")">' + result
						//	+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}


	function connect() {

		$
				.ajax({
					type : 'POST',
					url : "http://192.168.1.12:8090/restWs/restful-services/sampleservice/connect",
					data : {
						'user' : document.getElementById("user").value,
						'pass' : document.getElementById("pass").value
					},
					contentType : 'application/json',
					dataType : 'json',
					success : function(data) {
						var Object = eval('(' + JSON.stringify(data) + ')');
						var verif = Object.connection;
						if (verif) {
							alert('Bienvenu  '
									+ document.getElementById("user").value)
							window.location = "#Menu"
						} else

							alert('Fail');
					}
				});
		window.location = "#Menu"
	}



    // Attendre que PhoneGap soit prêt
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap est prêt
    //
    function onDeviceReady() {
    	alert('ready');
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    // Fonction de callback onSuccess, reçoit un objet Position
    //
    function onSuccess(position) {
    	alert('ok');
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude : '                + position.coords.latitude          + '<br/>' +
                            'Longitude : '               + position.coords.longitude         + '<br/>' +
                            'Altitude : '                + position.coords.altitude          + '<br/>' +
                            'Précision : '               + position.coords.accuracy          + '<br/>' +
                            'Précision de laltitude :' + position.coords.altitudeAccuracy  + '<br/>' +
                            'Direction : '               + position.coords.heading           + '<br/>' +
                            'Vitesse : '                 + position.coords.speed             + '<br/>';
    }

    // Fonction de callback onError, reçoit un objet PositionError
    //
    function onError(error) {
    	alert('non');
        alert('code : '    + error.code    + '\n' +
              'message : ' + error.message + '\n');
    }

    

var deviceInfo = function() {
    document.getElementById("platform").innerHTML = device.platform;
    document.getElementById("version").innerHTML = device.version;
    document.getElementById("uuid").innerHTML = device.uuid;
    document.getElementById("name").innerHTML = device.name;
    document.getElementById("width").innerHTML = screen.width;
    document.getElementById("height").innerHTML = screen.height;
    document.getElementById("colorDepth").innerHTML = screen.colorDepth;
};

var getLocation = function() {
    var suc = function(p) {
        alert(p.coords.latitude + " " + p.coords.longitude);
    };
    var locFail = function() {
    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};

var beep = function() {
    navigator.notification.beep(2);
};

var vibrate = function() {
    navigator.notification.vibrate(0);
};

function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

var accelerationWatch = null;

function updateAcceleration(a) {
    document.getElementById('x').innerHTML = roundNumber(a.x);
    document.getElementById('y').innerHTML = roundNumber(a.y);
    document.getElementById('z').innerHTML = roundNumber(a.z);
}

var toggleAccel = function() {
    if (accelerationWatch !== null) {
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : ""
        });
        accelerationWatch = null;
    } else {
        var options = {};
        options.frequency = 1000;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                }, options);
    }
};

var preventBehavior = function(e) {
    e.preventDefault();
};

function dump_pic(data) {
    var viewport = document.getElementById('viewport');
    console.log(data);
    viewport.style.display = "";
    viewport.style.position = "absolute";
    viewport.style.top = "10px";
    viewport.style.left = "10px";
    document.getElementById("test_img").src = "data:image/jpeg;base64," + data;
}

function fail(msg) {
    alert(msg);
}

function show_pic() {
    navigator.camera.getPicture(dump_pic, fail, {
        quality : 50
    });
}

function close() {
    var viewport = document.getElementById('viewport');
    viewport.style.position = "relative";
    viewport.style.display = "none";
}

function contacts_success(contacts) {
    alert(contacts.length
            + ' contacts returned.'
            + (contacts[2] && contacts[2].name ? (' Third contact is ' + contacts[2].name.formatted)
                    : ''));
}

function get_contacts() {
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    navigator.contacts.find(
            [ "displayName", "name" ], contacts_success,
            fail, obj);
}

function check_network() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    confirm('Connection type:\n ' + states[networkState]);
}

var watchID = null;

function updateHeading(h) {
    document.getElementById('h').innerHTML = h.magneticHeading;
}

function toggleCompass() {
    if (watchID !== null) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
        updateHeading({ magneticHeading : "Off"});
    } else {        
        var options = { frequency: 1000 };
        watchID = navigator.compass.watchHeading(updateHeading, function(e) {
            alert('Compass Error: ' + e.code);
        }, options);
    }
}

function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", deviceInfo, true);
}










	function contact(id) {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/contact/1/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "#homeList1";

		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res.result, function(index, result) {
						$(contentId).append(
								'<li><a href="#contactPart" onclick="contact('
										+ result + ')">' + result
										+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}


	function recherche() {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/allPartner/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "#homeList";

		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res.result, function(index, result) {

						$(contentId).append(
								'<li><a href="#contactPart" onclick=contact(\"'
										+ result + '")>' + result
										+ '</a></li>\n');
						//alert('<li><a href="#contactPart" onclick="contact("+result+")">' + result
						//	+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}


	function connect() {

		$
				.ajax({
					type : 'POST',
					url : "http://192.168.1.12:8090/restWs/restful-services/sampleservice/connect",
					data : {
						'user' : document.getElementById("user").value,
						'pass' : document.getElementById("pass").value
					},
					contentType : 'application/json',
					dataType : 'json',
					success : function(data) {
						var Object = eval('(' + JSON.stringify(data) + ')');
						var verif = Object.connection;
						if (verif) {
							alert('Bienvenu  '
									+ document.getElementById("user").value)
							window.location = "#Menu"
						} else

							alert('Fail');
					}
				});
		window.location = "#Menu"
	}


	var map;
	var marker;
	var infowindow;
	var watchID;

	//$(document).ready(function(){
	// document.addEventListener("deviceready", onDeviceReady, false);
	//for testing in Chrome browser uncomment
	//onDeviceReady();
	//});

	//PhoneGap is ready function
	function localiser() {
		$(window).unbind();
		$(window).bind('pageshow resize orientationchange', function(e) {
			max_height();
		});
		max_height();
		google.load("maps", "3.8", {
			"callback" : map,
			other_params : "sensor=true&language=fr"
		});
	}

	function max_height() {
		var h = $('div[data-role="header"]').outerHeight(true);
		var f = $('div[data-role="footer"]').outerHeight(true);
		var w = $(window).height();
		var c = $('div[data-role="content"]');
		var c_h = c.height();
		var c_oh = c.outerHeight(true);
		var c_new = w - h - f - c_oh + c_h;
		var total = h + f + c_oh;
		if (c_h < c.get(0).scrollHeight) {
			c.height(c.get(0).scrollHeight);
		} else {
			c.height(c_new);
		}
	}

	function map() {
		var latlng = new google.maps.LatLng(55.17, 23.76);
		var myOptions = {
			zoom : 6,
			center : latlng,
			streetViewControl : true,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			zoomControl : true
		};
		map = new google.maps.Map(document.getElementById("map"), myOptions);

		google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
			//get geoposition once
			//navigator.geolocation.getCurrentPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
			//watch for geoposition change
			watchID = navigator.geolocation.watchPosition(geo_success,
					geo_error, {
						maximumAge : 5000,
						timeout : 5000,
						enableHighAccuracy : true
					});
		});
	}

	function geo_error(error) {
		//comment
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}

	function geo_success(position) {

		map.setCenter(new google.maps.LatLng(position.coords.latitude,
				position.coords.longitude));
		map.setZoom(15);

		var info = ('Latitude: ' + position.coords.latitude + '<br>'
				+ 'Longitude: ' + position.coords.longitude + '<br>'
				+ 'Altitude: ' + position.coords.altitude + '<br>'
				+ 'Accuracy: ' + position.coords.accuracy + '<br>'
				+ 'Altitude Accuracy: ' + position.coords.altitudeAccuracy
				+ '<br>' + 'Heading: ' + position.coords.heading + '<br>'
				+ 'Speed: ' + position.coords.speed + '<br>' + 'Timestamp: ' + new Date(
				position.timestamp));

		var point = new google.maps.LatLng(position.coords.latitude,
				position.coords.longitude);
		if (!marker) {
			//create marker
			marker = new google.maps.Marker({
				position : point,
				map : map
			});
		} else {
			//move marker to new position
			marker.setPosition(point);
		}
		if (!infowindow) {
			infowindow = new google.maps.InfoWindow({
				content : info
			});
		} else {
			infowindow.setContent(info);
		}
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
		});
	}


	// Attendre que PhoneGap soit prêt
	//
	//document.addEventListener("deviceready", onDeviceReady, false);

	// PhoneGap est prêt
	//
	function chargerContactImport() {
		var fields = [ "*" ];
		navigator.contacts.find(fields, onSuccess, onError, options);
	}

	function onSuccess(contacts) {
		var contentId = "#contactTelListImp";

		$(contentId + ' li').remove();
		$(contentId).append(' <legend> Choose as many snacks as you d like:</legend <input type="checkbox" name="checkbox-1a" id="checkbox-1a"class="custom" /> <label for="checkbox-1a">Cheetos</label> <inputtype="checkbox" name="checkbox-2a" id="checkbox-2a" class="custom" /> ');
		for ( var i = 0; i < contacts.length; i++) {

			$(contentId).append(
					'<li><a href="#contactTelDetail">'
							+ contacts[i].name.formatted + '</a></li>\n');
			//$(contentId).append('<li><a href="#contactTel">'+ contacts[i].phoneNumbers+ '</a></li>\n');
			//$(contentId).append('<li><a href="#contactTel">'+ contacts[i].emails+  contacts[i].addresses+ '</a></li>\n');
		}
		$(contentId).append('</ul>');
		$(contentId).listview('refresh')

		// console.log("Nom d'affichage = " + contacts[i].displayName);
	}

	function onError(contactError) {
		alert('onError!');
	}



	var pictureSource; // source de l'image
	var destinationType; // définit le format de la valeur retournée
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;
	}

	// Appelé lorsqu'une photo est bien récupérée
	//
	function onPhotoDataSuccess(imageData) {
		// Décommentez pour voir le flux image encodé en Base64
		// console.log(imageData);

		// Récupérer l'élément image du DOM
		//
		// baddaltha:  var smallImage = document.getElementById('smallImage');
		var smallImage = document.getElementById('samllImage');
		// Rendre visible l'élément image
		//
		smallImage.style.display = 'block';

		// Injecter la photo dans l'élément image
		// Les règles CSS servent à redimensionner l'image
		//
		smallImage.src = "data:image/jpeg;base64," + imageData;
	}

	// Appelé lorsqu'une photo est bien récupérée
	//
	function onPhotoURISuccess(imageURI) {
		// Décommentez pour voir l'URI du fichier image
		// console.log(imageURI);

		// Récupérer l'élément image du DOM
		//
		var largeImage = document.getElementById('largeImage');

		// Rendre visible l'élément image
		//
		largeImage.style.display = 'block';

		// Injecter la photo dans l'élément image
		// Les règles CSS servent à redimensionner l'image
		//
		largeImage.src = imageURI;
	}

	// Un bouton déclenchera l'appel de cette fonction
	//
	function capturePhoto() {
		// Prendre une photo avec l'appareil photo du mobile et récupérer l'image sous forme de flux encodé en Base64
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
			quality : 50
		});
	}

	// Un bouton déclenchera l'appel de cette fonction
	//
	function capturePhotoEdit() {
		// Prendre une photo avec l'appareil photo du mobile, autoriser son édition, et récupérer l'image sous forme de flux encodé en Base64
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
			quality : 20,
			allowEdit : true
		});
	}

	// Un bouton déclenchera l'appel de cette fonction
	//
	function getPhoto(source) {
		// Récupérer l'URI d'un fichier image à partir de la source spécifiée
		navigator.camera.getPicture(onPhotoURISuccess, onFail, {
			quality : 50,
			destinationType : destinationType.FILE_URI,
			sourceType : source
		});
	}

	// Appelé lorsque quelque chose ne tourne pas rond
	// 
	function onFail(message) {
		alert('Echec car : ' + message);
	}


	function fermer() {
		navigator.app.exitApp();
	}



    // Attendre que PhoneGap soit prêt
    //
    //document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap est prêt
    //
    function trouverContact() {
        // Rechercher tous les contacts qui ont 'Bob' dans l'un de leurs champs de nom
        //var options = new ContactFindOptions();
        //options.filter="Bob"; 
        var fields = ["*"];
        navigator.contacts.find(fields, onSuccess, onError, options);
    }

    // onSuccess: Afficher le nom de tous les contacts trouvés
    //
    function onSuccess(contacts) {
    	var contentId = "#contactTelList";

        	$(contentId + ' li').remove();
        	
			$(contentId).append(
					'<ul data-role="listview" data-filter="true">');
		     for (var i=0; i<contacts.length; i++) {
                
				$(contentId).append('<li><a href="#contactTelDetail">' + contacts[i].name.formatted + '</a></li>\n');
				//$(contentId).append('<li><a href="#contactTel">'+ contacts[i].phoneNumbers+ '</a></li>\n');
	            //$(contentId).append('<li><a href="#contactTel">'+ contacts[i].emails+  contacts[i].addresses+ '</a></li>\n');
            }
			$(contentId).append('</ul>');
			$(contentId).listview('refresh')
		

           // console.log("Nom d'affichage = " + contacts[i].displayName);
        }
    
    function onError(contactError) {
        alert('onError!');
    }

    


        // Attendre que PhoneGap soit prêt
        //
        document.addEventListener("deviceready", onDeviceReady, false);

        // PhoneGap est prêt
        //
        function onDeviceReady() {

            // Récupérer l'URI d'un fichier image à partir de la source spécifiée

			console.log(imageURI);
            navigator.camera.getPicture(uploadPhoto,
                                        function(message) { alert('Echec de récupération du fichier'); },
                                        { quality: 50, 
                                        destinationType: navigator.camera.DestinationType.FILE_URI,
                                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
                                        );

        }

        function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, "http://un.serveur.com/upload.php", win, fail, options);
        }

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Réponse = " + r.response);
            console.log("Envoyé = " + r.bytesSent);
        }

        function fail(error) {
            alert("Une erreur est survenue : Code = " + error.code);
        }

        









	function contact(id) {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/contact/1/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "#homeList1";

		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res.result, function(index, result) {
						$(contentId).append(
								'<li><a href="#contactPart" onclick="contact('
										+ result + ')">' + result
										+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}


	function recherche() {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/allPartner/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "#homeList";

		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res.result, function(index, result) {

						$(contentId).append(
								'<li><a href="#contactPart" onclick=contact(\"'
										+ result + '")>' + result
										+ '</a></li>\n');
						//alert('<li><a href="#contactPart" onclick="contact("+result+")">' + result
						//	+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}


	function connect() {

		$
				.ajax({
					type : 'POST',
					url : "http://192.168.1.12:8090/restWs/restful-services/sampleservice/connect",
					data : {
						'user' : document.getElementById("user").value,
						'pass' : document.getElementById("pass").value
					},
					contentType : 'application/json',
					dataType : 'json',
					success : function(data) {
						var Object = eval('(' + JSON.stringify(data) + ')');
						var verif = Object.connection;
						if (verif) {
							alert('Bienvenu  '
									+ document.getElementById("user").value)
							window.location = "#Menu"
						} else

							alert('Fail');
					}
				});
		window.location = "#Menu"
	}


 
var map;
var marker;
var infowindow;
var watchID;
 
//$(document).ready(function(){
   // document.addEventListener("deviceready", onDeviceReady, false);
    //for testing in Chrome browser uncomment
    //onDeviceReady();
//});
 
//PhoneGap is ready function
function localiser() {
	alert('cibn');
    $(window).unbind();
    $(window).bind('pageshow resize orientationchange', function(e){
        max_height();
    });
    max_height();
    google.load("maps", "3.8", {"callback": map, other_params: "sensor=true&language=fr"});
}
 
function max_height(){
    var h = $('div[data-role="header"]').outerHeight(true);
    var f = $('div[data-role="footer"]').outerHeight(true);
    var w = $(window).height();
    var c = $('div[data-role="content"]');
    var c_h = c.height();
    var c_oh = c.outerHeight(true);
    var c_new = w - h - f - c_oh + c_h;
    var total = h + f + c_oh;
    if(c_h<c.get(0).scrollHeight){
        c.height(c.get(0).scrollHeight);
    }else{
        c.height(c_new);
    }
}
 
function map(){
    var latlng = new google.maps.LatLng(55.17, 23.76);
    var myOptions = {
      zoom: 6,
      center: latlng,
      streetViewControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);
 
    google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
        //get geoposition once
        //navigator.geolocation.getCurrentPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
        //watch for geoposition change
        watchID = navigator.geolocation.watchPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
    });
}
 
function geo_error(error){
    //comment
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}
 
function geo_success(position) {
 
    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    map.setZoom(15);
 
    var info =
    ('Latitude: '         + position.coords.latitude          + '<br>' +
    'Longitude: '         + position.coords.longitude         + '<br>' +
    'Altitude: '          + position.coords.altitude          + '<br>' +
    'Accuracy: '          + position.coords.accuracy          + '<br>' +
    'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br>' +
    'Heading: '           + position.coords.heading           + '<br>' +
    'Speed: '             + position.coords.speed             + '<br>' +
    'Timestamp: '         + new Date(position.timestamp));
 
    var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    if(!marker){
        //create marker
        marker = new google.maps.Marker({
            position: point,
            map: map
        });
    }else{
        //move marker to new position
        marker.setPosition(point);
    }
    if(!infowindow){
        infowindow = new google.maps.InfoWindow({
            content: info
        });
    }else{
        infowindow.setContent(info);
    }
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
}



    // Attendre que PhoneGap soit prêt
    //
    //document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap est prêt
    //
    function trouverContact() {
        // Rechercher tous les contacts qui ont 'Bob' dans l'un de leurs champs de nom
        //var options = new ContactFindOptions();
        //options.filter="Bob"; 
        var fields = ["*"];
        navigator.contacts.find(fields, onSuccess, onError, options);
    }

    // onSuccess: Afficher le nom de tous les contacts trouvés
    //
    function onSuccess(contacts) {
    	alert('ok');
    	var contentId = "#contactTelList";

        	$(contentId + ' li').remove();
        	
			$(contentId).append(
					'<ul data-role="listview" data-filter="true">');
		     for (var i=0; i<contacts.length; i++) {
                
				$(contentId).append('<li><a href="#contactTelDetail">' + contacts[i].name.formatted + '</a></li>\n');
				//$(contentId).append('<li><a href="#contactTel">'+ contacts[i].phoneNumbers+ '</a></li>\n');
	            //$(contentId).append('<li><a href="#contactTel">'+ contacts[i].emails+  contacts[i].addresses+ '</a></li>\n');
            }
			$(contentId).append('</ul>');
			$(contentId).listview('refresh')
		

           // console.log("Nom d'affichage = " + contacts[i].displayName);
        }
    
    function onError(contactError) {
        alert('onError!');
    }

    

  
    var pictureSource;   // source de l'image
    var destinationType; // définit le format de la valeur retournée
    document.addEventListener("deviceready",onDeviceReady,false);
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Appelé lorsqu'une photo est bien récupérée
    //
    function onPhotoDataSuccess(imageData) {
      // Décommentez pour voir le flux image encodé en Base64
      // console.log(imageData);

      // Récupérer l'élément image du DOM
      //
    // baddaltha:  var smallImage = document.getElementById('smallImage');
      var smallImage = document.getElementById('samllImage');
      // Rendre visible l'élément image
      //
      smallImage.style.display = 'block';

      // Injecter la photo dans l'élément image
      // Les règles CSS servent à redimensionner l'image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Appelé lorsqu'une photo est bien récupérée
    //
    function onPhotoURISuccess(imageURI) {
      // Décommentez pour voir l'URI du fichier image
      // console.log(imageURI);

      // Récupérer l'élément image du DOM
      //
      var largeImage = document.getElementById('largeImage');

      // Rendre visible l'élément image
      //
      largeImage.style.display = 'block';

      // Injecter la photo dans l'élément image
      // Les règles CSS servent à redimensionner l'image
      //
      largeImage.src = imageURI;
    }

    // Un bouton déclenchera l'appel de cette fonction
    //
    function capturePhoto() {
      // Prendre une photo avec l'appareil photo du mobile et récupérer l'image sous forme de flux encodé en Base64
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
    }

    // Un bouton déclenchera l'appel de cette fonction
    //
    function capturePhotoEdit() {
      // Prendre une photo avec l'appareil photo du mobile, autoriser son édition, et récupérer l'image sous forme de flux encodé en Base64
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true }); 
    }

    // Un bouton déclenchera l'appel de cette fonction
    //
    function getPhoto(source) {
      // Récupérer l'URI d'un fichier image à partir de la source spécifiée
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Appelé lorsque quelque chose ne tourne pas rond
    // 
    function onFail(message) {
      alert('Echec car : ' + message);
    }
    

function fermer() {
navigator.app.exitApp();
}










	function commande(type) {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/commande/"
				+ type + "/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "";
		if(type=="Achat"){contentId = "#lstcommandea";}
		else if(type=="Vente"){contentId = "#lstcommandev";}
		var s = "";
	    
		$.getJSON(urlI,function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res, function(index, res) {
                         s= '<li><a href="#detailCommande'+type+'"  onclick=detailcommande(\"'+ res.id + '","'+ type +'")>' + res.reference+ '</a></li>\n'
						$(contentId).append(s);
						//alert('<li><a href="#contactPart" onclick="contact("+result+")">' + result
						//	+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}
	function detailcommande(id,type) {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/detailcommande/"
				+ id + "/"+ type +"/?callback=?"

             

		$.getJSON(urlI, function(res) {
			$.each(res, function(index, res) {
                  
				if(type=="Achat"){
			
				document.getElementById('referencea').value = res.reference;
				document.getElementById('datea').value = res.date;
				document.getElementById('PartIda').value = res.PartId;
				document.getElementById('mnthta').value = res.mntht;
				document.getElementById('mntttca').value = res.mntttc;
				document.getElementById('taxea').value =res.mntttc -res.mntht;
				 if (res.etat=="draft") {
			    	 document.getElementById('etata')[0].selected = "1";
				       }
			       else if(res.etat=="approved"){
			    	  document.getElementById('etata')[1].selected = "1";
			    	   //$("#etat").selectedIndex=3;
			       }
			      $("#etata").selectmenu("refresh");
				}
				else if(type=="Vente"){
					document.getElementById('reference').value = res.reference;
					document.getElementById('datev').value = res.date;
					document.getElementById('PartId').value = res.PartId;
					document.getElementById('mntht').value = res.mntht;
					document.getElementById('mntttc').value = res.mntttc;
					document.getElementById('taxev').value =res.mntttc -res.mntht;
				      if (res.etat=="draft") {
				    	 document.getElementById('etatv')[0].selected = "1";
					       }
				        
					
				       else if(res.etat=="manual"){
				    	  document.getElementById('etatv')[1].selected = "1";
				    	   //$("#etat").selectedIndex=3;
				       }
				   
				     
				  	
				       else if(res.etat=="progress"){
				    	  document.getElementById('etatv')[2].selected = "1";
				    	   //$("#etat").selectedIndex=3;
				       }
				   
				      $("#etatv").selectmenu("refresh");
			      }
			});

		});
       
	}


	function contact(id) {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/contact/"
				+ id + "/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "#homeList1";

		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res, function(index, res) {

						$(contentId).append(
								'<li><a href="#detailcontact" onclick=detailcontact(\"'
										+ res.id + '")>' + res.nom
										+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}

	function detailcontact(id) {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/detailcontact/"
				+ id + "/?callback=?"

		var pageId = "#detailcontact";
		var contentId = "#homeList1";

		$.getJSON(urlI, function(res) {
			$.each(res, function(index, res) {
		         
				document.getElementById('name').value = res.nom;
				document.getElementById('tel').value = res.tel;
				document.getElementById('telp').value = res.telp;
				document.getElementById('adresse').value = res.rue + " "
						+ res.ville + " " + res.pays;
				document.getElementById('codepostal').value = res.codePostal;
				document.getElementById('fax').value = res.fax;
				document.getElementById('mail').value = res.mail;
			
				document.getElementById('titre').value = res.titre;
			      if (res.etat==1) {
					   $("#etat").val('c');
				       }
			           $("#etat").slider('refresh');

			});

		});

	}


	function partenaire(type) {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/allPartner/"
				+ type + "/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "#homeList";

		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res, function(index, res) {

						$(contentId).append(
								'<li><a href="#detailpartenaire" onclick=detailpartenaire(\"'
										+ res.id + '")>' + res.nom
										+ '</a></li>\n');
						//alert('<li><a href="#contactPart" onclick="contact("+result+")">' + result
						//	+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}
	function detailpartenaire(id) {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/detailpartenaire/"
				+ id + "/?callback=?"

		var contentId = "#homeList1";

		$.getJSON(urlI, function(res) {
			$.each(res, function(index, res) {

				document.getElementById('namep').value = res.nom;
				document.getElementById('date').value = res.date;
				document.getElementById('site').value = res.site;
			    document.getElementById('lstcontact').onclick = function () { contact(res.id); } 
			       if (res.fournisseur==1) {
				   $("#fournisseur").val('f');
			       }
			       if (res.client==1) {
				   $("#client").val('c');
			       }
		           $("#fournisseur").slider('refresh');
		           $("#client").slider('refresh');
			
			
			});

		});
       
	}


var i=0;
	function connect() {
              
              
              if (document.getElementById("user").value=="" )
              { alert('Veuillez entrer votre login');}
              else if (document.getElementById("pass").value=="" ){alert('Veuillez entrer votre mot de passe');}
              else{
            	  
		$.ajax({
					type : 'POST',
					url : "http://192.168.1.12:8090/restWs/restful-services/sampleservice/connect",
					data : {
						'user' : document.getElementById("user").value,
						'pass' : document.getElementById("pass").value
					},
					contentType : 'application/json',
					dataType : 'json',
					success : function(data) {
						var Object = eval('(' + JSON.stringify(data) + ')');
						var verif = Object.connection;
						if (verif) {
							alert('Bienvenue  '
									+ document.getElementById("user").value)
							window.location = "#Menu"
						} else {
							if (i > 3) {
								alert("L'application va se fermer");
								fermer()
							}
							i = i + 1;
							alert('Le login ou le mot de passe est incorrecte');

						}
					  },
					error : function(){
						alert('La conexion au serveur a échoué!!');
					}
					 
				});

	}}


	var map;
	var marker;
	var infowindow;
	var watchID;

	//$(document).ready(function(){
	// document.addEventListener("deviceready", onDeviceReady, false);
	//for testing in Chrome browser uncomment
	//onDeviceReady();
	//});

	//PhoneGap is ready function
	function localiser() {
		$(window).unbind();
		$(window).bind('pageshow resize orientationchange', function(e) {
			max_height();
		});
		max_height();
		google.load("maps", "3.8", {
			"callback" : map,
			other_params : "sensor=true&language=fr"
		});
	}

	function max_height() {
		var h = $('div[data-role="header"]').outerHeight(true);
		var f = $('div[data-role="footer"]').outerHeight(true);
		var w = $(window).height();
		var c = $('div[data-role="content"]');
		var c_h = c.height();
		var c_oh = c.outerHeight(true);
		var c_new = w - h - f - c_oh + c_h;
		var total = h + f + c_oh;
		if (c_h < c.get(0).scrollHeight) {
			c.height(c.get(0).scrollHeight);
		} else {
			c.height(c_new);
		}
	}

	function map() {
		var latlng = new google.maps.LatLng(55.17, 23.76);
		var myOptions = {
			zoom : 6,
			center : latlng,
			streetViewControl : true,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			zoomControl : true
		};
		map = new google.maps.Map(document.getElementById("map"), myOptions);

		google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
			//get geoposition once
			//navigator.geolocation.getCurrentPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
			//watch for geoposition change
			watchID = navigator.geolocation.watchPosition(geo_success,
					geo_error, {
						maximumAge : 5000,
						timeout : 5000,
						enableHighAccuracy : true
					});
		});
	}

	function geo_error(error) {
		//comment
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}

	function geo_success(position) {

		map.setCenter(new google.maps.LatLng(position.coords.latitude,
				position.coords.longitude));
		map.setZoom(15);

		var info = ('Latitude: ' + position.coords.latitude + '<br>'
				+ 'Longitude: ' + position.coords.longitude + '<br>'
				+ 'Altitude: ' + position.coords.altitude + '<br>'
				+ 'Accuracy: ' + position.coords.accuracy + '<br>'
				+ 'Altitude Accuracy: ' + position.coords.altitudeAccuracy
				+ '<br>' + 'Heading: ' + position.coords.heading + '<br>'
				+ 'Speed: ' + position.coords.speed + '<br>' + 'Timestamp: ' + new Date(
				position.timestamp));

		var point = new google.maps.LatLng(position.coords.latitude,
				position.coords.longitude);
		if (!marker) {
			//create marker
			marker = new google.maps.Marker({
				position : point,
				map : map
			});
		} else {
			//move marker to new position
			marker.setPosition(point);
		}
		if (!infowindow) {
			infowindow = new google.maps.InfoWindow({
				content : info
			});
		} else {
			infowindow.setContent(info);
		}
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
		});
	}


	// Attendre que PhoneGap soit prêt
	//
	//document.addEventListener("deviceready", onDeviceReady, false);

	// PhoneGap est prêt
	//
	function chargerContactImport() {
		var fields = [ "*" ];
		navigator.contacts.find(fields, onSuccess, onError, options);
	}

	function onSuccess(contacts) {
		var contentId = "#contactTelListImp";

		$(contentId + ' li').remove();
		$(contentId)
				.append(
						' <legend> Choose as many snacks as you d like:</legend <input type="checkbox" name="checkbox-1a" id="checkbox-1a"class="custom" /> <label for="checkbox-1a">Cheetos</label> <inputtype="checkbox" name="checkbox-2a" id="checkbox-2a" class="custom" /> ');
		for ( var i = 0; i < contacts.length; i++) {

			$(contentId).append(
					'<li><a href="#contactTelDetail">'
							+ contacts[i].name.formatted + '</a></li>\n');
			//$(contentId).append('<li><a href="#contactTel">'+ contacts[i].phoneNumbers+ '</a></li>\n');
			//$(contentId).append('<li><a href="#contactTel">'+ contacts[i].emails+  contacts[i].addresses+ '</a></li>\n');
		}
		$(contentId).append('</ul>');
		$(contentId).listview('refresh')

		// console.log("Nom d'affichage = " + contacts[i].displayName);
	}

	function onError(contactError) {
		alert('onError!');
	}


	var pictureSource; // source de l'image
	var destinationType; // définit le format de la valeur retournée
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;
	}

	// Appelé lorsqu'une photo est bien récupérée
	//
	function onPhotoDataSuccess(imageData) {
		// Décommentez pour voir le flux image encodé en Base64
		// console.log(imageData);

		// Récupérer l'élément image du DOM
		//
		// baddaltha:  var smallImage = document.getElementById('smallImage');
		var smallImage = document.getElementById('samllImage');
		// Rendre visible l'élément image
		//
		smallImage.style.display = 'block';

		// Injecter la photo dans l'élément image
		// Les règles CSS servent à redimensionner l'image
		//
		smallImage.src = "data:image/jpeg;base64," + imageData;
	}

	// Appelé lorsqu'une photo est bien récupérée
	//
	function onPhotoURISuccess(imageURI) {
		// Décommentez pour voir l'URI du fichier image
		// console.log(imageURI);

		// Récupérer l'élément image du DOM
		//
		var largeImage = document.getElementById('largeImage');

		// Rendre visible l'élément image
		//
		largeImage.style.display = 'block';

		// Injecter la photo dans l'élément image
		// Les règles CSS servent à redimensionner l'image
		//
		largeImage.src = imageURI;
	}

	// Un bouton déclenchera l'appel de cette fonction
	//
	function capturePhoto() {
		// Prendre une photo avec l'appareil photo du mobile et récupérer l'image sous forme de flux encodé en Base64
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
			quality : 50
		});
	}

	// Un bouton déclenchera l'appel de cette fonction
	//
	function capturePhotoEdit() {
		// Prendre une photo avec l'appareil photo du mobile, autoriser son édition, et récupérer l'image sous forme de flux encodé en Base64
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
			quality : 20,
			allowEdit : true
		});
	}

	// Un bouton déclenchera l'appel de cette fonction
	//
	function getPhoto(source) {
		// Récupérer l'URI d'un fichier image à partir de la source spécifiée
		navigator.camera.getPicture(onPhotoURISuccess, onFail, {
			quality : 50,
			destinationType : destinationType.FILE_URI,
			sourceType : source
		});
	}

	// Appelé lorsque quelque chose ne tourne pas rond
	// 
	function onFail(message) {
		alert('Echec car : ' + message);
	}


	function fermer() {
		navigator.app.exitApp();
	}


	// Attendre que PhoneGap soit prêt
	//
	//document.addEventListener("deviceready", onDeviceReady, false);

	// PhoneGap est prêt
	//
	function trouverContact() {
		// Rechercher tous les contacts qui ont 'Bob' dans l'un de leurs champs de nom
		//var options = new ContactFindOptions();
		//options.filter="Bob"; 
		var fields = [ "*" ];
		navigator.contacts.find(fields, onSuccess, onError, options);
	}

	// onSuccess: Afficher le nom de tous les contacts trouvés
	//
	function onSuccess(contacts) {
		var contentId = "#contactTelList";

		$(contentId + ' li').remove();

		$(contentId).append('<ul data-role="listview" data-filter="true">');
		for ( var i = 0; i < contacts.length; i++) {

			$(contentId).append(
					'<li><a href="#contactTelDetail">'
							+ contacts[i].name.formatted + '</a></li>\n');
			//$(contentId).append('<li><a href="#contactTel">'+ contacts[i].phoneNumbers+ '</a></li>\n');
			//$(contentId).append('<li><a href="#contactTel">'+ contacts[i].emails+  contacts[i].addresses+ '</a></li>\n');
		}
		$(contentId).append('</ul>');
		$(contentId).listview('refresh')

		// console.log("Nom d'affichage = " + contacts[i].displayName);
	}

	function onError(contactError) {
		alert('onError!');
	}


	// Attendre que PhoneGap soit prêt
	//
	document.addEventListener("deviceready", onDeviceReady, false);

	// PhoneGap est prêt
	//
	function onDeviceReady() {

		// Récupérer l'URI d'un fichier image à partir de la source spécifiée

		console.log(imageURI);
		navigator.camera.getPicture(uploadPhoto, function(message) {
			alert('Echec de récupération du fichier');
		}, {
			quality : 50,
			destinationType : navigator.camera.DestinationType.FILE_URI,
			sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY
		});

	}

	function uploadPhoto(imageURI) {
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
		options.mimeType = "image/jpeg";

		var params = new Object();
		params.value1 = "test";
		params.value2 = "param";

		options.params = params;

		var ft = new FileTransfer();
		ft.upload(imageURI, "http://un.serveur.com/upload.php", win, fail,
				options);
	}

	function win(r) {
		console.log("Code = " + r.responseCode);
		console.log("Réponse = " + r.response);
		console.log("Envoyé = " + r.bytesSent);
	}

	function fail(error) {
		alert("Une erreur est survenue : Code = " + error.code);
	}


	function allproduct(type) {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/allProduct/"
				+ type + "/?callback=?"

		var contentId = "#homeListProd";

		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res, function(index, res) {

						$(contentId).append(
								'<li><a href="#detailproduct" onclick=detailproduct(\"'
										+ res.id + '")>' + res.nom
										+ '</a></li>\n');
						//alert('<li><a href="#contactPart" onclick="contact("+result+")">' + result
						//	+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}
	function detailproduct(id) {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/detailproduct/"
				+ id + "/?callback=?"

		var contentId = "#homeList1";

		$.getJSON(urlI, function(res) {
			$.each(res, function(index, res) {

				document.getElementById('namep').value = res.nom;
				document.getElementById('fournisseur').value = res.fournisseur;
				document.getElementById('client').value = res.client;
				document.getElementById('date').value = res.date;
				document.getElementById('site').value = res.site;

			});

		});

	}










	function contact(id) {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/contact/1/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "#homeList1";

		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res.result, function(index, result) {
						$(contentId).append(
								'<li><a href="#contactPart" onclick="contact('
										+ result + ')">' + result
										+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}


	function recherche() {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/allPartner/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "#homeList";

		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res.result, function(index, result) {

						$(contentId).append(
								'<li><a href="#contactPart" onclick=contact(\"'
										+ result + '")>' + result
										+ '</a></li>\n');
						//alert('<li><a href="#contactPart" onclick="contact("+result+")">' + result
						//	+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}


	function connect() {

		$
				.ajax({
					type : 'POST',
					url : "http://192.168.1.12:8090/restWs/restful-services/sampleservice/connect",
					data : {
						'user' : document.getElementById("user").value,
						'pass' : document.getElementById("pass").value
					},
					contentType : 'application/json',
					dataType : 'json',
					success : function(data) {
						var Object = eval('(' + JSON.stringify(data) + ')');
						var verif = Object.connection;
						if (verif) {
							alert('Bienvenu  '
									+ document.getElementById("user").value)
							window.location = "#Menu"
						} else

							alert('Fail');
					}
				});
		window.location = "#Menu"
	}


	var map;
	var marker;
	var infowindow;
	var watchID;

	//$(document).ready(function(){
	// document.addEventListener("deviceready", onDeviceReady, false);
	//for testing in Chrome browser uncomment
	//onDeviceReady();
	//});

	//PhoneGap is ready function
	function localiser() {
		$(window).unbind();
		$(window).bind('pageshow resize orientationchange', function(e) {
			max_height();
		});
		max_height();
		google.load("maps", "3.8", {
			"callback" : map,
			other_params : "sensor=true&language=fr"
		});
	}

	function max_height() {
		var h = $('div[data-role="header"]').outerHeight(true);
		var f = $('div[data-role="footer"]').outerHeight(true);
		var w = $(window).height();
		var c = $('div[data-role="content"]');
		var c_h = c.height();
		var c_oh = c.outerHeight(true);
		var c_new = w - h - f - c_oh + c_h;
		var total = h + f + c_oh;
		if (c_h < c.get(0).scrollHeight) {
			c.height(c.get(0).scrollHeight);
		} else {
			c.height(c_new);
		}
	}

	function map() {
		var latlng = new google.maps.LatLng(55.17, 23.76);
		var myOptions = {
			zoom : 6,
			center : latlng,
			streetViewControl : true,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			zoomControl : true
		};
		map = new google.maps.Map(document.getElementById("map"), myOptions);

		google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
			//get geoposition once
			//navigator.geolocation.getCurrentPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
			//watch for geoposition change
			watchID = navigator.geolocation.watchPosition(geo_success,
					geo_error, {
						maximumAge : 5000,
						timeout : 5000,
						enableHighAccuracy : true
					});
		});
	}

	function geo_error(error) {
		//comment
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}

	function geo_success(position) {

		map.setCenter(new google.maps.LatLng(position.coords.latitude,
				position.coords.longitude));
		map.setZoom(15);

		var info = ('Latitude: ' + position.coords.latitude + '<br>'
				+ 'Longitude: ' + position.coords.longitude + '<br>'
				+ 'Altitude: ' + position.coords.altitude + '<br>'
				+ 'Accuracy: ' + position.coords.accuracy + '<br>'
				+ 'Altitude Accuracy: ' + position.coords.altitudeAccuracy
				+ '<br>' + 'Heading: ' + position.coords.heading + '<br>'
				+ 'Speed: ' + position.coords.speed + '<br>' + 'Timestamp: ' + new Date(
				position.timestamp));

		var point = new google.maps.LatLng(position.coords.latitude,
				position.coords.longitude);
		if (!marker) {
			//create marker
			marker = new google.maps.Marker({
				position : point,
				map : map
			});
		} else {
			//move marker to new position
			marker.setPosition(point);
		}
		if (!infowindow) {
			infowindow = new google.maps.InfoWindow({
				content : info
			});
		} else {
			infowindow.setContent(info);
		}
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
		});
	}


	// Attendre que PhoneGap soit prêt
	//
	//document.addEventListener("deviceready", onDeviceReady, false);

	// PhoneGap est prêt
	//
	function chargerContactImport() {
		var fields = [ "*" ];
		navigator.contacts.find(fields, onSuccess, onError, options);
	}

	function onSuccess(contacts) {
		var contentId = "#contactTelListImp";

		$(contentId + ' li').remove();
		$(contentId).append(' <legend> Choose as many snacks as you d like:</legend <input type="checkbox" name="checkbox-1a" id="checkbox-1a"class="custom" /> <label for="checkbox-1a">Cheetos</label> <inputtype="checkbox" name="checkbox-2a" id="checkbox-2a" class="custom" /> ');
		for ( var i = 0; i < contacts.length; i++) {

			$(contentId).append(
					'<li><a href="#contactTelDetail">'
							+ contacts[i].name.formatted + '</a></li>\n');
			//$(contentId).append('<li><a href="#contactTel">'+ contacts[i].phoneNumbers+ '</a></li>\n');
			//$(contentId).append('<li><a href="#contactTel">'+ contacts[i].emails+  contacts[i].addresses+ '</a></li>\n');
		}
		$(contentId).append('</ul>');
		$(contentId).listview('refresh')

		// console.log("Nom d'affichage = " + contacts[i].displayName);
	}

	function onError(contactError) {
		alert('onError!');
	}



	var pictureSource; // source de l'image
	var destinationType; // définit le format de la valeur retournée
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;
	}

	// Appelé lorsqu'une photo est bien récupérée
	//
	function onPhotoDataSuccess(imageData) {
		// Décommentez pour voir le flux image encodé en Base64
		// console.log(imageData);

		// Récupérer l'élément image du DOM
		//
		// baddaltha:  var smallImage = document.getElementById('smallImage');
		var smallImage = document.getElementById('samllImage');
		// Rendre visible l'élément image
		//
		smallImage.style.display = 'block';

		// Injecter la photo dans l'élément image
		// Les règles CSS servent à redimensionner l'image
		//
		smallImage.src = "data:image/jpeg;base64," + imageData;
	}

	// Appelé lorsqu'une photo est bien récupérée
	//
	function onPhotoURISuccess(imageURI) {
		// Décommentez pour voir l'URI du fichier image
		// console.log(imageURI);

		// Récupérer l'élément image du DOM
		//
		var largeImage = document.getElementById('largeImage');

		// Rendre visible l'élément image
		//
		largeImage.style.display = 'block';

		// Injecter la photo dans l'élément image
		// Les règles CSS servent à redimensionner l'image
		//
		largeImage.src = imageURI;
	}

	// Un bouton déclenchera l'appel de cette fonction
	//
	function capturePhoto() {
		// Prendre une photo avec l'appareil photo du mobile et récupérer l'image sous forme de flux encodé en Base64
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
			quality : 50
		});
	}

	// Un bouton déclenchera l'appel de cette fonction
	//
	function capturePhotoEdit() {
		// Prendre une photo avec l'appareil photo du mobile, autoriser son édition, et récupérer l'image sous forme de flux encodé en Base64
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
			quality : 20,
			allowEdit : true
		});
	}

	// Un bouton déclenchera l'appel de cette fonction
	//
	function getPhoto(source) {
		// Récupérer l'URI d'un fichier image à partir de la source spécifiée
		navigator.camera.getPicture(onPhotoURISuccess, onFail, {
			quality : 50,
			destinationType : destinationType.FILE_URI,
			sourceType : source
		});
	}

	// Appelé lorsque quelque chose ne tourne pas rond
	// 
	function onFail(message) {
		alert('Echec car : ' + message);
	}


	function fermer() {
		navigator.app.exitApp();
	}



    // Attendre que PhoneGap soit prêt
    //
    //document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap est prêt
    //
    function trouverContact() {
        // Rechercher tous les contacts qui ont 'Bob' dans l'un de leurs champs de nom
        //var options = new ContactFindOptions();
        //options.filter="Bob"; 
        var fields = ["*"];
        navigator.contacts.find(fields, onSuccess, onError, options);
    }

    // onSuccess: Afficher le nom de tous les contacts trouvés
    //
    function onSuccess(contacts) {
    	var contentId = "#contactTelList";

        	$(contentId + ' li').remove();
        	
			$(contentId).append(
					'<ul data-role="listview" data-filter="true">');
		     for (var i=0; i<contacts.length; i++) {
                
				$(contentId).append('<li><a href="#contactTelDetail">' + contacts[i].name.formatted + '</a></li>\n');
				//$(contentId).append('<li><a href="#contactTel">'+ contacts[i].phoneNumbers+ '</a></li>\n');
	            //$(contentId).append('<li><a href="#contactTel">'+ contacts[i].emails+  contacts[i].addresses+ '</a></li>\n');
            }
			$(contentId).append('</ul>');
			$(contentId).listview('refresh')
		

           // console.log("Nom d'affichage = " + contacts[i].displayName);
        }
    
    function onError(contactError) {
        alert('onError!');
    }

    


        // Attendre que PhoneGap soit prêt
        //
        document.addEventListener("deviceready", onDeviceReady, false);

        // PhoneGap est prêt
        //
        function onDeviceReady() {

            // Récupérer l'URI d'un fichier image à partir de la source spécifiée

			console.log(imageURI);
            navigator.camera.getPicture(uploadPhoto,
                                        function(message) { alert('Echec de récupération du fichier'); },
                                        { quality: 50, 
                                        destinationType: navigator.camera.DestinationType.FILE_URI,
                                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
                                        );

        }

        function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, "http://un.serveur.com/upload.php", win, fail, options);
        }

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Réponse = " + r.response);
            console.log("Envoyé = " + r.bytesSent);
        }

        function fail(error) {
            alert("Une erreur est survenue : Code = " + error.code);
        }

        

















     function quickSelect() {
          var bnd = document.getElementById('band').value
          bnd = bnd.toUpperCase()
          if (bnd == "OASIS") {
               document.getElementById('songs')[4].selected = "1"
            	   $("#songs").selectmenu("refresh");
          }
     }



if (document.getElementById('cSave').value!='') {
      for (var idx=0;idx<document.getElementById('country').options.length;idx++) {
            if (document.getElementById('cSave').value==document.getElementById('country').options[idx].value) {
                  document.getElementById('country').selectedIndex=idx;
                        // The next line throws an undefined error.
                        // if the error is trapped with try .. catch, the option is selected
                        // as desired.  I can live with the try .. catch since I get the
                        // action I need, but I would prefer to get the desired action
                        // without the try .. catch block, if possible.
                  document.getElementById('country').options[idx].selected=true;

                        // THIS WORKS BUT I WANT TO GET RID OF THE TRY .. CATCH
                        //try {
                  //      document.getElementById('country').options[idx].selected=true;
                  //}
                  //catch(e) {
                  //      if(e.error!=undefined) {
                        //           alert(e.error);
                  //      }
                  //}
                  break;
            }
      }      
}




	function commande(type) {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/commande/"
				+ type + "/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "";
		if(type=="Achat"){contentId = "#lstcommandea";}
		else if(type=="Vente"){contentId = "#lstcommandev";}
		var s = "";
	    
		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">R?ultat</li>');
					$.each(res, function(index, res) {
                         s= '<li><a href="#detailCommande'+type+'"  onclick=detailcommande(\"'+ res.id + '","'+ type +'")>' + res.reference+ '</a></li>\n'
						$(contentId).append(s);
						//alert('<li><a href="#contactPart" onclick="contact("+result+")">' + result
						//	+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}
	function detailcommande(id,type) {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/detailcommande/"
				+ id + "/"+ type +"/?callback=?"

             

		$.getJSON(urlI, function(res) {
			$.each(res, function(index, res) {
                  
				if(type=="Achat"){
			
				document.getElementById('referencea').value = res.reference;
				document.getElementById('datea').value = res.date;
				document.getElementById('etata').value = res.etat;
				document.getElementById('PartIda').value = res.PartId;
				document.getElementById('mnthta').value = res.mntht;
				document.getElementById('mntttca').value = res.mntttc;
				}
				else if(type=="Vente"){
					document.getElementById('reference').value = res.reference;
					document.getElementById('datev').value = res.date;
					document.getElementById('etat').value = res.etat;
					document.getElementById('PartId').value = res.PartId;
					document.getElementById('mntht').value = res.mntht;
					document.getElementById('mntttc').value = res.mntttc;
				      if (res.etat=="draft") {
				 
				    		        document.myForm.mySelect.options[3].selected = true;
				    		
					       }
				        
					
				       else if(res.etat=="approved"){
				    	   document.etat.options[3].selected = true;
				       }
				      
				      $("#etat").slider('refresh');
			      }
			});

		});
       
	}










	function contact(id) {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/contact/1/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "#homeList1";

		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res.result, function(index, result) {
						$(contentId).append(
								'<li><a href="#contactPart" onclick="contact('
										+ result + ')">' + result
										+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}


	function recherche() {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/allPartner/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "#homeList";

		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res.result, function(index, result) {

						$(contentId).append(
								'<li><a href="#contactPart" onclick=contact(\"'
										+ result + '")>' + result
										+ '</a></li>\n');
						//alert('<li><a href="#contactPart" onclick="contact("+result+")">' + result
						//	+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}


	function connect() {

		$
				.ajax({
					type : 'POST',
					url : "http://192.168.1.12:8090/restWs/restful-services/sampleservice/connect",
					data : {
						'user' : document.getElementById("user").value,
						'pass' : document.getElementById("pass").value
					},
					contentType : 'application/json',
					dataType : 'json',
					success : function(data) {
						var Object = eval('(' + JSON.stringify(data) + ')');
						var verif = Object.connection;
						if (verif) {
							alert('Bienvenu  '
									+ document.getElementById("user").value)
							window.location = "#Menu"
						} else

							alert('Fail');
					}
				});
		window.location = "#Menu"
	}


 
var map;
var marker;
var infowindow;
var watchID;
 
//$(document).ready(function(){
   // document.addEventListener("deviceready", onDeviceReady, false);
    //for testing in Chrome browser uncomment
    //onDeviceReady();
//});
 
//PhoneGap is ready function
function localiser() {
	alert('cibn');
    $(window).unbind();
    $(window).bind('pageshow resize orientationchange', function(e){
        max_height();
    });
    max_height();
    google.load("maps", "3.8", {"callback": map, other_params: "sensor=true&language=fr"});
}
 
function max_height(){
    var h = $('div[data-role="header"]').outerHeight(true);
    var f = $('div[data-role="footer"]').outerHeight(true);
    var w = $(window).height();
    var c = $('div[data-role="content"]');
    var c_h = c.height();
    var c_oh = c.outerHeight(true);
    var c_new = w - h - f - c_oh + c_h;
    var total = h + f + c_oh;
    if(c_h<c.get(0).scrollHeight){
        c.height(c.get(0).scrollHeight);
    }else{
        c.height(c_new);
    }
}
 
function map(){
    var latlng = new google.maps.LatLng(55.17, 23.76);
    var myOptions = {
      zoom: 6,
      center: latlng,
      streetViewControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);
 
    google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
        //get geoposition once
        //navigator.geolocation.getCurrentPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
        //watch for geoposition change
        watchID = navigator.geolocation.watchPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
    });
}
 
function geo_error(error){
    //comment
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}
 
function geo_success(position) {
 
    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    map.setZoom(15);
 
    var info =
    ('Latitude: '         + position.coords.latitude          + '<br>' +
    'Longitude: '         + position.coords.longitude         + '<br>' +
    'Altitude: '          + position.coords.altitude          + '<br>' +
    'Accuracy: '          + position.coords.accuracy          + '<br>' +
    'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br>' +
    'Heading: '           + position.coords.heading           + '<br>' +
    'Speed: '             + position.coords.speed             + '<br>' +
    'Timestamp: '         + new Date(position.timestamp));
 
    var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    if(!marker){
        //create marker
        marker = new google.maps.Marker({
            position: point,
            map: map
        });
    }else{
        //move marker to new position
        marker.setPosition(point);
    }
    if(!infowindow){
        infowindow = new google.maps.InfoWindow({
            content: info
        });
    }else{
        infowindow.setContent(info);
    }
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
}



    // Attendre que PhoneGap soit prêt
    //
    //document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap est prêt
    //
    function trouverContact() {
        // Rechercher tous les contacts qui ont 'Bob' dans l'un de leurs champs de nom
        //var options = new ContactFindOptions();
        //options.filter="Bob"; 
        var fields = ["*"];
        navigator.contacts.find(fields, onSuccess, onError, options);
    }

    // onSuccess: Afficher le nom de tous les contacts trouvés
    //
    function onSuccess(contacts) {
    	alert('ok');
    	var contentId = "#contactTelList";

        	$(contentId + ' li').remove();
        	
			$(contentId).append(
					'<ul data-role="listview" data-filter="true">');
		     for (var i=0; i<contacts.length; i++) {
                
				$(contentId).append('<li><a href="#contactTelDetail">' + contacts[i].name.formatted + '</a></li>\n');
				//$(contentId).append('<li><a href="#contactTel">'+ contacts[i].phoneNumbers+ '</a></li>\n');
	            //$(contentId).append('<li><a href="#contactTel">'+ contacts[i].emails+  contacts[i].addresses+ '</a></li>\n');
            }
			$(contentId).append('</ul>');
			$(contentId).listview('refresh')
		

           // console.log("Nom d'affichage = " + contacts[i].displayName);
        }
    
    function onError(contactError) {
        alert('onError!');
    }

    

  
    var pictureSource;   // source de l'image
    var destinationType; // définit le format de la valeur retournée
    document.addEventListener("deviceready",onDeviceReady,false);
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Appelé lorsqu'une photo est bien récupérée
    //
    function onPhotoDataSuccess(imageData) {
      // Décommentez pour voir le flux image encodé en Base64
      // console.log(imageData);

      // Récupérer l'élément image du DOM
      //
    // baddaltha:  var smallImage = document.getElementById('smallImage');
      var smallImage = document.getElementById('samllImage');
      // Rendre visible l'élément image
      //
      smallImage.style.display = 'block';

      // Injecter la photo dans l'élément image
      // Les règles CSS servent à redimensionner l'image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Appelé lorsqu'une photo est bien récupérée
    //
    function onPhotoURISuccess(imageURI) {
      // Décommentez pour voir l'URI du fichier image
      // console.log(imageURI);

      // Récupérer l'élément image du DOM
      //
      var largeImage = document.getElementById('largeImage');

      // Rendre visible l'élément image
      //
      largeImage.style.display = 'block';

      // Injecter la photo dans l'élément image
      // Les règles CSS servent à redimensionner l'image
      //
      largeImage.src = imageURI;
    }

    // Un bouton déclenchera l'appel de cette fonction
    //
    function capturePhoto() {
      // Prendre une photo avec l'appareil photo du mobile et récupérer l'image sous forme de flux encodé en Base64
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
    }

    // Un bouton déclenchera l'appel de cette fonction
    //
    function capturePhotoEdit() {
      // Prendre une photo avec l'appareil photo du mobile, autoriser son édition, et récupérer l'image sous forme de flux encodé en Base64
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true }); 
    }

    // Un bouton déclenchera l'appel de cette fonction
    //
    function getPhoto(source) {
      // Récupérer l'URI d'un fichier image à partir de la source spécifiée
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Appelé lorsque quelque chose ne tourne pas rond
    // 
    function onFail(message) {
      alert('Echec car : ' + message);
    }
    

function fermer() {
navigator.app.exitApp();
}


var theme;
function couleur() {
theme="a";
//alert(theme);
var rac=document.getElementById("head");
rac.setAttribute('data-theme', 'a');

}









	function contact(id) {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/contact/1/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "#homeList1";

		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res.result, function(index, result) {
						$(contentId).append(
								'<li><a href="#contactPart" onclick="contact('
										+ result + ')">' + result
										+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}


	function recherche() {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/allPartner/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "#homeList";

		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res.result, function(index, result) {

						$(contentId).append(
								'<li><a href="#contactPart" onclick=contact(\"'
										+ result + '")>' + result
										+ '</a></li>\n');
						//alert('<li><a href="#contactPart" onclick="contact("+result+")">' + result
						//	+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}


	function connect() {

		$
				.ajax({
					type : 'POST',
					url : "http://192.168.1.12:8090/restWs/restful-services/sampleservice/connect",
					data : {
						'user' : document.getElementById("user").value,
						'pass' : document.getElementById("pass").value
					},
					contentType : 'application/json',
					dataType : 'json',
					success : function(data) {
						var Object = eval('(' + JSON.stringify(data) + ')');
						var verif = Object.connection;
						if (verif) {
							alert('Bienvenu  '
									+ document.getElementById("user").value)
							window.location = "#Menu"
						} else

							alert('Fail');
					}
				});
		window.location = "#Menu"
	}



    // Attendre que PhoneGap soit prêt
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap est prêt
    //
    function onDeviceReady() {
    	alert('ready');
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    // Fonction de callback onSuccess, reçoit un objet Position
    //
    function onSuccess(position) {
    	alert('ok');
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude : '                + position.coords.latitude          + '<br/>' +
                            'Longitude : '               + position.coords.longitude         + '<br/>' +
                            'Altitude : '                + position.coords.altitude          + '<br/>' +
                            'Précision : '               + position.coords.accuracy          + '<br/>' +
                            'Précision de laltitude :' + position.coords.altitudeAccuracy  + '<br/>' +
                            'Direction : '               + position.coords.heading           + '<br/>' +
                            'Vitesse : '                 + position.coords.speed             + '<br/>';
    }

    // Fonction de callback onError, reçoit un objet PositionError
    //
    function onError(error) {
    	alert('non');
        alert('code : '    + error.code    + '\n' +
              'message : ' + error.message + '\n');
    }

    


    // Appelé lorsque l'opération d'enregistrement est terminée
    //
    function captureSuccess(mediaFiles) {
        var i, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            uploadFile(mediaFiles[i]);
        }       
    }

    // Appelé en cas d'erreur.
    // 
    function captureError(error) {
        var msg = 'Une erreur est survenue pendant lenregistrement : ' + error.code;
        navigator.notification.alert(msg, null, 'Aïe aïe aïe !');
    }

    // Un bouton déclenchera l'appel de cette fonction
    //
    function captureImage() {
    	alert('tlanset sa7bi');
        // Lancer l'application appareil photo du mobile, 
        // permettant à l'utilisateur de prendre jusqu'à 2 photos
        navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 2});
    }

    // Transferer les fichiers vers le serveur
    function uploadFile(mediaFile) {
        var ft = new FileTransfer(),
            path = mediaFile.fullPath,
            name = mediaFile.name;
          alert('gé3ed yab3ath');
        ft.upload(path,"http://un.serveur.com/upload.php",
            function(result) {
                console.log('Réussite du transfert : ' + result.responseCode);
                console.log(result.bytesSent + ' octets envoyés');
            },
            function(error) {
                console.log('Erreur lors du transfert du fichier ' + path + ' : ' + error.code);
            },
            { fileName: name });   
    }

    

  
    var pictureSource;   // source de l'image
    var destinationType; // définit le format de la valeur retournée

    // Attendre que PhoneGap soit prêt
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // PhoneGap est prêt
    //
    function onDeviceReady() {
    	alert('phonegap mrigel');
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Appelé lorsqu'une photo est bien récupérée
    //
    function onPhotoDataSuccess(imageData) {
    	alert('taswira condistion');
      // Décommentez pour voir le flux image encodé en Base64
      // console.log(imageData);

      // Récupérer l'élément image du DOM
      //
    // baddaltha:  var smallImage = document.getElementById('smallImage');
      var smallImage = document.getElementById('samllImage');
      // Rendre visible l'élément image
      //
      smallImage.style.display = 'block';

      // Injecter la photo dans l'élément image
      // Les règles CSS servent à redimensionner l'image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Appelé lorsqu'une photo est bien récupérée
    //
    function onPhotoURISuccess(imageURI) {
    	alert('uri taswira condition');
      // Décommentez pour voir l'URI du fichier image
      // console.log(imageURI);

      // Récupérer l'élément image du DOM
      //
      var largeImage = document.getElementById('largeImage');

      // Rendre visible l'élément image
      //
      largeImage.style.display = 'block';

      // Injecter la photo dans l'élément image
      // Les règles CSS servent à redimensionner l'image
      //
      largeImage.src = imageURI;
    }

    // Un bouton déclenchera l'appel de cette fonction
    //
    function capturePhoto() {
    	alert('yap');
      // Prendre une photo avec l'appareil photo du mobile et récupérer l'image sous forme de flux encodé en Base64
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
    }

    // Un bouton déclenchera l'appel de cette fonction
    //
    function capturePhotoEdit() {
      // Prendre une photo avec l'appareil photo du mobile, autoriser son édition, et récupérer l'image sous forme de flux encodé en Base64
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true }); 
    }

    // Un bouton déclenchera l'appel de cette fonction
    //
    function getPhoto(source) {
      // Récupérer l'URI d'un fichier image à partir de la source spécifiée
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Appelé lorsque quelque chose ne tourne pas rond
    // 
    function onFail(message) {
      alert('Echec car : ' + message);
    }
    









	function contact(id) {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/contact/1/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "#homeList1";

		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res.result, function(index, result) {
						$(contentId).append(
								'<li><a href="#contactPart" onclick="contact('
										+ result + ')">' + result
										+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}


	function recherche() {

		urlI = "http://192.168.1.12:8090/restWs/restful-services/sampleservice/allPartner/?callback=?"

		var pageId = "#Partenaire";
		var contentId = "#homeList";

		$.getJSON(urlI,
				function(res) {

					// Remove all content first
					$(contentId + ' li').remove();

					// Load Data

					$(contentId).append(
							'<ul data-role="listview" data-filter="true">');
					//	$(contentId)
					//.append(
					//	'<li data-role="list-divider"  role="heading">Résultat</li>');
					$.each(res.result, function(index, result) {

						$(contentId).append(
								'<li><a href="#contactPart" onclick=contact(\"'
										+ result + '")>' + result
										+ '</a></li>\n');
						//alert('<li><a href="#contactPart" onclick="contact("+result+")">' + result
						//	+ '</a></li>\n');
					});
					$(contentId).append('</ul>');
					// Reload View
					$(contentId).listview('refresh')
				});

	}


	function connect() {

		$
				.ajax({
					type : 'POST',
					url : "http://192.168.1.12:8090/restWs/restful-services/sampleservice/connect",
					data : {
						'user' : document.getElementById("user").value,
						'pass' : document.getElementById("pass").value
					},
					contentType : 'application/json',
					dataType : 'json',
					success : function(data) {
						var Object = eval('(' + JSON.stringify(data) + ')');
						var verif = Object.connection;
						if (verif) {
							alert('Bienvenu  '
									+ document.getElementById("user").value)
							window.location = "#Menu"
						} else

							alert('Fail');
					}
				});
		window.location = "#Menu"
	}


	var map;
	var marker;
	var infowindow;
	var watchID;

	//$(document).ready(function(){
	// document.addEventListener("deviceready", onDeviceReady, false);
	//for testing in Chrome browser uncomment
	//onDeviceReady();
	//});

	//PhoneGap is ready function
	function localiser() {
		$(window).unbind();
		$(window).bind('pageshow resize orientationchange', function(e) {
			max_height();
		});
		max_height();
		google.load("maps", "3.8", {
			"callback" : map,
			other_params : "sensor=true&language=fr"
		});
	}

	function max_height() {
		var h = $('div[data-role="header"]').outerHeight(true);
		var f = $('div[data-role="footer"]').outerHeight(true);
		var w = $(window).height();
		var c = $('div[data-role="content"]');
		var c_h = c.height();
		var c_oh = c.outerHeight(true);
		var c_new = w - h - f - c_oh + c_h;
		var total = h + f + c_oh;
		if (c_h < c.get(0).scrollHeight) {
			c.height(c.get(0).scrollHeight);
		} else {
			c.height(c_new);
		}
	}

	function map() {
		var latlng = new google.maps.LatLng(55.17, 23.76);
		var myOptions = {
			zoom : 6,
			center : latlng,
			streetViewControl : true,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			zoomControl : true
		};
		map = new google.maps.Map(document.getElementById("map"), myOptions);

		google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
			//get geoposition once
			//navigator.geolocation.getCurrentPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
			//watch for geoposition change
			watchID = navigator.geolocation.watchPosition(geo_success,
					geo_error, {
						maximumAge : 5000,
						timeout : 5000,
						enableHighAccuracy : true
					});
		});
	}

	function geo_error(error) {
		//comment
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}

	function geo_success(position) {

		map.setCenter(new google.maps.LatLng(position.coords.latitude,
				position.coords.longitude));
		map.setZoom(15);

		var info = ('Latitude: ' + position.coords.latitude + '<br>'
				+ 'Longitude: ' + position.coords.longitude + '<br>'
				+ 'Altitude: ' + position.coords.altitude + '<br>'
				+ 'Accuracy: ' + position.coords.accuracy + '<br>'
				+ 'Altitude Accuracy: ' + position.coords.altitudeAccuracy
				+ '<br>' + 'Heading: ' + position.coords.heading + '<br>'
				+ 'Speed: ' + position.coords.speed + '<br>' + 'Timestamp: ' + new Date(
				position.timestamp));

		var point = new google.maps.LatLng(position.coords.latitude,
				position.coords.longitude);
		if (!marker) {
			//create marker
			marker = new google.maps.Marker({
				position : point,
				map : map
			});
		} else {
			//move marker to new position
			marker.setPosition(point);
		}
		if (!infowindow) {
			infowindow = new google.maps.InfoWindow({
				content : info
			});
		} else {
			infowindow.setContent(info);
		}
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
		});
	}


	// Attendre que PhoneGap soit prêt
	//
	//document.addEventListener("deviceready", onDeviceReady, false);

	// PhoneGap est prêt
	//
	function chargerContactImport() {
		var fields = [ "*" ];
		navigator.contacts.find(fields, onSuccess, onError, options);
	}

	function onSuccess(contacts) {
		var contentId = "#contactTelListImp";

		$(contentId + ' li').remove();
		$(contentId).append(' <legend> Choose as many snacks as you d like:</legend <input type="checkbox" name="checkbox-1a" id="checkbox-1a"class="custom" /> <label for="checkbox-1a">Cheetos</label> <inputtype="checkbox" name="checkbox-2a" id="checkbox-2a" class="custom" /> ');
		for ( var i = 0; i < contacts.length; i++) {

			$(contentId).append(
					'<li><a href="#contactTelDetail">'
							+ contacts[i].name.formatted + '</a></li>\n');
			//$(contentId).append('<li><a href="#contactTel">'+ contacts[i].phoneNumbers+ '</a></li>\n');
			//$(contentId).append('<li><a href="#contactTel">'+ contacts[i].emails+  contacts[i].addresses+ '</a></li>\n');
		}
		$(contentId).append('</ul>');
		$(contentId).listview('refresh')

		// console.log("Nom d'affichage = " + contacts[i].displayName);
	}

	function onError(contactError) {
		alert('onError!');
	}



	var pictureSource; // source de l'image
	var destinationType; // définit le format de la valeur retournée
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;
	}

	// Appelé lorsqu'une photo est bien récupérée
	//
	function onPhotoDataSuccess(imageData) {
		// Décommentez pour voir le flux image encodé en Base64
		// console.log(imageData);

		// Récupérer l'élément image du DOM
		//
		// baddaltha:  var smallImage = document.getElementById('smallImage');
		var smallImage = document.getElementById('samllImage');
		// Rendre visible l'élément image
		//
		smallImage.style.display = 'block';

		// Injecter la photo dans l'élément image
		// Les règles CSS servent à redimensionner l'image
		//
		smallImage.src = "data:image/jpeg;base64," + imageData;
	}

	// Appelé lorsqu'une photo est bien récupérée
	//
	function onPhotoURISuccess(imageURI) {
		// Décommentez pour voir l'URI du fichier image
		// console.log(imageURI);

		// Récupérer l'élément image du DOM
		//
		var largeImage = document.getElementById('largeImage');

		// Rendre visible l'élément image
		//
		largeImage.style.display = 'block';

		// Injecter la photo dans l'élément image
		// Les règles CSS servent à redimensionner l'image
		//
		largeImage.src = imageURI;
	}

	// Un bouton déclenchera l'appel de cette fonction
	//
	function capturePhoto() {
		// Prendre une photo avec l'appareil photo du mobile et récupérer l'image sous forme de flux encodé en Base64
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
			quality : 50
		});
	}

	// Un bouton déclenchera l'appel de cette fonction
	//
	function capturePhotoEdit() {
		// Prendre une photo avec l'appareil photo du mobile, autoriser son édition, et récupérer l'image sous forme de flux encodé en Base64
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
			quality : 20,
			allowEdit : true
		});
	}

	// Un bouton déclenchera l'appel de cette fonction
	//
	function getPhoto(source) {
		// Récupérer l'URI d'un fichier image à partir de la source spécifiée
		navigator.camera.getPicture(onPhotoURISuccess, onFail, {
			quality : 50,
			destinationType : destinationType.FILE_URI,
			sourceType : source
		});
	}

	// Appelé lorsque quelque chose ne tourne pas rond
	// 
	function onFail(message) {
		alert('Echec car : ' + message);
	}


	function fermer() {
		navigator.app.exitApp();
	}



    // Attendre que PhoneGap soit prêt
    //
    //document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap est prêt
    //
    function trouverContact() {
        // Rechercher tous les contacts qui ont 'Bob' dans l'un de leurs champs de nom
        //var options = new ContactFindOptions();
        //options.filter="Bob"; 
        var fields = ["*"];
        navigator.contacts.find(fields, onSuccess, onError, options);
    }

    // onSuccess: Afficher le nom de tous les contacts trouvés
    //
    function onSuccess(contacts) {
    	var contentId = "#contactTelList";

        	$(contentId + ' li').remove();
        	
			$(contentId).append(
					'<ul data-role="listview" data-filter="true">');
		     for (var i=0; i<contacts.length; i++) {
                
				$(contentId).append('<li><a href="#contactTelDetail">' + contacts[i].name.formatted + '</a></li>\n');
				//$(contentId).append('<li><a href="#contactTel">'+ contacts[i].phoneNumbers+ '</a></li>\n');
	            //$(contentId).append('<li><a href="#contactTel">'+ contacts[i].emails+  contacts[i].addresses+ '</a></li>\n');
            }
			$(contentId).append('</ul>');
			$(contentId).listview('refresh')
		

           // console.log("Nom d'affichage = " + contacts[i].displayName);
        }
    
    function onError(contactError) {
        alert('onError!');
    }

    


        // Attendre que PhoneGap soit prêt
        //
        document.addEventListener("deviceready", onDeviceReady, false);

        // PhoneGap est prêt
        //
        function onDeviceReady() {

            // Récupérer l'URI d'un fichier image à partir de la source spécifiée

			console.log(imageURI);
            navigator.camera.getPicture(uploadPhoto,
                                        function(message) { alert('Echec de récupération du fichier'); },
                                        { quality: 50, 
                                        destinationType: navigator.camera.DestinationType.FILE_URI,
                                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
                                        );

        }

        function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, "http://un.serveur.com/upload.php", win, fail, options);
        }

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Réponse = " + r.response);
            console.log("Envoyé = " + r.bytesSent);
        }

        function fail(error) {
            alert("Une erreur est survenue : Code = " + error.code);
        }

        
