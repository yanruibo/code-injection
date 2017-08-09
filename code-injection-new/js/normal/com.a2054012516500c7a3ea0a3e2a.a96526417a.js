




                
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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share UK Traffic News", null, null, "https://play.google.com/store/apps/details?id=com.a2054012516500c7a3ea0a3e2a.a96526417a");
    			    return false;
                });
            });
    	

				
				 $(document).ready(function() {
				     console.log("AdMob: Document ready");
					 document.addEventListener("deviceready",onDeviceReadyAdMob,false);
			     });
				
				 function onDeviceReadyAdMob() {
				     admob.setOptions( {
                         publisherId: 'ca-app-pub-7961703648762839/8544269905',
                         interstitialAdId: 'ca-app-pub-7961703648762839/7849594703',
                         adSize: admob.AD_SIZE.SMART_BANNER,
                         bannerAtTop: true, // set to true, to put banner at top
                         overlap: false, // set to true, to allow banner overlap webview
                         offsetTopBar: true, // set to true to avoid ios7 status bar overlap
                         isTesting: false, // receiving test ad
                         autoShow: true // auto show interstitial ad when loaded
                     }, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
		             
		         	 admob.createBannerView([],
		         			function(data) { 
		         			    console.log("createBannerView OK: " + data); 
		         			    adMobShowAd();
		                    }, 
		         			function(data) {console.log("createBannerView FAIL: " + data)}
		             );
		             
		             function adMobShowAd() {
		                  admob.showAd(true, 
		                      function(data) { 
		                          console.log("showAd OK: " + data);
		                          adMobRequestAd();
		                      }, 
		                      function(data) {
		                          console.log("showAd FAIL: " + data)
		                      }
		                  );
		             }
		         			
		         	 function adMobRequestAd() {
		                 admob.requestAd([], 
		         			function(data) { 
		         			    console.log("requestAd OK: " + data);
		         			   
		                    }, 
		         			function(data) {console.log("requestAd FAIL: " + data)});
		             }
		         			
		         	 document.addEventListener('onFailedToReceiveAd', function(data) { console.log("Failed to receive Ad: "+ data.error + ": " + data.reason)});
		         					         			
		         	
		         	
		         	
		         	
		         	var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
					var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
         				console.log("AdMob File loaded: " + filename);
					if(filename == "index.html") {
						var ic = Number(localStorage.getItem("ic"));
						var lastInterstitialTime = Number(localStorage.getItem("lastInterstitialTime"));
						console.log("INTERSTITIAL LOAD COUNT: " + ic);
						if(ic == undefined || isNaN(ic) || ic == NaN) {
		         	          ic = 0;
						}
						
						console.log("Last Interstitial Time: " + lastInterstitialTime);
						if(lastInterstitialTime == undefined || isNaN(lastInterstitialTime) || lastInterstitialTime == NaN) {
		         	          lastInterstitialTime = 0;
						}
						console.log("Last Interstitial load vs current time: " + lastInterstitialTime + ", " + interstitialStartTime);
						if(ic <= 1 || lastInterstitialTime + 600 < interstitialStartTime){
							localStorage.setItem("ic",3);
		         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
		         	        addInterstitial();
							/* admob.createInterstitialView([],
						         adMobShowInterstitial(),
						         function(data) {console.log("createInterstitialView FAIL: " + data)}
						    ); */
						}
						else{
							localStorage.setItem("ic", ic - 1);
						}
					
					}
					
					function addInterstitial() {
				        var successCreateBannerView = function() { console.log("addInterstitial Success"); admob.requestAd([],success,error); };
				        var success = function() { console.log("requestInterstitialAd Success"); };
				        var error = function(message) { console.log("requestInterstitialAd FAIL: " + message); };
				        
				        admob.createInterstitialView([],successCreateBannerView,error);
				    }
		         	
		         	function adMobShowInterstitial() {
		                 admob.showInterstitialAd(true,
		         			function(data) { 
		         			    console.log("showInterstitialAd OK: " + data);
		         	            
		                    }, 
		         			function(data) {
		         			    console.log("showInterstitialAd FAIL: " + data);
		         			    var interstitialNowTime = parseInt(Math.round(new Date().getTime() / 1000));
		         			    var diff = interstitialNowTime - interstitialStartTime;
		         			    console.log("diff: "+diff);
		         			    if(parseInt(data) == 99 && diff <= 10) {
		         			        adMobShowInterstitial();
		         			    }
		         			}
		         	    );
		             }
		         	
		         	
					 /*************
		         	 var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
		         	 var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
		         			console.log("AdMob File loaded: " + filename);
		         	 if(filename == "index.html") {
		         	      var interstitialCountDb = window.sessionStorage;
		         	      var ic = interstitialCountDb.getItem("ic");

		         	      if(ic == undefined || isNaN(ic) || ic == NaN) {
		         	          ic = 0;
		         	      }
		         	     console.log("INTERSTITIAL LOAD COUNT: " + ic);
		         	     
		         	    if(ic < 3) {
		         	        document.addEventListener('onReceiveInterstitialAd', function() { console.log("onReceiveInterstitialAd fired"); adMobShowInterstitial();});
		         			
		         	        admob.createInterstitialView([],
		         			    function(data) { 
		         			        console.log("createInterstitialView OK: " + data); 
		         			        adMobShowInterstitial();
		                        }, 
		         			    function(data) {console.log("createInterstitialView FAIL: " + data)}
		         	         );
		         	     }
		         	 }
		         	
		         	
		         			
		         	 function adMobShowInterstitial() {
		                 admob.showInterstitialAd(true,
		         			function(data) { 
		         			    console.log("showInterstitialAd OK: " + data); 
		         	            ic++;
		         	            interstitialCountDb.setItem("count",ic);
		                    }, 
		         			function(data) {
		         			    console.log("showInterstitialAd FAIL: " + data);
		         			    var interstitialNowTime = parseInt(Math.round(new Date().getTime() / 1000));
		         			    var diff = interstitialNowTime - interstitialStartTime;
		         			    console.log("diff: "+diff);
		         			    if(parseInt(data) == 99 && diff <= 10) {
		         			        adMobShowInterstitial();
		         			    }
		         			}
		         	    );
		             }
		             *************/	
		         	
				 }
				 

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"1E2225B8-54F2-4CFD-868A-D603E73FCC65", appname:"UK Traffic News", gcmprojectid:"760995130526"},function(status) {},function(status) {});
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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share UK Traffic News", null, null, "https://play.google.com/store/apps/details?id=com.a2054012516500c7a3ea0a3e2a.a96526417a");
    			    return false;
                });
            });
    	

				
				 $(document).ready(function() {
				     console.log("AdMob: Document ready");
					 document.addEventListener("deviceready",onDeviceReadyAdMob,false);
			     });
				
				 function onDeviceReadyAdMob() {
				     admob.setOptions( {
                         publisherId: 'ca-app-pub-7961703648762839/8544269905',
                         interstitialAdId: 'ca-app-pub-7961703648762839/7849594703',
                         adSize: admob.AD_SIZE.SMART_BANNER,
                         bannerAtTop: true, // set to true, to put banner at top
                         overlap: false, // set to true, to allow banner overlap webview
                         offsetTopBar: true, // set to true to avoid ios7 status bar overlap
                         isTesting: false, // receiving test ad
                         autoShow: true // auto show interstitial ad when loaded
                     }, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
		             
		         	 admob.createBannerView([],
		         			function(data) { 
		         			    console.log("createBannerView OK: " + data); 
		         			    adMobShowAd();
		                    }, 
		         			function(data) {console.log("createBannerView FAIL: " + data)}
		             );
		             
		             function adMobShowAd() {
		                  admob.showAd(true, 
		                      function(data) { 
		                          console.log("showAd OK: " + data);
		                          adMobRequestAd();
		                      }, 
		                      function(data) {
		                          console.log("showAd FAIL: " + data)
		                      }
		                  );
		             }
		         			
		         	 function adMobRequestAd() {
		                 admob.requestAd([], 
		         			function(data) { 
		         			    console.log("requestAd OK: " + data);
		         			   
		                    }, 
		         			function(data) {console.log("requestAd FAIL: " + data)});
		             }
		         			
		         	 document.addEventListener('onFailedToReceiveAd', function(data) { console.log("Failed to receive Ad: "+ data.error + ": " + data.reason)});
		         					         			
		         	
		         	
		         	
		         	
		         	var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
					var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
         				console.log("AdMob File loaded: " + filename);
					if(filename == "index.html") {
						var ic = Number(localStorage.getItem("ic"));
						var lastInterstitialTime = Number(localStorage.getItem("lastInterstitialTime"));
						console.log("INTERSTITIAL LOAD COUNT: " + ic);
						if(ic == undefined || isNaN(ic) || ic == NaN) {
		         	          ic = 0;
						}
						
						console.log("Last Interstitial Time: " + lastInterstitialTime);
						if(lastInterstitialTime == undefined || isNaN(lastInterstitialTime) || lastInterstitialTime == NaN) {
		         	          lastInterstitialTime = 0;
						}
						console.log("Last Interstitial load vs current time: " + lastInterstitialTime + ", " + interstitialStartTime);
						if(ic <= 1 || lastInterstitialTime + 600 < interstitialStartTime){
							localStorage.setItem("ic",3);
		         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
		         	        addInterstitial();
							/* admob.createInterstitialView([],
						         adMobShowInterstitial(),
						         function(data) {console.log("createInterstitialView FAIL: " + data)}
						    ); */
						}
						else{
							localStorage.setItem("ic", ic - 1);
						}
					
					}
					
					function addInterstitial() {
				        var successCreateBannerView = function() { console.log("addInterstitial Success"); admob.requestAd([],success,error); };
				        var success = function() { console.log("requestInterstitialAd Success"); };
				        var error = function(message) { console.log("requestInterstitialAd FAIL: " + message); };
				        
				        admob.createInterstitialView([],successCreateBannerView,error);
				    }
		         	
		         	function adMobShowInterstitial() {
		                 admob.showInterstitialAd(true,
		         			function(data) { 
		         			    console.log("showInterstitialAd OK: " + data);
		         	            
		                    }, 
		         			function(data) {
		         			    console.log("showInterstitialAd FAIL: " + data);
		         			    var interstitialNowTime = parseInt(Math.round(new Date().getTime() / 1000));
		         			    var diff = interstitialNowTime - interstitialStartTime;
		         			    console.log("diff: "+diff);
		         			    if(parseInt(data) == 99 && diff <= 10) {
		         			        adMobShowInterstitial();
		         			    }
		         			}
		         	    );
		             }
		         	
		         	
					 /*************
		         	 var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
		         	 var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
		         			console.log("AdMob File loaded: " + filename);
		         	 if(filename == "index.html") {
		         	      var interstitialCountDb = window.sessionStorage;
		         	      var ic = interstitialCountDb.getItem("ic");

		         	      if(ic == undefined || isNaN(ic) || ic == NaN) {
		         	          ic = 0;
		         	      }
		         	     console.log("INTERSTITIAL LOAD COUNT: " + ic);
		         	     
		         	    if(ic < 3) {
		         	        document.addEventListener('onReceiveInterstitialAd', function() { console.log("onReceiveInterstitialAd fired"); adMobShowInterstitial();});
		         			
		         	        admob.createInterstitialView([],
		         			    function(data) { 
		         			        console.log("createInterstitialView OK: " + data); 
		         			        adMobShowInterstitial();
		                        }, 
		         			    function(data) {console.log("createInterstitialView FAIL: " + data)}
		         	         );
		         	     }
		         	 }
		         	
		         	
		         			
		         	 function adMobShowInterstitial() {
		                 admob.showInterstitialAd(true,
		         			function(data) { 
		         			    console.log("showInterstitialAd OK: " + data); 
		         	            ic++;
		         	            interstitialCountDb.setItem("count",ic);
		                    }, 
		         			function(data) {
		         			    console.log("showInterstitialAd FAIL: " + data);
		         			    var interstitialNowTime = parseInt(Math.round(new Date().getTime() / 1000));
		         			    var diff = interstitialNowTime - interstitialStartTime;
		         			    console.log("diff: "+diff);
		         			    if(parseInt(data) == 99 && diff <= 10) {
		         			        adMobShowInterstitial();
		         			    }
		         			}
		         	    );
		             }
		             *************/	
		         	
				 }
				 

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"1E2225B8-54F2-4CFD-868A-D603E73FCC65", appname:"UK Traffic News", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


       	    var deviceLang = "en";
       		var pushHistory;
            $(document).ready(function() {
       	        $.support.cors = true;
       	        $.mobile.allowCrossDomainPages=true;
   	            document.addEventListener("deviceready", onDeviceReadyPushHistory, false);
            });
       	                
       	    function refreshHistory() {
       	        onDeviceReadyPushHistory();
       	    }
       	                
       	    function onDeviceReadyPushHistory() {
       	        $("#notification-history-container").html("<img src=\"loading_spinner.gif\">");
       	        pushHistory = cordova.require("cordova/plugin/PushHistory");
       	        var language = navigator.language.split("-"); 
                deviceLang = (language[0]); 

                pushHistory.getHistory(null, function(status){
       	            $("#notification-history-container").html("");
       	            var jsonString = status;
       	            try {
       	                var histObj = $.parseJSON(jsonString);
       	                var histDl = $("<dl>");
       	                $.each(histObj,function(i,hist) {
                            var msg = hist.notification;
       	                    var receiveDateUnix = hist.receiveDate;
       	                    var receiveDateObj = new Date(parseInt(receiveDateUnix)*1000);

       	                    var day = receiveDateObj.getDate();
                            var month = parseInt(receiveDateObj.getMonth()) + 1;
       	                    var year = receiveDateObj.getFullYear();;
       	                    var hours = receiveDateObj.getHours();
                            var minutes = receiveDateObj.getMinutes();
       	                
       	                    if(parseInt(day) <= 9) {
       	                        day = "0"+parseInt(day);
       	                    }
       	                
       	                    if(parseInt(month) <= 9) {
       	                        month = "0"+parseInt(month);
       	                    }
       	                
       	                    if(parseInt(hours) <= 9) {
       	                        hours = "0"+parseInt(hours);
       	                    }
       	                
       	                    if(parseInt(minutes) <= 9) {
       	                        minutes = "0"+parseInt(minutes);
       	                    }

                            var formattedDate = month + "/" + day + "/" + year + " " + hours + ":" + minutes;
                
       	                    var link = hist.link;
       	                    var mid = hist.mid;
       	                    var msgType = hist.type;
       	                
       	                    var msgHtml = "<div id=\""+mid+"-container\" style=\"width:98%;\"><dt><strong>" + formattedDate + "</strong> <a href=\"#\" style=\"float:right\" class=\"delete-notification ui-btn-right\" data-mid=\""+mid+"\" data-role=\"button\" data-icon=\"delete\" data-iconpos=\"notext\" data-inline=\"true\" data-theme=\"c\">Delete</a></dt><dd>"+msg;
       	                    if(link != "" && link != null) {msgHtml += '<br><a href="#" class="open-external-browser-push" data-gourl="'+link+'">Link</a>';}
       	                                 
       	                    if(msgType == "rich") {
       	                        var richLink = "https://secure.richmsg.com/?id=" + mid + "&lang=" + deviceLang;
       	                        msgHtml += '<br><a href=\"#\" data-gourl="'+richLink+'" class="rich-notification-link" rel="external">Full message</a>';
       	                    }
       	                
       	                    msgHtml += "</dd></div>";
       	                
       	                    histDl.append(msgHtml);
       	                
                        });
       	                $("#notification-history-container").append(histDl);
       	                
       	                
       	                $(".delete-notification").click(function() {
       	                    var delMid = $(this).attr("data-mid");
       	                    navigator.notification.confirm("Delete notification?", function(button) {
   	                           if(parseInt(button) == 1) {
       	                           
       	                           $("#"+delMid+"-container").fadeOut();
       	                           pushHistory.deleteNotification(delMid, function(status){refreshHistory()},function(status){});
   	                           }
                            }, "Delete","OK,Cancel")
                            return false;
                        });
       	                
       	                $(".open-external-browser-push").click(function() {
                            var url = $(this).attr("data-gourl");
       	                    //window.plugins.childBrowser.openExternal(url);
                            window.open(url, "_blank", "location=yes")
       	                    return false;
                        });
       	                
       	                $(".rich-notification-link").click(function() {
       	                    var url = $(this).attr("data-gourl");
       	                    //window.plugins.childBrowser.showWebPage(url, { showLocationBar: false });
                            window.open(url, "_blank", "location=no")
       	                    return false;
       	                
       	                    //$.support.cors = true;
       	                    //$.mobile.allowCrossDomainPages=true;
       	                    //$("#rich-notification-popup").popup("open");
                            //var url = $(this).attr("data-gourl");
       	                    //$("#rich-notification-content").load(url,function(){
       	                    //    $("#rich-notification-content > a").each(function(i,v) {
                            //        $(this).addClass("open-external-browser-push");
       	                     //       $(this).attr("data-gourl",$(this).attr("href"));
                            //    });
       	                        //$("#mainPage").trigger("create");
                            //});
                        });
       	                
       	                $("#mainPage").trigger("create");
       	                
       	            } catch (e) {
       	                console.error("PUSH History JSON Error: "+ e.message);
       	            }
       	            //console.log("histObj: "+histObj);â€‹
                },function(status){
                    console.error('FAILED TO GET NOTIFICATION HISTORY: ' + status);
                });
       	    }
        
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=pushHistory&appId=2054012516500c7a3ea0a3e2.96526417\"/>");}).fail(function( jqxhr, textStatus, error ) {});


			    $(document).ready(function() {
				    //RSS card generation
	                $("#rss-content").hide();
				    if($("#rss-content").length) {
				        var tmpHtml = '<div data-role="content" data-theme="b" class="inner_main" id="rss-content-tmp" style="text-align:center;"><h5>Generating, please wait...</h5></div>';
				        $("#mainPage").append(tmpHtml);
				    }
	            });
		        $(window).load(function() {
	                $("#rss-content-tmp").hide();
	                $("#rss-content").show();
		            activateNativeDroid();
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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share UK Traffic News", null, null, "https://play.google.com/store/apps/details?id=com.a2054012516500c7a3ea0a3e2a.a96526417a");
    			    return false;
                });
            });
    	

				
				 $(document).ready(function() {
				     console.log("AdMob: Document ready");
					 document.addEventListener("deviceready",onDeviceReadyAdMob,false);
			     });
				
				 function onDeviceReadyAdMob() {
				     admob.setOptions( {
                         publisherId: 'ca-app-pub-7961703648762839/8544269905',
                         interstitialAdId: 'ca-app-pub-7961703648762839/7849594703',
                         adSize: admob.AD_SIZE.SMART_BANNER,
                         bannerAtTop: true, // set to true, to put banner at top
                         overlap: false, // set to true, to allow banner overlap webview
                         offsetTopBar: true, // set to true to avoid ios7 status bar overlap
                         isTesting: false, // receiving test ad
                         autoShow: true // auto show interstitial ad when loaded
                     }, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
		             
		         	 admob.createBannerView([],
		         			function(data) { 
		         			    console.log("createBannerView OK: " + data); 
		         			    adMobShowAd();
		                    }, 
		         			function(data) {console.log("createBannerView FAIL: " + data)}
		             );
		             
		             function adMobShowAd() {
		                  admob.showAd(true, 
		                      function(data) { 
		                          console.log("showAd OK: " + data);
		                          adMobRequestAd();
		                      }, 
		                      function(data) {
		                          console.log("showAd FAIL: " + data)
		                      }
		                  );
		             }
		         			
		         	 function adMobRequestAd() {
		                 admob.requestAd([], 
		         			function(data) { 
		         			    console.log("requestAd OK: " + data);
		         			   
		                    }, 
		         			function(data) {console.log("requestAd FAIL: " + data)});
		             }
		         			
		         	 document.addEventListener('onFailedToReceiveAd', function(data) { console.log("Failed to receive Ad: "+ data.error + ": " + data.reason)});
		         					         			
		         	
		         	
		         	
		         	
		         	var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
					var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
         				console.log("AdMob File loaded: " + filename);
					if(filename == "index.html") {
						var ic = Number(localStorage.getItem("ic"));
						var lastInterstitialTime = Number(localStorage.getItem("lastInterstitialTime"));
						console.log("INTERSTITIAL LOAD COUNT: " + ic);
						if(ic == undefined || isNaN(ic) || ic == NaN) {
		         	          ic = 0;
						}
						
						console.log("Last Interstitial Time: " + lastInterstitialTime);
						if(lastInterstitialTime == undefined || isNaN(lastInterstitialTime) || lastInterstitialTime == NaN) {
		         	          lastInterstitialTime = 0;
						}
						console.log("Last Interstitial load vs current time: " + lastInterstitialTime + ", " + interstitialStartTime);
						if(ic <= 1 || lastInterstitialTime + 600 < interstitialStartTime){
							localStorage.setItem("ic",3);
		         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
		         	        addInterstitial();
							/* admob.createInterstitialView([],
						         adMobShowInterstitial(),
						         function(data) {console.log("createInterstitialView FAIL: " + data)}
						    ); */
						}
						else{
							localStorage.setItem("ic", ic - 1);
						}
					
					}
					
					function addInterstitial() {
				        var successCreateBannerView = function() { console.log("addInterstitial Success"); admob.requestAd([],success,error); };
				        var success = function() { console.log("requestInterstitialAd Success"); };
				        var error = function(message) { console.log("requestInterstitialAd FAIL: " + message); };
				        
				        admob.createInterstitialView([],successCreateBannerView,error);
				    }
		         	
		         	function adMobShowInterstitial() {
		                 admob.showInterstitialAd(true,
		         			function(data) { 
		         			    console.log("showInterstitialAd OK: " + data);
		         	            
		                    }, 
		         			function(data) {
		         			    console.log("showInterstitialAd FAIL: " + data);
		         			    var interstitialNowTime = parseInt(Math.round(new Date().getTime() / 1000));
		         			    var diff = interstitialNowTime - interstitialStartTime;
		         			    console.log("diff: "+diff);
		         			    if(parseInt(data) == 99 && diff <= 10) {
		         			        adMobShowInterstitial();
		         			    }
		         			}
		         	    );
		             }
		         	
		         	
					 /*************
		         	 var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
		         	 var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
		         			console.log("AdMob File loaded: " + filename);
		         	 if(filename == "index.html") {
		         	      var interstitialCountDb = window.sessionStorage;
		         	      var ic = interstitialCountDb.getItem("ic");

		         	      if(ic == undefined || isNaN(ic) || ic == NaN) {
		         	          ic = 0;
		         	      }
		         	     console.log("INTERSTITIAL LOAD COUNT: " + ic);
		         	     
		         	    if(ic < 3) {
		         	        document.addEventListener('onReceiveInterstitialAd', function() { console.log("onReceiveInterstitialAd fired"); adMobShowInterstitial();});
		         			
		         	        admob.createInterstitialView([],
		         			    function(data) { 
		         			        console.log("createInterstitialView OK: " + data); 
		         			        adMobShowInterstitial();
		                        }, 
		         			    function(data) {console.log("createInterstitialView FAIL: " + data)}
		         	         );
		         	     }
		         	 }
		         	
		         	
		         			
		         	 function adMobShowInterstitial() {
		                 admob.showInterstitialAd(true,
		         			function(data) { 
		         			    console.log("showInterstitialAd OK: " + data); 
		         	            ic++;
		         	            interstitialCountDb.setItem("count",ic);
		                    }, 
		         			function(data) {
		         			    console.log("showInterstitialAd FAIL: " + data);
		         			    var interstitialNowTime = parseInt(Math.round(new Date().getTime() / 1000));
		         			    var diff = interstitialNowTime - interstitialStartTime;
		         			    console.log("diff: "+diff);
		         			    if(parseInt(data) == 99 && diff <= 10) {
		         			        adMobShowInterstitial();
		         			    }
		         			}
		         	    );
		             }
		             *************/	
		         	
				 }
				 

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"1E2225B8-54F2-4CFD-868A-D603E73FCC65", appname:"UK Traffic News", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});

