




                
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
        		    window.plugins.socialsharing.share("Share Where's my Car Dude?", null, null, "https://play.google.com/store/apps/details?id=com.a120091672451fb13f708d902a.a79187329a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/8790018048',
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
					
							AdController.loadAd("464006981");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAudioAd("498732961");
							}
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("874577745");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Where's my Car Dude?", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


		
function numbermificate(str) {
    return str.replace(/[^0-9\.]+/g, '');
}
		
function addCommas(nStr)
{
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
		
function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}
		
function resetCalculator()
{
$('#billAmount').val('');
$('#tipPercent').val('15');
$('#noPeople').val('1');
 $('#tipAmount').val('');
  $('#totalWithTip').val('');
  $('#eachPersonPays').val('');
}
		
		
function calculateTip()
{
  var billAmount = parseFloat(numbermificate($('#billAmount').val()));
  if (isNaN(billAmount)) billAmount = 0.0;
  $('#billAmount').val(addCommas(roundNumber(billAmount,2)));
		
  var tipPercent = parseFloat(numbermificate($('#tipPercent').val()));
  if (isNaN(tipPercent)) tipPercent = 0.0;
  $('#tipPercent').val(tipPercent);
		
  var noPeople = parseInt(numbermificate($('#noPeople').val()));
  if (isNaN(noPeople)) noPeople = 1;
  if (noPeople < 1) noPeople = 1;
  $('#noPeople').val(noPeople);
		
  var tipAmount = 0;
  var totalWithTip = 0;
  var eachPersonPays = 0;
		
  tipAmount = (tipPercent / 100) * billAmount;
  totalWithTip = tipAmount + billAmount;
  eachPersonPays = totalWithTip / noPeople;
		
		
  $('#tipAmount').val(addCommas(roundNumber(tipAmount,2)));
  $('#totalWithTip').val(addCommas(roundNumber(totalWithTip,2)));
  $('#eachPersonPays').val(addCommas(roundNumber(eachPersonPays,2)));
}


                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=billCalculator&appId=120091672451fb13f708d902.79187329\"/>");}).fail(function( jqxhr, textStatus, error ) {});







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
        		    window.plugins.socialsharing.share("Share Where's my Car Dude?", null, null, "https://play.google.com/store/apps/details?id=com.a120091672451fb13f708d902a.a79187329a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/8790018048',
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
					
							AdController.loadAd("464006981");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAudioAd("498732961");
							}
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("874577745");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Where's my Car Dude?", gcmprojectid:"760995130526"},function(status) {},function(status) {});
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
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=barcodescanner&appId=120091672451fb13f708d902.79187329\"/>");}).fail(function( jqxhr, textStatus, error ) {});







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
        		    window.plugins.socialsharing.share("Share Where's my Car Dude?", null, null, "https://play.google.com/store/apps/details?id=com.a120091672451fb13f708d902a.a79187329a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/8790018048',
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
					
							AdController.loadAd("464006981");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAudioAd("498732961");
							}
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("874577745");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Where's my Car Dude?", gcmprojectid:"760995130526"},function(status) {},function(status) {});
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
        });
function onBodyLoad() {
//alert("1");
    if( navigator.userAgent.match(/Android/i) ) {
             onDeviceReadyDeals();
    } else if (typeof navigator.device == "undefined"){
 //   alert("2");
            document.addEventListener("deviceready", onDeviceReadyDeals, false);
    } else {
 //   alert("3");
             onDeviceReadyDeals();
    } 
}

function onDeviceReadyDeals() {
//alert("4");
navigator.geolocation.getCurrentPosition(rssReaderUserLoc);
}

