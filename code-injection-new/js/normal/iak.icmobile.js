





















$('#ConfirmationPage').live('pageshow', function (event) {
	if (loggedIn != true) {
		$.mobile.changePage($('#LoginPage'));
	}
	googleAnalytics.trackPageview("/confirmation");
	navigator.screenOrientation.set('sensor');

	ShowFade('#ConfirmationPage');
});


function preventBehavior(e) { 
  e.preventDefault(); 
};

function toggleEnlargedPic(mode, pic) {
    if(mode == "show") {
        document.addEventListener("touchmove", preventBehavior, false);
        $('#picContainer').fadeIn(400);
        var en_pic = $("#pic_div"); 
        en_pic.css({
            'background-image': 'url("' + pic + '")',
            'background-position': 'center',
            'background-size': 'contain',
            'background-repeat': 'no-repeat'
        });
        
    }
    else {        
        $('#picContainer').fadeOut(400);
        document.removeEventListener("touchmove", preventBehavior, false);
    }
}

$('#RelativesPage').live('pageshow', function (event) {
	if (loggedIn != true) {
		$.mobile.changePage($('#LoginPage'));
	}
	googleAnalytics.trackPageview("/relatives");
	navigator.screenOrientation.set('sensor');

	ShowFade('#RelativesPage');

	$('#RelativesList').empty();

	var RelativeTemplate = $('#relativeTemplate').clone().removeClass('hidden');
	var DDlistTemplate = $('#ddlistTemplate').clone().removeClass('hidden');

	for (var a in appdata.Relatives) {
		var t = $(RelativeTemplate).clone();
		$(t).appendTo('#RelativesList');
		$(t).find('p').html(appdata.Relatives[a].Name);
		$(t).find('.Date').html(appdata.Relatives[a].Date);
		t = $(DDlistTemplate).clone()
	}
	
	$("#RelativesList li").click(function () {
		selectedPerson = $("#RelativesList li").index(this);
		$.mobile.changePage($('#ZorgpasPage'));
	});
});

function ToggleDropDown() {
	$("#DDList").toggle();
	return false;
}


$('#InsuranceCardPage').live('pageshow', function () {
	if (loggedIn != true) {
		$.mobile.changePage($('#LoginPage'));
	}
	googleAnalytics.trackPageview("/insurancecard");
	navigator.screenOrientation.set('landscape');

	ShowFade('#InsuranceCardPage');

	var index = GetUserIndex();

	if (appdata.InsuranceCard[index] == null) {
		if (appdata.CanEHICBeGenerated) {
			navigator.notification.confirm('Wilt u een digitale EHIC kaart ontvangen?', function (button) {
				if (button == 1) {
					GenerateEHIC();
				}
				else
					$.mobile.changePage($('#ZorgpasPage'));
			},
			'Ontvangen EHIC',
			'Ja,Nee');
		}
		else {
			navigator.notification.alert('U kunt geen EHIC kaart aanmaken.', null, 'Waarschuwing');
			ClearEHICForm();
		}
	} else {
		ShowEHIC();
	}
});

// show EHIC card content
function ShowEHIC() {
	var index = GetUserIndex();
	$('#ic_name').text(appdata.InsuranceCard[index].Name);
	$('#ic_given_name').text(appdata.InsuranceCard[index].GivenName);
	$('#ic_birth').text(appdata.InsuranceCard[index].BirthDate);
	$('#ic_id_number').text(appdata.InsuranceCard[index].Id);
	$('#ic_institution').text(appdata.InsuranceCard[index].Institution);
	$('#ic_expire_date').text(appdata.InsuranceCard[index].Expire);
	$('#ic_card_number').text(appdata.InsuranceCard[index].CardNr);
}

function ClearEHICForm() {
	$('#ic_name').text("");
	$('#ic_given_name').text("");
	$('#ic_birth').text("");
	$('#ic_id_number').text("");
	$('#ic_institution').text("");
	$('#ic_expire_date').text("");
	$('#ic_card_number').text("");
}

function GenerateEHIC() {
	var number = new Array();
	
	for (var a in appdata.Relatives) {
		number.push(appdata.Relatives[a].InsuredNumber);
	}
	
	var login = window.localStorage.getItem(appVersion + 'user.login');
	var password = window.localStorage.getItem(appVersion + 'user.password');
	var jsonArray = '{"insuredNumbers": [' + number + '], "login": "' + login + '", "password": "' + password + '"}';

	AjaxPost('GenerateEHIC', jsonArray, function (r) {
		var rEval = eval("(" + r.GenerateEHICResult + ")");
		if (rEval.ResponseCode == 0) {
			FillEHICData(rEval);
			ShowEHIC();
		} else {
			navigator.notification.alert('Er is een fout opgetreden bij het aanmaken van de EHIC kaart.', null, 'Waarschuwing');
			ClearEHICForm();
		}
	},
	function (jqXHR, textStatus, errorThrown) {
		navigator.notification.alert('Er is een fout opgetreden bij het aanmaken van de EHIC kaart.', null, 'Waarschuwing');
		ClearEHICForm();
	});
}

