
﻿var appVersion = "2.4.2";
var buildDate = "2014-07-13";

var mode = '';
//mode = 'test';		// test
//mode = 'debug';		// test



















﻿	var pushIsRegistered = false;

  $(document).bind("mobileinit", function()
    {

      $.mobile.allowCrossDomainPages = true;
      $.mobile.defaultPageTransition = "slidefade";
//			$.mobile.pushStateEnabled = false;

    }
  );

  $(document).ready(function()
    {

      $.mobile.allowCrossDomainPages = true;
      $.mobile.defaultPageTransition = "slidefade";

    }
  );

  $( document ).on( "pageinit", function( event ) {

    if (navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i)) {
        $("body").addClass("ios7");
        $('body').append('<div id="ios7statusbar"/>');
	    }
   }
  );

  $(document).on("pagebeforeshow", function(event) {

		registerAppForPush( window.localStorage.getItem("device_id"), window.localStorage.getItem("os_type") );

		setSizes();
		loadCities();

		if ( isLoggedIn() ) {
			$(".messagesMenuButton").show();
		}
		else {
			$(".messagesMenuButton").hide();
		}

  } );

  $(document).on("pageshow", "#homePage", function(event)
		{

			refreshControls();
			refreshState();

			if (min_app_version >= appVersion)
			{

				$('#minAppVersion').html(min_app_version);
				$.mobile.changePage('#upgradeNoticePage');

			}

			var cityName = window.localStorage.getItem( "cityName");
			if ( cityName == null ) cityName = "Alla städer";
			$(".cityName").html( cityName );

			getOptOuts();

    }
  );
  $(document).on("pageshow", "#ticketsPage", function(event)
    {

      loadTicketsPage();

    }
  );
  $(document).on("pageshow", "#messagesPage", function(event)
		{

      loadMessagesPage();

		}
	);
  $(document).on("pageshow", "#verticalGuidePage", function(event)
    {

			loadGuidePage();

    }
  );
  $(document).on("pageshow", "#offersPage", function(event)
    {

      loadOffersList($("#offersList"));

    }
  );
  $(document).on("pageshow", "#userAgreementPage", function(event)
    {

      loadUserAgreementPage();

    }
  );
  $(document).on("pageshow", "#supportPage", function(event)
    {

      loadSupportPage();

    }
  );
  $(document).on("pageshow", "#accountPage", function(event)
    {

      loadAccountPage();

    }
  );
  $(document).on("pageshow", "#adminPage", function(event)
    {

      loadAdminPage();

    }
  );
  $(document).on("pageshow", "#scanPage", function(event)
    {

      loadScanPage();

    }
  );
  $(document).on("pagebeforeshow", "#clubDetailsPage", function(event)
    {

      loadClubDetails();
			if ( isLoggedIn() ) {
				$(".showWhenLoggedin").show();
				$(".hideWhenLoggedin").hide();
			}
			else {
				$(".showWhenLoggedin").hide();
				$(".hideWhenLoggedin").show();
			}

    }
  );
  $(document).on("pageshow", "#cartPage", function(event)
    {

      loadCart();

    }
  );

  $(document).on("pageshow", "#loginPage", function(event)
    {

      $('#userId').val(userId);
      if ($("#forgotPasswordButton").value = "")
        $("#forgotPasswordButton").button("disable");

    }
  );
  $(document).on("pageshow", "#facebookAttachPage", function(event)
    {

      setTimeout(
        function()
        {

          facebookInit();

          FB.getLoginStatus(
            function(response)
            {

              if (response.status == 'connected')
              {

                $("#facebookLoginButton").hide();
                $("#facebookLogoutButton").show();

              }
              else
              {

                $("#facebookLoginButton").show();
                $("#facebookLogoutButton").hide();

              }
            }
          );
        },
        50
      );

    }
  );

  window.addEventListener("orientationchange", function()
    {

      if (window.orientation == 0) $('.np-ui-banner-image').show();
      else $('.np-ui-banner-image').hide();

    }, false
  );

  $(document).on("pageshow", function(event)
    {

			if (mode == 'test') $(".testBuild").html('Test Build - version ' + appVersion);
			else if (mode == 'debug') $(".testBuild").html('Debug Build - version ' + appVersion);
			else $(".testBuild").hide();
			$(".confirmCellPhone").hide();


      if ( role == "" ) {

        validateUser( userId, password );

      }

      $(".np-ui-login-button").html(btnLogin);
      $(".np-ui-account-button").html(btnRegister);
      $(".np-ui-changepassword-button").addClass('ui-disabled');
      $(".np-ui-ticket-button").addClass('ui-disabled');
      //    $(".np-ui-facebook-button").addClass('ui-disabled');
      $(".np-li-manager").hide();
      $(".np-li-admin").hide();
      $(".np-show-when-loggedin").hide();
      if (isLoggedIn()) {

        $(".np-ui-login-button").html(btnLogout);
        $(".np-ui-account-button").html(btnAccount);
        $(".np-ui-changepassword-button").removeClass('ui-disabled');
        $(".np-ui-ticket-button").removeClass('ui-disabled');
        $(".np-ui-facebook-button").removeClass('ui-disabled');
	      $(".np-show-when-loggedin").show();

        if (role == 'MANAGER' || role == 'ADMIN')
        {
          $(".np-li-manager").show();
        }

        if (role == 'ADMIN')
        {
          $(".np-li-admin").show();
        }

      }

    }
  );




﻿var pushNotification;

function onDeviceReady() {

	document.addEventListener("backbutton", function(e)
		{

			if($("#home").length > 0)
			{
				// call this to get a new token each time. don't call it to reuse existing token.
				//pushNotification.unregister(successHandler, errorHandler);
				e.preventDefault();
				navigator.app.exitApp();
			}
			else
			{
				navigator.app.backHistory();
			}
		}, false
	);

	try
	{

		pushNotification = window.plugins.pushNotification;
		if (device.platform == 'android' || device.platform == 'Android') {
			pushNotification.register(successHandler, errorHandler, {"senderID": "668387263962", "ecb": "onNotificationGCM"}); // required!
		} else {
			pushNotification.register(tokenHandler, errorHandler, {"badge": "true", "sound": "true", "alert": "true", "ecb": "onNotificationAPN"}); // required!
		}
	}
	catch(err)
	{
		txt = "There was an error on this page.\n\n";
		txt += "Error description: " + err.message + "\n\n";
		//       alert(txt);
	}
}

// handle APNS notifications for iOS
function onNotificationAPN(e) {
	if (e.alert) {

		$.mobile.changePage( '#pushMesssagePopup' );
		navigator.notification.alert(e.alert);

	}

	if (e.sound) {
		var snd = new Media(e.sound);
		snd.play();
	}

	if (e.badge) {
		pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
	}
}

