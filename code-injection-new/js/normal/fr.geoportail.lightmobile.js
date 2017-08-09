










﻿/**
 *
 * @requires OpenLayers.Projection
 * @requires OpenLayers.Bounds
 * @requires jQuery
 *
 **/

/**
 * Initialize srs definitions and territories associations 
 **/
function initSRS () {

   /* 
    * Create a map entry for each srs definition and initialize : 
    *    - OpenLayers.Projection
    *    - srsCode from Proj4JS
    *    - name and shortname for respectively settings and popup label
    *    - projection unit for displaying purpose
    *
    * The map key is a string unique identifier of the srs
    */

   srsDefs = {};
   
   srsDefs['geo'] = {};
   srsDefs['geo'].proj=new OpenLayers.Projection('EPSG:4326');
   srsDefs['geo'].code = srsDefs['geo'].proj.proj.srsCode;
   srsDefs['geo'].name = 'Géographiques';
   srsDefs['geo'].shortName = 'Géographiques';
   srsDefs['geo'].units = srsDefs['geo'].proj.proj.units;
   
   srsDefs['merc'] = {};
   srsDefs['merc'].proj=new OpenLayers.Projection('EPSG:3857');
   srsDefs['merc'].code = srsDefs['merc'].proj.proj.srsCode;
   srsDefs['merc'].name = 'Mercator';
   srsDefs['merc'].shortName = 'Mercator';
   srsDefs['merc'].units = srsDefs['merc'].proj.proj.units;
   
   srsDefs['l93'] = {};
   srsDefs['l93'].proj=new OpenLayers.Projection('IGNF:LAMB93');
   srsDefs['l93'].code = srsDefs['l93'].proj.proj.srsCode;
   srsDefs['l93'].name = 'Lambert&nbsp;93';
   srsDefs['l93'].shortName = 'Lambert&nbsp;93';
   srsDefs['l93'].units = srsDefs['l93'].proj.proj.units;
   
   srsDefs['let'] = {};
   srsDefs['let'].proj=new OpenLayers.Projection('IGNF:LAMBE');
   srsDefs['let'].code = srsDefs['let'].proj.proj.srsCode;
   srsDefs['let'].name = 'Lambert&nbsp;2&nbsp;étendu';
   srsDefs['let'].shortName = 'Lambert&nbsp;2';
   srsDefs['let'].units = srsDefs['let'].proj.proj.units;
   
   srsDefs['utm20w84mart'] = {};
   srsDefs['utm20w84mart'].proj=new OpenLayers.Projection('IGNF:UTM20W84MART');
   srsDefs['utm20w84mart'].code = srsDefs['utm20w84mart'].proj.proj.srsCode;
   srsDefs['utm20w84mart'].name = 'UTM20&nbsp;Martinique';
   srsDefs['utm20w84mart'].shortName = 'UTM20&nbsp;Martinique';
   srsDefs['utm20w84mart'].units = srsDefs['utm20w84mart'].proj.proj.units;
   
   srsDefs['utm20w84guad'] = {};
   srsDefs['utm20w84guad'].proj=new OpenLayers.Projection('IGNF:UTM20W84GUAD');
   srsDefs['utm20w84guad'].code = srsDefs['utm20w84guad'].proj.proj.srsCode;
   srsDefs['utm20w84guad'].name = 'UTM20&nbsp;Guadeloupe';
   srsDefs['utm20w84guad'].shortName = 'UTM20&nbsp;Guadeloupe';
   srsDefs['utm20w84guad'].units = srsDefs['utm20w84guad'].proj.proj.units;
   
   srsDefs['utm43sw84'] = {};
   srsDefs['utm43sw84'].proj=new OpenLayers.Projection('IGNF:UTM43SW84');
   srsDefs['utm43sw84'].code = srsDefs['utm43sw84'].proj.proj.srsCode;
   srsDefs['utm43sw84'].name = 'UTM&nbsp;43S';
   srsDefs['utm43sw84'].shortName = 'UTM&nbsp;43S';
   srsDefs['utm43sw84'].units = srsDefs['utm43sw84'].proj.proj.units;
   
   srsDefs['tera50stereo'] = {};
   srsDefs['tera50stereo'].proj=new OpenLayers.Projection('IGNF:TERA50STEREO');
   srsDefs['tera50stereo'].code = srsDefs['tera50stereo'].proj.proj.srsCode;
   srsDefs['tera50stereo'].name = 'TERA50STEREO';
   srsDefs['tera50stereo'].shortName = 'TERA50STEREO';
   srsDefs['tera50stereo'].units = srsDefs['tera50stereo'].proj.proj.units;
   
   srsDefs['utm39sw84'] = {};
   srsDefs['utm39sw84'].proj=new OpenLayers.Projection('IGNF:UTM39SW84');
   srsDefs['utm39sw84'].code = srsDefs['utm39sw84'].proj.proj.srsCode;
   srsDefs['utm39sw84'].name = 'UTM&nbsp;39S';
   srsDefs['utm39sw84'].shortName = 'UTM&nbsp;39S';
   srsDefs['utm39sw84'].units = srsDefs['utm39sw84'].proj.proj.units;
   
   srsDefs['utm22rgfg95'] = {};
   srsDefs['utm22rgfg95'].proj=new OpenLayers.Projection('IGNF:UTM22RGFG95');
   srsDefs['utm22rgfg95'].code = srsDefs['utm22rgfg95'].proj.proj.srsCode;
   srsDefs['utm22rgfg95'].name = 'UTM&nbsp;22';
   srsDefs['utm22rgfg95'].shortName = 'UTM&nbsp;22';
   srsDefs['utm22rgfg95'].units = srsDefs['utm22rgfg95'].proj.proj.units;
   
   srsDefs['utm42sw84'] = {};
   srsDefs['utm42sw84'].proj=new OpenLayers.Projection('IGNF:UTM42SW84');
   srsDefs['utm42sw84'].code = srsDefs['utm42sw84'].proj.proj.srsCode;
   srsDefs['utm42sw84'].name = 'UTM&nbsp;42S';
   srsDefs['utm42sw84'].shortName = 'UTM&nbsp;42S';
   srsDefs['utm42sw84'].units = srsDefs['utm42sw84'].proj.proj.units;
   
   srsDefs['rgm04utm38s'] = {};
   srsDefs['rgm04utm38s'].proj=new OpenLayers.Projection('IGNF:RGM04UTM38S');
   srsDefs['rgm04utm38s'].code = srsDefs['rgm04utm38s'].proj.proj.srsCode;
   srsDefs['rgm04utm38s'].name = 'UTM&nbsp;38S';
   srsDefs['rgm04utm38s'].shortName = 'UTM&nbsp;38S';
   srsDefs['rgm04utm38s'].units = srsDefs['rgm04utm38s'].proj.proj.units;
   
   srsDefs['rgncutm57s'] = {};
   srsDefs['rgncutm57s'].proj=new OpenLayers.Projection('IGNF:RGNCUTM57S');
   srsDefs['rgncutm57s'].code = srsDefs['rgncutm57s'].proj.proj.srsCode;
   srsDefs['rgncutm57s'].name = 'UTM&nbsp;57S';
   srsDefs['rgncutm57s'].shortName = 'UTM&nbsp;57S';
   srsDefs['rgncutm57s'].units = srsDefs['rgncutm57s'].proj.proj.units;
   
   srsDefs['rgncutm58s'] = {};
   srsDefs['rgncutm58s'].proj=new OpenLayers.Projection('IGNF:RGNCUTM58S');
   srsDefs['rgncutm58s'].code = srsDefs['rgncutm58s'].proj.proj.srsCode;
   srsDefs['rgncutm58s'].name = 'UTM&nbsp;58S';
   srsDefs['rgncutm58s'].shortName = 'UTM&nbsp;58S';
   srsDefs['rgncutm58s'].units = srsDefs['rgncutm58s'].proj.proj.units;
   
   srsDefs['rgncutm59s'] = {};
   srsDefs['rgncutm59s'].proj=new OpenLayers.Projection('IGNF:RGNCUTM59S');
   srsDefs['rgncutm59s'].code = srsDefs['rgncutm59s'].proj.proj.srsCode;
   srsDefs['rgncutm59s'].name = 'UTM&nbsp;59S';
   srsDefs['rgncutm59s'].shortName = 'UTM&nbsp;59S';
   srsDefs['rgncutm59s'].units = srsDefs['rgncutm59s'].proj.proj.units;

   srsDefs['utm40s'] = {};
   srsDefs['utm40s'].proj=new OpenLayers.Projection('IGNF:RGR92UTM40S');
   srsDefs['utm40s'].code = srsDefs['utm40s'].proj.proj.srsCode;
   srsDefs['utm40s'].name = 'UTM&nbsp;40S';
   srsDefs['utm40s'].shortName = 'UTM&nbsp;40S';
   srsDefs['utm40s'].units = srsDefs['utm40s'].proj.proj.units;
   
   srsDefs['rgpfutm5s'] = {};
   srsDefs['rgpfutm5s'].proj=new OpenLayers.Projection('IGNF:RGPFUTM5S');
   srsDefs['rgpfutm5s'].code = srsDefs['rgpfutm5s'].proj.proj.srsCode;
   srsDefs['rgpfutm5s'].name = 'UTM&nbsp;5S';
   srsDefs['rgpfutm5s'].shortName = 'UTM&nbsp;5S';
   srsDefs['rgpfutm5s'].units = srsDefs['rgpfutm5s'].proj.proj.units;
   
   srsDefs['rgpfutm6s'] = {};
   srsDefs['rgpfutm6s'].proj=new OpenLayers.Projection('IGNF:RGPFUTM6S');
   srsDefs['rgpfutm6s'].code = srsDefs['rgpfutm6s'].proj.proj.srsCode;
   srsDefs['rgpfutm6s'].name = 'UTM&nbsp;6S';
   srsDefs['rgpfutm6s'].shortName = 'UTM&nbsp;6S';
   srsDefs['rgpfutm6s'].units = srsDefs['rgpfutm6s'].proj.proj.units;
   
   srsDefs['rgpfutm7s'] = {};
   srsDefs['rgpfutm7s'].proj=new OpenLayers.Projection('IGNF:RGPFUTM7S');
   srsDefs['rgpfutm7s'].code = srsDefs['rgpfutm7s'].proj.proj.srsCode;
   srsDefs['rgpfutm7s'].name = 'UTM&nbsp;7S';
   srsDefs['rgpfutm7s'].shortName = 'UTM&nbsp;7S';
   srsDefs['rgpfutm7s'].units = srsDefs['rgpfutm7s'].proj.proj.units;
   
   srsDefs['reun47gaussl'] = {};
   srsDefs['reun47gaussl'].proj=new OpenLayers.Projection('IGNF:REUN47GAUSSL');
   srsDefs['reun47gaussl'].code = srsDefs['reun47gaussl'].proj.proj.srsCode;
   srsDefs['reun47gaussl'].name = 'Réunion&nbsp;GAUSSL';
   srsDefs['reun47gaussl'].shortName = 'Réunion&nbsp;GAUSSL';
   srsDefs['reun47gaussl'].units = srsDefs['reun47gaussl'].proj.proj.units;
   
   srsDefs['rgspm06u21'] = {};
   srsDefs['rgspm06u21'].proj=new OpenLayers.Projection('IGNF:RGSPM06U21');
   srsDefs['rgspm06u21'].code = srsDefs['rgspm06u21'].proj.proj.srsCode;
   srsDefs['rgspm06u21'].name = 'UTM&nbsp;21';
   srsDefs['rgspm06u21'].shortName = 'UTM&nbsp;21';
   srsDefs['rgspm06u21'].units = srsDefs['rgspm06u21'].proj.proj.units;
   
   srsDefs['utm01sw84'] = {};
   srsDefs['utm01sw84'].proj=new OpenLayers.Projection('IGNF:UTM01SW84');
   srsDefs['utm01sw84'].code = srsDefs['utm01sw84'].proj.proj.srsCode;
   srsDefs['utm01sw84'].name = 'UTM&nbsp;01S';
   srsDefs['utm01sw84'].shortName = 'UTM&nbsp;01S';
   srsDefs['utm01sw84'].units = srsDefs['utm01sw84'].proj.proj.units;
   
   /* 
    * Create an array entry for each territory and initialize : 
    *    - territory short name
    *    - bbox : OpenLayers.Bounds
    *    - list of supported projections (srs keys) for this territory
    *      projection identifier map with srsDefs map key.
    *      In this array, the index of the projection determines the default
    *      projection to apply if needed (projections[0])
    *
    * Beware that the order of territories declaration matters because of the first
    * matching territory will be applied. Be carefull to declare first small territories.
    */
   
   bboxDefs = [];
   bboxDefs.push({
      'name' : 'fxx',
      'bbox' : new OpenLayers.Bounds(-31.17, 27.33, 69.03, 80.83),
      'projections' : ['geo', 'merc', 'l93', 'let']
      });
   bboxDefs.push({
         'name' : 'mtq',
         'bbox' : new OpenLayers.Bounds(-64, 11.7, -59, 15.7),
         'projections' : ['geo', 'merc', 'utm20w84mart']
      });
   bboxDefs.push({
         'name' : 'glp',
         'bbox' : new OpenLayers.Bounds(-63.2, 15.75, -60, 17.5),
         'projections' : ['geo', 'merc', 'utm20w84guad']
      });
   bboxDefs.push({
         'name' : 'sba',
         'bbox' : new OpenLayers.Bounds(-63.19,18,-62.9,18.18),
         'projections' : ['geo', 'merc', 'utm20w84guad']
      });
   bboxDefs.push({
         'name' : 'anf',
         'bbox' : new OpenLayers.Bounds(-64, 11.7, -59, 18.18),
         'projections' : ['geo', 'merc', 'utm20w84guad']
      });
   bboxDefs.push({
         'name' : 'asp',
         'bbox' : new OpenLayers.Bounds(76, -40, 79, -36),
         'projections' : ['geo', 'merc', 'utm43sw84']
      });
   bboxDefs.push({
         'name' : 'atf',
         'bbox' : new OpenLayers.Bounds(132.56, -68.62, 144.54, -64.03),
         'projections' : ['geo', 'merc', 'tera50stereo']
      });
   bboxDefs.push({
         'name' : 'crz',
         'bbox' : new OpenLayers.Bounds(47, -48, 55, -44),
         'projections' : ['geo', 'merc', 'utm39sw84']
      });
   bboxDefs.push({
         'name' : 'guf',
         'bbox' : new OpenLayers.Bounds(-62.1, -4.3, -46, 11.5),
         'projections' : ['geo', 'merc', 'utm22rgfg95']
      });
   bboxDefs.push({
         'name' : 'ker',
         'bbox' : new OpenLayers.Bounds(62, -53, 76, -45),
         'projections' : ['geo', 'merc', 'utm42sw84']
      });
   bboxDefs.push({
         'name' : 'myt',
         'bbox' : new OpenLayers.Bounds(40, -17.5, 56, 3),
         'projections' : ['geo', 'merc', 'rgm04utm38s']
      });
   bboxDefs.push({
         'name' : 'ncl',
         'bbox' : new OpenLayers.Bounds(160, -24.3, 170, -17.1),
         'projections' : ['geo', 'merc', 'rgncutm57s', 'rgncutm58s', 'rgncutm59s']
      });
   bboxDefs.push({
         'name' : 'reu',
         'bbox' : new OpenLayers.Bounds(37.5, -26.2, 60, -17.75),
         'projections' : ['geo', 'merc', 'utm40s', 'reun47gaussl']
      });
   bboxDefs.push({
         'name' : 'pyf',
         'bbox' : new OpenLayers.Bounds(-160, -28.2, -108, 11),
         'projections' : ['geo', 'merc', 'rgpfutm5s', 'rgpfutm6s', 'rgpfutm7s'/*, 'tahaautm05s', 'moorea87u6s', 'tahi79utm6s', 'nuku72u7s'*/]
      });
   bboxDefs.push({
         'name' : 'spm',
         'bbox' : new OpenLayers.Bounds(-60, 43.5, -50, 52),
         'projections' : ['geo', 'merc', 'rgspm06u21']
      });
   bboxDefs.push({
         'name' : 'wlf',
         'bbox' : new OpenLayers.Bounds(-178.5, -14.6, -175.8, -12.8),
         'projections' : ['geo', 'merc', 'utm01sw84']
      });
   bboxDefs.push({
         'name' : 'wld',
         'bbox' : new OpenLayers.Bounds(-180, -85, 180, 85),
         'projections' : ['geo', 'merc']
      });

   // re-transform bbox because data comes in Mercator (EPSG:3857)
      
   var src = new OpenLayers.Projection("EPSG:4326");
   var dest = new OpenLayers.Projection("EPSG:3857");
      
   $.each(bboxDefs, function(key, value) {
      value.bbox.transform(src, dest);
   }); 
      
   // default active bbox set to first declared bbox
   currentBBox = bboxDefs[0];
}


