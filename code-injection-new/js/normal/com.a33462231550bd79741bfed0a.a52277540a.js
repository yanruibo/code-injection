

		


	if (typeof  jt_set_frame_size2 !== 'function') {
		var jt_set_frame_size2 = jt_set_frame_size;
		var isExpanded = false;
		var jt_set_frame_size = function(x, y, width, height, transition, callback) {
			jt_set_frame_size2(x, y, width, height, transition, callback);
			
			if (!isExpanded) {
                isExpanded = true;
                Tracking.startInteraction();
            } else {
                isExpanded = false;
                Tracking.stopInteraction();
            }
            JtVwCb.setSize(x, y, width, height,isExpanded);
		}
	}
	
	if (typeof TrayController === 'function') {
		var initialTouchStart = TrayController.prototype.touchstart;
		TrayController.prototype.touchstart = function () {
			Tracking.startInteraction();
			return initialTouchStart.apply(this, arguments);
		};
		
		var initialTouchEnd = TrayController.prototype.touchend;
        TrayController.prototype.touchend = function () {
            Tracking.stopInteraction();
            return initialTouchEnd.apply(this, arguments);
        };
	}
	


_accel = {}
_accel.x = 0;
_accel.y = 0;
_accel.z = 0;

function gotAccel(x, y, z){	
	_accel.x = x;	
	_accel.y = y;	
	_accel.z = z;
}

// use the var syntax eventually for namespace purposes

callbackStashCounter = 0;
callbackStash = {};

submitCallbackForExecution = function(callback) {
    var id = 'RaptorCB-' + (callbackStashCounter++);
    callbackStash[id] = callback;
    return id;
};

executeCallback = function(id) {
        if (id != null) {
            var callback = callbackStash[id];
            if (callback === null) {
                delete callbackStash[id];
                return 'executeCallback: id[' + id + '] received but callback entry does not exist';
            } else {
                if (typeof callback === 'function') {
                	callback();
                    delete callbackStash[id];
                    return 'executeCallback: Success';
                } else {
                    try {
                        eval(callback);
                    } catch(e) {
                        return 'executeCallback: Exception thrown: ' + e;
                    } finally {
                        delete callbackStash[id];
                    }
					
                    return 'executeCallback: Success';
                }
            }
        }
        return 'executeCallback: Invalid callback ID';
    }

var AdDevice = new Object();
AdDevice.transitions = {
        None          : 0,
        FlipFromLeft  : 1,
        FlipFromRight : 2,
        CurlUp        : 3,
        CurlDown      : 4
    };

AdDevice.getCurrentAcceleration = function (successCallback, errorCallback, options) {
	if (typeof successCallback == "function") {
		successCallback(_accel);	
	}
}

AdDevice.watchAcceleration = function (successCallback, errorCallback, options) {  
	var frequency = (options != undefined)? options.frequency : 10000;
	Accel.start(frequency);
	return setInterval(function() {
		AdDevice.getCurrentAcceleration(successCallback, errorCallback, options);
		}, frequency); 
}

AdDevice.clearWatch =  function (watchId) {	
	Accel.stop();	
	clearInterval(watchId);
}

AdDevice.beginAdInteraction = function () {
	Tracking.startInteraction();
}

AdDevice.endAdInteraction = function () {
	Tracking.stopInteraction();
}

AdDevice.expandTo = function (width, height, callback, transition, options) {
    var id = submitCallbackForExecution(callback);
    if (typeof transition !== 'number') {
        transition = AdDevice.transitions[transition];
        if (typeof transition === 'undefined') {
            transition = AdDevice.transitions.None;
        }
    }
    JtVwCb.expandTo(width, height, id, transition, options);
	AdDevice.beginAdInteraction();
}

AdDevice.restoreToBanner = function (callback, transition, options) {
    var id = submitCallbackForExecution(callback);
    if (typeof transition !== 'number') {
        transition = AdDevice.transitions[transition];
        if (typeof transition === 'undefined') {
            transition = AdDevice.transitions.None;
        }
    }
	JtVwCb.restoreToBanner(id, transition, options);
	AdDevice.endAdInteraction();
}

AdDevice.openUri = function(uri, contentType, options) {
	// TODO: do something
	// Tells the SDK to navigate to a specific URL and "do the right thing" with it.  
	// Since normally clicking on a link will be intercepted by the SDK, you'd use this 
	// function if you want to supply hints.  What hints, you say?  Well, contentType 
	// helps control what type of player will be chosen (or which external app will be used).  
	// This is particularly useful if the URI points to an URL-shortened URL and you want 
	// to tell the SDK what type of data will be at the other end of the redirect before the 
	// redirect is followed.  
	// (valid types are "youtube", "video", "uri", "tel", "itunes", "map")  
	// In this case, options is a JSON structure.  I think the only interesting option 
	// is fullscreen, as in {fullscreen: true}.
	JtVwCb.openURI(uri, contentType, options);
}

AdDevice.getScreenSize = function () {
	var response = JtVwCb.getScreenSize();
	var result = JSON.parse(response);
	return result;
}

