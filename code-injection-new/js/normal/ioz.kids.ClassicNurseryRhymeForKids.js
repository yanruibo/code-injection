




 var revmob = null; var revmob_id = ''; var vdo_result = 10; var vdo_keyword = 'classic+nursery+rhymes+for+kids'; var vdo_author = ''; var vdo_orderby = 'relevance'; function onDeviceReady() {revmob = new RevMob(revmob_id); revmob.setTestingMode(false, null, null); revmob.showFullscreen(null, null); checkConnection(1); } function onBodyLoad() {document.addEventListener("deviceready", onDeviceReady, false); } function checkConnection(value) {var networkState = navigator.connection.type; var states = {}; states[Connection.UNKNOWN]  = 'Unknown connection'; states[Connection.ETHERNET] = 'Ethernet connection'; states[Connection.WIFI]     = 'WiFi connection'; states[Connection.CELL_2G]  = 'Cell 2G connection'; states[Connection.CELL_3G]  = 'Cell 3G connection'; states[Connection.CELL_4G]  = 'Cell 4G connection'; states[Connection.NONE]     = 'No network connection'; if (networkState == Connection.NONE){alert('Please connect to the internet, and open this app again. !!!'); $('#checknet a').html('Please connect internet.'); $('#player').html(''); }else{display_vdo(value); }; } function display_vdo(value){$('#player').html('<img src="css/images/ajax-loader.gif">'); $("#checknet").hide(); $('#listview').html(''); var vdo_index = value; var vdo_next = vdo_index + vdo_result; var vdo_prev = vdo_index - vdo_result; if(vdo_author!=''){var vdo_url = "http://gdata.youtube.com/feeds/api/videos?q="+vdo_keyword+"&author="+vdo_author+"&orderby="+vdo_orderby+"&start-index="+vdo_index+"&max-results="+vdo_result+"&v=2&alt=jsonc"; }else{var vdo_url = "http://gdata.youtube.com/feeds/api/videos?q="+vdo_keyword+"&orderby="+vdo_orderby+"&start-index="+vdo_index+"&max-results="+vdo_result+"&v=2&alt=jsonc"; } var vdo_list; var vdo_id; var vdo_title; var vdo_description; if(vdo_prev<1){ vdo_prev=1; } $('#next').attr('onClick', 'checkConnection('+vdo_next+')'); $('#prev').attr('onClick', 'checkConnection('+vdo_prev+')'); $.getJSON(vdo_url,function(response){$.each(response.data.items, function(i, value) {vdo_id = value.id; vdo_title = value.title; vdo_description = value.description; vdo_list += '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right"  data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-a"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#" data-transition="slide" class="ui-link-inherit video"  vidID="'+vdo_id+'"><img src="http://i.ytimg.com/vi/'+vdo_id+'/default.jpg"><strong>'+vdo_title+'</strong><p>'+vdo_description+'</p></a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>'; }); $(vdo_list).appendTo("#listview"); $('#player').html(''); }); $('.video').live("click", function(event){event.preventDefault(); vidID = $(this).attr('vidID'); var cat = $(this).attr('categoryID'); $('#player').html('<iframe src="http://www.youtube.com/embed/'+vidID+'?autoplay=1" width="160" height="90" frameBorder="0"></iframe>'); iframeAutoSize(); $("html, body").animate({ scrollTop: 0 }, "slow"); }); $( document ).on( "pagebeforecreate", function( event, data ){iframeAutoSize(); }); $( document ).on( "pagechange", function( event, data ){$('#player').html(''); }); function iframeAutoSize() {var $allVideos = $("iframe"), $fluidEl = $("[data-role='page']"); $allVideos.each(function() {$(this).data('aspectRatio', this.height / this.width) .removeAttr('height') .removeAttr('width'); }); $(window).resize(function() {var newWidth = $fluidEl.width(); $allVideos.each(function() {var $el = $(this); $el.height(newWidth * $el.data('aspectRatio')); $el.width(newWidth); }); }).resize(); } } 

function RevMob(appId) {
	this.appId = appId;
	this.TEST_DISABLED = 0;
	this.TEST_WITH_ADS = 1;
	this.TEST_WITHOUT_ADS = 2;

	cordova.exec(function(successParams){}, function(errorParams){}, "RevMobPlugin", "startSession", [appId]);

	this.showFullscreen = function(successCallback, errorCallback) {
		cordova.exec(successCallback, errorCallback, "RevMobPlugin", "showFullscreen", []);
	}

	this.openAdLink = function(successCallback, errorCallback) {
		cordova.exec(successCallback, errorCallback, "RevMobPlugin", "openAdLink", []);
	}

	this.showPopup = function(successCallback, errorCallback) {
		cordova.exec(successCallback, errorCallback, "RevMobPlugin", "showPopup", []);
	}

	this.setTestingMode = function(testingMode) {
		cordova.exec(null, null, "RevMobPlugin", "setTestingMode", [testingMode]);
	}

	this.printEnvironmentInformation = function() {
		cordova.exec(null, null, "RevMobPlugin", "printEnvironmentInformation", []);
	}

	this.setTimeoutInSeconds = function(seconds) {
		cordova.exec(null, null, "RevMobPlugin", "setTimeoutInSeconds", [seconds]);
	}
}