env='android';

/**
 *  config options :
 *  key: IGN contract key
 *  serverUrl: autoconfiguration service url
 *  xmlProxyUrl: js proxy url - set to '' if no proxy
 *  geocodeMethod: 'GET' or 'POST' - method for geocode method (proxy needed if 'POST')
 *  mode: 'min', 'cat' or 'full' - determines if minified, concatenated or full version should be used
 **/
config={
   key: '78lelnw0hzvu0zuq91hyrlqc',
   serverUrl: 'js/autoconf.json',
   xmlProxyUrl: '',
   geocodeMethod: 'GET',
   mode: 'cordova'
}



/**
 * @requires js/config.js
 * @requires jQuery
 **/
 
/** 
 * dynamic loading of required javascript files depending on configured mode
 **/
function loadScripts() {
   
   // define scripts to include for each mode
   var scripts = {
      'apimobile': ['js/geoportal/GeoportalMobile.js'],
      'cordova': ['js/cordova.js','js/cordova-init.js','js/geoportal/GeoportalMobile.js']
   };
   
   // get config mode from config file
   var includes = scripts[config.mode ? config.mode :'full'];

   $.each(includes, function(i, scriptPath) {
        var script = "<script" +
                     " type='text/javascript'" +
                     " src='" + scriptPath + "'" +
                     " charset='UTF-8'" +
                     "></script>";
        document.write(script);    
   });
}

