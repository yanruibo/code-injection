











goBack('menu', 'List');
getFooterMenu('news');
goBack('news', 'List');
getFooterMenu('news');
goBack('menu', 'List');
getFooterMenu('media');
goBack('mediaList', 'List');
getFooterMenu('media');
goBack('menu', 'Back');
getFooterMenu('');
goBack('menu', 'Back');
getFooterMenu('station');
goBack('menu', 'Back');
getFooterMenu('info');
goBack('info', 'List');
getFooterMenu('info');
goBack('menu', 'Back');
getFooterMenu('demon');
goBack('demon', 'Back');
getFooterMenu('demon');
goBack('Q09-01', 'Back');
getFooterMenu('demon');
goBack('demon', 'Back');
getFooterMenu('demon');
goBack('Q09-011', 'Back');
getFooterMenu('demon');
goBack('demon', 'Back');
getFooterMenu('demon');
goBack('demon', 'Back');
getFooterMenu('demon');
goBack('demon', 'List');
getFooterMenu('demon');
goBack('demonList', 'Back');
getFooterMenu('demon');
goBack('menu', 'List');
getFooterMenu('urgent');
goBack('urgent', 'Back');
getFooterMenu('urgent');
goBack('embassy', 'List');
getFooterMenu('urgent');
goBack('menu', 'List');
getFooterMenu('service');
goBack('menu', 'List');
getFooterMenu('license');
goBack('', 'Back');
getFooterMenu('jobs');
goBack('menu', 'List');
getFooterMenu('greetings');
goBack('greetings', 'Back');
getFooterMenu('greetings');
goBack('greetings', 'Back');
getFooterMenu('greetings');













var menuIcon = {
    "defaultWidth": "166",
    "defaultHeight": "166"
}

var footerIcon = {
    "defaultWidth": "129",
    "defaultHeight": "98",
    "heightWidthRatio": 0.76
}

var mediaXnodeConfig = {
    "film": "32970"
};

var servicesURL = {

	//http://www.immigration.gov.tw/wsxd/xd??.asp
	
    "frontSite": "http://www.immigration.gov.tw/",
    "frontSiteData": "http://www.immigration.gov.tw/public/Data/",
    "frontXml": "http://www.immigration.gov.tw/wsxd/xd", 
	
    //TODO pagesize?
    "news": "http://www.immigration.gov.tw/wsxd/xdlp.asp?CtNode=29710&CtUnit=16441&BaseDSD=7&mp=1&pagesize=50",
    "newsCp": "http://www.immigration.gov.tw/wsxd/xdcp.asp?ctNode=29710&mp=1&xItem=",//要加上xItem值
    "newsCpUrl": "http://www.immigration.gov.tw/ct.asp?ctNode=29710&mp=1&xItem=",//要加上xItem值
    //TODO pagesize?
    //"filmLp": "http://www.immigration.gov.tw/wsxd/xdlp.asp?ctNode=29775&CtUnit=16505&BaseDSD=7&mp=1&pagesize=50",
    "filmLp": "http://www.immigration.gov.tw/wsxd/xdlp.asp?ctNode=32970&CtUnit=17726&BaseDSD=7&mp=1&pagesize=50",

    "stationServiceSpot": "http://www.immigration.gov.tw/wsxd/xdlp.asp?ctNode=29682&CtUnit=16452&BaseDSD=108&mp=1", //服務據點: 服務站
    "stationSpecialTeam": "http://www.immigration.gov.tw/wsxd/xdlp.asp?ctNode=29683&CtUnit=16453&BaseDSD=108&mp=1", //服務據點: 專勤隊
    "stationNationTeam": "http://www.immigration.gov.tw/wsxd/xdlp.asp?ctNode=29684&CtUnit=16454&BaseDSD=108&mp=1", //服務據點: 國境隊
    "stationShelter": "http://www.immigration.gov.tw/wsxd/xdlp.asp?ctNode=29685&CtUnit=16455&BaseDSD=108&mp=1", //服務據點: 收容所
    "progress": "http://www.immigration.gov.tw/wsxd/xdsp.asp?xdurl=onlineapply/inqueryApplyStatus.asp&ctNode=32318&mp=1&applyNo=", //要加上applyNo值
    "normalProgress": "http://www.immigration.gov.tw/sp_immig2.aspx?xdUrl=aspcode%2Fapply_tableHandle_2.asp&Submit2=確認",
    "meetProgress": "http://www.immigration.gov.tw/sp_immig2.aspx?xdUrl=aspcode%2FX094Act_2.asp&Submit2=確認",
    "fastProgress": "http://www.immigration.gov.tw/sp_immig2.aspx?xdUrl=e_immig%2Fasp%2Ffqpmgt%2FFQPD_2.asp&Submit2=確認",
    "durationProgress": "http://www.immigration.gov.tw/sp_immig.aspx?xdurl=ecss/frm003q1_2.asp&submit=確定送出",
    "durationProgressApply": "http://www.immigration.gov.tw/sp_immig.aspx?xdurl=ecss/frm001q1_2.asp",
    "caseInquiry": "https://mt.immigration.gov.tw/queryApplyCase/getApplyCase", //商務/專業線上申辦進度查詢

    //TODO pagesize?
    "demon": "http://www.immigration.gov.tw/wsxd/xdlp.asp?CtUnit=16735&BaseDSD=111&mp=1&pagesize=200&ctNode=", //業務小精靈LP,要加上ctNode值
    "demonCp": "http://www.immigration.gov.tw/wsxd/xdcp.asp?", //業務小精靈CP,後面加上xurl的參數部分
    "epaper": "http://www.immigration.gov.tw/wsxd/epaper20/epaper.subscribe.act.email.asp?mp=1&",  //還要加上subscriberEmail和OrderEpaper
    //"immigrantInfo": "http://211.20.93.173/cas-web1/ImmigrantInfoServlet?htmlName=", //業務小精靈CP，後面參數加html檔名
    "immigrantInfo": "http://211.20.93.188/cas-web1/ImmigrantInfoServlet?htmlName=",

    // 徵才資訊
    "josInfo": "http://www.immigration.gov.tw/wsxd/xdlp.asp?CtNode=29891&CtUnit=16602&BaseDSD=7&mp=1",
    // 駐臺館處
    // "embassy": "http://www.immigration.gov.tw/wsxd/xdnp.asp?ctNode=33756&mp=1",
    "embassy": "xml/embassy.xml",
    // 下載題庫根路徑
    "examPathQ": "http://wwwc.moex.gov.tw/ExamQuesFiles/Question",
    "examPathA": "http://wwwc.moex.gov.tw/ExamQuesFiles/StandardAnswer",
    "examPathM": "http://wwwc.moex.gov.tw/ExamQuesFiles/ModifyAnswer",
    // 移民特考考情資訊
    "examInfo": "http://www.immigration.gov.tw/wsxd/xdlp.asp?CtNode=33831&CtUnit=18294&BaseDSD=7&mp=1",
    // 多國問候語
    //"pathGreetings": "http://dl.dropbox.com/u/50041843/imm/greetings/"
    //"pathGreetings": "/android_asset/www/greetings/"
    "pathGreetings": "greetings/"
};

var DeviceConfig = {
    "Android": {
        "headerBarHeight": 50,
        "speakerIconRightOffset": 45,
        "headerTitleFontSize": "16pt",
        "learningCategoryFontSize": "16pt",
        "chineseUnitItemHeight": 42,
        "englishExpFontSize": "14pt",
        "pronounciationFontSize": "16pt"
    },
    "iPhone": {
        "headerBarHeight": 44,
        "speakerIconRightOffset": 30,
        "headerTitleFontSize": "14pt",
        "learningCategoryFontSize": "14pt",
        "chineseUnitItemHeight": 36,
        "englishExpFontSize": "12pt",
        "pronounciationFontSize": "12pt"
    },
    "iPad": {
        "headerBarHeight": 76,
        "speakerIconRightOffset": 30,
        "headerTitleFontSize": "24pt",
        "learningCategoryFontSize": "24pt",
        "chineseUnitItemHeight": 80,
        "englishExpFontSize": "20pt",
        "pronounciationFontSize": "20pt"
    }
};

var System = {
    "globalTimeout": 10000,
    "debuggable": true,          //決定debug console output是否要執行
    "mapHl": "zh-TW"  //google map的host language
};

var Message = {
    "DeviceNotSupport": "功能不支援目前裝置",
    "GeolocationError": "擷取GPS位置失敗，無法進行路徑規劃",
    "NoNetwork": "無網路連線，將無法提供資訊",
    "ServiceUnavailable": "服務暫時無法連線，請稍後重試"
};

var windowWidth = 0;
var windowHeight = 0;
//影音專區的條列目標
var mediaTarget = 'film';//default是影片
//服務據點分類, 預設為29682: 服務站
var stationType = '29682';
var nowPage;
//業務小精靈的lp ctnode
var demonListCtnode;

//業務小精靈的CP htmlName
var infoContentHtmlName;
//業務小精靈的CP 頁的上一層
var infoParentHtml;

//業務小精靈lp頁的title文字
var demonLPTitle;

//業務小精靈CP頁的title文字
var infoCPTitle;
//
var mediaLink = null;
var mediaTitle = null;
var devicePlatform = "Android";
var isAndroid = false;
var isIphone = false;
//最新消息LP頁的cache
var newsLPCache;
//業務小精靈LP頁的cache
var demonLPCache = {};

//業務小精靈CP頁的cache
var infoCPCache = {};

//申請計算團聚期間表單用的預設變數
var receivenoApply;
var birthdayApply;
//預設環境是有網路連線的
var connectionNow = true;

var hasGeolocation = false;
var currentLongitude = null;
var currentLatitude = null;

//social network分享用
var fbTitle = "";
var fbUrl = "";
var fbSecondTitle = "";
var fbDesc = "";

//首頁點手機實體返回鍵
var currentPage = "";
var isHomeBackClick = false;

//for ajax request time test
var requestTime;
function startTimer() {
    requestTime = new Date();
}

function stopTimer() {
    var d = new Date();
    navigator.notification.alert("共：" + ((d.getTime() - requestTime.getTime()) / 1000) + " 秒", null, "Response Time", "確認");
}

function onBodyLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

//計算menu頁各icon需要之位置
function initializeMenu() {
    /*
    $("#footerMenu").css("width", windowWidth + "px");
    //    $(".bg").attr("style", "position:absolute;left:0px;top:0px;width:" + windowWidth + "px;height:" + windowHeight);
    $(".bg").attr("style", "position:absolute;left:0px;top:0px;width:100%");
    var blankTop = Math.round(windowHeight * 0.4);
    var gridLeft = Math.round(windowWidth * 0.08);
    var gridWidth = Math.round(windowWidth * 0.84);

    $("#menuGrid1").css("position", "absolute");
    $("#menuGrid1").css("z-index", "100");
    $("#menuGrid1").css("left", gridLeft + "px");
    $("#menuGrid1").css("top", blankTop + "px");
    $("#menuGrid1").css("width", gridWidth + "px");
    $("#menuGrid1").css("height", Math.round(windowHeight * 0.25) + "px");

    blankTop += Math.round(windowHeight * 0.25);
    $("#menuGrid2").css("position", "absolute");
    $("#menuGrid2").css("z-index", "100");
    $("#menuGrid2").css("left", gridLeft + "px");
    $("#menuGrid2").css("top", blankTop + "px");
    $("#menuGrid2").css("width", gridWidth + "px");
    $("#menuGrid2").css("height", Math.round(windowHeight * 0.25) + "px");

    //menu icon width必須小於windowWidth之20%
    var menuIconMax = Math.round(windowWidth * 0.28);
    if (menuIcon.defaultWidth > menuIconMax) {
        $(".menuIcon").css("width", menuIconMax + "px");
        $(".menuIcon").css("height", menuIconMax + "px");
    }
    //footer icon width必須小於windowWidth之20%
    var footerIconMaxWidth = Math.round(windowWidth * 0.2);
    if (footerIcon.defaultWidth > footerIconMaxWidth) {
        $(".footerIcon").css("width", footerIconMaxWidth + "px");
        $(".footerIcon").css("height", Math.round(footerIconMaxWidth * footerIcon.heightWidthRatio) + "px");
    } else {
        //footer icon剛好是window寬度1/5,do nothing
    }
    */
}

function getWindow() {
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    DebugLog("window width: " + windowWidth + ", window height: " + windowHeight);
}

function loadMobileConfig() {
    $.mobile.loadingMessage = '載入中';
    $.mobile.loadingMessageTextVisible = true;
    $.mobile.loadingMessageTheme = 'a';
    //$.mobile.defaultPageTransition = 'slide';
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
    if (isAndroid)
    {
        /*
        document.addEventListener("backbutton", function ()
        {
            if (currentPage == 'menu')
                if (isHomeBackClick)
                    navigator.app.exitApp();
                else {
                    window.MyToast.srt('再按一次退出程式！');
                    isHomeBackClick = true;
                }
            else
                history.back();
        }, true);
        */
        //添加回退按钮事件
        document.addEventListener("backbutton", onBackKeyDown, false);

        //BackButton按钮
        function onBackKeyDown() {
            if ($.mobile.activePage.is('#menu'))
                if (isHomeBackClick)
                    navigator.app.exitApp();
                else {
                    window.MyToast.srt('再按一次退出程式！');
                    isHomeBackClick = true;
                }
            else
                navigator.app.backHistory();
        }
    }
    // class="numbersOnly"，限制只能輸入數字
    $('.numbersOnly').keyup(function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    // class="numbersAndEnglishOnly"，限制只能輸入大小寫英文或數字
    $('.numbersAndEnglishOnly').keyup(function () {
        this.value = this.value.replace(/[^0-9a-zA-Z]/g, '');
    });
}

function onDeviceReady() {
    checkPlatform();
    loadMobileConfig();
    getWindow();
    $("#homebg").attr("style", "position:absolute;left:0px;right:0px;top:0px;bottom:0px;z-index:100;width:100%;height:100%;");
    //initializeMenu();
    bindPageshowEvents();
    checkConnection();
    if (isIphone) {
        ChildBrowser.install();
    }
    setTimeout(function () { switchPage("#menu") }, 2000);
}

function checkConnection() {
    var networkState = navigator.network.connection.type;
    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.NONE] = 'No network connection';

    DebugLog("connection type: " + states[networkState]);
    connectionNow = true;
    //    if(networkState == Connection.UNKNOWN || networkState == Connection.NONE || networkState == null) {
    //        navigator.notification.alert(Message.NoNetwork, null, "無網路", "確認");
    //        connectionNow = false;
    //    } else {
    //        connectionNow = true;
    //    }
}

function checkPlatform() {
    devicePlatform = device.platform;
    if (devicePlatform == "Android") {
        isAndroid = true;
        //} else if (devicePlatform.substring(0, 6) == "iPhone") {
    } else {
        isIphone = true;
    }
}

function bindPageshowEvents() {
    $("#menu").live("pageshow", function (event, ui)
    {
        currentPage = 'menu';
        isHomeBackClick = false;
        $('#menu-grid').css('height', windowHeight);

        // Handling icon touch (virtual vmouseover or mouseout) events
        // 緊急協助
        $('#icon-urgent').bind('vmouseover', function () {
            $(this).attr('src', 'images/menu/icon_urgent_over.png');
        });
        $('#icon-urgent').bind('vmouseout', function () {
            $(this).attr('src', 'images/menu/icon_urgent.png');
        });

        // 服務專線
        $('#icon-service').bind('vmouseover', function () {
            $(this).attr('src', 'images/menu/icon_service_over.png');
        });
        $('#icon-service').bind('vmouseout', function () {
            $(this).attr('src', 'images/menu/icon_service.png');
        });

        // 進度查詢
        $('#icon-progress').bind('vmouseover', function () {
            $(this).attr('src', 'images/menu/icon_progress_over.png');
        });
        $('#icon-progress').bind('vmouseout', function () {
            $(this).attr('src', 'images/menu/icon_progress.png');
        });

        // 人事徵才
        $('#icon-jobs').bind('vmouseover', function () {
            $(this).attr('src', 'images/menu/icon_jobs_over.png');
        });
        $('#icon-jobs').bind('vmouseout', function () {
            $(this).attr('src', 'images/menu/icon_jobs.png');
        });

        // 業務小精靈
        $('#icon-demon').bind('vmouseover', function () {
            $(this).attr('src', 'images/menu/icon_demon_over.png');
        });
        $('#icon-demon').bind('vmouseout', function () {
            $(this).attr('src', 'images/menu/icon_demon.png');
        });

        // 服務據點
        $('#icon-station').bind('vmouseover', function () {
            $(this).attr('src', 'images/menu/icon_station_over.png');
        });
        $('#icon-station').bind('vmouseout', function () {
            $(this).attr('src', 'images/menu/icon_station.png');
        });

        // 影音專區
        $('#icon-media').bind('vmouseover', function () {
            $(this).attr('src', 'images/menu/icon_media_over.png');
        });
        $('#icon-media').bind('vmouseout', function () {
            $(this).attr('src', 'images/menu/icon_media.png');
        });

        // 入臺電子證
        $('#icon-license').bind('vmouseover', function () {
            $(this).attr('src', 'images/menu/icon_license_over.png');
        });
        $('#icon-license').bind('vmouseout', function () {
            $(this).attr('src', 'images/menu/icon_license.png');
        });

        // 最新消息
        $('#icon-news').bind('vmouseover', function () {
            $(this).attr('src', 'images/menu/icon_news_over.png');
        });
        $('#icon-news').bind('vmouseout', function () {
            $(this).attr('src', 'images/menu/icon_news.png');
        });

        // 多國問候語
        $('#icon-greetings').attr('width', windowWidth / 2);
        $('#icon-greetings').bind('vmouseover', function () {
            $(this).attr('src', 'images/menu/icon_greetings_over.png');
        });
        $('#icon-greetings').bind('vmouseout', function () {
            $(this).attr('src', 'images/menu/icon_greetings.png');
        });
    });

    //news list
    $("#news").live("pageshow", function (event, ui)
    {
        currentPage = 'news';
        checkConnection();
        //若有cache, 直接取用cache的值, 然後return - by Wei
        if (typeof newsLPCache !== "undefined") {
            $("#newsListView").html(newsLPCache);
            $("#newsListView").listview("refresh");
            return;
        }
        if (connectionNow) {
            $.mobile.showPageLoadingMsg();

            $.ajax({
                url: servicesURL.news,
                type: 'GET',
                dataType: 'xml',
                timeout: System.globalTimeout,
                beforeSend: function () {
                    DebugLog('before get news');
                },
                error: function () {
                    ErrorLog('query news ERROR');
                },
                success: function (xml) {
                    DebugLog('query news success');
                },
                complete: function (jqx, textStatus) {
                    DebugLog('complete:' + textStatus);
                    if (textStatus == 'success') {
                        var xmlDoc = jqx.responseXML;
                        setOfflineXml(servicesURL.news, jqx.responseText);
                        parseNewsXml(xmlDoc);
                    } else if (textStatus == 'timeout') {
                        $.mobile.hidePageLoadingMsg();
                        var xml = getOfflineXml(servicesURL.news);
                        if(xml !== null){
                        	parseNewsXml(xml);
                        }else{
                        	showServiceError();
                        }
                    } else if (textStatus == 'error') {
                        $.mobile.hidePageLoadingMsg();
                        var xml = getOfflineXml(servicesURL.news);
                        if(xml !== null){
                        	parseNewsXml(xml);
                        }else{
                        	showServiceError();
                        }
                    }

                }
            });
        } else {

        }
    });

    $("#mediaList").live("pageshow", function (event, ui)
    {
        currentPage = 'mediaList';
        checkConnection();
        if (connectionNow) {
            loadMediaListPage();
        } else {

        }
    });

    //服務據點
    $("#stationDetail").live("pageshow", function (event, ui)
    {
        currentPage = 'stationDetail';
        checkConnection();
        if (connectionNow) {
            prepareStationDetail();
        } else {

        }
    });

    //申請計算團聚期間表單
    $("#durationProgressApply").live("pageshow", function (event, ui)
    {
        currentPage = 'durationProgressApply';
        console.log(JSON.stringify(window.history));
        checkConnection();
        //clear the old value
        $("#receiveno_dp_ap").val("");
        $("#birthday_dp_ap").val("");
        $("#cname_dp_ap").val("");
        $("#email_dp_ap").val("");
        $("#tel_dp_ap").val("");
        $("#fax_dp_ap").val("");
        //show the fields and button
        $('#applyForm').show();
        $("#durationProgressApplyContent").html("");
        $("#receiveno_dp_ap").val(receivenoApply);
        $("#birthday_dp_ap").val(birthdayApply);
    });

    //一般民眾案件進度查詢
    $("#normalProgress").live("pageshow", function (event, ui)
    {
        currentPage = 'normalProgress';
        checkConnection();
        var today = new Date();
        $('#rev_year_np').val(today.getFullYear() - 1911);
        //清除之前填的資料
        var prevPage = ui.prevPage;
        if (prevPage.attr('id') === 'progressList') {
            $('#rev_idno_np').val("");
            $('#idno_np').val("");
            $('#birth_y_np').val("");
            $('#birth_m_np').val("");
            $('#birth_d_np').val("");
            $('#normalProgressQueryContent').html("");
        }
    });

    //面談件進度查詢
    $("#meetProgress").live("pageshow", function (event, ui)
    {
        currentPage = 'meetProgress';
        //清除之前填的資料
        var prevPage = ui.prevPage;
        if (prevPage.attr('id') === 'progressList') {
            $('#file_no_mp').val("");
            $('#x094_name_mp').val("");
            $('#x094_tel_mp').val("");
            $('#meetProgressQueryContent').html("");
        }
    });

    //快速通關進度查詢
    $("#fastProgress").live("pageshow", function (event, ui)
    {
        currentPage = 'fastProgress';
        var prevPage = ui.prevPage;
        if (prevPage.attr('id') === 'progressList') {
            //清除之前填的資料
            $('#eng_name_fp').val("");
            $('#birth_date_fp').val("");
            $('#idno_fp').val("");
            $('#passno_fp').val("");
            $('#fastProgressQueryContent').html("");
        }
    });

    //團聚期間進度查詢
    $("#durationProgress").live("pageshow", function (event, ui)
    {
        currentPage = 'durationProgress';
        //清除之前填的資料
        var prevPage = ui.prevPage;
        if (prevPage.attr('id') === 'progressList') {
            $('#receiveno_dp').val("");
            $('#birthday_dp').val("");
            $('#durationProgressQueryContent').html("");
        }
    });

    //線上申辦進度查詢
    $("#progress").live("pageshow", function (event, ui)
    {
        currentPage = 'progress';
        checkConnection();
        //清除之前填的資料
        var prevPage = ui.prevPage;
        if (prevPage.attr('id') === 'progressList') {
            $('#applyNo').val("");
            $('#progressQueryContent').html("");
        }
        $('#applyNo').keypress(function (event) {
            if (event.which == 13) {
                event.preventDefault();
                $.mobile.showPageLoadingMsg();
                $.ajax({
                    url: servicesURL.progress + $('#applyNo').val(),
                    type: 'GET',
                    dataType: 'xml',
                    timeout: System.globalTimeout,
                    beforeSend: function () {
                        DebugLog('before query progress');
                    },
                    error: function (jqx, status, error) {
                        //					    
                    },
                    success: function (xml) {
                        parseProgressXml(xml);
                    },
                    complete: function (jqx, textStatus) {
                        DebugLog('complete:' + textStatus);
                        if (textStatus == 'success') {
                            //					        var xml = jqx.responseXML;

                        } else if (textStatus == 'error') {
                            $.mobile.hidePageLoadingMsg();
                            showServiceError();
                        } else if (textStatus == 'timeout') {
                            $.mobile.hidePageLoadingMsg();
                            showServiceError();
                        }
                    }
                });
            }
        });
    });

    /*$("#epaper").live("pageshow", function (event, ui) {
        currentPage = 'epaper';
        checkConnection();
        $('#epaper_1').attr("checked", "checked");
        $('#epaper_2').attr("checked", "checked");
        $('#email').val("");
        $('#epaperResponse1').html("");
        $('#epaperResponse2').html("");
    });*/

    $("#demon").live("pageshow", function (event, ui)
    {
        currentPage = 'demon';
        checkConnection();
    });

    $("#demonList").live("pageshow", function (event, ui)
    {
        currentPage = 'demonList';
        checkConnection();
        //若有cache, 直接取用cache的值, 然後return - by Wei
        if (typeof demonLPCache.content !== "undefined" && demonLPCache.ctNode === demonListCtnode) {
            $("#demonListView").html(demonLPCache.content);
            $("#demonListView").listview("refresh");
            return;
        }
        if (connectionNow) {
            $.mobile.showPageLoadingMsg();
            $('#demonListHeader').html(demonLPTitle);

            $.ajax({
                url: servicesURL.demon + demonListCtnode,
                type: 'GET',
                dataType: 'xml',
                timeout: System.globalTimeout,
                beforeSend: function () {
                    DebugLog('before get demon list: ' + demonListCtnode);
                },
                error: function () {
                    ErrorLog('query demon list ERROR: ' + servicesURL.demon + demonListCtnode);
                },
                success: function (xml) {
                    DebugLog('query demon list success: ' + demonListCtnode);
                },
                complete: function (jqx, textStatus) {
                    DebugLog('complete:' + textStatus);
                    if (textStatus == 'success') {
                        var xmlDoc = jqx.responseXML;
                        setOfflineXml(servicesURL.demon + demonListCtnode, jqx.responseText);
                        parseDemonXml(xmlDoc);
                    } else if (textStatus == "timeout" || textStatus == "error") {
                        $.mobile.hidePageLoadingMsg();
                        var xml = getOfflineXml(servicesURL.demon + demonListCtnode);
                        if(xml !== null){
                        	parseDemonXml(xml);
                        }else{
                        	showServiceError();
                        }
                        //showServiceError();
                    }

                }
            });
        } else {

        }
    });

    $("#infoContent").live("pageshow", function (event, ui)
    {
        currentPage = 'infoContent';
        //checkConnection();
        //若有cache, 直接取用cache的值, 然後return - by Wei
        if (typeof infoCPCache.content !== "undefined" && infoCPCache.htmlName === infoContentHtmlName) {
            $('#infoContentDetail').html(infoCPCache.content);
            return;
        }
        //if (connectionNow) {
            $.mobile.showPageLoadingMsg();
            $('#infoContentHeader').html(infoCPTitle);
            $.ajax({
                //url: servicesURL.immigrantInfo + infoContentHtmlName,
                url: 'xml/' + infoContentHtmlName.replace('htm','xml'),
                type: 'GET',
                dataType: 'xml',
                timeout: System.globalTimeout,
                beforeSend: function () {
                    DebugLog('before get info content: ' + infoContentHtmlName);
                },
                error: function () {
                    //ErrorLog('query info content ERROR: ' + servicesURL.immigrantInfo + infoContentHtmlName);
                    ErrorLog('query info content ERROR: xml/' + infoContentHtmlName.replace('htm', 'xml'));
                },
                success: function (xml) {
                    DebugLog('query info content success: ' + infoContentHtmlName);
                },
                complete: function (jqx, textStatus) {
                    DebugLog('complete:' + textStatus);
                    if (textStatus == 'success') {
                        var xmlDoc = jqx.responseXML;
                        //setOfflineXml(servicesURL.immigrantInfo + infoContentHtmlName, jqx.responseText);
                        setOfflineXml('xml/' + infoContentHtmlName.replace('htm', 'xml'), jqx.responseText);
                        parseInfoXml(xmlDoc);
                    } else if (textStatus == "timeout" || textStatus == "error") {
                        $.mobile.hidePageLoadingMsg();
                        //var xml = getOfflineXml(servicesURL.immigrantInfo + infoContentHtmlName);
                        var xml = getOfflineXml('xml/' + infoContentHtmlName.replace('htm', 'xml'));
                        if(xml !== null){
                        	parseInfoXml(xml);
                        }else{
                        	showServiceError();
                        }
                    }

                }
            });
        //}
    });

    $("#mediaContent").live("pageshow", function (event, ui)
    {
        currentPage = 'mediaContent';
        checkConnection();
        if (connectionNow) {
            prepareMediaContent();
        } else {

        }
    });

    $("#jobs-info").live("pageshow", function (event, ui)
    {
        currentPage = 'jobs-info';
        checkConnection();
        if (connectionNow)
            getJobsInfo();
    });

    $("#jobs-info-detail").live("pageshow", function (event, ui)
    {
        currentPage = 'jobs-info-detail';
        // checkConnection();
        // if (connectionNow)
        $.mobile.showPageLoadingMsg();
    });

    $("#embassy").live("pageshow", function (event, ui)
    {
        currentPage = 'embassy';
        checkConnection();
        if (connectionNow)
            getEmbassy();
    });

    $("#embassy-detail").live("pageshow", function (event, ui)
    {
        currentPage = 'embassy-detail';
        // checkConnection();
        // if (connectionNow)
        $.mobile.showPageLoadingMsg();
    });

    $("#ngo").live("pageshow", function (event, ui)
    {
        currentPage = 'ngo';
        checkConnection();
        if (connectionNow)
            getNGO();
    });

    $("#ngo-detail").live("pageshow", function (event, ui)
    {
        currentPage = 'ngo-detail';
        // checkConnection();
        // if (connectionNow)
        $.mobile.showPageLoadingMsg();
    });

    $("#exam-info").live("pageshow", function (event, ui)
    {
        currentPage = 'exam-info';
        checkConnection();
        if (connectionNow)
            getExamInfo();
    });

    $("#exam-info-detail").live("pageshow", function (event, ui)
    {
        currentPage = 'exam-info-detail';
        // checkConnection();
        // if (connectionNow)
        $.mobile.showPageLoadingMsg();
    });

    $("#urgent").live("pageshow", function (event, ui)
    {
        currentPage = 'urgent';
    });

    $("#service").live("pageshow", function (event, ui)
    {
        currentPage = 'service';
    });

    $("#progressList").live("pageshow", function (event, ui)
    {
        currentPage = 'progressList';
    });

    $("#jobs").live("pageshow", function (event, ui)
    {
        currentPage = 'jobs';
    });

    $("#license").live("pageshow", function (event, ui)
    {
        currentPage = 'license';
    });

    $("#greetings").live("pageshow", function (event, ui)
    {
        currentPage = 'greetings';
    });

    $("#media").live("pageshow", function (event, ui)
    {
        currentPage = 'media';
    });

    $("#station").live("pageshow", function (event, ui)
    {
        currentPage = 'station';
    });
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
    );
}