// add EHIC data to appdata and save it
function FillEHICData(rEval) {
	var index = GetUserIndex();

	for (var a in rEval.InsuranceCards) {
		appdata.InsuranceCard[a] = rEval.InsuranceCards[a];
	}
	window.localStorage.setObject('appdata', appdata);
}


var prevInputVal2;

function onLoginButtonClick() {
	//get login and password
	var login = $('#LoginForm input[name=UserName]').val().toLowerCase();
	var password = $('#LoginForm input[name=Password]').val();

	if (login == '' || password == '') {
		navigator.notification.alert('Alle velden invullen aub!', null, 'Waarschuwing')
		$('#LoginForm input[name=UserName]').focus();
	}
	else {
		// check if user is the same as previous loggedin (clear appdata if other user)
		var prevLogin = window.localStorage.getItem(appVersion + 'user.login');
		if (prevLogin != login)
			appdata = null;

		LoginAjax(login, password);
	}

	return false;
}

$('#LoginPage').live('pageshow', function (event) {
	googleAnalytics.trackPageview("/login");
	navigator.screenOrientation.set('sensor');

	ShowFade('#LoginPage');

	//get saved login and password
	$('#LoginForm input[name=UserName]').val(window.localStorage.getItem(appVersion + 'user.login'));
	$('#LoginForm input[name=Password]').val(window.localStorage.getItem(appVersion + 'user.password'));

	prevInputVal2 = $('#LoginForm input[name=UserName]').val();

	$(document).on('input paste', '#LoginForm input[name=UserName]', function () {
		var temp = $('#LoginForm input[name=UserName]').val();
		var re = /^$|^\d+$/;
		if (re.test(temp) && temp.length <= 20)
			prevInputVal2 = temp;
		else
			$('#LoginForm input[name=UserName]').val(prevInputVal2);

	});
	
	document.addEventListener("backbutton", function(e) {
		if($('#picContainer').is(":visible")) {
            toggleEnlargedPic('hide', null);
        }
		else if($.mobile.activePage.is('#LoginPage')) {
			e.preventDefault();
			navigator.app.exitApp();
		}
		else {
			if($.mobile.activePage.is('#SendPage'))
                SetParam('ScaledImageUri', ScaledImageUri);
			navigator.app.backHistory()
		}
	}, false);
});



function OnButtonEHICClick() {
	$.mobile.changePage($('#InsuranceCardPage'));
}

$('#ZorgpasPage').live('pageshow', function () {
	if (loggedIn != true) {
		$.mobile.changePage($('#LoginPage'));
	}
	googleAnalytics.trackPageview("/zorgpas");
	navigator.screenOrientation.set('sensor');

	ShowFade('#ZorgpasPage');

	var index = GetUserIndex();

	$('#Z1').html(appdata.Policy[index].Insured);
	$('#Z2').html(appdata.Policy[index].BornDate);
	$('#Z3').html(appdata.Policy[index].BSN);
	$('#Z4').html(appdata.Policy[index].InsuredNr);
	$('#Z5').html(appdata.Policy[index].UZOVI + ' - ' + appdata.Policy[index].Insurer);
});


$('#HomePage').live('pageshow', function (event) {
	if (loggedIn != true) {
		$.mobile.changePage($('#LoginPage'));
	}
	selectedPerson = null;

	googleAnalytics.trackPageview("/home");
	navigator.screenOrientation.set('sensor');
	ShowFade('#HomePage');
	
	document.addEventListener("backbutton", function(e) {
		if($.mobile.activePage.is('#HomePage')) {
			e.preventDefault();
			navigator.app.exitApp();
		}
	}, false);
});

function OnNotSupported() {
	navigator.notification.alert("It's not supported yet!", null, 'Waarschuwing');
	return false;
}

function onInvoicePageBtnClick() {
	var invoices = new Invoices();
	if (invoices.UnsentInvoice != null)
		$.mobile.changePage($('#SendPage'));
	else
		$.mobile.changePage($('#InvoicePage'));
}

var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var dropDownText;
var dropDownFlag;

var Name = "0";
var Total = 0;
var Accident = "Nee";
var Member;
var Provider;
var PhotoFromAlbum;

var prevInputVal;

// Gets values of form fields and saves it in global variables for future use
function GetFormValues() {
	//Name = $('#InvoiceForm input[name=Name]').val();
	//Total = $('#InvoiceForm input[name=Total]').val();
	//Accident = $('#InvoiceForm input[type=radio]:checked').val();
	Provider = appdata.Policy[0].Insurer;
}

// Event handler fired after picture is selected of taken photo
function onPictureSelected(ImageURI) {
	//pass params for next page
	SetParam('ImageUri', ImageURI);
	ResizeAndSaveImage(ImageURI, 
		function (r) {
			SetParam('ScaledImageUri', r.url);
			$.mobile.changePage($('#SendPage'));
		}, 
		function (e) {
			SetParam('ScaledImageUri', ImageURI);
			$.mobile.changePage($('#SendPage'));
		}
	);

	//redirect
	$('#selectedPhoto').attr('src', '');
}

