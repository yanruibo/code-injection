
  //patched for file:// support.

/* (c) 2008-2012 Add This, LLC */
if (!((window._atc || {}).ver)) {
  var _atd = "www.addthis.com/",
    _atr = "http://s7.addthis.com/",
    _euc = encodeURIComponent,
    _duc = decodeURIComponent,
    _atc = {
      rsrcs: {},
      dr: 0,
      ver: 250,
      loc: 0,
      enote: "",
      cwait: 500,
      bamp: 0.25,
      camp: 1,
      csmp: 0,
      damp: 1,
      famp: 0.02,
      pamp: 0.2,
      tamp: 1,
      lamp: 1,
      vamp: 1,
      vrmp: 0.0001,
      ltj: 1,
      xamp: 1,
      abf: !! window.addthis_do_ab
    };
}(function () {
  _atc.rsrcs.countercss = _atr + "static/r07/counter000.css";
  _atc.rsrcs.counterIE67css = _atr + "static/r07/counterIE67000.css";
  _atc.rsrcs.counter = _atr + "static/r07/counter000.js";
  _atc.rsrcs.qbarcss = _atr + "bannerQuirks.css";
  _atc.rsrcs.barcss = _atr + "static/r07/banner002.css";
  _atc.rsrcs.barjs = _atr + "static/r07/banner002.js";
  _atc.rsrcs.overlayjs = _atr + "static/r07/overlay003.js";
  _atc.rsrcs.widget32css = _atr + "static/r07/widgetbig041.css";
  _atc.rsrcs.widgetcss = _atr + "static/r07/widget079.css";
  _atc.rsrcs.widgetIE67css = _atr + "static/r07/widgetIE67000.css";
  _atc.rsrcs.widgetpng = "http://s7.addthis.com/static/r07/widget041.png";
  _atc.rsrcs.link = _atr + "static/r07/link.html";
  _atc.rsrcs.pinit = _atr + "static/r07/pinit002.html";
  _atc.rsrcs.linkedin = _atr + "static/r07/linkedin015.html";
  _atc.rsrcs.tweet = _atr + "static/r07/tweet015.html";
  _atc.rsrcs.menujs = "static/r07/menu100.js";
  _atc.rsrcs.sh = _atr + "static/r07/sh078.html";
  _atc.qs = 0;
  _atr = "//s7.addthis.com/";
  if (!window.addthis || window.addthis.nodeType !== undefined) {
    function e(h, g, f, a) {
      return function () {
        if (!this.qs) {
          this.qs = 0;
        }
        _atc.qs++;
        if (!((this.qs++ > 0 && a) || _atc.qs > 1000) && window.addthis) {
          window.addthis.plo.push({
            call: h,
            args: arguments,
            ns: g,
            ctx: f
          });
        }
      };
    }
    function d(g) {
      var f = this,
        a = this.queue = [];
      this.name = g;
      this.call = function () {
        a.push(arguments);
      };
      this.call.queuer = this;
      this.flush = function (k, j) {
        for (var h = 0; h < a.length; h++) {
          k.apply(j || f, a[h]);
        }
        return k;
      };
    }
    window.addthis = {
      ost: 0,
      cache: {},
      plo: [],
      links: [],
      ems: [],
      timer: {
        load: ((new Date()).getTime())
      },
      _Queuer: d,
      _queueFor: e,
      data: {
        getShareCount: e("getShareCount", "data")
      },
      bar: e("bar"),
      button: e("button"),
      counter: e("counter"),
      count: e("count"),
      toolbox: e("toolbox"),
      update: e("update"),
      init: e("init"),
      ad: {
        event: e("event", "ad"),
        getPixels: e("getPixels", "ad")
      },
      util: {
        getServiceName: e("getServiceName")
      },
      ready: e("ready"),
      addEventListener: e("addEventListener", "ed", "ed"),
      removeEventListener: e("removeEventListener", "ed", "ed"),
      user: {
        getID: e("getID", "user"),
        getGeolocation: e("getGeolocation", "user", null, true),
        getPreferredServices: e("getPreferredServices", "user", null, true),
        getServiceShareHistory: e("getServiceShareHistory", "user", null, true),
        ready: e("ready", "user"),
        isReturning: function (a) {},
        isOptedOut: e("isOptedOut", "user"),
        isUserOf: e("isUserOf", "user"),
        hasInterest: e("hasInterest", "user"),
        isLocatedIn: e("isLocatedIn", "user"),
        interests: e("getInterests", "user"),
        services: e("getServices", "user"),
        location: e("getLocation", "user")
      },
      session: {
        source: e("getSource", "session"),
        isSocial: e("isSocial", "sesesion"),
        isSearch: e("isSearch", "session")
      }
    };
    var b = document.createElement("script");
    b.type = "text/javascript";
    b.src = (window.location.protocol == "https:" ? "https:" : "http:") + "//s7.addthis.com/static/r07/core001.js";
    var c = document.getElementsByTagName("script")[0];
    c.parentNode.appendChild(b);
  }
})();


		document.write('<link rel="stylesheet" type="text/css" href="min.css?'+Math.random()+'">');
	


	      sas_tmstp=Math.round(Math.random()*10000000000);sas_masterflag=1;
	      function SmartAdServer(sas_pageid,sas_formatid,sas_target) {
	      	return;
	        if (sas_masterflag==1) {sas_masterflag=0;sas_master='M';} else {sas_master='S';};
	        document.write('<scr'+'ipt SRC="http://ww14.smartadserver.com/call/pubj/' + sas_pageid + '/' + sas_formatid + '/'+sas_master + '/' + sas_tmstp + '/' + escape(sas_target) + '?"></scr'+'ipt>');  
	      } 
	    

						sas_pageid='252/83806';    // Page : liberation.fr/009_politique_articles
						sas_formatid=225;        // Format : 01 mega banner/habillage 1000x90
						sas_target="dossier=PRESIDENTIELLE2012;support=article";            // Ciblage
						SmartAdServer(sas_pageid,sas_formatid,sas_target);
					







    //iPhone
    if (navigator.userAgent.indexOf("iPhone OS")>=0) {
        window._deviceIndex = 0;

    //iPad
    } else if (navigator.userAgent.indexOf("iPad")>=0) {
        window._deviceIndex = 1;
        
        var metatags = document.getElementsByTagName('meta');
        for(cnt = 0; cnt < metatags.length; cnt++) { 
           var element = metatags[cnt];
           if(element.getAttribute('name') == 'viewport') {
            element.setAttribute('content','width=1024, user-scalable=no'); 
           }
        }
        
    //Android
    } else {

        window._deviceIndex = 2; //phone

    }

    //Site, Page, Format
    window._smartAdServerInfos = ([
    	//[33349,231712,7284]
        [35065,240321,13080],
        [35064,240319,9968],
        [35066,240322,15097],
    	// test IDs are working on Android
    	// ["19369","136531","5921"],
        [35069,240354,15098]
    ])[window._deviceIndex]
    
    
    window.returnToHome = function() {
    	document.location.hash = '';
        
    		return window.location.reload(true);
    	
    }




	      sas_tmstp=Math.round(Math.random()*10000000000);sas_masterflag=1;
	      function SmartAdServer(sas_pageid,sas_formatid,sas_target) {
	        if (sas_masterflag==1) {sas_masterflag=0;sas_master='M';} else {sas_master='S';};
	        document.write('<scr'+'ipt SRC="http://ww14.smartadserver.com/call/pubj/' + sas_pageid + '/' + sas_formatid + '/'+sas_master + '/' + sas_tmstp + '/' + escape(sas_target) + '?"></scr'+'ipt>');  
	      } 
	    






		document.addEventListener("deviceready",function() {
			var models = ["iPhone","iPad","AndroidPhone","AndroidTablet"];
			$("#xititag").html('<img width="1" height="1" src="http://logliberation.xiti.com/hit.xitif?s=450193&s2='+(window._deviceIndex<2?"9":"10")+'&p=QuiProposeQuoi_'+(window._deviceIndex<2?"iOS":"Android")+'&idclient='+(typeof device!="undefined"?device.uuid:"")+'&os='+(window._deviceIndex<2?"iOS":"Android")+'-'+(typeof device!="undefined"?device.version:"")+'&mdl='+models[window._deviceIndex]+'&lng=fr_fr&cn=wifi&apvr=1.1.0&idpays=fr&ref=" >');

		});
		
	







	      sas_tmstp=Math.round(Math.random()*10000000000);sas_masterflag=1;
	      function SmartAdServer(sas_pageid,sas_formatid,sas_target) {
	        if (sas_masterflag==1) {sas_masterflag=0;sas_master='M';} else {sas_master='S';};
	        document.write('<scr'+'ipt SRC="http://ww14.smartadserver.com/call/pubj/' + sas_pageid + '/' + sas_formatid + '/'+sas_master + '/' + sas_tmstp + '/' + escape(sas_target) + '?"></scr'+'ipt>');  
	      } 
	    








$(".share p").live("touchstart",function(evt) {  
    if (Joshfire.factory.plugins.sharekit) {
         Joshfire.factory.plugins.sharekit.share(evt.target.getAttribute("addthis:title"), evt.target.getAttribute("addthis:title")+" via @libe_2012", evt.target.getAttribute("addthis:url"));
    }
});
	