function initORMMA() {
    var ormma = window.ormma = {};
    
    // CONSTANTS ///////////////////////////////////////////////////////////////
    
    var STATES = ormma.STATES = {
        UNKNOWN     :'unknown',
        DEFAULT     :'default',
        RESIZED     :'resized',
        EXPANDED    :'expanded',
        HIDDEN      :'hidden'
    };
    
    // just a subset of all ormma events
    var EVENTS = ormma.EVENTS = {
        ERROR               :'error',
        INFO                :'info',
        STATECHANGE         :'stateChange'
    };
    
    // PRIVATE PROPERTIES (sdk controlled) //////////////////////////////////////////////////////
    
    var state = STATES.UNKNOWN;
    
    var screenSize = null;
    
    var ready = false;
    
    var listeners = {};
    
    var EventListeners = function(event) {
        this.event = event;
        this.count = 0;
        var listeners = {};
        
        this.add = function(func) {
            var id = String(func);
            if (!listeners[id]) {
            	listeners[id] = func;
                this.count++;
                // if (this.count == 1) ormmaview.activate(event);
            }
        };
        this.remove = function(func) {
            var id = String(func);
            if (listeners[id]) {
            	listeners[id] = null;
                delete listeners[id];
                this.count--;
                // if (this.count == 0) ormmaview.deactivate(event);
                return true;
            } else {
            	return false;
            }
        };
        this.removeAll = function() { for (var id in listeners) this.remove(listeners[id]); };
        this.broadcast = function(args) { for (var id in listeners) listeners[id].apply({}, args); };
        this.toString = function() {
            var out = [event,':'];
            for (var id in listeners) out.push('|',id,'|');
            return out.join('');
        };
    };
    
    var contains = function(value, array) {
        for (var i in array) if (array[i] == value) return true;
        return false;
    };
    
    var broadcastEvent = function() {
        var args = new Array(arguments.length);
        for (var i = 0; i < arguments.length; i++) args[i] = arguments[i];
        var event = args.shift();
        if (listeners[event]) listeners[event].broadcast(args);
    }

    ormma.addEventListener = function(event, listener) {
        if (!event || !listener) {
            broadcastEvent(EVENTS.ERROR, 'Both event and listener are required.', 'addEventListener');
        } else if (!contains(event, EVENTS)) {
			broadcastEvent(EVENTS.ERROR, 'Unknown event: ' + event, 'addEventListener');
        } else {
            if (!listeners[event]) listeners[event] = new EventListeners(event);
            listeners[event].add(listener);
        }
    };

    ormma.removeEventListener = function(event, listener) {
        if (!event) {
            broadcastEvent(EVENTS.ERROR, 'Must specify an event.', 'removeEventListener');
        } 
        else {
            if (listener && (!listeners[event] || !listeners[event].remove(listener))) {
                broadcastEvent(EVENTS.ERROR, 'Listener not currently registered for event', 'removeEventListener');
                return;  
            } 
            else if (listeners[event]){
                listeners[event].removeAll();
            }
            
            if (listeners[event] && listeners[event].count == 0) {
                listeners[event] = null;
                delete listeners[event];
            }
        }
    };

   
    // todo: get the screen size via the bridge.
    // todo: presumably this is initialized once via javascript rather than
    // todo: invoked every time
    ormma.getScreenSize = function() { // return {width: 480, height: 320};
    	return AdDevice.getScreenSize();
    };
        
    // do nothing :-)
    ormma.getExpandProperties = function () { return {}; };
    // do nothing :-)
    ormma.setExpandProperties = function (props) { } ;
        
    // in a fully ORMMA compliant implementation this would be explicitly sent by the SDK whenever the
    // ad expands or contracts.  In our implementation, we want to support the ORMMA syntax for adding
    // and removing listeners but we only need the STATECHANGE event to be sent in response to an ORMMA
    // request to change state.
    ormma.runORMMAExpandCallbacks = function () { 
        state = STATES.EXPANDED;
        broadcastEvent(EVENTS.STATECHANGE, state);
    }
    ormma.runORMMACollapseCallbacks = function () { 
        state = STATES.DEFAULT;
        broadcastEvent(EVENTS.STATECHANGE, state);
    }
        
    ormma.expand = function(dimensions, URL) {
        // extract x,y,width,height from dimensions and pass off to 
        // AdDevice expander
        var width = dimensions.width;
        var height = dimensions.height;
        // todo: the callback here can be a noop because eventually the event triggering will
        // todo: automatically invoke the appropriate callbacks.
        AdDevice.expandTo(width, height, function() { ormma.runORMMAExpandCallbacks(); });
    };
        
    ormma.close = function() {
        AdDevice.restoreToBanner(function() { ormma.runORMMACollapseCallbacks();});
    };
        
    ormma.open = function(url, controls) {
        // TODO: handle controls
        AdDevice.openUri(url);
    };
    
    ormma.getViewable = function() {
    	return true;
    }
    
    ormma.hide = function() {
    	JtVwCb.hideWidget();
    }
        
    ormma.playVideo = function(url, properties) {
        // TODO: handle properties
        AdDevice.openUri(url);
    };

}

