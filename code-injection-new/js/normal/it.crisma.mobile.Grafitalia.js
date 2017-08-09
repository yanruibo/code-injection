

    var version = "1.0";
    var html5mobile = {};
    html5mobile.webdb = {};
    html5mobile.webdb.db = null;

    var items = new Array();
    html5mobile.webdb.open = function () {
        var dbSize = 5 * 1024 * 1024; // 5MB
        html5mobile.webdb.db = openDatabase("Versions", "1.0", "Version Manager", dbSize);
    }

    html5mobile.webdb.createTable = function () {
        var db = html5mobile.webdb.db;
        db.transaction(function (tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS versions(ID INTEGER PRIMARY KEY ASC, version TEXT)", []);
        });
    }

    html5mobile.webdb.addItem = function (versionText) {
        var db = html5mobile.webdb.db;
        db.transaction(function (tx) {
            var addedOn = new Date();
            tx.executeSql("INSERT INTO versions(version) VALUES (?)",
                    [versionText],
                    html5mobile.webdb.onSuccess,
                    html5mobile.webdb.onError);
        });
    }

    html5mobile.webdb.onError = function (tx, e) {
        alert("There has been an error: " + e.message);
    }

    html5mobile.webdb.onSuccess = function (tx, r) {
        // re-render the data.
        html5mobile.webdb.getAllItems(loadItems);
    }

    html5mobile.webdb.getAllItems = function (renderFunc) {
        var db = html5mobile.webdb.db;
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM versions", [], renderFunc,
                    html5mobile.webdb.onError);
        });
    }

    function loadItems(tx, rs) {
        for (var i = 0; i < rs.rows.length; i++) {
            items[i] = rs.rows.item(i);
        }

        // per tutte le versioni precedenti
        if (items.length == 0) {
            window.localStorage.clear();
            html5mobile.webdb.addItem(version);
        }
        else {
            // solo se l'ultima Ă¨ diversa
            if (items[items.length - 1].version < version) {
                window.localStorage.clear();
                html5mobile.webdb.addItem(version);
            }
        }
    }

    html5mobile.webdb.open();
    html5mobile.webdb.createTable();
    html5mobile.webdb.getAllItems(loadItems);
    var millisecondsToWait = 2500;
    setTimeout(function () {
    }, millisecondsToWait);

    function initialize() {
    }
    function windowOnload() {
        loadScriptGoogleMaps();
    }
    function loadScriptGoogleMaps(callback) {
        if (typeof callback === "undefined" || callback == '') callback = "initialize";
        try {
            geocoder = new google.maps.Geocoder();
        } catch (e) {
            var oldScript = document.getElementById('googleScript');
            if (oldScript) {
                document.body.removeChild(oldScript);
            }
            var script = document.createElement('script');
            script.id = 'googleScript';
            script.type = 'text/javascript';
            script.src = 'http://maps.googleapis.com/maps/api/js?key=AIzaSyAJs8iuYPMjv1CcFyY1sh6Tpz0cCgNxhHM&sensor=false&' +
                    'callback=' + callback;
            document.body.appendChild(script);
        }
    }

    // window.onload = windowOnload;

    var languageSelect = 'it';
    var marchikey = '';
    var tiporicerca = '';
    var listEmptyText = '<p class="emptyText">Nessun risultato trovato.</p>';

    function isInt(value) {
        var intValue = parseInt(value);
        if (intValue == Number.NaN) {
            return false;
        }
        return intValue;
    }
    function isFlaot(value) {
        var floatValue = parseFloat(value);
        if (floatValue == Number.NaN) {
            return false;
        }
        return floatValue;
    }
    /*
     function leggiCookie(nomeCookie) {
     if (document.cookie.length > 0) {
     var inizio = document.cookie.indexOf(nomeCookie + "=");
     if (inizio != -1) {
     inizio = inizio + nomeCookie.length + 1;
     var fine = document.cookie.indexOf(";", inizio);
     if (fine == -1) fine = document.cookie.length;
     return unescape(document.cookie.substring(inizio, fine));
     } else {
     return "";
     }
     }
     return "";
     }

     var coockieLS = leggiCookie("AppFieraMobileLang");

     if (coockieLS && coockieLS != '')
     languageSelect = coockieLS; */
    console.log("select lang " + languageSelect);



















    var device_id = '';
    var devicePlatform = 'Web';
    var deviceVersion = '';
    deviceVersion = navigator.userAgent;
    var deviceName = '';
    deviceName = window.location.host;
    var myScroll;

    function loaded(idScroll, zoomEnabled, left, top, initzoom) {
        var viewport_height = $(window).height() - 95;
        var viewport_width = $(window).width();
        if (typeof idScroll === "undefined" || idScroll == '') idScroll = "scroller";
        if (typeof zoomEnabled === "undefined" || zoomEnabled == '') zoomEnabled = false;
        if (!left || left == "undefined") left = 0;
        else left = parseInt(((left) * initzoom) - ((viewport_width / 2)));
        if (!top || top == undefined) top = 0;
        else top = parseInt(((top) * initzoom) - ((viewport_height / 2)));

        if (left < 0) {
            left = 0;
        }
        if (top < 0) {
            top = 0;
        }

        left = -left;
        top = -top;
        // console.log("loaded");
        jQuery(idScroll).live('touchmove', function (e) {
            e.preventDefault();
        });
        myScroll = new iScroll(idScroll, {
            //snap:false,
            momentum:true,
            //bounce:false,
            checkDOMChanges:false,
            //fadeScrollbar:false,
            //shrinkScrollbar: true,
            hScrollbar:true,
            vScrollbar:true,
            zoom:zoomEnabled,
            zoomMin:0.1,
            zoomMax:4,
            lockDirection:false,
            x:left,
            y:top,
            scale:initzoom
        });
        console.log("loaded left: " + left + " top: " + top + " initZoom: " + initzoom);
    }

    function backHeadler() {
        if (FieraMobile.app.config.mainView) {
            var popView = FieraMobile.app.config.mainView.popActiveNavigator();
            if (!popView) {
                // inserire il codice per uscire dell'app
                Ext.Msg.confirm(
                        "Uscita",
                        "Vuoi uscire dell'applicazione?",
                        function (button) {
                            console.log("update confirm " + button);
                            if (button == "yes") {
                                navigator.app.exitApp();
                            }
                        },
                        this);
            }
        }
        // setTimeout("backHeadler()", 10000);
    }
    // setTimeout("backHeadler()", 10000);

    var deviceInfo = function () {
        device_id = device.uuid;
        devicePlatform = device.platform; // SO
        deviceVersion = device.version; // versione SO
        deviceName = device.name; // modello cell
        console.log(device_id + " " + devicePlatform + " " + deviceVersion + " " + deviceName);
        if ((/iphone|ipad/gi).test(device.platform)) {
            $(window).unbind("resize").bind("resize", function () {
                $(window).trigger("orientationchange");
            });
            //alert("if iphone ipad");
        } else {
            document.addEventListener("backbutton", backHeadler, false);
        }
        if (!device_id || device_id == '')
            alert('Errore di inizializzazione... uuid non trovato', "Error");

        // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
        // console.log("onDeviceReady");
        // onDeviceReady();
    };

    document.addEventListener("deviceready", deviceInfo, false);

    var width;
    var heigth;
    $(document).ready(function () {
        $(window).bind("orientationchange orientationChanged", fixgeometry);
    });
    var newWidth;
    function fixgeometry(event) {
        /*
         var orientation = Math.abs(window.orientation) == 90 ? 'landscape' : 'portrait';
         if(orientation == 'portrait'){
         newWidth = width;
         }
         else {
         newWidth = heigth;
         }
         setTimeout("adattaIframe()", 500);
         */
    }

    function adattaIframe() {
        $(".infoMobilityIframe").attr("width", newWidth);
        console.log("width " + newWidth);
    }

