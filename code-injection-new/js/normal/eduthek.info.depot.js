





require([ "dojo",
  "dojo/dom",  
  "dojo/dom-style",
  "dojo/date",
 "dijit/registry",
 "dojox/mobile/parser", 
 "dojox/mobile/compat",
"dojo/_base/connect",
"dojox/mobile",
"dojo/query",
"dijit/Calendar",
"dojox/mobile/Opener",
"dojox/mobile/View",
"dojox/mobile/Slider",
"dojox/mobile/ScrollableView",
"dojox/mobile/TabBar",
"dojox/mobile/TabBarButton",
"dojox/mobile/ToolBarButton",
"dojox/mobile/TextBox",
"dojox/mobile/CheckBox",
"dojox/mobile/Switch",
"dojox/mobile/Button",
"dojox/image/LightboxNano",
"dojox/mobile/RadioButton",
"dojox/mobile/EdgeToEdgeDataList",
"dojo/data/ItemFileReadStore",
"dojox/mobile/ContentPane",
"dojox/mobile/SimpleDialog"
]);

var lastview = null ;
var state = false ;

   dojo.ready(function(){
 
	   lastview = dijit.registry.byId("legal").getShowingView();
	   sw = parseInt(window.innerWidth / 6) ;
	   if (sw > 100) { sw = 90} ;
	   if (sw < 70) { sw = 70} ;	   
	   dojo.query(".siteimage").style("height", sw + "%");
	   checkinternet();
	   pinpoint() ;
	   

initialize() ;


	   sw = parseInt(window.innerWidth/6) ;
	   

   });
   
   dojo.subscribe("/dojox/mobile/beforeTransitionIn",
		   function(view, moveTo, dir, transition, context, method){
			lastview = view ; })



   function jumpto(view) {

		lastview.performTransition(view,1,"",null);
		lastview = dijit.registry.byId("home").getShowingView();
	}
   
   function checkinternet(){
		
		dojo.xhrPost({
		    url: "http://show-how.info/liferay/ajax_internet/",
		    timeout: 10000,
		    content: {
		        'parameter': 'passed'
		    },
		    handleAs : "json" ,
		    load: function(result) {	
		            if(result.result == "ok") {
		            
		            	state = true ;
		            	} 
		            else {
		            	dijit.registry.byId('message_internet').show();
		          
		            }

		        },
		    error : function(err) {
		    	dijit.registry.byId('message_internet').show();
	
	  
		    }
		});
		}

function locate() {

if (navigator.geolocation) 
{
	navigator.geolocation.getCurrentPosition( 
 
		function (position) {  
 		if (state) {

	  	dojo.xhrPost({
	    	url: "http://show-how.info/analytics/locate/",
	    	timeout: 3000,
	    	content: {
	        'lat' : position.coords.latitude,
	        'long' : position.coords.longitude        
	        
	    },
	    handleAs : "json" ,
	    load: function(result) {
	        if(result == "ok") {
	            alert("ok");
	        }
	
	    }
	});
	}

		}, 
		function (error)
		{
			
		}
		);
	}
}

var lat = 0 ;
var longi = 0 ;

function pinpoint() {

	navigator.geolocation.getCurrentPosition( 
	 		function (position) {  
		        lat = position.coords.latitude ;
		        longi = position.coords.longitude ;       
		        
		    })
		}


function submitcontact(){
	var TechUrl = dojo.byId("response");
	
	
	if (state) {

	dojo.xhrPost({
	    url: "http://show-how.info/android/submitcontact/",
	    timeout: 10000,
	    content: {
	        'name': dojo.byId("id_name").value ,
	        'sender' : dojo.byId("id_sender").value,
	        'subject' : dojo.byId("id_subject").value,
	        'tel' : dojo.byId("id_tel").value,	        
	        'contents' : dojo.byId("id_contents").value,	        
	        
	    },
	    handleAs : "json" ,
	    load: function(result) {
	        if(result == "ok") {
	            TechUrl.innerHTML = 'Ihre Anfrage ist weitergeleitet';
	        }
	        else {
	            TechUrl.innerHTML =  'Die Weiterleitung der Anfrage ist fehlgeschlagen';
	        }
	    }
	});
	}
	else {TechUrl.innerHTML =  'Die Weiterleitung der Anfrage ist fehlgeschlagen';
	}
	}
	

	


