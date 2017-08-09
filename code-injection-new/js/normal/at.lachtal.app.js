



















var storage = window.localStorage;
var lang;
var aktuelle_seite_zurueck;
var retour;
var online_abfrage;
var show_pan = 0;

window.addEventListener('load', function () {
    document.addEventListener("deviceready", onDeviceReady, false);
    check_language();
});
  
function onDeviceReady() {

    $.ajax({
      url: "http://www.lachtal.at/mobile/webcam/webcam_copy_crop.php"
    });

  document.addEventListener("online", onOnline, false);
  document.addEventListener("offline", onOffline, false);
  document.addEventListener("backbutton", backKeyDown, true);
  $("#progress").hide();
}
  
function onOnline() {
  online_abfrage = 1;
}
function onOffline() {
  online_abfrage = 0;
}
  
function offline() {
  if(storage.getItem("js_language_root") == 'de'){
    navigator.notification.confirm(
      'Server nicht erreichbar. Erneut versuchen?',
      offline_ok,
      'Offline',
      'Ja,Nein'
    );
  } else {
    navigator.notification.confirm(
      'A szerver nem elÃ©rheto. MegprÃ³bÃ¡lja Ãºjra?',
      offline_ok,
      'Offline',
      'Yes,No'
    );
  }
}
function offline_ok(button) {
  if(button == 1){
    goto_page($('.ui-page-active').attr('id'))
  }
}
    
storage.removeItem("js_betrieb_tel");
storage.removeItem("js_betrieb_bezeichnung");
storage.removeItem("js_gruppe_id");
storage.removeItem("js_untergruppe_id");
storage.removeItem("js_betrieb_id");
storage.removeItem("js_betrieb_gpsnord");
storage.removeItem("js_betrieb_gpsost");
storage.removeItem("js_event_gruppe_id");
     
function check_language() {
  if (storage.getItem("js_language_root") === null) {

    if (navigator && navigator.userAgent && (lang = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))) {
      storage.setItem("js_language_root", lang[1]);
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
      storage.setItem("js_language_root", lang.substr(0, 2));
    }
  }
}

function exit_app() {
  navigator.device.exitApp();
}
  
function setSprache(sprache) {
  storage.setItem("js_language_root", sprache);
  goto_page('#home');
  window.location.reload(true);
  document.addEventListener("backbutton", backKeyDown, true);
}
 
function backKeyDown() { 
  if($.mobile.activePage[0].id == 'home'){
    navigator.device.exitApp();
  } else {
    goto_page(aktuelle_seite_zurueck, true);
  }
}

function goto_page(seite, richtung) {

if(seite == 'close'){
  show_pano();
} else {


  if(richtung == true){
    richtung_zurueck = true;
  } else {
    richtung_zurueck = false;
    $("#progress").show();
  }
  if(online_abfrage == 0){
    offline();
  } else {
    $.mobile.changePage( seite, {
      reloadPage: false,
      transition: 'fade'
    });
  }
  }
}

function content_geladen(){
  $("#progress").hide();
}
 
function skiline_open(){
  window.plugins.childBrowser.openExternal('http://www.skiline.cc/');
}
 






var myScroll;

