









		    var db;
		    var loaded = false;
		    function SetLoaded() { loaded = true; }

			function preventBehavior(e) 
			{ 
				e.preventDefault(); 
			};
			document.addEventListener("touchmove", preventBehavior, false);

			function onBodyLoad()
			{
			    db = window.openDatabase("favourites", "1.0", "Favourites", 1000000);
			    db.transaction(populateDB, errorCB, successCB);
				document.addEventListener("deviceready", onDeviceReady, false);
			}

			function populateDB(tx) {
			    //tx.executeSql('DROP TABLE FAVOURITE_SESSIONS');
			    //tx.executeSql('DROP TABLE FAVOURITE_EVENTS');
			    tx.executeSql('CREATE TABLE IF NOT EXISTS FAVOURITE_SESSIONS (id, category, day, starttime)');
			    tx.executeSql('CREATE TABLE IF NOT EXISTS FAVOURITE_EVENTS (eventId, sessionId, categoryId, dayName)');
			}

			function errorCB(err) {
			    console.log(err);
			}

			function successCB() {
			    //alert("Default data loaded!");
			}

			function onDeviceReady()
			{

			}

			function change_favouriting() {
			    var url = $.url();
			    var eventId = url.fparam('eventId');
			    var sessionId = url.fparam('sessionId');
			    var dayName = url.fparam('dayName');
			    var categoryId = url.fparam('categoryId');

			    if (typeof eventId === "undefined") {
			        // We're dealing with an entire session not just a single event
			        // Check if this session is in the DB, if it is then call remove_session_from_favourites
			        // If it's not then call add_to_favourites
			        db.transaction(function (tx) {
			            tx.executeSql('SELECT * FROM FAVOURITE_EVENTS WHERE sessionId = "' + sessionId + '" OR sessionId=' + sessionId,
					[],
					function (tx, results) {
					    var len = results.rows.length;
					    if (len > 0) {
					        $.getJSON("data/sessions.json", function (result) {
					            var required_day = result.filter(function (item) { return (item.day == dayName); });
					            var categories = required_day[0].category;
					            var required_category = categories.filter(function (item) { return (item.id == categoryId); });
					            var sessions = required_category[0].session;
					            var required_session = sessions.filter(function (item) { return (item.id == sessionId); });
					            var events = required_session[0].sessionEvent;
					            var number_of_events = events.length;
					            //console.log(number_of_events);
					            //console.log(len);
					            if (number_of_events > len) {
					                $.each(events, function () {
					                    var id = this['id'];
					                    //console.log(id);
					                    db.transaction(function (transaction) { transaction.executeSql('DELETE FROM FAVOURITE_EVENTS WHERE eventId="' + id + '" OR eventId=' + id); }, errorCB);
					                    db.transaction(function (transaction) { transaction.executeSql('INSERT INTO FAVOURITE_EVENTS (eventId, sessionId, categoryId, dayName) VALUES (?, ?, ?, ?)', [id, sessionId, categoryId, dayName]); }, errorCB);
					                });
					            }
					            else {
					                remove_session_from_favourites(sessionId);
					            }
					        });
					        apprise("Session Removed from Favourites");
					    }
					    else {
					        add_to_favourites();
					        apprise("Session Added to Favourites");
					    }
					},
					errorCB);
			        },
					errorCB,
					successCB);
			    }
			    else {
			        //We're dealing with a single event
			        //Check if it's in the DB, if it then call remove_event_from_favourites
			        // If it's not then call add_to_favourites
			        db.transaction(function (tx) {
			            tx.executeSql('SELECT * FROM FAVOURITE_EVENTS WHERE eventId ="' + eventId + '" or eventId = ' + eventId,
					[],
					function (tx, results) {
					    var len = results.rows.length;
					    if (len > 0) {
					        remove_event_from_favourites(eventId, sessionId);
					        apprise("Event Removed from Favourites");
					    }
					    else {
					        add_to_favourites(eventId);
					        apprise("Event Added to Favourites");
					    }
					},
					errorCB);
			        },
					errorCB,
					successCB);
			    }
			}

			function add_to_favourites() {
			    var url = $.url();
			    var dayName = url.fparam('dayName');
			    var sessionId = url.fparam('sessionId');
			    var categoryId = url.fparam('categoryId');
			    var eventId = url.fparam('eventId');
			    $.getJSON("data/sessions.json", function (result) {
			        var required_day = result.filter(function (item) { return (item.day == dayName); });
			        required_day = required_day[0];
			        categories = required_day['category'];
			        required_category = categories.filter(function (item) { return (item.id == categoryId); });
			        required_category = required_category[0];
			        sessions = required_category['session'];
			        required_session = sessions.filter(function (item) { return (item.id == sessionId); });
			        required_session = required_session[0];
			        var starttime = required_session['startTime'];
			        db.transaction(function (tx) {
			            tx.executeSql('SELECT * FROM FAVOURITE_SESSIONS WHERE id = "' + sessionId + '" OR id=' + sessionId,
					[],
					function (tx, results) {
					    var len = results.rows.length;
					    if (len === 0) {
					        db.transaction(function (transaction) { transaction.executeSql('CREATE TABLE IF NOT EXISTS FAVOURITE_SESSIONS (id, category, day, starttime)'); transaction.executeSql('INSERT INTO FAVOURITE_SESSIONS (id, category, day, starttime) VALUES (?, ?, ?, ?)', [sessionId, categoryId, dayName, starttime]) }, errorCB, successCB);
					    }
					},
					errorCB);
			        },
					errorCB,
					successCB);

			        if (typeof eventId === "undefined") {
			            var events = required_session['sessionEvent'];
			            $.each(events, function () {
			                var thisEventId = this['id'];
			                var thisSessionId = this['sessionId'];
			                var thisCategoryId = this['categoryId'];
			                var thisDayName = this['day'];
			                db.transaction(function (transaction) { transaction.executeSql('CREATE TABLE IF NOT EXISTS FAVOURITE_EVENTS (eventId, sessionId, categoryId, dayName)'); transaction.executeSql('INSERT INTO FAVOURITE_EVENTS (eventId, sessionId, categoryId, dayName) VALUES (?, ?, ?, ?)', [thisEventId, thisSessionId, thisCategoryId, thisDayName]) }, errorCB);
			            });
			        }
			        else {
			            db.transaction(function (transaction) { transaction.executeSql('CREATE TABLE IF NOT EXISTS FAVOURITE_EVENTS (eventId, sessionId, categoryId, dayName)'); transaction.executeSql('INSERT INTO FAVOURITE_EVENTS (eventId, sessionId, categoryId, dayName) VALUES (?, ?, ?, ?)', [eventId, sessionId, categoryId, dayName]) }, errorCB);
			        }
			    });
			}

			function remove_event_from_favourites(eventId, sessionId) {
			    db.transaction(function (tx) {
			        tx.executeSql('DELETE FROM FAVOURITE_EVENTS WHERE eventId = ' + eventId + ' OR eventId="' + eventId + '"',
					[],
					function (trans, result) {
					    db.transaction(function (trans) {
					        trans.executeSql('SELECT * FROM FAVOURITE_EVENTS WHERE sessionId = ' + sessionId + ' OR sessionId="' + sessionId + '"',
						[],
						function (tx, results) {
						    var len = results.rows.length;
						    if (len === 0) {
						        db.transaction(function (transaction) { transaction.executeSql('DELETE FROM FAVOURITE_SESSIONS WHERE id="' + sessionId + '" OR id=' + sessionId); }, errorCB);
						    }
						},
						errorCB);
					    },
						errorCB,
						successCB);
					},
					errorCB);
			    },
					errorCB,
					successCB);
			}

			function remove_session_from_favourites(sessionId) {
			    db.transaction(function (tx) {
			        tx.executeSql('DELETE FROM FAVOURITE_EVENTS WHERE sessionId = ' + sessionId + ' OR sessionId="' + sessionId + '"',
					[],
					function (trans, result) {
					    db.transaction(function (transaction) { transaction.executeSql('DELETE FROM FAVOURITE_SESSIONS WHERE id="' + sessionId + '" OR id=' + sessionId); }, errorCB);
					},
					errorCB);
			    },
					errorCB,
					successCB);
			}
            
		

			var getDaysWithSessions = function() 
			{
				var ds = new kendo.data.DataSource(
				{
					transport: {
						read: {url: "data/sessions.json",dataType: "json"}
					}
				});

				$("#ulDaysWithSessions").kendoMobileListView(
				{
					dataSource: ds,
					template: $("#tplDaysWithSessions").html()
				});
				
			}
		

			var getWhatsOnNow = function()
			{
				$("#ulWhatsOnNow").html("");//clear screen
				$("#dvNoSessionsOnNow").html("");

				$("#ulWhatsOnNow").css("display","block");//reset views

				var now = new Date(); //get current date and dayName

				var weekday = new Array(7);
				weekday[0] = "Sunday";
				weekday[1] = "Monday";
				weekday[2] = "Tuesday";
				weekday[3] = "Wednesday";
				weekday[4] = "Thursday";
				weekday[5] = "Friday";
				weekday[6] = "Saturday";
				var dayName = weekday[now.getDay()];
				var dateString = now.getDate() + "/" + now.getMonth() + 1 + "/" + now.getFullYear() + " "; //NB: month value is 0-based
				var nowHours = now.getHours().toString();
				var nowMins = now.getMinutes().toString();
				var nowString = dateString + (nowHours.length > 1 ? "" : "0") + nowHours + ":" + (nowMins.length > 1 ? "" : "0") + nowMins;

				$.getJSON("data/sessions.json",function(result)
				{
					var showList = false;

					try{
						var required_day = result.filter( function(item){return (item.day==dayName);} );
						var dt = required_day[0].dt.split('/');
						dt = new Date(dt[2], dt[1] - 1, dt[0]);//convert to US format for JS (NB: month value is 0-based)
						var categories = required_day[0].category;
						var sessionsNowJSON = [];

						//show list only if today's date is < 4 days away from session date
						if (Math.abs(dt - now) <= 345600000) {

							$.each(categories, function(i, item) { 
		
								var sessionList = categories[i].session;
								$.each(sessionList, function(i2, item2) { 
		
									var startTime = dateString + sessionList[i2].startTime;
									var endTime = dateString + sessionList[i2].endTime;
		
									if (nowString >= startTime && nowString <= endTime) {sessionsNowJSON.push(sessionList[i2]);}//add to JSON array
								});
							});
	
							if (sessionsNowJSON.length > 0){
								showList = true;
	
								$("#ulWhatsOnNow").kendoMobileListView(
								{
									dataSource: kendo.data.DataSource.create({data: sessionsNowJSON}),
									template: $("#tplWhatsOnNow").html(),
									fixedHeaders: true
								});
							}
						}
					}
					catch(err){
						//do nothing
					}

					if (showList == false) {
						var tpl = kendo.template($("#tplNoSessionsOnNow").html());
						var tplData = {};
						$("#dvNoSessionsOnNow").html(tpl(tplData));

						$("#ulWhatsOnNow").css("display","none");//hide list view
					}
				});
			}
		

			var getCategoriesForDay = function()
			{
			
				$("#ulCategoriesForDay").html("");//clear screen
				
				
				var url = $.url();
				var dayName = url.fparam('dayName');
				var title = url.fparam('title');

				try{
					$("#hdrCategoriesForDay").data("kendoMobileNavBar").title(title.replace(/-/g, " ")); //set title
				}
				catch(err){
					//	do nothing
				}

				$.getJSON("data/sessions.json",function(result)
				{
					var required_day = result.filter( function(item){return (item.day==dayName);} );
					var categories = required_day[0].category;
					var ds = new kendo.data.DataSource({data:categories});

	            	//set title if err previously (title is lost in url when clicking Back button)
	            	if (title == undefined){$("#hdrCategoriesForDay").data("kendoMobileNavBar").title(required_day[0].nextPageTitle.replace(/-/g, " "));}

					$("#ulCategoriesForDay").kendoMobileListView(
					{
						dataSource: ds,
						template: $("#tplCategoriesForDay").html()
					});
				});
			}
		

			var getSessionsForCategory = function(e)
			{
				$("#ulSessionsForCategory").html("");//clear screen

	            var url = $.url();
	            var categoryId = url.fparam('categoryId');
	            var dayName = url.fparam('dayName');
	            var title = url.fparam('title');

	  			$("#back-to-categories").attr("href","dvCategoriesForDay&dayName=" + dayName);

	            try{
					$("#hdrSessionsForCategory").data("kendoMobileNavBar").title(title.replace(/-/g, " ")); //set title
				}
				catch(err){
					//	do nothing
				}

	            $.getJSON("data/sessions.json",function(result)
	            {
	            	var required_day = result.filter(function(item){return (item.day == dayName);});
	            	var categories = required_day[0].category;
	            	var required_category = categories.filter(function(item){return (item.id==categoryId);});
	            	var sessions = required_category[0].session;
	            	var ds = new kendo.data.DataSource({data:sessions});

	            	//set title if err previously (title is lost in url when clicking Back button)
	            	if (title == undefined){$("#hdrSessionsForCategory").data("kendoMobileNavBar").title(required_category[0].nextPageTitle.replace(/-/g, " "));}
                    else { e.view.scroller.reset();}

                    $("#ulSessionsForCategory").kendoMobileListView(
	            	{
	            		dataSource: ds,
	            		template: $("#tplSessionsForCategory").html()
	            	});
	            });
			}
		

			var getEventsForSession = function(e)
			{
				
				$("#ulEventsForSession").html("");//clear screen

	            var url = $.url();
	            var sessionId = url.fparam('sessionId');
	            var categoryId = url.fparam('categoryId');
	            var dayName = url.fparam('dayName');
	            var title = url.fparam('title');
	            var prevPage = url.fparam('prv');

	  			$("#back-to-sessions").attr("href","#" + prevPage + "&categoryId=" + categoryId + "&dayName=" + dayName);

	            try{
					$("#hdrEventsForSession").data("kendoMobileNavBar").title(title.replace(/-/g, " ")); //set title
				}
				catch(err){
					//	do nothing
				}

	            $.getJSON("data/sessions.json",function(result)
	            {
	            	var required_day = result.filter(function(item){return (item.day == dayName);});
	            	var categories = required_day[0].category;
	            	var required_category = categories.filter(function(item){return (item.id==categoryId);});
	            	var sessions = required_category[0].session; 
	            	var required_session = sessions.filter(function(item){return (item.id==sessionId);});
	            	var events = required_session[0].sessionEvent;

	            	//set title if err previously (title is lost in url when clicking Back button)
	            	if (title == undefined){$("#hdrEventsForSession").data("kendoMobileNavBar").title(required_session[0].nextPageTitle.replace(/-/g, " "));}
                    else { e.view.scroller.reset();}
                          
	            	//inject prevpage url into datasource for use in template
	            	$.each(events,function(){this['prevPage']=prevPage});

	            	var ds = new kendo.data.DataSource({data:events});

	            	$("#ulEventsForSession").kendoMobileListView(
	            	{
	            		dataSource: ds,
	            		template: $("#tplEventsForSession").html()
	            	});	
	            });
			}
		

			var showEvent = function(e)
			{
	            $("#dvThisEvent").html("");//clear screen

				var url = $.url();
				var eventId = url.fparam('eventId');
	            var sessionId = url.fparam('sessionId');
	            var categoryId = url.fparam('categoryId');
	            var dayName = url.fparam('dayName');
	            var prevPage = url.fparam('prv');
	            var prevPrevPage = "";

	            if (prevPage == "dvWhatsOnNow" || prevPage == "dvSessionsForCategory") {prevPrevPage = "&prv=" + prevPage; prevPage = "dvEventsForSession";}

	  			$("#back-to-events").attr("href","#" + prevPage + "&sessionId=" + sessionId + "&categoryId=" + categoryId + "&dayName=" + dayName + prevPrevPage);

	            $.getJSON("data/sessions.json",function(result)
	            {
	            	var required_day = result.filter(function(item){return (item.day == dayName);});
	            	var categories = required_day[0].category;
	            	var required_category = categories.filter(function(item){return (item.id==categoryId);});
	            	var sessions = required_category[0].session; 
	            	var required_session = sessions.filter(function(item){return (item.id==sessionId);});
	            	var events = required_session[0].sessionEvent; 
	                var required_event = events.filter(function(item){return (item.id==eventId);});
	            	required_event = required_event[0];

                          //format speakerName if multiple speakers entered
                          var speakers = "";
                          var spkr = required_event.speakerName.split("|");
                          var spkrCountry = required_event.speakerCountry.split("|");
                          
                          for (var i = 0; i < spkr.length; i++) {
                          if (speakers.length > 0){speakers += ", ";}
                            speakers += spkr[i] + " (" + spkrCountry[i] + ")";
                          }
                          
					var tpl = kendo.template($("#tplEvent").html());
					var tplData = {title: required_event.title, speakerName: speakers, formattedTimeWithDay: required_event.formattedTimeWithDay, sessionRoom: required_event.sessionRoom, details: required_event.details};
					$("#dvThisEvent").html(tpl(tplData));
                          
                          e.view.scroller.reset();
	            });
			}
		

			var getFavouriteSessions = function()
			{
				$("#ulDay0Favourite").html("");//clear screen
				$("#ulDay1Favourite").html("");
				$("#ulDay2Favourite").html("");
				$("#ulDay3Favourite").html("");
				$("#ulDay4Favourite").html("");
				$("#dvDay0NoFavourites").html("");
				$("#dvDay1NoFavourites").html("");
				$("#dvDay2NoFavourites").html("");
				$("#dvDay3NoFavourites").html("");
				$("#dvDay4NoFavourites").html("");

				$("#ulDay0Favourite").css("display","block");//reset views
				$("#ulDay1Favourite").css("display","block");
				$("#ulDay2Favourite").css("display","block");
				$("#ulDay3Favourite").css("display","block");
				$("#ulDay4Favourite").css("display","block");
				$("#dvDay0NoFavourites").css("display","block");
				$("#dvDay1NoFavourites").css("display","block");
				$("#dvDay2NoFavourites").css("display","block");
				$("#dvDay3NoFavourites").css("display","block");
				$("#dvDay4NoFavourites").css("display","block");

				var url = $.url();
	            var dayName = url.fparam('dayName');
	            var selIndex = 0;

	            var tpl = kendo.template($("#tplNoFavourites").html());
				var tplData = {};

				//initial state of views on page load
	            if (dayName == "Saturday") {$("#ulDay1Favourite").css("display","none");$("#ulDay2Favourite").css("display","none");$("#ulDay3Favourite").css("display","none");$("#ulDay4Favourite").css("display","none"); $("#dvDay1NoFavourites").css("display","none");$("#dvDay2NoFavourites").css("display","none");$("#dvDay3NoFavourites").css("display","none");$("#dvDay4NoFavourites").css("display","none");}
	            if (dayName == "Sunday") {selIndex = 1;$("#ulDay0Favourite").css("display","none");$("#ulDay2Favourite").css("display","none"); $("#ulDay3Favourite").css("display","none");$("#ulDay4Favourite").css("display","none");$("#dvDay0NoFavourites").css("display","none");$("#dvDay2NoFavourites").css("display","none");$("#dvDay3NoFavourites").css("display","none");$("#dvDay4NoFavourites").css("display","none");}
	            if (dayName == "Monday") {selIndex = 2;$("#ulDay0Favourite").css("display","none");$("#ulDay1Favourite").css("display","none"); $("#ulDay3Favourite").css("display","none");$("#ulDay4Favourite").css("display","none");$("#dvDay0NoFavourites").css("display","none");$("#dvDay1NoFavourites").css("display","none");$("#dvDay3NoFavourites").css("display","none");$("#dvDay4NoFavourites").css("display","none");}
                if (dayName == "Tuesday") {selIndex = 3;$("#ulDay0Favourite").css("display","none");$("#ulDay1Favourite").css("display","none"); $("#ulDay2Favourite").css("display","none");$("#ulDay4Favourite").css("display","none");$("#dvDay0NoFavourites").css("display","none");$("#dvDay1NoFavourites").css("display","none");$("#dvDay2NoFavourites").css("display","none");$("#dvDay4NoFavourites").css("display","none");}
                if (dayName == "Wednesday") {selIndex = 4;$("#ulDay0Favourite").css("display","none");$("#ulDay1Favourite").css("display","none"); $("#ulDay2Favourite").css("display","none");$("#ulDay3Favourite").css("display","none");$("#dvDay0NoFavourites").css("display","none");$("#dvDay1NoFavourites").css("display","none");$("#dvDay2NoFavourites").css("display","none");$("#dvDay3NoFavourites").css("display","none");}
                
	            //action when "select day" buttons clicked
                var listviews = this.element.find("ul.km-listview");
				$("#select-period").kendoMobileButtonGroup({
                    select: function() {
                        listviews.hide()
                                 .eq(this.selectedIndex)
                                 .show();

                        $("#dvDay0NoFavourites").css("display","none"); //hide all to reset
                        $("#dvDay1NoFavourites").css("display","none");
                        $("#dvDay2NoFavourites").css("display","none");
                        $("#dvDay3NoFavourites").css("display","none");
                        $("#dvDay4NoFavourites").css("display","none");
                        $("#dvDay" + this.selectedIndex + "NoFavourites").css("display","block");//show specific message for selected day
                    },
                    index: selIndex
                });

				$.getJSON("data/sessions.json",function(result){
				    var Day0_object = result.filter(function(item){return (item.day == 'Saturday');});
					var Day0_events = Day0_object[0]['category'];
					var Day1_object = result.filter(function(item){return (item.day == 'Sunday');});
					var Day1_events = Day1_object[0]['category'];
					var Day2_object = result.filter(function(item){return (item.day == 'Monday');});
					var Day2_events = Day2_object[0]['category'];
                    var Day3_object = result.filter(function(item){return (item.day == 'Tuesday');});
                    var Day3_events = Day3_object[0]['category'];
                    var Day4_object = result.filter(function(item){return (item.day == 'Wednesday');});
                    var Day4_events = Day4_object[0]['category'];
					var Day0_favourites = new Array();
                    var Day1_favourites = new Array();
					var Day2_favourites = new Array();
                    var Day3_favourites = new Array();
                    var Day4_favourites = new Array();
                    var Day0_display = new Array();
					var Day1_display = new Array();
					var Day2_display = new Array();
                    var Day3_display = new Array();
                    var Day4_display = new Array();

					//Day0
					db.transaction(function(tx){tx.executeSql('SELECT * FROM FAVOURITE_SESSIONS WHERE day = "Saturday"', 
					[], 
					function(tx,results){
						var len = results.rows.length;
						for (var i=0; i<len; i++){
							Day0_favourites.push(results.rows.item(i).id);
						}
						$.each(Day0_events,function()
						{
							var sessions = this['session'];
							$.each(Day0_favourites,function()
							{
								var id = parseInt(this);
								filtered_sessions = sessions.filter( function(item){return (item.id==id);} );
								Day0_display = Day0_display.concat(filtered_sessions);
							});
						});

						//show "No favourites" message where required
						if (Day0_display.length == 0){$("#dvDay0NoFavourites").html(tpl(tplData));}

						var ds = new kendo.data.DataSource({data:Day0_display});
						$("#ulDay0Favourite").kendoMobileListView(
						{
							dataSource: ds,
							template: $("#tplFavouriteSession").html()
						});	
					}, 
					errorCB);},
					errorCB,
					successCB);
					//CLOSE Day0
					//Day1
					db.transaction(function(tx){tx.executeSql('SELECT * FROM FAVOURITE_SESSIONS WHERE day = "Sunday"', 
					[], 
					function(tx,results){
						var len = results.rows.length;
						for (var i=0; i<len; i++){
							Day1_favourites.push(results.rows.item(i).id);
						}
						$.each(Day1_events,function()
						{
							var sessions = this['session'];
							$.each(Day1_favourites,function()
							{
								var id = parseInt(this);
								filtered_sessions = sessions.filter( function(item){return (item.id==id);} );
								Day1_display = Day1_display.concat(filtered_sessions);
							});
						});

						//show "No favourites" message where required
						if (Day1_display.length == 0){$("#dvDay1NoFavourites").html(tpl(tplData));}

						var ds = new kendo.data.DataSource({data:Day1_display});
						$("#ulDay1Favourite").kendoMobileListView(
						{
							dataSource: ds,
							template: $("#tplFavouriteSession").html()
						});	
					}, 
					errorCB);},
					errorCB,
					successCB);
					//CLOSE Day1
					//Day2
					db.transaction(function(tx){tx.executeSql('SELECT * FROM FAVOURITE_SESSIONS WHERE day = "Monday"', 
					[], 
					function(tx,results){
						var len = results.rows.length;
						for (var i=0; i<len; i++){
							Day2_favourites.push(results.rows.item(i).id);
						}
						$.each(Day2_events,function()
						{
							var sessions = this['session'];
							$.each(Day2_favourites,function()
							{
								var id = parseInt(this);
								filtered_sessions = sessions.filter( function(item){return (item.id==id);} );
								Day2_display = Day2_display.concat(filtered_sessions);
							});
						});

						//show "No favourites" message where required
						if (Day2_display.length == 0){$("#dvDay2NoFavourites").html(tpl(tplData));}

						var ds = new kendo.data.DataSource({data:Day2_display});
						$("#ulDay2Favourite").kendoMobileListView(
						{
							dataSource: ds,
							template: $("#tplFavouriteSession").html()
						});	
					}, 
					errorCB);},
					errorCB,
					successCB);
					//CLOSE Day2
                    //Day3
                    db.transaction(function(tx){tx.executeSql('SELECT * FROM FAVOURITE_SESSIONS WHERE day = "Tuesday"', 
                    [], 
                    function(tx,results){
                        var len = results.rows.length;
                        for (var i=0; i<len; i++){
                            Day3_favourites.push(results.rows.item(i).id);
                        }
                        $.each(Day3_events,function()
                        {
                            var sessions = this['session'];
                            $.each(Day3_favourites,function()
                            {
                                var id = parseInt(this);
                                filtered_sessions = sessions.filter( function(item){return (item.id==id);} );
                                Day3_display = Day3_display.concat(filtered_sessions);
                            });
                        });
                                                                    
                        //show "No favourites" message where required
                        if (Day3_display.length == 0){$("#dvDay3NoFavourites").html(tpl(tplData));}
                                                                    
                        var ds = new kendo.data.DataSource({data:Day3_display});
                        $("#ulDay3Favourite").kendoMobileListView(
                        {
                            dataSource: ds,
                            template: $("#tplFavouriteSession").html()
                        });	
                    }, 
                    errorCB);},
                    errorCB,
                    successCB);
                    //CLOSE Day3
                    //Day4
                    db.transaction(function(tx){tx.executeSql('SELECT * FROM FAVOURITE_SESSIONS WHERE day = "Wednesday"', 
                    [], 
                    function(tx,results){
                        var len = results.rows.length;
                        for (var i=0; i<len; i++){
                             Day4_favourites.push(results.rows.item(i).id);
                        }
                        $.each(Day4_events,function()
                        {
                             var sessions = this['session'];
                             $.each(Day4_favourites,function()
                             {
                                  var id = parseInt(this);
                                  filtered_sessions = sessions.filter( function(item){return (item.id==id);} );
                                  Day4_display = Day4_display.concat(filtered_sessions);
                              });
                        });
                                                                    
                        //show "No favourites" message where required
                        if (Day4_display.length == 0){$("#dvDay4NoFavourites").html(tpl(tplData));}
                                                                    
                        var ds = new kendo.data.DataSource({data:Day4_display});
                        $("#ulDay4Favourite").kendoMobileListView(
                        {
                             dataSource: ds,
                             template: $("#tplFavouriteSession").html()
                        });	
                    }, 
                    errorCB);},
                    errorCB,
                    successCB);
                    //CLOSE Day4
                });
			}
		

			var getFavouriteEventsForSession = function()
			{
				$("#ulFavouriteEventsForSession").html("");//clear screen

	            var url = $.url();
	            var sessionId = url.fparam('sessionId');
	            var categoryId = url.fparam('categoryId');
	            var dayName = url.fparam('dayName');

	            $("#back-to-favourites").attr("href","#dvFavouriteSessions&dayName=" + dayName);

	            $.getJSON("data/sessions.json",function(result)
	            {
	            	var required_day = result.filter(function(item){return (item.day == dayName);});
	            	var categories = required_day[0].category;
	            	var required_category = categories.filter(function(item){return (item.id==categoryId);});
	            	var sessions = required_category[0].session; 
	            	var required_session = sessions.filter(function(item){return (item.id==sessionId);});
	            	var events = required_session[0].sessionEvent;

					var filtered_events = new Array();
					var favouriteEvents = new Array();
					//SQL FILTERING - BEGIN
					var queriedId = parseInt(sessionId);
					db.transaction(function(tx){tx.executeSql('SELECT * FROM FAVOURITE_EVENTS WHERE sessionId = "'+sessionId+'" OR sessionId = '+sessionId, 
					[], 
					function(tx,results){
						var len = results.rows.length;
						for (var i=0; i<len; i++){
							favouriteEvents.push(results.rows.item(i).eventId);
						}
						$.each(favouriteEvents,function(){
							id = parseInt(this);
							var filter = events.filter( function(item){return (item.id==id);} );
							filtered_events = filtered_events.concat(filter);
						});
			        filtered_events.sort((function (index) {
			            return function (a, b) {
			                return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
			            };
			        })('id'));
					var ds = new kendo.data.DataSource({data:filtered_events});

	            	$("#ulFavouriteEventsForSession").kendoMobileListView(
	            	{
	            		dataSource: ds,
	            		template: $("#tplFavouriteEventsForSession").html()
	            	});	
					}, 
					errorCB);},
					errorCB,
					successCB);
					//SQL FILTERING - END
	            });
			}
		

			var getExhibitionList = function() 
			{
				var ds = new kendo.data.DataSource(
				{
					transport: {
						read: {url: "data/exhibitions.json",dataType: "json"}
					}
				});

				$("#ulExhibitionList").kendoMobileListView(
				{
					dataSource: ds,
					template: $("#tplExhibitionList").html(),
					fixedHeaders: true
				});
			}
		

			var showExhibition = function()
			{
                $("#dvThisExhibition").html("");//clear screen

				var url = $.url();
				id = url.fparam('id');
				$.getJSON("data/exhibitions.json",function(result)
				{
					var required_exhibition = result.filter( function(item){return (item.id==id);} );
					required_exhibition = required_exhibition[0];

					var tpl = kendo.template($("#tplExhibition").html());
					var tplData = {company: required_exhibition.company, booth: required_exhibition.booth, description: required_exhibition.description};
					$("#dvThisExhibition").html(tpl(tplData));
				});
			}
		

        	var showMap = function(e) 
			{
				var networkStatus = checkConnection();
				if(networkStatus == "No network connection" || networkStatus == "None"){
					navigator.notification.alert('Please confirm you have an active data connection and have enabled location services', function(){},'ESCRS','Ok');
				}
				else{
				    var poly = new Array();
				    poly[0] = new Array();
				    poly[0]['lat'] = 45.48069;
				    poly[0]['long'] = 9.1556;
				    poly[0]['bubbleHTML'] = "<div class='tooltip'><div class='tooltiptext'>MiCo - Milano Congressi</div></div>";
				    poly[0]['iconDir'] = "images/Conference@2x.png";
	
					var mapOptions = 
					{
						center: new google.maps.LatLng(45.48069, 9.1556),
						zoom: 12,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						streetViewControl: false,
						mapTypeControl: false
					};
					var mapElement = $("#dvThisMap");
					var container = e.view.content;
					var map = new google.maps.Map(mapElement[0], mapOptions);
	
				    for (var i = (poly.length - 1); i >= 0; i--) {
				    	var point = new google.maps.LatLng(poly[i]['lat'], poly[i]['long']);
				        newMarker(map, point, poly[i]['bubbleHTML'], poly[i]['iconDir']);
				    }
				}
			}

			function newMarker(map, point, bubbleHTML, iconDir) {      
				  var icon = new google.maps.MarkerImage(iconDir, null, null, null, new google.maps.Size(40, 40));
			      var marker = new google.maps.Marker({ position: point, map: map, icon: icon });

			      var infoBubble = new InfoBubble({
			          content: bubbleHTML,
			          position: point,
			          shadowStyle: 1,
			          padding: 0,
			          backgroundColor: 'rgb(57,57,57)',
			          borderRadius: 4,
			          arrowSize: 10,
			          borderWidth: 1,
			          borderColor: '#2c2c2c',
			          disableAutoPan: true,
			          hideCloseButton: true,
			          arrowPosition: 30,
			          backgroundClassName: 'tooltip',
			          arrowStyle: 2
			      });

			      infoBubble.open(map, marker);
			}
			
			function checkConnection() {
				var states = {};
				
				if(typeof navigator.network == "undefined"){
					states[networkState] = "None";
				}
				else{
			    var networkState = navigator.network.connection.type;
			    states[Connection.UNKNOWN]  = 'None';
			    states[Connection.ETHERNET] = 'Ethernet connection';
			    states[Connection.WIFI]     = 'WiFi connection';
			    states[Connection.CELL_2G]  = 'Cell 2G connection';
			    states[Connection.CELL_3G]  = 'Cell 3G connection';
			    states[Connection.CELL_4G]  = 'Cell 4G connection';
			    states[Connection.NONE]     = 'No network connection';
			    }
			    return states[networkState];
			}

		

			var app = new kendo.mobile.Application($(document.body), {platform: "ios" });
			var navbar = $("#navbar").kendoMobileNavBar();
		

