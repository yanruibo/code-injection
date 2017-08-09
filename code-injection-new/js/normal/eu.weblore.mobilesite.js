



	    function onBodyLoad()
	    {
	        document.addEventListener("deviceready", onDeviceReady, false);
	    }
	    /* When this function is called, PhoneGap has been initialized and is ready to roll */
	    function onDeviceReady()
	    {
	      var properties = new gungnir();
	   	  var networkState = checkConnection();
		  /* load local files if there is not network connection */
          if (properties.useInternalSite && (networkState == Connection.CELL_3G || networkState == Connection.NONE)) {
        	  window.location="local/index.html";  
          } else {
	      	  window.location=properties.externalLocation;
          }
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
	          
	          return networkState;
	          
	      }
    






	function showPageLoader() {
		// show dialog
		$.mobile.loading( 'show', {
			text: 'Loading',
			textVisible: true,
			theme: 'c',
			html: ''
		});
	}
	
    /* When this function is called, Cordova has been initialized and is ready to roll */
    function onDeviceReady()
    {

      var properties = new gungnir();
   	  var networkState = checkConnection();
      
   	  if (properties.useInternalSite && (networkState == Connection.NONE)) {
    	  window.location="local/index.html";
      } else {
    	  
    	  if (networkState == Connection.NONE) {
    		  navigator.notification.alert('This app requires an internet connection');
    	  } else {
    	 	window.location=properties.externalLocation;
    	  }
      }   	  
   	  
   	  // hide loading dialog
   	  //$.mobile.loading( 'hide', {});

	  
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
          
          return networkState;
          
      }

	
	

function gungnir(){
	this.externalLocation="http://weblore.eu";
	this.useInternalSite=false;
}