(function(n){function r(a){function b(a,j){var c=a.length,b,e;for(b=0;b<c;b++){e=a[b];var d=a,J=b,k=void 0;"string"==typeof e&&(e={path:e});e.shared?(e.version=e.shared,k=e.shared+e.path):(y.href=e.path,k=y.href);e.uri=k;e.key=g+"-"+k;f[k]=e;d[J]=e;e.type=j;e.index=b;e.collection=a;e.ready=!1;e.evaluated=!1}return a}var c;"string"==typeof a?(c=a,a=z(c)):c=JSON.stringify(a);var g=a.id,d=g+"-"+A+o,f={};this.key=d;this.css=b(a.css,"css");this.js=b(a.js,"js");this.assets=this.css.concat(this.js);this.getAsset=
function(a){return f[a]};this.store=function(){s(d,c)}}function v(a,b){i.write('<meta name="'+a+'" content="'+b+'">')}function p(a,b,c){var g=new XMLHttpRequest,d,c=c||B;try{g.open("GET",a,!0),g.onreadystatechange=function(){4==g.readyState&&(d=g.status,200==d||304==d||0==d?b(g.responseText):c())},g.send(null)}catch(f){c()}}function K(a,b){var c=i.createElement("iframe");m.push({iframe:c,callback:b});c.src=a+".html";c.style.cssText="width:0;height:0;border:0;position:absolute;z-index:-999;visibility:hidden";
i.body.appendChild(c)}function C(a,b,c){var g=!!a.shared;if(!g)var d=b,f=a.version,h,b=function(j){h=j.substring(0,f.length+4);h!=="/*"+f+"*/"?confirm("Requested: '"+a.uri+"' with checksum: "+f+" but received: "+h.substring(2,f.length)+"instead. Attemp to refresh the application?")&&L():d(j)};(g?K:p)(a.uri,b,c)}function D(a){var b=a.data,a=a.source.window,c,g,d,f;for(c=0,g=m.length;c<g;c++)if(d=m[c],f=d.iframe,f.contentWindow===a){d.callback(b);i.body.removeChild(f);m.splice(c,1);break}}function E(a){"undefined"!=
typeof console&&(console.error||console.log).call(console,a)}function s(a,b){try{l.setItem(a,b)}catch(c){if(c.code==c.QUOTA_EXCEEDED_ERR){var g=t.assets.map(function(a){return a.key}),d=0,f=l.length,h=!1,j;for(g.push(t.key);d<=f-1;)j=l.key(d),-1==g.indexOf(j)?(l.removeItem(j),h=!0,f--):d++;h&&s(a,b)}}}function u(a){try{return l.getItem(a)}catch(b){return null}}function L(){F||(F=!0,p(o,function(a){(new r(a)).store();n.location.reload()}))}function G(a){function b(a,b){var d=a.collection,e=a.index,
g=d.length,f;a.ready=!0;a.content=b;for(f=e-1;0<=f;f--)if(a=d[f],!a.ready||!a.evaluated)return;for(f=e;f<g;f++)if(a=d[f],a.ready)a.evaluated||c(a);else break}function c(a){a.evaluated=!0;if("js"==a.type)try{eval(a.content)}catch(b){E("Error evaluating "+a.uri+" with message: "+b)}else{var c=i.createElement("style"),e;c.type="text/css";c.textContent=a.content;"id"in a&&(c.id=a.id);"disabled"in a&&(c.disabled=a.disabled);e=document.createElement("base");e.href=a.path.replace(/\/[^\/]*$/,"/");w.appendChild(e);
w.appendChild(c);w.removeChild(e)}delete a.content;0==--f&&g()}function g(){function c(){d&&b()}function b(){var a=q.onUpdated||B;if("onSetup"in q)q.onSetup(a);else a()}function f(){l.store();e.forEach(function(a){s(a.key,a.content)});b()}var e=[],d=!1,g=!1,k=function(){g=!0},i=function(){h.swapCache();d=!0;k()},m;n.removeEventListener("message",D,!1);h.status==h.UPDATEREADY?i():h.status==h.CHECKING||h.status==h.DOWNLOADING?(h.onupdateready=i,h.onnoupdate=h.onobsolete=k):k();!1!==navigator.onLine&&
p(o,function(b){t=l=new r(b);var d;l.assets.forEach(function(b){d=a.getAsset(b.uri);(!d||b.version!==d.version)&&e.push(b)});m=e.length;0==m?g?c():k=c:e.forEach(function(b){function c(){C(b,function(a){b.content=a;0==--m&&(g?f():k=f)})}var d=a.getAsset(b.uri),e=b.path,h=b.update;!d||!h||null===u(b.key)||"delta"!=h?c():p("deltas/"+e+"/"+d.version+".json",function(a){try{var c=b,d;var e=u(b.key),h=z(a),a=[],j,i,l;if(0===h.length)d=e;else{for(i=0,l=h.length;i<l;i++)j=h[i],"number"===typeof j?a.push(e.substring(j,
j+h[++i])):a.push(j);d=a.join("")}c.content=d;0==--m&&(g?f():k=f)}catch(n){E("Malformed delta content received for "+b.uri)}},c)})})}var d=a.assets,f=d.length,l;t=a;H("message",D,!1);0==f?g():d.forEach(function(a){var c=u(a.key);null===c?C(a,function(c){s(a.key,c);b(a,c)},function(){b(a,"")}):b(a,c)})}function I(a){null!==i.readyState.match(/interactive|complete|loaded/)?G(a):H("DOMContentLoaded",function(){G(a)},!1)}var B=function(){},m=[],i=n.document,w=i.head,H=n.addEventListener,l=n.localStorage,
h=n.applicationCache,z=JSON.parse,y=i.createElement("a"),x=i.location,A=x.origin+x.pathname+x.search,o="app.json",F=!1,t;if("undefined"===typeof q)var q=n.Ext={};q.blink=function(a){var b=u(a.id+"-"+A+o);v("viewport","width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no");v("apple-mobile-web-app-capable","yes");v("apple-touch-fullscreen","yes");b?(a=new r(b),I(a)):p(o,function(b){a=new r(b);a.store();I(a)})}})(this);
;Ext.blink({"id":"f46c24e0-dbe4-11e1-b05f-0f9f6a171c97"})


    function initialize() {
    }
    function windowOnload() {
        loadScriptGoogleMaps();
    }
    function loadScriptGoogleMaps(callback) {
        if (typeof callback === "undefined" || callback == '') callback = "initialize";
        try {
            geocoder = new google.maps.Geocoder();
        } catch (e) {
            var oldScript = document.getElementById('googleScript');
            if (oldScript) {
                document.body.removeChild(oldScript);
            }
            var script = document.createElement('script');
            script.id = 'googleScript';
            script.type = 'text/javascript';
            script.src = 'http://maps.googleapis.com/maps/api/js?key=AIzaSyAJs8iuYPMjv1CcFyY1sh6Tpz0cCgNxhHM&sensor=false&' +
                    'callback=' + callback;
            document.body.appendChild(script);
        }
    }

    // window.onload = windowOnload;

    var languageSelect = 'it';
    var marchikey = '';
    var tiporicerca = '';
    var listEmptyText = '<p class="emptyText">Nessun risultato trovato.</p>';

    function isInt(value) {
        var intValue = parseInt(value);
        if (intValue == Number.NaN) {
            return false;
        }
        return intValue;
    }
    function isFlaot(value) {
        var floatValue = parseFloat(value);
        if (floatValue == Number.NaN) {
            return false;
        }
        return floatValue;
    }
    /*
     function leggiCookie(nomeCookie) {
     if (document.cookie.length > 0) {
     var inizio = document.cookie.indexOf(nomeCookie + "=");
     if (inizio != -1) {
     inizio = inizio + nomeCookie.length + 1;
     var fine = document.cookie.indexOf(";", inizio);
     if (fine == -1) fine = document.cookie.length;
     return unescape(document.cookie.substring(inizio, fine));
     } else {
     return "";
     }
     }
     return "";
     }

     var coockieLS = leggiCookie("AppFieraMobileLang");

     if (coockieLS && coockieLS != '')
     languageSelect = coockieLS; */
    console.log("select lang " + languageSelect);



















    var device_id = '';
    var devicePlatform = 'Web';
    var deviceVersion = '';
    deviceVersion = navigator.userAgent;
    var deviceName = '';
    deviceName = window.location.host;
    var myScroll;

    function loaded(idScroll, zoomEnabled, left, top, initzoom) {
        var viewport_height = $(window).height() - 95;
        var viewport_width = $(window).width();
        if (typeof idScroll === "undefined" || idScroll == '') idScroll = "scroller";
        if (typeof zoomEnabled === "undefined" || zoomEnabled == '') zoomEnabled = false;
        if (!left || left == "undefined") left = 0;
        else left = parseInt(((left) * initzoom) - ((viewport_width / 2)));
        if (!top || top == undefined) top = 0;
        else top = parseInt(((top) * initzoom) - ((viewport_height / 2)));

        if (left < 0) {
            left = 0;
        }
        if (top < 0) {
            top = 0;
        }

        left = -left;
        top = -top;
        // console.log("loaded");
        jQuery(idScroll).live('touchmove', function (e) {
            e.preventDefault();
        });
        myScroll = new iScroll(idScroll, {
            //snap:false,
            momentum:true,
            //bounce:false,
            checkDOMChanges:false,
            //fadeScrollbar:false,
            //shrinkScrollbar: true,
            hScrollbar:true,
            vScrollbar:true,
            zoom:zoomEnabled,
            zoomMin:0.1,
            zoomMax:4,
            lockDirection:false,
            x:left,
            y:top,
            scale:initzoom
        });
        console.log("loaded left: " + left + " top: " + top + " initZoom: " + initzoom);
    }

    function backHeadler() {
        if (FieraMobile.app.config.mainView) {
            var popView = FieraMobile.app.config.mainView.popActiveNavigator();
            if (!popView) {
                // inserire il codice per uscire dell'app
                Ext.Msg.confirm(
                        "Uscita",
                        "Vuoi uscire dell'applicazione?",
                        function (button) {
                            console.log("update confirm " + button);
                            if (button == "yes") {
                                navigator.app.exitApp();
                            }
                        },
                        this);
            }
        }
        // setTimeout("backHeadler()", 10000);
    }
    // setTimeout("backHeadler()", 10000);

    var deviceInfo = function () {
        device_id = device.uuid;
        devicePlatform = device.platform; // SO
        deviceVersion = device.version; // versione SO
        deviceName = device.name; // modello cell
        console.log(device_id + " " + devicePlatform + " " + deviceVersion + " " + deviceName);
        if ((/iphone|ipad/gi).test(device.platform)) {
            $(window).unbind("resize").bind("resize", function () {
                $(window).trigger("orientationchange");
            });
            //alert("if iphone ipad");
        } else {
            document.addEventListener("backbutton", backHeadler, false);
        }
        if (!device_id || device_id == '')
            alert('Errore di inizializzazione... uuid non trovato', "Error");

        // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
        // console.log("onDeviceReady");
        // onDeviceReady();
    };

    document.addEventListener("deviceready", deviceInfo, false);

    var width;
    var heigth;
    $(document).ready(function () {
        $(window).bind("orientationchange orientationChanged", fixgeometry);
    });
    var newWidth;
    function fixgeometry(event) {
        /*
         var orientation = Math.abs(window.orientation) == 90 ? 'landscape' : 'portrait';
         if(orientation == 'portrait'){
         newWidth = width;
         }
         else {
         newWidth = heigth;
         }
         setTimeout("adattaIframe()", 500);
         */
    }

    function adattaIframe() {
        $(".infoMobilityIframe").attr("width", newWidth);
        console.log("width " + newWidth);
    }

(function(n){function r(a){function b(a,j){var c=a.length,b,e;for(b=0;b<c;b++){e=a[b];var d=a,J=b,k=void 0;"string"==typeof e&&(e={path:e});e.shared?(e.version=e.shared,k=e.shared+e.path):(y.href=e.path,k=y.href);e.uri=k;e.key=g+"-"+k;f[k]=e;d[J]=e;e.type=j;e.index=b;e.collection=a;e.ready=!1;e.evaluated=!1}return a}var c;"string"==typeof a?(c=a,a=z(c)):c=JSON.stringify(a);var g=a.id,d=g+"-"+A+o,f={};this.key=d;this.css=b(a.css,"css");this.js=b(a.js,"js");this.assets=this.css.concat(this.js);this.getAsset=
function(a){return f[a]};this.store=function(){s(d,c)}}function v(a,b){i.write('<meta name="'+a+'" content="'+b+'">')}function p(a,b,c){var g=new XMLHttpRequest,d,c=c||B;try{g.open("GET",a,!0),g.onreadystatechange=function(){4==g.readyState&&(d=g.status,200==d||304==d||0==d?b(g.responseText):c())},g.send(null)}catch(f){c()}}function K(a,b){var c=i.createElement("iframe");m.push({iframe:c,callback:b});c.src=a+".html";c.style.cssText="width:0;height:0;border:0;position:absolute;z-index:-999;visibility:hidden";
i.body.appendChild(c)}function C(a,b,c){var g=!!a.shared;if(!g)var d=b,f=a.version,h,b=function(j){h=j.substring(0,f.length+4);h!=="/*"+f+"*/"?confirm("Requested: '"+a.uri+"' with checksum: "+f+" but received: "+h.substring(2,f.length)+"instead. Attemp to refresh the application?")&&L():d(j)};(g?K:p)(a.uri,b,c)}function D(a){var b=a.data,a=a.source.window,c,g,d,f;for(c=0,g=m.length;c<g;c++)if(d=m[c],f=d.iframe,f.contentWindow===a){d.callback(b);i.body.removeChild(f);m.splice(c,1);break}}function E(a){"undefined"!=
typeof console&&(console.error||console.log).call(console,a)}function s(a,b){try{l.setItem(a,b)}catch(c){if(c.code==c.QUOTA_EXCEEDED_ERR){var g=t.assets.map(function(a){return a.key}),d=0,f=l.length,h=!1,j;for(g.push(t.key);d<=f-1;)j=l.key(d),-1==g.indexOf(j)?(l.removeItem(j),h=!0,f--):d++;h&&s(a,b)}}}function u(a){try{return l.getItem(a)}catch(b){return null}}function L(){F||(F=!0,p(o,function(a){(new r(a)).store();n.location.reload()}))}function G(a){function b(a,b){var d=a.collection,e=a.index,
g=d.length,f;a.ready=!0;a.content=b;for(f=e-1;0<=f;f--)if(a=d[f],!a.ready||!a.evaluated)return;for(f=e;f<g;f++)if(a=d[f],a.ready)a.evaluated||c(a);else break}function c(a){a.evaluated=!0;if("js"==a.type)try{eval(a.content)}catch(b){E("Error evaluating "+a.uri+" with message: "+b)}else{var c=i.createElement("style"),e;c.type="text/css";c.textContent=a.content;"id"in a&&(c.id=a.id);"disabled"in a&&(c.disabled=a.disabled);e=document.createElement("base");e.href=a.path.replace(/\/[^\/]*$/,"/");w.appendChild(e);
w.appendChild(c);w.removeChild(e)}delete a.content;0==--f&&g()}function g(){function c(){d&&b()}function b(){var a=q.onUpdated||B;if("onSetup"in q)q.onSetup(a);else a()}function f(){l.store();e.forEach(function(a){s(a.key,a.content)});b()}var e=[],d=!1,g=!1,k=function(){g=!0},i=function(){h.swapCache();d=!0;k()},m;n.removeEventListener("message",D,!1);h.status==h.UPDATEREADY?i():h.status==h.CHECKING||h.status==h.DOWNLOADING?(h.onupdateready=i,h.onnoupdate=h.onobsolete=k):k();!1!==navigator.onLine&&
p(o,function(b){t=l=new r(b);var d;l.assets.forEach(function(b){d=a.getAsset(b.uri);(!d||b.version!==d.version)&&e.push(b)});m=e.length;0==m?g?c():k=c:e.forEach(function(b){function c(){C(b,function(a){b.content=a;0==--m&&(g?f():k=f)})}var d=a.getAsset(b.uri),e=b.path,h=b.update;!d||!h||null===u(b.key)||"delta"!=h?c():p("deltas/"+e+"/"+d.version+".json",function(a){try{var c=b,d;var e=u(b.key),h=z(a),a=[],j,i,l;if(0===h.length)d=e;else{for(i=0,l=h.length;i<l;i++)j=h[i],"number"===typeof j?a.push(e.substring(j,
j+h[++i])):a.push(j);d=a.join("")}c.content=d;0==--m&&(g?f():k=f)}catch(n){E("Malformed delta content received for "+b.uri)}},c)})})}var d=a.assets,f=d.length,l;t=a;H("message",D,!1);0==f?g():d.forEach(function(a){var c=u(a.key);null===c?C(a,function(c){s(a.key,c);b(a,c)},function(){b(a,"")}):b(a,c)})}function I(a){null!==i.readyState.match(/interactive|complete|loaded/)?G(a):H("DOMContentLoaded",function(){G(a)},!1)}var B=function(){},m=[],i=n.document,w=i.head,H=n.addEventListener,l=n.localStorage,
h=n.applicationCache,z=JSON.parse,y=i.createElement("a"),x=i.location,A=x.origin+x.pathname+x.search,o="app.json",F=!1,t;if("undefined"===typeof q)var q=n.Ext={};q.blink=function(a){var b=u(a.id+"-"+A+o);v("viewport","width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no");v("apple-mobile-web-app-capable","yes");v("apple-touch-fullscreen","yes");b?(a=new r(b),I(a)):p(o,function(b){a=new r(b);a.store();I(a)})}})(this);
;Ext.blink({"id":"f46c24e0-dbe4-11e1-b05f-0f9f6a171c97"})






