








	//FIELDS-----------------------------------
	
	var mBodyElem;
	var mStaticFallbackJSON;
	
	//CONSTRUCTOR-----------------------------------
	function initialize()
	{
		initDefaultValues();
		
		initLocalStoreTextFields();
	}

	//EVENTS-----------------------------------
	//INIT METHODS-----------------------------------
	
	function initDefaultValues()
	{
		mBodyElem = document.getElementsByTagName("body")[0];
	}
	
	function initLocalStoreTextFields()
	{
		//get all of the data stored locally in HTML5 local storage
		var localStoreArray = getAllLocalStoreItems();
		
		if (localStoreArray.length > 0)
		{
			//build the text area to hold the static fallback value
			var staticFallBackKey = "STATIC_FALLBACK";
			var fallbackTextArea = addStaticFallbackTextField(staticFallBackKey);
			
			var fallbackTextContent = "";
			
			//build head section
			fallbackTextContent += getStaticFallbackStrHead();
		
			//for each local store item
			for (var s = 0; s < localStoreArray.length; s++)
			{
				var storeKey = localStoreArray[s].key;
				var storeVal = localStoreArray[s].value;
				
				//add the local store summary text field to the page
				addLocalStoreTextField(storeKey, storeVal);
				
				//add the fall back static text
				fallbackTextContent += getStaticFallBackStrForKey(storeKey);
			}
			
			//build foot section
			fallbackTextContent += getStaticFallbackStrFoot();
			
			addStaticFallbackContentToField(staticFallBackKey, fallbackTextContent, (s + 1));
			//fallbackTextArea.value = fallbackTextContent;
			
			//initialize buttons, including the one that will delete all of the local store
			initLocalStoreButtons();
		}
		else
		{
			var msg = document.createElement('p');
			msg.innerText = 'No items in local storage to display.';
			mBodyElem.appendChild(msg);
		}
	}
	
	function initLocalStoreButtons()
	{
		//clear local storage button
		var clearStoreBtn = newButton('Clear Local Storage','alert(removeAllLocalStoreItems())');

		mBodyElem.appendChild(clearStoreBtn);
	}
	
	//METHODS-----------------------------------
	
	function newButton(btnLabel, btnOnclickJs)
	{
		var newBtn = document.createElement('input');
		newBtn.setAttribute('type', 'button');
		newBtn.setAttribute('value', btnLabel);
		newBtn.setAttribute('title', btnLabel);
		
		if (btnOnclickJs != undefined)
		{
			btnOnclickJs = btnOnclickJs + ";";
			btnOnclickJs = replaceAllOfGivenChar(btnOnclickJs, ";;", ";");
			
			newBtn.setAttribute('onclick','javascript:' + btnOnclickJs);
		}
		
		return newBtn;
	}
	
	function getStaticFallbackStrHead()
	{
		fallbackHead = "";
		//fallbackHead += "//auto generated: " + dateTime + "";
		fallbackHead += "function getStaticFallbackJSON(jsonType)";
		fallbackHead += "{";
		fallbackHead += "var staticJSON;";
		fallbackHead += "";
		fallbackHead += "switch (jsonType)";
		fallbackHead += "{";
		
		return fallbackHead;
	}
	
	function getStaticFallbackStrFoot()
	{
		fallbackFoot = "";
		fallbackFoot += "}";
		fallbackFoot += "return staticJSON;";
		fallbackFoot += "}";
		var dateTime = new Date();
		fallbackFoot += "//***auto generated: " + dateTime;
		
		return fallbackFoot;
	}
	
	function getStaticFallBackStrForKey(storeKey)
	{
		var fallbackStr = "";
		
		var textareaElem = document.getElementById('value_' + storeKey);
		
		//if there is a text area for this local store value
		if (textareaElem != undefined)
		{
			var isJsonElem = document.getElementById('isJson_' + storeKey);
			var isJsonClass = isJsonElem.getAttribute('class');
			
			//if this value is in json format
			if (isJsonClass.indexOf("is_json_format") != -1)
			{
				//strip off store key qualifier
				var simpleStoreKey = storeKey.substring(storeKey.indexOf("_") + 1);
				
				//build the static json format
				fallbackStr += "case \"" + simpleStoreKey + "\":";
				fallbackStr += "staticJSON = ";
				fallbackStr += textareaElem.value + ";";
				fallbackStr += "break;";
			}
		}
		
		return fallbackStr;
	}
	
	function addLocalStoreTextField(storeKey, storeVal)
	{
		//wrap div
		var wrapDiv = document.createElement('div');
		wrapDiv.setAttribute('id', 'wrap_' + storeKey);
		wrapDiv.setAttribute('class','local-store-wrap');
		
		//local store title
		var titleH3 = document.createElement('h3');
		titleH3.setAttribute('id', 'title_' + storeKey);
		titleH3.setAttribute('class', 'local-store-title minus');
		titleH3.innerHTML = storeKey;
		
		//value char length
		var charLengthP = document.createElement('p');
		charLengthP.setAttribute('id', 'chars_' + storeKey);
		charLengthP.setAttribute('class', 'local-store-length');
		charLengthP.innerHTML = '<strong>characters</strong>: ' + storeVal.length;
		
		//detect json format
		var jsonFormatP = document.createElement('p');
		jsonFormatP.setAttribute('id', 'isJson_' + storeKey);
		try
		{
			//try to parse the json string into a json object
			var jsonObj = JSON.parse(storeVal);
			jsonFormatP.setAttribute('class', 'is_json_format');
			jsonFormatP.innerHTML = "In json format";
		}
		catch (err)
		{
			//error trying to parse incorrect json format
			jsonFormatP.setAttribute('class', 'not_json_format');
			jsonFormatP.innerHTML = "NOT in json format";			
		}
		
		//local store contents
		var textArea = document.createElement('textarea');
		textArea.setAttribute('id', 'value_' + storeKey);
		textArea.setAttribute('class', 'local-store-value');
		textArea.value = storeVal;
		
		//separator
		var separatorElem = document.createElement('hr');
		
		//append elements
		wrapDiv.appendChild(titleH3);
		wrapDiv.appendChild(charLengthP);
		wrapDiv.appendChild(jsonFormatP);
		wrapDiv.appendChild(textArea);
		wrapDiv.appendChild(separatorElem);
		
		mBodyElem.appendChild(wrapDiv);
		
		//element events
		titleH3.onclick = function()
		{
			var didShow = toggleShowElem('value_' + storeKey);
			var titleH3jq = $('#title_' + storeKey);
			if (didShow)
			{
				titleH3jq.removeClass('plus');
				titleH3jq.addClass('minus');
			}
			else
			{
				titleH3jq.removeClass('minus');
				titleH3jq.addClass('plus');
			}
		};
		
		return textArea;
	}
	
	function addStaticFallbackContentToField(fieldKey, itemStr, itemCount)
	{
		if (itemCount == undefined)
		{
			itemCount = 1;
		}
		
		//local store contents
		var textArea = document.getElementById('value_' + fieldKey);	
		var textAreaValue = textArea.value
		
		var fallbackHead = getStaticFallbackStrHead();
		var fallbackFoot = getStaticFallbackStrFoot();
		
		if (textAreaValue.indexOf(fallbackFoot) != -1)
		{
			//remove foot
			textAreaValue = textAreaValue.substring(0, fallbackFoot.indexOf(fallbackFoot));
		}
		
		//add new item(s) to the end
		textAreaValue += itemStr;
		
		if (textAreaValue.indexOf(fallbackFoot) == -1)
		{
			textAreaValue += fallbackFoot;
		}
		
		textArea.value = textAreaValue;
		
		//update item count
		var itemCountElem = $('#itemCount_' + fieldKey + ' .char-len');
		var itemCountStr = itemCountElem.text();
		var itemCountInt = parseInt(itemCountStr);
		itemCountInt += itemCount;
		itemCountElem.text(itemCountInt);
	}
	
	function addStaticFallbackTextField(fieldKey)
	{
		//wrap div
		var wrapDiv = document.createElement('div');
		wrapDiv.setAttribute('id', 'wrap_' + fieldKey);
		wrapDiv.setAttribute('class','local-store-wrap');
		
		//local store title
		var titleH3 = document.createElement('h3');
		titleH3.setAttribute('id', 'title_' + fieldKey);
		titleH3.setAttribute('class', 'local-store-title minus');
		titleH3.innerHTML = fieldKey;
		
		//value char length
		var charLengthP = document.createElement('p');
		charLengthP.setAttribute('id', 'itemCount_' + fieldKey);
		charLengthP.setAttribute('class', 'local-store-length');
		charLengthP.innerHTML = '<strong>Local store items count</strong>: <span class="char-len">' + 0 + "</span>";
		
		//local store contents
		var textArea = document.createElement('textarea');
		textArea.setAttribute('id', 'value_' + fieldKey);
		textArea.setAttribute('class', 'local-store-value');
		
		//separator
		var separatorElem = document.createElement('hr');
		
		//append elements
		wrapDiv.appendChild(titleH3);
		wrapDiv.appendChild(charLengthP);
		wrapDiv.appendChild(textArea);
		wrapDiv.appendChild(separatorElem);
		
		mBodyElem.appendChild(wrapDiv);
		
		//element events
		titleH3.onclick = function()
		{
			var didShow = toggleShowElem('value_' + fieldKey);
			var titleH3jq = $('#title_' + fieldKey);
			if (didShow)
			{
				titleH3jq.removeClass('plus');
				titleH3jq.addClass('minus');
			}
			else
			{
				titleH3jq.removeClass('minus');
				titleH3jq.addClass('plus');
			}
		};
		
		return textArea;
	}
	
	function toggleShowElem(elemId, blockType)
	{
		var didShow = false;
		
		var theElem = $('#' + elemId);
		if (theElem.length > 0)
		{
			var styleVal = theElem.attr('style');
			
			//if the element is visible
			if (styleVal == undefined)
			{
				hideElem(elemId);
			}
			//if the element is visible
			else if (styleVal.indexOf('visible') != -1)
			{
				hideElem(elemId);
			}
			else //element is not visible
			{
				showElem(elemId, blockType);
				didShow = true;
			}
		} 
		
		return didShow;
	}
	
	function showElem(elemId, blockType)
	{
		/*var elemDiv = document.getElementById(elemId);
		if (elemDiv != undefined)
		{
			elemDiv.setAttribute('style','visibility:visible;display:block;');
		}*/
		
		if (blockType == undefined)
		{
			blockType = 'block';
		}
		
		var elemDiv = $('#' + elemId);
		elemDiv.css('visibility','visible');
		elemDiv.css('display',blockType);
	}
	
	function hideElem(elemId)
	{
		/*var elemDiv = document.getElementById(elemId);
		if (elemDiv != undefined)
		{
			elemDiv.setAttribute('style','visibility:hidden;display:none;');
		}*/
		
		var elemDiv = $('#' + elemId);
		elemDiv.css('visibility','hidden');
		elemDiv.css('display','none');
	}















	//FIELDS-----------------------------------
	//front end view fields
	var mTargetLat = 41.905949;
	var mTargetLong = -84.015944;
	var mZoomLevel = 16;
	
	//back end fields
	var mMarkersDataJSON;
	var mMyLocMarkerIndex; //the index of "my location" data within the mMarkersDataJSON object
	var mTargetGeoP;
	var mMyLat;
	var mMyLong;
	var mMapView1;
	//create the category json object and set it's fields
	var mMyLocationJSON = 
	{ 
		"catname": "My Location",
		"itemcount": 1,
		"catid": "my_location"
	};
	var mMarkerObjArray = []; //an array of visible map marker objects
	var mMarkerJsonArray = []; //an array of visible map marker json objects
	var mMarkerCategoryJSON; //an array of json objects describing each of the marker location categories
	var mOpenInfoWindow; //the current marker info window that's open if any
	var mControlsDiv;
	var mBodyElem;
	var mGeoCodeAddress;
	var mPosWatchId; //phone gap's user location listener object used for clearing the watch listener
	
	//CONSTRUCTOR-----------------------------------
	function initialize() 
	{	
		initLoadingDialog();
	
		try
		{
			initMapView();

			initWindowOverlays();
			
			initCustomControls();
			
			initMapMarkers();
			
			initMapOutlines();
	
			//init phone gap stuff (like current position) when the device is ready
			document.addEventListener("deviceready", onDeviceReady, false);
		}
		catch (err)
		{
			initFailedMapLoad(err.Message);
		}
		
		//for testing my location button
		//initMyLocationHtml();
    }
	
	//EVENTS-----------------------------------
	function btnClick(btnId)
	{
		var btnDiv = document.getElementById(btnId);
		var originalClass = btnDiv.getAttribute('class');
		
		//change the active button style
		btnDiv.setAttribute('class','btn_map_menu_active');
		
		setTimeout(function() 
		{
			//return the button style to normal after a brief period of time
      		btnDiv.setAttribute('class', originalClass);
    	}, 180);
	}
	
	//when the mobile device is ready to provide info like current position
	function onDeviceReady()
	{
		var posOptions = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
		
		//attempt to get current position when the device is ready
		navigator.geolocation.getCurrentPosition(initMyPositionSuccess, initMyPositionError, posOptions);
	}
	
	//INIT METHODS-----------------------------------
	function initFailedMapLoad(sysMsg)
	{	
		addWindowOverlayDiv('map-fail');
		
		//build the details window content
		var windowContentId = getMapQual("window-content") + 'failed_map_load_wrap';
		var windowContent = document.getElementById(windowContentId);
		
		var failedTitle = document.createElement('div');
		failedTitle.setAttribute('class','item-title');
		failedTitle.innerHTML = "No Map Connection";
		
		windowContent.appendChild(failedTitle);
	
		//error message text
		var errMsg = document.createElement('p');
		errMsg.innerHTML = "You are not connected to Google Maps. <br />Please make sure you are connected to a network and try again. ";
		if (sysMsg != undefined)
		{
			errMsg.innerHTML += "<em>" + sysMsg + "</em>";
		}
		windowContent.appendChild(errMsg);

		//back button
		var btnBack = document.createElement('div');
		btnBack.setAttribute('class','back_button');
		btnBack.innerHTML = "Back";
		var homeOnClick = 'javascript:showElem("' + getPageId("load") + '");'
		homeOnClick += 'setTimeout(function(){location.href="page1.html";}, 200);'
		btnBack.setAttribute('onclick', homeOnClick);		

		windowContent.appendChild(btnBack);
		
		showWindowOverlayDiv('failed_map_load_wrap');
	}
	
	function initMapView()
	{
		var defaultLat = getLocalStoreItem(getMapStoreKey("latitude"));
		
		//if there is a saved default latitude
		if (defaultLat.indexOf(getLocalStorageErrMsg('no-such-item')) == -1)
		{
			var defaultLng = getLocalStoreItem(getMapStoreKey("longitude"));
			
			//if there is a saved default longitude
			if (defaultLng.indexOf(getLocalStorageErrMsg('no-such-item')) == -1)
			{
				//set the target lat and long to the default values
				mTargetLat = defaultLat;
				mTargetLong = defaultLng;
			}			
		}

		mTargetGeoP = getGeoPoint(mTargetLat, mTargetLong);
		
		//https://developers.google.com/maps/documentation/javascript/controls
	    var myOptions = 
		{
          	center: mTargetGeoP,
          	zoom: mZoomLevel,
          	mapTypeId: google.maps.MapTypeId.ROADMAP,
			//mapTypeId: google.maps.MapTypeId.SATELLITE,
			mapTypeControl: false,
			panControl: false,
			streetViewControl: false,
		 	streetViewControlOptions: 
		  	{
        		position: google.maps.ControlPosition.LEFT_CENTER
    		},
			zoomControl: true,
		 	zoomControlOptions: 
		  	{
        		style: google.maps.ZoomControlStyle.SMALL,
        		position: google.maps.ControlPosition.LEFT_CENTER
    		}
        };
		
		//get the google map canvas object
		var mapElem = document.getElementById("map_canvas");
        mMapView1 = new google.maps.Map(mapElem, myOptions);
		
		//get the dom body object
		mBodyElem = document.getElementById('Body');
	}
	
	function initHeader()
	{
		headDiv = document.createElement('div');
		headDiv.setAttribute('id','map_head');
		headDiv.setAttribute('class', getPageClass('pageHead'));
		
		headDiv.innerHTML = "<img class='logo' src='img/logo_shu_small.png' /><h1 class='" + getPageClass('page_title') + "'>" + getPageTitle('map') + "</h1>"
		
		//add the window to the page
		var bodyElem = document.getElementsByTagName("body")[0];
		bodyElem.appendChild(headDiv);
	}
	
	function initCustomControls()
	{
		//https://developers.google.com/maps/documentation/javascript/controls
		mControlsDiv = document.createElement('div');
		mControlsDiv.setAttribute('id','map_menu');
		mControlsDiv.setAttribute('class','bottom_buttons_menu');
		
		//home button
		var btnHomeDiv = addMapMenuButton('btnHome', '<img src="img/icon_home_white.png" alt="home" />');
		var homeOnClick = 'javascript:showElem("' + getPageId("load") + '");'
		homeOnClick += 'setTimeout(function(){location.href="page1.html";}, 200);'
		btnHomeDiv.setAttribute('onclick', homeOnClick);
		//btnHomeDiv.setAttribute('href','page1.html');

		//show me / find button
		var btnShowMeDiv = addMapMenuButton('btnShowMe', 'Find');
		google.maps.event.addDomListener(btnShowMeDiv, 'click', function() 
		{
  			showWindowOverlayDiv('show_me_category_window');
			hideAllMapMarkers();
		});
		
		//campus / default location button
		var btnCampusDiv = addMapMenuButton('btnCampus', 'Campus');	
		
		//clear button
		var btnDirectionsDiv = addMapMenuButton('btnClear', 'Clear');
		google.maps.event.addDomListener(btnDirectionsDiv, 'click', function() 
		{
			mMapView1.setCenter(mTargetGeoP);
			mMapView1.setZoom(mZoomLevel);
			hideAllMapMarkers();
			uncheckAllCategoryButtons();
		});
		
		mBodyElem.appendChild(mControlsDiv);
	}
	
	function initLoadingDialog()
	{
		//window content
		var lightBoxDiv = document.createElement('div');
		var lightBoxId = getPageId("load");
		lightBoxDiv.setAttribute('id', lightBoxId);
		
		lightBoxDiv.onclick = function()
		{
			setTimeout(function()
			{
				hideElem(lightBoxId);
			}, 3000);
		};
		
		var lightBoxTextDiv = document.createElement('div');
		lightBoxTextDiv.setAttribute('id', getPageId("load-text"));
		lightBoxTextDiv.innerHTML = getPageTitle("load");
		
		lightBoxDiv.appendChild(lightBoxTextDiv);
		//add the window to the page
		var bodyElem = document.getElementsByTagName("body")[0];
		bodyElem.appendChild(lightBoxDiv);
		hideElem(lightBoxId);
	}
	
	function initWindowOverlays()
	{
		//SHOW ME
		
		//show me markers of a certain category
		addWindowOverlayDiv('show-me');
	}
	
	function initMapOutlines()
	{
		var outlinesDataJSON = getMapOutlinesJSON();
		
		//for each polygon outline
		for (var p = 0; p < outlinesDataJSON.outlines.length; p++)
		{
			var outlineJson = outlinesDataJSON.outlines[p];
			
			//get the google api polygon object
			var polyOutline = getPolyOutline(outlineJson);
			
			//set the outline on the map
			polyOutline.setMap(mMapView1);
		}
	}

	//my current position could not be retrieved
	function initMyPositionError(error)
	{
		//***
	}
	
	function refreshMyPositionError(error) 
	{
		hideElem(getPageId("load"));
		
		hideWindowOverlayDiv('my_location_options_page');
		checkSelectBtnElem(mMyLocationJSON.catid);
		alignMapMarkersWithSelected();
		centerOverMyLocation();
		
		try
		{
			//clear the listener to get the user's current location
			navigator.geolocation.clearWatch(mPosWatchId);
		}
		catch (err)
		{
		}

		alert("Delayed connection to positioning system. Please try again at a later time.");
	}
	
	//my position was retrieved
	function initMyPositionSuccess(position)
	{
		//UPDATE MY LAT LONG

		mMyLat = position.coords.latitude;
		mMyLong = position.coords.longitude;
		
		//UPDATE HTML AND DATA TIED TO USER'S LAT LONG
		
		initMyLocationHtml();
	}
	
	function refreshMyPositionSuccess(position)
	{
		hideElem(getPageId("load"));
	
		//UPDATE MY LAT LONG

		mMyLat = position.coords.latitude;
		mMyLong = position.coords.longitude;
		
		//UPDATE HTML AND DATA TIED TO USER'S LAT LONG
		
		initMyLocationHtml();
		
		//ADJUST MAP ORIENTATION AND MARKERS
		
		hideWindowOverlayDiv('my_location_options_page');
		checkSelectBtnElem(mMyLocationJSON.catid);
		alignMapMarkersWithSelected();
		centerOverMyLocation();
		
		try
		{
			//clear the listener to get the user's current location
			navigator.geolocation.clearWatch(mPosWatchId);
		}
		catch (err)
		{
		}
	}
	
	function initMyLocationHtml()
	{
		//***for testing purposes only
		if (mMyLat == undefined)
		{
			mMyLat = 41.905949;
		}
		
		//***for testing purposes only
		if (mMyLong == undefined)
		{
			mMyLong = -84.015944;
		}
		
		//UPDATE MY LOCATION DIRECTIONS LINK(S)
		
		var directionsStartParam = "&saddr=" + mMyLat + "," + mMyLong;
		
		//add the start lat and long to each of the directions
		$('.directions_link').each(function(i)
		{
			//append the start location to the directions link
			var dirLink = $(this).attr('href');
			
			//if a previous start address was appended
			if (dirLink.indexOf("&saddr=") != -1)
			{
				//remove the previous start address
				dirLink = dirLink.substring(0, dirLink.indexOf("&saddr="));
			}
			
			//append the new user location to the directions link
			dirLink += directionsStartParam;
			$(this).attr('href',dirLink);
		});
		
		//UPDATE MARKER JSON LAT AND LONG
		
		//my location marker data has already been saved in the JSON array
		if (mMyLocMarkerIndex != undefined)
		{
			//update the lat and long in the existing json data
			var myLocJson = mMarkersDataJSON.markers[mMyLocMarkerIndex];
			myLocJson.latitude = mMyLat;
			myLocJson.longitude = mMyLong;
		}
		else //saving my location data for the first time
		{
			var myLocationMarkerJSON = 			
			{ 
					title: "My Location",
					latitude: mMyLat,  
					longitude: mMyLong,
					icon: "img/icon_my_location.png",
					category: "My Location",
					summary: "Last known location"
			}
			
			//add the "my location" data to the array and save the array index
			mMarkersDataJSON.markers.push(myLocationMarkerJSON);
			mMyLocMarkerIndex = mMarkersDataJSON.markers.length - 1;
		}
		
		//MY LOCATION VALUES THAT ONLY NEED TO BE INITIALIZED ONCE
		
		//get the already added My Location category button, if it exists
		var btnDivId = getMapQual('button') + mMyLocationJSON.catid;
		var btnDivElem = $('#' + btnDivId);
		
		//if the My Location button has not already been added to the category selection page
		if (btnDivElem.length < 1)
		{
			//CATEGORY JSON
			
			mMarkerCategoryJSON.category.push(mMyLocationJSON);
			
			//MY LOCATION CATEGORY BUTTON
			
			var windowContent = document.getElementById(getMapQual('window-content') + 'show_me_category_window');
			
			//get the button element
			//params: btnId, btnTxt, additionalHtml
			var btnDiv = newSelectBtnElem(mMyLocationJSON.catid, mMyLocationJSON.catname);
	
			//windowContent.appendChild(btnDiv);
			//add the my location button to the front of the category list
			windowContent.insertBefore(btnDiv,windowContent.firstChild);
			
			//MY LOCATION OPTIONS PAGE
			
			addWindowOverlayDiv("my-location");
			
			//refresh my location
			var btnRefresh = addMyLocationOptionBtn("btn_refresh_my_location", "Refresh my location", "<img src='img/icon_refresh.png' />");
			btnRefresh.onclick = function()
			{
				showElem(getPageId("load"));
				
				try
				{
					var posOptions = { frequency: 1000 };
					
					//attempt to refresh current position	
					var mPosWatchId 
						= navigator.geolocation.watchPosition(refreshMyPositionSuccess, refreshMyPositionError, posOptions);
				}
				catch (err)
				{
					refreshMyPositionError(err);
				}
			};
			
			//center over my location
			var btnCenter = addMyLocationOptionBtn("btn_center_my_location", "Center over my location", "<img src='img/icon_center.png' />");
			btnCenter.onclick = function()
			{
				//center over location
				hideWindowOverlayDiv('my_location_options_page');
				checkSelectBtnElem(mMyLocationJSON.catid);
				alignMapMarkersWithSelected();
				centerOverMyLocation();
			};
			
			//zoom into my location
			var btnZoom = addMyLocationOptionBtn("btn_zoom_my_location", "Zoom into my location", "<img src='img/icon_zoom.png' />");
			btnZoom.onclick = function()
			{
				//zoom into my location
				hideWindowOverlayDiv('my_location_options_page');
				checkSelectBtnElem(mMyLocationJSON.catid);
				alignMapMarkersWithSelected();
				zoomToMyLocation();
			};
			
			//zoom into my location
			var btnZoomOut = addMyLocationOptionBtn("btn_zoom_out_my_location", "Zoom out of my location", "<img src='img/icon_zoom_out.png' />");
			btnZoomOut.onclick = function()
			{
				//zoom out of my location
				hideWindowOverlayDiv('my_location_options_page');
				checkSelectBtnElem(mMyLocationJSON.catid);
				alignMapMarkersWithSelected();
			};
			
			//creat a back button for the location category selection page
			btnBack = document.createElement('div');
			btnBack.setAttribute('class','back_button');
			btnBack.innerHTML = "Back";
			btnBack.onclick = function()
			{
				hideWindowOverlayDiv('my_location_options_page');
				alignMapMarkersWithSelected();
			};
			var myLocWindowContent = document.getElementById(getMapQual('window-content') + 'my_location_options_page');
			myLocWindowContent.appendChild(btnBack);
			
			//MY LOCATION BUTTON CONTROL

			var btnMyLocationElem = setMapPageAuxNavButton('btnMyLocation', '<img src="img/btn_my_location_white.png" />&nbsp;&nbsp;Me');
			btnMyLocationElem.click(function() 
			{
				showWindowOverlayDiv('my_location_options_page');
				hideAllMapMarkers();
			});
		}
	}
	
	function initMapMarkers()
	{
		mMarkersDataJSON = getMapMarkersJSON();
		
		//BUILD CATEGORY JSON OBJECT
		
		mMarkerCategoryJSON = 
		{
			category: []
		};
	
		//for each map marker
		var catCountStr = "";
		var catIndexStr = "";
		var catIndex = 0;
		var keyValSeparator = getKeyValSeparator();
		var keyValEnd = getKeyValEnd();
		var campusWindowId = '';
		var campusCatId = '';
		for(var c = 0; c < mMarkersDataJSON.markers.length; c++) 
		{	
			var catName = mMarkersDataJSON.markers[c].category;
			catName = getTrimStr(catName);
			var catKey = "[" + catName.toLowerCase() + "]";
			
			//if the marker's category has not already been added to the array of unique categories
			if (catCountStr.indexOf(catKey) == -1)
			{
				//add the category name to the list of used names
				catCountStr += catKey + keyValSeparator + "1" + keyValEnd + " ";
				
				//record this category's json index
				catIndexStr += catKey + keyValSeparator + catIndex + keyValEnd + " ";
				
				//build a unique category id to use for this category's related HTML
				var catId = getMaxLengthStr(getHardScrubbedString(catName), 30) + "_" + catIndex;
				
				//create the category json object and set it's fields
				mMarkerCategoryJSON.category.push
				({ 
					"catname": catName,
					"itemcount": 1,
					"catid": catId
				});
				
				//if this is the campus category
				if (catName == "Campus")
				{
					//Set the event to the "Campus" custom control button
					campusCatId = catId;
					//bind event to show the campus window
					campusWindowId = getMapQual("categoryPage") + campusCatId;
					var btnCampusDiv = document.getElementById("btnCampus");
					google.maps.event.addDomListener(btnCampusDiv, 'click', function() 
					{
						showWindowOverlayDiv(campusWindowId);
					});
				}
				
				//create and add a button for this marker category "Find" category selection
				addMarkerCategoryBtn(mMarkerCategoryJSON.category[catIndex]);

				//increment the category index
				catIndex++;
			}
			else //this category is already in the json object
			{
				var indexValStr = getTokenValue(catIndexStr, catKey);
				var indexVal = parseInt(indexValStr);
				
				//increment the item count for this category
				var itemCountStr = getTokenValue(catCountStr, catKey);
				var itemCount = parseInt(itemCountStr);
				itemCount++;
				catCountStr = setTokenValue(catCountStr, catKey, itemCount);
				
				//update the category JSON object with the new item count
				var catJSON = mMarkerCategoryJSON.category[indexVal];
				catJSON.itemcount = itemCount;
				
				//update the item count on the category button
				var btnCountId = getMapQual('button-count') + catJSON.catid;
				document.getElementById(btnCountId).innerHTML = "" + itemCount + "";
			}
			
			//if this is the campus category
			if (catName == "Campus")
			{
				//add the campus marker to it's default location / category page
				addMarkerBtnToCategoryPage(campusWindowId, mMarkersDataJSON.markers[c]);
			}
			
			//build the marker's location details window (this is the popout window for the marker on the map)
			addMarkerDetailsWindowDiv(mMarkersDataJSON.markers[c]);
		}
		
		//set checked default campus
		var haveSavedLocation = setCheckedDefaultLocation();
		//if there's no default campus
		if (!haveSavedLocation)
		{
			//show the default campus chooser window
			showWindowOverlayDiv(campusWindowId);
		}

		//creat a back button for the location category selection page
		btnBack = document.createElement('div');
		btnBack.setAttribute('class','back_button');
		btnBack.innerHTML = "Go!";
		btnBack.onclick = function()
		{
			hideWindowOverlayDiv('show_me_category_window');
			alignMapMarkersWithSelected();
		};
		var windowContent = document.getElementById(getMapQual('window-content') + 'show_me_category_window');
		windowContent.appendChild(btnBack);
	}
	
	//METHODS-----------------------------------
	function addMarkerDetailsWindowDiv(markerJson)
	{
		//if there should be a details page for this marker
		if (hasMarkerDetails(markerJson))
		{
			//build the marker's location details window
			var windowId = getMapQual("window") + markerJson.latitude + "_" + markerJson.longitude;
			addWindowOverlayDiv("Details", windowId);
			
			//build the details window content
			var windowContentId = getMapQual('window-content') + windowId;
			var windowContent = document.getElementById(windowContentId);
			
			//marker title
			var titleH1 = document.createElement('h1');
			titleH1.setAttribute('class','location_title');
			titleH1.innerHTML = markerJson.title;
			windowContent.appendChild(titleH1);
			
			//marker category
			var categoryDiv = document.createElement('div');
			categoryDiv.setAttribute('class','location_category');
			categoryDiv.innerHTML = markerJson.category;
			windowContent.appendChild(categoryDiv);
			
			//if the summary is to long to be displayed completely in the popout window
			if (markerJson.summary.length > getMarkerSummaryMaxLength())
			{
				//if the description does not contain the summary
				if (markerJson.description.indexOf(markerJson.summary) == -1)
				{
					//marker summary
					var summaryDiv = document.createElement('div');
					summaryDiv.setAttribute('class','location_summary');
					summaryDiv.innerHTML = markerJson.summary;
					windowContent.appendChild(summaryDiv);
				}
			}
			
			//marker description
			var descriptionDiv = document.createElement('div');
			descriptionDiv.setAttribute('class','location_description');
			descriptionDiv.innerHTML = markerJson.description;
			windowContent.appendChild(descriptionDiv);
			
			//directions link
			var directionsLink = document.createElement('a');
			//http://stackoverflow.com/questions/8851910/set-direction-with-google-map-url-code-for-blackberry-and-windows-phone-7
			directionsLink.setAttribute('href','http://maps.google.com/maps?daddr=' + markerJson.latitude + ',' + markerJson.longitude);
			directionsLink.setAttribute('target','_blank');
			directionsLink.setAttribute('class','directions_link');
			directionsLink.innerHTML = "Get Directions &gt;";
			
			windowContent.appendChild(directionsLink);
			
			//close button
			var backBtn = document.createElement('div');
			backBtn.setAttribute('class','back_button');
			backBtn.innerHTML = "Back";
			backBtn.onclick = function()
			{
				hideWindowOverlayDiv(windowId);
			};
			windowContent.appendChild(backBtn);
		}
	}
	
	function hasMarkerDetails(markerJson)
	{
		var hasDetails = false;
		
		//if the summary was cut off for being too long
		if (markerJson.summary.length > getMarkerSummaryMaxLength())
		{
			hasDetails = true;
		}
		else
		{
			//if the marker has a description
			if (getTrimStr(markerJson.description).length > 0)
			{
				hasDetails = true;
			}
		}
		
		return hasDetails;
	}
	
	function newMapMarker(markerJson)
	{
		var geoP = getGeoPoint(markerJson.latitude, markerJson.longitude);
		
		//create the map marker
	  	var marker = new google.maps.Marker({
			position: geoP,
			title: markerJson.title,
			animation: google.maps.Animation.DROP,
			map: mMapView1
	  	});
		
		if (markerJson.icon != undefined && markerJson.icon.length > 0)
		{
			marker.setIcon(markerJson.icon);
		}
		
		//build marker's popout info window html
		var infowindowHtml = "";
		infowindowHtml += "<div class='marker-content'>";
		infowindowHtml += "<h1 class='marker-title'>" + markerJson.title + "</h1>";
		infowindowHtml += "<div class='marker-category'>" + markerJson.category + "</div>";
		var limitSummary = getMaxLengthWithDotsStr(markerJson.summary, getMarkerSummaryMaxLength());
		infowindowHtml += "<div class='marker-summary'>" + limitSummary + "</div>";
		
		//if this marker has a details page
		if (hasMarkerDetails(markerJson))
		{
			//add button to display the marker location details page
			var windowId = getMapQual("window") + markerJson.latitude + "_" + markerJson.longitude;		
			infowindowHtml += "<div onclick='javascript:showWindowOverlayDiv(\"" + windowId + "\");";
			infowindowHtml += "mOpenInfoWindow.close();mOpenInfoWindow=undefined;' ";
			infowindowHtml += "class='btn-view-marker-details'>More &gt;</div>";
		}
		
		infowindowHtml += "</div>";
		
		//assign info window to the marker
		marker.info = new google.maps.InfoWindow
		({
  			content: infowindowHtml
		});
		
		//info window close event
		google.maps.event.addListener(marker.info,'closeclick',function()
		{
			mOpenInfoWindow = undefined;
		});
		
		//add event listener for when the marker is clicked	
		google.maps.event.addListener(marker, 'click', function() 
		{
			/*if (marker.getAnimation() != null) 
			{
				marker.setAnimation(null);
			} 
			else 
			{
				marker.setAnimation(google.maps.Animation.BOUNCE);
			}*/
			
			//if the marker's info window is not already open
			if (marker.info != mOpenInfoWindow)
			{
				//if there is already an open window
				if (mOpenInfoWindow)
				{
					//close the open window
					mOpenInfoWindow.close();
				}
				
				//open the clicked marker's info window
				marker.info.open(mMapView1, marker);
				
				//save this as the open info window
				mOpenInfoWindow = marker.info;
			}
			else
			{
				//close the already open info window
				marker.info.close();
				mOpenInfoWindow = undefined;
			}
        });

		return marker;
	}
	
	function hideAllMapMarkers()
	{
		//if the array is not empty
	  	if (mMarkerObjArray) 
		{
			//for each map marker
			for (i in mMarkerObjArray) 
			{
				//remove the marker from the map
		  		mMarkerObjArray[i].setMap(null);
			}
			
			mMarkerObjArray.length = 0;
			mMarkerJsonArray.length = 0;
	  	}
	}
	
	function hideMapMarkersByCategory(categoryJson)
	{
		//if the array is not empty
	  	if (mMarkerObjArray) 
		{
			var bounds = new google.maps.LatLngBounds();
		
			var newMarkerObjArray = [];
			var newMarkerJsonArray = [];
			
			//for each json object in the parallel array
			for (i in mMarkerJsonArray) 
			{
				var markerJson = mMarkerJsonArray[i];
				var markerObj = mMarkerObjArray[i];
				
				//if this is the category to hide
				if (markerJson.category.toLowerCase() == categoryJson.catname.toLowerCase())
				{
					//remove the marker in the parallel marker object array from the map
		  			markerObj.setMap(null);
				}
				else
				{
					//add the marker to the bounds for auto zooming
					var geoP = getGeoPoint(markerJson.latitude, markerJson.longitude);
					bounds.extend(geoP);
					
					//add to the list of markers that are still visible
					newMarkerObjArray.push(markerObj);
					newMarkerJsonArray.push(markerJson);
				}
			}
			
			//if there are any map markers that are still visible
			if (newMarkerObjArray.length > 0)
			{
				//if any marker categories were hidden
				if (newMarkerObjArray.length < mMarkerObjArray.length)
				{
					//autozoom to fit all markers
					mMapView1.fitBounds(bounds);
				
					//delete the old list of visible markers
					mMarkerObjArray.length = 0;
					mMarkerJsonArray.length = 0;
					
					//copy the new, shorter list of visible markers		
					mMarkerObjArray = newMarkerObjArray;
					mMarkerJsonArray = newMarkerJsonArray;		
				}
			}
			
			//deselect the category button
			uncheckSelectBtnElem(categoryJson.catid);
	  	}
	}
	
	function selectRadBtnElem(radBtnId)
	{
		if (radBtnId.indexOf(getMapQual('radio')) != 0)
		{
			radBtnId = getMapQual('radio') + radBtnId;
		}
		
		//get the radio button
		var btnDivElem = document.getElementById(radBtnId);
		var btnClass = btnDivElem.getAttribute('class');
		
		//if the button for this category is unchecked
		if (btnClass.indexOf('unchecked') != -1)
		{
			var selectRadBtn = $('#' + radBtnId);
			var radBtnWrap = selectRadBtn.parent();
			var radBtns = radBtnWrap.find('.map_overlay_radio');
			
			//if there are any radio buttons in the radio button wrapper
			if (radBtns.length > 0)
			{
				//uncheck the buttons
				radBtns.removeClass('checked');
				radBtns.addClass('unchecked');
				radBtns.find('.btn_radio img').attr('src','img/unchecked_radio.png');
				
				//select this radio button
				selectRadBtn.removeClass('unchecked');
				selectRadBtn.addClass('checked');
				selectRadBtn.find('.btn_radio img').attr('src','img/checked_radio.png');
			}
		}
	}
	
	function toggleSelectBtnElem(btnDivId)
	{
		if (btnDivId.indexOf(getMapQual('button')) != 0)
		{
			btnDivId = getMapQual('button') + btnDivId;
		}
		
		//get the category button check
		var btnDivElem = document.getElementById(btnDivId);
		var btnClass = btnDivElem.getAttribute('class');
		
		//if the button for this category is unchecked
		if (btnClass.indexOf('unchecked') != -1)
		{
			//toggle select
			checkSelectBtnElem(btnDivId);
		}
		else //button is checked
		{
			//toggle deselect
			uncheckSelectBtnElem(btnDivId);
		}
	}
	
	function checkAllCategoryButtons()
	{
		//for each category
		for (var i = 0; i < mMarkerCategoryJSON.category.length; i++)
		{
			var btnDivId = getMapQual('button') + mMarkerCategoryJSON.category[i].catid;
			var btnDivElem = document.getElementById(btnDivId);
			var btnClass = btnDivElem.getAttribute('class');
			
			//if the button for this category is unchecked
			if (btnClass.indexOf('unchecked') != -1)
			{
				checkSelectBtnElem(mMarkerCategoryJSON.category[i].catid);
			}
		}
	}
	
	function uncheckAllCategoryButtons()
	{
		//for each category
		for (var i = 0; i < mMarkerCategoryJSON.category.length; i++)
		{
			var btnDivId = getMapQual('button') + mMarkerCategoryJSON.category[i].catid;
			var btnDivElem = document.getElementById(btnDivId);
			var btnClass = btnDivElem.getAttribute('class');
			
			//if the button for this category is not unchecked
			if (btnClass.indexOf('unchecked') == -1)
			{
				uncheckSelectBtnElem(mMarkerCategoryJSON.category[i].catid);
			}
		}
	}
	
	function alignMapMarkersWithSelected()
	{
		//for each category
		for (var i = 0; i < mMarkerCategoryJSON.category.length; i++)
		{
			var btnDivId = getMapQual('button') + mMarkerCategoryJSON.category[i].catid;
			var btnDivElem = document.getElementById(btnDivId);
			var btnClass = btnDivElem.getAttribute('class');
			
			//if the button for this category is unchecked
			if (btnClass.indexOf('unchecked') != -1)
			{
				//hide
				hideMapMarkersByCategory(mMarkerCategoryJSON.category[i]);
			}
			else //button is checked
			{
				//show
				showMapMarkersByCategory(mMarkerCategoryJSON.category[i], false);
			}
		}
		
		//zoom the map to fit all of the visible markers
		fitBoundsToVisibleMarkers();
	}
	
	function fitBoundsToVisibleMarkers()
	{
		if (mMarkerJsonArray.length > 1)
		{
			var bounds = new google.maps.LatLngBounds();
		
			//for all visible markers
			for (var v = 0; v < mMarkerJsonArray.length; v++)
			{
				var markerJson = mMarkerJsonArray[v];
				
				//add the marker to the bounds for auto zooming
				var geoP = getGeoPoint(markerJson.latitude, markerJson.longitude);
				bounds.extend(geoP);			
			}
			
			//autozoom to fit all markers
			mMapView1.fitBounds(bounds);
		}
		else
		{
			//if there is only one marker
			if (mMarkerJsonArray.length == 1)
			{
				//zoom in, but not all of the way to the single marker
				mMapView1.setZoom(mZoomLevel);

				//then just center over the marker
				var geoP = getGeoPoint(mMarkerJsonArray[0].latitude, mMarkerJsonArray[0].longitude);
				mMapView1.setCenter(geoP);
			}
		}
	}
	
	function centerOverMyLocation()
	{
		if (mMyLat != undefined)
		{
			if (mMyLong != undefined)
			{
				var geoP = getGeoPoint(mMyLat, mMyLong);
				mMapView1.setCenter(geoP);
			}
		}
	}
	
	function zoomToMyLocation()
	{
		if (mMyLat != undefined)
		{
			if (mMyLong != undefined)
			{
				centerOverMyLocation();
				var zoomLevel = mZoomLevel;
				if (zoomLevel < (19 - 2))
				{
					zoomLevel = zoomLevel + 2;
				}
				
				mMapView1.setZoom(zoomLevel);
			}
		}
	}
	
	function showMapMarkersByCategory(categoryJson, doFitBounds)
	{
		if (doFitBounds == undefined)
		{
			doFitBounds = true;
		}
		
		var bounds = new google.maps.LatLngBounds();
		
		//for each map marker
		for (var i = 0; i < mMarkersDataJSON.markers.length; i++)
		{
			var markerJson =  mMarkersDataJSON.markers[i];
			
			//if this is the category to show
			if (markerJson.category.toLowerCase() == categoryJson.catname.toLowerCase())
			{				
				//build the marker with the json data
				var marker = newMapMarker(markerJson);
				
				//set the marker to the map
      			marker.setMap(mMapView1);
				
				//add the marker to the bounds for auto zooming
				var geoP = getGeoPoint(markerJson.latitude, markerJson.longitude);
				bounds.extend(geoP);
				
				//keep track of the visible markers in an array
				mMarkerObjArray.push(marker);
				mMarkerJsonArray.push(markerJson);
			}
		}
		
		//select the category button
		checkSelectBtnElem(categoryJson.catid);
		
		if (doFitBounds)
		{
			//autozoom to fit all markers
			mMapView1.fitBounds(bounds);
		}
	}
	
	function setMapPageAuxNavButton(btnId, btnTxt)
	{
		var mapHeadElem = $("#map_head");
		var mapAuxButton = mapHeadElem.find('#' + btnId);
		
		//if the aux button is not already set
		if (mapAuxButton.length < 1)
		{
			//create aux nav button
			mapAuxButton = document.createElement('a');
			mapAuxButton.setAttribute('class','aux_button');
			mapAuxButton.setAttribute('id',btnId);
			
			//add the button
			document.getElementById("map_head").appendChild(mapAuxButton);
			
			//get the button jquery object
			mapAuxButton = mapHeadElem.find('#' + btnId);
		}
		
		//set button inner html
		mapAuxButton.html(btnTxt);
		
		return mapAuxButton;
	}
	
	function addMapMenuButton(btnId, btnTxt)
	{
		//create boilerplate button div
		var btnElem = document.createElement('a');
		btnElem.setAttribute('class','bottom_btn');
		/*btnElem.onclick = function()
		{
			btnClick(btnId);
		};*/
		
		//set param values
		btnElem.innerHTML = btnTxt;
		btnElem.setAttribute('id',btnId);
		
		//add the button to the menu
		mControlsDiv.appendChild(btnElem);
		
		return btnElem;
	}
	
	//window where the user can select their default map location
	function addMarkerCategoryWindowOverlayDiv(catName, catId)
	{
		var catWindowId = catId;
		
		//if the category id does not already have the cat page qualifier included
		if (catId.indexOf(getMapQual("categoryPage")) != 0)
		{
			//include category page qualifier
			catWindowId = getMapQual("categoryPage") + catId;
		}
		
		//create the category page for these markers
		addWindowOverlayDiv(catName, catWindowId);
		
		//get the content div for this window
		var windowContentId = getMapQual('window-content') + catWindowId;
		var windowContent = document.getElementById(windowContentId);
		
		var subTitleElem = document.createElement('h1');
		subTitleElem.setAttribute('class','location_title');
		subTitleElem.innerHTML = "Fix on a map location";
		
		windowContent.appendChild(subTitleElem);
		
		//create the check box "don't ask again. save as my default location."
		var checkDivElem = newSelectBtnElem(catWindowId, "<em>Save as my default.</em>");
		windowContent.appendChild(checkDivElem);
		
		//create back button
		var backBtn = document.createElement('div');
		backBtn.setAttribute('class','back_button');
		backBtn.innerHTML = "Go!";
		backBtn.onclick = function()
		{
			hideWindowOverlayDiv(catWindowId);
			//center over default location / save location as default
			setSelectedDefaultLocation(catWindowId);
		};
		windowContent.appendChild(backBtn);
		
		//overwrite the close button event in the upper right of the window to match the back button
		var auxBackBtn = $('#' + catWindowId + ' .page_head .back_icon');
		auxBackBtn.click(function()
		{
			hideWindowOverlayDiv(catWindowId);
			//center over default location / save location as default
			setSelectedDefaultLocation(catWindowId);			
		});
	}
	
	function setSelectedDefaultLocation(radBtnsPageId)
	{
		//get the checked radio button in the parent wrapper
		var checkedRadBtn = $('#' + radBtnsPageId + ' .map_overlay_radio.checked');
		
		//if non of the rad buttons are checked
		if (checkedRadBtn.length < 1)
		{
			//use the first radio button as the checked one
			checkedRadBtn = $('#' + radBtnsPageId + ' .map_overlay_radio:eq(0)');
		}
		
		//if there is a checked radio button
		if (checkedRadBtn.length > 0)
		{
			//get the latitude and longitude for this radio button
			var latLongElem = checkedRadBtn.find('.hid-lat-long-value');
			var latLongStr = latLongElem.text();
			var latVal = getTokenValue(latLongStr, 'lat');
			var lngVal = getTokenValue(latLongStr, 'lng');
			latVal = latVal * 1; //convert to number
			lngVal = lngVal * 1; //convert to number
			
			//if the selected default location has a number lat and longi value
			if (!isNaN(latVal) && !isNaN(lngVal))
			{
				//set the modular values
				mTargetLat = latVal;
				mTargetLong = lngVal;
				mTargetGeoP = getGeoPoint(mTargetLat, mTargetLong);
				
				//center over the the selected default location
				mMapView1.setCenter(mTargetGeoP);
				mMapView1.setZoom(mZoomLevel);
				
				//get the "do not ask me again, use this location by default" check box
				var checkSaveElem = $('#' + radBtnsPageId + ' .map_overlay_button:eq(0)');
				
				//if the "do not ask me again, use this location by default" check box is selected
				if (checkSaveElem.hasClass('checked'))
				{
					//save the default location in local storage
					saveDefaultLatLong(mTargetLat, mTargetLong);
					
					//remove all default location indicators
					$('#' + radBtnsPageId + ' .map_overlay_radio .btn_asside').remove();		
					
					//get the selected radio button id
					var radBtnId = checkedRadBtn.attr('id');
					
					//add icon to indicate that this rad button is saved as the default location
					var savedIndicateElem = document.createElement('span');
					savedIndicateElem.setAttribute('class','btn_asside');
					savedIndicateElem.innerHTML = '(default)';
					
					var radBtnElem = document.getElementById(radBtnId);
					radBtnElem.appendChild(savedIndicateElem);
					
					//deselect the check box to save selection
					uncheckSelectBtnElem(checkSaveElem.attr('id'));
				}
			}
		}
	}
	
	function saveDefaultLatLong(latVal, lngVal)
	{
		//save latitude
		setLocalStoreItem("", getMapStoreKey("latitude"), latVal);
		
		//save longitude
		setLocalStoreItem("", getMapStoreKey("longitude"), lngVal);
	}
	
	//If only windowType is provided, windowType is used as windowTitle, a windowId is derrived from windowType
	//If only windowType is provided and it matches one of the pre-defined types, the title, id and close event for the pre-defined windowType is used
	//If both windowType and windowId are provided, windowType is used as windowTitle and the provided id is used as windowId
	function addWindowOverlayDiv(windowType, wId)
	{
		var windowTitle = windowType;
		var windowId = wId;
		
		//window close button
		var btnClose = document.createElement('img');
		btnClose.setAttribute('src','img/icon_close_square.png');
		btnClose.setAttribute('class','back_icon');
		
		var includeCloseBtn = true;
		
		//if the window id is not specified separately from the window type/title
		if (windowId == undefined)
		{
			//choose a different title, window id, and window close action depending on window type
			switch (windowType)
			{
				case "show-me":
					windowTitle = "Find";
					windowId = "show_me_category_window";
					btnClose.onclick = function()
					{
						hideWindowOverlayDiv(windowId);
						alignMapMarkersWithSelected();
					};
					break;
				case "directions":
					windowTitle = "Directions";
					windowId = "window_directions";
					btnClose.onclick = function()
					{
						hideWindowOverlayDiv(windowId);
					};
					break;
				case "map-fail":
					windowTitle = "Map";
					windowId = "failed_map_load_wrap";
					includeCloseBtn = false;
					break;
				case "my-location":
					windowTitle = "My Location";
					windowId = "my_location_options_page";
					btnClose.onclick = function()
					{
						hideWindowOverlayDiv(windowId);
						alignMapMarkersWithSelected();
					};
					break;
				default:
					windowId = getMapQual('window') + getMaxLengthStr(getHardScrubbedString(windowType), 30);
					btnClose.onclick = function()
					{
						hideWindowOverlayDiv(windowId);
					};
					break;
			}
		}
		else //both the window type and id are specified. Use window type as title by default
		{
			btnClose.onclick = function()
			{
				hideWindowOverlayDiv(windowId);
			};
		}
		
		//build window div
		var windowDiv = document.createElement('div');
		windowDiv.setAttribute('class', getPageClass('pageWrap'));
		windowDiv.setAttribute('id',windowId);
		
		var windowHeadId = getMapQual('window-head') + windowId;
		windowDiv.innerHTML = "<div id='" + windowHeadId + "' class='" + getPageClass('pageHead') + "'><img class='logo' src='img/logo_shu_small.png' /><h1 class='" + getPageClass('pageTitle') + "'>" + windowTitle + "</h1></div>";
		
		//window content
		var windowContent = document.createElement('div');
		windowContent.setAttribute('class', getPageClass('pageContent'));
		windowContent.setAttribute('id',getMapQual('window-content') + windowId);
		
		//windowContent.appendChild(btnClose);
		windowDiv.appendChild(windowContent);
		
		var bodyElem = document.getElementsByTagName("body")[0];
		bodyElem.appendChild(windowDiv);
		
		var windowHeadElem = document.getElementById(windowHeadId);
		if (includeCloseBtn)
		{
			windowHeadElem.appendChild(btnClose);
		}
	}
	
	function showWindowOverlayDiv(windowId)
	{
		//show the overlay window
		showElem(windowId);
		
		//hide the button menu
		hideElem('map_menu');
		
		hideElem('map_head');
		
		//hide the map
		//hideElem('map_canvas');
	}
	
	function hideWindowOverlayDiv(windowId)
	{
		//show the button menu
		showElem('map_menu');
		
		showElem('map_head');
		
		//show the map
		//showElem('map_canvas');
		
		//hide the overlay window
		hideElem(windowId);
	}
	
	function showElem(elemId)
	{
		var elemDiv = document.getElementById(elemId);
		if (elemDiv != null && elemDiv != undefined)
		{
			elemDiv.setAttribute('style','visibility:visible;display:block;');
		}
	}
	
	function hideElem(elemId)
	{
		var elemDiv = document.getElementById(elemId);
		if (elemDiv != null && elemDiv != undefined)
		{
			elemDiv.setAttribute('style','visibility:hidden;display:none;');
		}
	}
	
	function getSelectBtnElem(btnDivId)
	{
		if (btnDivId.indexOf(getMapQual('button')) != 0)
		{
			btnDivId = getMapQual('button') + btnDivId;
		}	
		
		return document.getElementById(btnDivId);	
	}
	
	function newRadBtnElem(btnDivId, btnTxt, additionalHtml)
	{
		//if the radio button id doesn't begin with the qualifier
		if (btnDivId.indexOf(getMapQual('radio')) != 0)
		{
			//add the radio button qualifier to the id
			btnDivId = getMapQual('radio') + btnDivId;
		}
		
		//div, label and check id's
		var btnLabelId = getMapQual('radio-label') + btnDivId.replace(getMapQual('radio'), "");
		var btnCheckId = getMapQual('radio-check') + btnDivId.replace(getMapQual('radio'), "");
		
		//button dom object
		var btnDiv = document.createElement('div');
		btnDiv.setAttribute('class','map_overlay_radio unchecked');
		btnDiv.setAttribute('id', btnDivId);
		
		//inner html of the button
		var btnHtml = "";
		btnHtml += "<span class='btn_radio' id='" + btnCheckId + "'>" + "<img src='img/unchecked_radio.png'>" + "</span>";
		btnHtml += "<span class='btn_label' id='" + btnLabelId + "'>" + btnTxt + "</span>";
		if (additionalHtml != undefined)
		{
			btnHtml += additionalHtml;
		}
		btnDiv.innerHTML = btnHtml;	
		
		return btnDiv;
	}
	
	function newSelectBtnElem(btnDivId, btnTxt, additionalHtml)
	{
		if (btnDivId.indexOf(getMapQual('button')) != 0)
		{
			btnDivId = getMapQual('button') + btnDivId;
		}
		
		//div, label and check id's
		var btnLabelId = getMapQual('button-label') + btnDivId.replace(getMapQual('button'), "");
		var btnCheckId = getMapQual('button-check') + btnDivId.replace(getMapQual('button'), "");
		
		//button dom object
		var btnDiv = document.createElement('div');
		btnDiv.setAttribute('class','map_overlay_button unchecked');
		btnDiv.setAttribute('id', btnDivId);
		
		//inner html of the button
		var btnHtml = "";
		btnHtml += "<span class='btn_check' id='" + btnCheckId + "'>" + "<img src='img/unchecked_small.png'>" + "</span>";
		btnHtml += "<span class='btn_label' id='" + btnLabelId + "'>" + btnTxt + "</span>";
		if (additionalHtml != undefined)
		{
			btnHtml += additionalHtml;
		}
		btnDiv.innerHTML = btnHtml;	
		
		//toggle button select event
		btnDiv.onclick = function()
		{
			toggleSelectBtnElem(btnDivId);
		};	
		
		return btnDiv;
	}
	
	function checkSelectBtnElem(btnDivId)
	{
		if (btnDivId.indexOf(getMapQual('button')) != 0)
		{
			btnDivId = getMapQual('button') + btnDivId;
		}
		
		//get id's of elements to change
		var btnCheckId = getMapQual('button-check') + btnDivId.replace(getMapQual('button'), "");
		
		//get the html elements
		var btnDivElem = document.getElementById(btnDivId);
		var btnCheckElem = document.getElementById(btnCheckId);
		
		//make the changes
		btnDivElem.setAttribute('class','map_overlay_button checked');
		btnCheckElem.innerHTML = "<img src='img/checked_small.png'>";
	}
	
	function uncheckSelectBtnElem(btnDivId)
	{
		if (btnDivId.indexOf(getMapQual('button')) != 0)
		{
			btnDivId = getMapQual('button') + btnDivId;
		}
		
		//get id's of elements to change
		var btnCheckId = getMapQual('button-check') + btnDivId.replace(getMapQual('button'), "");
		
		//get the html elements
		var btnDivElem = document.getElementById(btnDivId);
		var btnCheckElem = document.getElementById(btnCheckId);
		
		//make the changes
		btnDivElem.setAttribute('class','map_overlay_button unchecked');
		btnCheckElem.innerHTML = "<img src='img/unchecked_small.png'>";
	}
	
	function addMyLocationOptionBtn(btnId, btnLabel, btnIcon)
	{
		var windowContent = document.getElementById(getMapQual('window-content') + 'my_location_options_page');
		
		var btnDiv = document.createElement("div");
		btnDiv.setAttribute('id',btnId);
		btnDiv.setAttribute('class', "map_overlay_button");
		btnDiv.innerHTML = "<span class='btn_label'>" + btnLabel + "</span>";
		if (btnIcon != undefined)
		{
			btnDiv.innerHTML = "<span class='btn_icon'>" + btnIcon + "</span>" + btnDiv.innerHTML;
		}

		windowContent.appendChild(btnDiv);
		
		return btnDiv;
	}
	
	function setCheckedDefaultLocation()
	{
		var defaultLat = getLocalStoreItem(getMapStoreKey("latitude"));
		var radBtnId = mTargetLat + '_' + mTargetLong;
		var haveSavedDefaultLocation = false;
		
		//if there is a saved default latitude
		if (defaultLat.indexOf(getLocalStorageErrMsg('no-such-item')) == -1)
		{
			var defaultLng = getLocalStoreItem(getMapStoreKey("longitude"));
			
			//if there is a saved default longitude
			if (defaultLng.indexOf(getLocalStorageErrMsg('no-such-item')) == -1)
			{
				//get the radio button id for this saved latitude and longitude
				radBtnId = defaultLat + '_' + defaultLng;
				haveSavedDefaultLocation = true;
			}		
		}	
		
		//finish formatting the id
		radBtnId = replaceAllOfGivenChar(radBtnId, ".", "");
		radBtnId = getMapQual('radio') + radBtnId;
		
		//select the radio button
		selectRadBtnElem(radBtnId);
		
		//if there is a saved default location
		if (haveSavedDefaultLocation)
		{
			//add icon to indicate that this rad button is saved as the default location
			var savedIndicateElem = document.createElement('span');
			savedIndicateElem.setAttribute('class','btn_asside');
			savedIndicateElem.innerHTML = '(default)';
			
			var radBtnElem = document.getElementById(radBtnId);
			radBtnElem.appendChild(savedIndicateElem);
		}
		
		return haveSavedDefaultLocation;
	}
	
	function addMarkerBtnToCategoryPage(catPageId, markerJson)
	{
		//if the category page id doesn't have the qualifier at the beginning
		if (catPageId.indexOf(getMapQual("categoryPage")) != 0)
		{
			//put the category page id at the beginning
			catPageId = getMapQual("categoryPage") + catPageId;
		}

		var isFirstRadBtn = false;
		
		//get the content div for this window
		var windowContentId = getMapQual('window-content') + catPageId;
		var windowContent = document.getElementById(windowContentId);
		
		//if this marker category window has not already been created
		if (windowContent == undefined || windowContent == null)
		{		
			//add a window for the markers under this category
			addMarkerCategoryWindowOverlayDiv(markerJson.category, catPageId);
			
			//get the content div for this newly created window
			windowContent = document.getElementById(windowContentId);
			
			isFirstRadBtn = true;
		}
		else //marker category window has already been created
		{
			//determine whether or not this is the first radio button in the parent wrapper (if it is, select it)
			var radBtnElems = $('#' + windowContentId + ' .map_overlay_radio');
			if (radBtnElems.length < 1)
			{
				isFirstRadBtn = true;
			}
		}
		
		//create the marker radio button
		var radBtnId = markerJson.latitude + '_' + markerJson.longitude;
		radBtnId = replaceAllOfGivenChar(radBtnId, ".", "");
		var btnMarker = newRadBtnElem(radBtnId, markerJson.title, "<span class='hid-lat-long-value'>" + "lat=" + markerJson.latitude + ";lng=" + markerJson.longitude + ";</span>");
		
		//windowContent.appendChild(btnMarker);
		
		//insert radio button before the check box to choose to save default selection
		var checkSaveElemId = getMapQual('button') + catPageId;
		var checkSaveElem = document.getElementById(checkSaveElemId);
		windowContent.insertBefore(btnMarker, checkSaveElem);
		
		//get the id of the new radio button
		var radBtnId = btnMarker.getAttribute('id');
		
		//if this is the first radio button in the parent container
		if (isFirstRadBtn)
		{
			//select the first radio button in the container
			selectRadBtnElem(radBtnId);
		}

		//radio button select event
		btnMarker.onclick = function()
		{
			//select the radio button when it's clicked
			selectRadBtnElem(radBtnId);
		};	
	}
	
	function addMarkerCategoryBtn(catJson)
	{
		var windowContent = document.getElementById(getMapQual('window-content') + 'show_me_category_window');
		
		//category item count html
		var btnCountId = getMapQual('button-count') + catJson.catid;
		var btnCount = "";
		btnCount += "<span class='btn_asside' id='" + btnCountId + "'>" + "" + catJson.itemcount + "" + "</span>";
		
		//get the button element
		//params: btnId, btnTxt, additionalHtml
		var btnDiv = newSelectBtnElem(catJson.catid, catJson.catname, btnCount);

		windowContent.appendChild(btnDiv);
	}
	
	function getGeoPoint(lat, lng)
	{
		var geoP = new google.maps.LatLng(lat, lng);
		return geoP;
	}
	
	
	/*function setReverseGeocode(lat, lng, elemId, elemType)
	{
		//if an element type was specified
		if (elemType != undefined)
		{
			//make sure the element type is lowercase
			elemType = elemType.toLowerCase();
		}
		
		//init values
		var addressStr = lat + "," + lng;
		geocoder = new google.maps.Geocoder();
		var latlng = getGeoPoint(lat, lng);
		
		//start google map api geocoder
		geocoder.geocode({'latLng': latlng}, function(results, status) 
		{
			//if the geocoder can be reached and used
			if (status == google.maps.GeocoderStatus.OK) 
		  	{
				//if the geocoder returned a result
				if (results[1]) 
				{
					//get the reverse-geocoded address
					addressStr = results[1].formatted_address;
				}
				
				//get the element to assign the value to
				var elem = document.getElementById(elemId);
				
				//use an assignment method depending on the type of element
				switch (elemType)
				{
					case "input":
						elem.value = addressStr;
						break;
					case "value":
						elem.value = addressStr;
						break;
					case "html":
						elem.innerHTML = addressStr;
						break;
					case "innerhtml":
						elem.innerHTML = addressStr;
						break;
					case "div":
						elem.innerHTML = addressStr;
						break;
					case "a":
						elem.innerHTML = addressStr;
						break;
					case "span":
						elem.innerHTML = addressStr;
						break;
					default:
						elem.value = addressStr;
						break;
				}
		  	} 
		  	else 
		  	{
				alert("Geocoder failed due to: " + status);
		  	}
		});
	}*/
	
	function getPolyOutline(outlineJson)
	{
		var theStrokeColor = "#4f78b3";
		var theStrokeOpacity = 0.35;
		var theStrokeWeight = 1;
		var theFillColor = "#6e96d1";
		var theFillOpacity = 0.35;
		
		//stroke color
		outlineJson.strokeColor = getTrimStr(outlineJson.strokeColor);
		if (outlineJson.strokeColor != "")
		{
			theStrokeColor = outlineJson.strokeColor;
		}
		
		//stroke opacity
		if (outlineJson.strokeOpacity != undefined)
		{
			theStrokeOpacity = outlineJson.strokeOpacity;
		}
		
		//stroke weight
		if (outlineJson.strokeWeight != undefined)
		{
			theStrokeWeight = outlineJson.strokeWeight;
		}
		
		//fill color
		outlineJson.fillColor = getTrimStr(outlineJson.fillColor);
		if (outlineJson.fillColor != "")
		{
			theFillColor = outlineJson.fillColor;
		}
		
		//fill opacity
		if (outlineJson.fillOpacity != undefined)
		{
			theFillOpacity = outlineJson.fillOpacity;
		}
		
		//for each point of this polygon outline
		var pointsArray = [];
		for (var a = 0; a < outlineJson.points.length; a++)
		{
			//create the geo point
			var geoP = getGeoPoint(outlineJson.points[a].latitude, outlineJson.points[a].longitude);
				
			//add the geo point to the array
			pointsArray.push(geoP);
		}
		
		//set object values
		var polyOutline = new google.maps.Polygon
		({
			paths: pointsArray,
			strokeColor: theStrokeColor,
			strokeOpacity: theStrokeOpacity,
			strokeWeight: theStrokeWeight,
			fillColor: theFillColor,
			fillOpacity: theFillOpacity
	  	});
			
		return polyOutline;
	}
	



















	//BRING THE NON CACHED allJson.js FILE INTO THE PAGE
	var scriptSrc = 'http://sienaheights.edu/SHUMobileJSON/allJson.js';
	
	function initialize()
	{
		//var err = removeAllLocalStoreItems();
		//alert(err);
		
		clearSyncProgress();
		
		//initLoadingLightBox();
		
		initPageChangeListener();
		
		initMainMenu();
		
		//news, athletics, youtube
		initAllNews();
		
		//includes campus safety
		initAllPages();
		
		initBottomButtons();
		
		//deal with broken images
		replaceBrokenImages();
	}
	
	function refreshPageFeeds()
	{	
		/*var timeStamp = new Date().getTime();
		window.location.href += '?nocache=' + timeStamp;*/
		
		//strip off anchor from URL
		var reloadUrl = window.location.href;
		if (reloadUrl.indexOf('#') != -1)
		{
			reloadUrl = reloadUrl.substring(0, reloadUrl.indexOf('#'));
		}
		
		//save flag for syncing
		setLocalStoreItem('', getFeedKey('sync'), 'yes');
				
		//refresh the page
		window.location.href = reloadUrl;
	}
	
	function addExternalScript(scriptSrc)
	{
		//generate a no cache query string value 
		var nocacheVal = '#nocache=' + new Date().getTime();
		
		//create script element
		var allJsonScript = document.createElement('script');
		
		allJsonScript.setAttribute('type','text/javascript');
		allJsonScript.setAttribute('charset','utf-8');
		allJsonScript.setAttribute('src', scriptSrc + nocacheVal);
		
		//add the script as the first element of the head
		var docHead = document.getElementsByTagName("head")[0];
		docHead.insertBefore(allJsonScript, docHead.firstChild);
	}
	
	//should the external script be added?
	function doAddExternalScript()
	{
		var doAdd = false;
		
		//get the flag... to sync or not to sync. That is the question.
		var doAddStr = getLocalStoreItem(getFeedKey('sync'));
		
		//if there is a flag to do the sync
		if (doAddStr == 'yes')
		{
			doAdd = true;
		}
		else //no flag to go ahead with the syncing
		{
			//if there is no saved data in local storage
			if (localStorage.length < 1)
			{
				doAdd = true;
			}
		}
		
		return doAdd;
	}
	
	//if the external script should be added (when there is no saved data or the user hit the 'sync' button)
	if (doAddExternalScript())
	{
		//add the external data to the document
		addExternalScript(scriptSrc);
	}



