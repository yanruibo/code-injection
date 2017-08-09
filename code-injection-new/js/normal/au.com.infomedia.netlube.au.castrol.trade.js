
var DBUG = {

	dtListItemClick: 0
	,dtPageBeforeCreate: 0
	,dtPageCreate: 0
	,dtPageInit: 0
	,dtPageBeforeShow: 0
	,dtPageShow: 0
	,dtPageBeforeHide: 0
	,dtPageHide: 0
	,dtStartTimeModelCountServiceCallAndInjection: 0
	,dtEndTimeModelCountServiceCallAndInjection: 0
	,dtStartTimeDrilldownServiceCall: 0
	,dtEnd1TimeDrilldownServiceCall: 0
	,dtEnd2TimeDrilldownServiceCall: 0
	,dtBackButtonClick: 0
	,dtStartTimeListFill: 0
	,dtEndTimeListFill: 0

	,MyTest: function(sElement) {

		/*
		To access this function, put this:
		<div id="idTestArea" style="height: 2em;"><a href="javascript: DBUG.MyTest('#page2');">test link</a></div>

		after this:
		<div data-role="page" id="page1">
			<div data-theme="a" data-role="header" data-position="fixed">
			<h3>
				<!--Select Vehicle-->
			</h3>

		then click on the resultant link.
		*/


		/*
		var $video = $("#page1");
		var $ve = $video.data("events");

		// checking if a `loadedmetadata` object exists in `data("events")`
		if ($ve != null && typeof ($ve.loadedmetadata) !== undefined) {
			// has loadedmetadata event
			DBUG.Log('ok');
		}
			else DBUG.Log('no good');
		*/

		var //sElement
			sEventNames
			, oEvents;

		//sElement = "#page1";
		//sElement = "#idPage1Id1";
		//sElement = "ul[data-role=\"listview\"]";

		/*
		//var foo = $.data($('#page1').get(0), 'events').click
		//var foo = jQuery._data("#page1", "events");
		var foo = jQuery(sElement).data("events").click;
		// you can query $.data( object, 'events' ) and get an object back, then see what events are attached to it.

		if (foo == undefined)
		DBUG.Log('Events on element "' + sElement + '" are undefined.');
		else {
		sEventNames = "";
		$.each(foo, function(i, o) {
		//DBUG.Log('guid="' + i + '", function definition="' + o + '"'); // i = guid of the event
		//DBUG.Log(o) // o = the function definition of the event handler
		sEventNames = sEventNames + i + ", ";
		});
		DBUG.Log('event names: ' + sEventNames);
		}
		*/
		oEvents = $(sElement).data("events");
		if (oEvents == undefined)
			DBUG.Log("No events on \"" + sElement + "\".");
		else
			$.each(oEvents
							, function(i, event) {
								DBUG.Log(i);
								$.each(event
									, function(j, h) {
										DBUG.Log("handler for " + i + ": " + h.handler);
									}
								);
							}
						);

	}

	// ------------------------------------------------------------------------------------

	, ShowText: function(sText) {
		$("h3").html(sText);
	}

	// ------------------------------------------------------------------------------------

	, OutputAllHTML: function(lPageNumber) {
		//if (lPageNumber == GENRL.PAGE.eEquipment) {
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			varFileObject = fso.OpenTextFile("C:\\Temp\\Lube\\iOSApp\\OuterHTML.htm", 2, true, 0); // 2=overwrite, true=create if not exist, 0 = ASCII
			varFileObject.write(document.documentElement.outerHTML);
			varFileObject.close();
		//}
	}

	// ------------------------------------------------------------------------------------

	, Log: function(sText) {
		if (APPCONFIG.bDevelopmentMode != undefined)
			if (APPCONFIG.bDevelopmentMode)
				console.log(sText);
	}
};


// These are to be loaded before the jquery mobile library is loaded.

