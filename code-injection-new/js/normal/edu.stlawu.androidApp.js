











		$(document).bind( "mobileinit", function() {
			$.mobile.allowCrossDomainPages = true;
			$.support.cors = true;
		});
		document.addEventListener("deviceready", sluDeviceReady, false);
		function sluDeviceReady(){
			$(document).ready(function(){
				console.log('READY');
				var sa = new sluapp();
			});
		}
	














$('#send-feedback').live("click", function() {
	var url = 'http://m.stlawu.edu/ss/send.php';
	var error = 0;
	var $contactpage = $(this).closest('.ui-page');
	var $contactform = $(this).closest('.contact-form');
	$('.required', $contactform).each(function (i) {
        if ($(this).val() === '') {
			error++;
        } 
	}); // each
	if (error > 0) {
			alert('Please fill in all the mandatory fields. Mandatory fields are marked with an asterisk *.');	
	} else {
		var firstname = $contactform.find('input[name="firstname"]').val();
		var surname = $contactform.find('input[name="surname"]').val();
		var city = $contactform.find('input[name="city"]').val();
		var state = $contactform.find('input[name="state"]').val();
		var postalcode = $contactform.find('input[name="postalcode"]').val();
		var country = $contactform.find('input[name="country"]').val();
		var email = $contactform.find('input[name="email"]').val();
		var hsgradyear = $contactform.find('input[name="hsgradyear"]').val();	
		var message = $contactform.find('textarea[name="message"]').val();	

		//submit the form
		$.ajax({
			type: "GET",
			url: url,
			data: {firstname:firstname, surname:surname, city:city, state:state, postalcode:postalcode, country:country, hsgradyear:hsgradyear, email:email, message:message},
            success: function (data) {
				if (data == 'success') {
					// show thank you 
					$contactpage.find('.contact-thankyou').show();
					$contactpage.find('.contact-form').hide();
				}  else {
					alert('Unable to send your message. Please try again.');
				}
			}
		}); //$.ajax

	}
	return false;
});


