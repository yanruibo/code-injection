
﻿window.Application2 = $.extend(true, window.Application2, {
    "config": {
        "defaultLayout": "navbar",
  
        "navigation": [
            {
                title: "Home",
                action: "#Index",
                icon: "home"
            },
            {
                //title: "About",
                //action: "#About",
                //icon: "info"

                title: "Chat",
                action: "#Chat",
                icon: "comment"
            },
            {
                 title: "Members",
                 action: "#Members",
                 icon: "group"
            }
        ]
    }
});
















        $(function () {
            app.navigate();

        });

    

﻿window.Application2 = window.Application2 || {};

$(function() {
    app = new DevExpress.framework.html.HtmlApplication({
        ns: Application2,
        viewPortNode: document.getElementById("viewPort"),
        defaultLayout: Application2.config.defaultLayout,
        navigation: Application2.config.navigation
              
    });
   
    app.router.register(":view/:id", { view: "Index", id: undefined });
    DevExpress.utils.windowResizeCallbacks.add(OrientationChanged);
    // navigator.screenOrientation.set('landscape');

    window.CookiesData = Application2.db.sampleData;
    if (window.CookiesData._array[0] != undefined) {
        window.cookiesMId = "";
        for (var item in window.CookiesData._array[0]) {
            if (item != "id")
                window.cookiesMId = window.cookiesMId + window.CookiesData._array[0][item];
        }
    }
    //for saving user id in cookies
    if (window.CookiesData._array[1] != undefined) {
        window.cookiesMemberId = "";
        for (var item in window.CookiesData._array[1]) {
            if (item != "id")
                window.cookiesMemberId = window.cookiesMemberId + window.CookiesData._array[1][item];
        }
    }
          
  
});


﻿//(function() {
//    Application2.db = {

//        sampleData: new DevExpress.data.RestStore({
//            url: "/data/sampleData.json"
//        })

//    };
//})();


(function () {
    Application2.db = {

        sampleData: new DevExpress.data.LocalStore({
            key: 'id',
            name: 'DxSampleStorage',
            immediate: false,
            flushInterval: 7000
        })

    };
})();


﻿(function($, DX, undefined) {

    DX.framework.html.NavBarController = DX.framework.html.DefaultLayoutController.inherit({

        //_onRenderComplete: function(viewInfo) {

            //var CLASS_NAME = "has-toolbar";

            //var $layoutFooter = viewInfo.renderResult.$markup.find(".layout-footer"),
            //    $toolbar = $layoutFooter.find(".dx-toolbar");

            //if($toolbar.length) {
            //    var isToolbarNotEmpty = !!$toolbar.data("dxToolbar").option("items").length,
            //        $layoutContent = viewInfo.renderResult.$markup.find(".layout-content");

            //    $layoutFooter.toggleClass(CLASS_NAME, isToolbarNotEmpty);
            //    $layoutContent.toggleClass(CLASS_NAME, isToolbarNotEmpty);
            //}

           // this._initToolbar(viewInfo.renderResult.$markup);
            //return this.callBase.apply(this, arguments);


            //var $navBar = viewInfo.renderResult.$markup.find("#navBar"),
            //    navBar = $navBar.data("dxNavBar"),
            //    $content = viewInfo.renderResult.$markup.find(".layout-content");

            //var isNavBarVisible = $.grep(navBar.option("items"), function (navItem) {
            //    return $.isFunction(navItem.visible) ? navItem.visible() : navItem.visible;
            //}).length;

        //    if(isNavBarVisible) {
        //        $content.addClass("has-navbar");
        //        $navBar.show();
        //    }
        //    else {
        //        $content.removeClass("has-navbar");
        //        $navBar.hide();
        //    }

        //    this.callBase.apply(this, arguments);
        //},

        //_showViewImpl: function(viewInfo, direction) {
        //},

        _initToolbar: function($markup) {
            var $layoutFooter = $markup.find(".layout-toolbar-bottom.win8");
            if(!$layoutFooter.data("__inited")) {
                $layoutFooter.data("__inited", true);
                $layoutFooter.click(function() {
                    if($layoutFooter.get(0) === event.srcElement) {
                        $(this).toggleClass("semi-hidden");
                    }
                });
            }
        }

    });

   DX.framework.html.layoutControllers.navbar = new DX.framework.html.NavBarController();

})(jQuery, DevExpress);


(function ($) {
    var obj = null;
    var h = 0;
    var a = 0;
    $.fn.curtain = function () {
        obj = $(this);
        obj.prepend("<div id='c' style='height:20px;background:url(images/arrow_bg.jpg) left top repeat-x;'></div>");
        //$("#c").append("<div id='h' style='position: absolute;left:50%;height:16px;width:25px;background:url(images/arrow.png) center center no-repeat;margin:2px'></div>");
        $("#c").append("<div id='h' style='position: absolute;left:50%;height:16px;width:25px;background:url(images/arrow_up.png) center center no-repeat;margin:2px'></div>");
        $("#c").click(function () {
            if (!a)
                c();
            else
                e();
        });

    };
    function c() {
        a = 1;
        h = obj.height();
        obj.animate({ height: 20 }, 500);
        //$("#h").css("background", "url(images/arrow_up.png) center center no-repeat");
        $("#h").css("background", "url(images/arrow.png) center center no-repeat");
    }
    function e() {
        a = 0;
        //obj.animate({ height: h+22 }, 500);
        obj.animate({ height: 101 }, 500);
        $("#h").css("background", "url(images/arrow_up.png) center center no-repeat")
    }
    $.fn.Collapse = function () {
        if (!a) c();
    }
    $.fn.Expand = function () {
        if (a) e();
    }
})(jQuery);

intellisense.annotate(jQuery, {
  'ajax': function() {
    /// <signature>
    ///   <summary>Perform an asynchronous HTTP (Ajax) request.</summary>
    ///   <param name="url" type="String">A string containing the URL to which the request is sent.</param>
    ///   <param name="settings" type="Object">A set of key/value pairs that configure the Ajax request. All settings are optional. A default can be set for any option with $.ajaxSetup(). See jQuery.ajax( settings ) below for a complete list of all settings.</param>
    ///   <returns type="jqXHR" />
    /// </signature>
    /// <signature>
    ///   <summary>Perform an asynchronous HTTP (Ajax) request.</summary>
    ///   <param name="settings" type="Object">A set of key/value pairs that configure the Ajax request. All settings are optional. A default can be set for any option with $.ajaxSetup().</param>
    ///   <returns type="jqXHR" />
    /// </signature>
  },
  'ajaxPrefilter': function() {
    /// <signature>
    ///   <summary>Handle custom Ajax options or modify existing options before each request is sent and before they are processed by $.ajax().</summary>
    ///   <param name="dataTypes" type="String">An optional string containing one or more space-separated dataTypes</param>
    ///   <param name="handler(options, originalOptions, jqXHR)" type="Function">A handler to set default values for future Ajax requests.</param>
    /// </signature>
  },
  'ajaxSetup': function() {
    /// <signature>
    ///   <summary>Set default values for future Ajax requests.</summary>
    ///   <param name="options" type="Object">A set of key/value pairs that configure the default Ajax request. All options are optional.</param>
    /// </signature>
  },
  'boxModel': function() {
    /// <summary>Deprecated in jQuery 1.3 (see jQuery.support). States if the current page, in the user's browser, is being rendered using the W3C CSS Box Model.</summary>
    /// <returns type="Boolean" />
  },
  'browser': function() {
    /// <summary>Contains flags for the useragent, read from navigator.userAgent. We recommend against using this property; please try to use feature detection instead (see jQuery.support). jQuery.browser may be moved to a plugin in a future release of jQuery.</summary>
    /// <returns type="Map" />
  },
  'browser.version': function() {
    /// <summary>The version number of the rendering engine for the user's browser.</summary>
    /// <returns type="String" />
  },
  'Callbacks': function() {
    /// <signature>
    ///   <summary>A multi-purpose callbacks list object that provides a powerful way to manage callback lists.</summary>
    ///   <param name="flags" type="String">An optional list of space-separated flags that change how the callback list behaves.</param>
    /// </signature>
  },
  'contains': function() {
    /// <signature>
    ///   <summary>Check to see if a DOM element is within another DOM element.</summary>
    ///   <param name="container" type="Element">The DOM element that may contain the other element.</param>
    ///   <param name="contained" type="Element">The DOM element that may be contained by the other element.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'cssHooks': function() {
    /// <summary>Hook directly into jQuery to override how particular CSS properties are retrieved or set, normalize CSS property naming, or create custom properties.</summary>
    /// <returns type="Object" />
  },
  'data': function() {
    /// <signature>
    ///   <summary>Returns value at named data store for the element, as set by jQuery.data(element, name, value), or the full data store for the element.</summary>
    ///   <param name="element" type="Element">The DOM element to query for the data.</param>
    ///   <param name="key" type="String">Name of the data stored.</param>
    ///   <returns type="Object" />
    /// </signature>
    /// <signature>
    ///   <summary>Returns value at named data store for the element, as set by jQuery.data(element, name, value), or the full data store for the element.</summary>
    ///   <param name="element" type="Element">The DOM element to query for the data.</param>
    ///   <returns type="Object" />
    /// </signature>
  },
  'dequeue': function() {
    /// <signature>
    ///   <summary>Execute the next function on the queue for the matched element.</summary>
    ///   <param name="element" type="Element">A DOM element from which to remove and execute a queued function.</param>
    ///   <param name="queueName" type="String">A string containing the name of the queue. Defaults to fx, the standard effects queue.</param>
    /// </signature>
  },
  'each': function() {
    /// <signature>
    ///   <summary>A generic iterator function, which can be used to seamlessly iterate over both objects and arrays. Arrays and array-like objects with a length property (such as a function's arguments object) are iterated by numeric index, from 0 to length-1. Other objects are iterated via their named properties.</summary>
    ///   <param name="collection" type="Object">The object or array to iterate over.</param>
    ///   <param name="callback(indexInArray, valueOfElement)" type="Function">The function that will be executed on every object.</param>
    ///   <returns type="Object" />
    /// </signature>
  },
  'error': function() {
    /// <signature>
    ///   <summary>Takes a string and throws an exception containing it.</summary>
    ///   <param name="message" type="String">The message to send out.</param>
    /// </signature>
  },
  'extend': function() {
    /// <signature>
    ///   <summary>Merge the contents of two or more objects together into the first object.</summary>
    ///   <param name="target" type="Object">An object that will receive the new properties if additional objects are passed in or that will extend the jQuery namespace if it is the sole argument.</param>
    ///   <param name="object1" type="Object">An object containing additional properties to merge in.</param>
    ///   <param name="objectN" type="Object">Additional objects containing properties to merge in.</param>
    ///   <returns type="Object" />
    /// </signature>
    /// <signature>
    ///   <summary>Merge the contents of two or more objects together into the first object.</summary>
    ///   <param name="deep" type="Boolean">If true, the merge becomes recursive (aka. deep copy).</param>
    ///   <param name="target" type="Object">The object to extend. It will receive the new properties.</param>
    ///   <param name="object1" type="Object">An object containing additional properties to merge in.</param>
    ///   <param name="objectN" type="Object">Additional objects containing properties to merge in.</param>
    ///   <returns type="Object" />
    /// </signature>
  },
  'get': function() {
    /// <signature>
    ///   <summary>Load data from the server using a HTTP GET request.</summary>
    ///   <param name="url" type="String">A string containing the URL to which the request is sent.</param>
    ///   <param name="data" type="String">A map or string that is sent to the server with the request.</param>
    ///   <param name="success(data, textStatus, jqXHR)" type="Function">A callback function that is executed if the request succeeds.</param>
    ///   <param name="dataType" type="String">The type of data expected from the server. Default: Intelligent Guess (xml, json, script, or html).</param>
    ///   <returns type="jqXHR" />
    /// </signature>
  },
  'getJSON': function() {
    /// <signature>
    ///   <summary>Load JSON-encoded data from the server using a GET HTTP request.</summary>
    ///   <param name="url" type="String">A string containing the URL to which the request is sent.</param>
    ///   <param name="data" type="Object">A map or string that is sent to the server with the request.</param>
    ///   <param name="success(data, textStatus, jqXHR)" type="Function">A callback function that is executed if the request succeeds.</param>
    ///   <returns type="jqXHR" />
    /// </signature>
  },
  'getScript': function() {
    /// <signature>
    ///   <summary>Load a JavaScript file from the server using a GET HTTP request, then execute it.</summary>
    ///   <param name="url" type="String">A string containing the URL to which the request is sent.</param>
    ///   <param name="success(script, textStatus, jqXHR)" type="Function">A callback function that is executed if the request succeeds.</param>
    ///   <returns type="jqXHR" />
    /// </signature>
  },
  'globalEval': function() {
    /// <signature>
    ///   <summary>Execute some JavaScript code globally.</summary>
    ///   <param name="code" type="String">The JavaScript code to execute.</param>
    /// </signature>
  },
  'grep': function() {
    /// <signature>
    ///   <summary>Finds the elements of an array which satisfy a filter function. The original array is not affected.</summary>
    ///   <param name="array" type="Array">The array to search through.</param>
    ///   <param name="function(elementOfArray, indexInArray)" type="Function">The function to process each item against.  The first argument to the function is the item, and the second argument is the index.  The function should return a Boolean value.  this will be the global window object.</param>
    ///   <param name="invert" type="Boolean">If "invert" is false, or not provided, then the function returns an array consisting of all elements for which "callback" returns true.  If "invert" is true, then the function returns an array consisting of all elements for which "callback" returns false.</param>
    ///   <returns type="Array" />
    /// </signature>
  },
  'hasData': function() {
    /// <signature>
    ///   <summary>Determine whether an element has any jQuery data associated with it.</summary>
    ///   <param name="element" type="Element">A DOM element to be checked for data.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'holdReady': function() {
    /// <signature>
    ///   <summary>Holds or releases the execution of jQuery's ready event.</summary>
    ///   <param name="hold" type="Boolean">Indicates whether the ready hold is being requested or released</param>
    /// </signature>
  },
  'inArray': function() {
    /// <signature>
    ///   <summary>Search for a specified value within an array and return its index (or -1 if not found).</summary>
    ///   <param name="value" type="Object">The value to search for.</param>
    ///   <param name="array" type="Array">An array through which to search.</param>
    ///   <param name="fromIndex" type="Number">The index of the array at which to begin the search. The default is 0, which will search the whole array.</param>
    ///   <returns type="Number" />
    /// </signature>
  },
  'isArray': function() {
    /// <signature>
    ///   <summary>Determine whether the argument is an array.</summary>
    ///   <param name="obj" type="Object">Object to test whether or not it is an array.</param>
    ///   <returns type="boolean" />
    /// </signature>
  },
  'isEmptyObject': function() {
    /// <signature>
    ///   <summary>Check to see if an object is empty (contains no properties).</summary>
    ///   <param name="object" type="Object">The object that will be checked to see if it's empty.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'isFunction': function() {
    /// <signature>
    ///   <summary>Determine if the argument passed is a Javascript function object.</summary>
    ///   <param name="obj" type="Object">Object to test whether or not it is a function.</param>
    ///   <returns type="boolean" />
    /// </signature>
  },
  'isNumeric': function() {
    /// <signature>
    ///   <summary>Determines whether its argument is a number.</summary>
    ///   <param name="value" type="Object">The value to be tested.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'isPlainObject': function() {
    /// <signature>
    ///   <summary>Check to see if an object is a plain object (created using "{}" or "new Object").</summary>
    ///   <param name="object" type="Object">The object that will be checked to see if it's a plain object.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'isWindow': function() {
    /// <signature>
    ///   <summary>Determine whether the argument is a window.</summary>
    ///   <param name="obj" type="Object">Object to test whether or not it is a window.</param>
    ///   <returns type="boolean" />
    /// </signature>
  },
  'isXMLDoc': function() {
    /// <signature>
    ///   <summary>Check to see if a DOM node is within an XML document (or is an XML document).</summary>
    ///   <param name="node" type="Element">The DOM node that will be checked to see if it's in an XML document.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'makeArray': function() {
    /// <signature>
    ///   <summary>Convert an array-like object into a true JavaScript array.</summary>
    ///   <param name="obj" type="Object">Any object to turn into a native Array.</param>
    ///   <returns type="Array" />
    /// </signature>
  },
  'map': function() {
    /// <signature>
    ///   <summary>Translate all items in an array or object to new array of items.</summary>
    ///   <param name="array" type="Array">The Array to translate.</param>
    ///   <param name="callback(elementOfArray, indexInArray)" type="Function">The function to process each item against.  The first argument to the function is the array item, the second argument is the index in array The function can return any value. Within the function, this refers to the global (window) object.</param>
    ///   <returns type="Array" />
    /// </signature>
    /// <signature>
    ///   <summary>Translate all items in an array or object to new array of items.</summary>
    ///   <param name="arrayOrObject" type="Object">The Array or Object to translate.</param>
    ///   <param name="callback( value, indexOrKey )" type="Function">The function to process each item against.  The first argument to the function is the value; the second argument is the index or key of the array or object property. The function can return any value to add to the array. A returned array will be flattened into the resulting array. Within the function, this refers to the global (window) object.</param>
    ///   <returns type="Array" />
    /// </signature>
  },
  'merge': function() {
    /// <signature>
    ///   <summary>Merge the contents of two arrays together into the first array.</summary>
    ///   <param name="first" type="Array">The first array to merge, the elements of second added.</param>
    ///   <param name="second" type="Array">The second array to merge into the first, unaltered.</param>
    ///   <returns type="Array" />
    /// </signature>
  },
  'noConflict': function() {
    /// <signature>
    ///   <summary>Relinquish jQuery's control of the $ variable.</summary>
    ///   <param name="removeAll" type="Boolean">A Boolean indicating whether to remove all jQuery variables from the global scope (including jQuery itself).</param>
    ///   <returns type="Object" />
    /// </signature>
  },
  'noop': function() {
    /// <summary>An empty function.</summary>
    /// <returns type="Function" />
  },
  'now': function() {
    /// <summary>Return a number representing the current time.</summary>
    /// <returns type="Number" />
  },
  'param': function() {
    /// <signature>
    ///   <summary>Create a serialized representation of an array or object, suitable for use in a URL query string or Ajax request.</summary>
    ///   <param name="obj" type="Object">An array or object to serialize.</param>
    ///   <returns type="String" />
    /// </signature>
    /// <signature>
    ///   <summary>Create a serialized representation of an array or object, suitable for use in a URL query string or Ajax request.</summary>
    ///   <param name="obj" type="Object">An array or object to serialize.</param>
    ///   <param name="traditional" type="Boolean">A Boolean indicating whether to perform a traditional "shallow" serialization.</param>
    ///   <returns type="String" />
    /// </signature>
  },
  'parseJSON': function() {
    /// <signature>
    ///   <summary>Takes a well-formed JSON string and returns the resulting JavaScript object.</summary>
    ///   <param name="json" type="String">The JSON string to parse.</param>
    ///   <returns type="Object" />
    /// </signature>
  },
  'parseXML': function() {
    /// <signature>
    ///   <summary>Parses a string into an XML document.</summary>
    ///   <param name="data" type="String">a well-formed XML string to be parsed</param>
    ///   <returns type="XMLDocument" />
    /// </signature>
  },
  'post': function() {
    /// <signature>
    ///   <summary>Load data from the server using a HTTP POST request.</summary>
    ///   <param name="url" type="String">A string containing the URL to which the request is sent.</param>
    ///   <param name="data" type="String">A map or string that is sent to the server with the request.</param>
    ///   <param name="success(data, textStatus, jqXHR)" type="Function">A callback function that is executed if the request succeeds.</param>
    ///   <param name="dataType" type="String">The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).</param>
    ///   <returns type="jqXHR" />
    /// </signature>
  },
  'proxy': function() {
    /// <signature>
    ///   <summary>Takes a function and returns a new one that will always have a particular context.</summary>
    ///   <param name="function" type="Function">The function whose context will be changed.</param>
    ///   <param name="context" type="Object">The object to which the context (this) of the function should be set.</param>
    ///   <returns type="Function" />
    /// </signature>
    /// <signature>
    ///   <summary>Takes a function and returns a new one that will always have a particular context.</summary>
    ///   <param name="context" type="Object">The object to which the context of the function should be set.</param>
    ///   <param name="name" type="String">The name of the function whose context will be changed (should be a property of the context object).</param>
    ///   <returns type="Function" />
    /// </signature>
  },
  'queue': function() {
    /// <signature>
    ///   <summary>Manipulate the queue of functions to be executed on the matched element.</summary>
    ///   <param name="element" type="Element">A DOM element where the array of queued functions is attached.</param>
    ///   <param name="queueName" type="String">A string containing the name of the queue. Defaults to fx, the standard effects queue.</param>
    ///   <param name="newQueue" type="Array">An array of functions to replace the current queue contents.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Manipulate the queue of functions to be executed on the matched element.</summary>
    ///   <param name="element" type="Element">A DOM element on which to add a queued function.</param>
    ///   <param name="queueName" type="String">A string containing the name of the queue. Defaults to fx, the standard effects queue.</param>
    ///   <param name="callback()" type="Function">The new function to add to the queue.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'removeData': function() {
    /// <signature>
    ///   <summary>Remove a previously-stored piece of data.</summary>
    ///   <param name="element" type="Element">A DOM element from which to remove data.</param>
    ///   <param name="name" type="String">A string naming the piece of data to remove.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'sub': function() {
    /// <summary>Creates a new copy of jQuery whose properties and methods can be modified without affecting the original jQuery object.</summary>
    /// <returns type="jQuery" />
  },
  'support': function() {
    /// <summary>A collection of properties that represent the presence of different browser features or bugs. Primarily intended for jQuery's internal use; specific properties may be removed when they are no longer needed internally to improve page startup performance.</summary>
    /// <returns type="Object" />
  },
  'trim': function() {
    /// <signature>
    ///   <summary>Remove the whitespace from the beginning and end of a string.</summary>
    ///   <param name="str" type="String">The string to trim.</param>
    ///   <returns type="String" />
    /// </signature>
  },
  'type': function() {
    /// <signature>
    ///   <summary>Determine the internal JavaScript [[Class]] of an object.</summary>
    ///   <param name="obj" type="Object">Object to get the internal JavaScript [[Class]] of.</param>
    ///   <returns type="String" />
    /// </signature>
  },
  'unique': function() {
    /// <signature>
    ///   <summary>Sorts an array of DOM elements, in place, with the duplicates removed. Note that this only works on arrays of DOM elements, not strings or numbers.</summary>
    ///   <param name="array" type="Array">The Array of DOM elements.</param>
    ///   <returns type="Array" />
    /// </signature>
  },
  'when': function() {
    /// <signature>
    ///   <summary>Provides a way to execute callback functions based on one or more objects, usually Deferred objects that represent asynchronous events.</summary>
    ///   <param name="deferreds" type="Deferred">One or more Deferred objects, or plain JavaScript objects.</param>
    ///   <returns type="Promise" />
    /// </signature>
  },
});

var _1228819969 = jQuery.Callbacks;
jQuery.Callbacks = function(flags) {
var _object = _1228819969(flags);
intellisense.annotate(_object, {
  'add': function() {
    /// <signature>
    ///   <summary>Add a callback or a collection of callbacks to a callback list.</summary>
    ///   <param name="callbacks" type="Function">A function, or array of functions, that are to be added to the callback list.</param>
    /// </signature>
  },
  'disable': function() {
    /// <summary>Disable a callback list from doing anything more.</summary>
  },
  'empty': function() {
    /// <summary>Remove all of the callbacks from a list.</summary>
  },
  'fire': function() {
    /// <signature>
    ///   <summary>Call all of the callbacks with the given arguments</summary>
    ///   <param name="arguments" type="">The argument or list of arguments to pass back to the callback list.</param>
    /// </signature>
  },
  'fired': function() {
    /// <summary>Determine if the callbacks have already been called at least once.</summary>
    /// <returns type="Boolean" />
  },
  'fireWith': function() {
    /// <signature>
    ///   <summary>Call all callbacks in a list with the given context and arguments.</summary>
    ///   <param name="context" type="">A reference to the context in which the callbacks in the list should be fired.</param>
    ///   <param name="args" type="">An argument, or array of arguments, to pass to the callbacks in the list.</param>
    /// </signature>
  },
  'has': function() {
    /// <signature>
    ///   <summary>Determine whether a supplied callback is in a list</summary>
    ///   <param name="callback" type="Function">The callback to search for.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'lock': function() {
    /// <summary>Lock a callback list in its current state.</summary>
  },
  'locked': function() {
    /// <summary>Determine if the callbacks list has been locked.</summary>
    /// <returns type="Boolean" />
  },
  'remove': function() {
    /// <signature>
    ///   <summary>Remove a callback or a collection of callbacks from a callback list.</summary>
    ///   <param name="callbacks" type="Function">A function, or array of functions, that are to be removed from the callback list.</param>
    /// </signature>
  },
});

return _object;
};
intellisense.redirectDefinition(jQuery.Callbacks, _1228819969);