// Event handler fired after select picture fail
function onPictureError() {
}

//event handler for buttons to get picture 
function onSelectPicture(type) {
	GetFormValues();

	//do some for validation
	if (Member == null) {
		navigator.notification.alert('Kies aub de juiste medeverzekerde!', null, 'Waarschuwing');
		return false;
	}

	/*if (Name == '' || Total == '') {
		navigator.notification.alert('Alle velden invullen aub!', null, 'Waarschuwing');
		return false;
	}*/

	/*var oRegExp2 = /^\s*(\+|-)?((\d+((\.|,)\d\d?)?)|((\.|,)\d\d?))\s*$/;
	if (oRegExp2.test(Total) == false) {
		navigator.notification.alert('Voer alleen cijfers in in het veld "Totaal nota bedrag".', null, 'Waarschuwing');
		return false;
	}*/

	if (type == 'photo') {
		//take photo
		navigator.camera.getPicture(
			onPictureSelected,
			onPictureError,
			{ quality: 50, destinationType: destinationType.FILE_URI, correctOrientation: true });
	}
	else
	{
		//select saved photo
		navigator.camera.getPicture(
				onPictureSelected,
				onPictureError,
				{ quality: 50, destinationType: destinationType.FILE_URI, sourceType: pictureSource.PHOTOLIBRARY, correctOrientation: true });
	}
	return false;
}

function OnButtonMakePhotoClick() {
	PhotoFromAlbum = false;
	return onSelectPicture('photo');
}

function OnButtonSelectPhotoClick() {
	PhotoFromAlbum = true;
	return onSelectPicture('picture');
}

function ToggleChooseMember(choosed) {
	if ($("#MemeberList").css("display") == "none") {
		$('#ChooseMember').val("Kies een gezinslid");
	}
	else if (choosed != true) {
		$('#ChooseMember').val('Klik hier en kies een gezinslid');
		Member = null;
	}
	document.activeElement.blur();
	$("#MemeberList").toggle();
	return false;
}

$('#InvoicePage').live('pageshow', function () {
	if (loggedIn != true) {
		$.mobile.changePage($('#LoginPage'));
	}
	googleAnalytics.trackPageview("/invoice");
	navigator.screenOrientation.set('sensor');

	ShowFade('#InvoicePage');

	$('#MemeberList').empty();
	$('#ChooseMember').val('Klik hier en kies een gezinslid');
	var MemberListTemplate = $('#MemberListTemplate').clone().removeClass('hidden').removeAttr('id');

	for (var a in appdata.Relatives) {
		var t = $(MemberListTemplate).clone();

		$(t).appendTo('#MemeberList');
		$(t).find('p').html(appdata.Relatives[a].Name);
	}

	$("#MemeberList li").last().attr('id', 'last');

	$("#MemeberList li").click(function () {
		Member = $(this).text();
		var characters = 30;
		var dispMember = "";
		if (Member.length > characters)
		{
			characters = 27;
			dispMember = Member.substr(0, characters);
			dispMember = dispMember + '...';
		}
		else
			dispMember = Member.substr(0, characters);
		$('#ChooseMember').val(dispMember);
		ToggleChooseMember(true);
	});

	$('#InvoicePage').click(function (event) {
		if (!$(event.target).is('#MemeberList') && !$(event.target).is('#ChooseMember')) {
			$('#MemeberList').hide();
		};
	});

	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;

	//get params
	//Name = GetParam('Name');
	//Total = GetParam('Total');
	//Accident = GetParam('Accident');
	Member = GetParam('Member');
	Provider = GetParam('Provider');

	//if (Name != 'undefined') $('#InvoiceForm input[name=Name]').val(Name);
	//if (Total != 'undefined') $('#InvoiceForm input[name=Total]').val(Total);
	//if (Accident != 'undefined') $('#InvoiceForm input[type=radio]:checked').val(Accident);
	if (Member != null) $('#ChooseMember').val(Member);
});

function isValidTotal(event)
{
	if (event.keyCode != 44 && event.keyCode != 46 && (event.keyCode < 48 || event.keyCode > 57))
		return false;

	var temp = $('#totalInput').val() + String.fromCharCode(event.keyCode);
	var re = /^$|^\d+$|^\d+(,|.)$|^(\d+(,|.)\d\d?)$/;
	if (!re.test(temp) || temp.length > 9)
		return false;
	return true;
}

$('#totalInput').live('blur', function(e) {
	var temp = $('#totalInput').val();
	if (temp[temp.length-2] == '.' || temp[temp.length-2] == ',')
		$('#totalInput').val(temp + '0');
	if (temp[temp.length-1] == '.' || temp[temp.length-1] == ',')
		$('#totalInput').val(temp.substr(0, temp.length - 1));
});

