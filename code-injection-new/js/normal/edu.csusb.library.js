




    ga_storage._setAccount('UA-33997773-5'); //Replace with your own
    ga_storage._setDomain('none');
    ga_storage._trackPageview('CSUSB Mobile Main');





if(!((window.DocumentTouch&&document instanceof DocumentTouch)||'ontouchstart' in window)){
	var script=document.createElement("script");

	script.src="plugins/jq.desktopBrowsers.js";
	var tag=$("head").append(script);
	if(!$.os.ie){
	//	$.os.desktop=true;
	//	$.feat.nativeTouchScroll=true;
	}
}



















    /* This function runs once the page is loaded, but appMobi is not yet active */
	$.ui.autoLaunch=true;
    $.ui.openLinksNewTab=false;
    $.ui.resetScrollers=false;
    $.ui.blockPageScroll();
	$.ui.ready(function(){
	//alert("test");
	//$.ui.blockPageScroll();
	initialize();
	
	});

    

	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {
	//alert("Phonegap ready");
	//check for internet connection
	document.addEventListener("offline", function() {
                                      alert("No internet connection");
                                      }, false);
	console.log("We got device ready");
    window.setTimeout(function(){cordova.exec(null, null, "SplashScreen", "hide", []);},2000);
    //alert("Phonegap ready");
    
    
    }	
	
	function showHide(obj,objToHide){
		var el=$("#"+objToHide)[0];
		
		if(obj.className=="expanded"){
			obj.className="collapsed";
		}
		else{
			obj.className="expanded";
		}
		$(el).toggle();
		
	}


        function showSocial(){
            $("#jQUi").actionsheet('<a onclick="window.plugins.childBrowser.showWebPage(\'http://m.facebook.com/CSUSBpfaulibrary\'); ga_storage._trackPageview(\'Facebook\');"  ><img style="right:5px;top:5px;position:relative !important;" width="26px" height="26px" src="img/facebook_button.png" />Facebook</a><a onclick="window.plugins.childBrowser.showWebPage(\'http://twitter.com/CSUSBlibrary\'); ga_storage._trackPageview(\'Twitter\');"  ><img style="right:5px;top:5px;position:relative !important;" width="26px" height="26px" src="img/twitter-button.png" />Twitter</a><a onclick="window.plugins.childBrowser.showWebPage(\'http://m.youtube.com/user/CSUSanBernardino\'); ga_storage._trackPageview(\'Youtube\');"  ><img style="right:5px;top:5px;position:relative !important;" width="26px" height="26px" src="img/youtube_button.png" />Youtube</a>');
        }
    

	function showMask(text){

	$.ui.showMask(text);
	window.setTimeout(function(){$.ui.hideMask();},1000);
	}
		var menuOpen = false;
	var menuDiv = "";

	function menubutton() {
		document.addEventListener("deviceready", startup, false);
	}

	function startup() {
		console.log("test menu...");
		document.addEventListener("menubutton", doMenu, false);
	}

	function doMenu() {
		console.log("The menu was clicked...");
	jq.ui.toggleSideMenu();
	}
	

            var pfauTime = getCurrentDate();
            var hixTime = getCurrentDatePDC();
            
            var p1 = document.createElement('p');
            p1.innerHTML = pfauTime;
            
            document.getElementById('time').appendChild(p1).className += " p_info";
            
            var p2 = document.createElement('p');
            p2.innerHTML = hixTime;
            document.getElementById('timepdc').appendChild(p2).className += " p_info";
            
            













﻿//CSUSB Mobile Map v2.0 Geoxml3 

// Extend the global String object with a method to remove leading and trailing whitespace
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

// Declare namespace
geoXML3 = window.geoXML3 || {instances: []};

