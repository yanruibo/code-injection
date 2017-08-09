










var IS_TEST                = 0; // 1:test
var UPDATE_INTERVAL        = 1; // 1 hour
var IS_ANDROID             = (/android/gi).test(navigator.appVersion);
var IS_IOS4                = navigator.userAgent.match(/OS 4_[0-9_]+ like Mac OS X/i) !== null;
var IS_IOS5                = navigator.userAgent.match(/OS 5_[0-9_]+ like Mac OS X/i) !== null;
var MSG_ADD_FAV            = '\nをお気に入りに登録しました。';
var MSG_ADD_FAV_EXIST      = '\nはすでにお気に入りに登録しています。';
var MSG_CONFIRM_DELETE_FAV = '\nをお気に入りから削除していいですか？';
var MSG_DELETE_FAV         = '\nをお気に入りから削除しました。';
var MSG_COPY_DATA          = '\nをコピーしました。';
var MSG_ERR_COPY_DATA      = 'コピーに失敗しました。';
var PAGE_NAME_TOP          = "#top_page";
var PAGE_NAME_SUB          = "#sub_page";
var PAGE_NAME_FAV          = "#fav_page";
var PAGE_NAME_HIS          = "#his_page";
var DIALOG_NAME_EXTLINK    = "#extlink_dialog";
var DB_NAME_HISTORY        = 'HISTORY';
var DB_NAME_FAVORITE       = 'FAVORITE';
var DB_NAME                = 'database'
var DB_NAME_DISPLAY        = 'facemark_db'
var DB_VERSION             = '1.0';
var DB_ORDER_BY_FAVORITE   = ' ORDER BY datetime DESC ';
var DB_ORDER_BY_HISTORY    = ' ORDER BY datetime DESC ';
var DB_HISTORY_CNT         = ' 100 ';
var JSON_SERVER_FILE_PATH          = 'http://arg-facemark.appspot.com/json/';
var JSON_SERVER_FILE_PATH_FOR_TEST = 'http://mrkidproject.appspot.com/json/';
var FAV_START_THEME_ACTIVE  = 'g';
var FAV_START_THEME_PASSIVE = 'w';
var DEFAULT_SELECT_CATEGORY = 'greeting_morning';

function getJsonServerFilePath(){
	if(IS_TEST==1){
		return JSON_SERVER_FILE_PATH_FOR_TEST;
	}
	return JSON_SERVER_FILE_PATH;
}

function getDateTime(){
	var dd = new Date();
	return dd.getTime();
}
function DbFavoriteData(id, msg, datetime ) {
    this.id       = id;
    this.msg      = msg;
    this.datetime = datetime;
};

function DbHistoryData(id, msg, datetime ) {
    this.id       = id;
    this.msg      = msg;
    this.datetime = datetime;
};

var m_selectCategory = DEFAULT_SELECT_CATEGORY;
var m_db             = null;
var m_dbFavoriteData = new DbFavoriteData("","",0);
var m_dbHistoryData  = new DbHistoryData("","",0);
var m_nowPage        ="";

$.mobile.fixedToolbars.setTouchToggleEnabled(false);

//GoogleAnalytics

var m_myGoogleAnalyticsAccountIdForAndroid ='UA-31208339-1';
var m_myGoogleAnalyticsAccountIdForIphone  ='UA-31202384-1';
var ACTION_CLICK_TO_LIST        = 'action_to_list';
var ACTION_COPY                 = 'action_copy';
var ACTION_FAVORITE_ADD         = 'action_favorite_add';
var ACTION_FAVORITE_DEL         = 'action_favorite_delete';
var ACTION_CLICK_ACTION         = 'action_click_action';

function gaStart(){

	if(IS_ANDROID){

		if( window.plugins && window.plugins.analytics ){
			window.plugins.analytics.start(
					m_myGoogleAnalyticsAccountIdForAndroid,
					function(){},
					function(){});
		}
	}
	else{
		if( window.plugins && window.plugins.googleAnalyticsPlugin ){
			var googleAnalytics = window.plugins.googleAnalyticsPlugin;
	    	googleAnalytics.startTrackerWithAccountID(m_myGoogleAnalyticsAccountIdForIphone);
		}
	}
}

function gaqpush(page){

	gaStart();
	if(IS_ANDROID){
		if( window.plugins && window.plugins.analytics ){
			window.plugins.analytics.trackPageView( page,
					function(){}, function(){});
		}

	}else{
		if( window.plugins && window.plugins.googleAnalyticsPlugin ){
			var googleAnalytics = window.plugins.googleAnalyticsPlugin;
			googleAnalytics.trackPageview(page);
		}
	}
}

function gaqpushevent(category, action, opt_label, opt_value){
	gaStart();
	if(IS_ANDROID){
		if( window.plugins && window.plugins.analytics ){
			window.plugins.analytics.trackEvent(
					category, action, opt_label, opt_value,
					function(){}, function(){});
		}
	}
	else{
		if( window.plugins && window.plugins.googleAnalyticsPlugin ){
			var googleAnalytics = window.plugins.googleAnalyticsPlugin;
			googleAnalytics.trackEvent(category,action,opt_label,opt_value);
		}
	}
}

