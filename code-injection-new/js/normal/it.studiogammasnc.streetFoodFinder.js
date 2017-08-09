






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















/*HTMLElement.prototype.originalRemoveEventListener
        = HTMLElement.prototype.removeEventListener;
 
HTMLElement.prototype.removeEventListener = function(type, listener, useCapture)
{
    console.log('remove: ' + type);
    this.originalRemoveEventListener(type, listener, useCapture);
};
*/

var markets = [];
var viewAssembler = new ViewAssembler();

$(document).ready( function(){
    loadTemplates( setupDefaultView );
} );

function setupDefaultView() { 
    
    var bodyView = viewAssembler.defaultView(); 
    
    //Setup the default view
    var defaultView = { title: "Welcome!", 
    view:  bodyView,
    };
    
    //Setup the ViewNavigator
    window.viewNavigator = new ViewNavigator( 'body' );	
    window.viewNavigator.pushView( defaultView );
    
	$.getScript("data.js", scriptSuccess);
}

function onMapButtonClick( event ) {
    var view = { title: "Map",
             backLabel: (isTablet() ? "Back" : " "),
             view: viewAssembler.mapView(),
             scroll:false
           };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}


function onSearchResultMapButtonClick( event ) {
    
    var centerPoint = {x:0,y:0};
    var len = 0;
    
    for( var i = 0; i<window.filteredMarkesList.length; i++ ){
    
        var _x = parseFloat(window.filteredMarkesList[i].x);
        var _y = parseFloat(window.filteredMarkesList[i].y);
    
        if ( !isNaN( _x ) && !isNaN( _y ) ) {
            //console.log( i, len, _x, _y );
            centerPoint.x += _x;
            centerPoint.y += _y;
            len ++;
        }
    }
    //console.log( centerPoint.x, centerPoint.y );
    centerPoint.x = centerPoint.x / len;
    centerPoint.y = centerPoint.y / len;
    
    //console.log( centerPoint.x, centerPoint.y );
    centerPoint = new L.LatLng(centerPoint.y, centerPoint.x);

    var view = { title: "Map",
             backLabel: (isTablet() ? "Back" : " "),
             view: viewAssembler.mapView(centerPoint),
             scroll:false
           };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}


function onAboutViewClick( event ) {
    var view = { title: "About",
             backLabel: (isTablet() ? "Back" : " "),
             view: viewAssembler.aboutView()
           };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}

function onSearchViewClick( event ) {
    var view = { title: "List",
             backLabel: (isTablet() ? "Back" : " "),
             view: viewAssembler.searchView(),
           };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}

function onNearbyViewClick( event ) {

    var view = { title: "Nearby",
             view: viewAssembler.findNearbyView()
           };
    window.viewNavigator.pushView( view );
    
    //acquire location
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true });
    event.stopPropagation();
    return false;
}

var onGeoSuccess = function(position) {
   /* console.log('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + new Date(position.timestamp)      + '\n');
     */
    var latitude = parseFloat( position.coords.latitude );
    var longitude = parseFloat( position.coords.longitude );
    
    //set a delay to allow transition to complete before requesting data
    setTimeout( function () {     
        var filtered = filterMarketsByGeo( latitude, longitude );
            
        var view = { title: "Nearby",
             backLabel: (isTablet() ? "Back" : " "),
             view: viewAssembler.findNearbyView()
           };
           
        view.view.children().remove();
        view.view.append( viewAssembler.nearbyMarketsView( latitude, longitude, filtered ) );
        window.viewNavigator.replaceView( view );
    }, 600 );
};

// onError Callback receives a PositionError object
//
function onGeoError(error) {
   /* alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
     */   
       
    //wait for transition complete
    setTimeout( function() {
        var view = { title: "Nearby",
                 backLabel: (isTablet() ? "Back" : " "),
                 view: viewAssembler.geoPermissionDenied()
               };
        window.viewNavigator.replaceView( view );
    }, 500);
}

//find the all markets within 100 miles
function filterMarketsByGeo( latitude, longitude ) {
    var result = [];
    var startTime = new Date().getTime();
    for ( var i =0; i < markets.length; i++ )
    {
        var lat1 = parseFloat(markets[i][9]);
        var lon1 = parseFloat(markets[i][8]);
        var lat2 = parseFloat(latitude);
        var lon2 = parseFloat(longitude);
        //console.log( lat1, lon1, lat2, lon2 );
        var d = distance( lat1, lon1, lat2, lon2 );
        if ( d < 100 ){
            result.push( markets[i] );
        }
        
    }
    //console.log( new Date().getTime() - startTime );
    return result;
}

function distance( lat1, lon1, lat2, lon2 ) {
    var R = 6371; // Radius of the earth in km
    var dLat = toRad(lat2-lat1);  // Javascript functions in radians
    var dLon = toRad(lon2-lon1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    var m = 6 / 1.609344; // Distance in miles
    return d;
}

function toRad(degree) 
{
    rad = degree* Math.PI/ 180;
    return rad;
}


function scriptSuccess(data, textStatus, jqXHR) {
	
	for ( var i=0; i<markets.length; i++ ) {
	    markets[i].push( i.toString() );
	}
	//console.log( "scriptSuccess: " + markets.length );
}


function onNearbyListItemClick( event ) {
    
    $( "li" ).removeClass( "listSelected" );
    var target = $( event.target )
    if (target.get(0).nodeName.toUpperCase() != "LI") {
        target=target.parent();
    }
    
    target.addClass( "listSelected" );
    var index = target.attr( "index" );
    index = parseInt( index );
    showMarketDetails( markets[index] );
}

function showMarketDetailsFromMapClick( index ) {
    
    setTimeout( function() {
        showMarketDetails( markets[index] );
    }, 50 );
}
    
function showMarketDetails( item ) { 
    var market = arrayToMarketObject(item);
    var view = { title: "Market Detail",
             backLabel: (isTablet() ? "Back" : " "),
             view: viewAssembler.marketDetailsView( market )
           };
    window.viewNavigator.pushView( view );
}

function onSearchButtonClick( event ) {
    var criteria = {};
    
    var fields = ["state", "searchPhrase", 
                  "credit", "wiccash", "sfmnp", "snap",
                  "bakedGoods", "cheese", "crafts",
                  "flowers", "seafood", "fruit", "herbs", "vegetables", "honey", "jams", "maple",
                  "meat", "nuts", "plants", "soap"];
    
    for ( var index in fields ) {
        var field = fields[ index ];
        var $input = $("#search_" + field);
        var value;
        
        if ( index <= 1 ){
            value = $input.val();
            
            if ( value != undefined && value.length > 0 ) {
                criteria[field] = value;
            }
        }
        else {
            value = $input.is(":checked");
            if ( value == true ) {
                criteria[field] = value;
            }
        }
    }
    
    var markets = filterMarketsBySearchCriteria( criteria );
    var view = { title: "Search Results",
             backLabel: (isTablet() ? "Back" : " "),
             view: viewAssembler.searchResultsView( markets, criteria )
           };
    window.viewNavigator.pushView( view );
}


function filterMarketsBySearchCriteria( criteria ) {
    var result = [];
    var startTime = new Date().getTime();
    for ( var i =0; i < markets.length; i++ )
    {
        if ( marketRowMatchesCriteria( markets[i], criteria ) ) {
            result.push(  markets[i] );
        }
    }
    //console.log( new Date().getTime() - startTime );
    return result;
}

function marketRowMatchesCriteria( row, criteria ) {
    
    //state
    if ( row[6] != criteria.state ) { return false; }
                  
    if ( criteria.credit == true )      {    if ( row[11] != "Y" ) return false;    };
    if ( criteria.wic == true )         {    if ( row[12] != "Y" ) return false;    };
    if ( criteria.wiccash == true )     {    if ( row[13] != "Y" ) return false;    };
    if ( criteria.sfmnp == true )       {    if ( row[14] != "Y" ) return false;    };
    if ( criteria.snap == true )        {    if ( row[15] != "Y" ) return false;    };
    
    
    if ( criteria.bakedGoods == true )  {    if ( row[16] != "Y" ) return false;    };
    if ( criteria.cheese == true )      {    if ( row[17] != "Y" ) return false;    };
    if ( criteria.crafts == true )      {    if ( row[18] != "Y" ) return false;    };
    if ( criteria.flowers == true )     {    if ( row[19] != "Y" ) return false;    };
    if ( criteria.seafood == true )     {    if ( row[20] != "Y" ) return false;    };
    if ( criteria.fruit == true )       {    if ( row[21] != "Y" ) return false;    };
    if ( criteria.herbs == true )       {    if ( row[22] != "Y" ) return false;    };
    if ( criteria.vegetables == true )  {    if ( row[23] != "Y" ) return false;    };
    if ( criteria.honey == true )       {    if ( row[24] != "Y" ) return false;    };
    if ( criteria.jams == true )        {    if ( row[25] != "Y" ) return false;    };
    if ( criteria.maple == true )       {    if ( row[26] != "Y" ) return false;    };
    if ( criteria.meat == true )        {    if ( row[27] != "Y" ) return false;    };
    if ( criteria.nuts == true )        {    if ( row[28] != "Y" ) return false;    };
    if ( criteria.plants == true )      {    if ( row[29] != "Y" ) return false;    };
    if ( criteria.soap == true )        {    if ( row[31] != "Y" ) return false;    };
    
    //searchString last
    if ( criteria.searchPhrase != undefined && criteria.searchPhrase.length > 0 ) {
        var tokens = criteria.searchPhrase.split(" ");
        var result = true;
        for ( var i=0; i<tokens.length; i++) {
            if (!result) {
                break;
            }
            var regexp = new RegExp(tokens[i], "i");
            var iterationResult = false;
            if ( regexp.test( row[1] ) ) { iterationResult = true; };
            if ( regexp.test( row[4] ) ) { iterationResult = true; };
            if ( regexp.test( row[5] ) ) { iterationResult = true; };
            if ( regexp.test( row[7] ) ) { iterationResult = true; };
            if ( regexp.test( row[10] ) ) { iterationResult = true; };
            result = iterationResult && result;
        }
        return result;
    }
    
    return true;
}

function criteriaToString( criteria ) { 
    var result = criteria.state;
    
    if (criteria.searchPhrase) {
        result += ", '" + criteria.searchPhrase + "'";
    }
     
    return result;
}

function arrayToMarketObject( arr ) {
    var fields=["fmid","marketName","website","street","city","county","state","zip","x","y","location","credit","wic","wiccash","sfmnp","snap","bakedgoods","cheese","crafts","flowers","seafood","fruit","herbs","vegetables","honey","jams","maple","meat","nuts","plants","prepared","soap","index"];
    var result = {};
    for ( var index in arr ) {
        if ( index <= 10 || index >= 32 ) {
            result[ fields[index] ] = arr[ index ];
        }
        else {
            result[ fields[index] ] = (arr[ index ] == "Y");
        }
    }
    
    result.paymentDetail = result.credit || result.wic || result.wicash || result.sfmnp || result.snap;
    result.productDetail = result.bakedgoods || result.cheese || result.crafts || result.flowers || result.seafood || result.fruit || result.herbs || result.vegetables || result.honey || result.jams || result.maple || result.meat || result.nuts || result.plants || result.prepared || result.soap;
    
    return result;
}

function openExternalURL( url ) {

    var result=confirm("You will leave the Farmers Market Finder App.  Continue?");
    if (result==true) {
        window.open( url, '_blank' );
    }
}

function viewInMap( index ) {
    var market = arrayToMarketObject( markets[index] );
    
     var view = { title: market.marketName,
             backLabel: (isTablet() ? "Back" : " "),
             view: viewAssembler.marketMapView( market ),
             scroll:false
           };
    window.viewNavigator.pushView( view );
}

function getDirections( index ) {
    var market = arrayToMarketObject( markets[index] );

    var result=confirm("You will leave the Farmers Market Finder App.  Continue?");
    if (result==true) {
        
        var win = navigator.userAgent.search( "Windows Phone" ) >= 0;
        var android = navigator.userAgent.search( "Android" ) >= 0;
        
        /*if (win) {
            window.open( ('maps:' + market.y + ',' + market.x), '_blank' );
        } 
        else 
        */
        if (android) {
            navigator.app.loadUrl( 'http://maps.google.com/maps?q=' + market.y + ',' + market.x);
        }
        else {
            window.open( ('http://maps.google.com/maps?q=' + market.y + ',' + market.x), '_blank' );
        }
    }
}


			
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
   document.addEventListener("backbutton", onBackKey, false);
}

