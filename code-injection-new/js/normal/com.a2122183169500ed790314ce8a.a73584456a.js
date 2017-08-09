
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
                




var __mainDiv;
 var __preLoaderHTML;
 var __opts;

 function __jQueryYouTubeChannelReceiveData(data,deviceType) {

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






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
                       // console.log("CB READY");
            $("a.open-child-browser").click(function() {
                        //console.log("SPAWN CHILD BROWSER");
                 var goUrl = $(this).attr("data-gourl");
	                //console.log($(this).attr("data-gourl"));
	                //console.log(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
         }
     



var deviceInfo = function() {
//alert("deviceready");

	var pushNotification = window.plugins.pushNotification;
	pushNotification.registerDevice({ email: "skybuilderpush@gmail.com", appid : "500ee00a528989.62483107" },
									function(status) {
										//console.warn('registerDevice:%o', status);
										//navigator.notification.alert(JSON.stringify(['registerDevice', status]));
									},
									function(status) {
								//	alert("3");
									//console.warn('failed to register :%o', status);
									//navigator.notification.alert(JSON.stringify(['failed to register ', status]));
									});
								
	document.addEventListener('push-notification', function(event) {
								//console.warn('push-notification!: ' + event.notification);
								//navigator.notification.alert(JSON.stringify(['push-notification!', event.notification]));
							  });
									
};

function onBodyLoad()
	{
//alert("bodyload");
	
    document.addEventListener("deviceready", deviceInfo, false);
}


function javascriptFunc() {
	alert("hello");
}

function showAlert(msg) {
	alert(msg);
}

function onPushReceive(msg) {
	alert(msg);
}

function onRegister(msg) {
	alert(msg);
}

function onUnregister(msg) {
	alert(msg);
}

function onRegisterError(msg) {
	alert(msg);
}

function onUnregisterError(msg) {
	alert(msg);
}
    		
    

	if (screen.height<500){
	var pad=75;
	}
	else{
	var pad=95;
	}
pad=pad + "%";
 document.getElementById('clickToButtons').style.paddingTop = pad;




                
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
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
                       // console.log("CB READY");
            $("a.open-child-browser").click(function() {
                        //console.log("SPAWN CHILD BROWSER");
                 var goUrl = $(this).attr("data-gourl");
	                //console.log($(this).attr("data-gourl"));
	                //console.log(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
         }
     

function onBodyLoad() { 
    if( navigator.userAgent.match(/Android/i) ) {
             onDeviceReady();
    } else if (typeof navigator.device == "undefined"){
            document.addEventListener("deviceready", onDeviceReady, false);
    } else {
             onDeviceReady();
    } 
}

function onDeviceReady() {
//alert("deviceready");
navigator.geolocation.getCurrentPosition(rssReader);
}

function rssReader(position){

var latitude=position.coords.latitude;
var longitude=position.coords.longitude;
                    
                    //EDIT THESE LINES

                    //RSS url
                    var RSS = "http://www.eventbrite.com/directoryxml/?lat=" + latitude + "&lng=" + longitude;
                    //alert(RSS);
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
                  //  $("#mainPage").live("pageinit", function() {
                                        //alert("3");
                                        //Set the title
                                        
                                        //alert("4");
                                        $.get(RSS, {}, function(res, code) {
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
                                              $.each(entries, function(i, v) {
                                                     //alert('entry');
                                                     s += '<li><p><h3><a href="#contentPage" class="contentLink" data-entryid="'+i+'">' + v.title + '</a></h3><br>' + v.description + '</p></li>';
                                                     });
                                              $("#linksList").append(s);
                                              $("#linksList").listview("refresh");
                                              });
                                        
                                 //       });
                    
                    //Listen for the content page to load
                    $("#contentPage").live("pageshow", function(prepage) {
                                           //Set the title
                                           $("h1", this).text(entries[selectedEntry].title);
                                           var desc=entries[selectedEntry].description;
                                           desc=(desc.replace(/href/gi, "span"));
                                           var link=entries[selectedEntry].link;
                                           var contentHTML = "";
                                           contentHTML += desc;contentHTML += '<p/><a rel="external" href="'+ link + '">Read Entry on Site</a>';  $("#entryText",this).html(contentHTML);
                                           });
                    
                }
                
                
                
                
onBodyLoad();

var __mainDiv;
 var __preLoaderHTML;
 var __opts;

 function __jQueryYouTubeChannelReceiveData(data,deviceType) {

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






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
                       // console.log("CB READY");
            $("a.open-child-browser").click(function() {
                        //console.log("SPAWN CHILD BROWSER");
                 var goUrl = $(this).attr("data-gourl");
	                //console.log($(this).attr("data-gourl"));
	                //console.log(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
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
                              mailtoString = mailtoString.replace("__MESSAGE_BODY__",realMessageBody);
                              window.location = mailtoString;
                        
                              return true;
                          });
                      });
                  






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
                       // console.log("CB READY");
            $("a.open-child-browser").click(function() {
                        //console.log("SPAWN CHILD BROWSER");
                 var goUrl = $(this).attr("data-gourl");
	                //console.log($(this).attr("data-gourl"));
	                //console.log(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
         }
     






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
                       // console.log("CB READY");
            $("a.open-child-browser").click(function() {
                        //console.log("SPAWN CHILD BROWSER");
                 var goUrl = $(this).attr("data-gourl");
	                //console.log($(this).attr("data-gourl"));
	                //console.log(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
         }
     
   
                function  rssReader() {
                   // alert("rssReader");
                    
                    //EDIT THESE LINES
                    //Title of the blog
                   //RSS url
                    var RSS = "http://api.flickr.com/services/feeds/photos_public.gne?tags=democrat&format=rss2";
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
                                                     s += '<li style="white-space:normal"><center><h2 style="white-space:normal">' + cleanTitle + '</h2></center><p style="white-space:normal"><img src="' + imageSource + '"></p></li>';
                                                     });
                                              $("#linksList").append(s);
                                              $("#linksList").listview("refresh");
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
                                           contentHTML += desc;contentHTML += '<p/><a rel="external" href="'+ link + '">Read Entry on Site</a>';$("#entryText",this).html(contentHTML);
                                           });
                    
                }
                
                

                
