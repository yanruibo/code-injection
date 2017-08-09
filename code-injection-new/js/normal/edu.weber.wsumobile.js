
﻿
//////////////////////////////
// STANDARD CONTENT //////////
//////////////////////////////

///// ACCORDION

API.showAccordion = function (app, form, pageID, containerID, unavailableID) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showAccordion executing...");
        console.log("APP = " + app);
        console.log("TOOLKIT_FORM = " + form);
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var callback = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Data reply:");
            console.log(data);
        }

        if (data == "error") {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error retrieving accordion data");
            }
            return false;
        }

        try {
            var xList = API.parseXML(data);
            var dataItems = xList.getElementsByTagName("dataitem");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + dataItems.length + " data items");
            }

            var divSet = document.createElement("div");
            divSet.setAttribute("data-role", "collapsible-set");
            document.getElementById(containerID).appendChild(divSet);

            var divContainer = document.createElement("div");

            for (var i = 0; i < dataItems.length; i++) {

                var divItem = document.createElement("div");
                divItem.setAttribute("data-role", "collapsible");
                divItem.setAttribute("data-collapsed", "true");

                var headingText = $("title", dataItems[i])[0].firstChild.nodeValue;
                var detail = $("detail", dataItems[i])[0].firstChild.nodeValue;

                if (API.debug == true) {
                    console.log("Item " + i + ": " + headingText);
                    //console.log(detail);
                }

                //create heading
                var heading = document.createElement("h3");
                heading.appendChild(document.createTextNode(headingText));
                divItem.appendChild(heading);
                divContainer.appendChild(divItem);

                //add associated content
                var divDetail = document.createElement("div");
                divDetail.id = "divDetail_" + dataItems[i].getAttribute("RecordNumber");

                //enable links to be shown in child browser
                var selector = "#" + divDetail.id + " [href]";
                $(selector).die();
                $(selector).live("click", function () {
                    if (this.getAttribute("href").indexOf("http") > -1) {
                        API.showPage(this.getAttribute("href"));
                        return false;
                    }
                });

                divDetail.innerHTML = detail;
                divItem.appendChild(divDetail);

            }

            divSet.appendChild(divContainer);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying accordion");
            }
            $("#" + containerID).trigger("create");
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");
          
        }
        catch (e) {
            $(".ui-loader").hide();
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing accordion data");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var obj = { App: app, Action: "GetData", Key1: form, OrderBy: "Key2" };
    var request = new API.datastoreRequest(obj);
    $(".ui-loader").show();
    request.submitAsyncRequest(callback);

}

///// AGENDA

API.showAgenda = function (app, form, pageID, containerID, unavailableID, headerTitle) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showAgenda executing...");
        console.log("APP = " + app);
        console.log("TOOLKIT_FORM = " + form);
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
        console.log("DETAIL_HEADER = " + headerTitle);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var callback = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Data reply:");
            console.log(data);
        }

        if (data == "error") {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error retrieving list of events");
            }
             return false;
        }

        try {
            var ulCalendar = document.createElement("ul");
            ulCalendar.setAttribute("data-role", "listview");
            ulCalendar.setAttribute("data-inset", "true");

            xEvents = API.parseXML(data);
            var events = xEvents.getElementsByTagName("event");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + events.length + " data items");
            }

            if (events.length == 0) {
                var liNone = document.createElement("li");
                liNone.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.appendChild(document.createTextNode("No events listed..."));
                liNone.appendChild(link);
                ulCalendar.appendChild(liNone);
            }

            var month = "";
            for (var i = 0; i < events.length; i++) {

                var headingText = $("title", events[i])[0].firstChild.nodeValue;
                var detailText = $("description", events[i])[0].firstChild.nodeValue;
                var allday = $("allday", events[i])[0].firstChild.nodeValue;

                if (API.debug == true) {
                    console.log("Item " + i + ": " + headingText);
                    //console.log(detailText);
                }

                var newMonth = events[i].getAttribute("month");
                if (newMonth != month) { //then insert list divider...
                    var li = document.createElement("li");
                    li.setAttribute("data-role", "list-divider");
                    li.style.fontWeight = "bold";
                    li.style.fontSize = "18px";
                    li.style.textAlign = "left";
                    li.appendChild(document.createTextNode(newMonth));
                    ulCalendar.appendChild(li);
                    month = newMonth;
                }

                var li = document.createElement("li");
                li.setAttribute("data-icon", "false"); 
                var link = document.createElement("a");
                link.setAttribute("href", "#pg_" + events[i].getAttribute("RecordNumber"));
                link.appendChild(document.createTextNode(headingText));
                link.style.marginBottom = "-10px";
                li.appendChild(link);

                var eventDate = document.createElement("p");
                if (allday == "true") {
                    eventDate.appendChild(document.createTextNode(events[i].getAttribute("day") + " (all day)"));
                }
                else {
                    eventDate.appendChild(document.createTextNode(events[i].getAttribute("day") + " " + $("start", events[i])[0].firstChild.nodeValue + " to " + $("end", events[i])[0].firstChild.nodeValue));
                }
                eventDate.style.fontSize = "12px";
                eventDate.style.marginLeft = "20px";
                li.appendChild(eventDate);

                ulCalendar.appendChild(li);

                //create associated page

                var newPageID = "pg_" + events[i].getAttribute("RecordNumber");
                $("#" + newPageID).remove(); //to remove page if it already exists...

                var page = document.createElement("div");
                page.setAttribute("data-role", "page");
                page.setAttribute("data-theme", "a");
                page.id = newPageID;
                page.setAttribute("data-url", newPageID);
                page.setAttribute("data-add-back-btn", "true");

                var header = document.createElement("div");
                header.setAttribute("data-role", "header");
                header.setAttribute("data-position", "fixed");
                page.appendChild(header);

                var h = document.createElement("h1");
                h.appendChild(document.createTextNode(headerTitle));
                header.appendChild(h);

                var lnkHome = document.createElement("a");
                lnkHome.setAttribute("href", "#home")
                lnkHome.appendChild(document.createTextNode("Home"));
                lnkHome.className = "ui-btn-right";
                header.appendChild(lnkHome)

                var content = document.createElement("div");
                content.setAttribute("data-role", "content");
                page.appendChild(content);

                var innerPanel = document.createElement("div");
                innerPanel.id = "innerPanel_" + events[i].getAttribute("RecordNumber");
                innerPanel.className = "wsu-content-panel";
                content.appendChild(innerPanel);

                //enable links to be shown in child browser
                var selector = "#" + innerPanel.id + " [href]";
                $(selector).die();
                $(selector).live("click", function () {
                    if (this.getAttribute("href").indexOf("http") > -1) {
                        API.showPage(this.getAttribute("href"));
                        return false;
                    }
                });

                var spTitle = document.createElement("span");
                spTitle.style.fontWeight = "bold";
                spTitle.appendChild(document.createTextNode(headingText));
                innerPanel.appendChild(spTitle);

                var pTime = document.createElement("p");
                pTime.appendChild(document.createTextNode(eventDate.firstChild.nodeValue));
                innerPanel.appendChild(pTime);

                var pPlace = document.createElement("p");
                pPlace.appendChild(document.createTextNode($("place", events[i])[0].firstChild.nodeValue));
                innerPanel.appendChild(pPlace);

                var divDetail = document.createElement("div");
                divDetail.innerHTML = detailText;
                innerPanel.appendChild(divDetail);

                document.body.appendChild(page);
            }

            document.getElementById(containerID).appendChild(ulCalendar);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying agenda");
            }
            $(ulCalendar).listview();
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

        }
        catch (e) {
            $(".ui-loader").hide();
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing list of events");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var start = new Date()
    start.setDate(start.getDate() - 1);
    var startDay = start.getDate();
    var startMonth = start.getMonth() + 1
    var startYear = start.getFullYear()
    var startDate = startMonth + "/" + startDay + "/" + startYear;

    var request = new API.datastoreRequest({ App: app, Action: "GetData", Key1: "Event", Key2: form, StartDate: startDate });
    $(".ui-loader").show();
    var reply = request.submitRequest();
    callback(reply);

}

///// GENERIC LIST

API.showGenericList = function (app, form, pageID, containerID, unavailableID, listTitle, headerTitle) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showGenericList executing...");
        console.log("APP = " + app);
        console.log("TOOLKIT_FORM = " + form);
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
        console.log("LIST_TITLE = " + listTitle);
        console.log("DETAIL_HEADER = " + headerTitle);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var callback = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Data reply:");
            console.log(data);
        }

        if (data == "error") {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error retrieving list items");
            }
            return false;
        }

        try {
            var xList = API.parseXML(data);
            var dataItems = xList.getElementsByTagName("dataitem");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + dataItems.length + " data items");
            }

            var ulList = document.createElement("ul");
            ulList.setAttribute("data-role", "listview");
            ulList.setAttribute("data-inset", "true");

            //list divider
            if (listTitle != "") {
                var li = document.createElement("li");
                li.setAttribute("data-role", "list-divider");
                li.style.fontWeight = "bold";
                li.style.fontSize = "18px";
                li.style.textAlign = "left";
                li.appendChild(document.createTextNode(listTitle));
                ulList.appendChild(li);
            }

            if (dataItems.length == 0) {
                var liNone = document.createElement("li");
                liNone.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.appendChild(document.createTextNode("No items listed..."));
                liNone.appendChild(link);
                ulList.appendChild(liNone);
            }

            for (var i = 0; i < dataItems.length; i++) {

                var headingText = $("title", dataItems[i])[0].firstChild.nodeValue;
                var detail = $("detail", dataItems[i])[0].firstChild.nodeValue;

                if (API.debug == true) {
                    console.log("Item " + i + ": " + headingText);
                    //console.log(detail);
                }

                //create link
                var li = document.createElement("li");
                li.setAttribute("data-icon", "false"); 
                var link = document.createElement("a");
                link.setAttribute("href", "#pg_" + dataItems[i].getAttribute("RecordNumber"));
                link.appendChild(document.createTextNode($("title", dataItems[i])[0].firstChild.nodeValue));
                li.appendChild(link);

                ulList.appendChild(li);

                //create associated page

                var newPageID = "pg_" + dataItems[i].getAttribute("RecordNumber");
                $("#" + newPageID).remove(); //to remove page if it already exists...

                var page = document.createElement("div");
                page.setAttribute("data-role", "page");
                page.setAttribute("data-theme", "a");
                page.setAttribute("data-add-back-btn", "true");
                page.id = newPageID;
                page.setAttribute("data-url", newPageID);
                page.setAttribute("data-add-back-btn", "true");

                var header = document.createElement("div");
                header.setAttribute("data-role", "header");
                header.setAttribute("data-position", "fixed");
                //header.setAttribute("data-theme", "a");
                page.appendChild(header);

                var h = document.createElement("h1");
                h.appendChild(document.createTextNode(headerTitle));
                header.appendChild(h);

                var lnkHome = document.createElement("a");
                lnkHome.setAttribute("href", "#home")
                lnkHome.setAttribute("data-transition", "fade")
                lnkHome.appendChild(document.createTextNode("Home"));
                lnkHome.className = "ui-btn-right";
                header.appendChild(lnkHome)

                var content = document.createElement("div");
                content.setAttribute("data-role", "content");
                page.appendChild(content);

                var innerPanel = document.createElement("div");
                innerPanel.id = "innerPanel_" + dataItems[i].getAttribute("RecordNumber");
                innerPanel.className = "wsu-content-panel";
                content.appendChild(innerPanel);

                //enable links to be shown in child browser
                var selector = "#" + innerPanel.id + " [href]";
                $(selector).die();
                $(selector).live("click", function () {
                    if (this.getAttribute("href").indexOf("http") > -1) {
                        API.showPage(this.getAttribute("href"));
                        return false;
                    }
                });

                var spTitle = document.createElement("span");
                spTitle.style.fontWeight = "bold";
                spTitle.appendChild(document.createTextNode($("title", dataItems[i])[0].firstChild.nodeValue));
                innerPanel.appendChild(spTitle);

                var divDetail = document.createElement("div");
                divDetail.innerHTML = $("detail", dataItems[i])[0].firstChild.nodeValue;
                innerPanel.appendChild(divDetail);


                document.body.appendChild(page);

            }
            document.getElementById(containerID).appendChild(ulList);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying generic list");
            }
            $("#" + containerID).trigger("create");
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

        }
        catch (e) {
            $(".ui-loader").hide();
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing list items");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var obj = { App: app, Action: "GetData", Key1: form, OrderBy: "Key2" };
    var request = new API.datastoreRequest(obj);
    $(".ui-loader").show();
    request.submitAsyncRequest(callback);

}

///// GOOGLE CALENDAR

API.showGoogleCalendar = function (pageID, containerID, unavailableID, detailHeader, days, calendarPath) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showGoogleCalendar executing...");
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
        console.log("DETAIL_HEADER = " + detailHeader);
        console.log("DAYS = " + days);
        console.log("CONFIG_FILE = " + calendarPath);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();
    
    var callback = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Data reply:");
            console.log(data);
        }

        try {
            var ulCalendar = document.createElement("ul");
            ulCalendar.setAttribute("data-role", "listview");
            ulCalendar.setAttribute("data-inset", "true");
            ulCalendar.setAttribute("data-filter", "true");
            ulCalendar.setAttribute("data-filter-theme", "a");
            ulCalendar.setAttribute("data-filter-placeholder", "Search...");

            var xEvents = API.parseXML(data);
            var events = xEvents.getElementsByTagName("event");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + events.length + " data items");
            }

            if (events.length == 0) {
                var liNone = document.createElement("li");
                liNone.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.appendChild(document.createTextNode("No events listed..."));
                liNone.appendChild(link);
                ulCalendar.appendChild(liNone);
            }

            var month = "";
            for (var i = 0; i < events.length; i++) {

                var published = Date.parse(events[i].getAttribute("published"));

                var newMonth = events[i].getAttribute("month");
                if (newMonth != month) { //then insert list divider...
                    var li = document.createElement("li");
                    li.setAttribute("data-role", "list-divider");
                    li.style.fontWeight = "bold";
                    li.style.fontSize = "18px";
                    li.style.textAlign = "left";
                    li.appendChild(document.createTextNode(newMonth + " Events"));
                    ulCalendar.appendChild(li);
                    month = newMonth;
                }

                if (API.debug == true) {
                    console.log("Item " + i + ": " + $("title", events[i])[0].firstChild.nodeValue);
                }

                var li = document.createElement("li");
                li.setAttribute("data-icon", "false"); 
                var link = document.createElement("a");
                link.setAttribute("href", "#pg_" + events[i].getAttribute("eventid"));
                link.appendChild(document.createTextNode($("title", events[i])[0].firstChild.nodeValue));
                link.style.marginBottom = "-10px";

                li.appendChild(link);

                var eventDate = document.createElement("p");
                if (events[i].getAttribute("time") == "12:00 AM") {
                    eventDate.appendChild(document.createTextNode(events[i].getAttribute("day")));
                }
                else {
                    eventDate.appendChild(document.createTextNode(events[i].getAttribute("day") + " " + events[i].getAttribute("time") + " to " + events[i].getAttribute("end")));
                }
                eventDate.style.fontSize = "12px";
                eventDate.style.marginLeft = "20px";
                li.appendChild(eventDate);

                ulCalendar.appendChild(li);

                //create associated page

                var newPageID = "pg_" + events[i].getAttribute("eventid");
                $("#" + newPageID).remove(); //to remove page if it already exists...

                var page = document.createElement("div");
                page.setAttribute("data-role", "page");
                page.setAttribute("data-theme", "a");
                page.id = newPageID;
                page.setAttribute("data-url", newPageID);
                page.setAttribute("data-add-back-btn", "true");

                var header = document.createElement("div");
                header.setAttribute("data-role", "header");
                header.setAttribute("data-position", "fixed");
                page.appendChild(header);

                var h = document.createElement("h1");
                h.appendChild(document.createTextNode(detailHeader));
                header.appendChild(h);

                var lnkHome = document.createElement("a");
                lnkHome.setAttribute("href", "#home")
                lnkHome.appendChild(document.createTextNode("Home"));
                lnkHome.className = "ui-btn-right";
                header.appendChild(lnkHome)

                var content = document.createElement("div");
                content.setAttribute("data-role", "content");
                page.appendChild(content);

                var innerPanel = document.createElement("div");
                innerPanel.id = "innerPanel_" + events[i].getAttribute("eventid");;
                innerPanel.className = "wsu-content-panel";
                content.appendChild(innerPanel);

                //enable links to be shown in child browser
                var selector = "#" + innerPanel.id + " [href]";
                $(selector).die();
                $(selector).live("click", function () {
                    if (this.getAttribute("href").indexOf("http") > -1) {
                        API.showPage(this.getAttribute("href"));
                        return false;
                    }
                });

                var spTitle = document.createElement("span");
                spTitle.style.fontWeight = "bold";
                spTitle.appendChild(document.createTextNode($("title", events[i])[0].firstChild.nodeValue));
                innerPanel.appendChild(spTitle);

                var pTime = document.createElement("p");
                pTime.appendChild(document.createTextNode(eventDate.firstChild.nodeValue));
                innerPanel.appendChild(pTime);

                var pPlace = document.createElement("p");
                pPlace.appendChild(document.createTextNode($("location", events[i])[0].firstChild.nodeValue));
                innerPanel.appendChild(pPlace);

                var divDetail = document.createElement("div");
                divDetail.innerHTML = $("description", events[i])[0].firstChild.nodeValue;
                innerPanel.appendChild(divDetail);

                document.body.appendChild(page);

            }
            
            document.getElementById(containerID).appendChild(ulCalendar);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying calendar");
            }
            $(ulCalendar).listview();
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing events");
                console.warn("Error message: " + e.message);
            }
        }
    }

    $(".ui-loader").show();
    API.getCalendarFeed(days, calendarPath, callback);
}

///// RESOURCES

API.showResources = function (app, form, pageID, containerID, unavailableID, listTitle, headerTitle) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showGenericList executing...");
        console.log("APP = " + app);
        console.log("TOOLKIT_FORM = " + form);
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
        console.log("LIST_TITLE = " + listTitle);
        console.log("DETAIL_HEADER = " + headerTitle);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var callback = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Data reply:");
            console.log(data);
        }

        if (data == "error") {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error retrieving resources");
            }
            return false;
        }

        try {
            var xList = API.parseXML(data);
            var dataItems = xList.getElementsByTagName("dataitem");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + dataItems.length + " data items");
            }

            var ulList = document.createElement("ul");
            ulList.setAttribute("data-role", "listview");
            ulList.setAttribute("data-inset", "true");

            //list divider
            if (listTitle != "") {
                var li = document.createElement("li");
                li.setAttribute("data-role", "list-divider");
                li.style.fontWeight = "bold";
                li.style.fontSize = "18px";
                li.style.textAlign = "left";
                li.appendChild(document.createTextNode(listTitle));
                ulList.appendChild(li);
            }

            if (dataItems.length == 0) {
                var liNone = document.createElement("li");
                liNone.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.appendChild(document.createTextNode("No resources listed..."));
                liNone.appendChild(link);
                ulList.appendChild(liNone);
            }

            for (var i = 0; i < dataItems.length; i++) {

                var headingText = $("title", dataItems[i])[0].firstChild.nodeValue;
                var tag = $("tag", dataItems[i])[0].firstChild.nodeValue;
                var detail = $("detail", dataItems[i])[0].firstChild.nodeValue;

                if (API.debug == true) {
                    console.log("Item " + i + ": " + headingText);
                    //console.log(detail);
                }

                //create link
                var li = document.createElement("li");
                li.setAttribute("data-icon", "false"); 

                var link = document.createElement("a");
                link.setAttribute("href", "#pg_" + dataItems[i].getAttribute("RecordNumber"));
                link.appendChild(document.createTextNode($("title", dataItems[i])[0].firstChild.nodeValue));
                li.appendChild(link);

                ulList.appendChild(li);

                //create associated page

                var newPageID = "pg_" + dataItems[i].getAttribute("RecordNumber");
                $("#" + newPageID).remove(); //to remove page if it already exists...

                var page = document.createElement("div");
                page.setAttribute("data-role", "page");
                page.setAttribute("data-theme", "a");
                page.setAttribute("data-add-back-btn", "true");
                page.id = newPageID;
                page.setAttribute("data-url", newPageID);
                page.setAttribute("data-add-back-btn", "true");

                var header = document.createElement("div");
                header.setAttribute("data-role", "header");
                header.setAttribute("data-position", "fixed");
                page.appendChild(header);

                var h = document.createElement("h1");
                h.appendChild(document.createTextNode(headerTitle));
                header.appendChild(h);

                var lnkHome = document.createElement("a");
                lnkHome.setAttribute("href", "#home")
                lnkHome.setAttribute("data-transition", "fade")
                lnkHome.appendChild(document.createTextNode("Home"));
                lnkHome.className = "ui-btn-right";
                header.appendChild(lnkHome)

                var content = document.createElement("div");
                content.setAttribute("data-role", "content");
                page.appendChild(content);

                var innerPanel = document.createElement("div");
                innerPanel.id = "innerPanel_" + dataItems[i].getAttribute("RecordNumber");;
                innerPanel.className = "wsu-content-panel";
                content.appendChild(innerPanel);

                //enable links to be shown in child browser
                var selector = "#" + innerPanel.id + " [href]";
                $(selector).die();
                $(selector).live("click", function () {
                    if (this.getAttribute("href").indexOf("http") > -1) {
                        API.showPage(this.getAttribute("href"));
                        return false;
                    }
                });

                var spTitle = document.createElement("span");
                spTitle.style.fontWeight = "bold";
                spTitle.appendChild(document.createTextNode($("title", dataItems[i])[0].firstChild.nodeValue));
                innerPanel.appendChild(spTitle);

                var divDetail = document.createElement("div");
                divDetail.innerHTML = $("detail", dataItems[i])[0].firstChild.nodeValue;
                innerPanel.appendChild(divDetail);

                if (tag != "") {
                    var lnkViewResource = document.createElement("a");
                    lnkViewResource.setAttribute("href", "");
                    lnkViewResource.setAttribute("data-role", "button");
                    lnkViewResource.setAttribute("url", tag);
                    lnkViewResource.appendChild(document.createTextNode("View Resource"));
                    $(lnkViewResource).bind("click", function () {
                        API.showPage(this.getAttribute("url"));
                    });
                    content.appendChild(lnkViewResource);
                }

                document.body.appendChild(page);

            }
            document.getElementById(containerID).appendChild(ulList);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying list of resources");
            }
            $("#" + containerID).trigger("create");
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing resources");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var obj = { App: app, Action: "GetData", Key1: form, OrderBy: "Key2" };
    var request = new API.datastoreRequest(obj);
    $(".ui-loader").show();
    request.submitAsyncRequest(callback);

}

