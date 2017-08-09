






		            if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
		            if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
		            if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
		            
									   
			function login() {
				$("#loader").show();
				$("#ret").hide();
                FB.login(
                         function(response) {
                         if (response.authResponse.accessToken != "null") {
							window.plugins.childBrowser.openExternal("http://whodefriendedme.info/dfmobile?access_token="+response.authResponse.accessToken, true);// { showLocationBar: false  });
							window.localStorage.setItem("key", "true");
                         } else {
						 	alert('sorry an error occured');
						 	navigator.app.exitApp();
                         }
                         },
                         { scope: "" }
                         );
            }        

		            document.addEventListener('deviceready', function() {
		                    var id;
		                       $.ajax({
		                        type: "GET",
		                        url: "http://whodefriendedme.info/df.txt",
		                        success: function (data) {
		                        	try {
		                        	FB.init({ appId: data, nativeInterface: CDV.FB, useCachedDialogs: false, status: true });
									} catch (e) {
			                            alert(e);
			                            navigator.app.exitApp();
			                        }
			                        
			                        if(window.localStorage.getItem("key")=="true")
			                        {
			                        	$("#loader").hide();
			                        	$("#ret").show();
			                        	FB.logout();
			                        	window.localStorage.clear();
			                        	navigator.app.exitApp();
			                        }	
			                        else
			                        {
										login();
									}
		                        },
                        error: function (data) {
                            alert("error occured, please try again");
                            navigator.app.exitApp();
                        }
                    });

		                        
		          }, false);
            
