
var AccountList = function() {};
			
AccountList.prototype.get = function(params, success, fail) {
	return PhoneGap.exec( function(args) {
		success(args);
	}, function(args) {
		fail(args);
	}, 'AccountList', '', [params]);
};

PhoneGap.addConstructor(function() {
	PhoneGap.addPlugin('AccountList', new AccountList());
});

















    touchMove = function(event) {
        event.preventDefault();
    }


/**
 * 
 * 
 * 
 * @return Object
 * 
 */

var Dialer = function() {
};

/**
 * @param phoneNumber,
 *            number to dial
 * @param successCallback
 *            The callback which will be called when dialing is successfull
 * @param failureCallback
 *            The callback which will be called when dialing is failed
 */
Dialer.prototype.dial = function(arguments, successCallback, failureCallback) {

	return PhoneGap.exec(successCallback, // Success callback from the plugin

	failureCallback, // Error callback from the plugin

	'DialerPlugin', // Tell PhoneGap to run "DirectoryListingPlugin" Plugin

	'dial', // Tell plugin, which action we want to perform

	[ arguments ]); // Passing list of args to the plugin

};

PhoneGap.addConstructor(function() {
	PhoneGap.addPlugin("dialer", new Dialer());

});

var ContactSelect = function() {
};

ContactSelect.prototype.show = function(successCallback, failCallback) {

	function success(args) {
		successCallback(args);
	}

	function fail(args) {
		failCallback(args);
	}

	return PhoneGap.exec(function(args) {
		success(args);
	}, function(args) {
		fail(args);
	}, 'ContactSelectPlugin', '', []);
};

PhoneGap.addConstructor(function() {
	PhoneGap.addPlugin('contactSelect', new ContactSelect());
	// PluginManager.addService("ContactSelectPlugin","com.ericsson.w3innovate.phonegap.plugin");
});

var openedDocumentId = null;



function openDocument(documentId) {
	console.log('Open document');
	if ((documentId == null) && (selectedIcon != null)) {
		documentId = getIconId(selectedIcon, DOCUMENT);
	}
	if (documentId == null) {
		return;
	}

    
	$.mobile.loadingMessage = 'Opening ' + documentId;
	$.mobile.showPageLoadingMsg();
	openedDocumentId = documentId;
	console.log('Opening document ' + openedDocumentId);

	var request = [ myUserName, "open", openedDocumentId ];
	doRequest(request, handleOpenReply);
}

function handleOpenReply(reply) {
	$.mobile.hidePageLoadingMsg();
	if (reply[0] != "ok") {
		setStatus("Open failed: " + reply[1]);
		openedDocumentId = null;
		itsOpenDocument=null;
		return;
	}
	var width = reply[1];
	var height = reply[2];
	var rows = reply[3];
	var cols = reply[4];
	console.log("Width: " + itsWidth);
	if (width > itsWidth) {
		console.log("Recalculating the size of the tiles");
		$('#tiletable').children().remove();
		var f = itsWidth / width;
		var widthTile = Math.floor(200 * f);
		var widthLastTile = itsWidth - (widthTile * (cols - 1));
		var heightTile = Math.floor(100 * f);
		var heightLastTile = (height - ((rows - 1) * 100)) * f;
		var widthLastTile = itsWidth - (widthTile * (cols - 1));
		var theRows = "";
		for ( var r = 0; (r < rows); ++r) {
			theRows += "<tr>";
			for ( var c = 0; (c < cols); ++c) {
				// <img id='tile@0_0' style="border: 0; display: block;"
				// src='http://smc.w3innovate.nl/smcServlet/vnc?doc=Time&r=0&c=0&rand=0'
				// width='100'></td>
				if (c == (cols - 1)) {
					w = widthLastTile;
				} else {
					w = widthTile;
				}
				if (r == (rows - 1)) {
					h = heightLastTile;
				} else {
					h = heightTile;
				}
				theRows += "<td><img id='" + tileId(r, c)
						+ "' style='border: 0; display: block;' src='"
						+ tileUrl(r, c) + "' width='" + w + "' height='" + h
						+ "'></td>";

			}
			theRows += "</tr>";
		}
		$('#tiletable').append(theRows);

	} else {
		$('#tiletable').children().remove();
		var theRows = "";
		for ( var r = 0; (r < rows); ++r) {
			theRows += "<tr>";
			for ( var c = 0; (c < cols); ++c) {
				// <img id='tile@0_0' style="border: 0; display: block;"
				// src='http://smc.w3innovate.nl/smcServlet/vnc?doc=Time&r=0&c=0&rand=0'
				// width='100'></td>
				theRows += "<td><img id='" + tileId(r, c)
						+ "' style='border: 0; display: block;' src='"
						+ tileUrl(r, c) + "'></td>";
			}
			theRows += "</tr>";
		}
		$('#tiletable').append(theRows);
		
	}
	console.log("Opening document viewer");
	$('#tiletable').css('cellspacing', '0');
	$('#tiletable').css('cellpadding', '0');
	$('#tiletable').css('border', '0');
	itsOpenDocument=openedDocumentId;
	activateTab_Meeting('tab-chat');
}

function handleTile(message) {
	var documentId = message[1];

	console.log('Handle tile for ' + documentId + ", " + openedDocumentId);
	if (documentId != openedDocumentId) {
		return;
	}

	var r = message[2];
	var c = message[3];
	console.log('Handle tile ' + r + ", " + c + ', ' + tileId(r, c) + ', '
			+ tileUrl(r, c));
	var tile = document.getElementById(tileId(r, c));
	if (tile != null) {
		tile.src = tileUrl(r, c);
	}
}

function tileId(r, c) {
	return "tile@" + r + "_" + c;
}

function tileUrl(r, c) {
	return "http://smc.w3innovate.nl/smcServlet/vnc?doc=" + openedDocumentId
			+ "&r=" + r + "&c=" + c + "&rand=" + Math.random();
}

function showViewer() {
	document.getElementById("tileview").style.display = "block";

	var viewer = document.getElementById("tileviewer");
	startListener(viewer, "mousedown", handleMouseDown);
	startListener(viewer, "mousemove", handleMouseMove);
	startListener(viewer, "mouseup", handleMouseUp);
	startListener(document, "keypress", handleKeyClick);
	mouseTimer = setInterval("checkMouseMove()", 200);
}

function closeDocument() {
	if (openedDocumentId != null) {
		var request = [ myUserName, "close", openedDocumentId ];
		doRequest(request, handleCloseReply);
	}
}

function handleCloseReply(reply) {
	openedDocumentId = null;
	$('#tiletable').children().remove();
}

/* Main 
 * depending : configuration.js
 * Author : Mario Goorden
 */

// Initialize configuration
var myConfig = null;// new Configuration();
var myUserName = "";
var myPassword = "";
var myPincode ="";
var myMeetingId = "";
var myDialingChoice = "";
var myLoginOption = '';
var myDialingNumber;

var myContacts = null;
var myMeetingTitle = "SMC Meeting";

var itsAutoLogin = true;
var itsWidth;
var itsHeight;
var itsHeaderHeight = 40;
var itsRoomImgWidth = 896;
var itsRoomImgHeight = 582;
var itsRoomUrl = null;
var itsRoomFactor = 1;
var itsInMeeting = false;
var itsLeavingMeeting = false;
var itsHeaderHeight = 0;

var itsStartScreenLoaded = false;

function navigateBack() {
	console.log("navback: " + window.device + ", " + device.platform);
	if (window.device && device.platform
			&& device.platform.toLowerCase() == 'android') {
		navigator.app.backHistory();
	} else {
		window.history.go(-1);
	}
}

function navigateExit() {
	console.log("navback: " + window.device + ", " + device.platform);
	if (window.device && device.platform
			&& device.platform.toLowerCase() == 'android') {
		navigator.app.exitApp();
	} else {
		window.history.go(-1);
	}
}

var deviceInfo = function(e) {

	document.getElementById("sys-event").innerHTML = e;
	if (typeof (device) != "undefined") {
		document.getElementById("sys-platform").innerHTML = device.platform;
		document.getElementById("sys-version").innerHTML = device.version;
		document.getElementById("sys-uuid").innerHTML = device.uuid;
		document.getElementById("sys-name").innerHTML = device.name;
	}

	document.getElementById("sys-width").innerHTML = screen.width;
	document.getElementById("sys-height").innerHTML = screen.height;
	document.getElementById("sys-innerwidth").innerHTML = window.innerWidth;
	document.getElementById("sys-innerheight").innerHTML = window.innerHeight;
	document.getElementById("sys-colorDepth").innerHTML = screen.colorDepth;
	document.getElementById("sys-orientation").innerHTML = (Math
			.abs(window.orientation) == 90) ? 'landscape' : 'portrait';
};

function check_network() {
	var networkState = navigator.network.connection.type;

	var states = {};
	states[Connection.UNKNOWN] = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI] = 'WiFi connection';
	states[Connection.CELL_2G] = 'Cell 2G connection';
	states[Connection.CELL_3G] = 'Cell 3G connection';
	states[Connection.CELL_4G] = 'Cell 4G connection';
	states[Connection.NONE] = 'No network connection';

	confirm('Connection type:\n ' + states[networkState]);
}

function updatePageLogin() {
	console.log('refresh page-login, ' + itsWidth + ', ' + itsHeight);
	console.log('refresh page-login, ' + screen.width + ', ' + screen.height);
	// if (itsWidth < 850) {
	// if ($('div.ui-grid-a').length > 0) {
	// $("div#grid-login").removeClass('ui-grid-a');
	// $("div#block-a-login").removeClass('ui-block-a');
	// $("div#page-login").find("div#empty").css('display', 'none');
	// $("div#page-login").find("div#line-login").css('display', 'inline');
	// $("div#block-b-login").removeClass('ui-block-b');
	// }
	// } else {
	// if ($('div.ui-grid-a').length == 0) {
	// $("div#grid-login").addClass('ui-grid-a');
	// $("div#page-login").find("div#empty").css('display', 'inline');
	// $("div#page-login").find("div#line-login").css('display', 'none');
	// $("div#block-a-login").addClass('ui-block-a');
	// $("div#block-b-login").addClass('ui-block-b');
	// }
	// }
	console.log('refresh page-login ready');
}