function changeMediaListPage(target) {
    mediaTarget = target;
    loadMediaListPage();
}

function loadMediaListPage() {
    $.mobile.showPageLoadingMsg();

    //load media lp xml
    var mediaLP = servicesURL.filmLp;

    $.ajax({
        url: mediaLP,
        type: 'GET',
        dataType: 'xml',
        timeout: System.globalTimeout,
        beforeSend: function () {
            DebugLog("before get '" + mediaTarget + "' LP");
        },
        error: function (jqx, errorType, ex) {
            DebugLog("get " + mediaTarget + " LP error: " + errorType);
        },
        success: function (xml) {
            //            console.log
        },
        complete: function (jqx, textStatus) {
            DebugLog("get " + mediaTarget + " " + textStatus);
            if (textStatus == "success") {
                var xml = jqx.responseXML;
                setOfflineXml(servicesURL.filmLp, jqx.responseText);
                parseMediaList(xml);
            } else if (textStatus == 'timeout' || textStatus == 'error') {
                $.mobile.hidePageLoadingMsg();
                var xml = getOfflineXml(servicesURL.filmLp);
                if(xml !== null){
                	parseMediaList(xml);
                }else{
                	showServiceError();
                }
            }
        }

    });
}

//parse demon lp xml from ajax response, add to listview
function parseDemonXml(xml) {
    //change header
    var articles = $(xml).find("TopicList[xNode='" + demonListCtnode + "'] > Article");
    var total = articles.length;

    var liHtml = "";
    $(articles).each(function (i) {
        var isExternalSite = ($(this).attr("newWindow") == "Y");
        var stitle = $(this).find("ArticleField > fieldName:contains('stitle')");
        var stitleText = $(stitle).parent().find("Value:first").text();
        var xurl = $(stitle).parent().find("xURL:first").text();//用xurl判斷是否是移民署全球網的連結

        liHtml += '<li>'; //避免標題被截斷
        //LP就要判斷是否是外部網站，若是則stitle就要開啟外部連結，且不轉入content頁
        if (isExternalSite) {
            liHtml += '<a href="#" onclick="javascript:openOutside(\'' + xurl + '\');"><h3 style="white-space:normal;">' + stitleText + '[外部網站]</h3></a>';
        } else {
            liHtml += '<a href="javascript:showDemonContent(\'' + $(this).attr("iCuItem") + '\', \'' + stitleText + '\', \'' + xurl + '\');">';
            liHtml += '<h3 style="white-space:normal;">' + stitleText + '</h3>';
            liHtml += '</a>';
        }

        liHtml += '</li>';
    });

    //    console.log(liHtml);
    //將parse結果存入cache
    demonLPCache.ctNode = demonListCtnode;
    demonLPCache.content = liHtml;
    $("#demonListView").html(liHtml);
    $("#demonListView").listview("refresh");
    $.mobile.hidePageLoadingMsg();
}

function parseInfoXml(xml) {
    //change header
    var articles = $(xml).find("ImmigrantInfo");
    var total = articles.length;

    var liHtml = "";
    var confirmMsg = $(articles).find("confirmMsg").text();
    var handAddr = $(articles).find("handAddr").text();
    var handUser = $(articles).find("handUser").text();
    var htmlName = $(articles).find("htmlName").text();
    var needCont = $(articles).find("needCont").text();
    var needFee = $(articles).find("needFee").text();
    var needTime = $(articles).find("needTime").text();
    var note = $(articles).find("note").text();
    var sendUser = $(articles).find("sendUser").text();
    var tip = $(articles).find("tip").text();

    liHtml += '<table><style>table { width:100%; }table caption { text-align:left;  }table thead th { text-align:left; white-space:nowrap;}table th, td { text-align:left; padding:6px; border-bottom:1px solid #ccc;} </style>'; //避免標題被截斷
    liHtml += '<thead><tr><th scope="col">狀況確認</th>  <td>';
    liHtml += confirmMsg;
    liHtml += '</td></tr></thead> <tbody><tr><th scope="row">誰來送件</th><td>';
    liHtml += sendUser;
    liHtml += '</td></tr><tr><th scope="row">誰可以辦</th><td>';
    liHtml += handUser;
    liHtml += '</td></tr><tr><th scope="row">到哪裡辦</th><td>';
    liHtml += handAddr;
    liHtml += '</td></tr><tr><th scope="row">要帶什麼</th><td>';
    liHtml += needCont;
    liHtml += '</td></tr><tr><th scope="row">所需時間</th><td>';
    liHtml += needTime;
    liHtml += '</td></tr><tr><th scope="row">所需費用</th><td>';
    liHtml += needFee;
    liHtml += '</td></tr><tr><th scope="row">申請程序或注意事項</th><td>';
    liHtml += note;
    liHtml += '</td></tr><tr><th scope="row">貼心小叮嚀</th><td>';
    liHtml += tip;
    liHtml += '</td></tr></tbody></table>'
    //    console.log(liHtml);
    //將parse結果存入cache
    infoCPCache.htmlName = infoContentHtmlName;
    infoCPCache.content = liHtml;
    $("#infoContentDetail").html(liHtml);
    $.mobile.hidePageLoadingMsg();
}


//show demon cp page
function showDemonContent(icuitem, title, xurl) {

    if (xurl.indexOf("ct.asp") != -1 || xurl.indexOf("ct_cert.asp") != -1) {
        //        navigator.notification.alert("是全球網內容頁,參數為: " + xurl.substring(xurl.indexOf("?")+1), null);
        var requestParam = xurl.substring(xurl.indexOf("?") + 1);
        $.mobile.showPageLoadingMsg();
        $.ajax({
            url: servicesURL.demonCp + requestParam,
            type: 'GET',
            dataType: 'xml',
            timeout: System.globalTimeout,
            beforeSend: function () {
                DebugLog('before get demon cp~~');
            },
            error: function () {
                ErrorLog("query demon cp ERROR: " + (servicesURL.demonCp + requestParam));
            },
            success: function (xml) {
                DebugLog('query demon cp success');
            },
            complete: function (jqx, textStatus) {

                DebugLog('complete:' + textStatus);
                if (textStatus == 'success') {
                	setOfflineXml(servicesURL.demonCp + requestParam, jqx.responseText);
                    var xml = jqx.responseXML;
                    var xbody = $(xml).find("MainArticleField > fieldName:contains('xbody')");
                    DebugLog("xbody element-->" + xbody);
                    var xbodyText = $(xbody).parent().find("Value:first").text();
                    DebugLog("xbodyText-->" + xbodyText);

                    var contentHtml = "";
                    contentHtml += '<h1>' + title + '</h1>'
                    + '<div name="xbody">' + xbodyText + '</div>';

                    $("#demonContentDetail").html(contentHtml);
                    $("#demonContentHeader").html(demonLPTitle);
                    $.mobile.hidePageLoadingMsg();
                    switchPage("#demonContent");
                } else if (textStatus == 'error' || textStatus == 'timeout') {
                    var xml = getOfflineXml(servicesURL.demonCp + requestParam);
                    if(xml !== null){
                    	var xbody = $(xml).find("MainArticleField > fieldName:contains('xbody')");
                        DebugLog("xbody element-->" + xbody);
                        var xbodyText = $(xbody).parent().find("Value:first").text();
                        DebugLog("xbodyText-->" + xbodyText);

                        var contentHtml = "";
                        contentHtml += '<h1>' + title + '</h1>'
                        + '<div name="xbody">' + xbodyText + '</div>';

                        $("#demonContentDetail").html(contentHtml);
                        $("#demonContentHeader").html(demonLPTitle);
                        $.mobile.hidePageLoadingMsg();
                        switchPage("#demonContent");
                    }else{
                    	$.mobile.hidePageLoadingMsg();
                    	showServiceError();
                    }
                }
            }
        });
    } else {
        ErrorLog("非正常業務小精靈內容頁但卻進來了!!!" + xurl);
    }
}

function subscribeEpaper() {
    checkConnection();
    if (connectionNow) {
        var emailAddress = $('#email').val();
        var emailValidate = /^[\w\.]+@([\w.]+)/.test(emailAddress);
        DebugLog("email validate: " + emailValidate);

        if (!emailValidate) {
            alert("請輸入正確的email");
        } else {
            var orderEpaper = "";
            if (document.getElementById('epaper_1').checked) {
                orderEpaper += ($('#epaper_1').val() + ",");
            }
            if (document.getElementById('epaper_2').checked) {
                orderEpaper += $('#epaper_2').val();
            }
            DebugLog("orderEpaper: " + orderEpaper);

            $.ajax({
                url: servicesURL.epaper,
                type: 'post',
                dataType: 'html',
                timeout: System.globalTimeout,
                data: { subscriberEmail: emailAddress, OrderEpaper: orderEpaper },
                beforeSend: function () {
                    $.mobile.showPageLoadingMsg();
                    DebugLog('before epaper');
                },
                error: function (jqx, status, error) {
                    ErrorLog('epaper ERROR-->status: ' + status + ", error: " + error);
                },
                success: function (xml) {
                    DebugLog('epaper success');
                },
                complete: function (jqx, textStatus) {
                    if (textStatus == 'success') {
                        $('#epaperResponse1').empty();
                        $('#epaperResponse2').empty();
                        $('#epaperResponse3').empty();

                        var html = jqx.responseText;
                        DebugLog("response html: " + html);
                        var xml = $.parseXML(html);
                        $('#epaperResponse1').text($(xml).find('p:first').text());
                        var epaperTitles = $(xml).find('h1');
                        if (epaperTitles && epaperTitles.size() > 0) {
                            $('#epaperResponse2').append('您訂閱了：<br/>');
                            epaperTitles.each(function (index) {
                                $('#epaperResponse2').append($(this).text());
                                $('#epaperResponse2').append('<br/>');
                            });
                        }
                        $('#epaperResponse3').text($(xml).find('p:last').text());
                        $.mobile.hidePageLoadingMsg();
                    } else if (textStatus == 'timeout' || textStatus == 'error') {
                        $.mobile.hidePageLoadingMsg();
                        showServiceError();
                    }
                }
            });
        }
    } else {

    }
}

function showStationDetail(type) {
    stationType = type;
    switchPage('#stationDetail');
}

//parse news LP xml from ajax call, to listview
function parseNewsXml(xmlDoc) {
    var articles = $(xmlDoc).find("TopicList[xNode='29710'] > Article");
    var total = articles.length;
    console.log("get news total amount:" + total);

    var liHtml = "";
    $(articles).each(function (i) {
        var stitle = $(this).find("ArticleField > fieldName:contains('stitle')");
        var xpostDate = $(this).find("ArticleField > fieldName:contains('xpostDate')");
        var stitleText = $(stitle).parent().find("Value").text();
        var xpostDateText = $(xpostDate).parent().find("Value").text();

        liHtml += '<li><a href="javascript:showNewsContent(\'' + $(this).attr("iCuItem") + '\', \'' + stitleText + '\', \'' + xpostDateText + '\');">';
        liHtml += '<h3 style="white-space: normal;">' + stitleText + '</h3>';
        liHtml += '<p>' + xpostDateText + '</p>';

        liHtml += '</a></li>';
    });

    //    console.log(liHtml);
    //將parse結果存入cache
    newsLPCache = liHtml;
    $("#newsListView").html(liHtml);
    $("#newsListView").listview("refresh");
    $.mobile.hidePageLoadingMsg();
}

//parse film.photo/broadcast LP xml to listview in mediaList div
function parseMediaList(xml) {
    //    console.log("lp xml: " + xml);
    //不同mediaTarget,ctNode不一樣
    var ctNode = mediaXnodeConfig.film;

    var articles = $(xml).find("TopicList[xNode='" + ctNode + "'] > Article");
    console.log("get media list amount: " + articles.length);
    var liHtml = genMediaListHtml(articles);

    //    console.log(liHtml);
    $("#mediaListView").html(liHtml);
    $("#mediaListView").listview("refresh");
    $.mobile.hidePageLoadingMsg();
}

//gen <li> html, base on different mediaTarget
function genMediaListHtml(articles) {
    var rtn = "";
    $(articles).each(function () {
        var stitle = $(this).find("ArticleField > fieldName:contains('stitle')");
        var stitleText;
        var xpostDate = $(this).find("ArticleField > fieldName:contains('xpostDate')");
        var xpostDateText = $(xpostDate).parent().find("Value").text();
        var ximgFile = $(this).find("ArticleField > fieldName:contains('ximgFile')");
        var ximgFileUrl = servicesURL.frontSiteData + $(ximgFile).parent().find("Value").text();
        var youtubeLink = "";
        var xurl = $(this).find("ArticleField > fieldName:contains('xurl')");
        youtubeLink = $(xurl).parent().find("Value").text();
        stitleText = $(stitle).parent().find("Value").text();

        var fielDownload = "";
        var link = "";
        link = youtubeLink;
        rtn += '<li onclick="javascript:openYoutube(\'http://www.youtube.com/watch?v=' + getYoutubeID(link) + '\');">';

        //TODO load圖片導致list頁剛轉換後會難以捲動
        rtn += '<img src="' + ximgFileUrl + '" style="width:80px;height:80px;"/>';//因為jQM只會將寬度縮為80，高度等比例跟著縮就會留空白，所以在此會指定高度

        rtn += '<h3 style="white-space: normal;">' + stitleText + '</h3>';
        rtn += '<p>' + xpostDateText + '</p>'

        rtn += "</li>";

    });
    return rtn;
}

function gotoMediaContent(link, title) {
    $('#mediaContainer').empty();
    switchPage("#mediaContent");
    mediaLink = link;
    mediaTitle = title;
}

function getYoutubeID(link) {
    return link.substring(link.indexOf("/v/") + 3, link.indexOf("?"));
}
var my_media = null;
var playing = false;

function showLoading() {
    $.mobile.showPageLoadingMsg();
}

function hideLoading() {
    $.mobile.hidePageLoadingMsg();
}