// Constructor for the root KML parser object
geoXML3.parser = function (options) {
  // Private variables
  var parserOptions = geoXML3.combineOptions(options, {
    singleInfoWindow: false,
    processStyles: true,
    zoom: true
  });
  var docs = []; // Individual KML documents
  var lastPlacemark;
  var parserName;
  if (typeof parserOptions.suppressInfoWindows == "undefined") parserOptions.suppressInfoWindows = false;
  if (!parserOptions.infoWindow && parserOptions.singleInfoWindow)
    parserOptions.infoWindow = new google.maps.InfoWindow();

  var parseKmlString = function (kmlString, docSet) {
    // Internal values for the set of documents as a whole
    var internals = {
      parser: this,
      docSet: docSet || [],
      remaining: 1,
      parseOnly: !(parserOptions.afterParse || parserOptions.processStyles)
    };
    thisDoc = new Object();
    thisDoc.internals = internals;
    internals.docSet.push(thisDoc);
    render(geoXML3.xmlParse(kmlString),thisDoc);
  }

  var parse = function (urls, docSet) {
    // Process one or more KML documents
    if (!parserName) {
      parserName = 'geoXML3.instances[' + (geoXML3.instances.push(this) - 1) + ']';
    }
    
    if (typeof urls === 'string') {
      // Single KML document
      urls = [urls];
    }

    // Internal values for the set of documents as a whole
    var internals = {
      parser: this,
      docSet: docSet || [],
      remaining: urls.length,
      parseOnly: !(parserOptions.afterParse || parserOptions.processStyles)
    };
    var thisDoc, j;
    for (var i = 0; i < urls.length; i++) {
      var baseUrl = urls[i].split('?')[0];
      for (j = 0; j < docs.length; j++) {
        if (baseUrl === docs[j].baseUrl) {
          // Reloading an existing document
          thisDoc = docs[j];
          thisDoc.reload    = true;
          break;
        }
      }
      if (j >= docs.length) {
        thisDoc = new Object();
        thisDoc.baseUrl = baseUrl;
        internals.docSet.push(thisDoc);
      }
      thisDoc.url       = urls[i];
      thisDoc.internals = internals;
      fetchDoc(thisDoc.url, thisDoc);
    }
  };

  function fetchDoc(url, doc) {
      geoXML3.fetchXML(url, function (responseXML) { render(responseXML, doc);})
  }

  var hideDocument = function (doc) {
    if (!doc) doc = docs[0];
    // Hide the map objects associated with a document 
    var i;
    if (!!doc.markers) {
      for (i = 0; i < doc.markers.length; i++) {
        if(!!doc.markers[i].infoWindow) doc.markers[i].infoWindow.close();
        doc.markers[i].setVisible(false);
      }
    }
    if (!!doc.ggroundoverlays) {
      for (i = 0; i < doc.ggroundoverlays.length; i++) {
        doc.ggroundoverlays[i].setOpacity(0);
      }
    }
    if (!!doc.gpolylines) {
      for (i=0;i<doc.gpolylines.length;i++) {
        if(!!doc.gpolylines[i].infoWindow) doc.gpolylines[i].infoWindow.close();
        doc.gpolylines[i].setMap(null);
      }
    }
    if (!!doc.gpolygons) {
      for (i=0;i<doc.gpolygons.length;i++) {
        if(!!doc.gpolygons[i].infoWindow) doc.gpolygons[i].infoWindow.close();
        doc.gpolygons[i].setMap(null);
      }
    }
  };
  
  var showDocument = function (doc) {
    if (!doc) doc = docs[0];
    // Show the map objects associated with a document 
    var i;
    if (!!doc.markers) {
      for (i = 0; i < doc.markers.length; i++) {
        doc.markers[i].setVisible(true);
      }
    }
    if (!!doc.ggroundoverlays) {
      for (i = 0; i < doc.ggroundoverlays.length; i++) {
        doc.ggroundoverlays[i].setOpacity(doc.ggroundoverlays[i].percentOpacity_);
      }
    }
    if (!!doc.gpolylines) {
      for (i=0;i<doc.gpolylines.length;i++) {
        doc.gpolylines[i].setMap(parserOptions.map);
      }
    }
    if (!!doc.gpolygons) {
      for (i=0;i<doc.gpolygons.length;i++) {
        doc.gpolygons[i].setMap(parserOptions.map);
      }
    }
  };

var defaultStyle = {
  color: "ff000000", // black
  width: 1,
  fill: true,
  outline: true,
  fillcolor: "3fff0000" // blue
};

function processStyle(thisNode, styles, styleID) {
      var nodeValue  = geoXML3.nodeValue;
      styles[styleID] = styles[styleID] || clone(defaultStyle);
      var styleNodes = thisNode.getElementsByTagName('IconStyle');
      if (!!styleNodes && !!styleNodes.length && (styleNodes.length > 0)) {
        styles[styleID].scale = parseFloat(nodeValue(styleNodes[0].getElementsByTagName('scale')[0]));
      }
      if (isNaN(styles[styleID].scale)) styles[styleID].scale = 1.0;
      styleNodes = thisNode.getElementsByTagName('Icon');
      if (!!styleNodes && !!styleNodes.length && (styleNodes.length > 0)) {
        styles[styleID].href = nodeValue(styleNodes[0].getElementsByTagName('href')[0]);
      }
      styleNodes = thisNode.getElementsByTagName('LineStyle');
      if (!!styleNodes && !!styleNodes.length && (styleNodes.length > 0)) {
        styles[styleID].color = nodeValue(styleNodes[0].getElementsByTagName('color')[0]);
        styles[styleID].width = nodeValue(styleNodes[0].getElementsByTagName('width')[0]);
      }
      styleNodes = thisNode.getElementsByTagName('PolyStyle');
      if (!!styleNodes && !!styleNodes.length && (styleNodes.length > 0)) {
        styles[styleID].outline   = getBooleanValue(styleNodes[0].getElementsByTagName('outline')[0]);
        styles[styleID].fill      = getBooleanValue(styleNodes[0].getElementsByTagName('fill')[0]);
        styles[styleID].fillcolor = nodeValue(styleNodes[0].getElementsByTagName('color')[0]);
      }
      return styles[styleID];
}

// from http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-a-javascript-object
// http://keithdevens.com/weblog/archive/2007/Jun/07/javascript.clone
  function clone(obj){
      if(obj == null || typeof(obj) != 'object') return obj;
      var temp = new obj.constructor(); 
      for(var key in obj) temp[key] = clone(obj[key]);
      return temp;
  }

function processStyleMap(thisNode, styles, styleID) {
  var nodeValue  = geoXML3.nodeValue;
  var pairs = thisNode.getElementsByTagName('Pair');
  var map = new Object();
  // add each key to the map
  for (var pr=0;pr<pairs.length;pr++) {
    var pairkey = nodeValue(pairs[pr].getElementsByTagName('key')[0]);
    var pairstyle = nodeValue(pairs[pr].getElementsByTagName('Style')[0]);
    var pairstyleurl = nodeValue(pairs[pr].getElementsByTagName('styleUrl')[0]);
    if (!!pairstyle) {
      processStyle(pairstyle, map[pairkey], styleID);
    } else if (!!pairstyleurl && !!styles[pairstyleurl]) {
      map[pairkey] = clone(styles[pairstyleurl]);
    }
  }
  if (!!map["normal"]) {
    styles[styleID] = clone(map["normal"]);
  } else {
    styles[styleID] =  clone(defaultStyle);
  }      
  if (!!map["highlight"]) {
    processStyleID(map["highlight"]);
  }
  styles[styleID].map = clone(map);
}

function getBooleanValue(node) {
  var nodeContents = geoXML3.nodeValue(node);
  if (!nodeContents) return true;
  if (nodeContents) nodeContents = parseInt(nodeContents);
  if (isNaN(nodeContents)) return true;
  if (nodeContents == 0) return false;
  else return true;
}   

function processPlacemarkCoords(node, tag) {
   var parent = node.getElementsByTagName(tag);
var coordListA = [];
  for (var i=0; i<parent.length; i++) {
  var coordNodes = parent[i].getElementsByTagName('coordinates')
  if (!coordNodes) {
    if (coordListA.length > 0) {
      break;
    } else {
      return [{coordinates: []}];
    }
  }

  for (var j=0; j<coordNodes.length;j++) { 
    var coords = geoXML3.nodeValue(coordNodes[j]).trim();
    coords = coords.replace(/,\s+/g, ',');
    var path = coords.split(/\s+/g);
    var pathLength = path.length;
    var coordList = [];
    for (var k = 0; k < pathLength; k++) {
      coords = path[k].split(',');
      if (!isNaN(coords[0]) && !isNaN(coords[1])) {
        coordList.push({
          lat: parseFloat(coords[1]), 
          lng: parseFloat(coords[0]), 
          alt: parseFloat(coords[2])
        });
      }
    }
    coordListA.push({coordinates: coordList});
  }
}
  return coordListA;
}

  var render = function (responseXML, doc) {
    // Callback for retrieving a KML document: parse the KML and display it on the map
    if (!responseXML) {
      // Error retrieving the data
      geoXML3.log('Unable to retrieve ' + doc.url);
      if (parserOptions.failedParse) {
        parserOptions.failedParse(doc);
      }
    } else if (!doc) {
      throw 'geoXML3 internal error: render called with null document';
    } else { //no errors
      var i;
      var styles = {};
      doc.placemarks     = [];
      doc.groundoverlays = [];
      doc.ggroundoverlays = [];
      doc.networkLinks   = [];
      doc.gpolygons      = [];
      doc.gpolylines     = [];

    // Declare some helper functions in local scope for better performance
    var nodeValue  = geoXML3.nodeValue;

    // Parse styles
    var styleID, styleNodes;
    nodes = responseXML.getElementsByTagName('Style');
    nodeCount = nodes.length;
    for (i = 0; i < nodeCount; i++) {
      thisNode = nodes[i];
      var thisNodeId = thisNode.getAttribute('id');
      if (!!thisNodeId) {
        styleID    = '#' + thisNodeId;
        processStyle(thisNode, styles, styleID);
      }
    }
    // rudamentary support for StyleMap
    // use "normal" mapping only
    nodes = responseXML.getElementsByTagName('StyleMap');
    for (i = 0; i < nodes.length; i++) {
      thisNode = nodes[i];
      var thisNodeId = thisNode.getAttribute('id');
      if (!!thisNodeId) {
        styleID    = '#' + thisNodeId;
	processStyleMap(thisNode, styles, styleID);
      }
    }
    doc.styles = styles;
      if (!!parserOptions.processStyles || !parserOptions.createMarker) {
        // Convert parsed styles into GMaps equivalents
        processStyles(doc);
      }
      
      // Parse placemarks
      if (!!doc.reload && !!doc.markers) {
        for (i = 0; i < doc.markers.length; i++) {
          doc.markers[i].active = false;
        }
      }
      var placemark, node, coords, path, marker, poly;
      var placemark, coords, path, pathLength, marker, polygonNodes, coordList;
      var placemarkNodes = responseXML.getElementsByTagName('Placemark');
      for (pm = 0; pm < placemarkNodes.length; pm++) {
        // Init the placemark object
        node = placemarkNodes[pm];
        placemark = {
          name:  geoXML3.nodeValue(node.getElementsByTagName('name')[0]),
          building:  geoXML3.nodeValue(node.getElementsByTagName('building')[0]),
          description: geoXML3.nodeValue(node.getElementsByTagName('description')[0]),
          styleUrl: geoXML3.nodeValue(node.getElementsByTagName('styleUrl')[0])
        };
        placemark.style = doc.styles[placemark.styleUrl] || clone(defaultStyle);
        // inline style overrides shared style
        var inlineStyles = node.getElementsByTagName('Style');
        if (inlineStyles && (inlineStyles.length > 0)) {
          var style = processStyle(node,doc.styles,"inline");
	  processStyleID(style);
	  if (style) placemark.style = style;
        }
        if (/^https?:\/\//.test(placemark.description)) {
          placemark.description = ['<a href="', placemark.description, '">', placemark.description, '</a>'].join('');
        }

        // process MultiGeometry
        var GeometryNodes = node.getElementsByTagName('coordinates');
        var Geometry = null;
	if (!!GeometryNodes && (GeometryNodes.length > 0)) {
          for (var gn=0;gn<GeometryNodes.length;gn++) {
             if (!GeometryNodes[gn].parentNode ||
                 !GeometryNodes[gn].parentNode.nodeName) {

             } else { // parentNode.nodeName exists
               var GeometryPN = GeometryNodes[gn].parentNode;
               Geometry = GeometryPN.nodeName;
       
        // Extract the coordinates
        // What sort of placemark?
        switch(Geometry) {
          case "Point":
            placemark.Point = processPlacemarkCoords(node, "Point")[0]; 
            placemark.latlng = new google.maps.LatLng(placemark.Point.coordinates[0].lat, placemark.Point.coordinates[0].lng);
            pathLength = 1;
            break;
          case "LinearRing":
            // Polygon/line
            polygonNodes = node.getElementsByTagName('Polygon');
            // Polygon
            if (!placemark.Polygon)
              placemark.Polygon = [{
                outerBoundaryIs: {coordinates: []},
                innerBoundaryIs: [{coordinates: []}]
              }];
            for (var pg=0;pg<polygonNodes.length;pg++) {
               placemark.Polygon[pg] = {
                 outerBoundaryIs: {coordinates: []},
                 innerBoundaryIs: [{coordinates: []}]
               }
               placemark.Polygon[pg].outerBoundaryIs = processPlacemarkCoords(polygonNodes[pg], "outerBoundaryIs");
               placemark.Polygon[pg].innerBoundaryIs = processPlacemarkCoords(polygonNodes[pg], "innerBoundaryIs");
            }
            coordList = placemark.Polygon[0].outerBoundaryIs;
            break;

          case "LineString":
            pathLength = 0;
            placemark.LineString = processPlacemarkCoords(node,"LineString");
            break;

          default:
            break;
      }
      } // parentNode.nodeName exists
      } // GeometryNodes loop
      } // if GeometryNodes 
      // call the custom placemark parse function if it is defined
      if (!!parserOptions.pmParseFn) parserOptions.pmParseFn(node, placemark);
      doc.placemarks.push(placemark);
      
      if (placemark.Point) {
          if (!!google.maps) {
            doc.bounds = doc.bounds || new google.maps.LatLngBounds();
            doc.bounds.extend(placemark.latlng);
          }

          if (!!parserOptions.createMarker) {
            // User-defined marker handler
            parserOptions.createMarker(placemark, doc);
          } else { // !user defined createMarker
            // Check to see if this marker was created on a previous load of this document
            var found = false;
            if (!!doc) {
              doc.markers = doc.markers || [];
              if (doc.reload) {
                for (var j = 0; j < doc.markers.length; j++) {
                  if (doc.markers[j].getPosition().equals(placemark.latlng)) {
                    found = doc.markers[j].active = true;
                    break;
                  }
                }
              } 
            }

            if (!found) {
              // Call the built-in marker creator
              marker = createMarker(placemark, doc);
              marker.active = true;
            }
          }
        }
        if (placemark.Polygon) { // poly test 2
            if (!!doc) {
              doc.gpolygons = doc.gpolygons || [];
            }

            if (!!parserOptions.createPolygon) {
              // User-defined polygon handler
              poly = parserOptions.createPolygon(placemark, doc);
            } else {  // ! user defined createPolygon
              // Check to see if this marker was created on a previous load of this document
              poly = createPolygon(placemark,doc);
              poly.active = true;
            }
          if (!!google.maps) {
            doc.bounds = doc.bounds || new google.maps.LatLngBounds();
            doc.bounds.union(poly.bounds);
          }
          } 
          if (placemark.LineString) { // polyline
            if (!!doc) {
              doc.gpolylines = doc.gpolylines || [];
            }
            if (!!parserOptions.createPolyline) {
              // User-defined polyline handler
              poly = parserOptions.createPolyline(placemark, doc);
            } else { // ! user defined createPolyline
              // Check to see if this marker was created on a previous load of this document
              poly = createPolyline(placemark,doc);
              poly.active = true;
            }
          if (!!google.maps) {
            doc.bounds = doc.bounds || new google.maps.LatLngBounds();
            doc.bounds.union(poly.bounds);
          }
          }
          
      } // placemark loop

      if (!!doc.reload && !!doc.markers) {
        for (i = doc.markers.length - 1; i >= 0 ; i--) {
          if (!doc.markers[i].active) {
            if (!!doc.markers[i].infoWindow) {
              doc.markers[i].infoWindow.close();
            }
            doc.markers[i].setMap(null);
            doc.markers.splice(i, 1);
          }
        }
      }

      // Parse ground overlays
      if (!!doc.reload && !!doc.groundoverlays) {
        for (i = 0; i < doc.groundoverlays.length; i++) {
          doc.groundoverlays[i].active = false;
        }
      }

      if (!!doc) {
        doc.groundoverlays = doc.groundoverlays || [];
      }
      // doc.groundoverlays =[];
      var groundOverlay, color, transparency, overlay;
      var groundNodes = responseXML.getElementsByTagName('GroundOverlay');
      for (i = 0; i < groundNodes.length; i++) {
        node = groundNodes[i];
        
        // Init the ground overlay object
        groundOverlay = {
          name:        geoXML3.nodeValue(node.getElementsByTagName('name')[0]),
          description: geoXML3.nodeValue(node.getElementsByTagName('description')[0]),
          icon: {href: geoXML3.nodeValue(node.getElementsByTagName('href')[0])},
          latLonBox: {
            north: parseFloat(geoXML3.nodeValue(node.getElementsByTagName('north')[0])),
            east:  parseFloat(geoXML3.nodeValue(node.getElementsByTagName('east')[0])),
            south: parseFloat(geoXML3.nodeValue(node.getElementsByTagName('south')[0])),
            west:  parseFloat(geoXML3.nodeValue(node.getElementsByTagName('west')[0]))
          }
        };
        if (!!google.maps) {
          doc.bounds = doc.bounds || new google.maps.LatLngBounds();
          doc.bounds.union(new google.maps.LatLngBounds(
            new google.maps.LatLng(groundOverlay.latLonBox.south, groundOverlay.latLonBox.west),
            new google.maps.LatLng(groundOverlay.latLonBox.north, groundOverlay.latLonBox.east)
          ));
        }

      // Opacity is encoded in the color node
      var colorNode = node.getElementsByTagName('color');
      if ( colorNode && colorNode.length && (colorNode.length > 0)) {
        groundOverlay.opacity = geoXML3.getOpacity(nodeValue(colorNode[0]));
      } else {
        groundOverlay.opacity = 0.45;
      }

      doc.groundoverlays.push(groundOverlay);
  
        if (!!parserOptions.createOverlay) {
          // User-defined overlay handler
          parserOptions.createOverlay(groundOverlay, doc);
        } else { // ! user defined createOverlay
          // Check to see if this overlay was created on a previous load of this document
          var found = false;
          if (!!doc) {
            doc.groundoverlays = doc.groundoverlays || [];
            if (doc.reload) {
              overlayBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(groundOverlay.latLonBox.south, groundOverlay.latLonBox.west),
                new google.maps.LatLng(groundOverlay.latLonBox.north, groundOverlay.latLonBox.east));
            var overlays = doc.groundoverlays;
            for (i = overlays.length; i--;) {
              if ((overlays[i].bounds().equals(overlayBounds)) &&
                  (overlays.url_ === groundOverlay.icon.href)) {
                found = overlays[i].active = true;
                break;
              }
            }
          } 
        }
  
          if (!found) {
            // Call the built-in overlay creator
            overlay = createOverlay(groundOverlay, doc);
            overlay.active = true;
          }
        }
    if (!!doc.reload && !!doc.groundoverlays && !!doc.groundoverlays.length) {
      var overlays = doc.groundoverlays;
      for (i = overlays.length; i--;) {
        if (!overlays[i].active) {
          overlays[i].remove();
          overlays.splice(i, 1);
          }
      }
      doc.groundoverlays = overlays;
    }
      }
      // Parse network links
      var networkLink;
      var docPath = document.location.pathname.split('/');
      docPath = docPath.splice(0, docPath.length - 1).join('/');
      var linkNodes = responseXML.getElementsByTagName('NetworkLink');
      for (i = 0; i < linkNodes.length; i++) {
        node = linkNodes[i];
        
        // Init the network link object
        networkLink = {
          name: geoXML3.nodeValue(node.getElementsByTagName('name')[0]),
          link: {
            href:        geoXML3.nodeValue(node.getElementsByTagName('href')[0]),
            refreshMode:     geoXML3.nodeValue(node.getElementsByTagName('refreshMode')[0])
          }
        };
        
        // Establish the specific refresh mode 
        if (networkLink.link.refreshMode === '') {
          networkLink.link.refreshMode = 'onChange';
        }
        if (networkLink.link.refreshMode === 'onInterval') {
          networkLink.link.refreshInterval = parseFloat(geoXML3.nodeValue(node.getElementsByTagName('refreshInterval')[0]));
          if (isNaN(networkLink.link.refreshInterval)) {
            networkLink.link.refreshInterval = 0;
          }
        } else if (networkLink.link.refreshMode === 'onChange') {
          networkLink.link.viewRefreshMode = geoXML3.nodeValue(node.getElementsByTagName('viewRefreshMode')[0]);
          if (networkLink.link.viewRefreshMode === '') {
            networkLink.link.viewRefreshMode = 'never';
          }
          if (networkLink.link.viewRefreshMode === 'onStop') {
            networkLink.link.viewRefreshTime = geoXML3.nodeValue(node.getElementsByTagName('refreshMode')[0]);
            networkLink.link.viewFormat =      geoXML3.nodeValue(node.getElementsByTagName('refreshMode')[0]);
            if (networkLink.link.viewFormat === '') {
              networkLink.link.viewFormat = 'BBOX=[bboxWest],[bboxSouth],[bboxEast],[bboxNorth]';
            }
          }
        }

        if (!/^[\/|http]/.test(networkLink.link.href)) {
          // Fully-qualify the HREF
          networkLink.link.href = docPath + '/' + networkLink.link.href;
        }

        // Apply the link
        if ((networkLink.link.refreshMode === 'onInterval') && 
            (networkLink.link.refreshInterval > 0)) {
          // Reload at regular intervals
          setInterval(parserName + '.parse("' + networkLink.link.href + '")', 
                      1000 * networkLink.link.refreshInterval); 
        } else if (networkLink.link.refreshMode === 'onChange') {
          if (networkLink.link.viewRefreshMode === 'never') {
            // Load the link just once
            doc.internals.parser.parse(networkLink.link.href, doc.internals.docSet);
          } else if (networkLink.link.viewRefreshMode === 'onStop') {
            // Reload when the map view changes
            
          }
        }
      }
}

      if (!!doc.bounds) {
        doc.internals.bounds = doc.internals.bounds || new google.maps.LatLngBounds();
        doc.internals.bounds.union(doc.bounds); 
      }
      if (!!doc.markers || !!doc.groundoverlays || !!doc.gpolylines || !!doc.gpolygons) {
        doc.internals.parseOnly = false;
      }

      doc.internals.remaining -= 1;
      if (doc.internals.remaining === 0) {
        // We're done processing this set of KML documents
        // Options that get invoked after parsing completes
        if (parserOptions.zoom && !!doc.internals.bounds && !!parserOptions.map) {
          parserOptions.map.fitBounds(doc.internals.bounds); 
        }
        if (parserOptions.afterParse) {
          parserOptions.afterParse(doc.internals.docSet);
        }

        if (!doc.internals.parseOnly) {
          // geoXML3 is not being used only as a real-time parser, so keep the processed documents around
            for (var i=0;i<doc.internals.docSet.length;i++) {
              docs.push(doc.internals.docSet[i]);
            }
        }
      }
  };

