






            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        




        //Note, this must be before the jquery mobile load
        $(document).bind("mobileinit", function () {
            $.mobile.defaultPageTransition = 'none';
        });
    



    <!-- Sweet toast code from https://gist.github.com/Flatlineato/1341377-->
;(function( $, window, undefined ) {
    $.extend($.mobile, {
        showToast: function(message,delay,callback) {
            $.mobile.showPageLoadingMsg("e",message);
            if(delay && delay >0)
            {
                setTimeout(function(){
                    $.mobile.hidePageLoadingMsg();
                    if(callback) callback();
                },delay);
            }

        }
    });
})( jQuery, this );



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
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});



//Small debug timer
clock = function() {
    var times={};
    this.start=function(item) {
        times[item]=new Date().getTime();
    }
    this.stop=function(item) {
        if (times[item] !== undefined) {
            if (console && console.debug) {
                console.log("clock: "+item+"-"+(new Date().getTime()-times[item])+"ms");
            }
        }
    }
    return this;
}();



/**
 * Parse the AJAX Event data and loads it into global maps of
 * eventsByVenue, eventsById, eventsByGenre, eventsByDay and the same by PF
 * @param data
 * @param status
 */
function parseAjaxData(data, status){
    function addToList(map,value,key) {
        var entryKey = escape(value[key]);
        if (map[entryKey] == undefined) {
            map[entryKey]=[];
        }
        map[entryKey].push(value);
    }

    clock.stop("gettingAjax");
    clock.start("addingToLists");
	$.each(data, function(i,item){
        //Safari sorting issue. Needed to turn time_performance to seconds
        var hms = item.Time_Performance;   // your input string
        var a = hms.split(':'); // split it at the colons

        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
        //item.longPerformanceTime=new Date(item.Date_Performance +" "+ item.Time_Performance).getTime();

        var ydm = item.Date_Performance;
        
        var b = ydm.split('-');

        var fixoldformat =  (+b[1]) + '/' + (+b[2]) + '/' + (+b[0]); 

        item.longPerformanceTime=new Date(fixoldformat).getTime() + seconds;
        item.prettyPerformanceDates = fixoldformat.split("/2013")[0];

        // item.longPerformanceTime=new Date(item.Date_Performance).getTime() + seconds;
        // item.prettyPerformanceDates = item.Date_Performance.split("2013-0")[1].replace("-","/");

        addToList(eventsById,item,"Performance_ID");

        if (item.Genre == "Exhibition")
        {
            addToList(eventsByExhibit,item,"Name")
        } else {
        
                addToList(eventsByVenue,item,"SPACE_NAME");
                addToList(eventsByGenre,item,"Genre");
                addToList(eventsByName,item,"Name");
        
                if (item.Flag_ArtsFirstPF == "Yes"){
                    addToList(pfEventsByVenue,item,"SPACE_NAME");
                    addToList(pfEventsByGenre,item,"Genre");
                    addToList(pfEventsByTime,item,"FTime");
                    
                } else {
                    
                    addToList(eventsByDay,item,"Date_Performance");
                }
            }
	});
    clock.stop("addingToLists");
	
	//console.warn(eventsByVenue);
	var pageLoadTime = new Date().getTime() - pageStartTime;
	console.log("page load in " + pageLoadTime+ "ms");

} //end success

/**
 * Loads the allEventsPage
 */