function showNewsContent(item, title, postdate) {
    //ajax call ct
    showLoading();
    console.log("ajax query news cp,icuitem: " + item);
    $.ajax({
        url: servicesURL.newsCp + item,
        type: 'GET',
        dataType: 'xml',
        timeout: System.globalTimeout,
        beforeSend: function () {
            console.log('before get news cp~~');
        },
        error: function () {

        },
        success: function (xml) {
            console.log('query news cp success');
        },
        complete: function (jqx, textStatus) {
            console.log('complete:' + textStatus);
            if (textStatus == 'success') {
            	setOfflineXml(servicesURL.newsCp + item, jqx.responseText);
                var xml = jqx.responseXML;
                //              console.log(xml);
                //compose cp page
                var mainArticle = $(xml).find('MainArticle[iCuItem="' + item + '"]');
                //var xbodyText = $(mainArticle).find("MainArticleField > fieldName:contains('xbody')").parent().find("Value").text();
                //var deptText = $(mainArticle).find("MainArticleField > fieldName:contains('idept')").parent().find("Value").text();
                var xbodyText = $(mainArticle).find("Content").text();
                var deptText = $(mainArticle).find("DeptName").text();

                //過濾本文連結以預設瀏覽器開啟
                if (xbodyText.search('href="') > 0 && xbodyText.search('target="_gipNW"') > 0) {
                    //xbodyText = xbodyText.replace('target="_gipNW"', '');
                    var arr_xbodyText = xbodyText.split('href="');
                    var i = 0;
                    var new_xbodyText = arr_xbodyText[0];
                    for (i = 1; i < arr_xbodyText.length; i++) {
                        new_xbodyText = new_xbodyText + 'href="javascript:openUrl(\'' + arr_xbodyText[i].split('" target="_gipNW">')[0] + '\');">' + arr_xbodyText[i].split('" target="_gipNW">')[1];
                    }
                    xbodyText = new_xbodyText;
                }

                var contentHtml = "";
                contentHtml += '<h2>' + title + '</h2>' +
                '<span style="text-align:left;">' + deptText + '</span>'
                    + '<p style="text-align:right;">' + postdate + '</p>'
                    + '<div name="xbody">' + xbodyText + '</div>';
                DebugLog('news title: ' + title);
                DebugLog('news deptText: ' + deptText);
                DebugLog('news postdate: ' + postdate);
                DebugLog('news xbodyText: ' + xbodyText);

                $("#newsContentDetail").html("");
                $("#newsContentDetail").html(contentHtml);
                //prepare facebook share info
                fbTitle = title;
                fbUrl = servicesURL.newsCpUrl + item;
                DebugLog("前台url: " + fbUrl);
                fbSecondTitle = deptText;
                fbDesc = title;
                //page change
                switchPage("#newsContent");
                hideLoading();
            } else if (textStatus == 'timeout' || textStatus == 'error') {
                var xml = getOfflineXml(servicesURL.newsCp + item);
                if(xml !== null){
                	//compose cp page
                    var mainArticle = $(xml).find('MainArticle[iCuItem="' + item + '"]');
                    var xbodyText = $(mainArticle).find("MainArticleField > fieldName:contains('xbody')").parent().find("Value").text();
                    var deptText = $(mainArticle).find("MainArticleField > fieldName:contains('idept')").parent().find("Value").text();

                    //過濾本文連結以預設瀏覽器開啟
                    if (xbodyText.search('href="') > 0) {
                        //xbodyText = xbodyText.replace('target = "_gipNW"', '');
                        var arr_xbodyText = xbodyText.split('href="');
                        var i = 0;
                        var new_xbodyText = arr_xbodyText[0];
                        for (i = 1; i < arr_xbodyText.length; i++) {
                            new_xbodyText = new_xbodyText + 'href="javascript:openUrl(\'' + arr_xbodyText[i].split('" target="_gipNW">')[0] + '\');">' + arr_xbodyText[i].split('" target="_gipNW">')[1];
                        }
                        xbodyText = new_xbodyText;
                    }

                    var contentHtml = "";
                    contentHtml += '<h2>' + title + '</h2>' +
                    '<span style="text-align:left;">' + deptText + '</span>'
                        + '<p style="text-align:right;">' + postdate + '</p>'
                        + '<div name="xbody">' + xbodyText + '</div>';
                    DebugLog('news title: ' + title);
                    DebugLog('news deptText: ' + deptText);
                    DebugLog('news postdate: ' + postdate);
                    DebugLog('news xbodyText: ' + xbodyText);

                    $("#newsContentDetail").html("");
                    $("#newsContentDetail").html(contentHtml);
                    //prepare facebook share info
                    fbTitle = title;
                    fbUrl = servicesURL.newsCpUrl + item;
                    DebugLog("前台url: " + fbUrl);
                    fbSecondTitle = deptText;
                    fbDesc = title;
                    //page change
                    switchPage("#newsContent");
                    hideLoading();
                }else{
                	hideLoading();
                	showServiceError();
                }
            }

        }
    });
}

function showMediaList(target) {
    //影音專區的條列目標(影片film/廣播broadcast/照片photo)
    mediaTarget = target;
    switchPage("#mediaList");
}

//parse station detail xml content from ajax call, to listview
function parseStationDetailXml(xmlDoc) {
    var articles = $(xmlDoc).find("TopicList[xNode='" + stationType + "'] > Article");
    var total = articles.length;
    console.log("get station detail total amount:" + total);
    var liHtml = "";
    $(articles).each(function (i) {
        var stitle = $(this).find("ArticleField > fieldName:contains('stitle')");
        var xAddress = $(this).find("ArticleField > fieldName:contains('xAddress')");
        var tel = $(this).find("ArticleField > fieldName:contains('c1')");
        var stitleText = $(stitle).parent().find("Value").text();
        var xAddressText = $(xAddress).parent().find("Value").text();
        var telText = $(tel).parent().find("Value").text();
        var i, telArray = telText.split(","), telLinks = "";
        for (i = 0; i < telArray.length; i++) {
            telLinks = telLinks + "<a href='tel:" + telArray[i] + "'>" + telArray[i] + "</a>";
            if (i !== telArray.length - 1) {
                telLinks = telLinks + "、";
            }
        }
        liHtml += '<li style="padding-left:10px;">';
        //Johnson 為了讓圖可以在右邊
        //Wei 所有連江縣的地址不顯示路徑規劃圖示
        if (xAddressText.indexOf("連江縣") === -1) {
            liHtml += '<img src="images/mapicon.png" style="float:right;position:relative;" onclick="javascript:showStationPath(\'' + xAddressText + '\');"/>';
        }
        liHtml += '<h2 style="white-space:normal;">' + stitleText + '</h2>';
        liHtml += '<p style="white-space:normal;">電話:' + telLinks + '</p>';
        liHtml += '<h2 style="white-space:normal;">地址:<a href="#" onclick="javascript:showMap(\'' + xAddressText + '\');">' + xAddressText + '</a></h2>';
        liHtml += '</li>';
    });
    //    console.log(liHtml);
    $("#stationDetailListView").html(liHtml);
    $("#stationDetailListView").listview("refresh");
    $.mobile.hidePageLoadingMsg();
    getGeoInfo();
}

function getGeoInfo() {
    navigator.geolocation.getCurrentPosition(
    function (position) {
        DebugLog("get geo info success, latitude:" + position.coords.latitude + " longitude:" + position.coords.longitude);
        hasGeolocation = true;
        currentLatitude = position.coords.latitude;
        currentLongitude = position.coords.longitude;
    },
    function (error) {
        hasGeolocation = false;
        ErrorLog("get geo info error, code:" + error.code + " message:" + error.message);
    });
}

function showStationPath(address) {
    //getGeoInfo();
    if (hasGeolocation) {
        //客戶要求將金門與連江縣的地址hard code為經緯度
        if (stationType === '29682' || stationType === '29684') {
            if (address.indexOf("金門縣") != -1) {
                address = "24.4124946,118.29067090000001";
            } else if (address.indexOf("連江縣") != -1) {
                address = "26.152896,119.944096";
            }
        } else if (stationType === '29683' || stationType === '29685') {
            if (address.indexOf("金門縣") != -1) {
                address = "24.430916,118.441737";
            } else if (address.indexOf("連江縣") != -1) {
                address = "26.146732,119.940319";
            }
        }
        openOutside("http://maps.google.com.tw/maps?saddr=" + currentLatitude + "," + currentLongitude + "&daddr=" + address + "&hl=zh-TW&ie=UTF8&mra=ls&t=m&z=15");
    } else {
        //navigator.notification.alert(Message.GeolocationError, null, "GPS Error", "確認");
        openOutside("http://maps.google.com.tw/maps?hl=zh-TW&ie=UTF8&t=m&z=15&q=" + address);
    }
}

function showMap(address) {
    //客戶要求將金門與連江縣的地址hard code為經緯度
    if (stationType === '29682' || stationType === '29684') {
        if (address.indexOf("金門縣") != -1) {
            address = "24.4124946,118.29067090000001";
        } else if (address.indexOf("連江縣") != -1) {
            address = "26.152896,119.944096";
            //Wei 連江縣的地圖導至固定的圖片檔
            if (stationType === '29682') {
                // $.mobile.changePage("lienchiang.html");
                switchPage('#islands1');
                return;
            }
        }
    } else if (stationType === '29683' || stationType === '29685') {
        if (address.indexOf("金門縣") != -1) {
            address = "24.430916,118.441737";
        } else if (address.indexOf("連江縣") != -1) {
            address = "26.146732,119.940319";
        }
    }
    openOutside('http://maps.google.com.tw/maps?q=' + address + '&z=15&t=m&hl=' + System.mapHl + '&ie=UTF8');
}

//parse query progress xml content from ajax call, to display
function parseProgressXml(xmlDoc) {
    //    var block = $(xmlDoc).find("hpMain");
    //    DebugLog("block text: " + block.text());
    //    DebugLog("block size: " + block.length);
    var spText = $(xmlDoc).children("hpmain").first().children("block[type='SP']").first().children("phtml").first().text();
    DebugLog("spText: " + spText);
    spText = spText.replace(/<\/label>/gi, "");
    spText = spText.replace(/nowrap/gi, "");
    var matches = spText.match(/<tr[\s\S]*?<\/tr>/gi);
    console.log("matches: " + matches);
    var spXml = jQuery.parseXML(matches[1]);
    var td = $(spXml).find("tr > td");
    $("#progressQueryContent").text($(td).eq(1).text());
    //	console.log("td: "+$(td).eq(1).text());
    $.mobile.hidePageLoadingMsg();
}

function parseNormalProgressXml(htmlDoc) {
    if (htmlDoc.indexOf('<table class="Tbdata">') !== -1) {
        var tableXml, result = "", lihtml = "";
        result = htmlDoc.substring(htmlDoc.indexOf('<table class="Tbdata">'), htmlDoc.indexOf('</table>') + 8);
        console.log(result);
        tableXml = $.parseXML(result);
        $(tableXml).find("tr").each(function (i) {
            var colName = $(this).find("th").text();
            var colValue = $(this).find("td").text();
            lihtml = lihtml + "<li>" + colName + colValue + "</li>";
        });
        $('#normalProgressQueryContent').html(lihtml);
        $('#normalProgressQueryContent').listview('refresh');
    } else {
        $('#normalProgressQueryContent').html('<li>查無資料，本系統僅提供最近三個月內之臨櫃申請案查詢</li>');
        $('#normalProgressQueryContent').listview('refresh');
    }
    $(document).scrollTop($(document).height());
    $.mobile.hidePageLoadingMsg();
}

function getNormalProgressResult() {
    var birthdayMark = '', birthdayYear, birthdayMonth, birthdayDay;
    /*
    if ($('#birth_y_np').val() === '' || $('#birth_m_np').val() === '' || $('#birth_d_np').val() === '') {
        navigator.notification.alert("請輸入出生日期!", null, "一般人民申請案件", "好");
        return;
    }
    if (isNaN($('#birth_y_np').val()) || isNaN($('#birth_m_np').val()) || isNaN($('#birth_d_np').val())) {
        navigator.notification.alert("出生日期不可輸入非數字!", null, "一般人民申請案件", "好");
        return;
    }
    */
    if ($('#birth_np').val() === '') {
        navigator.notification.alert("請輸入出生日期!", null, "一般人民申請案件", "好");
        return;
    }
    if ($('#idno_np').val() === '' && ($('#rev_year_np').val() === '' || $('#rev_idno_np').val() === '')) {
        navigator.notification.alert("案件編號與身分證號請擇一輸入!", null, "一般人民申請案件", "好");
        return;
    }
    /*
    birthdayMark = encodeURIComponent($('input[name="birthdayMark"]:checked').val());
    birthdayYear = $('#birth_y_np').val();
    birthdayMonth = $('#birth_m_np').val();
    birthdayDay = $('#birth_d_np').val();
    console.log(servicesURL.normalProgress + '&rev_year=' + $('#rev_year_np').val() + '&rev_idno=' + $('#rev_idno_np').val() + '&idno=' + $('#idno_np').val() + '&birthday_mark=' + birthdayMark + '&birth_y=' + birthdayYear + '&birth_m=' + birthdayMonth + '&birth_d=' + birthdayDay);
    */
    $.mobile.showPageLoadingMsg();
    var birth_np = $('#birth_np').val();
    //console.log('birth_np: ' + birth_np);
    
    birthdayYear = birth_np.split('/')[0].toString();
    birthdayMonth = birth_np.split('/')[1].toString();
    birthdayDay = birth_np.split('/')[2].toString();

    //console.log('birthdayYear: ' + birthdayYear);
    //console.log('birthdayMonth: ' + birthdayMonth);
    //console.log('birthdayDay: ' + birthdayDay);
    
    $.ajax({
        url: servicesURL.normalProgress + '&rev_year=' + $('#rev_year_np').val() + '&rev_idno=' + $('#rev_idno_np').val() + '&idno=' + $('#idno_np').val() + '&birthday_mark=' + birthdayMark + '&birth_y=' + birthdayYear + '&birth_m=' + birthdayMonth + '&birth_d=' + birthdayDay,
        type: 'GET',
        dataType: 'html',
        timeout: System.globalTimeout,
        beforeSend: function () {
            DebugLog('before query progress');
        },
        error: function (jqx, status, error) {
            //		    
        },
        success: function (html) {

            parseNormalProgressXml(html);
        },
        complete: function (jqx, textStatus) {
            DebugLog('complete:' + textStatus);
            if (textStatus == 'success') {

            } else if (textStatus == 'error') {
                $.mobile.hidePageLoadingMsg();
                showServiceError();
            } else if (textStatus == 'timeout') {
                $.mobile.hidePageLoadingMsg();
                showServiceError();
            }
        }
    });

}

function parseMeetProgressXml(htmlDoc) {
    if (htmlDoc.indexOf('<table class="Tbdata1" summary="編排用表單">') !== -1) {
        var tableXml, result = "", lihtml = "";
        result = htmlDoc.substring(htmlDoc.indexOf('<table class="Tbdata1" summary="編排用表單">'), htmlDoc.indexOf('</table>') + 8);
        console.log(result);
        $('#hidden_meet').html(result).hide();
        $('#hidden_meet table tr').each(function (i) {
            var colName = $(this).children("th").text();
            var colValue = $(this).children("td").text();
            lihtml = lihtml + "<li>" + colName + colValue + "</li>";
        });

        $('#meetProgressQueryContent').html(lihtml);
        $('#meetProgressQueryContent').listview('refresh');
    } else {
        $('#meetProgressQueryContent').html('<li>查無資料</li>');
        $('#meetProgressQueryContent').listview('refresh');
    }
    $(document).scrollTop($(document).height());
    $.mobile.hidePageLoadingMsg();
}

function getMeetProgressResult() {
    if (isNaN($('#file_no_mp').val())) {
        navigator.notification.alert("案號不可輸入非數字!", null, "大陸配偶面談時間", "好");
        return;
    }
    $.mobile.showPageLoadingMsg();
    $.ajax({
        url: servicesURL.meetProgress + '&file_no=' + $('#file_no_mp').val() + '&x094_name=' + $('#x094_name_mp').val() + '&x094_tel=' + $('#x094_tel_mp').val(),
        type: 'GET',
        dataType: 'html',
        timeout: System.globalTimeout,
        beforeSend: function () {
            DebugLog('before query progress');
        },
        error: function (jqx, status, error) {
            //		    
        },
        success: function (html) {

            parseMeetProgressXml(html);
        },
        complete: function (jqx, textStatus) {
            DebugLog('complete:' + textStatus);
            if (textStatus == 'success') {

            } else if (textStatus == 'error') {
                $.mobile.hidePageLoadingMsg();
                showServiceError();
            } else if (textStatus == 'timeout') {
                $.mobile.hidePageLoadingMsg();
                showServiceError();
            }
        }
    });
}

function parseFastProgressXml(htmlDoc) {
    if (htmlDoc.indexOf('<table class="Tbdata">') !== -1) {
        var tableXml, result = "", lihtml = "";
        result = htmlDoc.substring(htmlDoc.indexOf('<table class="Tbdata">'), htmlDoc.indexOf('</table>') + 8);
        console.log(result);
        $('#hidden_fast').html(result).hide();
        $('#hidden_fast table tr').each(function (i) {
            var colName = $(this).children("th").text();
            var colValue = $(this).children("td").text();
            lihtml = lihtml + "<li>" + colName + colValue + "</li>";
        });

        $('#fastProgressQueryContent').html(lihtml);
        $('#fastProgressQueryContent').listview('refresh');
    } else {
        $('#fastProgressQueryContent').html('<li>查無資料</li>');
        $('#fastProgressQueryContent').listview('refresh');
    }
    $(document).scrollTop($(document).height());
    $.mobile.hidePageLoadingMsg();
}

