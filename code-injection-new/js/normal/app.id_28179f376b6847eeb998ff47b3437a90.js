

// NOTE object below must be a valid JSON
window.Application = $.extend(true, window.Application, {
    "config": {
        "endpoints": {
            "db": {
                "local": "",
                "production": ""
            }
        },
        "services": {
            "db": {
                "entities": {
                }
            }
        }
    }
});

$(function() {
    
    var device = DevExpress.devices.current(),
        defaultLayout = Application.config.defaultLayout,
        startupView = "login";

    //Store a flag so we kow if the "user/application" is not logged in as the app is starting up.  We need this flag so we can handle incoming PushWoosh notifications.
    saveLocalObject("UserLoggedIn", false);

    /* FOR Android 
    var userdata = {
        'Kind': 'RequestResult',
        'Keys': [1,4844096]
    };
    saveLocalObject("PushWooshNotification", { 'title': 'The Title', 'u': userdata });
    */

    /* FOR Android 
    var userdata = {
            'Kind': 'AddInfo',
            'Keys': [1,4844096,1,1,52]
    };
    saveLocalObject("PushWooshNotification", { 'title': 'The Title', 'u': userdata });
    */

    /* FOR iOS 
    var userdata = {
        'Kind': 'RequestResult',
        'Keys': [1,4844096]
    };

    saveLocalObject("PushWooshNotification", { 'p': '46', 'u': userdata, 'onStart': 'true', 'aps': {'sound':'default', 'alert':'The Title'} });
    */

    /* FOR iOS 
    var userdata = {
        'Kind': 'AddInfo',
        'Keys': [1, 4844096, 1, 1, 52]
    };

    saveLocalObject("PushWooshNotification", { 'p': '46', 'u': userdata, 'onStart': 'true', 'aps': {'sound':'default', 'alert':'The Title'} });
    */

    //Hook into the "Device Ready" event
    document.addEventListener("deviceready", onDeviceReady, false);

    //Fires when the "Device Ready" is called
    function onDeviceReady() {
        //Hook into the back button (only for Win8 Phones so that app doesn't close when back button pressed)
        if (device.platform === "win8" && device.phone) {
            document.addEventListener("backbutton", onBackKeyDown, false);
        };
 
        //PushWoosh initialization (ANDROID and IOS only)
        if ((device.platform === "android") || (device.platform === "ios")) {
            //Setup the PushWoosh notifications
            var pushNotification = window.plugins.pushNotification;
            pushNotification.onDeviceReady();

            //Hook into PushWoosh notification so we can handle the message that was received
            document.addEventListener('push-notification', function (event) { pushwooshNotificationReceived(event) });
        };

        //Setup the default values
        setOrientation();
        setPopupWidth();
        setViewableDimensions();

        //DON'T KNOW IF I NEED THIS (HOPEFULLY DOESN'T BREAK MESSAGEING, SO PUT BAKC IF IT DOESN'T WORK)
        app.receivedEvent('deviceready');
    }

    //Occurs when the device "Back" button is pressed and hooked into (see onDeviceReady())
    function onBackKeyDown() {
        if (Application.app.canBack()) {
            Application.app.back();
        }
        else {
            throw new Error("exit");
        }
    };
    
    //Create the application instance
    Application.app = new DevExpress.framework.html.HtmlApplication({
        namespace: Application,
        defaultLayout: defaultLayout,
        navigation: Application.config.navigation,
        disableViewCache: false
    });

    //Occurs when the window (not view) is unloaded
    $(window).unload(function() {
        Application.app.saveState();
    });

    //Occurs when the window is resized.
    $(window).bind('resize', function (e) {
        onResize(e);
    });

    //Enable cross domain calls for AJAX
    $.support.cors = true;

    //Polyfill to remove click delays on browsers with touch UIs (https://github.com/ftlabs/fastclick)
    FastClick.attach(document.body);

    //Set the initial visibility of the "DEBUG" menu items
    var debuggingEnabled = loadLocalObjectWithDefault("debuggingEnabled", false);
    setDebugModeVisibility(debuggingEnabled);

    //Setup the routing
    Application.app.router.register(":view/:id", { view: startupView, id: undefined });
    Application.app.navigate();
});


































// NOTE object below must be a valid JSON
window.Application = $.extend(true, window.Application, {
    "config": {
        "defaultLayout": "slideout",
        "navigation": [
            {
                "title": "Home",
                "visible" : false,
                "items": [
                    {
                        "title": "Home",
                        "action": function () { Application.app.navigate("home", { root: true }); },
                        "icon": "hometile",
                        "visible" : true
                    }
                ]
            },
            {
                "title": "Actions",
                "visible": true,
                "items" : [
                  {
                      "title": "Requests",
                      "action": function () { Application.app.navigate("requestlist", { root: true }); },
                      "icon": "card",
                      "visible" : true
                  },
                  {
                      "title": "Requests (Advanced Search)",
                      "action": function () { Application.app.navigate("searchrequests", { root: true }); },
                      "icon": "find",
                      "visible": true
                  },
                  {
                      "title": "Additional Info",
                      "action": function () { Application.app.navigate("addinfolist", { root: true }); },
                      "icon": "info",
                      "visible": true
                  },
                  {
                      "title": "Messages",
                      "action": function () { Application.app.navigate("messages", { root: true }); },
                      "icon": "email",
                      "visible": true
                  }
                ]
            },
            {
                "title": "Settings",
                "visible": true,
                "items": [
                      {
                          "title": "Application Settings",
                          "action": function () { Application.app.navigate("settings", { root: true }); },
                          "icon": "preferences",
                          "visible": true
                      },
                      {
                          "title": "About",
                          "action": function () { Application.app.navigate("about", { root: true }); },
                          "icon": "help",
                          "visible": true
                      },
                      {
                          "title": "Logout",
                          "action": function () {
                              removeLocalObject("token");                 //Clear the token
                              saveLocalObject("UserLoggedIn", false);     //Set the logged in flag (so the app knows how to handle notifications)
                              Application.app.navigate("login", { root: true });
                          },
                          "icon": "key",
                          "visible": true
                      }
                ]
                      
            },
            {
                "title": "Developer",
                "visible": ko.observable(false),
                "items": [
                    {
                        "title": "PushWoosh",
                        "action": function () { Application.app.navigate("pushwoosh", { root: true }); },
                        "icon": "comment",
                        "visible": ko.observable(false)
                    },
                    {
                        "title": "Diagnostics",
                        "action": function () { Application.app.navigate("scratch", { root: true }); },
                        "icon": "toolbox",
                        "visible": ko.observable(false)
                    }
                ]
            }
        ]
    }

});

/// <reference path="../js/jquery-1.9.1.min.js"; />
/// <reference path="../js/knockout-2.2.1.js"; />
/// <reference path="../js/dx.all.js"; />

(function() {
    var endpointSelector = new DevExpress.EndpointSelector(Application.config.endpoints);

    var serviceConfig = $.extend(true, {}, Application.config.services, {
        db: {
            url: endpointSelector.urlFor("db"),
            // To enable JSONP support, uncomment the following line
            //jsonp: !window.WinJS,
            errorHandler: handleServiceError
        }
    });

    function handleServiceError(error) {
        if(window.WinJS) {
            try {
                new Windows.UI.Popups.MessageDialog(error.message).showAsync();
            } catch(e) {
                // Another dialog is shown
            }
        } else {
            alert(error.message);
        }
    }

    // Enable partial CORS support for IE < 10    
    $.support.cors = true;
    
    Application.db = new DevExpress.data.ODataContext(serviceConfig.db);

}());


﻿

(function ($, DX, undefined) {

    var translator = DX.translator,
        fx = DX.fx,
        VIEW_OFFSET = 40,
        NAVIGATION_MAX_WIDTH = 300,
        NAVIGATION_TOGGLE_DURATION = 280;

    DX.framework.html.SlideOutController = DX.framework.html.DefaultLayoutController.inherit({

        init: function (options) {
            this.callBase(options);
            this._navigatingHandler = $.proxy(this._onNavigating, this);
        },

        activate: function () {
            this.callBase.apply(this, arguments);
            this._navigationManager.navigating.add(this._navigatingHandler);
        },

        deactivate: function () {
            this.callBase.apply(this, arguments);
            this._navigationManager.navigating.remove(this._navigatingHandler);
        },

        _onNavigating: function (args) {
            var self = this;
            if (this._isNavigationVisible) {
                args.navigateWhen.push(this._toggleNavigation(this.$viewPort.children()).done(function () {
                    self._disableTransitions = true;
                }));
            }
        },

        _isPlaceholderEmpty: function (viewInfo) {
            var $markup = viewInfo.renderResult.$markup;
            var toolbar = $markup.find(".layout-toolbar").data("dxToolbar");
            var items = toolbar.option("items");
            var backCommands = $.grep(items, function (item) {
                //TODO behavior is deprecated
                return item.behavior === "back" || item.id === "back";
            });
            return !backCommands.length;
        },

        _showViewImpl: function (viewInfo, direction) {
            var self = this;
            var promise = self.callBase(viewInfo, direction);
            promise.done(function () {
                self._disableTransitions = false;
            });
            return promise;
        },

        _onRenderComplete: function (viewInfo) {
            var self = this;

            self._initNavigation(viewInfo.renderResult.$markup);

            //Always show MENU on android and win8 (if BACK is showing or not)
            if ((DevExpress.devices.current().android) || (DevExpress.devices.current().win8)) {

                self._initNavigationButton(viewInfo.renderResult.$markup);
            }
                //Hide MENU is BACK showing on others
            else {
                if (self._isPlaceholderEmpty(viewInfo)) {
                    self._initNavigationButton(viewInfo.renderResult.$markup);
                }
            }

            var $toolbarBottom = viewInfo.renderResult.$markup.find(".layout-toolbar-bottom"),
                toolbarBottom = $toolbarBottom.data("dxToolbar");

            if (toolbarBottom && toolbarBottom.option("items").length) {
                viewInfo.renderResult.$markup.find(".layout-content").addClass("has-toolbar-bottom");
            }

            //If there is a page dxDropDownMenu
            if ((viewInfo.renderResult.$markup.find(".layout-toolbar").find(".dx-dropdownmenu").data("dxDropDownMenu")) && (viewInfo.model.pageMenuItemRender)) {
                viewInfo.renderResult.$markup.find(".layout-toolbar").find(".dx-dropdownmenu").data("dxDropDownMenu").option("itemRender", viewInfo.model.pageMenuItemRender);
                //viewInfo.renderResult.$markup.find(".layout-toolbar").find(".dx-dropdownmenu").data("dxDropDownMenu")._render();
                //this.myDropDownMenu = viewInfo.renderResult.$markup.find(".layout-toolbar").find(".dx-dropdownmenu").data("dxDropDownMenu");
                //this.myDropDownMenu.option("itemRender", viewInfo.model.pageMenuItemRender);
            }

            //Q500291
            var $layoutFrame = this._getLayoutFrame(viewInfo.renderResult.$markup);
            $layoutFrame.click(function (e) {
                e.stopPropagation();
            });

            this.callBase(viewInfo);
        },

        _initNavigationButton: function ($markup) {
            var self = this,
                $toolbar = $markup.find(".layout-toolbar"),
                toolbar = $toolbar.data("dxToolbar");

            var showNavButton = function ($markup, $navButtonItem) {
                $navButtonItem = $navButtonItem || $toolbar.find(".nav-button-item");
                $navButtonItem.show();
                $navButtonItem.find(".nav-button")
                    .data("dxButton")
                    .option("clickAction", $.proxy(self._toggleNavigation, self, $markup));
            };

            showNavButton($markup);

            toolbar.option("itemRenderedAction", function (e) {
                var data = e.itemData,
                    $element = e.itemElement;

                if (data.template === "nav-button") {
                    $.proxy(showNavButton, self, $element);
                }
            });
        },


        _initNavigation: function ($markup) {
            this._isNavigationVisible = false;
            //this._initSwipeable($markup);
            this._getNavigation($markup).width(this._getNavigationWidth());
            this._initToolbar($markup);
        },

        _initToolbar: function ($markup) {
            var $layoutFooter = $markup.find(".layout-toolbar-bottom.win8");
            if (!$layoutFooter.data("__inited")) {
                $layoutFooter.data("__inited", true);
                $layoutFooter.click(function () {
                    if ($layoutFooter.get(0) === event.srcElement) {
                        $(this).toggleClass("semi-hidden");
                    }
                });
            }
        },

        _initSwipeable: function ($markup) {
            var self = this;
            var $layoutFrame = this._getLayoutFrame($markup);

            if (!$layoutFrame.data("dxSwipeable")) {
                var navigationWidth = self._getNavigationWidth();

                $layoutFrame.dxSwipeable({
                    elastic: false,
                    startAction: function (e) {
                        e.maxLeftOffset = self._isNavigationVisible ? 1 : 0;
                        e.maxRightOffset = self._isNavigationVisible ? 0 : 1;

                    },
                    updateAction: function (e) {
                        translator.move($layoutFrame, { left: (e.offset + self._isNavigationVisible) * navigationWidth });
                    },
                    endAction: function (e) {
                        fx.animate($layoutFrame, {
                            type: "slide",
                            to: { left: (e.targetOffset + self._isNavigationVisible) * navigationWidth },
                            complete: function () {
                                self._isNavigationVisible = e.targetOffset > 0;
                            }
                        });
                    }
                });
            }
        },

        _getNavigation: function ($markup) {
            return $markup.find(".navigation-list");
        },

        _getLayoutFrame: function ($markup) {
            return $markup.find(".layout-frame");
        },

        _getNavigationWidth: function () {
            var width = this.$viewPort.width() - VIEW_OFFSET;
            return width > NAVIGATION_MAX_WIDTH
                ? NAVIGATION_MAX_WIDTH
                : width;
        },

        _toggleNavigation: function ($markup) {
            var $layoutFrame = this._getLayoutFrame($markup);

            var promise = DX.fx.animate($layoutFrame, {
                type: "slide",
                to: { left: this._isNavigationVisible ? 0 : this._getNavigationWidth() },
                duration: NAVIGATION_TOGGLE_DURATION
            });
            this._isNavigationVisible = !this._isNavigationVisible;

            return promise;
        }

    });

    DX.framework.html.layoutControllers.slideout = new DX.framework.html.SlideOutController();

})(jQuery, DevExpress);




﻿(function($, DX, undefined) {

    DX.framework.html.EmptyLayoutController = DX.framework.html.DefaultLayoutController.inherit({
      
    });

    DX.framework.html.layoutControllers.empty = new DX.framework.html.EmptyLayoutController();
    
})(jQuery, DevExpress);

﻿//Get the application version
getApplicationVersion = function () {
    return '1.0.0';     //MUST BE UPDATED ON EVERY RELEASE
};

//Get the webservice URL
getWebServiceURL = function () {
    var environment = loadLocalObject('loginEnvionment');

    if (environment == 'MIELIVE')
        return "https://www.mie.co.za/secure/services/pcvmobile/pcvservice01/rest/";
    else if (environment == 'MIETEST')
        return "https://www.mie2.co.za/services/pcvmobile/pcvservice01/rest/";
    else if (environment == 'MIEDEV')
        return "https://www.mie2.co.za/services/pcvmobiledev/pcvservice01/rest/";
    else if (environment == 'MIELOCAL')
        return "http://localhost:58527/pcvservice01/rest/";
};

//Gets the environment that was saved while last explicitly logging in
getEnvironment = function () {
    var environment = loadLocalObject('loginEnvionment');
    return environment;
};

