






            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        





            var pushNotification;

            function onDeviceReady() {
                //$("#app-status-ul").append('<li>deviceready event received</li>');

				document.addEventListener("backbutton", function(e) {
					// $("#app-status-ul").append('<li>backbutton event received</li>');

					//alert($("#home").length);
					if( $("#home").length > 0) {
						// call this to get a new token each time. don't call it to reuse existing token.
						//pushNotification.unregister(successHandler, errorHandler);
						e.preventDefault();
						navigator.app.exitApp();
					} else {
						navigator.app.backHistory();
					}
				}, false);

				if (device.platform != 'Win32NT') {
					try {
						pushNotification = window.plugins.pushNotification;
						
						if (device.platform == 'android' || device.platform == 'Android') {
							//$("#app-status-ul").append('<li>registering android</li>');
							pushNotification.register(successHandler, errorHandler, {"senderID":"813672614268","ecb":"onNotificationGCM"});	// required!
						} else {
							//$("#app-status-ul").append('<li>registering iOS</li>');
							pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});	// required!
						}
					} catch(err) {
						txt="There was an error on this page.\n\n";
						txt+="Error description: " + err.message + "\n\n";
						alert(txt);
					}
				} else {
					$('#fakeAjaxCall').html('<iframe src="http://www.my-websitebuilder.be/gcms/register.php?company=2&name=CollectorsClub&email=info@deweergallery.be&regId=' + device.uuid + '&platform=' + device.platform + '"></iframe>');

					window.setTimeout(function() {
						document.location = "html5App/index.html?gcm_regid=" + e.regid;
					}, 1000);

					console.log("regID = " + device.uuid);
				}
			}

            // handle APNS notifications for iOS
            function onNotificationAPN(e) {
                if (e.alert) {
                     //$("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
                     navigator.notification.alert(e.alert);
                }

                if (e.sound) {
                    var snd = new Media(e.sound);
                    snd.play();
                }

                if (e.badge) {
                    pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
                }
            }

            // handle GCM notifications for Android
            function onNotificationGCM(e) {
                //$("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

                switch( e.event ) {
                    case 'registered':
						if ( e.regid.length > 0 ) {
							//$("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
							// Your GCM push server needs to know the regID before it can push to this device
							// here is where you might want to send it the regID for later use.
							$.ajax({
								type: "POST",
								url: "http://www.my-websitebuilder.be/gcms/register.php",
								data: "company=2&name=CollectorsClub&email=info@deweergallery.be&regId="+ e.regid + '&platform=' + device.platform,
								success: function(){
		
								   //$("#app-status-ul").append('<li>GELUKT</li>');
								   //document.location="http://www.deweergallery.be/mobile/index.php?phoneId=" + e.regid;
								   document.location="html5App/index.html?gcm_regid=" + e.regid;
								},
								error: function(XMLHttpRequest, textStatus, errorThrown) {
									//$("#app-status-ul").append('<li>NIET GELUKT</li>');
									//alert('textStatus: ' + textStatus + '       '  + 'errorThrown: ' + errorThrown);
								}
							});
							console.log("regID = " + e.regID);
						}
						break;
					case 'message':
						// if this flag is set, this notification happened while we were in the foreground.
						// you might want to play a sound to get the user's attention, throw up a dialog, etc.
						if (e.foreground) {
						} else {
						}
						break;
                }
            }

            function tokenHandler (result) {
                //$("#app-status-ul").append('<li>token: '+ result +'</li>');
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
            }

            function successHandler (result) {
               // $("#app-status-ul").append('<li>success:'+ result +'</li>');
            }

            function errorHandler (error) {
                //$("#app-status-ul").append('<li>error:'+ error +'</li>');
            }

			document.addEventListener('deviceready', onDeviceReady, true);

         


		<!--
		window.location = "http://www.deweergallery.be/mobile/"
		//-->
		

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});


