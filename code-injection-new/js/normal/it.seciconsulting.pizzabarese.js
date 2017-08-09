




			$(document).bind("mobileinit", function() {
				$.mobile.defaultPageTransition = 'none';
			});
		















































window.localStorage.setItem('root','http://www.mrfogg.com/m/');

function setV(n, v){
    window.localStorage.setItem(n, v);    
}

function getV(n){
    var valore;
    try{
        valore = window.localStorage.getItem(n);
    }
    catch(e){
         
        valore = "";
        window.localStorage.setItem(n, "");   
    }
    
    return valore;
}

document.addEventListener("deviceready", function() {
	if(parseFloat(window.device.version) >= 7.0) {
		document.body.style.marginTop = "20px";
	}

	navigator.geolocation.watchPosition(onSuccess, onError, {

		enableHighAccuracy : true
	});

	if((navigator.network.connection.type == Connection.NONE) || (navigator.network.connection.type == Connection.UNKNOWN)) {
		navigator.notification.alert("Non sei connesso a nessuna rete. Abilita la connessione WiFi, il roaming o contatta il tuo gestore.", alertDismissed, "Mr. Fogg", "Ok");
	}
}, false);

document.addEventListener("resume", function() {

	navigator.geolocation.watchPosition(onSuccess, onError, {

		enableHighAccuracy : true
	});

	if((navigator.network.connection.type == Connection.NONE) || (navigator.network.connection.type == Connection.UNKNOWN)) {
		navigator.notification.alert("Non sei connesso a nessuna rete. Abilita la connessione WiFi, il roaming o contatta il tuo gestore.", alertDismissed, "Mr. Fogg", "Ok");
	}

}, false);
function onError(error) {
	setV('geo_lon_here', '');
	setV('geo_lat_here', '');
	setV('geo_on', '0');

	if(getV('geo_alert') == 0 && ((error.code == PositionError.PERMISSION_DENIED) || (error.code == PositionError.POSITION_UNAVAILABLE))) {
		navigator.notification.alert("Impossibile calcolare la tua posizione tramite GPS. Verifica le impostazione del tuo dispositivo.", alertDismissed, "Mr. Fogg", "Ok");
		setV('geo_alert', '1');
	}
}

var onSuccess = function(position) {

	setV('geo_lat_here', position.coords.latitude);
	setV('geo_lon_here', position.coords.longitude);
	setV('geo_on', '1');
	setV('geo_alert', '0');

	var geocoder = new google.maps.Geocoder();

	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	geocoder.geocode({
		'latLng' : latlng
	}, function(results, status) {

		if(status == google.maps.GeocoderStatus.OK)
			if(results) {
				var address = results[0].address_components;
				var ok = false;

				for( x = 0; x <= address.length - 1; x++) {
					for( y = 0; y <= address[x].types.length - 1; y++) {
						if(!ok && address[x].types[y] == 'locality') {
							var localita = results[0].address_components[x].long_name;
							ok = true;
						}
					}
				}

				setV('geo_here', localita);
			}

	});
};
function alertDismissed() {
}

function pizzabarese_start() {
	var touch;

	$(document).on('tap', '.home_button', function(event) {
		event.preventDefault();
		
		if(!touch) {
			touch = 1;
			$(this).addClass("ui-btn-active");
			var back = $(this).attr('href');
			
			$.mobile.showPageLoadingMsg();
			$.mobile.changePage(back);
			touch = 0;
		}
		event.stopImmediatePropagation();

	});

	$(document).on('tap', '.back_button', function(event) {
		if($(this).attr('href') && ($(this).attr('href') != '#')) {
			event.preventDefault();
			if(!touch) {
				touch = 1;
				$(this).addClass("ui-btn-active");
				var back = $(this).attr('href');
				$.mobile.showPageLoadingMsg();
				$.mobile.changePage(back);
				touch = 0;
			}
			event.stopImmediatePropagation();

		} else {
			if($(this).attr('href') && ($(this).attr('href') == '#')) {
				$(this).addClass("ui-btn-active");
			} else {
				$(this).addClass("ui-btn-active");
				$.mobile.showPageLoadingMsg();

			}
		}

	});

	$(document).on('tap', '.pulsante_footer', function(event) {
		event.preventDefault();
		if(!touch) {
			touch = 1;
			$(this).addClass("ui-btn-active");
			var back = $(this).attr('href');
			$.mobile.showPageLoadingMsg();
			$.mobile.changePage(back);
			touch = 0;
		}
		event.stopImmediatePropagation();

	});
	
	
}

$(document).bind("mobileinit", function() {
	$.mobile.defaultPageTransition = 'slide';
	$.mobile.defaultDialogTransition = 'popup';
});





















$(document).on('pageinit', '#pagina-eventi-articolo', function(event) {
	
	pizzabarese_start();
	
	$(document).on('tap', '#ctrl-evento-evento', function(event) {
		$('#div-evento-evento').show();
		$('#div-evento-contatti').hide();
	});

	$(document).on('tap', '#ctrl-evento-contatti', function(event) {
		$('#div-evento-evento').hide();
		$('#div-evento-contatti').show();
	});
	var hasDoneFirstClick_interno = false;

	$.post(getV('root') + getV('lingua') + '/modulo/infopoint.htm', {
		from_app : true,
		c_ajax : true,
		action : 'APPArticolo',
		idEvento : getV('id_eventi')
	}, function(xml) {

		$(xml).find("evento").each(function() {

			//Recupero tutti i dati dal database
			var titolo = $(this).find('titolo').text();
			var data_inizio = $(this).find('data_inizio').text();
			var data_fine = $(this).find('data_fine').text();
			var indirizzo = $(this).find('indirizzo').text();
			var citta = $(this).find('citta').text();
			var immagine = $(this).find('immagine').text();
			var dominio_immagine = $(this).find('dominio_immagine').text();
			var telefono = $(this).find('telefono').text();
			var email = $(this).find('email').text();
			var sito = $(this).find('sito').text();
			var testo = $(this).find('testo').text();
			var testo_senza_tags = $(this).find('testo_senza_tags').text();
			var orari = $(this).find('orari').text();

			var evento_dove = indirizzo;
			if(indirizzo && citta)
				evento_dove += ' - ';
			if(citta)
				evento_dove += citta;

			var evento_quando;

			if(data_inizio != data_fine) {
				switch(getV('lingua')) {
					case 'it':
						evento_quando = "Dal " + data_inizio + " al " + data_fine;
						break;

					case 'en':
						evento_quando = "From " + data_inizio + " to " + data_fine;
						break;

					case 'es':
						evento_quando = "From " + data_inizio + " to " + data_fine;
						break;

					case 'fr':
						evento_quando = "Du " + data_inizio + " au " + data_fine;
						break;
				}
			} else
				evento_quando = data_inizio;

			$('#evento-titolo').text(titolo);
			$('#evento-quando').text(evento_quando);

			if(evento_dove)
				$('#evento-indirizzo').text(evento_dove);

			if(immagine) {

				$('#evento-immagini').show();

				$('#evento-immagini').html('<img width="50px" height="50px" src="' + dominio_immagine + 'img/' + immagine + '.jpg" /> ');
			} else
				$('#evento-immagini').hide();

			$('#evento-descrizione').html(testo);

			// **********************************
			// Disegno la galleria delle immagini
			// **********************************

			$('#Gallery').html('').trigger('create');

			if(immagine) {

				$('#Gallery').append('<li><a rel="external" href="' + dominio_immagine + 'img/' + immagine + '.jpg"><img src="' + dominio_immagine + 'img/' + immagine + '.jpg" alt="' + (x + 1) + '/' + immagine.length + ' - ' + titolo + '" /></a></li>');

				var myPhotoSwipe = $("#Gallery a").photoSwipe({
					enableMouseWheel : false,
					enableKeyboard : false
				});
			}

			// ********
			// Contatti
			// ********

			$('#evento-contatti').html('').trigger('create');

			if(telefono || email || sito) {
				$('#evento-contatti').show();
				var markup_contatti = "";
				markup_contatti += '<ul data-role="listview" data-theme="c">';

				if(telefono) {
					markup_contatti += '<li>';
					markup_contatti += '<a href="tel:+39' + telefono + '">';
					markup_contatti += '<img width="16px" src="../images/75-phone.png" class="ui-li-icon">';
					markup_contatti += telefono;
					markup_contatti += '</a>';
					markup_contatti += '</li>';
				}

				if(email) {
					markup_contatti += '<li>';
					markup_contatti += '<a href="mailto:' + email + '">';
					markup_contatti += '<img width="16px" src="../images/18-envelope.png" class="ui-li-icon">';
					markup_contatti += email;
					markup_contatti += '</a>';
					markup_contatti += '</li>';
				}

				if(sito) {
					markup_contatti += '<li>';
					markup_contatti += '<a href="http://' + sito + '">';
					markup_contatti += '<img width="16px" src="../images/13-target.png" class="ui-li-icon">';
					markup_contatti += sito;
					markup_contatti += '</a>';
					markup_contatti += '</li>';
				}
				markup_contatti += '</ul>';
				$('#evento-contatti').html(markup_contatti).trigger('create');
			} else
				$('#evento-contatti').hide();

		});

		$('#eventi_loading').hide();
		$('#articolo').show();
	});
});

$(document).on('pagebeforeshow', '#pagina-eventi-articolo', function(event) {
	
});

$(document).on('pageshow', '#pagina-eventi-articolo', function(event) {

});

$(document).on('pagebeforehide', '#pagina-eventi-articolo', function(event) {

});

$(document).on('pagehide', '#pagina-eventi-articolo', function(event) {

});

$(document).on('pageinit', '#pagina-protocollo-protocollo', function(event) {

	pizzabarese_start();

	$(document).on('tap', '#ctrl-protocollo-pag1', function(event) {
		$('#div-protocollo-pag1').show();
		$('#div-protocollo-pag2').hide();
		$('#div-protocollo-pag3').hide();
		$('#div-protocollo-pag4').hide();
	});

	$(document).on('tap', '#ctrl-protocollo-pag2', function(event) {
		$('#div-protocollo-pag1').hide();
		$('#div-protocollo-pag2').show();
		$('#div-protocollo-pag3').hide();
		$('#div-protocollo-pag4').hide();
	});

	$(document).on('tap', '#ctrl-protocollo-pag3', function(event) {
		$('#div-protocollo-pag1').hide();
		$('#div-protocollo-pag2').hide();
		$('#div-protocollo-pag3').show();
		$('#div-protocollo-pag4').hide();
	});

	$(document).on('tap', '#ctrl-protocollo-pag4', function(event) {
		$('#div-protocollo-pag1').hide();
		$('#div-protocollo-pag2').hide();
		$('#div-protocollo-pag3').hide();
		$('#div-protocollo-pag4').show();
	});
});

$(document).on('pagebeforeshow', '#pagina-protocollo-protocollo', function(event) {

});

$(document).on('pageshow', '#pagina-protocollo-protocollo', function(event) {

});

$(document).on('pagebeforehide', '#pagina-protocollo-protocollo', function(event) {

});

$(document).on('pagehide', '#pagina-protocollo-protocollo', function(event) {

});