$(function() {
		$.extend({
                    getUrlVars: function(){
					var vars = [], hash;
					var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
					for(var i = 0; i < hashes.length; i++)
					{
					  hash = hashes[i].split('=');
					  vars.push(hash[0]);
					  vars[hash[0]] = hash[1];
					}
					return vars;
				  },
				  getUrlVar: function(name){
					return $.getUrlVars()[name];
				  }
				});
				
					var scale = $.getUrlVar('scale');
				  var scaleGio;
				  if( typeof(scale) != 'undefined' ){
					  scaleGio= scale.replace("#","");
				   }
					  else
					  {
						   scaleGio=0.4;
				   }
 
                 var wrapper_wid=$('#wrapper').width();
                 var wrapper_hei=$('#wrapper').height();
				 
				 var iframew = $.getUrlVar('w');	
				 var iframeh = $.getUrlVar('h');	
                 
                  if( typeof(iframew) != 'undefined' ){
					   iframew= iframew.replace("#","");
				   }else{
				       // alert("ohhhh attenzione widh non definito");
						iframew=755;
				   }
				    if( typeof(iframeh) != 'undefined' ){
					  iframeh= iframeh.replace("#","");
				     }else{
				  // alert("ohhhh attenzione height non definito");
				   iframeh=920;
				   }
 
			     var aspectradio_iframe= iframew/wrapper_wid;
				 var resize_radio = iframeh/wrapper_hei;			
             if(resize_radio || aspectradio_iframe){
            	$('#wrapper').css('width', (iframew-15));
		      	$('#wrapper').css('height',iframeh);
		      
		      	$('#cont').css('width', (iframew-15));
		      	$('#cont').css('height',(iframeh-60));
		      	
		      	$('#cont').css('overflow','hidden');
		      
		       
		       $('#_md_icon').css('left',(iframew/2));
		       $('#_mdnorm').css('left',(iframew/2));
		       $('#_md_icon').css('top',0);
		      
		        
		       $('#_ml_icon').css('left',iframew-35);
		       $('#_mlnorm').css('left',iframew-35);
		       
		       $('#_ml_icon').css('top',(iframeh/2));
		       $('#_mlnorm').css('top',(iframeh/2));
		   
		       $('#_mr_icon').css('top',(iframeh/2));
		       $('#_mrnorm').css('top',(iframeh/2));
		   
		   
		     
		       $('#_mu_icon').css('left',(iframew/2));
		       $('#_munorm').css('left',(iframew/2));
		       
		       $('#_mu_icon').css('top',iframeh-85);
		       $('#_munorm').css('top',iframeh-85);
		     }else{
		   
		       $('#_md_icon').css('left',60);
		       $('#_mdnorm').css('left',60);
		       $('#_md_icon').css('top',0);
		      
		        
		       $('#_ml_icon').css('left',95);
		       $('#_mlnorm').css('left',95);
		       
		       $('#_ml_icon').css('top',-63);
		       $('#_mlnorm').css('top',-63);
		   
		       $('#_mr_icon').css('top',-63);
		       $('#_mrnorm').css('top',-63);
		   
		       $('#_mr_icon').css('left',130);
		       $('#_mrnorm').css('left',130);
		   
		     
		       $('#_mu_icon').css('left',165);
		       $('#_munorm').css('left',165);
		       
		       $('#_mu_icon').css('top',-63);
		       $('#_munorm').css('top',-63);
		   
		   
		   }
		    
		   
		        
		       	  var scale = $.getUrlVar('scale');
				  var scaleGio;
				  if( typeof(scale) != 'undefined' ){
					  scaleGio= scale.replace("#","");
				   }
					  else
					  {
						   if(resize_radio || aspectradio_iframe){
						       	    if(resize_radio<aspectradio_iframe){
		      	                       scaleGio=resize_radio;
		                        	}else
		                   	         {
		      	                     scaleGio=aspectradio_iframe;
		                  	         }
						  }
						  else{
						       scaleGio=0.37;
						}
				   }
				   
				  
 
   var zoommax=2;
   var zoommin=0.1;
       
	   opera=(/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent))?1:0;
 	   mozilla=(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))?1:0;
 	   ie=(/MSIE (\d+\.\d+);/.test(navigator.userAgent))?1:0;
	   chrome=(/chrome/.test(navigator.userAgent.toLowerCase()))?1:0;
	   safari=(/safari/.test(navigator.userAgent.toLowerCase()))?1:0;
	  
	  if(mozilla){
	    
		  var srotate = "scale(" +scaleGio + ")";
          $("#scroller").css({"-moz-transform" : srotate});
	       $("#scroller").css({"-moz-transform-origin" : '0 0'});
		    $('#scroller').css({ left: -4});
		                
		 }
	   if(ie){
	        $('#scroller').css('zoom',scaleGio);
            $('#scroller').css({ left: -5});
			
			}
	    if(opera){
		    $('#scroller').css('zoom',scaleGio);
            $('#scroller').css({ left: -26});
	    }
		
		  if(safari){
		    $('#scroller').css('zoom',scaleGio);
            $('#scroller').css({ left: -16});
	    }
		  if(chrome){
		    $('#scroller').css('zoom',scaleGio);
            $('#scroller').css({ left: -16});
	    }		
         var fullstand = $.getUrlVar('fullstand');
			 if( typeof(fullstand) != 'undefined' ){
				    fullstand=fullstand.replace("#","");
					
					if(fullstand=="true"){
						$('.map').maphilight({alwaysOn:true});
						}
				    else{
					$('.map').maphilight();
					}
				}else{$('.map').maphilight();}	
				
				
					
		 $('.point').find('.close').live('click', function(){
			var t = $(this),
				parent = t.parent('.point');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});
			$('.point2').find('.close').live('click', function(){
			 cond=0;
			var t = $(this),
				parent = t.parent('.point2');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});		});






$(function() {
		$.extend({
                    getUrlVars: function(){
					var vars = [], hash;
					var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
					for(var i = 0; i < hashes.length; i++)
					{
					  hash = hashes[i].split('=');
					  vars.push(hash[0]);
					  vars[hash[0]] = hash[1];
					}
					return vars;
				  },
				  getUrlVar: function(name){
					return $.getUrlVars()[name];
				  }
				});
				
			 var fullstand = $.getUrlVar('fullstand');
			 if( typeof(fullstand) != 'undefined' ){
				    fullstand=fullstand.replace("#","");
					
					if(fullstand=="true"){
						$('.map').maphilight({alwaysOn:true});
						}
				    else{
					$('.map').maphilight();
					}
				}	else{$('.map').maphilight();}	
				
		 $('.point').find('.close').live('click', function(){
			var t = $(this),
				parent = t.parent('.point');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});
			$('.point2').find('.close').live('click', function(){
			 cond=0;
			var t = $(this),
				parent = t.parent('.point2');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});	     var wrapper_wid=$('#wrapper').width();
                 var wrapper_hei=$('#wrapper').height();
				 
				 var iframew = $.getUrlVar('w');	
				 var iframeh = $.getUrlVar('h');	
                 
                  if( typeof(iframew) != 'undefined' ){
					   iframew= iframew.replace("#","");
				   }else{
				       // alert("ohhhh attenzione widh non definito");
						iframew=755;
				   }
				    if( typeof(iframeh) != 'undefined' ){
					  iframeh= iframeh.replace("#","");
				     }else{
				  // alert("ohhhh attenzione height non definito");
				   iframeh=920;
				   }	
		         var aspectradio_iframe= iframew/wrapper_wid;
				 var resize_radio = iframeh/wrapper_hei;		
		
		          var scale = $.getUrlVar('scale');
				  var scaleGio;
				  if( typeof(scale) != 'undefined' ){
					  scaleGio= scale.replace("#","");
				   }
					  else
					  {
						   if(resize_radio || aspectradio_iframe){
						       	    if(resize_radio<aspectradio_iframe){
		      	                       scaleGio=resize_radio;
		                        	}else
		                   	         {
		      	                     scaleGio=aspectradio_iframe;
		                  	         }
						  }
						  else{
						       scaleGio=0.37;
						}
						 scaleGio=0.4;
				   }
		
	   opera=(/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent))?1:0;
 	   mozilla=(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))?1:0;
 	   ie=(/MSIE (\d+\.\d+);/.test(navigator.userAgent))?1:0;
	   chrome=(/chrome/.test(navigator.userAgent.toLowerCase()))?1:0;
	   safari=(/safari/.test(navigator.userAgent.toLowerCase()))?1:0;
	  
	  if(mozilla){
	    
		  var srotate = "scale(" +scaleGio + ")";
          $("#wrapper").css({"-moz-transform" : srotate});
	       $("#wrapper").css({"-moz-transform-origin" : '0 0'});
		    $('#wrapper').css({ left: -4});
		                
		 }
	   if(ie){
	        $('#wrapper').css('zoom',scaleGio);
            $('#wrapper').css({ left: -5});
			
			}
	    if(opera){
		    $('#wrapper').css('zoom',scaleGio);
            $('#wrapper').css({ left: -26});
	    }
		
		  if(safari){
		    $('#wrapper').css('zoom',scaleGio);
            $('#wrapper').css({ left: -16});
	    }
		  if(chrome){
		    $('#wrapper').css('zoom',scaleGio);
            $('#wrapper').css({ left: -16});
	    }		
		 });






//file:///E:/Siti/html_map2/primtmap.html?imgsrc=Plast_pad_13.png&standname=210617,80047
	$(function() {
		$.extend({
                    getUrlVars: function(){
					var vars = [], hash;
					var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
					for(var i = 0; i < hashes.length; i++)
					{
					  hash = hashes[i].split('=');
					  vars.push(hash[0]);
					  vars[hash[0]] = hash[1];
					}
					return vars;
				  },
				  getUrlVar: function(name){
					return $.getUrlVars()[name];
				  }
				});
				
				 
				
	 		getdatamapa();	
			
			
			
			
		
		
  var scaleGio=0.5;
   

   var zoommax=2;
   var zoommin=0.1;
       
	   opera=(/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent))?1:0;
 	   mozilla=(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))?1:0;
 	   ie=(/MSIE (\d+\.\d+);/.test(navigator.userAgent))?1:0;
	     chrome=(/chrome/.test(navigator.userAgent.toLowerCase()))?1:0;
	   safari=(/safari/.test(navigator.userAgent.toLowerCase()))?1:0;
	  
	  
	  if(mozilla){
	    
		  var srotate = "scale(" +scaleGio + ")";
          $("#scroller").css({"-moz-transform" : srotate});
	       $("#scroller").css({"-moz-transform-origin" : '0 0'});
		 }
	   if(ie){
	        $('#scroller').css('zoom',scaleGio);
            $('#scroller').css({ left: -30});
			
			}
	    if( opera){

		    $('#scroller').css('zoom',scaleGio);
            $('#scroller').css({ left: -10});
	    }
		    if(safari){
		    $('#scroller').css('zoom',scaleGio);
            $('#scroller').css({ left: 10});
	    }
		  if(chrome){
		    $('#scroller').css('zoom',scaleGio);
            $('#scroller').css({ left: 15});
	    }
  
  
   
  
  
   var srcimage = $.getUrlVar('imgsrc');
				
				//$('#mapimagepng').attr('src',srcimage);
				var standname = $.getUrlVar('standname');
				var mypadList  = standname.split(',');
				getCoordSelected(mypadList,srcimage);
	});
	
	 function getdatamapa(){
				
//alert(mypadList[0]);
	}
	
	

<!--

function getCoordSelected(mypadList,htmlpage){
var scaleGio2;
 if(htmlpage == 'mappagenerale.html'){
 scaleGio2=0.5;
 }else{
 scaleGio2=0.45;
 }

var mLeft=7;
var mTop=7;
if($.browser.msie){
mLeft=10; mTop=14;
}

$.ajax({
		url: htmlpage,
		global: false,
         dataType: 'html',
		 success: function(data) {		
					
					//var str=data.split('<map name="map" id="idstampa">');
					var str=data.split('<map name="map">');
					var str1=str[1].split('</map>');
					var strMap=str[0].split('<img class="map" src="');
					var strMapPng=strMap[1].split('" usemap="#map">');
					
					
				
				
					$('#mapimagepng').attr('src',strMapPng[0]);
					if($.browser.msie){
$('#map2').attr('src',strMapPng[0]);
}
						
							//$('#map2').css('width','5');
						//$('#map2').hide();
					//	var str=data.split('#idstampa');
					//alert(str1[0]);
					//pp=data;
					$('#xx').html('<map name="map" id="idstampa">'+str1[0]+'</map>');
					jQuery.each(mypadList, function() {

	   getCorrds($('#'+this).attr('coords'),scaleGio2,mLeft,mTop);

	});
	   rewriteDivImage('sfondo.png');
	   
			}
});

/*
$('#xx').load('13_30.html #idstampa', function(response, status, xhr) {
  if (status == "error") {
    var msg = "Sorry but there was an error: ";
    $("#error").html(msg + xhr.status + " " + xhr.statusText);
  }

	jQuery.each(mypadList, function() {

	   getCorrds($('#'+this).attr('coords'));

	});
	   rewriteDivImage('images/sfondo.png');
	   
   });
   
   */
		

}

