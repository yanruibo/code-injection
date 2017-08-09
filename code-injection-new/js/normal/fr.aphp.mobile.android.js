











// Wait for PhoneGap to load
document.addEventListener("deviceready", function() {
	aphp.device = device;
}, false);

$(document).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
	// -- AJAX
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;
    // -- Transitions causes flicker on Android
    $.mobile.defaultPageTransition = 'none';
    // -- Loading messages
    $.mobile.loadingMessageTextVisible = true;
    $.mobile.loadingMessage = 'Chargement...';
    $.mobile.loadingMessageTheme = "b";
    // -- Disable tapToggle on fixed toolbars
    $.mobile.fixedtoolbar.prototype.options.tapToggle = false;
});

/*
 * EVENT: jQuery Ready Function 
 */
$(function() {
	// Global ajax error event
	$(document).ajaxError(function(event, request, settings) {
		navigator.notification.alert(
			"Impossible de se connecter à: "+settings.url+" - Statut: "+request.status,
			null,
			"Erreur",
			"Continuer"
		);
	});
	
	// load hopitaux
	$.getJSON('json/hopitaux.json').success(function(data) {
		$.each(data, function(key) {
			hopital = data[key];
			// Store data
			aphp.hopitaux[hopital.id] = hopital;
			
			// Build consultation filter
			html  = '<option value="'+hopital.id+'">'+hopital.nom+'</option>';
			$('#consultations-search-hopital').append(html);
		});
	});
	
	/*
	 * CONSULTATIONS
	 */
	// Reset fields when switching between collapsibles
	$('#consultations div[data-role=collapsible] h3').click(function(e){
		$('#consultations-search-free').val('');
		$('#consultations-search-hopital').val('').selectmenu('refresh', true);
		$('#consultations-search-medecin').val('');
	});
	
	// Improve appearance: first and last p in a block shouldn't have top/bottom margin
	paragraphs = $('#consultations-detail div.ui-bar p')
	paragraphs.first().addClass('p-first');
	paragraphs.last().addClass('p-last');
	
	// Redraw footer hacks
	// Use change event on selects
	$('select').change(function(e) {
		$(e.target).blur();
	});
	// Use keypress:Enter on text inputs 
	$("input[type=text]").live("keypress", function(e) {
		if (e.keyCode == 13) { $(e.target).blur(); }
    });
});

/*
 * Global page show event: reset selected tab
 */
$('div[data-role=page]').live('pageshow', function(){
	$('div[data-role=footer] a').removeClass('ui-btn-active');
});

/*
 * Hopital domain: select tab
 */
$('#hopitaux, #hopitaux-list, #hopitaux-detail').live('pageshow', function(){
	$('.icon-hopitaux').addClass('ui-btn-active');
});

/*
 * Consultation domain: select tab
 */
$('#consultations, #consultations-list, #consultations-detail').live('pageshow', function(){
	$('.icon-consultations').addClass('ui-btn-active');
});

/*
 * News domain: select tab
 */
$('#news').live('pageshow', function(){
	$('.icon-informations').addClass('ui-btn-active');
});

/*
 * FUNCTIONS
 */