$(document).on('pageinit', '#pagina-profilo-profilo', function(event) {

	pizzabarese_start();

	$('#profilo-email').val(getV('profilo-email'));
	$('#profilo-nickname').val(getV('profilo-nickname'));
	$('#profilo-cognome').val(getV('profilo-cognome'));
	$('#profilo-nome').val(getV('profilo-nome'));
	$('#profilo-telefono').val(getV('profilo-telefono'));
	$('#profilo-indirizzo').val(getV('profilo-indirizzo'));
	$('#profilo-citta').val(getV('profilo-citta'));

	$(document).on('tap', '#prenota-ac', function(e) {
		e.preventDefault();
		e.stopPropagation();

		setV('profilo-nickname', $('#profilo-nickname').val());
		setV('profilo-email', $('#profilo-email').val());
		setV('profilo-cognome', $('#profilo-cognome').val());
		setV('profilo-nome', $('#profilo-nome').val());
		setV('profilo-telefono', $('#profilo-telefono').val());
		setV('profilo-indirizzo', $('#profilo-indirizzo').val());
		setV('profilo-citta', $('#profilo-citta').val());

		switch(getV('lingua')) {
			case 'it':
				navigator.notification.alert("Profilo salvato con successo", function() {
				}, "Pizza Barese", "Ok");
				break;
			case 'en':
				navigator.notification.alert("Profilo salvato con successo", function() {
				}, "Pizza Barese", "Ok");
				break;
			case 'es':
				navigator.notification.alert("Profilo salvato con successo", function() {
				}, "Pizza Barese", "Ok");
				break;
			case 'fr':
				navigator.notification.alert("Profilo salvato con successo", function() {
				}, "Pizza Barese", "Ok");
				break;
		}

		e.stopImmediatePropagation();
	});
});

$(document).on('pagebeforeshow', '#pagina-profilo-profilo', function(event) {

});

$(document).on('pageshow', '#pagina-profilo-profilo', function(event) {

});

$(document).on('pagebeforehide', '#pagina-profilo-profilo', function(event) {

});

$(document).on('pagehide', '#pagina-profilo-profilo', function(event) {

});


$(document).on('pageinit', '#pagina-home-home', function(event) {

	pizzabarese_start();

	setTimeout(function() {
		if(getV('email_pizze_registrata') === null) {
			$.mobile.changePage('it/registrazione.html');
		} else {
			$('#pagina-home').show();
			$(document).on('tap', '#ctrl-home-it', function(event) {
				var back = $(this).attr('href');

				$.mobile.showPageLoadingMsg();
				setV('lingua', 'it');
				event.preventDefault();

				$.mobile.changePage(back);
				event.stopImmediatePropagation();
			});

			$(document).on('tap', '#ctrl-home-en', function(event) {
				var back = $(this).attr('href');

				$.mobile.showPageLoadingMsg();
				setV('lingua', 'en');
				event.preventDefault();

				$.mobile.changePage(back);
				event.stopImmediatePropagation();
			});
		}
	}, 2000);
});

$(document).on('pagebeforeshow', '#pagina-home-home', function(event) {

});

$(document).on('pageshow', '#pagina-home-home', function(event) {

});

$(document).on('pagebeforehide', '#pagina-home-home', function(event) {

});

$(document).on('pagehide', '#pagina-home-home', function(event) {

});


var altri_tap_luoghi = false;
var primo_sotto_100_luoghi;
var primo_sotto_500_luoghi;
var primo_oltre_500_luoghi;
var primo_no_geolocalizzato_luoghi;
var tot_elementi_mostrati_luoghi;

$(document).on('pageinit', '#pagina-luoghi-elenco', function(event) {

	pizzabarese_start();

	//pulsante_where();
	setV('id_luoghi', 0);
	setV('id_vicino', 0);

	$('#pagina').val(1);
	$('#luoghi_lista').html();
	primo_sotto_100_luoghi = 0;
	primo_sotto_500_luoghi = 0;
	primo_oltre_500_luoghi = 0;
	primo_no_geolocalizzato_luoghi = 0;
	tot_elementi_mostrati_luoghi = 0;

	var hasDoneFirstClick_luoghi = false;

	$(document).on('tap', '.luogo_link', function(event) {
		if(!hasDoneFirstClick_luoghi) {
			$(this).addClass("ui-btn-active");
			$.mobile.showPageLoadingMsg();
			event.preventDefault();
			setV('id_luoghi', event.target.id.split('_')[1]);
			if(parseInt(getV('id_luoghi')) > 0)
				$.mobile.changePage('pizzeria.html');
			hasDoneFirstClick_luoghi = true;
			event.stopImmediatePropagation();

		}
	});

	$.post(getV('root') + getV('lingua') + '/sezione/poi.htm', {
		from_app : true,
		c_ajax : true,
		geo_on : getV('geo_on'),
		geo_lat_here : getV('geo_lat_here'),
		geo_lon_here : getV('geo_lon_here'),
		categoria : 'Pizzerie',
		action : 'Lista',
		citta : getV('luoghi_citta'),
		geo_here : ''/*getV('geo_here')*/,
		pagina : $('#pagina').val(),
		apparire_su_pizzabarese : 1
	}, function(data) {
		disegna_lista_luoghi(data);
	});
});

$(document).on('pagebeforeshow', '#pagina-luoghi-elenco', function(event) {
	
});

$(document).on('pageshow', '#pagina-luoghi-elenco', function(event) {

});

$(document).on('pagebeforehide', '#pagina-luoghi-elenco', function(event) {

});

$(document).on('pagehide', '#pagina-luoghi-elenco', function(event) {

});

function disegna_lista_luoghi(data) {
 
	var elem = data.split('$$$$$');

	var pois = elem[0].split('**');
	var lingua = getV('lingua');
	var tot_elementi_previsti = elem[1];

	var tot_els = pois.length;

	switch(lingua) {
		case 'it':
			var markup = "<div class='nodata'>Nessun dato disponibile.</div>";
			break;
		case 'en':
			var markup = "<div class='nodata'>No Data Available.</div>";
			break;
		case 'fr':
			var markup = "<div class='nodata'>Pas de données disponibles.</div>";
			break;
		case 'es':
			var markup = "<div class='nodata'>No hay datos disponibles.</div>";
			break;
	}

	if((tot_els > 0) && (data != '$$$$$0')) {

		if(parseInt($('#pagina').val()) > 1) {
			//$('#altri_li').remove();
			altri_tap_luoghi = false;
		}
		tot_elementi_mostrati_luoghi += (tot_els - 1);
		markup = "";

		for( x = 0; x < tot_els - 1; x++) {
			
			var pois_el = pois[x].split('*');
			var nome = pois_el[0];
			var distanza_m = parseInt(pois_el[1]);
			var id = parseInt(pois_el[2]);
			var link = pois_el[3] + '.htm';
			var immagine = pois_el[4];
			var zona = pois_el[5];
			var geolocalizzato = pois_el[6];

			if((distanza_m < 100) && (distanza_m > 0) && (geolocalizzato == 1)) {
				if(!primo_sotto_100_luoghi) {

					switch(lingua) {
						case 'it':
							markup += "<li data-role=\"list-divider\">Check-in (entro 100m)</li>";
							break;
						case 'en':
							markup += "<li data-role=\"list-divider\">Check-in (within 100m)</li>";
							break;
						case 'es':
							markup += "<li data-role=\"list-divider\">Check-in (dentro de 100m)</li>";
							break;
						case 'fr':
							markup += "<li data-role=\"list-divider\">Check-in (dans de 100m)</li>";
							break;
					}
					primo_sotto_100_luoghi = 1;
				}
			} else {
				if((distanza_m < 500) && (distanza_m > 0) && (geolocalizzato == 1)) {
					if(!primo_sotto_500_luoghi) {

						switch(lingua) {
							case 'it':
								markup += "<li data-role=\"list-divider\">Nelle vicinanze (entro 500m)</li>";
								break;
							case 'en':
								markup += "<li data-role=\"list-divider\">Nearby (in 500m)</li>";
								break;
							case 'es':
								markup += "<li data-role=\"list-divider\">Cerca de ti (dentro de 500m)</li>";
								break;
							case 'fr':
								markup += "<li data-role=\"list-divider\">Proche (dans de 500m)</li>";
								break;
						}
						primo_sotto_500_luoghi = 1;
					}
				} else {
					if(!primo_oltre_500_luoghi && (distanza_m > 0) && (geolocalizzato == 1)) {
						switch(lingua) {
							case 'it':
								markup += "<li data-role=\"list-divider\">Altri luoghi (oltre i 500m)</li>";
								break;
							case 'en':
								markup += "<li data-role=\"list-divider\">Other places (over 500m)</li>";
								break;
							case 'es':
								markup += "<li data-role=\"list-divider\">Otros lugares (over 500m)</li>";
								break;
							case 'fr':
								markup += "<li data-role=\"list-divider\">Autres endroits (plus de 500m)</li>";
								break;
						}
						primo_oltre_500_luoghi = 1;
					} else {
						if(!primo_no_geolocalizzato_luoghi && (geolocalizzato == 0)) {
							switch(lingua) {
								case 'it':
									markup += "<li data-role=\"list-divider\">Altri</li>";
									break;
								case 'en':
									markup += "<li data-role=\"list-divider\">Other</li>";
									break;
								case 'es':
									markup += "<li data-role=\"list-divider\">Otros</li>";
									break;
								case 'fr':
									markup += "<li data-role=\"list-divider\">Autres</li>";
									break;
							}
							primo_no_geolocalizzato_luoghi = 1;
						}
					}
				}
			}

			if(distanza_m < 1000)
				var distanza = distanza_m + ' m';
			else
				var distanza = (distanza_m / 1000) + ' km';
			markup += "<li id=\"li_" + id + "\">";
			markup += "<a class=\"luogo_link\" id=\"a_" + id + "\" style=\"display: block;\" href=\"#\">";
			if(immagine != '-') {
				if(immagine.indexOf('infopoint') > -1)
					markup += "<img width=\"80px\" height=\"80px\" src=\"" + immagine + "\" />";
				else
					markup += "<img width=\"80px\" height=\"80px\" id=\"img_" + id + "\" src=\"" + getV('root') + "images/thumb/" + immagine + "\" />";
			} else
				markup += "<img width=\"80px\" height=\"80px\" id=\"img_" + id + "\" src=\"" + getV('root') + "templates/iBari/images/default.png\" />";
			markup += "<h3 id=\"h3_" + id + "\" >" + nome + "</h3>";
			markup += "<p id=\"p_" + id + "\" >";

			if((distanza_m > 0) && (geolocalizzato == 1))
				markup += distanza.replace('.', ',');
			if(((distanza_m > 0) && (geolocalizzato == 1)) && (zona != '-'))
				markup += ' - ';

			if(zona != '-')
				markup += '<i>' + zona + '</i>';
			markup += "</p></a></li>";

		}
	}

	if(tot_elementi_mostrati_luoghi < tot_elementi_previsti) {
		markup += "<li class='altri' id='altri_li'>";
		markup += "<a class='altri' id=\"altri\" href=\"#\">";
		switch(lingua) {
			case 'it':
				markup += "<h3 class='altri'>Altri risultati...</h3>";
				markup += "<p class='altri'>Mostrati " + tot_elementi_mostrati_luoghi + " elementi su " + tot_elementi_previsti + "</p>";
				break;
			case 'en':
				markup += "<h3 class='altri'>More results...</h3>";
				markup += "<p class='altri'>Showing " + tot_elementi_mostrati_luoghi + " of " + tot_elementi_previsti + " elements</p>";
				break;
			case 'fr':
				markup += "<h3 class='altri'>Plus de résultats...</h3>";
				markup += "<p class='altri'>Affichage " + tot_elementi_mostrati_luoghi + " sur " + tot_elementi_previsti + " articles</p>";
				break;
			case 'es':
				markup += "<h3 class='altri'>Otros resultados...</h3>";
				markup += "<p class='altri'>Mostrando " + tot_elementi_mostrati_luoghi + " de " + tot_elementi_previsti + " artículos</p>";
				break;
		}
		markup += "</p></a></li>";
	}

	$('#luoghi_lista').append(markup).trigger('create');
	$('#luoghi_lista').listview('refresh');
	$('#luoghi_loading').hide();

	$('#pagina').val(parseInt($('#pagina').val()) + 1);

	$(document).on('tap click touchstart', '.altri', function(event) {
		$(this).addClass("ui-btn-active");
		event.stopPropagation();
		event.preventDefault();
		if(!altri_tap_luoghi) {
			altri_tap_luoghi = true;
			$('#altri_li').remove();
			$.mobile.showPageLoadingMsg();
			$.post(getV('root') + getV('lingua') + '/sezione/poi.htm', {
				from_app : true,
				c_ajax : true,
				geo_on : getV('geo_on'),
				geo_lat_here : getV('geo_lat_here'),
				geo_lon_here : getV('geo_lon_here'),
				categoria : 'pizzerie',
				action : 'Lista',
				citta : ''/*getV('scelta_utente')*/,
				geo_here : ''/*getV('geo_here')*/,
				pagina : $('#pagina').val(),
				apparire_su_pizzabarese : 1
			}, function(data) {
				disegna_lista_luoghi(data);
				$.mobile.hidePageLoadingMsg();
			});
		}
	});
}