$(PAGE_NAME_TOP).live('pagecreate', function(e){
	m_nowPage = PAGE_NAME_TOP;
	initDB();
	setFooterlink();
	doMainList();
});
$(PAGE_NAME_TOP).live('pagebeforeshow', function(e){
	m_nowPage = PAGE_NAME_TOP;
	gaqpush(m_nowPage);
});

//$(PAGE_NAME_TOP).live('pagebeforehide', function(e){
//	$.mobile.fixedToolbars.hide(true);
//});

$(PAGE_NAME_SUB).live('pagecreate', function(e){

	m_nowPage = PAGE_NAME_SUB;
	initDB();
	setFooterlink();
});

$(PAGE_NAME_SUB).live('pagebeforeshow', function(e){

	m_nowPage = PAGE_NAME_SUB;
	gaqpush(m_nowPage);

	var localStorageSelectCategory = localStorage['select_category'];

	if( localStorageSelectCategory == null ){

		m_selectCategory = DEFAULT_SELECT_CATEGORY;
		localStorage['select_category'] == DEFAULT_SELECT_CATEGORY;
	}
	else{
		m_selectCategory = localStorageSelectCategory;
	}

	//初期化
	//$('#sub_page_header_sub_title').text('　');
	var dataListId = '#data_list_kaomoji';
    $(dataListId).html('');
    $('<li>').text('φ(≧▽≦)データ取得中・・・').appendTo(dataListId);
    $(dataListId).listview('refresh');
    $.mobile.fixedToolbars.hide(true);

	doKaomojiList();

});

$(PAGE_NAME_FAV).live('pagecreate', function(e){
	m_nowPage = PAGE_NAME_FAV;
	initDB();
	setFooterlink();
});

$(PAGE_NAME_FAV).live('pagebeforeshow', function(e){

	//alert('fav_page');
	m_nowPage = PAGE_NAME_FAV;
	gaqpush(m_nowPage);
	doMakeListForFavorite();
});

$(PAGE_NAME_HIS).live('pagecreate', function(e){
	m_nowPage = PAGE_NAME_HIS;
	initDB();
	setFooterlink();
});

$(PAGE_NAME_HIS).live('pagebeforeshow', function(e){

	m_nowPage = PAGE_NAME_HIS;
	gaqpush(m_nowPage);
	doMakeListForHistory();
});

function setFooterlink(){
	var linkTopId = '';
	var linkFavId = '';
	var linkHisId = '';
	var extlinkId = '';
	if( m_nowPage == PAGE_NAME_TOP){
		linkTopId = '#link_top_top';
		linkFavId = '#link_fav_top';
		linkHisId = '#link_his_top';
		extlinkId = '#extlink_dialog_top';
	}
	else if( m_nowPage == PAGE_NAME_SUB){
		linkTopId = '#link_top_sub';
		linkFavId = '#link_fav_sub';
		linkHisId = '#link_his_sub';
		extlinkId = '#extlink_dialog_sub';
	}
	else if( m_nowPage == PAGE_NAME_FAV){
		linkTopId = '#link_top_fav';
		linkFavId = '#link_fav_fav';
		linkHisId = '#link_his_fav';
		extlinkId = '#extlink_dialog_fav';
	}
	else if( m_nowPage == PAGE_NAME_HIS){
		linkTopId = '#link_top_his';
		linkFavId = '#link_fav_his';
		linkHisId = '#link_his_his';
		extlinkId = '#extlink_dialog_his';
	}
	$(extlinkId).bind('click', openExtlinkDialog );

	//if(IS_ANDROID){
		$(linkTopId).attr('data-transition','none');
		$(linkFavId).attr('data-transition','none');
		$(linkHisId).attr('data-transition','none');
	//}
}
function moveScroll(){

	scrollId = '';
	if( m_nowPage == PAGE_NAME_TOP){
		scrollId = '#top_header';
	}
	else if( m_nowPage == PAGE_NAME_SUB){
		scrollId = '#sub_header';
	}
	else if( m_nowPage == PAGE_NAME_FAV){
		scrollId = '#fav_header';
	}
	else if( m_nowPage == PAGE_NAME_HIS){
		scrollId = '#his_header';
	}
	else{
		return;
	}

	var speed = 'normal'; // slow, fast
	$('html,body').animate({scrollTop: $(scrollId).offset().top},speed);
}


function openExtlinkDialog() {

	gaqpushevent(m_nowPage, ACTION_CLICK_ACTION,'-', 1 );

	if(IS_ANDROID){
		if( window.plugins && window.plugins.webintent ){

			window.plugins.webintent.startActivity(
				{
					action: WebIntent.ACTION_SEND,
					type: 'text/plain'
				},
				function() {},
				function() {}
			);
		}
		else{
		}
	}
	else{
		$.mobile.changePage( "#extlink_dialog", { role:"dialog",transition: "slideup"} );
	}
}