(function( aphp, $, undefined ) {
	// PhoneGap's Device info
	aphp.device = {};
	
	// Objet Latitude/Longitude pour contenir un point geographique
	aphp.LatLng = function(lat, lng) {
		this.lat = lat;
		this.lng = lng;
	};
	
	// Localisation courante
	aphp.currentLocation = {};
	
	/**
	 * Fonction de géolocalisation
	 * @param success {Function}
	 * @param error {Function}
	 */
	aphp.geoLocation = function(success, error) {
		$.mobile.showPageLoadingMsg();
		$('.ui-loader h1').text('Localisation...');
		
		navigator.geolocation.getCurrentPosition(
			function(position) {
				aphp.currentLocation = new aphp.LatLng(position.coords.latitude, position.coords.longitude);
				$.mobile.hidePageLoadingMsg();
				$('.ui-loader h1').text('Chargement...');
				success();
			},
			function() {
				$.mobile.hidePageLoadingMsg();
				error();
			},
			aphp.localisationOptions
		);
	}
	
	// Options de localisation
	aphp.localisationOptions = { enableHighAccuracy: true, maximumAge: 60000, timeout: 20000 };
	
	// Liste des hopitaux
	aphp.hopitaux = [];
	
	// Liste des consultations ramenées par la dernière requete
	aphp.consultations = [];
	
	// Retourne la distance entre l'hopital et la localisation courante
	aphp.distanceTo = function(hopital) {
		return distance(aphp.currentLocation, hopital);
	};
	
	// Crée un lien vers l'application Maps
	aphp.addMapsLink = function(selector, hopital) {
		var url = 'http://maps.google.com/maps?q='+hopital.lat+','+hopital.lng;
		
		if (aphp.device.platform == 'iPhone') {
			// Hack for iPhone
			$(selector).bind('tap', function() {
				window.location = url;
			});
		}
		else {
			$(selector).attr('href', url);
		}
	}
}( window.aphp = window.aphp || {}, jQuery ));

/**
 * Sort by any field.
 * @see http://stackoverflow.com/questions/979256/how-to-sort-an-array-of-objects
 * @param field String containing the field.
 * @param reverse Boolean (ASC/DESC).
 * @param primer Function to use for the sort.
 * @returns {Function}
 */
function sortBy(field, reverse, primer) {

	reverse = (reverse) ? -1 : 1;

	return function(a, b) {

		a = a[field];
		b = b[field];

		if (typeof (primer) != 'undefined') {
			a = primer(a);
			b = primer(b);
		}

		if (a < b)
			return reverse * -1;
		if (a > b)
			return reverse * 1;
		return 0;
	}
}

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

/**
 * Calculates the distance between two LatLng points.
 * @see http://www.movable-type.co.uk/scripts/latlong.html
 * @param origin {LatLng}
 * @param destination {LatLng}
 * @returns {Number}
 */
function distance(origin, destination) {
	// cast
	origin.lat = Number(origin.lat);
	origin.lng = Number(origin.lng);
	destination.lat = Number(destination.lat);
	destination.lng = Number(destination.lng);
	var R = 6371; // Radius of the earth in km
	var dLat = (destination.lat-origin.lat).toRad();  // Javascript functions in radians
	var dLon = (destination.lng-origin.lng).toRad(); 
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	        Math.cos(origin.lat.toRad()) * Math.cos(destination.lat.toRad()) * 
	        Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	// Return with x.x precision
	return Math.round(d*10)/10;
}

/**
 * Formats a telephone number.
 * @param telephone {String}
 * @returns {String}
 */
function formatTel(telephone) {
	return	  telephone.substr(0,2) + ' '
			+ telephone.substr(2,2) + ' '
			+ telephone.substr(4,2) + ' '
			+ telephone.substr(6,2) + ' '
			+ telephone.substr(8,2);
}

/**
 * Formats consultation consult and stock it in a new field : horaires.
 * @param consultation
 * @returns {Object}
 */
function transformHoraires(consultation) {

	var chaine = consultation.horaire_consultation;
	// Le tableau contiendra des objets avec deux champs, un champ jour et un champ plages.
	var result = [];

	// Si notre chaine est non vide.
	if (chaine != null && chaine != "") {
		// On explose notre chaine en prenant comme separateur '|'.
		// On obtient un tableau contenant des chaines de caractères.
		// Chaque chaine contient les informations suivantes : le jour,et la ou les plages associées à ce jour.
		var element = chaine.split('|');    
		
		// Pour chaque chaine :
		for (val in element) { 
			
			// On separe les jours et les plages en splitant notre chaine sur la balise ':'.
			var temp = [];
			temp = element[val].split(':');
			// On recupere le jour.
			var jour = temp[0];
			// On remplit notre tableau de plages. Celles-ci sont separees par des ','.
			var plage = [];
			plage = temp[1].split(',');	
	
			// On remplit notre tableau resultat.					
			result[val] = {
				jour:	jour,
				plages:	plage
			};			
		};
	}
	// On retourne notre tableau de resultat.
	consultation.horaires = result;
	return consultation;
}