function onBackKey( event ) {
    if ( window.viewNavigator.history.length > 1 ){
        event.preventDefault();
        window.viewNavigator.popView();
        return false;
    }
    navigator.app.exitApp();
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


var templates = {
    aboutViewTemplate:"views/aboutViewTemplate.html",
    defaultViewTemplate:"views/defaultViewTemplate.html",
    findMarketsNearMeViewTemplate:"views/findMarketsNearMeViewTemplate.html",
    geoPermissionDeniedViewTemplate:"views/geoPermissionDeniedViewTemplate.html",
    mapViewTemplate:"views/mapViewTemplate.html",
    marketDetailsViewTemplate:"views/marketDetailsViewTemplate.html",
    marketMapViewTemplate:"views/marketMapViewTemplate.html",
    marketsNearMeViewTemplate:"views/marketsNearMeViewTemplate.html",
    searchResultsViewTemplate:"views/searchResultsViewTemplate.html",
    searchViewTemplate:"views/searchViewTemplate.html",
    loaded: 0,
    requested: 0
};

var ___templatesLoadedCallback;

function loadTemplates(callback) {
    ___templatesLoadedCallback = callback;
    
    //load Mousetache HTML templates
    for (var key in templates) {
        (function() {
             var _key = key.toString();
             if ( _key != "loaded" && _key != "requested" ){
                 templates.requested ++;
                 
                 var templateLoaded = function( template ){
                    onTemplateLoaded( template, _key );
                 }
                 
                 $.get( templates[ _key ], templateLoaded, "html" );
             }
         })();
    }
}


function onTemplateLoaded(template, key) {
    
    //alert( key + ": " + template);
    templates[ key ] = template;
    templates.loaded ++;
    
    if ( templates.loaded == templates.requested ) {
        ___templatesLoadedCallback();
    }
}



function isTablet() {
    var _w = $(window).width();
    var _h = $(window).height();
    return (Math.min(_w,_h) >= 600);
}

function ViewAssembler() {
    this.touchSupported = 'ontouchstart' in window;
    //this.CLICK_EVENT = this.touchSupported ? 'touchend' : 'click';
    this.CLICK_EVENT = 'click';
    return this;
}

ViewAssembler.prototype.defaultView = function() {
    var el = $( templates.defaultViewTemplate );
    el.find("#nearMe").on( this.CLICK_EVENT, onNearbyViewClick );
    el.find("#search").on( this.CLICK_EVENT, onSearchViewClick );
    el.find("#about").on( this.CLICK_EVENT, onAboutViewClick );
    return el;
}

ViewAssembler.prototype.aboutView = function() {
    var el = $( templates.aboutViewTemplate );
    return el;
}

ViewAssembler.prototype.findNearbyView = function() {
    var el = $( templates.findMarketsNearMeViewTemplate );
    return el;
}

ViewAssembler.prototype.nearbyMarketsView = function( latitude, longitude, marketsArr ) {
    var result = [];
    for ( var i=0; i< marketsArr.length; i++ ) {
        var market = arrayToMarketObject( marketsArr[i] );
        
        var lat1 = parseFloat(market.y);
        var lon1 = parseFloat(market.x);
        var lat2 = parseFloat(latitude);
        var lon2 = parseFloat(longitude);
        
        market.distance = Math.round( distance( lat1, lon1, lat2, lon2 ) );
        result.push( market );
    }
    
    result.sort( function(a, b){
        if ( a.distance < b.distance ) { return -1; }
        else if (a.distance > b.distance ) { return 1; }
        else return 0;
    });
    
    window.filteredMarkesList = result;    
    
    var viewModel = {   latitude: latitude,
                        longitude: longitude,
                        mapWidth: $(window).width(),
                        mapHeight: 100,
                        markets: result
                    };
    var template = templates.marketsNearMeViewTemplate;
                  
    var el = $( Mustache.to_html(template, viewModel) );
    el.find( "li" ).on( this.CLICK_EVENT, onNearbyListItemClick );
    el.find( "#mapButton" ).on( this.CLICK_EVENT, onMapButtonClick );
    return el;
}

ViewAssembler.prototype.marketDetailsView = function( market ) {
    var template = templates.marketDetailsViewTemplate;
    return $( Mustache.to_html(template, market) );
}

ViewAssembler.prototype.searchView = function () {
    var el = $( templates.searchViewTemplate );
    var $state = el.find( "#search_state" );
    
    var states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virgin Islands","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
    for ( var i in states ) {
        $state.append($("<option></option>").text(states[i])); 
    }
    
    el.find( "#searchButton" ).on( this.CLICK_EVENT, onSearchButtonClick );
    return el;
}

ViewAssembler.prototype.searchResultsView = function( marketsArr, criteria ) {
    var viewModel = {markets:[]};
    for ( var i=0; i< marketsArr.length; i++ ) {
        var market = arrayToMarketObject( marketsArr[i] );
        viewModel.markets.push( market );
    }
    
    viewModel.markets.sort( function(a, b){
        if ( a.marketName < b.marketName ) { return -1; }
        else if (a.marketName > b.marketName ) { return 1; }
        else return 0;
    });
    
    viewModel.overLength = viewModel.markets.length > 50;
    viewModel.markets = viewModel.markets.slice( 0, Math.min(49, viewModel.markets.length-1));
    
    viewModel.criteria = criteriaToString(criteria);
    window.filteredMarkesList = viewModel.markets;  
    
    var template = templates.searchResultsViewTemplate;
                  
    var el = $( Mustache.to_html(template, viewModel) );
    el.find( "li" ).on( this.CLICK_EVENT, onNearbyListItemClick );
    el.find( "#mapButton" ).on( this.CLICK_EVENT, onSearchResultMapButtonClick );
    
    
    
    return el;
}

ViewAssembler.prototype.geoPermissionDenied = function() {
    var el = $( templates.geoPermissionDeniedViewTemplate );
    return el;
}

ViewAssembler.prototype.mapView = function(centerLatLng) {
    var el = $( templates.mapViewTemplate );
    setTimeout( function(){
    var map = new L.Map('map');

    //cloudmadeUrl = 'http://{s}.tile.cloudmade.com/YOUR-API-KEY/997/256/{z}/{x}/{y}.png',
    var cloudmadeUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap',
        cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttribution});
    
    map.addLayer(cloudmade);
    

    var blueMarkerIcon = L.Icon.extend({
        iconUrl: 'assets/map/marker-lightblue.png',
        shadowUrl: 'assets/map/shadow.png',
        iconSize: new L.Point(26, 40),
        shadowSize: new L.Point(32, 39),
        iconAnchor: new L.Point(14, 39),
        popupAnchor: new L.Point(0, -35)
    });
    var yellowMarkerIcon = L.Icon.extend({
        iconUrl: 'assets/map/marker-yellow.png',
        shadowUrl: 'assets/map/shadow.png',
        iconSize: new L.Point(26, 40),
        shadowSize: new L.Point(32, 39),
        iconAnchor: new L.Point(14, 40),
        popupAnchor: new L.Point(13, 12)
    });
    
    var blueIcon = new blueMarkerIcon();
    var yellowIcon = new yellowMarkerIcon();
    
    var markersLayer = new L.LayerGroup();
    var southWestBounds, northEastBounds, bounds;
    if ( window.filteredMarkesList ) {
    
        for ( var x=0; x<window.filteredMarkesList.length; x++ ) {
            var market = window.filteredMarkesList[x];
            
            if ( market.x != "" && market.y != "" ) {
            
                var latLng = new L.LatLng(market.y, market.x);
                var marker = new L.Marker(latLng, {icon: yellowIcon});
    
                var popupContent = "<a class='button' href='javascript:showMarketDetailsFromMapClick(" + market.index + ");'>" + market.marketName + "</a>"; 
                
                var popup = marker.bindPopup( popupContent, {offset:new L.Point(0,-35)} );
                markersLayer.addLayer(marker);
                
                if ( !southWestBounds ) {
                    southWestBounds = { lat:market.y, lon:market.x};
                    northEastBounds = { lat:market.y, lon:market.x};
                }
                else {
                    southWestBounds.lat = Math.min( southWestBounds.lat, market.y );
                    southWestBounds.lon = Math.min( southWestBounds.lon, market.x );
                    northEastBounds.lat = Math.max( northEastBounds.lat, market.y );
                    northEastBounds.lon = Math.max( northEastBounds.lon, market.x );
                }
			}
        }
			
        if ( southWestBounds ) {
            //console.log(southWestBounds, northEastBounds);
            var southWest = new L.LatLng(southWestBounds.lat,southWestBounds.lon),
                northEast = new L.LatLng(northEastBounds.lat,northEastBounds.lon),
                bounds = new L.LatLngBounds(southWest, northEast);
        }
        map.addLayer(markersLayer);
    }
    
    var onLocationFound = function (e) {
    		var radius = e.accuracy / 2;

			var marker = new L.Marker(e.latlng, {icon: blueIcon});
			markersLayer.addLayer(marker);
			marker.bindPopup("You are within " + radius + " meters from this point");

			var circle = new L.Circle(e.latlng, radius);
			markersLayer.addLayer(circle);
		}
		
		var onLocationError = function (e) {
			alert(e.message);
		}
    
		map.on('locationfound', onLocationFound);
		map.on('locationerror', onLocationError);
    

        if ( centerLatLng == undefined ){
            
            if ( bounds ) {
                map.fitBounds(bounds);
                map.locate();
            }
            else {
                map.locateAndSetView(7);
            }
        }
        else {
            if ( bounds ) {
                map.fitBounds(bounds);
                map.locate();
            }
            else {
                map.setView( centerLatLng, (isTablet() ? 7 : 6) ); 
            }
        }
        
        var currentViewDescriptor = window.viewNavigator.history[ window.viewNavigator.history.length-1 ];
        currentViewDescriptor.showCallback = function() {
         
            //this is to work around a weird issue in Leaflet maps in iOS, where 
            //dragging stops working after a new view has been pushed onto the stack
                
            var latLng = map.getCenter();
            var zoom = map.getZoom();
            map.removeLayer( cloudmade );
            map.removeLayer( markersLayer );
            
            $('#mapContainer').children().remove();
            $('#mapContainer').append( $("<div id='map' style='width:100%; height:100%'></div>") );
            map = new L.Map('map');
            
            map.addLayer( cloudmade );
            map.addLayer( markersLayer );
            map.setView( latLng, zoom, true );
            
        }
    
    }, 150 );
    
    
    return el;
}

ViewAssembler.prototype.marketMapView = function(market) {
    var template = templates.marketMapViewTemplate;
    var el = $( Mustache.to_html(template, market) );
    setTimeout( function(){
    var map = new L.Map('map');

    //cloudmadeUrl = 'http://{s}.tile.cloudmade.com/YOUR-API-KEY/997/256/{z}/{x}/{y}.png',
    var cloudmadeUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap',
        cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttribution});
    
    map.addLayer(cloudmade);
    

    var blueMarkerIcon = L.Icon.extend({
        iconUrl: 'assets/map/marker-lightblue.png',
        shadowUrl: 'assets/map/shadow.png',
        iconSize: new L.Point(26, 40),
        shadowSize: new L.Point(32, 39),
        iconAnchor: new L.Point(14, 39),
        popupAnchor: new L.Point(0, -35)
    });
    var yellowMarkerIcon = L.Icon.extend({
        iconUrl: 'assets/map/marker-yellow.png',
        shadowUrl: 'assets/map/shadow.png',
        iconSize: new L.Point(26, 40),
        shadowSize: new L.Point(32, 39),
        iconAnchor: new L.Point(14, 40),
        popupAnchor: new L.Point(13, 12)
    });
    
    var blueIcon = new blueMarkerIcon();
    var yellowIcon = new yellowMarkerIcon();
    
    var markersLayer = new L.LayerGroup();;
    if ( market ) {    
        var latLng = new L.LatLng(market.y, market.x);
        var marker = new L.Marker(latLng, {icon: yellowIcon});

        var popupContent = "<a class='button' href='javascript:showMarketDetailsFromMapClick(" + market.index + ");'>" + market.marketName + "</a>"; 
        
        marker.bindPopup( popupContent, {offset:new L.Point(0,-35)} );
       
        markersLayer.addLayer(marker);
        map.addLayer(markersLayer);
    }
    
    var onLocationFound = function (e) {
    		var radius = e.accuracy / 2;

			var marker = new L.Marker(e.latlng, {icon: blueIcon});
			markersLayer.addLayer(marker);
			marker.bindPopup("You are within " + radius + " meters from this point");

			var circle = new L.Circle(e.latlng, radius);
			markersLayer.addLayer(circle);
		}
		
		var onLocationError = function (e) {
			alert(e.message);
		}
    
		map.on('locationfound', onLocationFound);
		map.on('locationerror', onLocationError);

        map.locate();
        map.setView( new L.LatLng( market.y, market.x ), 14 ); 
    
    }, 150 );
    
    return el;
}


