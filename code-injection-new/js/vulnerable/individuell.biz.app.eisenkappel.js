






 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});










			$(document).ready(function() {
				$('.flexslider').flexslider({
				  animation: "slide",
				  slideDirection: "vertical", 
				  controlsContainer: ".flex-container"
			  });
			});
		

	if ('standalone' in navigator && !navigator.standalone && (/iphone|ipod|ipad/gi).test(navigator.platform) && (/Safari/i).test(navigator.appVersion)) {
		document.write('<link rel="stylesheet" href="assets\/add-bubble\/style\/add2home.css">');
		document.write('<script type="application\/javascript" src="assets\/add-bubble\/src\/add2home.js" charset="utf-8"><\/s' + 'cript>');
	}











 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});








 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});










		$(document).ready(function() {
			$('.flexslider').flexslider();
		});
	

	if ('standalone' in navigator && !navigator.standalone && (/iphone|ipod|ipad/gi).test(navigator.platform) && (/Safari/i).test(navigator.appVersion)) {
		document.write('<link rel="stylesheet" href="assets\/add-bubble\/style\/add2home.css">');
		document.write('<script type="application\/javascript" src="assets\/add-bubble\/src\/add2home.js" charset="utf-8"><\/s' + 'cript>');
	}





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});








 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});








 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





var mapdata = { destination: new google.maps.LatLng(59.3327881, 18.064488100000062) };

// Home page
$('#page-home').live("pageinit", function() {
	$('#map_square').gmap(
	    { 'center' : mapdata.destination, 
	      'zoom' : 12, 
	      'mapTypeControl' : false,
	      'navigationControl' : false,
	      'streetViewControl' : false 
	    })
	    .bind('init', function(evt, map) { 
	        $('#map_square').gmap('addMarker', 
	            { 'position': map.getCenter(), 
	              'animation' : google.maps.Animation.DROP 
	            });                                                                                                                                                                                                                
	    });
    $('#map_square').click( function() { 
        $.mobile.changePage($('#page-map'), {});
    });
});

function fadingMsg (locMsg) {
    $("<div class='ui-overlay-shadow ui-body-e ui-corner-all fading-msg'>" + locMsg + "</div>")
    .css({ "display": "block", "opacity": 0.9, "top": $(window).scrollTop() + 100 })
    .appendTo( $.mobile.pageContainer )
    .delay( 2200 )
    .fadeOut( 1000, function(){
        $(this).remove();
   });
}

//Create the map then make 'displayDirections' request
$('#page-map').live("pageinit", function() {
    $('#map_canvas').gmap({'center' : mapdata.destination, 
        'mapTypeControl' : true, 
        'navigationControl' : true,
        'navigationControlOptions' : {'position':google.maps.ControlPosition.LEFT_TOP}
        })
    .bind('init', function() {
        $('.refresh').trigger('tap');        
    });
});

$('#page-map').live("pageshow", function() {
    $('#map_canvas').gmap('refresh');
});

// Request display of directions, requires jquery.ui.map.services.js
var toggleval = true; // used for test case: static locations
$('.refresh').live("tap", function() {
    
            // START: Tracking location with device geolocation
/*            if ( navigator.geolocation ) { 
                fadingMsg('Using device geolocation to get current position.');
                navigator.geolocation.getCurrentPosition ( 
                    function(position) {
                        $('#map_canvas').gmap('displayDirections', 
                        { 'origin' : new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 
                          'destination' : mapdata.destination, 'travelMode' : google.maps.DirectionsTravelMode.DRIVING},
                        { 'panel' : document.getElementById('dir_panel')},
                              function (result, status) {
                                  if (status === 'OK') {
                                      var center = result.routes[0].bounds.getCenter();
                                      $('#map_canvas').gmap('option', 'center', center);
                                      $('#map_canvas').gmap('refresh');
                                  } else {
                                    alert('Unable to get route');
                                  }
                              }
                           );         
                    }, 
                    function(){ 
                        alert('Unable to get location');
                        $.mobile.changePage($('#page-home'), {}); 
                    }); 
                } else {
                    alert('Unable to get location.');
                }            
*/            // END: Tracking location with device geolocation

            // START: Tracking location with test lat/long coordinates
            // Toggle between two origins to test refresh, force new route to be calculated
            var position = {};
            if (toggleval) {
                toggleval = false;
                position = { coords: { latitude: 57.6969943, longitude: 11.9865 } }; // Gothenburg
            } else {
                toggleval = true;
                position = { coords: { latitude: 58.5365967, longitude: 15.0373319 } }; // Motala
            }
            $('#map_canvas').gmap('displayDirections', 
                { 'origin' : new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 
                  'destination' : mapdata.destination, 
                  'travelMode' : google.maps.DirectionsTravelMode.DRIVING },
                  { 'panel' : document.getElementById('dir_panel') },
                    function (result, status) {
                        if (status === 'OK') {
                            var center = result.routes[0].bounds.getCenter();
                            $('#map_canvas').gmap('option', 'center', center);
                            $('#map_canvas').gmap('refresh');
                        } else {
                            alert('Unable to get route');
                        }
                    }); 
            // END: Tracking location with test lat/long coordinates
    $(this).removeClass($.mobile.activeBtnClass);
    return false;
});

