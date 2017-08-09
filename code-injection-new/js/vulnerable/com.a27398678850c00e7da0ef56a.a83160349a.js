






	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share The Eagles Band", null, null, "https://play.google.com/store/apps/details?id=com.a27398678850c00e7da0ef56a.a83160349a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/7532617246',
                                 'adSize': admob.AD_SIZE.SMART_BANNER,
                                 'positionAtTop': false
		                     },
                             adMobCreateBannerSuccessCallback,
                             adMobCreateBannerFailureCallback
                         );
					}
		
				function killAdSuccessCallback() {
		
				}
		
				function killAdFailCallback() {
		
				}
		
					function adMobCreateBannerSuccessCallback() {
					    admob.requestAd(
                            {
                                'isTesting': false,
                                'extras': {
                                    'color_bg': 'FFFFFF',
                                    'color_bg_top': 'FFFFFF',
                                    'color_border': 'FFFFFF',
                                    'color_link': '000080',
                                    'color_text': '808080',
                                    'color_url': '008000'
                                },
                            },
                            admobRequestAdSuccessCallback,
                            admobRequestAdFailureCallback
                        );
					}
					function adMobCreateBannerFailureCallback() {
		
					}
		
                    function admobRequestAdSuccessCallback() {}
                    function admobRequestAdFailureCallback() {}
		
					

					    document.addEventListener("deviceready", function() {
		                    loadLeadBolt();
	                    }, false);
			
					    function loadLeadBolt() {
					
							AdController.loadAd("291766119");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("100620706");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"The Eagles Band", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


	    $(document).ready(function() {
	        $("div#additional-tab-content a").each(function(index) {
                var goUrl = $(this).attr("href");
					if (/^(f|ht)tps?:\/\//i.test(goUrl)) {
                        $(this).addClass("open-external-browser");
                        $(this).attr("data-gourl",goUrl);
					}
            });
        });
	

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=additionalTab1&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share The Eagles Band", null, null, "https://play.google.com/store/apps/details?id=com.a27398678850c00e7da0ef56a.a83160349a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/7532617246',
                                 'adSize': admob.AD_SIZE.SMART_BANNER,
                                 'positionAtTop': false
		                     },
                             adMobCreateBannerSuccessCallback,
                             adMobCreateBannerFailureCallback
                         );
					}
		
				function killAdSuccessCallback() {
		
				}
		
				function killAdFailCallback() {
		
				}
		
					function adMobCreateBannerSuccessCallback() {
					    admob.requestAd(
                            {
                                'isTesting': false,
                                'extras': {
                                    'color_bg': 'FFFFFF',
                                    'color_bg_top': 'FFFFFF',
                                    'color_border': 'FFFFFF',
                                    'color_link': '000080',
                                    'color_text': '808080',
                                    'color_url': '008000'
                                },
                            },
                            admobRequestAdSuccessCallback,
                            admobRequestAdFailureCallback
                        );
					}
					function adMobCreateBannerFailureCallback() {
		
					}
		
                    function admobRequestAdSuccessCallback() {}
                    function admobRequestAdFailureCallback() {}
		
					

					    document.addEventListener("deviceready", function() {
		                    loadLeadBolt();
	                    }, false);
			
					    function loadLeadBolt() {
					
							AdController.loadAd("291766119");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("100620706");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"The Eagles Band", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


	     $(document).ready(function() {
	        $("div.modLinks a").each(function(index) {
                var goUrl = $(this).attr("href");
					if (/^(f|ht)tps?:\/\//i.test(goUrl)) {
                        $(this).addClass("open-external-browser");
                        $(this).attr("data-gourl",goUrl);
					}
            });
			             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 //window.plugins.childBrowser.openExternal(goUrl);
					window.open(goUrl, "_blank", "location=yes")
                 return false;
            // });
             });
		
		
        });
	

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered3&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered3&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered3&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered3&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered3&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered3&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered3&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered3&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share The Eagles Band", null, null, "https://play.google.com/store/apps/details?id=com.a27398678850c00e7da0ef56a.a83160349a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/7532617246',
                                 'adSize': admob.AD_SIZE.SMART_BANNER,
                                 'positionAtTop': false
		                     },
                             adMobCreateBannerSuccessCallback,
                             adMobCreateBannerFailureCallback
                         );
					}
		
				function killAdSuccessCallback() {
		
				}
		
				function killAdFailCallback() {
		
				}
		
					function adMobCreateBannerSuccessCallback() {
					    admob.requestAd(
                            {
                                'isTesting': false,
                                'extras': {
                                    'color_bg': 'FFFFFF',
                                    'color_bg_top': 'FFFFFF',
                                    'color_border': 'FFFFFF',
                                    'color_link': '000080',
                                    'color_text': '808080',
                                    'color_url': '008000'
                                },
                            },
                            admobRequestAdSuccessCallback,
                            admobRequestAdFailureCallback
                        );
					}
					function adMobCreateBannerFailureCallback() {
		
					}
		
                    function admobRequestAdSuccessCallback() {}
                    function admobRequestAdFailureCallback() {}
		
					

					    document.addEventListener("deviceready", function() {
		                    loadLeadBolt();
	                    }, false);
			
					    function loadLeadBolt() {
					
							AdController.loadAd("291766119");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("100620706");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"The Eagles Band", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});



	            
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyVideoPlayer,false);
         });
		
         function onDeviceReadyVideoPlayer() {
            $("a.open-plugin-videoplayer").click(function() {
                 var vidGoUrl = $(this).attr("data-vidurl");
	             VideoPlayer.play(vidGoUrl);
                 return false;
             });
         }
     

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            

        $(document).ready(function() {
                          $('#youtubevideos').youTubeChannel({
                                                             userName: 'The Eagles',
                                                             channel: "uploads",
                                                             hideAuthor: true,
                                                             numberToDisplay: 30,
                                                             linksInNewWindow: true
                                                             //other options
                                                             //loadingText: "Loading...",
                                                             },"android");
                          });
        
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=youtubeKeywords&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});





                
                var redirectUrl = null;
                var ref = null;
                
                function getUrlVars() {
                    var vars = {};
                    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                                                             vars[key] = value;
                                                             });
                    return vars;
                }
                
                function onBodyLoad()
                {
                    document.addEventListener("deviceready",onDeviceReady,false);
                }

                function onDeviceReady() {
                                        
                    var goUrl = getUrlVars()["goUrl"];
		    var browser = getUrlVars()["browser"];
                    var where = "_blank";
		    goUrl=decodeURIComponent(goUrl);
                    var actualRedirect = 'index.html';
					//alert(goUrl);   
                    if(getUrlVars()['redirectUrl'] != '') {
                        redirectUrl = getUrlVars()['redirectUrl'];
                    }

                    if (browser=='external'){
                        where = "_system";
                    }
                    if(redirectUrl != null) {
                        actualRedirect = redirectUrl;
                    }


                    if (browser=='external'){
                        window.location.href = actualRedirect;
                        window.open(goUrl, where, 'location=yes');
                    } else {
                        var ref = window.open(goUrl, where, 'location=yes');
                        ref.addEventListener('exit', function() { window.location.href = actualRedirect; });
                    }

                }
                







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share The Eagles Band", null, null, "https://play.google.com/store/apps/details?id=com.a27398678850c00e7da0ef56a.a83160349a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/7532617246',
                                 'adSize': admob.AD_SIZE.SMART_BANNER,
                                 'positionAtTop': false
		                     },
                             adMobCreateBannerSuccessCallback,
                             adMobCreateBannerFailureCallback
                         );
					}
		
				function killAdSuccessCallback() {
		
				}
		
				function killAdFailCallback() {
		
				}
		
					function adMobCreateBannerSuccessCallback() {
					    admob.requestAd(
                            {
                                'isTesting': false,
                                'extras': {
                                    'color_bg': 'FFFFFF',
                                    'color_bg_top': 'FFFFFF',
                                    'color_border': 'FFFFFF',
                                    'color_link': '000080',
                                    'color_text': '808080',
                                    'color_url': '008000'
                                },
                            },
                            admobRequestAdSuccessCallback,
                            admobRequestAdFailureCallback
                        );
					}
					function adMobCreateBannerFailureCallback() {
		
					}
		
                    function admobRequestAdSuccessCallback() {}
                    function admobRequestAdFailureCallback() {}
		
					

					    document.addEventListener("deviceready", function() {
		                    loadLeadBolt();
	                    }, false);
			
					    function loadLeadBolt() {
					
							AdController.loadAd("291766119");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("100620706");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"The Eagles Band", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


	     $(document).ready(function() {
	        $("div.modLinks a").each(function(index) {
                var goUrl = $(this).attr("href");
					if (/^(f|ht)tps?:\/\//i.test(goUrl)) {
                        $(this).addClass("open-external-browser");
                        $(this).attr("data-gourl",goUrl);
					}
            });
			             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 //window.plugins.childBrowser.openExternal(goUrl);
					window.open(goUrl, "_blank", "location=yes")
                 return false;
            // });
             });
		
		
        });
	

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered5&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered5&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered5&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered5&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered5&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered5&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share The Eagles Band", null, null, "https://play.google.com/store/apps/details?id=com.a27398678850c00e7da0ef56a.a83160349a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/7532617246',
                                 'adSize': admob.AD_SIZE.SMART_BANNER,
                                 'positionAtTop': false
		                     },
                             adMobCreateBannerSuccessCallback,
                             adMobCreateBannerFailureCallback
                         );
					}
		
				function killAdSuccessCallback() {
		
				}
		
				function killAdFailCallback() {
		
				}
		
					function adMobCreateBannerSuccessCallback() {
					    admob.requestAd(
                            {
                                'isTesting': false,
                                'extras': {
                                    'color_bg': 'FFFFFF',
                                    'color_bg_top': 'FFFFFF',
                                    'color_border': 'FFFFFF',
                                    'color_link': '000080',
                                    'color_text': '808080',
                                    'color_url': '008000'
                                },
                            },
                            admobRequestAdSuccessCallback,
                            admobRequestAdFailureCallback
                        );
					}
					function adMobCreateBannerFailureCallback() {
		
					}
		
                    function admobRequestAdSuccessCallback() {}
                    function admobRequestAdFailureCallback() {}
		
					

					    document.addEventListener("deviceready", function() {
		                    loadLeadBolt();
	                    }, false);
			
					    function loadLeadBolt() {
					
							AdController.loadAd("291766119");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("100620706");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"The Eagles Band", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


		
   	        var scanButton;
        	var resultSpan;
		
   	 $(document).ready(function() {
   	    scanButton = document.getElementById("scan-button");
        resultSpan = document.getElementById("scan-result");
   	                document.addEventListener("deviceready", onDeviceReadyBarcodeScanner, false);
    });
		
    // Cordova is loaded and it is now safe to make calls Cordova methods
    //
    function onDeviceReadyBarcodeScanner() {
        // Now safe to use the Cordova API
   	                console.log("BARCODE SCANNER ONDEVICEREADY");
    scanButton.addEventListener("click", clickScan, false);
    }
		
		
		
    function clickScan() {
	    //var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        cordova.plugins.barcodeScanner.scan(scannerSuccess, scannerFailure);
	}
		
		
//------------------------------------------------------------------------------
function scannerSuccess(result) {
   	if(result.cancelled == false) {
   	    $("#touch-to-scan").hide();
   	    $("#post-scan-container").show();
   	    var returnedText = result.text;
   	    var scannedFormat = result.format;
   	    resultSpan.innerHTML = replaceURLWithHTML(returnedText);
		
   	    $("#post-scan").click(function() {
            $("#post-scan-container").hide();
   	        $("#touch-to-scan").show();
   	        resultSpan.innerHTML = "";
   	        return false;
        });
   	}
}
		
//------------------------------------------------------------------------------
function scannerFailure(message) {
    //console.log("scannerFailure: message: " + message)
    resultSpan.innerText = "failed to Scan: " + message;
}
		
function replaceURLWithHTML(text) {
    var expUrl = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var expImg = /(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:jpg|gif|png))(?:\?([^#]*))?(?:#(.*))?/ig;
		
    if(text.match(expUrl)) {
        //is URL format
        if(text.match(expImg)) {
            //is link to image
            return text.replace(expUrl,'<img src="$1">');
        } else { 
            window.open(text, "_blank", "location=yes")
            return text.replace(expUrl,'<a href="$1" class="open-external-browser" data-gourl="$1">$1</a>');
         
        }
    } else {
        return text;
    }
}
		
		
    

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=barcodescanner&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share The Eagles Band", null, null, "https://play.google.com/store/apps/details?id=com.a27398678850c00e7da0ef56a.a83160349a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/7532617246',
                                 'adSize': admob.AD_SIZE.SMART_BANNER,
                                 'positionAtTop': false
		                     },
                             adMobCreateBannerSuccessCallback,
                             adMobCreateBannerFailureCallback
                         );
					}
		
				function killAdSuccessCallback() {
		
				}
		
				function killAdFailCallback() {
		
				}
		
					function adMobCreateBannerSuccessCallback() {
					    admob.requestAd(
                            {
                                'isTesting': false,
                                'extras': {
                                    'color_bg': 'FFFFFF',
                                    'color_bg_top': 'FFFFFF',
                                    'color_border': 'FFFFFF',
                                    'color_link': '000080',
                                    'color_text': '808080',
                                    'color_url': '008000'
                                },
                            },
                            admobRequestAdSuccessCallback,
                            admobRequestAdFailureCallback
                        );
					}
					function adMobCreateBannerFailureCallback() {
		
					}
		
                    function admobRequestAdSuccessCallback() {}
                    function admobRequestAdFailureCallback() {}
		
					

					    document.addEventListener("deviceready", function() {
		                    loadLeadBolt();
	                    }, false);
			
					    function loadLeadBolt() {
					
							AdController.loadAd("291766119");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("100620706");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"The Eagles Band", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


	     $(document).ready(function() {
	        $("div.modLinks a").each(function(index) {
                var goUrl = $(this).attr("href");
					if (/^(f|ht)tps?:\/\//i.test(goUrl)) {
                        $(this).addClass("open-external-browser");
                        $(this).attr("data-gourl",goUrl);
					}
            });
			             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 //window.plugins.childBrowser.openExternal(goUrl);
					window.open(goUrl, "_blank", "location=yes")
                 return false;
            // });
             });
		
		
        });
	

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share The Eagles Band", null, null, "https://play.google.com/store/apps/details?id=com.a27398678850c00e7da0ef56a.a83160349a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/7532617246',
                                 'adSize': admob.AD_SIZE.SMART_BANNER,
                                 'positionAtTop': false
		                     },
                             adMobCreateBannerSuccessCallback,
                             adMobCreateBannerFailureCallback
                         );
					}
		
				function killAdSuccessCallback() {
		
				}
		
				function killAdFailCallback() {
		
				}
		
					function adMobCreateBannerSuccessCallback() {
					    admob.requestAd(
                            {
                                'isTesting': false,
                                'extras': {
                                    'color_bg': 'FFFFFF',
                                    'color_bg_top': 'FFFFFF',
                                    'color_border': 'FFFFFF',
                                    'color_link': '000080',
                                    'color_text': '808080',
                                    'color_url': '008000'
                                },
                            },
                            admobRequestAdSuccessCallback,
                            admobRequestAdFailureCallback
                        );
					}
					function adMobCreateBannerFailureCallback() {
		
					}
		
                    function admobRequestAdSuccessCallback() {}
                    function admobRequestAdFailureCallback() {}
		
					

					    document.addEventListener("deviceready", function() {
		                    loadLeadBolt();
	                    }, false);
			
					    function loadLeadBolt() {
					
							AdController.loadAd("291766119");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("100620706");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"The Eagles Band", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


	    	
    $(document).ready(function() {
    document.body.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                }, false);/*
if(screen.height>550){
        $("body").css("background","url(\"index.png\")");
        $("body").css("backgroundSize","100% 100%");
        $(".ui-page").css("background","url(\"index.png\")");
        $(".ui-page").css("backgroundImage","url(\"index.png\")");
        $(".ui-page").css("backgroundSize","100% 100%");
        }
        else{
        $("body").css("background","url(\"index.png\")");
        $("body").css("backgroundSize","100% 100%");
        $(".ui-page").css("background","url(\"index.png\")");
        $(".ui-page").css("backgroundImage","url(\"index.png\")");
        $(".ui-page").css("backgroundSize","100% 100%");
        }*/
    });
    

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=index&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share The Eagles Band", null, null, "https://play.google.com/store/apps/details?id=com.a27398678850c00e7da0ef56a.a83160349a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/7532617246',
                                 'adSize': admob.AD_SIZE.SMART_BANNER,
                                 'positionAtTop': false
		                     },
                             adMobCreateBannerSuccessCallback,
                             adMobCreateBannerFailureCallback
                         );
					}
		
				function killAdSuccessCallback() {
		
				}
		
				function killAdFailCallback() {
		
				}
		
					function adMobCreateBannerSuccessCallback() {
					    admob.requestAd(
                            {
                                'isTesting': false,
                                'extras': {
                                    'color_bg': 'FFFFFF',
                                    'color_bg_top': 'FFFFFF',
                                    'color_border': 'FFFFFF',
                                    'color_link': '000080',
                                    'color_text': '808080',
                                    'color_url': '008000'
                                },
                            },
                            admobRequestAdSuccessCallback,
                            admobRequestAdFailureCallback
                        );
					}
					function adMobCreateBannerFailureCallback() {
		
					}
		
                    function admobRequestAdSuccessCallback() {}
                    function admobRequestAdFailureCallback() {}
		
					

					    document.addEventListener("deviceready", function() {
		                    loadLeadBolt();
	                    }, false);
			
					    function loadLeadBolt() {
					
							AdController.loadAd("291766119");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("100620706");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"The Eagles Band", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


	     $(document).ready(function() {
	        $("div.modLinks a").each(function(index) {
                var goUrl = $(this).attr("href");
					if (/^(f|ht)tps?:\/\//i.test(goUrl)) {
                        $(this).addClass("open-external-browser");
                        $(this).attr("data-gourl",goUrl);
					}
            });
			             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 //window.plugins.childBrowser.openExternal(goUrl);
					window.open(goUrl, "_blank", "location=yes")
                 return false;
            // });
             });
		
		
        });
	

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered4&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered4&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered4&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered4&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered4&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered4&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered4&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered4&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered4&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered4&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered4&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered4&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered4&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share The Eagles Band", null, null, "https://play.google.com/store/apps/details?id=com.a27398678850c00e7da0ef56a.a83160349a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/7532617246',
                                 'adSize': admob.AD_SIZE.SMART_BANNER,
                                 'positionAtTop': false
		                     },
                             adMobCreateBannerSuccessCallback,
                             adMobCreateBannerFailureCallback
                         );
					}
		
				function killAdSuccessCallback() {
		
				}
		
				function killAdFailCallback() {
		
				}
		
					function adMobCreateBannerSuccessCallback() {
					    admob.requestAd(
                            {
                                'isTesting': false,
                                'extras': {
                                    'color_bg': 'FFFFFF',
                                    'color_bg_top': 'FFFFFF',
                                    'color_border': 'FFFFFF',
                                    'color_link': '000080',
                                    'color_text': '808080',
                                    'color_url': '008000'
                                },
                            },
                            admobRequestAdSuccessCallback,
                            admobRequestAdFailureCallback
                        );
					}
					function adMobCreateBannerFailureCallback() {
		
					}
		
                    function admobRequestAdSuccessCallback() {}
                    function admobRequestAdFailureCallback() {}
		
					

					    document.addEventListener("deviceready", function() {
		                    loadLeadBolt();
	                    }, false);
			
					    function loadLeadBolt() {
					
							AdController.loadAd("291766119");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("100620706");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"The Eagles Band", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share The Eagles Band", null, null, "https://play.google.com/store/apps/details?id=com.a27398678850c00e7da0ef56a.a83160349a");
    			    return false;
                });
            });
    	







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share The Eagles Band", null, null, "https://play.google.com/store/apps/details?id=com.a27398678850c00e7da0ef56a.a83160349a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/7532617246',
                                 'adSize': admob.AD_SIZE.SMART_BANNER,
                                 'positionAtTop': false
		                     },
                             adMobCreateBannerSuccessCallback,
                             adMobCreateBannerFailureCallback
                         );
					}
		
				function killAdSuccessCallback() {
		
				}
		
				function killAdFailCallback() {
		
				}
		
					function adMobCreateBannerSuccessCallback() {
					    admob.requestAd(
                            {
                                'isTesting': false,
                                'extras': {
                                    'color_bg': 'FFFFFF',
                                    'color_bg_top': 'FFFFFF',
                                    'color_border': 'FFFFFF',
                                    'color_link': '000080',
                                    'color_text': '808080',
                                    'color_url': '008000'
                                },
                            },
                            admobRequestAdSuccessCallback,
                            admobRequestAdFailureCallback
                        );
					}
					function adMobCreateBannerFailureCallback() {
		
					}
		
                    function admobRequestAdSuccessCallback() {}
                    function admobRequestAdFailureCallback() {}
		
					

					    document.addEventListener("deviceready", function() {
		                    loadLeadBolt();
	                    }, false);
			
					    function loadLeadBolt() {
					
							AdController.loadAd("291766119");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("100620706");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"The Eagles Band", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


	     $(document).ready(function() {
	        $("div.modLinks a").each(function(index) {
                var goUrl = $(this).attr("href");
					if (/^(f|ht)tps?:\/\//i.test(goUrl)) {
                        $(this).addClass("open-external-browser");
                        $(this).attr("data-gourl",goUrl);
					}
            });
			             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 //window.plugins.childBrowser.openExternal(goUrl);
					window.open(goUrl, "_blank", "location=yes")
                 return false;
            // });
             });
		
		
        });
	

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered2&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered2&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered2&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered2&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered2&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=tiered2&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share The Eagles Band", null, null, "https://play.google.com/store/apps/details?id=com.a27398678850c00e7da0ef56a.a83160349a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/7532617246',
                                 'adSize': admob.AD_SIZE.SMART_BANNER,
                                 'positionAtTop': false
		                     },
                             adMobCreateBannerSuccessCallback,
                             adMobCreateBannerFailureCallback
                         );
					}
		
				function killAdSuccessCallback() {
		
				}
		
				function killAdFailCallback() {
		
				}
		
					function adMobCreateBannerSuccessCallback() {
					    admob.requestAd(
                            {
                                'isTesting': false,
                                'extras': {
                                    'color_bg': 'FFFFFF',
                                    'color_bg_top': 'FFFFFF',
                                    'color_border': 'FFFFFF',
                                    'color_link': '000080',
                                    'color_text': '808080',
                                    'color_url': '008000'
                                },
                            },
                            admobRequestAdSuccessCallback,
                            admobRequestAdFailureCallback
                        );
					}
					function adMobCreateBannerFailureCallback() {
		
					}
		
                    function admobRequestAdSuccessCallback() {}
                    function admobRequestAdFailureCallback() {}
		
					

					    document.addEventListener("deviceready", function() {
		                    loadLeadBolt();
	                    }, false);
			
					    function loadLeadBolt() {
					
							AdController.loadAd("291766119");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("100620706");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"The Eagles Band", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share The Eagles Band", null, null, "https://play.google.com/store/apps/details?id=com.a27398678850c00e7da0ef56a.a83160349a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/7532617246',
                                 'adSize': admob.AD_SIZE.SMART_BANNER,
                                 'positionAtTop': false
		                     },
                             adMobCreateBannerSuccessCallback,
                             adMobCreateBannerFailureCallback
                         );
					}
		
				function killAdSuccessCallback() {
		
				}
		
				function killAdFailCallback() {
		
				}
		
					function adMobCreateBannerSuccessCallback() {
					    admob.requestAd(
                            {
                                'isTesting': false,
                                'extras': {
                                    'color_bg': 'FFFFFF',
                                    'color_bg_top': 'FFFFFF',
                                    'color_border': 'FFFFFF',
                                    'color_link': '000080',
                                    'color_text': '808080',
                                    'color_url': '008000'
                                },
                            },
                            admobRequestAdSuccessCallback,
                            admobRequestAdFailureCallback
                        );
					}
					function adMobCreateBannerFailureCallback() {
		
					}
		
                    function admobRequestAdSuccessCallback() {}
                    function admobRequestAdFailureCallback() {}
		
					

					    document.addEventListener("deviceready", function() {
		                    loadLeadBolt();
	                    }, false);
			
					    function loadLeadBolt() {
					
							AdController.loadAd("291766119");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("100620706");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"The Eagles Band", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


		
        $(document).ready(function() {
            $.mobile.loading( "show", {
                text: "Loading, please wait...",
                textVisible: true
            });
		
				var zRssOptions = {
				                       header: false,
                                       moretext: "Read More",
                                       snippet: false,
                                       ssl: true,
                                       moreclass: "open-external-browser",
	                              };
		
				$("#rss-content").rssfeed("https://api.flickr.com/services/feeds/photos_public.gne?tags=eagles+band&format=rss2", zRssOptions,
	                               function() {
	                                   $.mobile.loading("hide");
						               resizeRssImages();
	                               }
	                       );
        });
		
                

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=photoGalleryKeywords&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share The Eagles Band", null, null, "https://play.google.com/store/apps/details?id=com.a27398678850c00e7da0ef56a.a83160349a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/7532617246',
                                 'adSize': admob.AD_SIZE.SMART_BANNER,
                                 'positionAtTop': false
		                     },
                             adMobCreateBannerSuccessCallback,
                             adMobCreateBannerFailureCallback
                         );
					}
		
				function killAdSuccessCallback() {
		
				}
		
				function killAdFailCallback() {
		
				}
		
					function adMobCreateBannerSuccessCallback() {
					    admob.requestAd(
                            {
                                'isTesting': false,
                                'extras': {
                                    'color_bg': 'FFFFFF',
                                    'color_bg_top': 'FFFFFF',
                                    'color_border': 'FFFFFF',
                                    'color_link': '000080',
                                    'color_text': '808080',
                                    'color_url': '008000'
                                },
                            },
                            admobRequestAdSuccessCallback,
                            admobRequestAdFailureCallback
                        );
					}
					function adMobCreateBannerFailureCallback() {
		
					}
		
                    function admobRequestAdSuccessCallback() {}
                    function admobRequestAdFailureCallback() {}
		
					

					    document.addEventListener("deviceready", function() {
		                    loadLeadBolt();
	                    }, false);
			
					    function loadLeadBolt() {
					
							AdController.loadAd("291766119");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("100620706");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"The Eagles Band", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});








	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share The Eagles Band", null, null, "https://play.google.com/store/apps/details?id=com.a27398678850c00e7da0ef56a.a83160349a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/7532617246',
                                 'adSize': admob.AD_SIZE.SMART_BANNER,
                                 'positionAtTop': false
		                     },
                             adMobCreateBannerSuccessCallback,
                             adMobCreateBannerFailureCallback
                         );
					}
		
				function killAdSuccessCallback() {
		
				}
		
				function killAdFailCallback() {
		
				}
		
					function adMobCreateBannerSuccessCallback() {
					    admob.requestAd(
                            {
                                'isTesting': false,
                                'extras': {
                                    'color_bg': 'FFFFFF',
                                    'color_bg_top': 'FFFFFF',
                                    'color_border': 'FFFFFF',
                                    'color_link': '000080',
                                    'color_text': '808080',
                                    'color_url': '008000'
                                },
                            },
                            admobRequestAdSuccessCallback,
                            admobRequestAdFailureCallback
                        );
					}
					function adMobCreateBannerFailureCallback() {
		
					}
		
                    function admobRequestAdSuccessCallback() {}
                    function admobRequestAdFailureCallback() {}
		
					

					    document.addEventListener("deviceready", function() {
		                    loadLeadBolt();
	                    }, false);
			
					    function loadLeadBolt() {
					
							AdController.loadAd("291766119");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("100620706");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"The Eagles Band", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


		
//-----------------error messages and default text(for foreign language integration)-----------------//
var errorPoorAcc = "Could not get a reliable location. Please try again.";
var errorUnsupportedFeature = "Sorry, your device does not appear to support this feature.";
var confirmOverwrite = "Are you sure? This will delete any previously saved location.";
var notifyPositionSaved = "Location saved successfully.";
var notifyGettingPos = "Getting your position...";
var allowReducedAccMessage = "Could not get a reliable position. Would you like to allow reduced accuracy?"
var noGPSMessage = "Could not activate GPS. Please check that GPS is enabled on your device."
var disclaimerMessage = "Accuracy may vary and will depend on GPS signal.";
		
var btnTextSaveLocation = "Save Location";
var btnTextFindCar = "Find Your Car";
var btnTextCancel = "Cancel Search";
		
//-------------------------------------creating global variables-------------------------------------//
		
//HTML elements
var windowHeight = null,
	windowWidth = null;
	gpsLoading = null,
	btnSaveLocation = null,
	btnFindCar = null;
		
//position data
var watchId = null,
	compassId = null,
	curLat = null, curLong = null, curAcc = 20000, curHeading = null,
	bearing = 0;
var geoSuccess = null;
var compassMode = false;
var allowReducedAcc = false;
var targetAcc = 30;
var gettingInput = false;
		
//asynchroness calls
var accuracyInterval = null, headingInterval = null;
		
		
//canvas elements
var arrow = null,
	shadow = null,
	ctx = null,
	drawInterval = null;
		
		
		
//-----------------------------------------Initialize data-----------------------------------------//
//$(document).ready(function() {
function initializeData(){
	//$("#btnSave").text("Save Location");
	//$("#btnSearch").text(btnTextFindCar);
	//alert($("#btnSave").text());
	$("#btnSave").click(function(){saveLocation();});
	$("#btnSearch").click(function(){startSearch();});
	$("#btnCancel").click(function(){startSearch();});
		
	$("#divCancel").hide();
	$("#divSearch").hide();
	$("splash_image").show();
		
	//alert("windowH: " + window.innerHeight + ". ScreenH: " + screen.height + "\nwindowW: " + window.innerWidth + " ScreenW: " + screen.width);
		
		
	//setting HTML elements
	windowHeight = window.innerHeight;
	windowWidth = window.innerWidth;
	gpsLoading = document.getElementById("gps_loading");
	btnSaveLocation = document.getElementById("btnSave");
	btnFindCar = document.getElementById("btnSearch");
		
	document.getElementById("perspective").style.height = Math.round(windowHeight * .66);
	gpsLoading.style.height = Math.round(windowHeight * .66);
	gpsLoading.innerHTML = "<img src='images/car_locator_loading.gif' style='position: relative; max-width: " + Math.round(windowWidth / 2) + "px; max-Height: " + Math.round(windowHeight / 2) + "px; width: 50%; vertical-align: middle;'><br />" + notifyGettingPos;
	document.getElementById("canvas").style.width = windowWidth;
	document.getElementById("canvas").style.height = Math.round(windowHeight * .66);
	document.getElementById("compass").width = windowWidth;
	document.getElementById("compass").height = Math.round(windowHeight * .66);
	//$("#canvas").style.height = Math.round(windowHeight * .66);
		
		
		
	if (localStorage.getItem("acc") != null){
		$("#divSearch").show();
	}
		
	if (localStorage.getItem("disclaimer") == null || localStorage.getItem("disclaimer") != 1){
		//alert(disclaimerMessage + ", Car Locator");
		
		document.addEventListener("deviceready", function(){
			navigator.notification.alert(disclaimerMessage, false, "Car Locator", "OK");
			localStorage.setItem("disclaimer", 1);
		}, false);
	}
		
		
	//loadCanvas();
}//);
		
//----------------------------------------GPS Functionality----------------------------------------//
		
//Priming location functions
function activateLocation(){
	var options = {enableHighAccuracy:true, frequency: 500, maximumAge: 500, timeout: 15000};
	watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);
}
		