rssReader();






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
                       // console.log("CB READY");
            $("a.open-child-browser").click(function() {
                        //console.log("SPAWN CHILD BROWSER");
                 var goUrl = $(this).attr("data-gourl");
	                //console.log($(this).attr("data-gourl"));
	                //console.log(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
         }
     

              
                function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}
                
                function  rssReader() {
				$.mobile.showPageLoadingMsg();
                   // alert("rssReader");
                    

                    //RSS url
                    var RSS = "http://news.google.com/news?q=Obama&output=rss";

			//		alert(RSS);
                    //Stores entries
                    var entries = [];
                    var selectedEntry = "";
                //    alert("1");
                    //listen for detail links
                    $(".contentLink").live("click", function() {
                                           selectedEntry = $(this).data("entryid");
                                           });
                 //   alert("2");
                 //Listen for main page
                    $("#mainPage").live("pageinit", function() {
                                        //alert("3");
                                        //Set the title
                                        
                               //         alert("4");
                                        $.get(RSS, {}, function(res, code) {
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
          articleImage = '<p style="white-space:normal;word-wrap: break-word;"><img src="http:' + imgSrc + '></p>';
            } else {
                articleImage = '';
            }articleLink=v.link;
				 s += '<li style="white-space:normal;word-wrap: break-word;">' + articleImage + '<h2 style="white-space:normal;word-wrap: break-word;">' + articleTitle + '</h2><p style="white-space:normal;word-wrap: break-word;">' + articleSource + ' - ' + articleBody + '</p><p><a rel="external" href="' + articleLink + '">Read Entry On Site</a></p></li>';});
                                              $("#linksList").append(s);
                                              $("#linksList").listview("refresh");
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
                                           contentHTML += desc;contentHTML += '<p/><a rel="external" href="'+ link + '">Read Entry on Site</a>';$("#entryText",this).html(contentHTML);
                                           });
                    
                }
                
                $.mobile.hidePageLoadingMsg();

                