function loadAllEvents(){
    clock.start("loadingAllEventsPage")
	$.mobile.changePage("#allEventsPage");
	if ( $("#venueList").find("li").size() != 0){
	    clock.stop("loadingAllEventsPage");
        return;
	} else {

    var venueUL=$('#venueList');
    var venueKeys = Object.keys(eventsByVenue).sort();
    $.each(venueKeys,function(index,key) {
        var prettyKey=unescape(key);
        var title = escape("Events at "+prettyKey);
        venueUL.append('<li data-theme="d" class="ui-icon-alt"><a href="#" onClick=loadEventList("'+title+'",eventsByVenue["'+key+'"])>'+prettyKey+'</a></li>');
    });
    venueUL.listview("refresh");

    var genreUL=$('#genreList');
    var genreKeys = Object.keys(eventsByGenre).sort();
    $.each(genreKeys,function(index,key) {
        var prettyKey=unescape(key);
        var title = escape("Events with "+prettyKey);
        genreUL.append('<li data-theme="d" class="ui-icon-alt"><a href="#" onClick=loadEventList("'+title+'",eventsByGenre["'+key+'"])>'+prettyKey+'</a></li>');
    });
    genreUL.listview("refresh");

    // console.log(eventsByExhibit);
    // loadExhibitEvents(eventsByExhibit["'Exhibition'"]);
    var exhibitUL=$('#exhibitList');
    var exhibitKeys = Object.keys(eventsByExhibit).sort();
    
    $.each(exhibitKeys,function(index,key) {
        //console.log("these is the index," + eventsByExhibit[key].Performance_ID);
        var prettyKey=unescape(key);
        var title = escape("Events with "+prettyKey);
        exhibitUL.append('<li data-theme="d" class="ui-icon-alt"><a href="#" onClick=loadEventList("'+title+'",eventsByExhibit["'+key+'"])>'+prettyKey+'</a></li>');
        
    });
    exhibitUL.listview("refresh");

    var nameUL=$('#nameList');
    var nameKeys = Object.keys(eventsByName).sort();
    $.each(nameKeys,function(index,key) {
        var prettyKey=unescape(key);
        var title = escape("Events with "+prettyKey);
        nameUL.append('<li data-theme="d" class="ui-icon-alt"><a href="#" onClick=loadEventList("'+title+'",eventsByName["'+key+'"])>'+prettyKey+'</a></li>');
    });
    nameUL.listview("refresh");

        //Load the Day
	var dayList = $("#dayList");
	 
	$.each(eventsByDay,function(key,arrayOfEvents) {
		//console.log(arrayOfEvents[0].EVENT_ID);
		if (key == "2013-04-25") 
			{
			dayList.find("#ThursdayEvents").attr("onClick","loadEventList('"+$("#ThursdayEvents").text()+"',eventsByDay['"+key+"'])");
			} 
		if (key == "2013-04-26")
			{
			dayList.find("#FridayEvents").attr("onClick","loadEventList('"+$("#FridayEvents").text()+"',eventsByDay['"+key+"'])");
			}
		if (key == "2013-04-27")
			{
			dayList.find("#SaturdayEvents").attr("onClick","loadEventList('"+$("#SaturdayEvents").text()+"',eventsByDay['"+key+"'])");
			}
		if (key == "2013-04-28")
			{
			dayList.find("#SundayEvents").attr("onClick","loadEventList('"+$("#SundayEvents").text()+"',eventsByDay['"+key+"'])");
			}
	});
	    dayList.listview("refresh");
	}
	clock.stop("loadingAllEventsPage");
}

