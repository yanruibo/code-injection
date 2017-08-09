

var Echo = function() {
};

//-------------------------------------------------------------------

//-------------------------------------------------------------------
Echo.prototype.echo = function(successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function() {}}
    
    if (typeof errorCallback != "function")  {
        console.log("HKUApp Log Error");
        return
    }
    
    if (typeof successCallback != "function") {
        console.log("HKUApp log OK");
        return
    }
    
    cordova.exec(successCallback, errorCallback, 'HKUApp', 'echo', [{"a":"b"}]);
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.echo) {
    window.plugins.echo = new Echo();
}


cordova.define("cordova/plugin/videoplayer",
  function(require, exports, module) {
    var exec = require("cordova/exec");
    var VideoPlayer = function () {};

    /**
     * Starts the video player intent
     *
     * @param url           The url to play
     */
    VideoPlayer.prototype.play = function(url) {
        exec(null, null, "hk.hku.its.hkuuvision.videoplugin", "playVideo", [url]);
    };

    var videoPlayer = new VideoPlayer();
    module.exports = videoPlayer;
});

if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.videoPlayer) {
    window.plugins.videoPlayer = cordova.require("cordova/plugin/videoplayer");
}















			$(function() {

			});

		

			function loadDailytv() {
				//$("#index_video").html("<iframe src='dailytv/index.php' width=100% height=100% frameborder=0 name='dailytv'/>");
				// window.open('dailytv2/index.php', 'dailytv');
			}

			var carousel1;
			var carousel2;
			var scrollIdx = 0;
			var scrolling = 0;
			var resizing = 0;
			var scrollTarget = new Array();
			scrollTarget[0] = "#webheader";
			scrollTarget[1] = "#yellow";
			scrollTarget[2] = ".wuv";

			$(function() {
				//alert($(window).width());
				$(window).load(function() {
					setTimeout("setIndexRedraw()", 200);
				});
			});

			function setIndexRedraw() {
				if (resizing == 1) {
					return;
				}
				resizing = 1;

				//set_banner();
				//relocationArrow();
				calculateHeight();
				//setTimeout("donotpullpos()", 200);

				carousel1 = $("#carousel-image-and-text1").touchCarousel({
					pagingNav : false,
					snapToItems : false,
					//itemsPerMove : 4,
					scrollToLast : false,
					loopItems : true,
					scrollbar : false
				}).data("touchCarousel");

				carousel2 = $("#carousel-image-and-text2").touchCarousel({
					pagingNav : false,
					snapToItems : false,
					//itemsPerMove : 4,
					scrollToLast : false,
					loopItems : true,
					scrollbar : false
				}).data("touchCarousel");

				//loadLatestVideo();
				//loadLatestPoster();
				setTimeout(function() {
					setBanner();
				}, 500);
				resizing = 0;
			}


			$(document).ready(function() {
				setBanner();
				index_flag = true;
				if ($.fn.cssOriginal != undefined) {
					$.fn.css = $.fn.cssOriginal;

					$(".caption_style").css("width", $(".banner").width());

				} else {
					$(window).resize(function() {
						//setIndexRedraw();
					});
				}
			});

			function oldbanner() {
				$('.banner').revolution({
					delay : 15000,
					onHoverStop : "on",
					thumbWidth : 100,
					thumbHeight : 50,
					thumbAmount : 3,
					hideThumbs : 0,
					startwidth : 320,
					startheight : 200,
					navigationType : "bullet",
					navigationArrows : "none",
					navigationStyle : "round",
					navigationHAlign : "center",
					navigationVAlign : "bottom",
					navigationHOffset : 0,
					navigationVOffset : -30,
					touchenabled : "on",
					stopAtSlide : -1,
					stopAfterLoops : -1,
					hideCaptionAtLimit : 0,
					hideAllCaptionAtLilmit : 0,
					hideSliderAtLimit : 0,
					shadow : 0
				});
			}

			function setBanner() {
				$(".banner").css('height', bHeight + 'px');
				var winWidth = $(window).width();
				var bHeight = winWidth * 9 / 16;
				$('.banner').revolution({
					delay : 15000,
					forceFullWidth : "off",
					fullWidth : "on",
					autoHeight : "on",
					onHoverStop : "on",
					thumbWidth : 100,
					thumbHeight : 50,
					thumbAmount : 3,
					hideThumbs : 0,
					startwidth : winWidth,
					startheight : bHeight,
					navigationType : "bullet",
					navigationArrows : "none",
					navigationStyle : "round",
					navigationHAlign : "center",
					navigationVAlign : "bottom",
					navigationHOffset : 0,
					navigationVOffset : -30,
					touchenabled : "on",
					stopAtSlide : -1,
					stopAfterLoops : -1,
					hideCaptionAtLimit : 0,
					hideAllCaptionAtLilmit : 0,
					hideSliderAtLimit : 0,
					shadow : 0

				});
			}

			function display_it(obj, add_class) {
				$(obj).find("." + add_class).removeClass("notshow");
			}

			function hide_it(obj, add_class) {
				$(obj).find("." + add_class).addClass("notshow");
			}

			function scroll_display_it(obj) {
				$(obj).find(".scrollbar-holder").removeClass("notshow");
			}

			function scroll_hide_it(obj) {
				$(obj).find(".scrollbar-holder").addClass("notshow");
			}

			function calculateHeight() {
				// Calculate Height;

				//$(".footerdiv").css("width", $(window).width()-20 + "px");
				//$(".copyright").css("width", $(window).width()-40 + "px");

				if ($(window).width() > 568) {

					var winWidth = $(window).width();

					carouselWidth = (winWidth - 30) / 2;
					carouselHeight = carouselWidth / 16 * 9;
					//$(".item-block").css("width", carouselWidth + "px");
					//$(".item-block").css("height", (carouselHeight + 66) + "px");

					$(".touchcarousel-item").css("width", "300px");
					// carouselWidth +
					//$(".touchcarousel-item").css("height", (carouselHeight + 66) + "px");
					$(".touchcarousel-item").css("height", "auto");

					//$(".whatisuvbox_text").css("width", (carouselWidth - 30) + "px");

					$(".touchcarousel").css("width", winWidth + "px");
					$(".touchcarousel").css("margin-left", "0px");
				} else {
					$(".touchcarousel-item:first").css("margin-left", "0px");
				}

				//$("#index_video").css("min-height", $("#banner").height + 30 + "px");
				carouselMargin = $(window).width() - ($(".touchcarousel-item").width() * 2);

				if (carouselMargin < 0) {
					carouselMargin = 30;
					// ($(".bannercontainer").width() - $(".touchcarousel-item").width()) / 4;
					$(".touchcarousel-item").css("margin-left", "");
				} else {
					$(".touchcarousel-item").css("margin-left", "");
				}
				$(".touchcarousel-item").css("margin-right", "10px");
				//(carouselMargin) +
				$(".touchcarousel-container").css("width", ($(".touchcarousel-item").width() + carouselMargin) * 10 + "px");
				//$(".videocarousel").css("width", ($(".videocarousel").width() + carouselMargin) * $(".videocarousel" ).children().length +"px");
				//$(".postercarousel").css("width", ($(".postercarousel").width() + carouselMargin) * $(".postercarousel" ).children().length +"px");

				//////////
				// Start handle scroller page.
				/////
				$(".banner").css('height', winWidth * 9 / 16 + 'px');

			}

			function clickHighlight(id) {
				var detaillink = "detail.html?mid=" + id;
				//alert(detaillink);
				document.location.href = detaillink;
			}

			function relocationArrow() {
				var video_pos = $("#carousel-image-and-text1").offset();
				var shift;
				var lshift = 0;
				var vshift = 0;
				if ($(window).width() > 1025) {
					shift = 18;
					lshift = 0;
					vshift = 40;
				} else if ($(window).width() > 568 && $(window).width() <= 1025) {
					shift = -20;
					lshift = 35;
					vshift = video_pos - 60;
				}
				$("#video_index_arrow_left").offset({
					top : video_pos.top + 60 + vshift,
					left : video_pos.left - 35 + lshift
				});
				$("#video_index_arrow_right").offset({
					top : video_pos.top + 60 + vshift,
					left : video_pos.left + $("#carousel-image-and-text1").width() + shift
				});
				var poster_pos = $("#carousel-image-and-text2").offset();
				$("#poster_index_arrow_left").offset({
					top : poster_pos.top + 60 + vshift,
					left : poster_pos.left - 35 + lshift
				});
				$("#poster_index_arrow_right").offset({
					top : poster_pos.top + 60 + vshift,
					left : poster_pos.left + $("#carousel-image-and-text2").width() + shift
				});
				$("#video_index_arrow_left").css("visibility", "visible");
				$("#video_index_arrow_right").css("visibility", "visible");
				$("#poster_index_arrow_left").css("visibility", "visible");
				$("#poster_index_arrow_right").css("visibility", "visible");
			}

			function set_banner() {
				$('.banner').revolution({
					delay : 15000,
					onHoverStop : "on",
					thumbWidth : 100,
					thumbHeight : 50,
					thumbAmount : 3,
					hideThumbs : 0,
					startwidth : 706,
					startheight : 397,
					navigationType : "bullet",
					navigationArrows : "none",
					navigationStyle : "round",
					navigationHAlign : "center",
					navigationVAlign : "bottom",
					navigationHOffset : 0,
					navigationVOffset : -30,
					touchenabled : "on",
					stopAtSlide : -1,
					stopAfterLoops : -1,
					hideCaptionAtLimit : 0,
					hideAllCaptionAtLilmit : 0,
					hideSliderAtLimit : 0,
					fullWidth : "on",
					shadow : 0
				});
				$("#index_video").css("height", $('.banner').height() + 50);
			}

			function loadLatestPoster() {
				$("#latestposter").smoothDivScroll({
					mousewheelScrolling : "allDirections",
					touchScrolling : true
				});
			}

			function loadLatestVideo() {
				$("#latestvideo").smoothDivScroll({
					mousewheelScrolling : "allDirections",
					touchScrolling : true
				});
			}

		










var uvplugin = {
    
    callNativeFunction: function (success, fail, resultType) {
    	return cordova.exec(success, fail, "hk.hku.its.hkuuvision.uvplugin", "nativeAction", [resultType]);
    }
};

function callNativePlugin( returnSuccess ) { 
    uvplugin.callNativeFunction( nativePluginResultHandler, nativePluginErrorHandler, returnSuccess ); 
} 
function nativePluginResultHandler (result) { 
   //alert("SUCCESS: \r\n"+result ); 
} 
function nativePluginErrorHandler (error) { 
   //alert("ERROR: \r\n"+error ); 
} 



var browserplugin = {
    
    callNativeFunction: function (success, fail, resultType) {
    	return cordova.exec(success, fail, "hk.hku.its.hkuuvision.browserplugin", "nativeAction", [resultType]);
    }
};


function callbrowserplugin(url) { 
    browserplugin.callNativeFunction( nativePluginResultHandler, nativePluginErrorHandler, url); 
} 







		var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
		
		if(iOS) {
			$.getScript( "cordova.js" );
			$.getScript( "scripts/iosfunctions.js" );
			$.getScript( "opensafari.js" );
			$.getScript( "echo.js" );
			$.getScript( "barcodescanner.js" );
		}else{
			$.getScript( "cordova-2.3.0.js" );
			$.getScript( "scripts/androidfunctions.js" );
			$.getScript( "uvplugin.js" );
			$.getScript( "videoplugin.js" );
			$.getScript( "barcodescanner.js" );
		}

		function changeMainFrame(url) {
			var h =$(window).height();
			$("#mainframe").css("height", h - 50 + "px");
			$("#mainframe").attr('src', url);
			closeMenu();
		}
	
		function change_submenu_icon(element){
			if ( document.getElementById(element).className.match(/(?:^|\s)fa-plus(?!\S)/) ){
				document.getElementById(element).className = document.getElementById(element).className.replace( /(?:^|\s)fa-plus(?!\S)/g , '' );
				document.getElementById(element).className += " fa-minus";
			} else if ( document.getElementById(element).className.match(/(?:^|\s)fa-minus(?!\S)/) ){
				document.getElementById(element).className = document.getElementById(element).className.replace( /(?:^|\s)fa-minus(?!\S)/g , '' );
				document.getElementById(element).className += " fa-plus";
			}
		}


		function goOpenSafari_iframe(url){
			goOpenSafari(url);
		}
	











    function scanQrcodethis(){
        parent.scanQrcode();
    }

    










function senddata() {

	if (document.getElementById('firstName').value == "" || document.getElementById('lastName').value == "" || document.getElementById('email').value == "" || document.getElementById('subject').value == "" || document.getElementById('message').value == "") {
		document.getElementById("firstName").style.borderColor = "#FF0000";
		document.getElementById("lastName").style.borderColor = "#FF0000";
		document.getElementById("message").style.borderColor = "#FF0000";
		document.getElementById("email").style.borderColor = "#FF0000";
		document.getElementById("subject").style.borderColor = "#FF0000";
		document.getElementById('noemptyinfo').style.display = "block";

	} else {
		document.getElementById('thankyou').style.display = "block";
		document.getElementById('form_after_thank').style.display = "none";
		//document.getElementById('form_after_thank').style.display = "none";
		
		Ext.Ajax.request({
			url : 'http://147.8.135.16/mobilesupport/contactform.php',
			params : {
				firstName : document.getElementById('firstName').value,
				lastName : document.getElementById('lastName').value,
				organization : document.getElementById('organization').value,
				phoneNumber : document.getElementById('phoneNumber').value,
				email : document.getElementById('email').value,
				subject : document.getElementById('subject').value,
				message : document.getElementById('message').value

			},
			success : function(response) {
				//alert("Thank you");
				document.getElementById("firstName").style.borderColor = "#dadada"
				document.getElementById("lastName").style.borderColor = "#dadada"
				document.getElementById("message").style.borderColor = "#dadada"
				document.getElementById("email").style.borderColor = "#dadada"
				document.getElementById("subject").style.borderColor = "#dadada";

				document.getElementById('noemptyinfo').style.display = "none";
				document.getElementById('firstName').value = "";
				document.getElementById('lastName').value = "";
				document.getElementById('organization').value = "";
				document.getElementById('phoneNumber').value = "";
				document.getElementById('email').value = "";
				document.getElementById('subject').value = "";
				document.getElementById('message').value = "";

			}
		});
	}
}

function closethx(){
    event.preventDefault();
    document.getElementById("thankyou").style.display = "none";
    document.getElementById('form_after_thank').style.display = "block";
}











			$(document).ready(function(){
				initShareButton();
			});
			var url = "http://google.com";
			function initShareButton(){
				$(".share_btn").click(function(){
					
					var message = "Hello World";
					
					if($(this).hasClass('fb')){
						url = "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(url);
						window.open(url);
					} else if($(this).hasClass('tw')){
						url = "https://twitter.com/share?url="+encodeURIComponent(url)+"&text="+encodeURIComponent(message);
						window.open(url);
						
					} else if($(this).hasClass('gp')){
						url = "https://plus.google.com/share?url="+encodeURIComponent(url);
						window.open(url);
					} else if($(this).hasClass('sn')){
						url = "http://service.weibo.com/share/share.php?appkey=&url="+encodeURIComponent(url)+"&title="+encodeURIComponent(message)+"&source="+encodeURIComponent(message);
						window.open(url);
					}
					 
					return false;
				});
			}
		



	$( document ).ready(function() {
		loadIframe("http://147.8.135.16/mobilesupport/map.php");
	});
	
	function showPosition(position){
		//if (navigator.geolocation){
		//	navigator.geolocation.getCurrentPosition(showPosition);
		//}
	
	  	loadIframe("http://147.8.135.16/mobilesupport/map.php?lat=" + position.coords.latitude +"&long=" +position.coords.longitude);
	  	
	  }
	  
	  function loadIframe(url) {
	    var $iframe = $('#frame1');
	    if ( $iframe.length ) {
	        $iframe.attr('src',url);   
	        return false;
	    }
	    return true;
		}
	







   function clickPlayVideo(){
    	$(".video_play_overlay").hide();
    	$("video")[0].play();
    	
    }
	$.urlParam = function(name){
  		var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(top.window.location.href); 
	    return (results !== null) ? results[1] : 0;
	}
	
	//alert($.urlParam('id'));
	//document.write("<script type='text/javascript' src='apps/detail.js?mid=" + $.urlParam('mid') + "'><\/sc" + "ript>");
	
    


Ext.application({
    name: 'UVision',

    controllers: ['Main'],
    views:  ['Main'],
    stores: ['MoreCards'],

    launch: function() {
        Ext.Viewport.add({
            xclass: 'UVision.view.Main'
        });
    }
});

































var OpenSafari = function() {
};

//-------------------------------------------------------------------

//-------------------------------------------------------------------
OpenSafari.prototype.open = function(successCallback, errorCallback, args) {
    if (errorCallback == null) { errorCallback = function() {}}
    
    if (typeof errorCallback != "function")  {
        return
    }
    
    if (typeof successCallback != "function") {
        return
    }
    //alert(args);
    cordova.exec(successCallback, errorCallback, 'OpenSafari', 'open', [args]);
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.OpenSafari) {
    window.plugins.OpenSafari = new OpenSafari();
}


      function toggleCodes(on) {
        var obj = document.getElementById('icons');
        
        if (on) {
          obj.className += ' codesOn';
        } else {
          obj.className = obj.className.replace(' codesOn', '');
        }
      }
      
    

/*! Video.js v4.0.3 Copyright 2013 Brightcove, Inc. https://github.com/videojs/video.js/blob/master/LICENSE */
 (function() {var b=void 0,f=!0,h=null,l=!1;function m(){return function(){}}function p(a){return function(){return this[a]}}function r(a){return function(){return a}}var t;document.createElement("video");document.createElement("audio");function u(a,c,d){if("string"===typeof a){0===a.indexOf("#")&&(a=a.slice(1));if(u.La[a])return u.La[a];a=u.r(a)}if(!a||!a.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");return a.player||new u.ea(a,c,d)}var v=u;window.xd=window.yd=u;u.Ob="4.0";
u.xc="https:"==document.location.protocol?"https://":"http://";u.options={techOrder:["html5","flash"],html5:{},flash:{},width:300,height:150,defaultVolume:0,children:{mediaLoader:{},posterImage:{},textTrackDisplay:{},loadingSpinner:{},bigPlayButton:{},controlBar:{}}};"GENERATED_CDN_VSN"!==u.Ob&&(v.options.flash.swf=u.xc+"vjs.zencdn.net/"+u.Ob+"/video-js.swf");u.La={};u.ka=u.CoreObject=m();
u.ka.extend=function(a){var c,d;a=a||{};c=a.init||a.g||this.prototype.init||this.prototype.g||m();d=function(){c.apply(this,arguments)};d.prototype=u.i.create(this.prototype);d.prototype.constructor=d;d.extend=u.ka.extend;d.create=u.ka.create;for(var e in a)a.hasOwnProperty(e)&&(d.prototype[e]=a[e]);return d};u.ka.create=function(){var a=u.i.create(this.prototype);this.apply(a,arguments);return a};
u.d=function(a,c,d){var e=u.getData(a);e.z||(e.z={});e.z[c]||(e.z[c]=[]);d.u||(d.u=u.u++);e.z[c].push(d);e.S||(e.disabled=l,e.S=function(c){if(!e.disabled){c=u.fc(c);var d=e.z[c.type];if(d)for(var d=d.slice(0),k=0,q=d.length;k<q&&!c.lc();k++)d[k].call(a,c)}});1==e.z[c].length&&(document.addEventListener?a.addEventListener(c,e.S,l):document.attachEvent&&a.attachEvent("on"+c,e.S))};
u.t=function(a,c,d){if(u.kc(a)){var e=u.getData(a);if(e.z)if(c){var g=e.z[c];if(g){if(d){if(d.u)for(e=0;e<g.length;e++)g[e].u===d.u&&g.splice(e--,1)}else e.z[c]=[];u.cc(a,c)}}else for(g in e.z)c=g,e.z[c]=[],u.cc(a,c)}};u.cc=function(a,c){var d=u.getData(a);0===d.z[c].length&&(delete d.z[c],document.removeEventListener?a.removeEventListener(c,d.S,l):document.detachEvent&&a.detachEvent("on"+c,d.S));u.zb(d.z)&&(delete d.z,delete d.S,delete d.disabled);u.zb(d)&&u.rc(a)};
u.fc=function(a){function c(){return f}function d(){return l}if(!a||!a.Ab){var e=a||window.event;a={};for(var g in e)"layerX"!==g&&"layerY"!==g&&(a[g]=e[g]);a.target||(a.target=a.srcElement||document);a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;a.preventDefault=function(){e.preventDefault&&e.preventDefault();a.returnValue=l;a.yb=c};a.yb=d;a.stopPropagation=function(){e.stopPropagation&&e.stopPropagation();a.cancelBubble=f;a.Ab=c};a.Ab=d;a.stopImmediatePropagation=function(){e.stopImmediatePropagation&&
e.stopImmediatePropagation();a.lc=c;a.stopPropagation()};a.lc=d;if(a.clientX!=h){g=document.documentElement;var j=document.body;a.pageX=a.clientX+(g&&g.scrollLeft||j&&j.scrollLeft||0)-(g&&g.clientLeft||j&&j.clientLeft||0);a.pageY=a.clientY+(g&&g.scrollTop||j&&j.scrollTop||0)-(g&&g.clientTop||j&&j.clientTop||0)}a.which=a.charCode||a.keyCode;a.button!=h&&(a.button=a.button&1?0:a.button&4?1:a.button&2?2:0)}return a};
u.k=function(a,c){var d=u.kc(a)?u.getData(a):{},e=a.parentNode||a.ownerDocument;"string"===typeof c&&(c={type:c,target:a});c=u.fc(c);d.S&&d.S.call(a,c);if(e&&!c.Ab())u.k(e,c);else if(!e&&!c.yb()&&(d=u.getData(c.target),c.target[c.type])){d.disabled=f;if("function"===typeof c.target[c.type])c.target[c.type]();d.disabled=l}return!c.yb()};u.Q=function(a,c,d){u.d(a,c,function(){u.t(a,c,arguments.callee);d.apply(this,arguments)})};var w=Object.prototype.hasOwnProperty;
u.e=function(a,c){var d=document.createElement(a||"div"),e;for(e in c)w.call(c,e)&&(-1!==e.indexOf("aria-")||"role"==e?d.setAttribute(e,c[e]):d[e]=c[e]);return d};u.Y=function(a){return a.charAt(0).toUpperCase()+a.slice(1)};u.i={};u.i.create=Object.create||function(a){function c(){}c.prototype=a;return new c};u.i.qa=function(a,c,d){for(var e in a)w.call(a,e)&&c.call(d||this,e,a[e])};u.i.B=function(a,c){if(!c)return a;for(var d in c)w.call(c,d)&&(a[d]=c[d]);return a};
u.i.ec=function(a,c){var d,e,g;a=u.i.copy(a);for(d in c)w.call(c,d)&&(e=a[d],g=c[d],a[d]=u.i.mc(e)&&u.i.mc(g)?u.i.ec(e,g):c[d]);return a};u.i.copy=function(a){return u.i.B({},a)};u.i.mc=function(a){return!!a&&"object"===typeof a&&"[object Object]"===a.toString()&&a.constructor===Object};u.bind=function(a,c,d){function e(){return c.apply(a,arguments)}c.u||(c.u=u.u++);e.u=d?d+"_"+c.u:c.u;return e};u.oa={};u.u=1;u.expando="vdata"+(new Date).getTime();
u.getData=function(a){var c=a[u.expando];c||(c=a[u.expando]=u.u++,u.oa[c]={});return u.oa[c]};u.kc=function(a){a=a[u.expando];return!(!a||u.zb(u.oa[a]))};u.rc=function(a){var c=a[u.expando];if(c){delete u.oa[c];try{delete a[u.expando]}catch(d){a.removeAttribute?a.removeAttribute(u.expando):a[u.expando]=h}}};u.zb=function(a){for(var c in a)if(a[c]!==h)return l;return f};u.p=function(a,c){-1==(" "+a.className+" ").indexOf(" "+c+" ")&&(a.className=""===a.className?c:a.className+" "+c)};
u.w=function(a,c){if(-1!=a.className.indexOf(c)){for(var d=a.className.split(" "),e=d.length-1;0<=e;e--)d[e]===c&&d.splice(e,1);a.className=d.join(" ")}};u.gb=u.e("video");u.O=navigator.userAgent;u.Bc=!!u.O.match(/iPhone/i);u.Ac=!!u.O.match(/iPad/i);u.Cc=!!u.O.match(/iPod/i);u.Sb=u.Bc||u.Ac||u.Cc;var x=u,y;var z=u.O.match(/OS (\d+)_/i);y=z&&z[1]?z[1]:b;x.qd=y;u.Za=!!u.O.match(/Android.*AppleWebKit/i);var aa=u,A=u.O.match(/Android (\d+)\./i);aa.yc=A&&A[1]?A[1]:h;u.zc=function(){return!!u.O.match("Firefox")};
u.vb=function(a){var c={};if(a&&a.attributes&&0<a.attributes.length)for(var d=a.attributes,e,g,j=d.length-1;0<=j;j--){e=d[j].name;g=d[j].value;if("boolean"===typeof a[e]||-1!==",autoplay,controls,loop,muted,default,".indexOf(","+e+","))g=g!==h?f:l;c[e]=g}return c};u.td=function(a,c){var d="";document.defaultView&&document.defaultView.getComputedStyle?d=document.defaultView.getComputedStyle(a,"").getPropertyValue(c):a.currentStyle&&(d=a["client"+c.substr(0,1).toUpperCase()+c.substr(1)]+"px");return d};
u.xb=function(a,c){c.firstChild?c.insertBefore(a,c.firstChild):c.appendChild(a)};u.Mb={};u.r=function(a){0===a.indexOf("#")&&(a=a.slice(1));return document.getElementById(a)};u.Ga=function(a,c){c=c||a;var d=Math.floor(a%60),e=Math.floor(a/60%60),g=Math.floor(a/3600),j=Math.floor(c/60%60),k=Math.floor(c/3600),g=0<g||0<k?g+":":"";return g+(((g||10<=j)&&10>e?"0"+e:e)+":")+(10>d?"0"+d:d)};u.Gc=function(){document.body.focus();document.onselectstart=r(l)};u.ld=function(){document.onselectstart=r(f)};
u.trim=function(a){return a.toString().replace(/^\s+/,"").replace(/\s+$/,"")};u.round=function(a,c){c||(c=0);return Math.round(a*Math.pow(10,c))/Math.pow(10,c)};u.rb=function(a,c){return{length:1,start:function(){return a},end:function(){return c}}};
u.get=function(a,c,d){var e=0===a.indexOf("file:")||0===window.location.href.indexOf("file:")&&-1===a.indexOf("http");"undefined"===typeof XMLHttpRequest&&(window.XMLHttpRequest=function(){try{return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(c){}try{return new window.ActiveXObject("Msxml2.XMLHTTP")}catch(d){}throw Error("This browser does not support XMLHttpRequest.");});var g=new XMLHttpRequest;try{g.open("GET",a)}catch(j){d(j)}g.onreadystatechange=
function(){4===g.readyState&&(200===g.status||e&&0===g.status?c(g.responseText):d&&d())};try{g.send()}catch(k){d&&d(k)}};u.dd=function(a){try{var c=window.localStorage||l;c&&(c.volume=a)}catch(d){22==d.code||1014==d.code?u.log("LocalStorage Full (VideoJS)",d):18==d.code?u.log("LocalStorage not allowed (VideoJS)",d):u.log("LocalStorage Error (VideoJS)",d)}};u.ic=function(a){a.match(/^https?:\/\//)||(a=u.e("div",{innerHTML:'<a href="'+a+'">x</a>'}).firstChild.href);return a};
u.log=function(){u.log.history=u.log.history||[];u.log.history.push(arguments);window.console&&window.console.log(Array.prototype.slice.call(arguments))};u.Oc=function(a){var c,d;a.getBoundingClientRect&&a.parentNode&&(c=a.getBoundingClientRect());if(!c)return{left:0,top:0};a=document.documentElement;d=document.body;return{left:c.left+(window.pageXOffset||d.scrollLeft)-(a.clientLeft||d.clientLeft||0),top:c.top+(window.pageYOffset||d.scrollTop)-(a.clientTop||d.clientTop||0)}};
u.c=u.ka.extend({g:function(a,c,d){this.a=a;this.f=u.i.copy(this.f);c=this.options(c);this.L=c.id||(c.el&&c.el.id?c.el.id:a.id()+"_component_"+u.u++);this.Tc=c.name||h;this.b=c.el||this.e();this.D=[];this.pb={};this.R={};if((a=this.f)&&a.children){var e=this;u.i.qa(a.children,function(a,c){c!==l&&!c.loadEvent&&(e[a]=e.X(a,c))})}this.M(d)}});t=u.c.prototype;
t.C=function(){if(this.D)for(var a=this.D.length-1;0<=a;a--)this.D[a].C&&this.D[a].C();this.R=this.pb=this.D=h;this.t();this.b.parentNode&&this.b.parentNode.removeChild(this.b);u.rc(this.b);this.b=h};t.oc=p("a");t.options=function(a){return a===b?this.f:this.f=u.i.ec(this.f,a)};t.e=function(a,c){return u.e(a,c)};t.r=p("b");t.id=p("L");t.name=p("Tc");t.children=p("D");
t.X=function(a,c){var d,e;"string"===typeof a?(e=a,c=c||{},d=c.componentClass||u.Y(e),c.name=e,d=new window.videojs[d](this.a||this,c)):d=a;this.D.push(d);"function"===typeof d.id&&(this.pb[d.id()]=d);(e=e||d.name&&d.name())&&(this.R[e]=d);"function"===typeof d.el&&d.el()&&(this.pa||this.b).appendChild(d.el());return d};
t.removeChild=function(a){"string"===typeof a&&(a=this.R[a]);if(a&&this.D){for(var c=l,d=this.D.length-1;0<=d;d--)if(this.D[d]===a){c=f;this.D.splice(d,1);break}c&&(this.pb[a.id]=h,this.R[a.name]=h,(c=a.r())&&c.parentNode===(this.pa||this.b)&&(this.pa||this.b).removeChild(a.r()))}};t.P=r("");t.d=function(a,c){u.d(this.b,a,u.bind(this,c));return this};t.t=function(a,c){u.t(this.b,a,c);return this};t.Q=function(a,c){u.Q(this.b,a,u.bind(this,c));return this};t.k=function(a,c){u.k(this.b,a,c);return this};
t.M=function(a){a&&(this.Z?a.call(this):(this.Oa===b&&(this.Oa=[]),this.Oa.push(a)));return this};t.Ra=function(){this.Z=f;var a=this.Oa;if(a&&0<a.length){for(var c=0,d=a.length;c<d;c++)a[c].call(this);this.Oa=[];this.k("ready")}};t.p=function(a){u.p(this.b,a);return this};t.w=function(a){u.w(this.b,a);return this};t.show=function(){this.b.style.display="block";return this};t.v=function(){this.b.style.display="none";return this};t.ha=function(){this.w("vjs-fade-out");this.p("vjs-fade-in");return this};
t.Fa=function(){this.w("vjs-fade-in");this.p("vjs-fade-out");return this};t.nc=function(){this.p("vjs-lock-showing");return this};t.Sa=function(){this.w("vjs-lock-showing");return this};t.disable=function(){this.v();this.show=m();this.ha=m()};t.width=function(a,c){return B(this,"width",a,c)};t.height=function(a,c){return B(this,"height",a,c)};t.Kc=function(a,c){return this.width(a,f).height(c)};
function B(a,c,d,e){if(d!==b)return a.b.style[c]=-1!==(""+d).indexOf("%")||-1!==(""+d).indexOf("px")?d:"auto"===d?"":d+"px",e||a.k("resize"),a;if(!a.b)return 0;d=a.b.style[c];e=d.indexOf("px");return-1!==e?parseInt(d.slice(0,e),10):parseInt(a.b["offset"+u.Y(c)],10)}
u.o=u.c.extend({g:function(a,c){u.c.call(this,a,c);var d=l;this.d("touchstart",function(){d=f});this.d("touchmove",function(){d=l});var e=this;this.d("touchend",function(a){d&&e.n(a);a.preventDefault();a.stopPropagation()});this.d("click",this.n);this.d("focus",this.Ja);this.d("blur",this.Ia)}});t=u.o.prototype;
t.e=function(a,c){c=u.i.B({className:this.P(),innerHTML:'<div class="vjs-control-content"><span class="vjs-control-text">'+(this.na||"Need Text")+"</span></div>",ad:"button","aria-live":"polite",tabIndex:0},c);return u.c.prototype.e.call(this,a,c)};t.P=function(){return"vjs-control "+u.c.prototype.P.call(this)};t.n=m();t.Ja=function(){u.d(document,"keyup",u.bind(this,this.$))};t.$=function(a){if(32==a.which||13==a.which)a.preventDefault(),this.n()};
t.Ia=function(){u.t(document,"keyup",u.bind(this,this.$))};u.J=u.c.extend({g:function(a,c){u.c.call(this,a,c);this.Fc=this.R[this.f.barName];this.handle=this.R[this.f.handleName];a.d(this.pc,u.bind(this,this.update));this.d("mousedown",this.Ka);this.d("touchstart",this.Ka);this.d("focus",this.Ja);this.d("blur",this.Ia);this.d("click",this.n);this.a.d("controlsvisible",u.bind(this,this.update));a.M(u.bind(this,this.update));this.K={}}});t=u.J.prototype;
t.e=function(a,c){c=c||{};c.className+=" vjs-slider";c=u.i.B({ad:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},c);return u.c.prototype.e.call(this,a,c)};t.Ka=function(a){a.preventDefault();u.Gc();this.K.move=u.bind(this,this.Fb);this.K.end=u.bind(this,this.Gb);u.d(document,"mousemove",this.K.move);u.d(document,"mouseup",this.K.end);u.d(document,"touchmove",this.K.move);u.d(document,"touchend",this.K.end);this.Fb(a)};
t.Gb=function(){u.ld();u.t(document,"mousemove",this.K.move,l);u.t(document,"mouseup",this.K.end,l);u.t(document,"touchmove",this.K.move,l);u.t(document,"touchend",this.K.end,l);this.update()};t.update=function(){if(this.b){var a,c=this.wb(),d=this.handle,e=this.Fc;isNaN(c)&&(c=0);a=c;if(d){a=this.b.offsetWidth;var g=d.r().offsetWidth;a=g?g/a:0;c*=1-a;a=c+a/2;d.r().style.left=u.round(100*c,2)+"%"}e.r().style.width=u.round(100*a,2)+"%"}};
function C(a,c){var d,e,g,j;d=a.b;e=u.Oc(d);j=g=d.offsetWidth;d=a.handle;if(a.f.md)return j=e.top,e=c.changedTouches?c.changedTouches[0].pageY:c.pageY,d&&(d=d.r().offsetHeight,j+=d/2,g-=d),Math.max(0,Math.min(1,(j-e+g)/g));g=e.left;e=c.changedTouches?c.changedTouches[0].pageX:c.pageX;d&&(d=d.r().offsetWidth,g+=d/2,j-=d);return Math.max(0,Math.min(1,(e-g)/j))}t.Ja=function(){u.d(document,"keyup",u.bind(this,this.$))};
t.$=function(a){37==a.which?(a.preventDefault(),this.uc()):39==a.which&&(a.preventDefault(),this.vc())};t.Ia=function(){u.t(document,"keyup",u.bind(this,this.$))};t.n=function(a){a.stopImmediatePropagation();a.preventDefault()};u.fa=u.c.extend();u.fa.prototype.defaultValue=0;u.fa.prototype.e=function(a,c){c=c||{};c.className+=" vjs-slider-handle";c=u.i.B({innerHTML:'<span class="vjs-control-text">'+this.defaultValue+"</span>"},c);return u.c.prototype.e.call(this,"div",c)};u.la=u.c.extend();
function ba(a,c){a.X(c);c.d("click",u.bind(a,function(){this.Sa()}))}u.la.prototype.e=function(){var a=this.options().Ic||"ul";this.pa=u.e(a,{className:"vjs-menu-content"});a=u.c.prototype.e.call(this,"div",{append:this.pa,className:"vjs-menu"});a.appendChild(this.pa);u.d(a,"click",function(a){a.preventDefault();a.stopImmediatePropagation()});return a};u.I=u.o.extend({g:function(a,c){u.o.call(this,a,c);this.selected(c.selected)}});
u.I.prototype.e=function(a,c){return u.o.prototype.e.call(this,"li",u.i.B({className:"vjs-menu-item",innerHTML:this.f.label},c))};u.I.prototype.n=function(){this.selected(f)};u.I.prototype.selected=function(a){a?(this.p("vjs-selected"),this.b.setAttribute("aria-selected",f)):(this.w("vjs-selected"),this.b.setAttribute("aria-selected",l))};
u.ca=u.o.extend({g:function(a,c){u.o.call(this,a,c);this.sa=this.Ea();this.X(this.sa);this.G&&0===this.G.length&&this.v();this.d("keyup",this.$);this.b.setAttribute("aria-haspopup",f);this.b.setAttribute("role","button")}});t=u.ca.prototype;t.ma=l;t.Ea=function(){var a=new u.la(this.a);this.options().title&&a.r().appendChild(u.e("li",{className:"vjs-menu-title",innerHTML:u.Y(this.A),jd:-1}));if(this.G=this.qb())for(var c=0;c<this.G.length;c++)ba(a,this.G[c]);return a};t.qb=m();
t.P=function(){return this.className+" vjs-menu-button "+u.o.prototype.P.call(this)};t.Ja=m();t.Ia=m();t.n=function(){this.Q("mouseout",u.bind(this,function(){this.sa.Sa();this.b.blur()}));this.ma?D(this):E(this)};t.$=function(a){a.preventDefault();32==a.which||13==a.which?this.ma?D(this):E(this):27==a.which&&this.ma&&D(this)};function E(a){a.ma=f;a.sa.nc();a.b.setAttribute("aria-pressed",f);a.G&&0<a.G.length&&a.G[0].r().focus()}function D(a){a.ma=l;a.sa.Sa();a.b.setAttribute("aria-pressed",l)}
u.ea=u.c.extend({g:function(a,c,d){this.N=a;c=u.i.B(ca(a),c);this.s={};this.qc=c.poster;this.Da=c.controls;c.customControlsOnMobile!==f&&(u.Sb||u.Za)?(a.controls=c.controls,this.Da=l):a.controls=l;u.c.call(this,this,c,d);this.Q("play",function(a){u.k(this.b,{type:"firstplay",target:this.b})||(a.preventDefault(),a.stopPropagation(),a.stopImmediatePropagation())});this.d("ended",this.Vc);this.d("play",this.Ib);this.d("firstplay",this.Wc);this.d("pause",this.Hb);this.d("progress",this.Yc);this.d("durationchange",
this.Uc);this.d("error",this.Eb);this.d("fullscreenchange",this.Xc);u.La[this.L]=this;c.plugins&&u.i.qa(c.plugins,function(a,c){this[a](c)},this)}});t=u.ea.prototype;t.f=u.options;t.C=function(){u.La[this.L]=h;this.N&&this.N.player&&(this.N.player=h);this.b&&this.b.player&&(this.b.player=h);clearInterval(this.Na);this.ta();this.h&&this.h.C();u.c.prototype.C.call(this)};
function ca(a){var c={sources:[],tracks:[]};u.i.B(c,u.vb(a));if(a.hasChildNodes())for(var d,e=a.childNodes,g=0,j=e.length;g<j;g++)a=e[g],d=a.nodeName.toLowerCase(),"source"===d?c.sources.push(u.vb(a)):"track"===d&&c.tracks.push(u.vb(a));return c}
t.e=function(){var a=this.b=u.c.prototype.e.call(this,"div"),c=this.N;c.removeAttribute("width");c.removeAttribute("height");if(c.hasChildNodes())for(var d=c.childNodes.length,e=0,g=c.childNodes;e<d;e++)("source"==g[0].nodeName.toLowerCase()||"track"==g[0].nodeName.toLowerCase())&&c.removeChild(g[0]);c.id=c.id||"vjs_video_"+u.u++;a.id=c.id;a.className=c.className;c.id+="_html5_api";c.className="vjs-tech";c.player=a.player=this;this.p("vjs-paused");this.width(this.f.width,f);this.height(this.f.height,
f);c.parentNode&&c.parentNode.insertBefore(a,c);u.xb(c,a);return a};
function F(a,c,d){a.h?(a.Z=l,a.h.C(),a.Cb&&(a.Cb=l,clearInterval(a.Na)),a.Db&&G(a),a.h=l):"Html5"!==c&&a.N&&(a.b.removeChild(a.N),a.N.oc=h,a.N=h);a.ua=c;a.Z=l;var e=u.i.B({source:d,parentEl:a.b},a.f[c.toLowerCase()]);d&&(d.src==a.s.src&&0<a.s.currentTime&&(e.startTime=a.s.currentTime),a.s.src=d.src);a.h=new window.videojs[c](a,e);a.h.M(function(){this.a.Ra();if(!this.j.Kb){var a=this.a;a.Cb=f;a.Na=setInterval(u.bind(a,function(){this.s.lb<this.buffered().end(0)?this.k("progress"):1==H(this)&&(clearInterval(this.Na),
this.k("progress"))}),500);a.h.Q("progress",function(){this.j.Kb=f;var a=this.a;a.Cb=l;clearInterval(a.Na)})}this.j.Nb||(a=this.a,a.Db=f,a.d("play",a.wc),a.d("pause",a.ta),a.h.Q("timeupdate",function(){this.j.Nb=f;G(this.a)}))})}function G(a){a.Db=l;a.ta();a.t("play",a.wc);a.t("pause",a.ta)}t.wc=function(){this.dc&&this.ta();this.dc=setInterval(u.bind(this,function(){this.k("timeupdate")}),250)};t.ta=function(){clearInterval(this.dc)};t.Vc=function(){this.f.loop&&(this.currentTime(0),this.play())};
t.Ib=function(){u.w(this.b,"vjs-paused");u.p(this.b,"vjs-playing")};t.Wc=function(){this.f.starttime&&this.currentTime(this.f.starttime)};t.Hb=function(){u.w(this.b,"vjs-playing");u.p(this.b,"vjs-paused")};t.Yc=function(){1==H(this)&&this.k("loadedalldata")};t.Uc=function(){this.duration(I(this,"duration"))};t.Eb=function(a){u.log("Video Error",a)};t.Xc=function(){this.F?this.p("vjs-fullscreen"):this.w("vjs-fullscreen")};
function J(a,c,d){if(a.h&&a.h.Z)a.h.M(function(){this[c](d)});else try{a.h[c](d)}catch(e){throw u.log(e),e;}}function I(a,c){if(a.h.Z)try{return a.h[c]()}catch(d){throw a.h[c]===b?u.log("Video.js: "+c+" method not defined for "+a.ua+" playback technology.",d):"TypeError"==d.name?(u.log("Video.js: "+c+" unavailable on "+a.ua+" playback technology element.",d),a.h.Z=l):u.log(d),d;}}t.play=function(){J(this,"play");return this};t.pause=function(){J(this,"pause");return this};
t.paused=function(){return I(this,"paused")===l?l:f};t.currentTime=function(a){return a!==b?(this.s.vd=a,J(this,"setCurrentTime",a),this.Db&&this.k("timeupdate"),this):this.s.currentTime=I(this,"currentTime")||0};t.duration=function(a){return a!==b?(this.s.duration=parseFloat(a),this):this.s.duration};t.buffered=function(){var a=I(this,"buffered"),c=this.s.lb=this.s.lb||0;a&&(0<a.length&&a.end(0)!==c)&&(c=a.end(0),this.s.lb=c);return u.rb(0,c)};
function H(a){return a.duration()?a.buffered().end(0)/a.duration():0}t.volume=function(a){if(a!==b)return a=Math.max(0,Math.min(1,parseFloat(a))),this.s.volume=a,J(this,"setVolume",a),u.dd(a),this;a=parseFloat(I(this,"volume"));return isNaN(a)?1:a};t.muted=function(a){return a!==b?(J(this,"setMuted",a),this):I(this,"muted")||l};t.Qa=function(){return I(this,"supportsFullScreen")||l};
t.Pa=function(){var a=u.Mb.Pa;this.F=f;a?(u.d(document,a.tb,u.bind(this,function(c){this.F=document[a.F];this.F===l&&u.t(document,a.tb,arguments.callee);this.k("fullscreenchange")})),this.b[a.sc]()):this.h.Qa()?J(this,"enterFullScreen"):(this.Qc=f,this.Lc=document.documentElement.style.overflow,u.d(document,"keydown",u.bind(this,this.gc)),document.documentElement.style.overflow="hidden",u.p(document.body,"vjs-full-window"),this.k("enterFullWindow"),this.k("fullscreenchange"));return this};
function K(a){var c=u.Mb.Pa;a.F=l;if(c)document[c.nb]();else a.h.Qa()?J(a,"exitFullScreen"):(L(a),a.k("fullscreenchange"))}t.gc=function(a){27===a.keyCode&&(this.F===f?K(this):L(this))};function L(a){a.Qc=l;u.t(document,"keydown",a.gc);document.documentElement.style.overflow=a.Lc;u.w(document.body,"vjs-full-window");a.k("exitFullWindow")}
t.src=function(a){if(a instanceof Array){var c;a:{c=a;for(var d=0,e=this.f.techOrder;d<e.length;d++){var g=u.Y(e[d]),j=window.videojs[g];if(j.isSupported())for(var k=0,q=c;k<q.length;k++){var n=q[k];if(j.canPlaySource(n)){c={source:n,h:g};break a}}}c=l}c?(a=c.source,c=c.h,c==this.ua?this.src(a):F(this,c,a)):this.b.appendChild(u.e("p",{innerHTML:'Sorry, no compatible source and playback technology were found for this video. Try using another browser like <a href="http://bit.ly/ccMUEC">Chrome</a> or download the latest <a href="http://adobe.ly/mwfN1">Adobe Flash Player</a>.'}))}else a instanceof
Object?window.videojs[this.ua].canPlaySource(a)?this.src(a.src):this.src([a]):(this.s.src=a,this.Z?(J(this,"src",a),"auto"==this.f.preload&&this.load(),this.f.autoplay&&this.play()):this.M(function(){this.src(a)}));return this};t.load=function(){J(this,"load");return this};t.currentSrc=function(){return I(this,"currentSrc")||this.s.src||""};t.Ma=function(a){return a!==b?(J(this,"setPreload",a),this.f.preload=a,this):I(this,"preload")};
t.autoplay=function(a){return a!==b?(J(this,"setAutoplay",a),this.f.autoplay=a,this):I(this,"autoplay")};t.loop=function(a){return a!==b?(J(this,"setLoop",a),this.f.loop=a,this):I(this,"loop")};t.poster=function(a){a!==b&&(this.qc=a);return this.qc};t.controls=function(a){a!==b&&this.Da!==a&&(this.Da=!!a,this.k("controlschange"));return this.Da};t.error=function(){return I(this,"error")};var M,N,O;O=document.createElement("div");N={};
O.rd!==b?(N.sc="requestFullscreen",N.nb="exitFullscreen",N.tb="fullscreenchange",N.F="fullScreen"):(document.mozCancelFullScreen?(M="moz",N.F=M+"FullScreen"):(M="webkit",N.F=M+"IsFullScreen"),O[M+"RequestFullScreen"]&&(N.sc=M+"RequestFullScreen",N.nb=M+"CancelFullScreen"),N.tb=M+"fullscreenchange");document[N.nb]&&(u.Mb.Pa=N);
u.ba=u.c.extend({g:function(a,c){u.c.call(this,a,c);a.controls()||this.disable();a.Q("play",u.bind(this,function(){var a,c=u.bind(this,this.ha),g=u.bind(this,this.Fa);this.ha();"ontouchstart"in window||(this.a.d("mouseover",c),this.a.d("mouseout",g),this.a.d("pause",u.bind(this,this.nc)),this.a.d("play",u.bind(this,this.Sa)));a=l;this.a.d("touchstart",function(){a=f});this.a.d("touchmove",function(){a=l});this.a.d("touchend",u.bind(this,function(c){var e;a&&(e=this.r().className.search("fade-in"),
-1!==e?this.Fa():this.ha());a=l;this.a.paused()||c.preventDefault()}))}))}});u.ba.prototype.f={wd:"play",children:{playToggle:{},currentTimeDisplay:{},timeDivider:{},durationDisplay:{},remainingTimeDisplay:{},progressControl:{},fullscreenToggle:{},volumeControl:{},muteToggle:{}}};u.ba.prototype.e=function(){return u.e("div",{className:"vjs-control-bar"})};u.ba.prototype.ha=function(){u.c.prototype.ha.call(this);this.a.k("controlsvisible")};
u.ba.prototype.Fa=function(){u.c.prototype.Fa.call(this);this.a.k("controlshidden")};u.Vb=u.o.extend({g:function(a,c){u.o.call(this,a,c);a.d("play",u.bind(this,this.Ib));a.d("pause",u.bind(this,this.Hb))}});t=u.Vb.prototype;t.na="Play";t.P=function(){return"vjs-play-control "+u.o.prototype.P.call(this)};t.n=function(){this.a.paused()?this.a.play():this.a.pause()};t.Ib=function(){u.w(this.b,"vjs-paused");u.p(this.b,"vjs-playing");this.b.children[0].children[0].innerHTML="Pause"};
t.Hb=function(){u.w(this.b,"vjs-playing");u.p(this.b,"vjs-paused");this.b.children[0].children[0].innerHTML="Play"};u.Wa=u.c.extend({g:function(a,c){u.c.call(this,a,c);a.d("timeupdate",u.bind(this,this.xa))}});
u.Wa.prototype.e=function(){var a=u.c.prototype.e.call(this,"div",{className:"vjs-current-time vjs-time-controls vjs-control"});this.content=u.e("div",{className:"vjs-current-time-display",innerHTML:'<span class="vjs-control-text">Current Time </span>0:00',"aria-live":"off"});a.appendChild(u.e("div").appendChild(this.content));return a};
u.Wa.prototype.xa=function(){var a=this.a.Lb?this.a.s.currentTime:this.a.currentTime();this.content.innerHTML='<span class="vjs-control-text">Current Time </span>'+u.Ga(a,this.a.duration())};u.Xa=u.c.extend({g:function(a,c){u.c.call(this,a,c);a.d("timeupdate",u.bind(this,this.xa))}});
u.Xa.prototype.e=function(){var a=u.c.prototype.e.call(this,"div",{className:"vjs-duration vjs-time-controls vjs-control"});this.content=u.e("div",{className:"vjs-duration-display",innerHTML:'<span class="vjs-control-text">Duration Time </span>0:00',"aria-live":"off"});a.appendChild(u.e("div").appendChild(this.content));return a};u.Xa.prototype.xa=function(){this.a.duration()&&(this.content.innerHTML='<span class="vjs-control-text">Duration Time </span>'+u.Ga(this.a.duration()))};
u.Zb=u.c.extend({g:function(a,c){u.c.call(this,a,c)}});u.Zb.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-time-divider",innerHTML:"<div><span>/</span></div>"})};u.eb=u.c.extend({g:function(a,c){u.c.call(this,a,c);a.d("timeupdate",u.bind(this,this.xa))}});
u.eb.prototype.e=function(){var a=u.c.prototype.e.call(this,"div",{className:"vjs-remaining-time vjs-time-controls vjs-control"});this.content=u.e("div",{className:"vjs-remaining-time-display",innerHTML:'<span class="vjs-control-text">Remaining Time </span>-0:00',"aria-live":"off"});a.appendChild(u.e("div").appendChild(this.content));return a};
u.eb.prototype.xa=function(){this.a.duration()&&this.a.duration()&&(this.content.innerHTML='<span class="vjs-control-text">Remaining Time </span>-'+u.Ga(this.a.duration()-this.a.currentTime()))};u.za=u.o.extend({g:function(a,c){u.o.call(this,a,c)}});u.za.prototype.na="Fullscreen";u.za.prototype.P=function(){return"vjs-fullscreen-control "+u.o.prototype.P.call(this)};
u.za.prototype.n=function(){this.a.F?(K(this.a),this.b.children[0].children[0].innerHTML="Fullscreen"):(this.a.Pa(),this.b.children[0].children[0].innerHTML="Non-Fullscreen")};u.cb=u.c.extend({g:function(a,c){u.c.call(this,a,c)}});u.cb.prototype.f={children:{seekBar:{}}};u.cb.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-progress-control vjs-control"})};u.Wb=u.J.extend({g:function(a,c){u.J.call(this,a,c);a.d("timeupdate",u.bind(this,this.wa));a.M(u.bind(this,this.wa))}});
t=u.Wb.prototype;t.f={children:{loadProgressBar:{},playProgressBar:{},seekHandle:{}},barName:"playProgressBar",handleName:"seekHandle"};t.pc="timeupdate";t.e=function(){return u.J.prototype.e.call(this,"div",{className:"vjs-progress-holder","aria-label":"video progress bar"})};t.wa=function(){var a=this.a.Lb?this.a.s.currentTime:this.a.currentTime();this.b.setAttribute("aria-valuenow",u.round(100*this.wb(),2));this.b.setAttribute("aria-valuetext",u.Ga(a,this.a.duration()))};
t.wb=function(){return this.a.currentTime()/this.a.duration()};t.Ka=function(a){u.J.prototype.Ka.call(this,a);this.a.Lb=f;this.nd=!this.a.paused();this.a.pause()};t.Fb=function(a){a=C(this,a)*this.a.duration();a==this.a.duration()&&(a-=0.1);this.a.currentTime(a)};t.Gb=function(a){u.J.prototype.Gb.call(this,a);this.a.Lb=l;this.nd&&this.a.play()};t.vc=function(){this.a.currentTime(this.a.currentTime()+5)};t.uc=function(){this.a.currentTime(this.a.currentTime()-5)};
u.$a=u.c.extend({g:function(a,c){u.c.call(this,a,c);a.d("progress",u.bind(this,this.update))}});u.$a.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-load-progress",innerHTML:'<span class="vjs-control-text">Loaded: 0%</span>'})};u.$a.prototype.update=function(){this.b.style&&(this.b.style.width=u.round(100*H(this.a),2)+"%")};u.Ub=u.c.extend({g:function(a,c){u.c.call(this,a,c)}});
u.Ub.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-play-progress",innerHTML:'<span class="vjs-control-text">Progress: 0%</span>'})};u.fb=u.fa.extend();u.fb.prototype.defaultValue="00:00";u.fb.prototype.e=function(){return u.fa.prototype.e.call(this,"div",{className:"vjs-seek-handle"})};u.ib=u.c.extend({g:function(a,c){u.c.call(this,a,c);a.h&&(a.h.j&&a.h.j.T===l)&&this.p("vjs-hidden");a.d("loadstart",u.bind(this,function(){a.h.j&&a.h.j.T===l?this.p("vjs-hidden"):this.w("vjs-hidden")}))}});
u.ib.prototype.f={children:{volumeBar:{}}};u.ib.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-volume-control vjs-control"})};u.hb=u.J.extend({g:function(a,c){u.J.call(this,a,c);a.d("volumechange",u.bind(this,this.wa));a.M(u.bind(this,this.wa));setTimeout(u.bind(this,this.update),0)}});t=u.hb.prototype;t.wa=function(){this.b.setAttribute("aria-valuenow",u.round(100*this.a.volume(),2));this.b.setAttribute("aria-valuetext",u.round(100*this.a.volume(),2)+"%")};
t.f={children:{volumeLevel:{},volumeHandle:{}},barName:"volumeLevel",handleName:"volumeHandle"};t.pc="volumechange";t.e=function(){return u.J.prototype.e.call(this,"div",{className:"vjs-volume-bar","aria-label":"volume level"})};t.Fb=function(a){this.a.volume(C(this,a))};t.wb=function(){return this.a.muted()?0:this.a.volume()};t.vc=function(){this.a.volume(this.a.volume()+0.1)};t.uc=function(){this.a.volume(this.a.volume()-0.1)};u.$b=u.c.extend({g:function(a,c){u.c.call(this,a,c)}});
u.$b.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-volume-level",innerHTML:'<span class="vjs-control-text"></span>'})};u.jb=u.fa.extend();u.jb.prototype.defaultValue="00:00";u.jb.prototype.e=function(){return u.fa.prototype.e.call(this,"div",{className:"vjs-volume-handle"})};
u.da=u.o.extend({g:function(a,c){u.o.call(this,a,c);a.d("volumechange",u.bind(this,this.update));a.h&&(a.h.j&&a.h.j.T===l)&&this.p("vjs-hidden");a.d("loadstart",u.bind(this,function(){a.h.j&&a.h.j.T===l?this.p("vjs-hidden"):this.w("vjs-hidden")}))}});u.da.prototype.e=function(){return u.o.prototype.e.call(this,"div",{className:"vjs-mute-control vjs-control",innerHTML:'<div><span class="vjs-control-text">Mute</span></div>'})};u.da.prototype.n=function(){this.a.muted(this.a.muted()?l:f)};
u.da.prototype.update=function(){var a=this.a.volume(),c=3;0===a||this.a.muted()?c=0:0.33>a?c=1:0.67>a&&(c=2);this.a.muted()?"Unmute"!=this.b.children[0].children[0].innerHTML&&(this.b.children[0].children[0].innerHTML="Unmute"):"Mute"!=this.b.children[0].children[0].innerHTML&&(this.b.children[0].children[0].innerHTML="Mute");for(a=0;4>a;a++)u.w(this.b,"vjs-vol-"+a);u.p(this.b,"vjs-vol-"+c)};
u.Ba=u.ca.extend({g:function(a,c){u.ca.call(this,a,c);a.d("volumechange",u.bind(this,this.update));a.h&&(a.h.j&&a.h.j.T===l)&&this.p("vjs-hidden");a.d("loadstart",u.bind(this,function(){a.h.j&&a.h.j.T===l?this.p("vjs-hidden"):this.w("vjs-hidden")}));this.p("vjs-menu-button")}});u.Ba.prototype.Ea=function(){var a=new u.la(this.a,{Ic:"div"}),c=new u.hb(this.a,u.i.B({md:f},this.f.zd));a.X(c);return a};u.Ba.prototype.n=function(){u.da.prototype.n.call(this);u.ca.prototype.n.call(this)};
u.Ba.prototype.e=function(){return u.o.prototype.e.call(this,"div",{className:"vjs-volume-menu-button vjs-menu-button vjs-control",innerHTML:'<div><span class="vjs-control-text">Mute</span></div>'})};u.Ba.prototype.update=u.da.prototype.update;u.bb=u.o.extend({g:function(a,c){u.o.call(this,a,c);(!a.poster()||!a.controls())&&this.v();a.d("play",u.bind(this,this.v))}});
u.bb.prototype.e=function(){var a=u.e("div",{className:"vjs-poster",tabIndex:-1}),c=this.a.poster();c&&("backgroundSize"in a.style?a.style.backgroundImage='url("'+c+'")':a.appendChild(u.e("img",{src:c})));return a};u.bb.prototype.n=function(){this.a.play()};
u.Tb=u.c.extend({g:function(a,c){u.c.call(this,a,c);a.d("canplay",u.bind(this,this.v));a.d("canplaythrough",u.bind(this,this.v));a.d("playing",u.bind(this,this.v));a.d("seeked",u.bind(this,this.v));a.d("seeking",u.bind(this,this.show));a.d("seeked",u.bind(this,this.v));a.d("error",u.bind(this,this.show));a.d("waiting",u.bind(this,this.show))}});u.Tb.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-loading-spinner"})};
u.Ua=u.o.extend({g:function(a,c){u.o.call(this,a,c);a.controls()||this.v();a.d("play",u.bind(this,this.v))}});u.Ua.prototype.e=function(){return u.o.prototype.e.call(this,"div",{className:"vjs-big-play-button",innerHTML:"<span></span>","aria-label":"play video"})};u.Ua.prototype.n=function(){this.a.play()};u.q=u.c.extend({g:function(a,c,d){u.c.call(this,a,c,d)}});u.q.prototype.n=u.Za?m():function(){this.a.controls()&&(this.a.paused()?this.a.play():this.a.pause())};u.q.prototype.j={T:f,hc:l,Kb:l,Nb:l};
u.media={};u.media.Ta="play pause paused currentTime setCurrentTime duration buffered volume setVolume muted setMuted width height supportsFullScreen enterFullScreen src load currentSrc preload setPreload autoplay setAutoplay loop setLoop error networkState readyState seeking initialTime startOffsetTime played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks defaultPlaybackRate playbackRate mediaGroup controller controls defaultMuted".split(" ");
function da(){var a=u.media.Ta[i];return function(){throw Error('The "'+a+"\" method is not available on the playback technology's API");}}for(var i=u.media.Ta.length-1;0<=i;i--)u.q.prototype[u.media.Ta[i]]=da();
u.m=u.q.extend({g:function(a,c,d){this.j.T=u.m.Hc();this.j.Sc=!u.Sb;this.j.hc=f;u.q.call(this,a,c,d);(c=c.source)&&this.b.currentSrc==c.src?a.k("loadstart"):c&&(this.b.src=c.src);a.M(function(){this.f.autoplay&&this.paused()&&(this.N.poster=h,this.play())});this.d("click",this.n);for(a=u.m.Ya.length-1;0<=a;a--)u.d(this.b,u.m.Ya[a],u.bind(this.a,this.Nc));this.Ra()}});t=u.m.prototype;t.C=function(){u.q.prototype.C.call(this)};
t.e=function(){var a=this.a,c=a.N;if(!c||this.j.Sc===l)c?(a.r().removeChild(c),c=c.cloneNode(l)):c=u.e("video",{id:a.id()+"_html5_api",className:"vjs-tech"}),c.player=a,u.xb(c,a.r());for(var d=["autoplay","preload","loop","muted"],e=d.length-1;0<=e;e--){var g=d[e];a.f[g]!==h&&(c[g]=a.f[g])}return c};t.Nc=function(a){this.k(a);a.stopPropagation()};t.play=function(){this.b.play()};t.pause=function(){this.b.pause()};t.paused=function(){return this.b.paused};t.currentTime=function(){return this.b.currentTime};
t.cd=function(a){try{this.b.currentTime=a}catch(c){u.log(c,"Video is not ready. (Video.js)")}};t.duration=function(){return this.b.duration||0};t.buffered=function(){return this.b.buffered};t.volume=function(){return this.b.volume};t.hd=function(a){this.b.volume=a};t.muted=function(){return this.b.muted};t.fd=function(a){this.b.muted=a};t.width=function(){return this.b.offsetWidth};t.height=function(){return this.b.offsetHeight};
t.Qa=function(){return"function"==typeof this.b.webkitEnterFullScreen&&(/Android/.test(u.O)||!/Chrome|Mac OS X 10.5/.test(u.O))?f:l};t.src=function(a){this.b.src=a};t.load=function(){this.b.load()};t.currentSrc=function(){return this.b.currentSrc};t.Ma=function(){return this.b.Ma};t.gd=function(a){this.b.Ma=a};t.autoplay=function(){return this.b.autoplay};t.bd=function(a){this.b.autoplay=a};t.loop=function(){return this.b.loop};t.ed=function(a){this.b.loop=a};t.error=function(){return this.b.error};
u.m.isSupported=function(){return!!document.createElement("video").canPlayType};u.m.mb=function(a){return!!document.createElement("video").canPlayType(a.type)};u.m.Hc=function(){var a=u.gb.volume;u.gb.volume=a/2+0.1;return a!==u.gb.volume};u.m.Ya="loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" ");
u.Za&&3>u.yc&&(document.createElement("video").constructor.prototype.canPlayType=function(a){return a&&-1!=a.toLowerCase().indexOf("video/mp4")?"maybe":""});
u.l=u.q.extend({g:function(a,c,d){u.q.call(this,a,c,d);d=c.source;var e=c.parentEl,g=this.b=u.e("div",{id:a.id()+"_temp_flash"}),j=a.id()+"_flash_api";a=a.f;var k=u.i.B({readyFunction:"videojs.Flash.onReady",eventProxyFunction:"videojs.Flash.onEvent",errorEventProxyFunction:"videojs.Flash.onError",autoplay:a.autoplay,preload:a.Ma,loop:a.loop,muted:a.muted},c.flashVars),q=u.i.B({wmode:"opaque",bgcolor:"#000000"},c.params),n=u.i.B({id:j,name:j,"class":"vjs-tech"},c.attributes);d&&(k.src=encodeURIComponent(u.ic(d.src)));
u.xb(g,e);c.startTime&&this.M(function(){this.load();this.play();this.currentTime(c.startTime)});if(c.iFrameMode===f&&!u.zc){var s=u.e("iframe",{id:j+"_iframe",name:j+"_iframe",className:"vjs-tech",scrolling:"no",marginWidth:0,marginHeight:0,frameBorder:0});k.readyFunction="ready";k.eventProxyFunction="events";k.errorEventProxyFunction="errors";u.d(s,"load",u.bind(this,function(){var a,d=s.contentWindow;a=s.contentDocument?s.contentDocument:s.contentWindow.document;a.write(u.l.jc(c.swf,k,q,n));d.player=
this.a;d.ready=u.bind(this.a,function(c){c=a.getElementById(c);var d=this.h;d.b=c;u.d(c,"click",d.bind(d.n));u.l.ob(d)});d.events=u.bind(this.a,function(a,c){this&&"flash"===this.ua&&this.k(c)});d.errors=u.bind(this.a,function(a,c){u.log("Flash Error",c)})}));g.parentNode.replaceChild(s,g)}else u.l.Mc(c.swf,g,k,q,n)}});t=u.l.prototype;t.C=function(){u.q.prototype.C.call(this)};t.play=function(){this.b.vjs_play()};t.pause=function(){this.b.vjs_pause()};
t.src=function(a){a=u.ic(a);this.b.vjs_src(a);if(this.a.autoplay()){var c=this;setTimeout(function(){c.play()},0)}};t.load=function(){this.b.vjs_load()};t.poster=function(){this.b.vjs_getProperty("poster")};t.buffered=function(){return u.rb(0,this.b.vjs_getProperty("buffered"))};t.Qa=r(l);var P=u.l.prototype,Q="preload currentTime defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "),R="error currentSrc networkState readyState seeking initialTime duration startOffsetTime paused played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks".split(" ");
function ea(){var a=Q[S],c=a.charAt(0).toUpperCase()+a.slice(1);P["set"+c]=function(c){return this.b.vjs_setProperty(a,c)}}function T(a){P[a]=function(){return this.b.vjs_getProperty(a)}}var S;for(S=0;S<Q.length;S++)T(Q[S]),ea();for(S=0;S<R.length;S++)T(R[S]);u.l.isSupported=function(){return 10<=u.l.version()[0]};u.l.mb=function(a){if(a.type in u.l.Pc)return"maybe"};u.l.Pc={"video/flv":"FLV","video/x-flv":"FLV","video/mp4":"MP4","video/m4v":"MP4"};
u.l.onReady=function(a){a=u.r(a);var c=a.player||a.parentNode.player,d=c.h;a.player=c;d.b=a;d.d("click",d.n);u.l.ob(d)};u.l.ob=function(a){a.r().vjs_getProperty?a.Ra():setTimeout(function(){u.l.ob(a)},50)};u.l.onEvent=function(a,c){u.r(a).player.k(c)};u.l.onError=function(a,c){u.r(a).player.k("error");u.log("Flash Error",c,a)};
u.l.version=function(){var a="0,0,0";try{a=(new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1]}catch(c){try{navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&(a=(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1])}catch(d){}}return a.split(",")};
u.l.Mc=function(a,c,d,e,g){a=u.l.jc(a,d,e,g);a=u.e("div",{innerHTML:a}).childNodes[0];d=c.parentNode;c.parentNode.replaceChild(a,c);var j=d.childNodes[0];setTimeout(function(){j.style.display="block"},1E3)};
u.l.jc=function(a,c,d,e){var g="",j="",k="";c&&u.i.qa(c,function(a,c){g+=a+"="+c+"&amp;"});d=u.i.B({movie:a,flashvars:g,allowScriptAccess:"always",allowNetworking:"all"},d);u.i.qa(d,function(a,c){j+='<param name="'+a+'" value="'+c+'" />'});e=u.i.B({data:a,width:"100%",height:"100%"},e);u.i.qa(e,function(a,c){k+=a+'="'+c+'" '});return'<object type="application/x-shockwave-flash"'+k+">"+j+"</object>"};
u.Dc=u.c.extend({g:function(a,c,d){u.c.call(this,a,c,d);if(!a.f.sources||0===a.f.sources.length){c=0;for(d=a.f.techOrder;c<d.length;c++){var e=u.Y(d[c]),g=window.videojs[e];if(g&&g.isSupported()){F(a,e);break}}}else a.src(a.f.sources)}});function U(a){a.va=a.va||[];return a.va}function V(a,c,d){for(var e=a.va,g=0,j=e.length,k,q;g<j;g++)k=e[g],k.id()===c?(k.show(),q=k):d&&(k.H()==d&&0<k.mode())&&k.disable();(c=q?q.H():d?d:l)&&a.k(c+"trackchange")}
u.U=u.c.extend({g:function(a,c){u.c.call(this,a,c);this.L=c.id||"vjs_"+c.kind+"_"+c.language+"_"+u.u++;this.tc=c.src;this.Jc=c["default"]||c.dflt;this.kd=c.title;this.ud=c.srclang;this.Rc=c.label;this.ga=[];this.ac=[];this.ia=this.ja=0;this.a.d("fullscreenchange",u.bind(this,this.Ec))}});t=u.U.prototype;t.H=p("A");t.src=p("tc");t.sb=p("Jc");t.title=p("kd");t.label=p("Rc");t.readyState=p("ja");t.mode=p("ia");t.Ec=function(){this.b.style.fontSize=this.a.F?140*(screen.width/this.a.width())+"%":""};
t.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-"+this.A+" vjs-text-track"})};t.show=function(){W(this);this.ia=2;u.c.prototype.show.call(this)};t.v=function(){W(this);this.ia=1;u.c.prototype.v.call(this)};t.disable=function(){2==this.ia&&this.v();this.a.t("timeupdate",u.bind(this,this.update,this.L));this.a.t("ended",u.bind(this,this.reset,this.L));this.reset();this.a.R.textTrackDisplay.removeChild(this);this.ia=0};
function W(a){0===a.ja&&a.load();0===a.ia&&(a.a.d("timeupdate",u.bind(a,a.update,a.L)),a.a.d("ended",u.bind(a,a.reset,a.L)),("captions"===a.A||"subtitles"===a.A)&&a.a.R.textTrackDisplay.X(a))}t.load=function(){0===this.ja&&(this.ja=1,u.get(this.tc,u.bind(this,this.Zc),u.bind(this,this.Eb)))};t.Eb=function(a){this.error=a;this.ja=3;this.k("error")};
t.Zc=function(a){var c,d;a=a.split("\n");for(var e="",g=1,j=a.length;g<j;g++)if(e=u.trim(a[g])){-1==e.indexOf("--\x3e")?(c=e,e=u.trim(a[++g])):c=this.ga.length;c={id:c,index:this.ga.length};d=e.split(" --\x3e ");c.startTime=X(d[0]);c.ra=X(d[1]);for(d=[];a[++g]&&(e=u.trim(a[g]));)d.push(e);c.text=d.join("<br/>");this.ga.push(c)}this.ja=2;this.k("loaded")};
function X(a){var c=a.split(":");a=0;var d,e,g;3==c.length?(d=c[0],e=c[1],c=c[2]):(d=0,e=c[0],c=c[1]);c=c.split(/\s+/);c=c.splice(0,1)[0];c=c.split(/\.|,/);g=parseFloat(c[1]);c=c[0];a+=3600*parseFloat(d);a+=60*parseFloat(e);a+=parseFloat(c);g&&(a+=g/1E3);return a}
t.update=function(){if(0<this.ga.length){var a=this.a.currentTime();if(this.Jb===b||a<this.Jb||this.Ha<=a){var c=this.ga,d=this.a.duration(),e=0,g=l,j=[],k,q,n,s;a>=this.Ha||this.Ha===b?s=this.ub!==b?this.ub:0:(g=f,s=this.Bb!==b?this.Bb:c.length-1);for(;;){n=c[s];if(n.ra<=a)e=Math.max(e,n.ra),n.Ca&&(n.Ca=l);else if(a<n.startTime){if(d=Math.min(d,n.startTime),n.Ca&&(n.Ca=l),!g)break}else g?(j.splice(0,0,n),q===b&&(q=s),k=s):(j.push(n),k===b&&(k=s),q=s),d=Math.min(d,n.ra),e=Math.max(e,n.startTime),
n.Ca=f;if(g)if(0===s)break;else s--;else if(s===c.length-1)break;else s++}this.ac=j;this.Ha=d;this.Jb=e;this.ub=k;this.Bb=q;a=this.ac;c="";d=0;for(e=a.length;d<e;d++)c+='<span class="vjs-tt-cue">'+a[d].text+"</span>";this.b.innerHTML=c;this.k("cuechange")}}};t.reset=function(){this.Ha=0;this.Jb=this.a.duration();this.Bb=this.ub=0};u.Pb=u.U.extend();u.Pb.prototype.A="captions";u.Xb=u.U.extend();u.Xb.prototype.A="subtitles";u.Rb=u.U.extend();u.Rb.prototype.A="chapters";
u.Yb=u.c.extend({g:function(a,c,d){u.c.call(this,a,c,d);if(a.f.tracks&&0<a.f.tracks.length){c=this.a;a=a.f.tracks;var e;for(d=0;d<a.length;d++){e=a[d];var g=c,j=e.kind,k=e.label,q=e.language,n=e;e=g.va=g.va||[];n=n||{};n.kind=j;n.label=k;n.language=q;j=u.Y(j||"subtitles");g=new window.videojs[j+"Track"](g,n);e.push(g)}}}});u.Yb.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-text-track-display"})};
u.W=u.I.extend({g:function(a,c){var d=this.aa=c.track;c.label=d.label();c.selected=d.sb();u.I.call(this,a,c);this.a.d(d.H()+"trackchange",u.bind(this,this.update))}});u.W.prototype.n=function(){u.I.prototype.n.call(this);V(this.a,this.aa.L,this.aa.H())};u.W.prototype.update=function(){2==this.aa.mode()?this.selected(f):this.selected(l)};u.ab=u.W.extend({g:function(a,c){c.track={H:function(){return c.kind},oc:a,label:function(){return c.kind+" off"},sb:r(l),mode:r(l)};u.W.call(this,a,c);this.selected(f)}});
u.ab.prototype.n=function(){u.W.prototype.n.call(this);V(this.a,this.aa.L,this.aa.H())};u.ab.prototype.update=function(){for(var a=U(this.a),c=0,d=a.length,e,g=f;c<d;c++)e=a[c],e.H()==this.aa.H()&&2==e.mode()&&(g=l);g?this.selected(f):this.selected(l)};u.V=u.ca.extend({g:function(a,c){u.ca.call(this,a,c);1>=this.G.length&&this.v()}});
u.V.prototype.qb=function(){var a=[],c;a.push(new u.ab(this.a,{kind:this.A}));for(var d=0;d<U(this.a).length;d++)c=U(this.a)[d],c.H()===this.A&&a.push(new u.W(this.a,{track:c}));return a};u.ya=u.V.extend({g:function(a,c,d){u.V.call(this,a,c,d);this.b.setAttribute("aria-label","Captions Menu")}});u.ya.prototype.A="captions";u.ya.prototype.na="Captions";u.ya.prototype.className="vjs-captions-button";u.Aa=u.V.extend({g:function(a,c,d){u.V.call(this,a,c,d);this.b.setAttribute("aria-label","Subtitles Menu")}});
u.Aa.prototype.A="subtitles";u.Aa.prototype.na="Subtitles";u.Aa.prototype.className="vjs-subtitles-button";u.Qb=u.V.extend({g:function(a,c,d){u.V.call(this,a,c,d);this.b.setAttribute("aria-label","Chapters Menu")}});t=u.Qb.prototype;t.A="chapters";t.na="Chapters";t.className="vjs-chapters-button";t.qb=function(){for(var a=[],c,d=0;d<U(this.a).length;d++)c=U(this.a)[d],c.H()===this.A&&a.push(new u.W(this.a,{track:c}));return a};
t.Ea=function(){for(var a=U(this.a),c=0,d=a.length,e,g,j=this.G=[];c<d;c++)if(e=a[c],e.H()==this.A&&e.sb()){if(2>e.readyState()){this.sd=e;e.d("loaded",u.bind(this,this.Ea));return}g=e;break}a=this.sa=new u.la(this.a);a.b.appendChild(u.e("li",{className:"vjs-menu-title",innerHTML:u.Y(this.A),jd:-1}));if(g){e=g.ga;for(var k,c=0,d=e.length;c<d;c++)k=e[c],k=new u.Va(this.a,{track:g,cue:k}),j.push(k),a.X(k)}0<this.G.length&&this.show();return a};
u.Va=u.I.extend({g:function(a,c){var d=this.aa=c.track,e=this.cue=c.cue,g=a.currentTime();c.label=e.text;c.selected=e.startTime<=g&&g<e.ra;u.I.call(this,a,c);d.d("cuechange",u.bind(this,this.update))}});u.Va.prototype.n=function(){u.I.prototype.n.call(this);this.a.currentTime(this.cue.startTime);this.update(this.cue.startTime)};u.Va.prototype.update=function(){var a=this.cue,c=this.a.currentTime();a.startTime<=c&&c<a.ra?this.selected(f):this.selected(l)};
u.i.B(u.ba.prototype.f.children,{subtitlesButton:{},captionsButton:{},chaptersButton:{}});
if("undefined"!==typeof window.JSON&&"function"===window.JSON.parse)u.JSON=window.JSON;else{u.JSON={};var Y=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;u.JSON.parse=function(a,c){function d(a,e){var k,q,n=a[e];if(n&&"object"===typeof n)for(k in n)Object.prototype.hasOwnProperty.call(n,k)&&(q=d(n,k),q!==b?n[k]=q:delete n[k]);return c.call(a,e,n)}var e;a=String(a);Y.lastIndex=0;Y.test(a)&&(a=a.replace(Y,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));
if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return e=eval("("+a+")"),"function"===typeof c?d({"":e},""):e;throw new SyntaxError("JSON.parse(): invalid or malformed JSON data");}}
u.bc=function(){var a,c,d=document.getElementsByTagName("video");if(d&&0<d.length)for(var e=0,g=d.length;e<g;e++)if((c=d[e])&&c.getAttribute)c.player===b&&(a=c.getAttribute("data-setup"),a!==h&&(a=u.JSON.parse(a||"{}"),v(c,a)));else{u.kb();break}else u.od||u.kb()};u.kb=function(){setTimeout(u.bc,1)};u.Q(window,"load",function(){u.od=f});u.kb();u.$c=function(a,c){u.ea.prototype[a]=c};var Z=this;Z.pd=f;function $(a,c){var d=a.split("."),e=Z;!(d[0]in e)&&e.execScript&&e.execScript("var "+d[0]);for(var g;d.length&&(g=d.shift());)!d.length&&c!==b?e[g]=c:e=e[g]?e[g]:e[g]={}};$("videojs",u);$("_V_",u);$("videojs.options",u.options);$("videojs.cache",u.oa);$("videojs.Component",u.c);u.c.prototype.dispose=u.c.prototype.C;u.c.prototype.createEl=u.c.prototype.e;u.c.prototype.el=u.c.prototype.r;u.c.prototype.addChild=u.c.prototype.X;u.c.prototype.children=u.c.prototype.children;u.c.prototype.on=u.c.prototype.d;u.c.prototype.off=u.c.prototype.t;u.c.prototype.one=u.c.prototype.Q;u.c.prototype.trigger=u.c.prototype.k;u.c.prototype.triggerReady=u.c.prototype.Ra;
u.c.prototype.show=u.c.prototype.show;u.c.prototype.hide=u.c.prototype.v;u.c.prototype.width=u.c.prototype.width;u.c.prototype.height=u.c.prototype.height;u.c.prototype.dimensions=u.c.prototype.Kc;u.c.prototype.ready=u.c.prototype.M;$("videojs.Player",u.ea);u.ea.prototype.dispose=u.ea.prototype.C;$("videojs.MediaLoader",u.Dc);$("videojs.TextTrackDisplay",u.Yb);$("videojs.ControlBar",u.ba);$("videojs.Button",u.o);$("videojs.PlayToggle",u.Vb);$("videojs.FullscreenToggle",u.za);
$("videojs.BigPlayButton",u.Ua);$("videojs.LoadingSpinner",u.Tb);$("videojs.CurrentTimeDisplay",u.Wa);$("videojs.DurationDisplay",u.Xa);$("videojs.TimeDivider",u.Zb);$("videojs.RemainingTimeDisplay",u.eb);$("videojs.Slider",u.J);$("videojs.ProgressControl",u.cb);$("videojs.SeekBar",u.Wb);$("videojs.LoadProgressBar",u.$a);$("videojs.PlayProgressBar",u.Ub);$("videojs.SeekHandle",u.fb);$("videojs.VolumeControl",u.ib);$("videojs.VolumeBar",u.hb);$("videojs.VolumeLevel",u.$b);
$("videojs.VolumeHandle",u.jb);$("videojs.MuteToggle",u.da);$("videojs.PosterImage",u.bb);$("videojs.Menu",u.la);$("videojs.MenuItem",u.I);$("videojs.SubtitlesButton",u.Aa);$("videojs.CaptionsButton",u.ya);$("videojs.ChaptersButton",u.Qb);$("videojs.MediaTechController",u.q);u.q.prototype.features=u.q.prototype.j;u.q.prototype.j.volumeControl=u.q.prototype.j.T;u.q.prototype.j.fullscreenResize=u.q.prototype.j.hc;u.q.prototype.j.progressEvents=u.q.prototype.j.Kb;u.q.prototype.j.timeupdateEvents=u.q.prototype.j.Nb;
$("videojs.Html5",u.m);u.m.Events=u.m.Ya;u.m.isSupported=u.m.isSupported;u.m.canPlaySource=u.m.mb;u.m.prototype.setCurrentTime=u.m.prototype.cd;u.m.prototype.setVolume=u.m.prototype.hd;u.m.prototype.setMuted=u.m.prototype.fd;u.m.prototype.setPreload=u.m.prototype.gd;u.m.prototype.setAutoplay=u.m.prototype.bd;u.m.prototype.setLoop=u.m.prototype.ed;$("videojs.Flash",u.l);u.l.isSupported=u.l.isSupported;u.l.canPlaySource=u.l.mb;u.l.onReady=u.l.onReady;$("videojs.TextTrack",u.U);u.U.prototype.label=u.U.prototype.label;
$("videojs.CaptionsTrack",u.Pb);$("videojs.SubtitlesTrack",u.Xb);$("videojs.ChaptersTrack",u.Rb);$("videojs.autoSetup",u.bc);$("videojs.plugin",u.$c);$("videojs.createTimeRange",u.rb);})();//@ sourceMappingURL=video.js.map


/**************************************************************************
 * jquery.themepunch.revolution.js - jQuery Plugin for kenburn Slider
 * @version: 3.0 (16.06.2013)
 * @requires jQuery v1.7 or later (tested on 1.9)
 * @author ThemePunch
**************************************************************************/

(function(jQuery,undefined){


	////////////////////////////////////////
	// THE REVOLUTION PLUGIN STARTS HERE //
	///////////////////////////////////////

	jQuery.fn.extend({

		// OUR PLUGIN HERE :)
		revolution: function(options) {



				////////////////////////////////
				// SET DEFAULT VALUES OF ITEM //
				////////////////////////////////
				jQuery.fn.revolution.defaults = {
					delay:9000,
					startheight:500,
					startwidth:960,

					hideThumbs:200,

					thumbWidth:100,							// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
					thumbHeight:50,
					thumbAmount:5,

					navigationType:"bullet",				// bullet, thumb, none
					navigationArrows:"withbullet",			// nextto, solo, none

					navigationStyle:"round",				// round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item),

					navigationHAlign:"center",				// Vertical Align top,center,bottom
					navigationVAlign:"bottom",					// Horizontal Align left,center,right
					navigationHOffset:0,
					navigationVOffset:20,

					soloArrowLeftHalign:"left",
					soloArrowLeftValign:"center",
					soloArrowLeftHOffset:20,
					soloArrowLeftVOffset:0,

					soloArrowRightHalign:"right",
					soloArrowRightValign:"center",
					soloArrowRightHOffset:20,
					soloArrowRightVOffset:0,

					touchenabled:"on",						// Enable Swipe Function : on/off
					onHoverStop:"on",						// Stop Banner Timet at Hover on Slide on/off


					stopAtSlide:-1,							// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
					stopAfterLoops:-1,						// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic

					hideCaptionAtLimit:0,					// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
					hideAllCaptionAtLilmit:0,				// Hide all The Captions if Width of Browser is less then this value
					hideSliderAtLimit:0,					// Hide the whole slider, and stop also functions if Width of Browser is less than this value

					shadow:1,								//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
					fullWidth:"off",						// Turns On or Off the Fullwidth Image Centering in FullWidth Modus
					fullScreen:"off",

				};

					options = jQuery.extend({}, jQuery.fn.revolution.defaults, options);




					return this.each(function() {

						var opt=options;
						var container=jQuery(this);
						if (!container.hasClass("revslider-initialised")) {

									container.addClass("revslider-initialised");
									if (container.attr('id')==undefined) container.attr('id',"revslider-"+Math.round(Math.random()*1000+5));

									// CHECK IF FIREFOX 13 IS ON WAY.. IT HAS A STRANGE BUG, CSS ANIMATE SHOULD NOT BE USED



									opt.firefox13 = false;
									opt.ie = !jQuery.support.opacity;
									opt.ie9 = (document.documentMode == 9);


									// CHECK THE jQUERY VERSION
									var version = jQuery.fn.jquery.split('.'),
										versionTop = parseFloat(version[0]),
										versionMinor = parseFloat(version[1]),
										versionIncrement = parseFloat(version[2] || '0');

									if (versionTop==1 && versionMinor < 7) {
										container.html('<div style="text-align:center; padding:40px 0px; font-size:20px; color:#992222;"> The Current Version of jQuery:'+version+' <br>Please update your jQuery Version to min. 1.7 in Case you wish to use the Revolution Slider Plugin</div>');
									}

									if (versionTop>1) opt.ie=false;


									// Delegate .transition() calls to .animate()
									// if the browser can't do CSS transitions.
									if (!jQuery.support.transition)
										jQuery.fn.transition = jQuery.fn.animate;




									jQuery.cssEase['Bounce'] = 'cubic-bezier(0,1,0.5,1.3)';

									// CATCH THE CONTAINER
									//var container=jQuery(this);
									//container.css({'display':'block'});

									 // LOAD THE YOUTUBE API IF NECESSARY

									container.find('.caption').each(function() { jQuery(this).addClass('tp-caption')});
									var addedyt=0;
									var addedvim=0;
									var addedvid=0;
									container.find('.tp-caption iframe').each(function(i) {
										try {

												if (jQuery(this).attr('src').indexOf('you')>0 && addedyt==0) {
													addedyt=1;
													var s = document.createElement("script");
													s.src = "http://www.youtube.com/player_api"; /* Load Player API*/
													var before = document.getElementsByTagName("script")[0];
													before.parentNode.insertBefore(s, before);
												}
											} catch(e) {}
									});



									 // LOAD THE VIMEO API
									 container.find('.tp-caption iframe').each(function(i) {
										try{
												if (jQuery(this).attr('src').indexOf('vim')>0 && addedvim==0) {
													addedvim=1;
													var f = document.createElement("script");
													f.src = "http://a.vimeocdn.com/js/froogaloop2.min.js"; /* Load Player API*/
													var before = document.getElementsByTagName("script")[0];
													before.parentNode.insertBefore(f, before);
												}
											} catch(e) {}
									});

									// LOAD THE VIDEO.JS API IF NEEDED
									container.find('.tp-caption video').each(function(i) {
										try{
												if (jQuery(this).hasClass('video-js') && addedvid==0) {
													addedvid=1;
													var f = document.createElement("script");
													f.src = opt.videoJsPath+"video.js"; /* Load Player API*/
													var before = document.getElementsByTagName("script")[0];
													before.parentNode.insertBefore(f, before);
													jQuery('head').append('<link rel="stylesheet" type="text/css" href="'+opt.videoJsPath+'video-js.min.css" media="screen" />');
													jQuery('head').append('<script> videojs.options.flash.swf = "'+opt.videoJsPath+'video-js.swf";</script>');
												}
											} catch(e) {}
									});

									// SHUFFLE MODE
									if (opt.shuffle=="on") {
										for (var u=0;u<container.find('>ul:first-child >li').length;u++) {
											var it = Math.round(Math.random()*container.find('>ul:first-child >li').length);
											container.find('>ul:first-child >li:eq('+it+')').prependTo(container.find('>ul:first-child'));
										}
									}


									// CREATE SOME DEFAULT OPTIONS FOR LATER
									opt.slots=4;
									opt.act=-1;
									opt.next=0;

									// IF START SLIDE IS SET
									if (opt.startWithSlide !=undefined) opt.next=opt.startWithSlide;

									// IF DEEPLINK HAS BEEN SET
									var deeplink = getUrlVars("#")[0];
									if (deeplink.length<9) {
										if (deeplink.split('slide').length>1) {
											var dslide=parseInt(deeplink.split('slide')[1],0);
											if (dslide<1) dslide=1;
											if (dslide>container.find('>ul:first >li').length) dslide=container.find('>ul:first >li').length;
											opt.next=dslide-1;
										}
									}


									opt.origcd=opt.delay;

									opt.firststart=1;






									// BASIC OFFSET POSITIONS OF THE BULLETS
									if (opt.navigationHOffset==undefined) opt.navOffsetHorizontal=0;
									if (opt.navigationVOffset==undefined) opt.navOffsetVertical=0;





									container.append('<div class="tp-loader"></div>');

									// RESET THE TIMER
									if (container.find('.tp-bannertimer').length==0) container.append('<div class="tp-bannertimer" style="visibility:hidden"></div>');
									var bt=container.find('.tp-bannertimer');
									if (bt.length>0) {
										bt.css({'width':'0%'});
									};


									// WE NEED TO ADD A BASIC CLASS FOR SETTINGS.CSS
									container.addClass("tp-simpleresponsive");
									opt.container=container;

									//if (container.height()==0) container.height(opt.startheight);

									// AMOUNT OF THE SLIDES
									opt.slideamount = container.find('>ul:first >li').length;


									// A BASIC GRID MUST BE DEFINED. IF NO DEFAULT GRID EXIST THAN WE NEED A DEFAULT VALUE, ACTUAL SIZE OF CONAINER
									if (container.height()==0) container.height(opt.startheight);
									if (opt.startwidth==undefined || opt.startwidth==0) opt.startwidth=container.width();
									if (opt.startheight==undefined || opt.startheight==0) opt.startheight=container.height();

									// OPT WIDTH && HEIGHT SHOULD BE SET
									opt.width=container.width();
									opt.height=container.height();


									// DEFAULT DEPENDECIES
									opt.bw = opt.startwidth / container.width();
									opt.bh = opt.startheight / container.height();

									// IF THE ITEM ALREADY IN A RESIZED FORM
									if (opt.width!=opt.startwidth) {

										opt.height = Math.round(opt.startheight * (opt.width/opt.startwidth));
										container.height(opt.height);

									}

									// LETS SEE IF THERE IS ANY SHADOW
									if (opt.shadow!=0) {
										container.parent().append('<div class="tp-bannershadow tp-shadow'+opt.shadow+'"></div>');

										container.parent().find('.tp-bannershadow').css({'width':opt.width});
									}


									container.find('ul').css({'display':'none'});


									if (opt.lazyLoad!="on") {
										  // IF IMAGES HAS BEEN LOADED
										  container.waitForImages(function() {
												// PREPARE THE SLIDES
												container.find('ul').css({'display':'block'});
												prepareSlides(container,opt);

												// CREATE BULLETS
												if (opt.slideamount >1) createBullets(container,opt);
												if (opt.slideamount >1) createThumbs(container,opt);
												if (opt.slideamount >1) createArrows(container,opt);

												jQuery('#unvisible_button').click(function() {

														opt.navigationArrows=jQuery('.selectnavarrows').val();
														opt.navigationType=jQuery('.selectnavtype').val();
														opt.navigationStyle = jQuery('.selectnavstyle').val();
														opt.soloArrowStyle = "default";

														jQuery('.tp-bullets').remove();
														jQuery('.tparrows').remove();

														if (opt.slideamount >1) createBullets(container,opt);
														if (opt.slideamount >1) createThumbs(container,opt);
														if (opt.slideamount >1) createArrows(container,opt);

												});


												swipeAction(container,opt);

												if (opt.hideThumbs>0) hideThumbs(container,opt);


												container.waitForImages(function() {
													// START THE FIRST SLIDE

													container.find('.tp-loader').fadeOut(600);
													setTimeout(function() {

														swapSlide(container,opt);
														// START COUNTDOWN
														if (opt.slideamount >1) countDown(container,opt);
														container.trigger('revolution.slide.onloaded');
													},600);

												});


											});
									} else {		// IF LAZY LOAD IS ACTIVATED
											var fli = container.find('ul >li >img').first();
											if (fli.data('lazyload')!=undefined) fli.attr('src',fli.data('lazyload'));
											fli.data('lazydone',1);
											fli.parent().waitForImages(function() {

												// PREPARE THE SLIDES
												container.find('ul').css({'display':'block'});
												prepareSlides(container,opt);

												// CREATE BULLETS
												if (opt.slideamount >1) createBullets(container,opt);
												if (opt.slideamount >1) createThumbs(container,opt);
												if (opt.slideamount >1) createArrows(container,opt);

												swipeAction(container,opt);

												if (opt.hideThumbs>0) hideThumbs(container,opt);

												fli.parent().waitForImages(function() {
													// START THE FIRST SLIDE

													container.find('.tp-loader').fadeOut(600);
													setTimeout(function() {

														swapSlide(container,opt);
														// START COUNTDOWN
														if (opt.slideamount >1) countDown(container,opt);
														container.trigger('revolution.slide.onloaded');
													},600);
												});
											});
									}



									// IF RESIZED, NEED TO STOP ACTUAL TRANSITION AND RESIZE ACTUAL IMAGES
									jQuery(window).resize(function() {
										if (jQuery('body').find(container)!=0)
											if (container.outerWidth(true)!=opt.width) {
													containerResized(container,opt);
											}
									});


									// CHECK IF THE CAPTION IS A "SCROLL ME TO POSITION" CAPTION IS
									//if (opt.fullScreen=="on") {
										container.find('.tp-scrollbelowslider').on('click',function() {
												var off=0;
												try{
												 	off = jQuery('body').find(opt.fullScreenOffsetContainer).height();
												 } catch(e) {}
												try{
												 	off = off - jQuery(this).data('scrolloffset');
												 } catch(e) {}

												jQuery('body,html').animate(
													{scrollTop:(container.offset().top+(container.find('>ul >li').height())-off)+"px"},{duration:400});
											});
									//}
						}

					})
				},


		// METHODE PAUSE
		revscroll: function(oy) {
					return this.each(function() {
						var container=jQuery(this);
						jQuery('body,html').animate(
							{scrollTop:(container.offset().top+(container.find('>ul >li').height())-oy)+"px"},{duration:400});
					})
				},

		// METHODE PAUSE
		revpause: function(options) {

					return this.each(function() {
						var container=jQuery(this);
						container.data('conthover',1);
						container.data('conthover-changed',1);
						container.trigger('revolution.slide.onpause');
						var bt = container.parent().find('.tp-bannertimer');
						bt.stop();

					})


				},

		// METHODE RESUME
		revresume: function(options) {
					return this.each(function() {
						var container=jQuery(this);
						container.data('conthover',0);
						container.data('conthover-changed',1);
						container.trigger('revolution.slide.onresume');
						var bt = container.parent().find('.tp-bannertimer');
						var opt = bt.data('opt');

						bt.animate({'width':"100%"},{duration:((opt.delay-opt.cd)-100),queue:false, easing:"linear"});
					})

				},

		// METHODE NEXT
		revnext: function(options) {
					return this.each(function() {
						// CATCH THE CONTAINER
						var container=jQuery(this);
						container.parent().find('.tp-rightarrow').click();


					})

				},

		// METHODE RESUME
		revprev: function(options) {
					return this.each(function() {
						// CATCH THE CONTAINER
						var container=jQuery(this);
						container.parent().find('.tp-leftarrow').click();
					})

				},

		// METHODE LENGTH
		revmaxslide: function(options) {
						// CATCH THE CONTAINER
						return jQuery(this).find('>ul:first-child >li').length;
				},


		// METHODE CURRENT
		revcurrentslide: function(options) {
						// CATCH THE CONTAINER
						var container=jQuery(this);
						var bt = container.parent().find('.tp-bannertimer');
						var opt = bt.data('opt');
						return opt.act;
				},

		// METHODE CURRENT
		revlastslide: function(options) {
						// CATCH THE CONTAINER
						var container=jQuery(this);
						var bt = container.parent().find('.tp-bannertimer');
						var opt = bt.data('opt');
						return opt.lastslide;
				},


		// METHODE JUMP TO SLIDE
		revshowslide: function(slide) {
					return this.each(function() {
						// CATCH THE CONTAINER
						var container=jQuery(this);
						container.data('showus',slide);
						container.parent().find('.tp-rightarrow').click();
					})

				}


})


		///////////////////////////
		// GET THE URL PARAMETER //
		///////////////////////////
		function getUrlVars(hashdivider)
			{
				var vars = [], hash;
				var hashes = window.location.href.slice(window.location.href.indexOf(hashdivider) + 1).split('_');
				for(var i = 0; i < hashes.length; i++)
				{
					hashes[i] = hashes[i].replace('%3D',"=");
					hash = hashes[i].split('=');
					vars.push(hash[0]);
					vars[hash[0]] = hash[1];
				}
				return vars;
			}

		//////////////////////////
		//	CONTAINER RESIZED	//
		/////////////////////////
		function containerResized(container,opt) {


			container.find('.defaultimg').each(function(i) {

						setSize(jQuery(this),opt);

						opt.height = Math.round(opt.startheight * (opt.width/opt.startwidth));

						container.height(opt.height);

						setSize(jQuery(this),opt);

						try{
							container.parent().find('.tp-bannershadow').css({'width':opt.width});
						} catch(e) {}

						var actsh = container.find('>ul >li:eq('+opt.act+') .slotholder');
						var nextsh = container.find('>ul >li:eq('+opt.next+') .slotholder');
						removeSlots(container,opt);
						nextsh.find('.defaultimg').css({'opacity':0});
						actsh.find('.defaultimg').css({'opacity':1});

						setCaptionPositions(container,opt);

						var nextli = container.find('>ul >li:eq('+opt.next+')');
						container.find('.tp-caption').each(function() { jQuery(this).stop(true,true);});
						animateTheCaptions(nextli, opt);

						restartBannerTimer(opt,container);

				});
		}



		////////////////////////////////
		//	RESTART THE BANNER TIMER //
		//////////////////////////////
		function restartBannerTimer(opt,container) {
						opt.cd=0;
						if (opt.videoplaying !=true) {
							var bt=	container.find('.tp-bannertimer');
								if (bt.length>0) {
									bt.stop();
									bt.css({'width':'0%'});
									bt.animate({'width':"100%"},{duration:(opt.delay-100),queue:false, easing:"linear"});
								}
							clearTimeout(opt.thumbtimer);
							opt.thumbtimer = setTimeout(function() {
								moveSelectedThumb(container);
								setBulPos(container,opt);
							},200);
						}
		}

		////////////////////////////////
		//	RESTART THE BANNER TIMER //
		//////////////////////////////
		function killBannerTimer(opt,container) {
						opt.cd=0;

							var bt=	container.find('.tp-bannertimer');
								if (bt.length>0) {
									bt.stop(true,true);
									bt.css({'width':'0%'});
									//bt.animate({'width':"100%"},{duration:(opt.delay-100),queue:false, easing:"linear"});
								}
							clearTimeout(opt.thumbtimer);

		}

		function callingNewSlide(opt,container) {
						opt.cd=0;
						swapSlide(container,opt);

						// STOP TIMER AND RESCALE IT
							var bt=	container.find('.tp-bannertimer');
							if (bt.length>0) {
								bt.stop();
								bt.css({'width':'0%'});
								bt.animate({'width':"100%"},{duration:(opt.delay-100),queue:false, easing:"linear"});
							}
		}



		////////////////////////////////
		//	-	CREATE THE BULLETS -  //
		////////////////////////////////
		function createThumbs(container,opt) {

			var cap=container.parent();

			if (opt.navigationType=="thumb" || opt.navsecond=="both") {
						cap.append('<div class="tp-bullets tp-thumbs '+opt.navigationStyle+'"><div class="tp-mask"><div class="tp-thumbcontainer"></div></div></div>');
			}
			var bullets = cap.find('.tp-bullets.tp-thumbs .tp-mask .tp-thumbcontainer');
			var bup = bullets.parent();

			bup.width(opt.thumbWidth*opt.thumbAmount);
			bup.height(opt.thumbHeight);
			bup.parent().width(opt.thumbWidth*opt.thumbAmount);
			bup.parent().height(opt.thumbHeight);

			container.find('>ul:first >li').each(function(i) {
							var li= container.find(">ul:first >li:eq("+i+")");
							if (li.data('thumb') !=undefined)
								var src= li.data('thumb')
							else
								var src=li.find("img:first").attr('src');
							bullets.append('<div class="bullet thumb"><img src="'+src+'"></div>');
							var bullet= bullets.find('.bullet:first');
				});
			//bullets.append('<div style="clear:both"></div>');
			var minwidth=100;


			// ADD THE BULLET CLICK FUNCTION HERE
			bullets.find('.bullet').each(function(i) {
				var bul = jQuery(this);

				if (i==opt.slideamount-1) bul.addClass('last');
				if (i==0) bul.addClass('first');
				bul.width(opt.thumbWidth);
				bul.height(opt.thumbHeight);
				if (minwidth>bul.outerWidth(true)) minwidth=bul.outerWidth(true);

				bul.click(function() {
					if (opt.transition==0 && bul.index() != opt.act) {
						opt.next = bul.index();
						callingNewSlide(opt,container);
					}
				});
			});


			var max=minwidth*container.find('>ul:first >li').length;

			var thumbconwidth=bullets.parent().width();
			opt.thumbWidth = minwidth;



				////////////////////////
				// SLIDE TO POSITION  //
				////////////////////////
				if (thumbconwidth<max) {
					jQuery(document).mousemove(function(e) {
						jQuery('body').data('mousex',e.pageX);
					});



					// ON MOUSE MOVE ON THE THUMBNAILS EVERYTHING SHOULD MOVE :)

					bullets.parent().mouseenter(function() {
							var $this=jQuery(this);
							$this.addClass("over");
							var offset = $this.offset();
							var x = jQuery('body').data('mousex')-offset.left;
							var thumbconwidth=$this.width();
							var minwidth=$this.find('.bullet:first').outerWidth(true);
							var max=minwidth*container.find('>ul:first >li').length;
							var diff=(max- thumbconwidth)+15;
							var steps = diff / thumbconwidth;
							x=x-30;
							//if (x<30) x=0;
							//if (x>thumbconwidth-30) x=thumbconwidth;

							//ANIMATE TO POSITION
							var pos=(0-((x)*steps));
							if (pos>0) pos =0;
							if (pos<0-max+thumbconwidth) pos=0-max+thumbconwidth;
							moveThumbSliderToPosition($this,pos,200);
					});

					bullets.parent().mousemove(function() {

									var $this=jQuery(this);

									//if (!$this.hasClass("over")) {
											var offset = $this.offset();
											var x = jQuery('body').data('mousex')-offset.left;
											var thumbconwidth=$this.width();
											var minwidth=$this.find('.bullet:first').outerWidth(true);
											var max=minwidth*container.find('>ul:first >li').length;
											var diff=(max- thumbconwidth)+15;
											var steps = diff / thumbconwidth;
											x=x-30;
											//if (x<30) x=0;
											//if (x>thumbconwidth-30) x=thumbconwidth;

											//ANIMATE TO POSITION
											var pos=(0-((x)*steps));
											if (pos>0) pos =0;
											if (pos<0-max+thumbconwidth) pos=0-max+thumbconwidth;
											moveThumbSliderToPosition($this,pos,0);
									//} else {
										//$this.removeClass("over");
									//}

					});

					bullets.parent().mouseleave(function() {
									var $this=jQuery(this);
									$this.removeClass("over");
									moveSelectedThumb(container);
					});
				}


		}


		///////////////////////////////
		//	SelectedThumbInPosition //
		//////////////////////////////
		function moveSelectedThumb(container) {

									var bullets=container.parent().find('.tp-bullets.tp-thumbs .tp-mask .tp-thumbcontainer');
									var $this=bullets.parent();
									var offset = $this.offset();
									var minwidth=$this.find('.bullet:first').outerWidth(true);

									var x = $this.find('.bullet.selected').index() * minwidth;
									var thumbconwidth=$this.width();
									var minwidth=$this.find('.bullet:first').outerWidth(true);
									var max=minwidth*container.find('>ul:first >li').length;
									var diff=(max- thumbconwidth);
									var steps = diff / thumbconwidth;

									//ANIMATE TO POSITION
									var pos=0-x;

									if (pos>0) pos =0;
									if (pos<0-max+thumbconwidth) pos=0-max+thumbconwidth;
									if (!$this.hasClass("over")) {
										moveThumbSliderToPosition($this,pos,200);
									}
		}


		////////////////////////////////////
		//	MOVE THUMB SLIDER TO POSITION //
		///////////////////////////////////
		function moveThumbSliderToPosition($this,pos,speed) {
			$this.stop();
			$this.find('.tp-thumbcontainer').animate({'left':pos+'px'},{duration:speed,queue:false});
		}



		////////////////////////////////
		//	-	CREATE THE BULLETS -  //
		////////////////////////////////
		function createBullets(container,opt) {

			if (opt.navigationType=="bullet"  || opt.navigationType=="both") {
						container.parent().append('<div class="tp-bullets simplebullets '+opt.navigationStyle+'"></div>');
			}


			var bullets = container.parent().find('.tp-bullets');

			container.find('>ul:first >li').each(function(i) {
							var src=container.find(">ul:first >li:eq("+i+") img:first").attr('src');
							bullets.append('<div class="bullet"></div>');
							var bullet= bullets.find('.bullet:first');


				});

			// ADD THE BULLET CLICK FUNCTION HERE
			bullets.find('.bullet').each(function(i) {
				var bul = jQuery(this);
				if (i==opt.slideamount-1) bul.addClass('last');
				if (i==0) bul.addClass('first');

				bul.click(function() {
					var sameslide = false;
					if (opt.navigationArrows=="withbullet" || opt.navigationArrows=="nexttobullets") {
						if (bul.index()-1 == opt.act) sameslide=true;
					} else {
						if (bul.index() == opt.act) sameslide=true;
					}

					if (opt.transition==0 && !sameslide) {

					if (opt.navigationArrows=="withbullet" || opt.navigationArrows=="nexttobullets") {
							opt.next = bul.index()-1;
					} else {
							opt.next = bul.index();
					}

						callingNewSlide(opt,container);
					}
				});

			});

			bullets.append('<div class="tpclear"></div>');



			setBulPos(container,opt);





		}

		//////////////////////
		//	CREATE ARROWS	//
		/////////////////////
		function createArrows(container,opt) {

						var bullets = container.find('.tp-bullets');

						var hidden="";
						var arst= opt.navigationStyle;
						if (opt.navigationArrows=="none") hidden="visibility:none";
						opt.soloArrowStyle = "default";

						if (opt.navigationArrows!="none" && opt.navigationArrows!="nexttobullets") arst = opt.soloArrowStyle;

						container.parent().append('<div style="'+hidden+'" class="tp-leftarrow tparrows '+arst+'"></div>');
						container.parent().append('<div style="'+hidden+'" class="tp-rightarrow tparrows '+arst+'"></div>');

						// 	THE LEFT / RIGHT BUTTON CLICK !	 //
						container.parent().find('.tp-rightarrow').click(function() {

							if (opt.transition==0) {
									if (container.data('showus') !=undefined && container.data('showus') != -1)
										opt.next = container.data('showus')-1;
									else
										opt.next = opt.next+1;
									container.data('showus',-1);
									if (opt.next >= opt.slideamount) opt.next=0;
									if (opt.next<0) opt.next=0;

									if (opt.act !=opt.next)
										callingNewSlide(opt,container);
							}
						});

						container.parent().find('.tp-leftarrow').click(function() {
							if (opt.transition==0) {
									opt.next = opt.next-1;
									opt.leftarrowpressed=1;
									if (opt.next < 0) opt.next=opt.slideamount-1;
									callingNewSlide(opt,container);
							}
						});

						setBulPos(container,opt);

		}

		////////////////////////////
		// SET THE SWIPE FUNCTION //
		////////////////////////////
		function swipeAction(container,opt) {
			// TOUCH ENABLED SCROLL

				if (opt.touchenabled=="on")
						container.swipe( {data:container,
										swipeRight:function()
												{

													if (opt.transition==0) {
															opt.next = opt.next-1;
															opt.leftarrowpressed=1;
															if (opt.next < 0) opt.next=opt.slideamount-1;
															callingNewSlide(opt,container);
													}
												},
										swipeLeft:function()
												{

													if (opt.transition==0) {
															opt.next = opt.next+1;
															if (opt.next == opt.slideamount) opt.next=0;
															callingNewSlide(opt,container);
													}
												},
									allowPageScroll:"auto"} );
		}




		////////////////////////////////////////////////////////////////
		// SHOW AND HIDE THE THUMBS IF MOUE GOES OUT OF THE BANNER  ///
		//////////////////////////////////////////////////////////////
		function hideThumbs(container,opt) {

			var bullets = container.parent().find('.tp-bullets');
			var ca = container.parent().find('.tparrows');

			if (bullets==null) {
				container.append('<div class=".tp-bullets"></div>');
				var bullets = container.parent().find('.tp-bullets');
			}

			if (ca==null) {
				container.append('<div class=".tparrows"></div>');
				var ca = container.parent().find('.tparrows');
			}


			//var bp = (thumbs.parent().outerHeight(true) - opt.height)/2;

			//	ADD THUMBNAIL IMAGES FOR THE BULLETS //
			container.data('hidethumbs',opt.hideThumbs);

			bullets.addClass("hidebullets");
			ca.addClass("hidearrows");

			bullets.hover(function() {
				bullets.addClass("hovered");
				clearTimeout(container.data('hidethumbs'));
				bullets.removeClass("hidebullets");
				ca.removeClass("hidearrows");
			},
			function() {

				bullets.removeClass("hovered");
				if (!container.hasClass("hovered") && !bullets.hasClass("hovered"))
					container.data('hidethumbs', setTimeout(function() {
					bullets.addClass("hidebullets");
					ca.addClass("hidearrows");
					},opt.hideThumbs));
			});


			ca.hover(function() {
				bullets.addClass("hovered");
				clearTimeout(container.data('hidethumbs'));
				bullets.removeClass("hidebullets");
				ca.removeClass("hidearrows");

			},
			function() {

				bullets.removeClass("hovered");
				/*if (!container.hasClass("hovered") && !bullets.hasClass("hovered"))
					container.data('hidethumbs', setTimeout(function() {
							bullets.addClass("hidebullets");
							ca.addClass("hidearrows");
					},opt.hideThumbs));*/
			});



			container.on('mouseenter', function() {
				container.addClass("hovered");
				clearTimeout(container.data('hidethumbs'));
				bullets.removeClass("hidebullets");
				ca.removeClass("hidearrows");
			});

			container.on('mouseleave', function() {
				container.removeClass("hovered");
				if (!container.hasClass("hovered") && !bullets.hasClass("hovered"))
					container.data('hidethumbs', setTimeout(function() {
							bullets.addClass("hidebullets");
							ca.addClass("hidearrows");
					},opt.hideThumbs));
			});

		}







		//////////////////////////////
		//	SET POSITION OF BULLETS	//
		//////////////////////////////
		function setBulPos(container,opt) {
			var topcont=container.parent();
			var bullets=topcont.find('.tp-bullets');
			var tl = topcont.find('.tp-leftarrow');
			var tr = topcont.find('.tp-rightarrow');

			if (opt.navigationType=="thumb" && opt.navigationArrows=="nexttobullets") opt.navigationArrows="solo";
			// IM CASE WE HAVE NAVIGATION BULLETS TOGETHER WITH ARROWS
			if (opt.navigationArrows=="nexttobullets") {
				tl.prependTo(bullets).css({'float':'left'});
				tr.insertBefore(bullets.find('.tpclear')).css({'float':'left'});
			}


			if (opt.navigationArrows!="none" && opt.navigationArrows!="nexttobullets") {

				tl.css({'position':'absolute'});
				tr.css({'position':'absolute'});

				if (opt.soloArrowLeftValign=="center")	tl.css({'top':'50%','marginTop':(opt.soloArrowLeftVOffset-Math.round(tl.innerHeight()/2))+"px"});
				if (opt.soloArrowLeftValign=="bottom")	tl.css({'bottom':(0+opt.soloArrowLeftVOffset)+"px"});
				if (opt.soloArrowLeftValign=="top")	 	tl.css({'top':(0+opt.soloArrowLeftVOffset)+"px"});
				if (opt.soloArrowLeftHalign=="center")	tl.css({'left':'50%','marginLeft':(opt.soloArrowLeftHOffset-Math.round(tl.innerWidth()/2))+"px"});
				if (opt.soloArrowLeftHalign=="left")	tl.css({'left':(0+opt.soloArrowLeftHOffset)+"px"});
				if (opt.soloArrowLeftHalign=="right")	tl.css({'right':(0+opt.soloArrowLeftHOffset)+"px"});

				if (opt.soloArrowRightValign=="center")	tr.css({'top':'50%','marginTop':(opt.soloArrowRightVOffset-Math.round(tr.innerHeight()/2))+"px"});
				if (opt.soloArrowRightValign=="bottom")	tr.css({'bottom':(0+opt.soloArrowRightVOffset)+"px"});
				if (opt.soloArrowRightValign=="top")	tr.css({'top':(0+opt.soloArrowRightVOffset)+"px"});
				if (opt.soloArrowRightHalign=="center")	tr.css({'left':'50%','marginLeft':(opt.soloArrowRightHOffset-Math.round(tr.innerWidth()/2))+"px"});
				if (opt.soloArrowRightHalign=="left")	tr.css({'left':(0+opt.soloArrowRightHOffset)+"px"});
				if (opt.soloArrowRightHalign=="right")	tr.css({'right':(0+opt.soloArrowRightHOffset)+"px"});


				if (tl.position()!=null)
					tl.css({'top':Math.round(parseInt(tl.position().top,0))+"px"});

				if (tr.position()!=null)
					tr.css({'top':Math.round(parseInt(tr.position().top,0))+"px"});
			}

			if (opt.navigationArrows=="none") {
				tl.css({'visibility':'hidden'});
				tr.css({'visibility':'hidden'});
			}

			// SET THE POSITIONS OF THE BULLETS // THUMBNAILS


			if (opt.navigationVAlign=="center")	 bullets.css({'top':'50%','marginTop':(opt.navigationVOffset-Math.round(bullets.innerHeight()/2))+"px"});
			if (opt.navigationVAlign=="bottom")	 bullets.css({'bottom':(0+opt.navigationVOffset)+"px"});
			if (opt.navigationVAlign=="top")	 bullets.css({'top':(0+opt.navigationVOffset)+"px"});


			if (opt.navigationHAlign=="center")	bullets.css({'left':'50%','marginLeft':(opt.navigationHOffset-Math.round(bullets.innerWidth()/2))+"px"});
			if (opt.navigationHAlign=="left")	bullets.css({'left':(0+opt.navigationHOffset)+"px"});
			if (opt.navigationHAlign=="right")	bullets.css({'right':(0+opt.navigationHOffset)+"px"});



		}



		//////////////////////////////////////////////////////////
		//	-	SET THE IMAGE SIZE TO FIT INTO THE CONTIANER -  //
		////////////////////////////////////////////////////////
		function setSize(img,opt) {



						opt.width=parseInt(opt.container.width(),0);
						opt.height=parseInt(opt.container.height(),0);



						opt.bw = (opt.width / opt.startwidth);

						if (opt.fullScreen=="on") {
							opt.height = opt.bw * opt.startheight;
						}
						opt.bh = (opt.height / opt.startheight);



							 if (opt.bh>1) {
											opt.bh=1;
											opt.bw=1;
									}


						// IF IMG IS ALREADY PREPARED, WE RESET THE SIZE FIRST HERE

						if ((img.data('lazyload') !=undefined && img.data('lazydone') ==1) || img.data('lazyload') ===undefined) {
							if (img.data('orgw')!=undefined && img.data('orgw')!=0) {
								img.width(img.data('orgw'));
								img.height(img.data('orgh'));
							}
						}

						var fw = opt.width / img.width();
						var fh = opt.height / img.height();


						opt.fw = fw;
						opt.fh = fh;


						if ((img.data('lazyload') !=undefined && img.data('lazydone') ==1) || img.data('lazyload') ===undefined) {
							if (img.data('orgw')==undefined || img.data('orgw')==0) {

								img.data('orgw',img.width());
								img.data('orgh',img.height());

							}
						}



						if (opt.fullWidth=="on" && opt.fullScreen!="on") {

								var cow = opt.container.parent().width();
								var coh = opt.container.parent().height();
								var ffh = coh / img.data('orgh');
								var ffw = cow / img.data('orgw');


								if ((img.data('lazyload') !=undefined && img.data('lazydone') ==1) || img.data('lazyload') ===undefined) {
									img.width(img.width()*ffh);
									img.height(coh);
								}

								if (img.width()<cow) {
									img.width(cow+50);
									var ffw = img.width() / img.data('orgw');
									img.height(img.data('orgh')*ffw);

								}

								if (img.width()>cow) {
									img.data("fxof",(cow/2 - img.width()/2));
									img.css({'position':'absolute','left':img.data('fxof')+"px"});

								}


								if (img.height()<=coh) {
									img.data('fyof',0);
									img.data("fxof",(cow/2 - img.width()/2));
									img.css({'position':'absolute','top':img.data('fyof')+"px",'left':img.data('fxof')+"px"});

								}


								if (img.height()>coh && img.data('fullwidthcentering')=="on") {
									img.data('fyof',(coh/2 - img.height()/2));
									img.data("fxof",(cow/2 - img.width()/2));
									img.css({'position':'absolute','top':img.data('fyof')+"px",'left':img.data('fxof')+"px"});

								 }


						} else

					    if (opt.fullScreen=="on") {

								var cow = opt.container.parent().width();


								var coh = jQuery(window).height();

								// IF THE DEFAULT GRID IS HIGHER THEN THE CALCULATED SLIDER HEIGHT, WE NEED TO RESIZE THE SLIDER HEIGHT
								var offsety = coh/2 - (opt.startheight*opt.bh)/2;
								if (offsety<0) coh=opt.startheight*opt.bh;


								if (opt.fullScreenOffsetContainer!=undefined) {
									try{
										coh = coh - jQuery(opt.fullScreenOffsetContainer).outerHeight(true);
									} catch(e) {}
								}


								opt.container.parent().height(coh);
								opt.container.css({'height':'100%'});

								opt.height=coh;


								var ffh = coh / img.data('orgh');
								var ffw = cow / img.data('orgw');


								if ((img.data('lazyload') !=undefined && img.data('lazydone') ==1) || img.data('lazyload') ===undefined) {
									img.width(img.width()*ffh);
									img.height(coh);
								}


								if (img.width()<cow) {
									img.width(cow+50);
									var ffw = img.width() / img.data('orgw');
									img.height(img.data('orgh')*ffw);

								}

								if (img.width()>cow) {
									img.data("fxof",(cow/2 - img.width()/2));
									img.css({'position':'absolute','left':img.data('fxof')+"px"});

								}


								if (img.height()<=coh) {
									img.data('fyof',0);
									img.data("fxof",(cow/2 - img.width()/2));
									img.css({'position':'absolute','top':img.data('fyof')+"px",'left':img.data('fxof')+"px"});

								}


								if (img.height()>coh && img.data('fullwidthcentering')=="on") {
									img.data('fyof',(coh/2 - img.height()/2));
									img.data("fxof",(cow/2 - img.width()/2));
									img.css({'position':'absolute','top':img.data('fyof')+"px",'left':img.data('fxof')+"px"});

								 }


						}  else {
								if ((img.data('lazyload') !=undefined && img.data('lazydone') ==1) || img.data('lazyload') ===undefined) {
									img.width(opt.width);
									img.height(img.height()*fw);
								}

								if (img.height()<opt.height && img.height()!=0 && img.height()!=null) {

									if ((img.data('lazyload') !=undefined && img.data('lazydone') ==1) || img.data('lazyload') ===undefined) {
										img.height(opt.height);
										img.width(img.data('orgw')*fh);
									}
								}
						}



						img.data('neww',img.width());
						img.data('newh',img.height());
						if (opt.fullWidth=="on") {
							opt.slotw=Math.ceil(img.width()/opt.slots);
						} else {
							opt.slotw=Math.ceil(opt.width/opt.slots);
						}

						if (opt.fullSreen=="on")
							opt.sloth=Math.ceil(jQuery(window).height()/opt.slots);
						else
							opt.sloth=Math.ceil(opt.height/opt.slots);

		}




		/////////////////////////////////////////
		//	-	PREPARE THE SLIDES / SLOTS -  //
		///////////////////////////////////////
		function prepareSlides(container,opt) {

			container.find('.tp-caption').each(function() { jQuery(this).addClass(jQuery(this).data('transition')); jQuery(this).addClass('start') });
			// PREPARE THE UL CONTAINER TO HAVEING MAX HEIGHT AND HEIGHT FOR ANY SITUATION
			container.find('>ul:first').css({overflow:'hidden',width:'100%',height:'100%',maxHeight:container.parent().css('maxHeight')});

			container.find('>ul:first >li').each(function(j) {
				var li=jQuery(this);

				// MAKE LI OVERFLOW HIDDEN FOR FURTHER ISSUES
				li.css({'width':'100%','height':'100%','overflow':'hidden'});

				if (li.data('link')!=undefined) {
					var link = li.data('link');
					var target="_self";
					var zindex=2;
					if (li.data('slideindex')=="back") zindex=0;

					var linktoslide=li.data('linktoslide');
					if (li.data('target')!=undefined) target=li.data('target');

					if (link=="slide") {
						li.append('<div class="tp-caption sft slidelink" style="z-index:'+zindex+';" data-x="0" data-y="0" data-linktoslide="'+linktoslide+'" data-start="0"><a><div></div></a></div>');
					} else {
						linktoslide="no";
						li.append('<div class="tp-caption sft slidelink" style="z-index:'+zindex+';" data-x="0" data-y="0" data-linktoslide="'+linktoslide+'" data-start="0"><a target="'+target+'" href="'+link+'"><div></div></a></div>');
					}

				}
			});

			// RESOLVE OVERFLOW HIDDEN OF MAIN CONTAINER
			container.parent().css({'overflow':'visible'});


			container.find('>ul:first >li >img').each(function(j) {

				var img=jQuery(this);
				img.addClass('defaultimg');
				if (img.data('lazyload')!=undefined && img.data('lazydone') != 1) {
				} else {
					setSize(img,opt);
					setSize(img,opt);
				}
				img.wrap('<div class="slotholder"></div>');
				img.css({'opacity':0});
				img.data('li-id',j);

			});
		}


		///////////////////////
		// PREPARE THE SLIDE //
		//////////////////////
		function prepareOneSlide(slotholder,opt,visible) {

				var sh=slotholder;
				var img = sh.find('img')

				setSize(img,opt)
				var src = img.attr('src');
				var bgcolor=img.css('background-color');

				var w = img.data('neww');
				var h = img.data('newh');
				var fulloff = img.data("fxof");
				if (fulloff==undefined) fulloff=0;

				var fullyoff=img.data("fyof");
				if (img.data('fullwidthcentering')!="on" || fullyoff==undefined) fullyoff=0;

				var off=0;


				if (!visible)
					var off=0-opt.slotw;

				for (var i=0;i<opt.slots;i++)
					sh.append('<div class="slot" style="position:absolute;top:'+(0+fullyoff)+'px;left:'+(fulloff+i*opt.slotw)+'px;overflow:hidden;width:'+opt.slotw+'px;height:'+h+'px"><div class="slotslide" style="position:absolute;top:0px;left:'+off+'px;width:'+opt.slotw+'px;height:'+h+'px;overflow:hidden;"><img style="background-color:'+bgcolor+';position:absolute;top:0px;left:'+(0-(i*opt.slotw))+'px;width:'+w+'px;height:'+h+'px" src="'+src+'"></div></div>');

		}


		///////////////////////
		// PREPARE THE SLIDE //
		//////////////////////
		function prepareOneSlideV(slotholder,opt,visible) {

				var sh=slotholder;
				var img = sh.find('img')
				setSize(img,opt)
				var src = img.attr('src');
				var bgcolor=img.css('background-color');
				var w = img.data('neww');
				var h = img.data('newh');
				var fulloff = img.data("fxof");
				if (fulloff==undefined) fulloff=0;

				var fullyoff=img.data("fyof");
				if (img.data('fullwidthcentering')!="on" || fullyoff==undefined) fullyoff=0;

				var off=0;



				if (!visible)
					var off=0-opt.sloth;

				//alert(fullyoff+"  "+opt.sloth+" "opt.slots+"  "+)

				for (var i=0;i<opt.slots+2;i++)
					sh.append('<div class="slot" style="position:absolute;'+
												 'top:'+(fullyoff+(i*opt.sloth))+'px;'+
												 'left:'+(fulloff)+'px;'+
												 'overflow:hidden;'+
												 'width:'+w+'px;'+
												 'height:'+(opt.sloth)+'px"'+
												 '><div class="slotslide" style="position:absolute;'+
												 'top:'+(off)+'px;'+
												 'left:0px;width:'+w+'px;'+
												 'height:'+opt.sloth+'px;'+
												 'overflow:hidden;"><img style="position:absolute;'+
												 'background-color:'+bgcolor+';'+
												 'top:'+(0-(i*opt.sloth))+'px;'+
												 'left:0px;width:'+w+'px;'+
												 'height:'+h+'px" src="'+src+'"></div></div>');

		}


		///////////////////////
		// PREPARE THE SLIDE //
		//////////////////////
		function prepareOneSlideBox(slotholder,opt,visible) {

				var sh=slotholder;
				var img = sh.find('img')
				setSize(img,opt)
				var src = img.attr('src');
				var bgcolor=img.css('background-color');

				var w = img.data('neww');
				var h = img.data('newh');
				var fulloff = img.data("fxof");
				if (fulloff==undefined) fulloff=0;

				var fullyoff=img.data("fyof");
				if (img.data('fullwidthcentering')!="on" || fullyoff==undefined) fullyoff=0;



				var off=0;




				// SET THE MINIMAL SIZE OF A BOX
				var basicsize = 0;
				if (opt.sloth>opt.slotw)
					basicsize=opt.sloth
				else
					basicsize=opt.slotw;


				if (!visible) {
					var off=0-basicsize;
				}

				opt.slotw = basicsize;
				opt.sloth = basicsize;
				var x=0;
				var y=0;



				for (var j=0;j<opt.slots;j++) {

					y=0;
					for (var i=0;i<opt.slots;i++) 	{


						sh.append('<div class="slot" '+
								  'style="position:absolute;'+
											'top:'+(fullyoff+y)+'px;'+
											'left:'+(fulloff+x)+'px;'+
											'width:'+basicsize+'px;'+
											'height:'+basicsize+'px;'+
											'overflow:hidden;">'+

								  '<div class="slotslide" data-x="'+x+'" data-y="'+y+'" '+
								  'style="position:absolute;'+
											'top:'+(0)+'px;'+
											'left:'+(0)+'px;'+
											'width:'+basicsize+'px;'+
											'height:'+basicsize+'px;'+
											'overflow:hidden;">'+

								  '<img style="position:absolute;'+
											'top:'+(0-y)+'px;'+
											'left:'+(0-x)+'px;'+
											'width:'+w+'px;'+
											'height:'+h+'px'+
											'background-color:'+bgcolor+';"'+
								  'src="'+src+'"></div></div>');
						y=y+basicsize;
					}
					x=x+basicsize;
				}
		}





		///////////////////////
		//	REMOVE SLOTS	//
		/////////////////////
		function removeSlots(container,opt,time) {
			if (time==undefined)
				time==80

			setTimeout(function() {
				container.find('.slotholder .slot').each(function() {
					clearTimeout(jQuery(this).data('tout'));
					jQuery(this).remove();
				});
				opt.transition = 0;
			},time);
		}


		////////////////////////
		//	CAPTION POSITION  //
		///////////////////////
		function setCaptionPositions(container,opt) {

			// FIND THE RIGHT CAPTIONS
			var actli = container.find('>li:eq('+opt.act+')');
			var nextli = container.find('>li:eq('+opt.next+')');

			// SET THE NEXT CAPTION AND REMOVE THE LAST CAPTION
			var nextcaption=nextli.find('.tp-caption');

			if (nextcaption.find('iframe')==0) {

				// MOVE THE CAPTIONS TO THE RIGHT POSITION
				if (nextcaption.hasClass('hcenter'))
					nextcaption.css({'height':opt.height+"px",'top':'0px','left':(opt.width/2 - nextcaption.outerWidth()/2)+'px'});
				else
					if (nextcaption.hasClass('vcenter'))
						nextcaption.css({'width':opt.width+"px",'left':'0px','top':(opt.height/2 - nextcaption.outerHeight()/2)+'px'});
			}
		}


		//////////////////////////////
		//                         //
		//	-	SWAP THE SLIDES -  //
		//                        //
		////////////////////////////
		function swapSlide(container,opt) {
			try{
				var actli = container.find('>ul:first-child >li:eq('+opt.act+')');
			} catch(e) {
				var actli=container.find('>ul:first-child >li:eq(1)');
			}
			opt.lastslide=opt.act;
			var nextli = container.find('>ul:first-child >li:eq('+opt.next+')');

			var defimg= nextli.find('.defaultimg');

			if (defimg.data('lazyload') !=undefined && defimg.data('lazydone') !=1 ) {
				defimg.attr('src',nextli.find('.defaultimg').data('lazyload')),
				defimg.data('lazydone',1);
				defimg.data('orgw',0);
					container.find('.tp-loader').fadeIn(300);
					setTimeout(function() { killBannerTimer(opt,container)},180);


						nextli.waitForImages(function() {
							restartBannerTimer(opt,container)
							setSize(defimg,opt);
							setBulPos(container,opt);
							setSize(defimg,opt);
							swapSlideProgress(container,opt);
							container.find('.tp-loader').fadeOut(300);
						});

			} else {
			   	swapSlideProgress(container,opt);
			}
		}


		function swapSlideProgress(container,opt) {


			container.trigger('revolution.slide.onbeforeswap');


			opt.transition = 1;
			opt.videoplaying = false;
			//console.log("VideoPlay set to False due swapSlideProgress");

			try{
				var actli = container.find('>ul:first-child >li:eq('+opt.act+')');
			} catch(e) {
				var actli=container.find('>ul:first-child >li:eq(1)');
			}

			opt.lastslide=opt.act;

			var nextli = container.find('>ul:first-child >li:eq('+opt.next+')');

			var actsh = actli.find('.slotholder');
			var nextsh = nextli.find('.slotholder');
			actli.css({'visibility':'visible'});
			nextli.css({'visibility':'visible'});

			if (opt.ie) {
				if (comingtransition=="boxfade") comingtransition = "boxslide";
				if (comingtransition=="slotfade-vertical") comingtransition = "slotzoom-vertical";
				if (comingtransition=="slotfade-horizontal") comingtransition = "slotzoom-horizontal";
			}


			// IF DELAY HAS BEEN SET VIA THE SLIDE, WE TAKE THE NEW VALUE, OTHER WAY THE OLD ONE...
			if (nextli.data('delay')!=undefined) {
						opt.cd=0;
						opt.delay=nextli.data('delay');
			} else {
				opt.delay=opt.origcd;
			}

			// RESET POSITION AND FADES OF LI'S
			actli.css({'left':'0px','top':'0px'});
			nextli.css({'left':'0px','top':'0px'});


			// IF THERE IS AN OTHER FIRST SLIDE START HAS BEED SELECTED
			if (nextli.data('differentissplayed') =='prepared') {
				nextli.data('differentissplayed','done');
				nextli.data('transition',nextli.data('savedtransition'));
				nextli.data('slotamount',nextli.data('savedslotamount'));
				nextli.data('masterspeed',nextli.data('savedmasterspeed'));
			}


			if (nextli.data('fstransition') != undefined && nextli.data('differentissplayed') !="done") {
				nextli.data('savedtransition',nextli.data('transition'));
				nextli.data('savedslotamount',nextli.data('slotamount'));
				nextli.data('savedmasterspeed',nextli.data('masterspeed'));

				nextli.data('transition',nextli.data('fstransition'));
				nextli.data('slotamount',nextli.data('fsslotamount'));
				nextli.data('masterspeed',nextli.data('fsmasterspeed'));

				nextli.data('differentissplayed','prepared');
			}

			///////////////////////////////////////
			// TRANSITION CHOOSE - RANDOM EFFECTS//
			///////////////////////////////////////
			var nexttrans = 0;


			var transtext = nextli.data('transition').split(",");
			var curtransid = nextli.data('nexttransid');
			if (curtransid == undefined) {
			  curtransid=0;
			  nextli.data('nexttransid',curtransid);
			} else {
				curtransid=curtransid+1;
				if (curtransid==transtext.length) curtransid=0;
				nextli.data('nexttransid',curtransid);

			}



			var comingtransition = transtext[curtransid];

			if (comingtransition=="boxslide") nexttrans = 0
			else
				if (comingtransition=="boxfade") nexttrans = 1
			else
				if (comingtransition=="slotslide-horizontal") nexttrans = 2
			else
				if (comingtransition=="slotslide-vertical") nexttrans = 3
			else
				if (comingtransition=="curtain-1") nexttrans = 4
			else
				if (comingtransition=="curtain-2") nexttrans = 5
			else
				if (comingtransition=="curtain-3") nexttrans = 6
			else
				if (comingtransition=="slotzoom-horizontal") nexttrans = 7
			else
				if (comingtransition=="slotzoom-vertical")  nexttrans = 8
			else
				if (comingtransition=="slotfade-horizontal")  nexttrans = 9
			else
				if (comingtransition=="slotfade-vertical") nexttrans = 10
			else
				if (comingtransition=="fade") nexttrans = 11
			else
				if (comingtransition=="slideleft")  nexttrans = 12
			else
				if (comingtransition=="slideup") nexttrans = 13
			else
				if (comingtransition=="slidedown") nexttrans = 14
			else
				if (comingtransition=="slideright") nexttrans = 15;
			else
				if (comingtransition=="papercut") nexttrans = 16;
			else
				if (comingtransition=="3dcurtain-horizontal") nexttrans = 17;
			else
				if (comingtransition=="3dcurtain-vertical") nexttrans = 18;
			else
				if (comingtransition=="cubic" || comingtransition=="cube") nexttrans = 19;
			else
				if (comingtransition=="flyin") nexttrans = 20;
			else
				if (comingtransition=="turnoff") nexttrans = 21;
			else {
				nexttrans=Math.round(Math.random()*21);
				nextli.data('slotamount',Math.round(Math.random()*12+4));
			}

			if (comingtransition=="random-static")   {
						nexttrans=Math.round(Math.random()*16);
						if (nexttrans>15) nexttrans=15;
						if (nexttrans<0) nexttrans=0;
			}

			if (comingtransition=="random-premium")   {
						nexttrans=Math.round(Math.random()*6+16);
						if (nexttrans>21) nexttrans=21;
						if (nexttrans<16) nexttrans=16;
			}



		    var direction=-1;
			if (opt.leftarrowpressed==1 || opt.act>opt.next) direction=1;

			if (comingtransition=="slidehorizontal") {
						nexttrans = 12
					if (opt.leftarrowpressed==1)
						nexttrans = 15
				}

			if (comingtransition=="slidevertical") {
						nexttrans = 13
					if (opt.leftarrowpressed==1)
						nexttrans = 14
				}

			opt.leftarrowpressed=0;



			if (nexttrans>21) nexttrans = 21;
			if (nexttrans<0) nexttrans = 0;

			if ((opt.ie || opt.ie9) && nexttrans >18) {
					nexttrans=Math.round(Math.random()*16);
					nextli.data('slotamount',Math.round(Math.random()*12+4));
			};
			if (opt.ie && (nexttrans==17 || nexttrans==16 || nexttrans==2 || nexttrans==3 || nexttrans==9 || nexttrans==10 )) nexttrans=Math.round(Math.random()*3+12);


			if (opt.ie9 && (nexttrans==3)) nexttrans = 4;




			//jQuery('body').find('.debug').html("Transition:"+nextli.data('transition')+"  id:"+nexttrans);

			// DEFINE THE MASTERSPEED FOR THE SLIDE //
			var masterspeed=300;
			if (nextli.data('masterspeed')!=undefined && nextli.data('masterspeed')>99 && nextli.data('masterspeed')<4001)
				masterspeed = nextli.data('masterspeed');



			/////////////////////////////////////////////
			// SET THE BULLETS SELECTED OR UNSELECTED  //
			/////////////////////////////////////////////


			container.parent().find(".bullet").each(function() {
				var bul = jQuery(this);
				bul.removeClass("selected");


				if (opt.navigationArrows=="withbullet" || opt.navigationArrows=="nexttobullets") {
					if (bul.index()-1 == opt.next) bul.addClass('selected');

				} else {

					if (bul.index() == opt.next)  bul.addClass('selected');

				}
			});


			//////////////////////////////////////////////////////////////////
			// 		SET THE NEXT CAPTION AND REMOVE THE LAST CAPTION		//
			//////////////////////////////////////////////////////////////////

					container.find('>li').each(function() {
						var li = jQuery(this);
						if (li.index!=opt.act && li.index!=opt.next) li.css({'z-index':16});
					});

					actli.css({'z-index':18});
					nextli.css({'z-index':20});
					nextli.css({'opacity':0});


			///////////////////////////
			//	ANIMATE THE CAPTIONS //
			///////////////////////////
			if (actli.index() != nextli.index()) {
				removeTheCaptions(actli,opt);

			}
			animateTheCaptions(nextli, opt);




			/////////////////////////////////////////////
			//	SET THE ACTUAL AMOUNT OF SLIDES !!     //
			//  SET A RANDOM AMOUNT OF SLOTS          //
			///////////////////////////////////////////
						if (nextli.data('slotamount')==undefined || nextli.data('slotamount')<1) {
							opt.slots=Math.round(Math.random()*12+4);
							if (comingtransition=="boxslide")
								opt.slots=Math.round(Math.random()*6+3);
						 } else {
							opt.slots=nextli.data('slotamount');

						}

			/////////////////////////////////////////////
			//	SET THE ACTUAL AMOUNT OF SLIDES !!     //
			//  SET A RANDOM AMOUNT OF SLOTS          //
			///////////////////////////////////////////
						if (nextli.data('rotate')==undefined)
							opt.rotate = 0
						 else
							if (nextli.data('rotate')==999)
								opt.rotate=Math.round(Math.random()*360);
							 else
							    opt.rotate=nextli.data('rotate');
						if (!jQuery.support.transition  || opt.ie || opt.ie9) opt.rotate=0;



			//////////////////////////////
			//	FIRST START 			//
			//////////////////////////////

			if (opt.firststart==1) {
					actli.css({'opacity':0});
					opt.firststart=0;
			}


			/////////////////////////////////////
			// THE SLOTSLIDE - TRANSITION I.  //
			////////////////////////////////////
			if (nexttrans==0) {								// BOXSLIDE

						masterspeed = masterspeed + 100;
						if (opt.slots>10) opt.slots=10;

						nextli.css({'opacity':1});

						// PREPARE THE SLOTS HERE
						prepareOneSlideBox(actsh,opt,true);
						prepareOneSlideBox(nextsh,opt,false);

						//SET DEFAULT IMG UNVISIBLE
						nextsh.find('.defaultimg').css({'opacity':0});
						//actsh.find('.defaultimg').css({'opacity':0});


						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT


						nextsh.find('.slotslide').each(function(j) {
							var ss=jQuery(this);
							if (opt.ie9)
								ss.transition({top:(0-opt.sloth),left:(0-opt.slotw)},0);
							else
								ss.transition({top:(0-opt.sloth),left:(0-opt.slotw), rotate:opt.rotate},0);
							setTimeout(function() {
											ss.transition({top:0, left:0, scale:1, rotate:0},masterspeed*1.5,function() {

																	if (j==(opt.slots*opt.slots)-1) {
																		removeSlots(container,opt);
																		nextsh.find('.defaultimg').css({'opacity':1});

																		if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
																		opt.act=opt.next;
																	moveSelectedThumb(container);

																	}
															});
							},j*15);
						});
			}



			/////////////////////////////////////
			// THE SLOTSLIDE - TRANSITION I.  //
			////////////////////////////////////
			if (nexttrans==1) {


						if (opt.slots>5) opt.slots=5;
						nextli.css({'opacity':1});

						// PREPARE THE SLOTS HERE
						//prepareOneSlideBox(actsh,opt,true);
						prepareOneSlideBox(nextsh,opt,false);

						//SET DEFAULT IMG UNVISIBLE
						nextsh.find('.defaultimg').css({'opacity':0});
						//actsh.find('.defaultimg').css({'opacity':0});


						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT

						nextsh.find('.slotslide').each(function(j) {
							var ss=jQuery(this);
							ss.css({'opacity':0});
							ss.find('img').css({'opacity':0});
							if (opt.ie9)
								ss.find('img').transition({'top':(Math.random()*opt.slotw-opt.slotw)+"px",'left':(Math.random()*opt.slotw-opt.slotw)+"px"},0);
							else
								ss.find('img').transition({'top':(Math.random()*opt.slotw-opt.slotw)+"px",'left':(Math.random()*opt.slotw-opt.slotw)+"px", rotate:opt.rotate},0);

							var rand=Math.random()*1000+(masterspeed + 200);
							if (j==(opt.slots*opt.slots)-1) rand=1500;

									ss.find('img').transition({'opacity':1,'top':(0-ss.data('y'))+"px",'left':(0-ss.data('x'))+'px', rotate:0},rand);
									ss.transition({'opacity':1},rand,function() {
															if (j==(opt.slots*opt.slots)-1) {
																removeSlots(container,opt);
																nextsh.find('.defaultimg').css({'opacity':1});
																if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
																opt.act=opt.next;

																moveSelectedThumb(container);
															}

									});


						});
			}


			/////////////////////////////////////
			// THE SLOTSLIDE - TRANSITION I.  //
			////////////////////////////////////
			if (nexttrans==2) {


						masterspeed = masterspeed + 200;

						nextli.css({'opacity':1});

						// PREPARE THE SLOTS HERE
						prepareOneSlide(actsh,opt,true);
						prepareOneSlide(nextsh,opt,false);

						//SET DEFAULT IMG UNVISIBLE
						nextsh.find('.defaultimg').css({'opacity':0});
						//actsh.find('.defaultimg').css({'opacity':0});


						// ALL OLD SLOTS SHOULD BE SLIDED TO THE RIGHT
						actsh.find('.slotslide').each(function() {
							var ss=jQuery(this);


									//ss.animate({'left':opt.slotw+'px'},{duration:masterspeed,queue:false,complete:function() {
									ss.transit({'left':opt.slotw+'px',rotate:(0-opt.rotate)},masterspeed,function() {
															removeSlots(container,opt);
															nextsh.find('.defaultimg').css({'opacity':1});
															if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
															opt.act=opt.next;
															moveSelectedThumb(container);

									});

						});

						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT
						nextsh.find('.slotslide').each(function() {
							var ss=jQuery(this);
							if (opt.ie9)
								ss.transit({'left':(0-opt.slotw)+"px"},0);
							else
								ss.transit({'left':(0-opt.slotw)+"px",rotate:opt.rotate},0);

									ss.transit({'left':'0px',rotate:0},masterspeed,function() {
															removeSlots(container,opt);
															nextsh.find('.defaultimg').css({'opacity':1});
															if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
															if (opt.ie) actsh.find('.defaultimg').css({'opacity':1});
															opt.act=opt.next;

																		moveSelectedThumb(container);

									});

						});
			}



			/////////////////////////////////////
			// THE SLOTSLIDE - TRANSITION I.  //
			////////////////////////////////////
			if (nexttrans==3) {


						masterspeed = masterspeed + 200;
						nextli.css({'opacity':1});

						// PREPARE THE SLOTS HERE
						prepareOneSlideV(actsh,opt,true);
						prepareOneSlideV(nextsh,opt,false);

						//SET DEFAULT IMG UNVISIBLE
						nextsh.find('.defaultimg').css({'opacity':0});
						//actsh.find('.defaultimg').css({'opacity':0});

						// ALL OLD SLOTS SHOULD BE SLIDED TO THE RIGHT
						actsh.find('.slotslide').each(function() {
							var ss=jQuery(this);

									ss.transit({'top':opt.sloth+'px',rotate:opt.rotate},masterspeed,function() {
															removeSlots(container,opt);
															nextsh.find('.defaultimg').css({'opacity':1});
															if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
															opt.act=opt.next;
															moveSelectedThumb(container);

									});

						});

						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT
						nextsh.find('.slotslide').each(function() {
							var ss=jQuery(this);
								if (opt.ie9)
									ss.transit({'top':(0-opt.sloth)+"px"},0);
								else
									ss.transit({'top':(0-opt.sloth)+"px",rotate:opt.rotate},0);
								ss.transit({'top':'0px',rotate:0},masterspeed,function() {
													removeSlots(container,opt);
													nextsh.find('.defaultimg').css({'opacity':1});
													if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
													opt.act=opt.next;
													moveSelectedThumb(container);

								});

						});
			}



			/////////////////////////////////////
			// THE SLOTSLIDE - TRANSITION I.  //
			////////////////////////////////////
			if (nexttrans==4) {



						nextli.css({'opacity':1});

						// PREPARE THE SLOTS HERE
						prepareOneSlide(actsh,opt,true);
						prepareOneSlide(nextsh,opt,true);

						//SET DEFAULT IMG UNVISIBLE
						nextsh.find('.defaultimg').css({'opacity':0});
						actsh.find('.defaultimg').css({'opacity':0});


						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT
						actsh.find('.slotslide').each(function(i) {
							var ss=jQuery(this);

							ss.transit({'top':(0+(opt.height))+"px",'opacity':1,rotate:opt.rotate},masterspeed+(i*(70-opt.slots)));
						});

						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT
						nextsh.find('.slotslide').each(function(i) {
							var ss=jQuery(this);
								if (opt.ie9)
										ss.transition({'top':(0-(opt.height))+"px",'opacity':0},0);
									else
										ss.transition({'top':(0-(opt.height))+"px",'opacity':0,rotate:opt.rotate},0);

									ss.transition({'top':'0px','opacity':1,rotate:0},masterspeed+(i*(70-opt.slots)),function() {
															if (i==opt.slots-1) {
																removeSlots(container,opt);
																nextsh.find('.defaultimg').css({'opacity':1});
																if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
																opt.act=opt.next;
																moveSelectedThumb(container);
															}

									});

						});
			}


			/////////////////////////////////////
			// THE SLOTSLIDE - TRANSITION I.  //
			////////////////////////////////////
			if (nexttrans==5) {



						nextli.css({'opacity':1});

						// PREPARE THE SLOTS HERE
						prepareOneSlide(actsh,opt,true);
						prepareOneSlide(nextsh,opt,true);

						//SET DEFAULT IMG UNVISIBLE
						nextsh.find('.defaultimg').css({'opacity':0});
						actsh.find('.defaultimg').css({'opacity':0});

						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT
						actsh.find('.slotslide').each(function(i) {
							var ss=jQuery(this);

									ss.transition({'top':(0+(opt.height))+"px",'opacity':1,rotate:opt.rotate},masterspeed+((opt.slots-i)*(70-opt.slots)));

						});

						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT
						nextsh.find('.slotslide').each(function(i) {
							var ss=jQuery(this);
									if (opt.ie9)
										ss.transition({'top':(0-(opt.height))+"px",'opacity':0},0);
									else
										ss.transition({'top':(0-(opt.height))+"px",'opacity':0,rotate:opt.rotate},0);

									ss.transition({'top':'0px','opacity':1,rotate:0},masterspeed+((opt.slots-i)*(70-opt.slots)),function() {
															if (i==0) {
																removeSlots(container,opt);
																nextsh.find('.defaultimg').css({'opacity':1});
																if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
																opt.act=opt.next;
																moveSelectedThumb(container);
															}

									});

						});
			}


			/////////////////////////////////////
			// THE SLOTSLIDE - TRANSITION I.  //
			////////////////////////////////////
			if (nexttrans==6) {



						nextli.css({'opacity':1});
						if (opt.slots<2) opt.slots=2;
						// PREPARE THE SLOTS HERE
						prepareOneSlide(actsh,opt,true);
						prepareOneSlide(nextsh,opt,true);

						//SET DEFAULT IMG UNVISIBLE
						nextsh.find('.defaultimg').css({'opacity':0});
						actsh.find('.defaultimg').css({'opacity':0});


						actsh.find('.slotslide').each(function(i) {
							var ss=jQuery(this);

							if (i<opt.slots/2)
								var tempo = (i+2)*60;
							else
								var tempo = (2+opt.slots-i)*60;


									ss.transition({'top':(0+(opt.height))+"px",'opacity':1},masterspeed+tempo);

						});

						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT
						nextsh.find('.slotslide').each(function(i) {
							var ss=jQuery(this);
							if (opt.ie9)
								ss.transition({'top':(0-(opt.height))+"px",'opacity':0},0);
							else
								ss.transition({'top':(0-(opt.height))+"px",'opacity':0,rotate:opt.rotate},0);
							if (i<opt.slots/2)
								var tempo = (i+2)*60;
							else
								var tempo = (2+opt.slots-i)*60;


									ss.transition({'top':'0px','opacity':1,rotate:0},masterspeed+tempo,function() {
															if (i==Math.round(opt.slots/2)) {
																removeSlots(container,opt);
																nextsh.find('.defaultimg').css({'opacity':1});
																if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
																opt.act=opt.next;
																moveSelectedThumb(container);
															}

									});

						});
			}


			////////////////////////////////////
			// THE SLOTSZOOM - TRANSITION II. //
			////////////////////////////////////
			if (nexttrans==7) {

						masterspeed = masterspeed * 3;
						nextli.css({'opacity':1});

						// PREPARE THE SLOTS HERE
						prepareOneSlide(actsh,opt,true);
						prepareOneSlide(nextsh,opt,true);

						//SET DEFAULT IMG UNVISIBLE
						nextsh.find('.defaultimg').css({'opacity':0});
						//actsh.find('.defaultimg').css({'opacity':0});

						// ALL OLD SLOTS SHOULD BE SLIDED TO THE RIGHT
						actsh.find('.slotslide').each(function() {
							var ss=jQuery(this).find('img');

									ss.transition({'left':(0-opt.slotw/2)+'px',
												   'top':(0-opt.height/2)+'px',
												   'width':(opt.slotw*2)+"px",
												   'height':(opt.height*2)+"px",
												   opacity:0,
												   rotate:opt.rotate
													},masterspeed,function() {
															removeSlots(container,opt);
															nextsh.find('.defaultimg').css({'opacity':1});
															if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
															opt.act = opt.next;
															moveSelectedThumb(container);
													});

						});

/						//////////////////////////////////////////////////////////////
						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT //
						///////////////////////////////////////////////////////////////
						nextsh.find('.slotslide').each(function(i) {
							var ss=jQuery(this).find('img');

									if (opt.ie9)
										ss.transition({'left':(0)+'px','top':(0)+'px',opacity:0},0);
									else
										ss.transition({'left':(0)+'px','top':(0)+'px',opacity:0,rotate:opt.rotate},0);
									ss.transition({'left':(0-i*opt.slotw)+'px',
												   'top':(0)+'px',
												   'width':(nextsh.find('.defaultimg').data('neww'))+"px",
												   'height':(nextsh.find('.defaultimg').data('newh'))+"px",
												   opacity:1,rotate:0

													},masterspeed,function() {
															removeSlots(container,opt);
															nextsh.find('.defaultimg').css({'opacity':1});
															if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
															opt.act = opt.next;
															moveSelectedThumb(container);
													});


						});
			}




			////////////////////////////////////
			// THE SLOTSZOOM - TRANSITION II. //
			////////////////////////////////////
			if (nexttrans==8) {

						masterspeed = masterspeed * 3;
						nextli.css({'opacity':1});

						// PREPARE THE SLOTS HERE
						prepareOneSlideV(actsh,opt,true);
						prepareOneSlideV(nextsh,opt,true);

						//SET DEFAULT IMG UNVISIBLE
						nextsh.find('.defaultimg').css({'opacity':0});
						//actsh.find('.defaultimg').css({'opacity':0});

						// ALL OLD SLOTS SHOULD BE SLIDED TO THE RIGHT
						actsh.find('.slotslide').each(function() {
							var ss=jQuery(this).find('img');

									ss.transition({'left':(0-opt.width/2)+'px',
												   'top':(0-opt.sloth/2)+'px',
												   'width':(opt.width*2)+"px",
												   'height':(opt.sloth*2)+"px",
												   opacity:0,rotate:opt.rotate
													},masterspeed,function() {
															removeSlots(container,opt);
															nextsh.find('.defaultimg').css({'opacity':1});
															if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});

															opt.act = opt.next;
															moveSelectedThumb(container);
													});

						});


						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT //
						///////////////////////////////////////////////////////////////
						nextsh.find('.slotslide').each(function(i) {
							var ss=jQuery(this).find('img');
									if (opt.ie9)
										ss.transition({'left':(0)+'px','top':(0)+'px',opacity:0},0);
									else
										ss.transition({'left':(0)+'px','top':(0)+'px',opacity:0,rotate:opt.rotate},0);
									ss.transition({'left':(0)+'px',
												   'top':(0-i*opt.sloth)+'px',
												   'width':(nextsh.find('.defaultimg').data('neww'))+"px",
												   'height':(nextsh.find('.defaultimg').data('newh'))+"px",
												   opacity:1,rotate:0
													},masterspeed,function() {
															removeSlots(container,opt);
															nextsh.find('.defaultimg').css({'opacity':1});
															if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});

															opt.act = opt.next;
															moveSelectedThumb(container);
													});

						});
			}


			////////////////////////////////////////
			// THE SLOTSFADE - TRANSITION III.   //
			//////////////////////////////////////
			if (nexttrans==9) {



						nextli.css({'opacity':1});

						opt.slots = opt.width/20;

						prepareOneSlide(nextsh,opt,true);


						//actsh.find('.defaultimg').css({'opacity':0});
						nextsh.find('.defaultimg').css({'opacity':0});

						var ssamount=0;
						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT
						nextsh.find('.slotslide').each(function(i) {
							var ss=jQuery(this);
							ssamount++;
							ss.transition({'opacity':0,x:0,y:0},0);
							ss.data('tout',setTimeout(function() {
											ss.transition({x:0,y:0,'opacity':1},masterspeed);

											},i*4)
									);

						});

						//nextsh.find('.defaultimg').transition({'opacity':1},(masterspeed+(ssamount*4)));

						setTimeout(function() {
									removeSlots(container,opt);
									nextsh.find('.defaultimg').css({'opacity':1});
									if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
									if (opt.ie) actsh.find('.defaultimg').css({'opacity':1});

									opt.act = opt.next;
									moveSelectedThumb(container);
							},(masterspeed+(ssamount*4)));
			}




			////////////////////////////////////////
			// THE SLOTSFADE - TRANSITION III.   //
			//////////////////////////////////////
			if (nexttrans==10) {



						nextli.css({'opacity':1});

						opt.slots = opt.height/20;

						prepareOneSlideV(nextsh,opt,true);


						//actsh.find('.defaultimg').css({'opacity':0});
						nextsh.find('.defaultimg').css({'opacity':0});

						var ssamount=0;
						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT
						nextsh.find('.slotslide').each(function(i) {
							var ss=jQuery(this);
							ssamount++;
							ss.transition({'opacity':0,x:0,y:0},0);
							ss.data('tout',setTimeout(function() {
											ss.transition({x:0,y:0,'opacity':1},masterspeed);

											},i*4)
									);

						});

						//nextsh.find('.defaultimg').transition({'opacity':1},(masterspeed+(ssamount*4)));

						setTimeout(function() {
									removeSlots(container,opt);
									nextsh.find('.defaultimg').css({'opacity':1});
									if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
									if (opt.ie) actsh.find('.defaultimg').css({'opacity':1});

									opt.act = opt.next;
									moveSelectedThumb(container);
							},(masterspeed+(ssamount*4)));
			}


			///////////////////////////
			// SIMPLE FADE ANIMATION //
			///////////////////////////

			if (nexttrans==11) {



						nextli.css({'opacity':1});

						opt.slots = 1;

						prepareOneSlide(nextsh,opt,true);


						//actsh.find('.defaultimg').css({'opacity':0});
						nextsh.find('.defaultimg').css({'opacity':0,'position':'relative'});

						var ssamount=0;
						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT

						nextsh.find('.slotslide').each(function(i) {
							var ss=jQuery(this);
							ssamount++;

							if (opt.ie9 ||opt.ie) {
								if (opt.ie) nextli.css({'opacity':'0'});
								ss.css({'opacity':0});

							} else
								ss.transition({'opacity':0,rotate:opt.rotate},0);


							setTimeout(function() {
								if (opt.ie9 ||opt.ie) {
									if (opt.ie)
										nextli.animate({'opacity':1},{duration:masterspeed});
									 else
									 	ss.transition({'opacity':1},masterspeed);

								} else {
									ss.transition({'opacity':1,rotate:0},masterspeed);
								}
							},10);
						});

						setTimeout(function() {
									removeSlots(container,opt);
									nextsh.find('.defaultimg').css({'opacity':1});
									if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
									if (opt.ie) actsh.find('.defaultimg').css({'opacity':1});

									opt.act = opt.next;
									moveSelectedThumb(container);
							},masterspeed+15);
			}






			if (nexttrans==12 || nexttrans==13 || nexttrans==14 || nexttrans==15) {

						masterspeed = masterspeed * 3;
						nextli.css({'opacity':1});

						opt.slots = 1;

						prepareOneSlide(nextsh,opt,true);
						prepareOneSlide(actsh,opt,true);


						actsh.find('.defaultimg').css({'opacity':0});
						nextsh.find('.defaultimg').css({'opacity':0});

						var oow = opt.width;
						var ooh = opt.height;


						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT
						var ssn=nextsh.find('.slotslide')

						if (opt.fullWidth=="on" || opt.fullSreen=="on") {
							oow=ssn.width();
							ooh=ssn.height();
						}

						if (nexttrans==12)
							if (opt.ie9) {
								ssn.transition({'left':oow+"px"},0);

							 } else {
								ssn.transition({'left':oow+"px",rotate:opt.rotate},0);

							}
						else
							if (nexttrans==15)
								if (opt.ie9)
									ssn.transition({'left':(0-oow)+"px"},0);
								else
									ssn.transition({'left':(0-oow)+"px",rotate:opt.rotate},0);
							else
								if (nexttrans==13)
									if (opt.ie9)
										ssn.transition({'top':(ooh)+"px"},0);
									else
										ssn.transition({'top':(ooh)+"px",rotate:opt.rotate},0);
								else
									if (nexttrans==14)
										if (opt.ie9)
											ssn.transition({'top':(0-ooh)+"px"},0);
										else
											ssn.transition({'top':(0-ooh)+"px",rotate:opt.rotate},0);


										ssn.transition({'left':'0px','top':'0px',opacity:1,rotate:0},masterspeed,function() {


														removeSlots(container,opt,0);
														if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
														nextsh.find('.defaultimg').css({'opacity':1});
														opt.act = opt.next;
														moveSelectedThumb(container);
												});



						var ssa=actsh.find('.slotslide');

								if (nexttrans==12)
									ssa.transition({'left':(0-oow)+'px',opacity:1,rotate:0},masterspeed);
								else
									if (nexttrans==15)
										ssa.transition({'left':(oow)+'px',opacity:1,rotate:0},masterspeed);
									else
										if (nexttrans==13)
											ssa.transition({'top':(0-ooh)+'px',opacity:1,rotate:0},masterspeed);
										else
											if (nexttrans==14)
												ssa.transition({'top':(ooh)+'px',opacity:1,rotate:0},masterspeed);



			}


			//////////////////////////////////////
			// THE SLOTSLIDE - TRANSITION XVI.  //
			//////////////////////////////////////
			if (nexttrans==16) {						// PAPERCUT

					actli.css({'position':'absolute','z-index':20});
					nextli.css({'position':'absolute','z-index':15});
					// PREPARE THE CUTS
					actli.wrapInner('<div class="tp-half-one"></div>');
					actli.find('.tp-half-one').clone(true).appendTo(actli).addClass("tp-half-two");
					actli.find('.tp-half-two').removeClass('tp-half-one');
					actli.find('.tp-half-two').wrapInner('<div class="tp-offset"></div>');

					var oow = opt.width;
					var ooh = opt.height;
					if (opt.fullWidth=="on" || opt.fullSreen=="on") {
						oow=opt.container.parent().width();
						ooh=opt.container.parent().height();
					}


					// ANIMATE THE CUTS
					var img=actli.find('.defaultimg');
					if (img.length>0 && img.data("fullwidthcentering")=="on") {
						var imgh=ooh/2;
						var to=img.position().top;
					} else {

						var imgh=ooh/2;
						var to=0;
					}
					actli.find('.tp-half-one').css({'width':oow+"px",'height':(to+imgh)+"px",'overflow':'hidden','position':'absolute','top':'0px','left':'0px'});
					actli.find('.tp-half-two').css({'width':oow+"px",'height':(to+imgh)+"px",'overflow':'hidden','position':'absolute','top':(to+imgh)+'px','left':'0px'});
					actli.find('.tp-half-two .tp-offset').css({'position':'absolute','top':(0-imgh-to)+'px','left':'0px'});




					// Delegate .transition() calls to .animate()
					// if the browser can't do CSS transitions.
					if (!jQuery.support.transition) {

						actli.find('.tp-half-one').animate({'opacity':0,'top':(0-ooh/2)+"px"},{duration: 500,queue:false});
						actli.find('.tp-half-two').animate({'opacity':0,'top':(ooh)+"px"},{duration: 500,queue:false});
					} else {
						var ro1=Math.round(Math.random()*40-20);
						var ro2=Math.round(Math.random()*40-20);
						var sc1=Math.random()*1+1;
						var sc2=Math.random()*1+1;
						actli.find('.tp-half-one').transition({opacity:1, scale:sc1, rotate:ro1,y:(0-ooh/1.4)+"px"},800,'in');
						actli.find('.tp-half-two').transition({opacity:1, scale:sc2, rotate:ro2,y:(0+ooh/1.4)+"px"},800,'in');

						if (actli.html()!=null) nextli.transition({scale:0.8,x:opt.width*0.1, y:ooh*0.1, rotate:ro1},0).transition({rotate:0, scale:1,x:0,y:0},600,'snap');
					}
					nextsh.find('.defaultimg').css({'opacity':1});
					setTimeout(function() {


								// CLEAN UP BEFORE WE START
								actli.css({'position':'absolute','z-index':18});
								nextli.css({'position':'absolute','z-index':20});
								nextsh.find('.defaultimg').css({'opacity':1});
								actsh.find('.defaultimg').css({'opacity':0});
								if (actli.find('.tp-half-one').length>0)  {
									actli.find('.tp-half-one >img, .tp-half-one >div').unwrap();

								}
								actli.find('.tp-half-two').remove();
								opt.transition = 0;
								opt.act = opt.next;

					},800);
					nextli.css({'opacity':1});

			}

			////////////////////////////////////////
			// THE SLOTSLIDE - TRANSITION XVII.  //
			///////////////////////////////////////
			if (nexttrans==17) {								// 3D CURTAIN HORIZONTAL

						masterspeed = masterspeed + 100;
						if (opt.slots>10) opt.slots=10;

						nextli.css({'opacity':1});

						// PREPARE THE SLOTS HERE
						prepareOneSlideV(actsh,opt,true);
						prepareOneSlideV(nextsh,opt,false);

						//SET DEFAULT IMG UNVISIBLE
						nextsh.find('.defaultimg').css({'opacity':0});
						//actsh.find('.defaultimg').css({'opacity':0});


						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT


						nextsh.find('.slotslide').each(function(j) {
							var ss=jQuery(this);
							ss.transition({ opacity:0, rotateY:350 ,rotateX:40, perspective:'1400px'},0);
							setTimeout(function() {
											ss.transition({opacity:1, top:0, left:0, scale:1, perspective:'150px', rotate:0,rotateY:0, rotateX:0},masterspeed*2,function() {

																	if (j==opt.slots-1) {
																		removeSlots(container,opt);
																		nextsh.find('.defaultimg').css({'opacity':1});

																		if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
																		opt.act=opt.next;
																		moveSelectedThumb(container);

																	}
															});
							},j*100);
						});
			}



			////////////////////////////////////////
			// THE SLOTSLIDE - TRANSITION XVIII.  //
			///////////////////////////////////////
			if (nexttrans==18) {								// 3D CURTAIN VERTICAL

						masterspeed = masterspeed + 100;
						if (opt.slots>10) opt.slots=10;

						nextli.css({'opacity':1});

						// PREPARE THE SLOTS HERE
						prepareOneSlide(actsh,opt,true);
						prepareOneSlide(nextsh,opt,false);

						//SET DEFAULT IMG UNVISIBLE
						nextsh.find('.defaultimg').css({'opacity':0});
						//actsh.find('.defaultimg').css({'opacity':0});


						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT


						nextsh.find('.slotslide').each(function(j) {
							var ss=jQuery(this);
							ss.transition({  rotateX:10 ,rotateY:310, perspective:'1400px', rotate:0,opacity:0},0);
							setTimeout(function() {
											ss.transition({top:0, left:0, scale:1, perspective:'150px', rotate:0,rotateY:0, rotateX:0,opacity:1},masterspeed*2,function() {

																	if (j==opt.slots-1) {
																		removeSlots(container,opt);
																		nextsh.find('.defaultimg').css({'opacity':1});

																		if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
																		opt.act=opt.next;
																		moveSelectedThumb(container);

																	}
															});
							},j*100);
						});
			}

			////////////////////////////////////////
			// THE SLOTSLIDE - TRANSITION XIX.  //
			///////////////////////////////////////
			if (nexttrans==19) {								// CUBIC VERTICAL
						masterspeed = masterspeed + 100;
						if (opt.slots>10) opt.slots=10;
						nextli.css({'opacity':1});

						// PREPARE THE SLOTS HERE
						prepareOneSlide(actsh,opt,true);
						prepareOneSlide(nextsh,opt,false);

						//SET DEFAULT IMG UNVISIBLE
						nextsh.find('.defaultimg').css({'opacity':0});
						//actsh.find('.defaultimg').css({'opacity':0});
						var chix=nextli.css('z-index');
						var chix2=actli.css('z-index');

						//actli.css({'z-index':22});



						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT


						nextsh.find('.slotslide').each(function(j) {
							var ss=jQuery(this);
							//ss.css({'overflow':'visible'});
							ss.parent().css({'overflow':'visible'});
							ss.css({'background':'#333'});
							if (direction==1)
								ss.transition({  opacity:0,left:0,top:opt.height/2,rotate3d:'1, 0, 0, -90deg '},0);
							else
								ss.transition({ opacity:0,left:0,top:0-opt.height/2,rotate3d:'1, 0, 0, 90deg '},0);

							setTimeout(function() {

											ss.transition({opacity:1,top:0,perspective:opt.height*2,rotate3d:' 1, 0, 0, 0deg '},masterspeed*2,function() {

																	if (j==opt.slots-1) {
																		removeSlots(container,opt);
																		nextsh.find('.defaultimg').css({'opacity':1});

																		if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
																		opt.act=opt.next;
																		moveSelectedThumb(container);

																	}
															});
							},j*150);

						});

						actsh.find('.slotslide').each(function(j) {
							var ss=jQuery(this);
							ss.parent().css({'overflow':'visible'});
							ss.css({'background':'#333'});
							ss.transition({ top:0,rotate3d: '1, 0, 0, 0deg'},0);
							actsh.find('.defaultimg').css({'opacity':0});
							setTimeout(function() {
											if (direction==1)
												ss.transition({opacity:0.6,left:0,perspective: opt.height*2,top:0-opt.height/2,rotate3d: '1, 0, 0, 90deg'},masterspeed*2,function() {});
											else
												ss.transition({opacity:0.6,left:0,perspective: opt.height*2,top:(0+opt.height/2),rotate3d: '1, 0, 0, -90deg'},masterspeed*2,function() {});
							},j*150);
						});
			}

			////////////////////////////////////////
			// THE SLOTSLIDE - TRANSITION XX.  //
			///////////////////////////////////////
			if (nexttrans==20) {								// FLYIN
						masterspeed = masterspeed + 100;
						if (opt.slots>10) opt.slots=10;



						nextli.css({'opacity':1});

						// PREPARE THE SLOTS HERE
						prepareOneSlideV(actsh,opt,true);
						prepareOneSlideV(nextsh,opt,false);

						//SET DEFAULT IMG UNVISIBLE
						nextsh.find('.defaultimg').css({'opacity':0});
						//actsh.find('.defaultimg').css({'opacity':0});


						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT


						nextsh.find('.slotslide').each(function(j) {
							var ss=jQuery(this);
							ss.parent().css({'overflow':'visible'});

							if (direction==1)
								ss.transition({ scale:0.8,top:0,left:0-opt.width,rotate3d: '2, 5, 0, 110deg'},0);
							else
								ss.transition({ scale:0.8,top:0,left:0+opt.width,rotate3d: '2, 5, 0, -110deg'},0);
							setTimeout(function() {
											ss.transition({ scale:0.8,left:0,perspective: opt.width,rotate3d: '1, 5, 0, 0deg'},masterspeed*2,'ease').transition({scale:1},200,'out',function() {

																	if (j==opt.slots-1) {
																		removeSlots(container,opt);
																		nextsh.find('.defaultimg').css({'opacity':1});

																		if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
																		opt.act=opt.next;
																		moveSelectedThumb(container);

																	}
															});
							},j*100);
						});

						actsh.find('.slotslide').each(function(j) {
							var ss=jQuery(this);
							ss.transition({ scale:0.5,left:0,rotate3d: '1, 5, 0, 5deg'},300,'in-out');
							actsh.find('.defaultimg').css({'opacity':0});
							setTimeout(function() {
											if (direction==1)
												ss.transition({top:0,left:opt.width/2,perspective: opt.width,rotate3d: '0, -3, 0, 70deg',opacity:0},masterspeed*2,'out',function() {});
											else
												ss.transition({top:0,left:0-opt.width/2,perspective: opt.width,rotate3d: '0, -3, 0, -70deg',opacity:0},masterspeed*2,'out',function() {});
							},j*100);
						});
			}


			////////////////////////////////////////
			// THE SLOTSLIDE - TRANSITION XX.  //
			///////////////////////////////////////
			if (nexttrans==21) {								// TURNOFF
						masterspeed = masterspeed + 100;
						if (opt.slots>10) opt.slots=10;

						nextli.css({'opacity':1});

						// PREPARE THE SLOTS HERE
						prepareOneSlideV(actsh,opt,true);
						prepareOneSlideV(nextsh,opt,false);

						//SET DEFAULT IMG UNVISIBLE
						nextsh.find('.defaultimg').css({'opacity':0});
						//actsh.find('.defaultimg').css({'opacity':0});


						// ALL NEW SLOTS SHOULD BE SLIDED FROM THE LEFT TO THE RIGHT


						nextsh.find('.slotslide').each(function(j) {
							var ss=jQuery(this);
							if (direction==1)
								ss.transition({ top:0,left:0-(opt.width),rotate3d: '0, 1, 0, 90deg'},0);
							else
								ss.transition({ top:0,left:0+(opt.width),rotate3d: '0, 1, 0, -90deg'},0);
							setTimeout(function() {
											ss.transition({left:0,perspective: opt.width*2,rotate3d: '0, 0, 0, 0deg'},masterspeed*2,function() {

																	if (j==opt.slots-1) {
																		removeSlots(container,opt);
																		nextsh.find('.defaultimg').css({'opacity':1});

																		if (nextli.index()!=actli.index()) actsh.find('.defaultimg').css({'opacity':0});
																		opt.act=opt.next;
																		moveSelectedThumb(container);

																	}
															});
							},j*100);
						});

						actsh.find('.slotslide').each(function(j) {
							var ss=jQuery(this);
							ss.transition({ left:0,rotate3d: '0, 0, 0, 0deg'},0);
							actsh.find('.defaultimg').css({'opacity':0});
							setTimeout(function() {
										if (direction==1)
											ss.transition({top:0,left:(opt.width/2),perspective: opt.width,rotate3d: '0, 1, 0, -90deg'},masterspeed*1.5,function() {});
										else
											ss.transition({top:0,left:(0-opt.width/2),perspective: opt.width,rotate3d: '0, 1, 0, +90deg'},masterspeed*1.5,function() {});

							},j*100);
						});
			}


			var data={};
			data.slideIndex=opt.next+1;
			container.trigger('revolution.slide.onchange',data);
			setTimeout(function() { container.trigger('revolution.slide.onafterswap'); },masterspeed);
			container.trigger('revolution.slide.onvideostop');


		}




				function onYouTubePlayerAPIReady() {

							}


				//////////////////////////////////////////
				// CHANG THE YOUTUBE PLAYER STATE HERE //
				////////////////////////////////////////
				 function onPlayerStateChange(event) {

					if (event.data == YT.PlayerState.PLAYING) {

						var bt = jQuery('body').find('.tp-bannertimer');
						var opt = bt.data('opt');
						bt.stop();

						opt.videoplaying=true;
						//console.log("VideoPlay set to True due onPlayerStateChange PLAYING");
						opt.videostartednow=1;

					} else {
						var bt = jQuery('body').find('.tp-bannertimer');
						var opt = bt.data('opt');

						if (event.data!=-1) {
							if (opt.conthover==0)
								bt.animate({'width':"100%"},{duration:((opt.delay-opt.cd)-100),queue:false, easing:"linear"});
							opt.videoplaying=false;
							opt.videostoppednow=1;
							//console.log("VideoPlay set to False due onPlayerStateChange PAUSE");
						}

					}
					if (event.data==0 && opt.nextslideatend==true)
						opt.container.revnext();


				  }

				  ///////////////////////////////
				  //	YOUTUBE VIDEO AUTOPLAY //
				  ///////////////////////////////
				   function onPlayerReady(event) {
						event.target.playVideo();
					}

				 ////////////////////////
				// VIMEO ADD EVENT /////
				////////////////////////
				function addEvent(element, eventName, callback) {

							if (element.addEventListener) {

								element.addEventListener(eventName, callback, false);
							}
							else {

								element.attachEvent(eventName, callback, false);
							}


						}

				//////////////////////////////////////////
				// CHANGE THE YOUTUBE PLAYER STATE HERE //
				////////////////////////////////////////
				  function vimeoready(player_id) {

						var froogaloop = $f(player_id);

						//jQuery('#debug').html(jQuery('#debug').html()+" <br>Frooga Func"+Math.round(Math.random()*100));

						froogaloop.addEvent('ready', function(data) {
								//jQuery('#debug').html(jQuery('#debug').html()+" <br>Ready"+Math.round(Math.random()*100));
								froogaloop.addEvent('play', function(data) {
									//jQuery('#debug').html(jQuery('#debug').html()+" <br>Play"+Math.round(Math.random()*100));

									var bt = jQuery('body').find('.tp-bannertimer');
									var opt = bt.data('opt');
									bt.stop();
									opt.videoplaying=true;
									//console.log("VideoPlay set to True due vimeoready PLAYING");
								});

								froogaloop.addEvent('finish', function(data) {
										var bt = jQuery('body').find('.tp-bannertimer');
										var opt = bt.data('opt');
										if (opt.conthover==0)
											bt.animate({'width':"100%"},{duration:((opt.delay-opt.cd)-100),queue:false, easing:"linear"});
										opt.videoplaying=false;
										//console.log("VideoPlay set to False due vimeoready FINNSIH");
										opt.videostartednow=1;
										if (opt.nextslideatend==true)
											opt.container.revnext();

								});

								froogaloop.addEvent('pause', function(data) {
										var bt = jQuery('body').find('.tp-bannertimer');
										var opt = bt.data('opt');
										if (opt.conthover==0)
											bt.animate({'width':"100%"},{duration:((opt.delay-opt.cd)-100),queue:false, easing:"linear"});
										opt.videoplaying=false;
										//console.log("VideoPlay set to False due vimeoready PAUSE");
										opt.videostoppednow=1;
								});
						});




					}

				/////////////////////////////////////
				// EVENT HANDLING FOR VIMEO VIDEOS //
				/////////////////////////////////////

					function vimeoready_auto(player_id) {

						var froogaloop = $f(player_id);


						froogaloop.addEvent('ready', function(data) {
							froogaloop.api('play');
						});

						froogaloop.addEvent('play', function(data) {
							var bt = jQuery('body').find('.tp-bannertimer');
							var opt = bt.data('opt');
							bt.stop();
							opt.videoplaying=true;
							//console.log("VideoPlay set to True due vimeoready_auto PLAYING");
						});

						froogaloop.addEvent('finish', function(data) {
								var bt = jQuery('body').find('.tp-bannertimer');
								var opt = bt.data('opt');
								if (opt.conthover==0)
									bt.animate({'width':"100%"},{duration:((opt.delay-opt.cd)-100),queue:false, easing:"linear"});
								opt.videoplaying=false;
							//console.log("VideoPlay set to False due vimeoready_auto FINISH");
								opt.videostartednow=1;
								if (opt.nextslideatend==true)
									opt.container.revnext();

						});

						froogaloop.addEvent('pause', function(data) {
								var bt = jQuery('body').find('.tp-bannertimer');
								var opt = bt.data('opt');
								if (opt.conthover==0)
									bt.animate({'width':"100%"},{duration:((opt.delay-opt.cd)-100),queue:false, easing:"linear"});
								opt.videoplaying=false;
							//console.log("VideoPlay set to False due vimeoready_auto PAUSE");
								opt.videostoppednow=1;
						});
					}


					///////////////////////////////////////
					// EVENT HANDLING FOR VIDEO JS VIDEOS //
					////////////////////////////////////////
					function html5vidready(myPlayer) {

						myPlayer.on("play",function() {
							var bt = jQuery('body').find('.tp-bannertimer');
							var opt = bt.data('opt');
							bt.stop();
							try{
								opt.videoplaying=true;
							} catch(e) {}
							//console.log("VideoPlay set to True due html5vidready PLAYING");
						});

						myPlayer.on("pause",function() {
							    var bt = jQuery('body').find('.tp-bannertimer');
								var opt = bt.data('opt');
								if (opt.conthover==0)
									bt.animate({'width':"100%"},{duration:((opt.delay-opt.cd)-100),queue:false, easing:"linear"});
								opt.videoplaying=false;
								//console.log("VideoPlay set to False due html5vidready pause");
								opt.videostoppednow=1;
						});

						myPlayer.on("ended",function() {
								var bt = jQuery('body').find('.tp-bannertimer');
								var opt = bt.data('opt');
								if (opt.conthover==0)
									bt.animate({'width':"100%"},{duration:((opt.delay-opt.cd)-100),queue:false, easing:"linear"});
								opt.videoplaying=false;
								//console.log("VideoPlay set to False due html5vidready pause");
								opt.videostoppednow=1;
								if (opt.nextslideatend==true)
									opt.container.revnext();
						});

					}




				////////////////////////
				// SHOW THE CAPTION  //
				///////////////////////
				function animateTheCaptions(nextli, opt,actli) {


						//if (jQuery("body").find('#debug').length==0)
						//		jQuery("body").append('<div id="debug" style="background:#000;z-index:1000;position:fixed;top:5px;left:5px;width:100px;height:500px;color:#fff;font-size:10px;font-family:Arial;"</div>');


						var offsetx=0;
						var offsety=0;

						nextli.find('.tp-caption').each(function(i) {

								offsetx = opt.width/2 - opt.startwidth/2;



								if (opt.bh>1) {
									opt.bw=1;
									opt.bh=1;
								}

								if (opt.bw>1) {
									opt.bw=1;
									opt.bh=1;
								}

								var xbw = opt.bw;
								var xbh = opt.bh;


								if (opt.fullScreen=="on")
								  offsety = opt.height/2 - (opt.startheight*opt.bh)/2;

								if (offsety<0) offsety=0;



								var nextcaption=nextli.find('.tp-caption:eq('+i+')');

								var handlecaption=0;

								// HIDE CAPTION IF RESOLUTION IS TOO LOW
								if (opt.width<opt.hideCaptionAtLimit && nextcaption.data('captionhidden')=="on") {
									nextcaption.addClass("tp-hidden-caption")
									handlecaption=1;
								} else {
									if (opt.width<opt.hideAllCaptionAtLilmit)	{
										nextcaption.addClass("tp-hidden-caption")
										handlecaption=1;
									} else {
										nextcaption.removeClass("tp-hidden-caption")
									}
								}




								nextcaption.stop(true,true);
								if (handlecaption==0) {
											if (nextcaption.data('linktoslide')!=undefined) {
												nextcaption.css({'cursor':'pointer'});
												if (nextcaption.data('linktoslide')!="no") {
													nextcaption.click(function() {
														var nextcaption=jQuery(this);
														var dir = nextcaption.data('linktoslide');
														if (dir!="next" && dir!="prev") {
															opt.container.data('showus',dir);
															opt.container.parent().find('.tp-rightarrow').click();
														} else
															if (dir=="next")
																opt.container.parent().find('.tp-rightarrow').click();
														else
															if (dir=="prev")
																opt.container.parent().find('.tp-leftarrow').click();
													});
												}
											}


											if (nextcaption.hasClass("coloredbg")) offsetx=0;
											if (offsetx<0) offsetx=0;

											//var offsety = 0; //opt.height/2 - (opt.startheight*xbh)/2;

											clearTimeout(nextcaption.data('timer'));
											clearTimeout(nextcaption.data('timer-end'));



											// YOUTUBE AND VIMEO LISTENRES INITIALISATION

											var frameID = "iframe"+Math.round(Math.random()*1000+1);

											if (nextcaption.find('iframe').length>0) {

											  nextcaption.find('iframe').each(function() {
												var ifr=jQuery(this);

												if (ifr.attr('src').toLowerCase().indexOf('youtube')>=0) {
														 opt.nextslideatend = nextcaption.data('nextslideatend');
														 if (!ifr.hasClass("HasListener")) {
															try {
																ifr.attr('id',frameID);

																var player;
																if (nextcaption.data('autoplay')==true)
																	player = new YT.Player(frameID, {
																		events: {
																			"onStateChange": onPlayerStateChange,
																			'onReady': onPlayerReady
																		}
																	});
																else
																	player = new YT.Player(frameID, {
																		events: {
																			"onStateChange": onPlayerStateChange
																		}
																	});
																ifr.addClass("HasListener");

																nextcaption.data('player',player);

																if (nextcaption.data('autoplay')==true) {
																		var bt=jQuery('body').find('#'+opt.container.attr('id')).find('.tp-bannertimer');
																		setTimeout(function(){
																					bt.stop();
																					opt.videoplaying=true;
																				},200);


																		//console.log("VideoPlay set to True due youtube 1st load AutoPlay");
																}
															} catch(e) {}
													 } else {
														if (nextcaption.data('autoplay')==true) {


																var player=nextcaption.data('player');
																player.playVideo();
																var bt=jQuery('body').find('#'+opt.container.attr('id')).find('.tp-bannertimer');
																setTimeout(function(){
																			bt.stop();
																			opt.videoplaying=true;
																		},200);


																//console.log("VideoPlay set to True due youtube 2nd load AutoPlay");
														}
													 }

												} else {
													if (ifr.attr('src').toLowerCase().indexOf('vimeo')>=0) {
														  opt.nextslideatend = nextcaption.data('nextslideatend');
														   if (!ifr.hasClass("HasListener")) {
																ifr.addClass("HasListener");
																ifr.attr('id',frameID);
																var isrc = ifr.attr('src');
																var queryParameters = {}, queryString = isrc,
																re = /([^&=]+)=([^&]*)/g, m;
																// Creates a map with the query string parameters
																while (m = re.exec(queryString)) {
																	queryParameters[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
																}


																if (queryParameters['player_id']!=undefined) {

																	isrc = isrc.replace(queryParameters['player_id'],frameID);
																} else {
																	isrc=isrc+"&player_id="+frameID;
																}

																try{
																		isrc = isrc.replace('api=0','api=1');
																	} catch(e) {}

																isrc=isrc+"&api=1";



																ifr.attr('src',isrc);
																var player = nextcaption.find('iframe')[0];
																if (nextcaption.data('autoplay')==true) {

																	$f(player).addEvent('ready', vimeoready_auto);
																	var bt=jQuery('body').find('#'+opt.container.attr('id')).find('.tp-bannertimer');
																		setTimeout(function(){
																			bt.stop();
																			opt.videoplaying=true;
																		},200);


																		//console.log("VideoPlay set to True due vimeo 1st load AutoPlay");
																} else {
																	$f(player).addEvent('ready', vimeoready);
																}


															   } else {
																	if (nextcaption.data('autoplay')==true) {

																		var ifr = nextcaption.find('iframe');
																		var id = ifr.attr('id');
																		var froogaloop = $f(id);
																		froogaloop.api("pause");
																		var bt=jQuery('body').find('#'+opt.container.attr('id')).find('.tp-bannertimer');
																		setTimeout(function(){
																			bt.stop();
																			opt.videoplaying=true;
																		},200);


																		//console.log("VideoPlay set to True due youtube 2nd load AutoPlay");
																	}
															   }

														}
													}
												});
											}

										// IF HTML5 VIDEO IS EMBEDED
										if (nextcaption.find('video').length>0) {
											nextcaption.find('video').each(function(i) {
												var html5vid = jQuery(this).parent();

												if (html5vid.hasClass("video-js")) {
													opt.nextslideatend = nextcaption.data('nextslideatend');
													if (!html5vid.hasClass("HasListener")) {
														html5vid.addClass("HasListener");
														var videoID = "videoid_"+Math.round(Math.random()*1000+1);
														html5vid.attr('id',videoID);
														videojs(videoID).ready(function(){
															html5vidready(this)
														});
													} else {
														videoID = html5vid.attr('id');
													}
													if (nextcaption.data('autoplay')==true) {

														var bt=jQuery('body').find('#'+opt.container.attr('id')).find('.tp-bannertimer');
														setTimeout(function(){
															bt.stop();
															opt.videoplaying=true;
														},200);

														//console.log("VideoPlay set to True due HTML5 VIDEO 1st/2nd load AutoPlay");

														videojs(videoID).ready(function(){
															var myPlayer = this;
															html5vid.data('timerplay',setTimeout(function() {
																myPlayer.play();
															},nextcaption.data('start')));
														});
													}


													if (html5vid.data('ww') == undefined) html5vid.data('ww',html5vid.width());
													if (html5vid.data('hh') == undefined) html5vid.data('hh',html5vid.height());

													videojs(videoID).ready(function(){
														if (!nextcaption.hasClass("fullscreenvideo")) {
															var myPlayer = videojs(videoID);

															try{
																myPlayer.width(html5vid.data('ww')*opt.bw);
																myPlayer.height(html5vid.data('hh')*opt.bh);
															} catch(e) {}
														}
													});


												 }

											});
										} // END OF VIDEO JS FUNCTIONS



										if (nextcaption.hasClass("randomrotate") && (opt.ie || opt.ie9)) nextcaption.removeClass("randomrotate").addClass("sfb");
											nextcaption.removeClass('noFilterClass');



										   var imw =0;
										   var imh = 0;

													if (nextcaption.find('img').length>0) {
														var im = nextcaption.find('img');
														if (im.data('ww') == undefined) im.data('ww',im.width());
														if (im.data('hh') == undefined) im.data('hh',im.height());

														var ww = im.data('ww');
														var hh = im.data('hh');


														im.width(ww*opt.bw);
														im.height(hh*opt.bh);
														imw = im.width();
														imh = im.height();
													} else {

														if (nextcaption.find('iframe').length>0) {

															var im = nextcaption.find('iframe');
															if (nextcaption.data('ww') == undefined) {
																nextcaption.data('ww',im.width());
															}
															if (nextcaption.data('hh') == undefined) nextcaption.data('hh',im.height());

															var ww = nextcaption.data('ww');
															var hh = nextcaption.data('hh');

															var nc =nextcaption;
																if (nc.data('fsize') == undefined) nc.data('fsize',parseInt(nc.css('font-size'),0) || 0);
																if (nc.data('pt') == undefined) nc.data('pt',parseInt(nc.css('paddingTop'),0) || 0);
																if (nc.data('pb') == undefined) nc.data('pb',parseInt(nc.css('paddingBottom'),0) || 0);
																if (nc.data('pl') == undefined) nc.data('pl',parseInt(nc.css('paddingLeft'),0) || 0);
																if (nc.data('pr') == undefined) nc.data('pr',parseInt(nc.css('paddingRight'),0) || 0);

																if (nc.data('mt') == undefined) nc.data('mt',parseInt(nc.css('marginTop'),0) || 0);
																if (nc.data('mb') == undefined) nc.data('mb',parseInt(nc.css('marginBottom'),0) || 0);
																if (nc.data('ml') == undefined) nc.data('ml',parseInt(nc.css('marginLeft'),0) || 0);
																if (nc.data('mr') == undefined) nc.data('mr',parseInt(nc.css('marginRight'),0) || 0);

																if (nc.data('bt') == undefined) nc.data('bt',parseInt(nc.css('borderTop'),0) || 0);
																if (nc.data('bb') == undefined) nc.data('bb',parseInt(nc.css('borderBottom'),0) || 0);
																if (nc.data('bl') == undefined) nc.data('bl',parseInt(nc.css('borderLeft'),0) || 0);
																if (nc.data('br') == undefined) nc.data('br',parseInt(nc.css('borderRight'),0) || 0);

																if (nc.data('lh') == undefined) nc.data('lh',parseInt(nc.css('lineHeight'),0) || 0);

																var fvwidth=opt.width;
																var fvheight=opt.height;
																if (fvwidth>opt.startwidth) fvwidth=opt.startwidth;
																if (fvheight>opt.startheight) fvheight=opt.startheight;

																if (!nextcaption.hasClass('fullscreenvideo'))
																			nextcaption.css({
																				 'font-size': (nc.data('fsize') * opt.bw)+"px",

																				 'padding-top': (nc.data('pt') * opt.bh) + "px",
																				 'padding-bottom': (nc.data('pb') * opt.bh) + "px",
																				 'padding-left': (nc.data('pl') * opt.bw) + "px",
																				 'padding-right': (nc.data('pr') * opt.bw) + "px",

																				 'margin-top': (nc.data('mt') * opt.bh) + "px",
																				 'margin-bottom': (nc.data('mb') * opt.bh) + "px",
																				 'margin-left': (nc.data('ml') * opt.bw) + "px",
																				 'margin-right': (nc.data('mr') * opt.bw) + "px",

																				 'border-top': (nc.data('bt') * opt.bh) + "px",
																				 'border-bottom': (nc.data('bb') * opt.bh) + "px",
																				 'border-left': (nc.data('bl') * opt.bw) + "px",
																				 'border-right': (nc.data('br') * opt.bw) + "px",

																				 'line-height': (nc.data('lh') * opt.bh) + "px",
																				 'height':(hh*opt.bh)+'px',
																				 'white-space':"nowrap"
																				});
																	else
																			nextcaption.css({
																				'width':opt.startwidth*opt.bw,
																				'height':opt.startheight*opt.bh
																			});


															im.width(ww*opt.bw);
															im.height(hh*opt.bh);
															imw = im.width();
															imh = im.height();
														} else {


																nextcaption.find('.tp-resizeme, .tp-resizeme *').each(function() {
																		calcCaptionResponsive(jQuery(this),opt);
																});

																calcCaptionResponsive(nextcaption,opt);

																imh=nextcaption.outerHeight(true);
																imw=nextcaption.outerWidth(true);

																// NEXTCAPTION FRONTCORNER CHANGES
																var ncch = nextcaption.outerHeight();
																var bgcol = nextcaption.css('backgroundColor');
																nextcaption.find('.frontcorner').css({
																				'borderWidth':ncch+"px",
																				'left':(0-ncch)+'px',
																				'borderRight':'0px solid transparent',
																				'borderTopColor':bgcol
																});

																nextcaption.find('.frontcornertop').css({
																				'borderWidth':ncch+"px",
																				'left':(0-ncch)+'px',
																				'borderRight':'0px solid transparent',
																				'borderBottomColor':bgcol
																});

																// NEXTCAPTION BACKCORNER CHANGES
																nextcaption.find('.backcorner').css({
																				'borderWidth':ncch+"px",
																				'right':(0-ncch)+'px',
																				'borderLeft':'0px solid transparent',
																				'borderBottomColor':bgcol
																});

																// NEXTCAPTION BACKCORNER CHANGES
																nextcaption.find('.backcornertop').css({
																				'borderWidth':ncch+"px",
																				'right':(0-ncch)+'px',
																				'borderLeft':'0px solid transparent',
																				'borderTopColor':bgcol
																});

															}
													}

											if (nextcaption.data('voffset')==undefined) nextcaption.data('voffset',0);
											if (nextcaption.data('hoffset')==undefined) nextcaption.data('hoffset',0);

											var vofs= nextcaption.data('voffset')*xbw;
											var hofs= nextcaption.data('hoffset')*xbw;

											var crw = opt.startwidth*xbw;
											var crh = opt.startheight*xbw;


											// CENTER THE CAPTION HORIZONTALLY
											if (nextcaption.data('x')=="center" || nextcaption.data('xcenter')=='center') {
												nextcaption.data('xcenter','center');
												nextcaption.data('x',(crw/2 - nextcaption.outerWidth(true)/2)/xbw+  hofs);

											}

											// ALIGN LEFT THE CAPTION HORIZONTALLY
											if (nextcaption.data('x')=="left" || nextcaption.data('xleft')=='left') {
												nextcaption.data('xleft','left');
												nextcaption.data('x',(0)/xbw+hofs);

											}

											// ALIGN RIGHT THE CAPTION HORIZONTALLY
											if (nextcaption.data('x')=="right" || nextcaption.data('xright')=='right') {
												nextcaption.data('xright','right');
												nextcaption.data('x',((crw - nextcaption.outerWidth(true))+hofs)/xbw);
												//console.log("crw:"+crw+"  width:"+nextcaption.outerWidth(true)+"  xbw:"+xbw);
												//console.log("x-pos:"+nextcaption.data('x'))
											}


											// CENTER THE CAPTION VERTICALLY
											if (nextcaption.data('y')=="center" || nextcaption.data('ycenter')=='center') {
												nextcaption.data('ycenter','center');
												nextcaption.data('y',(crh/2 - nextcaption.outerHeight(true)/2)/opt.bh + vofs);

											}

											// ALIGN TOP THE CAPTION VERTICALLY
											if (nextcaption.data('y')=="top" || nextcaption.data('ytop')=='top') {
												nextcaption.data('ytop','top');
												nextcaption.data('y',(0)/opt.bh+vofs);

											}

											// ALIGN BOTTOM THE CAPTION VERTICALLY
											if (nextcaption.data('y')=="bottom" || nextcaption.data('ybottom')=='bottom') {
												nextcaption.data('ybottom','bottom');
												nextcaption.data('y',((crh - nextcaption.outerHeight(true))+vofs)/xbw);
											}


											if (nextcaption.hasClass('fade')) {

												nextcaption.css({'opacity':0,'left':(xbw*nextcaption.data('x')+offsetx)+'px','top':(opt.bh*nextcaption.data('y')+offsety)+"px"});
											}

											if (nextcaption.hasClass("randomrotate")) {

														nextcaption.css({'left':(xbw*nextcaption.data('x')+offsetx)+'px','top':((xbh*nextcaption.data('y'))+offsety)+"px" });
														var sc=Math.random()*2+1;
														var ro=Math.round(Math.random()*200-100);
														var xx=Math.round(Math.random()*200-100);
														var yy=Math.round(Math.random()*200-100);
														nextcaption.data('repx',xx);
														nextcaption.data('repy',yy);
														nextcaption.data('repo',nextcaption.css('opacity'));
														nextcaption.data('rotate',ro);
														nextcaption.data('scale',sc);

														nextcaption.transition({opacity:0, scale:sc, rotate:ro, x:xx, y: yy,duration: '0ms'});
											} else {
												if (opt.ie || opt.ie9 )
													{}
												else {
												if (nextcaption.find('iframe').length==0)
													nextcaption.transition({ scale:1, rotate:0});
												}
											}

											if (nextcaption.hasClass('lfr')) {

												nextcaption.css({'opacity':1,'left':(15+opt.width)+'px','top':(opt.bh*nextcaption.data('y')+offsety)+"px"});

											}

											if (nextcaption.hasClass('lfl')) {

												nextcaption.css({'opacity':1,'left':(-15-imw)+'px','top':(opt.bh*nextcaption.data('y')+offsety)+"px"});

											}

											if (nextcaption.hasClass('sfl')) {

												nextcaption.css({'opacity':0,'left':((xbw*nextcaption.data('x'))-50+offsetx)+'px','top':(opt.bh*nextcaption.data('y')+offsety)+"px"});
											}

											if (nextcaption.hasClass('sfr')) {
												nextcaption.css({'opacity':0,'left':((xbw*nextcaption.data('x'))+50+offsetx)+'px','top':(opt.bh*nextcaption.data('y')+offsety)+"px"});
											}




											if (nextcaption.hasClass('lft')) {

												nextcaption.css({'opacity':1,'left':(xbw*nextcaption.data('x')+offsetx)+'px','top':(-25 - imh)+"px"});

											}

											if (nextcaption.hasClass('lfb')) {
												nextcaption.css({'opacity':1,'left':(xbw*nextcaption.data('x')+offsetx)+'px','top':(25+opt.height)+"px"});

											}

											if (nextcaption.hasClass('sft')) {
												nextcaption.css({'opacity':0,'left':(xbw*nextcaption.data('x')+offsetx)+'px','top':((opt.bh*nextcaption.data('y')+offsety)-50)+"px"});
											}

											if (nextcaption.hasClass('sfb')) {
												nextcaption.css({'opacity':0,'left':(xbw*nextcaption.data('x')+offsetx)+'px','top':((opt.bh*nextcaption.data('y')+offsety)+50)+"px"});
											}




											nextcaption.data('timer',setTimeout(function() {
													var easetype=nextcaption.data('easing');
													if (easetype==undefined) easetype="linear";

													nextcaption.css({'visibility':'visible'});
													if (nextcaption.hasClass('fade')) {
														nextcaption.data('repo',nextcaption.css('opacity'));

														//nextcaption.animate({'opacity':1},{duration:nextcaption.data('speed'),complete:function() { if (opt.ie) jQuery(this).addClass('noFilterClass');}});
														nextcaption.transition({'opacity':1,duration:nextcaption.data('speed')});
														//if (opt.ie) nextcaption.addClass('noFilterClass');
													}

													if (nextcaption.hasClass("randomrotate")) {

														easetype = easetype.replace('Elastic','Back');
														easetype = easetype.replace('Bounce','Back');
														nextcaption.transition({opacity:1, scale:1, 'left':(xbw*nextcaption.data('x')+offsetx)+'px','top':(xbh*(nextcaption.data('y'))+offsety)+"px", rotate:0, x:0, y:0,duration: nextcaption.data('speed'), easing:easetype});
														if (opt.ie) nextcaption.addClass('noFilterClass');
													}

													if (nextcaption.hasClass('lfr') ||
														nextcaption.hasClass('lfl') ||
														nextcaption.hasClass('sfr') ||
														nextcaption.hasClass('sfl') ||
														nextcaption.hasClass('lft') ||
														nextcaption.hasClass('lfb') ||
														nextcaption.hasClass('sft') ||
														nextcaption.hasClass('sfb')
														)
													{

														nextcaption.data('repx',nextcaption.position().left);
														nextcaption.data('repy',nextcaption.position().top);

														nextcaption.data('repo',nextcaption.css('opacity'));
														if (easetype.indexOf("Bounce")>=0 || easetype.indexOf("Elastic")>=0)
														  nextcaption.animate({'opacity':1,'left':(xbw*nextcaption.data('x')+offsetx)+'px','top':opt.bh*(nextcaption.data('y'))+offsety+"px"},{duration:nextcaption.data('speed'), easing:easetype,complete:function() { if (opt.ie) jQuery(this).addClass('noFilterClass');}});
														else
														  nextcaption.transition({'opacity':1,'left':(xbw*nextcaption.data('x')+offsetx)+'px','top':opt.bh*(nextcaption.data('y'))+offsety+"px",duration:nextcaption.data('speed'), easing:easetype});
														//if (opt.ie) nextcaption.addClass('noFilterClass');
													}
											},nextcaption.data('start')));


											// IF THERE IS ANY EXIT ANIM DEFINED
											if (nextcaption.data('end')!=undefined)

												nextcaption.data('timer-end',setTimeout(function() {

														if ((opt.ie || opt.ie9) && (nextcaption.hasClass("randomrotate") || nextcaption.hasClass("randomrotateout"))) {
															nextcaption.removeClass("randomrotate").removeClass("randomrotateout").addClass('fadeout');
														}

														endMoveCaption(nextcaption,opt);

												},nextcaption.data('end')));
									}
						})

						var bt=jQuery('body').find('#'+opt.container.attr('id')).find('.tp-bannertimer');
						bt.data('opt',opt);
				}



				/////////////////////////////////////////////////////////////////
				//	-	CALCULATE THE RESPONSIVE SIZES OF THE CAPTIONS	-	  //
				/////////////////////////////////////////////////////////////////
				function calcCaptionResponsive(nc,opt) {
								if (nc.data('fsize') == undefined) nc.data('fsize',parseInt(nc.css('font-size'),0) || 0);
								if (nc.data('pt') == undefined) nc.data('pt',parseInt(nc.css('paddingTop'),0) || 0);
								if (nc.data('pb') == undefined) nc.data('pb',parseInt(nc.css('paddingBottom'),0) || 0);
								if (nc.data('pl') == undefined) nc.data('pl',parseInt(nc.css('paddingLeft'),0) || 0);
								if (nc.data('pr') == undefined) nc.data('pr',parseInt(nc.css('paddingRight'),0) || 0);

								if (nc.data('mt') == undefined) nc.data('mt',parseInt(nc.css('marginTop'),0) || 0);
								if (nc.data('mb') == undefined) nc.data('mb',parseInt(nc.css('marginBottom'),0) || 0);
								if (nc.data('ml') == undefined) nc.data('ml',parseInt(nc.css('marginLeft'),0) || 0);
								if (nc.data('mr') == undefined) nc.data('mr',parseInt(nc.css('marginRight'),0) || 0);

								if (nc.data('bt') == undefined) nc.data('bt',parseInt(nc.css('borderTopWidth'),0) || 0);
								if (nc.data('bb') == undefined) nc.data('bb',parseInt(nc.css('borderBottomWidth'),0) || 0);
								if (nc.data('bl') == undefined) nc.data('bl',parseInt(nc.css('borderLeftWidth'),0) || 0);
								if (nc.data('br') == undefined) nc.data('br',parseInt(nc.css('borderRightWidth'),0) || 0);

								if (nc.data('lh') == undefined) nc.data('lh',parseInt(nc.css('lineHeight'),0) || 0);
								if (nc.data('minwidth') == undefined) nc.data('minwidth',parseInt(nc.css('minWidth'),0) || 0);
								if (nc.data('minheight') == undefined) nc.data('minheight',parseInt(nc.css('minHeight'),0) || 0);
								if (nc.data('maxwidth') == undefined) nc.data('maxwidth',parseInt(nc.css('maxWidth'),0) || "none");
								if (nc.data('maxheight') == undefined) nc.data('maxheight',parseInt(nc.css('maxHeight'),0) || "none");


								nc.css({
												 'font-size': Math.round((nc.data('fsize') * opt.bw))+"px",

												 'padding-top': Math.round((nc.data('pt') * opt.bh)) + "px",
												 'padding-bottom': Math.round((nc.data('pb') * opt.bh)) + "px",
												 'padding-left': Math.round((nc.data('pl') * opt.bw)) + "px",
												 'padding-right': Math.round((nc.data('pr') * opt.bw)) + "px",

												 'margin-top': (nc.data('mt') * opt.bh) + "px",
												 'margin-bottom': (nc.data('mb') * opt.bh) + "px",
												 'margin-left': (nc.data('ml') * opt.bw) + "px",
												 'margin-right': (nc.data('mr') * opt.bw) + "px",

												 'borderTopWidth': Math.round((nc.data('bt') * opt.bh)) + "px",
												 'borderBottomWidth': Math.round((nc.data('bb') * opt.bh)) + "px",
												 'borderLeftWidth': Math.round((nc.data('bl') * opt.bw)) + "px",
												 'borderRightWidth': Math.round((nc.data('br') * opt.bw)) + "px",

												 'line-height': Math.round((nc.data('lh') * opt.bh)) + "px",
												 'white-space':"nowrap",
												 'minWidth':(nc.data('minwidth') * opt.bw) + "px",
												 'minHeight':(nc.data('minheight') * opt.bh) + "px",
								});

								//console.log(nc.data('maxwidth')+"  "+nc.data('maxheight'));
								if (nc.data('maxheight')!='none')
									nc.css({'maxHeight':(nc.data('maxheight') * opt.bh) + "px"});


								if (nc.data('maxwidth')!='none')
									nc.css({'maxWidth':(nc.data('maxwidth') * opt.bw) + "px"});
						}


				//////////////////////////
				//	REMOVE THE CAPTIONS //
				/////////////////////////
				function removeTheCaptions(actli,opt) {

						actli.find('.tp-caption').each(function(i) {
							var nextcaption=actli.find('.tp-caption:eq('+i+')');
							nextcaption.stop(true,true);
							clearTimeout(nextcaption.data('timer'));
							clearTimeout(nextcaption.data('timer-end'));

							var easetype=nextcaption.data('easing');
							easetype="easeInOutSine";
							var ll = nextcaption.data('repx');
							var tt = nextcaption.data('repy');
							var oo = nextcaption.data('repo');
							var rot = nextcaption.data('rotate');
							var sca = nextcaption.data('scale');


							if (nextcaption.find('iframe').length>0) {
															// VIMEO VIDEO PAUSE
															try {
																var ifr = nextcaption.find('iframe');
																var id = ifr.attr('id');
																var froogaloop = $f(id);
																froogaloop.api("pause");
															} catch(e) {}
															//YOU TUBE PAUSE
															try {
																var player=nextcaption.data('player');
																player.stopVideo();
															} catch(e) {}
														}

							// IF HTML5 VIDEO IS EMBEDED
							if (nextcaption.find('video').length>0) {
											try{
												nextcaption.find('video').each(function(i) {
													var html5vid = jQuery(this).parent();
													var videoID =html5vid.attr('id');
													clearTimeout(html5vid.data('timerplay'));
													videojs(videoID).ready(function(){
														var myPlayer = this;
														myPlayer.pause();
													});
												})
											}catch(e) {}
										} // END OF VIDEO JS FUNCTIONS
							try {
									/*if (rot!=undefined || sca!=undefined)
										{
											if (rot==undefined) rot=0;
											if (sca==undefined) sca=1;
												nextcaption.transition({'rotate':rot, 'scale':sca, 'opacity':0,'left':ll+'px','top':tt+"px"},(nextcaption.data('speed')+10), function() { nextcaption.removeClass('noFilterClass');nextcaption.css({'visibility':'hidden'})});
										} else {

											nextcaption.animate({'opacity':0,'left':ll+'px','top':tt+"px"},{duration:(nextcaption.data('speed')+10), easing:easetype, complete:function() { nextcaption.removeClass('noFilterClass');nextcaption.css({'visibility':'hidden'})}});
										}*/
									endMoveCaption(nextcaption,opt);
								} catch(e) {}



						});
				}

				//////////////////////////
				//	MOVE OUT THE CAPTIONS //
				/////////////////////////
				function endMoveCaption(nextcaption,opt) {


														if (nextcaption.hasClass("randomrotate") && (opt.ie || opt.ie9)) nextcaption.removeClass("randomrotate").addClass("sfb");
														if (nextcaption.hasClass("randomrotateout") && (opt.ie || opt.ie9)) nextcaption.removeClass("randomrotateout").addClass("stb");

														var endspeed=nextcaption.data('endspeed');
														if (endspeed==undefined) endspeed=nextcaption.data('speed');

														var xx=nextcaption.data('repx');
														var yy=nextcaption.data('repy');
														var oo=nextcaption.data('repo');

														if (opt.ie) {
															nextcaption.css({'opacity':'inherit','filter':'inherit'});
														}

														if (nextcaption.hasClass('ltr') ||
															nextcaption.hasClass('ltl') ||
															nextcaption.hasClass('str') ||
															nextcaption.hasClass('stl') ||
															nextcaption.hasClass('ltt') ||
															nextcaption.hasClass('ltb') ||
															nextcaption.hasClass('stt') ||
															nextcaption.hasClass('stb')
															)
														{

															xx=nextcaption.position().left;
															yy=nextcaption.position().top;

															if (nextcaption.hasClass('ltr'))
																xx=opt.width+60;
															else if (nextcaption.hasClass('ltl'))
																xx=0-nextcaption.width()-60;
															else if (nextcaption.hasClass('ltt'))
																yy=0-nextcaption.height()-60;
															else if (nextcaption.hasClass('ltb'))
																yy=opt.height+60;
															else if (nextcaption.hasClass('str')) {
																xx=xx+50;oo=0;
															} else if (nextcaption.hasClass('stl')) {
																xx=xx-50;oo=0;
															} else if (nextcaption.hasClass('stt')) {
																yy=yy-50;oo=0;
															} else if (nextcaption.hasClass('stb')) {
																yy=yy+50;oo=0;
															}

															var easetype=nextcaption.data('endeasing');
															if (easetype==undefined) easetype="linear";
															if (easetype.indexOf("Bounce")>=0 || easetype.indexOf("Elastic")>=0)
															  nextcaption.animate({'opacity':oo,'left':xx+'px','top':yy+"px"},{duration:nextcaption.data('endspeed'), easing:easetype,complete:function() { jQuery(this).css({visibility:'hidden'})}});
															else
  															  nextcaption.transition({'opacity':oo,'left':xx+'px','top':yy+"px",duration:nextcaption.data('endspeed'), easing:easetype});
															if (opt.ie) nextcaption.removeClass('noFilterClass');

														}

														else

														if ( nextcaption.hasClass("randomrotateout")) {

															nextcaption.transition({opacity:0, scale:Math.random()*2+0.3, 'left':Math.random()*opt.width+'px','top':Math.random()*opt.height+"px", rotate:Math.random()*40, duration: endspeed, easing:easetype, complete:function() { jQuery(this).css({visibility:'hidden'})}});
															if (opt.ie) nextcaption.removeClass('noFilterClass');

														}

														else

														if (nextcaption.hasClass('fadeout')) {
															if (opt.ie) nextcaption.removeClass('noFilterClass');
															nextcaption.transition({'opacity':0,duration:200});
															//nextcaption.animate({'opacity':0},{duration:200,complete:function() { jQuery(this).css({visibility:'hidden'})}});

														}

														else

														if (nextcaption.hasClass('lfr') ||
															nextcaption.hasClass('lfl') ||
															nextcaption.hasClass('sfr') ||
															nextcaption.hasClass('sfl') ||
															nextcaption.hasClass('lft') ||
															nextcaption.hasClass('lfb') ||
															nextcaption.hasClass('sft') ||
															nextcaption.hasClass('sfb')
															)
														{

															if (nextcaption.hasClass('lfr'))
																xx=opt.width+60;
															else  if (nextcaption.hasClass('lfl'))
																xx=0-nextcaption.width()-60;
															else if (nextcaption.hasClass('lft'))
																yy=0-nextcaption.height()-60;
															else if (nextcaption.hasClass('lfb'))
																yy=opt.height+60;


															var easetype=nextcaption.data('endeasing');
															if (easetype==undefined) easetype="linear";
															if (easetype.indexOf("Bounce")>=0 || easetype.indexOf("Elastic")>=0)
																	nextcaption.animate({'opacity':oo,'left':xx+'px','top':yy+"px"},{duration:nextcaption.data('endspeed'), easing:easetype, complete:function() { jQuery(this).css({visibility:'hidden'})}});
															else
																	nextcaption.transition({'opacity':oo,'left':xx+'px','top':yy+"px",duration:nextcaption.data('endspeed'), easing:easetype});
															if (opt.ie) nextcaption.removeClass('noFilterClass');

														}

														else

														if (nextcaption.hasClass('fade')) {

															//nextcaption.animate({'opacity':0},{duration:endspeed,complete:function() { jQuery(this).css({visibility:'hidden'})} });
															nextcaption.transition({'opacity':0,duration:endspeed });
															if (opt.ie) nextcaption.removeClass('noFilterClass');

														}

														else

														if (nextcaption.hasClass("randomrotate")) {

															nextcaption.transition({opacity:0, scale:Math.random()*2+0.3, 'left':Math.random()*opt.width+'px','top':Math.random()*opt.height+"px", rotate:Math.random()*40, duration: endspeed, easing:easetype });
															if (opt.ie) nextcaption.removeClass('noFilterClass');

														}
				}

		///////////////////////////
		//	REMOVE THE LISTENERS //
		///////////////////////////
		function removeAllListeners(container,opt) {
			container.children().each(function() {
			  try{ jQuery(this).die('click'); } catch(e) {}
			  try{ jQuery(this).die('mouseenter');} catch(e) {}
			  try{ jQuery(this).die('mouseleave');} catch(e) {}
			  try{ jQuery(this).unbind('hover');} catch(e) {}
			})
			try{ container.die('click','mouseenter','mouseleave');} catch(e) {}
			clearInterval(opt.cdint);
			container=null;



		}

		///////////////////////////
		//	-	COUNTDOWN	-	//
		/////////////////////////
		function countDown(container,opt) {
			opt.cd=0;
			opt.loop=0;
			if (opt.stopAfterLoops!=undefined && opt.stopAfterLoops>-1)
					opt.looptogo=opt.stopAfterLoops;
			else
				opt.looptogo=9999999;

			if (opt.stopAtSlide!=undefined && opt.stopAtSlide>-1)
					opt.lastslidetoshow=opt.stopAtSlide;
			else
					opt.lastslidetoshow=999;

			opt.stopLoop="off";

			if (opt.looptogo==0) opt.stopLoop="on";



			if (opt.slideamount >1 && !(opt.stopAfterLoops==0 && opt.stopAtSlide==1) ) {
					var bt=container.find('.tp-bannertimer');
					if (bt.length>0) {
						bt.css({'width':'0%'});
						bt.animate({'width':"100%"},{duration:(opt.delay-100),queue:false, easing:"linear"});

					}

					bt.data('opt',opt);


					opt.cdint=setInterval(function() {

						if (jQuery('body').find(container).length==0) removeAllListeners(container,opt);
						if (container.data('conthover-changed') == 1) {
							opt.conthover=	container.data('conthover');
							container.data('conthover-changed',0);
						}

						if (opt.conthover!=1 && opt.videoplaying!=true && opt.width>opt.hideSliderAtLimit) opt.cd=opt.cd+100;


						if (opt.fullWidth!="on")
							if (opt.width>opt.hideSliderAtLimit)
								container.parent().removeClass("tp-hide-revslider")
							else
								container.parent().addClass("tp-hide-revslider")
						// EVENT TRIGGERING IN CASE VIDEO HAS BEEN STARTED
						if (opt.videostartednow==1) {
							container.trigger('revolution.slide.onvideoplay');
							opt.videostartednow=0;
						}

						// EVENT TRIGGERING IN CASE VIDEO HAS BEEN STOPPED
						if (opt.videostoppednow==1) {
							container.trigger('revolution.slide.onvideostop');
							opt.videostoppednow=0;
						}


						if (opt.cd>=opt.delay) {
							opt.cd=0;
							// SWAP TO NEXT BANNER
							opt.act=opt.next;
							opt.next=opt.next+1;
							if (opt.next>container.find('>ul >li').length-1) {
									opt.next=0;
									opt.looptogo=opt.looptogo-1;

									if (opt.looptogo<=0) {
											opt.stopLoop="on";

									}
								}

							// STOP TIMER IF NO LOOP NO MORE NEEDED.

							if (opt.stopLoop=="on" && opt.next==opt.lastslidetoshow-1) {
									clearInterval(opt.cdint);
									container.find('.tp-bannertimer').css({'visibility':'hidden'});
									container.trigger('revolution.slide.onstop');
							}

							// SWAP THE SLIDES
							swapSlide(container,opt);


							// Clear the Timer
							if (bt.length>0) {
								bt.css({'width':'0%'});
								bt.animate({'width':"100%"},{duration:(opt.delay-100),queue:false, easing:"linear"});
							}
						}
					},100);


					container.hover(
						function() {

							if (opt.onHoverStop=="on") {
									opt.conthover=1;
								bt.stop();
								container.trigger('revolution.slide.onpause');
							}
						},
						function() {
							if (container.data('conthover')!=1) {
								container.trigger('revolution.slide.onresume');
								opt.conthover=0;
								if (opt.onHoverStop=="on" && opt.videoplaying!=true) {
									bt.animate({'width':"100%"},{duration:((opt.delay-opt.cd)-100),queue:false, easing:"linear"});
								}
							}
						});
			}
		}



})(jQuery);






/*global Ext:false */
Ext.application({
	  requires : ['Ext.Container', 'Ext.MessageBox', 'Ext.Panel', 'Ext.tab.Panel', 'Ext.Video', 'Ext.Toolbar', 'Ext.event.publisher.Dom', 'apps.HTMLPanel', 'apps.posterlist', 'apps.videolist'],
	
    launch: function () {
        Ext.create('Ext.TabPanel', {
        	xtype : 'tabpanel',
        	activeTab: 0,
            fullscreen: true,
            tabBarPosition: 'bottom',
            styleHtmlContent: true,
            plugins: 'swipetabs',

            items: [{
						xtype : 'panel',
						layout : 'card',
						title : 'Video',
						cls : 'channel_bg',
						items : [{
							xtype : 'videoList',
							tag : "tag_unilife",
							title : 'University Life Video',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}, {
						xtype : 'panel',
						layout : 'card',
						title : 'Poster',
						cls : 'channel_bg',
						items : [{
							xtype : 'posterList',
							tag : "tag_unilife",
							title : 'University Life Poster',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}] // items
        }); // create()
    } // launch
}); // application()

/*global Ext:false */
Ext.application({
	  requires : ['Ext.Container', 'Ext.MessageBox', 'Ext.Panel', 'Ext.tab.Panel', 'Ext.Video', 'Ext.Toolbar', 'Ext.event.publisher.Dom', 'apps.HTMLPanel', 'apps.posterlist', 'apps.videolist'],
	
    launch: function () {
        Ext.create('Ext.TabPanel', {
        	activeTab: 0,
            fullscreen: true,
            tabBarPosition: 'bottom',
            styleHtmlContent: true,
            plugins: 'swipetabs',

            items: [{
						xtype : 'panel',
						layout : 'card',
						title : 'Video',
						cls : 'channel_bg',
						items : [{
							xtype : 'videoList',
							tag : "tag_events",
							title : 'University Life Video',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}, {
						xtype : 'panel',
						layout : 'card',
						title : 'Poster',
						cls : 'channel_bg',
						items : [{
							xtype : 'posterList',
							tag : "tag_events",
							title : 'University Life Poster',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}] // items
        }); // create()
    } // launch
}); // application()

Ext.define('UVision.store.MoreCards', {
    extend: 'Ext.data.Store',

    config: {
        fields: ['title', 'xtype'],
        data: [
            { title: 'About',      xtype: 'aboutcard' },
            { title: 'Bookmarks',  xtype: 'bookmarkscard' }
        ]
    }
});


var videoData;
var tag;
var posterData;
var searchData;
var currVideoCard;
var currPosterCard;
var currSearchCard;

function goHome(){
    top.changeMainFrame('home.html');
}

function clickVideo(n) {
	event.preventDefault();
	n = n - 1;
	var videoPath;
	var videoDesc;
	var videoImg;

	var mycard = currVideoCard.getParent();

	mycard.setActiveItem(1);
	var videocard = mycard.getActiveItem();

	var pal = new Ext.Panel({
		tpl : videoItemTpl,
		data : { message: videoData[n], tag: tag},
		layout : 'fit',
		scroll : 'vertical',
	});
	videocard.on('deactivate', function() {
		//alert("foo");
	});
	videocard.removeAll();
	videocard.add(pal);
	document.getElementById("latestvideo").innerHTML=videoIcon;
	loadLatestVideo();
}

function clicksearch(n) {
	event.preventDefault();
	n = n - 1;
	var videoPath;
	var videoDesc;
	var videoImg;

	var mycard = currSearchCard.getParent();
	
	mycard.setActiveItem(2);
	var searchcard = mycard.getActiveItem();

	var pal = new Ext.Panel({
		tpl : searchItemTpl,
		data : { message: searchData[n], tag: tag},
		layout : 'fit',
		scroll : 'vertical',
	});
	searchcard.on('deactivate', function() {
		//alert("foo");
	});
	searchcard.removeAll();
	searchcard.add(pal);

	document.getElementById("latestvideo").innerHTML=videoIcon;
	loadLatestVideo();
}

function clickVideoBack1(n){

	window.plugins.videoPlayer.play(n);
}


function clickPoster(n) {
	event.preventDefault();
	n = n - 1;
	var videoPath;
	var videoDesc;
	var videoImg;

	var mycard = currPosterCard.getParent();

	mycard.setActiveItem(1);
	var videocard = mycard.getActiveItem();

	var e = Ext.create('Ext.Panel', {
		tpl : posterItemTpl,
		data : { message: posterData[n], tag: tag},
		layout : 'fit',
		scroll : 'vertical'
	});
	videocard.removeAll();
	videocard.add(e);

}
function senddata() {

	if (document.getElementById('firstName').value == "" || document.getElementById('lastName').value == "" || document.getElementById('email').value == "" || document.getElementById('message').value == "") {
		document.getElementById("firstName").style.borderColor = "#FF0000";
		document.getElementById("lastName").style.borderColor = "#FF0000";
		document.getElementById("message").style.borderColor = "#FF0000";
		document.getElementById("email").style.borderColor = "#FF0000";
		document.getElementById('noemptyinfo').style.display = "block";

	} else {
		document.getElementById('thankyou').style.display = "block";
		Ext.Ajax.request({
			url : 'http://147.8.135.16/mobilesupport/contactform.php',
			params : {
				firstName : document.getElementById('firstName').value,
				lastName : document.getElementById('lastName').value,
				organization : document.getElementById('organization').value,
				phoneNumber : document.getElementById('phoneNumber').value,
				email : document.getElementById('email').value,
				subject : document.getElementById('subject').value,
				message : document.getElementById('message').value

			},
			success : function(response) {
				//alert("Thank you");
				document.getElementById("firstName").style.borderColor = "#dadada"
				document.getElementById("lastName").style.borderColor = "#dadada"
				document.getElementById("message").style.borderColor = "#dadada"
				document.getElementById("email").style.borderColor = "#dadada"

				document.getElementById('noemptyinfo').style.display = "none";
				document.getElementById('firstName').value = "";
				document.getElementById('lastName').value = "";
				document.getElementById('organization').value = "";
				document.getElementById('phoneNumber').value = "";
				document.getElementById('email').value = "";
				document.getElementById('subject').value = "";
				document.getElementById('message').value = "";

			}
		});
	}
}

function closethx(){
    	event.preventDefault();
    document.getElementById("thankyou").style.display = "none";
}

function clickVideoBack() {
	event.preventDefault();
	var vplay = document.getElementsByClassName("video_play");
	if (vplay != undefined && vplay.length > 0) {
		for (var i = 0; i < vplay.length; i++) {
			vplay[i].innerHTML = "";
		}
	}
	if (currVideoCard != null) {
		currVideoCard.getParent().setActiveItem(0);
	}
}

function clickPosterBack() {
	event.preventDefault();
	if (currPosterCard != null) {
		currPosterCard.getParent().setActiveItem(0);
	}
}

function clickSearchBack() {
	event.preventDefault();
	var vplay = document.getElementsByClassName("video_play");
	if (vplay != undefined && vplay.length > 0) {
		for (var i = 0; i < vplay.length; i++) {
			vplay[i].innerHTML = "";
		}
	}
	if (currSearchCard != null) {
		currSearchCard.getParent().setActiveItem(0); 
	}

}

function loadLatestVideo() {
	$("#latestvideo").smoothDivScroll({
		mousewheelScrolling: "allDirections",
		manualContinuousScrolling: true,
		touchScrolling : true
	})
}

function alertNoTitle(str){
	    var iframe = document.createElement("IFRAME");
         iframe.setAttribute("src", 'data:text/plain,');
         document.documentElement.appendChild(iframe);
         window.frames[0].window.alert(str);
         iframe.parentNode.removeChild(iframe);
}

function like(mid){
	count = $("#likecount_"+mid).html();
	$.get("http://147.8.135.16/mobilesupport/like.php?mid="+mid+"&like="+count, function(data) {
		$("#likecount_"+mid).html(data);
	});
}

function addfav(mid){
	$.get("http://147.8.135.16/mobilesupport/addfav.php?mid="+mid, function(data) {
		alertNoTitle(data);
	});
}

function formsubmit2db(mid){
	if ( $('#name').val() == "" ) {
		$('#name').css("border", "#FF0000 solid 1px"); 
	} else if ( $('#comment').val() == "" ) {
		$('#name').css("border", "#dadada solid 1px");
		$('#comment').css("border", "#FF0000 solid 1px"); 
	} else {
		$('#name').css("border", "#dadada solid 1px");
		$('#comment').css("border", "#dadada solid 1px"); 

	form_comment.submit();
	//form_comment.reset();
	$('#load_1').show();
	$('#load_2').show(); 
	$('#loading').show();
	$('#required').hide();
	$('#postcomment').hide();
	
     setTimeout("top.changeMainFrame('detail.html?mid="+mid+"')", 2500);	
	}	
}


/*global Ext:false */
Ext.application({
    launch: function () {
        Ext.create('Ext.Carousel', {
            fullscreen: true,
            direction: 'horizontal',

            defaults: {
                styleHtmlContent: true
            },

            items: [{
                html: 'Page 1 - Heading 1',
                style: 'background-color: #cceedd'
            }, {
                html: 'Page 2 - Heading 2',
                style: 'background-color: #eeff22'
            }]
        });
    }
});


/*global Ext:false */
Ext.application({
	  requires : ['Ext.Container', 'Ext.MessageBox', 'Ext.Panel', 'Ext.tab.Panel', 'Ext.Video', 'Ext.Toolbar', 'Ext.event.publisher.Dom', 'apps.HTMLPanel', 'apps.posterlist', 'apps.videolist'],
	
    launch: function () {
        Ext.create('Ext.TabPanel', {
        	activeTab: 0,
            fullscreen: true,
            tabBarPosition: 'bottom',
            styleHtmlContent: true,
            plugins: 'swipetabs',

            items: [{
						xtype : 'panel',
						layout : 'card',
						title : 'Video',
						cls : 'channel_bg',
						items : [{
							xtype : 'videoList',
							tag : "tag_misc",
							title : 'University Life Video',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}, {
						xtype : 'panel',
						layout : 'card',
						title : 'Poster',
						cls : 'channel_bg',
						items : [{
							xtype : 'posterList',
							tag : "tag_misc",
							title : 'University Life Poster',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}] // items
        }); // create()
    } // launch
}); // application()

/*
var posterListTpl = new Ext.XTemplate(
	'<div class="posterlist">',
	'<tpl for=".">', 
	'<div class="poster_item {[xindex % 2 == 0 ? "even" : "odd"]}" onclick="clickPoster(\'{[xindex]}\')">', 
	//'<div class="poster_desc">{poster_desc}</div>',
	 '<img src="http://147.8.135.16/mobilesupport/getthumb.php?path={poster_path}" class="poster_thumb">', 
	 '</div>',
	 '</tpl>',
	 '</div>'
);
*/
var posterListTpl = new Ext.XTemplate(
	'<div class="top_line" style="margin: 0 auto; text-align: right;"><form id="search_form" name="search_form" action="search.html" method="get"><button id="searchbtn_blue" type="submit">&nbsp;Search&nbsp;&nbsp;</button><input type="text" id="searchbar_blue" name="search" placeholder=""></form></div>',
	'<div class="video_topic" style="padding-left: 10px;" onclick="top.toogleMenu()">Channels</div>',
	'<div class="video_subtopic" style="padding-left: 10px;"><a href="{tagindex}" style="text-decoration: none; color: #FFF;">{intname}</a> <i class="fa fa-angle-right"></i> POSTER</div>',
	'<div class="video_margin" style="margin-left: -5px;">',
	'<tpl for="message">', 
	'<div class="video_item {[xindex % 2 == 0 ? "even" : "odd"]}" ><!--onclick="clickVideo(\'{[xindex]}\')"-->', 
	'<a href="detail.html?mid={mid}" style="text-decoration: none;">', 
	'<img src="http://147.8.135.16/mobilesupport/getthumb.php?path={poster_path}" alt="{poster_title}" class="poster_size">',
	'<span class="video_desc">{poster_title}</span>',
	'<span class="video_author"><tpl if="this.exists(poster_author)">by: {poster_author}</tpl></span>',
	'<span class="view_count"><i class="fa fa-eye color_blue"></i> {viewcount} View<tpl if="likecount &gt; 1">s</tpl></span>',
	'<span class="like_count"><i class="fa fa-thumbs-up color_blue"></i> {likecount} Like<tpl if="likecount &gt; 1">s</tpl></span>',
	'<span class="comment_count"><i class="fa fa-comment color_blue"></i> {comments.length} comment<tpl if="likecount &gt; 1">s</tpl></span>',
	 '</div>',
	 '</tpl>',
 	'<tpl if="message.length == 0"><div style="width: 100%; margin: 0 auto; color: #FFF;">No content found.</div>',
 	'</tpl>',	
 	'<div class="back_icon"><a href="home.html" style="text-decoration: none; color: #FFF;"><i class="fa fa-arrow-circle-left"></i> Back</a></div>', 
	 '</div>',
	 '</div>'
);



var posterItemTpl = new Ext.XTemplate(
	'<div class="top_line" style="margin: 0 auto; text-align: right;"><form id="search_form" name="search_form" action="search.html" method="get"><button id="searchbtn_blue" type="submit">&nbsp;Search&nbsp;&nbsp;</button><input type="text" id="searchbar_blue" name="search" placeholder=""></form></div>',
	'<div class="video_topic" style="padding-left: 10px;" onclick="top.toogleMenu()">Channels</div>',
	'<div class="video_subtopic" style="padding-left: 10px;"><a href="{tagindex}" style="text-decoration: none; color: #FFF;">{tag}</a> <i class="fa fa-angle-right"></i> POSTER</div>',
	'<div class="poster_play">',
	'<img src="http://147.8.135.16/{message.poster_path}" alt="{message.poster_title}" class="poster_playback">',
	'<div class="video_play_desc"><span style="font-size:20px;">{message.poster_title}</span></div>',
	'<div class="mmodifytime font12_000" >{message.poster_desc}</div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-clock-o color_blue"></i> {[this.modifytime_format(values.message.mmodifytime)]} </div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-eye color_blue"></i> {message.viewcount} View<tpl if="message.viewcount &gt; 1">s</tpl></div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-heart color_blue"></i> <span id="likecount_{message.mid}">{message.likecount}</span> Like<tpl if="message.likecount &gt; 1">s</tpl></div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-comment color_blue"></i> {message.comments.length} comment<tpl if="message.comments.length &gt; 1">s</tpl></div>',
	'<div class="clear">&nbsp;</div>',
	
	'<div class="share_bar">',
	'<div class="share_inner" style="line-height: 30px;">',
	'<span class="share_icon"><i class="fa fa-share"></i></span>',
	'<a onclick="like(\'{message.mid}\');" class="share_btn like"> <i class="fa fa-heart"></i> Like</a>',
	'<a onclick="addfav(\'{message.mid}\');" class="share_btn fav"> <i class="fa fa-heart"></i> Favorite</a><BR>',
	'<a onclick=\'top.goOpenSafari("https://www.facebook.com/sharer/sharer.php?u={[this.current_url(values.message.mtype)]}{message.mid}")\' class="share_btn fb"><i class="fa fa-facebook"></i> Share</a>',
	'<a onclick=\'top.goOpenSafari("https://twitter.com/share?url={[this.current_url(values.message.mtype)]}{message.mid}&text={[this.text_encode(values.message.poster_title)]}")\' class="share_btn tw"><i class="fa fa-twitter "></i> Tweet</a>',
	'<a onclick=\'top.goOpenSafari("https://plus.google.com/share?text={[this.current_url(values.message.mtype)]}&url={[this.current_url(values.message.mtype)]}{message.mid}")\' class="share_btn gp"><i class="fa fa-google-plus"></i> Share</a>',
	'<a onclick=\'top.goOpenSafari("http://service.weibo.com/share/share.php?appkey=&url={[this.current_url(values.message.mtype)]}{message.mid}")\' class="share_btn sn"><i class="fa fa-weibo"></i> Repost</a>',
	'</div>',
	'</div>',
	
	'<div class="clear">&nbsp;</div>',
	'<tpl for="message.comments">',
	'<div class="bg_grey" style="width: 100%; padding-bottom: 10px;"><div class="mmodifytime color_blue fl">&nbsp;<i class="fa fa-user"></i> {name} </div><div class="mmodifytime font12_000 fr" style="padding-right: 10px;"><i class="fa fa-clock-o"></i> {[this.modifytime_format(values.time)]}&nbsp;</div>',
	'<div class="clear"><div class="mmodifytime font12_000 fl">&nbsp;{comment}</div></div><div class="clear"></div></div>',
    '</tpl>',
    
	'<form id="form_comment" name="form_comment" method="get" action="http://147.8.135.16/web/mobilecomment.php" target="commentiframe">',
	'<div class="mmodifytime color_blue fl">&nbsp;<i class="fa fa-comment"></i> Leave a Comment </div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black">Name</div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black"><input id="name" name="name" class="commentname" value="" style="padding-left: 5px; width: 250px;"/></div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black">Your Message</div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black"><textarea  id="comment" name="comment" class="commentmsg" style="padding: 5px; width: 250px;"></textarea></div><div class="clear"></div>',
	'<div class="mmodifytime fl postcomment"><p class="post_a_comment" onclick="form_comment.submit(); form_comment.reset(); $(\'#thank\').show();">Post a New Comment</p></div>',
    '<input type="hidden" name="mid" id="mid" value="{message.mid}">',
    '<div class="clear">&nbsp;</div>',
    '</form>',

    '<div class="bg_grey" id="thank" style="width: 100%; margin-top: -30px; display: none;"><div class="mmodifytime color_blue">&nbsp;<i class="fa fa-lightbulb-o"></i> Thank You <br><span style="padding-left: 20px;">Your comment will be displayed within five minutes.</span></div></div>',
	'<div class="clear"></div>',
    
    '<div onclick="clickPosterBack()" class="back_icon"><i class="fa fa-arrow-circle-left"></i> Back</div>',
	'<div onclick="clickVideo(\'{[xindex]}\')" class="smoth_item {[xindex % 2 == 0 ? "even" : "odd"]}" >',
	'<tpl for=".">',
	 '</tpl>',
	'</div></div></div>  <iframe name="commentiframe" id="commentiframe" width="0" height="0" border="0" style="display: none;"></iframe>',
    {
        modifytime_format: function(values) {
            temp = values.substr(0, 10)+" "+values.substr(11, 10);
            return temp;
        },
        current_url : function(values) {
        	if (values == 12) {
        		return encodeURIComponent('http://147.8.135.16/web/playvideo.php?mid=');
        	} else if (values == 15) {
        		return encodeURIComponent('http://147.8.135.16/web/playposter.php?mid=');
        	}
        },
        text_encode : function(values) {
        		return encodeURIComponent(values);
        }
    }
 );

Ext.define('apps.posterlist', {
	extend : 'Ext.Panel',
	xtype : 'posterList',
	styleHtmlContent : true,
	requires : ['Ext.data.JsonP'],
	config : {
		listeners : {
			activate : 'onActivate',
			painted : 'onPaint'
		},
		tag : null
	},
	onPaint: function (me, container){
		currPosterCard = me;
		clickVideoBack();
		clickPosterBack();
	},
	onActivate : function(me, container) {
		Ext.data.JsonP.request({
		 url : 'http://147.8.135.16/mobilesupport/getjson.php',
		 callbackKey : 'callback',
		 params : {
			 tag : this.getTag(),
			 valid : '1',
			 typeID : '15'
		 },

		 callback : function(success, result) {
		 	
		if (result['intname'] == "tag_unilife" ) {
	 		result['intname'] = "UNIVERSITY LIFE";
	 	} else if (result['intname'] == "tag_people" ) {
	 		result['intname'] = "PEOPLE";
	 	} else if (result['intname'] == "tag_campus" ) {
	 		result['intname'] = "CAMPUS";
	 	} else if (result['intname'] == "tag_events" ) {
	 		result['intname'] = "EVENTS & CEREMONIES";
	 	} else if (result['intname'] == "tag_lecture" ) {
	 		result['intname'] = "LECTURE & CONFERENCES";
	 	} else if (result['intname'] == "tag_research" ) {
	 		result['intname'] = "ACADEMIC LIFE";
	 	} else if (result['intname'] == "tag_misc" ) {
	 		result['intname'] = "MISCELLANEOUS";
	 	} else if (result['intname'] == "tag_publications" ) {
	 		result['intname'] = "PUBLICATIONS";
	 	}			 	
		 tag = result['intname'];		 	
		 	
		 posterData = result.message;
		 var message = result;
		 if (message) {
		 	//videoListTpl.overwrite(me.body, message);
		 	me.updateHtml(posterListTpl.applyTemplate(message));
		 } else {
		   //alert('There was an error retrieving data. Please check your internet Connection.');
		 }

		 }
		 });
	}
});



/*global Ext:false */
Ext.application({
	  requires : ['Ext.Container', 'Ext.MessageBox', 'Ext.Panel', 'Ext.tab.Panel', 'Ext.Video', 'Ext.Toolbar', 'Ext.event.publisher.Dom', 'apps.HTMLPanel', 'apps.posterlist', 'apps.videolist'],
	
    launch: function () {
        Ext.create('Ext.TabPanel', {
        	activeTab: 0,
            fullscreen: true,
            tabBarPosition: 'bottom',
            styleHtmlContent: true,
            plugins: 'swipetabs',

            items: [{
						xtype : 'panel',
						layout : 'card',
						title : 'Video',
						cls : 'channel_bg',
						items : [{
							xtype : 'videoList',
							tag : "tag_research",
							title : 'University Life Video',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}, {
						xtype : 'panel',
						layout : 'card',
						title : 'Poster',
						cls : 'channel_bg',
						items : [{
							xtype : 'posterList',
							tag : "tag_research",
							title : 'University Life Poster',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}] // items
        }); // create()
    } // launch
}); // application()

/*global Ext:false */
Ext.application({
	  requires : ['Ext.Container', 'Ext.MessageBox', 'Ext.Panel', 'Ext.tab.Panel', 'Ext.Video', 'Ext.Toolbar', 'Ext.event.publisher.Dom', 'apps.HTMLPanel', 'apps.posterlist', 'apps.videolist'],
	
    launch: function () {
        Ext.create('Ext.TabPanel', {
        	activeTab: 0,
            fullscreen: true,
            tabBarPosition: 'bottom',
            styleHtmlContent: true,
            plugins: 'swipetabs',

            items: [{
						xtype : 'panel',
						layout : 'card',
						title : 'Video',
						cls : 'channel_bg',
						items : [{
							xtype : 'videoList',
							tag : "tag_campus",
							title : 'University Life Video',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}, {
						xtype : 'panel',
						layout : 'card',
						title : 'Poster',
						cls : 'channel_bg',
						items : [{
							xtype : 'posterList',
							tag : "tag_campus",
							title : 'University Life Poster',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}] // items
        }); // create()
    } // launch
}); // application()


/* Old Version
 * 
 * 
 *global Ext:false 
Ext.application({

    launch: function () {
    	
Ext.extend(Ext.Panel, {
    fullscreen: true,
    id: 'Viewport',
    layout: 'card',
    cardSwitchAnimation: 'slide',
    initComponent: function() {
        this.dockedItems = [header, {
            xtype: 'tabbar',
            id: 'bottom-tab-bar',
            ui: 'dark',
            dock: 'bottom',
            layout: {
                pack: 'center'
            },
            scroll: {
                direction: 'horizontal',
                useIndicators: false
            },
            items: [{
                cls: 'x-tab-active',
                iconCls: 'home',
                text: 'Home',
                handler: this.tabHandler // defined at the bottom
            },
            {
                text: 'Locations',
                iconCls: 'list',
                handler: this.tabHandler
            },
            {
                text: 'About',
                iconCls: 'info',
                handler: this.tabHandler
            }]
        }];
        this.items = [{
            xtype: 'carousel',
            id: 'tabs-carousel',
            listeners: {
                cardswitch: function() { // here we'll change the class of related tab icon to active state after swipe left/right of the carousel cards.
                    var n = this.getActiveIndex();
                    for (i = 0; i < Ext.getCmp('bottom-tab-bar').items.items.length; i++) {
                        Ext.getCmp('bottom-tab-bar').items.items[i].removeCls('x-tab-active');
                    }
                    Ext.getCmp('bottom-tab-bar').items.items[n].addCls('x-tab-active');
                }
            },
            indicator: false, // remove it, so that it looks like a real tabPanel instead of carousel.
            items: [{
                xtype: 'HomeIndex',
                title: 'Home',
                iconCls: 'home'
            },
            {
                xtype: 'HomeLocations',
                title: 'Locations',
                iconCls: 'list'
            },
            {
                xtype: 'HomeAbout',
                title: 'About',
                iconCls: 'info'
            }]
        }];
        App.views.Viewport.superclass.initComponent.apply(this, arguments);
    },
    tabHandler: function(tab) { // here we'll set the active tab of the carousel when a tab icon is clicked
        var selected = -1;
        var n = Ext.getCmp('bottom-tab-bar').items.items.indexOf(tab);
        for (i = 0; i < Ext.getCmp('bottom-tab-bar').items.items.length; i++) {
            if (Ext.getCmp('bottom-tab-bar').items.items[i].getEl().hasCls('x-tab-active')) {
                selected = i;
                Ext.getCmp('bottom-tab-bar').items.items[i].removeCls('x-tab-active');
            }
        }
        Ext.getCmp('bottom-tab-bar').items.items[n].addCls('x-tab-active');
        var direction = 'left';
        if (n > selected) direction = 'left';
        else direction = 'right';
        Ext.getCmp('tabs-carousel').setActiveItem(n, {
            type: 'slide',
            direction: direction
        });
    }
});

}});
*/


/*global Ext:false */
Ext.application({
	  requires : ['Ext.Container', 'Ext.MessageBox', 'Ext.Panel', 'Ext.tab.Panel', 'Ext.Video', 'Ext.Toolbar', 'Ext.event.publisher.Dom', 'apps.HTMLPanel', 'apps.home'],
	
    launch: function () {
        Ext.create('Ext.TabPanel', {
        	activeTab: 0,
            fullscreen: true,
            tabBarPosition: 'none',
            styleHtmlContent: true,

            items: [{
						xtype : 'panel',
						layout : 'card',
						title : 'Home',
						items : [{
							xtype : 'home',
							tag : "tag_unilife",
							title : 'University Life Video',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}] // items
        }); // create()
    } // launch
}); // application()


Ext.define('apps.home', {
	extend : 'Ext.Panel',
	xtype : 'home',
	styleHtmlContent : true,
	requires : ['Ext.data.JsonP'],
	config : {
		listeners : {
			activate : 'onActivate',
			painted : 'onPainted',
			deactivate : 'onDeactivate'
		},
		tag : null
	},
	onDeactivate:function (me, container){
	},
	onPainted: function (me, container){
		 currVideoCard = me;
       
	},
	onActivate : function(me, container) {
		
		/*
		Ext.data.JsonP.request({
			
		 url : 'http://147.8.135.17:8080/xaness/getJson?intname=Content_Video&sort=mmodifytime&sortDesc=1&top=20&ignore=video_hide_web',
		 //url : 'http://147.8.135.16/mobilesupport/highlight.json',
		 method: 'POST',
		 callbackKey : 'callback',

		 callback : function(success, result) {
		 //videoData = result.message;
		 var message = result;
		 if (message) {
		 	
	     	me.updateHtml(mindex.applyTemplate(message));	
		 	
		 } else {
		 alert('There was an error retrieving data. Please check your internet Connection.');
		 }

		 }
		 
		 });
		 */
		 
	var index_1 = "";
	var index_2 = "";
	var index_3 = "";
	var index_4 = mindex_4.applyTemplate();
	var process = 0;
		 
	function process_finish () {
		if ( process == 3 ) {
			var index = index_1 + index_2 + index_3 + index_4;
			me.updateHtml(index);
		}
	}		 
		 
	// Highlight	 
	Ext.Ajax.request({
	    url: 'http://147.8.135.16/mobilesupport/getHighlightJson.php',
	
		dataType: 'JSONP',
	    jsonpCallback: 'callback',
		type: 'GET',
	    success: function(response) {
		 //responseText
		 var obj = JSON.parse(response.responseText);
		 
		 if (obj) {
	     	//me.updateHtml(mindex_1.applyTemplate(obj));
	     	index_1 = mindex_1.applyTemplate(obj);	
	     	process++;	process_finish();
		 }
	    },
	
	    failure: function(response) {
                     
                       me.updateHtml('<div class="top_line" style="margin: 0 auto; text-align: right;"></div><div style="position: fixed; width:100%;margin-left:auto; margin-right:auto; top: 20%; color:#FFF;font-size:18px;"><center><i class="fa fa-exclamation-triangle" style="font-size:200px;"></i><BR>U-Vision Mobile App has detected there is NO network connection. <BR> Please check your device\'s network status.</center></div>');
                     
                     
                     setTimeout(function(){
                     var iframe = document.createElement("IFRAME");
                     iframe.setAttribute("src", 'data:text/plain,');
                     document.documentElement.appendChild(iframe);
                     window.frames[0].window.alert('U-Vision Mobile App has detected there is NO network connection. \n Please check your device\'s network status.');
                     iframe.parentNode.removeChild(iframe);
                                },500);
                     
	    }
	});
	
	
	
	// New Videos
	Ext.Ajax.request({
	    url: 'http://147.8.135.16/mobilesupport/getLatestMessage.php?sid=12',
	
		dataType: 'JSONP',
	    jsonpCallback: 'callback',
		type: 'GET',
	    success: function(response) {
		 //responseText
		 var obj = JSON.parse(response.responseText);
		 //console.log(obj);
		 if (obj) {
	     	//me.updateHtml(mindex_2.applyTemplate(obj));
	     	index_2 = mindex_2.applyTemplate(obj);		
	     	process++;	process_finish();
		 }
	    },
	
	    failure: function(response) {
	        //alert('There was an error retrieving data. Please check your internet Connection.');
	    }
	});	
	
	
	// New Posters
	Ext.Ajax.request({
	    url: 'http://147.8.135.16/mobilesupport/getLatestMessage.php?sid=15',
	
		dataType: 'JSONP',
	    jsonpCallback: 'callback',
		type: 'GET',
	    success: function(response) {
		 //responseText
		 var obj = JSON.parse(response.responseText);
		 //console.log(obj);
		 if (obj) {
	     	//me.updateHtml(mindex_3.applyTemplate(obj));
	     	index_3 = mindex_3.applyTemplate(obj);	
	     	process++;	process_finish(); 	
		 }
	    },
	
	    failure: function(response) {
	        //alert('There was an error retrieving data. Please check your internet Connection.');
	    }
	});	
		

		 
	}
});




var mindex_1 = new Ext.XTemplate(
	'<div style="padding-top:20px; padding-left:5px;" >',
		'<div class=\'outerframe\'>',
			'<div class=\'innerframe  no_margin_and_padding\'>',
				'<div id="index_left_box_f">HIGHLIGHTS <i class="fa fa-angle-right" style="font-size: 30px;"></i></div>',
			'</div>',
		'</div>',
	'</div>',

	
	'<div id="blue" style="width: 100%; margin: 0 auto; text-align: left;  background-color: #8ec449;">',
	
	'<div class="bannercontainer" style="width: 100%; margin: 0 auto; background-color: #8ec449;" >',
			'<div class="banner" style="width: auto;" >',
				'<ul>',
				'<tpl for="message">',
					'<li style="list-style-type: none;" data-transition="slidehorizontal" data-slotamount="10" data-link="{[this.video_poster_tv(values.highlight_mobile_id,values.highlight_mobile_link)]}" onmouseover="display_it(this,\'caption\')" onmouseout="hide_it(this,\'caption\')">',	
						'<img class="imgsize" src="http://147.8.135.16/mobilesupport/{highlight_image}" alt="{highlight_title}"></img>',
						'<div class="caption medium_text fade fadeout notshow"',
							 'data-x="left"',
							 'data-y="bottom"',
							 'speed="300"',
							 'data-start="0"',
							 'data-easing="easeInOutElastic"',
							 'data-endeasing="easeOutElastic"',
							 'style="width:100%;"',
							 '><p class="caption_style" style="margin-bottom: 0px;">{highlight_title}</p></div>',
					'</li>',					
				'</tpl>',
				'</ul>',
			'</div>',
		'</div>',
	'</div>',
	
	
	'<div id="yellow" style="padding-top:-40px;">',
	{
        video_poster_tv: function(values, link) {
        	
        	if ( values === undefined || values == "" ) {
        		temp = link; 
        		//"http://147.8.135.16/mobilesupport/dailytv";
        	} else {
        		temp = "detail.html?mid=" + values;
        	}
        	//alert(temp);
            return temp;
        }
    }	
);

var mindex_2 = new Ext.XTemplate(
	'<div class=\'new_video\' style="height: 250px;">',
	'<div id="video_index_arrow_left" onclick="carousel1.goTo(carousel1.getCurrentId() - 2)"><img src="images/index_arrow_left.png"></div>',
	'<div id="video_index_arrow_right" onclick="carousel1.goTo(carousel1.getCurrentId() + 2)"><img src="images/index_arrow_right.png"></div>',
	
		'<div class=\'outerframe\'>',
		'<div class=\'innerframe  no_margin_and_padding\'>',
			'<div id="index_left_box_e" style="padding-top: 0;">NEW VIDEOS <i class="fa fa-angle-right" style="font-size: 30px;"></i></div>',
			'<div class="left">',
			
		'</div>',
		'<div class="right">',
			'<div style="" id="carousel-image-and-text1" class="touchcarousel  grey-blue" >', 
				'<ul class="touchcarousel-container videocarousel">',	
				'<tpl for="message">',
					'<li class=\'touchcarousel-item\' style=\'width: 300px; list-style-type: none;\'>',
					'<a href="detail.html?mid={mid}" style="text-decoration: none;">',
					'<img src="http://147.8.135.16/mobilesupport/getthumb_320_180.php?path={micon}"   title="{mname}"  alt="{mname}" width="280px">',
					'<div class=\'whatisuvbox_text dot1\' style=\'margin-top: -5px; width: 280px; height: 68px;\'>{[this.mname_format(values.mname)]}</div>',
					'<div class=\'clear\'></div>',
					'<div class=\'whatisuvbox_by\'>{testmassage}</div>',
					'</a></li>',
				'</tpl>',
				'</ul>',	
			'</div>',	
		'</div>',	
	'</div>',	
	'</div>',	
	'</div>',
	{
        mname_format: function(values) {
        	if ( values.length > 85 ) {
        		temp = values.substr(0, 85) + '...';
        	} else {
        		temp = values;
        	}
            return temp;
        }
    }					
 );
 
var mindex_3 = new Ext.XTemplate(
	'<div class=\'new_poster\' >',
	'<div id="poster_index_arrow_left" onclick="carousel2.goTo(carousel2.getCurrentId() - 2)"><img src="images/index_arrow_left.png"></div>',
	'<div id="poster_index_arrow_right" onclick="carousel2.goTo(carousel2.getCurrentId() + 2)"><img src="images/index_arrow_right.png"></div>',
	
		'<div class=\'outerframe\'>',
		'<div class=\'innerframe  no_margin_and_padding\'>',
			'<div id="index_left_box_e" style="padding-top: 0;">NEW POSTERS <i class="fa fa-angle-right" style="font-size: 30px;"></i></div>',
			'<div class="left">',
				'<div class="index_left_arrow_w"></div>',
		'</div>',
		'<div class="right">',
			'<div style="" id="carousel-image-and-text2" class="touchcarousel  grey-blue" >', 
				'<ul class="touchcarousel-container postercarousel">',	
				'<tpl for="message">',
					'<li class=\'touchcarousel-item\' style=\'width: 300px; list-style-type: none;\'>',
					'<a href="detail.html?mid={mid}" style="text-decoration: none;">',
					'<img src="http://147.8.135.16/mobilesupport/getthumb_320_180.php?path={micon}"   title="{mname}"  alt="{mname}" width="280px">',
					'<div class=\'whatisuvbox_text dot1\' style=\'margin-top: -5px; width: 280px; height: 68px;\'>{[this.mname_format(values.mname)]}</div>',
					'<div class=\'clear\'></div>',
					'<div class=\'whatisuvbox_by\'>{testmassage}</div>',
					'</a></li>',
				'</tpl>',
				'</ul>',	
			'</div>',	
		'</div>',	
	'</div>',	
	'</div>',	
	'</div>',
	{
        mname_format: function(values) {
        	if ( values.length > 85 ) {
        		temp = values.substr(0, 85) + '...';
        	} else {
        		temp = values;
        	}
            return temp;
        }
    }						
 );
	
var mindex_4 = new Ext.XTemplate(	
	'</div>',
	
	'<div style="background-color: #8ec449; width:100%; max-width:1040px; height: 120px; margin-left: auto; margin-right: auto; overflow: hidden;" class="footerdiv">',
	  '<div class=\'copyright\' style="width: 85%; text-align: left; padding-top: 10px;">',
	  	'© 2013 All Rights Reserved. The Multimedia Team, Communications and Public Affairs Office, The University of Hong Kong',
	  '</div>',
	  '<div id="foot_background" style="background-color: #8ec449; overflow: hidden;"></div>',
	'</div>'  	
				
 );
 

/*global Ext:false */
Ext.application({
	  requires : ['Ext.Container', 'Ext.MessageBox', 'Ext.Panel', 'Ext.tab.Panel', 'Ext.Video', 'Ext.Toolbar', 'Ext.event.publisher.Dom', 'apps.HTMLPanel', 'apps.detail'],
	
    launch: function () {
        Ext.create('Ext.TabPanel', {
        	activeTab: 0,
            fullscreen: true,
            tabBarPosition: 'none',
            styleHtmlContent: true,

            items: [{
					xtype : 'panel',
					layout : 'card',
					title : 'Detail',
					cls : 'channel_bg',
					items : [{
						xtype : 'detail',
						tag : "tag_unilife",
						title : 'University Life Video',
						scrollable : 'vertical'
					}, {
						xtype : 'panel',
						scrollable : 'vertical'
					}]
				}] // items
        }); // create()
    } // launch
}); // application()


Ext.define('apps.detail', {
	extend : 'Ext.Panel',
	xtype : 'detail',
	styleHtmlContent : true,
	requires : ['Ext.data.JsonP'],
	config : {
		listeners : {
			activate : 'onActivate',
			painted : 'onPainted',
			deactivate : 'onDeactivate'
		},
		tag : null
	},
	onDeactivate:function (me, container){
	},
	onPainted: function (me, container){
		 currVideoCard = me;
		 clickVideoBack();
		 clickPosterBack();
		 
		 me.updateHtml('<div class="top_line" style="margin: 0 auto; text-align: right;"><form id="search_form" name="search_form" action="search.html" method="get"><button id="searchbtn_blue" type="submit">&nbsp;Search&nbsp;&nbsp;</button><input type="text" id="searchbar_blue" name="search" placeholder=""></form></div><div style="position: fixed; left: 50%; top: 50%; "><i class="fa fa-spinner fa-spin" style="color: #FFF; font-size: 30px;"></i></div>');	
	},
	onActivate : function(me, container) {
		
		var getParams = document.URL.split("?");
		// transforming the GET parameters into a dictionnary
		var params = Ext.urlDecode(getParams[getParams.length - 1]);
		//alert(params['mid']);
		
		Ext.Ajax.request({
		    url: 'http://147.8.135.16/mobilesupport/getMessageJson.php?',
		
			dataType: 'JSONP',
		    jsonpCallback: 'callback',
			type: 'GET',
			params : {
			 	id : params['mid']
		 	},
		    success: function(response) {
			var result = JSON.parse(response.responseText);
			var message = result;
			if (message) {
				videoIcon = "";
			 	for (i=0; i< message.length; i++){
			 		videoIcon += "<img src=\"http://147.8.135.16/"+message[i].micon+"\" class=\"smoth_thumb\"/>";
			 	}
			 	
			 	if (message['tag'] == "tag_unilife" ) {
			 		message['tag'] = "UNIVERSITY LIFE";
			 		message['tagindex'] = "coral1.html";
			 	} else if (message['tag'] == "tag_people" ) {
			 		message['tag'] = "PEOPLE";
			 		message['tagindex'] = "coral2.html";
			 	} else if (message['tag'] == "tag_campus" ) {
			 		message['tag'] = "CAMPUS";
			 		message['tagindex'] = "coral3.html";
			 	} else if (message['tag'] == "tag_events" ) {
			 		message['tag'] = "EVENTS & CEREMONIES";
			 		message['tagindex'] = "coral4.html";
			 	} else if (message['tag'] == "tag_lecture" ) {
			 		message['tag'] = "LECTURE & CONFERENCES";
			 		message['tagindex'] = "coral5.html";
			 	} else if (message['tag'] == "tag_research" ) {
			 		message['tag'] = "RESEARCH";
			 		message['tagindex'] = "coral6.html";
			 	} else if (message['tag'] == "tag_misc" ) {
			 		message['tag'] = "MISCELLANEOUS";
			 		message['tagindex'] = "coral7.html";
			 	}
			 	
			 	message['tagindex'] = message['tagindex'];
			 		
			 	if(message['message']['mtype'] == '12'){
			 		// Video
			 		me.updateHtml(videoItemTpl.applyTemplate(message));	
			 	} else {
			 		// Poster
			 		me.updateHtml(posterItemTpl.applyTemplate(message));
			 	}				
			}
			},
		
		    failure: function(response) {
		        alertNoTitle('There was an error retrieving data. Please check your internet Connection.');
		    }
		});		    	
		
		/*
		Ext.data.JsonP.request({
		 url : 'http://147.8.135.17:8080/xaness/getMessageJson?',
		 callbackKey : 'callback',
		 params : {
			id : params['mid']
		 },
		 callback : function(success, result) {
		 videoData = result.message;
		 var message = result;
		 if (message) {
		 	//videoListTpl.overwrite(me.body, message);
		 	videoIcon = "";
		 	for (i=0; i< message.length; i++){
		 		videoIcon += "<img src=\"http://147.8.135.16/"+message[i].micon+"\" class=\"smoth_thumb\"/>";
		 	}
		 	
		 	if (message['tag'] == "tag_unilife" ) {
		 		message['tag'] = "UNIVERSITY LIFE";
		 		message['tagindex'] = "coral1.html";
		 	} else if (message['tag'] == "tag_people" ) {
		 		message['tag'] = "PEOPLE";
		 		message['tagindex'] = "coral2.html";
		 	} else if (message['tag'] == "tag_campus" ) {
		 		message['tag'] = "CAMPUS";
		 		message['tagindex'] = "coral3.html";
		 	} else if (message['tag'] == "tag_events" ) {
		 		message['tag'] = "EVENTS & CEREMONIES";
		 		message['tagindex'] = "coral4.html";
		 	} else if (message['tag'] == "tag_lecture" ) {
		 		message['tag'] = "LECTURE & CONFERENCES";
		 		message['tagindex'] = "coral5.html";
		 	} else if (message['tag'] == "tag_research" ) {
		 		message['tag'] = "RESEARCH";
		 		message['tagindex'] = "coral6.html";
		 	} else if (message['tag'] == "tag_misc" ) {
		 		message['tag'] = "MISCELLANEOUS";
		 		message['tagindex'] = "coral7.html";
		 	}
		 	
		 	message['tagindex'] = "http://147.8.135.16/www2/"+message['tagindex'];
		 		
		 	if(message['message']['mtype'] == '12'){
		 		// Video
		 		me.updateHtml(videoItemTpl.applyTemplate(message));	
		 	} else {
		 		// Poster
		 		me.updateHtml(posterItemTpl.applyTemplate(message));
		 	}
		 	
		 } else {
		 alert('There was an error retrieving data. Please check your internet Connection.');
		 }
		 }
		 });
		 */
		
		
	}
});


var videoItemTpl = new Ext.XTemplate(
	'<div class="top_line" style="margin: 0 auto; text-align: right;"><form id="search_form" name="search_form" action="search.html" method="get"><button id="searchbtn_blue" type="submit">&nbsp;Search&nbsp;&nbsp;</button><input type="text" id="searchbar_blue" name="search" placeholder=""></form></div>',
	'<div class="video_topic" style="padding-left: 10px;" onclick="top.toogleMenu()">Channels</div>',
	'<div class="video_subtopic" style="padding-left: 10px;"><a href="{tagindex}" style="text-decoration: none; color: #FFF;">{tag}</a> <i class="fa fa-angle-right"></i> VIDEO</div>',
	'<div class="play_container"><div class="video_play" id="video_play">',
	'<video controls="controls" poster="http://147.8.135.16/{message.video_thumbnail}" class="video_playback">', 
	'<source src="http://147.8.135.16/{message.video_sdpath}"/></video>',
	'<div class="video_play_desc"><span style="font-size:20px;">{message.video_title}</span></div>',
	'<div class="mmodifytime font12_000" >{message.video_desc}</div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-clock-o color_blue"></i> {[this.modifytime_format(values.message.mmodifytime)]} </div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-eye color_blue"></i> {message.viewcount} View<tpl if="message.viewcount &gt; 1">s</tpl></div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-heart color_blue"></i> <span id="likecount_{message.mid}">{message.likecount}</span> Like<tpl if="message.likecount &gt; 1">s</tpl></div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-comment color_blue"></i> {message.comments.length} comment<tpl if="message.comments.length &gt; 1">s</tpl></div>',
	'<div class="clear">&nbsp;</div>',
	
	'<div class="share_bar">',
	'<div class="share_inner" style="line-height: 35px;">',
	'<span class="share_icon"><i class="fa fa-share"></i></span>',
	'<a onclick="like(\'{message.mid}\');" class="share_btn like"> <i class="fa fa-heart"></i> Like</a>',
	'<a onclick="addfav(\'{message.mid}\');" class="share_btn fav"> <i class="fa fa-star"></i> Favorite</a><BR>',
	'<a onclick=\'top.goOpenSafari("https://www.facebook.com/sharer/sharer.php?u={[this.current_url(values.message.mtype)]}{message.mid}")\' class="share_btn fb">&nbsp;<i class="fa fa-facebook"></i> Share</a>',
	'<a onclick=\'top.goOpenSafari("https://twitter.com/share?url={[this.current_url(values.message.mtype)]}{message.mid}&text={[this.text_encode(values.message.video_title)]}")\' class="share_btn tw"><i class="fa fa-twitter "></i> Tweet</a>',
	'<a onclick=\'top.goOpenSafari("https://plus.google.com/share?url={[this.current_url(values.message.mtype)]}{message.mid}")\' class="share_btn gp"><i class="fa fa-google-plus"></i> Share</a>',
	'<a onclick=\'top.goOpenSafari("http://service.weibo.com/share/share.php?appkey=&url={[this.current_url(values.message.mtype)]}{message.mid}")\' class="share_btn sn"><i class="fa fa-weibo"></i> Repost</a>',
	'</div>',
	'</div>',
	
	'<div class="clear">&nbsp;</div>',
	'<tpl for="message.comments">',
	'<div class="bg_grey" style="width: 100%; padding-bottom: 10px;"><div class="mmodifytime color_blue fl">&nbsp;<i class="fa fa-user"></i> {name} </div><div class="mmodifytime font12_000 fr" style="padding-right: 10px;"><i class="fa fa-clock-o"></i> {[this.modifytime_format(values.time)]}&nbsp;</div>',
	'<div class="clear"><div class="mmodifytime font12_000 fl">&nbsp;{comment}</div></div><div class="clear"></div></div>',
    '</tpl>',
    
	'<form id="form_comment" name="form_comment" method="get" action="http://147.8.135.16/web/mobilecomment.php" target="commentiframe">',
	'<div class="mmodifytime color_blue fl">&nbsp;<i class="fa fa-comment"></i> Leave a Comment </div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black">Name *</div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black"><input id="name" name="name" class="commentname" value="" style="padding-left: 5px; width: 250px;"/></div><div id="load_1" style="display:none;" class="color_blue"><i class="fa fa-spinner fa-spin" style="margin-top: 13px;margin-left: 5px;"></i></div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black">Your Message *</div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black"><textarea  id="comment" name="comment" class="commentmsg" style="padding: 5px; width: 250px;"></textarea></div><div id="load_2" style="display:none;" class="color_blue"><i class="fa fa-spinner fa-spin" style="margin-top: 27px;margin-left: 5px;"></i></div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black" id="required">* : Required field</div><div class="clear"></div>',
	'<div class="mmodifytime fl postcomment" id="postcomment"><p class="post_a_comment" onclick="formsubmit2db({message.mid});">Post a New Comment</p></div>',
    '<input type="hidden" name="mid" id="mid" value="{message.mid}">',
    '<div class="clear">&nbsp;</div>',
    '</form>',

    '<div class="bg_grey" id="thank" style="width: 100%; margin-top: -30px; display: none;"><div class="mmodifytime color_blue">&nbsp;<i class="fa fa-lightbulb-o"></i> Thank You <br><span style="padding-left: 20px;">Your comment will be displayed within five minutes.</span></div></div>',
	'<div class="bg_grey" id="loading" style="width: 100%; margin-top: -30px; display: none;"><div class="mmodifytime color_blue">&nbsp;<i class="fa fa-lightbulb-o"></i> Thank for your comment. <br></div></div>',
	'<div class="clear"></div>',
    
    
	'<div class="back_icon"><a href="{tagindex}" style="text-decoration: none; color: #8dc63f;"><i class="fa fa-arrow-circle-left"></i> Back</a></div>',
	'<div onclick="clickVideo(\'{[xindex]}\')" class="smoth_item {[xindex % 2 == 0 ? "even" : "odd"]}" >',
	'</div></div></div>  <iframe name="commentiframe" id="commentiframe" width="0" height="0" border="0" style="display: none;"></iframe>',
    {
        modifytime_format: function(values) {
            temp = values.substr(0, 10)+" "+values.substr(11, 10);
            return temp;
        },
        current_url : function(values) {
        	if (values == 12) {
        		return encodeURIComponent('http://147.8.135.16/web/playvideo.php?mid=');
        	} else if (values == 15) {
        		return encodeURIComponent('http://147.8.135.16/web/playposter.php?mid=');
        	}
        },
        text_encode : function(values) {
        		return encodeURIComponent(values);
        }
    }
 );
 
var posterItemTpl = new Ext.XTemplate(
	'<div class="top_line" style="margin: 0 auto; text-align: right;"><form id="search_form" name="search_form" action="search.html" method="get"><button id="searchbtn_blue" type="submit">&nbsp;Search&nbsp;&nbsp;</button><input type="text" id="searchbar_blue" name="search" placeholder=""></form></div>',
	'<div class="video_topic" style="padding-left: 10px;" onclick="top.toogleMenu()">Channels</div>',
	'<div class="video_subtopic" style="padding-left: 10px;"><a href="{tagindex}" style="text-decoration: none; color: #FFF;">{tag}</a> <i class="fa fa-angle-right"></i> POSTER</div>',
	'<div class="play_container"><div class="video_play" id="video_play">',
	'<img src="http://147.8.135.16/{message.poster_path}" class="poster_playback">',
	'<div class="video_play_desc"><span style="font-size:20px;">{message.poster_title}</span></div>',
	'<div class="mmodifytime font12_000" >{message.poster_desc}</div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-clock-o color_blue"></i> {[this.modifytime_format(values.message.mmodifytime)]} </div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-eye color_blue"></i> {message.viewcount} View<tpl if="message.viewcount &gt; 1">s</tpl></div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-heart color_blue"></i> <span id="likecount_{message.mid}">{message.likecount}</span> Like<tpl if="message.likecount &gt; 1">s</tpl></div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-comment color_blue"></i> {message.comments.length} comment<tpl if="message.comments.length &gt; 1">s</tpl></div>',
	'<div class="clear">&nbsp;</div>',
	
	'<div class="share_bar">',
	'<div class="share_inner" style="line-height: 30px;">',
	'<span class="share_icon"><i class="fa fa-share"></i></span>',
	'<a onclick="like(\'{message.mid}\');" class="share_btn like"> <i class="fa fa-heart"></i> Like</a>',
	'<a onclick="addfav(\'{message.mid}\');" class="share_btn fav"> <i class="fa fa-star"></i> Favorite</a><BR>',
	'<a onclick=\'top.goOpenSafari("https://www.facebook.com/sharer/sharer.php?u={[this.current_url(values.message.mtype)]}{message.mid}")\' class="share_btn fb">&nbsp;<i class="fa fa-facebook"></i> Share</a>',
	'<a onclick=\'top.goOpenSafari("https://twitter.com/share?url={[this.current_url(values.message.mtype)]}{message.mid}&text={[this.text_encode(values.message.poster_title)]}")\' class="share_btn tw"><i class="fa fa-twitter "></i> Tweet</a>',
	'<a onclick=\'top.goOpenSafari("https://plus.google.com/share?url={[this.current_url(values.message.mtype)]}{message.mid}")\' class="share_btn gp"><i class="fa fa-google-plus"></i> Share</a>',
	'<a onclick=\'top.goOpenSafari("http://service.weibo.com/share/share.php?appkey=&url={[this.current_url(values.message.mtype)]}{message.mid}")\' class="share_btn sn"><i class="fa fa-weibo"></i> Repost</a>',
	'</div>',
	'</div>',
	
	'<div class="clear">&nbsp;</div>',
	'<tpl for="message.comments">',
	'<div class="bg_grey" style="width: 100%; padding-bottom: 10px;"><div class="mmodifytime color_blue fl">&nbsp;<i class="fa fa-user"></i> {name} </div><div class="mmodifytime font12_000 fr" style="padding-right: 10px;"><i class="fa fa-clock-o"></i> {[this.modifytime_format(values.time)]}&nbsp;</div>',
	'<div class="clear"><div class="mmodifytime font12_000 fl">&nbsp;{comment}</div></div><div class="clear"></div></div>',
    '</tpl>',
    
	'<form id="form_comment" name="form_comment" method="get" action="http://147.8.135.16/web/mobilecomment.php" target="commentiframe">',
	'<div class="mmodifytime color_blue fl">&nbsp;<i class="fa fa-comment"></i> Leave a Comment </div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black">Name *</div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black"><input id="name" name="name" class="commentname" value="" style="padding-left: 5px; width: 250px;"/></div><div id="load_1" style="display:none;" class="color_blue"><i class="fa fa-spinner fa-spin" style="margin-top: 13px;margin-left: 5px;"></i></div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black">Your Message *</div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black"><textarea  id="comment" name="comment" class="commentmsg" style="padding: 5px; width: 250px;"></textarea></div><div id="load_2" style="display:none;" class="color_blue"><i class="fa fa-spinner fa-spin" style="margin-top: 27px;margin-left: 5px;"></i></div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black" id="required">* : Required field</div><div class="clear"></div>',
	'<div class="mmodifytime fl postcomment" id="postcomment"><p class="post_a_comment" onclick="formsubmit2db({message.mid});">Post a New Comment</p></div>',
    '<input type="hidden" name="mid" id="mid" value="{message.mid}">',
    '<div class="clear">&nbsp;</div>',
    '</form>',

    '<div class="bg_grey" id="thank" style="width: 100%; margin-top: -30px; display: none;"><div class="mmodifytime color_blue">&nbsp;<i class="fa fa-lightbulb-o"></i> Thank You <br><span style="padding-left: 20px;">Your comment will be displayed within five minutes.</span></div></div>',
	'<div class="bg_grey" id="loading" style="width: 100%; margin-top: -30px; display: none;"><div class="mmodifytime color_blue">&nbsp;<i class="fa fa-lightbulb-o"></i> Loading. Thanks for your comment. <br></div></div>',
	'<div class="clear"></div>',
    
    
	'<div class="back_icon"><a href="{tagindex}" style="text-decoration: none; color: #8dc63f;"><i class="fa fa-arrow-circle-left"></i> Back</a></div>',
	'<div onclick="clickVideo(\'{[xindex]}\')" class="smoth_item {[xindex % 2 == 0 ? "even" : "odd"]}" >',
	'</div></div></div>  <iframe name="commentiframe" id="commentiframe" width="0" height="0" border="0" style="display: none;"></iframe>',
    {
        modifytime_format: function(values) {
            temp = values.substr(0, 10)+" "+values.substr(11, 10);
            return temp;
        },
        current_url : function(values) {
        	if (values == 12) {
        		return encodeURIComponent('http://147.8.135.16/web/playvideo.php?mid=');
        	} else if (values == 15) {
        		return encodeURIComponent('http://147.8.135.16/web/playposter.php?mid=');
        	}
        },
        text_encode : function(values) {
        		return encodeURIComponent(values);
        }
    }
 );

/*global Ext:false */
Ext.application({
	  requires : ['Ext.Container', 'Ext.MessageBox', 'Ext.Panel', 'Ext.tab.Panel', 'Ext.Video', 'Ext.Toolbar', 'Ext.event.publisher.Dom', 'apps.HTMLPanel', 'apps.posterlist', 'apps.videolist'],
	
    launch: function () {
        Ext.create('Ext.TabPanel', {
        	activeTab: 0,
            fullscreen: true,
            tabBarPosition: 'bottom',
            styleHtmlContent: true,
            plugins: 'swipetabs',

            items: [{
						xtype : 'panel',
						layout : 'card',
						title : 'Video',
						cls : 'channel_bg',
						items : [{
							xtype : 'videoList',
							tag : "tag_lecture",
							title : 'University Life Video',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}, {
						xtype : 'panel',
						layout : 'card',
						title : 'Poster',
						cls : 'channel_bg',
						items : [{
							xtype : 'posterList',
							tag : "tag_lecture",
							title : 'University Life Poster',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}] // items
        }); // create()
    } // launch
}); // application()

var videoData;
var posterData;
var currVideoCard;
var currPosterCard;

Ext.define("UVision.view.Main", {
	extend : 'Ext.ux.slidenavigation.View',

	requires : ['Ext.Container', 'Ext.MessageBox', 'Ext.Panel', 'Ext.tab.Panel', 'Ext.Video', 'Ext.Toolbar', 'Ext.event.publisher.Dom', 'UVision.view.Toolbar', 'UVision.view.HTMLPanel', 'UVision.view.posterlist', 'UVision.view.videolist'],
	config : {
		fullscreen : true,

		slideSelector : 'x-toolbar',
		selectSlideDuration : 200,
		cls : 'black_bg',
		list : {
			maxDrag : 260,
			width : 260,
			items : [{// uvToolbar above the menu
				xtype : 'uvtoolbar',
				docked : 'top',
				ui : 'light',

				title : {
					title : "<img src=\'uvision.png\' style=\'width:120px;height:40px\'/>",
					centered : false,
					width : 260,
					left : 0
				},
			}]
		},
		groups : {
			'Channels' : 1,
			'Guide Me' : 2
		},
		defaults : {
			style : 'background: #fff',
			xtype : 'container'
		},
		items : [{
			title : 'Main Page',
			slideButton : {
				selector : 'uvtoolbar',
				ui : 'action'
			},
			items : [{
				xtype : 'uvtoolbar',
				docked : 'top'
			}, {
				xtype : 'panel',
				html : '<img src="resources/images/guide.png" width="100%" />'
			}]
		}, {
			title : 'University Life',
			group : 'Channels',
			slideButton : {
				selector : 'toolbar',
				ui : 'action'
			},
			items : [{
				xtype : 'uvtoolbar',
				docked : 'top'
			}, {
				xtype : 'tabpanel',
				activeTab : 0,
				tabBar : {
					layout : {
						pack : 'center',
						align : 'center'
					},
					docked : 'bottom'
				},
				items : [{
					xtype : 'panel',
					layout : 'card',
					title : 'Video',
					cls : 'channel_bg',
					items : [{
						xtype : 'videoList',
						tag : "tag_unilife",
						title : 'University Life v',
						scrollable : 'vertical'
					}, {
						xtype : 'panel',
						scrollable : 'vertical'
					}]
				}, {
					xtype : 'panel',
					layout : 'card',
					title : 'Poster',
					cls : 'channel_bg',
					items : [{
						xtype : 'posterList',
						tag : "tag_unilife",
						title : 'University Life p',
						scrollable : 'vertical'
					}, {
						xtype : 'panel',
						scrollable : 'vertical'
					}]
				}]
			}]
		}, {
			title : 'People',
			group : 'Channels',
			slideButton : {
				selector : 'toolbar',
				ui : 'action'
			},
			items : [{
				xtype : 'uvtoolbar',
				docked : 'top'
			}, {
				xtype : 'tabpanel',
				activeTab : 0,
				tabBar : {
					layout : {
						pack : 'center',
						align : 'center'
					},
					docked : 'bottom'
				},
				items : [{
					xtype : 'panel',
					layout : 'card',
					title : 'Video',
					cls : 'channel_bg',
					items : [{
						xtype : 'videoList',
						tag : "tag_people",
						title : 'People v',
						scrollable : 'vertical'
					}, {
						xtype : 'panel',
						scrollable : 'vertical'
					}]
				}, {
					xtype : 'panel',
					layout : 'card',
					title : 'Poster',
					cls : 'channel_bg',
					items : [{
						xtype : 'posterList',
						tag : "tag_people",
						title : 'People p',
						scrollable : 'vertical'
					}, {
						xtype : 'panel',
						scrollable : 'vertical'
					}]
				}]
			}]
		}, {
			title : 'Campus',
			group : 'Channels',
			slideButton : {
				selector : 'toolbar',
				ui : 'action'
			},
			items : [{
				xtype : 'uvtoolbar',
				docked : 'top'
			}, {
				xtype : 'tabpanel',
				activeTab : 0,
				tabBar : {
					layout : {
						pack : 'center',
						align : 'center'
					},
					docked : 'bottom'
				},
				items : [{
					xtype : 'panel',
					layout : 'card',
					title : 'Video',
					cls : 'channel_bg',
					items : [{
						xtype : 'videoList',
						tag : "tag_campus",
						title : 'Campus v',
						scrollable : 'vertical'
					}, {
						xtype : 'panel',
						scrollable : 'vertical'
					}]
				}, {
					xtype : 'panel',
					layout : 'card',
					title : 'Poster',
					cls : 'channel_bg',
					items : [{
						xtype : 'posterList',
						tag : "tag_campus",
						title : 'Campus p',
						scrollable : 'vertical'
					}, {
						xtype : 'panel',
						scrollable : 'vertical'
					}]
				}]
			}]
		}, {
			title : 'Events & Ceremonies',
			group : 'Channels',
			slideButton : {
				selector : 'toolbar',
				ui : 'action'
			},
			items : [{
				xtype : 'uvtoolbar',
				docked : 'top'
			}, {
				xtype : 'tabpanel',
				activeTab : 0,
				tabBar : {
					layout : {
						pack : 'center',
						align : 'center'
					},
					docked : 'bottom'
				},
				items : [{
					xtype : 'panel',
					layout : 'card',
					title : 'Video',
					cls : 'channel_bg',
					items : [{
						xtype : 'videoList',
						tag : "tag_events",
						title : 'Events v',
						scrollable : 'vertical'
					}, {
						xtype : 'panel',
						scrollable : 'vertical'
					}]
				}, {
					xtype : 'panel',
					layout : 'card',
					title : 'Poster',
					cls : 'channel_bg',
					items : [{
						xtype : 'posterList',
						tag : "tag_events",
						title : 'Events p',
						scrollable : 'vertical'
					}, {
						xtype : 'panel',
						scrollable : 'vertical'
					}]
				}]
			}]
		}, {
			title : 'Lecture & Conferences',
			group : 'Channels',
			slideButton : {
				selector : 'toolbar',
				ui : 'action'
			},
			items : [{
				xtype : 'uvtoolbar',
				docked : 'top'
			}, {
				xtype : 'tabpanel',
				activeTab : 0,
				tabBar : {
					layout : {
						pack : 'center',
						align : 'center'
					},
					docked : 'bottom'
				},
				items : [{
					xtype : 'panel',
					layout : 'card',
					title : 'Video',
					cls : 'channel_bg',
					items : [{
						xtype : 'videoList',
						tag : "tag_lecture",
						title : 'Lecture v',
						scrollable : 'vertical'
					}, {
						xtype : 'panel',
						scrollable : 'vertical'
					}]
				}, {
					xtype : 'panel',
					layout : 'card',
					title : 'Poster',
					cls : 'channel_bg',
					items : [{
						xtype : 'posterList',
						tag : "tag_lecture",
						title : 'Lecture p',
						scrollable : 'vertical'
					}, {
						xtype : 'panel',
						scrollable : 'vertical'
					}]
				}]
			}]
		}, {
			title : 'Research',
			group : 'Channels',
			slideButton : {
				selector : 'toolbar',
				ui : 'action'
			},
			items : [{
				xtype : 'uvtoolbar',
				docked : 'top'
			}, {
				xtype : 'tabpanel',
				activeTab : 0,
				tabBar : {
					layout : {
						pack : 'center',
						align : 'center'
					},
					docked : 'bottom'
				},
				items : [{
					xtype : 'panel',
					layout : 'card',
					title : 'Video',
					cls : 'channel_bg',
					items : [{
						xtype : 'videoList',
						tag : "tag_research",
						title : 'Research v',
						scrollable : 'vertical'
					}, {
						xtype : 'panel',
						scrollable : 'vertical'
					}]
				}, {
					xtype : 'panel',
					layout : 'card',
					title : 'Poster',
					cls : 'channel_bg',
					items : [{
						xtype : 'posterList',
						tag : "tag_research",
						title : 'Research p',
						scrollable : 'vertical'
					}, {
						xtype : 'panel',
						scrollable : 'vertical'
					}]
				}]
			}]
		}, {
			title : 'Miscellaneous',
			group : 'Channels',
			slideButton : {
				selector : 'toolbar',
				ui : 'action'
			},
			items : [{
				xtype : 'uvtoolbar',
				docked : 'top'
			}, {
				xtype : 'tabpanel',
				activeTab : 0,
				tabBar : {
					layout : {
						pack : 'center',
						align : 'center'
					},
					docked : 'bottom'
				},
				items : [{
					xtype : 'panel',
					layout : 'card',
					title : 'Video',
					cls : 'channel_bg',
					items : [{
						xtype : 'videoList',
						tag : "tag_misc",
						title : 'Miscellaneous',
						scrollable : 'vertical'
					}, {
						xtype : 'panel',
						scrollable : 'vertical'
					}]
				}, {
					xtype : 'panel',
					layout : 'card',
					title : 'Poster',
					cls : 'channel_bg',
					items : [{
						xtype : 'posterList',
						tag : "tag_misc",
						title : 'Miscellaneous',
						scrollable : 'vertical'
					}, {
						xtype : 'panel',
						scrollable : 'vertical'
					}]
				}]
			}]
		}, {
			title : 'What is U-Vision',
			group : 'Guide Me',
			slideButton : {
				selector : 'toolbar',
				ui : 'action'
			},
			items : [{
				xtype : 'uvtoolbar',
				docked : 'top'
			}, {
				xtype : 'HTMLPanel',
				cls : 'guideme_bg',
				title : 'What is U-Vision',
				scrollable : 'vertical',
				url : 'html_whatisuv.html'
			}]

		}, {
			title : 'Locations',
			group : 'Guide Me',
			slideButton : {
				selector : 'uvtoolbar',
				ui : 'action'
			},
			items : [{
				xtype : 'uvtoolbar',
				docked : 'top'
			}, {
				xtype : 'HTMLPanel',
				cls : 'guideme_bg',
				title : 'Location',
				scrollable : 'vertical',
				url : 'html_location.html'
			}]

		}, {
			title : 'How to Upload to U-Vision',
			group : 'Guide Me',
			slideButton : {
				selector : 'uvtoolbar',
				ui : 'action'
			},
			items : [{
				xtype : 'uvtoolbar',
				docked : 'top'
			}, {
				xtype : 'HTMLPanel',
				cls : 'guideme_bg',
				title : 'How to Upload to U-Vision',
				scrollable : 'vertical',
				url : 'html_faq.html'
			}]

		}, {
			title : 'Feedback Form',
			group : 'Guide Me',
			slideButton : {
				selector : 'uvtoolbar',
				ui : 'action'
			},
			items : [{
				xtype : 'uvtoolbar',
				docked : 'top'
			}, {
				xtype : 'HTMLPanel',
				cls : 'guideme_bg',
				title : 'Feedback Form & Contact Info',
				scrollable : 'vertical',
				url : 'html_contact.html'
			}]

		}, {
			title : 'Legal (Copyright)',
			group : 'Guide Me',
			slideButton : {
				selector : 'uvtoolbar',
				ui : 'action'
			},
			items : [{
				xtype : 'uvtoolbar',
				docked : 'top'
			}, {
				xtype : 'HTMLPanel',
				cls : 'guideme_bg',
				title : 'Legal (Copyright)',
				scrollable : 'vertical',
				url : 'html_legal.html'
			}]

		}]
	}
});

function clickVideo(n) {
	event.preventDefault();
	n = n - 1;
	var videoPath;
	var videoDesc;
	var videoImg;

	var mycard = currVideoCard.getParent();

	mycard.setActiveItem(1);
	var videocard = mycard.getActiveItem();

	var pal = new Ext.Panel({
		tpl : videoItemTpl,
		data : videoData[n],
		layout : 'fit',
		scroll : 'vertical',
	});
	videocard.on('deactivate', function() {
		//alert("foo");
	});
	videocard.removeAll();
	videocard.add(pal);
	document.getElementById("latestvideo").innerHTML=videoIcon;
	loadLatestVideo();
}

function clickVideoBack1(n){

	window.plugins.videoPlayer.play(n);
}


function clickPoster(n) {
	event.preventDefault();
	n = n - 1;
	var videoPath;
	var videoDesc;
	var videoImg;

	var mycard = currPosterCard.getParent();

	mycard.setActiveItem(1);
	var videocard = mycard.getActiveItem();

	var e = Ext.create('Ext.Panel', {
		tpl : posterItemTpl,
		data : posterData[n],
		layout : 'fit',
		scroll : 'vertical'
	});
	videocard.removeAll();
	videocard.add(e);

}
function senddata() {

	if (document.getElementById('firstName').value == "" || document.getElementById('lastName').value == "" || document.getElementById('email').value == "" || document.getElementById('message').value == "") {
		document.getElementById("firstName").style.borderColor = "#FF0000";
		document.getElementById("lastName").style.borderColor = "#FF0000";
		document.getElementById("message").style.borderColor = "#FF0000";
		document.getElementById("email").style.borderColor = "#FF0000";
		document.getElementById('noemptyinfo').style.display = "block";

	} else {
		document.getElementById('thankyou').style.display = "block";
		Ext.Ajax.request({
			url : 'http://147.8.135.16/mobilesupport/contactform.php',
			params : {
				firstName : document.getElementById('firstName').value,
				lastName : document.getElementById('lastName').value,
				organization : document.getElementById('organization').value,
				phoneNumber : document.getElementById('phoneNumber').value,
				email : document.getElementById('email').value,
				subject : document.getElementById('subject').value,
				message : document.getElementById('message').value

			},
			success : function(response) {
				//alert("Thank you");
				document.getElementById("firstName").style.borderColor = "#dadada"
				document.getElementById("lastName").style.borderColor = "#dadada"
				document.getElementById("message").style.borderColor = "#dadada"
				document.getElementById("email").style.borderColor = "#dadada"

				document.getElementById('noemptyinfo').style.display = "none";
				document.getElementById('firstName').value = "";
				document.getElementById('lastName').value = "";
				document.getElementById('organization').value = "";
				document.getElementById('phoneNumber').value = "";
				document.getElementById('email').value = "";
				document.getElementById('subject').value = "";
				document.getElementById('message').value = "";

			}
		});
	}
}

function closethx(){
    	event.preventDefault();
    document.getElementById("thankyou").style.display = "none";
}

function clickVideoBack() {
	event.preventDefault();
	var vplay = document.getElementsByClassName("video_play");
	if (vplay != undefined && vplay.length > 0) {
		for (var i = 0; i < vplay.length; i++) {
			vplay[i].innerHTML = "";
		}
	}

	if (currVideoCard != null) {
		currVideoCard.getParent().setActiveItem(0);
	}
}

function clickPosterBack() {
	event.preventDefault();
	if (currPosterCard != null) {

		currPosterCard.getParent().setActiveItem(0);
	}
}

function loadLatestVideo() {
	$("#latestvideo").smoothDivScroll({
		mousewheelScrolling: "allDirections",
		manualContinuousScrolling: true,
		touchScrolling : true
	})
}

Ext.define('apps.HTMLPanel', {
	extend : 'Ext.Panel',
	xtype : 'HTMLPanel',
	styleHtmlContent : true,
	// We are using Ext.Ajax, so we should require it
	requires : ['Ext.Ajax'],
	cls: '',

	config : {
		styleHtmlContent : true,
		fullscreen: true,
		listeners : {
			activate : 'onActivate'
		},

		// Create a new configuration called `url` so we can specify the URL
		url : null
	},

	onActivate : function(me, container) {
		Ext.Ajax.request({

			// we should use the getter for our new `url` config
			url : this.getUrl(),
			method : "GET",
			success : function(response, request) {

				// We should use the setter for the HTML config for this
				me.setHtml(response.responseText);
			},
			failure : function(response, request) {
				me.setHtml("failed -- response: " + response.responseText);
			}
		});
	}
}); 

var videoIcon = "";

var videoListTpl = new Ext.XTemplate(
	'<div class="top_line" style="margin: 0 auto; text-align: right;"><form id="search_form" name="search_form" action="search.html" method="get"><button id="searchbtn_blue" type="submit">&nbsp;Search&nbsp;&nbsp;</button><input type="text" id="searchbar_blue" name="search" placeholder=""></form></div>',
	'<div class="video_topic" style="padding-left: 10px;" onclick="top.toogleMenu()">Channels</div>',
	'<div class="video_subtopic" style="padding-left: 10px;"><a href="{tagindex}" style="text-decoration: none; color: #FFF;">{intname}</a> <i class="fa fa-angle-right"></i> VIDEO</div>',
	'<div class="video_margin" style="margin-left: -5px;">',
	'<div class="videolist">',
	'<tpl for="message">',
	'<div class="video_item {[xindex % 2 == 0 ? "even" : "odd"]}" ><!--onclick="clickVideo(\'{[xindex]}\');"-->', 
	'<a href="detail.html?mid={mid}" style="text-decoration: none;">',
	'<img src="http://147.8.135.16/{video_thumbnail}" class="video_thumb" alt="{video_title}">',
	'<span class="video_desc">{video_title}</span>',
	'<span class="video_author"><tpl if="this.exists(video_author)">by: {video_author}</tpl></span>',
	'<span class="view_count"><i class="fa fa-eye color_blue"></i> {viewcount} View<tpl if="viewcount &gt; 1">s</tpl></span>',
	'<span class="like_count"><i class="fa fa-thumbs-up color_blue"></i> {likecount} Like<tpl if="likecount &gt; 1">s</tpl></span>',
	'<span class="comment_count"><i class="fa fa-comment color_blue"></i> {comments.length} comment<tpl if="likecount &gt; 1">s</tpl></span>',
 	'</a></div>',
 	'</tpl>',
 	'<tpl if="message.length == 0"><div style="width: 100%; margin: 0 auto; color: #FFF;">No content found.</div>',
 	'</tpl>', 
 	'<div class="back_icon"><a href="home.html" style="text-decoration: none; color: #FFF;"><i class="fa fa-arrow-circle-left"></i> Back</a></div>',	
 	'</div>',
 	'</div>'
 );

var videoItemTpl = new Ext.XTemplate(
	'<div class="top_line" style="margin: 0 auto; text-align: right;"><form id="search_form" name="search_form" action="search.html" method="get"><button id="searchbtn_blue" type="submit">&nbsp;Search&nbsp;&nbsp;</button><input type="text" id="searchbar_blue" name="search" placeholder=""></form></div>',
	'<div class="video_topic" style="padding-left: 10px;" onclick="top.toogleMenu()">Channels</div>',
	'<div class="video_subtopic" style="padding-left: 10px;"><a href="{tagindex}" style="text-decoration: none; color: #FFF;">{tag}</a> <i class="fa fa-angle-right"></i> VIDEO</div>',
	'<div class="play_container"><div class="video_play" id="video_play">',
	'<video controls="controls" poster="http://147.8.135.16/{message.video_thumbnail}" class="video_playback">', 
	'<source src="http://147.8.135.16/{message.video_sdpath}"/></video>',
	'<div class="video_play_desc"><span style="font-size:20px;">{message.video_title}</span></div>',
	'<div class="mmodifytime font12_000" >{message.video_desc}</div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-clock-o color_blue"></i> {[this.modifytime_format(values.message.mmodifytime)]} </div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-eye color_blue"></i> {message.viewcount} View<tpl if="message.viewcount &gt; 1">s</tpl></div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-heart color_blue"></i> <span id="likecount_{message.mid}">{message.likecount}</span> Like<tpl if="message.likecount &gt; 1">s</tpl></div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-comment color_blue"></i> {message.comments.length} comment<tpl if="message.comments.length &gt; 1">s</tpl></div>',
	
	'<div class="clear">&nbsp;</div>',
	
	'<div class="share_bar">',
	'<div class="share_inner" style="line-height: 30px;">',
	'<span class="share_icon"><i class="fa fa-share"></i></span>',
	'<a onclick="like(\'{message.mid}\');" class="share_btn like"> <i class="fa fa-heart"></i> Like</a>',
	'<a onclick="addfav(\'{message.mid}\');" class="share_btn fav"> <i class="fa fa-heart"></i> Favorite</a><BR>',
	'<a onclick=\'top.goOpenSafari("https://www.facebook.com/sharer/sharer.php?u={[this.current_url(values.message.mtype)]}{message.mid}")\' class="share_btn fb"><i class="fa fa-facebook"></i> Share</a>',
	'<a onclick=\'top.goOpenSafari("https://twitter.com/share?url={[this.current_url(values.message.mtype)]}{message.mid}&text={[this.text_encode(values.message.video_title)]}")\' class="share_btn tw"><i class="fa fa-twitter "></i> Tweet</a>',
	'<a onclick=\'top.goOpenSafari("https://plus.google.com/share?url={[this.current_url(values.message.mtype)]}{message.mid}")\' class="share_btn gp"><i class="fa fa-google-plus"></i> Share</a>',
	'<a onclick=\'top.goOpenSafari("http://service.weibo.com/share/share.php?appkey=&url={[this.current_url(values.message.mtype)]}{message.mid}")\' class="share_btn sn"><i class="fa fa-weibo"></i> Repost</a>',
	'</div>',
	'</div>',
	
	'<div class="clear">&nbsp;</div>',
	'<tpl for="message.comments">',
	'<div class="bg_grey" style="width: 100%; padding-bottom: 10px;"><div class="mmodifytime color_blue fl">&nbsp;<i class="fa fa-user"></i> {name} </div><div class="mmodifytime font12_000 fr" style="padding-right: 10px;"><i class="fa fa-clock-o"></i> {[this.modifytime_format(values.time)]}&nbsp;</div>',
	'<div class="clear"><div class="mmodifytime font12_000 fl">&nbsp;{comment}</div></div><div class="clear"></div></div>',
    '</tpl>',
	
	'<form id="form_comment" name="form_comment" method="get" action="http://147.8.135.16/web/mobilecomment.php" target="commentiframe">',
	'<div class="mmodifytime color_blue fl">&nbsp;<i class="fa fa-comment"></i> Leave a Comment </div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black">Name</div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black"><input id="name" name="name" class="commentname" value="" style="padding-left: 5px; width: 250px;"/></div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black">Your Message</div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black"><textarea  id="comment" name="comment" class="commentmsg" style="padding: 5px; width: 250px;"></textarea></div><div class="clear"></div>',
	'<div class="mmodifytime fl postcomment"><p class="post_a_comment" onclick="form_comment.submit(); form_comment.reset(); $(\'#thank\').show();">Post a New Comment</p></div>',
    '<input type="hidden" name="mid" id="mid" value="{message.mid}">',
    '<div class="clear">&nbsp;</div>',
    '</form>',

    '<div class="bg_grey" id="thank" style="width: 100%; margin-top: -30px; display: none;"><div class="mmodifytime color_blue">&nbsp;<i class="fa fa-lightbulb-o"></i> Thank You <br><span style="padding-left: 20px;">Your comment will be displayed within five minutes.</span></div></div>',
	'<div class="clear"></div>',
	
	'<div onclick="clickVideoBack()" class="back_icon"><i class="fa fa-arrow-circle-left"></i> Back</div>',
	'<div onclick="clickVideo(\'{[xindex]}\')" class="smoth_item {[xindex % 2 == 0 ? "even" : "odd"]}" >',
	'<tpl for=".">',
	'</tpl>',
	'</div></div></div>  <iframe name="commentiframe" id="commentiframe" width="0" height="0" border="0" style="display: none;"></iframe>',
    {
        modifytime_format: function(values) {
            temp = values.substr(0, 10)+" "+values.substr(11, 10);
            return temp;
        },
        current_url : function(values) {
        	if (values == 12) {
        		return encodeURIComponent('http://147.8.135.16/web/playvideo.php?mid=');
        	} else if (values == 15) {
        		return encodeURIComponent('http://147.8.135.16/web/playposter.php?mid=');
        	}
        },
        text_encode : function(values) {
        		return encodeURIComponent(values);
        }
    }
 );

Ext.define('apps.videolist', {
	extend : 'Ext.Panel',
	xtype : 'videoList',
	styleHtmlContent : true,
	requires : ['Ext.data.JsonP'],
	config : {
		listeners : {
			activate : 'onActivate',
			painted : 'onPainted',
			deactivate : 'onDeactivate'
		},
		tag : null
	},
	onDeactivate:function (me, container){
	},
	onPainted: function (me, container){
		 currVideoCard = me;
		 clickVideoBack();
		 clickPosterBack();
	},
	onActivate : function(me, container) {
		Ext.data.JsonP.request({
		 url : 'http://147.8.135.16/mobilesupport/getjson.php?',
		 callbackKey : 'callback',
		 params : {
			 tag : this.getTag(),
			 typeID : '12'
		 },
		 callback : function(success, result) {
		 	
		if (result['intname'] == "tag_unilife" ) {
	 		result['intname'] = "UNIVERSITY LIFE";
	 	} else if (result['intname'] == "tag_people" ) {
	 		result['intname'] = "PEOPLE";
	 	} else if (result['intname'] == "tag_campus" ) {
	 		result['intname'] = "CAMPUS";
	 	} else if (result['intname'] == "tag_events" ) {
	 		result['intname'] = "EVENTS & CEREMONIES";
	 	} else if (result['intname'] == "tag_lecture" ) {
	 		result['intname'] = "LECTURE & CONFERENCES";
	 	} else if (result['intname'] == "tag_research" ) {
	 		result['intname'] = "ACADEMIC LIFE";
	 	} else if (result['intname'] == "tag_misc" ) {
	 		result['intname'] = "MISCELLANEOUS";
	 	} else if (result['intname'] == "tag_publications" ) {
	 		result['intname'] = "PUBLICATIONS";
	 	}			 	
		 tag = result['intname'];
		 videoData = result.message;
		 var message = result;
		 if (message) {
		 	//videoListTpl.overwrite(me.body, message);
		 	videoIcon = "";
		 	for (i=0; i< message.length; i++){
		 		videoIcon += "<img src=\"http://147.8.135.16/"+message[i].micon+"\" class=\"smoth_thumb\"/>";
		 	}
		 	me.updateHtml(videoListTpl.applyTemplate(message));
		 } else {
		 alert('There was an error retrieving data. Please check your internet Connection.');
		 }
		 }
		 });
	}
});


/*global Ext:false */
Ext.application({
	  requires : ['Ext.Container', 'Ext.MessageBox', 'Ext.Panel', 'Ext.tab.Panel', 'Ext.Video', 'Ext.Toolbar', 'Ext.event.publisher.Dom', 'apps.HTMLPanel', 'apps.posterlist', 'apps.videolist'],
	
    launch: function () {
        Ext.create('Ext.TabPanel', {
        	activeTab: 0,
            fullscreen: true,
            tabBarPosition: 'bottom',
            styleHtmlContent: true,
            plugins: 'swipetabs',

            items: [{
						xtype : 'panel',
						layout : 'card',
						title : 'Video',
						cls : 'channel_bg',
						items : [{
							xtype : 'videoList',
							tag : "tag_publications",
							title : 'Publication',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}, {
						xtype : 'panel',
						layout : 'card',
						title : 'Poster',
						cls : 'channel_bg',
						items : [{
							xtype : 'posterList',
							tag : "tag_publications",
							title : 'Publication',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}] // items
        }); // create()
    } // launch
}); // application()

/*global Ext:false */
Ext.application({
	  requires : ['Ext.Container', 'Ext.MessageBox', 'Ext.Panel', 'Ext.tab.Panel', 'Ext.Video', 'Ext.Toolbar', 'Ext.event.publisher.Dom', 'apps.HTMLPanel', 'apps.posterlist', 'apps.videolist'],
	
    launch: function () {
        Ext.create('Ext.TabPanel', {
        	activeTab: 0,
            fullscreen: true,
            tabBarPosition: 'bottom',
            styleHtmlContent: true,
            plugins: 'swipetabs',

            items: [{
						xtype : 'panel',
						layout : 'card',
						title : 'Video',
						cls : 'channel_bg',
						items : [{
							xtype : 'videoList',
							tag : "tag_people",
							title : 'University Life Video',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}, {
						xtype : 'panel',
						layout : 'card',
						title : 'Poster',
						cls : 'channel_bg',
						items : [{
							xtype : 'posterList',
							tag : "tag_people",
							title : 'University Life Poster',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}] // items
        }); // create()
    } // launch
}); // application()

/*global Ext:false 
Ext.application({
	  requires : ['Ext.Container', 'Ext.MessageBox', 'Ext.Panel', 'Ext.tab.Panel', 'Ext.Video', 'Ext.Toolbar', 'Ext.event.publisher.Dom', 'apps.HTMLPanel', 'apps.posterlist', 'apps.videolist'],
	
    launch: function () {
        Ext.create('Ext.Carousel', {
            fullscreen: true,
            direction: 'horizontal',

            defaults: {
                styleHtmlContent: true
            },
				items : [{
					xtype : 'panel',
					layout : 'card',
					title : 'Video',
					cls : 'channel_bg',
					items : [{
						xtype : 'videoList',
						tag : "tag_people",
						title : 'University Life v',
						scrollable : 'vertical'
					}, {
						xtype : 'panel',
						scrollable : 'vertical'
					}]
				}, {
					xtype : 'panel',
					layout : 'card',
					title : 'Poster',
					cls : 'channel_bg',
					items : [{
						xtype : 'posterList',
						tag : "tag_people",
						title : 'University Life p',
						scrollable : 'vertical'
					}, {
						xtype : 'panel',
						scrollable : 'vertical'
					}]
				}]
        });
    }
});
*/


/*global Ext:false */
Ext.application({
	  requires : ['Ext.Container', 'Ext.MessageBox', 'Ext.Panel', 'Ext.tab.Panel', 'Ext.Video', 'Ext.Toolbar', 'Ext.event.publisher.Dom', 'apps.HTMLPanel', 'apps.searchlist'],
	
    launch: function () {
        Ext.create('Ext.TabPanel', {
        	activeTab: 0,
            fullscreen: true,
            tabBarPosition: 'none',
            styleHtmlContent: true,

            items: [{
						xtype : 'panel',
						layout : 'card',
						title : 'Poster',
						cls : 'channel_bg',
						items : [{
							xtype : 'searchlist',
							title : 'Channel Search',
							scrollable : 'vertical'
						}, {
							xtype : 'panel',
							scrollable : 'vertical'
						}]
					}] // items
        }); // create()
    } // launch
}); // application()


var videoIcon = "";

var searchlistTpl = new Ext.XTemplate(
	'<div class="top_line" style="margin: 0 auto; text-align: right;"><form id="search_form" name="search_form" action="search.html" method="get"><button id="searchbtn_blue" type="submit">&nbsp;Search&nbsp;&nbsp;</button><input type="text" id="searchbar_blue" name="search" placeholder=""></form></div>',
	'<div class="video_topic" style="padding-left: 10px;" onclick="top.toogleMenu()">Channels</div>',
	'<div class="video_subtopic" style="padding-left: 10px;">SEARCH <i class="fa fa-angle-right"></i> {tag}</div>',
	'<div class="video_margin" style="margin-left: -5px;">',
	'<div class="searchlist">',
	'<tpl for="structures">',
	'<div onclick="clicksearch(\'{[xindex]}\')" class="video_item {[xindex % 2 == 0 ? "even" : "odd"]}" >', 
	'{[this.thumb(values)]}',
	'<span class="video_desc">{mname}</span>',
	'<span class="video_author">{[this.author(values)]}</span>',
	'<span class="view_count"><i class="fa fa-eye color_blue"></i> {viewcount} View<tpl if="viewcount &gt; 1">s</tpl></span>',
	'<span class="like_count"><i class="fa fa-thumbs-up color_blue"></i> {likecount} Like<tpl if="likecount &gt; 1">s</tpl></span>',
	'<span class="comment_count"><i class="fa fa-comment color_blue"></i> {comments.length} comment<tpl if="likecount &gt; 1">s</tpl></span>',
 	'</div>',
 	'</tpl>',
 	'<tpl if="structures.length == 0"><div style="width: 100%; margin: 0 auto; color: #FFF;">No content found.</div>',
 	'</tpl>',
 	'<div class="back_icon"><a href="home.html" style="text-decoration: none; color: #FFF;"><i class="fa fa-arrow-circle-left"></i> Back</a></div>',
 	'</div>',
 	'</div>',
 	{
        thumb: function(values) {
        	if (values.mtype == 12){
        	temp = '<img src="http://147.8.135.16/'+values.video_thumbnail+'" class="video_thumb">';
            return temp;	
        	} else if (values.mtype == 15){
        	temp = '<img src="http://147.8.135.16/mobilesupport/getthumb.php?path='+values.poster_path+'" class="video_thumb">';
            return temp;	
        	}  
        },
        author:function(values){
        	var temp = "";
        	if (values.mtype == 12){
        		if (typeof(values.poster_author) != "undefined" && values.poster_author.length > 0){
        				temp = 'by: '+values.poster_author;
        		}
        	} else if (values.mtype == 15){
        		if (typeof(values.video_author) != "undefined" && values.video_author.length > 0){
        				temp = 'by: '+values.video_author;
        		}
        	} 
        	return temp;
        }
    }
 );

var searchItemTpl = new Ext.XTemplate(
	'<div class="top_line" style="margin: 0 auto; text-align: right;"><form id="search_form" name="search_form" action="search.html" method="get"><button id="searchbtn_blue" type="submit">&nbsp;Search&nbsp;&nbsp;</button><input type="text" id="searchbar_blue" name="search" placeholder=""></form></div>',
	'<div class="video_topic" style="padding-left: 10px;" onclick="top.toogleMenu()">Channels</div>',
	'<div class="video_subtopic" style="padding-left: 10px;">SEARCH <i class="fa fa-angle-right"></i> {tag}</div>',
	'<div class="play_container"><div class="video_play" id="video_play">',
	'{[this.thumbp(values.message)]}',
	'<div class="video_play_desc"><span style="font-size:20px;">{message.video_title}</span></div>',
	'<div class="mmodifytime font12_000" >{message.video_desc}</div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-clock-o color_blue"></i> {[this.modifytime_format(values.message.mmodifytime)]} </div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-eye color_blue"></i> {message.viewcount} View<tpl if="message.viewcount &gt; 1">s</tpl></div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-heart color_blue"></i> <span id="likecount_{message.mid}">{message.likecount}</span> Like<tpl if="message.likecount &gt; 1">s</tpl></div>',
	'<div class="mmodifytime font12_000" ><i class="fa fa-comment color_blue"></i> {message.comments.length} comment<tpl if="message.comments.length &gt; 1">s</tpl></div>',
	'<div class="clear">&nbsp;</div>',
	
	'<div class="share_bar">',
	'<div class="share_inner" style="line-height: 30px;">',
	'<span class="share_icon"><i class="fa fa-share"></i></span>',
	'<a onclick="like(\'{message.mid}\');" class="share_btn like"> <i class="fa fa-heart"></i> Like</a>',
	'<a onclick="addfav(\'{message.mid}\');" class="share_btn fav"> <i class="fa fa-heart"></i> Favorite</a><BR>',
	'<a onclick=\'top.goOpenSafari("https://www.facebook.com/sharer/sharer.php?u={[this.current_url(values.message.mtype)]}{message.mid}")\' class="share_btn fb"><i class="fa fa-facebook"></i> Share</a>',
	'<a onclick=\'top.goOpenSafari("https://twitter.com/share?url={[this.current_url(values.message.mtype)]}{message.mid}&text={[this.text_encode(values.message.poster_title)]}")\' class="share_btn tw"><i class="fa fa-twitter "></i> Tweet</a>',
	'<a onclick=\'top.goOpenSafari("https://plus.google.com/share?url={[this.current_url(values.message.mtype)]}{message.mid}")\' class="share_btn gp"><i class="fa fa-google-plus"></i> Share</a>',
	'<a onclick=\'top.goOpenSafari("http://service.weibo.com/share/share.php?appkey=&url={[this.current_url(values.message.mtype)]}{message.mid}")\' class="share_btn sn"><i class="fa fa-weibo"></i> Repost</a>',
	'</div>',
	'</div>',
	
	'<div class="clear">&nbsp;</div>',
	'<tpl for="message.comments">',
	'<div class="bg_grey" style="width: 100%; padding-bottom: 10px;"><div class="mmodifytime color_blue fl">&nbsp;<i class="fa fa-user"></i> {name} </div><div class="mmodifytime font12_000 fr" style="padding-right: 10px;"><i class="fa fa-clock-o"></i> {[this.modifytime_format(values.time)]}&nbsp;</div>',
	'<div class="clear"><div class="mmodifytime font12_000 fl">&nbsp;{comment}</div></div><div class="clear"></div></div>',
    '</tpl>',
	
	'<form id="form_comment" name="form_comment" method="get" action="http://147.8.135.16/web/mobilecomment.php" target="commentiframe">',
	'<div class="mmodifytime color_blue fl">&nbsp;<i class="fa fa-comment"></i> Leave a Comment </div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black">Name *</div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black"><input id="name" name="name" class="commentname" value="" style="padding-left: 5px; width: 250px;"/></div><div id="load_1" style="display:none;" class="color_blue"><i class="fa fa-spinner fa-spin" style="margin-top: 13px;margin-left: 5px;"></i></div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black">Your Message *</div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black"><textarea  id="comment" name="comment" class="commentmsg" style="padding: 5px; width: 250px;"></textarea></div><div id="load_2" style="display:none;" class="color_blue"><i class="fa fa-spinner fa-spin" style="margin-top: 27px;margin-left: 5px;"></i></div><div class="clear"></div>',
	'<div class="mmodifytime fl color_black" id="required">* : Required field</div><div class="clear"></div>',
	'<div class="mmodifytime fl postcomment" id="postcomment"><p class="post_a_comment" onclick="formsubmit2db({message.mid});">Post a New Comment</p></div>',
    '<input type="hidden" name="mid" id="mid" value="{message.mid}">',
    '<div class="clear">&nbsp;</div>',
    '</form>',

    '<div class="bg_grey" id="thank" style="width: 100%; margin-top: -30px; display: none;"><div class="mmodifytime color_blue">&nbsp;<i class="fa fa-lightbulb-o"></i> Thank You <br><span style="padding-left: 20px;">Your comment will be displayed within five minutes.</span></div></div>',
    '<div class="bg_grey" id="loading" style="width: 100%; margin-top: -30px; display: none;"><div class="mmodifytime color_blue">&nbsp;<i class="fa fa-lightbulb-o"></i> Thank for your comment. <br></div></div>',
	'<div class="clear"></div>',
	
	'<div onclick="clickSearchBack()" class="back_icon"><i class="fa fa-arrow-circle-left"></i> Back</div>',
	'<div onclick="clickVideo(\'{[xindex]}\')" class="smoth_item {[xindex % 2 == 0 ? "even" : "odd"]}" >',
	'<tpl for=".">',
	'</tpl>',
	'</div></div></div>  <iframe name="commentiframe" id="commentiframe" width="0" height="0" border="0" style="display: none;"></iframe>',
    {
        modifytime_format: function(values) {
            temp = values.substr(0, 10)+" "+values.substr(11, 10);
            return temp;
        },
        current_url : function(values) {
        	if (values == 12) {
        		return encodeURIComponent('http://147.8.135.16/web/playvideo.php?mid=');
        	} else if (values == 15) {
        		return encodeURIComponent('http://147.8.135.16/web/playposter.php?mid=');
        	}
        },
        text_encode : function(values) {
        		return encodeURIComponent(values);
        },
        thumbp: function(values) {
        	if (values.mtype == 12){
        	temp = '<video controls="controls" poster="http://147.8.135.16/'+values.video_thumbnail+'" class="video_playback">'+
				   '<source src="http://147.8.135.16/'+values.video_sdpath+'"/></video>';
            return temp;	
        	} else if (values.mtype == 15){
        	temp = '<img src="http://147.8.135.16/'+values.poster_path+'" class="poster_playback">';
            return temp;	
        	}  
        }
    }
 );

Ext.define('apps.searchlist', {
	extend : 'Ext.Panel',
	xtype : 'searchlist',
	styleHtmlContent : true,
	requires : ['Ext.data.JsonP'],
	config : {
		listeners : {
			activate : 'onActivate',
			painted : 'onPainted',
			deactivate : 'onDeactivate'
		},
		tag : null
	},
	onDeactivate:function (me, container){
	},
	onPainted: function (me, container){
		 currSearchCard = me;
		 clickSearchBack();
		 me.updateHtml('<div class="top_line" style="margin: 0 auto; text-align: right;"><form id="search_form" name="search_form" action="search.html" method="get"><button id="searchbtn_blue" type="submit">&nbsp;Search&nbsp;&nbsp;</button><input type="text" id="searchbar_blue" name="search" placeholder=""></form></div><div style="position: fixed; left: 50%; top: 50%; "><i class="fa fa-spinner fa-spin" style="color: #FFF; font-size: 30px;"></i></div>');
	},
	onActivate : function(me, container) {
		var getParams = document.URL.split("?");
		// transforming the GET parameters into a dictionnary
		var params = Ext.urlDecode(getParams[getParams.length - 1]);
		//alert(params['search']);
		//params['search'] = decodeURIComponent(params['search']);
		params['search'] = params['search'].split('+').join(' ');
		
		/*
		Ext.data.JsonP.request({
		 url : 'http://147.8.135.17:8080/xaness/getMessageSearch?',
		 //url : 'http://147.8.135.16/mobilesupport/getMessageSearch.php?',
		 callbackKey : 'callback',
		 params : {
			 searchName : params['search']
		 },
		 callback : function(success, result) {
		 me.updateHtml("");
		 result['tag'] = params['search'];
		 tag = params['search'];
		 searchData = result.structures;
		 var message = result;
		 if (message) {
		 	//searchlistTpl.overwrite(me.body, message);
		 	me.updateHtml(searchlistTpl.applyTemplate(message));
		 } else {
		 alert('There was an error retrieving data. Please check your internet Connection.');
		 }
		 }
		 });
		 */
		 
		Ext.Ajax.request({
		    url: 'http://147.8.135.16/mobilesupport/getMessageSearch.php?',
		
			dataType: 'JSONP',
		    jsonpCallback: 'callback',
			type: 'GET',
			params : {
			 	searchName : params['search']
		 	},
		    success: function(response) {
			 //responseText
			 var obj = JSON.parse(response.responseText);
			 me.updateHtml("");
			 obj['tag'] = params['search'];
			 tag = params['search'];
			 searchData = obj.structures;
			 
			 if (obj) {
		     	me.updateHtml(searchlistTpl.applyTemplate(obj));
			 }
		    },
		
		    failure: function(response) {
		        alert('There was an error retrieving data. Please check your internet Connection.');
		    }
		});

		 
		 
	}
});


/*
 * TouchCarousel  v1.1
 *
 * Copyright 2011, Dmitry Semenov, http://dimsemenov.com
 * 
 */
(function($) {
	function TouchCarousel(element, options) {	
		this.carouselRoot = $(element);
		
		var self = this;			
		this._lockYAxis = false;
		this._isAnimating = false;		
		
		this._downEvent = "";
		this._moveEvent = "";
		this._upEvent = "";
		
		this._totalItemsWidth;
		this._itemWidths;
		
		this._startAccelerationX;
		this._accelerationX;
		this._latestDragX;
		
		this._startTime = 0;
		
		this.settings = $.extend({}, $.fn.touchCarousel.defaults, options);		
		
		this._dragContainer = this.carouselRoot.find(".touchcarousel-container");	
		
		// animate directly style for better performance
		this._dragContainerStyle = this._dragContainer[0].style;
		
		this._itemsWrapper = this._dragContainer.wrap($('<div class="touchcarousel-wrapper" />')).parent();		
		var itemsJQ = this._dragContainer.find(".touchcarousel-item");
		
		/* Array item structure: 
		 * {
		 * 		item: jQuery item object
		 * 		index: item index
		 * 		posX: item X position
		 *      width: item width
		 * }
		 * 
		 * */
		this.items = [];
		this.numItems = itemsJQ.length;
		
		
		var ua = navigator.userAgent.toLowerCase();
	    var uaMatch = function( ua ) {
		    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
		        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
		        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
		        /(msie) ([\w.]+)/.exec( ua ) ||
		        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		        [];

		    return {
		        browser: match[ 1 ] || "",
		        version: match[ 2 ] || "0"
		    };
		};
		var matched = uaMatch( ua );
		var br = {};
		if ( matched.browser ) {
		    br[ matched.browser ] = true;
		    br.version = matched.version;
		}
		if(br.chrome) { br.webkit = true; };
		self._browser = br;

		this._decelerationAnim;
		this._successfullyDragged = false;
		this._startMouseX = 0;
		this._prevMouseX = 0;
		this._moveDist = 0;
		this._blockClickEvents = false;
		this._wasBlocked = false;
		
		this._useWebkitTransition = false;
		
		
		if('ontouchstart' in window) {
			this.hasTouch = true;
			this._downEvent = 'touchstart.rs';
			this._moveEvent = 'touchmove.rs';
			this._upEvent = 'touchend.rs';
			this._baseFriction = this.settings.baseTouchFriction;
		} else {
			this.hasTouch = false;
			this._baseFriction = this.settings.baseMouseFriction;
			if(this.settings.dragUsingMouse) {
				this._downEvent = 'mousedown.rs';
				this._moveEvent = 'mousemove.rs';
				this._upEvent = 'mouseup.rs';
				
				//setup cursor
				this._grabCursor;
				this._grabbingCursor;
				var ua = self._browser;
				if (ua.msie || ua.opera) {
					this._grabCursor = this._grabbingCursor = "move";
				} else if(ua.mozilla) {
					this._grabCursor = "-moz-grab";
					this._grabbingCursor = "-moz-grabbing";
				} 
				this._setGrabCursor();
			} else {
				// set cursor to auto if drag navigation is disabled
				this._itemsWrapper.addClass('auto-cursor');
			}
			
		}	
		if(this.hasTouch || this.settings.useWebkit3d) {
			// check if browser supports translate3d()
			if(('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix())) {	
				this._dragContainer.css({'-webkit-transform-origin':'0 0', '-webkit-transform': 'translateZ(0)'});			
				this._useWebkitTransition = true;
			}
		}
		
		
		if(this._useWebkitTransition) {
			this._xProp = '-webkit-transform';
			this._xPref = 'translate3d(';
			this._xSuf = 'px, 0, 0)';
		} else {
			this._xProp = 'left';
			this._xPref = '';
			this._xSuf = 'px';
		}
		
		if(this.hasTouch) {
			this.settings.directionNavAutoHide = false;			
		}		
		
		if(!this.settings.directionNav) {
			if(this.settings.loopItems) {
				this._arrowLeftBlocked = true;
				this._arrowRightBlocked = true;
			} else {
				this._arrowLeftBlocked = false;
				this._arrowRightBlocked = false;
			}
			this.settings.loopItems = true;
		}
		
		var	itemObj,
			jqItem,
			dataSRC,
			slideImg,
			currPosX = 0;
		
		
		
		itemsJQ.eq(this.numItems - 1).addClass('last');
		
		// parse items
		itemsJQ.each(function(index) {
			jqItem = $(this);			
			itemObj = {};
			itemObj.item = jqItem;
			itemObj.index = index;
			itemObj.posX = currPosX;
			itemObj.width = (jqItem.outerWidth(true) || self.settings.itemFallbackWidth);			
			currPosX += itemObj.width;
			
			// block all links inside slides when dragging
			if(!this.hasTouch) {
				jqItem.find('a').bind('click.touchcarousel', function(e) {					
					if(self._successfullyDragged) {						
						e.preventDefault();						
						return false;
					}						
				});
			} else {
				// Fix preventing link bug on some touch devices
				var jqLinks = jqItem.find('a');
				var jqLink;
				jqLinks.each(function() {
					jqLink = $(this);
					jqLink.data('tc-href', jqLink.attr('href'));
					jqLink.data('tc-target', jqLink.attr('target'));
					jqLink.attr('href', '#');
					jqLink.bind('click', function(e) {							
						e.preventDefault();	
						if(self._successfullyDragged) {							
							return false;
						} else {
							var linkData = $(this).data('tc-href');							
							var linkTarget = $(this).data('tc-target');								
							if(!linkTarget || linkTarget.toLowerCase() === '_self') {
								window.location.href = linkData;
							} else {
								window.open(linkData);
							}							
						}					
					});
				});		
			}				
			
			// prevent dragging on all elements that have 'non-draggable' class			
			jqItem.find('.non-draggable').bind(self._downEvent, function(e) {					
				self._successfullyDragged = false;	
				e.stopImmediatePropagation();
			});
			
			self.items.push(itemObj);
		});
		
		
		this._maxXPos = this._totalItemsWidth = currPosX;		
		
		
		if(this.settings.itemsPerMove > 0) {
			this._itemsPerMove = this.settings.itemsPerMove;
		} else {
			this._itemsPerMove = 1;			
		}
		
		// Setup paging
		if(this.settings.pagingNav) {
			this.settings.snapToItems = true;
			this._pagingEnabled = true;
			this._numPages = Math.ceil(this.numItems / this._itemsPerMove);
			this._currPageId = 0;
			
			if(this.settings.pagingNavControls) {
				this._pagingNavContainer = $('<div class="tc-paging-container"><div class="tc-paging-centerer"><div class="tc-paging-centerer-inside"></div></div></div>');
				var pagingInside = this._pagingNavContainer.find('.tc-paging-centerer-inside');
				var pagingItem;
				
				for(var i = 1; i <= this._numPages; i++ ) {					
					pagingItem = $('<a class="tc-paging-item" href="#">' + i + '</a>').data('tc-id',i);					
					if(i === this._currPageId + 1) {
						pagingItem.addClass('current');
					}
					pagingInside.append(pagingItem);	
				}
			
				this._pagingItems = pagingInside.find(".tc-paging-item").click(function(e) {		
					e.preventDefault();						
					self.goTo(($(e.currentTarget).data('tc-id') - 1) * self._itemsPerMove);
				});
				
				this._itemsWrapper.after(this._pagingNavContainer);
			}
			
		} else {
			this._pagingEnabled = false;
		}

		
		this._dragContainer.css({
			width:currPosX+100
		});
		
		


		
		
	


		//Direction navigation (arrows)
		if(this.settings.directionNav) {	
			this._itemsWrapper.after("<a href='#' class='arrow-holder slider_left'><span class='arrow-icon slider_left'></span></a> <a href='#' class='arrow-holder slider_right'><span class='arrow-icon slider_right'></span></a>");
			this.arrowLeft = this.carouselRoot.find(".arrow-holder.slider_left");
			this.arrowRight = this.carouselRoot.find(".arrow-holder.slider_right");

			
			/*if(this.settings.loopItems) {
				this._arrowLeftBlocked = false;
				this._disableLeftArrow();
			}*/
			
			if(this.arrowLeft.length < 1 || this.arrowRight.length < 1) {
				this.settings.directionNav = false;
			} else if(this.settings.directionNavAutoHide) {
				this.arrowLeft.hide();
				this.arrowRight.hide();

				this.carouselRoot.one("mousemove.arrowshover",function() {
					self.arrowLeft.fadeIn("fast");
					self.arrowRight.fadeIn("fast");					
				});


				this.carouselRoot.hover(
						function() {
							self.arrowLeft.fadeIn("fast");
							self.arrowRight.fadeIn("fast");
						},
						function() {
							self.arrowLeft.fadeOut("fast");
							self.arrowRight.fadeOut("fast");				
						}
				);	
			}	
			
			
			this._updateDirectionNav(0);
			
			if(this.settings.directionNav) {
				this.arrowRight.click(function(e) {					
					e.preventDefault();	
					if(self.settings.loopItems && !self._blockClickEvents || !self._arrowRightBlocked )
						self.next();
				});

				this.arrowLeft.click(function(e) {
					e.preventDefault();
					if(self.settings.loopItems && !self._blockClickEvents || !self._arrowLeftBlocked )
						self.prev();
				});	
			}
		}

		
		

		// Manage window resize event with 100ms delay
		this.carouselWidth;
		this._resizeEvent = 'onorientationchange' in window ? 'orientationchange.touchcarousel' : 'resize.touchcarousel';
		var resizeTimer;
		$(window).bind(this._resizeEvent, function() {		
			if(resizeTimer) 
				clearTimeout(resizeTimer);			
			resizeTimer = setTimeout(function() { self.updateCarouselSize(false); }, 100);			
		});		
		
		
		// Setup scrollbar
		if(this.settings.scrollbar) {
			this._scrollbarHolder = $("<div class='scrollbar-holder notshow' ><div class='scrollbar"+ (this.settings.scrollbarTheme.toLowerCase() === "light" ? " light" : " dark")  +"'></div></div>");
			this._scrollbarHolder.appendTo(this.carouselRoot);
			this.scrollbarJQ = this._scrollbarHolder.find('.scrollbar');
			this._scrollbarHideTimeout = "";
			this._scrollbarStyle = this.scrollbarJQ[0].style;			
			this._scrollbarDist = 0;
			if(this.settings.scrollbarAutoHide) {
				this._scrollbarVisible = false;
				this.scrollbarJQ.css("opacity", 0);
			} else {
				this._scrollbarVisible = true;
			}
			
		} else {
			this.settings.scrollbarAutoHide = false;
		}
		
		
		this.updateCarouselSize(true);
		
		
		
		
		
		this._itemsWrapper.bind(this._downEvent, function(e) {  self._onDragStart(e); });	
		
		
		
		// Setup autoplay			
		if(this.settings.autoplay && this.settings.autoplayDelay > 0) {		
			this._isHovering = false;
			this.autoplayTimer = '';
			this.wasAutoplayRunning = true;
			
			if(!this.hasTouch) {						
				this.carouselRoot.hover(
						function() {						
							self._isHovering = true;							
							self._stopAutoplay();
						},
						function() {							
							self._isHovering = false;							
							self._resumeAutoplay();
						}
				);				
			}
			this.autoplay = true;	
			
			this._releaseAutoplay();
		} else {
			this.autoplay = false;
		}
		
		
		// Keyboard navigation
		if(this.settings.keyboardNav) {
			$(document).bind("keydown.touchcarousel", function(e) {
				if(!self._blockClickEvents) {
					if (e.keyCode === 37) {						
						self.prev();
					}
					else if (e.keyCode === 39) {						
						self.next();
					}
				}
			});
		}
		
		// release carousel main container overflow
		this.carouselRoot.css("overflow","visible");
		
	} /* TouchCarousel Constructor End */
	/* -------------------------------------TouchCarousel Prototype------------------------------------------------------*/
	
	
	
	TouchCarousel.prototype = {
			/* Public methods: */
			goTo:function(id, fromAutoplay) {
						
				
				var newItem = this.items[id];
				
				
				if(newItem) {					
					if(!fromAutoplay && this.autoplay && this.settings.autoplayStopAtAction) {						
						this.stopAutoplay();
					}
					
					this._updatePagingNav(id);
					
					
					this.endPos = this._getXPos();
					var newX = -newItem.posX;
					if(newX > 0) {
						newX = 0;
					} else if(newX < this.carouselWidth - this._maxXPos) {
						newX = this.carouselWidth - this._maxXPos;
					}
					this.animateTo(newX, this.settings.transitionSpeed, "easeInOutSine");					
				}			
				
			},
			next:function(fromAutoplay) {				
				var currXPos = this._getXPos();				
				var newItemId = this._getItemAtPos(currXPos).index;	
				
				
				if(!this._pagingEnabled) {
					newItemId = newItemId + this._itemsPerMove;						
					if(this.settings.loopItems) {
						if(currXPos <= this.carouselWidth - this._maxXPos) {
							newItemId = 0;
						}
					}
					if(newItemId > this.numItems - 1) {
						newItemId = this.numItems - 1;
					}
				} else {
					var newPageId = this._currPageId +  1;
					if(newPageId >  this._numPages - 1) {						
						if(this.settings.loopItems) {
							newItemId = 0;
						} else {
							newItemId = (this._numPages - 1) * this._itemsPerMove;	
						}
					} else {
						newItemId = newPageId * this._itemsPerMove;	
					}
				}
				
				
				
				this.goTo(newItemId, fromAutoplay);
			},
			prev:function(fromAutoplay) {	
				var currXPos = this._getXPos();				
				var newItemId = this._getItemAtPos(currXPos).index;	
				
				if(!this._pagingEnabled) {
					newItemId = newItemId - this._itemsPerMove;						
					if(newItemId < 0) {
						if(this.settings.loopItems) {
							if(currXPos < 0) {
								newItemId = 0;							
							} else {
								newItemId = this.numItems - 1;							
							}
							
						} else {
							newItemId = 0;
						}
					}	
				} else {
					var newPageId = this._currPageId -  1;
					if(newPageId <  0) {						
						if(this.settings.loopItems) {
							newItemId = (this._numPages - 1) * this._itemsPerMove;	
						} else {
							newItemId = 0;
						}
					} else {
						newItemId = newPageId * this._itemsPerMove;	
					}			
				}				
				this.goTo(newItemId, fromAutoplay);
			},
			getCurrentId:function() {
				var currId = this._getItemAtPos(this._getXPos()).index;
				return currId;
			},
			setXPos:function(pos, isScrollbar) {	
				if(!isScrollbar) {
					this._dragContainerStyle[this._xProp] = (this._xPref + pos + this._xSuf);					
				} else {					
					this._scrollbarStyle[this._xProp] = (this._xPref + pos + this._xSuf);
				}				
			},
			stopAutoplay: function() {				
				this._stopAutoplay();
				this.autoplay = false;
				this.wasAutoplayRunning = false;				
			},
			resumeAutoplay: function() {
				this.autoplay = true;
				if(!this.wasAutoplayRunning) {
					this._resumeAutoplay();
				}				
			},
			updateCarouselSize:function(leavePos) {
				var self = this;
				
				setTimeout(function() {
					self.carouselWidth = self.carouselRoot.width();
				},300);
				if(this.settings.scrollToLast) {
					var lastItemsWidth = 0;
					if(this._pagingEnabled) {					
						var freeItems = (this.numItems % this._itemsPerMove);
						if(freeItems > 0) {
							for(var i = this.numItems - freeItems; i < this.numItems; i++) {								
								lastItemsWidth += this.items[i].width;
							}
						} else {
							lastItemsWidth = this.carouselWidth;
						}
						
					} else {
						lastItemsWidth = this.items[this.numItems - 1].width;
					}
					this._maxXPos = this._totalItemsWidth + this.carouselWidth - lastItemsWidth;
				} else {
					
					this._maxXPos = this._totalItemsWidth;
				}
				
				
				if(this.settings.scrollbar) {
					var scrlWidth = Math.round(this._scrollbarHolder.width() / (this._maxXPos / this.carouselWidth));
					this.scrollbarJQ.css('width', scrlWidth);					
					this._scrollbarDist = this._scrollbarHolder.width() - scrlWidth;
				}		
				if(!this.settings.scrollToLast) {
					if(this.carouselWidth >= this._totalItemsWidth) {
						this._wasBlocked = true;						
						if(!this.settings.loopItems) {
							this._arrowRightBlocked = true;							
							this.arrowRight.addClass("disabled");	
							this._arrowLeftBlocked = true;
							this.arrowLeft.addClass("disabled");	
						}
						this.setXPos(0);						
						return;
					} else if(this._wasBlocked) {
						this._wasBlocked = false;
						this._arrowRightBlocked = false;	
						this._arrowLeftBlocked = false;
						this.arrowRight.removeClass("disabled");	
						this.arrowLeft.removeClass("disabled");	
					}					
				}
				
				if(!leavePos) {
					var newX = this.endPos = this._getXPos();		
					
					if(newX > 0) {
						newX = 0;
					} else if(newX < this.carouselWidth - this._maxXPos) {
						newX = this.carouselWidth - this._maxXPos;
					}
					this.animateTo(newX, 300, "easeInOutSine");		
				}
				
				
			},
			animateTo:function(pos, speed, easing, bounceAnim, endPos, bounceSpeed, bounceEasing) {		
				
				if(this.settings.onAnimStart !== null) {
					this.settings.onAnimStart.call(this);
				}
				
				
				if(this.autoplay && this.autoplayTimer) {		
					this.wasAutoplayRunning = true;
					this._stopAutoplay();
				}
				this._stopAnimation();
				
				var self = this;
				
				var scrollbarEnabled = this.settings.scrollbar,
					prop = self._xProp,
					pref = self._xPref,
					suf = self._xSuf,				
					from = {containerPos: this.endPos},
					to = {containerPos: pos},
					to2 = {containerPos: endPos},
					endPos = bounceAnim ? endPos : pos,
					dContainer = self._dragContainerStyle;
				
				self._isAnimating = true;
				
				if(scrollbarEnabled) {
					var sbStyle = this._scrollbarStyle;
					var sbAnimateDist = self._maxXPos - self.carouselWidth;
					if(this.settings.scrollbarAutoHide)  { 
						if(!this._scrollbarVisible) {
							this._showScrollbar();
						}
					}
				}
				
				
				
				this._updateDirectionNav(endPos);
				
				function animationComplete() {
					self._isAnimating = false;
			    	self._releaseAutoplay();
			    	if(self.settings.scrollbarAutoHide)  {					
			    		self._hideScrollbar();
					}
			    	
			    	if(self.settings.onAnimComplete !== null) {
						self.settings.onAnimComplete.call(self);
					}
				}
				
				
				
				
				this._decelerationAnim = $(from).animate(to, {
				    duration: speed,
				    easing: easing,
				    step: function() {
				    	if(scrollbarEnabled) {		
				    		sbStyle[prop] = (pref + Math.round((self._scrollbarDist) * (-this.containerPos / sbAnimateDist)) + suf );	  
				    	}
				    	dContainer[prop] = (pref + Math.round(this.containerPos) + suf);					       
				    }, 
				    complete: function() {
				    	if(bounceAnim) {
				    		self._decelerationAnim = $(to).animate(to2, {
							    duration: bounceSpeed,
							    easing: bounceEasing,
							    step: function() {			
							    	if(scrollbarEnabled) {
							    		sbStyle[prop] = (pref + Math.round((self._scrollbarDist) * (-this.containerPos / sbAnimateDist)) + suf );	  
							    	}
							    	dContainer[prop] = (pref + Math.round(this.containerPos) + suf);							        				       
							    },
							    complete: function() {							    	
							    	if(scrollbarEnabled) {
							    		sbStyle[prop] = (pref + Math.round((self._scrollbarDist) * (-to2.containerPos / sbAnimateDist)) + suf );	  
							    	}
							    	dContainer[prop] = (pref + Math.round(to2.containerPos) + suf);								    	
							    	animationComplete();
							    }
				    		});					    		
				    	} else {					    		
				    		if(scrollbarEnabled) {
					    		sbStyle[prop] = (pref + Math.round((self._scrollbarDist) * (-to.containerPos / sbAnimateDist)) + suf );	  					    	
				    		}
				    		dContainer[prop] = (pref + Math.round(to.containerPos) + suf);			    		
				    		animationComplete();				    		
				    	}
				    }
				});	
				
							
			},
			/* Destroy carousel and remove it's element */
			destroy: function() {
				this.stopAutoplay();
				this._itemsWrapper.unbind(this._downEvent);					
				$(document).unbind(this._moveEvent).unbind(this._upEvent);	
				$(window).unbind(this._resizeEvent);
				if(this.settings.keyboardNav) {
					$(document).unbind("keydown.touchcarousel");
				}	
				this.carouselRoot.remove();
			},
			
			
			/* Private methods: */
			_updatePagingNav:function(id) {
				if(this._pagingEnabled) {	
					var newPageId = this._getPageIdFromItemId(id);					
					this._currPageId = newPageId;	
					if(this.settings.pagingNavControls) {
						this._pagingItems.removeClass('current');
						this._pagingItems.eq(newPageId).addClass('current');
					}
					
				}
			},
			_getPageIdFromItemId:function(id) {
				var itemsPerPage = this._itemsPerMove;				
				for(var i = 0; i < this._numPages; i++) {	
					if(id >= i * itemsPerPage  && id < i * itemsPerPage + itemsPerPage) {								
						return i;						
					}					
				}
				if(id < 0) {
					return 0;
				} else if(id >= this._numPages) {
					return this._numPages - 1;
				}
				return false;
			},			
			_enableArrows:function() {
				if(!this.settings.loopItems) {
					if(this._arrowLeftBlocked) {								
						this._arrowLeftBlocked = false;
						this.arrowLeft.removeClass("disabled");				
					} else if(this._arrowRightBlocked) {								
						this._arrowRightBlocked = false;
						this.arrowRight.removeClass("disabled");		
					}
				}
			},
			
			
			_disableLeftArrow:function() {			
				if(!this._arrowLeftBlocked && !this.settings.loopItems) {		
			
					this._arrowLeftBlocked = true;
					this.arrowLeft.addClass("disabled");	
					if(this._arrowRightBlocked) {
						this._arrowRightBlocked = false;
						this.arrowRight.removeClass("disabled");
					}					
				}	
			},
			_disableRightArrow:function() {				
				if(!this._arrowRightBlocked && !this.settings.loopItems) {					
					this._arrowRightBlocked = true;							
					this.arrowRight.addClass("disabled");	
					if(this._arrowLeftBlocked) {
						this._arrowLeftBlocked = false;
						this.arrowLeft.removeClass("disabled");		
					}					
				}	
			},
			_getItemAtPos:function(pos) {
				var self = this;
				pos = -pos;
				
				
				var currItem;				
				for(var i = 0; i < self.numItems; i++) {					
					currItem = self.items[i];
					if(pos >= currItem.posX && pos < currItem.posX + currItem.width) {	
					
						return currItem;					
					}
				}
				return -1;
			},
			

			
			_releaseAutoplay:function() {
				if(this.autoplay) {
					if(this.wasAutoplayRunning) {		
						if(!this._isHovering) {
							this._resumeAutoplay();
						}						
						this.wasAutoplayRunning = false;						
					}
				}
			},
			_hideScrollbar:function() {
				var self = this;
				this._scrollbarVisible = false;
				if(this._scrollbarHideTimeout) {
					clearTimeout(this._scrollbarHideTimeout);
				}				
				this._scrollbarHideTimeout = setTimeout(function(){
					self.scrollbarJQ.animate({opacity:0}, 150, "linear");
				}, 450);
			},
			_showScrollbar:function() {
				this._scrollbarVisible = true;		
				if(this._scrollbarHideTimeout) {
					clearTimeout(this._scrollbarHideTimeout);
				}	
				this.scrollbarJQ.stop().animate({opacity:1}, 150, "linear");
			},
			_stopAnimation:function() {
				if(this._decelerationAnim) {
					this._decelerationAnim.stop();
				}				
			},			
			_resumeAutoplay: function() {
 				if(this.autoplay) {
 					var self = this;
 	 				if(!this.autoplayTimer) {
 	 					this.autoplayTimer = setInterval(function() { 
 	 						if(!self._isDragging && !self._isAnimating) {
 	 							self.next(true);
 	 						}						
 	 					}, this.settings.autoplayDelay);
 	 				}
 				}	
			},	
			_stopAutoplay: function() {
				if(this.autoplayTimer) {					
					clearInterval(this.autoplayTimer);
					this.autoplayTimer = '';
				}								
			},
			_getXPos:function(isScrollbar) {
				var obj = !isScrollbar ? this._dragContainer : this.scrollbarJQ;			
				
				if(!this._useWebkitTransition) {
					return Math.round(obj.position().left);	
				} else {						
					var transform = obj.css("-webkit-transform");
					var explodedMatrix = transform.replace(/^matrix\(/i, '').split(/, |\)$/g);
					return parseInt(explodedMatrix[4], 10);				
				}
			},		
			
			_onDragStart:function(e) {			
				if(!this._isDragging) {		
					
					if(this.autoplay && this.settings.autoplayStopAtAction) {
						this.stopAutoplay();
					}
					
					this._stopAnimation();
					if(this.settings.scrollbarAutoHide) {
						this._showScrollbar();
					}
					
					
					var point;
					if(this.hasTouch) {
						this._lockYAxis = false;
						//parsing touch event
						var currTouches = e.originalEvent.touches;
						if(currTouches && currTouches.length > 0) {
							point = currTouches[0];
						}					
						else {	
							return false;						
						}
					} else {
						point = e;						
						e.preventDefault();						
					}
					
					
					this._setGrabbingCursor();			
					this._isDragging = true;
					var self = this;
					if(this._useWebkitTransition) {
						self._dragContainer.css({'-webkit-transition-duration':'0', '-webkit-transition-property': 'none'});
					}
					$(document).bind(this._moveEvent, function(e) { self._onDragMove(e); });
					$(document).bind(this._upEvent, function(e) { self._onDragRelease(e); });		

				
					this._startPos = this._getXPos();
					
								
					
					this._accelerationX = point.clientX;
					
					
					this._successfullyDragged = false;
					
					this._startTime = (e.timeStamp || (new Date().getTime()));
					
					this._moveDist = 0;
					this._prevMouseX = this._startMouseX = point.clientX;
					this._startMouseY = point.clientY;
				}
			},
			_onDragMove:function(e) {
				var timeStamp = (e.timeStamp || (new Date().getTime()));
				var point;
				if(this.hasTouch) {
					if(this._lockYAxis) {
						return false;
					}				
					
					var touches = e.originalEvent.touches;
					// If touches more then one, so stop sliding and allow browser do default action
					
					if(touches.length > 1) {
						return false;
					}
					
					point = touches[0];	
					// If drag direction on mobile is vertical, so stop sliding and allow browser to scroll				
					if(Math.abs(point.clientY - this._startMouseY) > Math.abs(point.clientX - this._startMouseX) + 3) {
						if(this.settings.lockAxis) {
							this._lockYAxis = true;
						}						
						return false;
					}
				
					e.preventDefault();			
				} else {
					point = e;
					e.preventDefault();		
				}
				
				this._latestDragX = point.clientX;

				// Helps find last direction of drag move
				this._lastDragPosition = this._currentDragPosition;
				var distance = point.clientX - this._prevMouseX;
				if(this._lastDragPosition != distance) {
					this._currentDragPosition = distance;
				}
				
				if(distance != 0)
				{
					
					var dist = this._startPos + this._moveDist;
					
					
					
					if(dist >= 0) {						
						distance = distance / 4;						
						this._disableLeftArrow();
						
					} else if(dist <= this.carouselWidth - this._maxXPos) {	
						this._disableRightArrow();
						distance = distance / 4;
					} else {						
						this._enableArrows();
					}
					
					this._moveDist += distance;
					this.setXPos(dist);				
					
					if(this.settings.scrollbar) {					
						this.setXPos((this._scrollbarDist) * (-dist / (this._maxXPos - this.carouselWidth)), true);
					}
				}		
				
				
				
				
				
				
				this._prevMouseX = point.clientX;
			
				if (timeStamp - this._startTime > 350) {
					this._startTime = timeStamp;
					this._accelerationX = point.clientX;						
				}
				
				if(this.settings.onDragStart !== null) {
					this.settings.onDragStart.call(this);
				}
				
				return false;		
			},
			
			_onDragRelease:function(e) {
				
			
				
				if(this._isDragging) {		
					
					var self = this;
					this._isDragging = false;			
					this._setGrabCursor();
					
				
					
					
					
					this.endPos = this._getXPos();
					
					
					this.isdrag = false;

					$(document).unbind(this._moveEvent).unbind(this._upEvent);					

					if(this.endPos == this._startPos) {						
						this._successfullyDragged = false;
						if(this.settings.scrollbarAutoHide) {
							this._hideScrollbar();
						}
						return;	
					} else {
						this._successfullyDragged = true;
					}
					
					//function animate
					var dist = (this._latestDragX - this._accelerationX);		
					var duration =  Math.max(40, (e.timeStamp || (new Date().getTime())) - this._startTime);
					
					
					
					// For nav speed calculation F=ma :)
					var friction = 0.5,
					    mass = 2,					
						v0 = Math.abs(dist) / duration;	
					
					function getCorrectXPos(pos) {
						
						if(pos > 0) {
							pos = 0;
						} else if(pos < self.carouselWidth - self._maxXPos) {
							pos = self.carouselWidth - self._maxXPos;
						}	
						return pos;
					}
					
					if(!this.settings.snapToItems) {
						// Physics continue
						var timeOffset = 0;
						if(v0 <= 2) {
							friction = this._baseFriction * 3.5;
							timeOffset = 0;
						} else if(v0 > 2 && v0 <= 3) {
							friction = this._baseFriction * 4;
							timeOffset = 200;
						} else if(v0 > 3){
							timeOffset = 300;
							if(v0 > 4) {
								v0 = 4;
								timeOffset = 400;
								friction = this._baseFriction * 6;
							}
							friction = this._baseFriction * 5;
						}							
						
						var S = (v0 * v0 * mass) / (2 * friction);
						S = S * (dist < 0 ? -1 : 1);					
						var t = v0 * mass / friction + timeOffset;	
							
						
						if(this.endPos + S > 0) {	
							if(this.endPos > 0) {
								this.animateTo(0, 800, "easeOutCubic");							
							} else {
								this.animateTo(
										(this.carouselWidth / 10) * ((timeOffset + 200) / 1000), 
										(Math.abs(this.endPos) * 1.1) / v0, 
										"easeOutSine", 
										true, 
										0, 
										400, 
										"easeOutCubic");					
							}
						} else if(this.endPos + S < this.carouselWidth - this._maxXPos) {	
							if(this.endPos < this.carouselWidth - this._maxXPos) {						
								this.animateTo(this.carouselWidth - this._maxXPos, 800, "easeOutCubic");							
							} else {							
								this.animateTo(
										this.carouselWidth - this._maxXPos - (this.carouselWidth / 10) * ((timeOffset + 200) / 1000), 
										(Math.abs(this.carouselWidth - this._maxXPos - this.endPos) * 1.1) / v0, 
										"easeOutSine", 
										true, 
										this.carouselWidth - this._maxXPos, 
										400, 
										"easeOutCubic");	
							}	
						} else {				
							this.animateTo(this.endPos + S, t, "easeOutCubic");
						}		
					} else {						
						if(this.autoplay && this.settings.autoplayStopAtAction) {
							this.stopAutoplay();
						}
						var isNext = Boolean(this._startMouseX - this._prevMouseX > 0);
										
						
						var newX = getCorrectXPos(this._getXPos());
						
											
						var newItemId = this._getItemAtPos(newX).index;						
						
						if(!this._pagingEnabled) {
							newItemId = newItemId + (isNext ?  this._itemsPerMove : ( - this._itemsPerMove + 1));									
						} else {	
							if(isNext) {			
								newX = Math.max(newX - this.carouselWidth - 1, 1 - self._maxXPos);	
								newItemId = this._getItemAtPos(newX).index;
								if(newItemId === undefined) {
									newItemId = this.numItems - 1;
								}
							}							
							
							var newPageId = this._getPageIdFromItemId(newItemId);
														
							newItemId = newPageId * this._itemsPerMove;								
						}
						
						if(isNext) {							
							newItemId = Math.min(newItemId, this.numItems - 1);
						} else {							
							newItemId = Math.max(newItemId, 0);
						}
						
											
						
						var newItem = this.items[newItemId];
					
						this._updatePagingNav(newItemId);
						
						if(newItem) {
							
							newX = getCorrectXPos(-newItem.posX);
							
							var newDist = Math.abs(this.endPos  - newX);
							var newDuration = Math.max((newDist * 1.08) / v0, 150);
							var isFast = Boolean(newDuration < 180);
							var addDist = newDist * 0.08;
							if(isNext) {
								addDist = addDist * -1;
							}
							
							
							this.animateTo(isFast ? (newX + addDist ) : newX,
									Math.min(newDuration, 400),
									"easeOutSine",
									isFast,
									newX,
									300,
									"easeOutCubic");	
							
							
						}
					
					}
					
					if(this.settings.onDragRelease !== null) {
						this.settings.onDragRelease.call(this);
					}
					
				}

				return false;
			},
			_updateDirectionNav:function(pos) {				
				if(pos === undefined) {					
					pos = this._getXPos();
				}				
				if(!this.settings.loopItems) {
					if(pos >= 0) {						
						this._disableLeftArrow();
					} else if(pos <= this.carouselWidth - this._maxXPos) {
						this._disableRightArrow();						
					} else {
						this._enableArrows();
					}
				}
			},
			_setGrabCursor:function() {			
				if(this._grabCursor) {
					this._itemsWrapper.css('cursor', this._grabCursor);
				} else {
					this._itemsWrapper.removeClass('grabbing-cursor');
					this._itemsWrapper.addClass('grab-cursor');	
				}
							
			},
			_setGrabbingCursor:function() {		
				if(this._grabbingCursor) {
					this._itemsWrapper.css('cursor', this._grabbingCursor);
				} else {
					this._itemsWrapper.removeClass('grab-cursor');
					this._itemsWrapper.addClass('grabbing-cursor');	
				}				
			}
	}; /* TouchCarousel.prototype end */

	$.fn.touchCarousel = function(options) {    	
		return this.each(function(){
			var touchCarousel = new TouchCarousel($(this), options);
			$(this).data("touchCarousel", touchCarousel);
		});
	};

	$.fn.touchCarousel.defaults = {  
			itemsPerMove: 1,              // The number of items to move per arrow click.
			
			snapToItems: false,           // Snaps to items, based on itemsPerMove
			pagingNav: false,             // Enable paging nav (snaps to first item of every group, based on itemsPerMove). Overrides snapToItems
			pagingNavControls: true,      // Paging controls (bullets)
			
			
			
			autoplay:false,               // Autoplay enabled          
			autoplayDelay:3000,	          // Delay between transitions	
			autoplayStopAtAction:true,    // Stop autoplay forever when user clicks arrow or does any other action
			
			scrollbar: true,              // Scrollbar enabled
			scrollbarAutoHide: false,     // Scrollbar autohide
			scrollbarTheme: "dark",	      // Scrollbar color. Can be "light" or "dark"	
			
			transitionSpeed: 600,         // Carousel transition speed (next/prev arrows, autoplay)		
			
			directionNav:true,            // Direction (arrow) navigation (true or false)
			directionNavAutoHide:false,   // Direction (arrow) navigation auto hide on hover. (On touch devices arrows are always shown)
			
			loopItems: false,             // Loop items (don't disable arrows on last slide and allow autoplay to loop)
			
			keyboardNav: false,			  // Keyboard arrows navigation
			dragUsingMouse:true,          // Enable drag using mouse	
			
			
			scrollToLast: false,          // Last item ends at start of carousel wrapper	
			

			itemFallbackWidth: 500,       // Default width of the item in pixels. (used if impossible to get item width).
			
			baseMouseFriction: 0.0012,    // Container friction on desktop (higher friction - slower speed)
			baseTouchFriction: 0.0008,    // Container friction on mobile
			lockAxis: true,               // Allow dragging only on one direction
			useWebkit3d: false,           // Enable WebKit 3d transform on desktop devices 
                                          // (on touch devices this option is turned on)
										  // Use it if you have only images, 3d transform makes text blurry
			                                       
			
			onAnimStart: null,            // Callback, triggers before deceleration or transition animation
			onAnimComplete: null,         // Callback, triggers after deceleration or transition animation

			onDragStart:null,             // Callback, triggers on drag start
			onDragRelease: null           // Callback, triggers on drag complete
	};
	
	$.fn.touchCarousel.settings = {};
	
	/* easing types */
	$.extend(jQuery.easing, {
		easeInOutSine: function (x, t, b, c, d) {
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		},
		easeOutSine: function (x, t, b, c, d) {
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeOutCubic: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		}
	});
	
})(jQuery);

// jquery.touchcarousel v1.2
(function(f){function q(b,c){var a,e;this.carouselRoot=f(b);var d=this;this._b=this._a=!1;this._e=this._d=this._c="";this._f;this._g;this._h;this._i;this._j;this._k=0;this.settings=f.extend({},f.fn.touchCarousel.defaults,c);this._l=this.carouselRoot.find(".touchcarousel-container");this._m=this._l[0].style;this._n=this._l.wrap(f('<div class="touchcarousel-wrapper" />')).parent();var g=this._l.find(".touchcarousel-item");this.items=[];this.numItems=g.length;a=navigator.userAgent.toLowerCase();e=/(chrome)[ \/]([\w.]+)/.exec(a)||
/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||0>a.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];a=e[1]||"";e=e[2]||"0";var r={};a&&(r[a]=!0,r.version=e);r.chrome&&(r.webkit=!0);d._o=r;this._p;this._q=!1;this._t=this._s=this._r=0;this._w=this._v=this._u=!1;"ontouchstart"in window?(this.hasTouch=!0,this._c="touchstart.rs",this._d="touchmove.rs",this._e="touchend.rs",this._x=this.settings.baseTouchFriction):(this.hasTouch=
!1,this._x=this.settings.baseMouseFriction,this.settings.dragUsingMouse?(this._c="mousedown.rs",this._d="mousemove.rs",this._e="mouseup.rs",this._y,this._z,a=d._o,a.msie||a.opera?this._y=this._z="move":a.mozilla&&(this._y="-moz-grab",this._z="-moz-grabbing"),this._a1()):this._n.addClass("auto-cursor"));if((this.hasTouch||this.settings.useWebkit3d)&&"WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix)this._l.css({"-webkit-transform-origin":"0 0","-webkit-transform":"translateZ(0)"}),this._w=!0;
this._w?(this._b1="-webkit-transform",this._c1="translate3d(",this._d1="px, 0, 0)"):(this._b1="left",this._c1="",this._d1="px");this.hasTouch&&(this.settings.directionNavAutoHide=!1);this.settings.directionNav||(this._f1=this.settings.loopItems?this._e1=!0:this._e1=!1,this.settings.loopItems=!0);var p,h,n=0;g.eq(this.numItems-1).addClass("last");g.each(function(b){h=f(this);p={};p.item=h;p.index=b;p.posX=n;p.width=h.outerWidth(!0)||d.settings.itemFallbackWidth;n+=p.width;if(this.hasTouch){var a;h.find("a").each(function(){a=
f(this);a.data("tc-href",a.attr("href"));a.data("tc-target",a.attr("target"));a.attr("href","#");a.bind("click",function(a){a.preventDefault();if(d._q)return!1;a=f(this).data("tc-href");var b=f(this).data("tc-target");!b||"_g1"===b.toLowerCase()?window.location.href=a:window.open(a)})})}else h.find("a").bind("click.touchcarousel",function(a){if(d._q)return a.preventDefault(),!1});h.find(".non-draggable").bind(d._c,function(a){d._q=!1;a.stopImmediatePropagation()});d.items.push(p)});this._h1=this._f=
n;this._i1=0<this.settings.itemsPerMove?this.settings.itemsPerMove:1;if(this.settings.pagingNav){if(this._j1=this.settings.snapToItems=!0,this._k1=Math.ceil(this.numItems/this._i1),this._l1=0,this.settings.pagingNavControls){this._m1=f('<div class="tc-paging-container"><div class="tc-paging-centerer"><div class="tc-paging-centerer-inside"></div></div></div>');g=this._m1.find(".tc-paging-centerer-inside");for(e=1;e<=this._k1;e++)a=f('<a class="tc-paging-item" href="#">'+e+"</a>").data("tc-id",e),e===
this._l1+1&&a.addClass("current"),g.append(a);this._n1=g.find(".tc-paging-item").click(function(a){a.preventDefault();d.goTo((f(a.currentTarget).data("tc-id")-1)*d._i1)});this._n.after(this._m1)}}else this._j1=!1;this._l.css({width:n});this.settings.directionNav&&(this._n.after("<a href='#' class='arrow-holder left'><span class='arrow-icon left'></span></a> <a href='#' class='arrow-holder right'><span class='arrow-icon right'></span></a>"),this.arrowLeft=this.carouselRoot.find(".arrow-holder.left"),
this.arrowRight=this.carouselRoot.find(".arrow-holder.right"),1>this.arrowLeft.length||1>this.arrowRight.length?this.settings.directionNav=!1:this.settings.directionNavAutoHide&&(this.arrowLeft.hide(),this.arrowRight.hide(),this.carouselRoot.one("mousemove.arrowshover",function(){d.arrowLeft.fadeIn("fast");d.arrowRight.fadeIn("fast")}),this.carouselRoot.hover(function(){d.arrowLeft.fadeIn("fast");d.arrowRight.fadeIn("fast")},function(){d.arrowLeft.fadeOut("fast");d.arrowRight.fadeOut("fast")})),this._p1(0),
this.settings.directionNav&&(this.arrowRight.click(function(a){a.preventDefault();(d.settings.loopItems&&!d._u||!d._f1)&&d.next()}),this.arrowLeft.click(function(a){a.preventDefault();(d.settings.loopItems&&!d._u||!d._e1)&&d.prev()})));this.carouselWidth;this._q1="onorientationchange"in window?"orientationchange.touchcarousel":"resize.touchcarousel";var l;f(window).bind(this._q1,function(){l&&clearTimeout(l);l=setTimeout(function(){d.updateCarouselSize(!1)},100)});this.settings.scrollbar?(this._r1=
f("<div class='scrollbar-holder'><div class='scrollbar"+("light"===this.settings.scrollbarTheme.toLowerCase()?" light":" dark")+"'></div></div>"),this._r1.appendTo(this.carouselRoot),this.scrollbarJQ=this._r1.find(".scrollbar"),this._s1="",this._t1=this.scrollbarJQ[0].style,this._u1=0,this.settings.scrollbarAutoHide?(this._v1=!1,this.scrollbarJQ.css("opacity",0)):this._v1=!0):this.settings.scrollbarAutoHide=!1;this.updateCarouselSize(!0);this._n.bind(this._c,function(a){d._w1(a)});this.settings.autoplay&&
0<this.settings.autoplayDelay?(this._x1=!1,this.autoplayTimer="",this.wasAutoplayRunning=!0,this.hasTouch||this.carouselRoot.hover(function(){d._x1=!0;d._y1()},function(){d._x1=!1;d._z1()}),this.autoplay=!0,this._a2()):this.autoplay=!1;this.settings.keyboardNav&&f(document).bind("keydown.touchcarousel",function(a){d._u||(37===a.keyCode?d.prev():39===a.keyCode&&d.next())});this.carouselRoot.css("overflow","visible")}q.prototype={goTo:function(b,c){var a=this.items[b];a&&(!c&&(this.autoplay&&this.settings.autoplayStopAtAction)&&
this.stopAutoplay(),this._b2(b),this.endPos=this._c2(),a=-a.posX,0<a?a=0:a<this.carouselWidth-this._h1&&(a=this.carouselWidth-this._h1),this.animateTo(a,this.settings.transitionSpeed,"easeInOutSine"))},next:function(b){var c=this._c2(),a=this._d2(c).index;this._j1?(c=this._l1+1,a=c>this._k1-1?this.settings.loopItems?0:(this._k1-1)*this._i1:c*this._i1):(a+=this._i1,this.settings.loopItems&&c<=this.carouselWidth-this._h1&&(a=0),a>this.numItems-1&&(a=this.numItems-1));this.goTo(a,b)},prev:function(b){var c=
this._c2(),a=this._d2(c).index;this._j1?(c=this._l1-1,a=0>c?this.settings.loopItems?(this._k1-1)*this._i1:0:c*this._i1):(a-=this._i1,0>a&&(a=this.settings.loopItems?0>c?0:this.numItems-1:0));this.goTo(a,b)},getCurrentId:function(){return this._d2(this._c2()).index},setXPos:function(b,c){c?this._t1[this._b1]=this._c1+b+this._d1:this._m[this._b1]=this._c1+b+this._d1},stopAutoplay:function(){this._y1();this.wasAutoplayRunning=this.autoplay=!1},resumeAutoplay:function(){this.autoplay=!0;this.wasAutoplayRunning||
this._z1()},updateCarouselSize:function(b){this.carouselWidth=this.carouselRoot.width();if(this.settings.scrollToLast){var c=0;if(this._j1){var a=this.numItems%this._i1;if(0<a)for(a=this.numItems-a;a<this.numItems;a++)c+=this.items[a].width;else c=this.carouselWidth}else c=this.items[this.numItems-1].width;this._h1=this._f+this.carouselWidth-c}else this._h1=this._f;this.settings.scrollbar&&(c=Math.round(this._r1.width()/(this._h1/this.carouselWidth)),this.scrollbarJQ.css("width",c),this._u1=this._r1.width()-
c);if(!this.settings.scrollToLast){if(this.carouselWidth>=this._f){this._v=!0;this.settings.loopItems||(this._f1=!0,this.arrowRight.addClass("disabled"),this._e1=!0,this.arrowLeft.addClass("disabled"));this.setXPos(0);return}this._v&&(this._e1=this._f1=this._v=!1,this.arrowRight.removeClass("disabled"),this.arrowLeft.removeClass("disabled"))}b||(b=this.endPos=this._c2(),0<b?b=0:b<this.carouselWidth-this._h1&&(b=this.carouselWidth-this._h1),this.animateTo(b,300,"easeInOutSine"))},animateTo:function(b,
c,a,e,d,g,r){function p(){h._b=!1;h._a2();h.settings.scrollbarAutoHide&&h._g2();null!==h.settings.onAnimComplete&&h.settings.onAnimComplete.call(h)}null!==this.settings.onAnimStart&&this.settings.onAnimStart.call(this);this.autoplay&&this.autoplayTimer&&(this.wasAutoplayRunning=!0,this._y1());this._e2();var h=this,n=this.settings.scrollbar,l=h._b1,j=h._c1,m=h._d1,q={containerPos:this.endPos},k={containerPos:b},v={containerPos:d};d=e?d:b;var s=h._m;h._b=!0;if(n){var t=this._t1,u=h._h1-h.carouselWidth;
this.settings.scrollbarAutoHide&&(this._v1||this._f2())}this._p1(d);this._p=f(q).animate(k,{duration:c,easing:a,step:function(){n&&(t[l]=j+Math.round(h._u1*(-this.containerPos/u))+m);s[l]=j+Math.round(this.containerPos)+m},complete:function(){e?h._p=f(k).animate(v,{duration:g,easing:r,step:function(){n&&(t[l]=j+Math.round(h._u1*(-this.containerPos/u))+m);s[l]=j+Math.round(this.containerPos)+m},complete:function(){n&&(t[l]=j+Math.round(h._u1*(-v.containerPos/u))+m);s[l]=j+Math.round(v.containerPos)+
m;p()}}):(n&&(t[l]=j+Math.round(h._u1*(-k.containerPos/u))+m),s[l]=j+Math.round(k.containerPos)+m,p())}})},destroy:function(){this.stopAutoplay();this._n.unbind(this._c);f(document).unbind(this._d).unbind(this._e);f(window).unbind(this._q1);this.settings.keyboardNav&&f(document).unbind("keydown.touchcarousel");this.carouselRoot.remove()},_b2:function(b){this._j1&&(this._l1=b=this._h2(b),this.settings.pagingNavControls&&(this._n1.removeClass("current"),this._n1.eq(b).addClass("current")))},_h2:function(b){for(var c=
this._i1,a=0;a<this._k1;a++)if(b>=a*c&&b<a*c+c)return a;return 0>b?0:b>=this._k1?this._k1-1:!1},_i2:function(){this.settings.loopItems||(this._e1?(this._e1=!1,this.arrowLeft.removeClass("disabled")):this._f1&&(this._f1=!1,this.arrowRight.removeClass("disabled")))},_o1:function(){!this._e1&&!this.settings.loopItems&&(this._e1=!0,this.arrowLeft.addClass("disabled"),this._f1&&(this._f1=!1,this.arrowRight.removeClass("disabled")))},_j2:function(){!this._f1&&!this.settings.loopItems&&(this._f1=!0,this.arrowRight.addClass("disabled"),
this._e1&&(this._e1=!1,this.arrowLeft.removeClass("disabled")))},_d2:function(b){b=-b;for(var c,a=0;a<this.numItems;a++)if(c=this.items[a],b>=c.posX&&b<c.posX+c.width)return c;return-1},_a2:function(){this.autoplay&&this.wasAutoplayRunning&&(this._x1||this._z1(),this.wasAutoplayRunning=!1)},_g2:function(){var b=this;this._v1=!1;this._s1&&clearTimeout(this._s1);this._s1=setTimeout(function(){b.scrollbarJQ.animate({opacity:0},150,"linear")},450)},_f2:function(){this._v1=!0;this._s1&&clearTimeout(this._s1);
this.scrollbarJQ.stop().animate({opacity:1},150,"linear")},_e2:function(){this._p&&this._p.stop()},_z1:function(){if(this.autoplay){var b=this;this.autoplayTimer||(this.autoplayTimer=setInterval(function(){!b._k2&&!b._b&&b.next(!0)},this.settings.autoplayDelay))}},_y1:function(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer="")},_c2:function(b){b=!b?this._l:this.scrollbarJQ;return this._w?(b=b.css("-webkit-transform").replace(/^matrix\(/i,"").split(/, |\)$/g),parseInt(b[4],
10)):Math.round(b.position().left)},_w1:function(b){if(!this._k2){this.autoplay&&this.settings.autoplayStopAtAction&&this.stopAutoplay();this._e2();this.settings.scrollbarAutoHide&&this._f2();var c;if(this.hasTouch)if(this._a=!1,(c=b.originalEvent.touches)&&0<c.length)c=c[0];else return!1;else c=b,b.preventDefault();this._l2();this._k2=!0;var a=this;this._w&&a._l.css({"-webkit-transition-duration":"0","-webkit-transition-property":"none"});f(document).bind(this._d,function(b){a._m2(b)});f(document).bind(this._e,
function(b){a._n2(b)});this._o2=this._c2();this._i=c.clientX;this._q=!1;this._k=b.timeStamp||(new Date).getTime();this._t=0;this._s=this._r=c.clientX;this._p2=c.clientY}},_m2:function(b){var c=b.timeStamp||(new Date).getTime(),a;if(this.hasTouch){if(this._a)return!1;a=b.originalEvent.touches;if(1<a.length)return!1;a=a[0];if(Math.abs(a.clientY-this._p2)>Math.abs(a.clientX-this._r)+3)return this.settings.lockAxis&&(this._a=!0),!1}else a=b;b.preventDefault();this._j=a.clientX;this._q2=this._r2;b=a.clientX-
this._s;this._q2!=b&&(this._r2=b);if(0!=b){var e=this._o2+this._t;0<=e?(b/=4,this._o1()):e<=this.carouselWidth-this._h1?(this._j2(),b/=4):this._i2();this._t+=b;this.setXPos(e);this.settings.scrollbar&&this.setXPos(this._u1*(-e/(this._h1-this.carouselWidth)),!0)}this._s=a.clientX;350<c-this._k&&(this._k=c,this._i=a.clientX);null!==this.settings.onDragStart&&this.settings.onDragStart.call(this);return!1},_n2:function(b){if(this._k2){var c=this;this._k2=!1;this._a1();this.endPos=this._c2();this.isdrag=
!1;f(document).unbind(this._d).unbind(this._e);if(this.endPos==this._o2){this._q=!1;this.settings.scrollbarAutoHide&&this._g2();return}this._q=!0;var a=this._j-this._i;b=Math.max(40,(b.timeStamp||(new Date).getTime())-this._k);var e=0.5;b=Math.abs(a)/b;var d=function(a){0<a?a=0:a<c.carouselWidth-c._h1&&(a=c.carouselWidth-c._h1);return a};if(this.settings.snapToItems){this.autoplay&&this.settings.autoplayStopAtAction&&this.stopAutoplay();var a=Boolean(0<this._r-this._s),e=d(this._c2()),g=this._d2(e).index;
this._j1?(a&&(e=Math.max(e-this.carouselWidth-1,1-c._h1),g=this._d2(e).index,void 0===g&&(g=this.numItems-1)),g=this._h2(g)*this._i1):g+=a?this._i1:-this._i1+1;g=a?Math.min(g,this.numItems-1):Math.max(g,0);e=this.items[g];this._b2(g);e&&(e=d(-e.posX),d=Math.abs(this.endPos-e),b=Math.max(1.08*d/b,150),g=Boolean(180>b),d*=0.08,a&&(d*=-1),this.animateTo(g?e+d:e,Math.min(b,400),"easeOutSine",g,e,300,"easeOutCubic"))}else d=0,2>=b?(e=3.5*this._x,d=0):2<b&&3>=b?(e=4*this._x,d=200):3<b&&(d=300,4<b&&(b=4,
d=400,e=6*this._x),e=5*this._x),a=2*b*b/(2*e)*(0>a?-1:1),e=2*b/e+d,0<this.endPos+a?0<this.endPos?this.animateTo(0,800,"easeOutCubic"):this.animateTo(this.carouselWidth/10*((d+200)/1E3),1.1*Math.abs(this.endPos)/b,"easeOutSine",!0,0,400,"easeOutCubic"):this.endPos+a<this.carouselWidth-this._h1?this.endPos<this.carouselWidth-this._h1?this.animateTo(this.carouselWidth-this._h1,800,"easeOutCubic"):this.animateTo(this.carouselWidth-this._h1-this.carouselWidth/10*((d+200)/1E3),1.1*Math.abs(this.carouselWidth-
this._h1-this.endPos)/b,"easeOutSine",!0,this.carouselWidth-this._h1,400,"easeOutCubic"):this.animateTo(this.endPos+a,e,"easeOutCubic");null!==this.settings.onDragRelease&&this.settings.onDragRelease.call(this)}return!1},_p1:function(b){void 0===b&&(b=this._c2());this.settings.loopItems||(0<=b?this._o1():b<=this.carouselWidth-this._h1?this._j2():this._i2())},_a1:function(){this._y?this._n.css("cursor",this._y):(this._n.removeClass("grabbing-cursor"),this._n.addClass("grab-cursor"))},_l2:function(){this._z?
this._n.css("cursor",this._z):(this._n.removeClass("grab-cursor"),this._n.addClass("grabbing-cursor"))}};f.fn.touchCarousel=function(b){return this.each(function(){var c=new q(f(this),b);f(this).data("touchCarousel",c)})};f.fn.touchCarousel.defaults={itemsPerMove:1,snapToItems:!1,pagingNav:!1,pagingNavControls:!0,autoplay:!1,autoplayDelay:3E3,autoplayStopAtAction:!0,scrollbar:!0,scrollbarAutoHide:!1,scrollbarTheme:"dark",transitionSpeed:600,directionNav:!0,directionNavAutoHide:!1,loopItems:!1,keyboardNav:!1,
dragUsingMouse:!0,scrollToLast:!1,itemFallbackWidth:500,baseMouseFriction:0.0012,baseTouchFriction:8E-4,lockAxis:!0,useWebkit3d:!1,onAnimStart:null,onAnimComplete:null,onDragStart:null,onDragRelease:null};f.fn.touchCarousel.settings={};f.extend(jQuery.easing,{easeInOutSine:function(b,c,a,e,d){return-e/2*(Math.cos(Math.PI*c/d)-1)+a},easeOutSine:function(b,c,a,e,d){return e*Math.sin(c/d*(Math.PI/2))+a},easeOutCubic:function(b,c,a,e,d){return e*((c=c/d-1)*c*c+1)+a}})})(jQuery);


var $ = jQuery.noConflict(); 
var formSubmitted = 'false';

jQuery(document).ready(function($) {	

	$('#formSuccessMessageWrap').hide(0);
	$('.formValidationError').fadeOut(0);
	
	// fields focus function starts
	$('input[type="text"], input[type="password"], textarea').focus(function(){
		if($(this).val() == $(this).attr('data-dummy')){
			$(this).val('');
		};	
	});
	// fields focus function ends
		
	// fields blur function starts
	$('input, textarea').blur(function(){
    	if($(this).val() == ''){		    
			$(this).val($(this).attr('data-dummy'));				
		};			
	});
	// fields blur function ends
		
	// submit form data starts	   
    function submitData(currentForm, formType){     
		formSubmitted = 'true';		
		var formInput = $('#' + currentForm).serialize();		
		$.post($('#' + currentForm).attr('action'),formInput, function(data){			
			$('#' + currentForm).hide();
			$('#formSuccessMessageWrap').fadeIn(500);			
		});

	};
	// submit form data function starts	
	// validate form function starts
	function validateForm(currentForm, formType){		
		// hide any error messages starts
	    $('.formValidationError').hide();
		$('.fieldHasError').removeClass('fieldHasError');
	    // hide any error messages ends	
		$('#' + currentForm + ' .requiredField').each(function(i){		   	 
			if($(this).val() == '' || $(this).val() == $(this).attr('data-dummy')){				
				$(this).val($(this).attr('data-dummy'));	
				$(this).focus();
				$(this).addClass('fieldHasError');
				$('#' + $(this).attr('id') + 'Error').fadeIn(300);
				return false;					   
			};			
			if($(this).hasClass('requiredEmailField')){				  
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				var tempField = '#' + $(this).attr('id');				
				if(!emailReg.test($(tempField).val())) {
					$(tempField).focus();
					$(tempField).addClass('fieldHasError');
					$(tempField + 'Error2').fadeIn(300);
					return false;
				};			
			};			
			if(formSubmitted == 'false' && i == $('#' + currentForm + ' .requiredField').length - 1){
			 	submitData(currentForm, formType);
			};			  
   		});		
	};
	// validate form function ends	
	
	// contact button function starts
	$('#contactSubmitButton').click(function() {	
		validateForm($(this).attr('data-formId'));	
	    return false;		
	});
	// contact button function ends
	
	
	
});
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*//////////////////// Document Ready Function Ends                                                                       */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/


$(document).ready(function(){


	$('.deploy-contact-form').click(function(){	$('.sidebar-form').toggle(300);});
	$('.deploy-subscribe-form').click(function(){$('.sidebar-form2').toggle(300); $('#emailError').hide(200);});
	
	var touching = 0;
	
	$('#submenu-one').click(function(){		$('.submenu-one').toggle(300);		});
	$('#submenu-two').click(function(){		$('.submenu-two').toggle(300);		});
	$('#submenu-three').click(function(){	$('.submenu-three').toggle(300);	});
	$('#submenu-four').click(function(){	$('.submenu-four').toggle(300);		});
	$('#submenu-five').click(function(){	$('.submenu-five').toggle(300);		});
	$('#submenu-six').click(function(){		$('.submenu-six').toggle(300);		});
	$('#submenu-seven').click(function(){	$('.submenu-seven').toggle(300);	});
	$('#submenu-eight').click(function(){	$('.submenu-eight').toggle(300);	});
	
	
	$('.deploy-left-sidebar, .close-sidebar-left, .close-bottom-left, .close-bottom-right, .deploy-subscribe-form, .deploy-contact-form').click(function(){	return false;	})
	

	///////////////////////
	//Deploy Left Sidebar//
	///////////////////////
    $(".content").click(function(){
        $('.sidebar-left').animate({
            left: '-270',
        }, 300, 'easeOutExpo', function () {});
        $('.sidebar-right').animate({
            right: '-280px',
        }, 300, 'easeInOutExpo', function () {});
    });
	
   	$(".padding-item").bind('touchend', function(){
   			closeMenu();
   		
	});
	///////////////////////
	//Deploy Left Sidebar//
	///////////////////////
    $(".deploy-left-sidebar").click(function(){
        toogleMenu();
    });
	
	//////////////////////
	//Close Left Sidebar//
	//////////////////////

    $(".close-sidebar-left, .close-bottom-left").click(function(){        
        $('.sidebar-left').animate({
            left: '-270px',
        }, 300, 'easeInOutExpo', function () {});
        return false;
    });

	////////////////////////
	//Deploy Right Sidebar//
	////////////////////////

    $('.deploy-right-sidebar').click(function () {
    	toogleMenu();
    });
	
	///////////////////////
	//Close Right Sidebar//
	///////////////////////

    $('.close-sidebar-right, .close-bottom-right').click(function () {
  		closeMenu();
    });

	$('.deploy-subscribe').click(function(){
		$('.sidebar-form').hide(200);
		$('body,html').animate({scrollTop:0},500);
        $('.sidebar-right').delay(500).animate({
            right: '-10',
        }, 300, 'easeOutExpo', function () {});		
		$('.sidebar-scroll-right').delay(1000).animate({scrollTop:0},500);
		$('.sidebar-form2').delay(1000).show(200);
		$('#emailError').delay(1000).show();
		return false;
	});
});

var menuisOpen = 0;
function toogleMenu(){
	if (menuisOpen > 0 ){
		closeMenu();
	}else{
		openMenu();
	}
}

function openMenu(){
	menuisOpen =1;
        $('.sidebar-left').animate({
            left: '-10',
        }, 300, 'easeOutExpo', function () {});
        $('.content-box').animate({
            left: '270px',
        }, 300, 'easeOutExpo', function () {});
        $('.header').animate({
            left: '270px',
        }, 300, 'easeOutExpo', function () {});
        return false;
}

function closeMenu(){
	menuisOpen = 0;

	      $('.sidebar-left').animate({
            left: '-280px', 
        }, 300, 'easeInOutExpo', function () {
        		$(".sidebar-scroll-left").animate({ scrollTop: 0 }, 0);
        });
        $('.content-box').animate({
            left: '0px',
        }, 300, 'easeInOutExpo', function () {});
         $('.header').animate({
            left: '0px',
        }, 300, 'easeInOutExpo', function () {});
        return false;
}



function scanQrcode(){
	if (parseFloat(getAndroidVersion()) < 4.2){
		alertNoTitle("This function is best use with Android 4.2 or above.");
	}
	
    window.plugins.barcodeScanner.scan( function(result) {
       var url = result.text;
       if (url.length > 1){
       if (url.toLowerCase().indexOf('http://') > -1 || url.toLowerCase().indexOf('https://')  > -1 ){
        goOpenSafari (result.text);
       setTimeout("goHome()", 500);
       }else{
       setTimeout("reOpenQRCode()", 500);
       }
        }else{
            // Cancelled
       top.changeMainFrame('home.html');
       }
                         
    }, function(error) {
             
    });
}

function getAndroidVersion(ua) {
    var ua = ua || navigator.userAgent; 
    var match = ua.match(/Android\s([0-9\.]*)/);
    return match ? match[1] : false;
}


function goOpenSafari(url){
 	callbrowserplugin( url);
}

function goHKUApp(){
	callNativePlugin('success'); 
}

function reOpenQRCode(){
    alert("Your weblink is invalid");
    scanQrcode();
}

//Ext.ns('Ext.ux.touch');
/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.touch.SwipeTabs
 * <p>A plugin that lets the user swipe between tabs in a TabPanel. No configuration is needed.</p>
 * <p>Sample Usage</p>
 * <pre><code>
 {
     xtype: 'tabpanel',
     ...,
     plugins: [new Ext.ux.touch.SwipeTabs()],
     ...
 }
 * </code></pre>
 */
Ext.define('Ext.ux.touch.SwipeTabs', {
    alias: 'plugin.swipetabs',

    config : {
        // @private
        cmp           : null,

        /**
         * @cfg {Boolean} [allowOverflow=true] Allow swipe to go to the beginning or end
         * @accessor
         */
        allowOverflow : true,

        /**
         * @cfg {Object} [animation={type : "slide"}] Animation object to use. Direction will be set on this animation.
         * @private
         * @accessor
         */
        animation     : {
            type : 'slide'
        }
    },

    constructor : function(config) {
        this.initConfig(config);

        this.callParent([config]);
    },

    init : function(cmp) {
        this.setCmp(cmp);
    },

    updateCmp : function(newCmp, oldCmp) {
        if (oldCmp) {
            oldCmp.element.un('swipe', this.onSwipe);
        }

        if (newCmp) {
            newCmp.element.on('swipe', this.onSwipe, this);
        }
    },

    onSwipe : function(e) {
        var cmp           = this.getCmp(),
            allowOverflow = this.getAllowOverflow(),
            animation     = this.getAnimation(),
            direction     = e.direction,
            activeItem    = cmp.getActiveItem(),
            innerItems    = cmp.getInnerItems(),
            numIdx        = innerItems.length - 1,
            idx           = Ext.Array.indexOf(innerItems, activeItem),
            newIdx        = idx + (direction === 'left' ? 1 : -1),
            newItem;

        if (newIdx < 0) {
            if (allowOverflow) {
                newItem = innerItems[numIdx];
            }
        } else if (newIdx > numIdx) {
            if (allowOverflow) {
                newItem = innerItems[0];
            }
        } else {
            newItem = innerItems[newIdx]
        }

        if (newItem) {
            animation = Ext.apply({}, {
                direction : direction
            }, animation);

            cmp.animateActiveItem(newItem, animation);
        }
    }

});


function scanQrcode(){
    window.plugins.barcodeScanner.scan( function(result) {
                                       var url = result.text;
                                       if (url.length > 1){
                                       if (url.toLowerCase().indexOf('http://') > -1 || url.toLowerCase().indexOf('https://')  > -1 ){
                                        goOpenSafari (result.text);
                                       setTimeout("goHome()", 500);
                                       }else{
                                       setTimeout("reOpenQRCode()", 500);
                                       }
                                        }else{
                                            // Cancelled
                                       top.changeMainFrame('home.html');
                                       }
                         
    }, function(error) {
             
    });
}
function goOpenSafari(url){
    window.plugins.OpenSafari.open( function(result) {
                             }, function(error) {
                             // Cancelled
                        }, url);
    
}

function goHKUApp(){
    window.plugins.echo.echo( function(result) {
        }, function(error) {
            // Cancelled
        }
    );
    
}
function reOpenQRCode(){
    alert("Your weblink is invalid");
    scanQrcode();
}



(function($){$.widget("thomaskahn.smoothDivScroll",{options:{scrollingHotSpotLeftClass:"scrollingHotSpotLeft",scrollingHotSpotRightClass:"scrollingHotSpotRight",scrollableAreaClass:"scrollableArea",scrollWrapperClass:"scrollWrapper",hiddenOnStart:false,getContentOnLoad:{},countOnlyClass:"",startAtElementId:"",hotSpotScrolling:true,hotSpotScrollingStep:15,hotSpotScrollingInterval:10,hotSpotMouseDownSpeedBooster:3,visibleHotSpotBackgrounds:"hover",hotSpotsVisibleTime:5000,easingAfterHotSpotScrolling:true,easingAfterHotSpotScrollingDistance:10,easingAfterHotSpotScrollingDuration:300,easingAfterHotSpotScrollingFunction:"easeOutQuart",mousewheelScrolling:"",mousewheelScrollingStep:70,easingAfterMouseWheelScrolling:true,easingAfterMouseWheelScrollingDuration:300,easingAfterMouseWheelScrollingFunction:"easeOutQuart",manualContinuousScrolling:false,autoScrollingMode:"",autoScrollingDirection:"endlessLoopRight",autoScrollingStep:1,autoScrollingInterval:10,touchScrolling:false,scrollToAnimationDuration:1000,scrollToEasingFunction:"easeOutQuart"},_create:function(){var self=this,o=this.options,el=this.element;el.data("scrollWrapper",el.find("."+o.scrollWrapperClass));el.data("scrollingHotSpotRight",el.find("."+o.scrollingHotSpotRightClass));el.data("scrollingHotSpotLeft",el.find("."+o.scrollingHotSpotLeftClass));el.data("scrollableArea",el.find("."+o.scrollableAreaClass));if(el.data("scrollingHotSpotRight").length>0){el.data("scrollingHotSpotRight").detach()}if(el.data("scrollingHotSpotLeft").length>0){el.data("scrollingHotSpotLeft").detach()}if(el.data("scrollableArea").length===0&&el.data("scrollWrapper").length===0){el.wrapInner("<div class='"+o.scrollableAreaClass+"'>").wrapInner("<div class='"+o.scrollWrapperClass+"'>");el.data("scrollWrapper",el.find("."+o.scrollWrapperClass));el.data("scrollableArea",el.find("."+o.scrollableAreaClass))}else if(el.data("scrollWrapper").length===0){el.wrapInner("<div class='"+o.scrollWrapperClass+"'>");el.data("scrollWrapper",el.find("."+o.scrollWrapperClass))}else if(el.data("scrollableArea").length===0){el.data("scrollWrapper").wrapInner("<div class='"+o.scrollableAreaClass+"'>");el.data("scrollableArea",el.find("."+o.scrollableAreaClass))}if(el.data("scrollingHotSpotRight").length===0){el.prepend("<div class='"+o.scrollingHotSpotRightClass+"'></div>");el.data("scrollingHotSpotRight",el.find("."+o.scrollingHotSpotRightClass))}else{el.prepend(el.data("scrollingHotSpotRight"))}if(el.data("scrollingHotSpotLeft").length===0){el.prepend("<div class='"+o.scrollingHotSpotLeftClass+"'></div>");el.data("scrollingHotSpotLeft",el.find("."+o.scrollingHotSpotLeftClass))}else{el.prepend(el.data("scrollingHotSpotLeft"))}el.data("speedBooster",1);el.data("scrollXPos",0);el.data("hotSpotWidth",el.data("scrollingHotSpotLeft").innerWidth());el.data("scrollableAreaWidth",0);el.data("startingPosition",0);el.data("rightScrollingInterval",null);el.data("leftScrollingInterval",null);el.data("autoScrollingInterval",null);el.data("hideHotSpotBackgroundsInterval",null);el.data("previousScrollLeft",0);el.data("pingPongDirection","right");el.data("getNextElementWidth",true);el.data("swapAt",null);el.data("startAtElementHasNotPassed",true);el.data("swappedElement",null);el.data("originalElements",el.data("scrollableArea").children(o.countOnlyClass));el.data("visible",true);el.data("enabled",true);el.data("scrollableAreaHeight",el.data("scrollableArea").height());el.data("scrollerOffset",el.offset());if(o.touchScrolling&&el.data("enabled")){el.data("scrollWrapper").kinetic({y:false,moved:function(settings){if(o.manualContinuousScrolling){if(el.data("scrollWrapper").scrollLeft()<=0){self._checkContinuousSwapLeft()}else{self._checkContinuousSwapRight()}}},stopped:function(settings){el.data("scrollWrapper").stop(true,false);self.stopAutoScrolling()}})}el.data("scrollingHotSpotRight").bind("mousemove",function(e){if(o.hotSpotScrolling){var x=e.pageX-(this.offsetLeft+el.data("scrollerOffset").left);el.data("scrollXPos",Math.round((x/el.data("hotSpotWidth"))*o.hotSpotScrollingStep));if(el.data("scrollXPos")===Infinity||el.data("scrollXPos")<1){el.data("scrollXPos",1)}}});el.data("scrollingHotSpotRight").bind("mouseover",function(){if(o.hotSpotScrolling){el.data("scrollWrapper").stop(true,false);self.stopAutoScrolling();el.data("rightScrollingInterval",setInterval(function(){if(el.data("scrollXPos")>0&&el.data("enabled")){el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()+(el.data("scrollXPos")*el.data("speedBooster")));if(o.manualContinuousScrolling){self._checkContinuousSwapRight()}self._showHideHotSpots()}},o.hotSpotScrollingInterval));self._trigger("mouseOverRightHotSpot")}});el.data("scrollingHotSpotRight").bind("mouseout",function(){if(o.hotSpotScrolling){clearInterval(el.data("rightScrollingInterval"));el.data("scrollXPos",0);if(o.easingAfterHotSpotScrolling&&el.data("enabled")){el.data("scrollWrapper").animate({scrollLeft:el.data("scrollWrapper").scrollLeft()+o.easingAfterHotSpotScrollingDistance},{duration:o.easingAfterHotSpotScrollingDuration,easing:o.easingAfterHotSpotScrollingFunction})}}});el.data("scrollingHotSpotRight").bind("mousedown",function(){el.data("speedBooster",o.hotSpotMouseDownSpeedBooster)});$("body").bind("mouseup",function(){el.data("speedBooster",1)});el.data("scrollingHotSpotLeft").bind("mousemove",function(e){if(o.hotSpotScrolling){var x=((this.offsetLeft+el.data("scrollerOffset").left+el.data("hotSpotWidth"))-e.pageX);el.data("scrollXPos",Math.round((x/el.data("hotSpotWidth"))*o.hotSpotScrollingStep));if(el.data("scrollXPos")===Infinity||el.data("scrollXPos")<1){el.data("scrollXPos",1)}}});el.data("scrollingHotSpotLeft").bind("mouseover",function(){if(o.hotSpotScrolling){el.data("scrollWrapper").stop(true,false);self.stopAutoScrolling();el.data("leftScrollingInterval",setInterval(function(){if(el.data("scrollXPos")>0&&el.data("enabled")){el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()-(el.data("scrollXPos")*el.data("speedBooster")));if(o.manualContinuousScrolling){self._checkContinuousSwapLeft()}self._showHideHotSpots()}},o.hotSpotScrollingInterval));self._trigger("mouseOverLeftHotSpot")}});el.data("scrollingHotSpotLeft").bind("mouseout",function(){if(o.hotSpotScrolling){clearInterval(el.data("leftScrollingInterval"));el.data("scrollXPos",0);if(o.easingAfterHotSpotScrolling&&el.data("enabled")){el.data("scrollWrapper").animate({scrollLeft:el.data("scrollWrapper").scrollLeft()-o.easingAfterHotSpotScrollingDistance},{duration:o.easingAfterHotSpotScrollingDuration,easing:o.easingAfterHotSpotScrollingFunction})}}});el.data("scrollingHotSpotLeft").bind("mousedown",function(){el.data("speedBooster",o.hotSpotMouseDownSpeedBooster)});el.data("scrollableArea").mousewheel(function(event,delta,deltaX,deltaY){if(el.data("enabled")&&o.mousewheelScrolling.length>0){var pixels;if(o.mousewheelScrolling==="vertical"&&deltaY!==0){self.stopAutoScrolling();event.preventDefault();pixels=Math.round((o.mousewheelScrollingStep*deltaY)*-1);self.move(pixels)}else if(o.mousewheelScrolling==="horizontal"&&deltaX!==0){self.stopAutoScrolling();event.preventDefault();pixels=Math.round((o.mousewheelScrollingStep*deltaX)*-1);self.move(pixels)}else if(o.mousewheelScrolling==="allDirections"){self.stopAutoScrolling();event.preventDefault();pixels=Math.round((o.mousewheelScrollingStep*delta)*-1);self.move(pixels)}}});if(o.mousewheelScrolling){el.data("scrollingHotSpotLeft").add(el.data("scrollingHotSpotRight")).mousewheel(function(event){event.preventDefault()})}$(window).bind("resize",function(){self._showHideHotSpots();self._trigger("windowResized")});if(!(jQuery.isEmptyObject(o.getContentOnLoad))){self[o.getContentOnLoad.method](o.getContentOnLoad.content,o.getContentOnLoad.manipulationMethod,o.getContentOnLoad.addWhere,o.getContentOnLoad.filterTag)}if(o.hiddenOnStart){self.hide()}$(window).load(function(){if(!(o.hiddenOnStart)){self.recalculateScrollableArea()}if((o.autoScrollingMode.length>0)&&!(o.hiddenOnStart)){self.startAutoScrolling()}if(o.autoScrollingMode!=="always"){switch(o.visibleHotSpotBackgrounds){case"always":self.showHotSpotBackgrounds();break;case"onStart":self.showHotSpotBackgrounds();el.data("hideHotSpotBackgroundsInterval",setTimeout(function(){self.hideHotSpotBackgrounds(250)},o.hotSpotsVisibleTime));break;case"hover":el.mouseenter(function(event){if(o.hotSpotScrolling){event.stopPropagation();self.showHotSpotBackgrounds(250)}}).mouseleave(function(event){if(o.hotSpotScrolling){event.stopPropagation();self.hideHotSpotBackgrounds(250)}});break;default:break}}self._showHideHotSpots();self._trigger("setupComplete")})},_setOption:function(key,value){var self=this,o=this.options,el=this.element;o[key]=value;if(key==="hotSpotScrolling"){if(value===true){self._showHideHotSpots()}else{el.data("scrollingHotSpotLeft").hide();el.data("scrollingHotSpotRight").hide()}}else if(key==="autoScrollingStep"||key==="easingAfterHotSpotScrollingDistance"||key==="easingAfterHotSpotScrollingDuration"||key==="easingAfterMouseWheelScrollingDuration"){o[key]=parseInt(value,10)}else if(key==="autoScrollingInterval"){o[key]=parseInt(value,10);self.startAutoScrolling()}},showHotSpotBackgrounds:function(fadeSpeed){var self=this,el=this.element,o=this.option;if(fadeSpeed!==undefined){el.data("scrollingHotSpotLeft").addClass("scrollingHotSpotLeftVisible");el.data("scrollingHotSpotRight").addClass("scrollingHotSpotRightVisible");el.data("scrollingHotSpotLeft").add(el.data("scrollingHotSpotRight")).fadeTo(fadeSpeed,0.35)}else{el.data("scrollingHotSpotLeft").addClass("scrollingHotSpotLeftVisible");el.data("scrollingHotSpotLeft").removeAttr("style");el.data("scrollingHotSpotRight").addClass("scrollingHotSpotRightVisible");el.data("scrollingHotSpotRight").removeAttr("style")}self._showHideHotSpots()},hideHotSpotBackgrounds:function(fadeSpeed){var el=this.element,o=this.option;if(fadeSpeed!==undefined){el.data("scrollingHotSpotLeft").fadeTo(fadeSpeed,0.0,function(){el.data("scrollingHotSpotLeft").removeClass("scrollingHotSpotLeftVisible")});el.data("scrollingHotSpotRight").fadeTo(fadeSpeed,0.0,function(){el.data("scrollingHotSpotRight").removeClass("scrollingHotSpotRightVisible")})}else{el.data("scrollingHotSpotLeft").removeClass("scrollingHotSpotLeftVisible").removeAttr("style");el.data("scrollingHotSpotRight").removeClass("scrollingHotSpotRightVisible").removeAttr("style")}},_showHideHotSpots:function(){var self=this,el=this.element,o=this.options;if(!(o.hotSpotScrolling)){el.data("scrollingHotSpotLeft").hide();el.data("scrollingHotSpotRight").hide()}else{if(o.manualContinuousScrolling&&o.hotSpotScrolling&&o.autoScrollingMode!=="always"){el.data("scrollingHotSpotLeft").show();el.data("scrollingHotSpotRight").show()}else if(o.autoScrollingMode!=="always"&&o.hotSpotScrolling){if(el.data("scrollableAreaWidth")<=(el.data("scrollWrapper").innerWidth())){el.data("scrollingHotSpotLeft").hide();el.data("scrollingHotSpotRight").hide()}else if(el.data("scrollWrapper").scrollLeft()===0){el.data("scrollingHotSpotLeft").hide();el.data("scrollingHotSpotRight").show();self._trigger("scrollerLeftLimitReached");clearInterval(el.data("leftScrollingInterval"));el.data("leftScrollingInterval",null)}else if(el.data("scrollableAreaWidth")<=(el.data("scrollWrapper").innerWidth()+el.data("scrollWrapper").scrollLeft())){el.data("scrollingHotSpotLeft").show();el.data("scrollingHotSpotRight").hide();self._trigger("scrollerRightLimitReached");clearInterval(el.data("rightScrollingInterval"));el.data("rightScrollingInterval",null)}else{el.data("scrollingHotSpotLeft").show();el.data("scrollingHotSpotRight").show()}}else{el.data("scrollingHotSpotLeft").hide();el.data("scrollingHotSpotRight").hide()}}},_setElementScrollPosition:function(method,element){var el=this.element,o=this.options,tempScrollPosition=0;switch(method){case"first":el.data("scrollXPos",0);return true;case"start":if(o.startAtElementId!==""){if(el.data("scrollableArea").has("#"+o.startAtElementId)){tempScrollPosition=$("#"+o.startAtElementId).position().left;el.data("scrollXPos",tempScrollPosition);return true}}return false;case"last":el.data("scrollXPos",(el.data("scrollableAreaWidth")-el.data("scrollWrapper").innerWidth()));return true;case"number":if(!(isNaN(element))){tempScrollPosition=el.data("scrollableArea").children(o.countOnlyClass).eq(element-1).position().left;el.data("scrollXPos",tempScrollPosition);return true}return false;case"id":if(element.length>0){if(el.data("scrollableArea").has("#"+element)){tempScrollPosition=$("#"+element).position().left;el.data("scrollXPos",tempScrollPosition);return true}}return false;default:return false}},jumpToElement:function(jumpTo,element){var self=this,el=this.element;if(el.data("enabled")){if(self._setElementScrollPosition(jumpTo,element)){el.data("scrollWrapper").scrollLeft(el.data("scrollXPos"));self._showHideHotSpots();switch(jumpTo){case"first":self._trigger("jumpedToFirstElement");break;case"start":self._trigger("jumpedToStartElement");break;case"last":self._trigger("jumpedToLastElement");break;case"number":self._trigger("jumpedToElementNumber",null,{"elementNumber":element});break;case"id":self._trigger("jumpedToElementId",null,{"elementId":element});break;default:break}}}},scrollToElement:function(scrollTo,element){var self=this,el=this.element,o=this.options,autoscrollingWasRunning=false;if(el.data("enabled")){if(self._setElementScrollPosition(scrollTo,element)){if(el.data("autoScrollingInterval")!==null){self.stopAutoScrolling();autoscrollingWasRunning=true}el.data("scrollWrapper").stop(true,false);el.data("scrollWrapper").animate({scrollLeft:el.data("scrollXPos")},{duration:o.scrollToAnimationDuration,easing:o.scrollToEasingFunction,complete:function(){if(autoscrollingWasRunning){self.startAutoScrolling()}self._showHideHotSpots();switch(scrollTo){case"first":self._trigger("scrolledToFirstElement");break;case"start":self._trigger("scrolledToStartElement");break;case"last":self._trigger("scrolledToLastElement");break;case"number":self._trigger("scrolledToElementNumber",null,{"elementNumber":element});break;case"id":self._trigger("scrolledToElementId",null,{"elementId":element});break;default:break}}})}}},move:function(pixels){var self=this,el=this.element,o=this.options;el.data("scrollWrapper").stop(true,true);if((pixels<0&&el.data("scrollWrapper").scrollLeft()>0)||(pixels>0&&el.data("scrollableAreaWidth")>(el.data("scrollWrapper").innerWidth()+el.data("scrollWrapper").scrollLeft()))){if(o.easingAfterMouseWheelScrolling){el.data("scrollWrapper").animate({scrollLeft:el.data("scrollWrapper").scrollLeft()+pixels},{duration:o.easingAfterMouseWheelScrollingDuration,easing:o.easingAfterMouseWheelFunction,complete:function(){self._showHideHotSpots();if(o.manualContinuousScrolling){if(pixels>0){self._checkContinuousSwapRight()}else{self._checkContinuousSwapLeft()}}}})}else{el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()+pixels);self._showHideHotSpots();if(o.manualContinuousScrolling){if(pixels>0){self._checkContinuousSwapRight()}else{self._checkContinuousSwapLeft()}}}}},getFlickrContent:function(content,manipulationMethod){var self=this,el=this.element;$.getJSON(content,function(data){var flickrImageSizes=[{size:"small square",pixels:75,letter:"_s"},{size:"thumbnail",pixels:100,letter:"_t"},{size:"small",pixels:240,letter:"_m"},{size:"medium",pixels:500,letter:""},{size:"medium 640",pixels:640,letter:"_z"},{size:"large",pixels:1024,letter:"_b"}];var loadedFlickrImages=[];var imageIdStringBuffer=[];var startingIndex;var numberOfFlickrItems=data.items.length;var loadedFlickrImagesCounter=0;if(el.data("scrollableAreaHeight")<=75){startingIndex=0}else if(el.data("scrollableAreaHeight")<=100){startingIndex=1}else if(el.data("scrollableAreaHeight")<=240){startingIndex=2}else if(el.data("scrollableAreaHeight")<=500){startingIndex=3}else if(el.data("scrollableAreaHeight")<=640){startingIndex=4}else{startingIndex=5}$.each(data.items,function(index,item){loadFlickrImage(item,startingIndex)});function loadFlickrImage(item,sizeIndex){var path=item.media.m;var imgSrc=path.replace("_m",flickrImageSizes[sizeIndex].letter);var tempImg=$("<img />").attr("src",imgSrc);tempImg.load(function(){if(this.height<el.data("scrollableAreaHeight")){if((sizeIndex+1)<flickrImageSizes.length){loadFlickrImage(item,sizeIndex+1)}else{addImageToLoadedImages(this)}}else{addImageToLoadedImages(this)}if(loadedFlickrImagesCounter===numberOfFlickrItems){switch(manipulationMethod){case"addFirst":el.data("scrollableArea").children(":first").before(loadedFlickrImages);break;case"addLast":el.data("scrollableArea").children(":last").after(loadedFlickrImages);break;default:el.data("scrollableArea").html(loadedFlickrImages);break}self.recalculateScrollableArea();self._showHideHotSpots();self._trigger("addedFlickrContent",null,{"addedElementIds":imageIdStringBuffer})}})}function addImageToLoadedImages(imageObj){var widthScalingFactor=el.data("scrollableAreaHeight")/imageObj.height;var tempWidth=Math.round(imageObj.width*widthScalingFactor);var tempIdArr=$(imageObj).attr("src").split("/");var lastElemIndex=(tempIdArr.length-1);tempIdArr=tempIdArr[lastElemIndex].split(".");$(imageObj).attr("id",tempIdArr[0]);$(imageObj).css({"height":el.data("scrollableAreaHeight"),"width":tempWidth});imageIdStringBuffer.push(tempIdArr[0]);loadedFlickrImages.push(imageObj);loadedFlickrImagesCounter++}})},getAjaxContent:function(content,manipulationMethod,filterTag){var self=this,el=this.element;$.ajaxSetup({cache:false});$.get(content,function(data){var filteredContent;if(filterTag!==undefined){if(filterTag.length>0){filteredContent=$("<div>").html(data).find(filterTag)}else{filteredContent=content}}else{filteredContent=data}switch(manipulationMethod){case"addFirst":el.data("scrollableArea").children(":first").before(filteredContent);break;case"addLast":el.data("scrollableArea").children(":last").after(filteredContent);break;default:el.data("scrollableArea").html(filteredContent);break}self.recalculateScrollableArea();self._showHideHotSpots();self._trigger("addedAjaxContent")})},getHtmlContent:function(content,manipulationMethod,filterTag){var self=this,el=this.element;var filteredContent;if(filterTag!==undefined){if(filterTag.length>0){filteredContent=$("<div>").html(content).find(filterTag)}else{filteredContent=content}}else{filteredContent=content}switch(manipulationMethod){case"addFirst":el.data("scrollableArea").children(":first").before(filteredContent);break;case"addLast":el.data("scrollableArea").children(":last").after(filteredContent);break;default:el.data("scrollableArea").html(filteredContent);break}self.recalculateScrollableArea();self._showHideHotSpots();self._trigger("addedHtmlContent")},recalculateScrollableArea:function(){var tempScrollableAreaWidth=0,foundStartAtElement=false,o=this.options,el=this.element;el.data("scrollableArea").children(o.countOnlyClass).each(function(){if((o.startAtElementId.length>0)&&(($(this).attr("id"))===o.startAtElementId)){el.data("startingPosition",tempScrollableAreaWidth);foundStartAtElement=true}tempScrollableAreaWidth=tempScrollableAreaWidth+$(this).outerWidth(true)});if(!(foundStartAtElement)){el.data("startAtElementId","")}el.data("scrollableAreaWidth",tempScrollableAreaWidth);el.data("scrollableArea").width(el.data("scrollableAreaWidth"));el.data("scrollWrapper").scrollLeft(el.data("startingPosition"));el.data("scrollXPos",el.data("startingPosition"))},getScrollerOffset:function(){var el=this.element;return el.data("scrollWrapper").scrollLeft()},stopAutoScrolling:function(){var self=this,el=this.element;if(el.data("autoScrollingInterval")!==null){clearInterval(el.data("autoScrollingInterval"));el.data("autoScrollingInterval",null);self._showHideHotSpots();self._trigger("autoScrollingStopped")}},startAutoScrolling:function(){var self=this,el=this.element,o=this.options;if(el.data("enabled")){self._showHideHotSpots();clearInterval(el.data("autoScrollingInterval"));el.data("autoScrollingInterval",null);self._trigger("autoScrollingStarted");el.data("autoScrollingInterval",setInterval(function(){if(!(el.data("visible"))||(el.data("scrollableAreaWidth")<=(el.data("scrollWrapper").innerWidth()))){clearInterval(el.data("autoScrollingInterval"));el.data("autoScrollingInterval",null)}else{el.data("previousScrollLeft",el.data("scrollWrapper").scrollLeft());switch(o.autoScrollingDirection){case"right":el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()+o.autoScrollingStep);if(el.data("previousScrollLeft")===el.data("scrollWrapper").scrollLeft()){self._trigger("autoScrollingRightLimitReached");clearInterval(el.data("autoScrollingInterval"));el.data("autoScrollingInterval",null);self._trigger("autoScrollingIntervalStopped")}break;case"left":el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()-o.autoScrollingStep);if(el.data("previousScrollLeft")===el.data("scrollWrapper").scrollLeft()){self._trigger("autoScrollingLeftLimitReached");clearInterval(el.data("autoScrollingInterval"));el.data("autoScrollingInterval",null);self._trigger("autoScrollingIntervalStopped")}break;case"backAndForth":if(el.data("pingPongDirection")==="right"){el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()+(o.autoScrollingStep))}else{el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()-(o.autoScrollingStep))}if(el.data("previousScrollLeft")===el.data("scrollWrapper").scrollLeft()){if(el.data("pingPongDirection")==="right"){el.data("pingPongDirection","left");self._trigger("autoScrollingRightLimitReached")}else{el.data("pingPongDirection","right");self._trigger("autoScrollingLeftLimitReached")}}break;case"endlessLoopRight":el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()+o.autoScrollingStep);self._checkContinuousSwapRight();break;case"endlessLoopLeft":el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()-o.autoScrollingStep);self._checkContinuousSwapLeft();break;default:break}}},o.autoScrollingInterval))}},_checkContinuousSwapRight:function(){var el=this.element,o=this.options;if(el.data("getNextElementWidth")){if((o.startAtElementId.length>0)&&(el.data("startAtElementHasNotPassed"))){el.data("swapAt",$("#"+o.startAtElementId).outerWidth(true));el.data("startAtElementHasNotPassed",false)}else{el.data("swapAt",el.data("scrollableArea").children(":first").outerWidth(true))}el.data("getNextElementWidth",false)}if(el.data("swapAt")<=el.data("scrollWrapper").scrollLeft()){el.data("swappedElement",el.data("scrollableArea").children(":first").detach());el.data("scrollableArea").append(el.data("swappedElement"));var wrapperLeft=el.data("scrollWrapper").scrollLeft();el.data("scrollWrapper").scrollLeft(wrapperLeft-el.data("swappedElement").outerWidth(true));el.data("getNextElementWidth",true)}},_checkContinuousSwapLeft:function(){var el=this.element,o=this.options;if(el.data("getNextElementWidth")){if((o.startAtElementId.length>0)&&(el.data("startAtElementHasNotPassed"))){el.data("swapAt",$("#"+o.startAtElementId).outerWidth(true));el.data("startAtElementHasNotPassed",false)}else{el.data("swapAt",el.data("scrollableArea").children(":first").outerWidth(true))}el.data("getNextElementWidth",false)}if(el.data("scrollWrapper").scrollLeft()===0){el.data("swappedElement",el.data("scrollableArea").children(":last").detach());el.data("scrollableArea").prepend(el.data("swappedElement"));el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft()+el.data("swappedElement").outerWidth(true));el.data("getNextElementWidth",true)}},restoreOriginalElements:function(){var self=this,el=this.element;el.data("scrollableArea").html(el.data("originalElements"));self.recalculateScrollableArea();self.jumpToElement("first")},show:function(){var el=this.element;el.data("visible",true);el.show()},hide:function(){var el=this.element;el.data("visible",false);el.hide()},enable:function(){var el=this.element;if(this.options.touchScrolling){el.data("scrollWrapper").kinetic('attach')}el.data("enabled",true)},disable:function(){var self=this,el=this.element;self.stopAutoScrolling();clearInterval(el.data("rightScrollingInterval"));clearInterval(el.data("leftScrollingInterval"));clearInterval(el.data("hideHotSpotBackgroundsInterval"));if(this.options.touchScrolling){el.data("scrollWrapper").kinetic('detach')}el.data("enabled",false)},destroy:function(){var self=this,el=this.element;self.stopAutoScrolling();clearInterval(el.data("rightScrollingInterval"));clearInterval(el.data("leftScrollingInterval"));clearInterval(el.data("hideHotSpotBackgroundsInterval"));el.data("scrollingHotSpotRight").unbind("mouseover");el.data("scrollingHotSpotRight").unbind("mouseout");el.data("scrollingHotSpotRight").unbind("mousedown");el.data("scrollingHotSpotLeft").unbind("mouseover");el.data("scrollingHotSpotLeft").unbind("mouseout");el.data("scrollingHotSpotLeft").unbind("mousedown");el.unbind("mousenter");el.unbind("mouseleave");el.data("scrollingHotSpotRight").remove();el.data("scrollingHotSpotLeft").remove();el.data("scrollableArea").remove();el.data("scrollWrapper").remove();el.html(el.data("originalElements"));$.Widget.prototype.destroy.apply(this,arguments)}})})(jQuery);


jQuery(function() {
  jQuery('.success-subscribe').hide();
  jQuery('.error').hide();
  jQuery('#emailError').hide();
  jQuery('#emailError2').hide();
  jQuery(".contactButton").click(function() {
		// validate and process form
		// first hide any error messages
    jQuery('.error').hide();
		
	  var name = jQuery("input#contactName").val();
		if (name == "" || name =="John Doe?") {
      jQuery("span#nameError").hide();
      jQuery("input#contactName").focus();
      return false;
    }
	  var email = jQuery("input#contactEmail").val();
	  if (email == "" || email == "johndoe@domain.com") {
	  jQuery('#emailError').show();
	  jQuery('#emailError2').hide();
      jQuery("input#contactEmail").focus();
      return false;
    }
	
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if(!emailReg.test(email)) {
	  jQuery('#emailError').hide();
	  jQuery('#emailError2').show();
      jQuery("input#contactEmail").focus();
      return false;
	}
	
	  var msg = jQuery("textarea#contactMessage").val();
	  if (msg == "") {
	  jQuery("span#messageError").hide();
	  jQuery("textarea#contactMessage").focus();
	  return false;
    }
		
		var dataString = 'name='+ name + '&email=' + email + '&msg=' + msg;
		//alert (dataString);return false;
		
	  jQuery.ajax({
      type: "POST",
      url: "php/subscribe.php",
      data: dataString,
      success: function() {
        //jQuery('#modalForm').html("<div style='height:300px;'></div>");
		jQuery('#contact').fadeOut(0)
        jQuery('.success-subscribe').fadeIn()
        
      }
     });
    return false;
	});
});



/*
 * TouchCarousel  v1.1
 *
 * Copyright 2011, Dmitry Semenov, http://dimsemenov.com
 * 
 */
(function($) {
	function TouchCarousel(element, options) {	
		this.carouselRoot = $(element);
		
		var self = this;			
		this._lockYAxis = false;
		this._isAnimating = false;		
		
		this._downEvent = "";
		this._moveEvent = "";
		this._upEvent = "";
		
		this._totalItemsWidth;
		this._itemWidths;
		
		this._startAccelerationX;
		this._accelerationX;
		this._latestDragX;
		
		this._startTime = 0;
		
		this.settings = $.extend({}, $.fn.touchCarousel.defaults, options);		
		
		this._dragContainer = this.carouselRoot.find(".touchcarousel-container");	
		
		// animate directly style for better performance
		this._dragContainerStyle = this._dragContainer[0].style;
		
		this._itemsWrapper = this._dragContainer.wrap($('<div class="touchcarousel-wrapper" />')).parent();		
		var itemsJQ = this._dragContainer.find(".touchcarousel-item");
		
		/* Array item structure: 
		 * {
		 * 		item: jQuery item object
		 * 		index: item index
		 * 		posX: item X position
		 *      width: item width
		 * }
		 * 
		 * */
		this.items = [];
		this.numItems = itemsJQ.length;
		
		
		var ua = navigator.userAgent.toLowerCase();
	    var uaMatch = function( ua ) {
		    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
		        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
		        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
		        /(msie) ([\w.]+)/.exec( ua ) ||
		        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		        [];

		    return {
		        browser: match[ 1 ] || "",
		        version: match[ 2 ] || "0"
		    };
		};
		var matched = uaMatch( ua );
		var br = {};
		if ( matched.browser ) {
		    br[ matched.browser ] = true;
		    br.version = matched.version;
		}
		if(br.chrome) { br.webkit = true; };
		self._browser = br;

		this._decelerationAnim;
		this._successfullyDragged = false;
		this._startMouseX = 0;
		this._prevMouseX = 0;
		this._moveDist = 0;
		this._blockClickEvents = false;
		this._wasBlocked = false;
		
		this._useWebkitTransition = false;
		
		
		if('ontouchstart' in window) {
			this.hasTouch = true;
			this._downEvent = 'touchstart.rs';
			this._moveEvent = 'touchmove.rs';
			this._upEvent = 'touchend.rs';
			this._baseFriction = this.settings.baseTouchFriction;
		} else {
			this.hasTouch = false;
			this._baseFriction = this.settings.baseMouseFriction;
			if(this.settings.dragUsingMouse) {
				this._downEvent = 'mousedown.rs';
				this._moveEvent = 'mousemove.rs';
				this._upEvent = 'mouseup.rs';
				
				//setup cursor
				this._grabCursor;
				this._grabbingCursor;
				var ua = self._browser;
				if (ua.msie || ua.opera) {
					this._grabCursor = this._grabbingCursor = "move";
				} else if(ua.mozilla) {
					this._grabCursor = "-moz-grab";
					this._grabbingCursor = "-moz-grabbing";
				} 
				this._setGrabCursor();
			} else {
				// set cursor to auto if drag navigation is disabled
				this._itemsWrapper.addClass('auto-cursor');
			}
			
		}	
		if(this.hasTouch || this.settings.useWebkit3d) {
			// check if browser supports translate3d()
			if(('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix())) {	
				this._dragContainer.css({'-webkit-transform-origin':'0 0', '-webkit-transform': 'translateZ(0)'});			
				this._useWebkitTransition = true;
			}
		}
		
		
		if(this._useWebkitTransition) {
			this._xProp = '-webkit-transform';
			this._xPref = 'translate3d(';
			this._xSuf = 'px, 0, 0)';
		} else {
			this._xProp = 'left';
			this._xPref = '';
			this._xSuf = 'px';
		}
		
		if(this.hasTouch) {
			this.settings.directionNavAutoHide = false;			
		}		
		
		if(!this.settings.directionNav) {
			if(this.settings.loopItems) {
				this._arrowLeftBlocked = true;
				this._arrowRightBlocked = true;
			} else {
				this._arrowLeftBlocked = false;
				this._arrowRightBlocked = false;
			}
			this.settings.loopItems = true;
		}
		
		var	itemObj,
			jqItem,
			dataSRC,
			slideImg,
			currPosX = 0;
		
		
		
		itemsJQ.eq(this.numItems - 1).addClass('last');
		
		// parse items
		itemsJQ.each(function(index) {
			jqItem = $(this);			
			itemObj = {};
			itemObj.item = jqItem;
			itemObj.index = index;
			itemObj.posX = currPosX;
			itemObj.width = (jqItem.outerWidth(true) || self.settings.itemFallbackWidth);			
			currPosX += itemObj.width;
			
			// block all links inside slides when dragging
			if(!this.hasTouch) {
				jqItem.find('a').bind('click.touchcarousel', function(e) {					
					if(self._successfullyDragged) {						
						e.preventDefault();						
						return false;
					}						
				});
			} else {
				// Fix preventing link bug on some touch devices
				var jqLinks = jqItem.find('a');
				var jqLink;
				jqLinks.each(function() {
					jqLink = $(this);
					jqLink.data('tc-href', jqLink.attr('href'));
					jqLink.data('tc-target', jqLink.attr('target'));
					jqLink.attr('href', '#');
					jqLink.bind('click', function(e) {							
						e.preventDefault();	
						if(self._successfullyDragged) {							
							return false;
						} else {
							var linkData = $(this).data('tc-href');							
							var linkTarget = $(this).data('tc-target');								
							if(!linkTarget || linkTarget.toLowerCase() === '_self') {
								window.location.href = linkData;
							} else {
								window.open(linkData);
							}							
						}					
					});
				});		
			}				
			
			// prevent dragging on all elements that have 'non-draggable' class			
			jqItem.find('.non-draggable').bind(self._downEvent, function(e) {					
				self._successfullyDragged = false;	
				e.stopImmediatePropagation();
			});
			
			self.items.push(itemObj);
		});
		
		
		this._maxXPos = this._totalItemsWidth = currPosX;		
		
		
		if(this.settings.itemsPerMove > 0) {
			this._itemsPerMove = this.settings.itemsPerMove;
		} else {
			this._itemsPerMove = 1;			
		}
		
		// Setup paging
		if(this.settings.pagingNav) {
			this.settings.snapToItems = true;
			this._pagingEnabled = true;
			this._numPages = Math.ceil(this.numItems / this._itemsPerMove);
			this._currPageId = 0;
			
			if(this.settings.pagingNavControls) {
				this._pagingNavContainer = $('<div class="tc-paging-container"><div class="tc-paging-centerer"><div class="tc-paging-centerer-inside"></div></div></div>');
				var pagingInside = this._pagingNavContainer.find('.tc-paging-centerer-inside');
				var pagingItem;
				
				for(var i = 1; i <= this._numPages; i++ ) {					
					pagingItem = $('<a class="tc-paging-item" href="#">' + i + '</a>').data('tc-id',i);					
					if(i === this._currPageId + 1) {
						pagingItem.addClass('current');
					}
					pagingInside.append(pagingItem);	
				}
			
				this._pagingItems = pagingInside.find(".tc-paging-item").click(function(e) {		
					e.preventDefault();						
					self.goTo(($(e.currentTarget).data('tc-id') - 1) * self._itemsPerMove);
				});
				
				this._itemsWrapper.after(this._pagingNavContainer);
			}
			
		} else {
			this._pagingEnabled = false;
		}

		
		this._dragContainer.css({
			width:currPosX+100
		});
		
		


		
		
	


		//Direction navigation (arrows)
		if(this.settings.directionNav) {	
			this._itemsWrapper.after("<a href='#' class='arrow-holder slider_left'><span class='arrow-icon slider_left'></span></a> <a href='#' class='arrow-holder slider_right'><span class='arrow-icon slider_right'></span></a>");
			this.arrowLeft = this.carouselRoot.find(".arrow-holder.slider_left");
			this.arrowRight = this.carouselRoot.find(".arrow-holder.slider_right");

			
			/*if(this.settings.loopItems) {
				this._arrowLeftBlocked = false;
				this._disableLeftArrow();
			}*/
			
			if(this.arrowLeft.length < 1 || this.arrowRight.length < 1) {
				this.settings.directionNav = false;
			} else if(this.settings.directionNavAutoHide) {
				this.arrowLeft.hide();
				this.arrowRight.hide();

				this.carouselRoot.one("mousemove.arrowshover",function() {
					self.arrowLeft.fadeIn("fast");
					self.arrowRight.fadeIn("fast");					
				});


				this.carouselRoot.hover(
						function() {
							self.arrowLeft.fadeIn("fast");
							self.arrowRight.fadeIn("fast");
						},
						function() {
							self.arrowLeft.fadeOut("fast");
							self.arrowRight.fadeOut("fast");				
						}
				);	
			}	
			
			
			this._updateDirectionNav(0);
			
			if(this.settings.directionNav) {
				this.arrowRight.click(function(e) {					
					e.preventDefault();	
					if(self.settings.loopItems && !self._blockClickEvents || !self._arrowRightBlocked )
						self.next();
				});

				this.arrowLeft.click(function(e) {
					e.preventDefault();
					if(self.settings.loopItems && !self._blockClickEvents || !self._arrowLeftBlocked )
						self.prev();
				});	
			}
		}

		
		

		// Manage window resize event with 100ms delay
		this.carouselWidth;
		this._resizeEvent = 'onorientationchange' in window ? 'orientationchange.touchcarousel' : 'resize.touchcarousel';
		var resizeTimer;
		$(window).bind(this._resizeEvent, function() {		
			if(resizeTimer) 
				clearTimeout(resizeTimer);			
			resizeTimer = setTimeout(function() { self.updateCarouselSize(false); }, 100);			
		});		
		
		
		// Setup scrollbar
		if(this.settings.scrollbar) {
			this._scrollbarHolder = $("<div class='scrollbar-holder notshow' ><div class='scrollbar"+ (this.settings.scrollbarTheme.toLowerCase() === "light" ? " light" : " dark")  +"'></div></div>");
			this._scrollbarHolder.appendTo(this.carouselRoot);
			this.scrollbarJQ = this._scrollbarHolder.find('.scrollbar');
			this._scrollbarHideTimeout = "";
			this._scrollbarStyle = this.scrollbarJQ[0].style;			
			this._scrollbarDist = 0;
			if(this.settings.scrollbarAutoHide) {
				this._scrollbarVisible = false;
				this.scrollbarJQ.css("opacity", 0);
			} else {
				this._scrollbarVisible = true;
			}
			
		} else {
			this.settings.scrollbarAutoHide = false;
		}
		
		
		this.updateCarouselSize(true);
		
		
		
		
		
		this._itemsWrapper.bind(this._downEvent, function(e) {  self._onDragStart(e); });	
		
		
		
		// Setup autoplay			
		if(this.settings.autoplay && this.settings.autoplayDelay > 0) {		
			this._isHovering = false;
			this.autoplayTimer = '';
			this.wasAutoplayRunning = true;
			
			if(!this.hasTouch) {						
				this.carouselRoot.hover(
						function() {						
							self._isHovering = true;							
							self._stopAutoplay();
						},
						function() {							
							self._isHovering = false;							
							self._resumeAutoplay();
						}
				);				
			}
			this.autoplay = true;	
			
			this._releaseAutoplay();
		} else {
			this.autoplay = false;
		}
		
		
		// Keyboard navigation
		if(this.settings.keyboardNav) {
			$(document).bind("keydown.touchcarousel", function(e) {
				if(!self._blockClickEvents) {
					if (e.keyCode === 37) {						
						self.prev();
					}
					else if (e.keyCode === 39) {						
						self.next();
					}
				}
			});
		}
		
		// release carousel main container overflow
		this.carouselRoot.css("overflow","visible");
		
	} /* TouchCarousel Constructor End */
	/* -------------------------------------TouchCarousel Prototype------------------------------------------------------*/
	
	
	
	TouchCarousel.prototype = {
			/* Public methods: */
			goTo:function(id, fromAutoplay) {
						
				
				var newItem = this.items[id];
				
				
				if(newItem) {					
					if(!fromAutoplay && this.autoplay && this.settings.autoplayStopAtAction) {						
						this.stopAutoplay();
					}
					
					this._updatePagingNav(id);
					
					
					this.endPos = this._getXPos();
					var newX = -newItem.posX;
					if(newX > 0) {
						newX = 0;
					} else if(newX < this.carouselWidth - this._maxXPos) {
						newX = this.carouselWidth - this._maxXPos;
					}
					this.animateTo(newX, this.settings.transitionSpeed, "easeInOutSine");					
				}			
				
			},
			next:function(fromAutoplay) {				
				var currXPos = this._getXPos();				
				var newItemId = this._getItemAtPos(currXPos).index;	
				
				
				if(!this._pagingEnabled) {
					newItemId = newItemId + this._itemsPerMove;						
					if(this.settings.loopItems) {
						if(currXPos <= this.carouselWidth - this._maxXPos) {
							newItemId = 0;
						}
					}
					if(newItemId > this.numItems - 1) {
						newItemId = this.numItems - 1;
					}
				} else {
					var newPageId = this._currPageId +  1;
					if(newPageId >  this._numPages - 1) {						
						if(this.settings.loopItems) {
							newItemId = 0;
						} else {
							newItemId = (this._numPages - 1) * this._itemsPerMove;	
						}
					} else {
						newItemId = newPageId * this._itemsPerMove;	
					}
				}
				
				
				
				this.goTo(newItemId, fromAutoplay);
			},
			prev:function(fromAutoplay) {	
				var currXPos = this._getXPos();				
				var newItemId = this._getItemAtPos(currXPos).index;	
				
				if(!this._pagingEnabled) {
					newItemId = newItemId - this._itemsPerMove;						
					if(newItemId < 0) {
						if(this.settings.loopItems) {
							if(currXPos < 0) {
								newItemId = 0;							
							} else {
								newItemId = this.numItems - 1;							
							}
							
						} else {
							newItemId = 0;
						}
					}	
				} else {
					var newPageId = this._currPageId -  1;
					if(newPageId <  0) {						
						if(this.settings.loopItems) {
							newItemId = (this._numPages - 1) * this._itemsPerMove;	
						} else {
							newItemId = 0;
						}
					} else {
						newItemId = newPageId * this._itemsPerMove;	
					}			
				}				
				this.goTo(newItemId, fromAutoplay);
			},
			getCurrentId:function() {
				var currId = this._getItemAtPos(this._getXPos()).index;
				return currId;
			},
			setXPos:function(pos, isScrollbar) {	
				if(!isScrollbar) {
					this._dragContainerStyle[this._xProp] = (this._xPref + pos + this._xSuf);					
				} else {					
					this._scrollbarStyle[this._xProp] = (this._xPref + pos + this._xSuf);
				}				
			},
			stopAutoplay: function() {				
				this._stopAutoplay();
				this.autoplay = false;
				this.wasAutoplayRunning = false;				
			},
			resumeAutoplay: function() {
				this.autoplay = true;
				if(!this.wasAutoplayRunning) {
					this._resumeAutoplay();
				}				
			},
			updateCarouselSize:function(leavePos) {
				var self = this;
				
				setTimeout(function() {
					self.carouselWidth = self.carouselRoot.width();
				},300);
				if(this.settings.scrollToLast) {
					var lastItemsWidth = 0;
					if(this._pagingEnabled) {					
						var freeItems = (this.numItems % this._itemsPerMove);
						if(freeItems > 0) {
							for(var i = this.numItems - freeItems; i < this.numItems; i++) {								
								lastItemsWidth += this.items[i].width;
							}
						} else {
							lastItemsWidth = this.carouselWidth;
						}
						
					} else {
						lastItemsWidth = this.items[this.numItems - 1].width;
					}
					this._maxXPos = this._totalItemsWidth + this.carouselWidth - lastItemsWidth;
				} else {
					
					this._maxXPos = this._totalItemsWidth;
				}
				
				
				if(this.settings.scrollbar) {
					var scrlWidth = Math.round(this._scrollbarHolder.width() / (this._maxXPos / this.carouselWidth));
					this.scrollbarJQ.css('width', scrlWidth);					
					this._scrollbarDist = this._scrollbarHolder.width() - scrlWidth;
				}		
				if(!this.settings.scrollToLast) {
					if(this.carouselWidth >= this._totalItemsWidth) {
						this._wasBlocked = true;						
						if(!this.settings.loopItems) {
							this._arrowRightBlocked = true;							
							this.arrowRight.addClass("disabled");	
							this._arrowLeftBlocked = true;
							this.arrowLeft.addClass("disabled");	
						}
						this.setXPos(0);						
						return;
					} else if(this._wasBlocked) {
						this._wasBlocked = false;
						this._arrowRightBlocked = false;	
						this._arrowLeftBlocked = false;
						this.arrowRight.removeClass("disabled");	
						this.arrowLeft.removeClass("disabled");	
					}					
				}
				
				if(!leavePos) {
					var newX = this.endPos = this._getXPos();		
					
					if(newX > 0) {
						newX = 0;
					} else if(newX < this.carouselWidth - this._maxXPos) {
						newX = this.carouselWidth - this._maxXPos;
					}
					this.animateTo(newX, 300, "easeInOutSine");		
				}
				
				
			},
			animateTo:function(pos, speed, easing, bounceAnim, endPos, bounceSpeed, bounceEasing) {		
				
				if(this.settings.onAnimStart !== null) {
					this.settings.onAnimStart.call(this);
				}
				
				
				if(this.autoplay && this.autoplayTimer) {		
					this.wasAutoplayRunning = true;
					this._stopAutoplay();
				}
				this._stopAnimation();
				
				var self = this;
				
				var scrollbarEnabled = this.settings.scrollbar,
					prop = self._xProp,
					pref = self._xPref,
					suf = self._xSuf,				
					from = {containerPos: this.endPos},
					to = {containerPos: pos},
					to2 = {containerPos: endPos},
					endPos = bounceAnim ? endPos : pos,
					dContainer = self._dragContainerStyle;
				
				self._isAnimating = true;
				
				if(scrollbarEnabled) {
					var sbStyle = this._scrollbarStyle;
					var sbAnimateDist = self._maxXPos - self.carouselWidth;
					if(this.settings.scrollbarAutoHide)  { 
						if(!this._scrollbarVisible) {
							this._showScrollbar();
						}
					}
				}
				
				
				
				this._updateDirectionNav(endPos);
				
				function animationComplete() {
					self._isAnimating = false;
			    	self._releaseAutoplay();
			    	if(self.settings.scrollbarAutoHide)  {					
			    		self._hideScrollbar();
					}
			    	
			    	if(self.settings.onAnimComplete !== null) {
						self.settings.onAnimComplete.call(self);
					}
				}
				
				
				
				
				this._decelerationAnim = $(from).animate(to, {
				    duration: speed,
				    easing: easing,
				    step: function() {
				    	if(scrollbarEnabled) {		
				    		sbStyle[prop] = (pref + Math.round((self._scrollbarDist) * (-this.containerPos / sbAnimateDist)) + suf );	  
				    	}
				    	dContainer[prop] = (pref + Math.round(this.containerPos) + suf);					       
				    }, 
				    complete: function() {
				    	if(bounceAnim) {
				    		self._decelerationAnim = $(to).animate(to2, {
							    duration: bounceSpeed,
							    easing: bounceEasing,
							    step: function() {			
							    	if(scrollbarEnabled) {
							    		sbStyle[prop] = (pref + Math.round((self._scrollbarDist) * (-this.containerPos / sbAnimateDist)) + suf );	  
							    	}
							    	dContainer[prop] = (pref + Math.round(this.containerPos) + suf);							        				       
							    },
							    complete: function() {							    	
							    	if(scrollbarEnabled) {
							    		sbStyle[prop] = (pref + Math.round((self._scrollbarDist) * (-to2.containerPos / sbAnimateDist)) + suf );	  
							    	}
							    	dContainer[prop] = (pref + Math.round(to2.containerPos) + suf);								    	
							    	animationComplete();
							    }
				    		});					    		
				    	} else {					    		
				    		if(scrollbarEnabled) {
					    		sbStyle[prop] = (pref + Math.round((self._scrollbarDist) * (-to.containerPos / sbAnimateDist)) + suf );	  					    	
				    		}
				    		dContainer[prop] = (pref + Math.round(to.containerPos) + suf);			    		
				    		animationComplete();				    		
				    	}
				    }
				});	
				
							
			},
			/* Destroy carousel and remove it's element */
			destroy: function() {
				this.stopAutoplay();
				this._itemsWrapper.unbind(this._downEvent);					
				$(document).unbind(this._moveEvent).unbind(this._upEvent);	
				$(window).unbind(this._resizeEvent);
				if(this.settings.keyboardNav) {
					$(document).unbind("keydown.touchcarousel");
				}	
				this.carouselRoot.remove();
			},
			
			
			/* Private methods: */
			_updatePagingNav:function(id) {
				if(this._pagingEnabled) {	
					var newPageId = this._getPageIdFromItemId(id);					
					this._currPageId = newPageId;	
					if(this.settings.pagingNavControls) {
						this._pagingItems.removeClass('current');
						this._pagingItems.eq(newPageId).addClass('current');
					}
					
				}
			},
			_getPageIdFromItemId:function(id) {
				var itemsPerPage = this._itemsPerMove;				
				for(var i = 0; i < this._numPages; i++) {	
					if(id >= i * itemsPerPage  && id < i * itemsPerPage + itemsPerPage) {								
						return i;						
					}					
				}
				if(id < 0) {
					return 0;
				} else if(id >= this._numPages) {
					return this._numPages - 1;
				}
				return false;
			},			
			_enableArrows:function() {
				if(!this.settings.loopItems) {
					if(this._arrowLeftBlocked) {								
						this._arrowLeftBlocked = false;
						this.arrowLeft.removeClass("disabled");				
					} else if(this._arrowRightBlocked) {								
						this._arrowRightBlocked = false;
						this.arrowRight.removeClass("disabled");		
					}
				}
			},
			
			
			_disableLeftArrow:function() {			
				if(!this._arrowLeftBlocked && !this.settings.loopItems) {		
			
					this._arrowLeftBlocked = true;
					this.arrowLeft.addClass("disabled");	
					if(this._arrowRightBlocked) {
						this._arrowRightBlocked = false;
						this.arrowRight.removeClass("disabled");
					}					
				}	
			},
			_disableRightArrow:function() {				
				if(!this._arrowRightBlocked && !this.settings.loopItems) {					
					this._arrowRightBlocked = true;							
					this.arrowRight.addClass("disabled");	
					if(this._arrowLeftBlocked) {
						this._arrowLeftBlocked = false;
						this.arrowLeft.removeClass("disabled");		
					}					
				}	
			},
			_getItemAtPos:function(pos) {
				var self = this;
				pos = -pos;
				
				
				var currItem;				
				for(var i = 0; i < self.numItems; i++) {					
					currItem = self.items[i];
					if(pos >= currItem.posX && pos < currItem.posX + currItem.width) {	
					
						return currItem;					
					}
				}
				return -1;
			},
			

			
			_releaseAutoplay:function() {
				if(this.autoplay) {
					if(this.wasAutoplayRunning) {		
						if(!this._isHovering) {
							this._resumeAutoplay();
						}						
						this.wasAutoplayRunning = false;						
					}
				}
			},
			_hideScrollbar:function() {
				var self = this;
				this._scrollbarVisible = false;
				if(this._scrollbarHideTimeout) {
					clearTimeout(this._scrollbarHideTimeout);
				}				
				this._scrollbarHideTimeout = setTimeout(function(){
					self.scrollbarJQ.animate({opacity:0}, 150, "linear");
				}, 450);
			},
			_showScrollbar:function() {
				this._scrollbarVisible = true;		
				if(this._scrollbarHideTimeout) {
					clearTimeout(this._scrollbarHideTimeout);
				}	
				this.scrollbarJQ.stop().animate({opacity:1}, 150, "linear");
			},
			_stopAnimation:function() {
				if(this._decelerationAnim) {
					this._decelerationAnim.stop();
				}				
			},			
			_resumeAutoplay: function() {
 				if(this.autoplay) {
 					var self = this;
 	 				if(!this.autoplayTimer) {
 	 					this.autoplayTimer = setInterval(function() { 
 	 						if(!self._isDragging && !self._isAnimating) {
 	 							self.next(true);
 	 						}						
 	 					}, this.settings.autoplayDelay);
 	 				}
 				}	
			},	
			_stopAutoplay: function() {
				if(this.autoplayTimer) {					
					clearInterval(this.autoplayTimer);
					this.autoplayTimer = '';
				}								
			},
			_getXPos:function(isScrollbar) {
				var obj = !isScrollbar ? this._dragContainer : this.scrollbarJQ;			
				
				if(!this._useWebkitTransition) {
					return Math.round(obj.position().left);	
				} else {						
					var transform = obj.css("-webkit-transform");
					var explodedMatrix = transform.replace(/^matrix\(/i, '').split(/, |\)$/g);
					return parseInt(explodedMatrix[4], 10);				
				}
			},		
			
			_onDragStart:function(e) {			
				if(!this._isDragging) {		
					
					if(this.autoplay && this.settings.autoplayStopAtAction) {
						this.stopAutoplay();
					}
					
					this._stopAnimation();
					if(this.settings.scrollbarAutoHide) {
						this._showScrollbar();
					}
					
					
					var point;
					if(this.hasTouch) {
						this._lockYAxis = false;
						//parsing touch event
						var currTouches = e.originalEvent.touches;
						if(currTouches && currTouches.length > 0) {
							point = currTouches[0];
						}					
						else {	
							return false;						
						}
					} else {
						point = e;						
						e.preventDefault();						
					}
					
					
					this._setGrabbingCursor();			
					this._isDragging = true;
					var self = this;
					if(this._useWebkitTransition) {
						self._dragContainer.css({'-webkit-transition-duration':'0', '-webkit-transition-property': 'none'});
					}
					$(document).bind(this._moveEvent, function(e) { self._onDragMove(e); });
					$(document).bind(this._upEvent, function(e) { self._onDragRelease(e); });		

				
					this._startPos = this._getXPos();
					
								
					
					this._accelerationX = point.clientX;
					
					
					this._successfullyDragged = false;
					
					this._startTime = (e.timeStamp || (new Date().getTime()));
					
					this._moveDist = 0;
					this._prevMouseX = this._startMouseX = point.clientX;
					this._startMouseY = point.clientY;
				}
			},
			_onDragMove:function(e) {
				var timeStamp = (e.timeStamp || (new Date().getTime()));
				var point;
				if(this.hasTouch) {
					if(this._lockYAxis) {
						return false;
					}				
					
					var touches = e.originalEvent.touches;
					// If touches more then one, so stop sliding and allow browser do default action
					
					if(touches.length > 1) {
						return false;
					}
					
					point = touches[0];	
					// If drag direction on mobile is vertical, so stop sliding and allow browser to scroll				
					if(Math.abs(point.clientY - this._startMouseY) > Math.abs(point.clientX - this._startMouseX) + 3) {
						if(this.settings.lockAxis) {
							this._lockYAxis = true;
						}						
						return false;
					}
				
					e.preventDefault();			
				} else {
					point = e;
					e.preventDefault();		
				}
				
				this._latestDragX = point.clientX;

				// Helps find last direction of drag move
				this._lastDragPosition = this._currentDragPosition;
				var distance = point.clientX - this._prevMouseX;
				if(this._lastDragPosition != distance) {
					this._currentDragPosition = distance;
				}
				
				if(distance != 0)
				{
					
					var dist = this._startPos + this._moveDist;
					
					
					
					if(dist >= 0) {						
						distance = distance / 4;						
						this._disableLeftArrow();
						
					} else if(dist <= this.carouselWidth - this._maxXPos) {	
						this._disableRightArrow();
						distance = distance / 4;
					} else {						
						this._enableArrows();
					}
					
					this._moveDist += distance;
					this.setXPos(dist);				
					
					if(this.settings.scrollbar) {					
						this.setXPos((this._scrollbarDist) * (-dist / (this._maxXPos - this.carouselWidth)), true);
					}
				}		
				
				
				
				
				
				
				this._prevMouseX = point.clientX;
			
				if (timeStamp - this._startTime > 350) {
					this._startTime = timeStamp;
					this._accelerationX = point.clientX;						
				}
				
				if(this.settings.onDragStart !== null) {
					this.settings.onDragStart.call(this);
				}
				
				return false;		
			},
			
			_onDragRelease:function(e) {
				
			
				
				if(this._isDragging) {		
					
					var self = this;
					this._isDragging = false;			
					this._setGrabCursor();
					
				
					
					
					
					this.endPos = this._getXPos();
					
					
					this.isdrag = false;

					$(document).unbind(this._moveEvent).unbind(this._upEvent);					

					if(this.endPos == this._startPos) {						
						this._successfullyDragged = false;
						if(this.settings.scrollbarAutoHide) {
							this._hideScrollbar();
						}
						return;	
					} else {
						this._successfullyDragged = true;
					}
					
					//function animate
					var dist = (this._latestDragX - this._accelerationX);		
					var duration =  Math.max(40, (e.timeStamp || (new Date().getTime())) - this._startTime);
					
					
					
					// For nav speed calculation F=ma :)
					var friction = 0.5,
					    mass = 2,					
						v0 = Math.abs(dist) / duration;	
					
					function getCorrectXPos(pos) {
						
						if(pos > 0) {
							pos = 0;
						} else if(pos < self.carouselWidth - self._maxXPos) {
							pos = self.carouselWidth - self._maxXPos;
						}	
						return pos;
					}
					
					if(!this.settings.snapToItems) {
						// Physics continue
						var timeOffset = 0;
						if(v0 <= 2) {
							friction = this._baseFriction * 3.5;
							timeOffset = 0;
						} else if(v0 > 2 && v0 <= 3) {
							friction = this._baseFriction * 4;
							timeOffset = 200;
						} else if(v0 > 3){
							timeOffset = 300;
							if(v0 > 4) {
								v0 = 4;
								timeOffset = 400;
								friction = this._baseFriction * 6;
							}
							friction = this._baseFriction * 5;
						}							
						
						var S = (v0 * v0 * mass) / (2 * friction);
						S = S * (dist < 0 ? -1 : 1);					
						var t = v0 * mass / friction + timeOffset;	
							
						
						if(this.endPos + S > 0) {	
							if(this.endPos > 0) {
								this.animateTo(0, 800, "easeOutCubic");							
							} else {
								this.animateTo(
										(this.carouselWidth / 10) * ((timeOffset + 200) / 1000), 
										(Math.abs(this.endPos) * 1.1) / v0, 
										"easeOutSine", 
										true, 
										0, 
										400, 
										"easeOutCubic");					
							}
						} else if(this.endPos + S < this.carouselWidth - this._maxXPos) {	
							if(this.endPos < this.carouselWidth - this._maxXPos) {						
								this.animateTo(this.carouselWidth - this._maxXPos, 800, "easeOutCubic");							
							} else {							
								this.animateTo(
										this.carouselWidth - this._maxXPos - (this.carouselWidth / 10) * ((timeOffset + 200) / 1000), 
										(Math.abs(this.carouselWidth - this._maxXPos - this.endPos) * 1.1) / v0, 
										"easeOutSine", 
										true, 
										this.carouselWidth - this._maxXPos, 
										400, 
										"easeOutCubic");	
							}	
						} else {				
							this.animateTo(this.endPos + S, t, "easeOutCubic");
						}		
					} else {						
						if(this.autoplay && this.settings.autoplayStopAtAction) {
							this.stopAutoplay();
						}
						var isNext = Boolean(this._startMouseX - this._prevMouseX > 0);
										
						
						var newX = getCorrectXPos(this._getXPos());
						
											
						var newItemId = this._getItemAtPos(newX).index;						
						
						if(!this._pagingEnabled) {
							newItemId = newItemId + (isNext ?  this._itemsPerMove : ( - this._itemsPerMove + 1));									
						} else {	
							if(isNext) {			
								newX = Math.max(newX - this.carouselWidth - 1, 1 - self._maxXPos);	
								newItemId = this._getItemAtPos(newX).index;
								if(newItemId === undefined) {
									newItemId = this.numItems - 1;
								}
							}							
							
							var newPageId = this._getPageIdFromItemId(newItemId);
														
							newItemId = newPageId * this._itemsPerMove;								
						}
						
						if(isNext) {							
							newItemId = Math.min(newItemId, this.numItems - 1);
						} else {							
							newItemId = Math.max(newItemId, 0);
						}
						
											
						
						var newItem = this.items[newItemId];
					
						this._updatePagingNav(newItemId);
						
						if(newItem) {
							
							newX = getCorrectXPos(-newItem.posX);
							
							var newDist = Math.abs(this.endPos  - newX);
							var newDuration = Math.max((newDist * 1.08) / v0, 150);
							var isFast = Boolean(newDuration < 180);
							var addDist = newDist * 0.08;
							if(isNext) {
								addDist = addDist * -1;
							}
							
							
							this.animateTo(isFast ? (newX + addDist ) : newX,
									Math.min(newDuration, 400),
									"easeOutSine",
									isFast,
									newX,
									300,
									"easeOutCubic");	
							
							
						}
					
					}
					
					if(this.settings.onDragRelease !== null) {
						this.settings.onDragRelease.call(this);
					}
					
				}

				return false;
			},
			_updateDirectionNav:function(pos) {				
				if(pos === undefined) {					
					pos = this._getXPos();
				}				
				if(!this.settings.loopItems) {
					if(pos >= 0) {						
						this._disableLeftArrow();
					} else if(pos <= this.carouselWidth - this._maxXPos) {
						this._disableRightArrow();						
					} else {
						this._enableArrows();
					}
				}
			},
			_setGrabCursor:function() {			
				if(this._grabCursor) {
					this._itemsWrapper.css('cursor', this._grabCursor);
				} else {
					this._itemsWrapper.removeClass('grabbing-cursor');
					this._itemsWrapper.addClass('grab-cursor');	
				}
							
			},
			_setGrabbingCursor:function() {		
				if(this._grabbingCursor) {
					this._itemsWrapper.css('cursor', this._grabbingCursor);
				} else {
					this._itemsWrapper.removeClass('grab-cursor');
					this._itemsWrapper.addClass('grabbing-cursor');	
				}				
			}
	}; /* TouchCarousel.prototype end */

	$.fn.touchCarousel = function(options) {    	
		return this.each(function(){
			var touchCarousel = new TouchCarousel($(this), options);
			$(this).data("touchCarousel", touchCarousel);
		});
	};

	$.fn.touchCarousel.defaults = {  
			itemsPerMove: 1,              // The number of items to move per arrow click.
			
			snapToItems: false,           // Snaps to items, based on itemsPerMove
			pagingNav: false,             // Enable paging nav (snaps to first item of every group, based on itemsPerMove). Overrides snapToItems
			pagingNavControls: true,      // Paging controls (bullets)
			
			
			
			autoplay:false,               // Autoplay enabled          
			autoplayDelay:3000,	          // Delay between transitions	
			autoplayStopAtAction:true,    // Stop autoplay forever when user clicks arrow or does any other action
			
			scrollbar: true,              // Scrollbar enabled
			scrollbarAutoHide: false,     // Scrollbar autohide
			scrollbarTheme: "dark",	      // Scrollbar color. Can be "light" or "dark"	
			
			transitionSpeed: 600,         // Carousel transition speed (next/prev arrows, autoplay)		
			
			directionNav:true,            // Direction (arrow) navigation (true or false)
			directionNavAutoHide:false,   // Direction (arrow) navigation auto hide on hover. (On touch devices arrows are always shown)
			
			loopItems: false,             // Loop items (don't disable arrows on last slide and allow autoplay to loop)
			
			keyboardNav: false,			  // Keyboard arrows navigation
			dragUsingMouse:true,          // Enable drag using mouse	
			
			
			scrollToLast: false,          // Last item ends at start of carousel wrapper	
			

			itemFallbackWidth: 500,       // Default width of the item in pixels. (used if impossible to get item width).
			
			baseMouseFriction: 0.0012,    // Container friction on desktop (higher friction - slower speed)
			baseTouchFriction: 0.0008,    // Container friction on mobile
			lockAxis: true,               // Allow dragging only on one direction
			useWebkit3d: false,           // Enable WebKit 3d transform on desktop devices 
                                          // (on touch devices this option is turned on)
										  // Use it if you have only images, 3d transform makes text blurry
			                                       
			
			onAnimStart: null,            // Callback, triggers before deceleration or transition animation
			onAnimComplete: null,         // Callback, triggers after deceleration or transition animation

			onDragStart:null,             // Callback, triggers on drag start
			onDragRelease: null           // Callback, triggers on drag complete
	};
	
	$.fn.touchCarousel.settings = {};
	
	/* easing types */
	$.extend(jQuery.easing, {
		easeInOutSine: function (x, t, b, c, d) {
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		},
		easeOutSine: function (x, t, b, c, d) {
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeOutCubic: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		}
	});
	
})(jQuery);

// jquery.touchcarousel v1.2
(function(f){function q(b,c){var a,e;this.carouselRoot=f(b);var d=this;this._b=this._a=!1;this._e=this._d=this._c="";this._f;this._g;this._h;this._i;this._j;this._k=0;this.settings=f.extend({},f.fn.touchCarousel.defaults,c);this._l=this.carouselRoot.find(".touchcarousel-container");this._m=this._l[0].style;this._n=this._l.wrap(f('<div class="touchcarousel-wrapper" />')).parent();var g=this._l.find(".touchcarousel-item");this.items=[];this.numItems=g.length;a=navigator.userAgent.toLowerCase();e=/(chrome)[ \/]([\w.]+)/.exec(a)||
/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||0>a.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];a=e[1]||"";e=e[2]||"0";var r={};a&&(r[a]=!0,r.version=e);r.chrome&&(r.webkit=!0);d._o=r;this._p;this._q=!1;this._t=this._s=this._r=0;this._w=this._v=this._u=!1;"ontouchstart"in window?(this.hasTouch=!0,this._c="touchstart.rs",this._d="touchmove.rs",this._e="touchend.rs",this._x=this.settings.baseTouchFriction):(this.hasTouch=
!1,this._x=this.settings.baseMouseFriction,this.settings.dragUsingMouse?(this._c="mousedown.rs",this._d="mousemove.rs",this._e="mouseup.rs",this._y,this._z,a=d._o,a.msie||a.opera?this._y=this._z="move":a.mozilla&&(this._y="-moz-grab",this._z="-moz-grabbing"),this._a1()):this._n.addClass("auto-cursor"));if((this.hasTouch||this.settings.useWebkit3d)&&"WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix)this._l.css({"-webkit-transform-origin":"0 0","-webkit-transform":"translateZ(0)"}),this._w=!0;
this._w?(this._b1="-webkit-transform",this._c1="translate3d(",this._d1="px, 0, 0)"):(this._b1="left",this._c1="",this._d1="px");this.hasTouch&&(this.settings.directionNavAutoHide=!1);this.settings.directionNav||(this._f1=this.settings.loopItems?this._e1=!0:this._e1=!1,this.settings.loopItems=!0);var p,h,n=0;g.eq(this.numItems-1).addClass("last");g.each(function(b){h=f(this);p={};p.item=h;p.index=b;p.posX=n;p.width=h.outerWidth(!0)||d.settings.itemFallbackWidth;n+=p.width;if(this.hasTouch){var a;h.find("a").each(function(){a=
f(this);a.data("tc-href",a.attr("href"));a.data("tc-target",a.attr("target"));a.attr("href","#");a.bind("click",function(a){a.preventDefault();if(d._q)return!1;a=f(this).data("tc-href");var b=f(this).data("tc-target");!b||"_g1"===b.toLowerCase()?window.location.href=a:window.open(a)})})}else h.find("a").bind("click.touchcarousel",function(a){if(d._q)return a.preventDefault(),!1});h.find(".non-draggable").bind(d._c,function(a){d._q=!1;a.stopImmediatePropagation()});d.items.push(p)});this._h1=this._f=
n;this._i1=0<this.settings.itemsPerMove?this.settings.itemsPerMove:1;if(this.settings.pagingNav){if(this._j1=this.settings.snapToItems=!0,this._k1=Math.ceil(this.numItems/this._i1),this._l1=0,this.settings.pagingNavControls){this._m1=f('<div class="tc-paging-container"><div class="tc-paging-centerer"><div class="tc-paging-centerer-inside"></div></div></div>');g=this._m1.find(".tc-paging-centerer-inside");for(e=1;e<=this._k1;e++)a=f('<a class="tc-paging-item" href="#">'+e+"</a>").data("tc-id",e),e===
this._l1+1&&a.addClass("current"),g.append(a);this._n1=g.find(".tc-paging-item").click(function(a){a.preventDefault();d.goTo((f(a.currentTarget).data("tc-id")-1)*d._i1)});this._n.after(this._m1)}}else this._j1=!1;this._l.css({width:n});this.settings.directionNav&&(this._n.after("<a href='#' class='arrow-holder left'><span class='arrow-icon left'></span></a> <a href='#' class='arrow-holder right'><span class='arrow-icon right'></span></a>"),this.arrowLeft=this.carouselRoot.find(".arrow-holder.left"),
this.arrowRight=this.carouselRoot.find(".arrow-holder.right"),1>this.arrowLeft.length||1>this.arrowRight.length?this.settings.directionNav=!1:this.settings.directionNavAutoHide&&(this.arrowLeft.hide(),this.arrowRight.hide(),this.carouselRoot.one("mousemove.arrowshover",function(){d.arrowLeft.fadeIn("fast");d.arrowRight.fadeIn("fast")}),this.carouselRoot.hover(function(){d.arrowLeft.fadeIn("fast");d.arrowRight.fadeIn("fast")},function(){d.arrowLeft.fadeOut("fast");d.arrowRight.fadeOut("fast")})),this._p1(0),
this.settings.directionNav&&(this.arrowRight.click(function(a){a.preventDefault();(d.settings.loopItems&&!d._u||!d._f1)&&d.next()}),this.arrowLeft.click(function(a){a.preventDefault();(d.settings.loopItems&&!d._u||!d._e1)&&d.prev()})));this.carouselWidth;this._q1="onorientationchange"in window?"orientationchange.touchcarousel":"resize.touchcarousel";var l;f(window).bind(this._q1,function(){l&&clearTimeout(l);l=setTimeout(function(){d.updateCarouselSize(!1)},100)});this.settings.scrollbar?(this._r1=
f("<div class='scrollbar-holder'><div class='scrollbar"+("light"===this.settings.scrollbarTheme.toLowerCase()?" light":" dark")+"'></div></div>"),this._r1.appendTo(this.carouselRoot),this.scrollbarJQ=this._r1.find(".scrollbar"),this._s1="",this._t1=this.scrollbarJQ[0].style,this._u1=0,this.settings.scrollbarAutoHide?(this._v1=!1,this.scrollbarJQ.css("opacity",0)):this._v1=!0):this.settings.scrollbarAutoHide=!1;this.updateCarouselSize(!0);this._n.bind(this._c,function(a){d._w1(a)});this.settings.autoplay&&
0<this.settings.autoplayDelay?(this._x1=!1,this.autoplayTimer="",this.wasAutoplayRunning=!0,this.hasTouch||this.carouselRoot.hover(function(){d._x1=!0;d._y1()},function(){d._x1=!1;d._z1()}),this.autoplay=!0,this._a2()):this.autoplay=!1;this.settings.keyboardNav&&f(document).bind("keydown.touchcarousel",function(a){d._u||(37===a.keyCode?d.prev():39===a.keyCode&&d.next())});this.carouselRoot.css("overflow","visible")}q.prototype={goTo:function(b,c){var a=this.items[b];a&&(!c&&(this.autoplay&&this.settings.autoplayStopAtAction)&&
this.stopAutoplay(),this._b2(b),this.endPos=this._c2(),a=-a.posX,0<a?a=0:a<this.carouselWidth-this._h1&&(a=this.carouselWidth-this._h1),this.animateTo(a,this.settings.transitionSpeed,"easeInOutSine"))},next:function(b){var c=this._c2(),a=this._d2(c).index;this._j1?(c=this._l1+1,a=c>this._k1-1?this.settings.loopItems?0:(this._k1-1)*this._i1:c*this._i1):(a+=this._i1,this.settings.loopItems&&c<=this.carouselWidth-this._h1&&(a=0),a>this.numItems-1&&(a=this.numItems-1));this.goTo(a,b)},prev:function(b){var c=
this._c2(),a=this._d2(c).index;this._j1?(c=this._l1-1,a=0>c?this.settings.loopItems?(this._k1-1)*this._i1:0:c*this._i1):(a-=this._i1,0>a&&(a=this.settings.loopItems?0>c?0:this.numItems-1:0));this.goTo(a,b)},getCurrentId:function(){return this._d2(this._c2()).index},setXPos:function(b,c){c?this._t1[this._b1]=this._c1+b+this._d1:this._m[this._b1]=this._c1+b+this._d1},stopAutoplay:function(){this._y1();this.wasAutoplayRunning=this.autoplay=!1},resumeAutoplay:function(){this.autoplay=!0;this.wasAutoplayRunning||
this._z1()},updateCarouselSize:function(b){this.carouselWidth=this.carouselRoot.width();if(this.settings.scrollToLast){var c=0;if(this._j1){var a=this.numItems%this._i1;if(0<a)for(a=this.numItems-a;a<this.numItems;a++)c+=this.items[a].width;else c=this.carouselWidth}else c=this.items[this.numItems-1].width;this._h1=this._f+this.carouselWidth-c}else this._h1=this._f;this.settings.scrollbar&&(c=Math.round(this._r1.width()/(this._h1/this.carouselWidth)),this.scrollbarJQ.css("width",c),this._u1=this._r1.width()-
c);if(!this.settings.scrollToLast){if(this.carouselWidth>=this._f){this._v=!0;this.settings.loopItems||(this._f1=!0,this.arrowRight.addClass("disabled"),this._e1=!0,this.arrowLeft.addClass("disabled"));this.setXPos(0);return}this._v&&(this._e1=this._f1=this._v=!1,this.arrowRight.removeClass("disabled"),this.arrowLeft.removeClass("disabled"))}b||(b=this.endPos=this._c2(),0<b?b=0:b<this.carouselWidth-this._h1&&(b=this.carouselWidth-this._h1),this.animateTo(b,300,"easeInOutSine"))},animateTo:function(b,
c,a,e,d,g,r){function p(){h._b=!1;h._a2();h.settings.scrollbarAutoHide&&h._g2();null!==h.settings.onAnimComplete&&h.settings.onAnimComplete.call(h)}null!==this.settings.onAnimStart&&this.settings.onAnimStart.call(this);this.autoplay&&this.autoplayTimer&&(this.wasAutoplayRunning=!0,this._y1());this._e2();var h=this,n=this.settings.scrollbar,l=h._b1,j=h._c1,m=h._d1,q={containerPos:this.endPos},k={containerPos:b},v={containerPos:d};d=e?d:b;var s=h._m;h._b=!0;if(n){var t=this._t1,u=h._h1-h.carouselWidth;
this.settings.scrollbarAutoHide&&(this._v1||this._f2())}this._p1(d);this._p=f(q).animate(k,{duration:c,easing:a,step:function(){n&&(t[l]=j+Math.round(h._u1*(-this.containerPos/u))+m);s[l]=j+Math.round(this.containerPos)+m},complete:function(){e?h._p=f(k).animate(v,{duration:g,easing:r,step:function(){n&&(t[l]=j+Math.round(h._u1*(-this.containerPos/u))+m);s[l]=j+Math.round(this.containerPos)+m},complete:function(){n&&(t[l]=j+Math.round(h._u1*(-v.containerPos/u))+m);s[l]=j+Math.round(v.containerPos)+
m;p()}}):(n&&(t[l]=j+Math.round(h._u1*(-k.containerPos/u))+m),s[l]=j+Math.round(k.containerPos)+m,p())}})},destroy:function(){this.stopAutoplay();this._n.unbind(this._c);f(document).unbind(this._d).unbind(this._e);f(window).unbind(this._q1);this.settings.keyboardNav&&f(document).unbind("keydown.touchcarousel");this.carouselRoot.remove()},_b2:function(b){this._j1&&(this._l1=b=this._h2(b),this.settings.pagingNavControls&&(this._n1.removeClass("current"),this._n1.eq(b).addClass("current")))},_h2:function(b){for(var c=
this._i1,a=0;a<this._k1;a++)if(b>=a*c&&b<a*c+c)return a;return 0>b?0:b>=this._k1?this._k1-1:!1},_i2:function(){this.settings.loopItems||(this._e1?(this._e1=!1,this.arrowLeft.removeClass("disabled")):this._f1&&(this._f1=!1,this.arrowRight.removeClass("disabled")))},_o1:function(){!this._e1&&!this.settings.loopItems&&(this._e1=!0,this.arrowLeft.addClass("disabled"),this._f1&&(this._f1=!1,this.arrowRight.removeClass("disabled")))},_j2:function(){!this._f1&&!this.settings.loopItems&&(this._f1=!0,this.arrowRight.addClass("disabled"),
this._e1&&(this._e1=!1,this.arrowLeft.removeClass("disabled")))},_d2:function(b){b=-b;for(var c,a=0;a<this.numItems;a++)if(c=this.items[a],b>=c.posX&&b<c.posX+c.width)return c;return-1},_a2:function(){this.autoplay&&this.wasAutoplayRunning&&(this._x1||this._z1(),this.wasAutoplayRunning=!1)},_g2:function(){var b=this;this._v1=!1;this._s1&&clearTimeout(this._s1);this._s1=setTimeout(function(){b.scrollbarJQ.animate({opacity:0},150,"linear")},450)},_f2:function(){this._v1=!0;this._s1&&clearTimeout(this._s1);
this.scrollbarJQ.stop().animate({opacity:1},150,"linear")},_e2:function(){this._p&&this._p.stop()},_z1:function(){if(this.autoplay){var b=this;this.autoplayTimer||(this.autoplayTimer=setInterval(function(){!b._k2&&!b._b&&b.next(!0)},this.settings.autoplayDelay))}},_y1:function(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer="")},_c2:function(b){b=!b?this._l:this.scrollbarJQ;return this._w?(b=b.css("-webkit-transform").replace(/^matrix\(/i,"").split(/, |\)$/g),parseInt(b[4],
10)):Math.round(b.position().left)},_w1:function(b){if(!this._k2){this.autoplay&&this.settings.autoplayStopAtAction&&this.stopAutoplay();this._e2();this.settings.scrollbarAutoHide&&this._f2();var c;if(this.hasTouch)if(this._a=!1,(c=b.originalEvent.touches)&&0<c.length)c=c[0];else return!1;else c=b,b.preventDefault();this._l2();this._k2=!0;var a=this;this._w&&a._l.css({"-webkit-transition-duration":"0","-webkit-transition-property":"none"});f(document).bind(this._d,function(b){a._m2(b)});f(document).bind(this._e,
function(b){a._n2(b)});this._o2=this._c2();this._i=c.clientX;this._q=!1;this._k=b.timeStamp||(new Date).getTime();this._t=0;this._s=this._r=c.clientX;this._p2=c.clientY}},_m2:function(b){var c=b.timeStamp||(new Date).getTime(),a;if(this.hasTouch){if(this._a)return!1;a=b.originalEvent.touches;if(1<a.length)return!1;a=a[0];if(Math.abs(a.clientY-this._p2)>Math.abs(a.clientX-this._r)+3)return this.settings.lockAxis&&(this._a=!0),!1}else a=b;b.preventDefault();this._j=a.clientX;this._q2=this._r2;b=a.clientX-
this._s;this._q2!=b&&(this._r2=b);if(0!=b){var e=this._o2+this._t;0<=e?(b/=4,this._o1()):e<=this.carouselWidth-this._h1?(this._j2(),b/=4):this._i2();this._t+=b;this.setXPos(e);this.settings.scrollbar&&this.setXPos(this._u1*(-e/(this._h1-this.carouselWidth)),!0)}this._s=a.clientX;350<c-this._k&&(this._k=c,this._i=a.clientX);null!==this.settings.onDragStart&&this.settings.onDragStart.call(this);return!1},_n2:function(b){if(this._k2){var c=this;this._k2=!1;this._a1();this.endPos=this._c2();this.isdrag=
!1;f(document).unbind(this._d).unbind(this._e);if(this.endPos==this._o2){this._q=!1;this.settings.scrollbarAutoHide&&this._g2();return}this._q=!0;var a=this._j-this._i;b=Math.max(40,(b.timeStamp||(new Date).getTime())-this._k);var e=0.5;b=Math.abs(a)/b;var d=function(a){0<a?a=0:a<c.carouselWidth-c._h1&&(a=c.carouselWidth-c._h1);return a};if(this.settings.snapToItems){this.autoplay&&this.settings.autoplayStopAtAction&&this.stopAutoplay();var a=Boolean(0<this._r-this._s),e=d(this._c2()),g=this._d2(e).index;
this._j1?(a&&(e=Math.max(e-this.carouselWidth-1,1-c._h1),g=this._d2(e).index,void 0===g&&(g=this.numItems-1)),g=this._h2(g)*this._i1):g+=a?this._i1:-this._i1+1;g=a?Math.min(g,this.numItems-1):Math.max(g,0);e=this.items[g];this._b2(g);e&&(e=d(-e.posX),d=Math.abs(this.endPos-e),b=Math.max(1.08*d/b,150),g=Boolean(180>b),d*=0.08,a&&(d*=-1),this.animateTo(g?e+d:e,Math.min(b,400),"easeOutSine",g,e,300,"easeOutCubic"))}else d=0,2>=b?(e=3.5*this._x,d=0):2<b&&3>=b?(e=4*this._x,d=200):3<b&&(d=300,4<b&&(b=4,
d=400,e=6*this._x),e=5*this._x),a=2*b*b/(2*e)*(0>a?-1:1),e=2*b/e+d,0<this.endPos+a?0<this.endPos?this.animateTo(0,800,"easeOutCubic"):this.animateTo(this.carouselWidth/10*((d+200)/1E3),1.1*Math.abs(this.endPos)/b,"easeOutSine",!0,0,400,"easeOutCubic"):this.endPos+a<this.carouselWidth-this._h1?this.endPos<this.carouselWidth-this._h1?this.animateTo(this.carouselWidth-this._h1,800,"easeOutCubic"):this.animateTo(this.carouselWidth-this._h1-this.carouselWidth/10*((d+200)/1E3),1.1*Math.abs(this.carouselWidth-
this._h1-this.endPos)/b,"easeOutSine",!0,this.carouselWidth-this._h1,400,"easeOutCubic"):this.animateTo(this.endPos+a,e,"easeOutCubic");null!==this.settings.onDragRelease&&this.settings.onDragRelease.call(this)}return!1},_p1:function(b){void 0===b&&(b=this._c2());this.settings.loopItems||(0<=b?this._o1():b<=this.carouselWidth-this._h1?this._j2():this._i2())},_a1:function(){this._y?this._n.css("cursor",this._y):(this._n.removeClass("grabbing-cursor"),this._n.addClass("grab-cursor"))},_l2:function(){this._z?
this._n.css("cursor",this._z):(this._n.removeClass("grab-cursor"),this._n.addClass("grabbing-cursor"))}};f.fn.touchCarousel=function(b){return this.each(function(){var c=new q(f(this),b);f(this).data("touchCarousel",c)})};f.fn.touchCarousel.defaults={itemsPerMove:1,snapToItems:!1,pagingNav:!1,pagingNavControls:!0,autoplay:!1,autoplayDelay:3E3,autoplayStopAtAction:!0,scrollbar:!0,scrollbarAutoHide:!1,scrollbarTheme:"dark",transitionSpeed:600,directionNav:!0,directionNavAutoHide:!1,loopItems:!1,keyboardNav:!1,
dragUsingMouse:!0,scrollToLast:!1,itemFallbackWidth:500,baseMouseFriction:0.0012,baseTouchFriction:8E-4,lockAxis:!0,useWebkit3d:!1,onAnimStart:null,onAnimComplete:null,onDragStart:null,onDragRelease:null};f.fn.touchCarousel.settings={};f.extend(jQuery.easing,{easeInOutSine:function(b,c,a,e,d){return-e/2*(Math.cos(Math.PI*c/d)-1)+a},easeOutSine:function(b,c,a,e,d){return e*Math.sin(c/d*(Math.PI/2))+a},easeOutCubic:function(b,c,a,e,d){return e*((c=c/d-1)*c*c+1)+a}})})(jQuery);

