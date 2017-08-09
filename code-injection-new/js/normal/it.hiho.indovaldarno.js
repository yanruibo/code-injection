




		$(function() {
     		var h=$(window).height() - $("#footer").height() - $("#header").height();
			$(".content").height(h-96 );
			 $(".ui-grid-b").height((h-30)/3);

			Interfaccia(2100,'location','.ui-btn-text');
			Interfaccia(2101,'events','.ui-btn-text');
			Interfaccia(2102,'bookmarks','.ui-btn-text');
			Interfaccia(2063,'lrestaurants');
			Interfaccia(2064,'lmust-see');
			Interfaccia(2065,'lshopping');
			Interfaccia(2066,'levents');
			Interfaccia(2107,'lservices');
			Interfaccia(2067,'forecast_title');
			var	options={ q: 'meteo' }
			$.ajax({
				  type: "POST",
				  url: "http://www.indo-valdarno.com/tmpl/mobile/helper.php",
				  data: options,
				  dataType:'json',
				  beforeSend: function ( xhr ) {
				  },
				  success: function( parsed_json ) {
				  	//$('body').height($(window).height()).css('background','url(http://www.indo-valdarno.com/tmpl/mobile/img/loading.gif) #ffffff center '+(($(window).height() / 2) - 100)+'px no-repeat');
				    //$( "#page").hide();
				  	//console.log(msg);
	  				$('.meteo_icon').html('<img src="img/meteo/'+parsed_json['current_observation']['icon']+'.png" title="'+parsed_json['current_observation']['weather']+'" width="50%"><div id="conditions">&nbsp;</div>');
					$('#conditions').html('<strong>'+parsed_json['current_observation']['weather']+'</strong>');
					$('#temperature').html('<strong>Temp: </strong>'+parsed_json['current_observation']['temp_c']+'&deg;');
					$('#pressure').html('<strong>Pressione: </strong>'+parsed_json['current_observation']['pressure_mb']+' mb');
					$('#wind').html('<strong>Vento: </strong>'+parsed_json['current_observation']['wind_dir']+' '+parsed_json['current_observation']['wind_kph']+' Km/H' );
				  	$("a[data-ajax=false]").click(handleClick);
				  	//setTimeout(function(){$( "#page").show();}, 1000);
				 }
			});
			var	options={ q: 'forecast' }
			$.ajax({
				  type: "POST",
				  url: "http://www.indo-valdarno.com/tmpl/mobile/helper.php",
				  data: options,
				  dataType:'json',
				  beforeSend: function ( xhr ) {
				  },
				  success: function( parsed_json ) {
				  	$('#pop').html('<strong>Prob. precipitazioni </strong>'+parsed_json['forecast']['simpleforecast']['forecastday'][0]['pop']+'%');
					//console.log(parsed_json['forecast']['simpleforecast']['forecastday']);
					for(var i=0;i<parsed_json['forecast']['simpleforecast']['forecastday'].length;i++){
						$('#list').append('<li data-icon="false"><a href="javascript:void(1)"><img src="img/meteo/'+parsed_json['forecast']['simpleforecast']['forecastday'][i]['icon']+'.png"  align="left" ><h2>'+parsed_json['forecast']['simpleforecast']['forecastday'][i]['date']['day']+'/'+parsed_json['forecast']['simpleforecast']['forecastday'][i]['date']['month']+'/'+parsed_json['forecast']['simpleforecast']['forecastday'][i]['date']['year']+'</h2><p>alta: '+parsed_json['forecast']['simpleforecast']['forecastday'][i]['high']['celsius']+'&deg;<br> bassa: '+parsed_json['forecast']['simpleforecast']['forecastday'][i]['low']['celsius']+'&deg; <br>vento: '+parsed_json['forecast']['simpleforecast']['forecastday'][i]['avewind']['dir']+' '+parsed_json['forecast']['simpleforecast']['forecastday'][i]['avewind']['kph']+' Km/H<br style="clear:both;"></p></a></li>');
					}
					$('#list').listview('refresh');
				  	$("a[data-ajax=false]").click(handleClick);
				  	//setTimeout(function(){$( "#page").show();}, 1000);
				 }
			});
		});
	


function datosServidor() {
};
datosServidor.prototype.iniciar = function() {
	try {
		// Mozilla / Safari
		this._xh = new XMLHttpRequest();
	} catch (e) {
		// Explorer
		var _ieModelos = new Array(
		'MSXML2.XMLHTTP.5.0',
		'MSXML2.XMLHTTP.4.0',
		'MSXML2.XMLHTTP.3.0',
		'MSXML2.XMLHTTP',
		'Microsoft.XMLHTTP'
		);
		var success = false;
		for (var i=0;i < _ieModelos.length && !success; i++) {
			try {
				this._xh = new ActiveXObject(_ieModelos[i]);
				success = true;
			} catch (e) {
				// Implementar manejo de excepciones
			}
		}
		if ( !success ) {
			// Implementar manejo de excepciones, mientras alerta.
			return false;
		}
		return true;
	}
}

datosServidor.prototype.ocupado = function() {
	estadoActual = this._xh.readyState;
	return (estadoActual && (estadoActual < 4));
}

datosServidor.prototype.procesa = function() {
	if (this._xh.readyState == 4 && this._xh.status == 200) {
		this.procesado = true;
	}
}

datosServidor.prototype.enviar = function(urlget,datos) {
	if (!this._xh) {
		this.iniciar();
	}
	if (!this.ocupado()) {
		this._xh.open("GET",urlget,false);
		this._xh.send(datos);
		if (this._xh.readyState == 4 && this._xh.status == 200) {
			return this._xh.responseText;
		}
		
	}
	return false;
}



function rateImg(rating,imgId )  {
		remotos = new datosServidor;
		nt = remotos.enviar('/tmpl/rating.php?rate='+rating+'&imgId='+imgId );
		rating = (rating * 25) - 8;
		$('#cover_rating').show();
		document.getElementById('current-rating').style.width = rating+'px';
		document.getElementById('ratingtext').innerHTML = 'Thank you for your rating!';
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}
function handleClick(e) {
    var target = $(e.target).closest('a');
    if( target ) {
        e.preventDefault();
        window.location = target.attr('href');
    }
}
function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteCookie(name) {
    setCookie(name,"",-1);
}

function Interfaccia(id,obj,child){
		if(getURLParameter('lingua')){
			options={ q: 'Interfaccia',string_id: id ,lingua:getURLParameter('lingua')}
		}else{
			options={ q: 'Interfaccia',string_id: id }
		}

	$.ajax({
			  type: "POST",
			  url: "http://www.indo-valdarno.com/tmpl/mobile/helper.php",
			  data: options,
		      dataType:'html',
			  beforeSend: function ( xhr ) {
			  },
			  success: function( msg ) {
				   	if(!child){
			  			$('#'+obj).html(msg);
					 }else{
						$('#'+obj).find(child).html(msg);
					}					  	
			 }
		});
}
	$( document ).bind( "mobileinit", function() {
	    $.support.cors =true;
	    $.mobile.allowCrossDomainPages = true;
	    $.mobile.pushStateEnabled = false;
	});

$(function() {
	
	
    // Ensure that loading a new page doesn't open
    // a new window
  	$("a[data-ajax=false]").click(handleClick);

});








		$(function() {
     		var h=$(window).height() - $("#footer").height() - $("#header").height();


			Interfaccia(2100,'location','.ui-btn-text');
			Interfaccia(2101,'events','.ui-btn-text');
			Interfaccia(2102,'bookmarks','.ui-btn-text');
			Interfaccia(2063,'lrestaurants');
			Interfaccia(2064,'lmust-see');
			Interfaccia(2065,'lshopping');
			Interfaccia(2066,'levents');
			Interfaccia(2107,'lservices');

		});
	

	
var action;


	//$("[data-role=header]").fixedtoolbar({ updatePagePadding: false });
	$(function() {
					 
		
		if(getURLParameter('section')){
			 action=getURLParameter('section');
		}
		
		if(getURLParameter('lingua')){
			options={ q: action ,lingua:getURLParameter('lingua'),date:getURLParameter('date'),width:($(window).width()/4)}
		}else{
			options={ q: action ,date:getURLParameter('date')}
		}
		
		$.ajax({
			  type: "POST",
			  url: "http://www.indo-valdarno.com/tmpl/mobile/helper.php",
			  data: options,
			  beforeSend: function ( xhr ) {
			  	$( "#page").hide();
			  },
			  success: function( msg ) {

			  	$( "#page").prepend(msg);

			 },
			 complete: function(xhr){
			 	w=$(window).width() / 4;
			  	$("a[data-ajax=false]").click(handleClick);
			  	$('.ul-li a ').css('padding','0px');
			  	$('#section-title').css('top',w );
				if(action=="events"){
					$('#page').append($('<div style="position:absolute;left:-4000px"><input name="demo" id="demo"/></div>'));
					$('#demo').mobiscroll().date({
						display:'top',
						dateFormat: "yyyy-mm-dd",
						dateOrder:	"ddmmyyyy",
						onSelect: function(){
							document.location.href="listview.html?section="+action+"&date=" + $('#demo').val();
						}
					}); 
					$('#header').append($('<a href="#calendar" data-theme="a" id="btn-calendar" data-role="button"  data-transition="slide"  class="ui-btn-right" data-iconpos="right" data-icon="calendar">Filter</a>'));

				}

				$('.ui-input-text').hide();

				
				$('#btn-calendar').live('click',function(){
					$('#demo').focus();
				});
				 $('.listing_img').each(function(){
			  		$(this).height((w/4)*3).css('margin','3px');

			  		$(this).css('background-image','url(http://www.indo-valdarno.com'+$(this).attr('rel')+')');
			  		
			  	});
			  		$( "#page").show();
			  		$("div[data-role=content]").trigger("create").css("padding-bottom","0");
			  		$("div[data-role=footer],div[data-role=header]").trigger("create");					

			 }
		});
		
	});









Interfaccia(2061,'filter_title');
Interfaccia(2062,'filter_desc')
Interfaccia(2063,'lristoranti')
Interfaccia(2064,'lmercati')
Interfaccia(2065,'loutlets')
Interfaccia(2066,'leventi')
Interfaccia(2103,'options','.ui-btn-text');
Interfaccia(2100,'location','.ui-btn-text');
Interfaccia(2101,'events','.ui-btn-text');
Interfaccia(2102,'bookmarks','.ui-btn-text');

	var map,
		  clientPosition,
	      defaultPosition,
          directionsDisplay, 
          directionsService;
   var steps = new Array;
	$( document ).bind( "mobileinit", function() {
	    $.support.cors =true;
	    $.mobile.allowCrossDomainPages = true;
	});
    var defaultPosition = new google.maps.LatLng(43.573731,11.523004);
	$(function() {
		$("a[data-ajax=false]").click(handleClick);
		 $('#map_canvas').css('padding','0px').height($(window).height() - $('#header').height() - $('#footer').height() -5);
				
		 $('#directions').height($(window).height() - 113).niceScroll();

				

		map= $('#map_canvas').gmap({'center': defaultPosition ,'zoom':11}).bind('init', function(evt, map) {

			
			var action='map';
			$.ajax({
				  type: "POST",
				  url: "http://www.indo-valdarno.com/tmpl/mobile/helper.php",
				  data: { q: action },
				  dataType:'json',
				  beforeSend: function ( xhr ) {
				  },
				  success: function( msg ) {
				  	for(i=0;i<msg.length;i++){
					  	var marker= $('#map_canvas').gmap('addMarker', { 'tags': msg[i].category, 'position': msg[i].lat+','+ msg[i].lon, 'bounds': true,'icon':'http://www.indo-valdarno.com' + msg[i].icon });
					  	var lat=msg[i].lat;
					  	var lon=msg[i].lon;
					  	var img= msg[i].img.path+"?w=768&ac=4,3";
					  	var title= msg[i].titolo;
					  	var abstract= msg[i].abstract;
			  			fadingMsg(marker,img,title,abstract,lat,lon,msg[i].url);
						/*
						$('#map_canvas').gmap('getCurrentPosition', function(position, status) {
								if ( status === 'OK' ) {
									clientPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
									$('#map_canvas').gmap('addMarker', {'position': clientPosition, 'bounds': true, 'icon':'http://www.indo-valdarno.com/tmpl/img/car.png'});
								}
						});   
						*/
				  	}
				 }
			});			
		});
		
		$('#flip-1').on( 'slidestop', function() { 
			var val=$(this).val();
				$('#map_canvas').gmap('find', 'markers', { 'property': 'tags','value': ['restaurants'] }, function(marker, isFound) {
		                if ( marker.tags== 'restaurants' ) {
		                     if(val=='on'){
		                        marker.setVisible(true);
			                } else if (val=='off'){
			                        marker.setVisible(false);
			                }
	                }
	        });
		});
		$('#flip-2').on( 'slidestop', function() { 
			var val=$(this).val();
				$('#map_canvas').gmap('find', 'markers', { 'property': 'tags','value': ['sight'] }, function(marker, isFound) {
		                if ( marker.tags== 'sight' ) {
		                     if(val=='on'){
		                        marker.setVisible(true);
			                } else if (val=='off'){
			                        marker.setVisible(false);
			                }
	                }
	        });
		});
		$('#flip-3').on( 'slidestop', function() { 
			var val=$(this).val();
				$('#map_canvas').gmap('find', 'markers', { 'property': 'tags','value': ['shopping'] }, function(marker, isFound) {
		                if ( marker.tags== 'shopping' ) {
		                     if(val=='on'){
		                        marker.setVisible(true);
			                } else if (val=='off'){
			                        marker.setVisible(false);
			                }
	                }
	        });
		});
		$('#flip-4').on( 'slidestop', function() { 
			var val=$(this).val();
				$('#map_canvas').gmap('find', 'markers', { 'property': 'tags','value': ['events'] }, function(marker, isFound) {
		                if ( marker.tags== 'events' ) {
		                     if(val=='on'){
		                        marker.setVisible(true);
			                } else if (val=='off'){
			                     marker.setVisible(false);
			                }
	                }
	        });
		});
	});

function fadingMsg (marker,img,title,ab,lat,lon,url) {
	var i='http://www.indo-valdarno.com'+img;
	var t=title;
	var a=ab;
	var u=url;
	marker.click(function(){
		$('#popup_img').attr('src','http://www.indo-valdarno.com/tmpl/mobile/img/big_loading.gif');
		$('#popup_title').html(t);
		$('#popup_abstract').html(a);
		$('#popup_img').attr('src',i);
		$('#popupBasic').popup('open');
		$('#popupBasic-popup').css('left',($(window).width()  - $('#popupBasic-popup').width())/2  - 20)
		$('#submit').click(function() {
			document.location.href=url;
		});
	})
}


	

