





















































































































































































































































		$(document).ready(function() {
			$('#viewport').attr('content', 'width=device-width, initial-scale=1, maximum-scale=4, user-scalable=yes');
		});
		







































































		var timer = null;
		$(document).delegate('.ui-page', 'pageshow', function () {
			clearTimeout(timer);
			scrwidth = $(this).width();
			console.log("var " + scrwidth);
			timer = setTimeout(function () {
			if (Number(scrwidth) > Number(775)) {
			console.log ( '#case 755' );
			$('#map-iframe').attr('src', 'map-750.html');
			$('#map-iframe').attr('height', '540px');
			} else if (Number(scrwidth) > Number(470)) {
			console.log ( '#case 470' );
			$('#map-iframe').attr('src', 'map-460.html');
			$('#map-iframe').attr('height', '340px');
			} else {
			console.log ( '#case 230' );
			$('#map-iframe').attr('src', 'map-280.html');
			$('#map-iframe').attr('height', '230px');
			}
			}, 1000);
		});
		







































































































































var points = [
  ['Невский проспект', 59.93500, 30.32554, 12, '1.html'],
  ['Дворцовая площадь', 59.93929, 30.31607, 11, '2.html'],
  ['Исаакиевская площадь', 59.93220, 30.30819, 10, '3.html'],
  ['Сенатская площадь', 59.93620, 30.30273, 9, '4.html'],
  ['Университетская набережная', 59.93773, 30.30396, 8, '5.html'],
  ['Стрелка ВО', 59.94353, 30.30681, 7, '6.html'],
  ['Главная площадь Петропавловской крепости', 59.94988, 30.31540, 6, '7.html'],
  ['Памятник Петру Великому', 59.95022, 30.31784, 5, '8.html'],
  ['Троицкая площадь', 59.95131, 30.32497, 4, '9.html'],
  ['Марсово поле', 59.94383, 30.33158, 3, '10.html'],
  ['Конюшенная площадь', 59.94022, 30.32936, 2, '11.html'],
  ['Площадь искусств', 59.93724, 30.33150, 1, '12.html']  
];
	function setMarkers(map, locations) {
	   var shape = {
      coord: [1, 1, 1, 20, 18, 20, 18 , 1],
      type: 'poly'
  };
	for (var i = 0; i < locations.length; i++) {
    var flag = new google.maps.MarkerImage('images/markers/' + (i + 1) + '.png',
      // This marker is 20 pixels wide by 32 pixels tall.
      new google.maps.Size(17, 19),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      new google.maps.Point(0, 19));
	var place = locations[i];
    var myLatLng = new google.maps.LatLng(place[1], place[2]);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: flag,
        shape: shape,
        title: place[0],
        zIndex: place[3],
		url: place[4]
    });
	google.maps.event.addListener(marker, 'click', function() {
 parent.location.href = this.url;
});
  } 
  }
  
function initialize() {
var myOptions = {
    center: new google.maps.LatLng(59.94386, 30.31292),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };
var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
setMarkers(map, points);
}
























            app.initialize();
        



























































































































































			$(document).bind("mobileinit", function(){
      			$.mobile.metaViewportContent = "width=device-width, minimum-scale=1, maximum-scale=3, user-scalable=yes";
			});
		










































		var timer = null;
		$(document).delegate('.ui-page', 'pageshow', function () {
			clearTimeout(timer);
			scrwidth = $(this).width();
			console.log("var " + scrwidth);
			timer = setTimeout(function () {
			if (Number(scrwidth) > Number(775)) {
			console.log ( '#case 755' );
			$('#map-iframe').attr('src', 'map-750.html');
			$('#map-iframe').attr('height', '540px');
			} else if (Number(scrwidth) > Number(470)) {
			console.log ( '#case 470' );
			$('#map-iframe').attr('src', 'map-460.html');
			$('#map-iframe').attr('height', '340px');
			} else {
			console.log ( '#case 230' );
			$('#map-iframe').attr('src', 'map-280.html');
			$('#map-iframe').attr('height', '230px');
			}
			}, 1000);
		});
		
























































$(document).ready(function() {

$('#viewport').attr('content', 'width=device-width, initial-scale=3, maximum-scale=3, user-scalable=yes"');
});