/*
THIS SOFTWARE IS PROVIDED BY ANDREW M. TRICE ''AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL ANDREW M. TRICE OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


var ViewNavigator = function( target, backLinkCSS, bindToWindow ) {

	this.supportsBackKey = true; //phonegap on android only
	this.animating = false;
	this.animationX = 150;
	this.animationDuration = 400;
	this.history = [];
	this.scroller = null;
	this.headerPadding = 5;
	
	this.uniqueId = this.guid();
	
	var regexp = new RegExp("Windows Phone OS 7");	
	this.winPhone = (navigator.userAgent.search(regexp) >= 0);
	
	this.rootElement = $('<div class="viewNavigator_root"></div>');
	this.header = $('<div class="viewNavigator_header"></div>');
	this.content = $('<div class="viewNavigator_content" id="contentRoot"></div>');
	this.rootElement.append( this.header );
	this.rootElement.append( this.content );
	
	this.parent = $( target );
	
	this.backLinkCSS = backLinkCSS ? backLinkCSS : "viewNavigator_backButton";
	
	var self = this;
	//$(window).resize( function(event){ self.resizeContent() } );
	//alert( this.parent.toString() );
	//this.parent.resize( function(event){ self.resizeContent() } );
	
	if ( bindToWindow != false ) {
		$(window).resize( function(event){ self.resizeContent() } );
	}
	else {
		this.parent.resize( function(event){ self.resizeContent() } );
	}
	
	this.parent.append( this.rootElement );
	
	if ( window.viewNavigators == null || window.viewNavigators == undefined ) {
		window.viewNavigators = {};
	}
	window.viewNavigators[ this.uniqueId ] = this; 

}

ViewNavigator.prototype.replaceView = function( viewDescriptor ) {
	if (this.animating)
		return;
	viewDescriptor.animation = "pushEffect"
	
	//this is a hack to mimic behavior of pushView, then pop off the "current" from the history
	this.history.push( viewDescriptor );
	this.updateView( viewDescriptor );
	this.history.pop();
	this.history.pop();
	this.history.push( viewDescriptor );
}

ViewNavigator.prototype.pushView = function( viewDescriptor ) {
	if (this.animating)
		return;
	viewDescriptor.animation = "pushEffect"
	this.history.push( viewDescriptor );
	this.updateView( viewDescriptor );
}

ViewNavigator.prototype.popView = function() {

	if (this.animating || this.history.length <= 1 )
		return;
	
	var currentViewDescriptor = this.history[ this.history.length-1];
	if ( currentViewDescriptor.backCallback ) {
		currentViewDescriptor.backCallback();
	}
		
	this.history.pop();	
	var viewDescriptor = this.history[ this.history.length-1 ];
	viewDescriptor.animation = "popEffect"
	this.updateView( viewDescriptor );
}

ViewNavigator.prototype.setHeaderPadding = function( amount ) {
	this.headerPadding = amount;
	if ( this.headerBacklink ) {
		this.headerBacklink.css("left", amount);
	}
}

ViewNavigator.prototype.updateView = function( viewDescriptor ) {
	
	this.animating = true;
	
    
	
	
	this.contentPendingRemove = this.contentViewHolder;
	this.headerContentPendingRemove = this.headerContent;
	
	this.headerContent = $('<div class="viewNavigator_headerContent"></div>');
	
	this.headerTitle = $("<div class='viewNavigator_header_title'>" + viewDescriptor.title + "</div>");
	this.headerContent.append( this.headerTitle );
	
	var linkGuid = this.guid();
	if ( viewDescriptor.backLabel ) {
		this.headerBacklink = $('<li class="viewNavigator_header_backlink viewNavigator_backButtonPosition ' + this.backLinkCSS +'" id="link' + linkGuid + '" onclick="window.viewNavigators[\'' + this.uniqueId + '\'].popView()">'+ viewDescriptor.backLabel + '</li>');
		this.headerContent.append( this.headerBacklink );
		
		//this is for proper handling in splitviewnavigator
		this.setHeaderPadding( this.headerPadding );
	}
	
	var id = this.guid();
	this.contentViewHolder = $('<div class="viewNavigator_contentHolder" id="' + id + '"></div>');
	this.contentViewHolder.append( viewDescriptor.view );
	this.resizeContent();
	
	if ( this.contentPendingRemove ){ 
        this.contentPendingRemove.stop()
	}
	if ( this.headerContentPendingRemove ) {
        this.headerContentPendingRemove.stop()
	}
	this.headerContent.stop()
	this.contentViewHolder.stop()
	
	
	
	if ( this.scroller != null ) {
	    var scrollY = this.scroller.y;
        this.scroller.destroy();
        this.scroller = null;
        
        if (this.contentPendingRemove) {
            //console.log( scrollY );
            
            //use this to mantain scroll position when scroller is destroyed
            var children = $( this.contentPendingRemove.children()[0] );
            children.attr( "scrollY", scrollY );
            var originalTopMargin = children.css( "margin-top" );
            children.attr( "originalTopMargin", originalTopMargin );
            
            var cssString = "translate3d(0px, "+(parseInt( scrollY ) + parseInt( originalTopMargin )).toString()+"px, 0px)";
            children.css( "-webkit-transform", cssString );
            
           // children.css( "margin-top", (parseInt( scrollY ) + parseInt( originalTopMargin )).toString() + "px" );
        } 
    }
	
	$(this.contentPendingRemove).click(function(){ return false; });
	
    
	if ( viewDescriptor.animation == "popEffect" ) {
		
		this.contentViewHolder.css( "left", -this.contentViewHolder.width() );
		this.contentViewHolder.css( "opacity", 1 );
    	this.content.prepend( this.contentViewHolder );
    	
		this.headerContent.css( "left", -this.animationX );
		this.headerContent.css( "opacity", 0 );
		this.header.append( this.headerContent );
    	
    	var func = this.animationCompleteHandler(this.contentPendingRemove, this.headerContentPendingRemove, this.headerContent, this.contentViewHolder );
    	
 	   	this.contentPendingRemove.animate({
   	 			left:this.contentViewHolder.width(),
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration*0.8);
    		
    	//remove this to change back
 	   	this.contentViewHolder.animate({
   	 			left:0,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration/2);
    		
    	this.headerContentPendingRemove.animate({
   	 			left:this.animationX,
    			opacity:0,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration, func );
    		
    	this.headerContent.animate({
   	 			left:0,
    			opacity:1,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration/2 );
    		
    	
    	//using a timeout to get around inconsistent response times for webkittransitionend event
        //var func = this.animationCompleteHandler(this.contentPendingRemove, this.headerContentPendingRemove, this.headerContent, this.contentViewHolder );
    	//setTimeout( func, this.animationDuration+90 );
	}
	else if ( this.history.length > 1 ) {
	
		this.contentViewHolder.css( "left", this.contentViewHolder.width() );
		this.contentViewHolder.css( "opacity", 1 );
		
    	this.content.append( this.contentViewHolder );
    	
		this.headerContent.css( "left", this.animationX );
		this.headerContent.css( "opacity", 0 );
		this.header.append( this.headerContent );

        var func = this.animationCompleteHandler(this.contentPendingRemove, this.headerContentPendingRemove, this.headerContent, this.contentViewHolder );

 	   	this.contentViewHolder.animate({
   	 			left:0,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration*0.75);
    	
 	   	this.contentPendingRemove.animate({
   	 			left:-this.contentViewHolder.width()/2,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration, func);
    		
    	this.headerContent.animate({
   	 			left:0,
    			opacity:1,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration*0.75);
    		
    	this.headerContentPendingRemove.animate({
   	 			left:-this.animationX,
    			opacity:0,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration );
    		
    	//using a timeout to get around inconsistent response times for webkittransitionend event
    	//var func = this.animationCompleteHandler(this.contentPendingRemove, this.headerContentPendingRemove, this.headerContent, this.contentViewHolder );
    	//setTimeout( func, this.animationDuration+90 );
	}
	else {
		this.contentViewHolder.css( "left", 0 );
		this.contentViewHolder.css( "opacity", 1 );
    	this.content.append( this.contentViewHolder );

		this.headerContent.css( "left", 0 );
		this.headerContent.css( "opacity", 1 );
		this.header.append( this.headerContent );
		this.animating = false;
		this.resetScroller();
	}
	
    if ( viewDescriptor.backLabel ) {
    	new NoClickDelay( this.headerBacklink.get()[0] );
	}
	
	if ( viewDescriptor.showCallback ) {
	    viewDescriptor.showCallback();
	}
}


ViewNavigator.prototype.resetScroller = function() {
    
    var id = this.contentViewHolder.attr( "id" );
    var currentViewDescriptor = this.history[ this.history.length-1];
    
	if ( !this.winPhone ) {
		if ( this.scroller != null ) {
			this.scroller.destroy();
			this.scroller = null;
		}
		if ( id && !(currentViewDescriptor && currentViewDescriptor.scroll === false)) {
			var self = this;
			setTimeout( function() { 
			    
                //use this to mantain scroll position when scroller is destroyed
                var targetDiv = $( $("#"+id ).children()[0] );
                var scrollY= targetDiv.attr( "scrollY" );
                var originalTopMargin = targetDiv.attr( "originalTopMargin" );
                if ( scrollY != undefined && scrollY != "" ){
                  //  console.log( "resetScroller scrollY: " + scrollY)
                  //  targetDiv.css( "margin-top", originalTopMargin );
                    var cssString = "translate3d(0px, "+(originalTopMargin).toString()+"px, 0px)";
                    targetDiv.css( "-webkit-transform", cssString );
                }
			    self.scroller = new iScroll( id ); 
			    if ( scrollY != undefined && scrollY != "" ) {
			        self.scroller.scrollTo( 0, parseInt( scrollY ) );
			    }
			}, 10 );
			//this.scroller = new iScroll( id );
		}
    }
}


ViewNavigator.prototype.refreshScroller = function() {
    
	if ( !this.winPhone ) {
		if ( this.scroller != null ) {
			this.scroller.refresh();
		}
    }
}

ViewNavigator.prototype.animationCompleteHandler = function(removalTarget, headerRemovalTarget, headerView, contentView) {
	var self = this;
	return function() {
		self.animating = false;
        self.resetScroller();
		if ( removalTarget ) {
			removalTarget.unbind( "click" );
			removalTarget.detach();
		}
		if ( headerRemovalTarget ) {
			headerRemovalTarget.unbind( "click" );
			headerRemovalTarget.detach(); 
		}
	}
}

ViewNavigator.prototype.resizeContent = function(event) {

	var targetWidth = this.parent.width();
	if ( this.headerContent )
		this.headerContent.width( targetWidth );
	if ( this.contentViewHolder )
		this.contentViewHolder.width( targetWidth );
}


//GUID logic from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript

ViewNavigator.prototype.S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
ViewNavigator.prototype.guid = function() {
	return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0,3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
}



/*  PHONEGAP INTEGRATION */
/*
//android+phonegap specific back button support - will only work if phonegap is used on android (www.phonegap.com)
if ( typeof PhoneGap != 'undefined' ) { 
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
   document.addEventListener("backbutton", onBackKey, false);
}

function onBackKey( event ) {
	event.preventDefault();
	window.viewNavigator.popView();
	for ( var x=0; x<window.backKeyViewNavigators.length; x++ ) {
		window.backKeyViewNavigators[x].popView();
	}
}
*/


/*
THIS SOFTWARE IS PROVIDED BY ANDREW M. TRICE ''AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL ANDREW M. TRICE OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


var SplitViewNavigator = function( target, toggleButtonLabel, backLinkCSS, bindToWindow ) {
	
	this.animating = false;
	this.animationDuration = 350;
	this.animationPerformed = false;
	
	this.uniqueId = this.guid();
	this.parent = $( target );
	
	var regexp = new RegExp("Windows Phone OS 7");	
	this.winPhone = (navigator.userAgent.search(regexp) >= 0);
	
	this.rootElement = $('<div class="splitViewNavigator_root"></div>');
	this.sidebarContainer = $('<div class="splitViewNavigator_sidebar"></div>');
	this.contentOverlay = $('<div class="content_overlay_hidden" id="overlay'+this.uniqueId+'"></div>');
	this.bodyContainer = $('<div class="splitViewNavigator_body"></div>');
	
	this.sidebarViewNavigator = new ViewNavigator( this.sidebarContainer.get()[0], backLinkCSS, false );	
	
	this.bodyViewNavigator = new ViewNavigator( this.bodyContainer.get()[0], backLinkCSS, false );
	
	this.backLinkCSS = backLinkCSS ? backLinkCSS : "viewNavigator_backButton";
	
	this.toggleSidebarButton = $('<li class="viewNavigator_backButton viewNavigator_backButtonPosition ' + backLinkCSS + '" id="toggle' + this.uniqueId + '" onclick="window.splitViewNavigator.showSidebar()">'+toggleButtonLabel+'</li>');
	
	this.rootElement.append( this.bodyContainer );
	this.rootElement.append( this.contentOverlay );
	
	this.rootElement.append( this.sidebarContainer );
	
	var self = this;
	
	/*if ( "onorientationchange" in window ) {
		$(window).bind( "orientationchange", function(event){ self.resizeContent() } )
	}
	else {*/
		//$(window).resize( function(event){ self.resizeContent() } );
		//alert( this.parent.attr( "id" ) );
		this.parent.resize( function(event){ self.resizeContent() } );
	//}
	
	if ( bindToWindow != false ) {
		$(window).resize( function(event){ self.resizeContent() } );
	}
	else {
		this.parent.resize( function(event){ self.resizeContent() } );
	}
	
	this.resizeContent();
	
	this.parent.append( this.rootElement );
	
	this.contentOverlay.click( function(event){ self.hideSidebar() } );
	
	new NoClickDelay( this.contentOverlay.get()[0] );
	new NoClickDelay( this.toggleSidebarButton.get()[0] );
	window.splitViewNavigator = this;
}


SplitViewNavigator.prototype.resizeContent = function() {

	this.applyStylesByOrientation();
	this.sidebarViewNavigator.resizeContent();	
	this.bodyViewNavigator.resizeContent()
}

SplitViewNavigator.prototype.applyStylesByOrientation = function() {
	var $window = $(window)
    var w = $window.width();
    var h = $window.height();
   
    
    var orientation = (w >= h) ? "landscape" : "portrait";
    this.contentOverlay.removeClass( "content_overlay_visible" ).addClass( "content_overlay_hidden" );
    
    //landscape
    if ( orientation == "landscape" && this.orientation != orientation ) {
    	this.sidebarContainer.removeClass( "sidebar_portrait" ).addClass( "sidebar_landscape" );
    	this.bodyViewNavigator.setHeaderPadding( 0 );
    	this.toggleSidebarButton.remove();
    	if ( this.animationPerformed ) {
    		this.sidebarContainer.css( "left", 0 );
    	}
    	this.bodyContainer.removeClass( "body_portrait" ).addClass( "body_landscape" );
    }
    
    //portrait
    else if ( this.orientation != orientation ) {
    	this.sidebarContainer.removeClass( "sidebar_landscape" ).addClass( "sidebar_portrait" );
    	this.bodyViewNavigator.setHeaderPadding( "70px" );
		this.bodyContainer.append( this.toggleSidebarButton );
    	if ( this.animationPerformed ) {
    		this.sidebarContainer.css( "left", -this.sidebarContainer.width() );
    	}
    	this.bodyContainer.removeClass( "body_landscape" ).addClass( "body_portrait" );
    }
    
    this.orientation = orientation;
}

SplitViewNavigator.prototype.showSidebar = function() {
	this.animationPerformed = true;
	if ( this.orientation == "portrait" ) {
    	this.contentOverlay.removeClass( "content_overlay_hidden" ).addClass( "content_overlay_visible" );
		this.animating = true;
		this.sidebarContainer.animate({
			left:0,
			avoidTransforms:false,
			useTranslate3d: true
		}, this.animationDuration, this.animationCompleteHandler());
    		
	}
}