function updatePageStart() {
	console.log('height buton = ' + $('div#start-button').height());
	$('div#start-button-s').css('height',
			(3 * $('div#start-button').height()) + 'px');
	$('div#start-button-m').css('white-space', 'normal');

	$('div.start-button-o').css('height',
			(2 * $('div#start-button').height()) + 'px');
	// console.log('refresh page-start ready');
	$('div.start-button-m').css('height',
			(2 * $('div#start-button').height()) + 'px');
	console.log('refresh page-start ready');
}

function updatePageMeeting() {
	console.log('updatePageMeeting');
	if ($('div#tab-contacts').is(':visible')) {
		console.log('updateTab-contacts');
		$("div#tab-contacts").css('padding', '0');
		$("div#tab-contacts").css('margin', '0');
		// $("div#tab-contacts").css('position','absolute');
		$("div#tab-contacts").css('top', '0px');
		$("div#tab-contacts").css('left', '0px');
		$("div#tab-contacts").css('width', '100%');
	}
	if ($('div#tab-invite').is(':visible')) {
		console.log('updateTab-invite');
		$("div#tab-invite").css('padding', '0');
		$("div#tab-invite").css('margin', '0');
		// $("div#tab-invite").css('position','absolute');
		$("div#tab-invite").css('top', '0px');
		$("div#tab-invite").css('left', '0px');
		$("div#tab-invite").css('width', '100%');
	}
	if ($('div#tab-contact').is(':visible')) {
		console.log('updateTab-contact');
		$("div#tab-contact").css('padding', '0');
		$("div#tab-contact").css('margin', '0');
		// $("div#tab-contact").css('position','absolute');
		$("div#tab-contact").css('top', '0px');
		$("div#tab-contact").css('left', '0px');
		$("div#tab-contact").css('width', '100%');
	}

	if ($('div#tab-room').is(':visible')) {
		console.log('updateTab-room' + $('div#header-meeting').height());

		$("div#tab-room").css('padding', '0');
		$("div#tab-room").css('margin', '0');

		var theOldRoomFactor = itsRoomFactor;
		var theOldHeaderHeight = itsHeaderHeight;
		// document.ontouchmove = function(event) {
		// event.preventDefault();
		// };
		itsWrapperWidth = itsWidth;
		itsWrapperHeight = itsHeight - $('div#header-meeting').height(); // Landscape
		itsHeaderHeight = $('div#header-meeting').outerHeight();
		itsHeaderHeight = $('div#header-meeting').height();
		itsRoomFactor = itsWrapperWidth / itsRoomImgWidth;
		if ((itsRoomImgHeight * itsRoomFactor) <= itsWrapperHeight) {

			$("div#meeting").css(
					'background-size',
					itsWrapperWidth + 'px '
							+ Math.round(itsRoomImgHeight * itsRoomFactor)
							+ 'px');

			$("div#meeting").css('width', itsWrapperWidth + 'px');
			$("div#meeting").css('height',
					Math.round(itsRoomImgHeight * itsRoomFactor) + 'px');

		} else {
			itsRoomFactor = itsWrapperHeight / itsRoomImgHeight;
			$("div#meeting").css(
					'background-size',
					Math.round(itsRoomImgWidth * itsRoomFactor) + 'px '
							+ itsWrapperHeight + 'px');
			$("div#meeting").css('width',
					Math.round(itsRoomImgWidth * itsRoomFactor) + 'px');
			$("div#meeting").css('height', itsWrapperHeight + 'px');

		}
		console.log('roomFactor: ' + itsRoomFactor + ", " + theOldRoomFactor);
		console.log('move children');
		if (theOldRoomFactor != itsRoomFactor) {
			redrawIcons(itsRoomFactor);
		}
		// $('div#meeting').offset({ top: $('div#header-meeting').outerHeight(),
		// left: 0 });
	}
}

function updateOrientation(e) {
	setTimeout(function(a) {
		// deviceInfo('updateOrientation');
		if ($.mobile != undefined) {
			if ($.mobile.activePage != undefined) {
				var currentPageId = $.mobile.activePage.attr('id');
				console.log('Orientation changed: ' + window.orientation
						+ " on " + currentPageId);
				// Phonegap error
				itsWidth = window.innerWidth;
				itsHeight = window.innerHeight;

				console.log('Orientation changed: o' + window.orientation
						+ ', w' + itsWidth + ", h" + itsHeight + "(sw"
						+ screen.width + ",sh" + screen.height + ")");

				if (currentPageId == 'page-login') {
					updatePageLogin();
				}
				if (currentPageId == 'page-start') {
					// updatePageStart();
				}
				if (currentPageId == 'page-meeting') {
					updatePageMeeting();
				}
			}
		}
	}, 500);

}

function pageBeforeChange(event, data) {
	var pageTo;
	if (typeof data.toPage === "string") {
		// console.log('document, pagechange event to ' + data.toPage[0].id);
		pageTo = data.toPage;
	} else {
		pageTo = data.toPage.attr('id');
	}
	console.log('document, page Before Change event to :' + pageTo);
	if ($.mobile.activePage != undefined) {
		console.log('document, current page is: '
				+ $.mobile.activePage.attr('id'));
		if (pageTo == 'page-leave' && itsLeavingMeeting == false) {

			if ($.mobile.activePage.attr('id') == 'page-meeting') {
				$('div#content-leave').show();
			}
		}
		if (pageTo == 'page-start') {

			if ($.mobile.activePage.attr('id') == 'page-leave') {
				leaveMeeting();
			}
		}

	}

}

function pageChange(event, data) {
	var pageTo;
	var theType = '1';
	if (typeof data.toPage === "string") {
		// console.log('document, pagechange event to ' + data.toPage[0].id);
		pageTo = data.toPage;
	} else {
		pageTo = data.toPage.attr('id');
		theType = '2';
	}
	console.log('document, pageChange event to ' + pageTo + ", " + theType
			+ ', inMeeting: ' + itsInMeeting);
	if (pageTo == 'page-login' && itsAutoLogin == true) {
		itsAutoLogin = false;
		if (myLoginOption=='login-option-user' && myUserName.length > 0 && myPassword.length > 0) {
			startLogin();
		}
	}
	if (pageTo == 'page-meeting' && itsInMeeting == false) {
		itsInMeeting = true;
		handleInitMeeting();
		console.log('document, pageChange end init meeting');
	}
	if (pageTo == 'page-leave' && itsInMeeting == false) {
		$.mobile.changePage('#page-meeting');
	}
	if (pageTo == 'page-leave' && itsLeavingMeeting == true) {
		itsLeavingmeeting = false;
		navigateBack();
	}

	if (pageTo == 'page-start') {
		itsStartScreenLoaded = true;
		itsInMeeting = false;
		itsLeavingMeeting = false;
		$('div#content-leave').hide();
	}
	updateOrientation(null);
}

/*
 * Init scripts when ready loading pages
 * 
 */
function main_init() {
	console.log('body loaded, main_init()');
	// document.ontouchmove = function(event) {
	// event.preventDefault();
	// };
	document.addEventListener("deviceready", function(e) {
		// $.mobile.page.prototype.options.domCache = false;
		console.log('device ready');

		// Retrieve email address, only android
		window.plugins.AccountList.get({
		// type : 'com.google' // if not specified get all accounts
		// google account example: 'com.google'
		}, function(result) {
			console.log('account: ' + result.length);
			for (i in result)
				console.log('account: ' + result[i]);
		}, function(error) {
			console.log('account: ' + error);
		});

		myConfig = new Configuration();
		console.log('update orientation');
		updateOrientation(null);
		console.log("Window orientation: " + window.orientation);
		// $('window').bind('orientationchange', updateOrientation);
		window.addEventListener("orientationchange", updateOrientation, true);
		$(document).bind('pagebeforechange', pageBeforeChange);

		$(document).bind('pagechange', pageChange);

		// window.addEventListener("updatelayout", updateOrientation, true);
		// document.addEventListener("orientationchange", updateOrientation);
		// $.mobile.changePage("#page-login", {
		// reverse : true,
		// changeHash : true,
		// transition: 'slidedown',
		// }, true, true);

		// Load configuration
		myConfig.load(config_ready);
	}, true);

	function config_ready(aResult) {
		console.log('devicename: ' + device.name + ', ' + device.platform + ', ' + device.version + ', ' + device.uuid);

		console.log("config init " + aResult);
		$("#login-option-tryit").bind("change", function(event, ui) {
			$('div#guest-fields').hide();
			$('div#user-fields').hide();
			myLoginOption = 'login-option-tryit';
		});
		$("#login-option-guest").bind("change", function(event, ui) {
			$('div#user-fields').hide();
			$('div#guest-fields').show();
			myLoginOption = 'login-option-guest';
		});
		$("#login-option-user").bind("change", function(event, ui) {
			$('div#guest-fields').hide();
			$('div#user-fields').show();
			myLoginOption = 'login-option-user';
		});

		myUserName = myConfig.get("username");
		$('#username').val(myUserName);

		myPassword = myConfig.get("password");
		$('#password').val(myPassword);

		myDialingChoice = myConfig.get("loginChoice");
		if (myDialingChoice == null || myDialingChoice == 'undefined') {
			myDialingChoice = 'login-choice-1';
		}
		//$("#" + myDialingChoice).attr("checked", true).checkboxradio("refresh");
		$("#" + myDialingChoice).attr("checked", true);
		console.log('dialingchoice login ' + myDialingChoice);

		myLoginOption = myConfig.get("loginOption");
		console.log('loginOption login ' + myLoginOption);
		if (myLoginOption == null || myLoginOption == 'undefined') {
			myLoginOption = 'login-option-tryit';
		}
		
		$("#" + myLoginOption).attr("checked", true).checkboxradio("refresh");
		$("#" + myLoginOption).attr("checked", true);
		$("#" + myLoginOption).trigger('change');
		console.log('loginOption login ' + myLoginOption);

		

		console.log("config " + myUserName + ", " + myPassword);
		// $.mobile.changePage("#page-simple", {}, true, true);

		//get_contacts();
		$.mobile.changePage("#page-login", {}, true, true);

	}
	console.log('body loaded, main_init ready');
	// $.mobile.changePage("#page-login", {}, true, true);
}


