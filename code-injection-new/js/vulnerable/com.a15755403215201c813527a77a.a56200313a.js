






    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Urban Grind Coffee Company",
                        text: "https://play.google.com/store/apps/details?id=com.a15755403215201c813527a77a.a56200313a"},
                        function() {}, // Success function
                        function() {alert("Error sharing - please try again")} // Failure function
                    );
    			    return false;
                });
            });
    	


	                        
         $(document).ready(function() {
 
            
     //    alert("1");
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             //onDeviceReadyChildBrowser();
         });
                

    
         function onDeviceReadyChildBrowser() {
       //  alert("2");
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
            // alert("3");
                 var goUrl = $(this).attr("data-gourl");
             //    alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initFancyPush,false);
                });
            

	                        
         $(document).ready(function() {
		// alert("1");
             document.addEventListener("deviceready",onDeviceReadyCheckNetwork,false);
         });
    
         function onDeviceReadyCheckNetwork() {
	//	alert("2");
        var networkState = navigator.network.connection.type;
if (networkState===Connection.UNKNOWN){
alert ("Warning: it appears that you are not connected to the Internet. The content/offers shown may be out of date.");
    }
	else if (networkState===Connection.NONE){
alert ("Warning: it appears that you are not connected to the Internet. The content/offers shown may be out of date.");
    }

         }
     

             
                function resizeRssImages() {
                    var screenWidth = window.innerWidth;
                    $("img.rss-image").each(function (i,e) {
                        var imgWidth = $(this).width();
                console.log("RSS_WIDTH_SCREEN: " + screenWidth);
                console.log("RSS_WIDTH_IMAGE: " + imgWidth);
                        if(imgWidth > screenWidth) {
                            $(this).css("width","95%");
                        }
                    });
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
                
             



	            
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyVideoPlayer,false);
         });
    
         function onDeviceReadyVideoPlayer() {
                        
            $("a.open-plugin-videoplayer").click(function() {
                 var vidGoUrl = $(this).attr("data-vidurl");
	             window.plugins.videoPlayer.play(vidGoUrl);
                 return false;
             });
         }
     
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=youtube&appId=15755403215201c813527a77.56200313\"/>");}).fail(function( jqxhr, textStatus, error ) {});
    
        $(document).ready(function() {
                          $('#youtubevideos').youTubeChannel({ 
                                                             userName: '', 
                                                             channel: "uploads", 
                                                             hideAuthor: true,
                                                             numberToDisplay: 30,
                                                             linksInNewWindow: true
                                                             //other options
                                                             //loadingText: "Loading...",                    
                                                             },"android");
                          });            
        







    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Urban Grind Coffee Company",
                        text: "https://play.google.com/store/apps/details?id=com.a15755403215201c813527a77a.a56200313a"},
                        function() {}, // Success function
                        function() {alert("Error sharing - please try again")} // Failure function
                    );
    			    return false;
                });
            });
    	


	                        
         $(document).ready(function() {
 
            
     //    alert("1");
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             //onDeviceReadyChildBrowser();
         });
                

    
         function onDeviceReadyChildBrowser() {
       //  alert("2");
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
            // alert("3");
                 var goUrl = $(this).attr("data-gourl");
             //    alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initFancyPush,false);
                });
            

             
                function resizeRssImages() {
                    var screenWidth = window.innerWidth;
                    $("img.rss-image").each(function (i,e) {
                        var imgWidth = $(this).width();
                console.log("RSS_WIDTH_SCREEN: " + screenWidth);
                console.log("RSS_WIDTH_IMAGE: " + imgWidth);
                        if(imgWidth > screenWidth) {
                            $(this).css("width","95%");
                        }
                    });
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
                
             
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=aboutUs&appId=15755403215201c813527a77.56200313\"/>");}).fail(function( jqxhr, textStatus, error ) {});

//
//  PushNotification.js
//
// Based on the Push Notifications Cordova Plugin by Olivier Louvignes on 06/05/12.
// Modified by Max Konev on 18/05/12.
//
// www.fancypush.com
//

(function(cordova) {

	//Notification History
        function PushHistory() {
	}

	PushHistory.prototype.getHistory = function(config, success, fail) {
		cordova.exec(success, fail, "PushHistory", "history",
				config ? [ config ] : []);
	};

        
	PushHistory.prototype.deleteNotification = function(config, success, fail) {
		cordova.exec(success, fail, "PushHistory", "delete",
				config ? [ config ] : []);
	};

	cordova.addConstructor(function() {
		if (!window.plugins)
			window.plugins = {};
		window.plugins.PushHistory = new PushHistory();
	});


})(window.cordova || window.Cordova || window.PhoneGap);


function ActivityIndicator()
{

};

ActivityIndicator.prototype.show = function(message)
{
    PhoneGap.exec('ActivityIndicatorCommand.show', message);

};

ActivityIndicator.prototype.updateMessage = function(message)
{
    PhoneGap.exec('ActivityIndicatorCommand.updateMessage', message);
    
};

ActivityIndicator.prototype.hide = function()
{
    PhoneGap.exec('ActivityIndicatorCommand.hide');


};