var kmlColor = function (kmlIn) {
  var kmlColor = {};
  if (kmlIn) {
   aa = kmlIn.substr(0,2);
   bb = kmlIn.substr(2,2);
   gg = kmlIn.substr(4,2);
   rr = kmlIn.substr(6,2);
   kmlColor.color = "#" + rr + gg + bb;
   kmlColor.opacity = parseInt(aa,16)/256;
  } else {
   // defaults
   kmlColor.color = randomColor();
   kmlColor.opacity = 0.45;
  }
  return kmlColor;
}

var randomColor = function(){ 
  var color="#";
  var colorNum = Math.random()*8388607.0;  // 8388607 = Math.pow(2,23)-1
  var colorStr = colorNum.toString(16);
  color += colorStr.substring(0,colorStr.indexOf('.'));
  return color;
};

  var processStyleID = function (style) {
      var zeroPoint = new google.maps.Point(0,0);
      if (!!style.href) {
        var markerRegEx = /\/(red|blue|green|yellow|lightblue|purple|pink|orange|pause|go|stop)(-dot)?\.png/;
        if (markerRegEx.test(style.href)) {
         //bottom middle
	  var anchorPoint = new google.maps.Point(16*style.scale, 32*style.scale);
	} else {
	  var anchorPoint = new google.maps.Point(16*style.scale, 16*style.scale);
	}
        // Init the style object with a standard KML icon
        style.icon =  new google.maps.MarkerImage(
          style.href,
          new google.maps.Size(32*style.scale, 32*style.scale),
          zeroPoint,
          // bottom middle 
          anchorPoint,
          new google.maps.Size(32*style.scale, 32*style.scale)

        );

        // Look for a predictable shadow
        var stdRegEx = /\/(red|blue|green|yellow|lightblue|purple|pink|orange)(-dot)?\.png/;
        var shadowSize = new google.maps.Size(59, 32);
	var shadowPoint = new google.maps.Point(16,32);
        if (stdRegEx.test(style.href)) {
          // A standard GMap-style marker icon
          style.shadow = new google.maps.MarkerImage(
              'http://maps.google.com/mapfiles/ms/micons/msmarker.shadow.png',
              shadowSize,
              zeroPoint,
              shadowPoint,
              shadowSize);
        } else if (style.href.indexOf('-pushpin.png') > -1) {
          // Pushpin marker icon
          style.shadow = new google.maps.MarkerImage(
            'http://maps.google.com/mapfiles/ms/micons/pushpin_shadow.png',
            shadowSize,
            zeroPoint,
            shadowPoint,
            shadowSize);
        } else {
          // Other MyMaps KML standard icon
          style.shadow = new google.maps.MarkerImage(
            style.href.replace('.png', '.shadow.png'),	      		   
            shadowSize,	   					   
            zeroPoint,					
            shadowPoint,
            shadowSize);
        }
      }
  }
    
  var processStyles = function (doc) {
    for (var styleID in doc.styles) {
      processStyleID(doc.styles[styleID]);
    }
  };

  var createMarker = function (placemark, doc) {
    // create a Marker to the map from a placemark KML object

    // Load basic marker properties
    var markerOptions = geoXML3.combineOptions(parserOptions.markerOptions, {
      map:      parserOptions.map,
      position: new google.maps.LatLng(placemark.Point.coordinates[0].lat, placemark.Point.coordinates[0].lng),
      title:    placemark.name,
      zIndex:   Math.round(placemark.Point.coordinates[0].lat * -100000)<<5,
      icon:     placemark.style.icon,
      shadow:   placemark.style.shadow 
    });
  
    // Create the marker on the map
    var marker = new google.maps.Marker(markerOptions);
    if (!!doc) {
      doc.markers.push(marker);
    }

    // Set up and create the infowindow if it is not suppressed
    if (!parserOptions.suppressInfoWindows) {
      var infoWindowOptions = geoXML3.combineOptions(parserOptions.infoWindowOptions, {
        content: '<span class="maplabel">' + placemark.name + 
                 '</span><span class="mapinfo">' + placemark.description + '</span>',
        pixelOffset: new google.maps.Size(0, 2)
      });
      if (parserOptions.infoWindow) {
        marker.infoWindow = parserOptions.infoWindow;
      } else {
        marker.infoWindow = new google.maps.InfoWindow(infoWindowOptions);
      }
      marker.infoWindowOptions = infoWindowOptions;
      
      // Infowindow-opening event handler
      google.maps.event.addListener(marker, 'click', function() {
        this.infoWindow.close();
        marker.infoWindow.setOptions(this.infoWindowOptions);
        this.infoWindow.open(this.map, this);
      });
    }
    placemark.marker = marker;
    return marker;
  };
  
  var createOverlay = function (groundOverlay, doc) {
    // Add a ProjectedOverlay to the map from a groundOverlay KML object

    if (!window.ProjectedOverlay) {
      throw 'geoXML3 error: ProjectedOverlay not found while rendering GroundOverlay from KML';
    }

    var bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(groundOverlay.latLonBox.south, groundOverlay.latLonBox.west),
        new google.maps.LatLng(groundOverlay.latLonBox.north, groundOverlay.latLonBox.east)
    );
    var overlayOptions = geoXML3.combineOptions(parserOptions.overlayOptions, {percentOpacity: groundOverlay.opacity*100});
    var overlay = new ProjectedOverlay(parserOptions.map, groundOverlay.icon.href, bounds, overlayOptions);
    
    if (!!doc) {
      doc.ggroundoverlays = doc.ggroundoverlays || [];
      doc.ggroundoverlays.push(overlay);
    }

    return overlay;
  };