if (typeof PhoneGap!="undefined") {


    window.addEventListener("load",function() {
	document.addEventListener("deviceready",function() {

        Joshfire.factory.plugins.sharekit.setAppName("Qui Propose Quoi ?");
        Joshfire.factory.plugins.sharekit.setAppURL("http://quiproposequoi.liberation.fr/");
        
        Joshfire.factory.plugins.sharekit.setTwitterConsumerKey("ernw9bbrzJippRfhdn5Ow");
        Joshfire.factory.plugins.sharekit.setTwitterSecret("bnOKMCUJ04dXdmRiAS4nOJLE0ZxzFgFCfFO9kx8lXr4");
        Joshfire.factory.plugins.sharekit.setFacebookAppId("209693652471714");



		document.addEventListener("sasInterstitialAdDidAppear", function () {
	        setTimeout(function () {
	          navigator.splashscreen.hide();
	        }, 500);
	    }, false);
	    setTimeout(function () {
	       navigator.splashscreen.hide();
	    }, 5000);
	    
        //Joshfire.factory.plugins.smartadserver.enableTestMode();
        //Joshfire.factory.plugins.smartadserver.enableLogging();

        //This was not a refresh()
        Joshfire.factory.plugins.smartadserver.setSiteId(window._smartAdServerInfos[0]);
        if (window.location.toString().indexOf("#")==-1) {
            Joshfire.factory.plugins.smartadserver.showInterstitialAd(window._smartAdServerInfos[2],window._smartAdServerInfos[1]+"");
        }

        document.addEventListener("resume", function() {
            Joshfire.factory.plugins.smartadserver.showInterstitialAd(window._smartAdServerInfos[2],window._smartAdServerInfos[1]+"");
            document.location.hash = "";
            window.location.reload(true);
        },false);

        window.plugins.pushNotification.startNotify();


        // Customized callback for receiving notification
        PushNotification.prototype.notificationCallback = function (notification) {
            window.plugins.pushNotification.log("Received a notification.");

            if (notification['open']) {
                window.open(notification['open']);
                document.addEventListener("sasInterstitialAdDidAppear", function () {
                    window.open(notification['open']);
                });
            }
            
        };

        // when APN register succeeded
        function successCallback(e) {
            //result.innerHTML="Device registered. Device token:<br>" + e.deviceToken + '<br><br>';
            registerUAPush(e.deviceToken, e.host, e.appKey, e.appSecret);
        }
                
        // when APN register failed
        function errorCallback(e) {
            //result.innerHTML='Error during registration: '+e.error;
            //registerButton.disabled=false;
        }

        // register button action
        function registerAPN() {
            
            window.plugins.pushNotification.log("Registering with APNS via the App Delegate");

            /*
            registerButton.disabled=true;
            result.innerHTML='Registering...';
            */
           
            window.plugins.pushNotification.register(successCallback, errorCallback, [{ alert:true, badge:true, sound:true }]);

            //or unregister
            //navigator.pushNotification.register();
        }
        
        // register urban airship push service after APN is registered successfully
        function registerUAPush(deviceToken, host, appKey, appSecret) {
            
            window.plugins.pushNotification.log("Registering with Urban Airship.");
            
            /*
            var resultStr = result.innerHTML;
            result.innerHTML += 'Registering with Urban Airship Push Service...';
            */
           
            var request = new XMLHttpRequest();
            
            // open the client and encode our URL
            request.open('PUT', host+'api/device_tokens/'+deviceToken, true, appKey, appSecret);
            
            // callback when request finished
            request.onload = function() {
                //result.innerHTML = resultStr + 'Status: ' + this.status + '<br>';
                
                if(this.status == 200 || this.status == 201) {
                    // register UA push success
                    //result.innerHTML = result.innerHTML + 'UA push service successfully registered.';
                } else {
                  // error
                    //result.innerHTML = result.innerHTML + 'Error when registering UA push service.<br>error: '+this.statusText;
                }
                
                // for demo, you can re-register again
                //registerButton.disabled=false;
            };

            request.send();
        }

        registerAPN();


	});
    });
}


		document.write('<link rel="stylesheet" type="text/css" href="min.css?'+Math.random()+'">');
	


	      sas_tmstp=Math.round(Math.random()*10000000000);sas_masterflag=1;
	      function SmartAdServer(sas_pageid,sas_formatid,sas_target) {
	        if (sas_masterflag==1) {sas_masterflag=0;sas_master='M';} else {sas_master='S';};
	        document.write('<scr'+'ipt SRC="http://ww14.smartadserver.com/call/pubj/' + sas_pageid + '/' + sas_formatid + '/'+sas_master + '/' + sas_tmstp + '/' + escape(sas_target) + '?"></scr'+'ipt>');  
	      } 
	    

						sas_pageid='252/83806';    // Page : liberation.fr/009_politique_articles
						sas_formatid=225;        // Format : 01 mega banner/habillage 1000x90
						sas_target="dossier=PRESIDENTIELLE2012;support=article";            // Ciblage
						SmartAdServer(sas_pageid,sas_formatid,sas_target);
					











	    var GOOG_FIXURL_LANG = (navigator.language || '').slice(0,2),
		GOOG_FIXURL_SITE = location.host;
	    




    //iPhone
    if (navigator.userAgent.indexOf("iPhone OS")>=0) {
        window._deviceIndex = 0;

    //iPad
    } else if (navigator.userAgent.indexOf("iPad")>=0) {
        window._deviceIndex = 1;
        
        var metatags = document.getElementsByTagName('meta');
        for(cnt = 0; cnt < metatags.length; cnt++) { 
           var element = metatags[cnt];
           if(element.getAttribute('name') == 'viewport') {
            element.setAttribute('content','width=1024, user-scalable=no'); 
           }
        }
        
    //Android
    } else {

        window._deviceIndex = 3; //tablet

    }

    //Site, Page, Format
    window._smartAdServerInfos = ([
    	//[33349,231712,7284]
        [35065,240321,13080],
        [35064,240319,9968],
        [35066,240322,15097],
    	// test IDs are working on Android
    	// ["19369","136531","5921"],
        [35069,240354,15098]
    ])[window._deviceIndex]
    
    
    window.returnToHome = function() {
    	document.location.hash = '';
        
    		return window.location.reload(true);
    	
    }




	      sas_tmstp=Math.round(Math.random()*10000000000);sas_masterflag=1;
	      function SmartAdServer(sas_pageid,sas_formatid,sas_target) {
	        if (sas_masterflag==1) {sas_masterflag=0;sas_master='M';} else {sas_master='S';};
	        document.write('<scr'+'ipt SRC="http://ww14.smartadserver.com/call/pubj/' + sas_pageid + '/' + sas_formatid + '/'+sas_master + '/' + sas_tmstp + '/' + escape(sas_target) + '?"></scr'+'ipt>');  
	      } 
	    






		document.addEventListener("deviceready",function() {
			var models = ["iPhone","iPad","AndroidPhone","AndroidTablet"];
			$("#xititag").html('<img width="1" height="1" src="http://logliberation.xiti.com/hit.xitif?s=450193&s2='+(window._deviceIndex<2?"9":"10")+'&p=QuiProposeQuoi_'+(window._deviceIndex<2?"iOS":"Android")+'&idclient='+(typeof device!="undefined"?device.uuid:"")+'&os='+(window._deviceIndex<2?"iOS":"Android")+'-'+(typeof device!="undefined"?device.version:"")+'&mdl='+models[window._deviceIndex]+'&lng=fr_fr&cn=wifi&apvr=1.1.0&idpays=fr&ref=" >');

		});
		
	



    //iPhone
    if (navigator.userAgent.indexOf("iPhone OS")>=0) {
        window._deviceIndex = 0;

    //iPad
    } else if (navigator.userAgent.indexOf("iPad")>=0) {
        window._deviceIndex = 1;
        
        var metatags = document.getElementsByTagName('meta');
        for(cnt = 0; cnt < metatags.length; cnt++) { 
           var element = metatags[cnt];
           if(element.getAttribute('name') == 'viewport') {
            element.setAttribute('content','width=1024, user-scalable=no'); 
           }
        }
        
    //Android
    } else {
   if (config.device=='phone') {  
        window._deviceIndex = 2; //phone
   } else {   
        window._deviceIndex = 3; //tablet
   }   
    }

    //Site, Page, Format
    window._smartAdServerInfos = ([
    	//[33349,231712,7284]
        [35065,240321,13080],
        [35064,240319,9968],
        [35066,240322,15097],
    	// test IDs are working on Android
    	// ["19369","136531","5921"],
        [35069,240354,15098]
    ])[window._deviceIndex]
    
    
    window.returnToHome = function() {
    	document.location.hash = '';
         if (config.platform=='android') { 
        	if(window.location.href.indexOf("#") != -1 ) {  
            	// remove the trailing hash
            	return window.location.href=window.location.href.slice(0, -1);
            } else {
            	return window.location.reload(true);
            }
    	 } else { 
    		return window.location.reload(true);
    	 } 
    }




	      sas_tmstp=Math.round(Math.random()*10000000000);sas_masterflag=1;
	      function SmartAdServer(sas_pageid,sas_formatid,sas_target) {
	        if (sas_masterflag==1) {sas_masterflag=0;sas_master='M';} else {sas_master='S';};
	        document.write('<scr'+'ipt SRC="http://ww14.smartadserver.com/call/pubj/' + sas_pageid + '/' + sas_formatid + '/'+sas_master + '/' + sas_tmstp + '/' + escape(sas_target) + '?"></scr'+'ipt>');  
	      } 
	    





      $(".share p").live("touchstart",function(evt) { 
	      // WebIntent plugin for Android
	      // we could also use the simpler: https://github.com/phonegap/phonegap-plugins/tree/master/Android/Share
	      if ( window.plugins.webintent ) {
	    	  
			  var extraparams = {};
			  extraparams[WebIntent.EXTRA_SUBJECT] = evt.target.getAttribute("addthis:title");
			  extraparams[WebIntent.EXTRA_TEXT] = evt.target.getAttribute("addthis:title") + " " + evt.target.getAttribute("addthis:url"); // item.get("articleBody");
			  
	    	  window.plugins.webintent.startActivity(
	    			{
	    		    	action:  WebIntent.ACTION_SEND,
	    		    	type: "text/plain",
	    		    	extras: extraparams
	    		    }, 
	    		    function() {}, 
	    		    function() {alert('Failed to share this item.');}
	    		);
	      }
		});
      

	document.addEventListener("deviceready",function() {
        Joshfire.factory.plugins.smartadserver.setSiteId(window._smartAdServerInfos[0]);
        Joshfire.factory.plugins.smartadserver.showInterstitialAd(window._smartAdServerInfos[2],window._smartAdServerInfos[1]+"");
    });
    