/* Configuration class
 * Permanent configuration management on the device
 * Author: Mario Goorden
 */

function Configuration() {
	var that = this;
	var config = {};
	var db = null;
	var fnResult;
	var config_org = {};

	function duplicateConfig() { // private efunction
		for ( var id in config) {
			config_org[id] = config[id];
		}
	}

	function populateDB(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS CMC (id unique, data)');
	}

	function errorCB(err) {
		console.log("config: Error processing SQL: " + err.code);
		fnResult(false);
	}

	function successCB() {
		console.log("config: successfully opened database");
		db.transaction(function(tx) {
			tx.executeSql("select id, data from CMC", [], renderEntries,
					errorCB);
		}, errorCB, successCB1);
	}

	function successCB1() {
		console.log("config: successfully read data from database");
		fnResult(true);
	}

	function renderEntries(tx, results) {
		console.log("render configuration");
		if (results.rows.length > 0) {
			for ( var i = 0; i < results.rows.length; i++) {
				console.log("render configuration " + results.rows.item(i).id
						+ ", " + results.rows.item(i).data);
				config[results.rows.item(i).id] = results.rows.item(i).data;
			}
		}
		duplicateConfig();
	}

	this.load = function(aFnResult) {
		config_org = {};
		config= {};
		console.log("config: open database CMC");
		fnResult = aFnResult;
		db = window.openDatabase("CMC", "1.0", "SMC DB", 1000000); 
		if (db != null) {
			db.transaction(populateDB, errorCB, successCB);
		} else {
			var err = new Object();
			err.code = "Unable to open database";
			errorCB(err);
		}
	};

	this.get = function(id) {
		if (config[id] != undefined)
			return config[id];
		else
			return null;
	};

	this.set = function(id, data) {
		config[id] = data;
	};

	function nullHandler() {
	}
	;

	function dbErrorSave(err) {
		console.log("config (save): Error processing SQL: " + err.code);
	}

	this.save = function() {
		if (db != null) {
			console.log("config (save): start saving");
			db.transaction(function(tx) {
				for ( var id in config) {
					console.log('check ' + config_org[id]);
					if (config_org[id] == undefined || config_org[id] == null) {
						console.log("config (save): insert " + id + " : " + config[id]);
						tx.executeSql("insert into CMC (id,data) values(?,?)",
								[ id, config[id] ]);
					} else {
						console.log("config (save): update " + id + " : " + config[id]);
						tx.executeSql("update CMC set data=? where id=?", [
								config[id], id ]);
					}
				}
				duplicateConfig();
			}, dbErrorSave, nullHandler);
		
		} else {
			console.log("config (save): failed saving, db=null");
		}
	};
}


var myInvitation;
var myInvitationIndex;
var mySelectedId;

function contacts_fail(aMessage) {
	console.log("Contacts failed:" + aMessage);
}

function contacts_success(contacts) {
	myContacts = contacts;
	console.log(contacts.length + ' contacts returned.');
	var theBooleanEmail = false;
	var theInviteList = $('ul#list-contacts'); // text(reply[1]);
	if (theInviteList.children().size() > 0) {
		theInviteList.children().remove('li');
	}
	// theInviteList
	// .append("<li id=' ' data-icon='false'
	// email=''><p><Strong>Anyone</strong</p><p><strong>.</strong></p><p
	// class='ui-li-aside'>Invite</p></li>");
	var counter;
	console.log('invite: Number of contacts=' + contacts.length);
	for (counter = 0; counter < contacts.length; counter++) {
		if (theBooleanEmail == true) {
			if (contacts[counter].emails != null) {
				if (contacts[counter].emails.length > 0
						&& contacts[counter].emails[0].value != "") {
					{

						var theEmail = contacts[counter].emails[0].value
								.split('@');
						if (contacts[counter].displayName != null) {
							var theDisplayName = contacts[counter].displayName;
							if (theDisplayName.search('@') > 0) {
								var theSplit = theDisplayName.split('@');
								theDisplayName = theSplit[0]
										+ "<strong>@</strong>" + theSplit[1];
							}
							theInviteList
									.append("<li id='"
											+ theDisplayName
											+ "' data-icon='false' email='"
											+ contacts[counter].emails[0].value
											+ "'><p><Strong>"
											+ theDisplayName
											+ "</strong</p><p>"
											+ theEmail[0]
											+ "<strong>@</strong>"
											+ theEmail[1]
											+ "</p><p class='ui-li-aside'>Invite</p></li>");
						} else {
							theInviteList
									.append("<li id='"
											+ contacts[counter].emails[0].value
											+ "' data-icon='false' email='"
											+ contacts[counter].emails[0].value
											+ "'><p><strong>"
											+ theEmail[0]
											+ "<strong>@</strong>"
											+ theEmail[1]
											+ "</strong></p><p class='ui-li-aside'>Invite</p></li>");
						}
					}
				}
			}
		} else {
			theInviteMethod = "SMS";
			if (myLoginOption == 'login-option-user') {
				theInviteMethod = "Dial";
			}
			if (contacts[counter].phoneNumbers != null) {
				if (contacts[counter].phoneNumbers.length > 0) {
					{
						var thephoneNumber = contacts[counter].phoneNumbers[0].value;
						if (contacts[counter].displayName != null) {
							var theDisplayName = contacts[counter].displayName;
							if (theDisplayName.search('@') > 0) {
								var theSplit = theDisplayName.split('@');
								theDisplayName = theSplit[0]
										+ "<strong>@</strong>" + theSplit[1];
							}
							theAppend = "<li name='" + theDisplayName
									+ "' id ='" + contacts[counter].id
									+ "' data-icon='false'><p><Strong>"
									+ theDisplayName + "</strong</p>";
						} else {
							theAppend = "<li name='"
									+ contacts[counter].phoneNumbers[0].value
									+ "' id ='" + contacts[counter].id
									+ "' data-icon='false'>";
						}
						for (i = 0; i < contacts[counter].phoneNumbers.length; i++) {
							theAppend += "<p>"
									+ contacts[counter].phoneNumbers[i].value
									+ "</p>";
						}
						theAppend += "<p class='ui-li-aside'>"
								+ theInviteMethod + "</p></li>";
						theInviteList.append(theAppend);
					}
				}
			}

		}
	}
	$('#list-contacts li').tsort('', {
		attr : 'name',
		order : "asc"
	});
	// refresh listview

	// theInviteList
	// .prepend("<li id='Any'
	// data-icon='false'><p><Strong>Any</strong</p><p>...</p><p
	// class='ui-li-aside'>Dial</p></li>");

	$('#list-contacts').delegate('li', 'vclick', function(e) {
		e.stopImmediatePropagation();
		e.preventDefault();
		mySelectedId = $(this).attr('id');
		if (mySelectedId == 'Any') {
			window.plugins.contactSelect.show(function(contact) {
				alert("contact: " + contact.name + ", " + contact.phone);
			}, function(fail) {
				alert("We were unable to get the contact you selected.");
			});
		}
		console.log("click: " + mySelectedId);
		myInvitation = $(this);
		showDialContact(mySelectedId);
		return (false);
	});

	theInviteList.listview('refresh');
}

function get_contacts() {
	var obj = new ContactFindOptions();
	obj.filter = "";
	obj.multiple = true;
	// navigator.contacts.find(
	// [ "*" ],
	// contacts_success, contacts_fail, obj);
	navigator.contacts.find([ "id", "displayName", "name", "emails",
			"phoneNumbers" ], contacts_success, contacts_fail, obj);

}

// function showContact(aId) {
// $('div#tab-contact label').text('Send invitation to ' + aId);
// $('div#tab-contacts').hide();
// $('div#tab-contact').show();
// updatePageMeeting();
// }

function showDialContact(aId) {
	var obj = new ContactFindOptions();
	obj.filter = aId;
	obj.multiple = true;
	// navigator.contacts.find(
	// [ "*" ],
	// contacts_success, contacts_fail, obj);
	navigator.contacts.find([ "id", "displayName", "name", "emails",
			"phoneNumbers" ], contact_success, contact_fail, obj);
}

function contact_success(contacts) {
	theIndex = 0;
	for (counter = 0; counter < contacts.length; counter++) {
		if (contacts[counter].id == mySelectedId) {
			theIndex = counter;
		}

	}
	if (myLoginOption == 'login-option-user') {
		$('#dial-label').text('Dial');
	} else {
		$('#dial-label').text('SMS');
	}
	$('#dial_name').val(contacts[theIndex].displayName);
	$('#dial_phonenr').val('');
	// Radio button
	$('fieldset#select-phone-nr').children().remove();
	$('fieldset#select-phone-nr').append('<legend>PhoneNumber</legend>');
	for (i = 0; i < contacts[theIndex].phoneNumbers.length; i++) {
		$('fieldset#select-phone-nr')
				.append(
						'<input type="radio" name="select-phone-nr" id="select-phone-nr'
								+ i + '" value="'
								+ contacts[theIndex].phoneNumbers[i].value
								+ '" /> <label for="select-phone-nr' + i + '">'
								+ contacts[theIndex].phoneNumbers[i].value
								+ '</label>');
	}
	$('input[name=select-phone-nr]').change(function() {
		theValue = $('input[name=select-phone-nr]:checked').val();
		$('#dial_phonenr').val(theValue);
	});
	$("#select-phone-nr0").attr("checked", true);
	$('input[name=select-phone-nr]').trigger('change');

	// Select
	// $('select#select-phone-number').children().remove();
	// if (contacts[0].phoneNumbers != null && contacts[0].phoneNumbers.length >
	// 0) {
	// $('#dial_phonenr').val(contacts[0].phoneNumbers[0].value);
	// for (i = 0; i < contacts[0].phoneNumbers.length; i++) {
	// $('select#select-phone-number').append(
	// '<option value="' + contacts[0].phoneNumbers[i].value
	// + '">' + contacts[0].phoneNumbers[i].value
	// + '</option>');
	// }
	// }
	// $('select#select-phone-number').change(function() {
	// $('#dial_phonenr').val($(this).attr('value'));

	// });

	$('ul#list-contacts').hide();
	$('div#invite-contact').hide();
	$('select#select-phone-number').selectmenu("refresh");

	$("#page-meeting").trigger("create");
	$('div#dial-contact').show();

	$.mobile.silentScroll(0);
}

