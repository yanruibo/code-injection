



//            document.body.addEventListener("touchstart", function(event) {event.preventDefault();}, false);
            app.initialize();
        

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
		// navigator.splashscreen.show();
        console.log('device ready.');
        setTimeout(function() { 
			navigator.splashscreen.hide();
	        console.log('loading http://m.lealkudtuk.hu');
        	document.location = 'http://m.lealkudtuk.hu'; 
        }, 3000);
    }
};

