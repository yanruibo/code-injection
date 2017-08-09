
























var config = {};
$.extend(config, {
	fmx: {
		fmx_dialog: $.extend({
			
		}, lang.fmx.fmx_dialog),
		fmx_dialog_action: {},
		fmx_notification: {}
	}
});

jQuery(function($){
        $.datepicker.regional['es'] = {
                closeText: 'Cerrar',
                prevText: '&#x3c;Ant',
                nextText: 'Sig&#x3e;',
                currentText: 'Hoy',
                monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
                'Jul','Ago','Sep','Oct','Nov','Dic'],
                dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
                dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
                dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
                weekHeader: 'Sm',
                dateFormat: 'dd/mm/yy',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''};
        $.datepicker.setDefaults($.datepicker.regional['es']);
});

var lang = {};
$.extend(lang, {
	server_error: "Ocurri&oacute; un error con el servidor. Por favor intent m&aacute;s tarde",
	not_found: "No se encontraron registros",
	loading: "Cargando",
	fmx: {
		fmx_dialog: {
			close_label: "Cerrar"
		}
	}
});

/* jquery.nicescroll 3.1.0 InuYaksa*2012 MIT http://areaaperta.com/nicescroll */(function(e){var r=false,w=false,B=5E3,C=2E3,D=function(){var e=document.getElementsByTagName("script"),e=e[e.length-1].src.split("?")[0];return e.split("/").length>0?e.split("/").slice(0,-1).join("/")+"/":""}(),p=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||false,q=window.cancelRequestAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||
window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||false,x=false,E=function(){if(x)return x;var e=document.createElement("DIV"),c={haspointerlock:"pointerLockElement"in document||"mozPointerLockElement"in document||"webkitPointerLockElement"in document};c.isopera="opera"in window;c.isopera12=c.isopera&&"getUserMedia"in navigator;c.isie="all"in document&&"attachEvent"in e&&!c.isopera;c.isieold=c.isie&&!("msInterpolationMode"in e.style);c.isie7=c.isie&&!c.isieold&&(!("documentMode"in
document)||document.documentMode==7);c.isie8=c.isie&&"documentMode"in document&&document.documentMode==8;c.isie9=c.isie&&"performance"in window&&document.documentMode>=9;c.isie10=c.isie&&"performance"in window&&document.documentMode>=10;c.isie9mobile=/iemobile.9/i.test(navigator.userAgent);if(c.isie9mobile)c.isie9=false;c.isie7mobile=!c.isie9mobile&&c.isie7&&/iemobile/i.test(navigator.userAgent);c.ismozilla="MozAppearance"in e.style;c.iswebkit="WebkitAppearance"in e.style;c.ischrome="chrome"in window;
c.ischrome22=c.ischrome&&c.haspointerlock;c.cantouch="ontouchstart"in document.documentElement||"ontouchstart"in window;c.hasmstouch=window.navigator.msPointerEnabled||false;c.ismac=/^mac$/i.test(navigator.platform);c.isios=c.cantouch&&/iphone|ipad|ipod/i.test(navigator.platform);c.isios4=c.isios&&!("seal"in Object);c.isandroid=/android/i.test(navigator.userAgent);c.trstyle=false;c.hastransform=false;c.hastranslate3d=false;c.transitionstyle=false;c.hastransition=false;c.transitionend=false;for(var h=
["transform","msTransform","webkitTransform","MozTransform","OTransform"],i=0;i<h.length;i++)if(typeof e.style[h[i]]!="undefined"){c.trstyle=h[i];break}c.hastransform=c.trstyle!=false;if(c.hastransform)e.style[c.trstyle]="translate3d(1px,2px,3px)",c.hastranslate3d=/translate3d/.test(e.style[c.trstyle]);c.transitionstyle=false;c.prefixstyle="";c.transitionend=false;for(var h="transition,webkitTransition,MozTransition,OTransition,OTransition,msTransition,KhtmlTransition".split(","),b=",-webkit-,-moz-,-o-,-o,-ms-,-khtml-".split(","),
n="transitionend,webkitTransitionEnd,transitionend,otransitionend,oTransitionEnd,msTransitionEnd,KhtmlTransitionEnd".split(","),i=0;i<h.length;i++)if(h[i]in e.style){c.transitionstyle=h[i];c.prefixstyle=b[i];c.transitionend=n[i];break}c.hastransition=c.transitionstyle;a:{h=["-moz-grab","-webkit-grab","grab"];if(c.ischrome&&!c.ischrome22||c.isie)h=[];for(i=0;i<h.length;i++)if(b=h[i],e.style.cursor=b,e.style.cursor==b){h=b;break a}h="url(http://www.google.com/intl/en_ALL/mapfiles/openhand.cur),n-resize"}c.cursorgrabvalue=
h;c.hasmousecapture="setCapture"in e;return x=c},F=function(j,c){function h(d,c,f){c=d.css(c);d=parseFloat(c);return isNaN(d)?(d=o[c]||0,f=d==3?f?b.win.outerHeight()-b.win.innerHeight():b.win.outerWidth()-b.win.innerWidth():1,b.isie8&&d&&(d+=1),f?d:0):d}function i(d,c){var f=0,g=0,e=1;"wheelDeltaY"in d?(e=b.opt.mousescrollstep/48,f=Math.floor(d.wheelDeltaX*e),g=Math.floor(d.wheelDeltaY*e)):(e=d.detail?d.detail*-1:d.wheelDelta/40)&&(c?f=Math.floor(e*b.opt.mousescrollstep):g=Math.floor(e*b.opt.mousescrollstep));
f&&(b.scrollmom&&b.scrollmom.stop(),b.lastdeltax+=f,b.synched("mousewheelx",function(){var d=b.lastdeltax;b.lastdeltax=0;b.rail.drag||b.doScrollLeftBy(d)}));g&&(b.scrollmom&&b.scrollmom.stop(),b.lastdeltay+=g,b.synched("mousewheely",function(){var d=b.lastdeltay;b.lastdeltay=0;b.rail.drag||b.doScrollBy(d)}))}var b=this;this.version="3.1.0";this.name="nicescroll";this.me=c;this.opt={doc:e("body"),win:false,zindex:9E3,cursoropacitymin:0,cursoropacitymax:1,cursorcolor:"#424242",cursorwidth:"5px",cursorborder:"1px solid #fff",
cursorborderradius:"5px",scrollspeed:60,mousescrollstep:24,touchbehavior:false,hwacceleration:true,usetransition:true,boxzoom:false,dblclickzoom:true,gesturezoom:true,grabcursorenabled:true,autohidemode:true,background:"",iframeautoresize:true,cursorminheight:32,preservenativescrolling:true,railoffset:false,bouncescroll:true,spacebarenabled:true,railpadding:{top:0,right:0,left:0,bottom:0},disableoutline:true,horizrailenabled:true,railalign:"right",railvalign:"bottom",enabletranslate3d:true,enablemousewheel:true,
enablekeyboard:true,smoothscroll:true,sensitiverail:true};this.opt.snapbackspeed=80;if(j)for(var n in b.opt)typeof j[n]!="undefined"&&(b.opt[n]=j[n]);this.iddoc=(this.doc=b.opt.doc)&&this.doc[0]?this.doc[0].id||"":"";this.ispage=/BODY|HTML/.test(b.opt.win?b.opt.win[0].nodeName:this.doc[0].nodeName);this.haswrapper=b.opt.win!==false;this.win=b.opt.win||(this.ispage?e(window):this.doc);this.docscroll=this.ispage&&!this.haswrapper?e(window):this.win;this.body=e("body");this.iframe=this.isfixed=this.viewport=
false;this.isiframe=this.doc[0].nodeName=="IFRAME"&&this.win[0].nodeName=="IFRAME";this.istextarea=this.win[0].nodeName=="TEXTAREA";this.forcescreen=false;this.canshowonmouseevent=b.opt.autohidemode!="scroll";this.page=this.view=this.onzoomout=this.onzoomin=this.onscrollcancel=this.onscrollend=this.onscrollstart=this.onclick=this.ongesturezoom=this.onkeypress=this.onmousewheel=this.onmousemove=this.onmouseup=this.onmousedown=false;this.scroll={x:0,y:0};this.scrollratio={x:0,y:0};this.cursorheight=
20;this.scrollvaluemax=0;this.observer=this.scrollmom=this.scrollrunning=false;do this.id="ascrail"+C++;while(document.getElementById(this.id));this.hasmousefocus=this.hasfocus=this.zoomactive=this.zoom=this.cursorfreezed=this.cursor=this.rail=false;this.visibility=true;this.hidden=this.locked=false;this.cursoractive=true;this.nativescrollingarea=false;this.events=[];this.saved={};this.delaylist={};this.synclist={};this.lastdeltay=this.lastdeltax=0;this.detected=E();var g=e.extend({},this.detected);
this.ishwscroll=(this.canhwscroll=g.hastransform&&b.opt.hwacceleration)&&b.haswrapper;this.istouchcapable=false;if(g.cantouch&&g.ischrome&&!g.isios&&!g.isandroid)this.istouchcapable=true,g.cantouch=false;if(g.cantouch&&g.ismozilla&&!g.isios)this.istouchcapable=true,g.cantouch=false;this.delayed=function(d,c,f,g){var e=b.delaylist[d],h=(new Date).getTime();if(!g&&e&&e.tt)return false;e&&e.tt&&clearTimeout(e.tt);if(e&&e.last+f>h&&!e.tt)b.delaylist[d]={last:h+f,tt:setTimeout(function(){b.delaylist[d].tt=
0;c.call()},f)};else if(!e||!e.tt)b.delaylist[d]={last:h,tt:0},setTimeout(function(){c.call()},0)};this.synched=function(d,c){b.synclist[d]=c;(function(){if(!b.onsync)p(function(){b.onsync=false;for(d in b.synclist){var c=b.synclist[d];c&&c.call(b);b.synclist[d]=false}}),b.onsync=true})();return d};this.unsynched=function(d){b.synclist[d]&&(b.synclist[d]=false)};this.css=function(d,c){for(var f in c)b.saved.css.push([d,f,d.css(f)]),d.css(f,c[f])};this.scrollTop=function(d){return typeof d=="undefined"?
b.getScrollTop():b.setScrollTop(d)};this.scrollLeft=function(d){return typeof d=="undefined"?b.getScrollLeft():b.setScrollLeft(d)};BezierClass=function(b,c,f,g,e,h,i){this.st=b;this.ed=c;this.spd=f;this.p1=g||0;this.p2=e||1;this.p3=h||0;this.p4=i||1;this.ts=(new Date).getTime();this.df=this.ed-this.st};BezierClass.prototype={B2:function(b){return 3*b*b*(1-b)},B3:function(b){return 3*b*(1-b)*(1-b)},B4:function(b){return(1-b)*(1-b)*(1-b)},getNow:function(){var b=1-((new Date).getTime()-this.ts)/this.spd,
c=this.B2(b)+this.B3(b)+this.B4(b);return b<0?this.ed:this.st+Math.round(this.df*c)},update:function(b,c){this.st=this.getNow();this.ed=b;this.spd=c;this.ts=(new Date).getTime();this.df=this.ed-this.st;return this}};if(this.ishwscroll){this.doc.translate={x:0,y:0,tx:"0px",ty:"0px"};g.hastranslate3d&&g.isios&&this.doc.css("-webkit-backface-visibility","hidden");var m=function(){var d=b.doc.css(g.trstyle);return d&&d.substr(0,6)=="matrix"?d.replace(/^.*\((.*)\)$/g,"$1").replace(/px/g,"").split(/, +/):
false};this.getScrollTop=function(d){if(!d){if(d=m())return d.length==16?-d[13]:-d[5];if(b.timerscroll&&b.timerscroll.bz)return b.timerscroll.bz.getNow()}return b.doc.translate.y};this.getScrollLeft=function(d){if(!d){if(d=m())return d.length==16?-d[12]:-d[4];if(b.timerscroll&&b.timerscroll.bh)return b.timerscroll.bh.getNow()}return b.doc.translate.x};this.notifyScrollEvent=document.createEvent?function(b){var c=document.createEvent("UIEvents");c.initUIEvent("scroll",false,true,window,1);b.dispatchEvent(c)}:
document.fireEvent?function(b){var c=document.createEventObject();b.fireEvent("onscroll");c.cancelBubble=true}:function(){};g.hastranslate3d&&b.opt.enabletranslate3d?(this.setScrollTop=function(d,c){b.doc.translate.y=d;b.doc.translate.ty=d*-1+"px";b.doc.css(g.trstyle,"translate3d("+b.doc.translate.tx+","+b.doc.translate.ty+",0px)");c||b.notifyScrollEvent(b.win[0])},this.setScrollLeft=function(d,c){b.doc.translate.x=d;b.doc.translate.tx=d*-1+"px";b.doc.css(g.trstyle,"translate3d("+b.doc.translate.tx+
","+b.doc.translate.ty+",0px)");c||b.notifyScrollEvent(b.win[0])}):(this.setScrollTop=function(d,c){b.doc.translate.y=d;b.doc.translate.ty=d*-1+"px";b.doc.css(g.trstyle,"translate("+b.doc.translate.tx+","+b.doc.translate.ty+")");c||b.notifyScrollEvent(b.win[0])},this.setScrollLeft=function(d,c){b.doc.translate.x=d;b.doc.translate.tx=d*-1+"px";b.doc.css(g.trstyle,"translate("+b.doc.translate.tx+","+b.doc.translate.ty+")");c||b.notifyScrollEvent(b.win[0])})}else this.getScrollTop=function(){return b.docscroll.scrollTop()},
this.setScrollTop=function(d){return b.docscroll.scrollTop(d)},this.getScrollLeft=function(){return b.docscroll.scrollLeft()},this.setScrollLeft=function(d){return b.docscroll.scrollLeft(d)};this.getTarget=function(b){return!b?false:b.target?b.target:b.srcElement?b.srcElement:false};this.hasParent=function(b,c){if(!b)return false;for(var f=b.target||b.srcElement||b||false;f&&f.id!=c;)f=f.parentNode||false;return f!==false};var o={thin:1,medium:3,thick:5};this.getOffset=function(){if(b.isfixed)return{top:parseFloat(b.win.css("top")),
left:parseFloat(b.win.css("left"))};if(!b.viewport)return b.win.offset();var d=b.win.offset(),c=b.viewport.offset();return{top:d.top-c.top+b.viewport.scrollTop(),left:d.left-c.left+b.viewport.scrollLeft()}};this.updateScrollBar=function(d){if(b.ishwscroll)b.rail.css({height:b.win.innerHeight()}),b.railh&&b.railh.css({width:b.win.innerWidth()});else{var c=b.getOffset(),f=c.top,g=c.left;f+=h(b.win,"border-top-width",true);b.win.outerWidth();b.win.innerWidth();g+=b.rail.align?b.win.outerWidth()-h(b.win,
"border-right-width")-b.rail.width:h(b.win,"border-left-width");var e=b.opt.railoffset;e&&(e.top&&(f+=e.top),b.rail.align&&e.left&&(g+=e.left));b.locked||b.rail.css({top:f,left:g,height:d?d.h:b.win.innerHeight()});b.zoom&&b.zoom.css({top:f+1,left:b.rail.align==1?g-20:g+b.rail.width+4});if(b.railh&&!b.locked)f=c.top,g=c.left,d=b.railh.align?f+h(b.win,"border-top-width",true)+b.win.innerHeight()-b.railh.height:f+h(b.win,"border-top-width",true),g+=h(b.win,"border-left-width"),b.railh.css({top:d,left:g,
width:b.railh.width})}};this.doRailClick=function(d,c,f){var g;!(b.rail.drag&&b.rail.drag.pt!=1)&&!b.locked&&!b.rail.drag&&(b.cancelScroll(),b.cancelEvent(d),c?(c=f?b.doScrollLeft:b.doScrollTop,g=f?(d.pageX-b.railh.offset().left-b.cursorwidth/2)*b.scrollratio.x:(d.pageY-b.rail.offset().top-b.cursorheight/2)*b.scrollratio.y,c(g)):(c=f?b.doScrollLeftBy:b.doScrollBy,g=f?b.scroll.x:b.scroll.y,d=f?d.pageX-b.railh.offset().left:d.pageY-b.rail.offset().top,f=f?b.view.w:b.view.h,g>=d?c(f):c(-f)))};b.hasanimationframe=
p;b.hascancelanimationframe=q;b.hasanimationframe?b.hascancelanimationframe||(q=function(){b.cancelAnimationFrame=true}):(p=function(b){return setTimeout(b,16)},q=clearInterval);this.init=function(){b.saved.css=[];if(g.isie7mobile)return true;g.hasmstouch&&b.css(b.ispage?e("html"):b.win,{"-ms-touch-action":"none"});if(!b.ispage||!g.cantouch&&!g.isieold&&!g.isie9mobile){var d=b.docscroll;b.ispage&&(d=b.haswrapper?b.win:b.doc);g.isie9mobile||b.css(d,{"overflow-y":"hidden"});b.ispage&&g.isie7&&(b.doc[0].nodeName==
"BODY"?b.css(e("html"),{"overflow-y":"hidden"}):b.doc[0].nodeName=="HTML"&&b.css(e("body"),{"overflow-y":"hidden"}));g.isios&&!b.ispage&&!b.haswrapper&&b.css(e("body"),{"-webkit-overflow-scrolling":"touch"});var c=e(document.createElement("div"));c.css({position:"relative",top:0,"float":"right",width:b.opt.cursorwidth,height:"0px","background-color":b.opt.cursorcolor,border:b.opt.cursorborder,"background-clip":"padding-box","-webkit-border-radius":b.opt.cursorborderradius,"-moz-border-radius":b.opt.cursorborderradius,
"border-radius":b.opt.cursorborderradius});c.hborder=parseFloat(c.outerHeight()-c.innerHeight());b.cursor=c;var f=e(document.createElement("div"));f.attr("id",b.id);var h,i,j=["left","right"],y;for(y in j)i=j[y],(h=b.opt.railpadding[i])?f.css("padding-"+i,h+"px"):b.opt.railpadding[i]=0;f.append(c);f.width=Math.max(parseFloat(b.opt.cursorwidth),c.outerWidth())+b.opt.railpadding.left+b.opt.railpadding.right;f.css({width:f.width+"px",zIndex:b.ispage?b.opt.zindex:b.opt.zindex+2,background:b.opt.background});
f.visibility=true;f.scrollable=true;f.align=b.opt.railalign=="left"?0:1;b.rail=f;c=b.rail.drag=false;if(b.opt.boxzoom&&!b.ispage&&!g.isieold&&(c=document.createElement("div"),b.bind(c,"click",b.doZoom),b.zoom=e(c),b.zoom.css({cursor:"pointer","z-index":b.opt.zindex,backgroundImage:"url("+D+"zoomico.png)",height:18,width:18,backgroundPosition:"0px 0px"}),b.opt.dblclickzoom&&b.bind(b.win,"dblclick",b.doZoom),g.cantouch&&b.opt.gesturezoom))b.ongesturezoom=function(d){d.scale>1.5&&b.doZoomIn(d);d.scale<
0.8&&b.doZoomOut(d);return b.cancelEvent(d)},b.bind(b.win,"gestureend",b.ongesturezoom);b.railh=false;if(b.opt.horizrailenabled){b.css(d,{"overflow-x":"hidden"});c=e(document.createElement("div"));c.css({position:"relative",top:0,height:b.opt.cursorwidth,width:"0px","background-color":b.opt.cursorcolor,border:b.opt.cursorborder,"background-clip":"padding-box","-webkit-border-radius":b.opt.cursorborderradius,"-moz-border-radius":b.opt.cursorborderradius,"border-radius":b.opt.cursorborderradius});c.wborder=
parseFloat(c.outerWidth()-c.innerWidth());b.cursorh=c;var k=e(document.createElement("div"));k.attr("id",b.id+"-hr");k.height=1+Math.max(parseFloat(b.opt.cursorwidth),c.outerHeight());k.css({height:k.height+"px",zIndex:b.ispage?b.opt.zindex:b.opt.zindex+2,background:b.opt.background});k.append(c);k.visibility=true;k.scrollable=true;k.align=b.opt.railvalign=="top"?0:1;b.railh=k;b.railh.drag=false}if(b.ispage)f.css({position:"fixed",top:"0px",height:"100%"}),f.align?f.css({right:"0px"}):f.css({left:"0px"}),
b.body.append(f),b.railh&&(k.css({position:"fixed",left:"0px",width:"100%"}),k.align?k.css({bottom:"0px"}):k.css({top:"0px"}),b.body.append(k));else{if(b.ishwscroll)b.win.css("position")=="static"&&b.css(b.win,{position:"relative"}),d=b.win[0].nodeName=="HTML"?b.body:b.win,b.zoom&&(b.zoom.css({position:"absolute",top:1,right:0,"margin-right":f.width+4}),d.append(b.zoom)),f.css({position:"absolute",top:0}),f.align?f.css({right:0}):f.css({left:0}),d.append(f),k&&(k.css({position:"absolute",left:0,bottom:0}),
k.align?k.css({bottom:0}):k.css({top:0}),d.append(k));else{b.isfixed=b.win.css("position")=="fixed";d=b.isfixed?"fixed":"absolute";if(!b.isfixed)b.viewport=b.getViewport(b.win[0]);if(b.viewport)b.body=b.viewport;f.css({position:d});b.zoom&&b.zoom.css({position:d});b.updateScrollBar();b.body.append(f);b.zoom&&b.body.append(b.zoom);b.railh&&(k.css({position:d}),b.body.append(k))}g.isios&&b.css(b.win,{"-webkit-tap-highlight-color":"rgba(0,0,0,0)","-webkit-touch-callout":"none"});g.isie&&b.opt.disableoutline&&
b.win.attr("hideFocus","true");g.iswebkit&&b.opt.disableoutline&&b.win.css({outline:"none"})}if(b.opt.autohidemode===false)b.autohidedom=false;else if(b.opt.autohidemode===true){if(b.autohidedom=e().add(b.rail),b.railh)b.autohidedom=b.autohidedom.add(b.railh)}else if(b.opt.autohidemode=="scroll"){if(b.autohidedom=e().add(b.rail),b.railh)b.autohidedom=b.autohidedom.add(b.railh)}else if(b.opt.autohidemode=="cursor"){if(b.autohidedom=e().add(b.cursor),b.railh)b.autohidedom=b.autohidedom.add(b.railh.cursor)}else if(b.opt.autohidemode==
"hidden")b.autohidedom=false,b.hide(),b.locked=false;if(g.isie9mobile)b.scrollmom=new z(b),b.onmangotouch=function(){var d=b.getScrollTop(),c=b.getScrollLeft();if(d==b.scrollmom.lastscrolly&&c==b.scrollmom.lastscrollx)return true;var f=d-b.mangotouch.sy,l=c-b.mangotouch.sx;if(Math.round(Math.sqrt(Math.pow(l,2)+Math.pow(f,2)))!=0){var g=f<0?-1:1,e=l<0?-1:1,h=+new Date;b.mangotouch.lazy&&clearTimeout(b.mangotouch.lazy);if(h-b.mangotouch.tm>80||b.mangotouch.dry!=g||b.mangotouch.drx!=e)b.scrollmom.stop(),
b.scrollmom.reset(c,d),b.mangotouch.sy=d,b.mangotouch.ly=d,b.mangotouch.sx=c,b.mangotouch.lx=c,b.mangotouch.dry=g,b.mangotouch.drx=e,b.mangotouch.tm=h;else if(b.scrollmom.stop(),b.scrollmom.update(b.mangotouch.sx-l,b.mangotouch.sy-f),b.mangotouch.tm=h,f=Math.max(Math.abs(b.mangotouch.ly-d),Math.abs(b.mangotouch.lx-c)),b.mangotouch.ly=d,b.mangotouch.lx=c,f>2)b.mangotouch.lazy=setTimeout(function(){b.mangotouch.lazy=false;b.mangotouch.dry=0;b.mangotouch.drx=0;b.mangotouch.tm=0;b.scrollmom.doMomentum(30)},
100)}},f=b.getScrollTop(),k=b.getScrollLeft(),b.mangotouch={sy:f,ly:f,dry:0,sx:k,lx:k,drx:0,lazy:false,tm:0},b.bind(b.docscroll,"scroll",b.onmangotouch);else{if(g.cantouch||b.istouchcapable||b.opt.touchbehavior||g.hasmstouch){b.scrollmom=new z(b);b.ontouchstart=function(d){if(d.pointerType&&d.pointerType!=2)return false;if(!b.locked){if(g.hasmstouch)for(var c=d.target?d.target:false;c;){var f=e(c).getNiceScroll();if(f.length>0&&f[0].me==b.me)break;if(f.length>0)return false;if(c.nodeName=="DIV"&&
c.id==b.id)break;c=c.parentNode?c.parentNode:false}b.cancelScroll();if((c=b.getTarget(d))&&/INPUT/i.test(c.nodeName)&&/range/i.test(c.type))return b.stopPropagation(d);if(!("clientX"in d)&&"changedTouches"in d)d.clientX=d.changedTouches[0].clientX,d.clientY=d.changedTouches[0].clientY;if(b.forcescreen)f=d,d={original:d.original?d.original:d},d.clientX=f.screenX,d.clientY=f.screenY;b.rail.drag={x:d.clientX,y:d.clientY,sx:b.scroll.x,sy:b.scroll.y,st:b.getScrollTop(),sl:b.getScrollLeft(),pt:2};b.opt.touchbehavior&&
b.isiframe&&g.isie&&(f=b.win.position(),b.rail.drag.x+=f.left,b.rail.drag.y+=f.top);b.hasmoving=false;b.lastmouseup=false;b.scrollmom.reset(d.clientX,d.clientY);if(!g.cantouch&&!this.istouchcapable&&!g.hasmstouch){if(!c||!/INPUT|SELECT|TEXTAREA/i.test(c.nodeName))return!b.ispage&&g.hasmousecapture&&c.setCapture(),b.cancelEvent(d);if(/SUBMIT|CANCEL|BUTTON/i.test(e(c).attr("type")))pc={tg:c,click:false},b.preventclick=pc}}};b.ontouchend=function(d){if(d.pointerType&&d.pointerType!=2)return false;if(b.rail.drag&&
b.rail.drag.pt==2&&(b.scrollmom.doMomentum(),b.rail.drag=false,b.hasmoving&&(b.hasmoving=false,b.lastmouseup=true,b.hideCursor(),g.hasmousecapture&&document.releaseCapture(),!g.cantouch)))return b.cancelEvent(d)};var n=b.opt.touchbehavior&&b.isiframe&&!g.hasmousecapture;b.ontouchmove=function(d,c){if(d.pointerType&&d.pointerType!=2)return false;if(b.rail.drag&&b.rail.drag.pt==2){if(g.cantouch&&typeof d.original=="undefined")return true;b.hasmoving=true;if(b.preventclick&&!b.preventclick.click)b.preventclick.click=
b.preventclick.tg.onclick||false,b.preventclick.tg.onclick=b.onpreventclick;d=e.extend({original:d},d);if("changedTouches"in d)d.clientX=d.changedTouches[0].clientX,d.clientY=d.changedTouches[0].clientY;if(b.forcescreen){var f=d,d={original:d.original?d.original:d};d.clientX=f.screenX;d.clientY=f.screenY}f=ofy=0;if(n&&!c){var l=b.win.position(),f=-l.left;ofy=-l.top}var h=d.clientY+ofy,i=b.rail.drag.st-(h-b.rail.drag.y);if(b.ishwscroll&&b.opt.bouncescroll)i<0?i=Math.round(i/2):i>b.page.maxh&&(i=b.page.maxh+
Math.round((i-b.page.maxh)/2));else if(i<0&&(h=i=0),i>b.page.maxh)i=b.page.maxh,h=0;var s=d.clientX+f;if(b.railh&&b.railh.scrollable){var j=b.rail.drag.sl-(s-b.rail.drag.x);if(b.ishwscroll&&b.opt.bouncescroll)j<0?j=Math.round(j/2):j>b.page.maxw&&(j=b.page.maxw+Math.round((j-b.page.maxw)/2));else if(j<0&&(s=j=0),j>b.page.maxw)j=b.page.maxw,s=0}b.synched("touchmove",function(){b.rail.drag&&b.rail.drag.pt==2&&(b.prepareTransition&&b.prepareTransition(0),b.rail.scrollable&&b.setScrollTop(i),b.scrollmom.update(s,
h),b.railh&&b.railh.scrollable?(b.setScrollLeft(j),b.showCursor(i,j)):b.showCursor(i),g.isie10&&document.selection.clear())});if(!g.ischrome&&!b.istouchcapable)return b.cancelEvent(d)}}}g.cantouch||b.opt.touchbehavior?(b.onpreventclick=function(d){if(b.preventclick)return b.preventclick.tg.onclick=b.preventclick.click,b.preventclick=false,b.cancelEvent(d)},b.onmousedown=b.ontouchstart,b.onmouseup=b.ontouchend,b.onclick=g.isios?false:function(d){return b.lastmouseup?(b.lastmouseup=false,b.cancelEvent(d)):
true},b.onmousemove=b.ontouchmove,g.cursorgrabvalue&&(b.css(b.ispage?b.doc:b.win,{cursor:g.cursorgrabvalue}),b.css(b.rail,{cursor:g.cursorgrabvalue}))):(b.onmousedown=function(d,c){if(!(b.rail.drag&&b.rail.drag.pt!=1)){if(b.locked)return b.cancelEvent(d);b.cancelScroll();b.rail.drag={x:d.clientX,y:d.clientY,sx:b.scroll.x,sy:b.scroll.y,pt:1,hr:!!c};var f=b.getTarget(d);!b.ispage&&g.hasmousecapture&&f.setCapture();if(b.isiframe&&!g.hasmousecapture)b.saved.csspointerevents=b.doc.css("pointer-events"),
b.css(b.doc,{"pointer-events":"none"});return b.cancelEvent(d)}},b.onmouseup=function(d){if(b.rail.drag&&(g.hasmousecapture&&document.releaseCapture(),b.isiframe&&!g.hasmousecapture&&b.doc.css("pointer-events",b.saved.csspointerevents),b.rail.drag.pt==1))return b.rail.drag=false,b.cancelEvent(d)},b.onmousemove=function(d){if(b.rail.drag){if(b.rail.drag.pt==1){if(g.ischrome&&d.which==0)return b.onmouseup(d);b.cursorfreezed=true;if(b.rail.drag.hr){b.scroll.x=b.rail.drag.sx+(d.clientX-b.rail.drag.x);
if(b.scroll.x<0)b.scroll.x=0;var c=b.scrollvaluemaxw;if(b.scroll.x>c)b.scroll.x=c}else{b.scroll.y=b.rail.drag.sy+(d.clientY-b.rail.drag.y);if(b.scroll.y<0)b.scroll.y=0;c=b.scrollvaluemax;if(b.scroll.y>c)b.scroll.y=c}b.synched("mousemove",function(){b.rail.drag&&b.rail.drag.pt==1&&(b.showCursor(),b.rail.drag.hr?b.doScrollLeft(Math.round(b.scroll.x*b.scrollratio.x)):b.doScrollTop(Math.round(b.scroll.y*b.scrollratio.y)))});return b.cancelEvent(d)}}else b.checkarea=true});(g.cantouch||b.opt.touchbehavior)&&
b.bind(b.win,"mousedown",b.onmousedown);g.hasmstouch&&(b.css(b.rail,{"-ms-touch-action":"none"}),b.css(b.cursor,{"-ms-touch-action":"none"}),b.bind(b.win,"MSPointerDown",b.ontouchstart),b.bind(document,"MSPointerUp",b.ontouchend),b.bind(document,"MSPointerMove",b.ontouchmove),b.bind(b.cursor,"MSGestureHold",function(b){b.preventDefault()}),b.bind(b.cursor,"contextmenu",function(b){b.preventDefault()}));this.istouchcapable&&(b.bind(b.win,"touchstart",b.ontouchstart),b.bind(document,"touchend",b.ontouchend),
b.bind(document,"touchcancel",b.ontouchend),b.bind(document,"touchmove",b.ontouchmove));b.bind(b.cursor,"mousedown",b.onmousedown);b.bind(b.cursor,"mouseup",b.onmouseup);b.railh&&(b.bind(b.cursorh,"mousedown",function(d){b.onmousedown(d,true)}),b.bind(b.cursorh,"mouseup",function(d){if(!(b.rail.drag&&b.rail.drag.pt==2))return b.rail.drag=false,b.hasmoving=false,b.hideCursor(),g.hasmousecapture&&document.releaseCapture(),b.cancelEvent(d)}));b.bind(document,"mouseup",b.onmouseup);g.hasmousecapture&&
b.bind(b.win,"mouseup",b.onmouseup);b.bind(document,"mousemove",b.onmousemove);b.onclick&&b.bind(document,"click",b.onclick);!g.cantouch&&!b.opt.touchbehavior&&(b.rail.mouseenter(function(){b.canshowonmouseevent&&b.showCursor();b.rail.active=true}),b.rail.mouseleave(function(){b.rail.active=false;b.rail.drag||b.hideCursor()}),b.opt.sensitiverail&&(b.rail.click(function(d){b.doRailClick(d,false,false)}),b.rail.dblclick(function(d){b.doRailClick(d,true,false)}),b.cursor.click(function(d){b.cancelEvent(d)}),
b.cursor.dblclick(function(d){b.cancelEvent(d)})),b.railh&&(b.railh.mouseenter(function(){b.canshowonmouseevent&&b.showCursor();b.rail.active=true}),b.railh.mouseleave(function(){b.rail.active=false;b.rail.drag||b.hideCursor()})),b.zoom&&(b.zoom.mouseenter(function(){b.canshowonmouseevent&&b.showCursor();b.rail.active=true}),b.zoom.mouseleave(function(){b.rail.active=false;b.rail.drag||b.hideCursor()})));b.opt.enablemousewheel&&(b.isiframe||b.bind(g.isie&&b.ispage?document:b.docscroll,"mousewheel",
b.onmousewheel),b.bind(b.rail,"mousewheel",b.onmousewheel),b.railh&&b.bind(b.railh,"mousewheel",b.onmousewheelhr));!b.ispage&&!g.cantouch&&!/HTML|BODY/.test(b.win[0].nodeName)&&(b.win.attr("tabindex")||b.win.attr({tabindex:B++}),b.win.focus(function(d){r=b.getTarget(d).id||true;b.hasfocus=true;b.canshowonmouseevent&&b.noticeCursor()}),b.win.blur(function(){r=false;b.hasfocus=false}),b.win.mouseenter(function(d){w=b.getTarget(d).id||true;b.hasmousefocus=true;b.canshowonmouseevent&&b.noticeCursor()}),
b.win.mouseleave(function(){w=false;b.hasmousefocus=false}))}b.onkeypress=function(d){if(b.locked&&b.page.maxh==0)return true;var d=d?d:window.e,c=b.getTarget(d);if(c&&/INPUT|TEXTAREA|SELECT|OPTION/.test(c.nodeName)&&(!c.getAttribute("type")&&!c.type||!/submit|button|cancel/i.tp))return true;if(b.hasfocus||b.hasmousefocus&&!r||b.ispage&&!r&&!w){var c=d.keyCode,f=d.ctrlKey||false;if(b.locked&&c!=27)return b.cancelEvent(d);var l=false;switch(c){case 38:case 63233:b.doScrollBy(72);l=true;break;case 40:case 63235:b.doScrollBy(-72);
l=true;break;case 37:case 63232:b.railh&&(f?b.doScrollLeft(0):b.doScrollLeftBy(72),l=true);break;case 39:case 63234:b.railh&&(f?b.doScrollLeft(b.page.maxw):b.doScrollLeftBy(-72),l=true);break;case 33:case 63276:b.doScrollBy(b.view.h);l=true;break;case 34:case 63277:b.doScrollBy(-b.view.h);l=true;break;case 36:case 63273:b.railh&&f?b.doScrollPos(0,0):b.doScrollTo(0);l=true;break;case 35:case 63275:b.railh&&f?b.doScrollPos(b.page.maxw,b.page.maxh):b.doScrollTo(b.page.maxh);l=true;break;case 32:b.opt.spacebarenabled&&
(b.doScrollBy(-b.view.h),l=true);break;case 27:b.zoomactive&&(b.doZoom(),l=true)}if(l)return b.cancelEvent(d)}};b.opt.enablekeyboard&&b.bind(document,g.isopera&&!g.isopera12?"keypress":"keydown",b.onkeypress);b.bind(window,"resize",b.resize);b.bind(window,"orientationchange",b.resize);b.bind(window,"load",b.resize);if(g.ischrome&&!b.ispage&&!b.haswrapper){var m=b.win.attr("style"),f=parseFloat(b.win.css("width"))+1;b.win.css("width",f);b.synched("chromefix",function(){b.win.attr("style",m)})}b.onAttributeChange=
function(){b.lazyResize()};if(!b.ispage&&!b.haswrapper)"WebKitMutationObserver"in window?(b.observer=new WebKitMutationObserver(function(d){d.forEach(b.onAttributeChange)}),b.observer.observe(b.win[0],{attributes:true,subtree:false})):(b.bind(b.win,g.isie&&!g.isie9?"propertychange":"DOMAttrModified",b.onAttributeChange),g.isie9&&b.win[0].attachEvent("onpropertychange",b.onAttributeChange));!b.ispage&&b.opt.boxzoom&&b.bind(window,"resize",b.resizeZoom);b.istextarea&&b.bind(b.win,"mouseup",b.resize);
b.resize()}if(this.doc[0].nodeName=="IFRAME"){var A=function(){b.iframexd=false;try{var d="contentDocument"in this?this.contentDocument:this.contentWindow.document}catch(c){b.iframexd=true,d=false}if(b.iframexd)return"console"in window&&console.log("NiceScroll error: policy restriced iframe"),true;b.forcescreen=true;if(b.isiframe)b.iframe={doc:e(d),html:b.doc.contents().find("html")[0],body:b.doc.contents().find("body")[0]},b.getContentSize=function(){return{w:Math.max(b.iframe.html.scrollWidth,b.iframe.body.scrollWidth),
h:Math.max(b.iframe.html.scrollHeight,b.iframe.body.scrollHeight)}},b.docscroll=e(b.iframe.body);if(!g.isios&&b.opt.iframeautoresize&&!b.isiframe){b.win.scrollTop(0);b.doc.height("");var f=Math.max(d.getElementsByTagName("html")[0].scrollHeight,d.body.scrollHeight);b.doc.height(f)}b.resize();g.isie7&&b.css(e(b.iframe.html),{"overflow-y":"hidden"});b.css(e(b.iframe.body),{"overflow-y":"hidden"});"contentWindow"in this?b.bind(this.contentWindow,"scroll",b.onscroll):b.bind(d,"scroll",b.onscroll);b.opt.enablemousewheel&&
b.bind(d,"mousewheel",b.onmousewheel);b.opt.enablekeyboard&&b.bind(d,g.isopera?"keypress":"keydown",b.onkeypress);if(g.cantouch||b.opt.touchbehavior)b.bind(d,"mousedown",b.onmousedown),b.bind(d,"mousemove",function(d){b.onmousemove(d,true)}),g.cursorgrabvalue&&b.css(e(d.body),{cursor:g.cursorgrabvalue});b.bind(d,"mouseup",b.onmouseup);b.zoom&&(b.opt.dblclickzoom&&b.bind(d,"dblclick",b.doZoom),b.ongesturezoom&&b.bind(d,"gestureend",b.ongesturezoom))};this.doc[0].readyState&&this.doc[0].readyState==
"complete"&&setTimeout(function(){A.call(b.doc[0],false)},500);b.bind(this.doc,"load",A)}};this.showCursor=function(d,c){if(b.cursortimeout)clearTimeout(b.cursortimeout),b.cursortimeout=0;if(b.rail){if(b.autohidedom)b.autohidedom.stop().css({opacity:b.opt.cursoropacitymax}),b.cursoractive=true;if(typeof d!="undefined"&&d!==false)b.scroll.y=Math.round(d*1/b.scrollratio.y);if(typeof c!="undefined")b.scroll.x=Math.round(c*1/b.scrollratio.x);b.cursor.css({height:b.cursorheight,top:b.scroll.y});if(b.cursorh)!b.rail.align&&
b.rail.visibility?b.cursorh.css({width:b.cursorwidth,left:b.scroll.x+b.rail.width}):b.cursorh.css({width:b.cursorwidth,left:b.scroll.x}),b.cursoractive=true;b.zoom&&b.zoom.stop().css({opacity:b.opt.cursoropacitymax})}};this.hideCursor=function(d){if(!b.cursortimeout&&b.rail&&b.autohidedom)b.cursortimeout=setTimeout(function(){if(!b.rail.active||!b.showonmouseevent)b.autohidedom.stop().animate({opacity:b.opt.cursoropacitymin}),b.zoom&&b.zoom.stop().animate({opacity:b.opt.cursoropacitymin}),b.cursoractive=
false;b.cursortimeout=0},d||400)};this.noticeCursor=function(d,c,f){b.showCursor(c,f);b.rail.active||b.hideCursor(d)};this.getContentSize=b.ispage?function(){return{w:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth),h:Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)}}:b.haswrapper?function(){return{w:b.doc.outerWidth()+parseInt(b.win.css("paddingLeft"))+parseInt(b.win.css("paddingRight")),h:b.doc.outerHeight()+parseInt(b.win.css("paddingTop"))+parseInt(b.win.css("paddingBottom"))}}:
function(){return{w:b.docscroll[0].scrollWidth,h:b.docscroll[0].scrollHeight}};this.onResize=function(d,c){if(!b.win)return false;if(!b.haswrapper&&!b.ispage)if(b.win.css("display")=="none")return b.visibility&&b.hideRail().hideRailHr(),false;else!b.hidden&&!b.visibility&&b.showRail().showRailHr();var f=b.page.maxh,g=b.page.maxw,e=b.view.w;b.view={w:b.ispage?b.win.width():parseInt(b.win[0].clientWidth),h:b.ispage?b.win.height():parseInt(b.win[0].clientHeight)};b.page=c?c:b.getContentSize();b.page.maxh=
Math.max(0,b.page.h-b.view.h);b.page.maxw=Math.max(0,b.page.w-b.view.w);if(b.page.maxh==f&&b.page.maxw==g&&b.view.w==e)if(b.ispage)return b;else{f=b.win.offset();if(b.lastposition&&(g=b.lastposition,g.top==f.top&&g.left==f.left))return b;b.lastposition=f}b.page.maxh==0?(b.hideRail(),b.scrollvaluemax=0,b.scroll.y=0,b.scrollratio.y=0,b.cursorheight=0,b.setScrollTop(0),b.rail.scrollable=false):b.rail.scrollable=true;b.page.maxw==0?(b.hideRailHr(),b.scrollvaluemaxw=0,b.scroll.x=0,b.scrollratio.x=0,b.cursorwidth=
0,b.setScrollLeft(0),b.railh.scrollable=false):b.railh.scrollable=true;b.locked=b.page.maxh==0&&b.page.maxw==0;if(b.locked)return b.ispage||b.updateScrollBar(b.view),false;!b.hidden&&!b.visibility?b.showRail().showRailHr():!b.hidden&&!b.railh.visibility&&b.showRailHr();b.istextarea&&b.win.css("resize")&&b.win.css("resize")!="none"&&(b.view.h-=20);b.ispage||b.updateScrollBar(b.view);b.cursorheight=Math.min(b.view.h,Math.round(b.view.h*(b.view.h/b.page.h)));b.cursorheight=Math.max(b.opt.cursorminheight,
b.cursorheight);b.cursorwidth=Math.min(b.view.w,Math.round(b.view.w*(b.view.w/b.page.w)));b.cursorwidth=Math.max(b.opt.cursorminheight,b.cursorwidth);b.scrollvaluemax=b.view.h-b.cursorheight-b.cursor.hborder;if(b.railh)b.railh.width=b.page.maxh>0?b.view.w-b.rail.width:b.view.w,b.scrollvaluemaxw=b.railh.width-b.cursorwidth-b.cursorh.wborder;b.scrollratio={x:b.page.maxw/b.scrollvaluemaxw,y:b.page.maxh/b.scrollvaluemax};b.getScrollTop()>b.page.maxh?b.doScroll(b.page.maxh):(b.scroll.y=Math.round(b.getScrollTop()*
(1/b.scrollratio.y)),b.scroll.x=Math.round(b.getScrollLeft()*(1/b.scrollratio.x)),b.cursoractive&&b.noticeCursor());b.scroll.y&&b.getScrollTop()==0&&b.doScrollTo(Math.floor(b.scroll.y*b.scrollratio.y));return b};this.resize=function(){b.delayed("resize",b.onResize,30);return b};this.lazyResize=function(){b.delayed("resize",b.resize,250)};this._bind=function(d,c,f,g){b.events.push({e:d,n:c,f:f,b:g});d.addEventListener?d.addEventListener(c,f,g||false):d.attachEvent?d.attachEvent("on"+c,f):d["on"+c]=
f};this.bind=function(d,c,f,e){var h="jquery"in d?d[0]:d;h.addEventListener?(g.cantouch&&/mouseup|mousedown|mousemove/.test(c)&&b._bind(h,c=="mousedown"?"touchstart":c=="mouseup"?"touchend":"touchmove",function(b){if(b.touches){if(b.touches.length<2){var d=b.touches.length?b.touches[0]:b;d.original=b;f.call(this,d)}}else if(b.changedTouches)d=b.changedTouches[0],d.original=b,f.call(this,d)},e||false),b._bind(h,c,f,e||false),c=="mousewheel"&&b._bind(h,"DOMMouseScroll",f,e||false),g.cantouch&&c=="mouseup"&&
b._bind(h,"touchcancel",f,e||false)):b._bind(h,c,function(d){if((d=d||window.event||false)&&d.srcElement)d.target=d.srcElement;return f.call(h,d)===false||e===false?b.cancelEvent(d):true})};this._unbind=function(b,c,f,g){b.removeEventListener?b.removeEventListener(c,f,g):b.detachEvent?b.detachEvent("on"+c,f):b["on"+c]=false};this.unbindAll=function(){for(var d=0;d<b.events.length;d++){var c=b.events[d];b._unbind(c.e,c.n,c.f,c.b)}};this.cancelEvent=function(b){b=b.original?b.original:b?b:window.event||
false;if(!b)return false;b.preventDefault&&b.preventDefault();b.stopPropagation&&b.stopPropagation();b.preventManipulation&&b.preventManipulation();b.cancelBubble=true;b.cancel=true;return b.returnValue=false};this.stopPropagation=function(b){b=b.original?b.original:b?b:window.event||false;if(!b)return false;if(b.stopPropagation)return b.stopPropagation();if(b.cancelBubble)b.cancelBubble=true;return false};this.showRail=function(){if(b.page.maxh!=0&&(b.ispage||b.win.css("display")!="none"))b.visibility=
true,b.rail.visibility=true,b.rail.css("display","block");return b};this.showRailHr=function(){if(!b.railh)return b;if(b.page.maxw!=0&&(b.ispage||b.win.css("display")!="none"))b.railh.visibility=true,b.railh.css("display","block");return b};this.hideRail=function(){b.visibility=false;b.rail.visibility=false;b.rail.css("display","none");return b};this.hideRailHr=function(){if(!b.railh)return b;b.railh.visibility=false;b.railh.css("display","none");return b};this.show=function(){b.hidden=false;b.locked=
false;return b.showRail().showRailHr()};this.hide=function(){b.hidden=true;b.locked=true;return b.hideRail().hideRailHr()};this.toggle=function(){return b.hidden?b.show():b.hide()};this.remove=function(){b.doZoomOut();b.unbindAll();b.observer!==false&&b.observer.disconnect();b.events=[];if(b.cursor)b.cursor.remove(),b.cursor=null;if(b.cursorh)b.cursorh.remove(),b.cursorh=null;if(b.rail)b.rail.remove(),b.rail=null;if(b.railh)b.railh.remove(),b.railh=null;if(b.zoom)b.zoom.remove(),b.zoom=null;for(var d=
0;d<b.saved.css.length;d++){var c=b.saved.css[d];c[0].css(c[1],typeof c[2]=="undefined"?"":c[2])}b.saved=false;b.me.data("__nicescroll","");b.me=null;b.doc=null;b.docscroll=null;b.win=null;return b};this.scrollstart=function(d){this.onscrollstart=d;return b};this.scrollend=function(d){this.onscrollend=d;return b};this.scrollcancel=function(d){this.onscrollcancel=d;return b};this.zoomin=function(d){this.onzoomin=d;return b};this.zoomout=function(d){this.onzoomout=d;return b};this.isScrollable=function(b){for(b=
b.target?b.target:b;b&&b.nodeType==1&&!/BODY|HTML/.test(b.nodeName);){var c=e(b);if(/scroll|auto/.test(c.css("overflowY")||c.css("overflowX")||c.css("overflow")||""))return b.clientHeight!=b.scrollHeight;b=b.parentNode?b.parentNode:false}return false};this.getViewport=function(b){for(b=b&&b.parentNode?b.parentNode:false;b&&b.nodeType==1&&!/BODY|HTML/.test(b.nodeName);){var c=e(b);if(/scroll|auto/.test(c.css("overflowY")||c.css("overflowX")||c.css("overflow")||"")&&b.clientHeight!=b.scrollHeight)return c;
if(c.getNiceScroll().length>0)return c;b=b.parentNode?b.parentNode:false}return false};this.onmousewheel=function(d){if(b.locked)return true;if(!b.rail.scrollable)return b.railh&&b.railh.scrollable?b.onmousewheelhr(d):true;if(b.opt.preservenativescrolling&&b.checkarea)b.checkarea=false,b.nativescrollingarea=b.isScrollable(d);if(b.nativescrollingarea)return true;if(b.locked)return b.cancelEvent(d);if(b.rail.drag)return b.cancelEvent(d);i(d,false);return b.cancelEvent(d)};this.onmousewheelhr=function(d){if(b.locked||
!b.railh.scrollable)return true;if(b.opt.preservenativescrolling&&b.checkarea)b.checkarea=false,b.nativescrollingarea=b.isScrollable(d);if(b.nativescrollingarea)return true;if(b.locked)return b.cancelEvent(d);if(b.rail.drag)return b.cancelEvent(d);i(d,true);return b.cancelEvent(d)};this.stop=function(){b.cancelScroll();b.scrollmon&&b.scrollmon.stop();b.cursorfreezed=false;b.scroll.y=Math.round(b.getScrollTop()*(1/b.scrollratio.y));b.noticeCursor();return b};this.getTransitionSpeed=function(d){var c=
Math.round(b.opt.scrollspeed*10),d=Math.min(c,Math.round(d/20*b.opt.scrollspeed));return d>20?d:0};b.opt.smoothscroll?b.ishwscroll&&g.hastransition&&b.opt.usetransition?(this.prepareTransition=function(c,e){var f=e?c>20?c:0:b.getTransitionSpeed(c),h=f?g.prefixstyle+"transform "+f+"ms ease-out":"";if(!b.lasttransitionstyle||b.lasttransitionstyle!=h)b.lasttransitionstyle=h,b.doc.css(g.transitionstyle,h);return f},this.doScrollLeft=function(c,g){var f=b.scrollrunning?b.newscrolly:b.getScrollTop();b.doScrollPos(c,
f,g)},this.doScrollTop=function(c,g){var f=b.scrollrunning?b.newscrollx:b.getScrollLeft();b.doScrollPos(f,c,g)},this.doScrollPos=function(c,e,f){var h=b.getScrollTop(),i=b.getScrollLeft();((b.newscrolly-h)*(e-h)<0||(b.newscrollx-i)*(c-i)<0)&&b.cancelScroll();if(b.opt.bouncescroll==false){if(e<0)e=0;else if(e>b.page.maxh)e=b.page.maxh;if(c<0)c=0;else if(c>b.page.maxw)c=b.page.maxw}if(c==b.newscrollx&&e==b.newscrolly)return false;b.newscrolly=e;b.newscrollx=c;b.newscrollspeed=f||false;if(b.timer)return false;
b.timer=setTimeout(function(){var f=b.getScrollTop(),h=b.getScrollLeft(),i,j;i=c-h;j=e-f;i=Math.round(Math.sqrt(Math.pow(i,2)+Math.pow(j,2)));i=b.prepareTransition(b.newscrollspeed?b.newscrollspeed:i);b.timerscroll&&b.timerscroll.tm&&clearInterval(b.timerscroll.tm);if(i>0){!b.scrollrunning&&b.onscrollstart&&b.onscrollstart.call(b,{type:"scrollstart",current:{x:h,y:f},request:{x:c,y:e},end:{x:b.newscrollx,y:b.newscrolly},speed:i});if(g.transitionend){if(!b.scrollendtrapped)b.scrollendtrapped=true,
b.bind(b.doc,g.transitionend,b.onScrollEnd,false)}else b.scrollendtrapped&&clearTimeout(b.scrollendtrapped),b.scrollendtrapped=setTimeout(b.onScrollEnd,i);b.timerscroll={bz:new BezierClass(f,b.newscrolly,i,0,0,0.58,1),bh:new BezierClass(h,b.newscrollx,i,0,0,0.58,1)};if(!b.cursorfreezed)b.timerscroll.tm=setInterval(function(){b.showCursor(b.getScrollTop(),b.getScrollLeft())},60)}b.synched("doScroll-set",function(){b.timer=0;if(b.scrollendtrapped)b.scrollrunning=true;b.setScrollTop(b.newscrolly);b.setScrollLeft(b.newscrollx);
if(!b.scrollendtrapped)b.onScrollEnd()})},50)},this.cancelScroll=function(){if(!b.scrollendtrapped)return true;var c=b.getScrollTop(),e=b.getScrollLeft();b.scrollrunning=false;g.transitionend||clearTimeout(g.transitionend);b.scrollendtrapped=false;b._unbind(b.doc,g.transitionend,b.onScrollEnd);b.prepareTransition(0);b.setScrollTop(c);b.railh&&b.setScrollLeft(e);b.timerscroll&&b.timerscroll.tm&&clearInterval(b.timerscroll.tm);b.timerscroll=false;b.cursorfreezed=false;b.showCursor(c,e);return b},this.onScrollEnd=
function(){b.scrollendtrapped&&b._unbind(b.doc,g.transitionend,b.onScrollEnd);b.scrollendtrapped=false;b.prepareTransition(0);b.timerscroll&&b.timerscroll.tm&&clearInterval(b.timerscroll.tm);b.timerscroll=false;var c=b.getScrollTop(),e=b.getScrollLeft();b.setScrollTop(c);b.railh&&b.setScrollLeft(e);b.noticeCursor(false,c,e);b.cursorfreezed=false;if(c<0)c=0;else if(c>b.page.maxh)c=b.page.maxh;if(e<0)e=0;else if(e>b.page.maxw)e=b.page.maxw;if(c!=b.newscrolly||e!=b.newscrollx)return b.doScrollPos(e,
c,b.opt.snapbackspeed);b.onscrollend&&b.scrollrunning&&b.onscrollend.call(b,{type:"scrollend",current:{x:e,y:c},end:{x:b.newscrollx,y:b.newscrolly}});b.scrollrunning=false}):(this.doScrollLeft=function(c){var e=b.scrollrunning?b.newscrolly:b.getScrollTop();b.doScrollPos(c,e)},this.doScrollTop=function(c){var e=b.scrollrunning?b.newscrollx:b.getScrollLeft();b.doScrollPos(e,c)},this.doScrollPos=function(c,e){function f(){if(b.cancelAnimationFrame)return true;b.scrollrunning=true;if(n=1-n)return b.timer=
p(f)||1;var c=0,d=sy=b.getScrollTop();if(b.dst.ay){var d=b.bzscroll?b.dst.py+b.bzscroll.getNow()*b.dst.ay:b.newscrolly,e=d-sy;if(e<0&&d<b.newscrolly||e>0&&d>b.newscrolly)d=b.newscrolly;b.setScrollTop(d);d==b.newscrolly&&(c=1)}else c=1;var g=sx=b.getScrollLeft();if(b.dst.ax){g=b.bzscroll?b.dst.px+b.bzscroll.getNow()*b.dst.ax:b.newscrollx;e=g-sx;if(e<0&&g<b.newscrollx||e>0&&g>b.newscrollx)g=b.newscrollx;b.setScrollLeft(g);g==b.newscrollx&&(c+=1)}else c+=1;if(c==2){b.timer=0;b.cursorfreezed=false;b.bzscroll=
false;b.scrollrunning=false;if(d<0)d=0;else if(d>b.page.maxh)d=b.page.maxh;if(g<0)g=0;else if(g>b.page.maxw)g=b.page.maxw;g!=b.newscrollx||d!=b.newscrolly?b.doScrollPos(g,d):b.onscrollend&&b.onscrollend.call(b,{type:"scrollend",current:{x:sx,y:sy},end:{x:b.newscrollx,y:b.newscrolly}})}else b.timer=p(f)||1}e=typeof e=="undefined"||e===false?b.getScrollTop(true):e;if(b.timer&&b.newscrolly==e&&b.newscrollx==c)return true;b.timer&&q(b.timer);b.timer=0;var g=b.getScrollTop(),h=b.getScrollLeft();((b.newscrolly-
g)*(e-g)<0||(b.newscrollx-h)*(c-h)<0)&&b.cancelScroll();b.newscrolly=e;b.newscrollx=c;if(!b.bouncescroll||!b.rail.visibility)if(b.newscrolly<0)b.newscrolly=0;else if(b.newscrolly>b.page.maxh)b.newscrolly=b.page.maxh;if(!b.bouncescroll||!b.railh.visibility)if(b.newscrollx<0)b.newscrollx=0;else if(b.newscrollx>b.page.maxw)b.newscrollx=b.page.maxw;b.dst={};b.dst.x=c-h;b.dst.y=e-g;b.dst.px=h;b.dst.py=g;var i=Math.round(Math.sqrt(Math.pow(b.dst.x,2)+Math.pow(b.dst.y,2)));b.dst.ax=b.dst.x/i;b.dst.ay=b.dst.y/
i;var j=0,k=i;if(b.dst.x==0)j=g,k=e,b.dst.ay=1,b.dst.py=0;else if(b.dst.y==0)j=h,k=c,b.dst.ax=1,b.dst.px=0;i=b.getTransitionSpeed(i);b.bzscroll=i>0?b.bzscroll?b.bzscroll.update(k,i):new BezierClass(j,k,i,0,1,0,1):false;if(!b.timer){(g==b.page.maxh&&e>=b.page.maxh||h==b.page.maxw&&c>=b.page.maxw)&&b.checkContentSize();var n=1;b.cancelAnimationFrame=false;b.timer=1;b.onscrollstart&&!b.scrollrunning&&b.onscrollstart.call(b,{type:"scrollstart",current:{x:h,y:g},request:{x:c,y:e},end:{x:b.newscrollx,y:b.newscrolly},
speed:i});f();(g==b.page.maxh&&e>=g||h==b.page.maxw&&c>=h)&&b.checkContentSize();b.noticeCursor()}},this.cancelScroll=function(){b.timer&&q(b.timer);b.timer=0;b.bzscroll=false;b.scrollrunning=false;return b}):(this.doScrollLeft=function(c,e){var f=b.getScrollTop();b.doScrollPos(c,f,e)},this.doScrollTop=function(c,e){var f=b.getScrollLeft();b.doScrollPos(f,c,e)},this.doScrollPos=function(c,e){var f=c>b.page.maxw?b.page.maxw:c;f<0&&(f=0);var g=e>b.page.maxh?b.page.maxh:e;g<0&&(g=0);b.synched("scroll",
function(){b.setScrollTop(g);b.setScrollLeft(f)})},this.cancelScroll=function(){});this.doScrollBy=function(c,e){var f=0,f=e?Math.floor((b.scroll.y-c)*b.scrollratio.y):(b.timer?b.newscrolly:b.getScrollTop(true))-c;if(b.bouncescroll){var g=Math.round(b.view.h/2);f<-g?f=-g:f>b.page.maxh+g&&(f=b.page.maxh+g)}b.cursorfreezed=false;py=b.getScrollTop(true);if(f<0&&py<=0)return b.noticeCursor();else if(f>b.page.maxh&&py>=b.page.maxh)return b.checkContentSize(),b.noticeCursor();b.doScrollTop(f)};this.doScrollLeftBy=
function(c,e){var f=0,f=e?Math.floor((b.scroll.x-c)*b.scrollratio.x):(b.timer?b.newscrollx:b.getScrollLeft(true))-c;if(b.bouncescroll){var g=Math.round(b.view.w/2);f<-g?f=-g:f>b.page.maxw+g&&(f=b.page.maxw+g)}b.cursorfreezed=false;px=b.getScrollLeft(true);if(f<0&&px<=0)return b.noticeCursor();else if(f>b.page.maxw&&px>=b.page.maxw)return b.noticeCursor();b.doScrollLeft(f)};this.doScrollTo=function(c,e){e&&Math.round(c*b.scrollratio.y);b.cursorfreezed=false;b.doScrollTop(c)};this.checkContentSize=
function(){var c=b.getContentSize();(c.h!=b.page.h||c.w!=b.page.w)&&b.resize(false,c)};b.onscroll=function(){b.rail.drag||b.cursorfreezed||b.synched("scroll",function(){b.scroll.y=Math.round(b.getScrollTop()*(1/b.scrollratio.y));if(b.railh)b.scroll.x=Math.round(b.getScrollLeft()*(1/b.scrollratio.x));b.noticeCursor()})};b.bind(b.docscroll,"scroll",b.onscroll);this.doZoomIn=function(c){if(!b.zoomactive){b.zoomactive=true;b.zoomrestore={style:{}};var h="position,top,left,zIndex,backgroundColor,marginTop,marginBottom,marginLeft,marginRight".split(","),
f=b.win[0].style,i;for(i in h){var j=h[i];b.zoomrestore.style[j]=typeof f[j]!="undefined"?f[j]:""}b.zoomrestore.style.width=b.win.css("width");b.zoomrestore.style.height=b.win.css("height");b.zoomrestore.padding={w:b.win.outerWidth()-b.win.width(),h:b.win.outerHeight()-b.win.height()};if(g.isios4)b.zoomrestore.scrollTop=e(window).scrollTop(),e(window).scrollTop(0);b.win.css({position:g.isios4?"absolute":"fixed",top:0,left:0,"z-index":b.opt.zindex+100,margin:"0px"});h=b.win.css("backgroundColor");
(h==""||/transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(h))&&b.win.css("backgroundColor","#fff");b.rail.css({"z-index":b.opt.zindex+110});b.zoom.css({"z-index":b.opt.zindex+112});b.zoom.css("backgroundPosition","0px -18px");b.resizeZoom();b.onzoomin&&b.onzoomin.call(b);return b.cancelEvent(c)}};this.doZoomOut=function(c){if(b.zoomactive)return b.zoomactive=false,b.win.css("margin",""),b.win.css(b.zoomrestore.style),g.isios4&&e(window).scrollTop(b.zoomrestore.scrollTop),b.rail.css({"z-index":b.ispage?
b.opt.zindex:b.opt.zindex+2}),b.zoom.css({"z-index":b.opt.zindex}),b.zoomrestore=false,b.zoom.css("backgroundPosition","0px 0px"),b.onResize(),b.onzoomout&&b.onzoomout.call(b),b.cancelEvent(c)};this.doZoom=function(c){return b.zoomactive?b.doZoomOut(c):b.doZoomIn(c)};this.resizeZoom=function(){if(b.zoomactive){var c=b.getScrollTop();b.win.css({width:e(window).width()-b.zoomrestore.padding.w+"px",height:e(window).height()-b.zoomrestore.padding.h+"px"});b.onResize();b.setScrollTop(Math.min(b.page.maxh,
c))}};this.init();e.nicescroll.push(this)},z=function(e){var c=this;this.nc=e;this.steptime=this.lasttime=this.speedy=this.speedx=this.lasty=this.lastx=0;this.snapy=this.snapx=false;this.demuly=this.demulx=0;this.lastscrolly=this.lastscrollx=-1;this.timer=this.chky=this.chkx=0;this.time=function(){return+new Date};this.reset=function(e,i){c.stop();var b=c.time();c.steptime=0;c.lasttime=b;c.speedx=0;c.speedy=0;c.lastx=e;c.lasty=i;c.lastscrollx=-1;c.lastscrolly=-1};this.update=function(e,i){var b=c.time();
c.steptime=b-c.lasttime;c.lasttime=b;var b=i-c.lasty,j=e-c.lastx,g=c.nc.getScrollTop(),m=c.nc.getScrollLeft();g+=b;m+=j;c.snapx=m<0||m>c.nc.page.maxw;c.snapy=g<0||g>c.nc.page.maxh;c.speedx=j;c.speedy=b;c.lastx=e;c.lasty=i};this.stop=function(){c.nc.unsynched("domomentum2d");c.timer&&clearTimeout(c.timer);c.timer=0;c.lastscrollx=-1;c.lastscrolly=-1};this.doSnapy=function(e,i){var b=false;if(i<0)i=0,b=true;else if(i>c.nc.page.maxh)i=c.nc.page.maxh,b=true;if(e<0)e=0,b=true;else if(e>c.nc.page.maxw)e=
c.nc.page.maxw,b=true;b&&c.nc.doScrollPos(e,i,c.nc.opt.snapbackspeed)};this.doMomentum=function(e){var i=c.time(),b=e?i+e:c.lasttime,e=c.nc.getScrollLeft(),j=c.nc.getScrollTop(),g=c.nc.page.maxh,m=c.nc.page.maxw;c.speedx=m>0?Math.min(60,c.speedx):0;c.speedy=g>0?Math.min(60,c.speedy):0;b=b&&i-b<=50;if(j<0||j>g||e<0||e>m)b=false;e=c.speedx&&b?c.speedx:false;if(c.speedy&&b&&c.speedy||e){var o=Math.max(16,c.steptime);o>50&&(e=o/50,c.speedx*=e,c.speedy*=e,o=50);c.demulxy=0;c.lastscrollx=c.nc.getScrollLeft();
c.chkx=c.lastscrollx;c.lastscrolly=c.nc.getScrollTop();c.chky=c.lastscrolly;var d=c.lastscrollx,l=c.lastscrolly,f=function(){var b=c.time()-i>600?0.04:0.02;if(c.speedx&&(d=Math.floor(c.lastscrollx-c.speedx*(1-c.demulxy)),c.lastscrollx=d,d<0||d>m))b=0.1;if(c.speedy&&(l=Math.floor(c.lastscrolly-c.speedy*(1-c.demulxy)),c.lastscrolly=l,l<0||l>g))b=0.1;c.demulxy=Math.min(1,c.demulxy+b);c.nc.synched("domomentum2d",function(){if(c.speedx)c.nc.getScrollLeft()!=c.chkx&&c.stop(),c.chkx=d,c.nc.setScrollLeft(d);
if(c.speedy)c.nc.getScrollTop()!=c.chky&&c.stop(),c.chky=l,c.nc.setScrollTop(l);c.timer||(c.nc.hideCursor(),c.doSnapy(d,l))});c.demulxy<1?c.timer=setTimeout(f,o):(c.stop(),c.nc.hideCursor(),c.doSnapy(d,l))};f()}else c.doSnapy(c.nc.getScrollLeft(),c.nc.getScrollTop())}},t=e.fn.scrollTop;e.cssHooks.pageYOffset={get:function(j){var c=e.data(j,"__nicescroll")||false;return c&&c.ishwscroll?c.getScrollTop():t.call(j)},set:function(j,c){var h=e.data(j,"__nicescroll")||false;h&&h.ishwscroll?h.setScrollTop(parseInt(c)):
t.call(j,c);return this}};e.fn.scrollTop=function(j){if(typeof j=="undefined"){var c=this[0]?e.data(this[0],"__nicescroll")||false:false;return c&&c.ishwscroll?c.getScrollTop():t.call(this)}else return this.each(function(){var c=e.data(this,"__nicescroll")||false;c&&c.ishwscroll?c.setScrollTop(parseInt(j)):t.call(e(this),j)})};var u=e.fn.scrollLeft;e.cssHooks.pageXOffset={get:function(j){var c=e.data(j,"__nicescroll")||false;return c&&c.ishwscroll?c.getScrollLeft():u.call(j)},set:function(j,c){var h=
e.data(j,"__nicescroll")||false;h&&h.ishwscroll?h.setScrollLeft(parseInt(c)):u.call(j,c);return this}};e.fn.scrollLeft=function(j){if(typeof j=="undefined"){var c=this[0]?e.data(this[0],"__nicescroll")||false:false;return c&&c.ishwscroll?c.getScrollLeft():u.call(this)}else return this.each(function(){var c=e.data(this,"__nicescroll")||false;c&&c.ishwscroll?c.setScrollLeft(parseInt(j)):u.call(e(this),j)})};var v=function(j){var c=this;this.length=0;this.name="nicescrollarray";this.each=function(e){for(var b=
0;b<c.length;b++)e.call(c[b]);return c};this.push=function(e){c[c.length]=e;c.length++};this.eq=function(e){return c[e]};if(j)for(a=0;a<j.length;a++){var h=e.data(j[a],"__nicescroll")||false;h&&(this[this.length]=h,this.length++)}return this};(function(e,c,h){for(var i=0;i<c.length;i++)h(e,c[i])})(v.prototype,"show,hide,toggle,onResize,resize,remove,stop,doScrollPos".split(","),function(e,c){e[c]=function(){var e=arguments;return this.each(function(){this[c].apply(this,e)})}});e.fn.getNiceScroll=
function(j){return typeof j=="undefined"?new v(this):e.data(this[j],"__nicescroll")||false};e.extend(e.expr[":"],{nicescroll:function(j){return e.data(j,"__nicescroll")?true:false}});e.fn.niceScroll=function(j,c){typeof c=="undefined"&&typeof j=="object"&&!("jquery"in j)&&(c=j,j=false);var h=new v;typeof c=="undefined"&&(c={});if(j)c.doc=e(j),c.win=e(this);var i=!("doc"in c);if(!i&&!("win"in c))c.win=e(this);this.each(function(){var b=e(this).data("__nicescroll")||false;if(!b)c.doc=i?e(this):c.doc,
b=new F(c,e(this)),e(this).data("__nicescroll",b);h.push(b)});return h.length==1?h[0]:h};window.NiceScroll={getjQuery:function(){return e}};if(!e.nicescroll)e.nicescroll=new v})(jQuery);