function deactivateLocation(){
	navigator.geolocation.clearWatch(watchId);
}
		
//GPS Success Callback
function onSuccess(position){
	curLat = position.coords.latitude;
	curLong = position.coords.longitude;
	curAcc = position.coords.accuracy;
	geoSuccess = true;
}
		
//GPS Error Callback
function onError(error){
	geoSuccess = false;
	$("#splash_image").show();
	gpsLoading.style.visibility = "hidden";
	//alert("Error code: " + error.code + "\nMessage: " + error.message);
}
		
//-------------------------------------Compass Functionality-------------------------------------//
function onCompassSuccess(heading){
	//alert(heading.magneticHeading);
	curHeading = heading.magneticHeading;
}
		
function activateCompass(){
	var options = {frequency: 250};
	//navigator.compass.getCurrentHeading(onCompassSuccess, onError);
	compassId = navigator.compass.watchHeading(onCompassSuccess, onError, options);
}
		
function deactivateCompass(){
	navigator.compass.clearWatch(compassId);
}
		
//get heading and update view
function checkHeading(){
	var R = 6371; //radius of Earth in km
	var lat2 = Number(localStorage.lat);
	var lon2 = Number(localStorage.long);
	var lat1 = curLat;
	var lon1 = curLong;
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180;
	lat1 = lat1 * Math.PI / 180;
	lat2 = lat2 * Math.PI / 180;
		
		
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c * 1000;
		
	document.getElementById("distance").innerHTML = Math.round(d) + " meters away, +/- " + Math.round(curAcc); //update view
		
	var y = Math.sin(dLon) * Math.cos(lat2);
	var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
	bearing = (Math.atan2(y, x) / Math.PI * 180) - curHeading;
		
	if (bearing < 0){ //keeping rotation in range
		bearing += 360;
	}
}
		
