









































		
		var map = null;
		//var ajax_url = "http://misterharry.local/Sites%20Web%20MisterHarry/Gandi/mhweb/appmh.chalon.fr/production/www/ajax/ajax-android.php";
		var ajax_url = "http://appmobile.chalon.fr/ajax/ajax-android.php";
		var upload_url = "http://appmobile.chalon.fr/ajax/upload.php";
		var nav_object;
		var map_object;
		var deplacement_object;
		var travaux_object;
		var urgence_object;
		var tourisme_object;
		var service_public_object;
		var commerce_object;
		var news;
		
		var credits;
		
		var TRIGGER_EVENT = "touchend";
		var BUTTON_TRIGGER_EVENT = "touchend";
		var WINDOW_HEIGHT = $(window).height();
		var WINDOW_WIDTH = $(window).width();
		var user_lat = 46.780556;
		var user_lng = 4.852778;
		var actu_timeout;
		var ID_CLIENT = Math.floor(Math.random()*1500);
		var watchID = null;
		var user_position_interval = null;
		var callback_function = null;
		var tab_page = new Array();
		
		
		function getUrlVars() {
			var vars = {};
			var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
				vars[key] = value;
			});
			return vars;
		}

		function init(){
			
			
			
			//$('#loading').show();
			getSplashScreen();
			
			$('.page[role=main]').show();
			nav_object = $('body').navigation();
			load_actus_chaudes();
			
			assign_content_height();
			shortcut_dep();
			userPosition();
			setMarqueur("accueil");
			
			nav_object.set_back_button( function(){ navigator.app.exitApp(); });
			
			/*alert(WINDOW_HEIGHT-$('#my_content').height()+$('#windows').height() );
			if( WINDOW_HEIGHT > $('#my_content').height() ){
				$('#home_content .windows').height(parseInt( WINDOW_HEIGHT-$('#my_content').height()+$('#my_content').height() ));
			}*/
			
			var i1 = $('<img />').attr('src','images_2x/bg_actualites.jpg');
			var i2 = $('<img />').attr('src','images_2x/bg_allomairie.jpg');
			var i3 = $('<img />').attr('src','images_2x/bg_deplacement.jpg');
			var i4 = $('<img />').attr('src','images_2x/bg_meteo.jpg');
			var i5 = $('<img />').attr('src','images_2x/bg_service_municipaux.jpg');
			var i6 = $('<img />').attr('src','images_2x/bg_tourisme.jpg');
			var i7 = $('<img />').attr('src','images_2x/bg_urgences.jpg');
			var i8 = $('<img />').attr('src','images_2x/dep_bhns.png');
			var i9 = $('<img />').attr('src','images_2x/dep_lepouce.png');
			var i10 = $('<img />').attr('src','images_2x/dep_zoom.png');
			
			var ii1 = $('<img />').attr('src','images/bg_actualites.jpg');
			var ii2 = $('<img />').attr('src','images/bg_allomairie.jpg');
			var ii3 = $('<img />').attr('src','images/bg_deplacement.jpg');
			var ii4 = $('<img />').attr('src','images/bg_meteo.jpg');
			var ii5 = $('<img />').attr('src','images/bg_service_municipaux.jpg');
			var ii6 = $('<img />').attr('src','images/bg_tourisme.jpg');
			var ii7 = $('<img />').attr('src','images/bg_urgences.jpg');
			var ii8 = $('<img />').attr('src','images/dep_bhns.png');
			var ii9 = $('<img />').attr('src','images/dep_lepouce.png');
			var ii10 = $('<img />').attr('src','images/dep_zoom.png');
						
			document.addEventListener("backbutton", function(event){ event.preventDefault(); event.stopPropagation(); callback_function(); }, false);
			document.addEventListener("menubutton", nav_object.go_home, false);
			
			
			var id_actu = getUrlVars()["id_actu"];
			if(id_actu != '' && id_actu != 'undefined')
			{
				news = $('body').news(id_actu);
			}
		}
		
		
		
		function getSplashScreen(){
			$.ajax({ url: ajax_url, dataType: 'json',
				data: "table=splashscreen&os=android",
				timeout:5000,
				success: function(data){
					if( data && data.image ){
						var html = '';
						if( data.lien )
							html = '<a href="#" onclick="openExternalLink(' + data.lien + ')"><img src="' + data.image + '" alt="" style="position:relative" /></a>'; 
						else 
							html = '<img src="' + data.image + '" alt="" style="position:relative" />'; 
						$('<img height="100%" width="100%"  />').load(data.image, function(){
							$('.page[role=main]').append('<div id="post_splashscreen" style="overflow:hidden">' + html + '</div>'); 
							//$('#loading').hide();
							setTimeout( function(){ $('#post_splashscreen').remove(); $('#osplash').remove(); }, 6000);
						});
					}else{
						 //$('#loading').hide();
						 $('#osplash').remove();
					}
				},
				error: function(){
					 //$('#loading').hide();
					 $('#osplash').remove();
				}
			});
		}
		
		function sort_by(field, reverse, primer){
		   var key = function (x) {return primer ? primer(x[field]) : x[field]};
		   return function (a,b) {
			   var A = key(a), B = key(b);
			   return (A < B ? -1 : (A > B ? 1 : 0)) * [1,-1][+!!reverse];                  
		   }
		}
		
		function userPosition(){
			navigator.geolocation.getCurrentPosition(function(position){ 
				user_lat = position.coords.latitude;
				user_lng = position.coords.longitude;
			}, function(error){
				clearInterval(user_position_interval);
			}, { maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });	
		}
		
		function is_array(input){
			return typeof(input)=='object'&&(input instanceof Array);
        }
		
		function load_actus_chaudes(){
			clearTimeout( actu_timeout );
			$.ajax({ url: ajax_url, dataType: 'json',
				data: "table=actualite_chaude",
				success: function(data){
					if( data ){
						$("#actus-chaudes_liste").html('');
						$.each(data, function(i, item) {
							var html = "<h2>" + item.nom + "</h2><p>" + item.descr + "</p>";
							var elem = $('<li></li>').html(html);
							if( item._idActu ){
								elem.tappable( function(){ $('#loading').show(); news = $('body').news(item._idActu); });
							}
							if( item._idActu )
								elem.addClass('next');
							$("#actus-chaudes_liste").append(elem);
						});
						$("#actus-chaudes_liste li:first").show();
						$('.load').hide();
						actu_timeout = setTimeout(function(){ fadeActusChaude(); },8000); 
					}
				}
			});
		}
		
		function fadeActusChaude(){
			if( $('#actus-chaudes_liste li.active').length == 0 ){
				$('#actus-chaudes_liste li:first').addClass('active');
			}
			var nbchild = $('#actus-chaudes_liste li').length;
			$('#actus-chaudes_liste li.active').hide();
			
			if( $('#actus-chaudes_liste li:last').hasClass('active') ){
				$('#actus-chaudes_liste li.active').removeClass('active');
				$('#actus-chaudes_liste li:first').addClass('active').fadeIn();	
			}
			else{
				$('#actus-chaudes_liste li.active').removeClass('active').next().addClass('active').show();
			}
			actu_timeout = setTimeout(fadeActusChaude,8000); 
			
		}
		
		function assign_content_height(){
			var height = $(window).height();
			var  css = "#actualite_fiche .content, #service_public .content, #allomairie_form .content, #service_public_details .content, #urgence_details .content, #urgence .content, #travaux_details .content, #meteo .content, #tourisme .content, #deplacement_details .content, #service_public_fiche .content, #actualite_fiche_zoom .content, #credits .content { min-height: " + (parseInt(height)-60) + "px;  } ";
			css += ".page_content, #map_canvas, #plan .content, #bhns .content, #map_window, #loading, #post_splashscreen, #alertBox, #home_content, #overlay_splash { min-height: " + height + "px;  } ";			
			css += "#map-selector-container { margin-top: " + (height-68) + "px; } ";
			css += "#map-selector-container { margin-left: " + (WINDOW_WIDTH-130)/2 + "px; } ";
			css += "#map_canvas, #map-container, #plan, #post_splashscreen { height: " + height + "px; width : " + WINDOW_WIDTH + "px;  }";
			css += "#main_menu { height:" + (height-75-($('#hot_news').height())) + "px }";
			css += "#main_menu ul li { height:" + parseInt((height-75-($('#hot_news').height()))*30/100) + "px }";
			css += "#center_window ul li { width:" + (parseInt((WINDOW_WIDTH-5)/5)) + "px;}";
			$("<style type='text/css'> " + css + " </style>").appendTo("head");
		}
		
		function shortcut_dep(){
			$('#deplacement_selection .shortcut').tappable( function(el){
				clearTimeout(actu_timeout);
				var element_clicked = el.currentTarget.id;
					$('#loading').show();
					if( element_clicked == 'plan_places_pmr' ){
							setTimeout( function(){
								setMarqueur('deplacements::places pmr');
								$('body').mapIt(); 
								map_object.shortcutElements('HAND',1, 'Places PMR');
							}, 1000);
						
					}else if( element_clicked == 'plan_parking' ){
							setTimeout( function(){ 
								setMarqueur('deplacements::places de parkings');
								$('body').mapIt(); 
								map_object.shortcutElements('PARK',1,'Parkings');
							}, 1000);
					}else if( element_clicked == 'plan_station_reflex' ){
							setTimeout( function(){ 
								setMarqueur('deplacements::stations reflex');
								$('body').mapIt(); 
								map_object.shortcutElements('S30',1,'VÃ©lo - RÃ©flex');
							}, 1000);
						
					}else if( element_clicked == 'plan_station_taxis' ){
							setTimeout( function(){ 
								setMarqueur('deplacements::stations taxis');
								$('body').mapIt(); 
								map_object.shortcutElements('TAXI',1,'Stations taxis');							
							}, 1000);
						
					}else if( element_clicked == 'plan_gare' ){
						nav_object.load_a_new_page('small_maps.html', function(){
							setTimeout( function(){
								setMarqueur('plan::gare');
								$('body').mapIt(); 
								map_object.shortcutElements('GARE',1,'Gare');							
							}, 1000);
						},1);
					}else if( element_clicked == 'plan_aerodrome' ){
						nav_object.load_a_new_page('small_maps.html', function(){
							setTimeout( function(){ 
								setMarqueur('plan::aerodrome');
								$('body').mapIt(); 
								map_object.shortcutElements('AERODROME',1,'AÃ©rodrome');							
							}, 1000);
						},1);
					}else if( element_clicked == 'pre_deplacement_button' ){
						nav_object.load_a_new_page('pre_deplacement.html', function(){ 
							
							$('#loading').hide();
							$('#dep_zoom').tappable( function(){ 
								nav_object.load_a_new_page('deplacement_ligne.html', function(){ 
									setMarqueur('deplacements::reseau zoom');
									$('#loading').show();
									setTimeout( function(){ 
										$('body').deplacement(); 
									}, 500);
								}, 1);
							});
							$('#dep_bhns').tappable( function(){ 
								nav_object.load_a_new_page('deplacement_ligne.html', function(){ 
									setMarqueur('deplacements::flash');
									$('#loading').show();
									setTimeout( function(){ 
										$('body').deplacement('flash'); 
									}, 500);
								}, 1);
							});
							$('#dep_lepouce').tappable( function(){ 
								nav_object.load_a_new_page('deplacement.html', function(){ 
									setMarqueur('deplacements::le pouce');
									setTimeout( function(){ $('body').deplacement(); deplacement_object.lePouce(); }, 1000);
								}, 1)
							});
							$('#dep_buscephale').tappable( function(){ 
								nav_object.load_a_new_page('deplacement_ligne.html', function(){ 
									setMarqueur('deplacements::buscephale');
									$('#loading').show();
									setTimeout( function(){ $('body').deplacement('buscephale'); }, 1000);
								}, 1)
							});
							
						}, 1);
					}
																 
			});
		}
		
		function newAlert(str){
			navigator.notification.alert(str, null, '');
		}
		
		document.addEventListener("deviceready", init, function(){ alert('error') });
		document.addEventListener("resume", onResume, false);

		function onResume() {
			//getSplashScreen();
			userPosition();
		}
	
        function onDeviceReady() {
        	$(document).ready(function(){
                init();
            });
        }
		
		function openExternalLink(url){
			  if( url )
				  iabRef = window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
			  return false;
		}
		  
		function loadURL(url){
			if( url )
				navigator.app.loadUrl(url, { openExternal:true } );			
		}
				
		
		
		  
	  






document.write(Math.floor(Math.random()*1500000));










(function($) {
  var touchSupported = ('ontouchstart' in window)

  $.fn.tappable = function(options) {
    var cancelOnMove = true,
        onlyIf = function() { return true },
        touchDelay = 0,
        callback

    switch(typeof options) {
      case 'function':
        callback = options
        break;
      case 'object':
        callback = options.callback

        if (typeof options.cancelOnMove != 'undefined') {
          cancelOnMove = options.cancelOnMove
        }

        if (typeof options.onlyIf != 'undefined') {
          onlyIf = options.onlyIf
        }

        if (typeof options.touchDelay != 'undefined') {
          touchDelay = options.touchDelay
        }

        break;
    }

    var fireCallback = function(el, event) {
      if (typeof callback == 'function' && onlyIf(el)) {
        callback.call(el, event)
      }
    }

    if (touchSupported) {
      this.bind('touchstart', function(event) {
        var el = this

        if (onlyIf(this)) {
          $(el).addClass('touch-started')

          window.setTimeout(function() {
            if ($(el).hasClass('touch-started')) {
              $(el).addClass('touched')
            }
          }, touchDelay)
        }

        return true
      })

      this.bind('touchend', function(event) {
        var el = this

        if ($(el).hasClass('touch-started')) {
          $(el)
            .removeClass('touched')
            .removeClass('touch-started')

          fireCallback(el, event)
        }

        return true
      })

      this.bind('click', function(event) {
        event.preventDefault()
      })

      if (cancelOnMove) {
        this.bind('touchmove', function() {
          $(this)
            .removeClass('touched')
            .removeClass('touch-started')
        })
      }
    } else if (typeof callback == 'function') {
      this.bind('click', function(event) {
        if (onlyIf(this)) {
          callback.call(this, event)
        }
      })
    }

    return this
  }
})(jQuery);

(function($) {
	var self;
	var map;
	var parent_categorie = new Array();
	var latitude;
	var longitude;
	var directionsDisplay;
	var my_latitude;
	var my_longitude;
	
	var user_position_marker; 
	var user_coords;
	var direction;
	var polyline = new google.maps.Polyline();
	var current_cat = 0;
	var parent_cat = 0;
	
	urgence.prototype.ajaxQuery = function(id_categorie, firstStart){
		$(window).scrollTop(0);
		$('.urgence_liste').html('');
		$.ajax({ url: ajax_url, dataType: 'json',
			data: "table=urgence&id_categorie=" + id_categorie,
			success: function(data){
				$.each(data.points, function(i, item) {
					if( item.type == "categorie" ){
						var elem = $('<li></li>').html(item.nom);
						elem.tappable( function(){ self.getElementInCategory(item.id_categorie,0); setMarqueur('urgence::' + item.nom);  });
						
					}else {
						if( id_categorie == 74 || id_categorie == 75 ){
							var html = '<p style="width:100%">';
							if( item.coord )
								html += '<span>' + item.coord + '</span><br /><br />';
							if(	item.nom )
								html += item.nom + '<br />';
							if( item.adresse )
								html += item.adresse + '<br />' + item.cp + ' ' + item.ville + '<br />';
							if( item.telephone )
								html += item.telephone + '</p><a href="tel:' + item.telephone + '"><img src="images/urgence_phone.png" style="margin-top:15px;" width="39" height="38" /></a>';
							else html += '</p>';
							if( item.lat > 0 && item.lng > 0) 
								html += '<a href="javascript:urgence_object.mapIt(' + item.id_point + ',' + item.lat + ',' + item.lng + ');"><img src="images_2x/urgence_drive.png" style="margin-top:15px;" width="79" height="38" /></a>';
							html += '<p class="clear"></p>';
							var elem = $('<li></li>').html(html);
						}else{
							var html = '<p style="width:100%">' + item.nom + '';
							if( item.telephone )
								html += '<br />' + item.telephone + '</p><a href="tel:' + item.telephone + '"><img src="images/urgence_phone.png" style="margin-top:15px;" width="39" height="38"  /></a>';
							else html += '</p>';
							if( item.lat > 0 && item.lng > 0) 
								html += '<a href="javascript:urgence_object.mapIt(' + item.id_point + ',' + item.lat + ',' + item.lng + ');"><img src="images_2x/urgence_drive.png" style="margin-top:15px;" width="79" height="38" /></a>';
							html += '<p class="clear"></p>';
							
							var elem = $('<li></li>').html(html);
						}
						elem.addClass('point');
					}
						elem.appendTo('.urgence_liste');
				});
				if( id_categorie ){
					if( id_categorie == 74 ){ 
						$('.urgence_liste').append('<li style="background-image:none; font-size:1em"> Ce service vous est propos&eacute; en partenariat avec le syndicat des Pharmaciens de Sa&ocirc;ne-et-Loire. Il assure la mise en ligne des informations, et se charge &eacute;galement de la mise &agrave; jour. Elles ne sont donc pas de la responsabilit&eacute; de la Ville de Chalon-sur-Sa&ocirc;ne.<br />Avant tout d&eacute;placement, nous vous invitons &agrave; t&eacute;l&eacute;phoner aux pharmacies de garde pour vous assurer qu\'elles soient bien ouvertes. <br />Les dimanches et jours f&eacute;ri&eacute;s apr&egrave;s 19 heures, pour toute ordonnance urgente, il est imp&eacute;ratif de se rendre au commissariat de police - 4, rue Emile Roux ou au <a href="tel:17" style="color:#0C0">17</a>.</li>');	
					}
					
					current_cat = id_categorie;
					parent_cat = parent_categorie[parent_categorie.length-2];
					
					/*** BACK BUTTON ***/
					if( parent_cat ) 
						nav_object.set_back_button( function(){ parent_categorie.pop(); parent_categorie.pop(); self.getElementInCategory(parent_cat,0); });
					else{
						nav_object.set_back_button( function(){ self.getElementInCategory(0); nav_object.set_back_button(function(){nav_object.go_home()}); });
						parent_cat = 0;
					}
					
					$('#urgence .back_button_noauto').show();
					$('#urgence h1').html(data.courant.nom);	
					self.setTitleHeight('#urgence h1');
					$('.urgence_liste, #urgence_presentation').animate({ left : '-=480px', useTranslate3d:true, leaveTransforms:false }, 500, "linear", function(){ });
					//$('.urgence_liste').css('margin-top' , '0%' );
				}else
					$('#urgence .back_button_noauto').hide();
				if( !id_categorie && !firstStart )
					$('.urgence_liste, #urgence_presentation').animate({ left : '-=480px', useTranslate3d:true, leaveTransforms:false }, 500, "linear", function(){ });
				$('#loading').hide();
			}
		});
	}
	
	urgence.prototype.mapIt = function(id_point, lat, lng){
		$('#loading').show();
		$('body').mapIt(id_point, lat, lng, 1, function(){
			nav_object.prev_page(); 
			parent_categorie.pop();
			self.getElementInCategory(current_cat,0);
		});
	}
	
	urgence.prototype.getElementInCategory = function(id_categorie, firstStart){
		$('#loading').show();
		$(window).scrollTop(0);
				
		if( id_categorie ){
			$('.urgence_liste, #urgence_presentation').animate({ left:'+=480px', useTranslate3d:true, leaveTransforms:true}, 500, "linear", function(){
				self.ajaxQuery(id_categorie,0);
				parent_categorie.push(id_categorie);				
			});

		}else{
			$('#urgence h1').html('Urgences');	
			self.setTitleHeight('#urgence h1');
			parent_categorie = [0];
			if( firstStart )
				self.ajaxQuery(0,1);
			else{
				$('.urgence_liste, #urgence_presentation').animate({ left:'+=480px', useTranslate3d:true, leaveTransforms:true}, 500, "linear", function(){
					self.ajaxQuery(id_categorie,0);
					parent_categorie.push(id_categorie);				
				});	
			}
		}
		
	}
	
	urgence.prototype.searchIt = function(value){
		$(window).scrollTop(0);
		$('#loading').show();
		$('#search_results_mention').show();
		$.ajax({ url: ajax_url, dataType: 'json',
			data: "table=urgence&value=" + value,
			success: function(data){
				$.each(data, function(i, item) {
					var elem = $('<li></li>').html(item.nom)
					.on( TRIGGER_EVENT, function(event){ event.stopPropagation(); event.preventDefault(); self.showServices(item.id_point); });
					elem.appendTo('#urgence_categories');
				});
				$('#loading').hide();
			}
		});
	}
	
	urgence.prototype.getUserPosition = function(){
		  var coords = new google.maps.LatLng(user_lat,user_lng);
		  var icon = new google.maps.MarkerImage("images/marker_bleu.png");
		  var marker = new google.maps.Marker({ position: coords, icon : icon });
		  marker.setMap(map);
	}
	
	urgence.prototype.getDistance = function(lat, lng){
		if( user_lat && user_lng ){
			$.getJSON("http://maps.googleapis.com/maps/api/distancematrix/json?origins=" + user_lat + ',' + user_lng + "&destinations=" + lat + ',' + lng + "&mode=driving&language=fr-FR&sensor=true", 
				function(data){
					var distance = data.rows[0].elements[0].distance.text;
					$('#urgence_description .distance').text(distance);
			   }
			);	
		}
	}
	
	urgence.prototype.setTitleHeight = function(elem){
		$(' .header h1').css('font-size', '2.8em');
		var h = $('.header h1').height();
		h=h+30;
		var fs = 2.7;
		while( h > 50 ){
			fs = Math.round((fs-0.1)*10)/10;
			$(' .header h1').css('font-size', fs + 'em');
			h = $(' .header h1').height();
			h=h+30;
		}
	}
	
	function urgence() {
		self = this;
		
		setMarqueur('urgence');
		
		self.getElementInCategory(0,1);
		
		$('#seach_form').on('submit', function(){
			self.searchIt( $('#seach_form input[type=search]').val() );
			return false;
		});
		$('#seach_reset').on(TRIGGER_EVENT, function(){
			$('#seach_form input[type=search]').val('Rechercher');
			self.getElementInCategory(0,0);
		});
	}
	
	$.fn.urgence = function () {
		urgence_object = new urgence();
	}
	
		  
})( jQuery );

// JavaScript Document
function getMeteo(paged){
	setMarqueur('meteo');
	$.ajax({ url:"http://free.worldweatheronline.com/feed/weather.ashx", dataType: 'json', 
		   data:'q=46.780556,4.852778&num_of_days=3&format=json&key=468f269f04134912122203', success: function(data){
		/*$.ajax({ url:"http://misterharry.local/Sites%20Web%20MisterHarry/Gandi/mhweb/appmh.chalon.fr/validation/www/meteo2.php", dataType: 'json',  data:'', success: function(data){*/
			if( paged && data ){
				var html = '';
				var weatherCode = new Array();
				weatherCode[113] = '01.png';
				weatherCode[116] = '02.png';
				weatherCode[119] = '04.png';
				weatherCode[122] = '04.png';
				weatherCode[176] = '03.png';
				weatherCode[179] = '03.png';
				weatherCode[182] = '05.png';
				weatherCode[185] = '05.png';
				weatherCode[200] = '07.png';
				weatherCode[227] = '06.png';
				weatherCode[230] = '04.png';
				weatherCode[248] = '04.png';
				weatherCode[260] = '04.png';
				weatherCode[266] = '05.png';
				weatherCode[281] = '05.png';
				weatherCode[284] = '05.png';
				weatherCode[293] = '05.png';
				weatherCode[296] = '05.png';
				weatherCode[299] = '03.png';
				weatherCode[302] = '03.png';
				weatherCode[308] = '05.png';
				weatherCode[311] = '04.png';
				weatherCode[314] = '04.png';
				weatherCode[317] = '04.png';
				weatherCode[320] = '04.png';
				weatherCode[323] = '03.png';
				weatherCode[323] = '03.png';
				weatherCode[332] = '06.png';
				weatherCode[335] = '06.png';
				weatherCode[338] = '06.png';
				weatherCode[350] = '06.png';
				weatherCode[353] = '03.png';
				weatherCode[356] = '03.png';
				weatherCode[359] = '05.png';
				weatherCode[362] = '03.png';
				weatherCode[365] = '03.png';
				weatherCode[368] = '03.png';
				weatherCode[371] = '03.png';
				weatherCode[374] = '03.png';
				weatherCode[377] = '05.png';
				weatherCode[362] = '07.png';
				weatherCode[386] = '07.png';
				weatherCode[389] = '07.png';
				weatherCode[392] = '07.png';
				weatherCode[395] = '07.png';
				
				$.each(data.data.weather, function(i, item) {
					var timestamp = Math.round(new Date().getTime() / 1000)+(i*60*60*24);
					var myDate =  new Date();
					myDate = myDate.dateFormat('D d', 'fr', timestamp );
					if( weatherCode[item.weatherCode] ) var icon = weatherCode[item.weatherCode];
					else var icon = "02.png";
					
					html += '<div class="line">';
					html += '<img src="images/weather/' + icon + '"/>';
					html += '<p>';
					html += '<span class="temp">' + item.tempMaxC + '&deg;C</span><br />';
					html += '<span class="date">' + myDate + '</span><br />';
					html += '<span class="max">Min : ' + item.tempMinC + '&deg;C</span>';
					html += '</p>';
					html += '</div>';
				});
				$('#meteo .content').html(html);
				$('#loading').hide();
			}
		}
	});
		
	
}

function animateBackground(direction){
	if( direction == 1 ){
		$('#meteo').animate({ backgroundPosition : '(0 -50px)' }, 20000);	
	}
	$('#meteo').animate({backgroundPosition:"(0 -250px)"}, {duration:500});
}




//
// dateFormat v0.1 | 2004-04-03 15:10
//
// a : Ante meridiem et Post meridiem en minuscules - am ou pm 
// A : Ante meridiem et Post meridiem en majuscules - AM ou PM 
// B : Heure Internet Swatch - 000 à 999
//     http://www.quirksmode.org/index.html?/js/beat.html
// d : Jour du mois, sur deux chiffres avec zéro initial - 01 à 31 
// D : Jour de la semaine, en 3 lettres, anglais par défaut - Mon à Sun 
// F : Mois textuel, version longue, anglais par défaut - January à December 
// g : Heure au format 12h, sans le zéro initial - 1 à 12 
// G : Heure au format 24h, sans le zéro initial - 0 à 23 
// h : Heure au format 12h, avec le zéro initial - 01 à 12 
// H : Heure au format 24h, avec le zéro initial - 00 à 23 
// i : Minutes avec le zéro initial - 00 à 59 
// j : Jour du mois sans le zéro initial - 1 à 31 
// l : Jour de la semaine, textuel, anglais par défaut - Sunday à Saturday 
// L : L'année est elle bissextile ? - 0 ou 1 
// m : Mois avec le zéro intial - 01 à 12 
// M : Mois, en 3 lettres, anglais par défaut - Jan à Dec 
// n : Mois sans le zéro intial - 1 à 12 
// O : Différence avec l'heure de Greenwich (GMT), en heures - -1200 à +1200 
// r : Format de date RFC 822 Thu, 1 Apr 2004 12:00:00 - +0200 
// s : Secondes avec le zéro initial - 00 à 59 
// S : Suffixe ordinal d'un jour, anglais par défaut - st, nd, rd, th 
// t : Nombre de jours dans le mois - 28 à 31 
// U : Secondes depuis le 1er Janvier 1970, 0h00 00s GMT - Ex: 1081072800 
// w : Jour de la semaine (0 étant dimanche, 6 samedi) - 0 à 6 
// W : Numéro de la semaine dans l'année - 1 à 52
//     http://www.asp-php.net/tutorial/asp-php/glossaire.php?glossid=28
// y : Année sur 2 chiffres - Ex: 04 
// Y : Année sur 4 chiffres - Ex: 2004 
// z : Jour de l'année - 1 à 366 
// Z : Décalage horaire en secondes - -43200 à 43200 
// \ : Caractère d'echappement - Ex: \a, \A, \m