//Knockout - Setup the conversion and formatting for dates in Knockout
ko.bindingHandlers.dateTimeText = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor(),
            allBindings = allBindingsAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        var pattern = allBindings.datePattern || 'YYYY-MM-DD hh:mm a';
        if (valueUnwrapped != null) {
            var displaytext = moment(valueUnwrapped).format(pattern);
            $(element).text(displaytext);
        }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor(),
            allBindings = allBindingsAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        var pattern = allBindings.datePattern || 'YYYY-MM-DD hh:mm a';
        if (valueUnwrapped != null) {
            var displaytext = moment(valueUnwrapped).format(pattern);
            $(element).text(displaytext);
        }
    }
};

//Knockout - Setup the conversion and formatting for dates in Knockout
ko.bindingHandlers.dateTimeLongText = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor(),
            allBindings = allBindingsAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        var pattern = allBindings.datePattern || 'Do MMMM YYYY, h:mm:ss a';
        if (valueUnwrapped != null) {
            var displaytext = moment(valueUnwrapped).format(pattern);
            $(element).text(displaytext);
        }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor(),
            allBindings = allBindingsAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        var pattern = allBindings.datePattern || 'Do MMMM YYYY, h:mm:ss a';
        if (valueUnwrapped != null) {
            var displaytext = moment(valueUnwrapped).format(pattern);
            $(element).text(displaytext);
        }
    }
};

//Knockout - Setup the conversion and formatting for dates in Knockout
ko.bindingHandlers.dateText = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor(),
            allBindings = allBindingsAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        var pattern = allBindings.datePattern || 'YYYY-MM-DD';
        if (valueUnwrapped != null) {
            var displaytext = moment(valueUnwrapped).format(pattern);
            $(element).text(displaytext);
        }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor(),
            allBindings = allBindingsAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        var pattern = allBindings.datePattern || 'YYYY-MM-DD';
        if (valueUnwrapped != null) {
            var displaytext = moment(valueUnwrapped).format(pattern);
            $(element).text(displaytext);
        }
    }
};

//Update moment to say Monday is first day of week
moment.lang('en', {
    week: {
        dow: 1 // Monday is the first day of the week.
    }
});


//Local store for persisting data
localStore = new DevExpress.data.LocalStore({
    key: "key",
    name: "value",
    immediate: true
});

//Load an object with specified key from local datastore
loadLocalObject = function (key) {
    var object = null;

    localStore.load({ filter: ["key", "=", key] })
                    .done(function (result) {
                        if (result.length == 0) {
                            object = null;
                        }
                        else {
                            object = result[0].value;
                        }
                    });
    return object;
};

//Load an object with specified key from local datastore (add object with specified value if it doesn't exists)
loadLocalObjectWithDefault = function (key, value) {
    var object = null;

    localStore.load({ filter: ["key", "=", key] })
                    .done(function (result) {
                        if (result.length == 0) {
                            object = null;
                        }
                        else {
                            object = result[0].value;
                        }
                    });

    //Object exists, so return
    if (object != null)
        return object;

    //Object not exists, so store and return
    saveLocalObject(key, value);
    return value;
};

//Save an object with specified key to local datastore
saveLocalObject = function (key, object) {
    localStore.remove(key);
    localStore.insert({ key: key, value: object });
};

//Remove an object with specified key from local dataStore
removeLocalObject = function (key) {
    localStore.remove(key);
};

//Check if an object with specified key exists local dataStore
existsLocalObject = function (key) {
    var object = loadLocalObject(key);
    if (object == null)
        return false;
    else
        return true;
};

//Sets the navigation "DEBUG" items
setDebugModeVisibility = function (visible) {
    Application.config.navigation[3].visible(visible);
    Application.config.navigation[3].items[0].visible(visible);
    Application.config.navigation[3].items[1].visible(visible);
};

//Get the application name
getApplicationName = function () {
    return 'MIE Touch';
};

//Get the application ID
getApplicationId = function () {
    return 'MIE_TOUCH_V1';
};

//Get the device kind (FROM PHONEGAP)
getDeviceKind = function () {
    deviceInfo = DevExpress.devices.current();
    if (deviceInfo.phone == true) {
        return 'phone';
    } else {
        return 'tablet';
    };
};

//Get the device platform (FROM PHONEGAP)
getDevicePlatform = function () {
    deviceInfo = DevExpress.devices.current();
    if (deviceInfo.android == true) {
        return 'android';
    } else if (deviceInfo.ios == true) {
        return 'ios';
    } else if (deviceInfo.win8 == true) {
        return 'win8';
    } else {
        return deviceInfo.platform;
    }
};

//Get the device platform version (FROM PHONEGAP)
getDevicePlatformVersion = function () {
    if (window.device == null)
        return "1.2.3";
    else
        return window.device.version;
};

//Get the device unique ID number (FROM MIE)
getDeviceId = function () {
    if (existsLocalObject('deviceIdentifier'))
        return loadLocalObject('deviceIdentifier');
    else
        return null;
};

//Device orientation variable
orientationPortrait = ko.observable(false);
orientationLandscape = ko.observable(false);
deviceMinimumWidth = ko.observable();
deviceMaximumWidth = ko.observable();
viewableHeight = ko.observable();
viewableWidth = ko.observable();

//Sets the 'orientationPortrait' and 'orientationLandscape' observables for orientation
setOrientation = function () {
    if (getWindowOrientationFromDimensions() == 'portrait') {
        orientationPortrait(true);
        orientationLandscape(false);
    }
    else if (getWindowOrientationFromDimensions() == 'landscape') {
        orientationPortrait(false);
        orientationLandscape(true);
    };
};

//Returns the orientation "portrait" or "landscape"
getOrientation = function (force) {
    if ((force) || ((!orientationPortrait()) && (!orientationLandscape())))
        setOrientation();

    if (orientationPortrait())
        return 'portrait';

    if (orientationLandscape())
        return 'landscape';
};

//Returns the orientation "portrait" or "landscape" based on screen size
getWindowOrientationFromDimensions = function () {

    //Load the minimum and mximum width of the device
    deviceMinimumWidth(loadLocalObjectWithDefault('deviceMinimumWidth', $(window).width()));
    deviceMaximumWidth(loadLocalObjectWithDefault('deviceMaximumWidth', $(window).width()));

    //Always ensure we store the maximum width ever read
    if (deviceMinimumWidth() > $(window).width()) {
        saveLocalObject('deviceMinimumWidth', $(window).width());
        deviceMinimumWidth($(window).width());
    };

    //Always ensure we store the maximum width ever read
    if (deviceMaximumWidth() < $(window).width()) {
        saveLocalObject('deviceMaximumWidth', $(window).width());
        deviceMaximumWidth($(window).width());
    };

    //Both minimum and maximum width the same (because device has not yet had orientation changed)
    if (deviceMinimumWidth() == deviceMaximumWidth()) {
        if ($(window).width() < $(window).height())
            return 'portrait';
        else if ($(window).width() >= $(window).height())
            return 'landscape';
    }
    //Width at minimum, must be portrait
    else if (deviceMinimumWidth() == $(window).width())
        return 'portrait';
    //Width at maximum, must be landscape
    else if (deviceMaximumWidth() == $(window).width())
        return 'landscape';

    //If we get here, calculate
    if ($(window).width() < $(window).height())
        return 'portrait';
    else if ($(window).width() >= $(window).height())
        return 'landscape';
};

//Sets the viewable dimensions (screensize - title bar and any toolbars)
setViewableDimensions = function () {
    //Adjust height to remove toolbars and title bars
    if (getDevicePlatform() == 'win8')
        viewableHeight($(window).height() - 65);
    else if (getDevicePlatform() == 'ios')
        viewableHeight($(window).height() - 43);
    else if (getDevicePlatform() == 'android')
        viewableHeight($(window).height() - 42);
    else
        viewableHeight($(window).height());

    viewableWidth($(window).width());
};

//Occurs when the device screen is changed (fires when orientation of device is changed)
onResize = function (event) {
    setOrientation();
    setPopupContainerHeight();
    setPopupWidth();
    setViewableDimensions();
};

//Takes the return from the webservice and checks if there is an error
isError = function (data) {
    //Exception object throw
    if (!isEmpty(data.responseText)) {
        var exceptionObject = JSON.parse(data.responseText);
        if (exceptionObject.Message != undefined)
            return true;
    }

    //Exception was thrown
    if (!isEmpty(data.Message))
        return true;

    //Actually call was unsuccessful
    if ((data.status != undefined) && (data.status != 200))
        return true;

    return false;
};

//Takes the return from the webservice and checks if there is an error and return the error if true
getError = function (data) {
    //Exception object throw
    if ((!isEmpty(data.responseText)) && (data.responseText.indexOf('ExceptionDetail') > -1)) {
        var exceptionObject = JSON.parse(data.responseText);
        if (exceptionObject.Message != undefined)
            return exceptionObject.Message;
    };

    //Exception was thrown
    if (!isEmpty(data.Message))
        return data.Message;

    //Actually call was unsuccessful
    if ((data.status != undefined) && (data.status != 200)) {
        if (data.statusText == 'error')
            return '(' + data.status + ') An unknown error has occured.';
        else if (data.statusText == 'timeout')
            return 'A timeout has occured.  This indicates a problem with your internet connectivity';
        else
            return data.status + ' - ' + data.statusText;
    }

    return 'An unknown error has occured.';
};

//Remove a view from the cache
removeViewFromCache = function(viewName) {
    var requiredView = null;
    for (var prop in Application.app._viewCache._cache) {
        var v = Application.app._viewCache._cache[prop];
        if (v.viewName == viewName) {
            requiredView = prop;
            break;
        }
    }
    if (requiredView)
        Application.app._viewCache.removeView(requiredView);
};

//To be called on every view to ensure all global vars are reset to defaults
viewInitialise = function () {
    loadingPopupVisible(false);
    loadingText('Loading...');
    helpPopupVisible(false);
    errorPopupVisible(false);
    errorText(null);
    messagePopupVisible(false);
    messageText(null);
    refreshPanelVisible(false);
    refreshPanelText('Reload');

    setOrientation();
    setPopupWidth();
    setPopupContainerHeight();
    setViewableDimensions();
};

//Sets a width based on device and orientation
popupWidth = ko.observable();
setPopupWidth = function () {
    deviceInfo = DevExpress.devices.current();

    if ((deviceInfo == undefined) || (deviceInfo == null))
        return popupWidth('90%');

    if ((deviceInfo.phone == true) && (orientationPortrait())) {
        popupWidth('90%');
    } else {
        popupWidth('400px');
    };
};

popupContainerHeight = ko.observable();
setPopupContainerHeight = function () {
    var height = Math.floor($(window).height() * 0.8) - 50;
    popupContainerHeight(height + "px");
};

//****** HELP POPUP ******
helpPopupVisible = ko.observable(false);
showHelpPopup = function () {
    helpPopupVisible(true);
};
hideHelpPopup = function () {
    helpPopupVisible(false);
};


//****** REFRESH PANEL ******
refreshPanelVisible = ko.observable(false);
refreshPanelText = ko.observable('Reload');
showRefreshPanel = function (text) {
    refreshPanelText(text);
    refreshPanelVisible(true);
};
hideRefreshPanel = function () {
    refreshPanelVisible(false);
};

//****** ERROR POPUP ******
errorPopupVisible = ko.observable(false);
errorText = ko.observable();
showErrorPopup = function (text) {
    errorText(text);
    errorPopupVisible(true);
};
hideErrorPopup = function () {
    errorPopupVisible(false);
};

//****** MESSAGE POPUP ******
messagePopupVisible = ko.observable(false);
messageText = ko.observable();
messageTitle = ko.observable('');   //Remove back to null on 13.1.6 as DX fixed this bug
showMessagePopup = function (text, title) {
    messageText(text);
    if (!isEmpty(title))
        messageTitle(title);
    messagePopupVisible(true);
};
hideMessagePopup = function () {
    messagePopupVisible(false);
};

//****** LOADING POPUP ******
loadingText = ko.observable();
loadingPopupVisible = ko.observable(false);
showLoadingPopup = function (text) {
    if (isEmpty(text))
        loadingText('Loading...');
    else
        loadingText(text);
    loadingPopupVisible(true);
};
hideLoadingPopup = function () {
    loadingPopupVisible(false);
};

//****** NOTIFICATION TOAST ******
notificationObject = ko.observable();
notificationToastText = ko.observable();
notificationToastVisible = ko.observable(false);
showNotificationToast = function (notification) {
    var title = null;
    if (getDevicePlatform() == 'android')
        title = notification.title;
    if (getDevicePlatform() == 'ios')
        title = notification.aps.alert;

    notificationToastText(title);
    notificationObject(notification);
    notificationToastVisible(true);
};
hideNotificationToast = function () {
    notificationToastVisible(false);
};
onNotificationToastClick = function (event) {
    pushwooshWriteLog('NotificationToastClick', null);
    pushWooshHandleNotification(notificationObject(), true);
};

﻿//Update the token with correct information
updateToken = function (token) {

    var tempToken =
    {
        "Username": token.Username,
        "Password": token.Password,
        "Date": token.Date,
        "ApplicationCode": getApplicationId(),
        "ApplicationVersion": getApplicationVersion(),
        "DeviceId": getDeviceId(),          //This is generated by MIE
        "DeviceOS": getDevicePlatform(),
        "DeviceOSVersion": getDevicePlatformVersion(),
        "DeviceKind": getDeviceKind(),      
        "PushWooshId": pushwooshGetIdentifier()     //This is generated by PushWoosh backend
    };
    return tempToken;
};

//Get the currently store AJAX timeout value
getAjaxTimeout = function () {
    return loadLocalObjectWithDefault('ajaxTimeout', 25000);
};

//Generates the list of default tiles
createDefaultTiles = function () {
    var tileArray = new Array();

    //Requests
    var tileDetail = {
        'title': 'Requests',
        'view': 'requestlist',
        'icon': 'dx-icon-card',
        'data': null,
        'colour': '#001122',
        'widthRatio': 1,
        'heightRatio': 1,
        'visible': true,
        'type': 'internal'
    };
    tileArray.push(tileDetail);

    //Add Info
    tileDetail = {
        'title': 'Additional Info',
        'view': 'addinfolist',
        'icon': 'dx-icon-info',
        'data': null,
        'colour': '#112233',
        'widthRatio': 1,
        'heightRatio': 1,
        'visible': true,
        'type': 'internal'
    };
    tileArray.push(tileDetail);

    //Messages
    tileDetail = {
        'title': 'Messages',
        'view': 'messages',
        'icon': 'dx-icon-email',
        'data': null,
        'colour': '#223344',
        'widthRatio': 1,
        'heightRatio': 1,
        'visible': true,
        'type': 'internal'
    };
    tileArray.push(tileDetail);

    return tileArray;
};

//Generates and returns a filter object from the specified values
generateFilterObject = function (dateRangeKind, fromDate, toDate, identifier, firstName, surname, status, reference) {

    var fromDateString = null;
    if (!isEmpty(fromDate))
        fromDateString = fromDate.toString();

    var toDateString = null;
    if (!isEmpty(toDate))
        toDateString = toDate.toString()

    //Create a Filter object
    var searchFilter = {
        "FromCaptureDate": fromDateString,
        "ToCaptureDate": toDateString,
        "Identifier": identifier,
        "Firstname": firstName,
        "Surname": surname,
        "RequestStatus": status,
        "FromRequestKey": 0,
        "MIEReference": reference,
        "DateRangeKind": dateRangeKind
    };

    return searchFilter;
};

