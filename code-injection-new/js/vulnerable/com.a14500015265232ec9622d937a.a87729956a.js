






    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Scrips4Less",
                        text: "https://play.google.com/store/apps/details?id=com.a14500015265232ec9622d937a.a87729956a"},
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
                 console.log(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
         }
                        
     

	                        
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
     

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
	
            
    
        $(document).ready(function() {
                          $('#youtubevideos').youTubeChannel({ 
                                                             userName: 'UCC-MB68_bc_Mac30yKGcklQ', 
                                                             channel: "uploads", 
                                                             hideAuthor: true,
                                                             numberToDisplay: 30,
                                                             linksInNewWindow: true
                                                             //other options
                                                             //loadingText: "Loading...",                    
                                                             },"android");
                          });            
        

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
                        subject: "Share Scrips4Less",
                        text: "https://play.google.com/store/apps/details?id=com.a14500015265232ec9622d937a.a87729956a"},
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
                 console.log(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
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
                
             


          var pictureSource;   // picture source
            var destinationType; // sets the format of returned value
            var destinationTypeData;
            var albumButton;
            var libraryButton;
            var cameraButton;
            var resetButton;
		    var emailComposerObj;
                    
            function OnBodyLoadCamera() {
                //console.log("BODY LOADED");
                //alert("Body Load");
               document.addEventListener("deviceready",onDeviceReadyCamera,false);
                  $("#select-photo-wrapper").show();
            }

                    
            function onDeviceReadyCamera() {
		      
            //alert("Device Ready");
                console.log("DEVICE READY");
                pictureSource=navigator.camera.PictureSourceType;
                destinationType=navigator.camera.DestinationType;
                    
                albumButton = document.getElementById("select-photo-album-button");
                cameraButton = document.getElementById("take-photo-button");
                resetButton = document.getElementById("send-photo-reset");
                destinationTypeData = destinationType.FILE_URI;
                //destinationTypeData = destinationType.FILE_URI;
                                
                $("#send-photo-submit").click(function() {
                    console.log("SEND VIA WEBINTENT");
                    var extras = {};
                    extras[WebIntent.EXTRA_SUBJECT] = "Photo from Scrips4Less";
                    extras[WebIntent.EXTRA_TEXT] = $("textarea#emailPhotoMessage").val();
                    extras[WebIntent.EXTRA_STREAM] = $("#emailPhotoLocation").val();
                    extras[WebIntent.EXTRA_EMAIL] = "cashntoday@gmail.com";
                    window.plugins.webintent.startActivity({
                       action: WebIntent.ACTION_SEND,
                       type: 'image/jpeg',
                       extras: extras
                    },
                    function() {
                        //$("#photo-container").html("<p><strong>Photo sent! Thankyou!</stong></p>");
                        $("#photo-container").html("");
                        navigator.notification.alert("Thank you!", false, "Thank you", "Close");
                        $("textarea#emailPhotoMessage").val("");
                        $("#emailPhotoLocation").val("");
                        $("#send-photo-submit-container").hide();
                        $("#select-photo-wrapper").show();
                    },
                    function() {
                        $("#photo-container").html("<p><strong>Sorry - failed to send Photo. Please try again.</stong></p>");
                        //alert("Failed to send email via Android Intent");
                    }
                    );
                    return false;
                });
                $("#send-photo-submit-container").hide();
                
                albumButton.addEventListener("click", getFromAlbum, false);
                            
                cameraButton.addEventListener("click", takeFromCamera, false);
                resetButton.addEventListener("click", resetForm, false);
            }
                            
            function emailComposerCb() {
                $("#photo-container").html("");
                    $("textarea#emailPhotoMessage").val("");
                    $("#emailPhotoLocation").val("");
                    $("#send-photo-submit-container").hide();
                    $("#select-photo-wrapper").show();
                    navigator.notification.alert("Thank you!", false, "Thank you", "Close");
            }
                            
            function resetForm() {
                navigator.notification.confirm("Reset the Form?", function(button) {
   	                if(parseInt(button) == 1) {
                        $("textarea#emailPhotoMessage").val("");
                        $("#emailPhotoLocation").val("");
                        $("#send-photo-submit-container").hide();
                        $("#select-photo-wrapper").show();
   	                }
                }, "Reset the Form?","OK,Cancel")
            }
                            
            function getFromLibrary() {
               // alert("GET FROM LIBRARY");
                getPhoto(pictureSource.PHOTOLIBRARY);
                return false;
            }
                            
            function getFromAlbum() {
                //alert("GET FROM ALBUM");
                getPhoto(pictureSource.SAVEDPHOTOALBUM);
                return false;
            }
                            
            function takeFromCamera() {
                console.log("TAKE A PHOTO");
                capturePhoto();
                return false;
            }
                           
            function capturePhoto() {
                // Take picture using device camera and retrieve image as a URI
                navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 49, destinationType: destinationTypeData });
            }
                   
            function getPhoto(source) {
                // Retrieve image file location from specified source
                //console.log("GET PHOTO FROM " + source);
                navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 49, 
                destinationType: destinationTypeData,
                sourceType: source });
            }
                    
            function onPhotoURISuccess(imageData) {
                console.log("PHOTO URI: " + imageData);
                var imageURI;
                imageURI = imageData;
                $("#emailPhotoLocation").val(imageURI);
                $("#photo-container").html('<img src="'+imageURI+'" style="width:90%;display:block;margin-left:auto;margin-right:auto;" id="photo-to-send" />');
                    
                $("#send-photo-submit-container").show();
                $("#select-photo-wrapper").hide();
            }
                    
            function onFail(message) {
                $("#photo-container").html("<p><strong>Sorry - failed to get Photo ("+message+"). Please try again.</stong></p>");
                console.log("GET PHOTO Failed because: " + message);
                $("#select-photo-wrapper").show();
            }
        

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
	
            







    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Scrips4Less",
                        text: "https://play.google.com/store/apps/details?id=com.a14500015265232ec9622d937a.a87729956a"},
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
                 console.log(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
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
                
             



   	        var scanButton;
        	var resultSpan;

   	 $(document).ready(function() {
        alert("doc ready");
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

    
    

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
	
            

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








    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Scrips4Less",
                        text: "https://play.google.com/store/apps/details?id=com.a14500015265232ec9622d937a.a87729956a"},
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
                 console.log(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
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
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
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








    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Scrips4Less",
                        text: "https://play.google.com/store/apps/details?id=com.a14500015265232ec9622d937a.a87729956a"},
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
                 console.log(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
         }
                        
     

	                        
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
                          $("#submit").click(function() {
                              
                              var mailtoString = $("#mailto-string").val();
                              var formData = $("#contact-form").serializeArray();
                              var messageBody = ""; 
                              $.each(formData, function(index, value) { 
                                  messageBody += value.name + ": " + value.value + "\n";
                              });
                              var realMessageBody = escape(messageBody);
                              //mailtoString = mailtoString.replace("__MESSAGE_BODY__",realMessageBody);
                              //window.location = mailtoString;
                        
                              var extras = {};
                              extras[WebIntent.EXTRA_SUBJECT] = "App Contact Form";
                              extras[WebIntent.EXTRA_TEXT] = messageBody;
                              extras[WebIntent.EXTRA_EMAIL] = "cashntoday@gmail.com";
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
                              return true;
                          });
                      });
                  

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
	
            







    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Scrips4Less",
                        text: "https://play.google.com/store/apps/details?id=com.a14500015265232ec9622d937a.a87729956a"},
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
                 console.log(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
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
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
	
            







    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Scrips4Less",
                        text: "https://play.google.com/store/apps/details?id=com.a14500015265232ec9622d937a.a87729956a"},
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
                 console.log(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
         }
                        
     

	                        
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
                
             

              
function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}

        $(document).ready(function() {
            $.mobile.loading( "show", {
                text: "Loading, please wait...",
                textVisible: true
            });
        });
              
                
                function  rssReader() {
                   // alert("rssReader");
                    
                    //EDIT THESE LINES
                    //Title of the blog
                    //RSS url
                    var RSS = "http://feeds.feedburner.com/blogspot/ievy";

		///alert(RSS);
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
             //     alert("1");
                    //listen for detail links
                    $(".contentLink").click(function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
       //   alert("2");
                    //Listen for main page
                    $(document).on("pageinit", "#mainPage", function () {
                                        //alert("3");
                                        //Set the title
                                        
                          //     alert("4");
                                        $.get(RSS, {}, function(res, code) {
                                        //  alert("5");
                                    
                                              $.mobile.loading( "hide");
                                              var xml = $(res);
                                              var items = xml.find("item");
                                              $.each(items, function(i, v) {
                                                     entry = {
                                                     title:$(v).find("title").text().replace("//<![CDATA[", "").replace("//]]>", ""), 
                                                     link:$(v).find("link").text().replace("//<![CDATA[", "").replace("//]]>", ""), 
                                                     description:$.trim($(v).find("description").text().replace("//<![CDATA[", "").replace("//]]>", ""))
                                                     };
                                                     entries.push(entry);
                    		console.log($(v).find("link").text());
                    		console.log($(v).find("link").text().replace("//<![CDATA[", "").replace("//]]>", ""));
     });
  									  
											  
											  
											  
                                              //now draw the list
                                              var s = '';
                                              var cleanDesc;
                                              var itemLink;
											  var imageSource;
											  var pulledDescription;
											  var scraped;
                                              $.each(entries, function(i, v) {
											 pulledDescription=htmlspecialchars_decode(v.description);
                                                    cleanDesc=strip(v.description);
													scraped=pulledDescription.match(/img src=\"(.+?)\"/gi);
													imageSource="";
													if(scraped){
													imageSource='<' + scraped + ' class="rss-image" style="max-width:95%;margin:auto;" /><br><br>';
													}
                                                     itemLink=v.link;							   
							   s += '<li data-icon="false" class="news-item"><h3 style="white-space:normal">' + v.title + '</h3><p style="white-space:normal">' + imageSource + cleanDesc + '</p><p><a rel="external" href="'+ v.link + '" data-gourl="'+ v.link + '" class="open-external-browser">Read More</a></p></li>';});
							//	alert("6");
                                              $("#linksList").append(s);
                //console.log(s);
                                              $("#linksList").listview("refresh");
                                              $(".news-item").each(function(pff,pfft){
                                                  $(this).removeClass("ui-btn-up-c").addClass("ui-body-c");
                                              });
                                              
                                              });
                                        });
                    
                    //Listen for the content page to load
                    $(document).on("pageshow", "#contentPage", function (prepage) {
                                           //Set the title
                                           $("h1", this).text(entries[selectedEntry].title);
                                           var replacement='img src="http:';
                                          var desc=entries[selectedEntry].description;
                                      desc=(desc.replace(/href/gi, "span"));
                                           desc=(desc.replace(/img src=\"/gi, replacement));
                                           var link=entries[selectedEntry].link;
                                           var contentHTML = "";
                                           contentHTML += desc;contentHTML += '<p/><a rel="external" href="'+ link + '" data-gourl="'+ link + '" class="open-external-browser">Read More</a>';$("#entryText",this).html(contentHTML);
                
                
                                           });
                    
                }
                
               // $(window).load(function() {resizeRssImages();});

                

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
	
            
rssReader();
