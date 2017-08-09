













		var mapManager = null;
		var gControl = null;
        var graphics = null;
				
		function onBodyLoad() {
			document.addEventListener("deviceready",onDeviceReady,false);
		}
		
		function onDeviceReady() {		
            load_graphics();
			load_map();
			load_controller();
			fix_list_scroll();
		}
		
		function load_controller() {
			var params = { 
				rest_container: 'restaurant_types_options',
				rest_opt_enable: 'rest_option_radio',
				fuel_types_container: 'fuel_types_options',
				list_container: 'list_info',
				infoWindow: 'infoWindow',
				map_manager: mapManager
			};
			
			gControl = new GControl(params);
			gControl.showMenuWindow();
		}
		
		function load_map() {
			mapManager = new MapManager( "map", "infoWindow" );
		}
		
        function load_graphics() {
            graphics = new Graphics();
        }
        
		function fix_list_scroll() {
			myScroll = new iScroll("list_holder");
		}
		
		document.addEventListener("touchmove", preventBehavior, false); 
		function preventBehavior(e) {e.preventDefault();}
		/*function sendsms() {window.main.getMessanger("hello man","6947874992");}*/
				
    

/*
 *	class responsible for the communication between the map and user interface.
 *
 */function GControl( params ) {
	/*rapper manager for the google map functionalities*/
	var mapManager			 = null;
	
	/*just the categories*/
	var categories			 = null;
	var fuel_types			 = null;
	
	/*ids of the DOMs objects that store the restaurant and fuel categories*/
	var rest_container		 = null;
	var fuel_types_container = null;
	 
	/*determines whether the restaurant categories selection is active*/
	var rest_opt_enable		 = null;
	var list_container		 = null;
	
	/*the active window*/
	var current_window		 = null;
	 
	/*last query values*/
	var current_value_search = null;
			
	if ( params ) init( params );
	
	/*constructor*/
	function init( params ) {
		mapManager = params.map_manager;
		rest_container = params.rest_container;
		fuel_types_container = params.fuel_types_container;
		list_container = params.list_container;
		rest_opt_enable = params.rest_opt_enable; 
		
		mapManager.addReceiveListener( hideloader );
		
		getRestaurantCategories();
		getFuelTypes();
		fillFuelOptions();
	}
	
	/* * * * * * * * * * * * * * *restaurant init* * * * * * * * * * * * * * * */
	function getRestaurantCategories() {
		Utils.doAjax( ajax_response_categories, JSON_TYPE, AJAX_CATEGORIES, null );
	}
	
	function ajax_response_categories( data ) {
		categories = data;
	}
		
	function fillRestaurantOptions( category, super_category ) {
		var sub = null;
		if ( category ) {
			sub = super_category;
		} else {
			category = CAT_RESTAURANT;
			sub = '-';
		}
		
		var restautant_types = categories[category]['children'];
		var html = '<option>' + sub + '</option>';
		var index = 0;
		while ( (sub_category = restautant_types[index]) != null ) {
			html += '<option value="' + sub_category + '">' + categories[sub_category]['title'] + '</option>';
			index += 1;
		}
		
		$("#" + rest_container).html(html);
		$("#" + rest_container).change(onRestSelected);
	}
	
	function onRestSelected() {
		$("#" + rest_container + " option:selected").each( 
			function(i,selected) {
				if ( selected.value ) {
					current_value_search = {
						req: RESTAUR,
						meta: selected.value
					};
				} else {
					current_value_search = null;
				}
				
				if ( categories[selected.value]['children'][0] )
				fillRestaurantOptions( selected.value, selected.innerText );
			}
		);
	}
	/* * * * * * * * * * * * * * *restaurant init end* * * * * * * * * * * * * */
	
	/* * * * * * * * * * * * * * *Fuel init* * * * * * * * * * * * * * * * * * */
	function getFuelTypes() {
		Utils.doAjax( ajax_response_fuel_type, JSON_TYPE, AJAX_FUEL_TYPES, null );
	}
	
	function ajax_response_fuel_type( data ) {
		fuel_types = data;
		fillFuelOptions();
	}
	
	function fillFuelOptions() {
		var html = '<option>-</option>';
		for ( var i in fuel_types ) {
			html += '<option value="' + fuel_types[i].fuel_type + '">' + fuel_types[i].fuel_type + '</option>';
		}
		
		$("#" + fuel_types_container).html(html);
		$("#" + fuel_types_container).change(onFuelSelected);
	}
	
	function onFuelSelected() {
		$("#" + fuel_types_container + " option:selected").each( 
			function(i,selected) {
				if ( selected.value ) {
					current_value_search = {
						req: GAS,
						meta: selected.value
					};
				} else {
					current_value_search = null;
				}
			}
		);
	}
	/* * * * * * * * * * * * * * *fuel init end* * * * * * * * * * * * * * * * */
	
	function setDefaultZoom() {		
		var request_rype = current_value_search.req;
				
		switch (request_rype) {
			case RADAR: 
			//case RESTAUR:
				mapManager.setDefaultZoom();
		}
	}
	 
	function doFlip( to ) {
		if (current_window) 
			$("#" + current_window).css("visibility","hidden");
		
		$("#" + to).css("visibility","visible");
	}
	
	/* * * * * * * * * * * * * * *public methods* * * * * * * * * * * * * * * * */
	this.sendRequest = function() {
		if ( current_value_search != null ) {
			showloader();
			setDefaultZoom();
			if ( current_value_search.meta )
				mapManager.getSpots(current_value_search.req,current_value_search.meta);
			else
				mapManager.getSpots(current_value_search.req);	
		}
	}
		
	this.getFSA = function() {
		current_value_search = { req: PHARMA };
		//this.sendRequest();
		this.showMapWindow();
	}
	
	this.getRADAR = function() {
		current_value_search = { req: RADAR };
		//this.sendRequest();
		this.showMapWindow();
	}
	
	this.showMenuWindow = function() {
		mapManager.releaseZoom();
		doFlip('menu');
		current_window = 'menu';
	}
	
	this.showMapWindow = function() {
		doFlip('map_projection');
		current_window = 'map_projection';
	}
	
	this.showFuelWindow = function() {
		doFlip('fuel');
		current_window = 'fuel';
	}
	
	this.showRestWindow = function() {
		fillRestaurantOptions();
		doFlip('restaurant');
		current_window = 'restaurant';
	}
	
	this.showCommunicationWindow = function() {
		doFlip('email');
		current_window = 'email';
	}
	
	function setupFuelList( info ) {
		return '<dt class="title">' + info.brand + '</dt>' +
			   '<dt>' + info.address + '</dt>' +
			   '<dt class="title">' + info.price + 'E/lt - ' + current_value_search.meta + ' - ' + info.last_updated + '</dt>';
	}
	
	function setupRadarList( info ) {		
		return '<dt class="title">' + info.type + ' - ' + info.title + '</dt>' +
			   '<dt>' + info.address + '</dt>';
	}
	
	function setupRestList( info ) {
		return '<dt class="title">' + info.title + ' - ' + info.type + '</dt>' +
			   '<dt>' + info.address + '</dt>';
	}
	
	function setupPHARMAList( info ) {
		var html = "";
		
		html += '<dt class="title" > Φαρμακείο - ' + info.title + '</dt>';
		html += '<dt>' + info.address + '</dt>';
		
		html += '<dt>';
		if (info.open2)
			html += info.open2 + ' - ' + info.close2 + ' & ';
		
		html += info.open + ' - ' + info.close + '</dt>'; 
		
		return html;		   
	}
	 
	function fixPHARMAlist( info ) {
		for ( var start = 0; start < info.length; start++ ) {
			for ( var index = start + 1; index < info.length && info[start].id != info[index].id; index++ );
			 
			if ( index < info.length ) {
				var found = info[index];
				info[start].open2 = found.open;
				info[start].close2 = found.close;
				 
				info.splice(index,1);
			}
		}
		 
		return info;
	 }
	
	this.showListWindow = function() {
		var current_info = mapManager.getCurrentInfo();
		
		type = current_info.type;
		info = current_info.currentInfo;
		
		var fill_list = null;
		switch (current_info.type) {
			case RADAR: {
				fill_list = setupRadarList; break; 
			}
			case GAS: {
				fill_list = setupFuelList; break; 
			}
			case PHARMA: {
				info = fixPHARMAlist(info);
				fill_list = setupPHARMAList; break; 
			}
			case RESTAUR: {
				fill_list = setupRestList; break; 
			}
		}
				
		var html = "";
		for ( var i in info ) {
			var icon = ( info[i].marker_icon )? info[i].marker_icon : DEFAULT_ICON ;			
			var color = ( i % 2 == 0 )?'color':'';
			html += '<li class="' + color + '">';
			html += '<img src="' + CALLBACK_URL_ASSETS + icon + '.png" />';
			html += '<dl>';
			html += fill_list(info[i]);
			html += '</dl>';
			html += '</li>';
			html += '<div class="clear"></div>';
		}
		
		$("#" + list_container).html(html);
		
		doFlip('list');
		current_window = 'list';
	}
	
	this.clearList = function() {
		$("#" + list_container).html('');
	}
	
	this.goBack = function() {
		mapManager.goToMyLocation();
	}
	
	this.sendEmail = function( email ) {
		Utils.doAjax( null, JSON_TYPE, AJAX_EMAIL, {'email':email} );
	}
	
	this.disableRestOption = function( disabled ) {
		var disabled = (disabled)?'disabled':'';
		
		$('#' + rest_container).attr('disabled', disabled);
		
		current_value_search = { req: RESTAUR, meta: CAT_RESTAURANT }
	}
	 
	function showloader() {
		$('#canvas #map_projection #map_holder #loader').attr('src','assets/loader.gif');
		$('#canvas #map_projection #map_holder #loader').show();
		$('#canvas #map_projection #map_holder #map').css('opacity','0.4');
	}
	 
	function hideloader() {
		$('#canvas #map_projection #map_holder #loader').hide();
		$('#canvas #map_projection #map_holder #loader').attr('src','assets/null_image.jpg');
		$('#canvas #map_projection #map_holder #map').css('opacity','1');
	}	 
}