$('#EmergencyPage').live('pageshow', function (event) {
	googleAnalytics.trackPageview("/emergency");
	navigator.screenOrientation.set('sensor');

	ShowFade('#EmergencyPage');

	// when not logged in user can only back to login page
	if (loggedIn != true) {
		$('#EmergencyPage .submenu').hide();
		$('#EmergencyPage .Logout').hide();
	}
	else {
		$('#EmergencyPage .submenu').show();
		$('#EmergencyPage .Logout').show();
	}
});

function EmergencyBack() {
	if (loggedIn != true) {
		$.mobile.changePage($('#LoginPage'));
	}
	else {
		$.mobile.changePage($('#HomePage'));
	}

	return false;
}



function OnButtonEmptyArchiveClick()
{
	var invoices = new Invoices();

	if (invoices.Invoices.length == 0)
		navigator.notification.confirm('Archief is al leeg', null, 'Waarschuwing', 'Ok');
	else {
		navigator.notification.confirm(
			'Alle nota\'s verwijderen?',
			function (button) {
				if (button == 1) {
					invoices = new Invoices();
					invoices.Clear();
					//$('#ArchiveList').empty();
					$('#ArchivePortrait').empty();
                    $('#ArchiveLandscape').empty();
					navigator.notification.confirm('Archief is geleegd', null, 'Bevestiging', 'Ok');
				}
			},
			'Bevestiging',
			'Alle verwijderen,Annuleren');
	}
	
	return false;
}

function OnButtonDeleteInvoiceClick(i)
{
	navigator.notification.confirm(
		'Nota verwijderen?',
		function (button) {
			if (button == 1) {
				//get invoice id
				var id = $(i).parent().attr('id');
				id = id.substring(7, id.length);
				//delete invoice
				invoices = new Invoices();
				invoices.Delete(id);
				CrateList('portrait');
                CrateList('landscape');
			}
		},
		'Bevestiging',
		'Verwijderen,Annuleren');
	return false;
}

$('#ArchivePage').live('pageshow', function (event) {
	if (loggedIn != true) {
		$.mobile.changePage($('#LoginPage'));
	}

	$('.footer').removeClass('ui-bar-a');

	googleAnalytics.trackPageview("/archive");
	navigator.screenOrientation.set('sensor');

	ToggleArchiveList();
    
	CrateList('portrait');
    CrateList('landscape');

	ShowFade('#ArchivePage');
    
    window.addEventListener('resize', ToggleArchiveList);
});

function CrateList(orientation) {
	var invoices = new Invoices();
    
    var ArchiveTemplate = $('#archiveTemplate').clone().removeClass('hidden');
    
    if(orientation == 'portrait') {
        $('#ArchivePortrait').empty();
        ArchiveTemplate.css('width', 'auto'); 
    }
    else {  
        $('#ArchiveLandscape').empty();
        ArchiveTemplate.css({ 
            'width': '50%', 
            'display': 'inline-block', 
            'border-right': '1px solid #545454', 
            'box-sizing':'border-box', 
            '-moz-box-sizing':'border-box', 
            '-webkit-box-sizing':'border-box', 
            'padding-bottom':'10px' 
        });
    }                             

	for (var a in invoices.Invoices) {
		var t = $(ArchiveTemplate).clone();
		$(t).find('#aName').html(invoices.Invoices[a].Member).removeAttr('id');
		//$(t).find('#aProvider').html(invoices.Invoices[a].Name).removeAttr('id');
		//$(t).find('#aTotal').html('\u20AC ' + invoices.Invoices[a].Total).removeAttr('id');
		$(t).find('#invoiceImage').attr('src', invoices.Invoices[a].ImagePath).removeAttr('id');
        if(orientation == 'portrait')
            $(t).attr('id', 'invoice' + a).appendTo('#ArchivePortrait');
        else
            $(t).attr('id', 'invoice' + a).appendTo('#ArchiveLandscape');
	}
}

function ToggleArchiveList() {   
    if(window.orientation == 0) {
        $('#ArchiveLandscape').hide()
        $('#ArchivePortrait').show();
    }
    else {
        $('#ArchivePortrait').hide();
        $('#ArchiveLandscape').show();
    }
}


//version 1.1.0
//configuration

// acc 
//var WebServiceURL = 'https:\/\/acciop.mijniak.nl\/ICM\/IcmService.svc\/';

//prod
var WebServiceURL = 'https:\/\/iop.mijniak.nl\/ICM\/IcmService.svc\/';

// local machine (always over http - filetransfer doesn't support self-signed certificate)
//var WebServiceURL = 'http:\/\/172.17.3.184\/IOP.Forms\/ICM\/IcmService.svc\/'; 

$.mobile.buttonMarkup.hoverDelay = 50;
$.mobile.defaultPageTransition = 'none';

// google analytics
var GoogleTrackerId = 'UA-32400660-1';
var googleAnalytics;

// service data
var protocolVer = "1.1"; // supported icmservice version - must be in double format (x.xx)
var resolution = window.innerWidth + "x" + window.innerHeight;

// local storage data
var appVersion = "icmobile_";
var appdata;

var selectedPerson; // person selected on relatives list
var loggedIn = false; // loggedIn flag - used for autologon
var timeout; // timeout for sync message
var targetSize = 1000; // target size of invoice image
var minimumSize = 750; // minimum size of invoice image