JQTWEETSAINTS = {
	
	// Set twitter hash/user, number of tweets & id/class to append tweets
	// You need to clear tweet-date.txt before toggle between hash and user
	//hash: '%23jquery', //leave this blank if you want to show user's tweet
	hash: '',
	user: 'slusaints',
	numTweets: 20,
	cacheExpiry: 1, //get the new cache in hours
	appendTo: '#twitterSLUSaints',
	
	// core function of jqtweet
	//https://dev.twitter.com/docs/using-search
	loadTweets: function() {
	
		var request;
		
		// different JSON request {hash|user}
		if (JQTWEETSAINTS.hash) {
			request = {
				q: JQTWEETSAINTS.hash,
				expiry: JQTWEETSAINTS.cacheExpiry,				
				api: 'http://search.twitter.com/search.json'
			}
		} else {
			request = {
                screen_name: JQTWEETSAINTS.user,
                include_rts: true,
                count: JQTWEETSAINTS.numTweets,
                include_entities: true,
   				expiry: JQTWEETSAINTS.cacheExpiry, 
                api: 'http://api.twitter.com/1/statuses/user_timeline.json/'
			}
		}

		$.ajax({
			url: 'http://m.stlawu.edu/ss/cache/tweets-slusaints-grab.php',
			type: 'GET',
			dataType: 'json',
			data: request,
			success: function(data, textStatus, xhr) {
				
				var text, name, html = '<div class="tweet"><div class="twitterText">TWEET_TEXT</div><table cellpadding="0" cellspacing="0" border="0" width="100%" class="twitterFooter"><tr><td valign="middle"><a class="twitterLink" href="TWEET_LINK" target="_blank"><span class="twitterLinkText">AGO by USER</span><img src="images/fblink.svg" width="6%" border="0" /></a></td></tr></table></div>';
		
				try {
		
					//Twitter Search API has different JSON Structure
					if (JQTWEETSAINTS.hash) data = data['results'];
		
					// append tweets into page
					for (var i = 0; i < data.length && i < JQTWEETSAINTS.numTweets; i++) {
						
						name = (JQTWEETSAINTS.hash) ? data[i].from_user : data[i].user.screen_name;
	
						$(JQTWEETSAINTS.appendTo).append(	
						    html.replace('TWEET_TEXT', JQTWEETSAINTS.ify.clean(data[i].text) )
						        .replace(/USER/g, name)
						        .replace('AGO', JQTWEETSAINTS.timeAgo(data[i].created_at) )
								.replace('TWEET_LINK','http://www.twitter.com/stlawrenceu/status/'+data[i].id_str)
						);
							
					}					
				
				} catch (e) {
					alert('No data returned, you might want to clear tweets-date.txt.');
				}			
			
			}	

		});

	}, 
	
		
	/**
      * relative time calculator FROM TWITTER
      * @param {string} twitter date string returned from Twitter API
      * @return {string} relative time like "2 minutes ago"
      */
    timeAgo: function(dateString) {
		var rightNow = new Date();
		var then = new Date(dateString);
		
		if ($.browser.msie) {
			// IE can't parse these crazy Ruby dates
			then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
		}

		var diff = rightNow - then;

		var second = 1000,
		minute = second * 60,
		hour = minute * 60,
		day = hour * 24,
		week = day * 7;

		if (isNaN(diff) || diff < 0) {
			return ""; // return blank string if unknown
		}

		if (diff < second * 2) {
			// within 2 seconds
			return "right now";
		}

		if (diff < minute) {
			return Math.floor(diff / second) + " seconds ago";
		}

		if (diff < minute * 2) {
			return "about 1 minute ago";
		}

		if (diff < hour) {
			return Math.floor(diff / minute) + " minutes ago";
		}

		if (diff < hour * 2) {
			return "about 1 hour ago";
		}

		if (diff < day) {
			return  Math.floor(diff / hour) + " hours ago";
		}

		if (diff > day && diff < day * 2) {
			return "yesterday";
		}

		if (diff < day * 365) {
			return Math.floor(diff / day) + " days ago";
		}

		else {
			return "over a year ago";
		}
	}, // timeAgo()
    
	
    /**
      * The Twitalinkahashifyer!
      * http://www.dustindiaz.com/basement/ify.html
      * Eg:
      * ify.clean('your tweet text');
      */
    ify:  {
      link: function(tweet) {
        return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
          var http = m2.match(/w/) ? 'http://' : '';
          return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
        });
      },

      at: function(tweet) {
        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
        });
      },

      list: function(tweet) {
        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
        });
      },

      hash: function(tweet) {
        return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
          return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
        });
      },

      clean: function(tweet) {
        return this.hash(this.at(this.list(this.link(tweet))));
      }
    } 

	
};