function show_pano() {
  $("#pano").toggle();
  if(show_pan == 0){
    show_pan = 1;
    aktuelle_seite_zurueck = 'close';
  } else {
    show_pan = 0;
    aktuelle_seite_zurueck = '#wetter';
  }
}



  $("#home").live('pagebeforeshow', function(){  
    $("#pano").hide();
    $("#home_sprache").empty();
    $("#home_events_daten").load('http://www.lachtal.at/mobile/load_home_events_mehrsprachig.php?lang='+storage.getItem("js_language_root"));
    
    if(storage.getItem("js_language_root") == 'hu'){
      $("#home_sprache").append('<div class="sprache" onClick="setSprache(\'de\')"><img src="images/home/de.png"></div>');
      
      $("#home_navi").html('<ul><li class="first"><a ontouchstart="goto_page(\'#information\')"><img class="btn_information" src="images/navi/information_hu.png"></a></li><li><a ontouchstart="goto_page(\'#skiberge_detail\')"><img src="images/navi/skigebiet_hu.png"></a></li><li><a ontouchstart="goto_page(\'#huetten_de\')"><img src="images/navi/skihuetten_hu.png"></a></li><li class="last"><a ontouchstart="skiline_open();"><img src="images/navi/skiline.png"></a></li></ul>');
      $("#info_navi").html('<ul><li class="first"><img class="btn_information" src="images/navi/information_hu.png"></li><li><a ontouchstart="goto_page(\'#skiberge_detail\')"><img src="images/navi/skigebiet_hu.png"></a></li><li><a ontouchstart="goto_page(\'#huetten_de\')"><img src="images/navi/skihuetten_hu.png"></a></li><li class="last"><a ontouchstart="goto_page(\'#home\',true)"><img src="images/navi/home.png"></a></li></ul>');
      $("#huetten_navi").html('<ul><li class="first"><a ontouchstart="goto_page(\'#information\')"><img src="images/navi/information_hu.png"></a></li><li><a ontouchstart="goto_page(\'#skiberge_detail\')"><img src="images/navi/skigebiet_hu.png"></a></li><li><img src="images/navi/skihuetten_hu.png"></li><li class="last"><a ontouchstart="goto_page(\'#home\',true)"><img src="images/navi/home.png"></a></li></ul>');
      
      $("#navi_skipass_tarife").load('navi_alle_hu.html');
      $("#navi_tourist").load('navi_alle_hu.html');
      $("#navi_bergbahnen").load('navi_alle_hu.html');
      $("#navi_gesucht").load('navi_alle_hu.html');
      $("#navi_wetter").load('navi_alle_hu.html');
      $("#navi_skiberge_detail").load('navi_alle_hu.html');
      $("#navi_events_liste").load('navi_alle_hu.html');
      
    } else {
      $("#home_sprache").append('<div class="sprache" onClick="setSprache(\'hu\')"><img src="images/home/hu.png"></div>');
      
      $("#home_navi").html('<ul><li class="first"><a ontouchstart="goto_page(\'#information\')"><img class="btn_information" src="images/navi/information.png"></a></li><li><a ontouchstart="goto_page(\'#skiberge_detail\')"><img src="images/navi/skigebiet.png"></a></li><li><a ontouchstart="goto_page(\'#huetten_de\')"><img src="images/navi/skihuetten.png"></a></li><li class="last"><a ontouchstart="skiline_open();"><img src="images/navi/skiline.png"></a></li></ul>');
      $("#info_navi").html('<ul><li class="first"><img class="btn_information" src="images/navi/information.png"></li><li><a ontouchstart="goto_page(\'#skiberge_detail\')"><img src="images/navi/skigebiet.png"></a></li><li><a ontouchstart="goto_page(\'#huetten_de\')"><img src="images/navi/skihuetten.png"></a></li><li class="last"><a ontouchstart="goto_page(\'#home\',true)"><img src="images/navi/home.png"></a></li></ul>');
      $("#huetten_navi").html('<ul><li class="first"><a ontouchstart="goto_page(\'#information\')"><img src="images/navi/information.png"></a></li><li><a ontouchstart="goto_page(\'#skiberge_detail\')"><img src="images/navi/skigebiet.png"></a></li><li><img src="images/navi/skihuetten.png"></li><li class="last"><a ontouchstart="goto_page(\'#home\',true)"><img src="images/navi/home.png"></a></li></ul>');
      
      $("#navi_skipass_tarife").load('navi_alle_de.html');
      $("#navi_tourist").load('navi_alle_de.html');
      $("#navi_bergbahnen").load('navi_alle_de.html');
      $("#navi_gesucht").load('navi_alle_de.html');
      $("#navi_wetter").load('navi_alle_de.html');
      $("#navi_skiberge_detail").load('navi_alle_de.html');
      $("#navi_events_liste").load('navi_alle_de.html');

    }    
  });
  $("#home").live('pageshow', function(){
    content_geladen();
    $("#home_events_daten").trigger('create');
     $("#pano_wrapper").empty();
    if(storage.getItem("js_language_root") == 'hu'){
      $("#pano_wrapper").append('<img src="images/panorama/gross_hu.jpg">');
    } else {
      $("#pano_wrapper").append('<img src="images/panorama/gross.jpg">');
    }
  });
    
  $("#information").live('pageshow', function(){
    aktuelle_seite_zurueck = '#home';
    content_geladen();
  });    
    
  $("#wetter").live('pagebeforeshow', function(){  
    $("#wetter_webcams").empty();
    $("#header_wetter").empty();
    $("#header_wetter").load('http://www.lachtal.at/mobile/load_wetter_header.php?lang='+storage.getItem("js_language_root"));
  });
  $("#wetter").live('pageshow', function(){
    aktuelle_seite_zurueck = '#information';
    $("#wetter_webcams").load('http://www.lachtal.at/mobile/load_wetter.php?lang='+storage.getItem("js_language_root"), function() {
    content_geladen();
      $('#wetter_box_slider').bxSlider({
        prevImage: 'images/wettericons/pfeil_links.png',
        nextImage: 'images/wettericons/pfeil_rechts.png'
      });
      $('#featured_webcams').orbit({
        animation: 'fade',
        animationSpeed: 800,
        timer: false,
        directionalNav: true,
        captions: true,
        captionAnimation: 'fade'
      });
    });
  });
  
  $("#huetten_de").live('pageshow', function(){
    aktuelle_seite_zurueck = '#home';
    $("#huetten_daten").empty();
    if(storage.getItem("js_language_root") == 'hu'){
      $("#huetten_daten").load('skihuetten_hu.html', function() {
      });
    } else {
      $("#huetten_daten").load('skihuetten_de.html', function() {
      });
    }
    content_geladen();
  });
  
  $("#bergbahnen").live('pageshow', function(){
    aktuelle_seite_zurueck = '#information';
    $("#bergbahnen_daten").empty();
    if(storage.getItem("js_language_root") == 'hu'){
      $("#bergbahnen_daten").load('bergbahnen_hu.html', function() {
      });
    } else {
      $("#bergbahnen_daten").load('bergbahnen_de.html', function() {
      });
    }
    content_geladen();
  });
  
  $("#tourist").live('pageshow', function(){
    aktuelle_seite_zurueck = '#information';
    $("#tourist_daten").empty();
    if(storage.getItem("js_language_root") == 'hu'){
      $("#tourist_daten").load('tourist_hu.html', function() {
      });
    } else {
      $("#tourist_daten").load('tourist_de.html', function() {
      });
    }
    content_geladen();
  });
  
  $("#skipass_tarife").live('pageshow', function(){
    aktuelle_seite_zurueck = '#information';
    $("#skipass_daten").empty();
    if(storage.getItem("js_language_root") == 'hu'){
      $("#skipass_daten").load('skipass_hu.html', function() {
      });
    } else {
      $("#skipass_daten").load('skipass_de.html', function() {
      });
    }
    content_geladen();
  });
  
  $("#gesucht").live('pageshow', function(){
    aktuelle_seite_zurueck = '#information';
    $("#gesucht_daten").empty();
    if(storage.getItem("js_language_root") == 'hu'){
      $("#gesucht_daten").load('gesucht_hu.html', function() {
      });
    } else {
      $("#gesucht_daten").load('gesucht_de.html', function() {
      });
    }
    content_geladen();
  });


  $("#skiberge_detail").live('pagebeforeshow', function(){
      $("#skiberge_detail_daten").empty();
      $("#header_skiberge_detail").empty();
      $("#header_skiberge_detail").load('http://www.lachtal.at/mobile/load_skiberge_detail_header.php?lang='+storage.getItem("js_language_root"));
      $("#skiberge_detail_daten").load('http://www.lachtal.at/mobile/load_skiberge_detail.php?lang='+storage.getItem("js_language_root"), function() {
      });
    });
  $("#skiberge_detail").live('pageshow', function(){    
      aktuelle_seite_zurueck = '#wetter';
      $("#skiberg_daten").empty();
      $("#pano_wrapper").empty();
    if(storage.getItem("js_language_root") == 'hu'){
      $("#pano_wrapper").append('<img src="images/panorama/gross_hu.jpg">');
      $("#skiberg_daten").load('skiberg_hu.html', function() {
      });
    } else {
      $("#pano_wrapper").append('<img src="images/panorama/gross.jpg">');
      $("#skiberg_daten").load('skiberg_de.html', function() {
      });
    }
      myScroll = new iScroll('pano_wrapper', { zoom: true, bounce: false, momentum: false, lockDirection: false, hScrollbar: false, vScrollbar: false });
      content_geladen();
  });
  
  $("#events_liste").live('pagebeforeshow', function(){
      $("#events_liste_daten").empty();
      $("#events_liste_daten").load('http://www.lachtal.at/mobile/load_events_liste_mehrsprachig.php?lang='+storage.getItem("js_language_root"));    
    });
  $("#events_liste").live('pageshow', function(){
      aktuelle_seite_zurueck = '#information';
      content_geladen();
    });
    
  $(document).bind("pageshow", function() {
  $(".ui-content").scrollview("scrollTo", 0, 0);
  
      if($('.ui-page-active').attr('id') == 'home'){
    $("#home .content_scroll").height(1400);
  }
});




	       if(storage.getItem("js_language_root") == 'hu'){
          document.write(eval("information_header_hu"));
        } else {
          document.write(eval("information_header_de"));
        }
        

	       if(storage.getItem("js_language_root") == 'hu'){
          document.write(eval("wetter_hu"));
        } else {
          document.write(eval("wetter_de"));
        }
        

	       if(storage.getItem("js_language_root") == 'hu'){
          document.write(eval("events_hu"));
        } else {
          document.write(eval("events_de"));
        }
        

	       if(storage.getItem("js_language_root") == 'hu'){
          document.write(eval("skipass_tarife_hu"));
        } else {
          document.write(eval("skipass_tarife_de"));
        }
        

	       if(storage.getItem("js_language_root") == 'hu'){
          document.write(eval("bergbahnen_hu")); 
        } else {
          document.write(eval("bergbahnen_de")); 
        }
        

	       if(storage.getItem("js_language_root") == 'hu'){
          document.write(eval("gesucht_hu"));
        } else {
          document.write(eval("gesucht_de"));
        }
        

	       if(storage.getItem("js_language_root") == 'hu'){
          document.write(eval("tourist_hu"));
        } else {
          document.write(eval("tourist_de"));
        }
        

	       if(storage.getItem("js_language_root") == 'hu'){
          document.write(eval("huetten_hu"));
        } else {
          document.write(eval("huetten_de"));
        }
        

	       if(storage.getItem("js_language_root") == 'hu'){
          document.write(eval("skipass_header_hu"));
        } else {
          document.write(eval("skipass_header_de"));
        }
        

	       if(storage.getItem("js_language_root") == 'hu'){
          document.write(eval("bergbahnen_header_hu"));
        } else {
          document.write(eval("bergbahnen_header_de"));
        }
      

	       if(storage.getItem("js_language_root") == 'hu'){
          document.write(eval("tourist_header_hu"));
        } else {
          document.write(eval("tourist_header_de"));
        }
      

	       if(storage.getItem("js_language_root") == 'hu'){
          document.write(eval("gesucht_header_hu"));
        } else {
          document.write(eval("gesucht_header_de"));
        }
      

	       if(storage.getItem("js_language_root") == 'hu'){
          document.write(eval("wetter_header_hu"));
        } else {
          document.write(eval("wetter_header_de"));
        }
        

	       if(storage.getItem("js_language_root") == 'hu'){
          document.write(eval("skigebiet_header_hu"));
        } else {
          document.write(eval("skigebiet_header_de"));
        }
        

	       if(storage.getItem("js_language_root") == 'hu'){
          document.write(eval("events_header_hu"));
        } else {
          document.write(eval("events_header_de"));
        }
      