/*class*/function Graphics() {
	var body_height = null;
	var body_width = null;
	
    init();
    
    function init() {
		fixMenuWindow();
		fixMapWindow();
		fixListWindow();
		fixOptionsBlockWindow();
		fixEmailWindow();
    }
	
	function centerElement( element, holder, left, after_this ) {
		var margin_type;
		var element_c, holder_c;
		
		if ( left ) {
			direction = 'left';
			element_c = $(element).width();
			holder_c = $(holder).width();
		} else {
			direction = 'top';
			element_c = $(element).height();
			holder_c = $(holder).height();
		}
							
		var move = (holder_c / 2) - (element_c / 2);
		
		if ( after_this ) move -= $(after_this).width();

		$(element).css(direction, move + 'px');
	}
	
	function setBottom( element, holder ) {
		element_c = $(element).height();
		holder_c = $(holder).height();
		
		$(element).css('top',( holder_c - element_c ) + 'px');
	}
	
	function fixMenuWindow() {
		$('#canvas #menu').css('height',WINDOW_HEIGHT);
		$('#canvas #menu').css('width',WINDOW_WIDTH);
		
		setBottom( '#canvas #menu #header #logo', '#canvas #menu #header' );
		
		centerElement( '#canvas #menu #icons #holder', '#canvas #menu #icons', true );
		centerElement( '#canvas #menu #icons #holder', '#canvas #menu #icons', false );
		centerElement( '#canvas #menu #footer #commun', '#canvas #menu #footer', true );
    }
	
	function fixMapWindow() {
		$('#canvas #map_projection').css('height',WINDOW_HEIGHT);
		$('#canvas #map_projection').css('width',WINDOW_WIDTH);
		
		$('#canvas #map_projection #map_holder #loader').css('width',WINDOW_WIDTH * 0.2);
		$('#canvas #map_projection #map_holder #loader').css('height',WINDOW_WIDTH * 0.2);
		
		centerElement( '#canvas #map_projection #header #opt_but', '#canvas #map_projection #header', false );
		centerElement( '#canvas #map_projection #header #list_but', '#canvas #map_projection #header', false );
		centerElement( '#canvas #map_projection #header #relocate', '#canvas #map_projection #header', false );

		centerElement( '#canvas #map_projection #header #relocate', '#canvas #map_projection #header', true, '#canvas #map_projection #header #opt_but' );
		centerElement( '#canvas #map_projection #footer #refresh', '#canvas #map_projection #footer', true );
		
		centerElement('#canvas #map_projection #map_holder #loader', '#canvas #map_projection', true );
		centerElement('#canvas #map_projection #map_holder #loader', '#canvas #map_projection', false );
	}
   
	function fixListWindow() {
		$('#canvas #list').css('height',WINDOW_HEIGHT);
		$('#canvas #list').css('width',WINDOW_WIDTH);
		
		centerElement( '#canvas #list #header #opt_but', '#canvas #list #header', false );
		centerElement( '#canvas #list #header #map_but', '#canvas #list #header', false );
	}
	
	function fixOptionsBlockWindow() {
		$('#canvas .options_block').css('height',WINDOW_HEIGHT);
		$('#canvas .options_block').css('width',WINDOW_WIDTH);
		
		centerElement( '#canvas .options_block .option_header #opt_but','#canvas #map_projection #header', false );
		centerElement( '#canvas .options_block .options_holder .options','#canvas .options_block .options_holder', true );
		centerElement( '#canvas .options_block .options_holder .options','#canvas .options_block .options_holder', false );
		
		centerElement( '#canvas .options_block .options_holder .options .search','#canvas .options_block .options_holder .options', true );
		centerElement( '#canvas .options_block .options_holder .options .search','#canvas .options_block .options_holder .options', false );
	}
	
	function fixEmailWindow() {
		$('#canvas #email').css('height',WINDOW_HEIGHT);
		$('#canvas #email').css('width',WINDOW_WIDTH);
		
		centerElement( '#canvas #email #header #opt_but', '#canvas #email #header', false );
		centerElement( '#canvas #email #holder #submit','#canvas #email #holder', true );
	}
}