var username = localStorage.getItem("username");
var token = localStorage.getItem("token");
var sap = localStorage.getItem("sap");
var email = localStorage.getItem("email");
var street = localStorage.getItem("street");
var zip = localStorage.getItem("zip");
var city = localStorage.getItem("city");
var country = localStorage.getItem("country");
var result;

var geocoder;
var map;
var personlatLng;
var depotlatLng;
var rendererOptions = {
  draggable: true
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
var directionsService = new google.maps.DirectionsService();


function initialize() {


    
    var myLatlng = new google.maps.LatLng(55.5444861, 9.4621355000000005);
    geocoder = new google.maps.Geocoder();
    
        var mapOptions = {
          center: myLatlng,
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          
        };
        
        map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
      
      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById("direction_canvas"));
      google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
      computeTotalDistance(directionsDisplay.directions);
               });
               
         getdeliverydata();
         changeposition();  
         if (country=="") { jumpto("intro") ; }   

  }
  
  
  function calcRoute(start,end) {
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

function gettel(text) {

patt=new RegExp('\\+?[0-9 /-]{7}[0-9 /-]+');

a=patt.exec(text);
return  a.toString().replace("/","").replace("-","").split(' ').join('');
return }

function clickcall(number) {

   window.open("tel:" + number);

}


function requestcoordinates(a){

    if (a==1) { pinpoint(); }

	dojo.xhrPost({
	    url: "http://show-how.info/liferay/requestaddress/",
	    timeout: 10000,
	    content: {
	        'x': lat ,
	        'y' : longi      
	    },
	    handleAs : "json" ,
	    load: function(result) {
	        	
			dojo.byId("xpos").value = lat ;
			dojo.byId("ypos").value = longi ;
			dojo.byId("street").value = result.street ;
			dojo.byId("city").value = result.city ;			
			dojo.byId("country").value = result.country ;	          
	    }
	});
	}
	
function changeposition() {

       street = dojo.byId("street").value ;
       city = dojo.byId("city").value ;
       country = dojo.byId("country").value ;
 
       
       }

function updatedeliverydata() {

changeposition();

localStorage.setItem("street",street) ;
localStorage.setItem("city",city) ;
localStorage.setItem("country", country);

dojo.byId("position_response").innerHTML = "Positionsdaten für späteren Bezug abgespeichert"

}	 

function getdeliverydata() {

dojo.byId("street").value = localStorage.getItem("street") ;
dojo.byId("city").value = localStorage.getItem("city") ;
dojo.byId("country").value = localStorage.getItem("country");
codeAddress();
dojo.byId("position_response").innerHTML = "retrieved stored position data from last session"

}	

function finddirections(x,y) {


  personlatLng = new google.maps.LatLng(lat, longi); 
  var marker = new google.maps.Marker({
    					position: personlatLng,
    					map: map,
    					title: "your position",
    					icon: "media/img/lc3.png"
  						})
  map.setCenter(personlatLng);
					
  depotlatLng = new google.maps.LatLng(x, y); 
  var marker = new google.maps.Marker({
    					position: depotlatLng,
    					map: map,
    					title: "depot",
    					icon: "media/img/depot.png"
  						});
  calcRoute()
  
  						
  jumpto("mapinfo");
  google.maps.event.trigger(map,"resize");
  				
}


function calcRoute() {

  var request = {
    origin: personlatLng,
    destination: depotlatLng,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}


function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000.
  
}


function requestdepots(){

  if (lat==null || longi==null)
     {
        requestcoordinates(1) ;
      };


	dojo.xhrPost({
	    url: "http://show-how.info/map/ajax_depots/",
	    timeout: 10000,
	    content: {
	        'kind' : 'depot' ,
	        'country' : country ,
	        'x': lat ,
	        'y' : longi ,
	        'max' : 200,
	        'qty' : 2     
	    },
	    handleAs : "json" ,
	    load: function(result) {
	    	var depot = dijit.registry.byId("depot_canvas"); 
	    	    depot.containerNode.innerHTML ="";
	    	var xd;
	    	var yd;

			
			for (var l=0; l< result.length; l++) {
				var depotitem = new dojox.mobile.RoundRect(); 
				depotitem.containerNode.innerHTML = result[l].html+'<br /><br />';
				td = gettel(result[l].html);
				xd = result[l].x
				yd = result[l].y
				if (l==0) {
				a1 = xd;
				b1 = yd;
				c1 = td;
				var childWidget = new dojox.mobile.Button({  onClick : function() { {finddirections(a1,b1);} } , label: "Wegbeschreibung"});
				var childWidget2 = new dojox.mobile.Button({  onClick : function() { {clickcall(c1);} } , label: "Rufen Sie an"});

				}
								if (l==1) {
				a2 = xd;
				b2 = yd;
				c2 = td;
				var childWidget = new dojox.mobile.Button({  onClick : function() { {finddirections(a2,b2);} } , label: "Wegbeschreibung"});
			    var childWidget2 = new dojox.mobile.Button({  onClick : function() { {clickcall(c2);} } , label: "Rufen Sie an"});

				}
								if (l==2) {
				a3 = xd;
				b3 = yd;
				c3 = td;
				var childWidget = new dojox.mobile.Button({  onClick : function() { {finddirections(a3,b3);} } , label: "Wegbeschreibung"});
				var childWidget2 = new dojox.mobile.Button({  onClick : function() { {clickcall(c3);} } , label: "Rufen Sie an"});
				}
		    	depotitem.addChild(childWidget);
		    	depotitem.addChild(childWidget2);		    	
		    	depot.addChild(depotitem);
		    	 }
			jumpto("depotinfo")         
	    }
	});
	}
	
  function codeAddress() {
    var address = 	dojo.byId("street").value + dojo.byId("city").value + dojo.byId("country").value ;	 
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        longi = results[0].geometry.location.lng();        
		dojo.byId("xpos").value = lat;
		dojo.byId("ypos").value = longi;
		changeposition();		
      } else {
        dijit.registry.byId('message_googlecoding').show();
      }
    });
  }