window.onload = initORMMA();







	                        
         $(document).ready(function() {
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            //$(document).ready(function() {
            $("a.open-child-browser").click(function() {
           // alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
            // });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initFancyPush,false);
                });
            

	                        
         $(document).ready(function() {
		// alert("1");
             document.addEventListener("deviceready",onDeviceReadyCheckNetwork,false);
         });
    
         function onDeviceReadyCheckNetwork() {
	//	alert("2");
        var networkState = navigator.network.connection.type;
if (networkState===Connection.UNKNOWN){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }

         }
     

             
                function resizeRssImages() {
                    var screenWidth = window.innerWidth;
                    $("img.rss-image").each(function (i,e) {
                        var imgWidth = $(this).width();
                console.log("RSS_WIDTH_SCREEN: " + screenWidth);
                console.log("RSS_WIDTH_IMAGE: " + imgWidth);
                        if(imgWidth > screenWidth) {
                            $(this).css("width","95%");
                        }
                    });
                }
                
                function htmlspecialchars_decode (string, quote_style) {

  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined') {
    quote_style = 2;
  }
  string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
    // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
}
                
             



	            
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyVideoPlayer,false);
         });
    
         function onDeviceReadyVideoPlayer() {
                        
            $("a.open-plugin-videoplayer").click(function() {
                 var vidGoUrl = $(this).attr("data-vidurl");
	             window.plugins.videoPlayer.play(vidGoUrl);
                 return false;
             });
         }
     

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
            
    
        $(document).ready(function() {
                          $('#youtubevideos').youTubeChannel({ 
                                                             userName: 'dragonmountcom', 
                                                             channel: "uploads", 
                                                             hideAuthor: true,
                                                             numberToDisplay: 30,
                                                             linksInNewWindow: true
                                                             //other options
                                                             //loadingText: "Loading...",                    
                                                             },"android");
                          });            
        

function ActivityIndicator()
{

};

ActivityIndicator.prototype.show = function(message)
{
    PhoneGap.exec('ActivityIndicatorCommand.show', message);

};

ActivityIndicator.prototype.updateMessage = function(message)
{
    PhoneGap.exec('ActivityIndicatorCommand.updateMessage', message);
    
};

ActivityIndicator.prototype.hide = function()
{
    PhoneGap.exec('ActivityIndicatorCommand.hide');


};

ActivityIndicator.install = function()
{
    if(!window.plugins)
    {
        window.plugins = {};	
    }

    window.plugins.activityIndicator = new ActivityIndicator();
    return window.plugins.activityIndicator;
};