rssReader();






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
                       // console.log("CB READY");
            $("a.open-child-browser").click(function() {
                        //console.log("SPAWN CHILD BROWSER");
                 var goUrl = $(this).attr("data-gourl");
	                //console.log($(this).attr("data-gourl"));
	                //console.log(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
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
                    var RSS = "http://www.democratunity.com/?format=feed";

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
							   s += '<li data-icon="false"><h3 style="white-space:normal">' + v.title + '</h3><p style="white-space:normal">' + imageSource + cleanDesc + '</p><p><a rel="external" href="'+ v.link + '">Read Entry on Site</a></p></li>';});
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
                                           contentHTML += desc;contentHTML += '<p/><a rel="external" href="'+ link + '">Read Entry on Site</a>';$("#entryText",this).html(contentHTML);
                                           });
                    
                }
                
                

                
rssReader();






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
                       // console.log("CB READY");
            $("a.open-child-browser").click(function() {
                        //console.log("SPAWN CHILD BROWSER");
                 var goUrl = $(this).attr("data-gourl");
	                //console.log($(this).attr("data-gourl"));
	                //console.log(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
         }
     

              


              
                
                function  rssReader() {
                   // alert("rssReader");
                    

                    //RSS url
					var RSS="http://www.eventbrite.com/directoryxml/?q=political";
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
                                                     s += '<li><p><h3><a href="#contentPage" class="contentLink" data-entryid="'+i+'">' + v.title + '</a></h3><br>' + v.description + '</p></li>';
                                                     });
                                              $("#linksList").append(s);
                                              $("#linksList").listview("refresh");
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
                                           contentHTML += desc + link;contentHTML += '<p/><a rel="external" href="'+ link + '">Read Entry on Site</a>';  $("#entryText",this).html(contentHTML);
                                           });
                    
                }
                
                
                
                
rssReader();






	                        
         $(document).ready(function() {
             document.addEventListener("deviceready",onDeviceReadyChildBrowser,false);
         });
    
         function onDeviceReadyChildBrowser() {
                       // console.log("CB READY");
            $("a.open-child-browser").click(function() {
                        //console.log("SPAWN CHILD BROWSER");
                 var goUrl = $(this).attr("data-gourl");
	                //console.log($(this).attr("data-gourl"));
	                //console.log(goUrl);
                 window.plugins.childBrowser.showWebPage(goUrl, { showLocationBar: true });
                 return false;
             });
         }
     

function initialize(){

	  var location=geoip_city();;
	  rssReader(location);
	  }


              
                
                function  rssReader(location) {
                   // alert("rssReader");
                    
                    //EDIT THESE LINES
                    //Title of the blog
                    var TITLE = "Local News";
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
				 s += '<li style="white-space:normal;word-wrap: break-word;">' + articleImage + '<h2 style="white-space:normal;word-wrap: break-word;">' + articleTitle + '</h2><p style="white-space:normal;word-wrap: break-word;">' + articleSource + ' - ' + articleBody + '</p><p><a rel="external" href="' + articleLink + '">Read Entry On Site</a></p></li>';});
                                              $("#linksList").append(s);
                                              $("#linksList").listview("refresh");
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
                                           contentHTML += desc;contentHTML += '<p/><a rel="external" href="'+ link + '">Read Entry on Site</a>';$("#entryText",this).html(contentHTML);
                                           });
                    
                }
                
                

                
initialize();
