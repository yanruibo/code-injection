
var deviceInfo = function() {
    document.getElementById("platform").innerHTML = device.platform;
    document.getElementById("version").innerHTML = device.version;
    document.getElementById("uuid").innerHTML = device.uuid;
    document.getElementById("name").innerHTML = device.name;
    document.getElementById("width").innerHTML = screen.width;
    document.getElementById("height").innerHTML = screen.height;
    document.getElementById("colorDepth").innerHTML = screen.colorDepth;
};

var getLocation = function() {
    var suc = function(p) {
        alert(p.coords.latitude + " " + p.coords.longitude);
    };
    var locFail = function() {
    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};

var beep = function() {
    navigator.notification.beep(2);
};

var vibrate = function() {
    navigator.notification.vibrate(0);
};

function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

var accelerationWatch = null;

function updateAcceleration(a) {
    document.getElementById('x').innerHTML = roundNumber(a.x);
    document.getElementById('y').innerHTML = roundNumber(a.y);
    document.getElementById('z').innerHTML = roundNumber(a.z);
}

var toggleAccel = function() {
    if (accelerationWatch !== null) {
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : ""
        });
        accelerationWatch = null;
    } else {
        var options = {};
        options.frequency = 1000;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                }, options);
    }
};

var preventBehavior = function(e) {
    e.preventDefault();
};

function dump_pic(data) {
    var viewport = document.getElementById('viewport');
    console.log(data);
    viewport.style.display = "";
    viewport.style.position = "absolute";
    viewport.style.top = "10px";
    viewport.style.left = "10px";
    document.getElementById("test_img").src = "data:image/jpeg;base64," + data;
}

function fail(msg) {
    alert(msg);
}

function show_pic() {
    navigator.camera.getPicture(dump_pic, fail, {
        quality : 50
    });
}

function close() {
    var viewport = document.getElementById('viewport');
    viewport.style.position = "relative";
    viewport.style.display = "none";
}

function contacts_success(contacts) {
    alert(contacts.length
            + ' contacts returned.'
            + (contacts[2] && contacts[2].name ? (' Third contact is ' + contacts[2].name.formatted)
                    : ''));
}

function get_contacts() {
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    navigator.contacts.find(
            [ "displayName", "name" ], contacts_success,
            fail, obj);
}

function check_network() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    confirm('Connection type:\n ' + states[networkState]);
}

var watchID = null;

function updateHeading(h) {
    document.getElementById('h').innerHTML = h.magneticHeading;
}

function toggleCompass() {
    if (watchID !== null) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
        updateHeading({ magneticHeading : "Off"});
    } else {        
        var options = { frequency: 1000 };
        watchID = navigator.compass.watchHeading(updateHeading, function(e) {
            alert('Compass Error: ' + e.code);
        }, options);
    }
}

function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", deviceInfo, true);
}


({
   //The top level directory that contains your app. If this option is used
   //then it assumed your scripts are in a subdirectory under this path.
   //This option is not required. If it is not specified, then baseUrl
   //below is the anchor point for finding things. If this option is specified,
   //then all the files from the app directory will be copied to the dir:
   //output area, and baseUrl will assume to be a relative path under
   //this directory.
   appDir: "./",
    
    //By default, all modules are located relative to this path. If baseUrl
    //is not explicitly set, then all modules are loaded relative to
    //the directory that holds the build file. If appDir is set, then
    //baseUrl should be specified as relative to the appDir.    appDir: "./",
    baseUrl: "./javascript",

    //The directory path to save the output. If not specified, then
    //the path will default to be a directory called "build" as a sibling
    //to the build file. All relative paths are relative to the build file.
    dir: "./target/website",

    //Set paths for modules. If relative paths, set relative to baseUrl above.
    //If a special value of "empty:" is used for the path value, then that
    //acts like mapping the path to an empty file. It allows the optimizer to
    //resolve the dependency to path, but then does not include it in the output.
    //Useful to map module names that are to resources on a CDN or other
    //http: URL when running in the browser and during an optimization that
    //file should be skipped because it has no dependencies.
    paths: {
        'text':        'lib/require/require.text-1.0.2',
        'order':       'lib/require/require.order-1.0.5',
        'core':        'core',
        'utils':       'utils',
        'ui':          'ui',
        'db':          'db',
        'log':         'log',
        'collection':  'collection',
        'entry':       'entry',
        'register':    'register',
        'analytics':   'analytics',
        'jquery':      'lib/jquery/jquery-1.7.1',
        'underscore':  'lib/underscore/underscore-1.3.1',
        'backbone':    'lib/backbone/backbone-0.9.1',
        'jqmr':        'lib/jquerymobile/jquery.mobile.router-0.6',
        'jqm':         'lib/jquerymobile/jquery.mobile-1.1.0-rc.1'
    },

    //How to optimize all the JS files in the build output directory.
    //Right now only the following values
    //are supported:
    //- "uglify": (default) uses UglifyJS to minify the code.
    //- "closure": uses Google's Closure Compiler in simple optimization
    //mode to minify the code. Only available if running the optimizer using
    //Java.
    //- "closure.keepLines": Same as closure option, but keeps line returns
    //in the minified files.
    //- "none": no minification will be done.
    optimize: "uglify",

    //If using UglifyJS for script optimization, these config options can be
    //used to pass configuration values to UglifyJS.
    //See https://github.com/mishoo/UglifyJS for the possible values.
//    uglify: {
//        toplevel: true,
//        ascii_only: true,
//        beautify: true
//    },

    //Allow CSS optimizations. Allowed values:
    //- "standard": @import inlining, comment removal and line returns.
    //Removing line returns may have problems in IE, depending on the type
    //of CSS.
    //- "standard.keepLines": like "standard" but keeps line returns.
    //- "none": skip CSS optimizations.
    optimizeCss: "standard.keepLines",

    //Inlines the text for any text! dependencies, to avoid the separate
   //async XMLHttpRequest calls to load those dependencies.
   inlineText: true,


    //When the optimizer copies files from the source location to the
    //destination directory, it will skip directories and files that start
    //with a ".". If you want to copy .directories or certain .files, for
    //instance if you keep some packages in a .packages directory, or copy
    //over .htaccess files, you can set this to null. If you want to change
    //the exclusion rules, change it to a different regexp. If the regexp
    //matches, it means the directory will be excluded. This used to be
    //called dirExclusionRegExp before the 1.0.2 release.
    //As of 1.0.3, this value can also be a string that is converted to a
    //RegExp via new RegExp().
    fileExclusionRegExp: /^(.*require-1\.0\.5\.js|manifest\.json|app\.manifest|app\.build-webstore\.js|build-webstore\.sh|build-webstore\.sh|target|etc|webstore|splashes|config\.xml|build\.txt|\.idea|.*\.sh|.*\.min\.css|.*\.min\.js|r\.js|app\.build\.js|.*phonegap.*\.js|.*json.*\.js|.*date.*\.js|.*lawnchair.*\.js|\.idea|\.git|\.gitignore|data|README)$/,

    modules: [
        { name: "app" }
    ]
})



            var webappCache = window.applicationCache;
            if (webappCache) {
                webappCache.addEventListener('updateready', function() {
                    try { webappCache.swapCache(); } catch(e) { console.info("swapCache exception: " + e); }
//                    if (confirm('An update is available. Reload now?')) {
                        window.location.reload();
//                    }
                }, false);
                try { webappCache.update(); } catch(e){ console.info("Update cache exception: " + e); }
            }
        

   

            require.config({ paths: { "app": "javascript/app" } });
            require(["app"]);

            // <!-- Google Analytics
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s);
            // -->
        