//    document.addEventListener("resume", function() {
//        Joshfire.factory.plugins.smartadserver.setSiteId(window._smartAdServerInfos[0]);
//        Joshfire.factory.plugins.smartadserver.showInterstitialAd(window._smartAdServerInfos[2],window._smartAdServerInfos[1]+"");
//        window.returnToHome();
//    },false);
      

          function error(msg) {
              alert("Error: " + msg);
          }
          document.addEventListener("deviceready", function() {
              window.plugins.pushNotification.registerCallback(function() {}, error);
          }, false);
      



		document.addEventListener("deviceready",function() {
			var models = ["iPhone","iPad","AndroidPhone","AndroidTablet"];
			$("#xititag").html('<img width="1" height="1" src="http://logliberation.xiti.com/hit.xitif?s=450193&s2='+(window._deviceIndex<2?"9":"10")+'&p=QuiProposeQuoi_'+(window._deviceIndex<2?"iOS":"Android")+'&idclient='+(typeof device!="undefined"?device.uuid:"")+'&os='+(window._deviceIndex<2?"iOS":"Android")+'-'+(typeof device!="undefined"?device.version:"")+'&mdl='+models[window._deviceIndex]+'&lng=fr_fr&cn=wifi&apvr=1.1.0&idpays=fr&ref=" >');

		});
		
	



    //iPhone
    if (navigator.userAgent.indexOf("iPhone OS")>=0) {
        window._deviceIndex = 0;

    //iPad
    } else if (navigator.userAgent.indexOf("iPad")>=0) {
        window._deviceIndex = 1;
        
        var metatags = document.getElementsByTagName('meta');
        for(cnt = 0; cnt < metatags.length; cnt++) { 
           var element = metatags[cnt];
           if(element.getAttribute('name') == 'viewport') {
            element.setAttribute('content','width=1024, user-scalable=no'); 
           }
        }
        
    //Android
    } else {

        window._deviceIndex = 2; //phone

    }

    //Site, Page, Format
    window._smartAdServerInfos = ([
    	//[33349,231712,7284]
        [35065,240321,13080],
        [35064,240319,9968],
        [35066,240322,15097],
    	// test IDs are working on Android
    	// ["19369","136531","5921"],
        [35069,240354,15098]
    ])[window._deviceIndex];
    
    
    window.returnToHome = function() {
    	document.location.hash = '';
        
        	if(window.location.href.indexOf("#") != -1 ) {  
            	// remove the trailing hash
            	return window.location.href=window.location.href.slice(0, -1);
            } else {
            	return window.location.reload(true);
            }
    	
    }




	      sas_tmstp=Math.round(Math.random()*10000000000);sas_masterflag=1;
	      function SmartAdServer(sas_pageid,sas_formatid,sas_target) {
	        if (sas_masterflag==1) {sas_masterflag=0;sas_master='M';} else {sas_master='S';};
	        document.write('<scr'+'ipt SRC="http://ww14.smartadserver.com/call/pubj/' + sas_pageid + '/' + sas_formatid + '/'+sas_master + '/' + sas_tmstp + '/' + escape(sas_target) + '?"></scr'+'ipt>');  
	      } 
	    







      $(".share p").live("touchstart",function(evt) { 
	      // WebIntent plugin for Android
	      // we could also use the simpler: https://github.com/phonegap/phonegap-plugins/tree/master/Android/Share
	      if ( window.plugins.webintent ) {
	    	  
			  var extraparams = {};
			  extraparams[WebIntent.EXTRA_SUBJECT] = evt.target.getAttribute("addthis:title");
			  extraparams[WebIntent.EXTRA_TEXT] = evt.target.getAttribute("addthis:title") + " " + evt.target.getAttribute("addthis:url"); // item.get("articleBody");
			  
	    	  window.plugins.webintent.startActivity(
	    			{
	    		    	action:  WebIntent.ACTION_SEND,
	    		    	type: "text/plain",
	    		    	extras: extraparams
	    		    }, 
	    		    function() {}, 
	    		    function() {alert('Failed to share this item.');}
	    		);
	      }
		});
      

	document.addEventListener("deviceready",function() {
        Joshfire.factory.plugins.smartadserver.setSiteId(window._smartAdServerInfos[0]);
        Joshfire.factory.plugins.smartadserver.showInterstitialAd(window._smartAdServerInfos[2],window._smartAdServerInfos[1]+"");
    });
    
//    document.addEventListener("resume", function() {
//        Joshfire.factory.plugins.smartadserver.setSiteId(window._smartAdServerInfos[0]);
//        Joshfire.factory.plugins.smartadserver.showInterstitialAd(window._smartAdServerInfos[2],window._smartAdServerInfos[1]+"");
//        window.returnToHome();
//    },false);
      

          function error(msg) {
              alert("Error: " + msg);
          }
          document.addEventListener("deviceready", function() {
              window.plugins.pushNotification.registerCallback(function() {}, error);
          }, false);
      

		document.addEventListener("deviceready",function() {
			var models = ["iPhone","iPad","AndroidPhone","AndroidTablet"];
			$("#xititag").html('<img width="1" height="1" src="http://logliberation.xiti.com/hit.xitif?s=450193&s2='+(window._deviceIndex<2?"9":"10")+'&p=QuiProposeQuoi_'+(window._deviceIndex<2?"iOS":"Android")+'&idclient='+(typeof device!="undefined"?device.uuid:"")+'&os='+(window._deviceIndex<2?"iOS":"Android")+'-'+(typeof device!="undefined"?device.version:"")+'&mdl='+models[window._deviceIndex]+'&lng=fr_fr&cn=wifi&apvr=1.1.0&idpays=fr&ref=" >');

		});
		
	


var PushNotification = function() {

}

// call this to register for push notifications
PushNotification.prototype.register = function(success, fail, options) {
    PhoneGap.exec(success, fail, "PushNotification", "registerAPN", options);
};

// call this to notify the plugin that the device is ready
PushNotification.prototype.startNotify = function(notificationCallback) {
    PhoneGap.exec(null, null, "PushNotification", "startNotify", []/* BUG - dies on null */);
};

// use this to log from JS to the Xcode console - useful!
PushNotification.prototype.log = function(message) {
    PhoneGap.exec(null, null, "PushNotification", "log", [{"msg":message,}]);
};


PhoneGap.addConstructor(function() 
{
	if(!window.plugins)
	{
		window.plugins = {};
	}
	window.plugins.pushNotification = new PushNotification();
});

var PushNotification = {
    registerCallback: function(successCallback, failureCallback) {
        return PhoneGap.exec(
               successCallback,           // called when signature capture is successful
               failureCallback,           // called when signature capture encounters an error
               'PushNotificationPlugin',  // Tell PhoneGap that we want to run "PushNotificationPlugin"
               'registerCallback',        // Tell the plugin the action we want to perform
               []);                       // List of arguments to the plugin
    },
    notificationCallback: function(json) {
        var data = window.JSON.parse(json);
        alert("Success: " +  data.msg);
    }
};

PhoneGap.addConstructor(function() {
    PhoneGap.addPlugin("pushNotification", PushNotification);
});




    //iPhone
    if (navigator.userAgent.indexOf("iPhone OS")>=0) {
        window._deviceIndex = 0;

    //iPad
    } else if (navigator.userAgent.indexOf("iPad")>=0) {
        window._deviceIndex = 1;
        
        var metatags = document.getElementsByTagName('meta');
        for(cnt = 0; cnt < metatags.length; cnt++) { 
           var element = metatags[cnt];
           if(element.getAttribute('name') == 'viewport') {
            element.setAttribute('content','width=1024, user-scalable=no'); 
           }
        }
        
    //Android
    } else {

        window._deviceIndex = 2; //phone

    }

    //Site, Page, Format
    window._smartAdServerInfos = ([
    	//[33349,231712,7284]
        [35065,240321,13080],
        [35064,240319,9968],
        [35066,240322,15097],
    	// test IDs are working on Android
    	// ["19369","136531","5921"],
        [35069,240354,15098]
    ])[window._deviceIndex]
    
    
    window.returnToHome = function() {
    	document.location.hash = '';
        
        	if(window.location.href.indexOf("#") != -1 ) {  
            	// remove the trailing hash
            	return window.location.href=window.location.href.slice(0, -1);
            } else {
            	return window.location.reload(true);
            }
    	
    }




	      sas_tmstp=Math.round(Math.random()*10000000000);sas_masterflag=1;
	      function SmartAdServer(sas_pageid,sas_formatid,sas_target) {
	        if (sas_masterflag==1) {sas_masterflag=0;sas_master='M';} else {sas_master='S';};
	        document.write('<scr'+'ipt SRC="http://ww14.smartadserver.com/call/pubj/' + sas_pageid + '/' + sas_formatid + '/'+sas_master + '/' + sas_tmstp + '/' + escape(sas_target) + '?"></scr'+'ipt>');  
	      } 
	    







      $(".share p").live("touchstart",function(evt) { 
	      // WebIntent plugin for Android
	      // we could also use the simpler: https://github.com/phonegap/phonegap-plugins/tree/master/Android/Share
	      if ( window.plugins.webintent ) {
	    	  
			  var extraparams = {};
			  extraparams[WebIntent.EXTRA_SUBJECT] = evt.target.getAttribute("addthis:title");
			  extraparams[WebIntent.EXTRA_TEXT] = evt.target.getAttribute("addthis:title") + " " + evt.target.getAttribute("addthis:url"); // item.get("articleBody");
			  
	    	  window.plugins.webintent.startActivity(
	    			{
	    		    	action:  WebIntent.ACTION_SEND,
	    		    	type: "text/plain",
	    		    	extras: extraparams
	    		    }, 
	    		    function() {}, 
	    		    function() {alert('Failed to share this item.');}
	    		);
	      }
		});
      

	document.addEventListener("deviceready",function() {
        Joshfire.factory.plugins.smartadserver.setSiteId(window._smartAdServerInfos[0]);
        Joshfire.factory.plugins.smartadserver.showInterstitialAd(window._smartAdServerInfos[2],window._smartAdServerInfos[1]+"");
    });
    