( function( $, undefined ) {

    $.widget( "mobile.lazyloader", $.mobile.widget, {

        // Create some default options that can be extended in reinitialization
        _defaultOptions : {

            // threshold for how close to the bottom should we trigger a load of more items - default to height of viewport
            'threshold'     : $( window ).height(),
            // this is the number of items to retrieve from server by default
            'retrieve'      : 20,
            // this is the number of items retrieved so far
            'retrieved'     : 20,
            // this is whether or not to display count bubbles in the retrieved list items
            'bubbles'       : false,
            // this is for specifying an offset into the list in the case where the client is not in sync with server
            'offset'        : 0
        },

        // the parameters enable user defined server variables to be posted along with the ajax call to get more items
        _defaultParameters : {

            // this is the number of items to retrieve from server by default
            'retrieve'      : 20,
            // this is the number of items retrieved so far
            'retrieved'     : 20,
            // this is for specifying an offset into the list in the case where the client is not in sync with server
            'offset'        : 0
        },

        // Create some default settings that can be extended in reinitialization
        _defaultSettings : {

            // The page id of the page on which the lazyloader widget instance will be running
            "pageId"                : "",
            // The type of template to be used for transforming JSON to HTML
            "templateType"          : "",
            // Flag to indicate whether or not the template has been pre-compiled
            "templatePrecompiled"   : false,
            // The id of the script element for the current page on which the lazyloader has been initialized
            "templateId"            : "",
            // The template to use for transformation to HTML
            "template"              : "",
            // The id of the main wrapper element which the lazyloader widget instance will be lazy loading
            "mainId"                : "",
            // The id of the DIV that should contain the animated gif to indicate more items are being loaded
            "progressDivId"         : "",
            // The url of the server side resource to which the lazy loader AJAX call should be directed
            "moreUrl"               : "",
            // The url of the server side resource responsible for clearing server-side session variables to maintain state
            "clearUrl"              : "",
            // This will allow for cross-domain loading with JSONP - if false, lazyloader will use $.ajax POST
            "JSONP"                 : false,
            // This is the callback that the server resourse needs for wrapping the returned JSON
            "JSONPCallback"         : ""
        },

        // Create the default selectors that can be overridden during reinitialization
        _defaultSelectors : {

            // This is the selector of the main element (e.g. the <ul> in the case of a listview)
            "main"      : 'ul',
            // This is the selector for a single element of things that are being lazyloaded (e.g. the <li> in the case of a listview)
            "single"    : 'ul li',
            // This is the selector for the bottom element that may need to be removed and added back post lazyloading in certain cases
            "bottom"    : '[data-role="list-divider"]'
        },

        // Short circuit event toggles to prevent the handling of multiple events at the same time
        _handleScrollStartJustFired : false,
        _handleScrollStopJustFired : false,
        _mouseWheelEventJustFired : false,
        
        // Variables to store the id of the setTimeout of the short circuit event toggle that sets toggle back to false
        _handleScrollStartTimeoutId : null,
        _handleScrollStopTimeoutId : null,
        _mouseWheelTimeoutId : null,

        // This stores the _settings for the last time the widget instance was used by a particular page (keyed by pageId)
        _instances : {}, 

        // This stores the merged object containing _defaultOptions and any overriding options passed in
        //options : null, 

        _moreOutstandingPageId : null,

        // This stores the merged object containing _defaultParameters and any overriding options passed in
        _parameters : null,

        // This stores the merged object containing _defaultSettings and any overriding settings passed in
        _settings : null,

        // This stores the merged object containing _defaultSelectors and any overriding selectors passed in
        _selectors : null,

        // Timeout values used for varying some of the setTimeout values used in the widget
        timeoutOptions : {

            // Timeout to pass to load when it's called from the mousewheel handler
            'mousewheel'    : 350,
            // Timeout to pass to load when it's called from the scrollstart handler
            'scrollstart'   : 500,
            // Timeout to pass to load when it's called from the scrollstop handler
            'scrollstop'    : 50,
            // this is the timeout for how quickly to show the loading more items progress indicator at bottom
            'showprogress'  : 200,
            // this is the timeout for when there's a button to scroll down manually
            'scrolldown'	: 400,
            // this is the timeout used for when user clicks into search filter or something
            'immediately'	: 0
        },

        // The name of the widget
        _widgetName : "lazyloader",

        // Object to contain two possible widget states
        _widgetState : {

            // whether or not we are already retrieving items from server
            'busy'  : false,
            // this is to specify whether lazy loading is probably done, so we don't need to try anymore
            'done'  : false
        },

        // Runs automatically the first time this widget is called. Put the initial widget set-up code here. 
        _create : function( ) {

            // Initialize the widget using the options passed in by the widget constructor
            this._initialize( this._defaultOptions, this._defaultSettings, this._defaultParameters, this._defaultSelectors );

            // Bind events that are needed by this widget
            this._bind();
        },

        _init : function () {
            // not used
        },

        _initialize : function( options, settings, parameters, selectors ) {

            if ( ( typeof options != 'undefined' ) && ( options != '' ) ) {

                this._widgetState.busy = false;
                this._widgetState.done = false;

                // Get the defaultSettings and extend / merge / override them with user defined settings 
                this._settings = $.extend( true, this._settings, this._defaultSettings );
                this._settings = $.extend( true, this._settings, settings );

                if ( ( typeof this._settings.mainId !== 'undefined' ) && ( this._settings.mainId !== "") ) {

                    this._defaultSelectors.main = '#'+this._settings.mainId;
                    this._defaultSelectors.single = '#'+this._settings.mainId+' li';
                    this._defaultSelectors.bottom = '[data-role="list-divider"]';
                }

                if ( ( typeof this._settings.pageId !== 'undefined' ) && ( this._settings.pageId !== "") ) {
                
                    this._settings.totalHeight = $( "#"+this._settings.pageId ).height();
                }

                // Get the defaultSelectors and extend / merge / override them with user defined selectors 
                this._selectors = $.extend( true, this._selectors, this._defaultSelectors );
                this._selectors = $.extend( true, this._selectors, selectors );

                // Get the defaultParameters and extend / merge / override them with user defined parameters 
                this._parameters = $.extend( true, this._parameters, this._defaultParameters );
                this._parameters = $.extend( true, this._parameters, parameters );

                // Get any user defined settings and extend / merge / override them with defaultSettings
                this.options = $.extend( true, this.options, this._defaultOptions );
                this.options = $.extend( true, this.options, options );

                // Get the pageId for the settings that were passed in by the user
                var newPageId = settings.pageId;

                // Make sure a pageId was passed in
                if ( ( typeof newPageId != 'undefined ') && ( newPageId != '' ) ) {

                    // First check to see if we are already tracking an instance for the page being re-initialized before storing the defaults
                    if ( !this._instances[newPageId] ) {

                        // Only try to retrieve the template from the DOM if it has not already been set externally by the user
                        if ( ( typeof this._settings.template == 'undefined' ) || ( this._settings.template == '' ) ) {

                            // retrieve the template from the DOM so we can store it along with the instance 
                            if ( ( typeof this._settings.templateId != 'undefined' ) && ( this._settings.templateId != '') ) {

                                // retrieve the template from the DOM
                                var template = $( "#"+this._settings.templateId ).html();

                                var templateType = "";

                                var templatePrecompiled = this._settings.templatePrecompiled;

                                if (( typeof this._settings.templateType != 'undefined' ) && ( this._settings.templateType != '') ) {

                                    templateType = this._settings.templateType;
                                }

                                // Dust templates seem to be the only ones that can be pre-compiled at initialization and then loaded when needed at runtime
                                if ( ( templateType === "dust" ) && ( template !== "" ) && ( !templatePrecompiled ) ) {

                                    // add the pre-compiled template to the settings object
                                    this._settings.template = dust.compile( template, this._settings.templateId );                        

                                } else {

                                    // add it to the settings object
                                    this._settings.template = template;
                                }
                            }
                        }

                        // initialize a new object for this newPageId
                        this._instances[newPageId] = [];

                        // Store the merged options object as a new instance for later modifications and retrieval
                        this._instances[newPageId]['options'] = $.extend( true, {}, this.options );

                        // Store the merged settings object as a new instance for later retrieval
                        this._instances[newPageId]['settings'] = $.extend( true, {}, this._settings );

                        // Store the merged selectors object as a new instance for later retrieval
                        this._instances[newPageId]['selectors'] = $.extend( true, {}, this._selectors );
                    }
                }
            }
        },

        _bind : function () {

            $( 'body' ).bind( "scrollstart", $.proxy( this._handleScrollStart, this ) );
            $( 'body' ).bind( "scrollstop", $.proxy( this._handleScrollStop, this ) );

            if ( /Firefox/i.test( navigator.userAgent ) ) {

                $( window ).bind( "DOMMouseScroll", $.proxy( this._handleMouseWheelEvent, this ) );

            } else {
            
                if ( ( typeof this._selectors != 'undefined' ) && ( this._selectors != null) && ( this._selectors != '' ) ) {

                    if ( typeof this._selectors.main != 'undefined' ) {

                        if ( $( this._selectors.main ).attachEvent ) {

                            $( window ).bind( "onmousewheel", $.proxy( this._handleMouseWheelEvent, this ) );

                        } else {

                            $( window ).bind( "mousewheel", $.proxy( this._handleMouseWheelEvent, this ) );
                        }
                    }
                }
            }

            // bind if the element is destroyed
            //this.$element.bind( "destroyed", $.proxy( this._teardown, this ) );
        },

        _unbind : function () {

            $( 'body' ).unbind( "scrollstart", this._handleScrollStart );
            $( 'body' ).unbind( "scrollstop", this._handleScrollStop );

            if ( /Firefox/i.test( navigator.userAgent ) ) {

                $( window ).unbind( "DOMMouseScroll", this._handleMouseWheelEvent );

            } else {

                if ( ( typeof this._selectors != 'undefined' ) && ( this._selectors != null ) && ( this._selectors != '' ) ) {

                    if ( typeof this._selectors.main != 'undefined' ) {
                    
                        if ( $( this._selectors.main ).attachEvent ) {

                            $( window ).unbind( "onmousewheel", this._handleMouseWheelEvent );

                        } else {

                            $( window ).unbind( "mousewheel", this._handleMouseWheelEvent );
                        }
                    }
                }
            }
        },

        destroy : function () {

            // Unbind any events that were bound at _create
            this._unbind();

            // Null out all properties of this widget
            this.options = null; 
            this.timeoutOptions = null;
            this._settings = null;   
            this._parameters = null;
            this._instances = null;
            this._handleScrollStartJustFired = null;
            this._handleScrollStopJustFired = null;
            this._mouseWheelEventJustFired = null;
            this._handleScrollStartTimeoutId = null;
            this._handleScrollStopTimeoutId = null;
            this._mouseWheelTimeoutId = null;
            this._widgetState = null;
            this._defaultOptions = null;
            this._defaultSettings = null;
            this._defaultParameters = null;

            // For jQuery UI 1.8, destroy must be invoked from the base widget
            // For jQuery UI 1.9, define _destroy instead and don't worry about calling the base widget
            $.Widget.prototype.destroy.apply( this );
        },

        _check : function( threshold ) {

            threshold = this.options.threshold || threshold;

            var totalHeight, singleItemHeight, currentScroll, visibleHeight;

            if ( document.documentElement.scrollTop ) {

                currentScroll = document.documentElement.scrollTop;
            
            } else { 
            
                currentScroll = document.body.scrollTop; 
            }

            if ( this._instances[this._settings.pageId] ) {

                totalHeight = this._instances[this._settings.pageId]['settings'].totalHeight;

                singleItemHeight = this._instances[this._settings.pageId]['settings'].singleItemHeight;

            } else {

                totalHeight = this._settings.totalHeight;

                singleItemHeight = this._settings.singleItemHeight;
            }

            // Uses the height of browser viewport
            visibleHeight = $( window ).height(); 

            return ( ( totalHeight - threshold ) <= ( currentScroll + visibleHeight ) );
        },
        
        // Main lazy loader function
        _load : function( timeout ) { 

            if ( ( typeof this._settings.pageId != undefined ) && ( this._settings.pageId != '' ) ) {
            
                // we only want to proceed with this function logic if the lazyloader is currently initialized for the active page
                if ( $( '.ui-page-active' ).attr( 'id' ) == this._settings.pageId ) {

                    // make sure the plugin is not already lazy loading some items
                    if ( ( !this._widgetState.busy ) && ( !this._widgetState.done ) ) {

                        // Set the variable that can be used to make sure the outstanding request for more is for the same instance of the lazyloader
                        this._moreOutstandingPageId = this._settings.pageId;

                        // Save a reference to this that can be used inside the setTimeout callback
                        $that = this;

                        // Don't try to load anything until the scroll is given some time to get closer to the bottom
                        setTimeout( function() {

                            // Make sure the request for more is still for the current page instance of the lazyloader 
                            // before wasting any time building the _parameters and query string and then making the request
                            if ( $that._moreOutstandingPageId == $that._settings.pageId ) {

                                // if the page scroll location is close to the bottom
                                if ( $that._check( $that.options.threshold ) || ( timeout === 0 ) ) {

                                    $( "#"+$that._settings.progressDivId ).show( $that.timeoutOptions.showprogress, function() {

                                        // Default the moreUrl to be the current instance
                                        moreUrl = $that._settings.moreUrl;

                                        var requestType = "POST";
                                        var dataType = "json";
                                        var postData = "";

                                        // JSONP parameters
                                        var JSONP = false;
                                        var JSONPCallback = "";

                                        var count = 0;

                                        if ($that._instances[$that._settings.pageId]) {

                                            $that._parameters.retrieve = $that._instances[$that._settings.pageId]['options'].retrieve;
                                            $that._parameters.retrieved = $that._instances[$that._settings.pageId]['options'].retrieved;
                                            $that._parameters.offset = $that._instances[$that._settings.pageId]['options'].offset;

                                            if ( ( $that._instances[$that._settings.pageId]['settings'].JSONP ) ) {

                                                JSONP = true;
                                                JSONPCallback = $that._instances[$that._settings.pageId]['settings'].JSONPCallback;
                                            }

                                        } else {

                                            $that._parameters.retrieve = $that.options.retrieve;
                                            $that._parameters.retrieved = $that.options.retrieved;
                                            $that._parameters.offset = $that.options.offset;
                                        }

                                        if ( ( typeof $that._settings.pageId != 'undefined' ) && ( $that._settings.pageId != '' ) ) {

                                            var hidden_inputs = $( "#"+$that._settings.pageId ).find( '[type="hidden"]' );

                                            for( i=0; i<hidden_inputs.length; i++ ) {
                                                
                                                var hidden_input = $(hidden_inputs).get(i);
                                                
                                                if ( (typeof $( hidden_input ).attr( 'id' ) != 'undefined' ) && ( $( hidden_input ).attr( 'id' ) != '' ) ) {

                                                    $that._parameters[$( hidden_input ).attr( 'id' )] = escape( $( hidden_input ).val() );
                                                }
                                            }
                                        }

                                        if ( !JSONP ) {

                                            for ( var key in $that._parameters ) {

                                                if ( count == 0 ) {

                                                    postData += ( key + "=" + $that._parameters[key] );

                                                } else {

                                                    postData += ( "&" + key + "=" + $that._parameters[key] );
                                                }

                                                count = count+1;
                                            }

                                        } else {

                                            requestType = "GET";
                                            dataType = "jsonp";

                                            var JSONPParameters = "";

                                            for ( var key in $that._parameters ) {

                                                if (count == 0) {

                                                    JSONPParameters += '"' + key + '"' + ': "'+$that._parameters[key]+'"';

                                                } else {

                                                    JSONPParameters += ', ' + '"' + key + '"' + ': "'+$that._parameters[key]+'"';
                                                }

                                                count = count+1;
                                            }

                                            // Create a JSON object out of the JSONParameters string
                                            postData = $.parseJSON( "{ "+JSONPParameters+" }" );
                                        }

                                        $.ajax( {

                                            type: requestType,
                                            url: moreUrl,
                                            dataType: dataType,
                                            jsonpCallback: JSONPCallback,
                                            data: postData,
                                            success: function( data ){

                                                more = data;

                                                if ( typeof data === 'object' ) {
                                                    
                                                    // we should be good then
                                                
                                                } else {

                                                    try {

                                                        // it seems the response can also be received as a string even though we specified json as dataType
                                                        more = $.parseJSON( data ); 

                                                    } catch ( err ) {

                                                        // trigger an event to announce that an error occurred during the _load
                                                        $that._triggerEvent( "error", "_load", err.message );

                                                        $( "#"+$that._settings.progressDivId ).hide( 250, function() {

                                                            $that._widgetState.busy = false;
                                                        } ); 

                                                        return false;   
                                                    }
                                                }

                                                try {

                                                    var count                       = more.data[0].count;
                                                    var html                        = "";
                                                    var json                        = "";
                                                    var template                    = "";
                                                    var templateId                  = "";
                                                    var templateType                = "";
                                                    var templatePrecompiled         = false; 
                                                    var mainElementSelector         = "";
                                                    var singleItemElementSelector   = "";
                                                    var bottomElementSelector       = "";
                                                    var $bottomElement              = "";

                                                    if ( count > 0 ) {

                                                        mainElementSelector = $that._selectors.main;
                                                        singleItemElementSelector = $that._selectors.single;
                                                        bottomElementSelector = $that._selectors.bottom;

                                                        $bottomElement = $that._getBottomElement( mainElementSelector, bottomElementSelector );

                                                        if ( ( typeof more.data[0].html != 'undefined' ) && ( more.data[0].html != '' ) ) {
                                                        
                                                            html = more.data[0].html;

                                                            if ( $bottomElement ) {

                                                                $( singleItemElementSelector ).last().before( html );

                                                            } else {

                                                                $( mainElementSelector ).append( html );
                                                            } 
                                                        
                                                        } else {

                                                            // Check to see if there is already an instance of this page in memory
                                                            if ( $that._instances[$that._settings.pageId] ) {

                                                                // If a templateId isn't set, then there's no need to do the other two checks
                                                                if ( ( typeof $that._instances[$that._settings.pageId]['settings'].templateId != 'undefined' ) && ( $that._instances[$that._settings.pageId]['settings'].templateId != '' ) ) {

                                                                    templateId = $that._instances[$that._settings.pageId]['settings'].templateId;
                                                                
                                                                    if ( ( typeof $that._instances[$that._settings.pageId]['settings'].templateType != 'undefined' ) && ( $that._instances[$that._settings.pageId]['settings'].templateType != '' ) ) {

                                                                        templateType = $that._instances[$that._settings.pageId]['settings'].templateType;
                                                                    }

                                                                    if ( ( typeof $that._instances[$that._settings.pageId]['settings'].template != 'undefined' ) && ( $that._instances[$that._settings.pageId]['settings'].template != '' ) ) {

                                                                        template = $that._instances[$that._settings.pageId]['settings'].template;
                                                                    }
                                                                }

                                                                templatePrecompiled = $that._instances[$that._settings.pageId]['settings'].templatePrecompiled;
                                                            
                                                            } else { // This should never happen ... but, just in case

                                                                if ( ( typeof $that._settings.templateId != 'undefined' ) && ( $that._settings.templateId != '') ) {

                                                                    templateId = $that._settings.templateId;

                                                                    if ( ( typeof $that._settings.templateType != 'undefined' ) && ( $that._settings.templateType != '') ) {

                                                                        templateType = $that._settings.templateType;
                                                                    }

                                                                    if ( ( typeof $that._settings.template != 'undefined' ) && ( $that._settings.template != '') ) {

                                                                        template = $that._settings.template;
                                                                    }
                                                                }

                                                                templatePrecompiled = $that._settings.templatePrecompiled;
                                                            }

                                                            // Just to make sure we got something
                                                            if ( ( templateType !== "" ) && ( templateId !== "" ) && ( template !== "" ) ) {

                                                                // First check to see if json2html is being used since it needs special handling
                                                                if ( templateType === "json2html" ) {

                                                                    json = more.data[0].json;

                                                                    // first make sure there was a bottom element to work around
                                                                    if ( $bottomElement ) {

                                                                        // we need to remove the last li if it's a divider so we can append the retrieved li items
                                                                        $bottomElement.remove();
                                                                    }

                                                                    // Transform the retrieved json data into HTML using the transform template that was set at re-initialization for this page
                                                                    $( mainElementSelector ).json2html( json, template );

                                                                    // first make sure there was a list-divider
                                                                    if ( $bottomElement ) {

                                                                        // put the last li item back if it exists (it will exist if it was an list-divider)
                                                                        $( singleItemElementSelector ).last().append( $bottomElement );
                                                                    }

                                                                } else {

                                                                    json = more.data[0];

                                                                    switch( templateType ) {

                                                                        case 'handlebars' :

                                                                            if ( templatePrecompiled ) {

                                                                                template = Handlebars.templates[templateId + '.tmpl']; // your template minus the .js
                    
                                                                                html = template( json );

                                                                            } else {

                                                                                template = Handlebars.compile( template );

                                                                                html = template( json );
                                                                            }

                                                                            break;

                                                                        case 'icanhaz' :

                                                                            // Add the icanhaz template for this page
                                                                            ich.addTemplate( "listitem", template );

                                                                            // Convert the json record to HTML with icanhaz
                                                                            html = ich.listitem( json, true );

                                                                            // Clear the icanhaz cache 
                                                                            ich.clearAll();

                                                                            break;

                                                                        case 'dust' :

                                                                            if ( templatePrecompiled ) {

                                                                                // Should be no need to load the template source here since it's pre-compiled externally

                                                                                dust.render( templateId, json, function( err, result ) {
                                                                                    // Append the item HTML onto the main HTML string
                                                                                    html = result;
                                                                                } );

                                                                            } else {

                                                                                // Even if Dust templates aren't pre-compiled in an external script, they are still pre-compiled during initialization
                                                                                dust.loadSource( template );

                                                                                dust.render( templateId, json, function( err, result ) {
                                                                                    // Append the item HTML onto the main HTML string
                                                                                    html = result;
                                                                                } );
                                                                            }

                                                                            break;

                                                                        case 'dot' :

                                                                            template = doT.template( template );

                                                                            // Convert the json data to html with doT.js 
                                                                            html = template( json );

                                                                            break;

                                                                        default : 

                                                                            // Not sure if it makes sense to have a default here - we should probably raise an error instead
                                                                            break;
                                                                    }

                                                                    // First check for the bottom element to see if we need to insert the html before it
                                                                    if ( $bottomElement ) {

                                                                        $( singleItemElementSelector ).last().before( html );

                                                                    } else { // we can just append it

                                                                        $( mainElementSelector ).append( html );
                                                                    }
                                                                }

                                                            } else {

                                                                // raise an error
                                                            }
                                                        }

                                                        // Refresh the listview so it is re-enhanced by JQM
                                                        $( mainElementSelector ).listview( 'refresh' );

                                                        // initialize this to zero for now
                                                        var singleItemHeight = 0;

                                                        count = parseInt( count );

                                                        if ( $that._instances[$that._settings.pageId] ) {

                                                            var totalHeight = $that._instances[$that._settings.pageId]['settings'].totalHeight;

                                                            if ( typeof $that._instances[$that._settings.pageId]['settings'].singleItemHeight !== 'undefined' ) {

                                                                // retrieve the value of singleItemHeight for the current instance of the lazyloader
                                                                singleItemHeight = $that._instances[$that._settings.pageId]['settings'].singleItemHeight;

                                                            } else {

                                                                // We only need to calculate the singleItemHeight for the current instance of the lazyloader once
                                                                singleItemHeight = $( singleItemElementSelector ).first().next().height();

                                                                // let's store the singleItemHeight for later so we don't have to recalculate it every time
                                                                $that._instances[$that._settings.pageId]['settings'].singleItemHeight = singleItemHeight;
                                                            }

                                                            // Adjust the total height based on the number of items that were just lazyloaded
                                                            $that._instances[$that._settings.pageId]['settings'].totalHeight = ( totalHeight + ( singleItemHeight * count ) );

                                                        } else {

                                                            if ( typeof $that._settings.singleItemHeight !== 'undefined' ) {

                                                                // retrieve the value of singleItemHeight for the current instance of the lazyloader
                                                                singleItemHeight = $that._settings.singleItemHeight;

                                                            } else {

                                                                // We only need to calculate the singleItemHeight for the current instance of the lazyloader once
                                                                singleItemHeight = $( singleItemElementSelector ).first().next().height();

                                                                // let's store the singleItemHeight for later so we don't have to recalculate it every time
                                                                $that._settings.singleItemHeight = singleItemHeight;
                                                            }

                                                            $that._settings.totalHeight = ( $that._settings.totalHeight + ( $that._settings.singleItemHeight * count ) );
                                                        }

                                                        // Increment the stored retrieved count only by the number of items retrieved
                                                        $that._instances[$that._settings.pageId]['options'].retrieved += count;

                                                        if ( ( count < $that.options.retrieve ) || ( $that.options.retrieve == "all" ) ) {

                                                            $that._widgetState.done = true;

                                                            // trigger an event to announce that the lazyloader is done loading this page
                                                            $that._triggerEvent( "alldone", "_load" );
                                                        }

                                                    } else {

                                                        $that._widgetState.done = true;

                                                        // trigger an event to announce that the lazyloader is done loading this page
                                                        $that._triggerEvent( "alldone", "_load" );
                                                    }

                                                    $( "#"+$that._settings.progressDivId ).hide( 250, function() {

                                                        $that._widgetState.busy = false;
                                                    } ); 

                                                    // trigger an event to announce that the lazyloader is done loading that chunk
                                                    $that._triggerEvent( "doneloading", "_load" );

                                                } catch ( err ) {

                                                    // trigger an event to announce that an error occurred during the _load
                                                    $that._triggerEvent( "error", "_load", err.message );

                                                    $( "#"+$that._settings.progressDivId ).hide( 250, function() {

                                                        $that._widgetState.busy = false;
                                                    } ); 

                                                    return false;   
                                                }
                                            },
                                            error: function( msg ) {

                                                // trigger an event to announce that an error occurred during the _load
                                                $that._triggerEvent( "error", "_load", msg );

                                                $( "#"+$that._settings.progressDivId ).hide( 250, function() {

                                                    $that._widgetState.busy = false;
                                                } );    
                                            },
                                            complete: function( msg ) { 
                                                // this might be useful for something someday 
                                            }
                                        });
                                    });
                                }
                            }

                        }, timeout );
                    
                    } else {
                        
                        if ( this._widgetState.done ) {

                            // trigger an event to announce that the lazyloader is done loading this page
                            $that._triggerEvent( "alldone", "_load" );

                        } else if ( this._widgetState.busy ) {

                            // trigger an event to announce that the lazyloader is currently busy loading
                            $that._triggerEvent( "busy", "_load" );

                        } else {

                            // what happened?
                        }
                    }

                } else {

                    $( "#"+this._settings.progressDivId ).hide( 250, function() {

                        if ( typeof this._widgetState != 'undefined' ) {
                            
                            this._widgetState.busy = false;
                        }
                    } );
                }
            }
        },

        _getBottomElement : function ( mainElementSelector, bottomElementSelector ) {

            // we will be removing the last li if it's a divider, so we need to store it for later
            var $bottomElement = $( mainElementSelector ).last().find( bottomElementSelector );
            
            switch ( $bottomElement.length ) {

                case 2 :
                    $bottomElement = $bottomElement.last();
                    break;
                case 1 : // the assumption is that this must be the heading list-divider
                case 0 : // if there aren't any list-dividers, then nothing to remove
                default : // so, null it out so we know we don't need to remove anything
                    $bottomElement = null;
                    break;
            }

            // determine if there is a bottom element we need to worry about when appending the retrieved items
            if ( ( typeof $bottomElement  != 'undefined' ) && 
                 (        $bottomElement  != null )        && 
                 (        $bottomElement  != '' )          && 
                 (        $bottomElement  != 'null' ) ) {

                return $bottomElement;

            } else {

                return false;
            }         
        },

        // Event Handlers
        _handleMouseWheelEvent : function() {

            if ( ( !this._mouseWheelEventJustFired ) && ( !this._handleScrollStopJustFired ) && ( !this._handleScrollStartJustFired ) ) {

                this._mouseWheelEventJustFired = true;

                this._load( this.timeoutOptions.mousewheel );

                var $that = this;

                this._mouseWheelTimeoutId = setTimeout( function() {

                    $that._mouseWheelEventJustFired = false;

                }, 1000 );
            }
        },

        _handleScrollStart : function() {

            if ( ( !this._mouseWheelEventJustFired ) && ( !this._handleScrollStopJustFired ) && ( !this._handleScrollStartJustFired ) ) {

                this._handleScrollStartJustFired = true;

                this._load( this.timeoutOptions.scrollstart );

                var $that = this;

                this._handleScrollStartTimeoutId = setTimeout( function() {

                    $that._handleScrollStartJustFired = false;

                }, 1200 );
            }
        },
        
        _handleScrollStop : function() {

            if ( ( !this._mouseWheelEventJustFired ) && ( !this._handleScrollStopJustFired ) && ( !this._handleScrollStartJustFired ) ) {

                this._handleScrollStopJustFired = true;

                this._load( this.timeoutOptions.scrollstop );

                var $that = this;

                this._handleScrollStopTimeoutId = setTimeout( function() {

                    $that._handleScrollStopJustFired = false;

                }, 1200 );
            }
        },

        loadMore : function ( timeout ) {

        	if ( timeout === 0 ) {
        	
        		this._load( this.timeoutOptions.immediately );
        	
        	} else {

        		this._load( this.timeoutOptions.scrolldown );
        	}
        },

        _setOption: function( key, value ) {

            // we need to make sure the options record being tracked for this instance gets updated too
            if ( this._instances[this._settings.pageId] ) {

                if ( this._instances[this._settings.pageId]['options'][key] ) {

                    this._instances[this._settings.pageId]['options'][key] = value;
                }
            }

            // For UI 1.8, _setOption must be manually invoked from the base widget
            $.Widget.prototype._setOption.apply( this, arguments );
            // For UI 1.9 the _super method can be used instead
            // this._super( "_setOption", key, value );
        },

        refresh : function ( what ) {

        	if ( what == 'parameters' ) {
				
				if ( typeof this.options != 'undefined' ) {

	            	for ( var key in this._parameters ) {

		            	if ( typeof this.options[key] != 'undefined' ) {

		            		this._parameters[key] = this.options[key];
		            	}
	            	}
	            }
        	
        	} else if ( what == 'parameter' ) {

        		var key = arguments[1];

            	if ( typeof this.options[key] != 'undefined' ) {

            		this._parameters[key] = this.options[key];
            	}
        	
        	} else {

        		// whatever
        	}

            // Get any user defined settings and extend / merge / override them with defaultSettings
            var newParameters = JSON.stringify( this._parameters );

            this._parameters = $.parseJSON( newParameters );
        },

        // Public functions
        reInitialize : function( options, settings, parameters, selectors ) {

            options = "" || options;
            settings = "" || settings;
            parameters = "" || parameters;
            selectors = "" || selectors;

            this._initialize( options, settings, parameters, selectors );
        },

        reset : function( pageId ) {

            var $that = this;

            // clear lazy loading session variables specific to albums (section=albums)
            $.ajax( {

                type: "POST",
                url: $that._settings.clearUrl,
                async: true,
                data: "section="+pageId,
                success: function( msg ){

                    if ( parseInt( msg ) ) {

                        // reinitialize the lazy loader default retrieved value
                        $that.options.retrieved = $that._defaultOptions.retrieved;

                        $that._widgetState.done = false;

                        if ( typeof $that._instances[ pageId ] != 'undefined' ) {
                            
                            delete $that._instances[pageId];
                        }

                        // this is the message to be sent out along with the triggerred event below
                        var announcement = "All session variables for the '"+pageId+"' page and the lazyloader instance variables have been cleared.";

                        // trigger an event to announce that the reset has completed successfully
                        $that._triggerEvent( "reset", "reset", announcement );
                    }
                },
                error: function( msg ){

                    // trigger an event to announce that an error occurred during the reset
                    $that._triggerEvent( "error", "reset", msg );

                    $( "#"+$that._settings.progressDivId ).hide( 250, function() {

                        $that._widgetState.busy = false;
                    } );    
                }
            });
        },

        resetAll : function () {

            // save a local reference to the this object
            var $that = this;

            // clear lazy loading session variables for all pages currently being tracked as lazyloader instances
            $.ajax( {

                type: "POST",
                url: $that._settings.clearUrl,
                async: true,
                data: "",
                success: function( msg ){

                    if ( parseInt( msg ) ) {

                        // loop through the array of settings that were saved each time the widget instance was used by a page
                        for ( pageId in $that._instances ) {

                            // Remove the instance object stored in _instances
                            delete $that._instances[ pageId ];
                        }

                        // reinitialize the lazy loader default retrieved value
                        $that.options.retrieved = $that._defaultOptions.retrieved;

                        // reset the _widgetState variables
                        $that._widgetState.done = false;
                        $that._widgetState.busy = false;

                        // this is the message to be sent out along with the triggerred event below
                        var announcement = "All session variables for all pages currently being tracked by the lazyloader have been cleared.";

                        // trigger an event to announce that the resetAll has been successfully completed
                        $that._triggerEvent( "resetall", "resetAll", announcement );
                    }
                }
            });
        },

        _triggerEvent : function ( type, caller, message ) {

            message = message || "";

            switch( type ) {

                case 'error' :
                case 'resetall' :

                    this._trigger( type, {  "type"      : "lazyloader"+type, 
                                            "function"  : caller, 
                                            "message"   : message,
                                            "settings"  : this._settings,
                                            "options"   : this.options,
                                            "parameters": this._parameters } );
                    break;

                default : // alldone, busy, doneloading, reset - all send out the same data 

                    this._trigger( type, {  "type"      : "lazyloader"+type,
                                            "function"  : caller,
                                            "message"   : message,
                                            "pageId"    : this._settings.pageId, 
                                            "mainId"    : this._settings.mainId, 
                                            "loaded"    : this.options.retrieved } );
                    break;
            }
        }
    });

    //auto self-init widgets
    $( document ).bind( "pagecreate create", function( e ){
        $.mobile.lazyloader.prototype.enhanceWithin( e.target );
    });

} )( jQuery );






	    if(getCookie("bookmarks")){
		     var bookmarks = getCookie("bookmarks").split(',');
	    }else{
		    var bookmarks = new Array;
	    }
	    function removeCookies(id){
                for( i=0;i< bookmarks.length;i++){
                	if(bookmarks[i]==id){
	                	bookmarks.splice(i, 1)  ;
                	}
                }
                
                setCookie("bookmarks", bookmarks.join(','));
                $('#'+id).remove();
	    }
	
		$(function() {
		$("a[data-ajax=false]").click(handleClick);
     		var h=$(window).height() - $("#footer").height() - $("#header").height();
			$(".content").height(h-96 );
			 $(".ui-grid-b").height((h-30)/3);

			Interfaccia(2100,'location','.ui-btn-text');
			Interfaccia(2101,'events','.ui-btn-text');
			Interfaccia(2102,'bookmarks','.ui-btn-text');
			Interfaccia(2063,'lrestaurants');
			Interfaccia(2064,'lmust-see');
			Interfaccia(2065,'lshopping');
			Interfaccia(2066,'levents');
			Interfaccia(2107,'lservices');
			for( i=0;i< bookmarks.length;i++){
				if(getURLParameter('lingua')){
					options={ q: 'bookmarks' ,id_item:bookmarks[i],lingua:getURLParameter('lingua')}
				}else{
					options={ q: 'bookmarks'  ,id_item:bookmarks[i]}
				}
				$.ajax({
					  type: "POST",
					  url: "http://www.indo-valdarno.com/tmpl/mobile/helper.php",
					  data: options,
					  beforeSend: function ( xhr ) {
					  },
					  success: function( msg ) {
					  		$('#list').append(msg).listview('refresh');
					  		$("li span").click(function(event){
					  		    event.preventDefault();
					  			removeCookies($(this).parent().parent().attr('id'))
					  		});
					  		$('.bookmarks_img').each(function(){
						  		$(this).height(($(this).width()/4)*3).css('margin','auto 15px auto 3px');
			
						  		$(this).css('background-image','url(http://www.indo-valdarno.com/'+$(this).attr('rel')+')');
						  	});
						  	$("a[data-ajax=false]").click(handleClick);
					  	//setTimeout(function(){$( "#page").show();}, 1000);
					 }
				});
			}
		});
	


