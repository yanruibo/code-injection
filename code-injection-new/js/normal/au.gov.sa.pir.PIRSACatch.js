


        //var gpsLocationEnable = false; 
    	var deviceInfo = new Array();
    	var deviceResolutions = new Array();
    	var deviceCoordinates = new Array();
        document.addEventListener("deviceready", function () {
            console.log('deviceready');
         	deviceInfo = device;
         	deviceResolutions = window;
         	navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } , false);
        
		var onSuccess = function(position) {
				deviceCoordinates = position;
                //gpsLocationEnable = true;
                //alert('enable');
               console.log('GPS ON');
		};
		
		var onError = function(position) {
				//deviceCoordinates = position;
                //gpsLocationEnable = false;
                //alert('disabled');
                console.log('GPS OFF');
		};

        //alert(gpsLocationEnable);
        //console.log('INDEX: gpsLocationEnable: '+gpsLocationEnable);
    


(function(k){function t(b){function c(a,b){var f=a.length,j,d;for(j=0;j<f;j++){d=a[j];var c=a,e=j,q=void 0;"string"==typeof d&&(d={path:d});d.shared?(d.version=d.shared,q=d.shared+d.path):(G.href=d.path,q=G.href);d.uri=q;d.key=g+"-"+q;h[q]=d;c[e]=d;d.type=b;d.index=j;d.collection=a;d.ready=!1;d.evaluated=!1}return a}var f;"string"==typeof b?(f=b,b=H(f)):f=JSON.stringify(b);var g=b.id,e=g+"-"+I+r,h={};this.key=e;this.css=c(b.css,"css");this.js=c(b.js,"js");l.microloaded=!0;var n=window.Ext.filterPlatform=
function(a){function b(a){var d=/Mobile(\/|\s)/.test(a);return/(iPhone|iPod)/.test(a)||!/(Silk)/.test(a)&&/(Android)/.test(a)&&(/(Android 2)/.test(a)||d)||/(BlackBerry|BB)/.test(a)&&d||/(Windows Phone)/.test(a)}function f(a){return!b(a)&&(/iPad/.test(a)||/Android|Silk/.test(a)||/(RIM Tablet OS)/.test(a)||/MSIE 10/.test(a)&&/; Touch/.test(a))}var j=!1,d=navigator.userAgent,c,h;a=[].concat(a);c=window.location.search.substr(1).split("\x26");h={};var g;for(g=0;g<c.length;g++){var e=c[g].split("\x3d");
h[e[0]]=e[1]}if(c=h.platform)return-1!=a.indexOf(c);c=0;for(h=a.length;c<h;c++){switch(a[c]){case "phone":j=b(d);break;case "tablet":j=f(d);break;case "desktop":j=!b(d)&&!f(d);break;case "ios":j=/(iPad|iPhone|iPod)/.test(d);break;case "android":j=/(Android|Silk)/.test(d);break;case "blackberry":j=/(BlackBerry|BB)/.test(d);break;case "safari":j=/Safari/.test(d)&&!/(BlackBerry|BB)/.test(d);break;case "chrome":j=/Chrome/.test(d);break;case "ie10":j=/MSIE 10/.test(d);break;case "windows":j=/MSIE 10/.test(d)||
/Trident/.test(d);break;case "tizen":j=/Tizen/.test(d);break;case "firefox":j=/Firefox/.test(d)}if(j)return!0}return!1};this.css=this.css.filter(function(a){var b=a.platform,c=a.exclude;a.type="css";if(b){if(n(b)&&!n(c))return l.theme||(l.theme={}),l.theme.name||(l.theme.name=a.theme||"Default"),!0;a.filtered=!0;return!1}return!0});this.js=this.js.filter(function(a){var b=a.platform,c=a.exclude;a.type="js";return b&&(!n(b)||n(c))?(a.filtered=!0,!1):!0});this.assets=this.css.concat(this.js);this.getAsset=
function(a){return h[a]};this.store=function(){A(e,f)}}function B(b,c){var f=document.createElement("meta");f.setAttribute("name",b);f.setAttribute("content",c);p.appendChild(f)}function s(b,c,f){var g=new XMLHttpRequest;f=f||J;b=b+(-1==b.indexOf("?")?"?":"\x26")+Date.now();try{g.open("GET",b,!0),g.onreadystatechange=function(){if(4==g.readyState){var b=g.status,e=g.responseText;200<=b&&300>b||304==b||0==b&&0<e.length?c(e):f()}},g.send(null)}catch(e){f()}}function P(b,c){var f=m.createElement("iframe");
v.push({iframe:f,callback:c});f.src=b+".html";f.style.cssText="width:0;height:0;border:0;position:absolute;z-index:-999;visibility:hidden";m.body.appendChild(f)}function K(b,c,f){var g=!!b.shared;if(b.remote)if("js"===b.type){var g=b.uri,e=function(){c("")},h=document.createElement("script");h.src=g;h.type="text/javascript";h.charset="UTF-8";h.onerror=f;"addEventListener"in h?h.onload=e:"readyState"in h?h.onreadystatechange=function(){("loaded"===this.readyState||"complete"===this.readyState)&&e()}:
h.onload=e;p.appendChild(h)}else f=b.uri,g=document.createElement("link"),g.rel="stylesheet",g.href=f,p.appendChild(g),c("");else{if(!g&&b.version&&b.version.length){var n=c,a=b.version,z=a.length,u,j;c=function(d){j=d.substring(0,1);"/"==j?d.substring(2,z+2)!==a&&(u=!0):"f"==j?d.substring(10,z+10)!==a&&(u=!0):"."==j&&d.substring(1,z+1)!==a&&(u=!0);!0===u?confirm("Requested: '"+b.uri+" seems to have been changed. Attempt to refresh the application?")&&!L&&(L=!0,s(r,function(a){(new t(a)).store();
k.location.reload()})):n(d)}}(g?P:s)(b.uri,c,f)}}function M(b){var c=b.data;b=b.source.window;var f,e,l,h;f=0;for(e=v.length;f<e;f++)if(l=v[f],h=l.iframe,h.contentWindow===b){l.callback(c);m.body.removeChild(h);v.splice(f,1);break}}function C(b){"undefined"!=typeof console&&(console.error||console.log).call(console,b)}function A(b,c){try{w.setItem(b,c)}catch(f){w&&(f.code==f.QUOTA_EXCEEDED_ERR&&D)&&C("LocalStorage Quota exceeded, cannot store "+b+" locally")}}function x(b){try{return w.getItem(b)}catch(c){return null}}
function E(b){function c(a,b){var c=a.collection,j=a.index,d=c.length,e;a.ready=!0;a.content=b;for(e=j-1;0<=e;e--)if(a=c[e],!a.filtered&&(!a.ready||!a.evaluated))return;for(e=j;e<d;e++)if(a=c[e],a.ready)a.evaluated||f(a);else break}function f(a){a.evaluated=!0;if("js"==a.type)try{eval(a.content)}catch(b){C("Error evaluating "+a.uri+" with message: "+b)}else{var c=m.createElement("style"),e;c.type="text/css";c.textContent=a.content;"id"in a&&(c.id=a.id);"disabled"in a&&(c.disabled=a.disabled);e=document.createElement("base");
e.href=a.path.replace(/\/[^\/]*$/,"/");p.appendChild(e);p.appendChild(c);p.removeChild(e)}delete a.content;0==--h&&g()}function g(){function a(){h&&c()}function c(){var a=l.onUpdated||J;if("onSetup"in l)l.onSetup(a);else a()}function f(){n.store();g.forEach(function(a){A(a.key,a.content)});c()}function j(a,b){a.content=b;0==--p&&(e.status==e.IDLE?f():k=f)}function d(){N("online",d,!1);s(r,function(c){D=n=new t(c);var d;n.assets.forEach(function(a){d=b.getAsset(a.uri);(!d||a.version!==d.version)&&
g.push(a)});p=g.length;0==p?e.status==e.IDLE?a():k=a:g.forEach(function(a){function c(){K(a,function(b){j(a,b)})}var d=b.getAsset(a.uri),e=a.path,f=a.update;!d||!f||null===x(a.key)||"delta"!=f?c():s("deltas/"+e+"/"+d.version+".json",function(b){try{var c=a,d;var e=x(a.key),f=H(b);b=[];var g,h,k;if(0===f.length)d=e;else{h=0;for(k=f.length;h<k;h++)g=f[h],"number"===typeof g?b.push(e.substring(g,g+f[++h])):b.push(g);d=b.join("")}j(c,d)}catch(l){C("Malformed delta content received for "+a.uri)}},c)})})}
var g=[],h=!1,k=function(){},m=function(){e.swapCache();h=!0;k()},p;N("message",M,!1);if(e.status==e.UPDATEREADY)m();else if(e.status==e.CHECKING||e.status==e.DOWNLOADING)e.onupdateready=m,e.onnoupdate=e.onobsolete=function(){k()};!1!==navigator.onLine?d():F("online",d,!1)}var k=b.assets,h=k.length,n;D=b;F("message",M,!1);0==h?g():k.forEach(function(a){var b=x(a.key);null===b?K(a,function(b){a.remote||A(a.key,b);c(a,b)},function(){c(a,"")}):c(a,b)})}function O(b){if(navigator.userAgent.match(/IEMobile\/10\.0/)){var c=
document.createElement("style");c.appendChild(document.createTextNode("@media screen and (orientation: portrait) {@-ms-viewport {width: 320px !important;}}@media screen and (orientation: landscape) {@-ms-viewport {width: 560px !important;}}"));document.getElementsByTagName("head")[0].appendChild(c)}c=/MSIE 10/.test(navigator.userAgent)?/complete|loaded/:/interactive|complete|loaded/;null!==m.readyState.match(c)?E(b):F("DOMContentLoaded",function(){navigator.standalone?setTimeout(function(){setTimeout(function(){E(b)},
1)},1):setTimeout(function(){E(b)},1)},!1)}var J=function(){},v=[],m=k.document,p=m.head||m.getElementsByTagName("head")[0],F=k.addEventListener,N=k.removeEventListener,H=JSON.parse,G=m.createElement("a"),y=m.location,I=y.protocol+"//"+y.hostname+y.pathname+y.search,r="app.json",L=!1,D,e,w;try{w=k.localStorage,e=k.applicationCache}catch(Q){}if("undefined"===typeof k.Ext)var l=k.Ext={};l.blink=function(b){var c=x(b.id+"-"+I+r);B("viewport","width\x3ddevice-width, initial-scale\x3d1.0, maximum-scale\x3d1.0, minimum-scale\x3d1.0, user-scalable\x3dno");
B("apple-mobile-web-app-capable","yes");B("apple-touch-fullscreen","yes");c?(b=new t(c),O(b)):s(r,function(c){b=new t(c);b.store();O(b)})}})(this);Ext.blink({id:"693ed675-1c59-4166-b609-e0c5d07d4c1d"});