//Create the default search filters
createDefaultSearchFilters = function () {
    searchFilters = new Array();

    //PREDEFINED - Captured today
    var fromDate = calculateDateFilter('DATE_TODAY', true, null, null);
    var toDate = calculateDateFilter('DATE_TODAY', false, null, null);
    var searchFilter = generateFilterObject('DATE_TODAY', fromDate, toDate, null, null, null, 2, null);
    var filter = {
        'name': 'Captured Today',
        'filter': searchFilter
    };
    searchFilters.push(filter);

    //PREDEFINED - Captured this week
    fromDate = calculateDateFilter('DATE_THISWEEK', true, null, null);
    toDate = calculateDateFilter('DATE_THISWEEK', false, null, null);
    searchFilter = generateFilterObject('DATE_THISWEEK', fromDate, toDate, null, null, null, 2, null);
    filter = {
        'name': 'Captured This Week',
        'filter': searchFilter
    };
    searchFilters.push(filter);

    //PREDEFINED - Captured last week
    fromDate = calculateDateFilter('DATE_LASTWEEK', true, null, null);
    toDate = calculateDateFilter('DATE_LASTWEEK', false, null, null);
    searchFilter = generateFilterObject('DATE_LASTWEEK', fromDate, toDate, null, null, null, 2, null);
    filter = {
        'name': 'Captured Last Week',
        'filter': searchFilter
    };
    searchFilters.push(filter);


    //PREDEFINED - Captured this month
    fromDate = calculateDateFilter('DATE_THISMONTH', true, null, null);
    toDate = calculateDateFilter('DATE_THISMONTH', false, null, null);
    searchFilter = generateFilterObject('DATE_THISMONTH', fromDate, toDate, null, null, null, 2, null);
    filter = {
        'name': 'Captured This Month',
        'filter': searchFilter
    };
    searchFilters.push(filter);

    //PREDEFINED - Captured last month
    fromDate = calculateDateFilter('DATE_LASTMONTH', true, null, null);
    toDate = calculateDateFilter('DATE_LASTMONTH', false, null, null);
    searchFilter = generateFilterObject('DATE_LASTMONTH', fromDate, toDate, null, null, null, 2, null);
    filter = {
        'name': 'Captured Last Month',
        'filter': searchFilter
    };
    searchFilters.push(filter);

    return searchFilters;
};

//Update the TO and FROM dates in the specified search filter object if the date range is not CUSTOM
updateFilterDates = function (filter) {
    if ((filter.dateRangeKind != null) && (filter.dateRangeKind != 'DATE_RANGE')) {
        var fromDate = calculateDateFilter(filter.DateRangeKind, true);
        var toDate = calculateDateFilter(filter.DateRangeKind, false);
        filter.FromCaptureDate = fromDate;
        filter.ToCaptureDate = toDate;
    };
};

//Calculates a date from a search filter
calculateDateFilter = function (id, isFromDate, year, month) {
    var calculatedDate = null;

    //Calculate date for TODAY
    if (id == 'DATE_TODAY') {
        if (isFromDate)
            calculatedDate = moment().hour(0).minute(0).second(0).toDate();
        else
            calculatedDate = moment().hour(23).minute(59).second(59).toDate();
    }
    //Calculate date for YESTERDAY
    else if (id == 'DATE_YESTERDAY') {
        if (isFromDate)
            calculatedDate = moment().subtract('days', 1).hour(0).minute(0).second(0).toDate();
        else
            calculatedDate = moment().subtract('days', 1).hour(23).minute(59).second(59).toDate();
    }
    //Calculate date for LAST 7 DAYS
    else if (id == 'DATE_LAST7') {
        if (isFromDate)
            calculatedDate = moment().subtract('days', 7).hour(0).minute(0).second(0).toDate();
        else
            calculatedDate = moment().hour(23).minute(59).second(59).toDate();
    }
    //Calculate date for LAST 14 DAYS
    else if (id == 'DATE_LAST14') {
        if (isFromDate)
            calculatedDate = moment().subtract('days', 14).hour(0).minute(0).second(0).toDate();
        else
            calculatedDate = moment().hour(23).minute(59).second(59).toDate();
    }
    //Calculate date for LAST 30 DAYS
    else if (id == 'DATE_LAST30') {
        if (isFromDate)
            calculatedDate = moment().subtract('days', 30).hour(0).minute(0).second(0).toDate();
        else
            calculatedDate = moment().hour(23).minute(59).second(59).toDate();
    }
    //Calculate date for THIS WEEK
    else if (id == 'DATE_THISWEEK') {
        if (isFromDate)
            calculatedDate = moment().startOf('week').hour(0).minute(0).second(0).toDate();
        else
            calculatedDate = moment().endOf('week').hour(23).minute(59).second(59).toDate();
    }
    //Calculate date for LAST WEEK
    else if (id == 'DATE_LASTWEEK') {
        if (isFromDate)
            calculatedDate = moment().subtract('weeks', 1).startOf('week').hour(0).minute(0).second(0).toDate();
        else
            calculatedDate = moment().subtract('weeks', 1).endOf('week').hour(23).minute(59).second(59).toDate();
    }
    //Calculate date for THIS MONTH
    else if (id == 'DATE_THISMONTH') {
        if (isFromDate)
            calculatedDate = moment().startOf('month').hour(0).minute(0).second(0).toDate();
        else
            calculatedDate = moment().endOf('month').hour(23).minute(59).second(59).toDate();
    }
    //Calculate date for LAST MONTH
    else if (id == 'DATE_LASTMONTH') {
        if (isFromDate)
            calculatedDate = moment().subtract('months', 1).startOf('month').hour(0).minute(0).second(0).toDate();
        else
            calculatedDate = moment().subtract('months', 1).endOf('month').hour(23).minute(59).second(59).toDate();
    }
    //Calculate date for LAST MONTH
    else if (id == 'DATE_RANGE') {

        if (isFromDate) {
            if ((!(isEmpty(year))) && (!(isEmpty(month)))) {
                calculatedDate = new Date(year, month, 1);
            };
        }
        else {
            if ((!(isEmpty(year))) && (!(isEmpty(month)))) {
                calculatedDate = new Date(year, month + 1, 0, 23, 59, 59);
            };
        };
    }

    return calculatedDate;
};

//Get a PREDEFINED or CUSTOM SAVED search filter
getSearchFilter = function (id) {
    //PREDEFINED - Captured today
    if (id == 'CAPT_TODAY') {
        var fromDate = calculateDateFilter('DATE_TODAY', true, null, null);
        var toDate = calculateDateFilter('DATE_TODAY', false, null, null);
        return generateFilterObject('DATE_TODAY', fromDate, toDate, null, null, null, 2, null);
    }

    //PREDEFINED - Captured this week
    else if (id == 'CAPT_THISWEEK') {
        var fromDate = calculateDateFilter('DATE_THISWEEK', true, null, null);
        var toDate = calculateDateFilter('DATE_THISWEEK', false, null, null);
        return generateFilterObject('DATE_THISWEEK', fromDate, toDate, null, null, null, 2, null);
    }

    //PREDEFINED - Captured last week
    else if (id == 'CAPT_LASTWEEK') {
        var fromDate = calculateDateFilter('DATE_LASTWEEK', true, null, null);
        var toDate = calculateDateFilter('DATE_LASTWEEK', false, null, null);
        return generateFilterObject('DATE_LASTWEEK', fromDate, toDate, null, null, null, 2, null);
    }

    //PREDEFINED - Captured this month
    else if (id == 'CAPT_THISMONTH') {
        var fromDate = calculateDateFilter('DATE_THISMONTH', true, null, null);
        var toDate = calculateDateFilter('DATE_THISMONTH', false, null, null);
        return generateFilterObject('DATE_THISMONTH', fromDate, toDate, null, null, null, 2, null);
    }

    //PREDEFINED - Captured last month
    else if (id == 'CAPT_LASTMONTH') {
        var fromDate = calculateDateFilter('DATE_LASTMONTH', true, null, null);
        var toDate = calculateDateFilter('DATE_LASTMONTH', false, null, null);
        return generateFilterObject('DATE_LASTMONTH', fromDate, toDate, null, null, null, 2, null);
    }

    //CUSTOM FILTER
    else {
        var searchFilters = loadLocalObjectWithDefault('searchFilters', new Array());
        var currentSearchFilter = null;
        for (var i = 0; i < searchFilters.length; i++) {
            if (searchFilters[i].name.toLowerCase().trim() == id.toLowerCase().trim()) {
                return searchFilters[i].filter;
            }
        }
        return null;
    };
};

//Checks the specified object is null or empty
isEmpty = function (value) {
    //Undefined or null
    if ((value == undefined) || (value == null)) {

        //JS says 0 and false is also classed as NULL and UNDEFINED, so handle this as they are not empty for our use
        if ((value == '0') || (value == false))
            return false;
        else
            return true;
    };

    //Javascript defaults
    if (value == '0')
        return false;

    //Blank string
    if ((value == '') || (value == "")) {
        return true;
    };

    if (value == false)
        return false;

    return false;
}

//Converts javascript data to a JSON date compatible with WCF service
toMSJSONDate = function (date) {
    var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    var stringDate = '/Date(' + utcDate.getTime() + ')/'; //CHANGED LINE
    return stringDate;
};

//Converts javascript data to a JSON date compatible with WCF service
toMSJSONDateTime = function (date) {
    var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    var stringDate = '/Date(' + utcDate.getTime() + ')/'; //CHANGED LINE
    return stringDate;
};

//Checks the strength of a password and returns a score from 0 to 5
function checkPasswordStrength(value, minimumLength, checkLength, checkLower, checkUpper, checkSpecial, checkNumber) {
    var score = 0;
    var validUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var validLower = 'abcdefghijklmnopqrstuvwxyz';
    var validNumbers = '0123456789';
    var validSpecial = '!~)(*&^%$#@!-_=+?/>.<,;:';

    //Check LENGTH
    if (checkLength == true) {
        if (value.length >= minimumLength) {
            score = score + 1;
        }
    }
    else {
        score = score + 1;
    }

    //Has UPPERCASE
    if (checkUpper == true) {
        for (i = 0; i < value.length; i++) {
            if (validUpper.indexOf(value.charAt(i)) >= 0) {
                score = score + 1;
                break;
            }
        }
    }
    else {
        score = score + 1;
    }

    //Has LOWERCASE
    if (checkLower == true) {
        for (i = 0; i < value.length; i++) {
            if (validLower.indexOf(value.charAt(i)) >= 0) {
                score = score + 1;
                break;
            }
        }
    }
    else {
        score = score + 1;
    }

    //Has SPECIAL
    if (checkSpecial == true) {
        for (i = 0; i < value.length; i++) {
            if (validSpecial.indexOf(value.charAt(i)) >= 0) {
                score = score + 1;
                break;
            }
        }
    }
    else {
        score = score + 1;
    }

    //Has NUMBER
    if (checkNumber == true) {
        for (i = 0; i < value.length; i++) {
            if (validNumbers.indexOf(value.charAt(i)) >= 0) {
                score = score + 1;
                break;
            }
        }
    }
    else {
        score = score + 1;
    }

    return score;
};

//Colors - HEX to RGB and RGB to HEX
function RGB2Color(r, g, b) {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
};
function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
};
function hexToRgb(h) {
    var r = parseInt((cutHex(h)).substring(0, 2), 16), g = ((cutHex(h)).substring(2, 4), 16), b = parseInt((cutHex(h)).substring(4, 6), 16)
    return r + '' + b + '' + b;
};
function cutHex(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h }


/**
     * Converts an RGB color value to HSL. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes r, g, and b are contained in the set [0, 255] and
     * returns h, s, and l in the set [0, 1].
     *
     * @param   Number  r       The red color value
     * @param   Number  g       The green color value
     * @param   Number  b       The blue color value
     * @return  Array           The HSL representation
     */
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { 'h': h, 's': s, 'l': l };
};

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return { 'r': r * 255, 'g': g * 255, 'b': b * 255 };
};

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};
function stripEndQuotes(s) {
    var t = s.length;
    if (s.charAt(0) == '"') s = s.substring(1, t--);
    if (s.charAt(--t) == '"') s = s.substring(0, t);
    return s;
}