String.prototype.padLeft = function(strChar, intLength)
{
 var str = this + '';
 while (str.length != intLength) {
  str = strChar + str;
 }
 return str;
}

String.prototype.isInt = function()
{
 var oRegExp = new RegExp(/\d+/);
 return oRegExp.test(this);
}

Array.prototype.exists = function(objValue)
{
 var boolReturn = false, i = 0;
 for (i = 0; i < this.length; i++) {
  if (this[i] == objValue) {
   boolReturn = true;
   break;
  }
 }
 return boolReturn;
}

Date.prototype.dateFormat = function(strFormat, strLang, intTime)
{

 var arrayLang = ['en', 'fr'];
 var arrayFunctions = ['a', 'A', 'B', 'd', 'D', 'F', 'g', 'G', 'h', 'H', 'i', 'j', 'l', 'L', 'm', 'M', 'n', 'O', 'r', 's', 'S', 't', 'U', 'w', 'W', 'y', 'Y', 'z', 'Z'];

 if (intTime) {
  if (!intTime.toString().isInt()) {
   intTime = null;
  } else {
   intTime *= 1000;
  }
 }
 if (strLang) {
  if (strLang.toString().isInt()) {
   intTime = strLang * 1000;
   strLang = 'en';
  } else {
   if (!arrayLang.exists(strLang)) {
    strLang = 'en';
   }
  }
 } else {
  strLang = 'en';
 }

 var arrayDays_en = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 var arrayMonths_en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 var arraySuffix_en = ['st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st'];

 var arrayDays_fr = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
 var arrayMonths_fr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
 var arraySuffix_fr = ['er', 'nd', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème', 'ème'];

 // a : Ante meridiem et Post meridiem en minuscules - am ou pm 
 fct_a = function()
 {
  return (self.getHours() > 11) ? 'pm' : 'am';
 }

 // A : Ante meridiem et Post meridiem en majuscules - AM ou PM 
 fct_A = function()
 {
  return (self.getHours() > 11) ? 'PM' : 'AM';
 }

 // B : Heure Internet Swatch - 000 à 999
 //     http://www.quirksmode.org/index.html?/js/beat.html
 fct_B = function() {
  var intGMTOffset = (self.getTimezoneOffset() + 60) * 60;
  var intSeconds = (self.getHours() * 3600) + (self.getMinutes() * 60) + self.getSeconds() + intGMTOffset;
  var intBeat = Math.floor(intSeconds / 86.4);
  if (intBeat > 1000) {intBeat -= 1000;}
  if (intBeat < 0) {intBeat += 1000;}
  return intBeat.toString().padLeft('0', 3);
 }

 // d : Jour du mois, sur deux chiffres avec zéro initial - 01 à 31 
 fct_d = function()
 {
  return self.getDate().toString().padLeft('0', 2);
 }

 // D : Jour de la semaine, en 3 lettres, anglais par défaut - Mon à Sun 
 fct_D = function()
 {
  return eval('arrayDays_' + strLang)[self.getDay()].substring(0, 3);
 }

 // F : Mois textuel, version longue, anglais par défaut - January à December 
 fct_F = function()
 {
  return eval('arrayMonths_' + strLang)[self.getMonth()];
 }

 // g : Heure au format 12h, sans le zéro initial - 1 à 12 
 fct_g = function()
 {
  return (self.getHours() > 12) ? self.getHours() - 12 : self.getHours();
 }

 // G : Heure au format 24h, sans le zéro initial - 0 à 23 
 fct_G = function()
 {
  return self.getHours();
 }

 // h : Heure au format 12h, avec le zéro initial - 01 à 12 
 fct_h = function()
 {
  return (self.getHours() > 12) ? (self.getHours() - 12).toString().padLeft('0', 2) : self.getHours().toString().padLeft('0', 2);
 }

 // H : Heure au format 24h, avec le zéro initial - 00 à 23 
 fct_H = function()
 {
  return self.getHours().toString().padLeft('0', 2);
 }

 // i : Minutes avec le zéro initial - 00 à 59 
 fct_i = function()
 {
  return self.getMinutes().toString().padLeft('0', 2);
 }

 // j : Jour du mois sans le zéro initial - 1 à 31 
 fct_j = function()
 {
  return self.getDate();
 }

 // l : Jour de la semaine, textuel, anglais par défaut - Sunday à Saturday 
 fct_l = function()
 {
  return eval('arrayDays_' + strLang)[self.getDay()];
 }

 // L : L'année est elle bissextile ? - 0 ou 1 
 fct_L = function()
 {
  var intFullYear = fct_Y();
  return ((intFullYear % 4 == 0 && intFullYear % 100 != 0) || (intFullYear % 4 == 0 && intFullYear % 100 == 0 && intFullYear % 400 == 0)) ? 1 : 0;
 }

 // m : Mois avec le zéro intial - 01 à 12 
 fct_m = function()
 {
  return (self.getMonth() + 1).toString().padLeft('0', 2);
 }

 // M : Mois, en 3 lettres, anglais par défaut - Jan à Dec 
 fct_M = function()
 {
  return eval('arrayMonths_' + strLang)[self.getMonth()].substring(0, 3);
 }

 // n : Mois sans le zéro intial - 1 à 12 
 fct_n = function()
 {
  return (self.getMonth() + 1);
 }

 // O : Différence avec l'heure de Greenwich (GMT), en heures - -1200 à +1200 
 fct_O = function()
 {
  var intTimezone = self.getTimezoneOffset();
  var intTimezoneAbs = Math.abs(intTimezone);
  var strTimezone = Math.floor(intTimezoneAbs / 60).toString().padLeft('0', 2) + (intTimezoneAbs % 60).toString().padLeft('0', 2);
  return (intTimezone < 0) ? '+' + strTimezone : '-' + strTimezone ;
 }

 // r : Format de date RFC 822 Thu, 1 Apr 2004 12:00:00 - +0200 
 fct_r = function()
 {
  return fct_D() + ', ' + fct_j() + ' ' + fct_M() + ' ' + fct_Y() + ' ' + fct_H() + ':' + fct_i() + ':' + fct_s() + ' ' + fct_O();
 }

 // s : Secondes avec le zéro initial - 00 à 59 
 fct_s = function()
 {
  return (self.getSeconds()).toString().padLeft('0', 2);
 }

 // S : Suffixe ordinal d'un jour, anglais par défaut - st, nd, rd, th 
 fct_S = function()
 {
  return eval('arraySuffix_' + strLang)[self.getDate() - 1];
 }

 // t : Nombre de jours dans le mois - 28 à 31 
 fct_t = function()
 {
  var intDays = 0;
  if (self.getMonth() == 1) {
   intDays = 28 + fct_L();
  } else {
   switch (self.getMonth() % 2) {
    case 0 : intDays = 31; break;
    default : intDays = 30;
   }
  }
  return intDays;
 }

 // U : Secondes depuis le 1er Janvier 1970, 0h00 00s GMT - Ex: 1081072800 
 fct_U = function()
 {
  return Math.round(self.getTime() / 1000);
 }

 // w : Jour de la semaine (0 étant dimanche, 6 samedi) - 0 à 6 
 fct_w = function()
 {
  return self.getDay();
 }

 // W : Numéro de la semaine dans l'année - 1 à 52
 //     http://www.asp-php.net/tutorial/asp-php/glossaire.php?glossid=28
 fct_W = function()
 {
  return Math.floor((fct_z() - 1 - self.getDay()) / 7) + 2;
 }

 // y : Année sur 2 chiffres - Ex: 04 
 fct_y = function()
 {
  var strFullYear = fct_Y().toString();
  return strFullYear.substring(strFullYear.length - 2, strFullYear.length);
 }

 // Y : Année sur 4 chiffres - Ex: 2004 
 fct_Y = function()
 {
  return self.getFullYear();
 }

 // z : Jour de l'année - 1 à 366 
 fct_z = function()
 {
  var datePremierJanvier = new Date('January 1 ' + fct_Y().toString() + ' 00:00:00');
  var intDifference = self.getTime() - datePremierJanvier.getTime();
  return Math.floor(intDifference / 1000 / 60 / 60 / 24);
 }

 // Z : Décalage horaire en secondes - -43200 à 43200 
 fct_Z = function()
 {
  var intTimezone = self.getTimezoneOffset();
  var intTimezoneAbs = Math.abs(intTimezone);
  var strTimezone = intTimezoneAbs * 60;
  return (intTimezone < 0) ? strTimezone : -strTimezone ;
 }

 var self = this;
 if (intTime) {
  var intMyTime = self.getTime();
  self.setTime(intTime);
 }
 var arrayFormat = strFormat.split(''), i = 0;
 for (i = 0; i < arrayFormat.length; i++) {
  if (arrayFormat[i] == '\\') {
   arrayFormat.splice(i, 1);
  } else {
   if (arrayFunctions.exists(arrayFormat[i])) {
    arrayFormat[i] = eval('fct_' + arrayFormat[i] + '();');
   }
  }
 }
 if (intMyTime) {
  self.setTime(intMyTime);
 }
 return arrayFormat.join('');

}

/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 * 
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 */
(function($) { 
   $.fn.touchwipe = function(settings) {
     var config = {
    		min_move_x: 20,
    		min_move_y: 20,
 			wipeLeft: function() { },
 			wipeRight: function() { },
 			wipeUp: function() { },
 			wipeDown: function() { },
			preventDefaultEvents: true
	 };
     
     if (settings) $.extend(config, settings);
 
     this.each(function() {
    	 var startX;
    	 var startY;
		 var isMoving = false;

    	 function cancelTouch() {
    		 this.removeEventListener('touchmove', onTouchMove);
    		 startX = null;
    		 isMoving = false;
    	 }	
    	 
    	 function onTouchMove(e) {
    		 if(config.preventDefaultEvents) {
    			 e.preventDefault();
    		 }
    		 if(isMoving) {
	    		 var x = e.touches[0].pageX;
	    		 var y = e.touches[0].pageY;
	    		 var dx = startX - x;
	    		 var dy = startY - y;
	    		 if(Math.abs(dx) >= config.min_move_x) {
	    			cancelTouch();
	    			if(dx > 0) {
	    				config.wipeLeft();
	    			}
	    			else {
	    				config.wipeRight();
	    			}
	    		 }
	    		 else if(Math.abs(dy) >= config.min_move_y) {
		    			cancelTouch();
		    			if(dy > 0) {
		    				config.wipeDown();
		    			}
		    			else {
		    				config.wipeUp();
		    			}
		    		 }
    		 }
    	 }
    	 
    	 function onTouchStart(e)
    	 {
    		 if (e.touches.length == 1) {
    			 startX = e.touches[0].pageX;
    			 startY = e.touches[0].pageY;
    			 isMoving = true;
    			 this.addEventListener('touchmove', onTouchMove, false);
    		 }
    	 }    	 
    	 if ('ontouchstart' in document.documentElement) {
    		 this.addEventListener('touchstart', onTouchStart, false);
    	 }
     });
 
     return this;
   };
 
 })(jQuery);


/*
jquery.animate-enhanced plugin v0.91
---
http://github.com/benbarnett/jQuery-Animate-Enhanced
http://benbarnett.net
@benpbarnett
*/
(function(d,B,C){function G(a,b,h,c){if("d"!=h){var f=H.exec(b),e="auto"===a.css(h)?0:a.css(h),e="string"==typeof e?x(e):e;"string"==typeof b&&x(b);var c=!0===c?0:e,d=a.is(":hidden"),i=a.translation();"left"==h&&(c=parseInt(e,10)+i.x);"right"==h&&(c=parseInt(e,10)+i.x);"top"==h&&(c=parseInt(e,10)+i.y);"bottom"==h&&(c=parseInt(e,10)+i.y);!f&&"show"==b?(c=1,d&&a.css({display:"block",opacity:0})):!f&&"hide"==b&&(c=0);return f?(a=parseFloat(f[2]),f[1]&&(a=("-="===f[1]?-1:1)*a+parseInt(c,10)),a):c}}function I(a,
b,h,c,f,e,g,i){var j=a.data(q),j=j&&!u(j)?j:d.extend(!0,{},J),n=f;if(-1<d.inArray(b,y)){var o=j.meta,m=x(a.css(b))||0,l=b+"_o",n=f-m;o[b]=n;o[l]="auto"==a.css(b)?0+n:m+n||0;j.meta=o;g&&0===n&&(n=0-o[l],o[b]=n,o[l]=0)}return a.data(q,K(a,j,b,h,c,n,e,g,i))}function K(a,b,d,c,f,e,g,i,j){var n=!1,g=!0===g&&!0===i,b=b||{};b.original||(b.original={},n=!0);b.properties=b.properties||{};b.secondary=b.secondary||{};for(var i=b.meta,o=b.original,m=b.properties,q=b.secondary,p=l.length-1;0<=p;p--){var k=l[p]+
"transition-property",r=l[p]+"transition-duration",s=l[p]+"transition-timing-function",d=g?l[p]+"transform":d;n&&(o[k]=a.css(k)||"",o[r]=a.css(r)||"",o[s]=a.css(s)||"");q[d]=g?(!0===j||!0===z&&!1!==j)&&D?"translate3d("+i.left+"px, "+i.top+"px, 0)":"translate("+i.left+"px,"+i.top+"px)":e;m[k]=(m[k]?m[k]+",":"")+d;m[r]=(m[r]?m[r]+",":"")+c+"ms";m[s]=(m[s]?m[s]+",":"")+f}return b}function L(a){for(var b in a)if(("width"==b||"height"==b)&&("show"==a[b]||"hide"==a[b]||"toggle"==a[b]))return!0;return!1}
function u(a){for(var b in a)return!1;return!0}function x(a){v=a.match(/\D+$/);return parseFloat(a.replace(/px/i,""))}function M(a,b,h){var c=-1<d.inArray(a,N);if(("width"==a||"height"==a)&&b===parseFloat(h.css(a)))c=!1;return c}var N="top,right,bottom,left,opacity,height,width".split(","),y=["top","right","bottom","left"],l=["","-webkit-","-moz-","-o-"],O=["avoidTransforms","useTranslate3d","leaveTransforms"],H=/^([+-]=)?([\d+-.]+)(.*)$/,P=/([A-Z])/g,J={secondary:{},meta:{top:0,right:0,bottom:0,
left:0}},v="px",q="jQe",E=null,A=!1,t=(document.body||document.documentElement).style,w=void 0!==t.WebkitTransition?"webkitTransitionEnd":void 0!==t.OTransition?"oTransitionEnd":"transitionend",F=void 0!==t.WebkitTransition||void 0!==t.MozTransition||void 0!==t.OTransition||void 0!==t.transition,D="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,z=D;d.expr&&d.expr.filters&&(E=d.expr.filters.animated,d.expr.filters.animated=function(a){return d(a).data("events")&&d(a).data("events")[w]?!0:E.call(this,
a)});d.extend({toggle3DByDefault:function(){return z=!z},toggleDisabledByDefault:function(){return A=!A}});d.fn.translation=function(){if(!this[0])return null;var a=window.getComputedStyle(this[0],null),b={x:0,y:0};if(a)for(var d=l.length-1;d>=0;d--){var c=a.getPropertyValue(l[d]+"transform");if(c&&/matrix/i.test(c)){a=c.replace(/^matrix\(/i,"").split(/, |\)$/g);b={x:parseInt(a[4],10),y:parseInt(a[5],10)};break}}return b};d.fn.animate=function(a,b,h,c){var a=a||{},f=!(typeof a.bottom!=="undefined"||
typeof a.right!=="undefined"),e=d.speed(b,h,c),g=this,i=0,j=function(){i--;i===0&&typeof e.complete==="function"&&e.complete.apply(g[0],arguments)};return(typeof a.avoidCSSTransitions!=="undefined"?a.avoidCSSTransitions:A)===true||!F||u(a)||L(a)||e.duration<=0||d.fn.animate.defaults.avoidTransforms===true&&a.avoidTransforms!==false?B.apply(this,arguments):this[e.queue===true?"queue":"each"](function(){var b=d(this),c=d.extend({},e),g=function(){var c=b.data(q)||{original:{}},d={};if(a.leaveTransforms!==
true){for(var e=l.length-1;e>=0;e--)d[l[e]+"transform"]="";if(f&&typeof c.meta!=="undefined")for(var e=0,g;g=y[e];++e)d[g]=c.meta[g+"_o"]+v}b.unbind(w).css(c.original).css(d).data(q,null);a.opacity==="hide"&&b.css({display:"none",opacity:""});j.call(b)},h={bounce:"cubic-bezier(0.0, 0.35, .5, 1.3)",linear:"linear",swing:"ease-in-out",easeInQuad:"cubic-bezier(0.550, 0.085, 0.680, 0.530)",easeInCubic:"cubic-bezier(0.550, 0.055, 0.675, 0.190)",easeInQuart:"cubic-bezier(0.895, 0.030, 0.685, 0.220)",easeInQuint:"cubic-bezier(0.755, 0.050, 0.855, 0.060)",
easeInSine:"cubic-bezier(0.470, 0.000, 0.745, 0.715)",easeInExpo:"cubic-bezier(0.950, 0.050, 0.795, 0.035)",easeInCirc:"cubic-bezier(0.600, 0.040, 0.980, 0.335)",easeInBack:"cubic-bezier(0.600, -0.280, 0.735, 0.045)",easeOutQuad:"cubic-bezier(0.250, 0.460, 0.450, 0.940)",easeOutCubic:"cubic-bezier(0.215, 0.610, 0.355, 1.000)",easeOutQuart:"cubic-bezier(0.165, 0.840, 0.440, 1.000)",easeOutQuint:"cubic-bezier(0.230, 1.000, 0.320, 1.000)",easeOutSine:"cubic-bezier(0.390, 0.575, 0.565, 1.000)",easeOutExpo:"cubic-bezier(0.190, 1.000, 0.220, 1.000)",
easeOutCirc:"cubic-bezier(0.075, 0.820, 0.165, 1.000)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.320, 1.275)",easeInOutQuad:"cubic-bezier(0.455, 0.030, 0.515, 0.955)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1.000)",easeInOutQuart:"cubic-bezier(0.770, 0.000, 0.175, 1.000)",easeInOutQuint:"cubic-bezier(0.860, 0.000, 0.070, 1.000)",easeInOutSine:"cubic-bezier(0.445, 0.050, 0.550, 0.950)",easeInOutExpo:"cubic-bezier(1.000, 0.000, 0.000, 1.000)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.150, 0.860)",
easeInOutBack:"cubic-bezier(0.680, -0.550, 0.265, 1.550)"},p={},h=h[c.easing||"swing"]?h[c.easing||"swing"]:c.easing||"swing",k;for(k in a)if(d.inArray(k,O)===-1){var r=d.inArray(k,y)>-1,s=G(b,a[k],k,r&&a.avoidTransforms!==true);a.avoidTransforms!==true&&M(k,s,b)?I(b,k,c.duration,h,r&&a.avoidTransforms===true?s+v:s,r&&a.avoidTransforms!==true,f,a.useTranslate3d===true):p[k]=a[k]}b.unbind(w);if((k=b.data(q))&&!u(k)&&!u(k.secondary)){i++;b.css(k.properties);var t=k.secondary;setTimeout(function(){b.bind(w,
g).css(t)})}else c.queue=false;if(!u(p)){i++;B.apply(b,[p,{duration:c.duration,easing:d.easing[c.easing]?c.easing:d.easing.swing?"swing":"linear",complete:j,queue:c.queue}])}return true})};d.fn.animate.defaults={};d.fn.stop=function(a,b,h){if(!F)return C.apply(this,[a,b]);a&&this.queue([]);this.each(function(){var c=d(this),f=c.data(q);if(f&&!u(f)){var e,g={};if(b){g=f.secondary;if(!h&&typeof f.meta.left_o!==void 0||typeof f.meta.top_o!==void 0){g.left=typeof f.meta.left_o!==void 0?f.meta.left_o:
"auto";g.top=typeof f.meta.top_o!==void 0?f.meta.top_o:"auto";for(e=l.length-1;e>=0;e--)g[l[e]+"transform"]=""}}else if(!u(f.secondary)){var i=window.getComputedStyle(c[0],null);if(i)for(var j in f.secondary)if(f.secondary.hasOwnProperty(j)){j=j.replace(P,"-$1").toLowerCase();g[j]=i.getPropertyValue(j);if(!h&&/matrix/i.test(g[j])){e=g[j].replace(/^matrix\(/i,"").split(/, |\)$/g);g.left=parseFloat(e[4])+parseFloat(c.css("left"))+v||"auto";g.top=parseFloat(e[5])+parseFloat(c.css("top"))+v||"auto";for(e=
l.length-1;e>=0;e--)g[l[e]+"transform"]=""}}}c.unbind(w).css(f.original).css(g).data(q,null)}else C.apply(c,[a,b])});return this}})(jQuery,jQuery.fn.animate,jQuery.fn.stop);

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

function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", deviceInfo, true);
}


(function($) {
	var self;
	var swipe_current_cat = 0;
	var current_scroll = 0;
	
	credits.prototype.getCredits = function() {
		var self = this;
		// les actus sont renvoyés sous la forme
		$('#credits_presentation').html('');
		$.ajax({ url: ajax_url, dataType: 'json',
			data: "table=credits",
			success: function(data){
				if( data && data.length > 0 ){
					$('#credits_presentation').html(data);
					$('#loading').hide();
				}else
					$('#loading').hide();
			}
		});
		
	}

	
	function credits() {
		self = this;
		setMarqueur('credits');
		self.getCredits();
		
	}
	
	$.fn.credits = function () {
		return new credits();
	}
			
})( jQuery );
						

(function($) {
	
	var transition = ( $(this).attr('transition-name') ? 'slide' : $(this).attr('transition-name') );
	var self;
	
	navigation.prototype.init = function() {
		self.initMenuEvent();
	}
	
	navigation.prototype.initMenuEvent = function(){
		// On cible toutes les balise <a> avec la class .paged dans le div role=main
		$('.page[role=main] a.paged').each( function(){
			if( $(this).attr('href') !== '' ){
				 $(this).off().tappable( function(event){
						event.preventDefault();
						event.stopPropagation();
						
					   pageUrl = $(this).attr('href');
					   // destroy map elements
					   self.destroyMap();
					   $('.page[role=temp]').load( pageUrl, function(){
							clearTimeout(actu_timeout);
							//
							// Execution des méthodes associés à chaque page
							//
							if( pageUrl == "actu.html" ){
								$('#loading').show();
								self.callback_actu();										
							}
							else if( pageUrl == "maps.html" ){
								setMarqueur('plan');
								self.callback_maps();										
							}
							
							else if( pageUrl == "pre_maps.html" ){
								setMarqueur('plan');
								self.callback_maps();										
							}
							
							else if( pageUrl == "travaux.html" ){
								self.callback_travaux();										
							}
							else if( pageUrl == "allomairie.html" ){
								$('#loading').show();
								setMarqueur('allomairie');
								self.callback_allomairie();										
							}
							else if( pageUrl == "service_public.html" ){
								$('#loading').show();
								self.callback_service_public();										
							}
							else if( pageUrl == "tourisme.html" ){
								$('#loading').show();
								self.callback_tourisme();										
							}
							else if( pageUrl == "commerce.html" ){
								$('#loading').show();
								self.callback_commerce();										
							}
							else if( pageUrl == "pre_deplacement.html" ){
								$('#loading').show();
								self.callback_deplacement();										
							}
							else if( pageUrl == "urgence.html" ){
								$('#loading').show();
								self.callback_urgence();										
							}
							else if( pageUrl == "credits.html" ){
								$('#loading').show();
								self.callback_credits();
							}
							else if( pageUrl == "meteo.html" ){
								$('#loading').show();
								getMeteo(1);
								self.next_page();
							}
							else if( pageUrl == "bhns.html" )
								self.next_page();
							
					   });
					   return false;
				 });
			}
		});
	}
	
	navigation.prototype.load_a_new_page = function(pageUrl, callback, go_next_page){
		var self = this;
		$('.page[role=temp]').html('');
		//$('.page[role=main] > div').clone(1).appendTo('.page[role=temp]');
		
		$('.page[role=temp]').load( pageUrl, function(){
			if(callback)
				setTimeout( function(){ callback(); }, 100);
			if( go_next_page )
				self.next_page();
		});
		return false;
	}
	
	navigation.prototype.set_back_button = function(callback){
		if( callback )
			callback_function = function(){ callback(); }
		else
			callback_function = function(){ nav_object.prev_page(); }
	}
	
	navigation.prototype.set_home_button = function(){
		var self = this;
		$('.home_button, .home_button_loading').each( function(){ 
			$(this).on('touchstart', function(){ self.go_home(); return false; });
		});
		
	}
	
	navigation.prototype.go_home = function(){
		$('body, .page').removeClass('scrollable');
		if( actu_timeout )
			clearTimeout(actu_timeout);
		$('.page[role=main]').load('home.html', function(){ 
			self.init();
			shortcut_dep();
			load_actus_chaudes();
		});
		
		self.destroyMap();
		
		$('#loading').hide();
		
		if( user_position_interval ){
			clearInterval(user_position_interval);
			user_position_interval = null;
		}
		tab_page = new Array();
		setTimeout( function(){ self.set_back_button( function(){ navigator.app.exitApp(); }); }, 500);
		
		/*$('.page[role=temp], .page[role=next]').hide();
		$('.page[role=current]').addClass('slideOut');
		$('#loading').hide();
		setTimeout(function(){
				$('.page[role=temp], .page[role=current], .page[role=next], .page[role=temp]')
					.hide()
					.html('');
				$('.page[role=current]').removeClass('slideOut');
				//load_actus_chaudes();
			},700);	*/
		
		 
	}
	
	navigation.prototype.next_page = function(){
		var self = this;
		$('body, .page').removeClass('scrollable');
		tab_page.push( $('.page[role=main] > div').clone(1) );
		$('.page[role=main]').html('');
		$('.page[role=temp] > div').clone(1).appendTo('.page[role=main]').end();
		$('.page[role=temp]').html('');
		//$('#loading').hide();
		//$('.page[role=next]').show().addClass('slideIn');
		/*setTimeout(function(){
				//$('.page[role=current]').html( $('.page[role=next]').html() ).show();
				$('.page[role=current]').html('');
				$('.page[role=next] > div').clone(true).appendTo('.page[role=current]').end();
				$('.page[role=current]').show();
				setTimeout(function(){
					$('.page[role=next]').hide();
					$('.page[role=next]').html('')
					$('.page[role=next]').removeClass('slideIn');
					
				},100);
				
			},800);*/
		
		self.set_back_button();
		self.set_home_button();
	}
	
	navigation.prototype.prev_page = function(){
		
		//cancel image downloads
		if(window.stop !== undefined){
			 window.stop();
		}
		else if(document.execCommand !== undefined){
			 document.execCommand("Stop", false);
		}
		
		$('body, .page').removeClass('scrollable');
		self.destroyMap();
		//$('.page[role=previous]').html('');
		if(tab_page.length-1 <= 0)
			this.go_home();
		else{
			var myhtml = tab_page[tab_page.length-1];
			$('.page[role=main]').html('');
			myhtml.clone(1).appendTo('.page[role=main]');
			tab_page.pop();
			/*$('.page[role=previous]').show();
			$('.page[role=current]').addClass('slideOut');
			setTimeout(function(){
				//$('.page[role=current]').html( myhtml );
				$('.page[role=current]').html('');
				myhtml.clone(1).appendTo('.page[role=current]');
				$('.page[role=previous]').hide();
				$('.page[role=previous]').html('');
				$('.page[role=current]').removeClass('slideOut');
				self.set_back_button();
				self.set_home_button();
				tab_page.pop();
			},700);
			*/
			
			self.set_back_button();
			self.set_home_button();
		}
	}
	
	/*navigation.prototype.go_home = function(){
		$('.page[role=current]').addClass('slideOut').show();
		setTimeout(function(){
			$('.page[role=current]').html( $(this).html() );
			$('.page[role=current]').hide();
			$('.page[role=current]').html('');
			$('.page[role=current]').removeClass('slideOut');
		},1000);
	}*/
	
	navigation.prototype.destroyMap = function(){
		map = null;
		$('#map_canvas').html('');
		$('#service_public_fiche_map').html('');
	}
	
	// Callback actu
	navigation.prototype.callback_actu = function(){
		this.next_page();		
		setTimeout(function(){news = $('body').news(); }, 1000);
	}
	
	
	// Callback credits
	navigation.prototype.callback_credits = function(){
		this.next_page();		
		setTimeout(function(){credits = $('body').credits(); }, 1000);
	}
	
	
	// Callback service public
	navigation.prototype.callback_service_public = function(){
		this.next_page();
		setTimeout(function(){ var service_public = $('body').service_public(); }, 1000);
	}
	
	// Callback tourisme
	navigation.prototype.callback_tourisme = function(){
		this.next_page();
		setTimeout(function(){ var tourisme = $('body').tourisme(); }, 1000);
	}
	
	// Callback commerce
	navigation.prototype.callback_commerce = function(){
		this.next_page();
		setTimeout(function(){ var commerce = $('body').commerce(); }, 1000);
	}
	
	// Callback urgence
	navigation.prototype.callback_urgence = function(){
		this.next_page();
		setTimeout(function(){ var urgence = $('body').urgence(); }, 1000);
	}
	
	// Callback plan de la ville
	navigation.prototype.callback_maps = function(){
		this.next_page();
		setTimeout( function(){ $('#loading').show(); $('body').mapIt('SIMPLE_INIT'); }, 1000);
	}
	
	// Callback déplacement
	navigation.prototype.callback_deplacement = function(){
		
		
	}
	
	// Callback travaux
	navigation.prototype.callback_travaux = function(){
		this.next_page();
		setTimeout( function(){ $('body').works(); }, 2000);
	}
	
	// Callback allomairie = vider les formulaire + image
	navigation.prototype.callback_allomairie = function(){
		this.next_page();
		setTimeout( function(){
			userPosition();
			$('#allomairie #myImage').attr('src','');
			$('#loading').hide();
		 }, 1000);
	}
	
	
	// Changement des div, sauvegarde du précédent div dans le role temp
	navigation.prototype.div_selector = function(){
		$('.page[role=current]').addClass('slideIn').show();
		$('#loading').hide();
	}
	
	function navigation() {
		self = this;
		this.init();
	}
	
	$.fn.navigation = function () {
		return new navigation($(this));
	}
			
})( jQuery );