var altri_tap_luoghi_citta = false;
var cities = new Array();

$(document).on('pageinit', '#pagina-luoghi-citta', function(event) {

	pizzabarese_start();

	//pulsante_where();
	setV('luoghi_citta', '');
	$('#luoghi_citta_lista').html();

	var hasDoneFirstClick_luoghi_citta = false;

	$(document).on('tap', '.luogo_citta_link', function(event) {
		if(!hasDoneFirstClick_luoghi_citta) {
			$(this).addClass("ui-btn-active");
			$.mobile.showPageLoadingMsg();
			event.preventDefault();
			var x = event.target.id.split('_')[1];
			setV('luoghi_citta', cities[x]);
			if(parseInt(getV('luoghi_citta')) != '')
				$.mobile.changePage('pizzerie.html');
			hasDoneFirstClick_luoghi_citta = true;
			event.stopImmediatePropagation();

		}
	});

	$.post(getV('root') + getV('lingua') + '/sezione/poi.htm', {
		from_app : true,
		c_ajax : true,
		geo_on : getV('geo_on'),
		geo_lat_here : getV('geo_lat_here'),
		geo_lon_here : getV('geo_lon_here'),
		action : 'ListaCitta',
		apparire_su_pizzabarese : 1
	}, function(data) {

		disegna_lista_luoghi_citta(data);
	});
});

$(document).on('pagebeforeshow', '#pagina-luoghi-citta', function(event) {

});

$(document).on('pageshow', '#pagina-luoghi-citta', function(event) {

});

$(document).on('pagebeforehide', '#pagina-luoghi-citta', function(event) {

});

$(document).on('pagehide', '#pagina-luoghi-citta', function(event) {

});
function disegna_lista_luoghi_citta(data) {

	var pois = data.split('**');
	var lingua = getV('lingua');

	var tot_els = pois.length;

	switch(lingua) {
		case 'it':
			var markup = "<div class='nodata'>Nessun dato disponibile.</div>";
			break;
		case 'en':
			var markup = "<div class='nodata'>No Data Available.</div>";
			break;
		case 'fr':
			var markup = "<div class='nodata'>Pas de données disponibles.</div>";
			break;
		case 'es':
			var markup = "<div class='nodata'>No hay datos disponibles.</div>";
			break;
	}

	if((tot_els > 0)) {
		markup = "";

		for( x = 0; x < tot_els - 1; x++) {

			var id = x;

			var pois_el = pois[x].split('*');
			var citta = pois_el[0];
			var distanza_m = parseInt(pois_el[1]);

			cities[x] = citta;

			if(distanza_m < 1000)
				var distanza = distanza_m + ' m';
			else
				var distanza = (distanza_m / 1000) + ' km';
			markup += "<li id=\"li_" + id + "\">";
			markup += "<a class=\"luogo_citta_link\" id=\"a_" + id + "\" style=\"display: block;\" href=\"#\">";
			markup += "<h3 id=\"h3_" + id + "\" >" + citta + "</h3>";

			if((distanza_m > 0)) {
				markup += "<p id=\"p_" + id + "\" >";
				markup += distanza.replace('.', ',');
				markup += "</p>";
			}
			markup += "</a></li>";

		}
	}

	$('#luoghi_citta_lista').append(markup).trigger('create');
	$('#luoghi_citta_lista').listview('refresh');
	$('#luoghi_citta_loading').hide();

}

var altri_tap_eventi = false;
var tot_elementi_mostrati_eventi;
var eventi_periodo = 1;
var cambio_periodo_tap;
/* 1 = oggi 2 = settimana 3 = mese 4 = altri */

$(document).on('pageinit', '#pagina-eventi-elenco', function(event) {

	pizzabarese_start();

	setV('id_eventi', '0');

	$('#pagina').val(1);
	$('#eventi_lista').html();
	tot_elementi_mostrati_eventi = 0;

	var hasDoneFirstClick_eventi = false;

	$(document).on('tap', '.eventi_link', function(event) {

		if(!hasDoneFirstClick_eventi) {
			$(this).addClass("ui-btn-active");
			$.mobile.showPageLoadingMsg();
			event.preventDefault();
			setV('id_eventi', event.target.id.split('_')[1]);
			if(parseInt(getV('id_eventi')) > 0)
				$.mobile.changePage('evento.html');
			hasDoneFirstClick_eventi = true;
			event.stopImmediatePropagation();
		}
	});

	$(document).on('tap', '#ctrl-eventi-oggi', function(event) {
		event.stopPropagation();
		event.preventDefault();
		if(!cambio_periodo_tap) {
			eventi_periodo = 1;
			$('#eventi_pagina').val(1);
			$('#eventi_lista').html('');
			cambio_periodo_tap = true;
			$(this).trigger('pageinit');

		}
		event.stopImmediatePropagation();
	});

	$(document).on('tap', '#ctrl-eventi-settimana', function(event) {
		event.stopPropagation();
		event.preventDefault();
		if(!cambio_periodo_tap) {
			eventi_periodo = 2;
			$('#eventi_pagina').val(1);
			$('#eventi_lista').html('');
			cambio_periodo_tap = true;
			$(this).trigger('pageinit');

		}
		event.stopImmediatePropagation();
	});

	$(document).on('tap', '#ctrl-eventi-mese', function(event) {
		event.stopPropagation();
		event.preventDefault();
		if(!cambio_periodo_tap) {
			eventi_periodo = 3;
			$('#eventi_pagina').val(1);
			$('#eventi_lista').html('');
			cambio_periodo_tap = true;
			$(this).trigger('pageinit');

		}
		event.stopImmediatePropagation();
	});
	/*$(document).on('tap', '#ctrl-eventi-prossimamente', function(event) {
	 event.stopPropagation();
	 event.preventDefault();
	 if(!cambio_periodo_tap) {
	 eventi_periodo = 4;
	 $('#eventi_pagina').val(1);
	 $('#eventi_lista').html('');
	 cambio_periodo_tap = true;
	 $(this).trigger('pageinit');

	 }
	 event.stopImmediatePropagation();
	 });*/

	$.post(getV('root') + getV('lingua') + '/modulo/infopoint.htm', {
		from_app : true,
		c_ajax : true,
		action : 'APPElencoPizza',
		/*citta : getV('scelta_utente'),*/
		pagina : $('#eventi_pagina').val(),
		periodo : eventi_periodo
	}, function(data) {
		disegna_lista_eventi(data);
	});
});

$(document).on('pagebeforeshow', '#pagina-eventi-elenco', function(event) {

});

$(document).on('pageshow', '#pagina-eventi-elenco', function(event) {

});

$(document).on('pagebeforehide', '#pagina-eventi-elenco', function(event) {

});

$(document).on('pagehide', '#pagina-eventi-elenco', function(event) {

});
function disegna_lista_eventi(data) {

	var elem = data.split('$$$$$');
	var pois = elem[0].split('**');
	var lingua = getV('lingua');
	var tot_elementi_previsti = elem[1];
	cambio_periodo_tap = false;
	var tot_els = pois.length;

	switch(getV('lingua')) {
		case 'it':
			var markup = "<div class='nodata'>Nessun dato disponibile.</div>";
			break;
		case 'en':
			var markup = "<div class='nodata'>No Data Available.</div>";
			break;
		case 'fr':
			var markup = "<div class='nodata'>Pas de données disponibles.</div>";
			break;
		case 'es':
			var markup = "<div class='nodata'>No hay datos disponibles.</div>";
			break;
	}

	if((tot_els > 0) && (data != '$$$$$0')) {

		if(parseInt($('#eventi_pagina').val()) > 1) {
			altri_tap_eventi = false;
		}
		tot_elementi_mostrati_eventi += (tot_els - 1);
		markup = "";

		if(parseInt($('#eventi_pagina').val()) == 1) {
			markup += '<li id="li_0">';
			markup += '<a id="a_0" href="mrfogg-ev.html" style=\"display: block;\">';
			markup += "<img width=\"80px\" height=\"80px\" id=\"img_0\" src=\"../images/mrfogg.jpg\" />";
			switch(getV('lingua')) {
				case 'it':
					markup += '<h3 id="h3_0">VUOI SAPERNE DI PIU\’?</h3>';
					break;

				case 'en':
					markup += '<h3 id="h3_0">WANT TO LEARN MORE?</h3>';
					break;

			}
			markup += '<p id="p_0">&nbsp;</p>';
			markup += '</a>';
			markup += '</li>';
		}

		for( x = 0; x < tot_els - 1; x++) {
			var pois_el = pois[x].split('*');
			var oggi = pois_el[0];
			var immagine = pois_el[1];
			var id = parseInt(pois_el[2]);
			var data_inizio = pois_el[3];
			var titolo = pois_el[4];
			var citta = pois_el[5];
			var dominio_immagine = pois_el[6];
			markup += "<li id=\"li_" + id + "\" class=\"eventi_link\">";
			markup += "<a class=\"eventi_link\" id=\"a_" + id + "\" href=\"#\">";

			if(immagine != '-')
				markup += "<img id=\"img_" + id + "\" class=\"eventi_link\"width=\"80px;\" height=\"80px;\" src=\"" + dominio_immagine + "img/" + immagine + ".jpg\" />";
			else
				markup += "<img id=\"img_" + id + "\" class=\"eventi_link\" src=\"images/default.png\" />";
			markup += "<h3 id=\"h3_" + id + "\" class=\"eventi_link\">" + titolo + "</h3>";
			markup += "<p id=\"p_" + id + "\" class=\"eventi_link\">";
			markup += "<i class=\"eventi_link\">";

			if(oggi == 1)
				markup += "in corso";
			else
				markup += "dal " + data_inizio;
			markup += "</i> - " + citta;
			markup += "</p></a></li>";
		}

		if(tot_elementi_mostrati_eventi < tot_elementi_previsti) {
			markup += "<li class='altri_eventi' id='altri_li'>";
			markup += "<a class='altri_eventi' id=\"altri\" href=\"#\">";
			switch(getV('lingua')) {
				case 'it':
					markup += "<h3 class='altri_eventi'>Altri risultati...</h3>";
					markup += "<p class='altri_eventi'>Mostrati " + tot_elementi_mostrati_eventi + " elementi su " + tot_elementi_previsti + "</p>";
					break;
				case 'en':
					markup += "<h3 class='altri_eventi'>More results...</h3>";
					markup += "<p class='altri_eventi'>Showing " + tot_elementi_mostrati_eventi + " of " + tot_elementi_previsti + " elements</p>";
					break;
				case 'fr':
					markup += "<h3 class='altri_eventi'>Plus de résultats...</h3>";
					markup += "<p class='altri_eventi'>Affichage " + tot_elementi_mostrati_eventi + " sur " + tot_elementi_previsti + " articles</p>";
					break;
				case 'es':
					markup += "<h3 class='altri_eventi'>Otros resultados...</h3>";
					markup += "<p class='altri_eventi'>Mostrando " + tot_elementi_mostrati_eventi + " de " + tot_elementi_previsti + " artículos</p>";
					break;
			}
			markup += "</p></a></li>";
		}
	}

	$('#eventi_lista').append(markup).trigger('create');
	$('#eventi_lista').listview('refresh');
	$('#eventi_loading').hide();

	$('#eventi_pagina').val(parseInt($('#eventi_pagina').val()) + 1);

	$(document).on('tap click touchstart', '.altri_eventi', function(event) {
		$(this).addClass("ui-btn-active");
		event.stopPropagation();
		event.preventDefault();
		if(!altri_tap_eventi) {
			altri_tap_eventi = true;
			$('#altri_li').remove();
			$.mobile.showPageLoadingMsg();
			$.post(getV('root') + getV('lingua') + '/modulo/infopoint.htm', {
				from_app : true,
				c_ajax : true,
				action : 'APPElencoPizza',
				/*citta : getV('scelta_utente'),*/
				pagina : $('#eventi_pagina').val(),
				periodo : eventi_periodo
			}, function(data) {
				disegna_lista_eventi(data);
				$.mobile.hidePageLoadingMsg();
			});
		}
	});
}