function getMaxCols(colType)
{
	var returnInt = 2;
	
	switch (colType)
	{
		case "main-menu":
			returnInt = 2;
			break;
		default:
			break;
	}
	
	return returnInt;
}

function getTag(tagType)
{
	var returnStr = "";
	
	switch (tagType)
	{
		case "[":
			returnStr = "[";
			break;
		case "]":
			returnStr = "]";
			break;
		default:
			break;
	}
	
	return returnStr;
}

function getPageQual(qualType)
{
	var returnStr = "";
	
	switch (qualType)
	{
		case "pageId":
			returnStr = "pageDiv_";
			break;
		case "newsPageId":
			returnStr = "newsPage_";
			break;
		case "athleticsPageId":
			returnStr = "athleticsPage_";
			break;
		case "pageContent":
			returnStr = "content_";
			break;
		default:
			break;
	}
	
	return returnStr;
}

function getBtnClass(btnType)
{
	var returnStr = "";
	
	switch (btnType)
	{
		case "btns-menu":
			returnStr = "bottom_buttons_menu";
			break;
		case "bottomBtn":
			returnStr = "bottom_btn";
			break;
	}
	
	return returnStr;	
}

function getPageClass(classType)
{
	var returnStr = "";
	
	switch (classType)
	{
		case "pageTitle":
			returnStr = "page_title";
			break;
		case "pageHead":
			returnStr = "page_head";
			break;
		case "pageClose":
			returnStr = "close_icon";
			break;
		case "pageBack":
			returnStr = "back_icon";
			break;
		case "pageWrap":
			returnStr = "page_wrapper";
			break;
		case "pageContent":
			returnStr = "page_content";
			break;
		default:
			break;
	}
	
	return returnStr;	
}