function contact_fail(aMessage) {
	console.log("Contact failed:" + aMessage);
}

function showDialCancel(aId) {
	$('div#dial-contact').hide();
	$('ul#list-contacts').show();
	$.mobile.silentScroll(0);
}

function showContact(aId) {
	// $('label#invite-label').text('Send invitation to ' +
	// myInvitation.attr('email'));

	$('#invite_name').val(myInvitation.attr('id'));
	$('#invite_email').val(myInvitation.attr('email'));
	$('ul#list-contacts').hide();
	$('div#invite-contact').show();
	$.mobile.silentScroll(0);
}

// function showContactCancel(aId) {
// $('div#tab-contact label').text('Send invitation to ' + aId);
// $('div#tab-contact').hide();
// $('div#tab-contacts').show();
// updatePageMeeting();
// }

function showContactCancel(aId) {
	$('div#invite-contact').hide();
	$('ul#list-contacts').show();
	$.mobile.silentScroll(0);
}

function dialContact() {

	console.log("send invitation " + myUserName + ", " + myMeetingId + ", "
			+ $('#invite_email').val());
	$.mobile.loadingMessage = 'Sending the SMS invitation';
	var request = [ myUserName, "invite", myMeetingId,
			$('#dial_phonenr').val(), "", $('#dial_name').val(), myMeetingTitle ];
	if (myLoginOption == 'login-option-user') {
		$.mobile.loadingMessage = 'Dialing the selected user';
		request = [ myUserName, "dial_contact", myMeetingId,
				$('#dial_phonenr').val(), "", $('#dial_name').val(),
				myMeetingTitle ];
	}
	$.mobile.loadingMessageTextVisible = true;
	$.mobile.showPageLoadingMsg();
	doRequest(request, handleSendContactReply);
}

function handleSendContactReply(reply) {
	$.mobile.hidePageLoadingMsg();
	console.log("sendContactreply :" + reply[1]);
	if (reply[0] != "ok") {
		alert(reply[1]);
	} else {
		showDialCancel();
	}
}

// function showContacts() {
// // $('ul#list-invite').listview('refresh');
// // $.mobile.changePage("#page-contacts", {}, true, true);
// $('div#header-meeting').hide();
// $('div#tab-room').hide();
// $('div#tab-chat').hide();
// $('div#tab-share').hide();
// $('div#footer-meeting').hide();
// $('div#tab-contacts').show();
// updatePageMeeting();
// }

function onContactsCancel() {
	$('div#tab-contacts').hide();
	$('div#header-meeting').show();
	$('div#footer-meeting').show();
	activateTab_Meeting('tab-room');
}

function showInvite() {
	$('div#header-meeting').hide();
	$('div#tab-room').hide();
	$('div#tab-chat').hide();
	$('div#tab-share').hide();
	$('div#footer-meeting').hide();
	$('div#tab-invite').show();
	updatePageMeeting();
}

function showInviteCancel() {
	$('div#tab-invite').hide();
	$('div#header-meeting').show();
	$('div#footer-meeting').show();
	activateTab_Meeting('tab-room');
	updatePageMeeting();
}

function sendInvite() {
	$.mobile.loadingMessage = 'Sending the invitation';
	$.mobile.loadingMessageTextVisible = true;
	$.mobile.showPageLoadingMsg();

	var invitationName = $('#invite_name').val();
	var invitationEmail = $('#invite_email').val();

	console.log("send invitation " + myUserName + ", " + myMeetingId + ", "
			+ invitationName);

	var request = [ myUserName, "invite", myMeetingId, "", invitationEmail,
			invitationName, myMeetingTitle ];

	doRequest(request, handleSendInviteReply);
}

function handleSendInviteReply(reply) {
	$.mobile.hidePageLoadingMsg();
	console.log("sendInviteReply :" + reply[1]);
	if (reply[0] != "ok") {
		Alert(reply[1]);
	} else {
		showInviteCancel();
	}
}


var SELECTED_COLOR = findColor(".icon-selected", "yellow");
var DOC_COLOR = findColor(".icon-doc", "blue");

var USER = "user@";
var DOCUMENT = "document@";
var BALLOON = "balloon@";
var TALKING = "talking@";
var itsTime = null;

var itsBaseUrl = "http://smc.w3innovate.nl";

var requestObject = null;
var requestHandler = null;
var itsDisplayName = null;
var itsIconUrl = null;
var itsPhono = null;
var itsCall = null;
var itsMute = false;
var itsPhoneAnswered = false;
var itsShowDialingProgress = false;
var itsOpenDocument = null;

var itsActiveTab = null;
var eventsObject = null;
var eventsHandler = {
	"user" : handleUser,
	"document" : handleDocument,
	"active" : handleActive,
	"focus" : handleFocus,
	"tile" : handleTile,
	"hide" : handleHide,
	"disconnect" : handleDisconnect
};

// var connectedUserId = null;

var focusingUserId = null;
var selectedIcon = null;
var movingIcon = null;
var docIcon = null;
var mouseX = 0;
var mouseY = 0;
var deltaDownX = 0;
var deltaDownY = 0;
var mouseMask = 0;
var mouseMoved = false;
var mouseTimer = null;
var seqNo = 0;

// Screen div proportions

document.addEventListener('DOMContentLoaded', setTimeout(function() {
	loaded();
}, 200), false);

$.mobile.page.prototype.options.domCache = false;

$(document).ready(function() {
	$('#settings').click(function() {
		// alert('Button has been clicked');
		$('div.content_div').hide();
		$('div#tab-bar').hide();
		$('div#tab-settings').show();
	});
});

function loaded() {

	$('a#tab-room').removeClass('ui-btn-active');
	$('a#tab-share').removeClass('ui-btn-active');
	$('a#tab-chat').removeClass('ui-btn-active');
}

function activateTab_Meeting(activeTab) {
	// $(this).addClass('ui-btn-active');
	console.log("activate tab: " + activeTab);
	if (itsActiveTab == 'tab-room') {
		$('div#meeting').unbind('vmousemove');
		$('div#meeting').unbind('vmousedown');
		$('div#meeting').unbind('vmouseup');
		$('div#meeting').unbind('tap');
	}
	if (activeTab == 'tab-room') {
		document.ontouchmove = function(event) {
			console.log('onTouchMove event');
			if ($.mobile.activePage.attr('id') == 'page-meeting') {
				if ($('a#tab-room').find('ui-btn-active').length > 0) {
					event.preventDefault();
				}
			}
		};
		$('div#meeting').bind('vmousemove', handleVMouseMove);
		$('div#meeting').bind('vmousedown', handleVMouseDown);
		$('div#meeting').bind('vmouseup', handleVMouseUp);
		$('div#meeting').bind('tap', handleDoubleClick);
	}

	$('a#tab-room').removeClass('ui-btn-active');
	$('a#tab-share').removeClass('ui-btn-active');
	$('a#tab-chat').removeClass('ui-btn-active');
	$('a#' + activeTab).addClass('ui-btn-active');
	$('div#tab-room').hide();
	$('div#tab-chat').hide();
	$('div#tab-share').hide();

	if (activeTab != null) {
		$('div#' + activeTab).show();
	}
	itsActiveTab = activeTab;
	$.mobile.silentScroll(0);
}

$('div[id="tab-bar"] a').live('click', function() {
	// $(this).addClass('ui-btn-active');
	activeTab = $(this).attr('data-href');
	if (activeTab == 'tab-chat' && itsOpenDocument == null) {
		alert('No document opened');
		activateTab_Meeting(itsActiveTab);
	} else {
		activateTab_Meeting(activeTab);
	}

});

function startGuestLogin() {
	$.mobile.loadingMessageTextVisible = true;
	$.mobile.loadingMessage = 'Guest login';
	$.mobile.showPageLoadingMsg();
	var request = [ myPincode, "connect_on_invitation", device.name,
			device.platform, device.version, device.uuid, myDialingChoice ];
	doRequest(request, handleStartGuestLoginReply);
}

function showDialogVoice() {
	$.mobile.changePage("#dialog-voice", {
		role : 'dialog',
	});
}

function okDialogVoice() {
	myDialingChoice = $('input[name=login_choice]:checked').val();
	console.log('myDialingChoice ' + myDialingChoice + ", "
			+ $('input[name=login_choice]:checked').attr('id'));
	myConfig.set("loginChoice", $('input[name=login_choice]:checked')
			.attr('id'));
	myConfig.save();
	navigateBack();
}

function handleStartGuestLoginReply(reply) {
	$.mobile.hidePageLoadingMsg();
	if (reply[0] != "ok") {
		$('div#dialog-warning label').text(reply[1]);
		$.mobile.changePage("#dialog-warning", {
			role : 'dialog',
		});
	} else {
		console.log("User " + reply[1] + " logged in with number " + reply[2]);
		// showMeetingTab();
		itsRoomUrl = itsBaseUrl + reply[3];
		itsRoomImgWidth = reply[4];
		itsRoomImgHeight = reply[5];
		myDialingNumber = reply[2];
		myUserName = reply[1];
		handleStartMeeting();
	}
}

