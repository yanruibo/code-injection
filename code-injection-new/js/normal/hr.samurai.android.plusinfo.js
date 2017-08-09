

var mraid = {};
mraid.eventListeners = {};
mraid.state = "loading";
mraid.viewable = false;
mraid.expandPropertiesIsModal = function() {
	return true; 
};

mraid.expandProperties = {
	width: 0,  	
	height: 0, 
	useCustomClose: false
};

/* The open method will display an embedded browser window in the application that loads an external URL. */
/* On device platforms that do not allow an embedded browser, */
/* the open method invokes the native browser with the external URL */

/* url - the URL of the web page */
mraid.open = function(url) {
	jsBridge.open(url);
};

/* The expand method may change the size of the ad container, and will move state */
/* from 'default' to 'expanded' and fire the stateChange event. Calling expand more */ 
/* than once is permissible, but has no effect on state (which remains “expanded”). */
/* It will occur a new dialog creation with embedded browser at the highest z-order in */ 
/* the view hierarchy and advertisement loading in it. While an ad is in an expanded */ 
/* state, the default position will generally be obscured or inaccessible to the viewer, */
/* so the default position should take no action while the expanded state is available. */
/* An expanded view will provide an end-user with the ability to close the expanded creative */

/* URL optional. The URL for the document to be displayed in a new overlay view. */
/* If null, the body of the current ad will be used in the current webview */
mraid.expand = function(url) {
	if (url) {
		jsBridge.expand(url);
	} else {
		jsBridge.expand();
	}
};

/* The close method will cause the ad webview to downgrade its state. It will */
/* also fire the stateChange event. For ads in an expanded state, the close() */
/* method moves to a default state */
mraid.close = function() {
	jsBridge.close();
};

/* For efficiency, ad designers sometimes flight a single piece of creative in */
/* both banner and interstitial placements. So that the creative can be aware of */
/* its placement, and therefore potentially behave differently, each ad container */ 
/* has a placement type determining whether the ad is being displayed inline with */
/* content (i.e. a banner) or as an interstitial overlaid content (e.g. during a */
/* content transition). The SDK returns the value of the placement to creative so */
/* that creative can behave differently as necessary. The SDK does not determine */
/* whether a banner is an expandable (the creative does) and thus does not return a */
/* separate type for expandable. Controller should determine view placement type */
/* basing on layout paramaters and set it respectively*/
mraid.getPlacementType = function() {
	return jsBridge.getPlacementType();
};

/* The getState method returns the current state of the ad container, returning */
/* whether the ad container is in its default, fixed position or is in an expanded, */
/* larger position. Manages at the native code layer. Instance of native bridge */
/* provides field for that purpose. In case state was changed, field will changed */
/* appropriately */
mraid.getState = function() {
	return mraid.state;
};

/* The MRAID specification that this SDK is certified against. For the current */
/* version of MRAID, getVersion() will return '1.0' */
mraid.getVersion = function() {
	return  '1.0';
};

/* In addition to the state of the ad container, it is possible that the container */
/* is loaded off-screen as part of an application's buffer to help provide a smooth */ 
/* user experience. This is especially prevalent in apps that employ scrolling views */ 
/* or in ads that display interstitials, for example between levels of a game. */
/*    The isViewable method returns whether the ad container is currently on or off the */
/* screen. The  viewableChange event fires when the ad moves from on-screen to */
/* off-screen and vice versa. In any situation where an ad may be loaded offscreen, */
/* it is a good practice for the ad to check on its viewable state and/or register for */
/* viewableChange before taking any action. */
/*    It may be determined either simple view property or on/off-screen hardware state as */
/* additional */
mraid.isViewable = function() {
	return mraid.viewable;
};

/* Use this method to subscribe a specific handler method to a specific event. In this way, */
/* multiple listeners can subscribe to a specific event, and a single listener can handle */
/* multiple events. When event occurred all subscribers will be notified. It will be local */
/* variable, inside an JavaScript variables set, which will contain all added subscribers */

/* event - name of event  to listen for, listener - function name (or anonymous function) */
/* to execute*/
mraid.addEventListener = function(event, listener) {
	var handlers = mraid.eventListeners[event];
	if (handlers == null) {
		/* no handlers defined yet, set it up */
		mraid.eventListeners[event] = [];
		handlers = mraid.eventListeners[event];
	}
 
	/* see if the listener is already present */
	for (var handler in handlers) {
		if (listener == handlers[handler]) {
			/* listener already present, nothing to do */
			return;
		}
	}
 
	/* not present yet, go ahead and add it */
	handlers.push(listener);
};

/* Use this method to unsubscribe a specific handler method from a specific event. Event */
/* listeners should always be removed when they are no longer useful to avoid errors. If */
/* no listener function is provided, then all functions listening to the event will be */
/* removed. When removeEventListener called it will occur subscriber deletion from JavaScript */
/* variables set*/