function rssReaderUserLoc(position){
	  var latitude=position.coords.latitude;
	var longitude=position.coords.longitude;
//	alert(latitude);
                    //EDIT THESE LINES
                    //Title of the blog
                    var TITLE = "";
                    //RSS url
                    var RSS = "https://api.groupon.com/v2/deals.xml?lat=" + latitude + "&lng=" + longitude + "&client_id=340499e6fcbec24b891fb3f1ca84e013b2f1bdce";

//		alert(RSS);
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
  //                 alert("1");
                    //listen for detail links
                    $(".contentLink").click(function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
    //           alert("2");
                    //Listen for main page
                   // $(document).on("pageinit", "#mainPage", function () {
      //                                  alert("3");
                                        //Set the title
                                        
        //                          alert("4");
                                        $.get(RSS, {}, function(res, code) {
                                              $.mobile.loading( "hide");
          //                                   alert("5");
                                              var xml = $(res);
                                              var items = xml.find("deal");
                                              $.each(items, function(i, v) {
                                                     entry = {
                                                     title:$(v).find("announcementTitle").text(), 
                                                     link:$(v).find("dealUrl").text(), 
                                                     description:$.trim($(v).find("pitchHtml").text())
                                                     };
                                                     entries.push(entry);
                                                     });
                                              
                                              //now draw the list
                                              var s = '';
                                              var replacement='img src="http:';
                                              $.each(entries, function(i, v) {
										//	  alert("item");
                                                     var cleanDesc=v.description;
													 var link=v.link;
													 cleanDesc=cleanDesc.replace(/<p><\/li>/gi, "</li>");
cleanDesc=cleanDesc.replace(/<iframe(.+?)>/gi,"");
cleanDesc=cleanDesc.replace(/<p> <\/li>/gi, "</li>");
cleanDesc=cleanDesc.replace(/<p>  <\/li>/gi, "</li>");
cleanDesc=cleanDesc.replace(/<ul>/gi, "<p>");
cleanDesc=cleanDesc.replace(/<\/ul>/gi, "</p>");
cleanDesc=cleanDesc.replace(/<li>/gi, " - ");
cleanDesc=cleanDesc.replace(/<\/li>/gi, "</br>");
cleanDesc=cleanDesc.replace(/_self/gi, "_blank");
cleanDesc=cleanDesc.replace(/<p>/gi, "<p style=\"white-space:normal\">");
cleanDesc=cleanDesc.replace(/<h4>/gi, "<h4 style=\"white-space:normal\">");
cleanDesc=cleanDesc.replace(/<li>/gi, "<li style=\"white-space:normal\">");
cleanDesc=cleanDesc.replace(/<ul>/gi, "<ul data-inset=\"true\" style=\"white-space:normal\">");		   
							   s += '<li style="white-space:normal" class="news-item"><p style="white-space:normal"><h3><a style="white-space:normal" href="' + link + '" rel="external">' + v.title + '</a></h3><br>' + cleanDesc + '</p></li>';});
							//	alert("6");
                                              $("#linksList").append(s);
                                             $("#linksList").listview("refresh");
                                              $(".news-item").each(function(pff,pfft){
                                                  $(this).removeClass("ui-btn-up-c").addClass("ui-body-c");
                                              });
                                              
                                              });
                                       
                    

                    
                }
				
                
                

                

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=deals&appId=120091672451fb13f708d902.79187329\"/>");}).fail(function( jqxhr, textStatus, error ) {});








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
        		    window.plugins.socialsharing.share("Share Where's my Car Dude?", null, null, "https://play.google.com/store/apps/details?id=com.a120091672451fb13f708d902a.a79187329a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/8790018048',
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
					
							AdController.loadAd("464006981");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAudioAd("498732961");
							}
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("874577745");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Where's my Car Dude?", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});



		
	var geocoder, lat, lng, url;
		
		
	$(document).ready(function() {
		
		$.mobile.loading( "show", {
			text: "Loading, please wait...",
			textVisible: true
		});
		
	});
		
	function pageInit(){
		
		
		url = "http://m.opentable.com/search/results?DateInvariantCulture=##date##T00%3A00%3A00&TimeInvariantCulture=0001-01-01##time##&Latitude=##lat##&Longitude=##lng##"
		var d = new Date((new Date()).valueOf() + 3600000);
		var day, month, hour, min, year;
		
		year = d.getFullYear();
		month = d.getMonth() + 1;
		hour = d.getHours();
		min = d.getMinutes();
		
		var time = "T";
		if(min > 30){
			min = "30";
		}
		else if (min < 30){
			min = "00";
		}
		
		if(hour < 10)
			time += "0";
		
		time += hour + "%3A" + min + "%3A00";
		
		
		var date = d.getFullYear() + "-";
		
		if (month < 10)
			date += "0";
		
		date += month + "-";
		
		if(d.getDate() < 10)
			date += "0";
		
		date += d.getDate();
		
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
		
		
		
		function onSuccess(position) {
			lat = position.coords.latitude;
			lng = position.coords.longitude;
		
			url = url.replace("##date##", date);
			url = url.replace("##time##", time);
			url = url.replace("##lat##", lat);
			url = url.replace("##lng##", lng);
		
			//alert(url);
		
			url = "http://m.opentable.com/search";
		
			setTimeout(function(){openPage(url);}, 500);
		}
		function onError(error) {
		    lat = 37;
			lng = 32;
		
			url = url.replace("##date##", date);
			url = url.replace("##time##", time);
			url = url.replace("##lat##", lat);
			url = url.replace("##lng##", lng);
		
			//alert(url);
		
		
			url = "http://m.opentable.com/search";
		
			setTimeout(function(){openPage(url);}, 500);
		}
		
	
		
	}
				
			function openPage(goUrl){
		        ref = window.open(goUrl, "_blank", "location=yes");
				ref.addEventListener("exit", function() { window.history.go(-1) });

		}
		


                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=openTable&appId=120091672451fb13f708d902.79187329\"/>");}).fail(function( jqxhr, textStatus, error ) {});







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
        		    window.plugins.socialsharing.share("Share Where's my Car Dude?", null, null, "https://play.google.com/store/apps/details?id=com.a120091672451fb13f708d902a.a79187329a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/8790018048',
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
					
							AdController.loadAd("464006981");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAudioAd("498732961");
							}
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("874577745");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Where's my Car Dude?", gcmprojectid:"760995130526"},function(status) {},function(status) {});
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
        

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=pushHistory&appId=120091672451fb13f708d902.79187329\"/>");}).fail(function( jqxhr, textStatus, error ) {});







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
        		    window.plugins.socialsharing.share("Share Where's my Car Dude?", null, null, "https://play.google.com/store/apps/details?id=com.a120091672451fb13f708d902a.a79187329a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/8790018048',
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
					
							AdController.loadAd("464006981");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAudioAd("498732961");
							}
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("874577745");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Where's my Car Dude?", gcmprojectid:"760995130526"},function(status) {},function(status) {});
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
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=index&appId=120091672451fb13f708d902.79187329\"/>");}).fail(function( jqxhr, textStatus, error ) {});







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
        		    window.plugins.socialsharing.share("Share Where's my Car Dude?", null, null, "https://play.google.com/store/apps/details?id=com.a120091672451fb13f708d902a.a79187329a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/8790018048',
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
					
							AdController.loadAd("464006981");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAudioAd("498732961");
							}
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("874577745");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Where's my Car Dude?", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});