function startLogin() {
	myPincode = $('#pincode').val();
	myUserName = $('#username').val();
	myPassword = $('#password').val();
	myDialingChoice = $('input[name=login_choice]:checked').val();
	myLoginOption = $('input[name=login-option]:checked').attr('id');
	console.log('myLoginOption ' + myLoginOption);
	console.log('myDialingChoice ' + myDialingChoice + ", "
			+ $('input[name=login_choice]:checked').attr('id'));
	myConfig.set("loginChoice", $('input[name=login_choice]:checked')
			.attr('id'));
	myConfig.set("loginOption", myLoginOption);
	get_contacts();
	if (myLoginOption == 'login-option-tryit') {
		myConfig.save();
		myUserName = device.uuid;
		$.mobile.loadingMessageTextVisible = true;
		$.mobile.loadingMessage = 'Try it';
		$.mobile.showPageLoadingMsg();

		var request = [ myUserName, "authenticate_on_try" ];
		doRequest(request, handleAuthenticateOnTryReply);
		// getInvitations();
	}

	else if (myLoginOption == 'login-option-guest') {
		myConfig.save();
		if (myPincode.length > 0) {
			startGuestLogin();
		}
	} else {
		myConfig.set("username", myUserName);
		myConfig.set("password", myPassword);
		myConfig.save();
		// $('div#footer-meeting label').text(myUserName);
		// $('div#footer-meeting h1').css('font-size','1em');
		// $('div#footer-start h1').text(myUserName);

		$.mobile.loadingMessageTextVisible = true;
		$.mobile.loadingMessage = 'Login ' + myUserName;
		$.mobile.showPageLoadingMsg();

		var request = [ myUserName, "authenticate", myPassword ];
		doRequest(request, handleAuthenticateReply);
	}
}

function handleAuthenticateOnTryReply(reply) {
	console.log("AuthenticateOnReply response: " + reply[0]);
	if (reply[0] != "ok") {
		$.mobile.hidePageLoadingMsg();
		$('div#dialog-warning label').text(reply[1]);
		$.mobile.changePage("#dialog-warning", {
			role : 'dialog',
		});
	} else {
		getInvitations();
	}
}

function handleAuthenticateReply(reply) {
	console.log("Authenticate response: " + reply[0]);
	if (reply[0] != "ok") {
		$.mobile.hidePageLoadingMsg();
		$('div#dialog-warning label').text(reply[1]);
		$.mobile.changePage("#dialog-warning", {
			role : 'dialog',
		});
	} else {
		itsDisplayName = reply[1];
		itsIconUrl = reply[2];
		// $.mobile.changePage("#page-start", {}, true, true);
		var request = [ myUserName, "disconnect" ];
		doRequest(request, handleNoConnectReply);
	}
}

function handleNoConnectReply(reply) {
	getInvitations();
}

function getInvitations() {
	var theDate = new Date();
	var itsTime = theDate.getTime();
	var request = [ myUserName, "get_invitations", myPassword ];
	doRequest(request, handleGetInvitationsReply);
}

function handleGetInvitationsReply(reply) {
	if (reply[0] != "ok") {
		$.mobile.hidePageLoadingMsg();
		$('div#dialog-warning label').text(reply[1]);
		$.mobile.changePage("#dialog-warning", {
			role : 'dialog',
		});
	} else {

		// $('div#page-start').empty();

		if ($('div#page-start').length == 0) {

			var theNewPage = $("<div id='page-start' data-role='page'  data-url=yay data-theme='e'>"
					+ "<div id='header-start' data-role='header' data-position='fixed' data-tap-toggle='false' data-theme='e'>"
					+ "<a href='#' data-icon='back' data-iconpos='left' class='ui-btn-left' onClick='navigateBack();'>Back</a><h1>SMC</h1>"
					+ "<a href='#' data-icon='gear' data-iconpos='notext' data-rel='dialog' data-transition='fade' onclick='showDialogVoice();'>Settings</a>"
					+ "</div>"
					+ "<div data-role='content' ><ul data-role='listview' id='content-start'></ul></div></div>");
			// theContentPageStart.children().remove();
			theNewPage.appendTo($.mobile.pageContainer);
		} else {
			$('ul#content-start').children().remove('li');
		}

		var theContentPageStart = $('ul#content-start');

		// theContentPageStart.append("<li><div id='turner'>" + "</div></li>");
		console.log("IconUrl:" + itsIconUrl);
		// theContentPageStart
		// .append("<li onclick='startMyMeeting();' style='height:100;'><p
		// class='listview-invitation'><img src='" + itsBaseUrl
		// + itsIconUrl + "' height='80' width='80' /></p>"
		// + "<h3>My Meeting</h3><p>" + itsDisplayName + "</p>"
		// + "</li>");
		if (myLoginOption == 'login-option-user') {
			theContentPageStart
					.append("<li onclick='startMyMeeting();'><img src='"
							+ itsBaseUrl + itsIconUrl
							+ "' height='80' width='80' />"
							+ "<h3>My Meeting</h3><p>" + itsDisplayName
							+ "</p>" + "</li>");
		}
		// theContentPageStart
		// .append("<li><p class='listview-invitation'><img
		// src='icons/invitation.png'
		// /></p>"
		// + "<h3>Planned Meeting: by Jan van der Meer</h3><p><b>Standup
		// meeting</b></p><p><i>2016-may-14 12:13</i></p>"
		// + "<p>0 attendants<br><br></p><p><br></p>" + "</li>");

		var theInvitations = reply[1];
		// if (theInvitations.length == 0) {
		// theContentPageStart
		// .append("<li>"
		// + "<img src='icons/invitation.png' />"
		// + "<div id='list-current'><h3>None planned</h3><p><b>No planned
		// meetings</b></p></p></div>"
		// + "</li>");
		// } else {
		// var theInvitation = theInvitations[0];
		// var theCurrentTime = new Date();
		// var theStartTime = new Date(theInvitation.starttime);
		// theTimeBeforeStart = (theCurrentTime - theStartTime) / 60000;
		// if (((theStartTime - (5 * 60000)) - theCurrentTime) > 0) {
		// theContentPageStart
		// .append("<li>"
		// + "<img src='icons/invitation.png' />"
		// + "<div id='list-current'><h3>Current meeting</h3><p><b>"
		// + theInvitation.subject + "</b></p></p></div>"
		// + "</li>");
		// } else {
		// theContentPageStart.append("<li id='list-current>"
		// + "<img src='icons/invitation.png' />"
		// + "<h3>Coming meeting</h3>" + "<p>Starting in "
		// + theTimeBeforeStart + " minutes</p>" + "<p><b>"
		// + theInvitation.subject + "</b></p>" + "</li>");
		// }
		if (theInvitations.length > 0) {

			for ( var i = 0; i < theInvitations.length; i++) {
				var theInvitation = theInvitations[i];
				var theStartTime = new Date(theInvitation.starttime);
				var theEndTime = new Date(theInvitation.endtime);
				var theDuration = (theEndTime - theStartTime) / 60000;
				console.log("Invitation " + theInvitation.invitationid + ", "
						+ theInvitation.invitor + ", " + theInvitation.subject
						+ ", " + theStartTime.toLocaleString());
				console.log('check ' + myUserName + " - "
						+ theInvitation.invitorid);
				if (theInvitation.invitorid == myUserName) {
					theContentPageStart
							.append("<li onclick='startMeeting(&quot;"
									+ theInvitation.invitationid
									+ "&quot;);'>"
									+ "<img src='"
									+ itsBaseUrl
									+ theInvitation.invitoricon
									+ "' height='80' width='80' /><h3 style='color:#0099FF'>"

									+ dateFormat(theStartTime,
											"yyyy-mm-dd HH:MM ") + "("
									+ theDuration + "m)</h3><p>My meeting, "
									+ theInvitation.subject + "</p></li>");
				} else {
					theContentPageStart
							.append("<li onclick='startMeeting(&quot;"
									+ theInvitation.invitationid
									+ "&quot;);'>"
									+ "<img src='"
									+ itsBaseUrl
									+ theInvitation.invitoricon
									+ "' height='80' width='80' /><h3 style='color:blue'>"
									+ dateFormat(theStartTime,
											"yyyy-mm-dd HH:MM ") + "("
									+ theDuration + "m)</h3><p>"
									+ theInvitation.invitor + ", "
									+ theInvitation.subject + "</p></li>");
				}

			}
		}
		var request = [ myUserName, "get_public_rooms", myPassword ];
		doRequest(request, handleGetPublicRoomsReply);
	}
}

function handleGetPublicRoomsReply(reply) {
	$.mobile.hidePageLoadingMsg();
	if (reply[0] != "ok") {
		$('div#dialog-warning label').text(reply[1]);
		$.mobile.changePage("#dialog-warning", {
			role : 'dialog',
		});
	} else {

		var theContentPageStart = $('ul#content-start');

		var theMeetings = reply[1];
		for ( var i = 0; i < theMeetings.length; i++) {
			var theMeeting = theMeetings[i];
			var theMeetingId = theMeetings[i].meetingid;
			var theNrOfUsers = theMeetings[i].nrofusers;
			theContentPageStart
					.append("<li><div class='start-button-m' onclick='startPublicMeeting(&quot;"
							+ theMeetingId
							+ "&quot;);'>"
							+ "<h3 style='color:#548db9'>Public meeting: "
							+ theMeetingId
							+ "</h3><p>"
							+ theNrOfUsers
							+ " attendants</p>" + "</div></li>");
		}
		if (itsStartScreenLoaded == true) {
			$('div#header-start').css('data-position', 'fixed');
			$('ul#content-start').listview('refresh');
		}
		if ($.mobile.activePage.attr('id') == 'page-login') {
			var theNewPage = $('div#page-start');
			$.mobile.changePage(theNewPage);
		}

		setTimeout(function(a) {
			$('div#list-current').replaceWith(
					"<div id='list-current'>" + "<h3>Coming meeting</h3>"
							+ "<p>Starting in " + "201 minutes</p>" + "<p><b>"
							+ "Standup meeting" + "</b></p>" + "</div");

			$('ul#content-start').listview('refresh');

		}, 6000);
	}
}

function startMeeting(invitationId) {
	console.log('StartMeeting with id=' + invitationId);
	$.mobile.loadingMessageTextVisible = true;
	$.mobile.loadingMessage = 'Preparing meeting';
	$.mobile.showPageLoadingMsg();
	var request = [ invitationId, "connect_on_invitation", device.name,
			device.platform, device.version, device.uuid, myDialingChoice ];

	doRequest(request, handleStartMeetingReply);
}