$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=index&appId=2054012516500c7a3ea0a3e2.96526417\"/>");}).fail(function( jqxhr, textStatus, error ) {});


			    $(document).ready(function() {
				    //RSS card generation
	                $("#rss-content").hide();
				    if($("#rss-content").length) {
				        var tmpHtml = '<div data-role="content" data-theme="b" class="inner_main" id="rss-content-tmp" style="text-align:center;"><h5>Generating, please wait...</h5></div>';
				        $("#mainPage").append(tmpHtml);
				    }
	            });
		        $(window).load(function() {
	                $("#rss-content-tmp").hide();
	                $("#rss-content").show();
		            activateNativeDroid();
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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share UK Traffic News", null, null, "https://play.google.com/store/apps/details?id=com.a2054012516500c7a3ea0a3e2a.a96526417a");
    			    return false;
                });
            });
    	

				
				 $(document).ready(function() {
				     console.log("AdMob: Document ready");
					 document.addEventListener("deviceready",onDeviceReadyAdMob,false);
			     });
				
				 function onDeviceReadyAdMob() {
				     admob.setOptions( {
                         publisherId: 'ca-app-pub-7961703648762839/8544269905',
                         interstitialAdId: 'ca-app-pub-7961703648762839/7849594703',
                         adSize: admob.AD_SIZE.SMART_BANNER,
                         bannerAtTop: true, // set to true, to put banner at top
                         overlap: false, // set to true, to allow banner overlap webview
                         offsetTopBar: true, // set to true to avoid ios7 status bar overlap
                         isTesting: false, // receiving test ad
                         autoShow: true // auto show interstitial ad when loaded
                     }, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
		             
		         	 admob.createBannerView([],
		         			function(data) { 
		         			    console.log("createBannerView OK: " + data); 
		         			    adMobShowAd();
		                    }, 
		         			function(data) {console.log("createBannerView FAIL: " + data)}
		             );
		             
		             function adMobShowAd() {
		                  admob.showAd(true, 
		                      function(data) { 
		                          console.log("showAd OK: " + data);
		                          adMobRequestAd();
		                      }, 
		                      function(data) {
		                          console.log("showAd FAIL: " + data)
		                      }
		                  );
		             }
		         			
		         	 function adMobRequestAd() {
		                 admob.requestAd([], 
		         			function(data) { 
		         			    console.log("requestAd OK: " + data);
		         			   
		                    }, 
		         			function(data) {console.log("requestAd FAIL: " + data)});
		             }
		         			
		         	 document.addEventListener('onFailedToReceiveAd', function(data) { console.log("Failed to receive Ad: "+ data.error + ": " + data.reason)});
		         					         			
		         	
		         	
		         	
		         	
		         	var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
					var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
         				console.log("AdMob File loaded: " + filename);
					if(filename == "index.html") {
						var ic = Number(localStorage.getItem("ic"));
						var lastInterstitialTime = Number(localStorage.getItem("lastInterstitialTime"));
						console.log("INTERSTITIAL LOAD COUNT: " + ic);
						if(ic == undefined || isNaN(ic) || ic == NaN) {
		         	          ic = 0;
						}
						
						console.log("Last Interstitial Time: " + lastInterstitialTime);
						if(lastInterstitialTime == undefined || isNaN(lastInterstitialTime) || lastInterstitialTime == NaN) {
		         	          lastInterstitialTime = 0;
						}
						console.log("Last Interstitial load vs current time: " + lastInterstitialTime + ", " + interstitialStartTime);
						if(ic <= 1 || lastInterstitialTime + 600 < interstitialStartTime){
							localStorage.setItem("ic",3);
		         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
		         	        addInterstitial();
							/* admob.createInterstitialView([],
						         adMobShowInterstitial(),
						         function(data) {console.log("createInterstitialView FAIL: " + data)}
						    ); */
						}
						else{
							localStorage.setItem("ic", ic - 1);
						}
					
					}
					
					function addInterstitial() {
				        var successCreateBannerView = function() { console.log("addInterstitial Success"); admob.requestAd([],success,error); };
				        var success = function() { console.log("requestInterstitialAd Success"); };
				        var error = function(message) { console.log("requestInterstitialAd FAIL: " + message); };
				        
				        admob.createInterstitialView([],successCreateBannerView,error);
				    }
		         	
		         	function adMobShowInterstitial() {
		                 admob.showInterstitialAd(true,
		         			function(data) { 
		         			    console.log("showInterstitialAd OK: " + data);
		         	            
		                    }, 
		         			function(data) {
		         			    console.log("showInterstitialAd FAIL: " + data);
		         			    var interstitialNowTime = parseInt(Math.round(new Date().getTime() / 1000));
		         			    var diff = interstitialNowTime - interstitialStartTime;
		         			    console.log("diff: "+diff);
		         			    if(parseInt(data) == 99 && diff <= 10) {
		         			        adMobShowInterstitial();
		         			    }
		         			}
		         	    );
		             }
		         	
		         	
					 /*************
		         	 var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
		         	 var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
		         			console.log("AdMob File loaded: " + filename);
		         	 if(filename == "index.html") {
		         	      var interstitialCountDb = window.sessionStorage;
		         	      var ic = interstitialCountDb.getItem("ic");

		         	      if(ic == undefined || isNaN(ic) || ic == NaN) {
		         	          ic = 0;
		         	      }
		         	     console.log("INTERSTITIAL LOAD COUNT: " + ic);
		         	     
		         	    if(ic < 3) {
		         	        document.addEventListener('onReceiveInterstitialAd', function() { console.log("onReceiveInterstitialAd fired"); adMobShowInterstitial();});
		         			
		         	        admob.createInterstitialView([],
		         			    function(data) { 
		         			        console.log("createInterstitialView OK: " + data); 
		         			        adMobShowInterstitial();
		                        }, 
		         			    function(data) {console.log("createInterstitialView FAIL: " + data)}
		         	         );
		         	     }
		         	 }
		         	
		         	
		         			
		         	 function adMobShowInterstitial() {
		                 admob.showInterstitialAd(true,
		         			function(data) { 
		         			    console.log("showInterstitialAd OK: " + data); 
		         	            ic++;
		         	            interstitialCountDb.setItem("count",ic);
		                    }, 
		         			function(data) {
		         			    console.log("showInterstitialAd FAIL: " + data);
		         			    var interstitialNowTime = parseInt(Math.round(new Date().getTime() / 1000));
		         			    var diff = interstitialNowTime - interstitialStartTime;
		         			    console.log("diff: "+diff);
		         			    if(parseInt(data) == 99 && diff <= 10) {
		         			        adMobShowInterstitial();
		         			    }
		         			}
		         	    );
		             }
		             *************/	
		         	
				 }
				 

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"1E2225B8-54F2-4CFD-868A-D603E73FCC65", appname:"UK Traffic News", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share UK Traffic News", null, null, "https://play.google.com/store/apps/details?id=com.a2054012516500c7a3ea0a3e2a.a96526417a");
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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share UK Traffic News", null, null, "https://play.google.com/store/apps/details?id=com.a2054012516500c7a3ea0a3e2a.a96526417a");
    			    return false;
                });
            });
    	

				
				 $(document).ready(function() {
				     console.log("AdMob: Document ready");
					 document.addEventListener("deviceready",onDeviceReadyAdMob,false);
			     });
				
				 function onDeviceReadyAdMob() {
				     admob.setOptions( {
                         publisherId: 'ca-app-pub-7961703648762839/8544269905',
                         interstitialAdId: 'ca-app-pub-7961703648762839/7849594703',
                         adSize: admob.AD_SIZE.SMART_BANNER,
                         bannerAtTop: true, // set to true, to put banner at top
                         overlap: false, // set to true, to allow banner overlap webview
                         offsetTopBar: true, // set to true to avoid ios7 status bar overlap
                         isTesting: false, // receiving test ad
                         autoShow: true // auto show interstitial ad when loaded
                     }, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
		             
		         	 admob.createBannerView([],
		         			function(data) { 
		         			    console.log("createBannerView OK: " + data); 
		         			    adMobShowAd();
		                    }, 
		         			function(data) {console.log("createBannerView FAIL: " + data)}
		             );
		             
		             function adMobShowAd() {
		                  admob.showAd(true, 
		                      function(data) { 
		                          console.log("showAd OK: " + data);
		                          adMobRequestAd();
		                      }, 
		                      function(data) {
		                          console.log("showAd FAIL: " + data)
		                      }
		                  );
		             }
		         			
		         	 function adMobRequestAd() {
		                 admob.requestAd([], 
		         			function(data) { 
		         			    console.log("requestAd OK: " + data);
		         			   
		                    }, 
		         			function(data) {console.log("requestAd FAIL: " + data)});
		             }
		         			
		         	 document.addEventListener('onFailedToReceiveAd', function(data) { console.log("Failed to receive Ad: "+ data.error + ": " + data.reason)});
		         					         			
		         	
		         	
		         	
		         	
		         	var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
					var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
         				console.log("AdMob File loaded: " + filename);
					if(filename == "index.html") {
						var ic = Number(localStorage.getItem("ic"));
						var lastInterstitialTime = Number(localStorage.getItem("lastInterstitialTime"));
						console.log("INTERSTITIAL LOAD COUNT: " + ic);
						if(ic == undefined || isNaN(ic) || ic == NaN) {
		         	          ic = 0;
						}
						
						console.log("Last Interstitial Time: " + lastInterstitialTime);
						if(lastInterstitialTime == undefined || isNaN(lastInterstitialTime) || lastInterstitialTime == NaN) {
		         	          lastInterstitialTime = 0;
						}
						console.log("Last Interstitial load vs current time: " + lastInterstitialTime + ", " + interstitialStartTime);
						if(ic <= 1 || lastInterstitialTime + 600 < interstitialStartTime){
							localStorage.setItem("ic",3);
		         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
		         	        addInterstitial();
							/* admob.createInterstitialView([],
						         adMobShowInterstitial(),
						         function(data) {console.log("createInterstitialView FAIL: " + data)}
						    ); */
						}
						else{
							localStorage.setItem("ic", ic - 1);
						}
					
					}
					
					function addInterstitial() {
				        var successCreateBannerView = function() { console.log("addInterstitial Success"); admob.requestAd([],success,error); };
				        var success = function() { console.log("requestInterstitialAd Success"); };
				        var error = function(message) { console.log("requestInterstitialAd FAIL: " + message); };
				        
				        admob.createInterstitialView([],successCreateBannerView,error);
				    }
		         	
		         	function adMobShowInterstitial() {
		                 admob.showInterstitialAd(true,
		         			function(data) { 
		         			    console.log("showInterstitialAd OK: " + data);
		         	            
		                    }, 
		         			function(data) {
		         			    console.log("showInterstitialAd FAIL: " + data);
		         			    var interstitialNowTime = parseInt(Math.round(new Date().getTime() / 1000));
		         			    var diff = interstitialNowTime - interstitialStartTime;
		         			    console.log("diff: "+diff);
		         			    if(parseInt(data) == 99 && diff <= 10) {
		         			        adMobShowInterstitial();
		         			    }
		         			}
		         	    );
		             }
		         	
		         	
					 /*************
		         	 var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
		         	 var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
		         			console.log("AdMob File loaded: " + filename);
		         	 if(filename == "index.html") {
		         	      var interstitialCountDb = window.sessionStorage;
		         	      var ic = interstitialCountDb.getItem("ic");

		         	      if(ic == undefined || isNaN(ic) || ic == NaN) {
		         	          ic = 0;
		         	      }
		         	     console.log("INTERSTITIAL LOAD COUNT: " + ic);
		         	     
		         	    if(ic < 3) {
		         	        document.addEventListener('onReceiveInterstitialAd', function() { console.log("onReceiveInterstitialAd fired"); adMobShowInterstitial();});
		         			
		         	        admob.createInterstitialView([],
		         			    function(data) { 
		         			        console.log("createInterstitialView OK: " + data); 
		         			        adMobShowInterstitial();
		                        }, 
		         			    function(data) {console.log("createInterstitialView FAIL: " + data)}
		         	         );
		         	     }
		         	 }
		         	
		         	
		         			
		         	 function adMobShowInterstitial() {
		                 admob.showInterstitialAd(true,
		         			function(data) { 
		         			    console.log("showInterstitialAd OK: " + data); 
		         	            ic++;
		         	            interstitialCountDb.setItem("count",ic);
		                    }, 
		         			function(data) {
		         			    console.log("showInterstitialAd FAIL: " + data);
		         			    var interstitialNowTime = parseInt(Math.round(new Date().getTime() / 1000));
		         			    var diff = interstitialNowTime - interstitialStartTime;
		         			    console.log("diff: "+diff);
		         			    if(parseInt(data) == 99 && diff <= 10) {
		         			        adMobShowInterstitial();
		         			    }
		         			}
		         	    );
		             }
		             *************/	
		         	
				 }
				 

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"1E2225B8-54F2-4CFD-868A-D603E73FCC65", appname:"UK Traffic News", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});



    
                      $(document).ready(function() {
                          $("#contact-form-submit").click(function() {
		
                              var mailtoString = $("#mailto-string").val();
                              var formData = $("#contact-form").serializeArray();
                              var messageBody = "";
                              $.each(formData, function(index, value) {
                                  messageBody += value.name + ":\n" + value.value + "\n\n";
                              });
                              var realMessageBody = escape(messageBody);
		
                              var extras = {};
                              extras[WebIntent.EXTRA_SUBJECT] = "UK Traffic News Feedback";
                              extras[WebIntent.EXTRA_TEXT] = messageBody;
                              extras[WebIntent.EXTRA_EMAIL] = "enquiries@appdesigned4u.com";
                              window.plugins.webintent.startActivity({
                                  action: WebIntent.ACTION_SEND,
                                  type: 'text/plain',
                                  extras: extras
                              },
                              function() {
                                  //navigator.notification.alert("Thank you!", false, "Thank you", "Close");
                                  $("input[type=text], textarea").val("");
                              },
                              function() {
                                  navigator.notification.alert("Sorry", false, "Sorry! Failed to send - please try again.", "Close");
                              });
                              return false;
                          });
                      });
                  
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=contactForm&appId=2054012516500c7a3ea0a3e2.96526417\"/>");}).fail(function( jqxhr, textStatus, error ) {});


			    $(document).ready(function() {
				    //RSS card generation
	                $("#rss-content").hide();
				    if($("#rss-content").length) {
				        var tmpHtml = '<div data-role="content" data-theme="b" class="inner_main" id="rss-content-tmp" style="text-align:center;"><h5>Generating, please wait...</h5></div>';
				        $("#mainPage").append(tmpHtml);
				    }
	            });
		        $(window).load(function() {
	                $("#rss-content-tmp").hide();
	                $("#rss-content").show();
		            activateNativeDroid();
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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share UK Traffic News", null, null, "https://play.google.com/store/apps/details?id=com.a2054012516500c7a3ea0a3e2a.a96526417a");
    			    return false;
                });
            });
    	

				
				 $(document).ready(function() {
				     console.log("AdMob: Document ready");
					 document.addEventListener("deviceready",onDeviceReadyAdMob,false);
			     });
				
				 function onDeviceReadyAdMob() {
				     admob.setOptions( {
                         publisherId: 'ca-app-pub-7961703648762839/8544269905',
                         interstitialAdId: 'ca-app-pub-7961703648762839/7849594703',
                         adSize: admob.AD_SIZE.SMART_BANNER,
                         bannerAtTop: true, // set to true, to put banner at top
                         overlap: false, // set to true, to allow banner overlap webview
                         offsetTopBar: true, // set to true to avoid ios7 status bar overlap
                         isTesting: false, // receiving test ad
                         autoShow: true // auto show interstitial ad when loaded
                     }, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
		             
		         	 admob.createBannerView([],
		         			function(data) { 
		         			    console.log("createBannerView OK: " + data); 
		         			    adMobShowAd();
		                    }, 
		         			function(data) {console.log("createBannerView FAIL: " + data)}
		             );
		             
		             function adMobShowAd() {
		                  admob.showAd(true, 
		                      function(data) { 
		                          console.log("showAd OK: " + data);
		                          adMobRequestAd();
		                      }, 
		                      function(data) {
		                          console.log("showAd FAIL: " + data)
		                      }
		                  );
		             }
		         			
		         	 function adMobRequestAd() {
		                 admob.requestAd([], 
		         			function(data) { 
		         			    console.log("requestAd OK: " + data);
		         			   
		                    }, 
		         			function(data) {console.log("requestAd FAIL: " + data)});
		             }
		         			
		         	 document.addEventListener('onFailedToReceiveAd', function(data) { console.log("Failed to receive Ad: "+ data.error + ": " + data.reason)});
		         					         			
		         	
		         	
		         	
		         	
		         	var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
					var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
         				console.log("AdMob File loaded: " + filename);
					if(filename == "index.html") {
						var ic = Number(localStorage.getItem("ic"));
						var lastInterstitialTime = Number(localStorage.getItem("lastInterstitialTime"));
						console.log("INTERSTITIAL LOAD COUNT: " + ic);
						if(ic == undefined || isNaN(ic) || ic == NaN) {
		         	          ic = 0;
						}
						
						console.log("Last Interstitial Time: " + lastInterstitialTime);
						if(lastInterstitialTime == undefined || isNaN(lastInterstitialTime) || lastInterstitialTime == NaN) {
		         	          lastInterstitialTime = 0;
						}
						console.log("Last Interstitial load vs current time: " + lastInterstitialTime + ", " + interstitialStartTime);
						if(ic <= 1 || lastInterstitialTime + 600 < interstitialStartTime){
							localStorage.setItem("ic",3);
		         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
		         	        addInterstitial();
							/* admob.createInterstitialView([],
						         adMobShowInterstitial(),
						         function(data) {console.log("createInterstitialView FAIL: " + data)}
						    ); */
						}
						else{
							localStorage.setItem("ic", ic - 1);
						}
					
					}
					
					function addInterstitial() {
				        var successCreateBannerView = function() { console.log("addInterstitial Success"); admob.requestAd([],success,error); };
				        var success = function() { console.log("requestInterstitialAd Success"); };
				        var error = function(message) { console.log("requestInterstitialAd FAIL: " + message); };
				        
				        admob.createInterstitialView([],successCreateBannerView,error);
				    }
		         	
		         	function adMobShowInterstitial() {
		                 admob.showInterstitialAd(true,
		         			function(data) { 
		         			    console.log("showInterstitialAd OK: " + data);
		         	            
		                    }, 
		         			function(data) {
		         			    console.log("showInterstitialAd FAIL: " + data);
		         			    var interstitialNowTime = parseInt(Math.round(new Date().getTime() / 1000));
		         			    var diff = interstitialNowTime - interstitialStartTime;
		         			    console.log("diff: "+diff);
		         			    if(parseInt(data) == 99 && diff <= 10) {
		         			        adMobShowInterstitial();
		         			    }
		         			}
		         	    );
		             }
		         	
		         	
					 /*************
		         	 var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
		         	 var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
		         			console.log("AdMob File loaded: " + filename);
		         	 if(filename == "index.html") {
		         	      var interstitialCountDb = window.sessionStorage;
		         	      var ic = interstitialCountDb.getItem("ic");

		         	      if(ic == undefined || isNaN(ic) || ic == NaN) {
		         	          ic = 0;
		         	      }
		         	     console.log("INTERSTITIAL LOAD COUNT: " + ic);
		         	     
		         	    if(ic < 3) {
		         	        document.addEventListener('onReceiveInterstitialAd', function() { console.log("onReceiveInterstitialAd fired"); adMobShowInterstitial();});
		         			
		         	        admob.createInterstitialView([],
		         			    function(data) { 
		         			        console.log("createInterstitialView OK: " + data); 
		         			        adMobShowInterstitial();
		                        }, 
		         			    function(data) {console.log("createInterstitialView FAIL: " + data)}
		         	         );
		         	     }
		         	 }
		         	
		         	
		         			
		         	 function adMobShowInterstitial() {
		                 admob.showInterstitialAd(true,
		         			function(data) { 
		         			    console.log("showInterstitialAd OK: " + data); 
		         	            ic++;
		         	            interstitialCountDb.setItem("count",ic);
		                    }, 
		         			function(data) {
		         			    console.log("showInterstitialAd FAIL: " + data);
		         			    var interstitialNowTime = parseInt(Math.round(new Date().getTime() / 1000));
		         			    var diff = interstitialNowTime - interstitialStartTime;
		         			    console.log("diff: "+diff);
		         			    if(parseInt(data) == 99 && diff <= 10) {
		         			        adMobShowInterstitial();
		         			    }
		         			}
		         	    );
		             }
		             *************/	
		         	
				 }
				 

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"1E2225B8-54F2-4CFD-868A-D603E73FCC65", appname:"UK Traffic News", gcmprojectid:"760995130526"},function(status) {},function(status) {});
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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share UK Traffic News", null, null, "https://play.google.com/store/apps/details?id=com.a2054012516500c7a3ea0a3e2a.a96526417a");
    			    return false;
                });
            });
    	

				
				 $(document).ready(function() {
				     console.log("AdMob: Document ready");
					 document.addEventListener("deviceready",onDeviceReadyAdMob,false);
			     });
				
				 function onDeviceReadyAdMob() {
				     admob.setOptions( {
                         publisherId: 'ca-app-pub-7961703648762839/8544269905',
                         interstitialAdId: 'ca-app-pub-7961703648762839/7849594703',
                         adSize: admob.AD_SIZE.SMART_BANNER,
                         bannerAtTop: true, // set to true, to put banner at top
                         overlap: false, // set to true, to allow banner overlap webview
                         offsetTopBar: true, // set to true to avoid ios7 status bar overlap
                         isTesting: false, // receiving test ad
                         autoShow: true // auto show interstitial ad when loaded
                     }, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
		             
		         	 admob.createBannerView([],
		         			function(data) { 
		         			    console.log("createBannerView OK: " + data); 
		         			    adMobShowAd();
		                    }, 
		         			function(data) {console.log("createBannerView FAIL: " + data)}
		             );
		             
		             function adMobShowAd() {
		                  admob.showAd(true, 
		                      function(data) { 
		                          console.log("showAd OK: " + data);
		                          adMobRequestAd();
		                      }, 
		                      function(data) {
		                          console.log("showAd FAIL: " + data)
		                      }
		                  );
		             }
		         			
		         	 function adMobRequestAd() {
		                 admob.requestAd([], 
		         			function(data) { 
		         			    console.log("requestAd OK: " + data);
		         			   
		                    }, 
		         			function(data) {console.log("requestAd FAIL: " + data)});
		             }
		         			
		         	 document.addEventListener('onFailedToReceiveAd', function(data) { console.log("Failed to receive Ad: "+ data.error + ": " + data.reason)});
		         					         			
		         	
		         	
		         	
		         	
		         	var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
					var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
         				console.log("AdMob File loaded: " + filename);
					if(filename == "index.html") {
						var ic = Number(localStorage.getItem("ic"));
						var lastInterstitialTime = Number(localStorage.getItem("lastInterstitialTime"));
						console.log("INTERSTITIAL LOAD COUNT: " + ic);
						if(ic == undefined || isNaN(ic) || ic == NaN) {
		         	          ic = 0;
						}
						
						console.log("Last Interstitial Time: " + lastInterstitialTime);
						if(lastInterstitialTime == undefined || isNaN(lastInterstitialTime) || lastInterstitialTime == NaN) {
		         	          lastInterstitialTime = 0;
						}
						console.log("Last Interstitial load vs current time: " + lastInterstitialTime + ", " + interstitialStartTime);
						if(ic <= 1 || lastInterstitialTime + 600 < interstitialStartTime){
							localStorage.setItem("ic",3);
		         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
		         	        addInterstitial();
							/* admob.createInterstitialView([],
						         adMobShowInterstitial(),
						         function(data) {console.log("createInterstitialView FAIL: " + data)}
						    ); */
						}
						else{
							localStorage.setItem("ic", ic - 1);
						}
					
					}
					
					function addInterstitial() {
				        var successCreateBannerView = function() { console.log("addInterstitial Success"); admob.requestAd([],success,error); };
				        var success = function() { console.log("requestInterstitialAd Success"); };
				        var error = function(message) { console.log("requestInterstitialAd FAIL: " + message); };
				        
				        admob.createInterstitialView([],successCreateBannerView,error);
				    }
		         	
		         	function adMobShowInterstitial() {
		                 admob.showInterstitialAd(true,
		         			function(data) { 
		         			    console.log("showInterstitialAd OK: " + data);
		         	            
		                    }, 
		         			function(data) {
		         			    console.log("showInterstitialAd FAIL: " + data);
		         			    var interstitialNowTime = parseInt(Math.round(new Date().getTime() / 1000));
		         			    var diff = interstitialNowTime - interstitialStartTime;
		         			    console.log("diff: "+diff);
		         			    if(parseInt(data) == 99 && diff <= 10) {
		         			        adMobShowInterstitial();
		         			    }
		         			}
		         	    );
		             }
		         	
		         	
					 /*************
		         	 var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
		         	 var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
		         			console.log("AdMob File loaded: " + filename);
		         	 if(filename == "index.html") {
		         	      var interstitialCountDb = window.sessionStorage;
		         	      var ic = interstitialCountDb.getItem("ic");

		         	      if(ic == undefined || isNaN(ic) || ic == NaN) {
		         	          ic = 0;
		         	      }
		         	     console.log("INTERSTITIAL LOAD COUNT: " + ic);
		         	     
		         	    if(ic < 3) {
		         	        document.addEventListener('onReceiveInterstitialAd', function() { console.log("onReceiveInterstitialAd fired"); adMobShowInterstitial();});
		         			
		         	        admob.createInterstitialView([],
		         			    function(data) { 
		         			        console.log("createInterstitialView OK: " + data); 
		         			        adMobShowInterstitial();
		                        }, 
		         			    function(data) {console.log("createInterstitialView FAIL: " + data)}
		         	         );
		         	     }
		         	 }
		         	
		         	
		         			
		         	 function adMobShowInterstitial() {
		                 admob.showInterstitialAd(true,
		         			function(data) { 
		         			    console.log("showInterstitialAd OK: " + data); 
		         	            ic++;
		         	            interstitialCountDb.setItem("count",ic);
		                    }, 
		         			function(data) {
		         			    console.log("showInterstitialAd FAIL: " + data);
		         			    var interstitialNowTime = parseInt(Math.round(new Date().getTime() / 1000));
		         			    var diff = interstitialNowTime - interstitialStartTime;
		         			    console.log("diff: "+diff);
		         			    if(parseInt(data) == 99 && diff <= 10) {
		         			        adMobShowInterstitial();
		         			    }
		         			}
		         	    );
		             }
		             *************/	
		         	
				 }
				 

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"1E2225B8-54F2-4CFD-868A-D603E73FCC65", appname:"UK Traffic News", gcmprojectid:"760995130526"},function(status) {},function(status) {});
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
				              window.open(goUrl, "_blank", "location=yes");
                             return false;
                          });
                        
                          $("a.open-external-browser").click(function() {
                              var goUrl = $(this).attr("data-gourl");
				              ref = window.open(goUrl, "_system", "location=yes");
                              return false;
                          });
                      }
                  

    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share UK Traffic News", null, null, "https://play.google.com/store/apps/details?id=com.a2054012516500c7a3ea0a3e2a.a96526417a");
    			    return false;
                });
            });
    	

				
				 $(document).ready(function() {
				     console.log("AdMob: Document ready");
					 document.addEventListener("deviceready",onDeviceReadyAdMob,false);
			     });
				
				 function onDeviceReadyAdMob() {
				     admob.setOptions( {
                         publisherId: 'ca-app-pub-7961703648762839/8544269905',
                         interstitialAdId: 'ca-app-pub-7961703648762839/7849594703',
                         adSize: admob.AD_SIZE.SMART_BANNER,
                         bannerAtTop: true, // set to true, to put banner at top
                         overlap: false, // set to true, to allow banner overlap webview
                         offsetTopBar: true, // set to true to avoid ios7 status bar overlap
                         isTesting: false, // receiving test ad
                         autoShow: true // auto show interstitial ad when loaded
                     }, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
		             
		         	 admob.createBannerView([],
		         			function(data) { 
		         			    console.log("createBannerView OK: " + data); 
		         			    adMobShowAd();
		                    }, 
		         			function(data) {console.log("createBannerView FAIL: " + data)}
		             );
		             
		             function adMobShowAd() {
		                  admob.showAd(true, 
		                      function(data) { 
		                          console.log("showAd OK: " + data);
		                          adMobRequestAd();
		                      }, 
		                      function(data) {
		                          console.log("showAd FAIL: " + data)
		                      }
		                  );
		             }
		         			
		         	 function adMobRequestAd() {
		                 admob.requestAd([], 
		         			function(data) { 
		         			    console.log("requestAd OK: " + data);
		         			   
		                    }, 
		         			function(data) {console.log("requestAd FAIL: " + data)});
		             }
		         			
		         	 document.addEventListener('onFailedToReceiveAd', function(data) { console.log("Failed to receive Ad: "+ data.error + ": " + data.reason)});
		         					         			
		         	
		         	
		         	
		         	
		         	var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
					var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
         				console.log("AdMob File loaded: " + filename);
					if(filename == "index.html") {
						var ic = Number(localStorage.getItem("ic"));
						var lastInterstitialTime = Number(localStorage.getItem("lastInterstitialTime"));
						console.log("INTERSTITIAL LOAD COUNT: " + ic);
						if(ic == undefined || isNaN(ic) || ic == NaN) {
		         	          ic = 0;
						}
						
						console.log("Last Interstitial Time: " + lastInterstitialTime);
						if(lastInterstitialTime == undefined || isNaN(lastInterstitialTime) || lastInterstitialTime == NaN) {
		         	          lastInterstitialTime = 0;
						}
						console.log("Last Interstitial load vs current time: " + lastInterstitialTime + ", " + interstitialStartTime);
						if(ic <= 1 || lastInterstitialTime + 600 < interstitialStartTime){
							localStorage.setItem("ic",3);
		         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
		         	        addInterstitial();
							/* admob.createInterstitialView([],
						         adMobShowInterstitial(),
						         function(data) {console.log("createInterstitialView FAIL: " + data)}
						    ); */
						}
						else{
							localStorage.setItem("ic", ic - 1);
						}
					
					}
					
					function addInterstitial() {
				        var successCreateBannerView = function() { console.log("addInterstitial Success"); admob.requestAd([],success,error); };
				        var success = function() { console.log("requestInterstitialAd Success"); };
				        var error = function(message) { console.log("requestInterstitialAd FAIL: " + message); };
				        
				        admob.createInterstitialView([],successCreateBannerView,error);
				    }
		         	
		         	function adMobShowInterstitial() {
		                 admob.showInterstitialAd(true,
		         			function(data) { 
		         			    console.log("showInterstitialAd OK: " + data);
		         	            
		                    }, 
		         			function(data) {
		         			    console.log("showInterstitialAd FAIL: " + data);
		         			    var interstitialNowTime = parseInt(Math.round(new Date().getTime() / 1000));
		         			    var diff = interstitialNowTime - interstitialStartTime;
		         			    console.log("diff: "+diff);
		         			    if(parseInt(data) == 99 && diff <= 10) {
		         			        adMobShowInterstitial();
		         			    }
		         			}
		         	    );
		             }
		         	
		         	
					 /*************
		         	 var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
		         	 var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
		         			console.log("AdMob File loaded: " + filename);
		         	 if(filename == "index.html") {
		         	      var interstitialCountDb = window.sessionStorage;
		         	      var ic = interstitialCountDb.getItem("ic");

		         	      if(ic == undefined || isNaN(ic) || ic == NaN) {
		         	          ic = 0;
		         	      }
		         	     console.log("INTERSTITIAL LOAD COUNT: " + ic);
		         	     
		         	    if(ic < 3) {
		         	        document.addEventListener('onReceiveInterstitialAd', function() { console.log("onReceiveInterstitialAd fired"); adMobShowInterstitial();});
		         			
		         	        admob.createInterstitialView([],
		         			    function(data) { 
		         			        console.log("createInterstitialView OK: " + data); 
		         			        adMobShowInterstitial();
		                        }, 
		         			    function(data) {console.log("createInterstitialView FAIL: " + data)}
		         	         );
		         	     }
		         	 }
		         	
		         	
		         			
		         	 function adMobShowInterstitial() {
		                 admob.showInterstitialAd(true,
		         			function(data) { 
		         			    console.log("showInterstitialAd OK: " + data); 
		         	            ic++;
		         	            interstitialCountDb.setItem("count",ic);
		                    }, 
		         			function(data) {
		         			    console.log("showInterstitialAd FAIL: " + data);
		         			    var interstitialNowTime = parseInt(Math.round(new Date().getTime() / 1000));
		         			    var diff = interstitialNowTime - interstitialStartTime;
		         			    console.log("diff: "+diff);
		         			    if(parseInt(data) == 99 && diff <= 10) {
		         			        adMobShowInterstitial();
		         			    }
		         			}
		         	    );
		             }
		             *************/	
		         	
				 }
				 

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"1E2225B8-54F2-4CFD-868A-D603E73FCC65", appname:"UK Traffic News", gcmprojectid:"760995130526"},function(status) {},function(status) {});
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
                                       moreclass: "open-external-browser",
	                              };
				
				$("#rss-content").rssfeed("http://hatrafficinfo.dft.gov.uk/feeds/rss/AllEvents.xml", zRssOptions,
	                               function() {
	                                   $.mobile.loading("hide");
						               resizeRssImages();
	                               }
	                       );
        });
		
                
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=blogFeeds&appId=2054012516500c7a3ea0a3e2.96526417\"/>");}).fail(function( jqxhr, textStatus, error ) {});


			    $(document).ready(function() {
				    //RSS card generation
	                $("#rss-content").hide();
				    if($("#rss-content").length) {
				        var tmpHtml = '<div data-role="content" data-theme="b" class="inner_main" id="rss-content-tmp" style="text-align:center;"><h5>Generating, please wait...</h5></div>';
				        $("#mainPage").append(tmpHtml);
				    }
	            });
		        $(window).load(function() {
	                $("#rss-content-tmp").hide();
	                $("#rss-content").show();
		            activateNativeDroid();
		        });
		    



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
                