var _731531622 = jQuery.Deferred;
jQuery.Deferred = function(func) {
var _object = _731531622(func);
intellisense.annotate(_object, {
  'always': function() {
    /// <signature>
    ///   <summary>Add handlers to be called when the Deferred object is either resolved or rejected.</summary>
    ///   <param name="alwaysCallbacks" type="Function">A function, or array of functions, that is called when the Deferred is resolved or rejected.</param>
    ///   <param name="alwaysCallbacks" type="Function">Optional additional functions, or arrays of functions, that are called when the Deferred is resolved or rejected.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'done': function() {
    /// <signature>
    ///   <summary>Add handlers to be called when the Deferred object is resolved.</summary>
    ///   <param name="doneCallbacks" type="Function">A function, or array of functions, that are called when the Deferred is resolved.</param>
    ///   <param name="doneCallbacks" type="Function">Optional additional functions, or arrays of functions, that are called when the Deferred is resolved.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'fail': function() {
    /// <signature>
    ///   <summary>Add handlers to be called when the Deferred object is rejected.</summary>
    ///   <param name="failCallbacks" type="Function">A function, or array of functions, that are called when the Deferred is rejected.</param>
    ///   <param name="failCallbacks" type="Function">Optional additional functions, or arrays of functions, that are called when the Deferred is rejected.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'isRejected': function() {
    /// <summary>Determine whether a Deferred object has been rejected.</summary>
    /// <returns type="Boolean" />
  },
  'isResolved': function() {
    /// <summary>Determine whether a Deferred object has been resolved.</summary>
    /// <returns type="Boolean" />
  },
  'notify': function() {
    /// <signature>
    ///   <summary>Call the progressCallbacks on a Deferred object with the given args.</summary>
    ///   <param name="args" type="Object">Optional arguments that are passed to the progressCallbacks.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'notifyWith': function() {
    /// <signature>
    ///   <summary>Call the progressCallbacks on a Deferred object with the given context and args.</summary>
    ///   <param name="context" type="Object">Context passed to the progressCallbacks as the this object.</param>
    ///   <param name="args" type="Object">Optional arguments that are passed to the progressCallbacks.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'pipe': function() {
    /// <signature>
    ///   <summary>Utility method to filter and/or chain Deferreds.</summary>
    ///   <param name="doneFilter" type="Function">An optional function that is called when the Deferred is resolved.</param>
    ///   <param name="failFilter" type="Function">An optional function that is called when the Deferred is rejected.</param>
    ///   <returns type="Promise" />
    /// </signature>
    /// <signature>
    ///   <summary>Utility method to filter and/or chain Deferreds.</summary>
    ///   <param name="doneFilter" type="Function">An optional function that is called when the Deferred is resolved.</param>
    ///   <param name="failFilter" type="Function">An optional function that is called when the Deferred is rejected.</param>
    ///   <param name="progressFilter" type="Function">An optional function that is called when progress notifications are sent to the Deferred.</param>
    ///   <returns type="Promise" />
    /// </signature>
  },
  'progress': function() {
    /// <signature>
    ///   <summary>Add handlers to be called when the Deferred object generates progress notifications.</summary>
    ///   <param name="progressCallbacks" type="Function">A function, or array of functions, that is called when the Deferred generates progress notifications.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'promise': function() {
    /// <signature>
    ///   <summary>Return a Deferred's Promise object.</summary>
    ///   <param name="target" type="Object">Object onto which the promise methods have to be attached</param>
    ///   <returns type="Promise" />
    /// </signature>
  },
  'reject': function() {
    /// <signature>
    ///   <summary>Reject a Deferred object and call any failCallbacks with the given args.</summary>
    ///   <param name="args" type="Object">Optional arguments that are passed to the failCallbacks.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'rejectWith': function() {
    /// <signature>
    ///   <summary>Reject a Deferred object and call any failCallbacks with the given context and args.</summary>
    ///   <param name="context" type="Object">Context passed to the failCallbacks as the this object.</param>
    ///   <param name="args" type="Array">An optional array of arguments that are passed to the failCallbacks.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'resolve': function() {
    /// <signature>
    ///   <summary>Resolve a Deferred object and call any doneCallbacks with the given args.</summary>
    ///   <param name="args" type="Object">Optional arguments that are passed to the doneCallbacks.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'resolveWith': function() {
    /// <signature>
    ///   <summary>Resolve a Deferred object and call any doneCallbacks with the given context and args.</summary>
    ///   <param name="context" type="Object">Context passed to the doneCallbacks as the this object.</param>
    ///   <param name="args" type="Array">An optional array of arguments that are passed to the doneCallbacks.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'state': function() {
    /// <summary>Determine the current state of a Deferred object.</summary>
    /// <returns type="String" />
  },
  'then': function() {
    /// <signature>
    ///   <summary>Add handlers to be called when the Deferred object is resolved or rejected.</summary>
    ///   <param name="doneCallbacks" type="Function">A function, or array of functions, called when the Deferred is resolved.</param>
    ///   <param name="failCallbacks" type="Function">A function, or array of functions, called when the Deferred is rejected.</param>
    ///   <returns type="Deferred" />
    /// </signature>
    /// <signature>
    ///   <summary>Add handlers to be called when the Deferred object is resolved or rejected.</summary>
    ///   <param name="doneCallbacks" type="Function">A function, or array of functions, called when the Deferred is resolved.</param>
    ///   <param name="failCallbacks" type="Function">A function, or array of functions, called when the Deferred is rejected.</param>
    ///   <param name="progressCallbacks" type="Function">A function, or array of functions, called when the Deferred notifies progress.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
});

return _object;
};
intellisense.redirectDefinition(jQuery.Callbacks, _731531622);

intellisense.annotate(jQuery.Event.prototype, {
  'currentTarget': function() {
    /// <summary>The current DOM element within the event bubbling phase.</summary>
    /// <returns type="Element" />
  },
  'data': function() {
    /// <summary>An optional data map passed to an event method when the current executing handler is bound.</summary>
  },
  'delegateTarget': function() {
    /// <summary>The element where the currently-called jQuery event handler was attached.</summary>
    /// <returns type="Element" />
  },
  'isDefaultPrevented': function() {
    /// <summary>Returns whether event.preventDefault() was ever called on this event object.</summary>
    /// <returns type="Boolean" />
  },
  'isImmediatePropagationStopped': function() {
    /// <summary>Returns whether event.stopImmediatePropagation() was ever called on this event object.</summary>
    /// <returns type="Boolean" />
  },
  'isPropagationStopped': function() {
    /// <summary>Returns whether event.stopPropagation() was ever called on this event object.</summary>
    /// <returns type="Boolean" />
  },
  'namespace': function() {
    /// <summary>The namespace specified when the event was triggered.</summary>
    /// <returns type="String" />
  },
  'pageX': function() {
    /// <summary>The mouse position relative to the left edge of the document.</summary>
    /// <returns type="Number" />
  },
  'pageY': function() {
    /// <summary>The mouse position relative to the top edge of the document.</summary>
    /// <returns type="Number" />
  },
  'preventDefault': function() {
    /// <summary>If this method is called, the default action of the event will not be triggered.</summary>
  },
  'relatedTarget': function() {
    /// <summary>The other DOM element involved in the event, if any.</summary>
    /// <returns type="Element" />
  },
  'result': function() {
    /// <summary>The last value returned by an event handler that was triggered by this event, unless the value was undefined.</summary>
    /// <returns type="Object" />
  },
  'stopImmediatePropagation': function() {
    /// <summary>Keeps the rest of the handlers from being executed and prevents the event from bubbling up the DOM tree.</summary>
  },
  'stopPropagation': function() {
    /// <summary>Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.</summary>
  },
  'target': function() {
    /// <summary>The DOM element that initiated the event.</summary>
    /// <returns type="Element" />
  },
  'timeStamp': function() {
    /// <summary>The difference in milliseconds between the time the browser created the event and January 1, 1970.</summary>
    /// <returns type="Number" />
  },
  'type': function() {
    /// <summary>Describes the nature of the event.</summary>
    /// <returns type="String" />
  },
  'which': function() {
    /// <summary>For key or mouse events, this property indicates the specific key or button that was pressed.</summary>
    /// <returns type="Number" />
  },
});

intellisense.annotate(jQuery.fn, {
  'add': function() {
    /// <signature>
    ///   <summary>Add elements to the set of matched elements.</summary>
    ///   <param name="selector" type="String">A string representing a selector expression to find additional elements to add to the set of matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Add elements to the set of matched elements.</summary>
    ///   <param name="elements" type="Array">One or more elements to add to the set of matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Add elements to the set of matched elements.</summary>
    ///   <param name="html" type="String">An HTML fragment to add to the set of matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Add elements to the set of matched elements.</summary>
    ///   <param name="jQuery object" type="jQuery object ">An existing jQuery object to add to the set of matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Add elements to the set of matched elements.</summary>
    ///   <param name="selector" type="String">A string representing a selector expression to find additional elements to add to the set of matched elements.</param>
    ///   <param name="context" type="Element">The point in the document at which the selector should begin matching; similar to the context argument of the $(selector, context) method.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'addClass': function() {
    /// <signature>
    ///   <summary>Adds the specified class(es) to each of the set of matched elements.</summary>
    ///   <param name="className" type="String">One or more class names to be added to the class attribute of each matched element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Adds the specified class(es) to each of the set of matched elements.</summary>
    ///   <param name="function(index, currentClass)" type="Function">A function returning one or more space-separated class names to be added to the existing class name(s). Receives the index position of the element in the set and the existing class name(s) as arguments. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'after': function() {
    /// <signature>
    ///   <summary>Insert content, specified by the parameter, after each element in the set of matched elements.</summary>
    ///   <param name="content" type="jQuery">HTML string, DOM element, or jQuery object to insert after each element in the set of matched elements.</param>
    ///   <param name="content" type="jQuery">One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert after each element in the set of matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Insert content, specified by the parameter, after each element in the set of matched elements.</summary>
    ///   <param name="function(index)" type="Function">A function that returns an HTML string, DOM element(s), or jQuery object to insert after each element in the set of matched elements. Receives the index position of the element in the set as an argument. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'ajaxComplete': function() {
    /// <signature>
    ///   <summary>Register a handler to be called when Ajax requests complete. This is an Ajax Event.</summary>
    ///   <param name="handler(event, XMLHttpRequest, ajaxOptions)" type="Function">The function to be invoked.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'ajaxError': function() {
    /// <signature>
    ///   <summary>Register a handler to be called when Ajax requests complete with an error. This is an Ajax Event.</summary>
    ///   <param name="handler(event, jqXHR, ajaxSettings, thrownError)" type="Function">The function to be invoked.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'ajaxSend': function() {
    /// <signature>
    ///   <summary>Attach a function to be executed before an Ajax request is sent. This is an Ajax Event.</summary>
    ///   <param name="handler(event, jqXHR, ajaxOptions)" type="Function">The function to be invoked.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'ajaxStart': function() {
    /// <signature>
    ///   <summary>Register a handler to be called when the first Ajax request begins. This is an Ajax Event.</summary>
    ///   <param name="handler()" type="Function">The function to be invoked.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'ajaxStop': function() {
    /// <signature>
    ///   <summary>Register a handler to be called when all Ajax requests have completed. This is an Ajax Event.</summary>
    ///   <param name="handler()" type="Function">The function to be invoked.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'ajaxSuccess': function() {
    /// <signature>
    ///   <summary>Attach a function to be executed whenever an Ajax request completes successfully. This is an Ajax Event.</summary>
    ///   <param name="handler(event, XMLHttpRequest, ajaxOptions)" type="Function">The function to be invoked.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'all': function() {
    /// <summary>Selects all elements.</summary>
  },
  'andSelf': function() {
    /// <summary>Add the previous set of elements on the stack to the current set.</summary>
    /// <returns type="jQuery" />
  },
  'animate': function() {
    /// <signature>
    ///   <summary>Perform a custom animation of a set of CSS properties.</summary>
    ///   <param name="properties" type="Object">A map of CSS properties that the animation will move toward.</param>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Perform a custom animation of a set of CSS properties.</summary>
    ///   <param name="properties" type="Object">A map of CSS properties that the animation will move toward.</param>
    ///   <param name="options" type="Object">A map of additional options to pass to the method. Supported keys:         duration: A string or number determining how long the animation will run.easing: A string indicating which easing function to use for the transition.complete: A function to call once the animation is complete.step: A function to be called after each step of the animation.queue: A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string.specialEasing: A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions (added 1.4).</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'animated': function() {
    /// <summary>Select all elements that are in the progress of an animation at the time the selector is run.</summary>
  },
  'append': function() {
    /// <signature>
    ///   <summary>Insert content, specified by the parameter, to the end of each element in the set of matched elements.</summary>
    ///   <param name="content" type="jQuery">DOM element, HTML string, or jQuery object to insert at the end of each element in the set of matched elements.</param>
    ///   <param name="content" type="jQuery">One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert at the end of each element in the set of matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Insert content, specified by the parameter, to the end of each element in the set of matched elements.</summary>
    ///   <param name="function(index, html)" type="Function">A function that returns an HTML string, DOM element(s), or jQuery object to insert at the end of each element in the set of matched elements. Receives the index position of the element in the set and the old HTML value of the element as arguments. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'appendTo': function() {
    /// <signature>
    ///   <summary>Insert every element in the set of matched elements to the end of the target.</summary>
    ///   <param name="target" type="jQuery">A selector, element, HTML string, or jQuery object; the matched set of elements will be inserted at the end of the element(s) specified by this parameter.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'attr': function() {
    /// <signature>
    ///   <summary>Set one or more attributes for the set of matched elements.</summary>
    ///   <param name="attributeName" type="String">The name of the attribute to set.</param>
    ///   <param name="value" type="Number">A value to set for the attribute.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set one or more attributes for the set of matched elements.</summary>
    ///   <param name="map" type="Object">A map of attribute-value pairs to set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set one or more attributes for the set of matched elements.</summary>
    ///   <param name="attributeName" type="String">The name of the attribute to set.</param>
    ///   <param name="function(index, attr)" type="Function">A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old attribute value as arguments.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'attributeContains': function() {
    /// <signature>
    ///   <summary>Selects elements that have the specified attribute with a value containing the a given substring.</summary>
    ///   <param name="attribute" type="String">An attribute name.</param>
    ///   <param name="value" type="String">An attribute value. Can be either an unquoted single word or a quoted string.</param>
    /// </signature>
  },
  'attributeContainsPrefix': function() {
    /// <signature>
    ///   <summary>Selects elements that have the specified attribute with a value either equal to a given string or starting with that string followed by a hyphen (-).</summary>
    ///   <param name="attribute" type="String">An attribute name.</param>
    ///   <param name="value" type="String">An attribute value. Can be either an unquoted single word or a quoted string.</param>
    /// </signature>
  },
  'attributeContainsWord': function() {
    /// <signature>
    ///   <summary>Selects elements that have the specified attribute with a value containing a given word, delimited by spaces.</summary>
    ///   <param name="attribute" type="String">An attribute name.</param>
    ///   <param name="value" type="String">An attribute value. Can be either an unquoted single word or a quoted string.</param>
    /// </signature>
  },
  'attributeEndsWith': function() {
    /// <signature>
    ///   <summary>Selects elements that have the specified attribute with a value ending exactly with a given string. The comparison is case sensitive.</summary>
    ///   <param name="attribute" type="String">An attribute name.</param>
    ///   <param name="value" type="String">An attribute value. Can be either an unquoted single word or a quoted string.</param>
    /// </signature>
  },
  'attributeEquals': function() {
    /// <signature>
    ///   <summary>Selects elements that have the specified attribute with a value exactly equal to a certain value.</summary>
    ///   <param name="attribute" type="String">An attribute name.</param>
    ///   <param name="value" type="String">An attribute value. Can be either an unquoted single word or a quoted string.</param>
    /// </signature>
  },
  'attributeHas': function() {
    /// <signature>
    ///   <summary>Selects elements that have the specified attribute, with any value.</summary>
    ///   <param name="attribute" type="String">An attribute name.</param>
    /// </signature>
  },
  'attributeMultiple': function() {
    /// <signature>
    ///   <summary>Matches elements that match all of the specified attribute filters.</summary>
    ///   <param name="attributeFilter1" type="String">An attribute filter.</param>
    ///   <param name="attributeFilter2" type="String">Another attribute filter, reducing the selection even more</param>
    ///   <param name="attributeFilterN" type="String">As many more attribute filters as necessary</param>
    /// </signature>
  },
  'attributeNotEqual': function() {
    /// <signature>
    ///   <summary>Select elements that either don't have the specified attribute, or do have the specified attribute but not with a certain value.</summary>
    ///   <param name="attribute" type="String">An attribute name.</param>
    ///   <param name="value" type="String">An attribute value. Can be either an unquoted single word or a quoted string.</param>
    /// </signature>
  },
  'attributeStartsWith': function() {
    /// <signature>
    ///   <summary>Selects elements that have the specified attribute with a value beginning exactly with a given string.</summary>
    ///   <param name="attribute" type="String">An attribute name.</param>
    ///   <param name="value" type="String">An attribute value. Can be either an unquoted single word or a quoted string.</param>
    /// </signature>
  },
  'before': function() {
    /// <signature>
    ///   <summary>Insert content, specified by the parameter, before each element in the set of matched elements.</summary>
    ///   <param name="content" type="jQuery">HTML string, DOM element, or jQuery object to insert before each element in the set of matched elements.</param>
    ///   <param name="content" type="jQuery">One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert before each element in the set of matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Insert content, specified by the parameter, before each element in the set of matched elements.</summary>
    ///   <param name="function" type="Function">A function that returns an HTML string, DOM element(s), or jQuery object to insert before each element in the set of matched elements. Receives the index position of the element in the set as an argument. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'bind': function() {
    /// <signature>
    ///   <summary>Attach a handler to an event for the elements.</summary>
    ///   <param name="eventType" type="String">A string containing one or more DOM event types, such as "click" or "submit," or custom event names.</param>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Attach a handler to an event for the elements.</summary>
    ///   <param name="eventType" type="String">A string containing one or more DOM event types, such as "click" or "submit," or custom event names.</param>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="preventBubble" type="Boolean">Setting the third argument to false will attach a function that prevents the default action from occurring and stops the event from bubbling. The default is true.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Attach a handler to an event for the elements.</summary>
    ///   <param name="events" type="Object">A map of one or more DOM event types and functions to execute for them.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'blur': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "blur" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "blur" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'button': function() {
    /// <summary>Selects all button elements and elements of type button.</summary>
  },
  'change': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "change" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "change" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'checkbox': function() {
    /// <summary>Selects all elements of type checkbox.</summary>
  },
  'checked': function() {
    /// <summary>Matches all elements that are checked.</summary>
  },
  'child': function() {
    /// <signature>
    ///   <summary>Selects all direct child elements specified by "child" of elements specified by "parent".</summary>
    ///   <param name="parent" type="String">Any valid selector.</param>
    ///   <param name="child" type="String">A selector to filter the child elements.</param>
    /// </signature>
  },
  'children': function() {
    /// <signature>
    ///   <summary>Get the children of each element in the set of matched elements, optionally filtered by a selector.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'class': function() {
    /// <signature>
    ///   <summary>Selects all elements with the given class.</summary>
    ///   <param name="class" type="String">A class to search for. An element can have multiple classes; only one of them must match.</param>
    /// </signature>
  },
  'clearQueue': function() {
    /// <signature>
    ///   <summary>Remove from the queue all items that have not yet been run.</summary>
    ///   <param name="queueName" type="String">A string containing the name of the queue. Defaults to fx, the standard effects queue.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'click': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "click" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "click" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'clone': function() {
    /// <signature>
    ///   <summary>Create a deep copy of the set of matched elements.</summary>
    ///   <param name="withDataAndEvents" type="Boolean">A Boolean indicating whether event handlers should be copied along with the elements. As of jQuery 1.4, element data will be copied as well.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Create a deep copy of the set of matched elements.</summary>
    ///   <param name="withDataAndEvents" type="Boolean">A Boolean indicating whether event handlers and data should be copied along with the elements. The default value is false. *In jQuery 1.5.0 the default value was incorrectly true; it was changed back to false in 1.5.1 and up.</param>
    ///   <param name="deepWithDataAndEvents" type="Boolean">A Boolean indicating whether event handlers and data for all children of the cloned element should be copied. By default its value matches the first argument's value (which defaults to false).</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'closest': function() {
    /// <signature>
    ///   <summary>Get the first element that matches the selector, beginning at the current element and progressing up through the DOM tree.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Get the first element that matches the selector, beginning at the current element and progressing up through the DOM tree.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <param name="context" type="Element">A DOM element within which a matching element may be found. If no context is passed in then the context of the jQuery set will be used instead.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Get the first element that matches the selector, beginning at the current element and progressing up through the DOM tree.</summary>
    ///   <param name="jQuery object" type="jQuery">A jQuery object to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Get the first element that matches the selector, beginning at the current element and progressing up through the DOM tree.</summary>
    ///   <param name="element" type="Element">An element to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'contains': function() {
    /// <signature>
    ///   <summary>Select all elements that contain the specified text.</summary>
    ///   <param name="text" type="String">A string of text to look for. It's case sensitive.</param>
    /// </signature>
  },
  'contents': function() {
    /// <summary>Get the children of each element in the set of matched elements, including text and comment nodes.</summary>
    /// <returns type="jQuery" />
  },
  'context': function() {
    /// <summary>The DOM node context originally passed to jQuery(); if none was passed then context will likely be the document.</summary>
    /// <returns type="Element" />
  },
  'css': function() {
    /// <signature>
    ///   <summary>Set one or more CSS properties for the  set of matched elements.</summary>
    ///   <param name="propertyName" type="String">A CSS property name.</param>
    ///   <param name="value" type="Number">A value to set for the property.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set one or more CSS properties for the  set of matched elements.</summary>
    ///   <param name="propertyName" type="String">A CSS property name.</param>
    ///   <param name="function(index, value)" type="Function">A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old value as arguments.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set one or more CSS properties for the  set of matched elements.</summary>
    ///   <param name="map" type="Object">A map of property-value pairs to set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'data': function() {
    /// <signature>
    ///   <summary>Store arbitrary data associated with the matched elements.</summary>
    ///   <param name="key" type="String">A string naming the piece of data to set.</param>
    ///   <param name="value" type="Object">The new data value; it can be any Javascript type including Array or Object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Store arbitrary data associated with the matched elements.</summary>
    ///   <param name="obj" type="Object">An object of key-value pairs of data to update.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'dblclick': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "dblclick" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "dblclick" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'delay': function() {
    /// <signature>
    ///   <summary>Set a timer to delay execution of subsequent items in the queue.</summary>
    ///   <param name="duration" type="Number">An integer indicating the number of milliseconds to delay execution of the next item in the queue.</param>
    ///   <param name="queueName" type="String">A string containing the name of the queue. Defaults to fx, the standard effects queue.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'delegate': function() {
    /// <signature>
    ///   <summary>Attach a handler to one or more events for all elements that match the selector, now or in the future, based on a specific set of root elements.</summary>
    ///   <param name="selector" type="String">A selector to filter the elements that trigger the event.</param>
    ///   <param name="eventType" type="String">A string containing one or more space-separated JavaScript event types, such as "click" or "keydown," or custom event names.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute at the time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Attach a handler to one or more events for all elements that match the selector, now or in the future, based on a specific set of root elements.</summary>
    ///   <param name="selector" type="String">A selector to filter the elements that trigger the event.</param>
    ///   <param name="eventType" type="String">A string containing one or more space-separated JavaScript event types, such as "click" or "keydown," or custom event names.</param>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute at the time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Attach a handler to one or more events for all elements that match the selector, now or in the future, based on a specific set of root elements.</summary>
    ///   <param name="selector" type="String">A selector to filter the elements that trigger the event.</param>
    ///   <param name="events" type="Object">A map of one or more event types and functions to execute for them.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'dequeue': function() {
    /// <signature>
    ///   <summary>Execute the next function on the queue for the matched elements.</summary>
    ///   <param name="queueName" type="String">A string containing the name of the queue. Defaults to fx, the standard effects queue.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'descendant': function() {
    /// <signature>
    ///   <summary>Selects all elements that are descendants of a given ancestor.</summary>
    ///   <param name="ancestor" type="String">Any valid selector.</param>
    ///   <param name="descendant" type="String">A selector to filter the descendant elements.</param>
    /// </signature>
  },
  'detach': function() {
    /// <signature>
    ///   <summary>Remove the set of matched elements from the DOM.</summary>
    ///   <param name="selector" type="String">A selector expression that filters the set of matched elements to be removed.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'die': function() {
    /// <signature>
    ///   <summary>Remove an event handler previously attached using .bind() from the elements.</summary>
    ///   <param name="eventType" type="String">A string containing a JavaScript event type, such as click or keydown.</param>
    ///   <param name="handler" type="String">The function that is no longer to be executed.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove an event handler previously attached using .bind() from the elements.</summary>
    ///   <param name="eventTypes" type="Object">A map of one or more event types, such as click or keydown and their corresponding functions that are no longer to be executed.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'disabled': function() {
    /// <summary>Selects all elements that are disabled.</summary>
  },
  'each': function() {
    /// <signature>
    ///   <summary>Iterate over a jQuery object, executing a function for each matched element.</summary>
    ///   <param name="function(index, Element)" type="Function">A function to execute for each matched element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'element': function() {
    /// <signature>
    ///   <summary>Selects all elements with the given tag name.</summary>
    ///   <param name="element" type="String">An element to search for. Refers to the tagName of DOM nodes.</param>
    /// </signature>
  },
  'empty': function() {
    /// <summary>Select all elements that have no children (including text nodes).</summary>
  },
  'enabled': function() {
    /// <summary>Selects all elements that are enabled.</summary>
  },
  'end': function() {
    /// <summary>End the most recent filtering operation in the current chain and return the set of matched elements to its previous state.</summary>
    /// <returns type="jQuery" />
  },
  'eq': function() {
    /// <signature>
    ///   <summary>Reduce the set of matched elements to the one at the specified index.</summary>
    ///   <param name="index" type="Number">An integer indicating the 0-based position of the element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Reduce the set of matched elements to the one at the specified index.</summary>
    ///   <param name="-index" type="Number">An integer indicating the position of the element, counting backwards  from the last element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'error': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "error" JavaScript event.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute when the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "error" JavaScript event.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'even': function() {
    /// <summary>Selects even elements, zero-indexed.  See also odd.</summary>
  },
  'fadeIn': function() {
    /// <signature>
    ///   <summary>Display the matched elements by fading them to opaque.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display the matched elements by fading them to opaque.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'fadeOut': function() {
    /// <signature>
    ///   <summary>Hide the matched elements by fading them to transparent.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Hide the matched elements by fading them to transparent.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'fadeTo': function() {
    /// <signature>
    ///   <summary>Adjust the opacity of the matched elements.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="opacity" type="Number">A number between 0 and 1 denoting the target opacity.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Adjust the opacity of the matched elements.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="opacity" type="Number">A number between 0 and 1 denoting the target opacity.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'fadeToggle': function() {
    /// <signature>
    ///   <summary>Display or hide the matched elements by animating their opacity.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'file': function() {
    /// <summary>Selects all elements of type file.</summary>
  },
  'filter': function() {
    /// <signature>
    ///   <summary>Reduce the set of matched elements to those that match the selector or pass the function's test.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match the current set of elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Reduce the set of matched elements to those that match the selector or pass the function's test.</summary>
    ///   <param name="function(index)" type="Function">A function used as a test for each element in the set. this is the current DOM element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Reduce the set of matched elements to those that match the selector or pass the function's test.</summary>
    ///   <param name="element" type="Element">An element to match the current set of elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Reduce the set of matched elements to those that match the selector or pass the function's test.</summary>
    ///   <param name="jQuery object" type="Object">An existing jQuery object to match the current set of elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'find': function() {
    /// <signature>
    ///   <summary>Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.</summary>
    ///   <param name="jQuery object" type="Object">A jQuery object to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.</summary>
    ///   <param name="element" type="Element">An element to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'first': function() {
    /// <summary>Selects the first matched element.</summary>
  },
  'first-child': function() {
    /// <summary>Selects all elements that are the first child of their parent.</summary>
  },
  'focus': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "focus" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "focus" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'focusin': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "focusin" event.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "focusin" event.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'focusout': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "focusout" JavaScript event.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "focusout" JavaScript event.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'get': function() {
    /// <signature>
    ///   <summary>Retrieve the DOM elements matched by the jQuery object.</summary>
    ///   <param name="index" type="Number">A zero-based integer indicating which element to retrieve.</param>
    ///   <returns type="Element, Array" />
    /// </signature>
  },
  'gt': function() {
    /// <signature>
    ///   <summary>Select all elements at an index greater than index within the matched set.</summary>
    ///   <param name="index" type="Number">Zero-based index.</param>
    /// </signature>
  },
  'has': function() {
    /// <signature>
    ///   <summary>Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.</summary>
    ///   <param name="contained" type="Element">A DOM element to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'hasClass': function() {
    /// <signature>
    ///   <summary>Determine whether any of the matched elements are assigned the given class.</summary>
    ///   <param name="className" type="String">The class name to search for.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'header': function() {
    /// <summary>Selects all elements that are headers, like h1, h2, h3 and so on.</summary>
  },
  'height': function() {
    /// <signature>
    ///   <summary>Set the CSS height of every matched element.</summary>
    ///   <param name="value" type="Number">An integer representing the number of pixels, or an integer with an optional unit of measure appended (as a string).</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set the CSS height of every matched element.</summary>
    ///   <param name="function(index, height)" type="Function">A function returning the height to set. Receives the index position of the element in the set and the old height as arguments. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'hidden': function() {
    /// <summary>Selects all elements that are hidden.</summary>
  },
  'hide': function() {
    /// <signature>
    ///   <summary>Hide the matched elements.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Hide the matched elements.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'hover': function() {
    /// <signature>
    ///   <summary>Bind two handlers to the matched elements, to be executed when the mouse pointer enters and leaves the elements.</summary>
    ///   <param name="handlerIn(eventObject)" type="Function">A function to execute when the mouse pointer enters the element.</param>
    ///   <param name="handlerOut(eventObject)" type="Function">A function to execute when the mouse pointer leaves the element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'html': function() {
    /// <signature>
    ///   <summary>Set the HTML contents of each element in the set of matched elements.</summary>
    ///   <param name="htmlString" type="String">A string of HTML to set as the content of each matched element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set the HTML contents of each element in the set of matched elements.</summary>
    ///   <param name="function(index, oldhtml)" type="Function">A function returning the HTML content to set. Receives the index position of the element in the set and the old HTML value as arguments. jQuery empties the element before calling the function; use the oldhtml argument to reference the previous content. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'id': function() {
    /// <signature>
    ///   <summary>Selects a single element with the given id attribute.</summary>
    ///   <param name="id" type="String">An ID to search for, specified via the id attribute of an element.</param>
    /// </signature>
  },
  'image': function() {
    /// <summary>Selects all elements of type image.</summary>
  },
  'index': function() {
    /// <signature>
    ///   <summary>Search for a given element from among the matched elements.</summary>
    ///   <param name="selector" type="String">A selector representing a jQuery collection in which to look for an element.</param>
    ///   <returns type="Number" />
    /// </signature>
    /// <signature>
    ///   <summary>Search for a given element from among the matched elements.</summary>
    ///   <param name="element" type="jQuery">The DOM element or first element within the jQuery object to look for.</param>
    ///   <returns type="Number" />
    /// </signature>
  },
  'init': function() {
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression</param>
    ///   <param name="context" type="jQuery">A DOM Element, Document, or jQuery to use as context</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="element" type="Element">A DOM element to wrap in a jQuery object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="object" type="Object">A plain object to wrap in a jQuery object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="elementArray" type="Array">An array containing a set of DOM elements to wrap in a jQuery object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="jQuery object" type="Object">An existing jQuery object to clone.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'innerHeight': function() {
    /// <summary>Get the current computed height for the first element in the set of matched elements, including padding but not border.</summary>
    /// <returns type="Integer" />
  },
  'innerWidth': function() {
    /// <summary>Get the current computed width for the first element in the set of matched elements, including padding but not border.</summary>
    /// <returns type="Integer" />
  },
  'input': function() {
    /// <summary>Selects all input, textarea, select and button elements.</summary>
  },
  'insertAfter': function() {
    /// <signature>
    ///   <summary>Insert every element in the set of matched elements after the target.</summary>
    ///   <param name="target" type="jQuery">A selector, element, HTML string, or jQuery object; the matched set of elements will be inserted after the element(s) specified by this parameter.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'insertBefore': function() {
    /// <signature>
    ///   <summary>Insert every element in the set of matched elements before the target.</summary>
    ///   <param name="target" type="jQuery">A selector, element, HTML string, or jQuery object; the matched set of elements will be inserted before the element(s) specified by this parameter.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'is': function() {
    /// <signature>
    ///   <summary>Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="Boolean" />
    /// </signature>
    /// <signature>
    ///   <summary>Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.</summary>
    ///   <param name="function(index)" type="Function">A function used as a test for the set of elements. It accepts one argument, index, which is the element's index in the jQuery collection.Within the function, this refers to the current DOM element.</param>
    ///   <returns type="Boolean" />
    /// </signature>
    /// <signature>
    ///   <summary>Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.</summary>
    ///   <param name="jQuery object" type="Object">An existing jQuery object to match the current set of elements against.</param>
    ///   <returns type="Boolean" />
    /// </signature>
    /// <signature>
    ///   <summary>Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.</summary>
    ///   <param name="element" type="Element">An element to match the current set of elements against.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'jquery': function() {
    /// <summary>A string containing the jQuery version number.</summary>
    /// <returns type="String" />
  },
  'keydown': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "keydown" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "keydown" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'keypress': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "keypress" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "keypress" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'keyup': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "keyup" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "keyup" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'last': function() {
    /// <summary>Selects the last matched element.</summary>
  },
  'last-child': function() {
    /// <summary>Selects all elements that are the last child of their parent.</summary>
  },
  'length': function() {
    /// <summary>The number of elements in the jQuery object.</summary>
    /// <returns type="Number" />
  },
  'bind': function() {
    /// <signature>
    ///   <summary>Attach an event handler for all elements which match the current selector, now and in the future.</summary>
    ///   <param name="events" type="String">A string containing a JavaScript event type, such as "click" or "keydown." As of jQuery 1.4 the string can contain multiple, space-separated event types or custom event names.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute at the time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Attach an event handler for all elements which match the current selector, now and in the future.</summary>
    ///   <param name="events" type="String">A string containing a JavaScript event type, such as "click" or "keydown." As of jQuery 1.4 the string can contain multiple, space-separated event types or custom event names.</param>
    ///   <param name="data" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute at the time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Attach an event handler for all elements which match the current selector, now and in the future.</summary>
    ///   <param name="events-map" type="Object">A map of one or more JavaScript event types and functions to execute for them.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'load': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "load" JavaScript event.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute when the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "load" JavaScript event.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'lt': function() {
    /// <signature>
    ///   <summary>Select all elements at an index less than index within the matched set.</summary>
    ///   <param name="index" type="Number">Zero-based index.</param>
    /// </signature>
  },
  'map': function() {
    /// <signature>
    ///   <summary>Pass each element in the current matched set through a function, producing a new jQuery object containing the return values.</summary>
    ///   <param name="callback(index, domElement)" type="Function">A function object that will be invoked for each element in the current set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'mousedown': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "mousedown" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "mousedown" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'mouseenter': function() {
    /// <signature>
    ///   <summary>Bind an event handler to be fired when the mouse enters an element, or trigger that handler on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to be fired when the mouse enters an element, or trigger that handler on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'mouseleave': function() {
    /// <signature>
    ///   <summary>Bind an event handler to be fired when the mouse leaves an element, or trigger that handler on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to be fired when the mouse leaves an element, or trigger that handler on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'mousemove': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "mousemove" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "mousemove" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'mouseout': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "mouseout" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "mouseout" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'mouseover': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "mouseover" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "mouseover" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'mouseup': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "mouseup" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "mouseup" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'multiple': function() {
    /// <signature>
    ///   <summary>Selects the combined results of all the specified selectors.</summary>
    ///   <param name="selector1" type="String">Any valid selector.</param>
    ///   <param name="selector2" type="String">Another valid selector.</param>
    ///   <param name="selectorN" type="String">As many more valid selectors as you like.</param>
    /// </signature>
  },
  'next': function() {
    /// <signature>
    ///   <summary>Get the immediately following sibling of each element in the set of matched elements. If a selector is provided, it retrieves the next sibling only if it matches that selector.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'next adjacent': function() {
    /// <signature>
    ///   <summary>Selects all next elements matching "next" that are immediately preceded by a sibling "prev".</summary>
    ///   <param name="prev" type="String">Any valid selector.</param>
    ///   <param name="next" type="String">A selector to match the element that is next to the first selector.</param>
    /// </signature>
  },
  'next siblings': function() {
    /// <signature>
    ///   <summary>Selects all sibling elements that follow after the "prev" element, have the same parent, and match the filtering "siblings" selector.</summary>
    ///   <param name="prev" type="String">Any valid selector.</param>
    ///   <param name="siblings" type="String">A selector to filter elements that are the following siblings of the first selector.</param>
    /// </signature>
  },
  'nextAll': function() {
    /// <signature>
    ///   <summary>Get all following siblings of each element in the set of matched elements, optionally filtered by a selector.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'nextUntil': function() {
    /// <signature>
    ///   <summary>Get all following siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object passed.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to indicate where to stop matching following sibling elements.</param>
    ///   <param name="filter" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Get all following siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object passed.</summary>
    ///   <param name="element" type="Element">A DOM node or jQuery object indicating where to stop matching following sibling elements.</param>
    ///   <param name="filter" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'not': function() {
    /// <signature>
    ///   <summary>Remove elements from the set of matched elements.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove elements from the set of matched elements.</summary>
    ///   <param name="elements" type="Array">One or more DOM elements to remove from the matched set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove elements from the set of matched elements.</summary>
    ///   <param name="function(index)" type="Function">A function used as a test for each element in the set. this is the current DOM element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove elements from the set of matched elements.</summary>
    ///   <param name="jQuery object" type="Object">An existing jQuery object to match the current set of elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'nth-child': function() {
    /// <signature>
    ///   <summary>Selects all elements that are the nth-child of their parent.</summary>
    ///   <param name="index" type="String">The index of each child to match, starting with 1, the string even or odd, or an equation ( eg. :nth-child(even), :nth-child(4n) )</param>
    /// </signature>
  },
  'odd': function() {
    /// <summary>Selects odd elements, zero-indexed.  See also even.</summary>
  },
  'off': function() {
    /// <signature>
    ///   <summary>Remove an event handler.</summary>
    ///   <param name="events" type="String">One or more space-separated event types and optional namespaces, or just namespaces, such as "click", "keydown.myPlugin", or ".myPlugin".</param>
    ///   <param name="selector" type="String">A selector which should match the one originally passed to .on() when attaching event handlers.</param>
    ///   <param name="handler(eventObject)" type="Function">A handler function previously attached for the event(s), or the special value false.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove an event handler.</summary>
    ///   <param name="events-map" type="Object">A map where the string keys represent one or more space-separated event types and optional namespaces, and the values represent handler functions previously attached for the event(s).</param>
    ///   <param name="selector" type="String">A selector which should match the one originally passed to .on() when attaching event handlers.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'offset': function() {
    /// <signature>
    ///   <summary>Set the current coordinates of every element in the set of matched elements, relative to the document.</summary>
    ///   <param name="coordinates" type="Object">An object containing the properties top and left, which are integers indicating the new top and left coordinates for the elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set the current coordinates of every element in the set of matched elements, relative to the document.</summary>
    ///   <param name="function(index, coords)" type="Function">A function to return the coordinates to set. Receives the index of the element in the collection as the first argument and the current coordinates as the second argument. The function should return an object with the new top and left properties.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'offsetParent': function() {
    /// <summary>Get the closest ancestor element that is positioned.</summary>
    /// <returns type="jQuery" />
  },
  'on': function() {
    /// <signature>
    ///   <summary>Attach an event handler function for one or more events to the selected elements.</summary>
    ///   <param name="events" type="String">One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".</param>
    ///   <param name="selector" type="String">A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.</param>
    ///   <param name="data" type="Anything">Data to be passed to the handler in event.data when an event is triggered.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Attach an event handler function for one or more events to the selected elements.</summary>
    ///   <param name="events-map" type="Object">A map in which the string keys represent one or more space-separated event types and optional namespaces, and the values represent a handler function to be called for the event(s).</param>
    ///   <param name="selector" type="String">A selector string to filter the descendants of the selected elements that will call the handler. If the selector is null or omitted, the handler is always called when it reaches the selected element.</param>
    ///   <param name="data" type="Anything">Data to be passed to the handler in event.data when an event occurs.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'one': function() {
    /// <signature>
    ///   <summary>Attach a handler to an event for the elements. The handler is executed at most once per element.</summary>
    ///   <param name="events" type="String">A string containing one or more JavaScript event types, such as "click" or "submit," or custom event names.</param>
    ///   <param name="data" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute at the time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Attach a handler to an event for the elements. The handler is executed at most once per element.</summary>
    ///   <param name="events" type="String">One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".</param>
    ///   <param name="selector" type="String">A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.</param>
    ///   <param name="data" type="Anything">Data to be passed to the handler in event.data when an event is triggered.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Attach a handler to an event for the elements. The handler is executed at most once per element.</summary>
    ///   <param name="events-map" type="Object">A map in which the string keys represent one or more space-separated event types and optional namespaces, and the values represent a handler function to be called for the event(s).</param>
    ///   <param name="selector" type="String">A selector string to filter the descendants of the selected elements that will call the handler. If the selector is null or omitted, the handler is always called when it reaches the selected element.</param>
    ///   <param name="data" type="Anything">Data to be passed to the handler in event.data when an event occurs.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'only-child': function() {
    /// <summary>Selects all elements that are the only child of their parent.</summary>
  },
  'outerHeight': function() {
    /// <signature>
    ///   <summary>Get the current computed height for the first element in the set of matched elements, including padding, border, and optionally margin. Returns an integer (without "px") representation of the value or null if called on an empty set of elements.</summary>
    ///   <param name="includeMargin" type="Boolean">A Boolean indicating whether to include the element's margin in the calculation.</param>
    ///   <returns type="Integer" />
    /// </signature>
  },
  'outerWidth': function() {
    /// <signature>
    ///   <summary>Get the current computed width for the first element in the set of matched elements, including padding and border.</summary>
    ///   <param name="includeMargin" type="Boolean">A Boolean indicating whether to include the element's margin in the calculation.</param>
    ///   <returns type="Integer" />
    /// </signature>
  },
  'parent': function() {
    /// <signature>
    ///   <summary>Get the parent of each element in the current set of matched elements, optionally filtered by a selector.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'parents': function() {
    /// <signature>
    ///   <summary>Get the ancestors of each element in the current set of matched elements, optionally filtered by a selector.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'parentsUntil': function() {
    /// <signature>
    ///   <summary>Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector, DOM node, or jQuery object.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to indicate where to stop matching ancestor elements.</param>
    ///   <param name="filter" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector, DOM node, or jQuery object.</summary>
    ///   <param name="element" type="Element">A DOM node or jQuery object indicating where to stop matching ancestor elements.</param>
    ///   <param name="filter" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'password': function() {
    /// <summary>Selects all elements of type password.</summary>
  },
  'position': function() {
    /// <summary>Get the current coordinates of the first element in the set of matched elements, relative to the offset parent.</summary>
    /// <returns type="Object" />
  },
  'prepend': function() {
    /// <signature>
    ///   <summary>Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.</summary>
    ///   <param name="content" type="jQuery">DOM element, array of elements, HTML string, or jQuery object to insert at the beginning of each element in the set of matched elements.</param>
    ///   <param name="content" type="jQuery">One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert at the beginning of each element in the set of matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.</summary>
    ///   <param name="function(index, html)" type="Function">A function that returns an HTML string, DOM element(s), or jQuery object to insert at the beginning of each element in the set of matched elements. Receives the index position of the element in the set and the old HTML value of the element as arguments. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'prependTo': function() {
    /// <signature>
    ///   <summary>Insert every element in the set of matched elements to the beginning of the target.</summary>
    ///   <param name="target" type="jQuery">A selector, element, HTML string, or jQuery object; the matched set of elements will be inserted at the beginning of the element(s) specified by this parameter.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'prev': function() {
    /// <signature>
    ///   <summary>Get the immediately preceding sibling of each element in the set of matched elements, optionally filtered by a selector.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'prevAll': function() {
    /// <signature>
    ///   <summary>Get all preceding siblings of each element in the set of matched elements, optionally filtered by a selector.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'prevUntil': function() {
    /// <signature>
    ///   <summary>Get all preceding siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to indicate where to stop matching preceding sibling elements.</param>
    ///   <param name="filter" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Get all preceding siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object.</summary>
    ///   <param name="element" type="Element">A DOM node or jQuery object indicating where to stop matching preceding sibling elements.</param>
    ///   <param name="filter" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'promise': function() {
    /// <signature>
    ///   <summary>Return a Promise object to observe when all actions of a certain type bound to the collection, queued or not, have finished.</summary>
    ///   <param name="type" type="String">The type of queue that needs to be observed.</param>
    ///   <param name="target" type="Object">Object onto which the promise methods have to be attached</param>
    ///   <returns type="Promise" />
    /// </signature>
  },
  'prop': function() {
    /// <signature>
    ///   <summary>Set one or more properties for the set of matched elements.</summary>
    ///   <param name="propertyName" type="String">The name of the property to set.</param>
    ///   <param name="value" type="Boolean">A value to set for the property.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set one or more properties for the set of matched elements.</summary>
    ///   <param name="map" type="Object">A map of property-value pairs to set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set one or more properties for the set of matched elements.</summary>
    ///   <param name="propertyName" type="String">The name of the property to set.</param>
    ///   <param name="function(index, oldPropertyValue)" type="Function">A function returning the value to set. Receives the index position of the element in the set and the old property value as arguments. Within the function, the keyword this refers to the current element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'pushStack': function() {
    /// <signature>
    ///   <summary>Add a collection of DOM elements onto the jQuery stack.</summary>
    ///   <param name="elements" type="Array">An array of elements to push onto the stack and make into a new jQuery object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Add a collection of DOM elements onto the jQuery stack.</summary>
    ///   <param name="elements" type="Array">An array of elements to push onto the stack and make into a new jQuery object.</param>
    ///   <param name="name" type="String">The name of a jQuery method that generated the array of elements.</param>
    ///   <param name="arguments" type="Array">The arguments that were passed in to the jQuery method (for serialization).</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'queue': function() {
    /// <signature>
    ///   <summary>Manipulate the queue of functions to be executed on the matched elements.</summary>
    ///   <param name="queueName" type="String">A string containing the name of the queue. Defaults to fx, the standard effects queue.</param>
    ///   <param name="newQueue" type="Array">An array of functions to replace the current queue contents.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Manipulate the queue of functions to be executed on the matched elements.</summary>
    ///   <param name="queueName" type="String">A string containing the name of the queue. Defaults to fx, the standard effects queue.</param>
    ///   <param name="callback( next )" type="Function">The new function to add to the queue, with a function to call that will dequeue the next item.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'radio': function() {
    /// <summary>Selects all  elements of type radio.</summary>
  },
  'ready': function() {
    /// <signature>
    ///   <summary>Specify a function to execute when the DOM is fully loaded.</summary>
    ///   <param name="handler" type="Function">A function to execute after the DOM is ready.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'remove': function() {
    /// <signature>
    ///   <summary>Remove the set of matched elements from the DOM.</summary>
    ///   <param name="selector" type="String">A selector expression that filters the set of matched elements to be removed.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'removeAttr': function() {
    /// <signature>
    ///   <summary>Remove an attribute from each element in the set of matched elements.</summary>
    ///   <param name="attributeName" type="String">An attribute to remove; as of version 1.7, it can be a space-separated list of attributes.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'removeClass': function() {
    /// <signature>
    ///   <summary>Remove a single class, multiple classes, or all classes from each element in the set of matched elements.</summary>
    ///   <param name="className" type="String">One or more space-separated classes to be removed from the class attribute of each matched element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove a single class, multiple classes, or all classes from each element in the set of matched elements.</summary>
    ///   <param name="function(index, class)" type="Function">A function returning one or more space-separated class names to be removed. Receives the index position of the element in the set and the old class value as arguments.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'removeData': function() {
    /// <signature>
    ///   <summary>Remove a previously-stored piece of data.</summary>
    ///   <param name="name" type="String">A string naming the piece of data to delete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove a previously-stored piece of data.</summary>
    ///   <param name="list" type="String">An array or space-separated string naming the pieces of data to delete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'removeProp': function() {
    /// <signature>
    ///   <summary>Remove a property for the set of matched elements.</summary>
    ///   <param name="propertyName" type="String">The name of the property to set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'replaceAll': function() {
    /// <signature>
    ///   <summary>Replace each target element with the set of matched elements.</summary>
    ///   <param name="target" type="String">A selector expression indicating which element(s) to replace.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'replaceWith': function() {
    /// <signature>
    ///   <summary>Replace each element in the set of matched elements with the provided new content.</summary>
    ///   <param name="newContent" type="jQuery">The content to insert. May be an HTML string, DOM element, or jQuery object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Replace each element in the set of matched elements with the provided new content.</summary>
    ///   <param name="function" type="Function">A function that returns content with which to replace the set of matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'reset': function() {
    /// <summary>Selects all elements of type reset.</summary>
  },
  'resize': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "resize" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "resize" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'scroll': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "scroll" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "scroll" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'scrollLeft': function() {
    /// <signature>
    ///   <summary>Set the current horizontal position of the scroll bar for each of the set of matched elements.</summary>
    ///   <param name="value" type="Number">An integer indicating the new position to set the scroll bar to.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'scrollTop': function() {
    /// <signature>
    ///   <summary>Set the current vertical position of the scroll bar for each of the set of matched elements.</summary>
    ///   <param name="value" type="Number">An integer indicating the new position to set the scroll bar to.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'select': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "select" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "select" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'selected': function() {
    /// <summary>Selects all elements that are selected.</summary>
  },
  'serialize': function() {
    /// <summary>Encode a set of form elements as a string for submission.</summary>
    /// <returns type="String" />
  },
  'serializeArray': function() {
    /// <summary>Encode a set of form elements as an array of names and values.</summary>
    /// <returns type="Array" />
  },
  'show': function() {
    /// <signature>
    ///   <summary>Display the matched elements.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display the matched elements.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'siblings': function() {
    /// <signature>
    ///   <summary>Get the siblings of each element in the set of matched elements, optionally filtered by a selector.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'size': function() {
    /// <summary>Return the number of elements in the jQuery object.</summary>
    /// <returns type="Number" />
  },
  'slice': function() {
    /// <signature>
    ///   <summary>Reduce the set of matched elements to a subset specified by a range of indices.</summary>
    ///   <param name="start" type="Number">An integer indicating the 0-based position at which the elements begin to be selected. If negative, it indicates an offset from the end of the set.</param>
    ///   <param name="end" type="Number">An integer indicating the 0-based position at which the elements stop being selected. If negative, it indicates an offset from the end of the set. If omitted, the range continues until the end of the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'slideDown': function() {
    /// <signature>
    ///   <summary>Display the matched elements with a sliding motion.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display the matched elements with a sliding motion.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'slideToggle': function() {
    /// <signature>
    ///   <summary>Display or hide the matched elements with a sliding motion.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display or hide the matched elements with a sliding motion.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'slideUp': function() {
    /// <signature>
    ///   <summary>Hide the matched elements with a sliding motion.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Hide the matched elements with a sliding motion.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'stop': function() {
    /// <signature>
    ///   <summary>Stop the currently-running animation on the matched elements.</summary>
    ///   <param name="clearQueue" type="Boolean">A Boolean indicating whether to remove queued animation as well. Defaults to false.</param>
    ///   <param name="jumpToEnd" type="Boolean">A Boolean indicating whether to complete the current animation immediately. Defaults to false.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Stop the currently-running animation on the matched elements.</summary>
    ///   <param name="queue" type="String">The name of the queue in which to stop animations.</param>
    ///   <param name="clearQueue" type="Boolean">A Boolean indicating whether to remove queued animation as well. Defaults to false.</param>
    ///   <param name="jumpToEnd" type="Boolean">A Boolean indicating whether to complete the current animation immediately. Defaults to false.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'submit': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "submit" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "submit" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'text': function() {
    /// <signature>
    ///   <summary>Set the content of each element in the set of matched elements to the specified text.</summary>
    ///   <param name="textString" type="String">A string of text to set as the content of each matched element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set the content of each element in the set of matched elements to the specified text.</summary>
    ///   <param name="function(index, text)" type="Function">A function returning the text content to set. Receives the index position of the element in the set and the old text value as arguments.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'toArray': function() {
    /// <summary>Retrieve all the DOM elements contained in the jQuery set, as an array.</summary>
    /// <returns type="Array" />
  },
  'toggle': function() {
    /// <signature>
    ///   <summary>Display or hide the matched elements.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display or hide the matched elements.</summary>
    ///   <param name="duration" type="Number">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="callback" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display or hide the matched elements.</summary>
    ///   <param name="showOrHide" type="Boolean">A Boolean indicating whether to show or hide the elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'toggleClass': function() {
    /// <signature>
    ///   <summary>Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the switch argument.</summary>
    ///   <param name="className" type="String">One or more class names (separated by spaces) to be toggled for each element in the matched set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the switch argument.</summary>
    ///   <param name="className" type="String">One or more class names (separated by spaces) to be toggled for each element in the matched set.</param>
    ///   <param name="switch" type="Boolean">A Boolean (not just truthy/falsy) value to determine whether the class should be added or removed.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the switch argument.</summary>
    ///   <param name="switch" type="Boolean">A boolean value to determine whether the class should be added or removed.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the switch argument.</summary>
    ///   <param name="function(index, class, switch)" type="Function">A function that returns class names to be toggled in the class attribute of each element in the matched set. Receives the index position of the element in the set, the old class value, and the switch as arguments.</param>
    ///   <param name="switch" type="Boolean">A boolean value to determine whether the class should be added or removed.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'trigger': function() {
    /// <signature>
    ///   <summary>Execute all handlers and behaviors attached to the matched elements for the given event type.</summary>
    ///   <param name="eventType" type="String">A string containing a JavaScript event type, such as click or submit.</param>
    ///   <param name="extraParameters" type="Object">Additional parameters to pass along to the event handler.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Execute all handlers and behaviors attached to the matched elements for the given event type.</summary>
    ///   <param name="event" type="Event">A jQuery.Event object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'triggerHandler': function() {
    /// <signature>
    ///   <summary>Execute all handlers attached to an element for an event.</summary>
    ///   <param name="eventType" type="String">A string containing a JavaScript event type, such as click or submit.</param>
    ///   <param name="extraParameters" type="Array">An array of additional parameters to pass along to the event handler.</param>
    ///   <returns type="Object" />
    /// </signature>
  },
  'unbind': function() {
    /// <signature>
    ///   <summary>Remove a previously-attached event handler from the elements.</summary>
    ///   <param name="eventType" type="String">A string containing a JavaScript event type, such as click or submit.</param>
    ///   <param name="handler(eventObject)" type="Function">The function that is to be no longer executed.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove a previously-attached event handler from the elements.</summary>
    ///   <param name="eventType" type="String">A string containing a JavaScript event type, such as click or submit.</param>
    ///   <param name="false" type="Boolean">Unbinds the corresponding 'return false' function that was bound using .bind( eventType, false ).</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove a previously-attached event handler from the elements.</summary>
    ///   <param name="event" type="Object">A JavaScript event object as passed to an event handler.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'undelegate': function() {
    /// <signature>
    ///   <summary>Remove a handler from the event for all elements which match the current selector, based upon a specific set of root elements.</summary>
    ///   <param name="selector" type="String">A selector which will be used to filter the event results.</param>
    ///   <param name="eventType" type="String">A string containing a JavaScript event type, such as "click" or "keydown"</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove a handler from the event for all elements which match the current selector, based upon a specific set of root elements.</summary>
    ///   <param name="selector" type="String">A selector which will be used to filter the event results.</param>
    ///   <param name="eventType" type="String">A string containing a JavaScript event type, such as "click" or "keydown"</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute at the time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove a handler from the event for all elements which match the current selector, based upon a specific set of root elements.</summary>
    ///   <param name="selector" type="String">A selector which will be used to filter the event results.</param>
    ///   <param name="events" type="Object">A map of one or more event types and previously bound functions to unbind from them.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove a handler from the event for all elements which match the current selector, based upon a specific set of root elements.</summary>
    ///   <param name="namespace" type="String">A string containing a namespace to unbind all events from.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'unload': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "unload" JavaScript event.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute when the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "unload" JavaScript event.</summary>
    ///   <param name="eventData" type="Object">A map of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'unwrap': function() {
    /// <summary>Remove the parents of the set of matched elements from the DOM, leaving the matched elements in their place.</summary>
    /// <returns type="jQuery" />
  },
  'val': function() {
    /// <signature>
    ///   <summary>Set the value of each element in the set of matched elements.</summary>
    ///   <param name="value" type="String">A string of text or an array of strings corresponding to the value of each matched element to set as selected/checked.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set the value of each element in the set of matched elements.</summary>
    ///   <param name="function(index, value)" type="Function">A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old value as arguments.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'visible': function() {
    /// <summary>Selects all elements that are visible.</summary>
  },
  'width': function() {
    /// <signature>
    ///   <summary>Set the CSS width of each element in the set of matched elements.</summary>
    ///   <param name="value" type="Number">An integer representing the number of pixels, or an integer along with an optional unit of measure appended (as a string).</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set the CSS width of each element in the set of matched elements.</summary>
    ///   <param name="function(index, width)" type="Function">A function returning the width to set. Receives the index position of the element in the set and the old width as arguments. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'wrap': function() {
    /// <signature>
    ///   <summary>Wrap an HTML structure around each element in the set of matched elements.</summary>
    ///   <param name="wrappingElement" type="jQuery">An HTML snippet, selector expression, jQuery object, or DOM element specifying the structure to wrap around the matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Wrap an HTML structure around each element in the set of matched elements.</summary>
    ///   <param name="function(index)" type="Function">A callback function returning the HTML content or jQuery object to wrap around the matched elements. Receives the index position of the element in the set as an argument. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'wrapAll': function() {
    /// <signature>
    ///   <summary>Wrap an HTML structure around all elements in the set of matched elements.</summary>
    ///   <param name="wrappingElement" type="jQuery">An HTML snippet, selector expression, jQuery object, or DOM element specifying the structure to wrap around the matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'wrapInner': function() {
    /// <signature>
    ///   <summary>Wrap an HTML structure around the content of each element in the set of matched elements.</summary>
    ///   <param name="wrappingElement" type="String">An HTML snippet, selector expression, jQuery object, or DOM element specifying the structure to wrap around the content of the matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Wrap an HTML structure around the content of each element in the set of matched elements.</summary>
    ///   <param name="function(index)" type="Function">A callback function which generates a structure to wrap around the content of the matched elements. Receives the index position of the element in the set as an argument. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
});

intellisense.annotate(window, {
  '$': function() {
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression</param>
    ///   <param name="context" type="jQuery">A DOM Element, Document, or jQuery to use as context</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="element" type="Element">A DOM element to wrap in a jQuery object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="object" type="Object">A plain object to wrap in a jQuery object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="elementArray" type="Array">An array containing a set of DOM elements to wrap in a jQuery object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="jQuery object" type="Object">An existing jQuery object to clone.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
});



/* Flex Level Drop Down Menu
* Created: Jan 5th, 2010 by DynamicDrive.com. This notice must stay intact for usage 
* Author: Dynamic Drive at http://www.dynamicdrive.com/
* Visit http://www.dynamicdrive.com/ for full source code
*/

//Version 1.1 (Feb 19th, 2010): Each flex menu (UL) can now be associated with a link dynamically, and/or defined using JavaScript instead of as markup.
//Version 1.2 (July 2nd, 2011): Menu updated to work properly in popular mobile devices such as iPad/iPhone and Android tablets.
//Version 1.3 (Nov 28th, 2011): Script now dynamically adds a class of "selected" to the anchor link while its drop down menu is expanded, for easy styling of the anchor link during its "open" state.

//Usage: $(elementselector).addflexmenu('menuid', options)
//ie:
//jQuery(document).ready(function($){
	//$('a.mylinks').addflexmenu('flexmenu1') //apply flex menu with ID "flexmenu1" to links with class="mylinks"
//})

jQuery.noConflict()

var flexdropdownmenu={
	arrowpath: 'arrow.gif', //full URL or path to arrow image
	animspeed: 200, //reveal animation speed (in milliseconds)
	showhidedelay: [150, 150], //delay before menu appears and disappears when mouse rolls over it, in milliseconds

	//***** NO NEED TO EDIT BEYOND HERE
	startzindex:1000,
	ismobile:navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) != null, //boolean check for popular mobile browsers
	builtflexmenuids: [], //ids of flex menus already built (to prevent repeated building of same flex menu)

	positionul:function($, $ul, e, $anchor){
		var istoplevel=$ul.hasClass('jqflexmenu') //Bool indicating whether $ul is top level flex menu DIV
		var docrightedge=$(document).scrollLeft()+$(window).width()-40 //40 is to account for shadows in FF
		var docbottomedge=$(document).scrollTop()+$(window).height()-40
		if (istoplevel){ //if main flex menu DIV
			var offsets=$anchor.offset()
			var anchorsetting=$anchor.data('setting')
			var x=offsets.left+anchorsetting.useroffsets[0]+(anchorsetting.dir=="h"? $anchor.outerWidth() : 0) //x pos of main flex menu UL
			var y=offsets.top+anchorsetting.useroffsets[1]+(anchorsetting.dir=="h"? 0 : $anchor.outerHeight())
			x=(x+$ul.data('dimensions').w > docrightedge)? x-(anchorsetting.useroffsets[0]*2)-$ul.data('dimensions').w+$anchor.outerWidth()+(anchorsetting.dir=="h"? -($anchor.outerWidth()*2) : 0) : x //if not enough horizontal room to the ridge of the cursor
			y=(y+$ul.data('dimensions').h > docbottomedge)? y-(anchorsetting.useroffsets[1]*2)-$ul.data('dimensions').h-$anchor.outerHeight()+(anchorsetting.dir=="h"? ($anchor.outerHeight()*2) : 0) : y
		}
		else{ //if sub level flex menu UL
			var $parentli=$ul.data('$parentliref')
			var parentlioffset=$parentli.offset()
			var x=$ul.data('dimensions').parentliw //x pos of sub UL
			var y=0
			x=(parentlioffset.left+x+$ul.data('dimensions').w > docrightedge)? x-$ul.data('dimensions').parentliw-$ul.data('dimensions').w : x //if not enough horizontal room to the ridge parent LI
			y=(parentlioffset.top+$ul.data('dimensions').h > docbottomedge)? y-$ul.data('dimensions').h+$ul.data('dimensions').parentlih : y
		}
		$ul.css({left:x, top:y})
	},
	
	showbox:function($, $target, $flexmenu, e){
		clearTimeout($flexmenu.data('timers').hidetimer)
		$flexmenu.data('timers').showtimer=setTimeout(function(){$target.addClass('selected'); $flexmenu.show(flexdropdownmenu.animspeed)}, this.showhidedelay[0])
	},

	hidebox:function($, $target, $flexmenu){
		clearTimeout($flexmenu.data('timers').showtimer)
		$flexmenu.data('timers').hidetimer=setTimeout(function(){$target.removeClass('selected'); $flexmenu.hide(100)}, this.showhidedelay[1]) //hide flex menu plus all of its sub ULs
	},


	buildflexmenu:function($, $menu, $target){
		$menu.css({display:'block', visibility:'hidden', zIndex:this.startzindex}).addClass('jqflexmenu').appendTo(document.body)
		$menu.bind('mouseenter', function(){
			clearTimeout($menu.data('timers').hidetimer)
		})		
		$menu.bind('mouseleave', function(){ //hide menu when mouse moves out of it
			flexdropdownmenu.hidebox($, $target, $menu)
		})
		$menu.data('dimensions', {w:$menu.outerWidth(), h:$menu.outerHeight()}) //remember main menu's dimensions
		$menu.data('timers', {})
		var $lis=$menu.find("ul").parent() //find all LIs within menu with a sub UL
		$lis.each(function(i){
			var $li=$(this).css({zIndex: 1000+i})
			var $subul=$li.find('ul:eq(0)').css({display:'block'}) //set sub UL to "block" so we can get dimensions
			$subul.data('dimensions', {w:$subul.outerWidth(), h:$subul.outerHeight(), parentliw:this.offsetWidth, parentlih:this.offsetHeight})
			$subul.data('$parentliref', $li) //cache parent LI of each sub UL
			$subul.data('timers', {})
			$li.data('$subulref', $subul) //cache sub UL of each parent LI
			$li.children("a:eq(0)").append( //add arrow images
				'<img src="'+flexdropdownmenu.arrowpath+'" class="rightarrowclass" style="border:0;" />'
			)
			$li.bind(flexdropdownmenu.triggerevt, function(e){ //show sub UL when mouse moves over parent LI
				var $targetul=$(this).css('zIndex', ++flexdropdownmenu.startzindex).addClass("selected").data('$subulref')
				if ($targetul.queue().length<=1){ //if 1 or less queued animations
					clearTimeout($targetul.data('timers').hidetimer)
					$targetul.data('timers').showtimer=setTimeout(function(){
						flexdropdownmenu.positionul($, $targetul, e)
						$targetul.show(flexdropdownmenu.animspeed)
					}, flexdropdownmenu.showhidedelay[0])
					if (flexdropdownmenu.triggerevt=="click" && $(e.target).next('ul').length==1) //if LI being clicked on is a menu header
						return false
				}
			})
			$li.bind('mouseleave', function(e){ //hide sub UL when mouse moves out of parent LI
				var $targetul=$(this).data('$subulref')
				clearTimeout($targetul.data('timers').showtimer)
				$targetul.data('timers').hidetimer=setTimeout(function(){$targetul.hide(100).data('$parentliref').removeClass('selected')}, flexdropdownmenu.showhidedelay[1])
			})
		})
		$menu.find('ul').andSelf().css({display:'none', visibility:'visible'}) //collapse all ULs again
		this.builtflexmenuids.push($menu.get(0).id) //remember id of flex menu that was just built
	},

	

	init:function($, $target, $flexmenu){
		this.triggerevt=(this.ismobile)? "click" : "mouseenter"
		this.showhidedelay[0]=(this.ismobile)? 0 : this.showhidedelay[0]
		if (this.builtflexmenuids.length==0){ //only bind click event to document once
			$(document).bind("click", function(e){
				if (e.button==0){ //hide all flex menus (and their sub ULs) when left mouse button is clicked
					$('.jqflexmenu').find('ul').andSelf().hide()
				}
			})
		}
		if (jQuery.inArray($flexmenu.get(0).id, this.builtflexmenuids)==-1) //if this flex menu hasn't been built yet
			this.buildflexmenu($, $flexmenu, $target)
		if ($target.parents().filter('ul.jqflexmenu').length>0) //if $target matches an element within the flex menu markup, don't bind onflexmenu to that element
			return
		var useroffsets=$target.attr('data-offsets')? $target.attr('data-offsets').split(',') : [0,0] //get additional user offsets of menu
		useroffsets=[parseInt(useroffsets[0]), parseInt(useroffsets[1])]
		$target.data('setting', {dir: $target.attr('data-dir'), useroffsets: useroffsets}) //store direction (drop right or down) of menu plus user offsets
		$target.bind(flexdropdownmenu.triggerevt, function(e){
			$flexmenu.css('zIndex', ++flexdropdownmenu.startzindex)
			flexdropdownmenu.positionul($, $flexmenu, e, $target)
			flexdropdownmenu.showbox($, $target, $flexmenu, e)
			if (flexdropdownmenu.triggerevt=="click")
				e.preventDefault()
		})
		$target.bind("mouseleave", function(e){
			flexdropdownmenu.hidebox($, $target, $flexmenu)
		})
	}
}

jQuery.fn.addflexmenu=function(flexmenuid, options){
	var $=jQuery
	return this.each(function(){ //return jQuery obj
		var $target=$(this)
		if (typeof options=="object"){ //if options parameter defined
			if (options.dir)
				$target.attr('data-dir', options.dir) //set/overwrite data-dir attr with defined value
			if (options.offsets)
				$target.attr('data-offsets', options.offsets) //set/overwrite data-offsets attr with defined value
		}
		if ($('#'+flexmenuid).length==1) //check flex menu is defined
			flexdropdownmenu.init($, $target, $('#'+flexmenuid))
	})
};

//By default, add flex menu to anchor links with attribute "data-flexmenu"
jQuery(document).ready(function($){
	var $anchors=$('*[data-flexmenu]')
	$anchors.each(function(){
		$(this).addflexmenu(this.getAttribute('data-flexmenu'))
	})
})


//ddlistmenu: Function to define a UL list menu dynamically

function ddlistmenu(id, className){
	var menu=document.createElement('ul')
	if (id)
		menu.id=id
	if (className)
		menu.className=className
	this.menu=menu
}

ddlistmenu.prototype={
	addItem:function(url, text, target){
		var li=document.createElement('li')
		li.innerHTML='<a href="'+url+'" target="'+target+'">'+text+'</a>'
		this.menu.appendChild(li)
		this.li=li
		return this
	},
	addSubMenu:function(){
		var s=new ddlistmenu(null, null)
		this.li.appendChild(s.menu)
		return s

	}
}






﻿Application2.Index = function (params) {

    var viewModel = {
        //  Put the binding properties here

        viewShown: function () {
            //window.CookiesData = Application2.db.sampleData;
            if (window.mytimer == null) {
                MyApp();
            }
            if (window.ClearChatTimer != undefined)
                window.clearInterval(window.ClearChatTimer);

            _ObjectTimeStamp = "None";
            _CanvasTimeStamp = "None";
            //$('#c').empty();
            $('#c').remove();

            //if ($("#c").length == 0) {
            $("#header").curtain();
            if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
                $("#c").append('<div  style="text-align:left;color:blue;background: none; float:left;color:#fff;">Id :</div>');
                $("#c").append('<div id="MeetingIdlbl" style="text-align:left;color:blue;background:none;float:left;color:#fff;padding:0 0 0 4px;"></div>');
                $("#MeetingIdlbl").html(window.meeting.MeetingId());
            }
            //}
        }
    };
    return viewModel;
};


function MyApp() {

    AddColor("penlinecolor");//adding colors for circlelinecolor
    AddColor("circlelinecolor");//adding colors for circlelinecolor
    AddColor("circlefillcolor");//adding colors for circlefillcolor

    AddColor("highlighterlinecolor");//adding colors for circlelinecolor


    AddColor("LineColor");//adding colors for circlelinecolor


    AddColor("trianglelinecolor");//adding colors for circlelinecolor
    AddColor("trianglefillcolor");//adding colors for circlefillcolor

    AddColor("rectanglelinecolor");//adding colors for circlelinecolor
    AddColor("rectanglefillcolor");//adding colors for circlefillcolor

    AddColor("FontColor");//adding colors for circlefillcolor

    AddLineWidth("penwidth");//adding colors for circlelinecolor
    AddLineWidth("highlighterwidth");//adding colors for circlelinecolor
    AddLineWidth("LineWidth");//adding colors for circlelinecolor
    AddLineWidth("circlelinewidth");//adding colors for circlelinecolor
    AddLineWidth("trianglelinewidth");//adding colors for circlelinecolor
    AddLineWidth("rectanglelinewidth");//adding colors for circlelinecolor




    //if (window.ClearChatTimer != undefined)
    //    window.clearInterval(window.ClearChatTimer);

    //window.url = "http://192.168.2.146:90/WcfService/Message.svc/";
    window.url = "http://www.cube-share.com/WCFService/Message.svc/";
    // window.url = "http://192.168.2.93/WcfService/Message.svc/";

    //// window.WebsiteUrl = "http://192.168.2.146:90/CubeShare/default.aspx?MeetingId=";
    //   window.WebsiteUrl = "http://80.68.43.56/CubeShare/default.aspx?MeetingId=";
    // //window.WebsiteUrl = "http://54.214.15.172/CubeShare/default.aspx?MeetingId=";

    ////  window.WebSite = "http://192.168.2.146:90/CubeShare/";
    //   window.WebSite = "http://80.68.43.56/CubeShare/";
    //  // window.WebSite = "http://54.214.15.172/CubeShare/";


   //  window.WebSite = "http://192.168.2.146:90/CubeShare/";
    window.WebSite = "http://www.cube-share.com/";
    //  window.WebSite = "http://192.168.2.93/CS1/";

    //prashant 20-06-2013-------------------------------------------------------------

    var content = $(".layout-content").get(0);
    var footer = $(".layout-footer").get(0);
    var objCanvas = $("#mycanvas").get(0);
    var objtempCanvas = $("#tempCanvas").get(0);

    objCanvas.height = content.offsetHeight - (footer.offsetHeight + 20);
    objCanvas.width = content.offsetWidth;
    objtempCanvas.height = objCanvas.height;
    objtempCanvas.width = objCanvas.width;
    $("#myBody").css("height", objCanvas.height);
    $("#myBody").css("width", objCanvas.width);
    $("#grid").css("height", objCanvas.height);
    $("#grid").css("width", objCanvas.width);

    //----------------------------------------------------------------------------------


    //bgCanvas.height = objCanvas.height;
    //bgCanvas.width = objCanvas.width;


    window.canvas = new DrawingCanvas();
    window.CanvasHeight = objCanvas.height;
    window.CanvasWidth = objCanvas.width;





    //set default Tool Option
    window.canvas.ToolOption("Pen");
    shwData(2);

    //$(document).bind("keydown", function (e) {
    //    if (e.which == 46) {
    //        window.canvas.DeleteSelected();
    //    }
    //});

    $("#penwidth").change(function () {
        setDrawingOption("PenLineWidth", this.value);
    });

    $("#penlinecolor").change(function () {
        //window.IsPaused = true;
        setDrawingOption("PenLineColor", this.value);
        var pencolor = this.value;

        $.ajax({
            url: window.url + "UpdateMemberPenColor",
            data: { MeetingId: JSON.stringify(window.meeting.MeetingId()), UserId: JSON.stringify(window.meeting.UserID()), Color: JSON.stringify(pencolor) },
            dataType: "jsonp",
            //success: UpdateMem,
            success: UpdateMemberList,
            error: function () {
                alert("Unable to Update Member");
            }
        });
    });

    $("#highlighterwidth").change(function () {
        setDrawingOption("HighlighterLineWidth", this.value);
    });
    $("#highlighterlinecolor").change(function () {
        setDrawingOption("HighlighterLineColor", this.value);
    });

    $("#circlelinewidth").change(function () {
        setDrawingOption("CircleLineWidth", this.value);
    });
    $("#circlelinecolor").change(function () {
        setDrawingOption("CircleLineColor", this.value);
    });
    $("#circlefillcolor").change(function () {
        setDrawingOption("CircleFillColor", this.value);
    });

    $("#trianglelinewidth").change(function () {
        setDrawingOption("TriangleLineWidth", this.value);
    });
    $("#trianglelinecolor").change(function () {
        setDrawingOption("TriangleLineColor", this.value);
    });
    $("#trianglefillcolor").change(function () {
        setDrawingOption("TriangleFillColor", this.value);
    });

    $("#rectanglelinewidth").change(function () {
        setDrawingOption("RectangleLineWidth", this.value);
    });
    $("#rectanglelinecolor").change(function () {
        setDrawingOption("RectangleLineColor", this.value);
    });
    $("#rectanglefillcolor").change(function () {
        setDrawingOption("RectangleFillColor", this.value);
    });

    $("#LineWidth").change(function () {
        setDrawingOption("LineWidth", this.value);
    });

    $("#LineColor").change(function () {
        setDrawingOption("LineColor", this.value);
    });

    $("#Fontfamily").change(function () {
        setDrawingOption("FontFamily", this.value);
    });

    $("#FontColor").change(function () {
        setDrawingOption("FontColor", this.value);
    });





    _ObjectTimeStamp = "None";
    //window.mytimer = window.setInterval(LoadList, 1000);

   // window.mytimer = new Timer();
   // window.mytimer.Start();


    window.setInterval(ClearInfo, 10000);

    //set default drawing tool options
    $("#penwidth").val(window.canvas.penWidth());

    if (window.penColor == undefined)
        $("#penlinecolor").val(window.canvas.penColor());
    else {
        window.canvas.penColor(window.penColor);
        $("#penlinecolor").val(window.penColor);
    }

    $("#highlighterwidth").val(window.canvas.highlighterPenWidth());
    $("#highlighterlinecolor").val(window.canvas.highlighterPenColor());
    $("#circlelinewidth").val(window.canvas.circleLineWidth());
    $("#circlelinecolor").val(window.canvas.circleLineColor());
    $("#circlefillcolor").val(window.canvas.circleFillColor());
    $("#trianglelinewidth").val(window.canvas.triangleLineWidth());
    $("#trianglelinecolor").val(window.canvas.triangleLineColor());
    $("#trianglefillcolor").val(window.canvas.triangleFillColor());
    $("#rectanglelinewidth").val(window.canvas.rectangleLineWidth());
    $("#rectanglelinecolor").val(window.canvas.rectangleLineColor());
    $("#rectanglefillcolor").val(window.canvas.rectangleFillColor());

    $("#LineWidth").val(window.canvas.LineWidth());
    $("#LineColor").val(window.canvas.LineColor());

    $("#Fontfamily").val(window.canvas.FontFamily());
    $("#FontColor").val(window.canvas.FontColor());


    if (_BackGroung.indexOf('http://') != -1) {
        //  var url = "url(" + _BackGroung + ")";
        $("#bgcanvasimg").attr("src", _BackGroung);
        $("#bgcanvasimg").css("display", "block");
    }
    else {
        $("#bgcanvasimg").css("display", "none");
        $("#bgcanvas").css("background", _BackGroung);
    }

    // alert(_BackGroung);
    var f = false;
    if (_GridType == "LargeGrid") {
        //$("#grid").css("background", 'url(Resources/Large.png)');
        $("#grid").attr("src", 'Resources/Large.png');
        f = true;
    }
    else if (_GridType == "MidiamGrid") {
        $("#grid").attr("src", 'Resources/Midiam.png');
        f = true;
    }
    else if (_GridType == "SmallGrid") {
        $("#grid").attr("src", 'Resources/Small.png');
        f = true;
    }
    if (f)
        $("#grid").css("display", 'block');
    else
        $("#grid").css("display", 'none');



    //$("#bgcanvas").height(content.offsetHeight);
    //var h = ((content.offsetHeight - 180) / 9) + 10;
    //$("#menu li").css("height", h);
    //$(".main_pointer_li_div").css("margin-top", (h - 20) / 2);
    //$("#menu li").css("line-height", h + "px");


    var w = ((content.offsetWidth - 200) / 12) + 10;
    if (w > 34)
        w = 34;
    else if (w < 21)
        w = 25;

    //$("#tab_div ul li img,#joinMeeting").css("width", w);
    $("#tab_div ul li img,#UploadImage").css("width", w);

    //if (window.MeetingState!=undefined) {
    //    if (window.MeetingState == "Start") {
    //        $("#joinMeeting").attr("src", "Resources/stop.png")
    //        $("#joine_meetion").attr("title", "Exit Meeting")
    //    }
    //    else if (window.MeetingState == "Stop") {
    //        $("#joinMeeting").attr("src", "images/join-meetion.png")
    //        $("#joine_meetion").attr("title", "Start Meeting")
    //    }
    //}


    if (window.meeting == undefined) {
        $("#MeetingIdPrompt").css({
            "display": 'block',
            "left": "0px",
            "top": "0px",
            //"background-color": "white",
            "height": '100%',
            "width": '100%',
            "z-index": '10000'
        });
        $('#txtMeetingId').focus();

        if (window.cookiesMId != "") {
            $("#txtMeetingId").val(window.cookiesMId);
        }

        //var logindiv = $("#logindiv").get(0);
        //var logindivHeight = logindiv.offsetHeight;

        //var padding = (content.offsetHeight - logindivHeight) /2;
        //$("#logindiv").css({
        //    "padding-top": padding
        //});



    }

}

function AddColor(ToolName) {
    $(document).ready(function () {
        for (var i in ColourArray) {
            for (var j in ColourArray[i]) {
                $("#" + ToolName).append(new Option(ColourArray[i][j]));
            }
        }

    });
}

function AddLineWidth(ToolName) {
    $(document).ready(function () {
        for (var i in BorderLineWidthArray) {
            $("#" + ToolName).append(new Option(BorderLineWidthArray[i]));
        }

    });
}


var Timer = function () {
    var interval = 1000;
    var obj = null;
    var _IsStop = false;
    var col = new Array();
    this.Start = function () {
        if (obj !== null) return;
        col.pop();

        if (col.length == 0) {
            obj = setInterval(LoadList, interval);
            _IsStop = false;
        }

    };
    this.Stop = function () {
        col.push("Stop");
        clearInterval(obj);
        obj = null;
        _IsStop = true;

    }
    this.ForceStart = function () {
        var l = col.length;
        for (var i = 0; i < l; i++)
            col.pop();

        obj = setInterval(LoadList, interval);
        _IsStop = false;
       
    }

    this.IsStop = function () {
        return _IsStop;
    }
};



function setDrawingOption(to, value) {
    var obj = window.canvas.GetSelectedObj();
    if (obj != null) {
        obj.SetDrawingOption(to, value);
        window.canvas.Draw();
        //window.IsPaused = true;

        //deepak
        //if (window.IsMeetingStarted && CanPost()) {
        if (window.meeting != undefined && window.meeting.IsMeetingStarted() && CanPost()) {
            window.mytimer.Stop();
            //var propertyValue = obj.GetProperty();
            var propertyValue = obj.getPropertyObj();
            $.ajax({
                url: window.url + "UpdateObject",
                // data: { MeetingId: JSON.stringify(window.meetingId), Obj: JSON.stringify(propertyValue) },
                data: { MeetingId: JSON.stringify(window.meeting.MeetingId()), Obj: JSON.stringify(propertyValue) },
                dataType: "jsonp",
                success: UpdateTimeStamp,
                error: function () {
                    alert("Hit error fn!");
                }
            });

        }
    }

    if (to == "PenLineWidth")
        window.canvas.penWidth(parseInt(value));
    if (to == "PenLineColor")
        window.canvas.penColor(value);

    if (to == "HighlighterLineWidth")
        window.canvas.highlighterPenWidth(parseInt(value));
    if (to == "HighlighterLineColor")
        window.canvas.highlighterPenColor(value);


    if (to == "CircleLineWidth")
        window.canvas.circleLineWidth(parseInt(value));
    if (to == "CircleLineColor")
        window.canvas.circleLineColor(value);
    if (to == "CircleFillColor")
        window.canvas.circleFillColor(value);

    if (to == "TriangleLineWidth")
        window.canvas.triangleLineWidth(parseInt(value));
    if (to == "TriangleLineColor")
        window.canvas.triangleLineColor(value);
    if (to == "TriangleFillColor")
        window.canvas.triangleFillColor(value);

    if (to == "RectangleLineWidth")
        window.canvas.rectangleLineWidth(parseInt(value));
    if (to == "RectangleLineColor")
        window.canvas.rectangleLineColor(value);
    if (to == "RectangleFillColor")
        window.canvas.rectangleFillColor(value);

    if (to == "LineWidth")
        window.canvas.LineWidth(parseInt(value));
    if (to == "LineColor")
        window.canvas.LineColor(value);

    if (to == "FontFamily")
        window.canvas.FontFamily(value);
    if (to == "FontColor")
        window.canvas.FontColor(value);
}

//$("#joine_meetion").bind("click", function () {
//    if ($("#joine_meetion").attr("title") == "Exit Meeting") {
//        //call the stop meeting function

//        window.canvas.Clear();
//        window.meeting.IsMeetingStarted(false);

//        _BackGroung = "white";
//        $("#bgcanvas").css("background", _BackGroung);
//        $("#grid").css("background", '');
//        $("#bgcanvasimg").css("display", "none");

//        $.ajax({
//            url: window.url + "RemoveMember",
//            data: { MeetingId: JSON.stringify(window.meeting.MeetingId()), MemberID: JSON.stringify(window.meeting.UserID()) },
//            dataType: "jsonp"
//        });
//        window.meeting = undefined;
//        $("#mamber_div").text("Members");
//        window.MeetingState = "Stop";
//        window.Env_MettingId = undefined;
//        $("#joinMeeting").attr("src", "images/join-meetion.png")
//        $("#joine_meetion").attr("title", "Start Meeting")

//    }
//    else {
//         $("#MeetingIdPrompt").css("display", 'block');
//        var left = (window.CanvasWidth - $("#MeetingIdPrompt").width()) / 2;
//        var top = (window.CanvasHeight - $("#MeetingIdPrompt").height()) / 2;
//        $("#MeetingIdPrompt").css("left", left);
//        $("#MeetingIdPrompt").css("top", top);
//      }
//});

$(document).on('click', "#btnok", function () {
    //$("#btnok").bind("click", function () {

    if (document.getElementById('displayMsg').innerHTML.indexOf('Entered') == 0 || document.getElementById('displayMsg').innerHTML.indexOf('Start') == 0 || document.getElementById('displayMsg').innerHTML.indexOf('Overflow') == 0) {
        AlertMeetingNotAvail();
    }
    $("#displayMsg").val("");
    $("#alertBox").hide();

});


$(document).on('click', "#SetMeetingOk", function () {
    if ($("#txtMeetingId").val() != "") {
        //alert("enter");
        SetMeetings($("#txtMeetingId").val());
        $("#txtMeetingId").val("");
        $("#MeetingIdPrompt").hide();
        window.MeetingState = "Start";
        $("#exitMeeting").css("display", "block");
    }
});

//$("#SetMeetingCancel").bind("click", function () {
//    $("#txtMeetingId").val("");
//    // $("#MeetingIdPrompt").hide();
//    $("#MeetingIdPrompt").css("display", 'none');

//});


//function middleHeight() {
//   // var th = $(window).height() - $("#main_header").height();

//    var th = $(".layout-content").get(0).offsetHeight;

//    $("#bgcanvas").height(th);
//    var h = ((th - 180) / 9) + 10;
//    $("#menu li").css("height", h);
//    $(".main_pointer_li_div").css("margin-top", (h - 20) / 2);
//    $("#menu li").css("line-height", h + "px");
//};
//$(window).resize(middleHeight);
//$(document).ready(middleHeight);

//
//var ColourArray = {};
//ColourArray['#B0171F'] = 'Red';
//ColourArray['#DC143C'] = 'crimson';
//ColourArray['#FFB6C1'] = 'lightpink';
//ColourArray['#FFAEB9'] = 'lightpink 1';
//ColourArray['#EEA2AD'] = 'lightpink 2';
//ColourArray['#CD8C95'] = 'lightpink 3';
//ColourArray['#8B5F65'] = 'lightpink 4';
//ColourArray['#FFC0CB'] = 'pink';
//ColourArray['#EEA9B8'] = 'pink 2';
//ColourArray['#CD919E'] = 'pink 3';
//ColourArray['#8B636C'] = 'pink 4';
//ColourArray['#CD6889'] = 'palevioletred 3'; ColourArray['#8B475D'] = 'palevioletred 4'; ColourArray['#8B8386'] = 'lavenderblush 4'; ColourArray['#EE3A8C'] = 'violetred 2'; ColourArray['#CD3278'] = 'violetred 3'; ColourArray['#8B2252'] = 'violetred 4'; ColourArray['#CD6090'] = 'hotpink 3'; ColourArray['#872657'] = 'raspberry'; ColourArray['#8B0A50'] = 'deeppink 4'; ColourArray['#FF34B3'] = 'maroon 1'; ColourArray['#EE30A7'] = 'maroon 2'; ColourArray['#CD2990'] = 'maroon 3'; ColourArray['#8B4789'] = 'orchid 4'; ColourArray['#CD00CD'] = 'magenta 3'; ColourArray['#800080'] = 'purple'; ColourArray['#BA55D3'] = 'mediumorchid'; ColourArray['#9932CC'] = 'darkorchid'; ColourArray['#68228B'] = 'darkorchid 4'; ColourArray['#4B0082'] = 'indigo'; ColourArray['#8A2BE2'] = 'blueviolet'; ColourArray['#8968CD'] = 'mediumpurple 3'; ColourArray['#5D478B'] = 'mediumpurple 4'; ColourArray['#483D8B'] = 'darkslateblue'; ColourArray['#836FFF'] = 'slateblue 1'; ColourArray['#7A67EE'] = 'slateblue 2'; ColourArray['#6959CD'] = 'slateblue 3'; ColourArray['#0000EE'] = 'Blue'; ColourArray['#000080'] = 'navy'; ColourArray['#191970'] = 'midnightblue'; ColourArray['#3D59AB'] = 'cobalt'; ColourArray['#6495ED'] = 'cornflowerblue'; ColourArray['#6E7B8B'] = 'lightsteelblue 4'; ColourArray['#778899'] = 'lightslategray'; ColourArray['#708090'] = 'slategray'; ColourArray['#C6E2FF'] = 'slategray 1'; ColourArray['#B9D3EE'] = 'slategray 2'; ColourArray['#9FB6CD'] = 'slategray 3'; ColourArray['#6C7B8B'] = 'slategray 4'; ColourArray['#1C86EE'] = 'dodgerblue 2'; ColourArray['#104E8B'] = 'dodgerblue 4'; ColourArray['#4682B4'] = 'steelblue'; ColourArray['#63B8FF'] = 'steelblue 1'; ColourArray['#5CACEE'] = 'steelblue 2'; ColourArray['#4F94CD'] = 'steelblue 3'; ColourArray['#36648B'] = 'steelblue 4'; ColourArray['#87CEFA'] = 'lightskyblue'; ColourArray['#7EC0EE'] = 'skyblue 2'; ColourArray['#6CA6CD'] = 'skyblue 3'; ColourArray['#4A708B'] = 'skyblue 4'; ColourArray['#87CEEB'] = 'skyblue'; ColourArray['#9AC0CD'] = 'lightblue 3'; ColourArray['#68838B'] = 'lightblue 4'; ColourArray['#B0E0E6'] = 'powderblue'; ColourArray['#98F5FF'] = 'cadetblue 1'; ColourArray['#8EE5EE'] = 'cadetblue 2'; ColourArray['#7AC5CD'] = 'cadetblue 3'; ColourArray['#53868B'] = 'cadetblue 4'; ColourArray['#00CDCD'] = 'cyan 3'; ColourArray['#008080'] = 'teal'; ColourArray['#48D1CC'] = 'mediumturquoise'; ColourArray['#03A89E'] = 'manganeseblue'; ColourArray['#40E0D0'] = 'turquoise'; ColourArray['#808A87'] = 'coldgrey'; ColourArray['#008B45'] = 'springgreen 3'; ColourArray['#3CB371'] = 'mediumseagreen'; ColourArray['#4EEE94'] = 'seagreen 2'; ColourArray['#43CD80'] = 'seagreen 3'; ColourArray['#228B22'] = 'forestgreen'; ColourArray['#FFF68F'] = 'khaki 1'; ColourArray['#EEE685'] = 'khaki 2'; ColourArray['#CDC673'] = 'khaki 3'; ColourArray['#8B864E'] = 'khaki 4'; ColourArray['#F0E68C'] = 'khaki'; ColourArray['#CDC9A5'] = 'lemonchiffon 3'; ColourArray['#8B8970'] = 'lemonchiffon 4'; ColourArray['#FFEC8B'] = 'lightgoldenrod 1'; ColourArray['#CDBE70'] = 'lightgoldenrod 3'; ColourArray['#8B814C'] = 'lightgoldenrod 4'; ColourArray['#00FFFF'] = 'Aqua'; ColourArray['#A52A2A'] = 'Brown'; ColourArray['#FF7F50'] = 'Coral'; ColourArray['#008000'] = 'Green'; ColourArray['#87CEEB'] = 'SkyBlue'; ColourArray['#708090'] = 'SlateGray'; ColourArray['#FF6347'] = 'Tomato'; ColourArray['#FFFFFF'] = 'White'; ColourArray['#000000'] = 'black'; ColourArray['#FFFF00'] = 'Yellow';


var ColourArray = new Array(7);
ColourArray[0] = ["Aqua", "Azure", "Beige", "Bisque", "Black", "Blue", "Brown", "Coral"];
ColourArray[1] = ["Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGray", "DarkRed", "DeepPink"];
ColourArray[2] = ["DimGray", "Fuchsia", "Gold", "Gray", "Green", "HoneyDew", "HotPink", "Indigo"];
ColourArray[3] = ["Ivory", "Khaki", "Lavender", "Lime", "Linen", "Magenta", "Maroon", "Moccasin"];
ColourArray[4] = ["Navy", "OldLace", "Obind", "Orange", "Orchid", "Peru", "Pink", "Plum"];
ColourArray[5] = ["Purple", "Red", "Salmon", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue"];
ColourArray[6] = ["Snow", "Tan", "Teal", "Thistle", "Tomato", "Violet", "Wheat", "White"];


var BorderLineWidthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

//deepak
var _IsGrid = false;
this.IsGrid = function (value) {
    if (_IsGrid != value) {
        _IsGrid = value;
        //UpdateCanvasOnServer();
    }
}

var _BackGroung = "white";
this.BackGroung = function (value) {
    if (_BackGroung != value) {
        _BackGroung = value;
        // UpdateCanvasOnServer();
    }
}

var _GridType = "None";
this.GridType = function (value) {
    if (_GridType != value) {
        _GridType = value;
    }
}

var _CanvasTimeStamp = "None";
this.CanvasTimeStamp = function (value) {
    if (_CanvasTimeStamp != value) {
        _CanvasTimeStamp = value;
    }
}

var _ObjectTimeStamp = "None";
this.ObjectTimeStamp = function (value) {
    if (_ObjectTimeStamp != value) {
        _ObjectTimeStamp = value;
    }
}

var CanvasProperty = function (value) {
    if (typeof (value) == 'undefined' || value.d == null) {
        var CanvasProperty = {};
        CanvasProperty.GridType = _GridType;
        CanvasProperty.BackGround = _BackGroung;
        CanvasProperty.TimeStamp = _CanvasTimeStamp;
        return CanvasProperty;
    }
    else {
        var c = value.d;
        _GridType = c.GridType;
        _BackGroung = c.BackGround;

        if (_BackGroung != null) {
            //if (_BackGroung.indexOf('BACKGROUND') != -1 || _BackGroung.indexOf('upload') != -1 || _BackGroung.indexOf('Upload') != -1) {
            if (_BackGroung.indexOf('http://') != -1) {
                if (_BackGroung.indexOf('pdf') != -1) {
                    var bgcanvasimgHeight = window.CanvasHeight * .975;    //window.CanvasHeight*(1 - 2.94 / 100);
                    var bgcanvasimgWidth = window.CanvasWidth * .447;

                    $("#bgcanvasimg").css({ "display": "block", "height": bgcanvasimgHeight + "px", "width": bgcanvasimgWidth + "px", "left": "0px", " position": "absolute " });
                }
                else
                    $("#bgcanvasimg").css({ "display": "block", "height": "100%", "width": "100%" });

                $("#bgcanvasimg").attr("src", _BackGroung);
                //$("#bgcanvasimg").attr("src", window.WebSite+_BackGroung);

            }
            else {
                $("#bgcanvasimg").css("display", "none");
                $("#bgcanvas").css("background", _BackGroung);
            }
        }



        var cbackground = "transparent";
        var f = false;
        switch (_GridType) {
            case "LargeGrid":
                cbackground = "Resources/Large.png";
                f = true;
                break;
            case "MidiamGrid":
                //cbackground = "url(Resources/Midiam.png)";
                cbackground = "Resources/Midiam.png";
                f = true;
                break;
            case "SmallGrid":
                cbackground = "Resources/Small.png";
                f = true;
                break;
        }
        if (f) {
            $("#grid").attr("src", cbackground);
            $("#grid").css("display", 'block');
        }
        else
            $("#grid").css("display", 'none');




    }
}

var UpdateCanvasOnServer = function () {
    var value = CanvasProperty();
    if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
        if (CanPost()) {
            $.ajax({
                url: window.url + "SetCanvasProperty",
                data: { MeetingId: JSON.stringify(window.meeting.MeetingId()), canvas: JSON.stringify(value) },
                dataType: "jsonp"
            });
        }
        else {
            $.ajax({
                url: window.url + "GetCanvasProperty",
                data: { MeetingId: JSON.stringify(window.meeting.MeetingId()), TimeStamp: JSON.stringify("None") },
                dataType: "jsonp",
                success: UpdateCanvas,
                error: function () {
                    alert("Unable to get canvas Property");
                }
            });
        }
        // window.IsPaused = false;
        window.mytimer.Start();
    }
}


var Meeting = function () {

    var _MeetingId = "";
    this.MeetingId = function (value) {
        if (typeof value == "undefined")
            return _MeetingId;
        else
            _MeetingId = value;
    }

    var _IsMaster = false;
    this.IsMaster = function (value) {
        if (typeof value == "undefined")
            return _IsMaster;
        else
            _IsMaster = value;
    }

    var _IsMeetingStarted = false;
    this.IsMeetingStarted = function (value) {
        if (typeof value == "undefined")
            return _IsMeetingStarted;
        else
            _IsMeetingStarted = value;
    }

    var _MeetingType = "";
    this.MeetingType = function (value) {
        if (typeof value == "undefined")
            return _MeetingType;
        else
            _MeetingType = value;
    }

    var _UserID = "";
    this.UserID = function (value) {
        if (typeof value == "undefined")
            return _UserID;
        else
            _UserID = value;
    }

    var _UserName = "";
    this.UserName = function (value) {
        if (typeof value == "undefined")
            return _UserName;
        else
            _UserName = value;
    }

    var _MemberInfo = "";
    this.MemberInfo = function (value) {
        if (typeof value == "undefined")
            return _MemberInfo;
        else
            _MemberInfo = value;
    }

    this.memberList = Array();
    this.AddMembers = function (obj) {
        this.memberList.push(obj);
    };

    this.ClearMemberList = function () {
        this.memberList = new Array();
    };


    var _MemberTimeStamp = "";
    this.MemberTimeStamp = function (value) {
        if (typeof value == "undefined")
            return _MemberTimeStamp;
        else
            _MemberTimeStamp = value;
    }

};
$(document).on('click', "#b1,#b2,#b3,#b4,#b5,#b6,#b7,#b8,#b9", function () {
    //$("#b1,#b2,#b3,#b4,#b5,#b6,#b7,#b8,#b9").bind("click", function () {
    window.canvas.ToolOption(this.children[0].id);
    $(".subs").css("display", "none");
    window.canvas.UnSelectAll();
})

//$("#b1,#b2,#b3,#b4,#b5,#b6,#b7,#b8,#b9").bind("hover", function () {
//    $(".subs").css("display", "block");
//})

function CanPost() {

    //if (window.meeting.IsMaster() || window.meeting.MeetingType() == "Duplex")
    if (window.meeting.MeetingType() == "Duplex" || (window.meeting.MeetingType() == "Simplax" && window.meeting.IsMaster()))
        return window.meeting.MemberInfo().CanPost;
    else
        return false;
}



function CallDrawingOption(obj) {
    var pr = obj.getPropertyObj();
    var mytype = pr.MyType;
    var BorderColor = pr.BorderColor;
    var BorderWidth = pr.BorderWidth;
    var FillColor = pr.FillColor;
    var FontFamily = pr.FontFaimily;
    var FontColor = pr.FontColor;

    if (mytype == "PolyLine") {
        shwData(2);
        $("#penwidth").val(BorderWidth);
        $("#penlinecolor").val(BorderColor);

    }
    else if (mytype == "HighlighterPolyLine") {
        shwData(3);
        $("#highlighterwidth").val(BorderWidth);
        $("#highlighterlinecolor").val(BorderColor);

    }
    else if (mytype == "Circle") {
        shwData(5);

        $("#circlelinewidth").val(BorderWidth);
        $("#circlelinecolor").val(BorderColor);
        $("#circlefillcolor").val(FillColor);

    }
    else if (mytype == "Triangle") {
        shwData(6);

        $("#trianglelinewidth").val(BorderWidth);
        $("#trianglelinecolor").val(BorderColor);
        $("#trianglefillcolor").val(FillColor);

    }
    else if (mytype == "Rectangle") {
        shwData(7);

        $("#rectanglelinewidth").val(BorderWidth);
        $("#rectanglelinecolor").val(BorderColor);
        $("#rectanglefillcolor").val(FillColor);

    }
    else if (mytype == "Line") {
        shwData(4);

        $("#LineWidth").val(BorderWidth);
        $("#LineColor").val(BorderColor);

        //window.canvas.LineColor(BorderColor);
        //window.canvas.LineWidth(LineWidth);
    }
    else if (mytype == "Text") {
        shwData(9);
        $("#Fontfamily").val(FontFamily);
        $("#FontColor").val(FontColor);

    }

}

function ShowMembers() {
    //if (window.meeting != undefined) {
    //    window.IsPaused = true;
    //    $.ajax({
    //        url: window.url + "MemeberTimeStamp",
    //        data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },
    //        dataType: "jsonp",
    //        success: CheckMemberTimeStamp,

    //        error: function () {
    //            alert("Hit error fn!");
    //        }
    //    });
    //}
    //else
    //    app.navigate("Members", { target: "blank" });

    app.navigate("Members", { target: "blank" });

}

function shwData(param) {
    for (i = 1; i <= 9; i++) {
        if (i == param) {
            document.getElementById('p' + i).className = 'shwContent';
            document.getElementById('b' + i).className = 'current';
        }
        else {
            document.getElementById('p' + i).className = 'hideContent';
            document.getElementById('b' + i).className = '';
        }
    }

}

var OrientationChanged = function () {
    $("#msglist").empty();

    _ObjectTimeStamp = "None";

    //prashant 20-06-2013--------------------------------------------------------------------
    var Canvas = $("#mycanvas").get(0);
    var Content = $(".layout-content").get(0);
    var footer = $(".layout-footer").get(0);
    var tempCanvas = $("#tempCanvas").get(0);

    Canvas.height = Content.offsetHeight - (footer.offsetHeight + 20);
    Canvas.width = Content.offsetWidth;
    tempCanvas.height = Canvas.height;
    tempCanvas.width = Canvas.width;
    $("#myBody").css("height", Canvas.height);
    $("#myBody").css("width", Canvas.width);
    $("#grid").css("height", Canvas.height);
    $("#grid").css("width", Canvas.width);
    //------------------------------------------------------------------------------------------

    window.CanvasHeight = Canvas.height;
    window.CanvasWidth = Canvas.width;


    var w = ((Content.offsetWidth - 200) / 12) + 10;
    if (w > 34)
        w = 34;
    else if (w < 21)
        w = 25;
    $("#tab_div ul li img,#UploadImage").css("width", w);

    //assign chat page
    $("#chat").css("height", window.CanvasHeight - 120);



    window.canvas.Draw();



};

function LoadList() {
    if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
        if (!window.mytimer.IsStop()) {
            $.ajax({
                url: window.url + "GetCanvasTimeStamp",
                data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },
                dataType: "jsonp",
                success: CheckCanvasTimeStamp,
                error: function () {
                    alert("Unable to get canvas Property");
                }
            });
        }
    }

    if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
        $.ajax({
            url: window.url + "GetObjectTimeStamp",
            data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },
            dataType: "jsonp",
            success: CheckObjectTimeStamp,
            error: function () {
                alert("Unable to get chat time stamp");
            }
        });
    }

    if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
        $.ajax({
            url: window.url + "GetMemberTimeStamp",
            data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },
            dataType: "jsonp",
            success: CheckMemberTimeStamp,
            error: function () {
                alert("Unable to update list");
            }
        });
    }
    //for chat time stamp
    //if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
    //    $.ajax({
    //        url: window.url + "GetChatTimeStamp",
    //        data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },
    //        dataType: "jsonp",
    //        success: CheckMemberTimeStamp,
    //        error: function () {
    //            alert("Unable to update list");
    //        }
    //    });
    //}
}