function getPageId(idType)
{
	var returnStr = "";
	
	if (idType != undefined)
	{
		switch (idType)
		{
			case "main-menu":
				returnStr = "main-menu-page";
				break;
			case "news":
				returnStr = "news-pg";
				break;
			case "athletics":
				returnStr = "athletics-pg";
				break;
			case "athletics_news":
				returnStr = "athletics_news-pg";
				break;
			case "videos":
				returnStr = "videos-pg";
				break;
			case "scroll":
				returnStr = "scroll-area";
				break;
			case "campus-safety":
				returnStr = "safety-pg";
				break;
			case "contact":
				returnStr = "contact-pg";
				break;
			case "load":
				returnStr = "loading-wrap";
				break;
			case "load-text":
				returnStr = "load-text-wrap";
				break;
			default:
				break;
		}
	}
	else
	{
		//get the current page
		returnStr = location.hash;
	}
	
	return returnStr;	
}

function getBtnLabel(btnLabelType)
{
	var returnStr = "";
	
	switch (btnLabelType)
	{
		case "home-btn":
			returnStr = "<img src='img/icon_home_white.png' />";
			break;
		case "refresh-btn":
			returnStr = "<img src='img/icon_refresh.png' /><span class='txt'>Refresh</span>";
			break;
		case "sync-btn":
			returnStr = "<img src='img/icon_sync.png' /><span class='txt'>Sync</span>";
			break;
		default:
			break;
	}
	
	return returnStr;
}

function getBtnId(btnType)
{
	var returnStr = "";
	
	switch (btnType)
	{
		case "btns-menu":
			returnStr = "bottom_buttons_menu";
			break;
		case "home-btn":
			returnStr = "btn-menu-home";
			break;
		case "refresh-btn":
			returnStr = "btn-menu-refresh";
			break;
		default:
			break;
	}
	
	return returnStr;	
}

function getPageTitle(titleType)
{
	var returnStr = "";
	
	switch (titleType)
	{
		case "main-menu":
			returnStr = "<strong>SHU</strong> Mobile";
			break;
		case "campus-safety":
			returnStr = "Campus Safety";
			break;
		case "contact":
			returnStr = "Contact";
			break;
		case "load":
			returnStr = "Loading...";
			break;
		case "map":
			returnStr = "Map";
			break;
		default:
			break;
	}
	
	return returnStr;	
}

function getPageHtml(pageKey)
{
	var returnStr = "";
	
	switch (pageKey)
	{
		case "campus-safety":
			returnStr = "";
			returnStr += "<p>Adrian Campus: &lsquo;<strong>0</strong>&rsquo; or &lsquo;<strong>7800</strong>&rsquo; </p>";
			returnStr += "<p>Off Campus: <strong>517-264-7800</strong> </p>";
			//returnStr += "<img src='broke-image.png' />";
			break;
		case "contact":
			returnStr = "";
			
			returnStr += "<div class='contact-page-wrap'>";
			
			returnStr += "<div class='group-wrap'>";
			returnStr += "<h1 class='group-title'>Undergraduate</h1>";
			
			returnStr += getContactHtml("Adrian", "Main Campus", "1247 E. Siena Heights Drive", "Adrian, MI 49221", "", "", "800-521-0009, extension 7180", "517-264-7180", "", "admissions@sienaheights.edu", "", "");
			
			returnStr += getContactHtml("Metro Detroit", "Metropolitan Detroit Program", "19675 W 10 Mile Road", "Suite 400", "Southfield, MI 48075", "", "(248) 799-5490", "(800) 787-7784", "", "mdp@sienaheights.edu", "", "");
			
			returnStr += getContactHtml("Battle Creek", "Kellogg Community College Center", "450 North Avenue", "Lane Thomas Bldg, Room 304", "Battle Creek, MI 49017", "", "(269) 965-3931 ext. 2950", "(800) 203-1560", "", "battlecreek@sienaheights.edu", "", "");
			
			returnStr += getContactHtml("Monroe", "Monroe County Community College Center", "1555 South Raisinville Road", "Life Sciences Bldg., Room No. L-221", "Monroe, MI 48161", "", "(734) 384-4133", "(877) 937-6222", "(734) 384-4331", "monroe@sienaheights.edu", "", "");
			
			returnStr += getContactHtml("Benton Harbor", "Lake Michigan College Center", "2755 East Napier Avenue, Office # C-204", "Benton Harbor, MI 49022", "", "", "(269) 927-6711", "(800) 252-1562 ext. 6711", "", "bentonharbor@sienaheights.edu", "", "");
			
			returnStr += getContactHtml("Online Degree", "", "", "", "", "", "(866) 937-2748", "", "", "online@sienaheights.edu", "", "");
			
			returnStr += getContactHtml("Jackson", "Jackson Community College Center", "McDivitt Hall #126", "2111 Emmons Road", "Jackson, MI 49201", "", "(517) 796-8672", "", "", "jackson@sienaheights.edu", "", "");
			
			returnStr += getContactHtml("Diocese of Lansing", "Catholic Diocese of Lansing", "", "", "", "", "(517) 264-7690", "(800) 521-0009 ext. 7690", "", "koconnor@sienaheights.edu", "damato@dioceseoflansing.org", "");
			
			returnStr += getContactHtml("Lansing", "Lansing Community College", "210 W. Shiawassee Street", "P.O. Box 40010", "Mail Code 8200S", "Lansing, MI 48901", "(517) 483-9726", "", "(517) 483-9719", "lansing@sienaheights.edu", "", "");
			
			returnStr += "</div>"; //end group-wrap
			
			returnStr += "<div class='group-wrap'>";
			returnStr += "<h1 class='group-title'>The Graduate College Locations</h1>";
			
			returnStr += getContactHtml("Adrian Campus", "", "1247 East Siena Heights Drive", "Adrian, MI 49221-1796", "", "", "877-438-1596", "517-264-7665", "", "ebrooks@sienaheights.edu", "", "http://maps.google.com/maps?f=q&hl=en&geocode=&q=1247+E.+Siena+Heights+Dr.+Adrian+Michigan+49221&sll=42.089624,-86.39112&sspn=0.017261,0.047035&ie=UTF8&om=1&z=16&iwloc=addr");
			
			returnStr += getContactHtml("SHU @ Kellogg Community College", "", "450 North Avenue", "Battle Creek, MI 49017-3397", "", "", "517-483-9726", "", "", "cstahl1@sienaheights.edu", "", "http://maps.google.com/maps?f=q&hl=en&q=450+North+Ave,+Battle+Creek,+MI+49017&ll=42.335104,-85.179834&spn=0.015227,0.043259");
			
			returnStr += getContactHtml("SHU @ Lake Michigan Center", "", "2755 East Napier Avenue", "Benton Harbor, MI 49022", "", "", "517-483-9726", "", "", "cstahl1@sienaheights.edu", "", "http://maps.google.com/maps?f=q&hl=en&q=2755+E.+Napier+Ave,+Benton+Harbor,+MI+49022&ll=42.089624,-86.39112&spn=0.015287,0.043259");
			
			returnStr += getContactHtml("SHU @ Lansing Community College @ University Center", "", "210 West Shiawassee", "Lansing, MI 48933", "", "", "517-483-9726", "", "", "cstahl1@sienaheights.edu", "", "http://maps.google.com/maps?q=210+W+Shiawassee+St,+Lansing,+MI+48933,+USA&ie=UTF8&ll=42.73803,-84.554021&spn=0.007155,0.020084&z=16&iwloc=addr&om=1");
			
			returnStr += getContactHtml("SHU @ Monroe County Community College", "", "1555 South Raisinville Road", "Monroe, MI 48161", "", "", "734-384-4133", "", "", "monroe@sienaheights.edu", "", "http://maps.google.com/maps?f=q&hl=en&q=1555+S.+Raisinville+Rd,+l-221,+Monroe,+MI+48161&ll=41.916553,-83.472018&spn=0.015328,0.043259");
			
			returnStr += getContactHtml("Metro Detroit Campus", "", "19675 West 10 Mile Road", "Suite 400", "Southfield, MI 48075", "", "800-787-7784 ext. 4", "248-799-5490 ext. 4", "", "jermiger@sienaheights.edu", "", "http://maps.google.com/maps?f=d&hl=en&saddr=19675+W+10+Mile+Road,+Southfield+michigan&daddr=&ie=UTF8&z=15&ll=42.472825,-83.237915&spn=0.01817,0.061111&om=1&iwloc=addr");
			
			returnStr += "</div>"; //end group-wrap
			
			returnStr += "</div>"; //end contact-page-wrap
			
			break;
		default:
			break;
	}
	
	return returnStr;
}

//***temporary function so that we can save time in the short run
function getContactHtml(title, summary, address1, address2, address3, address4, phone1, phone2, fax, email1, email2, directionsLink)
{
	returnStr = "";
	
	//open contact wrap
	returnStr += "<div class='contact-wrap'>";
	
	//contact title
	if (title != undefined && title.length > 0)
	{
		returnStr += "<h1 class='contact-title'>" + title + "</h1>";
	}
	
	//summary
	if (summary != undefined && summary.length > 0)
	{
		returnStr += "<span class='contact-summary'>" + summary + "</span>";
	}
	
	//address1
	if (address1 != undefined && address1.length > 0)
	{
		returnStr += "<span class='contact-line-wrap'>";
		returnStr += address1;
		returnStr += "</span>";
	}
	
	//address2
	if (address2 != undefined && address2.length > 0)
	{
		returnStr += "<span class='contact-line-wrap'>";
		returnStr += address2;
		returnStr += "</span>";
	}
	
	//address3
	if (address3 != undefined && address3.length > 0)
	{
		returnStr += "<span class='contact-line-wrap'>";
		returnStr += address3;
		returnStr += "</span>";
	}
	
	//address4
	if (address4 != undefined && address4.length > 0)
	{
		returnStr += "<span class='contact-line-wrap'>";
		returnStr += address4;
		returnStr += "</span>";
	}
	
	//phone1
	if (phone1 != undefined && phone1.length > 0)
	{
		returnStr += "<span class='contact-line-wrap'>";
		returnStr += "<span class='contact-line-label'>Phone: </span>";
		returnStr += phone1;
		returnStr += "</span>";
	}
	
	//phone2
	if (phone2 != undefined && phone2.length > 0)
	{
		returnStr += "<span class='contact-line-wrap'>";
		returnStr += "<span class='contact-line-label'>Or </span>";
		returnStr += phone2;
		returnStr += "</span>";
	}
	
	//fax
	if (fax != undefined && fax.length > 0)
	{
		returnStr += "<span class='contact-line-wrap'>";
		returnStr += "<span class='contact-line-label'>Fax: </span>";
		returnStr += fax;
		returnStr += "</span>";
	}
	
	//email1
	if (email1 != undefined && email1.length > 0)
	{
		returnStr += "<span class='contact-line-wrap'>";
		returnStr += "<span class='contact-line-label'>Email: </span>";
		returnStr += email1;
		returnStr += "</span>";
	}
	
	//email2
	if (email2 != undefined && email2.length > 0)
	{
		returnStr += "<span class='contact-line-wrap'>";
		returnStr += "<span class='contact-line-label'>Or </span>";
		returnStr += email2;
		returnStr += "</span>";
	}
	
	//directions link
	if (directionsLink != undefined && directionsLink.length > 0)
	{
		returnStr += "<span class='contact-line-wrap'>";
		returnStr += "<a href='" + directionsLink + "' target='_blank'>Directions</a>";
		returnStr += "</span>";
	}
	
	//close contact wrap
	returnStr += "</div>";
	
	return returnStr;
}

function getKeyValSeparator()
{
	return "=";
}

function getKeyValEnd()
{
	return ";";
}

function getMarkerSummaryMaxLength()
{
	return 100;
}

function getMapQual(qualType)
{
	var returnStr = "";
	
	switch (qualType)
	{
		case "button":
			returnStr = "button_";
			break;
		case "radio":
			returnStr = "radio_";
			break;
		case "button-label":
			returnStr = "label_";
			break;
		case "button-count":
			returnStr = "count_";
			break;
		case "radio-label":
			returnStr = "rad-label_";
			break;
		case "button-check":
			returnStr = "checkBox_";
			break;
		case "radio-check":
			returnStr = "radBox_";
			break;
		case "window":
			returnStr = "window_";
			break;
		case "window-content":
			returnStr = "window-content_";
			break;
		case "window-head":
			returnStr = "window-head_";
			break;
		case "categoryPage":
			returnStr = "category-pg_";
			break;
		default:
			break;
	}
	
	return returnStr;
}

function getMapStoreQual(qualType)
{
	var returnStr = "";
	
	switch (qualType)
	{
		case "value":
			returnStr = "map_";
			break;
		default:
			break;
	}
	
	return returnStr;
}

function getMapStoreKey(keyType)
{
	var returnStr = "";
	
	switch (keyType)
	{
		case "latitude":
			returnStr = getMapStoreQual("value") + "default_lat";
			break;
		case "longitude":
			returnStr = getMapStoreQual("value") + "default_longi";
			break;
		default:
			break;
	}
	
	return returnStr;
}

//MAIN NEWS TEMPLATES
function getNewsFeedTemplate(templateType)
{
	var returnStr = "";
	
	switch (templateType)
	{
		case "category-head":
		
			returnStr = "";
			returnStr += "<div class='news-category-wrap'>";
			
			break;
		case "category-item":

			returnStr = "";
			returnStr += "<a href='#[subPageId]' id='[itemId]' class='item-wrap'>";
			returnStr += "<span class='item-title'>[title]</span>";
			returnStr += "</a>";

			break;
		case "category-foot":
		
			returnStr = "";
			returnStr += "</div>";
			
			break;
		case "articles-head":
		
			returnStr = "";
			returnStr += "<div class='news-wrap'>";
			returnStr += "<div class='news-timestamp'>";
			returnStr += "<strong>New</strong> [saveDayStr], [saveMonth]/[saveDayInt]/[saveYear], [saveTime]";
			returnStr += "</div>";
			
			break;
		case "articles-item":
		
			returnStr = "";
			returnStr += "<a href='#[subPageId]' id='[itemId]' class='item-wrap'>";
			returnStr += "<span class='item-date'>";
			//DATE PARAMS: dateValue \\ currentDateFormat \\ desiredDateFormat (optional)
			returnStr += "DATE([publishedDate] \\ <m>/<d>/<yyyy> <h>:<nn>:<ss> <TT> \\ <m>/<d>/<yyyy>)END"; 
			returnStr += "</span>";
			returnStr += "<span class='item-title'>[title]</span>";		
			returnStr += "</a>";
			
			break;
		case "articles-foot":
		
			returnStr = "";
			returnStr += "</div>";
			
			break;
		case "article-detail":
		
			returnStr = "";
			returnStr += "<div class='news-details-wrap'>";
			returnStr += "<div class='item-title'>[title]</div>";
			returnStr += "<div class='item-date'>";
			//DATE PARAMS: dateValue \\ currentDateFormat \\ desiredDateFormat (optional)
			returnStr += "Published: <em>DATE([publishedDate] \\ <m>/<d>/<yyyy> <h>:<nn>:<ss> <TT> \\ <www>, <ddd> <mmm>, <yyyy>)END</em>";  
			returnStr += "</div>";
			returnStr += "<div class='item-description'>[content]</div>";
			returnStr += "</div>";
			
			break;
		case "no-data":

			returnStr = "";
			returnStr += "<div class='empty-title'>No Synced News Items</div>";
			returnStr += "<p>You do not have any news items to view. <br />Please make sure you are connected to a network then try syncing SHU Mobile. </p>";
			returnStr += "<div onclick=\"javascript:location.hash = '';\" class='back_button'>Back</div>";

			break;
		default:
			break;
	}
	
	return returnStr;
}

//ATHLETICS TEMPLATES
function getAthleticsFeedTemplate(templateType)
{
	var returnStr = "";
	
	switch (templateType)
	{
		case "category-head":
		
			returnStr = "";
			returnStr += "<div class='news-category-wrap'>";
			
			break;
		case "category-item":

			returnStr = "";
			returnStr += "IF([title] \\ <a href='#[subPageId]' id='[itemId]' class='item-wrap'>";
			returnStr += "<span class='item-title'>[title]</span>";
			returnStr += "</a>)END";

			break;
		case "category-foot":
		
			returnStr = "";
			returnStr += "</div>";
			
			break;
		case "articles-head":
		
			returnStr = "";
			returnStr += "<div class='news-wrap'>";
			returnStr += "<div class='news-timestamp'>";
			returnStr += "<strong>New</strong> [saveDayStr], [saveMonth]/[saveDayInt]/[saveYear], [saveTime]";
			returnStr += "</div>";
			
			break;
		case "articles-item":
			//***
			returnStr = "";
			returnStr += "<a id='[itemId]' IF([article_url] \\ href='[article_url]' target='_blank' class='item-wrap' \\ ";
			returnStr += "class='item-wrap disabled')END >";
			returnStr += "<span class='item-date'>";
			//DATE(dateValue \\ currentDateFormat \\ desiredDateFormat (optional))END
			returnStr += "[date_time]"; 
			returnStr += "</span>";
			returnStr += "<span class='item-title'>[location] vs. [opponent]</span>";
			
			returnStr += getAthleticsTemplateSnip("result");

			returnStr += "</a>";
			
			break;
		case "articles-foot":
		
			returnStr = "";
			returnStr += "</div>";
			
			break;
		case "article-detail":
		
			returnStr = "";
			
			break;
		case "no-data":

			returnStr = "";
			returnStr += "<div class='empty-title'>No Synced Sport Schedule Items</div>";
			returnStr += "<p>You do not have any sport schedule items to view. <br />Please make sure you are connected to a network then try syncing SHU Mobile. </p>";
			returnStr += "<div onclick=\"javascript:location.hash = '';\" class='back_button'>Back</div>";

			break;
		default:
			break;
	}
	
	return returnStr;
}

function getAthleticsTemplateSnip(snipType)
{
	var returnStr = "";
	
	switch (snipType)
	{
		case "result":
			returnStr = "";
			//IF(condition/value \\ then print \\ else print)END
			returnStr += "IF([result_indicator] <or> [home_result] <or> [opponent_result]\\ <span class='item-result'>)END";
			
			//IF(condition/value \\ then print \\ else print)END
			returnStr += "IF([result_indicator] \\ <span class='result-indicator'>";
			returnStr += "[result_indicator]</span>)END";
			//returnStr += "\\ <span class='result-indicator no-indicator'>*</span>)END";
			
			//IF(condition/value \\ then print \\ else print)END
			//returnStr += "IF([home_result] <and> [result_indicator] \\,&nbsp;)END";
			
			returnStr += "IF([home_result]\\";
			returnStr += "<span class='home-result'>";
			returnStr += "[home_result]";
			returnStr += "</span>)END";
			
			//IF(condition/value \\ then print \\ else print)END
			returnStr += "IF([home_result] <and> [opponent_result] \\&nbsp;-&nbsp;)END";
			
			returnStr += "IF([opponent_result]\\";
			returnStr += "<span class='opponent-result'>";
			returnStr += "[opponent_result]";
			returnStr += "</span>)END";
			
			returnStr += "IF([result_indicator] <or> [home_result] <or> [opponent_result]\\ </span>)END";
			break;
		default:
			break;
	}
	
	return returnStr;
}

//SPORT NEWS TEMPLATES
function getSportNewsFeedTemplate(templateType)
{
	var returnStr = "";
	
	switch (templateType)
	{
		case "category-head":
		
			returnStr = "";
			returnStr += "<div class='news-category-wrap'>";
			
			break;
		case "category-item":

			returnStr = "";
			returnStr += "IF([title] \\ <a href='#[subPageId]' id='[itemId]' class='item-wrap'>";
			returnStr += "<span class='item-title'>[title]</span>";
			returnStr += "</a>)END";

			break;
		case "category-foot":
		
			returnStr = "";
			returnStr += "</div>";
			
			break;
		case "articles-head":
		
			returnStr = "";
			returnStr += "<div class='news-wrap'>";
			returnStr += "<div class='news-timestamp'>";
			returnStr += "<strong>New</strong> [saveDayStr], [saveMonth]/[saveDayInt]/[saveYear], [saveTime]";
			returnStr += "</div>";
			
			break;
		case "articles-item": 
		
			returnStr = "";
			returnStr += "<a href='#[subPageId]' id='[itemId]' class='item-wrap'>";
			returnStr += "<span class='item-date'>";
			//DATE PARAMS: dateValue \\ currentDateFormat \\ desiredDateFormat (optional)
			returnStr += "DATE([publishedDate] \\ <m>/<d>/<yyyy> <h>:<nn>:<ss> <TT> \\ <m>/<d>/<yyyy>)END"; 
			returnStr += "</span>";
			returnStr += "<span class='item-title'>[title]</span>";		
			returnStr += "</a>";
			
			break;
		case "articles-foot":
		
			returnStr = "";
			returnStr += "</div>";
			
			break;
		case "article-detail": 
		
			returnStr = "";
			returnStr += "<div class='news-details-wrap'>";
			returnStr += "<div class='item-title'>[title]</div>";
			returnStr += "<div class='item-date'>";
			//DATE PARAMS: dateValue \\ currentDateFormat \\ desiredDateFormat (optional)
			returnStr += "Published: <em>DATE([publishedDate] \\ <m>/<d>/<yyyy> <h>:<nn>:<ss> <TT> \\ <www>, <ddd> <mmm>, <yyyy>)END</em>";  
			returnStr += "</div>";
			returnStr += "<div class='item-description'>[content]</div>";
			returnStr += "</div>";
			
			break;
		case "no-data":

			returnStr = "";
			returnStr += "<div class='empty-title'>No Synced Sport News Items</div>";
			returnStr += "<p>You do not have any sport news items to view. <br />Please make sure you are connected to a network then try syncing SHU Mobile. </p>";
			returnStr += "<div onclick=\"javascript:location.hash = '';\" class='back_button'>Back</div>";

			break;
		default:
			break;
	}
	
	return returnStr;
}

//VIDEOS TEMPLATES
function getVideosFeedTemplate(templateType)
{
	var returnStr = "";
	
	switch (templateType)
	{
		case "category-head":
		
			returnStr = "";
			returnStr += "<div class='videos-category-wrap'>";
			
			break;
		case "category-item":

			returnStr = "";
			returnStr += "<a href='#[subPageId]' id='[itemId]' class='item-wrap'>";
			returnStr += "<span class='item-title'>[title]</span>";
			returnStr += "</a>";

			break;
		case "category-foot":
		
			returnStr = "";
			returnStr += "</div>";
			
			break;
		case "articles-head":
		
			returnStr = "";
			returnStr += "<div class='videos-wrap'>";
			returnStr += "<div class='news-timestamp'>";
			returnStr += "<strong>New</strong> [saveDayStr], [saveMonth]/[saveDayInt]/[saveYear], [saveTime]";
			returnStr += "</div>";
			
			break;
		case "articles-item":
				
			returnStr = "";
			returnStr += "<div class='video-item' id='[itemId]'>";
			returnStr += "<a class='video-link' href='[link]' target='_blank'>";
			returnStr += "<img class='video-img' src='[thumbnail]' />";
			returnStr += "</a>";
			returnStr += "<div class='video-txt'>";
			returnStr += "<a class='video-title' href='[link]' target='_blank'><h1 class='video-title'>[title]</h1></a>";
			returnStr += "<div class='video-summary'>[content]</div>";
			returnStr += "</div>";
			returnStr += "</div>";
			
			break;
		case "articles-foot":
		
			returnStr = "";
			returnStr += "</div>";
			
			break;
		case "article-detail":
		
			returnStr = "";
			
			break;
		case "no-data":

			returnStr = "";
			returnStr += "<div class='empty-title'>No Youtube Connection</div>";
			returnStr += "<p>You are not connected to Youtube. <br />Please make sure you are connected to a network then try syncing SHU Mobile. </p>";
			returnStr += "<div onclick=\"javascript:location.hash = '';\" class='back_button'>Back</div>";

			break;
		default:
			break;
	}
	
	return returnStr;
}

