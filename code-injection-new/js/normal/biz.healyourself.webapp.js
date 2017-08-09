





<!--
			google_ad_client = "ca-pub-3720076217964992";
			/* biz */
			google_ad_slot = "7674991663";
			google_ad_width = 234;
			google_ad_height = 60;
			//-->
			


        // Init Internet connection check when device is ready (and Cordova is loaded)
        document.addEventListener("deviceready", checkConnection, false);

        // Check for connection type on mobile devices, and calls showInternetAlert() 
        // if NONE or UNKNOWN connection is detected.
        // NOTE: This will cause an error on a non-mobile device since "connection" is undefined
        function checkConnection() {
            if (navigator.connection.type == Connection.UNKNOWN || navigator.connection.type == Connection.NONE) {
                showInternetAlert();
            } 
        }

        // Show an alert if the mobile-device has no active internet conection
        function showInternetAlert() {
          navigator.notification.alert(
            'Error: No active internet conection found on this device', // message
            closeApp,// callback - close app
            'Internet connectivity required', // title
            'Close'// buttonName
          );
        }
        
        // Close application
        function closeApp() {
          navigator.app.exitApp();
        }
    