function handleStartMeetingReply(reply) {
	$.mobile.hidePageLoadingMsg();
	if (reply[0] != "ok") {
		$('div#dialog-warning label').text(reply[1]);
		$.mobile.changePage("#dialog-warning", {
			role : 'dialog',
		});
	} else {
		console.log("User " + reply[1] + " logged in with number " + reply[2]);
		// showMeetingTab();
		itsRoomUrl = itsBaseUrl + reply[3];
		itsRoomImgWidth = reply[4];
		itsRoomImgHeight = reply[5];
		myDialingNumber = reply[2];
		myUserName = reply[1];
		handleStartMeeting();
	}
}

function startPublicMeeting(aMeetingId) {
	myMeetingId = aMeetingId;
	$.mobile.loadingMessageTextVisible = true;
	$.mobile.loadingMessage = 'Preparing my meeting';
	$.mobile.showPageLoadingMsg();
	var request;
	if (myLoginOption == 'login-option-tryit') {
		myUserName = device.uuid;
		request = [ device.uuid, "connect_on_try", aMeetingId, device.name,
				device.platform, device.version, device.uuid, myDialingChoice ];
	} else {
		request = [ myUserName, "connect", aMeetingId, myPassword, device.name,
				device.platform, device.version, device.uuid, myDialingChoice ];
	}
	doRequest(request, handleConnectReply);
}

function startMyMeeting() {
	$.mobile.loadingMessageTextVisible = true;
	$.mobile.loadingMessage = 'Preparing my meeting';
	$.mobile.showPageLoadingMsg();
	myMeetingId = "SMC";
	var request;
	if (myLoginOption == 'login-option-tryit') {
		request = [ device.uuid, "connect_on_try", aMeetingId, device.name,
				device.platform, device.version, device.uuid, myDialingChoice ];
	} else {
		request = [ myUserName, "connect_my_meeting", myMeetingId, myPassword,
				device.name, device.platform, device.version, device.uuid,
				myDialingChoice ];
	}
	doRequest(request, handleConnectReply);
}

function handleConnectReply(reply) {
	$.mobile.hidePageLoadingMsg();
	if (reply[0] != "ok") {
		$('div#dialog-warning label').text(reply[1]);
		$.mobile.changePage("#dialog-warning", {
			role : 'dialog',
		});
		return;
	}
	console.log("User " + myUserName + " logged in with number " + reply[1]);
	// showMeetingTab();
	itsRoomUrl = itsBaseUrl + reply[2];
	itsRoomImgWidth = reply[3];
	itsRoomImgHeight = reply[4];
	myDialingNumber = reply[1];
	handleStartMeeting();
}

function handleStartMeeting() {
	console.log("My login choice :" + myDialingChoice);

	showMeetingTab();
}

function handleInitMeeting() {
	var meeting = document.getElementById("meeting");
	meeting.style.backgroundImage = "url(" + itsRoomUrl + ")";
	updatePageMeeting();
	console.log('handleDocument: offset -' + meeting.offsetLeft + ', '
			+ $('div#header-meeting').outerHeight());
	if (myDialingChoice == 'voip') {

		setTimeout(function(a) {
			itsPhoneAnswered = false;

			$.mobile.loadingMessage = 'Dialing ' + myDialingNumber
					+ ' using VOIP';
			$.mobile.showPageLoadingMsg();
			itsShowDialingProgress = true;

			itsMute = false;
			itsPhono = $.phono({
				apiKey : "68119f4e709c7259ed25eb836dfb703e",
				connectionUrl : "http://app.phono.com/http-bind",
				onReady : function() {
					console.log("Phono is ready!");
					itsCall = itsPhono.phone.dial('sip:' + myDialingNumber
							+ '@lab-2.w3innovate.nl', {
						headset : false,
						onRing : function() {
							$.mobile.loadingMessage = 'Dial Number '
									+ myDialingNumber + ' ringing';
							console.log("Ringing " + myDialingNumber);
						},
						onAnswer : function() {
							itsPhoneAnswered = true;
							$.mobile.loadingMessage = 'Answered Number '
									+ myDialingNumber;
							console.log("Answered");
						},
						onHangup : function() {
							$.mobile.loadingMessage = 'Hangup Number '
									+ myDialingNumber;
							itsPhono.disconnect();
							itsPhono = null;
							if (itsPhoneAnswered == false) {
								if (itsShowDialingProgress == true) {
									$.mobile.hidePageLoadingMsg();
								}
								itsShowDialingProgress = false;
								alert("Server is not ready");
							}
							console.log("Hangup");
						}
					});

				},
				onUnready : function() {
					if (itsPhoneAnswered == false) {
						if (itsShowDialingProgress == true) {
							$.mobile.hidePageLoadingMsg();
						}
						//itsShowDialingProgress = false;
						//alert("VOIP is not ready"); 
					}
					console.log("Phono is not ready!");
				}
			});
			getEvents();
		}, 2000);
	} else if (myDialingChoice == 'gsm-int') {
		setTimeout(function(a) {
			$("#dialog-dial a.dial-number").attr('href',
					"tel:+" + myDialingNumber);
			$("#dialog-dial h2").text(
					"Dial +" + myDialingNumber + " to join the conference");

			// $.mobile.changePage("#dialog-dial", {
			// role : 'dialog',
			// });
			window.plugins.dialer.dial("+" + myDialingNumber, function(r) {
				console.log(r);
			}, function(e) {
				console.log(e);
			});
			getEvents();

		}, 2000);

	} else {

		$.mobile.loadingMessage = "Please dial +" + myDialingNumber
				+ " with any phone to connect";
		$.mobile.showPageLoadingMsg();
		Timeout(getEvents(), 5000);
	}
}

function dialInConference() {
	$("#dialog-dial").dialog('close');
	$.mobile.loadingMessage = "Dialing +" + myDialingNumber
			+ " using phone on device";
	$.mobile.showPageLoadingMsg();
	setTimeout(getEvents(), 5000);
	document.location.href = "tel:+" + myDialingNumber;
}

function mute() {
	itsMute = !itsMute;
	if (itsCall != null) {
		itsCall.mute(itsMute);
	}
}

function moveUser(userId, x, y) {
	var request = [ myUserName, "user", userId, x, y ];
	doRequest(request, handleMoveReply);
}

function moveDocument(documentId, x, y) {
	var request = [ myUserName, "document", documentId, x, y ];
	doRequest(request, handleMoveReply);
}

function handleMoveReply(reply) {
	if (reply[0] != "ok") {
		setStatus("Move failed: " + reply[1]);
		// TODO: move icon back
		return;
	}
}

function sendMouse(x, y, mask) {
	var event = [ "mouse", x, y, mask ];
	vnc([ event ]);
}

function sendKey(code, modifiers) {
	var events = new Array();
	if (code != 0) {
		events.push([ "key", code ]);
	}
	addModifiers(events, modifiers);
	if (events.length != 0) {
		vnc(events);
	}
	;
}

function handleUserDialInSuccess() {
	// User has successfully dialed into the conference
	console.log('User has successfully dialed into the conference');
	if ($("#dialog-dial") != undefined) {
		console.log('close dialog');

	}
	console.log('hide loading message');
	$.mobile.hidePageLoadingMsg();
	// showMeetingTab();
	updatePageMeeting();
}

function handleUser(message) {
	var userId = message[1];
	var x = message[2];
	var y = message[3];
	var info = message[4];
	var name = info[0];
	var company = info[1];
	var url = itsBaseUrl + info[2];
	console.log('handleUser: ' + message);
	var user = findIcon(userId, USER);
	if (user == null) {
		user = createIcon(userId, [ name, company ], url, USER);
		console.log('user-properties ' + userId + ": " + user.offsetWidth
				+ ', ' + user.offsetHeight);
		if (userId == myUserName) {
			handleUserDialInSuccess();
			// User has successfully dialed into the conference
			console.log('close dialog');
			// $("#dialog-dial").dialog('close');
			$.mobile.hidePageLoadingMsg();
			itsShowDialingProgress = false;
			// setTimeOut($.mobile.changePage('#page-meeting'),2000);
		}
		;
	}
	user.realX = x;
	user.realY = y;
	// Correct x, y coordinate based on room scaling
	x = x * itsRoomFactor;
	y = y * itsRoomFactor;
	var meeting = document.getElementById("meeting");
	// user.style.top = meeting.offsetTop + y + "px";
	// user.style.left = meeting.offsetLeft + x + "px";
	user.style.top = itsHeaderHeight + y - (user.offsetHeight / 2) + "px";
	user.style.left = meeting.offsetLeft + x - (user.offsetWidth / 2) + "px";

	console.log("drawUser: x:" + x + ",y:" + y + ",px" + meeting.offsetTop
			+ ",py:" + meeting.offsetLeft + ",rf=" + itsRoomFactor);
}

function handleDocument(message) {
	var documentId = message[1];
	var x = message[2];
	var y = message[3];
	var info = message[4];
	var name = info[0];
	var url = itsBaseUrl + info[1];
	var meeting = document.getElementById("meeting");
	console.log('handleDocument: ' + name + ': ' + x + ', ' + y + '('
			+ meeting.offsetLeft + ', ' + meeting.offsetTop + ", "
			+ itsHeaderHeight + ')');
	var doc = findIcon(documentId, DOCUMENT);
	if (doc == null) {
		console.log('handleDocument: create' + name);
		doc = createIcon2(documentId, [ name ], url, DOCUMENT);
	}
	doc.realX = x;
	doc.realY = y;
	x = x * itsRoomFactor;
	y = y * itsRoomFactor;
	doc.style.top = itsHeaderHeight + y - (doc.offsetHeight / 2) + "px";
	doc.style.left = meeting.offsetLeft + x - (doc.offsetWidth / 2) + "px";
}