(function(a,q){a.widget("mobile.lazyloader",a.mobile.widget,{_defaultOptions:{threshold:a(window).height(),retrieve:20,retrieved:20,bubbles:!1,offset:0},_defaultParameters:{retrieve:20,retrieved:20,offset:0},_defaultSettings:{pageId:"",templateType:"",templatePrecompiled:!1,templateId:"",template:"",mainId:"",progressDivId:"",moreUrl:"",clearUrl:"",JSONP:!1,JSONPCallback:""},_defaultSelectors:{main:"ul",single:"ul li",bottom:'[data-role="list-divider"]'},_handleScrollStartJustFired:!1,_handleScrollStopJustFired:!1,
_mouseWheelEventJustFired:!1,_handleScrollStartTimeoutId:null,_handleScrollStopTimeoutId:null,_mouseWheelTimeoutId:null,_instances:{},_moreOutstandingPageId:null,_parameters:null,_settings:null,_selectors:null,timeoutOptions:{mousewheel:350,scrollstart:500,scrollstop:50,showprogress:200,scrolldown:400,immediately:0},_widgetName:"lazyloader",_widgetState:{busy:!1,done:!1},_create:function(){this._initialize(this._defaultOptions,this._defaultSettings,this._defaultParameters,this._defaultSelectors);
this._bind()},_init:function(){},_initialize:function(b,d,c,e){if("undefined"!=typeof b&&""!=b&&(this._widgetState.busy=!1,this._widgetState.done=!1,this._settings=a.extend(!0,this._settings,this._defaultSettings),this._settings=a.extend(!0,this._settings,d),"undefined"!==typeof this._settings.mainId&&""!==this._settings.mainId&&(this._defaultSelectors.main="#"+this._settings.mainId,this._defaultSelectors.single="#"+this._settings.mainId+" li",this._defaultSelectors.bottom='[data-role="list-divider"]'),
"undefined"!==typeof this._settings.pageId&&""!==this._settings.pageId&&(this._settings.totalHeight=a("#"+this._settings.pageId).height()),this._selectors=a.extend(!0,this._selectors,this._defaultSelectors),this._selectors=a.extend(!0,this._selectors,e),this._parameters=a.extend(!0,this._parameters,this._defaultParameters),this._parameters=a.extend(!0,this._parameters,c),this.options=a.extend(!0,this.options,this._defaultOptions),this.options=a.extend(!0,this.options,b),b=d.pageId,"undefined "!=typeof b&&
""!=b&&!this._instances[b])){if(("undefined"==typeof this._settings.template||""==this._settings.template)&&"undefined"!=typeof this._settings.templateId&&""!=this._settings.templateId)d=a("#"+this._settings.templateId).html(),c="",e=this._settings.templatePrecompiled,"undefined"!=typeof this._settings.templateType&&""!=this._settings.templateType&&(c=this._settings.templateType),this._settings.template="dust"===c&&""!==d&&!e?dust.compile(d,this._settings.templateId):d;this._instances[b]=[];this._instances[b].options=
a.extend(!0,{},this.options);this._instances[b].settings=a.extend(!0,{},this._settings);this._instances[b].selectors=a.extend(!0,{},this._selectors)}},_bind:function(){a("body").bind("scrollstart",a.proxy(this._handleScrollStart,this));a("body").bind("scrollstop",a.proxy(this._handleScrollStop,this));/Firefox/i.test(navigator.userAgent)?a(window).bind("DOMMouseScroll",a.proxy(this._handleMouseWheelEvent,this)):"undefined"!=typeof this._selectors&&null!=this._selectors&&""!=this._selectors&&"undefined"!=
typeof this._selectors.main&&(a(this._selectors.main).attachEvent?a(window).bind("onmousewheel",a.proxy(this._handleMouseWheelEvent,this)):a(window).bind("mousewheel",a.proxy(this._handleMouseWheelEvent,this)))},_unbind:function(){a("body").unbind("scrollstart",this._handleScrollStart);a("body").unbind("scrollstop",this._handleScrollStop);/Firefox/i.test(navigator.userAgent)?a(window).unbind("DOMMouseScroll",this._handleMouseWheelEvent):"undefined"!=typeof this._selectors&&null!=this._selectors&&
""!=this._selectors&&"undefined"!=typeof this._selectors.main&&(a(this._selectors.main).attachEvent?a(window).unbind("onmousewheel",this._handleMouseWheelEvent):a(window).unbind("mousewheel",this._handleMouseWheelEvent))},destroy:function(){this._unbind();this._defaultParameters=this._defaultSettings=this._defaultOptions=this._widgetState=this._mouseWheelTimeoutId=this._handleScrollStopTimeoutId=this._handleScrollStartTimeoutId=this._mouseWheelEventJustFired=this._handleScrollStopJustFired=this._handleScrollStartJustFired=
this._instances=this._parameters=this._settings=this.timeoutOptions=this.options=null;a.Widget.prototype.destroy.apply(this)},_check:function(b){var b=this.options.threshold||b,d,c,e;c=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;d=this._instances[this._settings.pageId]?this._instances[this._settings.pageId].settings.totalHeight:this._settings.totalHeight;e=a(window).height();return d-b<=c+e},_load:function(b){typeof this._settings.pageId!=q&&""!=this._settings.pageId&&
(a(".ui-page-active").attr("id")==this._settings.pageId?!this._widgetState.busy&&!this._widgetState.done?(this._moreOutstandingPageId=this._settings.pageId,$that=this,setTimeout(function(){$that._moreOutstandingPageId==$that._settings.pageId&&($that._check($that.options.threshold)||0===b)&&a("#"+$that._settings.progressDivId).show($that.timeoutOptions.showprogress,function(){moreUrl=$that._settings.moreUrl;var b="POST",c="json",e="",n=!1,o="",h=0;$that._instances[$that._settings.pageId]?($that._parameters.retrieve=
$that._instances[$that._settings.pageId].options.retrieve,$that._parameters.retrieved=$that._instances[$that._settings.pageId].options.retrieved,$that._parameters.offset=$that._instances[$that._settings.pageId].options.offset,$that._instances[$that._settings.pageId].settings.JSONP&&(n=!0,o=$that._instances[$that._settings.pageId].settings.JSONPCallback)):($that._parameters.retrieve=$that.options.retrieve,$that._parameters.retrieved=$that.options.retrieved,$that._parameters.offset=$that.options.offset);
if("undefined"!=typeof $that._settings.pageId&&""!=$that._settings.pageId){var p=a("#"+$that._settings.pageId).find('[type="hidden"]');for(i=0;i<p.length;i++){var k=a(p).get(i);"undefined"!=typeof a(k).attr("id")&&""!=a(k).attr("id")&&($that._parameters[a(k).attr("id")]=escape(a(k).val()))}}if(n){b="GET";c="jsonp";e="";for(f in $that._parameters)e=0==h?e+('"'+f+'": "'+$that._parameters[f]+'"'):e+(', "'+f+'": "'+$that._parameters[f]+'"'),h+=1;e=a.parseJSON("{ "+e+" }")}else for(var f in $that._parameters)e=
0==h?e+(f+"="+$that._parameters[f]):e+("&"+f+"="+$that._parameters[f]),h+=1;a.ajax({type:b,url:moreUrl,dataType:c,jsonpCallback:o,data:e,success:function(b){more=b;if(typeof b!=="object")try{more=a.parseJSON(b)}catch(c){$that._triggerEvent("error","_load",c.message);a("#"+$that._settings.progressDivId).hide(250,function(){$that._widgetState.busy=false});return false}try{var d=more.data[0].count,e="",g="",j="",f="",h="",k=false,m="",n=b="",l="";if(d>0){m=$that._selectors.main;b=$that._selectors.single;
n=$that._selectors.bottom;l=$that._getBottomElement(m,n);if(typeof more.data[0].html!="undefined"&&more.data[0].html!=""){e=more.data[0].html;l?a(b).last().before(e):a(m).append(e)}else{if($that._instances[$that._settings.pageId]){if(typeof $that._instances[$that._settings.pageId].settings.templateId!="undefined"&&$that._instances[$that._settings.pageId].settings.templateId!=""){f=$that._instances[$that._settings.pageId].settings.templateId;if(typeof $that._instances[$that._settings.pageId].settings.templateType!=
"undefined"&&$that._instances[$that._settings.pageId].settings.templateType!="")h=$that._instances[$that._settings.pageId].settings.templateType;if(typeof $that._instances[$that._settings.pageId].settings.template!="undefined"&&$that._instances[$that._settings.pageId].settings.template!="")j=$that._instances[$that._settings.pageId].settings.template}k=$that._instances[$that._settings.pageId].settings.templatePrecompiled}else{if(typeof $that._settings.templateId!="undefined"&&$that._settings.templateId!=
""){f=$that._settings.templateId;if(typeof $that._settings.templateType!="undefined"&&$that._settings.templateType!="")h=$that._settings.templateType;if(typeof $that._settings.template!="undefined"&&$that._settings.template!="")j=$that._settings.template}k=$that._settings.templatePrecompiled}if(h!==""&&f!==""&&j!=="")if(h==="json2html"){g=more.data[0].json;l&&l.remove();a(m).json2html(g,j);l&&a(b).last().append(l)}else{g=more.data[0];switch(h){case "handlebars":j=k?Handlebars.templates[f+".tmpl"]:
Handlebars.compile(j);e=j(g);break;case "icanhaz":ich.addTemplate("listitem",j);e=ich.listitem(g,true);ich.clearAll();break;case "dust":if(k)dust.render(f,g,function(b,a){e=a});else{dust.loadSource(j);dust.render(f,g,function(b,a){e=a})}break;case "dot":j=doT.template(j);e=j(g)}l?a(b).last().before(e):a(m).append(e)}}a(m).listview("refresh");g=0;d=parseInt(d);if($that._instances[$that._settings.pageId]){var o=$that._instances[$that._settings.pageId].settings.totalHeight;if(typeof $that._instances[$that._settings.pageId].settings.singleItemHeight!==
"undefined")g=$that._instances[$that._settings.pageId].settings.singleItemHeight;else{g=a(b).first().next().height();$that._instances[$that._settings.pageId].settings.singleItemHeight=g}$that._instances[$that._settings.pageId].settings.totalHeight=o+g*d}else{if(typeof $that._settings.singleItemHeight!=="undefined")g=$that._settings.singleItemHeight;else{g=a(b).first().next().height();$that._settings.singleItemHeight=g}$that._settings.totalHeight=$that._settings.totalHeight+$that._settings.singleItemHeight*
d}$that._instances[$that._settings.pageId].options.retrieved=$that._instances[$that._settings.pageId].options.retrieved+d;if(d<$that.options.retrieve||$that.options.retrieve=="all"){$that._widgetState.done=true;$that._triggerEvent("alldone","_load")}}else{$that._widgetState.done=true;$that._triggerEvent("alldone","_load")}a("#"+$that._settings.progressDivId).hide(250,function(){$that._widgetState.busy=false});$that._triggerEvent("doneloading","_load")}catch(p){$that._triggerEvent("error","_load",
p.message);a("#"+$that._settings.progressDivId).hide(250,function(){$that._widgetState.busy=false});return false}},error:function(b){$that._triggerEvent("error","_load",b);a("#"+$that._settings.progressDivId).hide(250,function(){$that._widgetState.busy=false})},complete:function(){}})})},b)):this._widgetState.done?$that._triggerEvent("alldone","_load"):this._widgetState.busy&&$that._triggerEvent("busy","_load"):a("#"+this._settings.progressDivId).hide(250,function(){"undefined"!=typeof this._widgetState&&
(this._widgetState.busy=!1)}))},_getBottomElement:function(b,d){var c=a(b).last().find(d);switch(c.length){case 2:c=c.last();break;default:c=null}return"undefined"!=typeof c&&null!=c&&""!=c&&"null"!=c?c:!1},_handleMouseWheelEvent:function(){if(!this._mouseWheelEventJustFired&&!this._handleScrollStopJustFired&&!this._handleScrollStartJustFired){this._mouseWheelEventJustFired=!0;this._load(this.timeoutOptions.mousewheel);var b=this;this._mouseWheelTimeoutId=setTimeout(function(){b._mouseWheelEventJustFired=
!1},1E3)}},_handleScrollStart:function(){if(!this._mouseWheelEventJustFired&&!this._handleScrollStopJustFired&&!this._handleScrollStartJustFired){this._handleScrollStartJustFired=!0;this._load(this.timeoutOptions.scrollstart);var b=this;this._handleScrollStartTimeoutId=setTimeout(function(){b._handleScrollStartJustFired=!1},1200)}},_handleScrollStop:function(){if(!this._mouseWheelEventJustFired&&!this._handleScrollStopJustFired&&!this._handleScrollStartJustFired){this._handleScrollStopJustFired=!0;
this._load(this.timeoutOptions.scrollstop);var b=this;this._handleScrollStopTimeoutId=setTimeout(function(){b._handleScrollStopJustFired=!1},1200)}},loadMore:function(b){0===b?this._load(this.timeoutOptions.immediately):this._load(this.timeoutOptions.scrolldown)},_setOption:function(b,d){this._instances[this._settings.pageId]&&this._instances[this._settings.pageId].options[b]&&(this._instances[this._settings.pageId].options[b]=d);a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(b,
d){if("parameters"==b){if("undefined"!=typeof this.options)for(var c in this._parameters)"undefined"!=typeof this.options[c]&&(this._parameters[c]=this.options[c])}else"parameter"==b&&(c=d,"undefined"!=typeof this.options[c]&&(this._parameters[c]=this.options[c]));c=JSON.stringify(this._parameters);this._parameters=a.parseJSON(c)},reInitialize:function(b,a,c,e){this._initialize(b,a,c,e)},reset:function(b){var d=this;a.ajax({type:"POST",url:d._settings.clearUrl,async:!0,data:"section="+b,success:function(a){parseInt(a)&&
(d.options.retrieved=d._defaultOptions.retrieved,d._widgetState.done=!1,"undefined"!=typeof d._instances[b]&&delete d._instances[b],d._triggerEvent("reset","reset","All session variables for the '"+b+"' page and the lazyloader instance variables have been cleared."))},error:function(b){d._triggerEvent("error","reset",b);a("#"+d._settings.progressDivId).hide(250,function(){d._widgetState.busy=!1})}})},resetAll:function(){var b=this;a.ajax({type:"POST",url:b._settings.clearUrl,async:!0,data:"",success:function(a){if(parseInt(a)){for(pageId in b._instances)delete b._instances[pageId];
b.options.retrieved=b._defaultOptions.retrieved;b._widgetState.done=!1;b._widgetState.busy=!1;b._triggerEvent("resetall","resetAll","All session variables for all pages currently being tracked by the lazyloader have been cleared.")}}})},_triggerEvent:function(a,d,c){c=c||"";switch(a){case "error":case "resetall":this._trigger(a,{type:"lazyloader"+a,"function":d,message:c,settings:this._settings,options:this.options,parameters:this._parameters});break;default:this._trigger(a,{type:"lazyloader"+a,"function":d,
message:c,pageId:this._settings.pageId,mainId:this._settings.mainId,loaded:this.options.retrieved})}}});a(document).bind("pagecreate create",function(b){a.mobile.lazyloader.prototype.enhanceWithin(b.target)})})(jQuery);









		$(function() {
     		var h=$(window).height() - $("#footer").height() - $("#header").height();
			$(".content").height(h-96 );
			 $(".ui-grid-b").height((h-30)/3);

			Interfaccia(2100,'location','.ui-btn-text');
			Interfaccia(2101,'events','.ui-btn-text');
			Interfaccia(2102,'bookmarks','.ui-btn-text');
			Interfaccia(2063,'lrestaurants');
			Interfaccia(2064,'lmust-see');
			Interfaccia(2065,'lshopping');
			Interfaccia(2066,'levents');
			Interfaccia(2107,'lservices');

		});
	






(function(a){a.widget("mobile.jqmMobiscroll",a.mobile.widget,{options:{theme:"jqm",preset:"date",animate:"pop"},_create:function(){var i=this.element,x=a.extend(this.options,i.jqmData("options"));i.mobiscroll(x)}});a(document).bind("pagebeforecreate",function(i){a('input[type="date"]:jqmData(role="mobiscroll")',i.target).prop("type","text")});a(document).bind("pagecreate create",function(i){a(document).trigger("mobiscrollbeforecreate");a(':jqmData(role="mobiscroll")',i.target).each(function(){"undefined"===
typeof a(this).data("mobiscroll")&&a(this).jqmMobiscroll()})})})(jQuery);(function(a){function i(b,q){function E(b){return a.isArray(h.readonly)?(b=a(".dwwl",m).index(b),h.readonly[b]):h.readonly}function k(b){var a='<div class="dw-bf">',c=1,d;for(d in aa[b])0==c%20&&(a+='</div><div class="dw-bf">'),a+='<div class="dw-li dw-v" data-val="'+d+'" style="height:'+G+"px;line-height:"+G+'px;"><div class="dw-i">'+aa[b][d]+"</div></div>",c++;return a+"</div>"}function i(b){d=a(".dw-li",b).index(a(".dw-v",b).eq(0));e=a(".dw-li",b).index(a(".dw-v",b).eq(-1));u=a(".dw-ul",m).index(b);
o=G;n=l}function y(b){var a=h.headerText;return a?"function"==typeof a?a.call(P,b):a.replace(/\{value\}/i,b):""}function fa(){l.temp=Y&&(null!==l.val&&l.val!=A.val()||!A.val().length)||null===l.values?h.parseValue(A.val()||"",l):l.values.slice(0);l.setValue(!0)}function r(b,c,d,h){!1!==J("validate",[m,c])&&a(".dw-ul",m).each(function(d){var e=a(this),f=a('.dw-li[data-val="'+l.temp[d]+'"]',e),q=a(".dw-li",e),g=q.index(f),j=q.length,p=d==c||void 0===c;if(!f.hasClass("dw-v")){for(var E=f,m=0,T=0;0<=
g-m&&!E.hasClass("dw-v");)m++,E=q.eq(g-m);for(;g+T<j&&!f.hasClass("dw-v");)T++,f=q.eq(g+T);(T<m&&T&&2!==h||!m||!E.hasClass("dw-v")||1==h)&&f.hasClass("dw-v")?g+=T:(f=E,g-=m)}if(!f.hasClass("dw-sel")||p)l.temp[d]=f.attr("data-val"),a(".dw-sel",e).removeClass("dw-sel"),f.addClass("dw-sel"),l.scroll(e,d,g,b)});l.change(d)}function v(b){if(!("inline"==h.display||Q===a(window).width()&&ca===a(window).height()&&b)){var d,c,f,e,q,g,l,j,E,p=0,o=0,b=a(window).scrollTop();e=a(".dwwr",m);var k=a(".dw",m),n=
{};q=void 0===h.anchor?A:h.anchor;Q=a(window).width();ca=a(window).height();C=(C=window.innerHeight)||ca;/modal|bubble/.test(h.display)&&(a(".dwc",m).each(function(){d=a(this).outerWidth(!0);p+=d;o=d>o?d:o}),d=p>Q?o:p,e.width(d));U=k.outerWidth();K=k.outerHeight(!0);"modal"==h.display?(c=(Q-U)/2,f=b+(C-K)/2):"bubble"==h.display?(E=!0,j=a(".dw-arrw-i",m),c=q.offset(),g=c.top,l=c.left,e=q.outerWidth(),q=q.outerHeight(),c=l-(k.outerWidth(!0)-e)/2,c=c>Q-U?Q-(U+20):c,c=0<=c?c:20,f=g-K,f<b||g>b+C?(k.removeClass("dw-bubble-top").addClass("dw-bubble-bottom"),
f=g+q):k.removeClass("dw-bubble-bottom").addClass("dw-bubble-top"),j=j.outerWidth(),e=l+e/2-(c+(U-j)/2),a(".dw-arr",m).css({left:e>j?j:e})):(n.width="100%","top"==h.display?f=b:"bottom"==h.display&&(f=b+C-K));n.top=0>f?0:f;n.left=c;k.css(n);a(".dw-persp",m).height(0).height(f+K>a(document).height()?f+K:a(document).height());E&&(f+K>b+C||g>b+C)&&a(window).scrollTop(f+K-C)}}function x(b){if("touchstart"===b.type)M=!0,setTimeout(function(){M=!1},500);else if(M)return M=!1;return!0}function J(b,c){var f;
c.push(l);a.each([ba,q],function(a,d){d[b]&&(f=d[b].apply(P,c))});return f}function ka(b){var a=+b.data("pos")+1;j(b,a>e?d:a,1)}function la(b){var a=+b.data("pos")-1;j(b,a<d?e:a,2)}var ga,G,N,m,Q,C,ca,U,K,R,S,l=this,da=a.mobiscroll,P=b,A=a(P),ea,ha,h=D({},ia),ba={},aa=[],Z={},Y=A.is("input"),V=!1;l.enable=function(){h.disabled=!1;Y&&A.prop("disabled",!1)};l.disable=function(){h.disabled=!0;Y&&A.prop("disabled",!0)};l.scroll=function(b,a,c,f,d,e){function q(){clearInterval(Z[a]);Z[a]=void 0;b.data("pos",
c).closest(".dwwl").removeClass("dwa")}var h=(ga-c)*G,g,e=e||w;b.attr("style",(f?W+"-transition:all "+f.toFixed(1)+"s ease-out;":"")+($?W+"-transform:translate3d(0,"+h+"px,0);":"top:"+h+"px;"));Z[a]&&q();f&&void 0!==d?(g=0,b.closest(".dwwl").addClass("dwa"),Z[a]=setInterval(function(){g+=0.1;b.data("pos",Math.round((c-d)*Math.sin(g/f*(Math.PI/2))+d));g>=f&&(q(),e())},100),J("onAnimStart",[a,f])):(b.data("pos",c),e())};l.setValue=function(b,a,c,f){f||(l.values=l.temp.slice(0));V&&b&&r(c);a&&(N=h.formatResult(l.temp),
l.val=N,Y&&A.val(N).trigger("change"))};l.validate=function(b,a){r(0.2,b,!0,a)};l.change=function(b){N=h.formatResult(l.temp);"inline"==h.display?l.setValue(!1,b):a(".dwv",m).html(y(N));b&&J("onChange",[N])};l.changeWheel=function(b,c){if(m){var f=0,d,e,q=b.length;for(d in h.wheels)for(e in h.wheels[d]){if(-1<a.inArray(f,b)&&(aa[f]=h.wheels[d][e],a(".dw-ul",m).eq(f).html(k(f)),q--,!q)){v();r(c);return}f++}}};l.isVisible=function(){return V};l.tap=function(b,a){var f,c;b.bind("touchstart",function(b){b.preventDefault();
f=!1;c=!0}).bind("touchmove",function(){f=!0}).bind("touchend",function(b){f||a.call(this,b)}).bind("click",function(b){c||a.call(this,b)})};l.show=function(b){if(h.disabled||V)return!1;"top"==h.display&&(R="slidedown");"bottom"==h.display&&(R="slideup");fa();J("onBeforeShow",[m]);var f=0,d,e="";R&&!b&&(e="dw-"+R+" dw-in");for(var q='<div class="dw-trans '+h.theme+" dw-"+h.display+'">'+("inline"==h.display?'<div class="dw dwbg dwi"><div class="dwwr">':'<div class="dw-persp"><div class="dwo"></div><div class="dw dwbg '+
e+'"><div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div><div class="dwwr">'+(h.headerText?'<div class="dwv"></div>':"")),b=0;b<h.wheels.length;b++){q+='<div class="dwc'+("scroller"!=h.mode?" dwpm":" dwsc")+(h.showLabel?"":" dwhl")+'"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>';for(d in h.wheels[b])aa[f]=h.wheels[b][d],q+='<td><div class="dwwl dwrc dwwl'+f+'">'+("scroller"!=h.mode?'<div class="dwwb dwwbp" style="height:'+G+"px;line-height:"+G+
'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:'+G+"px;line-height:"+G+'px;"><span>&ndash;</span></div>':"")+'<div class="dwl">'+d+'</div><div class="dww" style="height:'+h.rows*G+"px;min-width:"+h.width+'px;"><div class="dw-ul">',q+=k(f),q+='</div><div class="dwwo"></div></div><div class="dwwol"></div></div></td>',f++;q+="</tr></table></div></div>"}q+=("inline"!=h.display?'<div class="dwbc'+(h.button3?" dwbc-p":"")+'"><span class="dwbw dwb-s"><span class="dwb">'+h.setText+"</span></span>"+
(h.button3?'<span class="dwbw dwb-n"><span class="dwb">'+h.button3Text+"</span></span>":"")+'<span class="dwbw dwb-c"><span class="dwb">'+h.cancelText+"</span></span></div></div>":'<div class="dwcc"></div>')+"</div></div></div>";m=a(q);r();J("onMarkupReady",[m]);"inline"!=h.display?(m.appendTo("body"),setTimeout(function(){m.removeClass("dw-trans").find(".dw").removeClass(e)},350)):A.is("div")?A.html(m):m.insertAfter(A);V=!0;ea.init(m,l);"inline"!=h.display&&(l.tap(a(".dwb-s span",m),function(){if(l.hide(false,
"set")!==false){l.setValue(false,true);J("onSelect",[l.val])}}),l.tap(a(".dwb-c span",m),function(){l.cancel()}),h.button3&&l.tap(a(".dwb-n span",m),h.button3),h.scrollLock&&m.bind("touchmove",function(b){K<=C&&U<=Q&&b.preventDefault()}),a("input,select,button").each(function(){a(this).prop("disabled")||a(this).addClass("dwtd").prop("disabled",true)}),v(),a(window).bind("resize.dw",function(){clearTimeout(S);S=setTimeout(function(){v(true)},100)}));m.delegate(".dwwl","DOMMouseScroll mousewheel",function(b){if(!E(this)){b.preventDefault();
var b=b.originalEvent,b=b.wheelDelta?b.wheelDelta/120:b.detail?-b.detail/3:0,f=a(".dw-ul",this),c=+f.data("pos"),c=Math.round(c-b);i(f);j(f,c,b<0?1:2,true,c)}}).delegate(".dwb, .dwwb",H,function(){a(this).addClass("dwb-a")}).delegate(".dwwb",H,function(b){b.stopPropagation();b.preventDefault();var f=a(this).closest(".dwwl");if(x(b)&&!E(f)&&!f.hasClass("dwa")){c=true;var d=f.find(".dw-ul"),q=a(this).hasClass("dwwbp")?ka:la;i(d);clearInterval(g);g=setInterval(function(){q(d)},h.delay);q(d)}}).delegate(".dwwl",
H,function(b){b.preventDefault();if(x(b)&&!p&&!E(this)&&!c&&h.mode!="clickpick"){p=true;a(document).bind(L,O);t=a(".dw-ul",this);t.closest(".dwwl").addClass("dwa");F=+t.data("pos");i(t);I=Z[u]!==void 0;z=B(b);ja=new Date;s=z;l.scroll(t,u,F)}});J("onShow",[m,N])};l.hide=function(b,f){if(!1===J("onClose",[N,f]))return!1;a(".dwtd").prop("disabled",!1).removeClass("dwtd");A.blur();m&&("inline"!=h.display&&R&&!b?(a(".dw",m).addClass("dw-"+R+" dw-out"),setTimeout(function(){m.remove();m=null},350)):(m.remove(),
m=null),V=!1,a(window).unbind(".dw"))};l.cancel=function(){!1!==l.hide(!1,"cancel")&&J("onCancel",[l.val])};l.init=function(b){ea=D({defaults:{},init:w},da.themes[b.theme||h.theme]);ha=da.i18n[b.lang||h.lang];D(q,b);D(h,ea.defaults,ha,q);l.settings=h;A.unbind(".dw");if(b=da.presets[h.preset])ba=b.call(P,l),D(h,ba,q),D(f,ba.methods);ga=Math.floor(h.rows/2);G=h.height;R=h.animate;void 0!==A.data("dwro")&&(P.readOnly=X(A.data("dwro")));V&&l.hide();"inline"==h.display?l.show():(fa(),Y&&h.showOnFocus&&
(A.data("dwro",P.readOnly),P.readOnly=!0,A.bind("focus.dw",function(){l.show()})))};l.values=null;l.val=null;l.temp=null;l.init(q)}function x(b){for(var a in b)if(void 0!==S[b[a]])return!0;return!1}function B(b){var a=b.originalEvent,f=b.changedTouches;return f||a&&a.changedTouches?a?a.changedTouches[0].pageY:f[0].pageY:b.pageY}function X(b){return!0===b||"true"==b}function y(b,a,f){b=b>f?f:b;return b<a?a:b}function j(b,f,c,g,j){var f=y(f,d,e),p=a(".dw-li",b).eq(f),k=u,g=g?f==j?0.1:Math.abs(0.1*(f-
j)):0;n.scroll(b,k,f,g,j,function(){n.temp[k]=p.attr("data-val");n.validate(k,c)})}function r(b,a,c){return f[a]?f[a].apply(b,Array.prototype.slice.call(c,1)):"object"===typeof a?f.init.call(b,a):b}var k={},g,w=function(){},o,d,e,n,v=(new Date).getTime(),p,c,t,u,z,s,ja,F,I,S=document.createElement("modernizr").style,$=x(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]),W=function(){var b=["Webkit","Moz","O","ms"],a;for(a in b)if(x([b[a]+"Transform"]))return"-"+
b[a].toLowerCase();return""}(),D=a.extend,M,H="touchstart mousedown",L="touchmove mousemove",O=function(b){b.preventDefault();s=B(b);n.scroll(t,u,y(F+(z-s)/o,d-1,e+1));I=!0},ia={width:70,height:40,rows:3,delay:300,disabled:!1,readonly:!1,showOnFocus:!0,showLabel:!0,wheels:[],theme:"",headerText:"{value}",display:"modal",mode:"scroller",preset:"",lang:"en-US",setText:"Set",cancelText:"Cancel",scrollLock:!0,formatResult:function(b){return b.join(" ")},parseValue:function(b,a){var f=a.settings.wheels,
c=b.split(" "),d=[],e=0,g,j,p;for(g=0;g<f.length;g++)for(j in f[g]){if(void 0!==f[g][j][c[e]])d.push(c[e]);else for(p in f[g][j]){d.push(p);break}e++}return d}},f={init:function(b){void 0===b&&(b={});return this.each(function(){this.id||(v+=1,this.id="scoller"+v);k[this.id]=new i(this,b)})},enable:function(){return this.each(function(){var b=k[this.id];b&&b.enable()})},disable:function(){return this.each(function(){var b=k[this.id];b&&b.disable()})},isDisabled:function(){var b=k[this[0].id];if(b)return b.settings.disabled},
isVisible:function(){var b=k[this[0].id];if(b)return b.isVisible()},option:function(b,a){return this.each(function(){var f=k[this.id];if(f){var c={};"object"===typeof b?c=b:c[b]=a;f.init(c)}})},setValue:function(b,a,f,c){return this.each(function(){var d=k[this.id];d&&(d.temp=b,d.setValue(!0,a,f,c))})},getInst:function(){return k[this[0].id]},getValue:function(){var b=k[this[0].id];if(b)return b.values},show:function(){var b=k[this[0].id];if(b)return b.show()},hide:function(){return this.each(function(){var b=
k[this.id];b&&b.hide()})},destroy:function(){return this.each(function(){var b=k[this.id];b&&(b.hide(),a(this).unbind(".dw"),delete k[this.id],a(this).is("input")&&(this.readOnly=X(a(this).data("dwro"))))})}};a(document).bind("touchend mouseup",function(){if(p){var b=new Date-ja,f=y(F+(z-s)/o,d-1,e+1),k;k=t.offset().top;300>b?(b=(s-z)/b,b=b*b/0.0012,0>s-z&&(b=-b)):b=s-z;if(!b&&!I){k=Math.floor((s-k)/o);var n=a(".dw-li",t).eq(k);n.addClass("dw-hl");setTimeout(function(){n.removeClass("dw-hl")},200)}else k=
Math.round(F-b/o);j(t,k,0,!0,Math.round(f));p=!1;t=null;a(document).unbind(L,O)}c&&(clearInterval(g),c=!1);a(".dwb-a").removeClass("dwb-a")});a.fn.mobiscroll=function(b){D(this,a.mobiscroll.shorts);return r(this,b,arguments)};a.mobiscroll=a.mobiscroll||{setDefaults:function(b){D(ia,b)},presetShort:function(b){this.shorts[b]=function(a){return r(this,D(a,{preset:b}),arguments)}},shorts:{},presets:{},themes:{},i18n:{}};a.scroller=a.scroller||a.mobiscroll;a.fn.scroller=a.fn.scroller||a.fn.mobiscroll})(jQuery);(function(a){var i=a.mobiscroll,x=new Date,B={dateFormat:"mm/dd/yy",dateOrder:"mmddy",timeWheels:"hhiiA",timeFormat:"hh:ii A",startYear:x.getFullYear()-100,endYear:x.getFullYear()+1,monthNames:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),monthNamesShort:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),dayNames:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),dayNamesShort:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
shortYearCutoff:"+10",monthText:"Month",dayText:"Day",yearText:"Year",hourText:"Hours",minuteText:"Minutes",secText:"Seconds",ampmText:"&nbsp;",nowText:"Now",showNow:!1,stepHour:1,stepMinute:1,stepSecond:1,separator:" "},X=function(y){function j(a,b,c){return void 0!==p[b]?+a[p[b]]:void 0!==c?c:$[t[b]]?$[t[b]]():t[b]($)}function r(a,b){return Math.floor(a/b)*b}function k(a){var b=j(a,"h",0);return new Date(j(a,"y"),j(a,"m"),j(a,"d",1),j(a,"a")?b+12:b,j(a,"i",0),j(a,"s",0))}var g=a(this),w={},o;if(g.is("input")){switch(g.attr("type")){case "date":o=
"yy-mm-dd";break;case "datetime":o="yy-mm-ddTHH:ii:ssZ";break;case "datetime-local":o="yy-mm-ddTHH:ii:ss";break;case "month":o="yy-mm";w.dateOrder="mmyy";break;case "time":o="HH:ii:ss"}var d=g.attr("min"),g=g.attr("max");d&&(w.minDate=i.parseDate(o,d));g&&(w.maxDate=i.parseDate(o,g))}var e=a.extend({},B,w,y.settings),n=0,w=[],v=[],p={},c,t={y:"getFullYear",m:"getMonth",d:"getDate",h:function(a){a=a.getHours();a=I&&12<=a?a-12:a;return r(a,W)},i:function(a){return r(a.getMinutes(),D)},s:function(a){return r(a.getSeconds(),
M)},a:function(a){return F&&11<a.getHours()?1:0}},u=e.preset,z=e.dateOrder,s=e.timeWheels,x=z.match(/D/),F=s.match(/a/i),I=s.match(/h/),S="datetime"==u?e.dateFormat+e.separator+e.timeFormat:"time"==u?e.timeFormat:e.dateFormat,$=new Date,W=e.stepHour,D=e.stepMinute,M=e.stepSecond,H=e.minDate||new Date(e.startYear,0,1),L=e.maxDate||new Date(e.endYear,11,31,23,59,59);y.settings=e;o=o||S;if(u.match(/date/i)){a.each(["y","m","d"],function(a,b){c=z.search(RegExp(b,"i"));-1<c&&v.push({o:c,v:b})});v.sort(function(a,
b){return a.o>b.o?1:-1});a.each(v,function(a,b){p[b.v]=a});g={};for(d=0;3>d;d++)if(d==p.y){n++;g[e.yearText]={};var O=H.getFullYear(),X=L.getFullYear();for(c=O;c<=X;c++)g[e.yearText][c]=z.match(/yy/i)?c:(c+"").substr(2,2)}else if(d==p.m){n++;g[e.monthText]={};for(c=0;12>c;c++)O=z.replace(/[dy]/gi,"").replace(/mm/,9>c?"0"+(c+1):c+1).replace(/m/,c),g[e.monthText][c]=O.match(/MM/)?O.replace(/MM/,'<span class="dw-mon">'+e.monthNames[c]+"</span>"):O.replace(/M/,'<span class="dw-mon">'+e.monthNamesShort[c]+
"</span>")}else if(d==p.d){n++;g[e.dayText]={};for(c=1;32>c;c++)g[e.dayText][c]=z.match(/dd/i)&&10>c?"0"+c:c}w.push(g)}if(u.match(/time/i)){v=[];a.each(["h","i","s","a"],function(a,b){a=s.search(RegExp(b,"i"));-1<a&&v.push({o:a,v:b})});v.sort(function(a,b){return a.o>b.o?1:-1});a.each(v,function(a,b){p[b.v]=n+a});g={};for(d=n;d<n+4;d++)if(d==p.h){n++;g[e.hourText]={};for(c=0;c<(I?12:24);c+=W)g[e.hourText][c]=I&&0==c?12:s.match(/hh/i)&&10>c?"0"+c:c}else if(d==p.i){n++;g[e.minuteText]={};for(c=0;60>
c;c+=D)g[e.minuteText][c]=s.match(/ii/)&&10>c?"0"+c:c}else if(d==p.s){n++;g[e.secText]={};for(c=0;60>c;c+=M)g[e.secText][c]=s.match(/ss/)&&10>c?"0"+c:c}else d==p.a&&(n++,u=s.match(/A/),g[e.ampmText]={"0":u?"AM":"am",1:u?"PM":"pm"});w.push(g)}y.setDate=function(a,b,c,d){for(var e in p)this.temp[p[e]]=a[t[e]]?a[t[e]]():t[e](a);this.setValue(!0,b,c,d)};y.getDate=function(a){return k(a)};return{button3Text:e.showNow?e.nowText:void 0,button3:e.showNow?function(){y.setDate(new Date,!1,0.3,!0)}:void 0,wheels:w,
headerText:function(){return i.formatDate(S,k(y.temp),e)},formatResult:function(a){return i.formatDate(o,k(a),e)},parseValue:function(a){var b=new Date,c,d=[];try{b=i.parseDate(o,a,e)}catch(g){}for(c in p)d[p[c]]=b[t[c]]?b[t[c]]():t[c](b);return d},validate:function(c){var b=y.temp,d={y:H.getFullYear(),m:0,d:1,h:0,i:0,s:0,a:0},g={y:L.getFullYear(),m:11,d:31,h:r(I?11:23,W),i:r(59,D),s:r(59,M),a:1},k=!0,n=!0;a.each("y,m,d,a,h,i,s".split(","),function(o,i){if(p[i]!==void 0){var r=d[i],y=g[i],F=31,s=
j(b,i),v=a(".dw-ul",c).eq(p[i]),u,w;if(i=="d"){u=j(b,"y");w=j(b,"m");y=F=32-(new Date(u,w,32)).getDate();x&&a(".dw-li",v).each(function(){var b=a(this),c=b.data("val"),d=(new Date(u,w,c)).getDay(),c=z.replace(/[my]/gi,"").replace(/dd/,c<10?"0"+c:c).replace(/d/,c);a(".dw-i",b).html(c.match(/DD/)?c.replace(/DD/,'<span class="dw-day">'+e.dayNames[d]+"</span>"):c.replace(/D/,'<span class="dw-day">'+e.dayNamesShort[d]+"</span>"))})}k&&H&&(r=H[t[i]]?H[t[i]]():t[i](H));n&&L&&(y=L[t[i]]?L[t[i]]():t[i](L));
if(i!="y"){var I=a(".dw-li",v).index(a('.dw-li[data-val="'+r+'"]',v)),B=a(".dw-li",v).index(a('.dw-li[data-val="'+y+'"]',v));a(".dw-li",v).removeClass("dw-v").slice(I,B+1).addClass("dw-v");i=="d"&&a(".dw-li",v).removeClass("dw-h").slice(F).addClass("dw-h")}s<r&&(s=r);s>y&&(s=y);k&&(k=s==r);n&&(n=s==y);if(e.invalid&&i=="d"){var m=[];e.invalid.dates&&a.each(e.invalid.dates,function(b,a){a.getFullYear()==u&&a.getMonth()==w&&m.push(a.getDate()-1)});if(e.invalid.daysOfWeek){var D=(new Date(u,w,1)).getDay(),
C;a.each(e.invalid.daysOfWeek,function(b,a){for(C=a-D;C<F;C=C+7)C>=0&&m.push(C)})}e.invalid.daysOfMonth&&a.each(e.invalid.daysOfMonth,function(b,a){a=(a+"").split("/");a[1]?a[0]-1==w&&m.push(a[1]-1):m.push(a[0]-1)});a.each(m,function(b,c){a(".dw-li",v).eq(c).removeClass("dw-v")})}b[p[i]]=s}})},methods:{getDate:function(c){var b=a(this).mobiscroll("getInst");if(b)return b.getDate(c?b.temp:b.values)},setDate:function(c,b,d,e){void 0==b&&(b=!1);return this.each(function(){var g=a(this).mobiscroll("getInst");
g&&g.setDate(c,b,d,e)})}}}};a.each(["date","time","datetime"],function(a,j){i.presets[j]=X;i.presetShort(j)});i.formatDate=function(i,j,r){if(!j)return null;var r=a.extend({},B,r),k=function(a){for(var d=0;o+1<i.length&&i.charAt(o+1)==a;)d++,o++;return d},g=function(a,d,c){d=""+d;if(k(a))for(;d.length<c;)d="0"+d;return d},w=function(a,d,c,e){return k(a)?e[d]:c[d]},o,d="",e=!1;for(o=0;o<i.length;o++)if(e)"'"==i.charAt(o)&&!k("'")?e=!1:d+=i.charAt(o);else switch(i.charAt(o)){case "d":d+=g("d",j.getDate(),
2);break;case "D":d+=w("D",j.getDay(),r.dayNamesShort,r.dayNames);break;case "o":d+=g("o",(j.getTime()-(new Date(j.getFullYear(),0,0)).getTime())/864E5,3);break;case "m":d+=g("m",j.getMonth()+1,2);break;case "M":d+=w("M",j.getMonth(),r.monthNamesShort,r.monthNames);break;case "y":d+=k("y")?j.getFullYear():(10>j.getYear()%100?"0":"")+j.getYear()%100;break;case "h":var n=j.getHours(),d=d+g("h",12<n?n-12:0==n?12:n,2);break;case "H":d+=g("H",j.getHours(),2);break;case "i":d+=g("i",j.getMinutes(),2);break;
case "s":d+=g("s",j.getSeconds(),2);break;case "a":d+=11<j.getHours()?"pm":"am";break;case "A":d+=11<j.getHours()?"PM":"AM";break;case "'":k("'")?d+="'":e=!0;break;default:d+=i.charAt(o)}return d};i.parseDate=function(i,j,r){var k=new Date;if(!i||!j)return k;var j="object"==typeof j?j.toString():j+"",g=a.extend({},B,r),w=g.shortYearCutoff,r=k.getFullYear(),o=k.getMonth()+1,d=k.getDate(),e=-1,n=k.getHours(),k=k.getMinutes(),v=0,p=-1,c=!1,t=function(a){(a=x+1<i.length&&i.charAt(x+1)==a)&&x++;return a},
u=function(a){t(a);a=j.substr(s).match(RegExp("^\\d{1,"+("@"==a?14:"!"==a?20:"y"==a?4:"o"==a?3:2)+"}"));if(!a)return 0;s+=a[0].length;return parseInt(a[0],10)},z=function(a,c,d){a=t(a)?d:c;for(c=0;c<a.length;c++)if(j.substr(s,a[c].length).toLowerCase()==a[c].toLowerCase())return s+=a[c].length,c+1;return 0},s=0,x;for(x=0;x<i.length;x++)if(c)"'"==i.charAt(x)&&!t("'")?c=!1:s++;else switch(i.charAt(x)){case "d":d=u("d");break;case "D":z("D",g.dayNamesShort,g.dayNames);break;case "o":e=u("o");break;case "m":o=
u("m");break;case "M":o=z("M",g.monthNamesShort,g.monthNames);break;case "y":r=u("y");break;case "H":n=u("H");break;case "h":n=u("h");break;case "i":k=u("i");break;case "s":v=u("s");break;case "a":p=z("a",["am","pm"],["am","pm"])-1;break;case "A":p=z("A",["am","pm"],["am","pm"])-1;break;case "'":t("'")?s++:c=!0;break;default:s++}100>r&&(r+=(new Date).getFullYear()-(new Date).getFullYear()%100+(r<=("string"!=typeof w?w:(new Date).getFullYear()%100+parseInt(w,10))?0:-100));if(-1<e){o=1;d=e;do{g=32-
(new Date(r,o-1,32)).getDate();if(d<=g)break;o++;d-=g}while(1)}n=new Date(r,o-1,d,-1==p?n:p&&12>n?n+12:!p&&12==n?0:n,k,v);if(n.getFullYear()!=r||n.getMonth()+1!=o||n.getDate()!=d)throw"Invalid date";return n}})(jQuery);(function(a){a.mobiscroll.themes.jqm={defaults:{jqmBorder:"a",jqmBody:"c",jqmHeader:"b",jqmWheel:"d",jqmClickPick:"c",jqmSet:"b",jqmCancel:"c"},init:function(i,x){var B=x.settings;a(".dw",i).removeClass("dwbg").addClass("ui-overlay-shadow ui-corner-all ui-body-"+B.jqmBorder);a(".dwb-s span",i).attr("data-role","button").attr("data-theme",B.jqmSet);a(".dwb-n span",i).attr("data-role","button").attr("data-theme",B.jqmCancel);a(".dwb-c span",i).attr("data-role","button").attr("data-theme",B.jqmCancel);
a(".dwwb",i).attr("data-role","button").attr("data-theme",B.jqmClickPick);a(".dwv",i).addClass("ui-header ui-bar-"+B.jqmHeader);a(".dwwr",i).addClass("ui-body-"+B.jqmBody);a(".dwpm .dww",i).addClass("ui-body-"+B.jqmWheel);i.trigger("create");a(".dwo",i).click(function(){x.cancel()})}}})(jQuery);(function(a){a.mobiscroll.themes.ios={defaults:{dateOrder:"MMdyy",rows:5,height:30,width:55,headerText:!1,showLabel:!1}}})(jQuery);(function(a){a.mobiscroll.themes.android={defaults:{dateOrder:"Mddyy",mode:"clickpick",height:50}}})(jQuery);





	$( document ).bind( "mobileinit", function() {
	    $.support.cors =true;
	    $.mobile.allowCrossDomainPages = true;
	});