// executed as soon as the file is loaded
loadScripts();





/** Show search bar **/
function toggleSearchOn() {
  $("#searchBar").show();
  $("#searchBtn").attr("src","img/visu/recherche_on.png");
}

/** Hide search bar **/
function toggleSearchOff() {
  $("#searchBar").hide();
  $("#searchBtn").attr("src","img/visu/recherche_off.png");
}

/** Switch search bar depending of its current state **/
function toggleSearch() {
  var searchBar = $('#searchBar');
  if (searchBar.is(':visible')) {
    toggleSearchOff();
  } else {
    toggleSearchOn();
  }
}

function toggleZoomOn() {
  $("#zoom-buttons").show();
}

function toggleZoomOff() {
  $("#zoom-buttons").hide();
}

/** Hide browser address bar on page scroll **/
function hideAddressBar(){
  setTimeout(function(){
    window.scrollTo(0, 1);
  }, 0);
}

function displayCatalog() {
  $("#catalog").show();
  $("#visu").hide();
}

function closeCatalog() {
  $("#catalog").hide();
  $("#visu").show();
}

function displayReglages() {
  refreshSRS();
  $("#reglages").show();
  $("#visu").hide();
}

function closeReglages() {
  $("#reglages").hide();
  $("#visu").show();
  
  if (isTracerEnabled()) {
     refreshPopup();
  }
}