function getFeedType(keyKey)
{
	var returnStr = "";
	
	switch (keyKey)
	{
		case "news":
			returnStr = "news";
			break;
		case "m_baseball":
			returnStr = "athletics";
			break;
		case "m_baseball_news":
			returnStr = "athletics_news";
			break;
		case "m_basketball":
			returnStr = "athletics";
			break;
		case "m_basketball_news":
			returnStr = "athletics_news";
			break;
		case "m_bowling":
			returnStr = "athletics";
			break;
		case "m_bowling_news":
			returnStr = "athletics_news";
			break;
		case "m_cross_country":
			returnStr = "athletics";
			break;
		case "m_cross_country_news":
			returnStr = "athletics_news";
			break;
		case "m_golf":
			returnStr = "athletics";
			break;
		case "m_golf_news":
			returnStr = "athletics_news";
			break;
		case "m_football":
			returnStr = "athletics";
			break;
		case "m_football_news":
			returnStr = "athletics_news";
			break;
		case "m_lacrosse":
			returnStr = "athletics";
			break;
		case "m_lacrosse_news":
			returnStr = "athletics_news";
			break;
		case "m_soccer":
			returnStr = "athletics";
			break;
		case "m_soccer_news":
			returnStr = "athletics_news";
			break;
		case "m_track_field":
			returnStr = "athletics";
			break;
		case "m_track_field_news":
			returnStr = "athletics_news";
			break;
		case "m_volleyball":
			returnStr = "athletics";
			break;
		case "m_volleyball_news":
			returnStr = "athletics_news";
			break;
		case "w_basketball":
			returnStr = "athletics";
			break;
		case "w_basketball_news":
			returnStr = "athletics_news";
			break;
		case "w_bowling":
			returnStr = "athletics";
			break;
		case "w_bowling_news":
			returnStr = "athletics_news";
			break;
		case "w_cheer_dance":
			returnStr = "athletics";
			break;
		case "w_cheer_dance_news":
			returnStr = "athletics_news";
			break;
		case "w_cross_country":
			returnStr = "athletics";
			break;
		case "w_cross_country_news":
			returnStr = "athletics_news";
			break;
		case "w_golf":
			returnStr = "athletics";
			break;
		case "w_golf_news":
			returnStr = "athletics_news";
			break;
		case "w_lacrosse":
			returnStr = "athletics";
			break;
		case "w_lacrosse_news":
			returnStr = "athletics_news";
			break;
		case "w_soccer":
			returnStr = "athletics";
			break;
		case "w_soccer_news":
			returnStr = "athletics_news";
			break;
		case "w_softball":
			returnStr = "athletics";
			break;
		case "w_softball_news":
			returnStr = "athletics_news";
			break;
		case "w_track_field":
			returnStr = "athletics";
			break;
		case "w_track_field_news":
			returnStr = "athletics_news";
			break;
		case "w_volleyball":
			returnStr = "athletics";
			break;
		case "w_volleyball_news":
			returnStr = "athletics_news";
			break;
		case "videos":
			returnStr = "videos";
			break;
		default:
			break;
	}
	
	return returnStr;
}

function getFeedKey(keyType)
{
	var returnStr = "";
	
	switch (keyType)
	{
		case "news":
			returnStr = getFeedQual("feedKey") + "news";
			break;
		case "athletics":
			returnStr = getFeedQual("feedKey") + "athletics";
			break;
		case "m_baseball":
			returnStr = getFeedQual("feedKey") + "m_baseball";
			break;
		case "m_baseball_news":
			returnStr = getFeedQual("feedKey") + "m_baseball_news";
			break;
		case "m_basketball":
			returnStr = getFeedQual("feedKey") + "m_basketball";
			break;
		case "m_basketball_news":
			returnStr = getFeedQual("feedKey") + "m_basketball_news";
			break;
		case "m_bowling":
			returnStr = getFeedQual("feedKey") + "m_bowling";
			break;
		case "m_bowling_news":
			returnStr = getFeedQual("feedKey") + "m_bowling_news";
			break;
		case "m_cross_country":
			returnStr = getFeedQual("feedKey") + "m_cross_country";
			break;
		case "m_cross_country_news":
			returnStr = getFeedQual("feedKey") + "m_cross_country_news";
			break;
		case "m_golf":
			returnStr = getFeedQual("feedKey") + "m_golf";
			break;
		case "m_golf_news":
			returnStr = getFeedQual("feedKey") + "m_golf_news";
			break;
		case "m_football":
			returnStr = getFeedQual("feedKey") + "m_football";
			break;
		case "m_football_news":
			returnStr = getFeedQual("feedKey") + "m_football_news";
			break;
		case "m_lacrosse":
			returnStr = getFeedQual("feedKey") + "m_lacrosse";
			break;
		case "m_lacrosse_news":
			returnStr = getFeedQual("feedKey") + "m_lacrosse_news";
			break;
		case "m_soccer":
			returnStr = getFeedQual("feedKey") + "m_soccer";
			break;
		case "m_soccer_news":
			returnStr = getFeedQual("feedKey") + "m_soccer_news";
			break;
		case "m_track_field":
			returnStr = getFeedQual("feedKey") + "m_track_field";
			break;
		case "m_track_field_news":
			returnStr = getFeedQual("feedKey") + "m_track_field_news";
			break;
		case "m_volleyball":
			returnStr = getFeedQual("feedKey") + "m_volleyball";
			break;
		case "m_volleyball_news":
			returnStr = getFeedQual("feedKey") + "m_volleyball_news";
			break;
		case "w_basketball":
			returnStr = getFeedQual("feedKey") + "w_basketball";
			break;
		case "w_basketball_news":
			returnStr = getFeedQual("feedKey") + "w_basketball_news";
			break;
		case "w_bowling":
			returnStr = getFeedQual("feedKey") + "w_bowling";
			break;
		case "w_bowling_news":
			returnStr = getFeedQual("feedKey") + "w_bowling_news";
			break;
		case "w_cheer_dance":
			returnStr = getFeedQual("feedKey") + "w_cheer_dance";
			break;
		case "w_cheer_dance_news":
			returnStr = getFeedQual("feedKey") + "w_cheer_dance_news";
			break;
		case "w_cross_country":
			returnStr = getFeedQual("feedKey") + "w_cross_country";
			break;
		case "w_cross_country_news":
			returnStr = getFeedQual("feedKey") + "w_cross_country_news";
			break;
		case "w_golf":
			returnStr = getFeedQual("feedKey") + "w_golf";
			break;
		case "w_golf_news":
			returnStr = getFeedQual("feedKey") + "w_golf_news";
			break;
		case "w_lacrosse":
			returnStr = getFeedQual("feedKey") + "w_lacrosse";
			break;
		case "w_lacrosse_news":
			returnStr = getFeedQual("feedKey") + "w_lacrosse_news";
			break;
		case "w_soccer":
			returnStr = getFeedQual("feedKey") + "w_soccer";
			break;
		case "w_soccer_news":
			returnStr = getFeedQual("feedKey") + "w_soccer_news";
			break;
		case "w_softball":
			returnStr = getFeedQual("feedKey") + "w_softball";
			break;
		case "w_softball_news":
			returnStr = getFeedQual("feedKey") + "w_softball_news";
			break;
		case "w_track_field":
			returnStr = getFeedQual("feedKey") + "w_track_field";
			break;
		case "w_track_field_news":
			returnStr = getFeedQual("feedKey") + "w_track_field_news";
			break;
		case "w_volleyball":
			returnStr = getFeedQual("feedKey") + "w_volleyball";
			break;
		case "w_volleyball_news":
			returnStr = getFeedQual("feedKey") + "w_volleyball_news";
			break;
		case "videos":
			returnStr = getFeedQual("feedKey") + "videos";
			break;
		case "sync":
			returnStr = getFeedQual("flag") + "sync";
			break;
		default:
			break;
	}
	
	return returnStr;	
}

function getFeedDateFormat(formatType)
{
	var returnStr = "";
	
	switch (formatType)
	{
		case "default":
			returnStr = "<ww>, <ddd> <!=mmm> <!=yyy>, <h>:<nn> <TT>";
			break;
		default:
			break;
	}
	
	return returnStr
}

function getFeedQual(qualType)
{
	var returnStr = "";
	
	switch (qualType)
	{
		case "feedKey":
			returnStr = "feedjs_";
			break;
		case "flag":
			returnStr = "flag_";
			break;
		default:
			break;
	}
	
	return returnStr;
}

function getCompositeFeedId(pageId, idType, theIndex)
{
	return pageId + "_" + idType + theIndex;
}

function getFeedFormat(theFormatType)
{
	var formatKey = "formatKey"; //the format key for this xml to json translation schema
	var formatType = "formatType"; //xml or json? Controls how the data is imported even though all data ends up as json
	var jQuerySelector = "jQuerySelector"; //jquery selector for the xml value
	var jsonLabel = "jsonLabel"; //the name of the json field that will carry this value
	var nodes = "nodes"; //an array of xml nodes to translate into json
	var selectAttr = "selectAttr"; //specify an attribute to select the value from (the node text is selected instead if this field is not present)
	
	var returnJson = 
	{
		formatKey:"json",
		formatType:"json"
	};
	
	switch (theFormatType)
	{
		case "json":
			returnJson = 
			{
				formatKey:"json",
				formatType:"json"
			};
			break;
		case "youtube": //translate from xml to json. Controls how youtube xml is translated to json format
			returnJson = 
			{
				formatKey:"youtube",
				formatType:"xml",
				nodes:
				[
					/*{	//FEED URL
						jQuerySelector:"feed id:eq(0)", 
						jsonLabel:"feedUrl" 
					},*/
					{	//FEED ENTRIES
						jQuerySelector:"feed entry", 
						jsonLabel:"entries", 
						nodes:
						[
							{	//ENTRY TITLE
								jQuerySelector:"title:eq(0)", 
								jsonLabel:"title" 
							},
							{	//ENTRY IMAGE THUMB
								jQuerySelector:"[url*='.jpg']:eq(0)", 
								selectAttr:"url",
								jsonLabel:"thumbnail" 
							},
							{	//ENTRY LINK TO WATCH VIDEO
								jQuerySelector:"link:eq(0)", 
								selectAttr:"href",
								jsonLabel:"link" 
							},
							{	//CONTENT
								jQuerySelector:"content:eq(0)", 
								jsonLabel:"content" 
							},
							{	//PUBLISH DATE
								jQuerySelector:"published:eq(0)", 
								jsonLabel:"publishedDate" 
							}
						]
					}
				]
			};
			break;
		case "sports": //translate from xml to json. Controls how youtube xml is translated to json format
			returnJson = 
			{
				formatKey:"sports",
				formatType:"xml",
				nodes:
				[
					{	//FEED TITLE
						jQuerySelector:"title:eq(0)", 
						jsonLabel:"title" 
					},				 
					{	//FEED ENTRIES
						jQuerySelector:"item", 
						jsonLabel:"entries", 
						nodes:
						[
							{	//event date time
								jQuerySelector:"date-time:eq(0)", 
								jsonLabel:"date_time" 
							},
							{	//home result
								jQuerySelector:"home-result:eq(0)", 
								jsonLabel:"home_result" 
							},
							{	//opponent result
								jQuerySelector:"opponent-result:eq(0)", 
								jsonLabel:"opponent_result" 
							},
							{	//opponent
								jQuerySelector:"opponent:eq(0)", 
								jsonLabel:"opponent" 
							},
							{	//location
								jQuerySelector:"location:eq(0)", 
								jsonLabel:"location" 
							},
							{	//season
								jQuerySelector:"season:eq(0)", 
								jsonLabel:"season" 
							},
							{	//W, T, or L
								jQuerySelector:"result-indicator:eq(0)", 
								jsonLabel:"result_indicator" 
							},
							{	//sport
								jQuerySelector:"sport:eq(0)", 
								jsonLabel:"sport" 
							},
							{	//article url
								jQuerySelector:"article-url:eq(0)", 
								jsonLabel:"article_url" 
							}
						]
					}
				]
			};
			break;
		case "news":
			returnJson = 
			{
				formatKey:"news",
				formatType:"json"
			};
			break;
		default:
			break;
	}
	
	return returnJson;
}

function getFeedFormatByKey(feedKey)
{
	var returnJson = "";
	
	switch (feedKey)
	{
		case "news":
			returnJson = getFeedFormat("news");
			break;
		case "athletics_news":
			returnJson = getFeedFormat("news");
			break;
		case "athletics":
			//returnJson = "http://shusaints.com/DesktopModules/SportEvents/se_rss.aspx?mid=860";
			break;
		case "m_baseball":
			returnJson = getFeedFormat("sports");
			break;
		case "m_basketball":
			returnJson = getFeedFormat("sports");
			break;
		case "m_bowling":
			returnJson = getFeedFormat("sports");
			break;
		case "m_cross_country":
			returnJson = getFeedFormat("sports");
			break;
		case "m_golf":
			returnJson = getFeedFormat("sports");
			break;
		case "m_football":
			returnJson = getFeedFormat("sports");
			break;
		case "m_lacrosse":
			returnJson = getFeedFormat("sports");
			break;
		case "m_soccer":
			returnJson = getFeedFormat("sports");
			break;
		case "m_track_field":
			returnJson = getFeedFormat("sports");
			break;
		case "m_volleyball":
			returnJson = getFeedFormat("sports");
			break;
		case "w_basketball":
			returnJson = getFeedFormat("sports");
			break;
		case "w_bowling":
			returnJson = getFeedFormat("sports");
			break;
		case "w_cheer_dance":
			returnJson = getFeedFormat("sports");
			break;
		case "w_cross_country":
			returnJson = getFeedFormat("sports");
			break;
		case "w_golf":
			returnJson = getFeedFormat("sports");
			break;
		case "w_lacrosse":
			returnJson = getFeedFormat("sports");
			break;
		case "w_soccer":
			returnJson = getFeedFormat("sports");
			break;
		case "w_softball":
			returnJson = getFeedFormat("sports");
			break;
		case "w_track_field":
			returnJson = getFeedFormat("sports");
			break;
		case "w_volleyball":
			returnJson = getFeedFormat("sports");
			break;
		case "videos":
			returnJson = getFeedFormat("youtube");
			break;
		default:
			break;
	}
	
	return returnJson;	
}

function getFeedUrl(urlType)
{
	var returnStr = "";
	
	switch (urlType)
	{
		case "all":
			returnStr = "http://sienaheights.edu/SHUMobileJSON/allJson.js";
			break;
		case "news":
			returnStr = "http://sienaheights.edu/SHUMobileJSON/main_news.js";
			break;
		case "m_baseball":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport1.xml";
			break;
		case "m_baseball_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod565.xml";
			break;
		case "m_basketball":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport2.xml";
			break;
		case "m_basketball_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod568.xml";
			break;
		case "m_bowling":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport3.xml";
			break;
		case "m_bowling_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod733.xml";
			break;
		case "m_cross_country":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport4.xml";
			break;
		case "m_cross_country_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod741.xml";
			break;
		case "m_golf":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport5.xml";
			break;
		case "m_golf_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod746.xml";
			break;
		case "m_football":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport6.xml";
			break;
		case "m_football_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod747.xml";
			break;
		case "m_lacrosse":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport7.xml";
			break;
		case "m_lacrosse_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod748.xml";
			break;
		case "m_soccer":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport8.xml";
			break;
		case "m_soccer_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod749.xml";
			break;
		case "m_track_field":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport9.xml";
			break;
		case "m_track_field_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod750.xml";
			break;
		case "m_volleyball":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport10.xml";
			break;
		case "m_volleyball_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod751.xml";
			break;
		case "w_basketball":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport11.xml";
			break;
		case "w_basketball_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod753.xml";
			break;
		case "w_bowling":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport12.xml";
			break;
		case "w_bowling_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod754.xml";
			break;
		case "w_cheer_dance":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport21.xml";
			break;
		case "w_cheer_dance_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod1270.xml";
			break;
		case "w_cross_country":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport13.xml";
			break;
		case "w_cross_country_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod755.xml";
			break;
		case "w_golf":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport14.xml";
			break;
		case "w_golf_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod756.xml";
			break;
		case "w_lacrosse":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport15.xml";
			break;
		case "w_lacrosse_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod757.xml";
			break;
		case "w_soccer":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport16.xml";
			break;
		case "w_soccer_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod758.xml";
			break;
		case "w_softball":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport17.xml";
			break;
		case "w_softball_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod760.xml";
			break;
		case "w_track_field":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport18.xml";
			break;
		case "w_track_field_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod761.xml";
			break;
		case "w_volleyball":
			returnStr = "http://shusaints.com/Portals/0/SportEventsTokens/tokens_sport19.xml";
			break;
		case "w_volleyball_news":
			returnStr = "http://shusaints.com/Portals/0/AdvancedArticlesRSS/sportnews_mod762.xml";
			break;
		case "videos":
			returnStr = "http://gdata.youtube.com/feeds/api/users/sienaheights19/uploads";
			break;
		default:
			break;
	}
	
	return returnStr;	
}

function getFeedItemCount(countType)
{
	var returnInt = 10; //athletics feeds just use the default
	
	switch (countType)
	{
		case "news":
			returnInt = 10;
			break;
		case "athletics":
			returnInt = 10;
			break;
		case "athletics_news":
			returnInt = 10;
			break;
		case "sports":
			returnInt = 10;
			break;
		case "videos":
			returnInt = 10;
			break;
		default:
			break;
	}
	
	return returnInt;	
}

function getFeedKeysArray()
{
	var feedKeysArray = 
	[
		"news",
		"m_baseball",
		"m_baseball_news",
		"m_basketball",
		"m_basketball_news",
		"m_bowling",
		"m_bowling_news",
		"m_cross_country",
		"m_cross_country_news",
		"m_golf",
		"m_golf_news",
		"m_football",
		"m_football_news",
		"m_lacrosse",
		"m_lacrosse_news",
		"m_soccer",
		"m_soccer_news",
		"m_track_field",
		"m_track_field_news",
		"m_volleyball",
		"m_volleyball_news",
		"w_basketball",
		"w_basketball_news",
		"w_bowling",
		"w_bowling_news",
		"w_cheer_dance",
		"w_cheer_dance_news",
		"w_cross_country",
		"w_cross_country_news",
		"w_golf",
		"w_golf_news",
		"w_lacrosse",
		"w_lacrosse_news",
		"w_soccer",
		"w_soccer_news",
		"w_softball",
		"w_softball_news",
		"w_track_field",
		"w_track_field_news",
		"w_volleyball",
		"w_volleyball_news",
		"videos"
	];
	
	return feedKeysArray;
}

//START REMOVE AND REPLACE MANAGERS
function removeAllSpecialChars(theStr)
{
	var specialChars = "!@#$^&%*()+=-[]\\/{}|:;<>?,.'\"~`?\n\t\r";
	
	for (var i = 0; i < specialChars.length; i++)
	{
		if (theStr.indexOf(specialChars[i]) != -1)
		{
			theStr = replaceAllOfGivenChar(theStr, specialChars[i], "");
		}
	}
	
	return theStr;
}

function removeAllUrlChars(theStr)
{
	var urlChars = "@#$&%[]\\/{}<>?.\?\n\t\r";
	
	for (var i = 0; i < urlChars.length; i++)
	{
		if (theStr.indexOf(urlChars[i]) != -1)
		{
			if (urlChars[i] != '&')
			{
				theStr = replaceAllOfGivenChar(theStr, urlChars[i], "");
			}
			else
			{
				theStr = replaceAllOfGivenChar(theStr, '&', "and");
			}
		}
	}
	
	return theStr;
}

function replaceAllOfGivenChar(theStr, charToReplace, replaceWith)
{
	if (charToReplace != replaceWith)
	{
		while (theStr.indexOf(charToReplace) != -1)
		{
			theStr = theStr.replace(charToReplace, replaceWith);
		}
	}
	
	return theStr;
}

function getLastIndexOf(theStr, subStr)
{
	var lastIndex = -1;
	
	if (subStr != undefined && subStr.length > 0)
	{
		while (theStr.indexOf(subStr) != -1)
		{
			lastIndex = theStr.indexOf(subStr);
			
			theStr = theStr.replace(subStr,"");
		}
	}
	
	return lastIndex;
}

function getSubStrChunk(theStr, startSub, endSub)
{
	var strChunk = theStr;
	
	//if the start of the chunk doesn't equal the end of the chunk
	if (startSub != endSub)
	{
		//if there is a starting chunk
		if (strChunk.indexOf(startSub) != -1)
		{
			//remove string before starting chunk, including the starting chunk
			strChunk = strChunk.substring(strChunk.indexOf(startSub) + startSub.length);
			
			//if there is an ending chunk
			if (strChunk.indexOf(endSub) != -1)
			{
				//remove string after ending chunk
				strChunk = strChunk.substring(0, strChunk.indexOf(endSub) + endSub.length);
			}
			
			//and the start chunk back onto the beginning
			strChunk = startSub + strChunk;
		}
	}
	
	return strChunk;
}

function replaceGivenStrChunk(theStr, startSub, endSub, replaceWith)
{
	var strChunk = getSubStrChunk(theStr, startSub, endSub);
	
	//if the string chunk was found
	if (strChunk != theStr)
	{
		theStr = theStr.replace(strChunk, replaceWith);
	}
	
	return theStr;
}

function getHardScrubbedString(theStr)
{
	//remove all special characters from theStr
	theStr = removeAllSpecialChars(theStr);
	
	//remove all spaces from theStr
	theStr = replaceAllOfGivenChar(theStr, " ", "");
	
	//set the theStr to lower case
	theStr = theStr.toLowerCase();
	
	return theStr;
}

function getDerivedId(baseStr, appendUniqueStr)
{
	//remove special characters
	baseStr = getHardScrubbedString(baseStr);
	
	//restrict length
	baseStr = getMaxLengthStr(baseStr, 30);
	
	//trim leading and trailing spaces
	baseStr = getTrimStr(baseStr);
	
	if (appendUniqueStr != undefined && appendUniqueStr.length > 0)
	{
		appendUniqueStr = getTrimStr(appendUniqueStr);
		
		if (appendUniqueStr.indexOf("_") == 0)
		{
			baseStr += appendUniqueStr;
		}
		else
		{
			baseStr += "_" + appendUniqueStr;
		}
	}
	
	return baseStr;
}

function getTrimStr(theStr)
{
	var theTrimStr = theStr;
	
	if (theTrimStr != undefined && theTrimStr != null)
	{
		//make sure the value is a string
		theTrimStr += "";
		
		//remove leading spaces
		while (theTrimStr.charAt(0) == " " || theTrimStr.charAt(0) == "\t" || theTrimStr.charAt(0) == "\n")
		{
			theTrimStr = theTrimStr.substring(1);
		}
		
		var lastIndex = theTrimStr.length - 1;
		
		//remove trailing spaces
		while (theTrimStr.charAt(lastIndex) == " " || theTrimStr.charAt(lastIndex) == "\t" || theTrimStr.charAt(lastIndex) == "\n")
		{
			theTrimStr = theTrimStr.substring(0, theTrimStr.length - 1);
		}

	}
	else
	{
		theTrimStr = "";
	}
	
	return theTrimStr;
}
//END REMOVE AND REPLACE MANAGERS

//START KEY / VALUE PAIR MANAGERS
function setTokenValue(tokenKeyValPairList, tokenKey, newTokenVal)
{
	var keyValSeparator = getKeyValSeparator();
	var newKeyValPair = tokenKey + keyValSeparator + newTokenVal;
	
	//get the key value pair
	var prevKeyValPair = getTokenKeyValPair(tokenKeyValPairList, tokenKey);
	
	//if this key is already in the string
	if (prevKeyValPair.length > 0)
	{
		tokenKeyValPairList = tokenKeyValPairList.replace(prevKeyValPair, newKeyValPair);
	}
	else //the key value pair is not already in the string
	{
		var keyValEnd = getKeyValEnd();
		
		//add the key value pair to the string
		tokenKeyValPairList += keyValEnd + newKeyValPair;
		
		tokenKeyValPairList.replace(keyValEnd + keyValEnd + keyValEnd, keyValEnd);
		tokenKeyValPairList.replace(keyValEnd + keyValEnd, keyValEnd);
	}
	
	return tokenKeyValPairList;
}

function getTokenKeyValPair(tokenKeyValPairList, tokenKey)
{
	var keyValSeparator = getKeyValSeparator();
	var keyValEnd = getKeyValEnd();
	
	var tokenKeyVal = "";
	var keyAndSeparator = tokenKey + keyValSeparator;
	
	//if the token/key separator is in the string
	if (tokenKeyValPairList.indexOf(keyAndSeparator) != -1)
	{
		tokenKeyVal = tokenKeyValPairList;
			
		//remove everything before the key
		tokenKeyVal = tokenKeyVal.substring(tokenKeyVal.indexOf(keyAndSeparator));
			
		//if a key val end string is in the remaining string
		if (tokenKeyVal.indexOf(keyValEnd) != -1)
		{
			//strip off everything at and after the key value end string
			tokenKeyVal = tokenKeyVal.substring(0, tokenKeyVal.indexOf(keyValEnd));
		}
			
		//trim the value to return
		tokenKeyVal = getTrimStr(tokenKeyVal);
	}	
	
	return tokenKeyVal;
}

function getTokenValue(tokenKeyValPairList, tokenKey)
{
	var keyValSeparator = getKeyValSeparator();
	var tokenVal = "";
	var keyAndSeparator = tokenKey + keyValSeparator;
	
	//get the key value pair
	tokenVal = getTokenKeyValPair(tokenKeyValPairList, tokenKey);
	
	//remove the key part of the key value pair
	tokenVal = tokenVal.replace(keyAndSeparator, "");
	
	return tokenVal;
}
//END KEY / VALUE PAIR MANAGERS

//START LENGTH LIMIT MANAGERS
function getMaxLengthStr(theStr, maxLength)
{
	//if the string is longer than the max length
	if (theStr.length > maxLength)
	{
		theStr = theStr.substring(0, maxLength);
	}
	
	return theStr;
}

function getMaxLengthWithDotsStr(theStr, maxLength)
{
	var dots = "...";
	
	//if the max length is too small
	if (maxLength < dots.length + 1)
	{
		//increase the max length to the minimum
		maxLength = dots.length + 1;
	}
	
	//if the string is longer than the max length
	if (theStr.length > maxLength)
	{
		theStr = theStr.substring(0, maxLength - dots.length);
		theStr += dots;
	}
	
	return theStr;
}
//END LENGTH LIMIT MANAGERS



//START MAIN MENU
	function getMainMenuHeadTemplate()
	{
		//menu head
		var headTemplate = "";
		headTemplate += "<div class='menu-wrap'>";
		headTemplate += "<div class='menu-head'>";
		//headTemplate += "<h1>Menu</h1>";
		headTemplate += "</div>";
		
		return headTemplate;
	}
	
	function getMainMenuItemTemplate()
	{
		//repeated item template
		var itemTemplate = "";
		itemTemplate += "<div class='menu-item'>";
		itemTemplate += "<a href='[linkkey]' IF([onclick] \\ onclick='[onclick]')END class='menu-item'>";
		itemTemplate += "<img src='[image]' class='menu-img' />";
		itemTemplate += "<span class='menu-label'>[label]</span>";
		itemTemplate += "</a>";
		itemTemplate += "</div>";
		
		return itemTemplate;
	}
	
	function getMainMenuSeparateTemplate()
	{
		//new row break
		var separatorTemplate = "";
		separatorTemplate = "<div style='clear:both;'></div>";
		
		return separatorTemplate;
	}
	
	function getMainMenuFootTemplate()
	{
		//menu foot
		var footTemplate = "";
		footTemplate += "<div class='menu-foot'>";
		footTemplate += "&nbsp;";
		footTemplate += "</div>";
		footTemplate += "</div>";
		
		return footTemplate;
	}
	
	function initMainMenu()
	{	
		//if there are any main menu items specified
		var menuJSONArray = getMainMenuJSON();
		if (menuJSONArray.menuitems.length > 0)
		{
			var openTokenTag = getTag("[");
			var closeTokenTag = getTag("]");
			var menuHtml = "";
			var itemTemplate = getMainMenuItemTemplate();
			var separatorTemplate = getMainMenuSeparateTemplate();
			var numCols = getMaxCols("main-menu");
			var currentCol = 0;
			
			//add header
			menuHtml += getMainMenuHeadTemplate();
	
			//for each menu item
			for (var m = 0; m < menuJSONArray.menuitems.length; m++)
			{
				var menuJSON = menuJSONArray.menuitems[m];
				var menuItemTemplate = itemTemplate;
				
				//for each json parameter of this menu item
				for (var key in menuJSON) 
				{
					//if key is an actual property of an object, (not from the prototype)
					if (menuJSON.hasOwnProperty(key)) 
					{
						var tokenKey = openTokenTag + key + closeTokenTag;
						var tokenValue = menuJSON[key];
						
						if (tokenValue != undefined && tokenValue.length > 0)
						{
							//replace token instance(s) with actual values
							menuItemTemplate = replaceAllOfGivenChar(menuItemTemplate, tokenKey, tokenValue);
						}
					}
				}
				
				//add this item template to the html
				menuHtml += menuItemTemplate;
				
				if ((currentCol + 1) < numCols)
				{
					currentCol++;
				}
				else
				{
					currentCol = 0;
					menuHtml += separatorTemplate;
				}
			}
			
			//add footer
			menuHtml += getMainMenuFootTemplate();
			
			//REMOVE TOKENS THAT DIDN'T GET A REPLACEMENT VALUE
			menuHtml = removeTokensWithoutReplacedValues(menuHtml);

			//DATE FORMATTING COMMANDS
			menuHtml = getReplacedDateFormat(menuHtml);
				
			//EVALUATE CONDITIONAL CONTENT
			menuHtml = getReplacedIfCondition(menuHtml);
			
			//PERFORM REPLACE ON SPECIFIED EXTERNAL IMAGE PATHS
			//menuHtml = getReplacedExternalImageUrls(menuHtml);
			
			//finish building menu
			addPageDiv("main-menu"); //build main menu div
			showElem(getPageId("main-menu")); //show menu div
			overWriteToPageDiv(getPageId("main-menu"), menuHtml); //add menu html to menu div
		}
	}
//END MAIN MENU

//START PAGES
	
	function initAllPages()
	{
		initPage("campus-safety");
		
		initPage("contact");
	}
	
	function initPage(pageKey)
	{
		var pageHtml = getPageHtml(pageKey);
		var pageId = getPageId(pageKey);
		var pageTitle = getPageTitle(pageKey);
		
		//create the page div
		addPageDiv(pageTitle, pageId);
		
		//add the page html
		writeToPageDiv(pageId, pageHtml);
	}
//END PAGES