﻿Application.settings = function (params) {

    //Reset the globals (MUST BE CALLED ON EVERY VIEW)
    viewInitialise();

    var viewModel = {

        //Occurs on creation
        loadSuccess: ko.observable(false),
        nameValue: ko.observable(),
        emailValue: ko.observable(),
        usernameValue: ko.observable(),
        emailReportValue: ko.observable(),
        storeSearchRequestsFilter: ko.observable(),
        requestListCompactMode: ko.observable(),

        notificationResult: ko.observable(),
        notificationAddInfo: ko.observable(),

        changeReportEmailVisible: ko.observable(false),
        changeReportEmailValue: ko.observable(),

        changePasswordVisible: ko.observable(false),
        changePasswordValue1: ko.observable(),
        changePasswordValue2: ko.observable(),

        confirmResetSettingsPopupVisible: ko.observable(false),

        //Occurs when view is showing
        viewShowing: function (e) {
            viewModel.loadSuccess(false);
        },

        //Occurs when view is shown
        viewShown: function (e) {
            viewModel.refreshSettings();
        },

        loadUserDetails: function () {

            //Update the token with correct information
            var token = loadLocalObject("token");
            var tempToken = updateToken(token);

            //Do the service call
            $.ajax(
                {
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    cache: false,
                    crossDomain: true,
                    timeout: getAjaxTimeout(),
                    url: getWebServiceURL() + "getUserDetails",
                    data: JSON.stringify({ token: tempToken }),
                    success: function ajaxSuccess(data) {
                        viewModel.nameValue(data.d.Name);
                        viewModel.emailValue(data.d.EmailAddress);
                        viewModel.usernameValue(data.d.Username);

                        //Must the last store criteria be stored or not
                        viewModel.storeSearchRequestsFilter(loadLocalObjectWithDefault("storeRequestSearchFilter", true));

                        //Request List "COMPACT" or "FULL" mode
                        if (getDeviceKind() == 'phone')
                            viewModel.requestListCompactMode(loadLocalObjectWithDefault("requestListCompactMode", true));
                        else if (getDeviceKind() == 'tablet')
                            viewModel.requestListCompactMode(loadLocalObjectWithDefault("requestListCompactMode", false));

                        //Set the settings for device and app
                        jQuery.each(data.d.Settings, function (i, val) {
                            if (val.Code == 'NotificationReceiveResult')
                                viewModel.notificationResult(val.Value == 'true');
                            if (val.Code == 'NotificationReceiveAddInfo')
                                viewModel.notificationAddInfo(val.Value == 'true');
                        });

                        //Has the report email been overriden
                        if (existsLocalObject("overriddenReportEmail")) {
                            viewModel.emailReportValue(loadLocalObject("overriddenReportEmail"));
                        } else {
                            viewModel.emailReportValue(viewModel.emailValue());
                        }

                        hideLoadingPopup();
                        viewModel.loadSuccess(true);
                        hideRefreshPanel();
                    },
                    error: function ajaxError(data) {
                        viewModel.loadSuccess(false);
                        hideLoadingPopup();
                        showRefreshPanel('Load Settings');
                        showErrorPopup(getError(data));
                    }
                }
            )

        },

        //Occurs when checkbox clicked for "Store Last Search Criteria" mode for request list
        storeSearchRequestsFilterChanged: function (e)
        {
            saveLocalObject("storeRequestSearchFilter", viewModel.storeSearchRequestsFilter());
        },

        //Occurs when checkbox clicked for "Compact/Full" mode for request list
        requestListCompactModeChanged: function(e) {
            saveLocalObject("requestListCompactMode", viewModel.requestListCompactMode());
        },

        //Occurs when Change Email is clicked
        showChangeReportEmail: function (e) {
            if (existsLocalObject("overriddenReportEmail")) {
                viewModel.changeReportEmailValue(loadLocalObject("overriddenReportEmail"));
            } else {
                viewModel.changeReportEmailValue(viewModel.emailValue());
            }
            viewModel.changeReportEmailVisible(true);
        },

        //Occurs when OK is clicked on Change Report Email popup
        saveChangeReportEmail: function (e) {

            //"Changed" email is either blank or same as agent's email address, so don't store an "overridden" address
            if ((viewModel.changeReportEmailValue() == null) ||
                (viewModel.changeReportEmailValue() == '') ||
                (viewModel.changeReportEmailValue().trim().toLowerCase() == viewModel.emailValue().trim().toLowerCase()))
            {
                removeLocalObject("overriddenReportEmail");
                viewModel.emailReportValue(viewModel.emailValue());
            }

            //"Changed" email address is different from the agent's email address,  so store an "overridden" address
            else {
                saveLocalObject("overriddenReportEmail", viewModel.changeReportEmailValue());
                viewModel.emailReportValue(viewModel.changeReportEmailValue());
            }

            //Show the popup
            viewModel.changeReportEmailVisible(false);
        },

        //Occurs when Cancel is clicked on Change Report Email popup
        cancelChangeReportEmail: function (e) {
            viewModel.changeReportEmailVisible(false);
        },

        //Occurs when Change Password is clicked
        showChangePassword: function (e) {
            viewModel.changePasswordValue1(null);
            viewModel.changePasswordValue2(null);
            viewModel.changePasswordVisible(true);
        },

        //Occurs when OK is clicked on Change Password popup
        saveChangePassword: function (e) {
            //Ensure the passwords have been specified
            if ((isEmpty(viewModel.changePasswordValue1())) || (isEmpty(viewModel.changePasswordValue2()))) {
                showErrorPopup("Ensure both passwords are specified.");
                return;
            };

            //Ensure the passwords match
            if (viewModel.changePasswordValue1() != viewModel.changePasswordValue2()) {
                showErrorPopup("Passwords do not match");
                return;
            };

            //Check the password string (must get score of 5 back)
            var passwordStrength = checkPasswordStrength(viewModel.changePasswordValue1(), 6, true, true, true, true, true);
            if (passwordStrength < 5) {
                var passwordText = "Password must contain:<br/>" +
                                   " * 1 upper-case character<br/>" +
                                   " * 1 lower-case character<br/>" +
                                   " * 1 number character<br/>" +
                                   " * 1 special character<br/>" +
                                   " * At least 6 characters in length";
                showErrorPopup(passwordText);
                return
            };

            //Do the service call
            loadingPopupVisible(true);

            //Update the token with correct information
            var token = loadLocalObject("token");
            var tempToken = updateToken(token);

            //Do the service call
            $.ajax(
                {
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    cache: false,
                    crossDomain: true,
                    timeout: getAjaxTimeout(),
                    url: getWebServiceURL() + "updateUserPassword",
                    data: JSON.stringify({ token: tempToken, password: viewModel.changePasswordValue1() }),
                    success: function ajaxSuccess(data) {

                        //Update token with new password
                        var token = loadLocalObject("token");
                        token.Password = viewModel.changePasswordValue1();
                        saveLocalObject("token", token);

                        //Hide popups and show success message
                        loadingPopupVisible(false);
                        viewModel.changePasswordVisible(false);
                        showErrorPopup("Password changed to successfully.");
                    },
                    error: function ajaxError(data) {
                        loadingPopupVisible(false);
                        showErrorPopup(getError(data));
                    }
                });
        },

        //Occurs when Cancel is clicked on Change Password popup
        cancelChangePassword: function (e) {
            viewModel.changePasswordVisible(false);
        },

        //Occurs when a setting is changed
        saveSetting: function(e, code, value)
        {
            showLoadingPopup('Saving...');

            //Update the token with correct information
            var token = loadLocalObject("token");
            var tempToken = updateToken(token);
            var tempSetting = {
                'Code': code,
                'Value': value.toString()
            };

            //Do the service call
            $.ajax(
                {
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    cache: false,
                    crossDomain: true,
                    timeout: getAjaxTimeout(),
                    url: getWebServiceURL() + "updatesetting",
                    data: JSON.stringify({ token: tempToken, setting: tempSetting }),
                    success: function ajaxSuccess(data) {
                        hideLoadingPopup();
                    },
                    error: function ajaxError(data) {
                        hideLoadingPopup();
                        showErrorPopup(getError(data));
                    }
                }
            )
        },


        //Occurs when 'Reload' is clicked
        refreshSettings: function () {
            showLoadingPopup();
            viewModel.loadUserDetails();
        },

        //Occurs when 'Advanced Settings' is clicked
        viewAdvanced: function () {
            Application.app.navigate("settingsadvanced/", { root: false });
        },

        //Occurs when 'Reset All' is clicked
        resetAll: function () {
            viewModel.confirmResetSettingsPopupVisible(true);
        },

        //Occurs when 'Yes' is clicked to 'Reset All'
        confirmResetSettingsYes: function () {
            removeLocalObject('searchFilters');
            removeLocalObject('homeTiles');
            removeLocalObject("overriddenReportEmail");
            removeLocalObject("requestListCompactMode");
            removeLocalObject("storeRequestSearchFilter");
            removeLocalObject("debuggingEnabled");
            removeLocalObject("ajaxTimeout");
            viewModel.confirmResetSettingsPopupVisible(false);
        },

        //Occurs when 'No' is clicked to 'Reset All'
        confirmResetSettingsNo: function () {
            viewModel.confirmResetSettingsPopupVisible(false);
        },

        setNotificationMultiMode: function () {

        },

        setNotificationSingleMode: function () {

        }


    };

    return viewModel;
};

﻿Application.about = function (params) {

    //Reset the globals (MUST BE CALLED ON EVERY VIEW)
    viewInitialise();

    var viewModel = {

        //Gets the CSS depending if device is TABLET or PHONE
        getOuterContainerCSS: function () {
            deviceInfo = DevExpress.devices.current();
            if (deviceInfo.phone == true) {
                return 'about-background background-phone';
            } else {
                return 'about-background background-tablet';
            };
        },

        //Occurs when website link is clicked
        browseWebsite: function() {
            Application.app.loadUrl('http://www.mie.co.za', { openExternal: true });
        },

        //Occurs when view is first shown
        viewShowing: function (e) {
            //We use orientation on this page, ensure it has been set at least once.
            setOrientation();
        },
    };

    return viewModel;
};

﻿Application.messagedetail = function (params) {

    //Reset the globals (MUST BE CALLED ON EVERY VIEW)
    viewInitialise();

    var viewModel = {

        //Occurs on creation
        messageHeader: ko.observable(),
        messageDate: ko.observable(),
        messageText: ko.observable(),
       
        //Occurs when the view is showing
        viewShowing: function (e) {
            detailObject =  loadLocalObject("detailObject");
            viewModel.messageHeader(detailObject.Header);
            viewModel.messageDate(detailObject.Date);
            viewModel.messageText(detailObject.Text);
        }
    };

    return viewModel;
};

﻿Application.addinfodetail = function (params) {

    //Reset the globals (MUST BE CALLED ON EVERY VIEW)
    viewInitialise();

    var viewModel = {

        //Occurs on creation
        requestedName: ko.observable(),
        requestedDate: ko.observable(),
        requestedEmail: ko.observable(),
        requestedFax: ko.observable(),
        requestedPhone: ko.observable(),
        personName: ko.observable(),
        personIdentifier: ko.observable(),
        infoKind: ko.observable(),
        infoNote: ko.observable(),
        infoType: ko.observable(),
        infoRequestKey: ko.observable(),
        infoAsks: ko.observable(),
        addInfoDetailVisible: ko.observable(),

        //Occurs when the view is showing
        viewShowing: function (e) {
            //Not navigating BACK so clear the datasource
            if (e.direction != 'backward') {
                viewModel.addInfoDetailVisible(false);
            };
        },

        //Occurs when the view is shown
        viewShown: function (e) {
            //Not navigating BACK so load the AddInfo
            if (e.direction != 'backward') {
                viewModel.loadAddInfoDetail();
            };
        },

        //Gets the css for the AddInfoKind cell
        getAddInfoKindCSS: function (kind) {
            if (kind == 0)
                return 'blockImageHeader formal';
            else if (kind == 1)
                return 'blockImageHeader informal';
        },

        //Sets the image source for the specified AddInfo
        getAddInfoKindDescription: function (kind) {
            if (kind == 0)
                return 'This additional info is actionable'
            else if (kind == 1)
                return 'This additional info is for information purposes only'
        },

        //Gets the AddInfoKind text to display
        getAddInfoKindText: function (kind) {
            if (kind == 0)
                return 'A';     //ACTIONABLE AddInfo
            else if (kind == 1)
                return 'I';     //INFORMATIONAL AddInfo
        },

        //Load the AddInfo Detail from the server
        loadAddInfoDetail: function () {

            //Show the loading indicator
            showLoadingPopup();

            //Hide any details until loading succesful
            viewModel.addInfoDetailVisible(false);

            //Update the token with correct information
            var token = loadLocalObject("token");
            var tempToken = updateToken(token);

            //Load the keys
            var addInfoKeys = loadLocalObject('addInfoKeys');

            //Do the service call
            $.ajax(
                {
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    cache: false,
                    crossDomain: true,
                    timeout: getAjaxTimeout(),
                    url: getWebServiceURL() + "getaddinfodetail",
                    data: JSON.stringify({
                        token: tempToken,
                        clientKey: addInfoKeys.clientKey,
                        inquiryKey: addInfoKeys.inquiryKey,
                        credentialKey: addInfoKeys.credentialKey,
                        addInfoKey: addInfoKeys.addInfoKey,
                        addInfoTypeKey: addInfoKeys.addInfoTypeKey
                    }),
                    success: function ajaxSuccess(data) {
                        saveLocalObject("detailObject", data.d);    //Store the AddInfo detail object
                        hideLoadingPopup();                         //Hide the "Loading..." popup
                        hideRefreshPanel();                         //Hide the "Reload" button
                        
                        //Populate the AddInfo details
                        viewModel.requestedName(data.d.UserCapturedName);
                        viewModel.requestedDate(data.d.CapturedDate);
                        viewModel.requestedEmail(data.d.UserCapturedEmail);
                        viewModel.requestedFax(data.d.UserCapturedFax);
                        viewModel.requestedPhone(data.d.UserCapturedPhone);
                        viewModel.personName(data.d.PersonName);
                        viewModel.personIdentifier(data.d.Identifier);
                        viewModel.infoRequestKey(data.d.InquiryKey);
                        viewModel.infoNote(data.d.Note);
                        viewModel.infoType(data.d.Description);
                        viewModel.infoKind(data.d.Kind);
                        viewModel.infoAsks(data.d.Asks);

                        //Show the AddInfo details
                        viewModel.addInfoDetailVisible(true);
                    },
                    error: function ajaxError(data) {
                        hideLoadingPopup();                     //Hide the "Loading..." popup
                        viewModel.addInfoDetailVisible(false);  //Hide the AddInfo details
                        showRefreshPanel('Load Add Info');      //Show the "Reload" button
                        showErrorPopup(getError(data));         //Show the Error popup
                    }
                }
            )

        }
    };

    return viewModel;
};