SplitViewNavigator.prototype.hideSidebar = function() {
	if ( this.orientation == "portrait" ) {
    	this.contentOverlay.removeClass( "content_overlay_visible" ).addClass( "content_overlay_hidden" );
		this.animating = true;
		this.sidebarContainer.animate({
			left:-this.sidebarContainer.width(),
			avoidTransforms:false,
			useTranslate3d: true
		}, this.animationDuration, this.animationCompleteHandler());
    		
	}
}

SplitViewNavigator.prototype.animationCompleteHandler = function() {
	var self = this;
	return function() {
		self.animating = false;
        //self.resetScroller();
	}
}

SplitViewNavigator.prototype.pushSidebarView = function( viewDescriptor ) {
	this.sidebarViewNavigator.pushView( viewDescriptor );
}

SplitViewNavigator.prototype.popSidebarView = function() {
	this.sidebarViewNavigator.popView();
}

SplitViewNavigator.prototype.replaceSidebarView = function( viewDescriptor ) {
	this.sidebarViewNavigator.replaceView( viewDescriptor );
}

SplitViewNavigator.prototype.pushBodyView = function( viewDescriptor ) {
	this.bodyViewNavigator.pushView( viewDescriptor );
}

SplitViewNavigator.prototype.popBodyView = function() {
	this.bodyViewNavigator.popView();
}

SplitViewNavigator.prototype.replaceBodyView = function( viewDescriptor ) {
	this.bodyViewNavigator.replaceView( viewDescriptor );
}




//GUID logic from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript

SplitViewNavigator.prototype.S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
SplitViewNavigator.prototype.guid = function() {
	return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0,3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
}












/*
 Per correggere le coordinate andare su www.openstreetmap.org ed inserire nella console:
 map.on('click', function(e) {alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)});
 
 
 http://www.istockphoto.com/stock-illustration-19142703-food-truck-burst-flier.php?st=0ad26a5
 http://www.istockphoto.com/stock-illustration-19112839-food-truck-background.php?st=c3ad3ce
 http://www.istockphoto.com/stock-illustration-23712516-red-food-truck.php?st=c3ad3ce
 http://www.istockphoto.com/stock-illustration-15723552-food-truck.php?st=e1b53db
  
 http://it.fotolia.com/id/31866049
*/


// I campi sono: Nome, Indirizzo, Città, x, y, note, url, phonenumber, zip, nazione

var sellers =  [
["Polent One Città alta","Piazza Mercato delle Scarpe 1","Bergamo","9.66505587100","45.70300243657","Polenteria take-away","http://www.facebook.com/pages/PolentOne-Citta-Alta/205272709565338","","",""],
["Polent One Borgo S. Caterina","Via Borgo S. Caterina 86","Bergamo","9.684373","45.705647","Polenteria take-away","http://www.polent-one.com/","","",""],
["Nessi Città alta","Via Gombito 34","Bergamo","9.665147066611","45.70325344416","Pizze, Focacce e dolci","","","",""],
["Gelateria del Tasso","Piazza Vecchia 1","Bergamo","9.663","45.703904","Gelateria e pasticceria","","","",""],
["Nessi","Largo Porta Nuova, 5","Bergamo","9.670329","45.693892","Pizze, focacce e dolci","http://www.nessiportanuova.it/","","",""],
["McDonald's","Piazza Guglielmo Marconi 1","Bergamo","9.674457","45.691274","Fast-food","http://www.mcdonalds.it/","","",""],
["Pane in galleria","Via Tasso 1","Seriate","9.7169244289","45.6842898325","Panificio","","","",""],
["Vintage Cafè","Via Italia 71","Seriate","9.71847474575","45.68479576217","Bar e panini","","","",""],
["Il fornaio","Via Italia 55","Seriate","9.7187644243","45.6848032573","Panificio e pasticceria","","","",""],
["Artigianpiada","Via Italia 16","Seriate","9.71991240","45.6848894523","Piadineria","","","",""],
["Il Gusto di Marrakech","Via Italia 4","Seriate","9.7204327","45.68504685","Kebab","","","",""],
["Panificio al ponte","Piazza Giovanni XXIII 4","Seriate","9.721333980","45.68544784","Panificio","","","",""],
["Da Amalia","Piazza Bolognini 10","Seriate","9.722084999","45.684439738","Panuozzi","","","",""],
["Birman Turkish Kebab","Via dei Tasca 4","Seriate","9.72212255001","45.6848482286","Kebab","","","",""],
["Bar Melody (Le Torri)","Via Monsignore Carozzi 15","Seriate","9.72256243","45.686358493","Panini, toast, piadine","","","",""],
["Paradiso del gelato","Via Nazionale 14","Seriate","9.72723484","45.685013123","Gelateria","","","",""],
["Gelato Matto","Corso Roma 55","Seriate","9.71506297","45.6804371216","Gelateria","","","",""],
["Magik Pizza","Via Cesare Battisti 37","Seriate","9.720432758","45.681434054","Pizzeria d'asporto, piadine, hamburgher e hot dog","","","",""],
["La Mimosa","Via Italia 89","Seriate","9.716345071","45.6852154929","Gelateria","","","",""],
["Amar kebab","Via Nazionale 6","Seriate","9.72703099","45.68502811","Kebab & fast food","","","",""],
["Universal","Via Bono 20a","Bergamo","9.68378841876","45.6958089","Pizzeria, kebab & piadina. Cucina italiana e curda","","","",""],
["Piadineria Ladybird","Via Borgo Palazzo 100g","Bergamo","9.68750059","45.6950258025","Piadineria","","","",""],
["Pasticceria Bon Bon","Via San Giovanni Bosco 33c","Bergamo","9.675629138946","45.684203636623","Pasticceria, pizza al trancio e focacce","","","",""],
["Angolo del Goloso","Via Furietti 9a","Bergamo","9.674250483512878","45.684454728602574","Gelateria e caffeteria","","","",""],
["Da Peppino","Via San Giovanni Bosco 25a","Bergamo","9.674314856529236","45.685556521874744","Pizzeria d'asporto con specialità napoletane","","","",""],
["Snackiamo","Via Bonomelli 3b","Bergamo","9.671659469604492","45.68952879364676","Selfservice: drink e sandwich","","","",""],
["Zuccheroesale","Via Bonomelli 13a","Bergamo","9.671804308891296","45.68966744332117","Take away dolce e salato, 24 ore su 24","","","",""],
["La spiga","Via Bonomelli 10","Bergamo","9.67222809791565","45.689858554471144","Pizze e panini","","","",""],
["Amici pizza kebab","Via Giorgio Paglia 33a","Bergamo","9.672576785087585","45.690045917709746","Kebab piadine e hamburger","","","",""],
["King Instanbul","Via Giorgio Paglia 44","Bergamo","9.67272162437439","45.69015458810057","Pizza e kebab","","","",""],
["Escondido bar","Viale Papa Giovanni XXIII 130","Bergamo","9.673869609832764","45.69124502757451","Bar: panini, piadine","","","",""],
["Gelateria Surya","Viale Papa Giovanni XXIII 28","Bergamo","9.671144485473633","45.693691881386506","Gelateria","","","",""],
["Break and shop","Passaggio Cividini 6","Bergamo","9.669272303581238","45.69355698871188","Self service: snack e drink","","","",""],
["Gelateria in galleria","Passaggio Limonta","Bergamo","9.667689800262451","45.69311109116647","Gelateria","","","",""],
["Al Sultan","Piazza pontida 28","Bergamo","9.663258790969849","45.693062379454524","Gastronomia palestinese","","","",""],
["Burch Instanbul","Via Palma il Vecchio 103","Bergamo","9.659659266471863","45.69174340004918","Kebab","","","",""],
["Royal kebab","Via Previtali 16a","Bergamo","9.662132263183592","45.688734361859126","Kebab, pizza","","","",""],
["Buday","Via Previtali 16","Bergamo","9.662341475486755","45.68861819400118","Panini e toast","","","",""],
["Stop'n go","Via Previtali 12","Bergamo","9.662695527076721","45.68847954172589","Piadineria","","","",""],
["Snackiamo","Via san Giorgio 1d","Bergamo","9.66871976852417","45.68928896637156","Selfservice 24 ore su 24","","","",""]
]
























/*
 HTMLElement.prototype.originalRemoveEventListener
        = HTMLElement.prototype.removeEventListener;
 
HTMLElement.prototype.removeEventListener = function(type, listener, useCapture)
{
    console.log('remove: ' + type);
    this.originalRemoveEventListener(type, listener, useCapture);
};
*/

var sellers = [];
var viewAssembler = new ViewAssembler();
// non definendo una lingua iniziale, si usa la lingua del sistema o l'inglese.
i18n.init({lng: 'it', fallbackLng: 'en'});
// i18n.init({fallbackLng: 'en'});

Handlebars.registerHelper('t', function(i18n_key) {
    var result = i18n.t(i18n_key);
    return new Handlebars.SafeString(result);
});

$(document).ready( function(){
    loadTemplates( setupDefaultView );
} );

function setupDefaultView() { 
    /*   handlebars */
    var homeView = new HbHomeView();
    var defaultView = { 
        title: i18n.t("home.title"), 
        view: homeView.render()
    };
    
    /***    mustache 
    //Setup the default view
    var bodyView = viewAssembler.defaultView();
    var defaultView = { title: "Welcome!", 
        view:  bodyView,
    };
    */
    
    //Setup the ViewNavigator
    window.viewNavigator = new ViewNavigator( 'body' );
    window.viewNavigator.pushView( defaultView );
    
    $.getScript("sellers.js", scriptSuccess);
}

/**
 * Apertura mappa con tutti i venditori
 * @param event
 * @returns {Boolean}
 */
function onMapButtonClick( event ) {
    var mapView = new HbMapView();
    var view = { 
        title: i18n.t("search.map.title"),
        backLabel: (isTablet() ? i18n.t("app.back") : " "),
        view: mapView.render(),
        scroll: false
    };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}

/* funzione non utilizzata */
function onSearchResultMapButtonClick( event ) {
    alert('onSearchResultMapButtonClick');
    var centerPoint = {x:0,y:0};
    var len = 0;
    
    for( var i = 0; i<window.filteredMarkesList.length; i++ ){
    
        var _x = parseFloat(window.filteredMarkesList[i].x);
        var _y = parseFloat(window.filteredMarkesList[i].y);
    
        if ( !isNaN( _x ) && !isNaN( _y ) ) {
            centerPoint.x += _x;
            centerPoint.y += _y;
            len ++;
        }
    }
    //console.log( centerPoint.x, centerPoint.y );
    centerPoint.x = centerPoint.x / len;
    centerPoint.y = centerPoint.y / len;
    
    //console.log( centerPoint.x, centerPoint.y );
    centerPoint = new L.LatLng(centerPoint.y, centerPoint.x);

    var view = { title: "Map",
             backLabel: (isTablet() ? "Back" : " "),
             view: viewAssembler.mapView(centerPoint),
             scroll:false
           };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}

/**
 * Click sul tasto 'Check In' in home page
 * @param event
 * @returns {Boolean}
 */
function onCheckInViewClick( event ) {
    var checkInView = new HbCheckInView();
    var view = { 
        title: i18n.t("checkin.title"), 
        backLabel: (isTablet() ? i18n.t("app.back") : " "),
        view: checkInView.render()
    };
    
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}

/**
 * Click sul tasto 'About' in home page.
 * @param event
 * @returns {Boolean}
 */
function onAboutViewClick( event ) {
    var aboutView = new HbAboutView();
    var view = { 
        title: i18n.t("about.title"), 
        backLabel: (isTablet() ? i18n.t("app.back") : " "),
        view: aboutView.render()
    };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}

/**
 * Click sul tasto 'Search' in home page.
 * @param event
 * @returns {Boolean}
 */
function onSearchViewClick( event ) {
    var searchView = new HbSearchView();
    
    var view = { 
        title: i18n.t("search.title"),
        view: searchView.render()
    };
    window.viewNavigator.pushView( view );
    
    //acquire location
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true });
    event.stopPropagation();
    return false;
}

/**
 * Callback attivata quando si ottiene la posizione dell'utente.
 */
var onGeoSuccess = function(position) {
   /* console.log('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + new Date(position.timestamp)      + '\n');
     */
    var latitude = parseFloat( position.coords.latitude );
    var longitude = parseFloat( position.coords.longitude );
    
    //set a delay to allow transition to complete before requesting data
    setTimeout( function () {     
        var filtered = filterSellersByGeo( latitude, longitude );
        var searchView = new HbSearchView();
        var view = { 
            title: i18n.t("search.nearby.title"),
            backLabel: (isTablet() ? i18n.t("app.back") : " "),
            view: searchView.render()
        };
           
        view.view.children().remove();
        //view.view.append( viewAssembler.nearbyMarketsView( latitude, longitude, filtered ) );
        view.view.append( searchView.renderNearby( latitude, longitude, filtered ) );
        window.viewNavigator.replaceView( view );
    }, 600 );
};

// onError Callback receives a PositionError object
function onGeoError(error) {
   /* alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
     */   
       
    //wait for transition complete
    setTimeout( function() {
        var searchView = new HbSearchView();
        var view = { title: "Nearby",
                 backLabel: (isTablet() ? "Back" : " "),
                 view: searchView.renderPositionNotFound()
               };
        window.viewNavigator.replaceView( view );
    }, 500);
}

//find the all sellers within 100 miles
function filterSellersByGeo( latitude, longitude ) {
    var result = [];
    var startTime = new Date().getTime();
    for ( var i=0; i < sellers.length; i++ )
    {
        var lat1 = parseFloat(sellers[i][4]);
        var lon1 = parseFloat(sellers[i][3]);
        var lat2 = parseFloat(latitude);
        var lon2 = parseFloat(longitude);
        var d = distance( lat1, lon1, lat2, lon2 );
        if ( d < 100 ){
            result.push( sellers[i] );
        }
        
    }
    //console.log( new Date().getTime() - startTime );
    return result;
}