/*class*/function Map( params ) {
	var map			      = null;
	var container		  = null;
	var infoWindow		  = null;
	var infoWindowHolder  = null;
    var fluster           = null;
	var myLocationMarker  = null;
	var markers			  = [];

	if (params) init( params );
	
	function init( params ) {
		var myOptions = {
			zoom: MAP_ZOOM,
			mapTypeId: MAP_TYPE,
			mapTypeControl: true,
			mapTypeControlOptions: { mapTypeIds: [google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.HYBRID] },
			streetViewControl: false 
		};
				
		map = new google.maps.Map(document.getElementById(params.mapHolder), myOptions);
		fluster = new Fluster2(map);
		
		google.maps.event.addListener(map, 'zoom_changed', doCluster );
		
		infoWindow = new google.maps.InfoWindow();
		infoWindowHolder = params.infoWindowHolder;
		
		myLocationMarker =  new google.maps.Marker({map:map});
	}
		
	function doCluster() {
		var zoomLevel = map.getZoom();
		fluster.gridSize = 0; //fluster is deactivated
	}
	
	function onGeolocationSuccess(position) {
		setCenter(position.coords.latitude,position.coords.longitude);
	}
	
	function debugRelocation() {
		var lat = '38.069728', lng = '23.692417';
		setCenter(lat,lng);
	}
	
	function setCenter( lat, lng ) {
		map.setCenter( new google.maps.LatLng(lat, lng) );
		setDummyMarker( lat, lng );
	}
	
	function setDummyMarker( lat, lng ) {
		var position = new google.maps.LatLng(lat, lng);		
		myLocationMarker.setOptions({position: position}); 
	}
	
	this.setDefaultZoom = function() {
		map.setZoom(MAP_ZOOM);
	}
		
	this.addMarker = function( popUpBody, icon, lat, lng ) {
		var position = new google.maps.LatLng(lat, lng);
				
		if ( icon != "" ) icon = new google.maps.MarkerImage(CALLBACK_URL_ASSETS + icon + '.png');
				
		var marker_options = { 
			position: position,
			clickable: true,
			icon: icon,
			shadow: icon,
			popUpBody: popUpBody,
			map: map
		};
				
		var marker = new google.maps.Marker(marker_options);
		
		google.maps.event.addListener(marker, 'click', function() {
			infoWindow.content = this.popUpBody;					  
			infoWindow.open(map,this);
		});
		
		//fluster.addMarker(marker);
		markers.push(marker);
	}
		
	this.getBounds = function() {
		var bounds = map.getBounds();
		
		var northEast = bounds.getNorthEast();
		var southWest = bounds.getSouthWest();
		
		return { northEast: { 
					lat: northEast.lat(),
					lng: northEast.lng() },
				southWest:  {
					lat: southWest.lat(),
					lng: southWest.lng() }
				};
	}
	
	this.removeMarkers = function() {
		infoWindow.close(map);
		var i = 0; 
		while ( markers.length > 0 ) {
			markers[0].setMap(null);
            markers.splice(0,1);
		}
		markers = [];
	}
	
	this.getInfoWindowName = function() {
		return infoWindowHolder;
	}
	
	this.goToMyLocation = function() {
		//navigator.geolocation.getCurrentPosition(onGeolocationSuccess);
		debugRelocation();
	}
	
	this.refresh = function() {
		doCluster();
		fluster.initialize();
    }
}