function getCorrds(coord,scaleGio2,mLeft,mTop){
//alert(coord);
var xx=coord.split(',');
//alert();
var Xpoints =[];
var Ypoints=[];

var xpunto;
var ypunto;

var len=( xx.length);
	if($.browser.msie){
len=( xx.length);
}else{
 len=( xx.length) -3;}
//alert(xx.length);
 
for (var i=0;i<len;i=i+2) {
Xpoints.push(mLeft+xx[i]*scaleGio2);
Ypoints.push(mTop+xx[i+1]*scaleGio2);

}

xpunto=mLeft+xx[0]*scaleGio2-14;
ypunto=mTop+xx[1]*scaleGio2-14;

$('#mk').css({left:xpunto,top:ypunto, position:'absolute'});
$('#mk').html('<img src="./pin.png" alt="stand">');

//style="left:'+xpunto+';top:'+ypunto+'; position:absolute;"

/*
if(xx.length<=11){
var Xpoints = new Array(mLeft+xx[6]*scaleGio2,mLeft+xx[4]*scaleGio2,mLeft+xx[2]*scaleGio2,mLeft+xx[0]*scaleGio2);
var Ypoints = new Array(mTop+xx[7]*scaleGio2,mTop+xx[5]*scaleGio2,mTop+xx[3]*scaleGio2,mTop+xx[1]*scaleGio2);

}else{
var Xpoints = new Array(mLeft+xx[10]*scaleGio2,mLeft+xx[8]*scaleGio2,mLeft+xx[6]*scaleGio2,mLeft+xx[4]*scaleGio2,mLeft+xx[2]*scaleGio2,mLeft+xx[0]*scaleGio2);
var Ypoints = new Array(mTop+xx[11]*scaleGio2,mTop+xx[9]*scaleGio2,mTop+xx[7]*scaleGio2,mTop+xx[5]*scaleGio2,mTop+xx[3]*scaleGio2,mTop+xx[1]*scaleGio2);}*/
myDrawFunction(Xpoints,Ypoints,xpunto,ypunto);
}

function myDrawFunction(Xpoints,Ypoints,xpunto,ypunto)
{

//coords="1102.516,1297.379,  1102.516,1088.216,   912.269,1088.216,   912.269,1297.379   ,1102.516,1297.379"
//         1102.516,1354.488,  1102.516,1421.054,  969.305,1421.054,   969.305,1383.007,   1012.155,1383.007,   1012.155,1354.488,   1102.516,1354.488"
jg.setColor("#ff0000");

jg.fillPolygon(Xpoints, Ypoints);
jg.paint();

/*jg.setColor("#000000");
jg.fillOval(xpunto,ypunto,15,15);
jg.paint();*/

}
var jg = new jsGraphics("pr");
myDrawFunction();
//-->

function rewriteDivImage(srcimage){
//src="images/bg-btn-blue.png">


$('#pr').children().each(function() {    

//opacity:0.50
  //  $(div).appendChild($(this));
  var style=$(this).attr('style');
  var newimage='<img style="'+style+'" src="'+srcimage+'" />';
	//alert();
	$(this).replaceWith(newimage);
});


}





$(function() {
		$.extend({
                    getUrlVars: function(){
					var vars = [], hash;
					var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
					for(var i = 0; i < hashes.length; i++)
					{
					  hash = hashes[i].split('=');
					  vars.push(hash[0]);
					  vars[hash[0]] = hash[1];
					}
					return vars;
				  },
				  getUrlVar: function(name){
					return $.getUrlVars()[name];
				  }
				});
				
			 var fullstand = $.getUrlVar('fullstand');
			 if( typeof(fullstand) != 'undefined' ){
				    fullstand=fullstand.replace("#","");
					
					if(fullstand=="true"){
						$('.map').maphilight({alwaysOn:true});
						}
				    else{
					$('.map').maphilight();
					}
				}	else{$('.map').maphilight();}	
				
		 $('.point').find('.close').live('click', function(){
			var t = $(this),
				parent = t.parent('.point');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});
			$('.point2').find('.close').live('click', function(){
			 cond=0;
			var t = $(this),
				parent = t.parent('.point2');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});	     var wrapper_wid=$('#wrapper').width();
                 var wrapper_hei=$('#wrapper').height();
				 
				 var iframew = $.getUrlVar('w');	
				 var iframeh = $.getUrlVar('h');	
                 
                  if( typeof(iframew) != 'undefined' ){
					   iframew= iframew.replace("#","");
				   }else{
				       // alert("ohhhh attenzione widh non definito");
						iframew=755;
				   }
				    if( typeof(iframeh) != 'undefined' ){
					  iframeh= iframeh.replace("#","");
				     }else{
				  // alert("ohhhh attenzione height non definito");
				   iframeh=920;
				   }	
		         var aspectradio_iframe= iframew/wrapper_wid;
				 var resize_radio = iframeh/wrapper_hei;		
		
		          var scale = $.getUrlVar('scale');
				  var scaleGio;
				  if( typeof(scale) != 'undefined' ){
					  scaleGio= scale.replace("#","");
				   }
					  else
					  {
						   if(resize_radio || aspectradio_iframe){
						       	    if(resize_radio<aspectradio_iframe){
		      	                       scaleGio=resize_radio;
		                        	}else
		                   	         {
		      	                     scaleGio=aspectradio_iframe;
		                  	         }
						  }
						  else{
						       scaleGio=0.37;
						}
						 scaleGio=0.4;
				   }
		
	   opera=(/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent))?1:0;
 	   mozilla=(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))?1:0;
 	   ie=(/MSIE (\d+\.\d+);/.test(navigator.userAgent))?1:0;
	   chrome=(/chrome/.test(navigator.userAgent.toLowerCase()))?1:0;
	   safari=(/safari/.test(navigator.userAgent.toLowerCase()))?1:0;
	  
	  if(mozilla){
	    
		  var srotate = "scale(" +scaleGio + ")";
          $("#wrapper").css({"-moz-transform" : srotate});
	       $("#wrapper").css({"-moz-transform-origin" : '0 0'});
		    $('#wrapper').css({ left: -4});
		                
		 }
	   if(ie){
	        $('#wrapper').css('zoom',scaleGio);
            $('#wrapper').css({ left: -5});
			
			}
	    if(opera){
		    $('#wrapper').css('zoom',scaleGio);
            $('#wrapper').css({ left: -26});
	    }
		
		  if(safari){
		    $('#wrapper').css('zoom',scaleGio);
            $('#wrapper').css({ left: -16});
	    }
		  if(chrome){
		    $('#wrapper').css('zoom',scaleGio);
            $('#wrapper').css({ left: -16});
	    }		
		 });









	 var base_url; var infopoint;
	

	$(function() {
		 
	  //$('.map').maphilight();
		 $('.map').maphilight({"fillColor":"000000","fillOpacity": 0.3});
		 $('.point').find('.close').live('click', function(){
			var t = $(this),
				parent = t.parent('.point');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});
			$('.point2').find('.close').live('click', function(){
			 cond=0;
			var t = $(this),
				parent = t.parent('.point2');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});	
		
	});
	
	
	$.extend({
                    getUrlVars: function(){
					var vars = [], hash;
					var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
					for(var i = 0; i < hashes.length; i++)
					{
					  hash = hashes[i].split('=');
					  vars.push(hash[0]);
					  vars[hash[0]] = hash[1];
					}
					return vars;
				  },
				  getUrlVar: function(name){
					return $.getUrlVars()[name];
				  }
				});

function loadpopup (padi, path){	
     $(function() {	  
	  
	  
	 
		  //console.log(base_url);
      $('map').bind('mouseover', function(e) {
               e.preventDefault();
			   
			    if(e.pageX > 250 )
				    nuovo=e.pageX-250;
				 else
                    nuovo=e.pageX;	
			   
		      $('#map').next('.point').remove();
				$('#map').after($('<div />').addClass('point'));
				$('.point')
				.html('<h3 class="red">Vai al padiglione '+padi+'</h3><span>'+path+'</span>')
			    .css({
                    zIndex:'9999',
					left:nuovo,
					top: e.pageY+15,
					width:200,
                    opacity:.9
				})
				.fadeIn();
	 	}, function(){
			this.animate({
				fill: attributes.fill
			}, 300);
        });
      });
    }
	
	
	function vai (padi, tsid){	
     $(function() {
		  base_url = $.getUrlVar('base_url');
		  
		   infopoint = $.getUrlVar('infopoint');
		   
		   
		   if( typeof(base_url) != 'undefined' ){
			     if( typeof(infopoint) != 'undefined' ){
		    			 infopoint=infopoint.replace('#','');
		    			 if(infopoint=='true'){
			                       var nuovo_url_info='http://'+base_url+'/infopoint/infopoint_tradeshow_homepage/tradeshow_map.jsp?pavilion='+padi+'&TradeshowId='+tsid+'';
			                       setTimeout(function(){ 
                                      top.location.href = nuovo_url_info;
                                      }, 1000);
		                   }else{
		                    base_url=base_url.replace('#','');
			           var nuovo_url='http://'+base_url+'/portal/tradeshowMap.do?pavilion='+padi+'&TS_ID='+tsid+'';
			       
			            setTimeout(function(){ 
                            top.location.href = nuovo_url;
                                      }, 1000);
		                   }
		    
		    
		           }else{
		               base_url=base_url.replace('#','');
			           var nuovo_url='http://'+base_url+'/portal/tradeshowMap.do?pavilion='+padi+'&TS_ID='+tsid+'';
			       
			            setTimeout(function(){ 
                            top.location.href = nuovo_url;
                                      }, 1000);
			        }
			        
			        }
				  else{
					  alert('Attenzione manca il base Url');
		  }
	 	 });
	 }
	  function unload(){
		    $(function() {
			     $('.point').html();
				 $('.point').hide();
			 });
	  }		 







