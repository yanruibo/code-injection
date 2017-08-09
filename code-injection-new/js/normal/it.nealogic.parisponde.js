


			function onBodyLoad()
			{		
				document.addEventListener("deviceready", onDeviceReady, false);
			}
			
			function onDeviceReady()
			{
				// do your thing!
				//navigator.notification.alert("Cordova is working")
		        checkConnection();
			}
		        
		    function checkConnection()
		    {
		        document.getElementById("text").innerHTML = "Connessione in corso...";
		        document.getElementById("button").style.display = "none";
		        
		        var img = new Image();
		        img.onload = connectionAvailable;
		        img.onerror = connectionUnavailable;
		        img.src = 'http://parisponde.questioncube.com/check.png?d=' + escape(Date()); 
		    }
		        
		    function connectionAvailable()
		    {
		        navigator.app.loadUrl("http://parisponde.questioncube.com/mobile/");
		    }
		        
		    function connectionUnavailable()
		    {
		        document.getElementById("text").innerHTML = "Connessione non disponibile!";
		        document.getElementById("button").style.display = "inline";
		    }
		
