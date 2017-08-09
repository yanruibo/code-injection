

//<![CDATA[
(function(){function c(b){try{if(navigator.plugins&&navigator.plugins.length)for(var d=0;d<navigator.plugins.length;d++){var a=navigator.plugins[d];if(0<=a.name.indexOf(b))return a.name+(a.description?"|"+a.description:"")}}catch(c){}return""}function p(){for(var b=new Date,d=new Date,a=[function(){return"TF1"},function(){return"015"},function(){return ScriptEngineMajorVersion()},function(){return ScriptEngineMinorVersion()},function(){return ScriptEngineBuildVersion()},function(){return e("{7790769C-0471-11D2-AF11-00C04FA35D02}")},
function(){return e("{89820200-ECBD-11CF-8B85-00AA005B4340}")},function(){return e("{283807B5-2C60-11D0-A31D-00AA00B92C03}")},function(){return e("{4F216970-C90C-11D1-B5C7-0000F8051515}")},function(){return e("{44BBA848-CC51-11CF-AAFA-00AA00B6015C}")},function(){return e("{9381D8F2-0288-11D0-9501-00AA00B911A5}")},function(){return e("{4F216970-C90C-11D1-B5C7-0000F8051515}")},function(){return e("{5A8D6EE0-3E18-11D0-821E-444553540000}")},function(){return e("{89820200-ECBD-11CF-8B85-00AA005B4383}")},
function(){return e("{08B0E5C0-4FCB-11CF-AAA5-00401C608555}")},function(){return e("{45EA75A0-A269-11D1-B5BF-0000F8051515}")},function(){return e("{DE5AED00-A4BF-11D1-9948-00C04F98BBC9}")},function(){return e("{22D6F312-B0F6-11D0-94AB-0080C74C7E95}")},function(){return e("{44BBA842-CC51-11CF-AAFA-00AA00B6015B}")},function(){return e("{3AF36230-A269-11D1-B5BF-0000F8051515}")},function(){return e("{44BBA840-CC51-11CF-AAFA-00AA00B6015C}")},function(){return e("{CC2A9BA0-3BDD-11D0-821E-444553540000}")},
function(){return e("{08B0E5C0-4FCB-11CF-AAA5-00401C608500}")},function(){return eval("navigator.appCodeName")},function(){return eval("navigator.appName")},function(){return eval("navigator.appVersion")},function(){return q(["navigator.productSub","navigator.appMinorVersion"])},function(){return eval("navigator.browserLanguage")},function(){return eval("navigator.cookieEnabled")},function(){return q(["navigator.oscpu","navigator.cpuClass"])},function(){return eval("navigator.onLine")},function(){return eval("navigator.platform")},
function(){return eval("navigator.systemLanguage")},function(){return eval("navigator.userAgent")},function(){return q(["navigator.language","navigator.userLanguage"])},function(){return eval("document.defaultCharset")},function(){return eval("document.domain")},function(){return eval("screen.deviceXDPI")},function(){return eval("screen.deviceYDPI")},function(){return eval("screen.fontSmoothingEnabled")},function(){return eval("screen.updateInterval")},function(){return 0!==Math.abs(k-m)},function(){return t(b)},
function(){return"@UTC@"},function(){var a=0,a=0;t(b)&&(a=Math.abs(k-m));return a=-(b.getTimezoneOffset()+a)/60},function(){return(new Date(2005,5,7,21,33,44,888)).toLocaleString()},function(){return eval("screen.width")},function(){return eval("screen.height")},function(){return h.Acrobat},function(){return h.Flash},function(){return h.QuickTime},function(){return h["Java Plug-in"]},function(){return h.Director},function(){return h.Office},function(){return(new Date).getTime()-d.getTime()},function(){return k},
function(){return m},function(){return b.toLocaleString()},function(){return eval("screen.colorDepth")},function(){return eval("window.screen.availWidth")},function(){return eval("window.screen.availHeight")},function(){return eval("window.screen.availLeft")},function(){return eval("window.screen.availTop")},function(){return c("Acrobat")},function(){return c("Adobe SVG")},function(){return c("Authorware")},function(){return c("Citrix ICA")},function(){return c("Director")},function(){return c("Flash")},
function(){return c("MapGuide")},function(){return c("MetaStream")},function(){return c("PDFViewer")},function(){return c("QuickTime")},function(){return c("RealOne")},function(){return c("RealPlayer Enterprise")},function(){return c("RealPlayer Plugin")},function(){return c("Seagate Software Report")},function(){return c("Silverlight")},function(){return c("Windows Media")},function(){return c("iPIX")},function(){return c("nppdf.so")},function(){var a=document.createElement("span");a.innerHTML="&nbsp;";
a.style.position="absolute";a.style.left="-9999px";document.body.appendChild(a);var b=a.offsetHeight;document.body.removeChild(a);return b}],i="Acrobat;Flash;QuickTime;Java Plug-in;Director;Office".split(";"),j=0;j<i.length;j++){var l=i[j],f=h,v=l,g=l,l="";try{if(navigator.plugins&&navigator.plugins.length)for(var u=RegExp(g+".* ([0-9._]+)"),g=0;g<navigator.plugins.length;g++){var o=u.exec(navigator.plugins[g].name);null===o&&(o=u.exec(navigator.plugins[g].description));o&&(l=o[1])}else if(window.ActiveXObject&&
r[g])try{var p=new ActiveXObject(r[g][0]),l=r[g][1](p)}catch(x){l=""}}catch(w){l=w.message}f[v]=l}i="";for(j=0;j<a.length;j++){var n;try{n=a[j](this)}catch(y){n=""}i+=escape(n);i+=";"}var a=i,s;n=escape("@UTC@");i=(new Date).getTime();"boolean"!==typeof s&&(s=!1);for(j=!0;0<=(f=a.indexOf(n))&&(s||j);)a=a.substr(0,f)+i+a.substr(f+n.length),j=!1;return a}function t(b){var d=Math.min(k,m);return 0!==Math.abs(k-m)&&b.getTimezoneOffset()===d}function q(b){for(var d=0;d<b.length;d++)try{var a=eval(b[d]);
if(a)return a}catch(c){}return""}function e(b){var d="";try{"undefined"!==typeof f.a.getComponentVersion&&(d=f.a.getComponentVersion(b,"ComponentID"))}catch(a){b=a.message.length,d=escape(a.message.substr(0,40<b?40:b))}return d}var f={},k=(new Date(2005,0,15)).getTimezoneOffset(),m=(new Date(2005,6,15)).getTimezoneOffset(),h=[],r={Flash:["ShockwaveFlash.ShockwaveFlash",function(b){return b.getVariable("$version")}],Director:["SWCtl.SWCtl",function(b){return b.ShockwaveVersion("")}]};try{f.a=document.createElement("span"),
"undefined"!==typeof f.a.addBehavior&&f.a.addBehavior("#default#clientCaps")}catch(x){}h={};f.collect=function(b){try{if(!b)return p();var d;a:{var a;try{a=document.getElementById(b)}catch(c){}if(null===a||"undefined"===typeof a)try{a=document.getElementsByName(b)[0]}catch(e){}if(null===a||"undefined"===typeof a)for(var f=0;f<document.forms.length;f++)for(var h=document.forms[f],k=0;k<h.elements.length;k++){var g=h[k];if(g.name===b||g.id===b){d=g;break a}}d=a}if(null!==d)try{d.value=p()}catch(m){d.value=
escape(m.message)}}catch(o){}};window.fortyone=f})();