// handle GCM notifications for Android
function onNotificationGCM(e) {
	$("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

	switch(e.event)
	{
		case 'registered':
			if (e.regid.length > 0)
			{
				$("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
				// Your GCM push server needs to know the regID before it can push to this device
				// here is where you might want to send it the regID for later use.

// alert('Android: ' + e.regid );
//				window.localStorage.setItem("device_id", e.regid);
//				window.localStorage.setItem("os_type", 'ANDROID');

				registerAppForPush( e.regid, 'ANDROID' );

				console.log("regID = " + e.regid);
			}
			break;

		case 'message':
			// if this flag is set, this notification happened while we were in the foreground.
			// you might want to play a sound to get the user's attention, throw up a dialog, etc.
			if (e.foreground)
			{
					$.mobile.changePage( '#pushMesssagePopup' );

				// if the notification contains a soundname, play it.
				var my_media = new Media("/android_asset/www/"+e.soundname);
				my_media.play();
			}
			else
			{// otherwise we were launched because the user touched a notification in the notification tray.

				// Eftersom appen inte var aktiv när push kom går vi direkt till messagesPage
				$.mobile.changePage( '#messagesPage' );
				/*
				if (e.coldstart)
					$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
				else
					$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
				*/
			}

			$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
			$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
			break;

		case 'error':
			$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
			break;

		default:
			$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
			break;
	}
}

function tokenHandler (result) {

	registerAppForPush( result, 'IOS' );

}

function successHandler (result) {
}

function errorHandler (error) {
}

document.addEventListener('deviceready', onDeviceReady, true);

﻿/*

NP-512 Ric 2014-07-11

$("#regPersonalId").bind("keyup", function(event)
	{

		var cPersonal = $(this).val().replace('\t', '').replace('-', '');

		if (cPersonal.length == 8 && event.which > 10)
			$("#regPersonalId").val($("#regPersonalId").val() + '-');

	}
);

$("#regPersonalId").bind("keydown", function(event)
	{

		var cPersonal = $(this).val().replace('\t', '').replace('-', '');

		if (cPersonal.length >= 12 && event.which >=32)
			event.preventDefault();

		if (event.which == 8 || (event.which >= 48 && event.which <= 57))
		{
		}
		else
			event.preventDefault();

	}
);

$("#personalId").bind("keyup", function()
	{

		var cPersonal = $(this).val().replace('\t', '').replace('-', '');

		if (cPersonal.length == 8 && event.which > 10)
			$("#personalId").val($("#personalId").val() + '-');

		if (cPersonal.length == 10) {

			$("#gender_male").attr("checked", false).checkboxradio("refresh");
			$("#gender_female").attr("checked", false).checkboxradio("refresh");

			if ('13579'.indexOf(cPersonal.charAt(8)) > 0)
			{

				$("#gender_male").attr("checked", true).checkboxradio("refresh");

			}
			else
			{

				$("#gender_female").attr("checked", true).checkboxradio("refresh");

			}

		}

	}
);

*/

$("#zipcode").bind("keyup", function()
	{
		if ($(this).val().replace('\t', '').length == 5) {

			$.ajax(
				{
				type: "GET",
				url: getZipcodesUri,
				data: $(this).serialize(),
				success: function(xml) {

						$("#city").val($(xml).find("item>city").text());


					},
				error: function(XMLHttpRequest, textStatus, errorThrown) {

						$("#city").val("");

					}
				}
			);

		}
	}
);


function log(logMessage) {

	if (mode == 'debug') console.log(logMessage);

}

function setSizes()
{

	$width = $(document).width() - 2;
	$buttonWidth = $width - 60;
	$('#citySelectorButton').css(
		{
		'min-width': 130
		}
	);
	$('#cityButton').css(
		{
		'min-width': $width - 194
		}
	);
	$('.guidePageBannerClass').css(
		{
		'width': $width
		}
	);
	$('.front-button').css(
		{
		'width': $buttonWidth + 1
		}
	);

	$('#front-button-login').css(
		{
		'width': $buttonWidth * 0.25
		}
	);
	$('#front-button-register').css(
		{
		'width': $buttonWidth * 0.75
		}
	);

	leftButtonWidth = Math.round($buttonWidth * 0.42);
	var the_map = document.getElementById('loginButtonMap');
	the_map.innerHTML += '<area shape="rect" coords="0,0,' + leftButtonWidth + ',87" href="#loginPage" />';
	the_map.innerHTML += '<area shape="rect" coords="' + leftButtonWidth + ',0,604,87" href="javascript:account()"/>';

}

function refreshPage()
{

	$.mobile.changePage(window.location.href,
		{
		transition: "fade",
		reverse: false,
		changeHash: false,
		allowSamePageTransition: true,
		reloadPage: true,
		}
	);

}

function refreshControls()
{

	if ( isLoggedIn() ) {
		$("#loginButton").hide();
		$("#cartButton").show();
		$(".messagesMenuButton").show();
		$(".showWhenLoggedin").show();
		$(".hideWhenLoggedin").hide();
	}
	else {
		$("#loginButton").show();
		$("#cartButton").hide();
		$(".messagesMenuButton").hide();
		$(".showWhenLoggedin").hide();
		$(".hideWhenLoggedin").show();
		$.mobile.changePage( '#loginPage' );
	}

}

function infoPage(title, message, page, button)
{

	var buttonURL = iif((page == ""), '#homePage', page);
	var buttonText = iif((button == ""), 'Ok', button);

	$("#infoTitle").html(title);
	$("#infoMessage").html(message);
	$("#infoURL").text(buttonText);
	$("#infoURL").attr("href", buttonURL);
	$.mobile.changePage('#infoPage');

}

function errorPage(description, message, button, returnPage)
{

	var buttonText = iif((button == ""), 'Ok', button);

	$("#errorDescription").html(description);
	$("#errorMessage").html(message);
	$("#errorURL").text(buttonText);
	$("#errorURL").attr("href", iif((returnPage == ""), '#homePage', returnPage));

	$.mobile.changePage('#errorPage');

}

function openExternal(url)
{

	// navigator.app.loadUrl( url, { openExternal:true } );
	return window.open(encodeURI(url), '_system');

}

function showOptout()
{

	showOptOut = true;
	$("#optOut").show();
	$(".menuPanel").panel("close");

}

// ----------------------------------------------------------------------------- isLoggedIn
function isLoggedIn()
{

	if (userId == null || userId == '')
		return false;
	else
		return true;

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- isManager
function isManager()
{

	if (userId == null || userId == '')
		return false;
	else
		return (role == 'MANAGER' || role == 'ADMIN');

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- account
function account()
{

	if ( isLoggedIn() )
		$.mobile.changePage('#accountPage');
	else
		$.mobile.changePage('#registerAccountPage');

	return false;

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- passwordRecovery
function passwordRecovery(email)
{

	var ok = false;

	if (email == "")
	{

		errorPage("Du måste ange din epost i fältet ovan", "Eposten ej ifylld", "Tillbaks");
		return false;

	}

	$.ajax(
		{
		type: "GET",
		url: resetPasswordUri,
		cache: false,
		async: false,
		data: "email=" + email,
		crossDomain: true,
		dataType: "xml",
		success: function(xml)
			{

				if ($(xml).find("result>code").text() == resSuccess)
				{

					ok = true;
					infoPage("Glömt lösenord", "Ett nytt lösenord har skickats till din epost", "#homePage", "Ok");

				}
				else
				{

					errorPage('Misslyckades nollställa ditt lösenord. Har du fyllt i din epost ovan?', $(xml).find("result>description").text(), "Tillbaks");

				}

			},
		error: function(XMLHttpRequest, textStatus, errorThrown)
			{

				$.mobile.changePage( '#servicePage' );

			}

		}
	);

	return ok;

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- iif
function iif(condition, iftrue, iffalse)
{

	if (condition) return iftrue;
	else return iffalse;

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- setCity
function setCity(cityId, cityName, cityImage)
{

	window.localStorage.setItem("city", cityId);
	window.localStorage.setItem("cityName", cityName);
	window.localStorage.setItem("cityImageName", cityImage);

	$(".cityName").html(cityName);
	$("#valjstad").panel("close");

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- authorizationHeader
function authorizationHeader()
{

	if (isLoggedIn())
		return Base64.encode(userId + ":" + password);
	else
		return '';

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- setHeaders
function setHeaders(xhr)
{

	xhr.setRequestHeader("Authorization", "Basic " + authorizationHeader());
	xhr.setRequestHeader("appVersion", appVersion);

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- refreshState
function refreshState()
{

	$.ajax(
		{
		type: "GET",
		url: getInitUri,
		cache: false,
		async: false,
		data: "",
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
		success: function(xml)
			{

				account_id = $(xml).find("result>account_id").text();
				cellphone = $(xml).find("result>cellphone").text();
				first_name = $(xml).find("result>first_name").text();
				last_name = $(xml).find("result>last_name").text();
				email = $(xml).find("result>email").text();
				min_app_version = $(xml).find("result>min_app_version").text();

				if ($(xml).find("result>cellphone_confirmed").text() == "true")
					cellphoneConfirmed = true;
				else
					cellphoneConfirmed = false;

				if (cellphoneConfirmed)
					$(".confirmCellPhone").hide();
				else if (isLoggedIn())
					$(".confirmCellPhone").show();

				$("#confirmCellPhoneNo").val(cellphone);
				//    $("#citySelector").val( window.localStorage.getItem( "city" ) );

				online = true;

			},
		error: function(XMLHttpRequest, textStatus, errorThrown)
			{

				$.mobile.changePage( '#servicePage' );
				online = false;

			}

		}
	);

	//    $("#facebookLoginButton").hide();
	// $("#facebookLogoutButton").hide();

}


// ----------------------------------------------------------------------------- confirmCellPhone
function confirmCellPhone(confirmCellphone)
{

	$.ajax(
		{
		type: "POST",
		url: confirmCellPhoneURL,
		cache: false,
		async: false,
		data: "cellphone=" + confirmCellphone,
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
		success: function(xml)
			{

				$.mobile.changePage('#confirmCellPhoneSuccessPage');


			},
		error: function(XMLHttpRequest, textStatus, errorThrown)
			{

				$.mobile.changePage( '#servicePage' );

			}

		}

	);

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- confirmCellPhone
function resendConfirmationSMS()
{

	$.ajax(
		{
		type: "POST",
		url: resendConfirmationSMSURL,
		cache: false,
		async: false,
		data: "",
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
		success: function(xml)
			{

				$.mobile.changePage('#confirmCellPhoneSuccessPage');


			},
		error: function(XMLHttpRequest, textStatus, errorThrown)
			{

				$.mobile.changePage( '#servicePage' );

			}

		}

	);

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- loadTicketsPage
function loadTicketsPage()
{

	$.mobile.loading('show',
		{
		text: 'Loading...',
		textVisible: true,
		theme: 'z',
		html: ""
		}
	);

	loadTicketsList();

	$.mobile.loading('hide');

}
// -----------------------------------------------------------------------------

// ----------------------------------------------------------------------------- loadGuidePage
function loadGuidePage()
{

	$.mobile.loading('show',
		{
		text: 'Loading...',
		textVisible: true,
		theme: 'z',
		html: ""
		}
	);

	$(".guidePageBannerClass").attr("src", window.localStorage.getItem("cityImageName"));
	loadGuideList(-1); //new Date().getDay() );

	$.mobile.loading('hide');

}
// -----------------------------------------------------------------------------

// ----------------------------------------------------------------------------- loadAccountPage
function loadAccountPage()
{

	$.mobile.loading('show',
		{
		text: 'Loading...',
		textVisible: true,
		theme: 'z',
		html: ""
		}
	);

	loadAccount();

	$.mobile.loading('hide');

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- loadUserAgreementPage
function loadUserAgreementPage()
{

	$.mobile.loading('show',
		{
		text: 'Loading...',
		textVisible: true,
		theme: 'z',
		html: ""
		}
	);

	loadUserAgreement();

	$.mobile.loading('hide');

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- loadUserAgreementPage
function loadSupportPage()
{

	$.mobile.loading('show',
		{
		text: 'Loading...',
		textVisible: true,
		theme: 'z',
		html: ""
		}
	);

	loadSupportPageTop();

	if (isLoggedIn())
	{
		$("#contactEmail").val(userId);
	}
	$("#appVersion").html(appVersion);
	$("#buildDate").html(buildDate);

	$.mobile.loading('hide');

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- loadUserAgreementPage
function loadAdminPage()
{

	$.mobile.loading('show',
		{
		text: 'Loading...',
		textVisible: true,
		theme: 'z',
		html: ""
		}
	);


	$.mobile.loading('hide');

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- loadUserAgreementPage
function loadScanPage()
{

	$.mobile.loading('show',
		{
		text: 'Loading...',
		textVisible: true,
		theme: 'z',
		html: ""
		}
	);

	loadClubsList('ScanClubList');

	$.mobile.loading('hide');

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- loadUserAgreementPage
function loadStatisticsPage()
{

	$.mobile.loading('show',
		{
		text: 'Loading...',
		textVisible: true,
		theme: 'z',
		html: ""
		}
	);

	loadClubsList('StatisticsClubList');

	$.mobile.loading('hide');

}
// -----------------------------------------------------------------------------


function loadCities()
{

	$("#citiesList").empty();

	$.ajax(
		{
		type: "GET",
		url: wsGetCitiesURL,
		cache: false,
		async: true,
		data: "",
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
		success: function(data)
			{

				var firstLetter = '';
				xml = $(data);

				$(xml).find('item').each(
					function()
					{

						var $this = $(this);
						var name = $this.children('name').text();

						if (firstLetter != name.substring(0, 1))
						{

							firstLetter = name.substring(0, 1);

							var l = $('<li data-role="list-divider">' + firstLetter + '</li>');
							$("#citiesList").append(l);

						}

						var a = $('<a/>',
							{
							html: $this.children('name').text(),
							href: 'javascript:setCity( "' + $this.find('object_id').text() + '", "' + $this.children('name').text() + '", "'+ $this.children('image').text() +'" );'
							}
						);

						var li = $('<li/>');
						li.append(a);
						$("#citiesList").append(li);

					}
				);

				$("#citiesList").listview("refresh");

			},
		error: function(XMLHttpRequest, textStatus, errorThrown)
			{
				$("#homePageQuote").html("<h2>Ett fel uppstod</h2><p>Misslyckades h&auml;mta produkter fr&aring;n databasen. Det kan bero p&aring; att webbtj&auml;nsten &auml;r o&aring;tkomlig. F&ouml;rs&ouml;k igen senare.</p> " + errorThrown);
			}

		}
	);

}


// ----------------------------------------------------------------------------- verifyScan
function verifyScan(club, code)
{

	var ok = false;

	$.ajax(
		{
		type: "GET",
		url: swipeCodeUrl,
		cache: false,
		async: false,
		data: "club=" + club + "&code=" + code,
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
		success: function(xml)
			{

				$xml = $(xml);

				if ($(xml).find('result>code').text() == resSuccess)
				{

					ok = true;
					$('.np-tickets-left').html($(xml).find('result>tickets_left').text() + ' biljetter kvar av ' + $(xml).find('result>tickets').text());

				}

			},
		error: function(XMLHttpRequest, textStatus, errorThrown)
			{

				$.mobile.changePage( '#servicePage' );

			}

		}
	);

	return ok;

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- loadClubsList
function loadClubsList(listName)
{

	$.ajax
	(
		{
		type: "GET",
		url: getAdmClubsListUrl,
		cache: false,
		async: false,
		crossDomain: true,
		data: "weekday=-1",
		dataType: "xml",
		beforeSend: function(xhr) {

				setHeaders(xhr);

			},
		success: function(xml)
			{

				var xml = $(xml);
				var odd = false;
				var cLocation = "";
				var cStatistics = "";

				$("#" + listName).empty();
				$(xml).find('item').each(
					function()
					{

						var $this = $(this);

						cLocation = $this.children('location').text();
						cStatistics = 'Sålda: ' + $this.children('sold').text() + ' Scannade: ' + $this.children('scanned').text();

						var li = $('<li ' + iif(odd, 'data-theme="a"', 'data-theme="a"') + ' />');
						var a = $('<a/>',
							{
							html: '<h3>' + $this.children('name').text() + '<br><p style="margin-top:0px; margin-bottom:0px; font-size:12px;"><b>' + cLocation + '</b><br>' + cStatistics + '</p></h3>',
								//         href: 'javascript:scanCode( "' + $this.attr('id') + '" );'
							href: 'javascript:setTimeout( function(){scanCode( "' + $this.attr('id') + '" );}, 50 )'
							}
						);

						li.append(a);
						$("#" + listName).append(li);

						odd = !odd;

					}
				);

				$("#" + listName).listview("refresh");

			},
		error: function(XMLHttpRequest, textStatus, errorThrown)
			{

				$("#" + listName).empty();
				$("#" + listName).append('<li><h2>Ett fel uppstod</h2><p>Misslyckades h&auml;mta produkter fr&aring;n databasen. Det kan bero p&aring; att webbtj&auml;nsten &auml;r o&aring;tkomlig. F&ouml;rs&ouml;k igen senare.</p><p>' + errorThrown + '</p></li>');
				$("#" + listName).listview("refresh");

			}
		}
	);

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- loadMessagesList
function loadMessagesPage()
{

	$.ajax
	(
		{
		type: "GET",
		url: getMessagesUri,
		cache: false,
		async: true,
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr) {

				setHeaders(xhr);

			},
		success: function(xml)
			{

				var xml = $(xml);
				var odd = false;

				$("#messagesList").empty();
				$(xml).find('items>item').each(
					function()
					{

						var $this = $(this);
						var object_id = $this.children('object_id').text();
						var title = $this.children('title').text();
            var message = $this.children('message').text();
            var sent = $this.children('sent').text().substr( 0, 16 );
						if ( title > '' )
							var html = '<h3>' + title + '<p>' + message + '</p><span style="margin-right:5px; margin-top:-18px;font-size:10px;">' + sent + '</span></h3>';
						else
							var html = '<h3><p>' + message + '</p><span class="roundcorner-date" style="font-size:10px;">' + sent + '</span></h3>';

						var li = $('<li ' + iif(odd, 'data-theme="a"', 'data-theme="a"') + ' />');

						var a = $('<a/>',
							{
							html: html,
							href: '#',
							onclick: 'javascript:setTimeout( function(){showMessagePage( "' + object_id + '" );}, 50 )'
							}
						);

						li.append(a);
						$("#messagesList").append(li);

						odd = !odd;

					}
				);

				$("#messagesList").listview("refresh");

			},
		error: function(XMLHttpRequest, textStatus, errorThrown)
			{

				$("#messagesList").empty();
				$("#messagesList").append('<li><h2>Ett fel uppstod</h2><p>Misslyckades h&auml;mta meddelanden fr&aring;n databasen. Det kan bero p&aring; att webbtj&auml;nsten &auml;r o&aring;tkomlig. F&ouml;rs&ouml;k igen senare.</p><p>' + errorThrown + '</p></li>');
				$("#messagesList").listview("refresh");

			}
		}
	);

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- showMessage
function showMessagePage( object_id )
{

	$.ajax(
		{
			type: "GET",
			url: getMessagesUri,
			data: 'message_id=' + object_id,
			cache: false,
			async: true,
			crossDomain: true,
			dataType: "xml",
			beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
			success: function(xml)
			{

				var $item = $(xml).find('items>item');

				$("#messageTitle").html( $item.children('title').text() );
				$("#messageMessage").html( $item.children('message').text() );
				$("#messageSent").html( $item.children('sent').text().substr( 0, 16 ) );

				$.mobile.changePage( "#messagePage" );

			},
			error: function(XMLHttpRequest, textStatus, errorThrown)
			{

				$.mobile.changePage( "#servicePage" );

			}
		}

	);

}


// ----------------------------------------------------------------------------- tearTicket
function tearTicket(id)
{

	var result = 0;

	if (confirm('Om du fortsätter kommer biljetten att rivas och kommer inte kunna användas igen.'))
	{

		$.ajax(
			{
			type: "POST",
			url: tearTicketUri,
			cache: false,
			async: false,
			data: "code=" + id,
			crossDomain: true,
			dataType: "xml",
			beforeSend: function(xhr)
				{

					setHeaders(xhr);

				},
			success: function(xml)
				{

					if ($(xml).find('result>code').text() == resSuccess)
						//      result = 1;
//						$('#popupOk_' + id).popup('open');
						$('#popupOk').popup('open');
					else
						$('#popupFault').popup('open');
//						$('#popupFault_' + id).popup('open');
					//      result = 2;

					$('.np-tickets-left').html($(xml).find('result>tickets_left').text() + ' biljetter kvar av ' + $(xml).find('result>tickets').text());

				},
			error: function(XMLHttpRequest, textStatus, errorThrown)
				{

					$.mobile.changePage( '#servicePage' );

				}

			}
		);

	}

	return result;

}
// ----------------------------------------------------------------------------- tearTicket end


// ----------------------------------------------------------------------------- registerAppForPush
function registerAppForPush( aid, aos )
{

//		id = window.localStorage.getItem("device_id");
//		os_type = window.localStorage.getItem("os_type");

//	if ( isLoggedIn() && ( aid > "" ) && ( id != aid ) )
	if ( ! pushIsRegistered )
	{

		$.ajax(
			{
			type: "POST",
			url: wsRegisterAppForPushURL,
			cache: false,
			async: true,
			data: 'push_id=' + aid + '&os_type=' + aos,
			crossDomain: true,
			dataType: "xml",
			beforeSend: function(xhr)
				{

					setHeaders(xhr);

				},
			success: function(xml)
				{

					if ($(xml).find('result>code').text() == resSuccess)
					{

						window.localStorage.setItem( "device_id", aid );
						window.localStorage.setItem( "os_type", aos );
						pushIsRegistered = true;

					}

				},
			error: function(XMLHttpRequest, textStatus, errorThrown)
				{

					$.mobile.changePage( '#servicePage' );

				}

			}
		);

	}

}
// ----------------------------------------------------------------------------- registerAppForPush end


function fnuffed(value)
{

	return fnuff + value + fnuff;

}

function QuotedStr(value)
{

	return fnuff + value + fnuff;

}

// ----------------------------------------------------------------------------- loadTicketsList
function loadTicketsList()
{

	$("#ticketsPageList").empty();
	$("#ticketsPageText").html('');
	$(".np-qrcode-container").text('');

	var jqxhr = $.ajax(
		{
		type: 'GET',
		url: getTicketsUri,
		dataType: 'xml',
		beforeSend: function(xhr) {
				$("#ticketsPageText").html('Laddar dina biljetter...');
				setHeaders(xhr);
			}
		}
	);

	jqxhr.done(
		function(data)
		{

			var $this = $(this);
			var id = $this.attr('id');
			var xml = $(data);

			$(xml).find('item').each(
				function()
				{

					var $this = $(this);
					var id = $this.attr('id');

					var ticketsLeft = parseInt($this.children('items').text()) - parseInt($this.children('swipes').text());
					if (ticketsLeft == 0)
						ticketsText = '<font color="red">Inga biljetter kvar</font>';
					else if (ticketsLeft == 1)
						ticketsText = ticketsLeft + ' biljett kvar av ' + $this.children('items').text();
					else
						ticketsText = ticketsLeft + ' biljetter kvar av ' + $this.children('items').text();

					var li = $('<li/>');
					var a = $('<a/>',
						{
						html: '<h3>' + $this.children('name').text() + '<span class="ui-li-count ui-btn-corner-all" style="margin-right:5px; margin-top:-18px;">' + ticketsLeft + '</span></h3>' + '<p>' + $this.children('display_date').text() + ' - ' + $this.children('venue_name').text() + '</p>',
						href: 'javascript:showTicketPage( "' + id + '" );'
						}
					);
					li.append(a);
					$("#ticketsPageList").append(li);

				}
			);

			$("#ticketsPageList").listview("refresh");

		}
	);

	jqxhr.always(
		function()
		{

			if ($('#ticketsPageList').size() == 0)
				$("#ticketsPageText").html('Det finns inga biljetter registrerade på ditt konto. Köp några vet ja...');
			else
				$("#ticketsPageText").html('');

		}
	);

}

function showTicketPage(id)
{

	var jqxhr = $.ajax(
		{
		type: 'GET',
		data: 'ticket_id=' + id,
		url: getTicketsUri,
		dataType: 'xml',
		beforeSend: function(xhr) {
				setHeaders(xhr);
			}
		}
	);

	jqxhr.done(
		function(data)
		{

			var $this = $(this);
			var xml = $(data);

			var price = '';;
			if ($(xml).find('item>price').text() == "") price = 'Gratis';
			else price = $(xml).find('item>price').text() + 'kr / biljett';

			$("#ticketInfoClubName").html($(xml).find('item>name').text());
			$("#ticketInfoStartTime").html($(xml).find('item>start_time').text().substr(0, 16));
			$("#ticketInfoEndTime").html($(xml).find('item>end_time').text().substr(0, 16));
			$("#ticketInfoVenueName").html($(xml).find('item>venue_name').text());
			$("#ticketInfoDescription").html($(xml).find('item>description').text());
			$("#ticketInfoTerms").html($(xml).find('info').text());
			$("#ticketInfoTicketsLeft").html(parseInt($(xml).find('item>items').text()) - parseInt($(xml).find('item>swipes').text()) + ' av ' + $(xml).find('item>items').text());
			$("#ticketInfoPrice").html(price);
			$("#ticketInfoTearTicket")
			.unbind()
			.click(
				function()
				{
					tearTicket(id)
				}
			);
			jQuery("#ticketInfoQR").empty();
			jQuery("#ticketInfoQR").qrcode({text: id, width: 100, height: 100});

		}
	);

	jqxhr.always(
		function()
		{

			$.mobile.changePage('#ticketPage');

		}
	);

}


// ----------------------------------------------------------------------------- showClub
function showClub(club_id)
{

	window.localStorage.setItem("club_details_id", club_id);
	$.mobile.changePage('#clubDetailsPage');

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- loadClubDetails
function loadClubDetails()
{

	if ( isLoggedIn() )
		$('#clubLoginButton').hide();
	else
		$('#clubLoginButton').show();

	$.ajax(
		{
		url: getClubsUri,
		cache: false,
		async: true,
		crossDomain: true,
		data: 'club_id=' + window.localStorage.getItem("club_details_id"),
		dataType: "xml",
		beforeSend: function(xhr) {

				setHeaders(xhr);

			},
		success: function(xml) {

				var tickets = parseInt( $(xml).find('items>item>tickets').text() ) - parseInt( $(xml).find('items>item>tickets_sold').text() );
				var price = parseInt($(xml).find('items>item>price').text());

				if ( tickets < 0 )
					tickets = 0;

				$("#addToTicketsButton").hide();
				$('#addToCartButton').hide();

				$("#clubId").html($(xml).find('items>item>object_id').text());
				$("#clubInfoName").html($(xml).find('items>item>name').text());
				$("#clubInfoDescription").html($(xml).find('items>item>description').text());
				$("#clubInfoDate").html($(xml).find('items>item>start_time').text().substr(0, 10));
				$("#clubInfoTime").html($(xml).find('items>item>start_time').text().substr(11, 5));

				$("#clubInfoVenueName").html($(xml).find('items>item>venue_name').text());
				$("#clubInfoAge").html($(xml).find('items>item>age').text());
				$("#clubInfoInfo").html($(xml).find('items>item>info').text());
				$("#clubInfoStartTime").html($(xml).find('items>item>start_time').text());

				if ( $(xml).find( 'items>item>for_sale' ).text() == 'True' )
				{

					if (price > 0) {
						$("#clubInfoPrice").html(price + '&nbsp;kr');

						if ( isLoggedIn() )
							$('#addToCartButton').show();
					}
					else {
						$("#clubInfoPrice").html('Gratis');
						$('#addToCartButton').hide();
						if ( isLoggedIn() )
							$("#addToTicketsButton").show();
					}

					if ( tickets == 0 )
					{
						$("#clubInfoTicketsAvailable").html( 'Inga biljetter tillgängliga.' );
						$('#addToCartButton').hide();
						$("#addToTicketsButton").hide();
					}
					else
					{
						if ( tickets > 10 )
							$("#clubInfoTicketsAvailable").html( '10+ biljetter kvar');
						else
							$("#clubInfoTicketsAvailable").html( tickets + ' biljetter kvar');
					}
				}
				else
				{
					$("#addToTicketsButton").hide();
					$('#addToCartButton').hide();
					$("#clubInfoPrice").html(price + '&nbsp;kr');
					$("#clubInfoTicketsAvailable").html( 'Du kan inte köpa biljetter här' );
				}

				$("#clubInfoGuestlistTicketsAvailable").html($(xml).find('items>item>guestlist_tickets_available').text());
				$("#clubInfoAddress").html($(xml).find('items>item>address').text());

				if ($(xml).find('items>item>website').text())
					$("#clubInfoWebSite").html('<a href="#" onclick="window.open( \'' + $(xml).find('items>item>website').text() + '\', \'_system\' ); return false;">Webbsida</a>');
				else
					$("#clubInfoWebSite").html('');


				if ($(xml).find('items>item>facebook').text())
					$("#clubInfoFacebook").html('<a href="#" onclick="window.open( \'' + $(xml).find('items>item>facebook').text() + '\', \'_system\' ); return false;">Öppna Facebook</a>');
				else
					$("#clubInfoFacebook").html('');

			},
		error: function(XMLHttpRequest, textStatus, errorThrown) {

				$.mobile.changePage( '#servicePage' );

			}
		}
	);

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- loadGuideList
function loadGuideList()
{

	var pars = "";
	if (window.localStorage.getItem("city") == undefined)
		pars = "";
	else
		pars = 'city_id=' + window.localStorage.getItem("city");

	$("#vertGuidePageList").empty();
	$.ajax
	(
		{
		type: "GET",
		url: getClubsUri,
		cache: false,
		async: true,
		crossDomain: true,
		data: pars,
		dataType: "xml",
		beforeSend: function(xhr) {

				setHeaders(xhr);

			},
		success: function(xml)
			{

				var xml = $(xml);
				var lastDay = '';

				$(xml).find('item').each(
					function()
					{

						var $this = $(this);

						var tickets = parseInt($this.children('tickets').text()) - parseInt($this.children('tickets_sold').text());

						var bubble = '';
						if ( $this.children( 'for_sale' ).text() == 'True' )
						{
							if (tickets == 0) bubble = 'Slutsålt';
							else if (tickets == 1) bubble = 'En biljett';
							else if (tickets > 10) bubble = '10+ biljetter';
							else if (tickets > 1) bubble = tickets + ' biljetter';
						}


						// Lägger in dagsrubriker relativt till idag i listan
						var days = 0;

				    var start = new Date();
				    var end = new Date( $this.children('display_date').text() );

						start.setHours(0,0,0,0);
						end.setHours(0,0,0,0);
				    var days = parseInt( ( end - start )/1000/60/60/24 );

						if ( days < 0 ) dayText = 'TIDIGARE';
						else if ( days == 0 ) dayText = 'IDAG';
						else if ( days == 1 ) dayText = 'IMORGON';
						else if ( days <= 7 ) dayText = 'KOMMANDE 7 DAGAR';
						else dayText = 'LÄNGRE FRAM';

						if ( lastDay != dayText ) {

							lastDay = dayText;
							$("#vertGuidePageList").append( '<li data-role="list-divider">' + dayText + '</li>' );

						}

						// Skapa list-<li>
						var li = $('<li/>');

						if ( bubble > '' )
						{
							var a = $('<a/>',
								{
								html: '<h3>' + $this.children('name').text() + '</h3><p>' + $this.children('display_date').text() + ' - ' + $this.children('venue_name').text() + '</p><span class="ui-li-count ui-btn-corner-all" style="margin-top:-21px; background-color:#FFF; border:0px;">' + bubble + '</span></h3>',
								href: 'javascript:showClub( "' + $this.children('object_id').text() + '" )'
								}
							);
						}
						else
						{
							var a = $('<a/>',
								{
								html: '<h3>' + $this.children('name').text() + '</h3><p>' + $this.children('display_date').text() + ' - ' + $this.children('venue_name').text() + '</p>',
								href: 'javascript:showClub( "' + $this.children('object_id').text() + '" )'
								}
							);
						}

						li.append(a);
						$("#vertGuidePageList").append(li);

					}
				);

/*					,
				$("#vertGuidePageList").listview({
					autodividers:true
					autodividersSelector: function ( li ) {
						// "li" is the list item, you can get the text via li.text()
						// and then you return whatever you want - in text that is
						return li.text().substring(0,10).toUpperCase();

					}
				}).listview("refresh");
*/

				$("#vertGuidePageList").listview("refresh");

			},
		error: function(XMLHttpRequest, textStatus, errorThrown)
			{

				$.mobile.changePage( '#servicePage' );

			}
		}
	);

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- loadGuideList
function loadGuideList_x(weekday)
{

	var data = "";
	if (weekday == "undefined") weekday = '-1';

	$.ajax
	(
		{
		type: "GET",
		url: getEventsUri,
		cache: false,
		async: false,
		crossDomain: true,
		data: "weekday=" + weekday + '&category=' + window.localStorage.getItem("city"),
		dataType: "xml",
		beforeSend: function(xhr) {

				setHeaders(xhr);

			},
		success: function(xml)
			{

				var xml = $(xml);
				var odd = false;
				var content = "";

				$(xml).find('item').each(
					function()
					{

						var $this = $(this);

						var buyButton = "";

						if (isLoggedIn() == false)
							buyButton = '<a href="javascript:loginout();" data-role="button" data-corners="false">Logga in för att köpa</a>';
						else if (! cellphoneConfirmed)
							buyButton = '<a href="#confirmCellPhonePage" data-role="button" data-corners="false">Bekräfta mobilnummer för att köpa</a>';
						else if (isLoggedIn() == true)
						{

							if (parseInt($this.children('tickets_sold').text()) < parseInt($this.children('tickets').text()))
							{

								buyButton =
								'<a href="#" onclick="WyWalletPurchase( ' + fnuffed(cellphone) + ', ' + fnuffed($this.children('entre').text()) + ', ' + fnuffed($this.children('vat').text()) + ', ' + fnuffed($this.attr('id')) + ' );" data-role="button" data-corners="false">Köp med WyWallet</a>'
								+ '<a href="#" onclick="dibsPurchase( ' + fnuffed(cellphone) + ', ' + fnuffed($this.children('entre').text()) + ', ' + fnuffed($this.children('vat').text()) + ', ' + fnuffed($this.attr('id')) + ' );" data-role="button" data-corners="false">Köp med Visa</a>';

							}

						}

						if ($this.children('facebook').text() > "")
						{

							fbButton = '<a href="#" onclick="window.open( ' + fnuff + $this.children('facebook').text() + fnuff + ', ' + fnuff + '_system' + fnuff + ' );" d_ata-role="button" d_ata-corners="false">Visa på Facebook</a>';

						}
						else
							fbButton = '';


						content = content
						+ '<div data-role="collapsible" data-corners="false" ' + iif(odd, 'data-theme="a"', 'data-theme="a"') + ' data-content-theme="a" style="margin:0px; color:white;">'
						+ '<h2 style="margin:0px; padding:0px;">'
						+ '<div style="width:80%; float:left;">'
						+ $this.children('name').text()
						+ '<br>'
						+ '<p style="margin-top:0px; margin-bottom:0px; font-size:12px;">'
						+ 'Plats: ' + $this.children('location').text()
						+ '</p>'
						+ '</div>'
						+ '</h2>'
						+ '<div>'
						+ buyButton
						+ '<p>' + $this.children('description').text() + '</p>'
						+ '<table class="np-clubs-table">'
						+ '<tr valign="top"><td style="color:#C0C0C0;">Datum</td> <td>' + $this.children('date').text() + '</td></tr>'
						+ '<tr valign="top"><td style="color:#C0C0C0;">Tid</td> <td>' + $this.children('start_time').text() + '-' + $this.children('end_time').text() + '</td></tr>'
						+ iif(($this.children('sales_start').text() > ""), '<tr valign="top"><td style="color:#C0C0C0;">Säljstart</td> <td>' + $this.children('sales_start').text().substring(0, 16) + '</td></tr>', '')
						+ iif(($this.children('sales_stop').text() > ""), '<tr valign="top"><td style="color:#C0C0C0;">Säljstopp</td> <td>' + $this.children('sales_stop').text().substring(0, 16) + '</td></tr>', '')
						+ iif(($this.children('age_male').text() > ""), '<tr valign="top"><td style="color:#C0C0C0;">Ålder</td> <td>' + $this.children('age_male').text() + ' år</td></tr>', '')
						+ iif(($this.children('location').text() > ""), '<tr valign="top"><td style="color:#C0C0C0;">Plats</td> <td>' + $this.children('location').text() + '</td></tr>', '')
						+ iif(($this.children('entre').text() > ""), '<tr valign="top"><td style="color:#C0C0C0;">Entré</td> <td>' + $this.children('entre').text() + ' kr (varav moms ' + $this.children('vat_amount').text() + ' kr) </td></tr>', '')

						//           + '<tr valign="top"><td colspan="2"><h2>NP-villkor</h2></td></tr>'
						//           + '<tr valign="top"><td nowrap style="color:#C0C0C0;">18+</td> <td>' + $this.children( 'sommarkort18' ).text() + '</td></tr>'
						//           + '<tr valign="top"><td nowrap style="color:#C0C0C0;">20+</td> <td>' + $this.children( 'sommarkort20' ).text() + '</td></tr>'
						//           + '<tr valign="top"><td nowrap style="color:#C0C0C0;">NP TIX</td> <td>' + $this.children( 'nptix' ).text() + '</td></tr>'

						+ '<tr><td colspan="2"><h2>Information</h2></td></tr>'
						+ '<tr valign="top"><td style="color:#C0C0C0;">Info</td> <td>' + $this.children('info').text() + '</td></tr>'
						+ iif(($this.children('on_stage').text() > ""), '<tr valign="top"><td style="color:#C0C0C0;">På scen</td> <td>' + $this.children('on_stage').text() + '</td></tr>', '')
						+ iif(($this.children('dj').text() > ""), '<tr valign="top"><td style="color:#C0C0C0;">DJ</td> <td>' + $this.children('dj').text() + '</td></tr>', '')
						+ '<tr valign="top" style="color:#C0C0C0;"><td>Facebook</td> <td>' + fbButton + '</td></tr>'
						+ '<tr><td colspan="2"><h2>Adress</h2></td></tr>'
						+ '<tr><td style="color:#C0C0C0;">Gata</td> <td>' + $this.children('street').text() + '</td></tr>'
						+ '<tr><td style="color:#C0C0C0;">Postnr</td> <td>' + $this.children('zipcode').text() + ' ' + $this.children('city').text() + '</td></tr>'
						+ iif(($this.children('phone').text() > ""), '<tr><td style="color:#C0C0C0;">Telefon</td> <td>' + $this.children('phone').text() + '</td></tr>', '')
						+ '</table>'
						+ '</div>'
						+ '</div>'
						;

						odd = ! odd

					}
				);

				$("#guidePageList").html(content);
				$("#guidePageList").trigger('create');

			},
		error: function(XMLHttpRequest, textStatus, errorThrown)
			{

				$.mobile.changePage( '#servicePage' );

			}
		}
	);

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- loadOffersList
function loadOffersList(element)
{

	$.ajax
	(
		{
		type: "GET",
		url: getOffersUri,
		cache: false,
		async: false,
		crossDomain: true,
		data: "",
		dataType: "xml",
		beforeSend: function(xhr) {

				setHeaders(xhr);

			},
		success: function(xml)
			{

				var xml = $(xml);
				var odd = false;
				var content = "";

				$(xml).find('item').each(
					function()
					{

						var $this = $(this);

						var buyButton = "";

						if (isLoggedIn() == false)
							buyButton = '<a href="javascript:loginout();" data-role="button" data-corners="false">Logga in för att hämta erbjudandet</a>';
						else if (! cellphoneConfirmed)
							buyButton = '<a href="#confirmCellPhonePage" data-role="button" data-corners="false">Bekräfta mobilnummer för att hämta erbjudandet</a>';
						else if (isLoggedIn() == true)
						{

							buyButton = '<a href="#" onclick="WyWalletPurchase( ' + fnuffed(cellphone) + ', ' + fnuffed($this.children('entre').text()) + ', ' + fnuffed($this.children('vat').text()) + ', ' + fnuffed($this.attr('id')) + ' );" data-role="button" data-corners="false">Köp med WyWallet</a>';

						}

						if ($this.children('facebook').text() > "")
						{

							fbButton = '<a href="#" onclick="window.open( ' + fnuff + $this.children('facebook').text() + fnuff + ', ' + fnuff + '_system' + fnuff + ' );" d_ata-role="button" d_ata-corners="false">Visa på Facebook</a>';

						}
						else
							fbButton = '';


						content = content
						+ '<div data-role="collapsible" data-corners="false" ' + iif(odd, 'data-theme="a"', 'data-theme="a"') + ' data-content-theme="a" style="margin:0px; color:white;">'
						+ '<h2 style="margin:0px; padding:0px;">'
						+ '<div style="width:80%; float:left;">'
						+ $this.children('name').text()
						+ '<br>'
						+ '<p style="margin-top:0px; margin-bottom:0px; font-size:12px;">'
						+ 'Säljställe: ' + $this.children('location').text()
						+ '</p>'
						+ '</div>'
						+ '</h2>'
						+ '<div>'
						+ buyButton
						+ '<p>' + $this.children('description').text() + '</p>'
						+ '<table class="np-clubs-table">'
						+ '<tr><td colspan="2"><h2>Information</h2></td></tr>'
						+ '<tr valign="top"><td style="color:#C0C0C0;">Info</td> <td>' + $this.children('info').text() + '</td></tr>'
						+ '<tr valign="top" style="color:#C0C0C0;"><td>Facebook</td> <td>' + fbButton + '</td></tr>'
						+ '</table>'
						+ '</div>'
						+ '</div>'
						;

						odd = ! odd

					}
				);

				element.html(content);
				element.trigger('create');

			},
		error: function(XMLHttpRequest, textStatus, errorThrown)
			{

				$.mobile.changePage( '#servicePage' );

			}
		}
	);

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- loadAccount
function loadAccount()
{

	$.ajax(
		{
		type: "GET",
		url: getNewslettersUri,
		cache: false,
		async: false,
		data: "",
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
		success: function(xml)
			{

				var content = "";
				var li = "";

				//    $( "#div-newsletters" ).empty();

				var ul = $("#ul-newsletter");
				ul.empty();

				$(xml).find('item').each(
					function()
					{

						var $this = $(this);
						var state = 'CHECKED';
						if (userId > '') state = '';

						var chk = $('input/>',
							{
							id: 'newsletter_' + $this.children('code').text(),
							type: 'checkbox',
							value: 'ON'
							}
						);

						var lbl = $('label',
							{
							for: 'newsletter_' + $this.children('code').text(),
							html: $this.children('name').text()
							}
						);

						var li = $("<li/>"); //$('<li/>');
						li.append(chk);
						li.append(lbl);
						li.append('<input id="newsletter_' + $this.children('code').text() + '" type="checkbox"><label for="newsletter_' + $this.children('code').text() + '">' + $this.children('name').text() + '</label>');

						ul.append(li);

						//      content = content
						//       + '<input type="checkbox" id="newsletter_' + $this.children( 'code' ).text() + '" value="ON" ' + state + '>'
						//       + '<label for="newsletter_' + $this.children( 'code' ).text() + '">' + $this.children( 'name' ).text() + '</label>';


					}
				);

				//    ul.listview( "refresh" );
				ul.trigger("create");
				if (! isLoggedIn())
					$("input[type='checkbox']").attr("checked", true).checkboxradio("refresh");

				//    $( "#ul-newsletter" ).trigger( "create" );
				//    $("#ul-newsletter").listview("refresh").find('input').checkboxradio();
				//    $("#ulTest").listview("refresh").find('input').checkboxradio();

				//    $( "#div-newsletters" ).html( content );
				//    $( "#div-newsletters" ).trigger('create');

			},
		error: function(XMLHttpRequest, textStatus, errorThrown)
			{

				$.mobile.changePage( '#servicePage' );

			}

		}
	);

	$.ajax(
		{
		type: "GET",
		url: getAccountUri,
		cache: false,
		async: false,
		data: "",
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
		success: function(xml)
			{

				$("#firstName").val($(xml).find("item>first_name").text());
				$("#lastName").val($(xml).find("item>last_name").text());
				$("#personalId").val($(xml).find("item>personalno").text());

				if ($(xml).find("item>gender").text() == 'MALE')
					$("#gender_male").attr("checked", true); //.checkboxradio("refresh");
				if ($(xml).find("item>gender").text() == 'FEMALE')
					$("#gender_female").attr("checked", true); //.checkboxradio("refresh");

				$("#address").val($(xml).find("item>street").text());
				$("#zipcode").val($(xml).find("item>zipcode").text());
				$("#city").val($(xml).find("item>city").text());
				$("#email").val($(xml).find("item>email").text());
				$("#cellPhone").val($(xml).find("item>cellphone").text());

				if (isLoggedIn()) $("#agreement").attr("checked", true).checkboxradio("refresh");
				else $("#agreement").attr("checked", false).checkboxradio("refresh");

				var newsletters = $(xml).find("item>newsletters").text();
				var newsletter_array = newsletters.split("\n");

				for (var i = 0; i < newsletter_array.length; i++) {

					$("#newsletter_" + newsletter_array[i].toUpperCase()).attr("checked", true).checkboxradio("refresh");

				}

			},
		error: function(XMLHttpRequest, textStatus, errorThrown)
			{

				$.mobile.changePage( '#servicePage' );

			}

		}
	);

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- loadAccount
function loadUserAgreement()
{

	$.ajax(
		{
		type: "GET",
		url: getUserAgreementUri,
		cache: false,
		async: false,
		data: "",
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
		success: function(xml)
			{

				if ($(xml).find("result>code").text() == 'SUCCESS')
					$("#userAgreementPageTop").html($(xml).find("result>data").text());
				else
					$("#userAgreementPageTop").html("De allmänna villkoren kunde inte hämtas just nu. Försök igen senare.");

				$("#userAgreementPageTop").trigger('create');


			},
		error: function(XMLHttpRequest, textStatus, errorThrown)
			{

				$("#userAgreementPageTop").html("<h2>Ett fel uppstod</h2><p>De allmänna villkoren kunde inte hämtas just nu. Försök igen senare.</p> " + errorThrown);

			}

		}
	);

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- loadSupport
function loadSupportPageTop()
{

	$.ajax(
		{
		type: "GET",
		url: getSupportPageUri,
		cache: false,
		async: false,
		data: "",
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
		success: function(xml)
			{

				if ($(xml).find("result>code").text() == 'SUCCESS')
					$("#supportPageTop").html($(xml).find("result>data").text());
				else
					$("#supportPageTop").html("Supportsidan kunde inte hämtas just nu. Försök igen senare.");

				if (userId > "") $("#email").val(userId);

			},
		error: function(XMLHttpRequest, textStatus, errorThrown)
			{

				$("#supportPageTop").html("<h2>Ett fel uppstod</h2><p>Supportsidan kunde inte hämtas just nu. Försök igen senare.</p> " + errorThrown);

			}

		}
	);

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- Logout
function logout()
{

	userId = "";
	password = "";
	window.localStorage.removeItem("userId");
	window.localStorage.removeItem("password");
	window.localStorage.removeItem("role");

	refreshControls();
	$.mobile.changePage("#loginPage");
//	location.reload(true);

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- Logout
function loginout()
{

	if (userId == null) {

		$.mobile.changePage("#loginPage");

	}
	else {

		$.mobile.changePage("#logoutPage");

	}

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- changeButtonText
(function($)
	{
		/*
   * Changes the displayed text for a jquery mobile button.
   * Encapsulates the idiosyncracies of how jquery re-arranges the DOM
   * to display a button for either an <a> link or <input type="button">
   */
		$.fn.changeButtonText = function(newText) {
			return this.each(function()
				{
					$this = $(this);
					if($this.is('a')) {
						$('span.ui-btn-text', $this).text(newText);
						return;
					}
					if($this.is('input')) {
						$this.val(newText);
						// go up the tree
						var ctx = $this.closest('.ui-btn');
						$('span.ui-btn-text', ctx).text(newText);
						return;
					}
				}
			);
		};
	}
)(jQuery);
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- accountForm submition
//$("#accountForm").submit(function(event) {
function postAccount()
{

	if (!validateAccountForm()) return false;

	var params = $("#accountForm").serialize();
	var c = "";

	for (var i = 0; i < newsLetters.length; i++) {

		var n = newsLetters[i].split("=");

		if ($("#newsletter_" + n[0]).is(':checked'))
			c = c + n[0] + ',';

	}

	if (newsLetters > "")
		params = params + '&newsletters=' + c;

	$.ajax(
		{
		type: "POST",
		url: postAccountUri,
		data: params,
		async: true,
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
		success: function(xml)
			{

				var resCode = $(xml).find('nattpasset>result>code').text();
				var resEmail = $(xml).find('nattpasset>result>email').text();

				if (resCode == resSuccess)
				{

					userId = resEmail;
					window.localStorage.setItem("userId", resEmail);

					$.mobile.changePage('#accountSavedPage');

				}
				else
				{

					var resDescription = $(xml).find('result>description').text();
					errorPage("Vi misslyckades att spara uppgifterna i ditt konto. Se beskrivningen nedan, åtgärda problemet och försök igen.", resDescription);

				}

			},
		error: function(XMLHttpRequest, textStatus, errorThrown) {

				$.mobile.changePage( '#servicePage' );

			}

		}
	);

}


// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- supportForm submit
$("#supportForm").submit(function(event)
	{

		$.ajax(
			{
			type: "POST",
			url: postSupportUri,
			data: $(this).serialize(),
			success: function(xml) {

					var resCode = $(xml).find("result>code").text();

					if (resCode == resSuccess) {

						infoPage("Tack för din fråga", "Vi återkommer till dig med svar så fort vi kan", "#supportPage", "Tillbaks")

					}
					else {

						errorPage('Fel', errorThrown, 'Tillbaka');

					}

				},
			error: function(XMLHttpRequest, textStatus, errorThrown) {

					$.mobile.changePage( '#servicePage' );

				},
			complete: function()
				{

					location.reload();

				}

			}
		);

	}
);
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- validateAccountForm
function validateAccountForm()
{

	var faults = "";


	if (! $("#accAgreement").is(":checked"))
	{

		alert("Du måste acceptera NattPassets användarvillkor.");
		return false;

	}

	if ($("#firstName").val() == "") faults = faults + "- Ange förnamn\r";
	if ($("#lastName").val() == "") faults = faults + "- Ange efternamn\r";

	if ((! $("#noPersonalId").is(":checked")) && (! checkPersonalNoField($("#personalId")))) faults = faults + "- Ange personnummer\r";


	if ($("#address").val() == "") faults = faults + "- Ange adress\r";
	if ($("#zipcode").val() == "") faults = faults + "- Ange postnummer\r";
	if ($("#email").val() == "") faults = faults + "- Ange epost\r";
	if ($("#cellPhone").val() == "") faults = faults + "- Ange mobilnummer\r";

	if (faults > "")
	{

		faults = "Ett eller flera fält har inte fyllts i\r\r" + faults;
		errorPage("Valideringsfel", faults);
		return false;

	}

	return true;

}


// ----------------------------------------------------------------------------- validateSupportForm
function validateSupportForm()
{

	var faults = "";


	if ($("#contactEmail").val() == "") faults = faults + "- Ange din epostadress\r";
	if ($("#description").val() == "") faults = faults + "- Ange en fråga eller ett meddelande\r";

	if (faults > "")
	{

		faults = "Ett eller flera fält har inte fyllts i\r\r" + faults;
		errorPage("Valideringsfel", faults);
		return false;

	}

	return true;

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- validateChangePasswordForm
function validateChangePasswordForm()
{

	var faults = "";


	if ($("#newPassword").val() == "") faults = faults + "- Ange det nya lösenord\r";
	if ($("#confirmPassword").val() == "") faults = faults + "- Bekräfta det nya lösenordet\r";
	if ($("#newPassword").val() != $("#confirmPassword").val()) faults = faults + "- Det bekräftade lösenordet stämmer inte\r";

	if (faults > "")
	{

		faults = "Valideringsfel\r\r" + faults;
		errorPage("Valideringsfel", faults);
		return false;

	}

	return true;

}
// -----------------------------------------------------------------------------


// ----------------------------------------------------------------------------- validateUser
function validateUser(authUserId, authPassword)
{

	var ok = false;

	$.ajax(
		{
		type: "GET",
		url: loginPostUri,
		data: 'userId=' + authUserId + '&password=' + authPassword, //values,
		async: false,
		success: function(xml) {

				var resCode = $(xml).find("result>code").text();
				var resRole = $(xml).find("result>role").text();


				if (resCode == resSuccess) {

					window.localStorage.setItem("userId", authUserId);
					window.localStorage.setItem("password", authPassword);
					window.localStorage.setItem("role", resRole);

					userId = authPassword;
					password = authPassword;
					role = resRole;

					ok = true;

					$.mobile.changePage('#homePage');
					location.reload();

				}
				else {

					errorPage("Inloggning misslyckades", "Inloggningen misslyckades, har du angivit rätt epost och lösenord?", "Logga in");

				}

			},
		error: function(XMLHttpRequest, textStatus, errorThrown) {

				$.mobile.changePage( '#servicePage' );

			}
		}
	);


	return ok;

}
// -----------------------------------------------------------------------------


function dibsPurchase(order_id, termsChecked )
{

	//alert( 'dibsPurchase: ' + order_id );

	if ( ! termsChecked ) {

		alert( 'Du måste godkänna köpvillkoren.' );
		return false;

	}

	var ref = window.open(webServiceUrl + 'purchase?payment_handler=DIBS&email=' + userId + '&order_id=' + order_id, '_blank', 'location=no');
	ref.addEventListener('loadstop',
		function(event) {
			if (event.url.indexOf("purchaseSucceeded") > 0)
				setTimeout(
					function()
					{
						$.mobile.changePage('#ticketsPage');
						ref.close();
					},
					5000);
			if (event.url.indexOf("purchaseFailed") > 0)
				setTimeout(
					function()
					{
						$.mobile.changePage('#guidePage');
						ref.close();
					},
					5000);
		}

	);

}

function addCartToTickets( cart_id, termsChecked )
{

//	alert( 'addCartToTickets: ' + cart_id );

	if ( ! termsChecked ) {

		alert( 'Du måste godkänna användarvillkoren.' );
		return false;

	}

	$.post(
		addCartToTicketsUri,
		'cart_id=' + cart_id,
		function( xml )
		{

			var resCode = $(xml).find("code").text();
			var resDescription = $(xml).find("description").text();

			if ( resCode == resFault )
			{
				alert( resDescription );
				return false;
			}

			$.mobile.changePage('#ticketsPage');

		},
		'xml'
	);

}

function checkPersonalNoField(element)
{

	var ok = false;
	var pno = element.val();

	// NP-512 Ric 2014-07-11
	// Validering av postnummer justerat
//  0123 45 6789
//	1966 09 18-1273
	var year = parseInt( pno.substring( 0, 2 ) );
	var month = parseInt( pno.substring( 4, 6 ) );
	var day = parseInt( pno.substring( 6, 8 ) );

	if ( ( pno.length >= 12 )
		&& ( ( year == 19 ) || ( year == 20 ) )
		&& ( ( month >= 1 && month <= 12 ) )
		&& ( ( day >= 1 && day <= 31 ) )
	)	{
		ok = true;
	}
	else 	{
		ok = false;
	}

	return ok;

}

function validateRegistrationForm(onOk, onFaults)
{

	var valid = true;

	$("#personalid-label").removeClass("np-error-field");
	$("#cellphone-label").removeClass("np-error-field");
	$("#email-label").removeClass("np-error-field");


	if ($("#regCellphone").val() == "")
	{
		$("#cellphone-label").addClass("np-error-field");
		valid = false;
	}

	if ($("#regNoPersonalId").is(":checked") == false) {

		if (! checkPersonalNoField($("#regPersonalId"))) {

			$("#personalid-label").addClass("np-error-field");
			valid = false;

		}

	}

	if ($("#regEmail").val() == "")
	{
		$("#email-label").addClass("np-error-field");
		valid = false;
	}

	if (valid == true) onOk(); else onFaults();

}

function postRegistration(formName)
{

	validateRegistrationForm(
		function() {

			$.ajax(
				{
				type: "POST",
				url: postRegistrationUri,
				data: $("#" + formName).serialize(),
				async: false,
				crossDomain: true,
				dataType: "xml",
				success: function(xml)
					{

						var resCode = $(xml).find('result>code').text();
						var resDescription = $(xml).find('result>description').text();
						var resUserId = $(xml).find('result>id').text();
						var resPassword = $(xml).find('result>password').text();

						if (resCode == resSuccess)
						{
							//alert( resUserId + "/" + resPassword );
							validateUser(resUserId, resPassword)
							//      $.mobile.changePage( '#accountCreatedPage' );

						}
						else
						{

							var resDescription = $(xml).find('result>description').text();
							errorPage('Fel', resDescription, 'Tillbaka');

						}

					},
				error: function(XMLHttpRequest, textStatus, errorThrown) {

					$.mobile.changePage( '#servicePage' );

					}

				}
			);

		},
		function() {

			errorPage('Fel', "Ett eller flera fält är felaktigt ifyllda", 'Tillbaka');

		}

	);

}


function addToCart(product_id)
{

	// alert( product_id );

	$.ajax(
		{
		type: "POST",
		url: postOrderUri,
		data: 'order_id=' + window.localStorage.getItem('cart_id') + '&productId=' + product_id,
		async: false,
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
		success: function(xml)
			{

				var resCode = $(xml).find('result>code').text();

				if (resCode == resSuccess)
				{

					//alert( $(xml).find( 'result>cart_id' ).text() );
					window.localStorage.setItem('cart_id', $(xml).find('result>cart_id').text());
					$.mobile.changePage('#cartPage');

				}
				else
				{

					var resDescription = $(xml).find('result>description').text();
					errorPage('Fel', resDescription, 'Tillbaka');

				}

			},
		error: function(XMLHttpRequest, textStatus, errorThrown) {

				$.mobile.changePage( '#servicePage' );
				$('#errorDiv').html( textStatus + '/' + errorThrown );

			}

		}
	);

}

function addToTickets(product_id)
{

	// alert( product_id );

	$.ajax(
		{
		type: "POST",
		url: postTicketUri,
		data: 'productId=' + product_id,
		async: false,
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
		success: function(xml)
			{

				var resCode = $(xml).find('result>code').text();

				if (resCode == resSuccess)
				{

					$.mobile.changePage('#ticketsPage');

				}
				else
				{

					var resDescription = $(xml).find('result>description').text();
					errorPage('Fel', resDescription, 'Tillbaka');

				}

			},
		error: function(XMLHttpRequest, textStatus, errorThrown) {

				$.mobile.changePage( '#servicePage' );

			}

		}
	);

}

function addProduct(row_id)
{
	//alert( row_id );

	$.ajax(
		{
		type: "POST",
		url: postAddToCartUri,
		data: 'order_row_id=' + row_id,
		async: true,
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
		success: function(xml)
			{

				var resCode = $(xml).find('result>code').text();

				if (resCode == resSuccess) {
					loadCart();
				}
				else {

					$('#popupCartError p').html( 'Det finns inga fler biljetter tillgängliga till evenemanget' );
					$('#popupCartError').popup('open');
					setTimeout( function() { $('#popupCartError').popup('close'); }, 3000 )

				}

			},
		error: function(XMLHttpRequest, textStatus, errorThrown) {

				$.mobile.changePage('#verticalGuidePage');

			}

		}
	);

}

function removeProduct(row_id)
{
	//alert( row_id );

	$.ajax(
		{
		type: "POST",
		url: postRemoveFromCartUri,
		data: 'order_row_id=' + row_id,
		async: true,
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
		success: function(xml)
			{

				loadCart();

			},
		error: function(XMLHttpRequest, textStatus, errorThrown) {

				$.mobile.changePage('#verticalGuidePage');

			}

		}
	);

}

function loadCart()
{

	var cartId = window.localStorage.getItem('cart_id');
	$(".cart-button").hide();

	$.ajax(
		{
		type: "GET",
		url: getCartUri,
		data: 'order_id=' + cartId,
		async: false,
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
		success: function(xml)
			{

				var total = 0;
				var items = 0;

				$(".cartItemsTable tr").remove();

/*
				$('.cartItemsTable').append(
					'<tr>'
					+ '	<td><b>Event</b></td>'
//					+ '	<td align="center" colspan="3"><b>Antal</b></td>'
					+ '	<td align="right" colspan="3"><b>Pris</b></td>'
					+ '</tr>'
				);
				$('.cartItemsTable').append(
					'<tr>'
					+ '	<td><b>Event</b></td>'
					+ '	<td align="right" colspan="3"><b>Pris</b></td>'
					+ '</tr>'
				);
*/
				$(xml).find('carts>cart>rows>row').each(
					function()
					{

						$('.cartItemsTable').append(
							'<tr>'
							+ '<td class="cartItemsName">' + $(this).find('name').text() + '</td>'
							+ '<td class="cartItemsAmount" align="right">' + $(this).find('amount').text() + '&nbsp;kr</td>'
							+ '<td align="right"><img src="img/button_red_remove.png" onclick="removeProduct( \'' + $(this).attr('id') + '\')"></td>'
							+ '<td align="left"><img src="img/button_green_add.png" onclick="addProduct( \'' + $(this).attr('id') + '\')"></td>'
							+ '</tr>'
						);
						items = items + 1;
/*
						$('.cartItemsTable').append(
							'<tr>'
							+ '	<td align="right" colspan="2"><img src="img/button_red_remove.png" onclick="removeProduct( \'' + $(this).attr('id') + '\')"> <img src="img/button_green_add.png" onclick="addProduct( \'' + $(this).attr('id') + '\')"> </td>'
							+ '</tr>'
						);
*/
/*
						$('.cartItemsTable').append(
							'<tr><td class="cartItemsName">' + $(this).find('name').text() + '</td>'
							+ '<td align="right"><img src="img/button_red_remove.png" onclick="removeProduct( \'' + $(this).attr('id') + '\')"></td>'
//							+ '<td class="cartItemsItems" align="center">' + $(this).find('items').text() + '</td>'
							+ '<td align="left"><img src="img/button_green_add.png" onclick="addProduct( \'' + $(this).attr('id') + '\')"></td>'
							+ '<td class="cartItemsAmount" align="right">' + $(this).find('amount').text() + '&nbsp;kr</td></tr>'
						);
*/
						total = total + parseInt($(this).find('amount').text());

					}
				);

				$('.cartItemsTable').append(
					'<tr>'
					+ '<td>Totalt</td>'
					+ '<td align="right">' + total + '&nbsp;kr</td>'
					+ '</tr>'
				);
/*
				$('.cartItemsTable').append(
					'<tr>'
					+ '<td colspan="3">Totalt</td>'
					+ '<td align="right">' + total + '&nbsp;kr</td>'
					+ '</tr>'
				);
*/

				// Hide button
				if (total > 0) $("#payCartButton").show();
				else $("#payCartButton").hide();

				if ( total == 0 && items > 0 ) $("#addCartButton").show();
				else $("#addCartButton").hide();

			},
		error: function(XMLHttpRequest, textStatus, errorThrown) {

				$.mobile.changePage( '#servicePage' );

			}

		}
	);

}

function getOptOuts()
{

	if (! isLoggedIn()) return true;

	$.ajax(
		{
		type: "get",
		url: getOptOutsUri,
		data: '',
		async: true,
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
		success: function(xml)
			{

				var resCode = $(xml).find('result>code').text();

				if (resCode == resSuccess)
				{

					if ($(xml).find('result>optout_reply').text() > '')
					{
						$("input[id='optout-facebook']").attr("checked", ($(xml).find('result>optout_facebook').text() == 'True')).checkboxradio("refresh");
						$("input[id='optout-push']").attr("checked", ($(xml).find('result>optout_push').text() == 'True')).checkboxradio("refresh");
					}
					else
					{
						$("input[id='optout-facebook']").attr("checked", true).checkboxradio("refresh");
						$("input[id='optout-push']").attr("checked", true).checkboxradio("refresh");
					}

					if ($(xml).find('result>optout_reply').text() > '')
						$("#optOut").hide();
					else
						$("#optOut").show();

				}
				else
				{

					var resDescription = $(xml).find('result>description').text();
					errorPage("Vi misslyckades att hämta dina inställningar. Se beskrivningen nedan, åtgärda problemet och försök igen.", resDescription);

				}

			},
		error: function(XMLHttpRequest, textStatus, errorThrown) {

				$.mobile.changePage( '#servicePage' );

			}

		}
	);

}
function setOptOuts()
{

	data = 'optout_facebook=' + $('#optout-facebook').is(":checked");
	data += '&optout_push=' + $('#optout-push').is(":checked");

	$.ajax(
		{
		type: "post",
		url: postOptOutsUri,
		data: data,
		async: true,
		crossDomain: true,
		dataType: "xml",
		beforeSend: function(xhr)
			{

				setHeaders(xhr);

			},
		success: function(xml)
			{

				var resCode = $(xml).find('result>code').text();

				if (resCode == resSuccess)
				{

					if ($(xml).find('result>code').text() == 'SUCCESS')
						$("#optOut").hide();
					else
						$("#optOut").show();

				}
				else
				{

					var resDescription = $(xml).find('result>description').text();
					errorPage("Vi misslyckades att ändra dina inställningar. Se beskrivningen nedan, åtgärda problemet och försök igen.", resDescription);

				}

			},
		error: function(XMLHttpRequest, textStatus, errorThrown) {

				$.mobile.changePage( '#servicePage' );

			}

		}
	);

}
function onDeviceReady() {
	document.addEventListener("backbutton", function(e)
		{
			if($.mobile.activePage.is('#homePage')) {
				e.preventDefault();
				navigator.app.exitApp();
			}
			else {
				navigator.app.backHistory()
			}
		}, false
	);
}
$(document).on("pagecreate", "#homePage", function()
	{
		$(document).on("swipeleft swiperight", "#homePage", function(e)
			{
				// We check if there is no open panel on the page because otherwise
				// a swipe to close the left panel would also open the right panel (and v.v.).
				// We do this by checking the data that the framework stores on the page element (panel: open).
				if ($(".ui-page-active").jqmData("panel") !== "open") {
					if (e.type === "swipeleft") {
						$("#valjstad").panel("open");
					} else if (e.type === "swiperight") {
						$("#menuPanel1").panel("open");
					}
				}
			}
		);
	}
);


/*
	Redeems a voucher
*/
function addVoucherCode( cartId, voucherCode )
{

	$.post(
		voucherUri,
		'cart_id=' + cartId + '&voucher_code=' + voucherCode,
		function(data)
		{

			var xml = $(data);

			//    alert($(xml).find('code').text() );
			if ($(xml).find('code').text() == resFault)
			{

				$('#popupCartError p').html( $(xml).find('description').text() );
				$('#popupCartError').popup('open');
				setTimeout( function() { $('#popupCartError').popup('close'); }, 3000 )

			}
			else
				location.reload( true );

		},
		'xml'
	);

}

function login()
{

	var authUserId = $("#loginUserId").val();
	var authPassword = $("#loginPassword").val();

	if (validateUser(authUserId, authPassword))
	{
//		registerAppForPush();
		refreshControls();
		$.mobile.changePage('#homePage');
	}
	else
		return false;

}


$("#changePasswordForm").submit(function(event)
	{

		$.ajax(
			{
			type: "POST",
			url: changePasswordUri,
			data: $(this).serialize(),
			beforeSend: function(xhr)
				{

					setHeaders(xhr);

				},
			success: function(xml) {

					var resCode = $(xml).find("result>code").text();
					var resDescription = $(xml).find("result>description").text();

					if (resCode == resSuccess) {

						infoPage("Nytt lösenord", "Ditt\tlösenord har nu\tändrats", "#homePage", "");

					}
					else {

						errorPage("Misslyckades", "", "#homePage", "");

					}

				},
			error: function(XMLHttpRequest, textStatus, errorThrown) {

				$.mobile.changePage( '#servicePage' );

				},
			complete: function()
				{

					location.reload();

				}

			}
		)

	}
);

/*
Scroll panelinside
*/
$('.panelinside').css({
    'height': ($(document).height()) + 'px'
});

$(window).resize(function () {
    $('.panelinside').css({
        'height': ($(document).height()) + 'px'
    });
});



// Enable cross-domain requests
jQuery.support.cors = true;

var online = true;

// Some app variables
if ( mode == 'debug' )
	var webServiceUrl = "http://npapp.local:8081/";
else if ( mode == 'test' )
	var webServiceUrl = "http://utv.nattpasset.com:8080/";
else
	var webServiceUrl = "http://ws.nattpasset.com:8080/";

var getInitUri = webServiceUrl + "init";
var getClubsUri = webServiceUrl + "clubs";
var getCartUri = webServiceUrl + 'cart';
var postOrderUri = webServiceUrl + 'orders';
var postTicketUri = webServiceUrl + 'ticket';
var postAddToCartUri = webServiceUrl + 'addToCart';
var postRemoveFromCartUri = webServiceUrl + 'removeFromCart';
var getOptOutsUri = webServiceUrl + 'optOut';
var postOptOutsUri = webServiceUrl + 'optOut';
var voucherUri = webServiceUrl + 'voucher';
var addCartToTicketsUri = webServiceUrl + 'addCartToTickets';

var loginPostUri = webServiceUrl + "validateLogin";
var getAccountUri = webServiceUrl + "accounts";
var postAccountUri = webServiceUrl + "accounts";
var postRegistrationUri = webServiceUrl + "registration";
var resetPasswordUri = webServiceUrl + "resetPassword";
var getHomePageUri = webServiceUrl + "homePage";
var getProductsTopUri = webServiceUrl + "productsTop";
var getProductsUri = webServiceUrl + "products";
var getHomePageNewsUri = webServiceUrl + "news";
var getProductUri = webServiceUrl + "products";
var getPurchaseUri = webServiceUrl + "makePurchase";
var getTicketsTopUri = webServiceUrl + "ticketsTop";
var getTicketsUri = webServiceUrl + "tickets";
var getMessagesUri = webServiceUrl + "messages";
var getOffersUri = webServiceUrl + "offers";
var getUserAgreementUri = webServiceUrl + "userAgreement";
var getSupportPageUri = webServiceUrl + "supportPage";
var getBarcodeUri = webServiceUrl + "barCode";
var getBannerUri = webServiceUrl + "banner";
var postSupportUri = webServiceUrl + "support";
var getNewslettersUri = webServiceUrl + "newsletters";
var getZipcodesUri = webServiceUrl + "zipcode";
var swipeCodeUrl = webServiceUrl + "swipe";
var getAdmClubsListUrl = webServiceUrl + "admClubs";
var changePasswordUri = webServiceUrl + "changePassword";
var getHomePageScreenUri = webServiceUrl + "homePageScreen";
var tearTicketUri = webServiceUrl + 'tearticket';
var wyWalletPurchaseUri = webServiceUrl + 'WyWalletPurchase';
var confirmCellPhoneURL = webServiceUrl + 'smsSendConfirmation';
var cellPhoneInfoUri = webServiceUrl + 'cellPhoneInfo';
var resendConfirmationSMSURL = webServiceUrl + 'resendConfirmationSMS';
var wsGetVerticalGuideURL = webServiceUrl + 'verticalGuideList';
var wsRegisterAppForPushURL = webServiceUrl + 'registerPushId';
var wsGetCitiesURL = webServiceUrl + 'cities';

var registrationURL = "http://nattpasset.se/shop/sv/registrering"; // "";
var accountURL = "http://nattpasset.se/shop/sv/registrering?back=my-account";
var passwordRecoveryURL = "http://NattPasset.se/shop/sv/password-recovery"; // "#changePasswordPage";

var facebookAppId = "153347458146940";
var deviceId = "";

var resSuccess = 'SUCCESS';
var resFault = 'FAULT';

// Menu button captions
var btnHome = "Hem";
var btnProducts = "Produkter";
var btnTickets = "Biljetter";
var btnGuide = "Klubbguiden";
var btnLogin = "Logga in";
var btnLogout = "Logga ut";
var btnAccount = "Konto";
var btnRegister = "Registrering";
var btnAdmin = "Admin";
var btnSupport = 'Support';
var homePageName = '#homePage';
var productsPageName = '#productsPage';
var ticketsPageName = '#ticketsPage';
var guidePageName = '#guidePage';
var supportPageName = '#supportPage';
var adminPageName = '#adminPage';


var headerHTML = '<img src="img/title.png" width="96" height="25" alt="">';

// DIBS Payment
var mobilePaymentWindowURL = "https://mopay.dibspayment.com/";

// Paypal payment
var payPalMobileCheckout = "https://mobile.paypal.com/wc?t=";

var userId = window.localStorage.getItem( "userId" );
var password = window.localStorage.getItem( "password" );
var role = window.localStorage.getItem( "role" );
var newsLetters = new Array();

var fnuff=String.fromCharCode(39);
var cellphone = "";
var cellphoneConfirmed = false;
var account_id = "";
var first_name = "";
var last_name = "";
var email = "";
var min_app_version = "";
var city = "";

var header =
	'	<div data-role="header" data-position="fixed" style="height:38px;"> '
+ '		<a href="#menuPanel" data-role="button" data-icon="grid" data-corners="false" data-iconpos="top" style="width:30px; height:30px; float:left;"></a>'
+ '		<a href="#" data-icon="back" data-corners="false" data-rel="back" style="clear:both;">Tillbaks</a>'
+ '	</div>'
+ '	<div id="menuPanel" data-role="panel" data-position="left" data-display="push" data-dismissible="true" data-theme="a">'
+ '		<h1>NattPasset</h1>'
+ '		<ul class="drawerListView" data-role="listview">'
+ '			<li data-role="list-divider"></li>'
+ '			<li><a href="javascript:loginout();" class="ui-btn-right np-ui-login-button">Logga in</a></li>'
+ '			<li><a href="javascript:account();" class="np-ui-account-button">Konto/Registrering</a></li>'
+ '			<li><a href="javascript:showOptout();">Opt out</a></li>'
+ '			<li><a id="np-ui-facebook-button" class="np-ui-facebook-button" data-icon="custom" data-corners="false" href="#facebookAttachPage" >Facebook</a></li>'
+ '			<li data-role="list-divider"></li>'
+ '			<li><a href="#supportPage">Om NattPasset/hj&auml;lp</a></li>'
+ '			<li><a href="javascript:openExternal( \'http://www.nattpasset.se/om-oss/cookies-allmanna-villkor\' );">Anv&auml;ndarvillkor</a></li>'
+ '			<li class="np-li-manager" data-role="list-divider">Administrat&ouml;rer och klubbar</li>'
+ '			<li class="np-li-manager" ><a href="#scanPage">Scanna entr&eacute;er</a></li>'
+ '			<li data-role="list-divider"></li>'
+ '			<li data-icon="delete" data-iconpos="left"><a href="#" data-rel="close" data-icon="delete" data-iconpos="left" data-inline="false" data-corners="false">St&auml;ng</a></li>'
+ '		</ul>'
+ '	</div>';

var footer =
	'	<div data-role="footer" data-position="fixed" data-theme="a"> '
+ '		<div data-role="navbar" data-position="fixed"> '
+ '			<ul> '
+ '				<li><a href="#homePage">Hem</a></li> '
+ '				<li><a href="#ticketsPage">Mina Biljetter</a></li> '
+ '			</ul> '
+ '		</div><!-- /navbar --> '
+ '	</div><!-- /footer --> ';


$(document).on("pageinit", function(e){

	$("#"+ $(e.target).attr('id') +" :jqmData(slidemenu)").addClass('slidemenu_btn');
	var sm = $($("#"+ $(e.target).attr('id') +" :jqmData(slidemenu)").data('slidemenu'));
	sm.addClass('slidemenu');

	$(document).on("swipeleft swiperight",".ui-page-active", function(e){
		console.log('b');
		e.stopImmediatePropagation();
		e.preventDefault();
		slidemenu(sm, sm.data('slideopen'));
	});

	$(document).on("click", ".ui-page-active :jqmData(slidemenu)", function(e) {
		slidemenu(sm, sm.data('slideopen'));
		e.stopImmediatePropagation();
		e.preventDefault();
	});
	
	$(document).on("click", "a:not(:jqmData(slidemenu))", function(e) {
		slidemenu(sm, true);
	});

	$(window).on('resize', function(e){
		if (sm.data('slideopen')) {
			console.log('sd');
			sm.css('top', getPageScroll()[1] + 'px');
			sm.css('width', '240px');
			sm.height(viewport().height);
			$(":jqmData(role='page')").css('left', '240px');
		}
	});
	
	$(window).scroll(function() {
		if (sm.data('slideopen')) {
			sm.css('top', getPageScroll()[1] + 'px');
		}
	});

});

function slidemenu(sm, only_close) {
	sm.height(viewport().height);
	if (!sm.data('slideopen') && !only_close) {
		sm.show().animate({width: '240px', avoidTransforms: false, useTranslate3d: true}, 'fast');
		$(".ui-page-active").css('left', '240px');
		sm.data('slideopen', true);
		if ($(".ui-page-active :jqmData(role='header')").data('position') == 'fixed') {
			$(".ui-page-active :jqmData(slidemenu)").css('margin-left', '250px');
		} else {
			$(".ui-page-active :jqmData(slidemenu)").css('margin-left', '10px');
		}
	} else {
		sm.animate({width: '0px', avoidTransforms: false, useTranslate3d: true}, 'fast', function(){sm.hide()});
		$(".ui-page-active").css('left', '0px');
		sm.data('slideopen', false);
		$(".ui-page-active :jqmData(slidemenu)").css('margin-left', '0px');
	}
	return false;
}

function viewport(){
	var e = window;
	var a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}

function getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;
    }
    return new Array(xScroll,yScroll)
}

$(document).bind('mobileinit', function () {
    $.mobile.allowCrossDomainPages = true;
    $.mobile.zoom.enabled = false;
    $.mobile.buttonMarkup.hoverDelay = 0; //defaults 200
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.defaultPageTransition = 'none';
});

(function(r){r.fn.qrcode=function(h){var s;function u(a){this.mode=s;this.data=a}function o(a,c){this.typeNumber=a;this.errorCorrectLevel=c;this.modules=null;this.moduleCount=0;this.dataCache=null;this.dataList=[]}function q(a,c){if(void 0==a.length)throw Error(a.length+"/"+c);for(var d=0;d<a.length&&0==a[d];)d++;this.num=Array(a.length-d+c);for(var b=0;b<a.length-d;b++)this.num[b]=a[b+d]}function p(a,c){this.totalCount=a;this.dataCount=c}function t(){this.buffer=[];this.length=0}u.prototype={getLength:function(){return this.data.length},
write:function(a){for(var c=0;c<this.data.length;c++)a.put(this.data.charCodeAt(c),8)}};o.prototype={addData:function(a){this.dataList.push(new u(a));this.dataCache=null},isDark:function(a,c){if(0>a||this.moduleCount<=a||0>c||this.moduleCount<=c)throw Error(a+","+c);return this.modules[a][c]},getModuleCount:function(){return this.moduleCount},make:function(){if(1>this.typeNumber){for(var a=1,a=1;40>a;a++){for(var c=p.getRSBlocks(a,this.errorCorrectLevel),d=new t,b=0,e=0;e<c.length;e++)b+=c[e].dataCount;
for(e=0;e<this.dataList.length;e++)c=this.dataList[e],d.put(c.mode,4),d.put(c.getLength(),j.getLengthInBits(c.mode,a)),c.write(d);if(d.getLengthInBits()<=8*b)break}this.typeNumber=a}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17;this.modules=Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=Array(this.moduleCount);for(var b=0;b<this.moduleCount;b++)this.modules[d][b]=null}this.setupPositionProbePattern(0,0);this.setupPositionProbePattern(this.moduleCount-
7,0);this.setupPositionProbePattern(0,this.moduleCount-7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(a,c);7<=this.typeNumber&&this.setupTypeNumber(a);null==this.dataCache&&(this.dataCache=o.createData(this.typeNumber,this.errorCorrectLevel,this.dataList));this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,c){for(var d=-1;7>=d;d++)if(!(-1>=a+d||this.moduleCount<=a+d))for(var b=-1;7>=b;b++)-1>=c+b||this.moduleCount<=c+b||(this.modules[a+d][c+b]=
0<=d&&6>=d&&(0==b||6==b)||0<=b&&6>=b&&(0==d||6==d)||2<=d&&4>=d&&2<=b&&4>=b?!0:!1)},getBestMaskPattern:function(){for(var a=0,c=0,d=0;8>d;d++){this.makeImpl(!0,d);var b=j.getLostPoint(this);if(0==d||a>b)a=b,c=d}return c},createMovieClip:function(a,c,d){a=a.createEmptyMovieClip(c,d);this.make();for(c=0;c<this.modules.length;c++)for(var d=1*c,b=0;b<this.modules[c].length;b++){var e=1*b;this.modules[c][b]&&(a.beginFill(0,100),a.moveTo(e,d),a.lineTo(e+1,d),a.lineTo(e+1,d+1),a.lineTo(e,d+1),a.endFill())}return a},
setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(a=8;a<this.moduleCount-8;a++)null==this.modules[6][a]&&(this.modules[6][a]=0==a%2)},setupPositionAdjustPattern:function(){for(var a=j.getPatternPosition(this.typeNumber),c=0;c<a.length;c++)for(var d=0;d<a.length;d++){var b=a[c],e=a[d];if(null==this.modules[b][e])for(var f=-2;2>=f;f++)for(var i=-2;2>=i;i++)this.modules[b+f][e+i]=-2==f||2==f||-2==i||2==i||0==f&&0==i?!0:!1}},setupTypeNumber:function(a){for(var c=
j.getBCHTypeNumber(this.typeNumber),d=0;18>d;d++){var b=!a&&1==(c>>d&1);this.modules[Math.floor(d/3)][d%3+this.moduleCount-8-3]=b}for(d=0;18>d;d++)b=!a&&1==(c>>d&1),this.modules[d%3+this.moduleCount-8-3][Math.floor(d/3)]=b},setupTypeInfo:function(a,c){for(var d=j.getBCHTypeInfo(this.errorCorrectLevel<<3|c),b=0;15>b;b++){var e=!a&&1==(d>>b&1);6>b?this.modules[b][8]=e:8>b?this.modules[b+1][8]=e:this.modules[this.moduleCount-15+b][8]=e}for(b=0;15>b;b++)e=!a&&1==(d>>b&1),8>b?this.modules[8][this.moduleCount-
b-1]=e:9>b?this.modules[8][15-b-1+1]=e:this.modules[8][15-b-1]=e;this.modules[this.moduleCount-8][8]=!a},mapData:function(a,c){for(var d=-1,b=this.moduleCount-1,e=7,f=0,i=this.moduleCount-1;0<i;i-=2)for(6==i&&i--;;){for(var g=0;2>g;g++)if(null==this.modules[b][i-g]){var n=!1;f<a.length&&(n=1==(a[f]>>>e&1));j.getMask(c,b,i-g)&&(n=!n);this.modules[b][i-g]=n;e--; -1==e&&(f++,e=7)}b+=d;if(0>b||this.moduleCount<=b){b-=d;d=-d;break}}}};o.PAD0=236;o.PAD1=17;o.createData=function(a,c,d){for(var c=p.getRSBlocks(a,
c),b=new t,e=0;e<d.length;e++){var f=d[e];b.put(f.mode,4);b.put(f.getLength(),j.getLengthInBits(f.mode,a));f.write(b)}for(e=a=0;e<c.length;e++)a+=c[e].dataCount;if(b.getLengthInBits()>8*a)throw Error("code length overflow. ("+b.getLengthInBits()+">"+8*a+")");for(b.getLengthInBits()+4<=8*a&&b.put(0,4);0!=b.getLengthInBits()%8;)b.putBit(!1);for(;!(b.getLengthInBits()>=8*a);){b.put(o.PAD0,8);if(b.getLengthInBits()>=8*a)break;b.put(o.PAD1,8)}return o.createBytes(b,c)};o.createBytes=function(a,c){for(var d=
0,b=0,e=0,f=Array(c.length),i=Array(c.length),g=0;g<c.length;g++){var n=c[g].dataCount,h=c[g].totalCount-n,b=Math.max(b,n),e=Math.max(e,h);f[g]=Array(n);for(var k=0;k<f[g].length;k++)f[g][k]=255&a.buffer[k+d];d+=n;k=j.getErrorCorrectPolynomial(h);n=(new q(f[g],k.getLength()-1)).mod(k);i[g]=Array(k.getLength()-1);for(k=0;k<i[g].length;k++)h=k+n.getLength()-i[g].length,i[g][k]=0<=h?n.get(h):0}for(k=g=0;k<c.length;k++)g+=c[k].totalCount;d=Array(g);for(k=n=0;k<b;k++)for(g=0;g<c.length;g++)k<f[g].length&&
(d[n++]=f[g][k]);for(k=0;k<e;k++)for(g=0;g<c.length;g++)k<i[g].length&&(d[n++]=i[g][k]);return d};s=4;for(var j={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,
78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var c=a<<10;0<=j.getBCHDigit(c)-j.getBCHDigit(j.G15);)c^=j.G15<<j.getBCHDigit(c)-j.getBCHDigit(j.G15);return(a<<10|c)^j.G15_MASK},getBCHTypeNumber:function(a){for(var c=a<<12;0<=j.getBCHDigit(c)-
j.getBCHDigit(j.G18);)c^=j.G18<<j.getBCHDigit(c)-j.getBCHDigit(j.G18);return a<<12|c},getBCHDigit:function(a){for(var c=0;0!=a;)c++,a>>>=1;return c},getPatternPosition:function(a){return j.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,c,d){switch(a){case 0:return 0==(c+d)%2;case 1:return 0==c%2;case 2:return 0==d%3;case 3:return 0==(c+d)%3;case 4:return 0==(Math.floor(c/2)+Math.floor(d/3))%2;case 5:return 0==c*d%2+c*d%3;case 6:return 0==(c*d%2+c*d%3)%2;case 7:return 0==(c*d%3+(c+d)%2)%2;default:throw Error("bad maskPattern:"+
a);}},getErrorCorrectPolynomial:function(a){for(var c=new q([1],0),d=0;d<a;d++)c=c.multiply(new q([1,l.gexp(d)],0));return c},getLengthInBits:function(a,c){if(1<=c&&10>c)switch(a){case 1:return 10;case 2:return 9;case s:return 8;case 8:return 8;default:throw Error("mode:"+a);}else if(27>c)switch(a){case 1:return 12;case 2:return 11;case s:return 16;case 8:return 10;default:throw Error("mode:"+a);}else if(41>c)switch(a){case 1:return 14;case 2:return 13;case s:return 16;case 8:return 12;default:throw Error("mode:"+
a);}else throw Error("type:"+c);},getLostPoint:function(a){for(var c=a.getModuleCount(),d=0,b=0;b<c;b++)for(var e=0;e<c;e++){for(var f=0,i=a.isDark(b,e),g=-1;1>=g;g++)if(!(0>b+g||c<=b+g))for(var h=-1;1>=h;h++)0>e+h||c<=e+h||0==g&&0==h||i==a.isDark(b+g,e+h)&&f++;5<f&&(d+=3+f-5)}for(b=0;b<c-1;b++)for(e=0;e<c-1;e++)if(f=0,a.isDark(b,e)&&f++,a.isDark(b+1,e)&&f++,a.isDark(b,e+1)&&f++,a.isDark(b+1,e+1)&&f++,0==f||4==f)d+=3;for(b=0;b<c;b++)for(e=0;e<c-6;e++)a.isDark(b,e)&&!a.isDark(b,e+1)&&a.isDark(b,e+
2)&&a.isDark(b,e+3)&&a.isDark(b,e+4)&&!a.isDark(b,e+5)&&a.isDark(b,e+6)&&(d+=40);for(e=0;e<c;e++)for(b=0;b<c-6;b++)a.isDark(b,e)&&!a.isDark(b+1,e)&&a.isDark(b+2,e)&&a.isDark(b+3,e)&&a.isDark(b+4,e)&&!a.isDark(b+5,e)&&a.isDark(b+6,e)&&(d+=40);for(e=f=0;e<c;e++)for(b=0;b<c;b++)a.isDark(b,e)&&f++;a=Math.abs(100*f/c/c-50)/5;return d+10*a}},l={glog:function(a){if(1>a)throw Error("glog("+a+")");return l.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;256<=a;)a-=255;return l.EXP_TABLE[a]},EXP_TABLE:Array(256),
LOG_TABLE:Array(256)},m=0;8>m;m++)l.EXP_TABLE[m]=1<<m;for(m=8;256>m;m++)l.EXP_TABLE[m]=l.EXP_TABLE[m-4]^l.EXP_TABLE[m-5]^l.EXP_TABLE[m-6]^l.EXP_TABLE[m-8];for(m=0;255>m;m++)l.LOG_TABLE[l.EXP_TABLE[m]]=m;q.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var c=Array(this.getLength()+a.getLength()-1),d=0;d<this.getLength();d++)for(var b=0;b<a.getLength();b++)c[d+b]^=l.gexp(l.glog(this.get(d))+l.glog(a.get(b)));return new q(c,0)},mod:function(a){if(0>
this.getLength()-a.getLength())return this;for(var c=l.glog(this.get(0))-l.glog(a.get(0)),d=Array(this.getLength()),b=0;b<this.getLength();b++)d[b]=this.get(b);for(b=0;b<a.getLength();b++)d[b]^=l.gexp(l.glog(a.get(b))+c);return(new q(d,0)).mod(a)}};p.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],
[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,
116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,
43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,
3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,
55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,
45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];p.getRSBlocks=function(a,c){var d=p.getRsBlockTable(a,c);if(void 0==d)throw Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+c);for(var b=d.length/3,e=[],f=0;f<b;f++)for(var h=d[3*f+0],g=d[3*f+1],j=d[3*f+2],l=0;l<h;l++)e.push(new p(g,j));return e};p.getRsBlockTable=function(a,c){switch(c){case 1:return p.RS_BLOCK_TABLE[4*(a-1)+0];case 0:return p.RS_BLOCK_TABLE[4*(a-1)+1];case 3:return p.RS_BLOCK_TABLE[4*
(a-1)+2];case 2:return p.RS_BLOCK_TABLE[4*(a-1)+3]}};t.prototype={get:function(a){return 1==(this.buffer[Math.floor(a/8)]>>>7-a%8&1)},put:function(a,c){for(var d=0;d<c;d++)this.putBit(1==(a>>>c-d-1&1))},getLengthInBits:function(){return this.length},putBit:function(a){var c=Math.floor(this.length/8);this.buffer.length<=c&&this.buffer.push(0);a&&(this.buffer[c]|=128>>>this.length%8);this.length++}};"string"===typeof h&&(h={text:h});h=r.extend({},{render:"canvas",width:256,height:256,typeNumber:-1,
correctLevel:2,background:"#ffffff",foreground:"#000000"},h);return this.each(function(){var a;if("canvas"==h.render){a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();var c=document.createElement("canvas");c.width=h.width;c.height=h.height;for(var d=c.getContext("2d"),b=h.width/a.getModuleCount(),e=h.height/a.getModuleCount(),f=0;f<a.getModuleCount();f++)for(var i=0;i<a.getModuleCount();i++){d.fillStyle=a.isDark(f,i)?h.foreground:h.background;var g=Math.ceil((i+1)*b)-Math.floor(i*b),
j=Math.ceil((f+1)*b)-Math.floor(f*b);d.fillRect(Math.round(i*b),Math.round(f*e),g,j)}}else{a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();c=r("<table></table>").css("width",h.width+"px").css("height",h.height+"px").css("border","0px").css("border-collapse","collapse").css("background-color",h.background);d=h.width/a.getModuleCount();b=h.height/a.getModuleCount();for(e=0;e<a.getModuleCount();e++){f=r("<tr></tr>").css("height",b+"px").appendTo(c);for(i=0;i<a.getModuleCount();i++)r("<td></td>").css("width",
d+"px").css("background-color",a.isDark(e,i)?h.foreground:h.background).appendTo(f)}}a=c;jQuery(a).appendTo(this)})}})(jQuery);


﻿			// Facebook

			FB.Event.subscribe('auth.login', function(response) {
//				alert('auth.login event ' + response );
			});
			FB.Event.subscribe('auth.logout', function(response) {
//				alert('auth.logout event ' + response );
			});

			FB.Event.subscribe('auth.sessionChange', function(response) {
//				alert('auth.sessionChange event ' + response );
			});

			FB.Event.subscribe('auth.statusChange', function(response) {
//				alert('auth.statusChange event ' + response );
			});

			function getLoginStatus() {
				FB.getLoginStatus(function(response) {
					if (response.status == 'connected') {
						alert('logged in: ' + response.status);
					} else {
						alert('not logged in: ' + response.status );
					}
				});
			}

			var friendIDs = [];
			var fdata;

			function me()
			{

				FB.api(
					'/me/friends',
					{ fields: 'id, name, picture' },
					function( response )
					{
						if (response.error)
						{
							alert(JSON.stringify(response.error));
						}
						else
						{
							var data = document.getElementById('data');
							fdata=response.data;
							console.log("fdata: "+fdata);
							response.data.forEach(
								function(item)
								{
									var d = document.createElement('div');
									d.innerHTML = "<img src="+item.picture+"/>"+item.name;
									data.appendChild(d);
								}
							);
						}

						var friends = response.data;
						console.log(friends.length);
						for (var k = 0; k < friends.length && k < 200; k++)
						{

							var friend = friends[k];
							var index = 1;

							friendIDs[k] = friend.id;
							//friendsInfo[k] = friend;
						}
						console.log("friendId's: "+friendIDs);
					}
				);

			}

			function logout()
			{

				FB.logout(
					function(response)
					{
//						alert('logged out');
					}
				);

			}

			function login()
			{
				FB.login(
					function(response)
					{

						if (response.session)
						{
//							alert('logged in');
						}
						else
						{

//							alert('not logged in');

						}
					},
					{ scope: "email" }
				);
			}

			function facebookWallPost( message )
			{

				if ( mode == 'debug' ) alert( message );

				console.log('Debug 1');
				var params = {
					method: 'feed',
					name: 'NattPasset',
					link: 'http://www.nattpasset.se/',
					picture: webServiceUrl + 'img/npfb.png',
					caption: 'Dela på Facebook',
					description: message
					};
				console.log( params );

				FB.ui(
					params,
					function( obj )
					{
						console.log( obj );
					}
				);

			}

			function publishStoryFriend()
			{

				randNum = Math.floor ( Math.random() * friendIDs.length );

				var friendID = friendIDs[randNum];

				if (friendID == undefined)
				{

					alert('please click the me button to get a list of friends first');

				}
				else
				{

					console.log( "friend id: " + friendID );
					console.log( 'Opening a dialog for friendID: ', friendID );

					var params = {
						method: 'feed',
						to: friendID.toString(),
						name: 'Facebook Dialogs',
						link: 'https://developers.facebook.com/docs/reference/dialogs/',
						picture: 'http://fbrell.com/f8.jpg',
						caption: 'Reference Documentation',
						description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
					};

					FB.ui(
						params,
						function( obj )
						{
							console.log( obj );
						}
					);

				}

			}

//			if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
//			if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
//			if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

/*
			$(document).ready(
				function()
				{

				alert("session: " + JSON.stringify(FB.getSession()));

					try
					{
alert( 'FB.init' );
						if (typeof FB != 'undefined')
						{

							FB.init( { appId: facebookAppId, nativeInterface: CDV.FB, useCachedDialogs: false } );
						}
						else
						{

							$(".np-ui-facebook-button").addClass('ui-disabled');

						}

					} catch (e) {
						console.log(e);
						alert(e);
					}

				}
			);
*/
		// Facebook ends


// ----------------------------------------------------------------------------- facebookAttach
function facebookInit()
{

/*
	if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
	if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
	if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
*/

	FB.init( { appId: facebookAppId, nativeInterface: CDV.FB, useCachedDialogs: false } );

}

// ----------------------------------------------------------------------------- facebookLogin
function facebookLogin()
{

	if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
	if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
	if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

	setTimeout(
		function()
		{

			facebookInit();

			FB.getLoginStatus(
				function( response )
				{

					if (response.status != 'connected')
					{

						FB.login(
							function( response )
							{
								if ( response.session )
								{
//									alert('logged in');
									$("#facebookLoginButton").hide();
									$("#facebookLogoutButton").show();
								}
								else
								{
//									alert('not logged in');
									$("#facebookLoginButton").show();
									$("#facebookLogoutButton").hide();
								}

								$.mobile.changePage( '#homePage' );

							},
							{
								scope: "email"
							}
						);
					}

				}
			);
		}
	);

}

// ----------------------------------------------------------------------------- facebookLogout
function facebookLogout()
{

	if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
	if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
	if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

	setTimeout(
		function()
		{

			FB.logout(
				function(response)
				{

					$("#facebookLoginButton").show();
					$("#facebookLogoutButton").hide();

					$.mobile.changePage( '#homePage' );

				}
			);

		},
		50
	);

}

// ----------------------------------------------------------------------------- facebookAttach
function facebookPostOnWall( message )
{

	if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
	if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
	if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

//	FB.init( { appId: facebookAppId, nativeInterface: CDV.FB, useCachedDialogs: false } );
//	facebookInit();

	setTimeout(
		function()
		{

			FB.getLoginStatus(function(response) {
				if (response.status == 'connected') {
					facebookWallPost( message );
				}
			});

		},
		50
	);

}


/*
jquery.animate-enhanced plugin v0.91
---
http://github.com/benbarnett/jQuery-Animate-Enhanced
http://benbarnett.net
@benpbarnett
*/
(function(d,B,C){function G(a,b,h,c){if("d"!=h){var f=H.exec(b),e="auto"===a.css(h)?0:a.css(h),e="string"==typeof e?x(e):e;"string"==typeof b&&x(b);var c=!0===c?0:e,d=a.is(":hidden"),i=a.translation();"left"==h&&(c=parseInt(e,10)+i.x);"right"==h&&(c=parseInt(e,10)+i.x);"top"==h&&(c=parseInt(e,10)+i.y);"bottom"==h&&(c=parseInt(e,10)+i.y);!f&&"show"==b?(c=1,d&&a.css({display:"block",opacity:0})):!f&&"hide"==b&&(c=0);return f?(a=parseFloat(f[2]),f[1]&&(a=("-="===f[1]?-1:1)*a+parseInt(c,10)),a):c}}function I(a,
b,h,c,f,e,g,i){var j=a.data(q),j=j&&!u(j)?j:d.extend(!0,{},J),n=f;if(-1<d.inArray(b,y)){var o=j.meta,m=x(a.css(b))||0,l=b+"_o",n=f-m;o[b]=n;o[l]="auto"==a.css(b)?0+n:m+n||0;j.meta=o;g&&0===n&&(n=0-o[l],o[b]=n,o[l]=0)}return a.data(q,K(a,j,b,h,c,n,e,g,i))}function K(a,b,d,c,f,e,g,i,j){var n=!1,g=!0===g&&!0===i,b=b||{};b.original||(b.original={},n=!0);b.properties=b.properties||{};b.secondary=b.secondary||{};for(var i=b.meta,o=b.original,m=b.properties,q=b.secondary,p=l.length-1;0<=p;p--){var k=l[p]+
"transition-property",r=l[p]+"transition-duration",s=l[p]+"transition-timing-function",d=g?l[p]+"transform":d;n&&(o[k]=a.css(k)||"",o[r]=a.css(r)||"",o[s]=a.css(s)||"");q[d]=g?(!0===j||!0===z&&!1!==j)&&D?"translate3d("+i.left+"px, "+i.top+"px, 0)":"translate("+i.left+"px,"+i.top+"px)":e;m[k]=(m[k]?m[k]+",":"")+d;m[r]=(m[r]?m[r]+",":"")+c+"ms";m[s]=(m[s]?m[s]+",":"")+f}return b}function L(a){for(var b in a)if(("width"==b||"height"==b)&&("show"==a[b]||"hide"==a[b]||"toggle"==a[b]))return!0;return!1}
function u(a){for(var b in a)return!1;return!0}function x(a){v=a.match(/\D+$/);return parseFloat(a.replace(/px/i,""))}function M(a,b,h){var c=-1<d.inArray(a,N);if(("width"==a||"height"==a)&&b===parseFloat(h.css(a)))c=!1;return c}var N="top,right,bottom,left,opacity,height,width".split(","),y=["top","right","bottom","left"],l=["","-webkit-","-moz-","-o-"],O=["avoidTransforms","useTranslate3d","leaveTransforms"],H=/^([+-]=)?([\d+-.]+)(.*)$/,P=/([A-Z])/g,J={secondary:{},meta:{top:0,right:0,bottom:0,
left:0}},v="px",q="jQe",E=null,A=!1,t=(document.body||document.documentElement).style,w=void 0!==t.WebkitTransition?"webkitTransitionEnd":void 0!==t.OTransition?"oTransitionEnd":"transitionend",F=void 0!==t.WebkitTransition||void 0!==t.MozTransition||void 0!==t.OTransition||void 0!==t.transition,D="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,z=D;d.expr&&d.expr.filters&&(E=d.expr.filters.animated,d.expr.filters.animated=function(a){return d(a).data("events")&&d(a).data("events")[w]?!0:E.call(this,
a)});d.extend({toggle3DByDefault:function(){return z=!z},toggleDisabledByDefault:function(){return A=!A}});d.fn.translation=function(){if(!this[0])return null;var a=window.getComputedStyle(this[0],null),b={x:0,y:0};if(a)for(var d=l.length-1;d>=0;d--){var c=a.getPropertyValue(l[d]+"transform");if(c&&/matrix/i.test(c)){a=c.replace(/^matrix\(/i,"").split(/, |\)$/g);b={x:parseInt(a[4],10),y:parseInt(a[5],10)};break}}return b};d.fn.animate=function(a,b,h,c){var a=a||{},f=!(typeof a.bottom!=="undefined"||
typeof a.right!=="undefined"),e=d.speed(b,h,c),g=this,i=0,j=function(){i--;i===0&&typeof e.complete==="function"&&e.complete.apply(g[0],arguments)};return(typeof a.avoidCSSTransitions!=="undefined"?a.avoidCSSTransitions:A)===true||!F||u(a)||L(a)||e.duration<=0||d.fn.animate.defaults.avoidTransforms===true&&a.avoidTransforms!==false?B.apply(this,arguments):this[e.queue===true?"queue":"each"](function(){var b=d(this),c=d.extend({},e),g=function(){var c=b.data(q)||{original:{}},d={};if(a.leaveTransforms!==
true){for(var e=l.length-1;e>=0;e--)d[l[e]+"transform"]="";if(f&&typeof c.meta!=="undefined")for(var e=0,g;g=y[e];++e)d[g]=c.meta[g+"_o"]+v}b.unbind(w).css(c.original).css(d).data(q,null);a.opacity==="hide"&&b.css({display:"none",opacity:""});j.call(b)},h={bounce:"cubic-bezier(0.0, 0.35, .5, 1.3)",linear:"linear",swing:"ease-in-out",easeInQuad:"cubic-bezier(0.550, 0.085, 0.680, 0.530)",easeInCubic:"cubic-bezier(0.550, 0.055, 0.675, 0.190)",easeInQuart:"cubic-bezier(0.895, 0.030, 0.685, 0.220)",easeInQuint:"cubic-bezier(0.755, 0.050, 0.855, 0.060)",
easeInSine:"cubic-bezier(0.470, 0.000, 0.745, 0.715)",easeInExpo:"cubic-bezier(0.950, 0.050, 0.795, 0.035)",easeInCirc:"cubic-bezier(0.600, 0.040, 0.980, 0.335)",easeInBack:"cubic-bezier(0.600, -0.280, 0.735, 0.045)",easeOutQuad:"cubic-bezier(0.250, 0.460, 0.450, 0.940)",easeOutCubic:"cubic-bezier(0.215, 0.610, 0.355, 1.000)",easeOutQuart:"cubic-bezier(0.165, 0.840, 0.440, 1.000)",easeOutQuint:"cubic-bezier(0.230, 1.000, 0.320, 1.000)",easeOutSine:"cubic-bezier(0.390, 0.575, 0.565, 1.000)",easeOutExpo:"cubic-bezier(0.190, 1.000, 0.220, 1.000)",
easeOutCirc:"cubic-bezier(0.075, 0.820, 0.165, 1.000)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.320, 1.275)",easeInOutQuad:"cubic-bezier(0.455, 0.030, 0.515, 0.955)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1.000)",easeInOutQuart:"cubic-bezier(0.770, 0.000, 0.175, 1.000)",easeInOutQuint:"cubic-bezier(0.860, 0.000, 0.070, 1.000)",easeInOutSine:"cubic-bezier(0.445, 0.050, 0.550, 0.950)",easeInOutExpo:"cubic-bezier(1.000, 0.000, 0.000, 1.000)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.150, 0.860)",
easeInOutBack:"cubic-bezier(0.680, -0.550, 0.265, 1.550)"},p={},h=h[c.easing||"swing"]?h[c.easing||"swing"]:c.easing||"swing",k;for(k in a)if(d.inArray(k,O)===-1){var r=d.inArray(k,y)>-1,s=G(b,a[k],k,r&&a.avoidTransforms!==true);a.avoidTransforms!==true&&M(k,s,b)?I(b,k,c.duration,h,r&&a.avoidTransforms===true?s+v:s,r&&a.avoidTransforms!==true,f,a.useTranslate3d===true):p[k]=a[k]}b.unbind(w);if((k=b.data(q))&&!u(k)&&!u(k.secondary)){i++;b.css(k.properties);var t=k.secondary;setTimeout(function(){b.bind(w,
g).css(t)})}else c.queue=false;if(!u(p)){i++;B.apply(b,[p,{duration:c.duration,easing:d.easing[c.easing]?c.easing:d.easing.swing?"swing":"linear",complete:j,queue:c.queue}])}return true})};d.fn.animate.defaults={};d.fn.stop=function(a,b,h){if(!F)return C.apply(this,[a,b]);a&&this.queue([]);this.each(function(){var c=d(this),f=c.data(q);if(f&&!u(f)){var e,g={};if(b){g=f.secondary;if(!h&&typeof f.meta.left_o!==void 0||typeof f.meta.top_o!==void 0){g.left=typeof f.meta.left_o!==void 0?f.meta.left_o:
"auto";g.top=typeof f.meta.top_o!==void 0?f.meta.top_o:"auto";for(e=l.length-1;e>=0;e--)g[l[e]+"transform"]=""}}else if(!u(f.secondary)){var i=window.getComputedStyle(c[0],null);if(i)for(var j in f.secondary)if(f.secondary.hasOwnProperty(j)){j=j.replace(P,"-$1").toLowerCase();g[j]=i.getPropertyValue(j);if(!h&&/matrix/i.test(g[j])){e=g[j].replace(/^matrix\(/i,"").split(/, |\)$/g);g.left=parseFloat(e[4])+parseFloat(c.css("left"))+v||"auto";g.top=parseFloat(e[5])+parseFloat(c.css("top"))+v||"auto";for(e=
l.length-1;e>=0;e--)g[l[e]+"transform"]=""}}}c.unbind(w).css(f.original).css(g).data(q,null)}else C.apply(c,[a,b])});return this}})(jQuery,jQuery.fn.animate,jQuery.fn.stop);

﻿  if (!window.plugins) {
    window.plugins = {}
  }

  var lastScanId = "";
  var scanCode = function(id)
  {

    window.plugins.barcodeScanner.scan(
      function(result) {

        if (! result.cancelled)
        {

          lastScanId = id;
          if (verifyScan(id, result.text))
          {
            $('#popupOk').popup('open');
          }
          else
          {
            $('#popupFault').popup('open');
          }
          //       setTimeout( scanCode( id ), 2000 );

        }
        //      alert("Scanned Code: " + result.text + ". Format: " + result.format + ". Cancelled: " + result.cancelled);
      },
      function(error) {
        alert("Scan failed: " + error);
      }
    );

  }


/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/

var Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}

}