//START NEWS
	function initAllNews(showMsg)
	{		
		initFeed("news");
		
		initFeed("athletics");
		
		initFeed("athletics_news");
		
		initFeed("videos");
	}
	
	//feed key is optional, if feed key is included, only that feed html will be initialized
	function initFeed(feedType, feedKey)
	{
		
	//INIT VALUES SPECIFIC TO THIS FEED
		var feedJSON;
		var catPageTitle;
		var articlePageTitle;
		var detailPageTitle;
		var emptyPageTitle;
		var catPageId;
		var reverseEntryOrder = false;

		var headCatTemplate;
		var itemCatTemplate;
		var footCatTemplate;
		
		var headTemplate;
		var itemTemplate;
		var footTemplate;
		
		var detailsTemplate;
		
		//get feed json, feed page title and feed page id depending type of feed
		switch (feedType)
		{
			case "news":
			//NEWS FEED VALUES	
				feedJSON = getStoredFeedJSON("news"); //data source
				//feedJSON = getStaticFallbackJSON("news");
				
				//use the 'title' element of the json data if no static title is given
				catPageTitle = "All News";
				articlePageTitle = "News"; //default category title from feed json data
				detailPageTitle = "Details"; //default article title from feed json data
				emptyPageTitle = "News";
				
				//top level page id, article pages and detail pages are derived from this top level page and sub content title
				catPageId = getPageId("news");
				
				//parent category list templates
				headCatTemplate = getNewsFeedTemplate('category-head');
				itemCatTemplate = getNewsFeedTemplate('category-item');
				footCatTemplate = getNewsFeedTemplate('category-foot');
				emptyTemplateHtml = getNewsFeedTemplate('no-data');
				
				//child article list templates
				headTemplate = getNewsFeedTemplate('articles-head');
				itemTemplate = getNewsFeedTemplate('articles-item');
				footTemplate = getNewsFeedTemplate('articles-foot');
				
				//article details template
				detailsTemplate = getNewsFeedTemplate('article-detail');
				
				break;
			case "athletics":
			//ATHLETICS FEED KEYS LIST
				var athleticFeedKeys = "";
				athleticFeedKeys += "m_baseball" + ";";
				athleticFeedKeys += "m_basketball" + ";";
				athleticFeedKeys += "m_bowling" + ";";
				athleticFeedKeys += "m_cross_country" + ";";
				athleticFeedKeys += "m_golf" + ";";
				athleticFeedKeys += "m_football" + ";";
				athleticFeedKeys += "m_lacrosse" + ";";
				athleticFeedKeys += "m_soccer" + ";";
				athleticFeedKeys += "m_track_field" + ";";
				athleticFeedKeys += "m_volleyball" + ";";
				athleticFeedKeys += "w_basketball" + ";";
				athleticFeedKeys += "w_bowling" + ";";
				athleticFeedKeys += "w_cheer_dance" + ";";
				athleticFeedKeys += "w_cross_country" + ";";
				athleticFeedKeys += "w_golf" + ";";
				athleticFeedKeys += "w_lacrosse" + ";";
				athleticFeedKeys += "w_soccer" + ";";
				athleticFeedKeys += "w_softball" + ";";
				athleticFeedKeys += "w_track_field" + ";";
				athleticFeedKeys += "w_volleyball" + ";";
				
			//ATHLETICS FEED VALUES
				//if no single feed is defined by its key
				if (feedKey == undefined)
				{
					//get all of the feeds under this feed type
					feedJSON = getStoredFeedJSON(athleticFeedKeys); //data source
				}
				else
				{
					//get only the specified feed
					feedJSON = getStoredFeedJSON(feedKey); //data source
				}
				//feedJSON = getStaticFallbackJSON(athleticFeedKeys);
				
				//use the 'title' element of the json data if no static title is given
				catPageTitle = "Schedule";
				articlePageTitle = ""; //default category title from feed json data
				detailPageTitle = ""; //default article title from feed json data
				emptyPageTitle = "Schedule";
				
				//top level page id, article pages and detail pages are derived from this top level page and sub content title
				catPageId = getPageId("athletics");
				
				//parent category list templates
				headCatTemplate = getAthleticsFeedTemplate('category-head');
				itemCatTemplate = getAthleticsFeedTemplate('category-item');
				footCatTemplate = getAthleticsFeedTemplate('category-foot');
				emptyTemplateHtml = getAthleticsFeedTemplate('no-data');
				
				//child article list templates
				headTemplate = getAthleticsFeedTemplate('articles-head');
				itemTemplate = getAthleticsFeedTemplate('articles-item');
				footTemplate = getAthleticsFeedTemplate('articles-foot');
				
				//article details template
				detailsTemplate = getAthleticsFeedTemplate('article-detail');
				
				//reverse the article entry order to correct the google feed auto ordering in ascending order
				reverseEntryOrder = false;
				
				break;
			case "athletics_news":
			//ATHLETICS FEED KEYS LIST
				var athleticNewsFeedKeys = "";
				athleticNewsFeedKeys += "m_baseball_news" + ";";
				athleticNewsFeedKeys += "m_basketball_news" + ";";
				athleticNewsFeedKeys += "m_bowling_news" + ";";
				athleticNewsFeedKeys += "m_cross_country_news" + ";";
				athleticNewsFeedKeys += "m_golf_news" + ";";
				athleticNewsFeedKeys += "m_football_news" + ";";
				athleticNewsFeedKeys += "m_lacrosse_news" + ";";
				athleticNewsFeedKeys += "m_soccer_news" + ";";
				athleticNewsFeedKeys += "m_track_field_news" + ";";
				athleticNewsFeedKeys += "m_volleyball_news" + ";";
				athleticNewsFeedKeys += "w_basketball_news" + ";";
				athleticNewsFeedKeys += "w_bowling_news" + ";";
				athleticNewsFeedKeys += "w_cheer_dance_news" + ";";
				athleticNewsFeedKeys += "w_cross_country_news" + ";";
				athleticNewsFeedKeys += "w_golf_news" + ";";
				athleticNewsFeedKeys += "w_lacrosse_news" + ";";
				athleticNewsFeedKeys += "w_soccer_news" + ";";
				athleticNewsFeedKeys += "w_softball_news" + ";";
				athleticNewsFeedKeys += "w_track_field_news" + ";";
				athleticNewsFeedKeys += "w_volleyball_news" + ";";
				
			//ATHLETICS FEED VALUES
			
				//if no single feed is defined by its key
				if (feedKey == undefined)
				{
					//get all of the feeds under this feed type
					feedJSON = getStoredFeedJSON(athleticNewsFeedKeys); //data source
				}
				else
				{
					//get only the specified feed
					feedJSON = getStoredFeedJSON(feedKey); //data source
				}
				//feedJSON = getStaticFallbackJSON(athleticNewsFeedKeys);
				
				//use the 'title' element of the json data if no static title is given
				catPageTitle = "News";
				articlePageTitle = ""; //default category title from feed json data
				detailPageTitle = ""; //default article title from feed json data
				emptyPageTitle = "News";
				
				//top level page id, article pages and detail pages are derived from this top level page and sub content title
				catPageId = getPageId("athletics_news");
				
				//parent category list templates
				headCatTemplate = getSportNewsFeedTemplate('category-head');
				itemCatTemplate = getSportNewsFeedTemplate('category-item');
				footCatTemplate = getSportNewsFeedTemplate('category-foot');
				emptyTemplateHtml = getSportNewsFeedTemplate('no-data');
				
				//child article list templates
				headTemplate = getSportNewsFeedTemplate('articles-head');
				itemTemplate = getSportNewsFeedTemplate('articles-item');
				footTemplate = getSportNewsFeedTemplate('articles-foot');
				
				//article details template
				detailsTemplate = getSportNewsFeedTemplate('article-detail');
				
				//reverse the article entry order to correct the google feed auto ordering in ascending order
				reverseEntryOrder = false;
				
				break;
			case "videos":
			//VIDEO FEED VALUES	
				//feedJSON = getStoredFeedJSON("videos"); //data source
				feedJSON = [];
				try
				{
					//the getDownloadedJson is a function that's imported with ajax request to the external .js file 
					//if the import failed, getDownloadedJson will not be available
					feedJSON = [getDownloadedJson("videos")];					
				}
				catch (e)
				{
					//get the static video fallback data
					//videos have their own special fallback data since they are not stored locally like other feed data
					feedJSON = [getStaticVideoFallbackJSON()];
				}
				
				//use the 'title' element of the json data if no static title is given
				catPageTitle = "All Videos";
				articlePageTitle = "Videos"; //default category title from feed json data
				detailPageTitle = "Video"; //default article title from feed json data
				emptyPageTitle = "Videos";
				
				//top level page id, article pages and detail pages are derived from this top level page and sub content title
				catPageId = getPageId("videos");
				
				//parent category list templates
				headCatTemplate = getVideosFeedTemplate('category-head');
				itemCatTemplate = getVideosFeedTemplate('category-item');
				footCatTemplate = getVideosFeedTemplate('category-foot');
				emptyTemplateHtml = getVideosFeedTemplate('no-data');
				
				//child article list templates
				headTemplate = getVideosFeedTemplate('articles-head');
				itemTemplate = getVideosFeedTemplate('articles-item');
				footTemplate = getVideosFeedTemplate('articles-foot');
				
				//article details template
				detailsTemplate = getVideosFeedTemplate('article-detail');
				
				break;
			default:
				break;
		}
		
		//BUILD HTML CONTENT ON THE PAGE
		
		var hasParentCategoryList;
		var noArticleTitle = (articlePageTitle == "");
		var noDetailTitle = (detailPageTitle == "");

		//if this feed is not empty
		if (feedJSON.length > 0)
		{
			//for each feed parent list category
			for (var p = 0; p < feedJSON.length; p++)
			{
				var articlePageId = getCompositeFeedId(catPageId, "sub", p);
				
				//if there is more than one parent category
				if (feedJSON.length > 1)
				{
					//CATEGORY LIST ITEM
					buildTemplateItem(catPageTitle, catPageId, p, itemCatTemplate, feedJSON[p]);
					
					//if this is the last category feed item
					if ((p + 1) == feedJSON.length)
					{
						//CATEGORY LIST HEADER AND FOOTER
						buildTemplateHeadAndFoot(catPageTitle, catPageId, headCatTemplate, footCatTemplate, feedJSON[p]);		
					}
					
					hasParentCategoryList = true;
				}
				else //no category above the article list
				{
					//the article page is the top level page so it can use the top level category page id
					articlePageId = catPageId;
					hasParentCategoryList = false;
				}
				
				//if this category is defined
				if (feedJSON[p] != undefined)
				{
					//if this category has an entries array object
					if (feedJSON[p].entries != undefined)
					{
						//if this category has any entries
						if (feedJSON[p].entries.length > 0)
						{
							//determine if the entries should be printed in reverse order
							var startEntryIndex = 0;
							var endEntryLength = feedJSON[p].entries.length;
							var entryStep = 1;
							if (reverseEntryOrder)
							{
								startEntryIndex = feedJSON[p].entries.length - 1;
								endEntryLength = -1;
								entryStep = -1;
							}
							
							//for each entry article under the parent feed category
							for (var e = startEntryIndex; e != endEntryLength; e += entryStep)
							{
								//if the title is blank
								if (noArticleTitle)
								{
									if (feedJSON[p].title != undefined && feedJSON[p].title.length > 0)
									{
											articlePageTitle = feedJSON[p].title;
									}
									else
									{
										articlePageTitle = "";
									}
								}
								
								//ARTICLE LIST ITEM
								buildTemplateItem(articlePageTitle, articlePageId, e, itemTemplate, feedJSON[p].entries[e]);
								
								if (noDetailTitle)
								{
									detailPageTitle = articlePageTitle;
								}
	
								//ARTICLE DETAIL PAGE
								var detailPageId = getCompositeFeedId(articlePageId, "sub", e);
								buildTemplateDetail(detailPageTitle, detailPageId, detailsTemplate, feedJSON[p].entries[e]);
								
								//if there is no detail page
								if (detailsTemplate == "" || detailsTemplate == undefined)
								{
									//remove the detail page link 
									removeSubPageLink(articlePageId, e);
								}
								
								//if this is the last article feed item
								if ((e + entryStep) == endEntryLength)
								{
									//ARTICLE LIST HEADER AND FOOTER
									buildTemplateHeadAndFoot(articlePageTitle, articlePageId, headTemplate, footTemplate, feedJSON[p]);		
								}				
							}
						}
						else //no entries for this category feed
						{
							//if there is a parent category list
							if (hasParentCategoryList)
							{
								//remove the sub page link from this category item
								removeSubPageLink(catPageId, p);
							}
						}
					}
					else //no entries array object for this category feed 
					{
						//if there is a parent category list
						if (hasParentCategoryList)
						{
							//remove the sub page link from this category item
							removeSubPageLink(catPageId, p);
						}
					}
				}
			}
		}
		else //the feed is empty... failed to load the external data?
		{
			//build the empty data message page
			buildTemplateEmptyNoData(emptyPageTitle, catPageId, emptyTemplateHtml);
		}
		
		//handle iframes, embedded youtube videos, external link targets, relative link url's, etc...
		cleanUpPageLinksWithJQuery();
		
		return feedJSON.length;
	}
	
	function cleanUpPageLinksWithJQuery()
	{
		//remove external links 
    	//$("a[href^='http']").not(".videos-wrap a[href^='http']").remove();
		//$("a[href^='/']").remove();
		
		//EXTERNAL LINK TARGETS
		
		//for all external links not within the videos page, open in a new window
		$("a[href^='http']").not(".videos-wrap a[href^='http']").attr('target', '_blank');
		
		//MAIN NEWS LINKS
		$("div[id*='news-pg'] a[href^='/']").each(function(i)
		{
			//switch out relative links with absolute links
			var relLink = $(this).attr('href');
			relLink = "http://sienaheights.edu" + relLink;
			$(this).attr('href',relLink);
			$(this).attr('target','_blank');
		});
		
		//ATHLETICS SCHEDULE AND ATHLETICS NEWS LINKS
		$("div[id*='athletics'] a[href^='/']").each(function(i)
		{
			//switch out relative links with absolute links
			var relLink = $(this).attr('href');
			relLink = "http://shusaints.com" + relLink;
			$(this).attr('href',relLink);
			$(this).attr('target','_blank');
		});
		
		//SWITCH OUT MAILTO LINKS
		$("a[href^='mailto:']").each(function(i)
		{
			var mailtoHtml = $(this).html();
			$(this).before(mailtoHtml);
			$(this).remove();
		});
		
		//SWITCH OUT IFRAMES WITH LINKS
		$('iframe').each(function(i)
		{
			var frameSrc = $(this).attr('src');
			
			//if the iframe had a src value
			if (frameSrc != undefined)
			{
				var contentTitle = $(this).find('html head title').text();
				var linkClass = "iframe";
				
				//if the external document title could not be retrieved
				if (contentTitle == undefined || contentTitle.length < 1)
				{
					//see if there is a title attribute to use as the link title
					contentTitle = $(this).attr('title');
					
					//if there was no title attribute
					if (contentTitle == undefined || contentTitle.length < 1)
					{	
						//assign a generic title for the link
						contentTitle = "Link";
					}
				}
				
				//if this is a youtube embed iframe
				if (frameSrc.indexOf('youtube.com') != -1)
				{
					//assign a youtube title for the link
					contentTitle = "Watch Youtube Video";
						
					//get just the youtube video id from the embed src
					var videoId = getYoutubeVidIdInStr(frameSrc);
						
					//if a video id was found
					if (videoId != '')
					{
						frameSrc = "http://www.youtube.com/watch?v=" + videoId + "&rel=0";
					}
					else
					{
						frameSrc = '';
					}
					
					linkClass += " youtube";	
				}
				
				var linkHtml = "<a class='" + linkClass + "' href='" + frameSrc + "' target='_blank'>" + contentTitle + "</a>";
				
				//add the iframe-replacing link
				if (frameSrc != '')
				{
					$(this).before(linkHtml);
				}
			}
			
			//remove the iframe
			$(this).remove();
		});
		
	}
	
	function buildTemplateDetail(pageTitle, pageId, detailTemplateHtml, jsonData)
	{
		//if the detail template is not blank
		if (detailTemplateHtml != undefined && detailTemplateHtml.length > 0)
		{
			//if the specified page has not already been created
			if (document.getElementById(pageId) == undefined)
			{
				//add the page to the document
				addPageDiv(pageTitle, pageId);
			}
			
			var writeToDivId = getPageQual('pageContent') + pageId;
			var writeToDivElem = $('#' + writeToDivId);
			
			//if there is an existing element div to write to
			if (writeToDivElem.length > 0)
			{
				if (jsonData != undefined)
				{
					//TOKENS IN THE DETAILS TEMPLATE
					
					//replace all of the json tokens in the template with the json values
					detailTemplateHtml = getReplacedJsonTokenStr(detailTemplateHtml, jsonData);
				}
				
				//HTML < > CHARACTERS
				detailTemplateHtml = getReplacedHtmlChars(detailTemplateHtml);
				
				//REMOVE TOKENS THAT DIDN'T GET A REPLACEMENT VALUE
				detailTemplateHtml = removeTokensWithoutReplacedValues(detailTemplateHtml);

				//DATE FORMATTING COMMANDS
				detailTemplateHtml = getReplacedDateFormat(detailTemplateHtml);
				
				//EVALUATE CONDITIONAL CONTENT
				detailTemplateHtml = getReplacedIfCondition(detailTemplateHtml);
				
				//PERFORM REPLACE ON SPECIFIED EXTERNAL IMAGE PATHS
				//detailTemplateHtml = getReplacedExternalImageUrls(detailTemplateHtml);
				
				//add the new detail html to the page
				writeToDivElem.html(detailTemplateHtml); 
			}
		}
	}
	
	function buildTemplateEmptyNoData(pageTitle, pageId, emptyTemplateHtml)
	{
		//if the specified page has not already been created
		if (document.getElementById(pageId) == undefined)
		{
			//add the page to the document
			addPageDiv(pageTitle, pageId);
		}
		
		var startEmpty = '<!--START EMPTY ' + pageId + '-->';
		var endEmpty = '<!--END EMPTY ' + pageId + '-->';
		
		var writeToDivId = getPageQual('pageContent') + pageId;
		var writeToDivElem = $('#' + writeToDivId);
		
		writeToDivElem.html(startEmpty + emptyTemplateHtml + endEmpty);
	}
	
	function buildTemplateHeadAndFoot(pageTitle, pageId, headTemplateHtml, footTemplateHtml, jsonData)
	{
		//if the specified page has not already been created
		if (document.getElementById(pageId) == undefined)
		{
			//add the page to the document
			addPageDiv(pageTitle, pageId);
		}
		
		var writeToDivId = getPageQual('pageContent') + pageId;
		var writeToDivElem = $('#' + writeToDivId);
		
		//if there is an existing element div to write to
		if (writeToDivElem.length > 0)
		{
			if (jsonData != undefined)
			{
				//replace all of the json tokens in the template with the json values
				headTemplateHtml = getReplacedJsonTokenStr(headTemplateHtml, jsonData);
				footTemplateHtml = getReplacedJsonTokenStr(footTemplateHtml, jsonData);
			}
			
			//replace html chars
			headTemplateHtml = getReplacedHtmlChars(headTemplateHtml);
			footTemplateHtml = getReplacedHtmlChars(footTemplateHtml);
			
			//REMOVE TOKENS THAT DIDN'T GET A REPLACEMENT VALUE
			headTemplateHtml = removeTokensWithoutReplacedValues(headTemplateHtml);
			footTemplateHtml = removeTokensWithoutReplacedValues(footTemplateHtml);
			
			//DATE FORMATTING COMMANDS
			headTemplateHtml = getReplacedDateFormat(headTemplateHtml);
			footTemplateHtml = getReplacedDateFormat(footTemplateHtml);
			
			//EVALUATE CONDITIONAL CONTENT
			headTemplateHtml = getReplacedIfCondition(headTemplateHtml);
			footTemplateHtml = getReplacedIfCondition(footTemplateHtml);
			
			//PERFORM REPLACE ON SPECIFIED EXTERNAL IMAGE PATHS
			//headTemplateHtml = getReplacedExternalImageUrls(headTemplateHtml);
			//footTemplateHtml = getReplacedExternalImageUrls(footTemplateHtml);
			
			writeToDivHtml = writeToDivElem.html(); //get the existing html
			
			var startHeadIndicator = "<!--START HEAD " + pageId + "-->";
			var endHeadIndicator = "<!--END HEAD " + pageId + "-->";
			var startFootIndicator = "<!--START FOOT " + pageId + "-->";
			var endFootIndicator = "<!--END FOOT " + pageId + "-->";
			var startEmptyIndicator = '<!--START EMPTY ' + pageId + '-->';
			var endEmptyIndicator = '<!--END EMPTY ' + pageId + '-->';
			
			//if the previous html already had a header
			if (writeToDivHtml.indexOf(startHeadIndicator) != -1)
			{
				if (writeToDivHtml.indexOf(endHeadIndicator) != -1)
				{
					//remove a previous head string
					var prevHeadStr = writeToDivHtml.substring(writeToDivHtml.indexOf(startHeadIndicator));
					prevHeadStr = prevHeadStr.substring(0, prevHeadStr.indexOf(endHeadIndicator) + endHeadIndicator.length);
					writeToDivHtml = writeToDivHtml.replace(prevHeadStr, "");
				}
			}
			
			//if the previous html already had a footer
			if (writeToDivHtml.indexOf(startFootIndicator) != -1)
			{
				if (writeToDivHtml.indexOf(endFootIndicator) != -1)
				{
					//remove a previous head string
					var prevFootStr = writeToDivHtml.substring(writeToDivHtml.indexOf(startFootIndicator));
					prevFootStr = prevFootStr.substring(0, prevFootStr.indexOf(endFootIndicator) + endFootIndicator.length);
					writeToDivHtml = writeToDivHtml.replace(prevFootStr, "");
				}
			}
			
			//if the previous html already had an empty data message
			if (writeToDivHtml.indexOf(startEmptyIndicator) != -1)
			{
				if (writeToDivHtml.indexOf(endEmptyIndicator) != -1)
				{
					//remove a previous head string
					var prevEmptyStr = writeToDivHtml.substring(writeToDivHtml.indexOf(startEmptyIndicator));
					prevEmptyStr = prevEmptyStr.substring(0, prevEmptyStr.indexOf(endEmptyIndicator) + endEmptyIndicator.length);
					writeToDivHtml = writeToDivHtml.replace(prevEmptyStr, "");
				}
			}
			
			headTemplateHtml = startHeadIndicator + headTemplateHtml + endHeadIndicator;
			footTemplateHtml = startFootIndicator + footTemplateHtml + endFootIndicator;
			
			//add the new head and foot template to the page
			writeToDivElem.html(headTemplateHtml + writeToDivHtml + footTemplateHtml); 
		}
	}
	
	function buildTemplateItem(pageTitle, pageId, itemIndex, templateStr, jsonData)
	{
		//if the specified page has not already been created
		if (document.getElementById(pageId) == undefined)
		{
			//add the page to the document
			addPageDiv(pageTitle, pageId);
		}
		
		var writeToDivId = getPageQual('pageContent') + pageId;
		var writeToDivElem = $('#' + writeToDivId);
		var newItemTemplateHtml = templateStr;
		
		//if there is an existing element div to write to
		if (writeToDivElem.length > 0)
		{
			var openTag = getTag("[");
			var closeTag = getTag("]");
			
			//PAGE ID TOKEN
			
			var tokenKey = openTag + "pageId" + closeTag;
			var tokenVal = pageId;
						
			//replace token instance(s) with actual values
			newItemTemplateHtml = replaceAllOfGivenChar(newItemTemplateHtml, tokenKey, tokenVal);	
			
			//TEMPLATE ITEM ID TOKEN
			
			tokenKey = openTag + "itemId" + closeTag;
			var templateItemId = getCompositeFeedId(pageId, "item", itemIndex);
			tokenVal = templateItemId;
			
			//replace token instance(s) with actual values
			newItemTemplateHtml = replaceAllOfGivenChar(newItemTemplateHtml, tokenKey, tokenVal);
			
			//SUB PAGE ID TOKEN
			
			tokenKey = openTag + "subPageId" + closeTag;
			var subPageId = getCompositeFeedId(pageId, "sub", itemIndex);
			tokenVal = subPageId;
						
			//replace token instance(s) with actual values
			newItemTemplateHtml = replaceAllOfGivenChar(newItemTemplateHtml, tokenKey, tokenVal);
			
			//ALL OTHER TOKENS FROM THE JSON DATA
			
			//replace all of the json tokens in the template with the json values
			newItemTemplateHtml = getReplacedJsonTokenStr(newItemTemplateHtml, jsonData);
			
			//HTML < > CHARACTERS
			newItemTemplateHtml = getReplacedHtmlChars(newItemTemplateHtml);
			
			//REMOVE TOKENS THAT DIDN'T GET A REPLACEMENT VALUE
			newItemTemplateHtml = removeTokensWithoutReplacedValues(newItemTemplateHtml);
			
			//DATE FORMATTING COMMANDS
			newItemTemplateHtml = getReplacedDateFormat(newItemTemplateHtml);
			
			//EVALUATE CONDITIONAL CONTENT
			newItemTemplateHtml = getReplacedIfCondition(newItemTemplateHtml);
			
			//PERFORM REPLACE ON SPECIFIED EXTERNAL IMAGE PATHS
			//newItemTemplateHtml = getReplacedExternalImageUrls(newItemTemplateHtml);
			
			//if this template item already exists (is being rebuilt)
			var templateItemElem = writeToDivElem.find('#' + templateItemId);
			var writeToDivHtml = "";
			if (templateItemElem.length > 0)
			{
				templateItemElem.remove(); //remove the previous template item
				
				writeToDivHtml = writeToDivElem.html(); //get the remaining html
				writeToDivElem.html(writeToDivHtml + newItemTemplateHtml); //append the new template item html to the div
			}
			else //this is a new template item (not replacing an existing one)
			{
				writeToDivHtml = writeToDivElem.html(); //get the current html
				writeToDivElem.html(writeToDivHtml + newItemTemplateHtml); //append the new template item html to the div
			}
		}
		
		return newItemTemplateHtml;
	}
	
	function removeTokensWithoutReplacedValues(theStr)
	{
		var openTag = getTag("[");
		var closeTag = getTag("]");
		
		//while the open token tag remains in the string
		while (theStr.indexOf(openTag) != -1)
		{
			//get the next token key
			var tokenKey = getSubStrChunk(theStr, openTag, closeTag);
			
			//if the token key doesn't contain a close tag
			if (tokenKey.indexOf(closeTag) == -1)
			{
				//cut the token key off at the next space
				tokenKey = getSubStrChunk(tokenKey, openTag, " ");				
			}

			//remove the token key from the string
			theStr = replaceAllOfGivenChar(theStr, tokenKey, "");
		}
		
		return theStr;
	}
	
	function evalIfCondition(conditionStr)
	{
		var isTrue = false;
		conditionStr = getTrimStr(conditionStr);
		
		//if there is a condition string
		if (conditionStr.length > 0)
		{
			var subConditionsArray = conditionStr.split("<and>");
			
			//if there is more than one and condition
			if (subConditionsArray.length > 1)
			{
				//for each and condition
				for (var m = 0; m < subConditionsArray.length; m++)
				{
					//recursively evaluate each condition
					isTrue = evalIfCondition(subConditionsArray[m]);
					
					//if one of the and conditions is false
					if (!isTrue)
					{
						//force the loop to end
						m = subConditionsArray.length - 1;
					}
				}
			}
			else //no multiple and conditions
			{
				subConditionsArray = conditionStr.split("<or>");
				
				//if there is more than one or condition
				if (subConditionsArray.length > 1)
				{
					//for each or condition
					for (var r = 0; r < subConditionsArray.length; r++)
					{
						//recursively evaluate each condition
						isTrue = evalIfCondition(subConditionsArray[r]);
						
						//if one of the or conditions is true
						if (isTrue)
						{
							//force the loop to end
							r = subConditionsArray.length - 1;
						}
					}
				}
				else
				{
					//if the condition contains <=>
					if (conditionStr.indexOf("<=>") != -1)
					{
						var equalValsArray = conditionStr.split("<=>");
						
						//if the first two values are equal
						var val1 = equalValsArray[0];
						val1 = getTrimStr(val1);
						var val2 = equalValsArray[1];
						val2 = getTrimStr(val2);
						if (val1 == val2) {isTrue = true;}
					}
					else
					{
						//if the condition contains <!=>
						if (conditionStr.indexOf("<!=>") != -1)
						{
							var notEqualValsArray = conditionStr.split("<!=>");
							
							//if the first two values are equal
							var val1 = notEqualValsArray[0];
							val1 = getTrimStr(val1);
							var val2 = notEqualValsArray[1];
							val2 = getTrimStr(val2);
							if (val1 != val2) {isTrue = true;}
						}
						else
						{
							isTrue = true;
						}
					}
				}
			}
		}
		
		return isTrue;
	}
	
	function getReplacedIfCondition(theStr)
	{
		var newStr = theStr;
		var openTag = "IF("
		var closeTag = ")END";
		
		//if the start of a date format method is in the template
		while (newStr.indexOf(openTag) != -1)
		{
			//get the if condition string
			var fullConditionStr = getSubStrChunk(newStr, openTag, closeTag);
			
			//strip off open and close tags
			var conditionStr = fullConditionStr.replace(openTag, "");
			conditionStr = conditionStr.replace(closeTag, "");
			
			var paramsArray = conditionStr.split("\\");
			
			var thenStr;
			var elseStr;
			var conditionEval = false;
			
			//for each of the params
			for (var p = 0; p < paramsArray.length; p++)
			{				
				switch (p)
				{
					case 0: //the condition
						conditionStr = paramsArray[p];
						break;
					case 1: //then, if condition true
						thenStr = paramsArray[p];
						thenStr = getTrimStr(thenStr);
						break;
					case 2: //else, if condition not true
						elseStr = paramsArray[p];
						elseStr = getTrimStr(elseStr);
						break;
					default:
						break;
				}
			}
			
			//evaluate the condition for true or false
			conditionEval = evalIfCondition(conditionStr);
			
			//if condition is true
			if (conditionEval)
			{
				//if there is a then
				if (thenStr != undefined && thenStr.length > 0)
				{
					//replace the full if statement with the "then" output
					newStr = newStr.replace(fullConditionStr, thenStr);
				}
				else //no then statment
				{
					var noCondOperators = false;
					
					//check there are condition operators <and>, <or>, <=>, <!=>
					if (conditionStr.indexOf("<!=>") == -1)
					{
						if (conditionStr.indexOf("<=>") == -1)
						{
							if (conditionStr.indexOf("<and>") == -1)
							{
								if (conditionStr.indexOf("<or>") == -1)
								{
									noCondOperators = true;
								}
							}
						}
					}
					
					//if there are no condition operators <and>, <or>, <=>, <!=>
					if (noCondOperators)
					{
						//replace the full if statement with the condition value
						newStr = newStr.replace(fullConditionStr, conditionStr);
					}
					else
					{
						//remove the full if statement
						newStr = newStr.replace(fullConditionStr, "");
					}
				}
			}
			else //condition is false
			{
				//if there is an else
				if (elseStr != undefined && elseStr.length > 0)
				{
					//alert(elseStr);
					//replace the full if statement with the "then" output
					newStr = newStr.replace(fullConditionStr, elseStr);
				}
				else //no else statment
				{
					//remove the full if statement
					newStr = newStr.replace(fullConditionStr, "");
				}
			}
			
			//reset the values for the next if statement to evaluate
			thenStr = "";
			elseStr = "";
			conditionEval = false;
			
		}
		
		return newStr;
	}
	
	function getReplacedDateFormat(theStr, desiredDateFormat)
	{
		var dateSubStr = theStr;
		var newStr = theStr;
		var openTag = "DATE("
		var closeTag = ")END";
		
		//if the start of a date format method is in the template
		while (newStr.indexOf(openTag) != -1)
		{
			var formattedDateValue = "";
			
			//remove text before the date format method
			dateSubStr = dateSubStr.substring(dateSubStr.indexOf(openTag));
			
			//if the end of the format method is specified
			if (dateSubStr.indexOf(closeTag) != -1)
			{
				//remove the text after the date format method
				dateSubStr = dateSubStr.substring(0, dateSubStr.indexOf(closeTag) + closeTag.length);
				
				//strip off beginning and end DATE method tags
				var newDateSubStr = dateSubStr;
				newDateSubStr = newDateSubStr.replace(openTag, "");
				newDateSubStr = newDateSubStr.replace(closeTag, "");
				
				//get an array of date value and formatting parameters
				var dateParamArray =  newDateSubStr.split("\\");
				
				var dateStr = getTrimStr(dateParamArray[0]);
				var dateFormat = getTrimStr(dateParamArray[1]);
				var desiredDateFormat = getTrimStr(getFeedDateFormat('default'));
				var dateFormatObj = {};
				
				//if only the current date value and it's format are specified
				if (dateParamArray.length == 2)
				{					
					dateFormatObj = getDateFormat(dateStr, dateFormat, desiredDateFormat);
					formattedDateValue = dateFormatObj.str;
				}
				else if (dateParamArray.length == 3) //if the current date value, it's format, and a desired format is specified
				{
					desiredDateFormat = getTrimStr(dateParamArray[2]);
					dateFormatObj = getDateFormat(dateStr, dateFormat, desiredDateFormat);
					formattedDateValue = dateFormatObj.str;
				}
			}
			else //no close tag
			{
				dateSubStr = openTag;
			}
			
			//delete unset times that appear as 12 midnight by default (yeah, you know who I'm talking about sports feed)
			formattedDateValue = replaceAllOfGivenChar(formattedDateValue, " 12:00 midnight", "");
			
			//replace the date format code with an actual value
			newStr = newStr.replace(dateSubStr, formattedDateValue);
		}
		
		return newStr;
	}
	
	function getReplacedHtmlChars(theStr)
	{
		// < AND >
		
		//replace lt and gt tokens
		theStr = replaceAllOfGivenChar(theStr, "[>]", "*gt***");
		theStr = replaceAllOfGivenChar(theStr, "[<]", "*lt***");
		theStr = replaceAllOfGivenChar(theStr, "[&gt;]", "*gt***");
		theStr = replaceAllOfGivenChar(theStr, "[&lt;]", "*lt***");
		
		//replace gt and lt with < and >
		theStr = replaceAllOfGivenChar(theStr, "&gt;", ">");
		theStr = replaceAllOfGivenChar(theStr, "&lt;", "<");
		
		//restore the token values
		theStr = replaceAllOfGivenChar(theStr, "*gt***", "&gt;");
		theStr = replaceAllOfGivenChar(theStr, "*lt***", "&lt;");
		
		theStr = replaceAllOfGivenChar(theStr, "&amp;quot;", "&quot;");
		theStr = replaceAllOfGivenChar(theStr, "&quot;", "\"");
		theStr = replaceAllOfGivenChar(theStr, "&amp;ldquo;", "&ldquo;");
		theStr = replaceAllOfGivenChar(theStr, "&amp;rdquo;", "&rdquo;");
		theStr = replaceAllOfGivenChar(theStr, "&amp;rsquo;", "&rsquo;");
		theStr = replaceAllOfGivenChar(theStr, "&amp;nbsp;", "&nbsp;");
		theStr = replaceAllOfGivenChar(theStr, "&amp;bull;", "&bull;");
		theStr = replaceAllOfGivenChar(theStr, "&amp;ndash;", "&ndash;");
		
		return theStr;
	}
	
	function getReplacedJsonTokenStr(theStr, jsonData)
	{
		var newStr = theStr;
		var openTag = getTag("[");
		var closeTag = getTag("]");
		
		//if the token open tag is in the string
		if (newStr.indexOf(openTag) != -1)
		{
			//if the token close tag is in the string
			if (newStr.indexOf(openTag) != -1)
			{
				//for each json parameter in the json data set
				for (var key in jsonData) 
				{
					//if key is an actual property of an object, (not from the prototype)
					if (jsonData.hasOwnProperty(key)) 
					{					
						//if this parameter is not an array of values like "entries" or "categories"
						if (Object.prototype.toString.call(jsonData[key]) != '[object Array]')
						{
							var tokenKey = openTag + key + closeTag;
							var tokenVal = jsonData[key];
							
							tokenVal = getTrimStr(tokenVal);
								
							//replace token instance(s) with actual values
							newStr = replaceAllOfGivenChar(newStr, tokenKey, tokenVal);	
						}
					}
				}
			}
		}
		
		return newStr;
	}
	
	function removeSubPageLink(pageId, itemIndex)
	{
		var subPageId = getCompositeFeedId(pageId, "sub", itemIndex);
		
		//get the clickable link element with this href value
		var xclickElem = $('a[href="#' + subPageId + '"]');
		
		//remove href attribute
		xclickElem.removeAttr('href');
		
		//remove clickable class
		xclickElem.addClass('disabled');
		
		
		//remove the actual sub page, if it exists
		$('#' + subPageId).remove();
	}
	