function displayParameters() {
  $("#parameters").show();
  $("#reglages").hide();
}

function closeParameters() {
  $("#parameters").hide();

  refreshParams();

  $("#visu").show();
  
  if (isTracerEnabled()) {
   refreshPopup();
  }
}

function refreshParams() {

   // refresh search bar visibility
  if (isVisibleSearchFormAtLaunch ()) {
    toggleSearchOn();
  }
  else {
    toggleSearchOff();
  }

  // refresh zoom buttons visibility
  if (isVisibleMapTools ()) {
    $("#zoom-buttons").show();
  }
  else {
    $("#zoom-buttons").hide();
  }

}

function backToReglages() {

  refreshParams();
  
  $("#parameters").hide();
  $("#reglages").show();
}

function displayCredits() {
  $("#credits").show();
  $("#reglages").hide();
}

function closeCredits() {
  $("#credits").hide();
  $("#visu").show();
}

function backFromCredits() {
  $("#credits").hide();
  $("#reglages").show();
}

/** 
 * Parameters buttons toggle management
 * type: button identifier 
 **/
function toggleOnOff(type){
  // checkbox management
  if (type=="zoom" || type=="rech"){
    if ($("."+type+".toggleOn").hasClass("hidden")){  
      $("."+type+".toggleOff").addClass("hidden");
      $("."+type+".toggleOn").removeClass("hidden");
    }else{
      $("."+type+".toggleOff").removeClass("hidden");
      $("."+type+".toggleOn").addClass("hidden");
    }
  } // projections selection management
  else{
      $(".param.selected").removeClass("selected");
      $("#"+type).addClass("selected");
      localStorage.setItem('mobile.ign.sys', type);
  }
}

