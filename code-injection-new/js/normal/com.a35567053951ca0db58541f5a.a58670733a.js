






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
						    console.log("AdMob: Document ready");
							document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					    });
                  
						function onDeviceReadyAdMob() {
			         		admob.setOptions( {
                  				 publisherId: "NONE",
		                         adSize: admob.AD_SIZE.SMART_BANNER,
		                         bannerAtTop:  true, // set to true, to put banner at top
		                         overlap: false, // set to true, to allow banner overlap webview
		                         offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
		                         isTesting: false, // receiving test ad
		                         autoShowBanner: true, // auto show ad when loaded
				                 autoShowInterstitial: false
                     		}, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
				          
                  
                  
                  
				  		
				  	
				            admob.createBannerView({publisherId:"ca-app-pub-3752183509384517/7759885982"});
				         
		         		
				            var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
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
								localStorage.setItem("ic",2);
			         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
                  
					            admob.requestInterstitialAd({interstitialAdId:"ca-app-pub-3752183509384517/4392082381", autoShowInterstitial: false} );
					     		document.addEventListener(admob.events.onAdLoaded, function (ad) {
					            	if(ad.adType == admob.AD_TYPE.INTERSTITIAL){
					            		console.log("AdMob Interstitial loaded.");
							            $("a").click(function(e){
							            	if(this.href.indexOf("http:") == -1 && this.href.indexOf("#") == -1){
												 admob.showInterstitialAd();
							            	}
							            });
					            	}
					            });
					        }
					        else{
					        	localStorage.setItem("ic", ic - 1);
					        }
                  
		         	
				 }
				 

					$(document).on("deviceready", function(){
						console.log("Register AirPush App ID.");
						airPush.setAppId(293047, airPushSuccess, airPushError);
						console.log("Register AirPush API Key.");
						airPush.setApiKey( 1447003968254650339, airPushSuccess, airPushError);
						console.log("Enable AirPush caching.");
						airPush.setCaching(true, airPushSuccess, airPushError);
						if(0 == 1)
							airPushBannerAds();
						if(1 == 1)
							airPushSmartWallAds();
					});
								
					function airPushSuccess(e){
						console.log("AirPush Success. " + JSON.stringify(e));
					}
					function airPushError(e){
						console.log("AirPush Error: " + JSON.stringify(e));
					}
								
								
					function airPushBannerAds(){
						console.log("Requesting AirPush Banner.");
						airPush.inlineBanner.showInlineBanner(airPushSuccess, airPushError);
					}
					function airPushSmartWallAds(){
						airPush.smartWall.showDefault(airPushSuccess, airPushError);
						var lastSmartWallLoad = Number(localStorage.getItem("airPushLastSmartWallLoad"));
						if(lastSmartWallLoad == undefined || isNaN(lastSmartWallLoad) || lastSmartWallLoad == NaN) {
		         	    	lastSmartWallLoad = 0;
						}
						var airPushLoadCount = Number(localStorage.getItem("airPushLoadCount"));
						if(airPushLoadCount == undefined || isNaN(airPushLoadCount) || airPushLoadCount == NaN) {
		         	    	airPushLoadCount = 0;
						}
						
						var airPushCurrentTime = new Date().getTime();
						if(airPushLoadCount <= 0 || lastSmartWallLoad + 600000 < airPushCurrentTime){
							localStorage.setItem("airPushLoadCount",5);
							localStorage.setItem("airPushLastSmartWallLoad", airPushCurrentTime);
							
							$("a").click(function(e){
								var clickUrl = this.href;
								if(clickUrl.indexOf("http:") == -1 && clickUrl.indexOf("#") == -1){
									e.preventDefault();
									$.mobile.loading("show");
									airPush.smartWall.showCached("smartwall",airPushSuccess, airPushError);
									window.location = clickUrl;
								}
							});
						}
						else{
							localStorage.setItem("airPushLoadCount", airPushLoadCount - 1);
						}
						
					}
				

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
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=additionalTab1&appId=35567053951ca0db58541f5.58670733\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
						    console.log("AdMob: Document ready");
							document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					    });
                  
						function onDeviceReadyAdMob() {
			         		admob.setOptions( {
                  				 publisherId: "NONE",
		                         adSize: admob.AD_SIZE.SMART_BANNER,
		                         bannerAtTop:  true, // set to true, to put banner at top
		                         overlap: false, // set to true, to allow banner overlap webview
		                         offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
		                         isTesting: false, // receiving test ad
		                         autoShowBanner: true, // auto show ad when loaded
				                 autoShowInterstitial: false
                     		}, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
				          
                  
                  
                  
				  		
				  	
				            admob.createBannerView({publisherId:"ca-app-pub-3752183509384517/7759885982"});
				         
		         		
				            var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
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
								localStorage.setItem("ic",2);
			         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
                  
					            admob.requestInterstitialAd({interstitialAdId:"ca-app-pub-3752183509384517/4392082381", autoShowInterstitial: false} );
					     		document.addEventListener(admob.events.onAdLoaded, function (ad) {
					            	if(ad.adType == admob.AD_TYPE.INTERSTITIAL){
					            		console.log("AdMob Interstitial loaded.");
							            $("a").click(function(e){
							            	if(this.href.indexOf("http:") == -1 && this.href.indexOf("#") == -1){
												 admob.showInterstitialAd();
							            	}
							            });
					            	}
					            });
					        }
					        else{
					        	localStorage.setItem("ic", ic - 1);
					        }
                  
		         	
				 }
				 

					$(document).on("deviceready", function(){
						console.log("Register AirPush App ID.");
						airPush.setAppId(293047, airPushSuccess, airPushError);
						console.log("Register AirPush API Key.");
						airPush.setApiKey( 1447003968254650339, airPushSuccess, airPushError);
						console.log("Enable AirPush caching.");
						airPush.setCaching(true, airPushSuccess, airPushError);
						if(0 == 1)
							airPushBannerAds();
						if(1 == 1)
							airPushSmartWallAds();
					});
								
					function airPushSuccess(e){
						console.log("AirPush Success. " + JSON.stringify(e));
					}
					function airPushError(e){
						console.log("AirPush Error: " + JSON.stringify(e));
					}
								
								
					function airPushBannerAds(){
						console.log("Requesting AirPush Banner.");
						airPush.inlineBanner.showInlineBanner(airPushSuccess, airPushError);
					}
					function airPushSmartWallAds(){
						airPush.smartWall.showDefault(airPushSuccess, airPushError);
						var lastSmartWallLoad = Number(localStorage.getItem("airPushLastSmartWallLoad"));
						if(lastSmartWallLoad == undefined || isNaN(lastSmartWallLoad) || lastSmartWallLoad == NaN) {
		         	    	lastSmartWallLoad = 0;
						}
						var airPushLoadCount = Number(localStorage.getItem("airPushLoadCount"));
						if(airPushLoadCount == undefined || isNaN(airPushLoadCount) || airPushLoadCount == NaN) {
		         	    	airPushLoadCount = 0;
						}
						
						var airPushCurrentTime = new Date().getTime();
						if(airPushLoadCount <= 0 || lastSmartWallLoad + 600000 < airPushCurrentTime){
							localStorage.setItem("airPushLoadCount",5);
							localStorage.setItem("airPushLastSmartWallLoad", airPushCurrentTime);
							
							$("a").click(function(e){
								var clickUrl = this.href;
								if(clickUrl.indexOf("http:") == -1 && clickUrl.indexOf("#") == -1){
									e.preventDefault();
									$.mobile.loading("show");
									airPush.smartWall.showCached("smartwall",airPushSuccess, airPushError);
									window.location = clickUrl;
								}
							});
						}
						else{
							localStorage.setItem("airPushLoadCount", airPushLoadCount - 1);
						}
						
					}
				

						var nextPageToken, isLoading;
			
						(function ( $ ) {
			
						    $.fn.youtubeFeed = function(options) {
			
						        $.mobile.loading("show");
								isLoading = true;
			
						        var divId = "#"+$(this).attr("id");
						        var q = $(this).attr("data-youtube-query");
						        var key = $(this).attr("data-youtube-key");
						        var type = $(this).attr("data-youtube-type");
			
						        if(type == "channel"){
						            $.get("https://www.googleapis.com/youtube/v3/channels",{
						                part: "id",
						                forUsername: q,
						                maxResults: 1,
						                key: key
						            }, "jsonp")
						            .success(function(data){
						                q = data.items[0].id;
						                $.get("https://www.googleapis.com/youtube/v3/search",{
						                    part: "snippet,id",
						                    channelId: q,
						                    type: "video",
						                    maxResults: 24,
						                    order: "date",
						                    pageToken: nextPageToken,
						                    key: key
						                }, "jsonp")
						                .success(getFeedSuccess);
						            });
						        }
						        else if(type == "search"){
						            $.get("https://www.googleapis.com/youtube/v3/search",{
						                part: "snippet,id",
						                q: q,
						                type: "video",
						                maxResults: 24,
						                pageToken: nextPageToken,
						                key: key
						            }, "jsonp")
						            .success(getFeedSuccess);
						        }
			
						        function getFeedSuccess(data){
						            //console.log(data);
						            if(data.nextPageToken){
						                nextPageToken = data.nextPageToken;
						                $(window).on("scroll",loadMore);
						            }
						            else{
						                console.log("Last page of results.")
						                $(window).off("scroll");
						            }
						            //console.log(nextPageToken);
						            var html = "<ul class='feedlist' data-role='listview' data-inset='true'>\n";
			
						            $(data.items).each(function(i, item){
						                //console.log(item);
						                var thumb = item.snippet.thumbnails.medium.url;
						                var channelTitle = item.snippet.channelTitle;
						                var title = item.snippet.title;
						                var url = "http://m.youtube.com/watch?v="+item.id.videoId;
			
						                html += "<li data-icon='false'><a target='_system' class='youtube-item' href='"+url+"'>\n" +
						                    "<img src='"+thumb+"' class='ui-li-thumb'>\n" +
						                    "<h2>"+title+"</h2>\n" +
						                    "<p>"+channelTitle+"</p>\n</a></li>";
			
			
			
						            });
			
						            html += "</ul>";
						            $(divId).append(html);
						            $('.feedlist').listview();
									$(".youtube-item").on("click", function(e){
						                e.preventDefault();
						    			window.open($(this).attr("href"),"_system","location=yes");
						    			return false;
						    		});
						            $.mobile.loading("hide");
									isLoading = false;
						        }
			
						        function loadMore(){
						            if (!isLoading && ($(document).height() - 8 <= $(window).scrollTop() + $(window).height())) {
						                console.log("Grabbing more contnet.");
						                $(divId).youtubeFeed();
						            }
						        }
			
			
						    };
			
						}( jQuery ));
			
						$(document).ready(function(){
					        $("#youtubevideos").youtubeFeed();
					    });
			
					

		$(document).ready(function() {
			if($("#title-home-label").length > 0) {
				var w = $("#title-home-label").width() + 50;
				$("#title-home-button").width(w);
			}
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=youtubeKeywords&appId=35567053951ca0db58541f5.58670733\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
    });
});






                
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
						    console.log("AdMob: Document ready");
							document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					    });
                  
						function onDeviceReadyAdMob() {
			         		admob.setOptions( {
                  				 publisherId: "NONE",
		                         adSize: admob.AD_SIZE.SMART_BANNER,
		                         bannerAtTop:  true, // set to true, to put banner at top
		                         overlap: false, // set to true, to allow banner overlap webview
		                         offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
		                         isTesting: false, // receiving test ad
		                         autoShowBanner: true, // auto show ad when loaded
				                 autoShowInterstitial: false
                     		}, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
				          
                  
                  
                  
				  		
				  	
				            admob.createBannerView({publisherId:"ca-app-pub-3752183509384517/7759885982"});
				         
		         		
				            var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
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
								localStorage.setItem("ic",2);
			         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
                  
					            admob.requestInterstitialAd({interstitialAdId:"ca-app-pub-3752183509384517/4392082381", autoShowInterstitial: false} );
					     		document.addEventListener(admob.events.onAdLoaded, function (ad) {
					            	if(ad.adType == admob.AD_TYPE.INTERSTITIAL){
					            		console.log("AdMob Interstitial loaded.");
							            $("a").click(function(e){
							            	if(this.href.indexOf("http:") == -1 && this.href.indexOf("#") == -1){
												 admob.showInterstitialAd();
							            	}
							            });
					            	}
					            });
					        }
					        else{
					        	localStorage.setItem("ic", ic - 1);
					        }
                  
		         	
				 }
				 

					$(document).on("deviceready", function(){
						console.log("Register AirPush App ID.");
						airPush.setAppId(293047, airPushSuccess, airPushError);
						console.log("Register AirPush API Key.");
						airPush.setApiKey( 1447003968254650339, airPushSuccess, airPushError);
						console.log("Enable AirPush caching.");
						airPush.setCaching(true, airPushSuccess, airPushError);
						if(0 == 1)
							airPushBannerAds();
						if(1 == 1)
							airPushSmartWallAds();
					});
								
					function airPushSuccess(e){
						console.log("AirPush Success. " + JSON.stringify(e));
					}
					function airPushError(e){
						console.log("AirPush Error: " + JSON.stringify(e));
					}
								
								
					function airPushBannerAds(){
						console.log("Requesting AirPush Banner.");
						airPush.inlineBanner.showInlineBanner(airPushSuccess, airPushError);
					}
					function airPushSmartWallAds(){
						airPush.smartWall.showDefault(airPushSuccess, airPushError);
						var lastSmartWallLoad = Number(localStorage.getItem("airPushLastSmartWallLoad"));
						if(lastSmartWallLoad == undefined || isNaN(lastSmartWallLoad) || lastSmartWallLoad == NaN) {
		         	    	lastSmartWallLoad = 0;
						}
						var airPushLoadCount = Number(localStorage.getItem("airPushLoadCount"));
						if(airPushLoadCount == undefined || isNaN(airPushLoadCount) || airPushLoadCount == NaN) {
		         	    	airPushLoadCount = 0;
						}
						
						var airPushCurrentTime = new Date().getTime();
						if(airPushLoadCount <= 0 || lastSmartWallLoad + 600000 < airPushCurrentTime){
							localStorage.setItem("airPushLoadCount",5);
							localStorage.setItem("airPushLastSmartWallLoad", airPushCurrentTime);
							
							$("a").click(function(e){
								var clickUrl = this.href;
								if(clickUrl.indexOf("http:") == -1 && clickUrl.indexOf("#") == -1){
									e.preventDefault();
									$.mobile.loading("show");
									airPush.smartWall.showCached("smartwall",airPushSuccess, airPushError);
									window.location = clickUrl;
								}
							});
						}
						else{
							localStorage.setItem("airPushLoadCount", airPushLoadCount - 1);
						}
						
					}
				

		
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
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=billCalculator&appId=35567053951ca0db58541f5.58670733\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
						    console.log("AdMob: Document ready");
							document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					    });
                  
						function onDeviceReadyAdMob() {
			         		admob.setOptions( {
                  				 publisherId: "NONE",
		                         adSize: admob.AD_SIZE.SMART_BANNER,
		                         bannerAtTop:  true, // set to true, to put banner at top
		                         overlap: false, // set to true, to allow banner overlap webview
		                         offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
		                         isTesting: false, // receiving test ad
		                         autoShowBanner: true, // auto show ad when loaded
				                 autoShowInterstitial: false
                     		}, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
				          
                  
                  
                  
				  		
				  	
				            admob.createBannerView({publisherId:"ca-app-pub-3752183509384517/7759885982"});
				         
		         		
				            var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
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
								localStorage.setItem("ic",2);
			         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
                  
					            admob.requestInterstitialAd({interstitialAdId:"ca-app-pub-3752183509384517/4392082381", autoShowInterstitial: false} );
					     		document.addEventListener(admob.events.onAdLoaded, function (ad) {
					            	if(ad.adType == admob.AD_TYPE.INTERSTITIAL){
					            		console.log("AdMob Interstitial loaded.");
							            $("a").click(function(e){
							            	if(this.href.indexOf("http:") == -1 && this.href.indexOf("#") == -1){
												 admob.showInterstitialAd();
							            	}
							            });
					            	}
					            });
					        }
					        else{
					        	localStorage.setItem("ic", ic - 1);
					        }
                  
		         	
				 }
				 

					$(document).on("deviceready", function(){
						console.log("Register AirPush App ID.");
						airPush.setAppId(293047, airPushSuccess, airPushError);
						console.log("Register AirPush API Key.");
						airPush.setApiKey( 1447003968254650339, airPushSuccess, airPushError);
						console.log("Enable AirPush caching.");
						airPush.setCaching(true, airPushSuccess, airPushError);
						if(0 == 1)
							airPushBannerAds();
						if(1 == 1)
							airPushSmartWallAds();
					});
								
					function airPushSuccess(e){
						console.log("AirPush Success. " + JSON.stringify(e));
					}
					function airPushError(e){
						console.log("AirPush Error: " + JSON.stringify(e));
					}
								
								
					function airPushBannerAds(){
						console.log("Requesting AirPush Banner.");
						airPush.inlineBanner.showInlineBanner(airPushSuccess, airPushError);
					}
					function airPushSmartWallAds(){
						airPush.smartWall.showDefault(airPushSuccess, airPushError);
						var lastSmartWallLoad = Number(localStorage.getItem("airPushLastSmartWallLoad"));
						if(lastSmartWallLoad == undefined || isNaN(lastSmartWallLoad) || lastSmartWallLoad == NaN) {
		         	    	lastSmartWallLoad = 0;
						}
						var airPushLoadCount = Number(localStorage.getItem("airPushLoadCount"));
						if(airPushLoadCount == undefined || isNaN(airPushLoadCount) || airPushLoadCount == NaN) {
		         	    	airPushLoadCount = 0;
						}
						
						var airPushCurrentTime = new Date().getTime();
						if(airPushLoadCount <= 0 || lastSmartWallLoad + 600000 < airPushCurrentTime){
							localStorage.setItem("airPushLoadCount",5);
							localStorage.setItem("airPushLastSmartWallLoad", airPushCurrentTime);
							
							$("a").click(function(e){
								var clickUrl = this.href;
								if(clickUrl.indexOf("http:") == -1 && clickUrl.indexOf("#") == -1){
									e.preventDefault();
									$.mobile.loading("show");
									airPush.smartWall.showCached("smartwall",airPushSuccess, airPushError);
									window.location = clickUrl;
								}
							});
						}
						else{
							localStorage.setItem("airPushLoadCount", airPushLoadCount - 1);
						}
						
					}
				

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
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=additionalTab3&appId=35567053951ca0db58541f5.58670733\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
						    console.log("AdMob: Document ready");
							document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					    });
                  
						function onDeviceReadyAdMob() {
			         		admob.setOptions( {
                  				 publisherId: "NONE",
		                         adSize: admob.AD_SIZE.SMART_BANNER,
		                         bannerAtTop:  true, // set to true, to put banner at top
		                         overlap: false, // set to true, to allow banner overlap webview
		                         offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
		                         isTesting: false, // receiving test ad
		                         autoShowBanner: true, // auto show ad when loaded
				                 autoShowInterstitial: false
                     		}, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
				          
                  
                  
                  
				  		
				  	
				            admob.createBannerView({publisherId:"ca-app-pub-3752183509384517/7759885982"});
				         
		         		
				            var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
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
								localStorage.setItem("ic",2);
			         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
                  
					            admob.requestInterstitialAd({interstitialAdId:"ca-app-pub-3752183509384517/4392082381", autoShowInterstitial: false} );
					     		document.addEventListener(admob.events.onAdLoaded, function (ad) {
					            	if(ad.adType == admob.AD_TYPE.INTERSTITIAL){
					            		console.log("AdMob Interstitial loaded.");
							            $("a").click(function(e){
							            	if(this.href.indexOf("http:") == -1 && this.href.indexOf("#") == -1){
												 admob.showInterstitialAd();
							            	}
							            });
					            	}
					            });
					        }
					        else{
					        	localStorage.setItem("ic", ic - 1);
					        }
                  
		         	
				 }
				 

					$(document).on("deviceready", function(){
						console.log("Register AirPush App ID.");
						airPush.setAppId(293047, airPushSuccess, airPushError);
						console.log("Register AirPush API Key.");
						airPush.setApiKey( 1447003968254650339, airPushSuccess, airPushError);
						console.log("Enable AirPush caching.");
						airPush.setCaching(true, airPushSuccess, airPushError);
						if(0 == 1)
							airPushBannerAds();
						if(1 == 1)
							airPushSmartWallAds();
					});
								
					function airPushSuccess(e){
						console.log("AirPush Success. " + JSON.stringify(e));
					}
					function airPushError(e){
						console.log("AirPush Error: " + JSON.stringify(e));
					}
								
								
					function airPushBannerAds(){
						console.log("Requesting AirPush Banner.");
						airPush.inlineBanner.showInlineBanner(airPushSuccess, airPushError);
					}
					function airPushSmartWallAds(){
						airPush.smartWall.showDefault(airPushSuccess, airPushError);
						var lastSmartWallLoad = Number(localStorage.getItem("airPushLastSmartWallLoad"));
						if(lastSmartWallLoad == undefined || isNaN(lastSmartWallLoad) || lastSmartWallLoad == NaN) {
		         	    	lastSmartWallLoad = 0;
						}
						var airPushLoadCount = Number(localStorage.getItem("airPushLoadCount"));
						if(airPushLoadCount == undefined || isNaN(airPushLoadCount) || airPushLoadCount == NaN) {
		         	    	airPushLoadCount = 0;
						}
						
						var airPushCurrentTime = new Date().getTime();
						if(airPushLoadCount <= 0 || lastSmartWallLoad + 600000 < airPushCurrentTime){
							localStorage.setItem("airPushLoadCount",5);
							localStorage.setItem("airPushLastSmartWallLoad", airPushCurrentTime);
							
							$("a").click(function(e){
								var clickUrl = this.href;
								if(clickUrl.indexOf("http:") == -1 && clickUrl.indexOf("#") == -1){
									e.preventDefault();
									$.mobile.loading("show");
									airPush.smartWall.showCached("smartwall",airPushSuccess, airPushError);
									window.location = clickUrl;
								}
							});
						}
						else{
							localStorage.setItem("airPushLoadCount", airPushLoadCount - 1);
						}
						
					}
				


		
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
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=openTable&appId=35567053951ca0db58541f5.58670733\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
						    console.log("AdMob: Document ready");
							document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					    });
                  
						function onDeviceReadyAdMob() {
			         		admob.setOptions( {
                  				 publisherId: "NONE",
		                         adSize: admob.AD_SIZE.SMART_BANNER,
		                         bannerAtTop:  true, // set to true, to put banner at top
		                         overlap: false, // set to true, to allow banner overlap webview
		                         offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
		                         isTesting: false, // receiving test ad
		                         autoShowBanner: true, // auto show ad when loaded
				                 autoShowInterstitial: false
                     		}, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
				          
                  
                  
                  
				  		
				  	
				            admob.createBannerView({publisherId:"ca-app-pub-3752183509384517/7759885982"});
				         
		         		
				            var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
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
								localStorage.setItem("ic",2);
			         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
                  
					            admob.requestInterstitialAd({interstitialAdId:"ca-app-pub-3752183509384517/4392082381", autoShowInterstitial: false} );
					     		document.addEventListener(admob.events.onAdLoaded, function (ad) {
					            	if(ad.adType == admob.AD_TYPE.INTERSTITIAL){
					            		console.log("AdMob Interstitial loaded.");
							            $("a").click(function(e){
							            	if(this.href.indexOf("http:") == -1 && this.href.indexOf("#") == -1){
												 admob.showInterstitialAd();
							            	}
							            });
					            	}
					            });
					        }
					        else{
					        	localStorage.setItem("ic", ic - 1);
					        }
                  
		         	
				 }
				 

					$(document).on("deviceready", function(){
						console.log("Register AirPush App ID.");
						airPush.setAppId(293047, airPushSuccess, airPushError);
						console.log("Register AirPush API Key.");
						airPush.setApiKey( 1447003968254650339, airPushSuccess, airPushError);
						console.log("Enable AirPush caching.");
						airPush.setCaching(true, airPushSuccess, airPushError);
						if(0 == 1)
							airPushBannerAds();
						if(1 == 1)
							airPushSmartWallAds();
					});
								
					function airPushSuccess(e){
						console.log("AirPush Success. " + JSON.stringify(e));
					}
					function airPushError(e){
						console.log("AirPush Error: " + JSON.stringify(e));
					}
								
								
					function airPushBannerAds(){
						console.log("Requesting AirPush Banner.");
						airPush.inlineBanner.showInlineBanner(airPushSuccess, airPushError);
					}
					function airPushSmartWallAds(){
						airPush.smartWall.showDefault(airPushSuccess, airPushError);
						var lastSmartWallLoad = Number(localStorage.getItem("airPushLastSmartWallLoad"));
						if(lastSmartWallLoad == undefined || isNaN(lastSmartWallLoad) || lastSmartWallLoad == NaN) {
		         	    	lastSmartWallLoad = 0;
						}
						var airPushLoadCount = Number(localStorage.getItem("airPushLoadCount"));
						if(airPushLoadCount == undefined || isNaN(airPushLoadCount) || airPushLoadCount == NaN) {
		         	    	airPushLoadCount = 0;
						}
						
						var airPushCurrentTime = new Date().getTime();
						if(airPushLoadCount <= 0 || lastSmartWallLoad + 600000 < airPushCurrentTime){
							localStorage.setItem("airPushLoadCount",5);
							localStorage.setItem("airPushLastSmartWallLoad", airPushCurrentTime);
							
							$("a").click(function(e){
								var clickUrl = this.href;
								if(clickUrl.indexOf("http:") == -1 && clickUrl.indexOf("#") == -1){
									e.preventDefault();
									$.mobile.loading("show");
									airPush.smartWall.showCached("smartwall",airPushSuccess, airPushError);
									window.location = clickUrl;
								}
							});
						}
						else{
							localStorage.setItem("airPushLoadCount", airPushLoadCount - 1);
						}
						
					}
				

	    	
    $(document).ready(function() {
    document.body.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                }, false);/*
if(screen.height>550){
        $("body").css("background","url(\"\")");
        $("body").css("backgroundSize","100% 100%");
        $(".ui-page").css("background","url(\"\")");
        $(".ui-page").css("backgroundImage","url(\"\")");
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
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=index&appId=35567053951ca0db58541f5.58670733\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
						    console.log("AdMob: Document ready");
							document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					    });
                  
						function onDeviceReadyAdMob() {
			         		admob.setOptions( {
                  				 publisherId: "NONE",
		                         adSize: admob.AD_SIZE.SMART_BANNER,
		                         bannerAtTop:  true, // set to true, to put banner at top
		                         overlap: false, // set to true, to allow banner overlap webview
		                         offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
		                         isTesting: false, // receiving test ad
		                         autoShowBanner: true, // auto show ad when loaded
				                 autoShowInterstitial: false
                     		}, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
				          
                  
                  
                  
				  		
				  	
				            admob.createBannerView({publisherId:"ca-app-pub-3752183509384517/7759885982"});
				         
		         		
				            var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
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
								localStorage.setItem("ic",2);
			         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
                  
					            admob.requestInterstitialAd({interstitialAdId:"ca-app-pub-3752183509384517/4392082381", autoShowInterstitial: false} );
					     		document.addEventListener(admob.events.onAdLoaded, function (ad) {
					            	if(ad.adType == admob.AD_TYPE.INTERSTITIAL){
					            		console.log("AdMob Interstitial loaded.");
							            $("a").click(function(e){
							            	if(this.href.indexOf("http:") == -1 && this.href.indexOf("#") == -1){
												 admob.showInterstitialAd();
							            	}
							            });
					            	}
					            });
					        }
					        else{
					        	localStorage.setItem("ic", ic - 1);
					        }
                  
		         	
				 }
				 

					$(document).on("deviceready", function(){
						console.log("Register AirPush App ID.");
						airPush.setAppId(293047, airPushSuccess, airPushError);
						console.log("Register AirPush API Key.");
						airPush.setApiKey( 1447003968254650339, airPushSuccess, airPushError);
						console.log("Enable AirPush caching.");
						airPush.setCaching(true, airPushSuccess, airPushError);
						if(0 == 1)
							airPushBannerAds();
						if(1 == 1)
							airPushSmartWallAds();
					});
								
					function airPushSuccess(e){
						console.log("AirPush Success. " + JSON.stringify(e));
					}
					function airPushError(e){
						console.log("AirPush Error: " + JSON.stringify(e));
					}
								
								
					function airPushBannerAds(){
						console.log("Requesting AirPush Banner.");
						airPush.inlineBanner.showInlineBanner(airPushSuccess, airPushError);
					}
					function airPushSmartWallAds(){
						airPush.smartWall.showDefault(airPushSuccess, airPushError);
						var lastSmartWallLoad = Number(localStorage.getItem("airPushLastSmartWallLoad"));
						if(lastSmartWallLoad == undefined || isNaN(lastSmartWallLoad) || lastSmartWallLoad == NaN) {
		         	    	lastSmartWallLoad = 0;
						}
						var airPushLoadCount = Number(localStorage.getItem("airPushLoadCount"));
						if(airPushLoadCount == undefined || isNaN(airPushLoadCount) || airPushLoadCount == NaN) {
		         	    	airPushLoadCount = 0;
						}
						
						var airPushCurrentTime = new Date().getTime();
						if(airPushLoadCount <= 0 || lastSmartWallLoad + 600000 < airPushCurrentTime){
							localStorage.setItem("airPushLoadCount",5);
							localStorage.setItem("airPushLastSmartWallLoad", airPushCurrentTime);
							
							$("a").click(function(e){
								var clickUrl = this.href;
								if(clickUrl.indexOf("http:") == -1 && clickUrl.indexOf("#") == -1){
									e.preventDefault();
									$.mobile.loading("show");
									airPush.smartWall.showCached("smartwall",airPushSuccess, airPushError);
									window.location = clickUrl;
								}
							});
						}
						else{
							localStorage.setItem("airPushLoadCount", airPushLoadCount - 1);
						}
						
					}
				

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
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=additionalTab4&appId=35567053951ca0db58541f5.58670733\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
						    console.log("AdMob: Document ready");
							document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					    });
                  
						function onDeviceReadyAdMob() {
			         		admob.setOptions( {
                  				 publisherId: "NONE",
		                         adSize: admob.AD_SIZE.SMART_BANNER,
		                         bannerAtTop:  true, // set to true, to put banner at top
		                         overlap: false, // set to true, to allow banner overlap webview
		                         offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
		                         isTesting: false, // receiving test ad
		                         autoShowBanner: true, // auto show ad when loaded
				                 autoShowInterstitial: false
                     		}, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
				          
                  
                  
                  
				  		
				  	
				            admob.createBannerView({publisherId:"ca-app-pub-3752183509384517/7759885982"});
				         
		         		
				            var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
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
								localStorage.setItem("ic",2);
			         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
                  
					            admob.requestInterstitialAd({interstitialAdId:"ca-app-pub-3752183509384517/4392082381", autoShowInterstitial: false} );
					     		document.addEventListener(admob.events.onAdLoaded, function (ad) {
					            	if(ad.adType == admob.AD_TYPE.INTERSTITIAL){
					            		console.log("AdMob Interstitial loaded.");
							            $("a").click(function(e){
							            	if(this.href.indexOf("http:") == -1 && this.href.indexOf("#") == -1){
												 admob.showInterstitialAd();
							            	}
							            });
					            	}
					            });
					        }
					        else{
					        	localStorage.setItem("ic", ic - 1);
					        }
                  
		         	
				 }
				 

					$(document).on("deviceready", function(){
						console.log("Register AirPush App ID.");
						airPush.setAppId(293047, airPushSuccess, airPushError);
						console.log("Register AirPush API Key.");
						airPush.setApiKey( 1447003968254650339, airPushSuccess, airPushError);
						console.log("Enable AirPush caching.");
						airPush.setCaching(true, airPushSuccess, airPushError);
						if(0 == 1)
							airPushBannerAds();
						if(1 == 1)
							airPushSmartWallAds();
					});
								
					function airPushSuccess(e){
						console.log("AirPush Success. " + JSON.stringify(e));
					}
					function airPushError(e){
						console.log("AirPush Error: " + JSON.stringify(e));
					}
								
								
					function airPushBannerAds(){
						console.log("Requesting AirPush Banner.");
						airPush.inlineBanner.showInlineBanner(airPushSuccess, airPushError);
					}
					function airPushSmartWallAds(){
						airPush.smartWall.showDefault(airPushSuccess, airPushError);
						var lastSmartWallLoad = Number(localStorage.getItem("airPushLastSmartWallLoad"));
						if(lastSmartWallLoad == undefined || isNaN(lastSmartWallLoad) || lastSmartWallLoad == NaN) {
		         	    	lastSmartWallLoad = 0;
						}
						var airPushLoadCount = Number(localStorage.getItem("airPushLoadCount"));
						if(airPushLoadCount == undefined || isNaN(airPushLoadCount) || airPushLoadCount == NaN) {
		         	    	airPushLoadCount = 0;
						}
						
						var airPushCurrentTime = new Date().getTime();
						if(airPushLoadCount <= 0 || lastSmartWallLoad + 600000 < airPushCurrentTime){
							localStorage.setItem("airPushLoadCount",5);
							localStorage.setItem("airPushLastSmartWallLoad", airPushCurrentTime);
							
							$("a").click(function(e){
								var clickUrl = this.href;
								if(clickUrl.indexOf("http:") == -1 && clickUrl.indexOf("#") == -1){
									e.preventDefault();
									$.mobile.loading("show");
									airPush.smartWall.showCached("smartwall",airPushSuccess, airPushError);
									window.location = clickUrl;
								}
							});
						}
						else{
							localStorage.setItem("airPushLoadCount", airPushLoadCount - 1);
						}
						
					}
				

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
						getEvents(); //getRss();
					}
				
				
        });
					
				function getRss() {
				    $("#rss-content").rssfeed("http://www.eventbrite.com/directoryjson/?lat=" + latitude + "&lng=" + longitude +"", zRssOptions,
	                               function() {
	                                   $.mobile.loading("hide");
						               resizeRssImages();
	                               }
	                       );	
			    }
				    
					function getEvents(){
					   	$.getJSON("http://www.eventbrite.com/directoryjson/?lat=" + latitude + "&lng=" + longitude +"").
					    	success(function(data){
					    		html = "<ul data-role='listview'  data-icon='false'>";
	    						
	    						$(data.events).each(function(i, event){
					   				var start_date = new Date(event.start_date.split(" ")[0]).toDateString();
					   				if(start_date == "Invalid Date"){
					   					start_date = "Upcoming";
					   				} 
	    							html += "<li data-role='list-divider'>"+start_date+"</li>";
	    							html += "<li><a href='http://www.eventbrite.com/e/"+event.id+"' class='event-item' target='_system'>";
	    							html += "<img style='width: 91px; height: 91px;' src='"+event.event_logo+"' />";
	    							html += "<strong>"+event.title+"</strong>";
	    							html += "<p>"+event.description+"</p></a></li>";
	    						});
					   			html += "</ul>";
					   			
					    		$("#rss-content").html(html).find("ul").listview();
					   			$(".event-item").on("click", function(e){
					                e.preventDefault();
					    			window.open($(this).attr("href"),"_system","location=yes");
					    			return false;
					    		});
					   			$.mobile.loading("hide");
					   	});
					}
                

		$(document).ready(function() {
			if($("#title-home-label").length > 0) {
				var w = $("#title-home-label").width() + 50;
				$("#title-home-button").width(w);
			}
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=localEvents&appId=35567053951ca0db58541f5.58670733\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
						    console.log("AdMob: Document ready");
							document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					    });
                  
						function onDeviceReadyAdMob() {
			         		admob.setOptions( {
                  				 publisherId: "NONE",
		                         adSize: admob.AD_SIZE.SMART_BANNER,
		                         bannerAtTop:  true, // set to true, to put banner at top
		                         overlap: false, // set to true, to allow banner overlap webview
		                         offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
		                         isTesting: false, // receiving test ad
		                         autoShowBanner: true, // auto show ad when loaded
				                 autoShowInterstitial: false
                     		}, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
				          
                  
                  
                  
				  		
				  	
				            admob.createBannerView({publisherId:"ca-app-pub-3752183509384517/7759885982"});
				         
		         		
				            var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
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
								localStorage.setItem("ic",2);
			         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
                  
					            admob.requestInterstitialAd({interstitialAdId:"ca-app-pub-3752183509384517/4392082381", autoShowInterstitial: false} );
					     		document.addEventListener(admob.events.onAdLoaded, function (ad) {
					            	if(ad.adType == admob.AD_TYPE.INTERSTITIAL){
					            		console.log("AdMob Interstitial loaded.");
							            $("a").click(function(e){
							            	if(this.href.indexOf("http:") == -1 && this.href.indexOf("#") == -1){
												 admob.showInterstitialAd();
							            	}
							            });
					            	}
					            });
					        }
					        else{
					        	localStorage.setItem("ic", ic - 1);
					        }
                  
		         	
				 }
				 

					$(document).on("deviceready", function(){
						console.log("Register AirPush App ID.");
						airPush.setAppId(293047, airPushSuccess, airPushError);
						console.log("Register AirPush API Key.");
						airPush.setApiKey( 1447003968254650339, airPushSuccess, airPushError);
						console.log("Enable AirPush caching.");
						airPush.setCaching(true, airPushSuccess, airPushError);
						if(0 == 1)
							airPushBannerAds();
						if(1 == 1)
							airPushSmartWallAds();
					});
								
					function airPushSuccess(e){
						console.log("AirPush Success. " + JSON.stringify(e));
					}
					function airPushError(e){
						console.log("AirPush Error: " + JSON.stringify(e));
					}
								
								
					function airPushBannerAds(){
						console.log("Requesting AirPush Banner.");
						airPush.inlineBanner.showInlineBanner(airPushSuccess, airPushError);
					}
					function airPushSmartWallAds(){
						airPush.smartWall.showDefault(airPushSuccess, airPushError);
						var lastSmartWallLoad = Number(localStorage.getItem("airPushLastSmartWallLoad"));
						if(lastSmartWallLoad == undefined || isNaN(lastSmartWallLoad) || lastSmartWallLoad == NaN) {
		         	    	lastSmartWallLoad = 0;
						}
						var airPushLoadCount = Number(localStorage.getItem("airPushLoadCount"));
						if(airPushLoadCount == undefined || isNaN(airPushLoadCount) || airPushLoadCount == NaN) {
		         	    	airPushLoadCount = 0;
						}
						
						var airPushCurrentTime = new Date().getTime();
						if(airPushLoadCount <= 0 || lastSmartWallLoad + 600000 < airPushCurrentTime){
							localStorage.setItem("airPushLoadCount",5);
							localStorage.setItem("airPushLastSmartWallLoad", airPushCurrentTime);
							
							$("a").click(function(e){
								var clickUrl = this.href;
								if(clickUrl.indexOf("http:") == -1 && clickUrl.indexOf("#") == -1){
									e.preventDefault();
									$.mobile.loading("show");
									airPush.smartWall.showCached("smartwall",airPushSuccess, airPushError);
									window.location = clickUrl;
								}
							});
						}
						else{
							localStorage.setItem("airPushLoadCount", airPushLoadCount - 1);
						}
						
					}
				

		$(document).ready(function() {
			if($("#title-home-label").length > 0) {
				var w = $("#title-home-label").width() + 50;
				$("#title-home-button").width(w);
			}
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
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
						    console.log("AdMob: Document ready");
							document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					    });
                  
						function onDeviceReadyAdMob() {
			         		admob.setOptions( {
                  				 publisherId: "NONE",
		                         adSize: admob.AD_SIZE.SMART_BANNER,
		                         bannerAtTop:  true, // set to true, to put banner at top
		                         overlap: false, // set to true, to allow banner overlap webview
		                         offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
		                         isTesting: false, // receiving test ad
		                         autoShowBanner: true, // auto show ad when loaded
				                 autoShowInterstitial: false
                     		}, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
				          
                  
                  
                  
				  		
				  	
				            admob.createBannerView({publisherId:"ca-app-pub-3752183509384517/7759885982"});
				         
		         		
				            var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
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
								localStorage.setItem("ic",2);
			         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
                  
					            admob.requestInterstitialAd({interstitialAdId:"ca-app-pub-3752183509384517/4392082381", autoShowInterstitial: false} );
					     		document.addEventListener(admob.events.onAdLoaded, function (ad) {
					            	if(ad.adType == admob.AD_TYPE.INTERSTITIAL){
					            		console.log("AdMob Interstitial loaded.");
							            $("a").click(function(e){
							            	if(this.href.indexOf("http:") == -1 && this.href.indexOf("#") == -1){
												 admob.showInterstitialAd();
							            	}
							            });
					            	}
					            });
					        }
					        else{
					        	localStorage.setItem("ic", ic - 1);
					        }
                  
		         	
				 }
				 

					$(document).on("deviceready", function(){
						console.log("Register AirPush App ID.");
						airPush.setAppId(293047, airPushSuccess, airPushError);
						console.log("Register AirPush API Key.");
						airPush.setApiKey( 1447003968254650339, airPushSuccess, airPushError);
						console.log("Enable AirPush caching.");
						airPush.setCaching(true, airPushSuccess, airPushError);
						if(0 == 1)
							airPushBannerAds();
						if(1 == 1)
							airPushSmartWallAds();
					});
								
					function airPushSuccess(e){
						console.log("AirPush Success. " + JSON.stringify(e));
					}
					function airPushError(e){
						console.log("AirPush Error: " + JSON.stringify(e));
					}
								
								
					function airPushBannerAds(){
						console.log("Requesting AirPush Banner.");
						airPush.inlineBanner.showInlineBanner(airPushSuccess, airPushError);
					}
					function airPushSmartWallAds(){
						airPush.smartWall.showDefault(airPushSuccess, airPushError);
						var lastSmartWallLoad = Number(localStorage.getItem("airPushLastSmartWallLoad"));
						if(lastSmartWallLoad == undefined || isNaN(lastSmartWallLoad) || lastSmartWallLoad == NaN) {
		         	    	lastSmartWallLoad = 0;
						}
						var airPushLoadCount = Number(localStorage.getItem("airPushLoadCount"));
						if(airPushLoadCount == undefined || isNaN(airPushLoadCount) || airPushLoadCount == NaN) {
		         	    	airPushLoadCount = 0;
						}
						
						var airPushCurrentTime = new Date().getTime();
						if(airPushLoadCount <= 0 || lastSmartWallLoad + 600000 < airPushCurrentTime){
							localStorage.setItem("airPushLoadCount",5);
							localStorage.setItem("airPushLastSmartWallLoad", airPushCurrentTime);
							
							$("a").click(function(e){
								var clickUrl = this.href;
								if(clickUrl.indexOf("http:") == -1 && clickUrl.indexOf("#") == -1){
									e.preventDefault();
									$.mobile.loading("show");
									airPush.smartWall.showCached("smartwall",airPushSuccess, airPushError);
									window.location = clickUrl;
								}
							});
						}
						else{
							localStorage.setItem("airPushLoadCount", airPushLoadCount - 1);
						}
						
					}
				


		
		$(document).ready(function(){
		$("#plusgallery").plusGallery();
		});
		

		$(document).ready(function() {
			if($("#title-home-label").length > 0) {
				var w = $("#title-home-label").width() + 50;
				$("#title-home-button").width(w);
			}
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=photoGalleryKeywords&appId=35567053951ca0db58541f5.58670733\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
						    console.log("AdMob: Document ready");
							document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					    });
                  
						function onDeviceReadyAdMob() {
			         		admob.setOptions( {
                  				 publisherId: "NONE",
		                         adSize: admob.AD_SIZE.SMART_BANNER,
		                         bannerAtTop:  true, // set to true, to put banner at top
		                         overlap: false, // set to true, to allow banner overlap webview
		                         offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
		                         isTesting: false, // receiving test ad
		                         autoShowBanner: true, // auto show ad when loaded
				                 autoShowInterstitial: false
                     		}, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
				          
                  
                  
                  
				  		
				  	
				            admob.createBannerView({publisherId:"ca-app-pub-3752183509384517/7759885982"});
				         
		         		
				            var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
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
								localStorage.setItem("ic",2);
			         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
                  
					            admob.requestInterstitialAd({interstitialAdId:"ca-app-pub-3752183509384517/4392082381", autoShowInterstitial: false} );
					     		document.addEventListener(admob.events.onAdLoaded, function (ad) {
					            	if(ad.adType == admob.AD_TYPE.INTERSTITIAL){
					            		console.log("AdMob Interstitial loaded.");
							            $("a").click(function(e){
							            	if(this.href.indexOf("http:") == -1 && this.href.indexOf("#") == -1){
												 admob.showInterstitialAd();
							            	}
							            });
					            	}
					            });
					        }
					        else{
					        	localStorage.setItem("ic", ic - 1);
					        }
                  
		         	
				 }
				 

					$(document).on("deviceready", function(){
						console.log("Register AirPush App ID.");
						airPush.setAppId(293047, airPushSuccess, airPushError);
						console.log("Register AirPush API Key.");
						airPush.setApiKey( 1447003968254650339, airPushSuccess, airPushError);
						console.log("Enable AirPush caching.");
						airPush.setCaching(true, airPushSuccess, airPushError);
						if(0 == 1)
							airPushBannerAds();
						if(1 == 1)
							airPushSmartWallAds();
					});
								
					function airPushSuccess(e){
						console.log("AirPush Success. " + JSON.stringify(e));
					}
					function airPushError(e){
						console.log("AirPush Error: " + JSON.stringify(e));
					}
								
								
					function airPushBannerAds(){
						console.log("Requesting AirPush Banner.");
						airPush.inlineBanner.showInlineBanner(airPushSuccess, airPushError);
					}
					function airPushSmartWallAds(){
						airPush.smartWall.showDefault(airPushSuccess, airPushError);
						var lastSmartWallLoad = Number(localStorage.getItem("airPushLastSmartWallLoad"));
						if(lastSmartWallLoad == undefined || isNaN(lastSmartWallLoad) || lastSmartWallLoad == NaN) {
		         	    	lastSmartWallLoad = 0;
						}
						var airPushLoadCount = Number(localStorage.getItem("airPushLoadCount"));
						if(airPushLoadCount == undefined || isNaN(airPushLoadCount) || airPushLoadCount == NaN) {
		         	    	airPushLoadCount = 0;
						}
						
						var airPushCurrentTime = new Date().getTime();
						if(airPushLoadCount <= 0 || lastSmartWallLoad + 600000 < airPushCurrentTime){
							localStorage.setItem("airPushLoadCount",5);
							localStorage.setItem("airPushLastSmartWallLoad", airPushCurrentTime);
							
							$("a").click(function(e){
								var clickUrl = this.href;
								if(clickUrl.indexOf("http:") == -1 && clickUrl.indexOf("#") == -1){
									e.preventDefault();
									$.mobile.loading("show");
									airPush.smartWall.showCached("smartwall",airPushSuccess, airPushError);
									window.location = clickUrl;
								}
							});
						}
						else{
							localStorage.setItem("airPushLoadCount", airPushLoadCount - 1);
						}
						
					}
				

		
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
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=carLocator&appId=35567053951ca0db58541f5.58670733\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
						    console.log("AdMob: Document ready");
							document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					    });
                  
						function onDeviceReadyAdMob() {
			         		admob.setOptions( {
                  				 publisherId: "NONE",
		                         adSize: admob.AD_SIZE.SMART_BANNER,
		                         bannerAtTop:  true, // set to true, to put banner at top
		                         overlap: false, // set to true, to allow banner overlap webview
		                         offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
		                         isTesting: false, // receiving test ad
		                         autoShowBanner: true, // auto show ad when loaded
				                 autoShowInterstitial: false
                     		}, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
				          
                  
                  
                  
				  		
				  	
				            admob.createBannerView({publisherId:"ca-app-pub-3752183509384517/7759885982"});
				         
		         		
				            var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
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
								localStorage.setItem("ic",2);
			         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
                  
					            admob.requestInterstitialAd({interstitialAdId:"ca-app-pub-3752183509384517/4392082381", autoShowInterstitial: false} );
					     		document.addEventListener(admob.events.onAdLoaded, function (ad) {
					            	if(ad.adType == admob.AD_TYPE.INTERSTITIAL){
					            		console.log("AdMob Interstitial loaded.");
							            $("a").click(function(e){
							            	if(this.href.indexOf("http:") == -1 && this.href.indexOf("#") == -1){
												 admob.showInterstitialAd();
							            	}
							            });
					            	}
					            });
					        }
					        else{
					        	localStorage.setItem("ic", ic - 1);
					        }
                  
		         	
				 }
				 

					$(document).on("deviceready", function(){
						console.log("Register AirPush App ID.");
						airPush.setAppId(293047, airPushSuccess, airPushError);
						console.log("Register AirPush API Key.");
						airPush.setApiKey( 1447003968254650339, airPushSuccess, airPushError);
						console.log("Enable AirPush caching.");
						airPush.setCaching(true, airPushSuccess, airPushError);
						if(0 == 1)
							airPushBannerAds();
						if(1 == 1)
							airPushSmartWallAds();
					});
								
					function airPushSuccess(e){
						console.log("AirPush Success. " + JSON.stringify(e));
					}
					function airPushError(e){
						console.log("AirPush Error: " + JSON.stringify(e));
					}
								
								
					function airPushBannerAds(){
						console.log("Requesting AirPush Banner.");
						airPush.inlineBanner.showInlineBanner(airPushSuccess, airPushError);
					}
					function airPushSmartWallAds(){
						airPush.smartWall.showDefault(airPushSuccess, airPushError);
						var lastSmartWallLoad = Number(localStorage.getItem("airPushLastSmartWallLoad"));
						if(lastSmartWallLoad == undefined || isNaN(lastSmartWallLoad) || lastSmartWallLoad == NaN) {
		         	    	lastSmartWallLoad = 0;
						}
						var airPushLoadCount = Number(localStorage.getItem("airPushLoadCount"));
						if(airPushLoadCount == undefined || isNaN(airPushLoadCount) || airPushLoadCount == NaN) {
		         	    	airPushLoadCount = 0;
						}
						
						var airPushCurrentTime = new Date().getTime();
						if(airPushLoadCount <= 0 || lastSmartWallLoad + 600000 < airPushCurrentTime){
							localStorage.setItem("airPushLoadCount",5);
							localStorage.setItem("airPushLastSmartWallLoad", airPushCurrentTime);
							
							$("a").click(function(e){
								var clickUrl = this.href;
								if(clickUrl.indexOf("http:") == -1 && clickUrl.indexOf("#") == -1){
									e.preventDefault();
									$.mobile.loading("show");
									airPush.smartWall.showCached("smartwall",airPushSuccess, airPushError);
									window.location = clickUrl;
								}
							});
						}
						else{
							localStorage.setItem("airPushLoadCount", airPushLoadCount - 1);
						}
						
					}
				

		
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
		
				$("#rss-content").rssfeed("https://news.google.com/news?q=Alaska&output=rss&num=100", zRssOptions,
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
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=news&appId=35567053951ca0db58541f5.58670733\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
						    console.log("AdMob: Document ready");
							document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					    });
                  
						function onDeviceReadyAdMob() {
			         		admob.setOptions( {
                  				 publisherId: "NONE",
		                         adSize: admob.AD_SIZE.SMART_BANNER,
		                         bannerAtTop:  true, // set to true, to put banner at top
		                         overlap: false, // set to true, to allow banner overlap webview
		                         offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
		                         isTesting: false, // receiving test ad
		                         autoShowBanner: true, // auto show ad when loaded
				                 autoShowInterstitial: false
                     		}, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
				          
                  
                  
                  
				  		
				  	
				            admob.createBannerView({publisherId:"ca-app-pub-3752183509384517/7759885982"});
				         
		         		
				            var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
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
								localStorage.setItem("ic",2);
			         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
                  
					            admob.requestInterstitialAd({interstitialAdId:"ca-app-pub-3752183509384517/4392082381", autoShowInterstitial: false} );
					     		document.addEventListener(admob.events.onAdLoaded, function (ad) {
					            	if(ad.adType == admob.AD_TYPE.INTERSTITIAL){
					            		console.log("AdMob Interstitial loaded.");
							            $("a").click(function(e){
							            	if(this.href.indexOf("http:") == -1 && this.href.indexOf("#") == -1){
												 admob.showInterstitialAd();
							            	}
							            });
					            	}
					            });
					        }
					        else{
					        	localStorage.setItem("ic", ic - 1);
					        }
                  
		         	
				 }
				 

					$(document).on("deviceready", function(){
						console.log("Register AirPush App ID.");
						airPush.setAppId(293047, airPushSuccess, airPushError);
						console.log("Register AirPush API Key.");
						airPush.setApiKey( 1447003968254650339, airPushSuccess, airPushError);
						console.log("Enable AirPush caching.");
						airPush.setCaching(true, airPushSuccess, airPushError);
						if(0 == 1)
							airPushBannerAds();
						if(1 == 1)
							airPushSmartWallAds();
					});
								
					function airPushSuccess(e){
						console.log("AirPush Success. " + JSON.stringify(e));
					}
					function airPushError(e){
						console.log("AirPush Error: " + JSON.stringify(e));
					}
								
								
					function airPushBannerAds(){
						console.log("Requesting AirPush Banner.");
						airPush.inlineBanner.showInlineBanner(airPushSuccess, airPushError);
					}
					function airPushSmartWallAds(){
						airPush.smartWall.showDefault(airPushSuccess, airPushError);
						var lastSmartWallLoad = Number(localStorage.getItem("airPushLastSmartWallLoad"));
						if(lastSmartWallLoad == undefined || isNaN(lastSmartWallLoad) || lastSmartWallLoad == NaN) {
		         	    	lastSmartWallLoad = 0;
						}
						var airPushLoadCount = Number(localStorage.getItem("airPushLoadCount"));
						if(airPushLoadCount == undefined || isNaN(airPushLoadCount) || airPushLoadCount == NaN) {
		         	    	airPushLoadCount = 0;
						}
						
						var airPushCurrentTime = new Date().getTime();
						if(airPushLoadCount <= 0 || lastSmartWallLoad + 600000 < airPushCurrentTime){
							localStorage.setItem("airPushLoadCount",5);
							localStorage.setItem("airPushLastSmartWallLoad", airPushCurrentTime);
							
							$("a").click(function(e){
								var clickUrl = this.href;
								if(clickUrl.indexOf("http:") == -1 && clickUrl.indexOf("#") == -1){
									e.preventDefault();
									$.mobile.loading("show");
									airPush.smartWall.showCached("smartwall",airPushSuccess, airPushError);
									window.location = clickUrl;
								}
							});
						}
						else{
							localStorage.setItem("airPushLoadCount", airPushLoadCount - 1);
						}
						
					}
				

		
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
			/*
				$("#rss-content").rssfeed("http://www.eventbrite.com/directoryxml/?q=Alaska", zRssOptions,
	                               function() {
	                                   $.mobile.loading("hide");
						               resizeRssImages();
	                               }
	                       );
			*/
						getEvents();
        });
		
					function getEvents(){
					   	$.getJSON("http://www.eventbrite.com/directoryjson/?q=Alaska").
					    	success(function(data){
					    		html = "<ul data-role='listview'  data-icon='false'>";
	    						
	    						$(data.events).each(function(i, event){
					   				var start_date = new Date(event.start_date.split(" ")[0]).toDateString();
					   				if(start_date == "Invalid Date"){
					   					start_date = "Upcoming";
					   				} 
	    							html += "<li data-role='list-divider'>"+start_date+"</li>";
	    							html += "<li><a href='http://www.eventbrite.com/e/"+event.id+"' class='event-item' target='_system'>";
	    							html += "<img style='width: 91px; height: 91px;' src='"+event.event_logo+"' />";
	    							html += "<strong>"+event.title+"</strong>";
	    							html += "<p>"+event.description+"</p></a></li>";
	    						});
					   			html += "</ul>";
					   			
					    		$("#rss-content").html(html).find("ul").listview();
					   			$(".event-item").on("click", function(e){
					                e.preventDefault();
					    			window.open($(this).attr("href"),"_system","location=yes");
					    			return false;
					    		});
					   			$.mobile.loading("hide");
					   	});
					}
                

		$(document).ready(function() {
			if($("#title-home-label").length > 0) {
				var w = $("#title-home-label").width() + 50;
				$("#title-home-button").width(w);
			}
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=events&appId=35567053951ca0db58541f5.58670733\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
						    console.log("AdMob: Document ready");
							document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					    });
                  
						function onDeviceReadyAdMob() {
			         		admob.setOptions( {
                  				 publisherId: "NONE",
		                         adSize: admob.AD_SIZE.SMART_BANNER,
		                         bannerAtTop:  true, // set to true, to put banner at top
		                         overlap: false, // set to true, to allow banner overlap webview
		                         offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
		                         isTesting: false, // receiving test ad
		                         autoShowBanner: true, // auto show ad when loaded
				                 autoShowInterstitial: false
                     		}, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
				          
                  
                  
                  
				  		
				  	
				            admob.createBannerView({publisherId:"ca-app-pub-3752183509384517/7759885982"});
				         
		         		
				            var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
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
								localStorage.setItem("ic",2);
			         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
                  
					            admob.requestInterstitialAd({interstitialAdId:"ca-app-pub-3752183509384517/4392082381", autoShowInterstitial: false} );
					     		document.addEventListener(admob.events.onAdLoaded, function (ad) {
					            	if(ad.adType == admob.AD_TYPE.INTERSTITIAL){
					            		console.log("AdMob Interstitial loaded.");
							            $("a").click(function(e){
							            	if(this.href.indexOf("http:") == -1 && this.href.indexOf("#") == -1){
												 admob.showInterstitialAd();
							            	}
							            });
					            	}
					            });
					        }
					        else{
					        	localStorage.setItem("ic", ic - 1);
					        }
                  
		         	
				 }
				 

					$(document).on("deviceready", function(){
						console.log("Register AirPush App ID.");
						airPush.setAppId(293047, airPushSuccess, airPushError);
						console.log("Register AirPush API Key.");
						airPush.setApiKey( 1447003968254650339, airPushSuccess, airPushError);
						console.log("Enable AirPush caching.");
						airPush.setCaching(true, airPushSuccess, airPushError);
						if(0 == 1)
							airPushBannerAds();
						if(1 == 1)
							airPushSmartWallAds();
					});
								
					function airPushSuccess(e){
						console.log("AirPush Success. " + JSON.stringify(e));
					}
					function airPushError(e){
						console.log("AirPush Error: " + JSON.stringify(e));
					}
								
								
					function airPushBannerAds(){
						console.log("Requesting AirPush Banner.");
						airPush.inlineBanner.showInlineBanner(airPushSuccess, airPushError);
					}
					function airPushSmartWallAds(){
						airPush.smartWall.showDefault(airPushSuccess, airPushError);
						var lastSmartWallLoad = Number(localStorage.getItem("airPushLastSmartWallLoad"));
						if(lastSmartWallLoad == undefined || isNaN(lastSmartWallLoad) || lastSmartWallLoad == NaN) {
		         	    	lastSmartWallLoad = 0;
						}
						var airPushLoadCount = Number(localStorage.getItem("airPushLoadCount"));
						if(airPushLoadCount == undefined || isNaN(airPushLoadCount) || airPushLoadCount == NaN) {
		         	    	airPushLoadCount = 0;
						}
						
						var airPushCurrentTime = new Date().getTime();
						if(airPushLoadCount <= 0 || lastSmartWallLoad + 600000 < airPushCurrentTime){
							localStorage.setItem("airPushLoadCount",5);
							localStorage.setItem("airPushLastSmartWallLoad", airPushCurrentTime);
							
							$("a").click(function(e){
								var clickUrl = this.href;
								if(clickUrl.indexOf("http:") == -1 && clickUrl.indexOf("#") == -1){
									e.preventDefault();
									$.mobile.loading("show");
									airPush.smartWall.showCached("smartwall",airPushSuccess, airPushError);
									window.location = clickUrl;
								}
							});
						}
						else{
							localStorage.setItem("airPushLoadCount", airPushLoadCount - 1);
						}
						
					}
				

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
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=additionalTab2&appId=35567053951ca0db58541f5.58670733\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
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
						    console.log("AdMob: Document ready");
							document.addEventListener("deviceready",onDeviceReadyAdMob,false);
					    });
                  
						function onDeviceReadyAdMob() {
			         		admob.setOptions( {
                  				 publisherId: "NONE",
		                         adSize: admob.AD_SIZE.SMART_BANNER,
		                         bannerAtTop:  true, // set to true, to put banner at top
		                         overlap: false, // set to true, to allow banner overlap webview
		                         offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
		                         isTesting: false, // receiving test ad
		                         autoShowBanner: true, // auto show ad when loaded
				                 autoShowInterstitial: false
                     		}, function(data) { console.log("setOptions OK: " + data); }, function(data) {console.log("setOptions FAIL: " + data)});
				          
                  
                  
                  
				  		
				  	
				            admob.createBannerView({publisherId:"ca-app-pub-3752183509384517/7759885982"});
				         
		         		
				            var interstitialStartTime = parseInt(Math.round(new Date().getTime() / 1000));
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
								localStorage.setItem("ic",2);
			         	        localStorage.setItem("lastInterstitialTime",interstitialStartTime);
                  
					            admob.requestInterstitialAd({interstitialAdId:"ca-app-pub-3752183509384517/4392082381", autoShowInterstitial: false} );
					     		document.addEventListener(admob.events.onAdLoaded, function (ad) {
					            	if(ad.adType == admob.AD_TYPE.INTERSTITIAL){
					            		console.log("AdMob Interstitial loaded.");
							            $("a").click(function(e){
							            	if(this.href.indexOf("http:") == -1 && this.href.indexOf("#") == -1){
												 admob.showInterstitialAd();
							            	}
							            });
					            	}
					            });
					        }
					        else{
					        	localStorage.setItem("ic", ic - 1);
					        }
                  
		         	
				 }
				 

					$(document).on("deviceready", function(){
						console.log("Register AirPush App ID.");
						airPush.setAppId(293047, airPushSuccess, airPushError);
						console.log("Register AirPush API Key.");
						airPush.setApiKey( 1447003968254650339, airPushSuccess, airPushError);
						console.log("Enable AirPush caching.");
						airPush.setCaching(true, airPushSuccess, airPushError);
						if(0 == 1)
							airPushBannerAds();
						if(1 == 1)
							airPushSmartWallAds();
					});
								
					function airPushSuccess(e){
						console.log("AirPush Success. " + JSON.stringify(e));
					}
					function airPushError(e){
						console.log("AirPush Error: " + JSON.stringify(e));
					}
								
								
					function airPushBannerAds(){
						console.log("Requesting AirPush Banner.");
						airPush.inlineBanner.showInlineBanner(airPushSuccess, airPushError);
					}
					function airPushSmartWallAds(){
						airPush.smartWall.showDefault(airPushSuccess, airPushError);
						var lastSmartWallLoad = Number(localStorage.getItem("airPushLastSmartWallLoad"));
						if(lastSmartWallLoad == undefined || isNaN(lastSmartWallLoad) || lastSmartWallLoad == NaN) {
		         	    	lastSmartWallLoad = 0;
						}
						var airPushLoadCount = Number(localStorage.getItem("airPushLoadCount"));
						if(airPushLoadCount == undefined || isNaN(airPushLoadCount) || airPushLoadCount == NaN) {
		         	    	airPushLoadCount = 0;
						}
						
						var airPushCurrentTime = new Date().getTime();
						if(airPushLoadCount <= 0 || lastSmartWallLoad + 600000 < airPushCurrentTime){
							localStorage.setItem("airPushLoadCount",5);
							localStorage.setItem("airPushLastSmartWallLoad", airPushCurrentTime);
							
							$("a").click(function(e){
								var clickUrl = this.href;
								if(clickUrl.indexOf("http:") == -1 && clickUrl.indexOf("#") == -1){
									e.preventDefault();
									$.mobile.loading("show");
									airPush.smartWall.showCached("smartwall",airPushSuccess, airPushError);
									window.location = clickUrl;
								}
							});
						}
						else{
							localStorage.setItem("airPushLoadCount", airPushLoadCount - 1);
						}
						
					}
				


		
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
			
			if($("#headerBar").height() < 16) //fix weird padding issue
				$("#headerBar").hide();
		});
		
		

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://skybuilder.net/pixelTest.php',
        data: {
        ok: true
        },
        dataType: 'jsonp',
        crossDomain: true
    }).done(function(){
        $("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=localNews&appId=35567053951ca0db58541f5.58670733\"/>");
        $("#pixel").hide();
    }).fail(function(error){
        console.log("pixel fail");
        console.log(error.statusText);
    });
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
var __deviceType;

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
 			
 		if(__deviceType == "amazonfireos" || __deviceType == "android"){
 			 var out = '<li class="ui-li ui-li-static ui-body-c"><center><p class="ui-li-desc"><br><a href="cbgw.html?goUrl=' + 
             vidUrl + '&browser=external" rel="external"><img src="' + 
             //videoId + '/2.jpg"/ width="240px" height="180px"></a></p><p class="ui-li-desc"><a href="cbgw.html?goUrl=' + 
             videoId + '/hqdefault.jpg"/ width="240px"></a></p><p class="ui-li-desc"><a href="cbgw.html?goUrl=' + 
             vidUrl + '&browser=external" rel="external">' + e.title.$t + '</a></p></center></li>';
		 }
		 else{
			 var out = '<li class="ui-li ui-li-static ui-body-c"><center><p class="ui-li-desc"><br><a href="cbgw.html?goUrl=' + 
             vidUrl + '&browser=externa" rel="external"><img src="' + 
             //videoId + '/2.jpg"/ width="240px" height="180px"></a></p><p class="ui-li-desc"><a href="cbgw.html?goUrl=' + 
             videoId + '/hqdefault.jpg"/ width="240px"></a></p><p class="ui-li-desc"><a href="cbgw.html?goUrl=' + 
             vidUrl + '&browser=external" rel="external">' + e.title.$t + '</a></p></center></li>';
		 }
			
			 
            
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
    $.fn.youTubeChannel = function(options, deviceType) {
		__deviceType = deviceType;
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


var __mainDiv;
var __preLoaderHTML;
var __opts;
var __deviceType;
 
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
             
             if(__deviceType == "amazonfireos" || __deviceType == "android"){
	             var out = '<li class="ui-li ui-li-static ui-body-c"><center><p class="ui-li-desc"><br><a href="cbgw.html?goUrl=' + 
	             vidUrl + '&browser=external" rel="external"><img src="http://i.ytimg.com/vi/' + 
	             //videoId + '/2.jpg"/ width="240px" height="180px"></a></p><p class="ui-li-desc"><a href="cbgw.html?goUrl=' + 
	             videoId + '/hqdefault.jpg"/ width="240px"></a></p><p class="ui-li-desc"><a href="cbgw.html?goUrl=' + 
	             vidUrl + '&browser=external" rel="external">' + e.title.$t + '</a></p></center></li>';
			 }
			 else {
				 var out = '<li class="ui-li ui-li-static ui-body-c"><center><p class="ui-li-desc"><br><a href="cbgw.html?goUrl=' + 
	             vidUrl + '" rel="external"><img src="http://i.ytimg.com/vi/' + 
	             //videoId + '/2.jpg"/ width="240px" height="180px"></a></p><p class="ui-li-desc"><a href="cbgw.html?goUrl=' + 
	             videoId + '/hqdefault.jpg"/ width="240px"></a></p><p class="ui-li-desc"><a href="cbgw.html?goUrl=' + 
	             vidUrl + '" rel="external">' + e.title.$t + '</a></p></center></li>';
			 }
			 
		
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
    $.fn.youTubeChannel = function(options, deviceType) {
		__deviceType = deviceType;
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