function loadPfEvents(){
    clock.start("pfEventsLoad");
    $.mobile.changePage("#pfEventsPage");

    if ( $("#pfVenueList").find("li").size() != 0){
        clock.stop("pfEventsLoad");
        return;
    }

    var venueUL=$('#pfVenueList');
    var venueKeys = Object.keys(pfEventsByVenue).sort();
    $.each(venueKeys,function(index,key) {
        var prettyKey=unescape(key);
        var title = escape("Events at "+prettyKey);
        venueUL.append('<li data-theme="d" class="ui-icon-alt"><a href="#" onClick=loadEventList("'+title+'",pfEventsByVenue["'+key+'"])>'+prettyKey+'</a></li>');
    });
    venueUL.listview("refresh");

    var genreUL=$('#pfGenreList');
    var genreKeys = Object.keys(pfEventsByGenre).sort();
    $.each(genreKeys,function(index,key) {
        var prettyKey=unescape(key);
        var title = escape("Events with "+prettyKey);
        genreUL.append('<li data-theme="d" class="ui-icon-alt"><a href="#" onClick=loadEventList("'+title+'",pfEventsByGenre["'+key+'"])>'+prettyKey+'</a></li>');
    });
    genreUL.listview("refresh");

    var timeUL=$('#pfTimeList');
    var timeKeys = Object.keys(pfEventsByTime).sort();
    $.each(timeKeys,function(index,key) {
        var prettyKey=unescape(key);
        var title = escape("Events at "+prettyKey);
        timeUL.append('<li data-theme="d" class="ui-icon-alt"><a href="#" onClick=loadPFEventList("'+title+'",pfEventsByTime["'+key+'"])>'+prettyKey+'</a></li>');
    });
    timeUL.listview("refresh");


    clock.stop("pfEventsLoad");
}

function getMyAFList() {
    var existingStorageStr = localStorage.getItem("myEvents");
    if (existingStorageStr == null) {
        existingStorageStr = "{}";
    }

    return JSON.parse(existingStorageStr);
}

function addToMyAFList(item){
    var eventId = item.Performance_ID;
    var existingStore = getMyAFList();

    if (existingStore[eventId] == undefined) {
        existingStore[eventId]=item;
        localStorage.setItem("myEvents",JSON.stringify(existingStore));
        $.mobile.showToast("Adding "+item.Name,360);
    }
    loadEventDetails(eventId);
}

function removeFromAList(item){
    var eventId = item.Performance_ID;
    var existingStore = getMyAFList();

    if (existingStore[eventId] != undefined) {
        existingStore[eventId]=undefined;
        localStorage.setItem("myEvents",JSON.stringify(existingStore));
        $.mobile.showToast("Removed "+item.Name,360);
    }
    loadEventDetails(eventId);
}
 
function loadEventDetails(id){
		/*adding special link for pf event listing*/
        if (id == 16537){
            $.mobile.changePage("#pfEventsPage");
        }else{

        var item = eventsById[id][0];
		console.log("First Date is "+item.Date_Performance);

        var ydm = item.Date_Performance;
        
        var b = ydm.split('-');

        var fixoldformat =  (+b[1]) + '/' + (+b[2]) + '/' + (+b[0]); 

        var date = new Date(fixoldformat);
        //var date = (item.Date_Performance).getDate;
        //var date = new Date(item.Date_Performance);
        date.setDate(date.getDate());
        //date.setDate(date.getDate()+1);
        //var date = Date.parse(item.Date_Performance);
        console.log("Then date is "+date);
		date = date.toDateString();
        console.log("Finally date is "+date);
		var item = eventsById[id][0];
		$.mobile.changePage("#detailspage");
		$('#eventname').html(item.Name);
		$('#eventdate').html(date);
		$('#eventtime').html(item.FTime);
		$('#eventlocations').html(item.SPACE_NAME);

        if (item.PerformanceDetails == null)
        {
            $('#eventdetails').html(item.ShortDescription);
        } else
        {
            $('#eventdetails').html(item.ShortDescription + "<br><br>" + item.PerformanceDetails);
        }
		
        //$('#eventdetails').html(item.ShortDescription);
        //$('#eventmap').attr("href", item.google).attr("target", "_blank");
        if (item.Genre == "Exhibition")
        {
            $('#showeventdate').hide();
        } else
        {
            $('#showeventdate').show();
        }
        
        $("#showBoxOffice").hide();
        if (item.How_to_Get_Tickets != null) {
            
                if (item.How_to_Get_Tickets == "The Harvard Box Office 617-496-2222"){
                    // $('#eventtickets').html("<hr><p>How to get tickets: <br/><a href='http://www.boxoffice.harvard.edu/' target='_blank'>The Harvard Box Office</a></p>")
                    $('#eventtickets').html(" ");
                    $('#showBoxOffice').show();
                }else{
                    $('#eventtickets').html("<hr><p>How to get tickets: <br/>"+item.How_to_Get_Tickets+"</p>");
                }

        } else {
            $('#eventtickets').html(" ");
        }

        var existingAFList = getMyAFList();
        var $button = $("#addToAFButton");
        $button.unbind(".myAF");

        if (existingAFList[item.Performance_ID] == undefined) {
            $button.bind("click.myAF",function() {
                addToMyAFList(item)
            }).find(".ui-btn-text").text("Add to My ARTS FIRST");
        } else {
            $button.bind("click.myAF",function() {
                removeFromAList(item)
            }).find(".ui-btn-text").text("Remove from My ARTS FIRST");
        }
        /*$( "#eventmap a[data-role=button]").button('refresh');*/
        if (item.Flag_ArtsFirstPF == "Yes") {
          $('#viewSchedule').show();  
        }else{
            $('#viewSchedule').hide();  
        }
    }
}

