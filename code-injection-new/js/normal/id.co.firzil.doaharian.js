




            var jQT = new $.jQTouch({
                icon: 'jqtouch.png',
                icon4: 'jqtouch4.png',
                addGlossToIcon: false,
                startupScreen: 'jqt_startup.png',
                statusBar: 'black-translucent',
                preloadImages: ['splash.png']
            });
			
			$(document).ready(function(){
				$('#jqt ul li a').tap(function(){
				  $(this).css('background-color','#ec427a').css('color','#fff');
				});
				$('.backbutton').tap(function(){
				  $('#jqt ul li a').css('background-color','transparent').css('color','#13c6c4');
				});
				$('a[target="_blank"]').tap(function(){
				      var url = $(this).attr('href');
					  loadURL(url);
				});
				$('.swipeit .contents').swipeLeft(function(){
				    var nexdiv = $(this).children('*:nth-child(2)').attr('href');
				    jQT.goTo(nexdiv, 'slideleft');
				});
				$('.swipeit .contents').swipeRight(function(){
				    var prevdiv = $(this).children('*:nth-child(1)').attr('href');
				    jQT.goTo(prevdiv, 'slideright');
				});
				if (device.platform == 'Android') {
				    $('source').attr('src','/android_asset/www/'+$(this).attr('src'));
				}
				document.addEventListener("deviceready", onDeviceReady, false);
			});
			
			function loadURL(url){
				navigator.app.loadUrl(url, { openExternal:true, loadingDialog:"Loading.., Membuka Firzil.co.id" });
				return false;
			} 
			
			function onDeviceReady() {
				navigator.splashscreen.hide();
			}
			
			var media = null;
			
			function playAudio(src) {
				if (device.platform == 'Android') {
					src = '/android_asset/www/audio/' + src;
				}
				if (media) {
					media.stop();
					media = null;
				}

				media = new Media(src, success, error_error);
	 
				media.play();
			}
			
			function pauseAudio(){
			    if (media) {
					media.pause();
				}
			}
	 
			function success() {
				// ignore
			}
	 
			function error_error(e) {
				// ignore
			}
        

(function(b){function l(a){function i(){clearTimeout(f);c.unselect();j(c)}function g(b){j(c);clearTimeout(f);clearTimeout(m);Math.abs(h)<e.moveThreshold&&Math.abs(k)<e.moveThreshold&&n<e.pressDelay?d&&e.useFastTouch&&c.trigger("tap",b):c.unselect()}function o(){var b=d?event.changedTouches[0]:event;h=b.pageX-p;k=b.pageY-q;n=(new Date).getTime()-l;var b=Math.abs(h),a=Math.abs(k),g;b>a&&30<b&&1E3>n&&(g=0>h?"left":"right",j(c),c.trigger("swipe",{direction:g,deltaX:h,deltaY:k}));c.unselect();clearTimeout(f);
(b>e.moveThreshold||a>e.moveThreshold)&&clearTimeout(m)}function j(a){a&&(a.unbind(r,o).unbind(s,g),d?a.unbind(t,i):b(document).unbind("mouseout",i))}if(!u)return void 0!==window.console&&console.log("TouchStart handler aborted because tap is not ready"),a.preventDefault(),!1;var c=b(a.target);if(c.length){var l=(new Date).getTime(),f=null,m=null,p,q,h=0,k=0,n=0,a=d?event.changedTouches[0]:event;p=a.pageX;q=a.pageY;(function(a){a.bind(r,o).bind(s,g);d?a.bind(t,i):b(document).bind("mouseout",i)})(c);
f=setTimeout(function(){c.makeActive()},e.hoverDelay);m=setTimeout(function(){j(c);c.unselect();clearTimeout(f);c.trigger("press")},e.pressDelay)}else void 0!==window.console&&console.log("Could not find target of touchstart event.")}var d=!!window.Touch,v=d?"touchstart":"mousedown",r=d?"touchmove":"mousemove",s=d?"touchend":"mouseup",t=d?"touchcancel":"mouseout",u=!0,e={useFastTouch:!0,debug:!0,moveThreshold:10,hoverDelay:50,pressDelay:750};b.jQTouch=function(a){for(var d in a)e[d]=a[d];b(document).bind("ready",
function(){b("#jqt").bind(v,l)});b.fn.press=function(a){return b.isFunction(a)?b(this).live("press",a):b(this).trigger("press")};b.fn.swipe=function(a){return b.isFunction(a)?b(this).live("swipe",a):b(this).trigger("swipe")};b.fn.tap=function(a){return b.isFunction(a)?b(this).live("tap",a):b(this).trigger("tap")};a.framework=b;return jQTouchCore(a)};b.jQTouch.addExtension=function(a){jQTouchCore.prototype.extensions.push(a)}})(jQuery);