// JavaScript Document
var storage = window.localStorage;
var lang;
var aktuelle_seite_zurueck;
var retour;
var online_abfrage;

window.addEventListener('load', function () {
    document.addEventListener("deviceready", onDeviceReady, false);
});
  
function onDeviceReady() {
  document.addEventListener("online", onOnline, false);
  document.addEventListener("offline", onOffline, false);
  document.addEventListener("backbutton", backKeyDown, true);
  $("#progress").hide();
}
  
function onOnline() {
  online_abfrage = 1;
}
function onOffline() {
  online_abfrage = 0;
}
  
function offline() {
  if(storage.getItem("js_language_root") == 'de'){
    navigator.notification.confirm(
      'Server nicht erreichbar. Erneut versuchen?',
      offline_ok,
      'Offline',
      'Ja,Nein'
    );
  } else {
    navigator.notification.confirm(
      'Server not reachable. Try again?',
      offline_ok,
      'Offline',
      'Yes,No'
    );
  }
}
function offline_ok(button) {
  if(button == 1){
    goto_page($('.ui-page-active').attr('id'))
  }
}
    
storage.removeItem("js_betrieb_tel");
storage.removeItem("js_betrieb_bezeichnung");
storage.removeItem("js_gruppe_id");
storage.removeItem("js_untergruppe_id");
storage.removeItem("js_betrieb_id");
storage.removeItem("js_betrieb_gpsnord");
storage.removeItem("js_betrieb_gpsost");
storage.removeItem("js_event_gruppe_id");
     