/*class*/function MapManager( map_holder, coords, infoWindow ) {
	var map				 = null;
	var popUpManager	 = null;
	var current_req_type = null;
	var last_sent_data	 = null;
	var receive_callback = null;
	var zoom_block		 = false;
	var current_info	 = [];
	
	init( map_holder, coords, infoWindow );
	
	/* * * * * * * * * * *private methods * * * * * * * * * * * * * * */
	function init( map_holder, infoWindow ) {
		var params = {
			mapHolder: map_holder,
			infoWindowHolder: infoWindow
		};
				
		map = new Map(params);
		map.goToMyLocation();
		
		popUpManager = new PopUpManager({infoWindow:map.getInfoWindowName()});
	};
	
	function ajax_response_markers( data ) {
		map.removeMarkers();
		removeInfo();
				
		if ( data.length > 0 ) { 
			popUpManager.initBody(current_req_type);

			for ( var i in data ) {
				var popUpBody = popUpManager.getPopUpBody(data[i]);
				map.addMarker( popUpBody, data[i].marker_icon, data[i].lat, data[i].lng );
				current_info.push(data[i]);
			}
			
			map.refresh();
		}
		
		if ( receive_callback ) receive_callback();
	}
	
	function removeInfo() {
		current_info = [];
	}
	
	/* * * * * * * * * * * * * * public methods * * * * * * * * * * * * */
	this.getSpots = function( query, meta_data ) {
		if ( zoom_block ) map.setDefaultZoom();

		var data = map.getBounds();
		
		current_req_type = data.req = query;
		
		if ( meta_data )
			data.meta_data = meta_data;
		
		last_sent_data = data;
		
		this.transmit();

	}

	this.transmit = function() {
		if ( last_sent_data ) 
			Utils.doAjax( ajax_response_markers, JSON_TYPE, AJAX_SERVICES, last_sent_data );
	}
	
	this.addReceiveListener = function( callback ) {
		receive_callback = callback;
	}
	
	this.getCurrentInfo = function() {
		return { type: current_req_type, currentInfo: current_info };
	}
	
	this.getInfoWindowName = function() {
		map.getInfoWindowName();
	}
	
	this.goToMyLocation = function() {
		map.goToMyLocation();
	}
		
	this.setDefaultZoom = function() {
		zoom_block = true;
	}
	
	this.releaseZoom = function() {
		zoom_block = false;
	}
}