config.app = {};
$.extend(config.app, {
	server: {
		endpoint: 'http://50.56.32.38',
		assets_endpoint: 'http://50.56.32.38',
		urls: {
			splash: 'index',
			video_intro: 'video_intro',
			login: 'login',
			signup: 'signup',
			home: 'home',
			stages: 'stages',
			levels: 'levels',
			invitations: 'invitations'
		},
		api: {
			facebook_user: '/api/app_users/facebook_user',
			signup_opts: '/api/app_users/signup_opts',
			list_cities: '/api/countries/list_cities',
			signup: '/api/app_users/signup',
			login: '/api/app_users/login',
			user: '/api/app_users/user',
			renew_fb_token: '/api/app_users/renew_fb_token',
			my_account: '/api/app_users/my_account',
			logout: '/api/app_users/logout',
			next_level: '/api/levels/next',
			answer_question: '/api/questions/answer_question',
			invitations_for_level: '/api/invitations/list_for_level',
			friends_for_level: '/api/invitations/friends_for_level',
			invite_friend: '/api/invitations/invite',
			invitation_token: '/api/invitations/create_token',
			sponsor_by_identity: '/api/sponsors/find_by_identity',
			stage_totals: '/api/stages/totals_for_stage',
			delete_invitation: '/api/invitations/delete',
			recover_password: '/splash/recover_password',
			update_response: '/api/app_users/update_response'
		}
	},
	urls: {
    	fan_page: 'https://www.facebook.com/BBCEntertainmentLatinoamerica'
    },
	db: {
		opts: {
			db_name: 'grahamdb',
			db_version: "1.0",
			db_size: 1 * 1024 * 1024,
			db_display_name: 'grahamdb_dname'
		},
		fmx_opts: {
			creation_statements: [
				'DROP TABLE IF EXISTS tokens',
				'CREATE TABLE tokens (token, token2)'
	        ]
		}
	},
	views: {
		fade_interval: 500,
        share: {        
            url: 'http://www.bbcentertainmentvideotrivia.com',
            fb_share_url: 'http://www.facebook.com/sharer.php',
            tw_share_url: 'https://twitter.com/intent/tweet',
            window_opts: 'location=0,status=0,width=800,height=400'
        },
		splash: {
			idle_timeout: 1500
		},
		video_intro:{
			video: {
				width: 406,
				height: 225,
				autoplay: true,
				show_controls: false,
				mp4_src: 'videos/intro/intro.mp4'
			}
		},
		signup: {
			facebook_fql: 'SELECT first_name, last_name, birthday_date, sex, email FROM user WHERE uid = me()',
			fade_interval: 500
		},
		home: {
			username_max_length: 20,
			fade_interval: 500
		},
		levels: {
			idle_timeout: 3000,
			video_player: {
				width: 304,
				height: 177,
				autoplay: true,
				show_controls: true
			}
		},
		my_account: {
			levels_logo_path: 'images/app/logos/levels/big/level_#{level}.png'
		},
		invitations: {
			max_per_level: 10,
			fb_endpoint: 'http://graph.facebook.com'
		}
	},
	sponsors: {
		identities: {
			splash: 0,
			register: 1,
			questions: 2
		}
	},
	fmx: {
		fmx_video_player: {
			swf_src: '/shared/video_player',
			swf_skin_src: '/shared/video_player_skin'
		},
		fmx_facebook: {
			app_id: '432922410139243',
			perms: 'email,offline_access,user_birthday,publish_actions,publish_stream,user_likes,read_stream'
		},
		fmx_checkbox: {},
		fmx_date_picker: {
			date_picker_opts: {
				changeMonth : true,
				changeYear : true,
				dateFormat: 'dd/mm/yy',
				yearRange: '1920:2012'
			}
		}
	},
	terms_and_conditions: {
		animation_interval: 500
	}
});


