









		(function() {
			ininGoogleMap();
		})();
	

!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

//javascript:onGeoMapWithMarker('24.4513658588817','122.944400917442','http://static.adzerk.net/Advertisers/d893babe671c41118c1fece177e0a21a.jpg');
var map = null;
var marker = null;
var flightPath = null;
var overlay = null;

function ininGoogleMap() {
	var myOptions = {
		zoom : 15,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		disableDefaultUI : true,
		mapTypeControl : false,
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	// onGeoMapWithMarker('24.4513658588817', '122.944400917442',
	// 'http://static.adzerk.net/Advertisers/d893babe671c41118c1fece177e0a21a.jpg');
	Android.onLoadMapFinish();
}

function onGeoMap(latitude, longitude) {
	var myLatlng = new google.maps.LatLng(latitude, longitude);
	var myOptions = {
		zoom : 15,
		center : myLatlng,
		mapTypeId : google.maps.MapTypeId.HYBRID,
		disableDefaultUI : true,
		mapTypeControl : false,
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	overlay = new google.maps.OverlayView();
	overlay.draw = function() {
	};
	overlay.setMap(map);

	flightPath = new google.maps.Polygon({
		strokeColor : '#FF0000',
		strokeOpacity : 0.8,
		strokeWeight : 2,
		fillColor : '#FF0000',
		fillOpacity : 0.35

	});
	flightPath.setMap(map);
}

function onGeoMapWithMarker(latitude, longitude, iconPath) {
	var myLatlng = new google.maps.LatLng(latitude, longitude);
	map.setCenter(myLatlng);
	// marker = new google.maps.Marker({
	// position : myLatlng,
	// map : map,
	// icon : '../img/marker.png',
	// title : 'Hello World!'
	// });
	if (marker != null) {
		marker.setMap(null);
	}
	marker = new CustomMarker(myLatlng, map, iconPath);
}

function onGeoMapDefault() {
	var myLatlng = new google.maps.LatLng('37.4900318', '136.4664008');
	map.setCenter(myLatlng);
	map.setZoom(3);
}

function clearMarker() {
	if (marker != null) {
		marker.setMap(null);
	}
}

function clearmap() {
	flightPath.setPath(new Array());
}


function loadMap() {
	ininGoogleMap();
}

map = null;
marker = null;
flightPath = null;
overlay = null;
function ininGoogleMap() {
	var latitude = 34.986500;
	var longitude = 137.005341;
	var myLatlng = new google.maps.LatLng(latitude, longitude);
	var myOptions = {
		zoom : 15,
		center : myLatlng,
		//mapTypeId : google.maps.MapTypeId.SATELLITE,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		disableDefaultUI : true,
		mapTypeControl : false,
		//zoomControl: true, 
		mapTypeControl: true,
	};
	map = new google.maps.Map(document.getElementById("map"), myOptions);

	overlay = new google.maps.OverlayView();
	overlay.draw = function() {
	};
	overlay.setMap(map);

	flightPath = new google.maps.Polygon({
		strokeColor : '#FF0000',
		strokeOpacity : 0.8,
		strokeWeight : 2,
		fillColor : '#FF0000',
		fillOpacity : 0.35

	});
	flightPath.setMap(map);
}

function onDrawMap(json) {
	if (json != null && String(json).length > 0) {
		var objListPoint = $.parseJSON(json);
		var listCoordinates = new Array();
		var projection = overlay.getProjection();
		var ratio = window.devicePixelRatio;
		for (index in objListPoint) {
			var point = objListPoint[index];
			var coordinates = projection.fromContainerPixelToLatLng(new google.maps.Point(point.x / ratio, point.y / ratio));
			listCoordinates.push(coordinates);
		}
		flightPath.setPath(listCoordinates);
	}
}

function clearmap() {
	flightPath.setPath(new Array());
}



function CustomMarker(latlng, map, path) {
	this.latlng_ = latlng;
	this.path = path;
	this.map = map;
	// Once the LatLng and text are set, add the overlay to the map. This will
	// trigger a call to panes_changed which should in turn call draw.
	this.setMap(map);
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {
	var me = this;
	// Then add the overlay to the DOM
	var panes = this.getPanes();
	// Check if the div has been created.
	var div = this.div_;
	if (!div) {
		// Create a overlay text DIV
		div = this.div_ = $('<div/>', {
			id : 'marker',
			class : 'marker'
		}).appendTo(panes.overlayImage).get(0);

		var img = $('<img/>', {
			src : this.path,
		}).appendTo(div);

		google.maps.event.addDomListener(div, "click", function(event) {
			google.maps.event.trigger(me, "click");
		});

	}

	// Position the overlay
	var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
	if (point) {
		$('#marker').css({
			left : (point.x - 24) + 'px',
			top : (point.y - 65) + 'px',
		});
	}
};

CustomMarker.prototype.remove = function() {
	// Check if the overlay was on the map and needs to be removed.
	if (this.div_) {
		this.div_.parentNode.removeChild(this.div_);
		this.div_ = null;
	}
};

CustomMarker.prototype.getPosition = function() {
	return this.latlng_;
};