//    document.addEventListener("resume", function() {
//        Joshfire.factory.plugins.smartadserver.setSiteId(window._smartAdServerInfos[0]);
//        Joshfire.factory.plugins.smartadserver.showInterstitialAd(window._smartAdServerInfos[2],window._smartAdServerInfos[1]+"");
//        window.returnToHome();
//    },false);
      

          function error(msg) {
              alert("Error: " + msg);
          }
          document.addEventListener("deviceready", function() {
              window.plugins.pushNotification.registerCallback(function() {}, error);
          }, false);
      

		document.addEventListener("deviceready",function() {
			var models = ["iPhone","iPad","AndroidPhone","AndroidTablet"];
			$("#xititag").html('<img width="1" height="1" src="http://logliberation.xiti.com/hit.xitif?s=450193&s2='+(window._deviceIndex<2?"9":"10")+'&p=QuiProposeQuoi_'+(window._deviceIndex<2?"iOS":"Android")+'&idclient='+(typeof device!="undefined"?device.uuid:"")+'&os='+(window._deviceIndex<2?"iOS":"Android")+'-'+(typeof device!="undefined"?device.version:"")+'&mdl='+models[window._deviceIndex]+'&lng=fr_fr&cn=wifi&apvr=1.1.0&idpays=fr&ref=" >');

		});
		
	


(function() {
  /* This bootstrap script is documented at http://developer.joshfire.com/ */
  var Joshfire = window.Joshfire || {};
  Joshfire.factory = {
    globalConfig: {"DATAVERSION":"1","DATAHOSTPORT":"api.datajs.com","STATSHOSTPORT":"stats.joshfirefactory.com","HOSTPORT":"factory.joshfire.com"},
    config: {"app":{"id":"4f564222204e060100019d97","icon":{"encodingFormat":"png","contentSize":1026,"contentURL":"http://static.us-east-1.prod.factory.joshfire.com.s3.amazonaws.com/09/8cef56cd478fcfd4d6245c9c6746bf/apple-touch-icon.png","itemType":"ImageObject","name":"apple-touch-icon.png","url":"/transloadit/098cef56cd478fcfd4d6245c9c6746bf"},"logo":null,"name":"Qui propose quoi ?","version":"1.0"},"template":{"id":"4f58c8f26e54a90100009da8","name":"liberation-quiz","version":"0.0.1","options":{}}},
    device: {"type":"tablet"},
    plugins: {}
  };
  Joshfire.factory.config.deploy = {"type":"xcodeproj","id":"4f58c92e264bf30100000512","env":"live"};
  Joshfire.factory.config.datasources = {};
  window.Joshfire = Joshfire;
})();(function () { (function(a,b,c){var d="http://"+c.globalConfig.STATSHOSTPORT,e=function(){return},f=function(a){var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c+"="+encodeURIComponent(a[c]));var f=new Image(1,1);f.src=d+"/pixel.gif?"+b.join("&"),f.onload=function(){e()}},g=function(){return{tz:(new Date).getTimezoneOffset(),url:b.location.toString(),ref:a.referrer,app:c.config.app.id,appv:c.config.app.version,tpl:c.config.template.id,dev:c.device.type,env:(c.config.deploy||{}).env||"preview",dp:(c.config.deploy||{}).id,dpr:(c.config.deploy||{}).type,id:typeof DeviceInfo=="object"&&DeviceInfo.uuid?"d"+DeviceInfo.uuid:""}};c.stats={},c.stats.event=function(a){var b=g();b.type=a,f(b)},c.stats.event("open"),a.addEventListener&&a.addEventListener("resume",function(){c.stats.event("resume")},!1)})(document,window,Joshfire.factory);
(function(a,b,c){var d=function(d){var e=null,f=null;if(!d||!a||!a.datasources||!a.datasources[d])return null;e=a.datasources[d];if(Object.prototype.toString.call(e)=="[object Array]"){f={children:[],find:function(a,b){var c=e.length,d=!1,g=[],h=0,i=function(a,e){c-=1;if(d)return;a&&(d=!0),e&&g.push(e);if(a||c===0)return b(a,{entries:g})};for(h=0;h<e.length;h++)f.children[h].find(a,i)}};for(var g=0;g<e.length;g++)f.children[g]=(e[g].runatclient?b:c).getCollection(e[g].db,e[g].col,e[g].query),f.children[g].name=e[g].name,f.children[g].config=e[g];return f}return f=(e.runatclient?b:c).getCollection(e.db,e.col,e.query),f.name=e.name,f.config=e,f};Joshfire.factory.getDataSource=d})(Joshfire.factory.config,window.DatajsClient,window.DatajsProxy);
})();
(function() {
  if (typeof PhoneGap == "undefined") return;

  var SASPlugin = function() {};
    
  // Global SDK parameters

  SASPlugin.prototype.setSiteId = function(siteId) {
      return PhoneGap.exec("com.joshfire.factory.plugins.smartadserver.setSiteId", siteId);
  };

  SASPlugin.prototype.setBannerAdHeight = function(bannerHeight) {
      return PhoneGap.exec("com.joshfire.factory.plugins.smartadserver.setBannerAdHeight", bannerHeight);
  };

  SASPlugin.prototype.enableLogging = function() {
      return PhoneGap.exec("com.joshfire.factory.plugins.smartadserver.enableLogging");
  };

  SASPlugin.prototype.enableTestMode = function() {
      return PhoneGap.exec("com.joshfire.factory.plugins.smartadserver.enableTestMode");
  };


  // Show / hide ads, corresponding events are:
  //  * sasInterstitialAdDidAppear
  //  * sasInterstitialAdDidDisappear
  //  * sasBannerAdDidAppear
  //  * sasBannerAdDidDisappear
  // 
  // See the SmartAdServer SDK documentation for details about the parameters.

  SASPlugin.prototype.showInterstitialAd = function(formatId, pageId, master, target, timeout) {
      return PhoneGap.exec("com.joshfire.factory.plugins.smartadserver.showInterstitialAd", formatId, pageId, master, target, timeout);
  };

  SASPlugin.prototype.dismissInterstitialAd = function() {
      return PhoneGap.exec("com.joshfire.factory.plugins.smartadserver.dismissInterstitialAd");
  };

  SASPlugin.prototype.showBannerAd = function(formatId, pageId, master, target, timeout) {
      return PhoneGap.exec("com.joshfire.factory.plugins.smartadserver.showBannerAd", formatId, pageId, master, target, timeout);
  };

  SASPlugin.prototype.dismissBannerAd = function() {
      return PhoneGap.exec("com.joshfire.factory.plugins.smartadserver.dismissBannerAd");
  };


  // Initialization

  PhoneGap.addConstructor(function() {
      if (!Joshfire.factory.plugins.smartadserver) {
        Joshfire.factory.plugins.smartadserver = new SASPlugin();
        Joshfire.factory.plugins.smartadserver.enableLogging();
        Joshfire.factory.plugins.smartadserver.setSiteId(window._smartAdServerInfos[0]);
      }
  });
  
})();(function() {
    if (typeof PhoneGap == "undefined") return;
     
    var ShareKitPlugin = function() {};

    ShareKitPlugin.NULL = "null";

    ShareKitPlugin.prototype.setAppName = function(appName) {
        if (!appName) return;
        return PhoneGap.exec("com.joshfire.factory.plugins.sharekit.setAppName", appName);
    };

    ShareKitPlugin.prototype.setAppURL = function(appURL) {
        if (!appURL) return;
        return PhoneGap.exec("com.joshfire.factory.plugins.sharekit.setAppURL", appURL);
    };

    ShareKitPlugin.prototype.setTwitterConsumerKey = function(twitterConsumerKey) {
        if (!twitterConsumerKey) return;
        return PhoneGap.exec("com.joshfire.factory.plugins.sharekit.setTwitterConsumerKey", twitterConsumerKey);
    };

    ShareKitPlugin.prototype.setTwitterSecret = function(twitterSecret) {
        if (!twitterSecret) return;
        return PhoneGap.exec("com.joshfire.factory.plugins.sharekit.setTwitterSecret", twitterSecret);
    };

    ShareKitPlugin.prototype.setFacebookAppId = function(facebookAppId) {
        if (!facebookAppId) return;
        return PhoneGap.exec("com.joshfire.factory.plugins.sharekit.setFacebookAppId", facebookAppId);
    };

    ShareKitPlugin.prototype.share = function(title, text, url) {
        return PhoneGap.exec(
            "com.joshfire.factory.plugins.sharekit.share",
            title || ShareKitPlugin.NULL,
            text || ShareKitPlugin.NULL,
            url || ShareKitPlugin.NULL
        );
    };

    PhoneGap.addConstructor(function() {
        if (!Joshfire.factory.plugins.sharekit) {
        Joshfire.factory.plugins.sharekit = new ShareKitPlugin();

        var rot13 = function(str,n){
          if (!str) return str;
          return str.replace(/[a-zA-Z]/g, function(c){
            return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + n) ? c : c - 26);
          });
        };

        var options = {};
        Joshfire.factory.plugins.sharekit.setAppName(rot13(options[rot13("appname",12)],14));
        Joshfire.factory.plugins.sharekit.setAppURL(rot13(options[rot13("appurl",12)],14));
        Joshfire.factory.plugins.sharekit.setTwitterConsumerKey(rot13(options[rot13("twitterkey",12)],14));
        Joshfire.factory.plugins.sharekit.setTwitterSecret(rot13(options[rot13("twittersecret",12)],14));
        Joshfire.factory.plugins.sharekit.setFacebookAppId(rot13(options[rot13("facebookappid",12)],14));

      }

    });

})();



    //iPhone
    if (navigator.userAgent.indexOf("iPhone OS")>=0) {
        window._deviceIndex = 0;

    //iPad
    } else if (navigator.userAgent.indexOf("iPad")>=0) {
        window._deviceIndex = 1;
        
        var metatags = document.getElementsByTagName('meta');
        for(cnt = 0; cnt < metatags.length; cnt++) { 
           var element = metatags[cnt];
           if(element.getAttribute('name') == 'viewport') {
            element.setAttribute('content','width=1024, user-scalable=no'); 
           }
        }
        
    //Android
    } else {

        window._deviceIndex = 3; //tablet

    }

    //Site, Page, Format
    window._smartAdServerInfos = ([
    	//[33349,231712,7284]
        [35065,240321,13080],
        [35064,240319,9968],
        [35066,240322,15097],
    	// test IDs are working on Android
    	// ["19369","136531","5921"],
        [35069,240354,15098]
    ])[window._deviceIndex]
    
    
    window.returnToHome = function() {
    	document.location.hash = '';
        
        	if(window.location.href.indexOf("#") != -1 ) {  
            	// remove the trailing hash
            	return window.location.href=window.location.href.slice(0, -1);
            } else {
            	return window.location.reload(true);
            }
    	
    }




	      sas_tmstp=Math.round(Math.random()*10000000000);sas_masterflag=1;
	      function SmartAdServer(sas_pageid,sas_formatid,sas_target) {
	        if (sas_masterflag==1) {sas_masterflag=0;sas_master='M';} else {sas_master='S';};
	        document.write('<scr'+'ipt SRC="http://ww14.smartadserver.com/call/pubj/' + sas_pageid + '/' + sas_formatid + '/'+sas_master + '/' + sas_tmstp + '/' + escape(sas_target) + '?"></scr'+'ipt>');  
	      } 
	    







      $(".share p").live("touchstart",function(evt) { 
	      // WebIntent plugin for Android
	      // we could also use the simpler: https://github.com/phonegap/phonegap-plugins/tree/master/Android/Share
	      if ( window.plugins.webintent ) {
	    	  
			  var extraparams = {};
			  extraparams[WebIntent.EXTRA_SUBJECT] = evt.target.getAttribute("addthis:title");
			  extraparams[WebIntent.EXTRA_TEXT] = evt.target.getAttribute("addthis:title") + " " + evt.target.getAttribute("addthis:url"); // item.get("articleBody");
			  
	    	  window.plugins.webintent.startActivity(
	    			{
	    		    	action:  WebIntent.ACTION_SEND,
	    		    	type: "text/plain",
	    		    	extras: extraparams
	    		    }, 
	    		    function() {}, 
	    		    function() {alert('Failed to share this item.');}
	    		);
	      }
		});
      

	document.addEventListener("deviceready",function() {
        Joshfire.factory.plugins.smartadserver.setSiteId(window._smartAdServerInfos[0]);
        Joshfire.factory.plugins.smartadserver.showInterstitialAd(window._smartAdServerInfos[2],window._smartAdServerInfos[1]+"");
    });
    