PhoneGap.addConstructor(ActivityIndicator.install);






                
                var childBrowser;
                
                function getUrlVars() {
                    var vars = {};
                    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                                                             vars[key] = value;
                                                             });
                    return vars;
                }
                
                function onBodyLoad()
                {
                    document.addEventListener("deviceready",onDeviceReady,false);
                }
                /* When this function is called, PhoneGap has been initialized and is ready to roll */
           /*     function onDeviceReady()
                {
                    var goUrl = getUrlVars()["goUrl"];
					goUrl=decodeURIComponent(goUrl);
                    redirectUrl="index.html";
                    
            try {
                        //both of these should work...
                        //window.plugins.childBrowser.showWebPage(url);
                        alert(goUrl);
                        window.plugins.childBrowser.showWebPage(goUrl);
                    }
                    catch (err)
                    {
                        alert(err);
                    }
					
                    window.location = redirectUrl
                
				}*/
                function onDeviceReady() {
                    
                    var root = this;
                    cb = window.plugins.childBrowser;
                    
                    var goUrl = getUrlVars()["goUrl"];
					goUrl=decodeURIComponent(goUrl);
                    redirectUrl="index.html";                    
                    if(cb != null) {
                        
                        cb.onLocationChange = function(loc){ root.locChanged(loc); };
                        cb.onClose = function(){root.onCloseBrowser(); };
                        cb.onOpenExternal = function(){root.onOpenExternal(); };
                        cb.showWebPage(goUrl);
                                    }
                }
                
                function onCloseBrowser() {
                    console.log("onCloseBrowser!");
                    window.location = redirectUrl
                }
                
                function locChanged(loc) {
                    console.log("locChanged!");
                }
                
                function onOpenExternal() {
                    alert("onOpenExternal!");
                }                
                






	                        
         $(document).ready(function() {
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            //$(document).ready(function() {
            $("a.open-child-browser").click(function() {
           // alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
            // });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initFancyPush,false);
                });
            

	                        
         $(document).ready(function() {
		// alert("1");
             document.addEventListener("deviceready",onDeviceReadyCheckNetwork,false);
         });
    
         function onDeviceReadyCheckNetwork() {
	//	alert("2");
        var networkState = navigator.network.connection.type;
if (networkState===Connection.UNKNOWN){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }

         }
     

             
                function resizeRssImages() {
                    var screenWidth = window.innerWidth;
                    $("img.rss-image").each(function (i,e) {
                        var imgWidth = $(this).width();
                console.log("RSS_WIDTH_SCREEN: " + screenWidth);
                console.log("RSS_WIDTH_IMAGE: " + imgWidth);
                        if(imgWidth > screenWidth) {
                            $(this).css("width","95%");
                        }
                    });
                }
                
                function htmlspecialchars_decode (string, quote_style) {

  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined') {
    quote_style = 2;
  }
  string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
    // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
}
                
             

              
function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}
   	                
   	                $(document).ready(function() {
                        rssReader();
                    });

                function  rssReader() {
                    $("#main-content").html("<p>Please wait...</p>");
                    var RSS = "http://best-android-apps.mobi/3790&offerwall=1";
                    //var RSS = "http://best-android-apps.mobi/3790";
                    console.log("EVERBADGE URL: "+RSS);
                    var entries = [];
                    var selectedEntry = "";
                          $.get(RSS, {}, function(res, code) {
                                    //console.log("EVERBADGE RETURN CODE: " + code);
                             if(code == "success") {
                                    //console.log(res)
                                 var xml = $(res);
                                    
                                     var content = xml.find("#main");
  							     $("#main-content").html(content);$("a.appTitle").each(function(index,v) {
                                     var goUrl = $(this).attr("href");
               
                                     $(this).addClass("open-everbadge-external-browser");
                                     $(this).attr("data-gourl",goUrl);
                                     $(this).attr("rel","external");
                                 });
                                 $(".thumbBox a").each(function(index,v) {
                                     var goUrl = $(this).attr("href");
                                     $(this).addClass("open-everbadge-external-browser");
                                     $(this).attr("data-gourl",goUrl);
                                     $(this).attr("rel","external");
                                 });
                
                $(".open-everbadge-external-browser").click(function() {
                        var goUrl = $(this).attr("data-gourl");
                
                        window.plugins.childBrowser.openExternal(goUrl);
                        return false;
                    });
                             } else {
                                  $("#main-content").html("<p>Could not get data, please try again.</p>");
                             }
                         });
                }
                
                $(document).ready(function() {
                    
                });
                
                

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
            









	                        
         $(document).ready(function() {
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            //$(document).ready(function() {
            $("a.open-child-browser").click(function() {
           // alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
            // });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initFancyPush,false);
                });
            

             
                function resizeRssImages() {
                    var screenWidth = window.innerWidth;
                    $("img.rss-image").each(function (i,e) {
                        var imgWidth = $(this).width();
                console.log("RSS_WIDTH_SCREEN: " + screenWidth);
                console.log("RSS_WIDTH_IMAGE: " + imgWidth);
                        if(imgWidth > screenWidth) {
                            $(this).css("width","95%");
                        }
                    });
                }
                
                function htmlspecialchars_decode (string, quote_style) {

  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined') {
    quote_style = 2;
  }
  string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
    // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
}
                
             


          var pictureSource;   // picture source
            var destinationType; // sets the format of returned value
            var destinationTypeData;
            var albumButton;
            var libraryButton;
            var cameraButton;
            var resetButton;
                    
            function OnBodyLoadCamera() {
                //console.log("BODY LOADED");
                //alert("Body Load");
               document.addEventListener("deviceready",onDeviceReadyCamera,false);
                  $("#select-photo-wrapper").show();
            }

                    
            function onDeviceReadyCamera() {
            //alert("Device Ready");
                console.log("DEVICE READY");
                pictureSource=navigator.camera.PictureSourceType;
                destinationType=navigator.camera.DestinationType;
                    
                albumButton = document.getElementById("select-photo-album-button");
                cameraButton = document.getElementById("take-photo-button");
                resetButton = document.getElementById("send-photo-reset");
                destinationTypeData = destinationType.FILE_URI;
                //destinationTypeData = destinationType.FILE_URI;
                                
                $("#send-photo-submit").click(function() {
                    console.log("SEND VIA WEBINTENT");
                    var extras = {};
                    extras[WebIntent.EXTRA_SUBJECT] = "Wheel of Time Photos/Illustrations ";
                    extras[WebIntent.EXTRA_TEXT] = $("textarea#emailPhotoMessage").val();
                    extras[WebIntent.EXTRA_STREAM] = $("#emailPhotoLocation").val();
                    extras[WebIntent.EXTRA_EMAIL] = "theappopotamus@gmail.com";
                    window.plugins.webintent.startActivity({
                       action: WebIntent.ACTION_SEND,
                       type: 'image/jpeg',
                       extras: extras
                    },
                    function() {
                        //$("#photo-container").html("<p><strong>Photo sent! Thankyou!</stong></p>");
                        $("#photo-container").html("");
                        navigator.notification.alert("Photo is being sent. Thank you!", false, "Sending...", "Close");
                        $("textarea#emailPhotoMessage").val("");
                        $("#emailPhotoLocation").val("");
                        $("#send-photo-submit-container").hide();
                        $("#select-photo-wrapper").show();
                    },
                    function() {
                        $("#photo-container").html("<p><strong>Sorry - failed to send Photo. Please try again.</stong></p>");
                        //alert("Failed to send email via Android Intent");
                    }
                    );
                    return false;
                });
                $("#send-photo-submit-container").hide();
                
                albumButton.addEventListener("click", getFromAlbum, false);
                            
                cameraButton.addEventListener("click", takeFromCamera, false);
                resetButton.addEventListener("click", resetForm, false);
            }
                            
            function emailComposerCb() {
                $("#photo-container").html("");
                    $("textarea#emailPhotoMessage").val("");
                    $("#emailPhotoLocation").val("");
                    $("#send-photo-submit-container").hide();
                    $("#select-photo-wrapper").show();
                    navigator.notification.alert("Photo sent. Thank you!", false, "Sent", "Close");
            }
                            
            function resetForm() {
                navigator.notification.confirm("Reset the Form?", function(button) {
   	                if(parseInt(button) == 1) {
                        $("textarea#emailPhotoMessage").val("");
                        $("#emailPhotoLocation").val("");
                        $("#send-photo-submit-container").hide();
                        $("#select-photo-wrapper").show();
   	                }
                }, "Reset the Form?","OK,Cancel")
            }
                            
            function getFromLibrary() {
                alert("GET FROM LIBRARY");
                getPhoto(pictureSource.PHOTOLIBRARY);
                return false;
            }
                            
            function getFromAlbum() {
                //alert("GET FROM ALBUM");
                getPhoto(pictureSource.SAVEDPHOTOALBUM);
                return false;
            }
                            
            function takeFromCamera() {
                console.log("TAKE A PHOTO");
                capturePhoto();
                return false;
            }
                           
            function capturePhoto() {
                // Take picture using device camera and retrieve image as a URI
                navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 49, destinationType: destinationTypeData });
            }
                   
            function getPhoto(source) {
                // Retrieve image file location from specified source
                //console.log("GET PHOTO FROM " + source);
                navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 49, 
                destinationType: destinationTypeData,
                sourceType: source });
            }
                    
            function onPhotoURISuccess(imageData) {
                console.log("PHOTO URI: " + imageData);
                var imageURI;
                imageURI = imageData;
                $("#emailPhotoLocation").val(imageURI);
                $("#photo-container").html('<img src="'+imageURI+'" style="width:90%;display:block;margin-left:auto;margin-right:auto;" id="photo-to-send" />');
                    
                $("#send-photo-submit-container").show();
                $("#select-photo-wrapper").hide();
            }
                    
            function onFail(message) {
                $("#photo-container").html("<p><strong>Sorry - failed to get Photo ("+message+"). Please try again.</stong></p>");
                console.log("GET PHOTO Failed because: " + message);
                $("#select-photo-wrapper").show();
            }
        

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
            