(function($) {
    $.eventReport = function(selector, root) {
        var s = [];
        $(selector || '*', root).andSelf().each(function() {
            var e = $.data(this, 'events');
            if(!e) return;
            s.push(this.tagName);
            if(this.id) s.push('#', this.id);
            if(this.className) s.push('.', this.className);
            for(var p in e) s.push('\n', p);
            s.push('\n\n');
        });
        return s.join('');
    }
    $.fn.eventReport = function(selector) {
        return $.eventReport(selector, this);
    }
})(jQuery);
						

(function($) {
	var self;
	var swipe_current_cat = 0;
	var current_scroll = 0;
	
	news.prototype.activeMenu = function(){
		/*$("#menu_actualites").touchwipe({
			 wipeLeft: function() { self.processingRoutine("left"); },
			 wipeRight: function() { self.processingRoutine("right"); },
			 preventDefaultEvents: true
		});*/
		
		$("#menu_actualites li").tappable( function(){
			$("#menu_actualites li").removeClass('active');
			$(this).addClass('active');
			if($(this).hasClass('actu1')){
				$('#loading').show();
				swipe_current_cat = 0;
				self.getNewsList(swipe_current_cat);
				/*if( $(this).hasClass('left') )
					self.processingRoutine("right");		 
				else if( $(this).hasClass('right') )
					self.processingRoutine("left");*/
			}
			else if($(this).hasClass('actu2')){
				$('#loading').show();
				swipe_current_cat = 2;
				self.getNewsList(swipe_current_cat);
				/*if( $(this).hasClass('left') )
					self.processingRoutine("right");		 
				else if( $(this).hasClass('right') )
					self.processingRoutine("left");*/
			}
			else if($(this).hasClass('actu3')){
				$('#loading').show();
				swipe_current_cat = 3;
				self.getNewsList(swipe_current_cat);
				/*if( $(this).hasClass('left') )
					self.processingRoutine("right");		 
				else if( $(this).hasClass('right') )
					self.processingRoutine("left");*/
			}
			else if($(this).hasClass('actu4')){
				$('#loading').show();
				swipe_current_cat = 4;
				self.getNewsList(swipe_current_cat);
				/*if( $(this).hasClass('left') )
					self.processingRoutine("right");		 
				else if( $(this).hasClass('right') )
					self.processingRoutine("left");*/
			}
			else if($(this).hasClass('actu5')){
				$('#loading').show();
				swipe_current_cat = 5;
				self.getNewsList(swipe_current_cat);
				/*if( $(this).hasClass('left') )
					self.processingRoutine("right");		 
				else if( $(this).hasClass('right') )
					self.processingRoutine("left");*/
			}
			
			 	
		});
		
	}
	
	news.prototype.processingRoutine = function(swipeDirection) {
		if ( swipeDirection == 'left' ) {
			$('#menu_actualites #right_window ul, #menu_actualites #left_window ul').animate({ left : '-=60px', useTranslate3d:true, leaveTransforms:true }, 200);
			$('#menu_actualites #center_window ul').animate({ left : '-=80px', useTranslate3d:true, leaveTransforms:true }, 200, function(){
				if( swipe_current_cat == 0 ){
					$('#menu_actualites #center_window ul').css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
					$('#menu_actualites #left_window ul').css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
					$('#menu_actualites #right_window ul').css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
				}
				self.getNewsList(swipe_current_cat);
			});
			
		} else if ( swipeDirection == 'right' ) {
			$('#menu_actualites #right_window ul, #menu_actualites #left_window ul').animate({ left : '+=60px', useTranslate3d:true, leaveTransforms:true }, 200);
			$('#menu_actualites #center_window ul').animate({ left : '+=80px', useTranslate3d:true, leaveTransforms:true  },200,function(){ 
				if( swipe_current_cat == 0 ){
					$('#menu_actualites #center_window ul').css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
					$('#menu_actualites #left_window ul').css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
					$('#menu_actualites #right_window ul').css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
				}
				self.getNewsList(swipe_current_cat);
			});
			
		} 
	}
		
	news.prototype.setZoom = function(){
		$('#actualite_fiche_texte img').each( function(){
			var SRC = $(this).attr('src');													   
			$(this).tappable( function(){
				nav_object.load_a_new_page('actu_details_zoom.html', function(){
					$('<img />').attr('src', SRC).appendTo('#actualite_fiche_contenu_zoom');
					setTimeout( function(){
						nav_object.set_back_button(function(){
							nav_object.prev_page();
							nav_object.set_back_button(function(){ nav_object.prev_page(); setTimeout( function(){ self.activeMenu(); $(window).scrollTop(current_scroll) }, 200);	});										 						});					 
					},500);
				}, 1);
			});
		});
	}
	
	news.prototype.getNewsList = function(id_categorie) {
		var self = this;
		// les actus sont renvoyés sous la forme
		$('#actualites .content').html('');
		$.ajax({ url: ajax_url, dataType: 'json',
			data: "table=actualite&id_categorie=" + id_categorie,
			success: function(data){
				var ul_container = '';
				if( data && data.length > 0 ){
					$.each(data, function(i, item) {
						ul_container = $('<ul class="liste_actualites"></ul>');
						
						
						
						ul_container.append('<li class="date">' + item.date + '</li>');
						
						$.each(item.actus, function(i, news) {
							
							var origine = 'Chalon sur Sa&ocirc;ne';
							if( news.origine && news.origine == "G" )
								origine = "Le Grand Chalon";
							
							var html = '<small>' + origine + '</small><h2>' + news.nom + '</h2>';
							html += '<img src="' + news.photo1 + '" />';
							html += '<p>';
							html += news.accroche + '</p><div class="clear"></div>';
							var elem = $('<li id="actu' +  news.id + '" ></li>').html(html)
									.tappable( function(){  
										$('#loading').show();
										self.getNews(news.id,0); 
									});
							ul_container.append(elem);
						});
						$('#actualites .content').append(ul_container);
						
						$('#loading').hide();
						
					});
				}else
					$('#loading').hide();
			}
		});
		
	}
	
	news.prototype.getNews = function(id_actualite, from_home) {
		current_scroll = $(window).scrollTop();
		$.ajax({ url: ajax_url, dataType: 'json',
			data: "table=actualite&id_actualite=" + id_actualite,
			success: function(data){
				// chargement du template
				nav_object.load_a_new_page('actu_details.html', function(){ 
					$(window).scrollTop(0);
					// traitement de données
					if(data.dateDeb) $('#actualite_fiche_contenu .date').html(data.dateDeb);
					if(data.nom) $('#actualite_fiche_contenu h2.titre').html(data.nom);
					if(data.accroche) $('#actualite_fiche_contenu h3.accroche').html(data.accroche);
					if(data.descr) $('#actualite_fiche_texte').html(data.descr);
					if(data.photo1) $('#actualite_fiche_contenu .imgbig').html('<img src="' + data.photo1 + '" />');
					self.setZoom();
					
					/*$('#actualite_fiche_texte a, #actualite_fiche_contenu .accroche a').each( function(){
						console.log( $(this) );
						var href = $(this).attr('href');
						$(this).off().on('click', function(){ loadURL(href); return false; });	 
					});*/
					
					setTimeout( function(){
						if( !from_home ){
							nav_object.set_back_button(function(){
								nav_object.prev_page();
								setTimeout( function(){ self.activeMenu(); $(window).scrollTop(current_scroll) }, 200);											 
							});
						}
					}, 500);
					
					$('#actualite_fiche .share_twitter').on('click', function(){
						openExternalLink('http://twitter.com/home?status=' + encodeURI(data.nom + ' ' + data.lien));
					});
					$('#actualite_fiche .share_facebook').on('click', function(){
						openExternalLink('http://facebook.com/sharer.php?u=' + encodeURI (data.lien) + '&t=' + encodeURI (data.nom));
					});
					
					$('#actualite_fiche_texte a, .accroche a').each( function(){
						var href = $(this).attr('href');
						//$(this).on('click', function(){ openExternalLink(href); return false; });
						$(this).attr('href', "javascript:openExternalLink('" + href + "')");
						console.log('click');
						
					});
					
					setMarqueur('actualites::' + encodeURI(data.nom));
					
					$('#loading').hide();
				}, 1);
			}
		});
	}
	
	news.prototype.setMenu = function(){
		/*var w = $(window).width();
		var left_ml = (w/2)-120-50;
		$('#menu_actualites #left_window').css('margin-left',left_ml + 'px');
		var right_ml = (w/2)+50;
		$('#menu_actualites #right_window').css('margin-left',right_ml + 'px');
		var center_ml = (w/2)-50;
		$('#menu_actualites #center_window').css('margin-left',center_ml + 'px');
		$('#menu_actualites #center_window ul').css('margin-left','-550px');
		
		$('#menu_actualites #left_window ul').css('margin-left','-300px');
		$('#menu_actualites #right_window ul').css('margin-left','-480px');
		$('#menu_actualites').show();*/
		self.activeMenu();
		//ontouchstart="touchStart(event,'menu_actualites');"  ontouchend="touchEnd(event);" ontouchmove="touchMove(event);" ontouchcancel="touchCancel(event);"
	}
	
	
	function news(id_news) {
		self = this;
		setMarqueur('actualites');
		if( id_news ){
			self.getNews(id_news, 1);
		}
		else{
			setTimeout(function(){ self.setMenu() }, 1000);
			this.getNewsList(0);
			$('#actualites .home_button').on(TRIGGER_EVENT, function(){ $('#menu_actualites').hide() });
		}
		
	}
	
	$.fn.news = function (id_news) {
		return new news(id_news);
	}
			
})( jQuery );
						

/*
$.ajax({ url: "http://appmobile.chalon.fr/notif/android.php", 
				dataType: 'json',
				type: "POST",
				data: "regid=" + gApp.gcmregid,
				timeout:5000
		});
gApp.DeviceReady = true;
			window.plugins.GCM.register("118091387934", GCM_Event, GCM_Success, GCM_Fail );
*/

gApp = new Array();

gApp.deviceready = false;
gApp.gcmregid = '';

window.onbeforeunload  =  function(e) {

    if ( gApp.gcmregid.length > 0 )
    {
      // The same routines are called for success/fail on the unregister. You can make them unique if you like
      window.GCM.unregister( GCM_Success, GCM_Fail );      // close the GCM

    }
};


document.addEventListener('deviceready', function() {
  // This is the Cordova deviceready event. Once this is called Cordova is available to be used
  $("#app-status-ul").append('<li>deviceready event received</li>' );

  $("#app-status-ul").append('<li>calling GCMRegistrar.register, register our Sender ID with Google</li>' );


  gApp.DeviceReady = true;

  // Some Unique stuff here,
  // The first Parm is your Google email address that you were authorized to use GCM with
  // the Event Processing rountine (2nd parm) we pass in the String name
  // not a pointer to the routine, under the covers a JavaScript call is made so the name is used
  // to generate the function name to call. I didn't know how to call a JavaScript routine from Java
  // The last two parms are used by Cordova, they are the callback routines if the call is successful or fails
  //
  // CHANGE: your_app_id
  // TO: what ever your GCM authorized senderId is
  //
  window.plugins.GCM.register("118091387934", "GCM_Event", GCM_Success, GCM_Fail );

}, false );


function
GCM_Event(e)
{
  $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');


  switch( e.event )
  {
  case 'registered':
    // the definition of the e variable is json return defined in GCMReceiver.java
    // In my case on registered I have EVENT and REGID defined
    gApp.gcmregid = e.regid;
    if ( gApp.gcmregid.length > 0 )
    {
      $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
      $.ajax({ url: "http://appmobile.chalon.fr/notif/android.php", 
	  //$.ajax({ url: "http://mhweb.gandi.misterharry.local/appmh.chalon.fr/validation/www/notif/android.php",
				dataType: 'json',
				type: "POST",
				data: "regid=" + gApp.gcmregid,
				timeout:10000
		});

    }

    break

  case 'message':
    // the definition of the e variable is json return defined in GCMIntentService.java
    // In my case on registered I have EVENT, MSG and MSGCNT defined

    // You will NOT receive any messages unless you build a HOST server application to send
    // Messages to you, This is just here to show you how it might work
    $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.message + '</li>');

    $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.msgcnt + '</li>');


    break;


  case 'error':

    $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');

    break;



  default:
    $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');

    break;
  }
}

function
GCM_Success(e)
{
  $("#app-status-ul").append('<li>GCM_Success -> We have successfully registered and called the GCM plugin, waiting for GCM_Event:registered -> REGID back from Google</li>');

}

function
GCM_Fail(e)
{
  $("#app-status-ul").append('<li>GCM_Fail -> GCM plugin failed to register</li>');

  $("#app-status-ul").append('<li>GCM_Fail -> ' + e.msg + '</li>');

}


(function($) {
	var self;
	var map;
	var parent_categorie = new Array();
	var latitude;
	var longitude;
	var directionsDisplay;
	var my_latitude;
	var my_longitude;
	
	var user_position_marker; 
	var user_coords;
	var direction;
	var polyline = new google.maps.Polyline();
	var parent_cat = 0;
	var current_cat = 0;
	var id_current_poi;
	var current_categorie_name;
	
	commerce.prototype.ajaxQuery = function(id_categorie, firstStart, searchValue){
		
		
		$(window).scrollTop(0);
		//cancel image downloads
		if(window.stop !== undefined){
			 window.stop();
		}
		else if(document.execCommand !== undefined){
			 document.execCommand("Stop", false);
		}
		$('.commerce_liste').html('');
		var query = "table=commerce&id_categorie=" + id_categorie;
		if( searchValue ){
			query = "table=commerce&recherche=" + searchValue;
			$('#commerce h1').html('Recherche');	
			current_categorie_name = 'Recherche';
			self.setTitleHeight('#commerce h1');
		}
		
		/** hack bon plan + nouvelles adresses **/
			if( id_categorie == 'bp' )
				query = "table=commerce&id_categorie=&bp=1";
			else if( id_categorie == "flash" || 
				id_categorie == "vp" || 
				id_categorie == "flash" || 
				id_categorie == "promo" || 
				id_categorie == "brad" || 
				id_categorie == "anim" || 
				id_categorie == "porte" || 
				id_categorie == "ouv21" ||
				id_categorie == "ouv12" ||
				id_categorie == "fete" )
				query = "table=commerce&id_categorie=" + id_categorie + "&bp=1";
			else if( id_categorie == 'nouveau' )
				query = "table=commerce&id_categorie=&nouveau=1";
		/*****/
		
		$.ajax({ url: ajax_url, dataType: 'json',
			data: query,
			success: function(data){
				if(data.points.length > 0){
					var liste_coord = '';
					arrayPoints = new Array();
					
					/** hack bon plan + nouvelles adresses **/
					if( id_categorie == 0 && !searchValue){
						var elem = $('<li></li>').html('Bons plans');
						elem.tappable(function(){ self.getElementInCategory('bp',0);  setMarqueur('commerce::Bons plans'); });
						elem.appendTo('.commerce_liste');
						var elem = $('<li></li>').html('Nouvelles adresses');
						elem.tappable(function(){ self.getElementInCategory('nouveau',0);  setMarqueur('commerce::Nouvelles adresses'); });
						elem.appendTo('.commerce_liste');
					}
					/*****/
					
					$.each(data.points, function(i, item) {
						
						if( item.type == "categorie" ){
							var elem = $('<li></li>').html(item.nom);
							elem.tappable(function(){ self.getElementInCategory(item.id_categorie,0);  setMarqueur('commerce::' + item.nom); });
							elem.appendTo('.commerce_liste');
						}else {
							if( typeof item.lat == "undefined" )
								item.lat = '46.780556';
							if( typeof item.lng == "undefined" )
								item.lng = '4.852778';
							
							if( item.lat && item.lng )
								liste_coord += item.lat + ',' + item.lng + '|';
							arrayPoints.push(item);
						}
							
					});
					
					
					if( liste_coord )
						self.getDrivingDistance(liste_coord,arrayPoints);
					
					if( id_categorie ){
						
						current_cat = id_categorie;
						parent_cat = parent_categorie[parent_categorie.length-2];
						
						/*** BACK BUTTON ***/
						if( parent_cat ) 
							nav_object.set_back_button( function(){ parent_categorie.pop(); parent_categorie.pop(); self.getElementInCategory(parent_cat,0); });
						else{
							nav_object.set_back_button( function(){ self.getElementInCategory(0); nav_object.set_back_button(function(){nav_object.go_home()}); });
							parent_cat = 0;
						}
						
						
						//$('#commerce .back_button_noauto').show();
						if( data.courant.nom ){
							$('#commerce h1').html(data.courant.nom);	
							current_categorie_name = data.courant.nom;
							self.setTitleHeight('#commerce h1');
						}else
							$('#commerce h1').text('Commerces');	
								
						self.setTitleHeight('#commerce h1');
						//$('.commerce_liste').animate({ left : '-=480px', useTranslate3d:true, leaveTransforms:false }, 500, "linear", function(){ });
						//$('.commerce_liste').css('margin-top' , '0%' );
					}else
						$('#commerce .back_button_noauto').hide();
					
					// Activation du boutton "Carte"
					$('#show_map').off().tappable( function(){ id_current_poi=0; self.showMap(data.points); });
					
					if( !id_categorie && !firstStart && !liste_coord )
						$('.commerce_liste').animate({ left : '-=480px', useTranslate3d:true, leaveTransforms:false }, 500, "linear", function(){ $('#loading').hide(); });
					else if( id_categorie && !liste_coord )
						$('.commerce_liste').animate({ left : '-=480px', useTranslate3d:true, leaveTransforms:false }, 500, "linear", function(){ $('#loading').hide(); });
					if( firstStart )
						$('#loading').hide();				
				}else{
					var elem = $('<li></li>').html('Aucun r&eacute;sultat');
					elem.css('background-image','none');
					elem.appendTo('.commerce_liste');
					$('.commerce_liste').animate({ left : '-=480px', useTranslate3d:true, leaveTransforms:false }, 500, "linear", function(){ $('#loading').hide(); });
					nav_object.set_back_button( function(){ parent_categorie.pop(); parent_categorie.pop(); self.getElementInCategory(parent_cat,0); });
				}
				
			}
		});
	}
	
	
	commerce.prototype.setListe = function(distances, points){
		if( distances.status == "OK" ){
			for(z=0; z < points.length; z++){
				var d = '';
				if( distances.rows[0].elements[z] ){
					if( distances.rows[0].elements[z].distance )
						d = distances.rows[0].elements[z].distance.value.toString();	
				}else
					d = '0 km';
				
				var reg=new RegExp(" km", "g");
				points[z].distance = d.replace(reg,'');
				var reg=new RegExp(",", "g");
				points[z].distance = points[z].distance.replace(reg,'.');
			};
			points.sort(sort_by('distance', false, parseFloat));
		}
		$.each(points, function(i, item) {
			var elem = $('<li></li>').html(item.nom);
			var vignette = '';
			if( item.vignette && item.vignette !== "null" && item.vignette !== '' && item.vignette !== null ){
				vignette = "background:#000 url('" + item.vignette + "') center center no-repeat; background-size:100px auto";
			}
			
			var distance = '';
			if( typeof item.descr == "undefined" )
				item.descr = '';
			if( item.distance < 1000 )
			   distance = item.distance + ' m';
			else
			   distance = Math.round(item.distance/1000) + ' km';
			
			elem.html('<p class="vign" style="' + vignette + '"> </p><p><span>' + item.nom + '</span><br />' + item.descr.substr(0,80) + '...<br /><em>' + distance + '</em></p><p class="clear"></p>');
			
			elem.addClass('point');
			elem.tappable( function(){ self.showCommerce(item.id_point); });
			$('.button_display').show();
			elem.appendTo('.commerce_liste');
		});
		$('.commerce_liste').animate({ left : '-=480px', useTranslate3d:true, leaveTransforms:false }, 500, "ease", function(){ $('#loading').hide(); });
	}
	
	
	commerce.prototype.getDrivingDistance = function(liste, array){
		var distance = 0;
		if( user_lat && user_lng ){
			$.getJSON("http://maps.googleapis.com/maps/api/distancematrix/json?origins=" + user_lat + ',' + user_lng + "&destinations=" + liste + "&mode=driving&language=fr-FR&sensor=true", 
				function(data){
					self.setListe(data, array);
				}
			);
		}
		return distance;
	}
	
	commerce.prototype.getElementInCategory = function(id_categorie, firstStart){
		$('#loading').show();
		$('#commerce h1').text('');
		$(window).scrollTop(0);
		$('.button_display').hide();
		if( id_categorie ){
			$('.commerce_liste').animate({ left:'+=480px', useTranslate3d:true, leaveTransforms:true }, 500, "linear", function(){
				self.ajaxQuery(id_categorie,0,0);
				parent_categorie.push(id_categorie);				
			});
			/*$('.commerce_liste').addClass('slideDown');
			setTimeout(function(){
				self.ajaxQuery(id_categorie,0,0);
				parent_categorie.push(id_categorie);
				$('.commerce_liste').removeClass('slideDown');
			}, 600);*/

		}else{
			parent_categorie = [0];
			if( firstStart )
				self.ajaxQuery(0,1,0);
			else{
				$('.commerce_liste').animate({ left:'+=480px', useTranslate3d:true, leaveTransforms:true}, 500, "linear", function(){
					self.ajaxQuery(id_categorie,0,0);
					parent_categorie.push(id_categorie);				
				});	
			}
			$('#commerce h1').text('Commerces');	
			self.setTitleHeight('#commerce h1');
		}
		
		if( firstStart ){
			$('#commerce_liste').css('margin-top','50px');
		}
	}
	
	
	commerce.prototype.setPOIOnMap = function(points){
		 $('#loading').hide();
		 markersArray = [];
		 infoBoxArray = [];
		 $('#map_canvas').html(''); 
		 var myLatlng = new google.maps.LatLng(46.780556, 4.852778);
		 if( user_lat && user_lng )
			   var myLatlng = new google.maps.LatLng(user_lat, user_lng);
		 var myOptions = {
		  zoom: 14,
		  center: myLatlng,
		  mapTypeId: google.maps.MapTypeId.ROADMAP,
		  zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.TOP_LEFT
			}
		}
		 
		 $('#map_canvas').css('width', '100%');
		 map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		
		 self.setUserPosition();
		 user_position_interval = setInterval( function(){ self.updateUserPosition() }, 5000 ); 
		
		$.each(points, function(i, item) {
			  var icon = new google.maps.MarkerImage("images/marker.png");
			  var coords = new google.maps.LatLng(item.lat,item.lng);
			  var marker = new google.maps.Marker({ position: coords, title: item.nom, icon : icon });
			  marker.setMap(map);
			  polyline.setMap(null);
			  
			  self.closeInfoBox();
			  
			  var contentString =  '<div style="text-align:left; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#e0e0e0) ); border-radius:5px; border:1px solid #CCC; border-top:0; padding:10px; margin-top:10px;">'+
			  '<h2 style="font-size:16px; color:#333; font-weight:bold; margin-bottom:10px;">' + item.nom + '</h2>'+		  
			  '<a href="javascript:commerce_object.showCommerce(' + item.id_point + ',1)" class="commerce-more">Plus d\'infos</a>' +
			  '<p style="clear:both;"></p></div>';
			  
			  var myOptions = {
					 content: contentString
					,disableAutoPan: false
					,pixelOffset: new google.maps.Size(-100, 0)
					,maxWidth: 200
					,zIndex: null
					,boxStyle: { background: "url('images/maps_tooltip_top.png') top center no-repeat", width:"200px" }
					,closeBoxMargin: "12px 2px 2px 2px"
					,closeBoxURL: "images/search_reset.png"
					,infoBoxClearance: new google.maps.Size(50, 50)
					,isHidden: false
					,pane: "floatPane"
					,enableEventPropagation: false
				};
			  var ib = new InfoBox(myOptions);
			  infoBoxArray.push(ib);
			  
			  if( id_current_poi == item.id_point ){
			  	map.panTo(coords);
			  	ib.open(map, marker);
			  }
			  
			  google.maps.event.addListener(marker, "mouseup", function() { self.closeInfoBox(); ib.open(map, marker); });		  
			 
		});
	}
	
	commerce.prototype.showMap = function(points){
		nav_object.load_a_new_page('small_maps.html', function(){
			setTimeout( function(){ 
				self.setPOIOnMap(points);	
			}, 2000);
		},1 );
	}
	
	commerce.prototype.closeInfoBox = function(){
		if (is_array(infoBoxArray) && infoBoxArray.length > 0) {
			for (i in infoBoxArray) {
				if( typeof(infoBoxArray[i]) == "object")
					infoBoxArray[i].close();
			}
		}
	}
	
	commerce.prototype.removeAllMarkers = function(){
		  if (markersArray) {
			  for (i in markersArray) {
				  markersArray.setMap(null);
			  }
			  markersArray.length = 0;
		  }
	}
	
	commerce.prototype.removeCategoryMarkers = function(id_category){
		  if (markersArray[id_category]) {
			  for (i in markersArray[id_category]) {
				  markersArray[id_category][i].setMap(null);
			  }
			  markersArray[id_category].length = 0;
		  }
	}
	
	commerce.prototype.showMarkers = function(id_category) {
		  if (markersArray[id_category]) {
			  for (i in markersArray[id_category]) {
				  markersArray[id_category][i].setMap(map);
			  }
		  }
	}
	
	commerce.prototype.updateUserPosition = function(){
		userPosition();
		var latlng = new google.maps.LatLng(user_lat, user_lng);
    	if( user_position_marker && user_lat )
			user_position_marker.setPosition(latlng);	
	}
	
	commerce.prototype.setUserPosition = function(){
		  var coords = new google.maps.LatLng(user_lat,user_lng);
		  var icon = new google.maps.MarkerImage("images/marker_bleu.png");
		  user_position_marker = new google.maps.Marker({ position: coords, icon : icon });
		  user_position_marker.setMap(map);
	}
	
	
	
	
	
	
	commerce.prototype.searchIt = function(value){
		$(window).scrollTop(0);
		$('#loading').show();
		$('#search_results_mention').show();
		$.ajax({ url: ajax_url, dataType: 'json',
			data: "table=commerce&value=" + value,
			success: function(data){
				$.each(data, function(i, item) {
					var elem = $('<li></li>').html(item.nom)
					.tappable( function(){ self.showCommerces(item.id_point); });
					elem.appendTo('#commerce_categories');
				});
				$('#loading').hide();
			}
		});
	}
	
	commerce.prototype.showCommerce = function(id_point, fromMap){
		$(window).scrollTop(0);
		$('#loading').show();
		nav_object.load_a_new_page('fiche_commerce.html', function(){ 
			
			$('#commerce_categories').html();
			$.ajax({ url: ajax_url, dataType: 'json',
				data: "table=commerce&id_point=" + id_point,
				success: function(data){
					var item = data.point;
					id_current_poi = item.id_point;
					
					$('#commerce_details .header h1').text(current_categorie_name);
					self.setTitleHeight();
					
					
					$('#commerce_description .description').html(item.descr);
					$('#commerce_description h2').text(item.nom);
					var addr = item.adresse + ' ' + item.cp + ' ' + item.ville;
					//$('#commerce_description .adresse').html(addr);
					
					var coord = '';
					if(addr) coord += '<span>Adresse : </span> ' + addr + '<br />';
					if(item.telephone) coord += '<span>T&eacute;l : </span> <a href="tel:' + item.telephone + '">' + item.telephone + '</a><br />';
					if(item.mobile) coord += '<span>Mobile : </span> <a href="tel:' + item.mobile + '">' + item.mobile + '</a><br />';
					if(item.fax) coord += '<span>Fax</span> : <a href="' + item.fax + '">' + item.fax + '</a><br />';
					if(item.web) coord += '<span>&bull;</span> <a href="javascript:void(0)" onclick="openExternalLink(\'' + item.web + '\');" rel="external" style="text-decoration:none">Acc&eacute;der au site</a><br />';
					if(item.email) coord += '<span>&bull;</span> <a href="mailto:' + item.email + '" style="text-decoration:none">Envoyer un email</a><br />';
					
					$('#commerce_description .coordonnees > div').html(coord);
					
					// TYPE 
					// 0 : all
					// 1 : hebergement
					// 2 ; restauration
					var details = '';
					if( item.type == '1' ){
						if( item.prix_chambre_min && item.prix_chambre_max ) details += '<span>Prix des chambres de</span> ' + item.prix_chambre_min + '&euro; <span>&agrave;</span> ' + item.prix_chambre_max + '&euro;<br />';
						if( item.fermeture ) details += '<span>Date annuelle de fermeture :</span> ' + item.fermeture + '<br />';
						if( item.etoiles ) details += '<span>Nombre d\'&eacute;toiles :</span> ' + item.etoiles + '<br />';
						details += '<span>Animaux accept&eacute;s :</span> ';
						if( item.animaux == '1' ) details += 'oui <br />';
						else details += 'non <br />';
						details += '<span>Parking :</span> ';
						if(item.parking == '1' ) details += 'oui <br />';
						else details += 'non <br />';
						details += '<span>Restaurant :</span>';
						if(item.restaurant == '1') details += 'oui <br />';
						else  details += 'non <br />';
						$('#commerce_description .details > div').html(details);
					}
					else if( item.type == '2' ){
						if( item.menu_min && item.menu_max ) details += '<span>Menu : </span> ' + item.menu_min + '&euro; &agrave; ' + item.menu_max + '&euro; <br />';
						if( item.carte_min && item.carte_max ) details += '<span>Carte : </span> ' + item.carte_min + '&euro; &agrave; ' + item.carte_max + '&euro; <br />';
						if( item.fermeture ) details += '<span>Jours de fermeture : </span> ' + item.fermeture + '<br />';
						if( item.horaires ) details += '<span>Horaire de dernier service : </span> ' + item.horaires + '<br />';
						$('#commerce_description .details > div').html(details);
					}
					else{
						if( item.horaires ) details += '<span>Horaires : </span>' + item.horaires + '<br />';
						if( item.marques ) details += '<span>Marques : </span>' + item.marques + '<br />';
						$('#commerce_description .details > div').html(details);
					}
					
					self.getDistance(item.lat, item.lng);
					
					self.setGallery( item.photos);
					
					$('.icon-directions-drive').off().tappable( function(){ 
						$('#loading').show();
						$('body').mapIt(item.id_point, item.lat, item.lng, 1, function(){
							nav_object.prev_page(); 
							setTimeout(function(){ self.setMap(item.lat, item.lng); $('#loading').hide(); }, 1000);
							nav_object.set_back_button( function(){ nav_object.prev_page(); parent_categorie.pop(); self.getElementInCategory(current_cat,0); } );
						});
					});
					$('.icon-directions-walk').off().tappable( function(){ 
						$('#loading').show();
						$('body').mapIt(item.id_point, item.lat, item.lng, 0, function(){
							nav_object.prev_page(); 
							setTimeout(function(){ self.setMap(item.lat, item.lng); $('#loading').hide(); }, 1000);
							nav_object.set_back_button( function(){ nav_object.prev_page(); parent_categorie.pop(); self.getElementInCategory(current_cat,0); } );
						});
					});
					
					/*--- Bon Plan ---*/
					if( item.bp_titre && item.bp_descr && item.bp_dateFin && item.bp_categ ){
						if( item.bp_categ == "vp" ) $('.bon_plan h3.type').text("Vente privÃ©e");
						else if( item.bp_categ == "flash" ) $('.bon_plan h3.type').text("Vente flash");
						else if( item.bp_categ == "promo" ) $('.bon_plan h3.type').text("Promotion");
						else if( item.bp_categ == "brad" ) $('.bon_plan h3.type').text("Braderie");
						else if( item.bp_categ == "anim" ) $('.bon_plan h3.type').text("Animation");
						else if( item.bp_categ == "porte" ) $('.bon_plan h3.type').text("Portes ouvertes");
						else if( item.bp_categ == "fete" ) $('.bon_plan h3.type').text("FÃªte du commerce");
						else if( item.bp_categ == "ouv21" ) $('.bon_plan h3.type').text("Ouverture nocturne exceptionnelle jusqu'Ã  21h");
						else if( item.bp_categ == "ouv12" ) $('.bon_plan h3.type').text("Ouverture exceptionnelle entre 12h et 14h");
						
						$('.bon_plan small').text("Jusqu'au " + item.bp_dateFin);
						$('.bon_plan .bon_plan_description').html(item.bp_descr);
						$('.bon_plan h3.titre').text(item.bp_titre);
						
					}else
						$('.bon_plan').hide();
					/*----------------*/
					
					
					//calcul hauteur
					var h = WINDOW_HEIGHT-50-20-$('#commerce_description').height();
					if( h < 120 ) h = 120;
					$('#commerce_fiche_map').css('height', h + 'px');
					//setTimeout(function(){ self.setMap(item.lat, item.lng) }, 2000);
					
					$('#loading').hide();
					setMarqueur('commerce::point::' + item.nom);
				}
			});
			
			if( fromMap ){
				nav_object.set_back_button( function(){
					$('#loading').show();
					nav_object.prev_page();
					setTimeout( function(){
						$.ajax({ 
							url: ajax_url, 
							dataType: 'json',
							data: "table=commerce&id_categorie=" + current_cat,
							success: function(data){
								if(data.points)	
									self.setPOIOnMap(data.points);
							}
						})
						nav_object.set_back_button( function(){
							nav_object.prev_page();
							nav_object.set_back_button( function(){ 
								parent_categorie.pop(); parent_categorie.pop()
								self.getElementInCategory(parent_cat,0); 
							});			  
						});
					}, 500);
				});
				
			}else{
				setTimeout( function(){
					nav_object.set_back_button( function(){
						nav_object.prev_page();
						nav_object.set_back_button( function(){ 
							parent_categorie.pop(); parent_categorie.pop()
							self.getElementInCategory(parent_cat,0); 
						});			  
					});
				}, 500);
			}
		}, 1);
	}
	
	commerce.prototype.setGallery = function(arrayPhotos){
		if( arrayPhotos ){
			var html = '<ul class="slides">';
			for(i=0;i<arrayPhotos.length ;i++){ 
				html += '<li style="background:url(\'' + arrayPhotos[i] + '\') center center no-repeat; background-size:110% auto;" />  </li>';
			}
			html += '</ul>';
			$('#commerce_diapo').html(html);
			$('#commerce_diapo ul').css('width', (arrayPhotos.length*WINDOW_WIDTH) + 'px'); 
			$('#commerce_diapo ul li').css('width', WINDOW_WIDTH + 'px');
			$('#commerce_diapo_nav a').hide();
			if( arrayPhotos.length > 1 ){
				$('#commerce_diapo_nav #rightcb').show();
				$('#rightcb').off().tappable( function(){
					if( !$('#commerce_diapo ul li:last').hasClass('active') ){
						$('#commerce_diapo ul').animate({ left : '-=' + WINDOW_WIDTH + 'px', useTranslate3d:true, leaveTransforms:true  },500);
						$('#commerce_diapo ul li').removeClass('active');
						$('#commerce_diapo ul li:last').addClass('active');
						$('#commerce_diapo_nav #leftcb').show();
						$('#commerce_diapo_nav #rightcb').hide();
					}					   						   
				});
				$('#leftcb').tappable( function(){
					if( !$('#commerce_diapo ul li:first').hasClass('active') ){
						$('#commerce_diapo ul').animate({ left : '+=' + WINDOW_WIDTH + 'px', useTranslate3d:true, leaveTransforms:true  },500);
						$('#commerce_diapo ul li').removeClass('active');
						$('#commerce_diapo ul li:first').addClass('active');
						$('#commerce_diapo_nav #rightcb').show();
						$('#commerce_diapo_nav #leftcb').hide();
					}				   
				});
			}else
				$('#commerce_diapo_nav a').hide();
		}else{
			$('#commerce_diapo, #commerce_diapo_nav').hide();
		}
	}
	

	
	commerce.prototype.getDistance = function(lat, lng){
		if( user_lat && user_lng ){
			$.getJSON("http://maps.googleapis.com/maps/api/distancematrix/json?origins=" + user_lat + ',' + user_lng + "&destinations=" + lat + ',' + lng + "&mode=driving&language=fr-FR&sensor=true", 
				function(data){
					var distance = data.rows[0].elements[0].distance.text;
					$('#commerce_details .distance').text(distance);
			   }
			);
			$.getJSON("http://maps.googleapis.com/maps/api/distancematrix/json?origins=" + user_lat + ',' + user_lng + "&destinations=" + lat + ',' + lng + "&mode=walking&language=fr-FR&sensor=true", 
				function(data){
					var temps = data.rows[0].elements[0].duration.text;
					$('#commerce_details .temps').text(temps);
			   }
			);	
		}
	}
	
	commerce.prototype.setTitleHeight = function(elem){
		$(' .header h1').css('font-size', '2.8em');
		var h = $('.header h1').height();
		h=h+30;
		var fs = 2.8;
		while( h > 50 ){
			fs = Math.round((fs-0.1)*10)/10;
			$(' .header h1').css('font-size', fs + 'em');
			h = $(' .header h1').height();
			h=h+30;
		}
	}
	
	
	commerce.prototype.activeSearch = function(){
		var s = $('#seach_form_commerce .search_input').val();
		if( strlen(s) > 2 ){
			$('#loading').show();
			$('#seach_form_commerce .search_input').blur();
			self.ajaxQuery(0, 1, s);	
		}else newAlert('Veuillez entrer 3 lettres au minimum.');
		return false;
	}
	
	function commerce(id_category) {
		self = this;
		userPosition();
		
		if( id_category )		
			self.getElementInCategory(id_category,1);
		else
			self.getElementInCategory(0,1);
		
		$('#seach_form').on('submit', function(){
			self.searchIt( $('#seach_form input[type=search]').val() );
			return false;
		});
		$('#seach_form_commerce #search_reset').on('click', function(){
			self.ajaxQuery(0, 1, 0);
			$('#seach_form_commerce .search_input').val('');
		});
		setMarqueur('commerce');
	}
	
	$.fn.commerce = function (id_category) {
		commerce_object = new commerce(id_category);
	}
	
		  
})( jQuery );

