
/**
 * Sencha Blink - Testing
 * @author Jacky Nguyen <jacky@sencha.com>
 */
(function(global) {
    var head = global.document.head,
        Ext = global.Ext;

    if (typeof Ext == 'undefined') {
        global.Ext = Ext = {};
    }

    function write(content) {
        document.write(content);
    }

    function addMeta(name, content) {
        var meta = document.createElement('meta');

        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        head.appendChild(meta);
    }

    Ext.blink = function(options) {
        var scripts = options.js || [],
            styleSheets = options.css || [],
            i, ln, path, platform, theme;

        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var msViewportStyle = document.createElement("style");
            msViewportStyle.appendChild(
                document.createTextNode(
                    "@media screen and (orientation: portrait) {" +
                        "@-ms-viewport {width: 320px !important;}" +
                    "}" +
                    "@media screen and (orientation: landscape) {" +
                        "@-ms-viewport {width: 560px !important;}" +
                    "}"
                )
            );
            document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
        }
        addMeta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no');
        addMeta('apple-mobile-web-app-capable', 'yes');
        addMeta('apple-touch-fullscreen', 'yes');

        Ext.microloaded = true;

        var filterPlatform = window.Ext.filterPlatform = function(platform) {
            var profileMatch = false,
                ua = navigator.userAgent,
                j, jln, exclude;

            platform = [].concat(platform);

            function isPhone(ua) {
                var isMobile = /Mobile(\/|\s)/.test(ua);

                // Either:
                // - iOS but not iPad
                // - Android 2
                // - Android with "Mobile" in the UA

                return /(iPhone|iPod)/.test(ua) ||
                          (!/(Silk)/.test(ua) && (/(Android)/.test(ua) && (/(Android 2)/.test(ua) || isMobile))) ||
                          (/(BlackBerry|BB)/.test(ua) && isMobile) ||
                          /(Windows Phone)/.test(ua);
            }

            function isTablet(ua) {
                return !isPhone(ua) && (/iPad/.test(ua) || /Android|Silk/.test(ua) || /(RIM Tablet OS)/.test(ua) ||
                    (/MSIE 10/.test(ua) && /; Touch/.test(ua)));
            }

            // Check if the ?platform parameter is set in the URL
            var paramsString = window.location.search.substr(1),
                paramsArray = paramsString.split("&"),
                params = {},
                testPlatform, i;

            for (i = 0; i < paramsArray.length; i++) {
                var tmpArray = paramsArray[i].split("=");
                params[tmpArray[0]] = tmpArray[1];
            }

            testPlatform = params.platform;
            if (testPlatform) {
                return platform.indexOf(testPlatform) != -1;
            }

            for (j = 0, jln = platform.length; j < jln; j++) {
                switch (platform[j]) {
                    case 'phone':
                        profileMatch = isPhone(ua);
                        break;
                    case 'tablet':
                        profileMatch = isTablet(ua);
                        break;
                    case 'desktop':
                        profileMatch = !isPhone(ua) && !isTablet(ua);
                        break;
                    case 'ios':
                        profileMatch = /(iPad|iPhone|iPod)/.test(ua);
                        break;
                    case 'android':
                        profileMatch = /(Android|Silk)/.test(ua);
                        break;
                    case 'blackberry':
                        profileMatch = /(BlackBerry|BB)/.test(ua);
                        break;
                    case 'safari':
                        profileMatch = /Safari/.test(ua) && !(/(BlackBerry|BB)/.test(ua));
                        break;
                    case 'chrome':
                        profileMatch = /Chrome/.test(ua);
                        break;
                    case 'ie10':
                        profileMatch = /MSIE 10/.test(ua);
                        break;
                    case 'windows':
                        profileMatch = /MSIE 10/.test(ua) || /Trident/.test(ua);
                        break;
                    case 'tizen':
                        profileMatch = /Tizen/.test(ua);
                        break;
                    case 'firefox':
                        profileMatch = /Firefox/.test(ua);
                }
                if (profileMatch) {
                    return true;
                }
            }
            return false;
        };

        for (i = 0,ln = styleSheets.length; i < ln; i++) {
            path = styleSheets[i];

            if (typeof path != 'string') {
                platform = path.platform;
                exclude = path.exclude;
                theme = path.theme;
                path = path.path;
            }

            if (platform) {
                if (!filterPlatform(platform) || filterPlatform(exclude)) {
                    continue;
                }
                Ext.theme = {
                    name: theme || 'Default'
                };
            }
            write('<link rel="stylesheet" href="'+path+'">');
        }

        for (i = 0,ln = scripts.length; i < ln; i++) {
            path = scripts[i];

            if (typeof path != 'string') {
                platform = path.platform;
                exclude = path.exclude;
                path = path.path;
            }

            if (platform) {
                if (!filterPlatform(platform) || filterPlatform(exclude)) {
                    continue;
                }
            }

            write('<script src="'+path+'"></'+'script>');
        }
    }

})(this);Ext.blink({"id":"dd01c1bc-1412-47b3-87fd-bfa26653d795","js":[{"path":"resources/js/cordova-2.2.0-android.js"},{"path":"resources/js/barcodescanner-android.js"},{"path":"resources/js/screenorientation-android.js"},{"path":"resources/js/statusbarnotification-android.js"},{"path":"resources/js/bixolonprint.js"},{"path":"resources/locale/ext-lang-it.js","update":"delta"},{"path":"resources/js/glob.js","update":"delta"},{"path":"app.js","update":"delta"}],"css":[{"path":"resources/css/app.css","update":"delta"},{"path":"resources/css/app-ui.css"},{"path":"resources/css/app-icons.css"}]});