function CheckCanvasTimeStamp(value) {
    if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
        if (_CanvasTimeStamp != value.d) {
            _CanvasTimeStamp = value.d;
            $.ajax({
                url: window.url + "GetCanvasProperty",
                data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },
                dataType: "jsonp",
                success: UpdateCanvas,
                error: function () {
                    alert("Unable to get canvas Property");
                }
            });
        }
    }
}

function updateList(list) {
    //    var objlist = eval('(' + list + ')');
    //if (window.IsPaused) {
    //    return;
    //}
    if (window.mytimer.IsStop()) {
        return;
    }


    var objlist = list.d;
    if (objlist == null) {
        _BackGroung = "white";
        $("#bgcanvas").css("background", _BackGroung);
        //$("#grid").css("background", '');
        $("#grid").css("display", 'none');
        $("#bgcanvasimg").css("display", "none");
        window.Env_MettingId = undefined;
        window.meeting = undefined;
        $("#mamber_div").text("Members");
        window.MeetingState = "Stop";
        $("#c").empty();
        //$("#joinMeeting").attr("src", "images/join-meetion.png")
        //$("#joine_meetion").attr("title", "Start Meeting")

        if (window.ClearChatTimer != undefined)
            window.clearInterval(window.ClearChatTimer);

        //  window.clearInterval(window.mytimer);
        window.mytimer.Stop();

        window.canvas.Clear();

        $("#msglist").empty();
        AlertMeetingNotAvail();

        return;
    }
    //deepak
    var oldList = new Array();
    var selobj = null;
    for (var i in canvas.graphicsList) {
        oldList.push(canvas.graphicsList[i]);
        if (canvas.graphicsList[i].IsSelected())
            selobj = canvas.graphicsList[i];
    }
    window.canvas.Clear();

    for (var i in objlist) {
        var flag;
        if (selobj != null) {
            var pobj = selobj.getPropertyObj();
            flag = (objlist[i].UserID == pobj.UserID && objlist[i].Id == pobj.Id && objlist[i].MyType == pobj.MyType);
        }
        else
            flag = false;
        AddObj(objlist[i], flag);
        if (flag) CallDrawingOption(selobj);
    }
    //for (var i in objlist) {
    //    AddObj(objlist[i]);
    //}

    window.canvas.Draw();

    var newList = new Array();
    for (var i in canvas.graphicsList)
        newList.push(canvas.graphicsList[i]);
    ShowInfo(oldList, newList);

    //deepak
    //if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
    //    $.ajax({
    //        url: window.url + "GetMemberTimeStamp",
    //        data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },
    //        dataType: "jsonp",
    //        success: CheckMemberTimeStamp,
    //        error: function () {
    //            alert("Unable to update list");
    //        }
    //    });
    //}

}
function UpdateMemberList(value) {

    if (value.d == null)
        return;

    $("#mamber_ul ul").empty();
    var coll = value.d;
    //window.meeting.ClearMemberList();
    for (var i = 0; i < coll.length; i++) {
        AddMember(coll[i]);
    }


}

