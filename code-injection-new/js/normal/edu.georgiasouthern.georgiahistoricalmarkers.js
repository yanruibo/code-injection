







// historical-globals.js

// Storage for immediate search results
// results[<DCID>] = {
//   latitude = float,
//   longitude = float
//   name: string,
//   description: string,
//   imgURL: string,
//   county: string
// }
var results = {};

// Dictionary of all markers
// markers[<DCID>] = google.maps.Marker
var markers = {};

// google.maps.Map, current position and center point.
var map, centerPoint, myPosition;

// Important elements used throughout the code
var container = $('#container');
var searchbox = $('#searchbox');
var mapbox = $('#mapbox');
var buttons = $('#buttons');


// historical-functions.js

// Set up map
function googleMapSetup() {
		// This is just for now. The center gets set each search
		centerPoint = new google.maps.LatLng(32.9469, -83.298);

		map = new google.maps.Map(
				document.getElementById("mapbox"),
				{ zoom: 6,
					center: centerPoint,
					disableDefaultUI: true,
					scrollwheel: false,
					zoomControl: true,
					zoomControlOptions: {
							style: google.maps.ZoomControlStyle.SMALL,
							position: google.maps.ControlPosition.TOP_RIGHT
					},
					mapTypeControl: true,
					mapTypeControlOptions: {
							style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
							position: google.maps.ControlPosition.TOP_CENTER
					},
					streetViewControl: false,
					mapTypeId: google.maps.MapTypeId.ROADMAP });

		// Make sure the center stays consistent throughout
		// google.maps.event.addListener(map, 'drag', function () {
		// 		centerPoint = map.getCenter();
		// });
}

// Used to keep track of our current position
function setLatLng(position) {
		$('#nogpsdisplay').slideUp();
		$('#radiuslist').removeClass('distanceDisabled').addClass('distanceEnabled');
		myPosition = new google.maps.LatLng(
				position.coords.latitude,
				position.coords.longitude
		);
}
// When there's no GPS / location
function disableDistance() {
		$('#nogpsdisplay').slideDown();
		$('#radiuslist').removeClass('distanceEnabled').addClass('distanceDisabled');
}

// Make sure everything stays where it should on resize
function resizeContainer() {
		var body = $('body');
		var w = $(window).width();
		body.css('width', w );
		buttons.css('width', w);
		
		var containerHeight =
				document.documentElement.clientHeight -
				parseInt(buttons.css('height'), 10);

		// container.css('height', containerHeight);
		if (container.css('margin-left') != '0px') {
				container.css('margin-left', -(buttons.width()));
		}
		//		Make sure we can still see the buttons
		$('#helpinfo, #markerdescription, #mapbox').css('height', containerHeight);

		// Proportion the map when in "tablet" mode
		if (w >= 700) {
				var cw = container.width();
				mapbox.width(w - cw);
				mapbox.css('right', '0px');
				mapbox.css('left', '');
		} else {
				mapbox.width(w);
		}
		
		// Make the Google Map behave well
		google.maps.event.trigger(map, "resize");
		// map.panTo(centerPoint);
}

//Show, hide map, search results
function slideInMap() {
		var w = $(window).width();
		if (w < 700)
				$('#mapbox').animate(
						{ left: '0%' },
						400);
		$('#helpinfo').slideUp();
		searchbox.fadeIn();
}
function slideOutMap() {
		var w = $(window).width();
		if (w < 700)
				$('#mapbox').animate(
						{ left: '100%' },
						400);
		$('#helpinfo').slideUp();
		searchbox.fadeIn();
}
function slideInSearch() {
		if (mapbox.css('left') == "0px") {
				slideOutMap();
		} else {
				// $('body').animate({ scrollTop: 0 });
				$(document).scrollTop(0);
				$('.markerDesc').hide();
		}
		$('#helpinfo').slideUp();
		searchbox.fadeIn();
}

// Back button: hide map, or else scroll top, or else exit
function backButton(e) {
		if (mapbox.css('left') == "0px") {
				slideOutMap();
		} else if ($(document).scrollTop() > 0) {
				// $('body').animate({ scrollTop: 0 });
				$(document).scrollTop(0);
		} else {
				navigator.app.exitApp();
		}
}


/********************
 *** MARKER SEARCH ***
 ********************/