require([ "dojo",
  "dojo/dom",  
  "dojo/dom-style",
  "dojo/date",
 "dijit/registry",
 "dojox/mobile/parser", 
 "dojox/mobile/compat",
"dojo/_base/connect",
"dojox/mobile",
"dojo/query",
"dijit/Calendar",
"dojox/mobile/Opener",
"dojox/mobile/View",
"dojox/mobile/Slider",
"dojox/mobile/ScrollableView",
"dojox/mobile/TabBar",
"dojox/mobile/TabBarButton",
"dojox/mobile/ToolBarButton",
"dojox/mobile/TextBox",
"dojox/mobile/CheckBox",
"dojox/mobile/Switch",
"dojox/mobile/Button",
"dojox/image/LightboxNano",
"dojox/mobile/RadioButton",
"dojox/mobile/EdgeToEdgeDataList",
"dojo/data/ItemFileReadStore",
"dojox/mobile/ContentPane",
"dojox/mobile/SimpleDialog"
]);

var lastview = null ;
var state = false ;

   dojo.ready(function(){
 
	   lastview = dijit.registry.byId("legal").getShowingView();
	   sw = parseInt(window.innerWidth / 6) ;
	   if (sw > 100) { sw = 90} ;
	   if (sw < 70) { sw = 70} ;	   
	   dojo.query(".siteimage").style("height", sw + "%");
	   checkinternet();
	   pinpoint() ;
	   

initialize() ;


	   sw = parseInt(window.innerWidth/6) ;
	   

   });
   
   dojo.subscribe("/dojox/mobile/beforeTransitionIn",
		   function(view, moveTo, dir, transition, context, method){
			lastview = view ; })



   function jumpto(view) {

		lastview.performTransition(view,1,"",null);
		lastview = dijit.registry.byId("home").getShowingView();
	}
   
   function checkinternet(){
		
		dojo.xhrPost({
		    url: "http://show-how.info/liferay/ajax_internet/",
		    timeout: 10000,
		    content: {
		        'parameter': 'passed'
		    },
		    handleAs : "json" ,
		    load: function(result) {	
		            if(result.result == "ok") {
		            
		            	state = true ;
		            	} 
		            else {
		            	dijit.registry.byId('message_internet').show();
		          
		            }

		        },
		    error : function(err) {
		    	dijit.registry.byId('message_internet').show();
	
	  
		    }
		});
		}