function populateMyArtsPage() {
    var myEvents = getMyAFList();
    var $myList = $("#myArtsList");
    $myList.html('');

    $.each(myEvents,function(key,item) {

        //Cheapo templating the E.WHATEVER here gets replaced with the values from the template
        var newEventTemplate = '<li eventTime="E.EVENT_TIME" eventKey="E.KEY"><a href="#"><h2>E.NAME</h2><p>E.Date</p><p>E.LOCATION <strong>E.TIME</strong></p><p>E.DESCRIPTION</p></a></li>';


        var newEvent = newEventTemplate.replace("E.NAME",item.Name)
                                       .replace("E.DESCRIPTION",item.ShortDescription)
                                       .replace("E.LOCATION",item.SPACE_NAME)
                                       .replace("E.Date",item.prettyPerformanceDates)
                                       .replace("E.TIME",item.FTime)
                                       .replace("E.KEY",key)
                                       .replace("E.EVENT_TIME",item.longPerformanceTime);
        $(newEvent).appendTo($myList);
    });

    var sorted=$("#myArtsList li").sort(sortTime);
    $myList.html('').append(sorted);
    $myList.find("li").click(function() {
       var key = $(this).attr("eventKey");
        loadEventDetails(key);
    });
    $myList.listview("refresh");
}