$(function() {
		$.extend({
                    getUrlVars: function(){
					var vars = [], hash;
					var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
					for(var i = 0; i < hashes.length; i++)
					{
					  hash = hashes[i].split('=');
					  vars.push(hash[0]);
					  vars[hash[0]] = hash[1];
					}
					return vars;
				  },
				  getUrlVar: function(name){
					return $.getUrlVars()[name];
				  }
				});
				
					var scale = $.getUrlVar('scale');
				  var scaleGio;
				  if( typeof(scale) != 'undefined' ){
					  scaleGio= scale.replace("#","");
				   }
					  else
					  {
						   scaleGio=0.4;
				   }
 
                 var wrapper_wid=$('#wrapper').width();
                 var wrapper_hei=$('#wrapper').height();
				 
				 var iframew = $.getUrlVar('w');	
				 var iframeh = $.getUrlVar('h');	
                 
                  if( typeof(iframew) != 'undefined' ){
					   iframew= iframew.replace("#","");
				   }else{
				       // alert("ohhhh attenzione widh non definito");
						iframew=755;
				   }
				    if( typeof(iframeh) != 'undefined' ){
					  iframeh= iframeh.replace("#","");
				     }else{
				  // alert("ohhhh attenzione height non definito");
				   iframeh=920;
				   }
 
			     var aspectradio_iframe= iframew/wrapper_wid;
				 var resize_radio = iframeh/wrapper_hei;			
             if(resize_radio || aspectradio_iframe){
            	$('#wrapper').css('width', (iframew-15));
		      	$('#wrapper').css('height',iframeh);
		      
		      	$('#cont').css('width', (iframew-15));
		      	$('#cont').css('height',(iframeh-60));
		      	
		      	$('#cont').css('overflow','hidden');
		      
		       
		       $('#_md_icon').css('left',(iframew/2));
		       $('#_mdnorm').css('left',(iframew/2));
		       $('#_md_icon').css('top',0);
		      
		        
		       $('#_ml_icon').css('left',iframew-35);
		       $('#_mlnorm').css('left',iframew-35);
		       
		       $('#_ml_icon').css('top',(iframeh/2));
		       $('#_mlnorm').css('top',(iframeh/2));
		   
		       $('#_mr_icon').css('top',(iframeh/2));
		       $('#_mrnorm').css('top',(iframeh/2));
		   
		   
		     
		       $('#_mu_icon').css('left',(iframew/2));
		       $('#_munorm').css('left',(iframew/2));
		       
		       $('#_mu_icon').css('top',iframeh-85);
		       $('#_munorm').css('top',iframeh-85);
		     }else{
		   
		       $('#_md_icon').css('left',60);
		       $('#_mdnorm').css('left',60);
		       $('#_md_icon').css('top',0);
		      
		        
		       $('#_ml_icon').css('left',95);
		       $('#_mlnorm').css('left',95);
		       
		       $('#_ml_icon').css('top',-63);
		       $('#_mlnorm').css('top',-63);
		   
		       $('#_mr_icon').css('top',-63);
		       $('#_mrnorm').css('top',-63);
		   
		       $('#_mr_icon').css('left',130);
		       $('#_mrnorm').css('left',130);
		   
		     
		       $('#_mu_icon').css('left',165);
		       $('#_munorm').css('left',165);
		       
		       $('#_mu_icon').css('top',-63);
		       $('#_munorm').css('top',-63);
		   
		   
		   }
		    
		   
		        
		       	  var scale = $.getUrlVar('scale');
				  var scaleGio;
				  if( typeof(scale) != 'undefined' ){
					  scaleGio= scale.replace("#","");
				   }
					  else
					  {
						   if(resize_radio || aspectradio_iframe){
						       	    if(resize_radio<aspectradio_iframe){
		      	                       scaleGio=resize_radio;
		                        	}else
		                   	         {
		      	                     scaleGio=aspectradio_iframe;
		                  	         }
						  }
						  else{
						       scaleGio=0.37;
						}
				   }
				   
				  
 
   var zoommax=2;
   var zoommin=0.1;
       
	   opera=(/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent))?1:0;
 	   mozilla=(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))?1:0;
 	   ie=(/MSIE (\d+\.\d+);/.test(navigator.userAgent))?1:0;
	   chrome=(/chrome/.test(navigator.userAgent.toLowerCase()))?1:0;
	   safari=(/safari/.test(navigator.userAgent.toLowerCase()))?1:0;
	  
	  if(mozilla){
	    
		  var srotate = "scale(" +scaleGio + ")";
          $("#scroller").css({"-moz-transform" : srotate});
	       $("#scroller").css({"-moz-transform-origin" : '0 0'});
		    $('#scroller').css({ left: -4});
		                
		 }
	   if(ie){
	        $('#scroller').css('zoom',scaleGio);
            $('#scroller').css({ left: -5});
			
			}
	    if(opera){
		    $('#scroller').css('zoom',scaleGio);
            $('#scroller').css({ left: -26});
	    }
		
		  if(safari){
		    $('#scroller').css('zoom',scaleGio);
            $('#scroller').css({ left: -16});
	    }
		  if(chrome){
		    $('#scroller').css('zoom',scaleGio);
            $('#scroller').css({ left: -16});
	    }		
         var fullstand = $.getUrlVar('fullstand');
			 if( typeof(fullstand) != 'undefined' ){
				    fullstand=fullstand.replace("#","");
					
					if(fullstand=="true"){
						$('.map').maphilight({alwaysOn:true});
						}
				    else{
					$('.map').maphilight();
					}
				}else{$('.map').maphilight();}	
				
				
					
		 $('.point').find('.close').live('click', function(){
			var t = $(this),
				parent = t.parent('.point');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});
			$('.point2').find('.close').live('click', function(){
			 cond=0;
			var t = $(this),
				parent = t.parent('.point2');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});		});



$(function() {
		$.extend({
                    getUrlVars: function(){
					var vars = [], hash;
					var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
					for(var i = 0; i < hashes.length; i++)
					{
					  hash = hashes[i].split('=');
					  vars.push(hash[0]);
					  vars[hash[0]] = hash[1];
					}
					return vars;
				  },
				  getUrlVar: function(name){
					return $.getUrlVars()[name];
				  }
				});
				
			
          try {
         setTimeout("$('.map').maphilight();", 5000);
				
		 $('.point').find('.close').live('click', function(){
			var t = $(this),
				parent = t.parent('.point');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});
			$('.point2').find('.close').live('click', function(){
			 cond=0;
			var t = $(this),
				parent = t.parent('.point2');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});	} catch(e) {
            console.log("map: " + e.message);
        } });


$(function() {
		$.extend({
                    getUrlVars: function(){
					var vars = [], hash;
					var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
					for(var i = 0; i < hashes.length; i++)
					{
					  hash = hashes[i].split('=');
					  vars.push(hash[0]);
					  vars[hash[0]] = hash[1];
					}
					return vars;
				  },
				  getUrlVar: function(name){
					return $.getUrlVars()[name];
				  }
				});
				
			
          try {
         setTimeout("$('.map').maphilight();", 5000);
				
		 $('.point').find('.close').live('click', function(){
			var t = $(this),
				parent = t.parent('.point');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});
			$('.point2').find('.close').live('click', function(){
			 cond=0;
			var t = $(this),
				parent = t.parent('.point2');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});	} catch(e) {
            console.log("map: " + e.message);
        } });





//file:///E:/Siti/html_map2/primtmap.html?imgsrc=Plast_pad_13.png&standname=210617,80047
	$(function() {
		$.extend({
                    getUrlVars: function(){
					var vars = [], hash;
					var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
					for(var i = 0; i < hashes.length; i++)
					{
					  hash = hashes[i].split('=');
					  vars.push(hash[0]);
					  vars[hash[0]] = hash[1];
					}
					return vars;
				  },
				  getUrlVar: function(name){
					return $.getUrlVars()[name];
				  }
				});
				
				 
				
	 		getdatamapa();	
			
			
			
			
		
		
		 var scaleGio=0.45;
   

   var zoommax=2;
   var zoommin=0.1;
       
	   opera=(/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent))?1:0;
 	   mozilla=(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))?1:0;
 	   ie=(/MSIE (\d+\.\d+);/.test(navigator.userAgent))?1:0;
	     chrome=(/chrome/.test(navigator.userAgent.toLowerCase()))?1:0;
	   safari=(/safari/.test(navigator.userAgent.toLowerCase()))?1:0;
	  
	  
	  if(mozilla){
	    
		  var srotate = "scale(" +scaleGio + ")";
          $("#scroller").css({"-moz-transform" : srotate});
	       $("#scroller").css({"-moz-transform-origin" : '0 0'});
		 }
	   if(ie){
	        $('#scroller').css('zoom',scaleGio);
            $('#scroller').css({ left: -30});
			
			}
	    if( opera){

		    $('#scroller').css('zoom',scaleGio);
            $('#scroller').css({ left: -10});
	    }
		    if(safari){
		    $('#scroller').css('zoom',scaleGio);
            $('#scroller').css({ left: 10});
	    }
		  if(chrome){
		    $('#scroller').css('zoom',scaleGio);
            $('#scroller').css({ left: 15});
	    }
  
   var srcimage = $.getUrlVar('imgsrc');
				
				//$('#mapimagepng').attr('src',srcimage);
				var standname = $.getUrlVar('standname');
				var mypadList  = standname.split(',');
                   getCoordSelected(mypadList,srcimage);
           	});
	
	 function getdatamapa(){
				
//alert(mypadList[0]);
	}
	
	

 

function getCoordSelected(mypadList,htmlpage){
var scaleGio2=0.45;
var mLeft=7;
var mTop=7;
if($.browser.msie){
mLeft=10; mTop=14;
}

$.ajax({
		url: htmlpage,
		global: false,
         dataType: 'html',
		 success: function(data) {		
					
					//var str=data.split('<map name="map" id="idstampa">');
					var str=data.split('<map name="map">');
					var str1=str[1].split('</map>');
					var strMap=str[0].split('<img class="map" src="');
					var strMapPng=strMap[1].split('" usemap="#map">');
					
					
				
				
					$('#mapimagepng').attr('src',strMapPng[0]);
					if($.browser.msie){
                       $('#map2').attr('src',strMapPng[0]);
                           }
						
							//$('#map2').css('width','5');
						//$('#map2').hide();
					//	var str=data.split('#idstampa');
					//alert(str1[0]);
					//pp=data;
					var jj=0;
					$('#xx').html('<map name="map" id="idstampa">'+str1[0]+'</map>');
				       	jQuery.each(mypadList, function() {
                        getCorrds($('#'+this).attr('coords'),scaleGio2,mLeft,mTop,$('#'+this).attr('alt'),jj);
                        
						jj++;	
                  	});
	                   rewriteDivImage('sfondo.png');
	   
			}
});

/*
$('#xx').load('13_30.html #idstampa', function(response, status, xhr) {
  if (status == "error") {
    var msg = "Sorry but there was an error: ";
    $("#error").html(msg + xhr.status + " " + xhr.statusText);
  }

	jQuery.each(mypadList, function() {

	   getCorrds($('#'+this).attr('coords'));

	});
	   rewriteDivImage('images/sfondo.png');
	   
   });
   
   */
		

}

function getCorrds(coord,scaleGio2,mLeft,mTop,alt,jj){
//alert(coord);
var xx=coord.split(',');
//alert();
var xpunto;
var ypunto;
var Xpoints =[];
var Ypoints=[];
var len=( xx.length);
	if($.browser.msie){
len=( xx.length);
}else{
 len=( xx.length) -3;}
//alert(xx.length);
for (var i=0;i<len;i=i+2) {
Xpoints.push(mLeft+xx[i]*scaleGio2);
Ypoints.push(mTop+xx[i+1]*scaleGio2);

}


xpunto=mLeft+xx[0]*scaleGio2-29;
ypunto=mTop+xx[1]*scaleGio2-24;

$('#mks').append('<div id=point'+jj+'></div>');

$('#point'+jj).css({left:xpunto,top:ypunto, position:'absolute','background-image': 'url(./over.png)','z-index':99});
 
 $('#point'+jj).html('<img src="./over.png" alt="stand">');
 
 $('#point'+jj).append('<span style="left:'+xpunto+';top:'+ypunto+'; position:absolute;z-index:9999;color:#fff;margin-left:-80px;margin-top:+10px;">'+alt+'</span>');


/*
if(xx.length<=11){
var Xpoints = new Array(mLeft+xx[6]*scaleGio2,mLeft+xx[4]*scaleGio2,mLeft+xx[2]*scaleGio2,mLeft+xx[0]*scaleGio2);
var Ypoints = new Array(mTop+xx[7]*scaleGio2,mTop+xx[5]*scaleGio2,mTop+xx[3]*scaleGio2,mTop+xx[1]*scaleGio2);

}else{
var Xpoints = new Array(mLeft+xx[10]*scaleGio2,mLeft+xx[8]*scaleGio2,mLeft+xx[6]*scaleGio2,mLeft+xx[4]*scaleGio2,mLeft+xx[2]*scaleGio2,mLeft+xx[0]*scaleGio2);
var Ypoints = new Array(mTop+xx[11]*scaleGio2,mTop+xx[9]*scaleGio2,mTop+xx[7]*scaleGio2,mTop+xx[5]*scaleGio2,mTop+xx[3]*scaleGio2,mTop+xx[1]*scaleGio2);}*/
myDrawFunction(Xpoints,Ypoints);
}

function myDrawFunction(Xpoints,Ypoints)
{

//coords="1102.516,1297.379,  1102.516,1088.216,   912.269,1088.216,   912.269,1297.379   ,1102.516,1297.379"
//         1102.516,1354.488,  1102.516,1421.054,  969.305,1421.054,   969.305,1383.007,   1012.155,1383.007,   1012.155,1354.488,   1102.516,1354.488"
jg.setColor("#ff0000");
/*var Xpoints = new Array(0,0,200,200);
var Ypoints = new Array(0,200,200,0);*/



jg.fillPolygon(Xpoints, Ypoints);
jg.paint();
 
}
var jg = new jsGraphics("pr");
myDrawFunction();
//-->

function rewriteDivImage(srcimage){
//src="images/bg-btn-blue.png">


$('#pr').children().each(function() {    

//opacity:0.50
  //  $(div).appendChild($(this));
  var style=$(this).attr('style');
  var newimage='<img style="'+style+'" src="'+srcimage+'" />';
	//alert();
	$(this).replaceWith(newimage);
});


}