ActivityIndicator.install = function()
{
    if(!window.plugins)
    {
        window.plugins = {};	
    }

    window.plugins.activityIndicator = new ActivityIndicator();
    return window.plugins.activityIndicator;
};

PhoneGap.addConstructor(ActivityIndicator.install);






                
                var childBrowser;
                
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
                /* When this function is called, PhoneGap has been initialized and is ready to roll */
           /*     function onDeviceReady()
                {
                    var goUrl = getUrlVars()["goUrl"];
					goUrl=decodeURIComponent(goUrl);
                    redirectUrl="index.html";
                    
            try {
                        //both of these should work...
                        //window.plugins.childBrowser.showWebPage(url);
                        alert(goUrl);
                        window.plugins.childBrowser.showWebPage(goUrl);
                    }
                    catch (err)
                    {
                        alert(err);
                    }
					
                    window.location = redirectUrl
                
				}*/
                function onDeviceReady() {
                    
                    var root = this;
                    cb = window.plugins.childBrowser;
                    
                    var goUrl = getUrlVars()["goUrl"];
					goUrl=decodeURIComponent(goUrl);
                    redirectUrl="index.html";                    
                    if(cb != null) {
                        
                        cb.onLocationChange = function(loc){ root.locChanged(loc); };
                        cb.onClose = function(){root.onCloseBrowser(); };
                        cb.onOpenExternal = function(){root.onOpenExternal(); };
                        cb.showWebPage(goUrl);
                                    }
                }
                
                function onCloseBrowser() {
                    console.log("onCloseBrowser!");
                    window.location = redirectUrl
                }
                
                function locChanged(loc) {
                    console.log("locChanged!");
                }
                
                function onOpenExternal() {
                    alert("onOpenExternal!");
                }                
                










    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Urban Grind Coffee Company",
                        text: "https://play.google.com/store/apps/details?id=com.a15755403215201c813527a77a.a56200313a"},
                        function() {}, // Success function
                        function() {alert("Error sharing - please try again")} // Failure function
                    );
    			    return false;
                });
            });
    	


	                        
         $(document).ready(function() {
 
            
     //    alert("1");
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             //onDeviceReadyChildBrowser();
         });
                

    
         function onDeviceReadyChildBrowser() {
       //  alert("2");
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
            // alert("3");
                 var goUrl = $(this).attr("data-gourl");
             //    alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initFancyPush,false);
                });
            

             
                function resizeRssImages() {
                    var screenWidth = window.innerWidth;
                    $("img.rss-image").each(function (i,e) {
                        var imgWidth = $(this).width();
                console.log("RSS_WIDTH_SCREEN: " + screenWidth);
                console.log("RSS_WIDTH_IMAGE: " + imgWidth);
                        if(imgWidth > screenWidth) {
                            $(this).css("width","95%");
                        }
                    });
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
                
             



   	        var scanButton;
        	var resultSpan;

   	 function onLoad() {

   	    scanButton = document.getElementById("scan-button");
        resultSpan = document.getElementById("scan-result");
   	                document.addEventListener("deviceready", onDeviceReadyBarcodeScanner, false);
//         if( navigator.userAgent.match(/Android/i) ) {
//              onDeviceReadyBarcodeScanner();
//     } else if (typeof navigator.device == "undefined"){
//             document.addEventListener("deviceready", onDeviceReadyBarcodeScanner, false);
//     } else {
//              onDeviceReadyBarcodeScanner();
//     } 
    }

    // Cordova is loaded and it is now safe to make calls Cordova methods
    //
    function onDeviceReadyBarcodeScanner() {
        // Now safe to use the Cordova API
   	                console.log("BARCODE SCANNER ONDEVICEREADY");
    scanButton.addEventListener("click", clickScan, false);
    }



function clickScan() {
    window.plugins.barcodeScanner.scan(scannerSuccess, scannerFailure);
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
            window.plugins.childBrowser.openExternal(text);
            return text.replace(expUrl,'<a href="$1" class="open-external-browser" data-gourl="$1">$1</a>'); 
         
        }
    } else {
        return text;
    } 
}

    
    
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=barcodescanner&appId=15755403215201c813527a77.56200313\"/>");}).fail(function( jqxhr, textStatus, error ) {});







    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Urban Grind Coffee Company",
                        text: "https://play.google.com/store/apps/details?id=com.a15755403215201c813527a77a.a56200313a"},
                        function() {}, // Success function
                        function() {alert("Error sharing - please try again")} // Failure function
                    );
    			    return false;
                });
            });
    	


	                        
         $(document).ready(function() {
 
            
     //    alert("1");
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             //onDeviceReadyChildBrowser();
         });
                

    
         function onDeviceReadyChildBrowser() {
       //  alert("2");
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
            // alert("3");
                 var goUrl = $(this).attr("data-gourl");
             //    alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initFancyPush,false);
                });
            

             
                function resizeRssImages() {
                    var screenWidth = window.innerWidth;
                    $("img.rss-image").each(function (i,e) {
                        var imgWidth = $(this).width();
                console.log("RSS_WIDTH_SCREEN: " + screenWidth);
                console.log("RSS_WIDTH_IMAGE: " + imgWidth);
                        if(imgWidth > screenWidth) {
                            $(this).css("width","95%");
                        }
                    });
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
                
             



   	        var rewardObject = false;
   	        var dbRewardObject = false;
            var scanButton;
        	var claimButton;
   	        var scanWaitMessage;
   	        var db;
   	        var rewardContainer;
   	        var rewardProgress;
   	        var noTicks;
   	        var noTicksRequired;
   	        var noSecondsBetweenScans;
   	        var scanCode = "024335300-137584935716396031495201cb8d3b6a8912721412";
   	        var lastScan;
   	        var carrotLocalFile;
   	        var rewardLocalFile;
   	        var rewardExists = false;
   	                
   	                
   	        $(document).ready(function() {
   	            scanButton = document.getElementById("scan-button");
                claimButton = document.getElementById("claim-reward-ok-button");
   	            scanWaitMessage = document.getElementById("scan-wait");
   	            rewardContainer = document.getElementById("reward");
   	            rewardProgress = document.getElementById("reward-progress");
   	            
   	            $("#scan-wait").click(function(){return false;});
   	            $("#claim-reward-cancel-button").click(function(){$( "#claimDialog" ).dialog( "close" );return false;});
   	            
   	            document.addEventListener("deviceready", onDeviceReadyLoyaltyCard, false);
   	            $("claim-reward-button-wrapper").hide();
   	            $("#reward").show();
   	            $("#scan-button").hide();
   	            $("#scan-wait").hide();
   	            $("#scan-error").hide();
   	            $("#scan-error").html("");
   	            //rewardContainer.innerHTML = "<p>Getting reward info, please wait...</p>";
            });
   	                
   	        function onDeviceReadyLoyaltyCard() {
   	            db = getDb();
   	            db.transaction(initLoyaltyCardDb, errorCB, successCB);
                scanButton.addEventListener("click", clickScan, false);
   	            claimButton.addEventListener("click", claimReward, false);
   	            db = getDb();
   	            db.transaction(
   	                function(transaction) {
                        transaction.executeSql("SELECT * FROM REWARDPROGRESS WHERE isCurrent='1' LIMIT 1", 
   	                        [],
   	                        processGetRewardFromDbResult, errorCB);
                    }
   	            );
            }
   	        
   	                        
   	        function getDb() {
   	           var dbConn = window.openDatabase("loyaltycard.db", "1.0", "Loyalty Card", 2000000);
   	           return dbConn;
   	        }
   	                
   	        function initLoyaltyCardDb(tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS REWARDPROGRESS (hash,carrotUrl,carrotLocalFile,rewardUrl,rewardLocalFile,requiredScans,scanWait,noScans,lastScan,isCurrent)");
            }
   	                        
   	        function checkConnection() {
                // There is no consistency on the format of reachability
                var networkState = navigator.connection.type;

   	            if(networkState == Connection.NONE) {
   	                $("#noNetworkPopup").popup("open",{y:"50",transition:"slidedown"});
   	                setTimeout(function(){$("#noNetworkPopup").popup("close");},4000);
   	            }
            }


   	                        
   	        function processGetRewardFromDbResult(tx,results) {
   	            if(results.rows.length == 0) {
   	                dbRewardObject = false;
   	            } else {
   	                dbRewardObject = results.rows.item(0);
   	            }
   	            
   	                        
   	            getCurrentRewardFromWeb();
   	            
   	            return true;
   	        }
   	                
   	        function getCurrentRewardFromWeb() {
   	            //rewardContainer.innerHTML = "<p>Getting latest reward, please wait...</p>";
   	            $.mobile.loading( "show", {
                    text: "Getting reward info, please wait...",
                    textVisible: true
                });
   	            $("#reward").show();
                    
                checkConnection();
   	                    
   	            var url = "http://skybuilder.net/reward.php?a=15755403215201c813527a77.56200313";
   	            $.ajax({
                    url: url,
                    dataType: 'jsonp',
                    timeout : 9000,
                    success:  function(data) {
   	                    console.warn(JSON.stringify(data));
   	                    if(data != null) {
   	                            console.warn("HAS DATA"); 	                    
   	                        if(data.hasReward.length >= 1) {
   	                            console.warn("HAS hasReward"); 	    
   	                            if(parseInt(data.hasReward) == 1) {
   	                            console.warn("hasReward == 1"); 	  
   	                                rewardObject = data;
   	                                db = getDb();
   	                                db.transaction(
   	                                    function(transaction) {
                                            transaction.executeSql("SELECT * FROM REWARDPROGRESS WHERE hash='"+rewardObject.hash+"' LIMIT 1", 
   	                                            [],
   	                                            processCheckRewardExists, errorCB);
                                        }
   	                                );
   	                            } else {
   	                                compareResults();
   	                            }
   	                        } else {
   	                            compareResults();
   	                        }
   	                    } else {
   	                        compareResults();
   	                    }
                    },
   	                error: function (xhr, ajaxOptions, thrownError) {
   	                    if(thrownError == "timeout") {
   	                        $("#noNetworkPopup").popup("open",{y:"50",transition:"slidedown"});
   	                        setTimeout(function(){$("#noNetworkPopup").popup("close");},4000);
   	                    }
   	                    console.warn(thrownError);
                        //$("#reward").html("<p>Error getting reward. Please try again later.");
   	                    compareResults();
                    }
                 });
   	        }
   	                            
   	        function processCheckRewardExists(tx,results) {
   	            if(results.rows.length == 0) {
   	                dbRewardObject = false;
   	            } else {
   	                tx.executeSql("UPDATE REWARDPROGRESS SET isCurrent='0'");
   	                tx.executeSql("UPDATE REWARDPROGRESS SET isCurrent='1' WHERE  hash='"+rewardObject.hash+"'");
   	                dbRewardObject = results.rows.item(0);
   	            }
   	                            
   	            compareResults();
   	        }
   	                            
   	        function compareResults() {
   	             $.mobile.loading( "hide");
   	             if(dbRewardObject == false && rewardObject == false) {
   	                 $("#reward").html("<p>No rewards available. Please try again later.");
   	                 return false;
   	             }

   	            if(rewardObject != false) {
   	                 //process the reward
   	                 console.warn("has rewardObject");
   	                 if(dbRewardObject != false) {
   	                     //check DB reward obj
   	                     if(dbRewardObject.hash != rewardObject.hash) {
   	                         console.warn("new record replacing old");
   	                         //new reward. Insert to DB, download image(s), and make current
   	                         db = getDb();
   	                         db.transaction(insertNewReward, errorCB, insertSuccessCB);
   	                         var params = {url:rewardObject.rewardUrl,hash:rewardObject.hash,suffix:"reward"};
   	                         downloadNewReward(params);
   	                         if(rewardObject.carrotImageUrl.length > 0) {
   	                            var params = {url:rewardObject.carrotImageUrl,hash:rewardObject.hash,suffix:"carrot"};
   	                            downloadNewReward(params);
   	                         }
   	                     } else {
   	                         displayReward();
   	                     }
   	                 } else {
   	                     console.warn("new record in blank DB");
   	                     console.warn(JSON.stringify(rewardObject));
   	                     //new reward. Insert to DB, download image(s), and make current
   	                     db = getDb();
   	                     db.transaction(insertNewReward, errorCB, insertSuccessCB);
   	                     var params = {url:rewardObject.rewardUrl,hash:rewardObject.hash,suffix:"reward"};
   	                     downloadNewReward(params);
   	                     if(rewardObject.carrotImageUrl.length > 0) {
   	                        var params = {url:rewardObject.carrotImageUrl,hash:rewardObject.hash,suffix:"carrot"};
   	                        downloadNewReward(params);
   	                     }
   	                 }
   	             } else {
   	                 displayReward();
   	             }
   	             
   	        }
   	                            
   	        function refreshDbRewardObject(tx,results) {
   	            
   	           
   	            if(results.rows.length == 0) {
   	                dbRewardObject = false;
   	            } else {
   	                dbRewardObject = results.rows.item(0);
   	            }
   	                            
   	            displayReward();
   	            return true;
   	        }
   	                            
   	        function insertNewReward(tx) {
   	            tx.executeSql("UPDATE REWARDPROGRESS SET isCurrent='0'");
   	            var sql = "INSERT INTO REWARDPROGRESS(hash,carrotUrl,carrotLocalFile,rewardUrl,rewardLocalFile,requiredScans,scanWait,noScans,lastScan,isCurrent) VALUES('"+rewardObject.hash+"','"+rewardObject.carrotImageUrl+"','','"+rewardObject.rewardUrl+"','','"+rewardObject.noScans+"','"+rewardObject.waitSeconds+"','0','0','1')";
   	            tx.executeSql(sql);
   	        }
   	                            
   	        function displayReward() {
   	            if(dbRewardObject == false) {
   	                $("#reward").html("<p>Error. Please try again later.");
   	            } else {
   	                var carrotUrl;
   	                var rewardUrl;
   	                            
   	                if(dbRewardObject.carrotLocalFile.length > 0) {
   	                    carrotUrl = dbRewardObject.carrotLocalFile;
   	                } else {
   	                    carrotUrl = dbRewardObject.carrotUrl;
   	                }
   	                            
   	                if(dbRewardObject.rewardLocalFile.length > 0) {
   	                    rewardUrl = dbRewardObject.rewardLocalFile;
   	                } else {
   	                    rewardUrl = dbRewardObject.rewardUrl;
   	                }
   	                   	                            
   	                noTicks = parseInt(dbRewardObject.noScans);
   	                lastScan = parseInt(dbRewardObject.lastScan);
   	                noSecondsBetweenScans = parseInt(dbRewardObject.scanWait);
   	                noTicksRequired = parseInt(dbRewardObject.requiredScans);
   	                if(noTicks == noTicksRequired) {
   	                    $("#reward").html("<img src=\""+rewardUrl+"\" style=\"width:95%;display:block;margin-left:auto;margin-right:auto;\" />");
   	                    $("#claim-reward-button-wrapper").show();
   	                    $("#scan-button").hide();
   	                    $("#scan-wait").hide();
   	                } else {
   	                            
   	                    if(carrotUrl.length > 0) {
   	                        $("#reward").html("<img src=\""+carrotUrl+"\" style=\"width:95%;display:block;margin-left:auto;margin-right:auto;\" />");
   	                    } else {
   	                        $("#reward").html("<img src=\""+rewardUrl+"\" style=\"width:95%;display:block;margin-left:auto;margin-right:auto;\" />");
   	                    }
   	                    var nowTime = Math.round(new Date().getTime() / 1000);
   	                    var nextValidScanTime = parseInt(lastScan + noSecondsBetweenScans);
   	                            
   	                    if(nextValidScanTime <= nowTime) {
   	                        $("#scan-button").show();
   	                        $("#scan-wait").hide();
   	                    } else {
   	                        var secondsToNextScan = nextValidScanTime - nowTime;
                            $("#scan-wait-text").text("Please wait...");
   	                        expiryCountdown(secondsToNextScan);
   	                        $("#scan-button").hide();
   	                        $("#scan-wait").show();
   	                    }
   	                    $("#claim-reward-button-wrapper").hide();
   	                }
   	                           
   	                generateTicks();
   	            }
   	        }
   	                            
   	                            
   	               	                                      
   	        function generateTicks() {
   	            $("#reward-progress").html("");
   	            var noTicksInt = parseInt(dbRewardObject.noScans);
   	            noTicksRequired = parseInt(dbRewardObject.requiredScans);
   	            var noToGo = parseInt(noTicksRequired) - noTicksInt;
   	            var blank = '<div style="float:left;"><img src="check_box_black.png" style="width:50px;" /></div>';
   	            var ticked = '<div style="float:left;"><img src="check_box_checked_black.png" style="width:50px;" /></div>';
   	            if(noTicksInt > 0) {
   	                for(i=1;i<=noTicksInt;i++) {
   	                    $("#reward-progress").append(ticked);
   	                }
   	            }
   	            for(i=1;i<=noToGo;i++) {
   	                $("#reward-progress").append(blank);
   	            }
   	        }
   	                            
   	        function clickScan() {
   	            $("#scan-error").hide();
   	            $("#scan-error").html("");
   	            window.plugins.barcodeScanner.scan(scannerSuccess, scannerFailure);
   	        }
   	                            
   	        function claimReward() {
   	            db = getDb();
   	            db.transaction(updateDbWithClaim, errorCB);
   	        }
   	                            
   	        function updateDbWithClaim(tx) {
   	            $( "#claimDialog" ).dialog( "close" );
   	            var nowTime = Math.round(new Date().getTime() / 1000);
   	            noSecondsBetweenScans = parseInt(dbRewardObject.scanWait);
   	            var secondsToNextScan = parseInt(noSecondsBetweenScans);
   	            tx.executeSql("UPDATE REWARDPROGRESS SET noScans='0', lastScan='"+nowTime+"' WHERE hash='"+dbRewardObject.hash+"'");
   	            noTicks = 0;
                $("#scan-wait-text").text("Please wait...");
   	            expiryCountdown(secondsToNextScan);
   	            $("#claim-reward-button-wrapper").hide();
   	            $("#scan-button").hide();
   	            $("#scan-wait").show();
   	           // generateTicks();
   	                            
   	            var url = "http://skybuilder.net/reward.php?a=15755403215201c813527a77.56200313&h="+dbRewardObject.hash+"&c=1";
   	            $.ajax({
                    url: url,
                    dataType: 'jsonp',
                    success:  function(data) { }
                });
   	                            
   	            db = getDb();
   	            db.transaction(
   	                function(transaction) {
                        transaction.executeSql("SELECT * FROM REWARDPROGRESS WHERE isCurrent='1' LIMIT 1", 
   	                        [],
   	                        processGetRewardFromDbResult, errorCB);
                    }
   	            );
   	        }
   	                
   	        function errorCB(transaction, error) {
                console.warn("LC DB ERROR: "+JSON.stringify(error));
   	            return false;
            }
   	                           
   	        function successCB(transaction, results) {
                console.log("LC DB SUCCESS: "+JSON.stringify(results));
   	            return true;
            }
   	                            
   	        function insertSuccessCB(transaction, results) {
                console.log("LC DB INSERT SUCCESS: "+JSON.stringify(results));
   	            db = getDb();
   	            db.transaction(
   	                function(transaction) {
                        transaction.executeSql("SELECT * FROM REWARDPROGRESS WHERE isCurrent='1' LIMIT 1", 
   	                        [],
   	                        refreshDbRewardObject, errorCB);
                    }
   	            );
   	            return true;
            }
   	                            
   	        function updateDbWithLocalRewardFile(tx) {
   	            tx.executeSql("UPDATE REWARDPROGRESS SET rewardLocalFile='"+rewardLocalFile+"' WHERE hash='"+rewardObject.hash+"'");
   	        }
   	                            
   	        function updateDbWithLocalCarrotFile(tx) {
   	            tx.executeSql("UPDATE REWARDPROGRESS SET carrotLocalFile='"+carrotLocalFile+"' WHERE hash='"+rewardObject.hash+"'");
   	        }
   	                   
   	        //------------------------------------------------------------

        	function onRequestFileSystemSuccess(fileSystem) { 
                var entry=fileSystem.root; 
                entry.getDirectory("15755403215201c813527a77.56200313", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail); 
            } 

            function onGetDirectorySuccess(dir) { 
                console.log("Created dir "+dir.name); 
            } 

            function onGetDirectoryFail(error) { 
                console.log("Error creating directory "+error.code); 
            } 
   	                    
   	        function downloadNewReward(params){
   	            console.log("Get " + params.suffix);
   	            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null); 

                window.requestFileSystem(
                    LocalFileSystem.PERSISTENT, 0, 
                    function onFileSystemSuccess(fileSystem) {
                        fileSystem.root.getFile("15755403215201c813527a77.56200313.html",
                            {create: true, exclusive: false}, 
                            function gotFileEntry(fileEntry) {
                                var sPath = fileEntry.fullPath.replace("15755403215201c813527a77.56200313.html","15755403215201c813527a77.56200313/");
   	                            console.warn("DUMMY PATH: "+sPath);
                                var fileTransfer = new FileTransfer();
                                fileEntry.remove();
                                console.warn("params.url: "+params.url);
                                fileTransfer.download(params.url,
                                    sPath + params.hash + "-"+params.suffix+".png",
                                    function(theFile) {
                                        console.log("download complete: " + theFile.toURL());
                                        //showLink(theFile.toURI());
                                        if(params.suffix == "reward") {
   	                                        rewardLocalFile = theFile.toURL();
                                            db = getDb();
   	                                        db.transaction(updateDbWithLocalRewardFile, errorCB,successCB);
                                        }
                                                
                                        if(params.suffix == "carrot") {
   	                                        carrotLocalFile = theFile.toURL();
                                            db = getDb();
   	                                        db.transaction(updateDbWithLocalCarrotFile, errorCB,successCB);
                                        }
                                    },
                                    function(error) {
                                        console.log("download error source " + error.source);
                                        console.log("download error target " + error.target);
                                        console.log("upload error code: " + error.code);
                                    }
                                );
                                            
                            }, 
                        dlFailed);
                    },
                    dlFailed);
                };
   	        
            function dlFailed() {}
   	                    