function distance( lat1, lon1, lat2, lon2 ) {
    var R = 6371; // Radius of the earth in km
    var dLat = toRad(lat2-lat1);  // Javascript functions in radians
    var dLon = toRad(lon2-lon1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    var m = 6 / 1.609344; // Distance in miles
    return d;
}

function toRad(degree) 
{
    rad = degree* Math.PI/ 180;
    return rad;
}

/**
 * Lettura dei dati dei venditori all'avvio del programma.
 * @param data
 * @param textStatus
 * @param jqXHR
 */
function scriptSuccess(data, textStatus, jqXHR) {
    for ( var i=0; i<sellers.length; i++ ) {
        sellers[i].push( i.toString() );
    }
}

/**
 * Click su un elemento della lista con i venditori vicini all'utente:
 * @param event
 */
function onNearbyListItemClick( event ) {
    $( "li" ).removeClass( "listSelected" );
    var target = $( event.target )
    if (target.get(0).nodeName.toUpperCase() != "LI") {
        target=target.parent();
    }
    
    target.addClass( "listSelected" );
    var index = target.attr( "index" );
    index = parseInt( index );
    showSellerDetails( sellers[index] );
}

function showSellerDetailsFromMapClick( index ) {
    setTimeout( function() {
        showSellerDetails( sellers[index] );
    }, 50 );
}
    
function showSellerDetails( item ) {
    var seller = arrayToSellerObject(item);
    var sellerDetailsView = new HbSellerDetailsView();
    var view = { 
        title: i18n.t("sellerDetails.title"),
        backLabel: (isTablet() ? i18n.t("app.back") : " "),
        view: sellerDetailsView.render(seller)
    };
    
    window.viewNavigator.pushView( view );
}

/**
 * Per il momento la pagina 'Check in' non fa nulla. Quando si clicca sul
 * tasto 'Check in' si torna alla home.
 * @param event
 */
function onCheckInButtonClick( event ) {
    event.preventDefault();
    window.viewNavigator.popView();
}


/* funzione non usata */
function onSearchButtonClick( event ) {
    alert('test');
    var criteria = {};
    
    var fields = ["state", "searchPhrase", 
                  "credit", "wiccash", "sfmnp", "snap",
                  "bakedGoods", "cheese", "crafts",
                  "flowers", "seafood", "fruit", "herbs", "vegetables", "honey", 
                  "jams", "maple",
                  "meat", "nuts", "plants", "soap"];
    
    for ( var index in fields ) {
        var field = fields[ index ];
        var $input = $("#search_" + field);
        var value;
        
        if ( index <= 1 ){
            value = $input.val();
            
            if ( value != undefined && value.length > 0 ) {
                criteria[field] = value;
            }
        }
        else {
            value = $input.is(":checked");
            if ( value == true ) {
                criteria[field] = value;
            }
        }
    }
    
    var sellers = filterSellersBySearchCriteria( criteria );
    var view = { title: "Search Results",
             backLabel: (isTablet() ? "Back" : " "),
             view: viewAssembler.searchResultsView( sellers, criteria )
           };
    window.viewNavigator.pushView( view );
}

/* funzione non usata */
function filterSellersBySearchCriteria( criteria ) {
    alert('aaaaaaaaaa');
    var result = [];
    var startTime = new Date().getTime();
    for ( var i =0; i < sellers.length; i++ )
    {
        if ( marketRowMatchesCriteria( sellers[i], criteria ) ) {
            result.push(  sellers[i] );
        }
    }
    //console.log( new Date().getTime() - startTime );
    return result;
}

/* funzione non usata */
function marketRowMatchesCriteria( row, criteria ) {
    alert('bbbbbbbbbb');
    //state
    if ( row[6] != criteria.state ) { return false; }
                  
    if ( criteria.credit == true )      {    if ( row[11] != "Y" ) return false;    };
    if ( criteria.wic == true )         {    if ( row[12] != "Y" ) return false;    };
    if ( criteria.wiccash == true )     {    if ( row[13] != "Y" ) return false;    };
    if ( criteria.sfmnp == true )       {    if ( row[14] != "Y" ) return false;    };
    if ( criteria.snap == true )        {    if ( row[15] != "Y" ) return false;    };
    
    
    if ( criteria.bakedGoods == true )  {    if ( row[16] != "Y" ) return false;    };
    if ( criteria.cheese == true )      {    if ( row[17] != "Y" ) return false;    };
    if ( criteria.crafts == true )      {    if ( row[18] != "Y" ) return false;    };
    if ( criteria.flowers == true )     {    if ( row[19] != "Y" ) return false;    };
    if ( criteria.seafood == true )     {    if ( row[20] != "Y" ) return false;    };
    if ( criteria.fruit == true )       {    if ( row[21] != "Y" ) return false;    };
    if ( criteria.herbs == true )       {    if ( row[22] != "Y" ) return false;    };
    if ( criteria.vegetables == true )  {    if ( row[23] != "Y" ) return false;    };
    if ( criteria.honey == true )       {    if ( row[24] != "Y" ) return false;    };
    if ( criteria.jams == true )        {    if ( row[25] != "Y" ) return false;    };
    if ( criteria.maple == true )       {    if ( row[26] != "Y" ) return false;    };
    if ( criteria.meat == true )        {    if ( row[27] != "Y" ) return false;    };
    if ( criteria.nuts == true )        {    if ( row[28] != "Y" ) return false;    };
    if ( criteria.plants == true )      {    if ( row[29] != "Y" ) return false;    };
    if ( criteria.soap == true )        {    if ( row[31] != "Y" ) return false;    };
    
    //searchString last
    if ( criteria.searchPhrase != undefined && criteria.searchPhrase.length > 0 ) {
        var tokens = criteria.searchPhrase.split(" ");
        var result = true;
        for ( var i=0; i<tokens.length; i++) {
            if (!result) {
                break;
            }
            var regexp = new RegExp(tokens[i], "i");
            var iterationResult = false;
            if ( regexp.test( row[1] ) ) { iterationResult = true; };
            if ( regexp.test( row[4] ) ) { iterationResult = true; };
            if ( regexp.test( row[5] ) ) { iterationResult = true; };
            if ( regexp.test( row[7] ) ) { iterationResult = true; };
            if ( regexp.test( row[10] ) ) { iterationResult = true; };
            result = iterationResult && result;
        }
        return result;
    }
    
    return true;
}

/* funzione non usata */
function criteriaToString( criteria ) {
    alert('ccccccccc');
    var result = criteria.state;
    
    if (criteria.searchPhrase) {
        result += ", '" + criteria.searchPhrase + "'";
    }
     
    return result;
}

function arrayToSellerObject( arr ) {
    //var fields=["fmid","sellerName","website","street","city","county","state","zip","x","y","location","credit","wic","wiccash","sfmnp","snap","bakedgoods","cheese","crafts","flowers","seafood","fruit","herbs","vegetables","honey","jams","maple","meat","nuts","plants","prepared","soap","index"];
    
    // notare l'ultimo campo che è l'indice dell'array
    var fields=["sellerName","street","city","x","y","notes","website","phonenumber","zip","country","index"];
    var result = {};
    for ( var index in arr ) {
        result[ fields[index] ] = arr[ index ];
        /*
        if ( index <= 10 || index >= 32 ) {
            result[ fields[index] ] = arr[ index ];
        } else {
            result[ fields[index] ] = (arr[ index ] == "Y");
        }*/
    }
    
    // result.paymentDetail = result.credit || result.wic || result.wicash || result.sfmnp || result.snap;
    // result.productDetail = result.bakedgoods || result.cheese || result.crafts || result.flowers || result.seafood || result.fruit || result.herbs || result.vegetables || result.honey || result.jams || result.maple || result.meat || result.nuts || result.plants || result.prepared || result.soap;
    
    return result;
}

function openExternalURL( url ) {

    var result=confirm(i18n.t("app.leave")); 
    if (result==true) {
        window.open( url, '_blank' );
    }
}

/**
 * Funzione richiamata quando si clicca sul bottone "Vedi mappa" nella 
 * pagina del dettaglio di un venditore.
 * @param index
 */
function viewInMap( index ) {
    var seller = arrayToSellerObject( sellers[index] );
    var sellerMapView = new HbSellerMapView();
    var view = { 
        title: seller.sellerName,
        backLabel: (isTablet() ? i18n.t("app.back") : " "),
        view: sellerMapView.render(seller),
        scroll: false
    };
    window.viewNavigator.pushView( view );
}

function getDirections( index ) {
    var seller = arrayToSellerObject( sellers[index] );
    var result=confirm(i18n.t("app.leave"));
    if (result==true) {
        
        var win = navigator.userAgent.search( "Windows Phone" ) >= 0;
        var android = navigator.userAgent.search( "Android" ) >= 0;
        
        /*if (win) {
            window.open( ('maps:' + market.y + ',' + market.x), '_blank' );
        } 
        else 
        */
        if (android) {
            navigator.app.loadUrl( 'http://maps.google.com/maps?q=' + seller.y + ',' + seller.x, { openExternal:true });
        }
        else {
            window.open( ('http://maps.google.com/maps?q=' + seller.y + ',' + seller.x), '_blank' );
        }
    }
}


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    navigator.globalization.getPreferredLanguage(
        // on success:
        function (language) {
            if (language.value == 'italiano') {
                setLanguage('it');
            } else {
                setLanguage('en');
            }
        },
        // on fail:
        function () {
            setLanguage('en');
        }
    );
    
    document.addEventListener("backbutton", onBackKey, false);
    
    /**
     * Definizione di un nuovo plugin per il recupero della versione dell'app
     */
    window.getVersion = function(callback) {
        cordova.exec(
            // callback chiamata in caso di successo
            function(ver) {
                $('#span_version').text(ver);
            }, 
            // callback chiamata in caso di fallimento
            function(err) {
                alert(err);
            }, 
            "VersionPlugin", 
            "getVersionName", 
            []
        );
    };
    // richiamo il nuovo plugin per aggiornare la versione nella home page.
    window.getVersion();
    // il plugin esegue una chiamata asincrona, non si può fare
    // var versione = window.getVersion();   e usare versione come si vuole...
    
}

function setLanguage(language) {
    // conviene sempre definire una lingua di fallback nel caso la chiave
    // italiana o francese o xxx non venga trovata
    
    // language = 'it';
    i18n.init({lng: language, fallbackLng: 'en'});
    compileHbTemplates();
    
    // dopo la ricompilazione dei template, le viste sono tradotte nella 
    // lingua corretta. Ma la homeView non viene mai ricreata e quindi va
    // "tradotta" a mano:
    $('div.viewNavigator_header_title').html(i18n.t('home.title'));
    $('#checkIn').html(i18n.t('home.checkin'));
    $('#search').html(i18n.t('home.search'));
    $('#about').html(i18n.t('home.about'));
}

/**
 * Funzione che mostra un alert nativo se si sta usando un device e un 
 * alert web se si sta sviluppando usando un browser.
 * @param message
 * @param title
 */
function showAlert(message, title) {
    if (navigator.notification) {
        // nativo 
        navigator.notification.alert(message, null, title, "ok");
    } else {
        // browser
        alert(title ? (title + ": " + message): message);
    }
}


/**
 * Compila di nuovo i template per tener conto di un cambio di lingua.
 * I template sono compilati anche in fondo ai file .js perché altrimenti
 * l'app non funzionava una volta deployata.
 */
function compileHbTemplates() {
    // visto che la homeView viene tradotta "a mano" non c'è bisogno di ricompilarla:
    // HbHomeView.template = Handlebars.compile($("#home-tpl").html());
    HbCheckInView.template = Handlebars.compile($("#checkIn-tpl").html());
    HbSearchView.template = Handlebars.compile($("#search-tpl").html());
    HbSearchView.nearbySellersTemplate = Handlebars.compile($("#nearbySellers-tpl").html());
    HbSearchView.positionNotFoundTemplate = Handlebars.compile($("#positionNotFound-tpl").html());
    HbSellerDetailsView.template = Handlebars.compile($("#sellerDetails-tpl").html());
    HbSellerMapView.template = Handlebars.compile($("#sellerMap-tpl").html());
    HbMapView.template = Handlebars.compile($("#map-tpl").html());
    HbAboutView.template = Handlebars.compile($("#about-tpl").html());
}

function onBackKey( event ) {
    if ( window.viewNavigator.history.length > 1 ){
        event.preventDefault();
        window.viewNavigator.popView();
        return false;
    }
    navigator.app.exitApp();
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);



var templates = {
    // defaultViewTemplate:"views/defaultViewTemplate.html",
    // aboutViewTemplate:"views/aboutViewTemplate.html",
    // checkInViewTemplate:"views/checkInViewTemplate.html",
        
    /*geoPermissionDeniedViewTemplate:"views/geoPermissionDeniedViewTemplate.html",
    searchResultsViewTemplate:"views/searchResultsViewTemplate.html", */
        
    // searchViewTemplate:"views/searchViewTemplate.html",
    // mapViewTemplate:"views/mapViewTemplate.html",
    // sellerDetailsViewTemplate:"views/sellerDetailsViewTemplate.html",
    sellerMapViewTemplate:"views/sellerMapViewTemplate.html",
    // sellersNearMeViewTemplate:"views/sellersNearMeViewTemplate.html",
    loaded: 0,
    requested: 0
};

var ___templatesLoadedCallback;

function loadTemplates(callback) {
    ___templatesLoadedCallback = callback;
    
    //load Moustache HTML templates
    for (var key in templates) {
        (function() {
             var _key = key.toString();
             if ( _key != "loaded" && _key != "requested" ){
                 templates.requested ++;
                 
                 var templateLoaded = function( template ){
                    onTemplateLoaded( template, _key );
                 }
                 
                 $.get( templates[ _key ], templateLoaded, "html" );
             }
         })();
    }
}