$(function() {
		$.extend({
                    getUrlVars: function(){
					var vars = [], hash;
					var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
					for(var i = 0; i < hashes.length; i++)
					{
					  hash = hashes[i].split('=');
					  vars.push(hash[0]);
					  vars[hash[0]] = hash[1];
					}
					return vars;
				  },
				  getUrlVar: function(name){
					return $.getUrlVars()[name];
				  }
				});
				
			 var fullstand = $.getUrlVar('fullstand');
			 if( typeof(fullstand) != 'undefined' ){
				    fullstand=fullstand.replace("#","");
					
					if(fullstand=="true"){
						$('.map').maphilight({alwaysOn:true});
						}
				    else{
					$('.map').maphilight();
					}
				}	else{$('.map').maphilight();}	
				
		 $('.point').find('.close').live('click', function(){
			var t = $(this),
				parent = t.parent('.point');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});
			$('.point2').find('.close').live('click', function(){
			 cond=0;
			var t = $(this),
				parent = t.parent('.point2');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});	     var wrapper_wid=$('#wrapper').width();
                 var wrapper_hei=$('#wrapper').height();
				 
				 var iframew = $.getUrlVar('w');	
				 var iframeh = $.getUrlVar('h');	
                 
                  if( typeof(iframew) != 'undefined' ){
					   iframew= iframew.replace("#","");
				   }else{
				       // alert("ohhhh attenzione widh non definito");
						iframew=755;
				   }
				    if( typeof(iframeh) != 'undefined' ){
					  iframeh= iframeh.replace("#","");
				     }else{
				  // alert("ohhhh attenzione height non definito");
				   iframeh=920;
				   }	
		         var aspectradio_iframe= iframew/wrapper_wid;
				 var resize_radio = iframeh/wrapper_hei;		
		
		          var scale = $.getUrlVar('scale');
				  var scaleGio;
				  if( typeof(scale) != 'undefined' ){
					  scaleGio= scale.replace("#","");
				   }
					  else
					  {
						   if(resize_radio || aspectradio_iframe){
						       	    if(resize_radio<aspectradio_iframe){
		      	                       scaleGio=resize_radio;
		                        	}else
		                   	         {
		      	                     scaleGio=aspectradio_iframe;
		                  	         }
						  }
						  else{
						       scaleGio=0.37;
						}
						 scaleGio=0.4;
				   }
		
	   opera=(/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent))?1:0;
 	   mozilla=(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))?1:0;
 	   ie=(/MSIE (\d+\.\d+);/.test(navigator.userAgent))?1:0;
	   chrome=(/chrome/.test(navigator.userAgent.toLowerCase()))?1:0;
	   safari=(/safari/.test(navigator.userAgent.toLowerCase()))?1:0;
	  
	  if(mozilla){
	    
		  var srotate = "scale(" +scaleGio + ")";
          $("#wrapper").css({"-moz-transform" : srotate});
	       $("#wrapper").css({"-moz-transform-origin" : '0 0'});
		    $('#wrapper').css({ left: -4});
		                
		 }
	   if(ie){
	        $('#wrapper').css('zoom',scaleGio);
            $('#wrapper').css({ left: -5});
			
			}
	    if(opera){
		    $('#wrapper').css('zoom',scaleGio);
            $('#wrapper').css({ left: -26});
	    }
		
		  if(safari){
		    $('#wrapper').css('zoom',scaleGio);
            $('#wrapper').css({ left: -16});
	    }
		  if(chrome){
		    $('#wrapper').css('zoom',scaleGio);
            $('#wrapper').css({ left: -16});
	    }		
		 });










	 var base_url; var infopoint;
	

	$(function() {
		 
	  //$('.map').maphilight();
		 $('.map').maphilight({"fillColor":"000000","fillOpacity": 0.3});
		 $('.point').find('.close').live('click', function(){
			var t = $(this),
				parent = t.parent('.point');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});
			$('.point2').find('.close').live('click', function(){
			 cond=0;
			var t = $(this),
				parent = t.parent('.point2');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});	
		
	});
	
	
	$.extend({
                    getUrlVars: function(){
					var vars = [], hash;
					var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
					for(var i = 0; i < hashes.length; i++)
					{
					  hash = hashes[i].split('=');
					  vars.push(hash[0]);
					  vars[hash[0]] = hash[1];
					}
					return vars;
				  },
				  getUrlVar: function(name){
					return $.getUrlVars()[name];
				  }
				});

function loadpopup (padi, path){	
     $(function() {	  
	  
	  
	 
		  //console.log(base_url);
      $('map').bind('mouseover', function(e) {
               e.preventDefault();
			   
			    if(e.pageX > 250 )
				    nuovo=e.pageX-250;
				 else
                    nuovo=e.pageX;	
			   
		      $('#map').next('.point').remove();
				$('#map').after($('<div />').addClass('point'));
				$('.point')
				.html('<h3 class="red">Vai al padiglione '+padi+'</h3><span>'+path+'</span>')
			    .css({
                    zIndex:'9999',
					left:nuovo,
					top: e.pageY+15,
					width:200,
                    opacity:.9
				})
				.fadeIn();
	 	}, function(){
			this.animate({
				fill: attributes.fill
			}, 300);
        });
      });
    }
	
	
	function vai (padi, tsid){	
     $(function() {
		  base_url = $.getUrlVar('base_url');
		  
		   infopoint = $.getUrlVar('infopoint');
		   
		   
		   if( typeof(base_url) != 'undefined' ){
			     if( typeof(infopoint) != 'undefined' ){
		    			 infopoint=infopoint.replace('#','');
		    			 if(infopoint=='true'){
			                       var nuovo_url_info='http://'+base_url+'/infopoint/infopoint_tradeshow_homepage/tradeshow_map.jsp?pavilion='+padi+'&TradeshowId='+tsid+'';
			                       setTimeout(function(){ 
                                      top.location.href = nuovo_url_info;
                                      }, 1000);
		                   }else{
		                    base_url=base_url.replace('#','');
			           var nuovo_url='http://'+base_url+'/portal/tradeshowMap.do?pavilion='+padi+'&TS_ID='+tsid+'';
			       
			            setTimeout(function(){ 
                            top.location.href = nuovo_url;
                                      }, 1000);
		                   }
		    
		    
		           }else{
		               base_url=base_url.replace('#','');
			           var nuovo_url='http://'+base_url+'/portal/tradeshowMap.do?pavilion='+padi+'&TS_ID='+tsid+'';
			       
			            setTimeout(function(){ 
                            top.location.href = nuovo_url;
                                      }, 1000);
			        }
			        
			        }
				  else{
					  alert('Attenzione manca il base Url');
		  }
	 	 });
	 }
	  function unload(){
		    $(function() {
			     $('.point').html();
				 $('.point').hide();
			 });
	  }		 





$(function() {
		$.extend({
                    getUrlVars: function(){
					var vars = [], hash;
					var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
					for(var i = 0; i < hashes.length; i++)
					{
					  hash = hashes[i].split('=');
					  vars.push(hash[0]);
					  vars[hash[0]] = hash[1];
					}
					return vars;
				  },
				  getUrlVar: function(name){
					return $.getUrlVars()[name];
				  }
				});
				
			 var fullstand = $.getUrlVar('fullstand');
			 if( typeof(fullstand) != 'undefined' ){
				    fullstand=fullstand.replace("#","");
					
					if(fullstand=="true"){
						$('.map').maphilight({alwaysOn:true});
						}
				    else{
					$('.map').maphilight();
					}
				}	else{$('.map').maphilight();}	
				
		 $('.point').find('.close').live('click', function(){
			var t = $(this),
				parent = t.parent('.point');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});
			$('.point2').find('.close').live('click', function(){
			 cond=0;
			var t = $(this),
				parent = t.parent('.point2');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});	     var wrapper_wid=$('#wrapper').width();
                 var wrapper_hei=$('#wrapper').height();
				 
				 var iframew = $.getUrlVar('w');	
				 var iframeh = $.getUrlVar('h');	
                 
                  if( typeof(iframew) != 'undefined' ){
					   iframew= iframew.replace("#","");
				   }else{
				       // alert("ohhhh attenzione widh non definito");
						iframew=755;
				   }
				    if( typeof(iframeh) != 'undefined' ){
					  iframeh= iframeh.replace("#","");
				     }else{
				  // alert("ohhhh attenzione height non definito");
				   iframeh=920;
				   }	
		         var aspectradio_iframe= iframew/wrapper_wid;
				 var resize_radio = iframeh/wrapper_hei;		
		
		          var scale = $.getUrlVar('scale');
				  var scaleGio;
				  if( typeof(scale) != 'undefined' ){
					  scaleGio= scale.replace("#","");
				   }
					  else
					  {
						   if(resize_radio || aspectradio_iframe){
						       	    if(resize_radio<aspectradio_iframe){
		      	                       scaleGio=resize_radio;
		                        	}else
		                   	         {
		      	                     scaleGio=aspectradio_iframe;
		                  	         }
						  }
						  else{
						       scaleGio=0.37;
						}
						 scaleGio=0.4;
				   }
		
	   opera=(/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent))?1:0;
 	   mozilla=(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))?1:0;
 	   ie=(/MSIE (\d+\.\d+);/.test(navigator.userAgent))?1:0;
	   chrome=(/chrome/.test(navigator.userAgent.toLowerCase()))?1:0;
	   safari=(/safari/.test(navigator.userAgent.toLowerCase()))?1:0;
	  
	  if(mozilla){
	    
		  var srotate = "scale(" +scaleGio + ")";
          $("#wrapper").css({"-moz-transform" : srotate});
	       $("#wrapper").css({"-moz-transform-origin" : '0 0'});
		    $('#wrapper').css({ left: -4});
		                
		 }
	   if(ie){
	        $('#wrapper').css('zoom',scaleGio);
            $('#wrapper').css({ left: -5});
			
			}
	    if(opera){
		    $('#wrapper').css('zoom',scaleGio);
            $('#wrapper').css({ left: -26});
	    }
		
		  if(safari){
		    $('#wrapper').css('zoom',scaleGio);
            $('#wrapper').css({ left: -16});
	    }
		  if(chrome){
		    $('#wrapper').css('zoom',scaleGio);
            $('#wrapper').css({ left: -16});
	    }		
		 });




var BrowserZoomControl = function() { 

}



BrowserZoomControl.prototype.enableZoom = function(success, fail) {
	PhoneGap.exec(success, fail, "BrowserZoomControl", "enableZoom", []);
};
BrowserZoomControl.prototype.disableZoom = function(success, fail) {
	PhoneGap.exec(success, fail, "BrowserZoomControl", "disableZoom", []);
};


PhoneGap.addConstructor(function() {
	PhoneGap.addPlugin('browserZoomControl', new BrowserZoomControl());
	PluginManager.addService("BrowserZoomControl","it.crisma.mobile.phonegap.plugins.BrowserZoomControl");
});

/**
 *    HOWTO:
 *
 *
 *  function addEventToCalendar( ) {
      
      var title= "My Appt";
      var location = "Los Felix";
      var notes = "me testing";
      var startDate = "2013-01-23 09:31:00";
      var endDate = "2013-01-23 12:30:00";
      
      calendarPlugin.createEvent(title,location,notes,startDate,endDate);
  }
 *
 */

var calendarPlugin = {

	createEvent:function (title, location, notes, startDate, endDate) {
		console.log(Ext.String.format("createEvent {0} {1} {2} {3} {4}", title, location, notes, startDate, endDate));
		try {
			return Cordova.exec(null, null, "it.crisma.mobile.calendarPlugin", "createEvent", [title, location, notes, startDate, endDate]);
		} catch (e) {
			console.log("error calendarPlugin" + e.message);
		}
	}
};

var newIdLocalNotification = 0;
var localNotification = {

	/**
	 * Register a notification message for a specific date / time
	 *
	 * @param successCB
	 * @param failureCB
	 * @param options
	 *            Array with arguments. Valid arguments are date, message,
	 *            repeatDaily and id
	 */
	add:function (options) {
		try {
			var defaults = {
				date:       new Date(),
				message:    '',
				ticker:     '',
				repeatDaily:false,
				id:         ""
			};

			/*if (options.date) {
			 options.date = (options.date.getMonth()) + "/" + (options.date.getDate()) + "/"
			 + (options.date.getFullYear()) + "/ " + (options.date.getHours()) + ":"
			 + (options.date.getMinutes()) +":00";
			 }*/

			for (var key in defaults) {
				if (typeof options[key] !== "undefined")
					defaults[key] = options[key];
			}

			if (defaults["id"] == '') {
				defaults["id"] = newIdLocalNotification++;
			}

			// alert("LocalNotification "+defaults['date']);
			console.log("LocalNotification " + defaults['date']);
			return Cordova.exec(null, null, 'it.crisma.mobile.LocalNotification', 'addNotification', new Array(defaults));
		} catch (e) {
			console.log("error LocalNotification" + e.message);
		}

	},

	/**
	 * Cancel an existing notification using its original ID.
	 *
	 * @param id
	 *            The ID that was used when creating the notification using the
	 *            'add' method.
	 */
	cancel:function (notificationId) {
		PhoneGap.exec(null, null, 'it.crisma.mobile.LocalNotification', 'cancel', new Array({
			id:notificationId
		}));
	},

	/**
	 * Cancel all notifications that were created by your application.
	 */
	cancelAll:function () {
		PhoneGap.exec(null, null, 'it.crisma.mobile.LocalNotification', 'cancelAll', new Array());
	}
};

