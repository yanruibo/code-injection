
﻿window.VirtualPad = $.extend(true, window.VirtualPad, {
    "config": {
        //"serverURL": "http://localhost:1918/presentationmanager.svc/json/",
        //"imagePath" : "http://localhost:1918",
        "serverURL": "http://www.ClassCommcloud.com/CCService/presentationmanager.svc/json/",
        "imagePath": "http://www.ClassCommcloud.com/CCService",
        //"serverURL": "http://80.68.43.56/CCService/presentationmanager.svc/json/",
        //"imagePath": "http://80.68.43.56/CCService",
        "version": "1.3.0",
        "timeout": 10000,
        "defaultLayout": "navbar",
        "navigation": [
            {
                title: "Home",
                action: "#home",
                icon: "home"
            },
            {
                title: "About",
                action: "#about",
                icon: "info"
            }
        ]
    }
});

﻿window.VirtualPad = window.VirtualPad || {};

$(function() {
    VirtualPad.app = new DevExpress.framework.html.HtmlApplication({
        namespace: VirtualPad,
        defaultLayout: VirtualPad.config.defaultLayout,
        navigation: VirtualPad.config.navigation
    });
    VirtualPad.app.interneterror = "Please check your internet connection!";
    VirtualPad.app.internetcounter = 0;
    VirtualPad.app.url = VirtualPad.config.serverURL;
    VirtualPad.app.imagePath = VirtualPad.config.imagePath;
    VirtualPad.app.router.register(":view/:id", { view: "home", id: undefined });    
    VirtualPad.app.navigate();

    VirtualPad.app.height = function () {
        return $(document).height();
    }

    VirtualPad.app.width = function () {
        return $(document).width();
    }
});


//Logout Functionality
$(document).on('click', "#btnLogout", function () {
    VirtualPad.Logout();
});


VirtualPad.Logout = function (conf) {

    if (conf == undefined) {
        // display alert button
        VirtualPad.showLogoutConfirmWindow();

    } else if (conf == 0) {
        $.unblockUI();
    } else if (conf == 1) {
        if (VirtualPad.app.SessionId == null) {
            VirtualPad.app.navigate("home", { target: "blank" });
            return;
        }
        if (VirtualPad.app.Test_Presented_ID == null)
            VirtualPad.app.Test_Presented_ID = 0;


        VirtualPad.TimerStop();

        $.ajax({
            url: VirtualPad.app.url + "Logout",
            data: { sessionID: JSON.stringify(VirtualPad.app.SessionId), tpid: JSON.stringify(VirtualPad.app.Test_Presented_ID) },
            dataType: "jsonp",
            async: false,
            success: VirtualPad.LogoutStatus,
            error: function () {
                $('#TableTestList').remove('tr:gt(0)');
                VirtualPad.app.navigate("home", { target: "blank" });
                //alert("Hit error fn!");
            }
        });
        return true;
    }
}

VirtualPad.LogoutStatus = function (value) {
    $.unblockUI();
    var d = $.parseJSON(value.d);
    if (d.Error != "") {
        alert(d.Error);
        return;
    }  
    VirtualPad.app.Test_Presented_ID = 0;
    VirtualPad.app.SessionId = null;
    VirtualPad.app.navigate("home", { target: "blank" });
}



VirtualPad.TimerStop = function() {
    if (VirtualPad.app.isTimerRunningForVGPadTest) {  // stop timer for online Virtual pad timer incase if start
        clearInterval(VirtualPad.app.isTimerRunningForVGPadTest);        
    }
    VirtualPad.app.objPreviewQuestion = {};
    if (VirtualPad.app.isTimerRunningForDisplay) // to stop for the time for display
        clearInterval(VirtualPad.app.isTimerRunningForDisplay);

    if(VirtualPad.app.alreadyTestExitstTimer) // to stop timer for the result page 
        clearInterval(VirtualPad.app.alreadyTestExitstTimer);

}


VirtualPad.ajaxError = function (objRequest, errorType, callerSource) {
    if (errorType == 'timeout') {        
        switch (callerSource) {
            case "participantLogin":
                ShowError(true, VirtualPad.app.interneterror);
                break;
            case "getVGPadTestSessionInfo":
                
            default:
                $("#senddiv").html(VirtualPad.app.interneterror);
        }
        //VirtualPad.checkInterConnection(callerSource);
    }
    //objRequest.status http status code.
}

VirtualPad.showLogoutConfirmWindow = function () {
    $.blockUI({
        message: '<div id="logut_conformation">  <div id="l_c_qus">Do you want to logout?</div>\
                  <input class="button_login" id="lougoutbtnyes" type="button" onclick="VirtualPad.Logout(1);" value="Yes"/>\
                  <input class="button_login" id="lougoutbtnno" type="button"  onclick="VirtualPad.Logout(0);" value="No"/>\
                  </div>',
        css: { border: '0 #a00' }
    });
}

















﻿/// <reference path="../js/jquery-1.9.1.min.js"; />
/// <reference path="../js/knockout-2.2.1.js"; />
/// <reference path="../js/dx.all.js"; />

(function() {
    VirtualPad.db = {

        sampleData: new DevExpress.data.RestStore({
            url: "/data/sampleData.json"
        })

    };
})();


(function($, DX, undefined) {
    var HAS_TOOLBAR_BOTTOM_CLASS = "has-toolbar-bottom",
        TOOLBAR_BOTTOM_SELECTOR = ".layout-toolbar-bottom",
        ACTIVE_PIVOT_ITEM_SELECTOR = ".dx-pivot-item:not(.dx-pivot-item-hidden)",
        LAYOUT_FOOTER_SELECTOR = ".layout-footer";
    DX.framework.html.PivotLayoutController = DX.framework.html.DefaultLayoutController.inherit({
        ctor: function(options) {
            options = options || {};
            options.name = options.name || "pivot";
            this._viewsInLayout = {};
            this.callBase(options)
        },
        init: function(options) {
            this.callBase(options)
        },
        _createNavigationWidget: function() {
            var that = this;
            this.$root = $("<div/>").addClass("pivot-layout").appendTo(this._$hiddenBag);
            this.$pivot = $("<div/>").appendTo(this.$root).dxPivot({itemRender: function(itemData, itemIndex, itemElement) {
                    var emptyLayout = that._createEmptyLayout();
                    emptyLayout.find(".layout-footer").remove();
                    emptyLayout.appendTo(itemElement)
                }}).dxCommandContainer({id: 'global-navigation'});
            this.$pivot.dxPivot("instance").optionChanged.add(function(name, oldValue, newValue) {
                if (name === "items")
                    that._clearPivotViewsRenderCache()
            });
            this.$footer = that._createEmptyLayout().find(".layout-footer").insertAfter(this.$pivot);
            return this.$pivot
        },
        _clearPivotViewsRenderCache: function() {
            var that = this;
            $.each(this._viewsInLayout, function(key, viewInfo) {
                that._clearRenderResult(viewInfo)
            })
        },
        _renderNavigationImpl: function(navigationCommands) {
            var container = this.$pivot.dxCommandContainer("instance");
            this._commandManager.renderCommandsToContainers(navigationCommands, [container])
        },
        _getRootElement: function() {
            return this.$root
        },
        _getViewFrame: function(viewInfo) {
            var $result = this.$pivot.find(ACTIVE_PIVOT_ITEM_SELECTOR);
            $result = $result.add(this.$footer);
            return $result
        },
        _showViewImpl: function(viewInfo, direction) {
            this._showViewElements(viewInfo.renderResult.$markup);
            this._changeView(viewInfo);
            this._changeAppbar();
            this._viewsInLayout[viewInfo.key] = viewInfo;
            return $.Deferred().resolve().promise()
        },
        _templateContextChangedHandler: function() {
            $.each(this._visibleViews, $.proxy(function(index, viewInfo) {
                var previousViewInfo = this._getPreviousViewInfo(viewInfo);
                if (previousViewInfo)
                    this._hideView(previousViewInfo)
            }, this));
            this.callBase()
        },
        _changeAppbar: function() {
            var $appbar = this.$footer.find(".dx-active-view " + TOOLBAR_BOTTOM_SELECTOR),
                appbar = $appbar.data("dxToolbar");
            if (appbar)
                this._refreshAppbarVisibility(appbar, this.$root)
        },
        _refreshAppbarVisibility: function(appbar, $container) {
            var isAppbarNotEmpty = false;
            $.each(appbar.option("items"), function(index, item) {
                if (item.visible) {
                    isAppbarNotEmpty = true;
                    return false
                }
            });
            $container.toggleClass(HAS_TOOLBAR_BOTTOM_CLASS, isAppbarNotEmpty);
            appbar.option("visible", isAppbarNotEmpty)
        },
        _hideView: function(viewInfo) {
            this.callBase.apply(this, arguments);
            this._changeAppbar()
        }
    });
    var layoutSets = DX.framework.html.layoutSets;
    layoutSets["navbar"] = layoutSets["navbar"] || [];
    layoutSets["navbar"].push({
        platform: "win8",
        phone: true,
        root: true,
        controller: new DX.framework.html.PivotLayoutController
    })
})(jQuery, DevExpress);