// Create Polyline
var createPolyline = function(placemark, doc) {
  var path = [];
  for (var j=0; j<placemark.LineString.length; j++) {
    var coords = placemark.LineString[j].coordinates;
    var bounds = new google.maps.LatLngBounds();
    for (var i=0;i<coords.length;i++) {
      var pt = new google.maps.LatLng(coords[i].lat, coords[i].lng);
      path.push(pt);
      bounds.extend(pt);
    }
  }
  // point to open the infowindow if triggered 
  var point = path[Math.floor(path.length/2)];
  // Load basic polyline properties
  var kmlStrokeColor = kmlColor(placemark.style.color);
  var polyOptions = geoXML3.combineOptions(parserOptions.polylineOptions, {
    map:      parserOptions.map,
    path: path,
    strokeColor: kmlStrokeColor.color,
    strokeWeight: placemark.style.width,
    strokeOpacity: kmlStrokeColor.opacity,
    title:    placemark.name
  });
  var p = new google.maps.Polyline(polyOptions);
  p.bounds = bounds;
  // setup and create the infoWindow if it is not suppressed
  if (!parserOptions.suppressInfoWindows) {
            var infoWindowOptions = geoXML3.combineOptions(parserOptions.infoWindowOptions, {
             content: '<span class="maplabel">' + placemark.name +
             '</span><span class="mapinfo">' + placemark.description + '</span>',
             pixelOffset: new google.maps.Size(0, 2)
    });
    if (parserOptions.infoWindow) {
      p.infoWindow = parserOptions.infoWindow;
    } else {
      p.infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    }
    p.infoWindowOptions = infoWindowOptions;
    // Infowindow-opening event handler
    google.maps.event.addListener(p, 'click', function(e) {
      p.infoWindow.close();
      p.infoWindow.setOptions(p.infoWindowOptions);
      if (e && e.latLng) {
        p.infoWindow.setPosition(e.latLng);
      } else {
        p.infoWindow.setPosition(point);
      }
      p.infoWindow.open(this.map);
    });
  }
  if (!!doc) doc.gpolylines.push(p);
  placemark.polyline = p;
  return p;
}