JQTWEETSLU = {
	
	// Set twitter hash/user, number of tweets & id/class to append tweets
	// You need to clear tweet-date.txt before toggle between hash and user
	//hash: '%23jquery', //leave this blank if you want to show user's tweet
	hash: '',
	user: 'stlawrenceu',
	numTweets: 20,
	cacheExpiry: 1, //get the new cache in hours
	appendTo: '#twitterStLawrenceU',
	
	// core function of jqtweet
	//https://dev.twitter.com/docs/using-search
	loadTweets: function() {
	
		var request;
		
		// different JSON request {hash|user}
		if (JQTWEETSLU.hash) {
			request = {
				q: JQTWEETSLU.hash,
				expiry: JQTWEETSLU.cacheExpiry,				
				api: 'http://search.twitter.com/search.json'
			}
		} else {
			request = {
                screen_name: JQTWEETSLU.user,
                include_rts: true,
                count: JQTWEETSLU.numTweets,
                include_entities: true,
   				expiry: JQTWEETSLU.cacheExpiry, 
                api: 'http://api.twitter.com/1/statuses/user_timeline.json/'
			}
		}

		$.ajax({
			url: 'http://m.stlawu.edu/ss/cache/tweets-stlawrenceu-grab.php',
			type: 'GET',
			dataType: 'json',
			data: request,
			success: function(data, textStatus, xhr) {
				
				var text, name, html = '<div class="tweet"><div class="twitterText">TWEET_TEXT</div><table cellpadding="0" cellspacing="0" border="0" width="100%" class="twitterFooter"><tr><td valign="middle"><a class="twitterLink" href="TWEET_LINK" target="_blank"><span class="twitterLinkText">AGO by USER</span><img src="images/fblink.svg" width="6%" border="0" /></a></td></tr></table></div>';
		
				try {
		
					//Twitter Search API has different JSON Structure
					if (JQTWEETSLU.hash) data = data['results'];
		
					// append tweets into page
					for (var i = 0; i < data.length && i < JQTWEETSLU.numTweets; i++) {
						
						name = (JQTWEETSLU.hash) ? data[i].from_user : data[i].user.screen_name;
	
						$(JQTWEETSLU.appendTo).append(	
						    html.replace('TWEET_TEXT', JQTWEETSLU.ify.clean(data[i].text) )
						        .replace(/USER/g, name)
						        .replace('AGO', JQTWEETSLU.timeAgo(data[i].created_at) )
								.replace('TWEET_LINK','http://www.twitter.com/stlawrenceu/status/'+data[i].id_str)
						);
							
					}					
				
				} catch (e) {
					alert('No data returned, you might want to clear tweets-date.txt.');
				}			
			
			}	

		});

	}, 
	
		
	/**
      * relative time calculator FROM TWITTER
      * @param {string} twitter date string returned from Twitter API
      * @return {string} relative time like "2 minutes ago"
      */
    timeAgo: function(dateString) {
		var rightNow = new Date();
		var then = new Date(dateString);
		
		if ($.browser.msie) {
			// IE can't parse these crazy Ruby dates
			then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
		}

		var diff = rightNow - then;

		var second = 1000,
		minute = second * 60,
		hour = minute * 60,
		day = hour * 24,
		week = day * 7;

		if (isNaN(diff) || diff < 0) {
			return ""; // return blank string if unknown
		}

		if (diff < second * 2) {
			// within 2 seconds
			return "right now";
		}

		if (diff < minute) {
			return Math.floor(diff / second) + " seconds ago";
		}

		if (diff < minute * 2) {
			return "about 1 minute ago";
		}

		if (diff < hour) {
			return Math.floor(diff / minute) + " minutes ago";
		}

		if (diff < hour * 2) {
			return "about 1 hour ago";
		}

		if (diff < day) {
			return  Math.floor(diff / hour) + " hours ago";
		}

		if (diff > day && diff < day * 2) {
			return "yesterday";
		}

		if (diff < day * 365) {
			return Math.floor(diff / day) + " days ago";
		}

		else {
			return "over a year ago";
		}
	}, // timeAgo()
    
	
    /**
      * The Twitalinkahashifyer!
      * http://www.dustindiaz.com/basement/ify.html
      * Eg:
      * ify.clean('your tweet text');
      */
    ify:  {
      link: function(tweet) {
        return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
          var http = m2.match(/w/) ? 'http://' : '';
          return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
        });
      },

      at: function(tweet) {
        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
        });
      },

      list: function(tweet) {
        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
        });
      },

      hash: function(tweet) {
        return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
          return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
        });
      },

      clean: function(tweet) {
        return this.hash(this.at(this.list(this.link(tweet))));
      }
    } 

	
};

$(document).ready(function() {

	$('#home_splash').delay(3000).fadeOut(800,redirectPage);
	function redirectPage() {
        window.location = 'home.php';
    }
						   
  
});