// Go to map page to see instruction detail (zoom) on map page
$('#dir_panel').live("tap", function() {
    $.mobile.changePage($('#page-map'), {});
});

// Briefly show hint on using instruction tap/zoom
$('#page-dir').live("pageshow", function() {
    fadingMsg("Tap any instruction<br/>to see details on map");
});






 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});











 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});


/* Copyright (c) 2012 Mobile Developer Solutions. All rights reserved.
 * This software is available under the MIT License:
 * The MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, 
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies 
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

$(document).ready(function() {   
    $('.api-div').hide();
    $('.api-div#api-intro').show();
    
    $('#intro').click(function(event) {
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);            
    });
    
    $('div ul li a').click(function(event) {
        event.preventDefault();
        //alert('clicked : ' + $(this).attr('href'));
        var attrhref = $(this).attr('href');

        if (attrhref.indexOf("#api-") !== 0) {
            return;
        }
        
        // hide all div's, show only this one
        $('.api-div').hide();
        $(attrhref).show();

        // if small screen and portrait - close after tap
        var disp = $('ul #listdivider').css("display");
        //alert(disp + ' : ' + attrhref);
        if (disp === 'none') {
            $('div.ui-collapsible').trigger("collapse");
        } else {
            $.mobile.silentScroll(0);            
        }
    }); 
    
    $('#listdivider').click(function() {
        event.preventDefault();
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);
    });
});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});








 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});


	if ('standalone' in navigator && !navigator.standalone && (/iphone|ipod|ipad/gi).test(navigator.platform) && (/Safari/i).test(navigator.appVersion)) {
		document.write('<link rel="stylesheet" href="assets\/add-bubble\/style\/add2home.css">');
		document.write('<script type="application\/javascript" src="assets\/add-bubble\/src\/add2home.js" charset="utf-8"><\/s' + 'cript>');
	}








 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});























 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");




 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});








 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});


 
  // initiate Geolocation 
  function make_geolocation() {  
    navigator.geolocation.getCurrentPosition(handle_geolocation,handle_errors);  
  } 
  
  // Geolocation Errors  
  function handle_errors(error) { 
    alert("Aktuelle Position konnte nicht ermittelt werden. Bitte Standort manuell eintragen.");
    $.mobile.pageLoading(true);
  }  
  
  // Geolocation Success
  function handle_geolocation(position){  
      alert("Aktuelle Position konnte nicht ermittelt werden. Bitte Standort manuell eintragen.");
    $("input#saddr").val(position.coords.latitude + ',' + position.coords.longitude);  
    $.mobile.pageLoading(true);
  } 

/*
var mapdata = { destination: new google.maps.LatLng(46.4842, 14.59283) };

//Home page
$('#page-home').live("pageinit", function() {
    $('#map_square').gmap(
        { 'center' : mapdata.destination,
          'zoom' : 12,
          'mapTypeControl' : false,
          'navigationControl' : false,
          'streetViewControl' : false
        })
        .bind('init', function(evt, map) {
            $('#map_square').gmap('addMarker',
                { 'position': map.getCenter(),
                  'animation' : google.maps.Animation.DROP
 });                                                                                                                                                                                                               
        });
    $('#map_square').click( function() {
        $.mobile.changePage($('#page-map'), {});
    });
});

function fadingMsg (locMsg) {
    $("<div class='ui-overlay-shadow ui-body-e ui-corner-all fading-msg'>" + locMsg + "</div>")
    .css({ "display": "block", "opacity": 0.9, "top": $(window).scrollTop() + 100 })
    .appendTo( $.mobile.pageContainer )
    .delay( 2200 )
    .fadeOut( 1000, function(){
        $(this).remove();
   });
}

//Create the map then make 'displayDirections' request
$('#page-map').live("pageinit", function() {
    $('#map_canvas').gmap({'center' : mapdata.destination, 
        'mapTypeControl' : true, 
        'navigationControl' : true,
        'navigationControlOptions' : {'position':google.maps.ControlPosition.LEFT_TOP}
        })
    .bind('init', function() {
        $('.refresh').trigger('tap');        
    });
});

$('#page-map').live("pageshow", function() {
    $('#map_canvas').gmap('refresh');
});

// Request display of directions, requires jquery.ui.map.services.js
var toggleval = true; // used for test case: static locations
$('.refresh').live("tap", function() {
    
    // START: Tracking location with device geolocation
    if ( navigator.geolocation ) {
        fadingMsg('Using device geolocation to get current position.');
        navigator.geolocation.getCurrentPosition (
            function(position) {
                $('#map_canvas').gmap('displayDirections',
                { 'origin' : new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                  'destination' : mapdata.destination, 'travelMode' : google.maps.DirectionsTravelMode.DRIVING},
                { 'panel' : document.getElementById('dir_panel')},
                      function (result, status) {
                          if (status === 'OK') {
                              var center = result.routes[0].bounds.getCenter();
                              $('#map_canvas').gmap('option', 'center', center);
                              $('#map_canvas').gmap('refresh')
                          } else {
                              alert('Unable to get route');
                          }
                      }
                   );        
                },
                function(){
                    alert('Unable to get location');
                    $.mobile.changePage($('#page-home'), {});
                });
            } else {
                alert('Unable to get location.');
            }          
    // END: Tracking location with device geolocation

            // START: Tracking location with test lat/long coordinates
            // Toggle between two origins to test refresh, force new route to be calculated
            var position = {};
            if (toggleval) {
                toggleval = false;
                position = { coords: { latitude: 46.62794, longitude: 14.30899 } }; // Klagenfurt
            } else {
                toggleval = true;
                position = { coords: { latitude: 46.66207, longitude: 14.63359 } }; // V�lkermarkt
            }
            $('#map_canvas').gmap('displayDirections', 
                { 'origin' : new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 
                  'destination' : mapdata.destination, 
                  'travelMode' : google.maps.DirectionsTravelMode.DRIVING },
                  { 'panel' : document.getElementById('dir_panel') },
                    function (result, status) {
                        if (status === 'OK') {
                            var center = result.routes[0].bounds.getCenter();
                            $('#map_canvas').gmap('option', 'center', center);
                            $('#map_canvas').gmap('refresh');
                        } else {
                            alert('Unable to get route');
                        }
                    }); 
            // END: Tracking location with test lat/long coordinates
    $(this).removeClass($.mobile.activeBtnClass);
    return false;
});

//Go to map page to see instruction detail (zoom) on map page
$('#dir_panel').live("tap", function() {
    $.mobile.changePage($('#page-map'), {});
});

// Briefly show hint on using instruction tap/zoom
$('#page-dir').live("pageshow", function() {
    fadingMsg("Tap any instruction<br/>to see details on map");
});
  
  */






		(function(window, $, PhotoSwipe){
			$(document).ready(function(){
				$('div.gallery-page')
					.live('pageshow', function(e){
						var 
							currentPage = $(e.target),
							options = {},
							photoSwipeInstance = $("ul.gallery a", e.target).photoSwipe(options,  currentPage.attr('id'));
						return true;
					})
					
					.live('pagehide', function(e){
						
						var 
							currentPage = $(e.target),
							photoSwipeInstance = PhotoSwipe.getInstance(currentPage.attr('id'));

						if (typeof photoSwipeInstance != "undefined" && photoSwipeInstance != null) {
							PhotoSwipe.detatch(photoSwipeInstance);
						}
						return true;
					});
			});
		}(window, window.jQuery, window.Code.PhotoSwipe));
	



    
    $(document).on('pageinit','[data-role=page]',function(){
    $('#btnInit').click(function(){
        make_geolocation();
    });
});
    
      // initiate Geolocation 
  function make_geolocation() {  
    navigator.geolocation.getCurrentPosition(handle_geolocation,handle_errors);  
  } 
  
  // Geolocation Errors  
  function handle_errors(error) { 
    alert("Aktuelle Position konnte nicht ermittelt werden. Bitte Standort manuell eintragen.");
    $.mobile.pageLoading(true);
  }  
  
  // Geolocation Success
  function handle_geolocation(position){  
      alert("Aktuelle Position wird eingetragen!");
    $("input#saddr").val(position.coords.latitude + ',' + position.coords.longitude);  
    $.mobile.pageLoading(true);
  } 
    
    






 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});







 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});


		(function(window, $, PhotoSwipe){
			$(document).ready(function(){
				$('div.gallery-page')
					.live('pageshow', function(e){
						var 
							currentPage = $(e.target),
							options = {},
							photoSwipeInstance = $("ul.gallery a", e.target).photoSwipe(options,  currentPage.attr('id'));
						return true;
					})
					
					.live('pagehide', function(e){
						
						var 
							currentPage = $(e.target),
							photoSwipeInstance = PhotoSwipe.getInstance(currentPage.attr('id'));

						if (typeof photoSwipeInstance != "undefined" && photoSwipeInstance != null) {
							PhotoSwipe.detatch(photoSwipeInstance);
						}
						return true;
					});
			});
		}(window, window.jQuery, window.Code.PhotoSwipe));
	




 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});








 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});








 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});





 $(document).bind("mobileinit", function(){ if (navigator.userAgent.indexOf("Android") != -1) { $.mobile.defaultPageTransition = 'none'; $.mobile.defaultDialogTransition = 'none';}});


