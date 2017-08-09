





	                        
         $(document).ready(function() {
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            //$(document).ready(function() {
            $("a.open-child-browser").click(function() {
           // alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
            // });
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
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
            
    
        $(document).ready(function() {
                          $('#youtubevideos').youTubeChannel({ 
                                                             userName: 'rebellrlc', 
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
            //$(document).ready(function() {
            $("a.open-child-browser").click(function() {
           // alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
            // });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            

	    $(document).ready(function() {
	        $("div#additional-tab-content a").each(function(index) {
                var goUrl = $(this).attr("href");
                $(this).addClass("open-external-browser");
                $(this).attr("data-gourl",goUrl);
            });
        });
	

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
            
// <![CDATA[
$(function(){$("div").live("pageshow",function(e,t){$("div:jqmData(role=content)").css("padding","0px")})})
// ]]>

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
            //$(document).ready(function() {
            $("a.open-child-browser").click(function() {
           // alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
            // });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
            






	                        
         $(document).ready(function() {
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            //$(document).ready(function() {
            $("a.open-child-browser").click(function() {
           // alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
            // });
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

    
    

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
            






	                        
         $(document).ready(function() {
             //document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
             onDeviceReadyChildBrowser();
         });
    
         function onDeviceReadyChildBrowser() {
            //$(document).ready(function() {
            $("a.open-child-browser").click(function() {
           // alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
            // });
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
        $("body").css("background","url(\"Default-568h@2x.png\")");
        $("body").css("backgroundSize","100% 100%");
        $(".ui-page").css("background","url(\"Default-568h@2x.png\")");
        $(".ui-page").css("backgroundImage","url(\"Default-568h@2x.png\")");
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
            //$(document).ready(function() {
            $("a.open-child-browser").click(function() {
           // alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
            // });
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
            //$(document).ready(function() {
            $("a.open-child-browser").click(function() {
           // alert("child-browser");
                 var goUrl = $(this).attr("data-gourl");
              //  alert(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser").click(function() {
             //alert("external-browser");
                 var goUrl = $(this).attr("data-gourl");
                //alert(goUrl);
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
            // });
             });
         }
                        
     


                $(document).ready(function() {
                    document.addEventListener("deviceready",initPushwoosh,false);
                   
                });
            

	    $(document).ready(function() {
	        $("div#additional-tab-content a").each(function(index) {
                var goUrl = $(this).attr("href");
                $(this).addClass("open-external-browser");
                $(this).attr("data-gourl",goUrl);
            });
        });
	

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
            
// <![CDATA[
$(function(){$("div").live("pageshow",function(e,t){$("div:jqmData(role=content)").css("padding","0px")})})
// ]]>