﻿Application.searchrequests = function (params) {

    //Reset the globals (MUST BE CALLED ON EVERY VIEW)
    viewInitialise();

    var viewModel = {

        pageMenuItemRender: function (itemData, itemIndex, itemElement) {
            //Need checkbox for "Compact Mode"
            if (itemData.title == 'Remember Last Filter') {
                var divContainer = $('<div>');
                var divCheckBoxTag = $('<div style="float:right; display:inline-block;">');
                divCheckBoxTag.dxCheckBox({ checked: viewModel.saveLastSearchedFilter, clickAction: viewModel.pageMenuCheckboxClick });
                var divCaptionTag = $('<div style="float:left; display:inline-block;">' + itemData.title + '</div>');
                divContainer.append(divCheckBoxTag);
                divContainer.append(divCaptionTag);
                divContainer.width(190);
                return divContainer[0];
            };

            //Show or Hide the 'View Raw Filter' depending if Dubbing is on or off
            if ((itemData.title == 'View Raw Filter')  && (!viewModel.debuggingEnabledValue()))
                itemElement.hide();
            
            //Other menu items
            return itemData.title;
        },

        //Occurs when a checkbox is clicked in the page menu
        pageMenuCheckboxClick: function (e) {
            saveLocalObject("storeRequestSearchFilter", e.component._options.checked());
        },

        //Occurs on creation
        saveLastSearchedFilter: ko.observable(),
        mieReferenceValue: ko.observable(),
        identifierValue: ko.observable(),
        surnameValue: ko.observable(),
        firstNamesValue: ko.observable(),
        capturedFromYearValue: ko.observable(),
        capturedFromMonthValue: ko.observable(),
        capturedToYearValue: ko.observable(),
        capturedToMonthValue: ko.observable(),
        requestStatusAny: ko.observable(true),
        requestStatusCompleted: ko.observable(false),
        requestStatusPending: ko.observable(false),
        requestStatusValue: ko.observable(),

        //DateRangeKind filters
        dateRangeFilterValue: ko.observable(),
        dateRangeFilterCustomDateCSS: ko.observable('hideRow'),

        filtersDataSource: ko.observable([]),
        selectFiltersPopupVisible: ko.observable(false),
        saveFilterPopupVisible: ko.observable(false),
        saveFilterNameValue: ko.observable(),
        confirmSaveOverwritePopupVisible: ko.observable(false),

        debuggingEnabledValue: ko.observable(false),
        filterTextPopupVisible: ko.observable(false),
        filterTextValue: ko.observable(),

        //Setup the years for YEAR lookup (current year down to 2000)
        years: {
            changed: new $.Callbacks(),
            load: function (loadOptions) {

                if (!loadOptions.refresh)
                    return;

                var yearsArray = [];
                var currentYear = new Date().getFullYear();
                for (var i = currentYear; i >= 2000; i--) {
                    tempYear = { 'id': i, 'name': i };
                    yearsArray.push(tempYear);
                }
                return yearsArray;
            },
            lookup: function (key) {
                return { 'id': key, 'name': key };; //Just return the key becuase the ID and the NAME fields are the same
            }
        },

        //Setup the date range filter loopkup
        dateRangeFilter: [{ id: 'DATE_TODAY', name: 'Today' },
                          { id: 'DATE_YESTERDAY', name: 'Yesterday' },
                          { id: 'DATE_LAST7', name: 'Last 7 Days' },
                          { id: 'DATE_LAST14', name: 'Last 14 Days' },
                          { id: 'DATE_LAST30', name: 'Last 30 Days' },
                          { id: 'DATE_THISWEEK', name: 'This Week' },
                          { id: 'DATE_LASTWEEK', name: 'Last Week' },
                          { id: 'DATE_THISMONTH', name: 'This Month' },
                          { id: 'DATE_LASTMONTH', name: 'Last Month' },
                          { id: 'DATE_RANGE', name: 'Custom Date Range' }],


        //Setup the months for MONTH lookup
        months: [ { id:0, name: "January" },
                  { id:1, name: "February"},
                  { id:2, name: "March" },
                  { id:3, name: "April" },
                  { id:4, name: "May" },
                  { id:5, name: "June" },
                  { id:6, name: "July" },
                  { id:7, name: "August" },
                  { id:8, name: "September" },
                  { id:9, name: "October" },
                  { id:10, name: "November" },
                  { id:11, name: "December" }],

        //Occurs when the view is showing
        viewShowing: function (e) {
            //Not navigating BACK so reset the variables (Will set in ViewShown to ensure it is set correctly)
            if (e.direction != 'backward') {
                viewModel.resetFilter();
                viewModel.saveLastSearchedFilter(null);
            };

            //Check if default search filters exist
            if (!existsLocalObject('searchFilters')) {
                var searchFilters = createDefaultSearchFilters();
                saveLocalObject('searchFilters', searchFilters);
            };

            //Ensure all previous results are cleared whenever we land on this page
            removeLocalObject("requestSearchResults");
        },

        //Occurs when the view is shown
        viewShown: function (e) {
            //Load the option if the "Last used search filter" is stored
            viewModel.saveLastSearchedFilter(loadLocalObjectWithDefault("storeRequestSearchFilter", true));
            viewModel.debuggingEnabledValue(loadLocalObjectWithDefault("debuggingEnabled", false));
            
            //If there is a page dxDropDownMenu (Force to redraw on every load)
            if ((e.viewInfo.renderResult.$markup.find(".layout-toolbar").find(".dx-dropdownmenu").data("dxDropDownMenu")) && (e.viewInfo.model.pageMenuItemRender)) {
                this.myDropDownMenu = e.viewInfo.renderResult.$markup.find(".layout-toolbar").find(".dx-dropdownmenu").data("dxDropDownMenu");
                this.myDropDownMenu._render();
            };

            //Not navigating BACK so reinitialize the view
            if (e.direction != 'backward') {
                //Reset ALL the filter controls
                viewModel.resetFilter();

                //Pre-populate the last used seach filter (if it exists and enabled)
                if (loadLocalObjectWithDefault("storeRequestSearchFilter", true)) {
                    if (existsLocalObject("storedRequestSearchFilter")) {
                        searchFilter = loadLocalObject("storedRequestSearchFilter");
                        if (searchFilter != null) {
                            viewModel.applyFilter(searchFilter);
                        };
                    };
                };
            };
        },

        //Occurs when CLEAR clicked for MIE Reference
        clearMIEReference: function () {
            viewModel.mieReferenceValue(null);
        },

        //Occurs when CLEAR clicked for Identifier
        clearIdentifier: function()
        {
            viewModel.identifierValue(null);
        },

        //Occurs when CLEAR clicked for Surname
        clearSurname: function () {
            viewModel.surnameValue(null);
        },

        //Occurs when CLEAR clicked for FirstNames
        clearFirstNames: function () {
            viewModel.firstNamesValue(null);
        },

        //Occurs when CLEAR clicked for DateRangeKind lookup
        clearDateRangeFilter: function () {
            viewModel.dateRangeFilterValue(null);
            viewModel.clearCapturedTo();
            viewModel.clearCapturedFrom();
        },

        //Occurs when CLEAR clicked for CapturedFrom
        clearCapturedFrom: function () {
            viewModel.capturedFromYearValue(null);
            viewModel.capturedFromMonthValue(null);
        },

        //Occurs when CLEAR clicked for CapturedTo
        clearCapturedTo: function () {
            viewModel.capturedToYearValue(null);
            viewModel.capturedToMonthValue(null);
        },

        //Resets the status to default
        resetStatus: function() {
            viewModel.requestStatusAny(true);
            viewModel.requestStatusValue(2);
            viewModel.requestStatusCompleted(false);
            viewModel.requestStatusPending(false);
        },

        //Clears and resets the filter to defaults
        resetFilter: function()
        {
            viewModel.clearMIEReference();
            viewModel.clearIdentifier();
            viewModel.clearSurname();
            viewModel.clearFirstNames();
            viewModel.clearDateRangeFilter();
            viewModel.resetStatus();
        },

        //Occurs when DO SEARCH is clicked
        doSearch: function () {

            //If a custom date range choosen, ensure the user specifies all values
            if (viewModel.dateRangeFilterValue() == 'DATE_RANGE') {
                var invalid = false;
                if (isEmpty(viewModel.capturedFromYearValue()))
                    invalid = true;
                if (isEmpty(viewModel.capturedFromMonthValue()))
                    invalid = true;
                if (isEmpty(viewModel.capturedToYearValue()))
                    invalid = true;
                if (isEmpty(viewModel.capturedToMonthValue()))
                    invalid = true;

                //The CUSTOM DATE RANGE has not been totally specified
                if (invalid) {
                    showErrorPopup('Please specified the DATE CAPTURED FROM and DATE CAPTURED TO date range values.');
                    return;
                }
            }
            
            //Create a Filter object
            var fromDate = calculateDateFilter(viewModel.dateRangeFilterValue(), true, viewModel.capturedFromYearValue(), viewModel.capturedFromMonthValue());
            var toDate = calculateDateFilter(viewModel.dateRangeFilterValue(), false, viewModel.capturedToYearValue(), viewModel.capturedToMonthValue());
            var searchFilter = generateFilterObject(viewModel.dateRangeFilterValue(),
                                                    fromDate,
                                                    toDate,
                                                    viewModel.identifierValue(),
                                                    viewModel.firstNamesValue(),
                                                    viewModel.surnameValue(),
                                                    viewModel.requestStatusValue(),
                                                    viewModel.mieReferenceValue());


            //Save the current filter
            saveLocalObject("requestSearchFilter", searchFilter);

            //If specified, store the last used search filter
            if (loadLocalObjectWithDefault("storeRequestSearchFilter", true))
                saveLocalObject("storedRequestSearchFilter", searchFilter);
            else
                removeLocalObject("storedRequestSearchFilter");

            //Navigate to the list
            Application.app.navigate("requestlist/stored", { root: false });
        },

        //Occurs after the selected value for the "DateRangeFilter" lookup changes
        onDateRangeFilterValueChanged: function (e) {
            //Set the visibility of the DateFrom and DateTo rows
            if (viewModel.dateRangeFilterValue() == 'DATE_RANGE')
                viewModel.dateRangeFilterCustomDateCSS('showRow');
            else
                viewModel.dateRangeFilterCustomDateCSS('hideRow');
        },

        //Occurs when a REQUESTSTATUS checkbox is clicked
        setRequestStatus: function(id)
        {
            this.requestStatusValue(id);
            this.requestStatusAny(id == 2);         //ANY Status
            this.requestStatusCompleted(id == 1);   //COMPLETED status
            this.requestStatusPending(id == 0);     //PENDING status
        },

        getRequestStatus: function(id) {
            if (id == 2)
                return 'Any';
            if (id == 1)
                return 'Completed';
            if (id == 0)
                return 'Pending';
            else
                return 'Unknown';
        },

        //Occurs when SELECT FILTER is clicked
        showSelectFiltersPopup: function () {
            viewModel.filtersDataSource([]);

            //Get the current stored search filters
            var searchFilters = loadLocalObjectWithDefault('searchFilters', new Array());
            viewModel.filtersDataSource(searchFilters);

            //Show the popup
            viewModel.selectFiltersPopupVisible(true);
        },

        //Occurs when CANCEL is clicked on SELECT FILTER
        hideSelectFiltersPopup: function () {
            viewModel.selectFiltersPopupVisible(false);
        },

        //Occurs when a item is clicked in SELECT FILTER (this will also fire if DELETE is clicked, so handle)
        selectFilterItemClick: function (e) {
            viewModel.applyFilter(e.itemData.filter);
            viewModel.hideSelectFiltersPopup();
        },

        //Applies the specified filter to the view
        applyFilter: function (searchFilter) {
            //Reset the filter
            viewModel.resetFilter();

            //Apply the filter
            if (searchFilter.FromCaptureDate != null) {
                var fromDate = new Date(searchFilter.FromCaptureDate);
                viewModel.capturedFromYearValue(fromDate.getFullYear());
                viewModel.capturedFromMonthValue(fromDate.getMonth());
            };
            if (searchFilter.ToCaptureDate != null) {
                var toDate = new Date(searchFilter.ToCaptureDate);
                viewModel.capturedToYearValue(toDate.getFullYear());
                viewModel.capturedToMonthValue(toDate.getMonth());
            };
            if (searchFilter.Identifier != null)
                viewModel.identifierValue(searchFilter.Identifier);
            if (searchFilter.Firstname != null)
                viewModel.firstNamesValue(searchFilter.Firstname);
            if (searchFilter.Surname != null)
                viewModel.surnameValue(searchFilter.Surname);
            if (searchFilter.MIEReference != null)
                viewModel.mieReferenceValue(searchFilter.MIEReference);
            if (searchFilter.RequestStatus != null)
                viewModel.setRequestStatus(searchFilter.RequestStatus);
            if (searchFilter.DateRangeKind != null) {
                viewModel.dateRangeFilterValue(searchFilter.DateRangeKind)
                viewModel.onDateRangeFilterValueChanged(null);
            };
        },

        //Occurs when SAVE FILTER is clicked
        showSaveFilterPopup: function () {
            viewModel.saveFilterNameValue(null);
            viewModel.confirmSaveOverwritePopupVisible(false);
            viewModel.saveFilterPopupVisible(true);
        },

        //Occurs when CANCEL is clicked in SAVE FILTER
        hideSaveFilterPopup: function () {
            viewModel.saveFilterPopupVisible(false);
        },

        //Occurs when SAVE is clicked in SAVE FILTER
        saveFilter: function () {
            //Ensure that a name for the filter has been specified
            if (isEmpty(viewModel.saveFilterNameValue()))
            {
                showErrorPopup('A name for the filter to be saved must be specified');
                return;
            };

            //Get the current store search filters
            var searchFilters = loadLocalObjectWithDefault('searchFilters', new Array());

            //Iterate and see if we already have a filter with the same name
            var nameUsed = false;
            $.each(searchFilters, function (key, value) {
                var savedFilter = value;

                if (value.name.toLowerCase().trim() == viewModel.saveFilterNameValue().toLowerCase().trim()) {
                    nameUsed = true;
                };
            });

            //Ask user if they wish to overwrite or not
            if (nameUsed) {
                viewModel.confirmSaveOverwritePopupVisible(true);
            }
            else {
                //Save the filter to the local storage
                var fromDate = calculateDateFilter(viewModel.dateRangeFilterValue(), true, viewModel.capturedFromYearValue(), viewModel.capturedFromMonthValue());
                var toDate = calculateDateFilter(viewModel.dateRangeFilterValue(), false, viewModel.capturedToYearValue(), viewModel.capturedToMonthValue());
                viewModel.saveFilterToLocalStorage(viewModel.saveFilterNameValue().trim(), generateFilterObject(viewModel.dateRangeFilterValue(),
                                                                                                                fromDate,
                                                                                                                toDate,
                                                                                                                viewModel.identifierValue(),
                                                                                                                viewModel.firstNamesValue(),
                                                                                                                viewModel.surnameValue(),
                                                                                                                viewModel.requestStatusValue(),
                                                                                                                viewModel.mieReferenceValue()));

                //Hide the popup
                viewModel.hideSaveFilterPopup();
            };
        },

        //Save the specified filter to local storage (overwrites the current one if present)
        saveFilterToLocalStorage: function(name, filter) {
            //Get the current store search filters
            var searchFilters = loadLocalObjectWithDefault('searchFilters', new Array());
            
            //Create the object tpo store in array
            var filter = {
                'name': name.trim(),
                'filter': filter
            };

            //Iterate the list and update the filter
            var index = -1;
            $.each(searchFilters, function (key, value) {
                var savedFilter = value;
                if (value.name.toLowerCase().trim() == name.toLowerCase().trim()) {
                    index = key;
                };
            });

            //Found existing filter with same name in array, so update
            if (index > -1)
                searchFilters[index] = filter;
            //Insert a new filter into array
            else
                searchFilters.push(filter);

            //Save filters back to local storage
            saveLocalObject('searchFilters', searchFilters);
        },
        
        //Occurs when YES is clicked on CONFIRM OVERWIRTE for SAVE FILTER
        confirmSaveOverwriteYes: function() {
            //Save to local storage (will be overwritten)
            var fromDate = calculateDateFilter(viewModel.dateRangeFilterValue(), true, viewModel.capturedFromYearValue(), viewModel.capturedFromMonthValue());
            var toDate = calculateDateFilter(viewModel.dateRangeFilterValue(), false, viewModel.capturedToYearValue(), viewModel.capturedToMonthValue());
            viewModel.saveFilterToLocalStorage(viewModel.saveFilterNameValue().trim(), generateFilterObject(viewModel.dateRangeFilterValue(),
                                                                                                            fromDate,
                                                                                                            toDate,
                                                                                                            viewModel.identifierValue(),
                                                                                                            viewModel.firstNamesValue(),
                                                                                                            viewModel.surnameValue(),
                                                                                                            viewModel.requestStatusValue(),
                                                                                                            viewModel.mieReferenceValue()));


            //Hide the popup
            viewModel.confirmSaveOverwritePopupVisible(false);
            viewModel.hideSaveFilterPopup();
        },

        //Occurs when YES is clicked on CONFIRM OVERWIRTE for SAVE FILTER
        confirmSaveOverwriteNo: function () {
            viewModel.confirmSaveOverwritePopupVisible(false);
        },

        //Occurs when DELETE is clicked in SELECT FILTER
        deleteFilter: function (name) {
            //Get the current store search filters
            var searchFilters = loadLocalObjectWithDefault('searchFilters', new Array());

            //Iterate and see if we can find the filter element
            var index = -1;
            $.each(searchFilters, function (key, value) {
                var savedFilter = value;
                if (value.name.toLowerCase().trim() == name.toLowerCase().trim()) {
                    index = key;
                };
            });

            //Filter element found, so remove from array and save the update filter back back to local store
            if (index > -1) {
                searchFilters.splice(index, 1);
                saveLocalObject('searchFilters', searchFilters);
            };

            //Refresh the datasource
            viewModel.filtersDataSource([]);
            viewModel.filtersDataSource(searchFilters);
        },

        //Occurs when SAVE FILTER is clicked
        showFilterTextPopup: function () {
            var fromDate = calculateDateFilter(viewModel.dateRangeFilterValue(), true, viewModel.capturedFromYearValue(), viewModel.capturedFromMonthValue());
            var toDate = calculateDateFilter(viewModel.dateRangeFilterValue(), false, viewModel.capturedToYearValue(), viewModel.capturedToMonthValue());
            var searchFilter = generateFilterObject(viewModel.dateRangeFilterValue(),
                                                   fromDate,
                                                   toDate,
                                                   viewModel.identifierValue(),
                                                   viewModel.firstNamesValue(),
                                                   viewModel.surnameValue(),
                                                   viewModel.requestStatusValue(),
                                                   viewModel.mieReferenceValue());

            var filterText = 'MIE Reference: ' + searchFilter.MIEReference + '<br>';
            filterText += 'Identifier: ' + searchFilter.Identifier + '<br>';
            filterText += 'Firstnames: ' + searchFilter.Firstname + '<br>';
            filterText += 'Surname: ' + searchFilter.Surname + '<br>';
            filterText += 'Request Status: ' + viewModel.getRequestStatus(searchFilter.RequestStatus) + '<br>';
            filterText += 'Date Range Kind: ' + searchFilter.DateRangeKind + '<br>';
            filterText += 'Date From: ' + searchFilter.FromCaptureDate + '<br>';
            filterText += 'Date To: ' + searchFilter.ToCaptureDate + '<br>';
            viewModel.filterTextValue(filterText);

            viewModel.filterTextPopupVisible(true);
        },

        //Occurs when Ok is clicked in 
        hideFilterTextPopup: function () {
            viewModel.filterTextPopupVisible(false);
        },
    };

    return viewModel;
};