$(document).on('pageinit', '#pagina-mappa-mappa', function(event) {
	
	pizzabarese_start();
	
	var mapInitialized = false;
	function initializeMap() {
		if(!mapInitialized) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				var myOptions = {
					zoom : 15,
					center : latlng,
					mapTypeId : google.maps.MapTypeId.ROADMAP,
					streetViewControl: false,
					mapTypeControl: false
				};
				
				var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

				var marker = new google.maps.Marker({
					position : latlng,
					map : map
				});
				
				var PizzerieLayer = new google.maps.KmlLayer('http://www.mrfogg.com/m/webapp/_sezioni/luoghi/pizzerie.php?k=120', {preserveViewport:true});
				PizzerieLayer.setMap(map);

			});
			mapInitialized = true;
		}
	}
	 
	$('#map_canvas').height($(window).height() - $('#header').height());
	initializeMap();
});

$(document).on('pagebeforeshow', '#pagina-mappa-mappa', function(event) {

});

$(document).on('pageshow', '#pagina-mappa-mappa', function(event) {

});

$(document).on('pagebeforehide', '#pagina-mappa-mappa', function(event) {

});

$(document).on('pagehide', '#pagina-mappa-mappa', function(event) {

});

$(document).on('pageinit', '#pagina-pizzabarese-descrizione', function(event) {

	pizzabarese_start();

	$(document).on('tap', '#ctrl-pizzabarese-descrizione', function(event) {
		$('#div-pizzabarese-descrizione').show();
		$('#div-pizzabarese-storia').hide();
		$('#div-pizzabarese-ricetta').hide();
		$('#div-pizzabarese-prodotti').hide();
	});

	$(document).on('tap', '#ctrl-pizzabarese-storia', function(event) {
		$('#div-pizzabarese-descrizione').hide();
		$('#div-pizzabarese-storia').show();
		$('#div-pizzabarese-ricetta').hide();
		$('#div-pizzabarese-prodotti').hide();
	});

	$(document).on('tap', '#ctrl-pizzabarese-ricetta', function(event) {
		$('#div-pizzabarese-descrizione').hide();
		$('#div-pizzabarese-storia').hide();
		$('#div-pizzabarese-ricetta').show();
		$('#div-pizzabarese-prodotti').hide();
	});

	$(document).on('tap', '#ctrl-pizzabarese-prodotti', function(event) {
		$('#div-pizzabarese-descrizione').hide();
		$('#div-pizzabarese-storia').hide();
		$('#div-pizzabarese-ricetta').hide();
		$('#div-pizzabarese-prodotti').show();
	});
});

$(document).on('pagebeforeshow', '#pagina-pizzabarese-descrizione', function(event) {

});

$(document).on('pageshow', '#pagina-pizzabarese-descrizione', function(event) {

});

$(document).on('pagebeforehide', '#pagina-pizzabarese-descrizione', function(event) {

});

$(document).on('pagehide', '#pagina-pizzabarese-descrizione', function(event) {

});