(function (jQuery) {
		
		var daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var shortMonthsInYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var longMonthsInYear = ["January", "February", "March", "April", "May", "June", 
														"July", "August", "September", "October", "November", "December"];
		var shortMonthsToNumber = [];
		shortMonthsToNumber["Jan"] = "01";
		shortMonthsToNumber["Feb"] = "02";
		shortMonthsToNumber["Mar"] = "03";
		shortMonthsToNumber["Apr"] = "04";
		shortMonthsToNumber["May"] = "05";
		shortMonthsToNumber["Jun"] = "06";
		shortMonthsToNumber["Jul"] = "07";
		shortMonthsToNumber["Aug"] = "08";
		shortMonthsToNumber["Sep"] = "09";
		shortMonthsToNumber["Oct"] = "10";
		shortMonthsToNumber["Nov"] = "11";
		shortMonthsToNumber["Dec"] = "12";
	
    jQuery.format = (function () {
        function strDay(value) {
 						return daysInWeek[parseInt(value, 10)] || value;
        }

        function strMonth(value) {
						var monthArrayIndex = parseInt(value, 10) - 1;
 						return shortMonthsInYear[monthArrayIndex] || value;
        }

        function strLongMonth(value) {
					var monthArrayIndex = parseInt(value, 10) - 1;
					return longMonthsInYear[monthArrayIndex] || value;					
        }

        var parseMonth = function (value) {
					return shortMonthsToNumber[value] || value;
        };

        var parseTime = function (value) {
                var retValue = value;
                var millis = "";
                if (retValue.indexOf(".") !== -1) {
                    var delimited = retValue.split('.');
                    retValue = delimited[0];
                    millis = delimited[1];
                }

                var values3 = retValue.split(":");

                if (values3.length === 3) {
                    hour = values3[0];
                    minute = values3[1];
                    second = values3[2];

                    return {
                        time: retValue,
                        hour: hour,
                        minute: minute,
                        second: second,
                        millis: millis
                    };
                } else {
                    return {
                        time: "",
                        hour: "",
                        minute: "",
                        second: "",
                        millis: ""
                    };
                }
            };

        return {
            date: function (value, format) {
                /* 
					value = new java.util.Date()
                 	2009-12-18 10:54:50.546 
				*/
                try {
                    var date = null;
                    var year = null;
                    var month = null;
                    var dayOfMonth = null;
                    var dayOfWeek = null;
                    var time = null;
										if (typeof value == "number"){
											return this.date(new Date(value), format);
										} else if (typeof value.getFullYear == "function") {
                        year = value.getFullYear();
                        month = value.getMonth() + 1;
                        dayOfMonth = value.getDate();
                        dayOfWeek = value.getDay();
                        time = parseTime(value.toTimeString());
										} else if (value.search(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d{0,3}[-+]?\d{2}:?\d{2}/) != -1) { /* 2009-04-19T16:11:05+02:00 */											
                        var values = value.split(/[T\+-]/);
                        year = values[0];
                        month = values[1];
                        dayOfMonth = values[2];
                        time = parseTime(values[3].split(".")[0]);
                        date = new Date(year, month - 1, dayOfMonth);
                        dayOfWeek = date.getDay();
                    } else {
                        var values = value.split(" ");
                        switch (values.length) {
                        case 6:
                            /* Wed Jan 13 10:43:41 CET 2010 */
                            year = values[5];
                            month = parseMonth(values[1]);
                            dayOfMonth = values[2];
                            time = parseTime(values[3]);
                            date = new Date(year, month - 1, dayOfMonth);
                            dayOfWeek = date.getDay();
                            break;
                        case 2:
                            /* 2009-12-18 10:54:50.546 */
                            var values2 = values[0].split("-");
                            year = values2[0];
                            month = values2[1];
                            dayOfMonth = values2[2];
                            time = parseTime(values[1]);
                            date = new Date(year, month - 1, dayOfMonth);
                            dayOfWeek = date.getDay();
                            break;
                        case 7:
                            /* Tue Mar 01 2011 12:01:42 GMT-0800 (PST) */
                        case 9:
                            /*added by Larry, for Fri Apr 08 2011 00:00:00 GMT+0800 (China Standard Time) */
                        case 10:
                            /* added by Larry, for Fri Apr 08 2011 00:00:00 GMT+0200 (W. Europe Daylight Time) */
                            year = values[3];
                            month = parseMonth(values[1]);
                            dayOfMonth = values[2];
                            time = parseTime(values[4]);
                            date = new Date(year, month - 1, dayOfMonth);
                            dayOfWeek = date.getDay();
                            break;
                        case 1:
                            /* added by Jonny, for 2012-02-07CET00:00:00 (Doctrine Entity -> Json Serializer) */
                            var values2 = values[0].split("");
                            year=values2[0]+values2[1]+values2[2]+values2[3];
                            month= values2[5]+values2[6];
                            dayOfMonth = values2[8]+values2[9];
                            time = parseTime(values2[13]+values2[14]+values2[15]+values2[16]+values2[17]+values2[18]+values2[19]+values2[20])
                            date = new Date(year, month - 1, dayOfMonth);
                            dayOfWeek = date.getDay();
                            break;
                        default:
                            return value;
                        }
                    }

                    var pattern = "";
                    var retValue = "";
                    var unparsedRest = "";
                    /*
						Issue 1 - variable scope issue in format.date 
                    	Thanks jakemonO
					*/
                    for (var i = 0; i < format.length; i++) {
                        var currentPattern = format.charAt(i);
                        pattern += currentPattern;
                        unparsedRest = "";
                        switch (pattern) {
                        case "ddd":
                            retValue += strDay(dayOfWeek);
                            pattern = "";
                            break;
                        case "dd":
                            if (format.charAt(i + 1) == "d") {
                                break;
                            }
                            if (String(dayOfMonth).length === 1) {
                                dayOfMonth = '0' + dayOfMonth;
                            }
                            retValue += dayOfMonth;
                            pattern = "";
                            break;
                        case "d":
                            if (format.charAt(i + 1) == "d") {
                                break;
                            }
                            retValue += parseInt(dayOfMonth, 10);
                            pattern = "";
                            break;
                        case "MMMM":
                            retValue += strLongMonth(month);
                            pattern = "";
                            break;
                        case "MMM":
                            if (format.charAt(i + 1) === "M") {
                                break;
                            }
                            retValue += strMonth(month);
                            pattern = "";
                            break;
                        case "MM":
                            if (format.charAt(i + 1) == "M") {
                                break;
                            }
                            if (String(month).length === 1) {
                                month = '0' + month;
                            }
                            retValue += month;
                            pattern = "";
                            break;
                        case "M":
                            if (format.charAt(i + 1) == "M") {
                                break;
                            }
                            retValue += parseInt(month, 10);
                            pattern = "";
                            break;
                        case "yyyy":
                            retValue += year;
                            pattern = "";
                            break;
                        case "yy":
                            if (format.charAt(i + 1) == "y" &&
                           	format.charAt(i + 2) == "y") {
                            	break;
                      	    }
                            retValue += String(year).slice(-2);
                            pattern = "";
                            break;
                        case "HH":
                            retValue += time.hour;
                            pattern = "";
                            break;
                        case "hh":
                            /* time.hour is "00" as string == is used instead of === */
                            var hour = (time.hour == 0 ? 12 : time.hour < 13 ? time.hour : time.hour - 12);
                            hour = String(hour).length == 1 ? '0' + hour : hour;
                            retValue += hour;
                            pattern = "";
                            break;
												case "h":
												    if (format.charAt(i + 1) == "h") {
												        break;
												    }
												    var hour = (time.hour == 0 ? 12 : time.hour < 13 ? time.hour : time.hour - 12);                           
												    retValue += parseInt(hour, 10);
														// Fixing issue https://github.com/phstc/jquery-dateFormat/issues/21
														// retValue = parseInt(retValue, 10);
												    pattern = "";
												    break;
                        case "mm":
                            retValue += time.minute;
                            pattern = "";
                            break;
                        case "ss":
                            /* ensure only seconds are added to the return string */
                            retValue += time.second.substring(0, 2);
                            pattern = "";
                            break;
                        case "SSS":
                            retValue += time.millis.substring(0, 3);
                            pattern = "";
                            break;
                        case "a":
                            retValue += time.hour >= 12 ? "PM" : "AM";
                            pattern = "";
                            break;
                        case " ":
                            retValue += currentPattern;
                            pattern = "";
                            break;
                        case "/":
                            retValue += currentPattern;
                            pattern = "";
                            break;
                        case ":":
                            retValue += currentPattern;
                            pattern = "";
                            break;
                        default:
                            if (pattern.length === 2 && pattern.indexOf("y") !== 0 && pattern != "SS") {
                                retValue += pattern.substring(0, 1);
                                pattern = pattern.substring(1, 2);
                            } else if ((pattern.length === 3 && pattern.indexOf("yyy") === -1)) {
                                pattern = "";
                            } else {
                            	unparsedRest = pattern;
                            }
                        }
                    }
                    retValue += unparsedRest;
                    return retValue;
                } catch (e) {
                    console.log(e);
                    return value;
                }
            }
        };
    }());
}(jQuery));