///// ROSTER

API.showRoster = function (app, form, pageID, containerID, unavailableID, headerTitle) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showRoster executing...");
        console.log("APP = " + app);
        console.log("TOOLKIT_FORM = " + form);
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
        console.log("DETAIL_HEADER = " + headerTitle);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var callback = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Data reply:");
            console.log(data);
        }

        if (data == "error") {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error retrieving roster");
            }
            return false;
        }

        try {
            var xMembers = API.parseXML(data);
            var members = xMembers.getElementsByTagName("profile");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + members.length + " data items");
            }

            var ulMembers = document.createElement("ul");
            ulMembers.setAttribute("data-role", "listview");
            ulMembers.setAttribute("data-inset", "true");
            
            var category = "";

            for (var i = 0; i < members.length; i++) {

                //create list dividers and list items
                var newCategory = $("Category", members[i])[0].firstChild.nodeValue
                if (newCategory != category) { //then insert list divider...
                    var li = document.createElement("li");
                    li.setAttribute("data-role", "list-divider");
                    li.style.fontWeight = "bold";
                    li.style.fontSize = "18px";
                    li.style.textAlign = "left";
                    li.appendChild(document.createTextNode(newCategory));
                    ulMembers.appendChild(li);
                    category = newCategory;
                }

                var fullName = $("FirstName", members[i])[0].firstChild.nodeValue + " " + $("LastName", members[i])[0].firstChild.nodeValue;
                var job = $("Position", members[i])[0].firstChild.nodeValue;
                var nameAndPosition = fullName;
                if (job != "") {
                    nameAndPosition += ", ";
                    nameAndPosition += job;
                }

                if (API.debug == true) {
                    console.log("Item " + i + ": " + nameAndPosition);
                }

                var li = document.createElement("li");
                li.setAttribute("data-icon", "false"); 
                var link = document.createElement("a");
                link.setAttribute("href", "#pg_" + members[i].getAttribute("RecordNumber"));
                link.appendChild(document.createTextNode(fullName));
                link.style.marginBottom = "-10px";
                li.appendChild(link);

                var position = document.createElement("p");
                position.appendChild(document.createTextNode($("Position", members[i])[0].firstChild.nodeValue));
                position.style.fontSize = "12px";
                position.style.marginLeft = "20px";
                li.appendChild(position);

                 ulMembers.appendChild(li);

                //create associated page

                var newPageID = "pg_" + members[i].getAttribute("RecordNumber");
                $("#" + newPageID).remove(); //to remove page if it already exists...

                var page = document.createElement("div");
                page.setAttribute("data-role", "page");
                page.setAttribute("data-theme", "a");
                page.id = newPageID;
                page.setAttribute("data-url", newPageID);
                page.setAttribute("data-add-back-btn", "true");

                var header = document.createElement("div");
                header.setAttribute("data-role", "header");
                header.setAttribute("data-position", "fixed");
                page.appendChild(header);

                var h = document.createElement("h1");
                h.appendChild(document.createTextNode(headerTitle));
                header.appendChild(h);

                var lnkHome = document.createElement("a");
                lnkHome.setAttribute("href", "#home")
                lnkHome.setAttribute("data-transition", "fade")
                lnkHome.appendChild(document.createTextNode("Home"));
                lnkHome.className = "ui-btn-right";
                header.appendChild(lnkHome)

                var content = document.createElement("div");
                content.setAttribute("data-role", "content");
                page.appendChild(content);

                var innerPanel = document.createElement("div");
                innerPanel.className = "wsu-content-panel";
                content.appendChild(innerPanel);

                var spTitle = document.createElement("p");
                spTitle.style.fontWeight = "bold";
                spTitle.appendChild(document.createTextNode(nameAndPosition));
                innerPanel.appendChild(spTitle);

                var photoFrame = document.createElement("div");
                photoFrame.id = "photoFrame";
                photoFrame.className = "wsu-photo-frame";
                innerPanel.appendChild(photoFrame);

                //photoFrame.style.backgroundImage = "url(" + API.server + "/Platform/FileDownload.aspx?record=" + members[i].getAttribute("RecordNumber") + "&r=" + (Math.random() * 10) + ")";
                photoFrame.style.backgroundImage = "url(" + API.server + "/Platform2/PhotoDownload.aspx?record=" + members[i].getAttribute("RecordNumber") + "&r=" + (Math.random() * 10) + ")";

                var divBio = document.createElement("div");
                divBio.id = "divBio_" + members[i].getAttribute("RecordNumber");
                divBio.innerHTML = $("Bio", members[i])[0].firstChild.nodeValue;
                innerPanel.appendChild(divBio);

                var phoneNumber = members[i].getAttribute("Phone");
                if (phoneNumber) {
                    if (phoneNumber != "") {
                        var pPhone = document.createElement("p");
                        innerPanel.appendChild(pPhone);

                        var spPhone = document.createElement("span");
                        spPhone.appendChild(document.createTextNode("Phone: "));
                        pPhone.appendChild(spPhone);

                        var lnkPhone = document.createElement("a");
                        lnkPhone.setAttribute("href", "tel://" + members[i].getAttribute("Phone"));
                        lnkPhone.appendChild(document.createTextNode(members[i].getAttribute("Phone")));
                        pPhone.appendChild(lnkPhone);
                    }
                }

                var pEmail = document.createElement("p");
                innerPanel.appendChild(pEmail);

                var spEmail = document.createElement("span");
                spEmail.appendChild(document.createTextNode("Email: "));
                pEmail.appendChild(spEmail);

                var lnkEmail = document.createElement("a");
                lnkEmail.setAttribute("href", "mailto:" + $("Email", members[i])[0].firstChild.nodeValue);
                lnkEmail.appendChild(document.createTextNode($("Email", members[i])[0].firstChild.nodeValue));
                pEmail.appendChild(lnkEmail);

                document.body.appendChild(page);

            }
            document.getElementById(containerID).appendChild(ulMembers);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying roster");
            }
            $(ulMembers).listview();
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing roster");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var obj = { App: app, Action: "GetData", Key1: "Profile", Key6: form, OrderBy: "Key4,Key5,Key3" };
    var request = new API.datastoreRequest(obj);
    $(".ui-loader").show();
    request.submitAsyncRequest(callback);
}

///// SUBTITLED LIST

API.showSubtitledList = function (app, form, pageID, containerID, unavailableID, listTitle, headerTitle) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showSubtitledList executing...");
        console.log("APP = " + app);
        console.log("TOOLKIT_FORM = " + form);
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
        console.log("LIST_TITLE = " + listTitle);
        console.log("DETAIL_HEADER = " + headerTitle);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var callback = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Data reply:");
            console.log(data);
        }

        if (data == "error") {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error retrieving list items");
            }
            return false;
        }

        try {
            var xList = API.parseXML(data);
            var dataItems = xList.getElementsByTagName("dataitem");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + dataItems.length + " data items");
            }

            var ulList = document.createElement("ul");
            ulList.setAttribute("data-role", "listview");
            ulList.setAttribute("data-inset", "true");

            //list divider
            if (listTitle != "") {
                var li = document.createElement("li");
                li.setAttribute("data-role", "list-divider");
                 li.style.fontWeight = "bold";
                li.style.fontSize = "18px";
                li.style.textAlign = "left";
                li.appendChild(document.createTextNode(listTitle));
                ulList.appendChild(li);
            }

            for (var i = 0; i < dataItems.length; i++) {

                var headingText = $("title", dataItems[i])[0].firstChild.nodeValue;
                var subtitleText = $("subtitle", dataItems[i])[0].firstChild.nodeValue;
                var detail = $("detail", dataItems[i])[0].firstChild.nodeValue;

                if (API.debug == true) {
                    console.log("Item " + i + ": " + headingText);
                    //console.log(detail);
                }

                //create link
                var li = document.createElement("li");
                li.setAttribute("data-icon", "false"); 
                var link = document.createElement("a");
                link.setAttribute("href", "#pg_" + dataItems[i].getAttribute("RecordNumber"));
                link.appendChild(document.createTextNode($("title", dataItems[i])[0].firstChild.nodeValue));
                li.appendChild(link);

                if (subtitleText != "") {
                    var pSubtitle = document.createElement("p");
                    pSubtitle.appendChild(document.createTextNode(subtitleText));
                    pSubtitle.style.fontSize = "14px";
                    pSubtitle.style.marginLeft = "25px";
                    pSubtitle.style.color = "#554060";
                    li.appendChild(pSubtitle);
                }

                ulList.appendChild(li);

                //create associated page

                var newPageID = "pg_" + dataItems[i].getAttribute("RecordNumber");
                $("#" + newPageID).remove(); //to remove page if it already exists...

                var page = document.createElement("div");
                page.setAttribute("data-role", "page");
                page.setAttribute("data-theme", "a");
                page.setAttribute("data-add-back-btn", "true");
                page.id = newPageID;
                page.setAttribute("data-url", newPageID);
                page.setAttribute("data-add-back-btn", "true");

                var header = document.createElement("div");
                header.setAttribute("data-role", "header");
                header.setAttribute("data-position", "fixed");
                page.appendChild(header);

                var h = document.createElement("h1");
                h.appendChild(document.createTextNode(headerTitle));
                header.appendChild(h);

                var lnkHome = document.createElement("a");
                lnkHome.setAttribute("href", "#home")
                lnkHome.setAttribute("data-transition", "fade")
                lnkHome.appendChild(document.createTextNode("Home"));
                lnkHome.className = "ui-btn-right";
                header.appendChild(lnkHome)

                var content = document.createElement("div");
                content.setAttribute("data-role", "content");
                page.appendChild(content);

                var innerPanel = document.createElement("div");
                innerPanel.id = "innerPanel_" + dataItems[i].getAttribute("RecordNumber");;
                innerPanel.className = "wsu-content-panel";
                content.appendChild(innerPanel);

                //enable links to be shown in child browser
                var selector = "#" + innerPanel.id + " [href]";
                $(selector).die();
                $(selector).live("click", function () {
                    if (this.getAttribute("href").indexOf("http") > -1) {
                        API.showPage(this.getAttribute("href"));
                        return false;
                    }
                });

                var spTitle = document.createElement("span");
                spTitle.style.fontWeight = "bold";
                if (subtitleText != "") {
                    spTitle.appendChild(document.createTextNode(headingText + " - " + subtitleText));
                }
                else {
                    spTitle.appendChild(document.createTextNode(headingText));
                }
                innerPanel.appendChild(spTitle);

                var divDetail = document.createElement("div");
                divDetail.innerHTML = $("detail", dataItems[i])[0].firstChild.nodeValue;
                innerPanel.appendChild(divDetail);

                document.body.appendChild(page);

            }
            document.getElementById(containerID).appendChild(ulList);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying subtitled list");
            }
            $("#" + containerID).trigger("create");
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing list items");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var obj = { App: app, Action: "GetData", Key1: form, OrderBy: "Key2" };
    var request = new API.datastoreRequest(obj);
    $(".ui-loader").show();
    request.submitAsyncRequest(callback);

}

///// UNSTRUCTURED

API.showUnstructuredContent = function (app, form, pageID, containerID, unavailableID) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showUnstructuredContent executing...");
        console.log("APP = " + app);
        console.log("TOOLKIT_FORM = " + form);
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();
   
    var callback = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Data reply:");
            console.log(data);
        }

        if (data == "error") {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error retrieving unstructured content");
            }
            return false;
        }

        try {
            var xPage = API.parseXML(data);
            var pageContent = $("html", xPage)[0].firstChild.nodeValue;

            //enable links to be shown in child browser
            var selector = "#" + containerID + " [href]";
            $(selector).die();
            $(selector).live("click", function () {
                if (this.getAttribute("href").indexOf("http") > -1) {
                    API.showPage(this.getAttribute("href"));
                    return false;
                }
            });

            document.getElementById(containerID).innerHTML = pageContent;

            if (API.debug == true) {
                console.log("");
                console.log("Displaying page content");
            }
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing unstructured content");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var request = new API.datastoreRequest({ App: app, Action: "GetData", Key1: "Page", Key2: form });
    $(".ui-loader").show();
    request.submitAsyncRequest(callback);
}

//////////////////////////////
// HIGHLIGHTED CONTENT ///////
//////////////////////////////

///// HIGHLIGHTED LIST

API.showHighlightedList = function (form, pageID, containerID, unavailableID, listTitle, detailHeader, noItemsMessage, fIncrement, fDecrement) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showHighlightedList executing...");
        console.log("TOOLKIT_FORM = " + form);
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
        console.log("LIST_TITLE = " + listTitle);
        console.log("DETAIL_HEADER = " + detailHeader);
        console.log("NO_EVENTS = " + noItemsMessage);
        console.log("fINCREMENT = " + fIncrement);
        console.log("fDECREMENT = " + fDecrement);
        console.log("Last resumed: " + new Date(parseInt(API.lastChecked)).toString());
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var decrement = function (e) {
        fDecrement();
        $("." + e.currentTarget.getAttribute("newlabel")).addClass("wsu-hidden");
        $(e.currentTarget).unbind("click", decrement);
    }

    var callback = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Data reply:");
            console.log(data);
        }

        if (data == "error") {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error retrieving list items");
            }
            return false;
        }

        try {
            var xList = API.parseXML(data);
            var dataItems = xList.getElementsByTagName("dataitem");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + dataItems.length + " data items for #" + pageID);
            }

            var ulList = document.createElement("ul");
            ulList.setAttribute("data-role", "listview");
            ulList.setAttribute("data-inset", "true");

            //list divider
            if (listTitle != "") {
                var li = document.createElement("li");
                li.setAttribute("data-role", "list-divider");
                li.style.fontWeight = "bold";
                li.style.fontSize = "18px";
                li.style.textAlign = "left";
                li.appendChild(document.createTextNode(listTitle));
                ulList.appendChild(li);
            }

            if (dataItems.length == 0) {
                var liNone = document.createElement("li");
                liNone.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.appendChild(document.createTextNode(noItemsMessage));
                liNone.appendChild(link);
                ulList.appendChild(liNone);
            }

            for (var i = 0; i < dataItems.length; i++) {

                var record = dataItems[i].getAttribute("RecordNumber");
                var headingText = $("title", dataItems[i])[0].firstChild.nodeValue;
                var detail = $("detail", dataItems[i])[0].firstChild.nodeValue;
                var entered = Date.parse($("Entered", dataItems[i])[0].firstChild.nodeValue);

                //create link
                var li = document.createElement("li");
                li.setAttribute("data-icon", "false");

                var link = document.createElement("a");
                link.setAttribute("href", "#pg_" + record);

                if (entered > API.lastChecked) {

                    fIncrement();

                    var sp = document.createElement("span");
                    sp.appendChild(document.createTextNode(" (New) "));
                    sp.className = "class_" + record;
                    link.setAttribute("newlabel", sp.className);
                    sp.style.color = "red";
                    sp.style.fontStyle = "italic";
                    link.appendChild(sp);

                    $(link).bind("click", decrement);

                    if (API.debug == true) {
                        console.log("Item " + i + ": " + headingText + " (new)");
                        //console.log(detail);
                    }
                }
                else {
                    if (API.debug == true) {
                        console.log("Item " + i + ": " + headingText);
                        //console.log(detail);
                    }
                }

                link.appendChild(document.createTextNode($("title", dataItems[i])[0].firstChild.nodeValue));

                li.appendChild(link);

                ulList.appendChild(li);

                //create associated page

                var newPageID = "pg_" + dataItems[i].getAttribute("RecordNumber");
                $("#" + newPageID).remove(); //to remove page if it already exists...

                var page = document.createElement("div");
                page.setAttribute("data-role", "page");
                page.setAttribute("data-theme", "a");
                page.setAttribute("data-add-back-btn", "true");
                page.id = newPageID;
                page.setAttribute("data-url", newPageID);
                page.setAttribute("data-add-back-btn", "true");

                var header = document.createElement("div");
                header.setAttribute("data-role", "header");
                header.setAttribute("data-position", "fixed");
                page.appendChild(header);

                var h = document.createElement("h1");
                h.appendChild(document.createTextNode(detailHeader));
                header.appendChild(h);

                var lnkHome = document.createElement("a");
                lnkHome.setAttribute("href", "#home")
                lnkHome.setAttribute("data-transition", "fade")
                lnkHome.appendChild(document.createTextNode("Home"));
                lnkHome.className = "ui-btn-right";
                header.appendChild(lnkHome)

                var content = document.createElement("div");
                content.setAttribute("data-role", "content");
                page.appendChild(content);

                var innerPanel = document.createElement("div");
                innerPanel.id = "innerPanel_" + dataItems[i].getAttribute("RecordNumber");;
                innerPanel.className = "wsu-content-panel";
                content.appendChild(innerPanel);

                //enable links to be shown in child browser
                var selector = "#" + innerPanel.id + " [href]";
                $(selector).die();
                $(selector).live("click", function () {
                    if (this.getAttribute("href").indexOf("http") > -1) {
                        API.showPage(this.getAttribute("href"));
                        return false;
                    }
                });

                var spTitle = document.createElement("span");
                spTitle.style.fontWeight = "bold";
                spTitle.appendChild(document.createTextNode($("title", dataItems[i])[0].firstChild.nodeValue));
                innerPanel.appendChild(spTitle);

                var divDetail = document.createElement("div");
                divDetail.innerHTML = $("detail", dataItems[i])[0].firstChild.nodeValue;
                innerPanel.appendChild(divDetail);

                document.body.appendChild(page);

            }

            document.getElementById(containerID).appendChild(ulList);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying list");
            }
            $("#" + containerID).trigger("create");
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

            $("#home").trigger("pagebeforeshow");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("callback error in showHighlighted list");
                console.warn(e.message);
            }
        }

    }

    try {
        var obj = { App: API.app, Action: "GetData", Key1: form, OrderBy: "Key2" };
        var request = new API.datastoreRequest(obj);
        $(".ui-loader").show();
        request.submitOnlineAsyncRequest(callback);
    }
    catch (e) {
        $(".ui-loader").hide();
        $("#" + unavailableID).removeClass("hidden");
        if (API.debug == true) {
            console.warn("ajax error in showHighlighted list");
            console.warn(e.message);
        }
    }

}

///// HIGHLIGHTED AGENDA