function AlertMeetingNotAvail() {
    //$("#alertBox").css("display", 'block');
    //var left = (window.CanvasWidth - $("#alertBox").width()) / 2;
    //var top = (window.CanvasHeight - $("#alertBox").height()) / 2;
    //$("#alertBox").css("left", left);
    //$("#alertBox").css("top", top);
    //$("#displayMsg").text('Meeting not available.');

    if (window.meeting == undefined) {
        $("#MeetingIdPrompt").css({
            "display": 'block',
            "left": "0px",
            "top": "0px",
            //"background-color": "white",
            "height": '100%',
            "width": '100%',
            "z-index": '10000'
        });

        $('#txtMeetingId').focus();
    }
}

function ShowInfo(oldList, newList) {
    var tmlist = new Array();
    for (var i in newList) {
        var newobj = newList[i].getPropertyObj();
        var f = false;
        for (var j in oldList) {
            var oldobj = oldList[j].getPropertyObj();
            if (oldobj.UserID == newobj.UserID && oldobj.Id == newobj.Id && oldobj.MyType == newobj.MyType) {
                if (oldobj.TimeStamp != newobj.TimeStamp) {
                    tmlist.push(newobj);
                    oldList[j] = newList[i];
                    f = true;
                    break;
                }
                else if (oldobj.TimeStamp == newobj.TimeStamp) {
                    f = true;
                    break;
                }
            }
        }
        if (!f) {
            tmlist.push(newobj);
            $("#myBody").append('<div class="info" id="o' + newobj.Id + '" style="position: absolute; display: none; left: 0px; top: 0px;margin: 0px; padding: 0px; background-color: #9ef779; color: black; font-size: 10px;border: 1px solid #a3c3ec"></div>')
        }
    }
    for (var i in tmlist) {
        var p = tmlist[i];
        if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
            //if (p.UpDatedBy != window.meeting.UserID()) {
            if (p.UpDatedBy != window.meeting.UserName()) {
                $("#o" + p.Id).css({ 'left': p.Left + window.canvas.Xoffset, 'top': p.Top + window.canvas.Yoffset });
                $("#o" + p.Id).html(p.UpDatedBy);
                $("#o" + p.Id).fadeIn(1000);
                $("#o" + p.Id).fadeOut(1000);
            }
        }
    }


};

function ClearInfo() {
    var f = false;
    var templist = new Array();
    for (var i = 0; i < $(".info").length - 1; i++) {
        for (var j in window.canvas.graphicsList) {
            var objproperty = window.canvas.graphicsList[j].getPropertyObj();
            if ($(".info")[i].id.replace("o", "") == objproperty.Id) {
                f = true;
                break;
            }
        }
        if (!f)
            templist.push($(".info")[i].id);
    }
    for (var i in templist)
        $("#" + templist[i]).remove();
};

function UpdateCanvas(value) {
    CanvasProperty(value);
    //if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
    //    $.ajax({
    //        url: window.url + "GetObjectTimeStamp",
    //        data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },
    //        dataType: "jsonp",
    //        success: CheckObjectTimeStamp,
    //        error: function () {
    //            alert("Unable to get chat time stamp");
    //        }
    //    });
    //}
}
function CheckObjectTimeStamp(value) {
    if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
        if (value.d !== _ObjectTimeStamp) {
            _ObjectTimeStamp = value.d;
            $.ajax({
                url: window.url + "GetObjectList",
                data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },
                dataType: "jsonp",
                success: updateList,
                error: function () {
                    alert("Unable to Load List");
                }
            });
        }
    }
}


function CheckMemberTimeStamp(value) {

    if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
        if (window.meeting.MemberTimeStamp() != value.d) {
            $.ajax({
                url: window.url + "GetMemberList",
                data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },
                dataType: "jsonp",
                //success: UpdateMem,
                success: UpdateMemberList,
                error: function () {
                    alert("Hit error fn!");
                }
            });
            window.meeting.MemberTimeStamp(value.d);
        }
    }

};

//function UpdateMem(value) {
//    if (value.d == null) return;

//    var coll = value.d;
//    for (var i = 0; i < coll.length; i++) {
//        if (window.meeting.UserID() == coll[i].Name) {
//            window.meeting.MemberInfo(coll[i]);
//            break;
//        }
//    }
//    if (window.IsPaused)
//        window.IsPaused = false;
//};