$(document).ready(function(){
    pageStartTime = new Date().getTime();
	var output = $('#output');


	eventsByVenue={};
	eventsById={};
	eventsByGenre={};
    eventsByExhibit={};
	eventsByDay={};

    eventsByName={};

	pfEventsByVenue={};
	pfEventsByGenre={};
	pfEventsByTime={};

	$.ajaxSetup({
		async: false,
		url: 'http://ofa.fas.harvard.edu/m/appEventsStaticJSONP.jsonp',
        //url: 'http://ofa.fas.harvard.edu/m/appEventsStaticJSONP_TEST.jsonp',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
        jsonpCallback:'parseJSONP',
		timeout: 5000,
		error: function(){
			output.text('There was an error loading the data.');
		}
		}); //end ajax setup
	clock.start("gettingAjax");
	$.ajax({success: parseAjaxData});


    // Force reload of data every 8 hours
    
    var callAjax = function(){
        eventsByVenue={};
        eventsById={};
        eventsByGenre={};
        eventsByExhibit={};
        eventsByDay={};

        eventsByName={};

        pfEventsByVenue={};
        pfEventsByGenre={};
        pfEventsByTime={};
        $.ajax({success:parseAjaxData});
        //console.log("callAJax happend at "+ new Date().getTime());
        setTimeout(callAjax,1000*60*60*8);

        };
    //Timeout to fetch data every 8 hours
    setTimeout(callAjax,1000*60*60*8); 
    
	// BUTTON functions

	$('.homeButton').on('click', function()
    {
    	$("ui-navbar").find('li').removeClass("ui-btn-active");
    	$.mobile.changePage("#homePage");
    });

   $("#viewSchedule").on('click', function() 
   {
        $.mobile.changePage("#pfEventsPage")
    });

    $('#mapbut').click(function()
    {	$.mobile.changePage("#mappage");});

    $('#twitbut').click(function()
    {	$.mobile.changePage("#twitterpage");});

    $('#facebut').click(function()
    {	$.mobile.changePage("#facebookpage");});

    $('#infobut').click(function()
    {	$.mobile.changePage("#infopage");});
    


    $('.socialtwit').click(function()
    {
    	$(".socialface").removeClass("ui-btn-active");
        $.mobile.changePage("#twitterpage");
        $(".socialtwit").addClass("ui-btn-active");
    });

    $('.socialface').click(function()
    {
    	$(".socialtwit").removeClass("ui-btn-active");
    	$.mobile.changePage("#facebookpage");
    	$(".socialface").addClass("ui-btn-active");
    });

    $(".loadMyArts").click(function() {
       $.mobile.changePage("#myafpage");
    });

    $(".gotoAllEvents").click(function() {
       $.mobile.changePage("#allEventsPage");
    });

    $(".gotoPFEvents").click(function() {
       $.mobile.changePage("#pfEventsPage");
    });

    $(".backbutton").click(function() {
        $.mobile.back();
    });

    
    $("#myafpage").on("pageshow",function() {
        populateMyArtsPage();
    });

    $("#allEventsPage").on("pageshow",function() {
        loadAllEvents();
    });

    $("#pfEventsPage").on("pageshow",function() {
        loadPfEvents();
    });
    
    
   
}); //end document ready

 

function loadPFEventList(title, arrayOfEvents){

    //If there is only one event, just go straight to the details
    if (arrayOfEvents.length == 1) {
        return loadEventDetails(arrayOfEvents[0].Performance_ID);
    }

    console.log("loading event list with:"+arrayOfEvents.length+" elements",arrayOfEvents);
    clock.start("changingToSelectedEventPage");
        $.mobile.changePage("#listOfSelectedEvents");
    clock.stop("changingToSelectedEventPage");

    clock.start("loadingEventList");
   
    //$("#listofsubevents").html('');
    var eventHtml='';
    $.each(arrayOfEvents,function(index,event) {
        eventHtml+='<li data-theme="d" class="ui-icon-alt" eventTime='+event.longPerformanceTime+'><a href="#" onClick=loadEventDetails('+event.Performance_ID+')>'+event.Name+' </a></li>';
        //eventHtml+='<li data-theme="d" class="ui-icon-alt" eventTime='+event.longPerformanceTime+'><a href="#" onClick=loadEventDetails('+event.Performance_ID+')>'+event.prettyPerformanceDates+' :: '+event.Name+' @ '+event.FTime+' </a></li>';
    });

    $("#listtitle").html(unescape(title));
    $("#listofsubevents").html(eventHtml)
    var sorted=$("#listofsubevents li").sort(sortAlpha);  
    $('#listofsubevents').append(sorted);
    $("#listofsubevents").listview("refresh");

    clock.stop("loadingEventList");
}; 


function loadEventList(title, arrayOfEvents){

    //If there is only one event, just go straight to the details
    if (arrayOfEvents.length == 1) {
        return loadEventDetails(arrayOfEvents[0].Performance_ID);
    }

    console.log("loading event list with:"+arrayOfEvents.length+" elements",arrayOfEvents);
    clock.start("changingToSelectedEventPage");
        $.mobile.changePage("#listOfSelectedEvents");
    clock.stop("changingToSelectedEventPage");

    clock.start("loadingEventList");
   
    //$("#listofsubevents").html('');
    var eventHtml='';
    $.each(arrayOfEvents,function(index,event) {
        eventHtml+='<li data-theme="d" class="ui-icon-alt" eventTime='+event.longPerformanceTime+'><a href="#" onClick=loadEventDetails('+event.Performance_ID+')>'+event.prettyPerformanceDates+' :: '+event.Name+' @ '+event.FTime+' </a></li>';
    });

    $("#listtitle").html(unescape(title));
    $("#listofsubevents").html(eventHtml)

        var sorted=$("#listofsubevents li").sort(sortTime);
    
    $('#listofsubevents').append(sorted);
    $("#listofsubevents").listview("refresh");

    clock.stop("loadingEventList");
};