//    document.addEventListener("resume", function() {
//        Joshfire.factory.plugins.smartadserver.setSiteId(window._smartAdServerInfos[0]);
//        Joshfire.factory.plugins.smartadserver.showInterstitialAd(window._smartAdServerInfos[2],window._smartAdServerInfos[1]+"");
//        window.returnToHome();
//    },false);
      

          function error(msg) {
              alert("Error: " + msg);
          }
          document.addEventListener("deviceready", function() {
              window.plugins.pushNotification.registerCallback(function() {}, error);
          }, false);
      

		document.addEventListener("deviceready",function() {
			var models = ["iPhone","iPad","AndroidPhone","AndroidTablet"];
			$("#xititag").html('<img width="1" height="1" src="http://logliberation.xiti.com/hit.xitif?s=450193&s2='+(window._deviceIndex<2?"9":"10")+'&p=QuiProposeQuoi_'+(window._deviceIndex<2?"iOS":"Android")+'&idclient='+(typeof device!="undefined"?device.uuid:"")+'&os='+(window._deviceIndex<2?"iOS":"Android")+'-'+(typeof device!="undefined"?device.version:"")+'&mdl='+models[window._deviceIndex]+'&lng=fr_fr&cn=wifi&apvr=1.1.0&idpays=fr&ref=" >');

		});
		
	


		document.write('<link rel="stylesheet" type="text/css" href="min.css?'+Math.random()+'">');
	


	      sas_tmstp=Math.round(Math.random()*10000000000);sas_masterflag=1;
	      function SmartAdServer(sas_pageid,sas_formatid,sas_target) {
	        if (sas_masterflag==1) {sas_masterflag=0;sas_master='M';} else {sas_master='S';};
	        document.write('<scr'+'ipt SRC="http://ww14.smartadserver.com/call/pubj/' + sas_pageid + '/' + sas_formatid + '/'+sas_master + '/' + sas_tmstp + '/' + escape(sas_target) + '?"></scr'+'ipt>');  
	      } 
	    

						sas_pageid='252/83806';    // Page : liberation.fr/009_politique_articles
						sas_formatid=225;        // Format : 01 mega banner/habillage 1000x90
						sas_target="dossier=PRESIDENTIELLE2012;support=article";            // Ciblage
						SmartAdServer(sas_pageid,sas_formatid,sas_target);
					






		document.write('<link rel="stylesheet" type="text/css" href="min.css?'+Math.random()+'">');
	


	      sas_tmstp=Math.round(Math.random()*10000000000);sas_masterflag=1;
	      function SmartAdServer(sas_pageid,sas_formatid,sas_target) {
	        if (sas_masterflag==1) {sas_masterflag=0;sas_master='M';} else {sas_master='S';};
	        document.write('<scr'+'ipt SRC="http://ww14.smartadserver.com/call/pubj/' + sas_pageid + '/' + sas_formatid + '/'+sas_master + '/' + sas_tmstp + '/' + escape(sas_target) + '?"></scr'+'ipt>');  
	      } 
	    

						sas_pageid='252/83806';    // Page : liberation.fr/009_politique_articles
						sas_formatid=225;        // Format : 01 mega banner/habillage 1000x90
						sas_target="dossier=PRESIDENTIELLE2012;support=article";            // Ciblage
						SmartAdServer(sas_pageid,sas_formatid,sas_target);
					



		document.write('<scr'+'ipt type="text/javascript" src="js/quizz.js?'+Math.random()+'"></scr'+'ipt>');
	




module.exports = require('./underscore');




/*
@depends jquery-1.7.1.js
@depends utils.js
@depends quizz.js
*/
var addthis_config, addthis_share, xtdi, xtn2, xtnv, xtpage, xtsd, xtsite;

addthis_config = {
  pubid: "ra-4f1eb5714f5cba99",
  ui_language: "fr"
};

addthis_share = {
  email_template: "QuiProposeQuoi",
  email_vars: {
    MailContent: "Cliquez ici pour jouer au quiz «Qui propose quoi?» de Libération, pour tester vos connaissances sur les programmes de la présidentielle."
  },
  templates: {
    twitter: "{{title}} {{url}} via @libe_2012"
  }
};

xtnv = document;

xtsd = "http://logliberation";

xtsite = "450193";

if (window._deviceIndex < 2) {
  xtn2 = "9";
} else {
  xtn2 = "10";
}

xtpage = "QuiProposeQuoi";

xtdi = "";

jQuery(function() {
  return window.quizz = new Quizz;
});


// CHECK FORM  - CONTACT
checkContactForm = function() {
  if (jQuery('.participation form').length) {
    jQuery('.participation form').validate({
      rules: {
			"EMAIL_FIELD": {required:true, email:true},
			"FIRSTNAME_FIELD": "required",
			"LASTNAME_FIELD": "required"
      },
      messages: {
			"EMAIL_FIELD": {required:" ", email:" "},
			"FIRSTNAME_FIELD": " ",
			"LASTNAME_FIELD": " "
      },
		showErrors: function (errors, validator) {
			this.defaultShowErrors();
		},
	  focusInvalid: false,
      onfocusin: false,
      onkeyup: false,
      onclick: false,
      onfocusout: false
    });
  }
};

// DOCUMENT READY CALLS
jQuery(document).ready(function(){
	checkContactForm();
	jQuery(".header-intro").on("click", function(event){
		document.location.href = '/';
	});
});

var log, shuffle;

if (window.console == null) {
  window.console = {
    log: function() {}
  };
}

log = function(s) {
  return console.log(s);
};

jQuery.fn.extend(jQuery.expr[":"], {
  random: function(a, i, m, r) {
    if (i === 0) jQuery.jQueryRandom = Math.floor(Math.random() * r.length);
    return i === jQuery.jQueryRandom;
  }
});

shuffle = function(a) {
  return a.sort(function() {
    return 0.5 - Math.random();
  });
};


 var _gaq = [['_setAccount', 'UA-7571900-8'], ['_trackPageview'], ['_trackPageLoadTime'], ['_setDetectFlash', false]];
  (function(d, t) {
    var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
    g.src = 'http://www.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g, s);
  }(document, 'script'));


/*
window.onload = function() {
       // Get a reference to the canvas object
       var canvas = document.getElementById('myCanvas');
       // Create an empty project and a view for the canvas:
       paper.setup(canvas);
       // Create a Paper.js Path to draw a line into it:
       var path = new paper.Path();
       // Give the stroke a color
       path.strokeColor = 'black';
       var start = new paper.Point(100, 100);
       // Move to start and draw a line from there
       path.moveTo(start);
       // Note that the plus operator on Point objects does not work
       // in JavaScript. Instead, we need to call the add() function:
       path.lineTo(start.add([ 200, -50 ]));
       // Draw the view now:
       paper.view.draw();
   }
*/
var Bubble;