var __mainDiv;
 var __preLoaderHTML;
 var __opts;

 $(document).ready(function() {
     $.mobile.loading( "show", {
         text: "Loading, please wait...",
         textVisible: true
     });
 });
 
 function __jQueryYouTubeChannelReceiveData(data,deviceType) {

	 $.mobile.loading( "hide");
	 
     var cnt = 0;
     $.each(data.feed.entry, function(i, e) {
         if (cnt < __opts.numberToDisplay) {
             var vidUrl=e.link[0].href;
             vidUrl=(vidUrl.replace(/www.youtube.com/gi, "m.youtube.com"));
			 var videoId=(vidUrl.replace(/m.youtube.com/gi, "i.ytimg.com"));
			 videoId=(videoId.replace(/watch\?v=/gi, "vi/"));
			 videoId=(videoId.replace(/&feature=youtube_gdata/gi, ""));
			// alert(videoId);
             var parts = e.id.$t.split('/');
             //var videoId = parts[parts.length-1];
			 //alert(videoId);
		 vidUrl=encodeURIComponent(vidUrl);
 			 var out = '<li class="ui-li ui-li-static ui-body-c"><center><p class="ui-li-desc"><br><a href="cbgw.html?goUrl=' + 
             vidUrl + '" rel="external"><img src="' + 
             //videoId + '/2.jpg"/ width="240px" height="180px"></a></p><p class="ui-li-desc"><a href="cbgw.html?goUrl=' + 
             videoId + '/hqdefault.jpg"/ width="240px"></a></p><p class="ui-li-desc"><a href="cbgw.html?goUrl=' +  
             vidUrl + '" rel="external">' + e.title.$t + '</a></p></center></li>';
			
			 
            
             if (!__opts.hideAuthor) {
                 out = out + 'Author: ' + e.author[0].name.$t + '';
             }
             out = out + '</center></p>';
             __mainDiv.append(out);
             cnt = cnt + 1;
         }
     });
            
    // Open in new tab?
    if (__opts.linksInNewWindow) {
        $(__mainDiv).find("li > a").attr("target", "_blank");
    }
    
    // Remove the preloader and show the content
    $(__preLoaderHTML).remove();
    __mainDiv.show();
}
                