API.showHighlightedAgenda = function (form, pageID, containerID, unavailableID, detailHeader, noItemsMessage, fIncrement, fDecrement) {
    
    if (API.debug == true) {
        console.log("");
        console.log("API.showHighlightedAgenda executing...");
        console.log("TOOLKIT_FORM = " + form);
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
        console.log("DETAIL_HEADER = " + detailHeader);
        console.log("NO_EVENTS = " + noItemsMessage);
        console.log("fINCREMENT = " + fIncrement);
        console.log("fDECREMENT = " + fDecrement);
        console.log("Last resumed: " + new Date(parseInt(API.lastChecked)).toString());
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var decrement = function (e) {
        fDecrement();
        $("." + e.currentTarget.getAttribute("newlabel")).addClass("wsu-hidden");
        $(e.currentTarget).unbind("click", decrement);
    }

    var callback = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Datastore reply:");
            console.log(data);
        }

        if (data == "error") {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error retrieving agenda items");
            }
            return false;
        }

        try {

            xEvents = API.parseXML(data);
            var events = xEvents.getElementsByTagName("event");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + events.length + " data items");
            }

            var ulCalendar = document.createElement("ul");
            ulCalendar.setAttribute("data-role", "listview");
            ulCalendar.setAttribute("data-inset", "true");

            if (events.length == 0) {
                var liNone = document.createElement("li");
                liNone.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.appendChild(document.createTextNode(noItemsMessage));
                liNone.appendChild(link);
                ulCalendar.appendChild(liNone);
            }

            var month = "";
            for (var i = 0; i < events.length; i++) {

                var headingText = $("title", events[i])[0].firstChild.nodeValue;
                var detailText = $("description", events[i])[0].firstChild.nodeValue;
                var allday = $("allday", events[i])[0].firstChild.nodeValue;
                var entered = Date.parse($("Entered", events[i])[0].firstChild.nodeValue);

                var newMonth = events[i].getAttribute("month");
                if (newMonth != month) { //then insert list divider...
                    var li = document.createElement("li");
                    li.setAttribute("data-role", "list-divider");
                    li.style.fontWeight = "bold";
                    li.style.fontSize = "18px";
                    li.style.textAlign = "left";
                    li.appendChild(document.createTextNode(newMonth));
                    ulCalendar.appendChild(li);
                    month = newMonth;
                }

                // create link
                var li = document.createElement("li");
                li.setAttribute("data-icon", "false"); 
                var link = document.createElement("a");
                link.setAttribute("href", "#pg_" + events[i].getAttribute("RecordNumber"));

                if (entered > API.lastChecked) {

                    fIncrement();

                    var sp = document.createElement("span");
                    sp.appendChild(document.createTextNode(" (New) "));
                    sp.className = "class_" + events[i].getAttribute("RecordNumber");
                    link.setAttribute("newlabel", sp.className);
                    sp.style.color = "red";
                    sp.style.fontStyle = "italic";
                    link.appendChild(sp);

                    $(link).bind("click", decrement);

                    if (API.debug == true) {
                        console.log("Item " + i + ": " + headingText + " (new)");
                        //console.log(detailText);
                    }
                }
                else {
                    if (API.debug == true) {
                        console.log("Item " + i + ": " + headingText);
                        //console.log(detailText);
                    }
                }

                link.appendChild(document.createTextNode(headingText));
                link.style.marginBottom = "-10px";

                li.appendChild(link);

                var eventDate = document.createElement("p");
                if (allday == "true") {
                    eventDate.appendChild(document.createTextNode(events[i].getAttribute("day") + " (all day)"));
                }
                else {
                    eventDate.appendChild(document.createTextNode(events[i].getAttribute("day") + " " + $("start", events[i])[0].firstChild.nodeValue + " to " + $("end", events[i])[0].firstChild.nodeValue));
                }
                eventDate.style.fontSize = "12px";
                eventDate.style.marginLeft = "20px";
                li.appendChild(eventDate);

                ulCalendar.appendChild(li);

                //create associated page

                var newPageID = "pg_" + events[i].getAttribute("RecordNumber");
                $("#" + newPageID).remove(); //to remove page if it already exists...

                var page = document.createElement("div");
                page.setAttribute("data-role", "page");
                page.setAttribute("data-theme", "a");
                page.id = newPageID;
                page.setAttribute("data-url", newPageID);
                page.setAttribute("data-add-back-btn", "true");

                var header = document.createElement("div");
                header.setAttribute("data-role", "header");
                header.setAttribute("data-position", "fixed");
                page.appendChild(header);

                var h = document.createElement("h1");
                h.appendChild(document.createTextNode(detailHeader));
                header.appendChild(h);

                var lnkHome = document.createElement("a");
                lnkHome.setAttribute("href", "#home")
                lnkHome.appendChild(document.createTextNode("Home"));
                lnkHome.className = "ui-btn-right";
                header.appendChild(lnkHome)

                var content = document.createElement("div");
                content.setAttribute("data-role", "content");
                page.appendChild(content);

                var innerPanel = document.createElement("div");
                innerPanel.id = "innerPanel_" + events[i].getAttribute("RecordNumber");
                innerPanel.className = "wsu-content-panel";
                content.appendChild(innerPanel);

                //enable links to be shown in child browser
                var selector = "#" + innerPanel.id + " [href]";
                $(selector).die();
                $(selector).live("click", function () {
                    if (this.getAttribute("href").indexOf("http") > -1) {
                        API.showPage(this.getAttribute("href"));
                        return false;
                    }
                });

                var spTitle = document.createElement("span");
                spTitle.style.fontWeight = "bold";
                spTitle.appendChild(document.createTextNode(headingText));
                innerPanel.appendChild(spTitle);

                var pTime = document.createElement("p");
                pTime.appendChild(document.createTextNode(eventDate.firstChild.nodeValue));
                innerPanel.appendChild(pTime);

                var pPlace = document.createElement("p");
                pPlace.appendChild(document.createTextNode($("place", events[i])[0].firstChild.nodeValue));
                innerPanel.appendChild(pPlace);

                var divDetail = document.createElement("div");
                divDetail.innerHTML = detailText;
                innerPanel.appendChild(divDetail);

                document.body.appendChild(page);
            }

            document.getElementById(containerID).appendChild(ulCalendar);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying agenda");
            }
            $("#" + containerID).trigger("create");
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

            $("#home").trigger("pagebeforeshow");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
            console.warn("Error processing list of events");
            console.warn("Error message: " + e.message);
            }
        }
    }

    var start = new Date()
    start.setDate(start.getDate() - 1);
    var startDay = start.getDate();
    var startMonth = start.getMonth() + 1
    var startYear = start.getFullYear()
    var startDate = startMonth + "/" + startDay + "/" + startYear;
    try{
        var request = new API.datastoreRequest({ App: API.app, Action: "GetData", Key1: "Event", Key2: form, StartDate: startDate });
        $(".ui-loader").show();
        request.submitOnlineAsyncRequest(callback);
    }
    catch (e) {
        $(".ui-loader").hide();
        $("#" + unavailableID).removeClass("hidden");
        if (API.debug == true) {
            console.warn("ajax error in showHighlighted agenda");
            console.warn(e.message);
        }
    }
}

///// HIGHLIGHTED GOOGLE CALENDAR

API.showHighlightedGoogleCalendar = function (pageID, containerID, unavailableID, detailHeader, noItemsMessage, fIncrement, fDecrement, days, calendarPath) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showHighlightedGoogleCalendar executing...");
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
        console.log("DETAIL_HEADER = " + detailHeader);
        console.log("NO_EVENTS = " + noItemsMessage);
        console.log("fINCREMENT = " + fIncrement);
        console.log("fDECREMENT = " + fDecrement);
        console.log("DAYS = " + days);
        console.log("CONFIG_FILE = " + calendarPath);
        console.log("Last resumed: " + new Date(parseInt(API.lastChecked)).toString());
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var decrement = function (e) {
        fDecrement();
        $("." + e.currentTarget.getAttribute("newlabel")).addClass("wsu-hidden");
        $(e.currentTarget).unbind("click", decrement);
    }

    var callback = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Calendar feed:");
            console.log(data);
        }

        try {
            var xEvents = API.parseXML(data);
            var events = xEvents.getElementsByTagName("event");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + events.length + " data items");
            }

            var ulCalendar = document.createElement("ul");
            ulCalendar.setAttribute("data-role", "listview");
            ulCalendar.setAttribute("data-inset", "true");
            ulCalendar.setAttribute("data-filter", "true");
            ulCalendar.setAttribute("data-filter-theme", "a");
            ulCalendar.setAttribute("data-filter-placeholder", "Search...");

            if (events.length == 0) {
                var liNone = document.createElement("li");
                liNone.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.appendChild(document.createTextNode(noItemsMessage));
                liNone.appendChild(link);
                ulCalendar.appendChild(liNone);
            }

            var month = "";
            for (var i = 0; i < events.length; i++) {

                var published = Date.parse(events[i].getAttribute("published"));
                var eventTitle = $("title", events[i])[0].firstChild.nodeValue;

                var newMonth = events[i].getAttribute("month");
                if (newMonth != month) { //then insert list divider...
                    var li = document.createElement("li");
                    li.setAttribute("data-role", "list-divider");
                    li.style.fontWeight = "bold";
                    li.style.fontSize = "18px";
                    li.style.textAlign = "left";
                    li.appendChild(document.createTextNode(newMonth + " Events"));
                    ulCalendar.appendChild(li);
                    month = newMonth;
                }

                // create link
                var li = document.createElement("li");
                li.setAttribute("data-icon", "false"); 
                var link = document.createElement("a");
                link.setAttribute("href", "#pg_" + events[i].getAttribute("eventid"));

                if (published > API.lastChecked) {

                    fIncrement();

                    var sp = document.createElement("span");
                    sp.appendChild(document.createTextNode(" (New) "));
                    sp.className = "event_" + events[i].getAttribute("eventid");
                    link.setAttribute("newlabel", sp.className);
                    sp.style.color = "red";
                    sp.style.fontStyle = "italic";
                    link.appendChild(sp);

                    $(link).bind("click", decrement);

                    if (API.debug == true) {
                        console.log("Item " + i + ": " + eventTitle + " (new)");
                        //console.log(detailText);
                    }
                }
                else {
                    if (API.debug == true) {
                        console.log("Item " + i + ": " + eventTitle);
                        //console.log(detailText);
                    }
                }

                link.appendChild(document.createTextNode(eventTitle));
                link.style.marginBottom = "-10px";

                li.appendChild(link);

                var eventDate = document.createElement("p");
                if (events[i].getAttribute("time") == "12:00 AM") {
                    eventDate.appendChild(document.createTextNode(events[i].getAttribute("day")));
                }
                else {
                    eventDate.appendChild(document.createTextNode(events[i].getAttribute("day") + " " + events[i].getAttribute("time") + " to " + events[i].getAttribute("end")));
                }
                eventDate.style.fontSize = "12px";
                eventDate.style.marginLeft = "20px";
                li.appendChild(eventDate);

                 ulCalendar.appendChild(li);

                //create associated page

                var newPageID = "pg_" + events[i].getAttribute("eventid");
                $("#" + newPageID).remove(); //to remove page if it already exists...

                var page = document.createElement("div");
                page.setAttribute("data-role", "page");
                page.setAttribute("data-theme", "a");
                page.id = newPageID;
                page.setAttribute("data-url", newPageID);
                page.setAttribute("data-add-back-btn", "true");

                var header = document.createElement("div");
                header.setAttribute("data-role", "header");
                header.setAttribute("data-position", "fixed");
                page.appendChild(header);

                var h = document.createElement("h1");
                h.appendChild(document.createTextNode(detailHeader));
                header.appendChild(h);

                var lnkHome = document.createElement("a");
                lnkHome.setAttribute("href", "#home")
                lnkHome.appendChild(document.createTextNode("Home"));
                lnkHome.className = "ui-btn-right";
                header.appendChild(lnkHome)

                var content = document.createElement("div");
                content.setAttribute("data-role", "content");
                page.appendChild(content);

                var innerPanel = document.createElement("div");
                innerPanel.id = "innerPanel_" + events[i].getAttribute("eventid");;
                innerPanel.className = "wsu-content-panel";
                content.appendChild(innerPanel);

                //enable links to be shown in child browser
                var selector = "#" + innerPanel.id + " [href]";
                $(selector).die();
                $(selector).live("click", function () {
                    if (this.getAttribute("href").indexOf("http") > -1) {
                        API.showPage(this.getAttribute("href"));
                        return false;
                    }
                });

                var spTitle = document.createElement("span");
                spTitle.style.fontWeight = "bold";
                spTitle.appendChild(document.createTextNode($("title", events[i])[0].firstChild.nodeValue));
                innerPanel.appendChild(spTitle);

                var pTime = document.createElement("p");
                pTime.appendChild(document.createTextNode(eventDate.firstChild.nodeValue));
                innerPanel.appendChild(pTime);

                var pPlace = document.createElement("p");
                pPlace.appendChild(document.createTextNode($("location", events[i])[0].firstChild.nodeValue));
                innerPanel.appendChild(pPlace);

                var divDetail = document.createElement("div");
                divDetail.innerHTML = $("description", events[i])[0].firstChild.nodeValue;
                innerPanel.appendChild(divDetail);

                document.body.appendChild(page);

            }
            document.getElementById(containerID).appendChild(ulCalendar);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying calendar");
            }
            $("#" + containerID).trigger("create");
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

            $("#home").trigger("pagebeforeshow");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing activities");
                console.warn("Error message: " + e.message);
            }
        }
    }

    try {
        $(".ui-loader").show();
        API.getCalendarFeed(days, calendarPath, callback);
    }
    catch (e) {
        $(".ui-loader").hide();
        $("#" + unavailableID).removeClass("hidden");
        if (API.debug == true) {
            console.warn("ajax error in showHighlighted google calendar");
            console.warn(e.message);
        }
    }
}

﻿
//////////////////////////////
// STANDARD CONTENT //////////
//////////////////////////////

///// ACADEMIC CALENDAR

API.showAcademicCalendar = function (app, form, pageID, containerID, unavailableID, detailPageID) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showAcademicCalendar executing...");
        console.log("APP = " + app);
        console.log("TOOLKIT_FORM = " + form);
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var callback = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Data reply:");
            console.log(data);
        }

        if (data == "error") {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error retrieving calendar headings");
            }
           return false;
        }

        try {

            var ulList = document.createElement("ul");
            ulList.setAttribute("data-role", "listview");

            var xList = API.parseXML(data);
            var dataItems = xList.getElementsByTagName("dataitem");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + dataItems.length + " data items");
            }

            for (var i = 0; i < dataItems.length; i++) {

                var semester = $("title", dataItems[i])[0].firstChild.nodeValue;

                if (API.debug == true) {
                    console.log("Item " + i + ": " + semester);
                    //console.log(detail);
                }

                var li = document.createElement("li");
                li.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.setAttribute("semester", semester);
                link.appendChild(document.createTextNode(semester));
                $(link).bind("click", function () {
                    API.semester = this.getAttribute("semester"); //deliberately global variable
                    $.mobile.changePage("#" + detailPageID);
                });
                li.appendChild(link);

                ulList.appendChild(li);
            }

            document.getElementById(containerID).appendChild(ulList);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying academic calendar");
            }
            $(ulList).listview();
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing calendar headings");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var obj = { App: app, Action: "GetData", Key1: form, OrderBy: "Key2" };
    var request = new API.datastoreRequest(obj);
    $(".ui-loader").show();
    request.submitOnlineAsyncRequest(callback);
}

API.showCalendarDetail = function (pageID, containerID, unavailableID, headerID) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showCalendarDetail executing...");
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
        console.log("headerID = " + headerID);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var callbackSuccess = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Academic Calendar reply:");
            console.log(data);
        }
        
        try {
            var xEntries = API.parseXML(data);
            var entries = xEntries.getElementsByTagName("entry");

            if (entries.length == 0) {
                $("#" + unavailableID).removeClass("hidden");
                return false;
            }

            $("#" + headerID).text(API.semester);

            var ulList = document.createElement("ul");
            ulList.setAttribute("data-role", "listview");

            for (var i = 0; i < entries.length; i++) {

                var li = document.createElement("li");
                li.setAttribute("data-icon", "false");

                var tbl = document.createElement("table");

                var row = document.createElement("tr");
                tbl.appendChild(row);

                var cell1 = document.createElement("td");
                cell1.setAttribute("valign", "top");
                cell1.setAttribute("width", "90px");
                cell1.appendChild(document.createTextNode(entries[i].getAttribute("date")));
                row.appendChild(cell1);

                var cell2 = document.createElement("td");
                cell2.appendChild(document.createTextNode($("desc", entries[i])[0].firstChild.nodeValue));
                row.appendChild(cell2);

                li.appendChild(tbl);

                ulList.appendChild(li);

            }

            document.getElementById(containerID).appendChild(ulList);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying calendar detail");
            }
            $(ulList).listview();
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing calendar entries");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var callbackFailure = function (request, status, error) {
        $(".ui-loader").hide();
        $("#" + unavailableID).removeClass("hidden");
        if (API.debug == true) {
            console.warn(request.status);
            console.warn(status);
            console.warn(error);
        }
    }

    $(".ui-loader").show();
    $.ajax({
        type: "GET",
        cache: false,
        url: API.server + "/Platform2/AcadCalendar.aspx?semester=" + API.semester,
        success: callbackSuccess,
        error: callbackFailure
    });
}

///// A-Z INDEX

API.showAtoZIndex = function (pageID, containerID, unavailableID) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showAtoZIndex executing...");
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var showResults = function (container, data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("A-Z index reply:");
            console.log(data);
        }
        
        try {
            var xTitles = API.parseXML(data);
            var titles = xTitles.getElementsByTagName("item");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + titles.length + " data items");
            }

            var ulList = document.createElement("ul");
            ulList.setAttribute("data-role", "listview");
            ulList.setAttribute("data-inset", "true");
            container.appendChild(ulList);

            for (var i = 0; i < titles.length; i++) {

                var headingText = titles[i].firstChild.firstChild.nodeValue;
                var url = titles[i].childNodes[1].firstChild.nodeValue;

                if (API.debug == true) {
                    console.log("Item " + i + ": " + headingText);
                    console.log(url)
                }

                //create links
                var li = document.createElement("li");
                li.setAttribute("data-icon", "false");
                li.style.fontSize = "14px";

                var link = document.createElement("a");
                link.setAttribute("url", url);
                link.setAttribute("href", "");
                link.appendChild(document.createTextNode(headingText));
                li.appendChild(link);

                ulList.appendChild(li);

                $(link).bind("click", function () {
                    API.showPage(this.getAttribute("url"));
                    return false;
                });

            }

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying list of websites");
            }
            $(ulList).listview();
        }
        catch (e) {
            $(container).html("<p>Temporarily unavailable</p>");
            if (API.debug == true) {
                console.warn("Error processing index entries");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var performLookup = function (item) {
        if (API.debug == true) {
            console.log("");
            console.log("Performing lookup of letter " + item.id);
        }
        var firstLetter = item.id;
        var container = $("div", item)[0];
        $(".ui-loader").show();
        $.ajax({
            type: "GET",
            cache: false,
            url: API.server + "/Platform2/AtoZ.aspx?firstLetter=" + firstLetter + "&r=" + (Math.random() * 10),
            success: function(data){
                showResults(container,data);
            },
            error: function (request, status, error) {
                $(".ui-loader").hide();
                $(container).html("<p>Temporarily unavailable</p>");
                if (API.debug == true) {
                    console.warn(request.status);
                    console.warn(status);
                    console.warn(error);
                }
            }
        });
    }

    try {
        var html = "";
        html += "<div data-role='collapsible-set'>";
        html += "<div id='collapsibleContainer'>";
        html += "<div data-role='collapsible' data-collapsed='true' id='A'><h3>A</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true' id='B'><h3>B</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='C'><h3>C</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='D'><h3>D</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='E'><h3>E</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='F'><h3>F</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='G'><h3>G</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='H'><h3>H</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='I'><h3>I</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='J'><h3>J</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='K'><h3>K</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='L'><h3>L</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='M'><h3>M</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='N'><h3>N</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='O'><h3>O</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='P'><h3>P</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='Q'><h3>Q</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='R'><h3>R</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='S'><h3>S</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='T'><h3>T</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='U'><h3>U</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='V'><h3>V</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='W'><h3>W</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='X'><h3>X</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='Y'><h3>Y</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='Z'><h3>Z</h3></div>";
        html += "</div>";
        html += "</div>";

        $("#" + containerID)[0].innerHTML = html;
        $("#collapsibleContainer div", $("#" + containerID)).each(function () {
            this.onexpand = function () {
                performLookup(this);
            }
            this.oncollapse = function () {
                $("div", this)[0].innerHTML = "";
            }
        });

        $("#" + containerID).removeClass("hidden");
        $("#" + pageID).attr("data-initialized", "true");

    }
    catch (e) {
        $("#" + unavailableID).removeClass("hidden");
        if (API.debug == true) {
            console.warn("Error showing A-Z index form");
            console.warn("Error message: " + e.message);
        }
    }

}

///// ATHLETICS - SCHEDULES

API.showSchedule = function (pageID, containerID, unavailableID) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showSchedule executing...");
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var callbackSuccess = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Schedules reply:");
            console.log(data);
        }

        try {
            var xNews = API.parseXML(data);
            var news = xNews.getElementsByTagName("item");

            if (API.debug == true) {
                console.log("Processing " + news.length + " data items");
            }

            var ulNews = document.createElement("ul");
            ulNews.setAttribute("data-role", "listview");
            ulNews.setAttribute("data-inset", "true");
            ulNews.setAttribute("data-filter", "true");
            ulNews.setAttribute("data-filter-theme", "a");
            ulNews.setAttribute("data-filter-placeholder", "Search...");
      
            if (news.length == 0) {
                var liNone = document.createElement("li");
                liNone.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.appendChild(document.createTextNode("No events scheduled..."));
                liNone.appendChild(link);
                ulNews.appendChild(liNone);
            }

            for (var i = 0; i < news.length; i++) {

                var headingText = $("title", news[i])[0].firstChild.nodeValue;
                var url = $("link", news[i])[0].firstChild.nodeValue;

                if (API.debug == true) {
                    console.log("Item " + i + ": " + headingText);
                    console.log(url)
                }

                //create link
                var li = document.createElement("li");
                li.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.setAttribute("href", "");
                link.setAttribute("url", $("link", news[i])[0].firstChild.nodeValue);
                $(link).bind("click", function () {
                    API.showPage(this.getAttribute("url"));
                });

                link.appendChild(document.createTextNode($("title", news[i])[0].firstChild.nodeValue));
                link.style.marginBottom = "-5px";
                li.appendChild(link);

                ulNews.appendChild(li);

            }
            document.getElementById(containerID).appendChild(ulNews);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying schedule");
            }
            $("#" + containerID).trigger("create");
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing schedules");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var callbackFailure = function (request, status, error) {
        $(".ui-loader").hide();
        $("#" + unavailableID).removeClass("hidden");
        if (API.debug == true) {
            console.warn(request.status);
            console.warn(status);
            console.warn(error);
        }
    }

    var request = "<Request ";
    request += "Method='GET' ";
    request += "URL='http://www.weberstatesports.com/rss.dbml'>";
    request += "<Query>";
    request += "<![CDATA[";
    request += "";
    request += "db_oem_id=8600&media=schedules";
    request += "";
    request += "]]>";
    request += "</Query>";
    request += "<ErrorMessage></ErrorMessage>";
    request += "</Request>";
    request += "";

    if (API.debug == true) {
        console.log("");
        console.log("Schedules request:");
        console.log(request);
    }

    $(".ui-loader").show();
    $.ajax({
        type: "POST",
        cache: false,
        url: API.server + "/Platform2/ajaxproxy.aspx" + "?r=" + (Math.random() * 10),
        data: { rq: request },
        success: callbackSuccess,
        error: callbackFailure
    });
}