//-----------------------------------Save the current location-----------------------------------//
function saveLocation(){
	activateLocation();
		
		
		
	$("#divSave").hide();
	$("#divSearch").hide();
	//$("#divCancel").show();
		
	//btnSaveLocation.disabled = true;
	//btnFindCar.disabled = true;
		
	if(localStorage.getItem("acc") != null)
		navigator.notification.confirm(confirmOverwrite, onConfirmSave, "Car Locator", "OK,Cancel");
	else
		onConfirmSave(1);
		
	//var confirmSave = confirm(confirmOverwrite);
		
	function onConfirmSave(button){
			var confirmSave;
			if (button == 1)
				confirmSave = true;
			else
				confirmSave = false;
			if (confirmSave){
				var startTime = (new Date()).getTime();
				gpsLoading.style.visibility = "visible";
				$("#splash_image").hide();
				accuracyInterval = setInterval(function(){checkAccuracy(startTime)}, 600); //allows GPS to zero-in
			}
			else if (!confirmSave){
				deactivateLocation();
				$("#divSave").show();
				$("#divSearch").show();
				$("#divCancel").hide();
		
		
				//btnSaveLocation.disabled = false;
				//btnFindCar.disabled = false;
			}
	}
}
		
//verify accuracy and save
function checkAccuracy(start){
		
	if (geoSuccess == false){
		navigator.notification.alert(noGPSMessage, false, "Car Locator", "OK");
		clearInterval(accuracyInterval);
		$("#splash_image").show();
		gpsLoading.style.visibility = "hidden";
		btnSaveLocation.disabled = false;
		
		$("#divSave").show();
		$("#divCancel").hide();
		
		if (localStorage.getItem("acc") != null){
		
			$("#btnSearch").hide();
			//btnFindCar.disabled = false;
		}
	}
	else if (curAcc < targetAcc){
		allowReducedAcc = false;
		targetAcc = 30;
		clearInterval(accuracyInterval);
		storeLocation();
		$("#splash_image").show();
		gpsLoading.style.visibility = "hidden";
		
		$("#divSave").show();
		$("#divSearch").show();
		$("#divCancel").hide();
		
		//btnSaveLocation.disabled = false;
		//btnFindCar.disabled = false;
		deactivateLocation();
		if (localStorage.getItem("acc") != null){
		
			$("#divSearch").show();
			//btnFindCar.disabled = false;
		}
		//alert(notifyPositionSaved);
		navigator.notification.alert(notifyPositionSaved, false, "Car Locator", "OK");
	}
	else if ((new Date()).getTime() > start + 14000){
		
		if (!allowReducedAcc && !gettingInput){
			//allowReducedAcc = confirm(allowReducedAccMessage);
			gettingInput = true;
			navigator.notification.confirm(allowReducedAccMessage, function(button){
				if (button == 1)
					allowReducedAcc = true;
				else
					allowReducedAcc = false;
		
				if (allowReducedAcc){
					targetAcc = 100;
					var startTime = (new Date()).getTime();
					clearInterval(accuracyInterval);
					accuracyInterval = setInterval(function(){checkAccuracy(startTime)}, 600);
				}
				else if (!allowReducedAcc){
					clearInterval(accuracyInterval);
					deactivateLocation();
		
					$("#divSave").show();
					$("#divCancel").hide();
		
					//btnSaveLocation.disabled = false;
					if (localStorage.getItem("acc") != null){
		
						$("#divSearch").show();
						//btnFindCar.disabled = false;
					}
					$("#splash_image").show();
					gpsLoading.style.visibility = "hidden";
					//alert(errorPoorAcc);
					navigator.notification.alert(errorPoorAcc, false, "Car Locator", "OK");
				}
				gettingInput = false;
			}, "Car Locator", "OK,Cancel");
		}
		else if (allowReducedAcc && !gettingInput){
			allowReducedAcc = false;
			targetAcc = 30;
			clearInterval(accuracyInterval);
			deactivateLocation();
		
			$("#divSave").show();
			$("#divCancel").hide();
		
			//btnSaveLocation.disabled = false;
			if (localStorage.getItem("acc") != null){
		
				$("#divSearch").show();
				//btnFindCar.disabled = false;
			}
			$("#splash_image").show();
			gpsLoading.style.visibility = "hidden";
			//alert(errorPoorAcc);
			navigator.notification.alert(errorPoorAcc, false, "Car Locator", "OK");
		}
	}
}
		
		
//---------------------------------------Drawing functionality---------------------------------------//
function loadCanvas()
{
	// Grab the compass element
	var canvas = document.getElementById("compass");
		
	// Canvas supported?
	if(canvas.getContext("2d"))
	{
		ctx = canvas.getContext("2d");
		
		// Load the arrow image
		shadow = new Image();
		shadow.src = "images/shadow.png";
		arrow = new Image();
  		arrow.src = "images/car_locator_arrow2.png";
 		arrow.onload = imgLoaded;
		
	}
  	else
  	{
  		navigator.notification.alert(errorUnsupportedFeature, false, "Car Locator", "OK");
  	}
		
}
		