/** Populate parameters options values from localStorage and prepare displaying parameters **/
function loadParams(){

  if (localStorage && (localStorage.getItem('mobile.ign.zoom')==0)){
    $(".toggleOff.zoom").removeClass("hidden");
  }else{
    $(".toggleOn.zoom").removeClass("hidden");
  }

  if (localStorage && (localStorage.getItem('mobile.ign.rech')==0)){
    $(".toggleOff.rech").removeClass("hidden");
  }else{
    $(".toggleOn.rech").removeClass("hidden");
  }
  if (localStorage){
     localStorage.setItem('mobile.ign.geolocate', 0);
  }

  refreshSRS();
}

/** reload available SRS to display on paramaters screen **/
function refreshSRS() {

  // clean selection
  if (localStorage && (localStorage.getItem('mobile.ign.sys')!=null)) {
    $(".param.selected").removeClass("selected");
  }
  
  // get current SRS or assign a default one
  var selectedSRS = currentBBox.projections[0];
  
  if (localStorage && (localStorage.getItem('mobile.ign.sys') != null)){
      selectedSRS = localStorage.getItem('mobile.ign.sys');
  }
  
  // clean container
  $("#srs div").remove();
  
  // search for current territory
  $.each(bboxDefs, function(i, def) {
      // bbox is valid : territory is active.
      if (isValidBBox(def.bbox)) {
         currentBBox = def;
         return false;
      }
  });
  
  // add selection option for each available territory srs
  $.each(currentBBox.projections, function(i, proj) {
      addSRSOption(proj);
  });
  
  // if selected SRS is not valid on this territory, assign the default one
  if (!isValidSRS(selectedSRS)) {
      selectedSRS = currentBBox.projections[0];
  }
  
  // select choosed SRS
  $("#"+selectedSRS).addClass("selected");

}

