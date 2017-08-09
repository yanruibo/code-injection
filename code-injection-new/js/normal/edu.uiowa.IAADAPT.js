


    	$(document).bind("mobileinit", function() {
   			$.mobile.page.prototype.options.addBackBtn = true;
    	});
    



	    // Call onDeviceReady when PhoneGap is loaded.
	    //
	    // At this point, the document has loaded but phonegap.js has not.
	    // When PhoneGap is loaded and talking with the native device,
	    // it will call the event `deviceready`.
	    // 
	    document.addEventListener("deviceready", onDeviceReady, false);
	
	    // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
	    //
	    function onDeviceReady() {
	        // Register the event listener
	        document.addEventListener("backbutton", onBackKeyDown, false);
	    }
	
	    // Handle the back button
	    //
	    function onBackKeyDown() {
	    	window.history.back();
	    }
    