$(document).ready(function() {

$('#viewport').attr('content', 'width=device-width, initial-scale=1, maximum-scale=3, user-scalable=yes');
});

(function($) {
  $.widget('mobile.tabbar', $.mobile.navbar, {
    _create: function() {
      // Set the theme before we call the prototype, which will 
      // ensure buttonMarkup() correctly grabs the inheritied theme.
      // We default to the "a" swatch if none is found
      var theme = this.element.jqmData('theme') || "a";
      this.element.addClass('ui-footer ui-footer-fixed ui-bar-' + theme);

      // Make sure the page has padding added to it to account for the fixed bar
      this.element.closest('[data-role="page"]').addClass('ui-page-footer-fixed');


      // Call the NavBar _create prototype
      $.mobile.navbar.prototype._create.call(this);
    },

    // Set the active URL for the Tab Bar, and highlight that button on the bar
    setActive: function(url) {
      // Sometimes the active state isn't properly cleared, so we reset it ourselves
      this.element.find('a').removeClass('ui-btn-active ui-state-persist');
      this.element.find('a[href="' + url + '"]').addClass('ui-btn-active ui-state-persist');
    }
  });

  $(document).bind('pagecreate create', function(e) {
    return $(e.target).find(":jqmData(role='tabbar')").tabbar();
  });
  
  $(":jqmData(role='page')").live('pageshow', function(e) {
    // Grab the id of the page that's showing, and select it on the Tab Bar on the page
    var tabBar, id = $(e.target).attr('id');

    tabBar = $.mobile.activePage.find(':jqmData(role="tabbar")');
    if(tabBar.length) {
      tabBar.tabbar('setActive', '#' + id);
    }
  });

var attachEvents = function() {
	var hoverDelay = $.mobile.buttonMarkup.hoverDelay, hov, foc;

	$( document ).bind( {
		"vmousedown vmousecancel vmouseup vmouseover vmouseout focus blur scrollstart": function( event ) {
			var theme,
				$btn = $( closestEnabledButton( event.target ) ),
				evt = event.type;
		
			if ( $btn.length ) {
				theme = $btn.attr( "data-" + $.mobile.ns + "theme" );
		
				if ( evt === "vmousedown" ) {
					if ( $.support.touch ) {
						hov = setTimeout(function() {
							$btn.removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-down-" + theme );
						}, hoverDelay );
					} else {
						$btn.removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-down-" + theme );
					}
				} else if ( evt === "vmousecancel" || evt === "vmouseup" ) {
					$btn.removeClass( "ui-btn-down-" + theme ).addClass( "ui-btn-up-" + theme );
				} else if ( evt === "vmouseover" || evt === "focus" ) {
					if ( $.support.touch ) {
						foc = setTimeout(function() {
							$btn.removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-hover-" + theme );
						}, hoverDelay );
					} else {
						$btn.removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-hover-" + theme );
					}
				} else if ( evt === "vmouseout" || evt === "blur" || evt === "scrollstart" ) {
					$btn.removeClass( "ui-btn-hover-" + theme  + " ui-btn-down-" + theme ).addClass( "ui-btn-up-" + theme );
					if ( hov ) {
						clearTimeout( hov );
					}
					if ( foc ) {
						clearTimeout( foc );
					}
				}
			}
		},
		"focusin focus": function( event ){
			$( closestEnabledButton( event.target ) ).addClass( $.mobile.focusClass );
		},
		"focusout blur": function( event ){
			$( closestEnabledButton( event.target ) ).removeClass( $.mobile.focusClass );
		}
	});

	attachEvents = null;
};

$.fn.buttonMarkup = function( options ) {
	var $workingSet = this;

	// Enforce options to be of type string
	options = ( options && ( $.type( options ) == "object" ) )? options : {};
	for ( var i = 0; i < $workingSet.length; i++ ) {
		var el = $workingSet.eq( i ),
			e = el[ 0 ],
			o = $.extend( {}, $.fn.buttonMarkup.defaults, {
				icon:       options.icon       !== undefined ? options.icon       : el.jqmData( "icon" ),
				iconpos:    options.iconpos    !== undefined ? options.iconpos    : el.jqmData( "iconpos" ),
				theme:      options.theme      !== undefined ? options.theme      : el.jqmData( "theme" ) || $.mobile.getInheritedTheme( el, "c" ),
				inline:     options.inline     !== undefined ? options.inline     : el.jqmData( "inline" ),
				shadow:     options.shadow     !== undefined ? options.shadow     : el.jqmData( "shadow" ),
				corners:    options.corners    !== undefined ? options.corners    : el.jqmData( "corners" ),
				iconshadow: options.iconshadow !== undefined ? options.iconshadow : el.jqmData( "iconshadow" ),
				iconsize:   options.iconsize   !== undefined ? options.iconsize   : el.jqmData( "iconsize" ),
				mini:       options.mini       !== undefined ? options.mini       : el.jqmData( "mini" )
			}, options ),

			// Classes Defined
			innerClass = "ui-btn-inner",
			textClass = "ui-btn-text",
			buttonClass, iconClass,
			// Button inner markup
			buttonInner,
			buttonText,
			buttonIcon,
			buttonElements;

		$.each(o, function(key, value) {
			e.setAttribute( "data-" + $.mobile.ns + key, value );
			el.jqmData(key, value);
		});

		// Check if this element is already enhanced
		buttonElements = $.data(((e.tagName === "INPUT" || e.tagName === "BUTTON") ? e.parentNode : e), "buttonElements");

		if (buttonElements) {
			e = buttonElements.outer;
			el = $(e);
			buttonInner = buttonElements.inner;
			buttonText = buttonElements.text;
			// We will recreate this icon below
			$(buttonElements.icon).remove();
			buttonElements.icon = null;
		}
		else {
			buttonInner = document.createElement( o.wrapperEls );
			buttonText = document.createElement( o.wrapperEls );
		}
		buttonIcon = o.icon ? document.createElement( "span" ) : null;

		if ( attachEvents && !buttonElements) {
			attachEvents();
		}
		
		// if not, try to find closest theme container	
		if ( !o.theme ) {
			o.theme = $.mobile.getInheritedTheme( el, "c" );	
		}		

		buttonClass = "ui-btn ui-btn-up-" + o.theme;
		buttonClass += o.inline ? " ui-btn-inline" : "";
		buttonClass += o.shadow ? " ui-shadow" : "";
		buttonClass += o.corners ? " ui-btn-corner-all" : "";

		if ( o.mini !== undefined ) {
			// Used to control styling in headers/footers, where buttons default to `mini` style.
			buttonClass += o.mini ? " ui-mini" : " ui-fullsize";
		}
		
		if ( o.inline !== undefined ) {			
			// Used to control styling in headers/footers, where buttons default to `mini` style.
			buttonClass += o.inline === false ? " ui-btn-block" : " ui-btn-inline";
		}
		
		
		if ( o.icon ) {
			o.icon = "ui-icon-" + o.icon;
			o.iconpos = o.iconpos || "left";

			iconClass = "ui-icon " + o.icon;

			if ( o.iconshadow ) {
				iconClass += " ui-icon-shadow";
			}

			if ( o.iconsize ) {
				iconClass += " ui-iconsize-" + o.iconsize;
			}
		}

		if ( o.iconpos ) {
			buttonClass += " ui-btn-icon-" + o.iconpos;

			if ( o.iconpos == "notext" && !el.attr( "title" ) ) {
				el.attr( "title", el.getEncodedText() );
			}
		}
    
		innerClass += o.corners ? " ui-btn-corner-all" : "";

		if ( o.iconpos && o.iconpos === "notext" && !el.attr( "title" ) ) {
			el.attr( "title", el.getEncodedText() );
		}

		if ( buttonElements ) {
			el.removeClass( buttonElements.bcls || "" );
		}
		el.removeClass( "ui-link" ).addClass( buttonClass );

		buttonInner.className = innerClass;

		buttonText.className = textClass;
		if ( !buttonElements ) {
			buttonInner.appendChild( buttonText );
		}
		if ( buttonIcon ) {
			buttonIcon.className = iconClass;
			if ( !(buttonElements && buttonElements.icon) ) {
				buttonIcon.appendChild( document.createTextNode("\u00a0") );
				buttonInner.appendChild( buttonIcon );
			}
		}

		while ( e.firstChild && !buttonElements) {
			buttonText.appendChild( e.firstChild );
		}

		if ( !buttonElements ) {
			e.appendChild( buttonInner );
		}

		// Assign a structure containing the elements of this button to the elements of this button. This
		// will allow us to recognize this as an already-enhanced button in future calls to buttonMarkup().
		buttonElements = {
			bcls  : buttonClass,
			outer : e,
			inner : buttonInner,
			text  : buttonText,
			icon  : buttonIcon
		};

		$.data(e,           'buttonElements', buttonElements);
		$.data(buttonInner, 'buttonElements', buttonElements);
		$.data(buttonText,  'buttonElements', buttonElements);
		if (buttonIcon) {
			$.data(buttonIcon, 'buttonElements', buttonElements);
		}
	}

	return this;
};

$.fn.buttonMarkup.defaults = {
	corners: true,
	shadow: true,
	iconshadow: true,
	iconsize: 18,
	wrapperEls: "span"
};

function closestEnabledButton( element ) {
    var cname;

    while ( element ) {
		// Note that we check for typeof className below because the element we
		// handed could be in an SVG DOM where className on SVG elements is defined to
		// be of a different type (SVGAnimatedString). We only operate on HTML DOM
		// elements, so we look for plain "string".
        cname = ( typeof element.className === 'string' ) && (element.className + ' ');
        if ( cname && cname.indexOf("ui-btn ") > -1 && cname.indexOf("ui-disabled ") < 0 ) {
            break;
        }

        element = element.parentNode;
    }

    return element;
}

	
})(jQuery);