﻿Application.requestdetailitem = function (params) {

    //Reset the globals (MUST BE CALLED ON EVERY VIEW)
    viewInitialise();

    var viewModel = {

        //Occurs on creation
        itemTypeValue: ko.observable(),
        itemStatusValue: ko.observable(),
        itemResultValue: ko.observable(),
        itemResultNoteValue: ko.observable(),
        itemResultRisk: ko.observable(false),
        itemNoteValue: ko.observable(),
        itemAsksValue: ko.observable(),
        itemAnswersValue: ko.observable(),
        itemResultNoteVisible: ko.observable(false),
        itemNoteVisible: ko.observable(false),
        itemAsksVisible: ko.observable(false),
        itemAnswersVisible: ko.observable(false),

        //Occurs when the view is showing
        viewShowing: function (e) {

            //Load the key set we are showing
            var requestKeys = loadLocalObject('requestItemKeys');

            //Load the RequestDetail object from local storage
            detailObject = loadLocalObject("detailObject");

            //Find the item we are dealing with
            jQuery.each(detailObject.Items, function (i, val) {

                //Not the item we are looking for
                if (val.Key != requestKeys.itemKey)
                    return;

                //Set the stayus of the item
                viewModel.itemStatusValue(val.Status);

                //Set the overall risk for the item
                if (val.ResultRisk)
                    viewModel.itemResultRisk(true);

                //Set the variables
                viewModel.itemTypeValue(val.CategoryName + " - " + val.TypeName);
                if (val.Result != null) {
                     viewModel.itemResultValue(val.Result);

                    //Display the ResultNote (if specified)
                    if (!isEmpty(val.ResultNotes)) {
                        viewModel.itemResultNoteValue(val.ResultNotes);
                        viewModel.itemResultNoteVisible(true);
                    } else {
                        viewModel.itemResultNoteValue(null);
                        viewModel.itemResultNoteVisible(false);
                    }

                    //Display the Credetnail Note (if specified and only if result exists)
                    if (!isEmpty(val.Note)) {
                        viewModel.itemNoteValue(val.Note);
                        viewModel.itemNoteVisible(true);

                    }  else {
                        viewModel.itemNoteValue(null);
                        viewModel.itemNoteVisible(false);
                    }
                }
                else {
                    viewModel.itemResultValue('Pending');
                    viewModel.itemResultNoteValue(null);
                    viewModel.itemResultNoteVisible(false);
                    viewModel.itemNoteValue(null);
                    viewModel.itemNoteVisible(false);
                };

                //Asks
                if (!isEmpty(val.Asks)) {
                    viewModel.itemAsksVisible(true);
                    viewModel.itemAsksValue(val.Asks.replace(/~,~/gi, '<br/>'));
                } else {
                    viewModel.itemAsksVisible(false);
                };

                //Answers
                viewModel.itemAnswersValue(null);
                if (val.Answers != null) {
                    viewModel.itemAnswersVisible(true);

                    //Build up the answers string
                    var answersString = '';
                    jQuery.each(val.Answers, function (j, val1) {
                        if (!isEmpty(val1.Name)) {
                            answersString += '<div class="answersTextHeader">';
                            answersString += val1.Name;
                            answersString += '</div>';
                        };
                        if (!isEmpty(val1.Answer)) {
                            answersString += '<div class="answersTextValue">';
                            answersString += val1.Answer.replace(/~,~/gi, '<br/>');
                            answersString += '</div>';
                        };
                    });
                    viewModel.itemAnswersValue(answersString);
                } else {
                    viewModel.itemAnswersVisible(false);
                };
            });
        },

        getRequestItemStatusCSS: function (status, hasRisk) {
            if (status == 0) {
                return 'blockImageCellPhone requestPending';
            }
            else if (status == 1) {
                if (hasRisk)
                    return 'blockImageCellPhone complete-risk';
                else
                    return 'blockImageCellPhone complete-norisk';
            }
        },

    };

    return viewModel;
};

﻿Application.home = function (params) {

    //Reset the globals (MUST BE CALLED ON EVERY VIEW)
    viewInitialise();

    var viewModel = {
        //Occurs on creation
        visibleTileItems: ko.observableArray([]),
        allTileItems: ko.observableArray([]),
        configureTilesVisible: ko.observable(false),
        editTileVisible: ko.observable(false),
        editTitleValue: ko.observable(),
        editColorValue: ko.observable(0),
        editSaturationValue: ko.observable(40),
        editHexColor: ko.computed({
            read: function () {
                var rgbColour = hslToRgb(viewModel.editColorValue() / 360, viewModel.editSaturationValue() / 100, 0.5);
                var hexColour = rgbToHex(Math.round(rgbColour.r), Math.round(rgbColour.g), Math.round(rgbColour.b));
                return hexColour
            },
            deferEvaluation: true
        }),
       
        //Occurs when the view is showing
        viewShowing: function () {
            //Create the default search filters if not created (as the tile generation works from this)
            if (!existsLocalObject('searchFilters')) {
                var filters = createDefaultSearchFilters();
                saveLocalObject('searchFilters', filters);
            };

            //Create the default tiles if first time running
            if (!existsLocalObject('homeTiles')) {
                var tiles = createDefaultTiles();
                saveLocalObject('homeTiles', viewModel.getAllTiles(true));
            };

            //Update the stored list (to remove any tile entired that not longer point to anything)
            saveLocalObject('homeTiles', viewModel.getAllTiles());
        },

        //Occurs when the view is shown
        viewShown: function () {
            //Load the tiles (do in viewshown so the width and height calculations are done correctly)
            viewModel.visibleTileItems(viewModel.getVisibleTiles(viewModel.getAllTiles()));
            viewModel.baseHeight();
        },

        //Returns the CSS depending on the icon specified
        getTileIconCSS: function(icon) {
            return 'icon ' + icon;
        },

        //Calculates the tile height based on current orientation and device (will fire when orientation changes)
        baseHeight: ko.computed(
            function () {
                var minTileHeight = null;
                //Minimum height for PHONE (portrait and landscape)
                if (getDeviceKind() == 'phone') {

                    if (orientationPortrait())
                        minTileHeight = 130;
                    else
                        minTileHeight = 100;
                }
                //Minimum height for TABLET (portrait and landscape)
                else if (getDeviceKind() == 'tablet') {
                    if (orientationPortrait())
                        minTileHeight = 150;
                    else
                        minTileHeight = 130;
                }

                //Substract the bottom padding of the tiles
                var tilesViewableHeight = viewableHeight() - 20;

                //Calculate the tile height
                var tilesOnScreen = Math.floor(tilesViewableHeight / (minTileHeight + 20));
                return Math.floor(tilesViewableHeight / tilesOnScreen) - 20;


                /*
                //Windows 8 phone has bottom toolbar, we need to calculate for that
                if ((getDevicePlatform() == 'win8') && (getDeviceKind() == 'phone')) {
                    //Phone - portrait (3 tiles down)
                    if (orientationPortrait())
                        height = (($(window).height() / 3) * 1.0) - 47;
                    //Phone - landscape (2 tiles down)
                    else
                        height = (($(window).height() / 2) * 1.0) - 60;
                }

                //All other devices
                else {
                    //Phone
                    if (getDeviceKind() == 'phone') {
                        //Phone - portrait (3 tiles down)
                        if (orientationPortrait())
                            height = (($(window).height() / 3) * 1.0) - 40;
                        //Phone - landscape (2 tiles down)
                        else
                            height = (($(window).height() / 2) * 1.0) - 50;
                    }
                    //Tablet
                    else {
                        //Tablet - portrait (6 tiles down)
                        if (orientationPortrait())
                            height = (($(window).height() / 5) * 1.0) - 32;
                        //Tablet - landscape (4 tiles down)
                        else
                            height = (($(window).height() / 4) * 1.0) - 35;
                    };
                }*/

                //return height;
            }
        ),

        //Calculates the tile width based on current orientation and device (will fire when orientation changes)
        baseWidth: ko.computed(
            function () {
                var minTileWidth = 130;

                //Minimum height for PHONE (portrait and landscape)
                if (getDeviceKind() == 'phone')
                    minTileWidth = 130;
                //Minimum height for TABLET (portrait and landscape)
                else if (getDeviceKind() == 'tablet')
                    minTileWidth = 150;

                //Substract the right padding of the tiles
                var tilesViewableWidth = viewableWidth() - 20;

                //Calculate the tile height
                var tilesOnScreen = Math.floor(tilesViewableWidth / (minTileWidth + 20));
                return Math.floor(tilesViewableWidth / tilesOnScreen) - 20;

                /*
                //Phone
                if (getDeviceKind() == 'phone') {
                    //Phone - portrait (2 tiles accross)
                    if (orientationPortrait())
                        width = (($(window).width() / 2) * 1.0) - 29;
                    //Phone - landscape (3 tiles accross)
                    else
                        width = (($(window).width() / 3) * 1.0) - 26;
                }
                //Tablet
                else {
                    //Tablet - portrait (4 tiles accross)
                    if (orientationPortrait())
                        width = (($(window).width() / 4) * 1.0) - 25;
                    //Tablet - landscape (6 tiles accross)
                    else
                        width = (($(window).width() / 6) * 1.0) - 25;
                };

                return width;*/
            }
        ),

        //Get all tiles that *could" be shown
        getAllTiles: function(forceVisibility) {
            var configuredTiles = loadLocalObjectWithDefault('homeTiles', createDefaultTiles());                //Get the current configured tiles
            var availableTiles = createDefaultTiles();                                                          //Get the pre-configured tiles
            var availableFilters = loadLocalObjectWithDefault('searchFilters', createDefaultSearchFilters());   //Get the list of serach filters to make tiles for

            //Add the search filter tiles to the list
            for (var i = 0; i < availableFilters.length; i++) {
                tileDetail = {
                    'title': availableFilters[i].name,
                    'view': 'requestlist',
                    'icon': 'dx-icon-find',
                    'data': availableFilters[i].name,
                    'colour': '#556677',
                    'widthRatio': 1,
                    'heightRatio': 1,
                    'visible': true,
                    'type': 'searchfilter'
                };

                availableTiles.push(tileDetail);
            };

            //Set visibility based on specified forced visibility
            if (forceVisibility != undefined) {
                for (var i = 0; i < availableTiles.length; i++) {
                    availableTiles[i].visible = forceVisibility;
                }
            }

            //Set visibility based on saved configuration
            else {
                for (var i = 0; i < availableTiles.length; i++) {
                    for (var j = 0; j < configuredTiles.length; j++) {
                        if (configuredTiles[j].title.toLowerCase().trim() == availableTiles[i].title.toLowerCase().trim()) {
                            availableTiles[i].visible = configuredTiles[j].visible;
                            availableTiles[i].colour = configuredTiles[j].colour;
                        };
                    };
                };
            }

            return availableTiles;
        },

        //Get all tiles that are configured as visible
        getVisibleTiles: function (allTiles) {
            var visibleTiles = new Array();

            //See if the tile is visible and is visible or hidden
            for (var i = 0; i < allTiles.length; i++) {
                if (allTiles[i].visible) {
                    visibleTiles.push(allTiles[i]);
                }
            };
            
            return visibleTiles;
        },

        //Occurs when a the "Cofigure" menu item/button is clicked
        showConfigureHomePopup: function () {
            viewModel.configureTilesVisible(true);
            viewModel.allTileItems(viewModel.getAllTiles());
        },

        //Occurs when SAVE is clicked in the "Configure" popup
        saveConfigureHomePopup: function () {
            viewModel.configureTilesVisible(false);
            saveLocalObject('homeTiles', viewModel.allTileItems());
            viewModel.visibleTileItems(viewModel.getVisibleTiles(viewModel.getAllTiles()));
        },

        //Occurs when checkbox is clicked when showing "Configure" popup
        setTileVisibility: function (e) {
            e.model.visible = e.component._options.checked;
        },

        //Occurs when CANCEL is clicked in the "Configure" popup
        hideConfigureHomePopup: function () {
            viewModel.configureTilesVisible(false);
        },

        //Occurs when a TILE is clicked
        onTileClicked: function (e) {
            if (!isEmpty(e.itemData.data))
                Application.app.navigate(e.itemData.view + '/' + e.itemData.data, { root: false });
            else
                Application.app.navigate(e.itemData.view + '/', { root: false });
        },

        //Occurs when "Edit" clicked while "Configure Tiles" popup
        showEditTile: function (e, data) {
            viewModel.editTitleValue(data.title);

            for (var i = 0; i < viewModel.allTileItems().length; i++) {
                if (viewModel.allTileItems()[i].title.toLowerCase().trim() == viewModel.editTitleValue().toLowerCase().trim()) {
                    var rgbColour = hexToRgb(viewModel.allTileItems()[i].colour);
                    var hslColour = rgbToHsl(rgbColour.r, rgbColour.g, rgbColour.b);
                    viewModel.editColorValue(Math.round(hslColour.h * 360));
                    viewModel.editSaturationValue(Math.round(hslColour.s * 100));
                };
            };

            viewModel.editTileVisible(true);
        },

        //Occurs when "OK" clicked while "EditTile" popup
        saveEditTile: function (e) {
            for (var i = 0; i < viewModel.allTileItems().length; i++) {
                if (viewModel.allTileItems()[i].title.toLowerCase().trim() == viewModel.editTitleValue().toLowerCase().trim()) {
                    var rgbColour = hslToRgb(viewModel.editColorValue() / 360, viewModel.editSaturationValue() / 100, 0.5);
                    var hexColour = rgbToHex(Math.round(rgbColour.r), Math.round(rgbColour.g), Math.round(rgbColour.b));
                    viewModel.allTileItems()[i].colour = hexColour;
                };
            };

            viewModel.editTileVisible(false);
        },

        //Occurs when "Cancel" clicked while "EditTile" popup
        cancelEditTile: function (e) {
            viewModel.editTileVisible(false);
        },

    };

    return viewModel;
};



﻿Application.settingsadvanced = function (params) {

    var viewModel = {
        debuggingEnabledValue: ko.observable(),
        timeoutValue: ko.observable(),
        changeTimeoutVisible: ko.observable(false),
        changeTimeoutValue: ko.observable(),

        //Occurs when view is showing
        viewShowing: function (e) {
            viewModel.debuggingEnabledValue(loadLocalObjectWithDefault("debuggingEnabled", false));
            viewModel.timeoutValue(getAjaxTimeout());
        },

        //Occurs when 'Debugging Enabled' checkbox value changed
        debuggingEnabledFilterChanged: function (e) {
            viewModel.debuggingEnabledValue(e.component._options.checked);
            saveLocalObject("debuggingEnabled", viewModel.debuggingEnabledValue());
            //debugModeValue(e.component._options.checked)
            setDebugModeVisibility(e.component._options.checked);
        },

        //Occurs when 'Diagnostics' is clicked
        viewDiagnostics: function () {
            Application.app.navigate("scratch/", { root: false });
        },

        //Occurs when 'Change Timeout' is clicked
        showChangeTimeout: function () {
            viewModel.changeTimeoutValue(getAjaxTimeout());
            viewModel.changeTimeoutVisible(true);
        },

        //Occurs when 'Ok' clicked in 'Change Timeout'
        saveChangeTimeout: function () {
            saveLocalObject('ajaxTimeout', viewModel.changeTimeoutValue());
            viewModel.timeoutValue(getAjaxTimeout());
            viewModel.changeTimeoutVisible(false);
        },

        //Occurs when 'Cancel' clicked in 'Change Timeout'
        cancelChangeTimeout: function () {
            viewModel.changeTimeoutVisible(false);
        },
    };

    return viewModel;
};

