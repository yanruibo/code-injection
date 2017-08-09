













      
            // Wait for Cordova to load
            //
            document.addEventListener("deviceready", onDeviceReady, false);

            // Cordova is ready
            //
            function onDeviceReady() {
                globalInit();     
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
    apiLoad([0.009999999776482582,[[["http://mt0.googleapis.com/vt?lyrs=m@200000000\u0026src=api\u0026hl=it-IT\u0026","http://mt1.googleapis.com/vt?lyrs=m@200000000\u0026src=api\u0026hl=it-IT\u0026"],null,null,null,null,"m@200000000"],[["http://khm0.googleapis.com/kh?v=122\u0026hl=it-IT\u0026","http://khm1.googleapis.com/kh?v=122\u0026hl=it-IT\u0026"],null,null,null,1,"122"],[["http://mt0.googleapis.com/vt?lyrs=h@200000000\u0026src=api\u0026hl=it-IT\u0026","http://mt1.googleapis.com/vt?lyrs=h@200000000\u0026src=api\u0026hl=it-IT\u0026"],null,null,"imgtp=png32\u0026",null,"h@200000000"],[["http://mt0.googleapis.com/vt?lyrs=t@130,r@200000000\u0026src=api\u0026hl=it-IT\u0026","http://mt1.googleapis.com/vt?lyrs=t@130,r@200000000\u0026src=api\u0026hl=it-IT\u0026"],null,null,null,null,"t@130,r@200000000"],null,[[null,0,7,7,[[[330000000,1246050000],[386200000,1293600000]],[[366500000,1297000000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=it-IT\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=it-IT\u0026"]],[null,0,8,8,[[[330000000,1246050000],[386200000,1279600000]],[[345000000,1279600000],[386200000,1286700000]],[[354690000,1286700000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=it-IT\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=it-IT\u0026"]],[null,0,9,9,[[[330000000,1246050000],[386200000,1279600000]],[[340000000,1279600000],[386200000,1286700000]],[[348900000,1286700000],[386200000,1302000000]],[[368300000,1302000000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=it-IT\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=it-IT\u0026"]],[null,0,10,19,[[[329890840,1246055600],[386930130,1284960940]],[[344646740,1284960940],[386930130,1288476560]],[[350277470,1288476560],[386930130,1310531620]],[[370277730,1310531620],[386930130,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=it-IT\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=it-IT\u0026"]],[null,3,7,7,[[[330000000,1246050000],[386200000,1293600000]],[[366500000,1297000000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=it-IT\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=it-IT\u0026"]],[null,3,8,8,[[[330000000,1246050000],[386200000,1279600000]],[[345000000,1279600000],[386200000,1286700000]],[[354690000,1286700000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=it-IT\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=it-IT\u0026"]],[null,3,9,9,[[[330000000,1246050000],[386200000,1279600000]],[[340000000,1279600000],[386200000,1286700000]],[[348900000,1286700000],[386200000,1302000000]],[[368300000,1302000000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=it-IT\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=it-IT\u0026"]],[null,3,10,null,[[[329890840,1246055600],[386930130,1284960940]],[[344646740,1284960940],[386930130,1288476560]],[[350277470,1288476560],[386930130,1310531620]],[[370277730,1310531620],[386930130,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=it-IT\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=it-IT\u0026"]]],[["http://cbk0.googleapis.com/cbk?","http://cbk1.googleapis.com/cbk?"]],[["http://khm0.googleapis.com/kh?v=67\u0026hl=it-IT\u0026","http://khm1.googleapis.com/kh?v=67\u0026hl=it-IT\u0026"],null,null,null,null,"67"],[["http://mt0.googleapis.com/mapslt?hl=it-IT\u0026","http://mt1.googleapis.com/mapslt?hl=it-IT\u0026"]],[["http://mt0.googleapis.com/mapslt/ft?hl=it-IT\u0026","http://mt1.googleapis.com/mapslt/ft?hl=it-IT\u0026"]],[["http://mt0.googleapis.com/vt?hl=it-IT\u0026","http://mt1.googleapis.com/vt?hl=it-IT\u0026"]]],["it-IT","US",null,0,null,null,"http://maps.gstatic.com/mapfiles/","http://csi.gstatic.com","https://maps.googleapis.com","http://maps.googleapis.com"],["http://maps.gstatic.com/intl/it_it/mapfiles/api-3/10/18","3.10.18"],[3533843749],1.0,null,null,null,null,0,"",null,null,0,"http://khm.googleapis.com/mz?v=122\u0026",null,"https://earthbuilder.google.com","https://earthbuilder.googleapis.com"], loadScriptTime);
  };
  var loadScriptTime = (new Date).getTime();
  getScript("http://maps.gstatic.com/intl/it_it/mapfiles/api-3/10/18/main.js");
})();


/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 *Get formetted user Info with coords, country, administrative area and mac address
 *@return a valid formatted xml value
 */

function getFormattedUserInfo(){
    var uInfo = "";
    try{
        if(macAddress){
            uInfo += "<mac-addr>" + macAddress + "</mac-addr>";
        }
        if(lastPosition.coords){
            uInfo += "<latitude>" + lastPosition.coords.latitude +"</latitude>";
            uInfo += "<longitude>" + lastPosition.coords.longitude +"</longitude>";
        }
        if(lastPosition.components['country']['short']){
            uInfo += "<country>" + lastPosition.components['country']['short'] +"</country>"

        }
        if(lastPosition.components['administrative_area_level_1']['short']){
            uInfo += "<prov>" + lastPosition.components['administrative_area_level_2']['short'] +"</prov>"
        }
    }
    catch(e){
        //Do nothing
        debugAlert(e.toString());
    }
    return uInfo;
}

/*
 *Send an xml without response
 *@param message
 * * the xml to send
 */
function bardahlLogSend(message){
    debugAlert(message);
    try{
        $.ajax({
            type: "POST",
            url: "http://intranet.bardahl.it/MaroilWebServices/BardahlCatalog",
            contentType: "text/xml",
            dataType: "xml",
            data: message
        });
    }
    catch(ex){
        //Do nothing
        debugAlert(e.toString());
    }
}

/*
 *#####################################
 *          Asinc Log request
 *#####################################
 */

//
function catalogLogForSettore(settore){
    var action = "getCatalogLog";
    var soapMsg = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
        + "<S:Envelope xmlns:S=\"http://schemas.xmlsoap.org/soap/envelope/\">"
        + "<S:Header/>"
        + "<S:Body>"
        + "<ns2:" + action + " xmlns:ns2=\"" + "http://services.maroil.it/" + "\">";
    soapMsg += getFormattedUserInfo();
    soapMsg += "<settore>" + settore + "</settore>"
        + "</ns2:" + action + ">"
        + "</S:Body>"
        + "</S:Envelope>";
    bardahlLogSend(soapMsg);
}

//
function catalogGroupLogForGruppo(settore, gruppo, subGruppo) {
    var action = "getCatalogGroupLog";
    var soapMsg = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
        + "<S:Envelope xmlns:S=\"http://schemas.xmlsoap.org/soap/envelope/\">"
        + "<S:Header/>"
        + "<S:Body>"
        + "<ns2:" + action + " xmlns:ns2=\"" + "http://services.maroil.it/" + "\">";
    soapMsg += getFormattedUserInfo();
    soapMsg += "<settore>" + settore + "</settore>"
        + "<gruppo>" + gruppo +"</gruppo>"
        + "<subgruppo>" + subGruppo +"</subgruppo>"
        + "</ns2:" + action + ">"
        + "</S:Body>"
        + "</S:Envelope>";
    bardahlLogSend(soapMsg);
}

//
function catalogLogForProdotto(prod_id) {
    var action = "getCatalogProdLog";
    var soapMsg = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
        + "<S:Envelope xmlns:S=\"http://schemas.xmlsoap.org/soap/envelope/\">"
        + "<S:Header/>"
        + "<S:Body>"
        + "<ns2:" + action + " xmlns:ns2=\"" + "http://services.maroil.it/" + "\">";
    soapMsg += getFormattedUserInfo();
    soapMsg += "<prodotto>" + prod_id + "</prodotto>"
        + "</ns2:" + action + ">"
        + "</S:Body>"
        + "</S:Envelope>";
    bardahlLogSend(soapMsg);
}

//
function shopListLogWithRadius(raggio) {
    var action = "getShopListLog";
    var soapMsg = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
        + "<S:Envelope xmlns:S=\"http://schemas.xmlsoap.org/soap/envelope/\">"
        + "<S:Header/>"
        + "<S:Body>"
        + "<ns2:" + action + " xmlns:ns2=\"" + "http://services.maroil.it/" + "\">";
    soapMsg += getFormattedUserInfo();
    soapMsg += "<raggio>" + raggio + "</raggio>"
        + "</ns2:" + action + ">"
        + "</S:Body>"
        + "</S:Envelope>";
    bardahlLogSend(soapMsg);
}

//
function shopLogWithID(shop_id) {
    var action = "getShopLog";
    var soapMsg = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
        + "<S:Envelope xmlns:S=\"http://schemas.xmlsoap.org/soap/envelope/\">"
        + "<S:Header/>"
        + "<S:Body>"
        + "<ns2:" + action + " xmlns:ns2=\"" + "http://services.maroil.it/" + "\">";
    soapMsg += getFormattedUserInfo();
    soapMsg += "<shop>" + shop_id + "</shop>"
        + "</ns2:" + action + ">"
        + "</S:Body>"
        + "</S:Envelope>";
    bardahlLogSend(soapMsg);
}

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var myMap;
//var lastPosition;
var nearStores;
var currentRange = 50;
var selectedStore;
var directionsDisplay;
var watchID = null;
var watchCount = 0;
var maxwatch = 10;

/**
 * Converts to radians
 * @param x
 * @return double
 */
function rad(x) { 
    return x * Math.PI / 180 
}

/**
 * Calculate the distance in kilometers between two points using the Haversine algo.
 * @param p1latitude
 * @param p1longitude
 * @param p2latitude
 * @param p2longitude
 * @return int the distance (in Km)
 */
function distanceCalc(p1latitude, p1longitude, p2latitude, p2longitude) {
    var R = 6371;
    var dLat  = this.rad(p2latitude - p1latitude);
    var dLong = this.rad(p2longitude - p1longitude);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(rad(p1latitude)) * Math.cos(rad(p2latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return d;
}

/**
 * Round a number
 * @param num
 * * the number to round
 * @param dec
 * * number of decimal places you want rounded to
 * @return double
 */
function roundNumber(num, dec) {
    var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
    return result;
}

/**
 * STORES INITIALIZATION
 * inizialize the stores page
 */

function storesInit(){
//nothing to do
}

/**
 * Define action on shop button
 * @return void
 */
function storesButtonAction() {
    /*Vado ai negozi senza localizzazione
    nearStores = new Array();
    nearStores[0] = new Array();
    nearStores[0]['dscocp'] = "peppino";
    nearStores[0]['indica'] = "via fwefewfew";
    nearStores[0]['distanceKM'] = "tanti";
    nearStores[0]['locaca'] = "ddd";
    nearStores[0]['provca'] = "fr";
    nearStores[0]['ntelca'] = "33333";
    nearStores[1] = new Array();
    nearStores[1]['dscocp'] = "peppino2";
    nearStores[1]['indica'] = "via fewwfw2";
    nearStores[1]['distanceKM'] = "tanti2";
    nearStores[1]['locaca'] = "ddd2";
    nearStores[1]['provca'] = "fr2";
        storesDraw();
        return;
    
    */
    
    prepareHomepageChange();
    showLoading("Acquisizione delle coordinate gps");
    nearStores = null;
    if(!checkConnection()){
        errorAndReturnHome("Nessuna connessione");
        return;
    }
        
    navigator.geolocation.getCurrentPosition(myLocationSuccess, myLocationError, {
        maximumAge:600000,
        timeout: 600000
    });
    /*watchID = navigator.geolocation.watchPosition(myLocationSuccess, myLocationError, {
        maximumAge: 3000, 
        timeout: 5000, 
        enableHighAccuracy: true
    });*/
    watchCount = 0;
}

/**
 * Stop geolocation watch operations
 * @return void
 */
function clearWatch() {
    if (watchID != null) {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
    }
}
      
/**
 * Geolocation success
 * @return void
 */
function myLocationSuccess(position) {
    /*
    alert(
    'Latitude: '           + position.coords.latitude              + '<br />' +
    'Longitude: '          + position.coords.longitude             + '<br />' +
    'Altitude: '           + position.coords.altitude              + '<br />' +
    'Accuracy: '           + position.coords.accuracy              + '<br />' +
    'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
    'Heading: '            + position.coords.heading               + '<br />' +
    'Speed: '              + position.coords.speed                 + '<br />' +
    'Timestamp: '          + position.timestamp                    + '<br />');
    $.mobile.hidePageLoadingMsg();
    */
    //lastPosition.coords = position.coords;
    //clearWatch();
    updateLastPosition(position);
    showLoading("Cerco i rivenditori Bardahl");
    storesSoapRequest(position.coords.latitude, position.coords.longitude, currentRange);
/*GEOCODER
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          $('#address').val(results[0].formatted_address);
          $('#latitude').val(marker.getPosition().lat());
          $('#longitude').val(marker.getPosition().lng());
        }
      }
    });
    */
}
  

/**
 * Geolocation error
 * @return void
 */
function myLocationError(error) {
    //watchCount = watchCount + 1;
    //if(watchCount > maxwatch) {
        //max attempts reached 
        //clearWatch();
        var message = "GPS: ";
        switch (error.code){
            case error.PERMISSION_DENIED:
                message += "Autorizzazione negata";
                break;
            case error.POSITION_UNAVAILABLE:
                message += "Posizione non disponibile";
                break;
            case error.TIMEOUT:
                message += "Impossibile ottenere la posizione";
                break;
            default:
                message += "Errore sconosciuto";
                break;
        }
        //TODO usa l'ultima posizione?
        if(lastPosition && lastPosition.coords && lastPosition.coords.latitude){
            message += "\nDesideri utilizzare l'ultima posizione rilevata?";
            navigator.notification.confirm(message, useLastPositionCallback, "Conferma", "No, Si");
        }
        else{
            errorAndReturnHome(message);
        }
    //}
}

/**
 * use last Position confirmed
 * @return void
 */
function useLastPositionCallback(button) {
    if(button == 2){
        showLoading("Cerco i rivenditori Bardahl");
        storesSoapRequest(lastPosition.coords.latitude, lastPosition.coords.longitude, currentRange);
        return;
    }
    errorAndReturnHome(null);
}

/**
 * Asynchronous request to soap web service action:getShopList 
 * @param latitude
 * @param longitude
 * @param radius
 * @return void
 */
function storesSoapRequest(latitude, longitude, radius) {
    if(latitude != null && longitude != null && radius != null){
        var wsUrl = "http://intranet.bardahl.it/MaroilWebServices/BardahlCatalog";
        var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.maroil.it/"> ' +
        '<soapenv:Header/> ' +
        '<soapenv:Body> ' +
        '<ser:getShopList> ' +
        '<latitude>' + latitude + '</latitude> ' +
        '<longitude>' + longitude + '</longitude> ' +
        '<raggio>' + radius + '</raggio>' +
        //  '<prov> </prov> '+
        '</ser:getShopList> ' +
        '</soapenv:Body> ' +
        '</soapenv:Envelope>';
        
        $.ajax({
            type: "POST",
            url: wsUrl,
            contentType: "text/xml",
            dataType: "xml",
            data: soapRequest,
            success: storesSoapRequestSuccess,
            error: storesSoapRequestError
        });
    }
    else {
        errorAndReturnHome("Impossibile scaricare i rivenditori");
    }
}

/**
 * Eleborate data on success after soap request to getShopList action
 * @param data
 * @param status
 *  the status of the request
 * @param req
 *  the request contain the response XML data
 * @return void
 */
function storesSoapRequestSuccess(data, status, req) {
    var xml = $(req.responseXML);
    var stores = $(xml).find("rivenditore");

    if(stores == null || $(stores).length == 0){
        errorAndReturnHome("Nessun rivenditore a " + currentRange + " Km da qui");
        return;
    }
    try{
        nearStores = new Array();
        
        $("#storesTitle").text("Rivenditori a " + currentRange + " Km da qui (" + $(stores).length + ")");
        
        for(var i = 0; i < $(stores).length; i++){
            var store = $(stores[i]).children();
            nearStores[i] = new Array();
            for(var j = 0; j < $(store).length; j++){
                //alert(store[j].nodeName);
                nearStores[i][store[j].nodeName] = store[j].textContent;
            }
            //Aggiungo un campo 'distanza dalla posizione corrente (in Km)'
            nearStores[i]['distanceKM'] = roundNumber(distanceCalc(nearStores[i]['latitude'], nearStores[i]['longitude'], lastPosition.coords.latitude, lastPosition.coords.longitude), 1);
        }
        
        //Ordino l'array per distanza dalla posizione corrente
        nearStores.sort(function(a, b){
            return a['distanceKM'] - b['distanceKM'];
        });
        
        storesDraw();
        
        //Log
        shopListLogWithRadius(currentRange);
    }
    catch (e){
        errorAndReturnHome(e.toString());
    }
}

/**
 *Ajax rivenditoriSoapRequest Error
 */
function storesSoapRequestError(data, status, req) {
    errorAndReturnHome("Impossibile scaricare i rivenditori");//"Stato richiesta: " + status);
}

/**
 * move to page after stores are drawed
 * @return void
 */
function goToStores(){
    hideLoading();
    
    /* $("#background").removeClass('background-yellow');
    $("#background").removeClass('background-gray');
    $("#background").addClass('background-gray');*/
    // $('#stores').trigger('create');
   
    $.mobile.changePage('#stores',{
        transition: pageTransition,
        allowSamePageTransition: true
    });

}

/**
 * STORES INITIALIZATION
 * all datas are ready: draw the list
 */

function storesDraw(){
    var storesList = $("#storesList");
    storesList.empty();
    try{
        for (var i = 0; i < $(nearStores).length; i++){
            //list content
            var tag_li = $('<li>').attr({
                "class"           : "ui-li-has-arrow"
            });
            
            var tag_a = $('<a>').attr('data-transition', pageTransition).attr({
                onClick : "storeDetailDraw(" + i + "); return false;"
            });
            
            var tag_h3 = $('<h3>').attr("class", "ui-li-heading").html(nearStores[i]['dscocp']); //Ragione sociale
        
            var tag_p = $('<p>').attr("class", "ui-li-desc").html(nearStores[i]['indica'] + ' - ' + nearStores[i]['locaca'] + ' (' + nearStores[i]['provca'] + ')'); //Indirizzo + città + provincia
      
            var tag_km = $('<span>').attr("class", "ui-li-count").append(nearStores[i]['distanceKM'] + ' Km'); //Distanza dalla posizione corrente
            
            tag_a.append(tag_h3).append(tag_p).append(tag_km);
            tag_li.html(tag_a);
            
            /*
            var tag_li = $('<li>').attr({
                "data-corners"    : "false",
                "data-shadow"     : "false",
                "data-iconshadow" : "true",
                "data-wrapperels" : "true",
                "data-icon"       : "arrow-r",
                "data-iconpos"    : "right",
                "data-theme"      : "c",
                "class"           : "ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c"
            });
      
            var tag_div_1 = $('<div>').attr({
                "class" : "ui-btn-inner ui-li"
            });
      
            var tag_div_2 = $('<div>').attr({
                "class" : "ui-btn-text"
            });
      
            var tag_a = $('<a>').attr('data-transition', pageTransition).attr({
                // href: "#storeDetail?storePos=" + i ,
                onClick : "storeDetailDraw(" + i + "); return false;",
                "class"         : "ui-link-inherit"
            });
      
       
      
            var tag_h3 = $('<h3>').attr("class", "ui-li-heading").append(nearStores[i]['dscocp']); //Ragione sociale
        
            var tag_p = $('<p>').attr("class", "ui-li-desc").append(nearStores[i]['indica'] + ' - ' + nearStores[i]['locaca'] + ' (' + nearStores[i]['provca'] + ')'); //Indirizzo + città + provincia
      
            var tag_km = $('<span>').attr("class", "ui-li-count").append(nearStores[i]['distanceKM'] + ' Km'); //Distanza dalla posizione corrente
            //var tag_km = $('<p>').attr("class", "ui-li-aside").append(' (' + nearStores[i]['distanceKM'] + ' Km)'); //Distanza dalla posizione corrente
            
            var tag_arrow = $('<span>').attr("class", "ui-icon ui-icon-arrow-r ui-icon-shadow");
      
            //composition
            tag_a.append(tag_h3).append(tag_p).append(tag_km);
            tag_div_2.append(tag_a);
            tag_div_1.append(tag_div_2).append(tag_arrow);
            tag_li.append(tag_div_1);
            */
      
            storesList.append(tag_li);
        }//for statement end
        //refresh list view
        storesList.listview("refresh");
    }catch(e) {
        hideLoading()
        debugAlert(e.toString());
        myAlert("Impossibile visualizzare i rivenditori");
    }

    
    //Mostra la pagina generata
    goToStores();
}


/**
 * STORE DETAIL INITIALIZATION
 * inizialize the store detail page
 */
function storeDetailInit(){
//nothing to do
}

/**
 * STORE DETAIL CELL
 * @param image
 * @param title
 * @param description
 * @param linkUrl
 * @return string (or null on error)
 * * a formatted <li> tag
 */
function createStoreDetailLiTag(image, title, description, linkUrl){
    var tag_li = null;
    try{
        tag_li = $('<li>').attr({
            "data-corners"    : "false",
            "data-shadow"     : "false",
            "data-iconshadow" : "true",
            "data-wrapperels" : "true",
            "data-theme"      : "c",
            "class"           : "ui-btn ui-li ui-li-has-thumb ui-btn-up-c"
        });
      
        var tag_div_1 = $('<div>').attr({
            "class" : "ui-btn-inner ui-li"
        });
      
        var tag_div_2 = $('<div>').attr({
            "class" : "ui-btn-text"
        });
        
        var tag_a = $('<a>').attr({
            href: linkUrl,
            "target": "_blank",
            "class"         : "ui-link-inherit"
        });
      
        var tag_img = "";
        if(image){
            //Cerco di centrarlo, porco cane
            tag_img = $('<div>').attr({
                "class" : "rivenditori-li-thumb-wrapper"
            });
            var real_tag_img = $('<img>').attr({
                "src"   : "img/" + image,
                "alt"   : title,
                "class" : "rivenditori-li-thumb"
            //"class" : "ui-li-thumb"
            });
            tag_img.append(real_tag_img);
        }
        var tag_h3 = $('<h3>').attr("class", "ui-li-heading").append(title);
        
        var tag_p = $('<p>').attr("class", "ui-li-desc").append(description);
      
        //var tag_arrow = $('<span>').attr("class", "ui-icon ui-icon-arrow-r ui-icon-shadow");
      
        //composition
        tag_a.append(tag_img).append(tag_h3).append(tag_p);
        tag_div_2.append(tag_a);
        tag_div_1.append(tag_div_2);//.append(tag_arrow);
        tag_li.append(tag_div_1);
      
    }catch(e) {
        tag_li = null;
        debugAlert(e.toString());
        //myAlert("Impossibile visualizzare i rivenditori");
    }
    return tag_li;
}

/**
 * STORE DRAW
 * @param storeIndex
 */
function storeDetailDraw(storeIndex){
    showLoading("Caricamento dettagli");
    try{
        var store = nearStores[storeIndex];
        
        
        //Setto il titolo
        $("#storeDetailTitle").text(store['dscocp']);
        $("#storeTitle").text(store['dscocp']);
        
        var storeList = $("#storeDetailList");
        //Svuoto gli elementi
        storeList.empty();
        
        //Aggiungo i dettagli del punto vendita
        //Numero di telefono
        storeList.append(createStoreDetailLiTag("pencil32.png", "Indirizzo", store['indica'] + ' - ' + store['locaca'] + ' (' + store['provca'] + ')', null));
        //Telefono (se presente)
        if(store['ntelca'] != null && store['ntelca'].length !== 0){
            storeList.append(createStoreDetailLiTag("phone32.png", "Telefono", store['ntelca'], "tel:" + store['ntelca']));
        }
        //Fax (se presente)
        if(store['nfaxca'] != null && store['nfaxca'].length !== 0){
            storeList.append(createStoreDetailLiTag("printer32.png", "Fax", store['nfaxca'], "tel:" + store['nfaxca']));
        }
        //Email (se presente)
        if(store['inelca'] != null && store['inelca'].length !== 0){
            storeList.append(createStoreDetailLiTag("mail32.png", "Email", store['inelca'], "mailto:" + store['inelca']));
        }
        //Sito web (se presente) !il link deve cominciare con http://
        //store['swebca']="http://www.google.it";
        if(store['swebca'] != null && store['swebca'].length !== 0){
            storeList.append(createStoreDetailLiTag("paperstar32.png", "Sito web", store['swebca'], store['swebca']));
        }
        /*
        storeList.append(createStoreDetailLiTag("phone32.png", "Telefono", "339-334455", "tel:339-334455"));
        storeList.append(createStoreDetailLiTag("phone32.png", "Telefono senza link", "339-334455", null));
        storeList.append(createStoreDetailLiTag(null, "Telefono senza link ne immagine", "339-334455", null));
        storeList.append(createStoreDetailLiTag(null, "Telefono con link senza immagine", "339-334455", "tel:339-334455"));
        storeList.append(null);*/
        
        //Show generated page
        goToStoreDetail();
           
        selectedStore = storeIndex;
        
        //Log
        shopLogWithID(store['cdclc0']);
        
    }catch(e) {
        hideLoading();
        debugAlert(e.toString());
        myAlert("Impossibile visualizzare il rivenditore");
    }
//storeList.listview("refresh");
}

/**
 * move to page after store is drawed
 * @return void
 */
function goToStoreDetail(){
    hideLoading();
    $.mobile.changePage('#storeDetail',{
        transition: pageTransition
    });
}

/**
 * Opens a popup for change search range
 * @return void
 */
function openRangeDialog(){
    try{
        $("#rangePopup").popup('open');
    }
    catch(e) {
        debugAlert(e.toString());
        myAlert("Impossibile inizializzare la finestra");
    }
}

/**
 * Perform a new search with the new range
 * also current location is updated
 * @return void
 */
function changeRange(newRange){
    currentRange = newRange;
    $('#rangePopup').popup('close');
    storesButtonAction();
}

/**
 * Call button pressed
 * Prompt the user
 * @return void
 */
function storePhone(){
    navigator.notification.confirm("Vuoi chiamare?", storePhoneCallback, "Conferma", "No, Si");
}

/**
 * Call confirmed
 * @return void
 */
function storePhoneCallback(button) {
    if(button == 2){
        var store = nearStores[selectedStore];
        if(store['ntelca'] != null && store['ntelca'].length !== 0){
            document.location.href = 'tel:' + store['ntelca'];
        }
        else{
            myAlert("Nessun numero da chiamare");
        }
    }
}


/**
 * Directions button pressed
 * Prompt the user
 * @return void
 */
function askDirections(){
    navigator.notification.confirm("Desideri indicazioni?", directionsCallback, "Conferma", "No, Si");
}

/**
 * Directions confirmed
 * @return void
 */
function directionsCallback(button) {
    if(button == 2){
        drawDirectionsMap();
    }
}

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * Define action on catalog view buttons
 * @param settore
 *  A string contain te id of catalog sector
 *    - AU: Auto
 *    - MO: Moto
 * @return void
 */

function catalogButtonAction(settore){
    prepareHomepageChange();
    try{
        var db = window.openDatabase("Bardahl", "1.0", "Bardahl stuff", 2000000);
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM settori WHERE aid = '"+ settore +"';", []
                , function(tx, results){
                    var len = results.rows.length;
                    if(len == 0){
                        if(!checkConnection()){
                            errorAndReturnHome("Nessuna connessione");
                            return;
                        }
                        catalogSoapRequest(settore);
                    }else {
                        //goToCatalog(settore);
                        catalogDoQuery(settore);
                    }
                }, errorCB);
        });
    }
    catch(e){
        debugAlert(e.toString());
        errorAndReturnHome("Impossibile scaricare il catalogo");
    }
}


/**
 * Asynchronous request to soap web service action:getCatalog 
 * @param settore
 * @return void
 */
function catalogSoapRequest(settore){
    if(settore != null){
        showLoading("Catalogo in download");
        var wsUrl = "http://intranet.bardahl.it/MaroilWebServices/BardahlCatalog";
        //var wsUrl = "http://192.168.0.2:8080/MaroilWebServices/BardahlCatalog";
        var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.maroil.it/"> \
   <soapenv:Header/> \
   <soapenv:Body> \
      <ser:getCatalog> \
         <settore>' + settore + '</settore> \
      </ser:getCatalog> \
   </soapenv:Body> \
</soapenv:Envelope>';
    
        $.ajax({
            type: "POST",
            url: wsUrl,
            contentType: "text/xml",
            dataType: "xml",
            data: soapRequest,
            success: function(data, status, req) {
                catalogSoapRequestSuccess(data, status, req, settore);
            },
            error: catalogSoapRequestError
        });
    }
    else {
        debugAlert('Parametri non validi');
        errorAndReturnHome("Impossibile scaricare il catalogo");
    }
}

/**
 * Eleborate data on success after soap request to getCatalog action
 * @param data
 * @param status
 *  the status of the request
 * @param req
 *  the request contain the response XML data
 * @param settore
 * @return void
 */
function catalogSoapRequestSuccess(data, status, req, settore) {
    //ho scaricato il catalogo del settore indicato, inserisco i dati in db sqlite
    try{
        var db = window.openDatabase("Bardahl", "1.0", "Bardahl stuff", 2000000);
        var xml = $(req.responseXML);
        var settori = $(xml).find("settore");
        var cSettori = settori.children();
    
        var queries = new Array();
        if(cSettori.length > 1){
            //il primo figlio è atitle del settore
            queries.push('INSERT INTO settori (aid, atitle) VALUES ("' + settore + '", "' + cSettori[0].textContent + '"); ');
            for(var i = 1; i < $(cSettori).length; i++){
                //prendo i children di gruppi che rappresentano le info gruppo e i sottogruppi
                var jSections = $(cSettori[i]).children();
                var gruppoArray;   
                var gruppoStart = true; //quando comincia un nuovo gruppo
                jSections.each(
                    function( intSectionIndex ){
                        //primo livello, i gruppi
                        var jSection = $(this);
                        var nodeValue = (jSection[ 0 ]) ? $.trim(jSection[ 0 ].nodeName) : "";
                        if(nodeValue != 'subgruppo'){
                            if(gruppoStart == true){
                                gruppoArray = new Array();
                                gruppoStart = false;
                            }
                            gruppoArray[nodeValue] = jSection[ 0 ].textContent;
                        }
                        //controllare lo index se > 2 allora ho finito l'intestazione e posso passare al resto
                        else {
                            // salvo il gruppo
                            if(gruppoStart == false){
                                queries.push("\nINSERT INTO gruppi (aid, asettoreId, atitle, aordine) VALUES ('" + gruppoArray['aid'] + "', '"+settore+"', '"+gruppoArray['atitle']+"', '"+gruppoArray['aordine']+"'); ");
                                gruppoStart = true;
                            }
                            //
                            var subgruppoArray;
                            var subgruppoStart = true;
                            jSection.children().each(
                                function( intPartIndex ){
                                    var jPart = $( this );
                                    var nodeValue = (jPart[ 0 ]) ? $.trim(jPart[ 0 ].nodeName) : "";
                                    if(nodeValue != 'prodotto'){
                                        if(subgruppoStart == true){
                                            subgruppoArray = new Array();
                                            subgruppoStart = false;
                                        }
                                        subgruppoArray[nodeValue] = jPart[ 0 ].textContent;
                                    }
                                    else {
                                        // salvo il subgruppo
                                        if(subgruppoStart == false){
                                            queries.push("\nINSERT INTO subgruppi (aid, asettoreId, agruppoId, atitle, aordine) VALUES ('" + subgruppoArray['aid'] + "', '"+settore+ "', '" + gruppoArray['aid'] + "', '"+subgruppoArray['atitle']+"', '"+subgruppoArray['aordine']+"'); ");
                                            subgruppoStart = true;
                                        }
              
                                        //terzo livello, i prodotti
                                        var prodottoArray = new Array();
                                        jPart.children().each(
                                            function( intProdIndex ){
                                                var jProd = $( this );
                                                var nodeValue = (jProd[ 0 ]) ? $.trim(jProd[ 0 ].nodeName) : "";
                                                prodottoArray[nodeValue] = jProd[ 0 ].textContent;
                                            }
                                            );//prodotti each end
                                        queries.push("INSERT INTO prodotti (aid, asettoreId, agruppoId, asubgruppoId, atitle, adesc, adescSint, aplus, acaratteristiche, ascheda, aBigImage, aSmallImage) \
                          VALUES ('" + prodottoArray['aid'] + "', '" + settore + "','" + gruppoArray['aid'] + "','" + subgruppoArray['aid'] + "','"+prodottoArray['atitle']+"','"+prodottoArray['adesc']+"',\
                          '"+prodottoArray['adescSint']+"','"+prodottoArray['aplus']+"','"+prodottoArray['acaratteristiche']+"','"+prodottoArray['ascheda']+"',\
                          '"+prodottoArray['aBigImage']+"','"+prodottoArray['aSmallImage']+"')")
                                    }
                                }
                                );//subgruppi each end
                        }
                    }
                    //fine each jSections
                    );
            }
            db.transaction(function(tx) {
                for(var i = 0; i < queries.length; i++){
                    tx.executeSql(queries[i]);
                }
            }, errorCB, function(){
                catalogDoQuery(settore);
            });
        }
        else {
            //risposta xml vuota o non corretta
            errorAndReturnHome("Catalogo vuoto");
        }
    }
    catch (e){
        debugAlert(e.toString());
        errorAndReturnHome("Impossibile scaricare il catalogo");
    }
}

/**
 *Ajax catalogSoapRequest Error
 */
function catalogSoapRequestError(data, status, req) {
    debugAlert(status);
    errorAndReturnHome("Impossibile scaricare il catalogo");
}


/**
 * move to page after catalog drawing action
 * @return void
 */
function goToCatalog(){
    hideLoading();
    $.mobile.changePage('#catalog',{
        transition: pageTransition
    });
}


/**
 * CATALOG INITIALIZATION
 */
function catalogInit(){
//nothing to do
}

/**
 * CATALOG INITIALIZATION
 * @GET: settore catalogo [AU, MO]
 */
function catalogDoQuery(settore){
    if(settore != null){
        //Log
        catalogLogForSettore(settore);
        //perform query
        //by the sector parameter build the list into content on page #catalog
        var db = window.openDatabase("Bardahl", "1.0", "Bardahl stuff", 2000000);
        db.transaction(function(tx){
            tx.executeSql(" SELECT COUNT(*) AS nprodotti, sg.atitle, sg.aid, sg.aordine, sg.agruppoId, g.atitle AS agruppoTitle, g.asettoreId, s.atitle AS asettoreName \
                      FROM subgruppi AS sg \
                      LEFT JOIN gruppi AS g \
                      LEFT JOIN settori AS s \
                      LEFT JOIN prodotti AS p \
                      WHERE g.aid = sg.agruppoId \
                      AND g.asettoreId = '"+ settore +"' \
                      AND g.asettoreId = s.aid\
                      AND g.asettoreId = sg.asettoreID \
                      AND p.asettoreId = sg.asettoreId \
                      AND p.agruppoId = sg.agruppoId \
                      AND p.asubgruppoId = sg.aid \
                      GROUP BY sg.aid \
                      ORDER BY g.aordine, sg.aordine, sg.atitle; ", []
                , catalogDraw, errorCB);
        });//AND p.asubgruppoId = sg.aid \
     
    }else {
        errorAndReturnHome("Settore non valido");
    }
}

/**
 * Catalog draw page
 * @param tx
 * @param results
 */
function catalogDraw(tx, results) {
    var catalogList = $("#catalogList");
    //Svuoto i contenuti
    catalogList.empty();
    
    
    try{
        //Set title
        $("#catalogTitle").text(results.rows.item(0).asettoreName);
    
        var gruppo = "";
        var len = results.rows.length;
        for (var i=0; i<len; i++){
            //list divider
            if(gruppo != results.rows.item(i).agruppoTitle){
                gruppo = results.rows.item(i).agruppoTitle;
                var listDivider = $('<li>').attr('data-role', 'list-divider').html(results.rows.item(i).agruppoTitle);
                catalogList.append(listDivider);
            }

            //list content
            
            var tag_a = $('<a>').attr('data-transition', pageTransition).attr({
                //href: "products.html?sector=" + results.rows.item(i).asettoreId +"&group=" + results.rows.item(i).agruppoId + "&subgroup=" + results.rows.item(i).aid + "&groupName=" + results.rows.item(i).atitle + "",
                onClick : "productsDoQuery(\"" + results.rows.item(i).asettoreId + "\",\"" + results.rows.item(i).agruppoId + "\",\"" + results.rows.item(i).aid + "\",\"" + results.rows.item(i).atitle + "\"); return false;"
            });
            var tag_h = $('<h3>').attr("class", "ui-li-heading catalog-text").html(results.rows.item(i).atitle);
            var tag_count = $('<span>').attr("class", "ui-li-count").html(results.rows.item(i).nprodotti);
                
            var tag_img = $('<img>').attr({
                "src"   : 'img/catalog-thumb.png',
                "class" : "ui-li-thumb catalog-thumb"
            });
            
            tag_a.append(tag_h).append(tag_count).append(tag_img);
            var tag_li = $('<li>').html(tag_a);
            
            catalogList.append(tag_li);    
        }//for statement end
        catalogList.listview("refresh");
    }catch(e) {
        errorAndReturnHome(e.toString());
    }
    //Show generated page
    goToCatalog();
}


/**
 * PRODUCTS LIST INITIALIZATION
 */
function productsInit() {
//Nothing to do
}

/**
 * move to page products after drawing
 * @return void
 */
function goToProducts() {
    hideLoading();
    $.mobile.changePage('#products',{
        transition: pageTransition
    });
}


/**
 * PRODUCTS LIST INITIALIZATION
 * @param settore
 * @param gruppo
 * @param subgruppo
 * @param titolo
 */
function productsDoQuery(settore, gruppo, subgruppo, titolo) {
    showLoading("Caricamento prodotti");

    //setto il titolo
    $("#productsTitle").text(titolo);
  
    if(settore != null && gruppo != null && subgruppo != null){
        //Perform query
        var db = window.openDatabase("Bardahl", "1.0", "Bardahl stuff", 2000000);
        db.transaction(function(tx){
            tx.executeSql(" SELECT *\
                      FROM prodotti AS p \
                      WHERE p.agruppoId = '" + gruppo + "' \
                      AND p.asettoreId = '" + settore + "' \
                      AND p.asubgruppoId = '" + subgruppo + "' \
                      ORDER BY atitle;", [] , productsDraw, errorCB);
        });
        //Log
        catalogGroupLogForGruppo(settore, gruppo, subgruppo);
    }
    else{
        errorAndReturnHome("Parametri non validi");
    }
}


/**
 * Products draw page
 * @param tx
 * @param results
 */
function productsDraw(tx, results) {

    var catalogList = $("#productsList");
  
    //svuoto i contenuti
    catalogList.empty();
  
    try{
        var gruppo = "";
        var len = results.rows.length;
        for (var i=0; i<len; i++){
            //list divider
            if(gruppo != results.rows.item(i).agruppoTitle){
                gruppo = results.rows.item(i).agruppoTitle;
                var listDivider = $('<li>').attr('data-role', 'list-divider').html(results.rows.item(i).asubgruppoTitle);
                catalogList.append(listDivider);
            }
            //list content
           /* VECCHIO STILE
            var tag_li = $('<li>').attr({
                "data-corners"    : "false",
                "data-shadow"     : "false",
                "data-iconshadow" : "true",
                "data-wrapperels" : "true",
                "data-icon"       : "arrow-r",
                "data-iconpos"    : "right",
                "data-theme"      : "c",
                "class"           : "ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c"
            });
      
            var tag_div_1 = $('<div>').attr({
                "class" : "ui-btn-inner ui-li"
            });
      
            var tag_div_2 = $('<div>').attr({
                "class" : "ui-btn-text"
            });
      
      
            var tag_a = $('<a>').attr('data-transition', pageTransition).attr({
                //href: "productDetail.html?sector=" + results.rows.item(i).asettoreId +"&group=" + results.rows.item(i).agruppoId + "&subgroup=" + results.rows.item(i).asubgruppoId + "&product=" + results.rows.item(i).aid,
                onClick : "productDetailDoQuery(\"" + results.rows.item(i).asettoreId + "\",\"" + results.rows.item(i).agruppoId + "\",\"" + results.rows.item(i).asubgruppoId + "\",\"" + results.rows.item(i).aid + "\"); return false;",
                "class"         : "ui-link-inherit"
            });
      
      
            var tag_img = $('<img>').attr({
                "src"   : results.rows.item(i).aSmallImage,
                "alt"   : results.rows.item(i).atitle,
                "class" : "ui-li-thumb"
            });
      
            var tag_h3 = $('<h3>').attr("class", "ui-li-heading").append(results.rows.item(i).atitle);
        
            var tag_p = $('<p>').attr("class", "ui-li-desc").append(results.rows.item(i).adescSint);
      
            var tag_arrow = $('<span>').attr("class", "ui-icon ui-icon-arrow-r ui-icon-shadow");
      
            //composition
            tag_a.append(tag_img).append(tag_h3).append(tag_p);
            tag_div_2.append(tag_a);
            tag_div_1.append(tag_div_2).append(tag_arrow);
            tag_li.append(tag_div_1);
      */
     
                
            var tag_li = $('<li>').attr({
                "class"           : "ui-li-has-arrow"
            });
            
            var tag_a = $('<a>').attr('data-transition', pageTransition).attr({
                //href: "productDetail.html?sector=" + results.rows.item(i).asettoreId +"&group=" + results.rows.item(i).agruppoId + "&subgroup=" + results.rows.item(i).asubgruppoId + "&product=" + results.rows.item(i).aid,
                onClick : "productDetailDoQuery(\"" + results.rows.item(i).asettoreId + "\",\"" + results.rows.item(i).agruppoId + "\",\"" + results.rows.item(i).asubgruppoId + "\",\"" + results.rows.item(i).aid + "\"); return false;"
            });
            
            var tag_h3 = $('<h3>').attr("class", "ui-li-heading prodotti-text").html(results.rows.item(i).atitle);
        
            var tag_p = $('<p>').attr("class", "ui-li-desc prodotti-text").html(results.rows.item(i).adescSint+'&nbsp;');
      
            var tag_div = $('<div>').attr({
                "class" : "ui-li-thumb prodotti-thumb-div"
            });

            var tag_img = $('<img>').attr({
                "src"   : results.rows.item(i).aSmallImage,
                "alt"   : results.rows.item(i).atitle,
                "class" : "prodotti-thumb",
                "onError" : "this.src='img/xButton.png'"
            });
            
            tag_div.append(tag_img);
            tag_a.append(tag_h3).append(tag_p).append(tag_div);
            tag_li.append(tag_a);
                
                
            catalogList.append(tag_li);
            
            
        }//for statement end
        //refresh elements
        catalogList.listview("refresh");
    }catch(e) {
        hideLoading();
        debugAlert(e.toString());
        errorAndReturnHome("Impossibile visualizzare il catalogo");
    }
    //Show generated page
    goToProducts();
}


/**
 * PRODUCT DETAIL INITIALIZATION
 */
function productDetailInit() {
//Nothing to do
}

function goToProductDetail() {
    hideLoading();
    $.mobile.changePage('#productDetail',{
        transition: pageTransition
    });
}



/**
 * PRODUCT DETAIL INITIALIZATION
 * @param settore
 * @param gruppo
 * @param subgruppo
 * @param prodotto
 */
function productDetailDoQuery(settore, gruppo, subgruppo, prodotto) {
    showLoading("Caricamento prodotto");
    if(settore != null && gruppo != null && subgruppo != null && prodotto != null){
        //Perform query
        var db = window.openDatabase("Bardahl", "1.0", "Bardahl stuff", 2000000);
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM prodotti AS p WHERE p.aid = '" + prodotto + "';", [] , productDetailDraw, errorCB);
        });
        
        //Log
        catalogLogForProdotto(prodotto);
    }else {
        hideLoading();
        myAlert("Parametri non validi");
    }
}

/**
 * Product detail draw page
 * @param tx
 * @param results
 */
function productDetailDraw(tx, results) {
    //Imposto il titolo
    try{
        $("#productDetailTitle").text(results.rows.item(0).atitle);
    
        //Svuoto gli elementi
        $("#image-preview").empty();
        $("#caratteristiche").empty();
        $("#plus-prodotto").empty();
    
        //setto i contenuti
        $("#image-preview").html($('<img>').attr({
            "src"   : results.rows.item(0).aBigImage,
            "alt"   : results.rows.item(0).atitle,
            "class" : "prodotto-img",
            "onError" : "this.src='img/xButton@2x.png'"
        }));
        $("#caratteristiche").html(results.rows.item(0).acaratteristiche);
        $("#plus-prodotto").html(results.rows.item(0).aplus);
  
        goToProductDetail();
    }
    catch(e){
        hideLoading();
        debugAlert(e.toString());
        errorAndReturnHome("Impossibile visualizzare il prodotto");
    }
/*
  content.append($('<p>').append(results.rows.item(0).aid));
  content.append($('<p>').append(results.rows.item(0).agruppoId));
  content.append($('<p>').append(results.rows.item(0).asubgruppoId));
  content.append($('<p>').append(results.rows.item(0).atitle));
  content.append($('<p>').append(results.rows.item(0).adesc));
  content.append($('<p>').append(results.rows.item(0).adescSint));
  content.append($('<p>').append(results.rows.item(0).aplus));
  content.append($('<p>').append(results.rows.item(0).acaratteristiche));
  content.append($('<p>').append(results.rows.item(0).ascheda));
  content.append($('<p>').append(results.rows.item(0).aBigImage));
  content.append($('<p>').append(results.rows.item(0).aSmallImage));
  */
}


/**
 * Newsletter init
 * bind the form submit to ajax function
 * @return void
 */
function newsLetterInit(){
    $("#subscribeform").ajaxForm({
        success : function (response) {
            var $strHtml = $(response); //converto la risposta in html
            var risposta = $strHtml.find('li').eq(0).text().replace(/(^\s+|\s+$)/g, ''); //prendo il primo tag li e trimmo
            if(risposta == null || risposta == ''){
                risposta = "Si è verificato un errore imprevisto";
            }
            navigator.notification.alert(risposta, null, "Risultato dell'iscrizione" , 'Ok');
        },
        error: function (response) {
            navigator.notification.alert("Non è stato possibile inoltrare l'iscrizione al server", null, 'Invio non riuscito' , 'Ok');
        }
    });
}

/**
 * Display a form error
 * @return void
 */
function checkError(message){
    navigator.notification.alert(message, null, 'Campo non valido' , 'Ok');
}

/**
 * Check form and submit it
 * @return void
 */
function checkForm(){
    //Name validation
    var validation = $("#db_nome").val().replace(/(^\s+|\s+$)/g, '');
    if(!validation || validation == ''){
        checkError("Inserisci un nome");
        return;
    }
    
    //Surname validation
    validation = $("#db_cognome").val().replace(/(^\s+|\s+$)/g, '');
    if(!validation || validation == ''){
        checkError("Inserisci un cognome");
        return;
    }
    
    //Email validation
    validation = $("#db_email").val().replace(/(^\s+|\s+$)/g, '');
    if(!validation || validation == ''){
        checkError("Inserisci un'email");
        return;
    }
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(reg.test($("#db_email").val()) == false) {
      checkError("Inserisci un'email valida");
      return;
   }
    
    //Group validation
    if(($("#radioAuto").attr("checked")!= true && $("#radioAuto").attr("checked") != 'checked') && ($("#radioMoto").attr("checked")!= true && $("#radioMoto").attr("checked") != 'checked') && ($("#radioIndustria").attr("checked")!= true && $("#radioIndustria").attr("checked") != 'checked')){
        checkError("Seleziona un gruppo");
        return;
    }
    
    //Agree validation
    if($("#consenso").attr("checked")!= true && $("#consenso").attr("checked") != 'checked'){
        checkError("Devi autorizzare il trattamento dei dati");
        return;
    }
    $("#subscribeform").submit();
}



/**
 * prepare page for draw current stores in a map
 * * draw on show
 * @return void
 */
function drawStoresMap(){
    showLoading("Preparazione mappa");
    try{
        var mapContent = $("#map_canvas");
        //Svuoto gli elementi
        mapContent.empty();
    
        //Opzioni, centro nell'ultima posizione acquisita
        /*
        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(lastPosition.coords.latitude, lastPosition.coords.longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    
        var myMap = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        */
        //mapContent.trigger('create');
        //Show created page

        mapContent.css("height", $(window).height() - 70);
        mapContent.css("width", $(window).width() - 30);

        goToStoresMap();
    
    }catch(e) {
        hideLoading();
        debugAlert(e.toString());
    }
}

/**
 * move to stores map page - draw on show
 * @return void
 */
function goToStoresMap(){
    hideLoading();
    $.mobile.changePage('#storesMap',{
        transition: pageTransition
    });
}


function makeInfoWindowEvent(map, infowindow, title, subtitle, storeId, marker) {
    google.maps.event.addListener(marker, 'click', function() {
        var img = storeId != null ? " <img style=\"vertical-align:middle; height:35px; width:35px;\" src=\"img/info_icon.png\" onclick=\"storeDetailDraw('" + storeId + "');\">" : "";
        var contentString = "<h3>" + title + img + " </h3> <p>" + subtitle + "</p>";

        infowindow.setContent(contentString);
        infowindow.open(map, marker);
    });
}

/**
 * stores map is showed
 * * draw the map
 * @return void
 */
function storesMapShow(){
    //$("#map_canvas").trigger('create');
    try{
        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(lastPosition.coords.latitude, lastPosition.coords.longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true
        }
        
        myMap = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    
    
        var mapBounds = new google.maps.LatLngBounds();
    
        var infowindow = new google.maps.InfoWindow();
        //Add markers
        for(var i = 0; i < $(nearStores).length; i++){
            var latitudeAndLongitude;
            var marker;
            if(nearStores[i]['latitude'] != null &&  nearStores[i]['longitude'] != null){
                latitudeAndLongitude = new google.maps.LatLng (nearStores[i]['latitude'], nearStores[i]['longitude']);
                marker = new google.maps.Marker({ 
                    position: latitudeAndLongitude,
                    map: myMap,
                    title: nearStores[i]['dscocp'],
                    clickable: true
                });
                makeInfoWindowEvent(myMap, infowindow, nearStores[i]['dscocp'],nearStores[i]['indica'] + ' - ' + nearStores[i]['locaca'] + ' (' + nearStores[i]['provca'] + ')', i, marker);
            }
            mapBounds.extend(latitudeAndLongitude);
        }
        //Aggiungo la mia posizionee
        latitudeAndLongitude = new google.maps.LatLng (lastPosition.coords.latitude, lastPosition.coords.longitude);
        var newIcon = new google.maps.MarkerImage(
            'img/blue_dot_circle.png',
            new google.maps.Size(71, 71),
            new google.maps.Point(0, 0),
            new google.maps.Point(17, 34),
            new google.maps.Size(35, 35));
    
        marker = new google.maps.Marker({ 
            position: latitudeAndLongitude,
            map: myMap,
            icon: newIcon,
            title: "La tua posizione",
            clickable: false
        });
        mapBounds.extend(latitudeAndLongitude);
    
        myMap.fitBounds(mapBounds);
        hideLoading();
    /*
    google.maps.event.addListener(myMap, "idle", function(){
        marker.setMap(myMap);
    });
    */
    }catch(e) {
        hideLoading();
        debugAlert(e.toString());
    }
}

/**
 * map is rotated
 * map needs refresh to adapt to new size
 * @return void
 */
function storesMapRotate(){
    var mapContent = $("#map_canvas");
    mapContent.css("height", $(window).height() - 70);
    mapContent.css("width", $(window).width() - 30);
    google.maps.event.trigger(myMap, "resize");
}

/**
 * prepare page for draw direction to current store
 * * will draw on show
 * @return void
 */
function drawDirectionsMap(){
    showLoading("Preparazione mappa");
    try{

        var mapContent = $("#map_directions_canvas");
        //Svuoto gli elementi
        mapContent.empty();
        $("#directionsPanel").empty();

        mapContent.css("height", $(window).height() / 2);
        mapContent.css("width", $(window).width() - 30);

        goToDirectionsMap();
    
    }catch(e) {
        hideLoading();
        debugAlert(e.toString());
    }
}

/**
 * move to page - draw on show
 * @return void
 */
function goToDirectionsMap(){
    hideLoading();
    $.mobile.changePage('#storesDirectionsMap',{
        transition: pageTransition
    });
}

/**
 * map is rotated
 * map needs refresh to adapt to new size
 * @return void
 */
function directionsMapRotate(){
    var mapContent = $("#map_directions_canvas");
    mapContent.css("height", $(window).height() / 2);
    mapContent.css("width", $(window).width() - 30);
    google.maps.event.trigger(myMap, "resize");
}

/**
 * directions map is showed
 * * draw map & directions
 * @return void
 */
function directionsMapShow(){
    //$("#map_canvas").trigger('create');
    try{
        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(lastPosition.coords.latitude, lastPosition.coords.longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            mapTypeControl: false
        }
        
        myMap = new google.maps.Map(document.getElementById("map_directions_canvas"), mapOptions);
    
    
        var mapBounds = new google.maps.LatLngBounds();
    
        var infowindow = new google.maps.InfoWindow();
        //Aggiungo il marker della destinazione
        var latitudeAndLongitude;
        var marker;
        if(nearStores[selectedStore]['latitude'] != null &&  nearStores[selectedStore]['longitude'] != null){
            latitudeAndLongitude = new google.maps.LatLng (nearStores[selectedStore]['latitude'], nearStores[selectedStore]['longitude']);
            marker = new google.maps.Marker({ 
                position: latitudeAndLongitude,
                map: myMap,
                title: nearStores[selectedStore]['dscocp'],
                clickable: true
            });
            makeInfoWindowEvent(myMap, infowindow, nearStores[selectedStore]['dscocp'],nearStores[selectedStore]['indica'] + ' - ' + nearStores[selectedStore]['locaca'] + ' (' + nearStores[selectedStore]['provca'] + ')', selectedStore, marker);
        }
        mapBounds.extend(latitudeAndLongitude);

        //Aggiungo la mia posizionee
        latitudeAndLongitude = new google.maps.LatLng (lastPosition.coords.latitude, lastPosition.coords.longitude);
        var newIcon = new google.maps.MarkerImage(
            'img/blue_dot_circle.png',
            new google.maps.Size(71, 71),
            new google.maps.Point(0, 0),
            new google.maps.Point(17, 34),
            new google.maps.Size(35, 35));
    
        marker = new google.maps.Marker({ 
            position: latitudeAndLongitude,
            map: myMap,
            icon: newIcon,
            title: "La tua posizione",
            clickable: false
        });
        makeInfoWindowEvent(myMap, infowindow, "La tua posizione", "", null, marker);
        mapBounds.extend(latitudeAndLongitude);
    
        myMap.fitBounds(mapBounds);
        
        //Preparo i servizi per l'itinerario'
        var directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(myMap);
        directionsDisplay.setPanel(document.getElementById("directionsPanel"));
        
        var request = {
            origin:lastPosition.coords.latitude + ',' + lastPosition.coords.longitude,
            destination:nearStores[selectedStore]['latitude'] + ',' + nearStores[selectedStore]['longitude'],
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
            else{
                $("#directionsPanel").text("Impossibile calcolare l'itinerario");
                debugAlert("Impossibile calcolare l'itinerario: " + status);
            }
        });
        hideLoading();
        
    }catch(e) {
        hideLoading();
        debugAlert(e.toString());
    }
}