({
   //The top level directory that contains your app. If this option is used
   //then it assumed your scripts are in a subdirectory under this path.
   //This option is not required. If it is not specified, then baseUrl
   //below is the anchor point for finding things. If this option is specified,
   //then all the files from the app directory will be copied to the dir:
   //output area, and baseUrl will assume to be a relative path under
   //this directory.
   appDir: "./",
    
    //By default, all modules are located relative to this path. If baseUrl
    //is not explicitly set, then all modules are loaded relative to
    //the directory that holds the build file. If appDir is set, then
    //baseUrl should be specified as relative to the appDir.    appDir: "./",
    baseUrl: "./javascript",

    //The directory path to save the output. If not specified, then
    //the path will default to be a directory called "build" as a sibling
    //to the build file. All relative paths are relative to the build file.
    dir: "./target/webstore",

    //Set paths for modules. If relative paths, set relative to baseUrl above.
    //If a special value of "empty:" is used for the path value, then that
    //acts like mapping the path to an empty file. It allows the optimizer to
    //resolve the dependency to path, but then does not include it in the output.
    //Useful to map module names that are to resources on a CDN or other
    //http: URL when running in the browser and during an optimization that
    //file should be skipped because it has no dependencies.
    paths: {
        'text':        'lib/require/require.text-1.0.2',
        'order':       'lib/require/require.order-1.0.5',
        'core':        'core',
        'utils':       'utils',
        'ui':          'ui',
        'db':          'db',
        'log':         'log',
        'collection':  'collection',
        'entry':       'entry',
        'register':    'register',
        'analytics':   'analytics',
        'jquery':      'lib/jquery/jquery-1.7.1',
        'underscore':  'lib/underscore/underscore-1.3.1',
        'backbone':    'lib/backbone/backbone-0.9.1',
        'jqmr':        'lib/jquerymobile/jquery.mobile.router-0.6',
        'jqm':         'lib/jquerymobile/jquery.mobile-1.1.0-rc.1'
    },

    //How to optimize all the JS files in the build output directory.
    //Right now only the following values
    //are supported:
    //- "uglify": (default) uses UglifyJS to minify the code.
    //- "closure": uses Google's Closure Compiler in simple optimization
    //mode to minify the code. Only available if running the optimizer using
    //Java.
    //- "closure.keepLines": Same as closure option, but keeps line returns
    //in the minified files.
    //- "none": no minification will be done.
    optimize: "uglify",

    //If using UglifyJS for script optimization, these config options can be
    //used to pass configuration values to UglifyJS.
    //See https://github.com/mishoo/UglifyJS for the possible values.
//    uglify: {
//        toplevel: true,
//        ascii_only: true,
//        beautify: true
//    },

    //Allow CSS optimizations. Allowed values:
    //- "standard": @import inlining, comment removal and line returns.
    //Removing line returns may have problems in IE, depending on the type
    //of CSS.
    //- "standard.keepLines": like "standard" but keeps line returns.
    //- "none": skip CSS optimizations.
    optimizeCss: "standard.keepLines",

    //Inlines the text for any text! dependencies, to avoid the separate
   //async XMLHttpRequest calls to load those dependencies.
   inlineText: true,


    //When the optimizer copies files from the source location to the
    //destination directory, it will skip directories and files that start
    //with a ".". If you want to copy .directories or certain .files, for
    //instance if you keep some packages in a .packages directory, or copy
    //over .htaccess files, you can set this to null. If you want to change
    //the exclusion rules, change it to a different regexp. If the regexp
    //matches, it means the directory will be excluded. This used to be
    //called dirExclusionRegExp before the 1.0.2 release.
    //As of 1.0.3, this value can also be a string that is converted to a
    //RegExp via new RegExp().
    fileExclusionRegExp: /^(.*require-1\.0\.5\.js|app\.build\.js|build\.sh|target|etc|webstore|splashes|config\.xml|build\.txt|\.idea|.*\.sh|.*\.min\.css|.*\.min\.js|r\.js|app\.build\.js|.*phonegap.*\.js|.*json.*\.js|.*date.*\.js|.*lawnchair.*\.js|\.idea|\.git|\.gitignore|data|README)$/,

    modules: [
        { name: "app" }
    ]
})


define(['log', 'ui'], function (log, ui) {

    var logger = log.getLogger('analytics');

    logger.info("Loading analytics.js");

    var analytics = { };

    analytics.setupListener = function() {
        $('[data-role=page]').live('pageshow', function (event, ui) {
            if (!OFFLINE) {
                try {
                    window._gaq.push(['_setAccount', 'UA-1889791-17']);

                    var hash = location.hash;

                    if (hash) {
                        var hashToPush = hash.substr(1);
                        logger.info("Pushing page to analytics: '" + hashToPush + "'");
                        window._gaq.push(['_trackPageview', hashToPush]);
                    } else {
                        window._gaq.push(['_trackPageview']);
                    }
                } catch(err) {
                    logger.info("Error catched: " + err.name + " - " + err.message);
                }
            }
        });
    };

//var _gaq = _gaq || [];
//
//$(document).ready(function(e) {
//	(function() {
//	  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//	  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') +
//                 '.google-analytics.com/ga.js';
//	  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
//	})();
//   });
//
//$('[data-role=page]').live('pageshow', function (event, ui) {
//	try {
//		_gaq.push(['_setAccount', 'YOUR_ANALYTICS_ID_GOES_HERE']);
//
//		if ($.mobile.activePage.attr("data-url")) {
//			_gaq.push(['_trackPageview', $.mobile.activePage.attr("data-url")]);
//		} else {
//			_gaq.push(['_trackPageview']);
//		}
//	} catch(err) {}
//
//});

    logger.info("Loaded analytics");

    return analytics;

});