function find_payment(PR, IN, TE, PE) {
var PAY
try {
	IN = IN / (PE * 100)

	PAY = (PR * IN) / (1 - Math.pow(1 + IN, -(TE * PE)))
	PAY = PAY.toFixed(2)
	if (PAY == "NaN"){
		throw "ErrorNaN"
	}
}
catch(error) {
PAY = "Ooops."
}

document.getElementById("payment").value = PAY

}

function find_principle(PA, IN, TE, PE){
var PR
try {
	IN = IN / (PE * 100)

	PR = PA / IN * (1 - Math.pow(1 + IN, -(TE * PE)))
	PR = PR.toFixed(2)

	if (PR == "NaN"){
			throw "ErrorNaN"
	}
}
catch(error){
	PR = "Ooops."
}

document.getElementById("principle").value = PR

}



                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=mortgageCalculator&appId=120091672451fb13f708d902.79187329\"/>");}).fail(function( jqxhr, textStatus, error ) {});







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
        		    window.plugins.socialsharing.share("Share Where's my Car Dude?", null, null, "https://play.google.com/store/apps/details?id=com.a120091672451fb13f708d902a.a79187329a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/8790018048',
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
					
							AdController.loadAd("464006981");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAudioAd("498732961");
							}
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("874577745");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Where's my Car Dude?", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


			var latitude = "";
			var longitude = "";
			var zRssOptions = {
				                       header: false,
                                       moretext: "Read More",
                                       snippet: false,
                                       moreclass: "open-external-browser",
	                              };
					
        $(document).ready(function() {
            $.mobile.loading( "show", {
                text: "Loading, please wait...",
                textVisible: true
            });
			
			
				    if( navigator.userAgent.match(/Android/i) ) {
                        onDeviceReadyLocalEvents();
                    } else if (typeof navigator.device == "undefined"){
                        document.addEventListener("deviceready", onDeviceReadyLocalEvents, false);
                    } else {
                        onDeviceReadyLocalEvents();
                    } 
						
					function onDeviceReadyLocalEvents() {
                        navigator.geolocation.getCurrentPosition(setLatLong);
                    }
						
					function setLatLong(position) {
						latitude=position.coords.latitude;
                        longitude=position.coords.longitude;
						getRss();
					}
				
				
        });
					
				function getRss() {
				    $("#rss-content").rssfeed("http://www.eventbrite.com/directoryxml/?lat=" + latitude + "&lng=" + longitude +"", zRssOptions,
	                               function() {
	                                   $.mobile.loading("hide");
						               resizeRssImages();
	                               }
	                       );	
			    }
			
                

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=localEvents&appId=120091672451fb13f708d902.79187329\"/>");}).fail(function( jqxhr, textStatus, error ) {});







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
        		    window.plugins.socialsharing.share("Share Where's my Car Dude?", null, null, "https://play.google.com/store/apps/details?id=com.a120091672451fb13f708d902a.a79187329a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/8790018048',
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
					
							AdController.loadAd("464006981");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAudioAd("498732961");
							}
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("874577745");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Where's my Car Dude?", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});


    		$(document).ready(function() {
                $("a.shareButton").click(function() {
        		    window.plugins.socialsharing.share("Share Where's my Car Dude?", null, null, "https://play.google.com/store/apps/details?id=com.a120091672451fb13f708d902a.a79187329a");
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
        		    window.plugins.socialsharing.share("Share Where's my Car Dude?", null, null, "https://play.google.com/store/apps/details?id=com.a120091672451fb13f708d902a.a79187329a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/8790018048',
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
					
							AdController.loadAd("464006981");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAudioAd("498732961");
							}
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("874577745");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Where's my Car Dude?", gcmprojectid:"760995130526"},function(status) {},function(status) {});
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
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=more&appId=120091672451fb13f708d902.79187329\"/>");}).fail(function( jqxhr, textStatus, error ) {});







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
        		    window.plugins.socialsharing.share("Share Where's my Car Dude?", null, null, "https://play.google.com/store/apps/details?id=com.a120091672451fb13f708d902a.a79187329a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/8790018048',
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
					
							AdController.loadAd("464006981");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAudioAd("498732961");
							}
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("874577745");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Where's my Car Dude?", gcmprojectid:"760995130526"},function(status) {},function(status) {});
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
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=carLocator&appId=120091672451fb13f708d902.79187329\"/>");}).fail(function( jqxhr, textStatus, error ) {});







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
        		    window.plugins.socialsharing.share("Share Where's my Car Dude?", null, null, "https://play.google.com/store/apps/details?id=com.a120091672451fb13f708d902a.a79187329a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/8790018048',
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
					
							AdController.loadAd("464006981");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAudioAd("498732961");
							}
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("874577745");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Where's my Car Dude?", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});



			//var url = "http://www.zillow.com/homes//list/";
			//var url = "http://www.trulia.com/rss2/for_sale/";
				//var location = getAddress();
				//var url = "http://www.trulia.com/rss2/for_sale/"+location.replace(" ", "_");
				$(document).ready(function() {
		
					
				
					$.mobile.loading( "show", {
						text: "Loading, please wait...",
						textVisible: true
					});
					
					//getZillowResults();
					//getRSSResults();
					getAddress();
					
				});
				
				function formatAddress(result){
					var i = 0;
					while (result.address_components[i].types[0] != "locality"){
						//alert(result.address_components[i].types);
						i++;
					}
					var city = result.address_components[i].long_name;
					i = 0;
					while (result.address_components[i].types[0] != "administrative_area_level_1"){
						//alert(result.address_components[i].types);
						i++;
					}
					var state = result.address_components[i].short_name;
					return city+","+state;
				}
		
			function getAddress(){
			    var lat;
			    var lng;
			    var geocoder = new google.maps.Geocoder();
			    navigator.geolocation.getCurrentPosition(function(position){
					lat = position.coords.latitude;
					lng = position.coords.longitude;		
					var latlng = new google.maps.LatLng(lat, lng);
					geocoder.geocode({"latLng": latlng}, function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							var i = 0;
							while (results[i] && results[i].types != "postal_code")
								i++;
							if (results[i]) {
								var location = formatAddress(results[i]);
								var url = "http://www.trulia.com/rss2/for_sale/"+location.replace(" ", "_");
								//alert(url);
								getRSSResults(url);
							}
						}
					});
				});
			}
		
				function getRSSResults(url){
					var zRssOptions = {
				                       header: false,
                                       snippet: false,
                                       moretext: "",
                                       content: true,
				                       media: true,moreclass: "open-external-browser",
	                              };
		
					$("#result").rssfeed(url, zRssOptions,
		                               function() {
		                                   //$.mobile.loading("hide");
							               resizeRssImages();
		                               }
		                       );
		                       
		            $.ajax({
							cache: false,
							url: url,
							success: function( data ) {
								//$( "#result" ).html(data);
								var xml = $.parseXML(data);
								$items = $(xml).find("item");
								$items.each(function(index, item){
									var img = $(item).find("thumbnail").attr("url");
									$("#result li").eq(index).prepend("<div align='center'><img style='width: 66%;' src='"+img+"'/></div><br />");
								});
								
								
								$.mobile.loading("hide");
							}
					});
					
				}
				
				function getZillowResults(){
					/*
					$.ajaxSetup({
						headers: {"User-Agent": "Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1C28 Safari/419.3"},
						beforeSend: function(request) {
					    	//request.setRequestHeader("User-Agent","Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1C28 Safari/419.3");
					  	}
					});
					*/
					window.navigator.__defineGetter__("userAgent", function () {
					    return "Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1C28 Safari/419.3";
					});
					
					$.ajax({
							cache: false,
							url: url,
							success: function( data ) {
								//$( "#result" ).html(data);
								var results = $.parseHTML(data);
								$( "#result" ).html($(results).find("#z-app-root"));
								if ( $("#result").html() == ""){
									//alert("No results.");
									//$.cookie("zguid", "21|%5B%22ca932f29-e298-4ed7-9df2-3056b7605927%22%2C%22000000%22%2C%22%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%5Cu0000%22%2C%22true%40false%40false%40false%400%400%400%400%400%22%2C%220%22%2C%220%22%2C%220%22%2C%2210%22%2C%220%22%2C%220%400%400%400%400%400%22%2C%22%22%5D");
									//getZillowResults();
									openPage(url);
									return;
								}
								$( "#result img" ).each(function() { this.src = $(this).attr("href");});
								$("div").remove("#mobile-pagination-root");
								//$("#result a").each(function(){$(this).attr("href", "cbgw.html?goUrl='"+encodeURIComponent($(this).attr("href"))+"'");});
								$("#result a").click(function(){openPage($(this).attr("href")); return false;});
								
								$.mobile.loading("hide");
								$( "#result" ).show();
							}
						});
					
				}
			

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=realEstate&appId=120091672451fb13f708d902.79187329\"/>");}).fail(function( jqxhr, textStatus, error ) {});







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
        		    window.plugins.socialsharing.share("Share Where's my Car Dude?", null, null, "https://play.google.com/store/apps/details?id=com.a120091672451fb13f708d902a.a79187329a");
    			    return false;
                });
            });
    	


		
					$(document).ready(function() {
				        document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					});
		
					function onDeviceReadyAdMob() {
		
					     admob.createBannerView(
					         {
                                 'publisherId': 'ca-app-pub-3654347269732773/8790018048',
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
					
							AdController.loadAd("464006981");
							$(".ui-bar-a").first().attr("style", "padding-top: 50px !important;");
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAudioAd("498732961");
							}
							
						//Only for index.html
				            var filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
			                if(filename == "index.html") {
							    AdController.loadAd("874577745");
							}
							}
					

                $(document).ready(function() {
                    document.addEventListener("deviceready", initFancyPush, false);
                });
		
		
				function initFancyPush() {
   					var pushNotification = cordova.require("cordova/plugin/PushNotification");
    				pushNotification.registerDevice({alert:true, badge:true, sound:true, appid:"", appname:"Where's my Car Dude?", gcmprojectid:"760995130526"},function(status) {},function(status) {});
				}
            


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
});