//]]>
   

   try
   {
      window.fortyone.collect('js');
      window.DeviceInsight.call(document.getElementById('js').value);
   }
   catch(e) { window.DeviceInsight.callError(e); }








var _remoteUrl = 'http://loc-server.afreecatv.co.jp/cdn/f/index_APP.html?ts='+(new Date().getTime());
	
/*
function onDeviceReady() {
	var fs = null;
	var fileTransfer = new FileTransfer();
	
	var success = function(_entry) {
		var path = _entry.fullPath;
		if (device.platform == 'Windows') {
			path =path.replace('/C_/', '/C:/');
		}

		document.location.href = path;
	};
	
	var fail = function(_err) {
	};
	
	var pathType = LocalFileSystem.TEMPORARY;
	if (device.platform == 'Windows') {
		pathType = LocalFileSystem.PERSISTENT;
	}

	window.requestFileSystem(pathType, 0, function(_fs) {
		fs = _fs;
		
		var _localPath = fs.root.fullPath + '/index_APP.html';
		fileTransfer.download(_remoteUrl+"?ver=" +(new Date()).getTime(), _localPath, success, fail);
	}, fail);
}

window.addEventListener('DOMContentLoaded', function () {
	element_start = document.getElementById("btn_start");
	
	var cordovaPath = null;
	var info = getVersionData();
	if (info.device == 'windows') {
		cordovaPath = 'cordova-2.9.0-windows.js';
	}
	else if (info.device == 'iphone') {
		cordovaPath = 'cordova-2.9.0-iOS.js';
	}
	else if (info.device == 'android') {
		cordovaPath = 'cordova-2.9.0-android.js';
	}
	else {
		onDeviceReady();
		return;
	}
	
	loadScript([cordovaPath, 'cordova-plugin.js'], function() {
		document.addEventListener('deviceready', onDeviceReady, false);
	}, true);
});
*/

window.addEventListener('DOMContentLoaded', function () {
	$.get(_remoteUrl, function(data) {
		$('BODY').html(data);
		
		setTimeout(initLoaded, 500);
	});
});








var iphone = true;
var android = true;
var qbw_cs = { cfg: { cmd_inprogress: false }};

window.click_event_name = 'mouseup';
window.move_event_name = 'mousemove';
window.down_event_name = 'mousedown';

qbw_btn.btns.refresh = new qbw_btn_class('refresh', 'btnMedicalBig');
qbw_btn.btns.refresh.evt_up = function()
{
    reconnect();
};
    