// Create Polygon
var createPolygon = function(placemark, doc) {
  var bounds = new google.maps.LatLngBounds();
  var pathsLength = 0;
  var paths = [];
  for (var polygonPart=0;polygonPart<placemark.Polygon.length;polygonPart++) {
    for (var j=0; j<placemark.Polygon[polygonPart].outerBoundaryIs.length; j++) {
      var coords = placemark.Polygon[polygonPart].outerBoundaryIs[j].coordinates;
      var path = [];
      for (var i=0;i<coords.length;i++) {
        var pt = new google.maps.LatLng(coords[i].lat, coords[i].lng);
        path.push(pt);
        bounds.extend(pt);
      }
      paths.push(path);
      pathsLength += path.length;
    }
    for (var j=0; j<placemark.Polygon[polygonPart].innerBoundaryIs.length; j++) {
      var coords = placemark.Polygon[polygonPart].innerBoundaryIs[j].coordinates;
      var path = [];
      for (var i=0;i<coords.length;i++) {
        var pt = new google.maps.LatLng(coords[i].lat, coords[i].lng);
        path.push(pt);
        bounds.extend(pt);
      }
      paths.push(path);
      pathsLength += path.length;
    }
  }

  // Load basic polygon properties
  var kmlStrokeColor = kmlColor(placemark.style.color);
  var kmlFillColor = kmlColor(placemark.style.fillcolor);
  if (!placemark.style.fill) kmlFillColor.opacity = 0.0;
  var strokeWeight = placemark.style.width;
  if (!placemark.style.outline) {
    strokeWeight = 0;
    kmlStrokeColor.opacity = 0.0;
  }
  var polyOptions = geoXML3.combineOptions(parserOptions.polygonOptions, {
    map:      parserOptions.map,
    paths:    paths,
    title:    placemark.name,
    strokeColor: kmlStrokeColor.color,
    strokeWeight: strokeWeight,
    strokeOpacity: kmlStrokeColor.opacity,
    fillColor: kmlFillColor.color,
    fillOpacity: kmlFillColor.opacity
  });
  var p = new google.maps.Polygon(polyOptions);
  p.bounds = bounds;
  if (!parserOptions.suppressInfoWindows) {
            var infoWindowOptions = geoXML3.combineOptions(parserOptions.infoWindowOptions, {
            content: '<span class="maplabel">' + placemark.name +
            '</span><span class="mapinfo">' + placemark.description + '</span>',
            pixelOffset: new google.maps.Size(0, 2)

    });
    if (parserOptions.infoWindow) {
      p.infoWindow = parserOptions.infoWindow;
    } else {
      p.infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    }
    p.infoWindowOptions = infoWindowOptions;
    // Infowindow-opening event handler
    google.maps.event.addListener(p, 'click', function(e) {
      p.infoWindow.close();
      p.infoWindow.setOptions(p.infoWindowOptions);
      if (e && e.latLng) {
        p.infoWindow.setPosition(e.latLng);
      } else {
        p.infoWindow.setPosition(p.bounds.getCenter());
      }
      p.infoWindow.open(this.map);
    });
  }
  if (!!doc) doc.gpolygons.push(p);
  placemark.polygon = p;
  return p;
}

  return {
    // Expose some properties and methods

    options: parserOptions,
    docs:    docs,
    
    parse:          parse,
    parseKmlString: parseKmlString,
    hideDocument:   hideDocument,
    showDocument:   showDocument,
    processStyles:  processStyles, 
    createMarker:   createMarker,
    createOverlay:  createOverlay,
    createPolyline: createPolyline,
    createPolygon:  createPolygon
  };
};
// End of KML Parser

// Helper objects and functions
geoXML3.getOpacity = function (kmlColor) {
  // Extract opacity encoded in a KML color value. Returns a number between 0 and 1.
  if (!!kmlColor &&
      (kmlColor !== '') &&
      (kmlColor.length == 8)) {
    var transparency = parseInt(kmlColor.substr(0, 2), 16);
    return transparency / 255;
  } else {
    return 1;
  }
};

// Log a message to the debugging console, if one exists
geoXML3.log = function(msg) {
  if (!!window.console) {
    console.log(msg);
  } else { alert("log:"+msg); }
};

// Combine two options objects: a set of default values and a set of override values 
geoXML3.combineOptions = function (overrides, defaults) {
  var result = {};
  if (!!overrides) {
    for (var prop in overrides) {
      if (overrides.hasOwnProperty(prop)) {
        result[prop] = overrides[prop];
      }
    }
  }
  if (!!defaults) {
    for (prop in defaults) {
      if (defaults.hasOwnProperty(prop) && (result[prop] === undefined)) {
        result[prop] = defaults[prop];
      }
    }
  }
  return result;
};

// Retrieve an XML document from url and pass it to callback as a DOM document
geoXML3.fetchers = [];

// parse text to XML doc
/**
 * Parses the given XML string and returns the parsed document in a
 * DOM data structure. This function will return an empty DOM node if
 * XML parsing is not supported in this browser.
 * @param {string} str XML string.
 * @return {Element|Document} DOM.
 */
geoXML3.xmlParse = function (str) {
  if (typeof ActiveXObject != 'undefined' && typeof GetObject != 'undefined') {
    var doc = new ActiveXObject('Microsoft.XMLDOM');
    doc.loadXML(str);
    return doc;
  }

  if (typeof DOMParser != 'undefined') {
    return (new DOMParser()).parseFromString(str, 'text/xml');
  }

  return createElement('div', null);
}

geoXML3.fetchXML = function (url, callback) {
  function timeoutHandler() {
    callback();
  };

  var xhrFetcher = new Object();
  if (!!geoXML3.fetchers.length) {
    xhrFetcher = geoXML3.fetchers.pop();
  } else {
    if (!!window.XMLHttpRequest) {
      xhrFetcher.fetcher = new window.XMLHttpRequest(); // Most browsers
    } else if (!!window.ActiveXObject) {
      xhrFetcher.fetcher = new window.ActiveXObject('Microsoft.XMLHTTP'); // Some IE
    }
  }

  if (!xhrFetcher.fetcher) {
    geoXML3.log('Unable to create XHR object');
    callback(null);
  } else {
      if (xhrFetcher.fetcher.overrideMimeType) {
        xhrFetcher.fetcher.overrideMimeType('text/xml');
      }
      xhrFetcher.fetcher.open('GET', url, true);
      xhrFetcher.fetcher.onreadystatechange = function () {
      if (xhrFetcher.fetcher.readyState === 4) {
        // Retrieval complete
        if (!!xhrFetcher.xhrtimeout)
          clearTimeout(xhrFetcher.xhrtimeout);
        if (xhrFetcher.fetcher.status >= 400) {
          geoXML3.log('HTTP error ' + xhrFetcher.fetcher.status + ' retrieving ' + url);
          callback();
        } else {
          // Returned successfully
	    callback(geoXML3.xmlParse(xhrFetcher.fetcher.responseText));
        }
        // We're done with this fetcher object
        geoXML3.fetchers.push(xhrFetcher);
      }
    };
    xhrFetcher.xhrtimeout = setTimeout(timeoutHandler, 60000);
    xhrFetcher.fetcher.send(null);
  }
};