function clipboardCopy(msg){

	gaqpushevent(m_nowPage, ACTION_COPY,msg, 1 );

	if(IS_ANDROID){

		if( window.plugins && window.plugins.clipboardManager ){
			window.plugins.clipboardManager.copy(
					msg,
					function(r){ navigator.notification.alert(msg + MSG_COPY_DATA, function(){}, 'Copy', 'OK'); },
					function(e){ navigator.notification.alert(MSG_ERR_COPY_DATA,   function(){}, 'Error', 'OK'); }
			);
		}
		else{
			alert(MSG_ERR_COPY_DATA);
		}
	}
	else{
		//iphone用
		if( window.plugins && window.plugins.clipboardPlugin ){
			window.plugins.clipboardPlugin.setText(msg);

			window.plugins.clipboardPlugin.getText(
			function(text) {
				navigator.notification.alert(
						text + MSG_COPY_DATA,
						function(){},
						'Copy',
						'OK');});
		}
		else{
			alert(MSG_ERR_COPY_DATA);
		}
	}
}

/*メイン画面のリストを作成する
  *
  */
function doMainList(){

	var filepath = 'json/';
	var filename = 'top_page.json';

	getJsonForTopPage(filepath+filename);

}

function setLocalStorageForTopPage( jsonData, nowVersion ){

    var obj      = jsonData.data;
    var title    = obj.title;
    var version  = obj.version;
    var category = obj.category;
    var list     = obj.list;


    setLocalStorageSubData( list );

    // versionが新しくなければ、終了
 	if( parseFloat(nowVersion) >=  parseFloat(version) ){
		return;
	}

    var value = '{"data":{"title":"'+title + '",'
    	  		+ '"category":"' + category  + '",'
    	  		+ '"version":"' + version  + '",'
    	  		+ '"list":[';
    var listdata = '';
    for(key in list){

    	if( listdata.length > 0){
    		listdata = listdata + ',';
    	}

        var msg  = list[key].msg;
        var link = list[key].link;
        var id   = list[key].id;
        var divider = list[key].divider;
        var aside = list[key].aside;

        listdata = listdata
        		+ '{'
        		+ '"divider":"'+ divider + '",'
        		+ '"msg":"'    + msg     + '",'
        		+ '"aside":"'  + aside   + '",'
        		+ '"id":"'     + id      + '",'
        		+ '"link":"'   + link    + '"'
        		+ '}';
    }

    value = value + listdata + "]}}";

	var key = category;
	localStorage[key] = value;
	localStorage[key+'_version'] = version;
}

function getJsonForTopPageSuccess(jsonData){

	var dataListId    = '#data_list_category';
	//var headerTitleId = '#top_page_header_sub_title';

    var obj = jsonData.data;
    var title = obj.title;
    var version = obj.version;
    var category = obj.category;
    var list = obj.list;

    //$(headerTitleId).text(title);
    $(dataListId).html('');

    for(key in list){
        var msg  = list[key].msg;
        var link = list[key].link;
        var id   = list[key].id;
        var divider = list[key].divider;
        var aside = list[key].aside;
        if( divider == "1"){
        	var dividermsg = '<div>★</div>' + msg;
        	$('<li data-role="list-divider">').html(dividermsg).appendTo(dataListId);
        }
        else{
        	var linkstr = "";
        	if( link.length > 0 ){

        		if( IS_ANDROID) {
        			linkstr = '<a href="' + link + '" id="clicked_link" data-transition="none">';
        		}
        		else{
        			linkstr = '<a href="' + link + '" id="clicked_link" data-transition="none">';
        		}

        		linkstr = linkstr + msg;
        		if( aside.length > 0){
        			linkstr = linkstr + '<p class="ui-li-aside">' + aside +'</p>';
        		}
        		linkstr = linkstr + '</a>';
        	}
        	else{
        		linkstr = msg;
        	}

        	$('<li class="my_top_list">').html(linkstr)
            .attr('id',settingId(id))
            .bind('click',doActionClickForTopPage)
            .appendTo(dataListId);
        }
    }

    $(dataListId).listview();
    $(dataListId).listview('refresh');
    $.mobile.fixedToolbars.show();

    //***************** localstorageの作成 **************************

    var filepath = getJsonServerFilePath();
	var filename = 'top_page.json';
	var param = '?datetime=' + getDateTime();

	$.ajax({
		  "url": filepath + filename + param,
		  "dataType":"json",
	        "success":function(serverJsonData){
	        			setLocalStorageForTopPage(serverJsonData, version );
	        		},
	        "error":function(){}
		});
	//**************************************************************
}

function getJsonForTopPageError(d, msg){

	var dataListId = '#data_list_category';
	//var headerTitleId = '#top_page_header_sub_title';

	//$(headerTitleId).text("---");

	$(dataListId).html('');
	$('<li class="my_list">').html('データが取得できませんでした。')
	.appendTo(dataListId);
	$(dataListId).listview();
	$(dataListId).listview('refresh');
	$.mobile.fixedToolbars.show();

}
function getJsonForTopPage(url){

	var topLocalStorage = localStorage['top'];

	if( topLocalStorage == null){

		$.ajax({
		  "url": url,
		  "dataType":"json",
	        "success":getJsonForTopPageSuccess,
	        "error":getJsonForTopPageError
		});
	}
	else{
		var topLocalStorageJsonData = JSON.parse(topLocalStorage);
		getJsonForTopPageSuccess(topLocalStorageJsonData);
	}

	/*
	$.getJSON( url, getJsonForTopPageSuccess );
	*/
}