function strlen(chaine) {
	var i = 0, a = 0;

	while (chaine[i++]) {
		a++;
	}
	
	return a;
}

(function($) {
	var self;
	var map;
	var parent_categorie = new Array();
	var latitude;
	var longitude;
	var directionsDisplay;
	var my_latitude;
	var my_longitude;
	
	var user_position_marker; 
	var user_coords;
	var direction;
	var polyline = new google.maps.Polyline();
	var parent_cat = 0;
	var current_cat = 0;
	var id_current_poi;
	var current_categorie_name;
	
	commerce.prototype.ajaxQuery = function(id_categorie, firstStart, searchValue){
		
		$(window).scrollTop(0);
		//cancel image downloads
		if(window.stop !== undefined){
			 window.stop();
		}
		else if(document.execCommand !== undefined){
			 document.execCommand("Stop", false);
		}
		$('.commerce_liste').html('');
		var query = "table=commerce&id_categorie=" + id_categorie;
		if( searchValue ){
			query = "table=commerce&recherche=" + searchValue;
			$('#commerce h1').html('Recherche');	
			current_categorie_name = 'Recherche';
			self.setTitleHeight('#commerce h1');
		}
		
		$.ajax({ url: ajax_url, dataType: 'json',
			data: query,
			success: function(data){
				if(data.points){
					var liste_coord = '';
					arrayPoints = new Array();
					
					$.each(data.points, function(i, item) {
						
						if( item.type == "categorie" ){
							var elem = $('<li></li>').html(item.nom);
							elem.tappable(function(){ self.getElementInCategory(item.id_categorie,0);  setMarqueur('commerce::' + item.nom); });
							elem.appendTo('.commerce_liste');
						}else {
							if( typeof item.lat == "undefined" )
								item.lat = '46.780556';
							if( typeof item.lng == "undefined" )
								item.lng = '4.852778';
							
							if( item.lat && item.lng )
								liste_coord += item.lat + ',' + item.lng + '|';
							arrayPoints.push(item);
						}
							
					});
					
					
					if( liste_coord )
						self.getDrivingDistance(liste_coord,arrayPoints);
					
					if( id_categorie ){
						
						current_cat = id_categorie;
						parent_cat = parent_categorie[parent_categorie.length-2];
						
						/*** BACK BUTTON ***/
						if( parent_cat ) 
							nav_object.set_back_button( function(){ parent_categorie.pop(); parent_categorie.pop(); self.getElementInCategory(parent_cat,0); });
						else{
							nav_object.set_back_button( function(){ self.getElementInCategory(0); nav_object.set_back_button(function(){nav_object.go_home()}); });
							parent_cat = 0;
						}
						
						
						//$('#commerce .back_button_noauto').show();
						if( data.courant.nom ){
							$('#commerce h1').html(data.courant.nom);	
							current_categorie_name = data.courant.nom;
							self.setTitleHeight('#commerce h1');
						}else
							$('#commerce h1').text('Commerces');	
								
						self.setTitleHeight('#commerce h1');
						//$('.commerce_liste').animate({ left : '-=480px', useTranslate3d:true, leaveTransforms:false }, 500, "linear", function(){ });
						//$('.commerce_liste').css('margin-top' , '0%' );
					}else
						$('#commerce .back_button_noauto').hide();
					
					// Activation du boutton "Carte"
					$('#show_map').off().tappable( function(){ id_current_poi=0; self.showMap(data.points); });
					
					if( !id_categorie && !firstStart && !liste_coord )
						$('.commerce_liste').animate({ left : '-=480px', useTranslate3d:true, leaveTransforms:false }, 500, "linear", function(){ $('#loading').hide(); });
					else if( id_categorie && !liste_coord )
						$('.commerce_liste').animate({ left : '-=480px', useTranslate3d:true, leaveTransforms:false }, 500, "linear", function(){ $('#loading').hide(); });
					if( firstStart )
						$('#loading').hide();				
				}else{
					var elem = $('<li></li>').html('Aucun r&eacute;sultat');
					elem.appendTo('.commerce_liste');
				}
				
			}
		});
	}
	
	
	
	
	
	commerce.prototype.setListe = function(distances, points){
		if( distances.status == "OK" ){
			for(z=0; z < points.length; z++){
				var d = '';
				if( distances.rows[0].elements[z] ){
					if( distances.rows[0].elements[z].distance )
						d = distances.rows[0].elements[z].distance.value.toString();	
				}else
					d = '0 km';
				
				var reg=new RegExp(" km", "g");
				points[z].distance = d.replace(reg,'');
				var reg=new RegExp(",", "g");
				points[z].distance = points[z].distance.replace(reg,'.');
			};
			points.sort(sort_by('distance', false, parseFloat));
		}
		$.each(points, function(i, item) {
			var elem = $('<li></li>').html(item.nom);
			var vignette = '';
			if( item.vignette && item.vignette !== "null" && item.vignette !== '' && item.vignette !== null ){
				vignette = "background:#000 url('" + item.vignette + "') center center no-repeat; background-size:100px auto";
			}
			
			var distance = '';
			if( typeof item.descr == "undefined" )
				item.descr = '';
			if( item.distance < 1000 )
			   distance = item.distance + ' m';
			else
			   distance = Math.round(item.distance/1000) + ' km';
			
			elem.html('<p class="vign" style="' + vignette + '"> </p><p><span>' + item.nom + '</span><br />' + item.descr.substr(0,80) + '...<br /><em>' + distance + '</em></p><p class="clear"></p>');
			
			elem.addClass('point');
			elem.tappable( function(){ self.showCommerce(item.id_point); });
			$('.button_display').show();
			elem.appendTo('.commerce_liste');
		});
		$('.commerce_liste').animate({ left : '-=480px', useTranslate3d:true, leaveTransforms:false }, 500, "ease", function(){ $('#loading').hide(); });
	}
	
	
	commerce.prototype.getDrivingDistance = function(liste, array){
		var distance = 0;
		if( user_lat && user_lng ){
			$.getJSON("http://maps.googleapis.com/maps/api/distancematrix/json?origins=" + user_lat + ',' + user_lng + "&destinations=" + liste + "&mode=driving&language=fr-FR&sensor=true", 
				function(data){
					self.setListe(data, array);
				}
			);
		}
		return distance;
	}
	
	commerce.prototype.getElementInCategory = function(id_categorie, firstStart){
		$('#loading').show();
		$('#commerce h1').text('');
		$(window).scrollTop(0);
		$('.button_display').hide();
		if( id_categorie ){
			$('.commerce_liste').animate({ left:'+=480px', useTranslate3d:true, leaveTransforms:true }, 500, "linear", function(){
				self.ajaxQuery(id_categorie,0,0);
				parent_categorie.push(id_categorie);				
			});
			/*$('.commerce_liste').addClass('slideDown');
			setTimeout(function(){
				self.ajaxQuery(id_categorie,0,0);
				parent_categorie.push(id_categorie);
				$('.commerce_liste').removeClass('slideDown');
			}, 600);*/

		}else{
			parent_categorie = [0];
			if( firstStart )
				self.ajaxQuery(0,1,0);
			else{
				$('.commerce_liste').animate({ left:'+=480px', useTranslate3d:true, leaveTransforms:true}, 500, "linear", function(){
					self.ajaxQuery(id_categorie,0,0);
					parent_categorie.push(id_categorie);				
				});	
			}
			$('#commerce h1').text('Commerces');	
			self.setTitleHeight('#commerce h1');
		}
		
		if( firstStart ){
			$('#commerce_liste').css('margin-top','50px');
		}
	}
	
	
	commerce.prototype.setPOIOnMap = function(points){
		 $('#loading').hide();
		 markersArray = [];
		 infoBoxArray = [];
		 $('#map_canvas').html(''); 
		 var myLatlng = new google.maps.LatLng(46.780556, 4.852778);
		 if( user_lat && user_lng )
			   var myLatlng = new google.maps.LatLng(user_lat, user_lng);
		 var myOptions = {
		  zoom: 14,
		  center: myLatlng,
		  mapTypeId: google.maps.MapTypeId.ROADMAP,
		  zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.TOP_LEFT
			}
		}
		 
		 $('#map_canvas').css('width', '100%');
		 map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		
		 self.setUserPosition();
		 user_position_interval = setInterval( function(){ self.updateUserPosition() }, 5000 ); 
		
		$.each(points, function(i, item) {
			  var icon = new google.maps.MarkerImage("images/marker.png");
			  var coords = new google.maps.LatLng(item.lat,item.lng);
			  var marker = new google.maps.Marker({ position: coords, title: item.nom, icon : icon });
			  marker.setMap(map);
			  polyline.setMap(null);
			  
			  self.closeInfoBox();
			  
			  var contentString =  '<div style="text-align:left; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#e0e0e0) ); border-radius:5px; border:1px solid #CCC; border-top:0; padding:10px; margin-top:10px;">'+
			  '<h2 style="font-size:16px; color:#333; font-weight:bold; margin-bottom:10px;">' + item.nom + '</h2>'+		  
			  '<a href="javascript:commerce_object.showCommerce(' + item.id_point + ',1)" class="commerce-more">Plus d\'infos</a>' +
			  '<p style="clear:both;"></p></div>';
			  
			  var myOptions = {
					 content: contentString
					,disableAutoPan: false
					,pixelOffset: new google.maps.Size(-100, 0)
					,maxWidth: 200
					,zIndex: null
					,boxStyle: { background: "url('images/maps_tooltip_top.png') top center no-repeat", width:"200px" }
					,closeBoxMargin: "12px 2px 2px 2px"
					,closeBoxURL: "images/search_reset.png"
					,infoBoxClearance: new google.maps.Size(50, 50)
					,isHidden: false
					,pane: "floatPane"
					,enableEventPropagation: false
				};
			  var ib = new InfoBox(myOptions);
			  infoBoxArray.push(ib);
			  
			  if( id_current_poi == item.id_point ){
			  	map.panTo(coords);
			  	ib.open(map, marker);
			  }
			  
			  google.maps.event.addListener(marker, "mouseup", function() { self.closeInfoBox(); ib.open(map, marker); });		  
			 
		});
	}
	
	commerce.prototype.showMap = function(points){
		nav_object.load_a_new_page('small_maps.html', function(){
			setTimeout( function(){ 
				self.setPOIOnMap(points);	
			}, 2000);
		},1 );
	}
	
	commerce.prototype.closeInfoBox = function(){
		if (is_array(infoBoxArray) && infoBoxArray.length > 0) {
			for (i in infoBoxArray) {
				if( typeof(infoBoxArray[i]) == "object")
					infoBoxArray[i].close();
			}
		}
	}
	
	commerce.prototype.removeAllMarkers = function(){
		  if (markersArray) {
			  for (i in markersArray) {
				  markersArray.setMap(null);
			  }
			  markersArray.length = 0;
		  }
	}
	
	commerce.prototype.removeCategoryMarkers = function(id_category){
		  if (markersArray[id_category]) {
			  for (i in markersArray[id_category]) {
				  markersArray[id_category][i].setMap(null);
			  }
			  markersArray[id_category].length = 0;
		  }
	}
	
	commerce.prototype.showMarkers = function(id_category) {
		  if (markersArray[id_category]) {
			  for (i in markersArray[id_category]) {
				  markersArray[id_category][i].setMap(map);
			  }
		  }
	}
	
	commerce.prototype.updateUserPosition = function(){
		userPosition();
		var latlng = new google.maps.LatLng(user_lat, user_lng);
    	if( user_position_marker && user_lat )
			user_position_marker.setPosition(latlng);	
	}
	
	commerce.prototype.setUserPosition = function(){
		  var coords = new google.maps.LatLng(user_lat,user_lng);
		  var icon = new google.maps.MarkerImage("images/marker_bleu.png");
		  user_position_marker = new google.maps.Marker({ position: coords, icon : icon });
		  user_position_marker.setMap(map);
	}
	
	
	
	
	
	
	commerce.prototype.searchIt = function(value){
		$(window).scrollTop(0);
		$('#loading').show();
		$('#search_results_mention').show();
		$.ajax({ url: ajax_url, dataType: 'json',
			data: "table=commerce&value=" + value,
			success: function(data){
				$.each(data, function(i, item) {
					var elem = $('<li></li>').html(item.nom)
					.tappable( function(){ self.showCommerces(item.id_point); });
					elem.appendTo('#commerce_categories');
				});
				$('#loading').hide();
			}
		});
	}
	
	commerce.prototype.showCommerce = function(id_point, fromMap){
		$(window).scrollTop(0);
		$('#loading').show();
		nav_object.load_a_new_page('fiche_commerce.html', function(){ 
			
			$('#commerce_categories').html();
			$.ajax({ url: ajax_url, dataType: 'json',
				data: "table=commerce&id_point=" + id_point,
				success: function(data){
					var item = data.point;
					id_current_poi = item.id_point;
					
					$('#commerce_details .header h1').text(current_categorie_name);
					self.setTitleHeight();
					
					
					$('#commerce_description .description').html(item.descr);
					$('#commerce_description h2').text(item.nom);
					var addr = item.adresse + ' ' + item.cp + ' ' + item.ville;
					//$('#commerce_description .adresse').html(addr);
					
					var coord = '';
					if(addr) coord += '<span>Adresse : </span> ' + addr + '<br />';
					if(item.telephone) coord += '<span>T&eacute;l : </span> <a href="tel:' + item.telephone + '">' + item.telephone + '</a><br />';
					if(item.mobile) coord += '<span>Mobile : </span> <a href="tel:' + item.mobile + '">' + item.mobile + '</a><br />';
					if(item.fax) coord += '<span>Fax</span> : <a href="' + item.fax + '">' + item.fax + '</a><br />';
					if(item.web) coord += '<span>&bull;</span> <a href="javascript:void(0)" onclick="openExternalLink(\'' + item.web + '\');" rel="external" style="text-decoration:none">Acc&eacute;der au site</a><br />';
					if(item.email) coord += '<span>&bull;</span> <a href="mailto:' + item.email + '" style="text-decoration:none">Envoyer un email</a><br />';
					
					$('#commerce_description .coordonnees > div').html(coord);
					
					// TYPE 
					// 0 : all
					// 1 : hebergement
					// 2 ; restauration
					var details = '';
					if( item.type == '1' ){
						if( item.prix_chambre_min && item.prix_chambre_max ) details += '<span>Prix des chambres de</span> ' + item.prix_chambre_min + '&euro; <span>&agrave;</span> ' + item.prix_chambre_max + '&euro;<br />';
						if( item.fermeture ) details += '<span>Date annuelle de fermeture :</span> ' + item.fermeture + '<br />';
						if( item.etoiles ) details += '<span>Nombre d\'&eacute;toiles :</span> ' + item.etoiles + '<br />';
						details += '<span>Animaux accept&eacute;s :</span> ';
						if( item.animaux == '1' ) details += 'oui <br />';
						else details += 'non <br />';
						details += '<span>Parking :</span> ';
						if(item.parking == '1' ) details += 'oui <br />';
						else details += 'non <br />';
						details += '<span>Restaurant :</span>';
						if(item.restaurant == '1') details += 'oui <br />';
						else  details += 'non <br />';
						$('#commerce_description .details > div').html(details);
					}
					else if( item.type == '2' ){
						if( item.menu_min && item.menu_max ) details += '<span>Menu : </span> ' + item.menu_min + '&euro; &agrave; ' + item.menu_max + '&euro; <br />';
						if( item.carte_min && item.carte_max ) details += '<span>Carte : </span> ' + item.carte_min + '&euro; &agrave; ' + item.carte_max + '&euro; <br />';
						if( item.fermeture ) details += '<span>Jours de fermeture : </span> ' + item.fermeture + '<br />';
						if( item.horaires ) details += '<span>Horaire de dernier service : </span> ' + item.horaires + '<br />';
						$('#commerce_description .details > div').html(details);
					}
					else{
						if( item.horaires ) details += '<span>Horaires : </span>' + item.horaires + '<br />';
						if( item.marques ) details += '<span>Marques : </span>' + item.marques + '<br />';
						$('#commerce_description .details > div').html(details);
					}
					
					self.getDistance(item.lat, item.lng);
					
					self.setGallery( item.photos);
					
					$('.icon-directions-drive').off().tappable( function(){ 
						$('#loading').show();
						$('body').mapIt(item.id_point, item.lat, item.lng, 1, function(){
							nav_object.prev_page(); 
							setTimeout(function(){ self.setMap(item.lat, item.lng); $('#loading').hide(); }, 1000);
							nav_object.set_back_button( function(){ nav_object.prev_page(); parent_categorie.pop(); self.getElementInCategory(current_cat,0); } );
						});
					});
					$('.icon-directions-walk').off().tappable( function(){ 
						$('#loading').show();
						$('body').mapIt(item.id_point, item.lat, item.lng, 0, function(){
							nav_object.prev_page(); 
							setTimeout(function(){ self.setMap(item.lat, item.lng); $('#loading').hide(); }, 1000);
							nav_object.set_back_button( function(){ nav_object.prev_page(); parent_categorie.pop(); self.getElementInCategory(current_cat,0); } );
						});
					});
					
					//calcul hauteur
					var h = WINDOW_HEIGHT-50-20-$('#commerce_description').height();
					if( h < 120 ) h = 120;
					$('#commerce_fiche_map').css('height', h + 'px');
					//setTimeout(function(){ self.setMap(item.lat, item.lng) }, 2000);
					
					$('#loading').hide();
					setMarqueur('commerce::point::' + item.nom);
				}
			});
			
			if( fromMap ){
				nav_object.set_back_button( function(){
					$('#loading').show();
					nav_object.prev_page();
					setTimeout( function(){
						$.ajax({ 
							url: ajax_url, 
							dataType: 'json',
							data: "table=commerce&id_categorie=" + current_cat,
							success: function(data){
								if(data.points)	
									self.setPOIOnMap(data.points);
							}
						})
						nav_object.set_back_button( function(){
							nav_object.prev_page();
							nav_object.set_back_button( function(){ 
								parent_categorie.pop(); parent_categorie.pop()
								self.getElementInCategory(parent_cat,0); 
							});			  
						});
					}, 500);
				});
				
			}else{
				setTimeout( function(){
					nav_object.set_back_button( function(){
						nav_object.prev_page();
						nav_object.set_back_button( function(){ 
							parent_categorie.pop(); parent_categorie.pop()
							self.getElementInCategory(parent_cat,0); 
						});			  
					});
				}, 500);
			}
		}, 1);
	}
	
	commerce.prototype.setGallery = function(arrayPhotos){
		if( arrayPhotos ){
			var html = '<ul class="slides">';
			for(i=0;i<arrayPhotos.length ;i++){ 
				html += '<li style="background:url(\'' + arrayPhotos[i] + '\') center center no-repeat; background-size:110% auto;" />  </li>';
			}
			html += '</ul>';
			$('#commerce_diapo').html(html);
			$('#commerce_diapo ul').css('width', (arrayPhotos.length*WINDOW_WIDTH) + 'px'); 
			$('#commerce_diapo ul li').css('width', WINDOW_WIDTH + 'px');
			$('#commerce_diapo_nav a').hide();
			if( arrayPhotos.length > 1 ){
				$('#commerce_diapo_nav #rightcb').show();
				$('#rightcb').off().tappable( function(){
					if( !$('#commerce_diapo ul li:last').hasClass('active') ){
						$('#commerce_diapo ul').animate({ left : '-=' + WINDOW_WIDTH + 'px', useTranslate3d:true, leaveTransforms:true  },500);
						$('#commerce_diapo ul li').removeClass('active');
						$('#commerce_diapo ul li:last').addClass('active');
						$('#commerce_diapo_nav #leftcb').show();
						$('#commerce_diapo_nav #rightcb').hide();
					}					   						   
				});
				$('#leftcb').tappable( function(){
					if( !$('#commerce_diapo ul li:first').hasClass('active') ){
						$('#commerce_diapo ul').animate({ left : '+=' + WINDOW_WIDTH + 'px', useTranslate3d:true, leaveTransforms:true  },500);
						$('#commerce_diapo ul li').removeClass('active');
						$('#commerce_diapo ul li:first').addClass('active');
						$('#commerce_diapo_nav #rightcb').show();
						$('#commerce_diapo_nav #leftcb').hide();
					}				   
				});
			}else
				$('#commerce_diapo_nav a').hide();
		}else{
			$('#commerce_diapo, #commerce_diapo_nav').hide();
		}
	}
	

	
	commerce.prototype.getDistance = function(lat, lng){
		if( user_lat && user_lng ){
			$.getJSON("http://maps.googleapis.com/maps/api/distancematrix/json?origins=" + user_lat + ',' + user_lng + "&destinations=" + lat + ',' + lng + "&mode=driving&language=fr-FR&sensor=true", 
				function(data){
					var distance = data.rows[0].elements[0].distance.text;
					$('#commerce_details .distance').text(distance);
			   }
			);
			$.getJSON("http://maps.googleapis.com/maps/api/distancematrix/json?origins=" + user_lat + ',' + user_lng + "&destinations=" + lat + ',' + lng + "&mode=walking&language=fr-FR&sensor=true", 
				function(data){
					var temps = data.rows[0].elements[0].duration.text;
					$('#commerce_details .temps').text(temps);
			   }
			);	
		}
	}
	
	commerce.prototype.setTitleHeight = function(elem){
		$(' .header h1').css('font-size', '2.8em');
		var h = $('.header h1').height();
		h=h+30;
		var fs = 2.8;
		while( h > 50 ){
			fs = Math.round((fs-0.1)*10)/10;
			$(' .header h1').css('font-size', fs + 'em');
			h = $(' .header h1').height();
			h=h+30;
		}
	}
	
	
	commerce.prototype.activeSearch = function(){
		var s = $('#seach_form_commerce .search_input').val();
		if( strlen(s) > 2 ){
			$('#loading').show();
			$('#seach_form_commerce .search_input').blur();
			self.ajaxQuery(0, 1, s);	
		}else newAlert('Veuillez entrer 3 lettres au minimum.');
		return false;
	}
	
	function commerce(id_category) {
		self = this;
		userPosition();
		
		if( id_category )		
			self.getElementInCategory(id_category,1);
		else
			self.getElementInCategory(0,1);
		
		$('#seach_form').on('submit', function(){
			self.searchIt( $('#seach_form input[type=search]').val() );
			return false;
		});
		$('#seach_form_commerce #search_reset').on('click', function(){
			self.ajaxQuery(0, 1, 0);
			$('#seach_form_commerce .search_input').val('');
		});
		setMarqueur('commerce');
	}
	
	$.fn.commerce = function (id_category) {
		commerce_object = new commerce(id_category);
	}
	
		  
})( jQuery );

