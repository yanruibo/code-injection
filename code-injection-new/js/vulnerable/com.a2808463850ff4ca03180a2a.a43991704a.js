





	                        
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
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
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
                                                             userName: 'DUCTZ', 
                                                             channel: "uploads", 
                                                             hideAuthor: true,
                                                             numberToDisplay: 30,
                                                             linksInNewWindow: true
                                                             //other options
                                                             //loadingText: "Loading...",                    
                                                             },"android");
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
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
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
                
             



      var geocoder;
	  var distance;
      var bounds = new google.maps.LatLngBounds();
      var destination = 'charleston sc';
	  var distanceLimit= 60;
	  var gotResult=0;
	  

function onBodyLoad() {

//alert('onBodyLoad started');
    if( navigator.userAgent.match(/Android/i) ) {
	//alert('Android UA matched');
             onDeviceReadyGPS();
    } else if (typeof navigator.device == "undefined"){
            document.addEventListener("deviceready", onDeviceReadyGPS, false);
    } else {
             onDeviceReadyGPS();
    } 
}




function onDeviceReadyGPS() {
//alert('onDeviceReady started');
	  timeMsg();
navigator.geolocation.getCurrentPosition(middleMan);
}
  
	  function middleMan(position){
	  //alert('middleMan started');
	 calculateDistances(position);
	  }
    
      function calculateDistances(position) {
	  var latitude=position.coords.latitude;
	var longitude=position.coords.longitude;
	//alert('Lat:' + latitude);
	//alert('Lng:' + longitude);
	  var origin = new google.maps.LatLng(latitude, longitude);
	  geocoder = new google.maps.Geocoder();
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [destination],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false
          }, callback);
		  
      }

      function callback(response, status) {
	  //alert('1');
        if (status != google.maps.DistanceMatrixStatus.OK) {
          //alert('Error was: ' + status);
        } else {
		//alert('2');
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
          var outputDiv = document.getElementById('outputDiv');
          outputDiv.innerHTML = '';
//alert('3');
          for (var i = 0; i < origins.length; i++) {
		  //alert('4');
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
			//alert('5');
			distance = results[j].distance.value;
								 distance = distance / 1609.344;
								 //alert('Dist:' + distance);
								 gotResult=1;
					if (distance<distanceLimit){
					//alert('success');
				  outputDiv.innerHTML += '<center><img src="2808463850ff4ca03180a2.439917041.01gpsCouponsSuccess.png" style="max-width:90%"></center><p style=\"text-align: center;\"><span style=\"font-family: tahoma, arial, helvetica, sans-serif; font-size: large;\">Complete Air Duct Cleaning Special F</span><span style=\"font-family: tahoma, arial, helvetica, sans-serif; font-size: large;\">or</span><br /><strong><span style=\"font-family: tahoma, arial, helvetica, sans-serif; font-size: x-large; color: #ff6600;\">$495</span></strong><br /><span style=\"font-family: tahoma, arial, helvetica, sans-serif; font-size: x-small;\">(up to 15 registers from air handler to vent)</span></p>';
				  }
				  else{
				  //alert('fail');
				  outputDiv.innerHTML += '<center><img src="2808463850ff4ca03180a2.439917041.01gpsCouponsFail.png" style="max-width:90%"></center><p style=\"text-align: center;\"><span style=\"text-align: center; font-family: tahoma, arial, helvetica, sans-serif; font-size: large;\">Complete Air Duct Cleaning Special F</span><span style=\"text-align: center; font-family: tahoma, arial, helvetica, sans-serif; font-size: large;\">or</span><br style=\"text-align: center;\" /><strong style=\"text-align: center;\"><span style=\"font-family: tahoma, arial, helvetica, sans-serif; font-size: x-large; color: #ff6600;\">$495</span></strong><br style=\"text-align: center;\" /><span style=\"font-size: x-small; text-align: center; font-family: tahoma, arial, helvetica, sans-serif;\">(up to 15 registers from air handler to vent)</span></p>';
				  }
            }
          }
        }
      }