function imgLoaded()
{
	// Image loaded event complete.  Start the timer
	drawInterval = setInterval(draw, 250);
}
		
function clearCanvas()
{
	 // clear canvas
	ctx.clearRect(0, 0, document.getElementById("compass").width, document.getElementById("compass").height);
}
		
function draw()
{
		
	var width = document.getElementById("compass").width;
	var height = document.getElementById("compass").height;
	var arrowSize;
		
	if (width > height){
		arrowSize = Math.round(height / 1.5);
	}
	else {
		arrowSize = Math.round(width / 1.5);
	}
	//alert(arrowSize);
		
		
	clearCanvas();
	ctx.drawImage(shadow, Math.round((width / 2) - (arrowSize / 2)), Math.round((height / 2) + (arrowSize / 2)), arrowSize, Math.round(arrowSize / 10));
		
	// Save the current drawing state
	ctx.save();
		
	// Now move across and down half the
	ctx.translate(Math.round(width / 2), Math.round(height / 2));
		
	// Rotate around this point
	ctx.rotate(bearing * (Math.PI / 180));
		
	// Draw the image back and up
	ctx.drawImage(arrow, -(Math.round(arrowSize / 2)), -(Math.round(arrowSize / 2)), arrowSize, arrowSize);
		
	// Restore the previous drawing state
	ctx.restore();
}
		