define(['log', 'utils', 'collection', 'entry', 'register', 'ui', 'db', 'synchronize'], function( log, utils, collection, entry, register, ui, db, synchronize ) {
    
    var logger = log.getLogger('core');

    logger.info("Loading core.js");

    var EVENT_ID = '6';

    var TWITTER_USER_XEBIA = "xebiaFr";
    var TWITTER_USER_DEVOXXFR = "devoxxFR";

    var DEFAULT_TWITTER_USER = TWITTER_USER_XEBIA;

    var AUTHORIZED_TWITTER_USER = [TWITTER_USER_XEBIA, TWITTER_USER_DEVOXXFR];

    var core = { };

    var router;

    var favorites = {
        ids: [ ]
    };

    db.get('favorites', function(data) {
        if (data) {
            favorites = data;
        }
    });

    var EVENTS = {
        events: [ {
            id: '6',
            name: 'Devoxx France 2012',
            days: [
                {
                    id: '1',
                    name: 'Mercredi 18 Avril',
                    date: '2012-04-18'
                }, {
                    id: '2',
                    name: 'Jeudi 19 Avril',
                    date: '2012-04-19'
                }, {
                    id: '3',
                    name: 'Vendredi 20 Avril',
                    date: '2012-04-20'
                }
            ]
        } ]
    };

    core.getEvent = function(eventId) {
        return _(EVENTS.events).find(function(event) { return event.id == eventId; });
    };

    core.getDay = function(event, dayId) {
        return _(event.days).find(function(day) { return day.id == dayId; });
    };

    var PAGE_CONTEXTS = {
    };

    core.createPageContext = function(page) {
        PAGE_CONTEXTS[page] = {
            initialized: false
        };
    };

    core.initializePageContextIfNecessary = function (page) {
        if (!PAGE_CONTEXTS[page]) {
            core.createPageContext(page);
        }
    };

    core.getPageContextValue = function(page, key) {
        core.initializePageContextIfNecessary(page);
        return PAGE_CONTEXTS[page][key];
    };

    core.getPageContexts = function() {
        return PAGE_CONTEXTS;
    };

    core.setPageContextValue = function(page, key, value) {
        core.initializePageContextIfNecessary(page);
        PAGE_CONTEXTS[page][key] = value;
    };

    core.clearPageContexts = function() {
        _(core.getPageContexts()).each(function(pageContext) {
             if (pageContext["id"]) {
                 pageContext["id"] = undefined;
             }
            if (pageContext["initialized"]) {
                pageContext["initialized"] = false;
            }
        });
    };

    core.addUrlsForEvent = function(eventId) {
        synchronize.addUrl( '/events/' + eventId + '/schedule', utils.getFullUrl('/events/' + eventId + '/schedule?callback=?') );
        synchronize.addUrl('/events/' + eventId + '/presentations', utils.getFullUrl( '/events/' + eventId + '/presentations?callback=?') );
        synchronize.addUrl('/events/' + eventId + '/schedule/rooms', utils.getFullUrl( '/events/' + eventId + '/schedule/rooms?callback=?') );
        synchronize.addUrl('/events/' + eventId + '/tracks', utils.getFullUrl( '/events/' + eventId + '/tracks?callback=?') );
        synchronize.addUrl('/events/' + eventId + '/speakers', utils.getFullUrl( '/events/' + eventId + '/speakers?callback=?') );
        synchronize.addUrl('/events', utils.getFullUrl( '/events?callback=?') );
    };

    function refreshPageOnIdChange(type, match, ui, page, e, refreshFunction, fallbackFunction) {
        var params = router.getParams(match[1]);
        if (core.getPageContextValue(page.id, "id") !== params.id) {
            core.setPageContextValue(page.id, "initialized", true);
            core.setPageContextValue(page.id, "id", params.id);
            refreshFunction(params.id);
        }
        else if (fallbackFunction) {
            fallbackFunction(type, match, ui, page, e);
        }
    }

    function refreshPageOnChange(type, match, ui, page, e, refreshFunction, fallbackFunction) {
        var params = router.getParams(match[1]);
        if (!core.getPageContextValue(page.id, "initialized")) {
            core.setPageContextValue(page.id, "initialized", true);
            refreshFunction(params);
        }
        else if (fallbackFunction) {
            fallbackFunction(type, match, ui, page, e);
        }
    }

    function refreshPage(type, match, ui, page, e, refreshFunction) {
        var params = router.getParams(match[1]);
        refreshFunction(params);
    }

    core.setupRouter = function() {
        logger.info("Instanciating jqmr router");

        router = new $.mobile.Router({
            "#schedule" : { handler : "onBeforeSchedulePageShow", events: "bs" },
            "#day(?:[?](.*))" : { handler: "onBeforeDayPageShow", events: "bs" },
            "#events" : { handler : "onBeforeEventsPageShow", events: "bs" },
            "#event(?:[?](.*))" : { handler : "onBeforeEventPageShow", events: "bs" },
            "#rooms" : { handler : "onBeforeRoomsPageShow", events: "bs" },
            "#room(?:[?](.*))" : { handler : "onBeforeRoomPageShow", events: "bs" },
            "#presentations" : { handler : "onBeforePresentationsPageShow", events: "bs" },
            "#presentation(?:[?](.*))" : { handler : "onBeforePresentationPageShow", events: "bs" },
            "#speakers" : { handler : "onBeforeSpeakersPageShow", events: "bs" },
            "#speaker(?:[?](.*))" : { handler : "onBeforeSpeakerPageShow", events: "bs" },
            "#tracks" : { handler : "onBeforeTracksPageShow", events: "bs" },
            "#track(?:[?](.*))" : { handler : "onBeforeTrackPageShow", events: "bs" },
            "#register":{ handler:"onBeforeRegisterPageShow", events:"bs" },
            "#synchronize":{ handler:"onBeforeSynchronizePageShow", events:"bs" },
            "#twitter(?:[?](.*))?":{ handler:"onBeforeTwitterPageShow", events:"bs" },
            "#xebia-program-infos": { handler : "onBeforeXebiaProgramInfosPageShow", events: "bs" },
            "#xebia-program-details(?:[?](.*))": { handler : "onBeforeXebiaProgramDetailsPageShow", events: "bs" },
            "#xebian(?:[?](.*))": { handler : "onBeforeXebianPageShow", events: "bs" }
        },
        {
            onBeforeSchedulePageShow: function(type, match, ui, page, e) {
                refreshPageOnChange(type, match, ui, page, e, core.refreshSchedule, core.renderCollectionView);
            },
            onBeforeDayPageShow: function(type, match, ui, page, e) {
                refreshPageOnIdChange(type, match, ui, page, e, core.refreshDay, core.renderCollectionView);
            },
            onBeforeEventsPageShow: function(type, match, ui, page, e) {
                refreshPageOnChange(type, match, ui, page, e, core.refreshEvents);
            },
            onBeforeEventPageShow: function(type, match, ui, page, e) {
                refreshPageOnIdChange(type, match, ui, page, e, core.refreshEvent);
            },
            onBeforeRoomsPageShow: function(type, match, ui, page, e) {
                refreshPageOnChange(type, match, ui, page, e, core.refreshRooms);
            },
            onBeforeRoomPageShow: function(type, match, ui, page, e) {
                refreshPageOnIdChange(type, match, ui, page, e, core.refreshRoom, core.renderCollectionView);
            },
            onBeforeTracksPageShow: function(type, match, ui, page, e) {
                refreshPageOnChange(type, match, ui, page, e, core.refreshTracks);
            },
            onBeforeTrackPageShow: function(type, match, ui, page, e) {
                refreshPageOnIdChange(type, match, ui, page, e, core.refreshTrack, core.renderCollectionView);
            },
            onBeforePresentationsPageShow: function(type, match, ui, page, e) {
                refreshPageOnChange(type, match, ui, page, e, core.refreshPresentations, core.renderCollectionView);
            },
            onBeforePresentationPageShow: function(type, match, ui, page, e) {
                refreshPageOnIdChange(type, match, ui, page, e, core.refreshPresentation, core.renderEntryView);
            },
            onBeforeSpeakersPageShow: function(type, match, ui, page, e) {
                refreshPageOnChange(type, match, ui, page, e, core.refreshSpeakers);
            },
            onBeforeSpeakerPageShow: function(type, match, ui, page, e) {
                refreshPageOnIdChange(type, match, ui, page, e, core.refreshSpeaker);
            },
            onBeforeRegisterPageShow: function(type, match, ui, page, e) {
                refreshPage(type, match, ui, page, e, core.onRegisterBeforePageShow);
            },
            onBeforeSynchronizePageShow: function(type, match, ui, page, e) {
                refreshPageOnChange(type, match, ui, page, e, core.onSynchronizeBeforePageShow);
            },
            onBeforeTwitterPageShow: function(type, match, ui, page, e) {
                refreshPage(type, match, ui, page, e, core.refreshTwitter);
            },
            onBeforeXebiaProgramInfosPageShow: function(type, match, ui, page, e) {
                refreshPageOnChange(type, match, ui, page, e, core.refreshXebiaProgramInfos);
            },
            onBeforeXebiaProgramDetailsPageShow: function(type, match, ui, page, e) {
                refreshPageOnIdChange(type, match, ui, page, e, core.refreshXebiaProgramDetails);
            },
            onBeforeXebianPageShow: function(type, match, ui, page, e) {
                refreshPageOnIdChange(type, match, ui, page, e, core.refreshXebian);
            }
        });

        logger.info("Instanciated jqmr router");
    };

    core.refreshDataList = function(options) {
        logger.info("Loading " + options.title + " View");
        collection.views[options.view] = new collection.EntryListView({
            dataType: options.dataType,
            fetchUrl: options.url,
            el: options.el,
            collectionTemplate: options.template,
            parse: function(data) {
                if (options.cacheKey && !data.statusCode) {
                    db.save(options.cacheKey, data);
                }
                if (options.parse) {
                    data = options.parse(data);
                }

                return data;
            },
            view: options.view,
            postRender: options.postRender
        });

        if (collection.views[options.view].collection.length !== 0) {
            collection.views[options.view].collection.reset([]);
        }

        logger.info("Fetch " + options.title + " Data from url: '" + collection.views[options.view].collection.url + "'");

        var fetchOptions = {
            onFetch: function() {
                $.mobile.showPageLoadingMsg();
                ui.showFlashMessage(options);
            },
            success: function(model, resp) {
                if (options.success) {
                    options.success(model, resp);
                }
                core.onFetchSuccess(model, resp, options);
            } ,
            error: function (originalModel, resp, errOptions) { core.onFetchError(originalModel, resp, errOptions, options) },
            fetchUrl: options.url
        };

        db.getOrFetch(options.cacheKey, function(data) {
            if (options.parse) {
                data = options.parse(data);
            }
            collection.views[options.view].collection.reset(data);
            ui.hideFlashMessage(options);
        }, function() {
            if (fetchOptions.onFetch) {
                fetchOptions.onFetch();
            }
            collection.views[options.view].el.empty();
            collection.views[options.view].collection.fetch(fetchOptions);
        } );
    };

    core.refreshDataEntry = function(options) {
        logger.info("Loading " + options.title + " View");
        entry.views[options.view] = new entry.EntryView({
            dataType: options.dataType,
            fetchUrl: options.url,
            el: options.el,
            entryTemplate: options.template,
            parse: function(data) {
                if (options.cacheKey && !data.statusCode) {
                    db.save(options.cacheKey, data);
                }
                if (options.parse) {
                    data = options.parse(data);
                }

                return data;
            },
            postRender: options.postRender,
            view: options.view
        });

        if (entry.views[options.view].entry) {
            entry.views[options.view].entry.clear();
        }

        logger.info("Fetch " + options.title + " Data from url: '" + entry.views[options.view].entry.url + "'");

        var fetchOptions = {
            onFetch: function() {
                $.mobile.showPageLoadingMsg();
                logger.info("Show " + options.title + " page message!");
                ui.showFlashMessage(options);
            },
            success: function(model, resp) {
                if (options.success) {
                    options.success(model, resp);
                }
                core.onFetchSuccess(model, resp, options);
            } ,
            error: function (originalModel, resp, errOptions) { core.onFetchError(originalModel, resp, errOptions, options) },
            fetchUrl: options.url
        };

        db.getOrFetch(options.cacheKey, function(data) {
            if (options.parse) {
                data = options.parse(data);
            }
            entry.views[options.view].entry.set(data);
            ui.hideFlashMessage(options);
        }, function() {
            if (fetchOptions.onFetch) {
                fetchOptions.onFetch();
            }
            entry.views[options.view].entry.fetch(fetchOptions);
        } );
    };

    core.refreshSchedule = function() {
        ui.resetFlashMessages("#schedule");
        ui.switchTitle('schedule', "Planning");

        core.refreshDataList({
            page: "#schedule", title: "Planning", el: "#schedule-list", view: "schedule", template: $("#schedule-list-tpl").html(),
            url: utils.getFullUrl('/events/' + EVENT_ID + '/schedule?callback=?'),
            cacheKey: '/events/' + EVENT_ID + '/schedule',
            dataType: "session",
            parse: function(sessions) {
                _(sessions).each(core.enhanceSession);

                return sessions;
            },
            postRender: function(sessions) {
                core.initSwipeFavorites("presentation-schedule-item");
            }
        });
    };

    core.refreshDay = function(id) {
        ui.resetFlashMessages("#day");
        logger.info("Processing day: " + id);
        var day = core.getEventDay(id);
        var title = day ? day.name : "Jour " + id;
        ui.switchTitle('day', title);
        core.refreshDataList({
            page: "#day", title: title, el: "#day-list", view: "day", template: $("#schedule-list-tpl").html(),
            url: utils.getFullUrl('/events/' + EVENT_ID + '/schedule?callback=?'),
            cacheKey: '/events/' + EVENT_ID + '/schedule',
            dataType: "session",
            parse: function(sessions) {
                sessions = core.filterSessionsByDay(sessions, day);
                _(sessions).each(core.enhanceSession);

                return sessions;
            },
            postRender: function(sessions) {
                core.initSwipeFavorites("presentation-day-item");
            }
        });
    };

    core.refreshEvents = function() {
        ui.resetFlashMessages("#events");
        logger.info("Refreshing events");
        ui.switchTitle('events', "Evénements");

        core.refreshDataList({
            page: "#events", title: "Event", el: "#event-list", view: "events", template: $("#event-list-tpl").html(),
            url: utils.getFullUrl('/events?callback=?'),
            cacheKey: '/events',
            dataType: "event",
            parse: function(events) { return events; }
        });
    };

    core.refreshEvent = function(id) {
        ui.resetFlashMessages("#event");
        logger.info("Processing event: " + id);
        ui.switchTitle('event', "Evénement");

        core.refreshDataEntry({
            page: "#event", title: "Event", el: "#event-content", view: "event", template: $("#event-tpl").html(),
            url: utils.getFullUrl('/events?callback=?'),
            cacheKey: '/events',
            dataType: "event",
            parse: function(events) {
                return core.findEventById(events, id);
            },
            postRender: function(event) {
                $('#event-details-list').listview();
                ui.switchTitle('event', event.get('name'));
            }
        });
    };

    core.refreshPresentations = function() {
        ui.resetFlashMessages("#presentations");
        logger.info("Refreshing presentations");
        ui.switchTitle('presentations', "Présentations");

        core.refreshDataList({
            page: "#presentations", title: "Presentations", el: "#presentation-list", view: "presentations", template: $("#presentation-list-tpl").html(),
            url: utils.getFullUrl('/events/' + EVENT_ID + '/presentations?callback=?'),
            cacheKey: '/events/' + EVENT_ID + '/presentations',
            dataType: "presentation",
            parse: function(presentations) {
                _(presentations).each(core.enhancePresentationListItem);

                return presentations;
            },
            postRender: function(presentations) {
                core.initSwipeFavorites("presentation-item");
            }
        });
    };

    core.refreshPresentation = function(id) {
        ui.resetFlashMessages("#presentation");
        logger.info("Processing presentation: " + id);
        ui.switchTitle('presentation', "Présentation");
        core.refreshDataEntry({
            page: "#presentation", title: "Présentation", el: "#presentation-content", view: "presentation", template: $("#presentation-tpl").html(),
            url: utils.getFullUrl('/events/' + EVENT_ID + '/presentations?callback=?'),
            cacheKey: '/events/' + EVENT_ID + '/presentations',
            dataType: "presentation",
            parse: function(presentations) {
                var presentation = core.findPresentationById(presentations, id);
                core.enhancePresentation(presentation);

                return presentation;
            },
            postRender: function(presentation) {
                $('#presentation-tag-list').listview();
                $('#presentation-speaker-list').listview();
                $('#presentation-details-list').listview();
                ui.switchTitle('presentation', presentation.get('title'));
            }
        });
    };

    core.refreshSpeakers = function() {
        ui.resetFlashMessages("#tracks");
        logger.info("Refreshing speakers");
        ui.switchTitle('speakers', "Speakers");

        core.refreshDataList({
            page: "#speakers", title: "Speakers", el: "#speaker-list", view: "speakers", template: $("#speaker-list-tpl").html(),
            url: utils.getFullUrl('/events/' + EVENT_ID + '/speakers?callback=?'),
            cacheKey: '/events/' + EVENT_ID + '/speakers',
            dataType: "speaker",
            parse: function(speakers) { return speakers; }
        });
    };

    core.refreshSpeaker = function(id) {
        ui.resetFlashMessages("#speaker");
        logger.info("Processing speaker: " + id);
        ui.switchTitle('speaker', "Speaker");

        core.refreshDataEntry({
            page: "#speaker", title: "Speaker", el: "#speaker-content", view: "speaker", template: $("#speaker-tpl").html(),
            url: utils.getFullUrl('/events/' + EVENT_ID + '/speakers?callback=?'),
            cacheKey: '/events/' + EVENT_ID + '/speakers',
            dataType: "speaker",
            parse: function(speakers) {
                var speaker = core.findSpeakerById(speakers, id);
                core.enhanceSpeaker(speaker);
                return speaker;
            },
            postRender: function(speaker) {
                $('#speaker-details-list').listview();
                $('#speaker-talk-list').listview();
                var title = speaker.get('firstName') ? speaker.get('firstName')  : "";
                title += (speaker.get('firstName') && speaker.get('lastName')) ? " " : "";
                title += speaker.get('lastName') ? speaker.get('lastName') : "";
                if (title) {
                    ui.switchTitle('speaker', title);
                }
            }
        });
    };

    core.refreshTracks = function() {
        ui.resetFlashMessages("#tracks");
        logger.info("Refreshing tracks");
        ui.switchTitle('tracks', "Tracks");

        core.refreshDataList({
            page: "#tracks", title: "Tracks", el: "#track-list", view: "tracks", template: $("#track-list-tpl").html(),
            url: utils.getFullUrl('/events/' + EVENT_ID + '/tracks?callback=?'),
            cacheKey: '/events/' + EVENT_ID + '/tracks',
            dataType: "track",
            parse: function(tracks) { return tracks; }
        });
    };

    core.refreshTrack = function(id) {
        ui.resetFlashMessages("#track");
        logger.info("Refreshing track");
        ui.switchTitle('track', "Track");

        core.refreshDataList({
            page: "#track", title: "Track", el: "#track-presentation-list", view: "track", template: $("#presentation-list-tpl").html(),
            url: utils.getFullUrl('/events/' + EVENT_ID + '/presentations?callback=?'),
            cacheKey: '/events/' + EVENT_ID + '/presentations',
            dataType: "presentation",
            parse: function(presentations) {
                presentations = core.filterPresentationsByTrackId(presentations, id);
                _(presentations).each(core.enhancePresentationListItem);

                return presentations;
            },
            postRender: function(presentations) {
                if (presentations.length > 0) {
                    ui.switchTitle('track', presentations[0].get('track'));
                }
                core.initSwipeFavorites("presentation-item");
            }
        });
    };

    core.refreshRooms = function() {
        ui.resetFlashMessages("#rooms");
        logger.info("Refreshing rooms");
        ui.switchTitle('rooms', "Salles");

        core.refreshDataList({
            page: "#rooms", title: "Rooms", el: "#room-list", view: "rooms", template: $("#room-list-tpl").html(),
            url: utils.getFullUrl('/events/' + EVENT_ID + '/schedule/rooms?callback=?'),
            cacheKey: '/events/' + EVENT_ID + '/schedule/rooms',
            dataType: "room",
            parse: function(rooms) { return rooms; }
        });
    };

    core.refreshRoom = function(id) {
        ui.resetFlashMessages("#room");
        logger.info("Refreshing room");
        ui.switchTitle('room', "Room");

        core.refreshDataList({
            page: "#room", title: "Room", el: "#room-presentation-list", view: "room", template: $("#presentation-list-tpl").html(),
            url: utils.getFullUrl('/events/' + EVENT_ID + '/presentations?callback=?'),
            cacheKey: '/events/' + EVENT_ID + '/presentations',
            dataType: "presentation",
            parse: function(presentations) {
                presentations = core.filterPresentationsByRoomId(presentations, id);
                _(presentations).each(core.enhancePresentationListItem);

                return presentations;
            },
            postRender: function(presentations) {
                if (presentations.length > 0) {
                    ui.switchTitle('room', presentations[0].get('room'));
                }
                core.initSwipeFavorites("presentation-item");
            }
        });
    };

    core.refreshTwitter = function(params) {
        var screenName = !!params ? params.screenname : undefined;
        if (!_(AUTHORIZED_TWITTER_USER).contains(screenName)) {
                screenName = DEFAULT_TWITTER_USER;
        }

        $(screenName === TWITTER_USER_XEBIA ? '#twitter-devoxxfr' : '#twitter-xebiafr').removeClass("ui-btn-active");
        $(screenName === TWITTER_USER_XEBIA ? '#twitter-xebiafr' : '#twitter-devoxxfr').addClass("ui-btn-active");

        console.log("Requested screen name : " + screenName);
        ui.resetFlashMessages("#twitter");
        logger.info("Processing tweets");
        $( '.ui-title' ).html( '<img src="image/twitter-white-transparent.png" class="twitter-header-img" style="height:18px;" />' || "" );

        core.refreshDataList({
            page: "#twitter", title: "Twitter", el: "#twitter-timeline", view: "twitter", template: $("#twitter-timeline-tpl").html(),
            url: utils.getTwitterFullUrl('/twitter/' + screenName + '?callback=?'),
            parse: function(tweets) {
                _(tweets).each(function(tweet) {
                    tweet.formattedDate = core.getTweetFormattedDate(tweet);
                    tweet.user.icon = core.getTwitterUserImage(tweet.user);
                    tweet.htmlText = core.twitter_linkify(tweet.text);
                });
                return tweets;
            }
        });
    };

    core.refreshXebiaProgramInfos = function() {
        ui.resetFlashMessages("#xebia-program-infos");
        logger.info("Refreshing Xebia Program-infos");
        core.refreshDataList({
            page: "#xebia-program-infos", title: "Programme Xebia", el: "#xebia-program-infos-list", view: "xebia-program-infos", template: $("#xebia-program-infos-list-tpl").html(),
            url: "http://devoxx-xebia.cloudfoundry.com/xebia/program?callback=?",
            cacheKey: "/xebia/program",
            parse: function(xebiaProgram) {
                return xebiaProgram;
            }
        });
    };

    core.refreshXebiaProgramDetails = function(id) {
        ui.resetFlashMessages("#xebia-program-details");
        logger.info("Processing Xebia Program Details: " + id);
        ui.switchTitle('xebia-program-details', "Xebia Workshop");

        core.refreshDataEntry({
            page: "#xebia-program-details", title: "Xebia Workshop", el: "#xebia-program-details-content", view: "xebia-program-details", template: $("#xebia-program-details-tpl").html(),
            url: "http://devoxx-xebia.cloudfoundry.com/xebia/program?callback=?",
            cacheKey: "/xebia/program",
            parse: function(xebiaProgram) {
                return core.filterXebiaProgramSessionById(xebiaProgram, id);
            },
            postRender: function(session) {
                $('#xebia-program-details-xebian-list').listview();
                ui.switchTitle('xebia-program-details', session.get('title'));
            }
        });
    };

    core.refreshXebian = function(id) {
        ui.resetFlashMessages("#xebian");
        logger.info("Processing Xebia : " + id);
        ui.switchTitle('xebian', "Xebian");

        core.refreshDataEntry({
            page: "#xebian", title: "Xebian", el: "#xebian-content", view: "xebian", template: $("#xebian-tpl").html(),
            url: "http://devoxx-xebia.cloudfoundry.com/xebian/" + id + "?callback=?",
            cacheKey: "/xebian/" + id,
            parse: function(xebian) {
                return xebian;
            },
            postRender: function(xebian) {
                var details = $('#xebian-details-list');
                if (details) {
                    details.listview();
                }
                $('#xebian-summary-list').listview();
                ui.switchTitle('xebian', xebian.get('firstname') + " " + xebian.get('lastname'));
            }
        });
    };

    core.renderEntryView = function(type, match, ui, page, e) {
        entry.views[page.id].render();
    };

    core.renderCollectionView = function(type, match, ui, page, e) {
        collection.views[page.id].render();
    };

    core.onFetchSuccess = function(model, resp, options) {
        if (model.get('statusCode') == '404') {
            ui.showFlashMessage(_.extend({type: 'error', message: model.get('message')}, options));
        }
        setTimeout(function() {
            $.mobile.hidePageLoadingMsg();
            ui.hideFlashMessage(options);
        }, 0);
    };

    core.onFetchError = function(originalModel, resp, errOptions, options) {
        setTimeout(function() {
            logger.info("Error response tmp: '" + resp + "' for url: '" + options.fetchUrl + "'");
            $.mobile.hidePageLoadingMsg();
            ui.hideFlashMessage(options);
            ui.showFlashMessage(_.extend({type: 'error', message: 'No data found ...'}, options));
        }, 0);
    };

    core.getParams = function(hashparams){
        if (!hashparams) return null;
        var params={}, tmp;
        var tokens=hashparams.slice( hashparams.indexOf('?')+1 ).split("&");
        $.each(tokens,function(k,v){
            tmp=v.split("=");
            if (params[tmp[0]]){
                if (!(params[tmp[0]] instanceof Array)){
                    params[tmp[0]]=[ params[tmp[0]] ];
                }
                params[tmp[0]].push(tmp[1]);
            } else {
                params[tmp[0]]=tmp[1];
            }
        });
        if ($.isEmptyObject(params)) return null;
        return params;
    };

    core.getEventDay = function(id) {
        var event = core.getEvent(EVENT_ID);
        return core.getDay(event, id);
    };

    core.enhanceSession = function(session) {
        if (session.presentationUri) {
            session.presentationId = core.getPresentationIdFromUri(session.presentationUri);
            session.favorite = core.isFavorite(session.presentationId);
        }
        session.startTime = core.getScheduleTime(session.fromTime);
        session.endTime = core.getScheduleTime(session.toTime);
    };

    core.filterSessionsByDay = function(sessions, day) {
        return _(sessions).filter(function (presentation) {
            return day && presentation.fromTime.substr(0, 10) === day.date;
        });
    };

    core.findEventById = function(events, id) {
         return _(events).find(function (event) {
             return event.id == id;
         });
    };

    core.getPresentationIdFromUri = function(presentationUri) {
        return Number(presentationUri.substring(presentationUri.lastIndexOf("/") + 1));
    };

    core.getScheduleTime = function(fromTime) {
        return Date.parseExact(fromTime.substring(0, fromTime.lastIndexOf('.')), 'yyyy-MM-dd HH:mm:ss').toString("HH:mm");
    };

    core.enhancePresentationListItem = function(presentation) {
        core.updateLanguage(presentation);
        core.updateFavorite(presentation);
    };

    core.getSpeakerIdFromUri = function(speakerUri) {
        return speakerUri.substring(speakerUri.lastIndexOf("/") + 1);
    };

    core.enhancePresentation = function(presentation) {
        core.updateLanguage(presentation);
        core.updateFavorite(presentation);
         if (!presentation.enhanced) {
            presentation.summary = core.formatPresentationSummary(presentation);
            presentation.enhanced = true;
         }
        _(presentation.speakers).each(function(speaker) {
            speaker.id = core.getSpeakerIdFromUri(speaker.speakerUri);
        });
    };

    core.findPresentationById = function(presentations, id) {
        return _(presentations).find(function (presentation) {
            return presentation.id == id;
        });
    };

    core.findSpeakerById = function(speakers, id) {
        return _(speakers).find(function (speaker) {
            return speaker.id == id;
        });
    };

    core.enhanceSpeaker = function(speaker) {
        if (!speaker.enhanced) {
            speaker.bio = utils.linkify(speaker.bio);
            speaker.enhanced = true;
        }
        _(speaker.talks).each(function(presentation) {
             presentation.id = core.getPresentationIdFromUri(presentation.presentationUri);
         });
    };


    core.filterXebiaProgramSessionById = function(xebiaProgram, id) {
        var day = _(xebiaProgram).find(function(day) {
           return _(day.sessions).find(function(session) { return session.id == id; });
        });
        return _(day.sessions).find(function(session) { return session.id == id; });
    };


    core.filterPresentationsByTrackId = function(presentations, id) {
        return _(presentations).filter(function (presentation) {
            return presentation.trackId == id;
        });
    };

    core.filterPresentationsByRoomId = function(presentations, id) {
         return _(presentations).filter(function (presentation) {
             return presentation.roomId == id;
         });
     };

    core.updateLanguage = function(presentation) {
        if (presentation.language) {
            presentation.language = presentation.language.toUpperCase();
        }
    };

    core.updateFavorite = function(presentation) {
        presentation.favorite = core.isFavorite(presentation.id);
    };

    core.onRegisterBeforePageShow = function() {
        register.beforePageShow();
    };

    core.onSynchronizeBeforePageShow = function() {
        synchronize.beforePageShow(core.clearPageContexts);
    };

    core.getTweetFormattedDate = function(tweet) {
        return Date.parse(tweet.created_at) ? Date.parse(tweet.created_at).toString("HH:mm") : "--:--";
    };

    core.getTwitterUserImage = function(user) {
        return user.profile_image_url.replace(/_normal(\.[^\.]+)$/, "$1");
    };

    core.twitter_linkify = function(text) {
        text = text.replace(/(https?:\/\/\S+)/gi, function (s) {
            return '<a href="' + s + '" target="_blank">' + s + '</a>';
        });

        text = text.replace(/(^|)@(\w+)/gi, function (s) {
            return '<a href="http://twitter.com/' + s + '" target="_blank">' + s + '</a>';
        });

        text = text.replace(/(^|)#(\w+)/gi, function (s) {
            return '<a href="http://search.twitter.com/search?q=' + s.replace(/#/,'%23') + '" target="_blank">' + s + '</a>';
         });
        return text;
    };

    core.formatPresentationSummary = function(presentation) {
        return utils.linkify(presentation.summary.replace(/\n/g, '<br />'));
    };

    core.saveFavorites = function() {
        logger.info("Favorite ids: " + favorites.ids);
        db.save('favorites', favorites);
    };

    core.removeFavorite = function(presentationId) {
        if ( core.isFavorite(presentationId) ) {
            favorites.ids.splice(favorites.ids.indexOf(presentationId), 1);
            core.saveFavorites();
            core.updatePresentationModelFavoriteValue(false);
            core.updatePresentationFavoriteListItem(presentationId, false);
        }
    };
    
    core.addFavorite = function(presentationId) {
        if ( !core.isFavorite(presentationId) ) {
            favorites.ids.push(presentationId);
            core.saveFavorites(); 
            core.updatePresentationModelFavoriteValue(true);
            core.updatePresentationFavoriteListItem(presentationId, true);
        }
    };

    core.toggleFavorite = function (presentationId) {
        presentationId = Number(presentationId);
        if (!core.isFavorite(presentationId)) {
            core.addFavorite(presentationId);
            return true;
        }
        else {
            core.removeFavorite(presentationId);
            return false;
        }
    };

    core.isFavorite = function (presentationId) {
        return favorites && _(favorites.ids).contains(Number(presentationId));
    };
     
    core.updatePresentationModelFavoriteValue = function(favorite) {
        var view = core.getDetailView("presentation");
        if (view) {
            view.entry.attributes.favorite = favorite;
        }
    };

    core.initSwipeFavorites = function(classId) {
        $('ul li.' + classId).bind('swipeleft', function(e) {
            var presentationItem = $(this);
            var presentationId = Number(presentationItem.attr('data-presentation-id'));
            core.removeFavorite(presentationId);
            presentationItem.removeClass('ui-btn-up-e');
            presentationItem.addClass('ui-btn-up-c');
            presentationItem.attr('data-theme', 'c');
        });

        $('ul li.' + classId).bind('swiperight', function(e) {
            var presentationItem = $(this);
            var presentationId = Number(presentationItem.attr('data-presentation-id'));
            core.addFavorite(presentationId);
            presentationItem.removeClass('ui-btn-up-c');
            presentationItem.addClass('ui-btn-up-e');
            presentationItem.attr('data-theme', 'e');
        });
    };

    core.getDetailView = function(view) {
        return entry.views[view];
    };

    core.onFavoriteStarClick = function(presentationId) {
        core.toggleFavorite(presentationId);
        core.getDetailView("presentation").render();
    };

    core.updatePresentationFavoriteListItem = function(presentationId, favorite) {
        _(collection.views).each(function(view) {
            if ( view.collection.dataType ) {
                if ( view.collection.dataType == 'session' ) {
                    var session = _(view.collection.models).find(function(session) { return session.attributes.presentationId && session.attributes.presentationId == presentationId; });
                    if (session) {
                        session.attributes.favorite = favorite;
                    }
                }
                else if ( view.collection.dataType == 'presentation' ) {
                    var presentation = _(view.collection.models).find(function(presentation) { return session.attributes.id && session.attributes.id == presentationId; });
                    if (presentation) {
                        presentation.attributes.favorite = favorite;
                    }
                }
            }
        });
    };

    logger.info("Loaded core");

    core.addUrlsForEvent(EVENT_ID);

    return core;

});

