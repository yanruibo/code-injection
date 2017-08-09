





	                        
         $(document).ready(function() {
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
            alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
                alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            

	                        
         $(document).ready(function() {
	//	 alert("1");
             document.addEventListener("deviceready",onDeviceReadyCheckNetwork,false);
         });
    
         function onDeviceReadyCheckNetwork() {
		// alert("2");
        var networkState = navigator.network.connection.type;
if (networkState===Connection.UNKNOWN){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }

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
                          $('#youtubevideos').youTubeChannel({ 
                                                             userName: 'pguilder', 
                                                             channel: "uploads", 
                                                             hideAuthor: true,
                                                             numberToDisplay: 30,
                                                             linksInNewWindow: true
                                                             //other options
                                                             //loadingText: "Loading...",                    
                                                             },"android");
                          });            
        






	                        
         $(document).ready(function() {
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
            alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
                alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
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
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
            alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
                alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
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
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
            alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
                alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            


            var pictureSource;   // picture source
            var destinationType; // sets the format of returned value
            var destinationTypeData;
            var albumButton;
            var libraryButton;
            var cameraButton;
            var resetButton;
                    
            function OnBodyLoadCamera() {
                //console.log("BODY LOADED");
                document.addEventListener("deviceready",onDeviceReadyCamera,false);
                $("#select-photo-wrapper").show();
            }

                    
            function onDeviceReadyCamera() {
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
                    extras[WebIntent.EXTRA_SUBJECT] = "**New Years Eve Photo Contest**";
                    extras[WebIntent.EXTRA_TEXT] = $("textarea#emailPhotoMessage").val();
                    extras[WebIntent.EXTRA_STREAM] = $("#emailPhotoLocation").val();
                    extras[WebIntent.EXTRA_EMAIL] = "ProfessionalsGuild@gmail.com";
                    window.plugins.webintent.startActivity({
                       action: WebIntent.ACTION_SEND,
                       type: 'image/jpeg',
                       extras: extras
                    },
                    function() {
                        //$("#photo-container").html("<p><strong>Photo sent! Thankyou!</stong></p>");
                        $("#photo-container").html("");
                        navigator.notification.alert("Photo is being sent. Thank you!", false, "Sending...", "Close");
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
                    navigator.notification.alert("Photo sent. Thank you!", false, "Sent", "Close");
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
                //alert("GET FROM LIBRARY");
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
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
            alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
                alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            



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

    
    

/**
 * Phonegap Web Intent plugin
 * Copyright (c) Boris Smus 2010
 *
 */
var WebIntent = function() { 

};

WebIntent.ACTION_SEND = "android.intent.action.SEND";
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
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
            alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
                alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            

	    $(document).ready(function() {
	        $("div.modLinks a").each(function(index) {
                var goUrl = $(this).attr("href");
                $(this).addClass("open-external-browser");
                $(this).attr("data-gourl",goUrl);
            });
        });
	






	                        
         $(document).ready(function() {
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
            alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
                alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            

		                
    $(document).ready(function() {
    
    document.body.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                }, false);/*
if(screen.height>550){
        $("body").css("background","url(\"Default.png\")");
        $("body").css("backgroundSize","100% 100%");
        $(".ui-page").css("background","url(\"Default.png\")");
        $(".ui-page").css("backgroundImage","url(\"Default.png\")");
        $(".ui-page").css("backgroundSize","100% 100%");
        }
        else{
        $("body").css("background","url(\"Default.png\")");
        $("body").css("backgroundSize","100% 100%");
        $(".ui-page").css("background","url(\"Default.png\")");
        $(".ui-page").css("backgroundImage","url(\"Default.png\")");
        $(".ui-page").css("backgroundSize","100% 100%");
        }*/
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
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
            alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
                alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            






	                        
         $(document).ready(function() {
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            $(document).ready(function() {
            $("a.open-child-browser").click(function() {
            alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
                alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            

	                        
         $(document).ready(function() {
	//	 alert("1");
             document.addEventListener("deviceready",onDeviceReadyCheckNetwork,false);
         });
    
         function onDeviceReadyCheckNetwork() {
		// alert("2");
        var networkState = navigator.network.connection.type;
if (networkState===Connection.UNKNOWN){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }

         }
     

              
function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}


              
                
                function  rssReader() {
                   // alert("rssReader");
                    
                    //EDIT THESE LINES
                    //Title of the blog
                    //RSS url
                    var RSS = "http://pguild.com/feed/";

		///alert(RSS);
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
             //     alert("1");
                    //listen for detail links
                    $(".contentLink").live("click", function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
       //   alert("2");
                    //Listen for main page
                    $("#mainPage").live("pageinit", function() {
                                        //alert("3");
                                        //Set the title
                                        
                          //     alert("4");
                                        $.get(RSS, {}, function(res, code) {
                                        //  alert("5");
                                              var xml = $(res);
                                              var items = xml.find("item");
                                              $.each(items, function(i, v) {
                                                     entry = {
                                                     title:$(v).find("title").text(), 
                                                     link:$(v).find("link").text(), 
                                                     description:$.trim($(v).find("description").text())
                                                     };
                                                     entries.push(entry);
     });
  									  
											  
											  
											  
                                              //now draw the list
                                              var s = '';
                                              var replacement='img src="http:';
                                              var cleanDesc;
                                              var itemLink;
											  var imageSource;
											  var pulledDescription;
											  var scraped;
                                              $.each(entries, function(i, v) {
											 // alert("item");
											 pulledDescription=v.description;
                                                    cleanDesc=strip(v.description);
													scraped=pulledDescription.match(/img src=\"(.+?)\"/gi);
													imageSource="";
													if(!!scraped){
													imageSource='<' + scraped + ' style="max-width:80%;"><br><br>';
													}
                                                     itemLink=v.link;							   
							   s += '<li data-icon="false"><h3 style="white-space:normal">' + v.title + '</h3><p style="white-space:normal">' + imageSource + cleanDesc + '</p><p><a rel="external" href="'+ v.link + '" data-gourl="'+ v.link + '" class="open-external-browser">Read More</a></p></li>';});
							//	alert("6");
                                              $("#linksList").append(s);
                                              $("#linksList").listview("refresh");
                                              });
                                   //     alert("7");
                                        });
                    
                    //Listen for the content page to load
                    $("#contentPage").live("pageshow", function(prepage) {
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
                
                

                
rssReader();