//	$("[data-role=header]").fixedtoolbar({ updatePagePadding: false });
	$(function() {
		var action='restaurants';
		$.ajax({
			  type: "POST",
			  url: "http://www.indo-valdarno.com/tmpl/mobile/helper.php",
			  data: { q: action },
			  beforeSend: function ( xhr ) {
			  },
			  success: function( msg ) {
			  	$('body').height($(window).height()).css('background','url(http://www.indo-valdarno.com/tmpl/mobile/img/loading.gif) #ffffff center '+(($(window).height() / 2) - 100)+'px no-repeat');
			    $( "#page").hide();
			  	$( "#page").html(msg);
			  	setTimeout(function(){$( "#page").show();}, 1000);
			 }
		});
	});














		
		var map,
		  clientPosition,
	      defaultPosition,
          directionsDisplay, 
          directionsService;
        var steps = new Array;
        var sections= new Array;
	    var defaultPosition = new google.maps.LatLng(43.573731,11.523004);
	    var directionsDisplay = new google.maps.DirectionsRenderer(); 
	    var directionsService = new google.maps.DirectionsService();
	    var item;
    
	    if(getCookie("bookmarks")){
		     var bookmarks = getCookie("bookmarks").split(',');
	    }else{
		    var bookmarks = new Array;
	    }

	    function setCookies(){
               if($.inArray(getURLParameter('id_item'),bookmarks)<0)
                bookmarks.push(getURLParameter('id_item'))  ;
                setCookie("bookmarks", bookmarks.join(','));
                $( "#btn-bookmark").hide();
	    }
		//$("[data-role=header]").fixedtoolbar({ updatePagePadding: false });
		function setMenu(){
			Interfaccia(2100,'location','.ui-btn-text');
			Interfaccia(2101,'events','.ui-btn-text');
			Interfaccia(2102,'bookmarks','.ui-btn-text');			
			Interfaccia(2100,'mlocation','.ui-btn-text');
			Interfaccia(2101,'mevents','.ui-btn-text');
			Interfaccia(2102,'mbookmarks','.ui-btn-text');
			Interfaccia(2100,'plocation','.ui-btn-text');
			Interfaccia(2101,'pevents','.ui-btn-text');
			Interfaccia(2102,'pbookmarks','.ui-btn-text');
			Interfaccia(2109,'btn-prenota','.ui-btn-text');
			
			
			
		}
		
			function showformResponse(data){
	                if(data=="success"){
		                $('#form_canvas').html('<div align="center" class="lead">La prenotazione &egrave stata inviata correttamente!</div>');
	                } 
		}
		$(function() {
			var formoptions = { 
		        success:       showformResponse  // post-submit callback 
		    };
			var v = $("#form_restaurants").validate({
			rules: {
				name: "required",
				email: {
					required: true,
					email: true
				},
				date: "required",
				tel: "required"
				
			},
			submitHandler: function(form) {
				$(form).ajaxSubmit(formoptions);
			}
		});

		
			setMenu();
			
			$('#btn-prenota').click(function(){
				setMenu();
			});
			$('#restaurant_date').mobiscroll().date({
						display:'top',
						dateFormat: "yyyy-mm-dd",
						dateOrder:	"ddmmyyyy"
			}); 
						
			var action='item';
			if(getURLParameter('lingua')){
				options={ q: action ,id_item:getURLParameter('id_item'),lingua:getURLParameter('lingua')}
			}else{
				options={ q: action  ,id_item:getURLParameter('id_item')}
			}
			$.ajax({
				  type: "POST",
				  url: "http://www.indo-valdarno.com/tmpl/mobile/helper.php",
				  data: options,
				  dataType:'json',
				  beforeSend: function ( xhr ) {
				  },
				  success: function( msg ) {
				  	//$('body').height($(window).height()).css('background','url(http://www.indo-valdarno.com/tmpl/mobile/img/loading.gif) #ffffff center '+(($(window).height() / 2) - 100)+'px no-repeat');
				    //$( "#page").hide();
				    item=msg;
				  	$( "#details_img").attr('src','http://www.indo-valdarno.com'+msg.img.path);
				  	if(item.bookmarked==0){
					  	$( "#btn-bookmark").show();
				  	}
				  	if(getURLParameter('section') != 'restaurants' && getURLParameter('section') != 'services'){
				  		
					  	$('#btn-prenota').hide();
					  	$('#controlgroup').controlgroup("refresh");
					  	$('#map_button').width('100%');
					  	
				  	}
				  	$( "#details_title").html(msg.titolo);
				  	$( "#details_description").html(msg.descrizione);
				  	$( "#details_abstract").html(msg.abstract);
				  	$('#form_abstract').val(msg.abstract);
				  	$( "#directions_title").html(msg.location.address);
				  	$("a[data-ajax=false]").click(handleClick);
				  	$('.form_title').val(msg.titolo);
				  	

				  	if(getURLParameter('section') != 'restaurants'){
					  	$('#persons_group, #data_group').hide();
				  	}
				  	if(getURLParameter('section') == 'services'){
				  		$('#form_restaurants input[name=restaurant]').attr('name','service');
				  	}
                    $( "#btn-bookmark").click(function(){
                    	setCookies();
                    });
                    $('#ratingtext').html("rated " + item.rating);
                    $('#current-rating').width(item.rating * 25);
                    if(item.unrated==0){
	                    $('#cover_rating').show();
                    }
                    
                    $.ajax({
						  type: "POST",
						  url: "http://www.indo-valdarno.com/tmpl/mobile/helper.php",
						  data: { section: getURLParameter('section'),q: 'form'},
						  dataType:'json',
						  beforeSend: function ( xhr ) {
						  },
						  success: function( msg ) {
						  	$('#form').html(msg);
						 }
					});
				  	//setTimeout(function(){$( "#page").show();}, 1000);
				 }
			});
		$("a[data-ajax=false]").click(handleClick);
		 $('#map_canvas').css('padding','0px').height($(window).height() - $('#map_header').height() - $('#map_footer').height() -144);
				
		 $('#directions').height($(window).height() - 113).niceScroll();

				
		 $('#map_button').click(function(){

			map= $('#map_canvas').gmap({'center': defaultPosition ,'zoom':11}).bind('init', function(evt, map) {
			directionsDisplay.setMap(map);
			directionsDisplay.setOptions( { suppressMarkers: true } );
			defaultPosition=new google.maps.LatLng(item.location.lat, item.location.lon);
			var marker= $('#map_canvas').gmap('addMarker', {  'position': defaultPosition, 'bounds': true, 'icon':'http://www.indo-valdarno.com/tmpl/img/market.png' });
			$('#map_canvas').gmap('getCurrentPosition', function(position, status) {
						if ( status === 'OK' ) {
							clientPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
							$('#map_canvas').gmap('addMarker', {'position': clientPosition, 'bounds': true, 'icon':'http://www.indo-valdarno.com/tmpl/img/car.png'});
                            calculateRoute();
                        }
			});
		 });
		 	
		
		});

			Interfaccia(2078,'name');
			Interfaccia(2079,'email');
			Interfaccia(2081,'date');
			Interfaccia(2080,'tel');
			Interfaccia(2082,'persons');
			Interfaccia(2083,'comment');

	});