//waiting effect - show busy animation on whole screen
function WaitingEffect() {
	this.Counter = 0;
	this.Start = function() {
		if (this.Counter == 0) {
			$('body').append('<div id="WaitingLayer"><div id="top_margin"></div><div id="floatingCirclesG"><div class="f_circleG" id="frotateG_01"></div><div class="f_circleG" id="frotateG_02"></div><div class="f_circleG" id="frotateG_03"></div><div class="f_circleG" id="frotateG_04"></div><div class="f_circleG" id="frotateG_05"></div><div class="f_circleG" id="frotateG_06"></div><div class="f_circleG" id="frotateG_07"></div><div class="f_circleG" id="frotateG_08"></div></div></div>');
		}
		this.Counter++;
	};
	this.Stop = function () {
		$('#WaitingLayer').remove();
		this.Counter = 0;
	};
}

var Waiting = new WaitingEffect();

function AjaxPost(Url, Params, SuccessFunction, ErrorFunction) {
	Waiting.Start();

	var xhr = $.ajax({
		type: 'POST',
		url: WebServiceURL + Url,
		data: Params,
		contentType: "application/json; charset=utf-8", // content type sent to server
		dataType: "json", //Expected data format from server
		processdata: false,
		success: function (r) {
			SuccessFunction(r);
			Waiting.Stop();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			ErrorFunction(jqXHR, textStatus, errorThrown);
			Waiting.Stop();
		},
		timeout: 60000
	});

	return xhr;
}

//Set param to pass to next page
function SetParam(ParamName, Value) {
	window.localStorage.setItem(appVersion + ParamName, Value);
}

//Get param passed from previous page
function GetParam(ParamName) {
	var value = window.localStorage.getItem(appVersion + ParamName);
	window.localStorage.removeItem(appVersion + ParamName);
	return value;
}

// update appdata for autologon
function UpdateAppdata() {
	var login = window.localStorage.getItem(appVersion + 'user.login');
	var password = window.localStorage.getItem(appVersion + 'user.password');

	LoginAjax(login, password);
}

function LoginAjax(login, password) {
	if (navigator.network.connection.type != Connection.NONE) {
		var xhr = AjaxPost('Login', '{"login": "' + login + '", "password": "' + password + '", "model": "' + device.name + 
		'", "platform": "' + device.platform + " " + device.version + '", "protocolVer": "' + protocolVer + 
		'", "resolution": "' + resolution + '"}', function (r) {
			var rEval = eval("(" + r.LoginResult + ")");
			if (rEval.ResponseCode == 0 || rEval.ResponseCode == 1) {
				appdata = rEval;
				window.localStorage.setObject('appdata', rEval);
				window.localStorage.setItem(appVersion + 'user.login', login);
				window.localStorage.setItem(appVersion + 'user.password', password);
				loggedIn = true;
				window.localStorage.setItem(appVersion + 'loggedIn', loggedIn);
				clearTimeout(timeout);

				if (appdata.ResponseMessage != null)
					navigator.notification.alert(appdata.ResponseMessage, null, 'Waarschuwing');

				if (rEval.ResponseCode == 1) {
					navigator.notification.confirm(
						'Deze versie van de app is verouderd. Installeer de laatste versie.',
						function (button) {
							if (button == 1)
								window.location.href= "market://details?id=iak.icmobile";
						},
						'Let op',
						'Installeren, Annuleren');
				}
				$.mobile.changePage($('#HomePage'));
			} else {
				clearTimeout(timeout);
				if (rEval.ResponseMessage != null)
					navigator.notification.alert(rEval.ResponseMessage, null, 'Waarschuwing');

				navigator.notification.alert('Het door u opgegeven klantnummer en/of wachtwoord is niet juist. Controleer uw gegevens en probeer het opnieuw.', null, 'Waarschuwing');
				$.mobile.changePage($('#LoginPage'));
				$('#LoginForm input[name=UserName]').focus();
			}
		},
		function (jqXHR, textStatus, errorThrown) {
			clearTimeout(timeout);
			if (appdata != null) {
				loggedIn = true;
				window.localStorage.setItem(appVersion + 'loggedIn', loggedIn);
				$.mobile.changePage($('#HomePage'));
			} else
				navigator.notification.alert('Verbindingsfout! Er zijn geen gegevens om weer te geven!', null, 'Waarschuwing');
		});
		if (appdata != null) {
			// show question when data sync > 5s - options to choose: wait to sync | login without sync
			timeout = setTimeout(function () {
				navigator.notification.confirm(
				'De verbinding is traag. Wilt u doorgaan zonder in te loggen of wachten op de verbinding?',
				function (button) {
					if (button == 1) {
						return;
					}
					else {
						var prevPass = window.localStorage.getItem(appVersion + 'user.password');
						if (password == prevPass)
						{
							xhr.abort();
							loggedIn = true;
							window.localStorage.setItem(appVersion + 'loggedIn', loggedIn);
							$.mobile.changePage($('#HomePage'));
						}
						else
							navigator.notification.alert('Het door u opgegeven klantnummer en/of wachtwoord is niet juist. Controleer uw gegevens en probeer het opnieuw.', null, 'Waarschuwing');
					}
				},
				'Uw verbinding is traag',
				'Doorgaan,Wachten');

			}, 5000);
		}
	} else {
		var prevPass = window.localStorage.getItem(appVersion + 'user.password');
		if (password == prevPass)
		{
			if (appdata != null) {
				loggedIn = true;
				window.localStorage.setItem(appVersion + 'loggedIn', loggedIn);
				$.mobile.changePage($('#HomePage'));
		} 	else
				navigator.notification.alert('Verbindingsfout! Er zijn geen gegevens om weer te geven!', null, 'Waarschuwing');
		}
		else
			navigator.notification.alert('Het door u opgegeven klantnummer en/of wachtwoord is niet juist. Controleer uw gegevens en probeer het opnieuw.', null, 'Waarschuwing');
	}
}