lang.app = {};
$.extend(lang.app, {
	bbc: {
		stages_completed: {
			messages: {
				blank_response: 'Ingresa un mensaje para continuar',
				success_label: 'Se ha registrado tu respuesta'
			}
		},
		views: {
			signup: {
				messages: {
					field_errors: 'Intenta llenar de nuevo los campos correctamente.'
				}
			},
			login: {
				messages: {
					facebook_exists: 'Tus datos ya est&aacute;n registrados, si no recuerdas tu contrase&ntilde;a da clic en &quot;Olvidaste tu contrase&ntilde;a&quot;',
					authentication_failiure: 'No estas registrado debes conectarte con Facebook para poder participar'
				}
			},
			levels: {
				missing_answer_label: 'Selecciona una respuesta para continuar'
			},
			my_account: {
				stage_label: 'Etapa',
				level_label: 'Nivel'
			},
			invitations: {
				max_per_level_label: 'Has invitado a todos los amigos posibles en este nivel',
				facebook_friend_error_label: 'No se pudieron enviar todas las invitaciones. Por favor intenta en 24 horas',
				facebook_friend_success_label: 'Se han enviado las invitaciones',
				facebook_renew_error_label: 'Ocurri&oacute; un error con Facebook. Por favor intenta m&aacute;s tarde.',
				facebook_renew_incorrect_user_label: 'El usuario de Facebook es incorrecto.',
				facebook_renew_save_error_label: 'No se pudo renovar la sesi&oacute;n  de Facebook. Por favor intente m&aacute;s tarde.',
      			facebook_renew_success_label: 'Has iniciado sesi&oacute;n de manera correcta'
			}
		}
	},
	fmx: {
		fmx_facebook_friend_selector: {
			title_label: 'Invitar amigos',
			invite_label: 'Invitar',
			success_label: 'Se ha enviado la invitaci&oacute;n',
			incorrect_session_label: 'La sesi&oacute;n de Facebook es incorrecta. Por favor inicie sesi&oacute;n nuevamente.',
			share_obj: {
				name: '&iexcl;Necesito ayuda para obtener m&aacute;s puntos en el nivel #{level}!',
				caption: 'London Calling',
				description: 'Participa para ganar un viaje a Londres fabuloso kit de London Calling',
				picture: '/images/app/social/facebook.png'
			}
		}
	}
});