function apprise(string,args,callback)
{var default_args={'confirm':false,'verify':false,'input':false,'animate':false,'textOk':'Ok','textCancel':'Cancel','textYes':'Yes','textNo':'No'}
if(args)
{for(var index in default_args)
{if(typeof args[index]=="undefined")args[index]=default_args[index];}}
var aHeight=$(document).height();var aWidth=$(document).width();$('body').append('<div class="appriseOverlay" id="aOverlay"></div>');$('.appriseOverlay').css('height',aHeight).css('width',aWidth).fadeIn(100);$('body').append('<div class="appriseOuter"></div>');$('.appriseOuter').append('<div class="appriseInner"></div>');$('.appriseInner').append(string);$('.appriseOuter').css("left",($(window).width()-$('.appriseOuter').width())/2+$(window).scrollLeft()+"px");if(args)
{if(args['animate'])
{var aniSpeed=args['animate'];if(isNaN(aniSpeed)){aniSpeed=400;}
$('.appriseOuter').css('top','-200px').show().animate({top:"100px"},aniSpeed);}
else
{$('.appriseOuter').css('top','100px').fadeIn(200);}}
else
{$('.appriseOuter').css('top','100px').fadeIn(200);}
if(args)
{if(args['input'])
{if(typeof(args['input'])=='string')
{$('.appriseInner').append('<div class="aInput"><input type="text" class="aTextbox" t="aTextbox" value="'+args['input']+'" /></div>');}
else
{$('.appriseInner').append('<div class="aInput"><input type="text" class="aTextbox" t="aTextbox" /></div>');}
$('.aTextbox').focus();}}
$('.appriseInner').append('<div class="aButtons"></div>');if(args)
{if(args['confirm']||args['input'])
{$('.aButtons').append('<button value="ok">'+args['textOk']+'</button>');$('.aButtons').append('<button value="cancel">'+args['textCancel']+'</button>');}
else if(args['verify'])
{$('.aButtons').append('<button value="ok">'+args['textYes']+'</button>');$('.aButtons').append('<button value="cancel">'+args['textNo']+'</button>');}
else
{$('.aButtons').append('<button value="ok">'+args['textOk']+'</button>');}}
else
{$('.aButtons').append('<button value="ok">Ok</button>');}
$(document).keydown(function(e)
{if($('.appriseOverlay').is(':visible'))
{if(e.keyCode==13)
{$('.aButtons > button[value="ok"]').click();}
if(e.keyCode==27)
{$('.aButtons > button[value="cancel"]').click();}}});var aText=$('.aTextbox').val();if(!aText){aText=false;}
$('.aTextbox').keyup(function()
{aText=$(this).val();});$('.aButtons > button').click(function()
{$('.appriseOverlay').remove();$('.appriseOuter').remove();if(callback)
{var wButton=$(this).attr("value");if(wButton=='ok')
{if(args)
{if(args['input'])
{callback(aText);}
else
{callback(true);}}
else
{callback(true);}}
else if(wButton=='cancel')
{callback(false);}}});}