function locate() {

if (navigator.geolocation) 
{
	navigator.geolocation.getCurrentPosition( 
 
		function (position) {  
 		if (state) {

	  	dojo.xhrPost({
	    	url: "/analytics/locate/",
	    	timeout: 3000,
	    	content: {
	        'lat' : position.coords.latitude,
	        'long' : position.coords.longitude        
	        
	    },
	    handleAs : "json" ,
	    load: function(result) {
	        if(result == "ok") {
	            alert("ok");
	        }
	
	    }
	});
	}

		}, 
		function (error)
		{
			
		}
		);
	}
}

var lat = 0 ;
var longi = 0 ;

function pinpoint() {

	navigator.geolocation.getCurrentPosition( 
	 		function (position) {  
		        lat = position.coords.latitude ;
		        longi = position.coords.longitude ;       
		        
		    })
		}


function submitcontact(){
	var TechUrl = dojo.byId("response");
	
	
	if (state) {

	dojo.xhrPost({
	    url: "http://show-how.info/android/submitcontact/",
	    timeout: 10000,
	    content: {
	        'name': dojo.byId("id_name").value ,
	        'sender' : dojo.byId("id_sender").value,
	        'subject' : dojo.byId("id_subject").value,
	        'tel' : dojo.byId("id_tel").value,	        
	        'contents' : dojo.byId("id_contents").value,	        
	        
	    },
	    handleAs : "json" ,
	    load: function(result) {
	        if(result == "ok") {
	            TechUrl.innerHTML = 'Submission completed';
	        }
	        else {
	            TechUrl.innerHTML =  'Submission failed';
	        }
	    }
	});
	}
	else {TechUrl.innerHTML =  'Submission failed - no internet connection';
	}
	}
	

	


var username = localStorage.getItem("username");
var token = localStorage.getItem("token");
var sap = localStorage.getItem("sap");
var email = localStorage.getItem("email");
var street = localStorage.getItem("street");
var zip = localStorage.getItem("zip");
var city = localStorage.getItem("city");
var country = localStorage.getItem("country");
var result;