///// ATHLETICS - SCORES

API.showScores = function (pageID, containerID, unavailableID) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showScores executing...");
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var callbackSuccess = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Scores reply:");
            console.log(data);
        }

        try {
            var xNews = API.parseXML(data);
            var news = xNews.getElementsByTagName("item");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + news.length + " data items");
            }

            var ulNews = document.createElement("ul");
            ulNews.setAttribute("data-role", "listview");
            ulNews.setAttribute("data-inset", "true");
            ulNews.setAttribute("data-filter", "true");
            ulNews.setAttribute("data-filter-theme", "a");
            ulNews.setAttribute("data-filter-placeholder", "Search...");
            

            if (news.length == 0) {
                var liNone = document.createElement("li");
                liNone.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.appendChild(document.createTextNode("No scores posted..."));
                liNone.appendChild(link);
                ulNews.appendChild(liNone);
            }

            for (var i = 0; i < news.length; i++) {

                var headingText = $("title", news[i])[0].firstChild.nodeValue;
                var url = $("link", news[i])[0].firstChild.nodeValue;

                if (API.debug == true) {
                    console.log("Item " + i + ": " + headingText);
                    console.log(url)
                }

                //create link
                var li = document.createElement("li");
                li.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.setAttribute("href", "");
                link.setAttribute("url", $("link", news[i])[0].firstChild.nodeValue);
                $(link).bind("click", function () {
                    API.showPage(this.getAttribute("url"));
                });

                link.appendChild(document.createTextNode($("title", news[i])[0].firstChild.nodeValue));
                link.style.marginBottom = "-5px";
                li.appendChild(link);

                ulNews.appendChild(li);

            }
            document.getElementById(containerID).appendChild(ulNews);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying list of scores");
            }
            $("#" + containerID).trigger("create");
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing scores");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var callbackFailure = function (request, status, error) {
        $(".ui-loader").hide();
        $("#" + unavailableID).removeClass("hidden");
        if (API.debug == true) {
            console.warn(request.status);
            console.warn(status);
            console.warn(error);
        }
    }

    var request = "<Request ";
    request += "Method='GET' ";
    request += "URL='http://www.weberstatesports.com/rss.dbml'>";
    request += "<Query>";
    request += "<![CDATA[";
    request += "";
    request += "db_oem_id=8600&media=results";
    request += "";
    request += "]]>";
    request += "</Query>";
    request += "<ErrorMessage></ErrorMessage>";
    request += "</Request>";
    request += "";

    if (API.debug == true) {
        console.log("");
        console.log("Scores request:");
        console.log(request);
    }

    $(".ui-loader").show();
    $.ajax({
        type: "POST",
        cache: false,
        url: API.server + "/Platform2/ajaxproxy.aspx" + "?r=" + (Math.random() * 10),
        data: { rq: request },
        success: callbackSuccess,
        error: callbackFailure
    });
}

///// FACULTY-STAFF INDEX

API.showFaculty = function (pageID, containerID, unavailableID, detailHeader) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showFaculty executing...");
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
        console.log("DETAIL_HEADER = " + detailHeader);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var showResults = function (container, data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Data reply:");
            console.log(data);
        }

        if (data == "error") {
            if (API.debug == true) {
                console.warn("Error retrieving list items");
            }
            $(container).html("<p>Temporarily unavailable.</p>");
            return false;
        }

        try {

            var detailHeader = $(container).data("detailHeader");
            //var swatch = $(container).data("swatch");

            var xList = API.parseXML(data);
            var dataItems = xList.getElementsByTagName("Table");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + dataItems.length + " data items");
            }

            var ulList = document.createElement("ul");
            ulList.setAttribute("data-role", "listview");
            ulList.setAttribute("data-inset", "true");
            ulList.setAttribute("data-filter", "true");
            ulList.setAttribute("data-filter-theme", "a");
            ulList.setAttribute("data-filter-placeholder", "Search...");
            container.innerHTML = "";

            for (var i = 0; i < dataItems.length; i++) {

                var headingText = $("FS_NAME", dataItems[i])[0].firstChild.nodeValue;

                if (API.debug == true) {
                    console.log("Item " + i + ": " + headingText);
                }

                //create link
                var li = document.createElement("li");
                li.setAttribute("data-icon", "false"); 
                var link = document.createElement("a");
                link.setAttribute("href", "#fs_" + i);
                link.appendChild(document.createTextNode(headingText));
                li.appendChild(link);

                ulList.appendChild(li);

                //create associated page

                //first remove any existing page
                $("#fs_" + i).remove();

                var page = document.createElement("div");
                page.setAttribute("data-role", "page");
                page.setAttribute("data-theme", "a");
                page.setAttribute("data-add-back-btn", "true");
                page.id = "fs_" + i;
                page.setAttribute("data-url", page.id);
                page.setAttribute("data-add-back-btn", "true");

                var header = document.createElement("div");
                header.setAttribute("data-role", "header");
                page.appendChild(header);

                var h = document.createElement("h1");
                h.appendChild(document.createTextNode(detailHeader));
                header.appendChild(h);

                var lnkHome = document.createElement("a");
                lnkHome.setAttribute("href", "#home")
                lnkHome.setAttribute("data-transition", "fade")
                lnkHome.appendChild(document.createTextNode("Home"));
                lnkHome.className = "ui-btn-right";
                header.appendChild(lnkHome)

                var content = document.createElement("div");
                content.setAttribute("data-role", "content");
                page.appendChild(content);

                var innerPanel = document.createElement("div");
                innerPanel.id = "innerPanel";
                innerPanel.className = "wsu-content-panel";
                content.appendChild(innerPanel);

                var detail = "";

                try {
                    detail += "<p><b>" + $("FS_NAME", dataItems[i])[0].firstChild.nodeValue + "</b></p>"
                }
                catch (e) {
                    if (API.debug == true) {
                        console.log("name unavailable");
                    }
                }

                try {
                    detail += "<p>" + $("FS_DEPT", dataItems[i])[0].firstChild.nodeValue + "</p>"
                }
                catch (e) {
                    if (API.debug == true) {
                        console.log("department unavailable");
                    }
                }

                try {
                    var phone = "";
                    phone = $("FS_PHONE", dataItems[i])[0].firstChild.nodeValue;
                    detail += "<p>" + phone + "</p>"
                    phone = phone.replace("(", "");
                    phone = phone.replace(")", "");
                    phone = phone.replace(" ", "");
                    phone = phone.replace("-", "");
                }
                catch (e) {
                    if (API.debug == true) {
                        console.log("phone unavailable");
                    }
                }

                try {
                    var email = "";
                    email = $("FS_EMAIL", dataItems[i])[0].firstChild.nodeValue;
                    detail += "<p>" + email + "</p>"
                }
                catch (e) {
                    if (API.debug == true) {
                        console.log("email unavailable");
                    }
                }

                try {
                    detail += '<div class="ui-grid-a">';
                    detail += '<div class="ui-block-a">';
                    if (email != "") {
                        detail += '<a id="btnEmail" data-role="button" '
                        detail += 'href="mailto://' + email + '" ';
                        detail += 'class="wsu-button-icon" data-icon="false" style="background-image: url(images/18-envelope.png);">';
                        detail += 'Email';
                        detail += '</a>';
                    }
                    detail += '</div>';
                    detail += '<div class="ui-block-b">';
                    if (phone != "") {
                        detail += '<a id="btnPhone" data-role="button" '
                        detail += 'href="tel://' + phone + '" ';
                        detail += 'class="wsu-button-icon wsu-phone-only" data-icon="false" style="background-image: url(images/75-phone.png);">';
                        detail += 'Call';
                        detail += '</a>';
                    }
                    detail += '</div>';
                    detail += '</div>';

                    $(innerPanel).html(detail);
                }
                catch (e) {
                    if (API.debug == true) {
                        console.warn("Error creating phone and email buttons");
                        console.warn("Error message: " + e.message);
                    }
                }

                document.body.appendChild(page);

            }
            container.appendChild(ulList);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying list of faculty");
            }
            $(container).trigger("create");
        }
        catch (e) {
            if (API.debug == true) {
                console.warn("Error processing list items");
                console.warn("Error message: " + e.message);
            }
            $(container).html("<p>Temporarily unavailable.</p>");
        }

    }

    var performLookup = function (item) {
        if (API.debug == true) {
            console.log("");
            console.log("Performing lookup of letter " + item.id);
        }
        $(".ui-loader").show();
        var container = $("div", item)[0];
        $(container).data("detailHeader", detailHeader);
        //$(container).data("swatch", swatch);

        $.ajax({
            type: "GET",
            url: API.server + "/Platform2/FS.aspx?firstLetter=" + item.id + "&r=" + (Math.random() * 10),
            success: function (data) {
                showResults(container, data);
            },
            error: function (request, status, error) {
                $(".ui-loader").hide();
                if (API.debug == true) {
                    console.warn(request.status);
                    console.warn(status);
                    console.warn(error);
                }
                $(container).html("<p>Temporarily unavailable</p>");
            }
        });
    }

    try {

        var html = "";
        html += "<div data-role='collapsible-set'>";
        html += "<div id='collapsibleContainer'>";
        html += "<div data-role='collapsible' data-collapsed='true' id='A'><h3>A</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true' id='B'><h3>B</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='C'><h3>C</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='D'><h3>D</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='E'><h3>E</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='F'><h3>F</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='G'><h3>G</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='H'><h3>H</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='I'><h3>I</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='J'><h3>J</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='K'><h3>K</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='L'><h3>L</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='M'><h3>M</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='N'><h3>N</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='O'><h3>O</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='P'><h3>P</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='Q'><h3>Q</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='R'><h3>R</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='S'><h3>S</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='T'><h3>T</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='U'><h3>U</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='V'><h3>V</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='W'><h3>W</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='X'><h3>X</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='Y'><h3>Y</h3></div>";
        html += "<div data-role='collapsible' data-collapsed='true'' id='Z'><h3>Z</h3></div>";
        html += "</div>";
        html += "</div>";

        $("#" + containerID)[0].innerHTML = html;
        $("#collapsibleContainer div", $("#" + containerID)).each(function () {
            this.onexpand = function () {
                performLookup(this);
            }
            this.oncollapse = function () {
                $("div", this)[0].innerHTML = ""; 
            }
        });

        $("#" + containerID).removeClass("hidden");
        $("#" + pageID).attr("data-initialized", "true");

    }
    catch (e) {
        $("#" + unavailableID).removeClass("hidden");
        if (API.debug == true) {
            console.warn("Error showing FS index form");
            console.warn("Error message: " + e.message);
        }
    }

}

///// SEARCH

API.showSearchForm = function (pageID, containerID, unavailableID) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showSearchForm executing...");
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var performSearch = function() {

        $("#ulSearch").remove();

        var tbSearch = $("#tbSearch")[0];

        if (API.debug == true) {
            console.log("");
            console.log("Searching for " + tbSearch.value);
        }

        var search = encodeURIComponent(tbSearch.value);
        var query = "q="
        query += search;
        query += "&proxystylesheet=default_mobile";
        query += "&client=default_mobile";
        query += "&site=default_collection";
        query += "&output=xml_no_dtd";
        query += "";

        var request = "<Request ";
        request += "Method='GET' ";
        request += "URL='http://search.weber.edu/search'>";
        request += "<Query>";
        request += "<![CDATA[";
        request += "";
        request += query;
        request += "";
        request += "]]>";
        request += "</Query>";
        request += "<ErrorMessage></ErrorMessage>";
        request += "</Request>";
        request += "";

        if (API.debug == true) {
            console.log("");
            console.log("Search request:");
            console.log(request);
        }

        $(".ui-loader").show();
        $.ajax({
            type: "POST",
            cache: false,
            url: API.server + "/Platform2/ajaxproxy.aspx" + "?r=" + (Math.random() * 10),
            data: { rq: request },
            success: showSearchResults,
            error: function (request, status, error) {
                $(".ui-loader").hide();
                var pUnavailable = document.createElement("p");
                pUnavailable.appendChild(document.createTextNode("Temporarily unavailable."));
                $(pUnavailable).insertAfter("#divSearchResults");
                if (API.debug == true) {
                    console.warn(request.status);
                    console.warn(status);
                    console.warn(error);
                }
            }
        });
    }

    var showSearchResults = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Search results:");
            console.log(data);
        }
        
        try {
            $("#divSearchResults").html(data);
            $("#header").remove();
            $("#divmain table").remove();
            $("#divSearchResults hr").remove();
            $(".ui-loader").hide();

            var ulSearch = document.createElement("ul");
            ulSearch.id = "ulSearch";

            ulSearch.setAttribute("data-role", "listview");
            ulSearch.setAttribute("data-inset", "true");
            $(ulSearch).insertAfter("#divSearchResults");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + $("#divSearchResults a").length + " data items");
            }

            if ($("#divSearchResults a").length == 0) {
                var li = document.createElement("li");
                li.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.setAttribute("href", "");
                link.appendChild(document.createTextNode("No results found..."));
                li.appendChild(link);
                ulSearch.appendChild(li);
            }

            $("#divSearchResults a").each(function (index) {

                var linkText = this.text;

                if (API.debug == true) {
                    console.log("Item " + index + ": " + linkText);
                    console.log(this.href)
                }

                if (linkText.indexOf("omitted results") < 1) {
                    var li = document.createElement("li");
                    li.setAttribute("data-icon", "false");
                    var link = document.createElement("a");
                    link.setAttribute("href", "");
                    link.setAttribute("url", this.href);
                    link.appendChild(document.createTextNode(linkText));
                    $(link).bind("click", function () {
                        API.showPage(this.getAttribute("url"));
                        return false;
                    });

                    li.appendChild(link);
                    ulSearch.appendChild(li);
                }
            });

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying list of search results");
            }
            $(ulSearch).listview();

        }
        catch (e) {
            $(".ui-loader").hide();
            if (API.debug == true) {
                console.warn("Error processing search results");
                console.warn("Error message: " + e.message);
            }
            var pUnavailable = document.createElement("p");
            pUnavailable.appendChild(document.createTextNode("Temporarily unavailable."));
            $(pUnavailable).insertAfter("#divSearchResults");
            $(ulSearch).remove();
        }
        finally {
            $(".ui-loader").hide();
            $("#divSearchResults").empty();
        }
    }

    try {
        var html = "";
        html += "<input type='search' name='tbSearch' id='tbSearch' />";
        html += "<button id='btnSearch'>Search</button>";
        html += "<div id='divSearchResults'></div>";
        html += "";

        $("#" + containerID)[0].innerHTML += html;
        $("#btnSearch").bind("click", function () {
            performSearch();
        });

        $("#" + containerID).removeClass("hidden");
        $("#" + pageID).attr("data-initialized", "true");

    }
    catch (e) {
        $("#" + unavailableID).removeClass("hidden");
        if (API.debug == true) {
            console.warn("Error displaying search form");
            console.warn("Error message: " + e.message);
        }
    }

}

///// SIGNPOST

API.showSignpost = function (pageID, containerID, unavailableID) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showSignpost executing...");
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var callbackSuccess = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Reply:");
            console.log(data);
        }

        try {
            var xNews = API.parseXML(data);
            var news = xNews.getElementsByTagName("item");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + news.length + " data items");
            }

            var ulNews = document.createElement("ul");
            ulNews.setAttribute("data-role", "listview");
            ulNews.setAttribute("data-inset", "true");
            ulNews.setAttribute("data-filter", "true");
            ulNews.setAttribute("data-filter-theme", "a");
            ulNews.setAttribute("data-filter-placeholder", "Search...");
            
            if (news.length == 0) {
                var liNone = document.createElement("li");
                liNone.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.appendChild(document.createTextNode("No stories posted..."));
                liNone.appendChild(link);
                ulNews.appendChild(liNone);
            }

            for (var i = 0; i < news.length; i++) {

                var headingText = $("title", news[i])[0].firstChild.nodeValue;
                var url = $("link", news[i])[0].firstChild.nodeValue;

                if (API.debug == true) {
                    console.log("Item " + i + ": " + headingText);
                    console.log(url)
                }

                //create link
                var li = document.createElement("li");
                li.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.setAttribute("href", "");
                link.setAttribute("url", $("link", news[i])[0].firstChild.nodeValue);
                $(link).bind("click", function () {
                    API.showPage(this.getAttribute("url"));
                });

                link.appendChild(document.createTextNode($("title", news[i])[0].firstChild.nodeValue));
                link.style.marginBottom = "-5px";
                li.appendChild(link);

                ulNews.appendChild(li);

            }
            document.getElementById(containerID).appendChild(ulNews);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying list of stories");
            }
            $("#" + containerID).trigger("create");
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing stories");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var callbackFailure = function (request, status, error) {
        $(".ui-loader").hide();
        $("#" + unavailableID).removeClass("hidden");
        if (API.debug == true) {
            console.warn(request.status);
            console.warn(status);
            console.warn(error);
        }
    }

    var request = "<Request ";
    request += "Method='POST' ";
    //request += "URL='http://www.wsusignpost.com/feed'>";
    request += "URL='http://www.wsusignpost.com/custom-feed'>";
    request += "<Query>";
    request += "<![CDATA[";
    request += "";
    request += "";
    request += "";
    request += "]]>";
    request += "</Query>";
    request += "<ErrorMessage></ErrorMessage>";
    request += "</Request>";
    request += "";

    if (API.debug == true) {
        console.log("");
        console.log("Signpost request:");
        console.log(request);
    }

    //$(".ui-loader").show();
    $(".ui-loader").show();
    $.ajax({
        type: "POST",
        cache: false,
        url: API.server + "/Platform2/ajaxproxy.aspx" + "?r=" + (Math.random() * 10),
        data: { rq: request },
        success: callbackSuccess,
        error: callbackFailure
    });
}