var __mainDiv;
 var __preLoaderHTML;
 var __opts;

 function __jQueryYouTubeChannelReceiveData(data,deviceType) {

     var cnt = 0;
     $.each(data.feed.entry, function(i, e) {
         if (cnt < __opts.numberToDisplay) {
             var vidUrl=e.link[0].href;
             vidUrl=(vidUrl.replace(/www.youtube.com/gi, "m.youtube.com"));
			 var videoId=(vidUrl.replace(/m.youtube.com/gi, "i.ytimg.com"));
			 videoId=(videoId.replace(/watch\?v=/gi, "vi/"));
			 videoId=(videoId.replace(/&feature=youtube_gdata/gi, ""));
			// alert(videoId);
             var parts = e.id.$t.split('/');
             //var videoId = parts[parts.length-1];
			 //alert(videoId);
 			 var out = '<li class="ui-li ui-li-static ui-body-c"><center><p class="ui-li-desc"><br><a href="' + 
             vidUrl + '" rel="external" class="open-plugin-videoplayer" data-vidurl="'+vidUrl+'"><img src="' + 
             videoId + '/2.jpg"/ width="240px" height="180px"></a></p><p class="ui-li-desc"><a href="' + 
             vidUrl + '" rel="external" class="open-plugin-videoplayer" data-vidurl="'+vidUrl+'">' + e.title.$t + '</a></p></center></li>';
			
			 
            
             if (!__opts.hideAuthor) {
                 out = out + 'Author: ' + e.author[0].name.$t + '';
             }
             out = out + '</center></p>';
             __mainDiv.append(out);
             cnt = cnt + 1;
         }
     });
            
    // Open in new tab?
    if (__opts.linksInNewWindow) {
        $(__mainDiv).find("li > a").attr("target", "_blank");
    }
    
    // Remove the preloader and show the content
    $(__preLoaderHTML).remove();
    __mainDiv.show();
}
                
(function($) {
    $.fn.youTubeChannel = function(options) {
        var videoDiv = $(this);

        $.fn.youTubeChannel.defaults = {
            userName: null,
            channel: "uploads", //options are favorites or uploads
            loadingText: "Loading...",
            numberToDisplay: 3,
            linksInNewWindow: true,
            hideAuthor: false
        }

        __opts = $.extend({}, $.fn.youTubeChannel.defaults, options);

        return this.each(function() {
            if (__opts.userName != null) {
                videoDiv.append("<ul id=\"linksList\" class=\"ui-listview ui-listview-inset ui-corner-all ui-shadow\" data-inset=\"true\" data-role=\"listview\"></ul>");
                __mainDiv = $("#linksList");
                __mainDiv.hide();

                __preLoaderHTML = $("<p class=\"loader\">" + 
                    __opts.loadingText + "</p>");
                videoDiv.append(__preLoaderHTML);

                // TODO: Error handling!
                $.ajax({
                 //   url: "http://gdata.youtube.com/feeds/base/users/" + __opts.userName + "/" + __opts.channel + "?alt=json",
						url: "http://gdata.youtube.com/feeds/api/videos?q=" + __opts.userName + "&max-results=10&v=2&alt=json",
                    cache: true,
                    dataType: 'jsonp',                    
                    success: __jQueryYouTubeChannelReceiveData
                });
            }
        });
    };
})(jQuery);

/**
 * Phonegap Web Intent plugin
 * Copyright (c) Boris Smus 2010
 *
 */
var WebIntent = function() { 

};

WebIntent.ACTION_SEND = "android.intent.action.SEND";
WebIntent.ACTION_VIEW= "android.intent.action.VIEW";
WebIntent.EXTRA_TEXT = "android.intent.extra.TEXT";
WebIntent.EXTRA_SUBJECT = "android.intent.extra.SUBJECT";
WebIntent.EXTRA_STREAM = "android.intent.extra.STREAM";
WebIntent.EXTRA_EMAIL = "android.intent.extra.EMAIL";

WebIntent.prototype.startActivity = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'startActivity', [params]);
};

WebIntent.prototype.hasExtra = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'hasExtra', [params]);
};

WebIntent.prototype.getUri = function(success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getUri', []);
};

WebIntent.prototype.getExtra = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getExtra', [params]);
};


WebIntent.prototype.onNewIntent = function(callback) {
	return cordova.exec(function(args) {
		callback(args);
    }, function(args) {
    }, 'WebIntent', 'onNewIntent', []);
};

