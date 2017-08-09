






    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Akel's Deli Jea",
                        text: "https://play.google.com/store/apps/details?id=com.a1226284053523a69d9151fc2a.a40404521a"},
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
                
             
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=aboutUs&appId=1226284053523a69d9151fc2.40404521\"/>");}).fail(function( jqxhr, textStatus, error ) {});

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
                        subject: "Share Akel's Deli Jea",
                        text: "https://play.google.com/store/apps/details?id=com.a1226284053523a69d9151fc2a.a40404521a"},
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

$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=billCalculator&appId=1226284053523a69d9151fc2.40404521\"/>");}).fail(function( jqxhr, textStatus, error ) {});







    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Akel's Deli Jea",
                        text: "https://play.google.com/store/apps/details?id=com.a1226284053523a69d9151fc2a.a40404521a"},
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
                
             



      var geocoder;
	  var distance;
      var bounds = new google.maps.LatLngBounds();
      var destination = '21 w church st, jacksonville, fl , 32202';
	  var distanceLimit= 5;
	  var gotResult=0;

function onBodyLoad() {

	  		document.addEventListener("deviceready", onDeviceReadyGPS, false);
     
    //if( navigator.userAgent.match(/Android/i) ) {
    //         onDeviceReadyGPS();
    //} else if (typeof navigator.device == "undefined"){
    //        document.addEventListener("deviceready", onDeviceReadyGPS, false);
    //} else {
    //         onDeviceReadyGPS();
    //} 
}



function onDeviceReadyGPS() {
//alert('onDeviceReady started');
	  timeMsg();
	  
	  var networkState = navigator.network.connection.type;
	  		//console.log('Network State: ' + networkState);
      if (networkState==Connection.NONE){
          //no point trying to get live html
          navigator.geolocation.getCurrentPosition(middleMan);
	  		//console.log('No network');
      } else {
          var url = 'http://skybuilder.net/gpsCoupon.php?a=1226284053523a69d9151fc2.40404521&v=1.02';
   	    $.ajax({
            url: url,
            dataType: 'jsonp',
        }).always(function(data, textStatus, jqXHR) { 
          		if(textStatus == 'success') {
   	                if(parseInt(data.hasSuccess) == 1) {
	  		            $('#onlineSuccessMessage').html(data.successHtml);
	  		        }
	  		        if(parseInt(data.hasFail) == 1) {
	  		             $('#onlineFailMessage').html(data.failHtml);
	  		        }
          		}
            navigator.geolocation.getCurrentPosition(middleMan);
        });
      }

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
          		console.log('STATUS: '+ status);
          		console.log(JSON.stringify(response));
          		$('#radarDiv').hide();
        if (status != google.maps.DistanceMatrixStatus.OK) {
          //alert('Error was: ' + status);
          		 if($('#onlineFailMessage').html() != '') {
          		        $('#onlineFailMessage').show();
          		    } else {
          		        $('#offlineFailMessage').show();
          		    }
        } else {
		//alert('2');
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
          var exceptionError = false;
//alert('3');
         for (var i = 0; i < origins.length; i++) {
             var results = response.rows[i].elements;
             for (var j = 0; j < results.length; j++) {
			    var element = results[j];
          		if(element.status == 'ZERO_RESULTS') {
          	    	if($('#onlineFailMessage').html() != '') {
          		        $('#onlineFailMessage').show();
          		    } else {
          		        $('#offlineFailMessage').show();
          		    }
          		} else {
                    var distance = element.distance.text;
				    distance = distance / 1609.344;
								 //alert('Dist:' + distance);
								 gotResult=1;
				    if (distance<distanceLimit){
					    if($('#onlineSuccessMessage').html() != '') {
          		            $('#onlineSuccessMessage').show();
          		        } else {
          		            $('#offlineSuccessMessage').show();
          		        }
				    
				    } else{
				        if($('#onlineFailMessage').html() != '') {
          		            $('#onlineFailMessage').show();
          		        } else {
          		            $('#offlineFailMessage').show();
          		        }
				    }
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
if($('#onlineFailMessage').html() != '') {
          		        $('#onlineFailMessage').show();
          		    } else {
          		        $('#offlineFailMessage').show();
          		    }
}
}

$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=gpsCoupons&appId=1226284053523a69d9151fc2.40404521\"/>");}).fail(function( jqxhr, textStatus, error ) {});







    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Akel's Deli Jea",
                        text: "https://play.google.com/store/apps/details?id=com.a1226284053523a69d9151fc2a.a40404521a"},
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

    
    
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=barcodescanner&appId=1226284053523a69d9151fc2.40404521\"/>");}).fail(function( jqxhr, textStatus, error ) {});




      
function initialize() { 
    if( navigator.userAgent.match(/Android/i) ) {
             onDeviceReadyDir();
    } else if (typeof navigator.device == "undefined"){
            document.addEventListener("deviceready", onDeviceReadyDir, false);
    } else {
             onDeviceReadyDir();
    } 
}


function onDeviceReadyDir() {
navigator.geolocation.getCurrentPosition(showMap);
}

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function showMap(position) {
var latitude=position.coords.latitude;
var longitude=position.coords.longitude;
  directionsDisplay = new google.maps.DirectionsRenderer();
  var start = new google.maps.LatLng(latitude,longitude);
  var myOptions = {
    zoom:7,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: start
  }
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directionsPanel"));
var end = "21 w church st jacksonville fl 32202";
  calcRoute(start,end);
}