//----------------------------------------------------------------------------
   	                            
   	        function scannerSuccess(result) {
   	            if(result.cancelled == false) {
   	                if(result.text == scanCode) {
                        db = getDb();
   	                    db.transaction(updateDbWithProgress, errorCB);
   	                } else {
   	                    $("#scan-error").html("<p>Invalid QR Code - please check this is the correct QR Code and try again.</p>");
   	                    $("#scan-error").show();
   	                }
   	            }
   	        }
   	                            
   	        function scannerFailure(message) {
   	            $("#scan-error").html("<p>Sorry! There was an error scanning ("+message+"). Please try again");
   	            $("#scan-error").show();
   	        }
   	                            
   	        function updateDbWithProgress(tx) {
   	            noTicks++;
   	            var nowTime = Math.round(new Date().getTime() / 1000);
                noSecondsBetweenScans = parseInt(dbRewardObject.scanWait);
   	            var secondsToNextScan = parseInt(noSecondsBetweenScans);
   	            tx.executeSql("UPDATE REWARDPROGRESS SET noScans='"+noTicks+"', lastScan='"+nowTime+"' WHERE hash='"+dbRewardObject.hash+"'");
                                       
   	            db = getDb();
   	            db.transaction(
   	                function(transaction) {
                        transaction.executeSql("SELECT * FROM REWARDPROGRESS WHERE isCurrent='1' LIMIT 1", 
   	                        [],
   	                        refreshDbRewardObject, errorCB);
                    }
   	            );
   	        }
   	                            
   	        function expiryCountdown(start){
                var expireSeconds = parseInt(start);
                var end = 0 // change this to stop the counter at a higher value
                var refresh=1000; // Refresh rate in milli seconds
                if(expireSeconds >= end ){
                    mytime=setTimeout(function(){displayExpiryCountdown(expireSeconds)},refresh);
                } else {
   	                $("#scan-button").show();
   	                $("#scan-wait").hide();
   	            }
   	        }
   	                    
   	        function displayExpiryCountdown(expireSeconds) {
   	   	        expireSeconds = parseInt(expireSeconds);
       	        var days = Math.floor(expireSeconds / 86400); 
       	        var hours = Math.floor((expireSeconds - (days * 86400 ))/3600);
       	        var minutes = Math.floor((expireSeconds - (days * 86400 ) - (hours *3600 ))/60);
       	        var secs = Math.floor((expireSeconds - (days * 86400 ) - (hours *3600 ) - (minutes*60)));

   	   	        if(hours <=9) {
   	       	        hours = "0" + String(hours);
   	   	        } else {
   	       	        hours = String(hours);
   	   	        }
   	                    
   	   	        if(minutes <=9) {
   	       	        minutes = "0" + String(minutes);
   	   	        } else {
   	       	        minutes = String(minutes);
   	   	        }
   	                    
   	   	        if(secs <=9) {
   	       	        secs = "0" + String(secs);
   	   	        } else {
   	       	        secs = String(secs);
   	   	        }
   	                            
   	            var countHtml = "Next scan available in ";
   	            
   	            if(days > 0) {
   	                if(days == 1) {
   	                    countHtml += days + " Day, ";
   	                } else {
   	   	                countHtml += days + " Days, ";
   	                }
   	            }
   	            
   	            countHtml  += hours + ":" + minutes + ":" + secs;
   	                  	        
   	   	        $("#scan-wait-text").text(countHtml);
   
   	   	        expireSeconds = expireSeconds - 1;

       	        tt=expiryCountdown(expireSeconds);
   	        }

        
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=loyaltyCard&appId=15755403215201c813527a77.56200313\"/>");}).fail(function( jqxhr, textStatus, error ) {});







    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Urban Grind Coffee Company",
                        text: "https://play.google.com/store/apps/details?id=com.a15755403215201c813527a77a.a56200313a"},
                        function() {}, // Success function
                        function() {alert("Error sharing - please try again")} // Failure function
                    );
    			    return false;
                });
            });
    	


	                        
         $(document).ready(function() {
 
            
     //    alert("1");
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             //onDeviceReadyChildBrowser();
         });
                

    
         function onDeviceReadyChildBrowser() {
       //  alert("2");
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
            // alert("3");
                 var goUrl = $(this).attr("data-gourl");
             //    alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initFancyPush,false);
                });
            

             
                function resizeRssImages() {
                    var screenWidth = window.innerWidth;
                    $("img.rss-image").each(function (i,e) {
                        var imgWidth = $(this).width();
                console.log("RSS_WIDTH_SCREEN: " + screenWidth);
                console.log("RSS_WIDTH_IMAGE: " + imgWidth);
                        if(imgWidth > screenWidth) {
                            $(this).css("width","95%");
                        }
                    });
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
                
             


       	    var deviceLang = "en";
            $(document).ready(function() {
       	        $.support.cors = true;
       	        $.mobile.allowCrossDomainPages=true;
   	            document.addEventListener("deviceready", onDeviceReadyPushHistory, false);
            });
       	                
       	    function refreshHistory() {
       	        onDeviceReadyPushHistory();
       	    }
       	                
       	    function onDeviceReadyPushHistory() {
       	        $("#notification-history-container").html("<img src=\"loading.gif\">");
       	        var PushHistory = window.plugins.PushHistory;
       	        var language = navigator.language.split("-"); 
                deviceLang = (language[0]); 

                PushHistory.getHistory(null, function(status){
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
       	                           PushHistory.deleteNotification(delMid, function(status){refreshHistory()},function(status){});
   	                           }
                            }, "Delete","OK,Cancel")
                            return false;
                        });
       	                
       	                $(".open-external-browser-push").click(function() {
                            var url = $(this).attr("data-gourl");
       	                    window.plugins.childBrowser.openExternal(url);
       	                    return false;
                        });
       	                
       	                $(".rich-notification-link").click(function() {
       	                    var url = $(this).attr("data-gourl");
       	                    window.plugins.childBrowser.showWebPage(url, { showLocationBar: false });
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
        
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=pushHistory&appId=15755403215201c813527a77.56200313\"/>");}).fail(function( jqxhr, textStatus, error ) {});







    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Urban Grind Coffee Company",
                        text: "https://play.google.com/store/apps/details?id=com.a15755403215201c813527a77a.a56200313a"},
                        function() {}, // Success function
                        function() {alert("Error sharing - please try again")} // Failure function
                    );
    			    return false;
                });
            });
    	


	                        
         $(document).ready(function() {
 
            
     //    alert("1");
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             //onDeviceReadyChildBrowser();
         });
                

    
         function onDeviceReadyChildBrowser() {
       //  alert("2");
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
            // alert("3");
                 var goUrl = $(this).attr("data-gourl");
             //    alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initFancyPush,false);
                });
            

             
                function resizeRssImages() {
                    var screenWidth = window.innerWidth;
                    $("img.rss-image").each(function (i,e) {
                        var imgWidth = $(this).width();
                console.log("RSS_WIDTH_SCREEN: " + screenWidth);
                console.log("RSS_WIDTH_IMAGE: " + imgWidth);
                        if(imgWidth > screenWidth) {
                            $(this).css("width","95%");
                        }
                    });
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
                
             

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
            
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=index&appId=2422393551ac6150af6813.89403132\"/>");}).fail(function( jqxhr, textStatus, error ) {});

    	  $(document).ready(function(){
              // Bind the swipeleftHandler callback function to the swipe event on div.box
              $(".ui-page").on( "swipeleft", swipeHandler );
    		  $(".ui-page").on( "swiperight", swipeHandler );
 
              // Callback function references the event target and adds the swipeleft class to it
              function swipeHandler( event ){
    		      //console.log("Swipe");
                  //$("#footer-more-link").click();
    		      window.location.href = "more.html";
              }
          });
     



                
                var pictureSource;   // picture source
                var destinationType; // sets the format of returned value 
                
                
                function onBodyLoad()
                {
                    document.addEventListener("deviceready",onDeviceReady,false);
                }
                
                /* When this function is called, PhoneGap has been initialized and is ready to roll */
                function onDeviceReady()
                {
                    phoneGapReady.innerHTML = "PhoneGap is Ready";
                    
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
                    
                    alert('Connection type: ' + states[networkState]);
                }

                
                