WebIntent.prototype.sendBroadcast = function(params, success, fail) {
    return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'sendBroadcast', [params]);
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.webintent) {
    window.plugins.webintent = new WebIntent();
}


//PhoneGap.addConstructor(function() {
//	PhoneGap.addPlugin('webintent', new WebIntent());
//});







	                        
         $(document).ready(function() {
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            //$(document).ready(function() {
            $("a.open-child-browser").click(function() {
           // alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
            // });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initFancyPush,false);
                });
            

             
                function resizeRssImages() {
                    var screenWidth = window.innerWidth;
                    $("img.rss-image").each(function (i,e) {
                        var imgWidth = $(this).width();
                console.log("RSS_WIDTH_SCREEN: " + screenWidth);
                console.log("RSS_WIDTH_IMAGE: " + imgWidth);
                        if(imgWidth > screenWidth) {
                            $(this).css("width","95%");
                        }
                    });
                }
                
                function htmlspecialchars_decode (string, quote_style) {

  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined') {
    quote_style = 2;
  }
  string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
    // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
}
                
             

		                
    $(document).ready(function() {
    
    document.body.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                }, false);/*
if(screen.height>550){
        $("body").css("background","url(\"Default.png\")");
        $("body").css("backgroundSize","100% 100%");
        $(".ui-page").css("background","url(\"Default.png\")");
        $(".ui-page").css("backgroundImage","url(\"Default.png\")");
        $(".ui-page").css("backgroundSize","100% 100%");
        }
        else{
        $("body").css("background","url(\"Default.png\")");
        $("body").css("backgroundSize","100% 100%");
        $(".ui-page").css("background","url(\"Default.png\")");
        $(".ui-page").css("backgroundImage","url(\"Default.png\")");
        $(".ui-page").css("backgroundSize","100% 100%");
        }*/
    });
    

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
            



                
                var pictureSource;   // picture source
                var destinationType; // sets the format of returned value 
                
                
                function onBodyLoad()
                {
                    document.addEventListener("deviceready",onDeviceReady,false);
                }
                
                /* When this function is called, PhoneGap has been initialized and is ready to roll */
                function onDeviceReady()
                {
                    phoneGapReady.innerHTML = "PhoneGap is Ready";
                    
                }
                
                function checkConnection() {
                    var networkState = navigator.network.connection.type;
                    
                    var states = {};
                    states[Connection.UNKNOWN]  = 'Unknown connection';
                    states[Connection.ETHERNET] = 'Ethernet connection';
                    states[Connection.WIFI]     = 'WiFi connection';
                    states[Connection.CELL_2G]  = 'Cell 2G connection';
                    states[Connection.CELL_3G]  = 'Cell 3G connection';
                    states[Connection.CELL_4G]  = 'Cell 4G connection';
                    states[Connection.NONE]     = 'No network connection';
                    
                    alert('Connection type: ' + states[networkState]);
                }

                
                

var __mainDiv;
 var __preLoaderHTML;
 var __opts;

 function __jQueryYouTubeChannelReceiveData(data,deviceType) {

     var cnt = 0;
     $.each(data.feed.entry, function(i, e) {
         if (cnt < __opts.numberToDisplay) {
             var vidUrl=e.link[0].href;
             vidUrl=(vidUrl.replace(/www.youtube.com/gi, "m.youtube.com"));
             var parts = e.id.$t.split('/');
             var videoId = parts[parts.length-1];
		
             var out = '<li class="ui-li ui-li-static ui-body-c"><center><p class="ui-li-desc"><br><a href="' + 
             vidUrl + '" rel="external" class="open-plugin-videoplayer" data-vidurl="'+vidUrl+'"><img src="http://i.ytimg.com/vi/' + 
             videoId + '/2.jpg"/ width="240px" height="180px"></a></p><p class="ui-li-desc"><a href="' + 
             vidUrl + '" rel="external" class="open-plugin-videoplayer" data-vidurl="'+vidUrl+'">' + e.title.$t + '</a></p></center></li>';
			 
		
             if (!__opts.hideAuthor) {
                 out = out + 'Author: ' + e.author[0].name.$t + '';
             }
             out = out + '</center></p>';
             __mainDiv.append(out);
             cnt = cnt + 1;
         }
     });
            
    // Open in new tab?
    if (__opts.linksInNewWindow) {
        $(__mainDiv).find("li > a").attr("target", "_blank");
    }
    
    // Remove the preloader and show the content
    $(__preLoaderHTML).remove();
    __mainDiv.show();
}
                
(function($) {
    $.fn.youTubeChannel = function(options) {
        var videoDiv = $(this);

        $.fn.youTubeChannel.defaults = {
            userName: null,
            channel: "uploads", //options are favorites or uploads
            loadingText: "Loading...",
            numberToDisplay: 3,
            linksInNewWindow: true,
            hideAuthor: false
        }

        __opts = $.extend({}, $.fn.youTubeChannel.defaults, options);

        return this.each(function() {
            if (__opts.userName != null) {
                videoDiv.append("<ul id=\"linksList\" class=\"ui-listview ui-listview-inset ui-corner-all ui-shadow\" data-inset=\"true\" data-role=\"listview\"></ul>");
                __mainDiv = $("#linksList");
                __mainDiv.hide();

                __preLoaderHTML = $("<p class=\"loader\">" + 
                    __opts.loadingText + "</p>");
                videoDiv.append(__preLoaderHTML);

                // TODO: Error handling!
                $.ajax({
                    url: "http://gdata.youtube.com/feeds/base/users/" + 
                        __opts.userName + "/" + __opts.channel + "?alt=json",
                    cache: true,
                    dataType: 'jsonp',                    
                    success: __jQueryYouTubeChannelReceiveData
                });
            }
        });
    };
})(jQuery);