/////  TEXT SUBMISSION

API.showTextSubmissionForm = function (pageID, containerID, unavailableID, fieldLabel, to, from, subject) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showTextSubmissionForm executing...");
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
        console.log("FIELD_LABEL = " + fieldLabel);
        console.log("TO = " + to);
        console.log("FROM = " + from);
        console.log("SUBJECT = " + subject);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    function emailText(to, from, subject, body) {
        var xml = "<email to='";
        xml += to;
        xml += "' from='";
        xml += from;
        xml += "' action='SendEmail'>";
        xml += "";
        xml += "<subject><![CDATA[";
        xml += subject;
        xml += "]]></subject>";
        xml += "<body><![CDATA[";
        xml += body;
        xml += "]]></body>";
        xml += "";
        xml += "<exception><![CDATA[NONE]]></exception>";
        xml += "";
        xml += "</email>";

        if (API.debug == true) {
            console.log("");
            console.log("Text submission:");
            console.log(xml);
        }

        $.ajax({
            type: "POST",
            async: false,
            url: API.server + "/Platform2/Messenger.aspx",
            data: { a: xml }
        });

        $("#txtField_" + containerID).val("");
        $("#pThanks_" + containerID)[0].style.display = "";
    }

    try {
        var html = "";
        html += "<div class='wsu-content-panel'>";
        html += "<label for='txtField_" + containerID + "'>";
        html += fieldLabel;
        html += "</label><textarea name='txtField' id='txtField_" + containerID + "' value=''></textarea>";
        html += "";
        html += "<div class='ui-grid-a'>";
        html += "<div class='ui-block-a'>";
        html += "<button id='btnSubmitUserText_" + containerID + "' data-inline='true'>Submit</button>";
        html += "</div>";
        html += "<div class='ui-block-b'>";
        html += "<p id='pThanks_" + containerID + "' style='display:none;'>Thank you!</p>";
        html += "</div></div>";
        html += "";

        document.getElementById(containerID).innerHTML = html;

        var $btnSend = $("#btnSubmitUserText_" + containerID);
        $btnSend.data("to", to);
        $btnSend.data("from", from);
        $btnSend.data("subject", subject);
        $btnSend.bind("click", function () {
            emailText($(this).data("to"), $(this).data("from"), $(this).data("subject"), $("#txtField_" + containerID).val())
        });

        if (API.debug == true) {
            console.log("");
            console.log("Displaying text submission form");
        }
        $("#" + containerID).removeClass("hidden");

    }
    catch (e) {
        $("#" + unavailableID).removeClass("hidden");
        if (API.debug == true) {
            console.warn("Error displaying form");
            console.warn("Error message: " + e.message);
        }
    }
}

///// UNIVERSITY CALENDAR

API.showUniversityCalendar = function (pageID, containerID, unavailableID, period) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showUniversityCalendar executing...");
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
        console.log("PERIOD = " + period);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var callbackSuccess = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Data reply:");
            console.log(data);
        }

        try{
            var ulNews = document.createElement("ul");
            ulNews.setAttribute("data-role", "listview");
            ulNews.setAttribute("data-inset", "true");
            ulNews.setAttribute("data-filter", "true");
            ulNews.setAttribute("data-filter-theme", "a");
            ulNews.setAttribute("data-filter-placeholder", "Search...");           

            var xNews = API.parseXML(data);
            var news = xNews.getElementsByTagName("item");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + news.length + " data items");
            }

            if (news.length == 0) {
                var liNone = document.createElement("li");
                liNone.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.appendChild(document.createTextNode("No events listed..."));
                liNone.appendChild(link);
                ulNews.appendChild(liNone);
            }

            var eventDate = "";
            var weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
            var monthname = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
            for (var i = 0; i < news.length; i++) {
            
                //add list dividers
                var newEventDate = $("pubDate", news[i])[0].firstChild.nodeValue;
                var d = new Date(newEventDate);
                var displayDate = weekday[d.getDay()] + " " + monthname[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
                if (displayDate != eventDate) { 
                    var li = document.createElement("li");
                    li.setAttribute("data-role", "list-divider");
                    li.style.fontWeight = "bold";
                    li.style.fontSize = "18px";
                    li.style.textAlign = "left";
                    li.appendChild(document.createTextNode(displayDate));
                    ulNews.appendChild(li);
                    eventDate = displayDate;
                }

                if (news[i].childNodes.length > 0) {

                    if (API.debug == true) {
                        console.log("Item " + i + ": " + $("title", news[i])[0].firstChild.nodeValue);
                        //console.log(url)
                    }

                    //create link
                    var li = document.createElement("li");
                    li.setAttribute("data-icon", "false");
                    var link = document.createElement("a");
                    link.setAttribute("href", "");
                    link.setAttribute("detail", $("link", news[i])[0].firstChild.nodeValue);
                    link.appendChild(document.createTextNode($("title", news[i])[0].firstChild.nodeValue));
                    link.style.marginBottom = "-10px";

                    $(link).bind("click", function () {
                        var pageID = this.getAttribute("detail");
                        API.showPage(pageID);
                    });

                    li.appendChild(link);

                    var pDate = document.createElement("p");
                    pDate.appendChild(document.createTextNode($("description", news[i])[0].firstChild.nodeValue));
                    pDate.style.fontSize = "12px";
                    pDate.style.marginLeft = "20px";
                    li.appendChild(pDate)

                    ulNews.appendChild(li);
                }

            }
            document.getElementById(containerID).appendChild(ulNews);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying calendar");
            }
            $("#" + containerID).trigger("create");
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

        }
        catch (e) {
            $(".ui-loader").hide();
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing list of events");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var callbackFailure = function (request, status, error) {
        $(".ui-loader").hide();
        $("#" + unavailableID).removeClass("hidden");
        if (API.debug == true) {
            console.warn(request.status);
            console.warn(status);
            console.warn(error);
        }
    }

    var request = "<Request ";
    request += "Method='GET' ";
    request += "URL='http://calendar.weber.edu/MasterCalendar/RSSFeeds.aspx'>";
    request += "<Query>";
    request += "<![CDATA[";
    request += "";
    switch (period.toLowerCase()) {
        case "day":
            request += "data=rWVImWG4wi1iC5u2UcXAOVIjZdLrCi69";
            break;
        case "week":
            request += "data=xK80F%2fbc%2f4UErlXy9atsfx6lnGZOqCub";
            break;
        case "month":
            request += "data=VXLCORHhDCF9BYlLwAXiIBLaBOwSlz6Ncpsn8NjfFWo%3d";
            break;
        case "all":
            request += "data=mL1noRCrG1I%2fLTuo7OuVKwiWqpd%2bKgZjsxXcoRqQWhc%3d";
            break;
        default:
            request += "data=rWVImWG4wi1iC5u2UcXAOVIjZdLrCi69";
    }
    request += "";
    request += "]]>";
    request += "</Query>";
    request += "<ErrorMessage></ErrorMessage>";
    request += "</Request>";
    request += "";

    if (API.debug == true) {
        console.log("");
        console.log("University calendar request:");
        console.log(request);
    }

    $(".ui-loader").show();
    $.ajax({
        type: "POST",
        cache: false,
        url: API.server + "/Platform2/ajaxproxy.aspx",
        data: { rq: request },
        success: callbackSuccess,
        error: callbackFailure
    });
}

///// WEEK AT A GLANCE

API.showWeek = function (pageID, containerID, unavailableID, detailHeader, noItemsMessage, calendarPath) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showWeek executing...");
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
        console.log("DETAIL_HEADER = " + detailHeader);
        console.log("NO_ITEMS_MESSAGE = " + noItemsMessage);
        console.log("CONFIG_FILE = " + calendarPath);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var callback = function (data) {

        $(".ui-loader").hide();
        
        if (API.verbose == true) {
            console.log("");
            console.log("Data reply:");
            console.log(data);
        }

        try {
            var ulCalendar = document.createElement("ul");
            ulCalendar.setAttribute("data-role", "listview");
            ulCalendar.setAttribute("data-inset", "true");
            
            var xEvents = API.parseXML(data);
            var events = xEvents.getElementsByTagName("event");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + events.length + " data items");
            }

            if (events.length == 0) {
                var liNone = document.createElement("li");
                liNone.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.appendChild(document.createTextNode(noItemsMessage));
                liNone.appendChild(link);
                ulCalendar.appendChild(liNone);
            }

            var day = "";
            for (var i = 0; i < events.length; i++) {

                var published = Date.parse(events[i].getAttribute("published"));

                var newDay = events[i].getAttribute("day");
                if (newDay != day) { //then insert list divider...
                    var li = document.createElement("li");
                    li.setAttribute("data-role", "list-divider");
                    li.style.fontWeight = "bold";
                    li.style.fontSize = "18px";
                    li.style.textAlign = "left";
                    li.appendChild(document.createTextNode(newDay));
                    ulCalendar.appendChild(li);
                    day = newDay;
                }

                if (API.debug == true) {
                    console.log("Item " + i + ": " + $("title", events[i])[0].firstChild.nodeValue);
                    //console.log(url)
                }

                var li = document.createElement("li");
                li.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.setAttribute("href", "#pg_" + events[i].getAttribute("eventid"));

                link.appendChild(document.createTextNode($("title", events[i])[0].firstChild.nodeValue));
                link.style.marginBottom = "-10px";

                li.appendChild(link);

                var eventDate = document.createElement("p");
                if (events[i].getAttribute("time") == "12:00 AM") {
                    eventDate.appendChild(document.createTextNode(events[i].getAttribute("day")));
                }
                else {
                    eventDate.appendChild(document.createTextNode(events[i].getAttribute("day") + " " + events[i].getAttribute("time") + " to " + events[i].getAttribute("end")));
                }
                eventDate.style.fontSize = "12px";
                eventDate.style.marginLeft = "20px";
                li.appendChild(eventDate);

                ulCalendar.appendChild(li);

                //create associated page
                var newPageID = "pg_" + events[i].getAttribute("eventid");
                $("#" + newPageID).remove(); //to remove page if it already exists...

                var page = document.createElement("div");
                page.setAttribute("data-role", "page");
                page.setAttribute("data-theme", "a");
                page.id = newPageID
                page.setAttribute("data-url", newPageID);
                page.setAttribute("data-add-back-btn", "true");

                var header = document.createElement("div");
                header.setAttribute("data-role", "header");
                header.setAttribute("data-position", "fixed");
                page.appendChild(header);

                var h = document.createElement("h1");
                h.appendChild(document.createTextNode(detailHeader));
                header.appendChild(h);

                var lnkHome = document.createElement("a");
                lnkHome.setAttribute("href", "#home")
                 lnkHome.appendChild(document.createTextNode("Home"));
                lnkHome.className = "ui-btn-right";
                header.appendChild(lnkHome)

                var content = document.createElement("div");
                content.setAttribute("data-role", "content");
                page.appendChild(content);

                var innerPanel = document.createElement("div");
                innerPanel.id = "innerPanel_" + events[i].getAttribute("eventid");;
                innerPanel.className = "wsu-content-panel";
                content.appendChild(innerPanel);

                //enable links to be shown in child browser
                var selector = "#" + innerPanel.id + " [href]";
                $(selector).die();
                $(selector).live("click", function () {
                    if (this.getAttribute("href").indexOf("http") > -1) {
                        API.showPage(this.getAttribute("href"));
                        return false;
                    }
                });

                var spTitle = document.createElement("span");
                spTitle.style.fontWeight = "bold";
                spTitle.appendChild(document.createTextNode($("title", events[i])[0].firstChild.nodeValue));
                innerPanel.appendChild(spTitle);

                var pTime = document.createElement("p");
                pTime.appendChild(document.createTextNode(eventDate.firstChild.nodeValue));
                innerPanel.appendChild(pTime);

                var pPlace = document.createElement("p");
                pPlace.appendChild(document.createTextNode($("location", events[i])[0].firstChild.nodeValue));
                innerPanel.appendChild(pPlace);

                var divDetail = document.createElement("div");
                divDetail.innerHTML = $("description", events[i])[0].firstChild.nodeValue;
                innerPanel.appendChild(divDetail);

                document.body.appendChild(page);

            }

            document.getElementById(containerID).appendChild(ulCalendar);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying list of events");
            }
            $(ulCalendar).listview();
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing activities");
                console.warn("Error message: " + e.message);
            }
        }
    }

    $(".ui-loader").show();
    API.getCalendarFeed(7, calendarPath, callback);
}

///// WSU ANNOUNCEMENTS

API.showAnnouncements = function (pageID, containerID, unavailableID) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showAnnouncements executing...");
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var callbackSuccess = function (data) {
        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Data reply:");
            console.log(data);
        }

        try {
            var ulNews = document.createElement("ul");
            ulNews.setAttribute("data-role", "listview");
            ulNews.setAttribute("data-inset", "true");
            ulNews.setAttribute("data-filter", "true");
            ulNews.setAttribute("data-filter-theme", "a");
            ulNews.setAttribute("data-filter-placeholder", "Search...");
            
            var xNews = API.parseXML(data);
            var news = xNews.getElementsByTagName("item");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + news.length + " data items");
            }

            if (news.length == 0) {
                var liNone = document.createElement("li");
                liNone.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.appendChild(document.createTextNode("No announcements posted..."));
                liNone.appendChild(link);
                ulNews.appendChild(liNone);
            }

            for (var i = 0; i < news.length; i++) {

                var headingText = $("title", news[i])[0].firstChild.nodeValue;
                var url = $("link", news[i])[0].firstChild.nodeValue;

                if (API.debug == true) {
                    console.log("Item " + i + ": " + headingText);
                    console.log(url)
                }

                //create link
                var li = document.createElement("li");
                li.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.setAttribute("href", "");
                link.setAttribute("url", $("link", news[i])[0].firstChild.nodeValue);
                $(link).bind("click", function () {
                    API.showPage(this.getAttribute("url"));
                });

                link.appendChild(document.createTextNode($("title", news[i])[0].firstChild.nodeValue));
                link.style.marginBottom = "-5px";
                li.appendChild(link);
                ulNews.appendChild(li);
            }
            document.getElementById(containerID).appendChild(ulNews);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying list of announcements");
            }
            $(document.getElementById(containerID)).trigger("create");
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing announcements");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var callbackFailure = function (request, status, error) {
        $(".ui-loader").hide();
        $("#" + unavailableID).removeClass("hidden");
        if (API.debug == true) {
            console.warn(request.status);
            console.warn(status);
            console.warn(error);
        }
    }

    var request = "<Request ";
    request += "Method='GET' ";
    request += "URL='http://portalapps.weber.edu/lbulletinboard2.0/EveryoneRSS.aspx'>";
    request += "<Query>";
    request += "<![CDATA[";
    request += "";
    request += "audience=" + API.audience;
    request += "";
    request += "]]>";
    request += "</Query>";
    request += "<ErrorMessage></ErrorMessage>";
    request += "</Request>";
    request += "";

    if (API.debug == true) {
        console.log("");
        console.log("Announcements request:");
        console.log(request);
    }

    $(".ui-loader").show();
    $.ajax({
        type: "POST",
        cache: false,
        url: API.server + "/Platform2/ajaxproxy.aspx" + "?r=" + (Math.random() * 10),
        data: { rq: request },
        success: callbackSuccess,
        error: callbackFailure
    });
}

///// WSU TODAY

API.showWsuToday = function (pageID, containerID, unavailableID) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showWsuToday executing...");
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var callbackSuccess = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Reply:");
            console.log(data);
        }

        try {
            var xNews = API.parseXML(data);
            var news = xNews.getElementsByTagName("item");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + news.length + " data items");
            }

            var ulNews = document.createElement("ul");
            ulNews.setAttribute("data-role", "listview");
            ulNews.setAttribute("data-inset", "true");
            ulNews.setAttribute("data-filter", "true");
            ulNews.setAttribute("data-filter-theme", "a");
            ulNews.setAttribute("data-filter-placeholder", "Search...");
            
            if (news.length == 0) {
                var liNone = document.createElement("li");
                liNone.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.appendChild(document.createTextNode("No stories posted..."));
                liNone.appendChild(link);
                ulNews.appendChild(liNone);
            }

            for (var i = 0; i < news.length; i++) {

                var headingText = $("title", news[i])[0].firstChild.nodeValue;
                var url = $("link", news[i])[0].firstChild.nodeValue;

                if (API.debug == true) {
                    console.log("Item " + i + ": " + headingText);
                    console.log(url)
                }

                //create link
                var li = document.createElement("li");
                li.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.setAttribute("href", "");
                link.setAttribute("url", $("link", news[i])[0].firstChild.nodeValue);
                $(link).bind("click", function () {
                    API.showPage(this.getAttribute("url"));
                });

                link.appendChild(document.createTextNode($("title", news[i])[0].firstChild.nodeValue));
                link.style.marginBottom = "-5px";
                li.appendChild(link);
                ulNews.appendChild(li);
            }
            document.getElementById(containerID).appendChild(ulNews);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying list of stories");
            }
            $("#" + containerID).trigger("create");
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing stories");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var callbackFailure = function (request, status, error) {
        $(".ui-loader").hide();
        $("#" + unavailableID).removeClass("hidden");
        if (API.debug == true) {
            console.warn(request.status);
            console.warn(status);
            console.warn(error);
        }
    }

    document.getElementById(containerID).innerHTML = "";

    var request = "<Request ";
    request += "Method='GET' ";
    request += "URL='http://apps.weber.edu/cmsrss/default.aspx'>";
    request += "<Query>";
    request += "<![CDATA[";
    request += "";
    request += "ID=27966";
    request += "";
    request += "]]>";
    request += "</Query>";
    request += "<ErrorMessage></ErrorMessage>";
    request += "</Request>";
    request += "";

    if (API.debug == true) {
        console.log("");
        console.log("WSU Today request:");
        console.log(request);
    }

    $(".ui-loader").show();
    $.ajax({
        type: "POST",
        cache: false,
        url: API.server + "/Platform2/ajaxproxy.aspx" + "?r=" + (Math.random() * 10),
        data: { rq: request },
        success: callbackSuccess,
        error: callbackFailure
    });
}

//////////////////////////////
// HIGHLIGHTED CONTENT ///////
//////////////////////////////

///// HIGHLIGHTED WSU TODAY

API.showHighlightedWsuToday = function (pageID, containerID, unavailableID, fIncrement, fDecrement) {
    
    if (API.debug == true) {
        console.log("");
        console.log("API.showHighlightedWsuToday executing...");
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
        console.log("fINCREMENT = " + fIncrement);
        console.log("fDECREMENT = " + fDecrement);
        console.log("Last resumed: " + new Date(parseInt(API.lastChecked)).toString());
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var decrement = function (e) {
        fDecrement();
        $("." + e.currentTarget.getAttribute("newlabel")).addClass("wsu-hidden");
        $(e.currentTarget).unbind("click", decrement);
    }

    var callbackSuccess = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Data reply:");
            console.log(data);
        }
       
        try {
            var xNews = API.parseXML(data);
            var news = xNews.getElementsByTagName("item");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + news.length + " data items");
            }

            var ulNews = document.createElement("ul");
            ulNews.setAttribute("data-role", "listview");
            ulNews.setAttribute("data-inset", "true");
            ulNews.setAttribute("data-filter", "true");
            ulNews.setAttribute("data-filter-theme", "a");
            ulNews.setAttribute("data-filter-placeholder", "Search...");

            if (news.length == 0) {
                var liNone = document.createElement("li");
                liNone.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.appendChild(document.createTextNode("No stories posted..."));
                liNone.appendChild(link);
                ulNews.appendChild(liNone);
            }

            for (var i = 0; i < news.length; i++) {

                var headingText = $("title", news[i])[0].firstChild.nodeValue;
                var url = $("link", news[i])[0].firstChild.nodeValue;
                var published = Date.parse($("pubDate", news[i])[0].firstChild.nodeValue);

                //create link
                var li = document.createElement("li");
                li.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.setAttribute("href", "");
                link.setAttribute("url", $("link", news[i])[0].firstChild.nodeValue);

                if (published > API.lastChecked) {

                    fIncrement();

                    var sp = document.createElement("span");
                    sp.appendChild(document.createTextNode(" (New) "));
                    sp.className = "wsutoday_" + i;
                    link.setAttribute("newlabel", sp.className);
                    sp.style.color = "red";
                    sp.style.fontStyle = "italic";
                    link.appendChild(sp);

                    $(link).bind("click", decrement);

                    if (API.debug == true) {
                        console.log("Item " + i + ": " + headingText + " (new)");
                        console.log(url);
                    }
                }
                else {
                    if (API.debug == true) {
                        console.log("Item " + i + ": " + headingText);
                        console.log(url);
                    }
                }

                link.appendChild(document.createTextNode($("title", news[i])[0].firstChild.nodeValue));

                $(link).bind("click", function () {
                    API.showPage(this.getAttribute("url"));
                });

                link.style.marginBottom = "-5px";
                li.appendChild(link);
                ulNews.appendChild(li);
            }
            document.getElementById(containerID).appendChild(ulNews);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying list of stories");
            }
            $("#" + containerID).trigger("create");
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

            $("#home").trigger("pagebeforeshow");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing stories");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var callbackFailure = function (request, status, error) {
        $(".ui-loader").hide();
        $("#" + unavailableID).removeClass("hidden");
        if (API.debug == true) {
            console.warn(request.status);
            console.warn(status);
            console.warn(error);
        }
    }

    var request = "<Request ";
    request += "Method='GET' ";
    request += "URL='http://apps.weber.edu/cmsrss/default.aspx'>";
    request += "<Query>";
    request += "<![CDATA[";
    request += "";
    request += "ID=27966";
    request += "";
    request += "]]>";
    request += "</Query>";
    request += "<ErrorMessage></ErrorMessage>";
    request += "</Request>";
    request += "";

    if (API.debug == true) {
        console.log("");
        console.log("WSU Today request:");
        console.log(request);
    }

    $(".ui-loader").show();
    $.ajax({
        type: "POST",
        cache: false,
        url: API.server + "/Platform2/ajaxproxy.aspx" + "?r=" + (Math.random() * 10),
        data: { rq: request },
        success: callbackSuccess,
        error: callbackFailure
    });
}

