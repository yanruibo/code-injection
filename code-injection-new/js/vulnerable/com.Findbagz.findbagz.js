






                $.extend({
                         getUrlVars: function(){
                         var vars = [], hash;
                         var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                         for(var i = 0; i < hashes.length; i++)
                         {
                         hash = hashes[i].split('=');
                         vars.push(hash[0]);
                         vars[hash[0]] = hash[1];
                         }
                         return vars;
                         },
                         getUrlVar: function(name){
                         return $.getUrlVars()[name];
                         }
                         });
                
                function search(){
                    
                    var networkState = navigator.connection.type;
                    
                    //alert(networkState);
                    
                    function alertDismissed() {
                        // do something
                    }
                    
                    if(networkState=="unknown" || networkState=="none"){
                        navigator.notification.alert(
                                                     'No Internet Connection found, Please note that the application require a carrier data network or Wifi connection to function',  // message
                                                     alertDismissed,         // callback
                                                     'Error',            // title
                                                     'Ok'                  // buttonName
                                                     );
                        
                    }else{
                        
                 // Getting all the forms elements and their values in one step
                        //var values = location.search;
                        
                        $("#searchResults").html('<br/><br/><font size="4">تحميل...</font>');
                        $("#searchResults").load("http://findbagz.com/mobile/bags.php", function(response, status, xhr) {
                                              if (status == "error") {
                                              var msg = "Sorry but there was an error: ";
                                              $("#searchResults").html(msg + xhr.status + " " + xhr.statusText);
                                              }
                                              if(status=="success"){
                                              //$("ul").listview();
                                              }
                                              });
                        
                        
                        
                        
                    }
                    
                    
                }
                $( document ).bind( "mobileinit", function() {
                                   // Make your jQuery Mobile framework configuration changes here!
                                   
                                   $.mobile.allowCrossDomainPages = true;
                                   
                                   });
                 document.addEventListener('deviceready',onDeviceReady, false);
                
                function onDeviceReady(){
                    //childbrowser = ChildBrowser.install();
                    search();
        window.plugins.analytics.start("UA-21744250-1", function(){}, function(){});
        window.plugins.analytics.trackPageView("android app Bags", function(){}, function(){});                    
                    
                }
                $( document ).on( "pageinit", function() {
                                 $( ".photopopup" ).on({
                                                       popupbeforeposition: function() {
                                                       var maxHeight = $( window ).height() - 60 + "px";
                                                       $( ".photopopup img" ).css( "max-height", maxHeight );
                                                       }
                                                       });
                                 });
                function isTouchDevice(){
	try{
		document.createEvent("TouchEvent");
		return true;
	}catch(e){
		return false;
	}
}
                function touchScroll(id){
  if(isTouchDevice()){ //if touch events exist…
      var el=document.getElementById(id);
      var scrollStartPosY=0;
      var scrollStartPosX=0;

      document.getElementById(id).addEventListener('touchstart', function(event) {
        scrollStartPosY=this.scrollTop+event.touches[0].pageY;
        scrollStartPosX=this.scrollLeft+event.touches[0].pageX;
        //event.preventDefault(); // Keep this remarked so you can click on buttons and links in the div
      },false);

      document.getElementById(id).addEventListener('touchmove', function(event) {
        // These if statements allow the full page to scroll (not just the div) if they are
        // at the top of the div scroll or the bottom of the div scroll
        // The -5 and +5 below are in case they are trying to scroll the page sideways
        // but their finger moves a few pixels down or up.  The event.preventDefault() function
        // will not be called in that case so that the whole page can scroll.
        if ((this.scrollTop < this.scrollHeight-this.offsetHeight &&
          this.scrollTop+event.touches[0].pageY < scrollStartPosY-5) ||
          (this.scrollTop != 0 && this.scrollTop+event.touches[0].pageY > scrollStartPosY+5))
              event.preventDefault();  
        if ((this.scrollLeft < this.scrollWidth-this.offsetWidth &&
          this.scrollLeft+event.touches[0].pageX < scrollStartPosX-5) ||
          (this.scrollLeft != 0 && this.scrollLeft+event.touches[0].pageX > scrollStartPosX+5))
              event.preventDefault();  
        this.scrollTop=scrollStartPosY-event.touches[0].pageY;
        this.scrollLeft=scrollStartPosX-event.touches[0].pageX;
      },false);
  }
}
                

                $( "#popupPanel" ).on({
                                      popupbeforeposition: function() {
                                      var h = $( window ).height();
                                      
                                      $( "#popupPanel" ).css( "height", h );
                                      }
                                      });
                $.ajax({
                       url: 'http://www.findbagz.com/mobile/getData.php?get=brands',
                       success: function (data) {
                       $("#brands").append(data);
                       
                       $("#brands").listview('refresh');
                       touchScroll('brands');
                       }
                       });
                                      
                $.ajax({
                       url: 'http://www.findbagz.com/mobile/getData.php?get=colors',
                       success: function (data) {
                       $("#colors").append(data);
                       
                       $("#colors").listview('refresh');
                       touchScroll('colors');
                       }
                       });
                    
                function filterResults(param){
                    $("#searchResults").html('<br/><br/><font size="4">تحميل...</font>');
                    $("#searchResults").load("http://findbagz.com/mobile/bags.php?"+param, function(response, status, xhr) {
                                             if (status == "error") {
                                             var msg = "Sorry but there was an error: ";
                                             $("#searchResults").html(msg + xhr.status + " " + xhr.statusText);
                                             }
                                             if(status=="success"){
                                             $("#popupPanel").popup( "close" );
                                             }
                                             });
                
                }
                                
                





            var pushNotification;
            
            function onDeviceReady() {
                $("#app-status-ul").append('<li>deviceready event received</li>');
                
				document.addEventListener("backbutton", function(e)
				{
                	$("#app-status-ul").append('<li>backbutton event received</li>');
  					
      				if( $("#home").length > 0)
					{
						// call this to get a new token each time. don't call it to reuse existing token.
						//pushNotification.unregister(successHandler, errorHandler);
						e.preventDefault();
						navigator.app.exitApp();
					}
					else
					{
						navigator.app.backHistory();
					}
				}, false);
			
				try 
				{ 
                	pushNotification = window.plugins.pushNotification;
                	if (device.platform == 'android' || device.platform == 'Android') {
						$("#app-status-ul").append('<li>registering android</li>');
                    	pushNotification.register(successHandler, errorHandler, {"senderID":"661780372179","ecb":"onNotificationGCM"});		// required!
					} else {
						$("#app-status-ul").append('<li>registering iOS</li>');
                    	pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});	// required!
                	}
                }
				catch(err) 
				{ 
					txt="There was an error on this page.\n\n"; 
					txt+="Error description: " + err.message + "\n\n"; 
					alert(txt); 
				} 
            }
            
            // handle APNS notifications for iOS
            function onNotificationAPN(e) {
                if (e.alert) {
                     $("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
                     navigator.notification.alert(e.alert);
                }
                    
                if (e.sound) {
                    var snd = new Media(e.sound);
                    snd.play();
                }
                
                if (e.badge) {
                    pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
                }
            }
            
            // handle GCM notifications for Android
            function onNotificationGCM(e) {
                $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
                
                switch( e.event )
                {
                    case 'registered':
					if ( e.regid.length > 0 )
					{
						$("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
						// Your GCM push server needs to know the regID before it can push to this device
						// here is where you might want to send it the regID for later use.
						console.log("regID = " + e.regID);
					}
                    break;
                    
                    case 'message':
                    	// if this flag is set, this notification happened while we were in the foreground.
                    	// you might want to play a sound to get the user's attention, throw up a dialog, etc.
                    	if (e.foreground)
                    	{
							$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
							
							// if the notification contains a soundname, play it.
							var my_media = new Media("/android_asset/www/"+e.soundname);
							my_media.play();
						}
						else
						{	// otherwise we were launched because the user touched a notification in the notification tray.
							if (e.coldstart)
								$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
							else
							$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
						}
							
						$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
						$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
                    break;
                    
                    case 'error':
						$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
                    break;
                    
                    default:
						$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
                    break;
                }
            }
            
            function tokenHandler (result) {
                $("#app-status-ul").append('<li>token: '+ result +'</li>');
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
            }
			
            function successHandler (result) {
                $("#app-status-ul").append('<li>success:'+ result +'</li>');
            }
            
            function errorHandler (error) {
                $("#app-status-ul").append('<li>error:'+ error +'</li>');
            }
            
			document.addEventListener('deviceready', onDeviceReady, true);

         









        $.extend({
                 getUrlVars: function(){
                 var vars = [], hash;
                 var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                 for(var i = 0; i < hashes.length; i++)
                 {
                 hash = hashes[i].split('=');
                 vars.push(hash[0]);
                 vars[hash[0]] = hash[1];
                 }
                 return vars;
                 },
                 getUrlVar: function(name){
                 return $.getUrlVars()[name];
                 }
                 });
        
        document.addEventListener('deviceready',onDeviceReady, false);
        
        function onDeviceReady(){
            document.getElementById("photo").src= "http://www.findbagz.com/"+$.getUrlVar('img');
            
        }

        
        
        







            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        






                $.extend({
                         getUrlVars: function(){
                         var vars = [], hash;
                         var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                         for(var i = 0; i < hashes.length; i++)
                         {
                         hash = hashes[i].split('=');
                         vars.push(hash[0]);
                         vars[hash[0]] = hash[1];
                         }
                         return vars;
                         },
                         getUrlVar: function(name){
                         return $.getUrlVars()[name];
                         }
                         });
                
                function search(){
                    
                    var networkState = navigator.connection.type;
                    
                    //alert(networkState);
                    
                    function alertDismissed() {
                        // do something
                    }
                    
                    if(networkState=="unknown" || networkState=="none"){
                        navigator.notification.alert(
                                                     'No Internet Connection found, Please note that the application require a carrier data network or Wifi connection to function',  // message
                                                     alertDismissed,         // callback
                                                     'Error',            // title
                                                     'Ok'                  // buttonName
                                                     );
                        
                    }else{
                        
                 // Getting all the forms elements and their values in one step
                        //var values = location.search;
                        
                        $("#searchResults").html('<br/><br/><font size="4">Loading...</font>');
                        $("#searchResults").load("http://findbagz.com/mobile/styles.php", function(response, status, xhr) {
                                              if (status == "error") {
                                              var msg = "Sorry but there was an error: ";
                                              $("#searchResults").html(msg + xhr.status + " " + xhr.statusText);
                                              }
                                              if(status=="success"){
                                              //$("ul").listview();
                                              }
                                              });
                        
                        
                        
                        
                    }
                    
                    
                }
                $( document ).bind( "mobileinit", function() {
                                   // Make your jQuery Mobile framework configuration changes here!
                                   
                                   $.mobile.allowCrossDomainPages = true;
                                   
                                   });
                 document.addEventListener('deviceready',onDeviceReady, false);
                
                function onDeviceReady(){
                    childbrowser = ChildBrowser.install();
                    search();
                    
                    
                }
                $( document ).on( "pageinit", function() {
                                 $( ".photopopup" ).on({
                                                       popupbeforeposition: function() {
                                                       var maxHeight = $( window ).height() - 60 + "px";
                                                       $( ".photopopup img" ).css( "max-height", maxHeight );
                                                       }
                                                       });
                                 });
                
                
                







                $.extend({
                         getUrlVars: function(){
                         var vars = [], hash;
                         var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                         for(var i = 0; i < hashes.length; i++)
                         {
                         hash = hashes[i].split('=');
                         vars.push(hash[0]);
                         vars[hash[0]] = hash[1];
                         }
                         return vars;
                         },
                         getUrlVar: function(name){
                         return $.getUrlVars()[name];
                         }
                         });
                
                function search(){
                    
                    var networkState = navigator.connection.type;
                    
                    //alert(networkState);
                    
                    function alertDismissed() {
                        // do something
                    }
                    
                    if(networkState=="unknown" || networkState=="none"){
                        navigator.notification.alert(
                                                     'No Internet Connection found, Please note that the application require a carrier data network or Wifi connection to function',  // message
                                                     alertDismissed,         // callback
                                                     'Error',            // title
                                                     'Ok'                  // buttonName
                                                     );
                        
                    }else{
                        
                 // Getting all the forms elements and their values in one step
                        //var values = location.search;
                        
                        $("#searchResults").html('<br/><br/><font size="4">تحميل...</font>');
                        $("#searchResults").load("http://findbagz.com/mobile/allProducts.php", function(response, status, xhr) {
                                              if (status == "error") {
                                              var msg = "Sorry but there was an error: ";
                                              $("#searchResults").html(msg + xhr.status + " " + xhr.statusText);
                                              }
                                              if(status=="success"){
                                              //$("ul").listview();
                                              }
                                              });
                        
                        
                        
                        
                    }
                    
                    
                }
                $( document ).bind( "mobileinit", function() {
                                   // Make your jQuery Mobile framework configuration changes here!
                                   
                                   $.mobile.allowCrossDomainPages = true;
                                   
                                   });
                 document.addEventListener('deviceready',onDeviceReady, false);
                
                function onDeviceReady(){
                    //childbrowser = ChildBrowser.install();
                    search();
        window.plugins.analytics.start("UA-21744250-1", function(){}, function(){});
        window.plugins.analytics.trackPageView("android app allProducts", function(){}, function(){});                    
                    
                }
                $( document ).on( "pageinit", function() {
                                 $( ".photopopup" ).on({
                                                       popupbeforeposition: function() {
                                                       var maxHeight = $( window ).height() - 60 + "px";
                                                       $( ".photopopup img" ).css( "max-height", maxHeight );
                                                       }
                                                       });
                                 });
                
                function isTouchDevice(){
	try{
		document.createEvent("TouchEvent");
		return true;
	}catch(e){
		return false;
	}
}
                function touchScroll(id){
  if(isTouchDevice()){ //if touch events exist…
      var el=document.getElementById(id);
      var scrollStartPosY=0;
      var scrollStartPosX=0;

      document.getElementById(id).addEventListener('touchstart', function(event) {
        scrollStartPosY=this.scrollTop+event.touches[0].pageY;
        scrollStartPosX=this.scrollLeft+event.touches[0].pageX;
        //event.preventDefault(); // Keep this remarked so you can click on buttons and links in the div
      },false);

      document.getElementById(id).addEventListener('touchmove', function(event) {
        // These if statements allow the full page to scroll (not just the div) if they are
        // at the top of the div scroll or the bottom of the div scroll
        // The -5 and +5 below are in case they are trying to scroll the page sideways
        // but their finger moves a few pixels down or up.  The event.preventDefault() function
        // will not be called in that case so that the whole page can scroll.
        if ((this.scrollTop < this.scrollHeight-this.offsetHeight &&
          this.scrollTop+event.touches[0].pageY < scrollStartPosY-5) ||
          (this.scrollTop != 0 && this.scrollTop+event.touches[0].pageY > scrollStartPosY+5))
              event.preventDefault();  
        if ((this.scrollLeft < this.scrollWidth-this.offsetWidth &&
          this.scrollLeft+event.touches[0].pageX < scrollStartPosX-5) ||
          (this.scrollLeft != 0 && this.scrollLeft+event.touches[0].pageX > scrollStartPosX+5))
              event.preventDefault();  
        this.scrollTop=scrollStartPosY-event.touches[0].pageY;
        this.scrollLeft=scrollStartPosX-event.touches[0].pageX;
      },false);
  }
}
                

                $( "#popupPanel" ).on({
                                      popupbeforeposition: function() {
                                      var h = $( window ).height();
                                      
                                      $( "#popupPanel" ).css( "height", h );
                                      }
                                      });
                $.ajax({
                       url: 'http://www.findbagz.com/mobile/getData.php?get=brands',
                       success: function (data) {
                       $("#brands").append(data);
                       
                       $("#brands").listview('refresh');
                       touchScroll('brands');
                       }
                       });
                                      
                $.ajax({
                       url: 'http://www.findbagz.com/mobile/getData.php?get=colors',
                       success: function (data) {
                       $("#colors").append(data);
                       
                       $("#colors").listview('refresh');
                       touchScroll('colors');
                       }
                       });
                    
                function filterResults(param){
                    $("#searchResults").html('<br/><br/><font size="4">ØªØ­Ù…ÙŠÙ„...</font>');
                    $("#searchResults").load("http://findbagz.com/mobile/allProducts.php?"+param, function(response, status, xhr) {
                                             if (status == "error") {
                                             var msg = "Sorry but there was an error: ";
                                             $("#searchResults").html(msg + xhr.status + " " + xhr.statusText);
                                             }
                                             if(status=="success"){
                                             $("#popupPanel").popup( "close" );
                                             }
                                             });
                
                }
                                
                








var pushNotification;
    // Cordova is ready
    //
    function onDeviceReady() {
        navigator.splashscreen.show();
        window.plugins.analytics.start("UA-21744250-1", function(){}, function(){});
        window.plugins.analytics.trackPageView("android app homepage", function(){}, function(){});
        
        		document.addEventListener("backbutton", function(e)
				{
  					
      				if( $("#home").length > 0)
					{
						// call this to get a new token each time. don't call it to reuse existing token.
						//pushNotification.unregister(successHandler, errorHandler);
						e.preventDefault();
						navigator.app.exitApp();
					}
					else
					{
						navigator.app.backHistory();
					}
				}, false);
			
				try 
				{ 
                	pushNotification = window.plugins.pushNotification;
                	if (device.platform == 'android' || device.platform == 'Android') {
                    	pushNotification.register(successHandler, errorHandler, {"senderID":"148791952125","ecb":"onNotificationGCM"});		// required!
					} else {
                    	pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});	// required!
                	}
                }
				catch(err) 
				{} 
        
    }