var geocoder;
var map;
var personlatLng;
var depotlatLng;
var rendererOptions = {
  draggable: true
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
var directionsService = new google.maps.DirectionsService();



function initialize() {


    
    var myLatlng = new google.maps.LatLng(55.5444861, 9.4621355000000005);
    geocoder = new google.maps.Geocoder();
    
        var mapOptions = {
          center: myLatlng,
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          
        };
        
        map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
      
      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById("direction_canvas"));
      google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
      computeTotalDistance(directionsDisplay.directions);
               });
               
         getdeliverydata();        

  }
  
  
  function calcRoute(start,end) {
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

function gettel(text) {

patt=new RegExp('\\+?[0-9 /-]{7}[0-9 /-]+');

a=patt.exec(text);
return  a.toString().replace("/","").replace("-","").split(' ').join('');
return }

function clickcall(number) {

   window.open("tel:" + number);

}


function requestcoordinates(a){

    if (a==1) { pinpoint(); }

	dojo.xhrPost({
	    url: "http://show-how.info/liferay/requestaddress/",
	    timeout: 10000,
	    content: {
	        'x': lat ,
	        'y' : longi      
	    },
	    handleAs : "json" ,
	    load: function(result) {
	        	
			dojo.byId("xpos").value = lat ;
			dojo.byId("ypos").value = longi ;
			dojo.byId("street").value = result.street ;
			dojo.byId("city").value = result.city ;			
			dojo.byId("country").value = result.country ;	          
	    }
	});
	}
	
function changeposition() {

       street = dojo.byId("street").value ;
       city = dojo.byId("city").value ;
       country = dojo.byId("country").value ;
       updatedeliverydata() ;
       
       }

function updatedeliverydata() {

localStorage.setItem("street",street) ;
localStorage.setItem("city",city) ;
localStorage.setItem("country", country);

dojo.byId("position_response").innerHTML = "position data stored for future reference"

}	 

function getdeliverydata() {

dojo.byId("street").value = localStorage.getItem("street") ;
dojo.byId("city").value = localStorage.getItem("city") ;
dojo.byId("country").value = localStorage.getItem("country");
codeAddress();
dojo.byId("position_response").innerHTML = "retrieved stored position data from last session"

}	

function finddirections(x,y) {


  personlatLng = new google.maps.LatLng(lat, longi); 
  var marker = new google.maps.Marker({
    					position: personlatLng,
    					map: map,
    					title: "your position",
    					icon: "media/img/lc3.png"
  						})
  map.setCenter(personlatLng);
					
  depotlatLng = new google.maps.LatLng(x, y); 
  var marker = new google.maps.Marker({
    					position: depotlatLng,
    					map: map,
    					title: "depot",
    					icon: "media/img/depot.png"
  						});
  calcRoute()
  
  						
  jumpto("mapinfo");
  google.maps.event.trigger(map,"resize");
  				
}


function calcRoute() {

  var request = {
    origin: personlatLng,
    destination: depotlatLng,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}


function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000.
  
}


function requestdepots(){

  if (lat==null || longi==null)
     {
        requestcoordinates(1) ;
      };


	dojo.xhrPost({
	    url: "http://show-how.info/map/ajax_depots/",
	    timeout: 10000,
	    content: {
	        'kind' : 'depot' ,
	        'country' : country ,
	        'x': lat ,
	        'y' : longi ,
	        'max' : 200,
	        'qty' : 2     
	    },
	    handleAs : "json" ,
	    load: function(result) {
	    	var depot = dijit.registry.byId("depot_canvas"); 
	    	    depot.containerNode.innerHTML ="";
	    	var xd;
	    	var yd;

			
			for (var l=0; l< result.length; l++) {
				var depotitem = new dojox.mobile.RoundRect(); 
				depotitem.containerNode.innerHTML = result[l].html+'<br /><br />';
				td = gettel(result[l].html);
				xd = result[l].x
				yd = result[l].y
				if (l==0) {
				a1 = xd;
				b1 = yd;
				c1 = td;
				var childWidget = new dojox.mobile.Button({  onClick : function() { {finddirections(a1,b1);} } , label: "Directions"});
				var childWidget2 = new dojox.mobile.Button({  onClick : function() { {clickcall(c1);} } , label: "Call"});

				}
								if (l==1) {
				a2 = xd;
				b2 = yd;
				c2 = td;
				var childWidget = new dojox.mobile.Button({  onClick : function() { {finddirections(a2,b2);} } , label: "Directions"});
			    var childWidget2 = new dojox.mobile.Button({  onClick : function() { {clickcall(c2);} } , label: "Call"});

				}
								if (l==2) {
				a3 = xd;
				b3 = yd;
				c3 = td;
				var childWidget = new dojox.mobile.Button({  onClick : function() { {finddirections(a3,b3);} } , label: "Directions"});
				var childWidget2 = new dojox.mobile.Button({  onClick : function() { {clickcall(c3);} } , label: "Call"});
				}
		    	depotitem.addChild(childWidget);
		    	depotitem.addChild(childWidget2);		    	
		    	depot.addChild(depotitem);
		    	 }
			jumpto("depotinfo")         
	    }
	});
	}
	
  function codeAddress() {
    var address = 	dojo.byId("street").value + dojo.byId("city").value + dojo.byId("country").value ;	 
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        longi = results[0].geometry.location.lng();        
		dojo.byId("xpos").value = lat;
		dojo.byId("ypos").value = longi;
		changeposition();		
      } else {
        dijit.registry.byId('message_googlecoding').show();
      }
    });
  }