$(document).bind("mobileinit", function() {
	$.mobile.listview.prototype.options.filterPlaceholder = "search";
	//$.mobile.defaultPageTransition = "slide";
	//$.mobile.pageContainer = $('#container');
	$.mobile.defaultPageTransition = "none";
});











			// ------------------------------------------------------------------------------------

			var GENRL =
			{
				PAGE: {
					eNone: 0
					, eEquipment: 1
					, eMake: 2
					, eModel: 3
					, eCompartment: 4
					, eLubeRecommendations: 5
				}

				, klTimeMinimumBetweenKeystrokes: 200 // milliseconds. =60 words/minute at 5 chars/word.
				, klRecentSearchesLengthMaximum: 20
				, sSearchBoxTextAtKeyUpPrevious: ""
				, klTimeMinimumAfterClick: 500 // milliseconds
				, bPageShown: false
				, lModelCountMaximumClickable: 400 // Overwritten from server, but give it a proper initial value, just in case.

				// ------------------------------------------------------------------------------------

				, SettingsRequest: function() {
					$.ajax({ url: MISC.SlashAppend(APPCONFIG.ServerURL) + "ServiceExecute.asp"
						, type: "GET"
						, data: { f: "settings"
							, LubeSupplierName: APPCONFIG.sLubeSupplierName
							, CustomerName: APPCONFIG.sCustomerName
							, CountryName: APPCONFIG.sCountryName
							, Flavour: APPCONFIG.sFlavour
							, Version: APPCONFIG.sVersion
							}
						, cache: false
						, async: false
						, dataType: "jsonp"
						, success: CALLBAX.SettingsGet
						, error: CALLBAX.ErrorFromService
					});
				}

				// ------------------------------------------------------------------------------------

				, DocumentTitleSet: function(sLubeSupplierName, sCustomerName, sCountryName, sFlavour) {
					var sText;

					if (sCustomerName.toLowerCase() === "=supplier"
							|| sCustomerName.toLowerCase() === sLubeSupplierName.toLowerCase())
						sCustomerName = "";

					if (sLubeSupplierName != "") sLubeSupplierName = sLubeSupplierName + " ";
					if (sCustomerName != "") sCustomerName = sCustomerName + " ";
					if (sCountryName != "") sCountryName = sCountryName + " ";
					if ($.trim(sCustomerName.toLowerCase()) === "retail"
							|| $.trim(sCustomerName.toLowerCase()) === "trade")
						sText = sLubeSupplierName + sCustomerName;
					else
						sText = sCustomerName + sLubeSupplierName;
					sText = $.trim(sText + sCountryName + sFlavour);
					return "NetLube - " + sText;
				}

				// ------------------------------------------------------------------------------------

				, SearchCriteriaGet: function() {
					return $.trim($("#page1 input[data-type=\"search\"]").val());
				}

				// ------------------------------------------------------------------------------------

				, LoadingIndicate: function(bTurnOn) {
					GENRL.bPageShown = ! bTurnOn;
					//DBUG.Log("LoadingIndicate " + bTurnOn + " -> bPageShown=" + GENRL.bPageShown);
					if (bTurnOn)
					{
						// Delay "mobile.loading("show")" via this timer:
						//DBUG.Log("setTimeout");
						window.setTimeout(CALLBAX.PostClickTimesUp, GENRL.klTimeMinimumAfterClick);
						//$.mobile.loading("show");
					}
					else
					{
						$.mobile.loading("hide");
					}
				}

				// ------------------------------------------------------------------------------------

				, ListItemClickAction: function(lCurrentLevel, lItemId, oThis) {
					// lCurrentLevel: 0=no page yet, Equipment=1 , Make=2, etc.
					var sSearchValue
						,bPerformMainAction
						,bDisabledItemChosen
						,sItemCSSId;

					//DBUG.Log("ListItemClickAction, set time");
					//DBUG.dtListItemClick = new Date().getTime();

					if (oThis == null)
						bPerformMainAction = true;
					else
					{
						sItemCSSId = "#" + oThis.id;
						bDisabledItemChosen = $(sItemCSSId + " .clsListItemText").hasClass("ui-disabled");
						bPerformMainAction = ! bDisabledItemChosen;
						// If the user clicks on a disabled list item, pop up a message.
						if (bDisabledItemChosen)
							$('#idPopupSearchTooManyMatches').popup("open", {"positionTo": sItemCSSId});
					}

					if (bPerformMainAction)
					{
						//DBUG.Log("ListItemClickAction curr level=" + lCurrentLevel + ", ItemId=" + lItemId + " -> indicate loading");
						GENRL.LoadingIndicate(true);

						//if (lCurrentLevel == GENRL.PAGE.eEquipment)
							/* See if the clicked item has a model count in its text, in which case this click is part of
								a model search, not the drilldown model selection method. */
							GENRL.RecentSearchesShow(false);
							if ($("#page1 .clsListItemText").hasClass("clsListItemHasModelCount"))
							{
								sSearchValue = GENRL.SearchCriteriaGet();
								//DBUG.Log("sSearchValue=" + sSearchValue);
								GENRL.RecentSearchesInsert(sSearchValue);
							}
							else
								sSearchValue = "";

						//DBUG.dtStartTimeDrilldownServiceCall = new Date().getTime();

						$.ajax({ url: MISC.SlashAppend(APPCONFIG.ServerURL) + "ServiceExecute.asp"
							, type: "GET"
							, data: { f: "drilldown", CurrentLevel: lCurrentLevel, SelectedItemId: lItemId
								, Criteria: sSearchValue, ReturnDataType: "html"
								, LubeSupplierName: APPCONFIG.sLubeSupplierName
								, CustomerName: APPCONFIG.sCustomerName
								, CountryName: APPCONFIG.sCountryName
								, Flavour: APPCONFIG.sFlavour
								, Version: APPCONFIG.sVersion
								}
							, cache: false // This adds parameter "_" to the query string with a current-time-related numeric value.
							, async: false // Required to be false, it seems, even for jsonp, otherwise list item rendering is unfinished.
							/* Using jsonpCallback causes error "Error: CALLBAX.ListFill was not called",
							to be returned to the error hook. So let jQuery name the callback
							(e.g. "jQuery171025969744705415065_1361417423412") which then calls the success hook,
							which then calls CALLBAX.ListFill. This gives jQuery a chance to do stuff first
							(within its jQuery17102... callback) and the error goes away.
							http://stackoverflow.com/questions/7167488/use-of-success-jsonpcallback-with-ajax-request
							*/
							//, jsonpCallback: "CALLBAX.ListFill"
							, dataType: "jsonp"
							, success: CALLBAX.ListFill
							, error: CALLBAX.ErrorFromService
						});

						//DBUG.dtEnd1TimeDrilldownServiceCall = new Date().getTime();
						//DBUG.Log("DrillDown service call ms=" + (DBUG.dtEnd1TimeDrilldownServiceCall - DBUG.dtStartTimeDrilldownServiceCall));

						//DBUG.Log('hasClass=' + $('#page2 a[data-rel=\"back\"]').hasClass('ui-btn'));
					}
				}

				// ------------------------------------------------------------------------------------

				, Page1ModelCountsMaybeRemove: function(sTextboxText) {
					// This function assumes sTextboxText is already trimmed.
					//DBUG.Log("Page1ModelCountsMaybeRemove: textbox value (trimmed)=\"" + sTextboxText + "\"");

					if (sTextboxText == "") { // Textbox is clear?
						if ($("#page1 .clsListItemText").hasClass("clsListItemHasModelCount")) {
							$("#page1 .clsListItemText").removeClass("clsListItemHasModelCount");
							//DBUG.Log("removed class 1");
						}

						if ($("#page1 .clsListItemText").hasClass("ui-disabled"))
							$("#page1 .clsListItemText").removeClass("ui-disabled");

						$("#page1 .clsModelCount").remove();

						//if ($("#page1 .clsListItemText").hasClass("clsPageHasZeroModelCount")) {
						$("#page1 li[id^=\"idPage1Id\"]").removeClass("clsPageHasZeroModelCount");
						//DBUG.Log("removed class 2");
						//}
					}
				}

				// ------------------------------------------------------------------------------------

				, RecentSearchesInsert: function(sSearchValue) {
					// Insert the search criteria at the top of the Recent Searches list.

					//DBUG.Log("value=" + $("#idRecentSearches li[role=\"heading\"] + li.ui-btn").text());
					// If sSearchValue is already in the list, remove it. Then we'll re-add it to the top (see below).
					$("#idRecentSearches li.ui-btn").each(function() {
							if ($(this).text() == sSearchValue) // $(this).text() is already trimmed.
							{
								$(this).remove();
								return false; // There'd only be one instance in the list (if at all), so break out early.
							}
						}
					);

					// If the the list is at maximum length, remove the last (oldest) item before prepending the new one.
					if ($("#idRecentSearches li.ui-btn").length >= GENRL.klRecentSearchesLengthMaximum)
						$("#idRecentSearches li.ui-btn:last-child").remove();

					// Prepend the new item.
					//if ($.trim($("#idRecentSearches li[role=\"heading\"] + li.ui-btn").text()) != sSearchValue)
					//{
					$("<li data-theme=\"b\" data-icon=\"false\"><a>" + sSearchValue + "</a></li>").insertAfter("#idRecentSearches li[role=\"heading\"]");
					if ($("#idRecentSearches").hasClass('ui-listview'))
						$("#idRecentSearches").listview('refresh');
					//}
				}

				// ------------------------------------------------------------------------------------

				, RecentSearchesShow: function(bShow) {
					if (bShow)
					{
						if ($("#idRecentSearches").css("display") == "none")
						{
							$("#idRecentSearches li").removeClass("ui-corner-top"); // Remove rounded corners from the topmost list item, so that the list looks like it drops down from the filter bar.
							//sText = $.trim(this.value);
							//if (this.value == "") //(sText == "")
							if ($.trim($("#idRecentSearches li[role=\"heading\"] + li.ui-btn").text()) != "") // Only display recent searches if there are any.
							{
								CALLBAX.ScreenOverlay(true);
								//DBUG.Log ("position top=" + $("#page1 .ui-listview-filter").position().top);
								//DBUG.Log ("height=" + $("#page1 .ui-listview-filter").height());
								//DBUG.Log ("offset top=" + $("#page1 .ui-listview-filter").offset().top);
								///*
								$("#idRecentSearches").css({
									display: "block"
									,top: $("#page1 .ui-listview-filter").offset().top + $("#page1 .ui-listview-filter").height() - 13
								});
								//*/
							}
						}
						//else the list is already shown.
					}
					else // Hide.
						if ($("#idRecentSearches").css("display") != "none")
							$("#idRecentSearches").css({display: "none"});
						//else the list is already hidden.
				}

			};

			// ------------------------------------------------------------------------------------

			var CALLBAX =
			{

				bFilterbarKeystrokeTimedOut: true

				// ------------------------------------------------------------------------------------

				, PostClickTimesUp: function() {
					if (GENRL.bPageShown)
					{
						//DBUG.Log("PostClickTimesUp -> hide cos page shown");
						$.mobile.loading("hide");
					}
					else
					{
						//DBUG.Log("PostClickTimesUp -> show cos page now shown");
						$.mobile.loading("show");
					}
				}

				// ------------------------------------------------------------------------------------

				, ScreenOverlay: function(bShow) {
					//DBUG.Log("ScreenOverlay: " + bShow);
					if (bShow)
						;/*
						$("#idScreen").css({
							"display": "block"
							,"width": 100//$(document).width()
							,"height": 100//$(document).height()
							,"opacity": 0.5
							//,"filter": "alpha(opacity=50)" // IE8
							//,"-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(opacity=30)"
							//,"filter": "progid:DXImageTransform.Microsoft.Alpha(opacity=30)"
							//,"filter": "alpha(opacity=15)"
							//,opacity: 0.5 // Safari, Opera
							//,"-moz-opacity": 0.3 // FireFox
						});
						*/
					else
						$("#idScreen").css({
							"display": "none"
							,"width": 0
							,"height": 0
							,"opacity": 0
							//,"filter": "alpha(opacity=0)" // IE
							//,"-moz-opacity": 0 // FireFox
						});
				}

				// ------------------------------------------------------------------------------------

				, RecentSearchesClear: function() {
					$("#idRecentSearches li.ui-btn").remove();
					GENRL.RecentSearchesShow(false);
				}

				// ------------------------------------------------------------------------------------

				, RecentSearchesHide: function() {
					GENRL.RecentSearchesShow(false);
				}

				// ------------------------------------------------------------------------------------

				, RecentSearchesListItemClick: function(oEvent) {
					//DBUG.Log("thisvalue=" + $(this).text());
					//DBUG.Log("RecentSearchesListItemClick");
					GENRL.RecentSearchesShow(false);
					//$("#page1 input[data-type=\"search\"]").trigger("keydown");
					$("#page1 input[data-type=\"search\"]").val($(this).text());
					$("#page1 input[data-type=\"search\"]").trigger("keyup");
				}

				// ------------------------------------------------------------------------------------

				, ListItemClick: function(oEvent) {
					//DBUG.Log("ListItemClick: this.id=" + this.id);
					/*
					DBUG.Log('ListItemClick: lReturnedLevel="' + oEvent.data.lReturnedLevel
					+ '", $(this).index()="' + $(this).index()
					+ '", UnderlyingId="' + oEvent.data.lItemListIds[$(this).index()] + '"');
					*/

					GENRL.ListItemClickAction(oEvent.data.lReturnedLevel, oEvent.data.lItemListIds[$(this).index()], this);
					//oEvent.preventDefault(); // May be unnecessary.
					//return false; // Same as .preventDefault(). Each list item's <a> has no href set anyway, so that too may have the same effect as this.
				}

				// ------------------------------------------------------------------------------------

				, BackButtonCaptionSet: function(oEvent) {
					var sSelector;

					sSelector = oEvent.data.sPageId + " a[data-rel=\"back\"]";

					/* Cater for the case where there's only one vehicle type,
						in which case the first page is page2 (manufacturers), not vehicle types (page1),
						therefore the Back button (labelled "Nowhere") on page2 should be hidden. */
					if (oEvent.data.sCaption == "Nowhere")
					{
						if ($(sSelector).css("display") != "none")
							$(sSelector).css({display: "none"});
					}
					else
					{
						$(sSelector + " .ui-btn-text").text(oEvent.data.sCaption);
						if ($(sSelector).css("display") == "none")
							$(sSelector).css({display: "inline-block"});
					}
				}

				// ------------------------------------------------------------------------------------

				, ListFill: function(oResultFromWebService) {
					var sSelector
						, sDestinationPageId;

					//DBUG.dtEnd2TimeDrilldownServiceCall = new Date().getTime();
					//DBUG.Log("DrillDown-to-ListFill ms=" + (DBUG.dtEnd2TimeDrilldownServiceCall - DBUG.dtEnd1TimeDrilldownServiceCall));
					//DBUG.dtStartTimeListFill = new Date().getTime();

					sDestinationPageId = "#page" + oResultFromWebService[0].lReturnedLevel;

					//if (oResultFromWebService[0].lReturnedLevel > 1)
					//	DBUG.Log('ListFill: lReturnedLevel="' + oResultFromWebService[0].lReturnedLevel + '"');

					if (oResultFromWebService[0].lReturnedLevel > GENRL.PAGE.eEquipment) // There's no "Back" button on the eEquipment page.
						// Make the BackButtonCaptionSet event handler remove itself after use by using "one", not "on":
						$(sDestinationPageId).one("pagebeforeshow", null
							, { sPageId: sDestinationPageId
								, sCaption: oResultFromWebService[0].sBackButtonCaption
							}
							, CALLBAX.BackButtonCaptionSet);

					// Inject heading text, e.g. at the compartment level, it's the model: "147, 2.0 Litre Twin Spark Eng., Manual (2001-2007)".
					$(sDestinationPageId + ' div[data-role="header"] h3').html(oResultFromWebService[0].sHeading);

					// Inject instructional text, e.g. at the compartment level, "Select Compartment".
					$(sDestinationPageId + ' ul.clsDrillDownList li[role="heading"]').html(oResultFromWebService[0].sInstruction);

					if (oResultFromWebService[0].lReturnedLevel == GENRL.PAGE.eLubeRecommendations) // 5=Lube data in compartment.
					{
						sSelector = 'div[data-role="content"]';
						$(sDestinationPageId + ' ' + sSelector).html(oResultFromWebService[0].sItemList);
					}
					else // 1-4=Drilldown menus.
					{
						// Detach event handlers from the page that we're going to.
						$(sDestinationPageId + " ul.clsDrillDownList").off("click", "li[data-theme=\"b\"]", CALLBAX.ListItemClick);

						// Replace old list items with new.
						//sSelector = 'ul li[role="heading"]';
						sSelector = 'ul.clsDrillDownList[data-role="listview"] li[role="heading"]';
						sSelector = sDestinationPageId + " " + sSelector;
						$(sSelector).nextAll().remove(); // Remove all siblings (list items) after the first list item, which is an instructional heading.
						$(oResultFromWebService[0].sItemList).insertAfter(sSelector);

						sSelector = sDestinationPageId + " ul.clsDrillDownList[data-role=\"listview\"]";
						if ($(sSelector).hasClass('ui-listview'))
							$(sSelector).listview('refresh');
						/*else
						$(sSelector).trigger('create');*/

						// Attach event handlers to the page we're going show, to handle list item clicks.
						$(sDestinationPageId + " ul.clsDrillDownList").on("click", "li[data-theme=\"b\"]", oResultFromWebService[0], CALLBAX.ListItemClick);
					}

					//DBUG.Log("ListFill -> indicate not loading");
					GENRL.LoadingIndicate(false); // Just to make sure the loading spinner is hidden.

					//DBUG.dtEndTimeListFill = new Date().getTime();
					//DBUG.Log("ListFill itself ms=" + (DBUG.dtEndTimeListFill - DBUG.dtStartTimeListFill));

					//DBUG.Log('going to ' + sDestinationPageId + '" except #page1');
					if (oResultFromWebService[0].lReturnedLevel > GENRL.PAGE.eEquipment) { // No need to explicity go to page1. It happens automatically.
						//$.mobile.loadPage(sDestinationPageId, { showLoadMsg: false });
						//window.location.hash = sDestinationPageId;

						//$.mobile.changePage($(sDestinationPageId), {transition: "slide", reverse: false});
						$.mobile.changePage($(sDestinationPageId));
					}
				}

				// ------------------------------------------------------------------------------------

				, ErrorFromService: function(xhr, ajaxOptions, thrownError) {
					var sText;

					sText = "xhr.status=" + xhr.status + ", thrownError=" + thrownError;
					DBUG.Log(sText);
					//$("<h3>" + sText "</h3>").insertBefore("h3");
					//DBUG.ShowText(sText);
				}

				// ------------------------------------------------------------------------------------

				, SearchResult: function(oResultFromWebService) {
					var lItem
					//, lCount;
					, sTextNew
					, sCount;

					/*
					for (lItem = 0; lItem < oResultFromWebService.length; lItem++) {
					DBUG.Log("Item " + lItem + ": #idPage1Id" + oResultFromWebService[lItem].sect_id + ": \""
					+ $("#idPage1Id" + oResultFromWebService[lItem].sect_id).text() + "\"");
					$("#idPage1Id" + oResultFromWebService[lItem].sect_id).text(
					oResultFromWebService[lItem].sect + " (" + oResultFromWebService[lItem].TheCount + ")"
					);
					}
					*/
					if (oResultFromWebService.length == 0) {
						//DBUG.Log("SearchResult: " + oResultFromWebService.length + " items.");
						//CALLBAX.lCount = -3;
					}
					else {
						//DBUG.Log("SearchResult: " + oResultFromWebService.length + " items.");
						//DBUG.Log("SearchResult: id=" + oResultFromWebService[0].sect_id + ", " + oResultFromWebService[0].TheCount + " models match.");
						//CALLBAX.lId = oResultFromWebService[0].sect_id;
						//CALLBAX.lCount = oResultFromWebService[0].TheCount;
						//CALLBAX.sText = oResultFromWebService[0].sect;

					}

					for (lItem = 0; lItem < oResultFromWebService.length; lItem ++) {

						//DBUG.Log(oResultFromWebService[lItem].sect);

						sCount = "(" + oResultFromWebService[lItem].TheCount + ")";
						//sCount = "<div class=\"clsModelCount\" style=\"float: right;\">" + sCount + "</div>";
						sCount = "<span class=\"clsModelCount\">" + sCount + "</span>";
						sTextNew = oResultFromWebService[lItem].sect + sCount;

						//$("#idPage1Id" + oResultFromWebService[lItem].sect_id + " .clsListItemContentContainer .clsModelCount").remove();
						$("#idPage1Id" + oResultFromWebService[lItem].sect_id + " .clsModelCount").remove();

						if (!$("#idPage1Id" + oResultFromWebService[lItem].sect_id + " .clsListItemText").hasClass("clsListItemHasModelCount"))
						{
							$("#idPage1Id" + oResultFromWebService[lItem].sect_id + " .clsListItemText").addClass("clsListItemHasModelCount");
						}

						if (oResultFromWebService[lItem].TheCount > GENRL.lModelCountMaximumClickable)
						{
							if (!$("#idPage1Id" + oResultFromWebService[lItem].sect_id + " .clsListItemText").hasClass("ui-disabled"))
								$("#idPage1Id" + oResultFromWebService[lItem].sect_id + " .clsListItemText").addClass("ui-disabled");
						}
						else
							if ($("#idPage1Id" + oResultFromWebService[lItem].sect_id + " .clsListItemText").hasClass("ui-disabled"))
								$("#idPage1Id" + oResultFromWebService[lItem].sect_id + " .clsListItemText").removeClass("ui-disabled");

						//$("#idPage1Id" + oResultFromWebService[lItem].sect_id + " .clsListItemContentContainer").append(sCount);
						//$("#idPage1Id" + oResultFromWebService[lItem].sect_id + " .ui-btn-text").after(sCount);
						$("#idPage1Id" + oResultFromWebService[lItem].sect_id + " span.ui-icon-arrow-r").prepend(sCount); // Prepend model count to the right-arrow icon.

						//$("#idPage1Id" + oResultFromWebService[lItem].sect_id + " .clsListItemText").html(sTextNew);
						if (oResultFromWebService[lItem].TheCount == 0) {
							if (!$("#idPage1Id" + oResultFromWebService[lItem].sect_id).hasClass("clsPageHasZeroModelCount"))
								$("#idPage1Id" + oResultFromWebService[lItem].sect_id).addClass("clsPageHasZeroModelCount");
						}
						else
							if ($("#idPage1Id" + oResultFromWebService[lItem].sect_id).hasClass("clsPageHasZeroModelCount"))
								$("#idPage1Id" + oResultFromWebService[lItem].sect_id).removeClass("clsPageHasZeroModelCount");

					}

					//CALLBAX.bFilterbarKeystrokeTimedOut = true; // This will allow another timer to be kicked off.

					//DBUG.dtEndTimeModelCountServiceCallAndInjection =  new Date().getTime();
					//DBUG.Log("SearchResult model count query & injection ms=" + (DBUG.dtEndTimeModelCountServiceCallAndInjection - DBUG.dtStartTimeModelCountServiceCallAndInjection));

				}

				// ------------------------------------------------------------------------------------

				, FilterTimesUp: function() {
					var sSearchValue;

					CALLBAX.bFilterbarKeystrokeTimedOut = true; // This will allow another timer to be kicked off.
					sSearchValue = GENRL.SearchCriteriaGet();
					//DBUG.Log("FilterTimesUp. Searchbox text (trimmed)=\"" + sSearchValue + "\".");
					if (sSearchValue == "")
						GENRL.Page1ModelCountsMaybeRemove(sSearchValue);
					else {
						//lId = oListItem.attr("id").substr(oListItem.attr("id").lastIndexOf("Id") + 2); // For "idPageXIdY", lId = Y.

						//DBUG.dtStartTimeModelCountServiceCallAndInjection =  new Date().getTime();

						lId = 0;
						$.ajax({ url: MISC.SlashAppend(APPCONFIG.ServerURL) + "ServiceExecute.asp"
								, type: "GET"
								, data: { f: "search", Criteria: sSearchValue
									, LubeSupplierName: APPCONFIG.sLubeSupplierName
									, CustomerName: APPCONFIG.sCustomerName
									, CountryName: APPCONFIG.sCountryName
									, Flavour: APPCONFIG.sFlavour
									, Version: APPCONFIG.sVersion
									}
								, cache: false
								, async: false
								, dataType: "jsonp"
								, success: CALLBAX.SearchResult
								, error: CALLBAX.ErrorFromService
						});
						//DBUG.Log("    called service");
					}
				}

				// ------------------------------------------------------------------------------------

				, defaultSearch: function(sText, sSearchValue, oListItem) {
					return false; // Remove no items.
				}

				// ------------------------------------------------------------------------------------

				, Page1SearchInputKeyDown: function() {
					// Occurs BEFORE the filterCallback event.
					//var sText;

					//GENRL.sSearchBoxTextAtKeyDown = $.trim(this.value);
					//DBUG.Log("Page1SearchInputKeyDown: textbox value(trimmed)=\"" + GENRL.sSearchBoxTextAtKeyDown + "\"");
				}

				// ------------------------------------------------------------------------------------

				, Page1SearchFocus: function() {
					//DBUG.Log("search focus in");
					GENRL.RecentSearchesShow(true);
				}

				// ------------------------------------------------------------------------------------

				, Page1SearchFocusOut: function() {
					//DBUG.Log("search focus out");
					//GENRL.RecentSearchesShow(false);
				}

				// ------------------------------------------------------------------------------------

				, Page1SearchChange: function() {
					// Fires upon a change to the textbox text before losing focus.
					//DBUG.Log("search change");
				}

				// ------------------------------------------------------------------------------------

				, Page1SearchInputKeyPress: function(oEvent) {
					// Doesn't respond to backspace, Alt, Ctrl, Shift. Responds to Esc though.
					//DBUG.Log("Page1SearchInputKeyPress: key=" + oEvent.which);
				}

				// ------------------------------------------------------------------------------------

				, Page1SearchInputKeyUp: function() {
					// Occurs AFTER the filterCallback event.
					// and seems to occur before the model counts are returned from ajax; not after.
					var sSearchBoxTextAtKeyUp;

					sSearchBoxTextAtKeyUp = $.trim(this.value);
					//DBUG.Log("Page1SearchInputKeyUp: textbox value(trimmed)=" + sSearchBoxTextAtKeyUp);
					if (GENRL.sSearchBoxTextAtKeyUpPrevious != sSearchBoxTextAtKeyUp) {
						//DBUG.Log("    => text changed");
						GENRL.sSearchBoxTextAtKeyUpPrevious = sSearchBoxTextAtKeyUp;
						if (CALLBAX.bFilterbarKeystrokeTimedOut) {
							CALLBAX.bFilterbarKeystrokeTimedOut = false;
							window.setTimeout(CALLBAX.FilterTimesUp, GENRL.klTimeMinimumBetweenKeystrokes);
							//DBUG.Log("timer has been set");
						}
						GENRL.Page1ModelCountsMaybeRemove(this.value);
					}
				}

				// ------------------------------------------------------------------------------------

				, Page1SearchClearClick: function() {
					$("#page1 input[data-type=\"search\"]").trigger("keyup");
					//GENRL.Page1ModelCountsMaybeRemove(GENRL.SearchCriteriaGet());
				}

				// ------------------------------------------------------------------------------------

				, InfoPageInit: function() {
					// Get the information page heading, menu items and child page content.

					$.ajax({ url: MISC.SlashAppend(APPCONFIG.ServerURL) + "ServiceExecute.asp"
						, type: "GET"
						, data: { f: "info", What: "heading"
							, LubeSupplierName: APPCONFIG.sLubeSupplierName
							, CustomerName: APPCONFIG.sCustomerName
							, CountryName: APPCONFIG.sCountryName
							, Flavour: APPCONFIG.sFlavour
							, Version: APPCONFIG.sVersion
							}
						, cache: false
						, async: false
						, dataType: "jsonp"
						, success: CALLBAX.InfoHeadingInsert
						, error: CALLBAX.ErrorFromService
					});

					$.ajax({ url: MISC.SlashAppend(APPCONFIG.ServerURL) + "ServiceExecute.asp"
						, type: "GET"
						, data: { f: "info", What: "menuItems"
							, LubeSupplierName: APPCONFIG.sLubeSupplierName
							, CustomerName: APPCONFIG.sCustomerName
							, CountryName: APPCONFIG.sCountryName
							, Flavour: APPCONFIG.sFlavour
							, Version: APPCONFIG.sVersion
							}
						, cache: false
						, async: false
						, dataType: "jsonp"
						, success: CALLBAX.InfoMenuItemsInsert
						, error: CALLBAX.ErrorFromService
					});

					$.ajax({ url: MISC.SlashAppend(APPCONFIG.ServerURL) + "ServiceExecute.asp"
						, type: "GET"
						, data: { f: "info", What: "pages"
							, LubeSupplierName: APPCONFIG.sLubeSupplierName
							, CustomerName: APPCONFIG.sCustomerName
							, CountryName: APPCONFIG.sCountryName
							, Flavour: APPCONFIG.sFlavour
							, Version: APPCONFIG.sVersion
							}
						, cache: false
						, async: false
						, dataType: "jsonp"
						, success: CALLBAX.InfoPagesInsert
						, error: CALLBAX.ErrorFromService
					});

				}

				// ------------------------------------------------------------------------------------

				, InfoHeadingInsert: function(oResultFromWebService) {
					//DBUG.Log("InfoHeadingInsert oResultFromWebService=" + oResultFromWebService.sInfoHeading);
					$("#info div[data-role=\"content\"] h1").html(oResultFromWebService.sInfoHeading);
				}

				// ------------------------------------------------------------------------------------

				, InfoMenuItemsInsert: function(oResultFromWebService) {
					var sSelector;

					//DBUG.Log("InfoMenuItemsInsert oResultFromWebService=" + oResultFromWebService.sInfoMenuItems);
					sSelector = "#info div[data-role=\"content\"] ul[data-role=\"listview\"]";
					$(sSelector).html(oResultFromWebService.sInfoMenuItems);
					if ($(sSelector).hasClass('ui-listview'))
					{
						//DBUG.Log("sSelector hasClass");
						$(sSelector).listview('refresh');
					}
				}

				// ------------------------------------------------------------------------------------

				, InfoPagesInsert: function(oResultFromWebService) {
					//DBUG.Log("InfoPagesInsert oResultFromWebService=" + oResultFromWebService.sInfoPages);
					$(oResultFromWebService.sInfoPages.replace("%version", APPCONFIG.sVersion)).insertAfter("#info");
				}

				// ------------------------------------------------------------------------------------

				, SettingsGet: function(oResultFromWebService) {
					GENRL.lModelCountMaximumClickable = oResultFromWebService.lModelCountMaximumClickable;
					//DBUG.Log("lModelCountMaximumClickable=" + GENRL.lModelCountMaximumClickable);
				}

				// ------------------------------------------------------------------------------------

				, PageBeforeShowAny: function() {
					//DBUG.Log("PageBeforeShowAny: id=" + this.id);
					// <h3> headings find their way into document.title via jQuery mobile. Prevent this from happening:
					document.title = GENRL.DocumentTitleSet(APPCONFIG.sLubeSupplierName, APPCONFIG.sCustomerName, APPCONFIG.sCountryName, APPCONFIG.sFlavour);
					//DBUG.Log("PageBeforeShowAny: this.id=" + this.id + "document.title=" + document.title);
					//$(":jqmData(role='page')").attr("data-title", document.title); //http://stackoverflow.com/questions/6887442/preventing-jquery-mobile-from-setting-document-title?rq=1
				}

			};

			// ------------------------------------------------------------------------------------

			$(document).on({ ready: function() { /*DBUG.Log("ready document");*/ } });

			/*
			Page event firing order:
				pagebeforecreate
				pagecreate
				pageinit
				pagebeforeshow
				pageshow
			*/

			$('#page1').on({ pageshow: function() {
					//DBUG.Log("pageshow #page1");
					//DBUG.Log("display=" + $("#idRecentSearches").css("display"));
				}
			});

			$("body > div[data-role=\"page\"]").on({ pagebeforecreate: function() {
				//DBUG.dtPageBeforeCreate = new Date().getTime();
				//DBUG.Log("pagebeforecreate #" + this.id + " ms since click=" + (DBUG.dtPageBeforeCreate - DBUG.dtListItemClick));
				}
			});

			$("body > div[data-role=\"page\"]").on({ pagecreate: function() {
				//DBUG.dtPageCreate = new Date().getTime();
				//DBUG.Log("pagecreate #" + this.id + " ms since pagebeforecreate=" + (DBUG.dtPageCreate - DBUG.dtPageBeforeCreate));
				}
			});
			$("body > div[data-role=\"page\"]").on({ pageinit: function(event) {
				//DBUG.dtPageInit = new Date().getTime();
				//DBUG.Log("pageinit #" + this.id + " ms since pagecreate=" + (DBUG.dtPageInit - DBUG.dtPageCreate));
				}
			});
			$("body > div[data-role=\"page\"]").on({ pagebeforeshow: function() {
				//DBUG.Log("pagebeforeshow #" + this.id + " -> indicate not loading");
				//DBUG.dtPageBeforeShow = new Date().getTime();
				//DBUG.Log("pagebeforeshow #" + this.id + " ms since click=" + (DBUG.dtPageBeforeShow - DBUG.dtListItemClick));
				//DBUG.Log("                                         pagebeforehide=" + (DBUG.dtPageBeforeShow - DBUG.dtPageBeforeHide));
				GENRL.LoadingIndicate(false); // To ensure the loading spinner is hidden. esp. upon a BackClick.
				}
			});

			$("body > div[data-role=\"page\"]").on({ pageshow: function() {
				//DBUG.Log("pageshow #" + this.id);
				//DBUG.dtPageShow = new Date().getTime();
				//DBUG.Log("pageshow #" + this.id + " ms since pagebeforeshow=" + (DBUG.dtPageShow - DBUG.dtPageBeforeShow));
				//DBUG.Log("                                   pagehide=" + (DBUG.dtPageShow - DBUG.dtPageHide));
				}
			});

			$("body > div[data-role=\"page\"]").on({ pagebeforehide: function() {
				//DBUG.Log("pagebeforehide");
				//DBUG.dtPageBeforeHide = new Date().getTime();
				//DBUG.Log("pagebeforehide #" + this.id + " ms since BackClick=" + (DBUG.dtPageBeforeHide - DBUG.dtBackButtonClick));
				}
			});

			$("body > div[data-role=\"page\"]").on({ pagehide: function() {
				//DBUG.dtPageHide = new Date().getTime();
				//DBUG.Log("pagehide #" + this.id + " ms since pagebeforeshow=" + (DBUG.dtPageHide - DBUG.dtPageBeforeShow));
				}
			});

			$("body > div[data-role=\"page\"]").on({ pagebeforechange: function() {
				/*DBUG.Log("pagebeforechange #" + this.id);*/
				//$.mobile.loading("show");
				}
			});
			$("body > div[data-role=\"page\"]").on({ pagechange: function() { /*DBUG.Log("pagechange " + this.id);*/ } });
			$("body > div[data-role=\"page\"]").on({ pagechangefailed: function() { /*DBUG.Log("pagechangefailed " + this.id);*/ } });
			$("body > div[data-role=\"page\"]").on({ pageremove: function() { /*DBUG.Log("pageremove #" + this.id);*/ } });

			$("div[data-role=\"header\"] a[data-rel=\"back\"]").on({ click: function() {
				//DBUG.dtBackButtonClick = new Date().getTime();
				//DBUG.Log("BackClick " + this.innerText + " set time");
				//DBUG.Log("BackClick -> indicate loading");
				//DBUG.Log("BackClick");
				//GENRL.LoadingIndicate(true);
				}
			});

			$('#page1').on({ pageinit: function(event) {
				var sText;

				/* Make the server URL different from the development website's URL. This makes Development mode 
					more faithfully simulate site access in Release mode, which would otherwise hide
					certain differences in rendering behaviour.
					7/8/2013: No good when debugging from iPad via MacBook.
					iPad/MacBook can't reach //vm-meldevweb01/Lube/. URL has to be fully-qualified. */
				/*
				if (APPCONFIG.bDevelopmentMode)
					APPCONFIG.ServerURL = APPCONFIG.ServerURL.replace(".mel.infomedia.com.au", "");
				*/

				//DBUG.Log("pageinit #page1");
				//DBUG.Log("pageinit #page1: document.title designtime=" + document.title);
				//document.title = GENRL.DocumentTitleSet(APPCONFIG.sLubeSupplierName, APPCONFIG.sCustomerName, APPCONFIG.sCountryName, APPCONFIG.sFlavour);
				//DBUG.Log("pageinit #page1: document.title=" + document.title);

				$('#page1 ul[data-role="listview"]').listview('option', 'filterCallback', CALLBAX.defaultSearch);
				$("#page1 input[data-type=\"search\"]").on({ keyup: CALLBAX.Page1SearchInputKeyUp });
				$("#page1 input[data-type=\"search\"]").on({ keydown: CALLBAX.Page1SearchInputKeyDown });
				$("#page1 input[data-type=\"search\"]").on({ keypress: CALLBAX.Page1SearchInputKeyPress });
				$("#page1 input[data-type=\"search\"]").on({ focus: CALLBAX.Page1SearchFocus });
				$("#page1 input[data-type=\"search\"]").on({ focusout: CALLBAX.Page1SearchFocusOut });
				$("#page1 input[data-type=\"search\"]").on({ change: CALLBAX.Page1SearchChange });
				$("#page1 a.ui-input-clear").on({ click: CALLBAX.Page1SearchClearClick });

				$("#idRecentSearches").on("click", "li[data-theme=\"b\"]", CALLBAX.RecentSearchesListItemClick);
				$("#idScreen").on({ click: function() { CALLBAX.ScreenOverlay(false); } });
				//$("#idScreen").on("click", null, {bShow: false}, CALLBAX.ScreenOverlay);
				CALLBAX.ScreenOverlay(false); // Set the initial state.
				GENRL.RecentSearchesShow(false); // Set the initial state.
				$("#idRecentSearches").insertAfter("#page1 .ui-listview-filter");
				$("#idRecentSearches li").removeClass("ui-corner-top");
				$("#idRecentSearches .clsRecentSearchesClear").on({ click: CALLBAX.RecentSearchesClear });
				$("#idRecentSearches .clsRecentSearchesHide").on({ click: CALLBAX.RecentSearchesHide });

				GENRL.SettingsRequest();
				sText = $("#idPopupSearchTooManyMatches p").text();
				$("#idPopupSearchTooManyMatches p").text(sText.replace("%1", GENRL.lModelCountMaximumClickable));

				/* Parameters in the following call:
				The first 0 (eNone) means we're currently on "no page" (i.e. not page1 yet).
				The second 0 means we clicked list item 0 on that page, which, for the no-page case, will be ignored/unused by the service.
				ListItemClickAction will call the service which will return with "1", telling us to fill page1 with content.
				Page1 will be displayed by default, in this case, because it's the first part of the <body>, so, in the callback
				from the service, we never have to explicitly go to page1. */
				GENRL.ListItemClickAction(GENRL.PAGE.eNone, 0, null);
			} });

			$('#info').on({ pageinit: function(event) {
				//DBUG.Log("pageinit #info");
				CALLBAX.InfoPageInit();
				}
			});

			$('a.info_ico').on({ click: function(event) {
				//DBUG.Log("click on info -> indicate loading");
				GENRL.LoadingIndicate(true);
				}
			});


			$("body").on("pagebeforeshow", "div[data-role=\"page\"]", null, CALLBAX.PageBeforeShowAny);

			// ------------------------------------------------------------------------------------

			window.addEventListener('load'
				, function() {
					new FastClick(document.body);
				}
				, false
			);

		

var MISC = {
	SlashAppend: function(sString) {
		var lLength;

		lLength = sString.length;
		if (lLength > 0)
			if (sString.charAt(lLength - 1) != '/')
				sString = sString + '/';
		return sString;
	}
};