document.ontouchmove = function(e){ e.preventDefault();} 

if (localStorage.getItem("js_language_root") === null) {
  if (navigator && navigator.userAgent && (lang = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))) {
    storage.setItem("js_language_root", lang[1]);
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
    storage.setItem("js_language_root", lang.substr(0, 2));
  } 
}

function exit_app() {
  navigator.device.exitApp();
}
  
function setSprache(sprache) {
  storage.setItem("js_language_root", sprache);
  goto_page('home');
  window.location.reload(true);
  document.addEventListener("backbutton", backKeyDown, true);
}
 
function backKeyDown() { 
  if($.mobile.activePage[0].id == 'home'){
    navigator.device.exitApp();
  } else {
    goto_page(aktuelle_seite_zurueck, true);
  }
}
  
function goto_page(seite, richtung) {
  if(richtung == true){
    richtung_zurueck = true;
  } else {
    richtung_zurueck = false;
  }
  if(online_abfrage == 0){
    offline();
  } else {
    $.mobile.changePage( seite, {
    reloadPage: false,
    transition: 'fade'
    });
  }
}

function load_page(seite, richtung) {
  if(richtung == true){
    richtung_zurueck = true;
  } else {
    richtung_zurueck = false;
  }
  if(online_abfrage == 0){
    offline();
  } else {
    $.mobile.loadPage(seite);
  }
}
  