function getFastProgressResult() {
    var birth_date = "";
    $.mobile.showPageLoadingMsg();
    birth_date = $('#birth_date_fp').val().replace(/\//g, "");

    $.ajax({
        url: servicesURL.fastProgress + '&eng_name=' + $('#eng_name_fp').val().toUpperCase() + '&birth_date=' + birth_date + '&idno=' + $('#idno_fp').val() + '&passno=' + $('#passno_fp').val(),
        type: 'GET',
        dataType: 'html',
        timeout: System.globalTimeout,
        beforeSend: function () {
            DebugLog('before query progress');
        },
        error: function (jqx, status, error) {
            //		    
        },
        success: function (html) {

            parseFastProgressXml(html);
        },
        complete: function (jqx, textStatus) {
            DebugLog('complete:' + textStatus);
            if (textStatus == 'success') {

            } else if (textStatus == 'error') {
                $.mobile.hidePageLoadingMsg();
                showServiceError();
            } else if (textStatus == 'timeout') {
                $.mobile.hidePageLoadingMsg();
                showServiceError();
            }
        }
    });
}

function postDurationProgressApply() {
    var birthday = "";
    $.mobile.showPageLoadingMsg();
    birthday = $('#birthday_dp_ap').val();
    if ($("#receiveno_dp_ap").val() === "" || $("#cname_dp_ap").val() === "" || $("#birthday_dp_ap").val() === "" || $("#email_dp_ap").val() === "") {
        navigator.notification.alert("請填入出入境許可證號、中文姓名、出生日期、email等必填欄位", null, "請填入必填欄位", "確認");
        $.mobile.hidePageLoadingMsg();
        return;
    }
    $.ajax({
        url: servicesURL.durationProgressApply,
        type: 'POST',
        dataType: 'html',
        data: { userid: $("#receiveno_dp_ap").val(), cname: $("#cname_dp_ap").val(), birthday: $("#birthday_dp_ap").val(), email: $("#email_dp_ap").val(), telephone: $("#tel_dp_ap").val(), fax: $("#fax_dp_ap").val() },
        timeout: System.globalTimeout,
        beforeSend: function () {
            DebugLog('before query progress');
        },
        error: function (jqx, status, error) {
            //		    
        },
        success: function (html) {
            console.log(html);
        },
        complete: function (jqx, textStatus) {
            DebugLog('complete:' + textStatus);
            if (textStatus == 'success') {
                $.mobile.hidePageLoadingMsg();
                $('#applyForm').hide();
                $('#durationProgressApplyContent').html('<li>該入出境許可證號已經在本系統登記查詢</li>');
                $('#durationProgressApplyContent').listview('refresh');
                $(document).scrollTop($(document).height());
            } else if (textStatus == 'error') {
                $.mobile.hidePageLoadingMsg();
                showServiceError();
            } else if (textStatus == 'timeout') {
                $.mobile.hidePageLoadingMsg();
                showServiceError();
            }
        }
    });
}

function parseDurationProgressXml(htmlDoc) {
    if (htmlDoc.indexOf('<table class="Tbdata1">') !== -1) {
        var tableXml, result = "", lihtml = "";
        result = htmlDoc.substring(htmlDoc.indexOf('<table class="Tbdata1">'), htmlDoc.indexOf('</table>') + 8);
        console.log(result);
        $('#hidden_duration').html(result).hide();
        $('#hidden_duration table tr').each(function (i) {
            var colName = $(this).children("td").eq(0).children("li").text();
            var colValue = $(this).children("td").eq(1).children("font").text();
            lihtml = lihtml + "<li>" + colName + colValue + "</li>";
        });

        $('#durationProgressQueryContent').html(lihtml);
        $('#durationProgressQueryContent').listview('refresh');
    } else {
        $('#durationProgressQueryContent').html('<li>查無資料</li>');
        $('#durationProgressQueryContent').listview('refresh');
    }
    $(document).scrollTop($(document).height());
    $.mobile.hidePageLoadingMsg();
}

function getDurationProgressResult() {
    console.log(JSON.stringify(window.history));
    var birthday = "";
    $.mobile.showPageLoadingMsg();
    birthday = $('#birthday_dp').val().replace(/\//g, "");
    if ($('#receiveno_dp').val() === "" || birthday === "") {
        navigator.notification.alert("請填入出入境許可證號、出生日期等必填欄位", null, "請填入必填欄位", "確認");
        $.mobile.hidePageLoadingMsg();
        return;
    }
    $.ajax({
        url: servicesURL.durationProgress + '&receiveno=' + $('#receiveno_dp').val() + '&birthday=' + birthday,
        type: 'GET',
        dataType: 'html',
        timeout: System.globalTimeout,
        beforeSend: function () {
            DebugLog('before query progress');
        },
        error: function (jqx, status, error) {
            //		    
        },
        success: function (html) {
            //Wei 當回傳內容包括"系統無法判斷您的資料或您的案件需要人工核算"時，導至申請表單頁面
            if (html.indexOf('系統無法判斷您的資料或您的案件需要人工核算') !== -1) {
                receivenoApply = $('#receiveno_dp').val();
                birthdayApply = $('#birthday_dp').val();
                $.mobile.hidePageLoadingMsg();
                console.log(JSON.stringify(window.history));
                switchPage("#durationProgressApply");
                //return;
            } else {
                parseDurationProgressXml(html);
            }
        },
        complete: function (jqx, textStatus) {
            DebugLog('complete:' + textStatus);
            if (textStatus == 'success') {
                console.log(JSON.stringify(jqx));
            } else if (textStatus == 'error') {
                $.mobile.hidePageLoadingMsg();
                showServiceError();
            } else if (textStatus == 'timeout') {
                $.mobile.hidePageLoadingMsg();
                showServiceError();
            }
        }
    });
}

function switchPage(toPage)
{
    currentPage = toPage.replace('#', '');
    nowPage = toPage;
    $.mobile.changePage(toPage, {});
}

function showDemonList(ctNode) {
    demonListCtnode = ctNode;
    demonLPTitle = getDemonLPTitle(ctNode);
    $('#demonCtNode').val(ctNode);
    switchPage('#demonList');
}

function backToDemonList() {
    showDemonList($('#demonCtNode').val());
}

function showInfoContent(htmlName, parentHtml, title) {
    infoContentHtmlName = htmlName;
    infoParentHtml = parentHtml;
    infoCPTitle = title;
    switchPage('#infoContent');
}

function backToInfoContent() {
    switchPage('#' + infoParentHtml);
}
//依據ctnode取得業務小精靈LP頁的title
function getDemonLPTitle(ctNode) {
    var title;

    switch (ctNode) {
        case "32594":
            title = "臺灣地區人民";
            break;
        case "32595":
            title = "大陸地區人民";
            break;
        case "32596":
            title = "無戶籍國民";
            break;
        case "32597":
            title = "港澳居民";
            break;
        case "32598":
            title = "外籍人士";
            break;
        case "32599":
            title = "小三通";
            break;
        case "32600":
            title = "入出國日期證明";
            break;
        case "32601":
            title = "其他服務";
            break;
        default:
            title = "申請須知";
            break;
    }

    return title;
}

function backToMediaList() {
    //    $('#mediaContainer').empty();
    switchPage('#mediaList');
}

function DebugLog(text) {
    if (System.debuggable) {
        console.log("[DEBUG] " + text);
    }
}

function ErrorLog(text) {
    console.log("[ERROR][" + new Date().toString() + "] " + text);
}

function prepareStationDetail() {
    $.mobile.showPageLoadingMsg();
    var sUrl = servicesURL.stationServiceSpot;
    var sHeader = "各區服務站";
    switch (stationType) {
        case '29682':
            sUrl = servicesURL.stationServiceSpot;
            sHeader = "各區服務站";
            break;
        case '29683':
            sUrl = servicesURL.stationSpecialTeam;
            sHeader = "各區專勤隊";
            break;
        case '29684':
            sUrl = servicesURL.stationNationTeam;
            sHeader = "各區國境隊";
            break;
        case '29685':
            sUrl = servicesURL.stationShelter;
            sHeader = "各區收容所";
            break;
        default:
            sUrl = servicesURL.stationServiceSpot;
            sHeader = "各區服務站";
            break;
    }
    $('#stationDetailHeader').text(sHeader);
    $.ajax({
        url: sUrl,
        type: 'GET',
        dataType: 'xml',
        timeout: System.globalTimeout,
        beforeSend: function () {
            DebugLog('before get station second list');
        },
        error: function () {
            ErrorLog('get station second list ERROR');
        },
        success: function (xml) {
            DebugLog('get station second list success');
            DebugLog('from sURL:' + sUrl);
        },
        complete: function (jqx, textStatus) {
            if (textStatus == 'success') {
                var xmlDoc = jqx.responseXML;
                setOfflineXml(sUrl, jqx.responseText);
                parseStationDetailXml(xmlDoc);
            } else if (textStatus == 'timeout' || textStatus == 'error') {
                $.mobile.hidePageLoadingMsg();
                var xml = getOfflineXml(sUrl);
                if(xml !== null){
                	parseStationDetailXml(xml);
                }else{
                	showServiceError();
                }
            }
        }
    });
}

function changeStationDetail(type) {
    stationType = type;
    prepareStationDetail();
}

//用瀏覽器視窗開啟url
function openOutside(url) {
    if (isAndroid) {
        navigator.app.loadUrl(url, { openExternal: true });
        // window.plugins.childBrowser.showWebPage(url);
    } else {
        window.location.href = url;
    }
    //navigator.notification.alert(Message.DeviceNotSupport, null);
}

function openYoutube(url) {
    if (isAndroid) {
        navigator.app.loadUrl(url, { openExternal: true });
        // window.plugins.videoPlayer.play(url);
    } else {
        window.location.href = url;
    }
    // navigator.notification.alert(Message.DeviceNotSupport, null);
}

//util notification for calling service/ajax
function showServiceError() {
    navigator.notification.alert(Message.ServiceUnavailable, null, "訊息");
}

function detectLocChange(url) {
    if (url != socialUrl) {
        window.plugins.childBrowser.close();
    }
}

function postFacebook() {
    //var socialUrl = "http://m.facebook.com/sharer.php?u=" + encodeURIComponent(fbUrl);
    var socialUrl = "http://www.facebook.com/sharer/sharer.php?m2w&next=/home.php&u=" + encodeURIComponent(fbUrl);
    var cb = window.plugins.childBrowser;
    cb.onLocationChange = function (loc) {
        console.log("location changed to: " + loc);
        if (loc.indexOf("http://www.facebook.com/home.php") != -1) {
            //navigator.notification.alert("分享成功!", null, "Facebook", "好");
            cb.close();
        }
    };
    cb.showWebPage(socialUrl);
}

function postPlurk() {
    var pUrl = "http://www.plurk.com/m/?qualifier=shares&content=" + encodeURIComponent(fbUrl);
    var cb = window.plugins.childBrowser;
    var lastUrl = pUrl;
    var openagain = false;
    cb.onLocationChange = function (loc) {
        console.log("new loc: " + loc);
        if (loc === "http://www.plurk.com/m/t") {
            navigator.notification.alert("請先登入!", null, "Plurk", "好");
            lastUrl = loc;
            if (isAndroid) {
                console.log("need login");
                //} else if (isIphone) {
            } else {
                cb.getPage("http://www.plurk.com/m/login");
            }
        }
        if (loc === "http://www.plurk.com/m/") {
            if (lastUrl === "http://www.plurk.com/m/login") {
                lastUrl = loc;
                if (isAndroid) {
                    openagain = true;
                    cb.close();
                    //} else if (isIphone) {
                } else {
                    cb.getPage(pUrl);
                }
            } else {
                //navigator.notification.alert("分享成功!", null, "Plurk", "好");
                cb.close();
            }
        }
        lastUrl = loc;
    };

    cb.onClose = function () {
        if (openagain) {
            openagain = false;
            cb.showWebPage(pUrl);
        }
    };

    cb.showWebPage(pUrl);
}

function postTweet() {
    var tUrl = "https://twitter.com/intent/tweet?original_referer=" + encodeURIComponent(fbUrl) +
    "&source=tweetbutton&text=" + encodeURIComponent(fbTitle) + "&url=" + encodeURIComponent(fbUrl);
    var cb = window.plugins.childBrowser;
    cb.onLocationChange = function (loc) {
        if (loc.indexOf("https://twitter.com/intent/tweet/complete?") != -1) {
            //navigator.notification.alert("分享成功!", null, "Twitter", "好");
            cb.close();
        }
    };
    cb.showWebPage(tUrl);
}

function openDemon() {
    var cb = window.plugins.childBrowser;
    cb.openExternal('http://dl.dropbox.com/u/19304934/0910/mp.htm');
}

// 以下 2012/12/11 新增 by Terry
// Footer選單
function getFooterMenu(unit) {
    var img_demon, img_media, img_news, img_station, img_menu;
    if (unit == 'demon')
        img_demon = '01_over.png';
    else
        img_demon = '01.png';
    if (unit == 'media')
        img_media = '02_over.png';
    else
        img_media = '02.png';
    if (unit == 'news')
        img_news = '03_over.png';
    else
        img_news = '03.png';
    if (unit == 'station')
        img_station = '04_over.png';
    else
        img_station = '04.png';
    if (unit != 'demon' && unit != 'media' && unit != 'news' && unit != 'station')
        img_menu = '05_over.png';
    else
        img_menu = '05.png';
    document.write('<div class="ui-grid-d"><div class="ui-block-a">');
    document.write('<img src="images/footer/' + img_demon + '" onclick="javascript:switchPage(\'#demon\');" class="footerIcon" />');
    document.write('</div><div class="ui-block-b">');
    document.write('<img src="images/footer/' + img_media + '" onclick="javascript:switchPage(\'#mediaList\');" class="footerIcon" />');
    document.write('</div><div class="ui-block-c">');
    document.write('<img src="images/footer/' + img_news + '" onclick="javascript:switchPage(\'#news\');" class="footerIcon" />');
    document.write('</div><div class="ui-block-d">');
    document.write('<img src="images/footer/' + img_station + '" onclick="javascript:switchPage(\'#stationDetail\');" class="footerIcon" />');
    document.write('</div><div class="ui-block-e">');
    document.write('<img src="images/footer/' + img_menu + '" onclick="javascript:switchPage(\'#menu\');" class="footerIcon" />');
    document.write('</div></div>');
}

// 以裝置預設的瀏覽器開啟網址
function openUrl(url) {
    DebugLog('openUrl: ' + url);
    if (isAndroid)
        navigator.app.loadUrl(url, { openExternal: true });
    else
        window.location.href = url;
}

// 練功坊
var correct; // 答題結果
var qid; // 顯示題目代碼
var qType; // 題型
var arrAns1, arrAns2, arrAns3, arrAns4, arrAns5, arrAns6, arrAns7, arrAns8, arrAns9, arrAns10, arrAns11, arrAns12, arrAns13, arrAns14, arrAns15, arrAns16, arrAns17; // 可選題目編號Array，每隨機取得題目編號後，從Array移除

// 練功坊 - 移民法規
function getQuestion1() {
    // 初始題目編號Array，設置網頁Header
    if (qType != '1') {
        qType = '1';
        arrAns1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '140', '141', '142', '143', '144', '145', '146', '147', '148', '149', '150'];
        $('#exam-title').html('移民法規');
    }

    // 先檢查是否還有可選題目編號，若沒有則詢問是否重新測驗：將可選題目編號Array設回初始
    if (arrAns1.length == 0) {
        if (confirm('您已答完此題庫所有問題，是否重新測驗？')) {
            arrAns1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '140', '141', '142', '143', '144', '145', '146', '147', '148', '149', '150'];
            getQuestion();
        } else {
            history.back();
            return false;
        }
    }

    // 載入中
    $.mobile.showPageLoadingMsg();

    // 亂數取一個位置介於 0 到 arrAns.length - 1
    var n = Math.floor(Math.random() * arrAns1.length);
    qid = arrAns1[n]; // 取得題目編號
    arrAns1.splice(n, 1); // 將剛剛取得的題目編號從arrAns移除

    getQuestionXml('xml/exam1.xml');
}

// 練功坊 - 法學知識與英文
function getQuestion2() {
    // 初始題目編號Array，設置網頁Header
    if (qType != '2') {
        qType = '2';
        arrAns2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '140', '141', '142', '143', '144', '145', '146', '147', '148', '149', '150', '151', '152'];
        $('#exam-title').html('法學知識與英文');
    }

    // 先檢查是否還有可選題目編號，若沒有則詢問是否重新測驗：將可選題目編號Array設回初始
    if (arrAns2.length == 0) {
        if (confirm('您已答完此題庫所有問題，是否重新測驗？')) {
            arrAns2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '140', '141', '142', '143', '144', '145', '146', '147', '148', '149', '150', '151', '152'];
            getQuestion();
        } else {
            history.back();
            return false;
        }
    }

    // 載入中
    $.mobile.showPageLoadingMsg();

    // 亂數取一個位置介於 0 到 arrAns.length - 1
    var n = Math.floor(Math.random() * arrAns2.length);
    qid = arrAns2[n]; // 取得題目編號
    arrAns2.splice(n, 1); // 將剛剛取得的題目編號從arrAns移除

    getQuestionXml('xml/exam2.xml');
}

// 練功坊 - 國文
function getQuestion3() {
    // 初始題目編號Array，設置網頁Header
    if (qType != '3') {
        qType = '3';
        arrAns3 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'];
        $('#exam-title').html('國文');
    }

    // 先檢查是否還有可選題目編號，若沒有則詢問是否重新測驗：將可選題目編號Array設回初始
    if (arrAns3.length == 0) {
        if (confirm('您已答完此題庫所有問題，是否重新測驗？')) {
            arrAns3 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'];
            getQuestion();
        } else {
            history.back();
            return false;
        }
    }

    // 載入中
    $.mobile.showPageLoadingMsg();

    // 亂數取一個位置介於 0 到 arrAns.length - 1
    var n = Math.floor(Math.random() * arrAns3.length);
    qid = arrAns3[n]; // 取得題目編號
    arrAns3.splice(n, 1); // 將剛剛取得的題目編號從arrAns移除

    getQuestionXml('xml/exam3.xml');
}

// 練功坊 - 行政法與刑事訴訟法
function getQuestion4() {
    // 初始題目編號Array，設置網頁Header
    if (qType != '4') {
        qType = '4';
        arrAns4 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'];
        $('#exam-title').html('行政法與刑事訴訟法');
    }

    // 先檢查是否還有可選題目編號，若沒有則詢問是否重新測驗：將可選題目編號Array設回初始
    if (arrAns4.length == 0) {
        if (confirm('您已答完此題庫所有問題，是否重新測驗？')) {
            arrAns4 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'];
            getQuestion();
        } else {
            history.back();
            return false;
        }
    }

    // 載入中
    $.mobile.showPageLoadingMsg();

    // 亂數取一個位置介於 0 到 arrAns.length - 1
    var n = Math.floor(Math.random() * arrAns4.length);
    qid = arrAns4[n]; // 取得題目編號
    arrAns4.splice(n, 1); // 將剛剛取得的題目編號從arrAns移除

    getQuestionXml('xml/exam4.xml');
}

// 練功坊 - 國際公法與移民政策
function getQuestion5() {
    // 初始題目編號Array，設置網頁Header
    if (qType != '5') {
        qType = '5';
        arrAns5 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'];
        $('#exam-title').html('國際公法與移民政策');
    }

    // 先檢查是否還有可選題目編號，若沒有則詢問是否重新測驗：將可選題目編號Array設回初始
    if (arrAns5.length == 0) {
        if (confirm('您已答完此題庫所有問題，是否重新測驗？')) {
            arrAns5 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'];
            getQuestion();
        } else {
            history.back();
            return false;
        }
    }

    // 載入中
    $.mobile.showPageLoadingMsg();

    // 亂數取一個位置介於 0 到 arrAns.length - 1
    var n = Math.floor(Math.random() * arrAns5.length);
    qid = arrAns5[n]; // 取得題目編號
    arrAns5.splice(n, 1); // 將剛剛取得的題目編號從arrAns移除

    getQuestionXml('xml/exam5.xml');
}

// 練功坊 - 國土安全與國境執法概要
function getQuestion6() {
    // 初始題目編號Array，設置網頁Header
    if (qType != '6') {
        qType = '6';
        arrAns6 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50'];
        $('#exam-title').html('國土安全與國境執法概要');
    }

    // 先檢查是否還有可選題目編號，若沒有則詢問是否重新測驗：將可選題目編號Array設回初始
    if (arrAns6.length == 0) {
        if (confirm('您已答完此題庫所有問題，是否重新測驗？')) {
            arrAns6 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50'];
            getQuestion();
        } else {
            history.back();
            return false;
        }
    }

    // 載入中
    $.mobile.showPageLoadingMsg();

    // 亂數取一個位置介於 0 到 arrAns.length - 1
    var n = Math.floor(Math.random() * arrAns6.length);
    qid = arrAns6[n]; // 取得題目編號
    arrAns6.splice(n, 1); // 將剛剛取得的題目編號從arrAns移除

    getQuestionXml('xml/exam6.xml');
}

// 練功坊 - 外國文 - 越南文
function getQuestion7() {
    // 初始題目編號Array，設置網頁Header
    if (qType != '7') {
        qType = '7';
        arrAns7 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
        $('#exam-title').html('越南文');
    }

    // 先檢查是否還有可選題目編號，若沒有則詢問是否重新測驗：將可選題目編號Array設回初始
    if (arrAns7.length == 0) {
        if (confirm('您已答完此題庫所有問題，是否重新測驗？')) {
            arrAns7 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
            getQuestion();
        } else {
            history.back();
            return false;
        }
    }

    // 載入中
    $.mobile.showPageLoadingMsg();

    // 亂數取一個位置介於 0 到 arrAns.length - 1
    var n = Math.floor(Math.random() * arrAns7.length);
    qid = arrAns7[n]; // 取得題目編號
    arrAns7.splice(n, 1); // 將剛剛取得的題目編號從arrAns移除

    getQuestionXml('xml/exam7.xml');
}

// 練功坊 - 外國文 - 泰文
function getQuestion8() {
    // 初始題目編號Array，設置網頁Header
    if (qType != '8') {
        qType = '8';
        arrAns8 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
        $('#exam-title').html('泰文');
    }

    // 先檢查是否還有可選題目編號，若沒有則詢問是否重新測驗：將可選題目編號Array設回初始
    if (arrAns8.length == 0) {
        if (confirm('您已答完此題庫所有問題，是否重新測驗？')) {
            arrAns8 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
            getQuestion();
        } else {
            history.back();
            return false;
        }
    }

    // 載入中
    $.mobile.showPageLoadingMsg();

    // 亂數取一個位置介於 0 到 arrAns.length - 1
    var n = Math.floor(Math.random() * arrAns8.length);
    qid = arrAns8[n]; // 取得題目編號
    arrAns8.splice(n, 1); // 將剛剛取得的題目編號從arrAns移除

    getQuestionXml('xml/exam7.xml');
}

// 練功坊 - 外國文 - 印尼文
function getQuestion9() {
    // 初始題目編號Array，設置網頁Header
    if (qType != '9') {
        qType = '9';
        arrAns9 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
        $('#exam-title').html('印尼文');
    }

    // 先檢查是否還有可選題目編號，若沒有則詢問是否重新測驗：將可選題目編號Array設回初始
    if (arrAns9.length == 0) {
        if (confirm('您已答完此題庫所有問題，是否重新測驗？')) {
            arrAns9 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
            getQuestion();
        } else {
            history.back();
            return false;
        }
    }

    // 載入中
    $.mobile.showPageLoadingMsg();

    // 亂數取一個位置介於 0 到 arrAns.length - 1
    var n = Math.floor(Math.random() * arrAns9.length);
    qid = arrAns9[n]; // 取得題目編號
    arrAns9.splice(n, 1); // 將剛剛取得的題目編號從arrAns移除

    getQuestionXml('xml/exam7.xml');
}

// 練功坊 - 外國文 - 英文
function getQuestion10() {
    // 初始題目編號Array，設置網頁Header
    if (qType != '10') {
        qType = '10';
        arrAns10 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
        $('#exam-title').html('英文');
    }

    // 先檢查是否還有可選題目編號，若沒有則詢問是否重新測驗：將可選題目編號Array設回初始
    if (arrAns10.length == 0) {
        if (confirm('您已答完此題庫所有問題，是否重新測驗？')) {
            arrAns10 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
            getQuestion();
        } else {
            history.back();
            return false;
        }
    }

    // 載入中
    $.mobile.showPageLoadingMsg();

    // 亂數取一個位置介於 0 到 arrAns.length - 1
    var n = Math.floor(Math.random() * arrAns10.length);
    qid = arrAns10[n]; // 取得題目編號
    arrAns10.splice(n, 1); // 將剛剛取得的題目編號從arrAns移除

    getQuestionXml('xml/exam7.xml');
}

// 練功坊 - 外國文 - 日文
function getQuestion11() {
    // 初始題目編號Array，設置網頁Header
    if (qType != '11') {
        qType = '11';
        arrAns11 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
        $('#exam-title').html('日文');
    }

    // 先檢查是否還有可選題目編號，若沒有則詢問是否重新測驗：將可選題目編號Array設回初始
    if (arrAns11.length == 0) {
        if (confirm('您已答完此題庫所有問題，是否重新測驗？')) {
            arrAns11 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
            getQuestion();
        } else {
            history.back();
            return false;
        }
    }

    // 載入中
    $.mobile.showPageLoadingMsg();

    // 亂數取一個位置介於 0 到 arrAns.length - 1
    var n = Math.floor(Math.random() * arrAns11.length);
    qid = arrAns11[n]; // 取得題目編號
    arrAns11.splice(n, 1); // 將剛剛取得的題目編號從arrAns移除

    getQuestionXml('xml/exam7.xml');
}

// 練功坊 - 外國文 - 韓文
function getQuestion12() {
    // 初始題目編號Array，設置網頁Header
    if (qType != '12') {
        qType = '12';
        arrAns12 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
        $('#exam-title').html('韓文');
    }

    // 先檢查是否還有可選題目編號，若沒有則詢問是否重新測驗：將可選題目編號Array設回初始
    if (arrAns12.length == 0) {
        if (confirm('您已答完此題庫所有問題，是否重新測驗？')) {
            arrAns12 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
            getQuestion();
        } else {
            history.back();
            return false;
        }
    }

    // 載入中
    $.mobile.showPageLoadingMsg();

    // 亂數取一個位置介於 0 到 arrAns.length - 1
    var n = Math.floor(Math.random() * arrAns12.length);
    qid = arrAns12[n]; // 取得題目編號
    arrAns12.splice(n, 1); // 將剛剛取得的題目編號從arrAns移除

    getQuestionXml('xml/exam7.xml');
}

// 練功坊 - 外國文 - 法文
function getQuestion13() {
    // 初始題目編號Array，設置網頁Header
    if (qType != '13') {
        qType = '13';
        arrAns13 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
        $('#exam-title').html('法文');
    }

    // 先檢查是否還有可選題目編號，若沒有則詢問是否重新測驗：將可選題目編號Array設回初始
    if (arrAns13.length == 0) {
        if (confirm('您已答完此題庫所有問題，是否重新測驗？')) {
            arrAns13 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
            getQuestion();
        } else {
            history.back();
            return false;
        }
    }

    // 載入中
    $.mobile.showPageLoadingMsg();

    // 亂數取一個位置介於 0 到 arrAns.length - 1
    var n = Math.floor(Math.random() * arrAns13.length);
    qid = arrAns13[n]; // 取得題目編號
    arrAns13.splice(n, 1); // 將剛剛取得的題目編號從arrAns移除

    getQuestionXml('xml/exam7.xml');
}

// 練功坊 - 外國文 - 德文
function getQuestion14() {
    // 初始題目編號Array，設置網頁Header
    if (qType != '14') {
        qType = '14';
        arrAns14 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
        $('#exam-title').html('德文');
    }

    // 先檢查是否還有可選題目編號，若沒有則詢問是否重新測驗：將可選題目編號Array設回初始
    if (arrAns14.length == 0) {
        if (confirm('您已答完此題庫所有問題，是否重新測驗？')) {
            arrAns14 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
            getQuestion();
        } else {
            history.back();
            return false;
        }
    }

    // 載入中
    $.mobile.showPageLoadingMsg();

    // 亂數取一個位置介於 0 到 arrAns.length - 1
    var n = Math.floor(Math.random() * arrAns14.length);
    qid = arrAns14[n]; // 取得題目編號
    arrAns14.splice(n, 1); // 將剛剛取得的題目編號從arrAns移除

    getQuestionXml('xml/exam7.xml');
}

// 練功坊 - 外國文 - 西班牙文
function getQuestion15() {
    // 初始題目編號Array，設置網頁Header
    if (qType != '15') {
        qType = '15';
        arrAns15 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
        $('#exam-title').html('西班牙文');
    }

    // 先檢查是否還有可選題目編號，若沒有則詢問是否重新測驗：將可選題目編號Array設回初始
    if (arrAns15.length == 0) {
        if (confirm('您已答完此題庫所有問題，是否重新測驗？')) {
            arrAns15 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
            getQuestion();
        } else {
            history.back();
            return false;
        }
    }

    // 載入中
    $.mobile.showPageLoadingMsg();

    // 亂數取一個位置介於 0 到 arrAns.length - 1
    var n = Math.floor(Math.random() * arrAns15.length);
    qid = arrAns15[n]; // 取得題目編號
    arrAns15.splice(n, 1); // 將剛剛取得的題目編號從arrAns移除

    getQuestionXml('xml/exam7.xml');
}