//----------------------------------------Find Car Functions----------------------------------------//
function startSearch(){
		
	//alert(window.innerHeight);
	if (!compassMode){
		//btnFindCar.innerHTML = btnTextCancel;
		compassMode = true;
		activateLocation();
		activateCompass();
		
  		$("#splash_image").hide();
		
		$("#divSave").hide();
		$("#divSearch").hide();
		$("#divCancel").show();
		
		//btnSaveLocation.disabled = true;
		document.getElementById("canvas").style.visibility = "visible";
		headingInterval = setInterval(function(){checkHeading()}, 300);
		loadCanvas();
		
	}
	else if (compassMode){
		//btnFindCar.innerHTML = btnTextFindCar;
		compassMode = false;
		deactivateLocation();
		clearInterval(headingInterval);
		clearInterval(drawInterval);
		clearCanvas();
		document.getElementById("distance").innerHTML = "";
		
  		$("#splash_image").show();
		
		$("#divSave").show();
		$("#divSearch").show();
		$("#divCancel").hide();
		
		//btnSaveLocation.disabled = false;
		//btnSaveLocation.style.visibility = "visible";
		document.getElementById("canvas").style.visibility = "hidden";
		deactivateCompass();
	}
}
		
//---------------------------------------Storage Functionality---------------------------------------//
//store position data to device
function storeLocation(){
	localStorage.setItem("lat", Number(curLat));
	localStorage.setItem("long", Number(curLong));
	localStorage.setItem("acc", Number(curAcc));
}
		