var bbc = {};
$.extend(bbc, {
	_window: null,
	window_dimensions: null,
	loader: null,
	root: null,
	container: null,
	wrapper: null,
	loader: null,
	loading_count: 0,
	facebook: null,
	session: null,
	terms_and_conditions: null,
	stages_completed: null,
	invitations_loader: null,
	auth_token: null,
	user: null,
	has_touch: true,
	next_level: null,
	db: null,
	session: null,
	fanpage: null,
	show_last: false,
	init: function(){
		this.initRoot();
		this.initFmx();
		this.initWindow();
		this.initContainer();
		this.initWrapper();
		this.initLoader();
		this.initTermsAndConditions();
		this.initStagesCompleted();
		this.initInvitationsLoader();
		this.initDb();
		this.initTouch();
		this.initFacebook();
	},
	initWindow: function(){
		this._window = $(window);
		this.window_dimensions = {
			width: this._window.width(),
			height: this._window.height()
		};
	},
	initTouch: function(){
		document.addEventListener('touchstart', function(e){
			e.preventDefault();
		}, false);
		document.addEventListener('touchmove', function(e){
			e.preventDefault();
		}, false);
	},
	initDb: function(){
		var _self = this;
		var db = getDbInstance();
		this.db = this.fmx.db({
			db: db,
			onReady: function(){
				_self.onDbReady();
			}
		})
	},
	insertUser: function(token, token2, callback){
		var _self = this;
		this.db.query('DELETE FROM tokens', function(){
			_self.deleteUserCallback(token, token2, callback);
		});
	},
	deleteUserCallback: function(token, token2, callback){
		this.db.query("INSERT INTO tokens(token, token2) VALUES('" + token + "', '" + token2 + "')", function(e){
			callback();
		});
	},
	getDbUser: function(){
		var _self = this;
		this.db.queryReturn('SELECT token, token2 FROM tokens', function(tx, result){
			_self.dbUserCallback(tx, result);
		});
	},
	dbUserCallback: function(tx, result){
		if(result.rows.length > 0){
			var token_data = result.rows.item(0);
			this.session = {
				token: token_data.token,
				token2: token_data.token2
			};
		}
		this.loadView(config.app.server.urls.splash);
	},
	onDbReady: function(){
		this.getDbUser();
	},
	loadSponsor: function(identity, container){
		var sponsor = {};
		$.extend(sponsor, {
			parent: this,
			root: null,
			container: container,
			identity: identity,
			url: null,
			init: function(){
				this.initRoot();
				this.doRequest();
			},
			doRequest: function(){
				var _self = this;
				this.root.api(
					config.app.server.api.sponsor_by_identity,
					{ identity: this.identity },
					function(data){
						_self.requestOnSuccess(data);
					},
					function(){
						_self.requestOnError();
					}
				);
			},
			requestOnSuccess: function(data){
				if(data.sponsor){
					this.initImg(data.sponsor);
				}
			},
			initImg: function(data){
				var _self = this;
				this.url = data.url;
				var img = $('<img />', {
					src: this.root.serverAsset(data.image_url)
				});
				img.appendTo(this.container);
				this.root.click(
					img,
					function(e, element){
						_self.imgOnClick(e, element);		
					}
				);
			},
			imgOnClick: function(e, element){
				this.root.cdv.browserLauncher(this.url);
			},
			requestOnError: function(){},
			initRoot: function(){
				this.root = this.parent.root;
			}
		});
		sponsor.init();
	},
	initInvitationsLoader: function(){
		this.invitations_loader = {};
		$.extend(this.invitations_loader, {
			parent: this,
			root: null,
			delegate_defaults: {
				container: null,
				loading: function(){},
				loaded: function(){},
				success: function(){},
				dismiss: function(instance){},
				level: null,
				show_back_btn: false,
				show_next_btn: false
			},
			delegate: null,
			init: function(){
				this.initRoot();
			},
			initRoot: function(){
				this.root = this.parent.root;
			},
			load: function(delegate){
				this.delegate = $.extend({}, this.delegate_defaults, delegate);
				this.doRequest();
			},
			doRequest: function(){
				var _self = this;
				this.delegate.loading();
				this.root.cdv.viewLoader(
					config.app.server.urls.invitations,
					function(data){
						_self.requestOnSuccess(data);
					},
					function(){
						_self.requestOnError();
					}
				);
			},
			requestOnSuccess: function(data){
				this.delegate.loaded();
				this.delegate.success();
				this.delegate.container.html(data);
			},
			requestOnError: function(){
				this.delegate.loaded();
				this.delegate.error();
			}
		});
		this.invitations_loader.init();
	},
	initStagesCompleted: function(){
		this.stages_completed = {};
		$.extend(this.stages_completed, {
			parent: this,
			root: null,
			container: null,
			wrapper: null,
			question_wrapper: null,
			actions: null,
			lang: null,
			init: function(){
				this.initRoot();
				this.initLang();
				this.initContainer();
				this.initWrapper();
				this.initQuestionWrapper();
			},
			initLang: function(){
				this.lang = lang.app.bbc.stages_completed;
			},
			initRoot: function(){
				this.root = this.parent.root;
			},
			initQuestionWrapper: function(){
				this.question_wrapper = {};
				$.extend(this.question_wrapper, {
					root: null,
					parent: this,
					container: null,
					actions: null,
					submit_action: null,
					is_loading: false,
					textarea: null,
					val: null,
					lang: null,
					init: function(){
						this.initRoot();
						this.initLang();
						this.initContainer();
						this.initActions();
						this.initTextArea();
					},
					initLang: function(){
						this.lang = this.parent.lang;
					},
					initTextArea: function(){
						this.textarea = this.container.find('#stages_completed_question_textarea');
						var textarea = this.textarea.get(0);
						textarea.addEventListener('touchstart', function(e){
						    e.stopPropagation();
						}, false);
					},
					initActions: function(){
						this.actions = this.container.find('.stages_completed_question_action');
						this.initSubmitAction();
					},
					initSubmitAction: function(){
						var _self = this;
						this.submit_action = this.actions.filter('#stages_completed_question_submit_action');
						this.root.click(
							this.submit_action, 
							function(e, element){
								_self.submitActionOnClick(e, element);
							}
						);
					},
					submitActionOnClick: function(e, element){
						if(!this.is_loading){
							this.val = this.textarea.val();
							if(!this.val){
								this.root.fmx.notification({
									icon_src: 'error',
									msg: this.lang.messages.blank_response
								});
							}
							else{
								this.doRequest();
							}
						}
					},
					doRequest: function(){
						var _self = this;
						this.loading();
						this.root.api(
							config.app.server.api.update_response,
							{ response: this.val },
							function(data){
								_self.success(data);
							},
							function(){
								_self.error();
							}
						);
					},
					success: function(data){
						if(data.updated){
							this.root.show_last = false;
							this.loaded();
							this.root.fmx.notification({
								icon_src: 'success',
								msg: this.lang.messages.success_label
							});
							this.parent.setContent();
						}
						else{
							this.error();
						}
					},
					error: function(){
						this.loaded();
					},
					loading: function(){
						this.is_loading = true;
						this.actions.addClass('disabled');
						this.root.loading();
					},
					loaded: function(){
						this.is_loading = false;
						this.actions.addClass('disabled');
						this.root.loaded();
					},
					initContainer: function(){
						this.container = this.parent.container.find('#stages_completed_question_wrapper');
					},
					initRoot: function(){
						this.root = this.parent.root;
					},
					show: function(){
						this.container.css('display', 'block');
					},
					hide: function(){
						this.container.css('display', 'none');
					}
				});
				this.question_wrapper.init();
			},
			initWrapper: function(){
				this.wrapper = this.container.find('#stages_completed_wrapper');
			},
			initContainer: function(){
				this.container = $('#stages_completed_container')
			},
			show: function(){
				this.container.css('display', 'block');
				this.setContent();
			},
			setContent: function(){
				this.wrapper.css('display', 'none');
				this.question_wrapper.hide();
				if(this.root.show_last){
					this.question_wrapper.show();
				}
				else{
					this.wrapper.css('display', 'block');
				}
			},
			hide: function(){
				this.container.css('display', 'none');
			}
		});
		this.stages_completed.init();
	},
	initFmx: function(){
		this.fmx.root = this;
	},
	click: function(container, handler){
		var container_dom = container.get(0);
		container_dom.addEventListener('touchstart', function(e){
			e.preventDefault();
			e.stopPropagation();
			handler(e, $(this));
		}, false);
	},
	getTouchOpts: function(){
		return { has_touch: this.has_touch };
	},
	initTermsAndConditions: function(){
		this.terms_and_conditions = {};
		$.extend(this.terms_and_conditions, {
			parent: this,
			root: null,
			container: null,
			content: null,
			close_btn: null,
			scroller: null,
			animation_interval: config.app.terms_and_conditions.animation_interval,
			init: function(){
				this.initRoot();
				this.initContainer();
				this.initContent();
				this.initScroller();
				this.initCloseBtn();
			},
			initScroller: function(){
				this.scroller = this.root.fmx.scroller({
					container: this.content,
					wrapper_id: 'terms_and_conditions_wrapper'
				});
			},
			initCloseBtn: function(){
				var _self = this;
				this.close_btn = this.container.find('#terms_and_conditions_close_btn');
				this.root.click(
					this.close_btn,
					function(e, element){
						_self.closeBtnOnClick(e, element);
					}
				);
			},
			closeBtnOnClick: function(e, element){
				this.hide();
			},
			initContainer: function(){
				this.container = $('#terms_and_conditions_container');
			},
			initContent: function(){
				this.content = this.container.find('#terms_and_conditions_wrapper_container');
			},
			initRoot: function(){
				this.root = this.parent.root;
			},
			show: function(closable){
				closable = closable == null ? true : closable;
                if(closable){
                    this.close_btn.css('display', 'block');
                }
                else{
                    this.close_btn.css('display', 'none');
                }
				var _self = this;
				this.container.css({
					display: 'block',
					opacity: 0
				});
				this.container.stop(true, true).animate({
					opacity: 1
				}, this.animation_interval, 'linear', function(){
					_self.showCallback();
				});
			},
			showCallback: function(){
				this.scroller.refresh();
			},
			hide: function(){
				var _self = this;
				this.container.stop(true, true).animate({
					opacity: 0
				}, this.animation_interval, 'linear', function(){
					_self.hideCallback();
				});
			},
			hideCallback: function(){
				this.container.hide();
			}
		});
		this.terms_and_conditions.init();
	},
	serverAsset: function(path){
		return config.app.server.endpoint + path;
	},
	initFacebook: function(){
		FB.init({
			appId: config.app.fmx.fmx_facebook.app_id,
			nativeInterface: CDV.FB,
			useCachedDialogs: false
		});
		this.facebook = this.fmx.facebook({});
	},
	initRoot: function(){
		this.root = this;
	},
	initContainer: function(){
		this.container = $('#container').css(this.window_dimensions);
	},
	initWrapper: function(){
		this.wrapper = this.container.find('#wrapper');
	},
	initLoader: function(){
		this.loader = $('#main_loader').css('opacity', 0.85);
		$.fmx_sprite({
			fps: 10,
			container: this.loader.find('#main_loader_sprite'),
			dimensions: {
				width: 20,
				height: 20
			}
		});
	},
	loadView: function(path, params){
		params = params == null ? {} : params;
		this.loading();
		var _self = this;
		this.cdv.viewLoader(
			path,
			function(data){
				_self.loadViewOnSuccess(data);
			},
			function(){
				_self.loadViewOnError();
			}
		);
	},
	loadViewOnSuccess: function(data){
		this.wrapper.empty();
		this.loaded();
		this.wrapper.html(data);
		//this.wrapper.find('.background_container').css(this.window_dimensions);
	},
	loadViewOnError: function(){
		this.loaded();
		this.error();
	},
	/**setViewHeight: function(container, cls){
		container.find('.' + cls).css(this.window_dimensions);
	},*/
	error: function(){
		this.fmx.notification({
			icon_src: 'error',
			msg: lang.server_error
		});
	},
	getServerPath: function(path){
		return config.app.server.endpoint + path;
	},
	getAssetPath: function(path){
		return config.app.server.assets_endpoint + path;
	},
    api: function(path, params, success, error){
        var api_loader = {};
        $.extend(api_loader, {
            path: path,
            params: params,
            success: success,
            error: error,
            parent: this,
            root: null,
            url: null,
            request: null,
            init: function(){
                this.initRoot();
                this.initUrl();
                this.initParams();
                this.doRequest();
            },
            doRequest: function(){
                var _self = this;
                this.request = $.ajax({
                    type: 'post',
                    url: this.url,
                    data: this.params,
                    success: function(data){
                        _self.requestOnSuccess(data);
                    },
                    error: function(){
                        _self.error();
                    }
                });
            },
            requestOnSuccess: function(data){
                if(data.auth_error){
                    this.root.loaded();
                    this.root.logout();
                }
                else{
                    this.success(data);
                }
            },
            initUrl: function(){
                this.url = this.parent.getServerPath(this.path);
            },
            initParams: function(){
                $.extend(this.params, this.parent.getAuthParams());
            },
            initRoot: function(){
                this.root = this.parent.root;
            }
        });
        api_loader.init();
        return api_loader.request;
    },
	getAuthParams: function(){
		var params = {};
		if(this.auth_token != null){
			params.token = this.auth_token.token;
			params.token2 = this.auth_token.token2;
		}
		params.device_id = device.uuid;
		return params;
	},
	userCallback: function(auth_token, user, insert){
		insert = insert == null ? true : insert;
		if(insert){
			var _self = this;
			this.loading();
			this.insertUser(auth_token.token, auth_token.token2, function(){
				_self.insetUserCallback(auth_token, user);
			});
		}
		else{
			this.setUser(auth_token, user);
		}
	},
	insetUserCallback: function(auth_token, user){
		this.loaded();
		this.setUser(auth_token, user);
	},
	setUser: function(auth_token, user){
		this.auth_token = auth_token;
		this.user = user;
		this.loadView(config.app.server.urls.home);
	},
	logout: function(){
		var _self = this;
		this.loading();
		this.db.query('DELETE FROM tokens', function(){
			_self.logoutCallback();
		});
	},
	logoutCallback: function(){
		this.loaded();
		this.user = null;
		this.auth_token = null;
		this.loadView(config.app.server.urls.login);
	},
	apiOnSuccess: function(data){
		//TODO session expiry
		this.api_success(data);
	},
	apiOnError: function(){
		this.api_error();
	},
	loading: function(){
		if(this.loading_count == 0){
			this.loader.css('display', 'block');
		}
		++this.loading_count;
	},
	loaded: function(){
		--this.loading_count;
		if(this.loading_count <= 0){
			this.loading_count = 0;
			this.loader.css('display', 'none');
		}
	},
	cdv: {
		instance: cordova,
		browserLauncher: function(path){
			var args = [];
			args.push(path);
			this.exec(
				function(){},
				function(){},
				"fmx.GrahamNorton.browser.BrowserLauncher",
				"launch",
				args
			);
		},
		viewLoader: function(path, success, error){
			var args = [];
			args.push(path);
			this.exec(
				success,
				error,
				"fmx.GrahamNorton.ViewLoader.ViewLoader",
				"load",
				args
			);
		},
		exec: function(success, error, name, action, args){
			this.instance.exec(
				function(result){
					success(result);
				},
				function(error){
					error(error);
				},
				name,
				action,
				args
			);
		}
	},
	fmx: {
		root: null,
		notification: function(opts){
			return $.fmx_notification(opts, this.root.getTouchOpts());
		},
		videoPlayer: function(opts){
			return $.fmx_video_player(
				$.extend(opts, config.app.fmx.fmx_video_player)
			);
		},
		facebook: function(opts){
			return $.fmx_facebook(
				$.extend(opts, config.app.fmx.fmx_facebook)
			);
		},
		checkbox: function(opts){
			return $.fmx_checkbox(
				$.extend(opts, config.app.fmx.fmx_checkbox, this.root.getTouchOpts())
			);
		},
		datePicker: function(opts){
			return $.fmx_date_picker(
				$.extend(opts, config.app.fmx.fmx_date_picker)
			);
		},
		form: function(opts){
			return $.fmx_form(opts);
		},
		tabs: function(opts){
			return $.fmx_tabs(
				$.extend(
					opts,
					this.root.getTouchOpts()
				)
			);
		},
		facebookFriendSelector: function(opts){
			return $.fmx_facebook_friend_selector(
				$.extend(opts, lang.app.fmx.fmx_facebook_friend_selector, this.root.getTouchOpts(), {
					config: config
				})
			);
		},
		db: function(opts){
			return $.fmx_db(
				$.extend(opts, config.app.db.fmx_opts)
			);
		},
		scroller: function(opts){
			return $.fmx_scroller(opts);
		}
	}
});
(function(){
	document.addEventListener('deviceready', function(){
		$(function(){
			bbc.init();
		});
	}, false);
})(jQuery);