﻿Application.addinfolist = function (params) {

    //Reset the globals (MUST BE CALLED ON EVERY VIEW)
    viewInitialise();

    var viewModel = {
        //Occurs on creation
        dataSource: ko.observable(null),

        //Occurs when the view is showing
        viewShowing: function (e) {
            //Not navigating BACK so ensure the dataSource is cleared
            if (e.direction != 'backward') {
                viewModel.dataSource(null);
            };
        },

        //Occurs when the view is shown
        viewShown: function (e) {
            //Not navigating BACK so load the data-source
            if (e.direction != 'backward') {
                viewModel.loadAddInfos();
            };
        },

        //Retrieves the messages from the web server and populates the list
        loadAddInfos: function () {

            //Clear the current datasource
            viewModel.dataSource(null);

            //Load the messages and populate the datasource
            viewModel.dataSource({
                load: function (loadOptions) {

                    //Only load on inital load as we load all messages anyway
                    if (loadOptions.refresh == false)
                        return;

                    //Update the token with correct information
                    var token = loadLocalObject("token");
                    var tempToken = updateToken(token);

                    //Do the call to the service
                    var deferred = new $.Deferred();
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        cache: false,
                        crossDomain: true,
                        timeout: getAjaxTimeout(),
                        url: getWebServiceURL() + "getaddinfos",
                        data: JSON.stringify({ token: tempToken }),
                    })
                    .done(function (data) {
                        deferred.resolve(data.d);
                        hideRefreshPanel();
                    })
                    .fail(function (data) {
                        showErrorPopup(getError(data));
                        showRefreshPanel('Load Add Info');
                        deferred.resolve(null);
                    });

                    return deferred;
                }
            });
        },

        //Gets the css for the AddInfoKind cell
        getAddInfoKindCSS: function (status) {
            deviceInfo = DevExpress.devices.current();
            if (deviceInfo.phone == true) {
                if (status == 0)
                    return 'blockImageCellPhone addInfoFormal';
                else if (status == 1)
                    return 'blockImageCellPhone addInfoInformal';
            } else if (deviceInfo.tablet == true) {
                if (status == 0)
                    return 'blockImageCellTablet addInfoFormal';
                else if (status == 1)
                    return 'blockImageCellTablet addInfoInformal';
            };
        },

        //Gets the AddInfoKind text to display
        getAddInfoKindText: function (status) {
            deviceInfo = DevExpress.devices.current();
            if (deviceInfo.phone == true) {
                return '';
            } else if (deviceInfo.tablet == true) {
                if (status == 0)
                    return 'A';     //ACTIONABLE AddInfo
                else if (status == 1)
                    return 'I';     //INFORMATIONAL AddInfo
            };
        },

        //Occurs when an AddInfo item is clicked
        viewAddInfoDetail: function (e) {
            //Pass an object and don't pass parameters otherwise the view caching sees a "different" URL and shows the loading popup
            var keys = {
                'clientKey': e.itemData.ClientKey,
                'inquiryKey': e.itemData.InquiryKey,
                'credentialKey': e.itemData.CredentialKey,
                'addInfoKey': e.itemData.AddInfoKey,
                'addInfoTypeKey': e.itemData.AddInfoTypeKey
            };
            saveLocalObject('addInfoKeys', keys);
            Application.app.navigate("addinfodetail/", { root: false });
        }
      
    };

    return viewModel;
};

﻿Application.requestlist = function (params) {

    //Reset the globals (MUST BE CALLED ON EVERY VIEW)
    viewInitialise();

    var viewModel = {
        //Occurs on creation (not when loaded from cache)
        noDataText: ko.observable("No requests to display"),
        dataSource: ko.observable(null),

        //Occurs when the view is showing
        viewShowing: function (e) {

            //Not navigating BACK so ensure the dataSource is cleared and other vareiables set to defaults
            if (e.direction != 'backward') {
                viewModel.noDataText("No requests to display");
                viewModel.dataSource(null);
            };
        },

        //Occurs when the view is shown
        viewShown: function (e) {
            //Not navigating BACK so populate the dataSource
            if (e.direction != 'backward') {

                //Filter specified (name or STORED)
                if (!isEmpty(params.id))
                {
                    if (params.id != 'stored') {
                        var searchFilter = getSearchFilter(params.id);
                        saveLocalObject("requestSearchFilter", searchFilter);
                    };
                }

                //Load DEFAULT filter
                else {
                    var searchFilter = generateFilterObject(null, null, null, null, null, null, 2, null);
                    saveLocalObject("requestSearchFilter", searchFilter);
                };
                
                /*
                //Load the specified filter
                if (!isEmpty(params.id)) {
                    var searchFilter = getSearchFilter(params.id);
                    saveLocalObject("requestSearchFilter", searchFilter);
                }
                
                //Load Stored filter
                else {
                    var searchFilter = generateFilterObject(null, null, null, null, null, null, 2, null);
                    saveLocalObject("requestSearchFilter", searchFilter);
                };*/

                

                //Load the requests using the filter
                viewModel.loadRequests();
            };
        },

        //Retrieves the requests from the web server and populates the list (Paging is implemented)
        loadRequests: function() {

            //Clear previous results
            removeLocalObject("requestSearchResults");

            //Populate the
            viewModel.dataSource({
                load: function (loadOptions) {

                    //Get the current filter object
                    var searchFilter = loadLocalObject("requestSearchFilter");

                    //Calculate the correct dates
                    updateFilterDates(searchFilter);

                    //Get the earliest RequestKey to pass back in the serach filter
                    var tempSearchFilter = jQuery.extend({}, searchFilter);
                    tempSearchFilter.FromRequestKey = viewModel.getMinimumRequestKey();

                    //If From Date specified, convert to JSON/WCF compatible date
                    if (searchFilter.FromCaptureDate != null)
                        tempSearchFilter.FromCaptureDate = toMSJSONDate(new Date(tempSearchFilter.FromCaptureDate));

                    //If To Date specified, convert to JSON/WCF compatible date
                    if (searchFilter.ToCaptureDate != null)
                        tempSearchFilter.ToCaptureDate = toMSJSONDate(new Date(tempSearchFilter.ToCaptureDate));

                    //Update the token with correct information
                    var token = loadLocalObject("token");
                    var tempToken = updateToken(token);

                    //Do the call to the service (and deferred the call backs so as to use paging)
                    var deferred = new $.Deferred();
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        cache: false,
                        crossDomain: true,
                        timeout: getAjaxTimeout(),
                        url: getWebServiceURL() + "getrequests",
                        data: JSON.stringify({
                            token: tempToken,
                            filter: tempSearchFilter
                        }),
                    })
                    .done(function (data) {
                        var lastRequestSearchResults = loadLocalObject("requestSearchResults");
                        var newRequestSearchResults = data.d;
                        if (lastRequestSearchResults == null) {
                            saveLocalObject("requestSearchResults", newRequestSearchResults);
                        }
                        else {
                            saveLocalObject("requestSearchResults", $.merge(lastRequestSearchResults, newRequestSearchResults));
                        }

                        viewModel.noDataText("No requests found");

                        deferred.resolve(newRequestSearchResults);
                    })
                    .fail(function (data) {
                        showErrorPopup(getError(data));
                        deferred.resolve(null);
                    });

                    return deferred;
                }
            });
        },

        //Gets the css for the RequestStatus cell
        getRequestStatusCSS: function (status) {
            deviceInfo = DevExpress.devices.current();
            if (deviceInfo.phone == true) {
                if (status == 0)
                    return 'blockImageCellPhone requestPending';
                else if (status == 1)
                    return 'blockImageCellPhone requestCompleted';
            } else if (deviceInfo.tablet == true) {
                if (status == 0)
                    return 'blockImageCellTablet requestPending';
                else if (status == 1)
                    return 'blockImageCellTablet requestCompleted';
            };
        },

        //Gets the RequestStatus text to display
        getRequestStatusText: function (status) {
            deviceInfo = DevExpress.devices.current();
            if (deviceInfo.phone == true) {
                return '';
            } else if (deviceInfo.tablet == true) {
                if (status == 0)
                    return 'I';     //INCOMPLETE request
                else if (status == 1)
                    return 'C';     //COMPLETE request
            };
        },

        getRequestOrderNumberCSS : function(orderNumber)  {
            if ((orderNumber == null) || (orderNumber == ''))
                return 'hideRow';
        },

        getRequestRiskCSS: function (riskCount) {
            if (riskCount > 0) {
                if (deviceInfo.phone == true)
                    return 'phoneRisk';
                else if (deviceInfo.tablet == true)
                    return 'tabletRisk';
            }
            else
                return null;
        },

        getRequestReference: function(inquiryKey, orderNumber)
        {
            var text = 'MIE Ref: ' + inquiryKey;
            if ((orderNumber != null) && (orderNumber != ''))
                text += ' (Order No: ' + orderNumber + ')';
            return text;
        },

        //Retrieves the request detail from the web server
        viewRequestDetail: function (e) {
            //Pass an object and don't pass parameters otherwise the view caching sees a "different" URL and shows the loading popup
            var keys = {
                'clientKey': e.itemData.ClientKey,
                'inquiryKey': e.itemData.InquiryKey
            };
            saveLocalObject('requestKeys', keys);
            Application.app.navigate("requestdetail/", { root: false });
        },

        //Gets the minimum request key currently loaded
        getMinimumRequestKey: function () {
            var requestList = loadLocalObject("requestSearchResults");
            
            //No list so send 0 as default
            if (requestList == null) {
                return 0;
            }

            //List is populated, so get the minimum request key
            var minimumRequestKey = 999999999;
            jQuery.each(requestList, function (i, val) {
                if (val.InquiryKey < minimumRequestKey)
                    minimumRequestKey = val.InquiryKey;
            });
            return minimumRequestKey;
        },

        

    };

    return viewModel;
};

﻿Application.login = function (params) {

    //Reset the globals (MUST BE CALLED ON EVERY VIEW)
    viewInitialise();

    var viewModel = {

        //Occurs on creation
        usernameValue: ko.observable(),
        passwordValue: ko.observable(),
        forgotUsernameValue: ko.observable(),
        forgotPasswordPopupVisible: ko.observable(false),

        //Occurs when the view is shown
        viewShown: function (e) {

            viewModel.usernameValue(null);
            viewModel.passwordValue(null);


            //Check if token already exists, the pre-populate the fields and login
            if (existsLocalObject("token")) {
                token = loadLocalObject("token");
                viewModel.usernameValue(token.Username);
                viewModel.passwordValue(token.Password);
                viewModel.login(token);
            };
        },

        //Occurs when a Login in the list is clicked
        doLoginClick: function (e) {

            //Determine environment so correct URL is used
            if (!isEmpty(viewModel.usernameValue())) {
                if (viewModel.usernameValue().indexOf('MIEDEV_') == 0) {
                    saveLocalObject('loginEnvionment', 'MIEDEV');
                    viewModel.usernameValue(viewModel.usernameValue().substring(7, viewModel.usernameValue().length));
                }
                else if (viewModel.usernameValue().indexOf('MIETEST_') == 0) {
                    saveLocalObject('loginEnvionment', 'MIETEST');
                    viewModel.usernameValue(viewModel.usernameValue().substring(8, viewModel.usernameValue().length));
                }
                else if (viewModel.usernameValue().indexOf('MIELOCAL_') == 0) {
                    saveLocalObject('loginEnvionment', 'MIELOCAL');
                    viewModel.usernameValue(viewModel.usernameValue().substring(9, viewModel.usernameValue().length));
                }
                //Not DEV, TEST or LOCAL so it must be LIVE
                else
                    saveLocalObject('loginEnvionment', 'MIELIVE');
            };


            //Generate the token
            var token =
            {
                "Username": viewModel.usernameValue(),
                "Password": viewModel.passwordValue(),
                "Date": new Date()
            };

            //Login to the app
            viewModel.login(token);
        },

        //Call the login on the web server
        login: function (token) {

            //Show the loading indicator
            showLoadingPopup('Logging in...');

            //Update the token with correct information
            var tempToken = updateToken(token);

            //Do the service call
            $.ajax(
                {
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    cache: false,
                    crossDomain: true,
                    timeout: getAjaxTimeout(),
                    url: getWebServiceURL() + "login",
                    data: JSON.stringify({ token: tempToken }),
                    success: function (data) {
                        saveLocalObject('deviceIdentifier', data.d);    //Store the unique device identifier
                        saveLocalObject("UserLoggedIn", true);          //Store "LoggedIn" boolean flag
                        saveLocalObject('token', token);                //Store the token
                        pushwooshRegister();                            //Register PushWoosh
                        hideLoadingPopup();                             //Hide the "Logging in..." popup

                        //A PushWoosh notification exists, so we need to hande it
                        if (existsLocalObject('PushWooshNotification')) {
                            var pushWooshNotification = loadLocalObject('PushWooshNotification');
                            removeLocalObject('PushWooshNotification');
                            pushWooshHandleNotification(pushWooshNotification, false);
                        }
                        //No PushWoosh notification, navigate to HOME
                        else
                            Application.app.navigate("home/", { root: true });
                    },
                    error: function (data) {
                        hideLoadingPopup();
                        showErrorPopup(getError(data));
                    }
                }
            )
        },

        //Gets the CSS depending if device is TABLET or PHONE
        getLoginOuterContainerCSS: function () {
            deviceInfo = DevExpress.devices.current();
            if (deviceInfo.phone == true) {
                return 'login-background background-phone';
            } else {
                return 'login-background background-tablet';
            };
        },

        //Occurs when Forgot Password is clicked
        showForgotPassword: function () {
            viewModel.forgotUsernameValue(viewModel.usernameValue());
            viewModel.forgotPasswordPopupVisible(true);
        },

        //Occurs when "Cancel" clicked on Forgot Password
        hideForgotPassword: function () {
            viewModel.forgotPasswordPopupVisible(false);
        },

        //Submits the forgot password request to the server
        submitForgotPassword: function () {

            //Ensure USERNAME has been specified;
            if (isEmpty(viewModel.forgotUsernameValue())) {
                showErrorPopup('Enter your username');
                return;
            }

            //Show the loading indicator
            showLoadingPopup();

            //Do the service call
            $.ajax(
                {
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    cache: false,
                    crossDomain: true,
                    timeout: getAjaxTimeout(),
                    url: getWebServiceURL() + "forgotPassword",
                    data: JSON.stringify({ username: viewModel.forgotUsernameValue() }),
                    success: function ajaxSuccess(data) {
                        hideLoadingPopup();
                        viewModel.forgotPasswordPopupVisible(false);
                        viewModel.usernameValue(viewModel.forgotUsernameValue());
                        viewModel.passwordValue(null);
                        showMessagePopup("Check your email inbox shortly for your password.", "Password has been sent");
                    },
                    error: function ajaxError(data) {
                        hideLoadingPopup();
                        showErrorPopup(getError(data));
                    }
                }
            )
        }

    };

    return viewModel;
};

﻿Application.scratch = function (params) {

    //Reset the globals (MUST BE CALLED ON EVERY VIEW)
    viewInitialise();

    var viewModel = {

        orientationDetails: ko.observable(),
        orientationDetailsForce: ko.observable(),
        pushwooshLog: ko.observable(),
        pushwooshSound: ko.observable(0),
        pushwooshVibrate: ko.observable(0),
        notificationLog: ko.observable(),

        viewShown: function (e) {
            viewModel.pushwooshLog(null);
        },

        getTokenDetails: function () {
            if (existsLocalObject('token')) {
                var token = loadLocalObject('token');
                return "Username: " + token.Username + "; Password: " + token.Password;
            } else {
                return 'Not found';
            }
        },

        ajaxThrowException: function () {
            $.ajax(
                {
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    cache: false,
                    crossDomain: true,
                    timeout: getAjaxTimeout(),
                    url: getWebServiceURL() + "throwexception",
                    success: function (data) {
                        showMessagePopup('[SUCCESS]: ' + data.d, 'Diagnostic Result');
                    },
                    error: function (data) {
                        showMessagePopup('[ERROR]: ' + getError(data), 'Diagnostic Result');
                    }
                });
        },

        ajaxSecureCall: function () {
            $.ajax(
                {
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    cache: false,
                    crossDomain: true,
                    timeout: getAjaxTimeout(),
                    url: getWebServiceURL() + "helloworld",
                    success: function (data) {
                        showMessagePopup('[SUCCESS]: ' + data.d, 'Diagnostic Result');
                    },
                    error: function (data) {
                        showMessagePopup('[ERROR]: ' + getError(data), 'Diagnostic Result');
                    }
                });
        },

        ajaxUnsecureCall: function () {
            $.ajax(
                {
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    cache: false,
                    crossDomain: true,
                    timeout: getAjaxTimeout(),
                    url: getWebServiceURLUnsecure() + "helloworld",
                    success: function (data) {
                        showMessagePopup('[SUCCESS]: ' + data.d, 'Diagnostic Result');
                    },
                    error: function (data) {
                        showMessagePopup('[ERROR]: ' + getError(data), 'Diagnostic Result');
                    }
                });
        }

    };

    return viewModel;
};