/*class*/function PopUpManager( params ) {
	var infoWindow = null;
	var initHtml = null;
	var getHtml = null;
	
	if ( params ) init(params);
	
	function init( params ) {
		infoWindow = params.infoWindow;
		initHtml = $("#" + infoWindow).html();
	}
	
	function setupPopup( info ) {
		$("#" + infoWindow + " #image").attr("src",CALLBACK_URL_ASSETS + "info.png");
		$("#" + infoWindow + " #title").html(info.title);
		$("#" + infoWindow + " #info #address").html(info.address);
		$("#" + infoWindow + " #info #phone").html(info.phone);
		$("#" + infoWindow + " #info #phone").attr("href","tel:" + info.phone );
	}
	
	function setupFuelPopup( info ) {
		$("#" + infoWindow + " #info #price").html("Τιμή: " + info.price);
		$("#" + infoWindow + " #info #brand").html("Τύπος: " + info.brand);
		return $("#" + infoWindow).html();
	}
	
	function setupPHARMAPopup( info ) {
		return $("#" + infoWindow).html();
	}
	
	function setupRadarPopup( info ) {
		$("#" + infoWindow + " #info #type").html("Τύπος: " + info.type);
		return $("#" + infoWindow).html();
	}
	
	function setupRestPopup( info ) {
		return $("#" + infoWindow).html();
	}
	
	this.getPopUpBody = function( info ) {
		setupPopup(info);
		return getHtml(info);
	}
	
	this.initBody = function( req_type ) {
		$("#" + infoWindow).html(initHtml);
		switch (req_type) {
			case RADAR: {
				$("#" + infoWindow + " #info").append('<dt><span id="Τύπος" class="field"></span></dt>');
				getHtml = setupRadarPopup; break; 
			}
			case GAS: { 
				$("#" + infoWindow + " #info").append('<dt><span id="Τιμή" class="field"></span></dt>');
				$("#" + infoWindow + " #info").append('<dt><span id="Τύπος" class="field"></span></dt>');
				getHtml = setupFuelPopup; break; 
			}
			case PHARMA: { 
				getHtml = setupPHARMAPopup; break; 
			}
			case RESTAUR: { 
				getHtml = setupRestPopup; break; 
			}
		}
	}
}