var screenOrientation = function() {}

screenOrientation.prototype.set = function(str, success, fail) {
    PhoneGap.exec(success, fail, "ScreenOrientation", "set", [str]);
};
navigator.screenOrientation = new screenOrientation();


function checkConnection() {
    if ((navigator.connection || (navigator.network && navigator.network.connection) && !Ext.os.is.iOS)) {
        var d = navigator.network.connection.type;
        var c = {};
        c[Connection.UNKNOWN] = "Unknown connection";
        c[Connection.ETHERNET] = "Ethernet connection";
        c[Connection.WIFI] = "WiFi connection";
        c[Connection.CELL_2G] = "Cell 2G connection";
        c[Connection.CELL_3G] = "Cell 3G connection";
        c[Connection.CELL_4G] = "Cell 4G connection";
        c[Connection.NONE] = false;
        return c[d]
    } else {
        return Ext.device.Connection.isOnline()
    }
}
var clickAudio;

function clickFeedback() {
    var appConfig = Ext.StoreMgr.get("AppStore").getConf();
    if (appConfig && navigator.notification) {
        if (appConfig.get('optClkAFbk')) {
            var c = "./resources/media/button-16.mp3";
            if (!Ext.os.is.iOS) {
                c = "file:///android_asset/www/resources/media/button-16.mp3"
            }
            if (!clickAudio) {
                clickAudio = new Media(c, function () {}, function () {})
            }
            clickAudio.play()
        }
        if (appConfig.get('optClkVFbk')) {
            navigator.notification.vibrate(1)
        }
    }
}

function hideKeyboard(e, d) {
    var f = document.activeElement;
    f.setAttribute("disabled", "true");
    f.setAttribute("readonly", "readonly");
    Ext.defer(function () {
        f.blur();
        f.removeAttribute("readonly");
        f.removeAttribute("disabled");
        if (e) {
            e.call(d)
        }
    }, 100)
}

function extend(e, g) {
    var h = e,
        f;
    for (f in g) {
        if (g.hasOwnProperty(f)) {
            h[f] = g[f]
        }
    }
    return h
};

Array.prototype.merge = function () {
    for (var f = 0; f < arguments.length; f++) {
        var e = arguments[f];
        for (var d = 0; d < e.length; d++) {
            if (this.indexOf(e[d]) === -1) {
                this.push(e[d])
            }
        }
    }
    return this
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


var cordovaRef = window.PhoneGap || window.Cordova || window.cordova; // old to new fallbacks

/** @deprecated Use the W3C standard window.BixolonPrint API instead. */
var Bixolon = function() {
    this.textLines = [];
    this.textWidth = 69;
};

Bixolon.prototype.addHr = function(simbol) {

    var sp   = "=",
        line = "";
    if ((typeof simbol == 'string' || simbol instanceof String) && simbol.length == 1){
        sp = simbol;
    }

    for(var i = 0; i < 69; i++){
        line += sp;
    }

    this.addLine(line);
};

/**
 * @param obj
 * @param success   Callback function for success response.
 * @param fail      Callback function for fail response.
 */
Bixolon.prototype.addLine = function(obj) {
    //console.log("BixolonPrint.addLine called!");

    var rObj = {
        text: '',
        align: 'left',
        fontType: 'A',
        fontWeight: 'NONE',
        height: 0,
        width: 0
    };

    if ( typeof obj == 'string' || obj instanceof String ) {

        rObj.text = obj;

    } else if( obj.text ) {

        rObj.text = obj.text;

        if( obj.align ){
            rObj.align = obj.align;
        }

        if( obj.fontType ){
            rObj.fontType = obj.fontType;
        }

        if( obj.fontStyle ){
            rObj.fontWeight = obj.fontStyle;
        }
        if( obj.fontWeight ){
            rObj.fontWeight = obj.fontWeight;
        }

        if( obj.height ){
            rObj.height = obj.height;
        }

        if( obj.width ){
            rObj.width = obj.width;
        }

    } else {

        console.error("BixolonPrint.addLines failure: rObj.text parameter not found!");
        return;

    }

    this.textLines.push(rObj);
};

Bixolon.prototype.print = function(success, failure) {
    //console.log("BixolonPrint.print called!");

    if ( success === null ) {
        success = function(response) { console.log('BixolonPrint.print success: ' + response); };
    }
    
    if ( failure === null ) {
        failure = function(error) {console.error('BixolonPrint.print failure: ' + error); };
    }

    if ( typeof failure != "function" )  {
        console.error("BixolonPrint.print failure: failure parameter not a function");
        return;
    }

    if ( typeof success != "function" ) {
        console.error("BixolonPrint.print failure: success callback parameter must be a function");
        return;
    }

    cordova.exec(
        success,
        failure,
        "BixolonPrint",
        "print",
        [this.textLines]
    );

    this.textLines = [];
};

if ( !window.plugins ) window.plugins = {};

if ( !window.plugins.BixolonPrint ) window.plugins.BixolonPrint = new Bixolon();