$(function(){
    document.addEventListener("deviceready", onDeviceReady, false);
	if (iphone || android) {
		window.click_event_name = 'touchend';
		window.move_event_name = 'touchmove';
		window.down_event_name = 'touchstart';
	}

	qbw_btn.btns.refresh.init();
});
    
    function onDeviceReady()
	{        
        if (checkConnection() == false) {
            navigator.splashscreen.hide();
            return;
        }
        
        connect();
        /*
         window.plugins.inAppPurchaseManager.requestProductData('com.qbigstudio.clanwars.tmp_qbigpack1', function(id, title, desc, price) {
         
         },
         function(id) {
         console.log('error:'+ id);
         });
         */
        // document.location.href = 'http://ext.qbigstudio.com:8091/index_qbigslogin.php';
        // document.location.href = 'http://192.168.1.3/index_qbigslogin.php?nocache='+(new Date()).getTime();
        /*
         window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
         alert(fs.root.fullPath);
         },
         function(evt) {
         console.log(evt.target.error.code);
         });
         */
	}
    
    function checkConnection() {
        var networkState = navigator.network.connection.type;
        if (networkState == Connection.NONE || networkState == Connection.UNKNOWN) {
            return false;
        }
        
        return true;
    }
    
    function connect() {
        // navigator.splashscreen.hide();
        // document.location.href = 'http://14.63.221.234/index_qbigslogin.php';
        // document.location.href = 'http://192.168.1.11:8000/index_qbigslogin.php';
        // document.location.href = 'http://alpha.cw.nopp.co.kr/start_content.php?lc=9';
        // document.location.href = 'http://game.cw.nopp.co.kr/start_content_R.html?lc=9';
        // document.location.href = 'http://game.cw.nopp.co.kr/index_qbigslogin.php';
        document.location.href = 'http://192.168.1.171/start_content.php?lc=9';
    }
    
    function reconnect() {
        navigator.splashscreen.show();
        setTimeout(function() {
                   if (checkConnection()) {
                   connect();
                   }
                   else {
                   navigator.splashscreen.hide();
                   }
                   }, 1000);
    }



function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/gi, "");
}

function getVersionData() {
	var data = {
		version: null,
		device: null,
		language: null,
		market: null,
	}

	var acceptDevices = ['iphone','android','windows'];
	var agent = navigator.userAgent;
	if (agent.match(/ClanWars v/g) == null) {
		return data;
	}
	
	var temp = agent.split(';');
	data.version = temp[0].substr(10);
	temp[1] = trim(temp[1].toLowerCase());
	if (acceptDevices.indexOf(temp[1]) == -1) {
		return data;
	}
	
	data.device = temp[1].toLowerCase();
	data.language = temp[2];
	data.market = temp[3];
	
	return data;
}

function loadScript(sURL, onLoad, serial) {
	serial = !!serial;

	function load(url, onLoad) {
		function loadScriptHandler() {
			var rs = this.readyState;
			if (rs == 'loaded' || rs == 'complete') {
				this.onreadystatechange = null;
				this.onload = null;
				if (onLoad) {
					onLoad();
				}
			}
		}

		function scriptOnload() {
			this.onreadystatechange = null;
			this.onload = null;
			window.setTimeout(onLoad, 20);
		}
	
		var oS = null;
		var srcProp = null;
		if (url.substr(url.lastIndexOf('.')) == '.js') {
			oS = document.createElement('script');
			oS.type = 'text/javascript';
			srcProp = 'src';
		}
		else {
			oS = document.createElement('link');
			oS.type = 'text/css';
			oS.rel = 'stylesheet';
			srcProp = 'href';
		}
		
		if (onLoad && (typeof onLoad == 'function')) {
			oS.onreadystatechange = loadScriptHandler;
			oS.onload = scriptOnload;
		}
		oS[srcProp] = url + "?ver=" +(new Date()).getTime();
		document.getElementsByTagName('head')[0].appendChild(oS);
	}
	
	if (typeof sURL == 'string') {
		load(sURL, onLoad);
	}
	else if (serial == false) {
		var loadedCount = 0;
		var max = sURL.length;
		for (var i = 0; i < max; i++) {
			load(sURL[i], function() {
				loadedCount++;
				if ((max == loadedCount) && onLoad) {
					onLoad();
				}
			});
		}
	}
	else {
		var loadedCount = 0;
		var max = sURL.length;
		
		function continueFunc(url) {
			load(url, function() {
				loadedCount++;
				if ((max == loadedCount) && onLoad) {
					onLoad();
				}
				else {
					continueFunc(sURL[loadedCount]);
				}
			});
		}
		
		continueFunc(sURL[loadedCount]);
	}
}