function getDbInstance(){
	var db = null;
	if(window.openDatabase){
		try{
			db = window.openDatabase(
				config.app.db.opts.db_name,
				config.app.db.opts.db_version,
				config.app.db.opts.db_display_name,
				config.app.db.opts.db_size
			);
		}
		catch(e){
			console.log("could not create local db. error:" + e);
		}
	}
	return db;
}


(function(){
	$(function(){
		bbc.signup = {};
		$.extend(bbc.signup, {
			parent: bbc,
			root: null,
			config: null,
			is_loading: false,
			container: null,
			form: null,
			country_select: null,
			terms_and_conditions_btn: null,
			birth_date_datepicker: null,
			column_container: null,
			signup_groups: null,
			signup_selected: null,
			init: function(){
				this.initRoot();
				this.initConfig();
				this.initContainer();
				this.initColumnContainer();
				this.initForm();
				this.initDeviceField();
				this.initSignUpGroups();
				this.initTermsAndConditionsBtn();
				this.initCountrySelect();
				this.initBirthDateDatePicker();
				this.initCheckboxFields();
				this.initOpts();
				this.initSponsor();
				this.initInvitation();
				this.initFacebook();
			},
			initDeviceField: function(){
				this.addHiddenField('device_id', device.uuid);
			},
			initSignUpGroups: function(){
				var _self = this;
				var i = 0;
				this.signup_groups = [];
				this.container.find('.signup_column_group').each(function(){
					_self.addSignupGroup($(this), i);
					++i;
				});
				if(this.signup_groups.length > 0){
					this.setSignUpGroup(this.signup_groups[0]);
				}
			},
			addSignupGroup: function(container, index){
				var signup_group = {};
				$.extend(signup_group, {
					parent: this,
					root: null,
					container: container,
					index: index,
					nav_actions: null,
					init: function(){
						this.initRoot();
						this.initNavActions();
					},
					initNavActions: function(){
						this.nav_actions = this.container.find('.signup_action');
						this.initNextActions();
						this.initPrevActions();
					},
					initPrevActions: function(){
						var _self = this;
						this.nav_actions.filter('.signup_prev_btn').each(function(){
							_self.setPrevAction($(this));
						});
					},
					setPrevAction: function(container){
						var _self = this;
						this.root.click(
							container,
							function(e, element){
								_self.prevActionOnClick(e, element);
							}
						);
					},
					prevActionOnClick: function(e, element){
						if(!this.parent.is_loading && this.index > 0){
							this.parent.setSignUpGroup(this.parent.signup_groups[this.index - 1]);
						}
					},
					initNextActions: function(){
						var _self = this;
						this.nav_actions.filter('.signup_next_btn').each(function(){
							_self.setNextAction($(this));
						});
					},
					setNextAction: function(container){
						console.log("setting next action");
						var _self = this;
						this.root.click(
							container,
							function(e, element){
								_self.nextActionOnClick(e, element);
							}
						);
					},
					nextActionOnClick: function(e, element){
						if(!this.parent.is_loading){
							this.parent.setSignUpGroup(this.parent.signup_groups[this.index + 1]);
						}
					},
					initRoot: function(){
						this.root = this.parent.root;
					},
					show: function(){
						this.container.css('display', 'block');
					},
					hide: function(){
						this.container.css('display', 'none');
					},
					loading: function(){
						this.nav_actions.addClass('disabled');
					},
					loaded: function(){
						this.nav_actions.removeClass('disabled');
					}
				});
				signup_group.init();
				this.signup_groups.push(signup_group);
			},
			setSignUpGroup: function(which){
				if(which != null && this.signup_selected != which){
					if(this.signup_selected != null){
						this.signup_selected.hide();
					}
					this.signup_selected = which;
					this.signup_selected.show();	
				}
			},
			initSponsor: function(){
				this.root.loadSponsor(
					config.app.sponsors.identities.register,
					this.container.find('#signup_sponsor')
				);
			},
			initInvitation: function(){
				if(this.root.invitation_session != null){
					this.addHiddenField('invitation', this.root.invitation_session.id);
				}
			},
			initConfig: function(){
				this.config = config.app.views.signup;
			},
			initColumnContainer: function(){
				this.column_container = this.container.find('#signup_column_container');
			},
			initTermsAndConditionsBtn: function(){
				var _self = this;
				this.terms_and_conditions_btn = this.form.container.find('#signup_terms_and_conditions');
				this.root.click(
					this.terms_and_conditions_btn,
					function(e, element){
						_self.termsAndConditionBtnOnClick(e, $(this));
					}
				);
			},
			termsAndConditionBtnOnClick: function(){
				this.root.terms_and_conditions.show();
			},
			initBirthDateDatePicker: function(){
				this.birth_date_datepicker = this.root.fmx.datePicker({
					container: $('#user_birth_date')
				});
			},
			initFacebook: function(){
				var data = this.root.facebook.data;
				this.setTextFieldVal(this.form.container.find('#user_name'), data.first_name);
				this.setTextFieldVal(this.form.container.find('#user_last_names'), data.last_name);
				this.setDateFieldVal(this.birth_date_datepicker, data.birthday);
				this.setGenderFieldVal(this.form.container.find('#user_gender'), data.gender);
				this.setTextFieldVal(this.form.container.find('#user_mail'), data.email);
				this.addHiddenField('fb_token', this.root.facebook.token);
			},
			setGenderFieldVal: function(container, val){
				if(val){
					var value = null;
					if(val == "male"){
						value = 1;
					}
					else if(val == "female"){
						value = 0;
					}
					if(value != null){
						container.val(value);
					}
				}
			},
			setDateFieldVal: function(date_picker, val){
				if(val){
					val = val.split("/");
					$.each(val, function(key, v){
						if(v.charAt(0) == "0"){
							val[key] = parseInt(v[1]);
						}
						else{
							val[key] = parseInt(v);
						}
					});
					var date = new Date(val[2], val[0] - 1, val[1]);
					date_picker.setValueFromDate(date);
				}
			},
			setTextFieldVal: function(container, val){
				if(val){
					container.val(val);
				}
			},
			addHiddenField: function(name, val){
				$('<input />', {
					type: 'hidden',
					name: name,
					value: val
				}).appendTo(this.form.container);
			},
			initCheckboxFields: function(){
				var _self = this;
				this.form.container.find('.fmx_checkbox').each(function(){
					_self.addCheckbox($(this))
				});
			},
			addCheckbox: function(container){
				this.root.fmx.checkbox({
					container: container,
					field_name: container.attr('data-name')
				});
				this.form.addField(container.parent().parent());
			},
			initCountrySelect: function(){
				var _self = this;
				this.country_select = this.form.container.find('#signup_country_select');
			},
			initOpts: function(){
				this.loading();
				var _self = this;
				this.root.api(
					config.app.server.api.signup_opts,
					{},
					function(data){
						_self.optsOnSuccess(data);
					},
					function(){
						_self.optsOnError();
					}
				)
			},
			optsOnSuccess: function(data){
				this.populateSelect(this.country_select, data.countries);
				this.loaded();
				this.container.css('display', 'block');
			},
			populateSelect: function(container, data){
				var _self = this;
				$.each(data, function(key, val){
					_self.selectAddOption(container, val);
				});
			},
			selectAddOption: function(container, val){
				var option = $('<option value="' + val.id + '">' + val.name + '</option>');
				option.appendTo(container);
			},
			optsOnError: function(){
				//TODO
				this.loaded();
				this.root.error();
			},
			initForm: function(){
				var _self = this;
				var form_container = this.column_container.find('#signup_form');
				var url = this.root.getServerPath(config.app.server.api.signup);
				form_container.attr('action', url);
				this.form = this.root.fmx.form({
					container: form_container,
					success: function(data){
						_self.formOnSuccess(data);
					},
					error: function(){
						_self.formOnError();
					},
					loading: function(){
						_self.loading();
					},
					loaded: function(){
						_self.loaded();
					},
					response: function(data){
						_self.formOnResponse(data);
					}
				});
			},
			formOnResponse: function(data){
				if(this.form.error_count > 0){
					this.root.fmx.notification({
						icon_src: 'error',
						msg: lang.app.bbc.views.signup.messages.field_errors
					});
				}
			},
			formOnSuccess: function(data){
				console.log(data);
				this.loaded();
				this.root.userCallback(data.auth_token, data.user);
			},
			formOnError: function(){
				this.error();
			},
			initContainer: function(){
				this.container = $('#signup_container');
			},
			initRoot: function(){
				this.root = this.parent.root;
			},
			loading: function(){
				$.each(this.signup_groups, function(key, element){
					element.loading();
				});
				this.is_loading = true;
				this.root.loading();
			},
			loaded: function(){
				$.each(this.signup_groups, function(key, element){
					element.loaded();
				});
				this.is_loading = false;
				this.root.loaded();
			},
			error: function(){
				this.loaded();
				this.root.error();
			}
		});
		bbc.signup.init();
	});
})(jQuery);