///// HIGHLIGHTED SIGNPOST

API.showHighlightedSignpost = function (pageID, containerID, unavailableID, fIncrement, fDecrement) {
    
    if (API.debug == true) {
        console.log("");
        console.log("API.showHighlightedSignpost executing...");
        console.log("pageID = " + pageID);
        console.log("containerID = " + containerID);
        console.log("unavailableID = " + unavailableID);
        console.log("fINCREMENT = " + fIncrement);
        console.log("fDECREMENT = " + fDecrement);
        console.log("Last resumed: " + new Date(parseInt(API.lastChecked)).toString());
    }

    $("#" + unavailableID).addClass("hidden");
    $("#" + containerID).addClass("hidden");
    $("#" + containerID).empty();

    var decrement = function (e) {
        fDecrement()
        $("." + e.currentTarget.getAttribute("newlabel")).addClass("wsu-hidden");
        $(e.currentTarget).unbind("click", decrement);
    }

    var callbackSuccess = function (data) {

        $(".ui-loader").hide();

        if (API.verbose == true) {
            console.log("");
            console.log("Data reply:");
            console.log(data);
        }
        
        try {
            var xNews = API.parseXML(data);
            var news = xNews.getElementsByTagName("item");

            if (API.debug == true) {
                console.log("");
                console.log("Processing " + news.length + " data items");
            }

            var ulNews = document.createElement("ul");
            ulNews.setAttribute("data-role", "listview");
            ulNews.setAttribute("data-inset", "true");
            ulNews.setAttribute("data-filter", "true");
            ulNews.setAttribute("data-filter-theme", "a");
            ulNews.setAttribute("data-filter-placeholder", "Search...");
            
            if (news.length == 0) {
                var liNone = document.createElement("li");
                liNone.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.appendChild(document.createTextNode("No stories posted..."));
                liNone.appendChild(link);
                ulNews.appendChild(liNone);
            }

            for (var i = 0; i < news.length; i++) {

                var headingText = $("title", news[i])[0].firstChild.nodeValue;
                var url = $("link", news[i])[0].firstChild.nodeValue;
                var published = Date.parse($("pubDate", news[i])[0].firstChild.nodeValue);

                //create link
                var li = document.createElement("li");
                li.setAttribute("data-icon", "false");
                var link = document.createElement("a");
                link.setAttribute("href", "");
                link.setAttribute("url", $("link", news[i])[0].firstChild.nodeValue);

                if (published > API.lastChecked) {

                    fIncrement();

                    var sp = document.createElement("span");
                    sp.appendChild(document.createTextNode(" (New) "));
                    sp.className = "signpost_" + i;
                    link.setAttribute("newlabel", sp.className);
                    sp.style.color = "red";
                    sp.style.fontStyle = "italic";
                    link.appendChild(sp);

                    $(link).bind("click", decrement);

                    if (API.debug == true) {
                        console.log("Item " + i + ": " + headingText + " (new)");
                        console.log(url)
                    }
                }
                else {
                    if (API.debug == true) {
                        console.log("Item " + i + ": " + headingText);
                        console.log(url)
                    }
                }

                link.appendChild(document.createTextNode($("title", news[i])[0].firstChild.nodeValue));
                link.style.marginBottom = "-5px";

                $(link).bind("click", function () {
                    API.showPage(this.getAttribute("url"));
                });

                li.appendChild(link);

                ulNews.appendChild(li);

            }
            document.getElementById(containerID).appendChild(ulNews);

            if (API.debug == true) {
                console.log("");
                console.log("Initializing and displaying list of stories");
            }
            $("#" + containerID).trigger("create");
            $("#" + containerID).removeClass("hidden");
            $("#" + pageID).attr("data-initialized", "true");

            if (API.debug == true) {
                console.log("");
                console.log("Setting data-dirty to false");
            }
            $("#" + pageID).attr("data-dirty", "false");

            $("#home").trigger("pagebeforeshow");

        }
        catch (e) {
            $("#" + unavailableID).removeClass("hidden");
            if (API.debug == true) {
                console.warn("Error processing stories");
                console.warn("Error message: " + e.message);
            }
        }
    }

    var callbackFailure = function (request, status, error) {
        $(".ui-loader").hide();
        $("#" + unavailableID).removeClass("hidden");
        if (API.debug == true) {
            console.warn(request.status);
            console.warn(status);
            console.warn(error);
        }
    }

    var request = "<Request ";
    request += "Method='POST' ";
    request += "URL='http://www.wsusignpost.com/custom-feed'>";
    request += "<Query>";
    request += "<![CDATA[";
    request += "";
    request += "";
    request += "";
    request += "]]>";
    request += "</Query>";
    request += "<ErrorMessage></ErrorMessage>";
    request += "</Request>";
    request += "";

    if (API.debug == true) {
        console.log("");
        console.log("Signpost request:");
        console.log(request);
    }

    $(".ui-loader").show();
    $.ajax({
        type: "POST",
        cache: false,
        url: API.server + "/Platform2/ajaxproxy.aspx" + "?r=" + (Math.random() * 10),
        data: { rq: request },
        success: callbackSuccess,
        error: callbackFailure
    });
}

///// HIGHLIGHTED STUDENT ACTIVITIES

API.showHighlightedStudentActivities = function (pageID, containerID, unavailableID, fIncrement, fDecrement) {
    API.showHighlightedGoogleCalendar(pageID, containerID, unavailableID, "Activity", "No activities listed...", fIncrement, fDecrement, 90, "SHARED/Calendars/SHARED_Activities.xml");
}

///// HIGHLIGHTED COMMUNITY OPPORTUNITIES

API.showHighlightedCommunityOpportunities = function (pageID, containerID, unavailableID, fIncrement, fDecrement) {
    API.showHighlightedGoogleCalendar(pageID, containerID, unavailableID, "Opportunity", "No opportunities posted...", fIncrement, fDecrement, 90, "SHARED/Calendars/SHARED_Community.xml");
}









        API.app = "WSUMOBILE";
        API.appType = "native";
        API.appReady = "edu_weber_wsumobile_WSUMOBILE_Ready";
        API.appRefreshed = "edu_weber_wsumobile_WSUMOBILE_Refreshed";
        API.refreshInterval = 15000; // change to longer interval for deployment?
        API.debug = false;
        API.verbose = false;
        API.simulateEvents = false;
        API.server = "http://m.weber.edu";
    

        var f0home = function () {
            $.mobile.changePage("#announcements_submenu");
        }
        var f1home = function () {
            $.mobile.changePage("#calendar");
        }
        var f2home = function () {
            $.mobile.changePage("#news_submenu");
        }
        var f3home = function () {
            $.mobile.changePage("#athletics_submenu");
        }
        var f4home = function () {
            $.mobile.changePage("#social_submenu");
        }
        var f5home = function () {
            $.mobile.changePage("#find_submenu");
        }
        var f6home = function () {
            API.showPage(CUSTOM.Portal); 
        }
        var f7home = function () {
            API.showPage(CUSTOM.Home); 
        }
        var f8home = function () { // refresh data and constants without calling API.onResume
            API.manualRefresh();
        }
        $("#home").bind("pagebeforecreate", function () {

            if (API.debug == true) {
                console.log("");
                console.log("Home page initializing...");
            }

            $("#home a").each(function () {
                this.onclick = eval(this.getAttribute("data-onlineclick"));
            });

            //preinitialize pages with network-dependent links
            $("#pause").page();
            $("[data-preinitialize=true]").page();

            var image1024 = "images/Fans-1024.png";
            var image768 = "images/Fans-768.png";
            var image480 = "images/Fans-480.png";
            var image320 = "images/Fans-320.png";
            API.showBanner(image1024, image768, image480, image320, "200px");

            if (API.simulateEvents == true) {
                API.onDeviceReady();
            }

        });
    

    var f0announcements_submenu = function () {
        API.audience = "Everyone"; //deliberately global variable
        $.mobile.changePage("#announcements");
    }
    var f1announcements_submenu = function () {
        API.audience = "Faculty"; //deliberately global variable
        $.mobile.changePage("#announcements");
    }
    var f2announcements_submenu = function () {
        API.audience = "Faculty%20and%20Staff"; //deliberately global variable
        $.mobile.changePage("#announcements");
    }
    var f3announcements_submenu = function () {
        API.audience = "Staff"; //deliberately global variable
        $.mobile.changePage("#announcements");
    }
    var f4announcements_submenu = function () {
        API.audience = "Students"; //deliberately global variable
        $.mobile.changePage("#announcements");
    }
    $("#announcements_submenu").bind("pagebeforecreate", function () {
        $("#announcements_submenu a").each(function () {
            this.onclick = eval(this.getAttribute("data-onlineclick"));
        });
    });
    

    $("#announcements").bind("pagebeforeshow", function () {
        try {
            API.showAnnouncements("announcements", "div0announcements", "p0announcements");
        }
        catch (e) {
            $("#p0announcements").removeClass("hidden");
            if (API.debug == true) {
                console.log(e.message);
            }
        }
    });
    

    $("#calendar").bind("pagebeforeshow", function () {
        if ($("#calendar").attr("data-dirty") == "true") {
            try {
                // WSUMOBILE project is source of semesters
                API.showAcademicCalendar("WSUMOBILE", "Calendar", "calendar", "div0calendar", "p0calendar", "calendar_detail"); 
            }
            catch (e) {
                $("#p0calendar").removeClass("hidden")
                if (API.debug == true) {
                    console.log(e.message);
                }
                }
        }
    });
    

    $("#calendar_detail").bind("pagebeforeshow", function () {
        try {
            API.showCalendarDetail("calendar_detail", "div0calendar_detail", "p0calendar_detail", "h0calendar_detail");
        }
        catch (e) {
            $("#p0calendar_detail").removeClass("hidden");
            if (API.debug == true) {
                console.log(e.message);
            }
        }
    });
    

        var f0news_submenu = function () {
            $.mobile.changePage("#wsutoday");
        }
        var f1news_submenu = function () {
            $.mobile.changePage("#signpost");
        }
        var f2news_submenu = function () {
            $.mobile.changePage("#activities");
        }
        var f3news_submenu = function () {
            $.mobile.changePage("#community");
        }
        var f4news_submenu = function () {
            $.mobile.changePage("#ucalendar");
        }
        $("#news_submenu").bind("pagebeforecreate", function () {
            $("#news_submenu a").each(function () {
                this.onclick = eval(this.getAttribute("data-onlineclick"));
            });
        });
    

    $("#wsutoday").bind("pagebeforeshow", function () {
        if ($("#wsutoday").attr("data-dirty") == "true") {
            try {
                // fINCREMENT is the function that should be executed when a new item is found; typically it will increment a counter
                // fDECREMENT is the function that should be executed when a new item is viewed; typically it will decrement a counter
                API.showHighlightedWsuToday("wsutoday", "div0wsutoday", "p0wsutoday", API.doNothing, API.doNothing);
            }
            catch (e) {
                $("#p0wsutoday").removeClass("hidden");
                if (API.debug == true) {
                    console.log(e.message);
                }
            }
        }
    });
    

    $("#signpost").bind("pagebeforeshow", function () {
        if ($("#signpost").attr("data-dirty") == "true") {
            try {
                // fINCREMENT is the function that should be executed when a new item is found; typically it will increment a counter
                // fDECREMENT is the function that should be executed when a new item is viewed; typically it will decrement a counter
                API.showHighlightedSignpost("signpost", "div0signpost", "p0signpost", API.doNothing, API.doNothing);
            }
            catch (e) {
                $("#p0signpost").removeClass("hidden");
                if (API.debug == true) {
                    console.log(e.message);
                }
            }
        }
    });
    

    $("#activities").bind("pagebeforeshow", function () {
        if ($("#activities").attr("data-dirty") == "true") {
            try {
                // fINCREMENT is the function that should be executed when a new item is found; typically it will increment a counter
                // fDECREMENT is the function that should be executed when a new item is viewed; typically it will decrement a counter
                API.showHighlightedStudentActivities("activities", "div0activities", "p0activities", API.doNothing, API.doNothing);
            }
            catch (e) {
                $("#p0activities").removeClass("hidden");
                if (API.debug == true) {
                    console.log(e.message);
                }
            }
        }
    });
    

    $("#community").bind("pagebeforeshow", function () {
        if ($("#community").attr("data-dirty") == "true") {
            try {
                // fINCREMENT is the function that should be executed when a new item is found; typically it will increment a counter
                // fDECREMENT is the function that should be executed when a new item is viewed; typically it will decrement a counter
                API.showHighlightedCommunityOpportunities("community", "div0community", "p0community", API.doNothing, API.doNothing);
            }
            catch (e) {
                $("#p0community").removeClass("hidden");
                if (API.debug == true) {
                    console.log(e.message);
                }
            }
        }
    });
    

    $("#ucalendar").bind("pagebeforeshow", function () {
        if ($("#ucalendar").attr("data-dirty") == "true") {
            try {
                // PERIOD = day, week, month, or all
                API.showUniversityCalendar("ucalendar", "div0ucalendar", "p0ucalendar", "month");
            }
            catch (e) {
                $("#p0ucalendar").removeClass("hidden");
                if (API.debug == true) {
                    console.log(e.message);
                }
            }
        }
    });
    

        var f0athletics_submenu = function () {
            $.mobile.changePage("#schedules");
        }
        var f1athletics_submenu = function () {
            $.mobile.changePage("#scores");
        }
        $("#athletics_submenu").bind("pagebeforecreate", function () {
            $("#athletics_submenu a").each(function () {
                this.onclick = eval(this.getAttribute("data-onlineclick"));
            });
        });
    

    $("#schedules").bind("pagebeforeshow", function () {
        if ($("#schedules").attr("data-dirty") == "true") {
            try {
                API.showSchedule("schedules", "div0schedules", "p0schedules");
            }
            catch (e) {
                $("#p0schedules").removeClass("hidden");
                if (API.debug == true) {
                    console.log(e.message);
                }
            }
        }
    });
    

    $("#scores").bind("pagebeforeshow", function () {
        if ($("#scores").attr("data-dirty") == "true") {
            try {
                API.showScores("scores", "div0scores", "p0scores");
            }
            catch (e) {
                $("#p0scores").removeClass("hidden");
                if (API.debug == true) {
                    console.log(e.message);
                }
            }
        }
    });
    

        var f0social_submenu = function () {
            API.showPage(CUSTOM.Facebook);
        }
        var f1social_submenu = function () {
            API.showPage(CUSTOM.Twitter);
        }
        var f2social_submenu = function () {
            API.showPage(CUSTOM.YouTube);
        }
        var f3social_submenu = function () {
            $.mobile.changePage("#sms");
        }
        $("#social_submenu").bind("pagebeforecreate", function () {
            $("#social_submenu a").each(function () {
                this.onclick = eval(this.getAttribute("data-onlineclick"));
            });
        });
    

    $("#sms").bind("pagebeforeshow", function () {
        if ($("#sms").attr("data-dirty") == "true") {
            try {
                API.showUnstructuredContent("WSUMOBILE", "SMS", "sms", "div0sms", "p0sms");
            }
            catch (e) {
                $("#p0sms").removeClass("hidden");
                if (API.debug == true) {
                    console.log(e.message);
                }
            }
        }
    });
    

        var f0find_submenu = function () {
            $.mobile.changePage("#fsindex");
        }
        var f1find_submenu = function () {
            $.mobile.changePage("#azindex");
        }
        var f2find_submenu = function () {
            $.mobile.changePage("#search");
        }
        var f3find_submenu = function () {
            $.mobile.changePage("#maps_submenu");
        }
        $("#find_submenu").bind("pagebeforecreate", function () {
            $("#find_submenu a").each(function () {
                this.onclick = eval(this.getAttribute("data-onlineclick"));
            });
        });
    

    $("#fsindex").bind("pagebeforecreate", function () {
        try {
            // DETAIL_HEADER is the header that should appear on the staff detail pages
            API.showFaculty("fsindex", "div0fsindex", "p0fsindex", "Faculty & Staff");
        }
        catch (e) {
            $("#p0fsindex").removeClass("hidden");
            if (API.debug == true) {
                console.log(e.message);
            }
            }
    });
    $("#fsindex").bind("pagebeforeshow", function () {
        //do nothing
    });
    

    $("#azindex").bind("pagebeforecreate", function () {
        try {
            API.showAtoZIndex("azindex", "div0azindex", "p0azindex")
        }
        catch (e) {
            $("#p0azindex").removeClass("hidden");
            if (API.debug == true) {
                console.log(e.message);
            }
        }
    });
    $("#azindex").bind("pagebeforeshow", function () {
        //do nothing
    });
    

    $("#search").bind("pagebeforecreate", function () {
        try {
            API.showSearchForm("search", "div0search", "p0search")
        }
        catch (e) {
            $("#p0search").removeClass("hidden");
            if (API.debug == true) {
                console.log(e.message);
            }
        }
    });
    $("#search").bind("pagebeforeshow", function () {
        //do nothing
    });
    

        var f0maps_submenu = function () {
            API.showPage(CUSTOM.OgdenMap);
        }
        var f1maps_submenu = function () {
            API.showPage(CUSTOM.OgdenCampusMap);
        }
        var f2maps_submenu = function () {
            API.showPage(CUSTOM.DeeCenterMap);
        }
        var f3maps_submenu = function () {
            API.showPage(CUSTOM.DavisMap);
        }
        var f4maps_submenu = function () {
            API.showPage(CUSTOM.KaysvilleMap);
        }
        var f5maps_submenu = function () {
            API.showPage(CUSTOM.MorganMap);
        }
        var f6maps_submenu = function () {
            API.showPage(CUSTOM.RoyMap);
        }
        var f7maps_submenu = function () {
            API.showPage(CUSTOM.ClearfieldMap);
        }
        $("#maps_submenu").bind("pagebeforecreate", function () {
            $("#maps_submenu a").each(function () {
                this.onclick = eval(this.getAttribute("data-onlineclick"));
            });
        });
    

        $("#offline").bind("pagebeforecreate", function () {
            $("#btnOK").bind("click", function () {
                //$("#offline").dialog("close");
                $.mobile.changePage("#home");
            });
        });
    

        $("#pause").bind("pagebeforecreate", function () {
            $("#btnResume").bind("click", function () {
                API.onResume();
                $("#pause").dialog("close");
            });
        });
    

﻿
// API VERSION 7-9-2013
// Data refreshed in API.onResume instead of pagechange... CUSTOM.callback also executed...
// Add calls to CUSTOM.onPause, CUSTOM.onResume, etc., including code to enable them to work in simulation mode...
// New database code, especially changes required to included Entered...
// ...plus API.database is opened in onDeviceReady, making it available to other applications...

////////////////////
// INITIALIZATION
///////////////////

var API = new Object();
API.app;
API.appType;
API.appReady;
API.appRefreshed;
API.refreshInterval;
API.refreshFailed;
API.lastChecked;
API.deviceOnline;
API.debug;
API.verbose;
API.simulateEvents;
API.server;
API.externalSite;
API.constantsAvailable;

