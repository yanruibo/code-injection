



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
	

	


	
function changev(a) {
	
	if (a!="acid") {dojo.byId("acid").checked=false;}
	if (a!="alternating") {dojo.byId("alternating").checked=false;}  
	if (a!="alkaline") {dojo.byId("alkaline").checked=false;}
}
	

function submitvalues(){
	var feedback = dojo.byId("viewresult");
	
	
	if (state) {

	dojo.xhrPost({
	    url: "http://show-how.info/liferay/submitneutralisation/",
	    timeout: 3000,
	    handleAs : "json" ,
	    content: {
	        'name': dojo.byId("name").value ,
	        'sender' : dojo.byId("sender").value,
	        'tel' : dojo.byId("tel").value,	   	        	    
	        'acid' : dojo.byId("acid").value,		                   
	        'alkaline' : dojo.byId("alkaline").value,	    
	        'alernating' : dojo.byId("alternating").value,	   	        
	        'NaOHpresent' : dojo.byId("c1true").value,	
	        'NaOHvalue' : dojo.byId("c1value").value,		            
	        'Limepresent' : dojo.byId("c2true").value,	
	        'Linetrue' : dojo.byId("c2value").value,	    
	        'NaClOpresent' : dojo.byId("c3true").value,	   	        
	        'NaClOvalue' : dojo.byId("c3value").value,	    
	        'other' : dojo.byId("c4true").value,		                   
	        'othercompounds' : dojo.byId("c4value").value,	    
	        'surface' : dojo.byId("t1true").value,	   	        
	        'treatment' : dojo.byId("t2true").value,	    
	        'reuse' : dojo.byId("t3true").value,	
	        'requiredph' : dojo.byId("t4true").value,	    
	        'daily' : dojo.byId("d1value").value,	   	        
	        'average' : dojo.byId("d2value").value,	    
	        'peak' : dojo.byId("d3value").value,		                   
	        'anualwaste' : dojo.byId("d4value").value,	    
	        'hpd' : dojo.byId("d5value").value,	   	        
	        'dpw' : dojo.byId("d6value").value,	    
	        'wpy' : dojo.byId("d7value").value,	
	        'phaverage' : dojo.byId("d8value").value,	    
	        'phmax' : dojo.byId("d9value").value,	   	        
	        'alcalaverage' : dojo.byId("d10value").value,	    
	        'alcalpeak' : dojo.byId("d11value").value,		                   
	        'alcaltotal' : dojo.byId("d12value").value,	    
	        'salts' : dojo.byId("d13value").value,	   	        
	        'metals' : dojo.byId("d14value").value,	
	        'Taverage' : dojo.byId("d15value").value,	
	        'Tpeak' : dojo.byId("d16value").value,	    
	        'Tmin' : dojo.byId("d17value").value,	   	        
	        'acid' : dojo.byId("n1value").value,	    
	        'consumption' : dojo.byId("n2value").value,		                   
	        'priceacid' : dojo.byId("n3value").value,	    
	        'otherinfoacid' : dojo.byId("n4value").value,	   	                           
	        'solidstype' : dojo.byId("a1value").value,	    
	        'solidsvalue' : dojo.byId("a2value").value,	   	        
	        'indoor' : dojo.byId("b1value").value,	    
	        'access' : dojo.byId("b2value").value,	
        	'width' : dojo.byId("b3value").value,	    
	        'height' : dojo.byId("b4value").value,		                   
	        'length' : dojo.byId("b5value").value,	    
	        'volume' : dojo.byId("b6value").value,	   	        
	        'relativeheight' : dojo.byId("b7value").value,	    
	        'pumpflow' : dojo.byId("m1value").value,
	        'pumppressure' : dojo.byId("m2value").value,	
	        'pumpdia' : dojo.byId("m3value").value				        
	    },
	    load: function(result) {
	        if(result.result == "ok") {
	            feedback.innerHTML = result.message;
	        }
	        else {
	            feedback.innerHTML =  result.message;
	        }
	    }
	});
	}
	else {feedback.innerHTML =  'Submission failed - no internet connection';
	}
	jumpto("thanks")
	}
	
function calch2so4(conc) {
	
	cons=dojo.byId("ii1").value;
    res = 2*44.01*(conc*cons/100)/98.08;
	dojo.byId("resulth2so4").innerHTML = twodecimals(res);
	dojo.byId("kgpa").innerHTML = "kg per annum" ;
	if (dojo.byId("ii4").checked) 
	  { 	dojo.byId("resulth2so4").innerHTML = twodecimals(res*1.44);
	  
	dojo.byId("kgpa").innerHTML = "l per annum" ;}
	
	
	}
	
function calchcl(conc) {
	
	cons=dojo.byId("ii3").value;
	dojo.byId("resulthcl").innerHTML = twodecimals(44.01*(conc*cons/100)/36.45);
	
	
	}
	
function calchno3(conc) {
	
	cons=dojo.byId("ii2").value;
	dojo.byId("resulthno3").innerHTML = twodecimals(44.01*(conc*cons/100)/63.01);
	
	
	}
	
function twodecimals(a) {
	
	a = a.toString()
	b = ( a).split(".")
	if (b[1]) {
		return b[0] + "," + b[1].substring(0,2) ;
	}
	return a
	
	
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
	