(function(){
	$(function(){
		bbc.video_intro = {};
		$.extend(bbc.video_intro, {
			parent: bbc,
			root: null,
			video_intro: null,
			config: null,
			container: null,
			skip_btn: null,
			init: function(){
				this.initRoot();
				this.initConfig();
				this.initContainer();
				this.initVideoIntro();
				this.initSkipBtn();
			},
			initContainer: function(){
				this.container = $('#video_intro_container');
			},
			initSkipBtn: function(){
				var _self = this;
				this.skip_btn = this.container.find('#video_intro_skip_btn');
				this.root.click(
					this.skip_btn,
					function(e, element){
						_self.skipBtnOnClick(e, element);
					}
				);
			},
			skipBtnOnClick: function(e, element){
				this.videoIntroOnComplete();
			},
			initVideoIntro: function(){
				var _self = this;
				this.video_intro = this.root.fmx.videoPlayer(
					$.extend({
						container: this.container.find('#video_intro'),
						complete: function(){
							_self.videoIntroOnComplete();
						}
					}, this.config.video)
				);
			},
			videoIntroOnComplete: function(){
				this.root.loadView(config.app.server.urls.login);
			},
			initConfig: function(){
				this.config = config.app.views.video_intro;
			},
			initRoot: function(){
				this.root = this.parent.root;
			}
		});
		bbc.video_intro.init();
	});
})(jQuery);

(function(){
	$(function(){
		bbc.splash = {};
		$.extend(bbc.splash, {
			parent: bbc,
			root: null,
			star: null,
			config: null,
			server_error: null,
			container: null,
			is_loading: false,
			init: function(){
				this.initRoot();
				this.initConfig();
				this.initContainer();
				this.initServerError();
				this.initIdleTimeout();
			},
			initContainer: function(){
				this.container = $('#splash_container');
			},
			initServerError: function(){
				this.server_error = {};
				$.extend(this.server_error, {
					parent: this,
					root: null,
					container: null,
					retry_btn: null,
					init: function(){
						this.initRoot();
						this.initContainer();
						this.initRetryBtn();
					},
					initRetryBtn: function(){
						var _self = this;
						this.retry_btn = this.container.find('#server_connection_retry_btn');
						this.root.click(
							this.retry_btn,
							function(e, element){
								_self.retryBtnOnClick(e, element);
							}
						);
					},
					retryBtnOnClick: function(e, element){
						if(!this.parent.is_loading){
							this.parent.getUser();
						}
					},
					loading: function(){
						this.retry_btn.addClass('disabled');
					},
					loaded: function(){
						this.retry_btn.removeClass('disabled');
					},
					initRoot: function(){
						this.root = this.parent.root;
					},
					initContainer: function(){
						this.container = this.parent.container.find('#server_connection_error_container');
					},
					show: function(){
						this.container.css('display', 'block');
					},
					hide: function(){
						this.container.css('display', 'none');
					}
				});
				this.server_error.init();
			},
			initIdleTimeout: function(){
				var _self = this;
				setTimeout(function(){
					_self.idleCallback();
				}, this.config.idle_timeout);
			},
			idleCallback: function(){
				if(this.root.session == null){
					this.showVideoView();
				}
				else{
					this.getUser();
				}
			},
			getUser: function(){
				var _self = this;
				this.loading();
				this.root.api(
					config.app.server.api.user,
					this.root.session,
					function(data){
						_self.userOnSuccess(data);
					},
					function(){
						_self.userOnError();
					}
				);
			},
			userOnSuccess: function(data){
				this.loaded();
				this.root.userCallback(data.auth_token, data.user);
			},
			userOnError: function(){
				this.loaded();
				this.server_error.show();
			},
			showVideoView: function(){
				this.root.loadView(config.app.server.urls.video_intro);
			},
			initConfig: function(){
				this.config = config.app.views.splash;
			},
			initRoot: function(){
				this.root = this.parent.root;
			},
			loading: function(){
				this.is_loading = true;
				this.server_error.loading();
				this.root.loading();
			},
			loaded: function(){
				this.is_loading = false;
				this.server_error.loaded();
				this.root.loaded();
			}
		});
		bbc.splash.init();
	});
})(jQuery);

(function(){
	$(function(){
		bbc.home = {};
		$.extend(bbc.home, {
			parent: bbc,
			root: null,
			config: null,
			container: null,
			content_container: null,
			terms_and_conditions_link: null,
			tabs: null,
			menu: null,
			init: function(){
				this.initRoot();
				this.initConfig();
				this.initContainer();
				this.initContentContainer();
				this.initUser();
				this.initTabs();
				this.initMenu();
			},
			initMenu: function(){
				this.menu = {};
				$.extend(this.menu, {
					parent: this,
					root: null,
					container: null,
					content: null,
					expand_btn: null,
					enabled: true,
					init: function(){
						this.initRoot();
						this.initContainer();
						this.initContent();
						this.initExpandBtn();
					},
					initContent: function(){
						this.content = this.container.find('#home_tabs_container');
					},
					initExpandBtn: function(){
						var _self = this;
						this.expand_btn = this.container.find('#expand_button');
						this.root.click(
							this.expand_btn,
							function(e, element){
								_self.expandBtnOnClick(e, element);
							}
						);
					},
					expandBtnOnClick: function(e, element){
						if(this.enabled){
							this.disable();
						}
						else{
							this.enable();
						}
					},
					enable: function(){
						this.enabled = true;
						this.content.css('display', 'block');
						this.expand_btn.addClass('disabled');
					},
					disable: function(){
						this.enabled = false;
						this.content.css('display', 'none');
						this.expand_btn.removeClass('disabled');
					},
					initRoot: function(){
						this.root = this.parent.root;
					},
					initContainer: function(){
						this.container = this.parent.container.find('#mobile_menu');
					}
				});
				this.menu.init();
			},
			initContentContainer: function(){
				this.content_container = this.container.find('#home_tabs_content_container');
			},
			initTabs: function(){
				var _self = this;
				this.tabs = this.root.fmx.tabs({
					triggers: this.container.find('.home_tab').not('.static'),
					container: this.content_container,
					loading: function(){
						_self.loading();
					},
					loaded: function(){
						_self.loaded();
					},
					error: function(){
						_self.error();
					},
					change: function(instance){
						_self.tabsOnChange(instance);
					}
				});
			},
			tabsOnChange: function(instance){
				this.root.stages_completed.hide();
				if(this.terms_and_conditions != null){
					this.root.terms_and_conditions.hide();
					this.terms_and_conditions = null;
				}
				if(this.root.next_level != null){
					this.root.next_level = null;
				}
			},
			loadView: function(path, params){
				var _self = this;
				this.loading();
				params = params == null ? {} : params;
				this.root.cdv.viewLoader(
					path,
					function(data){
						_self.loadViewOnSuccess(data);
					},
					function(){
						_self.loadViewOnError();
					}
				);
			},
			loadViewOnSuccess: function(data){
				this.loaded();
				this.content_container.empty();
				this.content_container.html(data);
			},
			loadViewOnError: function(){
				this.loaded();
				this.error();
			},
			loading: function(){
				this.root.loading();
			},
			loaded: function(){
				this.root.loaded();
			},
			error: function(){
				this.root.error();
			},
			initConfig: function(){
				this.config = config.app.views.home;
			},
			initUser: function(){
				this.user = {};
				$.extend(this.user, {
					parent: this,
					root: null,
					container: null,
					logout_btn: null,
					init: function(){
						this.initRoot();
						this.initContainer();
						this.initThumb();
					},
					initContainer: function(){
						var _self = this;
						this.container = this.parent.container.find('#home_user_logout_btn');
						this.root.click(
							this.container,
							function(e, element){
								_self.containerOnClick(e, element);
							}
						);
					},
					containerOnClick: function(e, element){
						if(!this.is_loading){
							var _self = this;
							this.loading();
							this.root.api(
								config.app.server.api.logout,
								{},
								function(data){
									_self.logoutOnSuccess(data);
								},
								function(){
									_self.logoutOnError();
								}
							);
						}
					},
					logoutOnSuccess: function(data){
						if(data.logout){
							this.loaded();
							this.parent.tabsOnChange(null);
							this.root.logout();
						}
						else{
							this.logoutOnError();
						}
					},
					logoutOnError: function(){
						this.error();
					},
					loading: function(){
						this.is_loading = true;
						this.root.loading();
					},
					loaded: function(){
						this.is_loading = false;
						this.root.loaded();
					},
					error: function(){
						this.loaded();
						this.root.error();
					},
					initThumb: function(){
						var thumb = this.container.find('#home_user_thumb');
						thumb.attr('src', this.root.facebook.getUserThumb(this.root.user.uid));
					},
					initRoot: function(){
						this.root = this.parent.root;
					}
				})
				this.user.init();
			},
			initContainer: function(){
				this.container = $('#home_container');
			},
			initRoot: function(){
				this.root = this.parent.root;
			}
		});
		bbc.home.init();
	});
})(jQuery);

(function(){
	$(function(){
		bbc.invitations = {};
		$.extend(bbc.invitations, {
			parent: bbc,
			root: null,
			delegate: null,
			config: null,
			facebook_friend_selector: null,
			facebook_error_container: null,
			is_loading: false,
			container: null,
			wrapper: null,
			actions: $(),
			next_btn: null,
			back_btn: null,
			invite_btn: null,
			invitation_count: 0,
			remaining: 0,
			facebook_loaded: false,
			invitations: {},
			init: function(){
				this.initRoot();
				this.initDelegate();
				this.initConfig();
				this.initContainer();
				this.initWrapper();
				this.initActions();
				this.initInvitations();
				this.initFacebookFriendSelector();
				this.initFacebookErrorContainer();
				this.initConfirmContainer();
				this.doRequest();
			},
			initConfirmContainer: function(){
				this.confirm_container = {};
				$.extend(this.confirm_container, {
					parent: this,
					root: null,
					container: null,
					btns: null,
					callback: null,
					init: function(){
						this.initRoot();
						this.initContainer();
						this.initBtns();
					},
					initBtns: function(){
						this.btns = this.container.find('.invitation_delete_action');
						this.initConfirmBtn();
						this.initCancelBtn();
					},
					initCancelBtn: function(){
						var _self = this;
						var cancel_btn = this.btns.filter('#invitations_delete_cancel_btn');
						this.root.click(
							cancel_btn,
							function(e, element){
								_self.cancelBtnOnClick(e, element);
							}
						);
					},
					cancelBtnOnClick: function(e, element){
						this.hide();
					},
					initConfirmBtn: function(){
						var _self = this;
						var confirm_btn = this.btns.filter('#invitations_delete_confirm_btn');
						this.root.click(
							confirm_btn,
							function(e, element){
								_self.confirmBtnOnClick(e, element);
							}
						);
					},
					confirmBtnOnClick: function(e, element){
						this.callback();
					},
					initContainer: function(){
						this.container = this.parent.container.find('#invitations_delete_container');
					},
					initRoot: function(){
						this.root = this.parent.root;
					},
					show: function(callback){
						this.callback = callback;
						this.container.css('display', 'block');
						this.parent.wrapper.css('display', 'none');
					},
					hide: function(){
						this.container.css('display', 'none');
						this.parent.wrapper.css('display', 'block');
					},
					loading: function(){
						this.btns.addClass('disabled');
					},
					loaded: function(){
						this.btns.removeClass('disabled');
					}
				});
				this.confirm_container.init();
			},
			initFacebookErrorContainer: function(){
				this.facebook_error_container = {};
				$.extend(this.facebook_error_container, {
					parent: this,
					root: null,
					container: null,
					init: function(){
						this.initRoot();
						this.initContainer();
						this.initFacebookBtn();
					},
					initFacebookBtn: function(){
						var _self = this;
						var facebook_btn = this.container.find('#invitations_facebook_error_btn');
						if(this.root.has_touch){
							var facebook_btn_dom = facebook_btn.get(0);
							facebook_btn_dom.addEventListener('touchstart', function(e){
								e.preventDefault();
								if(!_self.parent.is_loading){
									_self.loading();
									_self.root.facebook.login(
										function(instance){
											_self.facebookLoginSuccess(instance);
										},
										function(){
											_self.facebookLoginError();
										}
									);
								}
							}, false);
						}
						else{
							facebook_btn.click(function(e){
								e.preventDefault();
								if(!_self.parent.is_loading){
									_self.loading();
									_self.root.facebook.login(
										function(instance){
											_self.facebookLoginSuccess(instance);
										},
										function(){
											_self.facebookLoginError();
										}
									);
								}
							});
						}
					},
					facebookLoginSuccess: function(instance){
						var _self = this;
						this.root.api(
							config.app.server.api.renew_fb_token,
							{ fb_token: this.root.facebook.token },
							function(data){
								_self.renewTokenSuccess(data);
							},
							function(){
								_self.renewTokenError();
							}
						);
					},
					renewTokenSuccess: function(data){
						this.loaded();
						var icon_src = 'error';
						var msg = '';
						if(data.fb_error){
							msg = lang.app.bbc.views.invitations.facebook_renew_error_label;
						}
						else if(data.incorrect_user){
							msg = lang.app.bbc.views.invitations.facebook_renew_incorrect_user_label;
							this.facebookLogout();
						}
						else if(!data.saved){
							msg = lang.app.bbc.views.invitations.facebook_renew_save_error_label;
						}
						else{
							icon_src = 'success';
							msg = lang.app.bbc.views.invitations.facebook_renew_success_label;
							this.parent.wrapper.css('display', 'block');
							this.container.hide();							
						}
						this.root.fmx.notification({
							icon_src: icon_src,
							msg: msg
						});
					},
					facebookLogout: function(){
						var _self = this;
						this.loading();
						this.root.facebook.logout(function(){
							_self.facebookLogoutCallback();
						});
					},
					facebookLogoutCallback: function(){
						this.loaded();
					},
					renewTokenError: function(){
						this.error();
					},
					facebookLoginError: function(){
						this.loaded();
					},
					loading: function(){
						this.parent.loading();
					},
					loaded: function(){
						this.parent.loaded();
					},
					error: function(){
						this.parent.error();
					},
					initRoot: function(){
						this.root = this.parent.root;
					},
					initContainer: function(){
						this.container = this.parent.container.find('#invitations_facebook_error_container');
					},
					show: function(){
						this.container.css('display', 'block');
					},
					hide: function(){
						this.container.css('display', 'none');
					}
				});
				this.facebook_error_container.init();
			},
			initInvitations: function(){
				for(var i=1; i<=this.config.max_per_level; ++i){
					this.addInvitation(i);
				}
			},
			addInvitation: function(index){
				var invitation = {};
				$.extend(invitation, {
					parent: this,
					root: null,
					index: index,
					container: null,
					thumb_container: null,
					thumb: null,
					confirmed_container: null,
					data: null,
					has_data: false,
					init: function(){
						this.initRoot();
						this.initContainer();
						this.initThumbContainer();
					},
					initRoot: function(){
						this.root = this.parent.root;
					},
					initThumbContainer: function(){
						this.thumb_container = $('<div class="invitation_thumb_container"></div>');
						this.initThumb();
						this.initConfirmedContainer();
						this.initDeleteContainer();
						this.thumb_container.appendTo(this.container);
					},
					initDeleteContainer: function(){
						var _self = this;
						this.delete_container = $('<div class="invitation_delete_container"></div>');
						this.root.click(
							this.delete_container,
							function(e, element){
								_self.deleteContainerOnClick(e, element);
							}
						);
						this.delete_container.appendTo(this.thumb_container);
					},
					deleteContainerOnClick: function(e, element){
						if(!this.parent.is_loading){
							var _self = this;
							this.parent.confirm_container.show(function(){
								_self.deleteOnConfirm();
							});
						}
					},
					deleteOnConfirm: function(){
						var _self = this;
						this.deleteLoading();
						this.root.api(
							config.app.server.api.delete_invitation,
							{ id: this.data.id },
							function(data){
								_self.deleteSuccess(data);
							},
							function(){
								_self.deleteError();
							}
						);
					},
					deleteSuccess: function(data){
						if(data.deleted){
							this.clearData();
							this.deleteLoaded();
							this.parent.confirm_container.hide();
						}
						else{
							this.deleteError();
						}
					},
					deleteError: function(){
						this.deleteLoaded();
						this.root.error();
					},
					deleteLoading: function(){
						this.loading();
						this.parent.confirm_container.loading();
					},
					deleteLoaded: function(){
						this.loaded();
						this.parent.confirm_container.loaded();
					},
					loading: function(){
						this.parent.loading();
					},
					loaded: function(){
						this.parent.loaded();
					},
					initConfirmedContainer: function(){
						this.confirmed_container = $('<div class="invitation_confirmed_container"></div>');
						this.confirmed_container.appendTo(this.thumb_container);
					},
					initThumb: function(){
						this.thumb = $('<img />').addClass('invitation_thumb');
						this.thumb.appendTo(this.thumb_container);
					},
					initContainer: function(){
						this.container = this.parent.wrapper.find('#invitation_place' + this.index);
					},
					setData: function(data){
						this.has_data = true;
						this.data = data;
						this.container.addClass('active');
						this.setThumb();
						this.setConfirmed();
						++this.parent.invitation_count;
					},
					clearData: function(){
						this.has_data = false;
						this.clearThumb();
						this.clearConfirmed();
						this.parent.facebook_loaded = false;
						--this.parent.invitation_count;
					},
					clearThumb: function(){
						this.thumb_container.css('display', 'none');
					},
					clearConfirmed: function(){
						this.confirmed_container.css('display', 'none');
						this.delete_container.css('display', 'none');
					},
					setThumb: function(){
						var url = this.parent.config.fb_endpoint + "/" + this.data.uid + "/picture";
						this.thumb.attr('src', url);
						this.thumb_container.css('display', 'block');
					},
					setConfirmed: function(){
						if(this.data.is_confirmed == 1){
							this.confirmed_container.css('display', 'block');
						}
						else{
							this.delete_container.css('display', 'block');
						}
					}
				});
				invitation.init();
				this.invitations[index] = invitation;
			},
			initConfig: function(){
				this.config = config.app.views.invitations;
			},
			doRequest: function(){
				var _self = this;
				this.loading();
				this.root.api(
					config.app.server.api.invitations_for_level,
					{ id: this.delegate.level },
					function(data){
						_self.success(data);
					},
					function(){
						_self.error();
					}
				);
			},
			success: function(data){
				this.loaded();
				this.renderInvitations(data.invitations);
				this.wrapper.css('display', 'block');
				this.facebook_friend_selector.max = this.remaining = this.config.max_per_level - this.invitation_count;
			},
			renderInvitations: function(invitations){
				var _self = this;
				var i = 1;
				$.each(invitations, function(key, invitation){
					_self.invitations[i].setData(invitation);
					++i;
				});
			},
			findInvitation: function(){
				var invitation = null;
				$.each(this.invitations, function(key, element){
					if(!element.has_data){
						invitation = element;
						return false;
					}
				});
				return invitation;
			},
			error: function(){
				this.loaded();
				this.root.error();
			},
			loading: function(){
				this.is_loading = true;
				this.actions.addClass('disabled');
				this.root.loading();
			},
			loaded: function(){
				this.is_loading = false;
				this.actions.removeClass('disabled');
				this.root.loaded();
			},
			initWrapper: function(){
				this.wrapper = this.container.find('#invitations_wrapper');
			},
			initActions: function(){
				this.initNextBtn();
				this.initBackBtn();
				this.initInviteBtn();
			},
			initInviteBtn: function(){
				var _self = this;
				this.invite_btn = this.wrapper.find('#invitations_invite_btn');
				this.root.click(
					this.invite_btn,
					function(e, element){
						_self.inviteBtnOnClick(e, element);
					}
				);
				this.actions = this.actions.add(this.invite_btn);
			},
			inviteBtnOnClick: function(e, element){
				if(this.remaining <= 0){
					this.root.fmx.notification({
						icon_src: 'error',
						msg: lang.app.bbc.views.invitations.max_per_level_label
					});
				}
				else if(!this.facebook_loaded){
					var _self = this;
					this.loading();
					this.root.api(
						config.app.server.api.friends_for_level,
						{ id: this.delegate.level },
						function(data){
							_self.friendsOnSuccess(data);
						},
						function(){
							_self.friendsOnError();
						}
					);
				}
				else{
					this.facebook_friend_selector.show();
				}
			},
			friendsOnSuccess: function(data){
				this.loaded();
				if(data.fb_error){
					this.wrapper.css('display', 'none');
					this.facebook_error_container.show();
				}
				else{
					this.facebook_loaded = true;
					this.facebook_friend_selector.setFriends(data.friends.data);
					this.facebook_friend_selector.show();
				}
			},
			friendsOnError: function(){
				this.error();
			},
			initBackBtn: function(){
				if(this.delegate.show_back_btn){
					var _self = this;
					this.back_btn = this.wrapper.find('#invitations_back_btn').css('display', 'block');
					this.root.click(
						this.back_btn,
						function(e, element){
							_self.backBtnOnClick(e, element);
						}
					);
				}
				this.actions = this.actions.add(this.back_btn);
			},
			backBtnOnClick: function(e, element){
				if(!this.is_loading){
					this.dismiss();
				}
			},
			initNextBtn: function(){
				if(this.delegate.show_next_btn){
					var _self = this;
					this.next_btn = this.wrapper.find('#invitations_next_btn').css('display', 'block');
					this.root.click(
						this.next_btn,
						function(e, element){
							_self.nextBtnOnClick(e, element);
						}
					);
					this.actions = this.actions.add(this.next_btn);
				}
			},
			nextBtnOnClick: function(e, element){
				if(!this.is_loading){
					this.dismiss();
				}
			},
			initContainer: function(){
				this.container = $('#invitations_container');
			},
			initFacebookFriendSelector: function(){
				var _self = this;
				this.facebook_friend_selector = this.root.fmx.facebookFriendSelector({
					fb_endpoint: this.config.fb_endpoint,
					root: this.root,
					level: this.delegate.level,
					callback: function(instance){
						_self.facebookFriendSelectorCallback(instance);
					},
					loading: function(){
						_self.facebookInviteLoading();
					},
					loaded: function(){
						_self.facebookInviteLoaded();
					},
					error: function(){
						_self.facebookInviteError();
					}
				});
			},
			facebookFriendSelectorCallback: function(instance){
				this.addNewInvitation(instance.invitation);
				++this.invitation_count;
				this.remaining = this.config.max_per_level - this.invitation_count;
			},
			addNewInvitation: function(data){
				var invitation = this.findInvitation();
				if(invitation != null){
					invitation.setData(data);
				}
			},
			facebookInviteLoading: function(){
				this.loading();
			},
			facebookInviteLoaded: function(){
				this.loaded();
			},
			facebookInviteError: function(){
				this.root.error();
			},
			initRoot: function(){
				this.root = this.parent.root;
			},
			initDelegate: function(){
				this.delegate = this.root.invitations_loader.delegate;
			},
			dismiss: function(){
				this.delegate.dismiss(this);
			}
		});
		bbc.invitations.init();
	});
})(jQuery);