jQuery.format.date.defaultShortDateFormat = "dd/MM/yyyy";
jQuery.format.date.defaultLongDateFormat = "dd/MM/yyyy hh:mm:ss";

jQuery(document).ready(function () {
    jQuery(".shortDateFormat").each(function (idx, elem) {
        if (jQuery(elem).is(":input")) {
            jQuery(elem).val(jQuery.format.date(jQuery(elem).val(), jQuery.format.date.defaultShortDateFormat));
        } else {
            jQuery(elem).text(jQuery.format.date(jQuery(elem).text(), jQuery.format.date.defaultShortDateFormat));
        }
    });
    jQuery(".longDateFormat").each(function (idx, elem) {
        if (jQuery(elem).is(":input")) {
            jQuery(elem).val(jQuery.format.date(jQuery(elem).val(), jQuery.format.date.defaultLongDateFormat));
        } else {
            jQuery(elem).text(jQuery.format.date(jQuery(elem).text(), jQuery.format.date.defaultLongDateFormat));
        }
    });
});

var footerHTML = '<div data-role="navbar" class="ui-navbar ui-mini" role="navigation"><ul class="ui-grid-c"><li class="ui-block-a"><a href="#home" data-role="button" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="span" data-theme="a" class="ui-btn ui-btn-inline ui-btn-up-a" data-inline="true"><span class="ui-btn-inner"><span class="ui-btn-text"><img src="images/icon_home.svg" border="0"></span></span></a></li><li class="ui-block-b"><a href="#contact" data-role="button" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="span" data-theme="a" class="ui-btn ui-btn-inline ui-btn-up-a" data-inline="true"><span class="ui-btn-inner"><span class="ui-btn-text"><img src="images/icon_contact.svg" border="0"></span></span></a></li><li class="ui-block-c"><a href="#dynamicPage" onClick="loadYouTube('+"'http://m.stlawu.edu/ss/youtube.php?type=youtube-slu'"+')" data-role="button" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="span" data-theme="a" class="ui-btn ui-btn-up-a ui-btn-inline" data-inline="true"><span class="ui-btn-inner"><span class="ui-btn-text"><img src="images/icon_video.svg" border="0"></span></span></a></li><li class="ui-block-d"><a href="#photosPage" data-role="button" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="span" data-theme="a" class="ui-btn ui-btn-up-a ui-btn-inline" data-inline="true"><span class="ui-btn-inner"><span class="ui-btn-text"><img src="images/icon_photos.svg" border="0"></span></span></a></li></ul></div>';