//nodeValue: Extract the text value of a DOM node, with leading and trailing whitespace trimmed
geoXML3.nodeValue = function(node) {
  var retStr="";
  if (!node) {
    return '';
  }
   if(node.nodeType==3||node.nodeType==4||node.nodeType==2){
      retStr+=node.nodeValue;
   }else if(node.nodeType==1||node.nodeType==9||node.nodeType==11){
      for(var i=0;i<node.childNodes.length;++i){
         retStr+=arguments.callee(node.childNodes[i]);
      }
   }
   return retStr;
};

redirectMouseToTouch = function(type, originalEvent) 
{

    //stop propagation, and remove default behavior for everything but INPUT, TEXTAREA & SELECT fields
    // originalEvent.stopPropagation();
    if (originalEvent.target.tagName.toUpperCase().indexOf("SELECT") == -1 && 
    originalEvent.target.tagName.toUpperCase().indexOf("TEXTAREA") == -1 && 
    originalEvent.target.tagName.toUpperCase().indexOf("INPUT") == -1)  //SELECT, TEXTAREA & INPUT
    {
        //if(type != 'touchstart')
        //originalEvent.stopPropagation();//originalEvent.preventDefault();
        //else
        //originalEvent.preventDefault();
        originalEvent.stopPropagation();
    }
    
    var touchevt = document.createEvent("Event");
    touchevt.initEvent(type, true, true);
    touchevt.touches = new Array();
    touchevt.touches[0] = new Object();
    touchevt.touches[0].pageX = originalEvent.pageX;
    touchevt.touches[0].pageY = originalEvent.pageY;
    touchevt.touches[0].target = originalEvent.target;
    touchevt.changedTouches = touchevt.touches; //for jqtouch
    touchevt.targetTouches = touchevt.touches; //for jqtouch
    touchevt.target = originalEvent.target;
    originalEvent.target.dispatchEvent(touchevt);
    return touchevt;
}

emulateTouchEvents = function() 
{
    var ee = document;

    document.mouseMoving = false;
    
    
    document.addEventListener("mousedown", function(e) 
    {
        try 
        {
            this.mouseMoving = true;
            var touchevt = redirectMouseToTouch("touchstart", e);
            if (document.ontouchstart)
                document.ontouchstart(touchevt);
            if(e.target.ontouchstart)
                e.target.ontouchstart(e);
            
        } catch (e) {
        }
    });

    //ee[x].onmouseup=function(e)
    document.addEventListener("mouseup", function(e) 
    {
        try 
        {
            this.mouseMoving = false;

            var touchevt = redirectMouseToTouch("touchend", e);
            if (document.ontouchend)
                document.ontouchend(touchevt);
            if(e.target.ontouchend)
                e.target.ontouchend(e);
        } 
        catch (e) {
        }
    });
    //ee[x].onmousemove=function(e)
    document.addEventListener("mousemove", function(e) 
    {
        try 
        {
            if (!this.mouseMoving)
                return
            var touchevt = redirectMouseToTouch("touchmove", e);
            if (document.ontouchmove)
                document.ontouchmove(touchevt);
            if(e.target.ontouchmove)
                e.target.ontouchmove(e);
        } 
        catch (e) {
        }
    });
// }
}
emulateTouchEvents();
window.addEventListener("resize",function(){
var touchevt = document.createEvent("Event");
 touchevt.initEvent("orientationchange", true, true);
    document.dispatchEvent(touchevt);
},false);




	var row = 'odd';
    var row = 'even';


	$.fn.weatherfeed = function(locations, options) {

		// Set pluign defaults
		var defaults = {
			unit: 'f',
			image: true,
			highlow: true,
			wind: true,
			link: true,
			showerror: false
		};
		var options = $.extend(defaults, options);

		// Functions
		return this.each(function(i, e) {
			var $e = $(e);

			// Add feed class to user div
			if (!$e.hasClass('weatherFeed')) $e.addClass('weatherFeed');

			// Check and append locations
			if (!$.isArray(locations)) return false;
			var count = locations.length;
			if (count > 10) count = 10;
			var locationid = '';
			for (var i=0; i<count; i++) {
				if (locationid != '') locationid += ',';
				locationid += "'"+ locations[i] + "'";
			}

			// Cache results for an hour to prevent overuse
			now = new Date()

			// Create Yahoo Weather feed API address
			var query = "select * from weather.forecast where location in ("+ locationid +") and u='"+ options.unit +"'";
			var api = 'http://query.yahooapis.com/v1/public/yql?q='+ encodeURIComponent(query) +'&rnd='+ now.getFullYear() + now.getMonth() + now.getDay() + now.getHours() +'&format=json&callback=?';

			// Send request
			//$.getJSON(api, function(data) {
			$.ajax({
				type: 'GET',
				url: api,
				dataType: 'json',
				success: function(data) {

					if (data.query) {

						if (data.query.results.channel.length > 0 ) {

							// Multiple locations
							var result = data.query.results.channel.length;
							for (var i=0; i<result; i++) {

								// Create weather feed item
								_callback(e, data.query.results.channel[i], options);
							}
						} else {

							// Single location only
							_callback(e, data.query.results.channel, options);
						}
					} else {
						if (options.showerror) $e.html('<p>Weather information unavailable</p>');
					}
				},
				error: function(data) {
					if (options.showerror)  $e.html('<p>Weather request failed</p>');
				}
			});

		});
	};

	// Function to each feed item
	var _callback = function(e, feed, options) {
		var $e = $(e);

		// Format feed items
		var wd = feed.wind.direction;
		if (wd>=348.75&&wd<=360){wd="N"};if(wd>=0&&wd<11.25){wd="N"};if(wd>=11.25&&wd<33.75){wd="NNE"};if(wd>=33.75&&wd<56.25){wd="NE"};if(wd>=56.25&&wd<78.75){wd="ENE"};if(wd>=78.75&&wd<101.25){wd="E"};if(wd>=101.25&&wd<123.75){wd="ESE"};if(wd>=123.75&&wd<146.25){wd="SE"};if(wd>=146.25&&wd<168.75){wd="SSE"};if(wd>=168.75&&wd<191.25){wd="S"};if(wd>=191.25 && wd<213.75){wd="SSW"};if(wd>=213.75&&wd<236.25){wd="SW"};if(wd>=236.25&&wd<258.75){wd="WSW"};if(wd>=258.75 && wd<281.25){wd="W"};if(wd>=281.25&&wd<303.75){wd="WNW"};if(wd>=303.75&&wd<326.25){wd="NW"};if(wd>=326.25&&wd<348.75){wd="NNW"};
		var wf = feed.item.forecast[0];

		// Determine day or night image
		wpd = feed.item.pubDate;
		n = wpd.indexOf(":");
		tpb = _getTimeAsDate(wpd.substr(n-2,8));
		tsr = _getTimeAsDate(feed.astronomy.sunrise);
		tss = _getTimeAsDate(feed.astronomy.sunset);

		if (tpb>tsr && tpb<tss) { daynight = 'd'; } else { daynight = 'n'; }

		// Add item container
		var html = '<div class="weatherItem '+ row +'"';
		if (options.image) html += ' style="background-image: url(http://l.yimg.com/a/i/us/nws/weather/gr/'+ feed.item.condition.code + daynight +'.png); background-repeat: no-repeat;"';
		html += '>';


		var feedCity = feed.location.city;
		var CustomCity;
		if(feed.location.city == "Cedar Glen")
			{
				CustomCity = "SAN BERNARDINO";
			}
			else
			{
				CustomCity = feed.location.city;
			}


		// Add item data

		html += '<div class="weatherCity">'+ CustomCity +'</div>';
		html += '<div class="weatherTemp">'+ feed.item.condition.temp +'&deg;</div>';
		//html += '<div class="weatherDesc">'+ feed.item.condition.text +'</div>';
		if (options.highlow) html += '<div class="weatherRange">High: '+ wf.high +'&deg; Low: '+ wf.low +'&deg;</div>';
		if (options.wind) html += '<div class="weatherWind">Wind: '+ wd +' '+ feed.wind.speed + feed.units.speed +'</div>';
		if (options.link) html += '<span style="width:120px;text-align:center;border:#000 1px solid;border-radius:3px;background: -webkit-linear-gradient(top, rgba(191,210,85,1) 0%,rgba(142,185,42,1) 50%,rgba(114,170,0,1) 51%,rgba(158,203,45,1) 100%);color:#000;font-weight:bold;padding:2px;margin-top:4px !important;" onclick="window.plugins.childBrowser.showWebPage(\''+ feed.item.link +'\');">Read full forecast</span>';

		html += '</div>';
		// Alternate row classes
		if (row == 'odd') { row = 'even'; } else { row = 'odd';	}

		$e.append(html);
	};

	// Get time string as date
	var _getTimeAsDate = function(t) {

		d = new Date();
		r = new Date(d.toDateString() +' '+ t);

		return r;
	};





