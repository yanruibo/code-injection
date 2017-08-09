





		
		    var map;
			var flag1;
			var markerArray = [];
			var infoArray = [];
			var	slider_var=0;
	
			$(document).ready(function() {	
				initialize();
				$(".ui-slider-input").hide();
				$('#pg_rtw').live( "pageshow", function( e, data ) {
				});
			});
				
		








		
	
		$(document).ready(function() {	
				initFastButtons();
				setLang();
				populateDate();
				populateTime();
				loadRoute();
		});
       $('.myShowMap').live("pagecreate", function() {
            initialize();
        });

							
	






		$(document).ready(function() {	
				setLang();
		});
		
		function setLang(){
			if (localStorage.getItem("qLang")=="en") myLang="en"; else myLang="el";
			if(myLang=="el") {
				var nText='<p >Η εφαρμογή παρέχεται χωρίς χρέωση και έχει ως στόχο την πληροφόρηση, επιμόρφωση και επικοινωνία των χρηστών-επισκεπτών της. Η πρόσβαση σ’ αυτόν και η χρήση του υπόκειται στους ακόλουθους όρους και κανόνες, οι οποίοι υπερισχύουν κάθε αντίθετης ρητής ή σιωπηρής συμφωνίας μεταξύ των διαχειριστών του παρόντος κόμβου και των χρηστών-επισκεπτών του : <a href="http://www.eweather.gr/index.php?option=com_content&view=article&id=103&lang=el">\'Οροι χρήσης</a></p><p >&nbsp;</p><p >Υποστήριξη: <b>Οι ειδικοί στον Καιρό</b></p><p ><a href="http://www.eweather.gr/index.php?lang=el"><img src="assets/logo.png"></a>&nbsp;&nbsp;<a href="mailto:info@eweather.gr"><img src="assets/email.png"></a></p><p >&nbsp;</p><p >Ανάπτυξη: <b>ews</b></p><p ><a href="http://www.ews.gr/index.php?lang=el"><img src="assets/ews.png"></a>&nbsp;&nbsp;<a href="mailto:info@ews.gr"><img src="assets/email.png"></a></p>';
				$('#b0').html(nText);
			}
	}
	 











$(document).ready(function(){
	//loadCookies();
	// Setting router events: "bc,c,i,bs,s,bh,h"
	initFastButtons();
	setLang();	
	var router=new $.mobile.Router({
                //"#pg_splash(?:[?/](.*))?": {handler:  function(type){ }, events: "s"},
                //"#pg_home(?:[?/](.*))?": {handler:  function(type){ }, events: "i"},
                "#pg_outlook(?:[?/](.*))?": {handler:  function(type){ getOutlook(); }, events: "s"},
                "#pg_pois(?:[?/](.*))?": {handler:  function(type){ showPois(); }, events: "s"},
                "#pg_detail(?:[?/](.*))?": {handler: function(type){ getDetail(); }, events: "s"},
                "#pg_settings(?:[?/](.*))?": {handler: function(type){ loadCookies(); }, events: "s"}
             });
  	});
  
	$(".back-button").bind("click", function() {  changePage("#myPois", "flip", true, false); });	

	$('#dSearch').keydown(function(event) { 
	 		if (event.keyCode == '13') {
				event.preventDefault();
			//	 getPois(document.formSearch.dSearch.value);
            };
	});

	







		
		    var map;
			var flag1;
			var markerArray = [];
			var infoArray = [];
			var	slider_var=0;
	
			$(document).ready(function() {	
				initialize();
				$(".ui-slider-input").hide();
				$('#pg_rtw').live( "pageshow", function( e, data ) {
				});
			});
				
		



  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;
  var oldDirections = [];
  var currentDirections = null;

  function initialize() {
    var myOptions = {
      zoom: 13,
      center: new google.maps.LatLng(-33.879,151.235),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    directionsDisplay = new google.maps.DirectionsRenderer({
        'map': map,
        'preserveViewport': true,
        'draggable': true
    });
    directionsDisplay.setPanel(document.getElementById("directions_panel"));

    google.maps.event.addListener(directionsDisplay, 'directions_changed',
      function() {
        if (currentDirections) {
          oldDirections.push(currentDirections);
          setUndoDisabled(false);
        }
        currentDirections = directionsDisplay.getDirections();
      });

    setUndoDisabled(true);

    calcRoute();
  }

  function calcRoute() {
    var start = '48 Pirrama Road, Pyrmont NSW';
    var end = 'Bondi Beach, NSW';
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  }

  function undo() {
    currentDirections = null;
    directionsDisplay.setDirections(oldDirections.pop());
    if (!oldDirections.length) {
      setUndoDisabled(true);
    }
  }

  function setUndoDisabled(value) {
    document.getElementById("undo").disabled = value;
  }







	 		var map;
			var flag1;
			var directionsService;
			var directionsDisplay;
			var geocoder;
			var stepDisplay;
			var markerArray = [];
			var infoArray = [];
			var travelDate, travelTime, travelSpeed,travelStart,travelEnd;
 		    var originIcon = "assets/start.png";
			var destinationIcon = "assets/stop.png";
			var myFrom, myTo, myOn, myAt, mySpeed, myLang, myDegrees;

	 
			function initialize() {			
				flag1=0;
				var hellas = new google.maps.LatLng(39,21);
				var myOptions = { zoom:7,  mapTypeId: google.maps.MapTypeId.ROADMAP, center: hellas	};
				map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

				directionsService = new google.maps.DirectionsService();		
				directionsDisplay = new google.maps.DirectionsRenderer({
					'map': map,
					'preserveViewport': false,
					'draggable': true,
					'suppressMarkers': true
				});
				stepDisplay = new google.maps.InfoWindow();
				geocoder = new google.maps.Geocoder();
				
				//directionsDisplay.setPanel(document.getElementById("directions_panel"));
				
				//google.maps.event.addListener(map, 'tilesloaded',
				//	 function() {
				//		 alert("Map Loaded");
				//		 google.maps.event.removeListener(listenerHandle);
				//		 calcRoute();
						 
				//	 });
				
			//	if(flag1==0){
					google.maps.event.addListener(directionsDisplay, 'directions_changed',
						  function() {
							  $.mobile.showPageLoadingMsg();
							  //directionsDisplay.setDirections(response);
							  deleteOverlays();
							  showSteps3(directionsDisplay.directions);		
					});	
					flag=1;
			//	}
				saveRoute();
			}
			
			function setLang(){
				if (localStorage.getItem("qLang")=="en") myLang="en"; else myLang="el";
				if(myLang=="el") {
					$('#t1').text("Καθορισμός διαδρομής");
					$('#t2').text("Αφετηρία");
					$('#t3').text("Προορισμός");
					$('#t4').text("Ημερομηνία εκίννησης");
					$('#t5').text("Ωρα εκίννησης");
					$('#t6').text("Μέση ταχύτητα");
					$('#t7').text("Επισκόπιση Καιρού");
					$('#t8').text("Καιρός διαδρομής");
					$('#t9').text("Εύρεση καιρού");
				}
			}
			
			function populateDate(){
				var d=new Date();
				var tm=d.getTime();
				var myOption='';
				var ofs=24 * 60 * 60 * 1000;
				for (i=0; i<8; i++) {
					dt=new Date();
					dt.setTime(tm+(ofs*i));
					
					val=dt.getFullYear()+""+z2(dt.getMonth()+1)+""+z2(dt.getDate());
					lab=z2(dt.getDate())+"/"+z2((dt.getMonth()+1))+"/"+dt.getFullYear();
					if(i!=1){ 
						myOption +='<option value="'+val+'">'+lab+'</option>';	
					} else {
						myOption +='<option selected="true" value="'+val+'">'+lab+'</option>';	
					};
				};
				$("#select-choice-on").html(myOption);
 			    $("#select-choice-on").selectmenu('refresh',true);
 			}



			function populateTime(){
				var d=new Date();
				var tm=d.getTime();
				var myOption='';
				for (i=0; i<24; i++) {
					dt=tm+(i * 24 * 60 * 60);
					val=z2(i)+"00";
					lab=z2(i)+":00";

					if(i!=12){ 
						myOption +='<option value="'+val+'">'+lab+'</option>';	
					} else {
						myOption +='<option selected="true" value="'+val+'">'+lab+'</option>';	
					};

				};
				$("#select-choice-at").html(myOption);
 			    $("#select-choice-at").selectmenu('refresh',true);
 			}

			function z2(val){
				if (val<10) return "0"+val; else return val;	
			}

//			$(document).ready(function(){
				$(".back-button").bind("click", function() {  changePage("#myPois", "flip", true, false); });
			
				var router=new $.mobile.Router({
					"#mySetRoute(?:[?/](.*))?": {handler:  function(type){ initialize(); }, events: "i"},
					"#myShowMap(?:[?/](.*))?": {handler:  function(type){ calcRoute(); }, events: "s"}
				});
						
				setTimeout(function(){	router.destroy();			},120000);	
	//		});
	
	
	
			function calcRoute() {
				$.mobile.showPageLoadingMsg();
				resizeMap();
				loadRoute();
				
				var request = {	origin: myFrom, destination:myTo,travelMode: google.maps.DirectionsTravelMode.DRIVING};

			     directionsService.route(request, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						  var warnings = document.getElementById("directions_panel");
						  warnings.innerHTML = "" + response.routes[0].warnings + "";
				  		  directionsDisplay.setDirections(response);
 	 				//  	  showSteps3(response);
					} else {
						alert("Error:"+status);
					}
					
			  	});
				
				
				
			}
			
			
	
				
		function showSteps3(directionResult) {
				$('#wait').show();

				var myTotal=0;
				var pointsArray = [];
                pointsArray = directionResult.routes[0].overview_path;

				var newsArray = [];
				for (var i = 0; i<pointsArray.length-1; i++) {
					  var dis = myDistance(pointsArray[i].lat(),pointsArray[i].lng(),pointsArray[i+1].lat(),pointsArray[i+1].lng());
					  myTotal=myTotal+parseInt(dis);					
 	                  newsArray.push(myTotal);
				}		
				
				var myPoint=0;
				var myStop=0;
				var nd= new Date();
				var arg="lang="+myLang+"&deg="+myDegrees+"&start="+myOn+myAt+"&speed="+parseInt(mySpeed)+"&tz="+nd.getTimezoneOffset();
				
				//alert(arg);	
				var leg=0;
				var S=parseInt(mySpeed);
				for (var i = 0; i<newsArray.length-1; i++) {
  					  var dis=newsArray[i];							  
					  myStop=(myPoint *0.1) * myTotal;
					  if (dis>myStop) {
	 					  myPoint++;  
						  arg+="&P"+leg+"="+pointsArray[i].lat()+":"+pointsArray[i].lng()+":"+dis;
						  leg++;
					  }
				}
				getRouteWeather(arg);
			}
				

			
			function myDistance(lat1, lng1, lat2, lng2) {
				  var R = 6378137;
				  var dLat = (lat2-lat1) * Math.PI / 180;
				  var dLng = (lng2-lng1) * Math.PI / 180;
				  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
				  Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat1 * Math.PI / 180 ) *
				  Math.sin(dLng/2) * Math.sin(dLng/2);
				  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
				  var d = R * c;
				  return Math.round(d);
			}

			function z(val){ return ""+(val < 10 ? '0' : '') + val;	}
			function deleteOverlays() {for (i = 0; i < markerArray.length; i++) { markerArray[i].setMap(null); };}
			function closeInfos() {for (i = 0; i < infoArray.length; i++) { infoArray[i].close(); }; }
	
			
			//function getLegs(response, status) {
			//	   if (status != google.maps.DistanceMatrixStatus.OK) {
			//		  alert('Error was: ' + status);
			//		} else {
			//		  var origins = response.originAddresses;
			//		  var destinations = response.destinationAddresses;
			//		  var outputDiv = document.getElementById('directions');
			//		  outputDiv.innerHTML = '';
			//		  deleteOverlays();
			
			//		  for (var i = 0; i < origins.length; i++) {
			//			var results = response.rows[i].elements;
			//			addMarker(origins[i], false);
			//			for (var j = 0; j < results.length; j++) {
			//			  addMarker(destinations[j], true);
			//			  outputDiv.innerHTML += origins[i] + " to " + destinations[j]
			//				  + ": " + results[j].distance.text + " in "
			//				  + results[j].duration.text + "<br />";
			//			}
			//		  }
			//		}
			//}
			
   	        function addMarker(location, isDestination) {
					var icon;
					if (isDestination) {
					  icon = destinationIcon;
					} else {
					  icon = originIcon;
					}
					geocoder.geocode({'address': location}, function(results, status) {
					  if (status == google.maps.GeocoderStatus.OK) {
						bounds.extend(results[0].geometry.location);
						map.fitBounds(bounds);
						var marker = new google.maps.Marker({
						  map: map,
						  position: results[0].geometry.location,
						  icon: icon
						});
						markersArray.push(marker);
					  } else {
						alert("Geocode was not successful for the following reason: "
						  + status);
					  }
					});
		    }


			
			
			function attachInstructionText(marker, text) {
			  google.maps.event.addListener(marker, 'click', function() {
				stepDisplay.setContent(text);
				stepDisplay.open(map, marker);
			  });
			}


		function resizeMap() {
			  var mid = document.getElementById('map_canvas');
			  var foot= document.getElementById('map_footer');
			  mid.style.height = ((foot.offsetTop) - (mid.offsetTop))+'px';
			  if(map != null) {	google.maps.event.trigger(map, 'resize');	  }
		}
			

		
		function getRouteWeather(myArgument){
			var infowindow =  new google.maps.InfoWindow({content: "Hi!"});
			//$.ajax({ type: "POST",  url:'bridge.php',  dataType: "xml",
			//data:{fwd:"http://www.eweather.gr/weatherexpert/services/mob1/mobXMLRouteWeather.php",arg:myArgument},		
			$.ajax({ type: "GET",  url:'http://www.eweather.gr/weatherexpert/services/mob1/mobXMLRouteWeather.php?'+myArgument,dataType: "xml",
			 	  success: function(xml) {
					var counter=0;
					$(xml).find("point").each(function(){
							var lat = $(this).find('latitude').text();
							var lng = $(this).find('longitude').text();
							var ele = $(this).find('elevation').text();
							var pos = new google.maps.LatLng(lat,lng);
							var weatherI = $(this).find('weather_icon').text();
							var windI = $(this).find('wind_icon').text();
							var  d = $(this).find('stamp').text();
							var nDate= parseDate(d);
							if($(this).find('weather_icon').text()=="nil"){
							var nText='<div class=\"wRouteDiv\">' +
								'<img class=\"rIcon1" src=\"assets/nil.png\" />' +
								'<span class=\"rError">'+$(this).find('weather_text').text()+'</span>' +
								'</div>';							
							} else {
							var nText='<div class=\"wRouteDiv\">' +
								'<img class=\"wIcon1" src="assets/weather/T'+$(this).find('weather_icon').text()+'.png\" />' +
								'<img class=\"wIcon2" src="assets/wind/'+$(this).find('wind_icon').text()+'.png\" />' +
								'<span class=\"rDate">'+nDate+'</span>' +
								'<span class=\"rHead">'+$(this).find('weather_text').text()+'</span>' +
								'<span class=\"rT\">'+$(this).find('temperature').text()+'</span>' +				
								'<span class=\"rRH\">'+$(this).find('relative_humidity').text()+'</span>' +				
								'</div>';
							};
								
							weatherI="assets/weather/mT"+weatherI+".png";
							windI="assets/wind/m"+windI+".png";

 							 var shadow = new google.maps.MarkerImage(windI,
									  new google.maps.Size(44, 44),
									  new google.maps.Point(0,0),
									  new google.maps.Point(-12, 20));	

								var marker = new google.maps.Marker({ 
									position: pos,	map: map, icon: weatherI, shadow:shadow,	
									title: $(this).find('weather_text').text()	});	
								
							var infoBubble = new InfoBubble({
									map : map,
									maxWidth : 260,
									minWidth : 260,
									maxHeight : 80,
									minHeight : 80,
									shadowStyle : 1,
									padding : 2,
									backgroundColor : '#5A7ED3',									
									borderRadius : 15,
									arrowSize : 15,
									borderWidth : 5,
									borderColor : '#c1dfff',
									disableAutoPan : false,
									hideCloseButton : false,
									arrowPosition : 50,
									arrowStyle : 0
								});
		

							google.maps.event.addListener(marker, "click", function(){ 
								//infowindow.setContent(nText);
          						//infowindow.open(map, marker);	
								 closeInfos();
								 infoBubble.setContent(nText);
						         infoBubble.open(map, marker);				
					      	  });
								
							markerArray.push( marker);
							infoArray.push( infoBubble);
							counter++;
					});
					$.mobile.hidePageLoadingMsg();	
		},
		error:function(){   alert("Error!");     }
		});
		
  }			
				
	    function parseDate(tmp){
			var y1=tmp.substr(0,4);
			var m1=tmp.substr(4,2);
			var d1=tmp.substr(6,2);
			var h1=tmp.substr(8,2);
			var s1=tmp.substr(10,2);
			return(d1+"/"+m1+"/"+y1+" "+h1+":"+s1);
		}
				
		function addDiv(latLng){
		
			 var circle = new google.maps.Circle({
				map: map,
				center: latLng,
				fillColor: "#00FF00",
				fillOpacity: 0.2,
				strokeColor: "#00FF00",
				strokeOpacity: 0.4,
				strokeWeight: 2,
				radius: 18362.55489862987
			 });
			
		}
		
		function displayWeather(){
				var cmd='#myShowMap?s='+$('#from').val()
						     +'&e='+$('#to').val()

							 +'&d='+$('#select-choice-on').val()
							 +'&t='+$('#select-choice-at').val();
				 $.mobile.changePage(cmd, "slide");
				 //console.log(cmd);
		}
		
	
	function saveRoute(){	
		 var myRoute="";
		 myRoute= $('#from').val()+":"
		 		+ $('#to').val()+":"
				+ $('#select-choice-on').val() +":"
				+ $('#select-choice-at').val() +":"
				+ $('#select-choice-speed').val();
		 localStorage.setItem('qRoute', myRoute);
	}

	function loadRoute(){
		 myLang=localStorage.getItem('qLang');
		 myDegrees=localStorage.getItem('qDegrees');

		 var tmpA1=localStorage.getItem('qRoute').split(':');
		 myFrom=tmpA1[0];	
		 myTo=tmpA1[1];	
		 myOn=$('#select-choice-on').val();//tmpA1[2];	
		 myAt=$('#select-choice-at').val();//tmpA1[3];	
		 mySpeed=$('#select-choice-speed').val();//tmpA1[4];	

		if (myFrom == undefined) { myFrom=$('#from').val(); };
		if (myTo == undefined) {  myTo=$('#to').val(); };

	}

			var times=new Array();
			var myLang, myDegrees;
			var indexMid;
			var timePos;
			var mapsize;
			var lastNumber;
			var lastIcao;
			
			