cordova.define("cordova/plugin/videoplayer",
  function(require, exports, module) {
    var exec = require("cordova/exec");
    var VideoPlayer = function () {};

    /**
     * Starts the video player intent
     *
     * @param url           The url to play
     */
    VideoPlayer.prototype.play = function(url) {
        exec(null, null, "VideoPlayer", "playVideo", [url]);
    };

    var videoPlayer = new VideoPlayer();
    module.exports = videoPlayer;
});

if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.videoPlayer) {
    window.plugins.videoPlayer = cordova.require("cordova/plugin/videoplayer");
}


var points = [
  ['Невский проспект', 59.93500, 30.32554, 12, '1.html'],
  ['Дворцовая площадь', 59.93929, 30.31607, 11, '2.html'],
  ['Исаакиевская площадь', 59.93220, 30.30819, 10, '3.html'],
  ['Сенатская площадь', 59.93620, 30.30273, 9, '4.html'],
  ['Университетская набережная', 59.93773, 30.30396, 8, '5.html'],
  ['Стрелка ВО', 59.94353, 30.30681, 7, '6.html'],
  ['Главная площадь Петропавловской крепости', 59.94988, 30.31540, 6, '7.html'],
  ['Памятник Петру Великому', 59.95022, 30.31784, 5, '8.html'],
  ['Троицкая площадь', 59.95131, 30.32497, 4, '9.html'],
  ['Марсово поле', 59.94383, 30.33158, 3, '10.html'],
  ['Конюшенная площадь', 59.94022, 30.32936, 2, '11.html'],
  ['Площадь искусств', 59.93724, 30.33150, 1, '12.html']  
];
	function setMarkers(map, locations) {
	   var shape = {
      coord: [1, 1, 1, 20, 18, 20, 18 , 1],
      type: 'poly'
  };
	for (var i = 0; i < locations.length; i++) {
    var flag = new google.maps.MarkerImage('images/markers/' + (i + 1) + '.png',
      // This marker is 20 pixels wide by 32 pixels tall.
      new google.maps.Size(17, 19),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      new google.maps.Point(0, 19));
	var place = locations[i];
    var myLatLng = new google.maps.LatLng(place[1], place[2]);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: flag,
        shape: shape,
        title: place[0],
        zIndex: place[3],
		url: place[4]
    });
	google.maps.event.addListener(marker, 'click', function() {
 parent.location.href = this.url;
});
  } 
  }
  
function initialize() {
var myOptions = {
    center: new google.maps.LatLng(59.94386, 30.31292),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
     mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: google.maps.ControlPosition.TOP_RIGHT
    },
    panControl: false,
    streetViewControl: false,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: google.maps.ControlPosition.TOP_LEFT
    }
    };
var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
setMarkers(map, points);
}