// Questa funzione carica un template. 
// Quando tutti i template sono stati caricati, richiama la callback che era
// stata passata alla funzione loadTemplates.
function onTemplateLoaded(template, key) {
    //alert( key + ": " + template);
    templates[ key ] = template;
    templates.loaded ++;
    
    if ( templates.loaded == templates.requested ) {
        ___templatesLoadedCallback();
    }
}



function isTablet() {
    var _w = $(window).width();
    var _h = $(window).height();
    return (Math.min(_w,_h) >= 600);
}

function ViewAssembler() {
    this.touchSupported = 'ontouchstart' in window;
    //this.CLICK_EVENT = this.touchSupported ? 'touchend' : 'click';
    this.CLICK_EVENT = 'click';
    return this;
}

/* deprecated, now using handlebars */
ViewAssembler.prototype.defaultView = function() {
    var el = $(templates.defaultViewTemplate);
    el.find("#checkIn").on( this.CLICK_EVENT, onCheckInViewClick );
    el.find("#search").on( this.CLICK_EVENT, onSearchViewClick );
    el.find("#about").on( this.CLICK_EVENT, onAboutViewClick );
    return el;
}

/* deprecated, now using handlebars */
ViewAssembler.prototype.aboutView = function() {
    var el = $( templates.aboutViewTemplate );
    return el;
}

/* deprecated, now using handlebars */
ViewAssembler.prototype.checkInView = function () {
    var el = $( templates.checkInViewTemplate );
    /*
    var $state = el.find( "#search_state" );
    var states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virgin Islands","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
    for ( var i in states ) {
        $state.append($("<option></option>").text(states[i])); 
    }
    el.find( "#searchButton" ).on( this.CLICK_EVENT, onSearchButtonClick );
    */
    el.find( "#checkInButton" ).on( this.CLICK_EVENT, onCheckInButtonClick );
    return el;
}

/* deprecated */
ViewAssembler.prototype.nearbyMarketsView = function( latitude, longitude, marketsArr ) {
    var result = [];
    for ( var i=0; i< marketsArr.length; i++ ) {
        var market = arrayToMarketObject( marketsArr[i] );
        
        var lat1 = parseFloat(market.y);
        var lon1 = parseFloat(market.x);
        var lat2 = parseFloat(latitude);
        var lon2 = parseFloat(longitude);
        
        market.distance = Math.round( distance( lat1, lon1, lat2, lon2 ) );
        result.push( market );
    }
    
    result.sort( function(a, b){
        if ( a.distance < b.distance ) { return -1; }
        else if (a.distance > b.distance ) { return 1; }
        else return 0;
    });
    
    window.filteredMarkesList = result;
    
    var viewModel = {   latitude: latitude,
                        longitude: longitude,
                        mapWidth: $(window).width(),
                        mapHeight: 100,
                        markets: result
                    };
    var template = templates.sellersNearMeViewTemplate;
                  
    var el = $( Mustache.to_html(template, viewModel) );
    el.find( "li" ).on( this.CLICK_EVENT, onNearbyListItemClick );
    el.find( "#mapButton" ).on( this.CLICK_EVENT, onMapButtonClick );
    return el;
}

/* deprecated */
ViewAssembler.prototype.marketDetailsView = function( market ) {
    var template = templates.sellerDetailsViewTemplate;
    return $( Mustache.to_html(template, market) );
}

/* deprecated */
ViewAssembler.prototype.searchView = function () {
    var el = $( templates.searchViewTemplate );
    return el;
}

/* per il momento non presente in SFF */
ViewAssembler.prototype.searchResultsView = function( marketsArr, criteria ) {
    var viewModel = {markets:[]};
    for ( var i=0; i< marketsArr.length; i++ ) {
        var market = arrayToMarketObject( marketsArr[i] );
        viewModel.markets.push( market );
    }
    
    viewModel.markets.sort( function(a, b){
        if ( a.sellerName < b.sellerName ) { return -1; }
        else if (a.sellerName > b.sellerName ) { return 1; }
        else return 0;
    });
    
    viewModel.overLength = viewModel.markets.length > 50;
    viewModel.markets = viewModel.markets.slice( 0, Math.min(49, viewModel.markets.length-1));
    
    viewModel.criteria = criteriaToString(criteria);
    window.filteredMarkesList = viewModel.markets;  
    
    var template = templates.searchResultsViewTemplate;

    var el = $( Mustache.to_html(template, viewModel) );
    el.find( "li" ).on( this.CLICK_EVENT, onNearbyListItemClick );
    el.find( "#mapButton" ).on( this.CLICK_EVENT, onSearchResultMapButtonClick );
    
    return el;
}

ViewAssembler.prototype.geoPermissionDenied = function() {
    var el = $( templates.geoPermissionDeniedViewTemplate );
    return el;
}

/* deprecated */
ViewAssembler.prototype.mapView = function(centerLatLng) {
    var el = $( templates.mapViewTemplate );
    setTimeout( function(){
    var map = new L.Map('map');

    //cloudmadeUrl = 'http://{s}.tile.cloudmade.com/YOUR-API-KEY/997/256/{z}/{x}/{y}.png',
    var cloudmadeUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap',
        cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttribution});
    
    map.addLayer(cloudmade);
    

    var blueMarkerIcon = L.Icon.extend({
        iconUrl: 'assets/map/marker-lightblue.png',
        shadowUrl: 'assets/map/shadow.png',
        iconSize: new L.Point(26, 40),
        shadowSize: new L.Point(32, 39),
        iconAnchor: new L.Point(14, 39),
        popupAnchor: new L.Point(0, -35)
    });
    var yellowMarkerIcon = L.Icon.extend({
        iconUrl: 'assets/map/marker-yellow.png',
        shadowUrl: 'assets/map/shadow.png',
        iconSize: new L.Point(26, 40),
        shadowSize: new L.Point(32, 39),
        iconAnchor: new L.Point(14, 40),
        popupAnchor: new L.Point(13, 12)
    });
    
    var blueIcon = new blueMarkerIcon();
    var yellowIcon = new yellowMarkerIcon();
    
    var markersLayer = new L.LayerGroup();
    var southWestBounds, northEastBounds, bounds;
    if ( window.filteredMarkesList ) {
    
        for ( var x=0; x<window.filteredMarkesList.length; x++ ) {
            var market = window.filteredMarkesList[x];
            
            if ( market.x != "" && market.y != "" ) {
            
                var latLng = new L.LatLng(market.y, market.x);
                var marker = new L.Marker(latLng, {icon: yellowIcon});
    
                var popupContent = "<a class='button' href='javascript:showMarketDetailsFromMapClick(" + market.index + ");'>" + market.sellerName + "</a>"; 
                
                var popup = marker.bindPopup( popupContent, {offset:new L.Point(0,-35)} );
                markersLayer.addLayer(marker);
                
                if ( !southWestBounds ) {
                    southWestBounds = { lat:market.y, lon:market.x};
                    northEastBounds = { lat:market.y, lon:market.x};
                }
                else {
                    southWestBounds.lat = Math.min( southWestBounds.lat, market.y );
                    southWestBounds.lon = Math.min( southWestBounds.lon, market.x );
                    northEastBounds.lat = Math.max( northEastBounds.lat, market.y );
                    northEastBounds.lon = Math.max( northEastBounds.lon, market.x );
                }
            }
        }
            
        if ( southWestBounds ) {
            //console.log(southWestBounds, northEastBounds);
            var southWest = new L.LatLng(southWestBounds.lat,southWestBounds.lon),
                northEast = new L.LatLng(northEastBounds.lat,northEastBounds.lon),
                bounds = new L.LatLngBounds(southWest, northEast);
        }
        map.addLayer(markersLayer);
    }
    
    var onLocationFound = function (e) {
            var radius = e.accuracy / 2;

            var marker = new L.Marker(e.latlng, {icon: blueIcon});
            markersLayer.addLayer(marker);
            marker.bindPopup("You are within " + radius + " meters from this point");

            var circle = new L.Circle(e.latlng, radius);
            markersLayer.addLayer(circle);
        }
        
        var onLocationError = function (e) {
            alert(e.message);
        }
    
        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);
    

        if ( centerLatLng == undefined ){
            
            if ( bounds ) {
                map.fitBounds(bounds);
                map.locate();
            }
            else {
                map.locateAndSetView(7);
            }
        }
        else {
            if ( bounds ) {
                map.fitBounds(bounds);
                map.locate();
            }
            else {
                map.setView( centerLatLng, (isTablet() ? 7 : 6) ); 
            }
        }
        
        var currentViewDescriptor = window.viewNavigator.history[ window.viewNavigator.history.length-1 ];
        currentViewDescriptor.showCallback = function() {
         
            //this is to work around a weird issue in Leaflet maps in iOS, where 
            //dragging stops working after a new view has been pushed onto the stack
                
            var latLng = map.getCenter();
            var zoom = map.getZoom();
            map.removeLayer( cloudmade );
            map.removeLayer( markersLayer );
            
            $('#mapContainer').children().remove();
            $('#mapContainer').append( $("<div id='map' style='width:100%; height:100%'></div>") );
            map = new L.Map('map');
            
            map.addLayer( cloudmade );
            map.addLayer( markersLayer );
            map.setView( latLng, zoom, true );
            
        }
    
    }, 150 );
    
    
    return el;
}

/* deprecated */
ViewAssembler.prototype.marketMapView = function(market) {
    var template = templates.sellerMapViewTemplate;
    var el = $( Mustache.to_html(template, market) );
    setTimeout( function(){
    var map = new L.Map('map');

    //cloudmadeUrl = 'http://{s}.tile.cloudmade.com/YOUR-API-KEY/997/256/{z}/{x}/{y}.png',
    var cloudmadeUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap',
        cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttribution});
    
    map.addLayer(cloudmade);
    

    var blueMarkerIcon = L.Icon.extend({
        iconUrl: 'assets/map/marker-lightblue.png',
        shadowUrl: 'assets/map/shadow.png',
        iconSize: new L.Point(26, 40),
        shadowSize: new L.Point(32, 39),
        iconAnchor: new L.Point(14, 39),
        popupAnchor: new L.Point(0, -35)
    });
    var yellowMarkerIcon = L.Icon.extend({
        iconUrl: 'assets/map/marker-yellow.png',
        shadowUrl: 'assets/map/shadow.png',
        iconSize: new L.Point(26, 40),
        shadowSize: new L.Point(32, 39),
        iconAnchor: new L.Point(14, 40),
        popupAnchor: new L.Point(13, 12)
    });
    
    var blueIcon = new blueMarkerIcon();
    var yellowIcon = new yellowMarkerIcon();
    
    var markersLayer = new L.LayerGroup();;
    if ( market ) {    
        var latLng = new L.LatLng(market.y, market.x);
        var marker = new L.Marker(latLng, {icon: yellowIcon});

        var popupContent = "<a class='button' href='javascript:showMarketDetailsFromMapClick(" + market.index + ");'>" + market.sellerName + "</a>"; 
        
        marker.bindPopup( popupContent, {offset:new L.Point(0,-35)} );
       
        markersLayer.addLayer(marker);
        map.addLayer(markersLayer);
    }
    
    var onLocationFound = function (e) {
            var radius = e.accuracy / 2;

            var marker = new L.Marker(e.latlng, {icon: blueIcon});
            markersLayer.addLayer(marker);
            marker.bindPopup("You are within " + radius + " meters from this point");

            var circle = new L.Circle(e.latlng, radius);
            markersLayer.addLayer(circle);
        }
        
        var onLocationError = function (e) {
            alert(e.message);
        }
    
        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        map.locate();
        map.setView( new L.LatLng( market.y, market.x ), 14 ); 
    
    }, 150 );
    
    return el;
}


var HbCheckInView = function(store) {
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="checkInView" />');
    };
    
    this.render = function() {
        this.el.html(HbCheckInView.template());
        this.el.find( "#checkInButton" ).on( this.CLICK_EVENT, onCheckInButtonClick );
        return this.el;   // return $("<div id='checkInView'>...</div>")
    };
    
    this.initialize();
}

// membri statici della vista

// questa vista viene compilata dopo il calcolo della lingua dell'utente


var HbHomeView = function(store) {
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="defaultView" />');
        //this.el.on('keyup', '.search-key', this.findByName);
    };
    
    this.render = function() {
        // si utilizza this.el invece di #body per rendere la view riutilizzabile
        this.el.html(HbHomeView.template());
        //return this;
        this.el.find("#checkIn").on(this.CLICK_EVENT, onCheckInViewClick );
        this.el.find("#search").on( this.CLICK_EVENT, onSearchViewClick );
        this.el.find("#about").on( this.CLICK_EVENT, onAboutViewClick );
        return this.el;   // return "<div id='...'>...</div>"
        
    };
    
    /*
    this.findByName = function() {
        / *
        var self = this;
        store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(HomeView.liTemplate(employees));
        });* /
        store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(HomeView.liTemplate(employees));
            if (self.iscroll) {
                console.log('Refresh iScroll');
                self.iscroll.refresh();
            } else {
                console.log('New iScroll');
                self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
            }
        });
    }; */
    
    this.initialize();
}

// membri statici della vista
// Questa vista è particolare perché è la prima ad essere usata e quindi va 
// compilata ancora prima di decidere quale lingua usa l'utente.
HbHomeView.template = Handlebars.compile($("#home-tpl").html());