/**
 * Add SRS in option list
 * proj: string srs identifier
 **/
function addSRSOption(proj) {

   $('<div/>', {
       id: proj,
       'class': 'param'
   }).appendTo('#srs');

   $('<div/>', {
       'class': 'iparam border'
   }).appendTo('#'+proj);
   
   $('<span>'+srsDefs[proj].name+'</span>', {
       'class': 'iparam border'
   }).appendTo('#'+proj+' div');
   
   // bind listener
   $('#'+proj).click(function() {toggleOnOff(proj)});

}

/**
 * Return true if srsId maps to a valid element in active territory projections list
 * srsId: string identifier of the srs to check
 **/
function isValidSRS(srsId) {
   return ($.inArray(srsId, currentBBox.projections) > -1);
}

/**
 * Return true if the bbox is currently valid on map selection : current center part of bbox
 * bbox: OpenLayers.Bounds object to check
 **/
function isValidBBox(bbox) {
   return (bbox.containsLonLat(viewer.getMap().getCenter()));
}

function zoomOff () {
  toggleOnOff('zoom');
  if (localStorage) {
    localStorage.setItem('mobile.ign.zoom', 0);
  }
}

function zoomOn () {
  toggleOnOff('zoom');
  if (localStorage) {
    localStorage.setItem('mobile.ign.zoom', 1);
  }
}