define(['log', 'db', 'ui'], function( log, db, ui ) {

    var logger = log.getLogger('register');

    logger.info("Loading register.js");

    var REGISTERED = "registered";

    logger.info("Defining register object");

    var register = {};

    logger.info("Loaded register");

    $("#register-form").bind('invalid', function(e){
        ui.showFlashMessage( { page: '#register', message: 'Vous devez renseigner les champs obligatoires pour valider le formulaire!' } );
        $.mobile.silentScroll(0);
    	e.preventDefault();
    });

    register.supportsValidity = function() {
      var i = document.createElement('input');
      return typeof i.validity === 'object';
    };

    register.onSuccess = function(data, status) {
        console.log("Registration submitted");
        ui.resetFlashMessages("#register");
        ui.showFlashMessage( { page: '#register', message: 'Enregistrement soumis avec succès!' } );
        $("#register-form").hide();
        $.mobile.silentScroll(0);
        db.exists(REGISTERED, function(exists) {
            if (!exists) {
                db.save(REGISTERED, 'true');
            }
        });
    };

    register.onError = function(data, status) {
        ui.showFlashMessage( { page: '#register', type: 'error', message: 'Erreur lors de l\'enregistrement, merci de réessayer plus tard !' } );
        console.log("Registration error");
    };

    register.beforePageShow = function() {
        ui.resetFlashMessages("#register");
        db.isEquals(REGISTERED, 'true', register.isAlreadyRegisteredCallback, register.isNotYetRegisteredCallback);
    };

    register.isAlreadyRegisteredCallback = function() {
        ui.showFlashMessage( { page: '#register', type: 'error', message: 'Enregistrement déjà soumis!' } );
        $("#register-submit").unbind('click');
        $("#register-form").hide();
    };

     register.isNotYetRegisteredCallback = function() {
         $("#register-form").show();
         $("#register-submit").bind('click', register.onSubmit);
     };

    register.onSubmit = function() {
        var formData = $("#register-form").serialize();

        if ( !register.supportsValidity() || $("#register-form")[0].checkValidity() ) {
            $.ajax({
                type: "POST",
                url: "http://devoxx-xebia.cloudfoundry.com/register",
                cache: false,
                data: formData,
                crossDomain: true,
                success: register.onSuccess,
                error: register.onError
            });
        }

        return false;
    };

    return register;

});