$(document).on('pageinit', '#pagina-luoghi-articolo', function(event) {

	pizzabarese_start();
	setV('id_vicino', 0);
	$('#prenota-cognome').val(getV('profilo-cognome'));
	$('#prenota-telefono').val(getV('profilo-telefono'));
	$('#firma_commento').val(getV('profilo-nickname'));

	$(document).on('tap', '#ctrl-pizzeria-pizzeria', function(event) {
		$('#div-pizzeria-pizzeria').show();
		$('#div-pizzeria-pizza').hide();
		$('#div-pizzeria-contatti').hide();
		$('#div-pizzeria-prenota').hide();
	});

	$(document).on('tap', '#ctrl-pizzeria-pizza', function(event) {
		$('#div-pizzeria-pizzeria').hide();
		$('#div-pizzeria-pizza').show();
		$('#div-pizzeria-contatti').hide();
		$('#div-pizzeria-prenota').hide();
	});

	$(document).on('tap', '#ctrl-pizzeria-contatti', function(event) {
		$('#div-pizzeria-pizzeria').hide();
		$('#div-pizzeria-pizza').hide();
		$('#div-pizzeria-contatti').show();
		$('#div-pizzeria-prenota').hide();
	});

	$(document).on('tap', '#ctrl-pizzeria-prenota', function(event) {

		event.preventDefault();
		window.startapp.start({
			ios : 'mrfogg://convegni/sezione/luogo/'+getV('id_luoghi')
		}, function() {

		}, function() {

			var mrfogg_label;

			switch(getV('lingua')) {
				case "it":
					mrfogg_label = 'Non hai installato MrFogg Puglia sul tuo dispositivo. Vuoi installarlo?';
					break;

				case "en":
					mrfogg_label = 'You didn’t install MrFogg Puglia on your device. Do you want to install it?';
					break;
			}

			navigator.notification.confirm(mrfogg_label, function(b) {
				if(parseInt(b) == 1) {
					window.startapp.start({
						ios : 'itms-apps://itunes.apple.com/' + getV('lingua') + '/app/mrfogg-apulia/id541839816?mt=8'
					}, function() {
					}, function() {
					});
				}
			}, 'MrFogg Convegni', 'Sì,No');
		});
		event.stopImmediatePropagation();

	});
	var hasDoneFirstClick_interno = false;
	$(document).on('tap', '.mrfogg', function(event) {
		event.preventDefault();
		if(!hasDoneFirstClick_interno) {
			$(this).addClass("ui-btn-active");
			$.mobile.showPageLoadingMsg();
			luogo_mrfogg = event.target.id.split('_')[1];
			setV('id_vicino', vicino[luogo_mrfogg-1]['id']);
			if(parseInt(getV('id_vicino')) > 0) {

				$.mobile.changePage('luogo.html', {
					reloadPage : true
				});
			}
			hasDoneFirstClick_interno = true;

		}
		event.stopImmediatePropagation();
	});
	$.post(getV('root') + getV('lingua') + '/sezione/poi.htm', {
		from_app : true,
		c_ajax : true,
		action : 'APPArticolo',
		idLuogo : getV('id_luoghi'),
		app : 'Pizza Barese'
	}, function(xml) {

		$(xml).find("luogo").each(function() {

			//Recupero tutti i dati dal database
			var id = $(this).find('id').text();
			var titolo = $(this).find('titolo').text();
			var sottotitolo = $(this).find('sottotitolo').text();
			var indirizzo = $(this).find('indirizzo').text();
			var civico = $(this).find('civico').text();
			var provincia = $(this).find('provincia').text();
			var citta = $(this).find('citta').text();
			var zona = $(this).find('zona').text();
			var geolocalizzato = $(this).find('geolocalizzato').text();
			var interno = $(this).find('interno').text();
			var latitudine = $(this).find('latitudine').text();
			var longitudine = $(this).find('longitudine').text();
			var checkins = $(this).find('checkins').text();
			var checkin_fatto_oggi = $(this).find('checkin_fatto_oggi').text();
			var itinerari_personalizzati = $(this).find('itinerari_personalizzati').text();

			var immagine_infopoint_dominio = $(this).find('immagine_infopoint_dominio').text();
			var immagine_infopoint_file = $(this).find('immagine_infopoint_file').text();
			var in_itinerario_personalizzato = $(this).find('in_itinerario_personalizzato').text();
			var descrizione = $(this).find('descrizione').text();
			var descrizione_senza_tags = $(this).find('descrizione_senza_tags').text();
			var totale_commenti = $(this).find('totale_commenti').text();
			var struttura_tipologia;
			var struttura_stelle;

			var tot_cucina = 0;
			var tot_servizi = 0;
			var tot_lingue = 0;

			$(this).find("cucina").each(function() {
				cucina_carne = $(this).find('cucina_carne').text();
				if(cucina_carne == 1)
					tot_cucina++;
				cucina_pesce = $(this).find('cucina_pesce').text();
				if(cucina_pesce == 1)
					tot_cucina++;
				cucina_celiachi = $(this).find('cucina_celiachi').text();
				if(cucina_celiachi == 1)
					tot_cucina++;
				cucina_vegetariani = $(this).find('cucina_vegetariani').text();
				if(cucina_vegetariani == 1)
					tot_cucina++;
				cucina_int_lattosio = $(this).find('cucina_int_lattosio').text();
				if(cucina_int_lattosio == 1)
					tot_cucina++;
				cucina_internazionale = $(this).find('cucina_internazionale').text();
				if(cucina_internazionale == 1)
					tot_cucina++;
				cucina_regionale = $(this).find('cucina_regionale').text();
				if(cucina_regionale == 1)
					tot_cucina++;
			});

			$(this).find("servizi").each(function() {
				servizio_parcheggio = $(this).find('servizio_parcheggio').text();
				if(servizio_parcheggio == 1)
					tot_servizi++;
				servizio_takeaway = $(this).find('servizio_takeaway').text();
				if(servizio_takeaway == 1)
					tot_servizi++;
				servizio_wifi = $(this).find('servizio_wifi').text();
				if(servizio_wifi == 1)
					tot_servizi++;
				servizio_diversamente_abili = $(this).find('servizio_diversamente_abili').text();
				if(servizio_diversamente_abili == 1)
					tot_servizi++;
				servizio_carta_credito = $(this).find('servizio_carta_credito').text();
				if(servizio_carta_credito == 1)
					tot_servizi++;
				servizio_domicilio = $(this).find('servizio_domicilio').text();
				if(servizio_domicilio == 1)
					tot_servizi++;
				servizio_live_music = $(this).find('servizio_live_music').text();
				if(servizio_live_music == 1)
					tot_servizi++;
			});

			$(this).find("lingue").each(function() {
				lingue_italiano = $(this).find('lingue_italiano').text();
				if(lingue_italiano == 1)
					tot_lingue++;
				lingue_inglese = $(this).find('lingue_inglese').text();
				if(lingue_inglese == 1)
					tot_lingue++;
				lingue_spagnolo = $(this).find('lingue_spagnolo').text();
				if(lingue_spagnolo == 1)
					tot_lingue++;
				lingue_francese = $(this).find('lingue_francese').text();
				if(lingue_francese == 1)
					tot_lingue++;
				lingue_russo = $(this).find('lingue_russo').text();
				if(lingue_russo == 1)
					tot_lingue++;
				lingue_tedesco = $(this).find('lingue_tedesco').text();
				if(lingue_tedesco == 1)
					tot_lingue++;
			});
			immagine = new Array();
			var k = 0;
			$(this).find('immagini').each(function() {
				$(this).find('immagine').each(function() {
					immagine[k] = $(this).text();
					k = k + 1;
				});
			});
			telefono = new Array();
			k = 0;
			$(this).find('contatti_telefono').each(function() {
				$(this).find('telefono').each(function() {
					telefono[k] = $(this).text();
					k = k + 1;
				});
			});
			email = new Array();
			k = 0;
			$(this).find('contatti_email').each(function() {
				$(this).find('email').each(function() {
					email[k] = $(this).text();
					k = k + 1;
				});
			});
			sito = new Array();
			k = 0;
			$(this).find('contatti_sito').each(function() {
				$(this).find('web').each(function() {
					sito[k] = $(this).text();
					k = k + 1;
				});
			});
			commenti = new Array();
			k = 0;
			$(this).find('commenti').each(function() {
				$(this).find('commento').each(function() {
					commenti[k] = new Array();
					commenti[k]['titolo_commento'] = $(this).find('titolo_commento').text();
					commenti[k]['firma_commento'] = $(this).find('firma_commento').text();
					commenti[k]['data_commento'] = $(this).find('data_commento').text();
					commenti[k]['testo_commento'] = $(this).find('testo_commento').text();
					k = k + 1;
				});
			});
			orario = new Array();
			k = 0;
			$(this).find('orari').each(function() {
				$(this).find('orario').each(function() {
					orario[k] = new Array();
					orario[k]['dayweek'] = $(this).find('dayweek').text();
					orario[k]['turno1_da'] = $(this).find('turno1_da').text();
					orario[k]['turno1_a'] = $(this).find('turno1_a').text();
					orario[k]['turno2_da'] = $(this).find('turno2_da').text();
					orario[k]['turno2_a'] = $(this).find('turno2_a').text();
					orario[k]['chiusura'] = $(this).find('chiusura').text();
					k = k + 1;
				});
			});
			var luogo_dove = indirizzo;
			if(indirizzo && civico)
				luogo_dove += ', ';
			if(civico)
				luogo_dove += civico;
			if(indirizzo && citta)
				luogo_dove += ' - ';
			if(citta)
				luogo_dove += citta;
			if(provincia && (provincia != citta))
				luogo_dove += ' (' + provincia + ')';

			$('#pizzeria-titolo').text(titolo);

			$('#pizzeria-prenota-titolo').text(titolo);
			$('#pizzeria-prenota-citta').text(citta);

			if(luogo_dove)
				$('#pizzeria-indirizzo').text(luogo_dove);

			if(immagine.length > 0) {

				$('#pizzeria-immagini').show();

				for( x = 0; x < 4; x++)
				if(immagine[x])
					$('#pizzeria-immagini').append('<img width="50px" height="50px" src="http://www.mrfogg.com/m/images/thumb/' + immagine[x] + '" /> ');
			} else
				$('#pizzeria-immagini').hide();

			$('#pizzeria-descrizione').html(descrizione);
			$('#pizzeria-commenti-totale-pulsante').html(totale_commenti);

			// **********************************
			// Disegno la galleria delle immagini
			// **********************************

			$('#Gallery').html('').trigger('create');

			if(immagine.length > 0) {

				for( x = 0; x < immagine.length; x++)
				$('#Gallery').append('<li><a rel="external" href="http://www.mrfogg.com/m/images/big/' + immagine[x] + '"><img src="http://www.mrfogg.com/m/images/thumb/' + immagine[x] + '" alt="' + (x + 1) + '/' + immagine.length + ' - ' + titolo + '" /></a></li>');

				var myPhotoSwipe = $("#Gallery a").photoSwipe({
					enableMouseWheel : false,
					enableKeyboard : false
				});
			}

			// ********
			// Servizi
			// ********
			var mk_lingue = "";
			var mk_cucina = "";
			var mk_servizi = "";

			if((tot_cucina + tot_servizi + tot_lingue) > 0) {
				$('#luogo_servizi').show();
				if(tot_cucina > 0) {
					$('#luogo_servizi_cucina').show();

					if(cucina_carne == 1)
						mk_cucina += "<img src='../images/ico-carne.jpg' style='margin-right: 5px;' />";
					if(cucina_pesce == 1)
						mk_cucina += "<img src='../images/ico-pesce.jpg' style='margin-right: 5px;' />";
					if(cucina_celiachi == 1)
						mk_cucina += "<img src='../images/ico-celiaci.jpg' style='margin-right: 5px;' />";
					if(cucina_vegetariani == 1)
						mk_cucina += "<img src='../images/ico-vegetariani.jpg' style='margin-right: 5px;' />";
					if(cucina_int_lattosio == 1)
						mk_cucina += "<img src='../images/ico-intolleranza-lattosio.jpg' style='margin-right: 5px;' />";
					if(cucina_internazionale == 1)
						mk_cucina += "<img src='../images/ico-cucina-internazionale.jpg' style='margin-right: 5px;' />";
					if(cucina_regionale == 1)
						mk_cucina += "<img src='../images/ico-cucina-regionale.jpg' style='margin-right: 5px;' />";

					$('#luogo_servizi_cucina_ico').html(mk_cucina);
				}
				if(tot_servizi > 0) {
					$('#luogo_servizi_servizi').show();

					if(servizio_parcheggio == 1)
						mk_servizi += "<img src='../images/ico-parcheggio.jpg' style='margin-right: 5px;' />";
					if(servizio_takeaway == 1)
						mk_servizi += "<img src='../images/ico-take-away.jpg' style='margin-right: 5px;' />";
					if(servizio_wifi == 1)
						mk_servizi += "<img src='../images/ico-wifi.jpg' style='margin-right: 5px;' />";
					if(servizio_diversamente_abili == 1)
						mk_servizi += "<img src='../images/ico-diversamente-abili.jpg' style='margin-right: 5px;' />";
					if(servizio_carta_credito == 1)
						mk_servizi += "<img src='../images/ico-carta-credito.jpg' style='margin-right: 5px;' />";
					if(servizio_domicilio == 1)
						mk_servizi += "<img src='../images/ico-domicilio.jpg' style='margin-right: 5px;' />";
					if(servizio_live_music == 1)
						mk_servizi += "<img src='../images/ico-live-music-jpg' style='margin-right: 5px;' />";

					$('#luogo_servizi_servizi_ico').html(mk_servizi);
				}
				if(tot_lingue > 0) {
					$('#luogo_servizi_lingue').show();

					if(lingue_italiano == 1)
						mk_lingue += "<img src='../images/ico-lingua-italiano.png' style='margin-right: 5px;' />";
					if(lingue_inglese == 1)
						mk_lingue += "<img src='../images/ico-lingua-inglese.png' style='margin-right: 5px;' />";
					if(lingue_francese == 1)
						mk_lingue += "<img src='../images/ico-lingua-francese.png' style='margin-right: 5px;' />";
					if(lingue_spagnolo == 1)
						mk_lingue += "<img src='../images/ico-lingua-spagnolo.png' style='margin-right: 5px;' />";
					if(lingue_tedesco == 1)
						mk_lingue += "<img src='../images/ico-lingua-tedesco.png' style='margin-right: 5px;' />";
					if(lingue_russo == 1)
						mk_lingue += "<img src='../images/ico-lingua-russo.png' style='margin-right: 5px;' />";

					$('#luogo_servizi_lingue_ico').html(mk_lingue);
				}

			}

			// *****
			// Orari
			// *****

			$('#pizzeria-orari').html('').trigger('create');

			if(orario.length > 0) {
				$('#pizzeria-orari-container').show();

				for( x = 0; x < orario.length; x++) {
					$('#pizzeria-orari').append('<tr><th>' + orario[x]['dayweek'] + '</th><td nowrap="nowrap">' + (orario[x]['chiusura'] == 1 ? 'Chiuso' : '') + (orario[x]['turno1_da'] && orario[x]['turno1_a'] ? orario[x]['turno1_da'] + '-' + orario[x]['turno1_a'] + ' ' : '') + (orario[x]['turno2_da'] && orario[x]['turno2_a'] ? orario[x]['turno2_da'] + '-' + orario[x]['turno2_a'] : '') + '</td></tr>');
				}
			} else
				$('#pizzeria-orari-container').hide();

			// ********
			// Contatti
			// ********

			$('#pizzeria-contatti').html('').trigger('create');

			if(telefono.length + email.length + sito.length > 0) {
				$('#pizzeria-contatti').show();
				var markup_contatti = "";
				markup_contatti += '<ul data-role="listview" data-theme="c">';

				for( x = 0; x < telefono.length; x++) {
					markup_contatti += '<li>';
					markup_contatti += '<a href="tel:+39' + telefono[x] + '">';
					markup_contatti += '<img width="16px" src="../images/75-phone.png" class="ui-li-icon">';
					markup_contatti += telefono[x];
					markup_contatti += '</a>';
					markup_contatti += '</li>';
				}

				for( x = 0; x < email.length; x++) {
					markup_contatti += '<li>';
					markup_contatti += '<a href="mailto:' + email[x] + '">';
					markup_contatti += '<img width="16px" src="../images/18-envelope.png" class="ui-li-icon">';
					markup_contatti += email[x];
					markup_contatti += '</a>';
					markup_contatti += '</li>';
				}

				for( x = 0; x < sito.length; x++) {
					markup_contatti += '<li>';
					markup_contatti += '<a href="http://' + sito[x] + '">';
					markup_contatti += '<img width="16px" src="../images/13-target.png" class="ui-li-icon">';
					markup_contatti += sito[x];
					markup_contatti += '</a>';
					markup_contatti += '</li>';
				}
				markup_contatti += '</ul>';
				$('#pizzeria-contatti').html(markup_contatti).trigger('create');
			} else
				$('#pizzeria-contatti').hide();

			// *************************
			// Pulsante Calcola percorso
			// *************************

			var url_gmaps = 'comgooglemaps://?daddr=' + latitudine + ',' + longitudine + '&saddr=' + getV('geo_lat_here') + ',' + getV('geo_lon_here') + '&mrsp=0&ht=it&ftr=0';
			var url_maps = "maps:saddr=" + getV('geo_lat_here') + "," + getV('geo_lon_here') + "&daddr=" + latitudine + "," + longitudine + "&dirflg=w";

			$(document).on('tap', '#pizzeria-pulsante-calcola-percorso', function(event) {

				event.preventDefault();
				event.stopImmediatePropagation();

				window.startapp.start({
					ios : url_gmaps
				}, function() {

				}, function() {

					navigator.notification.confirm('Per una navigazione migliore, ti consigliamo di installare Google Maps. Vuoi installarlo?', function(b) {
						if(parseInt(b) == 1) {
							window.startstart({
								ios : 'itms-apps://itunes.apple.com/it/app/google-maps/id585027354?mt=8'
							}, function() {
							}, function() {
							});
						} else {
							window.startapp.start({
								ios : url_maps
							}, function() {
							}, function() {
								navigator.notification.confirm('Non hai installato Google Maps sul tuo dispositivo. Vuoi installarlo?', function(b) {
									if(parseInt(b) == 1) {
										window.startstart({
											ios : 'itms-apps://itunes.apple.com/it/app/google-maps/id585027354?mt=8'
										}, function() {
										}, function() {
										});
									}
								}, 'Pizza Barese', 'Sì,No');
							});
						}
					}, 'Pizza Barese', 'Sì,No');
				});
			});
			// ******************************
			// Disegno la pagina dei commenti
			// ******************************

			$('#pizzeria-commenti-totale').html(totale_commenti + ' ' + (totale_commenti == 1 ? 'commento' : 'commenti'));
			$('#pizzeria-commenti-titolo').html(titolo);
			$('#pizzeria-commenti-lista').html('').trigger('create');

			for( x = 0; x < commenti.length; x++) {
				$('#pizzeria-commenti-lista').append('<div class="post_commento ' + ((x % 2 == 0) ? 'no' : 'odd') + '"><p><span class="post_commento_titolo png_bg">' + (x + 1) + '. ' + commenti[x]['titolo_commento'] + '</span></p> <p><span class="post_commento_autore png_bg">da ' + commenti[x]['firma_commento'] + ' il ' + commenti[x]['data_commento'] + '</span></p><p class="post_commento_testo">' + commenti[x]['testo_commento'] + '</p></div>');
			}

			// ********************
			// Inserimento commento
			// ********************

			$('#c_ID').val(id);
			$('#post_comments_form').show();
			$('#post_comments_result').hide();

			$(document).on('submit', '#form_commenti', function(event) {
				event.preventDefault();
				event.stopPropagation();
				$.post(getV('root') + getV('lingua') + '/sezione/poi.htm', {
					from_app : true,
					c_ajax : true,
					action : 'Commenta',
					firma : $('#firma_commento').val(),
					titolo : $('#titolo_commento').val(),
					commento : $('#testo_commento').val(),
					idRisorsa : $('#idRisorsa').val(),
					c_ID : $('#c_ID').val()
				}, function(data) {
					msg_esito = data.split('/');

					if(msg_esito[0] == 'Commento salvato') {
						$('#post_comments_form').hide();
						$('#post_comments_result').show();
					} else
						navigator.notification.alert(msg_esito[0], alertDismissed, "Pizza Barese", "Riprova");

				});
				event.stopImmediatePropagation();
			});
			// ******************
			// Calcola alla romana
			// ******************

			$(document).on('submit', '#pagaallaromana-form', function(event) {
				event.preventDefault();
				event.stopPropagation();
				var numeropersone = parseInt($('#pagaallaromana-persone').val());
				var importo = parseInt($('#pagaallaromana-importo').val());
				var mancia = parseInt($('#pagaallaromana-mancia').val());

				if((numeropersone > 0) && (importo > 0) && (mancia > 0)) {
					var a_testa = parseFloat((importo + mancia) / numeropersone).toFixed(2);

					switch(getV('lingua')) {
						case 'it':
							var msg = "Ogni persona deve pagare " + a_testa + " €";
							break;
						case 'en':
							var msg = "Each person has to pay " + a_testa + " €";
							break;
						case 'fr':
							var msg = "Ogni persona deve pagare " + a_testa + " €";
							break;
						case 'es':
							var msg = "Ogni persona deve pagare " + a_testa + " €";
							break;
					}

					navigator.notification.alert(msg, alertDismissed, "Pizza Barese", "Ok");
					$('#pagaallaromana-persone').val('');
					$('#pagaallaromana-importo').val('');
					$('#pagaallaromana-mancia').val('');
				}

				event.stopImmediatePropagation();
			});
			// *******************
			// Gestione fotocamera
			// *******************

			$(document).on('tap', '#pizzeria-pulsante-uploadfoto', function(event) {
				navigator.camera.getPicture(onPhotoDataSuccess, function(message) {
				}, {
					quality : 50,
					destinationType : navigator.camera.DestinationType.FILE_URI,
					sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY
				});
			});

			$(document).on('tap', '#pizzeria-pulsante-scattafoto', function(event) {
				navigator.camera.getPicture(onPhotoDataSuccess, function(message) {
				}, {
					quality : 50,
					destinationType : navigator.camera.DestinationType.FILE_URI,
					sourceType : navigator.camera.PictureSourceType.CAMERA
				});
			});
			function onPhotoDataSuccess(imageURI) {
				$.mobile.showPageLoadingMsg();
				var options = new FileUploadOptions();
				options.fileKey = "file";
				options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
				options.mimeType = "image/jpeg";
				options.chunkedMode = false;

				var ft = new FileTransfer();
				ft.upload(imageURI, getV('root') + getV('lingua') + '/sezione/poi/uploadfoto/' + getV('id_luoghi') + '.htm', win, fail, options);
			}

			function win(r) {
				if(parseInt(r.response) == 1)
					switch(getV('lingua')) {
						case 'it':
							navigator.notification.alert("Immagine caricata con successo", function() {
							}, "Pizza Barese", "Ok");
							break;
						case 'en':
							navigator.notification.alert("Image was uploaded successfully", function() {
							}, "Pizza Barese", "Ok");
							break;
						case 'es':
							navigator.notification.alert("Image was uploaded successfully", function() {
							}, "Pizza Barese", "Ok");
							break;
						case 'fr':
							navigator.notification.alert("Image was uploaded successfully", function() {
							}, "Pizza Barese", "Ok");
							break;
					}
				else
					switch(getV('lingua')) {
						case 'it':
							navigator.notification.alert("Errore nel caricamento dell'immagine", function() {
							}, "Pizza Barese", "Ok");
							break;
						case 'en':
							navigator.notification.alert("Load picture failed", function() {
							}, "Pizza Barese", "Ok");
							break;
						case 'es':
							navigator.notification.alert("Load picture failed", function() {
							}, "Pizza Barese", "Ok");
							break;
						case 'fr':
							navigator.notification.alert("Load picture failed", function() {
							}, "Pizza Barese", "Ok");
							break;
					}

				$.mobile.hidePageLoadingMsg();
			}

			function fail(error) {
				alert("An error has occurred: Code = " + error.message);

				$.mobile.hidePageLoadingMsg();
			}


			$(document).on('tap', '#pizzeria-pulsante-letturacommenti', function(event) {
				$('#pizzeria-leggicommenti').show();
				$('#pizzeria-commenta').hide();
				$('#post_comments_form').show();
				$('#post_comments_result').hide();
			});

			$(document).on('tap', '#pizzeria-pulsante-scritturacommenti', function(event) {
				$('#pizzeria-commenta').show();
				$('#pizzeria-leggicommenti').hide();
				$('#post_comments_form').show();
				$('#post_comments_result').hide();
			});
			// *************
			// Gestione voto
			// *************

			$(document).on('submit', '#form_vota', function(event) {

				$.mobile.showPageLoadingMsg();
				event.preventDefault();
				event.stopPropagation();
				var qualita;
				var servizio;
				var qprezzo;
				var errori = 0;

				if($('#pizzeria-voto-qualita-1').is(':checked'))
					qualita = 1;
				else if($('#pizzeria-voto-qualita-2').is(':checked'))
					qualita = 2;
				else if($('#pizzeria-voto-qualita-3').is(':checked'))
					qualita = 3;
				else
					errori++;

				if($('#pizzeria-voto-servizio-1').is(':checked'))
					servizio = 1;
				else if($('#pizzeria-voto-servizio-2').is(':checked'))
					servizio = 2;
				else if($('#pizzeria-voto-servizio-3').is(':checked'))
					servizio = 3;
				else
					errori++;

				if($('#pizzeria-voto-qprezzo-1').is(':checked'))
					qprezzo = 1;
				else if($('#pizzeria-voto-qprezzo-2').is(':checked'))
					qprezzo = 2;
				else if($('#pizzeria-voto-qprezzo-3').is(':checked'))
					qprezzo = 3;
				else
					errori++;

				if(errori > 0) {
					$.mobile.hidePageLoadingMsg();
					switch(getV('lingua')) {
						case 'it':
							navigator.notification.alert("Devi esprimere il giudizio per tutte le voci presenti (Qualità, Servizio, Qualità/Prezzo)", function() {
							}, "MrFogg", "Ok");
							break;
						case 'en':
							navigator.notification.alert("Devi esprimere il giudizio per tutte le voci presenti (Qualità, Servizio, Qualità/Prezzo)", function() {
							}, "MrFogg", "Ok");
							break;
						case 'es':
							navigator.notification.alert("Tienes que dejar un comentario para todos los campos siguientes (Calidad, Servicio, Calidad /Precio)", function() {
							}, "MrFogg", "Ok");
							break;
						case 'fr':
							navigator.notification.alert("Devi esprimere il giudizio per tutte le voci presenti (Qualità, Servizio, Qualità/Prezzo)", function() {
							}, "MrFogg", "Ok");
							break;
					}
				} else {
					/*idUtente : getV('idUtente'),*/

					$.post(getV('root') + getV('lingua') + '/sezione/poi.htm', {
						from_app : true,
						c_ajax : true,
						action : 'APPVota',
						idLuogo : getV('id_luoghi'),
						idUtente : 1,
						qualita : qualita,
						servizio : servizio,
						qprezzo : qprezzo

					}, function(data) {

						$.mobile.hidePageLoadingMsg();
						switch(data) {
							case "Votato":
								switch(getV('lingua')) {
									case 'it':
										var navm = "Hai espresso il tuo voto su questa pizzeria, grazie";
										break;
									case 'en':
										var navm = "Hai espresso il tuo voto su questa pizzeria, grazie";
										break;
									case 'fr':
										var navm = "Hai espresso il tuo voto su questa pizzeria, grazie";
										break;
									case 'es':
										var navm = "Acabas de dejar un voto para este pizzeria, gracias";
										break;
								}
								break;

							case "Aggiornato":
								switch(getV('lingua')) {
									case 'it':
										var navm = "Hai aggiornato il tuo voto su questa pizzeria, grazie";
										break;
									case 'en':
										var navm = "Hai aggiornato il tuo voto su questa pizzeria, grazie";
										break;
									case 'fr':
										var navm = "Hai aggiornato il tuo voto su questa pizzeria, grazie";
										break;
									case 'es':
										var navm = "Acabas de poner al día tu voto para este pizzeria, gracias";
										break;
								}
								break;

							default:
								switch(getV('lingua')) {
									case 'it':
										var navm = "Errore nell'applicazione, riprova di nuovo";
										break;
									case 'en':
										var navm = "Errore nell'applicazione, riprova di nuovo";
										break;
									case 'fr':
										var navm = "Errore nell'applicazione, riprova di nuovo";
										break;
									case 'es':
										var navm = "Error de aplicación, prueba otra vez";
										break;
								}
								break;
						}
						navigator.notification.alert(navm, function() {
						}, "Pizza Barese", "Ok");
					});
				}
				event.stopImmediatePropagation();
			});
			// **********************
			// Condividi con facebook
			// **********************

			var link_fb = "http://www.facebook.com/sharer.php?u=http://www.autenticapizzabarese.it/&t=" + titolo + " su PizzaBareseApp App";

			$('#pizzeria-pulsante-facebook').attr('href', link_fb).trigger('create');

			// **********************
			// Condividi con twitter
			// **********************

			var link_tw = "http://twitter.com/home?status=" + titolo + " su PizzaBareseApp App+-+http://www.autenticapizzabarese.it/";

			$('#pizzeria-pulsante-twitter').attr('href', link_tw).trigger('create');
		});
		// *******************************
		// Fine Caricamento, mostra pagina
		// *******************************
		$('#luogo_loading').hide();
		$('#articolo').show();
	});
});