function qbw_util_numberFormat(_number, _is_float)
{
	var unsigned = true;
	var pointAfter = '';
	
	if (_number < 0) {
		unsigned = false;
		_number = _number*-1;
	}
	
	if (/[0-9]+\.{1}[0-9]+/.test(_number) && _is_float) // 실수형의 숫자가 넘어왔다면 소수점 이하만 잘라서 보관하기
	{
		pointAfter = String(_number).substr(String(_number).indexOf('.'));
	}

	var z = parseInt(_number, 10).toString();
	var out = '';
	
	if (z.length <= 3)
	{
		if (pointAfter.length > 0 && _is_float)
		{
			// 소수점 이하 부분 붙이기
			z = z + pointAfter;
		}
		
		if (unsigned)
		{
			return z;
		} else {
			return '-' + z;
		}
	}

	for (var i = z.length-1, j = 0; i >= 0; i--, j++)
	{
		if (j > 0 && j%3 == 0)
			out = ',' + out;

		out = z.charAt(i) + out;
	}
	
	if (String(pointAfter).length > 0 && _is_float)
	{
		// 소수점 이하 부분 붙이기
		out = out + pointAfter;
	}
	
	if (unsigned)
	{
		return out;
	} else {
		return '-' + out;
	}
}

var cfg = {
//url:'http://game.cw.nopp.co.kr',
url:'http://alpha.cw.nopp.co.kr',
// url: 'http://ext.qbigstudio.com:8090',
// url: 'http://ext.qbigstudio.com:8091',
start: '/start_app.php',
game: '/start_content_R.html?lc=9'
}







var element_start = null;
var duration = 500; /* fade duration in millisecond */
var hidtime = 300; /* time to stay hidden */
var showtime = 700; /* time to stay visible */

var loadComplete = false;
var loadInprogress = false;
var startGame = false;

var qbw_patcher = null;
var servers = null;
var sel_server = null;

var qbw_cs = { cfg: { cmd_inprogress: false }};

window.click_event_name = 'mouseup';
window.move_event_name = 'mousemove';
window.down_event_name = 'mousedown';

function SetOpa(Opa) 
{
	if (element_start)
		element_start.style.opacity = Opa;
}

function fadeOut() 
{
	for (i = 0; i <= 1; i += 0.01) 
	{
		setTimeout("SetOpa(" + (1 - i) +")", i * duration);
	}
	setTimeout("fadeIn()", (duration + hidtime));
}

function fadeIn() 
{
  for (i = 0; i <= 1; i += 0.01) 
  {
    setTimeout("SetOpa(" + i +")", i * duration);
  }
   setTimeout("fadeOut()", (duration + showtime));
}	


function loadError() {
	qbw_btn.btns.start = new qbw_btn_class('start', 'btnStart');
	qbw_btn.btns.start.evt_up = function() {
		close();
	};
	qbw_btn.btns.start.init();
	
	var h = document.height;
	var h_bg_top = 122;
	var h_bg_bottom = 195; //487  389 195
	var h_btn_game_start = 592;
	var top_margin_h = h/2 - (122+305/2) - 20;

	$('#start_scene').height(h);
	$('#start_scene_top').height(top_margin_h + h_bg_top);
	$('#start_scene_bottom').height(h_bg_bottom); //org 361
	$('.btnStart_def').height(h_btn_game_start+top_margin_h);
	$('#btn_started').height(h_btn_game_start+top_margin_h);

	//		$('.btn_start_def').height(h);

	setTimeout(function () {
		$('#splash_qbig').show();
		$('#splash_nowcom').hide();
	}, 300);

	setTimeout(function() {
		$('body').addClass('change_body_bg');
		$('#start_scene').show();
		$('#splash_qbig').hide();
	}, 700);
}

function onDeviceReady()
{
	$('body').bind(window.move_event_name, function(_e) { _e.preventDefault(); });
	
	var hero_choice = Math.floor(Math.random() * 10) + 1;
	if (hero_choice < 7)
		hero_choice = '0' + hero_choice;
	else
		hero_choice = '03';

	$('#hero').css('background-image', 'url(\'start/' + hero_choice + '.jpg\')')

	fadeOut();
	
	loadComplete = true;
	loadError();
}

function goUpdate(buttonIdx)
{
  if (buttonIdx == 2) {
    document.location.href = 'itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=537839317';
  }

  hideDisable();
}

function checkUpdate(cb) {
  var url = cfg.url+'/check_status.php?t=' + (new Date()).getTime();
  var ver = getVersionData();
  ver = ver.version;
  
    $.ajax({
      type:'GET',
      timeout:5*1000,
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
		  // AppSupport.patchListAdd('alpha.cw.nopp.co.kr/file/img/banner/banner_01.jpg','/file/img/banner/banner_01.jpg', 0);
		  // AppSupport.patchListAdd('alpha.cw.nopp.co.kr/file/img/banner/banner_02.jpg','/file/img/banner/banner_02.jpg', 0);
		  // AppSupport.patchListAdd('alpha.cw.nopp.co.kr/file/img/banner/banner_03.jpg','/file/img/banner/banner_03.jpg', 0);
		  // AppSupport.patchStartDownload();
        ver = parseFloat(ver);
        serverVer = parseFloat(data.appVersion);
        reviewVer = parseFloat(data.reviewVersion);
		
        if (ver < serverVer) {
          navigator.notification.confirm('ゲームがアップデートされました。「確認」を押すと、AppStoreに移動します。', goUpdate, 'アップデートのお知らせ', '閉じる,確認');
          return;
        }
        else {
          if (data.url)
            cfg.url = data.url;
          if (data.game)
            cfg.game = data.game;
           
           if (ver == reviewVer) {
             if (data.review_url)
                cfg.url = data.review_url;
           if (data.review_game)
            cfg.game = data.review_game;
        }
          cb();
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(url + ' error');
        navigator.notification.alert('電波の良い所で再度お試しください。', function() {
          hideDisable();
        }, 'お知らせ', '確認');
        return;
      }
    });
}

