



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
	

	


function requestvalve(product,name){

	dojo.xhrPost({
	    url: "http://show-how.info/mobile/valves/en",
	    timeout: 10000,
	    content: {
	        'product': product,
	        'country': 'all'      	         
	    },
	    handleAs : "json" ,
	    load: function(result) {
	    	jumpto("valve");
	        dojo.byId("gasinfo").innerHTML = name ;
	        var startentry = dijit.registry.byId("valveinput") ;
	    	startentry.containerNode.innerHTML ="";
	    	if (result.length!=0) {
			for (var l=0; l< result.length; l++) {
				var countryvalve = new dojox.mobile.RoundRect(); 
				countryvalve.containerNode.innerHTML = '<img src="media/img/icons/flags/png/' + result[l].country.replace(/\s/g, "") + '.png" />' 
													+ '<span class="countrystyle" >' + result[l].country + '</span>'
													+ '<span class="valvestyle" >' + result[l].valve + '</span>';
				startentry.addChild(countryvalve) ; }
	      
	      } 
	
	      else {
	      		var countryvalve = new dojox.mobile.RoundRect(); 
				countryvalve.containerNode.innerHTML =  "database under construction - no data available for this product" ;
				startentry.addChild(countryvalve) ;
	      
	       }
	       }
	});

	}
	
	function requestcountry(country){

	dojo.xhrPost({
	    url: "http://show-how.info/mobile/valves/en",
	    timeout: 10000,
	    content: {
	        'product': 'all',
	        'country': country	              	         
	    },
	    handleAs : "json" ,
	    load: function(result) {
	    	jumpto("country");
	        dojo.byId("countryinfo").innerHTML = '<img src="media/img/icons/flags/png/' + country.replace(/\s/g, "") + '.png" />' 
	        										+ '<span class="countrystyle" >' + country + '</span>';
	        var startentry = dijit.registry.byId("countryinput") ;
	    	startentry.containerNode.innerHTML ="";
	    	if (result.length!=0) {
			for (var l=0; l< result.length; l++) {
				var countryvalve = new dojox.mobile.RoundRect(); 

				countryvalve.containerNode.innerHTML =  result[l].product  + '<span style="float:right;">' + result[l].valve + '</span>' ;
				startentry.addChild(countryvalve) ; 
				} }
			else {	
				var countryvalve = new dojox.mobile.RoundRect(); 
				countryvalve.containerNode.innerHTML =  "no information available for this country" ;
				startentry.addChild(countryvalve) ;
			
			
			}
			
	      
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
	