require([ "dojo",
  "dojo/dom",  
  "dojo/dom-style",
  "dojo/date",
 "dijit/registry",
 "dojox/mobile/parser", 
 "dojox/mobile/compat",
"dojo/_base/connect",
"dojox/mobile",
"dojo/query",
"dijit/Calendar",
"dojox/mobile/Opener",
"dojox/mobile/View",
"dojox/mobile/Slider",
"dojox/mobile/ScrollableView",
"dojox/mobile/TabBar",
"dojox/mobile/TabBarButton",
"dojox/mobile/ToolBarButton",
"dojox/mobile/TextBox",
"dojox/mobile/CheckBox",
"dojox/mobile/Switch",
"dojox/mobile/Button",
"dojox/image/LightboxNano",
"dojox/mobile/RadioButton",
"dojox/mobile/EdgeToEdgeDataList",
"dojo/data/ItemFileReadStore",
"dojox/mobile/ContentPane",
"dojox/mobile/SimpleDialog"
]);

var lastview = null ;
var state = false ;

   dojo.ready(function(){
 
	   lastview = dijit.registry.byId("legal").getShowingView();
	   sw = parseInt(window.innerWidth / 6) ;
	   if (sw > 100) { sw = 90} ;
	   if (sw < 70) { sw = 70} ;	   
	   dojo.query(".siteimage").style("height", sw + "%");
	   checkinternet();
	   pinpoint() ;
	   

initialize() ;


	   sw = parseInt(window.innerWidth/6) ;
	   

   });
   
   dojo.subscribe("/dojox/mobile/beforeTransitionIn",
		   function(view, moveTo, dir, transition, context, method){
			lastview = view ; })



   function jumpto(view) {

		lastview.performTransition(view,1,"",null);
		lastview = dijit.registry.byId("home").getShowingView();
	}
   
   function checkinternet(){
		
		dojo.xhrPost({
		    url: "http://show-how.info/liferay/ajax_internet/",
		    timeout: 10000,
		    content: {
		        'parameter': 'passed'
		    },
		    handleAs : "json" ,
		    load: function(result) {	
		            if(result.result == "ok") {
		            
		            	state = true ;
		            	} 
		            else {
		            	dijit.registry.byId('message_internet').show();
		          
		            }

		        },
		    error : function(err) {
		    	dijit.registry.byId('message_internet').show();
	
	  
		    }
		});
		}

function locate() {

if (navigator.geolocation) 
{
	navigator.geolocation.getCurrentPosition( 
 
		function (position) {  
 		if (state) {

	  	dojo.xhrPost({
	    	url: "http://show-how.info/analytics/locate/",
	    	timeout: 3000,
	    	content: {
	        'lat' : position.coords.latitude,
	        'long' : position.coords.longitude        
	        
	    },
	    handleAs : "json" ,
	    load: function(result) {
	        if(result == "ok") {
	            alert("ok");
	        }
	
	    }
	});
	}

		}, 
		function (error)
		{
			
		}
		);
	}
}

var lat = 0 ;
var longi = 0 ;

function pinpoint() {

	navigator.geolocation.getCurrentPosition( 
	 		function (position) {  
		        lat = position.coords.latitude ;
		        longi = position.coords.longitude ;       
		        
		    })
		}


function submitcontact(){
	var TechUrl = dojo.byId("response");
	
	
	if (state) {

	dojo.xhrPost({
	    url: "http://show-how.info/android/submitcontact/",
	    timeout: 10000,
	    content: {
	        'name': dojo.byId("id_name").value ,
	        'sender' : dojo.byId("id_sender").value,
	        'subject' : dojo.byId("id_subject").value,
	        'tel' : dojo.byId("id_tel").value,	        
	        'contents' : dojo.byId("id_contents").value,	        
	        
	    },
	    handleAs : "json" ,
	    load: function(result) {
	        if(result == "ok") {
	            TechUrl.innerHTML = 'Submission completed';
	        }
	        else {
	            TechUrl.innerHTML =  'Submission failed';
	        }
	    }
	});
	}
	else {TechUrl.innerHTML =  'Submission failed - no internet connection';
	}
	}
	

	