var HbMapView = function() {
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="mapContainer" style="width:100%;height:100%" />');
    };
    
    this.render = function(centerLatLng) {
        this.el.html(HbMapView.template());
        
        // var el = $( templates.mapViewTemplate );
        setTimeout( function(){
            var map = new L.Map('map');
            
            // cloudmadeUrl = 'http://{s}.tile.cloudmade.com/YOUR-API-KEY/997/256/{z}/{x}/{y}.png',
            var cloudmadeUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap',
                cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttribution});
            
            map.addLayer(cloudmade);

            var blueMarkerIcon = L.Icon.extend({
                iconUrl: 'assets/map/marker-lightblue.png',
                shadowUrl: 'assets/map/shadow.png',
                iconSize: new L.Point(26, 40),
                shadowSize: new L.Point(32, 39),
                iconAnchor: new L.Point(14, 39),
                popupAnchor: new L.Point(0, -35)
            });
            var yellowMarkerIcon = L.Icon.extend({
                iconUrl: 'assets/map/marker-yellow.png',
                shadowUrl: 'assets/map/shadow.png',
                iconSize: new L.Point(26, 40),
                shadowSize: new L.Point(32, 39),
                iconAnchor: new L.Point(14, 40),
                popupAnchor: new L.Point(13, 12)
            });
            
            var blueIcon = new blueMarkerIcon();
            var yellowIcon = new yellowMarkerIcon();
            
            var markersLayer = new L.LayerGroup();
            var southWestBounds, northEastBounds, bounds;
            if ( window.filteredMarkesList ) {
            
                for ( var x=0; x<window.filteredMarkesList.length; x++ ) {
                    var seller = window.filteredMarkesList[x];
                    
                    if ( seller.x != "" && seller.y != "" ) {
                    
                        var latLng = new L.LatLng(seller.y, seller.x);
                        var marker = new L.Marker(latLng, {icon: yellowIcon});
            
                        var popupContent = "<a class='button' href='javascript:showSellerDetailsFromMapClick(" + seller.index + ");'>" + seller.sellerName + "</a>"; 
                        
                        var popup = marker.bindPopup( popupContent, {offset:new L.Point(0,-35)} );
                        markersLayer.addLayer(marker);
                        
                        if ( !southWestBounds ) {
                            southWestBounds = { lat:seller.y, lon:seller.x};
                            northEastBounds = { lat:seller.y, lon:seller.x};
                        }
                        else {
                            southWestBounds.lat = Math.min( southWestBounds.lat, seller.y );
                            southWestBounds.lon = Math.min( southWestBounds.lon, seller.x );
                            northEastBounds.lat = Math.max( northEastBounds.lat, seller.y );
                            northEastBounds.lon = Math.max( northEastBounds.lon, seller.x );
                        }
                    }
                }
                    
                if ( southWestBounds ) {
                    //console.log(southWestBounds, northEastBounds);
                    var southWest = new L.LatLng(southWestBounds.lat,southWestBounds.lon),
                        northEast = new L.LatLng(northEastBounds.lat,northEastBounds.lon),
                        bounds = new L.LatLngBounds(southWest, northEast);
                }
                map.addLayer(markersLayer);
            }
            
            var onLocationFound = function (e) {
                var radius = e.accuracy / 2;
    
                var marker = new L.Marker(e.latlng, {icon: blueIcon});
                markersLayer.addLayer(marker);
                marker.bindPopup(i18n.t("search.map.radius", {'radius': radius}));
    
                var circle = new L.Circle(e.latlng, radius);
                markersLayer.addLayer(circle);
            }
    
            var onLocationError = function (e) {
                alert(e.message);
            }
            
            map.on('locationfound', onLocationFound);
            map.on('locationerror', onLocationError);
    
            if ( centerLatLng == undefined ){
                if ( bounds ) {
                    map.fitBounds(bounds);
                    map.locate();
                } else {
                    map.locateAndSetView(7);
                }
            } else {
                if ( bounds ) {
                    map.fitBounds(bounds);
                    map.locate();
                }
                else {
                    map.setView( centerLatLng, (isTablet() ? 7 : 6) ); 
                }
            }
            
            var currentViewDescriptor = window.viewNavigator.history[ window.viewNavigator.history.length-1 ];
            currentViewDescriptor.showCallback = function() {
             
                //this is to work around a weird issue in Leaflet maps in iOS, where 
                //dragging stops working after a new view has been pushed onto the stack
                    
                var latLng = map.getCenter();
                var zoom = map.getZoom();
                map.removeLayer( cloudmade );
                map.removeLayer( markersLayer );
                
                $('#mapContainer').children().remove();
                $('#mapContainer').append( $("<div id='map' style='width:100%; height:100%'></div>") );
                map = new L.Map('map');
                
                map.addLayer( cloudmade );
                map.addLayer( markersLayer );
                map.setView( latLng, zoom, true );
                
            }
        }, 150 ); // end setTimeout
        
        return this.el;
    };
    
    this.initialize();
}

// membri statici della vista

// questa vista viene compilata dopo il calcolo della lingua dell'utente


var HbAboutView = function() {
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="aboutView" />');
    };
    
    this.render = function() {
        this.el.html(HbAboutView.template());
        return this.el;   // return $("<div id='aboutView'>...</div>")
    };
    
    this.initialize();
}

// membri statici della vista

// questa vista viene compilata dopo il calcolo della lingua dell'utente


var HbSellerMapView = function() {
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="sellerMapView" />');
    };
    
    this.render = function(seller) {
        this.el.html(HbSellerMapView.template(seller));
        
        setTimeout( function(){
            var map = new L.Map('map');

            //cloudmadeUrl = 'http://{s}.tile.cloudmade.com/YOUR-API-KEY/997/256/{z}/{x}/{y}.png',
            var cloudmadeUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                cloudmadeAttribution = 'Map data &copy; 2013 OpenStreetMap',
                cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttribution});
            
            map.addLayer(cloudmade);

            var blueMarkerIcon = L.Icon.extend({
                iconUrl: 'assets/map/marker-lightblue.png',
                shadowUrl: 'assets/map/shadow.png',
                iconSize: new L.Point(26, 40),
                shadowSize: new L.Point(32, 39),
                iconAnchor: new L.Point(14, 39),
                popupAnchor: new L.Point(0, -35)
            });
            var yellowMarkerIcon = L.Icon.extend({
                iconUrl: 'assets/map/marker-yellow.png',
                shadowUrl: 'assets/map/shadow.png',
                iconSize: new L.Point(26, 40),
                shadowSize: new L.Point(32, 39),
                iconAnchor: new L.Point(14, 40),
                popupAnchor: new L.Point(13, 12)
            });
            
            var blueIcon = new blueMarkerIcon();
            var yellowIcon = new yellowMarkerIcon();
            
            var markersLayer = new L.LayerGroup();
            if ( seller ) {
                var latLng = new L.LatLng(seller.y, seller.x);
                var marker = new L.Marker(latLng, {icon: yellowIcon});

                var popupContent = "<a class='button' href='javascript:showSellerDetailsFromMapClick(" + seller.index + ");'>" + seller.sellerName + "</a>"; 
                
                marker.bindPopup( popupContent, {offset:new L.Point(0,-35)} );
               
                markersLayer.addLayer(marker);
                map.addLayer(markersLayer);
            }
            
            var onLocationFound = function (e) {
                var radius = e.accuracy / 2;

                var marker = new L.Marker(e.latlng, {icon: blueIcon});
                markersLayer.addLayer(marker);
                marker.bindPopup(i18n.t("search.map.radius", {'radius': radious}));
                

                var circle = new L.Circle(e.latlng, radius);
                markersLayer.addLayer(circle);
            }
            
            var onLocationError = function (e) {
                alert(e.message);
            }
        
            map.on('locationfound', onLocationFound);
            map.on('locationerror', onLocationError);

            map.locate();
            map.setView( new L.LatLng( seller.y, seller.x ), 14 );
        
        }, 150 );  // end setTimeout

        return this.el;
    };
    
    this.initialize();
}

// membri statici della vista

// questa vista viene compilata dopo il calcolo della lingua dell'utente


var HbSellerDetailsView = function() {
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="sellerDetailsView" />');
    };
    
    this.render = function(seller) {
        this.el.html(HbSellerDetailsView.template(seller));
        return this.el;   // return $("<div id='sellerDetailsView'>...</div>")
    };
    
    this.initialize();
}

// membri statici della vista

// questa vista viene compilata dopo il calcolo della lingua dell'utente


var HbSearchView = function() {
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="findSellersNearMeView" />');
        this.elNearby = $('<div id="sellersNearMeView" />');
    };
    
    this.render = function() {
        this.el.html(HbSearchView.template());
        return this.el;   // return $("<div id='findSellersNearMeView'>...</div>")
    };
    
    this.renderNearby = function(latitude, longitude, sellersArr ) {
        
        var result = [];
        for ( var i=0; i< sellersArr.length; i++ ) {
            var seller = arrayToSellerObject( sellersArr[i] );
            
            var lat1 = parseFloat(seller.y);
            var lon1 = parseFloat(seller.x);
            var lat2 = parseFloat(latitude);
            var lon2 = parseFloat(longitude);
            
            seller.distance = Math.round( distance( lat1, lon1, lat2, lon2 ) );
            result.push( seller );
        }
        
        result.sort( function(a, b){
            if ( a.distance < b.distance ) { return -1; }
            else if (a.distance > b.distance ) { return 1; }
            else return 0;
        });
        
        window.filteredMarkesList = result;
        
        var viewModel = {
            latitude: latitude,
            longitude: longitude,
            mapWidth: $(window).width(),
            mapHeight: 100,
            sellers: result
        };
        this.elNearby.html(HbSearchView.nearbySellersTemplate(viewModel));
        
        this.elNearby.find( "li" ).on( this.CLICK_EVENT, onNearbyListItemClick );
        this.elNearby.find( "#mapButton" ).on( this.CLICK_EVENT, onMapButtonClick );
        return this.elNearby;
    }
    
    this.renderPositionNotFound = function(){
        this.el.html(HbSearchView.positionNotFoundTemplate());
        return this.el;   // return $("<div id='findSellersNearMeView'>...</div>")
    }
    
    this.initialize();
}

// membri statici della vista

// questa vista viene compilata dopo il calcolo della lingua dell'utente


