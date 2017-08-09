






	                        
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
     


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
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
                
             


				var lbPageName = location.pathname.substring(1);
                var lbPageParts = lbPageName.split(/\//);
                var lbFileName = lbPageParts.pop();
				
				$(document).ready(function() {
				    document.addEventListener("deviceready", onDeviceReadyLeadbolt, false);
				});
				
				function onDeviceReadyLeadbolt() {
				
					if(lbFileName != "index.html") {
					    var iparamsBanner=new Array();
                        iparamsBanner[0]="866984127";
                        window.plugins.leadbolti.load(iparamsBanner, null, null);
                    }
            
					if(lbFileName == "index.html") {
					    var iparamsIntersitial=new Array();
                        iparamsIntersitial[0]="863219932";
                        window.plugins.leadbolti.load(iparamsIntersitial, null, null);
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
     
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=youtubeKeywords&appId=1952728782521ca3f13c1804.36602760\"/>");}).fail(function( jqxhr, textStatus, error ) {});
    
        $(document).ready(function() {
                          $('#youtubevideos').youTubeChannel({ 
                                                             userName: 'Yoga', 
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
                





    	
    				// initialize the Leadbolt banner, unlocker and capture form ads plugin 
    (function(cordova) {
    	var LeadboltI = function() { }
        LeadboltI.prototype.load = function(data, successCallback, failureCallback) {
	        return cordova.exec(successCallback, failureCallback, 'LeadboltPluginI', "showad", data);			
        };
        LeadboltI.prototype.remove = function(data, successCallback, failureCallback) {
	        return cordova.exec(successCallback, failureCallback, 'LeadboltPluginI', "removead", data);			
        };
	
        cordova.addConstructor(function() {	
    	    if(!window.plugins) {
                window.plugins = {};
            }			
	        if (!window.plugins.leadbolti) {
                window.plugins.leadbolti = new LeadboltI();
            }
        });
    })(window.cordova || window.Cordova || window.PhoneGap);

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
 			 var out = '<li class="ui-li ui-li-static ui-body-c"><center><p class="ui-li-desc"><br><a href="' + 
             vidUrl + '" rel="external" class="open-plugin-videoplayer" data-vidurl="'+vidUrl+'"><img src="' + 
             videoId + '/2.jpg"/ width="240px" height="180px"></a></p><p class="ui-li-desc"><a href="' + 
             vidUrl + '" rel="external" class="open-plugin-videoplayer" data-vidurl="'+vidUrl+'">' + e.title.$t + '</a></p></center></li>';
			
			 
            
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


    	var reminderPopupId = 0;
function onDeviceReadyReminder() {
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
    var dbConn = window.openDatabase("ratereminder", "1.0", "Rate Reminder Popup", 2000000);
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
            setAllDone = true;window.plugins.childBrowser.openExternal("market://details?id=com.a1952728782521ca3f13c1804a.a36602760a");;
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
document.addEventListener("deviceready",onDeviceReadyReminder,false);
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
                
             


				var lbPageName = location.pathname.substring(1);
                var lbPageParts = lbPageName.split(/\//);
                var lbFileName = lbPageParts.pop();
				
				$(document).ready(function() {
				    document.addEventListener("deviceready", onDeviceReadyLeadbolt, false);
				});
				
				function onDeviceReadyLeadbolt() {
				
					if(lbFileName != "index.html") {
					    var iparamsBanner=new Array();
                        iparamsBanner[0]="866984127";
                        window.plugins.leadbolti.load(iparamsBanner, null, null);
                    }
            
					if(lbFileName == "index.html") {
					    var iparamsIntersitial=new Array();
                        iparamsIntersitial[0]="863219932";
                        window.plugins.leadbolti.load(iparamsIntersitial, null, null);
                    }
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
		
             var out = '<li class="ui-li ui-li-static ui-body-c"><center><p class="ui-li-desc"><br><a href="' + 
             vidUrl + '" rel="external" class="open-plugin-videoplayer" data-vidurl="'+vidUrl+'"><img src="http://i.ytimg.com/vi/' + 
             videoId + '/2.jpg"/ width="240px" height="180px"></a></p><p class="ui-li-desc"><a href="' + 
             vidUrl + '" rel="external" class="open-plugin-videoplayer" data-vidurl="'+vidUrl+'">' + e.title.$t + '</a></p></center></li>';
			 
		
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
document.addEventListener("deviceready",onDeviceReadyReminder,false);
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
                
             


				var lbPageName = location.pathname.substring(1);
                var lbPageParts = lbPageName.split(/\//);
                var lbFileName = lbPageParts.pop();
				
				$(document).ready(function() {
				    document.addEventListener("deviceready", onDeviceReadyLeadbolt, false);
				});
				
				function onDeviceReadyLeadbolt() {
				
					if(lbFileName != "index.html") {
					    var iparamsBanner=new Array();
                        iparamsBanner[0]="866984127";
                        window.plugins.leadbolti.load(iparamsBanner, null, null);
                    }
            
					if(lbFileName == "index.html") {
					    var iparamsIntersitial=new Array();
                        iparamsIntersitial[0]="863219932";
                        window.plugins.leadbolti.load(iparamsIntersitial, null, null);
                    }
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
     


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
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
                
             


				var lbPageName = location.pathname.substring(1);
                var lbPageParts = lbPageName.split(/\//);
                var lbFileName = lbPageParts.pop();
				
				$(document).ready(function() {
				    document.addEventListener("deviceready", onDeviceReadyLeadbolt, false);
				});
				
				function onDeviceReadyLeadbolt() {
				
					if(lbFileName != "index.html") {
					    var iparamsBanner=new Array();
                        iparamsBanner[0]="866984127";
                        window.plugins.leadbolti.load(iparamsBanner, null, null);
                    }
            
					if(lbFileName == "index.html") {
					    var iparamsIntersitial=new Array();
                        iparamsIntersitial[0]="863219932";
                        window.plugins.leadbolti.load(iparamsIntersitial, null, null);
                    }
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
                    var RSS = "http://api.flickr.com/services/feeds/photos_public.gne?tags=Yoga&format=rss2";
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
                    //alert("1");
                    //listen for detail links
                    $(".contentLink").click(function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
                    //alert("2");
                    //Listen for main page
                   // $(document).on("pageinit", "#mainPage", function () {
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
                                              
											    var pulledTitle='';
												var pulledDescription='';
                                                     var halfLength=1;
													 var cleanTitle='';
													 var imageSource='';
											  
                                              //now draw the list
                                              var s = '';
                                        $.each(entries, function(i, v) {
											pulledTitle=v.title;
                                            halfLength=pulledTitle.length/2;
											cleanTitle=pulledTitle.slice(halfLength);
											pulledDescription=v.description;
											imageSource=pulledDescription.match(/http:\/\/farm(.+?)jpg/gi);   
                                                     s += '<li style="white-space:normal" class="news-item"><center><h2 style="white-space:normal">' + cleanTitle + '</h2></center><p style="white-space:normal"><img src="' + imageSource + '"></p></li>';
                                                     });
                                                     
                                              $("#linksList").append(s);
                                              $("#linksList").listview("refresh");
                                              $(".news-item").each(function(pff,pfft){
                                                  $(this).removeClass("ui-btn-up-c").addClass("ui-body-c");
                                              });
                                              
                                              });
                                       // });
                    
                   
                    
                }
                
                

                
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=photoGalleryKeywords&appId=1952728782521ca3f13c1804.36602760\"/>");}).fail(function( jqxhr, textStatus, error ) {});
rssReader();







	                        
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
     


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
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
                
             


				var lbPageName = location.pathname.substring(1);
                var lbPageParts = lbPageName.split(/\//);
                var lbFileName = lbPageParts.pop();
				
				$(document).ready(function() {
				    document.addEventListener("deviceready", onDeviceReadyLeadbolt, false);
				});
				
				function onDeviceReadyLeadbolt() {
				
					if(lbFileName != "index.html") {
					    var iparamsBanner=new Array();
                        iparamsBanner[0]="866984127";
                        window.plugins.leadbolti.load(iparamsBanner, null, null);
                    }
            
					if(lbFileName == "index.html") {
					    var iparamsIntersitial=new Array();
                        iparamsIntersitial[0]="863219932";
                        window.plugins.leadbolti.load(iparamsIntersitial, null, null);
                    }
            }
				

                $(document).ready(function() {
                        $.mobile.loading( "show", {
                            text: "Loading, please wait...",
                            textVisible: true
                        });
                    });
                     
                function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}
                
                function  rssReader() {
                   // alert("rssReader");
                    

                    //RSS url
                    var RSS = "http://news.google.com/news?q=Yoga&output=rss&num=100";

			//		alert(RSS);
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
                //    alert("1");
                    //listen for detail links
                    $(".contentLink").click(function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
                 //   alert("2");
                 //Listen for main page
     		$(document).on("pageinit", "#mainPage", function () {
                    //$(document).on("pageinit", "#mainPage", function () {
                       
                                        //alert("3");
                                        //Set the title
                                        
                               //         alert("4");
                                        $.get(RSS, {}, function(res, code) {
                                              $.mobile.loading( "hide");
                                    //          alert("5");
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
          articleImage = '<p style="white-space:normal;word-wrap: break-word;"><img src="http:' + imgSrc + '"></p>';
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
                    
                  ;
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
                
            

                
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=news&appId=1952728782521ca3f13c1804.36602760\"/>");}).fail(function( jqxhr, textStatus, error ) {});
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=news&appId=1952728782521ca3f13c1804.36602760\"/>");}).fail(function( jqxhr, textStatus, error ) {});
rssReader();







	                        
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
     


$(document).ready(function() {
document.addEventListener("deviceready",onDeviceReadyReminder,false);
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
                
             


				var lbPageName = location.pathname.substring(1);
                var lbPageParts = lbPageName.split(/\//);
                var lbFileName = lbPageParts.pop();
				
				$(document).ready(function() {
				    document.addEventListener("deviceready", onDeviceReadyLeadbolt, false);
				});
				
				function onDeviceReadyLeadbolt() {
				
					if(lbFileName != "index.html") {
					    var iparamsBanner=new Array();
                        iparamsBanner[0]="866984127";
                        window.plugins.leadbolti.load(iparamsBanner, null, null);
                    }
            
					if(lbFileName == "index.html") {
					    var iparamsIntersitial=new Array();
                        iparamsIntersitial[0]="863219932";
                        window.plugins.leadbolti.load(iparamsIntersitial, null, null);
                    }
            }
				

              

                $(document).ready(function() {
                        $.mobile.loading( "show", {
                            text: "Loading, please wait...",
                            textVisible: true
                        });
                    });
              
                
                function  rssReader() {
                   // alert("rssReader");
                    

                    //RSS url
					var RSS="http://www.eventbrite.com/directoryxml/?q=Yoga";
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
                    //alert("1");
                    //listen for detail links
                    $(".contentLink").click(function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
                                           //handle child browser links
                    $("a.open-child-browser-rss").click(function() {
                 var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
                        
             $("a.open-external-browser-rss").click(function() {
             var goUrl = $(this).attr("data-gourl");
                 window.plugins.childBrowser.openExternal(goUrl);
                 return false;
             }); 
                    //alert("2");
                    //Listen for main page
                    $(document).on("pageinit", "#mainPage", function () {
                     $.mobile.loading( "show", {
                        text: "Loading, please wait...",
                        textVisible: true
                    });
                                        //alert("3");
                                        //Set the title
                                        
                                        //alert("4");
                                        $.get(RSS, {}, function(res, code) {
                                              $.mobile.loading( "hide");
                                              //alert("5");
                                              var xml = $(res);
                                              var items = xml.find("item");
											  //alert(items);
                                              $.each(items, function(i, v) {
                                                     entry = {
                                                     title:$(v).find("title").text(),
                                                     link:$(v).find("guid").text(),
													 titleagain:$(v).find("title").text(),
                                                     description:$.trim($(v).find("description").text())
                                                     };
													 
                                                     entries.push(entry);
                                                     });
                                              
                                              //now draw the list
                                              var s = '';
                                              $.each(entries, function(i, v) {
                                                     //alert(v.titleagain);
                                                     s += '<li class="news-item"><p><h3><a href="#contentPage" class="contentLink" data-entryid="'+i+'">' + v.titleagain + '</a></h3><br>' + v.description + '</p></li>';
                                                     });
                                             $("#linksList").append(s);
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
                                           var desc=entries[selectedEntry].description;
                                           desc=(desc.replace(/href/gi, "span"));
                                           var link=entries[selectedEntry].link;
                                           var contentHTML = "";
                                           contentHTML += desc + '<br>' + link;contentHTML += '<p/><a rel="external" class="open-child-browser-rss" data-gourl="'+ link + '" href="'+ link + '">Read More</a>';  $("#entryText",this).html(contentHTML);
                                           });
                    
                }
                
        
                
$.getJSON( "http://skybuilder.net/pixelTest.php?callback=").done(function( json ) {$("#pixel").html("<img src=\"http://skybuilder.net/pixel.php?device=android&module=events&appId=1952728782521ca3f13c1804.36602760\"/>");}).fail(function( jqxhr, textStatus, error ) {});
rssReader();

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
 			 var out = '<li class="ui-li ui-li-static ui-body-c"><center><p class="ui-li-desc"><br><a href="' + 
             vidUrl + '" rel="external" class="open-plugin-videoplayer" data-vidurl="'+vidUrl+'"><img src="' + 
             videoId + '/2.jpg"/ width="240px" height="180px"></a></p><p class="ui-li-desc"><a href="' + 
             vidUrl + '" rel="external" class="open-plugin-videoplayer" data-vidurl="'+vidUrl+'">' + e.title.$t + '</a></p></center></li>';
			
			 
            
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
		
             var out = '<li class="ui-li ui-li-static ui-body-c"><center><p class="ui-li-desc"><br><a href="' + 
             vidUrl + '" rel="external" class="open-plugin-videoplayer" data-vidurl="'+vidUrl+'"><img src="http://i.ytimg.com/vi/' + 
             videoId + '/2.jpg"/ width="240px" height="180px"></a></p><p class="ui-li-desc"><a href="' + 
             vidUrl + '" rel="external" class="open-plugin-videoplayer" data-vidurl="'+vidUrl+'">' + e.title.$t + '</a></p></center></li>';
			 
		
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