// handle APNS notifications for iOS
            function onNotificationAPN(e) {
                if (e.alert) {
                     $("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
                     navigator.notification.alert(e.alert);
                }
                    
                if (e.sound) {
                    var snd = new Media(e.sound);
                    snd.play();
                }
                
                if (e.badge) {
                    pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
                }
            }
            
            // handle GCM notifications for Android
            function onNotificationGCM(e) {
                $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
                //alert(e.event);
                switch( e.event )
                {
                    case 'registered':
					if ( e.regid.length > 0 )
					{
						$("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
						//alert(e.regid);
						$.ajax({
        url: "http://findbagz.com/mobile/register_device.php?regId="+e.regid+"&platform=android",
        success: function (dataCheck) {

        }
    });
						// Your GCM push server needs to know the regID before it can push to this device
						// here is where you might want to send it the regID for later use.
						//console.log("regID = " + e.regID);
					}
                    break;
                    
                    case 'message':
                    	// if this flag is set, this notification happened while we were in the foreground.
                    	// you might want to play a sound to get the user's attention, throw up a dialog, etc.
                    	if (e.foreground)
                    	{
							$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
							
							// if the notification contains a soundname, play it.
							var my_media = new Media("/android_asset/www/"+e.soundname);
							my_media.play();
						}
						else
						{	// otherwise we were launched because the user touched a notification in the notification tray.
							if (e.coldstart)
								$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
							else
							$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
						}
						alert(e.payload.message);	
						$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
						//$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
                    break;
                    
                    case 'error':
						$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
                    break;
                    
                    default:
						$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
                    break;
                }
            }
            
            function tokenHandler (result) {
                $("#app-status-ul").append('<li>token: '+ result +'</li>');
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
            }
			
            function successHandler (result) {
                $("#app-status-ul").append('<li>success:'+ result +'</li>');
            }
            
            function errorHandler (error) {
                $("#app-status-ul").append('<li>error:'+ error +'</li>');
            }

    document.addEventListener("deviceready", onDeviceReady, true);
    







                $.extend({
                         getUrlVars: function(){
                         var vars = [], hash;
                         var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                         for(var i = 0; i < hashes.length; i++)
                         {
                         hash = hashes[i].split('=');
                         vars.push(hash[0]);
                         vars[hash[0]] = hash[1];
                         }
                         return vars;
                         },
                         getUrlVar: function(name){
                         return $.getUrlVars()[name];
                         }
                         });
                
                function search(){
                    
                    var networkState = navigator.connection.type;
                    
                    //alert(networkState);
                    
                    function alertDismissed() {
                        // do something
                    }
                    
                    if(networkState=="unknown" || networkState=="none"){
                        navigator.notification.alert(
                                                     'No Internet Connection found, Please note that the application require a carrier data network or Wifi connection to function',  // message
                                                     alertDismissed,         // callback
                                                     'Error',            // title
                                                     'Ok'                  // buttonName
                                                     );
                        
                    }else{
                        
                 // Getting all the forms elements and their values in one step
                        //var values = location.search;
                        
                        $("#searchResults").html('<br/><br/><font size="4">تحميل...</font>');
                        $("#searchResults").load("http://findbagz.com/mobile/accessories.php", function(response, status, xhr) {
                                              if (status == "error") {
                                              var msg = "Sorry but there was an error: ";
                                              $("#searchResults").html(msg + xhr.status + " " + xhr.statusText);
                                              }
                                              if(status=="success"){
                                              //$("ul").listview();
                                              }
                                              });
                        
                        
                        
                        
                    }
                    
                    
                }
                $( document ).bind( "mobileinit", function() {
                                   // Make your jQuery Mobile framework configuration changes here!
                                   
                                   $.mobile.allowCrossDomainPages = true;
                                   
                                   });
                 document.addEventListener('deviceready',onDeviceReady, false);
                
                function onDeviceReady(){
                    //childBrowser = ChildBrowser.install();
                    search();
        window.plugins.analytics.start("UA-21744250-1", function(){}, function(){});
        window.plugins.analytics.trackPageView("android app accessories", function(){}, function(){});
                    
                }
                $( document ).on( "pageinit", function() {
                                 $( ".photopopup" ).on({
                                                       popupbeforeposition: function() {
                                                       var maxHeight = $( window ).height() - 60 + "px";
                                                       $( ".photopopup img" ).css( "max-height", maxHeight );
                                                       }
                                                       });
                                 });
                
                function isTouchDevice(){
	try{
		document.createEvent("TouchEvent");
		return true;
	}catch(e){
		return false;
	}
}
                function touchScroll(id){
  if(isTouchDevice()){ //if touch events exist…
      var el=document.getElementById(id);
      var scrollStartPosY=0;
      var scrollStartPosX=0;

      document.getElementById(id).addEventListener('touchstart', function(event) {
        scrollStartPosY=this.scrollTop+event.touches[0].pageY;
        scrollStartPosX=this.scrollLeft+event.touches[0].pageX;
        //event.preventDefault(); // Keep this remarked so you can click on buttons and links in the div
      },false);

      document.getElementById(id).addEventListener('touchmove', function(event) {
        // These if statements allow the full page to scroll (not just the div) if they are
        // at the top of the div scroll or the bottom of the div scroll
        // The -5 and +5 below are in case they are trying to scroll the page sideways
        // but their finger moves a few pixels down or up.  The event.preventDefault() function
        // will not be called in that case so that the whole page can scroll.
        if ((this.scrollTop < this.scrollHeight-this.offsetHeight &&
          this.scrollTop+event.touches[0].pageY < scrollStartPosY-5) ||
          (this.scrollTop != 0 && this.scrollTop+event.touches[0].pageY > scrollStartPosY+5))
              event.preventDefault();  
        if ((this.scrollLeft < this.scrollWidth-this.offsetWidth &&
          this.scrollLeft+event.touches[0].pageX < scrollStartPosX-5) ||
          (this.scrollLeft != 0 && this.scrollLeft+event.touches[0].pageX > scrollStartPosX+5))
              event.preventDefault();  
        this.scrollTop=scrollStartPosY-event.touches[0].pageY;
        this.scrollLeft=scrollStartPosX-event.touches[0].pageX;
      },false);
  }
}
                

                $( "#popupPanel" ).on({
                                      popupbeforeposition: function() {
                                      var h = $( window ).height();
                                      
                                      $( "#popupPanel" ).css( "height", h );
                                      }
                                      });
                $.ajax({
                       url: 'http://www.findbagz.com/mobile/getData.php?get=brands',
                       success: function (data) {
                       $("#brands").append(data);
                       
                       $("#brands").listview('refresh');
                       touchScroll('brands');
                       }
                       });
                
                $.ajax({
                       url: 'http://www.findbagz.com/mobile/getData.php?get=colors',
                       success: function (data) {
                       $("#colors").append(data);
                       
                       $("#colors").listview('refresh');
                       touchScroll('colors');
                       }
                       });
                
                function filterResults(param){
                    $("#searchResults").html('<br/><br/><font size="4">تحميل...</font>');
                    $("#searchResults").load("http://findbagz.com/mobile/accessories.php?"+param, function(response, status, xhr) {
                                             if (status == "error") {
                                             var msg = "Sorry but there was an error: ";
                                             $("#searchResults").html(msg + xhr.status + " " + xhr.statusText);
                                             }
                                             if(status=="success"){
                                             $("#popupPanel").popup( "close" );
                                             }
                                             });
                    
                }
                
                







                $.extend({
                         getUrlVars: function(){
                         var vars = [], hash;
                         var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                         for(var i = 0; i < hashes.length; i++)
                         {
                         hash = hashes[i].split('=');
                         vars.push(hash[0]);
                         vars[hash[0]] = hash[1];
                         }
                         return vars;
                         },
                         getUrlVar: function(name){
                         return $.getUrlVars()[name];
                         }
                         });
                
                function search(){
                    
                    var networkState = navigator.connection.type;
                    
                    //alert(networkState);
                    
                    function alertDismissed() {
                        // do something
                    }
                    
                    if(networkState=="unknown" || networkState=="none"){
                        navigator.notification.alert(
                                                     'No Internet Connection found, Please note that the application require a carrier data network or Wifi connection to function',  // message
                                                     alertDismissed,         // callback
                                                     'Error',            // title
                                                     'Ok'                  // buttonName
                                                     );
                        
                    }else{
                        
                 // Getting all the forms elements and their values in one step
                        //var values = location.search;
                        
                        $("#searchResults").html('<br/><br/><font size="4">تحميل...</font>');
                        $("#searchResults").load("http://findbagz.com/mobile/discounts.php", function(response, status, xhr) {
                                              if (status == "error") {
                                              var msg = "Sorry but there was an error: ";
                                              $("#searchResults").html(msg + xhr.status + " " + xhr.statusText);
                                              }
                                              if(status=="success"){
                                              //$("ul").listview();
                                              }
                                              });
                        
                        
                        
                        
                    }
                    
                    
                }
                $( document ).bind( "mobileinit", function() {
                                   // Make your jQuery Mobile framework configuration changes here!
                                   
                                   $.mobile.allowCrossDomainPages = true;
                                   
                                   });
                 document.addEventListener('deviceready',onDeviceReady, false);
                
                function onDeviceReady(){
                    //childbrowser = ChildBrowser.install();
                    search();
        window.plugins.analytics.start("UA-21744250-1", function(){}, function(){});
        window.plugins.analytics.trackPageView("android app Discounts", function(){}, function(){});                    
                    
                }
                $( document ).on( "pageinit", function() {
                                 $( ".photopopup" ).on({
                                                       popupbeforeposition: function() {
                                                       var maxHeight = $( window ).height() - 60 + "px";
                                                       $( ".photopopup img" ).css( "max-height", maxHeight );
                                                       }
                                                       });
                                 });
                
                function isTouchDevice(){
	try{
		document.createEvent("TouchEvent");
		return true;
	}catch(e){
		return false;
	}
}
                function touchScroll(id){
  if(isTouchDevice()){ //if touch events exist…
      var el=document.getElementById(id);
      var scrollStartPosY=0;
      var scrollStartPosX=0;

      document.getElementById(id).addEventListener('touchstart', function(event) {
        scrollStartPosY=this.scrollTop+event.touches[0].pageY;
        scrollStartPosX=this.scrollLeft+event.touches[0].pageX;
        //event.preventDefault(); // Keep this remarked so you can click on buttons and links in the div
      },false);

      document.getElementById(id).addEventListener('touchmove', function(event) {
        // These if statements allow the full page to scroll (not just the div) if they are
        // at the top of the div scroll or the bottom of the div scroll
        // The -5 and +5 below are in case they are trying to scroll the page sideways
        // but their finger moves a few pixels down or up.  The event.preventDefault() function
        // will not be called in that case so that the whole page can scroll.
        if ((this.scrollTop < this.scrollHeight-this.offsetHeight &&
          this.scrollTop+event.touches[0].pageY < scrollStartPosY-5) ||
          (this.scrollTop != 0 && this.scrollTop+event.touches[0].pageY > scrollStartPosY+5))
              event.preventDefault();  
        if ((this.scrollLeft < this.scrollWidth-this.offsetWidth &&
          this.scrollLeft+event.touches[0].pageX < scrollStartPosX-5) ||
          (this.scrollLeft != 0 && this.scrollLeft+event.touches[0].pageX > scrollStartPosX+5))
              event.preventDefault();  
        this.scrollTop=scrollStartPosY-event.touches[0].pageY;
        this.scrollLeft=scrollStartPosX-event.touches[0].pageX;
      },false);
  }
}
                

                $( "#popupPanel" ).on({
                                      popupbeforeposition: function() {
                                      var h = $( window ).height();
                                      
                                      $( "#popupPanel" ).css( "height", h );
                                      }
                                      });
                $.ajax({
                       url: 'http://www.findbagz.com/mobile/getData.php?get=brands',
                       success: function (data) {
                       $("#brands").append(data);
                       
                       $("#brands").listview('refresh');
                       touchScroll('brands');
                       }
                       });
                
                $.ajax({
                       url: 'http://www.findbagz.com/mobile/getData.php?get=colors',
                       success: function (data) {
                       $("#colors").append(data);
                       
                       $("#colors").listview('refresh');
                       touchScroll('colors');
                       }
                       });
                
                function filterResults(param){
                    $("#searchResults").html('<br/><br/><font size="4">تحميل...</font>');
                    $("#searchResults").load("http://findbagz.com/mobile/discounts.php?"+param, function(response, status, xhr) {
                                             if (status == "error") {
                                             var msg = "Sorry but there was an error: ";
                                             $("#searchResults").html(msg + xhr.status + " " + xhr.statusText);
                                             }
                                             if(status=="success"){
                                             $("#popupPanel").popup( "close" );
                                             }
                                             });
                    
                }
                
                

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
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
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
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};