function sluapp(){
	
console.log('SLUAPP');
	
$('.appFooter').html(footerHTML);

$('#counselorState').change(function() {
  console.log('STATE: ' + $('#counselorState').val());
  var selectedState = $('#counselorState').val();
  if(selectedState=='NY'){
	  $('#activeCounselor').html('');
	  $('#counselorNYCountyField').css('display','block');
  }else{
	  $('#counselorNYCountyField').css('display','none');
	  if(selectedState!=''){
		  getCounselor('State',selectedState);
	  }
  }
});

$('#counselorNYCounty').change(function() {
	console.log('COUNTY: ' + $('#counselorNYCounty').val());
	var selectedCounty = $('#counselorNYCounty').val();
	if(selectedCounty!=''){
		getCounselor('County',selectedCounty);
	}
});

var activeCounselorArea = '';
var activeCounselorType = 'State';

function getCounselor(counselorType,counselorArea){
	console.log('GET COUNSELOR: ' + counselorType + ' : ' + counselorArea);
	activeCounselorArea = counselorArea;
	activeCounselorType = counselorType;
	$.ajax({
		type: "GET",
		url: "counselors/counselors.xml",
		dataType: "xml",
		success: parseCounselors
	  });
	//$('#activeCounselor').load('counselors/labarge.html')	
}

function parseCounselors(data){
	console.log('PARSE COUNSELORS');
	if(activeCounselorType=='State'){
		console.log('PARSE STATE');
		$(data).find("state").each(function(){
			var stateName = $(this).find("name").text();
			if(activeCounselorArea==stateName){
				console.log('STATE NAME: ' + stateName);
				var thisCounselor = $(this).find("counselor").text();
				$('#activeCounselor').load('counselors/'+thisCounselor+'.html');
			}
		});
	} else {
		console.log('PARSE COUNTY');
		$(data).find("county").each(function(){
			var countyName = $(this).find("name").text();
			if(activeCounselorArea==countyName){
				console.log('COUNTY NAME: ' + countyName);
				var thisCounselor = $(this).find("counselor").text();
				$('#activeCounselor').load('counselors/'+thisCounselor+'.html');
			}
		});	
	}
}
console.log('PRE FACEBOOK');
$('#facebookPageStLawrenceU .fbContent').load('http://m.stlawu.edu/ss/facebook_stlawrenceu.php');
$('#facebookPageSaintsAthletics .fbContent').load('http://m.stlawu.edu/ss/facebook_saintsathletics.php');

JQTWEETSLU.loadTweets();
JQTWEETSAINTS.loadTweets();



/*var myOptions = {
	zoom: 17,
	center: latlng,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map($('#campusMapPage'),myOptions);
*/

$('#campusMap').live("pageinit", function() {
	$('#campusMapPage').gmap({'zoom':16,'center':'44.588863,-75.16217',mapTypeId: google.maps.MapTypeId.ROADMAP});
});

$('#page_id').live("pageshow", function() {
	$('#campusMapPage').gmap('refresh');
});


//$('#home_splash').delay(4000).fadeOut(800);

//END
}