function strlen(chaine) {
	var i = 0, a = 0;

	while (chaine[i++]) {
		a++;
	}
	
	return a;
}



window.google = window.google || {};
google.maps = google.maps || {};
(function() {
  
  function getScript(src) {
    document.write('<' + 'script src="' + src + '"' +
                   ' type="text/javascript"><' + '/script>');
  }
  
  var modules = google.maps.modules = {};
  google.maps.__gjsload__ = function(name, text) {
    modules[name] = text;
  };
  
  google.maps.Load = function(apiLoad) {
    delete google.maps.Load;
    apiLoad([null,[[["http://mt0.googleapis.com/vt?lyrs=m@174000000\u0026src=api\u0026hl=en-US\u0026","http://mt1.googleapis.com/vt?lyrs=m@174000000\u0026src=api\u0026hl=en-US\u0026"],null,null,null,null,"m@174000000"],[["http://khm0.googleapis.com/kh?v=106\u0026hl=en-US\u0026","http://khm1.googleapis.com/kh?v=106\u0026hl=en-US\u0026"],null,null,null,1,"106"],[["http://mt0.googleapis.com/vt?lyrs=h@174000000\u0026src=api\u0026hl=en-US\u0026","http://mt1.googleapis.com/vt?lyrs=h@174000000\u0026src=api\u0026hl=en-US\u0026"],null,null,"imgtp=png32\u0026",null,"h@174000000"],[["http://mt0.googleapis.com/vt?lyrs=t@128,r@174000000\u0026src=api\u0026hl=en-US\u0026","http://mt1.googleapis.com/vt?lyrs=t@128,r@174000000\u0026src=api\u0026hl=en-US\u0026"],null,null,null,null,"t@128,r@174000000"],null,[[null,0,7,7,[[[330000000,1246050000],[386200000,1293600000]],[[366500000,1297000000],[386200000,1320034790]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1.15\u0026hl=en-US\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1.15\u0026hl=en-US\u0026"]],[null,0,8,8,[[[330000000,1246050000],[386200000,1279600000]],[[345000000,1279600000],[386200000,1286700000]],[[354690000,1286700000],[386200000,1320035000]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1.15\u0026hl=en-US\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1.15\u0026hl=en-US\u0026"]],[null,0,9,9,[[[330000000,1246050000],[386200000,1279600000]],[[340000000,1279600000],[386200000,1286700000]],[[348900000,1286700000],[386200000,1302000000]],[[368300000,1302000000],[386200000,1320035000]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1.15\u0026hl=en-US\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1.15\u0026hl=en-US\u0026"]],[null,0,10,19,[[[329890840,1246055600],[386930130,1284960940]],[[344646740,1284960940],[386930130,1288476560]],[[350277470,1288476560],[386930130,1310531620]],[[370277730,1310531620],[386930130,1320034790]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1.15\u0026hl=en-US\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1.15\u0026hl=en-US\u0026"]],[null,3,7,7,[[[330000000,1246050000],[386200000,1293600000]],[[366500000,1297000000],[386200000,1320034790]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1p.12\u0026hl=en-US\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1p.12\u0026hl=en-US\u0026"]],[null,3,8,8,[[[330000000,1246050000],[386200000,1279600000]],[[345000000,1279600000],[386200000,1286700000]],[[354690000,1286700000],[386200000,1320035000]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1p.12\u0026hl=en-US\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1p.12\u0026hl=en-US\u0026"]],[null,3,9,9,[[[330000000,1246050000],[386200000,1279600000]],[[340000000,1279600000],[386200000,1286700000]],[[348900000,1286700000],[386200000,1302000000]],[[368300000,1302000000],[386200000,1320035000]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1p.12\u0026hl=en-US\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1p.12\u0026hl=en-US\u0026"]],[null,3,10,null,[[[329890840,1246055600],[386930130,1284960940]],[[344646740,1284960940],[386930130,1288476560]],[[350277470,1288476560],[386930130,1310531620]],[[370277730,1310531620],[386930130,1320034790]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1p.12\u0026hl=en-US\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1p.12\u0026hl=en-US\u0026"]]],[["http://cbk0.googleapis.com/cbk?","http://cbk1.googleapis.com/cbk?"]],[["http://khmdb0.googleapis.com/kh?v=52\u0026hl=en-US\u0026","http://khmdb1.googleapis.com/kh?v=52\u0026hl=en-US\u0026"],null,null,null,null,"52"],[["http://mt0.googleapis.com/mapslt?hl=en-US\u0026","http://mt1.googleapis.com/mapslt?hl=en-US\u0026"]],[["http://mt0.googleapis.com/mapslt/ft?hl=en-US\u0026","http://mt1.googleapis.com/mapslt/ft?hl=en-US\u0026"]],[["http://mt0.googleapis.com/vt?hl=en-US\u0026","http://mt1.googleapis.com/vt?hl=en-US\u0026"]]],["en-US","US",null,0,null,null,"http://maps.gstatic.com/mapfiles/","http://csi.gstatic.com","https://maps.googleapis.com","http://maps.googleapis.com"],["http://maps.gstatic.com/intl/en_us/mapfiles/api-3/8/2","3.8.2"],[1843279501],1.0,null,null,null,null,1,"",null,null,0,"http://khm.googleapis.com/mz?v=106\u0026",null,"https://earthbuilder.google.com"], loadScriptTime);
  };
  var loadScriptTime = (new Date).getTime();
  getScript("http://maps.gstatic.com/intl/en_us/mapfiles/api-3/8/2/main.js");
})();

/* French initialisation for the jQuery UI date picker plugin. */
/* Written by Keith Wood (kbwood{at}iinet.com.au),
              StÃ©phane Nahmani (sholby@sholby.net),
              StÃ©phane Raimbault <stephane.raimbault@gmail.com> */
jQuery(function($){
	$.datepicker.regional['fr'] = {
		closeText: 'Fermer',
		prevText: 'PrÃ©cÃ©dent',
		nextText: 'Suivant',
		currentText: 'Aujourd\'hui',
		monthNames: ['Janvier','FÃ©vrier','Mars','Avril','Mai','Juin',
		'Juillet','AoÃ»t','Septembre','Octobre','Novembre','DÃ©cembre'],
		monthNamesShort: ['Janv.','FÃ©vr.','Mars','Avril','Mai','Juin',
		'Juil.','AoÃ»t','Sept.','Oct.','Nov.','DÃ©c.'],
		dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
		dayNamesMin: ['D','L','M','M','J','V','S'],
		weekHeader: 'Sem.',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['fr']);
});


(function($) {
	var self;
	var url = "";
	var map;
	var markersArray = [];
	var infoBoxArray = [];
	var polylineArray = [];
	var polylineDirArray = [];
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
	var self;
	var user_position_marker; 
	var user_coords;
	var direction;
	var polyline = new google.maps.Polyline();
	var current_direction;
	var current_ligne;
	var current_route;
	var buscephale = 0;
	var bounds = new google.maps.LatLngBounds();
	var lastpoint = '';
	var zoom = 1;
	
	deplacement.prototype.getCategories = function(id_category){
		var query = "table=transport";
		
		if( id_category == "flash" ){
			$('#deplacement_ligne h1').html('Flash');
			query = "table=transport&flash=1";
		}else if( id_category == "buscephale" ){
			$('#deplacement_ligne h1').html('Busc&eacute;phale');
			query = "table=transport_opendata";
		}else{
			$('#deplacement_ligne h1').html('R&eacute;seau Zoom');
		
		}
		$.ajax({
			 url: ajax_url,
			 dataType: 'json',
			 data: query,
			 success: function(data){
				$.each(data, function(i, item) {
					var elem = $('<li class="dep"></li>').html(item.nomLine + '<br /><small>Direction : ' + item.nomRoute + '</small>');
					elem.tappable( function(){ 
						if( id_category == "buscephale" )
							zoom = 0;
						self.getLigne(item.id_line,item.id_route,0,0,zoom); 
						current_direction = item.nomRoute; 
						current_ligne = item.id_line; 
						current_route = item.id_route;
						setMarqueur('deplacements::' + encodeURI(item.nomLine));
					})
					$('#poi-list').append(elem);
				});
				$('#loading').hide();
			 }
		});
		
	}
	
	deplacement.prototype.getLigne = function(id_ligne, route, fromBackButton, id_arret, zoom){
		
		$('#loading').show();
		nav_object.load_a_new_page('deplacement.html', function(){
		setTimeout( function(){
			self.initMap();
			self.initialize();
			bounds = new google.maps.LatLngBounds();
			
			var query = "table=transport&id_ligne=" + id_ligne + "&id_route=" + route;
			if( route == 0 )
				query = "table=transport_opendata&id_ligne=" + id_ligne + "&id_route=" + route;
			
			$.ajax({
				 url: ajax_url,
				 dataType: 'json',
				 data: query,
				 success: function(data){
					$('#loading').hide();
					var parcoursBus = [];
					
					var tabStops = data.arrets;
					var nomRoute = data.route.nom;					
					if( route == 0 )
						nomRoute = data.route;					
					$('#plan h1').text(nomRoute);
					self.setTitleHeight();
					
					polyline = new google.maps.Polyline({ 
						path: [], 
						strokeColor: '#4aac43', 
						strokeWeight: 3 
					}); 
					polyline.setMap(null);
					
					
					for(i=0; i<tabStops.length-1; i++)
					{
						var contenu = '';
						
						if( zoom ) {
							contenu += '<p style="font-style:italic">Horaires indiqu&eacute;s en temps r&eacute;el.</p>';
							contenu += '<p class="nomroute">' +  nomRoute + '</p><p class="horaires">';
							contenu += 'G&eacute;olocalisation du bus en cours ...</p>';
						}else{
							contenu += '<table width="100%" class="small_table_horaire">';
							if( tabStops[i].horaire ){
								contenu += '<tr width="40%"><td>' +  nomRoute + '</td><td>';
								$.each( tabStops[i].horaire, function(i, h) {
									contenu +=  '<a class="horaire_button" href="javascript:void(0)" ontouchend="deplacement_object.traceLine(' + h.id + ')">' + h.heure + '</a>';
								});
								contenu += '</td></tr>';					
							}else{
								contenu += '<tr><td>Pas de bus dans les prochaines heures.</td><td>';
							}
							contenu += '</table>';
							tabStops[i].registration = null;
							 	
						}
						
						var marker = 0;
						if( i == 0 ) marker = 1;
						
						var open_window =0;
						if( id_arret && id_arret == tabStops[i].id_transport_stoppoint )
							open_window = 1;
						
						self.setMarker(tabStops[i].latitude,tabStops[i].longitude, tabStops[i].nom, contenu, tabStops[i].id_transport_stoppoint, current_route, id_ligne, open_window, marker, tabStops[i].registration, tabStops[i].horaire )
						
					}
					
					var m = tabStops.length-1;
					
					if( tabStops[m] ){
						
						var contenu = '';
						
						if( zoom ){
							contenu += '<p style="font-style:italic">Horaires indiqu&eacute;s en temps r&eacute;el.</p>';
							contenu += '<p class="nomroute">' +  nomRoute + '</p><p class="horaires">';
							contenu += 'Chargement ...</p>';
						}else{
							if( tabStops[m].horaire ){
								contenu += '<tr width="40%"><td>' + nomRoute + '</td><td>';
								$.each(tabStops[m].horaire, function(i, h) {
									contenu +=  '<a class="horaire_button" href="javascript:void(0)" ontouchend="deplacement_object.traceLine(' + h.id + ')">' + h.heure + '</a>';
								});
								contenu += '</td></tr>';					
							}						
							contenu += '</table>';	
							tabStops[m].registration = null;
						}
						
						lastpoint = tabStops[m].registration;
						
						var open_window =0;
						if( id_arret && id_arret == tabStops[m].id_transport_stoppoint )
							open_window = 1;
						
						self.setMarker(tabStops[m].latitude, tabStops[m].longitude, tabStops[m].nom, contenu, tabStops[m].id_transport_stoppoint, route, id_ligne, open_window, 2, tabStops[m].registration, tabStops[m].horaire);
						map.fitBounds(bounds);
					}
					 $('#loading').hide();
				 }
				 
			});
			$('#map-selector-container').tappable( function(){ nav_object.prev_page(); } );
		},1000);
		},1);
	}
	
	deplacement.prototype.setTitleHeight = function(elem){
		$(' .header h1').css('font-size', '2.8em');
		var h = $('.header h1').height();
		h=h+30;
		var fs = 2.8;
		while( h > 50 ){
			fs = Math.round((fs-0.1)*10)/10;
			$(' .header h1').css('font-size', fs + 'em');
			h = $(' .header h1').height();
			h=h+30;
		}
	}
	
	deplacement.prototype.traceLine = function(id_horaire ){
		for(var i=0; i < polylineArray.length-1; i++) {
			polylineArray[i].setMap(null);
		}
		polylineArray = new Array();
		$.ajax({
			 url: ajax_url,
			 dataType: 'json',
			 data: "table=transport&id_heure=" + id_horaire,
			 success: function(data){
			 		
					var tabStops = data.arrets;
					for(i=0; i<tabStops.length-2; i++){
						var directionsService = new google.maps.DirectionsService();
						var request;
					
						var m_origin = new google.maps.LatLng(tabStops[i].latitude, tabStops[i].longitude);
						var m_destination = new google.maps.LatLng(tabStops[i+1].latitude, tabStops[i+1].longitude);
						request = {
						  origin: m_origin,
						  destination: m_destination,
						  travelMode: google.maps.DirectionsTravelMode.DRIVING,
						  unitSystem: google.maps.DirectionsUnitSystem.METRIC,
						  avoidHighways: true
						};
						
						var optionsPolyline = {
							path: [],
							strokeColor: '#8dd190', 
							strokeWeight: 3 
						};
						
						directionsService.route(request, function(response, status) {
							  if (status == google.maps.DirectionsStatus.OK) {
								var bounds = new google.maps.LatLngBounds(); 
								var path = response.routes[0].overview_path; 
								var legs = response.routes[0].legs; 
								for (i=0;i<legs.length;i++) { 
									polyline = new google.maps.Polyline({path: [], strokeColor: '#4aac43', strokeWeight: 3 }); 
									var steps = legs[i].steps; 
									for (j=0;j<steps.length;j++) { 
										var nextSegment = steps[j].path; 
										for (k=0;k<nextSegment.length;k++) { 
											polyline.getPath().push(nextSegment[k]);
											polylineArray.push(polyline);
										} 
									} 
								} 
								polyline.setMap(map); 
							  } else {
								newAlert('Error: ' + status);
							  }
						});
					}
			 }
		});
	}
	
	deplacement.prototype.getPOI = function(id_poi, id_route, id_ligne, date){
		self.closeInfoBox();
		var hdate = '';
		if( date )
			hdate = "&date=" + date;
		
		var query = "table=transport&id_arret=" + id_poi + "&id_ligne=" + id_ligne + "&id_route=" + id_route + hdate;
		if( id_route == 0 )
			query = "table=transport_opendata&id_arret=" + id_poi + "&id_ligne=" + id_ligne + "&id_route=" + id_route + hdate;
		
		nav_object.load_a_new_page('deplacement_details.html', function(){
			$.ajax({
				 url: ajax_url,
				 dataType: 'json',
				 data: query,
				 success: function(item){
					
					$( "#datepicker" ).datepicker({
						onSelect: function(dateText, inst) { $( "#datepicker" ).val(dateText);  }	
					});
					
					$('#deplacement_details h1').html(item.arret.nom); 
					self.setTitleHeight('#deplacement_details');
					if( current_direction )
						$('#deplacement_details span.direction').html(current_direction.toUpperCase());
					$.each(item.horaires, function(i, h) {
						$('#deplacement_details .horaires').append('<li>' + h.heure + '</li>');
					});
					/*$('#deplacement_details .back_button').on(TRIGGER_EVENT, function(){
						setTimeout( function(){  self.getLigne(current_ligne,current_route,1); self.activeSwipe(); }, 1200);
					});*/
					
					nav_object.set_back_button(function(){  
						$('.ui-widget').hide();
						nav_object.prev_page();
						setTimeout( function(){ 
							self.getLigne(current_ligne,current_route,1,0,zoom);
							setTimeout( function(){  nav_object.set_back_button( function(){ tab_page.pop(); nav_object.prev_page(); }); }, 500);
						}, 500);
					});
					
					$('#search_dep_h').tappable( function(){
						var date = $('#datepicker').val();
						self.getHoraires(id_poi, id_route, id_ligne, date);									
					});
				}
			});
			
			var date = new Date();
			var curr_date = date.getDate();
			var curr_month = date.getMonth();
			curr_month = curr_month + 1;
			var curr_year = date.getFullYear();
			$('#datepicker').val(curr_date + '/'+ curr_month + '/'+ curr_year);
			
		}, 1);
	}
	
	deplacement.prototype.getHoraires = function(id_poi, id_route, id_ligne, date){
		var query = "table=transport&id_arret=" + id_poi + "&id_ligne=" + id_ligne + "&id_route=" + id_route + "&date=" + date;
		if( id_route == 0 )
			query = "table=transport_opendata&id_arret=" + id_poi + "&id_ligne=" + id_ligne + "&id_route=" + id_route + "&date=" + date;			
		$.ajax({
			 url: ajax_url,
			 dataType: 'json',
			 data: query,
			 success: function(item){
				$('#deplacement_details .horaires').html('');
				setTimeout( function(){
					$.each(item.horaires, function(i, h) {
						$('#deplacement_details .horaires').append('<li>' + h.heure + '</li>');
					});
				}, 1000);
				
			}
		});
	}
	
	
	/*deplacement.prototype.lePouce = function(){
		self.initMap();
		setTimeout( function(){
		$.ajax({
			 url: ajax_url,
			 dataType: 'json',
			 data: "table=pouce",
			 success: function(data){
					var tabStops = data;
					for(i=0; i<tabStops.length-1; i++){
						
						var content = '<strong>Horaires de passage : </strong><br />Toutes les 15 minutes de 7h30 &agrave; 19h30';

						self.setMarker(tabStops[i].lat,tabStops[i].lng, tabStops[i].nom, content, '', '', '', 0, 4);
						
						var directionsService = new google.maps.DirectionsService();
						var request;
					
						var m_origin = new google.maps.LatLng(tabStops[i].lat, tabStops[i].lng);
						var m_destination = new google.maps.LatLng(tabStops[i+1].lat, tabStops[i+1].lng);
						request = {
						  origin: m_origin,
						  destination: m_destination,
						  travelMode: google.maps.DirectionsTravelMode.WALKING,
						  unitSystem: google.maps.DirectionsUnitSystem.METRIC,
						  avoidHighways: true
						};
						
						var optionsPolyline = {
							path: [],
							strokeColor: '#1582de', 
							strokeWeight: 3 
						};
						
						directionsService.route(request, function(response, status) {
							  if (status == google.maps.DirectionsStatus.OK) {
								var bounds = new google.maps.LatLngBounds(); 
								var path = response.routes[0].overview_path; 
								var legs = response.routes[0].legs; 
								for (i=0;i<legs.length;i++) { 
									polyline = new google.maps.Polyline({path: [], strokeColor: '#1582de', strokeWeight: 3 }); 
									var steps = legs[i].steps; 
									for (j=0;j<steps.length;j++) { 
										var nextSegment = steps[j].path; 
										for (k=0;k<nextSegment.length;k++) { 
											polyline.getPath().push(nextSegment[k]);
										} 
									} 
								} 
								polyline.setMap(map); 
							  } else {
								newAlert('Error: ' + status);
							  }
						});
					}
					map.setZoom(14);
					
					// DERNIER POINT
					var content = '<strong>Horaires de passage : </strong><br />Toutes les 15 minutes de 7h30 à 19h30';
					var m = tabStops.length-1;
					self.setMarker(tabStops[m].lat,tabStops[m].lng, tabStops[m].nom, content, '', '', '', 0, 4);
					
			 }
		});
		}, 1000);
	}*/
	
	deplacement.prototype.lePouce = function(){
		self.initMap();
		$.ajax({
			 url: ajax_url,
			 dataType: 'json',
			 data: "table=pouce",
			 success: function(data){
					var tabStops = data;

					if( tabStops )
						self.traceLePouce(tabStops, 0);
					
					map.setZoom(14);
					
					// DERNIER POINT
					var content = '<strong>Horaires de passage : </strong><br />Toutes les 15 minutes de 7h30 à 19h30';
					var m = tabStops.length-1;
					self.setMarker(tabStops[m].lat,tabStops[m].lng, tabStops[m].nom, content, '', '', '', 0, 4);
					
			 }
		});
	}
	
	deplacement.prototype.traceLePouce = function(tabStops, i){
		
		var content = '<strong>Horaires de passage : </strong><br />Toutes les 15 minutes de 7h30 &agrave; 19h30';
		
		self.setMarker(tabStops[i].lat,tabStops[i].lng, tabStops[i].nom, content, '', '', '', 0, 4);
		
		var directionsService = new google.maps.DirectionsService();
		var request;
	
		var m_origin = new google.maps.LatLng(tabStops[i].lat, tabStops[i].lng);
		var m_destination = new google.maps.LatLng(tabStops[i+1].lat, tabStops[i+1].lng);
		request = {
		  origin: m_origin,
		  destination: m_destination,
		  travelMode: google.maps.DirectionsTravelMode.WALKING,
		  unitSystem: google.maps.DirectionsUnitSystem.METRIC,
		  avoidHighways: true
		};
		
		var optionsPolyline = {
			path: [],
			strokeColor: '#1582de', 
			strokeWeight: 3 
		};
		
		directionsService.route(request, function(response, status) {
			  if (status == google.maps.DirectionsStatus.OK) {
				var bounds = new google.maps.LatLngBounds(); 
				var path = response.routes[0].overview_path; 
				var legs = response.routes[0].legs; 
				for (i=0;i<legs.length;i++) { 
					polyline = new google.maps.Polyline({path: [], strokeColor: '#1582de', strokeWeight: 3 }); 
					var steps = legs[i].steps; 
					for (j=0;j<steps.length;j++) { 
						var nextSegment = steps[j].path; 
						for (k=0;k<nextSegment.length;k++) { 
							polyline.getPath().push(nextSegment[k]);
						} 
					} 
				} 
				polyline.setMap(map); 
			  }
		});
		
		z=i+1;
		if( z < 14 ){
			setTimeout( function(){ self.traceLePouce(tabStops, z) }, 500 );
		}

	}
	
	
	//rajouter idmarker pour pouvoir les supprimer un à un
	deplacement.prototype.setMarker = function(latitude,longitude, nom, contenu, id_poi, id_route, id_ligne, open_window, marker, registration, horaires){
		  var rand = new Date().getTime();
		  var maxWidth = 180;
		  
		  if( registration ){
			  var contentString =  '<div style="text-align:left; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#e0e0e0) ); border-radius:5px; border:1px solid #CCC; border-top:0; padding:10px; margin-top:10px;" id="ib' + rand + '">'+
			  '<h2 style="font-size:16px; color:#333; font-weight:bold; margin-bottom:10px;">' + nom + '</h2>'+		  
			  contenu +
			  '<a href="javascript:deplacement_object.traceDirections(' + latitude + ',' + longitude + ',0)" class="icon-directions-walk-dep"> </a>';
			  if( marker !== 4 ){
				  contentString += '<a href="javascript:deplacement_object.getPOI(\'' + id_poi + '\',\'' + id_route + '\',\'' + id_ligne + '\')" class="icon-deplacement"> </a>';
					maxWidth = 300;  
			  }
			  contentString += '<p style="clear:both;"></p></div>';
		  }else{
			  var contentString =  '<div style="text-align:left; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#e0e0e0) ); border-radius:5px; border:1px solid #CCC; border-top:0; padding:10px; margin-top:10px;">'+
			  '<h2 style="font-size:16px; color:#333; font-weight:bold; margin-bottom:10px;">' + nom + '</h2>'+		  
			  contenu +
			  '<a href="javascript:deplacement_object.traceDirections(' + latitude + ',' + longitude + ',0)" class="icon-directions-walk-dep"> </a>';
			  if( marker !== 4 ){
				  contentString += '<a href="javascript:deplacement_object.getPOI(\'' + id_poi + '\',\'' + id_route + '\',\'' + id_ligne + '\')" class="icon-deplacement"> </a>';
					maxWidth = 300;  
			  }
			  contentString += '<p style="clear:both;"></p></div>';  
		  }
		  
		  var coords = new google.maps.LatLng(latitude,longitude);
		  	var icon = new google.maps.MarkerImage("images/marker_gris.png");
		  if( marker == 2 )
		  	icon = new google.maps.MarkerImage("images/marker_vert.png");
		  var marker = new google.maps.Marker({ position: coords, title: nom, icon : icon });
		  marker.setMap(map);
		 
		  var myOptions = {
                 content: contentString
                ,disableAutoPan: false
				,pixelOffset: new google.maps.Size( (maxWidth/2)*-1, 0)
                ,maxWidth: maxWidth
                ,zIndex: null
				,boxStyle: { background: "url('images/maps_tooltip_top.png') top center no-repeat", width: maxWidth + "px" }
                ,closeBoxMargin: "12px 2px 2px 2px"
                ,closeBoxURL: "images_2x/close_infobox.png"
                ,infoBoxClearance: new google.maps.Size(1, 1)
                ,isHidden: false
                ,pane: "floatPane"
                ,enableEventPropagation: false
        	};
		  var ib = new InfoBox(myOptions);
       	  infoBoxArray.push(ib);
		  google.maps.event.addListener(marker, "mouseup", function() { 
				for(b=0; b<infoBoxArray.length-1; b++){
					infoBoxArray[b].close();
				}
				if( registration )
					self.getHorairesTempsReel(registration, lastpoint, rand, horaires);
				ib.open(map, marker);
				map.setCenter(coords);
		  });
		  if( open_window ){ 
			  if( registration )
					self.getHorairesTempsReel(registration, lastpoint, rand, horaires);
		  		ib.open(map, marker);
		  }
		  
		  bounds.extend(coords);
		  
		  markersArray.push(marker);
	}
	
	deplacement.prototype.getHorairesTempsReel = function(registration, id_destination, rand, horaires){
		$.ajax({
			   url: ajax_url,
			   dataType: 'json',
			   data: 'table=transport&tempsreel=1&id_arret=' + registration + '&id_destination=' + id_destination,
			   success: function(item){
					$('#ib' + rand + ' .horaires').html('');
					if( item.length > 0 ){
						for(var i=0; i < item.length; i++) {
							$('#ib' + rand + ' .horaires').append( '<a class="horaire_button">' + item[i] + '</a>' );
						}
					}else{
						for(var i=0; i < horaires.length; i++) {
							$('#ib' + rand + ' .horaires').append( '<a class="horaire_button">' + horaires[i].heure + '</a>' );
						}						
					}
					$('#ib' + rand + ' .horaires').append('<br /><br />');			   
			   }
		});
	}
	
	deplacement.prototype.traceDirections = function(lat, lng, drive){
		for(var i=0; i < polylineDirArray.length-1; i++) {
			polylineDirArray[i].setMap(null);
		}
		polylineArray = new Array();
		
		var travel_mode;
		if( drive)
			travel_mode = google.maps.DirectionsTravelMode.DRIVING;
		else
			travel_mode = google.maps.DirectionsTravelMode.WALKING;
		direction = new google.maps.DirectionsRenderer({
			map   : map
		});
		origin      = new google.maps.LatLng(user_lat,user_lng);
		destination = new google.maps.LatLng(lat,lng); // Le point d'arrivé
		if(origin && destination){
			var request = {
				origin      : origin,
				destination : destination,
				travelMode  : travel_mode // Type de transport
			}
			var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
			
			polyline = new google.maps.Polyline({ 
				path: [], 
				strokeColor: '#439aac', 
				strokeWeight: 3 
			}); 
			polyline.setMap(null);
			
			
			if( user_lat && user_lng && !drive){
				self.closeInfoBox();
				/*var coords = new google.maps.LatLng(lat,lng);
				var icon = new google.maps.MarkerImage("images/spacer.gif");
				var marker = new google.maps.Marker({ position: coords, icon : icon });
				marker.setMap(map);*/
				
				var heure = '8h';
				$.getJSON("http://maps.googleapis.com/maps/api/distancematrix/json?origins=" + user_lat + ',' + user_lng + "&destinations=" + lat + ',' + lng + "&mode=walking&language=fr-FR&sensor=true", 
					function(data){
						heure = data.rows[0].elements[0].duration.text;
						var contentString =  '<div style="text-align:left; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#e0e0e0) ); border-radius:5px; border:1px solid #CCC; border-top:0; padding:10px; margin-top:10px;">' + '<strong style="font-weight:bold">Temps de marche estim&eacute;</strong> : ' + heure + '</div>';
						var myOptions = {
							 content: contentString
							,disableAutoPan: false
							,pixelOffset: new google.maps.Size(-100, 0)
							,maxWidth: 100
							,zIndex: null
							,boxStyle: { background: "url('images/maps_tooltip_top.png') top center no-repeat", width:"200px" }
							,closeBoxMargin: "12px 2px 2px 2px"
							,closeBoxURL: "images_2x/close_infobox.png"
							,infoBoxClearance: new google.maps.Size(50, 50)
							,isHidden: false
							,pane: "floatPane"
							,enableEventPropagation: false
						};
					  var ib = new InfoBox(myOptions);
					  infoBoxArray.push(ib);
					  google.maps.event.addListener(user_position_marker, "mouseup", function() { self.closeInfoBox(); ib.open(map, user_position_marker); });		  
					  ib.open(map, user_position_marker);
				   }
				);						
			}
			
			
			
			
		
			directionsService.route(request, function(result, status){ // Envoie de la requête pour calculer le parcours
				if(status == google.maps.DirectionsStatus.OK){
					/*direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours*/
					var bounds = new google.maps.LatLngBounds(); 
					var path = result.routes[0].overview_path; 
					var legs = result.routes[0].legs; 
					for (i=0;i<legs.length;i++) { 
						var steps = legs[i].steps; 
						for (j=0;j<steps.length;j++) { 
							var nextSegment = steps[j].path; 
							for (k=0;k<nextSegment.length;k++) { 
								polyline.getPath().push(nextSegment[k]); 
								bounds.extend(nextSegment[k]); 
								polylineDirArray.push(polyline);
							} 
						} 
					} 
					polyline.setMap(map); 
					//bounds.extend(new google.maps.LatLng(user_lat,user_lng)); 
					map.fitBounds(bounds);
				}
			});
		}
		
	}
	
	deplacement.prototype.showOverlay = function(){
		//$('body').prepend('<div style="position:absolute; z-index:99; width:40px; background-color:#fff;">test</div>');
	}
	
	deplacement.prototype.closeInfoBox = function(){
		if (is_array(infoBoxArray) && infoBoxArray.length > 0) {
			for (i in infoBoxArray) {
				if( typeof(infoBoxArray[i]) == "object")
					infoBoxArray[i].close();
			}
		}
	}
	
	deplacement.prototype.removeAllMarkers = function(){
		  if (is_array(markersArray) && markersArray.length > 0) {
			  for (i=0;i<markersArray.length-1;i++) {
				  if( typeof(markersArray[i]) == "object")
				 	 markersArray[i].setMap(null);
			  }
			  markersArray.length = 0;
		  }
	}
	
	deplacement.prototype.removeCategoryMarkers = function(id_category){
		  if (markersArray[id_category]) {
			  for (i in markersArray[id_category]) {
				  markersArray[id_category][i].setMap(null);
			  }
			  markersArray[id_category].length = 0;
		  }
	}
	
	deplacement.prototype.showMarkers = function(id_category) {
		  if (markersArray[id_category]) {
			  for (i in markersArray[id_category]) {
				  markersArray[id_category][i].setMap(map);
			  }
		  }
	}
	
	deplacement.prototype.setUserPosition = function(){
		var coords = new google.maps.LatLng(user_lat,user_lng);
		var icon = new google.maps.MarkerImage("images/marker_bleu.png");
		user_position_marker = new google.maps.Marker({ position: coords, icon : icon, title :'Votre position' });
		user_position_marker.setMap(map);
	}
	
	deplacement.prototype.updateUserPosition = function(){
		userPosition();
		var latlng = new google.maps.LatLng(user_lat, user_lng);
    	if( user_position_marker && user_lat )
			user_position_marker.setPosition(latlng);	
	}
	
	deplacement.prototype.initialize = function(id_ligne, id_route, id_arret) {
		  markersArray = [];
		  infoBoxArray = [];
		  
		  if(user_position_interval)
			  clearInterval(user_position_interval);
		  user_position_interval = setInterval( function(){ self.updateUserPosition() }, 5000 );
		  
		  self.getCategories(id_ligne);
		  
		  directionsDisplay = new google.maps.DirectionsRenderer();
		  
		  if( id_ligne && id_arret ){
			  self.getLigne(id_ligne, id_route, 1, id_arret);
		  }
		  
		  
	}
	
	deplacement.prototype.initMap = function(){
		 var myLatlng = new google.maps.LatLng(46.780556, 4.852778);
		  var myOptions = {
			  zoom: 14,
			  center: myLatlng,
			  mapTypeId: google.maps.MapTypeId.ROADMAP,
			   zoomControl: true,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.LARGE,
					position: google.maps.ControlPosition.TOP_LEFT
				}
			  
		  }
		  $('#map_canvas').css('width', '100%');
		  
		  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		  
		  $('#map-selector-header').tappable( function(){ self.prev_page(); });
		  $('.gmnoprint').css('margin-top','60px');
		  
		  self.setUserPosition();		  
	}
		
	/*deplacement.prototype.openBlock = function(){
		  if( !$('#map-selector-header').hasClass('map-selector-header-open') ){
			  $('#map-selector-header').addClass('map-selector-header-open');
			  $('#map-selector-container').animate({top: '-=250px', useTranslate3d:true, leaveTransforms:true}, function(){
				  $('#delete-poi, #back-poi-list').show();
			  });
		  }
	}
	
	deplacement.prototype.closeBlock = function(){
		   if( $('#map-selector-header').hasClass('map-selector-header-open') ){
			  $('#delete-poi, #back-poi-list').hide();
			  $('#map-selector-header').removeClass('map-selector-header-open');
			  $('#map-selector-container').animate({ top: '+=250px', useTranslate3d:true, leaveTransforms:true});
		  }
	}*/
	
	deplacement.prototype.getCategory = function(id_category){
		  $.ajax({
			 url: url,
			 dataType: 'json',
			 data: "id_category=" + id_category,
			 success: function(data){
				$.each(data, function(i, item) {
					   var elm = $('<li></li>').html(item.nom);
					   if(item.children > 0) elm.tappable( function(){ this.getCategory(item.id_category); });
					   elm.appendTo('#poi-list');
				});
			 }
	  });
	}
	
	deplacement.prototype.seTitleHeight = function(elem){
		var h = $(elem + ' .header h1').height();
		h=h+30;
		var fs = 2.8;
		while( h > 50 ){
			fs = Math.round((fs-0.1)*10)/10;
			$(elem + ' .header h1').css('font-size', fs + 'em');
			h = $(elem + ' .header h1').height();
			h=h+30;
		}
	}
	
	function deplacement(id_ligne, id_route, id_arret) {
		self = this;
		self.initialize(id_ligne, id_route, id_arret);
		
		/*$('#delete-poi').off().on(BUTTON_TRIGGER_EVENT, function(event){
			event.preventDefault();
			event.stopPropagation();
			self.initialize();
			self.closeBox();
		});*/
		//this.bindCorner(0);		
	}
	
	$.fn.deplacement = function (id_ligne, id_route, id_arret) {
		deplacement_object = new deplacement(id_ligne, id_route, id_arret);
	}
 
 })( jQuery );

var scale = 1.0;
function changeScale(e){
	if( ($('#bhns_image_scalable').width())*scale*e.scale > 480 ){
		scale = scale*e.scale;
		$('#bhns_image_scalable').css({ webkitTransform  : "scale(" + scale + ")" });
		//scale = scale * e.scale
	}
	//var element = document.getElementById('bhns_image_scalable');
	//element.addEventListener('gestureend', endScale, false);
}
function endScale(e){
	var wm = $('#bhns_image_scalable').css('width');
	wm = wm.replace('px','');
	
	//$('#bhns_image_scalable').css('width', e.scale*wm); // + 'px', webkitTransform : 'scal3d(0,0,0)', left:0, top:0 }
	
	//$('#bhns_image_scalable').off('gestureend');
}

function deplacement_object_search(){
	$('#loading').show();
	var s = $('#search_form_deplacement .search_input').val();
	$('#deplacement_arret_liste').html('');
	$('#search_form_deplacement .search_input').blur();
	if( strlen(s) > 3 ){
		
		nav_object.load_a_new_page('dep_search.html', function(){ 
		$.ajax({
			 url: ajax_url,
			 dataType: 'json',
			 data: "table=transport&recherche=" + s,
			 success: function(data){
				var aff = 0;
				if( data ){
					
					$('<li></li>').html('R&eacute;seau Zoom').addClass('title').appendTo('#deplacement_arret_liste_zoom');
					$.each(data, function(i, item) {
						var elem = $('<li></li>').html('<strong>Arr&ecirc;t</strong> : ' + item.nomArret + '<br /><small>' + item.nomLine + ' <br /><em>Direction ' + item.nomRoute + '</em></small>');
						aff = 1;
					
						elem.tappable( function(){
							nav_object.load_a_new_page('deplacement.html', function(){ 
								setTimeout( function(){ $('body').deplacement(item.id_line, item.id_route, item.id_arret);  }, 2000);
							}, 1);								
						});
						elem.appendTo('#deplacement_arret_liste_zoom');
					});
					if( data.length <= 0 ) $('<li></li>').html('Aucun r&eacute;sultat').appendTo('#deplacement_arret_liste');
					
					$('#deplacement_arret_liste_zoom').append('<br /><br />');
					$('#loading').hide();
				}
				if(aff == 0){
					var elem = $('<li></li>').html('Aucun r&eacute;sultat');
					elem.appendTo('#deplacement_arret_liste_zoom');
					$('#loading').hide();
				}
			},
			error: function(){
				var elem = $('<li></li>').html('Aucun r&eacute;sultat');
					elem.appendTo('#deplacement_arret_liste_zoom');
					$('#loading').hide();
			}
		});
		$.ajax({
			 url: ajax_url,
			 dataType: 'json',
			 data: "table=transport_opendata&recherche=" + s,
			 success: function(data){
				var aff = 0;
				if( data ){
					$('<li></li>').html('R&eacute;seau Busc&eacute;phale').addClass('title').appendTo('#deplacement_arret_liste_buscephale');
					$.each(data, function(i, item) {
						var elem = $('<li></li>').html('<strong>Arr&ecirc;t</strong> : ' + item.nomArret + '<br /><small>' + item.nomLine + ' <br /><em>Direction ' + item.nomRoute + '</em></small>');
						aff = 1;
						elem.tappable( function(){
							nav_object.load_a_new_page('deplacement.html', function(){ 
								setTimeout( function(){ $('body').deplacement(item.id_line, 0, item.id_arret);  }, 2000);
							}, 1);								
						});
						elem.appendTo('#deplacement_arret_liste_buscephale');
					});
					if( data.length <= 0 ) $('<li></li>').html('Aucun r&eacute;sultat').appendTo('#deplacement_arret_liste');
					
					$('#deplacement_arret_liste_buscephale').append('<br /><br />');
					$('#loading').hide();
				}
				if(aff==0){
					var elem = $('<li></li>').html('Aucun r&eacute;sultat');
					elem.appendTo('#deplacement_arret_liste_buscephale');
					$('#loading').hide();
				}
			},
			error: function(){
				var elem = $('<li></li>').html('Aucun r&eacute;sultat');
				elem.appendTo('#deplacement_arret_liste_zoom');	
				$('#loading').hide();
			}
		});
		$('#loading').hide();
		}, 1)
	}else newAlert('Veuillez entrer 3 lettres au minimum.');
	return false;
}

(function($) {
	var self;
	var parent_categorie = new Array();
	var latitude;
	var longitude;
	var directionsDisplay;
	var my_latitude;
	var my_longitude;
	
	var user_position_marker; 
	var user_coords;
	var direction;
	var polyline = new google.maps.Polyline();
	var parent_cat = 0;
	var current_cat = 0;
	
	service_public.prototype.ajaxQuery = function(id_categorie, firstStart, searchValue){
		$(window).scrollTop(0);
		$('.service_public_liste').html('');
		var query = "table=service&id_categorie=" + id_categorie;
		if( searchValue )
			query = "table=service&recherche=" + searchValue
		$.ajax({ url: ajax_url, dataType: 'json',
			data: query,
			success: function(data){
				if(data.points){
					$.each(data.points, function(i, item) {
						var elem = $('<li></li>').html(item.nom);
						
						if( item.type == "categorie" ){
							elem.tappable( function(){ self.getElementInCategory(item.id_categorie,0); setMarqueur('service_public::' + item.nom);  });
							
						}else {
							elem.addClass('point');
							elem.tappable( function(){ self.showService(item.id_point); });
						}
							elem.appendTo('.service_public_liste');
					});
					if( id_categorie ){
						
						current_cat = id_categorie;
						parent_cat = parent_categorie[parent_categorie.length-2];
						
						/*** BACK BUTTON ***/
						if( parent_cat ) 
							nav_object.set_back_button( function(){ parent_categorie.pop(); parent_categorie.pop(); self.getElementInCategory(parent_cat,0); });
						else{
							nav_object.set_back_button( function(){ self.getElementInCategory(0); nav_object.set_back_button(function(){nav_object.go_home()}); });
							parent_cat = 0;
						}
						
						$('#service_public .back_button_noauto').show();
						$('#service_public h1').html(data.courant.nom);	
						self.setTitleHeight('#service_public h1');
						$('.service_public_liste').animate({ left : '-=480px', useTranslate3d:true, leaveTransforms:false }, 500, "linear", function(){ });
						//$('.service_public_liste').css('margin-top' , '0%' );
					}else
						nav_object.set_back_button(function(){nav_object.go_home()});
						
					if( !id_categorie && !firstStart )
						$('.service_public_liste').animate({ left : '-=480px', useTranslate3d:true, leaveTransforms:false }, 500, "linear", function(){ });
				}else{
					var elem = $('<li></li>').html('Aucun r&eacute;sultat');
					elem.appendTo('.service_public_liste');
				}
				$('#loading').hide();
			}
		});
	}
	
	service_public.prototype.getElementInCategory = function(id_categorie, firstStart){
		$('#loading').show();
		
		if( id_categorie ){
			$('.service_public_liste').animate({ left :'+=480px', useTranslate3d:true, leaveTransforms:true}, 500, "linear", function(){
				self.ajaxQuery(id_categorie,0);
				parent_categorie.push(id_categorie);				
			});

		}else{
			self.setTitleHeight('#service_public h1');
			parent_categorie = [0];
			if( firstStart )
				self.ajaxQuery(0,1);
			else{
				$('.service_public_liste').animate({ left :'+=480px', useTranslate3d:true, leaveTransforms:true}, 500, "linear", function(){
					self.ajaxQuery(id_categorie,0);
					parent_categorie.push(id_categorie);				
				});	
			}
			$('#service_public .back_button_noauto').hide();
			$('#service_public h1').text('Services publics').css('font-size','2.5em');
		}
		
	}
	
	service_public.prototype.searchIt = function(value){
		$(window).scrollTop(0);
		$('#loading').show();
		$('#search_results_mention').show();
		$.ajax({ url: ajax_url, dataType: 'json',
			data: "table=service&value=" + value,
			success: function(data){
				$.each(data, function(i, item) {
					var elem = $('<li></li>').html(item.nom)
					.tappable( function(){ self.showServices(item.id_point); });
					elem.appendTo('#service_public_categories');
				});
				$('#loading').hide();
			}
		});
	}
	
	service_public.prototype.showService = function(id_point){
		$(window).scrollTop(0);
		$('#loading').show();
		nav_object.load_a_new_page('fiche_service_public.html', function(){ 
			
			$('#service_public_categories').html();
			$.ajax({ url: ajax_url, dataType: 'json',
				data: "table=service&id_point=" + id_point,
				success: function(data){
					var item = data.point;
					//self.setTitleHeight('#service_public_fiche');
					var addr = item.adresse + '<br />' + item.cp + ' ' + item.ville;
					$('#service_public_description .description').html(item.descr + '<br /><br />' + item.horaires);
					$('#service_public_description h2').text(item.nom);
					$('#service_public_description .adresse').html(addr);
					
					var coord = '';
					if(item.telephone) coord += '<strong>T&eacute;l</strong> : <a href="tel' + item.telephone + '">' + item.telephone + '</a><br />';
					if(item.fax) coord += '<strong>Fax</strong> : <a href="' + item.fax + '">' + item.fax + '</a><br />';
					if(item.email) coord += '<strong>Email</strong> : <a href="mailto:' + item.email + '">' + item.email + '</a><br />';
					if(item.web) coord += '<strong>Web</strong> : <a href="javascript:void(0)" onclick="openExternalLink(\'' + item.web + '\');" rel="external">' + item.web + '</a><br />';
					if(item.coord) coord += item.coord;				
					$('#service_public_description .coordonnees').html(coord);
					
					self.getDistance(item.lat, item.lng);
					
					/*$('.icon-directions-drive').off().on(TRIGGER_EVENT, function(event){ event.stopPropagation(); event.preventDefault(); self.traceDirections(item.lat, item.lng, 1) });
					$('.icon-directions-walk').off().on(TRIGGER_EVENT, function(event){ event.stopPropagation(); event.preventDefault(); self.traceDirections(item.lat, item.lng, 0) });*/
					
					$('.icon-directions-drive').off().tappable( function(){ 
						$('#loading').show();
						$('body').mapIt(item.id_point, item.lat, item.lng, 1, function(){
							nav_object.prev_page(); 
							setTimeout(function(){ self.setMap(item.lat, item.lng); $('#loading').hide(); }, 1000);
							nav_object.set_back_button( function(){ nav_object.prev_page(); parent_categorie.pop(); self.getElementInCategory(current_cat,0); } );
						});
					});
					$('.icon-directions-walk').off().tappable( function(){ 
						$('#loading').show();
						$('body').mapIt(item.id_point, item.lat, item.lng, 0, function(){
							nav_object.prev_page(); 
							setTimeout(function(){ self.setMap(item.lat, item.lng); $('#loading').hide(); }, 1000);
							nav_object.set_back_button( function(){ nav_object.prev_page(); parent_categorie.pop(); self.getElementInCategory(current_cat,0); } );
						});
					});
					
					
					//calcul hauteur
					var h = WINDOW_HEIGHT-50-20-$('#service_public_description').height();
					if( h < 280 ) h = 280;
					$('#service_public_fiche_map').css('height', h + 'px');
					setTimeout(function(){ self.setMap(item.lat, item.lng); $('#loading').hide(); }, 2000);
					setMarqueur('service_public::point::' + item.nom);
				}
			});
			
			setTimeout( function(){
				nav_object.set_back_button( function(){
					nav_object.prev_page();
					nav_object.set_back_button( function(){ 
						parent_categorie.pop(); parent_categorie.pop();
						self.getElementInCategory(parent_cat,0); 
					});			  
				});
			}, 500);
		
		}, 1);
	}
	
	
	service_public.prototype.setMap = function(lat, lng) {
		  var self = this;
		  userPosition();
		  
		  var myLatlng = new google.maps.LatLng(46.780556, 4.852778);
		  var myOptions = {
			  zoom: 14,
			  center: myLatlng,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
		  }
		  $('#service_public_fiche_map').css('width', '100%');
		  map = new google.maps.Map(document.getElementById("service_public_fiche_map"), myOptions);
		  
		  //self.getUserPosition();
		  //directionsDisplay = new google.maps.DirectionsRenderer();
		 
		  
		  var coords = new google.maps.LatLng(user_lat,user_lng);
		  var icon = new google.maps.MarkerImage("images/marker_bleu.png");
		  var marker = new google.maps.Marker({ position: coords, icon : icon });
		  marker.setMap(map);
		  
		  var coords = new google.maps.LatLng(lat,lng);
		  var icon = new google.maps.MarkerImage("images/marker.png");
		  var marker = new google.maps.Marker({ position: coords, icon : icon });
		  
		  marker.setMap(map);
		  map.panTo(marker.position);
		  map.setZoom(14);
	}
	
	/*service_public.prototype.getUserPosition = function(){
		var self = this;
		navigator.geolocation.getCurrentPosition(function(position){ 
			user_coords = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			var icon = new google.maps.MarkerImage("images/user_marker.png");
		  
			user_position_marker = new google.maps.Marker({ position: user_coords, title: "Votre position", icon : icon });
			user_position_marker.setMap(map);											  
		}, function(){
			newAlert('Impossible de déterminer votre position');	
		});	
	}*/
	
	service_public.prototype.getDistance = function(lat, lng){
		if( user_lat && user_lng ){
			$.getJSON("http://maps.googleapis.com/maps/api/distancematrix/json?origins=" + user_lat + ',' + user_lng + "&destinations=" + lat + ',' + lng + "&mode=driving&language=fr-FR&sensor=true", 
				function(data){
					var distance = data.rows[0].elements[0].distance.text;
					$('#service_public_fiche .distance').text(distance);
			   }
			);	
		}
	}
	
	service_public.prototype.setTitleHeight = function(elem){
		$(' .header h1').css('font-size', '2.8em');
		var h = $('.header h1').height();
		h=h+30;
		var fs = 2.8;
		while( h > 50 ){
			fs = Math.round((fs-0.1)*10)/10;
			$(' .header h1').css('font-size', fs + 'em');
			h = $(' .header h1').height();
			h=h+30;
		}
	}
	
	service_public.prototype.traceDirections = function(lat, lng, drive){
		var self = this;
		polyline.setMap(null);
		if( drive)
			var travel_mode = google.maps.DirectionsTravelMode.DRIVING;
		else
			var travel_mode = google.maps.DirectionsTravelMode.WALKING;
		direction = new google.maps.DirectionsRenderer({
			map   : map
		});
		origin      = new google.maps.LatLng(user_lat,user_lng);
		destination = new google.maps.LatLng(lat,lng); // Le point d'arrivé
		if(origin && destination){
			var request = {
				origin      : origin,
				destination : destination,
				travelMode  : travel_mode // Type de transport
			}
			var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
			
			polyline = new google.maps.Polyline({ 
				path: [], 
				strokeColor: '#FF0000', 
				strokeWeight: 3 
			}); 
			
		
			directionsService.route(request, function(result, status){ // Envoie de la requête pour calculer le parcours
				if(status == google.maps.DirectionsStatus.OK){
					/*direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours*/
					var bounds = new google.maps.LatLngBounds(); 
					var path = result.routes[0].overview_path; 
					var legs = result.routes[0].legs; 
					for (i=0;i<legs.length;i++) { 
						var steps = legs[i].steps; 
						for (j=0;j<steps.length;j++) { 
							var nextSegment = steps[j].path; 
							for (k=0;k<nextSegment.length;k++) { 
								polyline.getPath().push(nextSegment[k]); 
								bounds.extend(nextSegment[k]); 
							} 
						} 
					} 
					polyline.setMap(map); 
					map.fitBounds(bounds); 
				}
			});
		}
		
	}
	
	service_public.prototype.activeSearch = function(){
		var s = $('#seach_form_sp .search_input').val();
		if( strlen(s) > 3 ){
			$('#loading').show();
			$('#seach_form_sp .search_input').blur();
			self.ajaxQuery(0, 1, s);	
		}else newAlert('Veuillez entrer 3 lettres au minimum.');
		return false;
	}
	
	
	function service_public() {
		self = this;
		self.getElementInCategory(0,1);
		setMarqueur('service_public');
		$('#seach_form').on('submit', function(){
			self.searchIt( $('#seach_form input[type=search]').val() );
			return false;
		});
		
		$('#seach_form_sp #search_reset').on('click', function(){
			self.ajaxQuery(0, 1, 0);
			$('#seach_form_sp .search_input').val('Rechercher');
		});
	}
	
	$.fn.service_public = function () {
		service_public_object = new service_public($(this));
	}
	
		  
})( jQuery );

	var npath = '';
	
	function checkform(){
		$('#loading').show();
		var form_submit = true;
		if( !$('#allomairie input[name=nom]').val() ){
			form_submit = false;
			newAlert('Veuillez indiquer un nom');
		}
		else if( !$('#allomairie input[name=prenom]').val() ){
			form_submit = false;
			newAlert('Veuillez indiquer un prenom');
		}
		else if( !$('#allomairie input[name=email]').val() ){
			form_submit = false;
			newAlert('Veuillez indiquer un email valide');
		}else if( !$('#allomairie input[name=rue]').val() ){
			form_submit = false;
			newAlert('Veuillez indiquer le nom de la rue concern&eacute;e');
		}
		
		if( form_submit == true ){
			var photo = '';
			photo = '&photo=' +  document.getElementById("myImage_canvas").toDataURL(); 
			var geolocation = user_lat + ',' + user_lng;
			
			var options = new FileUploadOptions();
			options.fileKey="file";
			options.fileName=npath.substr(npath.lastIndexOf('/')+1);
			options.mimeType="image/jpeg";
	
			var nomimage = Math.floor(Math.random()*15000000);
			$.ajax({ url: ajax_url, type: 'post',
				data: "table=allomairie&genre=" + $('#allomairie select[name=genre]').val() + '&nom=' +  $('#allomairie input[name=nom]').val() + '&prenom=' +  $('#allomairie input[name=prenom]').val() + '&adresse=' +  $('#allomairie input[name=adresse]').val() + '&tel=' +  $('#allomairie input[name=tel]').val() + '&email=' +  $('#allomairie input[name=email]').val() + '&position=' + geolocation + '&rue=' + $('#allomairie input[name=rue]').val() + '&objet=' +  $('#allomairie textarea[name=objet]').val() + "&nomimage=" + nomimage,
				success: function(data){
					
					var ft = new FileTransfer();
					ft.upload(npath, upload_url + '?table=allomairie&nomimage=' + nomimage , 
						function(){ $('#loading').hide(); newAlert('Votre demande est transmise'); nav_object.go_home();   },
						function(){ navigator.notification.newAlert(msg, null, 'Erreur !'); $('#loading').hide(); 
					}, options);
					
				}
			});
		}else
			$('#loading').hide();
	}
	
	function capturePhoto() {
	    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, targetWidth:600  });
	}
	
	function onFail(){
		var msg ='Impossible de lancer l\'appareil photo';
        navigator.notification.alert(msg, null, '');
	}
	
	
	
	function onPhotoDataSuccess(imageData) {
		npath = imageData.replace("file://localhost",'');
		var path = imageData.replace("file://localhost",'');
		$('#myImage').attr('src', path);
		
		var c = document.getElementById("myImage_canvas");
		var img = new Image();
    	img.src = "images/bg_allomairie.jpg";
		var ctx = c.getContext('2d');
		ctx.drawImage(img, 0, 0);
		
		$('#myImage_canvas_img').attr('src', path);
		$('#myImage').show();
		$('#button_deletePhoto').show();
	}
	
	function deletePhoto(){
		$('#myImage').attr('src', '');
		$('#myImage_canvas_img').attr('src', '');
		$('#myImage').hide();
		$('#button_deletePhoto').hide();
	}
	
	function captureError(error) {
        var msg = 'An error occurred during capture: ' + error.code;
        navigator.notification.alert(msg, null, '!');
    }

  

	

(function($) {

	var url = "";
	var markersArray = [];
	var infoBoxArray = [];
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
	var self;
	var user_position_marker; 
	var user_coords;
	var direction;
	var polyline = new google.maps.Polyline();
	var parent_cat = 0;
	
	mapIt.prototype.activeSwipe = function(){
		$("#map-selector-header").touchwipe({
			 wipeDown: function() { self.openBlock(); },
			 wipeUp: function() { self.closeBlock(); },
			 preventDefaultEvents: true
		});	
	}
	
	mapIt.prototype.showAllPOI = function(id_category, show_points){
		markersArray = [];
		infoBoxArray = [];
		var query = "table=plan&id_categorie=" + id_category;
		nav_object.load_a_new_page('maps.html', function(){
			self.initMap();
			setTimeout( function(){ 
				$.ajax({
				 url: ajax_url,
				 dataType: 'json',
				 data: query,
				 success: function(data){
					if( data.points ){
						$.each(data.points, function(i, item) {
							   if( show_points == 1 ){
										self.getPOI(item.id_point,1);
								}
							   
						});
						/*** BACK BUTTON ***/
						if( data.parent ) {
							nav_object.set_back_button( function(){ self.getElementInCategory(data.parent.id_categorie,0); });
							parent_cat = data.parent.id_categorie;
						}
						
					}
				 }
			});					 
								 
			
			},1000);
		});
	}
	
	mapIt.prototype.activeSearch = function(){
		var s = $('#search_input_dep').val();
		if( strlen(s) > 2 ){
			$('#loading').show();
			$('#search_input_dep').blur();
			self.getElementInCategory(0,0,s);
		}else newAlert('Veuillez entrer 3 lettres au minimum.');
		return false;
	}
	
	mapIt.prototype.getElementInCategory = function(id_category, show_points, searchValue){
		
		var query = "table=plan&id_categorie=" + id_category;
		if( searchValue ) 
			query = "table=plan&recherche=" + searchValue;
		else
			searchValue = "";
		$('#loading').show();
		
		
		$('#poi-list').animate({ left : '+=' + WINDOW_WIDTH + 'px', useTranslate3d:true, leaveTransforms:true },500, function(){
			$(window).scrollTop(0);
			$('#poi-list').html('<form onsubmit="map_object.activeSearch(); return false;" style="padding:4%; border-bottom: 1px solid silver; background-color: #F0F0F0; text-align:center;"><input type="text" name="search" value="' + searchValue + '" onfocus="this.value=\'\'" class="search_input" id="search_input_dep" style="width:90%" /></form>');
			$.ajax({
				 url: ajax_url,
				 dataType: 'json',
				 data: query,
				 success: function(data){
					if( data.points ){
						$.each(data.points, function(i, item) {
							   var elem = $('<li></li>').html(item.nom);
							   
							   var active = '';
							   if( $('#poi-list').data('current_category_displayed') == item.id_categorie )
									active='active';
							   var html = '';
							   if( item.type == "categorie" )
									var html = '<input style="display:none" type="checkbox" name="selectAll" value="" class="' + active + '" id="cb' + item.id_categorie + '" onclick="map_object.showAllPOI(\'' + item.id_categorie + '\',1)" /> ';
							   html += '<span>' + item.nom + '</span>';
							   var elem = $('<li></li>').html(html);
							   
							   //elem.children('span').
							   if( item.type == "categorie" )
							   		elem.tappable( function(){ self.getElementInCategory(item.id_categorie, 0); setMarqueur('plan::' + encodeURI(item.nom) ); })
							   else {
									//elem.children('span')
									elem.tappable( function(){ self.getPOI(item.id_point,0); })
									elem.addClass('point');	
									if( show_points == 1 ){
										self.getPOI(item.id_point,1);
									}if( show_points == 2 ){
										self.getPOI(item.id_point,2);
									}
							   }
							   $('#poi-list').append(elem);
							   
							   
						});
						$('#loading').hide();
						$('#poi-list').animate({ left : '-=' + WINDOW_WIDTH + 'px', useTranslate3d:true, leaveTransforms:false },500);
						if( id_category && id_category !== "TAXI" ){
							/*** BACK BUTTON ***/
							if( data.parent ) {
								nav_object.set_back_button( function(){ self.getElementInCategory(data.parent.id_categorie,0); });
								parent_cat = data.parent.id_categorie;
							}else
								nav_object.set_back_button( function(){ 
									self.getElementInCategory(0); 
									nav_object.set_back_button(function(){
										nav_object.prev_page();
										setTimeout( function(){ $('#loading').show(); self.initialize('SIMPLE_INIT'); }, 700);
									});
								});
							
							if( id_category == "HAND" || id_category == "PARK" )
								$('#back-poi-list').hide();	
							else if( show_points == 2 )
								$('#back-poi-list').hide();	
							else
								$('#back-poi-list').show();
						}
						//this.showMarkers(id_category);
						if( id_category == 'HAND' ){
							map.panTo( new google.maps.LatLng(user_lat,user_lng) );
							map.setZoom(16);
						}
						
						if( id_category == 0 ){
							$('#back-poi-list').hide();
							nav_object.set_back_button( function(){ nav_object.go_home(); } );	
						}
						
					}else{
						var elem = $('<li></li>').html("Aucun r&eacute;sultat");
						$('#poi-list').append(elem);
						$('#poi-list').animate({ left : '-=' + WINDOW_WIDTH + 'px', useTranslate3d:true, leaveTransforms:false },500);
						$('#loading').hide();
					}
				 }
			});
			if( searchValue ){
				$('#back-poi-list').off().tappable(  function(){ 
					self.getElementInCategory(0);								
				});
			}
		});
	}
	
	mapIt.prototype.shortcutElements = function(id_category, show_points, categorie_name){
		if( id_category == "GARE" ){
			// Exception pour la gare
			var contenu = "<p>";
			contenu += "<strong>T&eacute;l&eacute;phone</strong> : <a href='tel:3635'>36 35</a><br />";
			contenu += '<strong>Web</strong> : <a href="javascript:void(0)" onclick="openExternalLink(\'http://www.sncf.com\');" rel="external">http://www.sncf.com</a><br />';
			contenu += '<br />Service des bagages<br />36 av Jean Jaur&egrave;s<br />71100 CHALON SUR SAONE<br /><br />T&eacute;l. : <a href="0385446163">03 85 44 61 63</a>';
			contenu += '</p>';
			self.initMap();
			self.setMarker('46.7820373419', '4.84282349782', 'Gare SNCF', contenu, 'GARE', 1);
			setMarqueur('plan::point::' + encodeURI('Gare SNCF'));
			$('#loading').hide();
		}else if( id_category == "AERODROME" ){
			// Exception pour l'aerodrome
			var contenu = "<p>";
			contenu += "<strong>T&eacute;l&eacute;phone</strong> : <a href='tel:0385461448 '> 03 85 46 14 48 </a><br />";
			contenu += "<strong>Fax</strong> : <a href='tel:0385464756 '>03 85 46 47 56</a><br />";
			contenu += '<br />Route Nationale 6<br />71530 CHAMPFORGEUIL';
			contenu += '</p>';
			self.initMap();
			self.setMarker('46.82669827992615', '4.826903343200684', 'A&eacute;rodrome du Grand Chalon', contenu, 'AERODROME', 1);
			setMarqueur('plan::point::' + encodeURI('Aérodrome du Grand Chalon'));
			$('#loading').hide();
		}else if( id_category == "TAXI" ){
			nav_object.load_a_new_page('pre_maps.html', function(){
				self.getElementInCategory('TAXI');				 
			},1);
		}else{
			var query = "table=plan&id_categorie=" + id_category;
			nav_object.load_a_new_page('maps.html', function(){
			self.initMap();
			$.ajax({
				 url: ajax_url,
				 dataType: 'json',
				 data: query,
				 success: function(data){
					if( data.points ){
						/*$('#pre_plan h1').text(categorie_name);
						self.setTitleHeight();*/
						self.setUserPosition();
						$.each(data.points, function(i, poi) {
							
							$.ajax({
								 url: ajax_url,
								 dataType: 'json',
								 data: "table=plan&id_point=" + poi.id_point,
								 success: function(item){
									var point = item.point;
									var contenu = "<p>";
									if( point.telephone ) contenu += "<strong>T&eacute;l&eacute;phone</strong> : <a href='tel:" + point.telephone + "'>" + point.telephone + "</a><br />";
									if( point.fax ) contenu += "<strong>Fax</strong> : <a href='tel:" + point.fax + "'>" + point.fax + "</a><br />";
									if( point.email ) contenu += "<a href='mailto:" + point.email + "'>Envoyer un email</a><br />";
									if( point.web ) contenu += '<a href="javascript:void(0)" onclick="openExternalLink(\'' + point.web + '\');" rel="external">Voir le site internet</a><br />';
									if( point.description ) contenu +=  point.description;
									contenu += '</p>';
									self.setMarker(point.lat, point.lng, point.nom, contenu, poi.id_point, 0);
									setMarqueur('plan::point::' + encodeURI(point.nom));
									$('#loading').hide();
								}
							});
										
							/*if( show_points == 1 ){
								self.getPOI(item.id_point,1);
							}else if( show_points == 2 ){
								self.getPOI(item.id_point,2);
							}
							self.setUserPosition();*/
						
						});
						
						$('#loading').hide();
						
						/*setTimeout( function(){ $('.page[role=main] #map-selector-container').addClass('noEve');
							$('#map-selector-container').tappable( function(){
								$('#loading').show(); 
								nav_object.load_a_new_page('pre_maps.html', function(){
									setTimeout( function(){ 
										$('body').mapIt(); self.getElementInCategory(id_category); 
										nav_object.set_back_button( function(){
											nav_object.go_home();
											$('#deplacement_overlay, #deplacement_selection').show();
										});											 
									}, 500);												
								}, 1);
							});
						}, 500 );*/
					}
					if( id_category == 'HAND' ){
						setTimeout( function(){
							map.panTo( new google.maps.LatLng(user_lat,user_lng) );
							map.setZoom(16);
						}, 3000);
					} 
				 }
			});
		 },1);
		}
	}
	
	
	
	mapIt.prototype.getPOI = function(id_poi,close_block,callback_back_button){
		$('#loading').show();
		nav_object.load_a_new_page('maps.html', function(){
			setTimeout( function(){
				if( !map ) 
					self.initMap();
				$.ajax({
					 url: ajax_url,
					 dataType: 'json',
					 data: "table=plan&id_point=" + id_poi,
					 success: function(item){
						var point = item.point;
						var contenu = "<p>";
						if( point.telephone ) contenu += "<strong>T&eacute;l&eacute;phone</strong> : <a href='tel:" + point.telephone + "'>" + point.telephone + "</a><br />";
						if( point.fax ) contenu += "<strong>Fax</strong> : <a href='tel:" + point.fax + "'>" + point.fax + "</a><br />";
						if( point.email ) contenu += "<a href='mailto:" + point.email + "'>Envoyer un email</a><br />";
						if( point.web ) contenu += '<a href="javascript:void(0)" onclick="openExternalLink(\'' + point.web + '\');" rel="external">Voir le site internet</a><br />';
						if( point.description ) contenu += '<br />' + point.description;
						contenu += '</p>';
						if( close_block ){
							self.setMarker(point.lat, point.lng, point.nom, contenu, id_poi, 0);
						}else
							self.setMarker(point.lat, point.lng, point.nom, contenu, id_poi, 1);
						setMarqueur('plan::point::' + encodeURI(point.nom));
						$('#loading').hide();
					}
				});
				
				if( callback_back_button ){
					nav_object.set_back_button( function(){
						callback_back_button();			  
					});
				}else{				
					nav_object.set_back_button( function(){
						nav_object.prev_page();
						nav_object.set_back_button( function(){ self.getElementInCategory(parent_cat,0); });			  
					});
				}
					
			}, 1200);
		},1);
	}
	
	//rajouter idmarker pour pouvoir les supprimer un à un
	mapIt.prototype.setMarker = function(lattitude,longitude, nom, contenu, id_category, open_window){
		  
		  // Exception pour les parkings, différence d'icone en cas de parking gratuit.
		  var icon = new google.maps.MarkerImage("images/marker.png");
		  if( nom.search(/.+Gratuit.+/gi) != -1 )
		  	icon = new google.maps.MarkerImage("images/marker_vert.png");
		  
		  var coords = new google.maps.LatLng(lattitude,longitude);
		  var marker = new google.maps.Marker({ position: coords, title: nom, icon : icon });
		  marker.setMap(map);
		  polyline.setMap(null);
		  
		  self.closeInfoBox();
		  
		  var contentString =  '<div style="text-align:left; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#e0e0e0) ); border-radius:5px; border:1px solid #CCC; border-top:0; padding:10px; margin-top:10px;">'+
		  '<h2 style="font-size:16px; color:#333; font-weight:bold; margin-bottom:10px;">' + nom + '</h2>'+		  
		  contenu +
		  '<a href="javascript:map_object.traceDirections(' + lattitude + ',' + longitude + ',1)" class="icon-directions-drive"> </a>' +
		  '<a href="javascript:map_object.traceDirections(' + lattitude + ',' + longitude + ',0)" class="icon-directions-walk"> </a>' +
		  '<p style="clear:both;"></p></div>';
		  
		  var myOptions = {
                 content: contentString
                ,disableAutoPan: false
				,pixelOffset: new google.maps.Size(-100, 0)
                ,maxWidth: 200
                ,zIndex: null
				,boxStyle: { background: "url('images/maps_tooltip_top.png') top center no-repeat", width:"200px" }
                ,closeBoxMargin: "12px 2px 2px 2px"
                ,closeBoxURL: "images_2x/close_infobox.png"
                ,infoBoxClearance: new google.maps.Size(50, 50)
                ,isHidden: false
                ,pane: "floatPane"
                ,enableEventPropagation: false
        	};
		  var ib = new InfoBox(myOptions);
       	  infoBoxArray.push(ib);
		  
		  google.maps.event.addListener(marker, "mouseup", function() { self.closeInfoBox(); ib.open(map, marker); map.setCenter(coords); });		  
		  
		  if( open_window ){ 
		  		ib.open(map, marker);
				self.closeBlock();
				/*var bounds = new google.maps.LatLngBounds();
				bounds.extend(coords);
				map.fitBounds(bounds);*/
		  }
		  //markersArray[id_category].push(marker);
	}
	
	mapIt.prototype.activeCheckbox = function(id_category){
		$('#poi-list li input[type=checkbox]').on(TRIGGER_EVENT, function(event){
			event.preventDefault();
			event.stopPropagation();
			
			if( $(this).hasClass('active') ){
				$(this).attr('checked','');
				$(this).removeClass('active');
			}else{
				//self.getElementInCategory(id_category);
				$(this).attr('checked','checked');	
				$(this).addClass('active');
			}
		});
	}
	
	
	mapIt.prototype.traceDirections = function(lat, lng, drive){
		self.closeInfoBox();
		var travel_mode;
		if( drive)
			travel_mode = google.maps.DirectionsTravelMode.DRIVING;
		else
			travel_mode = google.maps.DirectionsTravelMode.WALKING;
		direction = new google.maps.DirectionsRenderer({
			map   : map
		});
		origin      = new google.maps.LatLng(user_lat,user_lng);
		destination = new google.maps.LatLng(lat,lng); // Le point d'arrivé
		if(origin && destination){
			var request = {
				origin      : origin,
				destination : destination,
				travelMode  : travel_mode // Type de transport
			}
			var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
			
			polyline = new google.maps.Polyline({ 
				path: [], 
				strokeColor: '#439aac', 
				strokeWeight: 3 
			}); 
			polyline.setMap(null);
			
			/*var coords = new google.maps.LatLng(user_lat,user_lng);
			var icon = new google.maps.MarkerImage("");
			var marker = new google.maps.Marker({ position: coords, icon : icon });
			marker.setMap(map);*/
			
			directionsService.route(request, function(result, status){ // Envoie de la requête pour calculer le parcours
				if(status == google.maps.DirectionsStatus.OK){
					var bounds = new google.maps.LatLngBounds(); 
					var path = result.routes[0].overview_path; 
					var legs = result.routes[0].legs; 
					for (i=0;i<legs.length;i++) { 
						var steps = legs[i].steps; 
						for (j=0;j<steps.length;j++) { 
							var nextSegment = steps[j].path; 
							for (k=0;k<nextSegment.length;k++) { 
								polyline.getPath().push(nextSegment[k]); 
								bounds.extend(nextSegment[k]); 
							} 
						} 
					} 
					polyline.setMap(map); 
					map.fitBounds(bounds); 
				}
			});
			
			// Affichage du temps de marche
			if( user_lat && user_lng ){
				if( drive ){
					var heure = '';
					$.getJSON("http://maps.googleapis.com/maps/api/distancematrix/json?origins=" + user_lat + ',' + user_lng + "&destinations=" + lat + ',' + lng + "&mode=driving&language=fr-FR&sensor=true", 
						function(data){
							heure = data.rows[0].elements[0].distance.text;
							var contentString =  '<div style="text-align:left; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#e0e0e0) ); border-radius:5px; border:1px solid #CCC; border-top:0; padding:10px; margin-top:10px;">' + '<strong style="font-weight:bold">Distance</strong> : ' + heure + '</div>';
							var myOptions = {
								 content: contentString
								,disableAutoPan: false
								,pixelOffset: new google.maps.Size(-100, 0)
								,maxWidth: 100
								,zIndex: null
								,boxStyle: { background: "url('images/maps_tooltip_top.png') top center no-repeat", width:"200px" }
								,closeBoxMargin: "12px 2px 2px 2px"
								,closeBoxURL: "images_2x/close_infobox.png"
								,infoBoxClearance: new google.maps.Size(50, 50)
								,isHidden: false
								,pane: "floatPane"
								,enableEventPropagation: false
							};
						  var ib = new InfoBox(myOptions);
						  infoBoxArray.push(ib);
						  google.maps.event.addListener(user_position_marker, "mouseup", function() { ib.open(map, user_position_marker); });		  
						  ib.open(map, user_position_marker);
					   }
					);						
				}else{
					var heure = '';
					$.getJSON("http://maps.googleapis.com/maps/api/distancematrix/json?origins=" + user_lat + ',' + user_lng + "&destinations=" + lat + ',' + lng + "&mode=walking&language=fr-FR&sensor=true", 
						function(data){
							heure = data.rows[0].elements[0].duration.text;
							var contentString =  '<div style="text-align:left; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#e0e0e0) ); border-radius:5px; border:1px solid #CCC; border-top:0; padding:10px; margin-top:10px;">' + '<strong style="font-weight:bold">Temps de marche estim&eacute;</strong> : ' + heure + '</div>';
							var myOptions = {
								 content: contentString
								,disableAutoPan: false
								,pixelOffset: new google.maps.Size(-100, 0)
								,maxWidth: 100
								,zIndex: null
								,boxStyle: { background: "url('images/maps_tooltip_top.png') top center no-repeat", width:"200px" }
								,closeBoxMargin: "12px 2px 2px 2px"
								,closeBoxURL: "images_2x/close_infobox.png"
								,infoBoxClearance: new google.maps.Size(50, 50)
								,isHidden: false
								,pane: "floatPane"
								,enableEventPropagation: false
							};
						  var ib = new InfoBox(myOptions);
						  infoBoxArray.push(ib);
						  google.maps.event.addListener(user_position_marker, "mouseup", function() { ib.open(map, user_position_marker); });		  
						  ib.open(map, user_position_marker);
					   }
					);	
				}
			}
			
			
		}
		
	}
	
	mapIt.prototype.getDistance = function(lat, lng){
		if( user_lat && user_lng ){
			//"http://maps.googleapis.com/maps/api/distancematrix/json?origins=" + user_lat + ',' + user_lng + "&destinations=" + lat + ',' + lng + "&mode=walking&language=fr-FR&sensor=true"
			$.getJSON("test.html", 
				function(data){
					return data.rows[0].elements[0].duration.text;
			   }
			);	
		}
	}
	
	mapIt.prototype.showOverlay = function(){
		//$('body').prepend('<div style="position:absolute; z-index:99; width:40px; background-color:#fff;">test</div>');
	}
	
	mapIt.prototype.closeInfoBox = function(){
		if (is_array(infoBoxArray) && infoBoxArray.length > 0) {
			for (i in infoBoxArray) {
				if( typeof(infoBoxArray[i]) == "object")
					infoBoxArray[i].close();
			}
		}
	}
	
	mapIt.prototype.removeAllMarkers = function(){
		  if (markersArray) {
			  for (i in markersArray) {
				  markersArray.setMap(null);
			  }
			  markersArray.length = 0;
		  }
	}
	
	mapIt.prototype.removeCategoryMarkers = function(id_category){
		  if (markersArray[id_category]) {
			  for (i in markersArray[id_category]) {
				  markersArray[id_category][i].setMap(null);
			  }
			  markersArray[id_category].length = 0;
		  }
	}
	
	mapIt.prototype.showMarkers = function(id_category) {
		  if (markersArray[id_category]) {
			  for (i in markersArray[id_category]) {
				  markersArray[id_category][i].setMap(map);
			  }
		  }
	}
	
	mapIt.prototype.setUserPosition = function(){
		  var coords = new google.maps.LatLng(user_lat,user_lng);
		  var icon = new google.maps.MarkerImage("images/marker_bleu.png");
		  user_position_marker = new google.maps.Marker({ position: coords, icon : icon });
		  user_position_marker.setMap(map);
	}
	
	mapIt.prototype.updateUserPosition = function(){
		userPosition();
		var latlng = new google.maps.LatLng(user_lat, user_lng);
    	if( user_position_marker && user_lat )
			user_position_marker.setPosition(latlng);	
	}
	
	mapIt.prototype.initialize = function(id_point, lat, lng, drive,callback_back_button) {
		  if(user_position_interval)
			  clearInterval(user_position_interval);
		  
		  user_position_interval = setInterval( function(){ self.updateUserPosition() }, 5000 ); 
		  
		  markersArray = [];
		  infoBoxArray = [];
		  	
		  directionsDisplay = new google.maps.DirectionsRenderer();
		  
		  self.activeCheckbox();
		
		  $('.gmnoprint').css('margin-top','60px');
		
		  if( id_point == "SIMPLE_INIT"){
		  	setTimeout( function(){
				self.initMap(1);
				$('#loading').hide();
				$('#map-selector-container').show();
				$('#map-selector-container').tappable( function(){
					$('#loading').show();
					nav_object.load_a_new_page('pre_maps.html', function(){
						self.getElementInCategory(0,0);
		  				self.activeCheckbox();
						map = null;
					}, 1);
				});
			}, 1000);
		  }else if( id_point ){
		  	setTimeout( function(){
				map = null;
				self.getPOI(id_point, 1,callback_back_button);
				setTimeout( function(){ self.traceDirections(lat, lng, drive); }, 1500);
			}, 1000);
		  }else{
		  	self.getElementInCategory(0,0);
		  	self.activeCheckbox();
		  }
		  
	}
	
	mapIt.prototype.initMap = function(user_position){
		var myLatlng = new google.maps.LatLng(46.780556, 4.852778);
		if( user_lat && user_lng )
			   var myLatlng = new google.maps.LatLng(user_lat, user_lng);
		
		var myOptions = {
		  zoom: 14,
		  center: myLatlng,
		  mapTypeId: google.maps.MapTypeId.ROADMAP,
		  zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.TOP_LEFT
			}
		}
		
		/*$('#plan .header').css('width', WINDOW_WIDTH);
		$('#map_canvas').css('height', WINDOW_HEIGHT);
		$('#map-container').css('width', WINDOW_WIDTH);
		$('#map-container').css('height', WINDOW_HEIGHT);*/
		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		
		self.setUserPosition();
			
	}
	
	/*function loader() {
		  var state = document.readyState;
		  if (state == 'loaded' || state == 'complete') {
			  run();
		  } else {
			  if (navigator.userAgent.indexOf('Browzr') > -1) {
				  setTimeout(run, 250);
			  } else {
				  document.addEventListener('deviceready',run,false);
			  }
		  }
	}*/
	
		
	mapIt.prototype.openBlock = function(){
		 if( !$('#map-selector-header').hasClass('map-selector-header-open') ){
			 $('#map-selector-header').addClass('map-selector-header-open');
			 $('#map_window').animate({ top: '-=240px', useTranslate3d:true, leaveTransforms:true}, function(){
				  $('#delete-poi').show();
			 });
		 }
	}
	
	mapIt.prototype.closeBlock = function(){
		  if( $('#map-selector-header').hasClass('map-selector-header-open') ){
			  $('#delete-poi, #back-poi-list').hide();
			  $('#map-selector-header').removeClass('map-selector-header-open');
			  $('#map_window').animate({ top: '+=240px', useTranslate3d:true, leaveTransforms:true});
			  return false;
		  }
	}
	
	function mapIt(id_point, lat, lng, drive, callback_back_button) {
		self = this;
		
		self.initialize(id_point, lat, lng, drive, callback_back_button);
		//self.activeSwipe();
		/*$('#delete-poi').off().on(BUTTON_TRIGGER_EVENT, function(event){
			event.preventDefault();
			event.stopPropagation();
			self.initialize();
			self.closeBlock();
		});*/
		//this.bindCorner(0);		
		
	}
	
	$.fn.mapIt = function (id_point, lat, lng, drive, callback_back_button) {
		map_object = new mapIt(id_point, lat, lng, drive, callback_back_button);
		
	}
	

 })( jQuery );