Bubble = (function() {

  Bubble.prototype.c = null;

  Bubble.prototype.path = null;

  function Bubble(id) {
    var size, topLeft;
    log("_Canvas");
    this.c = jQuery(id);
    paper.setup(id);
    topLeft = new paper.Point(75, 75);
    size = new paper.Size(75, 75);
    this.path = new paper.Path.Rectangle(topLeft, size);
    this.path.strokeColor = 'black';
  }

  return Bubble;

})();

jQuery(window).load(function() {
  var path, size, topLeft;
  paper.setup('c');
  topLeft = new paper.Point(75, 75);
  size = new paper.Size(75, 75);
  path = new paper.Path.Rectangle(topLeft, size);
  path.strokeColor = 'black';
  return paper.view.draw();
});


var Quizz;

Quizz = (function() {

  Quizz.prototype.debug = false;

  Quizz.prototype.automate = false;

  Quizz.prototype.themeSelection = false;

  Quizz.prototype.nb_questions = 1;

  Quizz.prototype.levels = [
    {
      'slug': 'debutant',
      'title': "Débutant assumé",
      'short': "Débutant",
      'answers': 3,
      'questions': 6,
      'level': 2
    }, {
      'slug': 'moyen',
      'title': "Moyen confirmé",
      'short': "Moyen",
      'answers': 5,
      'questions': 8,
      'level': 3
    }, {
      'slug': 'killer',
      'title': "Gros<br />killer",
      'short': "Killer",
      'answers': 9,
      'questions': 10,
      'level': 4
    }
  ];

  Quizz.prototype.data_url = 'http://quiproposequoi.liberation.fr/data.json';

  Quizz.prototype.themes = [];

  Quizz.prototype.propositions = [];

  Quizz.prototype.candidats = [];

  Quizz.prototype.level = null;

  Quizz.prototype.level_name = null;

  Quizz.prototype.level_short = null;

  Quizz.prototype.nb_answers = null;

  Quizz.prototype.current_candidat = null;

  Quizz.prototype.questions = [];

  Quizz.prototype.question = null;

  Quizz.prototype.nb_questions_answered = 0;

  Quizz.prototype.answered_questions = [];

  Quizz.prototype.score = null;

  Quizz.prototype.has_first = false;

  function Quizz() {
    if (this.debug) log("_Quizz");
    this.loadData();
  }

  Quizz.prototype.loadData = function() {
    var _this = this;
    if (this.debug) log("_loadData");
    return jQuery.getJSON(this.data_url, function(data) {
      var dt, tabmois;
      if (_this.debug) log(data);
      _this.themes = data.themes;
      _this.propositions = data.propositions;
      _this.candidats = data.candidats;
      tabmois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
      dt = new Date(parseInt(data.updated.split("-")[0], 10), parseInt(data.updated.split("-")[1], 10) - 1, parseInt(data.updated.split("-")[2], 10));
      jQuery("#updated_date").html("le " + dt.getDate() + " " + tabmois[dt.getMonth()]);
      return _this.prepare();
    });
  };

  Quizz.prototype.prepare = function() {
    if (this.debug) log('_prepare');
    if (document.location.pathname === '/index-dev.html' || document.location.protocol === "file:") {
      return this.welcomeScreen();
    } else {
      if (document.location.pathname.length > 1 || document.location.hash.length > 1) {
        if (document.location.pathname === '/start') {
          return this.levelSelectionScreen();
        } else if (document.location.pathname === '/debutant') {
          return this.setSelectedLevel('debutant');
        } else if (document.location.pathname === '/moyen') {
          return this.setSelectedLevel('moyen');
        } else if (document.location.pathname === '/killer') {
          return this.setSelectedLevel('killer');
        } else {
          return this.setFirstQuestion();
        }
      } else {
        return this.welcomeScreen();
      }
    }
  };

  Quizz.prototype.reset = function() {
    this.questions = [];
    this.question = null;
    this.nb_questions_answered = 0;
    this.answered_questions = [];
    this.score = null;
    this.level = null;
    this.level_name = null;
    this.level_short = null;
    this.nb_answers = null;
    this.has_first = false;
    return this.cleanState();
  };

  Quizz.prototype.setFirstQuestion = function() {
    var first_question, question, slug, _i, _len, _ref;
    if (this.debug) log("_setFirstQuestion");
    if (document.location.pathname.length > 1) {
      slug = document.location.pathname.substring(1);
    } else {
      if (document.location.hash.length > 1) {
        slug = document.location.hash.substring(1);
      }
    }
    _ref = this.propositions;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      question = _ref[_i];
      if (question.slug === slug) first_question = question;
    }
    if (first_question) {
      _gaq.push(['_trackEvent', 'nav', 'first-question', first_question.slug]);
      this.questions.push(first_question);
      this.has_first = true;
    }
    return this.setSelectedLevel('debutant');
  };

  Quizz.prototype.welcomeScreen = function() {
    var _this = this;
    if (this.debug) log('_welcomeScreen');
    this.initAbout();
    if (jQuery('#go').length) {
      jQuery('#go').on('click', function(event) {
        if (_this.themeSelection === true) {
          return _this.themeSelectionScreen();
        } else {
          return _this.levelSelectionScreen();
        }
      });
      if (this.automate) return jQuery('#go').click();
    } else {
      if (this.themeSelection === true) {
        return this.themeSelectionScreen();
      } else {
        return this.levelSelectionScreen();
      }
    }
  };

  Quizz.prototype.themeSelectionScreen = function() {
    var idx, theme, theme_elts;
    if (this.debug) log('themeSelectionScreen');
    this.cleanScreen();
    theme_elts = (function() {
      var _ref, _results;
      _ref = this.themes;
      _results = [];
      for (idx in _ref) {
        theme = _ref[idx];
        _results.push('<li data-slug="' + theme.slug + '">' + theme.title + '</li>');
      }
      return _results;
    }).call(this);
    jQuery('#content').html('<ul id="theme_selector">' + theme_elts.join() + '</ul>');
    if (this.automate) {
      return jQuery('#theme_selector li').on('click', function(event) {
        return quizz.setSelectedTheme(jQuery(this).data('slug'));
      }).parent().find('li:random').click();
    }
  };

  Quizz.prototype.setSelectedTheme = function(theme) {
    var question, t, _i, _j, _len, _len2, _ref, _ref2;
    if (this.debug) log("setSelectedTheme(" + theme);
    this.theme = theme;
    _ref = this.themes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      t = _ref[_i];
      if (t.slug === theme) this.theme_name = t.title;
    }
    _ref2 = this.propositions;
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      question = _ref2[_j];
      if (question.theme === this.theme) this.questions.push(question);
    }
    this.questions = shuffle(this.questions);
    this.nb_questions = Math.min(this.nb_questions, this.questions.length);
    return this.levelSelectionScreen();
  };

  Quizz.prototype.levelSelectionScreen = function() {
    var idx, level, level_elts;
    if (this.debug) log('levelSelectionScreen');
    this.cleanScreen();
    level_elts = (function() {
      var _ref, _results;
      _ref = this.levels;
      _results = [];
      for (idx in _ref) {
        level = _ref[idx];
        _results.push('<li data-slug="' + level.slug + '" class="level ' + level.slug + '"><p>' + level.title + '</p></li>');
      }
      return _results;
    }).call(this);
    jQuery('#wrapper').html('<div id="header"><div class="header-intro"><p>Qui<br />propose<br />quoi ?</p></div></div><div class="preload-images"></div><div class="intro-header step2"><h1>Le principe</h1><p class="intro-content">A chaque proposition, son candidat.<br />Retrouvez-le parmi les postulants à la présidence<br /><br />Choisissez votre niveau de difficulté</p><ul class="level-choice">' + level_elts.join('') + '</ul></div><div class="pubdate"><p>Mis à jour le 7 Février</p></div><div class="about"><p>A propos</p></div>');
    this.initAbout();
    jQuery('.level-choice li').on('click', function(event) {
      return quizz.setSelectedLevel(jQuery(this).data('slug'));
    });
    if (this.automate) return jQuery('.level-choice li:random').click();
  };

  Quizz.prototype.setSelectedLevel = function(level) {
    var question, _i, _j, _len, _len2, _ref, _ref2;
    if (this.debug) log("setSelectedLevel(" + level);
    this.level = level;
    _gaq.push(['_trackEvent', 'level', level]);
    _ref = this.levels;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      level = _ref[_i];
      if (level.slug === this.level) {
        this.level_name = level.title;
        this.level_short = level.short;
        this.nb_questions = level.questions;
        this.nb_answers = level.answers;
        this.answers_level = level.level;
      }
    }
    _ref2 = shuffle(this.propositions);
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      question = _ref2[_j];
      if (!(this.questions[0] && question.slug === this.questions[0].slug)) {
        this.questions.push(question);
      }
    }
    return this.nextQuestion();
  };

  Quizz.prototype.nextQuestion = function() {
    var candidat, k, question_too_hard, _ref;
    if (this.debug) log("_nextQuestion");
    if (this.nb_questions_answered >= this.nb_questions) {
      return this.scoreScreen();
    } else {
      if (!(this.question != null)) {
        this.question = 0;
        this.score = 0;
      } else {
        this.question = this.question + 1;
      }
      question_too_hard = false;
      if (this.debug) log('has_first ' + this.has_first);
      if (!this.has_first) {
        _ref = this.candidats;
        for (k in _ref) {
          candidat = _ref[k];
          if (this.questions[this.question].candidat === candidat.slug) {
            if (candidat.level > this.answers_level) question_too_hard = true;
          }
        }
      }
      if (this.current_candidat != null) {
        if (this.questions[this.question].candidat === this.current_candidat) {
          question_too_hard = true;
        }
      }
      if (question_too_hard) {
        return this.nextQuestion();
      } else {
        return this.questionScreen();
      }
    }
  };

  Quizz.prototype.questionScreen = function() {
    var candidat, candidat_elts, candidats, i, nb_answers, question, source, text, _i, _len, _ref;
    if (this.debug) log("questionScreen(" + this.question);
    this.nb_questions_answered = this.nb_questions_answered + 1;
    this.cleanScreen();
    this.initScreen();
    this.themeNav();
    this.levelNav();
    this.questionNav();
    this.cleanQuizzNav();
    if (!jQuery('#content .bubble').length) {
      jQuery('#content').html('<div class="bubble"><div class="inner"><p></p></div><div class="arrow-down"></div></div><div class="list-candidates"><ul></ul></div><div class="about"><p>A propos</p></div>');
    }
    question = this.questions[this.question];
    this.current_candidat = question.candidat;
    nb_answers = Math.min(this.nb_answers, this.candidats.length);
    _gaq.push(['_trackPageview', '/' + question.slug]);
    this.setState(question);
    text = question.text;
    if (question.link_url) {
      if (question.link_title === null) question.link_title = 'source';
      source = '<a class="source" href="' + question.link_url + '" target="_blank">' + question.link_title + '</a>';
    } else {
      source = '';
    }
    jQuery('#content .bubble').find('p').html(text).parent().after(source);
    if (this.debug) {
      log('(' + question.candidat + ') ' + question.text + question.link_title);
    }
    this.candidats = shuffle(this.candidats);
    candidats = [];
    _ref = this.candidats;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      candidat = _ref[_i];
      if (candidat.slug === question.candidat) candidats.push(candidat);
    }
    i = 0;
    while (candidats.length < nb_answers) {
      if (question.candidat !== this.candidats[i].slug) {
        if (this.candidats[i].level <= this.answers_level) {
          candidats.push(this.candidats[i]);
        }
      }
      i = i + 1;
    }
    candidats = shuffle(candidats);
    candidat_elts = (function() {
      var _j, _len2, _results;
      _results = [];
      for (_j = 0, _len2 = candidats.length; _j < _len2; _j++) {
        candidat = candidats[_j];
        '<li data-slug="' + candidat.slug + '" class="candidate-item"><img src="images/illus-' + candidat.slug + '.png" class="candidate-illus"><p class="candidate-name">' + candidat.short + '<em class="party">' + candidat.parti_short + '</em></p></li>';
        _results.push('<li data-slug="' + candidat.slug + '" class="candidate-item"><img src="images/illus-' + candidat.slug + '.png" class="candidate-illus"><p class="candidate-name">' + candidat.short + '<em class="party">(' + candidat.parti_short + ')</em></p></li>');
      }
      return _results;
    })();
    jQuery('#content .list-candidates ul').html(candidat_elts.join(''));
    jQuery('#content .list-candidates li').on('click', function(event) {
      return quizz.setAnswer(jQuery(this).data('slug'));
    });
    if (this.automate) {
      return jQuery('#content .list-candidates li:random').click();
    }
  };

  Quizz.prototype.setAnswer = function(answer) {
    var question;
    if (this.debug) log("setAnswer(" + answer);
    this.answer = answer;
    question = this.questions[this.question];
    _gaq.push(['_trackEvent', 'answer', question.slug]);
    if (this.answer === question.candidat) {
      this.score = this.score + 1;
      this.goodAnswerScreen();
    } else {
      this.wrongAnswerScreen();
    }
    return jQuery('#content .list-candidates li').off('click');
  };

  Quizz.prototype.goodAnswerScreen = function() {
    var question;
    if (this.debug) log("good");
    question = this.questions[this.question];
    _gaq.push(['_trackEvent', 'goodanswer', question.slug, this.level]);
    jQuery('#wrapper').attr('class', 'answered answer-right');
    jQuery('#header .header-status').html('<div class="confirm"></div><p>YES !</p>');
    jQuery('#header .category').remove('');
    jQuery('#content .list-candidates li[data-slug="' + question.candidat + '"]').addClass('right').append('<div class="right-answer"></div>');
    this.setRightPosition();
    return this.setQuizzNav();
  };

  Quizz.prototype.wrongAnswerScreen = function() {
    var question;
    if (this.debug) log("wrong");
    question = this.questions[this.question];
    _gaq.push(['_trackEvent', 'wronganswer', question.slug, this.level]);
    jQuery('#wrapper').attr('class', 'answered answer-wrong');
    jQuery('#header .header-status').html('<div class="error"></div><p>NON !</p>');
    jQuery('#header .category').remove('');
    jQuery('#content .list-candidates li[data-slug="' + question.candidat + '"]').addClass('right').append('<div class="right-answer"></div>');
    jQuery('#content .list-candidates li[data-slug="' + this.answer + '"]').addClass('wrong').append('<div class="wrong-answer"></div>');
    this.setRightPosition();
    return this.setQuizzNav();
  };

  Quizz.prototype.setRightPosition = function() {
    var pos, question,
      _this = this;
    question = this.questions[this.question];
    pos = null;
    jQuery('#content .list-candidates li').each(function(i, item) {
      if (jQuery(item).data('slug') === question.candidat) {
        return pos = (function() {
          switch (this.level) {
            case 'debutant':
              return i * 2 + 3;
            case 'moyen':
              return i * 2 + 1;
            case 'killer':
              if (i < 5) {
                return i * 2 + 1;
              } else {
                return i - (8 - i);
              }
          }
        }).call(_this);
      }
    });
    return jQuery('#wrapper').addClass('item-' + pos);
  };

  Quizz.prototype.cleanQuizzNav = function() {
    return jQuery('#wrapper .footer-quizz').html('');
  };

  Quizz.prototype.setQuizzNav = function() {
    var question, shareLinks, text_next;
    question = this.questions[this.question];
    shareLinks = '<p addthis:url="http://quiproposequoi.liberation.fr/' + question.slug + '" addthis:title="#quiz Qui propose : ' + question.text + ' ? ">Partager<br />cette proposition</p><ul class="addthis_toolbox addthis_default_style"><li class="twitter"><a href="http://www.addthis.com/bookmark.php" class="addthis_button_twitter" tw:via="liberation_info">twitter</a></li><li class="facebook"><a href="http://www.addthis.com/bookmark.php" class="addthis_button_facebook">facebook</a></li><li class="email"><a href="http://www.addthis.com/bookmark.php" class="addthis_button_email">Email</a></li></ul>';
    if (this.nb_questions_answered < this.nb_questions) {
      text_next = "Question<br />suivante";
    } else {
      text_next = "Regarder<br />vos résultats";
    }
    jQuery('#wrapper .footer-quizz').html('<div class="share">' + shareLinks + '</div><div class="next-question"><p class="next">' + text_next + '</p></div>');
    jQuery('.next-question p.next').on('click', function(event) {
      quizz.nextQuestion();
      return window.scrollTo(0, 1);
    });
    if (this.automate) return jQuery('.next-question p.next').click();
  };

  Quizz.prototype.initScreen = function() {
    jQuery("#wrapper").attr('class', '');
    jQuery('#wrapper').html('<div id="header"><div class="nav"></div><div class="header-status"></div></div><div id="content"></div><div class="footer-quizz"></div><div class="back-start"><p class="restart">Revenir<br />au départ</p></div><div class="about"><p>A propos</p></div>');
    return this.initAbout();
  };

  Quizz.prototype.initAbout = function() {
    jQuery('.about').on("click", function(event) {
      jQuery('.nav, .header-status, .category, #content, .footer-quizz, .back-start, .intro-header, #wrapper .share, .about, .pubdate').hide();
      return jQuery('.about-content').appendTo("#wrapper").show();
    });
    return jQuery('.bt-about').on("click", function(event) {
      jQuery('.about-content').appendTo("#bar-liberation").hide();
      return jQuery('.nav, .header-status, .category, #content, .footer-quizz, .back-start, .intro-header, #wrapper .share, .about, .pubdate').show();
    });
  };

  Quizz.prototype.scoreScreen = function() {
    var good_s, good_size, message, mot, partage, ratio, wrong_s, wrong_size;
    if (this.debug) log("_scoreScreen");
    _gaq.push(['_trackEvent', 'score', this.score, this.level]);
    switch (this.level) {
      case 'debutant':
        switch (this.score) {
          case 0:
          case 1:
            mot = "Ouh là là !";
            message = "On est sans voix, désolé";
            partage = "Un(e) ami(e) peut peut-être vous aider?";
            break;
          case 2:
          case 3:
            mot = "Ouh là là !";
            message = "Etiez-vous en France ces derniers mois ? ";
            partage = "Faites appel<br />à un ami";
            break;
          case 4:
            mot = "Pas mal du tout, dites donc !";
            message = "Vous êtes inscrit sur les listes électorales au moins ? ";
            partage = "Défiez<br />un ami";
            break;
          case 5:
            mot = "Yes !";
            message = "En vrai, vous n'étiez pas débutant…";
            partage = "Quoi, vos amis ne sont pas encore au courant ?";
            break;
          case 6:
            mot = "Chapeau bas !";
            message = "Oubliez les débutants, c'était votre vie d'avant. Vive les Moyens ";
            partage = "Et les autres, ils font combien, au fait?";
        }
        break;
      case 'moyen':
        switch (this.score) {
          case 0:
          case 1:
          case 2:
          case 3:
            mot = "Patatras !";
            message = "Aviez-vous débranché votre télé ces derniers mois ? ";
            partage = "Un(e) ami(e) peut peut-être vous aider?";
            break;
          case 4:
            mot = "Ric rac !";
            message = "Vous n'aviez pas l'intention de vous présenter de toutes façons ? ";
            partage = "Faites appel<br />à un ami";
            break;
          case 5:
          case 6:
            mot = "Pas loin d'un truc";
            message = "Ça mérite d'y retourner direct pendant que vous êtes chaud !";
            partage = "Défiez<br />un ami";
            break;
          case 7:
            mot = "Purée !";
            message = "Frottez-vous à Gros Killer si vous l'osez!";
            partage = "Défiez<br />un ami";
            break;
          case 8:
            mot = "Waouh !";
            message = "Vous êtes fin prêt pour le niveau Gros killer";
            partage = "Défiez tout votre carnet d'adresses";
        }
        break;
      case 'killer':
        switch (this.score) {
          case 0:
          case 1:
          case 2:
            mot = "Patatras !";
            message = "On fait comme si on n'avait rien vu… Recommencez !";
            partage = "Un(e) ami(e) peut peut-être vous aider?";
            break;
          case 3:
          case 4:
            mot = "Patatras !";
            message = "Promis, on n'en parlera pas à vos parents";
            partage = "Un(e) ami(e) peut peut-être vous aider?";
            break;
          case 5:
            mot = "Ric rac !";
            message = "Appelez Mémé, elle ne rate jamais Cdans l'Air";
            partage = "Faites appel<br />à un ami";
            break;
          case 6:
          case 7:
            mot = "Purée !";
            message = "Vous avez répondu avec la cousine qui a fait Sciences Po… ? ";
            partage = "Défiez<br />un ami";
            break;
          case 8:
          case 9:
            mot = "Waouh !";
            message = "Vos collègues ont-ils vraiment conscience de votre valeur?";
            partage = "Défiez tout votre carnet d'adresses";
            break;
          case 10:
            mot = "Yes, you can !";
            message = "Envoyez votre CV au journal !";
            partage = "Quoi ? Vous n'avez pas encore partagé votre score";
        }
    }
    this.cleanState();
    jQuery("#wrapper").attr('class', '');
    jQuery('#header .category').remove('');
    jQuery('#header .header-status').html('');
    jQuery('#header .nav').remove();
    ratio = this.nb_questions / this.score;
    if (ratio > 2) {
      wrong_size = 'big';
      good_size = 'small';
    } else {
      if (ratio > 1.5) {
        wrong_size = 'medium';
        good_size = 'medium';
      } else {
        wrong_size = 'small';
        good_size = 'big';
      }
    }
    good_s = this.score > 1 ? 's' : '';
    wrong_s = this.nb_questions - this.score > 1 ? 's' : '';
    jQuery('#content').html('<div class="level-final"><p>sur <strong>' + this.nb_questions + '</strong> questions <em>Niveau ' + this.level_short + '</em></p></div><div id="final"><div class="score-status"><div class="' + good_size + '"><div class="good"><strong> ' + this.score + '</strong> bonne' + good_s + '<br /> réponse' + good_s + '</div></div><div class="' + wrong_size + '"><div class="wrong"><strong>' + (this.nb_questions - this.score) + '</strong> mauvaise' + wrong_s + ' réponse' + wrong_s + '</div></div></div> <p class="mot">' + mot + '</p> <p class="message">' + message + '</p></div></div>');
    jQuery('.footer-quizz .next-question').remove();
    jQuery('.footer-quizz .share p').html(partage);
    jQuery('.footer-quizz .share').before('<div class="save-score"><p>enregistrez votre score et gagnez peut-être<br />un abonnement numérique d\'un an à Libération</p><p><a href="#" id="gotoform">J\'enregistre mon score</a></p></div>');
    jQuery('#gotoform').on('click', function(evt) {
      evt.preventDefault();
      jQuery(".participation").remove();
      jQuery("#content").remove();
      jQuery("#header").after("<div class='participation'>" + jQuery("#participationtemplate").html() + "</div>");
      return jQuery(".participation").on('submit', function(evt) {
        evt.preventDefault();
        return jQuery.ajax({
          url: "http://tre.emv3.com/D2UTF8",
          data: jQuery(".participation form").serialize(),
          success: function(evt) {
            alert("Votre inscription a bien été enregistrée.\n\nC'est reparti pour un tour !");
            return window.returnToHome();
          },
          error: function(evt) {
            alert('Une erreur est survenue lors de votre enregistrement');
            return window.returnToHome();
          }
        });
      });
    });
    jQuery('.footer-quizz .share').after('<div class="try-again">Essayer<br />un autre niveau<p class="try-again-bt">OK</p></div>');
    jQuery('.footer-quizz').appendTo('#final');
    return jQuery('.footer-quizz .try-again-bt').on('click', function(event) {
      _gaq.push(['_trackEvent', 'nav', 'try-again']);
      return window.returnToHome();
    });
  };

  Quizz.prototype.cleanScreen = function() {
    return jQuery('#content').html('');
  };

  Quizz.prototype.setState = function(question) {
    if (!this.debug) return document.location.hash = question.slug;
  };

  Quizz.prototype.cleanState = function() {
    if (!this.debug) return document.location.hash = '';
  };

  Quizz.prototype.themeNav = function() {
    if (!jQuery('#header .category').length) {
      jQuery('#header').append('<div class="category"><div class="category-name"></div></div>');
    }
    return jQuery('#header .category-name').html('<p>' + this.questions[this.question].theme_title + '</p>');
  };

  Quizz.prototype.levelNav = function() {
    if (!jQuery('#themeNav')) return this.themeNav();
  };

  Quizz.prototype.questionNav = function() {
    if (this.debug) log('questionNav');
    if (!jQuery('#header .nav .steps').length) {
      jQuery('#header .nav').append('<p>QUESTION</p><p class="steps"></p>');
    }
    jQuery('#header').append('<div class="header-intro"><p>Qui<br />propose<br />Quoi ?</p></div>');
    jQuery('#wrapper .restart, #header .header-intro').on('click', function(event) {
      _gaq.push(['_trackEvent', 'nav', 'restart']);
      return window.returnToHome();
    });
    return jQuery('#header .nav .steps').html(this.nb_questions_answered + ' / ' + this.nb_questions);
  };

  return Quizz;

})();