/**
 * Create a string based on consultation horaires. This string contains a list of the consultation's days.
 * @param horaires {String}
 * @returns {String}
 */
function formatHoraires(horaires) {
	var chaine ='';
	// On construit un string contenant les jours de consultation.
	for (val in horaires) {
		chaine = chaine + horaires[val].jour + ', ';
	}
	// On retire le ', ' en trop de la fin de notre string et on le retourne.
	return chaine.substring(0, chaine.length - 2);
}


/**
 * Create a string based on consultation horaires. 
 * This string is a succession of substring : 'day : list of plage'.
 * @param horaires {String}
 * @returns {String}
 */
function formatHorairesDetail(horaires) {
	var chaine = '';
	// Pour chaque couple jour - plages
	for (val in horaires) {
		var chainePlage = '';
		// On construit un string contenant toutes les plages associees au couple courant.
		for (val2 in horaires[val].plages) {
			chainePlage = chainePlage + horaires[val].plages[val2] + ', ';
		}
		// On retire le ', ' en trop de la fin de notre string.
		chainePlage = chainePlage.substring(0, chainePlage.length - 2);
		// On cree notre string de resultat en associant à un jour les plages correspondantes.
		// On saute une ligne tant qu'on est pas en train d'affichier le dernier couple.
		if (val < horaires.length) {
			chaine = chaine + horaires[val].jour + ' : ' + chainePlage + '<br/>';
		}
		// Pas besoin de sauter une ligne pour le dernier.
		else {
			chaine = chaine + horaires[val].jour + ' : ' + chainePlage;
		}
	}
	return chaine;
}

$(function() {
	// webservice URL
	var URL		= 'http://s184-21.aphp.fr/webservices/wsrv_aphp_os.php';
	// limite de rÃ©sultats
	var limit	= 50;
	
	// Search Clicked
	$('#consultations-search').click(function(){
		$.mobile.showPageLoadingMsg();
		var keywords = $('#consultations-search-free').val();
		keywords = (keywords != '') ? keywords : 0;
		$.getJSON(URL,{
			// Parameters
			action:		'retourneConsultations',
			lim:		limit,
			mots:		keywords,
			medecin:	$('#consultations-search-medecin').val(),
			hopital:	$("#consultations-search-hopital option:selected").val()
		}).success(function(data) {
			$.mobile.hidePageLoadingMsg();
			// Set searchbar text
			var txt;
			//		Reset hopital
			$('#consultations-list-search-hopital').html('Tous les hÃ´pitaux');
			//		Free search
			if ($('#consultations-search-free').val()) {
				$('#consultations-list-search-keyword').html($('#consultations-search-free').val());
				if ($("#consultations-search-hopital option:selected").val()) {
					$('#consultations-list-search-hopital').html($("#consultations-search-hopital option:selected").text());
				}
			}
			//		Medecin search
			else {
				$('#consultations-list-search-keyword').html($('#consultations-search-medecin').val());
			}
			
			// No results
			if (!data) {
				$('#consultations-list-noresults').show();
			}
			else {
				$('#consultations-list-noresults').hide();
			}
			
			// Create list
			$('#consultations-list-container ul').remove();
			$('#consultations-list-container').append('<ul data-role="listview"></ul>');
			list = $('#consultations-list-container').find('ul');
			
			// Counter
			var i = 0;
			
			// Build elements
			$.each(data, function(key) {
				// Skip useless data
				if (key != 'hop' && key != 'serv' && key != 'total') {
					// Test if object is a consultation by checking the existence of key properties
					if (data[key].id_hopital != undefined && data[key].activite != undefined && data[key].nompre != undefined) {
						var consult = data[key];
						var hopital = aphp.hopitaux[consult.id_hopital];
						consult.id = key;
						// build item
						html = getConsultationItem(hopital, consult);
						// append item
						list.append('<li>'+html+'</li>');
						// Store data
				    	aphp.consultations[key] = consult;
				    	i++;
					}
				}
			});
			if (i >= limit) {
				navigator.notification.alert(
					"Votre requÃªte a ramenÃ© trop de rÃ©sultats, seuls les 50 premiers seront affichÃ©s.",
					null,
					"Avertissement",
					"Continuer"
				);
			}
			displayConsultationList();
		}).error(function(data) {
			$.mobile.hidePageLoadingMsg();
		});
	});
});