function content_geladen(){
  $("#progress").hide();
}

function skiline_open(){
  window.plugins.childBrowser.openExternal('http://www.skiline.cc/');
}

function betrieb_telefon(betrieb_bezeichnung, telefonnummer) {
  storage.removeItem("js_betrieb_tel");
  storage.setItem("js_betrieb_tel", telefonnummer);
  storage.removeItem("js_betrieb_bezeichnung");
  storage.setItem("js_betrieb_bezeichnung", betrieb_bezeichnung);
  
  if(storage.getItem("js_language_root") == 'de'){
    navigator.notification.confirm(
      betrieb_bezeichnung +' anrufen?',
      betrieb_telefon_wahl,
      'Telefon',
      'Anrufen,Abbrechen'
    );
  } else {
    navigator.notification.confirm(
      'Call '+betrieb_bezeichnung+'?',
      betrieb_telefon_wahl,
      'Phone',
      'Call,Cancel'
    );
  }
}

function betrieb_telefon_wahl(button) {
  if(button == 1){
    location.href='tel:'+storage.getItem("js_betrieb_tel")+'';
  }
}

// JavaScript Document
huetten_de = 'Skihütten';
huetten_hu = 'Hütték';
home_webcam_de = 'Live/Wetter';
home_webcam_hu = 'Webkamera';