//END NEWS

/*START ERROR MSG*/

	function getErrMsgQualifier()
	{
		return '[ERR]: ';
	}
	
	function getSuccessMsgQualifier()
	{
		return '[SUCCESS]: ';
	}
	
	function getAlertMsgQualifier()
	{
		return '[Alert]: ';
	}

	function getLocalStorageErrMsg(errType)
	{
		var errMsg = '';
		
		switch (errType)
		{
			case 'html5-support':
				errMsg = getErrMsgQualifier() + 'HTML5 localStorage NOT supported. Try upgrading browser. \n';
				break;
			case 'quota-exceeded':
				errMsg = getErrMsgQualifier() + 'Local store quota exceeded. \n';
				break;
			case 'set-item':
				errMsg = getErrMsgQualifier() + 'Could not set local store value. \n';
				break;
			case 'get-item':
				errMsg = getErrMsgQualifier() + 'Could not retrieve local store value. \n';
				break;
			case 'remove-item':
				errMsg = getErrMsgQualifier() + 'Could not remove local store value. \n';
				break;
			case 'no-such-key':
				errMsg = getErrMsgQualifier() + 'Make sure the key you are trying to use exists and is spelled correctly. \n';
				break;
			case 'index-not-number':
				errMsg = getErrMsgQualifier() + 'The item index must be an integer. The one provided is not a number. \n';
				break;
			case 'index-too-high':
				errMsg = getErrMsgQualifier() + 'The item index exceeds the number of items in the local storage. \n';
				break;
			case 'index-too-low':
				errMsg = getErrMsgQualifier() + 'The item index must be an integer equal to or greater than 0. \n';
				break;
			case 'unknown':
				errMsg = getErrMsgQualifier() + 'Error unknown. \n';
				break;
			case 'no-such-item':
				errMsg = getAlertMsgQualifier() + 'Item does not exist. \n';
				break;
			default: 
				errMsg = getErrMsgQualifier() + '"' + errType + '" ' + 'is an unkown error type. \n';
				break;
		}	
		
		return errMsg;
	}
	
	function troubleshoot_HTML5Support()
	{
		var errMsg = '';
		
		if (typeof(localStorage) == 'undefined' ) 
		{
			errMsg = getLocalStorageErrMsg('html5-support');
		} 
		
		return errMsg;
	}
	
	//if an error is caught when getting an item stored in the local storage
	function troubleshoot_getLocalStoreItemByKey(e, itemKey)
	{
		var returnValue = getLocalStorageErrMsg('get-item'); //report get error
		returnValue += 'ItemKey = ' + itemKey + ' \n'; //report item key that caused error
		var html5SupportErrMsg = troubleshoot_HTML5Support(); //test if html5 is supported
		
		//if html5 is supported
		if (html5SupportErrMsg.indexOf(getErrMsgQualifier()) == -1)
		{
			//report item key (probably no such key) error
			returnValue += getLocalStorageErrMsg('no-such-key'); 
		}
		else
		{
			returnValue += html5SupportErrMsg;
		}
		
		return returnValue;
	}
	
	//if an error is caught when getting an item stored in the local storage
	function troubleshoot_getLocalStoreItemByIndex(e, itemIndex)
	{
		var returnValue = getLocalStorageErrMsg('get-item'); //report get error
		returnValue += 'ItemIndex = ' + itemIndex + ' \n'; //report item index that caused error
		var html5SupportErrMsg = troubleshoot_HTML5Support(); //test if html5 is supported
		
		//if html5 is supported
		if (html5SupportErrMsg.indexOf(getErrMsgQualifier()) == -1)
		{
			//if the index is a number
			if (!isNaN(itemIndex))
			{
				//if the item index is too high
				if (itemIndex > localStorage.length - 1)
				{
					//report that the given index is too high
					returnValue += getLocalStorageErrMsg('index-too-high');					
				}
				else
				{
					//if the item index is too low
					if (itemIndex < 0)
					{
						returnValue += getLocalStorageErrMsg('index-too-low');	
					}
				}
			}
			else	
			{
				//report that the given index is not a number
				returnValue += getLocalStorageErrMsg('index-not-number');
			}		 
		}
		else
		{
			returnValue += html5SupportErrMsg;
		}
		
		return returnValue;
	}
	
	//if an error is caught when setting an item in local storage
	function troubleshoot_setLocalStoreItem(e, itemKey, itemValue)
	{
		var returnValue = getLocalStorageErrMsg('set-item'); //report set error
		returnValue += 'ItemKey = ' + itemKey + ", " + "ItemValue = " + itemValue + ' \n'; //report item key/value that caused error
		var html5SupportErrMsg = troubleshoot_HTML5Support(); //test if html5 is supported
		
		//if html5 is supported
		if (html5SupportErrMsg.indexOf(getErrMsgQualifier()) == -1)
		{
			//if the local storage quota has been exceeded
			if (e.name == "QUOTA_EXCEEDED_ERR")
			{
				returnValue += getLocalStorageErrMsg('quota-exceeded');
			}
			else
			{
				//unknown error
				returnValue += getLocalStorageErrMsg('unknown');
			}
		}
		else
		{
			returnValue += html5SupportErrMsg;
		}
		
		return returnValue;
	}
	
/*END ERROR MSG*/

/*START GETTERS*/

	function getLocalStoreItem(itemKey)
	{
		var returnValue = '';
		
		try
		{
			returnValue = localStorage.getItem(itemKey);
			
			//if no such item
			if (returnValue == null)
			{
				returnValue = 'Attempt to retrieve value with key = ' + itemKey + ' \n';
				returnValue += getLocalStorageErrMsg('no-such-item');
			}
		}
		catch (e)
		{
			returnValue += troubleshoot_getLocalStoreItemByKey(e, itemKey);
		}
		
		return returnValue;
	}
	
	function getLocalStoreItemByIndex(itemIndex)
	{
		var returnValue = '';
		
		try
		{
			returnValue = localStorage.getItem(localStorage.key(itemIndex));
			
			//if no such item
			if (returnValue == null)
			{
				returnValue = 'Attempt to retrieve value at index = ' + itemIndex + ' \n';
				returnValue += getLocalStorageErrMsg('no-such-item');
			}
		}
		catch (e)
		{
			returnValue += troubleshoot_getLocalStoreItemByIndex(e, itemIndex);
		}
		
		return returnValue;
	}
	
	//get all local store items with a specified key qualifier or get all local items, period if no qualifier is specified.
	function getAllLocalStoreItems(keyQualifier)
	{
		var storeItemsArray = [];
		var checkForKeyQual = false;
		
		//if get only local store items with a specified key qualifier
		if (keyQualifier != undefined && keyQualifier.length > 0)
		{
			checkForKeyQual = true;
		}
		
		//for each local store item
		var itemKey = ""; 
		for (var i = 0; i < localStorage.length; i++)
		{
			itemKey = localStorage.key(i);
				
			//if not checking key qualifiers or this item key has the key qualifier in it
			if (!checkForKeyQual || itemKey.indexOf(keyQualifier) != -1)
			{
				//add the local store item to the array
				storeItemsArray.push
				(
				 	{
						"key":itemKey,
						"value":localStorage.getItem(itemKey)
					}
				);
			}
		}
		
		return storeItemsArray;
	}
	
/*END GETTERS*/
	
/*START SETTERS*/

	function setLocalStoreItem(keyQualifier, itemKey, itemValue)
	{
		var returnValue = '';
		
		try
		{
			localStorage.setItem(itemKey, itemValue); //saves to the database, key/value
			
			returnValue += getSuccessMsgQualifier() + 'Saved (itemKey,itemValue) = (' + itemKey + ',' + itemValue + ') \n';
		}
		catch (e)
		{
			returnValue += troubleshoot_setLocalStoreItem(e, itemKey, itemValue);
			
			//RETRY
			
			//if the error message indicates that the quota has been exceeded
			if (returnValue.indexOf(getLocalStorageErrMsg('quota-exceeded')) != -1)
			{
				//remove the earliest stored item to make room
				returnValue += removeEarliestLocalStoreItem(keyQualifier);
				
				try
				{
					//try setting the new item again
					localStorage.setItem(itemKey, itemValue); //saves to the database, key/value
					
					//success message
					returnValue += getSuccessMsgQualifier() + 'Saved (itemKey,itemValue) = (' + itemKey + ',' + itemValue + ') \n';
				}
				catch (e2)
				{
					//unknown error
					returnValue += getLocalStorageErrMsg('unknown');
				}
			}
		}
		
		return returnValue;
	}

/*END SETTERS*/
	
/*START REMOVERS*/

	function removeLocalStoreItem(itemKey)
	{
		var returnValue = '';
		
		//get the item by key to see if it can be retrieved with this key
		returnValue = getLocalStoreItem(itemKey);
		
		//if no error in getting the item
		if (returnValue.indexOf(getErrMsgQualifier()) == -1)
		{
			try
			{
				returnValue = 'Retrieved item to remove with key = (' + itemKey + '), value = (' + returnValue + ') \n';
				
				//remove item at index
				localStorage.removeItem(itemKey);
				
				//success message
				returnValue += getSuccessMsgQualifier() + 'Item removed. \n';
			}
			catch (e)
			{
				//unknown error
				returnValue += getLocalStorageErrMsg('unknown');
			}
		}
		
		return returnValue;
	}
	
	function removeLocalStoreItemByIndex(itemIndex)
	{
		var returnValue = '';
		
		//get the item by index to see if it can be retrieved by this index
		returnValue += getLocalStoreItemByIndex(itemIndex);
		
		//if no error in getting the item
		if (returnValue.indexOf(getErrMsgQualifier()) == -1)
		{
			try
			{
				returnValue = 'Retrieved item to remove at index = (' + itemIndex + '), value = (' + returnValue + ') \n';
				
				//remove item at index
				localStorage.removeItem(localStorage.key(itemIndex));
				
				//success message
				returnValue += getSuccessMsgQualifier() + 'Item removed. \n';
			}
			catch (e)
			{
				//unknown error
				returnValue += getLocalStorageErrMsg('unknown');
			}
		}
		
		return returnValue;
	}
	
	function removeAllLocalStoreItems()
	{
		var returnValue = "";
		
		var prevCount = localStorage.length;
		
		localStorage.clear();
		
		var resultCount = localStorage.length;
		
		returnValue += (prevCount - resultCount) + " local storage items cleared. " + resultCount + " remain.";
		
		return returnValue;
	}
	
	function removeEarliestLocalStoreItem(keyQualifier)
	{
		var returnValue = '';
		var itemIndex = 0;
		
		//if the key qualifier is not blank
		if (keyQualifier.length > 0)
		{
			//get the index of the first item with the given key qualifier
			var itemKey;
			for (var i = 0; i < localStorage.length; i++)
			{
				itemKey = localStorage.key(i);
				
				//if this item key has the key qualifier in it
				if (itemKey.indexOf(keyQualifier) != -1)
				{
					itemIndex = i; //save item index
					i = localStorage.length - 1; //force loop to end
				}
			}
		}
		
		try
		{
			//remove the earliest local store item
			returnValue += removeLocalStoreItemByIndex(itemIndex);
			
			//success message
			returnValue += getSuccessMsgQualifier() + 'Removed earliest item at index, ' + itemIndex;
		}
		catch (e)
		{
			returnValue += getErrMsgQualifier() + 'Failed to remove earliest stored item. \n';
		}
		
		return returnValue;
	}
	
	function removeLatestLocalStoreItem(keyQualifier)
	{
		var returnValue = '';
		var itemIndex = localStorage.length - 1;
		
		//if the key qualifier is not blank
		if (keyQualifier.length > 0)
		{
			//get the index of the last item with the given key qualifier
			var itemKey;
			for (var i = itemIndex; i > -1; i--)
			{
				itemKey = localStorage.key(i);
				
				//if this item key has the key qualifier in it
				if (itemKey.indexOf(keyQualifier) != -1)
				{
					itemIndex = i; //save item index
					i = 0; //force loop to end
				}
			}
		}
		
		try
		{
			//remove the latest local store item
			returnValue += removeLocalStoreItemByIndex(itemIndex);
			
			//success message
			returnValue += getSuccessMsgQualifier() + 'Removed latest item at index, ' + itemIndex;
		}
		catch (e)
		{
			returnValue += getErrMsgQualifier() + 'Failed to remove latest stored item. \n';
		}
		
		return returnValue;
	}

/*END REMOVERS*/




//http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
function getStoredFeedJSON(feedTypeList)
{
	var feedJSONArray = [];
	var feedTypes = feedTypeList.split(";");
	
	for (var f = 0; f < feedTypes.length; f++)
	{
		var feedType = feedTypes[f];
		
		if (feedType != "")
		{	
			var feedJSONStr = getLocalStoreItem(getFeedKey(feedType));
			var feedJSON = {};
			
			//if item was found
			if (feedJSONStr.indexOf(getLocalStorageErrMsg('no-such-item')) == -1)
			{				
				//if this item is apparently in json format
				if (feedJSONStr[0] == "{")
				{					
					feedJSON = JSON.parse(feedJSONStr);
					feedJSONArray.push(feedJSON);
				}
			}
			else //not stored in local storage
			{		
				//get the default static json
				feedJSON = getStaticFallbackJSON(feedType);
				feedJSONArray.push(feedJSON);
			}
		}
	}
				
	return feedJSONArray;
}

var mNumSaved;
var mConnectionAttempts;
var mMaxRetries;
function saveDownloadedFeeds(maxRetries)
{	
	if (maxRetries == undefined)
	{
		maxRetries = 10;
		mMaxRetries = maxRetries;
	}

	try
	{
		if (mNumSaved == undefined)
		{
			mNumSaved = 0;
		}
		
		if (mConnectionAttempts == undefined)
		{
			mConnectionAttempts = 0;
		}
		
		mNumSaved += saveNewFeedData();
		
		mConnectionAttempts++;
		
		//build html on screen
		initialize();
		
		showSaveDownloadMsg(mMaxRetries, mConnectionAttempts, mNumSaved);
		
		//destroy the sync flag
		removeLocalStoreItem(getFeedKey('sync'));
	}
	catch (err) //external data was not added
	{
		//if there are still retries left and the user hit the sync button
		var windowHref = window.location.href;
		//if (maxRetries > 0 && windowHref.indexOf('nocache') != -1)
		if (maxRetries > 0 && doAddExternalScript())
		{
			mConnectionAttempts++;
			
			var syncProgressMsg = '';
			
			if (mConnectionAttempts < 3)
			{
				syncProgressMsg = 'Reconnect...';
			}
			else if (mConnectionAttempts < 6)
			{
				syncProgressMsg = 'Retry...';
			}
			else if (mConnectionAttempts < 9)
			{
				syncProgressMsg = 'Reconnect...';
			}
			else
			{
				syncProgressMsg = 'Retry...';
			}
			
			changeSyncProgressMsg(syncProgressMsg);
			
			setTimeout(function()
			{
				saveDownloadedFeeds(maxRetries - 1, false);

			}, 3000);
		}
		else //no more retries left
		{
			//build html on screen
			initialize();
			
			showSaveDownloadMsg(mMaxRetries, mConnectionAttempts, mNumSaved);
		}
	}
}

function changeSyncProgressMsg(newHeading)
{
	var syncHeading = $('#sync_wrap .text_wrap .heading');
	var countWrap = syncHeading.find('.count');
	
	//if there is no count element
	if (countWrap.length < 1)
	{
		//add the count element
		syncHeading.append('<span class="count">0</span>');
		countWrap = syncHeading.find('.count');
	}
	
	//increment the count
	var countNumStr = countWrap.text();
	var countNum = parseInt(countNumStr);
	countNum++;
	countWrap.text(countNum + '');
	
	//if a new heading was requested
	if (newHeading != undefined && newHeading != '')
	{
		//switch out the heading
		syncHeading.html(newHeading + ' ');
		syncHeading.append(countWrap);
	}
	
	/*//build the cancel button
	var cancelBtn = $('#sync_wrap .text_wrap .btn_cancel');
	
	if (cancelBtn.length < 1)
	{
		$('#sync_wrap .text_wrap').append('<a class="btn_cancel" href="page1.html">Cancel</a>');
		cancelBtn = $('#sync_wrap .text_wrap .btn_cancel');
		cancelBtn.click(function()
		{
			$(this).text('Cancelling...');
		});
	}*/
}

function showSaveDownloadMsg(maxRetries, numAttempts, numSaved)
{
	//if the page url contains 'nocache' (the user hit the sync button)
	var windowHref = window.location.href;
	//if (windowHref.indexOf('nocache') != -1)
	if (doAddExternalScript())
	{
		//if anything was synced 
		if (numSaved > 0)
		{
			//start building success message
			var successMsg = '(' + numSaved + ') categories successfully synced';
			
			//if there was more than one download attempt
			if (numAttempts > 1)
			{
				//add number of attempts to the end of the success message
				successMsg += ' on retry #' + numAttempts;
			}

			successMsg += '.';
			
			//show success message
			alert(successMsg);
		}
		else //no syncing success. Fail.
		{
			//if all of the download attempts have been exhausted
			if (numAttempts >= maxRetries && maxRetries > 1)
			{
				//start building death message
				var deathMsg = 'Please make sure you are connected to the internet. ';
				deathMsg += 'Could not connect after ' + numAttempts + ' attempts.';
				
				//show death message. goodbye
				alert(deathMsg);
			}	
			else
			{
				var completeMsg = 'Sync completed successfully';
				
				//if there was more than one download attempt
				if (numAttempts > 1)
				{
					//add number of attempts to the end of the success message
					completeMsg += ' on retry #' + numAttempts;
				}
				
				completeMsg += '.';
			
				//probably nothing new to sync with
				alert(completeMsg);
			}
		}
	}
}

function saveNewFeedData()
{
	//get all of the feed keys
	var feedKeysArray = getFeedKeysArray();
	
	var numSaved = 0;
	
	//for each feed key
	for (var i = 0; i < feedKeysArray.length; i++)
	{
		//get a feed key from the array
		var feedKey = feedKeysArray[i];
		
		//if not the videos feed (videos are handled differently because they are not stored locally)
		if (feedKey != "videos")
		{		
			//get the newly downloaded feed data for this feed key, this will cause an error if not connected to the internet
			var feedJSONStr = getDownloadedFeedStr(feedKey);
			
			//make sure the feed key qualifier is added to the beginning of the key
			feedKey = getFeedKey(feedKey);
			
			//if the imported download feed function returns any data for this key
			if (feedJSONStr != "{}")
			{
				//fix some html char issues
				feedJSONStr = replaceAllOfGivenChar(feedJSONStr, "&amp;amp;", "&amp;");
				feedJSONStr = replaceAllOfGivenChar(feedJSONStr, "&amp;quot;", "&quot;");
				feedJSONStr = replaceAllOfGivenChar(feedJSONStr, "&amp;ldquo;", "&ldquo;");
				feedJSONStr = replaceAllOfGivenChar(feedJSONStr, "&amp;rdquo;", "&rdquo;");
				feedJSONStr = replaceAllOfGivenChar(feedJSONStr, "&amp;rsquo;", "&rsquo;");
				feedJSONStr = replaceAllOfGivenChar(feedJSONStr, "&amp;nbsp;", "&nbsp;");
				feedJSONStr = replaceAllOfGivenChar(feedJSONStr, "&amp;bull;", "&bull;");
				feedJSONStr = replaceAllOfGivenChar(feedJSONStr, "&amp;ndash;", "&ndash;");
				feedJSONStr = replaceAllOfGivenChar(feedJSONStr, "&amp;copy;", "&copy;");
				feedJSONStr = replaceAllOfGivenChar(feedJSONStr, "&amp;reg;", "&reg;");
				feedJSONStr = replaceAllOfGivenChar(feedJSONStr, "&amp;iexcl;", "&iexcl;");
				feedJSONStr = replaceAllOfGivenChar(feedJSONStr, "&amp;iquest;", "&iquest;");
				feedJSONStr = replaceAllOfGivenChar(feedJSONStr, "&amp;deg;", "&deg;");
				feedJSONStr = replaceAllOfGivenChar(feedJSONStr, "&amp;lt;", "&lt;");
				feedJSONStr = replaceAllOfGivenChar(feedJSONStr, "&amp;gt;", "&gt;");
							
				//replace all external image urls that have defined local substitutes
				feedJSONStr = getReplacedExternalImageUrls(feedJSONStr);
				
				//get the previous feed json
				var prevFeedJSONStr = getLocalStoreItem(feedKey);
				
				var sameDataNoSave = false;
		
				//if there is a previously saved feed
				if (prevFeedJSONStr.indexOf(getLocalStorageErrMsg('no-such-item')) == -1)
				{
					//if the previously saved feed is the same length as the new feed
					if (prevFeedJSONStr.length == feedJSONStr.length)
					{
						//if the two data sets are the same
						if (prevFeedJSONStr == feedJSONStr)
						{
							//same data
							sameDataNoSave = true;
						}
					}
				}
					
				//if not already saved
				if (!sameDataNoSave)
				{
					//params: keyQualifier, itemKey, itemValue
					var dataSaveMsg = setLocalStoreItem("", feedKey, feedJSONStr);
								
					//if a successful save message was returned
					if (dataSaveMsg.indexOf(getSuccessMsgQualifier()) != -1)
					{
						numSaved++;
					}
					else
					{
						//alert('save failed');
					}	
				}
				else
				{
					//alert('same data. no need to save.');
				}
			}
			else
			{
				//alert("No json could be parsed from the feed");
			}
		}
		else //this is the videos feed key. Videos are not stored locally
		{
			//load the videos that are just in memory, but not saved locally
			//initFeed("videos");
		}
	}
	
	return numSaved;
}

function getDownloadedFeedStr(feedKey)
{
	var returnStr = '{}';
	
	//the getDownloadedJson is an external function from the external allJson.js file 
	//if not connected to the internet, this function will cause an error
	var jsonVal = getDownloadedJson(feedKey);
	
	//get the string version of the json
	returnStr = JSON.stringify(jsonVal);
	
	return returnStr;
}
	
function getReplacedExternalImageUrls(theStr)
{
	var replaceStrJSON = getReplaceStrsJSON();
		
	//for each string to replace
	for (var r = 0; r < replaceStrJSON.replaceImgs.length; r++)
	{
		//get the src to find / replace
		var srcMatch = replaceStrJSON.replaceImgs[r].matchStr;
		var srcReplace = replaceStrJSON.replaceImgs[r].replaceStr;
			
		//replace all of the given image sources
		theStr = replaceAllOfGivenChar(theStr, srcMatch, srcReplace);
	}
		
	return theStr;
}

//as long as there are no attributes, the xml node object will be returned (uses native javascript html element creation)
function getHtmlNodesFromXmlStr(theStr, rootNodeName)
{
	if (rootNodeName == undefined && rootNodeName.length > 0)
	{
		rootNodeName = "xml-nodes";
	}
	
	var xmlNodes = document.createElement(rootNodeName);
	var newStr = theStr;
	
	while (newStr.indexOf("<") != -1)
	{
		var xmlTagStr = getSubStrChunk(newStr, "<", ">");
		
		//if there is a complete xml tag
		if (xmlTagStr.indexOf(">") != -1)
		{
			var xmlTagNameStr = xmlTagStr.replace("<","");
			xmlTagNameStr = xmlTagNameStr.replace(">","");
			
			//remove the tag so that the element value is at the front
			newStr = newStr.replace(xmlTagStr, "");
			
			//if the new string contains a close tag
			if (newStr.indexOf("</" + xmlTagNameStr) != -1)
			{
				//get the closing tag
				var xmlCloseTagStr = getSubStrChunk(newStr, "</" + xmlTagNameStr, ">");
				
				//get the value between the opening and closign tags
				var xmlElemValStr = newStr.substring(0, newStr.indexOf(xmlCloseTagStr));
					
				//if the xml element value is a string of child xml nodes
				if (xmlElemValStr.indexOf("<") != -1 && xmlElemValStr.indexOf(">") != -1)
				{
					//get the inner xml nodes recursively
					var innerXmlNodes = getHtmlNodesFromXmlStr(xmlElemValStr, xmlTagNameStr);
					xmlNodes.appendChild(innerXmlNodes);
				}
				else //else, this is an inner text of a node, node inner child nodes
				{
					var xmlNode = document.createElement(xmlTagNameStr);
					xmlElemValStr = getTrimStr(xmlElemValStr);
					xmlNode.innerHTML = xmlElemValStr;
						
					xmlNodes.appendChild(xmlNode);			
				}
				
				//remove the string before and including the closing tag
				newStr = newStr.substring(newStr.indexOf(xmlCloseTagStr) + xmlCloseTagStr.length);
			}
		}
		else
		{
			//remove malformed xml tag without a closing >, example: <unclosed
			newStr = newStr.replace(xmlTagStr, "");
		}
	}
	
	return xmlNodes;
}

function getJsonStrFromXml(feedFormatJson, xmlDoc)
{
	var returnJsonStr = "{";
	
	//for each json node on this level
	for (var j = 0; j < feedFormatJson.length; j++)
	{
		//select the specified xml nodes
		var selector = feedFormatJson[j].jQuerySelector;
		var docObjType = Object.prototype.toString.call(xmlDoc);
		var xmlNodes;
		/*if (docObjType == "[object HTMLUnknownElement]")
		{
			xmlNodes = $(xmlDoc).find(selector);
		}
		else
		{*/
			//if not selecting the root of the xmlDoc
			if (selector != "/")
			{
				//select some child node(s)
				xmlNodes = $(xmlDoc).find(selector);
			}
			else
			{
				//select the root of the document
				xmlNodes = $(xmlDoc);
			}
		//}
		var isParentNode = (feedFormatJson[j].nodes != undefined && feedFormatJson[j].nodes.length > 0);

		//for each specified xml node
		for (var x = 0; x < xmlNodes.length; x++)
		{		
			//if this is not a parent xml node
			if (!isParentNode)
			{
				var xmlNodeVal = "";
					
				//if slecting the attribute's value
				if (feedFormatJson[j].selectAttr != undefined && feedFormatJson[j].selectAttr.length > 0)
				{
					//get the attribute value
					xmlNodeVal = $(xmlNodes[x]).attr(feedFormatJson[j].selectAttr);
				}
				else //must be selecting the node's text
				{
					//get the text value
					xmlNodeVal = $(xmlNodes[x]).text();					
				}
							
				//if an xml node value was retrieved
				if (xmlNodeVal != "" && xmlNodeVal != undefined)
				{
					//add the jason label and value to the string
					returnJsonStr += "\"" + feedFormatJson[j].jsonLabel + "\":\"" + xmlNodeVal + "\"";
				}
			}
			else //this xml node has child nodes to include
			{			
				//if this is the first node
				if (x == 0)
				{
					//add the array name field
					returnJsonStr += "\"" + feedFormatJson[j].jsonLabel + "\":[";
				}
				
				//build the child node recursively
				returnJsonStr += getJsonStrFromXml(feedFormatJson[j].nodes, xmlNodes[x]);
				
				//if this is the last node
				if (x == xmlNodes.length - 1)
				{
					//end the array bracket around the child nodes
					returnJsonStr += "]";
				}
			}
		}	
	}
	
	//add commas
	returnJsonStr = replaceAllOfGivenChar(returnJsonStr, "}{", "},{");
	returnJsonStr = replaceAllOfGivenChar(returnJsonStr, "}]\"", "}],\"");
	returnJsonStr = replaceAllOfGivenChar(returnJsonStr, "\"\"", "\",\"");

	returnJsonStr += "}";
	return returnJsonStr;
}