﻿(function($, DX, undefined) {

    var translator = DX.translator,
        fx = DX.fx,
        VIEW_OFFSET = 40,
        NAVIGATION_MAX_WIDTH = 300,
        NAVIGATION_TOGGLE_DURATION = 400;

    DX.framework.html.SlideOutController = DX.framework.html.DefaultLayoutController.inherit({

        init: function(options) {
            this.callBase(options);
            this._navigatingHandler = $.proxy(this._onNavigating, this);
        },

        activate: function() {
            this.callBase.apply(this, arguments);
            this._navigationManager.navigating.add(this._navigatingHandler);
        },

        deactivate: function() {
            this.callBase.apply(this, arguments);
            this._navigationManager.navigating.remove(this._navigatingHandler);
        },

        _onNavigating: function(args) {
            var self = this;
            if(this._isNavigationVisible) {
                args.navigateWhen.push(this._toggleNavigation(this.$viewPort.children()).done(function() {
                    self._disableTransitions = true;
                }));
            }
        },

        _isPlaceholderEmpty: function(viewInfo) {
            var $markup = viewInfo.renderResult.$markup;
            var toolbar = $markup.find(".layout-toolbar").data("dxToolbar");
            var items = toolbar.option("items");
            var backCommands = $.grep(items, function(item) {
                //TODO behavior is deprecated
                return item.behavior === "back" || item.id === "back";
            });
            return !backCommands.length;
        },

        _showViewImpl: function(viewInfo, direction) {
            var self = this;
            var promise = self.callBase(viewInfo, direction);
            promise.done(function() {
                self._disableTransitions = false;
            });
            return promise;
        },

        _onRenderComplete: function(viewInfo) {
            var self = this;

            self._initNavigation(viewInfo.renderResult.$markup);

            if(self._isPlaceholderEmpty(viewInfo)) {
                self._initNavigationButton(viewInfo.renderResult.$markup);
            }

            var $toolbarBottom = viewInfo.renderResult.$markup.find(".layout-toolbar-bottom"),
                toolbarBottom = $toolbarBottom.data("dxToolbar");

            if(toolbarBottom && toolbarBottom.option("items").length) {
                viewInfo.renderResult.$markup.find(".layout-content").addClass("has-toolbar-bottom");
            }

            //Q500291
            var $layoutFrame = this._getLayoutFrame(viewInfo.renderResult.$markup);
            $layoutFrame.click(function(e) {
                e.stopPropagation();
            });
            
            this.callBase(viewInfo);
        },

        _initNavigationButton: function($markup) {
            var self = this,
                $toolbar = $markup.find(".layout-toolbar"),
                toolbar = $toolbar.data("dxToolbar");

            var showNavButton = function($markup, $navButtonItem) {
                $navButtonItem = $navButtonItem || $toolbar.find(".nav-button-item");
                $navButtonItem.show();
                $navButtonItem.find(".nav-button")
                    .data("dxButton")
                    .option("clickAction", $.proxy(self._toggleNavigation, self, $markup));
            };

            showNavButton($markup);

            toolbar.option("itemRenderedAction", function(e) {
                var data = e.itemData,
                    $element = e.itemElement;

                if(data.template === "nav-button") {
                    $.proxy(showNavButton, self, self._currentViewInfo.renderResult.$markup)();
                }
            });
        },

        _initNavigation: function($markup) {
            this._isNavigationVisible = false; 
            this._initSwipeable($markup);
            this._getNavigation($markup).width(this._getNavigationWidth());
            this._initToolbar($markup);
        },

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
        },

        _initSwipeable: function($markup) {
            var self = this;
            var $layoutFrame = this._getLayoutFrame($markup);

            if(!$layoutFrame.data("dxSwipeable")) {
                var navigationWidth = self._getNavigationWidth();

                $layoutFrame.dxSwipeable({
                    elastic: false,
                    startAction: function(e) {
                        e.maxLeftOffset = self._isNavigationVisible ? 1 : 0;
                        e.maxRightOffset = self._isNavigationVisible ? 0 : 1;

                    },
                    updateAction: function(e) {
                        translator.move($layoutFrame, { left: (e.offset + self._isNavigationVisible) * navigationWidth });
                    },
                    endAction: function(e) {
                        fx.animate($layoutFrame, {
                            type: "slide",
                            to: { left: (e.targetOffset + self._isNavigationVisible) * navigationWidth },
                            complete: function() {
                                self._isNavigationVisible = e.targetOffset > 0;
                            }
                        });
                    }
                });
            }
        },

        _getNavigation: function($markup) {
            return $markup.find(".navigation-list");
        },

        _getLayoutFrame: function($markup) {
            return $markup.find(".layout-frame");
        },

        _getNavigationWidth: function() {
            var width = this.$viewPort.width() - VIEW_OFFSET;
            return width > NAVIGATION_MAX_WIDTH
                ? NAVIGATION_MAX_WIDTH
                : width;
        },

        _toggleNavigation: function($markup) {
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


﻿(function($, DX, undefined) {

    DX.framework.html.NavBarController = DX.framework.html.DefaultLayoutController.inherit({

        //_onRenderComplete: function(viewInfo) {

        //    var CLASS_NAME = "has-toolbar";

        //    var $layoutFooter = viewInfo.renderResult.$markup.find(".layout-footer"),
        //        $toolbar = $layoutFooter.find(".dx-toolbar");

        //    if($toolbar.length) {
        //        var isToolbarNotEmpty = !!$toolbar.data("dxToolbar").option("items").length,
        //            $layoutContent = viewInfo.renderResult.$markup.find(".layout-content");

        //        $layoutFooter.toggleClass(CLASS_NAME, isToolbarNotEmpty);
        //        $layoutContent.toggleClass(CLASS_NAME, isToolbarNotEmpty);
        //    }

        //    this._initToolbar(viewInfo.renderResult.$markup);

        //    var $navBar = viewInfo.renderResult.$markup.find("#navBar"),
        //        navBar = $navBar.data("dxNavBar"),
        //        $content = viewInfo.renderResult.$markup.find(".layout-content");

        //    if(!navBar)
        //        return;

        //    var isNavBarVisible = $.grep(navBar.option("items"), function (navItem) {
        //        return $.isFunction(navItem.visible) ? navItem.visible() : navItem.visible;
        //    }).length;

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

var objcount = 0;
var PopUpImage = function (divID, btnName, title, url, heightmargin) {
    var me = $("#" + divID);
    objcount++;
    var hmargin = heightmargin;
    var imgheight;
    var imgwidth;
    var btnid = "btn" + objcount;
    var objthis = $(this)[0];
    me.append("<input class='commanbtn' type='button' value='" + btnName + "' id='" + btnid + "'/>");
    $("#" + btnid).click(function () {
        me.find('div').each(function () {
            if ($(this).attr("id") == 'msg')
                $(this).remove();
        });
        me.append("      <div id='msg'>" +
                      "<div class='msgbody'><img id='qimg' alt='' src='" + url + "'/></div>" +
                      "<div class='msgfooter'>" +
                            "<input type='button' class='btn'/>" +
                      "</div>" +
                  "</div>");
        $("#qimg").on("load", function () {
            imgheight = $("#qimg").height();
            imgwidth = $("#qimg").width();
            objthis.resize();
        });
    });

    $(document).on('click', ".btn", function () {
        //alert("click");
        //$(this)[0].parentNode.parentNode.remove();  it is not working with device
        me.find('div').each(function () {
            if ($(this).attr("id") == 'msg')
                $(this).remove();
        });
    });

    this.resize = function () {
        var img = $("#qimg");
        if (img == null) return;
        var border = 3;
        var imght = imgheight;// $("#qimg").height();
        var imgwt = imgwidth;// $("#qimg").width();
        var clht = VirtualPad.app.height() - heightmargin;
        var clwt = VirtualPad.app.width();

        if (imght +2*border> clht || imgwt+2*border > clwt) {
            var factx = clwt / imgwt;
            var facty = clht / imght;
            var fact = factx;
            if (fact > facty) {
                fact = facty;
            }
            imgwt = imgwt * fact-2*border;
            imght = imght * fact-2*border ;
        }
        
        if (imght <= clht) {
            $("#msg").css("top", (clht - imght) / 2 - border);
            $("#msg").height(imght + 2 * border)
            $("#qimg").height(imght)
        }
        else {
            $("#msg").css("top", 0);
            $("#msg").height(clht)
            $("#qimg").height(clht-2*border)
         
        }

        if (imgwt <= clwt) {
            $("#msg").css("left", (clwt - imgwt) / 2 - border);
            $("#msg").width(imgwt + 2 * border)
            $("#qimg").width(imgwt)
        }
        else {
            $("#msg").css("left", 0);
            $("#msg").width(clwt)
            $("#qimg").width(clwt - 2 * border)
        }
    }
}
























//(function ($) {
//    var objcount = 0;
//    var clientwidth;
//    var clinetheight;
//    $.fn.PopUpImage = function (btnName, title, url, width, height) {
//        clientwidth = width;
//        clinetheight = height;
//        ++objcount;
//        var btnid = "btn" + objcount;
//        var me = $(this);
//        me.append("<input class='commanbtn' type='button' value='" + btnName + "' id='" + btnid + "'/>");

//        $("#" + btnid).click(function () {
//            me.find('div').each(function () {
//                if ($(this).attr("id") == 'msg')
//                    $(this).remove();
//            });
//            me.append("      <div id='msg'>" +
//                  //"<div id='popupscroll' data-bind='dxScrollView: { }'>"+
//						  //"<div class='msgtitle'>" + title + "</div>" +
//						  "<div class='msgbody'><img id='qimg' alt='' src='" + url + "'/></div>" +
//						  "<div class='msgfooter'>" +
//								"<input type='button' class='btn'/>" +
//						  "</div>" +
//                           //"</div>" +
//					  "</div>");
//            $("#qimg").load(function () {
//                resize(clientwidth, clinetheight);
//            });
//        });

//        //$(document).on('click', ".btn", function () {
//        //    $(this)[0].parentNode.parentNode.remove();
//        //});


//        function resize(width, height) {
//            var img = $("#qimg");
//            if (img == null) return;
//            var border = 3;
//            var imght = $("#qimg").height() +2* border;
//            var imgwt = $("#qimg").width() + 2*border;
//            var clht = height;// VirtualPad.app.height();
//            var clwt = width;//VirtualPad.app.width();

//            if (imght > clht || imgwt > clwt) {
//                var factx = clwt / imgwt;
//                var facty = clht / imght;
//                var fact = factx;
//                if (fact > facty) {
//                    fact = facty;
//                }
//                imgwt = clwt * fact;
//                imgwt = clht * fact;
//            }


//            if (imght <= clht) {
//                $("#msg").css("top", (clht - imght) / 2);
//                $("#msg").height(imght)
//            }
//            else {
//                $("#msg").css("top", 0);
//                $("#msg").height(clht)
//            }

//            if (imgwt <= clwt) {
//                $("#msg").css("left", (clwt - imgwt) / 2);
//                $("#msg").width(imgwt)
//            }
//            else {
//                $("#msg").css("left", 0);
//                $("#msg").width(clwt)
//            }
//        }
//    }
//    $.fn.resize= function (width, height) {
//        var img = $("#qimg");
//        if (img == null) return;
//        var border = 3;
//        var imght = $("#qimg").height() +2* border;
//        var imgwt = $("#qimg").width() + 2*border;
//        var clht = height;// VirtualPad.app.height();
//        var clwt = width;//VirtualPad.app.width();

//        if (imght > clht || imgwt > clwt) {
//            var factx = clwt / imgwt;
//            var facty = clht / imght;
//            var fact = factx;
//            if (fact > facty) {
//                fact = facty;
//            }
//            imgwt = clwt * fact;
//            imgwt = clht * fact;
//        }


//        if (imght <= clht) {
//            $("#msg").css("top", (clht - imght) / 2);
//            $("#msg").height(imght)
//        }
//        else {
//            $("#msg").css("top", 0);
//            $("#msg").height(clht)
//        }

//        if (imgwt <= clwt) {
//            $("#msg").css("left", (clwt - imgwt) / 2);
//            $("#msg").width(imgwt)
//        }
//        else {
//            $("#msg").css("left", 0);
//            $("#msg").width(clwt)
//        }
//    }
//})(jQuery);



/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


﻿VirtualPad.Test = function (params) {

    var viewModel = {
//  Put the binding properties here
    };

    return viewModel;
};

﻿VirtualPad.Result = function (params) {

    var viewModel = {
        viewShown: function () {
            $("#tdParticipant").empty();
            $("#tdParticipant").append(VirtualPad.app.ParticipantName);
            $("#tdQuestionIndex").empty();
            $("#tdQuestionIndex").append(VirtualPad.app.objPreviewQuestion.PresentationSettingTestName);
            VirtualPad.Result.showReportSetting = VirtualPad.app.objPreviewQuestion;
            VirtualPad.TimerStop();            
            selectedTab = 0;
            DataLoaded = 0;
            DevExpress.utils.windowResizeCallbacks.add(OrientationChanged);
            OrientationChanged();
            $("#liResponse").addClass("active");
            initializeResponse();
            IsShowGroupResultReport();
        }
    };
    return viewModel;

    function OrientationChanged() {
        $("#wrapper").height(VirtualPad.app.height());
        $("#wrapper").width(VirtualPad.app.width());
        $("#resultscroll").height(ClientHeight());
    };
    function ClientHeight() {        
        return VirtualPad.app.height() - ($("#footer").height()+$("#m_header").height()+12);//margin-12
    }
};

var selectedTab = 0; //1 for response,2 for score
var DataLoaded = 0; //1 for data loaded successfully

$(document).on('click', "#lnkResponse", function () {
    if (selectedTab != 1)
        DataLoaded = 0;
    initializeResponse();
});

function initializeResponse() {
    if (DataLoaded == 1) return;
    var testID = VirtualPad.app.Test_Presented_ID
    var userID = VirtualPad.app.UserId
    var sessionID = VirtualPad.app.SessionId

    selectedTab = 1;
    $.ajax({
        url: VirtualPad.app.url + "GetResponses",
        data: { sessionID: JSON.stringify(sessionID), testId: JSON.stringify(testID), userId: JSON.stringify(userID) },
        dataType: "jsonp",
        success: UpdateResponse,
        error: function () {
            alert("Hit error fn!");
        }
    });
}

function UpdateResponse(value) {
    $("#divGroup").hide();
    $("#divResponse").show();
    $("#table2 tbody").empty();

    var d = $.parseJSON(value.d);
    if (d.Error != "") {
        ShowError(d.Error);
        return;
    }

    var y = d.Data;
    for (var i in y) {
        var calssName;
        if (i % 2 === 0)
            calssName = "tabli_bg";
        else
            calssName = "tabli_bgII";
        if (y[i].Response.toLowerCase() == y[i].CorrectAnswer.toLowerCase()) {
            $("#table2 tbody").append("<tr class='" + calssName + "'><td class='ResponseColumn1'>" + y[i].QNumber + "</td><td class='ResponseColumn2'>" + y[i].QText + "</td><td class='ResponseColumn3'><b>" + y[i].Response + "</b></td><td class='ResponseColumn4'>" + y[i].CorrectAnswer + "</td></tr>");
        }
        else {
            $("#table2 tbody").append("<tr class='" + calssName + "'><td class='ResponseColumn1'>" + y[i].QNumber + "</td><td class='ResponseColumn2'>" + y[i].QText + "</td><td class='ResponseColumn3'>" + y[i].Response + "</td><td class='ResponseColumn4'>" + y[i].CorrectAnswer + "</td></tr>");
        }
    }
    DataLoaded = 1;
}


$(document).on('click', "#lnkGroupResult", function () {
    if (VirtualPad.Result.showReportSetting.ShowReportAfterOfflineTest == true ||
        (VirtualPad.UserInfo.VirtualTestType() == 'VGPadTest' && VirtualPad.Result.showReportSetting.ShowReportAfterVGPadTest == true)) {
        $("#liResponse").removeClass("active");
        if (selectedTab != 2)
            DataLoaded = 0;
        initializeScore();
    }
    else {
        $("#liGroupResult").removeClass("active");
        $("#liResponse").addClass("active");
    }
});

function initializeScore() {
    if (DataLoaded == 1) return;
    var testID = VirtualPad.app.Test_Presented_ID
    var userID = VirtualPad.app.UserId
    var sessionID = VirtualPad.app.SessionId
    selectedTab = 2;

    $.ajax({
        url: VirtualPad.app.url + "GetTestScore",

        data: { sessionID: JSON.stringify(sessionID), testId: JSON.stringify(testID), userId: JSON.stringify(userID) },
        dataType: "jsonp",
        success: UpdateScore,
        error: function () {
            alert("Hit error fn!");
        }
    });
}

function UpdateScore(value) {
    $("#divResponse").hide();
    $("#divGroup").show();
    $("#table1 tbody").empty();

    var d = $.parseJSON(value.d);
    if (d.Error != "") {
        ShowError(d.Error);
        return;
    }
    var x = d.Data;
    for (var i in x) {
        var calssName;
        if (i % 2 === 0)
            calssName = "tabli_bg";
        else
            calssName = "tabli_bgII";
        $("#table1 tbody").append("<tr class='" + calssName + "'><td class='FC'>" + x[i].PName + "</td><td class='SC'>" + x[i].Score + "</td><td class='TC'>" + x[i].Percentage + "</td></tr>");
    }
    DataLoaded = 1;
}


function IsShowGroupResultReport() {    
    if (VirtualPad.UserInfo.VirtualTestType() == 'VGPadTest') {
        if (parseInt(VirtualPad.Result.showReportSetting.PresentationCategory) != 3) {
            VirtualPad.app.alreadyTestExitstTimer = setInterval(NextPresentation, 1000); 
        }

        if (VirtualPad.Result.showReportSetting.ShowReportAfterVGPadTest == true) {
            $("#lnkGroupResult").css("color", "#FFFFFF");
        }
        else {
            $("#lnkGroupResult").css("color", "#CDCDCD");
        }
    }
    else {
        if (VirtualPad.Result.showReportSetting.ShowReportAfterOfflineTest == true) {
            $("#lnkGroupResult").css("color", "#FFFFFF");
        }
        else {
            $("#lnkGroupResult").css("color", "#CDCDCD");
        }
    }
}//Conditionally show hide group report

function NextPresentation() {
    if (VirtualPad.app.SessionId == null)
        return;
        NextTestPresentedID();
}//Nevigate To Next presentation Question

function NextTestPresentedID() {
    var testID = VirtualPad.app.Test_Presented_ID
    var sessionID = VirtualPad.app.SessionId

    $.ajax({
        url: VirtualPad.app.url + "NextPresentation",
        data: { sessionID: JSON.stringify(sessionID), currentTPID: JSON.stringify(testID) },
        dataType: "jsonp",
        success: NewPresentation,
        error: function () {
            alert("Hit error fn!");
        }
    });
}//Get Test Presented ID

function NewPresentation(value) {
    var d = $.parseJSON(value.d);
    if (d.Error != "") {
        ShowError(true, d.Error);
        return;
    }
    if (d.Data != null) {

        VirtualPad.app.Test_Presented_ID = d.Data.TestPresentedID;
        clearInterval(VirtualPad.app.alreadyTestExitstTimer);
        VirtualPad.app.navigate("PreViewQuestion", { target: "blank" });
        return;
    }
}//Go for Next Presentation

var Lst;
function CngClass(obj) {
    if (Lst) Lst.className = '';
    obj.className = 'active';
    Lst = obj;
}//Active Tab

function ShowError(value) {
    if (selectedTab == 2)  //Score tab
        $("#table1 tbody").append("<tr><td colspan='4' class='Error'>" + value + "</td></tr>");
    else
        $("#table2 tbody").append("<tr><td colspan='3' class='Error'>" + value + "</td></tr>");
}//Show Error





﻿VirtualPad.ParticipantHome = function (params) {

    var viewModel = {
        viewShown: function () {
            //DevExpress.utils.windowResizeCallbacks.remove(OrientationChanged);
            DevExpress.utils.windowResizeCallbacks.add(OrientationChanged);

            OrientationChanged();
            var activeTestList = VirtualPad.app.activeTestList;
            try {
                BindActiveTestList(activeTestList);
            } catch (exp) { }

        }
    };
    return viewModel;


    function OrientationChanged() {
        $("#wrapper").height(VirtualPad.app.height());
        $("#wrapper").width(VirtualPad.app.width());
        $("#content").css("height", VirtualPad.app.height());
        //$("#divTable").css("height", ClientHeight() - 150);
        $("#testListScroll").css("height", ClientHeight() - 67);
    };

    function ClientHeight() {
        return VirtualPad.app.height() - ($("#m_header").height() + $("#testHeader").height());
    }
};



function BindActiveTestList(activeTestList) {
    //assign session id and UserId from wcf service
    VirtualPad.app.SessionId = activeTestList.SessionId;
    VirtualPad.app.UserId = activeTestList.UserID;
    VirtualPad.app.ParticipantName = activeTestList.ParticipantName; // alert(VirtualPad.app.ParticipantName);
    $("#TableTestList tbody").empty();

    $("#id_left").html(VirtualPad.app.ParticipantName);


    var i = 0;
    for (var test in activeTestList.LstActiveTest) {
        var className = i % 2 === 0 ? "tabli_bg" : "tabli_bgII";
        $("#TableTestList tbody").append("<tr class=" + className + "><td class='testname'>" + activeTestList.LstActiveTest[test].Test_Name + "</td><td class='testdate'>" + activeTestList.LstActiveTest[test].Created_Date + "</td><td class='testques'>"
              + activeTestList.LstActiveTest[test].Total_Questions + "</td><td id='start_button'><input type='button' TestPresentedId='" + activeTestList.LstActiveTest[test].Test_Presented_ID
              + "' id='btnStart'/></td></tr>");
        i++;
    }
    // $('#TableTestList').html(html);

}


$(document).on('click', "#btnStart", function () {
    //alert(this.attributes["TestPresentedId"].value);
    VirtualPad.app.Test_Presented_ID = Number($(this).attr("TestPresentedId"));
    VirtualPad.app.navigate("PreViewQuestion", { target: "blank" });
});

﻿var popimage = null;
VirtualPad.PreViewQuestion = function (params) {

    var viewModel = {
        viewShown: function () {
            DevExpress.utils.windowResizeCallbacks.add(OrientationChanged);
            $("#tdParticipant").html(VirtualPad.app.ParticipantName);
            
            //Initially disable timer and feedback button
            $("#timer-btn").css("display", "none");
            $("#tick-button").css("display", "none");
            $('#btnPrevious').css('background-image', 'url(images/disableprev.png)');
            $('#btnPrevious').show();
            $("#senddiv").html('');            
            $('#btnNext').show();
            $('#btnFinish').show();
            Error('');
            OrientationChanged();
            GetSessionInfo();
            if (VirtualPad.UserInfo.VirtualTestType() == 'VGPadTest')
                VGPadTestdoLoad();
            else
                VirtualPad.app.isTimerRunningForDisplay = setInterval(timerDisplay, 1000);            
        }
    };
    return viewModel;

    function OrientationChanged() {
        $("#wrapper").height(VirtualPad.app.height());
        $("#wrapper").width(VirtualPad.app.width());
        $("#questionScroll").height(ClientHeight());
        try {
            //call resize of pup up dialogue
            // $("#divImage").Resize(VirtualPad.app.width(), ClientHeight());
            if (popimage != null)
                popimage.resize();
        }
        catch (ex) {
        }
        // $("#optionScroll").css("max-height", (ClientHeight() / 2));

    };

};

function VGPadTestdoLoad() {
    $('#btnPrevious').hide();
    $('#btnNext').hide();
    $('#btnFinish').hide();
    VirtualPad.app.QuestionIndex = 0;
    VirtualPad.app.QuestionID = 0;
    VirtualPad.PreViewQuestion.tempReplayStatus = false;
    VirtualPad.PreViewQuestion.RecordingStatus = -1;
    // getVGPadTestSessionInfo - for virtual pad question next previous or recording stop, start,replay or test
    VirtualPad.app.isTimerRunningForVGPadTest = setInterval(getVGPadTestSessionInfo, 1000); 
    VirtualPad.app.isTimerRunningForDisplay = setInterval(timerDisplay, 1000);
}

function getVGPadTestSessionInfo() {    
    if (VirtualPad.app.SessionId == null)
        return;
    $.ajax({
        url: VirtualPad.app.url + "GetVGPadTestStatus",
        data: { sessionID: JSON.stringify(VirtualPad.app.SessionId), testPresentedId: JSON.stringify(VirtualPad.app.Test_Presented_ID) },
        dataType: "jsonp",
        success: getVGPadTestSessionInfoResult,
        error: function () {
            alert("Hit error fn!");
        }
    });

}

function timerDisplayOnVirtualPad() {    
    if (VirtualPad.PreViewQuestion.RecordingStatus == 3) {
        $("#senddiv").html("Voting Stop");
        VirtualPad.app.objPreviewQuestion.displayTimer = 0;
        $('#timer-btn').val(VirtualPad.app.objPreviewQuestion.displayTimer);
    }

    if (VirtualPad.app.objPreviewQuestion.displayTimer == 0) {
        $('#timer-btn').val(VirtualPad.app.objPreviewQuestion.displayTimer);
        if (VirtualPad.PreViewQuestion.tempReplayStatus == true && 
            (VirtualPad.app.objPreviewQuestion.PresentationSettingPaceControlID == 1 || VirtualPad.app.objPreviewQuestion.PresentationSettingPaceControlID == 2)) {
            VirtualPad.PreViewQuestion.tempReplayStatus = false;
            SendButtonEnableDisable(false);
            VirtualPad.PreViewQuestion.RecordingStatus = 1;
        }
        else if (VirtualPad.PreViewQuestion.RecordingStatus == 3) {
            SendButtonEnableDisable(false);
        }
        return;
    }
    VirtualPad.app.objPreviewQuestion.displayTimer--;
    $('#timer-btn').val(VirtualPad.app.objPreviewQuestion.displayTimer);
}

function timerDisplayOnPublishTest() {

    if ((VirtualPad.app.objPreviewQuestion.PresentationSettingPaceControlID == 3 || VirtualPad.app.objPreviewQuestion.PresentationSettingPaceControlID == 4)
        && VirtualPad.app.objPreviewQuestion.displayTimer == 0) {
        VirtualPad.app.navigate("Result", { target: "blank" });
        return;
    }
    if (VirtualPad.app.objPreviewQuestion.displayTimer == 0) {
        $('#timer-btn').val(VirtualPad.app.objPreviewQuestion.displayTimer);
        if (VirtualPad.app.objPreviewQuestion.PresentationSettingControl_Pace)
            SendButtonEnableDisable(false);
        return;
    }
    VirtualPad.app.objPreviewQuestion.displayTimer--;
    $('#timer-btn').val(VirtualPad.app.objPreviewQuestion.displayTimer);

}

function timerDisplay() {    
    try {
        if (VirtualPad.app.SessionId == null) return;
        if (VirtualPad.UserInfo.VirtualTestType() == 'VGPadTest') {
            timerDisplayOnVirtualPad();
        }
        else
            timerDisplayOnPublishTest();
    } catch (err) { }
}

function getVGPadTestSessionInfoResult(value) {
    var d = $.parseJSON(value.d);
    if (d.Error != "") {
        Error(d.Error);
        return;
    }
    if (d.Data != null) {
        if (d.Data.PresentationStatus == 1) { // 1 Presentation has been closed.
            VirtualPad.app.navigate("Result", { target: "blank" });            
            return;
        }
        else if (d.Data.QuestionIndex == 0) {
            Error("Presentation not started");
            SendButtonEnableDisable(false);
            return;
        }
        else if (d.Data.RecordingStatus == 0 && VirtualPad.PreViewQuestion.RecordingStatus != 0 && d.Data.ReplayStatus == false) { // timer sync 
            $("#senddiv").html("Voting not started");
            SendButtonEnableDisable(false);
           
            ResultQuestionID(value, d.Data.RecordingStatus);
        }
        else if (d.Data.RecordingStatus == 1 && d.Data.ReplayStatus == true && VirtualPad.PreViewQuestion.tempReplayStatus != true) {
            VirtualPad.PreViewQuestion.tempReplayStatus = d.Data.ReplayStatus;
            if (VirtualPad.PreViewQuestion.questionDetails == undefined)
                ResultQuestionID(value, d.Data.RecordingStatus);
            else
                ResultQuestionDetail(VirtualPad.PreViewQuestion.questionDetails, d.Data.RecordingStatus);
            $("#tick-button").css("display", "none");
            $("#senddiv").html("Voting Replay");
            SendButtonEnableDisable(true);
        }
        else if (d.Data.QuestionId != VirtualPad.app.QuestionID) {
            if (d.Data.RecordingStatus == 4) {
                SendButtonEnableDisable(false);
                $("#senddiv").html("Question Answered");
            }
            else if (d.Data.RecordingStatus == 0) {
                SendButtonEnableDisable(false);
                $("#senddiv").html("Voting not started");
            }
            else {
                SendButtonEnableDisable(true);
                $("#senddiv").html("Voting Started");
            }
            ResultQuestionID(value, d.Data.RecordingStatus);
            $("#tick-button").css("display", "none");

        }
        else if (d.Data.RecordingStatus == 1 && VirtualPad.PreViewQuestion.RecordingStatus != 1) {
            SendButtonEnableDisable(true);
            $("#senddiv").html("Voting Started");
            ResultQuestionID(value, d.Data.RecordingStatus);
        }
        else if (d.Data.RecordingStatus == 3 && VirtualPad.PreViewQuestion.RecordingStatus != 3) {
            SendButtonEnableDisable(false);
            $("#senddiv").html("Voting Stop");
            VirtualPad.PreViewQuestion.tempReplayStatus = false;
        }
        else if (d.Data.RecordingStatus == 4 && VirtualPad.PreViewQuestion.RecordingStatus != 4) {
            SendButtonEnableDisable(false);
            $("#senddiv").html("Question Answered");
        }
               
        VirtualPad.PreViewQuestion.RecordingStatus = d.Data.RecordingStatus;
        VirtualPad.PreViewQuestion.ReplayStatus = d.Data.ReplayStatus;

    }
}

function GetSessionInfo() {
    $("#previewQuestion").css("height", VirtualPad.app.height);

    $.ajax({
        url: VirtualPad.app.url + "GetSessionInfo",

        data: { sessionID: JSON.stringify(VirtualPad.app.SessionId), testPresentedId: JSON.stringify(VirtualPad.app.Test_Presented_ID) },
        dataType: "jsonp",
        success: GetPreviewQuestionList,
        error: function () {
            alert("Hit error fn!");
        }
    });
}

function GetPreviewQuestionList(value) {
    //var objPreviewQuestion = value.d;
    //VirtualPad.app.objPreviewQuestion = value.d;    
    var d = $.parseJSON(value.d);
    if (d.Error != "") {
        Error(d.Error);
        return;
    }
    if (d.Data != null) {
        VirtualPad.app.objPreviewQuestion = d.Data;
        SendButtonEnableDisable(true);
        VirtualPad.app.objPreviewQuestion.displayTimer = 0;        
        if (VirtualPad.app.objPreviewQuestion.PresentationSettingPaceControlID == 3 || VirtualPad.app.objPreviewQuestion.PresentationSettingPaceControlID == 4) {
            if ($('#timer-btn').hide()) $('#timer-btn').show();
            VirtualPad.app.objPreviewQuestion.displayTimer = parseInt(VirtualPad.app.objPreviewQuestion.CountdownTimer) * 60;
        }
        
        if (VirtualPad.app.objPreviewQuestion.PresentationSettingTestType == "VGPadTest") {

        } else {
            //ShowQuestion("None");//direction is none
            VirtualPad.app.QuestionIndex = 1;
            ShowQuestion("0");//direction is none
        }
    }
}

function ShowQuestion(Direction) {
    VirtualPad.app.Direction = Direction;
    $.ajax({
        url: VirtualPad.app.url + "GetQuestionID",

        data: { sessionID: JSON.stringify(VirtualPad.app.SessionId), testPresentedId: JSON.stringify(VirtualPad.app.Test_Presented_ID), currentQIndex: JSON.stringify(VirtualPad.app.QuestionIndex), direction: JSON.stringify(VirtualPad.app.Direction) },
        dataType: "jsonp",
        success: ResultQuestionID,
        error: function () {
            alert("Hit error fn!");
        }
    });
}

function ResultQuestionID(value, recordingStatus) {
    if (recordingStatus != undefined && $.isNumeric(recordingStatus))        
        VirtualPad.PreViewQuestion.rs = recordingStatus;
    
    var d = $.parseJSON(value.d);
    if (d.Error != "") {
        Error(d.Error);
        return;
    }

    if (d.Data != null) {
        VirtualPad.app.QuestionID = d.Data.QuestionId;
        VirtualPad.app.QuestionIndex = d.Data.QuestionIndex;
        $("#tdQuestionIndex").empty();
        $("#tdQuestionIndex").append("[" + VirtualPad.app.QuestionIndex + "/" + VirtualPad.app.objPreviewQuestion.TestInfoTotalQuestions + "]  " + VirtualPad.app.objPreviewQuestion.PresentationSettingTestName);

        if (VirtualPad.app.QuestionID != null) {
            $.ajax({
                url: VirtualPad.app.url + "GetQuestionDetail",

                data: { sessionID: JSON.stringify(VirtualPad.app.SessionId), decimalQuestionId: JSON.stringify(VirtualPad.app.QuestionID), testPresentedId: JSON.stringify(VirtualPad.app.Test_Presented_ID), participantId: JSON.stringify(VirtualPad.app.UserId) },
                dataType: "jsonp",
                success: ResultQuestionDetail,
                error: function () {
                    alert("Hit error fn!");
                }
            });
        }
        else
            alert("No Question!!");
    }

}

function ResultQuestionDetail(value, recordingStatus) {    
    var d = $.parseJSON(value.d);
    if (d.Error != "") {
        Error(d.Error);
        return;
    }
    
    if (recordingStatus != undefined && $.isNumeric(recordingStatus))        
        VirtualPad.PreViewQuestion.rs = recordingStatus;        
    
    var QuestionDetail;
    if (d.Data != null) {
        QuestionDetail = d.Data;        
        //To keep the value out the this function.
        VirtualPad.PreViewQuestion.questionDetails = value;
        // Toggle next or previous buttion
        if (VirtualPad.app.objPreviewQuestion.PresentationSettingTestType != "VGPadTest") {
            swtichDisplayNextPrevButton();
        }
        VirtualPad.PreViewQuestion.sequenceMultipleData = Array();
        $("#tblquestion").empty();
        $("#ContentTable").empty();
        $("#tick-button").hide();
        //set scroll position to 0
        $("#questionScroll").dxScrollView("instance").scrollPos(0);

        AddQuestion();

        $('#cellQuestion').append(CorrectHTML(QuestionDetail.QuestionInfolst[0].Question_Data));

        var RespType = QuestionDetail.QuestionInfolst[0].Response_Type;
        var QuestionTypeId = QuestionDetail.QuestionInfolst[0].Question_Type_Id;
        var CorrectAnswer = QuestionDetail.QuestionInfolst[0].Correct_Answer;
        var text;
        var OptionLabel;
        var NoOfOptions = QuestionDetail.QuestionInfolst.length;
        var QuestionRecordingStatus = QuestionDetail.QuestionInfolst[0].RecordingStatus;
        VirtualPad.app.ResponseRecorded = QuestionDetail.QuestionInfolst[0].ResponseRecorded;
        
        //save QuestionTypeId
        VirtualPad.app.QuestionTypeId = QuestionTypeId;

        for (var i = 0; i < QuestionDetail.QuestionInfolst.length; i++) {
            var option = QuestionDetail.QuestionInfolst[i].Option_Detail;
            var ControlType;
            if (option != "") {
                text = CorrectHTML(option);
                // text = option;
                if (RespType == "Numeric")
                    OptionLabel = QuestionDetail.QuestionInfolst[i].Option_Index;
                else if (RespType == "Text") {
                    OptionLabel = QuestionDetail.QuestionInfolst[i].Option_Index;
                }
                ControlType = GetOptionControl(QuestionTypeId, i + 1, NoOfOptions);
                $('#ContentTable').append("<div id='td-answer' seq='" + (i + 1) + "'>" + ControlType + OptionLabel + ". " + text + "</div></div>");
            }

            else if (QuestionTypeId == 2 || QuestionTypeId == 3 || QuestionTypeId == 6 || QuestionTypeId == 8 || QuestionTypeId == 9) {
                ControlType = GetOptionControl(QuestionTypeId, i + 1, NoOfOptions);
                $('#ContentTable').append("<div class='td-answer'>" + ControlType + "</div>");
            }
        }

        for (var i = 0; i < QuestionDetail.QuestionTemplatelst.length; i++) {
            if (QuestionDetail.QuestionTemplatelst[i].Object_Type == "Image") {
                PrepareImage(QuestionDetail.QuestionTemplatelst[i].Question_Object_Id, QuestionDetail.QuestionTemplatelst[i].Object_Filename);
            }
        }
        
        //assign timer         
        if (VirtualPad.app.objPreviewQuestion.PresentationSettingPaceControlID == 1 ||
            VirtualPad.app.objPreviewQuestion.PresentationSettingPaceControlID == 2) {

            /*VirtualPad.PreViewQuestion.RecordingStatus == undefined (Will always undefined incase of Publish Test)
              VirtualPad.PreViewQuestion.RecordingStatus == (1|2|3|4) (Will always have value between 1-4)
              On Information type question,Timer and Feedback will not show and send button disable.
              */
            if (VirtualPad.app.objPreviewQuestion.PresentationSettingTestType == "VGPadTest") {
                if (VirtualPad.PreViewQuestion.rs == 1 || QuestionRecordingStatus==1) {
                    VirtualPad.app.objPreviewQuestion.displayTimer = parseInt(QuestionDetail.QuestionInfolst[0].Max_Time);
                    if ($('#timer-btn').hide()) $('#timer-btn').show();
                    $('#timer-btn').val(VirtualPad.app.objPreviewQuestion.displayTimer);
                } else
                    $('#timer-btn').show();
            }
            else {
                if (VirtualPad.app.ResponseRecorded == false || VirtualPad.app.objPreviewQuestion.PresentationSettingSingleResponse == false) {
                    VirtualPad.app.objPreviewQuestion.displayTimer = parseInt(QuestionDetail.QuestionInfolst[0].Max_Time);
                    if ($('#timer-btn').hide()) $('#timer-btn').show();
                    $('#timer-btn').val(VirtualPad.app.objPreviewQuestion.displayTimer);
                }
                else {
                    VirtualPad.app.objPreviewQuestion.displayTimer = 0;
                    if ($('#timer-btn').hide()) $('#timer-btn').show();
                    $('#timer-btn').val(VirtualPad.app.objPreviewQuestion.displayTimer);
                }
            }
        }

        if (VirtualPad.app.objPreviewQuestion.PresentationSettingTestType == "VGPadTest") {
            if (QuestionTypeId == 1) {
                $("#timer-btn").hide();
                $("#tick-button").hide();
                SendButtonEnableDisable(false);
            }
        }
        else {
            if (VirtualPad.app.ResponseRecorded == false) {
                SendButtonEnableDisable(true);
            }
            else {
                $("#senddiv").html("Question Answered");
                if (VirtualPad.app.objPreviewQuestion.PresentationSettingSingleResponse)
                    SendButtonEnableDisable(false);
                else
                    SendButtonEnableDisable(true);
            }
            if (QuestionTypeId == 1) {
                if (VirtualPad.app.objPreviewQuestion.PresentationSettingPaceControlID == 1 ||
                    VirtualPad.app.objPreviewQuestion.PresentationSettingPaceControlID == 2) 
                    $("#timer-btn").hide();

                $("#tick-button").hide();
                $('#btnSend').css('background-image', 'url(images/send_disable.png)');
            }
        }
        
        if (VirtualPad.app.QuestionIndex <= VirtualPad.app.objPreviewQuestion.TestInfoTotalQuestions - 1) 
            $('#btnNext').prop('disabled', false);
        else 
            $('#btnNext').prop('disabled', true);

        if (VirtualPad.app.QuestionIndex > 1)
            $('#btnPrevious').prop('disabled', false);
        else
            $('#btnPrevious').prop('disabled', true);

        //defined start time
        var date = new Date();
        VirtualPad.app.StartTime = date.getTime();        
    }
}

function PrepareImage(objectID, fileName) {
    $.ajax({
        url: VirtualPad.app.url + "PrepareImage",

        data: { sessionID: JSON.stringify(VirtualPad.app.SessionId), objectID: JSON.stringify(objectID), fileName: JSON.stringify(fileName) },
        dataType: "jsonp",
        success: ResultImagePath,
        error: function () {
            alert("Hit error fn!");
        }
    });
}

function ResultImagePath(value) {
    var d = $.parseJSON(value.d);
    if (d.Error != "") {
        Error(d.Error);
        return;
    }
    if (d.Data != null) {
        var url = VirtualPad.app.imagePath + d.Data;
        popimage = new PopUpImage("divImage", "", "Virtual Pad", url, VirtualPad.app.height() - ClientHeight());

        //$("#divImage").PopUpImage("", "Virtual Pad", url, VirtualPad.app.width(), ClientHeight());
    }


}

function AddQuestion() {
    $('#tblquestion').append("<tr id='rowQuestion'><td id='cellQuestion' ><div id='divImage'></div></td></tr>");
}

function GetOptionControl(QuestionTypeId, index, NoOfOptions) {
    var control;
    var text;
    //for QuestionType MultipleChoice=4,LikertScale=10,Demographic=11
    
    var  style = index == NoOfOptions  ?  'style="border-bottom:0"' : '';
    if (QuestionTypeId == "4" || QuestionTypeId == "10" || QuestionTypeId == "11") {        
        control = "<div name='group1' data-index='" + index + "' id='multipleChoiceDiv' " + style + "  class='clsmultipleChoice'>";
        return control;
    }
        //for QuestionType=TrueORFalse and QuestionType=YesORNo
    else if (QuestionTypeId == "2" || QuestionTypeId == "3") {
        text = QuestionTypeId == 2 ? "True" : "Yes";
        control = "<div id='multipleChoiceDiv' data-boolean='" + text + "' name='group1'  class='clsmultipleChoice'    >" + text + "</div>";

        text = QuestionTypeId == 2 ? "False" : "No";
        control = control + "<div id='multipleChoiceDiv' " + style + " data-boolean='" + text + "' class='clsmultipleChoice' name='group1'    >" + text + "</div>";


        return control;
    }
    else if (QuestionTypeId == "9") {
        text = "Yes";
        control = "<div id='multipleChoiceDiv'  data-boolean='" + text + "'  name='group1' class='clsmultipleChoice'   >" + text + "</div>";
        text = "NO";
        control = control + "<div id='multipleChoiceDiv' data-boolean='" + text + "' name='group1' class='clsmultipleChoice'   >" + text + "</div>";
        text = "Abstain";
        control = control + "<div id='multipleChoiceDiv' style='border-bottom:0' data-boolean='" + text + "' name='group1' class='clsmultipleChoice'   >" + text + "</div>";

        return control;
    }
    else if (QuestionTypeId == "6" || QuestionTypeId == "8") {
        control = "<div><div id='divInputanswer'> Input Answer :  </div>";
        if (QuestionTypeId == "6")
            control = control + "<div id='text_align' ><input type='text' id='numericText'  ></div>";
        else
            control = control + "<div id='text_align' ><input type='text' id='NormalText'  ></div></div>";

        return control;
    }
    else if (QuestionTypeId == "5") {
        VirtualPad.app.sequence = 0;
        control = "<div name='group1' " + style + "  data-index='" + index + "'  id='multipleMarkDiv' class='clsmultipleChoice'  >";
        return control;
    }
    else if (QuestionTypeId == "7") {
        VirtualPad.app.sequence = 0;
        control = "<div name='group1' " + style + " id='multipleSequenceDiv'  class='clsmultipleChoice'  >";

        return control;
    }
}

$(document).on('click', "#multipleChoiceDiv", function () {
    if (!$(this).attr('data-toggled') || $(this).attr('data-toggled') == 'off') {

        $(".clsmultipleChoice").each(function () {
            $(this).attr('data-toggled', 'off');
            $(this).removeClass('clsmultipleChoiceII').addClass('clsmultipleChoice');
            $(this).find(".multi_choice_tick").remove();
        });

        $(".clsmultipleChoiceII").each(function () {
            $(this).attr('data-toggled', 'off');
            $(this).removeClass('clsmultipleChoiceII').addClass('clsmultipleChoice');
            $(this).find(".multi_choice_tick").remove();
        });


        /* currently it's not been toggled, or it's been toggled to the 'off' state,
           so now toggle to the 'on' state: */
        $(this).attr('data-toggled', 'on');
        $(this).removeClass('clsmultipleChoice').addClass('clsmultipleChoiceII');
        //for span
        $(this).append("<span class='multi_choice_tick'></span>");
        // and do something...
    }
    else if ($(this).attr('data-toggled') == 'on') {
        /* currently it has been toggled, and toggled to the 'on' state,
           so now turn off: */
        $(this).attr('data-toggled', 'off');
        // and do, or undo, something...
        $(this).removeClass('clsmultipleChoiceII').addClass('clsmultipleChoice');

        $(this).find(".multi_choice_tick").remove();
    }

});

$(document).on('click', "#multipleSequenceDiv", function () {     
    if (!$(this).attr('data-toggled') || $(this).attr('data-toggled') == 'off') {

        /* currently it's not been toggled, or it's been toggled to the 'off' state,
           so now toggle to the 'on' state: */
        $(this).attr('data-toggled', 'on');
        // $(this).css("background", "Green");
        $(this).removeClass('clsmultipleChoice').addClass('clsmultipleChoiceII');

        //alert($(this).data('index'));
        VirtualPad.app.sequence++;
         VirtualPad.PreViewQuestion.sequenceMultipleData.push($(this).parent().attr("seq"));
        $(this).append("<span class='sequenceDiv'  data-sequence='" + $(this).parent().attr("seq") + "' >" + VirtualPad.app.sequence + "</span>");
        // $(this).append("<span style='position:absolute;right:0px;'>" + $(this).data('index') + "</span>");


        // and do something...
    }
    else if ($(this).attr('data-toggled') == 'on') {
        /* currently it has been toggled, and toggled to the 'on' state,
           so now turn off: */
         VirtualPad.PreViewQuestion.sequenceMultipleData = Array();
        $(this).attr('data-toggled', 'off');
        // and do, or undo, something...
        // $(this).css("background", "Red");
        $(this).removeClass('clsmultipleChoiceII').addClass('clsmultipleChoice');

        $(".clsmultipleChoiceII").each(function () {
            $(this).attr('data-toggled', 'off');
            $(this).removeClass('clsmultipleChoiceII').addClass('clsmultipleChoice');
            $(this).find(".sequenceDiv").remove();
        });

        $(this).find(".sequenceDiv").remove();
        ResetSequence();
    }

});

$(document).on('click', "#multipleMarkDiv", function () {
    if (!$(this).attr('data-toggled') || $(this).attr('data-toggled') == 'off') {

        /* currently it's not been toggled, or it's been toggled to the 'off' state,
           so now toggle to the 'on' state: */
        $(this).attr('data-toggled', 'on');
        // $(this).css("background", "Green");
        $(this).removeClass('clsmultipleChoice').addClass('clsmultipleChoiceII');

        //alert($(this).data('index'));
        VirtualPad.app.sequence++;
        //$(this).append("<span   >" + VirtualPad.app.sequence + "</span>");
        // $(this).append("<span style='position:absolute;right:0px;'>" + $(this).data('index') + "</span>");


        // and do something...
    }
    else if ($(this).attr('data-toggled') == 'on') {
        /* currently it has been toggled, and toggled to the 'on' state,
           so now turn off: */
        $(this).attr('data-toggled', 'off');
        // and do, or undo, something...
        // $(this).css("background", "Red");
        $(this).removeClass('clsmultipleChoiceII').addClass('clsmultipleChoice');
        
        /* $(".clsmultipleChoiceII").each(function () {
            $(this).attr('data-toggled', 'off');
            $(this).removeClass('clsmultipleChoiceII').addClass('clsmultipleChoice');
            // $(this).find("span").remove();
        }); */  

        // $(this).find("span").remove();
        ResetSequence();
    }

});

$(document).on('keypress', "#numericText", function (e) {
    //alert("numeric");
});
function CorrectHTML(source) {
    var text = source.replace("&gt;", ">");
    text = text.replace("&lt;", "<");
    text = text.replace("&amp;quot;", "\"");
    text = text.replace("&amp;nbsp;", " ");

    // Formats font size with em
    // text = Utils.ParseFontSize(text);
    text = '<span>' + text + '</span>';
    return text;
}

$(document).on('click', "#btnNext", function () {    
    $('#divImage').empty();
    $("#tdQuestionIndex").empty();
    $("#senddiv").empty();
    VirtualPad.app.objPreviewQuestion.tempFlagtoShowSentButtonOn = true;
    ShowQuestion("1");//direction is Forward        
    ResetSequence();    
});

$(document).on('click', "#btnPrevious", function () {    
    $('#divImage').empty();
    $("#tdQuestionIndex").empty();
    $("#senddiv").empty();
    VirtualPad.app.objPreviewQuestion.tempFlagtoShowSentButtonOn = true;
    ShowQuestion("2");//direction is backward
    ResetSequence();
});

VirtualPad.PreViewQuestion.checkEnableSentButton = function () {
    if (!VirtualPad.app.objPreviewQuestion.PresentationSettingSingleResponse) {
        SendButtonEnableDisable(true);
        VirtualPad.app.objPreviewQuestion.tempFlagtoShowSentButtonOn = false;
    }
    else
        ChkSingleResponseStatus();
}

function swtichDisplayNextPrevButton() {
    $('#divImage').empty();
    $("#senddiv").empty();
    if (parseInt(VirtualPad.app.objPreviewQuestion.TestInfoTotalQuestions) == 1) {
        $('#btnPrevious').css('background-image', 'url(images/disableprev.png)');
        $('#btnNext').css('background-image', 'url(images/disablenext.png)');
    } else {
        if (VirtualPad.app.QuestionIndex == 1)
            $('#btnPrevious').css('background-image', 'url(images/disableprev.png)');
        else
            $('#btnPrevious').css('background-image', 'url(images/previous.png)');

        if (parseInt(VirtualPad.app.objPreviewQuestion.TestInfoTotalQuestions) == VirtualPad.app.QuestionIndex)
            $('#btnNext').css('background-image', 'url(images/disablenext.png)');
        else
            $('#btnNext').css('background-image', 'url(images/next.png)');
    }
}

function ResetSequence() {
    VirtualPad.app.sequence = 0;
}

$(document).on('click', "#btnSend", function () {
    if (VirtualPad.app.QuestionTypeId == 0 || VirtualPad.app.QuestionTypeId == 1)
        return;    
    Send();
});

AnswerResponse = function (sessionID, userId, testId, questionID, questionIndex, response, responseTime, feedback) {
    this.SessionID = sessionID;
    this.UserId = userId;
    this.TestId = testId;
    this.QuestionID = questionID;
    this.QuestionIndex = questionIndex;
    this.Response = response;
    this.ResponseTime = responseTime;
    this.Feedback = feedback;
}

function Send() {
    var d = new Date();
    var responseTime = d.getTime() - VirtualPad.app.StartTime;


    var response = "";
    switch (VirtualPad.app.QuestionTypeId) {
        case "5":
            $(".clsmultipleChoiceII").each(function () {
                if ($(this).attr('data-toggled') == 'on') {
                    response = response + $(this).data('index');
                }
            });
            break;
        case "7":
            response =  VirtualPad.PreViewQuestion.sequenceMultipleData.join('');
            /*$(".sequenceDiv").each(function () {
                response = response + $(this).data('sequence');
            }); */
            break;
        case "4":
        case "10":
        case "11":
            $(".clsmultipleChoiceII").each(function () {
                if ($(this).attr('data-toggled') == 'on') {
                    response = $(this).data('index');
                }
            });
            break;
        case "2":
        case "3":
            $(".clsmultipleChoiceII").each(function () {
                if ($(this).attr('data-toggled') == 'on') {
                    response = $(this).data('boolean');
                }
            });
            break;
        case "8":
            response = $("#NormalText").val();
            break;
        case "6":
            response = $("#numericText").val();
            break;
        case "9":
            $(".clsmultipleChoiceII").each(function () {
                if ($(this).attr('data-toggled') == 'on') {
                    response = $(this).data('boolean');
                }
            });
            break;
    }    
    VirtualPad.app.SaveResponse = new AnswerResponse(VirtualPad.app.SessionId, VirtualPad.app.UserId, VirtualPad.app.Test_Presented_ID, VirtualPad.app.QuestionID, VirtualPad.app.QuestionIndex, response, responseTime, VirtualPad.app.objPreviewQuestion.StudentFeedBack);

   
    if ((VirtualPad.app.objPreviewQuestion.PresentationSettingPaceControlID == 1 || VirtualPad.app.objPreviewQuestion.PresentationSettingPaceControlID == 2)
        && VirtualPad.app.objPreviewQuestion.displayTimer == 0)
        return;
    if (response == undefined || response == '')
        return;

    if (!VirtualPad.app.objPreviewQuestion.PresentationSettingSingleResponse) {
        var imageName = $('#btnSend').css('background-image').split('/').pop().replace(/\"|\'|\)/g, '');
        if (imageName == 'send.png') {
            SendResponse();
        }
    }
    else {
        //ChkSingleResponseStatus();
        var imageName = $('#btnSend').css('background-image').split('/').pop().replace(/\"|\'|\)/g, '');
        if (imageName == 'send.png') {
            if (VirtualPad.app.ResponseRecorded == false || VirtualPad.PreViewQuestion.ReplayStatus) {
                SendResponse();
            } else {
                $("#senddiv").html("Question Answered");
                VirtualPad.app.objPreviewQuestion.displayTimer = 0;
                VirtualPad.app.objPreviewQuestion.tempFlagtoShowSentButtonOn = false;
                SendButtonEnableDisable(false);
            }
        }
    }

    VirtualPad.app.Response = response;

}

function SendResponse() {
    $.ajax({
        url: VirtualPad.app.url + "SaveResponse",
        data: { objResponse: JSON.stringify(VirtualPad.app.SaveResponse) },
        dataType: "jsonp",
        success: ResultSaveResponse,
        error: function () {
            alert("Hit error fn!");
        }
    });
}

function ChkSingleResponseStatus() {    
    $.ajax({
        url: VirtualPad.app.url + "ChkResponseStatus",
        data: { sessionID: JSON.stringify(VirtualPad.app.SessionId), testPresentedId: JSON.stringify(VirtualPad.app.Test_Presented_ID), participantId: JSON.stringify(VirtualPad.app.UserId), questionIndex: JSON.stringify(VirtualPad.app.QuestionIndex) },
        dataType: "jsonp",
        success: ResultSingleResponseStatus,
        error: function () {
            alert(10);
            alert("Hit error fn!");
        }
    });
}

function ResultSingleResponseStatus(value) {        
    //if (value.d == "") {
    //    SendResponse();
    //}
    var d = $.parseJSON(value.d);
    if (d.Error != "") {
        Error(d.Error);
        return;
    }
    if (d.Data == "") {
        if (VirtualPad.app.objPreviewQuestion.tempFlagtoShowSentButtonOn) {            
            VirtualPad.app.objPreviewQuestion.tempFlagtoShowSentButtonOn = false;
            SendButtonEnableDisable(true);
        } else {
            SendResponse();
        }
    } else {
        $("#senddiv").html("Question Answered");
        VirtualPad.app.objPreviewQuestion.displayTimer = 0;
        VirtualPad.app.objPreviewQuestion.tempFlagtoShowSentButtonOn = false;
        SendButtonEnableDisable(false);
    }
}

function ResultSaveResponse(value) {
    var d = $.parseJSON(value.d);
    if (d.Error != "") {
        Error(d.Error);
        return;
    }

    if (d.Data.save == true) {
        //Clear dispaly control
        $("#senddiv").empty();
        $("#tick-button").css("display", "none");
        
        //Feedback will show on single attempt response only.
        //(No feedback for Survey Presentation And Likert Scale,E-Vote,Demographic Question Type)
        if (VirtualPad.app.objPreviewQuestion.PresentationSettingSingleResponse && VirtualPad.app.objPreviewQuestion.StudentFeedBack) {
            
            if (d.Data.feedback == true) {//On correct answer
                $("#tick-button").css("display", "block");
                $("#tick-button").css({ "background-image": "url('images/right.png')" });
            }
            else if (d.Data.feedback == false) {//On wrong answer
                $("#tick-button").css("display", "block");
                $("#tick-button").css({ "background-image": "url('images/wrong.png')" });
            }
            else {
                $("#tick-button").css("display", "none");
            }
            SendButtonEnableDisable(false);
        }
        else if (VirtualPad.app.objPreviewQuestion.PresentationSettingSingleResponse) {
            SendButtonEnableDisable(false);
        }
        $("#senddiv").append("Sent " + VirtualPad.app.Response);          
    }
}

function Error(value) {
    $('#tblquestion').empty();
    $('#ContentTable').empty();
    $("#senddiv").empty();
    AddQuestion();
    $('#cellQuestion').html(value);
}

$(document).on('click', "#btnFinish", function () {
    showConfirmationFinishWindow();
});

function showConfirmationFinishWindow() {
    $.blockUI({
        message: '<div id="logut_conformation">  <div id="l_c_qus">Do you wish to exit the test?</div>\
                  <input class="button_login" id="lougoutbtnyes" type="button" onclick="gotoResultPage()" value="Yes"/>\
                  <input class="button_login" id="lougoutbtnno" type="button"  onclick="gotoSamePage();" value="No"/>\
                  </div>',
        css: { border: '0 #a00'  }
    });

}

function gotoResultPage() {
    VirtualPad.app.navigate("Result", { target: "blank" });
    $.unblockUI();
    return;
}

function gotoSamePage() {
    $.unblockUI();
    return;
}

function ClientHeight() {
    return VirtualPad.app.height() - ($("#footerdiv").height() + $("#senddiv").height() + $("#m_header").height());
}

function SendButtonEnableDisable(val) {
    var imageName = $('#btnSend').css('background-image').split('/').pop().replace(/\"|\'|\)/g, '');
    if (!VirtualPad.app.objPreviewQuestion.PresentationSettingSingleResponse && VirtualPad.app.objPreviewQuestion.displayTimer > 0) {
        if (val == true && imageName != 'send.png')
            $('#btnSend').css('background-image', 'url(images/send.png)');
        
    } else {
        if (val == true && imageName != 'send.png')
            $('#btnSend').css('background-image', 'url(images/send.png)');
        else if (val == false && imageName != 'send_disable.png')
            $('#btnSend').css('background-image', 'url(images/send_disable.png)');
    }
}

﻿VirtualPad.home = function (params) {
    var viewModel = {
        versionInfo : "version : "+VirtualPad.config.version,
        viewShown: function () {
            StartApp();
        }
    };
    return viewModel;





    function StartApp() {
        DevExpress.utils.windowResizeCallbacks.add(OrientationChanged);
        ShowError(false, "");
        OrientationChanged();
    }

    function OrientationChanged() {
        $("#wrapper").height(VirtualPad.app.height());
        $("#wrapper").width(VirtualPad.app.width());
        //$("#wrapper").css("height", VirtualPad.app.height());
    }

};

userInfo = function (userName, password, virtualTestType, clientID) {
    var _userName = userName;
    this.UserName = function () {
        return _userName;
    };
    var _password = password;
    this.Password = function () {
        return _password;
    };
    var _virtualTestType = virtualTestType;
    this.VirtualTestType = function () {
        return _virtualTestType;
    };
    var _clientID = clientID;
    this.ClientID = function () {
        return _clientID;
    };
}


$(document).on('click', "#btnOfflineLogin", function () {

    ShowError(false, "");
    var UserName = $("#UserName").val();
    var Password = $("#Password").val();
    VirtualPad.UserInfo = new userInfo(UserName, Password, "OfflineTest", "");
    VirtualPad.participantLogin();
    ResetPassword();
});

$(document).on('click', "#btnOnlineLogin", function () {

    ShowError(false, "");
    var UserName = $("#UserName").val();
    var Password = $("#Password").val();
    VirtualPad.UserInfo = new userInfo(UserName, Password, "VGPadTest", "");
    VirtualPad.participantLogin();
    ResetPassword();
});

VirtualPad.participantLogin = function () {
    $.ajax({
        url: VirtualPad.app.url + "Login",
        data: { UserName: JSON.stringify(VirtualPad.UserInfo.UserName()), Password: JSON.stringify(VirtualPad.UserInfo.Password()), ClientID: JSON.stringify(VirtualPad.UserInfo.ClientID()), VirtualTestType: JSON.stringify(VirtualPad.UserInfo.VirtualTestType()) },
        dataType: "jsonp",
        timeout: VirtualPad.config.timeout,
        success: VirtualPad.loginResponse,
        error: function (objRequest, errortype) {
            VirtualPad.ajaxError(objRequest, errortype, 'participantLogin');
        }
    });
}


VirtualPad.loginResponse = function (value) {
    var d = $.parseJSON(value.d);
    if (d.Error != "") {
        ShowError(true, d.Error);
        return;
    }
    if (d.Data != null) {
        VirtualPad.app.SessionId = d.Data.SessionId;
        VirtualPad.app.ParticipantName = d.Data.ParticipantName;
        VirtualPad.app.UserId = d.Data.UserID;
        switch (VirtualPad.UserInfo.VirtualTestType()) {
            case "OfflineTest":
                VirtualPad.app.activeTestList = d.Data;
                if (VirtualPad.app.activeTestList.LstActiveTest.length == 1) {
                    VirtualPad.app.Test_Presented_ID = VirtualPad.app.activeTestList.LstActiveTest[0].Test_Presented_ID;
                    VirtualPad.app.navigate("PreViewQuestion", { target: "blank" });
                } else 
                    VirtualPad.app.navigate("ParticipantHome", { target: "blank" });
                break;
            case "VGPadTest":                
                VirtualPad.app.Test_Presented_ID = d.Data.TestPresentedID;                
                VirtualPad.app.navigate("PreViewQuestion", { target: "blank" });
                break;
        }
    }
}

function ShowError(show, value) {
    if (show == true) {
        $("#errorDiv").css("display", "block");
        $("#errorDiv").html(value);
    }
    else {
        $("#errorDiv").css("display", "none");
        $("#errorDiv").html(value);
    }
}

function ResetPassword() {
    $("#Password").val("");
}