function settingId(id){
	return id;
}

function doActionClickForTopPage(){

	m_selectCategory = "";
	m_selectCategory = $(this).attr('id');
	localStorage['select_category'] = m_selectCategory;
	gaqpushevent(m_nowPage, ACTION_CLICK_TO_LIST, m_selectCategory, 1);

}

function doKaomojiList(){

	settingfavoriteMark();
}

function getJsonForSubPageSuccess(jsonData, favRows, checkflg){

	var dataListId    = '#data_list_kaomoji';
	//var headerTitleId = '#sub_page_header_sub_title';

    var obj      = jsonData.data;
    var title    = obj.title;
    var version  = obj.version;
    var category = obj.category;

    //$(headerTitleId).text(":.｡. .｡.:* " + title + " *:.｡. .｡.:");

    var list = obj.list;

    $(dataListId).html('');

    for(key in list){
        var msg     = list[key].msg;
        var divider = list[key].divider;
        var id = list[key].id;

        if( divider == "1"){
        	var dividermsg = '<div>:.｡. .｡.:* </div>' + msg + '<div> *:.｡. .｡.:</div>';
        	$('<li data-role="list-divider">')
        	.html(dividermsg)
        	.appendTo(dataListId);
        }
        else{
        	var $li    =  $('<li class="my_list">');
        	var $link1 =  $('<a>');
        	var $link2 =  $('<a>');

        	var link1msg = '<div class="ui_li_link1">' + msg + '</div>';
        	$link1.html(link1msg)
        	.attr('href','#')
        	.attr('id',settingId( category + '_'+ id))
        	.bind('click',doActionTapForKaomojiPage)
        	.appendTo($li);

        	var dataTheme=FAV_START_THEME_PASSIVE;
        	if( favRows != null){
        		for (var i=0;i<favRows.length;i++){
        			var row = favRows.item(i);
        			if( row.msg == msg){
        				dataTheme= FAV_START_THEME_ACTIVE;
        				break;
        			}
        		}
        	}
        	$link2.html(msg)
        	.attr('href','#')
        	.attr('msg',msg)
        	.attr('data-theme',dataTheme)
        	.attr('id',settingId(category + '_'+ id))
        	.bind('click',doActionTapHoldForKaomojiPage)
        	.appendTo($li);

        	$li
        	.attr('id',settingId(category + '_'+ id))
        	.appendTo(dataListId);
        }
    }
    $(dataListId).listview('refresh');
    $.mobile.fixedToolbars.show();

    //***************** localstorageの作成 **************************
    var filepath = getJsonServerFilePath();
	var filename = "sub_page_" + category + ".json";
	var param = '?datetime=' + getDateTime();

	$.ajax({
		  "url": filepath + filename + param,
		  "dataType":"json",
	        "success":function(serverJsonData){
	        			setLocalStorageForSubPage(serverJsonData, version, checkflg );
	        		},
	        "error":function(){}
		});
	//**************************************************************

}
function getJsonForSubPageError(d, msg){

	var dataListId = '#data_list_kaomoji';
	//var headerTitleId = '#sub_page_header_sub_title';
	//$(headerTitleId).text("---");
	$(dataListId).html('');
	$('<li class="my_list">').html('データが取得できませんでした。')
	.appendTo(dataListId);
	$(dataListId).listview('refresh');
	$.mobile.fixedToolbars.show();

}

function getLocalStrorageSubData( list ){

    if( list == null){
    	return;
    }
    var filepath = getJsonServerFilePath();
	var datetime = getDateTime();
	localStorage['update_time'] = datetime.toString();

	for(key in list){

		var divider = list[key].divider;
        var category = list[key].id;

        if( divider == 0 && category.length > 0){
        	var filename = "sub_page_" + category + ".json";
        	var param = '?datetime=' + datetime;

        	var nowVersion = localStorage[category+'_version'];
        	if( nowVersion == null ){
        		nowVersion = '1.0';
        	}

        	$.ajax({
        		"url": filepath + filename + param,
        		"dataType":"json",
        		"success":function(serverJsonData){
	        			setLocalStorageForSubPage(serverJsonData, nowVersion, 0 );
	        		},
	        		"error":function(){}
        	});
        }
	}
	//alert('getLocalStrorageSubData end');
}

function setLocalStorageSubData( list ){

	var minute = UPDATE_INTERVAL * 60 * 60 * 1000;
	var nowDatetime = getDateTime();
	var localstorageDatetime = localStorage['update_time'];

	localstorageDatetimeNumber = Number(localstorageDatetime );

	if( localstorageDatetime == null ){

		getLocalStrorageSubData( list );
	}
	else{
		var differenceTime = nowDatetime - localstorageDatetimeNumber;
		if( differenceTime > minute ){
			getLocalStrorageSubData( list );
		}
	}
}