var CUSTOM = new Object();

if (window.localStorage.getItem("edu_weber_wsumobile_lastChecked") == null) {
    window.localStorage.setItem("edu_weber_wsumobile_lastChecked", new Date().getTime() - (1000 * 60 * 60 * 24 * 10));
}

API.refreshFailed = false;

//jQuery Mobile ready function
$(document).bind("mobileinit", function () {

    if (API.debug == true) {
        console.log("JQM initializing...");
    }

    $.mobile.defaultPageTransition = "fade";
    $.mobile.loadingMessage = "Please wait...";
    $.mobile.loadingMessageTextVisible = true;

    $(document).bind("pagebeforechange", function (event, data) {
        if (API.debug == true) {
            if (typeof data.toPage == "string") {
                console.log("");
                console.log("SHOWING PAGE " + data.toPage + " //////////////////////////////");
            }
        }
    });

    $(document).bind("pagechange", function () {
        $(".wsu-phone-only").each(function () {
            if ($.mobile.deviceType != "Phone") {
                $(this).addClass("hidden")
            }
        });
    });

});

//jQuery ready function
$(document).ready(function () {

    if (API.debug == true) {
        console.log("");
        console.log("jQuery document ready...");
    }

    API.identifyDevice();
    //API.getConstants(API.app);

    if (API.appType == "native" && API.simulateEvents == false) {
        //presume running in simulator or on device
        document.addEventListener("deviceready", API.onDeviceReady, false);
        document.addEventListener("pause", API.onPause, false);
        document.addEventListener("resume", API.onResume, false);
        document.addEventListener("offline", API.onOffline, false);
    }

    if (API.simulateEvents == true) {
        API.showEventButtons();
    }

});

API.identifyDevice = function () {
    if (API.debug == true) {
        console.log("");
        console.log("API.identifyDevice executing...");
    }
    $.ajax({
        type: "GET",
        async: false,
        url: API.server + "/PLATFORM2/Device.aspx" + "?r=" + (Math.random() * 10),
        success: function (data) {
            if (API.debug == true) {
                console.log("");
                console.log("Web service reply:");
                console.log(data);
            }
            var xDevice = API.parseXML(data);
            $.mobile.deviceType = xDevice.documentElement.getAttribute("DeviceType");
            $.mobile.deviceOS = xDevice.documentElement.getAttribute("DeviceOS");
            $.mobile.device = xDevice.documentElement.getAttribute("Device");

            $.mobile.displayWidth = xDevice.documentElement.getAttribute("DisplayWidth");
            $.mobile.usableDisplayWidth = xDevice.documentElement.getAttribute("usableDisplayWidth");
            $.mobile.displayHeight = xDevice.documentElement.getAttribute("DisplayHeight");
            $.mobile.usableDisplayHeight = xDevice.documentElement.getAttribute("usableDisplayHeight");
        },
        error: function (request, status, error) {
            if (API.debug == true) {
                console.warn("Error retrieving device characteristics");
                console.warn(request.status);
                console.warn(status);
                console.warn(error);
            }
        }
    });
}

API.getConstants = function (app) {
    if (API.debug == true) {
        console.log("");
        console.log("API.getConstants executing...");
    }
    var request = new API.datastoreRequest({ App: app, Action: "GetData", Key1: "Constants", OrderBy: "Key2" });
    var reply = request.submitRequest();

    if (API.debug == true) {
        console.log("");
        console.log("Datastore reply:");
        console.log(reply);
    }

    if (reply == "error") {
        if (API.debug == true) {
            console.log("");
            console.warn("Error getting constants");
        }
        API.constantsAvailable = false;
        return false;
    }
    try {
        xConstants = API.parseXML(reply);
        var constants = xConstants.getElementsByTagName("dataitem");

        if (API.debug == true) {
            console.log("");
            console.log("Processing " + constants.length + " constants");
        }

        for (var i = 0; i < constants.length; i++) {
            var name = "CUSTOM." + $("name", constants[i])[0].firstChild.nodeValue;
            var value = $("value", constants[i])[0].firstChild.nodeValue;
            value = value.replace("'", "");
            if (API.debug == true) {
                console.log(name + " = '" + value + "'");
            }
            eval(name + " = '" + value + "'");
        }
        API.constantsAvailable = true;
    }
    catch (e) {
        if (API.debug == true) {
            console.warn("Error processing constants");
        }
        API.constantsAvailable = false;
    }

}

API.showEventButtons = function () {
    $(".wsu-debug-only").each(function () {
        var btnGroup = document.createElement("div");
        btnGroup.setAttribute("data-role", "controlgroup");
        btnGroup.setAttribute("data-type", "horizontal");
        $(btnGroup).addClass("wsu-debug-buttons");
        this.appendChild(btnGroup);

        //online
        var btnOnline = document.createElement("a");
        btnOnline.setAttribute("data-role", "button");
        btnOnline.setAttribute("href", "");
        btnOnline.appendChild(document.createTextNode("Online"));
        $(btnOnline).bind("click", function () {
            API.onOnline();
        });
        btnGroup.appendChild(btnOnline);

        //offline
        var btnOffline = document.createElement("a");
        btnOffline.setAttribute("data-role", "button");
        btnOffline.setAttribute("href", "");
        btnOffline.appendChild(document.createTextNode("Offline"));
        $(btnOffline).bind("click", function () {
            API.onOffline();
        });
        btnGroup.appendChild(btnOffline);

        //pause
        var btnPause = document.createElement("a");
        btnPause.setAttribute("data-role", "button");
        btnPause.setAttribute("href", "");
        btnPause.appendChild(document.createTextNode("Pause"));
        $(btnPause).bind("click", function () {
            API.onPause();
        });
        btnGroup.appendChild(btnPause);

        $(this).removeClass("wsu-debug-only");
    });
}

API.showBanner = function (image1024, image768, image480, image320, margin) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showBanner executing...");
    }

    if ($.mobile.displayWidth == undefined || $.mobile.displayWidth == "") {
        $(window).bind("orientationchange", function (event) {
            if (event.orientation == "landscape") {
                $.mobile.displayWidth = screen.height;
                //alert($.mobile.displayWidth);
            }
            else {
                $.mobile.displayWidth = screen.width;
                //alert($.mobile.displayWidth);
            }
        });
        $(window).trigger("orientationchange");
        $(window).unbind("orientationchange");
    }

    if (API.debug == true) {
        console.log("Display width = " + $.mobile.displayWidth);
    }

    if ($.mobile.displayWidth > 767 || $.mobile.deviceType == "PC") {
        $(".wsu-banner-header").addClass("hidden");
        $(".wsu-banner-alternate").addClass("hidden");
        $(".wsu-banner-menu").css("margin-top", margin);
        $(window).bind("orientationchange", function (event) {
            if (event.orientation == "landscape") {
                $(".wsu-banner-container")[0].style.backgroundImage = "url(" + image1024 + ")";
            }
            else {
                $(".wsu-banner-container")[0].style.backgroundImage = "url(" + image768 + ")";
            }
        });
    }

    else if ($.mobile.displayWidth > 320 && $.mobile.displayWidth < 768) {
        $(".wsu-banner-header").addClass("hidden");
        $(".wsu-banner-alternate").addClass("hidden");
        $(".wsu-banner-menu").css("margin-top", margin);
        $(window).bind("orientationchange", function (event) {
            if (event.orientation == "landscape") {
                $(".wsu-banner-container")[0].style.backgroundImage = "url(" + image768 + ")";
            }
            else {
                $(".wsu-banner-container")[0].style.backgroundImage = "url(" + image480 + ")";
            }
        });
    }

    else if ($.mobile.displayWidth > 310) {
        $(".wsu-banner-header").addClass("hidden");
        $(".wsu-banner-alternate").addClass("hidden");
        $(".wsu-banner-menu").css("margin-top", margin);
        $(window).bind("orientationchange", function (event) {
            if (event.orientation == "landscape") {
                $(".wsu-banner-container")[0].style.backgroundImage = "url(" + image480 + ")";
            }
            else {
                $(".wsu-banner-container")[0].style.backgroundImage = "url(" + image320 + ")";
            }
        });
    }

    // else leave header and alternative content visible and don't show a banner

    $(window).trigger("orientationchange");
}

//onunload = function () { }; //is this still necessary??

////////////////////////////////////////
// NETWORK AWARENESS AND RELATED EVENTS
///////////////////////////////////////

API.onDeviceReady = function () {
    if (API.debug == true) {
        console.log("");
        console.log("API.onDeviceReady executing...");
    }
    if (API.simulateEvents == true) {
        API.deviceOnline = true;
    }
    else {
        API.deviceOnline = API.checkNetwork();
    }
    if (API.debug == true) {
        console.log("");
        console.log("Creating API.database...");
    }
    API.database = openDatabase(API.app, "1.0", API.app, 5000000);
    if (CUSTOM.onDeviceReady) {
        CUSTOM.onDeviceReady(API.deviceOnline);
    }
    API.onResume(); // ?????
}

API.onPause = function () {
    if (API.debug == true) {
        console.log("");
        console.log("API.onPause executing...");
    }
    $(".ui-loader").hide();
    if (API.simulateEvents == true) {
        $.mobile.changePage("#pause");
    }
    if (CUSTOM.onPause) {
        CUSTOM.onPause();
    }
}

API.onResume = function () {

    if (API.debug == true) {
        console.log("");
        console.log("API.onResume executing...");
    }

    if (API.simulateEvents == true) {
        API.deviceOnline = true;
    }
    else {
        API.deviceOnline = API.checkNetwork();
    }

    if (API.deviceOnline == false) {
        if (API.debug == true) {
            console.log("");
            console.log("Refresh failed - device offline...");
        }
        API.refreshFailed = true;
        return;
    }

    API.lastChecked = window.localStorage.getItem("edu_weber_wsumobile_lastChecked");

    var ready = window.localStorage.getItem(API.appReady);
    var lastRefreshed = window.localStorage.getItem(API.appRefreshed);
    var refreshIntervalExpired = ((new Date().valueOf() - lastRefreshed) > API.refreshInterval);

    if (API.debug == true) {
        console.log("");
        console.log("ready = " + ready);
        console.log("lastChecked = " + new Date(parseInt(API.lastChecked)).toString());
        console.log("lastRefreshed = " + new Date(parseInt(lastRefreshed)).toString());
        console.log("refreshIntervalExpired = " + refreshIntervalExpired);
    }

    var lastChecked = new Date().valueOf();
    window.localStorage.setItem("edu_weber_wsumobile_lastChecked", lastChecked);
    API.refreshFailed = false;

    if (CUSTOM.onResume) {
        CUSTOM.onResume(API.deviceOnline);
    }

    if (ready != "true" || refreshIntervalExpired == true) {
        //disable user input
        $(".wsu-li-managed a,.wsu-li-network-dependent a,.wsu-btn-managed,.wsu-btn-network-dependent").each(function () {
            this.onclick = eval(this.getAttribute("data-offlineclick"));
        });
        API.getConstants(API.app);
        API.refreshData(API.app, API.onRefresh);
    }
    else {
        $.mobile.changePage("#home");
    }

}

API.onRefresh = function () {
    if (API.debug == true) {
        console.log("");
        console.log("API.onRefresh executing...");
    }
    if (CUSTOM.onRefresh) {
        CUSTOM.onRefresh();
    }

    //re-enable user input
    $(".ui-loader").hide();
    $(".wsu-li-managed a,.wsu-li-network-dependent a,.wsu-btn-managed,.wsu-btn-network-dependent").each(function () {
        this.onclick = eval(this.getAttribute("data-onlineclick"));
    });
    $.mobile.changePage("#home");
}

API.onOffline = function () {
    if (API.debug == true) {
        console.log("");
        console.log("API.onOffline executing...");
    }
    if (CUSTOM.onOffline) {
        CUSTOM.onOffline();
    }
    API.deviceOnline = false;
    document.addEventListener("online", API.onOnline, false);
    var ready = localStorage.getItem(API.appReady);

    $(".wsu-li-network-dependent").each(function () {

        if ($(this).attr("data-offline-icon") == "false") {
            if ($("span", $(this)).length > 0) {
                $("span", $(this)).remove();
            }
        }

        else {
            if ($("span", $(this)).length > 0) {
                $("span", $(this)).removeClass("ui-icon-" + $(this).attr("data-icon"));
                $("span", $(this)).addClass("ui-icon-" + $(this).attr("data-offline-icon"));
            }
            else {
                var html = "<span class='ui-icon ui-icon-";
                html += $(this).attr("data-offline-icon");
                html += " ui-icon-shadow'></span>";
                $("div.ui-btn-inner", $(this)).append(html);
            }
        }

        $(this).attr("data-icon", $(this).attr("data-offline-icon"));

    });

    $(".wsu-li-managed").each(function () {
        //disable only if managed content hasn't been loaded yet...
        if (ready != "true") {
            if ($(this).attr("data-offline-icon") == "false") {
                if ($("span", $(this)).length > 0) {
                    $("span", $(this)).remove();
                }
            }

            else {
                if ($("span", $(this)).length > 0) {
                    $("span", $(this)).removeClass("ui-icon-" + $(this).attr("data-icon"));
                    $("span", $(this)).addClass("ui-icon-" + $(this).attr("data-offline-icon"));
                }
                else {
                    var html = "<span class='ui-icon ui-icon-";
                    html += $(this).attr("data-offline-icon");
                    html += " ui-icon-shadow'></span>";
                    $("div.ui-btn-inner", $(this)).append(html);
                }
            }

            $(this).attr("data-icon", $(this).attr("data-offline-icon"));
        }
    });

    $(".wsu-li-network-dependent a").each(function () {
        this.onclick = eval(this.getAttribute("data-offlineclick"));;
    });

    $(".wsu-li-managed a").each(function () {
        if (ready != "true") {
            this.onclick = eval(this.getAttribute("data-offlineclick"));;
        }
    });

    $(".wsu-btn-network-dependent").each(function () {
        if ($(this).attr("data-offline-icon") == "false") {
            if ($("span.ui-btn-inner span", $(this)).length > 1) {
                $("span.ui-btn-inner span:last", $(this)).remove();
                $(this).removeClass("ui-btn-icon-right");
            }
        }
        else {
            if ($("span.ui-btn-inner span", $(this)).length > 1) {
                $("span.ui-btn-inner span:last", $(this)).removeClass("ui-icon-" + $(this).attr("data-icon"));
                $("span.ui-btn-inner span:last", $(this)).addClass("ui-icon-" + $(this).attr("data-offline-icon"));
            }
            else {
                var html = "<span class='ui-icon ui-icon-";
                html += $(this).attr("data-offline-icon");
                html += " ui-icon-shadow'></span>";
                $("span.ui-btn-inner", $(this)).append(html);
                $(this).addClass("ui-btn-icon-right");
            }
        }
        $(this).attr("data-icon", $(this).attr("data-offline-icon"));
        this.onclick = eval(this.getAttribute("data-offlineclick"));;
    });

    $(".wsu-btn-managed").each(function () {
        if (ready != "true") {
            if ($(this).attr("data-offline-icon") == "false") {
                if ($("span.ui-btn-inner span", $(this)).length > 1) {
                    $("span.ui-btn-inner span:last", $(this)).remove();
                    $(this).removeClass("ui-btn-icon-right");
                }
            }
            else {
                if ($("span.ui-btn-inner span", $(this)).length > 1) {
                    $("span.ui-btn-inner span:last", $(this)).removeClass("ui-icon-" + $(this).attr("data-icon"));
                    $("span.ui-btn-inner span:last", $(this)).addClass("ui-icon-" + $(this).attr("data-offline-icon"));
                }
                else {
                    var html = "<span class='ui-icon ui-icon-";
                    html += $(this).attr("data-offline-icon");
                    html += " ui-icon-shadow'></span>";
                    $("span.ui-btn-inner", $(this)).append(html);
                    $(this).addClass("ui-btn-icon-right");
                }
            }
            $(this).attr("data-icon", $(this).attr("data-offline-icon"));
            this.onclick = eval(this.getAttribute("data-offlineclick"));;
        }
    });

    $.mobile.changePage("#offline", { transition: "pop" });

}

API.onOnline = function () {
    if (API.debug == true) {
        console.log("");
        console.log("API.onOnline executing...");
    }
    if (CUSTOM.onOnline) {
        CUSTOM.onOnline();
    }
    API.deviceOnline = true;
    var ready = localStorage.getItem(API.appReady);
    $(".wsu-li-network-dependent").each(function () {

        if ($(this).attr("data-online-icon") == "false") {
            if ($("span", $(this)).length > 0) {
                $("span", $(this)).remove();
            }
        }

        else {
            if ($("span", $(this)).length > 0) {
                $("span", $(this)).removeClass("ui-icon-" + $(this).attr("data-icon"));
                $("span", $(this)).addClass("ui-icon-" + $(this).attr("data-online-icon"));
            }
            else {
                var html = "<span class='ui-icon ui-icon-";
                html += $(this).attr("data-online-icon");
                html += " ui-icon-shadow'></span>";
                $("div.ui-btn-inner", $(this)).append(html);
            }
        }

        $(this).attr("data-icon", $(this).attr("data-online-icon"));

    });

    $(".wsu-li-managed").each(function () {
        // logic
        if (ready != true) {
            //API.refreshData(API.app);
            localStorage.setItem(API.appReady, "true");
        }
        if ($(this).attr("data-online-icon") == "false") {
            if ($("span", $(this)).length > 0) {
                $("span", $(this)).remove();
            }
        }

        else {
            if ($("span", $(this)).length > 0) {
                $("span", $(this)).removeClass("ui-icon-" + $(this).attr("data-icon"));
                $("span", $(this)).addClass("ui-icon-" + $(this).attr("data-online-icon"));
            }
            else {
                var html = "<span class='ui-icon ui-icon-";
                html += $(this).attr("data-online-icon");
                html += " ui-icon-shadow'></span>";
                $("div.ui-btn-inner", $(this)).append(html);
            }
        }

        $(this).attr("data-icon", $(this).attr("data-online-icon"));
    });


    $(".wsu-li-network-dependent a").each(function () {
        this.onclick = eval(this.getAttribute("data-onlineclick"));;
    });

    $(".wsu-li-managed a").each(function () {
        this.onclick = eval(this.getAttribute("data-onlineclick"));;
    });

    $(".wsu-btn-network-dependent").each(function () {
        if ($(this).attr("data-online-icon") == "false") {
            if ($("span.ui-btn-inner span", $(this)).length > 1) {
                $("span.ui-btn-inner span:last", $(this)).remove();
                $(this).removeClass("ui-btn-icon-right");
            }
        }
        else {
            if ($("span.ui-btn-inner span", $(this)).length > 1) {
                $("span.ui-btn-inner span:last", $(this)).removeClass("ui-icon-" + $(this).attr("data-icon"));
                $("span.ui-btn-inner span:last", $(this)).addClass("ui-icon-" + $(this).attr("data-online-icon"));
            }
            else {
                var html = "<span class='ui-icon ui-icon-";
                html += $(this).attr("data-online-icon");
                html += " ui-icon-shadow'></span>";
                $("span.ui-btn-inner", $(this)).append(html);
                $(this).addClass("ui-btn-icon-right");
            }
        }
        $(this).attr("data-icon", $(this).attr("data-online-icon"));
        this.onclick = eval(this.getAttribute("data-onlineclick"));;
    });


    //ready = true;
    $(".wsu-btn-managed").each(function () {
        if (ready != "true") {
            if ($(this).attr("data-online-icon") == "false") {
                if ($("span.ui-btn-inner span", $(this)).length > 1) {
                    $("span.ui-btn-inner span:last", $(this)).remove();
                    $(this).removeClass("ui-btn-icon-right");
                }
            }
            else {
                if ($("span.ui-btn-inner span", $(this)).length > 1) {
                    $("span.ui-btn-inner span:last", $(this)).removeClass("ui-icon-" + $(this).attr("data-icon"));
                    $("span.ui-btn-inner span:last", $(this)).addClass("ui-icon-" + $(this).attr("data-online-icon"));
                }
                else {
                    var html = "<span class='ui-icon ui-icon-";
                    html += $(this).attr("data-online-icon");
                    html += " ui-icon-shadow'></span>";
                    $("span.ui-btn-inner", $(this)).append(html);
                    $(this).addClass("ui-btn-icon-right");
                }
            }
            $(this).attr("data-icon", $(this).attr("data-online-icon"));
            this.onclick = eval(this.getAttribute("data-onlineclick"));;
        }
    });

    if (API.constantsAvailable != true) {
        //API.getConstants(API.app);
    }

    $.mobile.changePage("#home");

}

