





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
	   if (sw > 100) { sw = 80} ;
	   if (sw < 70) { sw = 60} ;	   
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
	

	


var map = null ;


function cdin(x,y) {
      this.x = x;
      this.y = y;
      }
      
var countries = new Array() ;

countries[1] = new cdin(48.034747000000003, 16.291194999999998); 
countries[2] = new cdin(36.7666667, 2.95); 
countries[3] = new cdin(48.0332547, 16.2893814); 
countries[4] = new cdin(50.9173385, 4.4365579); 
countries[5] = new cdin(48.034747000000003, 16.291194999999998); 
countries[6] = new cdin(42.6654868, 23.4205898); 
countries[7] = new cdin(45.8801373, 15.8040113); 
countries[8] = new cdin(50.0399222, 14.4290078); 
countries[9] = new cdin(55.462514, 9.485791); 
countries[10] = new cdin(59.4610414, 24.6643895); 
countries[11] = new cdin(48.8793505, 2.2382031); 
countries[12] = new cdin(50.1461462, 8.498569); 
countries[13] = new cdin(47.5886908, 19.0825743); 
countries[14] = new cdin(45.1798234, 7.7122805); 
countries[15] = new cdin(54.682466, 20.506165); 
countries[16] = new cdin(57.0253278, 24.1315837); 
countries[17] = new cdin(54.7369856, 25.268466); 
countries[18] = new cdin(42.0009892, 21.5020081); 
countries[19] = new cdin(42.773281, 18.94416); 
countries[20] = new cdin(51.6762524, 4.5832854); 
countries[21] = new cdin(-43.5421846, 172.5322415); 
countries[22] = new cdin(31.2108616, 121.465613); 
countries[23] = new cdin(-12.0456515, -77.0672326); 
countries[24] = new cdin(50.3171261, 18.9811364); 
countries[25] = new cdin(38.7404782, -9.1487463); 
countries[26] = new cdin(44.4329773, 26.1286238); 
countries[27] = new cdin(44.8205556, 20.4622222); 
countries[28] = new cdin(48.1441936, 17.1305978); 
countries[29] = new cdin(46.5460571, 15.5215039); 
countries[30] = new cdin(41.1098534, 1.1473626); 
countries[31] = new cdin(47.3711977, 8.1719841); 
countries[32] = new cdin(40.749625, 30.0112271); 
countries[33] = new cdin(49.9935, 36.230383); 
countries[34] = new cdin(11.1423834, 106.6291304);

function country(number){

    var cent = new google.maps.LatLng(countries[number].x, countries[number].y); 
    
	map.setCenter(cent);
	jumpto("country-2");
	google.maps.event.trigger(map,"resize");
	
	}

function requestmap(map, image , number){

	dojo.xhrPost({
	    url: "http://show-how.info/liferay/requestmap/",
	    timeout: 10000,
	    content: {
	        'series': number 	         
	    },
	    handleAs : "json" ,
	    load: function(result) {
	 
	    
	    	for (var i = 0, length = result.length; i < length; i++) {
 			 var data = result[i];
      		latLng = new google.maps.LatLng(data.x_coordinate, data.y_coordinate); 
			var marker = new google.maps.Marker({
    					position: latLng,
    					map: map,
    					title: data.name,
    					icon: image
  						});
  			
			}
	      
	      } 
	});
	return(map) ;
	}

    function initialize() {
    
    var myLatlng = new google.maps.LatLng(55.5444861, 9.4621355000000005);
    
        var mapOptions = {
          center: myLatlng,
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          
        };
        
        map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
            
        map = requestmap(map,'media/img/lc3.png','Messer') ;

  }







      
        var onDeviceReady = function() {
            document.getElementById("devready").innerHTML = "OnDeviceReady fired.";
        };

        function init() {
            document.addEventListener("deviceready", onDeviceReady, true);
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
	   if (sw > 100) { sw = 80} ;
	   if (sw < 70) { sw = 60} ;	   
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
	

	


var map = null ;


function cdin(x,y) {
      this.x = x;
      this.y = y;
      }
      
var countries = new Array() ;

countries[1] = new cdin(48.034747000000003, 16.291194999999998); 
countries[2] = new cdin(36.7666667, 2.95); 
countries[3] = new cdin(48.0332547, 16.2893814); 
countries[4] = new cdin(50.9173385, 4.4365579); 
countries[5] = new cdin(48.034747000000003, 16.291194999999998); 
countries[6] = new cdin(42.6654868, 23.4205898); 
countries[7] = new cdin(45.8801373, 15.8040113); 
countries[8] = new cdin(50.0399222, 14.4290078); 
countries[9] = new cdin(55.462514, 9.485791); 
countries[10] = new cdin(59.4610414, 24.6643895); 
countries[11] = new cdin(48.8793505, 2.2382031); 
countries[12] = new cdin(50.1461462, 8.498569); 
countries[13] = new cdin(47.5886908, 19.0825743); 
countries[14] = new cdin(45.1798234, 7.7122805); 
countries[15] = new cdin(54.682466, 20.506165); 
countries[16] = new cdin(57.0253278, 24.1315837); 
countries[17] = new cdin(54.7369856, 25.268466); 
countries[18] = new cdin(42.0009892, 21.5020081); 
countries[19] = new cdin(42.773281, 18.94416); 
countries[20] = new cdin(51.6762524, 4.5832854); 
countries[21] = new cdin(-43.5421846, 172.5322415); 
countries[22] = new cdin(31.2108616, 121.465613); 
countries[23] = new cdin(-12.0456515, -77.0672326); 
countries[24] = new cdin(50.3171261, 18.9811364); 
countries[25] = new cdin(38.7404782, -9.1487463); 
countries[26] = new cdin(44.4329773, 26.1286238); 
countries[27] = new cdin(44.8205556, 20.4622222); 
countries[28] = new cdin(48.1441936, 17.1305978); 
countries[29] = new cdin(46.5460571, 15.5215039); 
countries[30] = new cdin(41.1098534, 1.1473626); 
countries[31] = new cdin(47.3711977, 8.1719841); 
countries[32] = new cdin(40.749625, 30.0112271); 
countries[33] = new cdin(49.9935, 36.230383); 
countries[34] = new cdin(11.1423834, 106.6291304);

function country(number){

    var cent = new google.maps.LatLng(countries[number].x, countries[number].y); 
    
	map.setCenter(cent);
	jumpto("country-2");
	google.maps.event.trigger(map,"resize");
	
	}

function requestmap(map, image , number){

	dojo.xhrPost({
	    url: "http://show-how.info/liferay/requestmap/",
	    timeout: 10000,
	    content: {
	        'series': number 	         
	    },
	    handleAs : "json" ,
	    load: function(result) {
	 
	    
	    	for (var i = 0, length = result.length; i < length; i++) {
 			 var data = result[i];
      		latLng = new google.maps.LatLng(data.x_coordinate, data.y_coordinate); 
			var marker = new google.maps.Marker({
    					position: latLng,
    					map: map,
    					title: data.name,
    					icon: image
  						});
  			
			}
	      
	      } 
	});
	return(map) ;
	}

    function initialize() {
    
    var myLatlng = new google.maps.LatLng(55.5444861, 9.4621355000000005);
    
        var mapOptions = {
          center: myLatlng,
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          
        };
        
        map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
            
        map = requestmap(map,'media/img/lc3.png','Messer') ;

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
	