//ADDITIONAL FUNCTIONS/////////////
function loadPhotoViewer(photoURL){
	$('#photoViewerContent').html('');
	$('#photoViewerContent').html('<img src="'+photoURL+'" />');
}


function loadWeather(feedPageURL){
	$('#dynamicPage').html('');
	$('#dynamicPage').load(feedPageURL, function() {
		console.log('LOADED YOUTUBE PAGE');
		$('#weatherPage').page();
		$('#dynamicPage').html($('#weatherPage').html());
		$('#dynamicPage .appFooter').html(footerHTML);
	});
}
function loadYouTube(feedPageURL){
	$('#dynamicPage').html('');
	$('#dynamicPage').load(feedPageURL, function() {
		console.log('LOADED YOUTUBE PAGE');
		$('#youtubePage').page();
		$('#dynamicPage').html($('#youtubePage').html());
		$('#dynamicPage .appFooter').html(footerHTML);
	});
}

function loadSportsFeed(feedPageURL){
	$('#dynamicPage').html('');
	$('#dynamicPage').load(feedPageURL, function() {
		console.log('LOADED SPORTS FEED PAGE');
		$('#sportsFeedPage').page();
		$('#dynamicPage').html($('#sportsFeedPage').html());
		$('#dynamicPage .appFooter').html(footerHTML);
		//$('.ui-page-active').removeClass('ui-page-active');
		//$('#sportsFeedPage').addClass('ui-page-active');
		//changeHeader(feedPageHeader);
	});
	//$('#dynamicPage').replaceWith($('#dynamicPage').contents());	
}

function loadFeed(feedPageURL,feedPageHeader){
	$('#feedPage h1.appHeader').html('LOADING...');
	$('#feedPage .feedPageContent').html('');
	$('#feedPage .feedPageContent').load(feedPageURL, function() {
  		$('#feedPage .feedPageContent ul').listview();
		changeHeader(feedPageHeader);
	});
	
}

function loadArticle(articleType,articleLinkURL,articlePageHeader){
	var articlePageURL = 'http://m.stlawu.edu/ss/article.php?type='+articleType+'&origLink='+articleLinkURL;
	console.log('LOAD ARTICLE: ' + articlePageURL);
	$('#articlePage .articlePageContent').html('');
	$('#articlePage h1.appHeader').html('LOADING...');
	$('#articlePage .articlePageContent').load(articlePageURL, function() {
  		changeHeader(articleType);
	});
}

function changeHeader(newHeaderText){
	console.log('CHANGE HEADER: ' + newHeaderText);
	$('.ui-page-active h1.appHeader').html(newHeaderText);
}

function loadCounselor(counselorPage,counselorName) {
	console.log('LOAD COUNSELOR: ' + counselorPage);
	$('#selectedCounselor').load('counselors/'+counselorPage+'.html');
	$('#chosenCounselor h1.appHeader').html(counselorName);
}