$(document).on('pagebeforeshow', '#pagina-luoghi-articolo', function(event) {

});

$(document).on('pageshow', '#pagina-luoghi-articolo', function(event) {

});

$(document).on('pagebeforehide', '#pagina-luoghi-articolo', function(event) {

});

$(document).on('pagehide', '#pagina-luoghi-articolo', function(event) {
	$(document).off('tap', '#pizzeria-pulsante-calcola-percorso');
});


$(document).on('pageshow', '#pagina-login-login', function(event) {
	 
});

$(document).on('pagebeforeshow', '#pagina-login-login', function(event) {
	 
});

$(document).on('pagebeforehide', '#pagina-login-login', function(event) {

});

$(document).on('pagehide', '#pagina-login-login', function(event) {

});

$(document).on('pageinit', '#pagina-login-login', function(event) {
 	if(getV('lingua') === null) setV('lingua', 'it')
	if(getV('email_pizze_registrata') !== null){
		 
		$.mobile.changePage('menu.html');
		return;
	}
 
	$('#form_login').submit(function(event) {

		$.mobile.showPageLoadingMsg();
		event.preventDefault();
		event.stopPropagation();

		var sesso = "";
		sesso = 'm';

		$.post('http://www.mrfogg.com/m/it/modulo/login.htm', {
			from_app : true,
			c_ajax : true,
			action : 'APPLogin2',
			app_login_email : $('#email_registrazione_it').val(),
			app_login_telefono : $('#tel_registrazione_it').val(),
			app_login_citta : $('#citta_registrazione_it').val(),
			app_login_sesso : sesso
		}, function(xml) {

			$(xml).find("utente").each(function() {

				//Recupero tutti i dati dal database
				var idUtente = $(this).find('idUtente').text();
				var username = $(this).find('username').text();
				var error = $(this).find('error').text();
 
				if(parseInt(error) == 0) {
					$.mobile.hidePageLoadingMsg();
					setV('email_pizze_registrata', username);
					setV('profilo-email', $('#email_registrazione_it').val());
					setV('profilo-citta', $('#citta_registrazione_it').val());
					setV('profilo-telefono', $('#tel_registrazione_it').val());
					$.mobile.changePage('menu.html');
				} else {
					$.mobile.hidePageLoadingMsg();

					switch(error) {
						case '1':
							switch(getV('lingua')) {
								case 'it':
									navigator.notification.alert("Indirizzo e-mail errato", function() {
									}, "MrFogg", "Riprova");
									break;

								case 'en':
									navigator.notification.alert("E-mail address wrong", function() {
									}, "MrFogg", "Riprova");
									break;

								case 'fr':
									navigator.notification.alert("Adresse e-mail incorrecte", function() {
									}, "MrFogg", "Riprova");
									break;

								case 'es':
									navigator.notification.alert("Dirección de correo electrónico incorrecta", function() {
									}, "MrFogg", "Riprova");
									break;
							}

							break;
						case '2':
							switch(getV('lingua')) {
								case 'it':
									navigator.notification.alert("Indicare il sesso (Uomo o Donna)", function() {
									}, "MrFogg", "Riprova");
									break;

								case 'en':
									navigator.notification.alert("Enter your gender (Male or Female)", function() {
									}, "MrFogg", "Riprova");
									break;

								case 'fr':
									navigator.notification.alert("Entrez votre sexe (Masculin ou Féminin)", function() {
									}, "MrFogg", "Riprova");
									break;

								case 'es':
									navigator.notification.alert("Ingrese su género (Masculino o Femenino)", function() {
									}, "MrFogg", "Riprova");
									break;
							}
							break;
					}
				}
			});
		});

		event.stopImmediatePropagation();

	});
	function alertDismissed() {
	}

});