(function($) {
    $.fn.youTubeChannel = function(options) {
        var videoDiv = $(this);

        $.fn.youTubeChannel.defaults = {
            userName: null,
            channel: "uploads", //options are favorites or uploads
            loadingText: "Loading...",
            numberToDisplay: 3,
            linksInNewWindow: true,
            hideAuthor: false
        }

        __opts = $.extend({}, $.fn.youTubeChannel.defaults, options);

        return this.each(function() {
            if (__opts.userName != null) {
                videoDiv.append("<ul id=\"linksList\" class=\"ui-listview ui-listview-inset ui-corner-all ui-shadow\" data-inset=\"true\" data-role=\"listview\"></ul>");
                __mainDiv = $("#linksList");
                __mainDiv.hide();

                __preLoaderHTML = $("<p class=\"loader\">" + 
                    __opts.loadingText + "</p>");
                videoDiv.append(__preLoaderHTML);

                // TODO: Error handling!
                $.ajax({
                 //   url: "http://gdata.youtube.com/feeds/base/users/" + __opts.userName + "/" + __opts.channel + "?alt=json",
						url: "http://gdata.youtube.com/feeds/api/videos?q=" + __opts.userName + "&max-results=10&v=2&alt=json",
                    cache: true,
                    dataType: 'jsonp',                    
                    success: __jQueryYouTubeChannelReceiveData
                });
            }
        });
    };
})(jQuery);