function calcRoute(start,end){
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}

    







    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Akel's Deli Jea",
                        text: "https://play.google.com/store/apps/details?id=com.a1226284053523a69d9151fc2a.a40404521a"},
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
                
             


	
	var geocoder, lat, lng, url;
	
		
	$(document).ready(function() {
		
		$.mobile.loading( "show", {
			text: "Loading, please wait...",
			textVisible: true
		});
		
	});
		
	function pageInit(){
		
	
		var address = "32202";
		geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': address}, function(results, status) {
		    if (status == google.maps.GeocoderStatus.OK) {
		     	var position = results[0].geometry.location;
				lat = position.lat();
				lng = position.lng();
				//alert(lat + ", " + lng);
				
				
				
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
				
				url = url.replace("##date##", date);
				url = url.replace("##time##", time);
				url = url.replace("##lat##", lat);
				url = url.replace("##lng##", lng);
				
				//alert(url);
				$.mobile.loading("hide");
				setTimeout(function(){openPage(url);}, 500);
				
		    } else {
		      alert("Geocode was not successful for the following reason: " + status);
		    }
  		});
	
	
	}
				
			function openPage(goUrl){
				
				//alert(goUrl);
				var cb = window.plugins.childBrowser;
				if(cb != null){
					cb.onLocationChange = function(loc){ root.locChanged(loc); };
					cb.onClose = function(){
						window.location = "index.html";
					};
					cb.onOpenExternal = function(){root.onOpenExternal();};
		
					window.plugins.childBrowser.showWebPage(goUrl);
					
				}
			}
			

$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=openTable&appId=1226284053523a69d9151fc2.40404521\"/>");}).fail(function( jqxhr, textStatus, error ) {});







    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Akel's Deli Jea",
                        text: "https://play.google.com/store/apps/details?id=com.a1226284053523a69d9151fc2a.a40404521a"},
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
   	        var scanCode = "082624100-1379567442162007253523a8752c9b95387293015";
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
   	            db = getLoyaltyDb();
   	            db.transaction(initLoyaltyCardDb, errorCB, successCB);
                scanButton.addEventListener("click", clickScan, false);
   	            claimButton.addEventListener("click", claimReward, false);
   	            db = getLoyaltyDb();
   	            db.transaction(
   	                function(transaction) {
                        transaction.executeSql("SELECT * FROM REWARDPROGRESS WHERE isCurrent='1' LIMIT 1", 
   	                        [],
   	                        processGetRewardFromDbResult, errorCB);
                    }
   	            );
            }
   	        
   	                        
   	        function getLoyaltyDb() {
   	           var dbConn = window.openDatabase("loyaltycard.db", "1.0", "Loyalty Card", 2000000);
   	           return dbConn;
   	        }
   	                
   	        function initLoyaltyCardDb(tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS REWARDPROGRESS (hash,carrotUrl,carrotLocalFile,rewardUrl,rewardLocalFile,requiredScans,scanWait,noScans,lastScan,isCurrent)");
            }
   	                        
   	        function checkConnection() {
   	        		
   	        		return;
   	        		
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
   	                    
   	            var url = "http://skybuilder.net/reward.php?a=1226284053523a69d9151fc2.40404521";
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
   	                                db = getLoyaltyDb();
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
   	                         db = getLoyaltyDb();
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
   	                     db = getLoyaltyDb();
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
   	            db = getLoyaltyDb();
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
   	                            
   	            var url = "http://skybuilder.net/reward.php?a=1226284053523a69d9151fc2.40404521&h="+dbRewardObject.hash+"&c=1";
   	            $.ajax({
                    url: url,
                    dataType: 'jsonp',
                    success:  function(data) { }
                });
   	                            
   	            db = getLoyaltyDb();
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
   	            db = getLoyaltyDb();
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
                entry.getDirectory("1226284053523a69d9151fc2.40404521", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail); 
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
                        fileSystem.root.getFile("1226284053523a69d9151fc2.40404521.html",
                            {create: true, exclusive: false}, 
                            function gotFileEntry(fileEntry) {
                                var sPath = fileEntry.fullPath.replace("1226284053523a69d9151fc2.40404521.html","1226284053523a69d9151fc2.40404521/");
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
                                            db = getLoyaltyDb();
   	                                        db.transaction(updateDbWithLocalRewardFile, errorCB,successCB);
                                        }
                                                
                                        if(params.suffix == "carrot") {
   	                                        carrotLocalFile = theFile.toURL();
                                            db = getLoyaltyDb();
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
                        db = getLoyaltyDb();
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
                                       
   	            db = getLoyaltyDb();
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

        
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=loyaltyCard&appId=1226284053523a69d9151fc2.40404521\"/>");}).fail(function( jqxhr, textStatus, error ) {});







    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Akel's Deli Jea",
                        text: "https://play.google.com/store/apps/details?id=com.a1226284053523a69d9151fc2a.a40404521a"},
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
        
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=pushHistory&appId=1226284053523a69d9151fc2.40404521\"/>");}).fail(function( jqxhr, textStatus, error ) {});







    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Akel's Deli Jea",
                        text: "https://play.google.com/store/apps/details?id=com.a1226284053523a69d9151fc2a.a40404521a"},
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
                
             
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=openingHours&appId=1226284053523a69d9151fc2.40404521\"/>");}).fail(function( jqxhr, textStatus, error ) {});







    		$(document).ready(function() {
                $("#shareButtonLink").click(function() {
                    window.plugins.share.show({
                        subject: "Share Akel's Deli Jea",
                        text: "https://play.google.com/store/apps/details?id=com.a1226284053523a69d9151fc2a.a40404521a"},
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
                        subject: "Share Akel's Deli Jea",
                        text: "https://play.google.com/store/apps/details?id=com.a1226284053523a69d9151fc2a.a40404521a"},
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
                
             