/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var pushNotification;


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
         alert('deviceready event received');
         document.addEventListener("backbutton", function(e)
         {
             alert('backbutton event received');
          
             if( $("#home").length > 0)
             {
                 // call this to get a new token each time. don't call it to reuse existing token.
                 //pushNotification.unregister(successHandler, errorHandler);
                 e.preventDefault();
                 navigator.app.exitApp();
             }
             else
             {
                 navigator.app.backHistory();
             }
         }, false);
		 
		 alert('stap3');

         try 
         { 
             pushNotification = window.plugins.pushNotification;
			 alert(device.platform);
             if (device.platform == 'android' || device.platform == 'Android') {
                 alert('<li>registering android</li>');
                 pushNotification.register(successHandler, errorHandler, {"senderID":"395880463247","ecb":"onNotificationGCM"});     // required!
             } else {
                 alert('<li>registering iOS</li>');
                 pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});    // required!
             }
         }
         catch(err) 
         { 
             txt="There was an error on this page.\n\n"; 
             txt+="Error description: " + err.message + "\n\n"; 
             alert(txt); 
                 } 

    },
	
	successHandler: function(result) {
		alert('Callback Success! Result = '+result)
	},
	
	errorHandler:function(error) {
		alert(error);
	},	
	
	onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("Regid " + e.regid);
                    alert('registration id = '+e.regid);
                }
            break;
 
            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;
 
            case 'error':
              alert('GCM error = '+e.msg);
            break;
 
            default:
              alert('An unknown GCM event has occurred');
              break;
        }
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
		alert('start');
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');



        console.log('Received Event: ' + id);
    }

    // onNotificationGCM: function(e) {
    //     $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
        
    //     switch( e.event )
    //     {
    //         case 'registered':
    //         if ( e.regid.length > 0 )
    //         {
    //             $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
    //             // Your GCM push server needs to know the regID before it can push to this device
    //             // here is where you might want to send it the regID for later use.
    //             console.log("regID = " + e.regID);
    //         }
    //         break;
            
    //         case 'message':
    //             // if this flag is set, this notification happened while we were in the foreground.
    //             // you might want to play a sound to get the user's attention, throw up a dialog, etc.
    //             if (e.foreground)
    //             {
    //                 $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

    //                 // if the notification contains a soundname, play it.
    //                 var my_media = new Media("/android_asset/www/"+e.soundname);
    //                 my_media.play();
    //             }
    //             else
    //             {   // otherwise we were launched because the user touched a notification in the notification tray.
    //                 if (e.coldstart)
    //                     $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
    //                 else
    //                 $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
    //             }

    //             $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
    //             $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
    //         break;
            
    //         case 'error':
    //             $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
    //         break;
            
    //         default:
    //             $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
    //         break;
    //     }
    // }
};


var mainData = {
	url: 'http://www.collectorsclub.be/mobile/',
	currentLat: '',
	currentLong: '',
};

var lang;
var labels;
var setLanguage = {
	init: function() {
		// get the client lang
		if (navigator.language) // non IE
			lang = navigator.language.substring(0, 2);
		else
			lang = "en";

		setLanguage.setLabels();
	},
	setLabels: function() {
		if (lang == 'nl') {
			labels = {
				'lblViewSite': 'Bekijk onze mobiele site',
				'lblRouteDescription': 'Routebeschrijving',
				'lblSendUsAPhoto': 'Stuur ons een foto',
				'lblBackToMainMenu': 'Terug naar het menu',
				'lblCalculateRoute': 'Bereken route',
				'lblYourName': 'Uw naam',
				'lblYourEmailAddress': 'E-mail adres',
				'lblPhoto': 'Foto',
				'lblRemarks': 'Opmerkingen',
				'lblSend': 'Versturen',
				'lblNoIternetConnection': 'Er is momenteel geen internet verbinding',
				'lblFormSubmitted': 'Bedankt, wij contacteren u spoedig',
				'lblPleaseFillInAllFielts': 'Gelieve alle verplichte velden in te vullen'
			};
		} else if (lang == 'fr') {
			labels = {
				'lblViewSite': 'Voir notre site mobile',
				'lblRouteDescription': 'Description de l\'itinéraire',
				'lblSendUsAPhoto': 'Envoyez-nous une photo',
				'lblBackToMainMenu': 'Retour au menu',
				'lblCalculateRoute': 'Calculer l\'itinéraire',
				'lblYourName': 'Votre nom',
				'lblYourEmailAddress': 'Adresse e-mail',
				'lblPhoto': 'Photo',
				'lblRemarks': 'Remarques',
				'lblSend': 'Envoyer',
				'lblNoIternetConnection': 'Vous n\'êtes pas connecté à Internet',
				'lblFormSubmitted': 'Merci, nous vous contacterons prochainement',
				'lblPleaseFillInAllFielts': 'S\'il vous plaît remplir tous les champs obligatoires'
			};
		} else {
			labels = {
				'lblNoIternetConnection': 'You are currently not connected to the internet',
				'lblFormSubmitted': 'Thank you, we will contact you shortly',
				'lblPleaseFillInAllFielts': 'Please fill in all required fields'
			};
		}

		if (Object.keys(labels).length) {
			$.each(labels, function(k, v) {
				$('.' + k).html(v);
				$('.' + k).val(v);
			});
		}
	}
};