var styles = [
	{
		featureType: 'landscape',
		elementType: 'all',
		stylers: [
			{ hue: '#3f5750' },
			{ saturation: -41 },
			{ lightness: -67 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'administrative',
		elementType: 'all',
		stylers: [
			{ visibility: 'off' }
		]
	},{
		featureType: 'transit',
		elementType: 'all',
		stylers: [
			{ visibility: 'off' }
		]
	},{
		featureType: 'administrative.country',
		elementType: 'geometry',
		stylers: [
			{ hue: '#333333' },
			{ saturation: 0 },
			{ lightness: -61 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'administrative.locality',
		elementType: 'all',
		stylers: [
			{ hue: '#000000' },
			{ saturation: 0 },
			{ lightness: 0 },
			{ visibility: 'off' }
		]
	},{
		featureType: 'road',
		elementType: 'all',
		stylers: [
			{ visibility: 'off' }
		]
	},{
		featureType: 'poi',
		elementType: 'all',
		stylers: [
			{ hue: '#212f4f' },
			{ saturation: -4 },
			{ lightness: -72 },
			{ visibility: 'off' }
		]
	},{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{ hue: '#212f4f' },
			{ saturation: -9 },
			{ lightness: -71 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'water',
		elementType: 'labels',
		stylers: [
			{ hue: '#ffffff' },
			{ saturation: -100 },
			{ lightness: 100 },
			{ visibility: 'on' }
		]
	}
];
			//mapTypeId: google.maps.MapTypeId.ROADMAP
	
			
			function initialize() {	
				setLang();
				flag1=0;
				var hellas = new google.maps.LatLng(39,24);
				var myOptions = { mapTypeControlOptions: { mapTypeIds: ['eWeather',google.maps.MapTypeId.SATELLITE]	}, minZoom:5, zoom:6, maxZoom:16, mapTypeId:'eWeather',panControl: false, zoomControl: false,    scaleControl: true, center: hellas};
				//map = new MapView(this, "GErAVy59qb9SvIkeGbGolgor7zfIlySKXaEkAg");
				map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

				var styledMapType = new google.maps.StyledMapType(styles, { name: 'eWeather' });
				map.mapTypes.set('eWeather', styledMapType);

				resizeMap();				
	 		    google.maps.event.addListener(map, 'tilesloaded', function () {
					getData();
				}); 
				
				populateTimes();
			}
			
			function setLang(){
					if (localStorage.getItem("qLang")=="en") myLang="en"; else myLang="el";
					if(myLang=="el") {
						$('#r1').text("Προηγούμενο");
						$('#r2').text("Επιλογή χρόνου");
						$('#r3').text("Επόμενο");
						$('#r4').text("Καθορισμός χρόνου");
						$('#r5').text("Χρονική περίοδος");
						$('#r6').text("Αναζήτηση δεδομένων");
						$('#r7').text("Καθορισμός χρονικής περιόδου");
						$('#btnFor').text("Πρόγνωση");
					}
				}
	
			function setTimeP(ofs){
				var nTime=parseInt($('#slider').val())+ofs;
				if(nTime>1 && nTime<times.length-1) {
						timePos=nTime;
				};

				if(ofs==0) timePos=indexMid;
				getData();

				$('#slider').val(nTime);
				$('#slider').slider('refresh');
				$('#tmpLabel').text(times[nTime][0]);
			}
			
			function changeTime(ofs){
			    nTime=ofs;
				timePos=ofs;
				getData();	
			}
			
			function setBtn(ofs){
				var nTime=parseInt($('#slider').val())+ofs;
				if(nTime>1 && nTime<times.length-1) {
						$('#slider').val(nTime);
						timePos=nTime;
						$('#tmpLabel').text(times[nTime][0]);
						$('#slider').val(nTime);
						$('#slider').slider('refresh');
				};
				if(ofs==0) timePos=indexMid;
			}

			
			function getData(){
				$.mobile.showPageLoadingMsg();

				if (localStorage.getItem("qLang")=="en") myLang="en"; else myLang="el";
	 	        if (localStorage.getItem("qDegrees")=="F") myDegrees="F"; else myDegrees="C";		

				//alert(myLang+" "+myDegrees+"["+localStorage.getItem("qLang")+"]");
				deleteOverlays();
				
 				var bounds = map.getBounds();
				var zm= map.getZoom();
				var ne = bounds.getNorthEast();
            	var sw = bounds.getSouthWest();
				var x1 = sw.lng();	var y1 = sw.lat();
				var x2 = ne.lng();	var y2 = ne.lat();

				var xx=((x2-x1)/ mapsize)*20;

			    $('#infoTime').text(times[timePos][0]);
				if (timePos<=indexMid){ 
					var myPast=times[timePos][1];
					//HISTORY
					if (times[timePos][0]=="Now") {$('#infoLabel').text("Now"); }else {$('#infoLabel').text(""+times[timePos][0]);}; 
					var arg="LONX1="+x1+"&LONX2="+x2+"+&LATY1="+y1+"&LATY2="+y2+"&DELTA="+xx+"&ZOOM="+zm+"&PAST="+myPast+"&lang="+myLang+"&deg="+myDegrees;
		//			alert(arg);
					mapDownloadMetar(arg); 
				}else {
					var myFDAY=times[timePos][1];
				    $('#infoLabel').text(""+times[timePos][0]); //FORECAST
					var arg="LONX1="+x1+"&LONX2="+x2+"+&LATY1="+y1+"&LATY2="+y2+"&DELTA="+xx+"&ZOOM="+zm+"&FDAY="+myFDAY+"&lang="+myLang+"&deg="+myDegrees;
				    mapDownloadFuture3HR(arg); 
				}			

			}



			
			function mapDownloadMetar(myArgument){
				var infowindow =  new google.maps.InfoWindow({content: "Hi!"});
				//$.ajax({ type: "POST",  url:'bridge.php',  dataType: "xml",
				//data:{fwd:"http://www.eweather.gr/weatherexpert/services/mob1/mobXMLWindowReal.php",arg:myArgument},		
				$.ajax({ type: "GET",  url:'http://www.eweather.gr/weatherexpert/services/mob1/mobXMLWindowReal.php?'+myArgument,  dataType: "xml",
					  success: function(xml) {
						var counter=0;
						$(xml).find("point").each(function(){
							var id=$(this).find('id').text();
							  if(id=="metar"){
								var lat = $(this).find('latitude').text();
								var lng = $(this).find('longitude').text();
								var ele = $(this).find('elevation').text();
								var pos = new google.maps.LatLng(lat,lng);
								var weatherI = $(this).find('weather_icon').text();
								var windI = $(this).find('wind_icon').text();
								var weatherT = $(this).find('weather_text').text();
								var  d = $(this).find('stamp').text();
								var nDate= parseDate(d);
								if($(this).find('weather_icon').text()=="nil.png"){
							var nText='<div class=\"wRouteDiv\">' +
								'<img class=\"rIcon1" src=\"assets/nil.png\" />' +
								'<span class=\"rError">'+$(this).find('weather_text').text()+'</span>' +
								'</div>';							
							} else {
							var nText='<div class=\"wRouteDiv\">' +
								'<img class=\"wIcon1" src="assets/weather/T'+$(this).find('weather_icon').text()+'.png\" />' +
								'<img class=\"wIcon2" src="assets/wind/'+$(this).find('wind_icon').text()+'.png\" />' +
								'<span class=\"rDate">'+nDate+'</span>' +
								'<span class=\"rHead">'+$(this).find('weather_text').text()+'</span>' +
								'<span class=\"rT\">'+$(this).find('temperature').text()+'</span>' +				
								'<span class=\"rRH\">'+$(this).find('relative_humidity').text()+'</span>' +				
								'</div>';
							};
								
							weatherI="assets/weather/mT"+weatherI+".png";
							windI="assets/wind/m"+windI+".png";


								 var shadow = new google.maps.MarkerImage(windI,
									  new google.maps.Size(44, 44),
									  new google.maps.Point(0,0),
									  new google.maps.Point(-6, 20));	
								var marker = new google.maps.Marker({ 
									position: pos,	map: map, icon: weatherI, shadow:shadow,	
									title: $(this).find('weather_text').text()	});	
									
								google.maps.event.addListener(marker, "click", function(){ 
									lastNumber=$(this).find('numberid').text();
									lastIcao=$(this).find('icao').text();
									$('#btnFor').click(function(event) { alert('foo'); });
								    $("#mInfo").html(nText);
									$.mobile.changePage('#pg_info', {role: 'dialog'});	
								  });
									
								markerArray.push( marker);
								counter++;
								if(counter>9) $('#wait').hide();
							}else if(id=="lightning") {
								var lat = $(this).find('latitude').text();
								var lng = $(this).find('longitude').text();
								var strikes = $(this).find('strikes').text();
								var  d = $(this).find('stamp').text();
								var nDate= parseDate(d);
								var pos = new google.maps.LatLng(lat,lng);
								var weatherI = "assets/lt.png";

								var marker = new google.maps.Marker({ 
									position: pos,	map: map, icon: weatherI,		
									title: $(this).find('weather_text').text()	});	

								markerArray.push( marker);
							};
							$.mobile.hidePageLoadingMsg();
						})
			},
			error:function(){   alert("Error 201!");     }
			});
					
		}
			function mapDownloadFuture3HR(myArgument){
				var infowindow =  new google.maps.InfoWindow({content: "Hi!"});
								console.log(myArgument);

				//.ajax({ type: "POST",  url:'bridge.php',  dataType: "xml",
				//data:{fwd:"http://www.eweather.gr/weatherexpert/services/mob1/mobXMLWindowFcst.php", arg:myArgument},		
				$.ajax({ type: "GET",  url:'http://www.eweather.gr/weatherexpert/services/mob1/mobXMLWindowFcst.php?'+myArgument,  dataType: "xml",
				  success: function(xml) {
					var counter=0;
						$(xml).find("point").each(function(){
							var id=$(this).find('id').text();
							if(id=="forecast"){
								var lat = $(this).find('latitude').text();
								var lng = $(this).find('longitude').text();
								var ele = $(this).find('elevation').text();
								var pos = new google.maps.LatLng(lat,lng);
								var weatherI = $(this).find('weather_icon').text();
								var windI = $(this).find('wind_icon').text();
								var  d = $(this).find('stamp').text();
								var nDate= parseDate(d);
								if($(this).find('weather_icon').text()=="nil.png"){
							var nText='<div class=\"wRouteDiv\">' +
								'<img class=\"rIcon1" src=\"assets/nil.png\" />' +
								'<span class=\"rError">'+$(this).find('weather_text').text()+'</span>' +
								'</div>';							
							} else {
							var nText='<div class=\"wRouteDiv\">' +
								'<img class=\"wIcon1" src="assets/weather/T'+$(this).find('weather_icon').text()+'.png\" />' +
								'<img class=\"wIcon2" src="assets/wind/'+$(this).find('wind_icon').text()+'.png\" />' +
								'<span class=\"rDate">'+nDate+'</span>' +
								'<span class=\"rHead">'+$(this).find('weather_text').text()+'</span>' +
								'<span class=\"rT\">'+$(this).find('temperature').text()+'</span>' +				
								'<span class=\"rRH\">'+$(this).find('relative_humidity').text()+'</span>' +				
								'</div>';
							};
								
							weatherI="assets/weather/mT"+weatherI+".png";
							windI="assets/wind/m"+windI+".png";


 							    var shadow = new google.maps.MarkerImage(windI,
									  new google.maps.Size(44, 44),
									  new google.maps.Point(0,0),
									  new google.maps.Point(-6, 20));	
								var marker = new google.maps.Marker({ 
									position: pos,	map: map, icon: weatherI, shadow:shadow,		
									title: $(this).find('weather_text').text()	});	
								google.maps.event.addListener(marker, "click", function(){ 
								    
								    $("#mInfo").html(nText);
									$.mobile.changePage('#pg_info', {role: 'dialog'});	
								  });
									
								markerArray.push( marker);
								counter++;
								if(counter>9) $('#wait').hide();
							};
							$.mobile.hidePageLoadingMsg();
						})
			},
			error:function(){   alert("Error 202!");     }
			});
					
		}
			

			function z(val){ return ""+(val < 10 ? '0' : '') + val;	}
			function deleteOverlays() {for (i = 0; i < markerArray.length; i++) { markerArray[i].setMap(null); };}
			function closeInfos() {for (i = 0; i < infoArray.length; i++) { infoArray[i].close(); }; }
	
			
		function getForecast(){
			alert(lastNymber+ " "+ lastIcao);
		}

		function resizeMap2() {
			  //var mid = document.getElementById('map_canvas');
			  //var foot= document.getElementById('map_footer');
			  //var pg= document.getElementById('pg_rtw');	
			  //mid.style.height = ((foot.offsetTop) - (mid.offsetTop))+'px';
			  //if(map != null) {	google.maps.event.trigger(map, 'resize');	  }
			  //mapsize=$('#map_canvas').width();
		}
			

			function resizeMap() {
			  var mid = document.getElementById('map_canvas');
			  var foot= document.getElementById('map_footer');
			  mid.style.height = ((foot.offsetTop) - (mid.offsetTop))+'px';
			  if(map != null) {	google.maps.event.trigger(map, 'resize');	  };
			  mapsize=$('#map_canvas').width();
		}

	
				
	    function parseDate(tmp){
			var y1=tmp.substr(0,4);
			var m1=tmp.substr(4,2);
			var d1=tmp.substr(6,2);
			var h1=tmp.substr(8,2);
			var s1=tmp.substr(10,2);
			return(d1+"/"+m1+"/"+y1+" "+h1+":"+s1);
		}
				
		function addDiv(latLng){		
			 var circle = new google.maps.Circle({
				map: map,
				center: latLng,
				fillColor: "#00FF00",
				fillOpacity: 0.2,
				strokeColor: "#00FF00",
				strokeOpacity: 0.4,
				strokeWeight: 2,
				radius: 18362.55489862987
			 });
			
		}
		
		function displayWeather(){
				var cmd='#myShowMap?s='+$('#from').val()
						     +'&e='+$('#to').val()
							 +'&d='+$('#select-choice-on').val()
							 +'&t='+$('#select-choice-at').val();
				 $.mobile.changePage(cmd, "slide");
				 //console.log(cmd);
		}
		
		
		function populateTimes(){
			//SET TIME ARRAY
			// Create data entry for HISTORY 
			var nD1 = new Date(); 
			var now_utc = new Date(nD1.getUTCFullYear(), nD1.getUTCMonth(), nD1.getUTCDate(),  nD1.getUTCHours(), nD1.getUTCMinutes(), nD1.getUTCSeconds());
			
			
			var dHH=parseInt(nD1.getUTCHours()/3);
			var t1=0;	var t2=-48;			
			var k=0;			
			for (var hh=t2; hh<=t1; hh=hh+1){
				nD2=new Date(nD1.getUTCFullYear(),nD1.getUTCMonth(),nD1.getUTCDate(),(dHH*3)+parseInt(hh),0);
				vs=z2(nD2.getDate())+"/"+z2(nD2.getMonth()+1)+"/"+nD2.getFullYear()+ " "+z2(nD2.getHours())+"UTC";
				ds=Math.abs(hh-2).toString();
				times[k]=new Array(2);
				times[k][0]=vs;
				times[k][1]=ds;
				//console.log(k+" > "+ vs + " " +ds);
				k++;
			}		
			
			times[k]=new Array(2);
			times[k][0]="Now";
			times[k][1]==0;
			indexMid=k;				
			timePos=k;
			k++;
			
			// Create data entry for FORECAST
			var t1=6;  var t2=144;
			for (hh=t1; hh<=t2; hh=hh+3){
				var nD2=new Date(nD1.getUTCFullYear(),nD1.getUTCMonth(),nD1.getUTCDate(),(dHH*3)+parseInt(hh),0);
				var vs=z2(nD2.getDate())+"/"+z2(nD2.getMonth()+1)+"/"+nD2.getFullYear()+ " "+z2(nD2.getHours())+"UTC";
				var ds=nD2.getFullYear()+z2(nD2.getMonth()+1)+z2(nD2.getDate())+z2(nD2.getHours());
				times[k]=new Array(2);
				times[k][0]=vs;
				times[k][1]=ds;
				//console.log("F > "+ vs + " " +ds);
				k++;
			}

			//alert (k+"   "+times.length);
 		}




		function z2(val){
			if (val<10) return "0"+val; else return val;	
		}

		

function InfoBubble(opt_options) {
	this.extend(InfoBubble, google.maps.OverlayView);
	this.tabs_ = [];
	this.activeTab_ = null;
	this.baseZIndex_ = 100;
	this.isOpen_ = false;
	var options = opt_options || {};
	if (options['backgroundColor'] == undefined) {
		options['backgroundColor'] = this.BACKGROUND_COLOR_;
	}
	if (options['borderColor'] == undefined) {
		options['borderColor'] = this.BORDER_COLOR_;
	}
	if (options['borderRadius'] == undefined) {
		options['borderRadius'] = this.BORDER_RADIUS_;
	}
	if (options['borderWidth'] == undefined) {
		options['borderWidth'] = this.BORDER_WIDTH_;
	}
	if (options['padding'] == undefined) {
		options['padding'] = this.PADDING_;
	}
	if (options['arrowPosition'] == undefined) {
		options['arrowPosition'] = this.ARROW_POSITION_;
	}
	if (options['disableAutoPan'] == undefined) {
		options['disableAutoPan'] = false;
	}
	if (options['disableAnimation'] == undefined) {
		options['disableAnimation'] = false;
	}
	if (options['minWidth'] == undefined) {
		options['minWidth'] = this.MIN_WIDTH_;
	}
	if (options['shadowStyle'] == undefined) {
		options['shadowStyle'] = this.SHADOW_STYLE_;
	}
	if (options['arrowSize'] == undefined) {
		options['arrowSize'] = this.ARROW_SIZE_;
	}
	if (options['arrowStyle'] == undefined) {
		options['arrowStyle'] = this.ARROW_STYLE_;
	}
	this.buildDom_();
	this.setValues(options);
}
window['InfoBubble'] = InfoBubble;
InfoBubble.prototype.ARROW_SIZE_ = 15;
InfoBubble.prototype.ARROW_STYLE_ = 0;
InfoBubble.prototype.SHADOW_STYLE_ = 1;
InfoBubble.prototype.MIN_WIDTH_ = 150;
InfoBubble.prototype.ARROW_POSITION_ = 50;
InfoBubble.prototype.PADDING_ = 10;
InfoBubble.prototype.BORDER_WIDTH_ = 1;
InfoBubble.prototype.BORDER_COLOR_ = '#cccccc';
InfoBubble.prototype.BORDER_RADIUS_ = 10;
InfoBubble.prototype.BACKGROUND_COLOR_ = '#ffffff';
InfoBubble.prototype.extend = function (obj1, obj2) {
	return (function (object) {
			for (var property in object.prototype) {
				this.prototype[property] = object.prototype[property];
			}
			return this;
		}).apply(obj1, [obj2]);
};
InfoBubble.prototype.buildDom_ = function () {
	var bubble = this.bubble_ = document.createElement('DIV');
	bubble.style['position'] = 'absolute';
	bubble.style['zIndex'] = this.baseZIndex_;
	var tabsContainer = this.tabsContainer_ = document.createElement('DIV');
	tabsContainer.style['position'] = 'relative';
	var close = this.close_ = document.createElement('IMG');
	close.style['position'] = 'absolute';
	close.style['width'] = this.px(28);
	close.style['height'] = this.px(28);
	close.style['border'] = 0;
	close.style['zIndex'] = 5;
	close.style['cursor'] = 'pointer';
	close.src = 'assets/map_close.png';
	var that = this;
	google.maps.event.addDomListener(close, 'click', function () {
			that.close();
			google.maps.event.trigger(that, 'closeclick');
		});
	var contentContainer = this.contentContainer_ = document.createElement('DIV');
	contentContainer.style['overflowX'] = 'auto';
	contentContainer.style['overflowY'] = 'auto';
	contentContainer.style['cursor'] = 'default';
	contentContainer.style['clear'] = 'both';
	contentContainer.style['position'] = 'relative';
	var content = this.content_ = document.createElement('DIV');
	contentContainer.appendChild(content);
	var arrow = this.arrow_ = document.createElement('DIV');
	arrow.style['position'] = 'relative';
	var arrowOuter = this.arrowOuter_ = document.createElement('DIV');
	var arrowInner = this.arrowInner_ = document.createElement('DIV');
	var arrowSize = this.getArrowSize_();
	arrowOuter.style['position'] = arrowInner.style['position'] = 'absolute';
	arrowOuter.style['left'] = arrowInner.style['left'] = '50%';
	arrowOuter.style['height'] = arrowInner.style['height'] = '0';
	arrowOuter.style['width'] = arrowInner.style['width'] = '0';
	arrowOuter.style['marginLeft'] = this.px(-arrowSize);
	arrowOuter.style['borderWidth'] = this.px(arrowSize);
	arrowOuter.style['borderBottomWidth'] = 0;
	var bubbleShadow = this.bubbleShadow_ = document.createElement('DIV');
	bubbleShadow.style['position'] = 'absolute';
	bubble.style['display'] = bubbleShadow.style['display'] = 'none';
	bubble.appendChild(close);
	bubble.appendChild(contentContainer);
	arrow.appendChild(arrowOuter);
	arrow.appendChild(arrowInner);
	bubble.appendChild(arrow);
	var stylesheet = document.createElement('style');
	stylesheet.setAttribute('type', 'text/css');
	this.animationName_ = '_ibani_' + Math.round(Math.random() * 10000);
	var css = '.' + this.animationName_ + '{-webkit-animation-name:' +
		this.animationName_ + ';-webkit-animation-duration:0.5s;' + '-webkit-animation-iteration-count:1;}' + '@-webkit-keyframes ' + this.animationName_ + ' {from {' + '-webkit-transform: scale(0)}50% {-webkit-transform: scale(1.2)}90% ' + '{-webkit-transform: scale(0.95)}to {-webkit-transform: scale(1)}}';
	stylesheet.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(stylesheet);
};
InfoBubble.prototype.setBackgroundClassName = function (className) {
	this.set('backgroundClassName', className);
};
InfoBubble.prototype['setBackgroundClassName'] = InfoBubble.prototype.setBackgroundClassName;
InfoBubble.prototype.backgroundClassName_changed = function () {
	this.content_.className = this.get('backgroundClassName');
};
InfoBubble.prototype['backgroundClassName_changed'] = InfoBubble.prototype.backgroundClassName_changed;
InfoBubble.prototype.setTabClassName = function (className) {
	this.set('tabClassName', className);
};
InfoBubble.prototype['setTabClassName'] = InfoBubble.prototype.setTabClassName;
InfoBubble.prototype.tabClassName_changed = function () {
	this.updateTabStyles_();
};
InfoBubble.prototype['tabClassName_changed'] = InfoBubble.prototype.tabClassName_changed;
InfoBubble.prototype.getArrowStyle_ = function () {
	return parseInt(this.get('arrowStyle'), 10) || 0;
};
InfoBubble.prototype.setArrowStyle = function (style) {
	this.set('arrowStyle', style);
};
InfoBubble.prototype['setArrowStyle'] = InfoBubble.prototype.setArrowStyle;
InfoBubble.prototype.arrowStyle_changed = function () {
	this.arrowSize_changed();
};
InfoBubble.prototype['arrowStyle_changed'] = InfoBubble.prototype.arrowStyle_changed;
InfoBubble.prototype.getArrowSize_ = function () {
	return parseInt(this.get('arrowSize'), 10) || 0;
};
InfoBubble.prototype.setArrowSize = function (size) {
	this.set('arrowSize', size);
};
InfoBubble.prototype['setArrowSize'] = InfoBubble.prototype.setArrowSize;
InfoBubble.prototype.arrowSize_changed = function () {
	this.borderWidth_changed();
};
InfoBubble.prototype['arrowSize_changed'] = InfoBubble.prototype.arrowSize_changed;
InfoBubble.prototype.setArrowPosition = function (pos) {
	this.set('arrowPosition', pos);
};
InfoBubble.prototype['setArrowPosition'] = InfoBubble.prototype.setArrowPosition;
InfoBubble.prototype.getArrowPosition_ = function () {
	return parseInt(this.get('arrowPosition'), 10) || 0;
};
InfoBubble.prototype.arrowPosition_changed = function () {
	var pos = this.getArrowPosition_();
	this.arrowOuter_.style['left'] = this.arrowInner_.style['left'] = pos + '%';
	this.redraw_();
};
InfoBubble.prototype['arrowPosition_changed'] = InfoBubble.prototype.arrowPosition_changed;
InfoBubble.prototype.setZIndex = function (zIndex) {
	this.set('zIndex', zIndex);
};
InfoBubble.prototype['setZIndex'] = InfoBubble.prototype.setZIndex;
InfoBubble.prototype.getZIndex = function () {
	return parseInt(this.get('zIndex'), 10) || this.baseZIndex_;
};
InfoBubble.prototype.zIndex_changed = function () {
	var zIndex = this.getZIndex();
	this.bubble_.style['zIndex'] = this.baseZIndex_ = zIndex;
	this.close_.style['zIndex'] = zIndex + 1;
};
InfoBubble.prototype['zIndex_changed'] = InfoBubble.prototype.zIndex_changed;
InfoBubble.prototype.setShadowStyle = function (shadowStyle) {
	this.set('shadowStyle', shadowStyle);
};
InfoBubble.prototype['setShadowStyle'] = InfoBubble.prototype.setShadowStyle;
InfoBubble.prototype.getShadowStyle_ = function () {
	return parseInt(this.get('shadowStyle'), 10) || 0;
};
InfoBubble.prototype.shadowStyle_changed = function () {
	var shadowStyle = this.getShadowStyle_();
	var display = '';
	var shadow = '';
	var backgroundColor = '';
	switch (shadowStyle) {
	case 0:
		display = 'none';
		break;
	case 1:
		shadow = '10px 25px 20px rgba(0,0,0,0.5)';
		backgroundColor = 'transparent';
		break;
	case 2:
		shadow = '-140px 15px 10px rgba(0,0,0,0.2)';
		backgroundColor = 'transparent';
		break;
	}
	this.bubbleShadow_.style['boxShadow'] = this.bubbleShadow_.style['webkitBoxShadow'] = this.bubbleShadow_.style['MozBoxShadow'] = shadow;
	this.bubbleShadow_.style['backgroundColor'] = backgroundColor;
	if (this.isOpen_) {
		this.bubbleShadow_.style['display'] = display;
		this.draw();
	}
};
InfoBubble.prototype['shadowStyle_changed'] = InfoBubble.prototype.shadowStyle_changed;
InfoBubble.prototype.showCloseButton = function () {
	this.set('hideCloseButton', false);
};
InfoBubble.prototype['showCloseButton'] = InfoBubble.prototype.showCloseButton;
InfoBubble.prototype.hideCloseButton = function () {
	this.set('hideCloseButton', true);
};
InfoBubble.prototype['hideCloseButton'] = InfoBubble.prototype.hideCloseButton;
InfoBubble.prototype.hideCloseButton_changed = function () {
	this.close_.style['display'] = this.get('hideCloseButton') ? 'none' : '';
};
InfoBubble.prototype['hideCloseButton_changed'] = InfoBubble.prototype.hideCloseButton_changed;
InfoBubble.prototype.setBackgroundColor = function (color) {
	if (color) {
		this.set('backgroundColor', color);
	}
};
InfoBubble.prototype['setBackgroundColor'] = InfoBubble.prototype.setBackgroundColor;
InfoBubble.prototype.backgroundColor_changed = function () {
	var backgroundColor = this.get('backgroundColor');
	this.contentContainer_.style['backgroundColor'] = backgroundColor;
	this.arrowInner_.style['borderColor'] = backgroundColor + ' transparent transparent';
	this.updateTabStyles_();
};
InfoBubble.prototype['backgroundColor_changed'] = InfoBubble.prototype.backgroundColor_changed;
InfoBubble.prototype.setBorderColor = function (color) {
	if (color) {
		this.set('borderColor', color);
	}
};
InfoBubble.prototype['setBorderColor'] = InfoBubble.prototype.setBorderColor;
InfoBubble.prototype.borderColor_changed = function () {
	var borderColor = this.get('borderColor');
	var contentContainer = this.contentContainer_;
	var arrowOuter = this.arrowOuter_;
	contentContainer.style['borderColor'] = borderColor;
	arrowOuter.style['borderColor'] = borderColor + ' transparent transparent';
	contentContainer.style['borderStyle'] = arrowOuter.style['borderStyle'] = this.arrowInner_.style['borderStyle'] = 'solid';
	this.updateTabStyles_();
};
InfoBubble.prototype['borderColor_changed'] = InfoBubble.prototype.borderColor_changed;
InfoBubble.prototype.setBorderRadius = function (radius) {
	this.set('borderRadius', radius);
};
InfoBubble.prototype['setBorderRadius'] = InfoBubble.prototype.setBorderRadius;
InfoBubble.prototype.getBorderRadius_ = function () {
	return parseInt(this.get('borderRadius'), 10) || 0;
};
InfoBubble.prototype.borderRadius_changed = function () {
	var borderRadius = this.getBorderRadius_();
	var borderWidth = this.getBorderWidth_();
	this.contentContainer_.style['borderRadius'] = this.contentContainer_.style['MozBorderRadius'] = this.contentContainer_.style['webkitBorderRadius'] = this.bubbleShadow_.style['borderRadius'] = this.bubbleShadow_.style['MozBorderRadius'] = this.bubbleShadow_.style['webkitBorderRadius'] = this.px(borderRadius);
	this.tabsContainer_.style['paddingLeft'] = this.tabsContainer_.style['paddingRight'] = this.px(borderRadius + borderWidth);
	this.redraw_();
};
InfoBubble.prototype['borderRadius_changed'] = InfoBubble.prototype.borderRadius_changed;
InfoBubble.prototype.getBorderWidth_ = function () {
	return parseInt(this.get('borderWidth'), 10) || 0;
};
InfoBubble.prototype.setBorderWidth = function (width) {
	this.set('borderWidth', width);
};
InfoBubble.prototype['setBorderWidth'] = InfoBubble.prototype.setBorderWidth;
InfoBubble.prototype.borderWidth_changed = function () {
	var borderWidth = this.getBorderWidth_();
	this.contentContainer_.style['borderWidth'] = this.px(borderWidth);
	this.tabsContainer_.style['top'] = this.px(borderWidth);
	this.updateArrowStyle_();
	this.updateTabStyles_();
	this.borderRadius_changed();
	this.redraw_();
};
InfoBubble.prototype['borderWidth_changed'] = InfoBubble.prototype.borderWidth_changed;
InfoBubble.prototype.updateArrowStyle_ = function () {
	var borderWidth = this.getBorderWidth_();
	var arrowSize = this.getArrowSize_();
	var arrowStyle = this.getArrowStyle_();
	var arrowOuterSizePx = this.px(arrowSize);
	var arrowInnerSizePx = this.px(Math.max(0, arrowSize - borderWidth));
	var outer = this.arrowOuter_;
	var inner = this.arrowInner_;
	this.arrow_.style['marginTop'] = this.px(-borderWidth);
	outer.style['borderTopWidth'] = arrowOuterSizePx;
	inner.style['borderTopWidth'] = arrowInnerSizePx;
	if (arrowStyle == 0 || arrowStyle == 1) {
		outer.style['borderLeftWidth'] = arrowOuterSizePx;
		inner.style['borderLeftWidth'] = arrowInnerSizePx;
	} else {
		outer.style['borderLeftWidth'] = inner.style['borderLeftWidth'] = 0;
	}
	if (arrowStyle == 0 || arrowStyle == 2) {
		outer.style['borderRightWidth'] = arrowOuterSizePx;
		inner.style['borderRightWidth'] = arrowInnerSizePx;
	} else {
		outer.style['borderRightWidth'] = inner.style['borderRightWidth'] = 0;
	}
	if (arrowStyle < 2) {
		outer.style['marginLeft'] = this.px( - (arrowSize));
		inner.style['marginLeft'] = this.px( - (arrowSize - borderWidth));
	} else {
		outer.style['marginLeft'] = inner.style['marginLeft'] = 0;
	}
	if (borderWidth == 0) {
		outer.style['display'] = 'none';
	} else {
		outer.style['display'] = '';
	}
};
InfoBubble.prototype.setPadding = function (padding) {
	this.set('padding', padding);
};
InfoBubble.prototype['setPadding'] = InfoBubble.prototype.setPadding;
InfoBubble.prototype.getPadding_ = function () {
	return parseInt(this.get('padding'), 10) || 0;
};
InfoBubble.prototype.padding_changed = function () {
	var padding = this.getPadding_();
	this.contentContainer_.style['padding'] = this.px(padding);
	this.updateTabStyles_();
	this.redraw_();
};
InfoBubble.prototype['padding_changed'] = InfoBubble.prototype.padding_changed;
InfoBubble.prototype.px = function (num) {
	if (num) {
		return num + 'px';
	}
	return num;
};
InfoBubble.prototype.addEvents_ = function () {
	var events = ['mousedown', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'mousewheel', 'DOMMouseScroll', 'touchstart', 'touchend', 'touchmove', 'dblclick', 'contextmenu', 'click'];
	var bubble = this.bubble_;
	this.listeners_ = [];
	for (var i = 0, event; event = events[i]; i++) {
		this.listeners_.push(google.maps.event.addDomListener(bubble, event, function (e) {
					e.cancelBubble = true;
					if (e.stopPropagation) {
						e.stopPropagation();
					}
				}));
	}
};
InfoBubble.prototype.onAdd = function () {
	if (!this.bubble_) {
		this.buildDom_();
	}
	this.addEvents_();
	var panes = this.getPanes();
	if (panes) {
		panes.floatPane.appendChild(this.bubble_);
		panes.floatShadow.appendChild(this.bubbleShadow_);
	}
};
InfoBubble.prototype['onAdd'] = InfoBubble.prototype.onAdd;
InfoBubble.prototype.draw = function () {
	var projection = this.getProjection();
	if (!projection) {
		return;
	}
	var latLng = (this.get('position'));
	if (!latLng) {
		this.close();
		return;
	}
	var tabHeight = 0;
	if (this.activeTab_) {
		tabHeight = this.activeTab_.offsetHeight;
	}
	var anchorHeight = this.getAnchorHeight_();
	var arrowSize = this.getArrowSize_();
	var arrowPosition = this.getArrowPosition_();
	arrowPosition = arrowPosition / 100;
	var pos = projection.fromLatLngToDivPixel(latLng);
	var width = this.contentContainer_.offsetWidth;
	var height = this.bubble_.offsetHeight;
	if (!width) {
		return;
	}
	var top = pos.y - (height + arrowSize);
	if (anchorHeight) {
		top -= anchorHeight;
	}
	var left = pos.x - (width * arrowPosition);
	this.bubble_.style['top'] = this.px(top);
	this.bubble_.style['left'] = this.px(left);
	var shadowStyle = parseInt(this.get('shadowStyle'), 10);
	switch (shadowStyle) {
	case 1:
		this.bubbleShadow_.style['top'] = this.px(top + tabHeight - 1);
		this.bubbleShadow_.style['left'] = this.px(left);
		this.bubbleShadow_.style['width'] = this.px(width);
		this.bubbleShadow_.style['height'] = this.px(this.contentContainer_.offsetHeight - arrowSize);
		break;
	case 2:
		width = width * 0.8;
		if (anchorHeight) {
			this.bubbleShadow_.style['top'] = this.px(pos.y);
		} else {
			this.bubbleShadow_.style['top'] = this.px(pos.y + arrowSize);
		}
		this.bubbleShadow_.style['left'] = this.px(pos.x - width * arrowPosition);
		this.bubbleShadow_.style['width'] = this.px(width);
		this.bubbleShadow_.style['height'] = this.px(2);
		break;
	}
};
InfoBubble.prototype['draw'] = InfoBubble.prototype.draw;
InfoBubble.prototype.onRemove = function () {
	if (this.bubble_ && this.bubble_.parentNode) {
		this.bubble_.parentNode.removeChild(this.bubble_);
	}
	if (this.bubbleShadow_ && this.bubbleShadow_.parentNode) {
		this.bubbleShadow_.parentNode.removeChild(this.bubbleShadow_);
	}
	for (var i = 0, listener; listener = this.listeners_[i]; i++) {
		google.maps.event.removeListener(listener);
	}
};
InfoBubble.prototype['onRemove'] = InfoBubble.prototype.onRemove;
InfoBubble.prototype.isOpen = function () {
	return this.isOpen_;
};
InfoBubble.prototype['isOpen'] = InfoBubble.prototype.isOpen;
InfoBubble.prototype.close = function () {
	if (this.bubble_) {
		this.bubble_.style['display'] = 'none';
		this.bubble_.className = this.bubble_.className.replace(this.animationName_, '');
	}
	if (this.bubbleShadow_) {
		this.bubbleShadow_.style['display'] = 'none';
		this.bubbleShadow_.className = this.bubbleShadow_.className.replace(this.animationName_, '');
	}
	this.isOpen_ = false;
};
InfoBubble.prototype['close'] = InfoBubble.prototype.close;
InfoBubble.prototype.open = function (opt_map, opt_anchor) {
	if (opt_map) {
		this.setMap(opt_map);
	}
	if (opt_anchor) {
		this.set('anchor', opt_anchor);
		this.bindTo('anchorPoint', opt_anchor);
		this.bindTo('position', opt_anchor);
	}
	this.bubble_.style['display'] = this.bubbleShadow_.style['display'] = '';
	var animation = !this.get('disableAnimation');
	if (animation) {
		this.bubble_.className += ' ' + this.animationName_;
		this.bubbleShadow_.className += ' ' + this.animationName_;
	}
	this.redraw_();
	this.isOpen_ = true;
	var pan = !this.get('disableAutoPan');
	if (pan) {
		var that = this;
		window.setTimeout(function () {
				that.panToView();
			}, 200);
	}
};
InfoBubble.prototype['open'] = InfoBubble.prototype.open;
InfoBubble.prototype.setPosition = function (position) {
	if (position) {
		this.set('position', position);
	}
};
InfoBubble.prototype['setPosition'] = InfoBubble.prototype.setPosition;
InfoBubble.prototype.getPosition = function () {
	return (this.get('position'));
};
InfoBubble.prototype['getPosition'] = InfoBubble.prototype.getPosition;
InfoBubble.prototype.position_changed = function () {
	this.draw();
};
InfoBubble.prototype['position_changed'] = InfoBubble.prototype.position_changed;
InfoBubble.prototype.panToView = function () {
	var projection = this.getProjection();
	if (!projection) {
		return;
	}
	if (!this.bubble_) {
		return;
	}
	var anchorHeight = this.getAnchorHeight_();
	var height = this.bubble_.offsetHeight + anchorHeight;
	var map = this.get('map');
	var mapDiv = map.getDiv();
	var mapHeight = mapDiv.offsetHeight;
	var latLng = this.getPosition();
	var centerPos = projection.fromLatLngToContainerPixel(map.getCenter());
	var pos = projection.fromLatLngToContainerPixel(latLng);
	var spaceTop = centerPos.y - height;
	var spaceBottom = mapHeight - centerPos.y;
	var needsTop = spaceTop < 0;
	var deltaY = 0;
	if (needsTop) {
		spaceTop *= -1;
		deltaY = (spaceTop + spaceBottom) / 2;
	}
	pos.y -= deltaY;
	latLng = projection.fromContainerPixelToLatLng(pos);
	if (map.getCenter() != latLng) {
		map.panTo(latLng);
	}
};
InfoBubble.prototype['panToView'] = InfoBubble.prototype.panToView;
InfoBubble.prototype.htmlToDocumentFragment_ = function (htmlString) {
	htmlString = htmlString.replace(/^\s*([\S\s]*)\b\s*$/, '$1');
	var tempDiv = document.createElement('DIV');
	tempDiv.innerHTML = htmlString;
	if (tempDiv.childNodes.length == 1) {
		return (tempDiv.removeChild(tempDiv.firstChild));
	} else {
		var fragment = document.createDocumentFragment();
		while (tempDiv.firstChild) {
			fragment.appendChild(tempDiv.firstChild);
		}
		return fragment;
	}
};
InfoBubble.prototype.removeChildren_ = function (node) {
	if (!node) {
		return;
	}
	var child;
	while (child = node.firstChild) {
		node.removeChild(child);
	}
};
InfoBubble.prototype.setContent = function (content) {
	this.set('content', content);
};
InfoBubble.prototype['setContent'] = InfoBubble.prototype.setContent;
InfoBubble.prototype.getContent = function () {
	return (this.get('content'));
};
InfoBubble.prototype['getContent'] = InfoBubble.prototype.getContent;
InfoBubble.prototype.content_changed = function () {
	if (!this.content_) {
		return;
	}
	this.removeChildren_(this.content_);
	var content = this.getContent();
	if (content) {
		if (typeof content == 'string') {
			content = this.htmlToDocumentFragment_(content);
		}
		this.content_.appendChild(content);
		var that = this;
		var images = this.content_.getElementsByTagName('IMG');
		for (var i = 0, image; image = images[i]; i++) {
			google.maps.event.addDomListener(image, 'load', function () {
					that.imageLoaded_();
				});
		}
		google.maps.event.trigger(this, 'domready');
	}
	this.redraw_();
};
InfoBubble.prototype['content_changed'] = InfoBubble.prototype.content_changed;
InfoBubble.prototype.imageLoaded_ = function () {
	var pan = !this.get('disableAutoPan');
	this.redraw_();
	if (pan && (this.tabs_.length == 0 || this.activeTab_.index == 0)) {
		this.panToView();
	}
};
InfoBubble.prototype.updateTabStyles_ = function () {
	if (this.tabs_ && this.tabs_.length) {
		for (var i = 0, tab; tab = this.tabs_[i]; i++) {
			this.setTabStyle_(tab.tab);
		}
		this.activeTab_.style['zIndex'] = this.baseZIndex_;
		var borderWidth = this.getBorderWidth_();
		var padding = this.getPadding_() / 2;
		this.activeTab_.style['borderBottomWidth'] = 0;
		this.activeTab_.style['paddingBottom'] = this.px(padding + borderWidth);
	}
};
InfoBubble.prototype.setTabStyle_ = function (tab) {
	var backgroundColor = this.get('backgroundColor');
	var borderColor = this.get('borderColor');
	var borderRadius = this.getBorderRadius_();
	var borderWidth = this.getBorderWidth_();
	var padding = this.getPadding_();
	var marginRight = this.px( - (Math.max(padding, borderRadius)));
	var borderRadiusPx = this.px(borderRadius);
	var index = this.baseZIndex_;
	if (tab.index) {
		index -= tab.index;
	}
	var styles = {
		'cssFloat' : 'left',
		'position' : 'relative',
		'cursor' : 'pointer',
		'backgroundColor' : backgroundColor,
		'border' : this.px(borderWidth) + ' solid ' + borderColor,
		'padding' : this.px(padding / 2) + ' ' + this.px(padding),
		'marginRight' : marginRight,
		'whiteSpace' : 'nowrap',
		'borderRadiusTopLeft' : borderRadiusPx,
		'MozBorderRadiusTopleft' : borderRadiusPx,
		'webkitBorderTopLeftRadius' : borderRadiusPx,
		'borderRadiusTopRight' : borderRadiusPx,
		'MozBorderRadiusTopright' : borderRadiusPx,
		'webkitBorderTopRightRadius' : borderRadiusPx,
		'zIndex' : index,
		'display' : 'inline'
	};
	for (var style in styles) {
		tab.style[style] = styles[style];
	}
	var className = this.get('tabClassName');
	if (className != undefined) {
		tab.className += ' ' + className;
	}
};
InfoBubble.prototype.addTabActions_ = function (tab) {
	var that = this;
	tab.listener_ = google.maps.event.addDomListener(tab, 'click', function () {
				that.setTabActive_(this);
			});
};
InfoBubble.prototype.setTabActive = function (index) {
	var tab = this.tabs_[index - 1];
	if (tab) {
		this.setTabActive_(tab.tab);
	}
};
InfoBubble.prototype['setTabActive'] = InfoBubble.prototype.setTabActive;
InfoBubble.prototype.setTabActive_ = function (tab) {
	if (!tab) {
		this.setContent('');
		return;
	}
	var padding = this.getPadding_() / 2;
	var borderWidth = this.getBorderWidth_();
	if (this.activeTab_) {
		var activeTab = this.activeTab_;
		activeTab.style['zIndex'] = this.baseZIndex_ - activeTab.index;
		activeTab.style['paddingBottom'] = this.px(padding);
		activeTab.style['borderBottomWidth'] = this.px(borderWidth);
	}
	tab.style['zIndex'] = this.baseZIndex_;
	tab.style['borderBottomWidth'] = 0;
	tab.style['marginBottomWidth'] = '-10px';
	tab.style['paddingBottom'] = this.px(padding + borderWidth);
	this.setContent(this.tabs_[tab.index].content);
	this.activeTab_ = tab;
	this.redraw_();
};
InfoBubble.prototype.setMaxWidth = function (width) {
	this.set('maxWidth', width);
};
InfoBubble.prototype['setMaxWidth'] = InfoBubble.prototype.setMaxWidth;
InfoBubble.prototype.maxWidth_changed = function () {
	this.redraw_();
};
InfoBubble.prototype['maxWidth_changed'] = InfoBubble.prototype.maxWidth_changed;
InfoBubble.prototype.setMaxHeight = function (height) {
	this.set('maxHeight', height);
};
InfoBubble.prototype['setMaxHeight'] = InfoBubble.prototype.setMaxHeight;
InfoBubble.prototype.maxHeight_changed = function () {
	this.redraw_();
};
InfoBubble.prototype['maxHeight_changed'] = InfoBubble.prototype.maxHeight_changed;
InfoBubble.prototype.setMinWidth = function (width) {
	this.set('minWidth', width);
};
InfoBubble.prototype['setMinWidth'] = InfoBubble.prototype.setMinWidth;
InfoBubble.prototype.minWidth_changed = function () {
	this.redraw_();
};
InfoBubble.prototype['minWidth_changed'] = InfoBubble.prototype.minWidth_changed;
InfoBubble.prototype.setMinHeight = function (height) {
	this.set('minHeight', height);
};
InfoBubble.prototype['setMinHeight'] = InfoBubble.prototype.setMinHeight;
InfoBubble.prototype.minHeight_changed = function () {
	this.redraw_();
};
InfoBubble.prototype['minHeight_changed'] = InfoBubble.prototype.minHeight_changed;
InfoBubble.prototype.addTab = function (label, content) {
	var tab = document.createElement('DIV');
	tab.innerHTML = label;
	this.setTabStyle_(tab);
	this.addTabActions_(tab);
	this.tabsContainer_.appendChild(tab);
	this.tabs_.push({
			label : label,
			content : content,
			tab : tab
		});
	tab.index = this.tabs_.length - 1;
	tab.style['zIndex'] = this.baseZIndex_ - tab.index;
	if (!this.activeTab_) {
		this.setTabActive_(tab);
	}
	tab.className = tab.className + ' ' + this.animationName_;
	this.redraw_();
};
InfoBubble.prototype['addTab'] = InfoBubble.prototype.addTab;
InfoBubble.prototype.updateTab = function (index, opt_label, opt_content) {
	if (!this.tabs_.length || index < 0 || index >= this.tabs_.length) {
		return;
	}
	var tab = this.tabs_[index];
	if (opt_label != undefined) {
		tab.tab.innerHTML = tab.label = opt_label;
	}
	if (opt_content != undefined) {
		tab.content = opt_content;
	}
	if (this.activeTab_ == tab.tab) {
		this.setContent(tab.content);
	}
	this.redraw_();
};
InfoBubble.prototype['updateTab'] = InfoBubble.prototype.updateTab;
InfoBubble.prototype.removeTab = function (index) {
	if (!this.tabs_.length || index < 0 || index >= this.tabs_.length) {
		return;
	}
	var tab = this.tabs_[index];
	tab.tab.parentNode.removeChild(tab.tab);
	google.maps.event.removeListener(tab.tab.listener_);
	this.tabs_.splice(index, 1);
	delete tab;
	for (var i = 0, t; t = this.tabs_[i]; i++) {
		t.tab.index = i;
	}
	if (tab.tab == this.activeTab_) {
		if (this.tabs_[index]) {
			this.activeTab_ = this.tabs_[index].tab;
		} else if (this.tabs_[index - 1]) {
			this.activeTab_ = this.tabs_[index - 1].tab;
		} else {
			this.activeTab_ = undefined;
		}
		this.setTabActive_(this.activeTab_);
	}
	this.redraw_();
};
InfoBubble.prototype['removeTab'] = InfoBubble.prototype.removeTab;
InfoBubble.prototype.getElementSize_ = function (element, opt_maxWidth, opt_maxHeight) {
	var sizer = document.createElement('DIV');
	sizer.style['display'] = 'inline';
	sizer.style['position'] = 'absolute';
	sizer.style['visibility'] = 'hidden';
	if (typeof element == 'string') {
		sizer.innerHTML = element;
	} else {
		sizer.appendChild(element.cloneNode(true));
	}
	document.body.appendChild(sizer);
	var size = new google.maps.Size(sizer.offsetWidth, sizer.offsetHeight);
	if (opt_maxWidth && size.width > opt_maxWidth) {
		sizer.style['width'] = this.px(opt_maxWidth);
		size = new google.maps.Size(sizer.offsetWidth, sizer.offsetHeight);
	}
	if (opt_maxHeight && size.height > opt_maxHeight) {
		sizer.style['height'] = this.px(opt_maxHeight);
		size = new google.maps.Size(sizer.offsetWidth, sizer.offsetHeight);
	}
	document.body.removeChild(sizer);
	delete sizer;
	return size;
};
InfoBubble.prototype.redraw_ = function () {
	this.figureOutSize_();
	this.positionCloseButton_();
	this.draw();
};
InfoBubble.prototype.figureOutSize_ = function () {
	var map = this.get('map');
	if (!map) {
		return;
	}
	var padding = this.getPadding_();
	var borderWidth = this.getBorderWidth_();
	var borderRadius = this.getBorderRadius_();
	var arrowSize = this.getArrowSize_();
	var mapDiv = map.getDiv();
	var gutter = arrowSize * 2;
	var mapWidth = mapDiv.offsetWidth - gutter;
	var mapHeight = mapDiv.offsetHeight - gutter - this.getAnchorHeight_();
	var tabHeight = 0;
	var width = (this.get('minWidth') || 0);
	var height = (this.get('minHeight') || 0);
	var maxWidth = (this.get('maxWidth') || 0);
	var maxHeight = (this.get('maxHeight') || 0);
	maxWidth = Math.min(mapWidth, maxWidth);
	maxHeight = Math.min(mapHeight, maxHeight);
	var tabWidth = 0;
	if (this.tabs_.length) {
		for (var i = 0, tab; tab = this.tabs_[i]; i++) {
			var tabSize = this.getElementSize_(tab.tab, maxWidth, maxHeight);
			var contentSize = this.getElementSize_(tab.content, maxWidth, maxHeight);
			if (width < tabSize.width) {
				width = tabSize.width;
			}
			tabWidth += tabSize.width;
			if (height < tabSize.height) {
				height = tabSize.height;
			}
			if (tabSize.height > tabHeight) {
				tabHeight = tabSize.height;
			}
			if (width < contentSize.width) {
				width = contentSize.width;
			}
			if (height < contentSize.height) {
				height = contentSize.height;
			}
		}
	} else {
		var content = (this.get('content'));
		if (typeof content == 'string') {
			content = this.htmlToDocumentFragment_(content);
		}
		if (content) {
			var contentSize = this.getElementSize_(content, maxWidth, maxHeight);
			if (width < contentSize.width) {
				width = contentSize.width;
			}
			if (height < contentSize.height) {
				height = contentSize.height;
			}
		}
	}
	if (maxWidth) {
		width = Math.min(width, maxWidth);
	}
	if (maxHeight) {
		height = Math.min(height, maxHeight);
	}
	width = Math.max(width, tabWidth);
	if (width == tabWidth) {
		width = width + 2 * padding;
	}
	arrowSize = arrowSize * 2;
	width = Math.max(width, arrowSize);
	if (width > mapWidth) {
		width = mapWidth;
	}
	if (height > mapHeight) {
		height = mapHeight - tabHeight;
	}
	if (this.tabsContainer_) {
		this.tabHeight_ = 0;
		this.tabsContainer_.style['width'] = 0;
	}
	this.contentContainer_.style['width'] = this.px(width);
	this.contentContainer_.style['height'] = this.px(height);
};
InfoBubble.prototype.getAnchorHeight_ = function () {
	var anchor = this.get('anchor');
	if (anchor) {
		var anchorPoint = (this.get('anchorPoint'));
		if (anchorPoint) {
			return -1 * anchorPoint.y;
		}
	}
	return 0;
};
InfoBubble.prototype.anchorPoint_changed = function () {
	this.draw();
};
InfoBubble.prototype['anchorPoint_changed'] = InfoBubble.prototype.anchorPoint_changed;
InfoBubble.prototype.positionCloseButton_ = function () {
	var br = this.getBorderRadius_();
	var bw = this.getBorderWidth_();
	var right = -10 + (-bw);
	var top = -10 + (-bw);
	if (this.tabs_.length && this.tabHeight_) {
		top += this.tabHeight_;
	}
	top += bw;
	right += bw;
	var c = this.contentContainer_;
	if (c && c.clientHeight < c.scrollHeight) {
		right += 15;
	}
	this.close_.style['right'] = this.px(right);
	this.close_.style['top'] = this.px(top);
};
 



			var times=new Array();
			var myLang, myDegrees;
			var timePos;
			var mapsize;
			
var styles = [
	{
		featureType: 'landscape',
		elementType: 'all',
		stylers: [
			{ hue: '#988d6c' },
			{ saturation: -35 },
			{ lightness: -43 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'administrative',
		elementType: 'all',
		stylers: [
			{ visibility: 'off' }
		]
	},{
		featureType: 'transit',
		elementType: 'all',
		stylers: [
			{ visibility: 'off' }
		]
	},{
		featureType: 'administrative.country',
		elementType: 'geometry',
		stylers: [
			{ hue: '#333333' },
			{ saturation: 0 },
			{ lightness: -61 },
			{ visibility: 'off' }
		]
	},{
		featureType: 'administrative.locality',
		elementType: 'all',
		stylers: [
			{ hue: '#000000' },
			{ saturation: 0 },
			{ lightness: 0 },
			{ visibility: 'off' }
		]
	},{
		featureType: 'road',
		elementType: 'all',
		stylers: [
			{ visibility: 'off' }
		]
	},{
		featureType: 'poi',
		elementType: 'all',
		stylers: [
			{ hue: '#212f4f' },
			{ saturation: -4 },
			{ lightness: -72 },
			{ visibility: 'off' }
		]
	},{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{ hue: '#6480ba' },
			{ saturation: -15 },
			{ lightness: -26 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'water',
		elementType: 'labels',
		stylers: [
			{ hue: '#ffffff' },
			{ saturation: -100 },
			{ lightness: 100 },
			{ visibility: 'on' }
		]
	}
];
			//mapTypeId: google.maps.MapTypeId.ROADMAP
	
			
			function initialize() {	
				setLang();
				flag1=0;
				var hellas = new google.maps.LatLng(39,24);
				var myOptions = { mapTypeControlOptions: { mapTypeIds: ['eWeather',google.maps.MapTypeId.SATELLITE]	}, minZoom:5, zoom:6, maxZoom:16, mapTypeId:'eWeather',panControl: false, zoomControl: false,    scaleControl: true, center: hellas};
				//map = new MapView(this, "GErAVy59qb9SvIkeGbGolgor7zfIlySKXaEkAg");
				map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

				var styledMapType = new google.maps.StyledMapType(styles, { name: 'eWeather' });
				map.mapTypes.set('eWeather', styledMapType);

				resizeMap();				
	 		    google.maps.event.addListener(map, 'tilesloaded', function () {
					getData();
				}); 
				
				populateTimes();
			}
			
			function setLang(){
					if (localStorage.getItem("qLang")=="en") myLang="en"; else myLang="el";
					if(myLang=="el") {
						$('#r1').text("Προηγούμενο");
						$('#r2').text("Επιλογή χρόνου");
						$('#r3').text("Επόμενο");
						$('#r4').text("Καθορισμός χρόνου");
						$('#r5').text("Χρονική περίοδος");
						$('#r6').text("Αναζήτηση δεδομένων");
						$('#r7').text("Καθορισμός χρονικής περιόδου");
						$('#btnFor').text("Πρόγνωση");
					}
				}
	
			function setTimeP(ofs){
				var nTime=parseInt($('#slider').val())+ofs;
				if(nTime>-1 && nTime<times.length-1) {
						timePos=nTime;
				};

				getData();

				$('#slider').val(nTime);
				$('#slider').slider('refresh');
				$('#tmpLabel').text(times[nTime][0]);
			}
			
			function changeTime(ofs){
			    nTime=ofs;
				timePos=ofs;
				getData();	
			}
			
			function setBtn(ofs){
				var nTime=parseInt($('#slider').val())+ofs;
				if(nTime>-1 && nTime<times.length-1) {
						$('#slider').val(nTime);
						timePos=nTime;
						$('#tmpLabel').text(times[nTime][0]);
						$('#slider').val(nTime);
						$('#slider').slider('refresh');
				};
				//if(ofs==0) timePos=indexMid;
			}

			
			function getData(){
				$.mobile.showPageLoadingMsg();

				if (localStorage.getItem("qLang")=="en") myLang="en"; else myLang="el";
	 	        if (localStorage.getItem("qDegrees")=="F") myDegrees="F"; else myDegrees="C";		

				//alert(myLang+" "+myDegrees+"["+localStorage.getItem("qLang")+"]");
				deleteOverlays();
				
 				var bounds = map.getBounds();
				var zm= map.getZoom();
				var ne = bounds.getNorthEast();
            	var sw = bounds.getSouthWest();
				var x1 = sw.lng();	var y1 = sw.lat();
				var x2 = ne.lng();	var y2 = ne.lat();

				var xx=((x2-x1)/ mapsize)*20;

			    $('#infoTime').text(times[timePos][0]);
				var myFDAY=times[timePos][1];
			    $('#infoLabel').text(""+times[timePos][0]);
				var arg="LONX1="+x1+"&LONX2="+x2+"+&LATY1="+y1+"&LATY2="+y2+"&DELTA="+xx+"&ZOOM="+zm+"&FDAY="+myFDAY+"&lang="+myLang+"&deg="+myDegrees;
			    mapDownloadFuture3HR(arg); 
				
			}


			function mapDownloadFuture3HR(myArgument){
				var infowindow =  new google.maps.InfoWindow({content: "Hi!"});
				//console.log(myArgument);
				//$.ajax({ type: "POST",  url:'bridge.php',  dataType: "xml",
				//data:{fwd:"http://www.eweather.gr/weatherexpert/services/mob1/mobXMLWindowSea.php", arg:myArgument},		
				$.ajax({ type: "GET",  url:'http://www.eweather.gr/weatherexpert/services/mob1/mobXMLWindowSea.php?'+myArgument,  dataType: "xml",
				  success: function(xml) {
					var counter=0;
						$(xml).find("point").each(function(){
							var id=$(this).find('id').text();
							if(id=="forecast"){
								var lat = $(this).find('latitude').text();
								var lng = $(this).find('longitude').text();
								var pos = new google.maps.LatLng(lat,lng);
								var windI = $(this).find('wind_icon').text();
								var  d = $(this).find('stamp').text();
								var nDate= parseDate(d);
								var nText='<div class=\"wRouteDiv\">' +
									'<img class=\"wIcon1" src="assets/weather/T'+$(this).find('wind_icon').text()+'.png\" />' +
									'<span class=\"rDate">'+nDate+'</span>' +
									'<span class=\"rHead">'+$(this).find('weather_text').text()+'</span>' +
									'<span class=\"rT\">'+$(this).find('temperature').text()+'</span>' +				
									'<span class=\"rRH\">'+$(this).find('relative_humidity').text()+'</span>' +				
									'</div>';
								
								windI="assets/wind/m"+windI+".png";


 								var marker = new google.maps.Marker({ 
									position: pos,	map: map, icon: windI,		
									title: $(this).find('weather_text').text()	});	
								//google.maps.event.addListener(marker, "click", function(){ 								    
								//    $("#mInfo").html(nText);
								//	$.mobile.changePage('#pg_info', {role: 'dialog'});	
								 // });
									
								markerArray.push( marker);
								counter++;
								if(counter>9) $('#wait').hide();
							};
							$.mobile.hidePageLoadingMsg();
						})
			},
			error:function(){   alert("Error 202!");     }
			});
					
		}
			

			function z(val){ return ""+(val < 10 ? '0' : '') + val;	}
			function deleteOverlays() {for (i = 0; i < markerArray.length; i++) { markerArray[i].setMap(null); };}
			function closeInfos() {for (i = 0; i < infoArray.length; i++) { infoArray[i].close(); }; }
	
			
		function getForecast(){
			//alert(lastNumber+ " "+ lastIcao);
	 		 var cmd='index.html#pg_outlook?number='+lastNumber;
			 $.mobile.changePage(cmd, "slide");

		}

		function resizeMap2() {
			  //var mid = document.getElementById('map_canvas');
			  //var foot= document.getElementById('map_footer');
			  //var pg= document.getElementById('pg_rtw');	
			  //mid.style.height = ((foot.offsetTop) - (mid.offsetTop))+'px';
			  //if(map != null) {	google.maps.event.trigger(map, 'resize');	  }
			  //mapsize=$('#map_canvas').width();
		}
			

			function resizeMap() {
			  var mid = document.getElementById('map_canvas');
			  var foot= document.getElementById('map_footer');
			  mid.style.height = ((foot.offsetTop) - (mid.offsetTop))+'px';
			  if(map != null) {	google.maps.event.trigger(map, 'resize');	  };
			  mapsize=$('#map_canvas').width();
		}

	
				
	    function parseDate(tmp){
			var y1=tmp.substr(0,4);
			var m1=tmp.substr(4,2);
			var d1=tmp.substr(6,2);
			var h1=tmp.substr(8,2);
			var s1=tmp.substr(10,2);
			return(d1+"/"+m1+"/"+y1+" "+h1+":"+s1);
		}
				
		function addDiv(latLng){		
			 var circle = new google.maps.Circle({
				map: map,
				center: latLng,
				fillColor: "#00FF00",
				fillOpacity: 0.2,
				strokeColor: "#00FF00",
				strokeOpacity: 0.4,
				strokeWeight: 2,
				radius: 18362.55489862987
			 });
			
		}
		
		function displayWeather(){
				var cmd='#myShowMap?s='+$('#from').val()
						     +'&e='+$('#to').val()
							 +'&d='+$('#select-choice-on').val()
							 +'&t='+$('#select-choice-at').val();
				 $.mobile.changePage(cmd, "slide");
				 //console.log(cmd);
		}
		
		
		function populateTimes(){
			//SET TIME ARRAY
			var k=0;
			indexMid=0;				
			timePos=0;
			
			// Create data entry for FORECAST
			var nD1 = new Date(); 
			var now_utc = new Date(nD1.getUTCFullYear(), nD1.getUTCMonth(), nD1.getUTCDate(),  nD1.getUTCHours(), nD1.getUTCMinutes(), nD1.getUTCSeconds());
			var dHH=parseInt(nD1.getUTCHours()/3);
			var t1=6;  var t2=144;
			for (hh=t1; hh<=t2; hh=hh+3){
				var nD2=new Date(nD1.getUTCFullYear(),nD1.getUTCMonth(),nD1.getUTCDate(),(dHH*3)+parseInt(hh),0);
				var vs=z2(nD2.getDate())+"/"+z2(nD2.getMonth()+1)+"/"+nD2.getFullYear()+ " "+z2(nD2.getHours())+"UTC";
				var ds=nD2.getFullYear()+z2(nD2.getMonth()+1)+z2(nD2.getDate())+z2(nD2.getHours());
				times[k]=new Array(2);
				times[k][0]=vs;
				times[k][1]=ds;
				//console.log("F > "+ vs + " " +ds);
				k++;
			}
			$('#tmpLabel').text(times[0][0]);
			//alert (k+"   "+times.length);
 		}




		function z2(val){
			if (val<10) return "0"+val; else return val;	
		}

		

	var LA;
	var chOutlook=1;
	var chDetail=1;
	var myLang="el";
	var myNumber="166270";
	var myDegrees="C";
	var mySpeed="m";


	
	function setLang(){
		if (localStorage.getItem("qLang")=="en") myLang="en"; else myLang="el";
		if(myLang=="el") {
			$('#w1').text("Ο Καιρός μου");
			$('#w2').text("Εβδομαδιαία επισκόπιση καιρού");
			$('#w3').text("Αγαπημένα");
			$('#w4').text("Τα σημεία ενδιαφέροντος μου");
			$('#w5').text("Ταξίδι");
			$('#w6').text("Ανακαλύψτε το καιρό στο ταξίδι σας");
			$('#w7').text("Επισκόπιση Καιρού");
			$('#w8').text("Παρακολουθήστε το καιρό ");
			$('#w9').text("Ορειβασία");
			$('#w10').text("Ο καιρός σε ορεινές διαδρομές (υπό κατασκευή)");
			$('#w11').text("Ιστιοπλοϊα");
			$('#w12').text("Ο καιρός στη θάλασσα(υπό κατασκευή)");
			$('#w13').text("Ρυθμίσεις");
			//$('#w14').text("Περί...");
			$('#w15').text("Επισκόπιση πρόγνωσης");
			$('#w16').text("Αναλυτική πρόγνωση");
			$('#w17').text("Αγαπημένα σημεία");
		}
	}
	
	function showPois(){ 
		var number=$.urlParam('number');
		var poi=decodeURIComponent($.urlParam('name'));
		//alert(number+" " +poi);
		if((number!="") && (poi!="")) {			
			var ntext='<li id="li_'+number+'"><a href="#pg_outlook?number='+number+'" title="'+poi+'">'+poi
			           + '</a><a href="#" data-transition="none" onClick="$(\'#li_'+number+'\').remove()" >,'+number+'</a></li>';
			$("#myPois").append(ntext);
			$("#myPois").listview('refresh');
			saveCookies();
		}else {
			loadCookies();
		}
	}


	// *****************************************************************************
	// OUTLOOK FORECAST
	// *****************************************************************************
	function getOutlook(){
		var xml;
		var number=""+$.urlParam('number');
		if(number==""){
			var oldNumber=localStorage.getItem("qNumber");
			var oldXML=localStorage.getItem("qNumber"+"Daily");
			if (oldNumber!="")	myNumber=oldNumber;
			chOutlook=1;
		} else {
			if(number!=myNumber) {
				chOutlook=1; 
				myNumber=number;
			} else chOutlook=0; 
		}	
		if (chOutlook==0) return(0);
		$("#myOutlook").children().remove();
		$.mobile.showPageLoadingMsg();
		if(myNumber=="") { myNumber="9928355"; };
		//alert(myNumber);
		if (ckeckConnection()==true) {
			//$.ajax({ type: "POST",  url:'bridge.php',  dataType: "xml",
			//	data:{fwd:"http://www.eweather.gr/weatherexpert/services/mob1/mobXMLpoiDaily.php",arg:"numberid="+myNumber+"&lang="+myLang+"&deg="+myDegrees+"&fday"},		
			$.ajax({ type: "GET",  url:'http://www.eweather.gr/weatherexpert/services/mob1/mobXMLpoiDaily.php?'+
					"numberid="+myNumber+"&lang="+myLang+"&deg="+myDegrees+"&fday",  dataType: "xml",
			success: function (xml){ parseDailyXML(xml); localStorage.setItem("qNumber"+"Daily",xml);},
			error:function(){   alert("(Error:101)!<br>Old data"); xml=oldXML;  parseDailyXML(xml);  }
			});
		} else {
			if(oldXML!="") {alert("(Error:102)!\nOld data");xml=oldXML; parseDailyXML(xml); 	};		
		}
	
		localStorage.setItem("qNumber",myNumber);
		localStorage.setItem("qNumber"+"Daily",xml);
		chOutlook=0;
		$.mobile.hidePageLoadingMsg();		    
	  }

	  
	  function parseDailyXML(xml){
			var counter=0;
			$(xml).find("point").each(function(){
			if(counter==0) { 
				$("#myOutlook").append('<li data-role="list-divider">'+ $(xml).find('info').find('name').text() +'</li>');
			};
			var ntext='<div class=\"wDiv\">' +
				'<img class=\"wIcon1" src="assets/weather/'+$(this).find('weather_icon').text()+'.png\" />' +
				'<img class=\"wIcon2" src="assets/wind/'+$(this).find('wind_icon').text()+'.png\" />' +
				'<span class=\"wDay">'+$(this).find('day_of_week').text()+" " +$(this).find('valid').text()+'</span>' +
				'<span class=\"wHead">'+$(this).find('weather_text').text()+'</span>' +
				'<span class=\"wMax\">'+$(this).find('temperature_max').text()+'</span>' +				
				'<span class=\"wMin\">'+$(this).find('temperature_min').text()+'</span>' +				
				'</div>';
			$("#myOutlook").append('<li><a href="#pg_detail?fday='+$(this).find('stamp').text()+'">'+ ntext +'</a></li>');
			counter++;
		})
		$("#myOutlook").listview('refresh');
    }
	  
	// *****************************************************************************
	// DETAIL FORECAST
	// *****************************************************************************
	  function getDetail(time){
		var number=$.urlParam('number');
		var fday=$.urlParam('fday');
		if(number==""){
			if(number==myNumber) chDetail=0; else chDetail=1;
		} else myNumber=number;
	
		fday="";
		if (chDetail==0) return(0);
		$("#myDetail").children().remove();
		$.mobile.showPageLoadingMsg();
		//$.ajax({ type: "POST",  url:'bridge.php',  dataType: "xml",
		//		 data:{fwd:"http://www.eweather.gr/weatherexpert/services/mob1/mobXMLpoiDetail.php", 
		//			   arg:"numberid="+myNumber+"&lang="+myLang+"&deg="+myDegrees+"&fday" },		
		$.ajax({ type: "GET",  url:'http://www.eweather.gr/weatherexpert/services/mob1/mobXMLpoiDetail.php?'+
				"numberid="+myNumber+"&lang="+myLang+"&deg="+myDegrees+"&fday",  dataType: "xml",
					success: function(xml) {parseDetailXML(xml );	},
		error:function(){   alert("Error!");     }
		});
	
		chDetail=0;
	  }	  
	  
	  function parseDetailXML(xml){
			var counter=0;
			var lastday="";
			$("#myDetail").append('<li data-role="list-divider">'+ $(xml).find('info').find('name').text() +'</li>');
			$(xml).find("point").each(function(){
				var	newday=$(this).find('day_of_week').text();
				if(newday!=lastday){
					  $("#myDetail").append('<li data-role="list-divider">'+ newday + " " + $(this).find('valid').text() +'</li>');
				};
							
				var ntext='<div class=\"wDiv\">' +
					'<img class=\"wIcon1" src="assets/weather/'+$(this).find('weather_icon').text()+'.png\" />' +
					'<img class=\"wIcon2" src="assets/wind/'+$(this).find('wind_icon').text()+'.png\" />' +
					'<span class=\"wDay">'+$(this).find('time').text()+'</span>' +
					'<span class=\"wHead">'+$(this).find('weather_text').text()+'</span>' +
					'<span class=\"wMax\">'+$(this).find('temperature').text()+'</span>' +				
					'<span class=\"wRh\">'+$(this).find('relative_humidity').text()+'%</span>' +				
					'</div>';
				$("#myDetail").append('<li><a href="#pg_outlook>'+ ntext +'</a></li>');
				counter++;	
				lastday=newday;
			})
			$("#myDetail").listview('refresh');
				$.mobile.hidePageLoadingMsg();   
    }
    
    
	  function getPois(myText){
		$.mobile.showPageLoadingMsg();
		$("#availablePoi").children().remove();
		//$.ajax({ type: "POST",  url:'bridge.php',  dataType: "xml",
		//		 data:{fwd:"http://www.eweather.gr/weatherexpert/services/mob1/mobXMLgetPois.php", arg:"search="+myText+"&lang="+myLang },		
		$.ajax({ type: "GET",  url:'http://www.eweather.gr/weatherexpert/services/mob1/mobXMLgetPois.php?'+
				"search="+myText+"&lang="+myLang,  dataType: "xml",
					success: function(xml) {
						var counter=0;
						$(xml).find("poi").each(function(){
							var poiName=$(this).find('name').text();
							var poiNumber=$(this).find('numberid').text();
							var ntext= poiName+'<br> <font style="white-space:normal; font-size:small">' +
								+poiNumber + ", "
								+ $(this).find('category').text()+ ", "+ $(this).find('subcategory').text();
							$("#availablePoi").append('<li data-icon="add"><a href="#pg_pois?name='+encodeURIComponent(poiName)+'&number='+poiNumber+'">'+ ntext +'</a></li>');
						});
						$("#availablePoi").listview('refresh');
						$.mobile.hidePageLoadingMsg();
					},
		error:function(){   alert("Error!");     }
		});
	  }
	  
	
	// *****************************************************************************
	// LOCAL STORAGE
	// *****************************************************************************
	function saveCookies(){	
		 var qPois="";
		 $('#myPois li a').each(function(index) {
            qPois +=  $(this).attr("title")+":";
		});
		var re = /:,/g;
		qPois=qPois.replace(re, ",");
		 localStorage.setItem("qLang",myLang);
		 localStorage.setItem("qDegrees",myDegrees);
		 localStorage.setItem("qPois",qPois);
	}

	function loadCookies(){
	     if (localStorage.getItem("qLang")=="en") myLang="en"; else myLang="el";
	     if (localStorage.getItem("qDegrees")=="F") myDegrees="F"; else myDegrees="C";
		 qPois=localStorage.getItem("qPois");

		 var cnt=0;
		 if (qPois!="") {		 
			 $('#myPois').children().remove('li');	
			 var tmpA1=qPois.split(':');
			 var ntext="";
			 $.each(tmpA1, function(key, value) { 
				 var tmpA2=value.split(',');
				 var poi=tmpA2[0];
				 var number=tmpA2[1];
				 if (poi!="undefined" && poi!=""){
				 	
					 cnt++;
					 ntext +='<li id="li_'+number+'"><a href="#pg_outlook?number='+number+'" title="'+poi+'">'+poi+'</a><a href="#" onClick="$(\'#li_'+number+'\').remove();saveCookies()" >,'+number+'</a></li>';
				 };
			});
			$("#myPois").append(ntext);		 
			$("#myPois").listview('refresh');
		 }


		$('#select-choice-lang option[value=' + myLang + ']').attr('selected',true);
		$('#select-choice-lang').selectmenu('refresh');

		$('#select-choice-degrees option[value=' + myDegrees + ']').attr('selected',true);
		$('#select-choice-degrees').selectmenu('refresh');
	}
	
	// *****************************************************************************
	// TOOLS
	// *****************************************************************************
	
	
	$.urlParam = function(name){
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results !=null) { return results[1] } else { return("")};
	}

	function showMy(){ 
			chOutlook=1;
			chDetail=1;
			alert("["+myLang+" "+myNumber+" "+myDegrees+"]"+chDetail);
	}
	
	//$(function() {  setTimeout(hideSplash, 10);	});
	//function hideSplash() {  $.mobile.changePage("#pg_home", "fade"); }
	
	function ckeckConnection() {
		  return true;
			var networkState = navigator.network.connection.type;

			var states = {};
			states[Connection.UNKNOWN]  = 'Unknown connection';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI]     = 'WiFi connection';
			states[Connection.CELL_2G]  = 'Cell 2G connection';
			states[Connection.CELL_3G]  = 'Cell 3G connection';
			states[Connection.CELL_4G]  = 'Cell 4G connection';
			states[Connection.NONE]     = 'No network connection';

			//alert(networkState);
			if(states[networkState]==states[Connection.NONE] || states[networkState]==states[Connection.UNKNOWN]){
				return false;
			} else {
				return true;    
			}
   	  }
	


/* jQueryMobile-router v0.5
* Copyright 2011, Andrea Zicchetti
*/
(function($){

$(document).bind("mobileinit",function(){

/* supports the following configurations:
$.mobile.jqmRouter.fixFirstPageDataUrl=true
$.mobile.jqmRouter.firstPageDataUrl="index.html"
jQM doesn't handle correctly the dataurl of the first page you display
in a single-page template mode. In fact, the page is fetched again
from the server the first time you try to access it through a link.
If this option is set to true, jquery mobile router extensions will
try to fix this problem. In order to set the data url, you have to
provide the name of the file containing the first page into the
"firstPageDataUrl" property (for example: index.html)

*/

var config=$.extend({
fixFirstPageDataUrl: false, firstPageDataUrl: "index.html"
},$.mobile.jqmRouter || {});


var DEBUG=true;
function debug(err){
if (DEBUG) console.log(err);
}

var previousUrl=null, nextUrl=null;

$(document).bind("pagebeforechange", function( e, data ) {
// We only want to handle changePage() calls where the caller is
// asking us to load a page by URL.
if ( typeof data.toPage === "string" ) {
// We are being asked to load a page by URL, but we only
// want to handle URLs that request the data for a specific
// category.
var u = $.mobile.path.parseUrl( data.toPage );
previousUrl=nextUrl;
nextUrl=u;

if ( u.hash.indexOf("?") !== -1 ) {
var page=u.hash.replace( /\?.*$/, "" );
// We don't want the data-url of the page we just modified
// to be the url that shows up in the browser's location field,
// so set the dataUrl option to the URL with hash parameters
data.options.dataUrl = u.href;
// Now call changePage() and tell it to switch to
// the page we just modified, but only in case it's different
// from the current page
if ( $.mobile.activePage &&
page.replace(/^#/,"")==$.mobile.activePage.jqmData("url")
){
data.options.allowSamePageTransition=true;
$.mobile.changePage( $(page), data.options );
} else {
$.mobile.changePage( $(page), data.options );
}
// Make sure to tell changePage() we've handled this call so it doesn't
// have to do anything.
e.preventDefault();
}
}
});


if (config.fixFirstPageDataUrl){
$(document).ready(function(){
var page=$(":jqmData(role='page')").first();
var dataUrl=page.jqmData("url"),
guessedDataUrl=window.location.pathname
+config.firstPageDataUrl
+window.location.search
+window.location.hash
;
if (!window.location.pathname.match("/$")){
return;
}
if (dataUrl!=guessedDataUrl){
page.attr("data-url",guessedDataUrl)
.jqmData("url",guessedDataUrl);
}
});
}

$.mobile.Router=function(userRoutes,userHandlers,conf){
/* userRoutes format:
{
"regexp": "function name", // defaults to jqm pagebeforeshow event
"regexp": function(){ ... }, // defaults to jqm pagebeforeshow event
"regexp": { handler: "function name", events: "bc,c,bs,s,bh,h" },
"regexp": { handler: function(){ ... }, events: "bc,c,bs,s,bh,h" }
}
*/
this.routes={
pagebeforecreate: null, pagecreate: null,
pagebeforeshow: null, pageshow: null,
pagebeforehide: null, pagehide: null,
pageinit: null, pageremove: null
};
this.routesRex={};
this.conf=$.extend({
ajaxApp: false
}, config || {});
this.add(userRoutes,userHandlers);
}
$.extend($.mobile.Router.prototype,{
add: function(userRoutes,userHandlers){
if (!userRoutes) return;

var _self=this, evtList=[], evtLookup={
bc: "pagebeforecreate", c: "pagecreate",
bs: "pagebeforeshow", s: "pageshow",
bh: "pagebeforehide", h: "pagehide",
i: "pageinit", rm: "pageremove"
};
if (userRoutes instanceof Array){
$.each(userRoutes,$.proxy(function(k,v){
this.add(v,userHandlers);
},this));
} else {
$.each(userRoutes,function(r,el){
if(typeof(el)=="string" || typeof(el)=="function"){
if (_self.routes.pagebeforeshow===null){
_self.routes.pagebeforeshow={};
}
_self.routes.pagebeforeshow[r]=el;
if (! _self.routesRex.hasOwnProperty(r)){
_self.routesRex[r]=new RegExp(r);
}
} else {
var i,trig=el.events.split(","),evt;
for(i in trig){
evt=evtLookup[trig[i]];
if (_self.routes.hasOwnProperty(evt)){
if (_self.routes[evt]===null){
_self.routes[evt]={};
}
_self.routes[evt][r]=el.handler;
if (! _self.routesRex.hasOwnProperty(r)){
_self.routesRex[r]=new RegExp(r);
}
} else {
debug("can't set unsupported route "+trig[i]);
}
}
}
});
$.each(_self.routes,function(evt,el){
if (el!==null){
evtList.push(evt);
}
});
if (!this.userHandlers) this.userHandlers={};
$.extend(this.userHandlers,userHandlers||{});
this._detachEvents();
if (evtList.length>0){
this._liveData={
events: evtList.join(" "),
handler: function(e,ui){ _self._processRoutes(e,ui,this); }
};
$("div:jqmData(role='page'),div:jqmData(role='dialog')").live(
this._liveData.events, this._liveData.handler
);
}
}
},

_processRoutes: function(e,ui,page){
var _self=this, refUrl, url, $page;
if (e.type in {
"pagebeforehide":true, "pagehide":true, "pageremove": true
}){
refUrl=previousUrl;
} else {
refUrl=nextUrl;
}
if (!refUrl){
if (page){
$page=$(page);
refUrl=$page.jqmData("url");
if (refUrl){
if ($page.attr("id")==refUrl) refUrl="#"+refUrl;
refUrl=$.mobile.path.parseUrl(refUrl);
}
}
} else if (page && !$(page).jqmData("url")){
return;
}
if (!refUrl) return;
url=( !this.conf.ajaxApp ?
refUrl.hash
:refUrl.pathname + refUrl.search + refUrl.hash
);
$.each(this.routes[e.type],function(route,handler){
var res, handleFn;
if ( (res=url.match(_self.routesRex[route])) ){
if (typeof(handler)=="function"){
handleFn=handler;
} else if (typeof(_self.userHandlers[handler])=="function"){
handleFn=_self.userHandlers[handler];
}
if (handleFn){
try { handleFn(e.type,res,ui,page);
}catch(err){ debug(err); }
}
}
});
},

_detachEvents: function(){
if (this._liveData){
$("div:jqmData(role='page'),div:jqmData(role='dialog')").die(
this._liveData.events, this._liveData.handler
);
}
} ,

destroy: function(){
this._detachEvents();
this.routes=this.routesRex=null;
} ,

getParams: function(hashparams){
if (!hashparams) return null;
var params={}, tmp;
var tokens=hashparams.slice( hashparams.indexOf('?')+1 ).split("&");
$.each(tokens,function(k,v){
tmp=v.split("=");
if (params[tmp[0]]){
if (!(params[tmp[0]] instanceof Array)){
params[tmp[0]]=[ params[tmp[0]] ];
}
params[tmp[0]].push(tmp[1]);
} else {
params[tmp[0]]=tmp[1];
}
});
if ($.isEmptyObject(params)) return null;
return params;
}
});

});

})(jQuery);



//======================================================== FASTCLICK
         function FastButton(element, handler) {
            this.element = element;
            this.handler = handler;
            element.addEventListener('touchstart', this, false);
         };
         FastButton.prototype.handleEvent = function(event) {
            switch (event.type) {
               case 'touchstart': this.onTouchStart(event); break;
               case 'touchmove': this.onTouchMove(event); break;
               case 'touchend': this.onClick(event); break;
               case 'click': this.onClick(event); break;
            }
         };
         FastButton.prototype.onTouchStart = function(event) {
            
event.stopPropagation();
            this.element.addEventListener('touchend', this, false);
            document.body.addEventListener('touchmove', this, false);
            this.startX = event.touches[0].clientX;
            this.startY = event.touches[0].clientY;
 isMoving = false;
         };
         FastButton.prototype.onTouchMove = function(event) {
            if(Math.abs(event.touches[0].clientX - this.startX) > 10 || Math.abs(event.touches[0].clientY - this.startY) > 10) {
               this.reset();
            }
         };
         FastButton.prototype.onClick = function(event) {
            this.reset();
            this.handler(event);
            if(event.type == 'touchend') {
               preventGhostClick(this.startX, this.startY);
            }
         };
         FastButton.prototype.reset = function() {
            this.element.removeEventListener('touchend', this, false);
            document.body.removeEventListener('touchmove', this, false);
         };
         function preventGhostClick(x, y) {
            coordinates.push(x, y);
            window.setTimeout(gpop, 2500);
         };
         function gpop() {
            coordinates.splice(0, 2);
         };
         function gonClick(event) {
            for(var i = 0; i < coordinates.length; i += 2) {
               var x = coordinates[i];
               var y = coordinates[i + 1];
               if(Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
                  event.stopPropagation();
                  event.preventDefault();
               }
            }
         };
         document.addEventListener('click', gonClick, true);
         var coordinates = [];
         function initFastButtons() {
 new FastButton(document.getElementById("fastclick"), goSomewhere);
         };
         function goSomewhere() {
 var theTarget = document.elementFromPoint(this.startX, this.startY);
 if(theTarget.nodeType == 3) theTarget = theTarget.parentNode;
 
 var theEvent = document.createEvent('MouseEvents');
 theEvent.initEvent('click', true, true);
 theTarget.dispatchEvent(theEvent);
         };
//========================================================


/*! http://code.google.com/p/jquery-ui-map/ | Johan S�ll Larsson */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(8($){$.I($.1X.1V.1U,{1T:8(b,c){r d=l;C.I(d.k(\'j\',{}),{\'1S-o\':{},\'1R\':{\'9\':2},\'1Q\':{},\'1P\':{},\'1N\':{},\'1M\':{\'m\':2},\'t\':{},\'1L\':{},\'1K-o\':{},\'1J\':{},\'1I\':{},\'1G\':{},\'1F\':{},\'1E\':{},\'v-w\':{},\'v-D\':{},\'v-q\':{},\'1D\':{\'9\':2},\'1x\':{},\'1w-G\':{},\'1s-o\':{},\'15\':{},\'11\':{\'9\':2},\'N-o\':{},\'M\':{\'4\':2},\'1n\':{\'4\':2},\'J-O\':{},\'J-P\':{},\'Q\':{\'4\':2},\'R\':{\'4\':2},\'S\':{},\'T\':{\'9\':2},\'U\':{},\'V\':{},\'W\':{},\'X\':{\'9\':2},\'Y\':{},\'Z\':{},\'10\':{},\'n\':{\'9\':2},\'12\':{\'m\':2},\'13\':{},\'14\':{\'9\':2},\'H-o\':{},\'H-16\':{},\'17\':{},\'18\':{},\'19-1a-1b\':{},\'1c-1d\':{},\'1e\':{\'4\':2},\'1f\':{},\'1g\':{},\'1h\':{},\'1i\':{},\'1j\':{},\'1k\':{},\'1l\':{},\'1m\':{},\'L-1o\':{},\'1p\':{},\'1q-G\':{},\'D\':{},\'1r\':{\'m\':2},\'q\':{},\'5\':{},\'1t\':{},\'1u\':{},\'1v\':{},\'F\':{\'m\':2},\'z\':{},\'z-q\':{},\'1y\':{\'4\':2},\'1z\':{\'4\':2},\'1A\':{\'4\':2},\'1B\':{},\'1C\':{\'4\':2}});$(b).s(8(i,a){c(d.p($(l),{\'@5\':b.1H(\'.\',\'\')}),l,i)})},p:8(e,f){r g=l;e.u().s(8(){r c=$(l);3(c.6(\'t\')){r d=c.6(\'t\').1O(\' \'),B=[],5;$.s(d,8(a,b){3(g.k(\'j\')[b]&&g.k(\'j\')[b].4){5=b}7{B.x(b)}});$.s(B,8(a,b){3(g.k(\'j\')[b]){5=5||b;3(g.k(\'j\')[b].9&&c.u().y>0){3(!f[b]){f[b]=[]}f[b].x({\'@5\':5});g.p(c,f[b][f[b].y-1])}7{3(c.u().y>0){f[b]={\'@5\':5};g.p(c,f[b])}7{3(g.k(\'j\')[b].m){3(!f[b]){f[b]=[]}f[b].x(g.A(c,b))}7{f[b]=g.A(c,b)}}}}})}7{g.p(c,f)}});h f},A:8(a,b){3(b===\'z-q\'){h a.6(\'q\')}7 3(b===\'F\'){h a.6(\'1W\')}3(a.6(\'K\')){h a.6(\'K\')}7 3(a.6(\'w\')){h a.6(\'w\')}7 3(a.E()){h a.E()}h}})}(C));',62,122,'||true|if|isRoot|type|attr|else|function|hasChildren||||||||return||properties|get|this|isMultivalued||name|_traverse|title|var|each|class|children|entry|content|push|length|value|_extract|cls|jQuery|summary|text|url|address|organization|extend|honorific|src|sort|hentry|given|prefix|suffix|hresume|hreview|item|key|label|latitude|locality|location|logo|longitude|mailer|geo|nickname|note|org|fn|unit|permalink|photo|post|office|box|postal|code|profile|publications|published|rating|region|rev|reviewer|role|skill|hfeed|string|sound|street|tel|family|tz|uid|updated|extended|experience|vcalendar|vcard|vevent|version|xoxo|email|education|dtstart|dtreviewed|replace|dtend|description|country|contact|category|bday|split|author|affiliation|adr|additional|microformat|prototype|gmap|href|ui'.split('|'),0,{}))

/*! http://code.google.com/p/jquery-ui-map/ | Johan S�ll Larsson */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(5($){$.x($.y.C.A,{B:5(a,b){l c=8;$(\'[k="{0}"]\'.j(\'{0}\',a)).o(5(i){b(c.e($(8),{\'@p\':c.9($(8).3(\'k\'))}),8,i)})},e:5(b,c){l d=8;b.q().o(5(){l a=$(8),g=d.9(a.3(\'k\')),7=d.9(a.3(\'7\')),4=d.9(a.3(\'4\'));2(g||7||4){2(7){2(a.q().r>0){c[7]=[];d.e(a,c[7])}f{c[7]=d.h(a,z)}}2(g){c.m({\'@p\':g});d.e(a,c[c.r-1])}2(4){2(c[4]){c[4]=[c[4]];c[4].m(d.h(a,w))}f{c[4]=d.h(a,w)}}}f{d.e(a,c)}});6 c},h:5(a,b){2(b){2(a.3(\'v\')){6 a.3(\'v\')}2(a.3(\'u\')){6 a.3(\'u\')}}2(a.3(\'t\')){6 a.3(\'t\')}2(a.s()){6 a.s()}6},9:5(a){2(a){2(a.n(\'D\')>-1){a=a.E(a.F(\'/\')+1).j(\'?\',\'\').j(\'#\',\'\')}f 2(a.n(\':\')>-1){a=a.G(\':\')[1]}}6 a}})}(H));',44,44,'||if|attr|property|function|return|rel|this|_resolveType|||||_traverse|else|typeOf|_extract||replace|typeof|var|push|indexOf|each|type|children|length|text|content|href|src|false|extend|ui|true|prototype|rdfa|gmap|http|substr|lastIndexOf|split|jQuery'.split('|'),0,{}))

/*! http://code.google.com/p/jquery-ui-map/ | Johan Säll Larsson */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(3($){$.a=3(a,b,c){$[a]=$[a]||{};$[a][b]=3(a,b){4(I.N){2.1i(a,b)}};$[a][b].E=c;$.1f[b]=3(d){k e=2,f=F.E.18.1a(I,1),g=2d d===\'2c\';4(g&&d.2b(0,1)===\'2a\'){7 e}2.29(3(){k h=$.1c(2,b);4(!h){h=$.1c(2,b,l $[a][b](d,2))}4(g){k i=h[d].1n(h,f);4(i!=q){e=i}}});7 e}};$.a("28","27",{n:{26:\'23\',1Z:5},1S:3(a,b){4(b){2.n[a]=b;2.6(\'j\').z(2.n)}7 2.n[a]},1i:3(a,b){2.T=$(b);r.s(2.n,a);2.n.1h=2.w(2.n.1h);2.1j();4(2.1l){2.1l()}},1j:3(){k a=2;a.p={\'j\':l 9.8.1r(a.T[0],a.n),\'L\':[],\'t\':[],\'u\':[],\'Q\':l 9.8.1O};9.8.D.1J(a.p.j,\'1E\',3(){a.T.12(\'1D\',a.p.j)});a.x(a.n.1C,a.p.j)},16:3(a){2.6(\'G\',l 9.8.1B()).s(2.w(a));2.6(\'j\').2f(2.6(\'G\'))},1A:3(a){k b=2.6(\'j\').1z();7(b)?b.1x(a.1d()):1v},1u:3(a,b){2.6(\'j\').1t[b].M(2.A(a))},1R:3(a,b,c){a.j=2.6(\'j\');a.1k=2.w(a.1k);k d=l(c||9.8.1s)(a);k f=2.6(\'L\');4(d.1m){f[d.1m]=d}m{f.M(d)}4(d.G){2.16(d.1d())}2.x(b,a.j,d);7 $(d)},y:3(a){2.S(2.6(a));2.P(a,[])},S:3(a){B(b O a){4(a.1g(b)){4(a[b]v 9.8.1e){9.8.D.1w(a[b]);a[b].K(q)}m 4(a[b]v F){2.S(a[b])}a[b]=q}}},1y:3(a,b,c){k d=2.6(a);B(e O d){4(d.1g(e)){c(d[e],((b.1b&&d[e][b.J])?(d[e][b.J].H(b.1b).15(b.13)>-1):(d[e][b.J]===b.13)))}}},6:3(a,b){k c=2.p;4(!c[a]){4(a.15(\'>\')>-1){k e=a.11(/ /g,\'\').H(\'>\');B(k i=0;i<e.N;i++){4(!c[e[i]]){4(b){c[e[i]]=((i+1)<e.N)?[]:b}m{7 q}}c=c[e[i]]}7 c}m 4(b&&!c[a]){2.P(a,b)}}7 c[a]},1F:3(a,b){2.6(\'Q\').z(a);2.6(\'Q\').1G(2.6(\'j\'),2.A(b))},P:3(a,b){2.p[a]=b},1H:3(a){k b=2.6(\'j\');k c=b.1I();$(b).10(\'1K\');b.1L(c)},1M:3(){2.y(\'L\');2.y(\'u\');2.y(\'t\');B(b O 2.p){2.p[b]=q}},x:3(a){4(a&&$.1N(a)){a.1n(2,F.E.18.1a(I,1))}},w:3(a){4(!a){7 l 9.8.R(0.0,0.0)}4(a v 9.8.R){7 a}m{k b=a.11(/ /g,\'\').H(\',\');7 l 9.8.R(b[0],b[1])}},A:3(a){4(!a){7 q}m 4(a v r){7 a[0]}m 4(a v 1P){7 a}7 $(\'#\'+a)[0]},1Q:3(a,b,c){k d=2;k e=2.6(\'u > 1q\',l 9.8.1q());k f=2.6(\'u > 14\',l 9.8.14());4(b){f.z(b)}e.1T(a,3(g,h){4(h===\'1U\'){f.1V(g);f.K(d.6(\'j\'))}m{f.K(q)}d.x(c,g,h)})},1W:3(a,b){2.6(\'j\').1X(2.6(\'u > Z\',l 9.8.Z(2.A(a),b)))},1Y:3(a,b){2.6(\'u > Y\',l 9.8.Y()).20(a,b)},21:3(a,b){7 $(2.6(\'t > \'+a,[]).M(l 9.8[a](r.s({\'j\':2.6(\'j\')},b))))},22:3(a,b){((!b)?2.6(\'t > C\',l 9.8.C()):2.6(\'t > C\',l 9.8.C(b,a))).z(r.s({\'j\':2.6(\'j\')},a))},24:3(a,b,c){2.6(\'t > \'+a,l 9.8.25(b,r.s({\'j\':2.6(\'j\')},c)))}});r.1f.s({W:3(a,b){7 2.o(\'W\',a,b)},1p:3(a){7 2.o(\'1p\',a)},19:3(a,b){7 2.o(\'19\',a,b)},17:3(a,b){7 2.o(\'17\',a,b)},V:3(a,b){7 2.o(\'V\',a,b)},U:3(a){7 2.o(\'U\',a)},1o:3(a){7 2.o(\'1o\',a)},10:3(a){9.8.D.12(2[0],a)},o:3(a,b,c){4(9.8&&2[0]v 9.8.1e){9.8.D.2e(2[0],a,b)}m{4(c){2.X(a,b,c)}m{2.X(a,b)}}7 2}})}(r));',62,140,'||this|function|if||get|return|maps|google||||||||||map|var|new|else|options|addEventListener|_a|null|jQuery|extend|overlays|services|instanceof|_latLng|_call|clear|setOptions|_unwrap|for|FusionTablesLayer|event|prototype|Array|bounds|split|arguments|property|setMap|markers|push|length|in|set|iw|LatLng|_c|el|drag|mouseout|click|bind|Geocoder|StreetViewPanorama|triggerEvent|replace|trigger|value|DirectionsRenderer|indexOf|addBounds|mouseover|slice|dblclick|call|delimiter|data|getPosition|MVCObject|fn|hasOwnProperty|center|_s|_create|position|_init|id|apply|dragend|rightclick|DirectionsService|Map|Marker|controls|addControl|false|clearInstanceListeners|contains|find|getBounds|inViewport|LatLngBounds|callback|init|bounds_changed|openInfoWindow|open|refresh|getCenter|addListenerOnce|resize|setCenter|destroy|isFunction|InfoWindow|Object|displayDirections|addMarker|option|route|OK|setDirections|displayStreetView|setStreetView|search|zoom|geocode|addShape|loadFusion|roadmap|loadKML|KmlLayer|mapTypeId|gmap|ui|each|_|substring|string|typeof|addListener|fitBounds'.split('|'),0,{}))

/*! http://code.google.com/p/jquery-ui-map/ | Johan Säll Larsson */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(3($){$.a=3(a,b,c){$[a]=$[a]||{};$[a][b]=3(a,b){4(C.G){2.Q(a,b)}};$[a][b].L=c;$.1i[b]=3(d){8 e=2,f=M.L.1a.1e(C,1),g=1W d===\'1V\';4(g&&d.1U(0,1)===\'1T\'){6 e}2.1S(3(){8 h=$.1f(2,b);4(!h){h=$.1f(2,b,p $[a][b](d,2))}4(g){8 i=h[d].R(h,f);4(i!=q){e=i}}});6 e}};$.a("1R","1Q",{l:{1P:\'1N\',1I:5},1D:3(a,b){4(b){2.l[a]=b;2.7(\'k\').1b(2.l)}6 2.l[a]},Q:3(a,b){2.B=$(b);s.y(2.l,a);2.l.1g=2.u(2.l.1g);2.O();4(2.P){2.P()}},O:3(){8 a=2;a.n={\'k\':p 9.j.1C(a.B[0],a.l),\'F\':[],\'V\':[],\'W\':[],\'z\':p 9.j.1B};9.j.w.1Y(a.n.k,\'1A\',3(){a.B.12(\'1z\',a.n.k)});a.E(a.l.1v,a.n.k)},16:3(a){2.7(\'x\',p 9.j.1u()).y(2.u(a));2.7(\'k\').1t(2.7(\'x\'))},1s:3(a){8 b=2.7(\'k\').1r();6(b)?b.1q(a.1d()):1p},1o:3(a,b){2.7(\'k\').1n[b].1h(2.N(a))},1E:3(a,b,c){a.k=2.7(\'k\');a.1k=2.u(a.1k);8 d=p(c||9.j.1m)(a);8 f=2.7(\'F\');4(d.1j){f[d.1j]=d}m{f.1h(d)}4(d.x){2.16(d.1d())}2.E(b,a.k,d);6 $(d)},v:3(a){2.K(2.7(a));2.J(a,[])},K:3(a){t(b H a){4(a.19(b)){4(a[b]r 9.j.15){9.j.w.1w(a[b]);a[b].1x(q)}m 4(a[b]r M){2.K(a[b])}a[b]=q}}},1y:3(a,b,c){8 d=2.7(a);t(e H d){4(d.19(e)){c(d[e],((b.13&&d[e][b.D])?(d[e][b.D].A(b.13).T(b.17)>-1):(d[e][b.D]===b.17)))}}},7:3(a,b){8 c=2.n;4(!c[a]){4(a.T(\'>\')>-1){8 e=a.14(/ /g,\'\').A(\'>\');t(8 i=0;i<e.G;i++){4(!c[e[i]]){4(b){c[e[i]]=((i+1)<e.G)?[]:b}m{6 q}}c=c[e[i]]}6 c}m 4(b&&!c[a]){2.J(a,b)}}6 c[a]},1l:3(a,b){2.7(\'z\').1b(a);2.7(\'z\').1F(2.7(\'k\'),2.N(b))},J:3(a,b){2.n[a]=b},1G:3(a){8 b=2.7(\'k\');8 c=b.1H();$(b).11(\'1J\');b.1K(c)},1L:3(){2.v(\'F\');2.v(\'W\');2.v(\'V\');t(b H 2.n){2.n[b]=q}},E:3(a){4(a&&$.1M(a)){a.R(2,M.L.1a.1e(C,1))}},u:3(a){4(!a){6 p 9.j.I(0.0,0.0)}4(a r 9.j.I){6 a}m{8 b=a.14(/ /g,\'\').A(\',\');6 p 9.j.I(b[0],b[1])}},N:3(a){4(!a){6 q}m 4(a r s){6 a[0]}m 4(a r 1O){6 a}6 $(\'#\'+a)[0]}});s.1i.y({Z:3(a,b){6 2.o(\'Z\',a,b)},U:3(a){6 2.o(\'U\',a)},1c:3(a,b){6 2.o(\'1c\',a,b)},18:3(a,b){6 2.o(\'18\',a,b)},Y:3(a,b){6 2.o(\'Y\',a,b)},X:3(a){6 2.o(\'X\',a)},S:3(a){6 2.o(\'S\',a)},11:3(a){9.j.w.12(2[0],a)},o:3(a,b,c){4(9.j&&2[0]r 9.j.15){9.j.w.1X(2[0],a,b)}m{4(c){2.10(a,b,c)}m{2.10(a,b)}}6 2}})}(s));',62,123,'||this|function|if||return|get|var|google||||||||||maps|map|options|else|_a|addEventListener|new|null|instanceof|jQuery|for|_latLng|clear|event|bounds|extend|iw|split|el|arguments|property|_call|markers|length|in|LatLng|set|_c|prototype|Array|_unwrap|_create|_init|_s|apply|dragend|indexOf|rightclick|overlays|services|drag|mouseout|click|bind|triggerEvent|trigger|delimiter|replace|MVCObject|addBounds|value|mouseover|hasOwnProperty|slice|setOptions|dblclick|getPosition|call|data|center|push|fn|id|position|openInfoWindow|Marker|controls|addControl|false|contains|getBounds|inViewport|fitBounds|LatLngBounds|callback|clearInstanceListeners|setMap|find|init|bounds_changed|InfoWindow|Map|option|addMarker|open|refresh|getCenter|zoom|resize|setCenter|destroy|isFunction|roadmap|Object|mapTypeId|gmap|ui|each|_|substring|string|typeof|addListener|addListenerOnce'.split('|'),0,{}))

/*! http://code.google.com/p/jquery-ui-map/ | Johan S�ll Larsson */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(7($){$.y($.J.x.C,{B:7(a,b){f c=8;$(\'[j="{0}"]\'.l(\'{0}\',a)).q(7(i){b(c.9($(8),{\'@r\':c.k($(8).4(\'j\'))}),8,i)})},9:7(c,d){f e=8;c.o().q(7(){f a=$(8),h=a.4(\'j\'),2=a.4(\'2\');3(h!=A&&a.o().p>0){3(!d[2]){d[2]=[]}d[2].m({\'@r\':e.k(h)});e.9(a,d[2][d[2].p-1])}5 3(2){3(d[2]){3(D d[2]===\'E\'){f b=d[2];d[2]=[];d[2].m(b)}d[2].m(e.g(a))}5{d[2]=e.g(a)}}5{e.9(a,d)}});6 d},g:7(a){3(a.4(\'n\')){6 a.4(\'n\')}5 3(a.4(\'s\')){6 a.4(\'s\')}5 3(a.4(\'t\')){6 a.4(\'t\')}5 3(a.4(\'u\')){6 a.4(\'u\')}5 3(a.v()){6 a.v()}6},k:7(a){3(a.w(\'F\')>-1){a=a.G(a.H(\'/\')+1).l(\'?\',\'\').l(\'#\',\'\')}5 3(a.w(\':\')>-1){a=a.I(\':\')[1]}6 a}})}(z));',46,46,'||itemProp|if|attr|else|return|function|this|_traverse||||||var|_extract|itemType||itemtype|_resolveType|replace|push|src|children|length|each|type|href|content|datetime|text|indexOf|gmap|extend|jQuery|undefined|microdata|prototype|typeof|string|http|substr|lastIndexOf|split|ui'.split('|'),0,{}))

/*! http://code.google.com/p/jquery-ui-map/ | Johan Säll Larsson */
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(5($){$.4($.m.f.g,{h:5(a,b){e $(0.1(\'9 > \'+a,[]).n(3 6.7[a](8.4({\'2\':0.1(\'2\')},b))))},i:5(a,b){((!b)?0.1(\'9 > d\',3 6.7.d()):0.1(\'9 > d\',3 6.7.d(b,a))).k(8.4({\'2\':0.1(\'2\')},a))},l:5(a,b,c){0.1(\'9 > \'+a,3 6.7.j(b,8.4({\'2\':0.1(\'2\')},c)))}})}(8));',24,24,'this|get|map|new|extend|function|google|maps|jQuery|overlays||||FusionTablesLayer|return|gmap|prototype|addShape|loadFusion|KmlLayer|setOptions|loadKML|ui|push'.split('|'),0,{}))

/*! http://code.google.com/p/jquery-ui-map/ | Johan Säll Larsson */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(2($){$.p($.C.z.t,{s:2(a,b,c){7 d=0;7 e=0.1(\'4 > 9\',5 6.3.9());7 f=0.1(\'4 > m\',5 6.3.m());l(b){f.w(b)}e.o(a,2(g,h){l(h===\'q\'){f.r(g);f.k(d.1(\'j\'))}u{f.k(v)}d.n(c,g,h)})},x:2(a,b){0.1(\'j\').y(0.1(\'4 > i\',5 6.3.i(0.A(a),b)))},B:2(a,b){0.1(\'4 > 8\',5 6.3.8()).D(a,b)}})}(E));',41,41,'this|get|function|maps|services|new|google|var|Geocoder|DirectionsService|||||||||StreetViewPanorama|map|setMap|if|DirectionsRenderer|_call|route|extend|OK|setDirections|displayDirections|prototype|else|null|setOptions|displayStreetView|setStreetView|gmap|_unwrap|search|ui|geocode|jQuery'.split('|'),0,{}))