function timeMsg()
{
var t=setTimeout('alertMsg()',20000);
}
function alertMsg()
{
//alert('timeout');
if (gotResult==0){
outputDiv.innerHTML = '';
outputDiv.innerHTML += '<center><img src="2808463850ff4ca03180a2.439917041.01gpsCouponsFail.png" style="max-width:90%"></center><p style=\"text-align: center;\"><span style=\"text-align: center; font-family: tahoma, arial, helvetica, sans-serif; font-size: large;\">Complete Air Duct Cleaning Special F</span><span style=\"text-align: center; font-family: tahoma, arial, helvetica, sans-serif; font-size: large;\">or</span><br style=\"text-align: center;\" /><strong style=\"text-align: center;\"><span style=\"font-family: tahoma, arial, helvetica, sans-serif; font-size: x-large; color: #ff6600;\">$495</span></strong><br style=\"text-align: center;\" /><span style=\"font-size: x-small; text-align: center; font-family: tahoma, arial, helvetica, sans-serif;\">(up to 15 registers from air handler to vent)</span></p>';
}
}


                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
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

    
    

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
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
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
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
            $.mobile.loading( "show", {
                text: "Loading, please wait...",
                textVisible: true
            });
        });                         
                function  rssReader() {
                    
                    //EDIT THESE LINES
                    //Title of the blog
                    var TITLE = "Deals";
                    //RSS url
                    var RSS = "https://api.groupon.com/v2/deals.xml?postal_code=29401+29402+29403+29406+29407+29409+29410+29412+29413+29414+29415+29416+29417+29419+29422+29423+29424+29425+29492&client_id=340499e6fcbec24b891fb3f1ca84e013b2f1bdce";

		//alert(RSS);
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
                 //   alert("1");
                    //listen for detail links
                    $(".contentLink").live("click", function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
            //   alert("2");
                    //Listen for main page
                    $("#mainPage").live("pageinit", function() {
                                        //alert("3");
                                        //Set the title
                                        
                                  //alert("4");
                                        $.get(RSS, {}, function(res, code) {
                                             $.mobile.loading( "hide");
                                             //alert("5");
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
											  //alert("item");
                                                     var cleanDesc=v.description;
													 var link=v.link;
													 cleanDesc=cleanDesc.replace(/<p><\/li>/gi, "</li>");
													 cleanDesc=cleanDesc.replace(/_self/gi, "_blank");
cleanDesc=cleanDesc.replace(/<p> <\/li>/gi, "</li>");
cleanDesc=cleanDesc.replace(/<p>  <\/li>/gi, "</li>");
cleanDesc=cleanDesc.replace(/<ul>/gi, "<p>");
cleanDesc=cleanDesc.replace(/<\/ul>/gi, "</p>");
cleanDesc=cleanDesc.replace(/<li>/gi, " - ");
cleanDesc=cleanDesc.replace(/<\/li>/gi, "</br>");
cleanDesc=cleanDesc.replace(/<p>/gi, "<p style=\"white-space:normal\">");
cleanDesc=cleanDesc.replace(/<h4>/gi, "<h4 style=\"white-space:normal\">");
cleanDesc=cleanDesc.replace(/<li>/gi, "<li style=\"white-space:normal\">");
cleanDesc=cleanDesc.replace(/<ul>/gi, "<ul data-inset=\"true\" style=\"white-space:normal\">");		   
							   s += '<li style="white-space:normal" class="news-item"><p style="white-space:normal"><h3><a style="white-space:normal" href="' + link + '" rel="external">' + v.title + '</a></h3><br>' + cleanDesc + '</p></li>';});
								//alert("6");
                                              $("#linksList").append(s);
                                              $("#linksList").listview("refresh");
                                              $(".news-item").each(function(pff,pfft){
                                                  $(this).removeClass("ui-btn-up-c").addClass("ui-body-c");
                                              });
                                              
                                              });
                                       
                    

                    });
                }
                
                

                

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
            
rssReader();

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
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
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
            $.mobile.loading( "show", {
                text: "Loading, please wait...",
                textVisible: true
            });
        });
	                
	                function initialize(){
	  rssReader("Charleston");
	  }
 
                function  rssReader(location) {
                   // alert("rssReader");
                    
                    //RSS url
                    var RSS = "http://www.eventbrite.com/directoryxml/?loc=" + location;
					//alert(RSS);
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
                    //alert("1");
                    //listen for detail links
                    $(".contentLink").live("click", function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
                                           
                    //handle child browser links
                    $("a.open-child-browser-rss").live("click", function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser-rss").live("click", function() {
             var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             }); 
             
                    //alert("2");
                    //Listen for main page
                $("#mainPage").live("pageinit", function() {
                                        //alert("3");
                                        //Set the title
                                        
                                        //alert("4");
                                        $.get(RSS, {}, function(res, code) {
	                                          $.mobile.loading( "hide");
                                              //alert("5");
                                              var xml = $(res);
                                              var items = xml.find("item");
                                              $.each(items, function(i, v) {
                                                     entry = {
                                                     title:$(v).find("title").text(), 
                                                     link:$(v).find("guid").text(), 
                                                     description:$.trim($(v).find("description").text())
                                                     };
                                                     entries.push(entry);
                                                     });
                                              
                                              //now draw the list
                                              var s = '';
                                              $.each(entries, function(i, v) {
                                                     //alert('entry');
                                                     s += '<li class="news-item"><p><h3><a href="#contentPage" class="contentLink" data-entryid="'+i+'">' + v.title + '</a></h3><br>' + v.description + '</p></li>';
                                                     });
                                                     $("#linksList").append(s);
                                             $("#linksList").listview("refresh");
                                              $(".news-item").each(function(pff,pfft){
                                                  $(this).removeClass("ui-btn-up-c").addClass("ui-body-c");
                                              });
                                              
                                              });
                                        });
                    
                    //Listen for the content page to load
                    $("#contentPage").live("pageshow", function(prepage) {
                                           //Set the title
                                           $("h1", this).text(entries[selectedEntry].title);
                                           var desc=entries[selectedEntry].description;
                                           desc=(desc.replace(/href/gi, "span"));
                                           var link=entries[selectedEntry].link;
                                           var contentHTML = "";
                                           contentHTML += desc;contentHTML += '<p/><a rel="external" class="open-child-browser-rss" data-gourl="'+ link + '" href="'+ link + '">Read More</a>';  $("#entryText",this).html(contentHTML);
                                           });
                    
                }
                

                
                

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
            