(function(){
	$(function(){
		bbc.login = {};
		$.extend(bbc.login, {
			parent: bbc,
			root: null,
			container: null,
			form: null,
			submit_btn: null,
			facebook_btn: null,
			sponsor: null,
			init: function(){
				this.initRoot();
				this.initContainer();
				this.initForm();
				this.initSubmitBtn();
				this.initFacebookBtn();
				this.initSponsor();
				this.initForgotPassBtn();
			},
			initForgotPassBtn: function(){
				var _self = this;
				var forgot_pass_btn = this.form.find('#login_forgot_pass_btn');
				this.root.click(
					forgot_pass_btn,
					function(e, element){
						_self.forgotPassBtnOnClick(e, element);
					}
				);
			},
			forgotPassBtnOnClick: function(e, element){
				var url = this.root.getServerPath(config.app.server.api.recover_password);
				this.root.cdv.browserLauncher(url);
			},
			initSponsor: function(){
				this.root.loadSponsor(
					config.app.sponsors.identities.splash,
					this.container.find('#login_sponsor')
				);
			},
			initForm: function(){
				var _self = this;
				this.form = this.container.find('#login_form').submit(function(e){
					e.preventDefault();
					_self.formOnSubmit(e, $(this));
				});
				this.addHiddenField('device_id', device.uuid);
				var form = this.form.get(0);
				form.addEventListener('touchstart', function(e){
					e.stopPropagation();
				}, false);
			},
			addHiddenField: function(key, val){
				var hidden_field = $('<input />', {
					type: 'hidden',
					name: key,
					value: val
				});
				hidden_field.appendTo(this.form);
			},
			formOnSubmit: function(e, element){
				if(!this.is_loading){
					var _self = this;
					this.loading();
					this.root.api(
						config.app.server.api.login,
						this.form.serialize(),
						function(data){
							_self.formOnSuccess(data);
						},
						function(){
							_self.formOnError();
						}
					);
				}
			},
			formOnSuccess: function(data){
				this.loaded();
				if(data.logged_in){
					this.root.userCallback(data.auth_token, data.user);
				}
				else{
					this.root.fmx.notification({
						icon_src: 'error',
						msg: lang.app.bbc.views.login.messages.authentication_failiure
					});
				}
			},
			formOnError: function(){
				this.error();
			},
			initSubmitBtn: function(){
				var _self = this;
				this.submit_btn = this.form.find('#login_submit_btn');
				this.root.click(
					this.submit_btn,
					function(e, element){
						_self.submitBtnOnClick(e, element);
					}
				);
			},
			submitBtnOnClick: function(e, element){
				this.form.submit();
			},
			initFacebookBtn: function(){
				var _self = this;
				this.facebook_btn = this.container.find('#social_signup_facebook_btn');
				this.root.click(
					this.facebook_btn,
					function(e, element){
						_self.facebookBtnOnClick(e, element);
					}
				);
			},
			facebookBtnOnClick: function(e, element){
				if(!this.is_loading){
					var _self = this;
					this.loading();
					this.root.facebook.login(
						function(instance){
							_self.facebookLoginSuccess(instance);
						},
						function(){
							_self.facebookLoginError();
						}
					);	
				}
			},
			facebookLoginSuccess: function(instance){
				var _self = this;
				this.root.api(
					config.app.server.api.facebook_user,
					{ token: this.root.facebook.token },
					function(data){
						_self.facebookValidationSuccess(data);
					},
					function(){
						_self.facebookValidationError();
					}
				);
			},
			facebookValidationSuccess: function(data){
				this.loaded();
				if(data.exists){
					this.root.fmx.notification({
						icon_src: 'error',
						msg: lang.app.bbc.views.login.messages.facebook_exists
					});
				}
				else{
					this.root.facebook.data = data.fb_data;
					this.root.loadView(config.app.server.urls.signup);
				}
			},
			facebookValidationError: function(){
				this.loaded();
				this.root.error();
			},
			facebookLoginError: function(){
				this.loaded();
			},
			loading: function(){
				this.is_loading = true;
				this.submit_btn.addClass('disabled');
				this.root.loading();
			},
			loaded: function(){
				this.is_loading = false;
				this.submit_btn.removeClass('disabled');
				this.root.loaded();
			},
			error: function(){
				this.loaded();
				this.root.error();
			},
			initContainer: function(){
				this.container = $('#login_container');
			},
			initRoot: function(){
				this.root = this.parent.root;
			}
		});
		bbc.login.init();
	});
})(jQuery);

(function(){
	$(function(){
		bbc.home.prizes_tab = {};
		$.extend(bbc.home.prizes_tab, {
			parent: bbc.home,
			root: null,
			container: null,
			init: function(){
				this.initRoot();
				this.initContainer();
				this.show();
			},
			show: function(){
				this.container.stop(true, true).animate({
					opacity: 1
				}, config.app.views.home.fade_interval);
			},
			initRoot: function(){
				this.root = this.parent.root;
			},
			initContainer: function(){
				this.container = $('#prizes_container');
			}
		});
		bbc.home.prizes_tab.init();
	});
	
})(jQuery)

(function(){
	$(function(){
		bbc.home.points_tab = {};
		$.extend(bbc.home.points_tab, {
			parent: bbc.home,
			root: null,
			container: null,
			init: function(){
				this.initRoot();
				this.initContainer();
				this.initScroller();
				this.show();
			},
			initScroller: function(){
				this.scroller = this.root.fmx.scroller({
					container: this.container.find('#points_text_wrapper'),
					wrapper_id: 'points_text'
				});
			},
			show: function(){
				this.container.stop(true, true).animate({
					opacity: 1
				}, config.app.views.home.fade_interval);
			},
			initRoot: function(){
				this.root = this.parent.root;
			},
			initContainer: function(){
				this.container = $('#points_container');
			}
		});
		bbc.home.points_tab.init();
	});
})(jQuery);

(function(){
	$(function(){
		bbc.home.about_tab = {};
		$.extend(bbc.home.about_tab, {
			parent: bbc.home,
			root: null,
			container: null,
			init: function(){
				this.initRoot();
				this.initContainer();
				this.initScroller();
				this.show();
			},
			initScroller: function(){
				this.scroller = this.root.fmx.scroller({
					container: this.container.find('#about_text'),
					wrapper_id: 'about_text_wrapper'
				});
			},
			show: function(){
				this.container.stop(true, true).animate({
					opacity: 1
				}, config.app.views.home.fade_interval);
			},
			initRoot: function(){
				this.root = this.parent.root;
			},
			initContainer: function(){
				this.container = $('#about_container');
			}
		});
		bbc.home.about_tab.init();
	});
})(jQuery);

(function(){
    $(function(){
        bbc.home.terms_and_conditions = {};
        $.extend(bbc.home.terms_and_conditions,{
            root: null,
            parent: bbc.home,
            init: function(){
                this.initRoot();
				this.showTermsAndConditions();
            },
            initRoot: function(){
                this.root = this.parent.root;
            },
            showTermsAndConditions: function(){
                this.root.terms_and_conditions.show(false);
            }
        });
        bbc.home.terms_and_conditions.init();
    });
})(jQuery);

(function(){
	$(function(){
		bbc.home.levels_tab = {};
		$.extend(bbc.home.levels_tab, {
			parent: bbc.home,
			root: null,
			config: null,
			container: null,
			next_level: null,
			question: null,
			answers_container: null,
			answers: null,
			active: null,
			submit_btn: null,
			splash_container: null,
			question_container: null,
			question_wrapper: null,
			correct_container: null,
			incorrect_container: null,
			invitations_container: null,
			video_player: null,
			is_loading: false,
			total_time: 0,
			ref_time: null,
			response: null,
			invitations_delegate: null,
			share_container: null,
			tmp_data: null,
			init: function(){
				this.initRoot();
				this.initConfig();
				this.initNextLevel();
				this.initQuestion();
				this.initContainer();
				this.initSmallLogo();
				this.initBigLogo();
				this.initAnswersContainer();
				this.initSubmitBtn();
				this.initAnswers();
				this.initViews();
				this.initInvitationsContainer();
				this.initSponsors();
				this.initShareContainer();
				this.initTimeout();

				var level = this.next_level.place;
				if (level == 1 || level == 2 || level == 5 || level == 6 || level == 9 || level == 10 ){
					document.getElementById('levels_star').src= 'images/app/logos/levels/london_blue.png';
				}else{
					document.getElementById('levels_star').src = 'images/app/logos/levels/london_red.png';
				}
			},
			initShareContainer: function(){
				this.share_container = {};
				$.extend(this.share_container, {
					parent: this,
					root: null,
					container: null,
					wrapper: null,
					opts: config.app.views.share,
					points_value: null,
					invitations_value: null,
					title_value: null,
					next_btn: null,
					is_loading: false,
					place: null,
					init: function(){
						this.initRoot();
						this.initContainer();
						this.initWrapper();
						this.initShareBtnWrapper();
						this.initPointsValue();
						this.initPointsValue();
						this.initInvitationsValue();
						this.initNextBtn();
					},
					initPointsValue: function(){
						this.points_value = this.wrapper.find('#share_content_title_value');
					},
					initWrapper: function(){
						this.wrapper = this.container.find('#share_wrapper');
					},
					initNextBtn: function(){
						var _self = this;
						this.next_btn = this.wrapper.find('#share_next_btn');
						this.root.click(
							this.next_btn,
							function(e, element){
								_self.nextBtnOnClick(e, element);
							}
						);
					},
					nextBtnOnClick: function(e, element){
						if(!this.is_loading){
							this.parent.renderNext();
							this.hide();
						}
					},
					initInvitationsValue: function(){
						this.invitations_value = this.wrapper.find('#share_invited_text_number');
					},
					initPointsValue: function(){
						this.points_value = this.wrapper.find('#share_complete_text_number');
					},
					initShareBtnWrapper: function(){
						var share_btn_wrapper = this.wrapper.find('#share_btn_wrapper');
						this.initFbShareBtn(share_btn_wrapper);
						this.initTwShareBtn(share_btn_wrapper);
					},
					initTwShareBtn: function(container){
						var _self = this;
						var share_btn = container.find('#tw_share_btn');
						this.root.click(
							share_btn,
							function(e, element){
								_self.twShareBtnOnClick(e, element);
							}
						);
					},
					twShareBtnOnClick: function(e, element){
						//var url = this.opts.tw_share_url + "?url=" + escape(this.opts.url);
						var url = this.opts.tw_share_url + "?text=Acabo de participar en el Video Trivia BBC Entertainment. Participa y gana tú también. " + escape("www.bbcentertainmentvideotrivia.com");
						this.openUrl(url);
					},
					initFbShareBtn: function(container){
						var _self = this;
						var share_btn = container.find('#fb_share_btn');
						this.root.click(
							share_btn,
							function(e, element){
								_self.fbShareBtnOnClick(e, element);
							}
						);
					},
					fbShareBtnOnClick: function(e, element){
						var url = this.opts.fb_share_url + "?u=" + escape(this.opts.url);
						this.openUrl(url);
					},
					initRoot: function(){
						this.root = this.parent.root;
					},
					openUrl: function(url){
						this.root.cdv.browserLauncher(url);
					},
					initContainer: function(){
						this.container = $('#share_container');
					},
					loading: function(){
						this.is_loading = true;
						this.wrapper.stop(true, true).css('display', 'none');
						this.next_btn.addClass('disabled');
						this.root.loading();
					},
					loaded: function(){
						this.is_loading = false;
						this.wrapper.stop(true, true).fadeIn(config.app.views.fade_interval);
						this.next_btn.removeClass('disabled');
						this.root.loaded();
					},
					show: function(place){
						this.place = place;
						this.points_value.html(this.place);
						this.parent.container.stop(true, true).css('display', 'none');
						this.container.stop(true, true).fadeIn(config.app.views.fade_interval);
						this.doRequest();
					},
					hide: function(){
						if(this.parent.tmp_data["next"] == null){
							this.parent.container.stop(true, true).css('display', 'none');
						}
						else{
							this.parent.container.stop(true, true).fadeIn(config.app.views.fade_interval);
						}
						this.container.stop(true, true).css('display', 'none');
					},
					doRequest: function(){
						var _self = this;
						this.loading();
						this.root.api(
							config.app.server.api.stage_totals,
							{ id: this.place },
							function(data){
								_self.success(data);
							},
							function(){
								_self.error();
							}
						);
					},
					success: function(data){
						this.points_value.html(data.points)
						this.invitations_value.html(data.invitations);
						this.loaded();
					},
					error: function(){
						this.loaded();
						this.root.error();
					}
				});
				this.share_container.init();
			},
			initSponsors: function(){
				var sponsors = this.container.find('.levels_sponsor');
				this.initTopSponsor(sponsors);
				this.initLeftSponsor(sponsors);
				this.initRightSponsor(sponsors);
			},
			initTopSponsor: function(sponsors){
				this.root.loadSponsor(
					config.app.sponsors.identities.register,
					sponsors.filter('.top')
				);
			},
			initLeftSponsor: function(sponsors){
				this.root.loadSponsor(
					config.app.sponsors.identities.questions,
					sponsors.filter('.left')
				);
			},
			initRightSponsor: function(sponsors){
				this.root.loadSponsor(
					config.app.sponsors.identities.questions,
					sponsors.filter('.right')
				);
			},
			initInvitationsContainer: function(){
				this.invitations_container = this.container.find('#levels_invitations_container');
			},
			initTimeout: function(){
				var _self = this;
				setTimeout(function(){
					_self.timeoutCallback();
				}, this.config.idle_timeout);
			},
			timeoutCallback: function(){
				this.splash_container.stop(true, true).css('display', 'none');
				this.question_container.stop(true, true).fadeIn(config.app.views.fade_interval);
				this.initVideoPlayer();
			},
			initVideoPlayer: function(){
				var _self = this;
				this.video_player = this.root.fmx.videoPlayer(
					$.extend({
						container: this.question_container.find('#levels_video_player'),
						flv_src: this.question.flv_src,
						mp4_src: this.root.getServerPath(this.question.mp4_src),
						complete: function(){
							_self.videoPlayerOnComplete();
						}
					}, this.config.video_player)
				);
			},
			videoPlayerOnComplete: function(){
				this.question_wrapper.stop(true, true).fadeIn(config.app.views.fade_interval)
				this.setRefTime();
			},
			setRefTime: function(){
				this.ref_time = (new Date()).getTime();
			},
			initConfig: function(){
				this.config = config.app.views.levels;
			},
			initViews: function(){
				this.initSplashContainer();
				this.initQuestionContainer();
				this.initCorrectContainer();
				this.initIncorrectContainer();
			},
			initCorrectContainer: function(){
				this.correct_container = {};
				$.extend(this.correct_container, {
					parent: this,
					root: null,
					container: null,
					next_btn: null,
					is_loading: false,
					init: function(){
						this.initRoot();
						this.initContainer();
						this.initNextBtn();
					},
					initNextBtn: function(){
						var _self = this;
						this.next_btn = this.container.find('#levels_next_btn');
						this.root.click(
							this.next_btn,
							function(e, element){
								_self.nextBtnOnClick(e, element);
							}
						);
					},
					nextBtnOnClick: function(e, element){
						if(!this.is_loading){
							this.parent.nextAction();
						}
					},
					initRoot: function(){
						this.root = this.parent.root;
					},
					initContainer: function(){
						this.container = this.parent.container.find('#levels_correct_container');
					},
					show: function(){
						this.container.stop(true, true).fadeIn(config.app.views.fade_interval);
					},
					hide: function(){
						this.container.stop(true, true).stop(true, true).css('display', 'none');
					},
					loading: function(){
						this.is_loading = true;
						this.next_btn.addClass('disabled');
					},
					loaded: function(){
						this.is_loading = false;
						this.next_btn.removeClass('disabled');
					}
				});
				this.correct_container.init();
			},
			nextAction: function(){
				this.question.app_user_question_id = this.response.app_user_question_id;
				var next_question = null;
				$.each(this.next_level.questions, function(key, question){
					if(question.app_user_question_id == null){
						next_question = question;
					}
					return next_question == null;
				});
				if(next_question == null){
					this.levelDone();
				}
				else{
					this.parent.loadView(config.app.server.urls.levels);
				}
			},
			initInvitationsDelegate: function(){
				this.invitations_delegate = {};
				$.extend(this.invitations_delegate, {
					parent: this,
					root: null,
					level: this.next_level.place,
					container: null,
					show_next_btn: true,
					init: function(){
						this.initRoot();
						this.initContainer();
					},
					initContainer: function(){
						this.container = this.parent.invitations_container;
					},
					initRoot: function(){
						this.root = this.parent.root;
					},
					loading: function(){
						this.parent.loading();
					},
					loaded: function(){
						this.parent.loaded();
					},
					success: function(){},
					dismiss: function(){
						this.container.empty();
						this.parent.nextRequest();
					}
				});
				this.invitations_delegate.init();
			},
			levelDone: function(){
				this.initInvitationsDelegate();
				this.root.invitations_loader.load(this.invitations_delegate);
			},
			nextRequest: function(){
				// level done
				var _self = this;
				this.nextLoading();
				this.root.api(
					config.app.server.api.next_level,
					{},
					function(data){
						_self.nextSuccess(data);
					},
					function(){
						_self.nextError();
					}
				);
			},
			nextSuccess: function(data){
				this.tmp_data = data;
				var next_level = this.tmp_data["next"];
				this.root.show_last = data.show;
				if(next_level == null || next_level.stage_place != this.next_level.stage_place){
					this.share_container.show(this.next_level.stage_place);
				}
				else{
					this.renderNext();
				}
				this.nextLoaded();
			},
			renderNext: function(){
				var next_level = this.tmp_data["next"];
				var next_url = null;
				if(next_level == null){
					this.container.stop(true, true).css('display', 'none');
					this.root.stages_completed.show();
				}
				else{
					if(next_level.stage_place != this.next_level.stage_place){
						next_url = config.app.server.urls.stages;
						next_level.rendered_fanpage = false;
						this.root.fanpage = this.tmp_data.fanpage;
					}
					else{
						next_url = config.app.server.urls.levels;
					}
				}
				this.next_level = this.root.next_level = next_level;
				if(next_url != null){
					this.parent.loadView(next_url);
				}
			},
			nextLoading: function(){
				this.loading();
				this.correct_container.loading();
			},
			nextLoaded: function(){
				this.loaded();
				this.correct_container.loaded();
			},
			initIncorrectContainer: function(){
				this.incorrect_container = {};
				$.extend(this.incorrect_container, {
					parent: this,
					root: null,
					container: null,
					back_btn: null,
					init: function(){
						this.initRoot();
						this.initContainer();
						this.initBackBtn();
					},
					initBackBtn: function(){
						var _self = this;
						this.back_btn = this.container.find('#levels_back_btn');
						this.root.click(
							this.back_btn,
							function(e, element){
								_self.backBtnOnClick(e, element);
							}
						);
					},
					backBtnOnClick: function(e, element){
						this.parent.setRefTime();
						this.hide();
					},
					initRoot: function(){
						this.root = this.parent.root;
					},
					initContainer: function(){
						this.container = this.parent.container.find('#levels_incorrect_container');
					},
					show: function(){
						this.container.stop(true, true).fadeIn(config.app.views.fade_interval);
					},
					hide: function(){
						this.parent.question_wrapper.stop(true, true).fadeIn(config.app.views.fade_interval);
						this.parent.video_player.show();
						this.container.stop(true, true).css('display', 'none');
					}
				});
				this.incorrect_container.init();
			},
			initSplashContainer: function(){
				this.splash_container = this.container.find('#levels_splash_container');
			},
			initQuestionContainer: function(){
				this.question_container = this.container.find('#levels_question_container');
				this.initQuestionWrapper();
			},
			initQuestionWrapper: function(){
				this.question_wrapper = this.question_container.find('#levels_question_wrapper');
			},
			initSubmitBtn: function(){
				var _self = this;
				this.submit_btn = this.answers_container.find('#levels_answer_btn');
				this.root.click(
					this.submit_btn,
					function(e, element){
						_self.submitBtnOnClick(e, element);
					}
				);
			},
			submitBtnOnClick: function(e, element){
				if(!this.is_loading){
					if(this.active == null){
						this.root.fmx.notification({
							icon_src: 'error',
							msg: lang.app.bbc.views.levels.missing_answer_label
						});
					}
					else{
						var _self = this;
						var now = (new Date()).getTime();
						this.total_time += Math.round((now - this.ref_time) / 1000);
						this.loading();
						this.root.api(
							config.app.server.api.answer_question,
							{
								question_id: this.question.id,
								answer_id: this.active.id,
								time: this.total_time
							},
							function(data){
								_self.answerOnSuccess(data);
							},
							function(){
								_self.answerOnError();
							}
						);
					}
				}
			},
			answerOnSuccess: function(data){
				if(!data.saved){
					this.answerOnError();
				}
				else{
					this.loaded();
					this.resetAnswer();
					this.question_wrapper.stop(true, true).css('display', 'none');
					this.video_player.hide();
					if(data.is_correct){
						this.response = data;
						this.correct_container.show();
					}
					else{
						this.incorrect_container.show();
					}
				}
			},
			resetAnswer: function(){
				this.active.hide();
				this.active = null;
			},
			answerOnError: function(){
				this.error();
			},
			initAnswersContainer: function(){
				this.answers_container = this.container.find('#levels_answers_container');
			},
			initAnswers: function(){
				var _self = this;
				this.answers = {};
				$.each(this.question.answers, function(key, answer){
					_self.addAnswer(answer);
				});
			},
			addAnswer: function(data){
				var answer = {};
				$.extend(answer, {
					parent: this,
					root: null,
					id: data.id,
					data: data,
					container: null,
					checkbox: null,
					init: function(){
						this.initRoot();
						this.initContainer();
					},
					initRoot: function(){
						this.root = this.parent.root;
					},
					initContainer: function(){
						this.container = $('<div class="levels_answer"></div>');
						this.initCheckbox();
						this.initLabel();
						this.container.append('<div class="clear"></div>');
						this.container.insertBefore(this.parent.submit_btn);
					},
					initLabel: function(){
						var label = $('<div class="levels_answer_label">' + this.data.answer + '</div>');
						label.appendTo(this.container);
					},
					initCheckbox: function(){
						var _self = this;
						var checkbox = $('<div class="levels_answer_checkbox"></div>');
						checkbox.appendTo(this.container);
						this.checkbox = this.root.fmx.checkbox({
							container: checkbox,
							field_name: 'answer_checkbox',
							can_disable: false,
							change: function(instance){
								_self.checkboxOnChange();
							}
						});
					},
					checkboxOnChange: function(instance){
						this.parent.setActive(this);
					},
					disable: function(){
						this.checkbox.disable();
					},
					hide: function(){
						this.container.hide();
					}
				});
				answer.init();
				this.answers[data.id] = answer;
			},
			setActive: function(which){
				if(this.active != which){
					if(this.active != null){
						this.active.disable();
					}
					this.active = which;
				}
			},
			initQuestion: function(){
				var _self = this;
				$.each(this.next_level.questions, function(key, question){
					if(question.app_user_question_id == null){
						_self.question = question;
					}
					return _self.question == null;
				});
			},
			initNextLevel: function(){
				this.next_level = this.root.next_level;
			},
			initSmallLogo: function(){
				var small_logo = this.container.find('#level_small_logo');
				small_logo.addClass('level_' + this.next_level.place);
			},		
			initBigLogo: function(){
				var big_logo = this.container.find('#level_big_logo');
				big_logo.addClass('level_' + this.next_level.place);
			},
			initContainer: function(){
				this.container = this.parent.content_container.find('#levels_container');
				this.container.addClass('stage_' + this.next_level.stage_place);
			},
			initRoot: function(){
				this.root = this.parent.root;
			},
			loading: function(){
				this.is_loading = true;
				this.submit_btn.addClass('disabled');
				$.each(this.answers, function(key, answer){
					answer.checkbox.is_active = false;
				});
				this.root.loading();
			},
			loaded: function(){
				this.is_loading = false;
				this.submit_btn.removeClass('disabled');
				$.each(this.answers, function(key, answer){
					answer.checkbox.is_active = true;
				});
				this.root.loaded();
			},
			error: function(){
				this.loaded();
				this.root.error();
			}
		});
		bbc.home.levels_tab.init();
	});
})(jQuery);