function AddObj(o, flag) {
    var obj = null;
    //var deltaX = 1;
    //var deltaY = 1;

    //if (newWidth == null || newWidth < window.CanvasHeight) {
    //    // per = ((o.CanvasHeight - o.CanvasWidth) / o.CanvasWidth) * 100;
    //    newWidth = (o.CanvasWidth / o.CanvasHeight) * window.CanvasHeight;
    //    var objCanvas = $("#mycanvas").get(0);
    //    objCanvas.width = newWidth;
    //  //  alert(objCanvas.width);
    //    $("#CanvasDiv").css("overflow", 'scroll');
    //}
    //else
    //    newWidth = window.CanvasWidth;

    //var deltaX = ((o.CanvasWidth - newWidth) / o.CanvasWidth) * 100;
    //var deltaY = ((o.CanvasHeight - window.CanvasHeight) / o.CanvasHeight) * 100;

    var deltaX = ((o.CanvasWidth - window.CanvasWidth) / o.CanvasWidth) * 100;
    var deltaY = ((o.CanvasHeight - window.CanvasHeight) / o.CanvasHeight) * 100;





    //var deltaX = window.CanvasWidth / o.CanvasWidth;
    //var deltaY = window.CanvasHeight/o.CanvasHeight;
    //var delta = deltaX < deltaY ? deltaX : deltaY;

    //$.each(ColourArray, function (key, value) {
    //    //alert(key)
    //    if (key == o.BorderColor)
    //        o.BorderColor = value;

    //    if (key == o.FillColor)
    //        o.FillColor = value;

    //});


    if (o.MyType == "PolyLine") {
        var points = new Array();
        for (var p in o.Points)

            // points.push(new Point(o.Points[p].x * deltaX, o.Points[p].y * deltaY));
            points.push(new Point(o.Points[p].x * (1 - deltaX / 100), o.Points[p].y * (1 - deltaY / 100)));
        // points.push(new Point(o.Points[p].x * deltaX, o.Points[p].y * deltaY));
        obj = new GraphicsPolyLine(points, o.BorderWidth, o.BorderColor, o.Id, o.UserID);
    }
    else if (o.MyType == "HighlighterPolyLine") {
        var points = new Array();
        for (var p in o.Points)
            // points.push(new Point(o.Points[p].x * deltaX, o.Points[p].y * deltaY));
            points.push(new Point(o.Points[p].x * (1 - deltaX / 100), o.Points[p].y * (1 - deltaY / 100)));
        //points.push(new Point(o.Points[p].x * deltaX, o.Points[p].y * deltaY));
        obj = new GraphicsHighlighterPolyLine(points, o.BorderWidth, o.BorderColor, o.Id, o.UserID);
    }
    else if (o.MyType == "Circle")
        obj = new GraphicsEllipse(o.BorderWidth, o.BorderColor, o.FillColor, o.Id, o.UserID);
    else if (o.MyType == "Triangle")
        obj = new GraphicsTriangle(o.BorderWidth, o.BorderColor, o.FillColor, o.Id, o.UserID);
    else if (o.MyType == "Rectangle")
        obj = new GraphicsRectangle(o.BorderWidth, o.BorderColor, o.FillColor, o.Id, o.UserID);
    else if (o.MyType == "Image")
        obj = new GraphicsImage(o.ImagePath, new Rect(o.Left, o.Top, o.Right, o.Bottom), o.Id, o.UserID);
    else if (o.MyType == "Text")
        obj = new GraphicsText(o.Text, new Point(o.Left, o.Top), o.FontSize, o.FontColor, o.FontFaimily, o.Id, o.UserID);
    else if (o.MyType == "Line") {
        var points = new Array();
        for (var p in o.Points)
            //   points.push(new Point(o.Points[p].x * deltaX, o.Points[p].y * deltaY));
            points.push(new Point(o.Points[p].x * (1 - deltaX / 100), o.Points[p].y * (1 - deltaY / 100)));
        //points.push(new Point(o.Points[p].x * deltaX, o.Points[p].y * deltaY));
        obj = new GraphicsLine(points, o.BorderWidth, o.BorderColor, o.Id, o.UserID);
    }
    if (obj != null) {
        //  obj.UpdateRectangle(new Rect(o.Left * deltaX, o.Top * deltaY, o.Right * deltaX, o.Bottom * deltaY));
        obj.UpdateRectangle(new Rect(o.Left * (1 - deltaX / 100), o.Top * (1 - deltaY / 100), o.Right * (1 - deltaX / 100), o.Bottom * (1 - deltaY / 100)));
        //obj.UpdateRectangle(new Rect(o.Left * deltaX, o.Top * deltaY, o.Right * deltaX, o.Bottom * deltaY));
        obj.IsSelected(flag);
        obj.TimeStamp(o.TimeStamp);
        obj.UpDatedBy(o.UpDatedBy);
        window.canvas.AddObject(obj);





    }
}

var Point = function (x, y) {
    this.x = x;
    this.y = y;
};


var Rect = function (Left, Top, Right, Bottom) {
    var _left = Left;
    var _top = Top;
    var _right = Right;
    var _bottom = Bottom;

    this.Left = _left < _right ? _left : _right;
    this.Top = _top < _bottom ? _top : _bottom;
    this.Right = _right > _left ? _right : _left;
    this.Bottom = _bottom > _top ? _bottom : _top;

    this.GetHeight = function () {
        return this.Bottom - this.Top;
    };

    this.GetWidth = function () {
        return this.Right - this.Left;

    };
    this.isContains = function (p) {
        var minx = this.Left < this.Right ? this.Left : this.Right;
        var maxx = this.Left > this.Right ? this.Left : this.Right;
        var miny = this.Top < this.Bottom ? this.Top : this.Bottom;
        var maxy = this.Top > this.Bottom ? this.Top : this.Bottom;

        if (p.x >= minx && p.x <= maxx && p.y >= miny && p.y <= maxy)
            return true;
        else
            return false;
    };
};

var id = 1;
function getId() {
    return id++;
};

var GraphicsBase = function (id) {

    var me = this;

    var _IsEdit = false;
    this.IsEdit = function (value) {
        if (typeof value == "undefined")
            return _IsEdit;
        else
            _IsEdit = value;
    }

    var _TimeStamp = "None";
    this.TimeStamp = function (value) {
        if (typeof value == "undefined")
            return _TimeStamp;
        else
            _TimeStamp = value;
    }

    // var _UserID = window.UserID;
    var _UserID = window.meeting != undefined ? window.meeting.UserID() : null;


    this.UserID = function (value) {
        if (typeof value == "undefined")
            return _UserID;
        else
            _UserID = value;
    }

    //var _UpDatedBy = window.meeting != undefined ? window.meeting.UserID() : null;
    var _UpDatedBy = window.meeting != undefined ? window.meeting.UserName() : null;

    this.UpDatedBy = function (value) {
        if (typeof value == "undefined")
            return _UpDatedBy;
        else
            _UpDatedBy = value;
    }

    var _ObjID = null;
    if (typeof id == "undefined")
        _ObjID = getId();
    else
        _ObjID = id;

    this.ObjId = function (value) {
        if (typeof value == "undefined")
            return _ObjID;
        else
            _ObjID = value;
    }

    var _MyType = null;
    this.MyType = function (value) {
        if (typeof value == "undefined")
            return _MyType;
        else
            _MyType = value;
    }
    //18 jan
    _CanvasHeight = window.CanvasHeight;
    _CanvasWidth = window.CanvasWidth;
    //

    var _BorderWidth = 2;
    this.BorderWidth = function (value) {
        if (typeof value == "undefined")
            return _BorderWidth;
        else {
            if (_BorderWidth != value) {
                _BorderWidth = value;
            }
        }
    }

    var _BorderColor = "black";
    this.BorderColor = function (value) {
        if (typeof value == "undefined")
            return _BorderColor;
        else {
            if (_BorderColor != value) {
                _BorderColor = value;
            }
        }
    }

    var _FillColor = "yellow";
    this.FillColor = function (value) {
        if (typeof value == "undefined")
            return _FillColor;
        else {
            if (_FillColor != value) {
                _FillColor = value;
            }
        }
    }

    var _ImagePath = "None";
    this.ImagePath = function (value) {
        if (typeof value == "undefined")
            return _ImagePath;
        else {
            if (_ImagePath != value) {
                _ImagePath = value;
            }
        }
    }

    var _Text = "None";
    this.Text = function (value) {
        if (typeof value == "undefined")
            return _Text;
        else {
            if (_FontSize != value) {
                _Text = value;
            }
        }
    }


    var _FontSize = 14;
    this.FontSize = function (value) {
        if (typeof value == "undefined")
            return _FontSize;
        else {
            if (_FontSize != value) {
                _FontSize = value;
            }
        }
    }

    var _FontFaimily = "arial";
    this.FontFaimily = function (value) {
        if (typeof value == "undefined")
            return _FontFaimily;
        else {
            if (_FontFaimily != value) {
                _FontFaimily = value;
            }
        }
    }

    var _FontColor = "red";
    this.FontColor = function (value) {
        if (typeof value == "undefined")
            return _FontColor;
        else {
            if (_FontColor != value) {
                _FontColor = value;
            }
        }
    }

    var _Rectangle = null;
    this.Rectangle = function (objrect) {
        if (typeof objrect == "undefined")
            return _Rectangle;
        else {
            if (_Rectangle == null || _Rectangle.Left != objrect.Left || _Rectangle.Top != objrect.Top
             || _Rectangle.Right != objrect.Right || _Rectangle.Bottom != objrect.Bottom) {
                _Rectangle = new Rect(objrect.Left, objrect.Top, objrect.Right, objrect.Bottom);
            }
        }

    }

    var _OriginalRect = null;
    this.OriginalRect = function (objrect) {
        if (typeof objrect == "undefined")
            return _OriginalRect;
        else
            _OriginalRect = new Rect(objrect.Left, objrect.Top, objrect.Right, objrect.Bottom);
    }

    var _Points = null;
    this.Points = function (objPoints) {
        if (typeof objPoints == "undefined")
            return _Points;
        else {
            _Points = new Array();
            for (var i = 0; i < objPoints.length; i++)
                _Points.push(new Point(objPoints[i].x, objPoints[i].y));
        }
    }

    var _OriginalPoints = null;
    this.OriginalPoints = function (objPoints) {
        if (typeof objPoints == "undefined")
            return _OriginalPoints;
        else {
            _OriginalPoints = new Array();
            for (var i = 0; i < objPoints.length; i++)
                _OriginalPoints.push(new Point(objPoints[i].x, objPoints[i].y));
        }
    }

    var _isSelected = false;
    this.IsSelected = function (value) {
        if (typeof value == "undefined")
            return _isSelected;
        else {
            if (_isSelected != value) {
                _isSelected = value;
            }
        }
    };


    this.AddPoint = function (p) {
        _Points.push(p);
    };

    this.isContains = function (p) {
        if (_isSelected || this.MyType() == "PolyLine" || this.MyType() == "Line" || this.MyType() == "HighlighterPolyLine")
            return new Rect(_Rectangle.Left - 10, _Rectangle.Top - 10, _Rectangle.Right + 10, _Rectangle.Bottom + 10).isContains(p);
        else
            return _Rectangle.isContains(p);
    };

    var h1 = null, h2 = null, h3 = null, h4 = null, h5 = null;

    this.Draw = function (Context) {
        Context.beginPath();
        var Hsize = 20;
        var r = new Rect(_Rectangle.Left - 10, _Rectangle.Top - 10, _Rectangle.Right + 10, _Rectangle.Bottom + 10);
        Context.rect(r.Left, r.Top, r.GetWidth(), r.GetHeight());
        Context.lineWidth = 5;
        Context.strokeStyle = 'blue';
        Context.stroke();
        Context.beginPath();

        h1 = new Rect(r.Left - Hsize, r.Top - Hsize, r.Left, r.Top);
        Context.rect(h1.Left, h1.Top, h1.GetWidth(), h1.GetHeight());
        Context.fillStyle = 'black';
        Context.fill();
        Context.lineWidth = 5;
        Context.strokeStyle = 'yellow';
        Context.stroke();
        Context.beginPath();

        h2 = new Rect(r.Right, r.Top - Hsize, r.Right + Hsize, r.Top);
        Context.rect(h2.Left, h2.Top, h2.GetWidth(), h2.GetHeight());
        Context.fillStyle = 'black';
        Context.fill();
        Context.lineWidth = 5;
        Context.strokeStyle = 'yellow';
        Context.stroke();
        Context.beginPath();

        h3 = new Rect(r.Right, r.Bottom + Hsize, r.Right + Hsize, r.Bottom);
        Context.rect(h3.Left, h3.Top, h3.GetWidth(), h3.GetHeight());
        Context.fillStyle = 'black';
        Context.fill();
        Context.lineWidth = 5;
        Context.strokeStyle = 'yellow';
        Context.stroke();
        Context.beginPath();

        h4 = new Rect(r.Left - Hsize, r.Bottom + Hsize, r.Left, r.Bottom);
        Context.rect(h4.Left, h4.Top, h4.GetWidth(), h4.GetHeight());
        Context.fillStyle = 'black';
        Context.fill();
        Context.lineWidth = 5;
        Context.strokeStyle = 'yellow';
        Context.stroke();
        Context.beginPath();

        //deepak
        //if (me.MyType() == "Text") {
        //    h5 = new Rect((r.Left + r.GetWidth() / 2) - Hsize, r.Top - Hsize, (r.Left + r.GetWidth() / 2) + Hsize, r.Top + Hsize);
        //    Context.rect(h5.Left, h5.Top, h5.GetWidth(), h5.GetHeight());
        //    Context.fillStyle = 'black';
        //    Context.fill();
        //    Context.lineWidth = 5;
        //    Context.strokeStyle = 'yellow';
        //    Context.stroke();
        //    Context.beginPath();
        //}
        //deepak
    };
    this.getHandler = function (p) {
        if (this.IsSelected()) {
            if (h1.isContains(p)) return 0;
            if (h2.isContains(p)) return 1;
            if (h3.isContains(p)) return 2;
            if (h4.isContains(p)) return 3;
            //deepak
            //if (me.MyType() == "Text") {
            //    if (h5.isContains(p)) return 4;
            //}
        }
        return -1;
    };

    this.Move = function (x, y) {
        var l = _OriginalRect.Left + x;
        var t = _OriginalRect.Top + y;
        var r = _OriginalRect.Right + x;
        var b = _OriginalRect.Bottom + y;
        if (!(l < 1 || t < 1 || r > $("#mycanvas").get(0).width || b > $("#mycanvas").get(0).height))
            _Rectangle = new Rect(l, t, r, b);
    };

    this.MoveHandler = function (Handler, x, y) {
        var temprect = new Rect(_Rectangle.Left, _Rectangle.Top, _Rectangle.Right, _Rectangle.Bottom);

        if (Handler == 0)
            _Rectangle = new Rect(_OriginalRect.Left + x, _OriginalRect.Top + y, _OriginalRect.Right, _OriginalRect.Bottom);
        else if (Handler == 1)
            _Rectangle = new Rect(_OriginalRect.Left, _OriginalRect.Top + y, _OriginalRect.Right + x, _OriginalRect.Bottom);
        else if (Handler == 2)
            _Rectangle = new Rect(_OriginalRect.Left, _OriginalRect.Top, _OriginalRect.Right + x, _OriginalRect.Bottom + y);
        else if (Handler == 3)
            _Rectangle = new Rect(_OriginalRect.Left + x, _OriginalRect.Top, _OriginalRect.Right, _OriginalRect.Bottom + y);

        if (_Rectangle.Left < 1 || _Rectangle.Top < 1 || _Rectangle.Right > $("#mycanvas").get(0).width || _Rectangle.Bottom > $("#mycanvas").get(0).height || _Rectangle.GetHeight() < 51 || _Rectangle.GetWidth() < 51)
            _Rectangle = new Rect(temprect.Left, temprect.Top, temprect.Right, temprect.Bottom);
    };

    function getProperty() {
        var p = "";
        if (_Points != null)
            for (var i = 0; i < _Points.length; i++)
                p += _Points[i].x + ":" + _Points[i].y + ";";

        //        var s = "TimeStamp=" + _TimeStamp + ",UserId=" + _UserID + ",ObjID=" + _ObjID + ",MyType=" + _MyType + ",BorderColor=" + _BorderColor +
        //                 ",BorderWidth=" + _BorderWidth + ",FillColor=" + _FillColor + ",Text=" + _Text + ",FontSize=" + _FontSize + ",FontFaimily=" +
        //                  _FontFaimily + ",FontColor=" + _FontColor + ",ImagePath=" + _ImagePath + ",Rectangle=[;Left=" + _Rectangle.Left + ";Top=" +
        //                   _Rectangle.Top + ";Right=" + _Rectangle.Right + ";Bottom=" + _Rectangle.Bottom + ";],Points=[;" + p + "],IsSelected=" + _isSelected;



        var s = "TimeStamp=" + _TimeStamp + ",UserId=" + _UserID + ",ObjID=" + _ObjID + ",MyType=" + _MyType + ",BorderColor=" + _BorderColor +
                 ",BorderWidth=" + _BorderWidth + ",FillColor=" + _FillColor + ",Text=" + _Text + ",FontSize=" + _FontSize + ",FontFaimily=" +
                  _FontFaimily + ",FontColor=" + _FontColor + ",ImagePath=" + _ImagePath + ",Rectangle=[;Left=" + _Rectangle.Left + ";Top=" +
                  _Rectangle.Top + ";Right=" + _Rectangle.Right + ";Bottom=" + _Rectangle.Bottom + ";],Points=[;" + p + "],IsSelected=" + _isSelected + ", UpDatedBy=" + _UpDatedBy + ", CanvasHeight=" + _CanvasHeight + ", CanvasWidth=" + _CanvasWidth;
        return s;
    }

    this.GetProperty = function () {
        return getProperty();
    }

    //this.getPropertyObj = function () {
    //    var Property = {};
    //    Property.TimeStamp = _TimeStamp;
    //    Property.UserID = _UserID;
    //    Property.Id = _ObjID;
    //    Property.MyType = _MyType;
    //    Property.Left = _Rectangle.Left;
    //    Property.Top = _Rectangle.Top;
    //    Property.Right = _Rectangle.Right;

    //    Property.Bottom = _Rectangle.Bottom;
    //    Property.Points = _Points;
    //    Property.BorderWidth = _BorderWidth;
    //    Property.BorderColor = _BorderColor;
    //    Property.FillColor = _FillColor;
    //    Property.Text = _Text;
    //    Property.FontColor = _FontColor;
    //    Property.FontSize = _FontSize;
    //    Property.FontFaimily = _FontFaimily;
    //    Property.ImagePath = _ImagePath;
    //    Property.IsSelected = _isSelected;
    //    Property.UpDatedBy = _UpDatedBy
    //    Property.CanvasHeight = _CanvasHeight;
    //    Property.CanvasWidth = _CanvasWidth;
    //    return Property;
    //}
    this.getPropertyObj = function () {

        var Property = {};
        Property.TimeStamp = _TimeStamp;
        Property.UserID = _UserID;
        Property.Id = _ObjID;
        Property.MyType = _MyType;
        Property.Left = _Rectangle.Left;
        Property.Top = _Rectangle.Top;
        Property.Right = _Rectangle.Right;
        Property.Bottom = _Rectangle.Bottom;
        var pa = new Array();
        for (var i in _Points)
            pa.push({ x: _Points[i].x, y: _Points[i].y });
        Property.Points = pa;
        Property.BorderWidth = _BorderWidth;
        Property.BorderColor = _BorderColor;
        Property.FillColor = _FillColor;
        Property.Text = _Text;
        Property.FontColor = _FontColor;
        Property.FontSize = _FontSize;
        Property.FontFaimily = _FontFaimily;
        var patha = new Array();

        Property.ImagePath = _ImagePath;
        Property.IsSelected = _isSelected;
        Property.UpDatedBy = _UpDatedBy
        Property.CanvasHeight = _CanvasHeight;
        Property.CanvasWidth = _CanvasWidth;
        return Property;
    }


};

var GraphicsText = function (Text, StartPoint, FontSize, FontColor, FontFaimily, objid, objUserId) {
    var base = new GraphicsBase(objid);
    base.UserID(objUserId);
    base.MyType("Text");
    base.Text(Text);
    base.FontSize(FontSize);
    base.FontColor(FontColor);
    base.FontFaimily(FontFaimily);
    base.Rectangle(new Rect(StartPoint.Left, StartPoint.Top, StartPoint.Right, StartPoint.Bottom));

    this.Text = function (value) {
        if (typeof value == "undefined")
            return base.Text();
        else
            base.Text(value);
    }

    this.IsEdit = function (value) {
        if (typeof value == "undefined")
            return base.IsEdit();
        else
            base.IsEdit(value);
    }


    this.TimeStamp = function (value) {
        if (typeof value == "undefined")
            return base.TimeStamp();
        else
            base.TimeStamp(value);
    }

    this.IsSelected = function (value) {
        if (typeof value == "undefined")
            return base.IsSelected();
        else
            base.IsSelected(value);
    }
    this.UpDatedBy = function (value) {
        if (typeof value == "undefined")
            return base.UpDatedBy();
        else
            base.UpDatedBy(value);
    }
    this.GetProperty = function () {
        return base.GetProperty();
    }

    this.getPropertyObj = function () {
        return base.getPropertyObj();
    }

    this.Draw = function (Context) {
        if (base.IsSelected()) {
            base.Draw(Context);
        }

        Context.textBaseline = "top";
        Context.textAlign = "start";
        Context.fillStyle = base.FontColor();
        Context.textStrokeWidth = 2;

        var LocalFontSize = 0;
        var flag = true;
        while (flag) {
            LocalFontSize += 1;
            Context.font = LocalFontSize.toString() + "px " + base.FontFaimily();
            var len = Context.measureText(Text).width;

            if (len > base.Rectangle().GetWidth()) {
                FontSize = LocalFontSize - 1;
                flag = false;
                break;
            }
        }

        Context.font = FontSize.toString() + "px " + base.FontFaimily();
        Context.fillText(base.Text(), base.Rectangle().Left, base.Rectangle().Top);

        var metrics = Context.measureText(base.Text());
        base.FontSize(FontSize);
        base.Rectangle(new Rect(base.Rectangle().Left, base.Rectangle().Top, base.Rectangle().Left + metrics.width, base.Rectangle().Top + FontSize));
    };


    this.isContains = function (p) {
        return base.isContains(p);
    };
    this.UpdateRectangle = function (rectangle) {
        base.Rectangle(rectangle);
    };
    this.Update = function () {
        base.OriginalRect(base.Rectangle());
    };
    this.Move = function (x, y) {
        base.Move(x, y);
    };
    this.MoveHandler = function (Handler, x, y) {
        base.MoveHandler(Handler, x, y);
    };
    this.getHandler = function (p) {
        return base.getHandler(p);
    };
    this.SetDrawingOption = function (to, value) {
        if (to == "FontFamily") {
            base.FontFaimily(value);
        }
        if (to == "FontColor") {
            base.FontColor(value);
        }
    };
};

var GraphicsImage = function (Path, Position, objid, objUserId) {
    var base = new GraphicsBase(objid);
    base.UserID(objUserId);
    base.MyType("Image");
    base.ImagePath(Path);
    base.Rectangle(new Rect(Position.Left, Position.Top, Position.Right, Position.Bottom));

    this.TimeStamp = function (value) {
        if (typeof value == "undefined")
            return base.TimeStamp();
        else
            base.TimeStamp(value);
    }

    this.IsSelected = function (value) {
        if (typeof value == "undefined")
            return base.IsSelected();
        else
            base.IsSelected(value);
    }

    this.GetProperty = function () {
        return base.GetProperty();
    }

    this.getPropertyObj = function () {
        return base.getPropertyObj();
    }
    this.UpDatedBy = function (value) {
        if (typeof value == "undefined")
            return base.UpDatedBy();
        else
            base.UpDatedBy(value);
    }
    this.Draw = function (Context) {
        if (base.IsSelected()) {
            base.Draw(Context);
        }
        var imageObj = new Image();
        imageObj.onload = function () {
            Context.drawImage(imageObj, base.Rectangle().Left, base.Rectangle().Top, base.Rectangle().GetWidth(), base.Rectangle().GetHeight());
        };
        imageObj.src = base.ImagePath();
    };

    this.isContains = function (p) {
        return base.isContains(p);
    };

    this.Update = function () {
        base.OriginalRect(base.Rectangle());
    };
    this.UpdateRectangle = function (rectangle) {
        base.Rectangle(rectangle);
    };
    this.Move = function (x, y) {
        base.Move(x, y);
    };
    this.MoveHandler = function (Handler, x, y) {
        base.MoveHandler(Handler, x, y);
    };
    this.getHandler = function (p) {
        return base.getHandler(p);
    };
    this.SetDrawingOption = function (to, value) {

    };
};

//var GraphicsEraser = function (points, EraserWidth, EraserColor, objid, objUserId) {
//    var base = new GraphicsBase(objid);

//    base.UserID(objUserId);
//    base.MyType("Eraser");
//    base.BorderWidth(EraserWidth);
//    base.BorderColor(EraserColor);
//    base.Points(points);



//    this.IsSelected = function (value) {
//        if (typeof value == "undefined")
//            return base.IsSelected();
//        else
//            base.IsSelected(value);
//    }

//    this.TimeStamp = function (value) {
//        if (typeof value == "undefined")
//            return base.TimeStamp();
//        else
//            base.TimeStamp(value);
//    }

//    this.GetProperty = function () {
//        return base.GetProperty();
//    }

//    this.AddPoint = function (p) {
//        base.AddPoint(p);
//        this.UpdateRectangle();
//    };

//    this.Draw = function (Context) {
//        if (base.IsSelected()) {
//            base.Draw(Context);
//        }
//        Context.beginPath();
//        Context.moveTo(base.Points()[0].x, base.Points()[0].y);
//        for (var i = 0; i < base.Points().length; i++) {
//            Context.lineTo(base.Points()[i].x, base.Points()[i].y);
//        }
//        Context.lineWidth = base.BorderWidth();
//        Context.lineCap = "round";
//        Context.lineJoin = "round";
//        Context.strokeStyle = base.BorderColor();
//        Context.stroke();
//    };

//    this.isContains = function (p) {
//        return base.isContains(p);
//    }

//    this.UpdateRectangle = function () {
//        var p = base.Points();
//        var minx = p[0].x;
//        var miny = p[0].y;
//        var maxx = p[0].x;
//        var maxy = p[0].y;
//        for (var i = 0; i < p.length; i++) {
//            if (minx > p[i].x)
//                minx = p[i].x;
//            if (miny > p[i].y)
//                miny = p[i].y;
//            if (maxx < p[i].x)
//                maxx = p[i].x;
//            if (maxy < p[i].y)
//                maxy = p[i].y;
//        }
//        base.Rectangle(new Rect(minx, miny, maxx, maxy));
//    };

//    this.Update = function () {
//        var p = new Array();
//        for (var i = 0; i < base.Points().length; i++) {
//            p.push(new Point(base.Points()[i].x, base.Points()[i].y));
//        }
//        base.OriginalPoints(p);
//        base.OriginalRect(base.Rectangle());
//    };

//    this.Move = function (x, y) {
//        var p = new Array();
//        for (var i = 0; i < base.OriginalPoints().length; i++) {
//            var x1 = base.OriginalPoints()[i].x + x;
//            var y1 = base.OriginalPoints()[i].y + y;
//            p.push(new Point(x1, y1));
//        }
//        base.Points(p);
//        base.Move(x, y);
//    };

//    this.MoveHandler = function (Handler, x, y) {
//        var p = new Array();
//        switch (Handler) {
//            case 0:
//                var dx = (base.OriginalRect().GetWidth() - x) / base.OriginalRect().GetWidth();
//                var dy = (base.OriginalRect().GetHeight() - y) / base.OriginalRect().GetHeight();
//                for (var i = 0; i < base.OriginalPoints().length; i++) {
//                    var x1 = base.OriginalRect().Right - ((base.OriginalRect().Right - base.OriginalPoints()[i].x) * dx);
//                    var y1 = base.OriginalRect().Bottom - ((base.OriginalRect().Bottom - base.OriginalPoints()[i].y) * dy);
//                    p.push(new Point(x1, y1));
//                }
//                break;
//            case 1:
//                var dx = (base.OriginalRect().GetWidth() + x) / base.OriginalRect().GetWidth();
//                var dy = (base.OriginalRect().GetHeight() - y) / base.OriginalRect().GetHeight();
//                for (var i = 0; i < base.OriginalPoints().length; i++) {
//                    var x1 = base.OriginalRect().Left + ((base.OriginalPoints()[i].x - base.OriginalRect().Left) * dx);
//                    var y1 = base.OriginalRect().Bottom - ((base.OriginalRect().Bottom - base.OriginalPoints()[i].y) * dy);
//                    p.push(new Point(x1, y1));
//                }
//                break;
//            case 2:
//                var dx = (base.OriginalRect().GetWidth() + x) / base.OriginalRect().GetWidth();
//                var dy = (base.OriginalRect().GetHeight() + y) / base.OriginalRect().GetHeight();
//                for (var i = 0; i < base.OriginalPoints().length; i++) {
//                    var x1 = base.OriginalRect().Left + ((base.OriginalPoints()[i].x - base.OriginalRect().Left) * dx);
//                    var y1 = base.OriginalRect().Top + ((base.OriginalPoints()[i].y - base.OriginalRect().Top) * dy);
//                    p.push(new Point(x1, y1));
//                }
//                break;
//            case 3:
//                var dx = (base.OriginalRect().GetWidth() - x) / base.OriginalRect().GetWidth();
//                var dy = (base.OriginalRect().GetHeight() + y) / base.OriginalRect().GetHeight();
//                for (var i = 0; i < base.OriginalPoints().length; i++) {
//                    var x1 = base.OriginalRect().Right - ((base.OriginalRect().Right - base.OriginalPoints()[i].x) * dx);
//                    var y1 = base.OriginalRect().Top + ((base.OriginalPoints()[i].y - base.OriginalRect().Top) * dy);
//                    p.push(new Point(x1, y1));
//                }
//                break;
//        }
//        base.Points(p);
//        base.MoveHandler(Handler, x, y);

//    };

//    this.getHandler = function (p) {
//        return base.getHandler(p);
//    };

//    this.SetDrawingOption = function (to, value) {
//        if (to == "EraserLineWidth") {
//            base.BorderWidth(value);
//        }

//    };
//};

var GraphicsHighlighterPolyLine = function (points, penWidth, penColor, objid, objUserId) {
    var base = new GraphicsBase(objid);
    base.UserID(objUserId);
    base.MyType("HighlighterPolyLine");
    base.BorderWidth(penWidth);
    base.BorderColor(penColor);
    base.Points(points);

    this.IsEdit = function (value) {
        if (typeof value == "undefined")
            return base.IsEdit();
        else
            base.IsEdit(value);
    }
    this.TimeStamp = function (value) {
        if (typeof value == "undefined")
            return base.TimeStamp();
        else
            base.TimeStamp(value);
    }
    this.UpDatedBy = function (value) {
        if (typeof value == "undefined")
            return base.UpDatedBy();
        else
            base.UpDatedBy(value);
    }
    this.IsSelected = function (value) {
        if (typeof value == "undefined")
            return base.IsSelected();
        else
            base.IsSelected(value);
    }
    this.getPropertyObj = function () {
        return base.getPropertyObj();
    }
    this.AddPoint = function (p) {
        base.AddPoint(p);
        this.UpdateRectangle();
    };
    this.Draw = function (Context) {
        if (base.Points().length < 2) return;
        if (base.IsSelected()) {
            base.Draw(Context);
        }
        Context.beginPath();
        Context.moveTo(base.Points()[0].x, base.Points()[0].y);
        for (var i = 0; i < base.Points().length - 2; i++) {
            var c = (base.Points()[i].x + base.Points()[i + 1].x) / 2;
            var d = (base.Points()[i].y + base.Points()[i + 1].y) / 2;
            Context.quadraticCurveTo(base.Points()[i].x, base.Points()[i].y, c, d);
        }
        Context.quadraticCurveTo(
            base.Points()[i].x,
            base.Points()[i].y,
            base.Points()[i + 1].x,
            base.Points()[i + 1].y
        );
        Context.lineWidth = base.BorderWidth() * 5;
        Context.globalAlpha = 0.5;
        Context.lineCap = "round";
        Context.lineJoin = "round";
        Context.strokeStyle = base.BorderColor();
        Context.stroke();
        Context.globalAlpha = 1;
    };
    this.isContains = function (p) {
        return base.isContains(p);
    }
    this.UpdateRectangle = function () {
        var p = base.Points();
        var minx = p[0].x;
        var miny = p[0].y;
        var maxx = p[0].x;
        var maxy = p[0].y;
        for (var i = 0; i < p.length; i++) {
            if (minx > p[i].x)
                minx = p[i].x;
            if (miny > p[i].y)
                miny = p[i].y;
            if (maxx < p[i].x)
                maxx = p[i].x;
            if (maxy < p[i].y)
                maxy = p[i].y;
        }
        var marging = (base.BorderWidth() * 2.5) / 2;
        base.Rectangle(new Rect(minx - marging, miny - marging, maxx + marging, maxy + marging));
    };
    this.UpdateRectangle();
    this.Update = function () {
        var p = new Array();
        for (var i = 0; i < base.Points().length; i++) {
            p.push(new Point(base.Points()[i].x, base.Points()[i].y));
        }
        base.OriginalPoints(p);
        base.OriginalRect(base.Rectangle());
    };
    this.Move = function (x, y) {
        var tempRect1 = new Rect(base.Rectangle().Left, base.Rectangle().Top, base.Rectangle().Right, base.Rectangle().Bottom);
        base.Move(x, y);
        var tempRect2 = new Rect(base.Rectangle().Left, base.Rectangle().Top, base.Rectangle().Right, base.Rectangle().Bottom);
        if (!(tempRect1.Left == tempRect2.Left && tempRect1.Top == tempRect2.Top && tempRect1.Right == tempRect2.Right && tempRect1.Bottom == tempRect2.Bottom)) {
            var p = new Array();
            for (var i = 0; i < base.OriginalPoints().length; i++) {
                var x1 = base.OriginalPoints()[i].x + x;
                var y1 = base.OriginalPoints()[i].y + y;
                p.push(new Point(x1, y1));
            }
            base.Points(p);
        }
    };
    this.MoveHandler = function (Handler, x, y) {
        var tempRect1 = new Rect(base.Rectangle().Left, base.Rectangle().Top, base.Rectangle().Right, base.Rectangle().Bottom);
        base.MoveHandler(Handler, x, y);
        var tempRect2 = new Rect(base.Rectangle().Left, base.Rectangle().Top, base.Rectangle().Right, base.Rectangle().Bottom);
        if (!(tempRect1.Left == tempRect2.Left && tempRect1.Top == tempRect2.Top && tempRect1.Right == tempRect2.Right && tempRect1.Bottom == tempRect2.Bottom)) {
            var p = new Array();
            switch (Handler) {
                case 0:
                    var dx = (base.OriginalRect().GetWidth() - x) / base.OriginalRect().GetWidth();
                    var dy = (base.OriginalRect().GetHeight() - y) / base.OriginalRect().GetHeight();
                    for (var i = 0; i < base.OriginalPoints().length; i++) {
                        var x1 = base.OriginalRect().Right - ((base.OriginalRect().Right - base.OriginalPoints()[i].x) * dx);
                        var y1 = base.OriginalRect().Bottom - ((base.OriginalRect().Bottom - base.OriginalPoints()[i].y) * dy);
                        p.push(new Point(x1, y1));
                    }
                    break;
                case 1:
                    var dx = (base.OriginalRect().GetWidth() + x) / base.OriginalRect().GetWidth();
                    var dy = (base.OriginalRect().GetHeight() - y) / base.OriginalRect().GetHeight();
                    for (var i = 0; i < base.OriginalPoints().length; i++) {
                        var x1 = base.OriginalRect().Left + ((base.OriginalPoints()[i].x - base.OriginalRect().Left) * dx);
                        var y1 = base.OriginalRect().Bottom - ((base.OriginalRect().Bottom - base.OriginalPoints()[i].y) * dy);
                        p.push(new Point(x1, y1));
                    }
                    break;
                case 2:
                    var dx = (base.OriginalRect().GetWidth() + x) / base.OriginalRect().GetWidth();
                    var dy = (base.OriginalRect().GetHeight() + y) / base.OriginalRect().GetHeight();
                    for (var i = 0; i < base.OriginalPoints().length; i++) {
                        var x1 = base.OriginalRect().Left + ((base.OriginalPoints()[i].x - base.OriginalRect().Left) * dx);
                        var y1 = base.OriginalRect().Top + ((base.OriginalPoints()[i].y - base.OriginalRect().Top) * dy);
                        p.push(new Point(x1, y1));
                    }
                    break;
                case 3:
                    var dx = (base.OriginalRect().GetWidth() - x) / base.OriginalRect().GetWidth();
                    var dy = (base.OriginalRect().GetHeight() + y) / base.OriginalRect().GetHeight();
                    for (var i = 0; i < base.OriginalPoints().length; i++) {
                        var x1 = base.OriginalRect().Right - ((base.OriginalRect().Right - base.OriginalPoints()[i].x) * dx);
                        var y1 = base.OriginalRect().Top + ((base.OriginalPoints()[i].y - base.OriginalRect().Top) * dy);
                        p.push(new Point(x1, y1));
                    }
                    break;
            }
            base.Points(p);
        }
    };

    this.getHandler = function (p) {
        return base.getHandler(p);
    };
    this.SetDrawingOption = function (to, value) {
        if (to == "HighlighterLineWidth") {
            base.BorderWidth(value);
        }
        if (to == "HighlighterLineColor") {
            base.BorderColor(value);
        }
    };
};