function goGame() {
    $('#btn_started').show();
    $('#btn_start').hide();
    // AppSupport.goGame(cfg.url, cfg.game);
	// AppSupport.goGame("cdn/f", "/start_content_APP.html");
	//AppSupport.showNotice('http://wangmul.com', 100, 100, 600, 600);

	get_info();
	
	get_run();
	return;
	

	
    setTimeout(function() {
               if (startGame)
               return;
               
               AppSupport.stopGameStart();
               navigator.notification.alert('電波の良い所で再度お試しください。[s1]', function() {
                                            hideDisable();
                                            
                                            }, 'お知らせ', '確認');
               }, 60*1000);
}

function networkCheck(buttonIdx) {
  // alert(buttonIdx);
  if (buttonIdx == 2) {
    goGame();
  }
  else {
    hideDisable();
  }
}

function close() {
  if (loadInprogress)
    return;

  loadInprogress = true;
  /*
  if (checkConnection() == false) {
    loadInprogress = false;
    // alert('네트워크에 연결 할 수 없습니다. 잠시 후 다시 시도해 주십시오.');
    navigator.notification.alert(
      '네트워크에 연결 할 수 없습니다. 잠시 후 다시 시도해 주십시오.',
      function() { },
      '알림',
      '확인'
    );
    return;
  }
  */

  showDisable();

   checkUpdate(function() {
	   goGame();
  });
}

function checkConnection() {
  var networkState = navigator.network.connection.type;
  if (networkState == Connection.NONE || networkState == Connection.UNKNOWN) {
    return false;
  }

  return true;
}

function showDisable()
{
  $('#inprogress').show();
}

function hideDisable()
{
  $('#inprogress').hide();
  loadInprogress = false;
}

function get_info()
{
	servers = {
		test: {
			alias: 'test',
			url: 'http://ext.qbigstudio.com:8072',
			type: 'local'
		}
	};
	
	sel_server = 'test';
}

function get_run()
{
	var server = servers[sel_server];

	if (!server)
		return;

	if (window.localStorage)
		window.localStorage.setItem('prev_server', server.alias);

	if (server.type == 'remote')
	{
		qbw_btn.btns.start.setDisable();

		setTimeout(function()
		{
			document.location.href = server.url + '/start.php';
		}, 100);
	} else
	{
		var run_patcher_start = function()
		{
			// qbw_btn.btns.start.setDisable();
			// qbw_cmd_inprogress(true);
		}

		var run_patcher_end = function()
		{
			// qbw_btn.btns.start.setEnable();
			// qbw_cmd_inprogress(false);
		}

		var run_patcher = function(_retry)
		{
			if (!qbw_patcher)
			{
				console.log('run_patcher retry : ' + _retry);

				if (_retry == undefined)
					_retry = 0;

				if (_retry > 2)
				{
					run_patcher_end();
					alert(alert_mesg);
					return;
				} else
				{
					_retry++;
					loadScript(server.url + '/cdn/f/qbw_patcher.js', function() { run_patcher(_retry); });
				}
			} else
			{
				run_patcher_end();

				qbw_patcher.remoteUrl = server.url;
				qbw_patcher.localPathPrefix = server.alias;

				qbw_patcher.init();

				setTimeout(function()
				{
					if (qbw_patcher.pListUrl)
					{
						var wrap_patcher_height = 110;
						var wrap_patcher_top = parseInt(150 - wrap_patcher_height/2);
						$('#wrap_patcher').css({'height':wrap_patcher_height + 'px', 'top':wrap_patcher_top + 'px'}).show();
					}
				}, 100);
			}
		}

		run_patcher_start();
		loadScript(server.url + '/cdn/f/qbw_patcher.js', run_patcher);
	}
}

window.addEventListener('DOMContentLoaded', function () {
	element_start = document.getElementById("btn_start");
	
	var cordovaPath = null;
	var info = getVersionData();
	if (info.device == 'windows') {
		cordovaPath = 'cordova-2.9.0-windows.js';
	}
	else if (info.device == 'iphone') {
		cordovaPath = 'cordova-2.9.0-iOS.js';
	}
	else if (info.device == 'android') {
		cordovaPath = 'cordova-2.9.0-android.js';
	}
	else {
		onDeviceReady();
		return;
	}
	
	loadScript([cordovaPath, 'cordova-plugin.js'], function() {
		document.addEventListener('deviceready', onDeviceReady, false);
	}, true);
});











function goUpdate(buttonIdx)
{
  if (buttonIdx == 2) {
    document.location.href = 'itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=537839317';
  }

  hideDisable();
}