// 練功坊 - 外國文 - 葡萄牙文
function getQuestion16() {
    // 初始題目編號Array，設置網頁Header
    if (qType != '16') {
        qType = '16';
        arrAns16 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
        $('#exam-title').html('葡萄牙文');
    }

    // 先檢查是否還有可選題目編號，若沒有則詢問是否重新測驗：將可選題目編號Array設回初始
    if (arrAns16.length == 0) {
        if (confirm('您已答完此題庫所有問題，是否重新測驗？')) {
            arrAns16 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
            getQuestion();
        } else {
            history.back();
            return false;
        }
    }

    // 載入中
    $.mobile.showPageLoadingMsg();

    // 亂數取一個位置介於 0 到 arrAns.length - 1
    var n = Math.floor(Math.random() * arrAns16.length);
    qid = arrAns16[n]; // 取得題目編號
    arrAns16.splice(n, 1); // 將剛剛取得的題目編號從arrAns移除

    getQuestionXml('xml/exam7.xml');
}

// 練功坊 - 外國文 - 俄文
function getQuestion17() {
    // 初始題目編號Array，設置網頁Header
    if (qType != '17') {
        qType = '17';
        arrAns17 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
        $('#exam-title').html('俄文');
    }

    // 先檢查是否還有可選題目編號，若沒有則詢問是否重新測驗：將可選題目編號Array設回初始
    if (arrAns17.length == 0) {
        if (confirm('您已答完此題庫所有問題，是否重新測驗？')) {
            arrAns17 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'];
            getQuestion();
        } else {
            history.back();
            return false;
        }
    }

    // 載入中
    $.mobile.showPageLoadingMsg();

    // 亂數取一個位置介於 0 到 arrAns.length - 1
    var n = Math.floor(Math.random() * arrAns17.length);
    qid = arrAns17[n]; // 取得題目編號
    arrAns17.splice(n, 1); // 將剛剛取得的題目編號從arrAns移除

    getQuestionXml('xml/exam7.xml');
}

// 取得題目及答案
function getQuestionXml(examXml) {
    $.ajax({
        url: examXml,
        type: 'GET',
        dataType: 'xml',
        timeout: System.globalTimeout,
        beforeSend: function () {
        },
        error: function () {
            ErrorLog('Get Exam Error!');
        },
        success: function (xml) {
            DebugLog('Get Exam Success!');
        },
        complete: function (jqx, textStatus) {
            DebugLog('Get Exam Complete: ' + textStatus);
            if (textStatus == 'success') {
                var xmlDoc = jqx.responseXML;
                setOfflineXml(examXml, jqx.responseText);
                parseExamXml(xmlDoc);
            } else if (textStatus == 'timeout') {
                $.mobile.hidePageLoadingMsg();
                var xml = getOfflineXml(examXml);
                if (xml !== null)
                    parseExamXml(xml);
                else
                    showServiceError();
            } else if (textStatus == 'error') {
                $.mobile.hidePageLoadingMsg();
                var xml = getOfflineXml(examXml);
                if (xml !== null)
                    parseExamXml(xml);
                else
                    showServiceError();
            }
        }
    });
}

// 練功坊 - 下一題
function getQuestion() {
    switch (qType) {
        case '1':
            getQuestion1();
            break;
        case '2':
            getQuestion2();
            break;
        case '3':
            getQuestion3();
            break;
        case '4':
            getQuestion4();
            break;
        case '5':
            getQuestion5();
            break;
        case '6':
            getQuestion6();
            break;
        case '7':
            getQuestion7();
            break;
        case '8':
            getQuestion8();
            break;
        case '9':
            getQuestion9();
            break;
        case '10':
            getQuestion10();
            break;
        case '11':
            getQuestion11();
            break;
        case '12':
            getQuestion12();
            break;
        case '13':
            getQuestion13();
            break;
        case '14':
            getQuestion14();
            break;
        case '15':
            getQuestion15();
            break;
        case '16':
            getQuestion16();
            break;
        case '17':
            getQuestion17();
            break;
    }
}

// 練功坊 - 解析Xml取得題目及答案
function parseExamXml(xmlDoc) {
    // 初始畫面
    $('#question').html('');
    $('#ansTable').html('');
    $('#result').html('');
    $('#memo').html('');

    var question = $(xmlDoc).find('questions question[qid="' + qid + '"]');

    var qname = '';
    switch (qType) {
        case '1':
            if (parseInt(qid) >= 1 && parseInt(qid) <= 25)
                qname = '(101年三等)';
            else if (parseInt(qid) >= 26 && parseInt(qid) <= 75)
                qname = '(101年四等)';
            else if (parseInt(qid) >= 76 && parseInt(qid) <= 100)
                qname = '(102年三等)';
            else if (parseInt(qid) >= 101 && parseInt(qid) <= 150)
                qname = '(102年四等)';
            break;
        case '2':
            if (parseInt(qid) >= 1 && parseInt(qid) <= 36)
                qname = '(101年三等)';
            else if (parseInt(qid) >= 37 && parseInt(qid) <= 74)
                qname = '(101年四等)';
            else if (parseInt(qid) >= 75 && parseInt(qid) <= 115)
                qname = '(102年三等)';
            else if (parseInt(qid) >= 116 && parseInt(qid) <= 152)
                qname = '(102年四等)';
            break;
        case '3':
            if (parseInt(qid) >= 1 && parseInt(qid) <= 6)
                qname = '(101年四等)';
            else if (parseInt(qid) >= 7 && parseInt(qid) <= 16)
                qname = '(102年二等)';
            else if (parseInt(qid) >= 17 && parseInt(qid) <= 26)
                qname = '(102年三等)';
            else if (parseInt(qid) >= 27 && parseInt(qid) <= 36)
                qname = '(102年四等)';
            break;
        case '4':
            if (parseInt(qid) >= 1 && parseInt(qid) <= 25)
                qname = '(101年三等)';
            else if (parseInt(qid) >= 26 && parseInt(qid) <= 50)
                qname = '(101年四等)';
            else if (parseInt(qid) >= 51 && parseInt(qid) <= 75)
                qname = '(102年三等)';
            else if (parseInt(qid) >= 76 && parseInt(qid) <= 100)
                qname = '(102年四等)';
            break;
        case '5':
            if (parseInt(qid) >= 1 && parseInt(qid) <= 25)
                qname = '(101年三等)';
            else if (parseInt(qid) >= 26 && parseInt(qid) <= 50)
                qname = '(101年四等)';
            else if (parseInt(qid) >= 51 && parseInt(qid) <= 75)
                qname = '(102年三等)';
            else if (parseInt(qid) >= 76 && parseInt(qid) <= 100)
                qname = '(102年四等)';
            break;
        case '6':
            if (parseInt(qid) >= 1 && parseInt(qid) <= 25)
                qname = '(101年四等)';
            else if (parseInt(qid) >= 26 && parseInt(qid) <= 50)
                qname = '(102年四等)';
            break;
        case '7':
            if (parseInt(qid) >= 1 && parseInt(qid) <= 20)
                qname = '(101年三等)';
            else if (parseInt(qid) >= 21 && parseInt(qid) <= 35)
                qname = '(102年三等)';
            break;
        case '8':
            if (parseInt(qid) >= 1 && parseInt(qid) <= 20)
                qname = '(101年三等)';
            else if (parseInt(qid) >= 21 && parseInt(qid) <= 35)
                qname = '(102年三等)';
            break;
        case '9':
            if (parseInt(qid) >= 1 && parseInt(qid) <= 20)
                qname = '(101年三等)';
            else if (parseInt(qid) >= 21 && parseInt(qid) <= 35)
                qname = '(102年三等)';
            break;
        case '10':
            if (parseInt(qid) >= 1 && parseInt(qid) <= 20)
                qname = '(101年三等)';
            else if (parseInt(qid) >= 21 && parseInt(qid) <= 35)
                qname = '(102年三等)';
            break;
        case '11':
            if (parseInt(qid) >= 1 && parseInt(qid) <= 20)
                qname = '(101年三等)';
            else if (parseInt(qid) >= 21 && parseInt(qid) <= 35)
                qname = '(102年三等)';
            break;
        case '12':
            if (parseInt(qid) >= 1 && parseInt(qid) <= 20)
                qname = '(101年三等)';
            else if (parseInt(qid) >= 21 && parseInt(qid) <= 35)
                qname = '(102年三等)';
            break;
        case '13':
            if (parseInt(qid) >= 1 && parseInt(qid) <= 20)
                qname = '(101年三等)';
            else if (parseInt(qid) >= 21 && parseInt(qid) <= 35)
                qname = '(102年三等)';
            break;
        case '14':
            if (parseInt(qid) >= 1 && parseInt(qid) <= 20)
                qname = '(101年三等)';
            else if (parseInt(qid) >= 21 && parseInt(qid) <= 35)
                qname = '(102年三等)';
            break;
        case '15':
            if (parseInt(qid) >= 1 && parseInt(qid) <= 20)
                qname = '(101年三等)';
            else if (parseInt(qid) >= 21 && parseInt(qid) <= 35)
                qname = '(102年三等)';
            break;
        case '16':
            if (parseInt(qid) >= 1 && parseInt(qid) <= 20)
                qname = '(101年三等)';
            else if (parseInt(qid) >= 21 && parseInt(qid) <= 35)
                qname = '(102年三等)';
            break;
        case '17':
            if (parseInt(qid) >= 1 && parseInt(qid) <= 20)
                qname = '(101年三等)';
            else if (parseInt(qid) >= 21 && parseInt(qid) <= 35)
                qname = '(102年三等)';
            break;
    }

    // 題目
    var topic = question.find('topic').text();
    for (i = 0; i < 10; i++) {
        topic = topic.replace('[br]', '<br>');
    }
    if (topic.indexOf('##') > 0) {
        $('#question').html(topic.splice('##')[0] + qname);
        $('#memo').html(topic.splice('##')[1]);
    } else
        $('#question').html(topic + qname);

    // 答案
    var answers = question.find('answerlist answer');
    var aid, ans, answer;
    z = 0;
    $(answers).each(function (i) {
        z += 1;
        if (z <= 4) {
            aid = $(this).attr('aid');
            ans = $(this).find('ans').text();
            answer = $(this).find('txt').text();
            if (ans == '1')
                correct = '您答錯了，正確答案是：<br /><br />' + aid + '. ' + answer;
            if (i % 2 == 0)
                bg = "#FFFFFF";
            else
                bg = "#DDDDDD";
            $('#ansTable').append('<tr style="background-color: ' + bg + ';";><td class="qtd1"><input id="radio' + aid + '" type="radio" name="radio-choice" value="' + ans + '" onclick="ansQuestion(\'' + ans + '\');" /></td><td class="qtd1">' + aid + '. </td><td class="qtd2"><label for="radio' + aid + '" onclick="ansQuestion(\'' + ans + '\');">' + answer + '</label></td></tr>');
        }
    });

    $.mobile.hidePageLoadingMsg();
}

// 練功坊 - 回答
function ansQuestion(ans) {
    if (ans != '1')
        $('#result').html(correct);
    else
        $('#result').html("您答對了！");
}

// 徵才資訊
function getJobsInfo() {
    // 檢查網路連線
    // checkConnection();

    // if (connectionNow) {
    // 載入中
    $.mobile.showPageLoadingMsg();

    // 取得Xml
    $.ajax({
        url: servicesURL.josInfo,
        type: 'GET',
        dataType: 'xml',
        timeout: System.globalTimeout,
        beforeSend: function () {
        },
        error: function () {
            ErrorLog('Get JobsInfo Error!');
        },
        success: function (xml) {
            DebugLog('Get JobsInfo Success!');
        },
        complete: function (jqx, textStatus) {
            DebugLog('Get JobsInfo Complete: ' + textStatus);
            if (textStatus == 'success') {
                var xmlDoc = jqx.responseXML;
                setOfflineXml(servicesURL.josInfo, jqx.responseText);
                parseJobsInfoXml(xmlDoc);
            } else if (textStatus == 'timeout') {
                $.mobile.hidePageLoadingMsg();
                var xml = getOfflineXml(servicesURL.josInfo);
                if(xml !== null){
                	parseJobsInfoXml(xml);
                }else{
                	showServiceError();
                }
            } else if (textStatus == 'error') {
                $.mobile.hidePageLoadingMsg();
                var xml = getOfflineXml(servicesURL.josInfo);
                if(xml !== null){
                	parseJobsInfoXml(xml);
                }else{
                	showServiceError();
                }
            }
        }
    });
    // }
}

// 徵才資訊 - 解析Xml
function parseJobsInfoXml(xmlDoc) {
    $('#jobs-info-listview').html('');

    var articles = $(xmlDoc).find('TopicList Article');
    DebugLog('JobsInfo Length: ' + articles.length);
    $(articles).each(function (i) {
        var stitle = $(this).find('ArticleField > fieldName:contains("stitle")');
        var xpostDate = $(this).find('ArticleField > fieldName:contains("xpostDate")');

        var stitleText = $(stitle).parent().find('Value').text();
        var stitleUrl = $(stitle).parent().find('xURL').text(); // 明細Url
        var xpostDateText = $(xpostDate).parent().find('Value').text(); // 發佈日期

        //var stitleTextDateArea = stitleText.substring(0, 15); // 公告日期區間
        //var stitleTextTitle = stitleText.substring(15); // 職缺 

        if (stitleUrl.substring(0, 4) == 'http')
        {
            //$('#jobs-info-listview').append('<li><a href="#jobs-info-detail" onclick="javascript:getJobsInfoDetail2(\'' + stitleUrl + '\');"><h3 style="white-space: pre-wrap;">' + stitleTextTitle + '</h3><h4>' + stitleTextDateArea + '</h4><h4>發布：' + xpostDateText + '</h4></a></li>');
            $('#jobs-info-listview').append('<li><a href="#jobs-info-detail" onclick="javascript:getJobsInfoDetail2(\'' + stitleUrl + '\');"><h3 style="white-space: pre-wrap;">' + stitleText + '</h3><h4>發布：' + xpostDateText + '</h4></a></li>');
        } else
        {
            //$('#jobs-info-listview').append('<li><a href="#jobs-info-detail" onclick="javascript:getJobsInfoDetail(\'' + stitleUrl + '\');"><h3 style="white-space: pre-wrap;">' + stitleTextTitle + '</h3><h4>' + stitleTextDateArea + '</h4><h4>發布：' + xpostDateText + '</h4></a></li>');
            $('#jobs-info-listview').append('<li><a href="#jobs-info-detail" onclick="javascript:getJobsInfoDetail(\'' + stitleUrl + '\');"><h3 style="white-space: pre-wrap;">' + stitleText + '</h3><h4>發布：' + xpostDateText + '</h4></a></li>');
        }
    });
    $('#jobs-info-listview').listview('refresh');

    $.mobile.hidePageLoadingMsg();
}

// 徵才資訊 - 明細
function getJobsInfoDetail(url) {
    // 檢查網路連線
    checkConnection();

    if (connectionNow) {
        // 載入中
        // $.mobile.showPageLoadingMsg();

        // 取得Xml
        $.ajax({
            url: servicesURL.frontXml + url.replace('ct.asp', 'cp.asp'),
            type: 'GET',
            dataType: 'xml',
            timeout: System.globalTimeout,
            beforeSend: function () {
            },
            error: function () {
                ErrorLog('Get JobsInfoDetail Error!');
            },
            success: function (xml) {
                DebugLog('Get JobsInfoDetail Success!');
            },
            complete: function (jqx, textStatus) {
                DebugLog('Get JobsInfoDetail Complete: ' + textStatus);
                if (textStatus == 'success') {
                    var xmlDoc = jqx.responseXML;
                    setOfflineXml(servicesURL.frontXml + url.replace('ct.asp', 'cp.asp'), jqx.responseText);
                    parseJobsInfoDetailXml(xmlDoc);
                } else if (textStatus == 'timeout') {
                    $.mobile.hidePageLoadingMsg();
                    var xml = getOfflineXml(servicesURL.frontXml + url.replace('ct.asp', 'cp.asp'));
                    if(xml !== null){
                    	parseJobsInfoDetailXml(xml);
                    }else{
                    	showServiceError();
                    }
                } else if (textStatus == 'error') {
                    $.mobile.hidePageLoadingMsg();
                    var xml = getOfflineXml(servicesURL.frontXml + url.replace('ct.asp', 'cp.asp'));
                    if(xml !== null){
                    	parseJobsInfoDetailXml(xml);
                    }else{
                    	showServiceError();
                    }
                }
            }
        });
    } else
        $.mobile.hidePageLoadingMsg();
}

// 徵才資訊 - 明細 - 解析Xml
function parseJobsInfoDetailXml(xmlDoc) {
    var mainArticle = $(xmlDoc).find('MainArticle');

    var stitle = mainArticle.find("MainArticleField > fieldName:contains('stitle')"); // 標題
    var xbody = mainArticle.find("MainArticleField > fieldName:contains('xbody')"); // 內文
    var idept = mainArticle.find("MainArticleField > fieldName:contains('idept')"); // 單位
    var xTel = mainArticle.find("MainArticleField > fieldName:contains('xTel')"); // 連絡電話
    var xpostDate = mainArticle.find("MainArticleField > fieldName:contains('xpostDate')"); // 發布日期
    var dsWatch = mainArticle.find("MainArticleField > fieldName:contains('dsWatch')"); // 更新頻率

    var html = '<h3>' + $(stitle).parent().find("Value").text() + '</h3><p>';
    //html = html + '<img src="images/icon_li01.gif" />' + $(xbody).parent().find("Title").text() + '：' + $(xbody).parent().find("Value").text() + '<br />';
    html = html + '<img src="images/icon_li01.gif" />' + $(idept).parent().find("Title").text() + '：' + $(idept).parent().find("Value").text() + '<br />';
    html = html + '<img src="images/icon_li01.gif" />' + $(xTel).parent().find("Title").text() + '：' + $(xTel).parent().find("Value").text() + '<br />';
    html = html + '<img src="images/icon_li01.gif" />' + $(xpostDate).parent().find("Title").text() + '：' + $(xpostDate).parent().find("Value").text() + '<br />';
    html = html + '<img src="images/icon_li01.gif" />' + $(dsWatch).parent().find("Title").text() + '：' + $(dsWatch).parent().find("Value").text() + '<br />';
    html = html + '</p>';

    html = html + '<p>附件下載：</p>';
    html = html + '<table border="0">';
    var attachment = $(xmlDoc).find('AttachmentList Attachment');
    $(attachment).each(function (i) {
        var fileExt = $(this).find('fileExt').text();
        var fileCaption = $(this).find('Caption').text();
        var fileURL = $(this).find('URL').text();

        html = html + '<tr>';
        if (fileExt == 'doc')
            html = html + '<td style="white-space: nowrap;"><img src="images/icon_word.gif" /></td>';
        else if (fileExt == 'pdf')
            html = html + '<td style="white-space: nowrap;"><img src="images/icon_pdf.gif" /></td>';
        else
            html = html + '<td style="white-space: nowrap;"><img src="images/icon_dl.gif" /></td>';
        html = html + '<td style="width: 100%;"><a href="javascript:openUrl(\'' + servicesURL.frontSite + fileURL + '\')">' + fileCaption + '</a></td>';
        html = html + '</tr>';
    });
    html = html + '</table>';

    $('#jobs-info-detail-content').html(html);

    $.mobile.hidePageLoadingMsg();
}

// 徵才資訊 - 明細
function getJobsInfoDetail2(url) {
    // 檢查網路連線
    checkConnection();

    if (connectionNow) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'text',
            timeout: System.globalTimeout,
            error: function (jqXHR, textStatus, errorThrown) {
                var html = window.localStorage.getItem(url);
                if (typeof (html) != "undefined")
                    $('#jobs-info-detail-content').html(html);
                ErrorLog('getJobsInfoDetail2: ' + textStatus + '\n' + errorThrown);
            },
            success: function (data, textStatus, jqXHR) {
                DebugLog('getJobsInfoDetail2: ' + textStatus);
                var html = '<table border="1" cellspacing="0" cellpadding="2" bordercolor="#000000" style="width: 100%; border-collapse: collapse;">' + data.split('<table class="Tbdata1">')[1].split('</table>')[0].replace('>線上報名<', ' style="display: none;"><').replace('<a href="', '<a href="javascript:openUrl(\'http://www.immigration.gov.tw').replace('.doc">', '.doc\');">').replace('.xls">', '.xls\');">').replace('.pdf">', '.pdf\');">') + '</table>';
                $('#jobs-info-detail-content').html(html);
                setOfflineXml(url, html);
                $.mobile.hidePageLoadingMsg();
            }
        });
    } else
        $.mobile.hidePageLoadingMsg();
}

// 駐臺館處
function getEmbassy() {
    // 載入中
    $.mobile.showPageLoadingMsg();

    // 取得Xml
    $.ajax({
        url: servicesURL.embassy,
        type: 'GET',
        dataType: 'xml',
        timeout: System.globalTimeout,
        beforeSend: function () {
        },
        error: function () {
            ErrorLog('Get Embassy Error!');
        },
        success: function (xml) {
            DebugLog('Get Embassy Success!');
        },
        complete: function (jqx, textStatus) {
            DebugLog('Get Embassy Complete: ' + textStatus);
            if (textStatus == 'success') {
                var xmlDoc = jqx.responseXML;
                setOfflineXml(servicesURL.embassy, jqx.responseText);
                parseEmbassyXml(xmlDoc);
            } else if (textStatus == 'timeout') {
                $.mobile.hidePageLoadingMsg();
                var xml = getOfflineXml(servicesURL.embassy);
                if(xml !== null){
                	parseEmbassyXml(xml);
                }else{
                	showServiceError();
                }
            } else if (textStatus == 'error') {
                $.mobile.hidePageLoadingMsg();
                var xml = getOfflineXml(servicesURL.embassy);
                if(xml !== null){
                	parseEmbassyXml(xml);
                }else{
                	showServiceError();
                }
            }
        }
    });
}

// 駐臺館處 - 解析Xml
function parseEmbassyXml(xmlDoc) {
    $('#embassy-listview').html('');

    var menuCats = $(xmlDoc).find('MenuBar3[myTreeNode="33756"] > MenuCat');
    DebugLog('Embassy Length: ' + menuCats.length);

    $(menuCats).each(function (i) {
        var caption = $(this).find('Caption').text();
        var url = $(this).find('redirectURL').text();

        $('#embassy-listview').append('<li><a href="#embassy-detail" onclick="getEmbassyDetail(\'' + url.replace('amp;amp;', '') + '\');"><h4>' + caption + '</h4></a></li>');
    });
    $('#embassy-listview').listview('refresh');

    $.mobile.hidePageLoadingMsg();
}