//read position data from device
function getStorage(){
	deactivateLocation();
	//alert(curLat + ", " + curLong + ", " + curAcc);
		
	//alert("Lat: " + String(localStorage.getItem("lat")) +
	//	"\nLong: " + String(localStorage.getItem("long")) +
	//	"\nAcc: " + String(localStorage.getItem("acc")));
}
		
		
		
		


                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=carLocator&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});







	        //hack to add padding to module pages, except index/more
	    	$(document).ready(function() {
	            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			    if(filename != "index.html" && filename != "more.html") {
	    		    $("div.ui-content").each(function() {
                        var dr = $(this).attr("data-role");
                        if(dr == "content") {
                            $(this).addClass("additonal-padding");
	    		        }
                });
	    		}
	        });
	    

	                  $(document).ready(function() {
                          document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
                      });
				
                      function onDeviceReadyChildBrowser() {
                          $("a.open-child-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
                              //window.plugins.childBrowser.openExternal(goUrl);
				              window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share The Eagles Band", null, null, "https://play.google.com/store/apps/details?id=com.a27398678850c00e7da0ef56a.a83160349a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/7532617246',
                                 'adSize': admob.AD_SIZE.SMART_BANNER,
                                 'positionAtTop': false
		                     },
                             adMobCreateBannerSuccessCallback,
                             adMobCreateBannerFailureCallback
                         );
					}
		
				function killAdSuccessCallback() {
		
				}
		
				function killAdFailCallback() {
		
				}
		
					function adMobCreateBannerSuccessCallback() {
					    admob.requestAd(
                            {
                                'isTesting': false,
                                'extras': {
                                    'color_bg': 'FFFFFF',
                                    'color_bg_top': 'FFFFFF',
                                    'color_border': 'FFFFFF',
                                    'color_link': '000080',
                                    'color_text': '808080',
                                    'color_url': '008000'
                                },
                            },
                            admobRequestAdSuccessCallback,
                            admobRequestAdFailureCallback
                        );
					}
					function adMobCreateBannerFailureCallback() {
		
					}
		
                    function admobRequestAdSuccessCallback() {}
                    function admobRequestAdFailureCallback() {}
		
					

					    document.addEventListener("deviceready", function() {
		                    loadLeadBolt();
	                    }, false);
			
					    function loadLeadBolt() {
					
							AdController.loadAd("291766119");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("100620706");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"The Eagles Band", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


		
        $(document).ready(function() {
            $.mobile.loading( "show", {
                text: "Loading, please wait...",
                textVisible: true
            });
		
				var zRssOptions = {
				                       header: false,
                                       moretext: "Read More",
                                       snippet: false,
                                       ssl: true,
                                       moreclass: "open-external-browser",
	                              };
		
				$("#rss-content").rssfeed("https://news.google.com/news?q=Don+Henley&output=rss&num=100", zRssOptions,
	                               function() {
	                                   $.mobile.loading("hide");
						               resizeRssImages();
	                               }
	                       );
        });
		
                

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=news&appId=27398678850c00e7da0ef56.83160349\"/>");}).fail(function( jqxhr, textStatus, error ) {});



function resizeRssImages() {
                    //var screenWidth = window.innerWidth;
				   $("img.fit-to-size").each(function (i,e) {
                        $(e).css("max-width","95%");
                    });
                }
		
		function nl2br (str, is_xhtml) {   
                    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
                    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
                }
                
                function htmlspecialchars_decode (string, quote_style) {

  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined') {
    quote_style = 2;
  }
  string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
    // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
  }
  if (!noquotes) {
    string = string.replace(/&quot;/g, '"');
  }
  // Put this in last place to avoid escape being double-decoded
  string = string.replace(/&amp;/g, '&');

  return string;
}
    function onDeviceReadyCheckNetwork() {
                       var networkState = navigator.network.connection.type;
                       if (networkState===Connection.UNKNOWN){
                           alert ("Warning: it appears that you are not connected to the Internet. The content/offers shown may be out of date.");
                       } else if (networkState===Connection.NONE){
                           alert ("Warning: it appears that you are not connected to the Internet. The content/offers shown may be out of date.");
                       }
                   }
				
	         function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}
				



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
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};