function setLocalStorageForSubPage( jsonData, nowVersion, checkflg ){

    var obj      = jsonData.data;
    var title    = obj.title;
    var version  = obj.version;
    var category = obj.category;
    var list     = obj.list;

    if( checkflg == 0 && ( parseFloat(nowVersion) >=  parseFloat(version) ) ){
		return;
	}

    var value = '{"data":{"title":"'+title + '",'
    	  		+ '"category":"' + category  + '",'
    	  		+ '"version":"' + version  + '",'
    	  		+ '"list":[';
    var listdata = '';

    for(key in list){

    	if( listdata.length > 0){
    		listdata = listdata + ',';
    	}

        var msg  = list[key].msg;
        var id   = list[key].id;
        var divider = list[key].divider;

        listdata = listdata
        		+ '{'
        		+ '"divider":"'+ divider + '",'
        		+ '"id":"'     + id      + '",'
        		+ '"msg":"'    + msg     + '"'
        		+ '}';
    }

    value = value + listdata + "]}}";

	var key = category;
	localStorage[key] = value;
	localStorage[key+'_version'] = version;
}

function getJsonForSubPage(url, favRows){

	var category = m_selectCategory;
	var subLocalStorage = localStorage[ category ];

	if( subLocalStorage == null ){

		$.ajax({
		  "url": url,
		  "dataType":"json",
	        "success":function(jsonData){
	        	getJsonForSubPageSuccess(jsonData, favRows, 0);
	        },
	        "error":function(d, msg){

	            var filepath = getJsonServerFilePath();
	        	var filename = "sub_page_" + category + ".json";
	        	var param = '?datetime=' + getDateTime();
	    		$.ajax({
	    			  "url": filepath + filename + param,
	    			  "dataType":"json",
	    		        "success":function(jsonData){
	    		        	getJsonForSubPageSuccess( jsonData, favRows, 1 );
	    		        },
	    		        "error":getJsonForSubPageError
	    			});
	        }
		});
	}
	else{
		var subLocalStorageJsonData = JSON.parse(subLocalStorage);
		getJsonForSubPageSuccess(subLocalStorageJsonData, favRows, 0);
	}
}

/*サブ画面のリストを作成する
  *
  */
function makeKaomojiList(favRows){

    var filepath = 'json/';
	var filename = "sub_page_" + m_selectCategory + ".json";

	getJsonForSubPage(filepath+filename, favRows);
}

function doActionTapForKaomojiPage(){

	//alert($(this).html());
	var facemarkValue = $(this).text();
	clipboardCopy(facemarkValue);

	var id = $(this).attr('id');
	var datetime = 0;
	setHistoryData(id, facemarkValue, datetime);
	checkAndAddHistoryData();

}

function doActionTapHoldForKaomojiPage(){
	//alert($(this).html());
	var id = $(this).attr('id');
	var msg = $(this).attr('msg');
	var datetime = 0;
	var dataTheme = $(this).attr('data-theme');

	setFavoriteData(id, msg, datetime);
	checkAndAddFavoriteData();

}

function doMakeListForFavorite(){
	selectAllFavoriteData();
}

function doMakeListForHistory(){
	deleteAndSelectAllHistoryData();
}

function initDB(){
	var db = getDB();
}

function setFavoriteData(id, msg, datetime){
	m_dbFavoriteData.id = id;
	m_dbFavoriteData.msg = msg;
	var tmpDatetime = datetime;
	if( tmpDatetime == 0){
		tmpDatetime = getDateTime();
	}
	m_dbFavoriteData.datetime = tmpDatetime;
}

function setHistoryData(id, msg, datetime){
	m_dbHistoryData.id = id;
	m_dbHistoryData.msg = msg;
	var tmpDatetime = datetime;
	if( tmpDatetime == 0){
		tmpDatetime = getDateTime();
	}
	m_dbHistoryData.datetime = tmpDatetime;
}

function getDB(){

  if( m_db == null){
    m_db = window.openDatabase(DB_NAME, DB_VERSION, DB_NAME_DISPLAY, 1000000);
    m_db.transaction( initDbSqlFavorite, errorCB, successCB);
    m_db.transaction( initDbSqlHistory,  errorCB, successCB);
  }

  return m_db;
}

function successCB(){}

function errorCB(tx, err){
	navigator.notification.alert("Error DB: "+ err.message, function(){}, 'Error', 'OK');
}

function settingfavoriteMark(){
	var db = getDB();
    db.transaction( settingfavoriteMarkSql, errorCB );
}

function checkAndAddFavoriteData(){
	var db = getDB();
    db.transaction( checkAndAddFavoriteDataSql, errorCB );
}

function selectAllFavoriteData(){
	var db = getDB();
    db.transaction( selectAllFavoriteDataSql, errorCB );
}

function addFavoriteData() {
  var db = getDB();
  db.transaction(addFavoriteDataSql, errorCB, successCB);
}
function checkLimitAddFavoriteData(){
	  var db = getDB();
	  db.transaction(checkLimitAddFavoriteDataSql, errorCB, successCB);
}

function deleteFavoriteData() {
  var db = getDB();
  db.transaction(deleteFavoriteDataSql, errorCB, successCB);
}

function initDbSqlFavorite(tx){

	var sql = 'CREATE TABLE IF NOT EXISTS '
		    + DB_NAME_FAVORITE
            +' (id text, msg text, datetime integer) ';

    tx.executeSql( sql);
}