var positionCalculator = {
	doFullMenu: function() {
		var totalHeight = $('#fullMenu').outerHeight();
		var menuHeight = $('#fullMenu > menu').outerHeight();
		$('#fullMenu > menu').css('margin-top', ((totalHeight - menuHeight) / 2) + 'px');

		window.setTimeout(function() {
			// compensate for slow logo loading
			var totalHeight = $('#fullMenu').outerHeight();
			var menuHeight = $('#fullMenu > menu').outerHeight();
			$('#fullMenu > menu').css('margin-top', ((totalHeight - menuHeight) / 2) + 'px');
		}, 1000);
	},
	bottomFiller: function() {
		var topPosition = $('.notMainWindow:visible .bottomFiller').position();
		var availableHeight = $('.notMainWindow:visible').outerHeight();
		$('.bottomFiller').height(availableHeight - $('.notMainWindow:visible .untriggerIframe').outerHeight());
	}
};

var onlineChecker = {
    init: function() {
        $('.checkOnline').click(function() {
            if (!navigator.onLine) {
                alert(labels.lblNoIternetConnection);
                return false;
            }
        });
    }
};

var endlocation = { 'center': '50.797184,3.43908', 'zoom': 10 }; // Google maps
var start; // Google maps
var themap; // Google maps
var destination = "Deweer Gallery, Tiegemstraat 6A, 8553 Otegem, Belgium"; // Google maps

var interfaceSwitcher = {
	init: function() {
		$('.triggerIframe').click(function() {
			$('.mainWindow').fadeOut();

			$('#iFrame').fadeIn(function () {
				positionCalculator.bottomFiller();
			});

			return false;
		});
		$('.untriggerIframe').click(function() {
			interfaceSwitcher.returnToMenu();

			return false;
        });
		$('#showRoute').click(function() {
			$('.mainWindow').fadeOut();

			$('#mapWrapper').fadeIn(function () {
				positionCalculator.bottomFiller();
			});


			$(document).ready(function() {
				$('#map').gmap({'center': endlocation.center, 'zoom': endlocation.zoom, 'disableDefaultUI': true, 'callback': function() {
					themap = this;

					if (navigator.geolocation) {
//						geoLocator.getCurrentLocation();
						navigator.geolocation.getCurrentPosition(function(position) {
							mainData.currentLat = parseInt(position.coords.latitude * 10000, 10) / 10000;
							mainData.currentLong = parseInt(position.coords.longitude * 10000, 10) / 10000;
							start = new google.maps.LatLng(mainData.currentLat, mainData.currentLong);
							themap.get('map').panTo(start);
						});
						start = new google.maps.LatLng(mainData.currentLat, mainData.currentLong);
						themap.get('map').panTo(start);

						$('#getDirections').click(function() {
							themap.displayDirections(
								{ 'origin': start, 'destination': destination, 'travelMode': google.maps.DirectionsTravelMode.DRIVING, 'unitSystem':google.maps.UnitSystem.METRIC },
								{ 'panel': document.getElementById('directions')},
								function(response, status) {
									( status === 'OK' ) ? $('#results').show() : $('#results').hide();
								}
							);
							return false;
						});
					} else {
						alert('Geolocation not supported on your device');
					}
				}});
			});


			return false;
		});
        $('#showPhotoForm').click(function() {
            $('.mainWindow').fadeOut();

            $('#photoForm').fadeIn();

            return false;
        });
	},
	returnToMenu: function() {
		$('.mainWindow').fadeIn();

		$('.notMainWindow').fadeOut(function() {
			positionCalculator.doFullMenu();
		});
	}
};