// 駐臺館處 - 明細
function getEmbassyDetail(url) {
    $('#embassy-detail-listview').html('');

    // 取得Xml
    var ctCode = getParamFromUrl(url);
    DebugLog('ctCode: ' + ctCode);
    var embassyXml = '';
    embassyXml = 'xml/embassy' + ctCode + '.xml';
    DebugLog('embassyXml: ' + embassyXml);

    $.ajax({
        url: embassyXml,
        type: 'GET',
        dataType: 'xml',
        timeout: System.globalTimeout,
        beforeSend: function () {
        },
        error: function () {
            ErrorLog('Get EmbassyDetail Error!');
        },
        success: function (xml) {
            DebugLog('Get EmbassyDetail Success!');
        },
        complete: function (jqx, textStatus) {
            DebugLog('Get EmbassyDetail Complete: ' + textStatus);
            if (textStatus == 'success') {
                var xmlDoc = jqx.responseXML;
                // setOfflineXml(servicesURL.frontXml + url, jqx.responseText);
                setOfflineXml(embassyXml, jqx.responseText);
                parseEmbassyDetailXml(xmlDoc);
            } else if (textStatus == 'timeout') {
                $.mobile.hidePageLoadingMsg();
                // var xml = getOfflineXml(servicesURL.frontXml + url);
                var xml = getOfflineXml(embassyXml);
                if(xml !== null){
                    parseEmbassyDetailXml(xml);
                }else{
                    showServiceError();
                }
            } else if (textStatus == 'error') {
                $.mobile.hidePageLoadingMsg();
                // var xml = getOfflineXml(servicesURL.frontXml + url);
                var xml = getOfflineXml(embassyXml);
                if(xml !== null){
                    parseEmbassyDetailXml(xml);
                }else{
                    showServiceError();
                }
            }
        }
    });
}

// 駐臺館處 - 明細 - 解析Xml
function parseEmbassyDetailXml(xmlDoc) {
    var articles = $(xmlDoc).find('TopicList Article');
    DebugLog('EmbassyDetail Length: ' + articles.length);
    var country, embassy, address, tel;
    $(articles).each(function (i) {
        var articleFields = $(this).find('ArticleField');
        $(articleFields).each(function (j) {
            switch ($(this).find('fieldName').text()) {
                case 'stitle':
                    country = $(this).find('Value').text();
                    break;
                case 'c2':
                    embassy = $(this).find('Value').text();
                    break;
                case 'xAddress':
                    address = $(this).find('Value').text();
                    break;
                case 'c1':
                    tel = $(this).find('Value').text();
                    break;
            }
        });

        $('#embassy-detail-listview').append('<li><a href="tel:' + tel.replace('-', '') + '" rel="external"><h3 style="white-space: pre-wrap;">' + country + '</h3><h3 style="white-space: pre-wrap;">' + embassy + '</h3><p style="margin-top: 3px; white-space: pre-wrap;">電話：' + tel + '</p><p style="white-space: pre-wrap;">地址：' + address + '</p></a><a href="javascript:showMap(\'' + address + '\');" data-icon=\'map\' data-theme=\'d\'>Map</a></li>');
    });
    $('#embassy-detail-listview').listview('refresh');

    $.mobile.hidePageLoadingMsg();
}

// Header的返回鍵（或其他文字）
function goBack(pageId, txtBack) {
    var fn;
    if (pageId == '')
        fn = 'history.back()';
    else if (pageId == 'InfoCP')
        fn = 'backToInfoContent()';
    else if (pageId == 'demonList')
        fn = 'backToDemonList()';
    else
        fn = 'switchPage(\'#' + pageId + '\')';
    if (txtBack == '')
        txtBack = '返回';
    document.write('<img src="images/icon_back.png" class="img-back" onclick="' + fn + '" />');
    document.write('<span class="span-back" onclick="' + fn + '">' + txtBack + '</span>');
    //if (isAndroid)
    //document.write('<a href="javascript:exitApp();" data-role="button" data-icon="delete" data-iconpos="notext" data-theme="b" data-inline="true" class="ui-btn-right"></a>');
}

function setOfflineXml(key, xmlStr){
	window.localStorage.setItem(key, xmlStr);
	console.log('offline saved!');
}

function getOfflineXml(key){
	var xmlDoc = window.localStorage.getItem(key);
	console.log('offline got!');
	if(xmlDoc !== null){
		return $.parseXML(xmlDoc);
    }else{
    	return null;
    }
}

//從網址中題取參數的值
function getParamFromUrl(url) {
    var str = '';
    var str_value = '';
    if (url.indexOf('?') != -1) {
        var ary = url.split('?')[1].split('&');
        for (var i in ary) {
            str = ary[i].split('=')[0];
            if (str == 'ctNode')
                str_value = decodeURI(ary[i].split('=')[1]);
        }
    }
    return str_value;
}

// 下載題庫
function getExam(qa, path) {
    var url;
    if (qa == 'q')
        url = servicesURL.examPathQ + path + '.pdf';
    else if (qa == 'a')
        url = servicesURL.examPathA + path + '.pdf';
    else if (qa == 'm')
        url = servicesURL.examPathM + path + '.pdf';
    openUrl(url);
}

// 移民特考考情資訊
function getExamInfo() {
    // 檢查網路連線
    // checkConnection();

    // if (connectionNow) {
    // 載入中
    $.mobile.showPageLoadingMsg();

    // 取得Xml
    $.ajax({
        url: servicesURL.examInfo,
        type: 'GET',
        dataType: 'xml',
        timeout: System.globalTimeout,
        beforeSend: function () {
        },
        error: function () {
            ErrorLog('Get ExamInfo Error!');
        },
        success: function (xml) {
            DebugLog('Get ExamInfo Success!');
        },
        complete: function (jqx, textStatus) {
            DebugLog('Get ExamInfo Complete: ' + textStatus);
            if (textStatus == 'success') {
                var xmlDoc = jqx.responseXML;
                setOfflineXml(servicesURL.examInfo, jqx.responseText);
                parseExamInfoXml(xmlDoc);
            } else if (textStatus == 'timeout') {
                $.mobile.hidePageLoadingMsg();
                var xml = getOfflineXml(servicesURL.examInfo);
                if (xml !== null) {
                    parseExamInfoXml(xml);
                } else {
                    showServiceError();
                }
            } else if (textStatus == 'error') {
                $.mobile.hidePageLoadingMsg();
                var xml = getOfflineXml(servicesURL.examInfo);
                if (xml !== null) {
                    parseExamInfoXml(xml);
                } else {
                    showServiceError();
                }
            }
        }
    });
    // }
}

// 移民特考考情資訊 - 解析Xml
function parseExamInfoXml(xmlDoc) {
    $('#exam-info-listview').html('');

    var articles = $(xmlDoc).find('TopicList[xNode="33831"] > Article');
    DebugLog('ExamInfo Length: ' + articles.length);
    $(articles).each(function (i) {
        var caption = $(this).find('Caption').text();
        var postDate = $(this).find('PostDate').text();
        var xUrl = $(this).find('xURL').text();

        $('#exam-info-listview').append('<li><a href="#exam-info-detail" onclick="javascript:getExamInfoDetail(\'' + xUrl + '\');"><h3 style="white-space: pre-wrap;">' + caption + '</h3><h4>' + postDate + '</h4></a></li>');
    });
    $('#exam-info-listview').listview('refresh');

    $.mobile.hidePageLoadingMsg();
}

// 移民特考考情資訊 - 明細
function getExamInfoDetail(url) {
    // 檢查網路連線
    checkConnection();

    if (connectionNow) {
        // 載入中
        // $.mobile.showPageLoadingMsg();

        // 取得Xml
        $.ajax({
            url: servicesURL.frontXml + url.replace('ct.asp', 'cp.asp'),
            type: 'GET',
            dataType: 'xml',
            timeout: System.globalTimeout,
            beforeSend: function () {
            },
            error: function () {
                ErrorLog('Get ExamInfoDetail Error!');
            },
            success: function (xml) {
                DebugLog('Get ExamInfoDetail Success!');
            },
            complete: function (jqx, textStatus) {
                DebugLog('Get ExamInfoDetail Complete: ' + textStatus);
                if (textStatus == 'success') {
                    var xmlDoc = jqx.responseXML;
                    setOfflineXml(servicesURL.frontXml + url.replace('ct.asp', 'cp.asp'), jqx.responseText);
                    parseExamInfoDetailXml(xmlDoc);
                } else if (textStatus == 'timeout') {
                    $.mobile.hidePageLoadingMsg();
                    var xml = getOfflineXml(servicesURL.frontXml + url.replace('ct.asp', 'cp.asp'));
                    if (xml !== null) {
                        parseExamInfoDetailXml(xml);
                    } else {
                        showServiceError();
                    }
                } else if (textStatus == 'error') {
                    $.mobile.hidePageLoadingMsg();
                    var xml = getOfflineXml(servicesURL.frontXml + url.replace('ct.asp', 'cp.asp'));
                    if (xml !== null) {
                        parseExamInfoDetailXml(xml);
                    } else {
                        showServiceError();
                    }
                }
            }
        });
    } else
        $.mobile.hidePageLoadingMsg();
}

// 移民特考考情資訊 - 明細 - 解析Xml
function parseExamInfoDetailXml(xmlDoc) {
    var mainArticle = $(xmlDoc).find('MainArticle');

    var caption = mainArticle.find('Caption').text(); // 標題
    //var content = mainArticle.find('Content').text(); // 內文
    var deptName = mainArticle.find('DeptName').text(); // 發布機關
    var cPostDate = mainArticle.find('cPostDate').text(); // 發布日期

    var html = '<h3>' + caption + '</h3>';
    html = html + '<p><img src="images/icon_li01.gif" />發布機關：' + deptName + '<br />';
    html = html + '<img src="images/icon_li01.gif" />發布日期：' + cPostDate + '</p>';

    html = html + '<p>附件下載：</p>';
    html = html + '<table border="0">';
    var attachment = $(xmlDoc).find('AttachmentList Attachment');
    $(attachment).each(function (i) {
        var fileCaption = $(this).find('Caption').text();
        var fileURL = $(this).find('URL').text();
        var fileExt = $(this).find('fileExt').text();

        html = html + '<tr>';
        if (fileExt == 'doc')
            html = html + '<td style="white-space: nowrap;"><img src="images/icon_word.gif" /></td>';
        else if (fileExt == 'pdf')
            html = html + '<td style="white-space: nowrap;"><img src="images/icon_pdf.gif" /></td>';
        else
            html = html + '<td style="white-space: nowrap;"><img src="images/icon_dl.gif" /></td>';
        html = html + '<td style="width: 100%;"><a href="javascript:openUrl(\'' + servicesURL.frontSite + fileURL + '\')">' + fileCaption + '</a></td>';
        html = html + '</tr>';
    });
    html = html + '</table>';

    $('#exam-info-detail-content').html(html);

    $.mobile.hidePageLoadingMsg();
}

// 多國問候語
var lang;
function getGreetings(l, lname) {
    DebugLog(l + ': ' + lname);
    lang = l;
    $('#greetings-language-title').html(lname);
}

function playGreetings(greetings) {
    if (lang == 'Mongolian' && greetings == 'please') {
        alert('此語言沒有單獨用『請』這個字。');
    } else {
        var mp3 = servicesURL.pathGreetings + lang + '/' + greetings + '.mp3';;
        if (isAndroid)
            mp3 = '/android_asset/www/' + mp3;
        DebugLog('mp3 path: ' + mp3);
        var my_media = new Media(mp3, function () {
            DebugLog('Success');
        }, function (error) {
            DebugLog(error.message);
        });
        my_media.play();
    }
}

function exitApp()
{
    if (confirm('確定離開『移民署APP』？'))
        navigator.app.exitApp();
}

// 2013-08-02 by Terry
// 商務/專業/觀光線上申辦進度查詢
function getCaseInquiryResult() {
    if ($('#receiveNo').val() === '') {
        navigator.notification.alert("請輸入收件號！", null, "請填入必填欄位", "確認");
        return false;
    }

    if ($('#personId').val() === '' && $('#birthDate').val() === '') {
        navigator.notification.alert("身分證字號與生日至少需輸入一項！", null, "請填入必填欄位", "確認");
        return false;
    }

    $.mobile.showPageLoadingMsg();

    $.ajax({
        url: servicesURL.caseInquiry + '?receiveNo=' + $('#receiveNo').val() + '&personId=' + $('#personId').val() + '&birthDate=' + $('#birthDate').val().replace('/', '').replace('/', ''),
        type: 'GET',
        dataType: 'xml',
        timeout: System.globalTimeout,
        beforeSend: function () {
        },
        error: function (jqXHR, textStatus, errorThrown) {
            DebugLog('getCaseInquiryResult ' + textStatus + ': ' + errorThrown);
        },
        success: function (data, textStatus, jqXHR) {
        },
        complete: function (jqXHR, textStatus) {
            DebugLog('getCaseInquiryResult: ' + textStatus);
            if (textStatus == 'success') {
                var xmlDoc = jqXHR.responseXML;
                parseCaseInquiryXml(xmlDoc);
            } else
                $.mobile.hidePageLoadingMsg();
        }
    });
}

function parseCaseInquiryXml(xmlDoc) {
    $('#lstCaseInquiry').html('');

    var applyCase = $(xmlDoc).find('Result ApplyCase');
    DebugLog('applyCase Length: ' + applyCase.length);
    var resultCount = 0;
    $(applyCase).each(function (i) {
        var receiveNo = $(this).find('ReceiveNo').text();
        var currentStatus = $(this).find('CurrentStatus').text();
        var examineRemark = $(this).find('ExamineRemark').text();
        DebugLog('receiveNo: ' + receiveNo);
        DebugLog('currentStatus: ' + currentStatus);
        DebugLog('examineRemark: ' + examineRemark);
        if (receiveNo.length > 0) {
            resultCount += 1;
            var result = '收件號 [' + receiveNo + ']：' + currentStatus;
            if (examineRemark.length > 0)
                result = result + '，' + examineRemark;
            $('#lstCaseInquiry').append('<li>' + result + '</li>');
        }
    });

    $('#lstCaseInquiry').listview('refresh');

    $(document).scrollTop($(document).height());
    $.mobile.hidePageLoadingMsg();

    if (resultCount == 0)
        navigator.notification.alert("無任何資料符合您的查詢！", null, "查詢結果", "確認");
}

var windowWidth = 0;
var windowHeight = 0;
//影音專區的條列目標
var mediaTarget = 'film';//default是影片
//服務據點分類, 預設為32914: 服務站
var stationType = null;
var nowPage;
//業務小精靈的lp ctnode
var demonListCtnode;
//業務小精靈lp頁的title文字
var demonLPTitle;
//
var mediaLink = null;
var mediaTitle = null;
var devicePlatform = "Android";
var isAndroid = false;
var isIphone = false;
//預設環境是有網路連線的
var connectionNow = true;
//最新消息LP頁的cache
var newsLPCache;
//業務小精靈LP頁的cache
var infoLPCache;
//social network分享用
var fbTitle = "";
var fbUrl = "";
var fbSecondTitle = "";
var fbDesc = "";

var hasGeolocation = false;
var currentLongitude = null;
var currentLatitude = null;

function onBodyLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

//計算menu頁各icon需要之位置
function initializeMenu() {
    $("#footerMenu").css("width", windowWidth+"px");
    $(".bg").attr("style", "position:absolute;left:0px;top:0px;width:100%");
    var blankTop = Math.round(windowHeight * 0.4);
    var gridLeft = Math.round(windowWidth * 0.08);
    var gridWidth = Math.round(windowWidth * 0.84);
    
    $("#menuGrid1").css("position", "absolute");
    $("#menuGrid1").css("z-index", "100");
    $("#menuGrid1").css("left", gridLeft + "px");
    $("#menuGrid1").css("top", blankTop + "px");
    $("#menuGrid1").css("width", gridWidth + "px");
    $("#menuGrid1").css("height", Math.round(windowHeight * 0.25) + "px");
    
    blankTop += Math.round(windowHeight * 0.25);
    $("#menuGrid2").css("position", "absolute");
    $("#menuGrid2").css("z-index", "100");
    $("#menuGrid2").css("left", gridLeft + "px");
    $("#menuGrid2").css("top", blankTop + "px");
    $("#menuGrid2").css("width", gridWidth + "px");
    $("#menuGrid2").css("height", Math.round(windowHeight * 0.25) + "px");
    
    //menu icon width必須小於windowWidth之20%
    var menuIconMax = Math.round(windowWidth * 0.28);
    if(menuIcon.defaultWidth > menuIconMax) {
        $(".menuIcon").css("width", menuIconMax + "px");
        $(".menuIcon").css("height", menuIconMax + "px");
    }
    
    //footer icon width必須小於windowWidth之20%
    var footerIconMaxWidth = windowWidth * 0.20;
    if(footerIcon.defaultWidth > footerIconMaxWidth) {
        $(".footerIcon").css("width", footerIconMaxWidth + "px");
        $(".footerIcon").css("height", Math.round(footerIconMaxWidth * footerIcon.heightWidthRatio) + "px");
    }
 }

function getWindow() {
    windowWidth = $(window).width();
    windowHeight = $(window).height();
}

function loadMobileConfig() {
    $.mobile.loadingMessage = "Loading";
    $.mobile.loadingMessageTextVisible = true;
    //$.mobile.defaultPageTransition = 'slide';
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
    stationType = System.stationType_ServiceSpot;
}

function onDeviceReady() {
    checkPlatform();
    loadMobileConfig();
    getWindow();
    $("#homebg").attr("style", "position:absolute;left:0px;top:0px;z-index:100;width:100%;");
    initializeMenu();
    bindPageshowEvents();
    checkConnection();
    if(isIphone){
        ChildBrowser.install();
    }
    setTimeout(function(){switchPage("#menu")}, 2000);
}

function checkConnection() {
    var networkState = navigator.network.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    
    DebugLog("connection type: " + states[networkState]);
    if(networkState == Connection.UNKNOWN || networkState == Connection.NONE || networkState == null) {
        navigator.notification.alert(Message.NoNetwork, null, "No network connection", "OK");
        connectionNow = false;
    } else {
        connectionNow = true;
    }
}

function checkPlatform() {
    devicePlatform = device.platform;
    if(devicePlatform == "Android") {
        isAndroid = true;
    } else if(devicePlatform.substring(0, 6) == "iPhone") {
        isIphone = true;
    }
}

function bindPageshowEvents() {
    $("#menu").live("pageshow", function(event, ui) {
        
    });
    
    //news list
    $("#engNews").live("pageshow", function(event, ui) {
        checkConnection();
      //若有cache, 直接取用cache的值, 然後return - by Wei
    	if(typeof newsLPCache !== "undefined"){
    		$("#engNewsListView").html(newsLPCache);
    	    $("#engNewsListView").listview("refresh");
    	    return;
    	}
        if(connectionNow) {
            $.mobile.showPageLoadingMsg();
            
            $.ajax({
                url: servicesURL.news,
                type: 'GET',
                dataType: 'xml',
                timeout: System.globalTimeout,
                beforeSend: function() {
                    DebugLog('before get news');  
                },
                error: function() {
                    ErrorLog('query news ERROR');
                },
                success: function(xml) {
                    DebugLog('query news success');
                },
                complete: function(jqx, textStatus) {
                    DebugLog('complete:' + textStatus);
                   
                   if(textStatus == 'success') {
                    var xmlDoc = jqx.responseXML;
                    setOfflineXml(servicesURL.news, jqx.responseText);
                    parseNewsXml(xmlDoc);
                   } else if(textStatus == 'timeout') {
                    $.mobile.hidePageLoadingMsg();
                    var xml = getOfflineXml(servicesURL.news);
                    if(xml !== null){
                    	parseNewsXml(xml);
                    }else{
                    	showServiceError();
                    }
                   } else if(textStatus == 'error') {
                    $.mobile.hidePageLoadingMsg();
                    var xml = getOfflineXml(servicesURL.news);
                    if(xml !== null){
                    	parseNewsXml(xml);
                    }else{
                    	showServiceError();
                    }
                   }
                }
            });
        } else {
            
        }
    });
    
    //快速通關進度查詢
	$("#fastProgress").live("pageshow", function(event, ui){
        var prevPage = ui.prevPage;
        if(prevPage.attr('id') === 'menu'){
            //清除之前填的資料
            $('#eng_name_fp').val("");
            $('#birth_date_fp').val("");
            $('#idno_fp').val("");
            $('#passno_fp').val("");
            $('#fastProgressQueryContent').html("");
        }
    });
    
  //application information list
    $("#info").live("pageshow", function(event, ui) {
        checkConnection();
        if(typeof infoLPCache !== "undefined"){
    	    $("#infoListView").html(infoLPCache);
    	    $("#infoListView").listview("refresh");
    	    return;
    	}
        if(connectionNow) {
            $.mobile.showPageLoadingMsg();
            
            $.ajax({
                url: servicesURL.info,
                type: 'GET',
                dataType: 'xml',
                timeout: System.globalTimeout,
                beforeSend: function() {
                    DebugLog('before get info list');  
                },
                error: function() {
                    ErrorLog('query info list ERROR');
                },
                success: function(xml) {
                    DebugLog('query info list success');
                },
                complete: function(jqx, textStatus) {
                    DebugLog('complete:' + textStatus);
                   
                   if(textStatus == 'success') {
                    var xmlDoc = jqx.responseXML;
                    setOfflineXml(servicesURL.info, jqx.responseText);
                    parseInfoXml(xmlDoc);
                   } else if(textStatus == 'timeout') {
                    $.mobile.hidePageLoadingMsg();
                    var xml = getOfflineXml(servicesURL.info);
                    if(xml !== null){
                    	parseInfoXml(xml);
                    }else{
                    	showServiceError();
                    }
                   } else if(textStatus == 'error') {
                    $.mobile.hidePageLoadingMsg();
                    var xml = getOfflineXml(servicesURL.info);
                    if(xml !== null){
                    	parseInfoXml(xml);
                    }else{
                    	showServiceError();
                    }
                   }
                }
            });
        } else {
            
        }
    });
    
	//服務據點
	$("#stationDetail").live("pageshow", function(event, ui) {
	    checkConnection();
	    if(connectionNow) {
	        prepareStationDetail();
	    } else {
	        
	    }
    });
	
	$("#mediaList").live("pageshow", function(event, ui){
        checkConnection();
        if(connectionNow) {
            loadMediaListPage();
        } else {
            
        }
    });
	
	$("#mediaContent").live("pageshow", function(event, ui){
        checkConnection();
        if(connectionNow) {
            prepareMediaContent();
        } else {
            
        }
    });
    
    $('#audioPage').live("pageshow", function(event, ui){
        checkConnection();
        if(connectionNow) {
            prepareMediaContent();
        } else {
            
        }
    });
    
    $("#epaper").live("pageshow", function(event, ui){
        checkConnection();
        $('#epaper_1').attr("checked", "checked");
        $('#epaper_2').attr("checked", "checked");
        $('#email').val("");
        $('#epaperResponse1').html("");
        $('#epaperResponse2').html("");
    });
    
}

function changeMediaListPage(target) {
    mediaTarget = target;
    loadMediaListPage();
}

