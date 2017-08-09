



















$(document).on("pageinit", "#page-infos", function(event) {	
	
	$('#page-infos .titre-page').html(infosArticle.titre);
	$('#page-infos #content-infos').html(infosArticle.texte);
});


"use strict";

// var serviceURL = "http://192.168.1.8/otbld_server/";
var serviceURL = "http://mobi.tourisme-barleduc.fr/appli-mobile/services-ios/";

var fiches_patrimoine = null;
var fiches_hr = null;
var infosArticle = null;
var circuits = {};

//Booleens vrais si les données sont chargées
var fichesLoaded = false;
var circuitsLoaded = false;
var hrLoaded = false;
var infosLoaded = false;


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	
	//Si les données n'ont pas encore été chargée après 30 secondes, on quitte l'application
	var waitError = setTimeout(function() {
		connectionError(navigator.app.exitApp);
	}, 30000);

	//On attend le chargement des données avant de cacher le splashscreen
	var waitLoading = setInterval(function() {

			if(fichesLoaded && circuitsLoaded && hrLoaded && infosLoaded) {
				navigator.splashscreen.hide();
				clearInterval(waitLoading);
				clearTimeout(waitError);
			}
		}, 300
	);

	//Gestion du bouton "Back" d'Android
	document.addEventListener("backbutton", function(event) {
		
		var currentPageID = $('.ui-page-active').attr('id');
		
		//Page d'accueil : on quitte l'appli
		if(currentPageID === "page-index") {
			stopGeolocation();
			navigator.app.exitApp();
		}
		//Fermeture du menu de partage sur la page patrimoine
		else if(currentPageID === "page-detail-fiche" && $("#page-detail-fiche #partage-box").is(":visible")) {
			hideShareMenu();
		}
		//Sinon, retour en arrière
		else {
			navigator.app.backHistory();
		}
	}, false);
	
	if(!connected()) {
		connectionError(navigator.app.exitApp);
	}
}