(function(){
	$(function(){
		bbc.home.my_account_tab = {};
		$.extend(bbc.home.my_account_tab, {
			parent: bbc.home,
			root: null,
			config: null,
			container: null,
			wrapper: null,
			stages_container: null,
			stages_wrapper: null,
			points_wrapper: null,
			total_points: null,
			fanpage_points: null,
			level_container: null,
			invitations_container: null,
			levels: {},
			init: function(){
				this.initRoot();
				this.initConfig();
				this.initContainer();
				this.initWrapper();
				this.initStagesContainer();
				this.initStagesWrapper();
				this.initTotalPoints();
				this.initFanPagePoints();
				this.initLevelContainer();
				this.initInvitationsContainer();
				this.doRequest();
			},
			initInvitationsContainer: function(){
				this.invitations_container = this.container.find('#my_account_invitations_container');
			},
			initConfig: function(){
				this.config = config.app.views.my_account;
			},
			initLevelContainer: function(){
				this.level_container = {};
				$.extend(this.level_container, {
					parent: this,
					root: null,
					container: null,
					points_container: null,
					friends_container: null,
					back_btn: null,
					invite_friends_btn: null,
					level_logo: null,
					data: null,
					delegate: null,
					is_loading: false,
					init: function(){
						this.initRoot();
						this.initContainer();
						this.initPointsContainer();
						this.initFriendsContainer();
						this.initBackBtn();
						this.initInviteFriendsBtn();
						this.initLevelLogo();
					},
					initDelegate: function(){
						this.delegate = {};
						$.extend(this.delegate, {
							parent: this,
							root: null,
							level: this.data.data.place,
							container: null,
							show_back_btn: true,
							init: function(){
								this.initRoot();
								this.initContainer();
							},
							initRoot: function(){
								this.root = this.parent.root;
							},
							initContainer: function(){
								this.container = this.parent.parent.invitations_container;
							},
							loading: function(){
								this.parent.loading();
							},
							loaded: function(){
								this.parent.loaded();
							},
							success: function(){
								this.parent.parent.wrapper.stop(true, true).css('display', 'none');
							},
							dismiss: function(instance){
								this.container.empty();
								this.parent.friends_container.html(instance.invitation_count);
								this.parent.parent.wrapper.stop(true, true).fadeIn(config.app.views.fade_interval);
							}
						});
						this.delegate.init();
					},
					initInviteFriendsBtn: function(){
						var _self = this;
						this.invite_friends_btn = this.container.find('#my_account_invite_friends_btn');
						this.root.click(
							this.invite_friends_btn,
							function(e, element){
								_self.inviteFriendsBtnOnClick(e, element);
							}
						);
					},
					inviteFriendsBtnOnClick: function(e, element){
						if(!this.is_loading){
							this.initDelegate();
							this.root.invitations_loader.load(this.delegate);
						}
					},
					initBackBtn: function(){
						var _self = this;
						this.back_btn = this.container.find('#my_account_level_back_btn');
						this.root.click(
							this.back_btn,
							function(e, element){
								_self.backBtnOnClick(e, element);
							}
						);
					},
					setData: function(data){
						this.data = data;
						var path = this.parent.config.levels_logo_path.replace('#{level}', data.data.place);
						this.level_logo.attr('src', path);
						this.points_container.html(data.level_data.points);
						this.friends_container.html(data.level_data.invitations);
						this.parent.stages_container.stop(true, true).css('display', 'none');
						this.container.stop(true, true).fadeIn(config.app.views.fade_interval);
					},
					initLevelLogo: function(){
						this.level_logo = this.container.find('#my_account_level_logo');
					},
					backBtnOnClick: function(e, element){
						if(!this.is_loading){
							this.container.stop(true, true).css('display', 'none');
							this.parent.stages_container.stop(true, true).fadeIn(config.app.views.fade_interval);
						}
					},
					initPointsContainer: function(){
						this.points_container = this.container.find('#my_account_level_points');
					},
					initFriendsContainer: function(){
						this.friends_container = this.container.find('#my_account_level_friends');
					},
					initContainer: function(){
						this.container = this.parent.wrapper.find('#my_account_level_container');
					},
					initRoot: function(){
						this.root = this.parent.root;
					},
					show: function(){
						this.container.stop(true, true).fadeIn(config.app.views.fade_interval);
					},
					hide: function(){
						this.container.stop(true, true).css('display', 'none');
					},
					loading: function(){
						this.is_loading = true;
						this.back_btn.addClass('disabled');
						this.invite_friends_btn.addClass('disabled');
						this.root.loading();
					},
					loaded: function(){
						this.is_loading = false;
						this.back_btn.removeClass('disabled');
						this.invite_friends_btn.removeClass('disabled');
						this.root.loaded();
					}
				});
				this.level_container.init();
			},
			doRequest: function(){
				var _self = this;
				this.loading();
				this.root.api(
					config.app.server.api.my_account,
					{},
					function(data){
						_self.success(data);
					},
					function(){
						_self.error();
					}
				);
			},
			error: function(){
				this.loaded();
				this.root.error();
			},
			success: function(data){
				this.show();
				this.loaded();
				this.setTotalPoints(data.user);
				this.setFanPagePoints(data.user);
				this.initLevels(data.levels);
				this.renderStages(data.stages);
				if(this.root.has_touch){
					this.stages_wrapper.getNiceScroll().onResize();
				}
			},
			setFanPagePoints: function(user){
				this.fanpage_points.html(user.fanpage_points);
			},
			show: function(){
				this.container.stop(true, true).animate({
					opacity: 1
				}, config.app.views.home.fade_interval);
			},
			setTotalPoints: function(user){
				this.total_points.html(user.points);
			},
			initLevels: function(levels){
				var _self = this;
				$.each(levels, function(key, level){
					_self.levels[level.level_id] = level;
				});
			},
			renderStages: function(stages){
				var _self = this;
				$.each(stages, function(key, stage){
					_self.addStage(stage);
				});
				this.stages_container.stop(true, true).fadeIn(config.app.views.fade_interval);;
			},
			addStage: function(data){
				var stage = {};
				$.extend(stage, {
					parent: this,
					root: null,
					data: data,
					container: null,
					label: null,
					levels_container: null,
					init: function(){
						this.initRoot();
						this.initContainer();
						this.initLevels();
					},
					initLevels: function(){
						var _self = this;
						$.each(this.data.levels, function(key, level){
							_self.addLevel(level);
						});
					},
					addLevel: function(data){
						var level = {};
						$.extend(level, {
							root: null,
							parent: this,
							data: data,
							level_data: null,
							container: null,
							init: function(){
								this.initRoot();
								this.initLevelData();
								this.initContainer();
							},
							initRoot: function(){
								this.root = this.parent.root;
							},
							initLevelData: function(){
								this.level_data = this.parent.parent.levels[this.data.id];
							},
							initContainer: function(){
								this.container = $('<div class="my_account_stage_level"></div>');
								this.container.html(lang.app.bbc.views.my_account.level_label + " " + this.data.place);
								this.container.appendTo(this.parent.levels_container);
								if(this.level_data != null){
									var _self = this;
									this.container.addClass('active');
									this.root.click(
										this.container,
										function(e, element){
											_self.containerOnClick(e, element);
										}
									);
								}
							},
							containerOnClick: function(e, element){
								this.parent.parent.setLevelView(this);
							}
						});
						level.init();
					},
					initContainer: function(){
						this.container = $('<div class="my_account_stage"></div>');
						this.initLabel();
						this.initLevelsContainer();
						this.container.append('<div class="clear"></div>');
						this.container.appendTo(this.parent.stages_wrapper);
					},
					initLevelsContainer: function(){
						this.levels_container = $('<div class="my_account_stage_levels_container"></div>');
						this.levels_container.appendTo(this.container);
					},
					initLabel: function(){
						var label = $('<div class="my_account_stage_label"></div>');
						label.html(lang.app.bbc.views.my_account.stage_label + " " + this.data.place);
						label.appendTo(this.container);
					},
					initRoot: function(){
						this.root = this.parent.root;
					}
				});
				stage.init();
			},
			setLevelView: function(which){
				this.level_container.setData(which);
			},
			initTotalPoints: function(){
				this.total_points = this.stages_container.find('#my_account_points_total');
			},
			initFanPagePoints: function(){
				this.fanpage_points = this.stages_container.find('#my_account_fanpage_points_value');
			},
			initStagesWrapper: function(){
				this.stages_wrapper = this.stages_container.find('#my_account_stages_wrapper');
				if(this.root.has_touch){
					this.stages_wrapper.niceScroll();
				}
				else{
					this.stages_wrapper.css('overflow-y', 'scroll');
				}
			},
			initContainer: function(){
				this.container = this.parent.content_container.find('#my_account_container');
			},
			initWrapper: function(){
				this.wrapper = this.container.find('#my_account_wrapper');
			},
			initStagesContainer: function(){
				this.stages_container = this.container.find('#my_account_stages_container');
			},
			initRoot: function(){
				this.root = this.parent.root;
			},
			loading: function(){
				this.root.loading();
			},
			loaded: function(){
				this.root.loaded();
			}
		});
		bbc.home.my_account_tab.init();
	});
})(jQuery);

(function(){
	$(function(){
		bbc.home.stages_tab = {};
		$.extend(bbc.home.stages_tab, {
			parent: bbc.home,
			root: null,
			container: null,
			play_btn: null,
			next_level: null,
			fanpage: null,
			fb_like_container: null,
			init: function(){
				this.initRoot();
				this.initContainer();
				this.initFbLikeContainer();
				this.initPlayBtn();
				this.doRequest();
			},
			initFbLikeContainer: function(){
				this.fb_like_container = {};
				$.extend(this.fb_like_container, {
					parent: this,
					root: null,
					container: null,
					init: function(){
						this.initRoot();
						this.initContainer();
						this.initCloseBtn();
						this.initLikeBtn();
					},
					initLikeBtn: function(){
						var _self = this;
						var like_btn = this.container.find('#fb_like_url');
						this.root.click(
							like_btn,
							function(e, element){
								_self.likeBtnOnClick(e, element);
							}
						);
					},
					likeBtnOnClick: function(e, element){
						this.root.cdv.browserLauncher(config.app.urls.fan_page);
					},
					initCloseBtn: function(){
						var _self = this;
						var close_btn = this.container.find('#fb_like_close_btn');
						this.root.click(
							close_btn,
							function(e, element){
								_self.closeBtnOnClick(e, element);
							}
						);
					},
					closeBtnOnClick: function(e, element){
						this.hide();
					},
					initContainer: function(){
						this.container = $('#fb_like_content');
					},
					initRoot: function(){
						this.root = this.parent.root;
					},
					hide: function(){
						this.container.stop(true, true).css('display', 'none');
						this.parent.render();
					},
					show: function(){
						this.container.stop(true, true).fadeIn(config.app.views.fade_interval);
					}
				});
				this.fb_like_container.init();
			},
			initPlayBtn: function(){
				var _self = this;
				this.play_btn = this.container.find('#stages_play_btn');
				this.root.click(
					this.play_btn,
					function(e, element){
						_self.playBtnOnClick(e, element);
					}
				);
			},
			playBtnOnClick: function(e, element){
				this.parent.loadView(config.app.server.urls.levels);
			},
			doRequest: function(){
				if(this.root.next_level == null){
					var _self = this;
					this.loading();
					this.root.api(
						config.app.server.api.next_level,
						{},
						function(data){
							_self.success(data);
						},
						function(){
							_self.error();
						}
					);
				}
				else{
					this.next_level = this.root.next_level;
					this.fanpage = this.root.fanpage;
					if(!this.next_level.rendered_fanpage && !this.fanpage.fb_error && !this.fanpage.likes_fanpage){
						this.next_level.rendered_fanpage = true;
						this.fb_like_container.show();
					}
					else{
						this.render();
					}
				}
			},
			loading: function(){
				this.root.loading();
			},
			loaded: function(){
				this.root.loaded();
			},
			success: function(data){
				this.loaded();
				this.root.show_last = data.show;
				this.root.next_level = data["next"];
				if(this.root.next_level == null){
					this.root.stages_completed.show();
				}
				else{
					this.root.next_level.rendered_fanpage = false;
					this.root.fanpage = data.fanpage;
					this.doRequest();
				}
			},
			render: function(){
				if(this.next_level == null){
					this.root.stages_completed.show();
				}
				else{
					this.root.stages_completed.hide();
					this.setStage();
				}
			},
			setStage: function(){
				this.container.addClass('stage_' + this.next_level.stage_place);
				this.container.stop(true, true).animate({
					opacity: 1
				}, config.app.views.home.fade_interval);
				this.play_btn.stop(true, true).fadeIn(config.app.views.fade_interval);
			},
			error: function(){
				this.loaded();
				this.root.error();
			},
			initContainer: function(){
				this.container = this.parent.content_container.find('#stages_container');
			},
			initRoot: function(){
				this.root = this.parent.root;
			}
		});
		bbc.home.stages_tab.init();
	});
})(jQuery);


