/**
 * Gets the HTML for the consultation.
 * @param hopital {Object}
 * @param consult {Object}
 * @returns {String}
 */
function getConsultationItem(hopital, consult) {
	var consultation = transformHoraires(consult);
	html  = '<a href="#consultations-detail" data-consultation-id="'+consult.id+'">';
	html += '<h3 class="ui-li-heading">'+hopital.nom+'</h3>';
	html += '<span class="ui-li-desc">'+hopital.code_postal+' '+hopital.ville+'</span>';
	html += '<span class="ui-li-desc"><b>'+consult.activite+'</b></span>';
	html += '<span class="ui-li-desc"><b>'+consult.titre+' '+consult.nompre+'</b></span>';
	html += '<span class="ui-li-desc">'+formatHoraires(consultation.horaires)+'</span>';
	html += '</a>';
	
	return html;
}

/**
 * Displays the consultation list.
 */
function displayConsultationList() {
	// Change page
	$.mobile.changePage("#consultations-list", "slide");
	// Refresh listview
	$('#consultations-list-container ul').listview();
}

$(function() {
	// Event listener on consultations-list
	
	$("#consultations-list ul[data-role=listview] a").live('click', function(e){
		id = $(e.currentTarget).attr('data-consultation-id');
		consult = aphp.consultations[id];
		hopital = aphp.hopitaux[consult.id_hopital];
		var consultation = transformHoraires(consult);
		$('#consultations-detail-name').html(hopital.nom);
		$('#consultations-detail-adresse').html(hopital.adresse+'<br/>'+hopital.code_postal+' '+hopital.ville);
		$('#consultations-detail-consult-service').html(consult.activite+'<br/>Service de '+consult.service);
		$('#consultations-detail-consult-consultant').html(consult.titre+' '+consult.nompre);
		$('#consultations-detail-consult-horaires').html(formatHorairesDetail(consultation.horaires));
		$('#consultations-detail-telephone').html('<a class="ui-link" href="tel:'+consult.tel+'">'+formatTel(consult.tel)+'</a>');
		aphp.addMapsLink('#consultations-detail-gotomap', hopital);
	});
});

$(function() {
	// Event listener on hopitaux-list
	$("#hopitaux-list ul[data-role=listview] a").live('click', function(e){
		id = $(e.currentTarget).attr('data-hopital-id');
		hopital = aphp.hopitaux[id];
		$("#hopitaux-detail h1").html($("#hopitaux-list h1").text());
		$('#hopitaux-detail-name').html(hopital.nom);
		$('#hopitaux-detail-distance').html(hopital.distance);
		$('#hopitaux-detail-adresse').html(hopital.adresse+'<br/>'+hopital.code_postal+' '+hopital.ville);
		$('#hopitaux-detail-telephone').html('<a class="ui-link" href="tel:'+hopital.telephone+'">'+formatTel(hopital.telephone)+'</a>');
		aphp.addMapsLink('#hopitaux-detail-gotomap', hopital);
	});
});