(function($) {

	var url = "";
	var map;
	var markersArray = [];
	var infoBoxArray = [];
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
	var self;
	var user_position_marker; 
	var user_coords;
	var direction;
	var polyline = [];
	var current_id_point;

	
	works.prototype.getElementInCategory = function(id_category){
		var self = this;
		var cat='';
		if( id_category ) cat = id_category;
		$.ajax({
			 url: ajax_url,
			 dataType: 'json',
			 data: "table=travaux&id_categorie=" + cat,
			 success: function(data){
				$.each(data.points, function(i, item) {
					var contentString =  '<div style="text-align:left; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#e0e0e0) ); border-radius:5px; border:1px solid #CCC; border-top:0; padding:10px; margin-top:10px;">'+
					'<h2 style="font-size:16px; color:#333;  margin-bottom:10px;">' + item.nom + '</h2>';		  
					
					if( item.vignette ){
						contentString += '<img src="' + item.vignette + '" style="width:175px;" /><br />';
						contentString += '<a href="javascript:travaux_object.getWorks(' + item.id_point + ',\'photos\')" class="travaux-photos"> </a>';
					}
					
					if( item.video )
						contentString += '<a href="javascript:travaux_object.getWorks(' + item.id_point + ',\'video\')" class="travaux-video"> </a>';
					
					contentString += '<a href="javascript:travaux_object.getWorks(' + item.id_point + ',\'infos\')" class="travaux-infos"> </a>' +
							  '<p style="clear:both;"></a></div>';
					
					self.setMarker(item.lat, item.lng, item.vecteurs, item.nom, contentString, item.id_point, item.vignette, 0);
				});
			 }
		});
	}
	
	works.prototype.getPOI = function(id_point){
		infoBoxArray[id_point].open(map, markersArray[id_point]);
	}
	
	works.prototype.getWorks = function(id_point, element){
		nav_object.destroyMap();
		var self = this;
		current_id_point = id_point;
		nav_object.load_a_new_page('travaux_details.html', function(){ 
			$.ajax({
				 url: ajax_url,
				 dataType: 'json',
				 data: "table=travaux&id_point=" + id_point,
				 success: function(item){
					travaux = item.point;
					
					var html ='';
					html += '</a><h2>' + travaux.nom + '</h2>';
					html += '<a name="travaux_infos"><h3>Informations</h3>';
					html += travaux.descr + '<br /><br />';
					if( travaux.photos ){
						html += '<a name="travaux_photos"><h3>Photos</h3>';
						$.each(travaux.photos, function(i, img) {
							html += '<img src="' + img + '" style="width:100%;"	/><br />';					 
						});
					}
					html += '<br /><br />';
					
					setMarqueur('travaux::' + encodeURI(travaux.nom) );
					
					if( travaux.video ){
						html += '<a name="travaux_video"><h3>Vid&eacute;o</h3>';
						html +=  '<video width="420" height="315" src="' + travaux.video + '" controls> </video><br /><br />';
						//html += travaux.video + '<br /><br />';
					}
					$('#travaux_details .content').html(html);
					$('#travaux_details .content a').attr('rel','external');
					nav_object.set_back_button( function(){
						nav_object.prev_page();
						self.initialize(travaux.lat, travaux.lng);
						setTimeout( function(){
							//self.initialize(travaux.lat, travaux.lng);
							nav_object.set_back_button( function(){ nav_object.go_home(); } );
						}, 500);
						//setTimeout( function(){ nav_object.set_back_button( function(){ nav_object.go_home(); }) });
					});
					
				}
			});
		}, 1);
	}
	
	//rajouter idmarker pour pouvoir les supprimer un à un
	works.prototype.setMarker = function(lattitude, longitude, vectors, nom, contenu, id_point, vignette, open_window){
		  var coords = new google.maps.LatLng(lattitude,longitude);
		  var icon = new google.maps.MarkerImage("images/marker_works.png");
		  markersArray[id_point] = new google.maps.Marker({ position: coords, title: nom, icon : icon });
		  markersArray[id_point].setMap(map);
		 
		  self.closeInfoBox();
		  
		  var contentString = contenu;
		  
		  var myOptions = {
                 content: contentString
                ,disableAutoPan: false
				,pixelOffset: new google.maps.Size(-100, 0)
                ,maxWidth: 200
                ,zIndex: null
				,boxStyle: { background: "url('images/maps_tooltip_top.png') top center no-repeat", width:"200px" }
                ,closeBoxMargin: "12px 2px 2px 2px"
                ,closeBoxURL: "images_2x/close_infobox.png"
                ,infoBoxClearance: new google.maps.Size(1, 1)
                ,isHidden: false
                ,pane: "floatPane"
                ,enableEventPropagation: false
        	};
		  var ib = new InfoBox(myOptions);
       	  infoBoxArray[id_point] = ib;
		  google.maps.event.addListener(markersArray[id_point], 'mouseup', function() { self.closeInfoBox();  ib.open(map, markersArray[id_point]); map.setCenter(coords) });		  
		  if( open_window ){ 
		  		ib.open(map, marker);
		  }
			if(vectors){
				 var vectors_array = [];
				 vectors_array.push(new google.maps.LatLng(lattitude, longitude));
				 var tabPoints = vectors.toString().split(';');
				  
				  for( var i in tabPoints){
						var tabCoord = tabPoints[i].toString().split(",");
						vectors_array.push(new google.maps.LatLng(tabCoord[1], tabCoord[0]));
				  }
				  polyline[id_point] = new google.maps.Polyline({ 
					path: vectors_array, 
					strokeColor: '#FF0000', 
					strokeWeight: 3 
				  }); 
				  polyline[id_point].setMap(map);
			}
	}
	
	works.prototype.closeInfoBox = function(){
		if (is_array(infoBoxArray) && infoBoxArray.length > 0) {
			for (i in infoBoxArray) {
				if( typeof(infoBoxArray[i]) == "object")
					infoBoxArray[i].close();
			}
		}
	}
	
	works.prototype.removeAllMarkers = function(){
		  if (markersArray) {
			  for (i in markersArray) {
				  markersArray.setMap(null);
			  }
			  markersArray.length = 0;
		  }
	}
	
	works.prototype.removeCategoryMarkers = function(id_category){
		  if (markersArray[id_category]) {
			  for (i in markersArray[id_category]) {
				  markersArray[id_category][i].setMap(null);
			  }
			  markersArray[id_category].length = 0;
		  }
	}
	
	works.prototype.showMarkers = function(id_category) {
		  if (markersArray[id_category]) {
			  for (i in markersArray[id_category]) {
				  markersArray[id_category][i].setMap(map);
			  }
		  }
	}
	
	works.prototype.getUserPosition = function(){
		var coords = new google.maps.LatLng(user_lat,user_lng);
		var icon = new google.maps.MarkerImage("images/marker_bleu.png");
		user_position_marker = new google.maps.Marker({ position: coords, icon : icon });
		user_position_marker.setMap(map);
	}
	
	works.prototype.updateUserPosition = function(){
		userPosition();
		var latlng = new google.maps.LatLng(user_lat, user_lng);
    	if( user_position_marker && user_lat )
			user_position_marker.setPosition(latlng);	
	}
	
	works.prototype.initialize = function(lat, lng) {
		  var self = this;
		  markersArray = [];
		  infoBoxArray = [];
		  
		  var myLatlng = new google.maps.LatLng(user_lat, user_lng);
		  var zoom = 15;
		  
		   if( lat && lng ){
			    myLatlng = new google.maps.LatLng(lat, lng);
		  		zomm = 13;
		   }
		   
		  if(user_position_interval)
			  clearInterval(user_position_interval);
		  
		  user_position_interval = setInterval( function(){ self.updateUserPosition() }, 5000 );
		  
		  //var myLatlng = new google.maps.LatLng(46.780556, 4.852778);
		  var myOptions = {
			  zoom: 15,
			  center: myLatlng,
			  mapTypeId: google.maps.MapTypeId.ROADMAP,
			  zoomControl: true,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.LARGE,
					position: google.maps.ControlPosition.TOP_LEFT
				}
		  }
		 
		  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		  
		 
		  
		  self.getElementInCategory(0);
		  self.getUserPosition();
		  
		  directionsDisplay = new google.maps.DirectionsRenderer();
		  
		  $('.gmnoprint').css('margin-top','60px');
		  $('#loading').hide();
	}
	
	works.prototype.getCategory = function(id_category){
		  $.ajax({
			 url: url,
			 dataType: 'json',
			 data: "id_category=" + id_category,
			 success: function(data){
				$.each(data, function(i, item) {
					   var elm = $('<li></li>').html(item.nom);
					   if(item.children > 0) elm.on(TRIGGER_EVENT,function(event){ this.getCategory(item.id_category); });
					   elm.appendTo('#poi-list');
				});
			 }
	  });
	}
	
	function works() {
		self = this;
		self.initialize();
		$('#delete-poi').off().on(BUTTON_TRIGGER_EVENT, function(event){
			event.preventDefault();
			event.stopPropagation();
			self.initialize();
			self.closeBlock();
		});
		setMarqueur('travaux');
		//this.bindCorner(0);	
		
		/// Travaux BHNS 
		$('.button_bhns').tappable( function(){
			nav_object.load_a_new_page('bhns2.html', function(){ 
				setTimeout( function(){ 
					$('body, .page').addClass('scrollable'); 
					nav_object.set_back_button( function(){ nav_object.prev_page(); self.initialize();  });
				},500) }, 1);											 
		});
		
	}
	
	$.fn.works = function () {
		travaux_object = new works($(this));
	}
 
 })( jQuery );