var GraphicsPolyLine = function (points, penWidth, penColor, objid, objUserId) {
    var base = new GraphicsBase(objid);

    base.UserID(objUserId);
    base.MyType("PolyLine");
    base.BorderWidth(penWidth);
    base.BorderColor(penColor);
    base.Points(points);

    this.IsEdit = function (value) {
        if (typeof value == "undefined")
            return base.IsEdit();
        else
            base.IsEdit(value);
    }

    this.IsSelected = function (value) {
        if (typeof value == "undefined")
            return base.IsSelected();
        else
            base.IsSelected(value);
    }

    this.TimeStamp = function (value) {
        if (typeof value == "undefined")
            return base.TimeStamp();
        else
            base.TimeStamp(value);
    }

    this.GetProperty = function () {
        return base.GetProperty();
    }

    this.getPropertyObj = function () {
        return base.getPropertyObj();
    }

    this.AddPoint = function (p) {
        base.AddPoint(p);
        this.UpdateRectangle();
    };

    //this.Draw = function (Context) {
    //    if (base.IsSelected()) {
    //        base.Draw(Context);
    //    }
    //    Context.beginPath();
    //    Context.moveTo(base.Points()[0].x, base.Points()[0].y);
    //    for (var i = 0; i < base.Points().length; i++) {
    //        Context.lineTo(base.Points()[i].x, base.Points()[i].y);
    //    }
    //    Context.lineWidth = base.BorderWidth();
    //    Context.lineCap = "round";
    //    Context.lineJoin = "round";
    //    Context.strokeStyle = base.BorderColor();
    //    Context.stroke();
    //};

    this.Draw = function (Context) {
        if (base.Points().length < 2) return;
        if (base.IsSelected()) {
            base.Draw(Context);
        }
        Context.beginPath();
        Context.moveTo(base.Points()[0].x, base.Points()[0].y);
        for (var i = 0; i < base.Points().length - 2; i++) {
            var c = (base.Points()[i].x + base.Points()[i + 1].x) / 2;
            var d = (base.Points()[i].y + base.Points()[i + 1].y) / 2;
            Context.quadraticCurveTo(base.Points()[i].x, base.Points()[i].y, c, d);
        }
        Context.quadraticCurveTo(
            base.Points()[i].x,
            base.Points()[i].y,
            base.Points()[i + 1].x,
            base.Points()[i + 1].y
        );
        Context.lineWidth = base.BorderWidth();
        Context.lineCap = "round";
        Context.lineJoin = "round";
        Context.strokeStyle = base.BorderColor();
        Context.stroke();
    };

    this.isContains = function (p) {
        return base.isContains(p);
    }

    this.UpdateRectangle = function () {
        var p = base.Points();
        var minx = p[0].x;
        var miny = p[0].y;
        var maxx = p[0].x;
        var maxy = p[0].y;
        for (var i = 0; i < p.length; i++) {
            if (minx > p[i].x)
                minx = p[i].x;
            if (miny > p[i].y)
                miny = p[i].y;
            if (maxx < p[i].x)
                maxx = p[i].x;
            if (maxy < p[i].y)
                maxy = p[i].y;
        }
        base.Rectangle(new Rect(minx, miny, maxx, maxy));
    };

    this.Update = function () {
        var p = new Array();
        for (var i = 0; i < base.Points().length; i++) {
            p.push(new Point(base.Points()[i].x, base.Points()[i].y));
        }
        base.OriginalPoints(p);
        base.OriginalRect(base.Rectangle());
    };
    this.UpDatedBy = function (value) {
        if (typeof value == "undefined")
            return base.UpDatedBy();
        else
            base.UpDatedBy(value);
    }

    this.Move = function (x, y) {
        var tempRect1 = new Rect(base.Rectangle().Left, base.Rectangle().Top, base.Rectangle().Right, base.Rectangle().Bottom);
        base.Move(x, y);
        var tempRect2 = new Rect(base.Rectangle().Left, base.Rectangle().Top, base.Rectangle().Right, base.Rectangle().Bottom);
        if (!(tempRect1.Left == tempRect2.Left && tempRect1.Top == tempRect2.Top && tempRect1.Right == tempRect2.Right && tempRect1.Bottom == tempRect2.Bottom)) {
            var p = new Array();
            for (var i = 0; i < base.OriginalPoints().length; i++) {
                var x1 = base.OriginalPoints()[i].x + x;
                var y1 = base.OriginalPoints()[i].y + y;
                p.push(new Point(x1, y1));
            }
            base.Points(p);
        }
    };

    this.MoveHandler = function (Handler, x, y) {
        var tempRect1 = new Rect(base.Rectangle().Left, base.Rectangle().Top, base.Rectangle().Right, base.Rectangle().Bottom);
        base.MoveHandler(Handler, x, y);
        var tempRect2 = new Rect(base.Rectangle().Left, base.Rectangle().Top, base.Rectangle().Right, base.Rectangle().Bottom);
        if (!(tempRect1.Left == tempRect2.Left && tempRect1.Top == tempRect2.Top && tempRect1.Right == tempRect2.Right && tempRect1.Bottom == tempRect2.Bottom)) {
            var p = new Array();
            switch (Handler) {
                case 0:
                    var dx = (base.OriginalRect().GetWidth() - x) / base.OriginalRect().GetWidth();
                    var dy = (base.OriginalRect().GetHeight() - y) / base.OriginalRect().GetHeight();
                    for (var i = 0; i < base.OriginalPoints().length; i++) {
                        var x1 = base.OriginalRect().Right - ((base.OriginalRect().Right - base.OriginalPoints()[i].x) * dx);
                        var y1 = base.OriginalRect().Bottom - ((base.OriginalRect().Bottom - base.OriginalPoints()[i].y) * dy);
                        p.push(new Point(x1, y1));
                    }
                    break;
                case 1:
                    var dx = (base.OriginalRect().GetWidth() + x) / base.OriginalRect().GetWidth();
                    var dy = (base.OriginalRect().GetHeight() - y) / base.OriginalRect().GetHeight();
                    for (var i = 0; i < base.OriginalPoints().length; i++) {
                        var x1 = base.OriginalRect().Left + ((base.OriginalPoints()[i].x - base.OriginalRect().Left) * dx);
                        var y1 = base.OriginalRect().Bottom - ((base.OriginalRect().Bottom - base.OriginalPoints()[i].y) * dy);
                        p.push(new Point(x1, y1));
                    }
                    break;
                case 2:
                    var dx = (base.OriginalRect().GetWidth() + x) / base.OriginalRect().GetWidth();
                    var dy = (base.OriginalRect().GetHeight() + y) / base.OriginalRect().GetHeight();
                    for (var i = 0; i < base.OriginalPoints().length; i++) {
                        var x1 = base.OriginalRect().Left + ((base.OriginalPoints()[i].x - base.OriginalRect().Left) * dx);
                        var y1 = base.OriginalRect().Top + ((base.OriginalPoints()[i].y - base.OriginalRect().Top) * dy);
                        p.push(new Point(x1, y1));
                    }
                    break;
                case 3:
                    var dx = (base.OriginalRect().GetWidth() - x) / base.OriginalRect().GetWidth();
                    var dy = (base.OriginalRect().GetHeight() + y) / base.OriginalRect().GetHeight();
                    for (var i = 0; i < base.OriginalPoints().length; i++) {
                        var x1 = base.OriginalRect().Right - ((base.OriginalRect().Right - base.OriginalPoints()[i].x) * dx);
                        var y1 = base.OriginalRect().Top + ((base.OriginalPoints()[i].y - base.OriginalRect().Top) * dy);
                        p.push(new Point(x1, y1));
                    }
                    break;
            }
            base.Points(p);
        }
    };

    this.getHandler = function (p) {
        return base.getHandler(p);
    };

    this.SetDrawingOption = function (to, value) {
        if (to == "PenLineWidth") {
            base.BorderWidth(value);
        }
        if (to == "PenLineColor") {
            base.BorderColor(value);
        }
    };
};

var GraphicsRectangle = function (lineWidth, lineColor, fillColor, objid, objUserId) {
    var base = new GraphicsBase(objid);

    base.UserID(objUserId);
    base.MyType("Rectangle");
    base.BorderWidth(lineWidth);
    base.BorderColor(lineColor);
    base.FillColor(fillColor);

    this.IsEdit = function (value) {
        if (typeof value == "undefined")
            return base.IsEdit();
        else
            base.IsEdit(value);
    }

    this.TimeStamp = function (value) {
        if (typeof value == "undefined")
            return base.TimeStamp();
        else
            base.TimeStamp(value);
    }
    this.UpDatedBy = function (value) {
        if (typeof value == "undefined")
            return base.UpDatedBy();
        else
            base.UpDatedBy(value);
    }

    this.IsSelected = function (value) {
        if (typeof value == "undefined")
            return base.IsSelected();
        else
            base.IsSelected(value);
    }

    this.GetProperty = function () {
        return base.GetProperty();
    }

    this.getPropertyObj = function () {
        return base.getPropertyObj();
    }

    this.Draw = function (Context) {
        if (base.IsSelected()) {
            base.Draw(Context);
        }
        Context.beginPath();
        Context.rect(base.Rectangle().Left, base.Rectangle().Top, base.Rectangle().GetWidth(), base.Rectangle().GetHeight());
        Context.fillStyle = base.FillColor();
        Context.fill();
        Context.lineWidth = base.BorderWidth();
        Context.strokeStyle = base.BorderColor();
        Context.stroke();
    };

    this.isContains = function (p) {
        return base.isContains(p);
    };
    this.UpdateRectangle = function (rectangle) {
        base.Rectangle(rectangle);
    };
    this.Update = function () {
        base.OriginalRect(base.Rectangle());
    };
    this.Move = function (x, y) {
        base.Move(x, y);
    };
    this.MoveHandler = function (Handler, x, y) {
        base.MoveHandler(Handler, x, y);
    };
    this.getHandler = function (p) {
        return base.getHandler(p);
    };
    this.SetDrawingOption = function (to, value) {
        if (to == "RectangleLineWidth") {
            base.BorderWidth(value);
        }
        if (to == "RectangleLineColor") {
            base.BorderColor(value);
        }
        if (to == "RectangleFillColor") {
            base.FillColor(value);
        }
    };
};
var GraphicsTriangle = function (lineWidth, lineColor, fillColor, objid, objUserId) {
    var base = new GraphicsBase(objid);

    base.UserID(objUserId);

    base.MyType("Triangle");

    base.BorderWidth(lineWidth);
    base.BorderColor(lineColor);
    base.FillColor(fillColor);

    this.IsEdit = function (value) {
        if (typeof value == "undefined")
            return base.IsEdit();
        else
            base.IsEdit(value);
    }

    this.TimeStamp = function (value) {
        if (typeof value == "undefined")
            return base.TimeStamp();
        else
            base.TimeStamp(value);
    }

    this.IsSelected = function (value) {
        if (typeof value == "undefined")
            return base.IsSelected();
        else
            base.IsSelected(value);
    }

    this.GetProperty = function () {
        return base.GetProperty();
    }
    this.getPropertyObj = function () {
        return base.getPropertyObj();
    }
    this.Draw = function (Context) {
        if (base.IsSelected()) {
            base.Draw(Context);
        }

        Context.beginPath();

        Context.moveTo((base.Rectangle().Left + base.Rectangle().GetWidth() / 2), base.Rectangle().Top); //Top Corner
        Context.lineTo(base.Rectangle().Right, base.Rectangle().Bottom); //Right Corner
        Context.lineTo(base.Rectangle().Left, base.Rectangle().Bottom); //Left Corner
        Context.closePath();

        Context.lineWidth = base.BorderWidth();
        Context.lineJoin = "round";
        Context.strokeStyle = base.BorderColor();
        Context.fillStyle = base.FillColor();
        Context.fill();
        Context.stroke();


    };

    this.isContains = function (p) {
        return base.isContains(p);
    };
    this.UpdateRectangle = function (rectangle) {
        base.Rectangle(rectangle);
    };
    this.Update = function () {
        base.OriginalRect(base.Rectangle());
    };
    this.Move = function (x, y) {
        base.Move(x, y);

    };
    this.UpDatedBy = function (value) {
        if (typeof value == "undefined")
            return base.UpDatedBy();
        else
            base.UpDatedBy(value);
    }
    this.MoveHandler = function (Handler, x, y) {
        base.MoveHandler(Handler, x, y);
    };
    this.getHandler = function (p) {
        return base.getHandler(p);
    };
    this.SetDrawingOption = function (to, value) {
        if (to == "TriangleLineWidth") {
            base.BorderWidth(value);
        }
        if (to == "TriangleLineColor") {
            base.BorderColor(value);
        }
        if (to == "TriangleFillColor") {
            base.FillColor(value);
        }
    };
};

var GraphicsEllipse = function (lineWidth, lineColor, fillColor, objid, objUserId) {
    var base = new GraphicsBase(objid);

    base.UserID(objUserId);

    base.MyType("Circle");

    base.BorderWidth(lineWidth);
    base.BorderColor(lineColor);
    base.FillColor(fillColor);

    this.IsEdit = function (value) {
        if (typeof value == "undefined")
            return base.IsEdit();
        else
            base.IsEdit(value);
    }

    this.TimeStamp = function (value) {
        if (typeof value == "undefined")
            return base.TimeStamp();
        else
            base.TimeStamp(value);
    }

    this.IsSelected = function (value) {
        if (typeof value == "undefined")
            return base.IsSelected();
        else
            base.IsSelected(value);
    }

    this.GetProperty = function () {
        return base.GetProperty();
    }
    this.getPropertyObj = function () {
        return base.getPropertyObj();
    }
    this.Draw = function (Context) {
        if (base.IsSelected()) {
            base.Draw(Context);
        }

        Context.beginPath();
        centerX = (base.Rectangle().Left + base.Rectangle().Right) / 2;
        centerY = (base.Rectangle().Top + base.Rectangle().Bottom) / 2;
        var radius = null;
        if (base.Rectangle().GetHeight() < base.Rectangle().GetWidth())
            radius = base.Rectangle().GetHeight() / 2;
        else
            radius = base.Rectangle().GetWidth() / 2;
        Context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        Context.fillStyle = base.FillColor();
        Context.fill();
        Context.lineWidth = base.BorderWidth();
        Context.strokeStyle = base.BorderColor();
        Context.stroke();


    };

    this.isContains = function (p) {
        return base.isContains(p);
    };
    this.UpdateRectangle = function (rectangle) {
        base.Rectangle(rectangle);
    };
    this.Update = function () {
        base.OriginalRect(base.Rectangle());
    };

    this.UpDatedBy = function (value) {
        if (typeof value == "undefined")
            return base.UpDatedBy();
        else
            base.UpDatedBy(value);
    }

    this.Move = function (x, y) {
        base.Move(x, y);
    };
    this.MoveHandler = function (Handler, x, y) {
        base.MoveHandler(Handler, x, y);
    };
    this.getHandler = function (p) {
        return base.getHandler(p);
    };
    this.SetDrawingOption = function (to, value) {
        if (to == "CircleLineWidth") {
            base.BorderWidth(value);
        }
        if (to == "CircleLineColor") {
            base.BorderColor(value);
        }
        if (to == "CircleFillColor") {
            base.FillColor(value);
        }
    };
};

var GraphicsLine = function (points, lineWidth, lineColor, objid, objUserId) {
    var base = new GraphicsBase(objid);

    base.UserID(objUserId);
    base.MyType("Line");
    base.BorderWidth(lineWidth);
    base.BorderColor(lineColor);
    base.Points(points);

    this.IsEdit = function (value) {
        if (typeof value == "undefined")
            return base.IsEdit();
        else
            base.IsEdit(value);
    }

    this.IsSelected = function (value) {
        if (typeof value == "undefined")
            return base.IsSelected();
        else
            base.IsSelected(value);
    }

    this.TimeStamp = function (value) {
        if (typeof value == "undefined")
            return base.TimeStamp();
        else
            base.TimeStamp(value);
    }
    this.UpDatedBy = function (value) {
        if (typeof value == "undefined")
            return base.UpDatedBy();
        else
            base.UpDatedBy(value);
    }

    this.getPropertyObj = function () {
        return base.getPropertyObj();
    }

    this.AddPoint = function (p) {
        var o = base.Points();
        var aa = new Array();
        aa.push(o[0]);
        aa.push(p);
        base.Points(aa);

        this.UpdateRectangle();
    };

    this.Draw = function (Context) {
        if (base.IsSelected()) {
            base.Draw(Context);
        }
        Context.beginPath();
        Context.moveTo(base.Points()[0].x, base.Points()[0].y);
        for (var i = 0; i < base.Points().length; i++) {
            Context.lineTo(base.Points()[i].x, base.Points()[i].y);
        }
        Context.lineWidth = base.BorderWidth();
        Context.lineCap = "round";
        Context.lineJoin = "round";
        Context.strokeStyle = base.BorderColor();
        Context.stroke();
    };

    this.isContains = function (p) {
        return base.isContains(p);
    }

    this.UpdateRectangle = function () {
        var p = base.Points();
        var minx = p[0].x;
        var miny = p[0].y;
        var maxx = p[0].x;
        var maxy = p[0].y;
        for (var i = 0; i < p.length; i++) {
            if (minx > p[i].x)
                minx = p[i].x;
            if (miny > p[i].y)
                miny = p[i].y;
            if (maxx < p[i].x)
                maxx = p[i].x;
            if (maxy < p[i].y)
                maxy = p[i].y;
        }
        var marging = base.BorderWidth() / 2;
        base.Rectangle(new Rect(minx - marging, miny - marging, maxx + marging, maxy + marging));
    };
    this.UpdateRectangle();
    this.Update = function () {
        var p = new Array();
        for (var i = 0; i < base.Points().length; i++) {
            p.push(new Point(base.Points()[i].x, base.Points()[i].y));
        }
        base.OriginalPoints(p);
        base.OriginalRect(base.Rectangle());
    };

    this.Move = function (x, y) {
        var tempRect1 = new Rect(base.Rectangle().Left, base.Rectangle().Top, base.Rectangle().Right, base.Rectangle().Bottom);
        base.Move(x, y);
        var tempRect2 = new Rect(base.Rectangle().Left, base.Rectangle().Top, base.Rectangle().Right, base.Rectangle().Bottom);
        if (!(tempRect1.Left == tempRect2.Left && tempRect1.Top == tempRect2.Top && tempRect1.Right == tempRect2.Right && tempRect1.Bottom == tempRect2.Bottom)) {
            var p = new Array();
            for (var i = 0; i < base.OriginalPoints().length; i++) {
                var x1 = base.OriginalPoints()[i].x + x;
                var y1 = base.OriginalPoints()[i].y + y;
                p.push(new Point(x1, y1));
            }
            base.Points(p);
        }
    };

    this.MoveHandler = function (Handler, x, y) {
        var tempRect1 = new Rect(base.Rectangle().Left, base.Rectangle().Top, base.Rectangle().Right, base.Rectangle().Bottom);
        base.MoveHandler(Handler, x, y);
        var tempRect2 = new Rect(base.Rectangle().Left, base.Rectangle().Top, base.Rectangle().Right, base.Rectangle().Bottom);
        if (!(tempRect1.Left == tempRect2.Left && tempRect1.Top == tempRect2.Top && tempRect1.Right == tempRect2.Right && tempRect1.Bottom == tempRect2.Bottom)) {
            var p = new Array();
            switch (Handler) {
                case 0:
                    var dx = (base.OriginalRect().GetWidth() - x) / base.OriginalRect().GetWidth();
                    var dy = (base.OriginalRect().GetHeight() - y) / base.OriginalRect().GetHeight();
                    for (var i = 0; i < base.OriginalPoints().length; i++) {
                        var x1 = base.OriginalRect().Right - ((base.OriginalRect().Right - base.OriginalPoints()[i].x) * dx);
                        var y1 = base.OriginalRect().Bottom - ((base.OriginalRect().Bottom - base.OriginalPoints()[i].y) * dy);
                        p.push(new Point(x1, y1));
                    }
                    break;
                case 1:
                    var dx = (base.OriginalRect().GetWidth() + x) / base.OriginalRect().GetWidth();
                    var dy = (base.OriginalRect().GetHeight() - y) / base.OriginalRect().GetHeight();
                    for (var i = 0; i < base.OriginalPoints().length; i++) {
                        var x1 = base.OriginalRect().Left + ((base.OriginalPoints()[i].x - base.OriginalRect().Left) * dx);
                        var y1 = base.OriginalRect().Bottom - ((base.OriginalRect().Bottom - base.OriginalPoints()[i].y) * dy);
                        p.push(new Point(x1, y1));
                    }
                    break;
                case 2:
                    var dx = (base.OriginalRect().GetWidth() + x) / base.OriginalRect().GetWidth();
                    var dy = (base.OriginalRect().GetHeight() + y) / base.OriginalRect().GetHeight();
                    for (var i = 0; i < base.OriginalPoints().length; i++) {
                        var x1 = base.OriginalRect().Left + ((base.OriginalPoints()[i].x - base.OriginalRect().Left) * dx);
                        var y1 = base.OriginalRect().Top + ((base.OriginalPoints()[i].y - base.OriginalRect().Top) * dy);
                        p.push(new Point(x1, y1));
                    }
                    break;
                case 3:
                    var dx = (base.OriginalRect().GetWidth() - x) / base.OriginalRect().GetWidth();
                    var dy = (base.OriginalRect().GetHeight() + y) / base.OriginalRect().GetHeight();
                    for (var i = 0; i < base.OriginalPoints().length; i++) {
                        var x1 = base.OriginalRect().Right - ((base.OriginalRect().Right - base.OriginalPoints()[i].x) * dx);
                        var y1 = base.OriginalRect().Top + ((base.OriginalPoints()[i].y - base.OriginalRect().Top) * dy);
                        p.push(new Point(x1, y1));
                    }
                    break;
            }
            base.Points(p);
        }
    };
    this.getHandler = function (p) {
        return base.getHandler(p);
    };
    this.SetDrawingOption = function (to, value) {
        if (to == "LineWidth") {
            base.BorderWidth(value);
        }
        if (to == "LineColor") {
            base.BorderColor(value);
        }
    };
};


//var GraphicsLine = function (points, penWidth, penColor, objid, objUserId) {
//    var base = new GraphicsBase(objid);

//    base.UserID(objUserId);
//    base.MyType("Line");
//    base.BorderWidth(penWidth);
//    base.BorderColor(penColor);
//    base.Points(points);

//    this.IsSelected = function (value) {
//        if (typeof value == "undefined")
//            return base.IsSelected();
//        else
//            base.IsSelected(value);
//    }

//    this.TimeStamp = function (value) {
//        if (typeof value == "undefined")
//            return base.TimeStamp();
//        else
//            base.TimeStamp(value);
//    }
//    this.UpDatedBy = function (value) {
//        if (typeof value == "undefined")
//            return base.UpDatedBy();
//        else
//            base.UpDatedBy(value);
//    }

//    this.getPropertyObj = function () {
//        return base.getPropertyObj();
//    }

//    this.AddPoint = function (p) {
//        var o = base.Points();
//        var aa = new Array();
//        aa.push(o[0]);
//        aa.push(p);
//        base.Points(aa);

//        this.UpdateRectangle();
//    };

//    this.Draw = function (Context) {
//        if (base.IsSelected()) {
//            base.Draw(Context);
//        }
//        Context.beginPath();
//        Context.moveTo(base.Points()[0].x, base.Points()[0].y);
//        for (var i = 0; i < base.Points().length; i++) {
//            Context.lineTo(base.Points()[i].x, base.Points()[i].y);
//        }
//        Context.lineWidth = base.BorderWidth();
//        Context.lineCap = "round";
//        Context.lineJoin = "round";
//        Context.strokeStyle = base.BorderColor();
//        Context.stroke();
//    };

//    this.isContains = function (p) {
//        return base.isContains(p);
//    }

//    this.UpdateRectangle = function () {
//        var p = base.Points();
//        var minx = p[0].x;
//        var miny = p[0].y;
//        var maxx = p[0].x;
//        var maxy = p[0].y;
//        for (var i = 0; i < p.length; i++) {
//            if (minx > p[i].x)
//                minx = p[i].x;
//            if (miny > p[i].y)
//                miny = p[i].y;
//            if (maxx < p[i].x)
//                maxx = p[i].x;
//            if (maxy < p[i].y)
//                maxy = p[i].y;
//        }
//        var marging = base.BorderWidth() / 2;
//        base.Rectangle(new Rect(minx - marging, miny - marging, maxx + marging, maxy + marging));
//    };

//    this.Update = function () {
//        var p = new Array();
//        for (var i = 0; i < base.Points().length; i++) {
//            p.push(new Point(base.Points()[i].x, base.Points()[i].y));
//        }
//        base.OriginalPoints(p);
//        base.OriginalRect(base.Rectangle());
//    };

//    this.Move = function (x, y) {
//        var p = new Array();
//        for (var i = 0; i < base.OriginalPoints().length; i++) {
//            var x1 = base.OriginalPoints()[i].x + x;
//            var y1 = base.OriginalPoints()[i].y + y;
//            p.push(new Point(x1, y1));
//        }
//        base.Points(p);
//        base.Move(x, y);
//    };

//    this.MoveHandler = function (Handler, x, y) {
//        var p = new Array();
//        switch (Handler) {
//            case 0:
//                var dx = (base.OriginalRect().GetWidth() - x) / base.OriginalRect().GetWidth();
//                var dy = (base.OriginalRect().GetHeight() - y) / base.OriginalRect().GetHeight();
//                for (var i = 0; i < base.OriginalPoints().length; i++) {
//                    var x1 = base.OriginalRect().Right - ((base.OriginalRect().Right - base.OriginalPoints()[i].x) * dx);
//                    var y1 = base.OriginalRect().Bottom - ((base.OriginalRect().Bottom - base.OriginalPoints()[i].y) * dy);
//                    p.push(new Point(x1, y1));
//                }
//                break;
//            case 1:
//                var dx = (base.OriginalRect().GetWidth() + x) / base.OriginalRect().GetWidth();
//                var dy = (base.OriginalRect().GetHeight() - y) / base.OriginalRect().GetHeight();
//                for (var i = 0; i < base.OriginalPoints().length; i++) {
//                    var x1 = base.OriginalRect().Left + ((base.OriginalPoints()[i].x - base.OriginalRect().Left) * dx);
//                    var y1 = base.OriginalRect().Bottom - ((base.OriginalRect().Bottom - base.OriginalPoints()[i].y) * dy);
//                    p.push(new Point(x1, y1));
//                }
//                break;
//            case 2:
//                var dx = (base.OriginalRect().GetWidth() + x) / base.OriginalRect().GetWidth();
//                var dy = (base.OriginalRect().GetHeight() + y) / base.OriginalRect().GetHeight();
//                for (var i = 0; i < base.OriginalPoints().length; i++) {
//                    var x1 = base.OriginalRect().Left + ((base.OriginalPoints()[i].x - base.OriginalRect().Left) * dx);
//                    var y1 = base.OriginalRect().Top + ((base.OriginalPoints()[i].y - base.OriginalRect().Top) * dy);
//                    p.push(new Point(x1, y1));
//                }
//                break;
//            case 3:
//                var dx = (base.OriginalRect().GetWidth() - x) / base.OriginalRect().GetWidth();
//                var dy = (base.OriginalRect().GetHeight() + y) / base.OriginalRect().GetHeight();
//                for (var i = 0; i < base.OriginalPoints().length; i++) {
//                    var x1 = base.OriginalRect().Right - ((base.OriginalRect().Right - base.OriginalPoints()[i].x) * dx);
//                    var y1 = base.OriginalRect().Top + ((base.OriginalPoints()[i].y - base.OriginalRect().Top) * dy);
//                    p.push(new Point(x1, y1));
//                }
//                break;
//        }
//        base.Points(p);
//        base.MoveHandler(Handler, x, y);
//    };
//    this.getHandler = function (p) {
//        return base.getHandler(p);
//    };

//    this.SetDrawingOption = function (to, value) {
//        if (to == "LineWidth") {
//            base.BorderWidth(value);
//        }
//        if (to == "LineColor") {
//            base.BorderColor(value);
//        }
//    };
//};

var ToolLine = function () {
    var newline = null;
    var ismousedown = false;
    this.Type = "ToolLine";
    var SrartPoint = null;
    this.onmousedown = function (objcanvas, e) {
        ismousedown = true;
        var parr = new Array();
        var x = e.x - objcanvas.Xoffset;
        var y = e.y - objcanvas.Yoffset;
        parr.push(new Point(x, y));

        window.canvas.LineColor($("#LineColor").val());
        window.canvas.LineWidth($("#LineWidth").val());


        newline = new GraphicsLine(parr, objcanvas.LineWidth(), objcanvas.LineColor());
        window.CurrentObject = newline;
    };
    this.onmousemove = function (objcanvas, e) {
        if (ismousedown) {
            var x = e.x - objcanvas.Xoffset;
            var y = e.y - objcanvas.Yoffset;
            newline.AddPoint(new Point(x, y));
            objcanvas.DrawTemp();
        }
    };
    this.onmouseup = function (objcanvas, e) {
        ismousedown = false;
    };

    this.ontouchstart = function (objcanvas, coors) {
        ismousedown = true;
        var parr = new Array();
        var x = coors.x - objcanvas.Xoffset;
        var y = coors.y - objcanvas.Yoffset;
        parr.push(new Point(x, y));

        window.canvas.LineColor($("#LineColor").val());
        window.canvas.LineWidth($("#LineWidth").val());


        newline = new GraphicsLine(parr, objcanvas.LineWidth(), objcanvas.LineColor());
        window.CurrentObject = newline;
    };
    this.ontouchmove = function (objcanvas, coors) {
        if (ismousedown) {
            var x = coors.x - objcanvas.Xoffset;
            var y = coors.y - objcanvas.Yoffset;
            newline.AddPoint(new Point(x, y));
            objcanvas.DrawTemp();
        }
    };
    this.ontouchend = function (objcanvas, coors) {
        //this.ontouchend = function (objcanvas) {
        ismousedown = false;
    };
};