/**
 * Phonegap Web Intent plugin
 * Copyright (c) Boris Smus 2010
 *
 */
var WebIntent = function() { 

};

WebIntent.ACTION_SEND = "android.intent.action.SEND";
WebIntent.ACTION_SENDTO = "android.content.Intent.ACTION_SENDTO";
WebIntent.ACTION_VIEW= "android.intent.action.VIEW";
WebIntent.EXTRA_TEXT = "android.intent.extra.TEXT";
WebIntent.EXTRA_SUBJECT = "android.intent.extra.SUBJECT";
WebIntent.EXTRA_STREAM = "android.intent.extra.STREAM";
WebIntent.EXTRA_EMAIL = "android.intent.extra.EMAIL";

WebIntent.prototype.startActivity = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'startActivity', [params]);
};

WebIntent.prototype.hasExtra = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'hasExtra', [params]);
};

WebIntent.prototype.getUri = function(success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getUri', []);
};

WebIntent.prototype.getExtra = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getExtra', [params]);
};


WebIntent.prototype.onNewIntent = function(callback) {
	return cordova.exec(function(args) {
		callback(args);
    }, function(args) {
    }, 'WebIntent', 'onNewIntent', []);
};

WebIntent.prototype.sendBroadcast = function(params, success, fail) {
    return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'sendBroadcast', [params]);
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.webintent) {
    window.plugins.webintent = new WebIntent();
}


//PhoneGap.addConstructor(function() {
//	PhoneGap.addPlugin('webintent', new WebIntent());
//});




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

app.initialize();


$(document).on("pageinit", function() {
    activateNativeDroid();
});

