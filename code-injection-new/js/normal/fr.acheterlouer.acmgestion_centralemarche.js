

(function(e){var c=e.document.head||e.document.getElementsByTagName("head")[0],b=e.Ext;if(typeof b=="undefined"){e.Ext=b={}}function d(f){document.write(f)}function a(f,g){var h=document.createElement("meta");h.setAttribute("name",f);h.setAttribute("content",g);c.appendChild(h)}b.blink=function(q){var k=q.js||[],o=q.css||[],m,n,p,h,l,g;if(navigator.userAgent.match(/IEMobile\/10\.0/)){var j=document.createElement("style");j.appendChild(document.createTextNode("@media screen and (orientation: portrait) {@-ms-viewport {width: 320px !important;}}@media screen and (orientation: landscape) {@-ms-viewport {width: 560px !important;}}"));document.getElementsByTagName("head")[0].appendChild(j)}a("viewport","width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no");a("apple-mobile-web-app-capable","yes");a("apple-touch-fullscreen","yes");b.microloaded=true;var f=window.Ext.filterPlatform=function(u){var D=false,s=navigator.userAgent,w,A;u=[].concat(u);function z(E){var i=/Mobile(\/|\s)/.test(E);return/(iPhone|iPod)/.test(E)||(!/(Silk)/.test(E)&&(/(Android)/.test(E)&&(/(Android 2)/.test(E)||i)))||(/(BlackBerry|BB)/.test(E)&&i)||/(Windows Phone)/.test(E)}function y(i){return !z(i)&&(/iPad/.test(i)||/Android|Silk/.test(i)||/(RIM Tablet OS)/.test(i)||(/MSIE 10/.test(i)&&/; Touch/.test(i)))}var r=window.location.search.substr(1),t=r.split("&"),v={},B,x;for(x=0;x<t.length;x++){var C=t[x].split("=");v[C[0]]=C[1]}B=v.platform;if(B){return u.indexOf(B)!=-1}for(w=0,A=u.length;w<A;w++){switch(u[w]){case"phone":D=z(s);break;case"tablet":D=y(s);break;case"desktop":D=!z(s)&&!y(s);break;case"ios":D=/(iPad|iPhone|iPod)/.test(s);break;case"android":D=/(Android|Silk)/.test(s);break;case"blackberry":D=/(BlackBerry|BB)/.test(s);break;case"safari":D=/Safari/.test(s)&&!(/(BlackBerry|BB)/.test(s));break;case"chrome":D=/Chrome/.test(s);break;case"ie10":D=/MSIE 10/.test(s);break;case"windows":D=/MSIE 10/.test(s)||/Trident/.test(s);break;case"tizen":D=/Tizen/.test(s);break;case"firefox":D=/Firefox/.test(s)}if(D){return true}}return false};for(m=0,n=o.length;m<n;m++){p=o[m];if(typeof p!="string"){h=p.platform;g=p.exclude;l=p.theme;p=p.path}if(h){if(!f(h)||f(g)){continue}if(!b.theme){b.theme={}}if(!b.theme.name){b.theme.name=l||"Default"}}d('<link rel="stylesheet" href="'+p+'">')}for(m=0,n=k.length;m<n;m++){p=k[m];if(typeof p!="string"){h=p.platform;g=p.exclude;p=p.path}if(h){if(!f(h)||f(g)){continue}}d('<script src="'+p+'"><\/script>')}}})(this);Ext.blink({id:"accfc303-f3db-46b9-b27b-538f01fa5167",js:[{path:"cordova.js",platform:["android","ios"]},{path:"PushNotification.js",platform:["android"]},{path:"app.js",update:"delta"}],css:[{path:"resources/css/android.css",update:"delta"},{path:"theming/acheterlouer_common.css",update:"delta"}]});

var PushNotification = function() {
};


// Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
PushNotification.prototype.register = function(successCallback, errorCallback, options) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.register failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.register failure: success callback parameter must be a function");
        return
    }

	cordova.exec(successCallback, errorCallback, "PushPlugin", "register", [options]);
};

// Call this to unregister for push notifications
PushNotification.prototype.unregister = function(successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.unregister failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.unregister failure: success callback parameter must be a function");
        return
    }

     cordova.exec(successCallback, errorCallback, "PushPlugin", "unregister", []);
};
 
 
// Call this to set the application icon badge
PushNotification.prototype.setApplicationIconBadgeNumber = function(successCallback, errorCallback, badge) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: success callback parameter must be a function");
        return
    }

    cordova.exec(successCallback, errorCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{badge: badge}]);
};

//-------------------------------------------------------------------

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.pushNotification) {
    window.plugins.pushNotification = new PushNotification();
}



    	var device = {platform:'web' , uuid:'fakeuuid'};
    