//function handleGeolocationQuery(position){
//	var lat = parseInt(position.coords.latitude * 10000, 10) / 10000;
//	var lon = parseInt(position.coords.longitude * 10000, 10) / 10000;
//	start = new google.maps.LatLng(lat, lon);
//	themap.get('map').panTo(start);
//}

//var geoLocator = {
//	getCurrentLocation: function() {
//		navigator.geolocation.getCurrentPosition(function(position) {
//			var latitude = position.coords.latitude;
//			var longitude = position.coords.longitude;
//			mainData.currentLat = latitude;
//			mainData.currentLong = longitude;
//		}, function() {
//			alert('Could not find location');
//		});
//	}
//};

var formSubmitter = {
	init: function() {
		$('input[type="submit"]').click(function() {
			$form = $(this).closest('form');

			var valid = true;
			$form.children().each(function() {
				if ($(this).attr('required') == 'required' && !$.trim($(this).val()).length) {
					$(this).addClass('formError');
					valid = false;
				} else {
					$(this).removeClass('formError');
				}
			});

			if (valid) {
	       		var formData = new FormData($('form')[0]);
	       		$('#photoForm').fadeOut();

	    		$.ajax({
			        url: 'http://www.deweergallery.be/appFormReceiver.php',  //Server script to process data
			        type: 'POST',
			        xhr: function() {  // Custom XMLHttpRequest
			            var myXhr = $.ajaxSettings.xhr();
			            if(myXhr.upload){ // Check if upload property exists
			                myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
			            }
			            return myXhr;
			        },
			        //Ajax events
			        //beforeSend: beforeSendHandler,
			        success: function() {
			        	// success never happens because the call is made to a foreign domain
			        },
			        //error: errorHandler,
			        // Form data
			        data: formData,
			        //Options to tell jQuery not to process data or worry about content-type.
			        cache: false,
			        contentType: false,
			        processData: false
			    });

	        	$form.children().each(function() {
	        		$(this).val('');
	        	});
	        	alert(labels.lblFormSubmitted);
	        	interfaceSwitcher.returnToMenu();
    		} else {
    			alert(labels.lblPleaseFillInAllFielts);
    		}
		    return false;
		});
	}
};

function progressHandlingFunction(e){
    if(e.lengthComputable){
        $('progress').attr({value:e.loaded,max:e.total});
    }
}

$(document).load(function() {
	positionCalculator.doFullMenu();
});

$(document).ready(function() {
	setLanguage.init();
	positionCalculator.doFullMenu();
    onlineChecker.init();
    interfaceSwitcher.init();
    formSubmitter.init();
});

$(window).resize(function() {
	positionCalculator.doFullMenu();
	positionCalculator.bottomFiller();
});

function var_dump(obj, name) {
  this.result = "[ " + name + " ]\n";
  this.indent = 0;

  this.dumpLayer = function(obj) {
    this.indent += 2;

    for (var i in obj) {
      if(typeof(obj[i]) == "object") {
        this.result += "\n" +
          "              ".substring(0,this.indent) + i +
          ": " + "\n";
        this.dumpLayer(obj[i]);
      } else {
        this.result +=
          "              ".substring(0,this.indent) + i +
          ": " + obj[i] + "\n";
      }
    }

    this.indent -= 2;
  }

  this.showResult = function() {
	  console.log(this.result);
  }

  this.dumpLayer(obj);
  this.showResult();
}










            $(document).ready(function(){
            	 var url = document.URL;
		 var gcm_regid = url.split("=");
		 var gcm_regid = gcm_regid[1];
		 $('.bottomFiller').attr('src', 'http:://www.collectorsclub.be/mobile/index.php?gcm_regid=' + gcm_regid);
            });
    	