function loadMediaListPage() {
    $.mobile.showPageLoadingMsg();

    //load media lp xml
    //英文版只有一個影音lp
    var mediaLP = servicesURL.filmLp;
    
    $.ajax({
        url: mediaLP,
        type: 'GET',
        dataType: 'xml',
        timeout: System.globalTimeout,
        beforeSend: function() {
            DebugLog("before get '" + mediaTarget + "' LP");
        },
        error: function(jqx, errorType, ex) {
            DebugLog("get " + mediaTarget + " LP error: " + errorType);
        },
        success: function(xml) {
//            console.log
        },
        complete: function(jqx, textStatus) {
            DebugLog("get " + mediaTarget + " " + textStatus);
            if(textStatus === 'success'){
            	var xml = jqx.responseXML;
            	setOfflineXml(servicesURL.filmLp, jqx.responseText);
                parseMediaList(xml);
            }else if(textStatus === 'timeout' || textStatus === 'error'){
            	$.mobile.hidePageLoadingMsg();
            	var xml = getOfflineXml(servicesURL.filmLp);
            	if(xml !== null){
            		parseMediaList(xml);
            	}else{
            		showServiceError();
            	}
            }
        }
        
    });
}

function parseMediaList(xml) {
//  console.log("lp xml: " + xml);
  var ctNode = mediaXnodeConfig.film;
  
  var articles = $(xml).find("TopicList[xNode='" + ctNode + "'] > Article");
  console.log("get media list amount: " + articles.length);
  var liHtml = genMediaListHtml(articles);
  
//  console.log(liHtml);
  $("#mediaListView").html(liHtml);
  $("#mediaListView").listview("refresh");
  $.mobile.hidePageLoadingMsg();
}

function genMediaListHtml(articles) {
    var rtn = "";
    $(articles).each(function(){
        var stitle = $(this).find("ArticleField > fieldName:contains('stitle')");
        var stitleText = $(stitle).parent().find("Value").text();
        
        var xpostDate = $(this).find("ArticleField > fieldName:contains('xpostDate')");
        var xpostDateText = $(xpostDate).parent().find("Value").text();
        
        var ximgFile = $(this).find("ArticleField > fieldName:contains('ximgFile')");
        var ximgFileUrl = servicesURL.frontSiteData + $(ximgFile).parent().find("Value").text();
        
        var xurl = $(this).find("ArticleField > fieldName:contains('xurl')");
        var youtubeLink = $(xurl).parent().find("Value").text();
        
        rtn += '<li onclick="javascript:openYoutube(\'http://www.youtube.com/watch?v=' + getYoutubeID(youtubeLink) + '\');">';
        
        //TODO load圖片導致list頁剛轉換後會難以捲動
        rtn += '<img src="' + ximgFileUrl + '" style="width:80px;height:80px;"/>';//因為jQM只會將寬度縮為80，高度等比例跟著縮就會留空白，所以在此會指定高度
        
        rtn += '<h3 style="white-space: normal;">' + stitleText + '</h3>';
        rtn += '<p>' + xpostDateText + '</p>'
        
        rtn += "</li>";
        
    });
    return rtn;
}

function getYoutubeID(link) {
    return link.substring(link.indexOf("/v/")+3, link.indexOf("?"));
}
var my_media = null;
var playing = false;
function prepareMediaContent() {
    //film會用openYoutube處理
    
    if(mediaTarget == 'broadcast') {
        if(my_media != null) {
            my_media.release();
        }
        my_media = new Media(mediaLink, null, audioError);
        //處理播放mp3
        
        $("#audioTitle").text(mediaTitle);
    } else if(mediaTarget == 'photo') {
        //顯示照片
        var imageEle = document.createElement("img");
        $(imageEle).attr("src", mediaLink);
        $(imageEle).attr("width", Math.round(windowWidth*0.95));
        var titleEle = document.createElement("h3");
        $(titleEle).text(mediaTitle);
        $('#mediaContainer').append($(imageEle), $(titleEle));
    }
}

function playAudio() {
    if(!playing) {
        playing = true;
        my_media.play();
    } else {
        playing = false;
        my_media.pause();
    }
}

function audioError(error) {
    ErrorLog("audio play error: code" + error.code + ", message: " + error.message);
    if(4 == error.code) {
        navigator.notification.alert("目前裝置不支援此聲音檔案播放", null);
    }
}

//parse demon lp xml from ajax response, add to listview
function parseDemonXml(xml) {
    //change header
    var articles = $(xml).find("TopicList[xNode='" + demonListCtnode + "'] > Article");
    var total = articles.length;
    
    var liHtml = "";
    $(articles).each(function(i){
        var isExternalSite = ($(this).attr("newWindow") == "Y");
        var stitle = $(this).find("ArticleField > fieldName:contains('stitle')");
        var stitleText = $(stitle).parent().find("Value:first").text();
        var xurl = $(stitle).parent().find("xURL:first").text();//用xurl判斷是否是移民署全球網的連結
        
        liHtml += '<li>'; //避免標題被截斷
        //LP就要判斷是否是外部網站，若是則stitle就要開啟外部連結，且不轉入content頁
        if(isExternalSite) {
            liHtml += '<a href="#" onclick="javascript:openOutside(\'' + xurl + '\');"><h3 style="white-space:normal;">' + stitleText + '[外部網站]</h3></a>';
        } else {
            liHtml += '<a href="javascript:showDemonContent(\'' + $(this).attr("iCuItem") + '\', \'' + stitleText + '\', \'' + xurl + '\');">';
            liHtml += '<h3 style="white-space:normal;">' + stitleText + '</h3>';
            liHtml += '</a>';
        }
        
        liHtml += '</li>';
    });

    //console.log(liHtml);
    $("#demonListView").html(liHtml);
    $("#demonListView").listview("refresh");
    $.mobile.hidePageLoadingMsg();
}

//show demon cp page
function showDemonContent(icuitem, title, xurl) {
    
    if(xurl.indexOf("ct.asp") != -1 || xurl.indexOf("ct_cert.asp") != -1){
//        navigator.notification.alert("是全球網內容頁,參數為: " + xurl.substring(xurl.indexOf("?")+1), null);
        var requestParam = xurl.substring(xurl.indexOf("?")+1);
        $.ajax({
            url: servicesURL.demonCp + requestParam,
            type: 'GET',
            dataType: 'xml',
            timeout: System.globalTimeout,
            beforeSend: function() {
                DebugLog('before get demon cp~~');  
            },
            error: function() {
                ErrorLog("query demon cp ERROR: " + (servicesURL.demonCp + requestParam));
            },
            success: function(xml) {
                DebugLog('query demon cp success');
            },
            complete: function(jqx, textStatus) {
                DebugLog('complete:' + textStatus);
                
                if(textStatus === 'success'){
                	var xml = jqx.responseXML;
                	setOfflineXml(servicesURL.demonCp + requestParam, jqx.responseText);
                    var xbody = $(xml).find("MainArticleField > fieldName:contains('xbody')");
                    DebugLog("xbody element-->" + xbody);
                    var xbodyText = $(xbody).parent().find("Value:first").text();
                    //DebugLog("xbodyText-->" + xbodyText);
                    console.log("xbodyText-->" + xbodyText);
                    var contentHtml = "";
                    contentHtml += '<h1>' + title + '</h1>'
                    + '<div name="xbody">' + xbodyText + '</div>';
                    
                    $("#demonContentDetail").html(contentHtml);
                    $("#demonContentHeader").html(demonLPTitle);
                    switchPage("#demonContent");
                }else if(textStatus === 'timeout' || textStatus ==='error'){
                	var xml = getOfflineXml(servicesURL.demonCp + requestParam);
                	if(xml !== null){
                		var xbody = $(xml).find("MainArticleField > fieldName:contains('xbody')");
                        DebugLog("xbody element-->" + xbody);
                        var xbodyText = $(xbody).parent().find("Value:first").text();
                        //DebugLog("xbodyText-->" + xbodyText);
                        console.log("xbodyText-->" + xbodyText);
                        var contentHtml = "";
                        contentHtml += '<h1>' + title + '</h1>'
                        + '<div name="xbody">' + xbodyText + '</div>';
                        
                        $("#demonContentDetail").html(contentHtml);
                        $("#demonContentHeader").html(demonLPTitle);
                        switchPage("#demonContent");
                	}else{
                		showServiceError();
                	}
                }
            }
        });
    } else {
        ErrorLog("非正常業務小精靈內容頁但卻進來了!!!" + xurl);
    }
}

function subscribeEpaper() {
    checkConnection();
    if(connectionNow) {
        var emailAddress = $('#email').val();
        var emailValidate = /^[\w\.]+@([\w.]+)/.test(emailAddress);
        DebugLog("email validate: " + emailValidate);
        
        if(!emailValidate) {
            alert("請輸入正確的email");
        } else {
            var orderEpaper = "";
            $("input[name='orderEpaper']:checked").each(function(){
                orderEpaper += $(this).val() + ",";
            });
            DebugLog("orderEpaper: " + orderEpaper);
            
            $.ajax({
                url: servicesURL.epaper,
                type: 'post',
                dataType: 'html',
                timeout: System.globalTimeout,
                data: {subscriberEmail: emailAddress,OrderEpaper: orderEpaper},
                beforeSend: function() {
                    $.mobile.showPageLoadingMsg();
                    DebugLog('before epaper');  
                },
                error: function(jqx, status, error) {
                    ErrorLog('epaper ERROR-->status: ' + status + ", error: " + error);
                },
                success: function(xml) {
                    DebugLog('epaper success');
                },
                complete: function(jqx, textStatus) {
                	if(textStatus == 'success') {
                        $('#epaperResponse1').empty();
                        if(orderEpaper.length !== 0){
                        	$('#epaperResponse1').text("Dear " + emailAddress + " : You have subscribed 1 free e-papers, please check the confirmation letter in " + emailAddress + ", and activate this subscription.");
                        }else{
                        	$('#epaperResponse1').text("Dear " + emailAddress + " : You have unsubscribed 1 free e-papers, please check the confirmation letter in " + emailAddress + ".");
                        }
                        $.mobile.hidePageLoadingMsg();
                    } else if(textStatus == 'timeout' || textStatus == 'error') {
                        $.mobile.hidePageLoadingMsg();
                        showServiceError();
                    }
                }
            });
        }
    } else {
        
    }
}

function showStationDetail(type){
	stationType = type;
	switchPage('#stationDetail');
}

//parse news LP xml from ajax call, to listview
function parseNewsXml(xmlDoc) {
    var articles = $(xmlDoc).find("TopicList[xNode='29991'] > Article");
    var total = articles.length;
    console.log("get news total amount:" + total);
    
    var liHtml = "";
    $(articles).each(function(i){
        var stitle = $(this).find("Caption:first").text();
        var xpostDate = $(this).find("PostDate:first").text();
        var showType = $(this).attr("showType");
        var xItem = $(this).attr("iCuItem");
        var xurl = $(this).find("xURL:first").text();
        
        //要區分是正常cp頁showType="1"
        if(showType == '1') {
            liHtml += '<li><a href="javascript:showNewsContent(\'' + xItem + '\', \'' + stitle + '\', \'' + xpostDate + '\');">';
        
        } else if(showType == '2') {
            if(xurl.indexOf('http://') != -1) {//外部網頁
                liHtml += '<li><a href="javascript:openOutside(\'' + xurl + '\');">';
            } else if(xurl.indexOf('lp.asp?') != -1 || xurl.indexOf('ct.asp?') != -1) {
                //加上前台網址，用外部瀏覽器開
                liHtml += '<li><a href="javascript:openOutside(\'' + servicesURL.frontSite + xurl + '\');">';
            } else {
                liHtml += '<li><a href="javascript:showNewsContent(\'' + xItem + '\', \'' + stitle + '\', \'' + xpostDate + '\');">';
            }
        } else {//附件
            liHtml += '<li><a href="javascript:notImplemented(\'' + servicesURL.frontSite + xurl + '\');">';
        }
        
        liHtml += '<h3 style="white-space: normal;">' + stitle + '</h3>';
        liHtml += '<p>' + xpostDate + '</p>';
        
        liHtml += '</a></li>';
    });

//    console.log(liHtml);
    //將parse結果存入cache
    newsLPCache = liHtml;
    $("#engNewsListView").html(liHtml);
    $("#engNewsListView").listview("refresh");
    $.mobile.hidePageLoadingMsg();
}

function notImplemented(url) {
    navigator.notification.alert("content is at " +url+", please try visitting on desktop device", null);
}

//info list xml parse
function parseInfoXml(xmlDoc) {
    var articles = $(xmlDoc).find("TopicList[xNode='30085'] > Article");
    var total = articles.length;
    console.log("get info list amount:" + total);
    
    var liHtml = "";
    $(articles).each(function(i){
        var stitle = $(this).find("Caption:first").text();
        var xpostDate = $(this).find("PostDate:first").text();
        
        liHtml += '<li><a href="javascript:showInfoContent(\'' + $(this).attr("iCuItem") + '\', \'' + stitle + '\', \'' + xpostDate + '\');">';
        liHtml += '<h3 style="white-space: normal;">' + stitle + '</h3>';
        liHtml += '<p>' + xpostDate + '</p>';
        
        liHtml += '</a></li>';
    });
    
  //將parse結果存入cache
    infoLPCache = liHtml;
    $("#infoListView").html(liHtml);
    $("#infoListView").listview("refresh");
    $.mobile.hidePageLoadingMsg();
}

//news CP
function showNewsContent(item, title, postdate) {
    //ajax call ct
    console.log("ajax query news cp,icuitem: " + item);
    $.mobile.showPageLoadingMsg();
    $.ajax({
        url: servicesURL.newsCp + item,
        type: 'GET',
        dataType: 'xml',
        timeout: System.globalTimeout,
        beforeSend: function() {
          console.log('before get news cp');  
        },
        error: function() {
            
        },
        success: function(xml) {
            console.log('query news cp success');
        },
        complete: function(jqx, textStatus) {
            console.log('complete:' + textStatus);
            
            if(textStatus === 'success'){
            	var xml = jqx.responseXML;
            	setOfflineXml(servicesURL.newsCp + item, jqx.responseText);
//              console.log(xml);
              //compose cp page
              var mainArticle = $(xml).find('MainArticle[iCuItem="' + item + '"]');
              var xbodyText = $(mainArticle).find("Content").text();
              var deptText = $(mainArticle).find("DeptName").text();
              
              var contentHtml = "";
              contentHtml += '<h2>' + title + '</h2>';
              if($.trim(deptText) != '') {
                  contentHtml += '<p>Source: ' + deptText + '</p>';
              }
              if($.trim(postdate) != '') {
                  contentHtml += '<p>Date: ' + postdate + '</p>';
              }
              contentHtml += '<div name="xbody">' + xbodyText + '</div>';
              $("#newsContentDetail").html(contentHtml);
              
              //prepare facebook share info
              fbTitle = title;
              fbUrl = servicesURL.newsCpUrl + item;
              DebugLog("前台url: " + fbUrl);
              fbSecondTitle = deptText;
              fbDesc = title;

              $.mobile.hidePageLoadingMsg();
              //page change
              switchPage("#newsContent");
            }else if(textStatus === 'timeout' || textStatus === 'error'){
            	var xml = getOfflineXml(servicesURL.newsCp + item);
            	if(xml !== null){
            		 var mainArticle = $(xml).find('MainArticle[iCuItem="' + item + '"]');
                     var xbodyText = $(mainArticle).find("Content").text();
                     var deptText = $(mainArticle).find("DeptName").text();
                     
                     var contentHtml = "";
                     contentHtml += '<h2>' + title + '</h2>';
                     if($.trim(deptText) != '') {
                         contentHtml += '<p>Source: ' + deptText + '</p>';
                     }
                     if($.trim(postdate) != '') {
                         contentHtml += '<p>Date: ' + postdate + '</p>';
                     }
                     contentHtml += '<div name="xbody">' + xbodyText + '</div>';
                     $("#newsContentDetail").html(contentHtml);
                     
                     //prepare facebook share info
                     fbTitle = title;
                     fbUrl = servicesURL.newsCpUrl + item;
                     DebugLog("前台url: " + fbUrl);
                     fbSecondTitle = deptText;
                     fbDesc = title;

                     $.mobile.hidePageLoadingMsg();
                     //page change
                     switchPage("#newsContent");
            	}else{
            		$.mobile.hidePageLoadingMsg();
            		showServiceError();
            	}
            }
        }
    });
}

//info CP
function showInfoContent(item, title, postdate) {
    //ajax call ct
    console.log("ajax query info xdcp,icuitem: " + item);
    $.mobile.showPageLoadingMsg();
    $.ajax({
        url: servicesURL.infoCp + item,
        type: 'GET',
        dataType: 'xml',
        timeout: System.globalTimeout,
        beforeSend: function() {
          console.log('before get info cp');  
        },
        error: function() {
            
        },
        success: function(xml) {
            console.log('query info cp success');
        },
        complete: function(jqx, textStatus) {
            console.log('complete:' + textStatus);
            
            if(textStatus === 'success'){
            	var xml = jqx.responseXML;
            	setOfflineXml(servicesURL.infoCp + item, jqx.responseText);
//              console.log(xml);
              //compose cp page
              var mainArticle = $(xml).find('MainArticle[iCuItem="' + item + '"]');
              var xbodyText = $(mainArticle).find("Content:first").text();
              var deptText = $(mainArticle).find("DeptName").text();
              
              var contentHtml = "";
              contentHtml += '<h2>' + title + '</h2>';
              if($.trim(deptText) != '') {
                  contentHtml += '<p>Source: ' + deptText + '</p>';
              }
              if($.trim(postdate)) {
                  contentHtml += '<p>Date: ' + postdate + '</p>';
              }
              contentHtml += '<div name="xbody">' + xbodyText + '</div>';
              console.log("xbodyText-->"+xbodyText);
              
              $("#infoContentDetail").html(contentHtml);
              $.mobile.hidePageLoadingMsg();
              //page change
              switchPage("#infoContent");
            }else if(textStatus === 'timeout' || textStatus === 'error'){
            	var xml = getOfflineXml(servicesURL.infoCp + item);
            	if(xml !== null){
            		var mainArticle = $(xml).find('MainArticle[iCuItem="' + item + '"]');
                    var xbodyText = $(mainArticle).find("Content:first").text();
                    var deptText = $(mainArticle).find("DeptName").text();
                    
                    var contentHtml = "";
                    contentHtml += '<h2>' + title + '</h2>';
                    if($.trim(deptText) != '') {
                        contentHtml += '<p>Source: ' + deptText + '</p>';
                    }
                    if($.trim(postdate)) {
                        contentHtml += '<p>Date: ' + postdate + '</p>';
                    }
                    contentHtml += '<div name="xbody">' + xbodyText + '</div>';
                    console.log("xbodyText-->"+xbodyText);
                    
                    $("#infoContentDetail").html(contentHtml);
                    $.mobile.hidePageLoadingMsg();
                    //page change
                    switchPage("#infoContent");
            	}else{
            		$.mobile.hidePageLoadingMsg();
            		showServiceError();
            	}
            }
        }
    });
}

function showMediaList(target) {
    //影音專區的條列目標(影片film/廣播broadcast/照片photo)
    mediaTarget = target;
    switchPage("#mediaList");
}

//parse station detail xml content from ajax call, to listview
function parseStationDetailXml(xmlDoc) {
    var articles = $(xmlDoc).find("TopicList[xNode='"+stationType+"'] > Article");
    var total = articles.length;
    console.log("get station detail total amount:" + total);
    var liHtml = "";
    $(articles).each(function(i){
        var stitle = $(this).find("ArticleField > fieldName:contains('stitle')");
        var xAddress = $(this).find("ArticleField > fieldName:contains('xAddress')");
		var tel = $(this).find("ArticleField > fieldName:contains('c1')");
        var stitleText = $(stitle).parent().find("Value").text();
        var xAddressText = $(xAddress).parent().find("Value").text();
		var telText = $(tel).parent().find("Value").text();
		var i, telArray = telText.split(","), telLinks = "";
		for(i=0;i<telArray.length;i++){
			telLinks = telLinks + "<a href='tel:" + telArray[i] + "'>" + telArray[i] + "</a>";
			if(i!==telArray.length-1){
				telLinks = telLinks + "、";
			}
		}
		liHtml += '<li style="padding-left:10px;">';
        //Johnson 為了讓圖可以在右邊
        //Wei 所有連江縣的地址不顯示路徑規劃圖示
		if(xAddressText.toLowerCase().indexOf("lienchiang county") === -1){
			liHtml += '<img src="images/mapicon.png" style="float:right;position:relative;" onclick="javascript:showStationPath(\'' + xAddressText + '\');"/>';
		}
        liHtml += '<h2 style="white-space:normal;">' + stitleText + '</h2>';
        liHtml += '<p style="white-space:normal;">Tel: ' + telLinks + '</p>';
        liHtml += '<h2 style="white-space:normal;">Address: <a href="#" onclick="javascript:showMap(\'' + xAddressText + '\');">' + xAddressText + '</a></h2>';
        liHtml += '</li>';
    });
//    console.log(liHtml);
    $("#stationDetailListView").html(liHtml);
    $("#stationDetailListView").listview("refresh");
    $.mobile.hidePageLoadingMsg();
    //在服務據點list完成時就預先load geolocation info
    getGeoInfo();
}

function showStationPath(address) {
    //getGeoInfo();
    if(hasGeolocation) {
    	//客戶要求將金門與連江縣的地址hard code為經緯度
    	if(stationType === '32914' || stationType === '32916'){
    		if(address.toLowerCase().indexOf("kinmen county")!=-1){
    			address="24.4124946,118.29067090000001";
    		}else if(address.toLowerCase().indexOf("lienchiang county")!=-1){
    			address="26.152896,119.944096";
    		}
    	}else if(stationType === '32915' || stationType === '32917'){
    		if(address.toLowerCase().indexOf("kinmen county")!=-1){
    			address="24.430916,118.441737";
    		}else if(address.toLowerCase().indexOf("lienchiang county")!=-1){
    			address="26.146732,119.940319";
    		}
    	}
        openOutside("http://maps.google.com/maps?f=d&hl=" + System.mapHl + "&daddr="+address+"&saddr="+currentLatitude+","+currentLongitude);
    } else {
        navigator.notification.alert(Message.GeolocationError, null, "GPS Error", "確認");
        openOutside("http://maps.google.com/maps?f=d&daddr="+address);
    }
}

function showMap(address) {
	//客戶要求將金門與連江縣的地址hard code為經緯度
	if(stationType === '32914' || stationType === '32916'){
		if(address.toLowerCase().indexOf("kinmen county")!=-1){
			address="24.4124946,118.29067090000001";
		}else if(address.toLowerCase().indexOf("lienchiang county")!=-1){
			address="26.152896,119.944096";
			//Wei 連江縣的地圖導至固定的圖片檔
			if(stationType === '32914'){
				$.mobile.changePage("lienchiang_eng.html");
				return;
			}
		}
	}else if(stationType === '32915' || stationType === '32917'){
		if(address.toLowerCase().indexOf("kinmen county")!=-1){
			address="24.430916,118.441737";
		}else if(address.toLowerCase().indexOf("lienchiang county")!=-1){
			address="26.146732,119.940319";
		}
	}
    openOutside("http://maps.google.com.tw/maps?q="+address+'&z=15&t=m&hl=' + System.mapHl + '&ie=UTF8');
}