(function($) {
	var has_VML, has_canvas, create_canvas_for, add_shape_to, clear_canvas, shape_from_area,
		canvas_style, hex_to_decimal, css3color, is_image_loaded, options_from_area;

	has_VML = document.namespaces;
	has_canvas = !!document.createElement('canvas').getContext;

	if(!(has_canvas || has_VML)) {
		$.fn.maphilight = function() { return this; };
		return;
	}
	
	if(has_canvas) {
		hex_to_decimal = function(hex) {
			return Math.max(0, Math.min(parseInt(hex, 16), 255));
		};
		css3color = function(color, opacity) {
			return 'rgba('+hex_to_decimal(color.substr(0,2))+','+hex_to_decimal(color.substr(2,2))+','+hex_to_decimal(color.substr(4,2))+','+opacity+')';
		};
		create_canvas_for = function(img) {
			var c = $('<canvas style="width:'+img.width+'px;height:'+img.height+'px;"></canvas>').get(0);
			c.getContext("2d").clearRect(0, 0, c.width, c.height);
			return c;
		};
		var draw_shape = function(context, shape, coords, x_shift, y_shift) {
			x_shift = x_shift || 0;
			y_shift = y_shift || 0;
			
			context.beginPath();
			if(shape == 'rect') {
				// x, y, width, height
				context.rect(coords[0] + x_shift, coords[1] + y_shift, coords[2] - coords[0], coords[3] - coords[1]);
			} else if(shape == 'poly') {
				context.moveTo(coords[0] + x_shift, coords[1] + y_shift);
				for(i=2; i < coords.length; i+=2) {
					context.lineTo(coords[i] + x_shift, coords[i+1] + y_shift);
				}
			} else if(shape == 'circ') {
				// x, y, radius, startAngle, endAngle, anticlockwise
				context.arc(coords[0] + x_shift, coords[1] + y_shift, coords[2], 0, Math.PI * 2, false);
			}
			context.closePath();
		}
		add_shape_to = function(canvas, shape, coords, options, name) {
			var i, context = canvas.getContext('2d');
			
			// Because I don't want to worry about setting things back to a base state
			
			// Shadow has to happen first, since it's on the bottom, and it does some clip /
			// fill operations which would interfere with what comes next.
			if(options.shadow) {
				context.save();
				if(options.shadowPosition == "inside") {
					// Cause the following stroke to only apply to the inside of the path
					draw_shape(context, shape, coords);
					context.clip();
				}
				
				// Redraw the shape shifted off the canvas massively so we can cast a shadow
				// onto the canvas without having to worry about the stroke or fill (which
				// cannot have 0 opacity or width, since they're what cast the shadow).
				var x_shift = canvas.width * 100;
				var y_shift = canvas.height * 100;
				draw_shape(context, shape, coords, x_shift, y_shift);
				
				context.shadowOffsetX = options.shadowX - x_shift;
				context.shadowOffsetY = options.shadowY - y_shift;
				context.shadowBlur = options.shadowRadius;
				context.shadowColor = css3color(options.shadowColor, options.shadowOpacity);
				
				// Now, work out where to cast the shadow from! It looks better if it's cast
				// from a fill when it's an outside shadow or a stroke when it's an interior
				// shadow. Allow the user to override this if they need to.
				var shadowFrom = options.shadowFrom;
				if (!shadowFrom) {
					if (options.shadowPosition == 'outside') {
						shadowFrom = 'fill';
					} else {
						shadowFrom = 'stroke';
					}
				}
				if (shadowFrom == 'stroke') {
					context.strokeStyle = "rgba(0,0,0,1)";
					context.stroke();
				} else if (shadowFrom == 'fill') {
					context.fillStyle = "rgba(0,0,0,1)";
					context.fill();
				}
				context.restore();
				
				// and now we clean up
				if(options.shadowPosition == "outside") {
					context.save();
					// Clear out the center
					draw_shape(context, shape, coords);
					context.globalCompositeOperation = "destination-out";
					context.fillStyle = "rgba(0,0,0,1);";
					context.fill();
					context.restore();
				}
			}
			
			context.save();
			
			draw_shape(context, shape, coords);
			
			// fill has to come after shadow, otherwise the shadow will be drawn over the fill,
			// which mostly looks weird when the shadow has a high opacity
			if(options.fill) {
				context.fillStyle = css3color(options.fillColor, options.fillOpacity);
				context.fill();
			}
			// Likewise, stroke has to come at the very end, or it'll wind up under bits of the
			// shadow or the shadow-background if it's present.
			if(options.stroke) {
				context.strokeStyle = css3color(options.strokeColor, options.strokeOpacity);
				context.lineWidth = options.strokeWidth;
				context.stroke();
			}
			
			context.restore();
			
			if(options.fade) {
				$(canvas).css('opacity', 0).animate({opacity: 1}, 100);
			}
		};
		clear_canvas = function(canvas) {
			canvas.getContext('2d').clearRect(0, 0, canvas.width,canvas.height);
		};
	} else {   // ie executes this code
		create_canvas_for = function(img) {
			return $('<var style="zoom:1;overflow:hidden;display:block;width:'+img.width+'px;height:'+img.height+'px;"></var>').get(0);
		};
		add_shape_to = function(canvas, shape, coords, options, name) {
			var fill, stroke, opacity, e;
			fill = '<v:fill color="#'+options.fillColor+'" opacity="'+(options.fill ? options.fillOpacity : 0)+'" />';
			stroke = (options.stroke ? 'strokeweight="'+options.strokeWidth+'" stroked="t" strokecolor="#'+options.strokeColor+'"' : 'stroked="f"');
			opacity = '<v:stroke opacity="'+options.strokeOpacity+'"/>';
			if(shape == 'rect') {
				e = $('<v:rect name="'+name+'" filled="t" '+stroke+' style="zoom:1;margin:0;padding:0;display:block;position:absolute;left:'+coords[0]+'px;top:'+coords[1]+'px;width:'+(coords[2] - coords[0])+'px;height:'+(coords[3] - coords[1])+'px;"></v:rect>');
			} else if(shape == 'poly') {
				e = $('<v:shape name="'+name+'" filled="t" '+stroke+' coordorigin="0,0" coordsize="'+canvas.width+','+canvas.height+'" path="m '+coords[0]+','+coords[1]+' l '+coords.join(',')+' x e" style="zoom:1;margin:0;padding:0;display:block;position:absolute;top:0px;left:0px;width:'+canvas.width+'px;height:'+canvas.height+'px;"></v:shape>');
			} else if(shape == 'circ') {
				e = $('<v:oval name="'+name+'" filled="t" '+stroke+' style="zoom:1;margin:0;padding:0;display:block;position:absolute;left:'+(coords[0] - coords[2])+'px;top:'+(coords[1] - coords[2])+'px;width:'+(coords[2]*2)+'px;height:'+(coords[2]*2)+'px;"></v:oval>');
			}
			e.get(0).innerHTML = fill+opacity;
			$(canvas).append(e);
		};
		clear_canvas = function(canvas) {
			$(canvas).find('[name=highlighted]').remove();
		};
	}
	
	shape_from_area = function(area) {
		var i, coords = area.getAttribute('coords').split(',');
		for (i=0; i < coords.length; i++) { coords[i] = parseFloat(coords[i]); }
		return [area.getAttribute('shape').toLowerCase().substr(0,4), coords];
	};

	options_from_area = function(area, options) {
		var $area = $(area);
		return $.extend({}, options, $.metadata ? $area.metadata() : false, $area.data('maphilight'));
	};
	
	is_image_loaded = function(img) {
		if(!img.complete) { return false; } // IE
		if(typeof img.naturalWidth != "undefined" && img.naturalWidth == 0) { return false; } // Others
		return true;
	};

	canvas_style = {
		position: 'absolute',
		left: 0,
		top: 0,
		padding: 0,
		border: 0
	};
	
	var ie_hax_done = false;
	$.fn.maphilight = function(opts) {
		opts = $.extend({}, $.fn.maphilight.defaults, opts);
		
		if(!has_canvas && $.browser.msie && !ie_hax_done) {
			document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
			var style = document.createStyleSheet();
			var shapes = ['shape','rect', 'oval', 'circ', 'fill', 'stroke', 'imagedata', 'group','textbox'];
			$.each(shapes,
				function() {
					style.addRule('v\\:' + this, "behavior: url(#default#VML); antialias:true");
				}
			);
			ie_hax_done = true;
		}
		
		return this.each(function() {
			var img, wrap, options, map, canvas, canvas_always, mouseover, highlighted_shape, usemap;
			img = $(this);

			if(!is_image_loaded(this)) {
				// If the image isn't fully loaded, this won't work right.  Try again later.
				return window.setTimeout(function() {
					img.maphilight(opts);
				}, 200);
			}

			options = $.extend({}, opts, $.metadata ? img.metadata() : false, img.data('maphilight'));

			// jQuery bug with Opera, results in full-url#usemap being returned from jQuery's attr.
			// So use raw getAttribute instead.
			usemap = img.get(0).getAttribute('usemap');

			map = $('map[name="'+usemap.substr(1)+'"]');

			if(!(img.is('img') && usemap && map.size() > 0)) {
				return;
			}

			if(img.hasClass('maphilighted')) {
				// We're redrawing an old map, probably to pick up changes to the options.
				// Just clear out all the old stuff.
				var wrapper = img.parent();
				img.insertBefore(wrapper);
				wrapper.remove();
				$(map).unbind('.maphilight').find('area[coords]').unbind('.maphilight');
			}

			wrap = $('<div></div>').css({
				display:'block',
				background:'url("'+this.src+'")',
				position:'relative',
				padding:0,
				width:this.width,
				height:this.height
				});
			if(options.wrapClass) {
				if(options.wrapClass === true) {
					wrap.addClass($(this).attr('class'));
				} else {
					wrap.addClass(options.wrapClass);
				}
			}
			img.before(wrap).css('opacity', 0).css(canvas_style).remove();
			if($.browser.msie) { img.css('filter', 'Alpha(opacity=0)'); }
			wrap.append(img);
			
			canvas = create_canvas_for(this);
			$(canvas).css(canvas_style);
			canvas.height = this.height;
			canvas.width = this.width;
			
			mouseover = function(e) {
				var shape, area_options;
				area_options = options_from_area(this, options);
				if(
					!area_options.neverOn
					&&
					!area_options.alwaysOn
				) {
					shape = shape_from_area(this);
					add_shape_to(canvas, shape[0], shape[1], area_options, "highlighted");
					if(area_options.groupBy) {
						var areas;
						// two ways groupBy might work; attribute and selector
						if(/^[a-zA-Z][-a-zA-Z]+$/.test(area_options.groupBy)) {
							areas = map.find('area['+area_options.groupBy+'="'+$(this).attr(area_options.groupBy)+'"]')
						} else {
							areas = map.find(area_options.groupBy);
						}
						var first = this;
						areas.each(function() {
							if(this != first) {
								var subarea_options = options_from_area(this, options);
								if(!subarea_options.neverOn && !subarea_options.alwaysOn) {
									var shape = shape_from_area(this);
									add_shape_to(canvas, shape[0], shape[1], subarea_options, "highlighted");
								}
							}
						});
					}
					// workaround for IE7, IE8 not rendering the final rectangle in a group
					if(!has_canvas) {
						$(canvas).append('<v:rect></v:rect>');
					}
				}
			}

			$(map).bind('alwaysOn.maphilight', function() {
				// Check for areas with alwaysOn set. These are added to a *second* canvas,
				// which will get around flickering during fading.
				if(canvas_always) {
					clear_canvas(canvas_always)
				}
				if(!has_canvas) {
					$(canvas).empty();
				}
				$(map).find('area[coords]').each(function() {
					var shape, area_options;
					area_options = options_from_area(this, options);
					if(area_options.alwaysOn) {
						if(!canvas_always && has_canvas) {
							canvas_always = create_canvas_for(img.get());
							$(canvas_always).css(canvas_style);
							canvas_always.width = img.width();
							canvas_always.height = img.height();
							img.before(canvas_always);
						}
						area_options.fade = area_options.alwaysOnFade; // alwaysOn shouldn't fade in initially
						shape = shape_from_area(this);
						if (has_canvas) {
							add_shape_to(canvas_always, shape[0], shape[1], area_options, "");
						} else {
							add_shape_to(canvas, shape[0], shape[1], area_options, "");
						}
					}
				});
			});
			
			$(map).trigger('alwaysOn.maphilight').find('area[coords]')
				.bind('mouseover.maphilight', mouseover)
				.bind('mouseout.maphilight', function(e) { clear_canvas(canvas); });;
			
			img.before(canvas); // if we put this after, the mouseover events wouldn't fire.
			
			img.addClass('maphilighted');
		});
	};
	//fillColor: '40C512',strokeColor: '40C512',
	$.fn.maphilight.defaults = {
		fill: true,
		fillColor: 'ff0000',
		fillOpacity: 0.5,
		stroke: true,
		strokeColor: 'ff0000',
		strokeOpacity: 1,
		strokeWidth: 1,
		fade: true,
		alwaysOn: false,
		neverOn: false,
		groupBy: false,
		wrapClass: true,
		// plenty of shadow:
		shadow: false,
		shadowX: 0,
		shadowY: 0,
		shadowRadius: 6,
		shadowColor: '000000',
		shadowOpacity: 0.9,
		shadowPosition: 'outside',
		shadowFrom: false
	};
})(jQuery);