var ToolText = function () {
    this.Type = "ToolText";

    var canvas = null;
    this.point = null;
    me = this;
    // $("#t").bind("focusout", function (e) {
    //$("#t").focusout(function (e) {

    //});


    this.onmousedown = function (objcanvas, e) {
        objcanvas.ToolOption("Pointer");
        if (window.CanvasWidth - e.x < 150 || window.CanvasHeight - e.y < 150) {
            window.CurrentObject = null;
            return;
        }
        var x = e.x - objcanvas.Xoffset;
        var y = e.y - objcanvas.Yoffset;
        me.point = new Point(x, y);
        canvas = objcanvas;
        $("#TextBox").css({
            left: e.x,
            top: e.y,
            display: "block"
        });
        //objcanvas.ToolOption("Pointer");
        window.leftTextBox = e.x;
        window.topTextBox = e.y;


    };

    this.onmousemove = function (objcanvas, e) {

    };
    this.onmouseup = function (objcanvas, e) {

    };

    this.ontouchstart = function (objcanvas, coors) {
        objcanvas.ToolOption("Pointer");
        if (window.CanvasWidth - coors.x < 150 || window.CanvasHeight - coors.y < 150) {
            window.CurrentObject = null;
            return;
        }

        var x = coors.x - objcanvas.Xoffset;
        var y = coors.y - objcanvas.Yoffset;
        me.point = new Point(x, y);
        canvas = objcanvas;
        $("#TextBox").css({
            left: coors.x,
            top: coors.y,
            display: "block"
        });
        objcanvas.ToolOption("Pointer");
        window.leftTextBox = coors.x;
        window.topTextBox = coors.y;
    };

    this.ontouchmove = function (objcanvas, coors) {
    };

    //this.ontouchend = function (objcanvas) {
    this.ontouchend = function (objcanvas, coors) {
    };


};

var ToolEraser = function () {
    var newpolyline = null;
    var ismousedown = false;
    this.Type = "ToolEraser";
    this.onmousedown = function (objcanvas, e) {

    };
    this.onmousemove = function (objcanvas, e) {

    };
    this.onmouseup = function (objcanvas, e) {
        var x = e.x - objcanvas.Xoffset;
        var y = e.y - objcanvas.Yoffset;
        var p = new Point(x, y);

        for (var i = objcanvas.graphicsList.length - 1; i >= 0; i--) {
            var obj = objcanvas.graphicsList[i];
            if (obj.isContains(p)) {
                obj.IsSelected(true);
                break;
            }
        }
        objcanvas.DeleteSelected();
        window.CurrentObject = null;
    };

    this.ontouchstart = function (objcanvas, coors) {

    };

    this.ontouchmove = function (objcanvas, coors) {
    };

    //this.ontouchend = function (objcanvas) {
    this.ontouchend = function (objcanvas, coors) {
        var x = coors.x - objcanvas.Xoffset;
        var y = coors.y - objcanvas.Yoffset;
        var p = new Point(x, y);

        for (var i = objcanvas.graphicsList.length - 1; i >= 0; i--) {
            var obj = objcanvas.graphicsList[i];
            if (obj.isContains(p)) {
                obj.IsSelected(true);
                break;
            }
        }
        objcanvas.DeleteSelected();
        window.CurrentObject = null;
    };
};

var ToolHighlighterPolyLine = function () {
    var newHighlighterPolyline = null;
    var ismousedown = false;
    this.Type = "ToolHighlighterPolyLine";
    var SrartPoint = null;
    var polylinelist = new Array();
    this.onmousedown = function (objcanvas, e) {
        ismousedown = true;
        var parr = new Array();
        var x = e.x - objcanvas.Xoffset;
        var y = e.y - objcanvas.Yoffset;
        parr.push(new Point(x, y));
        newHighlighterPolyline = new GraphicsHighlighterPolyLine(parr, objcanvas.highlighterPenWidth(), objcanvas.highlighterPenColor());
        polylinelist.push(newHighlighterPolyline);
        window.CurrentObject = polylinelist;
        newHighlighterPolyline.UpdateRectangle();
    };
    this.onmousemove = function (objcanvas, e) {
        if (ismousedown) {
            var x = e.x - objcanvas.Xoffset;
            var y = e.y - objcanvas.Yoffset;
            newHighlighterPolyline.UpdateRectangle();
            var objproperty = newHighlighterPolyline.getPropertyObj();
            if (objproperty.Points.length < 201)
                newHighlighterPolyline.AddPoint(new Point(x, y));
            else {
                var parr = new Array();
                parr.push(objproperty.Points[objproperty.Points.length - 1]);
                parr.push(new Point(x, y));
                newHighlighterPolyline = new GraphicsHighlighterPolyLine(parr, objcanvas.highlighterPenWidth(), objcanvas.highlighterPenColor());
                polylinelist.push(newHighlighterPolyline);
            }
            objcanvas.DrawTemp();
        }
    };
    this.onmouseup = function (drawingCanvas, e) {
        ismousedown = false;
    };

    //deepak
    this.ontouchstart = function (objcanvas, coors) {
        ismousedown = true;
        //        var x = coors.x;
        //        var y = coors.y;

        var x = coors.x - objcanvas.Xoffset;
        var y = coors.y - objcanvas.Yoffset;
        SrartPoint = new Point(x, y);
        var parr = new Array();
        parr.push(new Point(x, y));
        newHighlighterPolyline = new GraphicsHighlighterPolyLine(parr, objcanvas.highlighterPenWidth(), objcanvas.highlighterPenColor());
        polylinelist.push(newHighlighterPolyline);
        window.CurrentObject = polylinelist;
        newHighlighterPolyline.UpdateRectangle();
    };
    this.ontouchmove = function (objcanvas, coors) {
        if (ismousedown) {
            //            var x = coors.x;
            //            var y = coors.y;

            var x = coors.x - objcanvas.Xoffset;
            var y = coors.y - objcanvas.Yoffset;
            newHighlighterPolyline.UpdateRectangle();
            var objproperty = newHighlighterPolyline.getPropertyObj();
            if (objproperty.Points.length < 201)
                newHighlighterPolyline.AddPoint(new Point(x, y));
            else {
                var parr = new Array();
                parr.push(objproperty.Points[objproperty.Points.length - 1]);
                parr.push(new Point(x, y));
                newHighlighterPolyline = new GraphicsHighlighterPolyLine(parr, objcanvas.highlighterPenWidth(), objcanvas.highlighterPenColor());
                polylinelist.push(newHighlighterPolyline);
            }
            objcanvas.DrawTemp();
        }
    };

    this.ontouchend = function (objcanvas, coors) {
        // this.ontouchend = function (objcanvas) {
        ismousedown = false;
    };
};


var ToolPolyLine = function () {
    var newpolyline = null;
    var ismousedown = false;
    this.Type = "ToolPolyLine";
    var SrartPoint = null;
    var polylinelist = new Array();
    this.onmousedown = function (objcanvas, e) {
        ismousedown = true;
        var parr = new Array();
        var x = e.x - objcanvas.Xoffset;
        var y = e.y - objcanvas.Yoffset;
        parr.push(new Point(x, y));
        newpolyline = new GraphicsPolyLine(parr, objcanvas.penWidth(), objcanvas.penColor());
        polylinelist.push(newpolyline);
        window.CurrentObject = polylinelist;

        newpolyline.UpdateRectangle();
    };
    this.onmousemove = function (objcanvas, e) {
        if (ismousedown) {
            var x = e.x - objcanvas.Xoffset;
            var y = e.y - objcanvas.Yoffset;
            newpolyline.UpdateRectangle();
            var objproperty = newpolyline.getPropertyObj();
            if (objproperty.Points.length < 201)
                newpolyline.AddPoint(new Point(x, y));
            else {
                var parr = new Array();
                parr.push(objproperty.Points[objproperty.Points.length - 1]);
                parr.push(new Point(x, y));
                newpolyline = new GraphicsPolyLine(parr, objcanvas.penWidth(), objcanvas.penColor());
                polylinelist.push(newpolyline);
            }
            objcanvas.DrawTemp();
        }
    };
    this.onmouseup = function (drawingCanvas, e) {
        ismousedown = false;
    };

    //deepak
    this.ontouchstart = function (objcanvas, coors) {
        ismousedown = true;
        var parr = new Array();
        //        var x = coors.x;
        //        var y = coors.y;

        var x = coors.x - objcanvas.Xoffset;
        var y = coors.y - objcanvas.Yoffset;
        parr.push(new Point(x, y));
        newpolyline = new GraphicsPolyLine(parr, objcanvas.penWidth(), objcanvas.penColor());
        polylinelist.push(newpolyline);
        window.CurrentObject = polylinelist;

        newpolyline.UpdateRectangle();
    };
    this.ontouchmove = function (objcanvas, coors) {
        if (ismousedown) {
            //            var x = coors.x;
            //            var y = coors.y;

            var x = coors.x - objcanvas.Xoffset;
            var y = coors.y - objcanvas.Yoffset;
            newpolyline.UpdateRectangle();
            var objproperty = newpolyline.getPropertyObj();
            if (objproperty.Points.length < 201)
                newpolyline.AddPoint(new Point(x, y));
            else {
                var parr = new Array();
                parr.push(objproperty.Points[objproperty.Points.length - 1]);
                parr.push(new Point(x, y));
                newpolyline = new GraphicsPolyLine(parr, objcanvas.penWidth(), objcanvas.penColor());
                polylinelist.push(newpolyline);
            }
            objcanvas.DrawTemp();
        }
    };

    this.ontouchend = function (objcanvas, coors) {
        //  this.ontouchend = function (objcanvas) {
        ismousedown = false;
    };
};

var ToolRectangle = function () {
    var newRectangle = null;
    var ismousedown = false;
    var SrartPoint = null;
    var EndPoint = null;
    this.Type = "ToolRectangle";
    this.onmousedown = function (objcanvas, e) {
        ismousedown = true;
        var x = e.x - objcanvas.Xoffset;
        var y = e.y - objcanvas.Yoffset;
        SrartPoint = new Point(x, y);
        newRectangle = new GraphicsRectangle(objcanvas.rectangleLineWidth(), objcanvas.rectangleLineColor(), objcanvas.rectangleFillColor());
        newRectangle.UpdateRectangle(new Rect(SrartPoint.x, SrartPoint.y, SrartPoint.x + 1, SrartPoint.y + 1));
        window.CurrentObject = newRectangle;
    };
    this.onmousemove = function (objcanvas, e) {
        if (ismousedown) {
            var x = e.x - objcanvas.Xoffset;
            var y = e.y - objcanvas.Yoffset;
            EndPoint = new Point(x, y);
            newRectangle.UpdateRectangle(new Rect(SrartPoint.x, SrartPoint.y, EndPoint.x, EndPoint.y));
            objcanvas.DrawTemp();
        }
    };
    this.onmouseup = function (objcanvas, e) {
        ismousedown = false;
        window.CurrentObject = newRectangle;
    };

    //deepak
    this.ontouchstart = function (objcanvas, coors) {
        ismousedown = true;
        //        var x = coors.x;
        //        var y = coors.y;

        var x = coors.x - objcanvas.Xoffset;
        var y = coors.y - objcanvas.Yoffset;
        SrartPoint = new Point(x, y);
        newRectangle = new GraphicsRectangle(objcanvas.rectangleLineWidth(), objcanvas.rectangleLineColor(), objcanvas.rectangleFillColor());
        newRectangle.UpdateRectangle(new Rect(SrartPoint.x, SrartPoint.y, SrartPoint.x + 1, SrartPoint.y + 1));
        window.CurrentObject = newRectangle;
    };
    this.ontouchmove = function (objcanvas, coors) {
        if (ismousedown) {
            //            var x = coors.x;
            //            var y = coors.y;
            var x = coors.x - objcanvas.Xoffset;
            var y = coors.y - objcanvas.Yoffset;
            EndPoint = new Point(x, y);
            newRectangle.UpdateRectangle(new Rect(SrartPoint.x, SrartPoint.y, EndPoint.x, EndPoint.y));
            objcanvas.DrawTemp();
        }
    };

    this.ontouchend = function (objcanvas, coors) {
        // this.ontouchend = function (objcanvas) {
        ismousedown = false;
    };
    //


};


var ToolTriangle = function () {
    var newTriangle = null;
    var ismousedown = false;
    var SrartPoint = null;
    var EndPoint = null;
    this.Type = "ToolTriangle";
    this.onmousedown = function (objcanvas, e) {
        ismousedown = true;
        var parr = new Array();
        var x = e.x - objcanvas.Xoffset;
        var y = e.y - objcanvas.Yoffset;
        SrartPoint = new Point(x, y);
        newTriangle = new GraphicsTriangle(objcanvas.triangleLineWidth(), objcanvas.triangleLineColor(), objcanvas.triangleFillColor());
        newTriangle.UpdateRectangle(new Rect(SrartPoint.x, SrartPoint.y, SrartPoint.x + 1, SrartPoint.y + 1));
        window.CurrentObject = newTriangle;
    };
    this.onmousemove = function (objcanvas, e) {
        if (ismousedown) {
            var x = e.x - objcanvas.Xoffset;
            var y = e.y - objcanvas.Yoffset;
            EndPoint = new Point(x, y);
            newTriangle.UpdateRectangle(new Rect(SrartPoint.x, SrartPoint.y, EndPoint.x, EndPoint.y));
            objcanvas.DrawTemp();
        }
    };
    this.onmouseup = function (objcanvas, e) {
        ismousedown = false;
    };

    //deepak
    this.ontouchstart = function (objcanvas, coors) {
        ismousedown = true;
        //        var x = coors.x;
        //        var y = coors.y;

        var x = coors.x - objcanvas.Xoffset;
        var y = coors.y - objcanvas.Yoffset;
        SrartPoint = new Point(x, y);
        newTriangle = new GraphicsTriangle(objcanvas.triangleLineWidth(), objcanvas.triangleLineColor(), objcanvas.triangleFillColor());
        newTriangle.UpdateRectangle(new Rect(SrartPoint.x, SrartPoint.y, SrartPoint.x + 1, SrartPoint.y + 1));
        window.CurrentObject = newTriangle;
    };
    this.ontouchmove = function (objcanvas, coors) {
        if (ismousedown) {
            //            var x = coors.x;
            //            var y = coors.y;

            var x = coors.x - objcanvas.Xoffset;
            var y = coors.y - objcanvas.Yoffset;
            EndPoint = new Point(x, y);
            newTriangle.UpdateRectangle(new Rect(SrartPoint.x, SrartPoint.y, EndPoint.x, EndPoint.y));
            objcanvas.DrawTemp();
        }
    };

    this.ontouchend = function (objcanvas, coors) {
        //this.ontouchend = function (objcanvas) {

        ismousedown = false;
    };
};

var ToolEllipse = function () {
    var newEllipse = null;
    var ismousedown = false;
    var SrartPoint = null;
    var EndPoint = null;
    this.Type = "ToolEllipse";

    this.onmousedown = function (objcanvas, e) {
        ismousedown = true;
        var parr = new Array();
        var x = e.x - objcanvas.Xoffset;
        var y = e.y - objcanvas.Yoffset;
        SrartPoint = new Point(x, y);
        newEllipse = new GraphicsEllipse(objcanvas.circleLineWidth(), objcanvas.circleLineColor(), objcanvas.circleFillColor());
        window.CurrentObject = newEllipse;
    };
    this.onmousemove = function (objcanvas, e) {
        if (ismousedown) {
            var x = e.x - objcanvas.Xoffset;
            var y = e.y - objcanvas.Yoffset;
            EndPoint = new Point(x, y);
            newEllipse.UpdateRectangle(new Rect(SrartPoint.x, SrartPoint.y, EndPoint.x, EndPoint.y));
            objcanvas.DrawTemp();
        }
    };
    this.onmouseup = function (objcanvas, e) {
        ismousedown = false;
    };

    //deepak
    this.ontouchstart = function (objcanvas, coors) {
        ismousedown = true;
        //        var x = coors.x;
        //        var y = coors.y;
        var x = coors.x - objcanvas.Xoffset;
        var y = coors.y - objcanvas.Yoffset;
        SrartPoint = new Point(x, y);
        newEllipse = new GraphicsEllipse(objcanvas.circleLineWidth(), objcanvas.circleLineColor(), objcanvas.circleFillColor());
        window.CurrentObject = newEllipse;
    };
    this.ontouchmove = function (objcanvas, coors) {
        if (ismousedown) {
            //            var x = coors.x;
            //            var y = coors.y;

            var x = coors.x - objcanvas.Xoffset;
            var y = coors.y - objcanvas.Yoffset;
            EndPoint = new Point(x, y);
            newEllipse.UpdateRectangle(new Rect(SrartPoint.x, SrartPoint.y, EndPoint.x, EndPoint.y));
            objcanvas.DrawTemp();
        }
    };

    this.ontouchend = function (objcanvas, coors) {
        //this.ontouchend = function (objcanvas) {
        ismousedown = false;
    };
};

//var ToolPointer = function () {
//    var StartPoint = null;
//    var EndPoint = null;
//    var ismousedown = false;
//    var objMove = null;
//    var objResize = null;
//    //deepak
//    var objEditable = null;

//    var handler = -1;
//    this.Type = "ToolPointer";

//    this.onmousedown = function (objcanvas, e) {
//        ismousedown = true;
//        var x = e.x - objcanvas.Xoffset;
//        var y = e.y - objcanvas.Yoffset;
//        StartPoint = new Point(x, y);

//        var flag = false;

//        for (var i = objcanvas.graphicsList.length - 1; i >= 0; i--) {
//            if (objcanvas.graphicsList[i].isContains(StartPoint)) {
//                objMove = objcanvas.graphicsList[i];
//                objMove.Update();
//                objcanvas.UnSelectAll();
//                objMove.IsSelected(true);
//                objcanvas.Draw();
//                CallDrawingOption(objMove);
//                flag = true;
//                break;
//            }
//        }
//        if (!flag) {
//            for (var i = objcanvas.graphicsList.length - 1; i >= 0; i--) {
//                handler = objcanvas.graphicsList[i].getHandler(StartPoint);
//                if (handler > -1 && handler < 4) {
//                    selectMode = "Size";
//                    objResize = objcanvas.graphicsList[i];
//                    objResize.Update();
//                    flag = true;
//                    break;
//                }

//            }
//        }
//        if (!flag) {
//            objcanvas.UnSelectAll();
//            DrawText();

//        }

//    };

//    this.onmousemove = function (objcanvas, e) {
//        if (ismousedown) {
//            var x = e.x - objcanvas.Xoffset;
//            var y = e.y - objcanvas.Yoffset;
//            EndPoint = new Point(x, y);
//            if (objMove != null) {
//                objMove.Move(EndPoint.x - StartPoint.x, EndPoint.y - StartPoint.y);
//                objcanvas.Draw();
//            }

//            if (objResize != null && handler > -1) {
//                objResize.MoveHandler(handler, EndPoint.x - StartPoint.x, EndPoint.y - StartPoint.y);
//                objcanvas.Draw();
//            }
//        }
//    };

//    this.onmouseup = function (drawingCanvas, e) {
//        ismousedown = false;
//        var obj = null;
//        if (objMove != null) {
//            obj = objMove;
//        }
//        if (objResize != null) {
//            obj = objResize;
//        }


//        if (obj != null)
//            window.CurrentObject = obj;
//        else
//            window.CurrentObject = "None";
//    };

//    //touch event
//    this.ontouchstart = function (objcanvas, coors) {
//        ismousedown = true;
//        //                var x = coors.x;
//        //                var y = coors.y;

//        var x = coors.x - objcanvas.Xoffset;
//        var y = coors.y - objcanvas.Yoffset;

//        StartPoint = new Point(x, y);
//        var flag = false;

//        for (var i = objcanvas.graphicsList.length - 1; i >= 0; i--) {
//            if (objcanvas.graphicsList[i].isContains(StartPoint)) {
//                objMove = objcanvas.graphicsList[i];
//                objMove.Update();
//                objcanvas.UnSelectAll();
//                objMove.IsSelected(true);
//                objcanvas.Draw();
//                CallDrawingOption(objMove);

//                flag = true;

//                break;
//            }

//        }

//        if (!flag) {
//            for (var i = objcanvas.graphicsList.length - 1; i >= 0; i--) {
//                handler = objcanvas.graphicsList[i].getHandler(StartPoint);
//                if (handler > -1 && handler < 4) {
//                    selectMode = "Size";
//                    objResize = objcanvas.graphicsList[i];
//                    objResize.Update();
//                    flag = true;
//                    break;
//                }

//            }
//        }
//        if (!flag) {
//            objcanvas.UnSelectAll();
//            DrawText();
//        }
//    };

//    this.ontouchmove = function (objcanvas, coors) {
//        if (ismousedown) {
//            //                    var x = coors.x;
//            //                    var y = coors.y;

//            var x = coors.x - objcanvas.Xoffset;
//            var y = coors.y - objcanvas.Yoffset;

//            EndPoint = new Point(x, y);
//            if (objMove != null) {
//                objMove.Move(EndPoint.x - StartPoint.x, EndPoint.y - StartPoint.y);
//                objcanvas.Draw();
//            }

//            if (objResize != null && handler > -1) {
//                objResize.MoveHandler(handler, EndPoint.x - StartPoint.x, EndPoint.y - StartPoint.y);
//                objcanvas.Draw();
//            }
//        }
//    };

//    this.ontouchend = function (objcanvas) {
//        ismousedown = false;
//        var obj = null;
//        if (objMove != null) {
//            obj = objMove;
//        }
//        if (objResize != null) {
//            obj = objResize;
//        }

//        if (obj != null) {
//            window.CurrentObject = obj;
//        }
//        else
//            window.CurrentObject = "None";
//    };
//    //
//};


var ToolPointer = function () {
    var StartPoint = null;
    var EndPoint = null;
    var ismousedown = false;
    var objMove = null;
    var objResize = null;
    var handler = -1;
    this.Type = "ToolPointer";
    var tempflag = 0;
    var selectMode = "None";
    this.onmousedown = function (objcanvas, e) {
        ismousedown = true;
        var x = e.x - objcanvas.Xoffset;
        var y = e.y - objcanvas.Yoffset;
        StartPoint = new Point(x, y);
        tempflag = 0;
        var flag = false;
        var selobj = objcanvas.GetSelectedObj();
        if (selobj != null) {
            handler = selobj.getHandler(StartPoint);
            if (handler > -1) {
                selectMode = "Size";
                window.CurrentObject = selobj;
                window.CurrentObject.IsEdit(true);
                window.CurrentObject.Update();
                flag = true;
            }
        }
        if (handler == -1) {
            for (var i = objcanvas.graphicsList.length - 1; i >= 0; i--) {
                if (objcanvas.graphicsList[i].isContains(StartPoint)) {
                    selectMode = "Move";
                    window.CurrentObject = objcanvas.graphicsList[i];
                    window.CurrentObject.IsEdit(true);
                    window.CurrentObject.Update();
                    objcanvas.UnSelectAll();
                    window.CurrentObject.IsSelected(true);
                    objcanvas.Draw();
                    objcanvas.DrawTemp();
                    CallDrawingOption(window.CurrentObject);
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                for (var i = objcanvas.graphicsList.length - 1; i >= 0; i--) {
                    handler = objcanvas.graphicsList[i].getHandler(StartPoint);
                    if (handler > -1) {
                        selectMode = "Size";
                        window.CurrentObject = objcanvas.graphicsList[i];
                        window.CurrentObject.IsEdit(true);
                        window.CurrentObject.Update();
                        flag = true;
                        break;
                    }
                }
            }
        }
        if (!flag) {
            objcanvas.UnSelectAll();
            DrawText();
        }


    };
    this.onmousemove = function (objcanvas, e) {
        if (ismousedown) {
            var x = e.x - objcanvas.Xoffset;
            var y = e.y - objcanvas.Yoffset;
            EndPoint = new Point(x, y);


            if (selectMode == "Move") {

                window.CurrentObject.Move(EndPoint.x - StartPoint.x, EndPoint.y - StartPoint.y);
            }
            else if (selectMode == "Size" && handler > -1) {
                window.CurrentObject.MoveHandler(handler, EndPoint.x - StartPoint.x, EndPoint.y - StartPoint.y);

            }
            if (tempflag == 0) {
                objcanvas.Draw();
                tempflag = 1;
            }
            objcanvas.DrawTemp();
        }
    };
    this.onmouseup = function (drawingCanvas, e) {
        ismousedown = false;
        if (window.CurrentObject != null) window.CurrentObject.IsEdit(false);
        //        var obj = null;
        //        if (objMove != null) {
        //            if (EndPoint != null) obj = objMove;
        //        }
        //        if (objResize != null) {
        //            obj = objResize;
        //        }
        //        if (obj != null)
        //            window.CurrentObject = obj;
        //        else
        //            window.CurrentObject = null;
    };
    //touch event
    this.ontouchstart = function (objcanvas, coors) {

        ismousedown = true;
        //                var x = coors.x;
        //                var y = coors.y;

        var x = coors.x - objcanvas.Xoffset;
        var y = coors.y - objcanvas.Yoffset;
        StartPoint = new Point(x, y);
        tempflag = 0;
        var flag = false;
        var selobj = objcanvas.GetSelectedObj();
        if (selobj != null) {
            handler = selobj.getHandler(StartPoint);
            if (handler > -1) {
                selectMode = "Size";
                window.CurrentObject = selobj;
                window.CurrentObject.IsEdit(true);
                window.CurrentObject.Update();
                flag = true;
            }
        }
        if (handler == -1) {
            for (var i = objcanvas.graphicsList.length - 1; i >= 0; i--) {
                if (objcanvas.graphicsList[i].isContains(StartPoint)) {
                    selectMode = "Move";
                    window.CurrentObject = objcanvas.graphicsList[i];
                    window.CurrentObject.IsEdit(true);
                    window.CurrentObject.Update();
                    objcanvas.UnSelectAll();
                    window.CurrentObject.IsSelected(true);
                    objcanvas.Draw();
                    objcanvas.DrawTemp();
                    CallDrawingOption(window.CurrentObject);
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                for (var i = objcanvas.graphicsList.length - 1; i >= 0; i--) {
                    handler = objcanvas.graphicsList[i].getHandler(StartPoint);
                    if (handler > -1) {
                        selectMode = "Size";
                        window.CurrentObject = objcanvas.graphicsList[i];
                        window.CurrentObject.IsEdit(true);
                        window.CurrentObject.Update();
                        flag = true;
                        break;
                    }
                }
            }
        }
        if (!flag) {
            objcanvas.UnSelectAll();
            DrawText();
        }

    };

    this.ontouchmove = function (objcanvas, coors) {
        if (ismousedown) {
            //                    var x = coors.x;
            //                    var y = coors.y;

            var x = coors.x - objcanvas.Xoffset;
            var y = coors.y - objcanvas.Yoffset;
            EndPoint = new Point(x, y);

            if (selectMode == "Move") {
                window.CurrentObject.Move(EndPoint.x - StartPoint.x, EndPoint.y - StartPoint.y);
            }
            else if (selectMode == "Size" && handler > -1) {
                window.CurrentObject.MoveHandler(handler, EndPoint.x - StartPoint.x, EndPoint.y - StartPoint.y);

            }
            if (tempflag == 0) {
                objcanvas.Draw();
                tempflag = 1;
            }
            objcanvas.DrawTemp();
        }
    };

    this.ontouchend = function (objcanvas, coors) {
        ismousedown = false;
        if (window.CurrentObject != null) window.CurrentObject.IsEdit(false);
        //        var obj = null;
        //        if (objMove != null) {
        //            if (EndPoint != null) obj = objMove;
        //        }
        //        if (objResize != null) {
        //            obj = objResize;
        //        }
        //        if (obj != null)
        //            window.CurrentObject = obj;
        //        else
        //            window.CurrentObject = null;
    };
};

var DrawingCanvas = function () {
    var me = this;
    var objCanvas = $("#mycanvas").get(0);
    var objContect = objCanvas.getContext('2d');

    var tempCanvas = $("#tempCanvas").get(0);
    var tempContect = tempCanvas.getContext('2d');

    this.GetBackGroundColor = function () {
        return $("#mycanvas").css("background-color");
    };

    //     objContect.fillRect(0, 0, 100, 100);
    var content = $(".layout-content").get(0);
    var fieldset = $(".dx-fieldset").get(0);
    var field = $(".dx-field").get(0);

    //    this.Xoffset = content.offsetLeft + (fieldset.offsetLeft + field.offsetLeft) + objCanvas.offsetLeft;
    //    this.Yoffset = content.offsetTop + (fieldset.offsetTop + field.offsetTop) + objCanvas.offsetTop;


    var objtempCanvas = $("#tempCanvas").get(0);

    //this.Xoffset = content.offsetLeft + objCanvas.offsetLeft;
    //this.Yoffset = content.offsetTop + objCanvas.offsetTop;

    this.Xoffset = content.offsetLeft + objtempCanvas.offsetLeft;
    //this.Yoffset = content.offsetTop + objtempCanvas.offsetTop;
    this.Yoffset = content.offsetTop + objtempCanvas.offsetTop + 20;

    this.graphicsList = Array();
    this.AddObject = function (obj) {
        this.graphicsList.push(obj);
    };

    this.Clear = function () {
        this.graphicsList = new Array();
        this.Draw();
    };

    this.GetSelectedObj = function () {
        for (var o in this.graphicsList)
            if (this.graphicsList[o].IsSelected())
                return this.graphicsList[o];
    };

    this.DrawTemp = function (context) {
        if (typeof context == "undefined")
            context = tempContect;
        context.clearRect(0, 0, objCanvas.width, objCanvas.height);
        if (window.CurrentObject != null)
            if (window.CurrentObject instanceof Array)
                for (var i in window.CurrentObject)
                    window.CurrentObject[i].Draw(context);
            else
                window.CurrentObject.Draw(context);
    }

    this.Draw = function (context) {
        if (typeof context == "undefined")
            context = objContect;
        context.clearRect(0, 0, objCanvas.width, objCanvas.height);
        for (var i in this.graphicsList)
            if (!this.graphicsList[i].IsEdit())
                this.graphicsList[i].Draw(context);
    }

    var _ToolOption = "None";
    this.ToolOption = function (value) {
        if (typeof value == "undefined")
            return _ToolOption;
        else {
            _ToolOption = value;
        }

    }

    var _eraserWidth = 5;
    this.eraserWidth = function (value) {

        if (typeof value == "undefined")
            return _eraserWidth;
        else
            _eraserWidth = value;
    }

    var _penWidth = 2;
    this.penWidth = function (value) {
        if (typeof value == "undefined")
            return _penWidth;
        else
            _penWidth = value;
    }

    var _penColor = "Black";
    this.penColor = function (value) {
        if (typeof value == "undefined")
            return _penColor;
        else
            _penColor = value;
    }

    var _highlighterPenWidth = 2;
    this.highlighterPenWidth = function (value) {
        if (typeof value == "undefined")
            return _highlighterPenWidth;
        else
            _highlighterPenWidth = value;
    }

    var _highlighterPenColor = "Blue";
    this.highlighterPenColor = function (value) {
        if (typeof value == "undefined")
            return _highlighterPenColor;
        else
            _highlighterPenColor = value;
    }
    var _rectangleLineWidth = 5;
    this.rectangleLineWidth = function (value) {
        if (typeof value == "undefined")
            return _rectangleLineWidth;
        else
            _rectangleLineWidth = value;
    }

    var _rectangleLineColor = "Blue";
    this.rectangleLineColor = function (value) {
        if (typeof value == "undefined")
            return _rectangleLineColor;
        else
            _rectangleLineColor = value;
    }

    var _rectangleFillColor = "Red";
    this.rectangleFillColor = function (value) {
        if (typeof value == "undefined")
            return _rectangleFillColor;
        else
            _rectangleFillColor = value;
    }

    var _triangleLineWidth = 5;
    this.triangleLineWidth = function (value) {
        if (typeof value == "undefined")
            return _triangleLineWidth;
        else
            _triangleLineWidth = value;
    }

    var _triangleLineColor = "Blue";
    this.triangleLineColor = function (value) {
        if (typeof value == "undefined")
            return _triangleLineColor;
        else
            _triangleLineColor = value;
    }

    var _triangleFillColor = "Red";
    this.triangleFillColor = function (value) {
        if (typeof value == "undefined")
            return _triangleFillColor;
        else
            _triangleFillColor = value;
    }

    var _circleLineWidth = 5;
    this.circleLineWidth = function (value) {
        if (typeof value == "undefined")
            return _circleLineWidth;
        else
            _circleLineWidth = value;
    }

    var _circleLineColor = "Blue";
    this.circleLineColor = function (value) {
        if (typeof value == "undefined")
            return _circleLineColor;
        else
            _circleLineColor = value;
    }

    var _circleFillColor = "Red";
    this.circleFillColor = function (value) {
        if (typeof value == "undefined")
            return _circleFillColor;
        else
            _circleFillColor = value;
    }

    var _FontFamily = "Arial";
    this.FontFamily = function (value) {
        if (typeof value == "undefined")
            return _FontFamily;
        else
            _FontFamily = value;
    }

    var _FontSize = "2";
    this.FontSize = function (value) {
        if (typeof value == "undefined")
            return _FontSize;
        else
            _FontSize = value;
    }

    var _FontColor = "Black";
    this.FontColor = function (value) {
        if (typeof value == "undefined")
            return _FontColor;
        else
            _FontColor = value;
    }

    var _lineWidth = 2;
    this.LineWidth = function (value) {
        if (typeof value == "undefined")
            return _lineWidth;
        else
            _lineWidth = value;
    }

    var _lineColor = "Black";
    this.LineColor = function (value) {
        if (typeof value == "undefined")
            return _lineColor;
        else
            _lineColor = value;
    }



    var obj = new ToolPolyLine();
    var ismousedown = false;
    //tempCanvas.onmousedown = function (e) {
    //    // window.IsPaused = true;
    //    window.mytimer.Stop();
    //    ismousedown = true;

    //    obj = new ToolPointer();
    //    switch (_ToolOption) {
    //        case "Line":
    //            obj = new ToolLine();
    //            break;
    //        case "Pen":
    //            obj = new ToolPolyLine();
    //            break;
    //        case "Circle":
    //            obj = new ToolEllipse();
    //            break;
    //        case "Triangle":
    //            obj = new ToolTriangle();
    //            break;
    //        case "Rectangle":
    //            obj = new ToolRectangle();
    //            break;
    //        case "Highlighter":
    //            obj = new ToolHighlighterPolyLine();
    //            break;
    //        case "Eraser":
    //            obj = new ToolEraser();
    //            break;
    //        case "Text":
    //            obj = new ToolText();
    //            break;
    //    }

    //    obj.onmousedown(me, e);



    //};

    //tempCanvas.onmousemove = function (e) {

    //    obj.onmousemove(me, e);


    //};

    //tempCanvas.onmouseup = function (e) {

    //    if (!ismousedown) return;
    //    _ObjectTimeStamp = "None";

    //    ismousedown = false;
    //    obj.onmouseup(me, e);
    //    if ((obj.Type == "ToolPointer" || obj.Type == "ToolEraser") && window.CurrentObject == null) {
    //        _ObjectTimeStamp = "1";
    //        window.mytimer.Start();
    //    }
    //    else {
    //        if (window.CurrentObject == null) {
    //            window.mytimer.Start();
    //            return;
    //        }
    //        if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
    //            if (window.CurrentObject instanceof Array)
    //                for (var i in window.CurrentObject)
    //                    //window.CurrentObject[i].UpDatedBy(window.meeting.UserID());
    //                    window.CurrentObject[i].UpDatedBy(window.meeting.UserName());
    //            else
    //                //window.CurrentObject.UpDatedBy(window.meeting.UserID());
    //                window.CurrentObject.UpDatedBy(window.meeting.UserName());
    //        }
    //        if (obj.Type == "ToolPointer") {
    //            me.Draw();
    //            if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
    //                if (CanPost()) {
    //                    var value = window.CurrentObject.getPropertyObj();
    //                    $.ajax({
    //                        url: window.url + "UpdateObject",
    //                        data: { MeetingId: JSON.stringify(window.meeting.MeetingId()), Obj: JSON.stringify(value) },
    //                        dataType: "jsonp",
    //                        success: UpdateTimeStamp,
    //                        error: function () {
    //                            alert("Unable to update the object.");
    //                        }
    //                    });
    //                }
    //                else {
    //                    _ObjectTimeStamp = "1";
    //                    window.mytimer.Start();
    //                }
    //            }
    //            window.CurrentObject = null;
    //            me.DrawTemp();
    //            _ObjectTimeStamp = "1";
    //        }
    //        else {
    //            if (window.CurrentObject instanceof Array)
    //                for (var i in window.CurrentObject)
    //                    me.AddObject(window.CurrentObject[i]);
    //            else
    //                me.AddObject(window.CurrentObject);

    //            me.Draw();
    //            if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {

    //                if (CanPost()) {
    //                    if (window.CurrentObject instanceof Array) {
    //                        //objectcount = 0;
    //                        for (var i in window.CurrentObject) {
    //                            var value = window.CurrentObject[i].getPropertyObj();
    //                            AddObjectToserver(value);
    //                        }
    //                    }
    //                    else {
    //                        var value = window.CurrentObject.getPropertyObj();
    //                        AddObjectToserver(value);
    //                    }
    //                }
    //                //else
    //                _ObjectTimeStamp = "1";
    //                window.mytimer.Start();

    //            }
    //            window.CurrentObject = null;
    //            me.DrawTemp();
    //            _ObjectTimeStamp = "1";
    //        }
    //    }
    //    if (_ToolOption != "Line" && _ToolOption != "Pen" && _ToolOption != "Pointer" && _ToolOption != "Highlighter" && _ToolOption != "Eraser") {
    //        me.ToolOption("Pointer");
    //        me.UnSelectAll();
    //    }


    //};

    //function ResetobjectTimeStamp(value) {
    //    _ObjectTimeStamp = "None";
    //}

    function AddObjectToserver(value) {
        //
        window.mytimer.Stop();
        //
        $.ajax({
            url: window.url + "AddObject",
            data: { MeetingId: JSON.stringify(window.meeting.MeetingId()), Obj: JSON.stringify(value) },
            dataType: "jsonp",
            success: function () {
                window.mytimer.Start();
            },
            error: function () {
                window.mytimer.Start();
                alert("Unable to add the object.");
            }
        });

    }

    //deepak
    var is_touch_device = 'ontouchstart' in document.documentElement;
    if (is_touch_device) {

        tempCanvas.ontouchstart = function (e) {
            //window.IsPaused = true;
            window.mytimer.Stop();
            ismousedown = true;
            obj = new ToolPointer();
            switch (_ToolOption) {
                case "Line":
                    obj = new ToolLine();
                    break;
                case "Pen":
                    obj = new ToolPolyLine();
                    break;
                case "Circle":
                    obj = new ToolEllipse();
                    break;
                case "Triangle":
                    obj = new ToolTriangle();
                    break;
                case "Rectangle":
                    obj = new ToolRectangle();
                    break;
                case "Highlighter":
                    obj = new ToolHighlighterPolyLine();
                    break;
                case "Eraser":
                    obj = new ToolEraser();
                    break;
                case "Text":
                    obj = new ToolText();
                    break;
            }
            var coors = {
                //  x: e.targetTouches[0].pageX,
                //  y: e.targetTouches[0].pageY
                x: e.touches[0].pageX,
                y: e.touches[0].pageY
            };
            try {
                obj.ontouchstart(me, coors);
            }
            catch (err) {
                // alert(err.message);
                //window.mytimer.Start();
                window.mytimer.ForceStart();
            }
            e.preventDefault();
            return false;

        };

        tempCanvas.ontouchmove = function (e) {
            var coors = {
                //  x: e.targetTouches[0].pageX,
                //  y: e.targetTouches[0].pageY

                x: e.touches[0].pageX,
                y: e.touches[0].pageY
            };
            try {
                obj.ontouchmove(me, coors);
            }
            catch (err) {
                //alert(err.message);
                //window.mytimer.Start();
                window.mytimer.ForceStart();
            }
            e.preventDefault();
            return false;
        };

        tempCanvas.ontouchend = function (e) {
            try {
                if (!ismousedown) return;
                _ObjectTimeStamp = "None";
                ismousedown = false;
                //obj.onmouseup(me, e);
                var cord = {
                    x: e.changedTouches[0].pageX,
                    y: e.changedTouches[0].pageY
                };

                obj.ontouchend(me, cord);

                if ((obj.Type == "ToolPointer" || obj.Type == "ToolEraser") && window.CurrentObject == null) {
                    _ObjectTimeStamp = "1";
                    window.mytimer.Start();
                }
                else {
                    if (window.CurrentObject == null) {
                        window.mytimer.Start();
                        return;
                    }
                    if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
                        if (window.CurrentObject instanceof Array)
                            for (var i in window.CurrentObject)
                                //window.CurrentObject[i].UpDatedBy(window.meeting.UserID());
                                window.CurrentObject[i].UpDatedBy(window.meeting.UserName());
                        else

                            window.CurrentObject.UpDatedBy(window.meeting.UserName());
                    }
                    if (obj.Type == "ToolPointer") {
                        me.Draw();
                        if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
                            if (CanPost()) {
                                var value = window.CurrentObject.getPropertyObj();
                                $.ajax({
                                    url: window.url + "UpdateObject",
                                    data: { MeetingId: JSON.stringify(window.meeting.MeetingId()), Obj: JSON.stringify(value) },
                                    dataType: "jsonp",
                                    success: UpdateTimeStamp,
                                    error: function () {
                                        alert("Unable to update the object.");
                                    }
                                });
                            }
                            else {
                                _ObjectTimeStamp = "1";
                                window.mytimer.Start();
                            }
                        }
                        window.CurrentObject = null;
                        me.DrawTemp();
                        _ObjectTimeStamp = "1";
                    }
                    else {
                        if (window.CurrentObject instanceof Array)
                            for (var i in window.CurrentObject)
                                me.AddObject(window.CurrentObject[i]);
                        else
                            me.AddObject(window.CurrentObject);

                        me.Draw();
                        if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
                            if (CanPost()) {
                                if (window.CurrentObject instanceof Array) {
                                    //objectcount = 0;
                                    for (var i in window.CurrentObject) {
                                        var value = window.CurrentObject[i].getPropertyObj();
                                        AddObjectToserver(value);
                                    }
                                }
                                else {
                                    var value = window.CurrentObject.getPropertyObj();
                                    AddObjectToserver(value);

                                }
                            }
                            //else
                            _ObjectTimeStamp = "1";
                            window.mytimer.Start();
                        }

                        window.CurrentObject = null;
                        me.DrawTemp();
                        //_ObjectTimeStamp = "1";
                    }
                }
                if (_ToolOption != "Line" && _ToolOption != "Pen" && _ToolOption != "Pointer" && _ToolOption != "Highlighter" && _ToolOption != "Eraser") {
                    me.ToolOption("Pointer");
                    me.UnSelectAll();
                }
            }
            catch (err) {
                // alert(err.message);
                //window.mytimer.Start();
                window.mytimer.ForceStart();
            }
        };

    }
    //

    this.DeleteSelected = function () {
        var flag = false;
        var list = new Array();
        for (var i in this.graphicsList)
            if (this.graphicsList[i].IsSelected())
                list.push(i);

        for (var i = list.length - 1; i >= 0; i--) {
            //var value = this.graphicsList[list[i]].GetProperty();
            var value = this.graphicsList[list[i]].getPropertyObj();
            this.graphicsList.splice(list[i], 1);
            //if (window.IsMeetingStarted && CanPost()) {
            if (window.meeting != undefined && window.meeting.IsMeetingStarted() && CanPost()) {
                $.ajax({
                    url: window.url + "DeleteObj",
                    //  data: { MeetingId: JSON.stringify(window.meetingId), Obj: JSON.stringify(value) },
                    data: { MeetingId: JSON.stringify(window.meeting.MeetingId()), Obj: JSON.stringify(value) },
                    dataType: "jsonp"
                });
                flag = true;
            }
            else if (window.meeting != undefined && window.meeting.IsMeetingStarted() && !CanPost()) {
                flag = false;
                break;
            }

            //flag = true;
        }

        if (flag)
            this.Draw();
    };

    this.UnSelectAll = function () {
        var f = false;
        for (var i in this.graphicsList) {
            if (this.graphicsList[i].IsSelected()) {
                this.graphicsList[i].IsSelected(false);
                f = true;
            }
        }
        if (f) {
            //if (window.meeting != undefined && window.meeting.IsMeetingStarted() && CanPost())
            //    $.ajax({
            //        url: window.url + "UnSelectAll",
            //        data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },
            //        dataType: "jsonp"
            //    });
            this.Draw();
        }

        //window.canvas.UnSelectAll();

        $("#TextBox").css({
            display: "none"
        });


    }
}