function handleActive(message) {
	var userId = message[1];
	var active = message[2];
	var info = message[3];
	var name = info[0];
	var company = info[1];
	var url = itsBaseUrl + info[2];

	var icon = findIcon(userId, USER);
	if (icon == null) {
		return;
	}

	var balloon = document.getElementById(BALLOON + userId);
	if (active) {
		balloon.style.display = "block";
	} else {
		balloon.style.display = "none";
	}

	if (openedDocumentId == null) {
		return;
	}

	var talking = document.getElementById("talking");
	if (talking != null) {
		var talker = document.getElementById(TALKING + userId);
		if (!active) {
			if (talker != null) {
				talking.removeChild(talker);
			}
			;
		} else if (talker == null) {
			talker = document.createElement("img");
			talker.id = TALKING + userId;
			talker.className = "icon-image";
			talker.src = url;

			talking.appendChild(talker);
		}
	}
	;
}

function handleFocus(message) {
	var userId = message[1];
	var documentId = message[2];
	var focus = message[3];
	var info = message[4];
	var name = info[0];
	var company = info[1];
	var url = "http://smc.w3inovate.nl" + info[2];

	if (documentId != openedDocumentId) {
		return;
	}

	var owner = document.getElementById("owner");
	if (owner == null) {
		return;
	}

	if (focus) {
		focusingUserId = userId;
		var img = document.createElement("img");
		img.className = "icon-image";
		img.src = url;
		owner.innerHTML = "";
		owner.appendChild(img);
	} else if (focusingUserId == userId) {
		focusingUserId = null;
		owner.innerHTML = "";
	}
	;
}

function handleHide(message) {
	var documentId = message[1];
	removeIcon(documentId, DOCUMENT);
}

function handleDisconnect(message) {
	var userId = message[1];
	removeIcon(userId, USER);

	if (userId == myUserName) {
		disconnectUser();
	}
	;
}

function handleVMouseDown(event) {
	consumeEvent(event);
	event = event || window.event;
	mouseX = getX(event);
	mouseY = getY(event);
	var element = getIconAt(mouseX, mouseY);
	if (element != null) {

		if (selectedIcon != null && selectedIcon != docIcon) {
			selectedIcon.style.borderColor = "";
		}
		movingIcon = element;
		selectedIcon = movingIcon;
		if (selectedIcon != docIcon) {
			selectedIcon.style.borderColor = SELECTED_COLOR;
		}
	}
	console.log("mouse:down x: " + mouseX + ",y:" + mouseY + 'dx:' + deltaDownX
			+ ', dy:' + deltaDownY);
	return false;
}

function handleVMouseMove(event) {
	consumeEvent(event);

	if (movingIcon == null) {
		return false;
	}

	event = event || window.event;

	var x = getX(event);
	var y = getY(event);

	var deltaX = x - mouseX;
	var deltaY = y - mouseY;
	mouseX = x;
	mouseY = y;

	movingIcon.style.top = (movingIcon.offsetTop + deltaY) + "px";
	movingIcon.style.left = (movingIcon.offsetLeft + deltaX) + "px";
	event.cancelBubble = true;
	console.log("mouse:move ix=" + (movingIcon.offsetLeft + deltaX) + ",iy="
			+ (movingIcon.offsetTop + deltaY));
	return false;
}

function handleVMouseUp(event) {
	consumeEvent(event);
	var x = getX(event);
	var y = getY(event);

	if (movingIcon == null) {
		if (selectedIcon == null) {
			return false;
		}
		movingIcon = selectedIcon;
	}
	x = movingIcon.offsetLeft - meeting.offsetLeft
			+ (movingIcon.offsetWidth / 2);
	y = movingIcon.offsetTop - meeting.offsetTop
			+ (movingIcon.offsetHeight / 2);
	console.log("moving:mouse:up x=" + x + ", y=" + y + ", ot="
			+ meeting.offsetTop);

	event = event || window.event;

	// Correct x, y coordinate based on room scaling
	x = x / itsRoomFactor;
	y = y / itsRoomFactor;

	console.log('room: width ' + itsRoomImgWidth + ', height '
			+ itsRoomImgHeight);
	if (x < 0) {
		x = 0;
	}
	if (x > itsRoomImgWidth) {
		x = itsRoomImgWidth - 1;
	}
	if (y < 0) {
		y = 0;
	}
	if (y > itsRoomImgHeight) {
		y = itsRoomImgHeight - 1;
	}

	// alert("icon moved to " + x + ", " + y);
	// TODO: more elegant way
	console.log("mouse:up x=" + x + ", y=" + y);
	var id = getIconId(movingIcon, USER);
	if (id != null) {
		moveUser(id, x, y);
	} else {
		var id = getIconId(movingIcon, DOCUMENT);
		if (id != null) {
			moveDocument(id, x, y);
		}
		;
	}

	movingIcon = null;
	event.cancelBubble = true;
	return false;
}

function handleDoubleClick(event) {
	consumeEvent(event);

	event = event || window.event;

	var x = getX(event);
	var y = getY(event);
	var element = getIconAt(x, y);
	console.log("mouse:tap x:" + x + ",y:" + y);

	x = x / itsRoomFactor;
	y = y / itsRoomFactor;

	if (element != null && element.id != null) {
		var id = getIconId(element, DOCUMENT);
		if (id != null) {
			if (docIcon != null) {
				docIcon.style.borderColor = "";
			}
			docIcon = element;
			docIcon.style.borderColor = DOC_COLOR;
			openDocument(id);
		}
	}
	event.cancelBubble = true;
	return false;
}

function handleMouseDown(event) {
	consumeEvent(event);

	event = event || window.event;

	mouseMask = 1;
	sendMouse(mouseX, mouseY, mouseMask);
	event.cancelBubble = true;
	return false;
}

function handleMouseMove(event) {
	consumeEvent(event);

	event = event || window.event;

	var x = getX(event);
	var y = getY(event);

	var base = document.getElementById("viewer");
	do {
		x -= base.offsetLeft;
		y -= base.offsetTop;
	} while (base = base.offsetParent); // note the assign!

	mouseX = x;
	mouseY = y;
	mouseMoved = true;
	event.cancelBubble = true;
	return false;
}

function handleMouseUp(event) {
	consumeEvent(event);

	event = event || window.event;

	mouseMask = 0;
	sendMouse(mouseX, mouseY, mouseMask);
	event.cancelBubble = true;
	return false;
}

function checkMouseMove() {
	if (mouseMoved) {
		mouseMoved = false;
		sendMouse(mouseX, mouseY, mouseMask);
	}
}

function handleKeyClick(event) {
	consumeEvent(event);

	event = event || window.event;

	var modifiers = getModifiers(event);
	var code = getKey(event, modifiers);
	sendKey(code, modifiers);

	return false;
}

function addModifiers(events, modifiers) {
	for ( var i in modifiers) {
		events.unshift([ "key", modifiers[i], true ]);
		events.push([ "key", modifiers[i], false ]);
	}
	;
}

function leaveMeeting() {
	itsShowDialingProgress = false;
	$.mobile.loadingMessage = 'Leaving meeting';
	var request = [ myUserName, "disconnect" ];
	doRequest(request, handleLeaveMeetingReply);
}

function handleLeaveMeetingReply(reply) {
	hideMeeting();
	getInvitations();
}

function disconnectUser() {
	console.log('leave meeting at ' + $.mobile.activePage.attr('id'));
	if ($.mobile.activePage.attr('id') == 'page-meeting') {
		$.mobile.loadingMessage = 'Leaving meeting';
		$.mobile.showPageLoadingMsg();
		var request = [ myUserName, "disconnect" ];
		doRequest(request, handleDisconnectReply);
	}
}

function handleDisconnectReply(reply) {
	$.mobile.hidePageLoadingMsg();
	hideMeeting();
	itsLeavingMeeting = true;
	navigateBack();
}

function doRequest(request, handler) {
	requestHandler = handler;
	requestObject = $.ajax({
		type : "POST",
		url : itsBaseUrl + "/smcServlet/doRequest",
		data : JSON.stringify(request)
	});
	requestObject.done(doRequestReply);

	// requestObject = getXmlHttpObject();
	// requestObject.onreadystatechange = doRequestReply;
	// requestObject.open("POST",
	// "http://w3meet.w3innovate.nl/w3meetServlet/doRequest", true);
	// requestObject.send(JSON.stringify(request));
}

function doRequestReply() {
	if (requestObject.readyState != 4) {
		return;
	}
	if (requestObject.status != 200) {
		alert("Problem receiving doRequest reply: " + requestObject.statusText);
	}

	var reply = JSON.parse(requestObject.responseText);
	requestHandler(reply);
}

function vnc(events) {
	var request = [ myUserName, openedDocumentId, seqNo, events ];
	++seqNo;

	vncObject = $.ajax({
		type : "POST",
		url : itsBaseUrl + "/smcServlet/vnc",
		data : JSON.stringify(request),
	});
	vncObject.done(vncReply);

	// var vncObject = getXmlHttpObject();
	// vncObject.onreadystatechange = vncReply;
	// vncObject.open("POST", "http://w3meet.w3innovate.nl/w3meetServlet/vnc",
	// true);
	// vncObject.send(JSON.stringify(request));
}

function vncReply() {
	// ignore reply
}

function getEvents() {
	if (myUserName == null) {
		return;
	}

	var wait = [ myUserName, "wait", 60 ];

	eventsObject = $.ajax({
		type : "POST",
		url : itsBaseUrl + "/smcServlet/getEvents",
		data : JSON.stringify(wait),
	});
	eventsObject.done(getEventsReply);

	// EventsObject
	// eventsObject = getXmlHttpObject();
	// eventsObject.onreadystatechange = getEventsReply;
	// eventsObject.open("POST",
	// "http://w3meet.w3innovate.nl/w3meetServlet/getEvents", true);
	// eventsObject.send(JSON.stringify(wait));
}