function toRad(val) {
	return val * Math.PI / 180;
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function parseGmap(val)
{
    return val.replace(',', '.');
}

/** Retourne vrai si l'appareil dispose d'une connection fonctionnelle. */
function connected() {
	// return true;
    return navigator.connection.type != Connection.NONE;
}

/**Affiche une erreur de connection.
 * 
 * @param action Fonction de callback de la boite de dialogue
 */
function connectionError(action) {
	console.log("connection error");
	
	navigator.notification.alert(
          'L\'application a besoin d\'une connexion au web pour fonctionner.',
          action,
          'Connexion indisponible',
          'Ok'
      );
}

//On retire le timeout sur le téléchargement des données
$.ajaxSetup({
  timeout: 0
});

//Charge tous les pois dans fiches
$.getJSON(serviceURL + 'fiches.php', function(data) {
    var temp_fiches = data.item.fiche;

    //Récupération de l'ordre des fiches
	$.ajax({
		url: serviceURL + 'ordre_fiche.html',
		success: function(data) {
			//On met la liste dans un tableau et on supprime les éventuelles valeurs vides
			var order = data.split(';').filter(function(n){return n});

			//Contiendra les fiches triées
			var sortedFiches = [];
			var noSortedFiches = [];

		    //On initialise les distances des fiches et on les trie
		    $.each(temp_fiches, function(index, fiche) {
		    	if(fiche != undefined) {

			    	var fiche_index = -1;

			    	//Pour chaque fiche, on regarde si elle est dans la liste des fiches triées
			    	if((fiche_index = order.indexOf(fiche.id)) != -1) {
			    		//Si oui, on la positionne à sa place
			    		sortedFiches[fiche_index] = fiche;
			    		//Et on supprime cette fiche du tableau initial
			    		// temp_fiches.splice(index, 1);
			    	}
			    	else {
			    		noSortedFiches.push(fiche);
			    	}
			    	//Correction des données sitlor
					fiche.latitude = parseGmap(fiche.latitude);
					fiche.longitude = parseGmap(fiche.longitude);
					fiche.distanceLabel = "";

					//On met les photos dans un tableau
					fiche.photos = [];

					for(var i = 1; i <= 3; i++) {
						if(fiche['photo' + i] != undefined) {
							var photo = {};

							photo.src = fiche['photo' + i];
							delete fiche['photo' + i];

							if(fiche['photoCredit' + i] != undefined) {
								photo.credit = fiche['photoCredit' + i];
								delete fiche['photoCredit' + i];
							}
							fiche.photos.push(photo);
						}
					}
				}
				else {
					//Si la fiche est "undefined", on la supprime
					temp_fiches.splice(index, 1);
				}
			});

			//On merge ensuite les fiches restantes après le tri
			fiches_patrimoine = sortedFiches.concat(noSortedFiches);
			//Et enfin, on supprime les index vides
			fiches_patrimoine = fiches_patrimoine.filter(function(n){return n});

			fichesLoaded = true;
		}
	});

});

//Charge tous les hr dans fiches_hr
$.getJSON(serviceURL + 'hr.php', function(data) {
    fiches_hr = data.item.fiche;

    $.each(fiches_hr, function(index, fiche) {
		fiche.latitude = parseGmap(fiche.latitude);
		fiche.longitude = parseGmap(fiche.longitude);

	});

	hrLoaded = true;
});

//Charge la page d'informations
$.getJSON(serviceURL + 'infos.php', function(data) {
    infosArticle = data.item;
	infosLoaded = true;
});


//Charge tous les circuits dans circuits
$.getJSON(serviceURL + 'circuits.php', function(data) {

	circuits = data.item;

	$.each(circuits, function(id, circuit) {


		//Remplacement des virgules par des points
		$.each(circuit.pois, function(index, poi) {
			poi.latitude = parseGmap(poi.latitude);
			poi.longitude = parseGmap(poi.longitude);
		});

		//tracé du circuit
		circuit.path = [];

		//Création du circuit à partir des coordonnées
		$.each(circuit.coordinates, function(id, point) {

			var latitude = parseFloat(point[1]);
			var longitude = parseFloat(point[0]);

			circuit.path.push({				
				0 : latitude,
				1 : longitude
			});
		});

		//On met les photos dans un tableau
		circuit.photos = [];

		for(var i = 1; i <= 3; i++) {
			if(circuit['photo' + i] != undefined) {
				var photo = {};

				photo.src = circuit['photo' + i];
				delete circuit['photo' + i];

				if(circuit['photoCredit' + i] != undefined) {
					photo.credit = circuit['photoCredit' + i];
					delete circuit['photoCredit' + i];
				}
				circuit.photos.push(photo);
			}
		}
	});

	circuitsLoaded = true;
});


$(document).on("tap", "#link-patrimoine-index", function(event)
    {
        $(this).css('background', "#222");
    }
);

$(document).on("tap", "#link-circuit-index", function(event)
    {
        $(this).css('background', "#222");
    }
);

$(document).on("tap", "a.retour", function(event)
    {
        $(this).css('background', "#222");
    }
);



$(document).on("pageshow", "#page-index", function(event)
	{
		$.getJSON(serviceURL + 'meteo.php', function(data)
			{
				var meteo = data.item;
				$('#meteo-index .picto-meteo').attr('src', 'img/meteo/' + meteo.picto + '.png');
				$('#meteo-index .temperature .content').html(meteo.temperature);
				$('#meteo-index .temperature').show();
			}
		);

		$("#link-patrimoine-index" ).css('background', "rgba(142, 89, 39, 0.8)");
		$("#link-circuit-index" ).css('background', "rgba(40, 90, 20, 0.8)");
	}
);

/*Insert la liste des circuits dans le DOM */
function buildListeCircuits() {

	$('#liste-circuits li').remove();

	$.each(circuits, function(id, circuit) {

		var li = 
		'<li id="circuit' + circuit.id + '" class="circuit">' +
	 		'<a data-transition="slide" href="map.html?circuit=' + circuit.id + '" >' +
	 			'<h2>' + circuit.nom + '</h2>' +
	 			'<img src="' + serviceURL + "sitlor/" + circuit.photo + '" />' +
			'</a>' +
		'</li>';

		var $listeCircuits = $('#liste-circuits');
		$listeCircuits.hide();
		$listeCircuits.append(li);

	});
}

/** Affiche la liste des circuits avec un fadeIn */
function showListeCircuits() {
	var $listeCircuits = $('#liste-circuits');
		
	$listeCircuits.fadeIn(500);
}

//Au chargement de la liste des circuits
$(document).on("pageinit", "#page-circuits", function(event) {
	buildListeCircuits();

});
//Quand la transition est terminée
$(document).on("pageshow", "#page-circuits", function(event) {
	showListeCircuits();

});

/*
Author: Vladimir Kharlampidi, The iDangero.us
*/
document.createElement('header');
document.createElement('footer');

$(function(){
	
	//Main Swiper
	var swiper = new Swiper('.swiper1', {
		pagination : '.pagination1',
		loop:true,
		grabCursor: true
	});
	//Navigation arrows
	$('.arrow-left').click(function(e) {
        e.preventDefault()
		swiper.swipePrev()
    });
	$('.arrow-right').click(function(e) {
        e.preventDefault()
		swiper.swipeNext()
    });
    //Clickable pagination
    $('.pagination1 .swiper-pagination-switch').click(function(){
    	swiper.swipeTo($(this).index())
    })



	//Partial Slides
	$('.swiper-partial').swiper({
		slidesPerSlide:'1.8'
	})

	
})



var titre_image;
var POSITION_LOADING_TIMEOUT = 2000;
//Vrai si on demande l'affichage de la liste
var shouldDisplayListe = false;


/** Récupère une fiche SITLOR par son ID */
function getFiche(id) {

	var searched = null;

	$.each(fiches_patrimoine, function(index, fiche) {

		if(fiche.id == id) {
			searched = fiche;
			return false;
		}
	});

	return searched;
}

/**
*	Trie le tableau de fiches passé en paramètre par ordre de distance
*	
*	@return Fiches triées par ordre de distance
**/
function sortFiches(fiches) {

	function compareFiches(ficheA, ficheB) {
		if(ficheA.distance < ficheB.distance) {
			return -1;
		}
		else if(ficheA.distance > ficheB.distance) {
			return 1;
		}
		else {
			return 0;
		}
	}

	fiches_patrimoine = fiches.sort(compareFiches);
}


/**
*	Met à jour la distance des fiches en fonction de la position de l'utilisateur
**/
function updateDistance(fichesToUpdate) {

    var userRad = Object();
    var poiRad = Object();
    userRad.latitude = toRad(userLocation.latitude);
	userRad.longitude = toRad(userLocation.longitude);
	var sinLatitude = Math.sin(userRad.latitude);
	var cosLatitude = Math.cos(userRad.latitude);
	
    $.each(fichesToUpdate, function(index, fiche) {
    	
    	poiRad.latitude = toRad(fiche.latitude);
    	poiRad.longitude = toRad(fiche.longitude);
    	
    	var distance = 6367445 * Math.acos(sinLatitude * Math.sin(poiRad.latitude) + 
    			cosLatitude * Math.cos(poiRad.latitude) * Math.cos(userRad.longitude - poiRad.longitude));
    	
    	fiche.distance = distance;
    		
    	//Conversion en km si + de 1000m
    	if(distance > 1000) {
    		distance = (distance / 1000).toFixed(2) + " km";
    	}
    	else {
    		distance = distance.toFixed(0) + " m";
    	}
    	
    	fiche.distanceLabel = distance;
    	
    });

    fiches_patrimoine = fichesToUpdate;
}

/*Insert la liste des fiches dans le DOM */
function buildListePatrimoine() {

	$('#liste-fiches-patrimoine li').remove();

	var num_row = 1;

	$.each(fiches_patrimoine, function(index, fiche) {
			
		var vignette = '';
		if(fiche.photos == undefined) {
			console.log(fiche.nom);
		}
		else if (fiche.photos.length > 0)
		{
			vignette = serviceURL + 'sitlor/photos_100/'+ fiche.photos[0].src;

		}
		else
		{
			vignette = 'img/no-photo.png';
		}

		var li = 
		'<li id="fiche' + fiche.id + '" class="row' + num_row + '">' +
	 		'<a data-transition="slide" href="detail-fiche.html?id=' + fiche.id + '" class="clearfix">' +
	 			'<img src="' + vignette + '" alt="lieu" title="lieu" class="vignette-liste" />' +
	 			'<div class="infos">' +
		 			'<h2 class="titre"><span class="content">' + fiche.nom + '</span></h2>' +
		 			'<div class="distance-ville">' +
			 			'<p class="distance">' + fiche.distanceLabel + '</p>' +
			 			'<p class="ville">' + fiche.ville + '</p>' +
		 			'</div>' +
				'</div>' +
			'</a>' +
		'</li>';

		var $fichesPatrimoine = $('#liste-fiches-patrimoine');
		$fichesPatrimoine.hide();
		$('#liste-fiches-patrimoine').append(li);

		num_row++;

		if (num_row == 5)
		{
			num_row = 1;
		}
	});
}

/** Affiche la liste des patrimoines avec un fadeIn */
function showListePatrimoine() {
	var $fichesPatrimoine = $('#liste-fiches-patrimoine');
		
	$fichesPatrimoine.fadeIn(500, function() {
		$.mobile.loading('hide');
	});
}

//Au chargement de la liste des patrimoines
$(document).on("pageinit", "#page-patrimoine", function(event) {

	var getPositionTimeout = null;
	shouldDisplayListe = false

	//TODO: Vérifier que le GPS est activé avant de demander la position
	//On demande le position de l'utilisateur
	navigator.geolocation.getCurrentPosition(onSuccess, onError, 
			{ maximumAge: 4000, enableHighAccuracy: true }
	);
	
	//Si on la trouve, on la met à jour
	function onSuccess(position) {
		userLocation.latitude = position.coords.latitude;
		userLocation.longitude= position.coords.longitude;

		//Si on a déjà demandé l'affichage, on ne le fait pas de nouveau
		if(!shouldDisplayListe) {
			updateDistance(fiches_patrimoine);
			sortFiches(fiches_patrimoine);

			if(getPositionTimeout != null) {
				clearTimeout(getPositionTimeout);
				buildListePatrimoine();
				shouldDisplayListe = true;
			}
		}
	}

	//Sinon, on affiche une erreur
	function onError(error) {

		$.each(fiches_patrimoine, function(index, fiche) {
	    	fiche.distanceLabel = "Position indisponible";
   		 });

		buildListePatrimoine();
		shouldDisplayListe = true;
    }

	getPositionTimeout = setTimeout(function() {

		//Si on n'a pas déjà préparé l'affichage
		if(!shouldDisplayListe) {
			buildListePatrimoine();
			shouldDisplayListe = true;
		}
	}, POSITION_LOADING_TIMEOUT);
});

//Quand la transition est terminée
$(document).on("pageshow", "#page-patrimoine", function(event) {

	$.mobile.loading( 'show', {
		text: 'Chargement de la position...',
		textVisible: true,
		theme: 'a',
	});

	//Test pour recentrer le loader.
	//Ne fonctionne pas toujours, le problème vient de la gestion de la hauteur de l'écran dans les webviews par Android
	var loader = $(".ui-loader");
	loader.css({
		left: (window.innerWidth / 2) + "px",
		top: (window.innerHeight / 2) + "px"
	});

	//On attend que les fiches soient pretes avant de les afficher
	var interval = setInterval(function() {

		if(shouldDisplayListe) {
			showListePatrimoine();
			clearInterval(interval);
		}

	}, 200);

});



//A l'affichage du détail d'une fiche
$(document).on("pageshow", "#page-detail-fiche", function(event) {
	if(!connected()) {
		connectionError(navigator.app.backHistory);
	}
	else {

		// var fiche = data.item;
		var fiche = getFiche(getUrlVars()['id']);
		//Lien vers la fiche sur le site mobile
		var mobiURL = "http://mobi.tourisme-barleduc.fr/page,index-lieu,idlieu," + fiche.id + ",sitlor,1,sous_categ," + fiche.type_id;

		$("#partage-box .partage-button#partage-facebook").attr("href", "http://www.facebook.com/sharer.php?u=" + mobiURL + "&t=");
		$("#partage-box .partage-button#partage-twitter").attr("href", "https://twitter.com/share?url=" + mobiURL + "&text=");
		$("#partage-box .partage-button#partage-mail").attr("href", "mailto:?subject=" + fiche.nom + "&body=" + mobiURL);
		
		titre_image = fiche.nom;

		$('#galerie-fiche.swiper-wrapper').empty();
		
		$.each(fiche.photos, function(index, photo) {

			var credit = photo.credit || '';

			var width = window.innerWidth;
			var imageWidth = parseInt((width - 98) / 3);

			var image = '' +
				'<a data-transition="none" href="image-fiche.html?id=' + fiche.id + '&idphoto=' + index + '&credit='+ encodeURIComponent(credit) + '&src=' + photo.src + '">' +
					'<img style="width: ' + imageWidth +  'px" src="'+ serviceURL + '/sitlor/photos_200/' + photo.src + '" />' +
				'</a>' ;

			
			$('#galerie-fiche.swiper-wrapper').append(image);

			if(index == 0) {
				$('#page-detail-fiche .bg-page').attr('src', serviceURL + '/sitlor/photos/' + photo.src);
			}

		});


		$('#fiche-infos .titre,.description,.adresse,.cp,.ville').html('');

		$('#fiche-infos .link-map').attr('href', 'map.html?id=' + fiche.id);
		$('#fiche-infos .titre').html(fiche.nom);
		$('#fiche-infos .description').html(fiche.description);
		$('#fiche-infos .adresse').html(fiche.adresse);
		$('#fiche-infos .cp').html(fiche.cp);
		$('#fiche-infos .ville').html(fiche.ville);

		if (typeof(fiche.tel) != 'object')
		{
			$('#fiche-infos .numero-tel').html(fiche.tel);
			$('#fiche-infos .link-tel').attr('href', 'tel:' + fiche.tel).show();
			$('#fiche-infos .tel').show();
		}
		else
		{
			$('#fiche-infos .tel').hide();
			$('#fiche-infos .link-tel').hide();
		}

		if(fiche.video !== undefined) {

			var videoFragments = fiche.video.split("/");
			var videoLink = "vnd.youtube:" + videoFragments[videoFragments.length - 1];

			$('#fiche-infos .link-video').attr("href", videoLink);
			$('#fiche-infos .link-video').removeClass("hidden");

			//Ouverture automatique de la video
			if(getUrlVars()['autoplay'] !== undefined) {
				window.location = videoLink;
			}
		}
		if(fiche.audio1 !== undefined) {
			$('#fiche-infos .link-audio').removeClass("hidden");
		}

		$('#detail-fiche').fadeIn(500); 
	}
});

$(document).on("pageshow", "#page-image-fiche", function(event)
	{
		var id = getUrlVars()['id'];
		var idPhoto = parseInt(getUrlVars()['idphoto']);
		var photo = null;
		var src = getUrlVars()['src'];
		var credit = decodeURIComponent(getUrlVars()['credit']);

		fiche = getFiche(id);

		//On charge la photo suivante
		$('#page-image-fiche #prev').on("tap", function(e) {

			idPhoto--;
			photo = fiche.photos[idPhoto];

			$('#page-image-fiche #img-fiche').attr('src', serviceURL + '/sitlor/photos/' + photo.src);

			if(credit !== undefined && credit !== '') {
				$('#page-image-fiche #auteur-photo').html('Crédit : ' + photo.credit)
					.removeClass("hidden");
			}
			else {
				$('#page-image-fiche #auteur-photo').addClass("hidden");
			}

			if(idPhoto == 0) {
				$(this).addClass("hidden");
			}

			$('#page-image-fiche #next').removeClass("hidden");

			e.preventDefault();
		});

		$('#page-image-fiche #next').on("tap", function(e) {

			idPhoto++;
			photo = fiche.photos[idPhoto];

			$('#page-image-fiche #img-fiche').attr('src', serviceURL + '/sitlor/photos/' + photo.src);

			if(credit !== undefined && credit !== '') {
				$('#page-image-fiche #auteur-photo').html('Crédit : ' + photo.credit)
					.removeClass("hidden");
			}
			else {
				$('#page-image-fiche #auteur-photo').addClass("hidden");
			}

			if(fiche.photos.length == idPhoto + 1) {
				$(this).addClass("hidden");
			}

			$('#page-image-fiche #prev').removeClass("hidden");

			e.preventDefault();
		});


		if(idPhoto > 0) {

			$('#page-image-fiche #prev').removeClass("hidden");
		}

		if(fiche.photos.length > (parseInt(idPhoto) + 1)) {

			var nextPhoto = fiche.photos[(parseInt(idPhoto) + 1)];
			var nextCredit = nextPhoto.credit || '';

			$('#page-image-fiche #next').removeClass("hidden");
		}

		$('#page-image-fiche .titre-page').html(titre_image);
		$('#page-image-fiche #img-fiche').attr('src', serviceURL + '/sitlor/photos/' + src);

		if(credit !== undefined && credit !== '') {
			$('#page-image-fiche #auteur-photo').html('Crédit : ' + credit)
				.removeClass("hidden");
		}
	}
);

$(document).on("touchstart", "#page-image-fiche #prev img", function(event)
	{
		$(this).attr('src', "img/btn-prev-on.png");
		$this = $(this);

		setTimeout(function() {
			$this.attr('src', "img/btn-prev.png");
		}, 300);
	}
);


$(document).on("touchstart", "#page-image-fiche #next img", function(event)
	{
		$(this).attr('src', "img/btn-next-on.png");
		$this = $(this);

		setTimeout(function() {
			$this.attr('src', "img/btn-next.png");
		}, 300);
	}
);

$(document).on("tap", "#fiche-infos .icone.video", function(event)
	{
		$(this).attr('src', "img/btn-video-sel.png");
		$this = $(this);

		setTimeout(function() {
			$this.attr('src', "img/btn-video.png");
		}, 5000);
	}
);

$(document).on("tap", "#fiche-infos .icone.audio", function(event)
	{
		$(this).attr('src', "img/btn-audio-sel.png");
		$this = $(this);

		setTimeout(function() {
			$this.attr('src', "img/btn-audio.png");
		}, 5000);
	}
);

$(document).on("tap", "#fiche-infos .icone.carte", function(event)
	{
		$(this).attr('src', "img/picto-geoloc-fiche-sel.png");
		$this = $(this);

		setTimeout(function() {
			$this.attr('src', "img/btn-carte-detail.png");
		}, 2000);
	}
);

$(document).on("tap", "#fiche-infos .ico-tel", function(event)
	{
		$(this).attr('src', "img/btn-telephone-sel.png");
		$this = $(this);

		setTimeout(function() {
			$this.attr('src', "img/btn-telephone.png");
		}, 2000);
	}
);


$(document).on("tap", "#liste-fiches-patrimoine li", function(event) {
	$(this).css('background', "#222");
});

$(document).on("tap", "#liste-circuits li", function(event)
	{
		$(this).css('background', "#222");
	}
);

$(document).on("touchstart", ".partage", function(event)
	    {
	        $(this).css('background', "#222");
	    }
);

$(document).on("touchend", ".partage", function(event) {
	showShareMenu();
});

$(document).on("touchend", "#page-detail-fiche #partage-shadow", function(event) {
	hideShareMenu();
});

//Affiche le menu de partage
function showShareMenu() {
	$("#page-detail-fiche #partage-box").show();
	$("#page-detail-fiche #partage-shadow").show();
	$("#page-detail-fiche #partage-box").animate({
		 top: '+=252',
		 }, 300, function() {}
	);
	$(".partage").css('background', "none");
}

//Ferme le menu de partage
function hideShareMenu() {
	
	$("#page-detail-fiche #partage-box").animate({
		 top: '-=252',
		 }, 300, function() {
			 $("#page-detail-fiche #partage-box").hide();
			 $("#page-detail-fiche #partage-shadow").hide();
		 });
}

var userLocation = {'latitude' : null, 'longitude': null};



var geolocationEnabled = false;

var satellite = false;

//Vrai si la geolocalisation est activée
var geolocation = false;

//Vrai si on suit l'utilisateur sur la carte
var suivi = false;


//carte courante, utilisée pour afficher la position
var map = null;

//Liste des fiches déjà ouvertes
var openable = [];

//Ancienne position sur la carte, conservée pour la retrouver quand on quitte le geolocation
// var old_loc = null;
var init_lat = '48.775354515133';
var init_long = '5.16068791389466';

//ID de geolocation de la géolocalisation
var watchID = null;
var marker_geoloc = null;


$(document).on("tap", "#picto-satellite", function(event) {
	if (!satellite)
	{
		satellite = true;
		$(this).attr('src', "img/btn-satellite-on.png");

		if(map !== null) {
			map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
		}
	}
	else
	{
		satellite = false;
		$(this).attr('src', "img/btn-satellite.png");

		if(map !== null) {
			map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
		}
	}
});

$(document).on("tap", "#picto-geoloc", function(event) {

	//Activation du geolocation
	if (!suivi)
	{
		startSuivi();
	}
	//Désactivation du geolocation
	else
	{
		stopSuivi();
	}
});

/** Met à jour la carte en fonction de la configuration courante de la féoloc */
function loadGeolocConfig() {
	if(satellite) {
		$("#picto-satellite").attr('src', "img/btn-satellite-on.png");

		if(map !== null) {
			map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
		}
	}
	else {
		$("#picto-satellite").attr('src', "img/btn-satellite.png");

		if(map !== null) {
			map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
		}
	}

	if(suivi) {
		$("#picto-geoloc").attr('src', "img/btn-mesuivre-on.png");
	}
	else {
		$("#picto-geoloc").attr('src', "img/btn-mesuivre.png");
	}


}

/** Suivi de l'utilisateur sur la carte */
function startSuivi() {

	suivi = true;

	if(!geolocation) {
		startGeolocation();
	}


	$("#picto-geoloc").attr('src', "img/btn-mesuivre-on.png");
}

function stopSuivi() {

	suivi = false;

	$("#picto-geoloc").attr('src', "img/btn-mesuivre.png");

	if(map !== null) {
		map.setCenter(init_lat, init_long);
	}

	if(marker_geoloc !== null) {
		marker_geoloc.setMap(null);
	}
}

//Commence le geolocation de la position
function startGeolocation() {
    geolocation = true;

	/** On met à jour la position de l'utilisateur toutes les trois secondes. */
    var options = { maximumAge: 5000, frequency: 5000, enableHighAccuracy: true };

    watchID = navigator.geolocation.watchPosition(onLocationSuccess, onLocationError, options);

	// old_loc = map.getCenter();
	// init_lat = old_loc.jb;
	// init_long = old_loc.kb;
}

//Termine le geolocation de la position
function stopGeolocation() {
	geolocation = false;

	//Sans géolocalisation, on ne peut pas suivre l'utilisateur
	stopSuivi();
	
	//On stoppe le geolocation de la position
	if(watchID != null) {
		navigator.geolocation.clearWatch(watchID);
	}
}

function onLocationSuccess(position) {

	userLocation.latitude = position.coords.latitude;
	userLocation.longitude = position.coords.longitude;
	
	if(map !== null && suivi) {
	    map.setCenter(userLocation.latitude, userLocation.longitude, function() {
			//On efface l'ancien marqueur avant de replacer le nouveau
			if(marker_geoloc !== null) {
				marker_geoloc.setMap(null);
			}
		    marker_geoloc = map.addMarker(
		    	{
					lat: userLocation.latitude,
					lng: userLocation.longitude,
					icon :
						{
		                	url : 'img/marker-geoloc.png'
		              	}
				}
			);
		});
	}

  	//Si la distance entre l'utilisateur et le poi est faible, on affiche sa fiche
    
    var distance = null;
    var userRad = Object();
    var poiRad = Object();
    userRad.latitude = toRad(userLocation.latitude);
	userRad.longitude = toRad(userLocation.longitude);
	var sinLatitude = Math.sin(userRad.latitude);
	var cosLatitude = Math.cos(userRad.latitude);
    
	//Vrai si une page a déjà été ouverte (évite l'ouverture de plausieurs pages)
	var pageOpened = false;
	
    $.each(fiches_patrimoine, function(index, fiche) {
    	
  //   	fiche.latitude = parseGmap(fiche.latitude);
		// fiche.longitude = parseGmap(fiche.longitude);
    	poiRad.latitude = toRad(fiche.latitude);
    	poiRad.longitude = toRad(fiche.longitude);
    	
    	
    	distance = 6367445 * Math.acos(sinLatitude * Math.sin(poiRad.latitude) + 
    			cosLatitude * Math.cos(poiRad.latitude) * Math.cos(userRad.longitude - poiRad.longitude));
    	
    	//Si l'utilisateur s'approche d'un lieu à moins de 40m, la page du poi s'ouvre
    	if(distance < 40) {

    		//On ouvre la page seulement si elle n'a pas déjà été ouverte
    		//Pour qu'une page soit réouverte, il faut que l'utilisateur sorte du périmètre d'affichage (40m)
    		if((openable[fiche.id] == undefined || openable[fiche.id]) && !pageOpened) {

	    		jQuery.mobile.changePage("detail-fiche.html?id=" + fiche.id + "&autoplay=true");
	    		openable[fiche.id] = false;
	    		pageOpened = true;
    		}
    	}
    	else {
    		//Si l'utilisateur n'est plus dans le périmètre d'une page ouverte, on réactive la possibilité d'ouverture
    		if(distance > 60 && (openable[fiche.id] == undefined || !openable[fiche.id])) {
    			openable[fiche.id] = true;
    		}
    	}
    });
    	
}

function onLocationError(error) {
	
	userLocation.latitude = null;
	userLocation.longitude = null;
	
	stopGeolocation();

	if(map !== null) {
		map.setCenter(init_lat, init_long);
	}
	
    // console.log('code: '    + error.code    + '\n' +
    //       'message: ' + error.message + '\n');

    navigator.notification.alert(
        'La fonction GPS de l\'appareil n\'est pas activée ou le signal est trop faible.',
        null,
        'Géolocalisation indisponible',
        'Ok'
    );
}

startGeolocation();


$(document).on("pageinit", "#page-map", function(event) {
});

$(document).on("pageshow", "#page-map", function(event) {
	if(!connected()) {
		connectionError(navigator.app.backHistory);
	}
	else {
		$('#map').height(window.innerHeight - 52);
		
		init_lat = '48.775354515133';
		init_long = '5.16068791389466';

		var id = getUrlVars()['id'];
		var id_circuit = getUrlVars()['circuit'];

		if(id_circuit !== undefined) {
			showCircuit(id_circuit);
		}
		else if (id !== undefined) {
			showFiche(id);
		}
		else {
			showAllFiches();
		}

		loadGeolocConfig();
	}
});


function showCircuit(id_circuit) {

	var circuit = circuits[id_circuit];

	$('#header-map .titre-page').html(circuit.nom);

	map = new GMaps({
		el: '#map',
		lat: init_lat,
		lng: init_long,
		zoomControl : false,
		zoomControlOpt: {
			style : 'SMALL',
			position: 'TOP_LEFT'
		},
		panControl : false,
		streetViewControl : false,
		mapTypeControl: false,
		overviewMapControl: false
	});


	//Ajout des marqueurs
    $.each(circuit.pois, function(index, poi) {

	    var overlay = '' +
	    '<div class="overlay-marker">' +
	    	'<span class="nom">' + poi.nom + '</span>' +
	    	'<a data-transition="slide" href="detail-fiche.html?id=' + poi.id + '" class="picto-detail">' +
	    		'<img src="img/btn-detail.png" />' +
	    	'</a>' +
	    '</div>';

	    map.addMarker(
	    	{
				lat: poi.latitude,
				lng: poi.longitude,
				icon : {
	                url : 'img/marker-orange.png'
	            },
				infoWindow: {
					content : overlay
				}
			}
		);

	});

	map.drawPolyline({
		path: circuit.path,
		strokeColor: '#2166DE',
		strokeOpacity: 0.8,
		strokeWeight: 6
	});

	map.fitZoom();
	init_lat = map.getCenter().lat();
	init_long = map.getCenter().lng();
}

function showAllFiches() {

	map = new GMaps({
		el: '#map',
		lat: init_lat,
		lng: init_long,
		zoomControl : false,
		zoomControlOpt: {
			style : 'SMALL',
			position: 'TOP_LEFT'
		},
		panControl : false,
		streetViewControl : false,
		mapTypeControl: false,
		overviewMapControl: false
	});

    $.each(fiches_patrimoine, function(index, fiche)
		{
		    var overlay = '' +
		    '<div class="overlay-marker">' +
		    	'<span class="nom">' + fiche.nom + '</span>' +
		    	'<a data-transition="slide" href="detail-fiche.html?id=' + fiche.id + '" class="picto-detail">' +
		    		'<img src="img/btn-detail.png" />' +
		    	'</a>' +
		    '</div>';

		    map.addMarker(
		    	{
					lat: fiche.latitude,
					lng: fiche.longitude,
					icon : {
		                url : 'img/marker-orange.png'
		            },
					infoWindow: {
						content : overlay
					}
				}
			);
		}
	);
}


function showFiche(id) {

	map = new GMaps(
		{
	        el: '#map',
	        lat: '48.775354515133',
	        lng: '5.16068791389466',
	        zoomControl : false,
	        zoomControlOpt: {
	            style : 'SMALL',
	            position: 'TOP_LEFT'
	        },
	        panControl : false,
	        streetViewControl : false,
	        mapTypeControl: false,
	        overviewMapControl: false,
	        mapMaker: false
      	}
    );

    fiche = getFiche(id);

    fiche.latitude = parseGmap(fiche.latitude);
    fiche.longitude = parseGmap(fiche.longitude);

    $('#header-map .titre-page').html(fiche.nom);

    init_lat = fiche.latitude;
	init_long = fiche.longitude;

    map.setCenter(init_lat, init_long, function()
    	{
		    var infoWindow = new google.maps.InfoWindow(
			    {
				    content: '<span class="nom-over">' + fiche.nom + '</span>'
				}
			);

		    var marker = map.addMarker(
		    	{
					lat: fiche.latitude,
					lng: fiche.longitude,
					icon : {
		                url : 'img/marker-orange.png'
		            },
					infoWindow: infoWindow
				}
			);

			infoWindow.open(map, marker);
		}
    );
    // );


	$.each(fiches_hr, function(index, fiche)
		{
			var overlay = '' +
		    '<div class="overlay-marker">' +
		    	'<span class="nom">' + fiche.nom + '</span>' +
		    	'<a data-transition="slide" href="http://mobi.tourisme-barleduc.fr/page,index-lieu,idlieu,' + fiche.id + ',sitlor,1,sous_categ,' + fiche.type_id + '" class="picto-detail" rel="external" target="_blank">' +
		    		'<img src="img/btn-detail.png" />' +
		    	'</a>' +
		    	'<br><span class="type">' + fiche.type + '</span>' +
		    '</div>';

		    var url_marker = 'img/marker-hotel.png';
		    if (fiche.hotel_ou_restaurant == 'RESTAURANT')
		    {
		    	url_marker = 'img/marker-resto.png';
		    }

		    map.addMarker(
		    	{
					lat: parseGmap(fiche.latitude),
					lng: parseGmap(fiche.longitude),
					icon :
						{
		                	url : url_marker
		              	}
		            ,
					infoWindow: 
						{
							content : overlay
						}
				}
			);
		}
	);
}