// This fires off the marker search with an AJAX request to DCA.
function beginMarkerSearch(e) {
		var distance = $('[name="searchradius"]:checked').val();
		// Do nothing if search button is disabled;
		if ($('#searchbutton').attr('disabled') !== undefined)
				return false;

		// Complain if search is too general
		if ($('#searchtext').val() === ''
				&& ($('#radiuslist').hasClass('distanceDisabled')
						|| distance === '')) {
				alert('Please choose either a specific distance or include search words.');
				return false;
		}
		
		// Hide previous results/errors
		$('#searchresults').fadeOut('slow');
		$('#errordisplay').fadeOut();

		// Reset the counters in the search/map buttons
		$('#search-button').html('Search');
		$('#map-button').html('Map');

		// Clear out all of the previous results in memory and in our list
		results = {};
		$('#searchresults li:not(.resultheader)').remove();
		$.map(markers, function(m, id) {
				m.setMap(null);
				delete markers[id];
		});
		markers = {};
		google.maps.event.trigger(map, 'zoom_changed');

		// Build the data for Georgia Planning/DCA's REST service
		var gpURL = 'http://www.georgiaplanning.com'
				+ '/DCAMarkerService/dcamarkerservice.markerservice.svc/rest/Locations?';

		gpURL += 'SearchText=' + encodeURIComponent( $('#searchtext').val().trim() );

		// Not 'any' distance, and we have GPS / location available
		if (distance != '' && !$('#radiuslist').hasClass('distanceDisabled')) {
				gpURL += '&Latitude=' + myPosition.lat(); 
				gpURL += '&Longitude=' + myPosition.lng();
				gpURL += '&Distance=' + distance;
		}

		// Send the request
		$.ajax(gpURL,
					 { dataType: 'json',
					 	timeout:8000,
						 error: handleSearchError,
						 success: displaySearchResults
					 });
		
		e.preventDefault();
		
}

// Takes the JSON response from DCA, stores it and plots it on the map.
function displaySearchResults(response) {
		var dcaResults = response.GetAllMarkersInRangeResult;

		if ($('#searchbutton').attr('disabled') !== undefined)
				return false;
		$('#searchbutton').attr('disabled', 'disabled');

		if (dcaResults.length == 0) { // We couldn't find any markers
				$('#errordisplay').html('<p>No markers found.</p>').fadeIn();
				return;
		}
		if (dcaResults.length > 100) { // Too many results!
				$('#errordisplay').html('<p>Showing only the first 100 results.</p>').fadeIn();
				dcaResults.splice(100, dcaResults.length - 100);
		}

		// We'll be fitting the map to these Bounds soon
		var bounds = new google.maps.LatLngBounds();
		// Icon and shadow
		var peachIcon = {
				url: "images/marker_green.png",
				size: new google.maps.Size(44, 51),
				anchor: new google.maps.Point(20, 51)
		}
		var peachShadow = {
				url: "images/marker_green.png",
				size: new google.maps.Size(42, 51),
//				scaledSize: new google.maps.Size(42, 51),
				anchor: new google.maps.Point(0, 51),
				origin: new google.maps.Point(72, 0)
		}		
		$.each(dcaResults, function(ix, entry) {
				var dcaID = entry.DCA_ID;

				// add this to our store of results
				results[ dcaID ] = {
						latitude: entry['MarkerLatitude'],
						longitude: entry['MarkerLongitude'],
						name: entry['MarkerTitle'],
						description: null,
						imgURL: null,
				};

				// Add new results to search results box
				var newresult = $('<li id="DCAID' + dcaID + '"></li>');
				newresult.append('<input type="checkbox" checked="checked" value="' + dcaID + '"/>');
				newresult.append('<span class="result">' + entry['MarkerTitle'] + '</span>');
				$('#searchresults ul').append(newresult);


				var latlng = new google.maps.LatLng(entry.MarkerLatitude,
																						entry.MarkerLongitude);
				bounds.extend(latlng);

				// Create a new marker for this entry
				
				var gmarker;
				
				gmarker = new google.maps.Marker({
						title: entry.name,
						position: latlng,
						optimized: true,
						flat: false,
						clickable: true,
						icon: peachIcon
						});
				
				var ua = navigator.userAgent;
			if( ua.indexOf("Android") >= 0 )
			{
  				var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
  				if (androidversion > 2.3)
  					{
						gmarker = new google.maps.Marker({
						title: entry.name,
						position: latlng,
						optimized: false,
						flat: false,
						clickable: true,
						icon: peachIcon
						});
 					};
			};
					
				
				

				// "click" the results list span next to checkbox
				// this triggers the same markerdescription menu
				google.maps.event.addListener(
						gmarker,
						'click',
						function (e) {
								$('.markerDesc').hide();
								var relevantSpan = $('#DCAID' + dcaID + ' span');
								launchMarkerDetail.call(relevantSpan, e, true);
								google.maps.event.trigger('resize');
								google.maps.event.trigger('mouseout');
								mapbox.blur();
								$('#content').focus();
								slideOutMap();
						});
				gmarker.setMap(map);
				markers[ dcaID ] = gmarker;
		});

		map.fitBounds(bounds);

		// Make the Search tab button say how many we found.
		$('#search-button').html('Search (' + dcaResults.length + ')');
		$('#map-button').html('Map (' + dcaResults.length + ')');
		
		// Handle clicks on the new <span>s for each result
		$('#searchresults li span').on('click', launchMarkerDetail);

		// Handle individual checkbox behavior
		$('#searchresults li:not(.resultheader) input[type="checkbox"]').change(handleCheckboxToggle);

		// Check the all check box and display everything
		$('#allcheckbox').attr('checked', 'checked');
		$('#searchresults').slideDown();
		$('#searchbutton').removeAttr('disabled');
}