function parseFacebook(fbData, fbContainer){
	var totalPosts = fbData.length;
	console.log('TOTAL FACEBOOK POSTS: ' + totalPosts);
	var fD = 0;
	for(fD=0;fD<totalPosts;fD++){
		var fbType = fbData[fD].type;
		var fbTime = $.format.date(fbData[fD].updated_time, "MM/dd/yyyy hh:mm a");
		var fbHTML = '';
		switch (fbType){
			case 'photo':
		  		fbHTML = '<div class="fbPhotoPost"><a href="'+fbData[fD].link+'" target="_blank"><table cellpadding="0" cellspacing="0" border="0" width="100%" class="fbHeader"><tr><td valign="middle"><div class="fbTime">'+fbTime+'</div></td><td width="6%" valign="middle"><div class="fbLike"><img src="images/fblike.svg" width="100%" border="0" /></div></td></tr></table><div class="fbPhoto"><img src="'+fbData[fD].picture+'" border="0" width="100%" /></div><div class="fbMessage">'+fbData[fD].message+'</div></a></div>';
				fbContainer.append(fbHTML);
		  		break;
			case 'link':
		  		fbHTML = '<div class="fbLinkPost"><a href="'+fbData[fD].link+'" target="_blank"><table cellpadding="0" cellspacing="0" border="0" width="100%" class="fbHeader"><tr><td valign="middle"><div class="fbTime">'+fbTime+'</div></td><td width="6%" valign="middle"><div class="fbLike"><img src="images/fblink.svg" width="100%" border="0" /></div></td></tr></table><div class="fbMessage">'+fbData[fD].message+'</div></a></div>';
				fbContainer.append(fbHTML);
		  		break;
			case 'status':
		  		fbHTML = '<div class="fbStatusPost"><a href="http://www.facebook.com/'+fbData[fD].id+'" target="_blank"><table cellpadding="0" cellspacing="0" border="0" width="100%" class="fbHeader"><tr><td valign="middle"><div class="fbTime">'+fbTime+'</div></td><td width="6%" valign="middle"><div class="fbLike"><img src="images/fblike.svg" width="100%" border="0" /></div></td></tr></table><div class="fbMessage">'+fbData[fD].message+'</div></a></div>';
				fbContainer.append(fbHTML);
		  		break;
		}
	}
}

//UTILITY FUNCTIONS////////////////
function RealTypeOf(v) {
  if (typeof(v) == "object") {
    if (v === null) return "null";
    if (v.constructor == (new Array).constructor) return "array";
    if (v.constructor == (new Date).constructor) return "date";
    if (v.constructor == (new RegExp).constructor) return "regex";
    return "object";
  }
  return typeof(v);
}

function FormatJSON(oData, sIndent) {
    if (arguments.length < 2) {
        var sIndent = "";
    }
    var sIndentStyle = "    ";
    var sDataType = RealTypeOf(oData);

    // open object
    if (sDataType == "array") {
        if (oData.length == 0) {
            return "[]";
        }
        var sHTML = "[";
    } else {
        var iCount = 0;
        $.each(oData, function() {
            iCount++;
            return;
        });
        if (iCount == 0) { // object is empty
            return "{}";
        }
        var sHTML = "{";
    }

    // loop through items
    var iCount = 0;
    $.each(oData, function(sKey, vValue) {
        if (iCount > 0) {
            sHTML += ",";
        }
        if (sDataType == "array") {
            sHTML += ("\n" + sIndent + sIndentStyle);
        } else {
            sHTML += ("\n" + sIndent + sIndentStyle + "\"" + sKey + "\"" + ": ");
        }

        // display relevant data type
        switch (RealTypeOf(vValue)) {
            case "array":
            case "object":
                sHTML += FormatJSON(vValue, (sIndent + sIndentStyle));
                break;
            case "boolean":
            case "number":
                sHTML += vValue.toString();
                break;
            case "null":
                sHTML += "null";
                break;
            case "string":
                sHTML += ("\"" + vValue + "\"");
                break;
            default:
                sHTML += ("TYPEOF: " + typeof(vValue));
        }

        // loop
        iCount++;
    });

    // close object
    if (sDataType == "array") {
        sHTML += ("\n" + sIndent + "]");
    } else {
        sHTML += ("\n" + sIndent + "}");
    }

    // return
    return sHTML;
}
