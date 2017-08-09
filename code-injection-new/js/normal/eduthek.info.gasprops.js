



require([ "dojo",
  "dojo/dom",  
  "dojo/dom-style",
  "dojo/date",
 "dijit/registry",
 "dojo/parser", 
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
	   

	   dojo.query(".frombutton").style("width",  "70px");  
	   dojo.query(".tobutton").style("width", "70px"); 
	   dojo.query(".frombutton").style("height", "40px");  
	   dojo.query(".tobutton").style("height", "40px");  


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
	

	




function parseLocalNum(num)
{
    return ((num+' ').replace(",", "."));
}

function calculatei(gasi) {

	var n = dojo.byId("origin"+gasi);
	if(n){origin=n.value ;}
	gas = gasi ;
	calculate() ;
}

function reversecalculatei(gasi) {

	var n = dojo.byId("result"+gasi);
	if(n){result=n.value ;}
	gas = gasi ;
	reverse_calculate() ;
}

function calculate() {
	
	
	origin = dojo.byId("origin"+gas).value  ;
	var convert = factors[gas][unitfrom][unitto] ; 
	if ((convert != null) && ( convert != 0))
	{
		result = origin*convert ;
	dojo.byId("result"+gas).value = parseLocalNum(result.toFixed(2))  ;
	dojo.byId("origin"+gas).value = origin.toFixed(2) ;	
			}
		
		else {
			dojo.byId("result"+gas).value = "no conversion available" ;	
			}
	
		}


function reverse_calculate() {
	
	dojo.byId("result"+gas).value = result ;
	var convert = factors[gas][unitfrom][unitto] ; 
	if ((convert != null) && (convert != 0))
	{
			origin = result/convert.toFixed(2) ;
			dojo.byId("origin"+gas).value = parseLocalNum(origin.toFixed(2)) ;
			}
		
		else {
			dojo.byId("origin"+gas).value = "no conversion available" ;	
			}
}

function clickfrom(from,gasi) {
	
	for (var i=1 ; i < units.length ; i++) {
		dojo.style("from" + units[i] + gasi, "background", "#013c88") ;
	}
	dojo.style("from"+from+gasi, "background", "#E5312B") ;

	unitfrom = from ;
	gas=gasi ;
	
	for (var i=1 ; i < units.length ; i++) {
		dojo.style("to" + units[i] + gasi, "background", "#c8c8c8") ;
	}
	
	for (var i=1; i < units.length ; i++ ) {
		if ((factors[gas][from][units[i]] == null) & (factors[gas][units[i]][from] == null) )
			{ dojo.style("to"+ units[i] + gasi, "background", "#c8c8c8") ;}
		else {dojo.style("to"+ units[i] + gasi, "background", "#013c88") ;}
	}
	
	dojo.style("to"+unitto+gasi, "background", "#E5312B") ;

	
	calculate() ;
}

function clickto(to,gasi) {
	

		
	
	for (var i=1 ; i < units.length ; i++) {
		dojo.style("to" + units[i] + gasi, "background", "#c8c8c8") ;
	}
	dojo.style("to"+to + gasi, "background","#E5312B" ) ;

	unitto = to ;
	gas=gasi ;
	
	for (var i=1 ; i < units.length ; i++) {
		dojo.style("to" + units[i] + gasi, "background", "#c8c8c8") ;
	}
	
	for (var i=1; i < units.length ; i++ ) {
		if ((factors[gas][unitfrom][units[i]] == null) & (factors[gas][units[i]][unitfrom] == null) )
			{ dojo.style("to"+ units[i] + gasi, "background", "#c8c8c8") ;}
		else {dojo.style("to"+ units[i] + gasi, "background", "#013c88") ;}
	}
	
	dojo.style("to"+to + gasi, "background","#E5312B" ) ;
	
	calculate() ; 
}

function reset(gasi) {
	
	gas= gasi ;
	unitfrom = units[1] ;
	unitto = units[1] ;
	origin = 1 ;
	result = 0 ;
	clickfrom(unitfrom,gasi) ;
	clickto(unitto,gasi) ;
	calculate() ;
	
}








units = new Array() ;

units[1] =  "gal" ;

units[2] =  "kg" ;

units[3] =  "l" ;

units[4] =  "lb." ;

units[5] =  "l min" ;

units[6] =  "m3" ;

units[7] =  "m3 h" ;

units[8] =  "Nm3" ;

units[9] =  "Nm h" ;

units[10] =  "scf" ;

units[11] =  "tpd" ;

factors= new Array() ;

factors['Helium'] = new Array() ;

factors['Helium']['gal'] = new Array() ;

factors['Helium']['kg'] = new Array() ;

factors['Helium']['l'] = new Array() ;

factors['Helium']['lb.'] = new Array() ;

factors['Helium']['l min'] = new Array() ;

factors['Helium']['m3'] = new Array() ;

factors['Helium']['m3 h'] = new Array() ;

factors['Helium']['Nm3'] = new Array() ;

factors['Helium']['Nm h'] = new Array() ;

factors['Helium']['scf'] = new Array() ;

factors['Helium']['tpd'] = new Array() ;


factors['Kohlendioxid'] = new Array() ;

factors['Kohlendioxid']['gal'] = new Array() ;

factors['Kohlendioxid']['kg'] = new Array() ;

factors['Kohlendioxid']['l'] = new Array() ;

factors['Kohlendioxid']['lb.'] = new Array() ;

factors['Kohlendioxid']['l min'] = new Array() ;

factors['Kohlendioxid']['m3'] = new Array() ;

factors['Kohlendioxid']['m3 h'] = new Array() ;

factors['Kohlendioxid']['Nm3'] = new Array() ;

factors['Kohlendioxid']['Nm h'] = new Array() ;

factors['Kohlendioxid']['scf'] = new Array() ;

factors['Kohlendioxid']['tpd'] = new Array() ;


factors['Stickstoff'] = new Array() ;

factors['Stickstoff']['gal'] = new Array() ;

factors['Stickstoff']['kg'] = new Array() ;

factors['Stickstoff']['l'] = new Array() ;

factors['Stickstoff']['lb.'] = new Array() ;

factors['Stickstoff']['l min'] = new Array() ;

factors['Stickstoff']['m3'] = new Array() ;

factors['Stickstoff']['m3 h'] = new Array() ;

factors['Stickstoff']['Nm3'] = new Array() ;

factors['Stickstoff']['Nm h'] = new Array() ;

factors['Stickstoff']['scf'] = new Array() ;

factors['Stickstoff']['tpd'] = new Array() ;


factors['Sauerstoff'] = new Array() ;

factors['Sauerstoff']['gal'] = new Array() ;

factors['Sauerstoff']['kg'] = new Array() ;

factors['Sauerstoff']['l'] = new Array() ;

factors['Sauerstoff']['lb.'] = new Array() ;

factors['Sauerstoff']['l min'] = new Array() ;

factors['Sauerstoff']['m3'] = new Array() ;

factors['Sauerstoff']['m3 h'] = new Array() ;

factors['Sauerstoff']['Nm3'] = new Array() ;

factors['Sauerstoff']['Nm h'] = new Array() ;

factors['Sauerstoff']['scf'] = new Array() ;

factors['Sauerstoff']['tpd'] = new Array() ;


factors['Argon'] = new Array() ;

factors['Argon']['gal'] = new Array() ;

factors['Argon']['kg'] = new Array() ;

factors['Argon']['l'] = new Array() ;

factors['Argon']['lb.'] = new Array() ;

factors['Argon']['l min'] = new Array() ;

factors['Argon']['m3'] = new Array() ;

factors['Argon']['m3 h'] = new Array() ;

factors['Argon']['Nm3'] = new Array() ;

factors['Argon']['Nm h'] = new Array() ;

factors['Argon']['scf'] = new Array() ;

factors['Argon']['tpd'] = new Array() ;


factors['Wasserstoff'] = new Array() ;

factors['Wasserstoff']['gal'] = new Array() ;

factors['Wasserstoff']['kg'] = new Array() ;

factors['Wasserstoff']['l'] = new Array() ;

factors['Wasserstoff']['lb.'] = new Array() ;

factors['Wasserstoff']['l min'] = new Array() ;

factors['Wasserstoff']['m3'] = new Array() ;

factors['Wasserstoff']['m3 h'] = new Array() ;

factors['Wasserstoff']['Nm3'] = new Array() ;

factors['Wasserstoff']['Nm h'] = new Array() ;

factors['Wasserstoff']['scf'] = new Array() ;

factors['Wasserstoff']['tpd'] = new Array() ;



factors['Helium']['kg']['kg']=1.0;

factors['Helium']['kg']['l']=8.0;

factors['Helium']['kg']['m3']=5.978;

factors['Helium']['kg']['Nm3']=5.602;

factors['Helium']['l']['kg']=0.125;

factors['Helium']['l']['l']=1.0;

factors['Helium']['l']['m3']=0.749;

factors['Helium']['l']['Nm3']=0.7;

factors['Helium']['l min']['l min']=1.0;

factors['Helium']['l min']['m3 h']=0.06;

factors['Helium']['l min']['Nm h']=42.0;

factors['Helium']['l min']['tpd']=0.000240963855422;

factors['Helium']['m3']['kg']=0.167280026765;

factors['Helium']['m3']['l']=1.33511348465;

factors['Helium']['m3']['m3']=1.0;

factors['Helium']['m3']['Nm3']=0.937;

factors['Helium']['m3 h']['l min']=16.6666666667;

factors['Helium']['m3 h']['m3 h']=1.0;

factors['Helium']['m3 h']['Nm h']=0.937;

factors['Helium']['m3 h']['tpd']=0.00400801603206;

factors['Helium']['Nm3']['kg']=0.17850767583;

factors['Helium']['Nm3']['l']=1.42857142857;

factors['Helium']['Nm3']['m3']=1.06723585912;

factors['Helium']['Nm3']['Nm3']=1.0;

factors['Helium']['Nm h']['l min']=0.0238095238095;

factors['Helium']['Nm h']['m3 h']=1.06723585912;

factors['Helium']['Nm h']['Nm h']=1.0;

factors['Helium']['Nm h']['tpd']=0.0042841842138;

factors['Helium']['tpd']['l min']=4150.0;

factors['Helium']['tpd']['m3 h']=249.5;

factors['Helium']['tpd']['Nm h']=233.416667;

factors['Helium']['tpd']['tpd']=1.0;

factors['Kohlendioxid']['kg']['kg']=1.0;

factors['Kohlendioxid']['kg']['l']=0.0;

factors['Kohlendioxid']['kg']['m3']=0.541;

factors['Kohlendioxid']['kg']['Nm3']=0.506;

factors['Kohlendioxid']['l']['l']=1.0;

factors['Kohlendioxid']['l min']['l min']=1.0;

factors['Kohlendioxid']['l min']['m3 h']=0.0;

factors['Kohlendioxid']['l min']['Nm h']=0.0;

factors['Kohlendioxid']['l min']['tpd']=0.00265957446809;

factors['Kohlendioxid']['m3']['kg']=1.84842883549;

factors['Kohlendioxid']['m3']['m3']=1.0;

factors['Kohlendioxid']['m3']['Nm3']=0.934;

factors['Kohlendioxid']['m3 h']['m3 h']=1.0;

factors['Kohlendioxid']['m3 h']['Nm h']=0.934;

factors['Kohlendioxid']['m3 h']['tpd']=0.0443622919862;

factors['Kohlendioxid']['Nm3']['kg']=1.97628458498;

factors['Kohlendioxid']['Nm3']['m3']=1.07066381156;

factors['Kohlendioxid']['Nm3']['Nm3']=1.0;

factors['Kohlendioxid']['Nm h']['m3 h']=1.07066381156;

factors['Kohlendioxid']['Nm h']['Nm h']=1.0;

factors['Kohlendioxid']['Nm h']['tpd']=0.0474308307894;

factors['Kohlendioxid']['tpd']['l min']=376.0;

factors['Kohlendioxid']['tpd']['m3 h']=22.5416667;

factors['Kohlendioxid']['tpd']['Nm h']=21.083333;

factors['Kohlendioxid']['tpd']['tpd']=1.0;

factors['Stickstoff']['gal']['gal']=1.0;

factors['Stickstoff']['gal']['kg']=3.06;

factors['Stickstoff']['gal']['l']=3.785;

factors['Stickstoff']['gal']['lb.']=6.745;

factors['Stickstoff']['gal']['Nm3']=2.447;

factors['Stickstoff']['gal']['scf']=93.11;

factors['Stickstoff']['kg']['gal']=0.3262;

factors['Stickstoff']['kg']['kg']=1.0;

factors['Stickstoff']['kg']['l']=1.237;

factors['Stickstoff']['kg']['lb.']=2.205;

factors['Stickstoff']['kg']['m3']=0.855;

factors['Stickstoff']['kg']['Nm3']=0.8;

factors['Stickstoff']['kg']['scf']=30.42;

factors['Stickstoff']['l']['gal']=0.2642;

factors['Stickstoff']['l']['kg']=0.808407437348;

factors['Stickstoff']['l']['l']=1.0;

factors['Stickstoff']['l']['lb.']=1.782;

factors['Stickstoff']['l']['m3']=0.691;

factors['Stickstoff']['l']['Nm3']=0.647;

factors['Stickstoff']['l']['scf']=24.6;

factors['Stickstoff']['lb.']['gal']=0.1481;

factors['Stickstoff']['lb.']['kg']=0.4536;

factors['Stickstoff']['lb.']['l']=0.5606;

factors['Stickstoff']['lb.']['lb.']=1.0;

factors['Stickstoff']['lb.']['Nm3']=0.3627;

factors['Stickstoff']['lb.']['scf']=13.803;

factors['Stickstoff']['l min']['l min']=1.0;

factors['Stickstoff']['l min']['m3 h']=0.06;

factors['Stickstoff']['l min']['Nm h']=0.06;

factors['Stickstoff']['l min']['tpd']=0.0016835016835;

factors['Stickstoff']['m3']['kg']=1.16959064327;

factors['Stickstoff']['m3']['l']=1.44717800289;

factors['Stickstoff']['m3']['m3']=1.0;

factors['Stickstoff']['m3']['Nm3']=0.936;

factors['Stickstoff']['m3 h']['l min']=16.6666666667;

factors['Stickstoff']['m3 h']['m3 h']=1.0;

factors['Stickstoff']['m3 h']['Nm h']=0.936;

factors['Stickstoff']['m3 h']['tpd']=0.0280701754386;

factors['Stickstoff']['Nm3']['gal']=0.408;

factors['Stickstoff']['Nm3']['kg']=1.25;

factors['Stickstoff']['Nm3']['l']=1.5455950541;

factors['Stickstoff']['Nm3']['lb.']=2.757;

factors['Stickstoff']['Nm3']['m3']=1.06837606838;

factors['Stickstoff']['Nm3']['Nm3']=1.0;

factors['Stickstoff']['Nm3']['scf']=38.04;

factors['Stickstoff']['Nm h']['l min']=16.6666666667;

factors['Stickstoff']['Nm h']['m3 h']=1.06837606838;

factors['Stickstoff']['Nm h']['Nm h']=1.0;

factors['Stickstoff']['Nm h']['tpd']=0.03000003;

factors['Stickstoff']['scf']['gal']=0.01074;

factors['Stickstoff']['scf']['kg']=0.03286;

factors['Stickstoff']['scf']['l']=0.0407;

factors['Stickstoff']['scf']['lb.']=0.07245;

factors['Stickstoff']['scf']['Nm3']=0.02628;

factors['Stickstoff']['scf']['scf']=1.0;

factors['Stickstoff']['tpd']['l min']=594.0;

factors['Stickstoff']['tpd']['m3 h']=35.625;

factors['Stickstoff']['tpd']['Nm h']=33.3333;

factors['Stickstoff']['tpd']['tpd']=1.0;

factors['Sauerstoff']['gal']['gal']=1.0;

factors['Sauerstoff']['gal']['kg']=4.322;

factors['Sauerstoff']['gal']['l']=3.785;

factors['Sauerstoff']['gal']['lb.']=9.527;

factors['Sauerstoff']['gal']['Nm3']=3.025;

factors['Sauerstoff']['gal']['scf']=115.1;

factors['Sauerstoff']['kg']['gal']=0.2316;

factors['Sauerstoff']['kg']['kg']=1.0;

factors['Sauerstoff']['kg']['l']=0.876;

factors['Sauerstoff']['kg']['lb.']=2.205;

factors['Sauerstoff']['kg']['m3']=0.748;

factors['Sauerstoff']['kg']['Nm3']=0.7;

factors['Sauerstoff']['kg']['scf']=26.62;

factors['Sauerstoff']['l']['gal']=0.2642;

factors['Sauerstoff']['l']['kg']=1.14155251142;

factors['Sauerstoff']['l']['l']=1.0;

factors['Sauerstoff']['l']['lb.']=2.517;

factors['Sauerstoff']['l']['m3']=0.853;

factors['Sauerstoff']['l']['Nm3']=0.799;

factors['Sauerstoff']['l']['scf']=30.38;

factors['Sauerstoff']['lb.']['gal']=0.10496483678;

factors['Sauerstoff']['lb.']['kg']=0.4536;

factors['Sauerstoff']['lb.']['l']=0.3977;

factors['Sauerstoff']['lb.']['lb.']=1.0;

factors['Sauerstoff']['lb.']['Nm3']=0.3174;

factors['Sauerstoff']['lb.']['scf']=12.076;

factors['Sauerstoff']['l min']['l min']=1.0;

factors['Sauerstoff']['l min']['m3 h']=0.06;

factors['Sauerstoff']['l min']['Nm h']=0.06;

factors['Sauerstoff']['l min']['tpd']=0.00192307692308;

factors['Sauerstoff']['m3']['kg']=1.33689839572;

factors['Sauerstoff']['m3']['l']=1.17233294256;

factors['Sauerstoff']['m3']['m3']=1.0;

factors['Sauerstoff']['m3']['Nm3']=0.936;

factors['Sauerstoff']['m3 h']['l min']=16.6666666667;

factors['Sauerstoff']['m3 h']['m3 h']=1.0;

factors['Sauerstoff']['m3 h']['Nm h']=0.936;

factors['Sauerstoff']['m3 h']['tpd']=0.032085561463;

factors['Sauerstoff']['Nm3']['gal']=0.331;

factors['Sauerstoff']['Nm3']['kg']=1.42857142857;

factors['Sauerstoff']['Nm3']['l']=1.25156445557;

factors['Sauerstoff']['Nm3']['lb.']=3.151;

factors['Sauerstoff']['Nm3']['m3']=1.06837606838;

factors['Sauerstoff']['Nm3']['Nm3']=1.0;

factors['Sauerstoff']['Nm3']['scf']=38.04;

factors['Sauerstoff']['Nm h']['l min']=16.6666666667;

factors['Sauerstoff']['Nm h']['m3 h']=1.06837606838;

factors['Sauerstoff']['Nm h']['Nm h']=1.0;

factors['Sauerstoff']['Nm h']['tpd']=0.0342857142465;

factors['Sauerstoff']['scf']['gal']=0.008691;

factors['Sauerstoff']['scf']['kg']=0.03756;

factors['Sauerstoff']['scf']['l']=0.0329;

factors['Sauerstoff']['scf']['lb.']=0.08281;

factors['Sauerstoff']['scf']['Nm3']=0.02628;

factors['Sauerstoff']['scf']['scf']=1.0;

factors['Sauerstoff']['tpd']['l min']=520.0;

factors['Sauerstoff']['tpd']['m3 h']=31.1666667;

factors['Sauerstoff']['tpd']['Nm h']=29.1666667;

factors['Sauerstoff']['tpd']['tpd']=1.0;

factors['Argon']['gal']['gal']=1.0;

factors['Argon']['gal']['kg']=5.27509627051;

factors['Argon']['gal']['l']=3.785;

factors['Argon']['gal']['lb.']=11.63;

factors['Argon']['gal']['Nm3']=2.957;

factors['Argon']['gal']['scf']=112.5;

factors['Argon']['kg']['gal']=0.18957;

factors['Argon']['kg']['kg']=1.0;

factors['Argon']['kg']['l']=0.717;

factors['Argon']['kg']['lb.']=2.205;

factors['Argon']['kg']['m3']=0.599;

factors['Argon']['kg']['Nm3']=0.561;

factors['Argon']['kg']['scf']=21.32;

factors['Argon']['l']['gal']=0.2642;

factors['Argon']['l']['kg']=1.39470013947;

factors['Argon']['l']['l']=1.0;

factors['Argon']['l']['lb.']=3.072;

factors['Argon']['l']['m3']=0.835;

factors['Argon']['l']['Nm3']=0.781;

factors['Argon']['l']['scf']=29.71;

factors['Argon']['lb.']['gal']=0.086;

factors['Argon']['lb.']['kg']=0.4536;

factors['Argon']['lb.']['l']=0.3255;

factors['Argon']['lb.']['lb.']=1.0;

factors['Argon']['lb.']['Nm3']=0.2543;

factors['Argon']['lb.']['scf']=9.671;

factors['Argon']['l min']['l min']=1.0;

factors['Argon']['l min']['m3 h']=0.06;

factors['Argon']['l min']['Nm h']=0.06;

factors['Argon']['l min']['tpd']=0.00240384615385;

factors['Argon']['m3']['kg']=1.6694490818;

factors['Argon']['m3']['l']=1.19760479042;

factors['Argon']['m3']['m3']=1.0;

factors['Argon']['m3']['Nm3']=0.936;

factors['Argon']['m3 h']['l min']=16.6666666667;

factors['Argon']['m3 h']['m3 h']=1.0;

factors['Argon']['m3 h']['Nm h']=0.936;

factors['Argon']['m3 h']['tpd']=0.0400667780168;

factors['Argon']['Nm3']['gal']=0.3382;

factors['Argon']['Nm3']['kg']=1.7825311943;

factors['Argon']['Nm3']['l']=1.28040973111;

factors['Argon']['Nm3']['lb.']=3.933;

factors['Argon']['Nm3']['m3']=1.06837606838;

factors['Argon']['Nm3']['Nm3']=1.0;

factors['Argon']['Nm3']['scf']=38.04;

factors['Argon']['Nm h']['l min']=16.6666666667;

factors['Argon']['Nm h']['m3 h']=1.06837606838;

factors['Argon']['Nm h']['Nm h']=1.0;

factors['Argon']['Nm h']['tpd']=0.0427807486631;

factors['Argon']['scf']['gal']=0.008893;

factors['Argon']['scf']['kg']=0.0469;

factors['Argon']['scf']['l']=0.0337;

factors['Argon']['scf']['lb.']=0.1034;

factors['Argon']['scf']['Nm3']=0.02628;

factors['Argon']['scf']['scf']=1.0;

factors['Argon']['tpd']['l min']=416.0;

factors['Argon']['tpd']['m3 h']=24.9583333;

factors['Argon']['tpd']['Nm h']=23.375;

factors['Argon']['tpd']['tpd']=1.0;

factors['Wasserstoff']['kg']['kg']=1.0;

factors['Wasserstoff']['kg']['l']=14.126;

factors['Wasserstoff']['kg']['m3']=11.892;

factors['Wasserstoff']['kg']['Nm3']=11.123;

factors['Wasserstoff']['l']['kg']=0.070791448393;

factors['Wasserstoff']['l']['l']=1.0;

factors['Wasserstoff']['l']['m3']=0.842;

factors['Wasserstoff']['l']['Nm3']=0.788;

factors['Wasserstoff']['l min']['l min']=1.0;

factors['Wasserstoff']['l min']['m3 h']=35.08333;

factors['Wasserstoff']['l min']['Nm h']=47.28;

factors['Wasserstoff']['l min']['tpd']=0.000120992135511;

factors['Wasserstoff']['m3']['kg']=0.084090144635;

factors['Wasserstoff']['m3']['l']=1.18764845606;

factors['Wasserstoff']['m3']['m3']=1.0;

factors['Wasserstoff']['m3 h']['l min']=0.0285035656535;

factors['Wasserstoff']['m3 h']['m3 h']=1.0;

factors['Wasserstoff']['m3 h']['Nm h']=0.934;

factors['Wasserstoff']['m3 h']['tpd']=0.00201816347124;

factors['Wasserstoff']['Nm3']['kg']=0.0899038029309;

factors['Wasserstoff']['Nm3']['l']=1.26903553299;

factors['Wasserstoff']['Nm3']['Nm3']=1.0;

factors['Wasserstoff']['Nm h']['l min']=0.0211505922166;

factors['Wasserstoff']['Nm h']['m3 h']=1.07066381156;

factors['Wasserstoff']['Nm h']['Nm h']=1.0;

factors['Wasserstoff']['Nm h']['tpd']=0.00215710948882;

factors['Wasserstoff']['tpd']['l min']=8265.0;

factors['Wasserstoff']['tpd']['m3 h']=495.5;

factors['Wasserstoff']['tpd']['Nm h']=463.58333;

factors['Wasserstoff']['tpd']['tpd']=1.0;

var gas= 0 ;
var unitfrom = units[1] ;
var unitto = units[1] ;
var origin = 1 ;
var result = 0 ;

var state= navigator.onLine ;







require([ "dojo",
  "dojo/dom",  
  "dojo/dom-style",
  "dojo/date",
 "dijit/registry",
 "dojo/parser", 
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
	   

	   dojo.query(".frombutton").style("width",  "70px");  
	   dojo.query(".tobutton").style("width", "70px"); 
	   dojo.query(".frombutton").style("height", "40px");  
	   dojo.query(".tobutton").style("height", "40px");  


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
	

	




function parseLocalNum(num)
{
    return ((num+' ').replace(",", "."));
}

function calculatei(gasi) {

	var n = dojo.byId("origin"+gasi);
	if(n){origin=n.value ;}
	gas = gasi ;
	calculate() ;
}

function reversecalculatei(gasi) {

	var n = dojo.byId("result"+gasi);
	if(n){result=n.value ;}
	gas = gasi ;
	reverse_calculate() ;
}

function calculate() {
	
	
	origin = dojo.byId("origin"+gas).value  ;
	var convert = factors[gas][unitfrom][unitto] ; 
	if ((convert != null) && ( convert != 0))
	{
		result = origin*convert ;
	dojo.byId("result"+gas).value = parseLocalNum(result.toFixed(2))  ;
	dojo.byId("origin"+gas).value = origin.toFixed(2) ;	
			}
		
		else {
			dojo.byId("result"+gas).value = "no conversion available" ;	
			}
	
		}


function reverse_calculate() {
	
	dojo.byId("result"+gas).value = result ;
	var convert = factors[gas][unitfrom][unitto] ; 
	if ((convert != null) && (convert != 0))
	{
			origin = result/convert.toFixed(2) ;
			dojo.byId("origin"+gas).value = parseLocalNum(origin.toFixed(2)) ;
			}
		
		else {
			dojo.byId("origin"+gas).value = "no conversion available" ;	
			}
}

function clickfrom(from,gasi) {
	
	for (var i=1 ; i < units.length ; i++) {
		dojo.style("from" + units[i] + gasi, "background", "#013c88") ;
	}
	dojo.style("from"+from+gasi, "background", "#E5312B") ;

	unitfrom = from ;
	gas=gasi ;
	
	for (var i=1 ; i < units.length ; i++) {
		dojo.style("to" + units[i] + gasi, "background", "#c8c8c8") ;
	}
	
	for (var i=1; i < units.length ; i++ ) {
		if ((factors[gas][from][units[i]] == null) & (factors[gas][units[i]][from] == null) )
			{ dojo.style("to"+ units[i] + gasi, "background", "#c8c8c8") ;}
		else {dojo.style("to"+ units[i] + gasi, "background", "#013c88") ;}
	}
	
	dojo.style("to"+unitto+gasi, "background", "#E5312B") ;

	
	calculate() ;
}

function clickto(to,gasi) {
	

		
	
	for (var i=1 ; i < units.length ; i++) {
		dojo.style("to" + units[i] + gasi, "background", "#c8c8c8") ;
	}
	dojo.style("to"+to + gasi, "background","#E5312B" ) ;

	unitto = to ;
	gas=gasi ;
	
	for (var i=1 ; i < units.length ; i++) {
		dojo.style("to" + units[i] + gasi, "background", "#c8c8c8") ;
	}
	
	for (var i=1; i < units.length ; i++ ) {
		if ((factors[gas][unitfrom][units[i]] == null) & (factors[gas][units[i]][unitfrom] == null) )
			{ dojo.style("to"+ units[i] + gasi, "background", "#c8c8c8") ;}
		else {dojo.style("to"+ units[i] + gasi, "background", "#013c88") ;}
	}
	
	dojo.style("to"+to + gasi, "background","#E5312B" ) ;
	
	calculate() ; 
}

function reset(gasi) {
	
	gas= gasi ;
	unitfrom = units[1] ;
	unitto = units[1] ;
	origin = 1 ;
	result = 0 ;
	clickfrom(unitfrom,gasi) ;
	clickto(unitto,gasi) ;
	calculate() ;
	
}








units = new Array() ;

units[1] =  "gal" ;

units[2] =  "kg" ;

units[3] =  "l" ;

units[4] =  "lb." ;

units[5] =  "l min" ;

units[6] =  "m3" ;

units[7] =  "m3 h" ;

units[8] =  "Nm3" ;

units[9] =  "Nm h" ;

units[10] =  "scf" ;

units[11] =  "tpd" ;

factors= new Array() ;

factors['Helium'] = new Array() ;

factors['Helium']['gal'] = new Array() ;

factors['Helium']['kg'] = new Array() ;

factors['Helium']['l'] = new Array() ;

factors['Helium']['lb.'] = new Array() ;

factors['Helium']['l min'] = new Array() ;

factors['Helium']['m3'] = new Array() ;

factors['Helium']['m3 h'] = new Array() ;

factors['Helium']['Nm3'] = new Array() ;

factors['Helium']['Nm h'] = new Array() ;

factors['Helium']['scf'] = new Array() ;

factors['Helium']['tpd'] = new Array() ;


factors['Carbon dioxide'] = new Array() ;

factors['Carbon dioxide']['gal'] = new Array() ;

factors['Carbon dioxide']['kg'] = new Array() ;

factors['Carbon dioxide']['l'] = new Array() ;

factors['Carbon dioxide']['lb.'] = new Array() ;

factors['Carbon dioxide']['l min'] = new Array() ;

factors['Carbon dioxide']['m3'] = new Array() ;

factors['Carbon dioxide']['m3 h'] = new Array() ;

factors['Carbon dioxide']['Nm3'] = new Array() ;

factors['Carbon dioxide']['Nm h'] = new Array() ;

factors['Carbon dioxide']['scf'] = new Array() ;

factors['Carbon dioxide']['tpd'] = new Array() ;


factors['Nitrogen'] = new Array() ;

factors['Nitrogen']['gal'] = new Array() ;

factors['Nitrogen']['kg'] = new Array() ;

factors['Nitrogen']['l'] = new Array() ;

factors['Nitrogen']['lb.'] = new Array() ;

factors['Nitrogen']['l min'] = new Array() ;

factors['Nitrogen']['m3'] = new Array() ;

factors['Nitrogen']['m3 h'] = new Array() ;

factors['Nitrogen']['Nm3'] = new Array() ;

factors['Nitrogen']['Nm h'] = new Array() ;

factors['Nitrogen']['scf'] = new Array() ;

factors['Nitrogen']['tpd'] = new Array() ;


factors['Oxygen'] = new Array() ;

factors['Oxygen']['gal'] = new Array() ;

factors['Oxygen']['kg'] = new Array() ;

factors['Oxygen']['l'] = new Array() ;

factors['Oxygen']['lb.'] = new Array() ;

factors['Oxygen']['l min'] = new Array() ;

factors['Oxygen']['m3'] = new Array() ;

factors['Oxygen']['m3 h'] = new Array() ;

factors['Oxygen']['Nm3'] = new Array() ;

factors['Oxygen']['Nm h'] = new Array() ;

factors['Oxygen']['scf'] = new Array() ;

factors['Oxygen']['tpd'] = new Array() ;


factors['Argon'] = new Array() ;

factors['Argon']['gal'] = new Array() ;

factors['Argon']['kg'] = new Array() ;

factors['Argon']['l'] = new Array() ;

factors['Argon']['lb.'] = new Array() ;

factors['Argon']['l min'] = new Array() ;

factors['Argon']['m3'] = new Array() ;

factors['Argon']['m3 h'] = new Array() ;

factors['Argon']['Nm3'] = new Array() ;

factors['Argon']['Nm h'] = new Array() ;

factors['Argon']['scf'] = new Array() ;

factors['Argon']['tpd'] = new Array() ;


factors['Hydrogen'] = new Array() ;

factors['Hydrogen']['gal'] = new Array() ;

factors['Hydrogen']['kg'] = new Array() ;

factors['Hydrogen']['l'] = new Array() ;

factors['Hydrogen']['lb.'] = new Array() ;

factors['Hydrogen']['l min'] = new Array() ;

factors['Hydrogen']['m3'] = new Array() ;

factors['Hydrogen']['m3 h'] = new Array() ;

factors['Hydrogen']['Nm3'] = new Array() ;

factors['Hydrogen']['Nm h'] = new Array() ;

factors['Hydrogen']['scf'] = new Array() ;

factors['Hydrogen']['tpd'] = new Array() ;



factors['Helium']['kg']['kg']=1.0;

factors['Helium']['kg']['l']=8.0;

factors['Helium']['kg']['m3']=5.978;

factors['Helium']['kg']['Nm3']=5.602;

factors['Helium']['l']['kg']=0.125;

factors['Helium']['l']['l']=1.0;

factors['Helium']['l']['m3']=0.749;

factors['Helium']['l']['Nm3']=0.7;

factors['Helium']['l min']['l min']=1.0;

factors['Helium']['l min']['m3 h']=0.06;

factors['Helium']['l min']['Nm h']=42.0;

factors['Helium']['l min']['tpd']=0.000240963855422;

factors['Helium']['m3']['kg']=0.167280026765;

factors['Helium']['m3']['l']=1.33511348465;

factors['Helium']['m3']['m3']=1.0;

factors['Helium']['m3']['Nm3']=0.937;

factors['Helium']['m3 h']['l min']=16.6666666667;

factors['Helium']['m3 h']['m3 h']=1.0;

factors['Helium']['m3 h']['Nm h']=0.937;

factors['Helium']['m3 h']['tpd']=0.00400801603206;

factors['Helium']['Nm3']['kg']=0.17850767583;

factors['Helium']['Nm3']['l']=1.42857142857;

factors['Helium']['Nm3']['m3']=1.06723585912;

factors['Helium']['Nm3']['Nm3']=1.0;

factors['Helium']['Nm h']['l min']=0.0238095238095;

factors['Helium']['Nm h']['m3 h']=1.06723585912;

factors['Helium']['Nm h']['Nm h']=1.0;

factors['Helium']['Nm h']['tpd']=0.0042841842138;

factors['Helium']['tpd']['l min']=4150.0;

factors['Helium']['tpd']['m3 h']=249.5;

factors['Helium']['tpd']['Nm h']=233.416667;

factors['Helium']['tpd']['tpd']=1.0;

factors['Carbon dioxide']['kg']['kg']=1.0;

factors['Carbon dioxide']['kg']['l']=0.0;

factors['Carbon dioxide']['kg']['m3']=0.541;

factors['Carbon dioxide']['kg']['Nm3']=0.506;

factors['Carbon dioxide']['l']['l']=1.0;

factors['Carbon dioxide']['l min']['l min']=1.0;

factors['Carbon dioxide']['l min']['m3 h']=0.0;

factors['Carbon dioxide']['l min']['Nm h']=0.0;

factors['Carbon dioxide']['l min']['tpd']=0.00265957446809;

factors['Carbon dioxide']['m3']['kg']=1.84842883549;

factors['Carbon dioxide']['m3']['m3']=1.0;

factors['Carbon dioxide']['m3']['Nm3']=0.934;

factors['Carbon dioxide']['m3 h']['m3 h']=1.0;

factors['Carbon dioxide']['m3 h']['Nm h']=0.934;

factors['Carbon dioxide']['m3 h']['tpd']=0.0443622919862;

factors['Carbon dioxide']['Nm3']['kg']=1.97628458498;

factors['Carbon dioxide']['Nm3']['m3']=1.07066381156;

factors['Carbon dioxide']['Nm3']['Nm3']=1.0;

factors['Carbon dioxide']['Nm h']['m3 h']=1.07066381156;

factors['Carbon dioxide']['Nm h']['Nm h']=1.0;

factors['Carbon dioxide']['Nm h']['tpd']=0.0474308307894;

factors['Carbon dioxide']['tpd']['l min']=376.0;

factors['Carbon dioxide']['tpd']['m3 h']=22.5416667;

factors['Carbon dioxide']['tpd']['Nm h']=21.083333;

factors['Carbon dioxide']['tpd']['tpd']=1.0;

factors['Nitrogen']['gal']['gal']=1.0;

factors['Nitrogen']['gal']['kg']=3.06;

factors['Nitrogen']['gal']['l']=3.785;

factors['Nitrogen']['gal']['lb.']=6.745;

factors['Nitrogen']['gal']['Nm3']=2.447;

factors['Nitrogen']['gal']['scf']=93.11;

factors['Nitrogen']['kg']['gal']=0.3262;

factors['Nitrogen']['kg']['kg']=1.0;

factors['Nitrogen']['kg']['l']=1.237;

factors['Nitrogen']['kg']['lb.']=2.205;

factors['Nitrogen']['kg']['m3']=0.855;

factors['Nitrogen']['kg']['Nm3']=0.8;

factors['Nitrogen']['kg']['scf']=30.42;

factors['Nitrogen']['l']['gal']=0.2642;

factors['Nitrogen']['l']['kg']=0.808407437348;

factors['Nitrogen']['l']['l']=1.0;

factors['Nitrogen']['l']['lb.']=1.782;

factors['Nitrogen']['l']['m3']=0.691;

factors['Nitrogen']['l']['Nm3']=0.647;

factors['Nitrogen']['l']['scf']=24.6;

factors['Nitrogen']['lb.']['gal']=0.1481;

factors['Nitrogen']['lb.']['kg']=0.4536;

factors['Nitrogen']['lb.']['l']=0.5606;

factors['Nitrogen']['lb.']['lb.']=1.0;

factors['Nitrogen']['lb.']['Nm3']=0.3627;

factors['Nitrogen']['lb.']['scf']=13.803;

factors['Nitrogen']['l min']['l min']=1.0;

factors['Nitrogen']['l min']['m3 h']=0.06;

factors['Nitrogen']['l min']['Nm h']=0.06;

factors['Nitrogen']['l min']['tpd']=0.0016835016835;

factors['Nitrogen']['m3']['kg']=1.16959064327;

factors['Nitrogen']['m3']['l']=1.44717800289;

factors['Nitrogen']['m3']['m3']=1.0;

factors['Nitrogen']['m3']['Nm3']=0.936;

factors['Nitrogen']['m3 h']['l min']=16.6666666667;

factors['Nitrogen']['m3 h']['m3 h']=1.0;

factors['Nitrogen']['m3 h']['Nm h']=0.936;

factors['Nitrogen']['m3 h']['tpd']=0.0280701754386;

factors['Nitrogen']['Nm3']['gal']=0.408;

factors['Nitrogen']['Nm3']['kg']=1.25;

factors['Nitrogen']['Nm3']['l']=1.5455950541;

factors['Nitrogen']['Nm3']['lb.']=2.757;

factors['Nitrogen']['Nm3']['m3']=1.06837606838;

factors['Nitrogen']['Nm3']['Nm3']=1.0;

factors['Nitrogen']['Nm3']['scf']=38.04;

factors['Nitrogen']['Nm h']['l min']=16.6666666667;

factors['Nitrogen']['Nm h']['m3 h']=1.06837606838;

factors['Nitrogen']['Nm h']['Nm h']=1.0;

factors['Nitrogen']['Nm h']['tpd']=0.03000003;

factors['Nitrogen']['scf']['gal']=0.01074;

factors['Nitrogen']['scf']['kg']=0.03286;

factors['Nitrogen']['scf']['l']=0.0407;

factors['Nitrogen']['scf']['lb.']=0.07245;

factors['Nitrogen']['scf']['Nm3']=0.02628;

factors['Nitrogen']['scf']['scf']=1.0;

factors['Nitrogen']['tpd']['l min']=594.0;

factors['Nitrogen']['tpd']['m3 h']=35.625;

factors['Nitrogen']['tpd']['Nm h']=33.3333;

factors['Nitrogen']['tpd']['tpd']=1.0;

factors['Oxygen']['gal']['gal']=1.0;

factors['Oxygen']['gal']['kg']=4.322;

factors['Oxygen']['gal']['l']=3.785;

factors['Oxygen']['gal']['lb.']=9.527;

factors['Oxygen']['gal']['Nm3']=3.025;

factors['Oxygen']['gal']['scf']=115.1;

factors['Oxygen']['kg']['gal']=0.2316;

factors['Oxygen']['kg']['kg']=1.0;

factors['Oxygen']['kg']['l']=0.876;

factors['Oxygen']['kg']['lb.']=2.205;

factors['Oxygen']['kg']['m3']=0.748;

factors['Oxygen']['kg']['Nm3']=0.7;

factors['Oxygen']['kg']['scf']=26.62;

factors['Oxygen']['l']['gal']=0.2642;

factors['Oxygen']['l']['kg']=1.14155251142;

factors['Oxygen']['l']['l']=1.0;

factors['Oxygen']['l']['lb.']=2.517;

factors['Oxygen']['l']['m3']=0.853;

factors['Oxygen']['l']['Nm3']=0.799;

factors['Oxygen']['l']['scf']=30.38;

factors['Oxygen']['lb.']['gal']=0.10496483678;

factors['Oxygen']['lb.']['kg']=0.4536;

factors['Oxygen']['lb.']['l']=0.3977;

factors['Oxygen']['lb.']['lb.']=1.0;

factors['Oxygen']['lb.']['Nm3']=0.3174;

factors['Oxygen']['lb.']['scf']=12.076;

factors['Oxygen']['l min']['l min']=1.0;

factors['Oxygen']['l min']['m3 h']=0.06;

factors['Oxygen']['l min']['Nm h']=0.06;

factors['Oxygen']['l min']['tpd']=0.00192307692308;

factors['Oxygen']['m3']['kg']=1.33689839572;

factors['Oxygen']['m3']['l']=1.17233294256;

factors['Oxygen']['m3']['m3']=1.0;

factors['Oxygen']['m3']['Nm3']=0.936;

factors['Oxygen']['m3 h']['l min']=16.6666666667;

factors['Oxygen']['m3 h']['m3 h']=1.0;

factors['Oxygen']['m3 h']['Nm h']=0.936;

factors['Oxygen']['m3 h']['tpd']=0.032085561463;

factors['Oxygen']['Nm3']['gal']=0.331;

factors['Oxygen']['Nm3']['kg']=1.42857142857;

factors['Oxygen']['Nm3']['l']=1.25156445557;

factors['Oxygen']['Nm3']['lb.']=3.151;

factors['Oxygen']['Nm3']['m3']=1.06837606838;

factors['Oxygen']['Nm3']['Nm3']=1.0;

factors['Oxygen']['Nm3']['scf']=38.04;

factors['Oxygen']['Nm h']['l min']=16.6666666667;

factors['Oxygen']['Nm h']['m3 h']=1.06837606838;

factors['Oxygen']['Nm h']['Nm h']=1.0;

factors['Oxygen']['Nm h']['tpd']=0.0342857142465;

factors['Oxygen']['scf']['gal']=0.008691;

factors['Oxygen']['scf']['kg']=0.03756;

factors['Oxygen']['scf']['l']=0.0329;

factors['Oxygen']['scf']['lb.']=0.08281;

factors['Oxygen']['scf']['Nm3']=0.02628;

factors['Oxygen']['scf']['scf']=1.0;

factors['Oxygen']['tpd']['l min']=520.0;

factors['Oxygen']['tpd']['m3 h']=31.1666667;

factors['Oxygen']['tpd']['Nm h']=29.1666667;

factors['Oxygen']['tpd']['tpd']=1.0;

factors['Argon']['gal']['gal']=1.0;

factors['Argon']['gal']['kg']=5.27509627051;

factors['Argon']['gal']['l']=3.785;

factors['Argon']['gal']['lb.']=11.63;

factors['Argon']['gal']['Nm3']=2.957;

factors['Argon']['gal']['scf']=112.5;

factors['Argon']['kg']['gal']=0.18957;

factors['Argon']['kg']['kg']=1.0;

factors['Argon']['kg']['l']=0.717;

factors['Argon']['kg']['lb.']=2.205;

factors['Argon']['kg']['m3']=0.599;

factors['Argon']['kg']['Nm3']=0.561;

factors['Argon']['kg']['scf']=21.32;

factors['Argon']['l']['gal']=0.2642;

factors['Argon']['l']['kg']=1.39470013947;

factors['Argon']['l']['l']=1.0;

factors['Argon']['l']['lb.']=3.072;

factors['Argon']['l']['m3']=0.835;

factors['Argon']['l']['Nm3']=0.781;

factors['Argon']['l']['scf']=29.71;

factors['Argon']['lb.']['gal']=0.086;

factors['Argon']['lb.']['kg']=0.4536;

factors['Argon']['lb.']['l']=0.3255;

factors['Argon']['lb.']['lb.']=1.0;

factors['Argon']['lb.']['Nm3']=0.2543;

factors['Argon']['lb.']['scf']=9.671;

factors['Argon']['l min']['l min']=1.0;

factors['Argon']['l min']['m3 h']=0.06;

factors['Argon']['l min']['Nm h']=0.06;

factors['Argon']['l min']['tpd']=0.00240384615385;

factors['Argon']['m3']['kg']=1.6694490818;

factors['Argon']['m3']['l']=1.19760479042;

factors['Argon']['m3']['m3']=1.0;

factors['Argon']['m3']['Nm3']=0.936;

factors['Argon']['m3 h']['l min']=16.6666666667;

factors['Argon']['m3 h']['m3 h']=1.0;

factors['Argon']['m3 h']['Nm h']=0.936;

factors['Argon']['m3 h']['tpd']=0.0400667780168;

factors['Argon']['Nm3']['gal']=0.3382;

factors['Argon']['Nm3']['kg']=1.7825311943;

factors['Argon']['Nm3']['l']=1.28040973111;

factors['Argon']['Nm3']['lb.']=3.933;

factors['Argon']['Nm3']['m3']=1.06837606838;

factors['Argon']['Nm3']['Nm3']=1.0;

factors['Argon']['Nm3']['scf']=38.04;

factors['Argon']['Nm h']['l min']=16.6666666667;

factors['Argon']['Nm h']['m3 h']=1.06837606838;

factors['Argon']['Nm h']['Nm h']=1.0;

factors['Argon']['Nm h']['tpd']=0.0427807486631;

factors['Argon']['scf']['gal']=0.008893;

factors['Argon']['scf']['kg']=0.0469;

factors['Argon']['scf']['l']=0.0337;

factors['Argon']['scf']['lb.']=0.1034;

factors['Argon']['scf']['Nm3']=0.02628;

factors['Argon']['scf']['scf']=1.0;

factors['Argon']['tpd']['l min']=416.0;

factors['Argon']['tpd']['m3 h']=24.9583333;

factors['Argon']['tpd']['Nm h']=23.375;

factors['Argon']['tpd']['tpd']=1.0;

factors['Hydrogen']['kg']['kg']=1.0;

factors['Hydrogen']['kg']['l']=14.126;

factors['Hydrogen']['kg']['m3']=11.892;

factors['Hydrogen']['kg']['Nm3']=11.123;

factors['Hydrogen']['l']['kg']=0.070791448393;

factors['Hydrogen']['l']['l']=1.0;

factors['Hydrogen']['l']['m3']=0.842;

factors['Hydrogen']['l']['Nm3']=0.788;

factors['Hydrogen']['l min']['l min']=1.0;

factors['Hydrogen']['l min']['m3 h']=35.08333;

factors['Hydrogen']['l min']['Nm h']=47.28;

factors['Hydrogen']['l min']['tpd']=0.000120992135511;

factors['Hydrogen']['m3']['kg']=0.084090144635;

factors['Hydrogen']['m3']['l']=1.18764845606;

factors['Hydrogen']['m3']['m3']=1.0;

factors['Hydrogen']['m3 h']['l min']=0.0285035656535;

factors['Hydrogen']['m3 h']['m3 h']=1.0;

factors['Hydrogen']['m3 h']['Nm h']=0.934;

factors['Hydrogen']['m3 h']['tpd']=0.00201816347124;

factors['Hydrogen']['Nm3']['kg']=0.0899038029309;

factors['Hydrogen']['Nm3']['l']=1.26903553299;

factors['Hydrogen']['Nm3']['Nm3']=1.0;

factors['Hydrogen']['Nm h']['l min']=0.0211505922166;

factors['Hydrogen']['Nm h']['m3 h']=1.07066381156;

factors['Hydrogen']['Nm h']['Nm h']=1.0;

factors['Hydrogen']['Nm h']['tpd']=0.00215710948882;

factors['Hydrogen']['tpd']['l min']=8265.0;

factors['Hydrogen']['tpd']['m3 h']=495.5;

factors['Hydrogen']['tpd']['Nm h']=463.58333;

factors['Hydrogen']['tpd']['tpd']=1.0;

var gas= 0 ;
var unitfrom = units[1] ;
var unitto = units[1] ;
var origin = 1 ;
var result = 0 ;

var state= navigator.onLine ;




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
	