// When searches go wrong...
function handleSearchError () {
		 $('#errordisplay').html('<p></p>').fadeIn();
		
		alert('There was a problem with your search. Please try again later.');
}


/*********************
 *** MARKER DETAILS ***
 *********************/

// Turns wall of text into <p>-formatted text
function formatMarkerDescription(desc) {
		return '<p class="descheader">' + desc.replace(/\u000d\u000a\u000d\u000a/g, '</p><p>') + '</p>';
}

// Populate and display the marker detail
function launchMarkerDetail(e, fromMarker) {
		var thisSpan = $(this);
		var dcaID = thisSpan.siblings('input').val(); // the checkbox nearby
		var mdesc = thisSpan.siblings('.markerDesc'); // nearby marker description if exists
		var position;

		// I know it seems strange to get the position three different
		// times, but there's a reason. We have to get the position
		// *after* stuff gets hidden or else we scroll to a place in the middle of a marker

		if (mdesc.length > 0) {
				// markerDesc div is already there.
				if (mdesc.css('display') === 'none') {
						// close other descriptions
						$('.markerDesc').hide();

						// We're unvealing the description, so scroll there
						position = thisSpan.parent('li').position(); // position to possibly scroll to
						mdesc.slideDown(1000, function () {
								$(document).scrollTop(position.top);
						});
				} else {
						if (fromMarker === true) {
								// Clicked a marker; just scroll there
								
								slideOutMap();
								position = thisSpan.parent('li').position(); // position to possibly scroll to
								$(document).scrollTop(position.top);
						} else {
								// No marker click; retract
								mdesc.slideUp();
						}
				}
		} else {
				position =  thisSpan.parent('li').position(); // position to possibly scroll to
						// It's not there, so we have to put it there ourselves.
						if (results[ dcaID ].description == null) {
								// If the internet's not available, nothing we can do.
								if ($('#searchbutton').attr('disabled') !== undefined)
										return false;
								
								// We've never fetched this data before; get details
								var detailURL = 'http://www.georgiaplanning.com/DCAMarkerService/'
										+ 'dcamarkerservice.markerservice.svc/rest/MarkerDetails?dca_id=' + dcaID;
								
								$.getJSON(detailURL, function (data) {
										var details = data.FetchMarkerDetailsJSONResult[0];
										
										results[ dcaID ].description = formatMarkerDescription(details.MarkerText);
										if (details.MarkerImage_URL !== null)
												results[ dcaID ].imgURL = decodeURIComponent(details.MarkerImage_URL);
										results[ dcaID ].address = details.MarkerLocation;

										populateMarkerDetail(dcaID, results[ dcaID ], position.top);
										slideOutMap();
								});
						} else {
								populateMarkerDetail(dcaID, results[ dcaID ], position.top);
								slideOutMap();
						}
				}
		map.panTo(markers[ dcaID ].getPosition());
}

// Stuffs our data into the marker description 
function populateMarkerDetail(dcaID, record, topPosition) {
		// Hide other descriptions
		$('.markerDesc').hide();

		// Create a new description div to be inserted into the DOM
		var markerDesc = $('<div class="markerDesc"></div>');

		// If we know where we are...
		if (typeof myPosition !== "undefined") {
				// ...show how far away from us the marker is
				var distMeters = google.maps.geometry.spherical.computeDistanceBetween(
						myPosition,
						markers[ dcaID ].getPosition()
				);
				var distMiles = distMeters * 0.000621371; // meter -> mile conversion
				markerDesc.append('<p><strong>'
													+ distMiles.toFixed(1)
													+ ' miles away.</strong></p>');
		}
		
		// Show address / location description and image if any
		if (record.address != null)
				markerDesc.append('<p>' + record.address + '</p>');
		if (record.imgURL != null)
				markerDesc.append('<div class="descimg"><p>Retrieving</p><img src="' + record.imgURL + '" /></div>')

		markerDesc.append(record.description);
		$('#DCAID' + dcaID).append(markerDesc);

		// Show and scroll to
		$('#DCAID' + dcaID +' .markerDesc').slideDown(1000, function () {
				$(document).scrollTop(topPosition);
				slideOutMap();
		});

}