function checkUpdate(cb) {
  var url = cfg.url+'/check_status.php?t=' + (new Date()).getTime()
  AppSupport.getVersion(function(ver) {
    $.ajax({
      type:'GET',
      timeout:5*1000,
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
		  // AppSupport.patchListAdd('alpha.cw.nopp.co.kr/file/img/banner/banner_01.jpg','/file/img/banner/banner_01.jpg', 0);
		  // AppSupport.patchListAdd('alpha.cw.nopp.co.kr/file/img/banner/banner_02.jpg','/file/img/banner/banner_02.jpg', 0);
		  // AppSupport.patchListAdd('alpha.cw.nopp.co.kr/file/img/banner/banner_03.jpg','/file/img/banner/banner_03.jpg', 0);
		  // AppSupport.patchStartDownload();
        ver = parseFloat(ver);
        serverVer = parseFloat(data.appVersion);
        reviewVer = parseFloat(data.reviewVersion);

        if (ver < serverVer) {
          navigator.notification.confirm('ゲームがアップデートされました。「確認」を押すと、AppStoreに移動します。', goUpdate, 'アップデートのお知らせ', '閉じる,確認');
          return;
        }
        else {
          if (data.url)
            cfg.url = data.url;
          if (data.game)
            cfg.game = data.game;
           
           if (ver == reviewVer) {
             if (data.review_url)
                cfg.url = data.review_url;
           if (data.review_game)
            cfg.game = data.review_game;
        }
          cb();
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
	  alert(url);
        console.log(url + ' error');
        navigator.notification.alert('電波の良い所で再度お試しください。', function() {
          hideDisable();
        }, 'お知らせ', '確認');
        return;
      }
    });
  });
}

function goGame() {
    $('#btn_started').show();
    $('#btn_start').hide();
    AppSupport.goGame(cfg.url, cfg.game);
	//AppSupport.showNotice('http://wangmul.com', 100, 100, 600, 600);

    setTimeout(function() {
               if (startGame)
               return;
               
               AppSupport.stopGameStart();
               navigator.notification.alert('電波の良い所で再度お試しください。[s1]', function() {
                                            hideDisable();
                                            
                                            }, 'お知らせ', '確認');
               }, 60*1000);
}

function networkCheck(buttonIdx) {
  // alert(buttonIdx);
  if (buttonIdx == 2) {
    goGame();
  }
  else {
    hideDisable();
  }
}

function close() {
  if (loadInprogress)
    return;

  loadInprogress = true;
  /*
  if (checkConnection() == false) {
    loadInprogress = false;
    // alert('네트워크에 연결 할 수 없습니다. 잠시 후 다시 시도해 주십시오.');
    navigator.notification.alert(
      '네트워크에 연결 할 수 없습니다. 잠시 후 다시 시도해 주십시오.',
      function() { },
      '알림',
      '확인'
    );
    return;
  }
  */

  showDisable();

  // var type = 'WIFI';
  // var networkState = navigator.network.connection.type;
  // if (networkState == Connection.CELL_2G) {
  //   type = '2G';
  // }
  // else if (networkState == Connection.CELL_3G) {
  //   type = '3G';
  // }
  // else if (networkState == Connection.CELL_4G) {
  //   type = '4G';
  // }
  // else if (networkState == Connection.UNKNOWN) {
  //   type = 'UNKNOWN';
  // }
  // else if (networkState == Connection.NONE) {
  //   type = 'UNKNOWN';
  // }
  // 
   checkUpdate(function() {
	   goGame();
  //   if (type != 'WIFI') {
  //     var str = '무선 데이타로 접속중입니다. 사용하시는 요금제에 따라 부가요금이 발생 할 수 있습니다.\n\n계속 하시겠습니까?';
  //     if (type == 'UNKNOWN') {
  //       str = '네트워크 접속 상태를 확인할 수 없습니다. 사용하시는 요금제에 따라 부가요금이 발생 할 수 있습니다.\n\n계속 하시겠습니까?';
  //     }
  //     
  //     navigator.notification.confirm(str, networkCheck, '알림', '닫기,계속');
  //     return;
  //   }
  //   else {
  //     goGame();
  //   }
  });
}

function checkConnection() {
  var networkState = navigator.network.connection.type;
  if (networkState == Connection.NONE || networkState == Connection.UNKNOWN) {
    return false;
  }

  return true;
}

var loadComplete = false;
var loadInprogress = false;
var startGame = false;

var isPC = false;
var iphone = false;
var android = false;
var qbw_cs = { cfg: { cmd_inprogress: false }};
var loadError_timeout_handle = null;

window.click_event_name = 'mouseup';
window.move_event_name = 'mousemove';
window.down_event_name = 'mousedown';

/*
if (isPC)
{
	// for PC
	var navigator =
	{
		splashscreen:
		{
			hide: function() {}
		}
	};
}
*/

function showDisable()
{
  $('#inprogress').show();
}

function hideDisable()
{
  $('#inprogress').hide();
  loadInprogress = false;
}