var username = localStorage.getItem("username");
var token = localStorage.getItem("token");
var sap = localStorage.getItem("sap");
var email = localStorage.getItem("email");
var street = localStorage.getItem("street");
var zip = localStorage.getItem("zip");
var city = localStorage.getItem("city");
var country = localStorage.getItem("country");
var result;

var geocoder;
var map;
var personlatLng;
var depotlatLng;
var rendererOptions = {
  draggable: true
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
var directionsService = new google.maps.DirectionsService();


function initialize() {


    
    var myLatlng = new google.maps.LatLng(55.5444861, 9.4621355000000005);
    geocoder = new google.maps.Geocoder();
    
        var mapOptions = {
          center: myLatlng,
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          
        };
        
        map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
      
      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById("direction_canvas"));
      google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
      computeTotalDistance(directionsDisplay.directions);
               });
               
         getdeliverydata();
         changeposition();  
         if (country=="") { jumpto("intro") ; }   

  }
  
  
  function calcRoute(start,end) {
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

function gettel(text) {

patt=new RegExp('\\+?[0-9 /-]{7}[0-9 /-]+');

a=patt.exec(text);
return  a.toString().replace("/","").replace("-","").split(' ').join('');
return }

function clickcall(number) {

   window.open("tel:" + number);

}


function requestcoordinates(a){

    if (a==1) { pinpoint(); }

	dojo.xhrPost({
	    url: "http://show-how.info/liferay/requestaddress/",
	    timeout: 10000,
	    content: {
	        'x': lat ,
	        'y' : longi      
	    },
	    handleAs : "json" ,
	    load: function(result) {
	        	
			dojo.byId("xpos").value = lat ;
			dojo.byId("ypos").value = longi ;
			dojo.byId("street").value = result.street ;
			dojo.byId("city").value = result.city ;			
			dojo.byId("country").value = result.country ;	          
	    }
	});
	}
	
function changeposition() {

       street = dojo.byId("street").value ;
       city = dojo.byId("city").value ;
       country = dojo.byId("country").value ;
 
       
       }

function updatedeliverydata() {

changeposition();

localStorage.setItem("street",street) ;
localStorage.setItem("city",city) ;
localStorage.setItem("country", country);

dojo.byId("position_response").innerHTML = "position data stored for future reference"

}	 

function getdeliverydata() {

dojo.byId("street").value = localStorage.getItem("street") ;
dojo.byId("city").value = localStorage.getItem("city") ;
dojo.byId("country").value = localStorage.getItem("country");
codeAddress();
dojo.byId("position_response").innerHTML = "retrieved stored position data from last session"

}	

function finddirections(x,y) {


  personlatLng = new google.maps.LatLng(lat, longi); 
  var marker = new google.maps.Marker({
    					position: personlatLng,
    					map: map,
    					title: "your position",
    					icon: "media/img/lc3.png"
  						})
  map.setCenter(personlatLng);
					
  depotlatLng = new google.maps.LatLng(x, y); 
  var marker = new google.maps.Marker({
    					position: depotlatLng,
    					map: map,
    					title: "depot",
    					icon: "media/img/depot.png"
  						});
  calcRoute()
  
  						
  jumpto("mapinfo");
  google.maps.event.trigger(map,"resize");
  				
}


function calcRoute() {

  var request = {
    origin: personlatLng,
    destination: depotlatLng,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}


function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000.
  
}


function requestdepots(){

  if (lat==null || longi==null)
     {
        requestcoordinates(1) ;
      };


	dojo.xhrPost({
	    url: "http://show-how.info/map/ajax_depots/",
	    timeout: 10000,
	    content: {
	        'kind' : 'depot' ,
	        'country' : country ,
	        'x': lat ,
	        'y' : longi ,
	        'max' : 200,
	        'qty' : 2     
	    },
	    handleAs : "json" ,
	    load: function(result) {
	    	var depot = dijit.registry.byId("depot_canvas"); 
	    	    depot.containerNode.innerHTML ="";
	    	var xd;
	    	var yd;

			
			for (var l=0; l< result.length; l++) {
				var depotitem = new dojox.mobile.RoundRect(); 
				depotitem.containerNode.innerHTML = result[l].html+'<br /><br />';
				td = gettel(result[l].html);
				xd = result[l].x
				yd = result[l].y
				if (l==0) {
				a1 = xd;
				b1 = yd;
				c1 = td;
				var childWidget = new dojox.mobile.Button({  onClick : function() { {finddirections(a1,b1);} } , label: "Directions"});
				var childWidget2 = new dojox.mobile.Button({  onClick : function() { {clickcall(c1);} } , label: "Call"});

				}
								if (l==1) {
				a2 = xd;
				b2 = yd;
				c2 = td;
				var childWidget = new dojox.mobile.Button({  onClick : function() { {finddirections(a2,b2);} } , label: "Directions"});
			    var childWidget2 = new dojox.mobile.Button({  onClick : function() { {clickcall(c2);} } , label: "Call"});

				}
								if (l==2) {
				a3 = xd;
				b3 = yd;
				c3 = td;
				var childWidget = new dojox.mobile.Button({  onClick : function() { {finddirections(a3,b3);} } , label: "Directions"});
				var childWidget2 = new dojox.mobile.Button({  onClick : function() { {clickcall(c3);} } , label: "Call"});
				}
		    	depotitem.addChild(childWidget);
		    	depotitem.addChild(childWidget2);		    	
		    	depot.addChild(depotitem);
		    	 }
			jumpto("depotinfo")         
	    }
	});
	}
	
  function codeAddress() {
    var address = 	dojo.byId("street").value + dojo.byId("city").value + dojo.byId("country").value ;	 
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        longi = results[0].geometry.location.lng();        
		dojo.byId("xpos").value = lat;
		dojo.byId("ypos").value = longi;
		changeposition();		
      } else {
        dijit.registry.byId('message_googlecoding').show();
      }
    });
  }