function getUnCachedFeedUrl(feedURL)
{
	//build unique query string param
	var uniqueQsParam = "nocache=";
	uniqueQsParam += new Date().getTime();
		
	//if there is already a question mark in the feed url
	if (feedURL.indexOf("?") != -1)
	{
		//if the question mark is not the last character
		if (feedURL.length != (feedURL.indexOf("?") + 1))
		{
			feedURL += '&' + uniqueQsParam;
		}
		else //question mark is the last character
		{
			feedURL += uniqueQsParam;
		}
	}
	else //no query string in the url
	{
		feedURL += "?" + uniqueQsParam;
	}
	
	return feedURL;
}

function removeJsonStrChunk(jsonStr, chunkStartKey, chunkEndKey)
{
	//trim the json string
	jsonStr = getTrimStr(jsonStr);
	
	//if the jsonStr contains the appropriate begin char
	if (jsonStr.indexOf("{") == 0)
	{
		var correctJsonFormat = true;
		
		try
		{
			//try to parse the json string into a json object
			jsonObj = JSON.parse(jsonStr);
		}
		catch (err)
		{
			//error trying to parse incorrect json format
			correctJsonFormat = false;
		}
		
		//if the json string is in correct json format
		if (correctJsonFormat)
		{
			if (jsonObj[chunkStartKey] != undefined)
			{
				if (jsonObj[chunkEndKey] != undefined)
				{
					if (chunkStartKey != chunkEndKey)
					{
						//for each key in the json object
						var isInChunk = false;
						for (var key in jsonObj)
						{
							if (isInChunk)
							{
								//remove the json field
								delete jsonObj[key];
							}
							
							if (key == chunkStartKey)
							{
								isInChunk = true;
								
								//remove the json field
								delete jsonObj[key];
							}
							else
							{
								if (isInChunk)
								{
									if (key == chunkEndKey)
									{
										isInChunk = false;
										
										//force the loop to end
										break;
									}
								}
							}
						}
						
						jsonStr = JSON.stringify(jsonObj);
					}
				}
			}
		}
	}
	
	return jsonStr;
}

function setFirstValFromJsonStr(jsonStr, valKey, setNewVal)
{
	var currentVal = getFirstValFromJsonStr(jsonStr, valKey);
	
	valKey = "\"" + valKey + "\":";
	
	//if the value key is in the json string
	if (jsonStr.indexOf(valKey) != -1)
	{
		//if the current value was found
		if (currentVal != "")
		{
			//remove text before the value key
			var currentKeyAndVal = jsonStr.substring(jsonStr.indexOf(valKey));
			
			//if the current value is still found in the string
			if (currentKeyAndVal.indexOf(currentVal) != -1)
			{
				//remove text after the value
				currentKeyAndVal = currentKeyAndVal.substring(0, currentKeyAndVal.indexOf(currentVal) + currentVal.length);
				
				var newKeyAndVal = valKey + setNewVal;
				
				//replace the old key val pair with the new pair value
				jsonStr = jsonStr.replace(currentKeyAndVal, newKeyAndVal);
			}
		}
	}
	
	return jsonStr;
}

function getFirstValFromJsonStr(jsonStr, valKey)
{
	var returnStr = "";
	
	if (valKey == undefined)
	{
		valKey = "\"publishedDate\":"; //default
	}
	else
	{
		valKey = "\"" + valKey + "\":"; 
	}
	
	//if this key is in the json string
	if (jsonStr.indexOf(valKey) != -1)
	{
		var endChar = "\",";
		returnStr = jsonStr;
		
		//remove everything before and including the value key
		returnStr = returnStr.substring(returnStr.indexOf(valKey) + valKey.length);
		returnStr = getTrimStr(returnStr);
		
		//if the value contains }
		if (returnStr.indexOf("}") != -1)
		{
			//remove leading "
			returnStr = returnStr.substring(0, returnStr.indexOf("}"));
		}
		
		//if the value begins with a "
		if (returnStr.indexOf("\"") == 0)
		{
			//remove leading "
			returnStr = returnStr.substring(1);
			
			//if the value still contains ",
			if (returnStr.indexOf("\",") != -1)
			{
				//remove leading "
				returnStr = returnStr.substring(0, returnStr.indexOf("\","));
			}
		}
		else //probably a number value not surrounded by ""
		{
			//if the value contains ,
			if (returnStr.indexOf(",") != -1)
			{
				//remove leading "
				returnStr = returnStr.substring(0, returnStr.indexOf(","));
			}
		}
	}
	
	return returnStr;
}

//START REMOVE AND REPLACE MANAGERS
function removeAllSpecialChars(theStr)
{
	var specialChars = "!@#$^&%*()+=-[]\\/{}|:;<>?,.'\"~`?\n\t\r";
	
	for (var i = 0; i < specialChars.length; i++)
	{
		if (theStr.indexOf(specialChars[i]) != -1)
		{
			theStr = replaceAllOfGivenChar(theStr, specialChars[i], "");
		}
	}
	
	return theStr;
}

function removeAllUrlChars(theStr)
{
	var urlChars = "@#$&%[]\\/{}<>?.\?\n\t\r";
	
	for (var i = 0; i < urlChars.length; i++)
	{
		if (theStr.indexOf(urlChars[i]) != -1)
		{
			if (urlChars[i] != '&')
			{
				theStr = replaceAllOfGivenChar(theStr, urlChars[i], "");
			}
			else
			{
				theStr = replaceAllOfGivenChar(theStr, '&', "and");
			}
		}
	}
	
	return theStr;
}

function replaceAllOfGivenChar(theStr, charToReplace, replaceWith)
{
	if (charToReplace != replaceWith)
	{
		while (theStr.indexOf(charToReplace) != -1)
		{
			theStr = theStr.replace(charToReplace, replaceWith);
		}
	}
	
	return theStr;
}

function getLastIndexOf(theStr, subStr)
{
	var lastIndex = -1;
	
	if (subStr != undefined && subStr.length > 0)
	{
		while (theStr.indexOf(subStr) != -1)
		{
			lastIndex = theStr.indexOf(subStr);
			
			theStr = theStr.replace(subStr,"");
		}
	}
	
	return lastIndex;
}

function getSubStrChunk(theStr, startSub, endSub)
{
	var strChunk = theStr;
	var returnChunk = "";
	
	//if the start of the chunk doesn't equal the end of the chunk
	if (startSub != endSub)
	{
		//if there is a starting chunk
		if (strChunk.indexOf(startSub) != -1)
		{
			//if the start chunk isn't blank
			if (startSub.length > 0)
			{
				//remove string before starting chunk, including the starting chunk
				strChunk = strChunk.substring(strChunk.indexOf(startSub) + startSub.length);
			}
			else
			{
				//a blank start chunk can just default to the first index of the string
			}
			
			//if there is an ending chunk
			if (strChunk.indexOf(endSub) != -1 && endSub != undefined)
			{
				//remove string after ending chunk
				strChunk = strChunk.substring(0, strChunk.indexOf(endSub) + endSub.length);
			}
			
			//add the start chunk back onto the beginning
			strChunk = startSub + strChunk;
			returnChunk = strChunk;
		}
	}
	
	return returnChunk;
}

function replaceGivenStrChunk(theStr, startSub, endSub, replaceWith)
{
	var strChunk = getSubStrChunk(theStr, startSub, endSub);
	
	//if the string chunk was found
	if (strChunk != "" && strChunk != theStr)
	{
		//perform the replace
		theStr = theStr.replace(strChunk, replaceWith);
	}
	
	return theStr;
}

function getHardScrubbedString(theStr)
{
	//remove all special characters from theStr
	theStr = removeAllSpecialChars(theStr);
	
	//remove all spaces from theStr
	theStr = replaceAllOfGivenChar(theStr, " ", "");
	
	//set the theStr to lower case
	theStr = theStr.toLowerCase();
	
	return theStr;
}

function getDerivedId(baseStr, appendUniqueStr)
{
	//remove special characters
	baseStr = getHardScrubbedString(baseStr);
	
	//restrict length
	baseStr = getMaxLengthStr(baseStr, 30);
	
	//trim leading and trailing spaces
	baseStr = getTrimStr(baseStr);
	
	if (appendUniqueStr != undefined && appendUniqueStr.length > 0)
	{
		appendUniqueStr = getTrimStr(appendUniqueStr);
		
		if (appendUniqueStr.indexOf("_") == 0)
		{
			baseStr += appendUniqueStr;
		}
		else
		{
			baseStr += "_" + appendUniqueStr;
		}
	}
	
	return baseStr;
}

function getTrimStr(theStr)
{
	var theTrimStr = theStr;
	
	if (theTrimStr != undefined && theTrimStr != null)
	{
		//make sure the value is a string
		theTrimStr += "";
		
		//remove leading spaces
		while (theTrimStr.charAt(0) == " " || theTrimStr.charAt(0) == "\t" || theTrimStr.charAt(0) == "\n")
		{
			theTrimStr = theTrimStr.substring(1);
		}
		
		var lastIndex = theTrimStr.length - 1;
		
		//remove trailing spaces
		while (theTrimStr.charAt(lastIndex) == " " || theTrimStr.charAt(lastIndex) == "\t" || theTrimStr.charAt(lastIndex) == "\n")
		{
			theTrimStr = theTrimStr.substring(0, theTrimStr.length - 1);
		}

	}
	else
	{
		theTrimStr = "";
	}
	
	return theTrimStr;
}
//END REMOVE AND REPLACE MANAGERS

//START KEY / VALUE PAIR MANAGERS
function setTokenValue(tokenKeyValPairList, tokenKey, newTokenVal)
{
	var keyValSeparator = getKeyValSeparator();
	var newKeyValPair = tokenKey + keyValSeparator + newTokenVal;
	
	//get the key value pair
	var prevKeyValPair = getTokenKeyValPair(tokenKeyValPairList, tokenKey);
	
	//if this key is already in the string
	if (prevKeyValPair.length > 0)
	{
		tokenKeyValPairList = tokenKeyValPairList.replace(prevKeyValPair, newKeyValPair);
	}
	else //the key value pair is not already in the string
	{
		var keyValEnd = getKeyValEnd();
		
		//add the key value pair to the string
		tokenKeyValPairList += keyValEnd + newKeyValPair;
		
		tokenKeyValPairList.replace(keyValEnd + keyValEnd + keyValEnd, keyValEnd);
		tokenKeyValPairList.replace(keyValEnd + keyValEnd, keyValEnd);
	}
	
	return tokenKeyValPairList;
}

function getTokenKeyValPair(tokenKeyValPairList, tokenKey)
{
	var keyValSeparator = getKeyValSeparator();
	var keyValEnd = getKeyValEnd();
	
	var tokenKeyVal = "";
	var keyAndSeparator = tokenKey + keyValSeparator;
	
	//if the token/key separator is in the string
	if (tokenKeyValPairList.indexOf(keyAndSeparator) != -1)
	{
		tokenKeyVal = tokenKeyValPairList;
			
		//remove everything before the key
		tokenKeyVal = tokenKeyVal.substring(tokenKeyVal.indexOf(keyAndSeparator));
			
		//if a key val end string is in the remaining string
		if (tokenKeyVal.indexOf(keyValEnd) != -1)
		{
			//strip off everything at and after the key value end string
			tokenKeyVal = tokenKeyVal.substring(0, tokenKeyVal.indexOf(keyValEnd));
		}
			
		//trim the value to return
		tokenKeyVal = getTrimStr(tokenKeyVal);
	}	
	
	return tokenKeyVal;
}

function getTokenValue(tokenKeyValPairList, tokenKey)
{
	var keyValSeparator = getKeyValSeparator();
	var tokenVal = "";
	var keyAndSeparator = tokenKey + keyValSeparator;
	
	//get the key value pair
	tokenVal = getTokenKeyValPair(tokenKeyValPairList, tokenKey);
	
	//remove the key part of the key value pair
	tokenVal = tokenVal.replace(keyAndSeparator, "");
	
	return tokenVal;
}
//END KEY / VALUE PAIR MANAGERS

//START LENGTH LIMIT MANAGERS
function getMaxLengthStr(theStr, maxLength)
{
	//if the string is longer than the max length
	if (theStr.length > maxLength)
	{
		theStr = theStr.substring(0, maxLength);
	}
	
	return theStr;
}

function getMaxLengthWithDotsStr(theStr, maxLength)
{
	var dots = "...";
	
	//if the max length is too small
	if (maxLength < dots.length + 1)
	{
		//increase the max length to the minimum
		maxLength = dots.length + 1;
	}
	
	//if the string is longer than the max length
	if (theStr.length > maxLength)
	{
		theStr = theStr.substring(0, maxLength - dots.length);
		theStr += dots;
	}
	
	return theStr;
}
//END LENGTH LIMIT MANAGERS

//START YOUTUBE URL MANAGERS
function getYoutubeVidIdInStr(theStr)
{
	var videoId = '';
	var preIdStr = '';
	
	//if the string contains the "/watch?v=" path
	if (theStr.indexOf("/watch?v=") != -1)
	{
		preIdStr = "/watch?v=";
	}
	
	//if the string contains the "/embed/" path
	if (theStr.indexOf("/embed/") != -1)
	{
		preIdStr = "/embed/";
	}
	
	//if the string contains the "&v=" path
	if (theStr.indexOf("&v=") != -1)
	{
		preIdStr = "&v=";
	}	
	
	//if the string before the video id was found
	if (preIdStr != '')
	{
		videoId = theStr;
		
		//strip off everything before preIdStr
		videoId = videoId.substring(videoId.indexOf(preIdStr));
						
		//remove the preIdStr
		videoId = videoId.replace(preIdStr,"");
						
		//if there is a & after the videoId
		if (videoId.indexOf("&") != -1)
		{
			//strip off everything to the right of & and including &
			videoId = videoId.substring(0, videoId.indexOf("&"));
		}
		else //no & after the videoId
		{
			//if there is a # after the videoId
			if (videoId.indexOf("#") != -1)
			{
				//strip off everything to the right of # and including #
				videoId = videoId.substring(0, videoId.indexOf("#"));
			}
		}
		
		//if there is a space after the videoId
		if (videoId.indexOf(" ") != -1)
		{
			//strip off everything to the right of & and including the space
			videoId = videoId.substring(0, videoId.indexOf(" "));
		}		
				
		//trim the leading and trailing spaces from the video id
		videoId = getTrimStr(videoId);
	}
	
	return videoId;
}
//END YOUTUBE URL MANAGERS



//If only pageType is provided, pageType is used as pageTitle, a pageId is derrived from pageType
//If only pageType is provided and it matches one of the pre-defined types, the title, id and close event for the pre-defined pageType is used
//If both pageType and pageId are provided, pageType is used as pageTitle and the provided id is used as pageId
function addPageDiv(pageType, pId)
{
	var pageTitle = pageType;
	var pageId = pId;
	var pageWrapClass = getPageClass("pageWrap");
	var pageHeadClass = getPageClass("pageHead");
	var pageContentClass = getPageClass("pageContent");
	var pageTitleClass = getPageClass("pageTitle");
		
	//if the page id is not specified separately from the page type/title
	if (pageId == undefined)
	{
		//choose a different title, window id, and window close action depending on window type
		switch (pageType)
		{
			case "main-menu":
				pageId = getPageId("main-menu");
				pageTitle = getPageTitle("main-menu");
				break;
			case "":
				break;
			default:
				break;
		}
	}
	else //both the page type and id are specified. Use page type as title by default
	{

	}
	
	var pageDiv = document.getElementById(pageId);
	
	//if a page with this id does not already exist
	if (pageDiv == undefined)
	{
		//build page div
		pageDiv = document.createElement('div');
		pageDiv.setAttribute('class', pageWrapClass);
		pageDiv.setAttribute('id',pageId);
		pageDiv.innerHTML = "<div class='" + pageHeadClass + "'><a class='logo' href='#" + getPageId("main-menu") + "'><img class='logo' src='img/logo_shu_small.png' /></a><h1 class='" + pageTitleClass + "'>" + pageTitle + "</h1></div>";
			
		//window content
		var pageContent = document.createElement('div');
		pageContent.setAttribute('class', pageContentClass);
		pageContent.setAttribute('id', getPageQual('pageContent') + pageId);
		
		pageDiv.appendChild(pageContent);
			
		//add the window to the page
		var bodyElem = document.getElementsByTagName("body")[0];
		bodyElem.appendChild(pageDiv);
	}
}

function clearSyncProgress()
{
	$('#sync_wrap').remove();
}

function initLoadingLightBox()
{
	//window content
	var lightBoxDiv = document.createElement('div');
	var lightBoxId = getPageId("load");
	lightBoxDiv.setAttribute('id', lightBoxId);
	lightBoxDiv.setAttribute('onclick', 'javascript:setTimeout(function(){hideElem("' + lightBoxId + '");}, 3000);');
		
	var lightBoxTextDiv = document.createElement('div');
	lightBoxTextDiv.setAttribute('id', getPageId("load-text"));
	lightBoxTextDiv.innerHTML = getPageTitle("load");
		
	lightBoxDiv.appendChild(lightBoxTextDiv);
	var bodyElem = document.getElementsByTagName("body")[0];
	bodyElem.appendChild(lightBoxDiv);
	hideElem(lightBoxId);
}

function writeToPageDiv(pageId, appendHtml)
{
	var pageContentId = getPageQual('pageContent') + pageId;
	var pageContent = document.getElementById(pageContentId);
	var pageContentHtml = pageContent.innerHTML;
	pageContent.innerHTML = pageContentHtml + appendHtml;
}

function overWriteToPageDiv(pageId, newHtml)
{
	var pageContentId = getPageQual('pageContent') + pageId;
	var pageContent = document.getElementById(pageContentId);
	pageContent.innerHTML = newHtml;
}

function initPageChangeListener()
{
	//event that fires when the url hash changes
	$(window).bind('hashchange', function() 
	{
		var pageId = location.hash;

		//if there is a page id given after a # in the url
		if (pageId != undefined && pageId.length > 0)
		{
			showPage(pageId);
		}
		else //no page given
		{
			showPageAtIndex(0);
		}
	});
	
	//event that fires on page refresh
	$(document).ready(function() 
	{
   		//remove any hashes that may be in the url
		location.hash = '';	
	});
}

//http://stackoverflow.com/questions/92720/jquery-javascript-to-replace-broken-images
//deal with broken images
function replaceBrokenImages()
{
	$('img').each(function(i) 
	{
		//if this image failed to load
		$(this).one('error', function()
		{
			var imgTxt = $(this).attr('alt');
			
			if (imgTxt == undefined || imgTxt.length < 1)
			{
				imgTxt = $(this).attr('title');
					
				if (imgTxt == undefined || imgTxt.length < 1)
				{
					imgTxt = "(Image)";
				}
			}
				
			var imageClass = $(this).attr('class');
			var imageStyle = $(this).attr('style');
			var imageWidth = $(this).attr('width');
			var imageHeight = $(this).attr('height');
				
		  	$(this).before("<span id='img-broken_" + i + "' class='img-broken'>" + imgTxt + "</span>");
			$(this).remove();
				
			var replaceHtml = $('#img-broken_' + i);
				
			if (imageClass != undefined && imageClass.length > 0)
			{
				replaceHtml.addClass(imageClass);
			}
				
			if (imageStyle != undefined && imageStyle.length > 0)
			{
				replaceHtml.attr('style', imageStyle);
			}
				
			if (imageWidth != undefined && imageWidth.length > 0)
			{
				if (imageWidth.indexOf('px') == -1)
				{
					imageWidth += 'px';
				}
				replaceHtml.css('width', imageWidth);
				replaceHtml.css('display', 'inline-block');
			}
				
			if (imageHeight != undefined && imageHeight.length > 0)
			{
				if (imageHeight.indexOf('px') == -1)
				{
					imageHeight += 'px';
				}
				replaceHtml.css('height', imageHeight);
				replaceHtml.css('display', 'inline-block');
			}
				
			replaceHtml.html(imgTxt);
		});
	});
}

/*function getBase64Image(img) 
{
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    //var dataURL = canvas.toDataURL("image/png");

    //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}*/

function showPageAtIndex(pageIndex)
{
	var pageWrapClass = getPageClass('pageWrap');
			
	//get the page at this index if it exists
	var pageElem = $('div.' + pageWrapClass + ':eq(' + pageIndex + ')');
	if (pageElem.length > 0)
	{
		//show this page
		var pageId = pageElem.attr("id");	
		showPage(pageId);
	}
}

function getFullVisiblePgHeight(pageId)
{
	//get head and content div elements
	var pageHeadElem = $('#' + pageId + ' .' + getPageClass('pageHead'));
	var pageContentElem = $('#' + pageId + ' .' + getPageClass('pageContent'));
	var btnsMenuElem = $('#' + getBtnId("btns-menu"));	
	
	//get height values (height values can only be obtained from visible elements)
	var headHeight = pageHeadElem.outerHeight();
	var contentHeight = pageContentElem.outerHeight();
	var btnsMenuHeight = btnsMenuElem.outerHeight();
	var spacingHeight = 20;
	var fullHeight = headHeight + contentHeight + btnsMenuHeight + spacingHeight;
	
	var windowHeight = $(window).outerHeight();
	
	if (windowHeight > fullHeight)
	{
		fullHeight = windowHeight;
	}
	
	return fullHeight;
}

function setPageTitleCssForLength(pageId)
{
	var pageTitleElem = $('#' + pageId + ' .' + getPageClass("pageTitle"));
	
	//get page title line height
	var titleLineHeightStr = pageTitleElem.css('line-height');
	titleLineHeightStr = titleLineHeightStr.replace('px','');
	var titleLineHeight = parseInt(titleLineHeightStr);
	
	//get the page title height
	var pageTitleHeight = pageTitleElem.outerHeight();
	
	//if the page title has overflowed to more than 1 lines
	//if (pageTitleHeight >= (titleLineHeight * 3))
	if (pageTitleHeight >= (titleLineHeight * 2))
	{
		pageTitleElem.addClass('page_title_long');
	}
	else
	{
		pageTitleElem.removeClass('page_title_long');
	}
}

function setFullVisiblePgHeight(pageId)
{	
	var pageElem = $('#' + pageId);
	var bodyElem = $('body');
	var htmlElem = $('html');
	var btnsMenuElem = $('#' + getBtnId("btns-menu"));
	
	var loadingBoxMask = $('#' + getPageId("load"));
	var loadingBoxText = $('#' + getPageId("load-text"));
	
	//Note: height values can only be obtained from visible elements
	var fullHeight = getFullVisiblePgHeight(pageId);
	var btnsMenuHeight = btnsMenuElem.outerHeight();
	var contentHeight = fullHeight - btnsMenuHeight;
	var windowHeight = $(window).outerHeight();
	var windowWidth = $(window).outerWidth();
	
	//set elements' heights
	pageElem.css('height', fullHeight + 'px');
	bodyElem.css('height', fullHeight + 'px');	
	htmlElem.css('height', fullHeight + 'px');
	
	loadingBoxMask.css('height', fullHeight + 'px');
	loadingBoxMask.css('width', outerWidth + 'px');
}

function setImagesMaxWidth(pageId)
{
	var windowWidth = $(window).width();
	windowWidth = windowWidth - 20;
	var selector;
	
	if (pageId != undefined)
	{
		selector = "#" + pageId + " img";
	}
	else
	{
		selector = "img";
	}
	
	//for each image
	$(selector).each(function(i)
	{
		//get the image width
		var imgWidth = $(this).outerWidth();
		
		//if the image width is greater than the window width
		//if (imgWidth > windowWidth)
		//{
			//find the size reduction ratio
			var reductionRatio = windowWidth / imgWidth;
			
			//get the image height and reduce it by the reduction ratio
			var imgHeight = $(this).outerHeight();
			imgHeight = imgHeight * reductionRatio;
				
			//set the max height and width of the image
			$(this).css('max-width', windowWidth + 'px');
			$(this).css('max-height', imgHeight + 'px');
		//}	
	});
}

function resizeVisiblePage(pageId)
{
	if (pageId != undefined)
	{
		setFullVisiblePgHeight(pageId);
		setPageTitleCssForLength(pageId);
		setImagesMaxWidth(pageId);
	}
	else
	{
		var pageId = getPageId('main-menu');
		var visiblePageElems = getVisiblePages();
		visiblePageElems.each(function(c) 
		{ 
			pageId = $(this).attr('id');
		});
		
		setFullVisiblePgHeight(pageId);
		setPageTitleCssForLength(pageId);
		setImagesMaxWidth(pageId);
	}
}

function showPage(pageId)
{
	if (pageId.indexOf("#") == 0)
	{
		//remove the #
		pageId = replaceAllOfGivenChar(pageId, "#", "");
	}
	
	var pageElem = $('#' + pageId);
	
	//if there is a page with this id
	if (pageElem.length > 0)
	{
		$('body').scrollTop(0);
		
		//get classes
		var pageWrapClass = getPageClass('pageWrap');
		var pageContentClass = getPageClass('pageContent');
		var pageHeadClass = getPageClass('pageHead');
		var backBtnClass = getPageClass("pageBack");
				
		//show the "page" to go to
		showElem(pageId);
		
		//set height values (height values can only be obtained from visible elements)
		resizeVisiblePage(pageId);
	
		//hide all of the currently visible pages
		var prevPageId;
		var visiblePageElems = getVisiblePages();
		visiblePageElems.each(function(c) 
		{ 
			var currentId = $(this).attr('id');
			if (currentId != pageId)
			{		
				prevPageId = currentId;
				
				//hide the previously visible page
				hideElem(currentId);
			}
		});
		
		//if this is not the home page
		if (pageId != getPageId("main-menu"))
		{
			//show the home button link
			showElem(getBtnId("home-btn"), "inline-block");
			
			//hide sync button
			hideElem(getBtnId("refresh-btn"));

			//add the back button to this window
			if (prevPageId != undefined && prevPageId.length > 0)
			{
				var pageHeadElem = $('#' + pageId + ' .' + pageHeadClass);
				var backBtnElem = pageHeadElem.find('.' + backBtnClass);
				
				//if this page doesn't already have a back button
				if (backBtnElem.length == 0)
				{
					var backBtnHtml = "";
					backBtnHtml += "<a class='" + backBtnClass + "' href='#" + prevPageId + "'>";
					backBtnHtml += "<img src='img/btn_back_small.png' />";
					backBtnHtml += "</a>";	
					
					//add the new back button
					pageHeadElem.prepend(backBtnHtml);
				}
			}
		}
		else //is the home page
		{			
			//hide the home button link
			hideElem(getBtnId("home-btn"));
			
			//show sync button
			showElem(getBtnId("refresh-btn"));
			
			//remove back buttons
			var backBtnElems = $('.' + backBtnClass);
			backBtnElems.remove();
		}
		
		var btnsDivJq = $('#' + getBtnClass("btns-menu"));
		var btnsDivHeight = btnsDivJq.outerHeight();
			
		//set the buttons menu to the bottom of the visible window area
		var scrollBottom = $(window).scrollTop() + $(window).height();
		scrollBottom = scrollBottom - btnsDivHeight;
		btnsDivJq.css('position','absolute');
		btnsDivJq.css('top', scrollBottom + 'px');
		showElem(getBtnId("btns-menu"));
	}
}

function getVisiblePages()
{
	var pageWrapClass = getPageClass('pageWrap');
	var visiblePagesSelector = '';
	visiblePagesSelector += 'div.' + pageWrapClass + '[style*="visibility:visible;display:block;"]' + ',';
	visiblePagesSelector += 'div.' + pageWrapClass + '[style*="visibility: visible; display: block;"]';
	
	var visiblePageElems = $(visiblePagesSelector);
	
	return visiblePageElems;
}

function getVisiblePagesContents()
{
	var visiblePageElems = getVisiblePages();
	return visiblePageElems.find('.' + getPageClass("pageContent"));
}

function setElemToBottom(elemId)
{
	var bottomElem = $('#' + elemId);
	var bodyElem = $('body');
	
	var scrollBottom = $(window).scrollTop() + $(window).height();
	showElem(elemId);
	var bottomElemHeight = bottomElem.outerHeight();
	var bottomElemTopPos = scrollBottom - bottomElemHeight;
	var bodyHeight = bodyElem.outerHeight();
	var maxBottomTopPos = bodyHeight - bottomElemHeight;
		
	bottomElem.css('position','absolute');
		
	//has not reached the bottom of the page
	if (bottomElemTopPos <= maxBottomTopPos)
	{
		bottomElem.css('top', bottomElemTopPos + 'px');
	}
	else //at the bottom of the page
	{
		bottomElem.css('top', maxBottomTopPos + 'px');
	}	
}