function initDbSqlHistory(tx){

	var sql = 'CREATE TABLE IF NOT EXISTS '
		    + DB_NAME_HISTORY
            +' (id text, msg text, datetime integer) ';

    tx.executeSql( sql);
}

function settingfavoriteMarkSql(tx){
	var sql = ' SELECT * FROM '
	    + DB_NAME_FAVORITE;

	tx.executeSql(sql,
			[],
			function(tx, results ){
				var rows = results.rows;
				if( m_nowPage == PAGE_NAME_SUB){
					makeKaomojiList(rows);
				}
				else if( m_nowPage == PAGE_NAME_HIS){
					makeHisList(rows);
				}
			},
			errorCB
);
}

function checkLimitAddFavoriteDataSql(tx){
	var sql = ' SELECT * FROM '
	    + DB_NAME_FAVORITE;

	tx.executeSql(sql,
				[],
				function(tx, results ){
					var rows = results.rows;
					if( rows.length >= 100 ){

						navigator.notification.alert(
			                    'お気に入りには、１００件以上登録できません。',
			                    function(){},
			                    'Alert',
			                    'OK');
					}
					else{
						gaqpushevent(m_nowPage, ACTION_FAVORITE_ADD, m_dbFavoriteData.msg, 1 );
						addFavoriteData();
					}
				},
				errorCB
	);
}
function checkAndAddFavoriteDataSql(tx)
{
	var sql = ' SELECT * FROM '
	    + DB_NAME_FAVORITE
	    + ' WHERE msg = ? '
	    + DB_ORDER_BY_FAVORITE;

	tx.executeSql(sql,
				[m_dbFavoriteData.msg],
				function(tx, results ){

					var rows = results.rows;

					if( rows.length > 0 ){
						gaqpushevent(m_nowPage, ACTION_FAVORITE_DEL, m_dbFavoriteData.msg, 1 );
						deleteFavoriteData();
					}
					else{
						checkLimitAddFavoriteData();
					}
				},
				errorCB
	);
}

function selectAllFavoriteDataSql(tx)
{
	var sql = ' SELECT * FROM '
	    + DB_NAME_FAVORITE
	    + DB_ORDER_BY_FAVORITE;
  //alert(sql);
  tx.executeSql(sql,
            [],
            selectAllFavoriteDataSqlQuerySuccess,
            errorCB
       );
}

function selectAllFavoriteDataSqlQuerySuccess(tx, results )
{
	var dataListId = '#data_list_fav';
	var rows = results.rows;

	if( rows.length > 0 ){
		$(dataListId).html('');

    	var dividermsg1 = '<div>★</div>お気に入り *:.｡. .｡.:</div>';
    	$('<li data-role="list-divider">')
    	.html(dividermsg1)
    	.appendTo(dataListId);

		for (var i=0;i<rows.length;i++){
			var row = rows.item(i);
			var id = row.id;
			var msg = row.msg;
			var datetime = row.datetime;

        	var $li    =  $('<li class="my_list">');
        	var $link1 =  $('<a>');
        	var $link2 =  $('<a>');

        	var link1msg = '<div class="ui_li_link1">' + msg + '</div>';
        	$link1.html(link1msg)
        	.attr('href','#')
        	.attr('id',settingId(id))
        	.bind('click',doActionTapForFav)
        	.appendTo($li);

        	$link2.html(msg)
        	.attr('msg',msg)
        	.attr('data-theme',FAV_START_THEME_ACTIVE)
        	.attr('id',settingId(id))
        	.bind('click',doActionTapholdForFav)
        	.appendTo($li);

        	$li
        	.attr('id',settingId(id))
        	.appendTo(dataListId);
		}
		$(dataListId).listview('refresh');
	}
	else{
		$(dataListId).html('');

    	var dividermsg2 = '<div>★</div>お気に入り *:.｡. .｡.:</div>';
    	$('<li data-role="list-divider">')
    	.html(dividermsg2)
    	.appendTo(dataListId);

		$('<li class="my_list">').html('登録されていません。')
		.appendTo(dataListId);

		$(dataListId).listview('refresh');
	}
	$.mobile.fixedToolbars.show();
}

function doActionTapForFav(){

	var facemarkValue = $(this).text();
	clipboardCopy(facemarkValue);

    var id = $(this).attr('id');
	var datetime = 0;
	setHistoryData(id, facemarkValue, datetime);

	checkAndAddHistoryData();
}

function doActionTapholdForFav(){

    var id = $(this).attr('id');
    var msg =$(this).attr('msg');
	var datetime = 0;

	navigator.notification.confirm( msg + MSG_CONFIRM_DELETE_FAV,
								function(button){

									if( button == 1 ){
										setFavoriteData(id, msg, datetime);
										deleteFavoriteData();
									}
									else{}
								},
								'確認',
								'OK, Cancel');
}


function addFavoriteDataSql(tx) {

  var sql = ' INSERT INTO '
	    + DB_NAME_FAVORITE
	    + ' (id, msg, datetime ) VALUES (?, ?, ?) ';

  //alert(sql);
  tx.executeSql(sql,
		  		[ m_dbFavoriteData.id, m_dbFavoriteData.msg, m_dbFavoriteData.datetime],
		  		function(tx, results){

		      		navigator.notification.alert(m_dbFavoriteData.msg + MSG_ADD_FAV,
						function(){},
						'お気に入り',
						'OK');
		      		if(m_nowPage == PAGE_NAME_SUB){
		      			doKaomojiList();
		      		}
		      		else if(m_nowPage == PAGE_NAME_HIS){
		      			doMakeListForHistory();
		      		}
  				},
  				errorCB);
}