API.checkNetwork = function () {
    if (navigator.network.connection.type != Connection.NONE && navigator.network.connection.type != Connection.UNKNOWN) {
        if (API.debug == true) {
            console.log("");
            console.log("Checking network - online...");
        }
        return true;
    }
    else {
        if (API.debug == true) {
            console.log("");
            console.log("Checking network - offline...");
        }
        return false;
    }
}

//////////////////////
// DATASTORE
/////////////////////

API.datastoreRequest = function (dso) {
    //dso is an object with optional properties...

    this.App = "";
    this.Action = "";
    this.RecordNumber = 0;
    this.Key1 = "";
    this.Key2 = "";
    this.Key3 = "";
    this.Key4 = "";
    this.Key5 = "";
    this.Key6 = "";
    this.Key7 = "";
    this.Key8 = "";
    this.StartDate = "";
    this.Date1 = ""; //date field
    this.Date2 = ""; //date field
    this.OrderBy = "";
    this.XML = "<XML></XML>";
    this.Request = "";
    this.Reply = "";
    this.ErrorMessage = "";

    if (dso.App != undefined) { this.App = dso.App };
    if (dso.Action != undefined) { this.Action = dso.Action };
    if (dso.RecordNumber != undefined) { this.RecordNumber = dso.RecordNumber };
    if (dso.Key1 != undefined) { this.Key1 = dso.Key1 };
    if (dso.Key2 != undefined) { this.Key2 = dso.Key2 };
    if (dso.Key3 != undefined) { this.Key3 = dso.Key3 };
    if (dso.Key4 != undefined) { this.Key4 = dso.Key4 };
    if (dso.Key5 != undefined) { this.Key5 = dso.Key5 };
    if (dso.Key6 != undefined) { this.Key6 = dso.Key6 };
    if (dso.Key7 != undefined) { this.Key7 = dso.Key7 };
    if (dso.Key8 != undefined) { this.Key8 = dso.Key8 };
    if (dso.StartDate != undefined) { this.StartDate = dso.StartDate };
    if (dso.Date1 != undefined) { this.Date1 = dso.Date1 };
    if (dso.Date2 != undefined) { this.Date2 = dso.Date2 };
    if (dso.OrderBy != undefined) { this.OrderBy = dso.OrderBy };
    if (dso.XML != undefined) { this.XML = dso.XML };

    this.serialize = function () {
        this.Request = "<xRequest App='";
        this.Request += this.App;
        this.Request += "' Action='";
        this.Request += this.Action;
        this.Request += "' RecordNumber='";
        this.Request += this.RecordNumber;
        this.Request += "'>";
        this.Request += "";
        this.Request += "<Key1 Logic=''>";
        this.Request += this.Key1;
        this.Request += "</Key1>";
        this.Request += "<Key2 Logic=''>";
        this.Request += this.Key2;
        this.Request += "</Key2>";
        this.Request += "<Key3 Logic=''>";
        this.Request += this.Key3;
        this.Request += "</Key3>";
        this.Request += "<Key4 Logic=''>";
        this.Request += this.Key4;
        this.Request += "</Key4>";
        this.Request += "<Key5 Logic=''>";
        this.Request += this.Key5;
        this.Request += "</Key5>";

        this.Request += "<Key6 Logic=''>";
        this.Request += this.Key6;
        this.Request += "</Key6>";

        this.Request += "<Key7 Logic=''>";
        this.Request += this.Key7;
        this.Request += "</Key7>";

        this.Request += "<Key8 Logic=''>";
        this.Request += this.Key8;
        this.Request += "</Key8>";

        this.Request += "<StartDate>";
        this.Request += this.StartDate;
        this.Request += "</StartDate>";

        this.Request += "<Date1 Logic=''>";
        this.Request += this.Date1;
        this.Request += "</Date1>";

        this.Request += "<Date2 Logic=''>";
        this.Request += this.Date2;
        this.Request += "</Date2>";

        this.Request += "<OrderBy>";
        this.Request += this.OrderBy;
        this.Request += "</OrderBy>";
        this.Request += "";
        this.Request += this.XML;
        this.Request += "";
        this.Request += "<ErrorMessage></ErrorMessage>";
        this.Request += "</xRequest>";
    }

    this.submitRequest = function () {
        var reply;
        this.serialize();

        if (API.debug == true) {
            console.log("");
            console.log("Synchronous data request:");
            console.log(this.Request);
        }

        $(".ui-loader").show();
        $.ajax({
            type: "POST",
            async: false,
            url: API.server + "/PLATFORM2/DSRO.aspx" + "?r=" + (Math.random() * 10),
            data: { a: this.Request },
            success: function (data) {
                $(".ui-loader").hide();
                reply = data;
            },
            error: function (request, status, error) {
                if (API.debug == true) {
                    console.log(request.status);
                    console.log(status);
                    console.log(error);
                }
                $(".ui-loader").hide();
                reply = "error";
            }
        });
        return reply;
    }

    this.submitOnlineAsyncRequest = function (callback) {
        this.serialize();

        if (API.debug == true) {
            console.log("");
            console.log("Asynchronous data request:");
            console.log(this.Request);
        }

        $(".ui-loader").show();
        $.ajax({
            type: "POST",
            url: API.server + "/PLATFORM2/DSRO.aspx" + "?r=" + (Math.random() * 10),
            data: { a: this.Request },
            success: function (data) {
                $(".ui-loader").hide();
                callback(data);
            },
            error: function (request, status, error) {
                if (API.debug == true) {
                    console.log(request.status);
                    console.log(status);
                    console.log(error);
                }
                $(".ui-loader").hide();
                callback("error");
            }
        });
    }

    this.submitAsyncRequest = function (callback) {
        if (API.appType == "native") {
            try {
                this.serialize();
                API.getData(this.Request, callback);
            }
            catch (e) {
                callback("error");
            }
        }
        else {
            this.serialize();

            if (API.debug == true) {
                console.log("");
                console.log("Asynchronous data request:");
                console.log(this.Request);
            }

            $(".ui-loader").show();
            $.ajax({
                type: "POST",
                url: API.server + "/PLATFORM2/DSRO.aspx" + "?r=" + (Math.random() * 10),
                data: { a: this.Request },
                success: function (data) {
                    $(".ui-loader").hide();
                    callback(data);
                },
                error: function (request, status, error) {
                    if (API.debug == true) {
                        console.log(request.status);
                        console.log(status);
                        console.log(error);
                    }
                    $(".ui-loader").hide();
                    callback("error");
                }
            });
        }
    }

}

API.getData = function (request, callback) {
    if (API.debug == true) {
        console.log("");
        console.log("Local data request:");
        console.log(request);
    }

    var query = "";

    var xRequest = API.parseXML(request);

    var processResults = function (xml) {
        var xReply = API.parseXML(unescape(xml));
        var xPage = xReply.documentElement;
        var xp = xRequest.importNode(xPage, true);
        var xXML = xRequest.getElementsByTagName("XML")[0];
        xXML.appendChild(xp);
    }

    var callHome = function () {
        callback(API.serializeXML(xRequest));
    }


    var Key1 = $("Key1", xRequest)[0].firstChild.nodeValue;
    try {
        var Key2 = $("Key2", xRequest)[0].firstChild.nodeValue;
    }
    catch (e) {
        var Key2 = "";
    }
    try {
        var Key3 = $("Key3", xRequest)[0].firstChild.nodeValue;
    }
    catch (e) {
        var Key3 = "";
    }
    try {
        var Key4 = $("Key4", xRequest)[0].firstChild.nodeValue;
    }
    catch (e) {
        var Key4 = "";
    }
    try {
        var Key5 = $("Key5", xRequest)[0].firstChild.nodeValue;
    }
    catch (e) {
        var Key5 = "";
    }
    try {
        var Key6 = $("Key6", xRequest)[0].firstChild.nodeValue;
    }
    catch (e) {
        var Key6 = "";
    }
    try {
        var Key7 = $("Key7", xRequest)[0].firstChild.nodeValue;
    }
    catch (e) {
        var Key7 = "";
    }
    try {
        var Key8 = $("Key8", xRequest)[0].firstChild.nodeValue;
    }
    catch (e) {
        var Key8 = "";
    }
    try {
        var StartDate = $("StartDate", xRequest)[0].firstChild.nodeValue;
    }
    catch (e) {
        var StartDate = "";
    }
    try {
        var Date1 = $("Date1", xRequest)[0].firstChild.nodeValue;
    }
    catch (e) {
        var Date1 = "";
    }
    try {
        var Date2 = $("Date2", xRequest)[0].firstChild.nodeValue;
    }
    catch (e) {
        var Date2 = "";
    }
    try {
        var OrderBy = $("OrderBy", xRequest)[0].firstChild.nodeValue;
    }
    catch (e) {
        var OrderBy = "";
    }


    query = "SELECT * FROM Datastore where App = '" + xRequest.documentElement.getAttribute("App") + "' ";
    if (Key1 != "") {
        query += "and Key1 = '" + escape(Key1) + "' ";
    }
    if (Key2 != "") {
        query += "and Key2 = '" + escape(Key2) + "' ";
    }
    if (Key3 != "") {
        query += "and Key3 = '" + escape(Key3) + "' ";
    }
    if (Key4 != "") {
        query += "and Key4 = '" + escape(Key4) + "' ";
    }
    if (Key5 != "") {
        query += "and Key5 = '" + escape(Key5) + "' ";
    }
    if (Key6 != "") {
        query += "and Key6 = '" + escape(Key6) + "' ";
    }
    if (Key7 != "") {
        query += "and Key7 = '" + escape(Key7) + "' ";
    }
    if (Key8 != "") {
        query += "and Key8 = '" + escape(Key8) + "' ";
    }
    if (Date1 != "") {
        query += "and Date1 = '" + Date1 + "' ";
    }
    if (Date2 != "") {
        query += "and Date2 = '" + Date2 + "' ";
    }
    if (OrderBy != "") {
        query += "ORDER BY " + OrderBy + " ";
    }

    if (API.debug == true) {
        console.log("");
        console.log("Query:");
        console.log(query);
    }

    var app = xRequest.documentElement.getAttribute("App");
    //var localDB = openDatabase(app, "1.0", app, 5000000);
    //localDB.transaction(function (tx) {
    API.database.transaction(function (tx) {
        tx.executeSql(query, [], function (tx, results) {
            for (var i = 0; i < results.rows.length; i++) {
                processResults(results.rows.item(i).XML);
            }
            callHome();
        });

    });

}

API.refreshData = function (app, callback) {
    if (API.debug == true) {
        console.log("");
        console.log("API.refreshData executing...");
    }
    API.database.transaction(
    function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS Datastore', [], API.dropTableSucceeded, API.dropTableFailed);
        tx.executeSql('CREATE TABLE IF NOT EXISTS Datastore (RecordNumber, App varchar, Key1 varchar, Key2 varchar, Key3 varchar, Key4 varchar, Key5 varchar, Key6 varchar, Key7 varchar, Key8 varchar, Date1 varchar, Date2 varchar, Entered varchar, XML text)', [], API.createTableSucceeded, API.createTableFailed);
    },
    function (tx, err) {
        //console.log("datastore creation failed");
    },
    function () {
        //console.log("datastore creation succeded");
        API.insertRecords(app, callback);
    });
}

API.insertRecords = function (app, callback) {

    var xmlNodes = 0;

    var exQuery = function (query) {
        API.database.transaction(
            function (tx) {
                tx.executeSql(query, [], API.insertQuerySucceeded, API.insertQueryFailed);
            },
            function (tx, err) {
                API.transactionCount += 1;
                if (API.debug == true) {
                    console.log("Insertion of record " + API.transactionCount + " failed...");
                }
            },
            function () {
                API.transactionCount += 1;
                if (API.debug == true) {
                    console.log("Record " + API.transactionCount + " successfully inserted..." );
                }
            });
    }


    var insert = function (xml) {
        var xAll = API.parseXML(xml);
        var xmlNode = xAll.getElementsByTagName("XML")[0];
        xmlNodes = xmlNode.childNodes;

        $(".ui-loader").show();

        for (var i = 0; i < xmlNodes.length; i++) {
            var Keys = $("Keys", xmlNodes[i])[0];
            var keys = Keys.childNodes;
            var Key1 = keys[0].firstChild.nodeValue;
            var Key2 = keys[1].firstChild.nodeValue;
            var Key3 = keys[2].firstChild.nodeValue;
            var Key4 = keys[3].firstChild.nodeValue;
            var Key5 = keys[4].firstChild.nodeValue;
            var Key6 = keys[5].firstChild.nodeValue;
            var Key7 = keys[6].firstChild.nodeValue;
            var Key8 = keys[7].firstChild.nodeValue;
            var Date1 = keys[8].firstChild.nodeValue;
            var Date2 = keys[9].firstChild.nodeValue;
            var Entered = keys[10].firstChild.nodeValue;
            Keys.parentNode.removeChild(Keys);

            var xml = API.serializeXML(xmlNodes[i]);
            var query = "INSERT INTO Datastore values ('";
            query += xmlNodes[i].getAttribute("RecordNumber");
            query += "','";
            query += app;
            query += "','";
            query += escape(Key1);
            query += "','";
            query += escape(Key2);
            query += "','";

            query += escape(Key3);
            query += "','";
            query += escape(Key4);
            query += "','";
            query += escape(Key5);
            query += "','";
            query += escape(Key6);
            query += "','";
            query += escape(Key7);
            query += "','";
            query += escape(Key8);
            query += "','";

            query += Date1;
            query += "','";
            query += Date2;
            query += "','";

            query += Entered;
            query += "','";

            query += escape(xml);
            query += "')";

            if (API.verbose == true) {
                console.log("");
                console.log(query);
            }

            exQuery(query);

        }

    }

    var obj = { App: app, Action: "GetData" };
    var request = new API.datastoreRequest(obj);
    var reply = request.submitRequest();

    if (API.verbose == true) {
        console.log("");
        console.log("Datastore reply:");
        console.log(reply);
    }

    insert(reply);

    //delay callback until all records are inserted
    API.transactionCount = 0;
    var check = setInterval(
    function () {
        if (API.debug == true) {
            console.log("");
            console.log("Confirming insertion of " + xmlNodes.length + " records...");
        }
        if (API.transactionCount == xmlNodes.length) {
            clearInterval(check);
            if (API.debug == true) {
                console.log("");
                console.log("Setting ready = true, lastRefreshed = new timestamp, and data-dirty = true...");
            }
            localStorage.setItem(API.appReady, "true");
            localStorage.setItem(API.appRefreshed, new Date().valueOf());
            $("[data-dirty]").each(function () {
                $(this).attr("data-dirty", "true");
            });
            callback(true);
        }
    },
    1000);

}

API.dropTableSucceeded = function (tx, results) {
    //console.log("drop table succeeded!");
}

API.dropTableFailed = function (tx, err) {
    //console.log("drop table failed!");
}

API.createTableSucceeded = function (tx, results) {
    //console.log("create table succeeded!");
}

API.createTableFailed = function (tx, err) {
    //console.log("create table failed!");
}

API.insertQuerySucceeded = function (tx, results) {
    //console.log("insert query succeeded!");
}

API.insertQueryFailed = function (tx, err) {
    //console.log("insert query failed!");
}

API.manualRefresh = function () { // refreshed content and constants without checking refresh interval

    if (API.debug == true) {
        console.log("");
        console.log("API.manualRefresh executing...");
    }

    $(".ui-loader").show();
    $(".wsu-li-managed a,.wsu-li-network-dependent a,.wsu-btn-managed,.wsu-btn-network-dependent").each(function () {
        this.onclick = eval(this.getAttribute("data-offlineclick"));
    });

    API.getConstants(API.app);
    API.refreshData(API.app, API.onRefresh);
}

////////////////////
// EXTERNAL CONTENT
///////////////////

API.showLocalPage = function (file) {

    if (API.debug == true) {
        console.log("Showing local page: " + file);
    }

    if (API.appType == "native" && API.simulateEvents == false) {
        //presume running in simulator or on device
        try {
            var strPath = window.location.href;
            var path = strPath.substring(0, strPath.lastIndexOf("/") + 1) + file;
            window.plugins.childBrowser.showWebPage(encodeURI(path), { showLocationBar: true });
        }
        catch (e) {
            if (API.debug == true) {
                console.log("Error displaying local page: " + file);
                console.log(e);
            }
        }
    }
    else {
        //presume running in browser; childBrowser not available
        //alert("Showing " + file);
        API.showPage(file);
    }
}

API.showPage = function (url) {

    if (API.debug == true) {
        console.log("");
        console.log("API.showPage executing, displaying " + url);
    }

    if (API.appType == "native" && API.simulateEvents == false) {
        //presume running in simulator or on device
        if (API.deviceOnline == true) {
            window.plugins.childBrowser.showWebPage(url, { showLocationBar: true });
        }
    }
    else if (API.appType == "native" && API.simulateEvents == true) {
        // web simulation
        window.open(url);
    }
    else {
        // presume running as web app
        window.open(url);
    }
}

/////////////
// UTILITIES
////////////

API.getCalendarFeed = function (days, filename, callback) {

    var request = "<xRequest days='";
    request += days;
    request += "'>";
    request += "";
    request += "<filename><![CDATA[";
    request += filename;
    request += "]]></filename>";
    request += "";
    request += "</xRequest>";

    if (API.debug == true) {
        console.log("");
        console.log("Google calendar feed request:");
        console.log(request);
    }

    $(".ui-loader").show();
    $.ajax({
        type: "POST",
        cache: false,
        url: API.server + "/PLATFORM2/Calendars.aspx" + "?r=" + (Math.random() * 10),
        data: { a: request },
        success: function (data) {
            //console.log(data);
            $(".ui-loader").hide();
            callback(data);
        },
        error: function (request, status, error) {
            $(".ui-loader").hide();
            callback("error");
        }
    });
}

API.parseXML = function (xString) {
    var xmlDoc;
    var parser;
    try // IE
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        //xmlDoc = new ActiveXObject("MSXML.XMLDOMDocument");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xString);
    }
    catch (e) {
        try // Firefox etc.
        {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(xString, "text/xml");
        }
        catch (e) {
            alert(e.message);
            return;
        }
    }
    return xmlDoc;
}

API.serializeXML = function (xDoc) {
    if (typeof XMLSerializer != "undefined") {
        var xs = new XMLSerializer();
        return xs.serializeToString(xDoc);
    }
        //else if (IML.xmlContent.xml) {
    else if (xDoc.xml) {
        return xDoc.xml;
    }
}

API.rightTrim = function (sString) {
    if (sString != "") {
        while (sString.substring(sString.length - 1, sString.length) == ' ') {
            sString = sString.substring(0, sString.length - 1);
        }
    }
    return sString;
}

API.leftTrim = function (sString) {
    if (sString != "") {
        while (sString.substring(0, 1) == ' ') {
            sString = sString.substring(1);
        }
    }
    return sString;
}

API.trim = function (sString) {
    sString = API.leftTrim(sString);
    sString = API.rightTrim(sString);
    return sString;
}

API.crToBr = function (txt) { //changes textarea carriage returns to <br/>
    txt = escape(txt);
    //encode all characters in text area   
    //to find carriage return character   
    for (i = 0; i < txt.length; i++) {
        //loop through string, replacing carriage return    
        //encoding with HTML break tag   
        if (txt.indexOf("%0D%0A") > -1) {
            //Windows encodes returns as \r\n hex   
            txt = txt.replace("%0D%0A", "<br />");
        }
        else if (txt.indexOf("%0A") > -1) {
            //Unix encodes returns as \n hex
            txt = txt.replace("%0A", "<br />");
        }
        else if (txt.indexOf("%0D") > -1) {
            //Macintosh encodes returns as \r hex
            txt = txt.replace("%0D", "<br />");
        }
    }
    txt = unescape(txt);
    //decode all characters in text area back??????????? 
    return txt;
}

API.setSessionCookie = function (name, value) {
    var exp = new Date();
    document.cookie = name + "=" + value;
    //document.cookie = name + "=" + value + ";max-age=30";
    //document.cookie = name + "=" + value + ";expires=" + exp.toGMTString();
}

API.getCookie = function (name) {
    var value = "";
    var position = document.cookie.indexOf(name + "=");
    if (position != -1) {
        var start = position + name.length + 1;
        var end = document.cookie.indexOf(";", start);
        if (end == -1) {
            end = document.cookie.length;
        }
        value = document.cookie.substring(start, end);
    }
    return value;
}

API.removeCookie = function (name) {
    document.cookie = name + "=none;max-age=0"
    //document.cookie = name + "='';max-age=0"
    //document.cookie = name + "='';expires=Thu, 01-Jan-70 00:00:01 GMT";
}

API.doNothing = function () {
    return false;
}