/**
 * 
 * Phonegap share plugin for Android
 * Kevin Schaul 2011
 *
 */

var Share = function() {};
            
Share.prototype.show = function(content, success, fail) {
    return cordova.exec( function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'Share', '', [content]);
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.share) {
    window.plugins.share = new Share();
}





$(document).ready(function(){
	$("#submit").click(function(){	

	//specify where to post
	var postTo="http://skybuilder.net/cf/process.php?appId=16491868334f5efe416da432.66391647";
	
	//get the info to post
	var field0Val=$("#field0").val();var field1Val=$("#field1").val();var field2Val=$("#field2").val();var field3Val=$("#field3").val();

//post
$.post(postTo, { field0: field0Val,field1: field1Val,field2: field2Val,field3: field3Val } );

//change submit button to thank you
document.getElementById('sendEmail').innerHTML = "<p>Thank for your submission.</p>";

		return false;
	});						   
});
 







    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Urban Grind Coffee Company",
                        text: "https://play.google.com/store/apps/details?id=com.a15755403215201c813527a77a.a56200313a"},
                        function() {}, // Success function
                        function() {alert("Error sharing - please try again")} // Failure function
                    );
    			    return false;
                });
            });
    	


	                        
         $(document).ready(function() {
 
            
     //    alert("1");
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             //onDeviceReadyChildBrowser();
         });
                

    
         function onDeviceReadyChildBrowser() {
       //  alert("2");
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
            // alert("3");
                 var goUrl = $(this).attr("data-gourl");
             //    alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initFancyPush,false);
                });
            

             
                function resizeRssImages() {
                    var screenWidth = window.innerWidth;
                    $("img.rss-image").each(function (i,e) {
                        var imgWidth = $(this).width();
                console.log("RSS_WIDTH_SCREEN: " + screenWidth);
                console.log("RSS_WIDTH_IMAGE: " + imgWidth);
                        if(imgWidth > screenWidth) {
                            $(this).css("width","95%");
                        }
                    });
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
                
             







    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Urban Grind Coffee Company",
                        text: "https://play.google.com/store/apps/details?id=com.a15755403215201c813527a77a.a56200313a"},
                        function() {}, // Success function
                        function() {alert("Error sharing - please try again")} // Failure function
                    );
    			    return false;
                });
            });
    	


	                        
         $(document).ready(function() {
 
            
     //    alert("1");
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             //onDeviceReadyChildBrowser();
         });
                

    
         function onDeviceReadyChildBrowser() {
       //  alert("2");
            $("a.open-child-browser").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
            // alert("3");
                 var goUrl = $(this).attr("data-gourl");
             //    alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initFancyPush,false);
                });
            

             
                function resizeRssImages() {
                    var screenWidth = window.innerWidth;
                    $("img.rss-image").each(function (i,e) {
                        var imgWidth = $(this).width();
                console.log("RSS_WIDTH_SCREEN: " + screenWidth);
                console.log("RSS_WIDTH_IMAGE: " + imgWidth);
                        if(imgWidth > screenWidth) {
                            $(this).css("width","95%");
                        }
                    });
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
	gpsLoading.innerHTML = "<img src='loading.gif' style='position: relative; max-width: " + Math.round(windowWidth / 2) + "px; max-Height: " + Math.round(windowHeight / 2) + "px; width: 50%; vertical-align: middle;'><br />" + notifyGettingPos;
	document.getElementById("canvas").style.width = windowWidth;
	document.getElementById("canvas").style.height = Math.round(windowHeight * .66);
	document.getElementById("compass").width = windowWidth;
	document.getElementById("compass").height = Math.round(windowHeight * .66);
	//$("#canvas").style.height = Math.round(windowHeight * .66);
	
	
	
	if (localStorage.getItem("acc") != null){
		$("#divSearch").show();
	}
		
	if (localStorage.getItem("disclaimer") == null || localStorage.getItem("disclaimer") != 1){
		//alert(disclaimerMessage + ", Urban Grind Coffee Company");
				
		document.addEventListener("deviceready", function(){
			navigator.notification.alert(disclaimerMessage, false, "Urban Grind Coffee Company", "OK");
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
		navigator.notification.confirm(confirmOverwrite, onConfirmSave, "Urban Grind Coffee Company", "OK,Cancel");
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
		navigator.notification.alert(noGPSMessage, false, "Urban Grind Coffee Company", "OK");
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
		navigator.notification.alert(notifyPositionSaved, false, "Urban Grind Coffee Company", "OK");
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
					navigator.notification.alert(errorPoorAcc, false, "Urban Grind Coffee Company", "OK");
				}
				gettingInput = false;
			}, "Urban Grind Coffee Company", "OK,Cancel");
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
			navigator.notification.alert(errorPoorAcc, false, "Urban Grind Coffee Company", "OK");
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
		shadow.src = "shadow.png";
		arrow = new Image();
  		arrow.src = "arrow2.png";
 		arrow.onload = imgLoaded;
		
	}
  	else
  	{
  		navigator.notification.alert(errorUnsupportedFeature, false, "Urban Grind Coffee Company", "OK");
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





$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=carLocator&appId=15755403215201c813527a77.56200313\"/>");}).fail(function( jqxhr, textStatus, error ) {});
