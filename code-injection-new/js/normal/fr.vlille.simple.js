





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


var watchID = null;
var app = {
	
	myPosition: null,
	watchId: null,
	home_page: null,
	station_list: null,
		
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
   		document.getElementById("waiting_msg").setAttribute('style', 'display:block;');
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
    	$( "#select_nb_stations" ).selectmenu( "disable" );
    	$( "#refresh_button" ).addClass('ui-disabled');
    },
    enableButtons: function(){
    	$( "#checkbox-2" ).checkboxradio( "enable" );
    	$( "#checkbox-3" ).checkboxradio( "enable" );
    	$( "#checkbox-4" ).checkboxradio( "enable" );
		$( "#select_nb_stations" ).selectmenu( "enable" );
		$( "#refresh_button" ).removeClass('ui-disabled');
    },
    load5NearStationsForGet: function(){
    	//console.log('load5NearStationsForGet myPosition: '+app.myPosition);
    	document.getElementById("waiting_msg").setAttribute('style', 'display:block;');
    	if(app.myPosition==null){
    		document.getElementById("waiting_msg").innerHTML = "En attente de géolocalisation...";
    		setTimeout(app.load5NearStationsForGet,2000);
    	}else{
    		if(app.station_list==null){
    			document.getElementById("waiting_msg").innerHTML = "Chargement des stations...";
		    	$.ajax({
					  dataType: "xml",
					  url: 'http://vlille.fr/stations/xml-stations.aspx',
					  data: false,
					  success: app.prepareForGet,
					  error: app.onError
					});
	    	}
    		else{
    			setTimeout(app.prepareForGet,10,app.station_list);
    		}
    	}
    	return false;
    	
    },
    prepareForGet: function(data) {
    	//app.onError(data);return false;
    	if(app.station_list==null){
    		app.station_list = data;
    		document.getElementById("waiting_msg").innerHTML = "Chargement des stations...<label style='color:green'>OK</label><br>Recherche des informations...";
    	}else{
    		document.getElementById("waiting_msg").innerHTML = "Recherche des informations...";
    	}
    	//console.log('prepareForGet');
    	var list = [];
		var html ='';
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

	  		list.push({'id':$(this).attr('id'), 'name':$(this).attr('name'), 'lat':$(this).attr('lat'), 'lng':$(this).attr('lng'), 'dist':dist});
	  	});
		
		//recuperer les
		//distance = racine ( (xB-xA)²+(yB-yA)²)
		list.sort(function(a,b) { return parseFloat(a.dist) - parseFloat(b.dist) } );
		
		var html ='';
		//console.log('value select: ' + document.getElementById('select_nb_stations').value)
		//console.log('value checkbox' + $('#checkbox-2').is(':checked'))
		
		nb_display = 0;
		
		$.each(list, function(index, item) {
			
			if(nb_display < document.getElementById('select_nb_stations').value){
				$.ajax({
				  dataType: "xml",
				  crossDomain: true,
				  url: 'http://vlille.fr/stations/xml-station.aspx?borne='+item.id,
				  data: false,
				  async: false,
				  success: function(info_station){
					station = $(info_station).find('station');
					addresse = station.find('adress').text();
					status = station.find('status').text();
					bikes = station.find('bikes').text();
					attachs = station.find('attachs').text();
					paiement = station.find('paiement').text();
					lastupd = station.find('lastupd').text();
					
					if($('#checkbox-2').is(':checked') && paiement != 'AVEC_TPE'){
						return true;
					}
					if($('#checkbox-3').is(':checked') && (bikes == 0 || bikes == '0')){
						return true;
					}
					if($('#checkbox-4').is(':checked') && (attachs == 0 || attachs == '0')){
						return true;
					}
					
					html += '<li data-role="list-divider">'+item.name+'<p style="float:right;margin-top:1px;"><a href="geo:'+item.lat+','+item.lng+'?q='+item.lat+','+item.lng+'" target="_blank" >Maj: '+lastupd+'</a></p></li>';
					html += '<li>';
					if(status == 1 || status == "1"){
						html += '<p class="station_maintenance">Station en maintenance</p>';
					}
					
					html += '<table class="table_list"><tr>';
					//html += '<td>'+bikes+' <img class="img_list" alt="get" src="./css/images/bike.png"></td>';
					html += '<td>'+bikes+' &nbsp;<div class="div_img_list_bikes" >&nbsp;</div></td>';
					
					//html += '<td>'+attachs+' <img class="img_list" alt="get" src="./css/images/parking.png"></td>';
					html += '<td>'+attachs+' &nbsp;<div class="div_img_list_attachs" >&nbsp;</div></td>';
					
					if(paiement == "AVEC_TPE"){
						//html += '<td><img class="img_list" alt="get" src="./css/images/TPE.jpg"></td>';
						html += '<td><div class="div_img_list_tpe" >&nbsp;</div></td>';
					}else{
						html += '<td>&nbsp;</td>';
					}
					
					//html += '<td><a href="geo:'+item.lat+','+item.lng+'?q='+item.lat+','+item.lng+'" target="_blank" ><img class="img_list" alt="get" src="./css/images/gmaps_icon.png"></a></td>';
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
				  error: app.onError
				});

			}//fin if index < 5
			
	    });
		
		document.getElementById("waiting_msg").setAttribute('style', 'display:none;');
		document.getElementById("loading_div_list_stations").setAttribute('style', 'display:none;');
		$('#stations_get').append($(html));
		$('#stations_get').trigger('create');
		app.enableButtons();
		$('#stations_get').listview('refresh');

    },
    onError: function(error) {
    	app.onPause();
    	$('#img_loading').attr('src','css/images/error_button.png');
    	$('#img_loading').attr('style','width:50%;');
    	html = '';
    	html += '<h1>Erreur inconnue</h1>';
    	html += "<p class='main_message'>Veuillez relancer l'application</p>";
    	document.getElementById("stations_get").innerHTML = html;
	}
};


if (typeof Number.prototype.toRad == 'undefined') {
	  Number.prototype.toRad = function() {
	    return this * Math.PI / 180;
	  }
	}