document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {


    $('#news').rssfeed('http://libnews.lib.csusb.edu/?feed=rss2', {
                       limit: 10,
                       media:true,
                       snippet:true,
                       content:true,
                       header:true,
                       
                       
                       });
    
    
                                                       



}






	$.fn.rssfeed = function(url, options, fn) {	
	
		// Set pluign defaults
		var defaults = {
			limit: 10,
			header: true,
			titletag: 'h4',
			date: true,
			content: true,
			snippet: true,
			media: true,
			showerror: true,
			errormsg: '',
			key: null,
			ssl: false,
			linktarget: '_self'
		};  
		var options = $.extend(defaults, options); 
		
		// Functions
		return this.each(function(i, e) {
			var $e = $(e);
			var s = '';

			// Check for SSL protocol
			if (options.ssl) s = 's';
			
			// Add feed class to user div
			if (!$e.hasClass('rssFeed')) $e.addClass('rssFeed');
			
			// Check for valid url
			if(url == null) return false;
			
			// Create Google Feed API address
			var api = "http"+ s +"://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + encodeURIComponent(url);
			if (options.limit != null) api += "&num=" + options.limit;
			if (options.key != null) api += "&key=" + options.key;
			api += "&output=json_xml"

			// Send request
			$.getJSON(api, function(data){
				
				// Check for error
				if (data.responseStatus == 200) {
	
					// Process the feeds
					_process(e, data.responseData, options);

					// Optional user callback function
					if ($.isFunction(fn)) fn.call(this,$e);
					
				} else {

					// Handle error if required
					if (options.showerror)
						if (options.errormsg != '') {
							var msg = options.errormsg;
						} else {
							var msg = data.responseDetails;
						};
						$(e).html('<div class="rssError"><p>'+ msg +'</p></div>');
				};
			});				
		});
	};
	
	// Function to create HTML result
	var _process = function(e, data, options) {

		// Get JSON feed data
		var feeds = data.feed;
		if (!feeds) {
			return false;
		}
		var html = '';	
		
		// Get XML data for media (parseXML not used as requires 1.5+)
		if (options.media) {
			var xml = getXMLDocument(data.xmlString);
			var xmlEntries = xml.getElementsByTagName('item');
		}
		
		// Add header if required
		//if (options.header)
			//html +=	'<br><legend>' +
				//feeds.description + feeds.title +
			//	'</legend><br>';
			

		
		// Add feeds
		for (var i=0; i<feeds.entries.length; i++) {
			
			// Get individual feed
			var entry = feeds.entries[i];
			var pubDate;

			// Format published date
			if (entry.publishedDate) {
				var entryDate = new Date(entry.publishedDate);
				var pubDate = entryDate.toLocaleDateString() + ' ' + entryDate.toLocaleTimeString();
			}
			html += '<div class="rssContainer"><div class="feedTitle" >'
 html +=
 '<div class="rssTitle">'+ entry.title +'</div></div>'

			// Add any media
			if (options.media && xmlEntries.length > 0) {
				var xmlMedia = xmlEntries[i].getElementsByTagName('enclosure');
				if (xmlMedia.length > 0) {
					
					for (var m=0; m<xmlMedia.length; m++) {
						var xmlUrl = xmlMedia[m].getAttribute("url");
						var xmlType = xmlMedia[m].getAttribute("type");
						var xmlSize = xmlMedia[m].getAttribute("length");
						html += '<img style="margin:12px 5px 0px 5px;border-radius:5px; float:left;" src="'+ xmlUrl +'"/>';
					}
				}
				
			}
			
			// Add feed row

			if (options.content) {
			
				// Use feed snippet if available and optioned
				if (options.snippet && entry.contentSnippet != '') {
					var content = entry.contentSnippet;
				} else {
					var content = entry.content;
				}
				
 html += '<div class="rssStory" style="margin-top:5px !important;">'+ content +'</div>'

			}
			

			html += '<div align="right"><a class="greenRss" onclick="window.plugins.childBrowser.showWebPage(\''+ entry.link +'\');"  >Read More</a></div>'
 if (options.date && pubDate) html += '<div class="rssDate">'+ pubDate + '</div></div>'

		}
		
		
		
		$(e).html(html);

		
	};
	
	function formatFilesize(bytes) {
		var s = ['bytes', 'kb', 'MB', 'GB', 'TB', 'PB'];
		var e = Math.floor(Math.log(bytes)/Math.log(1024));
		return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];
	}

	function getXMLDocument(string) {
		var browser = navigator.appName;
		var xml;
		if (browser == 'Microsoft Internet Explorer') {
			xml = new ActiveXObject('Microsoft.XMLDOM');
			xml.async = 'false'
			xml.loadXML(string);
		} else {
			xml = (new DOMParser()).parseFromString(string, 'text/xml');
		}
		return xml;
	}




/**
 * jq.noticeWindow.js
 * @copy 2012 AppMobi
 * Facebook style notification/modal window
   ```
   $("#container").noticeWindow({
       title:'Notifications', //string
       content:__html__, //string of thml
       arrowLeft:'60px' //left,middle,right or pixels from the left
   });
   ```
   * @title $().noticeWindow({})
   */
   
(function($){
    var create=true;
    var noticeObj;
    $.fn.noticeWindow=function(opts){
        if(this.length==0) return noticeObj;
        if(create)
            noticeObj=new noticeWindow(this[0],opts,create);
        else{
           //noticeObj.destroy();
           noticeObj.update(opts);
        }
        create=false;
        return this;
    }
    
    var noticeWindow=function(element,opts,create){
    
        this.container=$(element);
        for(var j in opts){
            this[j]=opts[j];
        }
        switch(this['arrowLeft']){
            case "left":this.arrowLeft='5px';
            break;
            case "middle":this.arrowLeft="120px";
            break;
            case "right":this.arrowLeft="230px";
            break;
        }
        if(parseInt(this.arrowLeft)<=0||isNaN(parseInt(this.arrowLeft)))
            this.arrowLeft='5px';
        
        if(create)
            this.show();
        else
            this.update();
    }
    
    noticeWindow.prototype={
        container:'',
        containerCss:'',
        title:'',
        content:'',
        arrowLeft:"5px",
        mask:null,
        arrowDirection:"up",
        _contentDiv:null,
        _scroller:null,
        show:function(){
            
            this.container.append('<div id="noticeWindow" class="noticeWindow" style="'+this.containerCss+'"><div class="noticeArrow '+this.arrowDirection+'" style="left:'+this.arrowLeft+'"></div><div class="noticeTitle">'+this.title+'</div><div class="noticeContent" id="noticeContent">'+this.content+'</div></div>');
            this.mask=$('<div id="noticeMask" style="width:100%;height:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px;background:transparent;z-index:9998"/>');
            if(this.mask.__proto__["scroller"])
            {
                //Setup a scroller
                 this._scroller=this.container.find("#noticeContent").scroller({
                    scrollBars: true,
                    verticalScroll: true,
                    horizontalScroll: false,
                    vScrollCSS: "jqmScrollbar",
                    refresh: false
                });
                this._contentDiv=this.container.find("#noticeContent").children().get(0);
                this.container.find("#noticeWindow").css("overflow","");
            }
            else
                this._contentDiv=this.container.find("#noticeContent");
            var that=this;
            this.container.append(this.mask);
            this.mask.bind("click",function(){
                that.destroy();
            });
        },
        update:function(opts){
            this.title=opts['title']||"";
            this.content=opts["content"]||"";
            this.arrowLeft=opts["arrowLeft"]||"";
            this.arrowDirection=opts["arrowDirection"]=="down"?"down":"up";
            this.containerCss=opts["containerCss"]||"";
            switch(this['arrowLeft']){
                case "left":this.arrowLeft='5px';
                break;
                case "middle":this.arrowLeft="120px";
                break;
                case "right":this.arrowLeft="230px";
                break;
            }
            this.container.find(".noticeTitle").html(this.title);
            this.updateContent(this.content);
            this.container.get().style.cssText=this.containerCss;
            this.container.find(".noticeArrow").css("left",this.arrowLeft).get(0).className="noticeArrow "+this.arrowDirection;
        },
        updateContent:function(html){
            this._contentDiv.html(html);
        },
        destroy:function(){
            if(this._scroller)
                this._scroller.disable();
            create=true;
            this.container.find("#noticeWindow").remove();
            this.mask.remove();
        }
    };

})(jq);