function rechOff () {
  toggleOnOff('rech');
  if (localStorage) {
    localStorage.setItem('mobile.ign.rech', 0);
  }
}

function rechOn () {
  toggleOnOff('rech');
  if (localStorage) {
    localStorage.setItem('mobile.ign.rech', 1);
  }
}

function isVisibleSearchFormAtLaunch () {
  return ((!localStorage) || (!localStorage.getItem('mobile.ign.rech')) || (localStorage.getItem('mobile.ign.rech')==1));
}

function isVisibleMapTools () {
  return ((!localStorage) || (!localStorage.getItem('mobile.ign.zoom')) || (localStorage.getItem('mobile.ign.zoom')==1));
}

function zoomInMap() {
   viewer.map.zoomIn();
}

function zoomOutMap() {
   viewer.map.zoomOut();
}

function emptySearch() {
  $("#lieuRech").val("");
  $("#clearSearch").hide();
  $("#lieuRech").focus();
}

function enableTracing() {

  if (localStorage) {
    localStorage.setItem('mobile.ign.showCoordinates', 1);
  }

  $("#coordBtn").hide();
  $("#coordBtnAct").show();
  $("#tracingPopup").show();

  // Update tracer after a map move
  viewer.getMap().events.register('moveend', null, trace);

  trace();
}

function disableTracing() {

  if (localStorage) {
    localStorage.setItem('mobile.ign.showCoordinates', 0);
  }

  $("#coordBtnAct").hide();
  $("#coordBtn").show();
  $("#tracingPopup").hide();

  // Unregister updating tracer after a map move
  viewer.getMap().events.unregister('moveend', null, trace);

  // clean pointer
  var layers = viewer.getMap().getLayersBy('name','Ici');
  if (layers.length >= 1) {
      var layer = layers[0];
      layer.destroyFeatures();
    }

  //$('#popup').hide();
}

function enableTraking() {
  if (localStorage) {
    localStorage.setItem('mobile.ign.geolocate', 1);
  }
  viewer.getMap().getControlsByClass('OpenLayers.Control.Geolocate')[0].activate();
}

function disableTraking() {
  if (localStorage) {
    localStorage.setItem('mobile.ign.geolocate', 0);
    unLoadGeoloc();
  }
}


function trace(event) {

   var point = viewer.getMap().getCenter();
   centerAndPointer(point.lon, point.lat);
   
   refreshSRS();

   var proj = getProjName();
   addPopup(point, proj, false);
}

