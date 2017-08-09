















/* General */
var drupalUrl = 'http://mbe-dev10.banking.co.at/';
var Drupal = Drupal || { 'settings': {}, 'behaviors': {}, 'locale': {} };

/* Text variables */
var errorGettingPositionText;
var geocodeAddressText;
var creatingMapText;
var creatingMarkersText;
var calculatingDirectionsText;
var statusLabelText;
var adjustingZoomText;

var resultsText;
var corespondsText;

var monthlyRateText;
var totalAmountText;

/* Landing page image settings */
var landscapeCriteria = 1.2; /* Window width must be 20% greater than windows height */
var portraitRatio = .67; /* 2:3 is height:width and width=100% */
var landscapeRatio = 1; /* 1:1 is width:height and height=100% */
var portraitSmallImageUrl;
var portraitSmallBgColor;
var landscapeSmallImageUrl;
var landscapeSmallBgColor;
var portraitBigImageUrl;
var portraitBigBgColor;
var landscapeBigImageUrl;
var landscapeBigBgColor;

/* Exchange rate calculator */
var exchangeTableAmounts = [1, 2, 5, 10, 50, 100]; /* json_encode( $output = array(1, 2, 5, 10, 50, 100) ); */

(function($) {

	/* Get main Drupal JS */
	$.ajax({
		type: 'GET',
		url: drupalUrl + 'misc/drupal.js',
		dataType: 'script',
		async: false,
		crossDomain: true
	});
	
	/* Get variables */
	$.ajax({
		type: 'GET',
		url: 'http://images.mindtake.com/PUB/WDM-PhoneBanking/tools/proxy.php',
		data: { url : drupalUrl + '?q=get-js-settings' },
		dataType: "json",
		async: false,
		contentType: "application/json; charset=utf-8",
		success: function(data){
			$.extend(Drupal.settings, data);
		},
		error: function(xhr){
			alert('Cant get drupal variables from: ' + drupalUrl + '?q=get-js-settings Status: ' + xhr.statusText);
		}                
	});
	
	/* Text variables */
	errorGettingPositionText = Drupal.settings.mobileBanking.texts.errorGettingPosition;
	geocodeAddressText = Drupal.settings.mobileBanking.texts.geocodeAddress;
	creatingMapText = Drupal.settings.mobileBanking.texts.creatingMap;
	creatingMarkersText = Drupal.settings.mobileBanking.texts.creatingMarkers;
	calculatingDirectionsText = Drupal.settings.mobileBanking.texts.calculatingDirections;
	statusLabelText = Drupal.settings.mobileBanking.texts.statusLabel;
	adjustingZoomText = Drupal.settings.mobileBanking.texts.adjustingZoom;

	resultsText = Drupal.settings.mobileBanking.texts.results;
	corespondsText = Drupal.settings.mobileBanking.texts.coresponds;

	monthlyRateText = Drupal.settings.mobileBanking.texts.monthlyRate;
	totalAmountText = Drupal.settings.mobileBanking.texts.totalAmount;

	/* Landing page image settings */
	portraitSmallImageUrl = Drupal.settings.mobileBankingWallpaper ? Drupal.settings.mobileBankingWallpaper.backgroundImages.portraitSmall.url : false;
	portraitSmallBgColor = Drupal.settings.mobileBankingWallpaper ? Drupal.settings.mobileBankingWallpaper.backgroundImages.portraitSmall.bgColor : false;
	landscapeSmallImageUrl = Drupal.settings.mobileBankingWallpaper ? Drupal.settings.mobileBankingWallpaper.backgroundImages.landscapeSmall.url : false;
	landscapeSmallBgColor = Drupal.settings.mobileBankingWallpaper ? Drupal.settings.mobileBankingWallpaper.backgroundImages.landscapeSmall.bgColor : false;
	portraitBigImageUrl = Drupal.settings.mobileBankingWallpaper ? Drupal.settings.mobileBankingWallpaper.backgroundImages.portraitBig.url : false;
	portraitBigBgColor = Drupal.settings.mobileBankingWallpaper ? Drupal.settings.mobileBankingWallpaper.backgroundImages.portraitBig.bgColor : false;
	landscapeBigImageUrl = Drupal.settings.mobileBankingWallpaper ? Drupal.settings.mobileBankingWallpaper.backgroundImages.landscapeBig.url : false;
	landscapeBigBgColor = Drupal.settings.mobileBankingWallpaper ? Drupal.settings.mobileBankingWallpaper.backgroundImages.landscapeBig.bgColor : false;

})(jQuery);