// Generated by CoffeeScript 1.3.3
(function() {
  var Instafeed, root;

  Instafeed = (function() {

    function Instafeed(params, context) {
      var option, value;
      this.options = {
        target: 'instafeed',
        get: 'popular',
        resolution: 'thumbnail',
        sortBy: 'none',
        links: true,
        mock: false,
        useHttp: false
      };
      if (typeof params === 'object') {
        for (option in params) {
          value = params[option];
          this.options[option] = value;
        }
      }
      this.context = context != null ? context : this;
      this.unique = this._genKey();
    }

    Instafeed.prototype.hasNext = function() {
      return typeof this.context.nextUrl === 'string' && this.context.nextUrl.length > 0;
    };

    Instafeed.prototype.next = function() {
      if (!this.hasNext()) {
        return false;
      }
      return this.run(this.context.nextUrl);
    };

    Instafeed.prototype.run = function(url) {
      var header, instanceName, script;
      if (typeof this.options.clientId !== 'string') {
        if (typeof this.options.accessToken !== 'string') {
          throw new Error("Missing clientId or accessToken.");
        }
      }
      if (typeof this.options.accessToken !== 'string') {
        if (typeof this.options.clientId !== 'string') {
          throw new Error("Missing clientId or accessToken.");
        }
      }
      if ((this.options.before != null) && typeof this.options.before === 'function') {
        this.options.before.call(this);
      }
      if (typeof document !== "undefined" && document !== null) {
        script = document.createElement('script');
        script.id = 'instafeed-fetcher';
        script.src = url || this._buildUrl();
        header = document.getElementsByTagName('head');
        header[0].appendChild(script);
        instanceName = "instafeedCache" + this.unique;
        window[instanceName] = new Instafeed(this.options, this);
        window[instanceName].unique = this.unique;
      }
      return true;
    };

    Instafeed.prototype.parse = function(response) {
      var anchor, fragment, header, htmlString, image, imageString, imageUrl, images, img, imgUrl, instanceName, node, reverse, sortSettings, tmpEl, _i, _j, _k, _len, _len1, _len2, _ref;
      if (typeof response !== 'object') {
        if ((this.options.error != null) && typeof this.options.error === 'function') {
          this.options.error.call(this, 'Invalid JSON data');
          return false;
        } else {
          throw new Error('Invalid JSON response');
        }
      }
      if (response.meta.code !== 200) {
        if ((this.options.error != null) && typeof this.options.error === 'function') {
          this.options.error.call(this, response.meta.error_message);
          return false;
        } else {
          throw new Error("Error from Instagram: " + response.meta.error_message);
        }
      }
      if (response.data.length === 0) {
        if ((this.options.error != null) && typeof this.options.error === 'function') {
          this.options.error.call(this, 'No images were returned from Instagram');
          return false;
        } else {
          throw new Error('No images were returned from Instagram');
        }
      }
      if ((this.options.success != null) && typeof this.options.success === 'function') {
        this.options.success.call(this, response);
      }
      this.context.nextUrl = '';
      if (response.pagination != null) {
        this.context.nextUrl = response.pagination.next_url;
      }
      if (this.options.sortBy !== 'none') {
        if (this.options.sortBy === 'random') {
          sortSettings = ['', 'random'];
        } else {
          sortSettings = this.options.sortBy.split('-');
        }
        reverse = sortSettings[0] === 'least' ? true : false;
        switch (sortSettings[1]) {
          case 'random':
            response.data.sort(function() {
              return 0.5 - Math.random();
            });
            break;
          case 'recent':
            response.data = this._sortBy(response.data, 'created_time', reverse);
            break;
          case 'liked':
            response.data = this._sortBy(response.data, 'likes.count', reverse);
            break;
          case 'commented':
            response.data = this._sortBy(response.data, 'comments.count', reverse);
            break;
          default:
            throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.");
        }
      }
      if ((typeof document !== "undefined" && document !== null) && this.options.mock === false) {
        images = response.data;
        if (this.options.limit != null) {
          if (images.length > this.options.limit) {
            images = images.slice(0, this.options.limit + 1 || 9e9);
          }
        }
        fragment = document.createDocumentFragment();
        if ((this.options.filter != null) && typeof this.options.filter === 'function') {
          images = this._filter(images, this.options.filter);
        }
        if ((this.options.template != null) && typeof this.options.template === 'string') {
          htmlString = '';
          imageString = '';
          imgUrl = '';
          tmpEl = document.createElement('div');
          for (_i = 0, _len = images.length; _i < _len; _i++) {
            image = images[_i];
            imageUrl = image.images[this.options.resolution].url;
            if (!this.options.useHttp) {
              imageUrl = imageUrl.replace('http://', '//');
            }
            imageString = this._makeTemplate(this.options.template, {
              model: image,
              id: image.id,
              link: image.link,
              image: imageUrl,
              caption: this._getObjectProperty(image, 'caption.text'),
              likes: image.likes.count,
              comments: image.comments.count,
              location: this._getObjectProperty(image, 'location.name')
            });
            htmlString += imageString;
          }
          tmpEl.innerHTML = htmlString;
          _ref = [].slice.call(tmpEl.childNodes);
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            node = _ref[_j];
            fragment.appendChild(node);
          }
        } else {
          for (_k = 0, _len2 = images.length; _k < _len2; _k++) {
            image = images[_k];
            img = document.createElement('img');
            imageUrl = image.images[this.options.resolution].url;
            if (!this.options.useHttp) {
              imageUrl = imageUrl.replace('http://', '//');
            }
            img.src = imageUrl;
            if (this.options.links === true) {
              anchor = document.createElement('a');
              anchor.href = image.link;
              anchor.appendChild(img);
              fragment.appendChild(anchor);
            } else {
              fragment.appendChild(img);
            }
          }
        }
        document.getElementById(this.options.target).appendChild(fragment);
        header = document.getElementsByTagName('head')[0];
        header.removeChild(document.getElementById('instafeed-fetcher'));
        instanceName = "instafeedCache" + this.unique;
        window[instanceName] = void 0;
        try {
          delete window[instanceName];
        } catch (e) {

        }
      }
      if ((this.options.after != null) && typeof this.options.after === 'function') {
        this.options.after.call(this);
      }
      return true;
    };

    Instafeed.prototype._buildUrl = function() {
      var base, endpoint, final;
      base = "https://api.instagram.com/v1";
      switch (this.options.get) {
        case "popular":
          endpoint = "media/popular";
          break;
        case "tagged":
          if (typeof this.options.tagName !== 'string') {
            throw new Error("No tag name specified. Use the 'tagName' option.");
          }
          endpoint = "tags/" + this.options.tagName + "/media/recent";
          break;
        case "location":
          if (typeof this.options.locationId !== 'number') {
            throw new Error("No location specified. Use the 'locationId' option.");
          }
          endpoint = "locations/" + this.options.locationId + "/media/recent";
          break;
        case "user":
          if (typeof this.options.userId !== 'number') {
            throw new Error("No user specified. Use the 'userId' option.");
          }
          if (typeof this.options.accessToken !== 'string') {
            throw new Error("No access token. Use the 'accessToken' option.");
          }
          endpoint = "users/" + this.options.userId + "/media/recent";
          break;
        default:
          throw new Error("Invalid option for get: '" + this.options.get + "'.");
      }
      final = "" + base + "/" + endpoint;
      if (this.options.accessToken != null) {
        final += "?access_token=" + this.options.accessToken;
      } else {
        final += "?client_id=" + this.options.clientId;
      }
      if (this.options.limit != null) {
        final += "&count=" + this.options.limit;
      }
      final += "&callback=instafeedCache" + this.unique + ".parse";
      return final;
    };

    Instafeed.prototype._genKey = function() {
      var S4;
      S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return "" + (S4()) + (S4()) + (S4()) + (S4());
    };

    Instafeed.prototype._makeTemplate = function(template, data) {
      var output, pattern, varName, varValue, _ref;
      pattern = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/;
      output = template;
      while (pattern.test(output)) {
        varName = output.match(pattern)[1];
        varValue = (_ref = this._getObjectProperty(data, varName)) != null ? _ref : '';
        output = output.replace(pattern, "" + varValue);
      }
      return output;
    };

    Instafeed.prototype._getObjectProperty = function(object, property) {
      var piece, pieces;
      property = property.replace(/\[(\w+)\]/g, '.$1');
      pieces = property.split('.');
      while (pieces.length) {
        piece = pieces.shift();
        if ((object != null) && piece in object) {
          object = object[piece];
        } else {
          return null;
        }
      }
      return object;
    };

    Instafeed.prototype._sortBy = function(data, property, reverse) {
      var sorter;
      sorter = function(a, b) {
        var valueA, valueB;
        valueA = this._getObjectProperty(a, property);
        valueB = this._getObjectProperty(b, property);
        if (reverse) {
          if (valueA > valueB) {
            return 1;
          } else {
            return -1;
          }
        }
        if (valueA < valueB) {
          return 1;
        } else {
          return -1;
        }
      };
      data.sort(sorter.bind(this));
      return data;
    };

    Instafeed.prototype._filter = function(images, filter) {
      var filteredImages, image, _fn, _i, _len;
      filteredImages = [];
      _fn = function(image) {
        if (filter(image)) {
          return filteredImages.push(image);
        }
      };
      for (_i = 0, _len = images.length; _i < _len; _i++) {
        image = images[_i];
        _fn(image);
      }
      return filteredImages;
    };

    return Instafeed;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.Instafeed = Instafeed;

}).call(this);



    	var upsellPopupId = 0;
function onDeviceReadyUpsell() {
	var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
    if(filename != "index.html") {
	    return;
	}
    var db = getUpsellDb();
    db.transaction(initUpsellDb, errorUpsellDb, successUpsellDb);
    db = getUpsellDb();
    db.transaction(
        function(transaction) {
            transaction.executeSql("SELECT * FROM POPUPS", [], checkPopulateUpsell, errorUpsellDb);
        }
    );
		
    db.transaction(
        function(transaction) {
            transaction.executeSql("SELECT * FROM NEXT_POPUP", [], checkUpsellPopup, errorUpsellDb);
        }
    );
}
		
function getUpsellDb() {
    var dbConn = window.sqlitePlugin.openDatabase("upselldb", "1.0", "Rate Upsell Popup", 2000000);
    return dbConn;
}
		
function initUpsellDb(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS POPUPS (id,seconds_until_next,is_set,displayed)");
    tx.executeSql("CREATE TABLE IF NOT EXISTS NEXT_POPUP (id,min_date)");
}
		
function checkPopulateUpsell(tx, results) {
    if (results.rows.length == 0) {
        		
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('1','86400','1','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('2','604800','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('3','1209600','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('4','2592000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('5','5184000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('6','7776000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('7','10368000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('8','12960000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('9','15552000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('10','18144000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('11','21600000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('12','25920000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('13','31104000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('14','34560000','0','0')");
        var nextTime = Math.round(new Date().getTime() / 1000) + 86400;
        tx.executeSql("INSERT INTO NEXT_POPUP (id,min_date) VALUES('1','"+nextTime+"')");
    }
}
		
function checkUpsellPopup(tx, results) {
    if (results.rows.length == 0) {
        return false;
    }
		
    var nowTime = Math.round(new Date().getTime() / 1000);
    var popupRow = results.rows.item(0);
    var popupTime = parseInt(popupRow.min_date);
    upsellPopupId = popupRow.id; //global upsellPopupId
		
    if(parseInt(popupTime) == 0 && parseInt(upsellPopupId) == 0) {
        return false;
    }
		
    if(nowTime >= popupTime) {
        navigator.notification.confirm("Download The Rock & Roll Video Channels App Today!", onUpsellConfirm, "Check Out The Rock & Roll Video Channels App!", "Go,Later,Never");
        var db = getUpsellDb();
        db.transaction(
            function(transaction) {
                transaction.executeSql("UPDATE POPUPS SET displayed=1 WHERE id='"+upsellPopupId+"'", [], successUpsellDb, errorUpsellDb);
            }
        );
    }
}
		
function onUpsellConfirm(buttonIndex) {
    var btn = parseInt(buttonIndex);
    var setAllDone = false;
		
    switch(btn) {
        case 1:
            //open page
            setAllDone = true;window.open("https://play.google.com/store/apps/details?id=com.a151303745052c8b7a9d1dbc2a.a42872155a&hl=en", "_system", "location=yes");
            break;
        case 2:
            //grab next upsell
            initSetNextUpsell();
            break;
        case 3:
            //do nothing. Set ignore all
            setAllDone = true;
            break;
    }
		
    if(setAllDone == true) {
        setAllUpsellPopupsViewed();
    }
}
		
function setAllUpsellPopupsViewed() {
    var db = getUpsellDb();
    db.transaction(
        function(transaction) {
            transaction.executeSql("UPDATE POPUPS SET is_set=1,displayed=1", [], successUpsellDb, errorUpsellDb);
        }
    );
    db.transaction(
        function(transaction) {
            transaction.executeSql("UPDATE NEXT_POPUP SET id=0,min_date=0", [], successUpsellDb, errorUpsellDb);
        }
    );
}
		
function initSetNextUpsell() {
    var db = getUpsellDb();
    db.transaction(
        function(transaction) {
            transaction.executeSql("UPDATE POPUPS SET is_set=1 WHERE id='"+upsellPopupId+"'", [], successUpsellDb, errorUpsellDb);
        }
    );
    db.transaction(
        function(transaction) {
            transaction.executeSql("SELECT * FROM POPUPS WHERE is_set=0 AND displayed=0 ORDER BY id ASC LIMIT 1", [], setNextUpsell, errorUpsellDb);
        }
    );
}
		
function setNextUpsell(tx, results) {
    if (results.rows.length == 0) {
        setAllUpsellPopupsViewed();
        return false;
    }
		
    var nowTime = Math.round(new Date().getTime() / 1000);
    var popupRow = results.rows.item(0);
    var nextTime = nowTime + parseInt(popupRow.seconds_until_next);
    var nextId = popupRow.id;
		
    var db = getUpsellDb();
    db.transaction(
        function(transaction) {
            transaction.executeSql("UPDATE POPUPS SET is_set=1 WHERE id='"+nextId+"'", [], successUpsellDb, errorUpsellDb);
        }
    );
		
    db = getUpsellDb();
    db.transaction(
        function(transaction) {
            transaction.executeSql("UPDATE NEXT_POPUP SET id='"+nextId+"',min_date='"+nextTime+"'", [], successUpsellDb, errorUpsellDb);
        }
    );
}
		
function errorUpsellDb(transaction, error) {
    console.warn("UPSELL DB ERROR: "+JSON.stringify(error));
    return false;
}
   	            
function successUpsellDb(transaction, results) {
   console.log("UPSELL DB SUCCESS");
   return true;
}
    			


    	var reminderPopupId = 0;
function onDeviceReadyReminder() {
	var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
    if(filename != "index.html") {
	    return;
	}
    var db = getRateReminderDb();
    db.transaction(initRateReminderDb, errorRateReminderCB, successRateReminderCB);
    db = getRateReminderDb();
    db.transaction(
        function(transaction) {
            transaction.executeSql("SELECT * FROM POPUPS", [], checkPopulate, errorRateReminderCB);
        }
    );
		
    db.transaction(
        function(transaction) {
            transaction.executeSql("SELECT * FROM NEXT_POPUP", [], checkRateReminderPopup, errorRateReminderCB);
        }
    );
}
		
function getRateReminderDb() {
    var dbConn = window.sqlitePlugin.openDatabase("ratereminder", "1.0", "Rate Reminder Popup", 2000000);
    return dbConn;
}
		
function initRateReminderDb(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS POPUPS (id,seconds_until_next,is_set,displayed)");
    tx.executeSql("CREATE TABLE IF NOT EXISTS NEXT_POPUP (id,min_date)");
}
		
function checkPopulate(tx, results) {
    if (results.rows.length == 0) {
        		
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('1','86400','1','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('2','604800','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('3','1209600','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('4','2419200','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('5','5184000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('6','7776000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('7','10368000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('8','12960000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('9','15552000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('10','18144000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('11','21600000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('12','25920000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('13','31104000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('14','36288000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('15','41472000','0','0')");
        var nextTime = Math.round(new Date().getTime() / 1000) + 86400;
        tx.executeSql("INSERT INTO NEXT_POPUP (id,min_date) VALUES('1','"+nextTime+"')");
    }
}
		
function checkRateReminderPopup(tx, results) {
    if (results.rows.length == 0) {
        return false;
    }
		
    var nowTime = Math.round(new Date().getTime() / 1000);
    var popupRow = results.rows.item(0);
    var popupTime = parseInt(popupRow.min_date);
    reminderPopupId = popupRow.id; //global reminderPopupId
		
    if(parseInt(popupTime) == 0 && parseInt(reminderPopupId) == 0) {
        return false;
    }
		
    if(nowTime >= popupTime) {
        navigator.notification.confirm("Please rate this app!", onRateReminderConfirm, "Please Rate Me!", "Rate,Later,Never");
        var db = getRateReminderDb();
        db.transaction(
            function(transaction) {
                transaction.executeSql("UPDATE POPUPS SET displayed=1 WHERE id='"+reminderPopupId+"'", [], successRateReminderCB, errorRateReminderCB);
            }
        );
    }
}
		
function onRateReminderConfirm(buttonIndex) {
    var btn = parseInt(buttonIndex);
    var setAllDone = false;
		
    switch(btn) {
        case 1:
            //open page
            setAllDone = true;window.open("market://details?id=com.a27398678850c00e7da0ef56a.a83160349a", "_system", "location=yes");
            break;
        case 2:
            //grab next reminder
            initSetNextRateReminder();
            break;
        case 3:
            //do nothing. Set ignore all
            setAllDone = true;
            break;
    }
		
    if(setAllDone == true) {
        setAllRateReminderPopupsViewed();
    }
}
		
function setAllRateReminderPopupsViewed() {
    var db = getRateReminderDb();
    db.transaction(
        function(transaction) {
            transaction.executeSql("UPDATE POPUPS SET is_set=1,displayed=1", [], successRateReminderCB, errorRateReminderCB);
        }
    );
    db.transaction(
        function(transaction) {
            transaction.executeSql("UPDATE NEXT_POPUP SET id=0,min_date=0", [], successRateReminderCB, errorRateReminderCB);
        }
    );
}
		
function initSetNextRateReminder() {
    var db = getRateReminderDb();
    db.transaction(
        function(transaction) {
            transaction.executeSql("UPDATE POPUPS SET is_set=1 WHERE id='"+reminderPopupId+"'", [], successRateReminderCB, errorRateReminderCB);
        }
    );
    db.transaction(
        function(transaction) {
            transaction.executeSql("SELECT * FROM POPUPS WHERE is_set=0 AND displayed=0 ORDER BY id ASC LIMIT 1", [], setNextRateReminder, errorRateReminderCB);
        }
    );
}
		
function setNextRateReminder(tx, results) {
    if (results.rows.length == 0) {
        setAllRateReminderPopupsViewed();
        return false;
    }
		
    var nowTime = Math.round(new Date().getTime() / 1000);
    var popupRow = results.rows.item(0);
    var nextTime = nowTime + parseInt(popupRow.seconds_until_next);
    var nextId = popupRow.id;
		
    var db = getRateReminderDb();
    db.transaction(
        function(transaction) {
            transaction.executeSql("UPDATE POPUPS SET is_set=1 WHERE id='"+nextId+"'", [], successRateReminderCB, errorRateReminderCB);
        }
    );
		
    db = getRateReminderDb();
    db.transaction(
        function(transaction) {
            transaction.executeSql("UPDATE NEXT_POPUP SET id='"+nextId+"',min_date='"+nextTime+"'", [], successRateReminderCB, errorRateReminderCB);
        }
    );
}
		
function errorRateReminderCB(transaction, error) {
    console.warn("REM DB ERROR: "+JSON.stringify(error));
    return false;
}
   	            
function successRateReminderCB(transaction, results) {
   console.log("REM DB SUCCESS");
   return true;
}
    			