// Script to process all the less files and convert them to CSS files
// Run from themes/dijit/claro like:
//
//	$ node compile.js

var fs = require('fs'),		// file system access
	path = require('path'),	// get directory from file name
	less = require('../../../util/less');	// less processor

var options = {
	compress: false,
	optimization: 1,
	silent: false
};

var allFiles = [].concat(
		fs.readdirSync("."),
		fs.readdirSync("form").map(function(fname){ return "form/"+fname; }),
		fs.readdirSync("layout").map(function(fname){ return "layout/"+fname; })
	),
	lessFiles = allFiles.filter(function(name){ return name && name != "variables.less" && /\.less$/.test(name); });

lessFiles.forEach(function(fname){
	console.log("=== " + fname);
	fs.readFile(fname, 'utf-8', function(e, data){
		if(e){
			console.error("lessc: " + e.message);
			process.exit(1);
		}

		new(less.Parser)({
			paths: [path.dirname(fname)],
			optimization: options.optimization,
			filename: fname
		}).parse(data, function(err, tree){
			if(err){
				less.writeError(err, options);
				process.exit(1);
			}else{
				try{
					var css = tree.toCSS({ compress: options.compress }),
						outputFname = fname.replace('.less', '.css');
					var fd = fs.openSync(outputFname, "w");
					fs.writeSync(fd, css, 0, "utf8");
				}catch(e){
					less.writeError(e, options);
					process.exit(2);
				}
			}
		});
	});
});


isLoaded = true;


	// <!--
	var noInit = false;
		
	function init(){
		if(noInit){ return; }
		var hasParentDojo = false;
		try{
			hasParentDojo = window.parent != window && window.parent["dojo"];
		}catch(e){
			alert("Initializing iframe_history.html failed. If you are using a cross-domain Dojo build,"
				+ " please save iframe_history.html to your domain and set djConfig.dojoIframeHistoryUrl"
				+ " to the path on your domain to iframe_history.html");
			throw e;
		}

		if(hasParentDojo){
			//Set the page title so IE history shows up with a somewhat correct name.
			document.title = window.parent.document.title;
			
			//Notify parent that we are loaded.
			var pdj = window.parent.dojo;
			if(pdj["back"]){
				pdj.back._iframeLoaded(null, window.location);
			}
		}

	}
	// -->
	