/*
jQuery Localizer Plugin

Copyright (c) 2011 Sagi Mann
All rights reserved.

Redistribution and use in source and binary forms are permitted
provided that the above copyright notice and this paragraph are
duplicated in all such forms and that any documentation,
advertising materials, and other materials related to such
distribution and use acknowledge that the software was developed
by the <organization>.  The name of the
University may not be used to endorse or promote products derived
from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED ``AS IS'' AND WITHOUT ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, WITHOUT LIMITATION, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
*/

jQuery.fn.localize = function(stringsVar) {
	var stringRes = stringsVar || strings;
	if(!stringRes) return;
	this.find("*").contents().each(function() {
			if (typeof this.data == 'string') {
				var s = jQuery.trim(this.data);
				if (typeof s == 'string' && s.length > 0) {
					var s2 = stringRes[s];
					if (typeof s2 == 'string') {
						this.data = s2;
					}
				}
			}
			
			if (this.nodeName == "IMG") {
				// use the nodeValue instead of this.src because this.src is resolved to full path instead of the original value in the html, so it can't be known at coding time.
				var s2 = stringRes[this.attributes['src'].nodeValue];
				if (typeof s2 == 'string') {
					this.attributes['src'].nodeValue = s2;
				}
			}

			if (this.nodeName == "A") {
				// use the nodeValue instead of this.href because this.href is resolved to full path instead of the original value in the html, so it can't be known at coding time.
				var s2 = stringRes[this.attributes['href'].nodeValue];
				if (typeof s2 == 'string') {
					this.href = s2;
				}
			}
			return this;
	});
	
};


jQuery.fn.unlocalize = function(stringsVar) {
	var stringRes = stringsVar || strings_it;
	if(!stringRes) return;
	this.find("*").contents().each(function() {
			if (typeof this.data == 'string') {
				var s = jQuery.trim(this.data);
				if (typeof s == 'string' && s.length > 0) {
					var s2 = stringRes[s];
					if (typeof s2 == 'string') {
						this.data = s2;
					}
				}
			}
			
			if (this.nodeName == "IMG") {
				// use the nodeValue instead of this.src because this.src is resolved to full path instead of the original value in the html, so it can't be known at coding time.
				var s2 = stringRes[this.attributes['src'].nodeValue];
				if (typeof s2 == 'string') {
					this.attributes['src'].nodeValue = s2;
				}
			}

			if (this.nodeName == "A") {
				// use the nodeValue instead of this.href because this.href is resolved to full path instead of the original value in the html, so it can't be known at coding time.
				var s2 = stringRes[this.attributes['href'].nodeValue];
				if (typeof s2 == 'string') {
					this.href = s2;
				}
			}
			return this;
	});
	
};

var strings = {
	'Altro':                                        'Other',
	'ALTRO':                                        'OTHER',
	'Aziende rappresentate':                        'Represented companies',
	'Biglietti':                                    'Tickets',
	'BIGLIETTI':                                    'TICKETS',
	'Caricamento ...':                              'Loading ...',
	'Categorie:':                                   'Categories:',
	'Cerca':                                        'Search',
	'Chiama':                                       'Call',
	'Contatti':                                     'Contacts',
	'Salva contatto':                               '+ contact',
	'CONTATTI':                                     'CONTACTS',
	'Date e orari':                                 'Dates and times',
	'DATE E ORARI':                                 'DATES AND TIMES',
	'Dettaglio espositore':                         'Exhibitor detail',
	'Dettaglio evento':                             'Event detail',
	'Dettaglio servizio':                           'Service detail ',
	'Espositore':                                   'Exhibitor',
	'Espositori':                                   'Exhibitors',
	'espositori trovati.':                          'exhibitors found.',
	'espositori in questa categoria':               'exhibitors in this category.',
	'espositori per questo marchio':                'exhibitors with this brand.',
	'Evento':                                       'Event',
	'Eventi':                                       'Events',
	'Informazioni':                                 'Information',
	'Invia mail':                                   'Send mail',
	'Lista Eventi':                                 'Event List',
	'Lista Preferiti':                              'Favourites List',
	'Lista Servizi':                                'Service List',
	'Mappa':                                        'Map',
	'Mappa dei Padiglioni':                         'Map of the Pavilions',
	'MAPPA DEI PADIGLIONI':                         'MAP OF THE PAVILIONS',
	'Marchi:':                                      'Brands:',
	'marchi trovati':                               'brands found',
	'Mobilità':                                     'Mobility',
	'Pad':                                          'Pav',
	'Padiglione':                                   'Pavilion',
	'Porte':                                        'Doors',
	'PORTE':                                        'DOORS',
	'Preferiti':                                    'Favorites',
	'Preferito':                                    'Favorite',
	'Rappresentata da':                             'Represented by',
	'Ricerca Espositori':                           'Exhibitor Search',
	'Scegli il tuo criterio di ricerca:':           'Choose your search criteria:',
	'Servizi':                                      'Services',
	'Settori espositivi':                           'Exhibition sectors',
	'SETTORI ESPOSITIVI':                           'EXHIBITION SECTORS',
	'tel.':                                         'Phone',
	'Tipo':                                         'Type',
	'tra gli espositori':                           'the exhibitors',
	'tra i marchi':                                 'in brands',
	'tra le categorie merceologiche':               'in product category',
	'Tutti':                                        'All',
	'Espositori trovati':                           'Exhibitors found',
	'img/ricerca_button_bottom.png':                'img/search_button_bottom.png',
	'img/eventi_button_bottom.png':                 'img/events_button_bottom.png',
	'img/preferiti_button_bottom.png':              'img/favorites_button_bottom.png',
	'img/servizi_button_bottom.png':                'img/services_button_bottom.png',
	'Nota':                                         'Note',
	'Nota:':                                        'Note:',
	'Salva':                                        'Save',
	'edizione':                                     'edition',
	'22/24 settembre 2012':                         ' september 22/24, 2012',
	'Lista eventi':                                 'Events list',
	'Lista Merceologica':                           'Commodity list',
	'Categoria merceologica':                       'Commodity category',
	'Foto':                                         'Photo',
	'Foto:':                                        'Photo:',
	'aggiungi preferito':                           'add to favorite',
	'Nessun risultato trovato.':                    'No results available',
	'Meteo':                                        'Weather',
	'Ristorazioni':                                 'Food',
	'Servizio ATM':                                 'Public transports',
	'Dettaglio ristoro':                            'Food detail',
	'Lista ristori':                                'Food list',
	'Mappa ristori':                                'Food map',
	'Ristorante':                                   'Restaurant',
	'Aziende collegate non presenti':               'Associated companies not included',
	'Calcola':                                      'Calculate',
	'Da:':                                          'From:',
	'A:':                                           'TO:',
	'Metri percorsi:':                              'Meters traveled:',
	'Tempo previsto:':                              'Estimated time:',
	'PERCORSO sulla rete ATM e Nord Est Trasporti.':'PATH on the ATM network and the North East Transport.',
	'metri':                                        'meters',
	'minuti':                                       'minutes',
	'Come arrivare':                                'How to reach us',
	'Metropolitana e Mezzi Pubblici':               'Underground and public transports',
	'Informazioni sul traffico':                    'Info mobility',
	'Punti ristoro':                                'Food',
    'Parcheggi':                                    'Parking',
    'Lista':                                        'List',
    'Mappa':                                        'Map',
    'Bar e ristoranti':                             'Bars and restaurants'

};

var strings_it = {
	'Other':                                                'Altro',
	'OTHER':                                                'ALTRO',
	'Represented companies':                                'Aziende rappresentate',
	'Tickets':                                              'Biglietti',
	'TICKETS':                                              'BIGLIETTI',
	'Loading ...':                                          'Caricamento ...',
	'Categories:':                                          'Categorie:',
	'Search':                                               'Cerca',
	'Call':                                                 'Chiama',
	'Contacts':                                             'Contatti',
	'+ contact':                                            'Salva contatto',
	'CONTACTS':                                             'CONTATTI',
	'Dates and times':                                      'Date e orari',
	'DATES AND TIMES':                                      'DATE E ORARI',
	'Exhibitor detail':                                     'Dettaglio espositore',
	'Event detail':                                         'Dettaglio evento',
	'Service detail ':                                      'Dettaglio servizio',
	'Exhibitor':                                            'Espositore',
	'Exhibitors':                                           'Espositori',
	'exhibitors found.':                                    'espositori trovati.',
	'exhibitors in this category.':                         'espositori in questa categoria',
	'exhibitors with this brand.':                          'espositori per questo marchio',
	'Event':                                                'Evento',
	'Events':                                               'Eventi',
	'Information':                                          'Informazioni',
	'Send mail':                                            'Invia mail',
	'Event List':                                           'Lista Eventi',
	'Favourites List':                                      'Lista Preferiti',
	'Service List':                                         'Lista Servizi',
	'Map':                                                  'Mappa',
	'Map of the Pavilions':                                 'Mappa dei Padiglioni',
	'MAP OF THE PAVILIONS':                                 'MAPPA DEI PADIGLIONI',
	'Brands:':                                              'Marchi:',
	'brands found':                                         'marchi trovati',
	'Mobility':                                             'Mobilità',
	'Pav':                                                  'Pad',
	'Pavilion':                                             'Padiglione',
	'Doors':                                                'Porte',
	'DOORS':                                                'PORTE',
	'Favorites':                                            'Preferiti',
	'Favorite':                                             'Preferito',
	'Represented by':                                       'Rappresentata da',
	'Exhibitor Search':                                     'Ricerca Espositori',
	'Choose your search criteria:':                         'Scegli il tuo criterio di ricerca:',
	'Services':                                             'Servizi',
	'Exhibition sectors':                                   'Settori espositivi',
	'EXHIBITION SECTORS':                                   'SETTORI ESPOSITIVI',
	'Phone':                                                'Tel.',
	'Type':                                                 'Tipo',
	'the exhibitors':                                       'tra gli espositori',
	'in brands':                                            'tra i marchi',
	'in product category':                                  'tra le categorie merceologiche',
	'All':                                                  'Tutti',
	'Exhibitors found':                                     'Espositori trovati',
	'img/search_button_bottom.png':                         'img/ricerca_button_bottom.png',
	'img/events_button_bottom.png':                         'img/eventi_button_bottom.png',
	'img/favorites_button_bottom.png':                      'img/preferiti_button_bottom.png',
	'img/services_button_bottom.png':                       'img/servizi_button_bottom.png',
	'edition':                                              'edizione',
	'september 22/24, 2012':                                '22/24 settembre 2012',
	'Events list':                                          'Lista eventi',
	'Commodity list':                                       'Lista Merceologica',
	'Commodity category':                                   'Categoria merceologica',
	'Photo':                                                'Foto',
	'Photo:':                                               'Foto:',
	'add to favorite':                                      'aggiungi preferito',
	'No results available':                                'Nessun risultato trovato.',
	'Public transports':                                    'Servizio ATM',
	'Weather':                                              'Meteo',
	'Food':                                                 'Ristorazioni',
	'Food detail':                                          'Dettaglio ristoro',
	'Food list':                                            'Lista ristori',
	'Food map':                                             'Mappa ristori',
	'Restaurant':                                           'Ristorante',
	'Associated companies not included':                    'Aziende collegate non presenti',
	'Calculate':                                            'Calcola',
	'From:':                                                'Da:',
	'TO:':                                                  'A',
	'Meters traveled:':                                     'Metri percorsi:',
	'Estimated time:':                                      'Tempo previsto:',
	'PATH on the ATM network and the North East Transport.':'PERCORSO sulla rete ATM e Nord Est Trasporti.',
	'meters':                                               'metri',
	'minutes':                                              'minuti',
	'How to reach us':                                      'Come arrivare',
	'Underground and public transports':                    'Metropolitana e Mezzi Pubblici',
	'Info mobility':                                        'Informazioni sul traffico',
	'Food':                                                 'Punti ristoro',
    'Parking':                                               'Parcheggi',
    'Map':                                                    'Mappa',
    'Bars and restaurants':                                 'Bar e ristoranti'




};
