
/**
 * zahoransky script
 * Eddy Tavaszi [Equinoxe GmbH]
 *
 * last modified: 16.01.2012
 * 
 * -------------------------------------------------------------------------------------------------------------------------*/
/* VARIABLES
 * -------------------------------------------------------------------------------------------------------------------------*/
var NAV;
var DEVICE_ONLINE	= false;
var thisImage = -1;
var total     = ImageData.length;
var successes = [];
var failures  = [];
var childbrowser;
var alreadyscaned = 0;

for (var i=0; i<total; i++) {
    ImageData[i].type = ImageData[i].format;
}

var LOADING = {
    'strokeColor': "666666",
    'backgroundOpacity': 1,
    'fullScreen': false,
    'boxLength': 1200
};

/* XUI
 * -------------------------------------------------------------------------------------------------------------------------*/
(function(){function J(a,b,c){c=a.slice((c||b)+1||a.length);a.length=b<0?a.length+b:b;return a.push.apply(a,c)}function K(a){return a.firstChild===null?{UL:"LI",DL:"DT",TR:"TD"}[a.tagName]||a.tagName:a.firstChild.tagName}function x(a,b){return typeof a==A?L(a,K(b)):a}function L(a,b){var c={},d=/^<([A-Z][A-Z0-9]*)([^>]*)>([\s\S]*)<\/\1>/i,e,f;f=0;var g;if(d.test(a)){d=d.exec(a);b=d[1];if(d[2]!=="")for(a=d[2].split(/([A-Z]*\s*=\s*['|"][A-Z0-9:;#\s]*['|"])/i);f<a.length;f++){g=a[f].replace(/^\s*|\s*$/g,"");if(g!==""&&g!==" "){g=g.split("=");c[g[0]]=g[1].replace(/(["']?)/g,"")}}a=d[3]}b=n.createElement(b);for(e in c){f=n.createAttribute(e);f.nodeValue=c[e];b.setAttributeNode(f)}b.innerHTML=a;return b}function M(a){var b=/\S/;a.each(function(c){for(var d=c.firstChild,e=-1,f;d;){f=d.nextSibling;if(d.nodeType==3&&!b.test(d.nodeValue))c.removeChild(d);else d.nodeIndex=++e;d=f}})}function t(a){if(a._xuiEventID)return a._xuiEventID;return a._xuiEventID=++t.id}function B(a,b){a=s[a]=s[a]||{};return a[b]=a[b]||[]}function N(a,b,c){var d=t(a);b=B(d,b);d=function(e){if(c.call(a,e)===false){e.preventDefault();e.stopPropagation()}};d.guid=c.guid=c.guid||++t.id;d.handler=c;b.push(d);return d}function C(a,b){return D(b).test(a.className)}function E(a){return(a||"").replace(O,"")}var u,h,k=this,A=new String("string"),n=k.document,P=/^#?([\w-]+)$/,Q=/^#/,R=/<([\w:]+)/,q=function(a){return[].slice.call(a,0)};try{q(n.documentElement.childNodes)}catch(U){q=function(a){for(var b=[],c=0;a[c];c++)b.push(a[c]);return b}}k.x$=k.xui=h=function(a,b){return new h.fn.find(a,b)};if(![].forEach)Array.prototype.forEach=function(a,b){var c=this.length||0,d=0;if(typeof a=="function")for(;d<c;d++)a.call(b,this[d],d,this)};h.fn=h.prototype={extend:function(a){for(var b in a)h.fn[b]=a[b]},find:function(a,b){var c=[];if(a)if(b==u&&this.length)c=this.each(function(d){c=c.concat(q(h(a,d)))}).reduce(c);else{b=b||n;if(typeof a==A){if(P.test(a)&&b.getElementById&&b.getElementsByTagName){c=Q.test(a)?[b.getElementById(a.substr(1))]:b.getElementsByTagName(a);if(c[0]==null)c=[]}else if(R.test(a)){b=n.createElement("i");b.innerHTML=a;q(b.childNodes).forEach(function(d){c.push(d)})}else c=k.Sizzle!==u?Sizzle(a,b):b.querySelectorAll(a);c=q(c)}else if(a instanceof Array)c=a;else if(a.toString()=="[object NodeList]")c=q(a);else if(a.nodeName||a===k)c=[a]}else return this;return this.set(c)},set:function(a){var b=h();b.cache=q(this.length?this:[]);b.length=0;[].push.apply(b,a);return b},reduce:function(a,b){var c=[];a=a||q(this);a.forEach(function(d){c.indexOf(d,0,b)<0&&c.push(d)});return c},has:function(a){var b=h(a);return this.filter(function(){var c=this,d=null;b.each(function(e){d=d||e==c});return d})},filter:function(a){var b=[];return this.each(function(c,d){a.call(c,d)&&b.push(c)}).set(b)},not:function(a){var b=q(this);return this.filter(function(c){var d;h(a).each(function(e){return d=b[c]!=e});return d})},each:function(a){for(var b=0,c=this.length;b<c;++b)if(a.call(this[b],this[b],b,this)===false)break;return this}};h.fn.find.prototype=h.fn;h.extend=h.fn.extend;h.extend({html:function(a,b){M(this);if(arguments.length==0)return this[0].innerHTML;if(arguments.length==1&&arguments[0]!="remove"){b=a;a="inner"}if(a!="remove"&&b&&b.each!==u){if(a=="inner"){var c=n.createElement("p");b.each(function(e){c.appendChild(e)});this.each(function(e){e.innerHTML=c.innerHTML})}else{var d=this;b.each(function(e){d.html(a,e)})}return this}return this.each(function(e){var f,g=0;if(a=="inner")if(typeof b==A||typeof b=="number"){e.innerHTML=b;e=e.getElementsByTagName("SCRIPT");for(f=e.length;g<f;g++)eval(e[g].text)}else{e.innerHTML="";e.appendChild(b)}else if(a=="outer")e.parentNode.replaceChild(x(b,e),e);else if(a=="top")e.insertBefore(x(b,e),e.firstChild);else if(a=="bottom")e.insertBefore(x(b,e),null);else if(a=="remove")e.parentNode.removeChild(e);else if(a=="before")e.parentNode.insertBefore(x(b,e.parentNode),e);else a=="after"&&e.parentNode.insertBefore(x(b,e.parentNode),e.nextSibling)})},attr:function(a,b){if(arguments.length==2)return this.each(function(d){a=="checked"&&(b==""||b==false||typeof b=="undefined")?d.removeAttribute(a):d.setAttribute(a,b)});else{var c=[];this.each(function(d){d=d.getAttribute(a);d!=null&&c.push(d)});return c}}});"inner outer top bottom remove before after".split(" ").forEach(function(a){h.fn[a]=function(b){return function(c){return this.html(b,c)}}(a)});h.events={};var s={};h.extend({on:function(a,b,c){return this.each(function(d){if(h.events[a]){var e=t(d);e=B(e,a);c=c||{};c.handler=function(f,g){h.fn.fire.call(h(this),a,g)};e.length||h.events[a].call(d,c)}d.addEventListener(a,N(d,a,b),false)})},un:function(a,b){return this.each(function(c){for(var d=t(c),e=B(d,a),f=e.length;f--;)if(b===u||b.guid===e[f].guid){c.removeEventListener(a,e[f],false);J(s[d][a],f,1)}s[d][a].length===0&&delete s[d][a];for(var g in s[d])return;delete s[d]})},fire:function(a,b){return this.each(function(c){if(c==n&&!c.dispatchEvent)c=n.documentElement;var d=n.createEvent("HTMLEvents");d.initEvent(a,true,true);d.data=b||{};d.eventName=a;c.dispatchEvent(d)})}});"click load submit touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend orientationchange".split(" ").forEach(function(a){h.fn[a]=function(b){return function(c){return c?this.on(b,c):this.fire(b)}}(a)});h(k).on("load",function(){"onorientationchange"in n.body||function(a,b){h(k).on("resize",function(){var c=k.innerWidth<a&&k.innerHeight>b&&k.innerWidth<k.innerHeight,d=k.innerWidth>a&&k.innerHeight<b&&k.innerWidth>k.innerHeight;if(c||d){k.orientation=c?0:90;h("body").fire("orientationchange");a=k.innerWidth;b=k.innerHeight}})}(k.innerWidth,k.innerHeight)});h.touch=function(){try{return!!n.createEvent("TouchEvent").initTouchEvent}catch(a){return false}}();t.id=1;h.extend({tween:function(a,b){a instanceof Array&&a.forEach(function(){});var c=function(){var e={};"duration after easing".split(" ").forEach(function(f){if(a[f]){e[f]=a[f];delete a[f]}});return e}(a),d=function(e){var f=[],g;if(typeof e!=A){for(g in e)f.push(g+":"+e[g]);f=f.join(";")}else f=e;return f}(a);return this.each(function(e){emile(e,d,c,b)})}});var O=/^(\s|\u00A0)+|(\s|\u00A0)+$/g;h.extend({setStyle:function(a,b){a=a.replace(/\-[a-z]/g,function(c){return c[1].toUpperCase()});return this.each(function(c){c.style[a]=b})},getStyle:function(a,b){var c=function(e,f){return n.defaultView.getComputedStyle(e,"").getPropertyValue(f.replace(/[A-Z]/g,function(g){return"-"+g.toLowerCase()}))};if(b===u){var d=[];this.each(function(e){d.push(c(e,a))});return d}else this.each(function(e){b(c(e,a))})},addClass:function(a){return this.each(function(b){if(C(b,a)===false)b.className=E(b.className+" "+a)})},hasClass:function(a,b){var c=this;return this.length&&function(){var d=false;c.each(function(e){if(C(e,a)){d=true;b&&b(e)}});return d}()},removeClass:function(a){if(a===u)this.each(function(c){c.className=""});else{var b=D(a);this.each(function(c){c.className=E(c.className.replace(b,"$1"))})}return this},css:function(a){for(var b in a)this.setStyle(b,a[b]);return this}});var F={},D=function(a){var b=F[a];if(!b){b=new RegExp("(^|\\s+)"+a+"(?:\\s+|$)");F[a]=b}return b};h.extend({xhr:function(a,b,c){function d(){if(g.readyState==4){delete f.xmlHttpRequest;if(g.status===0||g.status==200)g.handleResp();/^[45]/.test(g.status)&&g.handleError()}}if(!/^(inner|outer|top|bottom|before|after)$/.test(a)){c=b;b=a;a="inner"}var e=c?c:{};if(typeof c=="function"){e={};e.callback=c}var f=this,g=new XMLHttpRequest;c=e.method||"get";var v=e.async||false,w=e.data||null,i=0;g.queryString=w;g.open(c,b,v);if(e.headers)for(;i<e.headers.length;i++)g.setRequestHeader(e.headers[i].name,e.headers[i].value);g.handleResp=e.callback!=null?e.callback:function(){f.html(a,this.responseText)};g.handleError=e.error&&typeof e.error=="function"?e.error:function(){};if(v){g.onreadystatechange=d;this.xmlHttpRequest=g}g.send(w);v||d();return this}});(function(a,b){function c(i,o,l){return(i+(o-i)*l).toFixed(3)}function d(i,o,l){return i.substr(o,l||1)}function e(i,o,l){for(var p=2,m,j,r=[],y=[];m=3,j=arguments[p-1],p--;)if(d(j,0)=="r")for(j=j.match(/\d+/g);m--;)r.push(~~j[m]);else{if(j.length==4)j="#"+d(j,1)+d(j,1)+d(j,2)+d(j,2)+d(j,3)+d(j,3);for(;m--;)r.push(parseInt(d(j,1+m*2,2),16))}for(;m--;){p=~~(r[m+3]+(r[m]-r[m+3])*l);y.push(p<0?0:p>255?255:p)}return"rgb("+y.join(",")+")"}function f(i){var o=parseFloat(i);i=i.replace(/^[\-\d\.]+/,"");return isNaN(o)?{v:i,f:e,u:""}:{v:o,f:c,u:i}}function g(i){var o={},l=w.length,p;v.innerHTML='<div style="'+i+'"></div>';for(i=v.childNodes[0].style;l--;)if(p=i[w[l]])o[w[l]]=f(p);return o}var v=n.createElement("div"),w="backgroundColor borderBottomColor borderBottomWidth borderLeftColor borderLeftWidth borderRightColor borderRightWidth borderSpacing borderTopColor borderTopWidth bottom color fontSize fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop maxHeight maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft paddingRight paddingTop right textIndent top width wordSpacing zIndex".split(" ");b[a]=function(i,o,l,p){i=typeof i=="string"?n.getElementById(i):i;l=l||{};var m=g(o);o=i.currentStyle?i.currentStyle:getComputedStyle(i,null);var j,r={},y=+new Date,G=l.duration||200,H=y+G,I,S=l.easing||function(z){return-Math.cos(z*Math.PI)/2+0.5};for(j in m)r[j]=f(o[j]);I=setInterval(function(){var z=+new Date,T=z>H?1:(z-y)/G;for(j in m)i.style[j]=m[j].f(r[j].v,m[j].v,S(T))+m[j].u;if(z>H){clearInterval(I);l.after&&l.after();p&&setTimeout(p,1)}},10)}})("emile",this)})();

xui.extend({

/**
 * Adds more DOM nodes to the existing element list.
 */
    add: function(q) {
        [].push.apply(this, slice(xui(q)));
        return this.set(this.reduce());
    },
    end: function () {
        return this.set(this.cache || []);
    },
    show: function() {
        return this.setStyle('display','block');
    },
    hide: function() {
        return this.setStyle('display','none');
    }
});


/* START & NAVIGATION
* -------------------------------------------------------------------------------------------------------------------------*/

function webLayer() {
	cordova = {
			exec: function() {
				
			}
	}
}

function enableZoom() {
	/*var viewport = document.querySelector("meta[name=viewport]");
	viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=4.0, minimum-scale=1.0, user-scalable=yes');
	console.log("enableZoom");*/
}

function disableZoom() {
	/*var viewport = document.querySelector("meta[name=viewport]");
	viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no');
	console.log("disableZoom");*/
}



// DEVICE READY
function onBodyLoad() {
    document.addEventListener("deviceready",onDeviceReady,false);
    document.addEventListener("online",deviceOnline,false);
    document.addEventListener("offline",deviceOffline,false);
    document.addEventListener("resume",onResume,false);
    /*webLayer();
    onDeviceReady();*/
}

function onResume() {
    getNews(4, 0);
}

// START
function onDeviceReady() {
    cordova.exec(	function() { },    //Success callback from the plugin
                    function() { console.log("error"); console.log(arguments[0]); },     //Error callback from the plugin
                    'EquinoxePlugin',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin
                    'notifyReady',              //Tell plugin, which action we want to perform
                    []
    );
    document.addEventListener("offline", deviceOffline, false);
    document.addEventListener("online", deviceOnline, false);
    document.addEventListener("backbutton", function() {
    	window.ui.goBack();
    	return false;
    }, false);
    //if(window.attachEvent) {window.attachEvent("onload",loupe._init);}
    //childBrowser = ChildBrowser.install();

    ui.showPageById('news');
    
}

function deviceOffline() {
    DEVICE_ONLINE = false;
}

function deviceOnline() {
    DEVICE_ONLINE = true;
    // News laden.
    getNews(4);
}

function showlupe(){
    lupe.toggle('plan_Lupe');
}

function openChildBrowser(url) {
	/*cordova.exec(	function() {  },    //Success callback from the plugin
	            function() { console.log("error"); console.log(arguments[0]); },     //Error callback from the plugin
	            'EquinoxePlugin',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin
	            'showPDF',              //Tell plugin, which action we want to perform
	            [
	             	url
	            ]
	);*/
    try {
    	window.plugins.childBrowser.showWebPage(url);
    } catch (err) { alert(err); }
	
}

function openPDF(url) {
	cordova.exec(	function() { console.log("pdf"); },    //Success callback from the plugin
	            function() { console.log("error"); console.log(arguments[0]); },     //Error callback from the plugin
	            'EquinoxePlugin',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin
	            'showPDF',              //Tell plugin, which action we want to perform
	            [
	             	url
	            ]
	);
}

function showLoading(message) {
    cordova.exec(function() { },
        function() { },
        'EquinoxePlugin',
        'showLoading',
        [
            message
        ]
    );
}

function hideLoading() {
    cordova.exec(function() { },
        function() { },
        'EquinoxePlugin',
        'hideLoading',
        [
        ]
    );
}

function scannerFake(success, failure) {
    if (thisImage == null) {
        success({cancelled: true})
    }
    else {
        success({
            cancelled: false,
            text:      ImageData[thisImage].text,
            format:    ImageData[thisImage].format
        })
    }
}

function scan() {
    //if(DEVICE_ONLINE){
        try {
            window.plugins.barcodeScanner.scan(scannerSuccess, scannerFailure);
        }
        catch (e) {
            scannerFailure("exception scanning: " + e);
        }
    /*} else {
        navigator.notification.alert("Um diese Funktion zu benutzen benötigt die App eine Internetverbindung!", null, "Hinweis");
    }*/
}

function getNews(a, count) {

    if(!DEVICE_ONLINE){ dspOffline(); return; }
    showLoading("Receiving news");
    x$(window).xhr('http://zahoransky-group.com/app/news.cfm?cat='+a+'&limit='+count, {
        async: true,
        error: function() {
            hideLoading();
        },
        callback: function() {
            if(a == 4) {
                NEWS = JSON.parse(this.responseText);
                dspNews();
            } else if(a == 63) {
				temp = JSON.parse(this.responseText);
				loadNews(temp,'group_news',a,count);
			} else if(a == 65) {
				temp = JSON.parse(this.responseText);
				loadNews(temp,'mold_making',a,count);
			} else if(a == 67) {
				temp = JSON.parse(this.responseText);
				loadNews(temp,'brush_production',a,count);
			} else if(a == 69) {
				temp = JSON.parse(this.responseText);
				loadNews(temp,'packing_machine',a,count);
			} else if(a == 71) {
				temp = JSON.parse(this.responseText);
				loadNews(temp,'system_technology',a,count);
            }
            hideLoading();
        }
    });

}

function dspNews(){

    var news = '<ul class="list"><li class="group topnews">TOP NEWS</li>';
    for(var i=0; i<NEWS.length; i++){
        var titel = unescape(NEWS[i].titel);
        if(titel.length > 0) {
            var pic = unescape(NEWS[i].pic);
            if(pic.length > 0) {
                var thumb = pic.replace(/\/piclib\//g, "");
                var firstdash = thumb.indexOf("/");
                var folder = thumb.substr(0,firstdash);
                thumb = thumb.replace(/\.png/g, "_tb80.png");
                thumb = thumb.replace(/\.jpg/g, "_tb80.jpg");
                thumb = thumb.replace(folder, folder+"_tb");
                thumb = 'http://www.zahoransky-group.com/piclib/'+thumb;
                pic = 'http://www.zahoransky-group.com/'+pic;
            } else {
                pic = 'img/logo.png';
            }
            if(NEWS[i].urlout == ''){
                news += '<li><a href="#news_'+NEWS[i].id+'"><div><img src="'+thumb+'" /></div><h2>'+titel+'</h2></a></li>';
                var page = '<div id="news_'+NEWS[i].id+'" class="news" title="NEWS"><ul class="full"><li><img src="'+pic+'" /><p><b>'+titel+'</b><br /><br />'+unescape(NEWS[i].body)+'</p></li></ul></div>';
                x$('#news').after(page);
            } else {
				news += '<li><a href="javascript:openChildBrowser(&quot;'+unescape(NEWS[i].urlout)+'&quot;)"><div><img src="'+thumb+'" /></div><h2>'+titel+'</h2></a></li>';
            }

        }
    }

	news += '<li class="group"><a onclick="getNews(63,1)" href="#group_news">GROUP NEWS</a></li>';
	news += '<li class="group"><a onclick="getNews(65,1)" href="#mold_making">MOLD MAKING NEWS</a></li>';
	news += '<li class="group"><a onclick="getNews(67,1)" href="#brush_production">BRUSH PRODUCTION NEWS</a></li>';
	news += '<li class="group"><a onclick="getNews(69,1)" href="#packing_machine">PACKING MACHINES NEWS</a></li>';
	news += '<li class="group"><a onclick="getNews(71,1)" href="#system_technology">SYSTEMS TECHNOLOGY NEWS</a></li>';

    news += '</ul>';
    x$('#news').html(news);

}

function loadNews(a,b,c,d) {

	var news = '<ul class="list">';

	for(var i=0; i<a.length; i++){
		var titel = unescape(a[i].titel);
		if(titel.length > 0) {
			var pic = unescape(a[i].pic);
			if(pic.length > 0) {
				var thumb = pic.replace(/\/piclib\//g, "");
				var firstdash = thumb.indexOf("/");
				var folder = thumb.substr(0,firstdash);
				thumb = thumb.replace(/\.png/g, "_tb80.png");
				thumb = thumb.replace(/\.jpg/g, "_tb80.jpg");
				thumb = thumb.replace(folder, folder+"_tb");
				thumb = 'http://www.zahoransky-group.com/piclib/'+thumb;
				pic = 'http://www.zahoransky-group.com/'+pic;
			} else {
				pic = 'img/logo.png';
			}
			if(a[i].urlout == ''){
				news += '<li><a href="#news_'+a[i].id+'"><div><img src="'+thumb+'" /></div><h2>'+titel+'</h2></a></li>';
				var page = '<div id="news_'+a[i].id+'" class="news" title="NEWS"><ul class="full"><li><img src="'+pic+'" /><p><b>'+titel+'</b><br /><br />'+unescape(a[i].body)+'</p></li></ul></div>';
				x$('#news').after(page);
			} else {
				news += '<li><a href="javascript:openChildBrowser(&quot;'+unescape(a[i].urlout)+'&quot;)"><div><img src="'+thumb+'" /></div><h2>'+titel+'</h2></a></li>';
			}
		}
	}

	if(d == 1 && a.length >= 5) {
		news += '<li class="group news"><a href="javascript:getNews('+c+',0)">Load more news ...</a></li>';
	}
	
	news += '</ul>';

	x$('#'+b).html(news);
}


function scannerSuccess(result) {
    
    url = result.text;
    httpcheck = url.substr(0,4);
    
    switch (url) {
    
        // Z.LION 1114
        case "http://zahoransky-group.com/product/zlion_1114":
            var content = 	'<div id="product">';
            content +=	'<h1>Z.LION 1114</h1>';
            content +=	'<p>Fully automated machine for manufacturing sold-by-meter strip brushes</p>';
            content +=	'<ul>';
            content +=	'<li onclick="openChildBrowser(&quot;http://zahoransky-group.com/product/zlion_1114&quot;);">Website</li>';
            content +=	'</ul>';
            content +=	'<ul>';
            content +=	'<li class="scan" onclick="scan();">Rescan</li>';
            content +=	'</ul>';
            content +=	'</div>';
            alreadyscaned = 1;
        break;
        
        // Z.LION 6325+P500
        case "http://zahoransky-group.com/product/zlion_6325":
            var content = 	'<div id="product">';
            content +=	'<h1>Z.LION 6325</h1>';
            content +=	'<p>Semi-automated 5-Axis Twin Drilling and Tufting Machine, Continuously</p>';
            content +=	'<ul>';
            content +=	'<li class="left" onclick="openPDF(&quot;www/pdf/ZLION_Brochure.pdf&quot;);">PDF</li>';
            content +=	'<li onclick="openChildBrowser(&quot;http://zahoransky-group.com/product/zlion_6325&quot;);">Website</li>';
            content +=	'</ul>';
            content +=	'<ul>';
            content +=	'<li class="scan" onclick="scan();">Rescan</li>';
            content +=	'</ul>';
            content +=	'</div>';
            alreadyscaned = 1;
        break;
        
        // Z.PARD 6224
        case "http://zahoransky-group.com/product/zpard_6224":
            var content = 	'<div id="product">';
            content +=	'<h1>Z.PARD</h1>';
            content +=	'<p>Carousel Twin Production Machine</p>';
            content +=	'<ul>';
            content +=	'<li class="left" onclick="openPDF(&quot;www/pdf/Z_PARD_Brochure.pdf&quot;);">PDF</li>';
            content +=	'<li onclick="openChildBrowser(&quot;http://zahoransky-group.com/product/zpard_6224&quot;);">Website</li>';
            content +=	'</ul>';
            content +=	'<ul>';
            content +=	'<li class="scan" onclick="scan();">Rescan</li>';
            content +=	'</ul>';
            content +=	'</div>';
            alreadyscaned = 1;
        break;
        
        // Z.TIGER 8225MT
        case "http://zahoransky-group.com/product/ztiger_8225mt":
            var content = 	'<div id="product">';
            content +=	'<h1>Z.TIGER 8225MT</h1>';
            content +=	'<p>Fully Automated 4-Station/5-Axis Twin Carousel</p>';
            content +=	'<ul>';
            content +=	'<li class="left" onclick="openPDF(&quot;www/pdf/ZTIGER_GB.pdf&quot;);">PDF</li>';
            content +=	'<li onclick="openChildBrowser(&quot;http://zahoransky-group.com/product/ztiger_8225mt&quot;);">Website</li>';
            content +=	'</ul>';
            content +=	'<ul>';
            content +=	'<li class="scan" onclick="scan();">Rescan</li>';
            content +=	'</ul>';
            content +=	'</div>';
            alreadyscaned = 1;
        break;
        
        // IDP2
        case "http://zahoransky-group.com/product/zidp2":
            var content = 	'<div id="product">';
            content +=	'<h1>Z.IDP 2</h1>';
            content +=	'<p>Integrated Dental Production</p>';
            content +=	'<ul>';
            content +=	'<li onclick="openChildBrowser(&quot;http://zahoransky-group.com/product/zidp2&quot;);">Website</li>';
            content +=	'</ul>';
            content +=	'<ul>';
            content +=	'<li class="scan" onclick="scan();">Rescan</li>';
            content +=	'</ul>';
            content +=	'</div>';
            alreadyscaned = 1;
        break;
        
        // Z.AERO
        
        // Z.ORCA 116
        case "http://zahoransky-group.com/product/zorca_116":
            var content = 	'<div id="product">';
            content +=	'<h1>Z.ORCA 116</h1>';
            content +=	'<p>Compact unit including finishing machine</p>';
            content +=	'<ul>';
            content +=	'<li onclick="openChildBrowser(&quot;http://zahoransky-group.com/product/zorca_116&quot;);">Website</li>';
            content +=	'</ul>';
            content +=	'<ul>';
            content +=	'<li class="scan" onclick="scan();">Rescan</li>';
            content +=	'</ul>';
            content +=	'</div>';
            alreadyscaned = 1;
        break;
        
        // Z.SAILFIN
        case "http://zahoransky-group.com/product/zsailfin":
            var content = 	'<div id="product">';
            content +=	'<h1>Z.SAILFIN</h1>';
            content +=	'<p>Machine for interdental and mascara brushes</p>';
            content +=	'<ul>';
            content +=	'<li class="left" onclick="openPDF(&quot;www/pdf/Z_SAILFIN_Brochure.pdf&quot;);">PDF</li>';
            content +=	'<li onclick="openChildBrowser(&quot;http://zahoransky-group.com/product/zsailfin&quot;);">Website</li>';
            content +=	'</ul>';
            content +=	'<ul>';
            content +=	'<li class="scan" onclick="scan();">Rescan</li>';
            content +=	'</ul>';
            content +=	'</div>';
            alreadyscaned = 1;
        break;
        
        // Z.SHARK 4
        case "http://zahoransky-group.com/product/zshark4":
            var content = 	'<div id="product">';
            content +=	'<h1>Z.SHARK 4</h1>';
            content +=	'<p>High-performance tufting machine for production of tooth brushes</p>';
            content +=	'<ul>';
            content +=	'<li onclick="openChildBrowser(&quot;http://zahoransky-group.com/product/zshark4&quot;);">Website</li>';
            content +=	'</ul>';
            content +=	'<ul>';
            content +=	'<li class="scan" onclick="scan();">Rescan</li>';
            content +=	'</ul>';
            content +=	'</div>';
            alreadyscaned = 1;
        break;
        
        // Z.PACK 6
        case "http://zahoransky-group.com/product/zpack6":
            var content = 	'<div id="product">';
            content +=	'<h1>Z.PACK 6</h1>';
            content +=	'<p>Z.PACK 6 is a highly productive blister machine that provides for a broad and diverse range of state-of-the-art blisters for nearly all kinds of applications.</p>';
            content +=	'<ul>';
            content +=	'<li class="left" onclick="openPDF(&quot;www/pdf/ZPACK_Prospekt_English.pdf&quot;);">PDF</li>';
            content +=	'<li onclick="openChildBrowser(&quot;http://zahoransky-group.com/product/zpack6&quot;);">Website</li>';
            content +=	'</ul>';
            content +=	'<ul>';
            content +=	'<li class="scan" onclick="scan();">Rescan</li>';
            content +=	'</ul>';
            content +=	'</div>';
            alreadyscaned = 1;
        break;
        
        // RP12 by Giori
        case "http://zahoransky-group.com/product/rp12":
            var content = 	'<div id="product">';
            content +=	'<h1>ZAHORANSKY by Giori RP12</h1>';
            content +=	'<p>Trimming and Flagging Machine</p>';
            content +=	'<ul>';
            content +=	'<li class="left" onclick="openPDF(&quot;www/pdf/RP12_Brochure.pdf&quot;);">PDF</li>';
            content +=	'<li onclick="openChildBrowser(&quot;http://zahoransky-group.com/product/rp12&quot;);">Website</li>';
            content +=	'</ul>';
            content +=	'<ul>';
            content +=	'<li class="scan" onclick="scan();">Rescan</li>';
            content +=	'</ul>';
            content +=	'</div>';
            alreadyscaned = 1;
        break;
        
        // The Moldmaking
        case "http://www.zahoransky-group.com/formenbau/form_start.cfm":
            var content = 	'<div id="product">';
            content +=	'<h1>The Moldmaking</h1>';
            content +=	'<p></p>';
            content +=	'<ul>';
            content +=	'<li class="left" onclick="openPDF(&quot;www/pdf/Mouldmaking_brochure.pdf&quot;);">PDF</li>';
            content +=	'<li onclick="openChildBrowser(&quot;http://www.zahoransky-group.com/formenbau/form_start.cfm&quot;);">Website</li>';
            content +=	'</ul>';
            content +=	'<ul>';
            content +=	'<li class="scan" onclick="scan();">Rescan</li>';
            content +=	'</ul>';
            content +=	'</div>';
            alreadyscaned = 1;
        break;

        default:
            if(httpcheck == "http") {
                var content = 	'<div id="product">';
                content +=	'<ul>';
                content +=	'<li class="scan" onclick="openChildBrowser(&quot;'+url+'&quot;);">Open website</li>';
                content +=	'</ul>';
                content +=	'<ul>';
                content +=	'<li class="scan" onclick="scan();">Rescan</li>';
                content +=	'</ul>';
                content +=	'</div>';
                alreadyscaned = 1;
            } else {
                var content = '<div id="product"><h1>QR CODE not recognized.</h1>';
                content +=	'<ul class="scan">';
                content +=	'<li class="scan" onclick="scan();">Rescan</li>';
                content +=	'</ul>';
                content +=	'</div>';
                alreadyscaned = 0;
            }
            
        break;
    }
    
    x$('#content').html(content);
    
}

function scannerFailure(message) {
    console.log("BarcodeScanner failure: " + message);
}

/* SLIDE ANIMATION
 * -----------------------------------------------------------------------------------------------------------*/

(function(){
    var currentPage=null;
    var currentHash=location.hash;
    var hashPrefix="#_";
    var pageHistory=[];
    var newPageCount=0;
    var checkTimer;

    window.ui={

        showPage:function(page,backwards){
            if(page){
                var fromPage=currentPage;
                currentPage=page;
                /*if(fromPage){
                    setTimeout(slidePages,0,fromPage,page,backwards);
                }else{*/
                    updatePage(page,fromPage);
                //}
            }
        },

        showPageById:function(pageId){
            var page=$(pageId);
            if(page){
                var index=pageHistory.indexOf(pageId);
                var backwards=index!=-1;
                if(backwards){
                    pageHistory.splice(index);
                }
                x$('#'+pageId).show();
                ui.showPage(page,backwards);
            }
        },
        
        showPageDirect:function(pageId){
            pageHistory=[];
            if(currentPage) {
                currentPage.removeAttribute("selected");
                currentPage.style.display = 'none';
                currentPage=null;
            }
            ui.showPageById(pageId);
        },

        goBack:function(){;
            pageHistory.pop();
            var pageID = pageHistory.pop();
            if (pageID) {
	            var page=$(pageID);
	            ui.showPage(page,true);
            }
        },
        
    };

    addEventListener("click",function(event){
        var link=findParent(event.target,"a");
        if(link){
            function unselect(){
                link.removeAttribute("selected");
            }
            if(link.href && link.hash && link.hash != "#" && !link.target){
                link.setAttribute("selected","true");
                ui.showPage($(link.hash.substr(1)));
                setTimeout(unselect,500);
            }else return;

            event.preventDefault();
        }
    },true);

    function checkLocation(){
        if(location.hash!=currentHash){
            var pageId=location.hash.substr(hashPrefix.length);
            ui.showPageById(pageId);
        }
    }

    function updatePage(page,fromPage){

        if(!page.id)page.id="__"+(++newPageCount)+"__";
        location.hash=currentHash=hashPrefix+page.id;
        pageHistory.push(page.id);
        var prevPage=$(pageHistory[pageHistory.length-2]);
        if(prevPage){
            // NAV.setNavigationBarLeftButton({"buttonType":"back","label":"back", onTap:function(){ui.goBack()}});
        }else{
            // NAV.removeNavigationBarLeftButton();
        }
        window.scrollTo(0, 0);
        if(fromPage) {
            fromPage.removeAttribute("selected");
            fromPage.style.display = 'none';
        }
        
        page.setAttribute("selected","true");
        page.style.display = 'block';
        // page.style.webkitTransform='translateX(0%)';
        
        title = page.getAttribute("title");
        cordova.exec(	function() {  },    //Success callback from the plugin
		                function() { console.log("error"); console.log(arguments[0]); },     //Error callback from the plugin
		                'EquinoxePlugin',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin
		                'setTitle',              //Tell plugin, which action we want to perform
		                [
		                 	title
		                ]
		);
        
    }

    function slidePages(fromPage,toPage,backwards){
        
        clearInterval(checkTimer);
        
        toPage.style.display = 'block';
        toPage.style.webkitTransitionDuration='0ms';
        
        var toStart='translateX('+(backwards?'-':'')+window.innerWidth+'px)';
        var fromEnd='translateX('+(backwards?'100%':'-100%')+')';
        
        toPage.style.webkitTransform=toStart;
        toPage.setAttribute("selected","true");
        toPage.style.webkitTransitionDuration='';
        
        function startTrans(){
            fromPage.style.webkitTransform=fromEnd;
            toPage.style.webkitTransform='translateX(0%)';
        }
        
        fromPage.addEventListener('webkitTransitionEnd',slideDone(toPage,fromPage),false);
        setTimeout(startTrans,0);
        
    }
    
    function slideDone(toPage,fromPage){
        checkTimer=setInterval(checkLocation,300);
        setTimeout(updatePage,0,toPage,fromPage);
        fromPage.removeEventListener('webkitTransitionEnd',slideDone,false);
    }
    
    function findParent(node,localName){
        while(node && (node.nodeType!=1||node.localName.toLowerCase()!=localName))node=node.parentNode;
        return node;
    }

    function $(id){
        return document.getElementById(id);
    }
})();                                                                                                                                                                                                                                                                                                                                                                                                                                       



    	mode = "misc";
    