(function(){jQTouchCore=function(j){function n(a){"string"===typeof a.selector&&"string"===typeof a.name&&l.push(a)}function v(a,b){k.unshift({page:a,animation:b,hash:"#"+a.attr("id"),id:a.attr("id")})}function C(a){var b=c(a.target);b.is(h.join(", "))||(b=c(a.target).closest(h.join(", ")));b&&b.attr("href")&&!b.isExternalLink()&&a.preventDefault();c.support.touch||c(a.target).trigger("tap",a)}function w(a,b,d,g){function s(){var h=D;c.support.animationEvents&&d&&e.useAnimations?(a.unbind("webkitAnimationEnd",
s),a.removeClass("current "+f+" out"),b.removeClass(f),i.removeClass("animating animating3d"),!0===e.trackScrollPositions&&(b.css("top",-b.data("lastScroll")),setTimeout(function(){b.css("top",0);window.scroll(0,b.data("lastScroll"));c(".scroll",b).each(function(){this.scrollTop=-c(this).data("lastScroll")})},0))):(a.removeClass(f+" out current"),h+=260);setTimeout(function(){b.removeClass("in")},h);m=b;g?k.shift():v(m,d);a.unselect();x(m.attr("id"));b.trigger("pageAnimationEnd",{direction:"in",animation:d});
a.trigger("pageAnimationEnd",{direction:"out",animation:d})}g=g?g:!1;if(void 0===b||0===b.length||b.hasClass("current"))return c.fn.unselect(),!1;c(":focus").trigger("blur");a.trigger("pageAnimationStart",{direction:"out",back:g});b.trigger("pageAnimationStart",{direction:"in",back:g});if(c.support.animationEvents&&d&&e.useAnimations){if(!c.support.transform3d&&d.is3d)d.name=e.defaultAnimation;var f=d.name,h=d.is3d?"animating3d":"";g&&(f=f.replace(/left|right|up|down|in|out/,E));a.bind("webkitAnimationEnd",
s);i.addClass("animating "+h);h=window.pageYOffset;!0===e.trackScrollPositions&&b.css("top",window.pageYOffset-(b.data("lastScroll")||0));b.addClass(f+" in current");a.addClass(f+" out");!0===e.trackScrollPositions&&(a.data("lastScroll",h),c(".scroll",a).each(function(){c(this).data("lastScroll",this.scrollTop)}))}else b.addClass("current in"),s();return!0}function E(a){return{up:"down",down:"up",left:"right",right:"left","in":"out",out:"in"}[a]||a}function q(){1===k.length&&window.history.go(-1);
var a=k[0];return w(a.page,k[1].page,a.animation,!0)?o:!1}function p(a,b){var d=k[0].page;if("string"===typeof b)for(var g=0,e=l.length;g<e;g++)if(l[g].name===b){b=l[g];break}if("string"===typeof a){g=c(a);if(1>g.length){t(a,{animation:b});return}a=g}return w(d,a,b)?o:!1}function F(){if(location.hash===k[0].hash)return!0;if(""===location.hash||k[1]&&location.hash===k[1].hash)return q(),!0;p(c(location.hash),e.defaultAnimation)}function y(a){for(var b,d=0,c=l.length;d<c;d++)if(a.is(l[d].selector)){b=
l[d];break}if(!b)b=e.defaultAnimation;return b}function z(a,b){var d=null,e=document.createElement("div");e.innerHTML=a;c(e).children().each(function(){var a=c(this);a.attr("id")||a.attr("id","page-"+ ++G);c("#"+a.attr("id")).remove();i.append(a);i.trigger("pageInserted",{page:a});if(a.hasClass("current")||!d)d=a});return null!==d?(p(d,b),d):!1}function H(){i.css("minHeight",1E3);scrollTo(0,0);i.css("minHeight",window.innerHeight);r=90==Math.abs(window.orientation)?"landscape":"portrait";i.removeClass("portrait landscape").addClass(r).trigger("turn",
{orientation:r})}function x(a){location.hash="#"+a.replace(/^#/,"")}function t(a,b){var d=c.extend({},{data:null,method:"GET",animation:null,callback:null,$referrer:null},b);"#"!=a?c.ajax({url:a,data:d.data,type:d.method,success:function(a){if(a=z(a,d.animation))"GET"==d.method&&!0===e.cacheGetRequests&&d.$referrer&&d.$referrer.attr("href","#"+a.attr("id")),d.callback&&d.callback(!0)},error:function(){d.$referrer&&d.$referrer.unselect();d.callback&&d.callback(!1)}}):d.$referrer&&d.$referrer.unselect()}
function A(a,b){c(":focus").trigger("blur");a.preventDefault();var d="string"===typeof a?c(a).eq(0):a.target?c(a.target):c(a);return d.length&&d.is(e.formSelector)&&d.attr("action")?(t(d.attr("action"),{data:d.serialize(),method:d.attr("method")||"POST",animation:y(d),callback:b}),!1):!0}function I(a){a=a.closest("form");return 0!==a.length?(a.trigger("submit"),!1):!0}function J(){var a,b,d,c;a=document.getElementsByTagName("head")[0];b=document.body;d=document.createElement("style");d.textContent=
"@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-webkit-transform-3d){#jqt-3dtest{height:3px}}";c=document.createElement("div");c.id="jqt-3dtest";a.appendChild(d);b.appendChild(c);a=3===c.offsetHeight;d.parentNode.removeChild(d);c.parentNode.removeChild(c);return a}function K(a){var b=c(a.target),a=h.join(", ");b.is(a)||(b=b.closest(a));b.length&&b.attr("href")&&b.addClass("active");b.on(c.support.touch?"touchmove":"mousemove",function(){b.removeClass("active")});b.on("touchend",function(){b.unbind("touchmove mousemove")})}
function L(a){var b=c(a.target);b.is(h.join(", "))||(b=b.closest(h.join(", ")));if(!b.length||!b.attr("href"))return!1;var a=b.attr("target"),d=b.prop("hash"),g=b.attr("href"),f=null;if(b.isExternalLink())return b.unselect(),!0;if(b.is(e.backSelector))q(d);else if(b.is(e.submitSelector))I(b);else{if("_webapp"===a)return window.location=g,!1;if("#"===g)return b.unselect(),!0;f=y(b);d&&"#"!==d?(b.addClass("active"),p(c(d).data("referrer",b),f,b.hasClass("reverse"))):(b.addClass("loading active"),t(b.attr("href"),
{animation:f,callback:function(){b.removeClass("loading");setTimeout(c.fn.unselect,250,b)},$referrer:b}));return!1}}var c=j.framework,i,M=c("head"),k=[],G=0,e={},m="",r="portrait",h=[],o={},D=100,B=jQTouchCore.prototype.extensions,l=[],f="",u={addGlossToIcon:!0,backSelector:".back, .cancel, .goback",cacheGetRequests:!0,debug:!0,defaultAnimation:"slideleft",fixedViewport:!0,formSelector:"form",fullScreen:!0,fullScreenClass:"fullscreen",icon:null,icon4:null,preloadImages:!1,startupScreen:null,statusBar:"default",
submitSelector:".submit",touchSelector:"a, .touch",trackScrollPositions:!0,useAnimations:!0,useFastTouch:!0,useTouchScroll:!0,animations:[{name:"cubeleft",selector:".cubeleft, .cube",is3d:!0},{name:"cuberight",selector:".cuberight",is3d:!0},{name:"dissolve",selector:".dissolve"},{name:"fade",selector:".fade"},{name:"flipleft",selector:".flipleft, .flip",is3d:!0},{name:"flipright",selector:".flipright",is3d:!0},{name:"pop",selector:".pop",is3d:!0},{name:"swapleft",selector:".swap",is3d:!0},{name:"slidedown",
selector:".slidedown"},{name:"slideright",selector:".slideright"},{name:"slideup",selector:".slideup"},{name:"slideleft",selector:".slideleft, .slide, #jqt > * > ul li a"}]};(function(a){e=c.extend({},u,a);if(e.preloadImages)for(a=e.preloadImages.length-1;0<=a;a--)(new Image).src=e.preloadImages[a];a=e.addGlossToIcon?"":"-precomposed";e.icon&&(f+='<link rel="apple-touch-icon'+a+'" href="'+e.icon+'" />');e.icon4&&(f+='<link rel="apple-touch-icon'+a+'" sizes="114x114" href="'+e.icon4+'" />');e.startupScreen&&
(f+='<link rel="apple-touch-startup-image" href="'+e.startupScreen+'" />');e.fixedViewport&&(f+='<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>');e.fullScreen&&(f+='<meta name="apple-mobile-web-app-capable" content="yes" />',e.statusBar&&(f+='<meta name="apple-mobile-web-app-status-bar-style" content="'+e.statusBar+'" />'));f&&M.prepend(f)})(j);c(document).ready(function(){if(!c.support)c.support={};c.support.animationEvents="undefined"!=
typeof window.WebKitAnimationEvent;c.support.touch="undefined"!=typeof window.TouchEvent&&-1<window.navigator.userAgent.indexOf("Mobile")&&e.useFastTouch;c.support.transform3d=J();c.support.ios5=/OS (5(_\d+)*) like Mac OS X/i.test(window.navigator.userAgent);c.fn.isExternalLink=function(){var a=c(this);return"_blank"==a.attr("target")||"external"==a.attr("rel")||a.is('a[href^="http://maps.google.com"], a[href^="mailto:"], a[href^="tel:"], a[href^="javascript:"], a[href*="youtube.com/v"], a[href*="youtube.com/watch"]')};
c.fn.makeActive=function(){return c(this).addClass("active")};c.fn.unselect=function(a){a?a.removeClass("active"):c(".active").removeClass("active")};for(var a=0,b=B.length;a<b;a++){var d=B[a];c.isFunction(d)&&c.extend(o,d(o))}a=0;for(b=u.animations.length;a<b;a++){d=u.animations[a];if(void 0!==e[d.name+"Selector"])d.selector=e[d.name+"Selector"];n(d)}h.push(e.touchSelector);h.push(e.backSelector);h.push(e.submitSelector);c(h.join(", ")).css("-webkit-touch-callout","none");i=c("#jqt");a=[];0===i.length&&
(i=c(document.body).attr("id","jqt"));c.support.transform3d&&a.push("supports3d");c.support.ios5&&e.useTouchScroll&&a.push("touchscroll");e.fullScreenClass&&!0===window.navigator.standalone&&a.push(e.fullScreenClass,e.statusBar);i.addClass(a.join(" ")).bind("click",C).bind("orientationchange",H).bind("submit",A).bind("tap",L).bind(c.support.touch?"touchstart":"mousedown",K).trigger("orientationchange");c(window).bind("hashchange",F);a=location.hash;m=0===c("#jqt > .current").length?c("#jqt > *:first-child").addClass("current"):
c("#jqt > .current");x(m.attr("id"));v(m);1===c(a).length&&p(a)});return o={addAnimation:n,animations:l,getOrientation:function(){return r},goBack:q,insertPages:z,goTo:p,history:k,settings:e,submitForm:A}};jQTouchCore.prototype.extensions=[];window.Zepto&&function(j){j.jQTouch=function(n){n.framework=j;return jQTouchCore(n)};j.fn.prop=j.fn.attr;j.jQTouch.addExtension=function(j){jQTouchCore.prototype.extensions.push(j)}}(Zepto)})();