function instructions_popup(ind){
        var step =steps[ind];

    	var point=new google.maps.LatLng(step.lat + 0.0003,step.lon);
    	$('#map_canvas').gmap('get','map').setOptions({'center':point,'zoom':18});
		$('#step_txt').html(step.instructions);
		$('#step_dist').height($('#step_txt').height()).html('<div class="ui-li-count ui-btn-up-c ui-btn-corner-all" style="margin-top:'+(($('#step_txt').height() -20)/2)  +'px">'+step.distance+'</div>');
		$('#popupDirections').popup('open');
    	$("#panel").panel('close');

}

function calculateRoute() {
	$('#directions').height($(window).height()-100);
    if (clientPosition && clientPosition != '') {
        var request = {
            origin: clientPosition, 
            destination:defaultPosition,
            travelMode: google.maps.DirectionsTravelMode["DRIVING"]
        };

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                //directionsDisplay.setPanel(document.getElementById("directions"));
                directionsDisplay.setDirections(response); 
                var html='<ul data-role="listview"  data-inset="true">';
                    var myRoute = response.routes[0].legs[0];
                    for (var i = 0; i < myRoute.steps.length; i++) {
                     route=myRoute.steps[i];
                     	steps[i] = new Array;
                         steps[i]['lat']= route.lat_lngs[0].lat();
                         steps[i]['lon']= route.lat_lngs[0].lng();
                         steps[i]['instructions']=route.instructions;
                         steps[i]['distance']= route.distance.text;
                        html+="<li><a href='#' onclick='instructions_popup("+i+")' >"+route.instructions+'<span class="ui-li-count ui-btn-up-c ui-btn-corner-all">'+route.distance.text+"</span></a>"+'</li>';
                    }
				html+='</ul>';
                $("#directions").html(html);
                $("#directions ul").listview();

            }
        });
    }
}




	

	
	if($(window).width()<=500){
	
	   var m3_u = (location.protocol=='https:'?'https://ads.hiho.it/openAds/www/delivery/ajs.php':'http://ads.hiho.it/openAds/www/delivery/ajs.php');
	   var m3_r = Math.floor(Math.random()*99999999999);
	   if (!document.MAX_used) document.MAX_used = ',';
	   document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
	   document.write ("?zoneid=50");
	   document.write ('&amp;cb=' + m3_r);
	   if (document.MAX_used != ',') document.write ("&amp;exclude=" + document.MAX_used);
	   document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));
	   document.write ("&amp;loc=" + escape(window.location));
	   if (document.referrer) document.write ("&amp;referer=" + escape(document.referrer));
	   if (document.context) document.write ("&context=" + escape(document.context));
	   if (document.mmm_fo) document.write ("&amp;mmm_fo=1");
	   document.write ("'><\/scr"+"ipt>");
	
	
	}else{
	
	
	   var m3_u = (location.protocol=='https:'?'https://ads.hiho.it/openAds/www/delivery/ajs.php':'http://ads.hiho.it/openAds/www/delivery/ajs.php');
	   var m3_r = Math.floor(Math.random()*99999999999);
	   if (!document.MAX_used) document.MAX_used = ',';
	   document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
	   document.write ("?zoneid=51");
	   document.write ('&amp;cb=' + m3_r);
	   if (document.MAX_used != ',') document.write ("&amp;exclude=" + document.MAX_used);
	   document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));
	   document.write ("&amp;loc=" + escape(window.location));
	   if (document.referrer) document.write ("&amp;referer=" + escape(document.referrer));
	   if (document.context) document.write ("&context=" + escape(document.context));
	   if (document.mmm_fo) document.write ("&amp;mmm_fo=1");
	   document.write ("'><\/scr"+"ipt>");
	
	}