(function() {

var cordovaRef = window.PhoneGap || window.Cordova || window.cordova; // old to new fallbacks

function ChildBrowser() {
    // Does nothing
}

// Callback when the location of the page changes
// called from native
ChildBrowser._onLocationChange = function(newLoc)
{
    window.plugins.childBrowser.onLocationChange(newLoc);
};

// Callback when the user chooses the 'Done' button
// called from native
ChildBrowser._onClose = function()
{
    window.plugins.childBrowser.onClose();
};

// Callback when the user chooses the 'open in Safari' button
// called from native
ChildBrowser._onOpenExternal = function()
{
    window.plugins.childBrowser.onOpenExternal();
};

// Pages loaded into the ChildBrowser can execute callback scripts, so be careful to
// check location, and make sure it is a location you trust.
// Warning ... don't exec arbitrary code, it's risky and could fuck up your app.
// called from native
ChildBrowser._onJSCallback = function(js,loc)
{
    // Not Implemented
    //window.plugins.childBrowser.onJSCallback(js,loc);
};

/* The interface that you will use to access functionality */

// Show a webpage, will result in a callback to onLocationChange
ChildBrowser.prototype.showWebPage = function(loc)
{
    cordovaRef.exec("ChildBrowserCommand.showWebPage", loc);
};

// close the browser, will NOT result in close callback
ChildBrowser.prototype.close = function()
{
    cordovaRef.exec("ChildBrowserCommand.close");
};

// Not Implemented
ChildBrowser.prototype.jsExec = function(jsString)
{
    // Not Implemented!!
    //PhoneGap.exec("ChildBrowserCommand.jsExec",jsString);
};

// Note: this plugin does NOT install itself, call this method some time after deviceready to install it
// it will be returned, and also available globally from window.plugins.childBrowser
ChildBrowser.install = function()
{
    if(!window.plugins) {
        window.plugins = {};
    }
        if ( ! window.plugins.childBrowser ) {
        window.plugins.childBrowser = new ChildBrowser();
    }

};


if (cordovaRef && cordovaRef.addConstructor) {
    cordovaRef.addConstructor(ChildBrowser.install);
} else {
    console.log("ChildBrowser Cordova Plugin could not be installed.");
    return null;
}


})();

//CSUSB Mobile Map v2.0.2

    var geoXml = null;
    var map = null;
    var geocoder = null;
    var toggleState = 1;
    var infowindow = null;
    var marker = null;
    var geoXmlDoc = null;

      function initialize() {
	geocoder = new google.maps.Geocoder();
	infowindow = new google.maps.InfoWindow({size: new google.maps.Size(150,50) }); 
	
          var imageBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(34.1750447916351, -117.33108758926392),
          new google.maps.LatLng(34.18842909634099, -117.3131275177002));

              var myOptions = {
                disableDefaultUI: true,
                zoomControl: true,
                zoom: 16,
                minZoom: 16,
                maxZoom: 17,
                streetViewControl:true,
                zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP
                };
    
	
	 map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
         var oldmap = new google.maps.GroundOverlay(
                                                   "img/map.png",
                                                   imageBounds);
                                                   
                                                   
        oldmap.setMap(map)
        

          
          // bounds of the desired area
          var allowedBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(34.1750447916351, -117.33108758926392),
          new google.maps.LatLng(34.18842909634099, -117.3131275177002));
          var lastValidCenter = map.getCenter();
          
          google.maps.event.addListener(map, 'center_changed', function() {
          if (allowedBounds.contains(map.getCenter())) {
          // still within valid bounds, so save the last valid position
           lastValidCenter = map.getCenter();
           return; 
              }
          
          // not valid anymore => return to last valid position
           map.panTo(lastValidCenter);
            });  
          
          
	// Called when user accept the Geocoding request
		function showMap(position) 
		{
			// Get user's position
			userLat = position.coords.latitude;
			userLong = position.coords.longitude;
			userPosition = new google.maps.LatLng(userLat, userLong);
			have_user_position = true; 
			
			if( userLat > 34.1750447916351 && userLat < 34.18842909634099 && userLong > -117.33108758926392 && userLong < -117.3131275177002)
			{
				// If within campus, display marker & don't show directions
                var myIcon = new google.maps.MarkerImage("img/pin3.png", null, null, null, new google.maps.Size(50,45));
				var userLoc = new google.maps.LatLng(userLat, userLong);
				var marker = new google.maps.Marker({
                                                    animation: google.maps.Animation.DROP,
                                                    map: map,
                                                    position: userLoc,
                                                    icon: myIcon,

                                                    title: 'You are here!'
                                                    });
        
                

			}


		}
        
// Called if geocoding fails, or if users deny it
		function errorCallback(error) 
		{
			//Nothing here; fails silently
			/*switch(error.code) 
             {
             case error.TIMEOUT:
             alert ('Timeout');
             break;
             case error.POSITION_UNAVAILABLE:
             alert ('Position unavailable');
             break;
             case error.PERMISSION_DENIED:
             alert ('Permission denied');
             break;
             case error.UNKNOWN_ERROR:
             alert ('Unknown error');
             break;
             }
             */
		}
		
        $(function(){
          document.addEventListener("deviceready", onDeviceReady, false);
          })
        
        function onDeviceReady() {
            // Ask for permission to know user's latitude and longitude
            navigator.geolocation.getCurrentPosition(showMap,errorCallback,{timeout:10000});  
        }
		
     
	geoXml = new geoXML3.parser({
                    map: map,
                    singleInfoWindow: true,
                    afterParse: useTheData
                });
	geoXml.parse('xml/production_map.xml');
  }
  

function kmlClick(poly) {
//   map.fitBounds(geoXmlDoc.gpolygons[poly].bounds);
   google.maps.event.trigger(geoXmlDoc.gpolygons[poly],"click");
}

   map.fitBounds(geoXmlDoc.gpolygons[poly].bounds);
   for (var i=0;i<geoXmlDoc.gpolygons.length;i++) {
     if (i == poly) {
       geoXmlDoc.gpolygons[i].setMap(map);
     } else {
       geoXmlDoc.gpolygons[i].setMap(null);
     }
   }

function showAll() {
   map.fitBounds(geoXmlDoc.bounds);
   for (var i=0;i<geoXmlDoc.gpolygons.length;i++) {
     geoXmlDoc.gpolygons[i].setMap(map);
   }
}

function useTheData(doc){
  // Geodata handling goes here, using JSON properties of the doc object
  var sidebarHtml = '<ul><li><a href="javascript:showAll();">Show All</a></li>';
  geoXmlDoc = doc[0];
  for (var i = 0; i < doc[0].gpolygons.length; i++) {
    // console.log(doc[0].markers[i].title);
    sidebarHtml += '<li><a href="javascript:jq.ui.toggleSideMenu();showMask(\'<h1>Loading Content</h1>\');" onclick="javascript:kmlClick('+i+');highlight_link(this);return false;"  ><span class="building">'+doc[0].placemarks[i].name+' </span><span>'+doc[0].placemarks[i].building+'</span></a></li>';
  }
 
  document.getElementById("sidebar").innerHTML = sidebarHtml;
};
            

   function hide_markers_kml(){

            geoXml.hideDocument();  

   }

   function unhide_markers_kml(){

            geoXml.showDocument();  

   }