// Information
wetter_de = 'Webcam<br>Wetter';
wetter_hu = 'Webkamera<br>idojárás';
events_de = 'esISTlos';
events_hu = 'rendezvények';
skipass_tarife_de = 'Skipass<br>Tarife';
skipass_tarife_hu = 'Síbérlet<br>árak';
bergbahnen_de = 'Bergbahnen<br>Service';
bergbahnen_hu = 'Információk a<br>liftekrol';
gesucht_de = 'Gesucht';
gesucht_hu = 'Keresés';
tourist_de = 'Tourist<br>Service';
tourist_hu = 'Információ';

wetter_header_de = 'Webcam & Wetter';
wetter_header_hu = 'Webkamera & idojárás';
skigebiet_header_de = 'Skigebiet';
skigebiet_header_hu = 'Síterep';
skipass_header_de = 'Skipass Tarife';
skipass_header_hu = 'Síbérlet árak';
bergbahnen_header_de = 'Bergbahnen';
bergbahnen_header_hu = 'liftekrol';
tourist_header_de = 'Tourismus/Service';
tourist_header_hu = 'Információ';
gesucht_header_de = 'Gesucht';
gesucht_header_hu = 'Keresés';
events_header_de = 'esISTlos';
events_header_hu = 'rendezvények';
information_header_de = 'Information';
information_header_hu = 'Információ';

skiberge_de = 'Skigebiet';
skiberge_hu = 'Síterep';

function ResizePageContentHeight(page) {
	var $page = $(page),
		$content = $page.children( ".ui-content" ),
		hh = $page.children( ".ui-header" ).outerHeight() || 0,
		fh = $page.children( ".ui-footer" ).outerHeight() || 0,
		pt = parseFloat($content.css( "padding-top" )),
		pb = parseFloat($content.css( "padding-bottom" )),
		wh = window.innerHeight;
		
	$content.height(wh - (hh + fh) - (pt + pb));
}

$( ":jqmData(role='page')" ).live( "pageshow", function(event) {
	var $page = $( this );

	// For the demos that use this script, we want the content area of each
	// page to be scrollable in the 'y' direction.

	$page.find( ".ui-content" ).attr( "data-" + $.mobile.ns + "scroll", "y" );

	// This code that looks for [data-scroll] will eventually be folded
	// into the jqm page processing code when scrollview support is "official"
	// instead of "experimental".

	$page.find( ":jqmData(scroll):not(.ui-scrollview-clip)" ).each(function () {
		var $this = $( this );
		// XXX: Remove this check for ui-scrolllistview once we've
		//      integrated list divider support into the main scrollview class.
		if ( $this.hasClass( "ui-scrolllistview" ) ) {
			$this.scrolllistview();
		} else {
			var st = $this.jqmData( "scroll" ) + "",
				paging = st && st.search(/^[xy]p$/) != -1,
				dir = st && st.search(/^[xy]/) != -1 ? st.charAt(0) : null,

				opts = {
					direction: dir || undefined,
					paging: paging || undefined,
					scrollMethod: $this.jqmData("scroll-method") || undefined
				};

			$this.scrollview( opts );
		}
	});

	// For the demos, we want to make sure the page being shown has a content
	// area that is sized to fit completely within the viewport. This should
	// also handle the case where pages are loaded dynamically.

	ResizePageContentHeight( event.target );
});

$( window ).bind( "orientationchange", function( event ) {
	ResizePageContentHeight( $( ".ui-page" ) );
});

!function ($, iScroll) {
  $.ender({
    iScroll: function (options) {
      return new iScroll(this[0], options)
    }
  }, true)
}(ender, require('iscroll').iScroll)