function deleteAllFavoriteDataSql(tx) {
	var sql = ' DELETE FROM '
	    + DB_NAME_FAVORITE;

	  tx.executeSql(sql,
			  [],
			  deleteQuerySuccess,
			  errorCB);
}

function deleteFavoriteDataSql(tx) {
	//alert("deleteSQL:" + m_dbFavoriteData.msg);
	var sql = ' DELETE FROM '
	    + DB_NAME_FAVORITE
	    + ' WHERE msg = ? ';

	tx.executeSql(sql,
				[m_dbFavoriteData.msg],
				function(tx, results){
					navigator.notification.alert(m_dbFavoriteData.msg  + MSG_DELETE_FAV,
							function(){},
							'お気に入り削除',
							'OK');
					if( m_nowPage == PAGE_NAME_FAV ){
						selectAllFavoriteData();
					}
					else if(m_nowPage == PAGE_NAME_SUB){
		      			doKaomojiList();
		      		}
					else if(m_nowPage == PAGE_NAME_HIS){
		      			doMakeListForHistory();
		      		}
		  		},
			  errorCB);
}

function addHistoryData() {
  var db = getDB();
  db.transaction(addHistoryDataSql, errorCB, successCB);
}

function updateHistoryData() {
	  var db = getDB();
	  db.transaction(updateHistorySql, errorCB, successCB);
	}

function checkAndAddHistoryData(){
	var db = getDB();
    db.transaction( checkAndAddHistoryDataSql, errorCB );
}

function deleteAndSelectAllHistoryData(){

	var db = getDB();
    db.transaction( deleteAndSelectAllHistoryDataSql, errorCB );
}

function selectAllHistoryData(){

	var db = getDB();
    db.transaction( selectAllHistoryDataSql, errorCB );
}

function checkAndAddHistoryDataSql(tx)
{
  var sql = 'SELECT * FROM '
	    + DB_NAME_HISTORY
	    + ' WHERE msg = ? '
	    + DB_ORDER_BY_HISTORY;
  //alert(sql);
  tx.executeSql(sql,
            [m_dbHistoryData.msg],
            checkAndAddHistoryDataSQLQuerySuccess,
            errorCB
       );
}

function checkAndAddHistoryDataSQLQuerySuccess(tx, results )
{
	var rows = results.rows;
	if( rows.length > 0 ){
		updateHistoryData();
	}
	else{
		addHistoryData();
	}
}

function selectAllHistoryDataSql(tx)
{

	var sql = ' SELECT * FROM '
	    + DB_NAME_HISTORY
	    + DB_ORDER_BY_HISTORY;

	tx.executeSql(sql,
            [],
            selectAllHistoryDataSqlQuerySuccess,
            errorCB
       );
}

var m_hisRows = null;
function makeHisList(favRows){

	var dataListId = '#data_list_his';
	if( m_hisRows == null || m_hisRows.length <= 0){

		$(dataListId).html('');

    	var dividermsg1 = '<div>★</div>履歴 *:.｡. .｡.:</div>';
    	$('<li data-role="list-divider">')
    	.html(dividermsg1)
    	.appendTo(dataListId);

		$('<li class="my_list">').html('履歴はありません。')
		.appendTo(dataListId);

		$(dataListId).listview('refresh');
	}
	else if( m_hisRows.length > 0 ){

		$(dataListId).html('');

    	var dividermsg2 = '<div>★</div>履歴 *:.｡. .｡.:</div>';
    	$('<li data-role="list-divider">')
    	.html(dividermsg2)
    	.appendTo(dataListId);

	    for (var i=0;i< m_hisRows.length;i++){
	    	var row = m_hisRows.item(i);
      		var $li    =  $('<li class="my_list">');
      		var $link1 =  $('<a>');
      		var $link2 =  $('<a>');

      		var link1msg = '<div class="ui_li_link1">' + row.msg + '</div>';
      		$link1.html(link1msg)
      		.attr('href','#')
      		.attr('id',settingId(row.id))
      		.bind('click',doActionTapForHis)
      		.appendTo($li);

        	var dataTheme=FAV_START_THEME_PASSIVE;
        	if( favRows != null){
        		for (var j=0;j<favRows.length;j++){
        			var favrow = favRows.item(j);
        			if( favrow.msg == row.msg){
        				dataTheme=FAV_START_THEME_ACTIVE;
        				break;
        			}
        		}
        	}
        	$link2.html(row.msg)
        	.attr('msg',row.msg)
        	.attr('data-theme',dataTheme)
        	.attr('id',settingId(row.id))
        	.bind('click',doActionTapholdForHis)
        	.appendTo($li);

        	$li.attr('id',settingId(row.id))
        	.appendTo(dataListId);
	    }
	    $(dataListId).listview('refresh');
	}
	$.mobile.fixedToolbars.show();
}

