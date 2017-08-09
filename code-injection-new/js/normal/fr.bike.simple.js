





        	$(document).ready(function() {
        		app.initialize();
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


var city_infos = [
{
	"name" : "amiens",
	"url" : "www.velam.amiens.fr",
	"lat" : 49.89413492763881,
	"lng" : 2.297398509070277,
	"api" : "JCDecaux"
}, {
	"name" : "besancon",
	"url" : "www.velocite.besancon.fr",
	"lat" : 47.23962163528984,
	"lng" : 6.01727555596672,
	"api" : "JCDecaux"
}, {
	"name" : "bruxelles",
	"url" : "www.villo.be",
	"lat" : 50.82559,
	"lng" : 4.379555,
	"api" : "JCDecaux"
}, {
	"name" : "cergy",
	"url" : "www.velo2.cergypontoise.fr",
	"lat" : 49.0439278452,
	"lng" : 2.06982453728,
	"api" : "JCDecaux"
}, {
	"name" : "creteil",
	"url" : "www.cristolib.fr",
	"lat" : 48.790788616827925,
	"lng" : 2.464890184741269,
	"api" : "JCDecaux"
}, {
	"name" : "marseille",
	"url" : "www.levelo-mpm.fr",
	"lat" : 43.301805741199246,
	"lng" : 5.372302255725486,
	"api" : "JCDecaux"
}, {
	"name" : "mulhouse",
	"url" : "www.velocite.mulhouse.fr",
	"lat" : 47.75108355230376,
	"lng" : 7.333558344545698,
	"api" : "JCDecaux"
}, {
	"name" : "nancy",
	"url" : "www.velostanlib.fr",
	"lat" : 48.69631385870747,
	"lng" : 6.179892417289834,
	"api" : "JCDecaux"
}, {
	"name" : "nantes",
	"url" : "www.bicloo.nantesmetropole.fr",
	"lat" : 47.214194631496476,
	"lng" : -1.529735885980363,
	"api" : "JCDecaux"
}, {
	"name" : "paris",
	"url" : "www.velib.paris.fr",
	"lat" : 48.837555260014625,
	"lng" : 2.257972572706903,
	"api" : "JCDecaux"
}, {
	"name" : "rouen",
	"url" : "cyclic.rouen.fr",
	"lat" : 49.448285193967465,
	"lng" : 1.09419956401142,
	"api" : "JCDecaux"
}, {
	"name" : "toulouse",
	"url" : "www.velo.toulouse.fr",
	"lat" : 43.573924940202886,
	"lng" : 1.451999386383253,
	"api" : "JCDecaux"
},{
  	"name" : "brisbane",
  	"url" : "www.citycycle.com.au",
  	"lat" : -27.452918,
  	"lng" : 153.048607,
	"api" : "JCDecaux"
},{
	"name" : "dublin",
	"url" : "www.dublinbikes.ie",
	"lat" : 53.344603,
	"lng" : -6.263371,
	"api" : "JCDecaux"
  },{
	"name" : "goteborg",
	"url" : "www.goteborgbikes.se",
	"lat" : 57.704675,
	"lng" : 11.992441,
	"api" : "JCDecaux"
},{
	"name" : "ljubljana",
	"url" : "www.bicikelj.si",
	"lat" : 46.044629,
	"lng" : 14.486699,
	"api" : "JCDecaux"
},{
	"name" : "luxembourg",
	"url" : "www.veloh.lu",
	"lat" : 49.6219,
	"lng" : 6.1516,
	"api" : "JCDecaux"
},{
	"name" : "santander",
	"url" : "www.tusbic.es",
	"lat" : 43.47847181103079,
	"lng" : -3.788653145670012,
	"api" : "JCDecaux"
},
{
	"name" : "seville",
	"url" : "www.sevici.es",
	"lat" : 37.385838469752265,
	"lng" : -6.011220377621846,
	"api" : "JCDecaux"
},{
	"name" : "toyama",
	"url" : "www.cyclocity.jp",
	"lat" : 36.697144,
	"lng" : 137.21636,
	"api" : "JCDecaux"
},{
	"name" : "valence",
	"url" : "www.valenbisi.es",
	"lat" : 39.45974606677287,
	"lng" : -0.352781023126671,
	"api" : "JCDecaux"
},{
  	"name" : "toronto",
  	"url" : "https://toronto.bixi.com/data/bikeStations.xml",
  	"lat" : 43.656518,
  	"lng" : -79.389099,
  	"api" : "bixi1"
},
{
  	"name" : "montreal",
  	"url" : "https://montreal.bixi.com/data/bikeStations.xml",
  	"lat" : 45.52697,
  	"lng" : -73.60261,
  	"api" : "bixi1"
},
{
  	"name" : "ottawa",
  	"url" : "https://capitale.bixi.com/data/bikeStations.xml",
  	"lat" : 45.410859,
  	"lng" : -75.684104,
  	"api" : "bixi1"
},
{
  	"name" : "london",
  	"url" : "http://www.tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml",
  	"lat" : 51.49398524,
  	"lng" : -0.136928582,
  	"api" : "bixi1"
},
{
  	"name" : "Washington",
  	"url" : "http://capitalbikeshare.com/data/stations/bikeStations.xml",
  	"lat" : 38.91554,
  	"lng" : -77.03818,
  	"api" : "bixi1"
},
{
  	"name" : "Minneapolis",
  	"url" : "https://secure.niceridemn.org/data2/bikeStations.xml",
  	"lat" : 44.93775,
  	"lng" : -93.29122,
  	"api" : "bixi1"
},
{
  	"name" : "Boston",
  	"url" : "http://www.thehubway.com/data/stations/bikeStations.xml",
  	"lat" : 42.36507,
  	"lng" : -71.1031,
  	"api" : "bixi1"
},
{
  	"name" : "Nice",
  	"url" : "http://www.velobleu.org/cartoV2/libProxyCarto.asp",
  	"lat" : 43.7024895672004,
  	"lng" : 7.23606624316403,
  	"api" : "Veloway"
},
{
  	"name" : "Calais",
  	"url" : "http://www.vel-in.fr/cartoV2/libProxyCarto.asp",
  	"lat" : 50.9440296585055,
  	"lng" : 1.86512508105466,
  	"api" : "Veloway"
},
{
  	"name" : "Vannes",
  	"url" : "http://www.velocea.fr/cartoV2/libProxyCarto.asp",
  	"lat" : 47.6628181616145,
  	"lng" : -2.75553248215488,
  	"api" : "Veloway"
}
];


var watchID = null;
var app = {
	
	myPosition: null,
	watchId: null,
	home_page: null,
	station_list: null,
	
	currentCityName: null,
	currentCityUrl: null,
	currentCityApi: null,
	
	setCurrentCity: function(){
		list=[];
		$.each(city_infos, function(index, item){
			//console.log(item.name);
			
	  		dist = 0;
	  		lat2 = item.lat;
	  		lat1 = app.myPosition.coords.latitude;
	  		
	  		lon2 = item.lng;
	  		lon1 = app.myPosition.coords.longitude;
	  		
			var R = 6371; // km
			var dLat = (lat2-lat1)* Math.PI / 180;
			var dLon = (lon2-lon1)* Math.PI / 180;
			var lat1 = lat1* Math.PI / 180;
			var lat2 = lat2* Math.PI / 180;

			var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var dist = Math.round((R * c) * 10000) / 10 ;

	  		list.push({'name':item.name, 'url':item.url, 'dist':dist,'api':item.api});
	  		
		});
		
		//recuperer les
		//distance = racine ( (xB-xA)²+(yB-yA)²)
		list.sort(function(a,b) { return parseFloat(a.dist) - parseFloat(b.dist) } );
		
		app.currentCityName = list[0]['name'];
		app.currentCityUrl = list[0]['url'];
		app.currentCityApi = list[0]['api'];
		
	},
    // Application Constructor
    initialize: function() {
       this.bindEvents();
       
       //juste pour le dev sur PC
       //app.refreshMyPosition();
       //app.load5NearStationsForGet();
    },
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	app.disableButtons();
    	app.refreshMyPosition();
    	app.load5NearStationsForGet();
    	//setTimeout(app.refreshMyPosition,10);
    	//setTimeout(app.load5NearStationsForGet,20);
   		//app.load5NearStationsForGet();
    },
    refresh: function(){
    	document.getElementById("stations_get").innerHTML = "";
   		document.getElementById("loading_div_list_stations").setAttribute('style', 'display:block;');
   		//document.getElementById("waiting_msg").setAttribute('style', 'display:block;');
   		app.disableButtons();
   		setTimeout(app.load5NearStationsForGet,50);
   		return false;
    },
    refreshMyPosition: function(){
    	var options = { enableHighAccuracy: true, timeout: 60000 };
    	watchID = navigator.geolocation.watchPosition(app.onSuccessWatch, app.onErrorWatch, options);
    },
    onSuccessWatch: function(position) {
    	//console.log("onSuccessWatch lat: " + position.coords.latitude);
		//console.log("onSuccessWatch long: " +position.coords.longitude);
		//console.log("onSuccessWatch accu: " +position.coords.accuracy);
		if(position.coords.accuracy > 55){
			$('#signal_icon').attr('src','css/images/bad_signal.gif');
		}
		if(position.coords.accuracy <= 55 && position.coords.accuracy > 20){
			$('#signal_icon').attr('src','css/images/good_signal.gif');
		}
		if(position.coords.accuracy <= 20){
			$('#signal_icon').attr('src','css/images/perfect_signal.gif');
		}
		if(position.coords.accuracy <= 55){
			app.myPosition = position;
		}else{
			app.myPosition = null;
		}
		return true;	
    },
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("pause", this.onPause, false);
        document.addEventListener("resume", this.onResume, false);
        
    },
    onPause: function(){
    	navigator.geolocation.clearWatch(watchID);
    },
    onResume: function(){
    	setTimeout(app.refreshMyPosition,20);
    	setTimeout(app.refresh,30);
   		//app.load5NearStationsForGet();
    	
    },
    disableButtons: function(){
    	$( "#checkbox-2" ).checkboxradio( "disable" );
    	$( "#checkbox-3" ).checkboxradio( "disable" );
    	$( "#checkbox-4" ).checkboxradio( "disable" );
    	//$( "#select_nb_stations" ).selectmenu( "disable" );
    	$( "#refresh_button" ).addClass('ui-disabled');
    },
    enableButtons: function(){
    	$( "#checkbox-2" ).checkboxradio( "enable" );
    	$( "#checkbox-3" ).checkboxradio( "enable" );
    	$( "#checkbox-4" ).checkboxradio( "enable" );
		//$( "#select_nb_stations" ).selectmenu( "enable" );
		$( "#refresh_button" ).removeClass('ui-disabled');
    },
    load5NearStationsForGet: function(){
    	//console.log('load5NearStationsForGet myPosition: '+app.myPosition);
    	//document.getElementById("waiting_msg").setAttribute('style', 'display:block;');
    	if(app.myPosition==null){
    		//document.getElementById("waiting_msg").innerHTML = "En attente de géolocalisation...";
    		setTimeout(app.load5NearStationsForGet,2000);
    	}else{
    		app.setCurrentCity();
    		
    		switch (app.currentCityApi) {
				case "JCDecaux":
					app.loadJCDecaux();
				break;
				case "bixi1":
					app.loadBixi1();
				break;
				case "Veloway":
					app.loadVeloway();
				break;
			
    		}
    	
    		
    		
    	}
    	return false;
    	
    },
    loadVeloway: function(){
    	$.ajax({
			  dataType: "json",
			  url: app.currentCityUrl,
			  data: false,
			  success: app.prepareForGetloadVeloway,
			  error: app.onError
			});
    },
    prepareForGetloadVeloway: function(data){
    	var list = [];
		var html ='';
		$.each(data.stand, function(index, item){
			if(item.disp == "1"){
		  		dist = 0;
		  		lat2 = item.lat;
		  		lat1 = app.myPosition.coords.latitude;
		  		
		  		lon2 = item.lng;
		  		lon1 = app.myPosition.coords.longitude;
		  		
				var R = 6371; // km
				var dLat = (lat2-lat1)* Math.PI / 180;
				var dLon = (lon2-lon1)* Math.PI / 180;
				var lat1 = lat1* Math.PI / 180;
				var lat2 = lat2* Math.PI / 180;
	
				var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
				        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
				var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
				var dist = Math.round((R * c) * 10000) / 10 ;
				
				
				if(item.wcom == null || item.wcom == "" || !item.wcom){
					name = decodeURIComponent(item.name).replace(/\+/g,' ');
				}else{
					name = decodeURIComponent(item.wcom).replace(/\+/g,' ');
				}

		  		list.push({'id':item.id, 'name':name, 'lat':item.lat, 'lng':item.lng, 'dist':dist, 'nbBikes':item.ap, 'nbEmptyDocks':item.ab});
			}
		});
		
		
		list.sort(function(a,b) { return parseFloat(a.dist) - parseFloat(b.dist) } );
		
		nb_display = 0;
		
		$.each(list, function(index, item) {
			
			if(nb_display < 5){
				
				if($('#checkbox-3').is(':checked') && (item.nbBikes == 0 || item.nbBikes == '0')){
					return true;
				}
				if($('#checkbox-4').is(':checked') && (item.nbEmptyDocks == 0 || item.nbEmptyDocks == '0')){
					return true;
				}
				
				html += '<li data-role="list-divider">'+item.name+'</li>';
				html += '<li>';
				
				
				html += '<table class="table_list"><tr>';
				
				html += '<td>'+item.nbBikes+' &nbsp;<div class="div_img_list_bikes" >&nbsp;</div></td>';
				
				html += '<td>'+item.nbEmptyDocks+' &nbsp;<div class="div_img_list_attachs" >&nbsp;</div></td>';
				
				
				html += '<td><div class="div_img_list_tpe" >&nbsp;</div></td>';
				
				
				html += '<td><a href="geo:'+item.lat+','+item.lng+'?q='+item.lat+','+item.lng+'" target="_blank" ><div class="div_img_list_gmap" >&nbsp;</div></a></td>';
				if(item.dist >= 10000){
					html += '<td><a href="geo:'+item.lat+','+item.lng+'?q='+item.lat+','+item.lng+'" target="_blank" >'+Math.round(item.dist/1000)+' Km</a></td>';
				}else{
					html += '<td><a href="geo:'+item.lat+','+item.lng+'?q='+item.lat+','+item.lng+'" target="_blank" >'+item.dist+' m</a></td>';
				}
				
				html += '</tr></table>';
				
				html += '</li>';
				nb_display += 1;
				
			}
			
		});
		
		$('#stations_get').append($(html));
		app.refreshDivList();
		
    },
    loadBixi1: function(){
    	$.ajax({
			  dataType: "xml",
			  url: app.currentCityUrl,
			  data: false,
			  success: app.prepareForGetBixi1,
			  error: app.onError
			});
    },
    prepareForGetBixi1: function(data){
    	var list = [];
		var html ='';
		//console.log(data);
		$(data).find('station').each(function(){
			//console.log($(this).find('lat').text());
	  		dist = 0;
	  		lat2 = $(this).find('lat').text();
	  		lat1 = app.myPosition.coords.latitude;
	  		
	  		lon2 = $(this).find('long').text();
	  		lon1 = app.myPosition.coords.longitude;
	  		
			var R = 6371; // km
			var dLat = (lat2-lat1)* Math.PI / 180;
			var dLon = (lon2-lon1)* Math.PI / 180;
			var lat1 = lat1* Math.PI / 180;
			var lat2 = lat2* Math.PI / 180;

			var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var dist = Math.round((R * c) * 10000) / 10 ;

	  		list.push({'id':$(this).find('id').text(), 'name':$(this).find('name').text(), 'lat':$(this).find('lat').text(), 'lng':$(this).find('long').text(), 'dist':dist, 'nbBikes':$(this).find('nbBikes').text(), 'nbEmptyDocks':$(this).find('nbEmptyDocks').text()});
	  	});
		
		
		list.sort(function(a,b) { return parseFloat(a.dist) - parseFloat(b.dist) } );
		
		nb_display = 0;
		
		$.each(list, function(index, item) {
			
			if(nb_display < 5){
				
				if($('#checkbox-3').is(':checked') && (item.nbBikes == 0 || item.nbBikes == '0')){
					return true;
				}
				if($('#checkbox-4').is(':checked') && (item.nbEmptyDocks == 0 || item.nbEmptyDocks == '0')){
					return true;
				}
				
				html += '<li data-role="list-divider">'+item.name+'</li>';
				html += '<li>';
				
				
				html += '<table class="table_list"><tr>';
				
				html += '<td>'+item.nbBikes+' &nbsp;<div class="div_img_list_bikes" >&nbsp;</div></td>';
				
				html += '<td>'+item.nbEmptyDocks+' &nbsp;<div class="div_img_list_attachs" >&nbsp;</div></td>';
				
				
				html += '<td><div class="div_img_list_tpe" >&nbsp;</div></td>';
				
				
				html += '<td><a href="geo:'+item.lat+','+item.lng+'?q='+item.lat+','+item.lng+'" target="_blank" ><div class="div_img_list_gmap" >&nbsp;</div></a></td>';
				if(item.dist >= 10000){
					html += '<td><a href="geo:'+item.lat+','+item.lng+'?q='+item.lat+','+item.lng+'" target="_blank" >'+Math.round(item.dist/1000)+' Km</a></td>';
				}else{
					html += '<td><a href="geo:'+item.lat+','+item.lng+'?q='+item.lat+','+item.lng+'" target="_blank" >'+item.dist+' m</a></td>';
				}
				
				html += '</tr></table>';
				
				html += '</li>';
				nb_display += 1;
				
			}
			
		});
		
		$('#stations_get').append($(html));
		app.refreshDivList();
		
    },
    loadJCDecaux: function(){
    	if(app.station_list==null){
			//document.getElementById("waiting_msg").innerHTML = "Chargement des stations...";
			//app.setCurrentCity();
			
			//console.log('current_city: '+app.currentCityName);
			
	    	$.ajax({
				  dataType: "xml",
				  url: 'http://'+app.currentCityUrl+'/service/carto',
				  data: false,
				  success: app.prepareForGet,
				  error: app.onError
				});
    	}
		else{
			setTimeout(app.prepareForGet,10,app.station_list);
		}
    },
    prepareForGet: function(data) {
    	//app.onError(data);return false;
    	if(app.station_list==null){
    		app.station_list = data;
    		//document.getElementById("waiting_msg").innerHTML = "Chargement des stations...<label style='color:green'>OK</label><br>Recherche des informations...";
    	}/*else{
    		document.getElementById("waiting_msg").innerHTML = "Recherche des informations...";
    	}*/
    	//console.log('prepareForGet');
    	var list = [];
		var html ='';
		//console.log(data);
		$(data).find('marker').each(function(){

	  		dist = 0;
	  		lat2 = $(this).attr('lat');
	  		lat1 = app.myPosition.coords.latitude;
	  		
	  		lon2 = $(this).attr('lng');
	  		lon1 = app.myPosition.coords.longitude;
	  		
			var R = 6371; // km
			var dLat = (lat2-lat1)* Math.PI / 180;
			var dLon = (lon2-lon1)* Math.PI / 180;
			var lat1 = lat1* Math.PI / 180;
			var lat2 = lat2* Math.PI / 180;

			var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var dist = Math.round((R * c) * 10000) / 10 ;

	  		list.push({'id':$(this).attr('number'), 'name':$(this).attr('name'), 'lat':$(this).attr('lat'), 'lng':$(this).attr('lng'), 'dist':dist});
	  	});
		
		//recuperer les
		//distance = racine ( (xB-xA)²+(yB-yA)²)
		list.sort(function(a,b) { return parseFloat(a.dist) - parseFloat(b.dist) } );
		//console.log(list);
		var html ='';
		//console.log('value select: ' + document.getElementById('select_nb_stations').value)
		//console.log('value checkbox' + $('#checkbox-2').is(':checked'))
		//return true;
		nb_display = 0;
		
		$.each(list, function(index, item) {
			
			if(nb_display < 5){
				$.ajax({
				  dataType: "xml",
				  crossDomain: true,
				  url: 'http://'+app.currentCityUrl+'/service/stationdetails/'+app.currentCityName+'/'+item.id,
				  data: false,
				  async: false,
				  success: function(info_station){
					station = $(info_station).find('station');
					
					status = station.find('open').text();
					bikes = station.find('available').text();
					attachs = station.find('free').text();
					paiement = station.find('ticket').text();
					//ts_updated = station.find('updated').text();
					//var timestamp = parseInt($.now() / 1000);
					//console.log(timestamp - ts_updated);
					
					if($('#checkbox-2').is(':checked') && (paiement == 0 || paiement == '0')){
						return true;
					}
					if($('#checkbox-3').is(':checked') && (bikes == 0 || bikes == '0')){
						return true;
					}
					if($('#checkbox-4').is(':checked') && (attachs == 0 || attachs == '0')){
						return true;
					}
					
					html += '<li data-role="list-divider">'+item.name+'</li>';
					html += '<li>';
					if(status == 0 || status == "0"){
						html += '<p class="station_maintenance">Station en maintenance</p>';
					}
					
					html += '<table class="table_list"><tr>';
					
					html += '<td>'+bikes+' &nbsp;<div class="div_img_list_bikes" >&nbsp;</div></td>';
					
					html += '<td>'+attachs+' &nbsp;<div class="div_img_list_attachs" >&nbsp;</div></td>';
					
					if(paiement == "1" || paiement == 1){
						html += '<td><div class="div_img_list_tpe" >&nbsp;</div></td>';
					}else{
						html += '<td>&nbsp;</td>';
					}
					
					html += '<td><a href="geo:'+item.lat+','+item.lng+'?q='+item.lat+','+item.lng+'" target="_blank" ><div class="div_img_list_gmap" >&nbsp;</div></a></td>';
					if(item.dist >= 10000){
						html += '<td><a href="geo:'+item.lat+','+item.lng+'?q='+item.lat+','+item.lng+'" target="_blank" >'+Math.round(item.dist/1000)+' Km</a></td>';
					}else{
						html += '<td><a href="geo:'+item.lat+','+item.lng+'?q='+item.lat+','+item.lng+'" target="_blank" >'+item.dist+' m</a></td>';
					}
					
					html += '</tr></table>';
					
					html += '</li>';
					nb_display += 1;
				  },
				  error: function(error){}
				});

			}//fin if index < 5
			
	    });
		
		$('#stations_get').append($(html));
		app.refreshDivList();

    },
    onError: function(error) {
    	app.onPause();
    	$('#img_loading').attr('src','css/images/error_button.png');
    	$('#img_loading').attr('style','width:50%;');
    	html = '';
    	html += '<h1>Erreur inconnue</h1>';
    	html += "<p class='main_message'>Veuillez relancer l'application</p>";
    	document.getElementById("stations_get").innerHTML = html;
	},
	refreshDivList: function(){
		document.getElementById("loading_div_list_stations").setAttribute('style', 'display:none;');
		$('#stations_get').trigger('create');
		app.enableButtons();
		$('#stations_get').listview('refresh');
	}
};


if (typeof Number.prototype.toRad == 'undefined') {
	  Number.prototype.toRad = function() {
	    return this * Math.PI / 180;
	  }
	}