define(['log'], function( log ) {

    var logger = log.getLogger('ui');

    logger.info("Loading ui.js");

    var ui =  { };

    ui.resetFlashMessages = function(page) {
        var header = $(page).children(":jqmData(role='message')");
        if (header) {
            var flashMessage = header.children("div#flashMessage");
            if (flashMessage) {
                flashMessage.remove();
            }
            var flashErrorMessage = header.children("div#flashErrorMessage");
            if (flashErrorMessage) {
                flashErrorMessage.remove();
            }
         }
    };

    ui.showFlashMessage = function(options) {
        if (options.page) {
            var flashMessage = _.template($('#flash' + (options.type === 'error' ? '-error' : '') + '-message-tpl').html(), { message: options.message ? options.message : "Chargement des données en cours ..." } );
            var currentPageHeader = $(options.page).children(":jqmData(role='message')");
            currentPageHeader.append(flashMessage);
        }
    };

    ui.hideFlashMessage = function(options) {
        if (options.page) {
            var header = $(options.page).children(":jqmData(role='message')");
            var flashMessage = header.children("div#flash" + (options.type === 'error' ? 'Error' : '') + "Message");
            flashMessage.fadeOut();
        }
    };

    ui.updateSplashscreenMessage = function(message) {
        $("#splash-message").text(message);
    };

    // summary:
    //            Adjust the title of the current view
    //
    // title: String
    //            The title to update the view with
    ui.switchTitle = function( page, title ) {
        var header = $('#' + page).children(":jqmData(role='header')");
        if (header) {
            header.children( 'h1' ).text( title || "" );
        }
    };

    logger.info("Loaded ui");


    return ui;
});