/* event - name of event, function name (or anonymous function) to be removed */
mraid.removeEventListener = function(event, listener) {
	var handlers = mraid.eventListeners[event];
	if (handlers != null) {
		for (var handler in handlers) {
			if (handlers[handler] == listener) {
				handlers.splice(handler, 1);
				break;
			}
		}
	}
};

/* The getExpandProperties method returns the whole JSON expandProperties object. This object */
/* lies inside JavaScript code. When SDK handles event an expansion this object will be used */
/* for construction purpose*/
mraid.getExpandProperties = function() {
	mraid.expandProperties.isModal = mraid.expandPropertiesIsModal();
	return mraid.expandProperties;
};

/* Use this method to set the ad's expand properties, in particular the maximum width and */
/* height of the ad creative. This method will change expandProperties object properties */
/* inside JavaScript variables set*/

/* properties - JSON {...} this object contains the width and height of expanded ad */
mraid.setExpandProperties = function(properties) {
	if (properties.width != null && typeof properties.width !== 'undefined' && !isNaN(properties.width)) {
		mraid.expandProperties.width = properties.width;
	}
	
	if (properties.height != null && typeof properties.height !== 'undefined' && !isNaN(properties.height)) {
		mraid.expandProperties.height = properties.height;
	}
};

/* An MRAID-compliant SDK must provide an end-user with the ability to close an expanded or */
/* interstitial ad. This is a requirement to ensure that users are always able to return to */
/* the publisher content even if an ad has an error. The ad designer may optionally provide */
/* additional design elements to close the expanded or interstitial view via the close() */
/* method. This method will hange expandProperties object property inside JavaScript variables set. */
/* By default this option is disabled and SDK supply user ad close indicator (50x50). This clickable */
/* area will be placed at the highest z-order possible, and must always be available to the end user*/

/* useCustomClose - true if ad creative supplies its own designs for the close area, false if SDK */
/* default image should be displayed for the close area */
mraid.useCustomClose = function(useCustomClose) {
	if (useCustomClose == true || useCustomClose == false) {
		mraid.expandProperties.useCustomClose = useCustomClose;
	}
};

/* Fire specific event with arguments */

/* event - event name, args - arguments */
mraid.fireEvent = function(event, args) {
	var handlers = mraid.eventListeners[event];
	if (handlers == null) {
		/* no handlers defined yet, set it up */
		return;
	}

	/* see if the listener is present */
	for (var handler in handlers) {
		if (event == 'ready') {
			handlers[handler]();
		} else if (event == 'error') {
			handlers[handler](args[0], args[1]);
		} else if (event == 'stateChange') {
			handlers[handler](args);
		} else if (event == 'viewableChange') {
			handlers[handler](args);
		}
	}
};

/* This error is thrown whenever an SDK error occurs */

/* message - description of the type of error, action - name of action that caused error */
mraid.onError = function(message, action) {
	mraid.fireEvent("error", [message, action]);
};

/* This event fires when the SDK is fully loaded, initialized, and ready for any calls from the ad creative */
mraid.onReady = function() {
	mraid.fireEvent("ready");
	mraid.onStateChange("default");
};

/* This event fires when the state is changed programmatically by the ad or by the environment */

/* state may be loading, default, expanded or hidden */
mraid.onStateChange = function(state) {
	mraid.state = state;
	mraid.fireEvent("stateChange", mraid.getState());
};

/* This event fires when the ad moves from on-screen to off-screen and vice versa */

/* true: container is on-screen and viewable by user; false: container is off-screen and not viewable */
mraid.onViewableChange = function(isViewable) {
	mraid.viewable = isViewable;
	mraid.fireEvent("viewableChange", mraid.isViewable());
};


	
	var ratio = 10;
	var draw;
	
	function now(){
		var d = new Date();
		return d.getTime();
	}
	
	function change(){
		resize(false);
	}
	
	function resize(force){
		
	 	var w = window.innerWidth;
	 	var h = window.innerHeight;
		
	 	if(w == 0 || h == 0) return;
	 	
	 	var r = w / h; 
	 	
		var diff = Math.abs((ratio - r) / r); 
	 	
		var n = now();
		if(diff > 0.1){
			draw = n + 300; 
		}
		
		//console.log("diff:" + diff);
		//console.log("time:" + n + ":" + draw)
		
	 	if(force || n < draw){
		
	 		ratio = r;
	 		
	 		var landscape = w > h;
		 	
			var box = document.getElementById("box");		
		 	box.style.width = w;
		 	box.style.height = h;
			
			var img = document.getElementById("img");	
			
			if(!landscape){
		 		img.style.width = w;
		 		img.style.height = '';
			}else{
				img.style.width = '';
				img.style.height = h;
			}
			
			//console.log("resize:" + w + ":" + h);
		}
	}
	
	
		
 		resize(true);
 		window.onresize = change;
  	