/* Modernizr 2.0.6 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-cssanimations-iepp-cssclasses-teststyles-testprop-testallprops-domprefixes
 */
;window.Modernizr=function(a,b,c){function B(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+n.join(c+" ")+c).split(" ");return A(d,b)}function A(a,b){for(var d in a)if(k[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function z(a,b){return!!~(""+a).indexOf(b)}function y(a,b){return typeof a===b}function x(a,b){return w(prefixes.join(a+";")+(b||""))}function w(a){k.cssText=a}var d="2.0.6",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l,m=Object.prototype.toString,n="Webkit Moz O ms Khtml".split(" "),o={},p={},q={},r=[],s=function(a,c,d,e){var f,h,j,k=b.createElement("div");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:i+(d+1),k.appendChild(j);f=["&shy;","<style>",a,"</style>"].join(""),k.id=i,k.innerHTML+=f,g.appendChild(k),h=c(k,a),k.parentNode.removeChild(k);return!!h},t,u={}.hasOwnProperty,v;!y(u,c)&&!y(u.call,c)?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],c)},o.cssanimations=function(){return B("animationName")};for(var C in o)v(o,C)&&(t=C.toLowerCase(),e[t]=o[C](),r.push((e[t]?"":"no-")+t));w(""),j=l=null,a.attachEvent&&function(){var a=b.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function s(a){var b=-1;while(++b<g)a.createElement(f[b])}a.iepp=a.iepp||{};var d=a.iepp,e=d.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",f=e.split("|"),g=f.length,h=new RegExp("(^|\\s)("+e+")","gi"),i=new RegExp("<(/*)("+e+")","gi"),j=/^\s*[\{\}]\s*$/,k=new RegExp("(^|[^\\n]*?\\s)("+e+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),l=b.createDocumentFragment(),m=b.documentElement,n=m.firstChild,o=b.createElement("body"),p=b.createElement("style"),q=/print|all/,r;d.getCSS=function(a,b){if(a+""===c)return"";var e=-1,f=a.length,g,h=[];while(++e<f){g=a[e];if(g.disabled)continue;b=g.media||b,q.test(b)&&h.push(d.getCSS(g.imports,b),g.cssText),b="all"}return h.join("")},d.parseCSS=function(a){var b=[],c;while((c=k.exec(a))!=null)b.push(((j.exec(c[1])?"\n":c[1])+c[2]+c[3]).replace(h,"$1.iepp_$2")+c[4]);return b.join("\n")},d.writeHTML=function(){var a=-1;r=r||b.body;while(++a<g){var c=b.getElementsByTagName(f[a]),d=c.length,e=-1;while(++e<d)c[e].className.indexOf("iepp_")<0&&(c[e].className+=" iepp_"+f[a])}l.appendChild(r),m.appendChild(o),o.className=r.className,o.id=r.id,o.innerHTML=r.innerHTML.replace(i,"<$1font")},d._beforePrint=function(){p.styleSheet.cssText=d.parseCSS(d.getCSS(b.styleSheets,"all")),d.writeHTML()},d.restoreHTML=function(){o.innerHTML="",m.removeChild(o),m.appendChild(r)},d._afterPrint=function(){d.restoreHTML(),p.styleSheet.cssText=""},s(b),s(l);d.disablePP||(n.insertBefore(p,n.firstChild),p.media="print",p.className="iepp-printshim",a.attachEvent("onbeforeprint",d._beforePrint),a.attachEvent("onafterprint",d._afterPrint))}(a,b),e._version=d,e._domPrefixes=n,e.testProp=function(a){return A([a])},e.testAllProps=B,e.testStyles=s,g.className=g.className.replace(/\bno-js\b/,"")+(f?" js "+r.join(" "):"");return e}(this,this.document);

var _ = require('underscore')._;
var fs = require("fs");

_.templateSettings = {
    evaluate    : /([\s\S]+?)/g,
    interpolate : /=([\s\S]+?)/g
  };

var configs = [{
	"device":"phone",
	"platform":"ios",
	"id":0
},
{
	"device":"phone",
	"platform":"android",
	"id":2
},
{
	"device":"tablet",
	"platform":"ios",
	"id":1
},
{
	"device":"tablet",
	"platform":"android",
	"id":3
}
];

var tpl = fs.readFileSync("../index.template.html","utf-8");

for (var i=0;i<configs.length;i++) {

	fs.writeFileSync(
		"../index.gen."+configs[i].device+"."+configs[i].platform+".html",
		_.template(tpl)({
			"config":configs[i]
		}),
		"utf-8"
	);	
}
fs.writeFileSync("../index.html",_.template(tpl)({
		"config":configs[0]
	}),
	"utf-8"
);	