function selectAllHistoryDataSqlQuerySuccess(tx, results )
{
	m_hisRows = results.rows;
	settingfavoriteMark();
}

function doActionTapForHis(){

	var facemarkValue = $(this).text();
	clipboardCopy(facemarkValue);

	var id = $(this).attr('id');
	var datetime = 0;
	setHistoryData(id, facemarkValue, datetime);
	checkAndAddHistoryData();
}

function doActionTapholdForHis(){

    var id = $(this).attr('id');
    var msg =$(this).attr('msg');
	var datetime = 0;

	setFavoriteData(id, msg, datetime);
	checkAndAddFavoriteData();

}

function addHistoryDataSql(tx) {

	var sql = ' INSERT INTO '
		    + DB_NAME_HISTORY
		    + ' (id, msg, datetime ) VALUES (?, ?, ?) ';

	tx.executeSql(sql,
				[ m_dbHistoryData.id, m_dbHistoryData.msg, m_dbHistoryData.datetime],
				function(tx, results){
					if( m_nowPage == PAGE_NAME_HIS){
						deleteAndSelectAllHistoryData();
					}
				},
				errorCB);
}

function deleteAndSelectAllHistoryDataSql(tx) {

	var sql = ' DELETE FROM '
	    + DB_NAME_HISTORY
	    + ' WHERE msg IN '
	    + '( SELECT msg FROM '
	    + DB_NAME_HISTORY
	    + DB_ORDER_BY_HISTORY
	    + ' LIMIT -1 OFFSET '
	    + DB_HISTORY_CNT
	    + ' ) ';

	tx.executeSql(sql,
			[],
			function(tx, results){ selectAllHistoryData();},
			errorCB);
}

function updateHistorySql(tx) {

	var sql = 'UPDATE '
	    + DB_NAME_HISTORY
	    + ' SET datetime = ? '
	    + ' WHERE msg = ? ';

	tx.executeSql(sql,
				[m_dbHistoryData.datetime, m_dbHistoryData.msg],
				function(tx, results){
					if( m_nowPage == PAGE_NAME_HIS){
						deleteAndSelectAllHistoryData();
					}
				},
				errorCB);
}


/**
* Phonegap Web Intent plugin
* Copyright (c) Boris Smus 2010
*
*/
var WebIntent = function() {

};

WebIntent.ACTION_SEND = "android.intent.action.SEND";
WebIntent.ACTION_VIEW= "android.intent.action.VIEW";
WebIntent.EXTRA_TEXT = "android.intent.extra.TEXT";
WebIntent.EXTRA_SUBJECT = "android.intent.extra.SUBJECT";

WebIntent.prototype.startActivity = function(params, success, fail) {
return PhoneGap.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'startActivity', [params]);
};

WebIntent.prototype.hasExtra = function(params, success, fail) {
return PhoneGap.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'hasExtra', [params]);
};

WebIntent.prototype.getExtra = function(params, success, fail) {
return PhoneGap.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getExtra', [params]);
};

WebIntent.prototype.getDataString = function(success, fail) {
return PhoneGap.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getDataString', []);
};

PhoneGap.addConstructor(function() {
PhoneGap.addPlugin('webintent', new WebIntent());
PluginManager.addService("WebIntent","com.borismus.webintent.WebIntent");
});

function GoogleAnalyticsPlugin()
{

}

GoogleAnalyticsPlugin.prototype.startTrackerWithAccountID = function(id)
{
PhoneGap.exec("GoogleAnalyticsPlugin.startTrackerWithAccountID",id);
};

GoogleAnalyticsPlugin.prototype.trackPageview = function(pageUri)
{
PhoneGap.exec("GoogleAnalyticsPlugin.trackPageview",pageUri);
};


GoogleAnalyticsPlugin.prototype.trackEvent = function(category,action,label,value)
{
var options = {category:category,
action:action,
label:label,
value:value};
PhoneGap.exec("GoogleAnalyticsPlugin.trackEvent",options);
};

GoogleAnalyticsPlugin.prototype.trackerDispatchDidComplete = function(count)
{
//console.log("trackerDispatchDidComplete :: " + count);
};

/**
* Install function
*/
GoogleAnalyticsPlugin.install = function()
{
if ( !window.plugins )
{
window.plugins = {};
}
if ( !window.plugins.googleAnalyticsPlugin )
{
window.plugins.googleAnalyticsPlugin = new GoogleAnalyticsPlugin();
}
}

/**
* Add to PhoneGap constructor
*/
PhoneGap.addConstructor(GoogleAnalyticsPlugin.install);


/**
* Phonegap ClipboardManager plugin
* Omer Saatcioglu 2011
* Guillaume Charhon - Smart Mobile Software 2011
*/

var ClipboardManager = function() {
}


ClipboardManager.prototype.copy = function(str, success, fail) {
	PhoneGap.exec(success, fail, "ClipboardManager", "copy", [str]);
};

ClipboardManager.prototype.paste = function(success, fail) {
	PhoneGap.exec(success, fail, "ClipboardManager", "paste", []);
};

PhoneGap.addConstructor(function() {
	PhoneGap.addPlugin('clipboardManager', new ClipboardManager());
});