function handleCheckboxToggle() {
		// Fiddle with allcheckbox where necessary
		var unchecked = $('#searchresults li:not(.resultheader) input[type="checkbox"]:not(:checked)');
		if (unchecked.length > 0) {
				$('#allcheckbox').attr('checked', false);
		} else {
				$('#allcheckbox').attr('checked', 'checked');
		}

		var dcaID = $(this).val();

		// Show this marker on the map if the checkbox is checked
		if ($(this).attr('checked') == 'checked') {
				markers[ dcaID ].setMap(map);
		} else {
				markers[ dcaID ].setMap(null);
		}
		// Hopefully redraw everything properly
		google.maps.event.trigger(map, 'zoom_changed');

		// Make the Map title show the number of mapped results
		var checked = $('#searchresults li:not(.resultheader) input[type="checkbox"]:checked');
		$('#map-button').html('&nbsp;&nbsp;Map&nbsp; (' + checked.length + ')');
}


/********************
 ** DEVICE HANDLERS **
 ********************/
function onDeviceReady() {
		document.addEventListener('backbutton', backButton, false);

		// Makes sure we always have a net connection
		window.setInterval(watchNetConnection, 1000);

		// Get initial GPS coordinates and watch geolocation.
		var geoOptions = {
				enableHighAccuracty: false,
				timeout: 5000
		}
		navigator.geolocation.getCurrentPosition(setLatLng, disableDistance, geoOptions);
		//navigator.geolocation.watchPosition(setLatLng, disableDistance, geoOptions);
		
		navigator.splashscreen.hide();
}

// Checks if net connection is enabled
function watchNetConnection() {
		var err = $('#errordisplay');
		if (navigator.connection.type == Connection.NONE) {
				// No connection
				$('input').attr('disabled', 'disabled');
				var errmsg =
						'<p>An internet connection is required for this app.'
						+ ' Please connect to the internet and try again.</p>';
				err.html(errmsg).fadeIn();
		} else {
				$('input').removeAttr('disabled');
				err.fadeOut();
		}
}


// historical.js

$(document).on('deviceready', onDeviceReady);

$(document).ready(function () {
		$(document).click(function(event) { console.log(event.toElement.nodeName); });

		// Set up the map
		googleMapSetup();

		// Help/Info section, close marker description
		// $('#openhelpinfo, #closehelpinfo').click(function () {
		$('#helpinfo h4, #closehelpinfo, #historicalheader').on('click', function () {
				$('#helpinfo').slideToggle();
				searchbox.fadeToggle();
		});

		// Show on map button
		//$('#showonmap').click(function () {
		$('#showonmap').click(function () {
				var resultid = $(this).data('resultid');
				markers[ resultid ].setVisible(true); // must be visible first
				map.panTo( markers[ resultid ].getPosition() ); // move the map here
				container.css('marginLeft', -(buttons.width())); // move the map on screen
				$('#searchresults input[value="' + resultid + '"]')
						.attr('checked', 'checked')
						.trigger('change'); // check the checkbox
				$('#markerdescription').fadeToggle(); // hide the info window
		});

		// Loading...
		$('#searchloading').ajaxStart(function () {
				$(this).slideDown();
		}
		).ajaxStop(function () {
				$(this).slideUp();
		});

		$('#radiuslist span').on('click', function() {
				if ($('#radiuslist').hasClass('distanceDisabled'))
						return false; // Can't even do nothin!
				var thisSpan = $(this);
				$('#radiuslist input').removeAttr('checked');
				$('#radiuslist span').removeClass('labelchecked');
				thisSpan.siblings('input').attr('checked', 'checked');
				thisSpan.addClass('labelchecked');
		});
		
		// Map and Search SLIDER buttons on bottom of screen
		$('#map-button').click(slideInMap);
		$('#search-button').click(slideInSearch);

		// Search button / form submit handling
		// $('#searchbutton').click(beginMarkerSearch);
		$('#searchbutton').click(beginMarkerSearch);
		$('#searchform').submit(beginMarkerSearch);

		// Results "all/none" Checkbox
		$('#allcheckbox').change(function () {
				// Get the allcheckbox state, which is either 'checked' or nothing, so false
				var checkstate = $(this).attr('checked') || false;
				//make sure every checkbox is what allcheckbox is
				$('#searchresults li:not(.resultheader) input[type="checkbox"]').attr('checked', checkstate).trigger('change');
		});

		// Resize the window every time we need it
		// Comes after the map since resizeContainer fiddles with it
		resizeContainer();
		$(window).resize(resizeContainer);

});