$(function(){
	$('.header a,.header span').removeAttr('class');
	$('.header span img').css({'display':'block','margin':'0 auto'});
});

















            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        




            app.initialize();
        

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});


/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};








            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        




            app.initialize();
        

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});


/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


/*! http://code.google.com/p/jquery-ui-map/ | Johan S�ll Larsson */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(8($){$.I($.1X.1V.1U,{1T:8(b,c){r d=l;C.I(d.k(\'j\',{}),{\'1S-o\':{},\'1R\':{\'9\':2},\'1Q\':{},\'1P\':{},\'1N\':{},\'1M\':{\'m\':2},\'t\':{},\'1L\':{},\'1K-o\':{},\'1J\':{},\'1I\':{},\'1G\':{},\'1F\':{},\'1E\':{},\'v-w\':{},\'v-D\':{},\'v-q\':{},\'1D\':{\'9\':2},\'1x\':{},\'1w-G\':{},\'1s-o\':{},\'15\':{},\'11\':{\'9\':2},\'N-o\':{},\'M\':{\'4\':2},\'1n\':{\'4\':2},\'J-O\':{},\'J-P\':{},\'Q\':{\'4\':2},\'R\':{\'4\':2},\'S\':{},\'T\':{\'9\':2},\'U\':{},\'V\':{},\'W\':{},\'X\':{\'9\':2},\'Y\':{},\'Z\':{},\'10\':{},\'n\':{\'9\':2},\'12\':{\'m\':2},\'13\':{},\'14\':{\'9\':2},\'H-o\':{},\'H-16\':{},\'17\':{},\'18\':{},\'19-1a-1b\':{},\'1c-1d\':{},\'1e\':{\'4\':2},\'1f\':{},\'1g\':{},\'1h\':{},\'1i\':{},\'1j\':{},\'1k\':{},\'1l\':{},\'1m\':{},\'L-1o\':{},\'1p\':{},\'1q-G\':{},\'D\':{},\'1r\':{\'m\':2},\'q\':{},\'5\':{},\'1t\':{},\'1u\':{},\'1v\':{},\'F\':{\'m\':2},\'z\':{},\'z-q\':{},\'1y\':{\'4\':2},\'1z\':{\'4\':2},\'1A\':{\'4\':2},\'1B\':{},\'1C\':{\'4\':2}});$(b).s(8(i,a){c(d.p($(l),{\'@5\':b.1H(\'.\',\'\')}),l,i)})},p:8(e,f){r g=l;e.u().s(8(){r c=$(l);3(c.6(\'t\')){r d=c.6(\'t\').1O(\' \'),B=[],5;$.s(d,8(a,b){3(g.k(\'j\')[b]&&g.k(\'j\')[b].4){5=b}7{B.x(b)}});$.s(B,8(a,b){3(g.k(\'j\')[b]){5=5||b;3(g.k(\'j\')[b].9&&c.u().y>0){3(!f[b]){f[b]=[]}f[b].x({\'@5\':5});g.p(c,f[b][f[b].y-1])}7{3(c.u().y>0){f[b]={\'@5\':5};g.p(c,f[b])}7{3(g.k(\'j\')[b].m){3(!f[b]){f[b]=[]}f[b].x(g.A(c,b))}7{f[b]=g.A(c,b)}}}}})}7{g.p(c,f)}});h f},A:8(a,b){3(b===\'z-q\'){h a.6(\'q\')}7 3(b===\'F\'){h a.6(\'1W\')}3(a.6(\'K\')){h a.6(\'K\')}7 3(a.6(\'w\')){h a.6(\'w\')}7 3(a.E()){h a.E()}h}})}(C));',62,122,'||true|if|isRoot|type|attr|else|function|hasChildren||||||||return||properties|get|this|isMultivalued||name|_traverse|title|var|each|class|children|entry|content|push|length|value|_extract|cls|jQuery|summary|text|url|address|organization|extend|honorific|src|sort|hentry|given|prefix|suffix|hresume|hreview|item|key|label|latitude|locality|location|logo|longitude|mailer|geo|nickname|note|org|fn|unit|permalink|photo|post|office|box|postal|code|profile|publications|published|rating|region|rev|reviewer|role|skill|hfeed|string|sound|street|tel|family|tz|uid|updated|extended|experience|vcalendar|vcard|vevent|version|xoxo|email|education|dtstart|dtreviewed|replace|dtend|description|country|contact|category|bday|split|author|affiliation|adr|additional|microformat|prototype|gmap|href|ui'.split('|'),0,{}))

/*! http://code.google.com/p/jquery-ui-map/ | Johan S�ll Larsson */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(5($){$.x($.y.C.A,{B:5(a,b){l c=8;$(\'[k="{0}"]\'.j(\'{0}\',a)).o(5(i){b(c.e($(8),{\'@p\':c.9($(8).3(\'k\'))}),8,i)})},e:5(b,c){l d=8;b.q().o(5(){l a=$(8),g=d.9(a.3(\'k\')),7=d.9(a.3(\'7\')),4=d.9(a.3(\'4\'));2(g||7||4){2(7){2(a.q().r>0){c[7]=[];d.e(a,c[7])}f{c[7]=d.h(a,z)}}2(g){c.m({\'@p\':g});d.e(a,c[c.r-1])}2(4){2(c[4]){c[4]=[c[4]];c[4].m(d.h(a,w))}f{c[4]=d.h(a,w)}}}f{d.e(a,c)}});6 c},h:5(a,b){2(b){2(a.3(\'v\')){6 a.3(\'v\')}2(a.3(\'u\')){6 a.3(\'u\')}}2(a.3(\'t\')){6 a.3(\'t\')}2(a.s()){6 a.s()}6},9:5(a){2(a){2(a.n(\'D\')>-1){a=a.E(a.F(\'/\')+1).j(\'?\',\'\').j(\'#\',\'\')}f 2(a.n(\':\')>-1){a=a.G(\':\')[1]}}6 a}})}(H));',44,44,'||if|attr|property|function|return|rel|this|_resolveType|||||_traverse|else|typeOf|_extract||replace|typeof|var|push|indexOf|each|type|children|length|text|content|href|src|false|extend|ui|true|prototype|rdfa|gmap|http|substr|lastIndexOf|split|jQuery'.split('|'),0,{}))

/*! jquery-ui-map rc1 | Johan Säll Larsson */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(3(d){d.a=3(a,b){j c=a.v(".")[0],a=a.v(".")[1];d[c]=d[c]||{};d[c][a]=3(a,b){I.O&&2.1i(a,b)};d[c][a].K=d.n({1s:c,1u:a},b);d.N[a]=3(b){j g="1p"===1k b,f=L.K.X.W(I,1),i=2;l(g&&"1j"===b.1l(0,1))6 i;2.18(3(){j h=d.1b(2,a);h||(h=d.1b(2,a,k d[c][a](b,2)));g&&(i=h[b].14(h,f))});6 i}};d.a("1J.1G",{u:{1A:"1x",1y:5},1B:3(a,b){6 b?(2.u[a]=b,2.4("9").x(a,b),2):2.u[a]},1i:3(a,b){2.E=b;a=a||{};m.n(2.u,a,{1h:2.w(a.1h)});2.1g();2.1f&&2.1f()},1g:3(){j a=2;2.o={9:k 8.7.1D(a.E,a.u),M:[],p:[],q:[]};8.7.G.1C(a.o.9,"1F",3(){d(a.E).19("1E",a.o.9)});a.C(a.u.1t,a.o.9)},Z:3(a){j b=2.4("12",k 8.7.1z);b.n(2.w(a));2.4("9").1M(b);6 2},1L:3(a){j b=2.4("9").1O();6 b?b.1N(a.Y()):!1},1K:3(a,b){2.4("9").1H[b].J(2.F(a));6 2},1I:3(a,b){a.9=2.4("9");a.13=2.w(a.13);j c=k(a.1n||8.7.1o)(a),e=2.4("M");c.16?e[c.16]=c:e.J(c);c.12&&2.Z(c.Y());2.C(b,a.9,c);6 d(c)},z:3(a){2.B(2.4(a));2.x(a,[]);6 2},B:3(a){y(j b Q a)a.11(b)&&(a[b]r 8.7.17?(8.7.G.1v(a[b]),a[b].A&&a[b].A(t)):a[b]r L&&2.B(a[b]),a[b]=t)},1w:3(a,b,c){a=2.4(a);b.s=d.1m(b.s)?b.s:[b.s];y(j e Q a)l(a.11(e)){j g=!1,f;y(f Q b.s)l(-1<d.1r(b.s[f],a[e][b.1q]))g=!0;10 l(b.V&&"1P"===b.V){g=!1;2c}c(a[e],g)}6 2},4:3(a,b){j c=2.o;l(!c[a]){l(-1<a.2e(">")){y(j e=a.T(/ /g,"").v(">"),d=0;d<e.O;d++){l(!c[e[d]])l(b)c[e[d]]=d+1<e.O?[]:b;10 6 t;c=c[e[d]]}6 c}b&&!c[a]&&2.x(a,b)}6 c[a]},2g:3(a,b,c){j d=2.4("H",a.2f||k 8.7.2i);d.R(a);d.2h(2.4("9"),2.F(b));2.C(c,d);6 2},2b:3(){t!=2.4("H")&&2.4("H").2a();6 2},x:3(a,b){2.o[a]=b;6 2},2d:3(){j a=2.4("9"),b=a.2o();d(a).1e("2q");a.2p(b);6 2},2k:3(){2.z("M").z("q").z("p").B(2.o);m.2n(2.E,2.1W)},C:3(a){a&&d.1X(a)&&a.14(2,L.K.X.W(I,1))},w:3(a){l(!a)6 k 8.7.P(0,0);l(a r 8.7.P)6 a;a=a.T(/ /g,"").v(",");6 k 8.7.P(a[0],a[1])},F:3(a){6!a?t:a r m?a[0]:a r 1Q?a:d("#"+a)[0]},1S:3(a,b,c){j d=2,g=2.4("q > U",k 8.7.U),f=2.4("q > S",k 8.7.S);b&&f.R(b);g.1U(a,3(a,b){"1T"===b?(f.26(a),f.A(d.4("9"))):f.A(t);c(a,b)})},27:3(a,b){2.4("9").29(2.4("q > 1d",k 8.7.1d(2.F(a),b)))},28:3(a,b){2.4("q > 1a",k 8.7.1a).21(a,b)},20:3(a,b){j c=k 8.7[a](m.n({9:2.4("9")},b));2.4("p > "+a,[]).J(c);6 d(c)},22:3(a,b){(!b?2.4("p > D",k 8.7.D):2.4("p > D",k 8.7.D(b,a))).R(m.n({9:2.4("9")},a))},23:3(a,b,c){2.4("p > "+a,k 8.7.1Y(b,m.n({9:2.4("9")},c)))}});m.N.n({1e:3(a){8.7.G.19(2[0],a);6 2},15:3(a,b,c){8.7&&2[0]r 8.7.17?8.7.G.24(2[0],a,b):c?2.1c(a,b,c):2.1c(a,b);6 2}});m.18("25 1R 1Z 1V 2m 2l 2j".v(" "),3(a,b){m.N[b]=3(a,d){6 2.15(b,a,d)}})})(m);',62,151,'||this|function|get||return|maps|google|map||||||||||var|new|if|jQuery|extend|instance|overlays|services|instanceof|value|null|options|split|_latLng|set|for|clear|setMap|_c|_call|FusionTablesLayer|el|_unwrap|event|iw|arguments|push|prototype|Array|markers|fn|length|LatLng|in|setOptions|DirectionsRenderer|replace|DirectionsService|operator|call|slice|getPosition|addBounds|else|hasOwnProperty|bounds|position|apply|addEventListener|id|MVCObject|each|trigger|Geocoder|data|bind|StreetViewPanorama|triggerEvent|_init|_create|center|_setup|_|typeof|substring|isArray|marker|Marker|string|property|inArray|namespace|callback|pluginName|clearInstanceListeners|find|roadmap|zoom|LatLngBounds|mapTypeId|option|addListenerOnce|Map|init|bounds_changed|gmap|controls|addMarker|ui|addControl|inViewport|fitBounds|contains|getBounds|AND|Object|rightclick|displayDirections|OK|route|mouseover|name|isFunction|KmlLayer|dblclick|addShape|geocode|loadFusion|loadKML|addListener|click|setDirections|displayStreetView|search|setStreetView|close|closeInfoWindow|break|refresh|indexOf|infoWindow|openInfoWindow|open|InfoWindow|dragend|destroy|drag|mouseout|removeData|getCenter|setCenter|resize'.split('|'),0,{}))

/*! jquery-ui-map rc1 | Johan Säll Larsson */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(3(d){d.a=3(a,b){7 c=a.r(".")[0],a=a.r(".")[1];d[c]=d[c]||{};d[c][a]=3(a,b){E.L&&2.11(a,b)};d[c][a].F=d.z({1g:c,1l:a},b);d.I[a]=3(b){7 e="1k"===1o b,g=G.F.16.17(E,1),i=2;k(e&&"1n"===b.1m(0,1))4 i;2.13(3(){7 h=d.12(2,a);h||(h=d.12(2,a,n d[c][a](b,2)));e&&(i=h[b].19(h,g))});4 i}};d.a("1i.1d",{p:{1e:"1z",1C:5},1s:3(a,b){4 b?(2.p[a]=b,2.6("j").B(a,b),2):2.p[a]},11:3(a,b){2.u=b;a=a||{};l.z(2.p,a,{10:2.v(a.10)});2.18();2.1a&&2.1a()},18:3(){7 a=2;2.m={j:n 8.9.1u(a.u,a.p),C:[],M:[],W:[]};8.9.y.1t(a.m.j,"1w",3(){d(a.u).14("1v",a.m.j)});a.x(a.p.1q,a.m.j)},S:3(a){7 b=2.6("O",n 8.9.1p);b.z(2.v(a));2.6("j").1r(b);4 2},1B:3(a){7 b=2.6("j").1E();4 b?b.1D(a.U()):!1},1y:3(a,b){2.6("j").1x[b].P(2.D(a));4 2},1A:3(a,b){a.j=2.6("j");a.T=2.v(a.T);7 c=n(a.1h||8.9.1f)(a),f=2.6("C");c.X?f[c.X]=c:f.P(c);c.O&&2.S(c.U());2.x(b,a.j,c);4 d(c)},w:3(a){2.t(2.6(a));2.B(a,[]);4 2},t:3(a){A(7 b K a)a.R(b)&&(a[b]o 8.9.15?(8.9.y.1j(a[b]),a[b].N&&a[b].N(s)):a[b]o G&&2.t(a[b]),a[b]=s)},22:3(a,b,c){a=2.6(a);b.q=d.21(b.q)?b.q:[b.q];A(7 f K a)k(a.R(f)){7 e=!1,g;A(g K b.q)k(-1<d.20(b.q[g],a[f][b.1Y]))e=!0;Q k(b.V&&"1X"===b.V){e=!1;1W}c(a[f],e)}4 2},6:3(a,b){7 c=2.m;k(!c[a]){k(-1<a.1Z(">")){A(7 d=a.1c(/ /g,"").r(">"),e=0;e<d.L;e++){k(!c[d[e]])k(b)c[d[e]]=e+1<d.L?[]:b;Q 4 s;c=c[d[e]]}4 c}b&&!c[a]&&2.B(a,b)}4 c[a]},27:3(a,b,c){7 d=2.6("J",a.28||n 8.9.29);d.26(a);d.23(2.6("j"),2.D(b));2.x(c,d);4 2},24:3(){s!=2.6("J")&&2.6("J").25();4 2},B:3(a,b){2.m[a]=b;4 2},1V:3(){7 a=2.6("j"),b=a.1K();d(a).1b("1J");a.1M(b);4 2},1L:3(){2.w("C").w("W").w("M").t(2.m);l.1G(2.u,2.1F)},x:3(a){a&&d.1I(a)&&a.19(2,G.F.16.17(E,1))},v:3(a){k(!a)4 n 8.9.H(0,0);k(a o 8.9.H)4 a;a=a.1c(/ /g,"").r(",");4 n 8.9.H(a[0],a[1])},D:3(a){4!a?s:a o l?a[0]:a o 1H?a:d("#"+a)[0]}});l.I.z({1b:3(a){8.9.y.14(2[0],a);4 2},Y:3(a,b,c){8.9&&2[0]o 8.9.15?8.9.y.1S(2[0],a,b):c?2.Z(a,b,c):2.Z(a,b);4 2}});l.13("1R 1U 1T 1O 1N 1Q 1P".r(" "),3(a,b){l.I[b]=3(a,d){4 2.Y(b,a,d)}})})(l);',62,134,'||this|function|return||get|var|google|maps||||||||||map|if|jQuery|instance|new|instanceof|options|value|split|null|_c|el|_latLng|clear|_call|event|extend|for|set|markers|_unwrap|arguments|prototype|Array|LatLng|fn|iw|in|length|overlays|setMap|bounds|push|else|hasOwnProperty|addBounds|position|getPosition|operator|services|id|addEventListener|bind|center|_setup|data|each|trigger|MVCObject|slice|call|_create|apply|_init|triggerEvent|replace|gmap|mapTypeId|Marker|namespace|marker|ui|clearInstanceListeners|string|pluginName|substring|_|typeof|LatLngBounds|callback|fitBounds|option|addListenerOnce|Map|init|bounds_changed|controls|addControl|roadmap|addMarker|inViewport|zoom|contains|getBounds|name|removeData|Object|isFunction|resize|getCenter|destroy|setCenter|mouseout|mouseover|dragend|drag|click|addListener|dblclick|rightclick|refresh|break|AND|property|indexOf|inArray|isArray|find|open|closeInfoWindow|close|setOptions|openInfoWindow|infoWindow|InfoWindow'.split('|'),0,{}))

/*! http://code.google.com/p/jquery-ui-map/ | Johan S�ll Larsson */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(7($){$.y($.J.x.C,{B:7(a,b){f c=8;$(\'[j="{0}"]\'.l(\'{0}\',a)).q(7(i){b(c.9($(8),{\'@r\':c.k($(8).4(\'j\'))}),8,i)})},9:7(c,d){f e=8;c.o().q(7(){f a=$(8),h=a.4(\'j\'),2=a.4(\'2\');3(h!=A&&a.o().p>0){3(!d[2]){d[2]=[]}d[2].m({\'@r\':e.k(h)});e.9(a,d[2][d[2].p-1])}5 3(2){3(d[2]){3(D d[2]===\'E\'){f b=d[2];d[2]=[];d[2].m(b)}d[2].m(e.g(a))}5{d[2]=e.g(a)}}5{e.9(a,d)}});6 d},g:7(a){3(a.4(\'n\')){6 a.4(\'n\')}5 3(a.4(\'s\')){6 a.4(\'s\')}5 3(a.4(\'t\')){6 a.4(\'t\')}5 3(a.4(\'u\')){6 a.4(\'u\')}5 3(a.v()){6 a.v()}6},k:7(a){3(a.w(\'F\')>-1){a=a.G(a.H(\'/\')+1).l(\'?\',\'\').l(\'#\',\'\')}5 3(a.w(\':\')>-1){a=a.I(\':\')[1]}6 a}})}(z));',46,46,'||itemProp|if|attr|else|return|function|this|_traverse||||||var|_extract|itemType||itemtype|_resolveType|replace|push|src|children|length|each|type|href|content|datetime|text|indexOf|gmap|extend|jQuery|undefined|microdata|prototype|typeof|string|http|substr|lastIndexOf|split|ui'.split('|'),0,{}))

/*! jquery-ui-map rc1 | Johan Säll Larsson */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(6(d){d.9(d.j.i.l,{k:6(a,b){f c=4 3.8[a](e.9({2:0.1("2")},b));0.1("5 > "+a,[]).h(c);g d(c)},p:6(a,b){(!b?0.1("5 > 7",4 3.8.7):0.1("5 > 7",4 3.8.7(b,a))).m(e.9({2:0.1("2")},a))},o:6(a,b,c){0.1("5 > "+a,4 3.8.n(b,e.9({2:0.1("2")},c)))}})})(e);',26,26,'this|get|map|google|new|overlays|function|FusionTablesLayer|maps|extend|||||jQuery|var|return|push|gmap|ui|addShape|prototype|setOptions|KmlLayer|loadKML|loadFusion'.split('|'),0,{}))

/*! jquery-ui-map rc1 | Johan Säll Larsson */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(2(c){c.s(c.p.o.n,{r:2(b,a,c){q e=0,f=0.1("5 > 9",4 3.6.9),d=0.1("5 > 7",4 3.6.7);a&&d.l(a);f.j(b,2(a,b){"m"===b?(d.k(a),d.h(e.1("8"))):d.h(z);c(a,b)})},u:2(b,a){0.1("8").y(0.1("5 > g",4 3.6.g(0.v(b),a)))},x:2(b,a){0.1("5 > i",4 3.6.i).w(b,a)}})})(t);',36,36,'this|get|function|google|new|services|maps|DirectionsRenderer|map|DirectionsService|||||||StreetViewPanorama|setMap|Geocoder|route|setDirections|setOptions|OK|prototype|gmap|ui|var|displayDirections|extend|jQuery|displayStreetView|_unwrap|geocode|search|setStreetView|null'.split('|'),0,{}))