function initBottomButtons(buttonsType)
{
	var btnsDiv = document.createElement('div');
	btnsDiv.setAttribute('class', getBtnClass("btns-menu"));
	btnsDiv.setAttribute('id', getBtnId("btns-menu"));
	
	//add the bottom buttons and scrollable div to the page
	var bodyElem = document.getElementsByTagName("body")[0];
	var scrollAreaId = getPageId('scroll');
	bodyElem.innerHTML = "<div id='" + scrollAreaId + "'>" + bodyElem.innerHTML + "</div>"; //iscroll div
	bodyElem.appendChild(btnsDiv);
	
	var btnsDivJq = $('#' + getBtnClass("btns-menu"));
	var btnsDivHeight = btnsDivJq.outerHeight();
	
	//set the buttons menu to the bottom of the visible window area
	var scrollBottom = $(window).scrollTop() + $(window).height();
	scrollBottom = scrollBottom - btnsDivHeight;
	btnsDivJq.css('position','absolute');
	btnsDivJq.css('top', scrollBottom + 'px');
	showElem(getBtnId("btns-menu"));
	
	if (buttonsType == undefined)
	{
		buttonsType = "main";
	}
	
	switch (buttonsType)
	{
		case "map":
			break;
		default:
		
			//home button
			addBottomButton(getBtnId('home-btn'), getBtnLabel('home-btn'), "#" + getPageId("main-menu"));
			hideElem(getBtnId('home-btn'));
			
			var refreshBtnLabel = getBtnLabel('sync-btn');
			
			/*//if there are any feeds to update
			if (existsFeedsToUpdate())
			{
				refreshBtnLabel = getBtnLabel('refresh-btn');
			}*/
			
			//refresh button
			addBottomButton(getBtnId('refresh-btn'), refreshBtnLabel);
			var refreshBtnElem = document.getElementById(getBtnId('refresh-btn'));
			refreshBtnElem.setAttribute('onclick', 'javascript:showElem(\'' + getPageId("load") + '\');refreshPageFeeds();');
		
			break;
	}
	
	resizeVisiblePage(getPageId("main-menu"));
	
	//KEEPING THE BUTTONS HIDDING DURING SCROLL AND THEN SENDING THEM TO BOTTOM AFTER SCROLL

	document.getElementById(scrollAreaId).addEventListener('touchmove', function (e) 
	{ 
		//set the buttons menu to the bottom of the visible window area
		var scrollBottom = $(window).scrollTop() + $(window).height();
		scrollBottom = scrollBottom - btnsDivHeight;
		btnsDivJq.css('position','absolute');
		btnsDivJq.css('top', scrollBottom + 'px');
		
		hideElem(getBtnId("btns-menu")); 
		
	}, false);
	
	document.getElementById(scrollAreaId).addEventListener('touchstart', function (e) 
	{ 
		//set the buttons menu to the bottom of the visible window area
		var scrollBottom = $(window).scrollTop() + $(window).height();
		scrollBottom = scrollBottom - btnsDivHeight;
		btnsDivJq.css('position','absolute');
		btnsDivJq.css('top', scrollBottom + 'px');
		
	}, false);
	
	document.getElementById(scrollAreaId).addEventListener('touchend', function (e) 
	{ 
		//set the buttons menu to the bottom of the visible window area
		var scrollBottom = $(window).scrollTop() + $(window).height();
		scrollBottom = scrollBottom - btnsDivHeight;
		btnsDivJq.css('position','absolute');
		btnsDivJq.css('top', scrollBottom + 'px');
		showElem(getBtnId("btns-menu"));

	}, false);
	
	$(window).scroll(function() 
	{
		//set the buttons menu to the bottom of the visible window area
		var scrollBottom = $(window).scrollTop() + $(window).height();
		scrollBottom = scrollBottom - btnsDivHeight;
		btnsDivJq.css('position','absolute');
		btnsDivJq.css('top', scrollBottom + 'px');
		showElem(getBtnId("btns-menu"));
	});
	
	//attach listener to resize page every time the window size changes
	window.onresize = function() 
	{
		resizeVisiblePage();
			
		var btnsDivJq = $('#' + getBtnClass("btns-menu"));
		var btnsDivHeight = btnsDivJq.outerHeight();
			
		//set the buttons menu to the bottom of the visible window area
		var scrollBottom = $(window).scrollTop() + $(window).height();
		scrollBottom = scrollBottom - btnsDivHeight;
		btnsDivJq.css('position','absolute');
		btnsDivJq.css('top', scrollBottom + 'px');
		showElem(getBtnId("btns-menu"));
	}
}

function disableLink(linkId)
{	
	//get the clickable link element with this href value
	var xclickElem = $('a#' + linkId);
	
	//save the href value in the title attribute
	var hrefVal = xclickElem.attr('href');
	xclickElem.attr('title', hrefVal);
	
	var onclickVal = xclickElem.attr('onclick');
	xclickElem.attr('name', onclickVal);
	
	xclickElem.addClass('disabled');
		
	//remove href attribute
	xclickElem.removeAttr('href');
	xclickElem.removeAttr('onclick');
}

function enableLink(linkId)
{
	//get the clickable link element with this href value
	var xclickElem = $('a#' + linkId);
	
	//get the saved href value in the title attribute
	var hrefVal = xclickElem.attr('title');
	var onclickVal = xclickElem.attr('name');
	
	xclickElem.removeClass('disabled');
		
	//restore href attribute
	xclickElem.attr('href', hrefVal);
	xclickElem.attr('onclick', onclickVal);
	
	//remove placeholder attributes
	xclickElem.removeAttr('title');
	xclickElem.removeAttr('name');
}

function setBottomButton(btnId, btnLabel, hrefVal)
{
	var btnElem = document.getElementById(btnId);
	btnElem.innerHTML = btnLabel;
	
	//if an href value was given
	if (hrefVal != undefined && hrefVal.length > 0)
	{
		//add the href to the button
		btnElem.setAttribute('href', hrefVal);
	}
}

function addBottomButton(btnId, btnLabel, hrefVal)
{
	var btnsDiv = document.getElementById(getBtnId("btns-menu"));
	
	var btnElem = document.createElement('a');
	btnElem.setAttribute('id', btnId);
	
	btnElem.setAttribute('class', getBtnClass('bottomBtn'));
	
	btnsDiv.appendChild(btnElem);
	
	setBottomButton(btnId, btnLabel, hrefVal);
}

function showElem(elemId, blockType)
{
	/*var elemDiv = document.getElementById(elemId);
	if (elemDiv != undefined)
	{
		elemDiv.setAttribute('style','visibility:visible;display:block;');
	}*/
	
	if (blockType == undefined)
	{
		blockType = 'block';
	}
	
	var elemDiv = $('#' + elemId);
	elemDiv.css('visibility','visible');
	elemDiv.css('display',blockType);
}

function hideElem(elemId)
{
	/*var elemDiv = document.getElementById(elemId);
	if (elemDiv != undefined)
	{
		elemDiv.setAttribute('style','visibility:hidden;display:none;');
	}*/
	
	var elemDiv = $('#' + elemId);
	elemDiv.css('visibility','hidden');
	elemDiv.css('display','none');
}

/*
12 midnight	0
1 am		1
2			2
3			3
4			4
5			5
6			6
7			7
8			8
9			9
10			10
11 			11

12 noon		12
1 pm		13
2			14
3			15
4			16
5			17
6			18
7			19
8			20
9			21
10			22
11			23
*/
function getTimeFromDate(dateObj)
{
	var theTimeStr = '';
	var minutesInt = dateObj.getMinutes();
	var hoursInt = dateObj.getHours(); //military time
	var amOrPm = ' AM';
	
	//if the hours is greater than 11
	if (hoursInt > 11)
	{
		/*if the hours is also less than 24 (military time only goes up to 
		 23 before starting over at 0)*/
		if (hoursInt < 24)
		{
			//if the military time is not 12
			if (hoursInt != 12)
			{
				//change to PM
				amOrPm = ' PM';
			}
			else
			{
				amOrPm = ' noon';
			}
		}
		else
		{
			amOrPm = ' midnight';
		}
		
		//if the military time is not 12
		if (hoursInt != 12)
		{
			//change the hour to 'civilian' time
			hoursInt = hoursInt - 12;
		}
	}
	else if (hoursInt == 0) //if the military time hours is 0
	{
		hoursInt = 12;
		amOrPm = ' midnight';
	}
	
	var minutesStr = minutesInt + '';
	
	//if the minutes is a single digit
	if (minutesStr.length == 1)
	{
		//add the zero before the single digit
		minutesStr = "0" + minutesStr;
	}
	
	//put it all together
	theTimeStr = hoursInt + ":" + minutesStr + amOrPm;

	return theTimeStr;
}

function getDayOfWeekInt(dayStr)
{
	dayStr = dayStr.toLowerCase();
	dayStr = getTrimStr(dayStr);
	
	var dayOfWeekInt = -1;
	
	switch (dayStr)
	{
		case 'sunday':
			dayOfWeekInt = 0;
			break;
		case 'sun':
			dayOfWeekInt = 0;
			break;
		case 'su':
			dayOfWeekInt = 0;
			break;
		case '00':
			dayOfWeekInt = 0;
			break;
		case '0':
			dayOfWeekInt = 0;
			break;
		case '07':
			dayOfWeekInt = 0;
			break;
		case '7':
			dayOfWeekInt = 0;
			break;
		case 'monday':
			dayOfWeekInt = 1;
			break;
		case 'mon':
			dayOfWeekInt = 1;
			break;
		case 'mo':
			dayOfWeekInt = 1;
			break;
		case '01':
			dayOfWeekInt = 1;
			break;
		case '1':
			dayOfWeekInt = 1;
			break;
		case 'tuesday':
			dayOfWeekInt = 2;
			break;
		case 'tue':
			dayOfWeekInt = 2;
			break;
		case 'tu':
			dayOfWeekInt = 2;
			break;
		case '02':
			dayOfWeekInt = 2;
			break;
		case '2':
			dayOfWeekInt = 2;
			break;
		case 'wednesday':
			dayOfWeekInt = 3;
			break;
		case 'wed':
			dayOfWeekInt = 3;
			break;
		case 'we':
			dayOfWeekInt = 3;
			break;
		case '03':
			dayOfWeekInt = 3;
			break;
		case '3':
			dayOfWeekInt = 3;
			break;
		case 'thursday':
			dayOfWeekInt = 4;
			break;
		case 'thu':
			dayOfWeekInt = 4;
			break;
		case 'th':
			dayOfWeekInt = 4;
			break;
		case '04':
			dayOfWeekInt = 4;
			break;
		case '4':
			dayOfWeekInt = 4;
			break;
		case 'friday':
			dayOfWeekInt = 5;
			break;
		case 'fri':
			dayOfWeekInt = 5;
			break;
		case 'fr':
			dayOfWeekInt = 5;
			break;
		case '05':
			dayOfWeekInt = 5;
			break;
		case '5':
			dayOfWeekInt = 5;
			break;
		case 'saturday':
			dayOfWeekInt = 6;
			break;
		case 'sat':
			dayOfWeekInt = 6;
			break;
		case 'sa':
			dayOfWeekInt = 6;
			break;
		case '06':
			dayOfWeekInt = 6;
			break;
		case '6':
			dayOfWeekInt = 6;
			break;
		default:
			break;
	}	
	
	return dayOfWeekInt;
}

function getDayStr(dateObj)
{
	var dayStr = '';
	
	var dayInt = dateObj.getDay();
	
	switch (dayInt)
	{
		case 0:
			dayStr = 'Sunday';
			break;
		case 1:
			dayStr = 'Monday';
			break;
		case 2:
			dayStr = 'Tuesday';
			break;
		case 3:
			dayStr = 'Wednesday';
			break;
		case 4:
			dayStr = 'Thursday';
			break;
		case 5:
			dayStr = 'Friday';
			break;
		case 6:
			dayStr = 'Saturday';
			break;
		default:
			break;
	}
	
	return dayStr;
}

function getMonthStr(monthInt)
{
	var monthStr = '';
	
	switch (monthInt)
	{
		case 1:
			monthStr = 'January';
			break;
		case 2:
			monthStr = 'February';
			break;
		case 3:
			monthStr = 'March';
			break;
		case 4:
			monthStr = 'April';
			break;
		case 5:
			monthStr = 'May';
			break;
		case 6:
			monthStr = 'June';
			break;
		case 7:
			monthStr = 'July';
			break;
		case 8:
			monthStr = 'August';
			break;
		case 9:
			monthStr = 'September';
			break;
		case 10:
			monthStr = 'October';
			break;
		case 11:
			monthStr = 'November';
			break;
		case 12:
			monthStr = 'December';
			break;
		default:
			break;	
	}
	
	return monthStr;
}

function getMonthInt(monthStr)
{
	monthStr = monthStr.toLowerCase();
	monthStr = getTrimStr(monthStr);
	
	var monthInt = -1;
	
	switch (monthStr)
	{
		case "january":
			monthInt = 1;
			break;
		case "jan":
			monthInt = 1;
			break;
		case "01":
			monthInt = 1;
			break;
		case "1":
			monthInt = 1;
			break;
		case "february":
			monthInt = 2;
			break;
		case "feb":
			monthInt = 2;
			break;
		case "02":
			monthInt = 2;
			break;
		case "2":
			monthInt = 2;
			break;
		case "march":
			monthInt = 3;
			break;
		case "mar":
			monthInt = 3;
			break;
		case "03":
			monthInt = 3;
			break;
		case "3":
			monthInt = 3;
			break;
		case "april":
			monthInt = 4;
			break;
		case "apr":
			monthInt = 4;
			break;
		case "04":
			monthInt = 4;
			break;
		case "4":
			monthInt = 4;
			break;
		case "may":
			monthInt = 5;
			break;
		case "05":
			monthInt = 5;
			break;
		case "5":
			monthInt = 5;
			break;
		case "june":
			monthInt = 6;
			break;
		case "jun":
			monthInt = 6;
			break;
		case "06":
			monthInt = 6;
			break;
		case "6":
			monthInt = 6;
			break;
		case "july":
			monthInt = 7;
			break;
		case "jul":
			monthInt = 7;
			break;
		case "07":
			monthInt = 7;
			break;
		case "7":
			monthInt = 7;
			break;
		case "august":
			monthInt = 8;
			break;
		case "aug":
			monthInt = 8;
			break;
		case "08":
			monthInt = 8;
			break;
		case "8":
			monthInt = 8;
			break;
		case "september":
			monthInt = 9;
			break;
		case "sep":
			monthInt = 9;
			break;
		case "09":
			monthInt = 9;
			break;
		case "9":
			monthInt = 9;
			break;
		case "october":
			monthInt = 10;
			break;
		case "oct":
			monthInt = 10;
			break;
		case "10":
			monthInt = 10;
			break;
		case "november":
			monthInt = 11;
			break;
		case "nov":
			monthInt = 11;
			break;
		case "11":
			monthInt = 11;
			break;
		case "december":
			monthInt = 12;
			break;
		case "dec":
			monthInt = 12;
			break;
		case "12":
			monthInt = 12;
			break;
		default:
			break;	
	}
	
	return monthInt;
}

function getFullDateTime(dateTimeObj)
{
	var monthInt = dateTimeObj.getMonth() + 1;
	//var monthStr = getMonthStr(monthInt);
	var dayInt = dateTimeObj.getDate();
	var dayStr = getDayStr(dateTimeObj);
	
	var yearStr = dateTimeObj.getFullYear();
	var timeStr = getTimeFromDate(dateTimeObj);
	
	return dayStr + ', ' + monthInt + '/' + dayInt + '/' + yearStr + ', ' + timeStr;
}

function getFullDateTimeKey(dateTimeObj)
{
	var monthInt = dateTimeObj.getMonth() + 1;
	//var monthStr = getMonthStr(monthInt);
	var dayInt = dateTimeObj.getDate();
	var dayStr = getDayStr(dateTimeObj);
	
	var yearStr = dateTimeObj.getFullYear();
	var timeStr = getTimeFromDate(dateTimeObj);
	
	//clean up the time string
	timeStr = replaceAllOfGivenChar(timeStr, " ", "");
	timeStr = replaceAllOfGivenChar(timeStr, ":", "-");
	timeStr = timeStr.toLowerCase();
	
	return monthInt + '-' + dayInt + '-' + yearStr + '_' + timeStr;
}

/*
MONTH: Example, January
m = 1
mm = 01
mmm = Jan
mmmm = January

DAY OF WEEK: Example, Tuesday
w = 2
ww = Tu
www = Tue
wwww = Tuesday

DAY OF MONTH: Example, 9
d = 9
dd = 09
ddd = 9th
dddd = 09th

YEAR: Example, 2009
y = 9
yy = 09
yyy = '09
yyyy = 2009

HOUR: Example, 2 PM
h = 2
hh = 02
H = 14 (military)
HH = 14 "

MINUTE: Example, 3
n = 3
nn = 03

SECOND: Example 5
s = 5
ss = 05

AM / PM / NOON / MIDNIGHT: Example 2 PM
t = p
tt = pm
T = P
TT = PM

AM / PM / NOON / MIDNIGHT: Example 12 noon
t = noon
tt = noon
T = noon
TT = noon
*/
//gets the formatted date value string that corresponds to the format key
function getDesiredDateFormatValue(dateObj, theKey)
{
	if (theKey.indexOf("<") != -1)
	{
		theKey = theKey.replace("<","");
	}
	
	if (theKey.indexOf(">") != -1)
	{
		theKey = theKey.replace(">","");
	}
	
	if (theKey.indexOf("!=") != -1)
	{
		theKey = theKey.replace("!=","");
	}
	
	var returnStr = "";
	
	switch (theKey)
	{
		case "mmmm": //MONTH: Example, January
			var monthInt = dateObj.getMonth();
			monthInt++;
			returnStr = getMonthStr(monthInt);			
			break;
		case "mmm":
			var monthInt = dateObj.getMonth();
			monthInt++;
			returnStr = getMonthStr(monthInt);
			if (returnStr.length > 3)
			{
				returnStr = returnStr.substring(0,3);
			}			
			break;
		case "mm":
			var monthInt = dateObj.getMonth();
			monthInt++;
			returnStr = monthInt + "";
			if (returnStr.length < 2)
			{
				returnStr = "0" + returnStr;
			}
			break;
		case "m":
			var monthInt = dateObj.getMonth();
			monthInt++;
			returnStr = monthInt + "";
			break;
		case "wwww": //DAY OF WEEK: Example, Tuesday
			returnStr = getDayStr(dateObj);
			break;
		case "www":
			returnStr = getDayStr(dateObj);
			returnStr = returnStr.substring(0,3);
			break;
		case "ww":
			returnStr = getDayStr(dateObj);
			returnStr = returnStr.substring(0,2);
			break;
		case "w":
			var weekDayInt = dateObj.getDay();
			returnStr = weekDayInt + "";
			break;
		case "dddd": //DAY OF MONTH: Example, 09th
			var monthDayInt = dateObj.getDate();
			returnStr = monthDayInt + "";
			var postfix = getNumberPostfix(returnStr);
			returnStr += postfix;
			if (returnStr.length < 2)
			{
				returnStr = "0" + returnStr;
			}
		case "ddd":
			var monthDayInt = dateObj.getDate();
			returnStr = monthDayInt + "";
			var postfix = getNumberPostfix(returnStr);
			returnStr += postfix;
			break;
		case "dd": //DAY OF MONTH: Example, 9
			var monthDayInt = dateObj.getDate();
			returnStr = monthDayInt + "";
			if (returnStr.length < 2)
			{
				returnStr = "0" + returnStr;
			}
			break;
		case "d":
			var monthDayInt = dateObj.getDate();
			returnStr = monthDayInt + "";
			break;
		case "yyyy": //YEAR: Example, 2009
			var yearInt = dateObj.getFullYear();
			returnStr = yearInt + "";
			break;
		case "yyy":
			var yearInt = dateObj.getFullYear();
			returnStr = yearInt + "";
			if (returnStr.length > 2)
			{
				returnStr = returnStr.substring(returnStr.length - 2);
			}
			returnStr = "'" + returnStr;
			break;
		case "yy":
			var yearInt = dateObj.getFullYear();
			returnStr = yearInt + "";
			if (returnStr.length > 2)
			{
				returnStr = returnStr.substring(returnStr.length - 2);
			}
			break;
		case "y":
			var yearInt = dateObj.getFullYear();
			returnStr = yearInt + "";
			if (returnStr.length > 1)
			{
				returnStr = returnStr.substring(returnStr.length - 1);
			}
			break;
		case "hh": //HOUR: Example, 2 PM
			var hourInt = dateObj.getHours();
			
			//convert from military to standard time
			if (hourInt > 12) //pm times
			{
				 hourInt -= 12;
			}
			else if (hourInt == 0) //midnight
			{
				hourInt = 12;
			}
			
			returnStr = hourInt + "";
			if (returnStr.length < 2)
			{
				returnStr = "0" + returnStr;
			}
			break;
		case "h":
			var hourInt = dateObj.getHours();
			
			//convert from military to standard time
			if (hourInt > 12) //pm times
			{
				 hourInt -= 12;
			}
			else if (hourInt == 0) //midnight
			{
				hourInt = 12;
			}
			
			returnStr = hourInt + "";
			break;
		case "HH":
			var hourInt = dateObj.getHours();
			returnStr = hourInt + "";
			if (returnStr.length < 2)
			{
				returnStr = "0" + returnStr;
			}
			break;
		case "H":
			var hourInt = dateObj.getHours();
			returnStr = hourInt + "";
			break;
		case "nn": //MINUTE: Example, 3
			var minuteInt = dateObj.getMinutes();
			returnStr = minuteInt + "";
			if (returnStr.length < 2)
			{
				returnStr = "0" + returnStr;
			}
			break;
		case "n":
			var minuteInt = dateObj.getMinutes();
			returnStr = minuteInt + "";
			break;
		case "ss": //SECOND: Example 5
			var secondInt = dateObj.getSeconds();
			returnStr = secondInt + "";
			if (returnStr.length < 2)
			{
				returnStr = "0" + returnStr;
			}
			break;
		case "s":
			var secondInt = dateObj.getSeconds();
			returnStr = secondInt + "";
			break;
		case "tt": //AM / PM / NOON / MIDNIGHT: Example 2 PM
			var hourInt = dateObj.getHours();
			returnStr = getAmPmNoonOrMidnight(hourInt, "tt");
			break;
		case "t":
			var hourInt = dateObj.getHours();
			returnStr = getAmPmNoonOrMidnight(hourInt, "t");
			break;
		case "TT":
			var hourInt = dateObj.getHours();
			returnStr = getAmPmNoonOrMidnight(hourInt, "TT");
			break;
		case "T":
			var hourInt = dateObj.getHours();
			returnStr = getAmPmNoonOrMidnight(hourInt, "T");
			break;
		default:
			break;
	}
	
	return returnStr;
}

//sets the date object value, that corresponds to the format key, to the given value
function setDateObjParam(theDateObj, theKey, theVal)
{
	var firstKeyChar = theKey.toLowerCase();
	
	if (firstKeyChar.indexOf("<") != -1)
	{
		firstKeyChar = firstKeyChar.replace("<","");
	}
	
	if (firstKeyChar.length > 1)
	{	
		firstKeyChar = firstKeyChar.substring(0,1);
	}
	
	switch (firstKeyChar)
	{
		case "m": //theVal = MONTH: Example, January
			var monthInt = getMonthInt(theVal);
			if (monthInt != -1)
			{
				monthInt--;
				theDateObj.setMonth(monthInt);
			}
			break;
		case "d": //theVal = DAY OF MONTH: Example, 9
			if (theVal.charAt(0) == "0")
			{
				theVal = theVal.substring(1);
			}
			
			theVal = theVal.toLowerCase();
			theVal = theVal.replace("st","");
			theVal = theVal.replace("nd","");
			theVal = theVal.replace("rd","");
			theVal = theVal.replace("th","");
			
			var dayOfMonthInt = parseInt(theVal);
			theDateObj.setDate(dayOfMonthInt);
			break;
		case "y": //theVal = YEAR: Example, 2009
			var yearInt = parseInt(theVal);
			theDateObj.setFullYear(yearInt);
			break;
		case "h": //theVal = HOUR: Example, 15
			if (theVal.charAt(0) == "0")
			{
				theVal = theVal.substring(1);
			}
			var hourInt = parseInt(theVal);
			theDateObj.setHours(hourInt);
			break;
		case "n": //theVal = MINUTE: Example, 3
			if (theVal.charAt(0) == "0")
			{
				theVal = theVal.substring(1);
			}
			var minuteInt = parseInt(theVal);
			theDateObj.setMinutes(minuteInt);
			break;
		case "s": //theVal = SECOND: Example, 59
			if (theVal.charAt(0) == "0")
			{
				theVal = theVal.substring(1);
			}
			var secondInt = parseInt(theVal);
			theDateObj.setSeconds(secondInt);
			break;
		case "t": //theVal = AM/PM/noon/midnight
			theVal = theVal.toLowerCase();
			if (theVal.indexOf("pm") != -1)
			{
				var pmHours = theDateObj.getHours();
				
				//if hours is really currently in standard time
				if (pmHours < 13)
				{
					//convert standard time to military
					pmHours += 12;
					theDateObj.setHours(pmHours);
				}
			}
			else if (theVal.indexOf("midnight") != -1)
			{
				//set the hours to the midnight value military
				theDateObj.setHours(0);
			}
			else if (theVal.indexOf("noon") != -1)
			{
				//set the hours to the noon value military (it should already be this value)
				theDateObj.setHours(12);
			}
			break;
		default:
			break;	
	}
	
	return theDateObj;
}

function getNumberPostfix(numberStr)
{
	var postfix = "";
	
	//remove all leading zeroes
	while (numberStr.charAt(0) == "0")
	{
		numberStr.replace("0","");
	}
	
	var numberInt = parseInt(numberStr);
	
	//if the number is not zero or less
	if (numberInt > 0)
	{
		//if the number is one of the three exceptions to the postfix rule, 11, 12, 13
		if (numberInt >= 11 && numberInt <= 13)
		{
			postfix = "th";
		}
		else
		{
			var lastDigitStr = numberStr.charAt(numberStr.length - 1);
			switch (lastDigitStr)
			{
				case "1":
					postfix = "st";
					break;
				case "2":
					postfix = "nd";
					break;
				case "3":
					postfix = "rd";
					break;
				case "4":
					postfix = "th";
					break;
				case "5":
					postfix = "th";
					break;
				case "6":
					postfix = "th";
					break;
				case "7":
					postfix = "th";
					break;
				case "8":
					postfix = "th";
					break;
				case "9":
					postfix = "th";
					break;
				case "0":
					postfix = "th";
					break;
				default:
					break;
			}
		}
	}
	
	return postfix;
}

function getAmPmNoonOrMidnight(militaryHoursInt, formatKey)
{
	var t = "";
	
	//find if the time is am, pm, noon, or midnight
	if (militaryHoursInt > 12) //pm times
	{
		 t = "pm";
		 
		 if (formatKey != undefined)
		 {
			 switch(formatKey)
			 {
				case "t":
					t = t.substring(0,1);
					break;
				case "TT":
					t = t.toUpperCase();
					break;
				case "T":
					t = t.toUpperCase();
					t = t.substring(0,1);
					break;
				default:
					break;
			 }
		 }
	}
	else if (militaryHoursInt == 12) //noon
	{
		t = "noon";
	}
	else if (militaryHoursInt == 0) //midnight
	{
		t = "midnight";
	}
	else //must be am
	{
		t = "am";
		
		if (formatKey != undefined)
		{
			switch(formatKey)
			{
				case "t":
					t = t.substring(0,1);
					break;
				case "TT":
					t = t.toUpperCase();
					break;
				case "T":
					t = t.toUpperCase();
					t = t.substring(0,1);
					break;
				default:
					break;
			}
		}
	}	
	
	return t;
}

/*PARAMS:
dateStr, example: Wednesday, 25 Apr 2012 14:26:00
currentFormat, example: <wwww>, <dd> <mmm> <yyyy> <HH>:<nn>:<ss>

returns a json object that includes a javascript Date object

---
OR if the optional desiredFormat param is included...
---

dateStr, example: Wednesday, 25 Apr 2012 14:26:00
currentFormat, <wwww>, <dd> <mmm> <yyyy> <HH>:<nn>:<ss>
desiredFormat (optional), example: <www>, <m>/<d>/<yyy>, <h>:<nn> <TT>

returns a json object that includes a javascript Date object and a 
string in the desired date format, example: Wed, 4/25/'12, 2:26 PM
*/
function getDateFormat(dateStr, currentFormat, desiredFormat)
{	
	//STEP ONE: GET DATE OBJECT FROM CURRENT FORMAT
	
	currentFormat = getTrimStr(currentFormat);
	dateStr = getTrimStr(dateStr);
	dateStr += " "; //date strings always end with a space by default
	
	var openTag = "<";
	var closeTag = ">";
	
	//return values
	var returnDate = new Date();
	returnDate.setMilliseconds(0);
	returnDate.setSeconds(0);
	returnDate.setMinutes(0);
	returnDate.setHours(0);
	returnDate.setDate(1);
	returnDate.setMonth(0);
	returnDate.setFullYear(0);
	var returnStrFormat = "<ww>, <d> <mmm> <yyy>, <h>:<nn> <TT>"; //default desired format
	if (desiredFormat != undefined)
	{
		returnStrFormat = desiredFormat;
	}
	var returnStr = returnStrFormat;
	
	//for each format key in the current format
	var newCurrentFormat = currentFormat;
	var newDateStr = dateStr;
	var dateVal;
	var formatKey;
	var separator;
	var i = 0;
	var continueWhile = (newCurrentFormat.indexOf(openTag) != -1 && newCurrentFormat.indexOf(closeTag) != -1);
	while (continueWhile)
	{			
		//all format keys have not been removed from the format
		if (newCurrentFormat.length > 0) 
		{
			//get text before the next format key
			separator = newCurrentFormat.substring(0, newCurrentFormat.indexOf(openTag));
		}
		else
		{
			//date strings always end with a space by default
			separator = " ";
		}

		//if there was any text before the next format key open tag
		if (separator.length > 0)
		{
			//if this is not the first time in the loop
			if (i != 0)
			{
				//get the date value
				dateVal = newDateStr.substring(0, newDateStr.indexOf(separator));
				
				//remove this date value so it's not counted again
				newDateStr = newDateStr.replace(dateVal,"");
				
				//alert(formatKey + " = " + dateVal);
				//set the date object value
				returnDate = setDateObjParam(returnDate, formatKey, dateVal);
			}
			
			//remove the separator text from the date and format strings
			newDateStr = newDateStr.replace(separator,"");
			newCurrentFormat = newCurrentFormat.replace(separator,"");
		}
		
		//if there is a closing tag
		if (newCurrentFormat.indexOf(closeTag) != -1)
		{
			//get just this one format key
			formatKey = newCurrentFormat.substring(0, newCurrentFormat.indexOf(closeTag) + closeTag.length);
			
			//alert(formatKey);
			
			//strip off the format key
			newCurrentFormat = newCurrentFormat.replace(formatKey,"");
		}
		else //no closing tag
		{
			continueWhile = false;
		}
		
		i++;
	}
	
	//STEP 2: USE DATE OBJECT TO GET DESIRED DATE FORMAT
	
	returnStr = getDesiredDateFormat(returnDate, returnStrFormat);
	
	//STEP 3: POPULATE JSON OBJECT WITH RETURN VALUES
	
	//set up json object with the return values
	var returnVal = 
	{
		"obj": returnDate,
		"str": returnStr,
		"strFormat": returnStrFormat
	};
	
	return returnVal;
}

//returns a formatted date string that follows the specified date format
function getDesiredDateFormat(dateObj, desiredFormat)
{
	var openTag = "<";
	var closeTag = ">";
	var returnStr = desiredFormat;
	var continueWhile = (desiredFormat.indexOf(openTag) != -1 && desiredFormat.indexOf(closeTag) != -1);
	var formatKey;
	var dateVal;
	
	var nowDateObj = new Date();
	var nowDateVal;

	while (continueWhile)
	{	
		//get the next format key
		formatKey = getSubStrChunk(returnStr, openTag, closeTag);
		
		//if format key contains both an open and closing tag
		continueWhile = (formatKey.indexOf(openTag) != -1 && formatKey.indexOf(closeTag) != -1);
		if (continueWhile)
		{
			//get the date value for this key
			dateVal = getDesiredDateFormatValue(dateObj, formatKey);
			
			//if there is a command to suppress date values that equal now's date values
			if (formatKey.indexOf("!=") != -1)
			{
				//get the now date value for this key
				nowDateVal = getDesiredDateFormatValue(nowDateObj, formatKey);
				
				//if now value matches the other value
				if (dateVal == nowDateVal)
				{
					//delete the value
					dateVal = "";	
					
					//tack on the text separator, (before the next format key), 
					//to this format key so the separator gets removed along with this format key
					formatKey = getSubStrChunk(returnStr, formatKey, openTag);
					if (formatKey.charAt(formatKey.length - 1) == openTag)
					{
						formatKey = formatKey.substring(0, formatKey.length - 1);
					}
				}
			}
			
			//dateVal = openTag + dateVal + closeTag;
			
			//replace all of the key(s) that should be matched to this date value
			returnStr = replaceAllOfGivenChar(returnStr, formatKey, dateVal);
		}
	}
	
	return returnStr;
}