$(function() {
	// Populate select
	$.getJSON('json/type_hopital.json').success(function(data) {
		$.each(data, function(key) {
			object = data[key];
			html  = '<option value="' + object.id + '">';
			html += object.type;
			html += '</option>';
			$('#type_hopital').append(html);
		});
		// Refresh the select menu
		$('#type_hopital').selectmenu('refresh', true);
	});
});

$(function() {
	// When a type is chosen...
	$('#hopitaux-choose-type').click(function() {
		// Selected option
		$selected = $("#type_hopital option:selected");
		
		// Write page title
		$("#hopitaux-list-header").html($selected.text());
		
		
			var json = 'json/type'+$selected.val()+'.json';
			
			$.getJSON(json).success(function(data) {
				aphp.geoLocation(
					// Success
					function(){
						var hopitauxByDistance = [];
						
						// Write distances
						$.each(data, function(key, value) {
							// Get hopital by id
							var hopital = aphp.hopitaux[value];
							
							// Calculate distance
							hopitauxByDistance.push({
								id: value,
								distance: aphp.distanceTo(hopital)
							});
						});
						
						// Sort by distance
						hopitauxByDistance.sort(sortBy('distance', false, parseFloat));
						
						// Build List
						buildHopitalList(hopitauxByDistance);
					},
					// Failure
					function(){
						var hopitauxByDistance = [];
						
						// Write distances
						$.each(data, function(key, value) {
							// Get hopital by id
							var hopital = aphp.hopitaux[value];
							
							hopitauxByDistance.push({
								id: value,
								distance: NaN
							});
						});
						
						// Build List
						buildHopitalList(hopitauxByDistance);
					}
				);
			});
		});
});

function buildHopitalList(hopitauxByDistance) {
	// Create list
	$('#hopital-list-container ul').remove();
	$('#hopital-list-container').append('<ul data-role="listview"></ul>');
	list = $('#hopital-list-container').find('ul');
	
	// Build elements
	$.each(hopitauxByDistance, function(key, value) {
		var hopital = aphp.hopitaux[value.id];
		
		// Format distance for display
		var distance = (isNaN(value.distance)) ? '&nbsp;' : value.distance+'km';
		
		// Save it for later use
		aphp.hopitaux[value.id].distance = distance;
		
		// create list item
		html  = '<a href="#hopitaux-detail" data-hopital-id="'+hopital.id+'">';
		html += '<h4 class="ui-li-heading list-distance">'+distance+'</h4>';
		html += '<h3 class="ui-li-heading">'+hopital.nom+'</h3>';
		html += '<span class="ui-li-desc">'+hopital.adresse+', '+hopital.code_postal+' '+hopital.ville+'</span>';
		html += '</a>';
		
		// append item
		list.append('<li>'+html+'</li>');
	});
	
	// Change page
	$.mobile.changePage("#hopitaux-list", "slide");
	// Refresh listview
	$('#hopital-list-container ul').listview();
}

$(function() {
	/*
	 * DOMAINE - HOPITAL
	 */
	$('#hopitaux').live('swipeleft', function() {
		$.mobile.changePage('#consultations');
	});
	$('#hopitaux-list, #hopitaux-detail').live('swiperight', function() {
		window.history.back();
	}).live('swipeleft', function() {
		window.history.forward();
	});
	
	/*
	 * DOMAINE - CONSULTATIONS
	 */
	$('#consultations').live('swiperight', function() {
		$.mobile.changePage('#hopitaux');
	}).live('swipeleft', function() {
		$.mobile.changePage('#news');
	});
	$('#consultations-list, #consultations-detail').live('swiperight', function() {
		window.history.back();
	}).live('swipeleft', function() {
		window.history.forward();
	});
	
	/*
	 * DOMAINE - NEWS
	 */
	$('#news').live('swiperight', function() {
		$.mobile.changePage('#consultations');
	});
});