function Logout() {
	navigator.notification.confirm(
			'Wilt u de applicatie verlaten?',
			function (button) {
				if (button == 1) {
					loggedIn = false;
					window.localStorage.setItem(appVersion + 'loggedIn', loggedIn);
					SaveLastPageName('#LoginPage');
					$.mobile.changePage($('#LoginPage'));
				}
				else
					return false;
			},
			'Applicatie verlaten',
			'Ja,Nee');
}

Storage.prototype.setObject = function (key, value) {
	this.setItem(appVersion + key, JSON.stringify(value));
}

Storage.prototype.getObject = function (key) {
	var value = this.getItem(appVersion + key);
	return value && JSON.parse(value);
}

document.addEventListener("resume", function () {
	Waiting.Stop();
}, false);

document.addEventListener("deviceready", function () {
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	//get app data from local storage
	appdata = window.localStorage.getObject('appdata');
	loggedIn = window.localStorage.getItem(appVersion + 'loggedIn')

	//init google anayltics
	googleAnalytics = window.plugins.googleAnalyticsPlugin;
	googleAnalytics.startTrackerWithAccountID(GoogleTrackerId);

	var lastPage = GetParam('lastPage');
	if (lastPage == null)
		$.mobile.changePage($('#LoginPage'));
	else
		$.mobile.changePage($(lastPage));

	if (loggedIn == 'true' && appdata != null) {
		loggedIn = true;
		$.mobile.changePage($('#HomePage'));
		UpdateAppdata();
	}

}, false);

//Get choosed user id, phone default user id or policy owner id
function GetUserIndex() {
	var index = selectedPerson;

	if (index == null || index >= appdata.Policy.length) {
		index = window.localStorage.getObject('defuser');

		if (index == null || index >= appdata.Policy.length)
			index = 0;
	}
	return index;
}

function SaveLastPageName(pagename) {
	if (pagename.indexOf('#') < 0) {
		return false;
	} else {
		SetParam('lastPage', pagename);
		return true;
	}
}

// show fade on bottom of screen when page height is grater than screen height
function ShowFade(pagename) {
	var container = pagename + ' .contentContainer';
	var divHeight = $(container).height() + parseInt($(container).css('marginTop'), 10) + parseInt($(container).css('marginBottom'), 10);

	if (divHeight > screen.height)
		$(pagename + ' .fade').show();
	else
		$(pagename + ' .fade').hide();
}

// prevent send textbox data on key OK/Next click
$(window).keydown(function (event) {
	if (event.keyCode == 13) {
		event.preventDefault();
		return false;
	}
});

function ResizeAndSaveImage(imageURI, success, fail) {
	window.resolveLocalFileSystemURI(imageURI, function (fileEntry) {
		var imageFile = fileEntry.fullPath.substr(fileEntry.fullPath.indexOf('/'));
		window.imageResizer.getImageSize(function (result) {
		console.log(result.width + ' ' + result.height);
			if (result.width > targetSize || result.height > targetSize)
			{
				var scale = 1;
				if (result.width > result.height)
					scale = targetSize / result.width;
				else
					scale = targetSize / result.height;

				window.imageResizer.resizeImage(function (data) {
					var path = imageFile.substr(0, imageFile.lastIndexOf('/'));
					var filename = 'scaled' + imageFile.substring(imageFile.lastIndexOf('/') + 1, imageFile.lastIndexOf('.'));

					window.imageResizer.storeImage(success, fail, data.imageData, { filename : filename, directory: path });
				}, fail, imageFile, scale, scale, { imageType: ImageResizer.IMAGE_DATA_TYPE_URL, resizeType: ImageResizer.RESIZE_TYPE_FACTOR });
			}
			else if (result.width < minimumSize || result.height < minimumSize)
			{
				navigator.notification.confirm(
					'Deze foto is klein en mogelijk niet duidelijk. Overweeg een andere foto toe te voegen.',
					function (button) {
						if (button == 2)
							CreateImageCopy(fileEntry, success);
					},
					'Waarschuwing',
					'Terug,Doorgaan');
			}
			else {
				CreateImageCopy(fileEntry, success);
			}
		}, fail, imageFile, { imageType : ImageResizer.IMAGE_DATA_TYPE_URL });
	}, fail);
}