/**
 * The jQuery.cookie() plugin uses the native localStorage and handled with cookies as fall back method.
 * More info at: https://github.com/fgiasson/jquery-enhanced-cookie
 */
jQuery.cookie=function(a,b,c){var d=false;if("localStorage"in window){try{window.localStorage.setItem("isStorageAvailable","true");d=true;window.localStorage.removeItem("isStorageAvailable","true")}catch(e){}}if(arguments.length>1&&String(b)!=="[object Object]"){c=jQuery.extend({},c);if(c.maxChunkSize==undefined){c.maxChunkSize=3e3}if(c.maxNumberOfCookies==undefined){c.maxNumberOfCookies=20}if(c.useLocalStorage==undefined){c.useLocalStorage=true}if(b===null||b===undefined){if(c.useLocalStorage&&d!=false){localStorage.removeItem(a)}for(var f=0;f<c.maxNumberOfCookies;f++){if(f==0){var g=$.chunkedcookie(a)}else{var g=$.chunkedcookie(a+"---"+f)}if(g!=null){$.chunkedcookie(a+"---"+f,null,c)}else{break}}}else{if(c.useLocalStorage&&d!=false){localStorage.setItem(a,b)}else{var h=new RegExp(".{1,"+c.maxChunkSize+"}","g");if(b.match!=undefined){var i=b.match(h);for(var f=0;f<i.length;f++){if(f==0){$.chunkedcookie(a,i[f],c)}else{$.chunkedcookie(a+"---"+f,i[f],c)}}}else{$.chunkedcookie(a,b,c)}}}return null}if(c==undefined){var c;if(arguments.length>1&&String(b)==="[object Object]"){c=b}else{c={}}if(c.maxNumberOfCookies==undefined){c.maxNumberOfCookies=20}if(c.useLocalStorage==undefined){c.useLocalStorage=true}}if(d!=false){var b=localStorage.getItem(a);if(b!=undefined&&b!=null){return b}}var b="";for(var f=0;f<c.maxNumberOfCookies;f++){if(f==0){var j=$.chunkedcookie(a)}else{var j=$.chunkedcookie(a+"---"+f)}if(j!=null){b+=j}else{if(f==0){return null}break}}return b};jQuery.chunkedcookie=function(a,b,c){if(arguments.length>1&&String(b)!=="[object Object]"){c=jQuery.extend({},c);if(b===null||b===undefined){c.expires=-1}if(typeof c.expires==="number"){var d=c.expires,e=c.expires=new Date;e.setDate(e.getDate()+d)}b=String(b);return document.cookie=[encodeURIComponent(a),"=",c.raw?b:encodeURIComponent(b),c.expires?"; expires="+c.expires.toUTCString():"",c.path?"; path="+c.path:"",c.domain?"; domain="+c.domain:"",c.secure?"; secure":""].join("")}c=b||{};var f,g=c.raw?function(a){return a}:decodeURIComponent;return(f=(new RegExp("(?:^|; )"+encodeURIComponent(a)+"=([^;]*)")).exec(document.cookie))?g(f[1]):null}


/**
 * SETTINGS
 */
var cmsUrl = 'http://app.immobank.at/';
var pingUrl = 'http://app.immobank.at/ping';


// var pingUrl = 'test.json';
var cookies; /* Core banking cookie name = 'coreUrl' */
var networkState;

/**
 * FUnctions
 */

var thisPage, thisPageId;

function adjustDialogTopMargin( thisPage ) {
	if ( thisPage.is(':visible') ) {
		var thisDialog = thisPage.find('.ui-dialog-contain');
		var thisHeight = thisDialog.height();
		var verticalGap = parseInt( $(window).height() - thisHeight - 20); /* Lets say we need at least 10px margin at top and bottom */
		if ( verticalGap>1 ) {
			var topMargin = parseInt( verticalGap/2 );
			thisDialog.css({ 'margin-top' : topMargin + 'px' });
		} else {
			thisDialog.css({ 'margin-top' : '10px' });
		};
		thisDialog.fadeTo(100, 1);
	};
};
$(document).delegate('[data-role="dialog"]', 'pageshow', function () {

	thisPage = $(this);
	thisPageId = thisPage.attr('id');
	
	/* Calculate dialog top-margin */
	adjustDialogTopMargin( thisPage );
	$(window).on('resize', function() {
		adjustDialogTopMargin( thisPage );
	});
	
});