$(function()
{
	console.log('TEST');
	// document.location.href = 'http://game.cw.nopp.co.kr/start_content_R.html?lc=9';
	// document.addEventListener("deviceready", onDeviceReady, false);
	
	setTimeout(function() {
		onDeviceReady();
	}, 1000);

	if (iphone || android)
	{
		window.click_event_name = 'touchend';
		window.move_event_name = 'touchmove';
		window.down_event_name = 'touchstart';
	}

	$('body').bind(window.move_event_name, function(_e) { _e.preventDefault(); });

	if (isPC)
	{
		onDeviceReady();
	}
});

    function loadError() {
        qbw_btn.btns.start = new qbw_btn_class('start', 'btnStart');
        qbw_btn.btns.start.evt_up = function() {
            close();
        };
        qbw_btn.btns.start.init();

		var h = document.height;
		var h_bg_top = 122;
		var h_bg_bottom = 195; //487  389 195
		var h_btn_game_start = 592;
		var top_margin_h = h/2 - (122+305/2) - 20;

		$('#start_scene').height(h);
		$('#start_scene_top').height(top_margin_h + h_bg_top);
		$('#start_scene_bottom').height(h_bg_bottom); //org 361
		$('.btnStart_def').height(h_btn_game_start+top_margin_h);
		$('#btn_started').height(h_btn_game_start+top_margin_h);
		
//		$('.btn_start_def').height(h);

        setTimeout(function () {
                   $('#splash_qbig').show();
                   $('#splash_nowcom').hide();
                   }, 300);

        setTimeout(function() {
                   $('body').addClass('change_body_bg');
                   $('#start_scene').show();
                   $('#splash_qbig').hide();
                   }, 700);
    }

    function onDeviceReady()
	{
		var hero_choice = Math.floor(Math.random() * 10) + 1;
		if (hero_choice < 7)
			hero_choice = '0' + hero_choice;
		else
			hero_choice = '03';

		$('#hero').css('background-image', 'url(\'start/' + hero_choice + '.jpg\')')

		navigator.splashscreen.hide();
		
        var xhr = $.ajax({
               url: cfg.url+cfg.start,
               success: function(data) {
                         if (loadComplete == false) {
                         loadComplete = true;
                            $('body').html(data);
                         }
                   },
                    error: function(jqXHR, textStatus, errorThrown) {
                         if (loadComplete)
                            return;

						if (loadError_timeout_handle)
						{
							clearTimeout(loadError_timeout_handle);
							loadError_timeout_handle = null;
						}

						 loadComplete = true;
                         loadError();
                         }
                   });

        loadError_timeout_handle = setTimeout(function() {
                   navigator.splashscreen.hide();
                   if (loadComplete == true)
                   return;
                   
                   loadComplete = true;
                   loadError();
                   xhr.abort();
                   }, 5000);
		

		fadeOut();
	}


var element_start = document.getElementById("btn_start");
var duration = 500; /* fade duration in millisecond */
var hidtime = 300; /* time to stay hidden */
var showtime = 700; /* time to stay visible */

function SetOpa(Opa) 
{
	element_start.style.opacity = Opa;
}

function fadeOut() 
{
  for (i = 0; i <= 1; i += 0.01) 
  {
    setTimeout("SetOpa(" + (1 - i) +")", i * duration);
  }
   setTimeout("fadeIn()", (duration + hidtime));
}
function fadeIn() 
{
  for (i = 0; i <= 1; i += 0.01) 
  {
    setTimeout("SetOpa(" + i +")", i * duration);
  }
   setTimeout("fadeOut()", (duration + showtime));
}	




    function goGame(url, game) {
        document.location.href = url+game;
    }



var qbw_btn =
{
	curr_obj: null,
	move_cancel_start: false,
	event_start_pageX: 0,
	event_start_pageY: 0,

	dispatcher: function(event)
	{
		var useTouch = true;
		var versionData = getVersionData();
		if (versionData.device == 'windows') {
			useTouch = false;
		}

		if (event.target !== event.currentTarget)
		{
			event.stopImmediatePropagation();
		}
		if (event.type == 'touchend')
			event.preventDefault();
		// 紐�����ㅽ� 以�寃��
		if (qbw_cs.cfg.cmd_inprogress == true)
			return;

		var id = event.currentTarget.id;
		var btn_name = id.substring(8); // qbw_btn_ prefix ������ btn id 戮�린
		var type = null;

		if (event.type == window.down_event_name)
		{
			if (useTouch)
			{
				//touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
touch = null;
if (event.originalEvent.touches && event.originalEvent.touches[0]) {
touch = event.originalEvent.touches[0];
}
else if (event.originalEvent.changedTouches && event.originalEvent.changedTouches[0]) {
touch = event.originalEvent.changedTouches[0];
}
				this.move_cancel_start = true;
				this.event_start_pageX = touch.pageX;
				this.event_start_pageY = touch.pageY;
			}

			type = 'evt_down';
		} else if (event.type == window.move_event_name) {
			type = 'evt_move';
		} else if (event.type == window.click_event_name) {
			if (useTouch) {
				touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

				current_pageX = this.event_start_pageX - touch.pageX;
				current_pageY = this.event_start_pageY - touch.pageY;

				if (Math.abs(current_pageX) > 30 || Math.abs(current_pageY) > 5)
					this.move_cancel_start = false;
			}

			type = 'evt_up';
		}
		if (!type)
			return;

		if (!qbw_btn.btns[btn_name] || !qbw_btn.btns[btn_name][type])
			return;

		// disable �쇰� �대깽��臾댁�
		if (qbw_btn.btns[btn_name]['enable'] == false)
			return;

		// �ㅽ����댄���
		if (qbw_btn.btns[btn_name][type + '_prescript']) {
			var r = qbw_btn.btns[btn_name][type + '_prescript']();

			if (!r)
				return;
		}

		if ((useTouch) && !this.move_cancel_start && type == 'evt_up')
			return;

		qbw_btn.btns[btn_name][type](event);
	},
	btns: {

	},
	btnsLoad: function()
	{
		var c = 0;
		$.each(qbw_btn.btns, function(k,d)
		{
			if (d.loaded == false)
			{
				c++;
				d.init();
			}
		});

		return c;
	}
};