function CreateImageCopy(fileEntry, success) {
	var FileEntry = fileEntry;
	var imageFile = fileEntry.fullPath.substr(fileEntry.fullPath.indexOf('/'));
	var path = imageFile.substr(0, imageFile.lastIndexOf('/'));
	var filename = 'scaled' + imageFile.substring(imageFile.lastIndexOf('/') + 1, imageFile.lastIndexOf('.'));

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
		fileSys.root.getDirectory(path, {create: true, exclusive: false}, function(dir) {
			FileEntry.copyTo(dir, filename, function() {
				var imageURI = dir.fullPath + '/' + filename;
				console.log(imageURI);
				success({url: imageURI});
			}, function (e) { console.log('file copying error: ' + e.code); });
		});
	}, null);
}

﻿$('#ServicePage').live('pageshow', function () {
	if (loggedIn != true) {
		$.mobile.changePage($('#LoginPage'));
	}
	googleAnalytics.trackPageview("/service");
	navigator.screenOrientation.set('sensor');

	ShowFade('#ServicePage');
});

var invoice = new Invoice();
var file;
var ScaledImageUri;
var invoiceSync = false;

function OnButtonChangeClick() {
	//SetParam('Name', invoice.Name);
	//SetParam('Total', invoice.Total);
	//SetParam('Accident', invoice.Accident);
	SetParam('Member', invoice.Member);
	SetParam('Provider', invoice.Provider);
	SetParam('ScaledImageUri', ScaledImageUri);
	//if (!invoiceSync)
		$.mobile.changePage($('#InvoicePage'));
	//else
	//	$.mobile.changePage($('#HomePage'));
}

function invoiceUploadFailed(invoice, file, error) {
	var deviceInfoString = ',model: ' + device.name + ',platform: ' + device.platform + ' ' + device.version;
	googleAnalytics.trackEvent('Invoices', 'Send invoice', 'error', 'code:' + error.code + ',HTTP_status=' + error.http_status + deviceInfoString);

	Waiting.Stop();

	navigator.notification.confirm(
		'Als gevolg van een communicatie fout kan uw declaratie niet worden verzonden. Probeert u het later nog eens.',
		function(button) {
			if (button == 1) {
				var invoices = new Invoices();
				if (!invoiceSync)
					invoices.SaveToResend(invoice, file);
				SetParam('ScaledImageUri', ScaledImageUri);
				$.mobile.changePage($('#ArchivePage'));
			}
			else if (invoiceSync)
			{
				var invoices = new Invoices();
				invoices.MarkAsSent();
				invoiceSync = false;
				$.mobile.changePage($('#ArchivePage'));
			}
		},
		'Waarschuwing',
		'Later verzenden,Annuleren');
}

function invoiceServerError(invoice, file, response) {
	var deviceInfoString = ',model: ' + device.name + ',platform: ' + device.platform + ' ' + device.version;
	googleAnalytics.trackEvent('Invoices', 'Send invoice', 'error', 'code:' + response.ResponseCode + deviceInfoString);

	Waiting.Stop();

	if (response.ResponseMessage != null) {
		navigator.notification.alert(response.ResponseMessage,
		function () {
			OnButtonChangeClick();
		},
		'Waarschuwing',
		'Doorgaan');
	}
	else
		navigator.notification.alert('De foto kan niet verzonden worden. Voeg een andere foto toe.',
		function () {
			OnButtonChangeClick();
		},
		'Waarschuwing',
		'Doorgaan');
}

function OnButtonSendInvoiceClick() {
	//send it to remote server
	var options = new FileUploadOptions();
	options.fileKey = 'file';
	options.fileName = ScaledImageUri.substr(ScaledImageUri.lastIndexOf('/') + 1);
	options.mimeType = "text/plain";
	
	var params = new Object();
	params.Name = invoice.Name;
	params.Total = invoice.Total;
	params.Login = window.localStorage.getItem(appVersion + 'user.login');
	params.Password = window.localStorage.getItem(appVersion + 'user.password');
	params.PhotoFromAlbum = invoice.PhotoFromAlbum;

	/*if (invoice.Accident)
		params.Accident = 'true';
	else
		params.Accident = 'false';*/
    
    params.Accident = 'false';
	params.Member = invoice.Member;

	options.params = params;

	Waiting.Start();

	var ft = new FileTransfer();
	ft.upload(
		ScaledImageUri,
		WebServiceURL + 'UploadInvoice',
		//success function
		function (r) {
			var result = r.response.substring(r.response.indexOf('{'), r.response.indexOf('</')); // get json response from FileTransferResponse
			var rEval = JSON.parse(result);
			if (rEval.ResponseCode == 0) {
				googleAnalytics.trackEvent('Invoices', 'Send invoice', 'succesfull', 0);
				//add invoice to archive
				var months = new Array('januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december');
				var date = new Date();
				var dateString =
				date.getDate() + ' ' +
				months[date.getMonth()] + ' ' +
				date.getFullYear() + ' ' +
				date.getHours() + ':' +
				date.getMinutes();
				invoice.SentTime = dateString;
				var invoices = new Invoices();
				invoices.Add(invoice, file);

				if (invoiceSync)
				{
					invoices.MarkAsSent(invoice);
					invoiceSync = false;
				}
				$.mobile.changePage($('#ConfirmationPage'));
				Waiting.Stop();
				if (rEval.ResponseMessage != null) {
					navigator.notification.alert(rEval.ResponseMessage, null, 'Info');
				}
			}
			else
				invoiceServerError(invoice, file, rEval);
		},
		//fail function
		function (error) {
			invoiceUploadFailed(invoice, file, error);
		},
		options, true);

	return false;
}