/*
THIS SOFTWARE IS PROVIDED BY ANDREW M. TRICE ''AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL ANDREW M. TRICE OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


var ViewNavigator = function( target, backLinkCSS, bindToWindow ) {

	this.supportsBackKey = true; //phonegap on android only
	this.animating = false;
	this.animationX = 150;
	this.animationDuration = 400;
	this.history = [];
	this.scroller = null;
	this.headerPadding = 5;
	
	this.uniqueId = this.guid();
	
	var regexp = new RegExp("Windows Phone OS 7");	
	this.winPhone = (navigator.userAgent.search(regexp) >= 0);
	
	this.rootElement = $('<div class="viewNavigator_root"></div>');
	this.header = $('<div class="viewNavigator_header"></div>');
	this.content = $('<div class="viewNavigator_content" id="contentRoot"></div>');
	this.rootElement.append( this.header );
	this.rootElement.append( this.content );
	
	this.parent = $( target );
	
	this.backLinkCSS = backLinkCSS ? backLinkCSS : "viewNavigator_backButton";
	
	var self = this;
	//$(window).resize( function(event){ self.resizeContent() } );
	//alert( this.parent.toString() );
	//this.parent.resize( function(event){ self.resizeContent() } );
	
	if ( bindToWindow != false ) {
		$(window).resize( function(event){ self.resizeContent() } );
	}
	else {
		this.parent.resize( function(event){ self.resizeContent() } );
	}
	
	this.parent.append( this.rootElement );
	
	if ( window.viewNavigators == null || window.viewNavigators == undefined ) {
		window.viewNavigators = {};
	}
	window.viewNavigators[ this.uniqueId ] = this; 

}

ViewNavigator.prototype.replaceView = function( viewDescriptor ) {
	if (this.animating)
		return;
	viewDescriptor.animation = "pushEffect"
	
	//this is a hack to mimic behavior of pushView, then pop off the "current" from the history
	this.history.push( viewDescriptor );
	this.updateView( viewDescriptor );
	this.history.pop();
	this.history.pop();
	this.history.push( viewDescriptor );
}

ViewNavigator.prototype.pushView = function( viewDescriptor ) {
	if (this.animating)
		return;
	viewDescriptor.animation = "pushEffect"
	this.history.push( viewDescriptor );
	this.updateView( viewDescriptor );
}

ViewNavigator.prototype.popView = function() {

	if (this.animating || this.history.length <= 1 )
		return;
	
	var currentViewDescriptor = this.history[ this.history.length-1];
	if ( currentViewDescriptor.backCallback ) {
		currentViewDescriptor.backCallback();
	}
		
	this.history.pop();	
	var viewDescriptor = this.history[ this.history.length-1 ];
	viewDescriptor.animation = "popEffect"
	this.updateView( viewDescriptor );
}

ViewNavigator.prototype.setHeaderPadding = function( amount ) {
	this.headerPadding = amount;
	if ( this.headerBacklink ) {
		this.headerBacklink.css("left", amount);
	}
}

ViewNavigator.prototype.updateView = function( viewDescriptor ) {
	
	this.animating = true;
	
    
	
	
	this.contentPendingRemove = this.contentViewHolder;
	this.headerContentPendingRemove = this.headerContent;
	
	this.headerContent = $('<div class="viewNavigator_headerContent"></div>');
	
	this.headerTitle = $("<div class='viewNavigator_header_title'>" + viewDescriptor.title + "</div>");
	this.headerContent.append( this.headerTitle );
	
	var linkGuid = this.guid();
	if ( viewDescriptor.backLabel ) {
		this.headerBacklink = $('<li class="viewNavigator_header_backlink viewNavigator_backButtonPosition ' + this.backLinkCSS +'" id="link' + linkGuid + '" onclick="window.viewNavigators[\'' + this.uniqueId + '\'].popView()">'+ viewDescriptor.backLabel + '</li>');
		this.headerContent.append( this.headerBacklink );
		
		//this is for proper handling in splitviewnavigator
		this.setHeaderPadding( this.headerPadding );
	}
	
	var id = this.guid();
	this.contentViewHolder = $('<div class="viewNavigator_contentHolder" id="' + id + '"></div>');
	this.contentViewHolder.append( viewDescriptor.view );
	this.resizeContent();
	
	if ( this.contentPendingRemove ){ 
        this.contentPendingRemove.stop()
	}
	if ( this.headerContentPendingRemove ) {
        this.headerContentPendingRemove.stop()
	}
	this.headerContent.stop()
	this.contentViewHolder.stop()
	
	
	
	if ( this.scroller != null ) {
	    var scrollY = this.scroller.y;
        this.scroller.destroy();
        this.scroller = null;
        
        if (this.contentPendingRemove) {
            //console.log( scrollY );
            
            //use this to mantain scroll position when scroller is destroyed
            var children = $( this.contentPendingRemove.children()[0] );
            children.attr( "scrollY", scrollY );
            var originalTopMargin = children.css( "margin-top" );
            children.attr( "originalTopMargin", originalTopMargin );
            
            var cssString = "translate3d(0px, "+(parseInt( scrollY ) + parseInt( originalTopMargin )).toString()+"px, 0px)";
            children.css( "-webkit-transform", cssString );
            
           // children.css( "margin-top", (parseInt( scrollY ) + parseInt( originalTopMargin )).toString() + "px" );
        } 
    }
	
	$(this.contentPendingRemove).click(function(){ return false; });
	
    
	if ( viewDescriptor.animation == "popEffect" ) {
		
		this.contentViewHolder.css( "left", -this.contentViewHolder.width() );
		this.contentViewHolder.css( "opacity", 1 );
    	this.content.prepend( this.contentViewHolder );
    	
		this.headerContent.css( "left", -this.animationX );
		this.headerContent.css( "opacity", 0 );
		this.header.append( this.headerContent );
    	
    	var func = this.animationCompleteHandler(this.contentPendingRemove, this.headerContentPendingRemove, this.headerContent, this.contentViewHolder );
    	
 	   	this.contentPendingRemove.animate({
   	 			left:this.contentViewHolder.width(),
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration*0.8);
    		
    	//remove this to change back
 	   	this.contentViewHolder.animate({
   	 			left:0,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration/2);
    		
    	this.headerContentPendingRemove.animate({
   	 			left:this.animationX,
    			opacity:0,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration, func );
    		
    	this.headerContent.animate({
   	 			left:0,
    			opacity:1,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration/2 );
    		
    	
    	//using a timeout to get around inconsistent response times for webkittransitionend event
        //var func = this.animationCompleteHandler(this.contentPendingRemove, this.headerContentPendingRemove, this.headerContent, this.contentViewHolder );
    	//setTimeout( func, this.animationDuration+90 );
	}
	else if ( this.history.length > 1 ) {
	
		this.contentViewHolder.css( "left", this.contentViewHolder.width() );
		this.contentViewHolder.css( "opacity", 1 );
		
    	this.content.append( this.contentViewHolder );
    	
		this.headerContent.css( "left", this.animationX );
		this.headerContent.css( "opacity", 0 );
		this.header.append( this.headerContent );

        var func = this.animationCompleteHandler(this.contentPendingRemove, this.headerContentPendingRemove, this.headerContent, this.contentViewHolder );

 	   	this.contentViewHolder.animate({
   	 			left:0,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration*0.75);
    	
 	   	this.contentPendingRemove.animate({
   	 			left:-this.contentViewHolder.width()/2,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration, func);
    		
    	this.headerContent.animate({
   	 			left:0,
    			opacity:1,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration*0.75);
    		
    	this.headerContentPendingRemove.animate({
   	 			left:-this.animationX,
    			opacity:0,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration );
    		
    	//using a timeout to get around inconsistent response times for webkittransitionend event
    	//var func = this.animationCompleteHandler(this.contentPendingRemove, this.headerContentPendingRemove, this.headerContent, this.contentViewHolder );
    	//setTimeout( func, this.animationDuration+90 );
	}
	else {
		this.contentViewHolder.css( "left", 0 );
		this.contentViewHolder.css( "opacity", 1 );
    	this.content.append( this.contentViewHolder );

		this.headerContent.css( "left", 0 );
		this.headerContent.css( "opacity", 1 );
		this.header.append( this.headerContent );
		this.animating = false;
		this.resetScroller();
	}
	
    if ( viewDescriptor.backLabel ) {
    	new NoClickDelay( this.headerBacklink.get()[0] );
	}
	
	if ( viewDescriptor.showCallback ) {
	    viewDescriptor.showCallback();
	}
}


ViewNavigator.prototype.resetScroller = function() {
    
    var id = this.contentViewHolder.attr( "id" );
    var currentViewDescriptor = this.history[ this.history.length-1];
    
	if ( !this.winPhone ) {
		if ( this.scroller != null ) {
			this.scroller.destroy();
			this.scroller = null;
		}
		if ( id && !(currentViewDescriptor && currentViewDescriptor.scroll === false)) {
			var self = this;
			setTimeout( function() { 
			    
                //use this to mantain scroll position when scroller is destroyed
                var targetDiv = $( $("#"+id ).children()[0] );
                var scrollY= targetDiv.attr( "scrollY" );
                var originalTopMargin = targetDiv.attr( "originalTopMargin" );
                if ( scrollY != undefined && scrollY != "" ){
                  //  console.log( "resetScroller scrollY: " + scrollY)
                  //  targetDiv.css( "margin-top", originalTopMargin );
                    var cssString = "translate3d(0px, "+(originalTopMargin).toString()+"px, 0px)";
                    targetDiv.css( "-webkit-transform", cssString );
                }
			    self.scroller = new iScroll( id ); 
			    if ( scrollY != undefined && scrollY != "" ) {
			        self.scroller.scrollTo( 0, parseInt( scrollY ) );
			    }
			}, 10 );
			//this.scroller = new iScroll( id );
		}
    }
}


ViewNavigator.prototype.refreshScroller = function() {
    
	if ( !this.winPhone ) {
		if ( this.scroller != null ) {
			this.scroller.refresh();
		}
    }
}

ViewNavigator.prototype.animationCompleteHandler = function(removalTarget, headerRemovalTarget, headerView, contentView) {
	var self = this;
	return function() {
		self.animating = false;
        self.resetScroller();
		if ( removalTarget ) {
			removalTarget.unbind( "click" );
			removalTarget.detach();
		}
		if ( headerRemovalTarget ) {
			headerRemovalTarget.unbind( "click" );
			headerRemovalTarget.detach(); 
		}
	}
}

ViewNavigator.prototype.resizeContent = function(event) {

	var targetWidth = this.parent.width();
	if ( this.headerContent )
		this.headerContent.width( targetWidth );
	if ( this.contentViewHolder )
		this.contentViewHolder.width( targetWidth );
}


//GUID logic from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript

ViewNavigator.prototype.S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
ViewNavigator.prototype.guid = function() {
	return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0,3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
}



/*  PHONEGAP INTEGRATION */
/*
//android+phonegap specific back button support - will only work if phonegap is used on android (www.phonegap.com)
if ( typeof PhoneGap != 'undefined' ) { 
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
   document.addEventListener("backbutton", onBackKey, false);
}

function onBackKey( event ) {
	event.preventDefault();
	window.viewNavigator.popView();
	for ( var x=0; x<window.backKeyViewNavigators.length; x++ ) {
		window.backKeyViewNavigators[x].popView();
	}
}
*/


/*
THIS SOFTWARE IS PROVIDED BY ANDREW M. TRICE ''AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL ANDREW M. TRICE OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


var SplitViewNavigator = function( target, toggleButtonLabel, backLinkCSS, bindToWindow ) {
	
	this.animating = false;
	this.animationDuration = 350;
	this.animationPerformed = false;
	
	this.uniqueId = this.guid();
	this.parent = $( target );
	
	var regexp = new RegExp("Windows Phone OS 7");	
	this.winPhone = (navigator.userAgent.search(regexp) >= 0);
	
	this.rootElement = $('<div class="splitViewNavigator_root"></div>');
	this.sidebarContainer = $('<div class="splitViewNavigator_sidebar"></div>');
	this.contentOverlay = $('<div class="content_overlay_hidden" id="overlay'+this.uniqueId+'"></div>');
	this.bodyContainer = $('<div class="splitViewNavigator_body"></div>');
	
	this.sidebarViewNavigator = new ViewNavigator( this.sidebarContainer.get()[0], backLinkCSS, false );	
	
	this.bodyViewNavigator = new ViewNavigator( this.bodyContainer.get()[0], backLinkCSS, false );
	
	this.backLinkCSS = backLinkCSS ? backLinkCSS : "viewNavigator_backButton";
	
	this.toggleSidebarButton = $('<li class="viewNavigator_backButton viewNavigator_backButtonPosition ' + backLinkCSS + '" id="toggle' + this.uniqueId + '" onclick="window.splitViewNavigator.showSidebar()">'+toggleButtonLabel+'</li>');
	
	this.rootElement.append( this.bodyContainer );
	this.rootElement.append( this.contentOverlay );
	
	this.rootElement.append( this.sidebarContainer );
	
	var self = this;
	
	/*if ( "onorientationchange" in window ) {
		$(window).bind( "orientationchange", function(event){ self.resizeContent() } )
	}
	else {*/
		//$(window).resize( function(event){ self.resizeContent() } );
		//alert( this.parent.attr( "id" ) );
		this.parent.resize( function(event){ self.resizeContent() } );
	//}
	
	if ( bindToWindow != false ) {
		$(window).resize( function(event){ self.resizeContent() } );
	}
	else {
		this.parent.resize( function(event){ self.resizeContent() } );
	}
	
	this.resizeContent();
	
	this.parent.append( this.rootElement );
	
	this.contentOverlay.click( function(event){ self.hideSidebar() } );
	
	new NoClickDelay( this.contentOverlay.get()[0] );
	new NoClickDelay( this.toggleSidebarButton.get()[0] );
	window.splitViewNavigator = this;
}


SplitViewNavigator.prototype.resizeContent = function() {

	this.applyStylesByOrientation();
	this.sidebarViewNavigator.resizeContent();	
	this.bodyViewNavigator.resizeContent()
}

SplitViewNavigator.prototype.applyStylesByOrientation = function() {
	var $window = $(window)
    var w = $window.width();
    var h = $window.height();
   
    
    var orientation = (w >= h) ? "landscape" : "portrait";
    this.contentOverlay.removeClass( "content_overlay_visible" ).addClass( "content_overlay_hidden" );
    
    //landscape
    if ( orientation == "landscape" && this.orientation != orientation ) {
    	this.sidebarContainer.removeClass( "sidebar_portrait" ).addClass( "sidebar_landscape" );
    	this.bodyViewNavigator.setHeaderPadding( 0 );
    	this.toggleSidebarButton.remove();
    	if ( this.animationPerformed ) {
    		this.sidebarContainer.css( "left", 0 );
    	}
    	this.bodyContainer.removeClass( "body_portrait" ).addClass( "body_landscape" );
    }
    
    //portrait
    else if ( this.orientation != orientation ) {
    	this.sidebarContainer.removeClass( "sidebar_landscape" ).addClass( "sidebar_portrait" );
    	this.bodyViewNavigator.setHeaderPadding( "70px" );
		this.bodyContainer.append( this.toggleSidebarButton );
    	if ( this.animationPerformed ) {
    		this.sidebarContainer.css( "left", -this.sidebarContainer.width() );
    	}
    	this.bodyContainer.removeClass( "body_landscape" ).addClass( "body_portrait" );
    }
    
    this.orientation = orientation;
}

SplitViewNavigator.prototype.showSidebar = function() {
	this.animationPerformed = true;
	if ( this.orientation == "portrait" ) {
    	this.contentOverlay.removeClass( "content_overlay_hidden" ).addClass( "content_overlay_visible" );
		this.animating = true;
		this.sidebarContainer.animate({
			left:0,
			avoidTransforms:false,
			useTranslate3d: true
		}, this.animationDuration, this.animationCompleteHandler());
    		
	}
}

SplitViewNavigator.prototype.hideSidebar = function() {
	if ( this.orientation == "portrait" ) {
    	this.contentOverlay.removeClass( "content_overlay_visible" ).addClass( "content_overlay_hidden" );
		this.animating = true;
		this.sidebarContainer.animate({
			left:-this.sidebarContainer.width(),
			avoidTransforms:false,
			useTranslate3d: true
		}, this.animationDuration, this.animationCompleteHandler());
    		
	}
}

SplitViewNavigator.prototype.animationCompleteHandler = function() {
	var self = this;
	return function() {
		self.animating = false;
        //self.resetScroller();
	}
}

SplitViewNavigator.prototype.pushSidebarView = function( viewDescriptor ) {
	this.sidebarViewNavigator.pushView( viewDescriptor );
}

SplitViewNavigator.prototype.popSidebarView = function() {
	this.sidebarViewNavigator.popView();
}

SplitViewNavigator.prototype.replaceSidebarView = function( viewDescriptor ) {
	this.sidebarViewNavigator.replaceView( viewDescriptor );
}

SplitViewNavigator.prototype.pushBodyView = function( viewDescriptor ) {
	this.bodyViewNavigator.pushView( viewDescriptor );
}

SplitViewNavigator.prototype.popBodyView = function() {
	this.bodyViewNavigator.popView();
}

SplitViewNavigator.prototype.replaceBodyView = function( viewDescriptor ) {
	this.bodyViewNavigator.replaceView( viewDescriptor );
}




//GUID logic from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript

SplitViewNavigator.prototype.S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
SplitViewNavigator.prototype.guid = function() {
	return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0,3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
}