﻿Application.requestdetail = function (params) {

    //Reset the globals (MUST BE CALLED ON EVERY VIEW)
    viewInitialise();

    var viewModel = {
        pageMenuItemRender: function (itemData, itemIndex, itemElement) {
            //Need checkbox for "Compact Mode"
            if (itemData.title == 'Compact Mode') {
                var divContainer = $('<div>');
                var divCheckBoxTag = $('<div style="float:right; display:inline-block;">');
                divCheckBoxTag.dxCheckBox({ checked: viewModel.compactMode, clickAction: viewModel.pageMenuCheckboxClick });
                var divCaptionTag = $('<div style="float:left; display:inline-block;">' + itemData.title + '</div>');
                divContainer.append(divCheckBoxTag);
                divContainer.append(divCaptionTag);
                divContainer.width(150);
                return divContainer[0];
            }

            //Other menu items
            return itemData.title;
        },

        //Occurs when a checkbox is clicked in the page menu
        pageMenuCheckboxClick: function (e) {
            saveLocalObject("requestListCompactMode", e.component._options.checked());
        },

        //Occurs on creation
        dataSource: ko.observable(null),
        emailAddressValue: ko.observable(),
        emailReportPopupVisible: ko.observable(false),
        compactMode: ko.observable(),

        //Occurs when the view is showing
        viewShowing: function (e) {
            //Not navigating BACK so populate the dataSource
            if (e.direction != 'backward') {
                viewModel.dataSource(null);
            };
        },

        //Occurs when the view is shown
        viewShown: function(e) {

            //Not navigating BACK so populate the dataSource
            if (e.direction != 'backward') {
                var requestKeys = loadLocalObject('requestKeys');
                viewModel.loadRequestDetail(requestKeys.clientKey, requestKeys.inquiryKey);
            };

            //Load the Request List "COMPACT" or "FULL" mode
            if (getDeviceKind() == 'phone')
                viewModel.compactMode(loadLocalObjectWithDefault("requestListCompactMode", true));
            else if (getDeviceKind() == 'tablet')
                viewModel.compactMode(loadLocalObjectWithDefault("requestListCompactMode", false));

            //If there is a page dxDropDownMenu (Force to redraw on every load)
            if ((e.viewInfo.renderResult.$markup.find(".layout-toolbar").find(".dx-dropdownmenu").data("dxDropDownMenu")) && (e.viewInfo.model.pageMenuItemRender)) {
                this.myDropDownMenu = e.viewInfo.renderResult.$markup.find(".layout-toolbar").find(".dx-dropdownmenu").data("dxDropDownMenu");
                this.myDropDownMenu._render();
            };
        },

        //Gets the description for the specified MessageStatus
        getRequestDetailStatus: function (status) {
            if (status == 0)
                return 'Incomplete';
            else if (status == 1)
                return 'Complete';
        },

        getRequestItemStatusCSS: function(status, hasRisk) {
            if (status == 0) {
                return 'requestPending';
            }
            else if (status == 1) {
                if (hasRisk)
                    return 'complete-risk';
                else
                    return 'complete-norisk';
            }
        },

        getRequestItemResult: function (result) {
            /*
            if (isEmpty(result))
                return '&#8658 Pending';
            else
                return '&#8658 ' + result;*/

            if (isEmpty(result))
                return '&#8680 Pending';
            else
                return '&#8680 ' + result;
        },

        //Gets the CSS to either show or hide row
        getRequestDetailRowVisibilityCSS: function (value) {

            if ((value == null) || (value == ''))
                return 'hideRow';
            else
                return 'showRow';
        },

        //Gets the CSS to either show or hide row
        getInvoiceParentRowVisibilityCSS: function () {

            if (viewModel.compactMode())
                return 'hideRow';
            else
                return 'showRow';
        },

        //Gets the CSS to either show or hide ASKS row
        getAsksRowVisibilityCSS: function (asks) {
            //COMPACT mode is true, so hide full Asks
            if (viewModel.compactMode())
                return 'hideRow';

            //Hide or show Asks based if there is anything to display
            if ((asks == null) || (asks == ''))
                return 'hideRow';
            else
                return 'showRow';
        },

        //Gets the CSS to either show or hide COMPACT ASKS row
        getAsksCompactRowVisibilityCSS: function (asks) {

            //FULL mode is true, so hide full Asks
            if (!viewModel.compactMode())
                return 'hideRow';

            //Hide or show Asks based if there is anything to display
            if ((asks == null) || (asks == ''))
                return 'hideRow';
            else
                return 'showRow';
        },

        //Occurs when a RequestDetailItem is clicked
        requestItemClick: function (e) {
            var requestKeys = loadLocalObject('requestKeys');

            //Pass an object and don't pass parameters otherwise the view caching sees a "different" URL and shows the loading popup
            var requestItemKeys = {
                'clientKey': requestKeys.clientKey,
                'inquiryKey': requestKeys.inquiryKey,
                'itemKey': e.itemData.Key
            };
            saveLocalObject('requestItemKeys', requestItemKeys);
            Application.app.navigate("requestdetailitem/", { root: false });
        },

        //Return the ASKS/ASKSCOMPACT and format for HTML
        formatAsks: function (asks) {
            if (isEmpty(asks))
                return null;
            else
                return asks.replace(/~,~/gi, '<br/>');
        },

        //Occurs when a "Email" button is clicked
        showEmailReport: function (e) {

            viewModel.emailAddressValue(null);

            //Check to see if the user has specified an "overridden" email address for email reports to from this device
            if (!existsLocalObject("overriddenReportEmail")) {

                //Show the loading panel
                showLoadingPopup();

                //Update the token with correct information
                var token = loadLocalObject("token");
                var tempToken = updateToken(token);

                //Do the service call to get back the users details
                $.ajax(
                    {
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        cache: false,
                        crossDomain: true,
                        timeout: getAjaxTimeout(),
                        url: getWebServiceURL() + "getUserDetails",
                        data: JSON.stringify({ token: tempToken }),
                        success: function ajaxSuccess(data) {
                            hideLoadingPopup();
                            viewModel.emailAddressValue(data.d.EmailAddress);
                            viewModel.emailReportPopupVisible(true);
                        },
                        error: function ajaxError(data) {
                            hideLoadingPopup();
                            showErrorPopup(getError(data));
                        }
                    }
                )
            }

            //Show the popup to show confirm where the report will be sent to
            else {
                viewModel.emailAddressValue(loadLocalObject("overriddenReportEmail"));
                viewModel.emailReportPopupVisible(true);
            }
        },

        //Occurs when a "Submit" button is clicked on email popup
        submitEmailReport: function (e) {
            
            //Show the loading panel
            showLoadingPopup();

            //Update the token with correct information
            var token = loadLocalObject("token");
            var tempToken = updateToken(token);

            //Do the service call to get back the users details
            $.ajax(
                {
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    cache: false,
                    crossDomain: true,
                    timeout: getAjaxTimeout(),
                    url: getWebServiceURL() + "emailRequestReport",
                    data: JSON.stringify({
                        token: tempToken,
                        clientKey: loadLocalObject("detailObject").ClientKey,
                        inquiryKey: loadLocalObject("detailObject").InquiryKey,
                        emailAddress: viewModel.emailAddressValue()
                    }),
                    success: function ajaxSuccess(data) {
                        viewModel.hideEmailReport();
                        hideLoadingPopup();
                        showMessagePopup("Check your email inbox shortly for MIE report.", 'Report request sent');
                    },
                    error: function ajaxError(data) {
                        hideLoadingPopup();
                        showErrorPopup(getError(data));
                    }
                }
            )

        },

        //Occurs when a "Cancel" button is clicked on email popup
        hideEmailReport: function (e) {
            viewModel.emailReportPopupVisible(false);
        },

        //Occurs when "Load Request" in refresh apanel is clicked
        reloadRequestDetail: function ()
        {
            var requestKeys = loadLocalObject('requestKeys');
            viewModel.loadRequestDetail(requestKeys.clientKey, requestKeys.inquiryKey);
        },
        
        //Retrieves the request detail from the web server
        loadRequestDetail: function (clientKey, inquiryKey) {

            //viewModel.dataSource([]);

            //Populate the
            viewModel.dataSource({
                load: function (loadOptions) {

                    //Only populate on first load
                    if (!loadOptions.refresh)
                        return;

                    //Update the token with correct information
                    var token = loadLocalObject("token");
                    var tempToken = updateToken(token);

                    //Do the call to the service (and deferred the call backs so as to use paging)
                    var deferred = new $.Deferred();
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        cache: false,
                        crossDomain: true,
                        timeout: getAjaxTimeout(),
                        url: getWebServiceURL() + "getrequestdetail",
                        data: JSON.stringify({
                            token: tempToken,
                            clientKey: clientKey,
                            inquiryKey: inquiryKey
                        }),
                    })
                    .done(function (data) {
                        saveLocalObject("detailObject", data.d);
                        hideRefreshPanel();
                        var request = loadLocalObject("detailObject");
                        var a = [{ "request": request, "items": request.Items }];
                        deferred.resolve(a);
                    })
                    .fail(function (data) {
                        showRefreshPanel('Load Request');
                        showErrorPopup(getError(data));
                        deferred.resolve(null);
                    });

                    return deferred;
                }
            });
        },


    };

    return viewModel;
};

﻿Application.messages = function (params) {

    //Reset the globals (MUST BE CALLED ON EVERY VIEW)
    viewInitialise();

    var viewModel = {
        //Occurs on creation
        dataSource: ko.observable(null),

        //Occurs when the view is showing
        viewShowing: function (e) {
            //Not navigating BACK so ensure the dataSource is cleared
            //if (e.direction != 'backward') {
                viewModel.dataSource(null);
            //}
        },

        //Occurs when the view is shown
        viewShown: function (e) {
            //Not navigating BACK so populate the dataSource
            //if (e.direction != 'backward') {
                viewModel.loadMessages();
            //};
        },

        //Sets the date CSS for the specified MessageStatus
        getMessageDateCSS: function (status) {
            if (status == 0)        //Unread
                return 'messageUnread';
            else if (status == 1)   //Read
                return 'messageRead';
        },

        //Sets the header CSS for the specified MessageStatus
        getMessageHeaderCSS: function (status) {
            if (status == 0)        //Unread
                return 'messageUnread';
            else if (status == 1)   //Read
                return 'messageRead';
        },

        //Gets the css for the MessageStatus cell
        getMessageStatusCSS: function (status) {
            deviceInfo = DevExpress.devices.current();
            if (deviceInfo.phone == true) {
                if (status == 0)
                    return 'blockImageCellPhone messageUnread';
                else if (status == 1)
                    return 'blockImageCellPhone messageRead';
            } else if (deviceInfo.tablet == true) {
                if (status == 0)
                    return 'blockImageCellTablet messageUnread';
                else if (status == 1)
                    return 'blockImageCellTablet messageRead';
            };
        },

        //Gets the MessageStatus text to display
        getMessageStatusText: function (status) {
            deviceInfo = DevExpress.devices.current();
            if (deviceInfo.phone == true) {
                return '';
            } else if (deviceInfo.tablet == true) {
                if (status == 0)
                    return 'U';     //UNREAD AddInfo
                else if (status == 1)
                    return 'R';     //READ AddInfo
            };
        },

        //Retrieves the messages from the web server and populates the list
        loadMessages: function () {

            //Clear the current datasource
            viewModel.dataSource(null);

            //Load the messages and populate the datasource
            viewModel.dataSource({
                load: function (loadOptions) {

                    //Only load on inital load as we load all messages anyway
                    if (loadOptions.refresh == false)
                        return;

                    //Update the token with correct information
                    var token = loadLocalObject("token");
                    var tempToken = updateToken(token);

                    //Do the call to the service
                    var deferred = new $.Deferred();
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        cache: false,
                        crossDomain: true,
                        timeout: getAjaxTimeout(),
                        url: getWebServiceURL() + "getmessages",
                        data: JSON.stringify({ token: tempToken }),
                    })
                    .done(function (data) {
                        deferred.resolve(data.d);
                        hideRefreshPanel();
                    })
                    .fail(function (data) {
                        showErrorPopup(getError(data));
                        showRefreshPanel('Load Messages');
                        deferred.resolve(null);
                    });

                    return deferred;
                }
            });
        },

        //Retrieves the message detail from the web server
        loadMessageDetail: function (e) {

            //Show the loading indicator
            showLoadingPopup();

            //Update the token with correct information
            var token = loadLocalObject("token");
            var tempToken = updateToken(token);

            //Do the service call
            $.ajax(
                {
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    cache: false,
                    crossDomain: true,
                    timeout: getAjaxTimeout(),
                    url: getWebServiceURL() + "getMessageDetail",
                    data: JSON.stringify({
                        token: tempToken,
                        clientKey: e.itemData.ClientKey,
                        notificationKey: e.itemData.NotificationKey,
                        setAsRead: true
                    }),
                    success: function ajaxSuccess(data) {
                        saveLocalObject("detailObject", data.d);
                        hideLoadingPopup();
                        Application.app.navigate("messagedetail/", { root: false });
                    },
                    error: function ajaxError(data) {
                        hideLoadingPopup();
                        showErrorPopup(getError(data));
                    }
                }
            )
        }

    };

    return viewModel;
};

﻿Application.pushwoosh = function (params) {

    var viewModel = {

        log: ko.observable(),
        soundMode: ko.observable(0),
        vibrateMode: ko.observable(0),

        viewShown: function(e) {
            viewModel.log(pushwooshGetLog());
        },

        showToast: function () {

            var userdata = {
                'Kind': 'RequestResult',
                'Keys': [1, 4844096]
            };



            //saveLocalObject("PushWooshNotification", { 'title': 'The Title', 'userdata': userdata });

            showNotificationToast({ 'title': 'The Title of an extra long message so we can see what it lok slike', 'userdata': JSON.stringify(userdata) });
        },

        refreshLog: function () {
            viewModel.log(pushwooshGetLog());
        },

        clearLog: function () {
            saveLocalObject('pushwooshLog', '');
            viewModel.log(pushwooshGetLog());
        },

        register: function() {
            pushwooshRegister();
            viewModel.refreshLog();
        },

        setSingleMode: function () {
            pushwooshSetSingleMode();
            viewModel.refreshLog();
        },

        setMultiMode: function () {
            pushwooshSetMultiMode();
            viewModel.refreshLog();
        },

        setSoundMode: function () {
            pushwooshSetSound(parseInt(viewModel.soundMode()));
            viewModel.refreshLog();
        },

        setVibrateMode: function () {
            pushwooshSetVibrate(parseInt(viewModel.vibrateMode()));
            viewModel.refreshLog();
        }
    };

    return viewModel;
};