function DrawText() {
    var value = $("#t").val();
    if (value != null && value != "") {
        var l = 0;
        var t = 0;

        l = window.leftTextBox;
        t = window.topTextBox;

        var w = $("#TextBox").width();
        var h = $("#TextBox").height();
        var objGraphicsText = new GraphicsText(value, new Rect(l, t, l + w, t + h), canvas.FontSize(), canvas.FontColor(), canvas.FontFamily());
        canvas.AddObject(objGraphicsText);

        var v = objGraphicsText.getPropertyObj();
        window.CurrentObject = objGraphicsText;
        if (window.meeting != undefined && window.meeting.IsMeetingStarted() && CanPost()) {
            window.mytimer.Stop();
            $.ajax({
                url: url + "AddObject",
                data: { MeetingId: JSON.stringify(window.meeting.MeetingId()), Obj: JSON.stringify(v) },
                dataType: "jsonp",
                success: UpdateTimeStamp,

                error: function () {
                    alert("Hit error fn!");
                }
            });

        }
        canvas.Draw();
        window.mytimer.Start();
    }

    $("#t").val("");

}

function UpdateTimeStamp(value) {
    // window.CurrentObject.TimeStamp(value.d);
    // window.IsPaused = false;
    window.mytimer.Start();
};

clickCaption = "Click Me";
//clickHandler = function (e) {
//    alert("Clicked!");
//};






//$("#mypen").bind("click", function () {
//    alert("page-home is ready!");
//})

//$('body').bind('click', '#ToolBar', function () {

//    $(".Tool").prop("disabled", true);

//});




//$("#save").bind("click", function () {
//   
//    alert("Save.............");
//})

//$(document).ready(function () {
//    var app = function () {

////        var objCanvas = $("#mycanvas").get(0);

////        var context = objCanvas.getContext('2d');
////        context.fillRect(0, 0, 100, 100);
//        

//    }
//    window.app.MyApp = new app();
//});



﻿Application2.Chat = function (params) {

    var viewModel = {
        viewShown: function () {
            Load();
        }
    };
    return viewModel;
};


function Load() {
    $("#chat").css("height", window.CanvasHeight - 120);

    if (window.meeting != undefined && window.meeting.IsMeetingStarted())
        //window.ClearChatTimer = window.setInterval(UpdateChat, 1000);
        window.ClearChatTimer = window.setInterval(IsChat, 1000);
}


function IsChat() {
    $.ajax({
        url: window.url + "IsChatOneWay",
        data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },
        dataType: "jsonp",
        success: BlockChat,
        error: function () {
            alert("Hit error fn!");
        }
    });
}

function BlockChat(value) {
    if (value.d) {
        $("#msg").css("display", "none");
    }
    else {
        $("#msg").css("display", "block");
    }

    UpdateChat();
}

$(document).on('keydown', "#msg", function (e) {
    if (e.which == 13) {
        $.ajax({
            url: window.url + "IsChatOneWay",
            data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },
            dataType: "jsonp",
            success: ResultChatOneWay,
            error: function () {
                alert("Hit error fn!");
            }
        });
    
    }
});

function ResultChatOneWay(value) {
    if (value.d) {
        $("#msg").css("display", "none");
    }
    else {
        $("#msg").css("display", "block");
        
        SendChat();
        
    }
}


function SendChat() {
    if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
        //if ($(this).val() != "") {
        if ($("#msg").val() != "") {
            //var msg = window.meeting.UserName() + ": " + $(this).val();
            var msg = window.meeting.UserName() + ": " + $("#msg").val();
            $.ajax({
                url: window.url + "AddinChat",
                data: { MeetingId: JSON.stringify(window.meeting.MeetingId()), Msg: JSON.stringify(msg) },
                dataType: "jsonp",
                success: UpdateChat,
                error: function () {
                    alert("Hit error fn!");
                }
            });
            $("#msg").val("");
        }
    }
    else {
        //alert("Start Meeting to chat with members.");

        $("#alertBox").css("display", 'block');
        var left = (window.CanvasWidth - $("#alertBox").width()) / 2;
        var top = (window.CanvasHeight - $("#alertBox").height()) / 2;
        $("#alertBox").css("left", left);
        $("#alertBox").css("top", top);
        $("#displayMsg").text('Start Meeting to chat with members.');

    }
}


function UpdateChat() {
    $.ajax({
        url: window.url + "GetChatList",
        data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },
        dataType: "jsonp",
        success: UpdateChatList,
        error: function () {
            alert("Hit error fn!");
        }
    });

};



function UpdateChatList(value) {
    var chatListCount = 0;
    var chatlist = value.d;
    chatlist = value.d;
    var countli = $('#msglist').find('li').length;
    if (chatlist.length != countli) {
        $("#msglist").empty();
        //for (var msg in chatlist) {
        //      $("#msglist").append("<li>" + chatlist[msg].Message + "</li>");
        //    break;
        //};
        var divheight = $("#chat").height();
        //var liHeight = $('#msglist li').height();
        var liHeight = 18;
        var LiCount = Math.floor(divheight / liHeight);

        //$("#msglist").empty();

        for (var n = chatlist.length; n--;) {
            // if (chatListCount < 5) {
            if (chatListCount < LiCount) {
                $("#msglist").append("<li>" + chatlist[n].Message + "</li>");
            }
            else {
                break;
            }
            chatListCount++;
        };


        var list = $('#msglist');
        var listItems = list.children('li');
        list.append(listItems.get().reverse());

        var h = $('#chat').height();
        $('#chat').scrollTop(h);
    }

 

};

﻿Application2.Members = function (params) {

    var viewModel = {
        viewShown: function () {
            Initialize();
        }
    };
    return viewModel;
};

function Initialize() {
    LoadData();
}


function LoadData() {
   

    //if (typeof window.Env_MeetingState != "undefined") {
    //    if (window.Env_MeetingState == "Start") {
    //        $("#btnmeeting").attr("src", "Resources/stop.png")
    //        $("#meetingtitle").attr("title", "Stop Meeting")
    //        $("#MeetingOption").css("display", "none");
    //        $('#divmeeting').unbind('mouseenter mouseleave');
    //    }
    //    else {
    //        $("#btnmeeting").attr("src", "Resources/meeting.png")
    //        $("#meetingtitle").attr("title", "Start Meeting")

    //        $("#divmeeting").bind('mouseenter ', function () {
    //            $("#MeetingOption").css("display", "block");
    //        });
    //        $("#divmeeting").bind('mouseleave ', function () {
    //            $("#MeetingOption").css("display", "none");
    //        });
    //    }
    //}
    if (typeof window.Env_MettingId != "undefined") {
        $("#mamber_div").text("Members [" + window.Env_MettingId + "]");
    }


    if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
            _ObjectTimeStamp = "None";
            window.meeting.MemberTimeStamp("");
    }


}


function uploadPhoto(imageURI) {


    var options = new FileUploadOptions();
    options.fileKey = "file";

    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();

    if (options.fileName.indexOf('.') != -1) {

        options.fileName = window.meeting.MeetingId() + "@" + options.fileName;
    }
    else
        options.fileName = window.meeting.MeetingId() + "@" + options.fileName + ".jpg";


   



    //options.fileName = window.meeting.MeetingId() + "@" + options.fileName + ".jpg";

   // options.fileName = window.meeting.MeetingId() + "@" + options.fileName;

   

    window.ImageUploadName = options.fileName;

   

    ////window.ImageUploadName = window.meeting.MeetingId() + "_" + options.fileName + ".jpg";
   // alert(window.ImageUploadName);

    // alert(window.WebSite + "default.aspx");
  //  alert(window.WebSite + "UploadFromMob.aspx");
    ft.upload(imageURI, window.WebSite + "UploadFromMob.aspx", win, fail, options);

}

function win(r) {
    //alert("Code = " + r.responseCode);
    //alert("Response = " + r.response);
    //alert("Sent = " + r.bytesSent);


    //_BackGroung = window.WebSite + "MyFiles/" + window.ImageUploadName;
    var filename = window.ImageUploadName.split("@")[1];
    _BackGroung = window.WebSite + "Upload/" + window.meeting.MeetingId() + "/" + filename;
    //alert(_BackGroung);
   
    //_BackGroung = window.WebSite + "Upload/1120/" + window.ImageUploadName;
    //alert(_BackGroung);


    if (_BackGroung.indexOf('http://') != -1) {
        //  var url = "url(" + _BackGroung + ")";
        $("#bgcanvasimg").attr("src", _BackGroung);
        $("#bgcanvasimg").css("display", "block");
    }
    else {
        $("#bgcanvasimg").css("display", "none");
        $("#bgcanvas").css("background", _BackGroung);
    }





    $("#alertBox").css("display", 'block');
    var left = (window.CanvasWidth - $("#alertBox").width()) / 2;
    var top = (window.CanvasHeight - $("#alertBox").height()) / 2;
    $("#alertBox").css("left", left);
    $("#alertBox").css("top", top);
    $("#displayMsg").text('Image upload successful');


    // window.IsPaused = true;
    window.mytimer.Stop();
    UpdateCanvasOnServer();

}

function fail(error) {
   // alert("fail");

    $("#alertBox").css("display", 'block');
    var left = (window.CanvasWidth - $("#alertBox").width()) / 2;
    var top = (window.CanvasHeight - $("#alertBox").height()) / 2;
    $("#alertBox").css("left", left);
    $("#alertBox").css("top", top);
    $("#displayMsg").text('fail');

    //alert("An error has occurred: Code = " = error.code);
    //alert("upload error source " + error.source);
    //alert("upload error target " + error.target);
}

//$("#UploadImage").bind("mouseenter", function () {
//    $(this).css("background-color", "#a3c3ec");
//});

//$("#UploadImage").bind("mouseleave", function () {
//    $(this).css("background-color", "#ece9d8");
//});

$(document).on('click', "#UploadImage", function () {
//$("#UploadImage").bind("click", function () {
    if (window.meeting != undefined && window.meeting.IsMeetingStarted() && CanPost()) {

        navigator.camera.getPicture(uploadPhoto,
                                        //function (message) { alert('get picture failed'); },
                                         function (message) { AlertFail(); },
                                        {
                                            quality: 50,
                                            destinationType: navigator.camera.DestinationType.FILE_URI,
                                            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                                            correctOrientation: true,

                                        }
                                );
    }

});

function AlertFail() {
    //var msg = new DOMAlert(
    //       {
    //           title: '<div style="text-align:center;font-size:18px">Cube Share</div>',
    //           text: '<h2>get picture failed</h2>',
    //           skin: 'default',
    //           width: 300,
    //           height: 35,
    //           //ok: { value: true, text: 'Ok', onclick: showValue },
    //           ok: { value: true, text: '', onclick: showValue },
    //           //cancel: { value: false, text: 'No', onclick: showValue }
    //       });
    //msg.show();

    $("#alertBox").css("display", 'block');
    var left = (window.CanvasWidth - $("#alertBox").width()) / 2;
    var top = (window.CanvasHeight - $("#alertBox").height()) / 2;
    $("#alertBox").css("left", left);
    $("#alertBox").css("top", top);
    $("#displayMsg").text('Get picture failed.');
}

$(document).on('click', "#Image1", function () {
//$("#Image1").bind("click", function () {

    //var mid = window.prompt("Enter meeting id.");
    //if (mid != null) {
    //   SetMeetings(mid);
    //}


    //$("#MeetingIdPrompt").css("display", 'block');
    //var left = (window.CanvasWidth - $("#MeetingIdPrompt").width()) / 2;
    //var top = (window.CanvasHeight - $("#MeetingIdPrompt").height()) / 2;
    //$("#MeetingIdPrompt").css("left", left);
    //$("#MeetingIdPrompt").css("top", top);



});


//function showValue(sender, value) {
//    sender.close();
//    //var newMsg = new DOMAlert({ skin: 'default', width: 200 });
//    //newMsg.show("Your response", "You pressed " + value);
//}


//$("#txtMeetingId").bind('keydown', function (e) {
//    if (e.which == 13) {
//        if ($("#txtMeetingId").val() != "") {
//            SetMeetings($("#txtMeetingId").val());
//            $("#txtMeetingId").val("");
//            $("#MeetingIdPrompt").hide();
//        }
//    }
//});

//$("#SetMeetingOk").bind("click", function () {
//    if ($("#txtMeetingId").val() != "") {
//        SetMeetings($("#txtMeetingId").val());
//        $("#txtMeetingId").val("");
//        $("#MeetingIdPrompt").hide();
//    }
//});


//$("#SetMeetingCancel").bind("click", function () {
//    $("#txtMeetingId").val("");
//    $("#MeetingIdPrompt").hide();
//});

$(document).on('click', ".StartMeeting", function () {
//$(".StartMeeting").bind("click", function () {
    window.canvas.Clear();
    $.ajax({
        url: window.url + "NewMeeting",
        data: { meetingType: JSON.stringify(this.id) },

        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: SetMeetings,

        error: function () {
            alert("Hit error fn!");
        }
    });

    $("#btnmeeting").attr("src", "Resources/stop.png")
    $("#meetingtitle").attr("title", "Stop Meeting")
    $("#MeetingOption").css("display", "none");
    $('#divmeeting').unbind('mouseenter mouseleave');

    //set environment variable
    window.Env_MeetingState = "Start";


});

$(document).on('click', "#btnmeeting", function () {
//$("#btnmeeting").bind("click", function () {
    if ($("#meetingtitle").attr("title") == "Stop Meeting") {

        $("#btnmeeting").attr("src", "Resources/meeting.png")
        $("#meetingtitle").attr("title", "Start Meeting")

        $("#divmeeting").bind('mouseenter ', function () {
            $("#MeetingOption").css("display", "block");
        });
        $("#divmeeting").bind('mouseleave ', function () {
            $("#MeetingOption").css("display", "none");
        });

        //window.IsMeetingStarted = false;
        window.meeting.IsMeetingStarted(false);

        $.ajax({
            url: window.url + "StopMeeting",
            //data: { MeetingId: JSON.stringify(window.meetingId) },
            data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },
            dataType: "jsonp"

        });
        $("#mamber_div").text("Members");
        $('#mList').empty();
        $("#mamber_linking").html("None");

        window.Env_MettingId = undefined;
        window.Env_webSiteUrl = undefined;
        window.Env_MeetingState = undefined;

        //$.cookie("IsMeetingStarted", null);
        //$.cookie("MeetingId", null);
        //$.cookie("MeetingType", null);
        //$.cookie("UserID", null);
        //$.cookie("isMaster", null);
        //$.cookie("url", null);

        window.Env_MeetingState = "Stop";
    }
});

function SetMeetings(value) {
   
    //window.mytimer.Start();
    $('#mList').empty();

    window.meeting = new Meeting();
    window.meeting.IsMeetingStarted(true);

    if (typeof value.d == "undefined")
        window.meeting.MeetingId(value);
    else
        window.meeting.MeetingId(value.d);

    //deepak
    //$("#joinMeeting").attr("src", "Resources/stop.png")
    //$("#joine_meetion").attr("title", "Exit Meeting")
    //

    $("#mamber_div").text("Members [" + window.meeting.MeetingId() + "]");
    //set environment variable
    window.Env_MettingId = window.meeting.MeetingId();

    $.ajax({
        url: window.url + "GetMeetingType",
        data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },

        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: SetMeetingType,

        error: function () {
            alert("Hit error fn!");
        }
    });

    //window.IsPaused = false;
    //window.IsMeetingStarted = true;
    //if (typeof value.d == "undefined")
    //    window.meetingId = value;
    //else
    //    window.meetingId = value.d;

    //$("#mamber_div").text("Members [" + window.meetingId + "]");

    ////set environment variable
    //window.Env_MettingId = window.meetingId;
    ////
    //  $.ajax({
    //    url: window.url + "GetMeetingType",
    //    data: { MeetingId: JSON.stringify(window.meetingId) },

    //    type: "GET",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "jsonp",
    //    success: SetMeetingType,

    //    error: function () {
    //        alert("Hit error fn!");
    //    }
    //});
};

function SetMeetingType(value) {
    //if user type the wrong meeting Id
    if (value.d == null) {

        window.meeting = undefined;
        $("#mamber_div").text("Members");
        window.Env_MettingId = undefined;
        WrongMeetingEntered();
        return;
    }

     
    //$("#c").append('<div  style="text-align:left;color:blue;background: none; float:left;color:#fff;">Id :</div>');
    //$("#c").append('<div id="MeetingIdlbl" style="text-align:left;color:blue;background:none;float:left;color:#fff;padding:0 0 0 4px;"></div>');
    //$("#MeetingIdlbl").html(window.meeting.MeetingId());
       

    window.meeting.MeetingType(value.d);
   
   
    //$.ajax({
    //    url: window.url + "NewMember",
    //    data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },

    //    type: "GET",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "jsonp",
    //    success: SetMember,

    //    error: function () {
    //        alert("Hit error fn!");
    //    }
    //});

    IsMemberExists();
       
}

function IsMemberExists() {
    //  SetMember(window.cookiesMemberId);
    $.ajax({
        url: window.url + "IsMemberExist",
        data: { MeetingId: JSON.stringify(window.meeting.MeetingId()), MemberId: JSON.stringify(window.cookiesMemberId) },
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: Getmember,

        error: function () {
            alert("Hit error fn!");
        }
    });
}
function Getmember(value) {
    if (value.d == true) {
        SetMember(window.cookiesMemberId);
    }
    else {
        $.ajax({
            url: window.url + "NewMember",
            data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },

            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            success: SetMember,

            error: function () {
                alert("Hit error fn!");
            }
        });
    }
     
}
$(document).on('click', "#exitMeeting", function () {

//$("#exitMeeting").bind("click", function () {

    //call the stop meeting function
    window.canvas.Clear();
    window.meeting.IsMeetingStarted(false);

    _BackGroung = "white";
    $("#bgcanvas").css("background", _BackGroung);
    $("#grid").css("background", '');
    $("#bgcanvasimg").css("display", "none");

    $.ajax({
        url: window.url + "RemoveMember",
        data: { MeetingId: JSON.stringify(window.meeting.MeetingId()), MemberID: JSON.stringify(window.meeting.UserID()) },
        dataType: "jsonp"
    });
    window.meeting = undefined;
    $("#mamber_div").text("Members");
    window.MeetingState = "Stop";
    window.Env_MettingId = undefined;
    $("#exitMeeting").css("display", "none");

    if (window.meeting == undefined) {
        $("#MeetingIdPrompt").css({
            "display": 'block',
            "left": "0px",
            "top": "0px",
            //"background-color": "white",
            "height": '100%',
            "width": '100%',
            "z-index": '10000'
        });
        $('#txtMeetingId').focus();
    }
    if (window.ClearChatTimer != undefined)
        window.clearInterval(window.ClearChatTimer);
    //  window.clearInterval(window.mytimer);
    window.mytimer.Stop();


});

function WrongMeetingEntered() {
    $("#alertBox").css("display", 'block');
    var left = (window.CanvasWidth - $("#alertBox").width()) / 2;
    var top = (window.CanvasHeight - $("#alertBox").height()) / 2;
    $("#alertBox").css("left", left);
    $("#alertBox").css("top", top);
    $("#displayMsg").text('Entered wrong MeetingId.');
}

function SetMember(value) {
   
    //change by deepak
    if (value.d == null) {
        window.meeting.UserID(value);
    }
    else {
        if (value.d.Id != "OverFlow") {
            window.meeting.UserID(value.d.Id);
            //for cookies
            window.CookiesData.clear();
            window.CookiesData.insert(window.meeting.MeetingId()).done();
            window.CookiesData.insert(window.meeting.UserID()).done();
            window.meeting.MemberInfo(value.d);
        }
        else {
            //alert("Member Overflow");
            OverFlowMember();
            return;
        }
    }


    $("#c").append('<div  style="text-align:left;color:blue;background: none; float:left;color:#fff;">Id :</div>');
    $("#c").append('<div id="MeetingIdlbl" style="text-align:left;color:blue;background:none;float:left;color:#fff;padding:0 0 0 4px;"></div>');
    $("#MeetingIdlbl").html(window.meeting.MeetingId());

    window.mytimer = new Timer();
    window.mytimer.Start();

    $.ajax({
        url: window.url + "IsMaster",
        data: { MeetingId: JSON.stringify(window.meeting.MeetingId()), MemberId: JSON.stringify(window.meeting.UserID()) },

        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: SetIsMaster,

        error: function () {
            alert("Hit error fn!");
        }
    });

    
};

function OverFlowMember() {
    window.meeting = undefined;
    $("#mamber_div").text("Members");
    if (window.meeting == undefined) {
        $("#alertBox").css("display", 'block');
        var left = (window.CanvasWidth - $("#alertBox").width()) / 2;
        var top = (window.CanvasHeight - $("#alertBox").height()) / 2;
        $("#alertBox").css("left", left);
        $("#alertBox").css("top", top);
        $("#displayMsg").text('Overflow member!');
    }
    if (window.ClearChatTimer != undefined)
        window.clearInterval(window.ClearChatTimer);
       // window.mytimer.Stop();

}

function SetIsMaster(value) {

    window.meeting.IsMaster(value);
    //GetMemberList();
};

function GetMemberList() {
    $.ajax({
        url: window.url + "GetMemberList",
        // data: { MeetingId: JSON.stringify(window.meetingId) },
        data: { MeetingId: JSON.stringify(window.meeting.MeetingId()) },
        dataType: "jsonp",
        success: UpdateMemberList,
        error: function () {
            alert("Hit error fn!");
        }
    });
}

function GetClientUrl() {
    //return window.WebsiteUrl + window.meetingId;
    return window.WebsiteUrl + window.meeting.MeetingId();
}

function AddMember(Member) {


    if (window.meeting != undefined && window.meeting.IsMeetingStarted()) {
       

        if (window.meeting.UserID() == Member.Id) {
            $("#mList").append("<li><span style='background:url(Resources/emblem-people.png) left center no-repeat " + Member.PenColor + "; padding-left:15px;margin-right:10px;'></span><input id='m' type='text' style='color:blue;width:80px' value='" + Member.Name + "'></input></li>");
            window.meeting.UserName(Member.Name);

            window.penColor = Member.PenColor;
            $("#penlinecolor").val(window.penColor);
            window.canvas.penColor(window.penColor);

            window.meeting.MemberInfo(Member);
        }
        else
            $("#mList").append("<li><div id='m' style='color:Black !important;'><span style='background:url(Resources/emblem-people.png) left center no-repeat " + Member.PenColor + "; padding-left:15px; margin-right:10px;'></span>" + Member.Name + "</div></li>");

    }
}


var OldValue = null;
//var NewValue = null;
$(document).on('mousedown', "#m", function () {
//$("#m").bind('mousedown', function (e) {
    OldValue = $(this).val();
});
$(document).on('focusout', "#m", function () {
//$("#m").bind('focusout', function (e) {
    update(OldValue, $(this).val());
});
$(document).on('keydown', "#m", function (e) {
//$("#m").bind('keydown', function (e) {
    if (e.which == 13) {
        update(OldValue, $(this).val());
    }
});

function update(ov, nv) {
    if (nv != "" && ov != nv) {
      //  NewValue = nv;

        $.ajax({
            url: window.url + "UpdateMember",
            //data: { MeetingId: JSON.stringify(window.meeting.MeetingId()), Fromvalue: JSON.stringify(ov), Tovalue: JSON.stringify(nv) },
            data: { MeetingId: JSON.stringify(window.meeting.MeetingId()), Fromvalue: JSON.stringify(window.meeting.UserID()), Tovalue: JSON.stringify(nv) },
            dataType: "jsonp",
            success: UpdateMembers,
            error: function () {
                alert("Hit error fn!");
            }
        });
    }
    else {
        $("#m").val(ov);
    }
};


function UpdateMembers(value) {
    //window.meeting.UserID(NewValue);
    ////clear the cookies
    //window.CookiesData.clear();
    //window.CookiesData.insert(window.meeting.MeetingId()).done();
    //window.CookiesData.insert(window.meeting.UserID()).done();
    ////
}


//function UpdateMemberList(value) {
//    $("#mamber_ul ul").empty();
//    var coll = value.d;
//    //window.meeting.ClearMemberList();
//    for (var i = 0; i < coll.length; i++) {
//        AddMember(coll[i]);
//    }

//}


function Back() {
    // window.IsPaused = false;
    app.navigate("Index", { target: "blank" });


};