/*static*/var Utils = {
	doAjax: function( handleResponse, dataType, handler, data ) {
		$.ajax({ 
			   type: "POST",
			   url: CALLBACK_URL_AJAX + handler + ".php",
			   data: data,
			   dataType: dataType,
			   async: "false",
			   error: function ( error ) { alert("error: " + error); },
			   success: handleResponse
		});
	}
}

/*ajax connection attrs*/
//var CALLBACK_URL = "http://192.168.1.71:8888/";
var CALLBACK_URL = "http://www.imap.gr:80/";
var CALLBACK_URL_AJAX	= CALLBACK_URL + "imapAPI/control/ajax/";
var CALLBACK_URL_ASSETS = CALLBACK_URL + "imapAPI/assets/markers/";
var DEFAULT_ICON = "marker";

/*map info*/
var MAP_ZOOM = 16;
var MAP_TYPE = google.maps.MapTypeId.ROADMAP;

/*graphics info*/
var WINDOW_HEIGHT = window.innerHeight;
var WINDOW_WIDTH = window.innerWidth;

/*ajax types*/
var JSON_TYPE = 'json';
var RAW_TYPE = 'raw';
var AJAX_SERVICES = 'surroundsme';
var AJAX_EMAIL = 'getemail';
var AJAX_CATEGORIES = 'categories';
var AJAX_FUEL_TYPES = 'fuel';

/*request ids*/
var ALL = -1;
var PHARMA = 0;
var GAS = 1;
var RESTAUR = 2;
var RADAR = 3;

/*categories ids*/
var CAT_RESTAURANT = '34';