$('#SendPage').live('pageshow', function () {
	if (loggedIn != true) {
		$.mobile.changePage($('#LoginPage'));
	}
	navigator.screenOrientation.set('sensor');
	ShowFade('#SendPage');
	googleAnalytics.trackPageview("/send");

	var invoices = new Invoices();

	if (invoices.UnsentInvoice != null) {
		invoice = invoices.UnsentInvoice;
		invoiceSync = true;
	}
	else {
		//get params
		invoice.Name = Name;
		invoice.Total = Total;
		invoice.Accident = Accident;
		invoice.Member = Member;
		invoice.Provider = Provider;
		invoice.PhotoFromAlbum = PhotoFromAlbum;
	}

	ScaledImageUri = GetParam('ScaledImageUri');

	if (invoice.Accident == null) invoice.Accident = true;

	//show photo preview
	window.resolveLocalFileSystemURI(ScaledImageUri, function (fileEntry) {
		file = fileEntry;
		invoice.ImagePath = fileEntry.fullPath;
		$('#selectedPhoto').attr('src', invoice.ImagePath);
	}, function (e) { });

	//set view fields
	$('#name').text(invoice.Member);
	//$('#provider').text(invoice.Name)
	//$('#price').text('\u20AC ' + invoice.Total);
});


$('#InsurancePage').live('pageshow', function (event) {
	if (loggedIn != true) {
		$.mobile.changePage($('#LoginPage'));
	}
	selectedPerson = null;

	googleAnalytics.trackPageview("/insurance");
	navigator.screenOrientation.set('sensor');
	ShowFade('#InsurancePage');
});


function Invoice() {
	this.Name = '';
	this.Total = '';
	this.Accident = '';
	this.Provider = '';
	this.Member = '';
	this.ImagePath = '';
	this.SentTime = '';
	this.PhotoFromAlbum = false;
}

function Invoices() {
	this.login = window.localStorage.getItem(appVersion + 'user.login');
	this.Invoices = window.localStorage.getObject(this.login + 'Invoices');

	this.UnsentInvoice = window.localStorage.getObject(this.login + 'unsent');

	if (this.Invoices == null) this.Invoices = new Array();

	//remove invoice at index
	this.Delete = function(index) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
			fs.root.getFile('log.txt', {create: false}, function(fileEntry) {
				fileEntry.remove(function() {}, function() {});
			}, function() {});
		}, function() {});
		
		//remove from collection
		this.Invoices.splice(index, 1);
		
		//save to local storage
		window.localStorage.setObject(this.login + 'Invoices', this.Invoices);
	};
	
	//add new invoice
	this.Add = function(Invoice, FileEntry) {
		var InvoicesObject = this;
		var login = this.login;

		//save photo in local storage
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
			fileSys.root.getDirectory('.invoices', {create: true, exclusive: false}, function(dir) {
				var fileName = Math.round(+new Date()/1000) + FileEntry.fullPath.substr(FileEntry.fullPath.lastIndexOf('/') + 1);
				FileEntry.moveTo(dir, fileName, function() {
					Invoice.ImagePath = dir.fullPath + '/' + fileName;
					InvoicesObject.Invoices.push(Invoice);
					window.localStorage.setObject(login + 'Invoices', InvoicesObject.Invoices);
				}, function (e) { console.log('file copying error: ' + e.code); });
			});
		}, null);
	};
	this.SaveToResend = function(Invoice, FileEntry) {
		var InvoicesObject = this;
		var login = this.login;

		InvoicesObject.UnsentInvoice = Invoice;
		window.localStorage.setObject(login + 'unsent', InvoicesObject.UnsentInvoice);
	};
	
	this.MarkAsSent = function(Invoice) {
		window.localStorage.removeItem(appVersion + this.login + 'unsent');
	}

	// delete all invoices
	this.Clear = function () {
		this.Invoices = new Array();
		window.localStorage.setObject(this.login + 'Invoices', this.Invoices);
	};
}


var screenOrientation = function() {}

screenOrientation.prototype.set = function(str, success, fail) {
    PhoneGap.exec(success, fail, "ScreenOrientation", "set", [str]);
};
navigator.screenOrientation = new screenOrientation();