$(document).on('pageinit', '#pagina-adesione-form', function(event) {
	pizzabarese_start();

	$('#adesione-form').submit(function(event) {

		$.mobile.showPageLoadingMsg();
		event.preventDefault();
		event.stopPropagation();

		$.post('http://www.mrfogg.com/m/it/sezione/poi.htm', {
			from_app : true,
			c_ajax : true,
			action : 'AdesionePizzeria',
			nome : $('#pizzeria-nome').val(),
			proprietario : $('#pizzeria-proprietario').val(),
			indirizzo : $('#pizzeria-indirizzo').val(),
			citta : $('#pizzeria-citta').val(),
			telefono : $('#pizzeria-telefono').val(),
			email : $('#pizzeria-email').val(),
			associazione : $('#pizzeria-associazione').val()
		}, function(data) {

			if(parseInt(data) == 0) {
				$.mobile.hidePageLoadingMsg();

				navigator.notification.alert("La tua richiesta è stato inviata correttamente. Sarai contattato al più presto dallo staff.", function() {
				}, "PizzaBarese", "Ok");
				
				$('#adesione-form')[0].reset();
			} else {
				$.mobile.hidePageLoadingMsg();

				navigator.notification.alert(data, function() {
				}, "PizzaBarese", "Riprova");
			}

		});

		event.stopImmediatePropagation();

	});
	function alertDismissed() {
	}

});

$(document).on('pagebeforeshow', '#pagina-adesione-form', function(event) {

});

$(document).on('pageshow', '#pagina-adesione-form', function(event) {

});

$(document).on('pagebeforehide', '#pagina-adesione-form', function(event) {

});

$(document).on('pagehide', '#pagina-adesione-form', function(event) {

});


$(document).on('pageinit', '#pagina-menu-menu', function(event) {

	pizzabarese_start();

	setV('id_luoghi', 0);
	setV('id_vicino', 0);

	$(document).on('touchstart', '.pulsante_menu', function(event) {
		var back = $(this).attr('href');
		$(this).addClass("ui-btn-active");
		$.mobile.showPageLoadingMsg();
		event.preventDefault();

		$.mobile.changePage(back);
		event.stopImmediatePropagation();
	});
});

$(document).on('pagebeforeshow', '#pagina-menu-menu', function(event) {

});

$(document).on('pageshow', '#pagina-menu-menu', function(event) {

});

$(document).on('pagebeforehide', '#pagina-menu-menu', function(event) {

});

$(document).on('pagehide', '#pagina-menu-menu', function(event) {

});


$(document).on('pageinit', '#pagina-galleria-galleria', function(event) {

	pizzabarese_start();

	var myPhotoSwipe = $("#Gallery a").photoSwipe({
		enableMouseWheel : false,
		enableKeyboard : false
	});

	// *******************
	// Gestione fotocamera
	// *******************

	$(document).on('tap', '.uploadfoto', function(event) {
		navigator.camera.getPicture(onPhotoDataSuccess, function(message) {
		}, {
			quality : 50,
			destinationType : navigator.camera.DestinationType.FILE_URI,
			sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY
		});
	});

	$(document).on('tap', '.scattafoto', function(event) {
		navigator.camera.getPicture(onPhotoDataSuccess, function(message) {
		}, {
			quality : 50,
			destinationType : navigator.camera.DestinationType.FILE_URI,
			sourceType : navigator.camera.PictureSourceType.CAMERA
		});
	});
	function onPhotoDataSuccess(imageURI) {
		$.mobile.showPageLoadingMsg();
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
		options.mimeType = "image/jpeg";
		options.chunkedMode = false;

		var ft = new FileTransfer();
		ft.upload(imageURI, getV('root') + getV('lingua') + '/sezione/poi/uploadfotopizza/0.htm', win, fail, options);
	}

	function win(r) {
		if(parseInt(r.response) == 1)
			switch(getV('lingua')) {
				case 'it':
					navigator.notification.alert("Immagine caricata con successo", function() {
					}, "Pizza Barese", "Ok");
					break;
				case 'en':
					navigator.notification.alert("Image was uploaded successfully", function() {
					}, "Pizza Barese", "Ok");
					break;
				case 'es':
					navigator.notification.alert("Image was uploaded successfully", function() {
					}, "Pizza Barese", "Ok");
					break;
				case 'fr':
					navigator.notification.alert("Image was uploaded successfully", function() {
					}, "Pizza Barese", "Ok");
					break;
			}
		else
			switch(getV('lingua')) {
				case 'it':
					navigator.notification.alert("Errore nel caricamento dell'immagine", function() {
					}, "Pizza Barese", "Ok");
					break;
				case 'en':
					navigator.notification.alert("Load picture failed", function() {
					}, "Pizza Barese", "Ok");
					break;
				case 'es':
					navigator.notification.alert("Load picture failed", function() {
					}, "Pizza Barese", "Ok");
					break;
				case 'fr':
					navigator.notification.alert("Load picture failed", function() {
					}, "Pizza Barese", "Ok");
					break;
			}

		$.mobile.hidePageLoadingMsg();
	}

	function fail(error) {
		alert("An error has occurred: Code = " + error.message);

		$.mobile.hidePageLoadingMsg();
	}

});

$(document).on('pagebeforeshow', '#pagina-galleria-galleria', function(event) {

});

$(document).on('pageshow', '#pagina-galleria-galleria', function(event) {

});

$(document).on('pagebeforehide', '#pagina-galleria-galleria', function(event) {

});

$(document).on('pagehide', '#pagina-galleria-galleria', function(event) {

});