function activateNativeDroid() {
	function strip_tags(input, allowed) {
		allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
		// making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
		var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
		return input.replace(commentsAndPhpTags, '').replace(tags, function($0, $1) {
			return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
		});
	}

	// Vars

	var initialTime = new Date().getTime();

	// Obj

	nativeDroid = {
		basic : {
			dateFormat : {
				language : {
					set : "en",
					type : "short",
					en : {
						dayShort : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
						dayLong : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
						monthShort : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
						monthLong : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
						order : function(day, dayStr, date, month, monthStr, year) {
							return dayStr + ", " + monthStr + " " + date;
						}
					},
					de : {
						dayShort : ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
						dayLong : ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
						monthShort : ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
						monthLong : ["Januar", "Februar", "M&auml;rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
						order : function(day, dayStr, date, month, monthStr, year) {
							return dayStr + ", " + date + ". " + monthStr + " " + year;
						}
					}
				},
				getTodayString : function(day, date, month, year) {
					dfLang = nativeDroid.basic.dateFormat.language;
					type = dfLang.type;
					lang = dfLang.set;
					retStr = "--empty-string--";
					if (type == "long") {
						dayStr = dfLang[lang].dayLong[day];
						monthStr = dfLang[lang].monthLong[month];
					} else if (type == "short") {
						dayStr = dfLang[lang].dayShort[day];
						monthStr = dfLang[lang].monthShort[month];
					}
					retStr = dfLang[lang].order(day, dayStr, date, month, monthStr, year);
					return retStr;
				},
				format : function(dateStr) {
					d = new Date(dateStr);
					return nativeDroid.basic.dateFormat.getTodayString(d.getDay(), d.getDate(), d.getMonth(), d.getFullYear());
				}
			},
			touchEvent : function() {
				return ('ontouchstart' in document.documentElement) ? "touchstart" : "click";
			},
			disableScrollTop : function() {
				$(window).scrollTop(1);
				$(window).on("scroll", function() {
					if ($(window).scrollTop() <= 0) {
						$(window).scrollTop(1);
					}
				});
			}
		},
		design : {
			animation : {
				delayedFadeIn : function() {
					obj = $(".delayedFadeIn");
					if (obj) {
						if (obj.length > 0) {
							delay = 2750;
							setTimeout(function() {
								$(".delayedFadeIn:last").fadeIn(1000).removeClass('delayedFadeIn');
								nativeDroid.design.animation.delayedFadeIn();
							}, delay);
						}
					}
				}
			},
			progress : {
				loaded : false,
				ini : function() {
					$("body").prepend("<progress id='nativeDroidProgress' data-animation-time='5' value='0' max='100' class='nativeDroidProgress'></progress>");
					$(".ui-header").addClass("noborder");
					$(".nativeDroidProgress").attr("data-animation-time", 0).attr("value", 0);
					setTimeout(function() {
						nativeDroid.design.progress.createCSS($("body").data("nativedroid-progress-animation"));
						$(".nativeDroidProgress").attr("data-animation-time", 5).attr("value", 100);
					}, 300);
				},
				update : function(time) {
					roundedTime = (time % 5) >= 2.5 ? parseInt(time / 5) * 5 + 5 : parseInt(time / 5) * 5;
					nativeDroid.design.progress.createCSS(0);
					$(".nativeDroidProgress").attr("data-animation-time", 0).attr("value", 0);
					setTimeout(function() {
						$(".nativeDroidProgress").attr("data-animation-time", roundedTime);
						nativeDroid.design.progress.createCSS($(".nativeDroidProgress").attr("data-animation-time"));
						$(".nativeDroidProgress").attr("value", 100);
					}, 300);
				},
				blink : function() {
					$(".nativeDroidProgress").fadeTo(500, 0.5, function() {
						$(".nativeDroidProgress").fadeTo(500, 1);
					});
				},
				createCSS : function(time) {
					s = '.nativeDroidProgress::-webkit-progress-value { -webkit-transition: all ' + time + 's !important; }';
					s += '.nativeDroidProgress::-moz-progress-bar { -moz-transition: all ' + time + 's !important; }';
					$("#progressLoadeStyle").remove();
					$("<style type='text/css' id='progressLoaderStyle'> " + s + " </style>").appendTo("head");
				}
			}
		},
		plugins : {
			cards : {
				ini : function(obj) {
					obj.addClass("nativeDroidCards");
					obj.find(" > li").each(function() {
						type = $(this).attr('data-cards-type');
						nativeDroid.plugins.cards.create[type]($(this));
					});
				},
				create : {
					text : function(obj) {
						console.log("text");
					},
					traffic : function(obj) {
						route = obj.data("cards-traffic-route");
						obj.find(".map").html("Display a route-map here [from: " + route.from + ", to: " + route.to + "]");
						route.container = obj.find(".map").get(0);
						nativeDroid.api.helper.googlemaps.directions.getRoute(route);
					},
					weather : function(obj) {
						console.log("weather");
					},
					publictransport : function(obj) {
						console.log("publictransport");
					},
					sports : function(obj) {
						console.log("sports");
					}
				}
			},
			twitter : {
				container : false,
				results : {
					count : 0,
					rpmin : 0,
					first : 0,
					last : 0,
					pendingResults : [],
					update : function(count) {

						nativeDroid.plugins.twitter.results.count += count;
						lastResult = new Date().getTime() / 1000;

						firstResult = nativeDroid.plugins.twitter.results.first;
						nativeDroid.plugins.twitter.results.first = (firstResult == 0) ? nativeDroid.plugins.twitter.results.last : firstResult;
						nativeDroid.plugins.twitter.results.last = lastResult;

						// Calc RPM
						results = nativeDroid.plugins.twitter.results.count;
						rpm = Math.round(results / ((lastResult - firstResult) / 60));
						nativeDroid.plugins.twitter.results.rpmin = rpm;

						// Update Refresh Timer
						qd = nativeDroid.plugins.twitter.request.queryData;
						rpp = (qd.rpp) ? parseInt(qd.rpp) : 15;
						if (rpm > 0.5) {
							ad = ((rpp * 0.8) / rpm) * 60000;
							if (ad > 10000 && ad < 120000) {
								nativeDroid.plugins.twitter.refresh.time = ad;
							}
						}
					}
				},
				refresh : {
					url : false,
					time : false,
					auto_delay : 45000,
					load : function() {
						nativeDroid.design.progress.update(nativeDroid.plugins.twitter.refresh.time / 1000);
						if (nativeDroid.plugins.twitter.refresh.time > 10000 && nativeDroid.plugins.twitter.refresh.url) {
							nativeDroid.api.get("jsonp", nativeDroid.plugins.twitter.request.queryURL + nativeDroid.plugins.twitter.refresh.url, false, nativeDroid.plugins.twitter.append);
							setTimeout(nativeDroid.plugins.twitter.refresh.load, nativeDroid.plugins.twitter.refresh.time);
						} else {
							console.log("Refresh timer invalid or refresh URL not set.");
						}
						logDate = new Date();
					}
				},
				request : {
					search : {
						q : {
							"parameter" : "q",
							"required" : true,
							"value" : false
						},
						callback : {
							"parameter" : "callback",
							"required" : false,
							"value" : false
						},
						geocode : {
							"parameter" : "geocode",
							"required" : false,
							"value" : false
						},
						lang : {
							"parameter" : "lang",
							"required" : false,
							"value" : false
						},
						locale : {
							"parameter" : "locale",
							"required" : false,
							"value" : false
						},
						page : {
							"parameter" : "page",
							"required" : false,
							"value" : false
						},
						result_type : {
							"parameter" : "result_type",
							"required" : false,
							"value" : false
						},
						rpp : {
							"parameter" : "rpp",
							"required" : false,
							"value" : false
						},
						show_user : {
							"parameter" : "show_user",
							"required" : false,
							"value" : false
						},
						until : {
							"parameter" : "until",
							"required" : false,
							"value" : false
						},
						since_id : {
							"parameter" : "since_id",
							"required" : false,
							"value" : false
						},
						max_id : {
							"parameter" : "max_id",
							"required" : false,
							"value" : false
						},
						include_entities : {
							"parameter" : "include_entities",
							"required" : false,
							"value" : false
						},
					},
					queryURL : false,
					queryData : false,
					prepareQuery : function() {
						obj = nativeDroid.plugins.twitter.container;
						nativeDroid.plugins.twitter.request.queryData = obj.data('nativedroid-twitter-get');
					}
				},
				ini : function(obj) {
					nativeDroid.plugins.twitter.container = obj;
					t = obj.attr('data-nativedroid-twitter-type');
					nativeDroid.plugins.twitter.load(t);

					// Power up the scrollbar:
					if (nativeDroid.plugins.twitter.container.attr('data-nativedroid-twitter-refresh') != "false") {
						nativeDroid.design.progress.ini();
					}

					// Init refresh
					refreshTime = nativeDroid.plugins.twitter.container.attr('data-nativedroid-twitter-refresh');
					if (refreshTime && refreshTime != "false") {
						nativeDroid.plugins.twitter.refresh.time = (refreshTime != "auto") ? parseInt(refreshTime) : nativeDroid.plugins.twitter.refresh.auto_delay;
						setTimeout(nativeDroid.plugins.twitter.refresh.load, parseInt(nativeDroid.plugins.twitter.refresh.time));
					}
				},
				apiUrl : {
					search : "http://search.twitter.com/search.json"
				},
				load : function(type) {
					nativeDroid.plugins.twitter.request.prepareQuery();
					nativeDroid.plugins.twitter.request.queryURL = this.apiUrl[type];
					nativeDroid.api.get("jsonp", this.request.queryURL, this.request.queryData, this.append);
					nativeDroid.plugins.twitter.populate();
				},
				populate : function() {
					setInterval(function() {
						p = nativeDroid.plugins.twitter.results.pendingResults;
						if (p && p.length > 0) {
							nativeDroid.design.progress.blink();
							nativeDroid.plugins.twitter.container.prepend(p[0]);
							nativeDroid.plugins.twitter.results.pendingResults.splice(0, 1);
							$('.ui-page-active .ui-listview').listview('refresh');
						}
					}, 3000);
				},
				append : function(data) {
					if (data) {
						nativeDroid.plugins.twitter.refresh.url = (data.refresh_url) ? data.refresh_url : nativeDroid.plugins.twitter.refresh.url;
						data = (data.results) ? data.results : data;

						anz = data.length;
						// Update Result Count
						nativeDroid.plugins.twitter.results.update(anz);

						if (anz > 0) {
							for ( i = 0; i < anz; i++) {
								entity = data[i];
								html = "";
								html += "<li>";
								html += "<img src='" + entity.profile_image_url + "'>";
								html += "<h2><a href='http://www.twitter.com/" + entity.from_user + "' data-ajax='false' target='_blank'>" + entity.from_user_name + "</a></h2>";
								html += "<p>" + entity.text + "</p>";
								//										html += "<p class='ui-li-aside ui-li-desc'>"+nativeDroid.basic.dateFormat.format(entity.created_at)+"</p>";
								html += "</li>";
								toTimer = i * 1000;
								nativeDroid.plugins.twitter.results.pendingResults.splice(0, 0, html);
							}
						}
					}

				}
			},
			flickr : {
				container : false,
				apiKey : false,
				dragStarted : false,
				dragStartX : 0,
				lastSwipe : false,
				request : {
					queryData : false,
					apiUrl : "http://api.flickr.com/services/rest/?method=flickr.",
					requestUrl : false,
					cat : false,
					method : false,
					parameter : false,
					prepareQuery : function() {
						obj = nativeDroid.plugins.flickr.container;
						cat = obj.data("nativedroid-flickr-cat");
						method = obj.data("nativedroid-flickr-method");
						apikey = obj.data("nativedroid-flickr-apikey");
						parameter = obj.data("nativedroid-flickr-parameter");

						nativeDroid.plugins.flickr.request.cat = cat;
						nativeDroid.plugins.flickr.request.method = method;
						nativeDroid.plugins.flickr.request.parameter = parameter;

						nativeDroid.plugins.flickr.request.requestUrl = nativeDroid.plugins.flickr.request.apiUrl + cat + "." + method + "&api_key=" + apikey + "&nojsoncallback=1&format=json&" + parameter;
					}
				},
				bindEvents : function() {
					$(".ui-page").on("click", ".nativeDroidGallery li:not('.active')", function() {

						lastSwipe = nativeDroid.plugins.flickr.lastSwipe;
						nativeDroid.plugins.flickr.dragStarted = false;

						orig = $(this);
						$(".overlay").show();

						if (!lastSwipe) {
							$(this).addClass("active");
						} else if (lastSwipe == "left") {
							$(this).addClass("active").addClass("noTransition").addClass("slideRight");
							setTimeout(function() {
								orig.removeClass("noTransition").removeClass("slideRight");
							}, 1);
						} else if (lastSwipe == "right") {
							$(this).addClass("active").addClass("noTransition").addClass("slideLeft");
							setTimeout(function() {
								orig.removeClass("noTransition").removeClass("slideLeft");
							}, 1);
						}

						$(this).css({
							"background-image" : "url('" + $(this).data("image-thumb") + "')"
						});

						$(this).css({
							"background-image" : "url('" + $(this).data("image-large") + "')"
						});

					}).on("mousedown touchstart", ".nativeDroidGallery li.active .closeTrigger", function() {
						$(this).parent().removeClass("active");
						$(".overlay").hide();
					}).on("swipeleft", ".nativeDroidGallery li.active:not('.zoom')", function(e) {
						e.preventDefault();
						var orig = $(this);
						orig.addClass("slideLeft");
						setTimeout(function() {
							orig.removeClass("active").css({
								"left" : "auto"
							}).removeClass("slideLeft").removeClass("slideRight");
						}, 500);
						next = $(this).next("li");
						if (next.length == 1) {
							nativeDroid.plugins.flickr.lastSwipe = "left";
							next.trigger("click");
						} else {
							nativeDroid.plugins.flickr.lastSwipe = false;
							$(".overlay").hide();
						}

						// Re-Apply thumbnail

						thumb = orig.data("image-thumb");
						$(this).css({
							"background-image" : "url('" + thumb + "')"
						});

					}).on("swiperight", ".nativeDroidGallery li.active:not('.zoom')", function(e) {
						e.preventDefault();

						var orig = $(this);

						orig.addClass("slideRight");
						setTimeout(function() {
							orig.removeClass("active").css({
								"left" : "auto"
							}).removeClass("slideLeft").removeClass("slideRight");
						}, 500);
						prev = $(this).prev("li");
						if (prev.length == 1) {
							nativeDroid.plugins.flickr.lastSwipe = "right";
							prev.trigger("click");
						} else {
							nativeDroid.plugins.flickr.lastSwipe = false;
							$(".overlay").hide();
						}

						// Re-Apply thumbnail

						thumb = orig.data("image-thumb");
						$(this).css({
							"background-image" : "url('" + thumb + "')"
						});

					}).on("mousedown touchstart", ".nativeDroidGallery li.active:not('.zoom')", function(e) {
						nativeDroid.plugins.flickr.dragStartX = (e.type == "touchstart") ? e.originalEvent.touches[0].screenX : e.screenX;
						nativeDroid.plugins.flickr.dragStarted = true;
						$(this).addClass("noTransition");
					}).on("mouseup touchend", ".nativeDroidGallery li.active:not('.zoom')", function(e) {
						$(this).removeClass("noTransition").css({
							"left" : "auto"
						});
						nativeDroid.plugins.flickr.dragStarted = false;
					}).on("mousemove touchmove", ".nativeDroidGallery li.active:not('.zoom')", function(e) {
						e.preventDefault();
						mousedown = nativeDroid.plugins.flickr.dragStarted;
						if (mousedown) {
							distance = (e.type == "touchmove") ? parseInt(e.originalEvent.touches[0].screenX) - parseInt(nativeDroid.plugins.flickr.dragStartX) : e.screenX - nativeDroid.plugins.flickr.dragStartX;
							if (distance > 30 || distance < -30) {
								$(this).css("left", distance + "px");
							}
						}
					}).on("click", ".nativeDroidGallerySetList li a", function(e) {
						e.preventDefault();
						setId = $(this).data("photoset-id");

						if (setId && !isNaN(setId)) {
							nativeDroid.plugins.flickr.request.cat = "photosets";
							nativeDroid.plugins.flickr.request.method = "getPhotos";
							reqUrl = nativeDroid.plugins.flickr.request.apiUrl + "photosets.getPhotos&api_key=" + nativeDroid.plugins.flickr.apiKey + "&photoset_id=" + setId + "&nojsoncallback=1&format=json&extras=description,date_upload,geo,views,url_sq,url_l,url_t";
							$("div[data-role='header'] h1").text($(this).text());
							cLink = $("div[data-role='header'] a.ui-btn:first").attr("href");
							$("div[data-role='header'] a.ui-btn:first").attr("href", cLink + "#flickr-back-to-setlist");

							new nativeDroid.api.get("json", reqUrl, false, nativeDroid.plugins.flickr.parseData);
						} else {
							console.log("SetId is not a Number");
						}
					});

					$("div[data-role='header']").on("click", "a[href$='flickr-back-to-setlist']", function(e) {
						e.preventDefault();
						$("div[data-role='header'] h1").text(document.title);
						href = $(this).attr('href');
						hrefArr = href.split("#flickr-back-to-setlist");
						$("div[data-role='header'] a.ui-btn:first").attr("href", hrefArr[0]);
						$(".nativeDroidGallerySet").remove();
						$(".nativeDroidGallerySetList").removeClass("slideLeft");
					});

				},
				ini : function(obj) {
					nativeDroid.plugins.flickr.container = obj;
					nativeDroid.plugins.flickr.apiKey = obj.data("nativedroid-flickr-apikey");
					new nativeDroid.plugins.flickr.load();
					nativeDroid.plugins.flickr.bindEvents();
				},
				load : function() {
					nativeDroid.plugins.flickr.request.prepareQuery();
					new nativeDroid.api.get("json", nativeDroid.plugins.flickr.request.requestUrl, nativeDroid.plugins.flickr.request.queryData, nativeDroid.plugins.flickr.parseData);
				},
				delayedAppend : function(cont, html, time) {
					setTimeout(function() {
						cont.append(html);
					}, time);
				},
				parseByType : {
					photos : {
						search : function(data) {

							nativeDroid.plugins.flickr.container.addClass("nativeDroidGallery");
							nativeDroid.plugins.flickr.container.append("<div class='overlay'></div>");

							if (data.photos) {
								var cont = nativeDroid.plugins.flickr.container;
								for ( i = 0; i < data.photos.photo.length; i++) {
									p = data.photos.photo[i];
									html = "<li style='background-image:url(\"" + p.url_t + "\")' data-image-large='" + p.url_l + "' data-image-thumb='" + p.url_t + "'><div class='closeTrigger'><i class='icon-remove'></i> close</div><span>" + p.title + "</span></li>";
									nativeDroid.plugins.flickr.delayedAppend(cont, html, i * 50);
								}
							}
						}
					},
					photosets : {
						getList : function(data) {
							nativeDroid.plugins.flickr.container.addClass("nativeDroidGallerySetList");
							if (data.photosets) {
								html = "";
								var cont = nativeDroid.plugins.flickr.container;
								for ( i = 0; i < data.photosets.photoset.length; i++) {
									set = data.photosets.photoset[i];
									html += "<li class='flickrGalleryLoad'><a href='#load-photoset-flickr-" + set.id + "' data-photoset-id='" + set.id + "' data-ajax='false'>" + set.title._content + "</a></li>";
								}
								cont.append(html);
								$('.ui-page-active .ui-listview').listview('refresh');
							}
						},
						getPhotos : function(data) {
							$(".nativeDroidGallerySetList").addClass("slideLeft");
							if (data.photoset) {
								var html = "";
								html += "<div class='nativeDroidGallerySet'><ul class='nativeDroidGallery'>";
								for ( i = 0; i < data.photoset.photo.length; i++) {
									p = data.photoset.photo[i];
									html += "<li style='background-image:url(\"" + p.url_t + "\")' data-image-large='" + p.url_l + "' data-image-thumb='" + p.url_t + "'><div class='closeTrigger'><i class='icon-remove'></i> close</div><span>" + p.title + "</span></li>";
								}
								html += "<div class='overlay'></div></ul></div>";
								$(".nativeDroidGallerySet").remove();
								$(".nativeDroidGallerySetList").after(html);
							}
						}
					}
				},
				parseData : function(ret) {
					if (ret) {
						if (ret.stat == "ok") {

							cat = nativeDroid.plugins.flickr.request.cat;
							method = nativeDroid.plugins.flickr.request.method;
							if ( typeof nativeDroid.plugins.flickr.parseByType[cat] != "undefined") {
								if ( typeof nativeDroid.plugins.flickr.parseByType[cat][method] != "undefined") {
									new nativeDroid.plugins.flickr.parseByType[cat][method](ret);
								} else {
									console.log("There no data parser for " + cat + "." + method);
								}
							} else {
								console.log("There no data parser for " + cat + "." + method);
							}
						} else {
							console.log("There is an error. Code: " + ret.stat);
						}
					} else {
						console.log("No data received. Check your request.");
					}
				}
			},
			gallery : {
				lastSwipe : false,
				dragStarted : false,
				dragStartX : 0,
				bindEvents : function() {
					$(".ui-page").on("click", ".nativeDroidGallery li:not('.active')", function() {

						lastSwipe = nativeDroid.plugins.gallery.lastSwipe;
						nativeDroid.plugins.gallery.dragStarted = false;

						orig = $(this);
						$(".overlay").show();

						if (!lastSwipe) {
							$(this).addClass("active");
						} else if (lastSwipe == "left") {
							$(this).addClass("active").addClass("noTransition").addClass("slideRight");
							setTimeout(function() {
								orig.removeClass("noTransition").removeClass("slideRight");
							}, 1);
						} else if (lastSwipe == "right") {
							$(this).addClass("active").addClass("noTransition").addClass("slideLeft");
							setTimeout(function() {
								orig.removeClass("noTransition").removeClass("slideLeft");
							}, 1);
						}

						$(this).css({
							"background-image" : "url('" + $(this).data("image-thumb") + "')"
						});

						$(this).css({
							"background-image" : "url('" + $(this).data("image-large") + "')"
						});

					}).on("mousedown touchstart", ".nativeDroidGallery li.active .closeTrigger", function() {
						$(this).parent().removeClass("active");
						$(".overlay").hide();
					}).on("swipeleft", ".nativeDroidGallery li.active:not('.zoom')", function(e) {
						e.preventDefault();
						var orig = $(this);
						orig.addClass("slideLeft");
						setTimeout(function() {
							orig.removeClass("active").css({
								"left" : "auto"
							}).removeClass("slideLeft").removeClass("slideRight");
						}, 500);
						next = $(this).next("li");
						if (next.length == 1) {
							nativeDroid.plugins.gallery.lastSwipe = "left";
							next.trigger("click");
						} else {
							nativeDroid.plugins.gallery.lastSwipe = false;
							$(".overlay").hide();
						}

						// Re-Apply thumbnail

						thumb = orig.data("image-thumb");
						$(this).css({
							"background-image" : "url('" + thumb + "')"
						});

					}).on("swiperight", ".nativeDroidGallery li.active:not('.zoom')", function(e) {
						e.preventDefault();

						var orig = $(this);

						orig.addClass("slideRight");
						setTimeout(function() {
							orig.removeClass("active").css({
								"left" : "auto"
							}).removeClass("slideLeft").removeClass("slideRight");
						}, 500);
						prev = $(this).prev("li");
						if (prev.length == 1) {
							nativeDroid.plugins.gallery.lastSwipe = "right";
							prev.trigger("click");
						} else {
							nativeDroid.plugins.gallery.lastSwipe = false;
							$(".overlay").hide();
						}

						// Re-Apply thumbnail

						thumb = orig.data("image-thumb");
						$(this).css({
							"background-image" : "url('" + thumb + "')"
						});

					}).on("mousedown touchstart", ".nativeDroidGallery li.active:not('.zoom')", function(e) {
						nativeDroid.plugins.gallery.dragStartX = (e.type == "touchstart") ? e.originalEvent.touches[0].screenX : e.screenX;
						nativeDroid.plugins.gallery.dragStarted = true;
						$(this).addClass("noTransition");
					}).on("mouseup touchend", ".nativeDroidGallery li.active:not('.zoom')", function(e) {
						$(this).removeClass("noTransition").css({
							"left" : "auto"
						});
						nativeDroid.plugins.gallery.dragStarted = false;
					}).on("mousemove touchmove", ".nativeDroidGallery li.active:not('.zoom')", function(e) {
						e.preventDefault();
						mousedown = nativeDroid.plugins.gallery.dragStarted;
						if (mousedown) {
							distance = (e.type == "touchmove") ? parseInt(e.originalEvent.touches[0].screenX) - parseInt(nativeDroid.plugins.gallery.dragStartX) : e.screenX - nativeDroid.plugins.gallery.dragStartX;
							if (distance > 30 || distance < -30) {
								$(this).css("left", distance + "px");
							}
						}
					});
				},
				ini : function(obj) {
					obj.addClass("nativeDroidGallery");
					nativeDroid.plugins.gallery.bindEvents();
				}
			},
			splashscreen : {
				container : false,
				background : false,
				time : 3,
				animation : false,
				bindEvents : function() {
					// No events yet
				},
				create : function() {
					var obj = nativeDroid.plugins.splashscreen.container;
					var bg = nativeDroid.plugins.splashscreen.background;
					var animation = nativeDroid.plugins.splashscreen.animation;
					if (bg) {
						obj.addClass("nativeDroidSplashscreen").css({
							"background-image" : "url('" + bg + "')"
						});
						delay = nativeDroid.plugins.splashscreen.time * 1000;
						setTimeout(function() {
							if (animation) {
								obj.addClass(animation);
							}
							setTimeout(function() {
								obj.remove();
							}, 500);
						}, delay);
					}
				},
				ini : function(obj) {
					nativeDroid.plugins.splashscreen.container = obj;
					nativeDroid.plugins.splashscreen.time = parseInt(obj.data("nativedroid-splashscreen-time"));
					nativeDroid.plugins.splashscreen.background = obj.data("nativedroid-background");
					nativeDroid.plugins.splashscreen.animation = obj.data("nativedroid-splashscreen-animation");
					nativeDroid.plugins.splashscreen.create();
				}
			},
			lockscreen : {
				container : false,
				background : false,
				delay : 25,
				display : false,
				lastactivity : initialTime,
				animation : "fadeOut",
				bindEvents : function() {
					$(".ui-page").on("click", ".nativeDroidLockscreen .unlock", function() {
						nativeDroid.plugins.lockscreen.close();
					}).on("touchstart touchend touchmove mousemove click tap", function() {
						nativeDroid.plugins.lockscreen.lastactivity = new Date().getTime();
					});
					nativeDroid.plugins.lockscreen.startCheckInactivity();
				},
				startCheckInactivity : function() {
					delay = nativeDroid.plugins.lockscreen.delay * 1000;
					setTimeout(function() {
						setTimeout(function() {
							nativeDroid.plugins.lockscreen.checkInactivity();
						}, delay);
					});
				},
				checkInactivity : function() {
					display = nativeDroid.plugins.lockscreen.display;
					activity = nativeDroid.plugins.lockscreen.lastactivity;
					delay = nativeDroid.plugins.lockscreen.delay * 1000;
					now = new Date().getTime();
					if (!display && (delay < (now - activity))) {
						nativeDroid.plugins.lockscreen.open();
					} else {
						// Calculate next check
						nextCheck = delay - (now - activity);
						setTimeout(function() {
							nativeDroid.plugins.lockscreen.checkInactivity();
						}, nextCheck);
					}
				},
				open : function() {
					nativeDroid.plugins.lockscreen.container.fadeIn(500);
					nativeDroid.plugins.lockscreen.display = true;
				},
				close : function() {
					nativeDroid.plugins.lockscreen.container.fadeOut(500);
					nativeDroid.plugins.lockscreen.display = false;
					nativeDroid.plugins.lockscreen.startCheckInactivity();
				},
				create : function() {
					nativeDroid.plugins.lockscreen.bindEvents();
					var obj = nativeDroid.plugins.lockscreen.container;
					var bg = nativeDroid.plugins.lockscreen.background;
					var animation = nativeDroid.plugins.lockscreen.animation;
					if (bg) {
						obj.addClass("nativeDroidLockscreen").css({
							"background-image" : "url('" + bg + "')"
						});
					}
				},
				ini : function(obj) {
					nativeDroid.plugins.lockscreen.container = obj;
					nativeDroid.plugins.lockscreen.delay = parseInt(obj.data("nativedroid-lockscreen-delay"));
					nativeDroid.plugins.lockscreen.background = obj.data("nativedroid-background");
					nativeDroid.plugins.lockscreen.animation = obj.data("nativedroid-lockscreen-animation");
					nativeDroid.plugins.lockscreen.create();
				}
			},
			homescreen : {
				container : false,
				background : false,
				currentslide : 1,
				dragStartX : 0,
				dragStated : false,
				slides : false,
				bindEvents : function() {
					$(".ui-page").on("swipeleft swiperight", "div[data-nativedroid-role='screenslide']", function(e) {
						direction = e.type;
						e.preventDefault();
						slides = nativeDroid.plugins.homescreen.slides;
						thisIdx = parseInt($(this).data("nativedroid-screenslide-idx"));
						nextIdx = thisIdx + 1;
						prevIdx = thisIdx - 1;
						nextIdx = (nextIdx > slides) ? 1 : nextIdx;
						prevIdx = (prevIdx < 1) ? slides : prevIdx;
						if (slides > 1) {
							if (direction == "swiperight") {
								nativeDroid.plugins.homescreen.slide(thisIdx, prevIdx, direction);
							} else {
								nativeDroid.plugins.homescreen.slide(thisIdx, nextIdx, direction);
							}
						}
					}).on("mousedown touchstart", ".nativeDroidHomescreen", function(e) {
						nativeDroid.plugins.homescreen.dragStartX = (e.type == "touchstart") ? e.originalEvent.touches[0].screenX : e.screenX;
						nativeDroid.plugins.homescreen.dragStarted = true;
						homeScreenSlideObj = $(".nativeDroidHomescreen div[data-nativedroid-screenslide-idx='" + nativeDroid.plugins.homescreen.currentslide + "']");
						homeScreenSlideObj.addClass("noTransition");
					}).on("mouseup touchend", ".nativeDroidHomescreen", function(e) {
						homeScreenSlideObj = $(".nativeDroidHomescreen div[data-nativedroid-screenslide-idx='" + nativeDroid.plugins.homescreen.currentslide + "']");
						homeScreenSlideObj.removeAttr('style').removeClass("noTransition");
						nativeDroid.plugins.homescreen.dragStarted = false;
					}).on("mousemove touchmove", ".nativeDroidHomescreen", function(e) {
						mousedown = nativeDroid.plugins.homescreen.dragStarted;
						e.preventDefault();
						if (mousedown) {
							distance = (e.type == "touchmove") ? parseInt(e.originalEvent.touches[0].screenX) - parseInt(nativeDroid.plugins.homescreen.dragStartX) : e.screenX - nativeDroid.plugins.homescreen.dragStartX;
							if (distance > 30 || distance < -30) {
								homeScreenSlideObj = $(".nativeDroidHomescreen div[data-nativedroid-screenslide-idx='" + nativeDroid.plugins.homescreen.currentslide + "']");
								homeScreenSlideObj.css("left", distance + "px");
							}
						}
					});
					$("body,.ui-page,.ui-body,.ui-content").css({
						"overflow" : "hidden"
					});
				},
				slide : function(from, to, direction) {
					newClassFrom = (direction == "swipeleft") ? "left" : "right";
					$(".nativeDroidHomescreen div[data-nativedroid-screenslide-idx='" + from + "']").removeClass("left").removeClass("right").addClass(newClassFrom);

					var tmpClassTo = (direction == "swipeleft") ? "rightNoTransition" : "leftNoTransition";
					var toObj = $(".nativeDroidHomescreen div[data-nativedroid-screenslide-idx='" + to + "']");
					toObj.addClass(tmpClassTo).removeClass("left").removeClass("right");
					setTimeout(function() {
						toObj.removeClass(tmpClassTo);
						nativeDroid.plugins.homescreen.currentslide = to;
						nativeDroid.plugins.homescreen.updateSlideIndicators();
					}, 50);
				},
				create : function() {
					obj = nativeDroid.plugins.homescreen.container;
					obj.addClass("nativeDroidHomescreen");
					bg = nativeDroid.plugins.homescreen.background;
					if (bg) {
						obj.css({
							"background-image" : "url('" + bg + "')"
						});
					}
					i = 1;
					obj.find("[data-nativedroid-role='screenslide']").each(function() {
						$(this).attr("data-nativedroid-screenslide-idx", i);
						if (i > 1) {
							$(this).addClass("right");
							/*.attr("draggable",true);*/
						}
						i++;
					});
					nativeDroid.plugins.homescreen.slides = i - 1;
					nativeDroid.plugins.homescreen.createSlideIndicators();
					nativeDroid.plugins.homescreen.createWidgets();
					nativeDroid.plugins.homescreen.bindEvents();
				},
				createSlideIndicators : function() {
					total = nativeDroid.plugins.homescreen.slides;
					current = nativeDroid.plugins.homescreen.currentslide;
					if (total > 1) {
						html = "<div class='nativeDroidScreenSlideIndicators'>";
						for ( i = 1; i <= total; i++) {
							currentClass = (i == current) ? " active" : "";
							html += "<div class='blobs" + currentClass + "' data-nativedroid-screenslide-indicator='" + i + "'></div>";
						}
						html += "</div>";
						nativeDroid.plugins.homescreen.container.append(html);
					}
				},
				updateSlideIndicators : function() {
					current = nativeDroid.plugins.homescreen.currentslide;
					$(".nativeDroidScreenSlideIndicators .blobs").removeClass("active");
					$(".nativeDroidScreenSlideIndicators .blobs[data-nativedroid-screenslide-indicator='" + current + "']").addClass("active")
				},
				createWidgets : function() {
					widgetsObj = nativeDroid.plugins.homescreen.container.find("[data-nativedroid-role='widget']");
					widgetsObj.addClass("nativeDroidHomescreenWidget");
					widgetsObj.each(function() {
						type = $(this).data("nativedroid-widget-type");
						if (type && nativeDroid.plugins.homescreen.widget[type]) {
							new nativeDroid.plugins.homescreen.widget[type].ini($(this));
						} else if (type) {
							console.log(type + " - is not a valid nativeDroid homescreen widget.")
						}
					});
				},
				widget : {
					clock : {
						container : false,
						currentMin : 0,
						language : {
							set : "en",
							type : "short",
							en : {
								dayShort : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
								dayLong : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
								monthShort : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
								monthLong : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
								order : function(day, dayStr, date, month, monthStr, year) {
									return dayStr + ", " + monthStr + " " + date;
								}
							},
							de : {
								dayShort : ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
								dayLong : ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
								monthShort : ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
								monthLong : ["Januar", "Februar", "M&auml;rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
								order : function(day, dayStr, date, month, monthStr, year) {
									return dayStr + ", " + date + ". " + monthStr + " " + year;
								}
							}
						},
						getTodayString : function(day, date, month, year) {
							cLang = nativeDroid.plugins.homescreen.widget.clock.language;
							type = cLang.type;
							lang = cLang.set;
							retStr = "--empty-string--";
							if (type == "long") {
								dayStr = cLang[lang].dayLong[day];
								monthStr = cLang[lang].monthLong[month];
							} else if (type == "short") {
								dayStr = cLang[lang].dayShort[day];
								monthStr = cLang[lang].monthShort[month];
							}
							retStr = cLang[lang].order(day, dayStr, date, month, monthStr, year);
							return retStr;
						},
						getClockHTML : function() {
							html = "<div class='ClockTime'>";
							d = new Date();
							hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
							min = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
							time = hours + ":" + min;
							nativeDroid.plugins.homescreen.widget.clock.currentMin = d.getMinutes();
							html += "<div class='time'>" + time + "</div>";
							date = nativeDroid.plugins.homescreen.widget.clock.getTodayString(d.getDay(), d.getDate(), d.getMonth(), d.getFullYear());
							html += "<div class='date'><i class='icon-calendar'></i> " + date + "</div>";
							html += "</div>";
							return html;
						},
						create : function() {
							cObj = nativeDroid.plugins.homescreen.widget.clock;
							cObj.container.addClass("nativeDroidWidgetClock");
							cObj.container.html(cObj.getClockHTML());
							cObj.run();
						},
						update : function() {
							nativeDroid.plugins.homescreen.widget.clock.container.html(nativeDroid.plugins.homescreen.widget.clock.getClockHTML());
						},
						run : function() {
							cMin = nativeDroid.plugins.homescreen.widget.clock.currentMin;
							now = new Date();
							if (cMin != now.getMinutes()) {
								nativeDroid.plugins.homescreen.widget.clock.update();
							}
							nextRun = (61 - now.getSeconds()) * 1000;
							setTimeout(function() {
								nativeDroid.plugins.homescreen.widget.clock.run();
							}, nextRun);
						},
						ini : function(obj) {
							nativeDroid.plugins.homescreen.widget.clock.container = obj;
							if (obj.data("nativedroid-widget-clock-format")) {
								nativeDroid.plugins.homescreen.widget.clock.language.type = obj.data("nativedroid-widget-clock-format");
							}
							if (obj.data("nativedroid-widget-clock-lang")) {
								nativeDroid.plugins.homescreen.widget.clock.language.set = obj.data("nativedroid-widget-clock-lang");
							}
							nativeDroid.plugins.homescreen.widget.clock.create();
						}
					},
					reader : {
						container : false,
						type : "rss",
						source : false,
						bindEvents : function() {

						},
						create : function() {
							rObj = nativeDroid.plugins.homescreen.widget.reader;
							rObj.container.addClass("nativeDroidWidgetReader");
							if (rObj.type == "rss" && rObj.source) {
								queryUrl = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=" + encodeURIComponent(rObj.source);
								nativeDroid.api.get("jsonp", queryUrl, false, rObj.parseFeed);
							}
						},
						parseFeed : function(data) {
							feedTitle = false;
							feedLink = false;
							feedDescription = false;
							feedAuthor = false;

							if (data && data.responseStatus == "200") {
								// Filter Data
								data = data.responseData.feed;

								// Prepare main data
								feedTitle = data.title;
								feedLink = data.link;
								feedDescription = data.description;
								feedAuthor = data.author;

								feedHTML = "";

								// Loop entries
								for ( i = 0; i < data.entries.length; i++) {
									entry = data.entries[i];
									feedHTML += "<li>";
									feedHTML += "<div class='feedActionBox'><a href='" + entry.link + "' target='_blank'><i class='icon-share-alt'></i></a></div>";
									feedHTML += "<strong>" + entry.title + "</strong>";
									feedHTML += "<p>" + nativeDroid.basic.dateFormat.format(entry.publishedDate) + " | " + entry.contentSnippet + "</p>";
									feedHTML += "</li>";
								}

								html = "<ul>";
								html += "<li class='widgetTitleBar'>";
								html += "<h3>" + feedTitle + "</h3>";
								html += "</li>";
								html += feedHTML;
								html += "</ul>";

								nativeDroid.plugins.homescreen.widget.reader.container.html(html);

							}
						},
						ini : function(obj) {
							nativeDroid.plugins.homescreen.widget.reader.container = obj;
							if (obj.data("nativedroid-widget-reader-type")) {
								nativeDroid.plugins.homescreen.widget.reader.type = obj.data("nativedroid-widget-reader-type");
							}
							if (obj.data("nativedroid-widget-reader-source")) {
								nativeDroid.plugins.homescreen.widget.reader.source = obj.data("nativedroid-widget-reader-source");
							}
							nativeDroid.plugins.homescreen.widget.reader.create();
						}
					},
					icon : {
						container : false,
						iconType : "text",
						iconClass : "icon-question-sign",
						iconTitle : "Your Icon",
						iconLink : "#",
						bindEvents : function() {
							$("div[data-nativedroid-role='widget']").on("click", ".nativeDroidIconWidget", function() {
								window.location.href = $(this).attr('data-nativedroid-icon-href');
							});
						},
						create : function() {
							html = "";
							if (nativeDroid.plugins.homescreen.widget.icon.iconType == "text") {
								html = "<div class='nativeDroidIconWidget' data-nativedroid-icon-href='" + nativeDroid.plugins.homescreen.widget.icon.iconLink + "'><i class='" + nativeDroid.plugins.homescreen.widget.icon.iconClass + "'></i><span>" + nativeDroid.plugins.homescreen.widget.icon.iconTitle + "</span></div>";
							}
							if (html != "") {
								nativeDroid.plugins.homescreen.widget.icon.container.html(html);
							}
							nativeDroid.plugins.homescreen.widget.icon.bindEvents();
						},
						ini : function(obj) {

							nativeDroid.plugins.homescreen.widget.icon.container = obj;

							nativeDroid.plugins.homescreen.widget.icon.iconType = obj.data("nativedroid-widget-icon-type");
							nativeDroid.plugins.homescreen.widget.icon.iconClass = obj.data("nativedroid-widget-icon-class");
							nativeDroid.plugins.homescreen.widget.icon.iconTitle = obj.data("nativedroid-widget-icon-title");
							nativeDroid.plugins.homescreen.widget.icon.iconLink = obj.data("nativedroid-widget-icon-link");

							nativeDroid.plugins.homescreen.widget.icon.create();

						}
					}
				},
				ini : function(obj) {
					nativeDroid.plugins.homescreen.container = obj;
					bg = obj.data("nativedroid-background");
					nativeDroid.plugins.homescreen.background = (bg) ? bg : false;
					nativeDroid.plugins.homescreen.create();
				}
			}
		},
		api : {
			get : function(datatype, query, queryData, returnFn) {

				$.ajax({
					dataType : datatype,
					url : query,
					data : (queryData !== false) ? queryData : "",
					success : returnFn,
					error : function(errorData) {
						console.log("There is an error while your ajaxRequest: ");
						console.log("Query: " + query);
						console.log(errorData.responseText);
					}
				});
			},
			helper : {
				googlemaps : {
					apiScript : "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false",
					apiScriptLoaded : false,
					ini : function(returnFn) {
						if ( typeof google == 'undefined') {
							$.getScript(nativeDroid.api.helper.googlemaps.apiScript).done(function() {
								returnFn(true);
							});
						} else {
							returnFn(true);
						}
					},
					directions : {
						from : false,
						to : false,
						container : false,
						type : "string",
						prepareRoute : function(data) {

							nativeDroid.api.helper.googlemaps.directions.type = (data.type) ? data.type : nativeDroid.api.helper.googlemaps.directions.type;
							if ( typeof google !== "undefined") {
								if (nativeDroid.api.helper.googlemaps.directions.type == "coords") {

									from = data.from.split(',');
									fromLat = parseFloat(from[0])
									fromLng = parseFloat(from[1]);
									nativeDroid.api.helper.googlemaps.directions.from = new google.maps.LatLng(fromLat, fromLng);

									to = data.to.split(',');
									toLat = parseFloat(to[0])
									toLng = parseFloat(to[1]);
									nativeDroid.api.helper.googlemaps.directions.to = new google.maps.LatLng(toLat, toLng);

								} else {
									nativeDroid.api.helper.googlemaps.directions.from = data.from;
									nativeDroid.api.helper.googlemaps.directions.to = data.to;
									nativeDroid.api.helper.googlemaps.directions.container = data.container;
								}

							}

						},
						getRoute : function(data) {

							if (data && data.from && data.to && data.container) {

								nativeDroid.api.helper.googlemaps.directions.prepareRoute(data);

								$(window).on("pagechange", function() {
									if(typeof google == "undefined") { return; }
									var rendererOptions = {
										draggable : false
									};
									var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
									var directionsService = new google.maps.DirectionsService();
									var map;

									function initialize() {

										var mapOptions = {
											zoom : 7,
											disableDefaultUI : true,
											draggable : false,
											keyboardShortcuts : false,
											scrollwheel : false,
											mapTypeId : google.maps.MapTypeId.ROADMAP
										};
										map = new google.maps.Map(data.container, mapOptions);
										directionsDisplay.setMap(map);

										calcRoute();
									}

									function calcRoute() {

										var request = {
											origin : nativeDroid.api.helper.googlemaps.directions.from,
											destination : nativeDroid.api.helper.googlemaps.directions.to,
											travelMode : google.maps.TravelMode.DRIVING
										};
										directionsService.route(request, function(response, status) {
											if (status == google.maps.DirectionsStatus.OK) {
												directionsDisplay.setDirections(response);
											}
										});
									}

									initialize();

								});

							}
						}
					}
				}
			}
		}
	}

	// Events

	$("[data-nativedroid-plugin]").each(function() {
		if (nativeDroid.plugins[$(this).attr('data-nativedroid-plugin')]) {
			new nativeDroid.plugins[$(this).attr('data-nativedroid-plugin')].ini($(this));
		} else {
			console.log($(this).attr('data-nativedroid-plugin') + " - is not a valid nativeDroid plugin.")
		}
	});

	// Disabling scrollTop

	if (nativeDroid.basic.touchEvent() == "touchstart") {
		nativeDroid.basic.disableScrollTop();
	}

}; 


var __mainDiv;
 var __preLoaderHTML;
 var __opts;
 
 $(document).ready(function() {
     $.mobile.loading( "show", {
         text: "Loading, please wait...",
         textVisible: true
     });
 });
 
 function __jQueryYouTubeChannelReceiveData(data,deviceType) {

	 $.mobile.loading( "hide");
	 
     var cnt = 0;
     $.each(data.feed.entry, function(i, e) {
         if (cnt < __opts.numberToDisplay) {
             var vidUrl=e.link[0].href;
             vidUrl=(vidUrl.replace(/www.youtube.com/gi, "m.youtube.com"));
             var parts = e.id.$t.split('/');
             var videoId = parts[parts.length-1];
		
			 vidUrl=encodeURIComponent(vidUrl);
             var out = '<li class="ui-li ui-li-static ui-body-c"><center><p class="ui-li-desc"><br><a href="cbgw.html?goUrl=' + 
             vidUrl + '" rel="external"><img src="http://i.ytimg.com/vi/' + 
             //videoId + '/2.jpg"/ width="240px" height="180px"></a></p><p class="ui-li-desc"><a href="cbgw.html?goUrl=' + 
             videoId + '/hqdefault.jpg"/ width="240px"></a></p><p class="ui-li-desc"><a href="cbgw.html?goUrl=' + 
             vidUrl + '" rel="external">' + e.title.$t + '</a></p></center></li>';
			 
		
             if (!__opts.hideAuthor) {
                 out = out + 'Author: ' + e.author[0].name.$t + '';
             }
             out = out + '</center></p>';
             __mainDiv.append(out);
             cnt = cnt + 1;
         }
     });
            
    // Open in new tab?
    if (__opts.linksInNewWindow) {
        $(__mainDiv).find("li > a").attr("target", "_blank");
    }
    
    // Remove the preloader and show the content
    $(__preLoaderHTML).remove();
    __mainDiv.show();
}
                
(function($) {
    $.fn.youTubeChannel = function(options) {
        var videoDiv = $(this);

        $.fn.youTubeChannel.defaults = {
            userName: null,
            channel: "uploads", //options are favorites or uploads
            loadingText: "Loading...",
            numberToDisplay: 3,
            linksInNewWindow: true,
            hideAuthor: false
        }

        __opts = $.extend({}, $.fn.youTubeChannel.defaults, options);

        return this.each(function() {
            if (__opts.userName != null) {
                videoDiv.append("<ul id=\"linksList\" class=\"ui-listview ui-listview-inset ui-corner-all ui-shadow\" data-inset=\"true\" data-role=\"listview\"></ul>");
                __mainDiv = $("#linksList");
                __mainDiv.hide();

                __preLoaderHTML = $("<p class=\"loader\">" + 
                    __opts.loadingText + "</p>");
                videoDiv.append(__preLoaderHTML);

                // TODO: Error handling!
                $.ajax({
                    url: "http://gdata.youtube.com/feeds/base/users/" + 
                        __opts.userName + "/" + __opts.channel + "?alt=json",
                    cache: true,
                    dataType: 'jsonp',                    
                    success: __jQueryYouTubeChannelReceiveData
                });
            }
        });
    };
})(jQuery);


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
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('4','1814400','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('5','2419200','0','0')");
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
        navigator.notification.confirm("Upgrade now to receive no ads and extra features!", onUpsellConfirm, "Upgrade", "Go,Later,Never");
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
            setAllDone = true;window.open("https://play.google.com/store/apps/details?id=com.a62823027050968e2b24bf17a.a24047396a&hl=en_GB", "_system", "location=yes");
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
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('4','1814400','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('5','2419200','0','0')");
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
            setAllDone = true;window.open("market://details?id=com.a2054012516500c7a3ea0a3e2a.a96526417a", "_system", "location=yes");
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
    			