/*! jquery-ui-map rc1 | Johan Säll Larsson */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(2(c){c.s(c.p.o.n,{r:2(b,a,c){q e=0,f=0.1("5 > 9",4 3.6.9),d=0.1("5 > 7",4 3.6.7);a&&d.l(a);f.j(b,2(a,b){"m"===b?(d.k(a),d.h(e.1("8"))):d.h(z);c(a,b)})},u:2(b,a){0.1("8").y(0.1("5 > g",4 3.6.g(0.v(b),a)))},x:2(b,a){0.1("5 > i",4 3.6.i).w(b,a)}})})(t);',36,36,'this|get|function|google|new|services|maps|DirectionsRenderer|map|DirectionsService|||||||StreetViewPanorama|setMap|Geocoder|route|setDirections|setOptions|OK|prototype|gmap|ui|var|displayDirections|extend|jQuery|displayStreetView|_unwrap|geocode|search|setStreetView|null'.split('|'),0,{}))


/*
 * jQuery FlexSlider v1.8
 * http://flex.madebymufffin.com
 * Copyright 2011, Tyler Smith
 */
(function(a){a.flexslider=function(c,b){var d=c;d.init=function(){d.vars=a.extend({},a.flexslider.defaults,b);d.data("flexslider",true);d.container=a(".slides",d);d.slides=a(".slides > li",d);d.count=d.slides.length;d.animating=false;d.currentSlide=d.vars.slideToStart;d.animatingTo=d.currentSlide;d.atEnd=(d.currentSlide==0)?true:false;d.eventType=("ontouchstart" in document.documentElement)?"touchstart":"click";d.cloneCount=0;d.cloneOffset=0;d.manualPause=false;d.vertical=(d.vars.slideDirection=="vertical");d.prop=(d.vertical)?"top":"marginLeft";d.args={};d.transitions="webkitTransition" in document.body.style;if(d.transitions){d.prop="-webkit-transform"}if(d.vars.controlsContainer!=""){d.controlsContainer=a(d.vars.controlsContainer).eq(a(".slides").index(d.container));d.containerExists=d.controlsContainer.length>0}if(d.vars.manualControls!=""){d.manualControls=a(d.vars.manualControls,((d.containerExists)?d.controlsContainer:d));d.manualExists=d.manualControls.length>0}if(d.vars.randomize){d.slides.sort(function(){return(Math.round(Math.random())-0.5)});d.container.empty().append(d.slides)}if(d.vars.animation.toLowerCase()=="slide"){if(d.transitions){d.setTransition(0)}d.css({overflow:"hidden"});if(d.vars.animationLoop){d.cloneCount=2;d.cloneOffset=1;d.container.append(d.slides.filter(":first").clone().addClass("clone")).prepend(d.slides.filter(":last").clone().addClass("clone"))}d.newSlides=a(".slides > li",d);var m=(-1*(d.currentSlide+d.cloneOffset));if(d.vertical){d.newSlides.css({display:"block",width:"100%","float":"left"});d.container.height((d.count+d.cloneCount)*200+"%").css("position","absolute").width("100%");setTimeout(function(){d.css({position:"relative"}).height(d.slides.filter(":first").height());d.args[d.prop]=(d.transitions)?"translate3d(0,"+m*d.height()+"px,0)":m*d.height()+"px";d.container.css(d.args)},100)}else{d.args[d.prop]=(d.transitions)?"translate3d("+m*d.width()+"px,0,0)":m*d.width()+"px";d.container.width((d.count+d.cloneCount)*200+"%").css(d.args);setTimeout(function(){d.newSlides.width(d.width()).css({"float":"left",display:"block"})},100)}}else{d.transitions=false;d.slides.css({width:"100%","float":"left",marginRight:"-100%"}).eq(d.currentSlide).fadeIn(d.vars.animationDuration)}if(d.vars.controlNav){if(d.manualExists){d.controlNav=d.manualControls}else{var e=a('<ol class="flex-control-nav"></ol>');var s=1;for(var t=0;t<d.count;t++){e.append("<li><a>"+s+"</a></li>");s++}if(d.containerExists){a(d.controlsContainer).append(e);d.controlNav=a(".flex-control-nav li a",d.controlsContainer)}else{d.append(e);d.controlNav=a(".flex-control-nav li a",d)}}d.controlNav.eq(d.currentSlide).addClass("active");d.controlNav.bind(d.eventType,function(i){i.preventDefault();if(!a(this).hasClass("active")){(d.controlNav.index(a(this))>d.currentSlide)?d.direction="next":d.direction="prev";d.flexAnimate(d.controlNav.index(a(this)),d.vars.pauseOnAction)}})}if(d.vars.directionNav){var v=a('<ul class="flex-direction-nav"><li><a class="prev" href="#">'+d.vars.prevText+'</a></li><li><a class="next" href="#">'+d.vars.nextText+"</a></li></ul>");if(d.containerExists){a(d.controlsContainer).append(v);d.directionNav=a(".flex-direction-nav li a",d.controlsContainer)}else{d.append(v);d.directionNav=a(".flex-direction-nav li a",d)}if(!d.vars.animationLoop){if(d.currentSlide==0){d.directionNav.filter(".prev").addClass("disabled")}else{if(d.currentSlide==d.count-1){d.directionNav.filter(".next").addClass("disabled")}}}d.directionNav.bind(d.eventType,function(i){i.preventDefault();var j=(a(this).hasClass("next"))?d.getTarget("next"):d.getTarget("prev");if(d.canAdvance(j)){d.flexAnimate(j,d.vars.pauseOnAction)}})}if(d.vars.keyboardNav&&a("ul.slides").length==1){function h(i){if(d.animating){return}else{if(i.keyCode!=39&&i.keyCode!=37){return}else{if(i.keyCode==39){var j=d.getTarget("next")}else{if(i.keyCode==37){var j=d.getTarget("prev")}}if(d.canAdvance(j)){d.flexAnimate(j,d.vars.pauseOnAction)}}}}a(document).bind("keyup",h)}if(d.vars.mousewheel){d.mousewheelEvent=(/Firefox/i.test(navigator.userAgent))?"DOMMouseScroll":"mousewheel";d.bind(d.mousewheelEvent,function(y){y.preventDefault();y=y?y:window.event;var i=y.detail?y.detail*-1:y.wheelDelta/40,j=(i<0)?d.getTarget("next"):d.getTarget("prev");if(d.canAdvance(j)){d.flexAnimate(j,d.vars.pauseOnAction)}})}if(d.vars.slideshow){if(d.vars.pauseOnHover&&d.vars.slideshow){d.hover(function(){d.pause()},function(){if(!d.manualPause){d.resume()}})}d.animatedSlides=setInterval(d.animateSlides,d.vars.slideshowSpeed)}if(d.vars.pausePlay){var q=a('<div class="flex-pauseplay"><span></span></div>');if(d.containerExists){d.controlsContainer.append(q);d.pausePlay=a(".flex-pauseplay span",d.controlsContainer)}else{d.append(q);d.pausePlay=a(".flex-pauseplay span",d)}var n=(d.vars.slideshow)?"pause":"play";d.pausePlay.addClass(n).text((n=="pause")?d.vars.pauseText:d.vars.playText);d.pausePlay.bind(d.eventType,function(i){i.preventDefault();if(a(this).hasClass("pause")){d.pause();d.manualPause=true}else{d.resume();d.manualPause=false}})}if("ontouchstart" in document.documentElement){var w,u,l,r,o,x,p=false;d.each(function(){if("ontouchstart" in document.documentElement){this.addEventListener("touchstart",g,false)}});function g(i){if(d.animating){i.preventDefault()}else{if(i.touches.length==1){d.pause();r=(d.vertical)?d.height():d.width();x=Number(new Date());l=(d.vertical)?(d.currentSlide+d.cloneOffset)*d.height():(d.currentSlide+d.cloneOffset)*d.width();w=(d.vertical)?i.touches[0].pageY:i.touches[0].pageX;u=(d.vertical)?i.touches[0].pageX:i.touches[0].pageY;d.setTransition(0);this.addEventListener("touchmove",k,false);this.addEventListener("touchend",f,false)}}}function k(i){o=(d.vertical)?w-i.touches[0].pageY:w-i.touches[0].pageX;p=(d.vertical)?(Math.abs(o)<Math.abs(i.touches[0].pageX-u)):(Math.abs(o)<Math.abs(i.touches[0].pageY-u));if(!p){i.preventDefault();if(d.vars.animation=="slide"&&d.transitions){if(!d.vars.animationLoop){o=o/((d.currentSlide==0&&o<0||d.currentSlide==d.count-1&&o>0)?(Math.abs(o)/r+2):1)}d.args[d.prop]=(d.vertical)?"translate3d(0,"+(-l-o)+"px,0)":"translate3d("+(-l-o)+"px,0,0)";d.container.css(d.args)}}}function f(j){d.animating=false;if(d.animatingTo==d.currentSlide&&!p&&!(o==null)){var i=(o>0)?d.getTarget("next"):d.getTarget("prev");if(d.canAdvance(i)&&Number(new Date())-x<550&&Math.abs(o)>20||Math.abs(o)>r/2){d.flexAnimate(i,d.vars.pauseOnAction)}else{d.flexAnimate(d.currentSlide,d.vars.pauseOnAction)}}this.removeEventListener("touchmove",k,false);this.removeEventListener("touchend",f,false);w=null;u=null;o=null;l=null}}if(d.vars.animation.toLowerCase()=="slide"){a(window).resize(function(){if(!d.animating){if(d.vertical){d.height(d.slides.filter(":first").height());d.args[d.prop]=(-1*(d.currentSlide+d.cloneOffset))*d.slides.filter(":first").height()+"px";if(d.transitions){d.setTransition(0);d.args[d.prop]=(d.vertical)?"translate3d(0,"+d.args[d.prop]+",0)":"translate3d("+d.args[d.prop]+",0,0)"}d.container.css(d.args)}else{d.newSlides.width(d.width());d.args[d.prop]=(-1*(d.currentSlide+d.cloneOffset))*d.width()+"px";if(d.transitions){d.setTransition(0);d.args[d.prop]=(d.vertical)?"translate3d(0,"+d.args[d.prop]+",0)":"translate3d("+d.args[d.prop]+",0,0)"}d.container.css(d.args)}}})}d.vars.start(d)};d.flexAnimate=function(g,f){if(!d.animating){d.animating=true;d.animatingTo=g;d.vars.before(d);if(f){d.pause()}if(d.vars.controlNav){d.controlNav.removeClass("active").eq(g).addClass("active")}d.atEnd=(g==0||g==d.count-1)?true:false;if(!d.vars.animationLoop&&d.vars.directionNav){if(g==0){d.directionNav.removeClass("disabled").filter(".prev").addClass("disabled")}else{if(g==d.count-1){d.directionNav.removeClass("disabled").filter(".next").addClass("disabled")}else{d.directionNav.removeClass("disabled")}}}if(!d.vars.animationLoop&&g==d.count-1){d.pause();d.vars.end(d)}if(d.vars.animation.toLowerCase()=="slide"){var e=(d.vertical)?d.slides.filter(":first").height():d.slides.filter(":first").width();if(d.currentSlide==0&&g==d.count-1&&d.vars.animationLoop&&d.direction!="next"){d.slideString="0px"}else{if(d.currentSlide==d.count-1&&g==0&&d.vars.animationLoop&&d.direction!="prev"){d.slideString=(-1*(d.count+1))*e+"px"}else{d.slideString=(-1*(g+d.cloneOffset))*e+"px"}}d.args[d.prop]=d.slideString;if(d.transitions){d.setTransition(d.vars.animationDuration);d.args[d.prop]=(d.vertical)?"translate3d(0,"+d.slideString+",0)":"translate3d("+d.slideString+",0,0)";d.container.css(d.args).one("webkitTransitionEnd transitionend",function(){d.wrapup(e)})}else{d.container.animate(d.args,d.vars.animationDuration,function(){d.wrapup(e)})}}else{d.slides.eq(d.currentSlide).fadeOut(d.vars.animationDuration);d.slides.eq(g).fadeIn(d.vars.animationDuration,function(){d.wrapup()})}}};d.wrapup=function(e){if(d.vars.animation=="slide"){if(d.currentSlide==0&&d.animatingTo==d.count-1&&d.vars.animationLoop){d.args[d.prop]=(-1*d.count)*e+"px";if(d.transitions){d.setTransition(0);d.args[d.prop]=(d.vertical)?"translate3d(0,"+d.args[d.prop]+",0)":"translate3d("+d.args[d.prop]+",0,0)"}d.container.css(d.args)}else{if(d.currentSlide==d.count-1&&d.animatingTo==0&&d.vars.animationLoop){d.args[d.prop]=-1*e+"px";if(d.transitions){d.setTransition(0);d.args[d.prop]=(d.vertical)?"translate3d(0,"+d.args[d.prop]+",0)":"translate3d("+d.args[d.prop]+",0,0)"}d.container.css(d.args)}}}d.animating=false;d.currentSlide=d.animatingTo;d.vars.after(d)};d.animateSlides=function(){if(!d.animating){d.flexAnimate(d.getTarget("next"))}};d.pause=function(){clearInterval(d.animatedSlides);if(d.vars.pausePlay){d.pausePlay.removeClass("pause").addClass("play").text(d.vars.playText)}};d.resume=function(){d.animatedSlides=setInterval(d.animateSlides,d.vars.slideshowSpeed);if(d.vars.pausePlay){d.pausePlay.removeClass("play").addClass("pause").text(d.vars.pauseText)}};d.canAdvance=function(e){if(!d.vars.animationLoop&&d.atEnd){if(d.currentSlide==0&&e==d.count-1&&d.direction!="next"){return false}else{if(d.currentSlide==d.count-1&&e==0&&d.direction=="next"){return false}else{return true}}}else{return true}};d.getTarget=function(e){d.direction=e;if(e=="next"){return(d.currentSlide==d.count-1)?0:d.currentSlide+1}else{return(d.currentSlide==0)?d.count-1:d.currentSlide-1}};d.setTransition=function(e){d.container.css({"-webkit-transition-duration":(e/1000)+"s"})};d.init()};a.flexslider.defaults={animation:"fade",slideDirection:"horizontal",slideshow:true,slideshowSpeed:5000,animationDuration:600,directionNav:false,controlNav:false,keyboardNav:true,mousewheel:true,prevText:"Previous",nextText:"Next",pausePlay:false,pauseText:"Pause",playText:"Play",randomize:false,slideToStart:0,animationLoop:true,pauseOnAction:true,pauseOnHover:false,controlsContainer:"",manualControls:"",start:function(){},before:function(){},after:function(){},end:function(){}};a.fn.flexslider=function(b){return this.each(function(){if(a(this).find(".slides li").length==1){a(this).find(".slides li").fadeIn(400)}else{if(a(this).data("flexslider")!=true){new a.flexslider(a(this),b)}}})}})(jQuery);