function isTracerEnabled() {
   return localStorage.getItem('mobile.ign.showCoordinates') == 1;
}

/** Display clear search control **/
function rechKeyPress () {
   $("#clearSearch").show();
}

/** Clear search after backspace if search input is empty**/
function rechKeyUp (evt) {
   if ((evt.keyCode == 8) && ($("#lieuRech").val() == "")) {
      $("#clearSearch").hide();
   }
}

function zoomClick () {
   if ($("div#toolZoom img.zoom").first().is(":visible")) {
      zoomOff();
   }
   else {
      zoomOn();
   }
}

function searchClick () {
   if ($("div#toolSearch img.rech").first().is(":visible")) {
      rechOff();
   }
   else {
      rechOn();
   }
}
/**
 * Layers catalog initialization
 **/
function initCouches() {

  // get selected layer or choose the first one as default
  if (localStorage && (localStorage.getItem('mobile.ign.couche')!=null)) {
    $("#"+localStorage.getItem('mobile.ign.couche')).addClass("orange");
  } else {
    $('.layer img').first().addClass('orange');
  }
  
  $(".couche").click(function(event){
    // add an orange frame around selected layer and store its value
    if ($("#l"+this.name)[0].className.indexOf("orange")==-1){
      $(".couche").removeClass("orange");
      $("#"+this.name).addClass("orange");
      if (localStorage) {
        localStorage.setItem('mobile.ign.couche', this.name);
      }
    }
    
    updateCouche(viewer);
    closeCatalog();   
    
  });
}

/** Initialization of the webApp depending on the user's parameters **/
function initWebApp() {
  
  if (isVisibleSearchFormAtLaunch()) {
    toggleSearchOn();
  }
  else {
    toggleSearchOff();
  }

  if (isVisibleMapTools()) {
    toggleZoomOn();
  }
  else {
    toggleZoomOff();
  }
  
  // register all listeners for webapp controls
  $("#searchBtn").click(toggleSearch);
   
  $("#lieuRech").keypress(rechKeyPress);
  $("#lieuRech").keyup(function(e) {rechKeyUp(e);});

  $("#catalogBtn").click(displayCatalog);
  $("#reglagesBtn").click(displayReglages);
  $("#parametersBtn").click(displayParameters);
  $("#creditsBtn").click(displayCredits);
  $("#coordBtn").click(enableTracing);
  $("#coordBtnAct").click(disableTracing);

  $("#geolocBtn").click(enableTraking);
  $("#geolocBtnAct").click(disableTraking);

  $("#catalog .closeButton").click(closeCatalog);
  $("#catalog .backButton").click(closeCatalog);

  $("#reglages .closeButton").click(closeReglages);
  $("#reglages .backButton").click(closeReglages);

  $("#parameters .closeButton").click(closeParameters);
  $("#parameters .backButton").click(backToReglages);

  $("#credits .closeButton").click(closeCredits);
  $("#credits .backButton").click(backFromCredits);
  
  $("#toolZoom").click(zoomClick);
  $("#toolSearch").click(searchClick);

  $("#clearSearch").click(emptySearch);

  $("#zoomin").click(zoomInMap);
  $("#zoomout").click(zoomOutMap);
  
  hideAddressBar();
  initSRS();  
  initCouches();
  
  coordinatesSRS = (localStorage && (localStorage.getItem('mobile.ign.coordinatesSRS')!=null)) ? localStorage.getItem('mobile.ign.coordinatesSRS') : "geo";
  localStorage.setItem('mobile.ign.sys', currentBBox.projections[0]);
  localStorage.setItem('mobile.ign.showCoordinates', 0);
}

/** user's default parameters **/
var visibleSearchFormAtLaunch = true;
var visibleMapTools = true;
var coordinatesSRS = true;

/**
 * Function called on dom loaded
 **/
$(function() {
   initWebApp();
   // loadAPI once webapp is fully initialized
   loadAPI();
});

