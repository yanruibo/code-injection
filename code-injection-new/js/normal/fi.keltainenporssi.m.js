





		
			$( document ).on( "mobileinit", function() {

				$.mobile.linkBindingEnabled = false;
				$.mobile.hashListeningEnabled = false;
				$.mobile.pushStateEnabled = false;
				$.mobile.ajaxEnabled = false;
				$.mobile.defaultPageTransition = "none";
				$.mobile.buttonMarkup.hoverDelay = 0;
			});
			
			var API_URL = "http://m.keltainenporssi.fi/json.php",
				API_TIMEOUT = 30000,
				API_VERSION = 2,
				PAGE_TITLE = "Keltainen Pörssi",
				COUNTRY_CODE = "fi",
				DEFAULT_LANGUAGE_ID = "fi",
				CONFIG_EXPIRY_TIME = 3600;

		











			