(function($) {
	var self;
	var map;
	var parent_categorie = new Array();
	var latitude;
	var longitude;
	var directionsDisplay;
	var my_latitude;
	var my_longitude;
	
	var user_position_marker; 
	var user_coords;
	var direction;
	var polyline = new google.maps.Polyline();
	var parent_cat = 0;
	var current_cat = 0;
	
	tourisme.prototype.ajaxQuery = function(id_categorie, firstStart, searchValue){
		$(window).scrollTop(0);
		$('.tourisme_liste').html('');
		var query = "table=tourisme&id_categorie=" + id_categorie;
		if( searchValue )
			query = "table=tourisme&recherche=" + searchValue
		$.ajax({ url: ajax_url, dataType: 'json',
			data: query,
			success: function(data){
				if(data.points){
					$.each(data.points, function(i, item) {
						var elem = $('<li></li>').html(item.nom);
						
						if( item.type == "categorie" ){
							elem.tappable(function(){ self.getElementInCategory(item.id_categorie,0);  setMarqueur('tourisme::' + item.nom); });
							
						}else {
							var vignette = '';
							if( item.vignette !== "null" && item.vignette !== ""  && item.vignette !== null )
								vignette = '<img src="' + item.vignette + '" />';
							
							if( id_categorie !== "314" )
								elem.html('<p class="vign">' + vignette + '</p><p><span>' + item.nom + '</span><br />' + item.descr.substr(0,90) + '...</p><p class="clear"></p>');
							else
								elem.html('<p class="vign">' + vignette + '</p><p><span>' + item.nom + '</span></p><p class="clear"></p>');
							elem.addClass('point');
							elem.tappable( function(){ self.showService(item.id_point); });
						}
							elem.appendTo('.tourisme_liste');
					});
					if( id_categorie ){
						
						current_cat = id_categorie;
						parent_cat = parent_categorie[parent_categorie.length-2];
						
						/*** BACK BUTTON ***/
						if( parent_cat ) 
							nav_object.set_back_button( function(){ parent_categorie.pop(); parent_categorie.pop(); self.getElementInCategory(parent_cat,0); });
						else{
							nav_object.set_back_button( function(){ self.getElementInCategory(0); nav_object.set_back_button(function(){nav_object.go_home()}); });
							parent_cat = 0;
						}
						
						
						//$('#tourisme .back_button_noauto').show();
						$('#tourisme h1').html(data.courant.nom);	
						self.setTitleHeight('#tourisme h1');
						$('.tourisme_liste').animate({ left : '-=480px', useTranslate3d:true, leaveTransforms:false }, 500, "linear", function(){ });
						//$('.tourisme_liste').css('margin-top' , '0%' );
					}
					else if( !searchValue ){
						$('#tourisme .back_button_noauto').hide();
						var elem = $('<li></li>').html("H&eacute;bergement");
						elem.tappable( function(event){  event.preventDefault(); event.stopPropagation(); self.loadCommerce(3001);  setMarqueur('commerce::Hébergement'); });
						elem.appendTo('.tourisme_liste');
						
						var elem = $('<li></li>').html("Restauration");
						elem.tappable( function(event){  event.preventDefault(); event.stopPropagation(); self.loadCommerce(3002);  setMarqueur('commerce::Restauration'); });
						elem.appendTo('.tourisme_liste');	
						nav_object.set_back_button(function(){nav_object.go_home()});
					}else if( searchValue ){
						$('#tourisme h1').text('Recherche').css('font-size', '2.8em');
						$('#tourisme .back_button_noauto').show();
						nav_object.set_back_button( function(){  self.getElementInCategory(0,0); });
					}
					if( !id_categorie && !firstStart )
						$('.tourisme_liste').animate({ left : '-=480px', useTranslate3d:true, leaveTransforms:false }, 500, "linear", function(){ });
				}else{
					var elem = $('<li></li>').html('Aucun r&eacute;sultat');
					elem.appendTo('.tourisme_liste');
				}
				$('#loading').hide();
			}
		});
	}
	
	tourisme.prototype.getElementInCategory = function(id_categorie, firstStart){
		$('#loading').show();
		$('#tourisme h1').text('');
		$(window).scrollTop(0);
		
		if( id_categorie ){
			$('.tourisme_liste').animate({ left:'+=480px', useTranslate3d:true, leaveTransforms:true }, 500, "linear", function(){
				self.ajaxQuery(id_categorie,0,0);
				parent_categorie.push(id_categorie);				
			});
			/*$('.tourisme_liste').addClass('slideDown');
			setTimeout(function(){
				self.ajaxQuery(id_categorie,0,0);
				parent_categorie.push(id_categorie);
				$('.tourisme_liste').removeClass('slideDown');
			}, 600);*/

		}else{
			parent_categorie = [0];
			if( firstStart )
				self.ajaxQuery(0,1,0);
			else{
				$('.tourisme_liste').animate({ left:'+=480px', useTranslate3d:true, leaveTransforms:true}, 500, "linear", function(){
					self.ajaxQuery(id_categorie,0,0);
					parent_categorie.push(id_categorie);				
				});	
			}
			$('#tourisme h1').text('Tourisme');	
			self.setTitleHeight('#tourisme h1');
		}
		
		if( firstStart ){
			$('#tourisme_liste').css('margin-top','100px');
		}
	}
	
	tourisme.prototype.searchIt = function(value){
		$(window).scrollTop(0);
		$('#loading').show();
		$('#search_results_mention').show();
		$.ajax({ url: ajax_url, dataType: 'json',
			data: "table=tourisme&value=" + value,
			success: function(data){
				$.each(data, function(i, item) {
					var elem = $('<li></li>').html(item.nom)
					.tappable( function(){ self.showServices(item.id_point); });
					elem.appendTo('#tourisme_categories');
				});
				$('#loading').hide();
			}
		});
	}
	
	tourisme.prototype.showService = function(id_point){
		$(window).scrollTop(0);
		$('#loading').show();
		nav_object.load_a_new_page('fiche_tourisme.html', function(){ 
			
			$('#tourisme_categories').html();
			$.ajax({ url: ajax_url, dataType: 'json',
				data: "table=tourisme&id_point=" + id_point,
				success: function(data){
					var item = data.point;
					$('#tourisme_details .header h1').text('Tourisme');
					$('#tourisme_details .header h1').css('font-size','2.8em');
					
					var addr = item.adresse + '<br />' + item.cp + ' ' + item.ville;
					$('#tourisme_description .description').html(item.descr + '<br /><br />' + item.horaires);
					$('#tourisme_description h2').text(item.nom);
					$('#tourisme_description .adresse').html(addr);
					
					var coord = '';
					if(item.telephone) coord += '<strong>T&eacute;l&eacute;phone</strong> : <a href="telephone:' + item.telephone + '">' + item.telephone + '</a><br />';
					if(item.fax) coord += '<strong>Fax</strong> : <a href="' + item.fax + '">' + item.fax + '</a><br />';
					if(item.email) coord += '<strong>Email</strong> : <a href="mailto:' + item.email + '">' + item.email + '</a><br />';
					if(item.web) coord += '<strong>Web</strong> : <a href="javascript:void(0)" onclick="openExternalLink(\'' + item.web + '\');" rel="external">' + item.web + '</a><br />';
					if(item.coord) coord += item.coord;				
					$('#tourisme_description .coordonnees').html(coord);
					
					self.getDistance(item.lat, item.lng);
					
					self.setGallery( item.photos);
					
					$('.icon-directions-drive').off().tappable( function(){ 
						$('#loading').show();
						$('body').mapIt(item.id_point, item.lat, item.lng, 1, function(){
							nav_object.prev_page(); 
							setTimeout(function(){ self.setMap(item.lat, item.lng); $('#loading').hide(); }, 1000);
							nav_object.set_back_button( function(){ nav_object.prev_page(); parent_categorie.pop(); self.getElementInCategory(current_cat,0); } );
						});
					});
					$('.icon-directions-walk').off().tappable( function(){ 
						$('#loading').show();
						$('body').mapIt(item.id_point, item.lat, item.lng, 0, function(){
							nav_object.prev_page(); 
							setTimeout(function(){ self.setMap(item.lat, item.lng); $('#loading').hide(); }, 1000);
							nav_object.set_back_button( function(){ nav_object.prev_page(); parent_categorie.pop(); self.getElementInCategory(current_cat,0); } );
						});
					});
					
					//calcul hauteur
					var h = WINDOW_HEIGHT-50-20-$('#tourisme_description').height();
					if( h < 120 ) h = 120;
					$('#tourisme_fiche_map').css('height', h + 'px');
					//setTimeout(function(){ self.setMap(item.lat, item.lng) }, 2000);
					
					$('#loading').hide();
					setMarqueur('tourisme::point::' + item.nom);
				}
			});
			
			setTimeout( function(){
				nav_object.set_back_button( function(){
					nav_object.prev_page();
					nav_object.set_back_button( function(){ 
						parent_categorie.pop(); parent_categorie.pop()
						self.getElementInCategory(parent_cat,0); 
					});			  
				});
			}, 500);
			
		}, 1);
	}
	
	tourisme.prototype.setGallery = function(arrayPhotos){
		if( arrayPhotos ){
			var html = '<ul>';
			for(i=0;i<1;i++)	{//arrayPhotos.length
				html += '<li style="background:url(' + arrayPhotos[i] + ') center center no-repeat;"> </li>';
			}
			html += '</ul>';
			$('#tourisme_diapo').html(html);
			$('#tourisme_diapo ul').css('width', (arrayPhotos.length*400) + 'px'); 
		}
	}
	
	tourisme.prototype.loadCommerce = function(id_categorie){
		$('#loading').show();
		nav_object.load_a_new_page('commerce.html', function(){
			$('body').commerce(id_categorie);												 
			//commerce_object.getElementInCategory(id_categorie, 0);
		}, 1);	
		
	}
	
	
	tourisme.prototype.getDistance = function(lat, lng){
		if( user_lat && user_lng ){
			$.getJSON("http://maps.googleapis.com/maps/api/distancematrix/json?origins=" + user_lat + ',' + user_lng + "&destinations=" + lat + ',' + lng + "&mode=driving&language=fr-FR&sensor=true", 
				function(data){
					var distance = data.rows[0].elements[0].distance.text;
					$('#tourisme_details .distance').text(distance);
			   }
			);	
		}
	}
	
	tourisme.prototype.setTitleHeight = function(elem){
		$(' .header h1').css('font-size', '2.8em');
		var h = $('.header h1').height();
		h=h+30;
		var fs = 2.8;
		while( h > 50 ){
			fs = Math.round((fs-0.1)*10)/10;
			$(' .header h1').css('font-size', fs + 'em');
			h = $(' .header h1').height();
			h=h+30;
		}
	}
	
	/*tourisme.prototype.traceDirections = function(lat, lng, drive){
		var self = this;
		polyline.setMap(null);
		if( drive)
			var travel_mode = google.maps.DirectionsTravelMode.DRIVING;
		else
			var travel_mode = google.maps.DirectionsTravelMode.WALKING;
		direction = new google.maps.DirectionsRenderer({
			map   : map
		});
		origin      = user_coords; // Le point départ
		destination = new google.maps.LatLng(lat,lng); // Le point d'arrivé
		if(origin && destination){
			var request = {
				origin      : origin,
				destination : destination,
				travelMode  : travel_mode // Type de transport
			}
			var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
			
			polyline = new google.maps.Polyline({ 
				path: [], 
				strokeColor: '#FF0000', 
				strokeWeight: 3 
			}); 
			
		
			directionsService.route(request, function(result, status){ // Envoie de la requête pour calculer le parcours
				if(status == google.maps.DirectionsStatus.OK){
					var bounds = new google.maps.LatLngBounds(); 
					var path = result.routes[0].overview_path; 
					var legs = result.routes[0].legs; 
					for (i=0;i<legs.length;i++) { 
						var steps = legs[i].steps; 
						for (j=0;j<steps.length;j++) { 
							var nextSegment = steps[j].path; 
							for (k=0;k<nextSegment.length;k++) { 
								polyline.getPath().push(nextSegment[k]); 
								bounds.extend(nextSegment[k]); 
							} 
						} 
					} 
					polyline.setMap(map); 
					map.fitBounds(bounds); 
				}
			});
		}
		
	}*/
	
	tourisme.prototype.activeSearch = function(){
		var s = $('#seach_form_tourisme .search_input').val();
		if( strlen(s) > 3 ){
			$('#loading').show();
			$('#seach_form_tourisme .search_input').blur();
			self.ajaxQuery(0, 1, s);	
		}else newAlert('Veuillez entrer 3 lettres au minimum.');
		return false;
	}
	
	function tourisme() {
		self = this;
		self.getElementInCategory(0,1);
		$('#seach_form').on('submit', function(){
			self.searchIt( $('#seach_form input[type=search]').val() );
			return false;
		});
		$('#seach_form_tourisme #search_reset').on('click', function(){
			self.ajaxQuery(0, 1, 0);
			$('#seach_form_tourisme .search_input').val('');
		});
		setMarqueur('tourisme');
	}
	
	$.fn.tourisme = function () {
		tourisme_object = new tourisme($(this));
	}
	
		  
})( jQuery );