define(['log', 'ui'], function( log, ui ) {

    var logger = log.getLogger('db');

    logger.info("Loading db.js");

    var db = {
        cache: { }
    };

    var DB_NAME = "xebia";

    logger.info("Creating Lawnchair object");

    var lawnchair = new Lawnchair({name: DB_NAME}, function(database) {
        logger.info("Storage open for db: '" + database.name + "' with '" + database.adapter + "' adapter.");

        var self = this;
        self.keys({}, function(keys) {
            _(keys).each(function(key) {
                if (key.indexOf("/xebian/") >= 0 || key.indexOf("/xebia/") >= 0) {
                    self.remove(key, function() {
                        logger.info("Destroyed following key in db: '" + key + "'");
                    });
                }
            });
        });

    });

    logger.info("Created Lawnchair object");

    db.exists = function(key, callback) {
        if (db.cache[key]) {
            setTimeout(function() {
                callback(true);
            }, 0);
        }
        lawnchair.get(key, function(exists) {
            callback(exists);
        });
    };

    db.getName = function() {
        return DB_NAME;
    };

    db.remove = function(key, callback) {
        db.cache[key] = undefined;
        lawnchair.remove(key, function() {
            callback();
        });
    };

    db.save = function(key, value) {
        db.cache[key] = value;
        lawnchair.save({key: key, value: value});
    };

    db.get = function(key, callback) {
        if (db.cache[key]) {
            setTimeout(function() {
                callback(db.cache[key]);
            }, 0);
        } else {
            lawnchair.get(key, function(data) {
                callback(data ? data.value : undefined);
            });
        }
    };

    db.isEquals = function(key, expectedValue, trueCallBack, falseCallback) {
        if (db.cache[key]) {
            setTimeout(function() {
                trueCallBack();
            }, 0);
        }
        else {
            lawnchair.get(key, function(actualValue) {
                (actualValue && (actualValue.value === expectedValue)) ? trueCallBack() : falseCallback();
            });
        }
    };

    db.getOrFetch = function(key, getCallBack, fetchCallback) {
        if (db.cache[key]) {
            setTimeout(function() {
                getCallBack(db.cache[key]);
            }, 0);
        }
        else {
            lawnchair.get(key, function(data) {
                data ? getCallBack(data.value) : fetchCallback();
            });
        }
    };

    logger.info("Loaded db");

    return db;

});