// force certain pages to be refreshed every time.  mark such pages with
// 'data-cache="never"'
//
    jQuery('div').live('pagehide', function(event, ui){
      var page = jQuery(event.target);

      if(page.attr('data-cache') == 'never'){
        page.remove();
      };
    });



JQTWEET = {
	
	// Set twitter username, number of tweets & id/class to append tweets
	user: 'beantowndesign',
	numTweets: 10,
	appendTo: '#jstwitter',

	// core function of jqtweet
	loadTweets: function() {
		$.ajax({
			url: 'http://api.twitter.com/1/statuses/user_timeline.json/',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				screen_name: JQTWEET.user,
				include_rts: true,
				count: JQTWEET.numTweets,
				include_entities: true
			},
			success: function(data, textStatus, xhr) {

			 var html = '<div class="tweet">TWEET_TEXT<div class="time">AGO</div>';

				 // append tweets into page
				 for (var i = 0; i < data.length; i++) {
					$(JQTWEET.appendTo).append(
						html.replace('TWEET_TEXT', JQTWEET.ify.clean(data[i].text))
							.replace(/USER/g, data[i].user.screen_name)
							.replace('AGO', JQTWEET.timeAgo(data[i].created_at))
							.replace(/ID/g, data[i].id_str)
					);

				 }					
			}	

		});
		
	}, 
	
		
	/**
      * relative time calculator FROM TWITTER
      * @param {string} twitter date string returned from Twitter API
      * @return {string} relative time like "2 minutes ago"
      */
    timeAgo: function(dateString) {
		var rightNow = new Date();
		var then = new Date(dateString);
		
		if ($.browser.msie) {
			// IE can't parse these crazy Ruby dates
			then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
		}

		var diff = rightNow - then;

		var second = 1000,
		minute = second * 60,
		hour = minute * 60,
		day = hour * 24,
		week = day * 7;

		if (isNaN(diff) || diff < 0) {
			return ""; // return blank string if unknown
		}

		if (diff < second * 2) {
			// within 2 seconds
			return "right now";
		}

		if (diff < minute) {
			return Math.floor(diff / second) + " seconds ago";
		}

		if (diff < minute * 2) {
			return "about 1 minute ago";
		}

		if (diff < hour) {
			return Math.floor(diff / minute) + " minutes ago";
		}

		if (diff < hour * 2) {
			return "about 1 hour ago";
		}

		if (diff < day) {
			return  Math.floor(diff / hour) + " hours ago";
		}

		if (diff > day && diff < day * 2) {
			return "yesterday";
		}

		if (diff < day * 365) {
			return Math.floor(diff / day) + " days ago";
		}

		else {
			return "over a year ago";
		}
	}, // timeAgo()
    
	
    /**
      * The Twitalinkahashifyer!
      * http://www.dustindiaz.com/basement/ify.html
      * Eg:
      * ify.clean('your tweet text');
      */
    ify:  {
      link: function(tweet) {
        return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
          var http = m2.match(/w/) ? 'http://' : '';
          return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
        });
      },

      at: function(tweet) {
        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
        });
      },

      list: function(tweet) {
        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
        });
      },

      hash: function(tweet) {
        return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
          return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
        });
      },

      clean: function(tweet) {
        return this.hash(this.at(this.list(this.link(tweet))));
      }
    } // ify

	
};



$(document).ready(function () {
	// start jqtweet!
	JQTWEET.loadTweets();
});