$(document).on('pageinit', '#pagina-luoghi-articolovicino', function(event) {

	pizzabarese_start();

	$(document).on('tap', '#ctrl-vicino-vicino', function(event) {
		$('#div-vicino-vicino').show();
		$('#div-vicino-contatti').hide();
	});

	$(document).on('tap', '#ctrl-vicino-contatti', function(event) {
		$('#div-vicino-vicino').hide();
		$('#div-vicino-contatti').show();
	});

	$.post(getV('root') + getV('lingua') + '/sezione/poi.htm', {
		from_app : true,
		c_ajax : true,
		action : 'APPArticolo',
		idLuogo : getV('id_vicino')
	}, function(xml) {

		$(xml).find("luogo").each(function() {

			//Recupero tutti i dati dal database
			var id = $(this).find('id').text();
			var titolo = $(this).find('titolo').text();
			var sottotitolo = $(this).find('sottotitolo').text();
			var indirizzo = $(this).find('indirizzo').text();
			var civico = $(this).find('civico').text();
			var provincia = $(this).find('provincia').text();
			var citta = $(this).find('citta').text();
			var zona = $(this).find('zona').text();
			var geolocalizzato = $(this).find('geolocalizzato').text();
			var interno = $(this).find('interno').text();
			var latitudine = $(this).find('latitudine').text();
			var longitudine = $(this).find('longitudine').text();
			var checkins = $(this).find('checkins').text();
			var checkin_fatto_oggi = $(this).find('checkin_fatto_oggi').text();
			var itinerari_personalizzati = $(this).find('itinerari_personalizzati').text();

			var immagine_infopoint_dominio = $(this).find('immagine_infopoint_dominio').text();
			var immagine_infopoint_file = $(this).find('immagine_infopoint_file').text();
			var in_itinerario_personalizzato = $(this).find('in_itinerario_personalizzato').text();
			var descrizione = $(this).find('descrizione').text();
			var descrizione_senza_tags = $(this).find('descrizione_senza_tags').text();
			var totale_commenti = $(this).find('totale_commenti').text();
			var struttura_tipologia;
			var struttura_stelle;
			immagine = new Array();
			var k = 0;
			$(this).find('immagini').each(function() {
				$(this).find('immagine').each(function() {
					immagine[k] = $(this).text();
					k = k + 1;
				});
			});
			telefono = new Array();
			k = 0;
			$(this).find('contatti_telefono').each(function() {
				$(this).find('telefono').each(function() {
					telefono[k] = $(this).text();
					k = k + 1;
				});
			});
			email = new Array();
			k = 0;
			$(this).find('contatti_email').each(function() {
				$(this).find('email').each(function() {
					email[k] = $(this).text();
					k = k + 1;
				});
			});
			sito = new Array();
			k = 0;
			$(this).find('contatti_sito').each(function() {
				$(this).find('web').each(function() {
					sito[k] = $(this).text();
					k = k + 1;
				});
			});
			orario = new Array();
			k = 0;
			$(this).find('orari').each(function() {
				$(this).find('orario').each(function() {
					orario[k] = new Array();
					orario[k]['dayweek'] = $(this).find('dayweek').text();
					orario[k]['turno1_da'] = $(this).find('turno1_da').text();
					orario[k]['turno1_a'] = $(this).find('turno1_a').text();
					orario[k]['turno2_da'] = $(this).find('turno2_da').text();
					orario[k]['turno2_a'] = $(this).find('turno2_a').text();
					orario[k]['chiusura'] = $(this).find('chiusura').text();
					k = k + 1;
				});
			});
			var vicino_dove = indirizzo;
			if(indirizzo && civico)
				vicino_dove += ', ';
			if(civico)
				vicino_dove += civico;
			if(indirizzo && citta)
				vicino_dove += ' - ';
			if(citta)
				vicino_dove += citta;
			if(provincia && (provincia != citta))
				vicino_dove += ' (' + provincia + ')';

			$('#vicino-titolo').text(titolo);

			if(vicino_dove)
				$('#vicino-indirizzo').text(vicino_dove);

			if(immagine.length > 0) {

				$('#vicino-immagini').show();

				for( x = 0; x < 4; x++)
				if(immagine[x])
					$('#vicino-immagini').append('<img width="50px" height="50px" src="http://www.mrfogg.com/m/images/thumb/' + immagine[x] + '" /> ');
			} else
				$('#vicino-immagini').hide();

			$('#vicino-descrizione').html(descrizione);

			// *****
			// Orari
			// *****

			$('#vicino-orari').html('').trigger('create');

			if(orario.length > 0) {
				$('#vicino_orari').show();
				for( x = 0; x < orario.length; x++) {
					$('#vicino-orari').append('<tr><th>' + orario[x]['dayweek'] + '</th><td nowrap="nowrap">' + (orario[x]['chiusura'] == 1 ? 'Chiuso' : '') + (orario[x]['turno1_da'] && orario[x]['turno1_a'] ? orario[x]['turno1_da'] + '-' + orario[x]['turno1_a'] + ' ' : '') + (orario[x]['turno1_da'] && orario[x]['turno1_a'] ? orario[x]['turno1_da'] + '-' + orario[x]['turno1_a'] : '') + '</td></tr>');
				}
			} else
				$('#vicino-orari-container').hide();

			// ********
			// Contatti
			// ********

			$('#vicino-contatti').html('').trigger('create');

			if(telefono.length + email.length + sito.length > 0) {
				$('#vicino-contatti').show();
				var markup_contatti = "";
				markup_contatti += '<ul data-role="listview" data-theme="c">';

				for( x = 0; x < telefono.length; x++) {
					markup_contatti += '<li>';
					markup_contatti += '<a href="tel:+39' + telefono[x] + '">';
					markup_contatti += '<img width="16px" src="../images/75-phone.png" class="ui-li-icon">';
					markup_contatti += telefono[x];
					markup_contatti += '</a>';
					markup_contatti += '</li>';
				}

				for( x = 0; x < email.length; x++) {
					markup_contatti += '<li>';
					markup_contatti += '<a href="mailto:' + email[x] + '">';
					markup_contatti += '<img width="16px" src="../images/18-envelope.png" class="ui-li-icon">';
					markup_contatti += email[x];
					markup_contatti += '</a>';
					markup_contatti += '</li>';
				}

				for( x = 0; x < sito.length; x++) {
					markup_contatti += '<li>';
					markup_contatti += '<a href="http://' + sito[x] + '">';
					markup_contatti += '<img width="16px" src="../images/13-target.png" class="ui-li-icon">';
					markup_contatti += sito[x];
					markup_contatti += '</a>';
					markup_contatti += '</li>';
				}
				markup_contatti += '</ul>';
				$('#vicino-contatti').html(markup_contatti).trigger('create');
			} else
				$('#vicino-contatti').hide();

			// *************************
			// Pulsante Calcola percorso
			// *************************

			link_gmaps = "http://maps.google.com/maps?daddr=" + latitudine + "," + longitudine + "&dirflg=w&saddr=" + getV('geo_lat_here') + "," + getV('geo_lon_here');

			$('#vicino-pulsante-calcola-percorso').attr('href', link_gmaps).trigger('create');

		});
		// *******************************
		// Fine Caricamento, mostra pagina
		// *******************************
		$('#vicino_loading').hide();
		$('#articolo').show();
	});
});

$(document).on('pagebeforeshow', '#pagina-luoghi-articolovicino', function(event) {

});

$(document).on('pageshow', '#pagina-luoghi-articolovicino', function(event) {

});

$(document).on('pagebeforehide', '#pagina-luoghi-articolovicino', function(event) {

});

$(document).on('pagehide', '#pagina-luoghi-articolovicino', function(event) {

});


$(document).on('pageinit', '#pagina-luoghi-elencovicino', function(event) {

	pizzabarese_start();

	//pulsante_where();
	setV('id_vicino', 0);

	var hasDoneFirstClick_vicino = false;

	$(document).on('tap', '.vicino_link', function(event) {

		event.preventDefault();
		if(!hasDoneFirstClick_vicino) {
			$(this).addClass("ui-btn-active");
			$.mobile.showPageLoadingMsg();

			setV('id_vicino', event.target.id.split('_')[1]);

			if(parseInt(getV('id_vicino')) > 0)
				$.mobile.changePage('luogo.html');
			hasDoneFirstClick_vicino = true;
			event.stopImmediatePropagation();

		}
	});

	$.post(getV('root') + getV('lingua') + '/sezione/poi.htm', {
		from_app : true,
		c_ajax : true,
		action : 'APPArticolo',
		idLuogo : getV('id_luoghi'),
		app : 'Pizza Barese'
	}, function(xml) {

		$(xml).find("luogo").each(function() {
			vicino = new Array();
			k = 0;
			$(this).find('vedere_vicino').each(function() {

				$(this).find('vedere_vicino_luogo').each(function() {

					vicino[k] = new Array();
					vicino[k]['id'] = $(this).find('id_vicino').text();
					vicino[k]['titolo'] = $(this).find('titolo_vicino').text();
					vicino[k]['immagine'] = $(this).find('immagine_vicino').text();
					vicino[k]['distanza'] = $(this).find('distanza_vicino').text();
					vicino[k]['testo'] = $(this).find('testo_vicino').text();
					vicino[k]['indirizzo'] = $(this).find('indirizzo_vicino').text();
					vicino[k]['civico'] = $(this).find('civico_vicino').text();
					k = k + 1;
				});
			});
			// ******************
			// Vicino / Da vedere
			// ******************

			$('#pizzeria-vicino').html('').trigger('create');

			if(vicino.length > 0) {
				$('#pizzeria-vicino').show();
				var markup_vicino = "";
				markup_vicino += '<ul data-role="listview" data-theme="c">';

				for( x = 0; x < vicino.length; x++) {
					if(x < 3) {
						markup_vicino += '<li id="li_' + vicino[x]['id'] + '">';
						markup_vicino += '<a class="vicino_link" style=\"display: block;\" id="a_' + vicino[x]['id'] + '" href="#">';

						if(vicino[x]['immagine'] != '-') {
							if(vicino[x]['immagine'].indexOf('infopoint') > -1)
								markup_vicino += "<img width=\"80px\" id=\"img_" + vicino[x]['id'] + "\" height=\"80px\" src=\"" + vicino[x]['immagine'] + "\" />";
							else
								markup_vicino += "<img width=\"80px\" height=\"80px\" id=\"img_" + vicino[x]['id'] + "\" src=\"" + getV('root') + "images/thumb/" + vicino[x]['immagine'] + "\" />";
						} else
							markup_vicino += "<img width=\"80px\" height=\"80px\" id=\"img_" + vicino[x]['id'] + "\" src=\"" + getV('root') + "templates/iBari/images/default.png\" />";
						markup_vicino += '<h3 id="h3_' + vicino[x]['id'] + '">' + vicino[x]['titolo'] + '</h3>';
						markup_vicino += "<p id=\"p_" + vicino[x]['id'] + "\" >";

						if(parseInt(vicino[x]['distanza']) < 1000)
							var distanza = parseInt(vicino[x]['distanza']) + ' m';
						else
							var distanza = (parseInt(vicino[x]['distanza']) / 1000) + ' km';
						markup_vicino += distanza.replace('.', ',');
						markup_vicino += '</p></a>';
						markup_vicino += '</li>';
					}
				}
				markup_vicino += '<li id="li_0">';
				markup_vicino += '<a id="a_0" href="mrfogg.html" style=\"display: block;\">';
				markup_vicino += "<img width=\"80px\" height=\"80px\" id=\"img_0\" src=\"../images/mrfogg.jpg\" />";
				switch(getV('lingua')) {
					case 'it':
						markup_vicino += '<h3 id="h3_0">VUOI SAPERNE DI PIU\’?</h3>';
						break;

					case 'en':
						markup_vicino += '<h3 id="h3_0">WANT TO LEARN MORE?</h3>';
						break;

				}
				markup_vicino += '<p id="p_0">&nbsp;</p>';
				markup_vicino += '</a>';
				markup_vicino += '</li>';
				markup_vicino += '</ul>';
				$('#pizzeria-vicino').html(markup_vicino).trigger('create');
				$('#pizzeria-vicino ul').listview('refresh');
			} else
				$('#pizzeria-vicino').hide();
		});
	});
});

$(document).on('pagebeforeshow', '#pagina-luoghi-elencovicino', function(event) {

});

$(document).on('pageshow', '#pagina-luoghi-elencovicino', function(event) {

});

$(document).on('pagebeforehide', '#pagina-luoghi-elencovicino', function(event) {

});

$(document).on('pagehide', '#pagina-luoghi-elencovicino', function(event) {

});