function getEventsReply() {
	if (eventsObject.readyState != 4) {
		return;
	}
	if (eventsObject.status != 200) {
		alert("Problem receiving getEvents reply: " + eventsObject.status
				+ ", " + eventsObject.statusText);
	}

	var reply = JSON.parse(eventsObject.responseText);
	console.log('event: ' + reply);
	if (reply[0] != "ok") {
		if (reply[1] == "timeout") {
			getEvents();
		} else {
			disconnectUser();
		}
		return;
	}

	var events = reply[1];
	for ( var i in events) {
		var event = events[i];

		var handler = eventsHandler[event[0]];
		if (handler == null) {
			setStatus("Unsupported message: " + event);
		} else {
			handler(event);
		}
		;
	}

	getEvents();
}

function findIcon(id, type) {
	return document.getElementById(type + id);
}

function getIconId(icon, type) {
	if (icon.id.indexOf(type) != 0) {
		return null;
	}

	return icon.id.substr(type.length);
}

function xinspect(o, i) {
	if (typeof i == 'undefined')
		i = '';
	if (i.length > 50)
		return '[MAX ITERATIONS]';
	var r = [];
	for ( var p in o) {
		var t = typeof o[p];
		r.push(i
				+ '"'
				+ p
				+ '" ('
				+ t
				+ ') => '
				+ (t == 'object' ? 'object:' + xinspect(o[p], i + '  ') : o[p]
						+ ''));
	}
	return r.join(i + '\n');
}

function redrawIcons(aRoomFactor) {
	var meeting = document.getElementById("meeting");
	$('div#meeting').children('div.icon').each(function() {
		var theIcon = $(this);
		var icon = document.getElementById(theIcon.attr('id'));
		if (typeof icon.realX != "undefined") {
			console.log('redraw ' + icon.id);
			x = icon.realX * aRoomFactor;
			y = icon.realY * aRoomFactor;
			icon.style.top = meeting.offsetTop + y + "px";
			icon.style.left = meeting.offsetLeft + x + "px";
		} else {
			console.log('not redrawing ' + icon.id);
		}
	});

}

function createIcon(id, names, url, type) {
	var image = document.createElement("img");
	image.className = "icon-image";
	image.src = url;
	console.log('image src: ' + url);
	var label = document.createElement("span");
	label.className = "icon-label";
	for ( var i in names) {
		label.innerHTML += names[i] + "<br>";
	}

	var avatar = document.createElement("table");
	avatar.cellSpacing = 0;
	avatar.cellPadding = 0;
	avatar.insertRow(0);
	avatar.rows[0].insertCell(0);
	avatar.rows[0].cells[0].appendChild(image);
	avatar.insertRow(1);
	avatar.rows[1].insertCell(image);
	avatar.rows[1].cells[0].appendChild(label);

	var icon = document.createElement("div");
	icon.id = type + id;
	icon.className = "icon";
	icon.appendChild(avatar);

	if (type == USER) {
		var balloon = document.createElement("img");
		balloon.id = BALLOON + id;
		balloon.className = "icon-talk";
		balloon.src = itsBaseUrl + "/smc/images/balloon.png";
		icon.appendChild(balloon);
	}

	var meeting = document.getElementById("meeting");
	console.log('appending user');
	meeting.appendChild(icon);
	console.log('appended user');
	return icon;
}

function createIcon2(id, names, url, type) {
	var canvas = document.createElement("canvas");
	canvas.height = 64;
	canvas.width = 64;
	var context = canvas.getContext("2d");
	var image = new Image();
	// image.className = "icon-image";
	image.onload = function() {
		console.log('image: loaded');
		// context.drawLine()
		context.drawImage(image, 0, 0, 64, 64);

	};
	console.log('image src: ' + url);
	image.src = url;

	var label = document.createElement("span");
	label.className = "icon-label";
	for ( var i in names) {
		label.innerHTML += names[i] + "<br>";
	}

	var avatar = document.createElement("table");
	avatar.cellSpacing = 0;
	avatar.cellPadding = 0;
	avatar.insertRow(0);
	avatar.rows[0].insertCell(0);
	avatar.rows[0].cells[0].appendChild(canvas);
	avatar.insertRow(1);
	avatar.rows[1].insertCell(image);
	avatar.rows[1].cells[0].appendChild(label);

	var icon = document.createElement("div");
	icon.id = type + id;
	icon.className = "icon";
	icon.appendChild(avatar);

	if (type == USER) {
		var balloon = document.createElement("img");
		balloon.id = BALLOON + id;
		balloon.className = "icon-talk";
		balloon.src = itsBaseUrl + "/smc/images/balloon.png";
		icon.appendChild(balloon);
	}

	var meeting = document.getElementById("meeting");
	console.log('appending user');
	meeting.appendChild(icon);
	console.log('appended user');
	return icon;
}

function icon2Loaded(image, id, names, type) {

}

function removeIcon(id, type) {
	var item = findIcon(id, type);
	if (item == null) {
		return;
	}

	var meeting = document.getElementById("meeting");
	meeting.removeChild(item);
}

function getIconAt(x, y) {
	var element = document.elementFromPoint(x, y + itsHeaderHeight);
	while ((element != null) && (element.className != "icon")) {
		element = element.parentNode;
	}
	return element;
}

function setStatus(message) {
	var status = document.getElementById("status");
	if (status) {
		status.innerHTML = message;
	} else {
		alert(message);
	}
}

function showLogin() {
	document.getElementById("login").style.display = "block";
}

function showMeetingTab() {
	console.log('show meeting page');
	$('#title-meeting').text(myMeetingId);
	$.mobile.changePage('#page-leave');
	// $.mobile.changePage('#page-meeting');
	document.ontouchmove = function(event) {
		console.log('onTouchMove event');
		if ($.mobile.activePage.attr('id') == 'page-meeting') {
			if ($('a#tab-room').find('ui-btn-active').length > 0) {
				event.preventDefault();
			}
		}
	};
	activateTab_Meeting('tab-room');
}

function hideMeeting() {
	// Remove all added users and documents from the meeting-room
	$('div').find('div.icon').remove();
	activateTab_Meeting(null);
}

function hideViewer() {
	document.getElementById("view").style.display = "none";

	var viewer = document.getElementById("viewer");
	stopListener(viewer, "mousedown", handleMouseDown);
	stopListener(viewer, "mousemove", handleMouseMove);
	stopListener(viewer, "mouseup", handleMouseUp);
	stopListener(document, "keypress", handleKeyClick);
	clearInterval(mouseTimer);
}

function getX(event) {
	if (event.clientX)
		return event.clientX;
	else if (event.pageX)
		return event.pageX;
	else
		return 0;
}

function getY(event) {
	if (event.clientY)
		return event.clientY - itsHeaderHeight;
	else if (event.pageY)
		return event.pageY - itsHeaderHeight;
	else
		return 0;
}

function getModifiers(event) {
	var modifiers = new Array();
	if (event.shiftKey)
		modifiers[modifiers.length] = 0xffe1;
	if (event.ctrlKey)
		modifiers[modifiers.length] = 0xffe3;
	if (event.metaKey)
		modifiers[modifiers.length] = 0xffe7;
	if (event.altKey)
		modifiers[modifiers.length] = 0xffe9;
	return modifiers;
}

function getKey(event) {
	if (event.charCode != 0)
		return event.charCode;
	var code = 0;
	if (event.keyCode)
		code = event.keyCode;
	else if (event.which)
		code = event.which;

	switch (code) {
	case 8:
		return (0xff08);// backspace
	case 9:
		return 0xff09; // tab
	case 13:
		return 0xff0d; // enter
	case 27:
		return 0xff1b; // escape
	case 33:
		return 0xff55; // page up
	case 34:
		return 0xff56; // page down
	case 35:
		return 0xff57; // end
	case 36:
		return 0xff50; // home
	case 37:
		return 0xff51; // left
	case 38:
		return 0xff52; // up
	case 39:
		return 0xff53; // right
	case 40:
		return 0xff54; // down
	case 45:
		return 0xff63; // insert
	case 46:
		return 0xffff; // delete
	case 112:
		return 0xffbe; // f1
	case 113:
		return 0xffbf; // f2
	case 114:
		return 0xffc0; // f3
	case 115:
		return 0xffc1; // f4
	case 116:
		return 0xffc2; // f5
	case 117:
		return 0xffc3; // f6
	case 118:
		return 0xffc4; // f7
	case 119:
		return 0xffc5; // f8
	case 120:
		return 0xffc6; // f9
	case 121:
		return 0xffc7; // f10
	case 122:
		return 0xffc8; // f11
	case 123:
		return 0xffc9; // f12
	default:
		return 0;
	}
}

function consumeEvent(event) {
	if (event.stopPropagation) {
		event.stopPropagation();
		event.preventDefault();
	}

	event.cancelBubble = true;

	event.returnValue = false;
}

function startListener(target, event, handler) {
	if (target.addEventListener) {
		target.addEventListener(event, handler, false);
	} else if (target.attachEvent) {
		target.attachEvent("on" + event, handler);
	} else {
		target["on" + event] = handler;
	}
}

function stopListener(target, event, handler) {
	if (target.addEventListener) {
		target.removeEventListener(event, handler, false);
	} else if (target.attachEvent) {
		target.detachEvent("on" + event, handler);
	} else {
		delete target["on" + event];
	}
}

// function getXmlHttpObject() {
// if (window.XMLHttpRequest) // IE7+, Firefox, Opera, Chrome, Safari
// {
// return new XMLHttpRequest();
// }
// if (window.ActiveXObject) // IE5, IE6
// {
// return new ActiveXObject("Microsoft.XMLHTTP");
// }
// alert("Your browser does not support XML HTTP!");
// return null;
// }

function initialise() {
	var url = window.location.href;
	var index = url.lastIndexOf("?");
	if (index > 0) {
		var id = url.substr(index + 1);
		document.getElementById("userId").value = "eln" + id;
		document.getElementById("password").value = id + "1030";
	}
}

function findColor(selector, color) {
	if (document.styleSheets) {
		for ( var i in document.styleSheets) {
			var sheet = document.styleSheets[i];
			for ( var j in sheet.cssRules) {
				var rule = sheet.cssRules[j];
				if (rule.selectorText == selector) {
					return rule.style.color;
				}
			}
		}
	}
	return color;
}