(function($) {
	
	$(document).delegate('[data-role="page"]', 'pageshow', function () {
		
		thisPage = $(this);
		thisPageId = thisPage.attr('id');
		
		/* Using Phonegap API here */
		if ( typeof navigator.network!='undefined' ) {
			networkState = navigator.network.connection.type;
		} else {
			/* Phonegap framework not loaded, this can only happen in debug mode (not inside the app) */
			Connection = {'WIFI':true};
			networkState = Connection.WIFI
		};
		if (networkState == Connection.NONE){
			
			/* NO Internet connection */
			$.mobile.changePage('nonet.html', {transition: 'flip', role: 'dialog'});  
			
		} else {
			
			/* There is an Internet connection */
			
			if ( thisPageId=='index' ) {
				
				$.ajax({
					url: pingUrl,
					dataType: 'json',
					cache: false,
					success: function(data, textStatus) {
						$.cookie('coreUrl', data.path, { expires: 365, path: "/" });
						$.cookie('coreTitle', data.title, { expires: 365, path: "/" });
						$.cookie('pingJson', JSON.stringify(data), { expires: 365, path: "/" });
						location.href = cmsUrl;
					}, 
					beforeSend: function (XMLHttpRequest) {
						$.mobile.showPageLoadingMsg();
					},  
					error: function (xmlHttpRequest, status, err) {
						var bankListExists = false;
						if ( $.cookie('pingJson')!=null ) {
							/* Could be, on Volksbank: the bank was not selected, but we have the list of banks... */
							var latestResponse = $.parseJSON( $.cookie('pingJson') );
							if ( typeof latestResponse.bank_list!='undefined' )
								bankListExists = true;
						};
						if ( ( $.cookie('coreUrl')!=null && $.cookie('coreUrl') ) || bankListExists ) {
							setTimeout(function() {
								$.mobile.hidePageLoadingMsg();
							}, 2000);
							// location.href = 'fallback.html';
							$.mobile.changePage('fallback.html');
						} else {
							setTimeout(function() {
								$.mobile.hidePageLoadingMsg();
							}, 2000);
							// location.href = 'nonet.html';
							$.mobile.changePage('nonet.html');
						}
					}
				});
				
			};
			/* END if ( thisPageId=='index' ) */
			
			if ( thisPageId=='fallback' ) {
			
				var latestResponse = $.parseJSON( $.cookie('pingJson') );
				var loginUrlTemplate = latestResponse.login_url;
				if ( loginUrlTemplate ) {
					if ($('#state_selection').length<1 ) {
						var statesHtml = '';
						statesHtml += '<select id="state_selection">';
						statesHtml += '<option>- Auswählen -</option>';
						var stateNumber = 0;
						$.each(latestResponse.bank_list, function(state, banks) {
							var selectedText='';
							if ( latestResponse.selected_state==state ) selectedText = ' selected="selected" ';
							statesHtml += '<option ' + selectedText + ' data-state_number="' + stateNumber + '" value="' + state + '">' + state + '</option>';
							var banksHtml = '';
							banksHtml += '<div class="bank_group" id="state_number_' + stateNumber + '" style="display: none;">';
							$.each(banks, function(ind, bankInfo) {
								var bankLink = loginUrlTemplate.replace('XXX', bankInfo.mandant);
								var selectedBankSufix = '';
								if ( latestResponse.selected_bank==bankInfo.name ) selectedBankSufix = ' «-';
								banksHtml += '<p style="padding: .8em 0;"><a href="' + bankLink.replace('"', "'") + '" rel="external">' + bankInfo.name + selectedBankSufix + '</a></p>';
							});
							banksHtml += '</div>';
							$('.bank_list').append( banksHtml );
							stateNumber++;
						});
						statesHtml += '</select>';
						$('.states_list').append( statesHtml );
						$('.states_list').selectmenu();
						$('.selection_fallback').show();
						$('#state_selection').on('change', function() {
							var thisStateNumber = $(this).find(':selected').attr('data-state_number');
							$('.bank_group').hide();
							if ( thisStateNumber && ($('#state_number_'+thisStateNumber).length>0) ) {
								$('#state_number_'+thisStateNumber).show();
							};
						}).trigger('change');
					};
				} else {
					
					$('#app_tile_01').attr('href', $.cookie('coreUrl'));
					$('#app_tile_01 table td').text($.cookie('coreTitle'));
					$('.tile_fallback').show();
				};
				
				
			
			};
			/* END if ( thisPageId=='fallback' ) */
			
			/* Show spiner while loading external pages */
			$('a[rel=external]').on('click', function(e) {
				e.preventDefault();
				$.mobile.showPageLoadingMsg()
				setTimeout($.mobile.hidePageLoadingMsg, 2000);
				var thisHref = $(this).attr('href');
				$(location).attr('href', thisHref);
			});
			
		};
		

		
	});
	/* END $(document).delegate('[data-role="page"]', 'pageshow', function () */
	
})(jQuery);