initialize();






	                        
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
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
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
                              extras[WebIntent.EXTRA_SUBJECT] = "Contact Form";
                              extras[WebIntent.EXTRA_TEXT] = messageBody;
                              extras[WebIntent.EXTRA_EMAIL] = "george.unsinger@ductz.com";
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
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
    }
	else if (networkState===Connection.NONE){
alert ("It appears you are currently not connected to the Internet. Please establish a connection and try again.");
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
                        $.mobile.loading( "show", {
                            text: "Loading, please wait...",
                            textVisible: true
                        });
                    });
	                
	                function initialize(){
	                    
	  rssReader("Charleston");
	  }


              
                
                function  rssReader(location) {
                   // alert("rssReader");
                    

                    //RSS url
                    var RSS = "http://news.google.com/news?q=" + location + "&output=rss";
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
                    //alert("1");
                    //listen for detail links
                    $(".contentLink").live("click", function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
                    //alert("2");
                    //Listen for main page
                    $("#mainPage").live("pageinit", function() {
	                  
                                        //alert("3");
                                        //Set the title
                                        
                                        //alert("4");
                                        $.get(RSS, {}, function(res, code) {
	                                          $.mobile.loading( "hide");
                                              //alert("5");
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
                                            var articleTitle;
                                             var titleHalves;
                                              var articleLink;
                                              var articleDate;
                                              var articleBody;
                                              var articleImage;
                                              var articleSource;
                                              var scraped;
                                              var imgSrc;
                                              $.each(entries, function(i, v) {
                                      //manipulate results into correct format
                                      //get title
                                     articleTitle=v.title;
                               titleHalves = articleTitle.split(" - ");
          articleTitle = titleHalves[0];
          //get article date
           articleDate = v.pubDate;
            //get to just the text of the article body - strip everything else
            articleBody=v.description;
            articleBody=(articleBody.replace(/<b>/gi, ""));
            articleBody=(articleBody.replace(/<\/b>/gi, ""));
            articleBody=(articleBody.replace(/<\/font>/gi, "..."));
            scraped=(articleBody.match(/<br \/><font size="-1">(.+?)\.\.\./gi));
            articleSource=scraped[0];
            articleSource=(articleSource.replace(/<font color="#6f6f6f">/gi, ""));
            articleSource=(articleSource.replace(/<br \/><font size="-1">/gi, ""));
            articleSource=(articleSource.replace(/\.\.\./gi, ""));
            articleBody=scraped[1];
            articleBody=(articleBody.replace(/<br \/><font size="-1">/gi, ""));
            //get image if it exists
           scraped=(v.description.match(/src="(.+?)"/gi));
          if (scraped != null) {
          imgSrc=scraped[0];
          imgSrc=(imgSrc.replace(/src="/gi, ""));
          articleImage = '<p style="white-space:normal;word-wrap: break-word;"><img src="http:' + imgSrc + '></p>';
            } else {
                articleImage = '';
            }articleLink=v.link;
				 s += '<li style="white-space:normal;word-wrap: break-word;" class="news-item">' + articleImage + '<h2 style="white-space:normal;word-wrap: break-word;">' + articleTitle + '</h2><p style="white-space:normal;word-wrap: break-word;">' + articleSource + ' - ' + articleBody + '</p><p><a rel="external" href="' + articleLink + '" data-gourl="'+ articleLink + '" class="open-external-browser">Read More</a></p></li>';});
                                              $("#linksList").append(s);
                                              $("#linksList").listview("refresh");
                $(".news-item").each(function(pff,pfft){
$(this).removeClass("ui-btn-up-c").addClass("ui-body-c");
});
                                              });
                                        
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
                
                

                

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
            

                $(document).ready(function() {
                    if($("#title-home-label").length > 0) {
                        var w = $("#title-home-label").width() + 50;
                        $("#title-home-button").width(w);
                    }
                });
            
initialize();