define([], function( ) {

    console.log("[log] Loading log.js");

    var INFO = "INFO";

    var log = { };

    var logContent = new Array();

    log.getLogContent = function() {
        return logContent;
    };

    log.getLogger = function(module) {
        return {
            info: function(content) {
                var date = new Date().toString("HH:mm:ss");
                var log = "[" + date + "][" + INFO + "][" + module + "] " + content;

                if( console && console.log ) {
                    console.log(log);
                }
                if (logContent.length > 1000) {
                    logContent.shift();
                }

                logContent.push(log);
            }
        };
    };

    if( console && console.log ) {
        console.log("[log] Loaded log.js");
    }

    return log;

});






define(['log', 'ui'], function( log, ui ) {

    var logger = log.getLogger('entry');

    logger.info("Loading entry.js");

    logger.info("Defining entry object");
    var entry = {
        views: {}
    };

    logger.info("Defining Model");
    entry.EntryModel = Backbone.Model.extend({
        initialize: function(options) {
            logger.info("Initializing Entry");
            this.dataType = options.dataType;
            this.url = options.url;
            this.parse = function(data) {
                return options.parse ? options.parse(data) : data;
            };
        }
    });

    logger.info("Defining view");
    entry.EntryView = Backbone.View.extend({
        initialize: function() {
            logger.info("Initializing Entry View");
            this.dataType = this.options.dataType;
            this.el = $(this.options.el);
            this.entry = new entry.EntryModel({
                url: this.options.fetchUrl,
                parse: this.options.parse
            });
            this.entry.bind('change', this.render, this);
        },

        render: function() {
            logger.info("Rendering Entry View");
            var el = $(this.options.el);
            el.empty();
            var content = _.template( this.options.entryTemplate, { entry: this.entry, view: this.options.view } );
            el.html(content);
            if (this.options.postRender) {
                this.options.postRender(this.entry);
            }

            return this;
        }

    });
    
    logger.info("Loaded entry");

    return entry;

});


define( ['log', 'ui'], function( log, ui ) {

    var logger = log.getLogger('utils');
    
    logger.info("Loading utils.js");

    var utils = { };

    var JSON_API_BASE_URL = OFFLINE ? 'http://localhost:9000/rest/v1' :
                            PROXY ? 'http://devoxx-xebia.cloudfoundry.com/rest/v1' : 'https://cfp.devoxx.com/rest/v1';

    var TWITTER_API_BASE_URL = "http://devoxx-xebia.cloudfoundry.com";

    var SPEAKER_IMG_BASE_URL = OFFLINE ? 'http://localhost:9000' : 'http://devoxx-xebia.cloudfoundry.com';


    utils.getJsonApiBaseUrl = function() {
        return JSON_API_BASE_URL;
    };

    utils.getSpeakerImgBaseUrl = function() {
        return SPEAKER_IMG_BASE_URL;
    };

    utils.saveDataToDb = function(dbKey, data) {
        var start = new Date();
        logger.info("Saving Json " + dbKey + " content: " + utils.showInterval(start));
        utils.db.save({ key: dbKey, value: data });
        logger.info("Saved Json " + dbKey + " content: " + utils.showInterval(start));
    };

    utils.loadFromUrl = function(dbKey, url, onSuccess) {
        var start = new Date();
        logger.info("Start loading " + dbKey + " content: " + utils.showInterval(start) );
        $.when($.ajax(url, { dataType: "json" })).then(function(data) {
            logger.info("Loaded Json " + dbKey + " content: " + utils.showInterval(start));
            onSuccess(data);
        });
    };

    utils.linkify = function(inputText) {
        //URLs starting with http://, https://, or ftp://
        var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        var replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

        //URLs starting with www. (without // before it, or it'd re-link the ones done above)
        var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

        //Change email addresses to mailto:: links
        var replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
        replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

        return replacedText;
    };

    utils.decodeHtmlEntities = function(encodedContent) {
        return $("<div/>").html(encodedContent).text();
    };

    utils.stripTags = function(content) {

        var result = content.replace(/(<([^>]+)>)/ig,"").replace(/\r\n/g, '<br>').replace(/\r/g, '<br>').replace(/\n/g, '<br>');

        return utils.linkify(result);
    };

    utils.getParameterByName = function( name ) {
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regex = new RegExp( "[\\?&]" + name + "=([^&#]*)" );
        var results = regex.exec( window.location.href );
        if( results == null ) {
            return "";
        }
        else {
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    };

    utils.showInterval = function(start) {
        var duration = new Date(new Date() - start + start.getTimezoneOffset() * 60000);
        var formattedDuration = duration.toString("HH:mm:ss");
        return formattedDuration + "." + duration.getMilliseconds();
    };

    utils.getFullUrl = function(relativeUrl) {
        return JSON_API_BASE_URL + relativeUrl;
    };

    utils.getTwitterFullUrl = function(relativeUrl) {
        return TWITTER_API_BASE_URL + relativeUrl;
    };

    logger.info("Loaded utils");

    return utils;

});






var DEFAULT_DEBUG_MODE = false;
var DEBUG = DEFAULT_DEBUG_MODE || getLocationParameterByName('debug') === 'true';
var SAFE = true;
var OFFLINE = false;
var PROXY = true;
var DB_NUKE = false;

var WAIT_TIME = DEBUG ? 0 : 0;
var DEBUG_JSON_CALLBACK = "onJsonLoad";

console.log("DEBUG: " + DEBUG);
console.log("SAFE: " + SAFE);
console.log("OFFLINE: " + OFFLINE);
console.log("WAIT_TIME: " + WAIT_TIME);
console.log("DEBUG_JSON_CALLBACK: " + DEBUG_JSON_CALLBACK);
console.log("PROXY: " + PROXY);

if (DEBUG) {
    console.log("Waiting for " + WAIT_TIME + "ms before loading application");
}

if (!SAFE) {
    $("#logo").hide();
    $("#home-footer").hide();
    $("#version").hide();
    $("#home").css("background-image", "url(images/none.png)");
    document.title = "Dev/Debug mode";
}

function init() {
    console.log("[app][init] Initializing require");

    console.log("[app][init][require] Setting config");

    require.config({
        paths: {
            'text':        'lib/require/require.text-1.0.2',
            'order':       'lib/require/require.order-1.0.5',
            'core':        'core',
            'utils':       'utils',
            'ui':          'ui',
            'db':          'db',
            'log':         'log',
            'collection':  'collection',
            'entry':       'entry',
            'register':    'register',
            'analytics':   'analytics',
            'synchronize': 'synchronize',
            'jquery':      'lib/jquery/jquery-1.7.1',
            'underscore':  'lib/underscore/underscore-1.3.1',
            'backbone':    'lib/backbone/backbone-0.9.1',
            'jqmr':        'lib/jquerymobile/jquery.mobile.router-0.6',
            'jqm':         'lib/jquerymobile/jquery.mobile-1.1.0-rc.1'
        },
        baseUrl: 'javascript'
    });

    console.log("[app][require] Requiring base application modules");

    require (['require', 'order!jquery', 'order!underscore', 'order!backbone'], function(require, $, _, Backbone) {

        window.$ = $;
        window._ = _;
        window.Backbone = Backbone;
        window.app = window.app || {};

        require(['require', 'order!log', 'order!analytics', 'order!jqmr', 'order!core', 'db', 'utils', 'ui', 'collection', 'entry', 'register' ],
            function( require, log, analytics, jqmr, core, db, utils, ui ) {

            window.app.core = core;
            window.app.ui = ui;
            window.app.utils = utils;

            var logger = log.getLogger("app");

            logger.info("Loading app.js");

            $.mobile = $.mobile || {};

            logger.info("Setup of 'deviceready' event");
            document.addEventListener("deviceready", function() {
                logger.info("[event][deviceready]");
            }, true);

            logger.info("Setup of 'mobileinit' event");

            $(document).bind("mobileinit", function() {

                logger.info("[mobileinit] Event handled");

                $.event.special.swipe.horizontalDistanceThreshold = 130;

                $.mobile.defaultPageTransition = 'none';

                $.mobile.jqmRouter = $.mobile.jqmRouter || {};
                $.mobile.page.prototype.options.backBtnText = "&nbsp;";
                $.mobile.jqmRouter.fixFirstPageDataUrl = true;
                $.mobile.jqmRouter.firstPageDataUrl = "index.html";

				$.mobile.touchOverflowEnabled = true;

                // Support cross domain request in PhoneGap
                $.support.cors = true;
                $.mobile.allowCrossDomainPages = true;


                core.setupRouter();

                logger.info("Show body");
                if (SAFE) {
                    $('#splash-screen').hide();
                    $('body').show();
                    $('#pages').show();
                }

                analytics.setupListener();
            });

            logger.info("Loading jqmr, jqm, phonegap and core");

            require(['require', 'order!jqm'], function(require, jqm) {
                logger.info("Loading ...");
            });
        });

    }) ;

}

function getLocationParameterByName( name ) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regex = new RegExp( "[\\?&]" + name + "=([^&#]*)" );
    var results = regex.exec( window.location.href );
    if( results == null ) {
        return "";
    }
    else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}