function strlen(chaine) {
	var i = 0, a = 0;

	while (chaine[i++]) {
		a++;
	}
	
	return a;
}

/*
s : il sâ€™agit de lâ€™identifiant de votre site : toutes les pages qui seront marquÃ©es avec cet identifiant seront 
rangÃ©es Ã  l'intÃ©rieur de ce site.
ï‚· p : est destinÃ©e Ã  donner un libellÃ© de page : cela permet de reconnaÃ®tre la page dans vos analyses 
d'audience. Seuls les caractÃ¨res a-z, A-Z, 0-9 sont autorisÃ©s avec en plus "underscore" (_), "point" (.), "slash" 
(/). Par exemple : "p=home page" nâ€™est pas correct alors que "p=home_page" convient.
Cette variable permet Ã©galement de dÃ©finir les chapitres. Il suffit de sÃ©parer tous les niveaux de chapitre par des ::.
Par exemple :
p=hotel::France::hotel_name
rangera la page "hotel_name" dans le sous-chapitre "France", lui mÃªme rangÃ© dans le chapitre "hotel".
Vous avez la possibilitÃ© de crÃ©er trois niveaux de chapitres.
*/

function setMarqueur(p){
	var src = 'http://logi242.xiti.com/hit.xiti?s=499847&s2=&p=' + p + '&idclient=' + ID_CLIENT + '&na=' + Math.floor(Math.random()*1500000) + '&ref=';
	$('<img />').attr('src', src);	
}
