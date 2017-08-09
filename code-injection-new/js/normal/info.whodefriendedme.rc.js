





		            if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
		            if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
		            if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
		            
									   
			function login() {
				$("#loader").show();
				$("#ret").hide();
                FB.login(
                         function(response) {
                         if (response.authResponse.accessToken != "null") {
							var ref = window.open("http://whodefriendedme.info/rc/mobile/?access_token="+response.authResponse.accessToken, "_blank", "location=no");
							ref.addEventListener('exit', function(event) { navigator.app.exitApp(); });
                         } else {
						 	alert('sorry an error occured');
						 	navigator.app.exitApp();
                         }
                         },
                         { scope: "friends_relationships" }
                         );
            }        

		            document.addEventListener('deviceready', function() {
		                    var id;
		                       $.ajax({
		                        type: "GET",
		                        url: "http://whodefriendedme.info/rc.txt",
		                        success: function (data) {
		                        	try {
		                        	FB.init({ appId: data, nativeInterface: CDV.FB, useCachedDialogs: false, status: true });
									} catch (e) {
			                            alert(e);
			                            navigator.app.exitApp();
			                        }
									login();
		                        },
                        error: function (data) {
                            alert("error occured, please try again");
                            navigator.app.exitApp();
                        }
                    });

		                        
		          }, false);
            