function getGeoInfo() {
    navigator.geolocation.getCurrentPosition(
    function(position) {
        DebugLog("get geo info success, latitude:" + position.coords.latitude + " longitude:" + position.coords.longitude);
        hasGeolocation = true;
        currentLatitude = position.coords.latitude;
        currentLongitude = position.coords.longitude;
    },
    function(error) {
        hasGeolocation = false;
        ErrorLog("get geo info error, code:" + error.code + " message:" + error.message);
    });
}

function showStationPath(address) {
    if(hasGeolocation) {
        openOutside("http://maps.google.com/maps?f=d&daddr="+address+"&saddr="+currentLatitude+","+currentLongitude);
    } else {
        navigator.notification.alert(Message.GeolocationError, null, "GPS Error", "確認");
        openOutside("http://maps.google.com/maps?f=d&daddr="+address);
    }
}

function parseFastProgressXml(htmlDoc) {
	  if(htmlDoc.indexOf('<table class="Tbdata">') !== -1){
		  var tableXml, result = "", lihtml = "";
		  result = htmlDoc.substring(htmlDoc.indexOf('<table class="Tbdata">'), htmlDoc.indexOf('</table>')+8);
		  console.log(result);
		  $('#hidden_fast').html(result).hide();
		  $('#hidden_fast table tr').each(function(i){
			  var colName = $(this).children("th").text();
			  var colValue = $(this).children("td").text();
			  lihtml = lihtml + "<li>" + colName + colValue + "</li>";
		  });

		  $('#fastProgressQueryContent').html(lihtml);
		  $('#fastProgressQueryContent').listview('refresh');
	  }else{
		  $('#fastProgressQueryContent').html('<li>查無資料</li>');
		  $('#fastProgressQueryContent').listview('refresh');
	  }
	  $(document).scrollTop($(document).height());
	  $.mobile.hidePageLoadingMsg();
}

function getFastProgressResult(){
	var birth_date = "";
	$.mobile.showPageLoadingMsg();
	birth_date = $('#birth_date_fp').val().replace(/\//g,"");
	console.log(servicesURL.fastProgress + '&eng_name=' + $('#eng_name_fp').val() + '&birth_date=' + birth_date + '&idno=' + $('#idno_fp').val() + '&passno=' + $('#passno_fp').val());
	$.ajax({
		url: servicesURL.fastProgress + '&eng_name=' + $('#eng_name_fp').val().toUpperCase() + '&birth_date=' + birth_date + '&idno=' + $('#idno_fp').val() + '&passno=' + $('#passno_fp').val(),
		type: 'GET',
		dataType: 'html',
		timeout: System.globalTimeout,
		beforeSend: function() {
			DebugLog('before query progress');  
		},
		error: function(jqx, status, error) {
//		    
		},
		success: function(html) {
		    parseFastProgressXml(html);
		},
		complete: function(jqx, textStatus) {
		    DebugLog('complete:' + textStatus);
		    if(textStatus == 'success') {
		        
		    } else if(textStatus == 'error') {
		        $.mobile.hidePageLoadingMsg();
              showServiceError();
		    } else if (textStatus == 'timeout') {
		        $.mobile.hidePageLoadingMsg();
              showServiceError();
          }
		}
	});
}

function switchPage(toPage) {
	nowPage = toPage;
    $.mobile.changePage(toPage, {});
}

function showDemonList(ctNode) {
    demonListCtnode = ctNode;
    demonLPTitle = getDemonLPTitle(ctNode);
    $('#demonCtNode').val(ctNode);
    switchPage('#demonList');
}

function backToDemonList() {
    showDemonList($('#demonCtNode').val());
}

//依據ctnode取得業務小精靈LP頁的title
function getDemonLPTitle(ctNode){
    var title;
    
    switch (ctNode) {
    case "32594":
        title = "台灣地區人民";
        break;
    case "32595":
        title = "大陸地區人民";
        break;
    case "32596":
        title = "無戶籍國民";
        break;
    case "32597":
        title = "港澳居民";
        break;
    case "32598":
        title = "外籍人士";
        break;
    case "32599":
        title = "小三通";
        break;
    case "32600":
        title = "入出國日期證明";
        break;
    case "32601":
        title = "其他服務";
        break;
    default:
        title = "申請須知";
        break;
    }
    
    return title;
}

function backToMediaList() {
//    $('#mediaContainer').empty();
    switchPage('#mediaList');
}

function DebugLog(text) {
    if(System.debuggable) {
        console.log("[DEBUG] " + text);
    }
}

function ErrorLog(text) {
    console.log("[ERROR][" + new Date().toString()+ "] " + text);
}

function prepareStationDetail() {
    $.mobile.showPageLoadingMsg();
    var sUrl = servicesURL.stationServiceSpot;
    var sHeader = "Contact Information";
    switch(stationType){
        case '32914':
            sUrl = servicesURL.stationServiceSpot;
            sHeader = "Service Centers";
            break;
        case '32915':
            sUrl = servicesURL.stationSpecialTeam;
            sHeader = "Specialized Operation Brigades";
            break;
        case '32916':
            sUrl = servicesURL.stationNationTeam;
            sHeader = "Border Affairs Corps";
            break;
        case '32917':
            sUrl = servicesURL.stationShelter;
            sHeader = "Detention Centers";
            break;
        default:
            sUrl = servicesURL.stationServiceSpot;
            sHeader = "Contact Information";
            break;
    }
    $('#stationDetailHeader').text(sHeader);
    $.ajax({
        url: sUrl,
        type: 'GET',
        dataType: 'xml',
        timeout: System.globalTimeout,
        beforeSend: function() {
          DebugLog('before get station second list');  
        },
        error: function() {
            ErrorLog('get station second list ERROR');
        },
        success: function(xml) {
            DebugLog('get station second list success');
        },
        complete: function(jqx, textStatus) {
            if(textStatus === 'success'){
            	var xmlDoc = jqx.responseXML;
            	setOfflineXml(sUrl, jqx.responseText);
                parseStationDetailXml(xmlDoc);
            }else if(textStatus === 'timeout' || textStatus === 'error'){
            	$.mobile.hidePageLoadingMsg();
            	var xml = getOfflineXml(sUrl);
            	if(xml !== null){
            		parseStationDetailXml(xml);
            	}else{
            		showServiceError();
            	}
            }
        }
    });
}

function changeStationDetail(type) {
    stationType = type;
    prepareStationDetail();
}

//用瀏覽器視窗開啟url
function openOutside(url) {
    //android用childBrowser
    DebugLog("open outside, url: " + url);
    if(isAndroid) {
        window.plugins.childBrowser.showWebPage(url);
    } else if(isIphone) {
      //iOS用Safari
        window.location.href = url;
    } else {
        navigator.notification.alert(Message.DeviceNotSupport, null);
    }
}

function openYoutube(url) {
    DebugLog("play youtube: " + url);
    if(isAndroid) {
        window.plugins.videoPlayer.play(url);
    } else if(isIphone) {
        window.location.href = url;
    } else {
        navigator.notification.alert(Message.DeviceNotSupport, null);
    }
}

function gotoMediaContent(link, title) {
    if(mediaTarget == 'broadcast') {
        switchPage("#audioPage");
    } else {
        $('#mediaContainer').empty();
        switchPage("#mediaContent");
    }
    mediaLink = link;
    mediaTitle = title;
}

function postFacebook() {
//  var socialUrl = "http://m.facebook.com/sharer.php?u=" + encodeURIComponent(fbUrl);
  var socialUrl = "http://www.facebook.com/sharer/sharer.php?m2w&next=/home.php&u=" + encodeURIComponent(fbUrl);
                                                   console.log('test1');
      var cb = window.plugins.childBrowser;
                                                   console.log('test2');
      cb.onLocationChange = function(loc) {
          console.log("location changed to: "+loc);
          if(loc.indexOf("http://www.facebook.com/home.php") != -1) {
          	//navigator.notification.alert("分享成功!", null, "Facebook", "好");
              cb.close();
          }
      };
                                                   console.log('test3');
      cb.showWebPage(socialUrl);
}

function postPlurk() {
  var pUrl = "http://www.plurk.com/changeLanguage?language=en&from_page=m/?qualifier=shares%26content=" + encodeURIComponent(fbUrl);
  var cb = window.plugins.childBrowser;
  var lastUrl = pUrl;
  var openagain = false;
  	cb.onLocationChange = function(loc) {
  		console.log("new loc: " + loc);
          if(loc === "http://www.plurk.com/m/t") {
              navigator.notification.alert("請先登入!", null, "Plurk", "好");
              lastUrl = loc;
              if(isAndroid) {
              	console.log("need login");
              }else if(isIphone){
                  cb.getPage("http://www.plurk.com/m/login");
              }
          }
          if(loc === "http://www.plurk.com/m/") {
              if(lastUrl === "http://www.plurk.com/m/login"){
                  lastUrl = loc;
                  if(isAndroid) {
                  	openagain = true;
                  	cb.close();
                  }else if(isIphone){
                      cb.getPage(pUrl);
                  }
              }else{
                  //navigator.notification.alert("分享成功!", null, "Plurk", "好");
                  cb.close();
              }
          }
          lastUrl = loc;
    };
  	
  	cb.onClose = function(){
  		if(openagain){
  			openagain = false;
  			cb.showWebPage(pUrl);
  		}
    };
  	
      cb.showWebPage(pUrl);
}

function postTweet() {
  var tUrl = "https://twitter.com/intent/tweet?original_referer=" + encodeURIComponent(fbUrl) +
  "&source=tweetbutton&text=" + encodeURIComponent(fbTitle) + "&url=" + encodeURIComponent(fbUrl);
      var cb = window.plugins.childBrowser;
      cb.onLocationChange = function(loc) {
          if(loc.indexOf("https://twitter.com/intent/tweet/complete?") != -1) {
              //navigator.notification.alert("分享成功!", null, "Twitter", "好");
              cb.close();
          }
      };
      cb.showWebPage(tUrl);        
}

//util notification for calling service/ajax
function showServiceError() {
    navigator.notification.alert(Message.ServiceUnavailable, new function(){}, "訊息");
}

function setOfflineXml(key, xmlStr){
	window.localStorage.setItem(key, xmlStr);
	console.log('offline saved!');
}

function getOfflineXml(key){
	var xmlDoc = window.localStorage.getItem(key);
	console.log('offline got!');
	if(xmlDoc !== null){
		return $.parseXML(xmlDoc);
    }else{
    	return null;
    }
}














goBack('menu', '分類');
getFooterMenu('news');
goBack('news', '列表');
getFooterMenu('news');
goBack('menu', '分類');
getFooterMenu('media');
goBack('mediaList', '列表');
getFooterMenu('media');
goBack('menu', '返回');
getFooterMenu('');
goBack('progressList', '列表');
getFooterMenu('');
goBack('progressList', '列表');
getFooterMenu('');
goBack('progressList', '列表');
getFooterMenu('');
goBack('progressList', '列表');
getFooterMenu('');
getFooterMenu('');
goBack('progressList', '列表');
getFooterMenu('');
goBack('progressList', '列表');
getFooterMenu('');
goBack('menu', '返回');
getFooterMenu('station');
goBack('menu', '分類');
getFooterMenu('');
goBack('menu', '返回');
getFooterMenu('demon');
goBack('demon', '返回');
getFooterMenu('demon');
goBack('Q02', '返回');
getFooterMenu('demon');
goBack('Q02-01', '返回');
getFooterMenu('demon');
goBack('Q02', '返回');
getFooterMenu('demon');
goBack('Q02-02', '返回');
getFooterMenu('demon');
goBack('demon', '返回');
getFooterMenu('demon');
goBack('Q03-01', '返回');
getFooterMenu('demon');
goBack('Q03-01', '返回');
getFooterMenu('demon');
goBack('Q03-01-02', '返回');
getFooterMenu('demon');
goBack('Q03-01-02', '返回');
getFooterMenu('demon');
goBack('Q03-01-02-01', '返回');
getFooterMenu('demon');
goBack('Q03-01-02-01', '返回');
getFooterMenu('demon');
goBack('Q03-01-02-01', '返回');
getFooterMenu('demon');
goBack('Q03-01-02-01', '返回');
getFooterMenu('demon');
goBack('Q03-01-02', '返回');
getFooterMenu('demon');
goBack('Q03-01-02', '返回');
getFooterMenu('demon');
goBack('Q03-01-02', '返回');
getFooterMenu('demon');
goBack('Q03-01-02', '返回');
getFooterMenu('demon');
goBack('Q03-01-02', '返回');
getFooterMenu('demon');
goBack('Q03-01', '返回');
getFooterMenu('demon');
goBack('demon', '返回');
getFooterMenu('demon');
goBack('Q04-01', '返回');
getFooterMenu('demon');
goBack('Q04-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-03', '返回');
getFooterMenu('demon');
goBack('Q04-01-03', '返回');
getFooterMenu('demon');
goBack('Q04-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-01', '返回');
getFooterMenu('demon');
goBack('Q04-01-02-01-02', '返回');
getFooterMenu('demon');
goBack('demon', '返回');
getFooterMenu('demon');
goBack('Q05-07', '返回');
getFooterMenu('demon');
goBack('Q05-07', '返回');
getFooterMenu('demon');
goBack('Q05-07', '返回');
getFooterMenu('demon');
goBack('Q05-03', '返回');
getFooterMenu('demon');
goBack('Q05', '返回');
getFooterMenu('demon');
goBack('Q05', '返回');
getFooterMenu('demon');
goBack('Q05-05', '返回');
getFooterMenu('demon');
goBack('Q05-05', '返回');
getFooterMenu('demon');
goBack('Q05-05-02', '返回');
getFooterMenu('demon');
goBack('Q05', '返回');
getFooterMenu('demon');
goBack('Q05', '返回');
getFooterMenu('demon');
goBack('Q05-07', '返回');
getFooterMenu('demon');
goBack('Q05-07', '返回');
getFooterMenu('demon');
goBack('Q05', '返回');
getFooterMenu('demon');
goBack('Q05-08', '返回');
getFooterMenu('demon');
goBack('Q05', '返回');
getFooterMenu('demon');
goBack('Q05-09', '返回');
getFooterMenu('demon');
goBack('Q05-09-01', '返回');
getFooterMenu('demon');
goBack('Q05-09', '返回');
getFooterMenu('demon');
goBack('Q05-09', '返回');
getFooterMenu('demon');
goBack('Q05-09', '返回');
getFooterMenu('demon');
goBack('demon', '返回');
getFooterMenu('demon');
goBack('Q09', '返回');
getFooterMenu('demon');
goBack('Q09', '返回');
getFooterMenu('demon');
goBack('Q09', '返回');
getFooterMenu('demon');
goBack('Q09-01', '返回');
getFooterMenu('demon');
goBack('Q09-011', '返回');
getFooterMenu('demon');
goBack('Q09', '返回');
getFooterMenu('demon');
goBack('other-services', '返回');
getFooterMenu('demon');
goBack('demon', '返回');
getFooterMenu('demon');
goBack('Q07-01', '返回');
getFooterMenu('demon');
goBack('Q07-01-01', '返回');
getFooterMenu('demon');
goBack('InfoCP', '返回');
getFooterMenu('demon');
goBack('demon', '分類');
getFooterMenu('demon');
goBack('demonList', '返回');
getFooterMenu('demon');
goBack('demon', '返回');
getFooterMenu('demon');
goBack('other-services', '返回');
getFooterMenu('demon');
goBack('business', '返回');
getFooterMenu('demon');
goBack('business', '返回');
getFooterMenu('demon');
goBack('business', '返回');
getFooterMenu('demon');
goBack('business', '返回');
getFooterMenu('demon');
goBack('business', '返回');
getFooterMenu('demon');
goBack('menu', '分類');
getFooterMenu('urgent');
goBack('urgent', '返回');
getFooterMenu('urgent');
goBack('embassy', '列表');
getFooterMenu('urgent');
goBack('menu', '分類');
getFooterMenu('service');
goBack('menu', '分類');
getFooterMenu('license');
goBack('menu', '分類');
getFooterMenu('jobs');
goBack('jobs', '返回');
getFooterMenu('jobs');
goBack('jobs-info', '列表');
getFooterMenu('jobs');
goBack('jobs', '返回');
getFooterMenu('jobs');
goBack('exam-info', '列表');
getFooterMenu('jobs');
goBack('jobs', '返回');
getFooterMenu('jobs');
goBack('topic', '返回');
getFooterMenu('jobs');
goBack('topic', '返回');
getFooterMenu('jobs');
goBack('topic', '返回');
getFooterMenu('jobs');
goBack('topic', '返回');
getFooterMenu('jobs');
goBack('topic', '返回');
getFooterMenu('jobs');
goBack('topic', '返回');
getFooterMenu('jobs');
goBack('topic', '返回');
getFooterMenu('jobs');
goBack('jobs', '返回');
getFooterMenu('jobs');
goBack('exam-type', '返回');
getFooterMenu('jobs');
goBack('exam-type', '返回');
getFooterMenu('jobs');
goBack('', '返回');
getFooterMenu('jobs');
goBack('menu', '分類');
getFooterMenu('greetings');
goBack('greetings', '返回');
getFooterMenu('greetings');
goBack('greetings', 'Back');
getFooterMenu('greetings');

var menuIcon = {
    "defaultWidth": "166",
    "defaultHeight": "166"
}

var footerIcon = {
    "defaultWidth": "129",
    "defaultHeight": "98",
    "heightWidthRatio": 0.76
}

var mediaXnodeConfig = {
    "film": "32929"
};

var servicesURL = {
    "frontSite": "http://www.immigration.gov.tw/",
    "frontSiteData": "http://www.immigration.gov.tw/public/Data/",

    // 最新消息http://www.immigration.gov.tw/wsxd/xdlp.asp
    "news": "http://www.immigration.gov.tw/wsxd/xdlp.asp?CtNode=29991&CtUnit=16680&BaseDSD=7&mp=2&pagesize=100",
    "newsDetail": "http://www.immigration.gov.tw/wsxd/xd",
    "newsCp": "http://www.immigration.gov.tw/wsxd/xdcp.asp?ctNode=29991&mp=2&xItem=",//要加上xItem值
    "newsCpUrl": "http://www.immigration.gov.tw/ct.asp?ctNode=29991&mp=2&xItem=",//要加上xItem值

    // 
    "info": "http://www.immigration.gov.tw/wsxd/xdlp.asp?ctNode=30085&CtUnit=16740&BaseDSD=111&mp=2",
    "infoCp": "http://www.immigration.gov.tw/wsxd/xdcp.asp?ctNode=30085&mp=2&xItem=",//英文版業務小精靈，要加上xItem值

    // 影音
    "filmLp": "http://www.immigration.gov.tw/wsxd/xdlp.asp?ctNode=32929&CtUnit=17702&BaseDSD=7&mp=2",

    "stationServiceSpot": "http://www.immigration.gov.tw/wsxd/xdlp.asp?ctNode=32914&CtUnit=16670&BaseDSD=108&mp=2", //英文版服務站
    "stationSpecialTeam": "http://www.immigration.gov.tw/wsxd/xdlp.asp?ctNode=32915&CtUnit=16671&BaseDSD=108&mp=2", //英文版專勤隊
    "stationNationTeam": "http://www.immigration.gov.tw/wsxd/xdlp.asp?ctNode=32916&CtUnit=16672&BaseDSD=108&mp=2", //英文版服務據點: 國境隊
    "stationShelter": "http://www.immigration.gov.tw/wsxd/xdlp.asp?ctNode=32917&CtUnit=16673&BaseDSD=108&mp=2", //英文版服務據點: 收容所
    "fastProgress": "http://www.immigration.gov.tw/sp_immig2.aspx?xdUrl=e_immig%2Fasp%2Ffqpmgt%2FFQPD_2.asp&Submit2=確認",

    // 業務小精靈
    "demon": "http://www.immigration.gov.tw/wsxd/xdlp.asp?CtUnit=16735&BaseDSD=111&mp=1&pagesize=200&ctNode=", //業務小精靈LP,要加上ctNode值
    "demonCp": "http://www.immigration.gov.tw/wsxd/xdcp.asp?", //業務小精靈CP,後面加上xurl的參數部分
    "immigrantInfo": "http://211.20.93.188/cas-web1/ImmigrantInfoServlet?htmlName=",

    // 訂閱電子報
    "epaper": "http://www.immigration.gov.tw/wsxd/epaper20/epaper.subscribe.act.email.asp?mp=1&",  //還要加上subscriberEmail和OrderEpaper

    // 駐臺館處
    "embassyEn": "xml_eng/embassy.xml", 
    "embassy1": "xml_eng/1163277.xml",
    "embassy2": "xml_eng/1163278.xml",
    "embassy3": "xml_eng/1163279.xml",
    "embassy4": "xml_eng/1163280.xml",
    "embassy5": "xml_eng/1163281.xml",
    "embassy6": "xml_eng/1163282.xml",

    // 多國問候語
    //"pathGreetings": "http://dl.dropbox.com/u/50041843/imm/greetings/"
    //"pathGreetings": "/android_asset/www/greetings/"
    "pathGreetings": "greetings/"
};

var DeviceConfig = {
    "Android": {
        "headerBarHeight": 50,
        "speakerIconRightOffset": 45,
        "headerTitleFontSize": "16pt",
        "learningCategoryFontSize": "16pt",
        "chineseUnitItemHeight": 42,
        "englishExpFontSize": "14pt",
        "pronounciationFontSize": "16pt"
    },
    "iPhone": {
        "headerBarHeight": 44,
        "speakerIconRightOffset": 30,
        "headerTitleFontSize": "14pt",
        "learningCategoryFontSize": "14pt",
        "chineseUnitItemHeight": 36,
        "englishExpFontSize": "12pt",
        "pronounciationFontSize": "12pt"
    },
    "iPad": {
        "headerBarHeight": 76,
        "speakerIconRightOffset": 30,
        "headerTitleFontSize": "24pt",
        "learningCategoryFontSize": "24pt",
        "chineseUnitItemHeight": 80,
        "englishExpFontSize": "20pt",
        "pronounciationFontSize": "20pt"
    }
};

var System = {
    "globalTimeout": 10000,
    "debuggable": true,          //決定debug console output是否要執行
    "mapHl": "en", //google map的host language選項
    "stationType_ServiceSpot": "32914"
};

var Message = {
    "DeviceNotSupport": "Function not supported by current device",
    "GeolocationError": "Can't get your GPS information",
    "NoNetwork": "No network connection, can't provide information",
    "ServiceUnavailable": "The service is not available, please try again later"
};