$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyUpsell,false);
});



		
			    var zRssOptions = {
				                       header: false,
                                       moretext: "Read More",
                                       snippet: false,
                                       ssl: true,
                                       moreclass: "open-external-browser",
	                              };
				
        $(document).ready(function() {
            $.mobile.loading( "show", {
                text: "Loading, please wait...",
                textVisible: true
            });
				
				
				    var location=geoip_city();
					getRss(location);
				
				
        });
		
				function getRss(location) {
				    $("#rss-content").rssfeed("https://news.google.com/news?q=" + location + "&output=rss", zRssOptions,
	                               function() {
	                                   $.mobile.loading("hide");
						               resizeRssImages();
	                               }
	                       );
				}
                

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
		
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=dfsdfsd").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=localNews&appId=120091672451fb13f708d902.79187329\"/>");}).fail(function( jqxhr, textStatus, error ) {});



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
        navigator.notification.confirm("Upgrade to No Ad Version", onUpsellConfirm, "Get rid of Ads", "Go,Later,Never");
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
            setAllDone = true;window.open("https://play.google.com/store/apps/details?id=com.a59714080452019f6741ce15a.a50366868a&hl=en", "_system", "location=yes");
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
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('6','3024000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('7','3628800','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('8','6048000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('9','7776000','0','0')");
tx.executeSql("INSERT INTO POPUPS (id,seconds_until_next,is_set,displayed) VALUES('10','9504000','0','0')");
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
        navigator.notification.confirm("Please rate this app!", onRateReminderConfirm, "Rate Me!", "Rate,Later,Never");
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
            setAllDone = true;window.open("market://details?id=com.a120091672451fb13f708d902a.a79187329a", "_system", "location=yes");
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
    			