setTimeout(init, WAIT_TIME);

// ref: http://diveintohtml5.org/detect.html
function supports_input_placeholder() {
  var i = document.createElement('input');
  return 'placeholder' in i;
}

if(!supports_input_placeholder()) {
  var fields = document.getElementsByTagName('INPUT');
  for(var i=0; i < fields.length; i++) {
    if(fields[i].hasAttribute('placeholder')) {
      fields[i].defaultValue = fields[i].getAttribute('placeholder');
      fields[i].onfocus = function() { if(this.value == this.defaultValue) this.value = ''; }
      fields[i].onblur = function() { if(this.value == '') this.value = this.defaultValue; }
    }
  }
}


define( ['log', 'db', 'ui'], function( log, db, ui ) {

    var logger = log.getLogger('synchronize');

    logger.info("Loading synchronize.js");

    logger.info("Defining synchronize object");

    var synchronize = {
        urls: []
    };

    logger.info("Loaded synchronize");

    var shouldCancel = false;

    synchronize.addUrl = function(cacheKey, url) {
        synchronize.urls.push( {
            cacheKey: cacheKey,
            url: url
        } );
    };

    synchronize.beforePageShow = function(synchronizeCallback) {
        ui.resetFlashMessages("#synchronize");
        synchronize.registerBindings(synchronizeCallback);
    };

    synchronize.registerBindings = function(synchronizeCallback) {
        $("#synchronize-home-submit").bind('click', function(e) {
            if (synchronizeCallback) {
                synchronizeCallback();
            }
            synchronize.onSubmit(e);
        });
        $("#synchronize-running-submit").bind('click', synchronize.onCancel);
    };

    synchronize.onSubmit = function(e) {
        try {
            synchronize.startSynchronization();
        } catch(e) {
            console.info("Error catched: " + e);
        }

        e.preventDefault();
        return false;
    };

    synchronize.onCancel = function(e) {
        try {
            synchronize.askCancel();
        } catch(e) {
            console.info("Error catched: " + e);
        }

        e.preventDefault();
        return false;
    };

    synchronize.askCancel = function(e) {
        shouldCancel = true;
    };

    synchronize.startSynchronization = function() {
        synchronize.shouldCancel = false;
        $("#synchronize-home").hide();
        $("#synchronize-running").show();
        var urls = $.extend([], synchronize.urls);
        synchronize.synchronize(urls);
    };

    synchronize.synchronize = function(urls) {
        if (_(urls).isEmpty() || shouldCancel) {
            synchronize.onSuccess({});
            return ;
        }
        var entry = _(urls).head();
        $.ajax({
          url: entry.url,
          dataType: "jsonp",
          cache: false
        })
            .success(function(data, textStatus, jqXHR) {
                logger.info("Fetch succeded for url: " + entry.url);
                db.save(entry.cacheKey, data);
                var remainingUrls = _(urls).tail();
                synchronize.synchronize(remainingUrls);
            })
            .error(function(jqXHR, textStatus, errorThrown) {
                logger.info("Fetch failed for url: " + entry.url);
                synchronize.onError({
                    error: {
                        'textStatus': textStatus,
                        'errorThrown': errorThrown
                    }
                });
            })

    };


    synchronize.onSuccess = function(options) {
        synchronize.finalizeSynchronization(options);
        ui.resetFlashMessages("#synchronize");
        logger.info("Synchronization ended with success");
    };

    synchronize.onError = function(options) {
        logger.info("Synchronization ended with error");
        synchronize.finalizeSynchronization(options);
        ui.showFlashMessage( { page: '#synchronize', type: 'error', message: 'Erreur lors de la synchronisation !' } );
    };

    synchronize.finalizeSynchronization = function(options) {
        logger.info("Finalizing synchronization ...");
        $("#synchronize-running").hide();
        $("#synchronize-home").show();
        $.mobile.silentScroll(0);
    };

    return synchronize;

});


define(['log', 'ui'], function( log, ui ) {

    var logger = log.getLogger('collection');

    logger.info("Loading collection.js");

    logger.info("Defining collection object");
    var collection = {
        views: {}
    };

    logger.info("Defining Model");
    collection.EntryModel = Backbone.Model.extend({});

    logger.info("Defining collection");
    collection.EntryCollection = Backbone.Collection.extend({
        model: collection.EntryModel,
        initialize: function(models, options) {
            logger.info("Initializing Entry Collection");
            this.dataType = options.dataType;
            this.url = options.url;
            this.parse = function(data) {
                return options.parse ? options.parse(data) : data;
            };
        }
    });

    logger.info("Defining view");
    collection.EntryListView = Backbone.View.extend({
        initialize: function() {
            logger.info("Initializing Entry List View");
            this.el = $(this.options.el);
            this.collection = new collection.EntryCollection([], {
                dataType: this.options.dataType,
                url: this.options.fetchUrl,
                parse: this.options.parse
            });
            this.collection.bind('reset', this.render, this);
        },

        render: function() {
            logger.info("Rendering List View");
            var el = $(this.options.el);
            var content = _.template( this.options.collectionTemplate, { entries: this.collection.models, view: this.options.view } );
            el.html(content);
            el.listview("refresh");

            if (this.options.postRender) {
                this.options.postRender(this.collection.models);
            }

            return this;
        }

    });
    
    logger.info("Loaded collection");

    return collection;

});




        function setOnLine() {
            $("#connection").addClass('online');
            $("#connection").removeClass('offline');
            $("#connection-state").text("Online");
        }
        function setOffLine() {
            $("#connection").addClass('offline');
            $("#connection").removeClass('online');
            $("#connection-state").text("Offline");
        }

        if (navigator.onLine) {
            setOnLine();
        } else {
            setOffLine();
        }

        window.addEventListener("offline", function(e) {
            setOffLine();
        }, false);

        window.addEventListener("online", function(e) {
            setOnLine();
        }, false);
     