function sortTime(a,b){
    //return $(a).attr("eventTime") < $(b).attr("eventTime") ? -1 : $(a).attr("eventTime") > $(b).attr("eventTime") ? 1 : 0;
    
    if ($(a).attr("eventTime") < $(b).attr("eventTime")) 
        {
            return -1;
        } else if ($(a).attr("eventTime") == $(b).attr("eventTime")) 
        {
            return 0;
        } else{
            return 1;
        }
    
};  

function sortAlpha(a,b){
    if(a.innerHTML.toLowerCase() < b.innerHTML.toLowerCase())
    {
        return -1;
    } else if (a.innerHTML.toLowerCase() == b.innerHTML.toLowerCase())  
    {    
        return 0;
    } else {
    return 1;
}
   // return a.innerHTML.toLowerCase() > b.innerHTML.toLowerCase() ? 1 : -1;
};
  




JQTWEET = {
	
	// Set twitter username, number of tweets & id/class to append tweets
	user: 'HarvardArts',
	numTweets: 10,
	appendTo: '#jstwitter',

	// core function of jqtweet
	loadTweets: function() {
		$.ajax({
			url: 'http://api.twitter.com/1/statuses/user_timeline.json/',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				screen_name: JQTWEET.user,
				include_rts: true,
				count: JQTWEET.numTweets,
				include_entities: true
			},
			success: function(data, textStatus, xhr) {

			 var html = '<div class="tweet">TWEET_TEXT<div class="time">AGO</div>';

				 // append tweets into page
				 for (var i = 0; i < data.length; i++) {
					$(JQTWEET.appendTo).append(
						html.replace('TWEET_TEXT', JQTWEET.ify.clean(data[i].text))
							.replace(/USER/g, data[i].user.screen_name)
							.replace('AGO', JQTWEET.timeAgo(data[i].created_at))
							.replace(/ID/g, data[i].id_str)
					);

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
          //return '<a class="twtr-hyperlink" target="_blank" href="#" onclick="window.open("http://twitter.com/'m1+'", "_blank", "location=yes")>' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;

   
        });
      },

      at: function(tweet) {
        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
          return '<a class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
          //return '<a class="twtr-atreply" target="_blank" href="#" onclick="window.open("http://twitter.com/intent/user?screen_name=' + username +'", "_blank", "location=yes")>@' + username + '</a>';
        });
      },

      list: function(tweet) {
        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
          //return '<a class="twtr-atreply" target="_blank" href="#" onclick="window.open("http://twitter.com/' + userlist +'", "_blank", "location=yes")>@' + userlist + '</a>';
        });
      },

      hash: function(tweet) {
        return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
          return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
          //return before + '<a class="twtr-hashtag" target="_blank" href="#" onclick="window.open("http://twitter.com/search?q=23' + hash +'", "_blank", "location=yes")>#' + hash + '</a>';
        });
      },

      clean: function(tweet) {
        return this.hash(this.at(this.list(this.link(tweet))));
      }
    } // ify

	
};



$(document).ready(function () {
	// start jqtweet!
	JQTWEET.loadTweets();
	
	//For mobile app, open in another window
	$('#jstwitter').on('click', 'a', function(event){
		var href = $(this).attr('href');
		event.preventDefault();
		window.open(href, '_blank', 'location=yes');
	});


});