$(document).ready(function(){
	$("#submit").click(function(){	

	//specify where to post
	var postTo="http://skybuilder.net/cf/process.php?appId=16491868334f5efe416da432.66391647";
	
	//get the info to post
	var field0Val=$("#field0").val();var field1Val=$("#field1").val();var field2Val=$("#field2").val();var field3Val=$("#field3").val();

//post
$.post(postTo, { field0: field0Val,field1: field1Val,field2: field2Val,field3: field3Val } );

//change submit button to thank you
document.getElementById('sendEmail').innerHTML = "<p>Thank for your submission.</p>";

		return false;
	});						   
});
 






	                        
         $(document).ready(function() {
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            //$(document).ready(function() {
            $("a.open-child-browser").click(function() {
           // alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
            // });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initFancyPush,false);
                });
            

             
                function resizeRssImages() {
                    var screenWidth = window.innerWidth;
                    $("img.rss-image").each(function (i,e) {
                        var imgWidth = $(this).width();
                console.log("RSS_WIDTH_SCREEN: " + screenWidth);
                console.log("RSS_WIDTH_IMAGE: " + imgWidth);
                        if(imgWidth > screenWidth) {
                            $(this).css("width","95%");
                        }
                    });
                }
                
                function htmlspecialchars_decode (string, quote_style) {

  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined') {
    quote_style = 2;
  }
  string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
    // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
}
                
             

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
            






	                        
         $(document).ready(function() {
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            //$(document).ready(function() {
            $("a.open-child-browser").click(function() {
           // alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
            // });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initFancyPush,false);
                });
            

	                        
         $(document).ready(function() {
		// alert("1");
             document.addEventListener("deviceready",onDeviceReadyCheckNetwork,false);
         });
    
         function onDeviceReadyCheckNetwork() {
	//	alert("2");
        var networkState = navigator.network.connection.type;
if (networkState===Connection.UNKNOWN){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }

         }
     

             
                function resizeRssImages() {
                    var screenWidth = window.innerWidth;
                    $("img.rss-image").each(function (i,e) {
                        var imgWidth = $(this).width();
                console.log("RSS_WIDTH_SCREEN: " + screenWidth);
                console.log("RSS_WIDTH_IMAGE: " + imgWidth);
                        if(imgWidth > screenWidth) {
                            $(this).css("width","95%");
                        }
                    });
                }
                
                function htmlspecialchars_decode (string, quote_style) {

  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined') {
    quote_style = 2;
  }
  string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
    // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
}
                
             
   
                function  rssReader() {
                   // alert("rssReader");
                    

                    //RSS url
                    var RSS = "http://api.flickr.com/services/feeds/groups_pool.gne?id=&lang=en-us&format=rss_200";
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
                    //listen for detail links
                    $(".contentLink").live("click", function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
                    //alert("2");
                   //Listen for main page
                    $("#mainPage").live("pageinit", function() {
                                        //alert("3");
                                        //Set the title
                                        
                                        //alert("4");
                                        $.get(RSS, {}, function(res, code) {
                                              //alert("5");
                                              var xml = $(res);
                                              var items = xml.find("item");
                                              $.each(items, function(i, v) {
                                                     entry = {
                                                     title:$(v).find("title").text(), 
                                                     link:$(v).find("link").text(), 
                                                     description:$.trim($(v).find("description").text())
                                                     };
                                                     entries.push(entry);
                                                     });
                                              
											    var pulledTitle='';
												var pulledDescription='';
                                                     var halfLength=1;
													 var cleanTitle='';
													 var imageSource='';
											  
                                              //now draw the list
                                              var s = '';
                                        $.each(entries, function(i, v) {
											pulledTitle=v.title;
                                            halfLength=pulledTitle.length/2;
											cleanTitle=pulledTitle.slice(halfLength);
											pulledDescription=v.description;
											imageSource=pulledDescription.match(/http:\/\/farm(.+?)jpg/gi);   
                                                     s += '<li style="white-space:normal" class="news-item"><center><h2 style="white-space:normal">' + cleanTitle + '</h2></center><p style="white-space:normal"><img src="' + imageSource + '"></p></li>';
                                                     });
                                              $("#linksList").append(s);
                                            $("#linksList").listview("refresh");
                                              $(".news-item").each(function(pff,pfft){
                                                  $(this).removeClass("ui-btn-up-c").addClass("ui-body-c");
                                              });
                                              
                                              });
                                        });
                }
                
                

                

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
            
rssReader();

var __mainDiv;
 var __preLoaderHTML;
 var __opts;

 function __jQueryYouTubeChannelReceiveData(data,deviceType) {

     var cnt = 0;
     $.each(data.feed.entry, function(i, e) {
         if (cnt < __opts.numberToDisplay) {
             var vidUrl=e.link[0].href;
             vidUrl=(vidUrl.replace(/www.youtube.com/gi, "m.youtube.com"));
			 var videoId=(vidUrl.replace(/m.youtube.com/gi, "i.ytimg.com"));
			 videoId=(videoId.replace(/watch\?v=/gi, "vi/"));
			 videoId=(videoId.replace(/&feature=youtube_gdata/gi, ""));
			// alert(videoId);
             var parts = e.id.$t.split('/');
             //var videoId = parts[parts.length-1];
			 //alert(videoId);
 			 var out = '<li class="ui-li ui-li-static ui-body-c"><center><p class="ui-li-desc"><br><a href="' + 
             vidUrl + '" rel="external" class="open-plugin-videoplayer" data-vidurl="'+vidUrl+'"><img src="' + 
             videoId + '/2.jpg"/ width="240px" height="180px"></a></p><p class="ui-li-desc"><a href="' + 
             vidUrl + '" rel="external" class="open-plugin-videoplayer" data-vidurl="'+vidUrl+'">' + e.title.$t + '</a></p></center></li>';
			
			 
            
             if (!__opts.hideAuthor) {
                 out = out + 'Author: ' + e.author[0].name.$t + '';
             }
             out = out + '</center></p>';
             __mainDiv.append(out);
             cnt = cnt + 1;
         }
     });
            
    // Open in new tab?
    if (__opts.linksInNewWindow) {
        $(__mainDiv).find("li > a").attr("target", "_blank");
    }
    
    // Remove the preloader and show the content
    $(__preLoaderHTML).remove();
    __mainDiv.show();
}
                
(function($) {
    $.fn.youTubeChannel = function(options) {
        var videoDiv = $(this);

        $.fn.youTubeChannel.defaults = {
            userName: null,
            channel: "uploads", //options are favorites or uploads
            loadingText: "Loading...",
            numberToDisplay: 3,
            linksInNewWindow: true,
            hideAuthor: false
        }

        __opts = $.extend({}, $.fn.youTubeChannel.defaults, options);

        return this.each(function() {
            if (__opts.userName != null) {
                videoDiv.append("<ul id=\"linksList\" class=\"ui-listview ui-listview-inset ui-corner-all ui-shadow\" data-inset=\"true\" data-role=\"listview\"></ul>");
                __mainDiv = $("#linksList");
                __mainDiv.hide();

                __preLoaderHTML = $("<p class=\"loader\">" + 
                    __opts.loadingText + "</p>");
                videoDiv.append(__preLoaderHTML);

                // TODO: Error handling!
                $.ajax({
                 //   url: "http://gdata.youtube.com/feeds/base/users/" + __opts.userName + "/" + __opts.channel + "?alt=json",
						url: "http://gdata.youtube.com/feeds/api/videos?q=" + __opts.userName + "&max-results=10&v=2&alt=json",
                    cache: true,
                    dataType: 'jsonp',                    
                    success: __jQueryYouTubeChannelReceiveData
                });
            }
        });
    };
})(jQuery);

var __mainDiv;
 var __preLoaderHTML;
 var __opts;

 function __jQueryYouTubeChannelReceiveData(data,deviceType) {

     var cnt = 0;
     $.each(data.feed.entry, function(i, e) {
         if (cnt < __opts.numberToDisplay) {
             var vidUrl=e.link[0].href;
             vidUrl=(vidUrl.replace(/www.youtube.com/gi, "m.youtube.com"));
             var parts = e.id.$t.split('/');
             var videoId = parts[parts.length-1];
		
             var out = '<li class="ui-li ui-li-static ui-body-c"><center><p class="ui-li-desc"><br><a href="' + 
             vidUrl + '" rel="external" class="open-plugin-videoplayer" data-vidurl="'+vidUrl+'"><img src="http://i.ytimg.com/vi/' + 
             videoId + '/2.jpg"/ width="240px" height="180px"></a></p><p class="ui-li-desc"><a href="' + 
             vidUrl + '" rel="external" class="open-plugin-videoplayer" data-vidurl="'+vidUrl+'">' + e.title.$t + '</a></p></center></li>';
			 
		
             if (!__opts.hideAuthor) {
                 out = out + 'Author: ' + e.author[0].name.$t + '';
             }
             out = out + '</center></p>';
             __mainDiv.append(out);
             cnt = cnt + 1;
         }
     });
            
    // Open in new tab?
    if (__opts.linksInNewWindow) {
        $(__mainDiv).find("li > a").attr("target", "_blank");
    }
    
    // Remove the preloader and show the content
    $(__preLoaderHTML).remove();
    __mainDiv.show();
}
                
(function($) {
    $.fn.youTubeChannel = function(options) {
        var videoDiv = $(this);

        $.fn.youTubeChannel.defaults = {
            userName: null,
            channel: "uploads", //options are favorites or uploads
            loadingText: "Loading...",
            numberToDisplay: 3,
            linksInNewWindow: true,
            hideAuthor: false
        }

        __opts = $.extend({}, $.fn.youTubeChannel.defaults, options);

        return this.each(function() {
            if (__opts.userName != null) {
                videoDiv.append("<ul id=\"linksList\" class=\"ui-listview ui-listview-inset ui-corner-all ui-shadow\" data-inset=\"true\" data-role=\"listview\"></ul>");
                __mainDiv = $("#linksList");
                __mainDiv.hide();

                __preLoaderHTML = $("<p class=\"loader\">" + 
                    __opts.loadingText + "</p>");
                videoDiv.append(__preLoaderHTML);

                // TODO: Error handling!
                $.ajax({
                    url: "http://gdata.youtube.com/feeds/base/users/" + 
                        __opts.userName + "/" + __opts.channel + "?alt=json",
                    cache: true,
                    dataType: 'jsonp',                    
                    success: __jQueryYouTubeChannelReceiveData
                });
            }
        });
    };
})(jQuery);