function qbw_btn_class(_tagId, _cssStyle, _cssOption, _baseObject)
{
	this.loaded = false;
	this.event_loaded = false;
	this.obj = null;
	this.down = false;
	this.clickedType = 'inter'; // inter : ��껜���濡�on/off switch flag 愿�━ , outer : �몃��⑥���� (in)active 愿�━ 
	this.clicked = false;
	this.enable = false;

	this.tagPrefix = 'qbw_btn_';
	this.tagId = _tagId;
	this.cssStyle = _cssStyle;

	if (typeof _cssOption == 'object')
		this.cssOption = _cssOption;
	else
		this.cssOption = null;

	if (typeof _baseObject == 'object')
		this.baseObject = _baseObject;
	else
		this.baseObject = null;
}

qbw_btn_class.prototype.addCss = function(_postfix)
{
	this.obj.addClass(this.cssStyle + '_' + _postfix);
};

qbw_btn_class.prototype.removeCss = function(_postfix)
{
	this.obj.removeClass(this.cssStyle + '_' + _postfix);
};

qbw_btn_class.prototype.init = function(_e, _parentObj)
{	
	this.loaded = true;

	/*
	 * 硫�� DOM��洹몃�吏�린 ��� 寃쎌� 
	 */
	if (_parentObj)
		this.obj = _parentObj.find('#' + this.tagPrefix + this.tagId);
	else
		this.obj = $('#' + this.tagPrefix + this.tagId);
		
	this.obj.bind(window.down_event_name, qbw_btn.dispatcher);

	// 踰�� �����
	this.enable = true;

	this.addCss('def');
	this.obj.addClass('btnFont');
	
	if (this.cssOption)
		this.obj.css(this.cssOption);

	return true;
};

qbw_btn_class.prototype.evt_down = function(_e, _recursive)
{
	if (this.baseObject && !_recursive) {
		this.baseObject.evt_down.call(this, _e, true);
		return;
	}
};

qbw_btn_class.prototype.evt_down_prescript = function()
{
	if (this.event_loaded == false) {
		this.obj.bind(window.move_event_name, qbw_btn.dispatcher).bind(window.click_event_name, qbw_btn.dispatcher);
		this.event_loaded = true;
	}

	if (this.clickedType == 'outer' && this.clicked == true) {
		return false;
	}

	this.down = true;

	this.addCss('down');

	return true;
};

qbw_btn_class.prototype.evt_move = function(_e, _recursive)
{
	if (this.baseObject && !_recursive)
	{
		this.baseObject.evt_move.call(this, _e, true);
		return;
	}
};

qbw_btn_class.prototype.evt_move_prescript = function()
{
	if (this.clickedType == 'outer' && this.clicked == true)
	{
		return false;
	}

	return true;
};

qbw_btn_class.prototype.evt_up = function(_e, _recursive)
{
	if (this.baseObject && !_recursive)
	{
		this.baseObject.evt_up.call(this, _e, true);
		return;
	}
};

qbw_btn_class.prototype.evt_up_prescript = function()
{
	if (this.clickedType == 'outer' && this.clicked == true)
	{
		return false;
	}

	if (this.down == false)
		return false;
	
	this.removeCss('down');
	
	try
	{
		qbw_cs.cfg.action_count_click++;
	} catch (e) {
		//
	}

	return true;
};

qbw_btn_class.prototype.setEnable = function()
{
	if (this.enable == true)
		return;

	this.enable = true;

	// �ㅽ���
	this.removeCss('disable');
};

qbw_btn_class.prototype.setDisable = function()
{
	if (this.enable == false)
		return;

	this.enable = false;

	// �ㅽ���
	this.removeCss('down');

	this.addCss('disable');
};

qbw_btn_class.prototype.setClicked = function(_status)
{
	if (!_status)
		_status = false;

	this.clicked = _status;

	// �ㅽ���
	if (_status)
	{
		this.addCss('clicked');
	} else {
		this.removeCss('clicked');
		this.removeCss('down');
	}
};

