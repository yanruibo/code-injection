

$(function() {
    
    var device = DevExpress.devices.current(),
        defaultLayout = GazetteManagerMV.config.defaultLayout,
        startupView = "home";

    if(device.platform === "win8" && device.phone) {
        defaultLayout = "simple";
        startupView = "Navigation";
        $.each(GazetteManagerMV.config.navigation, function (i, item) { item.root = false; });
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    function onDeviceReady() {
        document.addEventListener("backbutton", onBackKeyDown, false);
    }

    function onBackKeyDown() {
		if(GazetteManagerMV.app.canBack()) {
			GazetteManagerMV.app.back();
		}
        else {
            if(window.external) {
                window.external.Notify("DevExpress.ExitApp");
            }
        }
    }

    GazetteManagerMV.app = new DevExpress.framework.html.HtmlApplication({
        namespace: GazetteManagerMV,
        defaultLayout: defaultLayout,
        navigation: GazetteManagerMV.config.navigation
    });

    $(window).unload(function() {
        GazetteManagerMV.app.saveState();
    });

    GazetteManagerMV.app.router.register(":view/:id", { view: startupView, id: undefined });
    GazetteManagerMV.app.navigate();
});



// NOTE object below must be a valid JSON
window.GazetteManagerMV = $.extend(true, window.GazetteManagerMV, {
    "config": {
        "defaultLayout": "slideout",
        "navigation": [
            {
                "title": "Home",
                "action": "#home",
                "icon": "home"
            },
            {
                "title": "Jobs",
                "action": "#jobs",
                "icon": "jobs"
            },
            {
                "title": "Works",
                "action": "#works",
                "icon": "work"
            },
            {
                "title": "Items to Buy",
                "action": "#buy",
                "icon": "buy"
            },
            {
                "title": "Biddings",
                "action": "#bid",
                "icon": "bid"
            },
            {
                "title": "Rent In/Out",
                "action": "#rent",
                "icon": "rent"
            },
            {
                "title": "Trainings",
                "action": "#trainings",
                "icon": "training"
            },
            {
                "title": "Insurance",
                "action": "#insurance",
                "icon": "insurance"
            },
            {
                "title": "Competitions",
                "action": "#competitions",
                "icon": "competition"
            },
            {
                "title": "Announcements",
                "action": "#announcement",
                "icon": "announcement"
            },
            {
                "title": "General Info",
                "action": "#geninfo",
                "icon": "geninfo"
            },
            {
                "title": "Icon Legend",
                "action": "#imageLegend",
                "icon": "iconlegend"
            },
            {
                "title": "About",
                "action": "#about",
                "icon": "gazette"
            }
        ]
    }
});




































// NOTE object below must be a valid JSON
window.GazetteManagerMV = $.extend(true, window.GazetteManagerMV, {
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


/// <reference path="../js/jquery-1.9.1.min.js" />
/// <reference path="../js/knockout-2.2.1.js" />
/// <reference path="../js/dx.all.js" />

(function() {
    var endpointSelector = new DevExpress.EndpointSelector(GazetteManagerMV.config.endpoints);

    var serviceConfig = $.extend(true, {}, GazetteManagerMV.config.services, {
        db: {
            url: endpointSelector.urlFor("db"),

            // To enable JSONP support, uncomment the following line
            //jsonp: !window.WinJS,

            // To allow cookies and HTTP authentication with CORS, uncomment the following line
            // withCredentials: true,

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
    
    GazetteManagerMV.db = new DevExpress.data.ODataContext(serviceConfig.db);

}());


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
            
            var showNavButton = function ($markup, $navButtonItem) {
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
                    $.proxy(showNavButton, self, $element);
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

    var INITED = "__inited";

    DX.framework.html.Win8SimpleLayoutController = DX.framework.html.DefaultLayoutController.inherit({

        _onRenderComplete: function(viewInfo) {
            var $toolbarBottom = viewInfo.renderResult.$markup.find(".layout-toolbar-bottom"),
                toolbarBottom = $toolbarBottom.data("dxToolbar");

            if(!$toolbarBottom.data(INITED)) {
                $toolbarBottom.data(INITED, true);
                $toolbarBottom.click(function() {
                    if($toolbarBottom.get(0) === event.srcElement) {
                        $(this).toggleClass("semi-hidden");
                    }
                });
            }

            if(toolbarBottom && toolbarBottom.option("items").length) {
                viewInfo.renderResult.$markup.find(".layout-frame").addClass("has-toolbar-bottom");
            }

            window.setTimeout(function() {
                $toolbarBottom.addClass("with-transition");
            });
        }
    });

    DX.framework.html.layoutControllers.win8simple = new DX.framework.html.Win8SimpleLayoutController();

})(jQuery, DevExpress);


﻿(function($, DX, undefined) {

    DX.framework.html.EmptyLayoutController = DX.framework.html.DefaultLayoutController.inherit({
      
    });

    DX.framework.html.layoutControllers.empty = new DX.framework.html.EmptyLayoutController();
    
})(jQuery, DevExpress);


﻿(function($, DX, undefined) {

    DX.framework.html.NavBarController = DX.framework.html.DefaultLayoutController.inherit({

        _onRenderComplete: function(viewInfo) {

            var CLASS_NAME = "has-toolbar";

            var $layoutFooter = viewInfo.renderResult.$markup.find(".layout-footer"),
                $toolbar = $layoutFooter.find(".dx-toolbar");

            if($toolbar.length) {
                var isToolbarNotEmpty = !!$toolbar.data("dxToolbar").option("items").length,
                    $layoutContent = viewInfo.renderResult.$markup.find(".layout-content");

                $layoutFooter.toggleClass(CLASS_NAME, isToolbarNotEmpty);
                $layoutContent.toggleClass(CLASS_NAME, isToolbarNotEmpty);
            }

            this._initToolbar(viewInfo.renderResult.$markup);

            var $navBar = viewInfo.renderResult.$markup.find("#navBar"),
                navBar = $navBar.data("dxNavBar"),
                $content = viewInfo.renderResult.$markup.find(".layout-content");

            if(!navBar)
                return;

            var isNavBarVisible = $.grep(navBar.option("items"), function (navItem) {
                return $.isFunction(navItem.visible) ? navItem.visible() : navItem.visible;
            }).length;

            if(isNavBarVisible) {
                $content.addClass("has-navbar");
                $navBar.show();
            }
            else {
                $content.removeClass("has-navbar");
                $navBar.hide();
            }

            var $toolbarBottom = viewInfo.renderResult.$markup.find(".layout-toolbar-bottom"),
                toolbarBottom = $toolbarBottom.data("dxToolbar");

            if(toolbarBottom && toolbarBottom.option("items").length) {
                viewInfo.renderResult.$markup.find(".layout-content").addClass("has-toolbar-bottom");
            }

            this.callBase.apply(this, arguments);
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
        }

    });

    DX.framework.html.layoutControllers.navbar = new DX.framework.html.NavBarController();

})(jQuery, DevExpress);

﻿GazetteManagerMV.tenderview = function (params) {

    var viewModel = {
        jid: params.id,
        dataSource: ko.observable(),
        //jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            $.ajax({
                url: 'http://www.shuhood.me/gazette/json/tenderdetails.php?id=' + this.jid,
                dataType: 'json',
                success: function (data) {
                    var mapped = $.map(data.Documents, function (item, index) {
                        return {
                            office: item.Office,
                            title: item.Title,
                            teng: item.TitleASC,
                            id: item.ID,
                            info: item.InfoTime,
                            bid: item.BidTime,
                            cat: item.Category,
                            url: item.URL,//'http://www.shuhood.me/gazette/json/android_url.php?url=' + item.URL,
                            image: 'images/cat/64/' + item.CatID + '_64.png',
                            details: item.Details,
                            deng: item.DetailsENG
                        };
                    })
                    viewModel.dataSource(mapped);
                }
            });
        },
        loading: ko.observable(false),
        loadDetails: function (e) {
            GazetteManagerMV.app.navigate('htmlView');
        },
    };

    return viewModel;
};

﻿GazetteManagerMV.tendersbyoffice = function (params) {

    var viewModel = {
        id: params.id,
        title: ko.observable("Tenders By Office"),
        dataSource: ko.observable(),
       // loadPanel: ko.observable(false),
       // jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            var mapped = getData();
            viewModel.dataSource(mapped);
        },
        loading: ko.observable(false)
    };

    getData = function (id) {
      //  viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/tendersbyoffice.php?id=' + viewModel.id,
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        office: item.Office,
                        id: item.ID,
                        title: item.Title,
                        teng: item.TitleASC,
                        bid: 'Bid on: ' + item.BidTime,
                        info: 'Info on: ' + item.InfoTime,
                        cat: item.Category,
                        url: item.URL,
                        image: 'images/cat/64/' + item.CatID + '_64.png'
                    };
                    viewModel.title("this is to ttest");
                })
                //return mapped;
                //viewModel.title(data.cat);
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    }

    return viewModel;
};

﻿GazetteManagerMV.about = function (params) {

    var viewModel = {
//  Put the binding properties here
    };

    return viewModel;
};

﻿GazetteManagerMV.works = function (params) {

    var viewModel = {
        dataSource: ko.observable(),
        //loadPanel:ko.observable(false),
        selectedTab: ko.observable(0),
       // jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            if (viewModel.selectedTab() == 0) {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
            else if (viewModel.selectedTab() == 1) {
                var mapped = getDataByCategory();
                viewModel.dataSource(mapped);
            }
            else if (viewModel.selectedTab() == 2) {
                var mapped = getDataByOffice();
                viewModel.dataSource(mapped);
            }
            else {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
        },
        loading: ko.observable(false),
        tabClicked :function (e) {
            
            if (e.itemData.text == "by Date") {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
            else if (e.itemData.text == "by Category") {
                var mapped = getDataByCategory();
                viewModel.dataSource(mapped);
            }
            else if (e.itemData.text == "by Office") {
                var mapped = getDataByOffice();
                viewModel.dataSource(mapped);
            }
        }
    };


    getDataByDate = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/works.php',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        office: item.Office,
                        id: item.ID,
                        title: item.Title,
                        teng: item.TitleASC,
                        bid: 'Bid on: ' + item.BidTime,
                        info: 'Info on: ' + item.InfoTime,
                        cat: item.Category,
                        url: item.URL,
                        image: 'images/cat/64/' + item.CatID + '_64.png'
                    };
                })
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    };

    getDataByCategory = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/tendersCategory.php?id=2',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: '2,' + item.ID,
                        category: item.Name,
                        count: 'Total: ' + item.Count + ' Items',
                        image: 'images/cat/64/' + item.ID + '_64.png',
                        cat: item.Name
                    };
                })
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    };


    getDataByOffice = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/tendersOffice.php?id=2',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: '2,' + item.ID,
                        office: item.Name,
                        count: 'Total: ' + item.Count + ' Items',
                        image: 'images/officetype/48/' + item.OfficeTypeID + '_48.png',
                        officetype: item.OfficeTypeID,
                        officetype: item.OfficeType
                    };
                })
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    };



    return viewModel;
};

﻿GazetteManagerMV.htmlView = function (params) {

    var viewModel = {
        jid: params.id,
        dataSource: ko.observable(),
        //jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            $.ajax({
                url: 'http://www.shuhood.me/gazette/json/getURL.php?id=' + this.jid,
                dataType: 'json',
                success: function (data) {
                    var mapped = $.map(data.Documents, function (item, index) {
                        return {
                            html: item.html
                        };
                    })
                    viewModel.dataSource(mapped);
                }
            });
        }
    };

    return viewModel;
};

﻿GazetteManagerMV.buy = function (params) {

    var viewModel = {
        dataSource: ko.observable(),
        //loadPanel: ko.observable(false),
        selectedTab: ko.observable(0),
        //jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            if (viewModel.selectedTab() == 0) {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
            else if (viewModel.selectedTab() == 1) {
                var mapped = getDataByCategory();
                viewModel.dataSource(mapped);
            }
            else if (viewModel.selectedTab() == 2) {
                var mapped = getDataByOffice();
                viewModel.dataSource(mapped);
            }
            else {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
        },
        loading: ko.observable(false),
        tabClicked: function (e) {

            if (e.itemData.text == "by Date") {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
            else if (e.itemData.text == "by Category") {
                var mapped = getDataByCategory();
                viewModel.dataSource(mapped);
            }
            else if (e.itemData.text == "by Office") {
                var mapped = getDataByOffice();
                viewModel.dataSource(mapped);
            }
        }
    };


    getDataByDate = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/buy.php',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        office: item.Office,
                        id: item.ID,
                        title: item.Title,
                        bid: 'Bid on: ' + item.BidTime,
                        info: 'Info on: ' + item.InfoTime,
                        cat: item.Category,
                        url: item.URL,
                        image: 'images/cat/64/' + item.CatID + '_64.png'
                    };
                })
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    }

    getDataByCategory = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/tendersCategory.php?id=3',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: '3,' + item.ID,
                        category: item.Name,
                        count: 'Total: ' + item.Count + ' Items',
                        image: 'images/cat/64/' + item.ID + '_64.png',
                        cat: item.Name
                    };
                })
                viewModel.dataSource(mapped);
                //viewModel.loadPanel(false);
            }
        });
    }


    getDataByOffice = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/tendersOffice.php?id=3',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: '3,' + item.ID,
                        office: item.Name,
                        count: 'Total: ' + item.Count + ' Items',
                        image: 'images/officetype/48/' + item.OfficeTypeID + '_48.png',
                        officetype: item.OfficeTypeID,
                        officetype: item.OfficeType
                    };
                })
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    };

    return viewModel;
};

﻿GazetteManagerMV.trainings = function (params) {

    var viewModel = {
        dataSource: ko.observable(),
        //loadPanel: ko.observable(false),
        selectedTab: ko.observable(0),
       // jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            if (viewModel.selectedTab() == 0) {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
            else if (viewModel.selectedTab() == 1) {
                var mapped = getDataByCategory();
                viewModel.dataSource(mapped);
            }
            else if (viewModel.selectedTab() == 2) {
                var mapped = getDataByOffice();
                viewModel.dataSource(mapped);
            }
            else {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
        },
        loading: ko.observable(false),
        tabClicked: function (e) {

            if (e.itemData.text == "by Date") {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
            else if (e.itemData.text == "by Category") {
                var mapped = getDataByCategory();
                viewModel.dataSource(mapped);
            }
            else if (e.itemData.text == "by Office") {
                var mapped = getDataByOffice();
                viewModel.dataSource(mapped);
            }
        }
    };


    getDataByDate = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/trainings.php',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        office: item.Office,
                        id: item.ID,
                        title: item.Title,
                        bid: 'Bid on: ' + item.BidTime,
                        info: 'Info on: ' + item.InfoTime,
                        cat: item.Category,
                        url: item.URL,
                        image: 'images/cat/64/' + item.CatID + '_64.png'
                    };
                })
                viewModel.dataSource(mapped);
                //viewModel.loadPanel(false);
            }
        });
    }

    getDataByCategory = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/tendersCategory.php?id=10',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: '10,' + item.ID,
                        category: item.Name,
                        count: 'Total: ' + item.Count + ' Items',
                        image: 'images/cat/64/' + item.ID + '_64.png',
                        cat: item.Name
                    };
                })
                viewModel.dataSource(mapped);
                //viewModel.loadPanel(false);
            }
        });
    }


    getDataByOffice = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/tendersOffice.php?id=10',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: '10,' + item.ID,
                        office: item.Name,
                        count: 'Total: ' + item.Count + ' Items',
                        image: 'images/officetype/48/' + item.OfficeTypeID + '_48.png',
                        officetype: item.OfficeTypeID,
                        officetype: item.OfficeType
                    };
                })
                viewModel.dataSource(mapped);
              //  viewModel.loadPanel(false);
            }
        });
    };


    return viewModel;
};

﻿GazetteManagerMV.bid = function (params) {

    var viewModel = {
        dataSource: ko.observable(),
        //loadPanel: ko.observable(false),
        selectedTab: ko.observable(0),
       // jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            if (viewModel.selectedTab() == 0) {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
            else if (viewModel.selectedTab() == 1) {
                var mapped = getDataByCategory();
                viewModel.dataSource(mapped);
            }
            else if (viewModel.selectedTab() == 2) {
                var mapped = getDataByOffice();
                viewModel.dataSource(mapped);
            }
            else {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
        },
        loading: ko.observable(false),
        tabClicked: function (e) {

            if (e.itemData.text == "by Date") {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
            else if (e.itemData.text == "by Category") {
                var mapped = getDataByCategory();
                viewModel.dataSource(mapped);
            }
            else if (e.itemData.text == "by Office") {
                var mapped = getDataByOffice();
                viewModel.dataSource(mapped);
            }
        }
    };


    getDataByDate = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/bid.php',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        office: item.Office,
                        id: item.ID,
                        title: item.Title,
                        bid: 'Bid on: ' + item.BidTime,
                        info: 'Info on: ' + item.InfoTime,
                        cat: item.Category,
                        url: item.URL,
                        image: 'images/cat/64/' + item.CatID + '_64.png'
                    };
                })
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    }

    getDataByCategory = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/tendersCategory.php?id=4',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: '4,' + item.ID,
                        category: item.Name,
                        count: 'Total: ' + item.Count + ' Items',
                        image: 'images/cat/64/' + item.ID + '_64.png',
                        cat: item.Name
                    };
                })
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    }


    getDataByOffice = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/tendersOffice.php?id=4',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: '4,' + item.ID,
                        office: item.Name,
                        count: 'Total: ' + item.Count + ' Items',
                        image: 'images/officetype/48/' + item.OfficeTypeID + '_48.png',
                        officetype: item.OfficeTypeID,
                        officetype: item.OfficeType
                    };
                })
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    };


    return viewModel;
};

﻿GazetteManagerMV.jobview = function (params) {

    var viewModel = {
        jid: params.id,
        dataSource: ko.observable(),        
        //jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            $.ajax({
                url: 'http://www.shuhood.me/gazette/json/jobdetails.php?id=' + this.jid,
                dataType: 'json',
                success: function (data) {
                    var mapped = $.map(data.Documents, function (item, index) {
                        return {
                            tid:params.id,
                            office: item.Office,
                            id: item.ID,
                            job: item.Job,
                            bid: item.BidTime,
                            cat: item.Category,
                            url: 'http://www.shuhood.me/gazette/json/android_url.php?url=' + item.URL,
                            image: 'images/cat/64/' + item.CatID + '_64.png',
                            salary: item.Salary,
                            basic: item.Basic,
                            service: item.Service,
                            living: item.Living,
                            other: item.Other,
                            nonp: item.NoPractice,
                            prof: item.Professional,
                            details: item.Details
                        };
                    })
                    viewModel.dataSource(mapped);
                }
            });
        }
    };

    GetValue = function (amount) {
        if(amount.length > 1)
            return amount + ' MVR';
        else
            return "-";
    };

    return viewModel;
};

﻿GazetteManagerMV.announcement = function (params) {

    var viewModel = {
        dataSource: ko.observable(),
        //jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            $.ajax({
                url: 'http://www.shuhood.me/gazette/json/announcements.php',
                dataType: 'json',
                success: function (data) {
                    var mapped = $.map(data.Documents, function (item, index) {
                        return {
                            office: item.Office,
                            id: item.ID,
                            title: item.Title,
                            //bid: 'Bid on: ' + item.BidTime,
                            //info: 'Info on: ' + item.InfoTime,
                            //cat: item.Category,
                            url: item.URL,
                            //image: 'images/cat/64/' + item.CatID + '_64.png'
                        };
                    })
                    viewModel.dataSource(mapped);
                }
            });
        },
        loading: ko.observable(false)
    };

    return viewModel;
};

﻿GazetteManagerMV.home = function (params) {

    


    var viewModel = {
       // loadPanel: ko.observable(false),
        dataSource: ko.observable(),
       // jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            var mapped = getData();
            viewModel.dataSource(mapped);
        },
        loading: ko.observable(false),
        itemClick: function (e) {//List Item Clicked 
            switch(e.itemData.id)
            {
                case "1":
                    GazetteManagerMV.app.navigate('jobs');
                    break;
                case "2":
                    GazetteManagerMV.app.navigate('works');
                    break;
                case "3":
                    GazetteManagerMV.app.navigate('buy');
                    break;
                case "4":
                    GazetteManagerMV.app.navigate('bid');
                    break;
                case "5":
                    GazetteManagerMV.app.navigate('announcement');
                    break;
                case "6":
                    GazetteManagerMV.app.navigate('rent');
                    break;
                case "7":
                    GazetteManagerMV.app.navigate('rent');
                    break;
                case "8":
                    GazetteManagerMV.app.navigate('insurance');
                    break;
                case "9":
                    GazetteManagerMV.app.navigate('competitions');
                    break;
                case "10":
                    GazetteManagerMV.app.navigate('trainings');
                    break;
                case "11":
                    GazetteManagerMV.app.navigate('geninfo');
                    break;
                default:
                    GazetteManagerMV.app.navigate('home');
                    break;
            }
        },
    };

    
    getData = function () {
       // viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/doctypes.php',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        doctype: item.DocType,
                        id: item.ID,
                        count: 'Total ' + item.Count + ' Items',
                        image: 'images/doctype/' + item.ID + '.png'
                    };
                })
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);                
            }
        });
    };


    getImagePath = function (name) {
        return "images/doctype/" + name + ".png";
    };

    return viewModel;
};


﻿GazetteManagerMV.jobs = function (params) {

    var viewModel = {
        dataSource: ko.observable(),
        //loadPanel:ko.observable(false),
        //jobName: ko.observable().extend({ throttle: 500 }),
        selectedTab: ko.observable(0),
        viewShown: function () {
            if (viewModel.selectedTab() == 0) {
                var mapped = getDataByDate();
                //viewModel.dataSource(mapped);
            }
            else if (viewModel.selectedTab() == 1) {
                var mapped = getDataByCategory();
                //viewModel.dataSource(mapped);
            }
            else if (viewModel.selectedTab() == 2) {
                var mapped = getDataByOffice();
                //viewModel.dataSource(mapped);
            }
            else {
                var mapped = getDataByDate();
                //viewModel.dataSource(mapped);
            }
        },
        loading: ko.observable(false),
        tabClicked :function (e) {
            
            if (e.itemData.text == "by Date") {
                var mapped = getDataByDate();
                //viewModel.dataSource(mapped);
            }
            else if (e.itemData.text == "by Category") {
                var mapped = getDataByCategory();
                //viewModel.dataSource(mapped);
            }
            else if (e.itemData.text == "by Office") {
                var mapped = getDataByOffice();
                //viewModel.dataSource(mapped);
            }
        }
    };


    getDataByDate = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/jobs.php',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        office: item.Office,
                        id: item.JobID,
                        job: 'Job ' + item.Job,
                        bid: 'Expiry: ' + item.BidTime,
                        cat: item.Category,
                        url: item.URL,
                        image: 'images/cat/64/' + item.CatID + '_64.png',
                        salary: 'Salary: ' + item.Salary + ' MVR',
                        officetypeid: '',
                        officetype:''
                    };
                })
                //return mapped;
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    }

    getDataByCategory = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/jobcategory.php',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: item.ID,
                        category: item.Name,
                        count: 'Total: ' + item.Count + ' Items',
                        image: 'images/cat/64/' + item.ID + '_64.png',
                        cat: item.Name
                    };
                })
                //return mapped;
                viewModel.dataSource(mapped);
              //  viewModel.loadPanel(false);
            }
        });
    };


    getDataByOffice = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/joboffice.php',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: item.ID,
                        office: item.Name,
                        count: 'Total: ' + item.Count + ' Items',
                        image: 'images/officetype/48/' + item.OfficeTypeID + '_48.png',
                        officetype: item.OfficeTypeID,
                        officetype: item.OfficeType
                    };
                })
                //return mapped;
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    };



    //viewModel.jobName.subscribe(function (value) {
        //viewModel.dataSource.filter(["Job", "contains", value]);
    //    viewModel.dataSource(
   //         $.grep(mapped, function (item) { return item.Job().indexOf(value) > -1; })
    //    );
   //     viewModel.loading(false);
   // });


    return viewModel;
};


﻿GazetteManagerMV.rent = function (params) {

    var viewModel = {
        dataSource: ko.observable(),
        //loadPanel: ko.observable(false),
        selectedTab: ko.observable(0),
       // jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            if (viewModel.selectedTab() == 0) {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
            else if (viewModel.selectedTab() == 1) {
                var mapped = getDataByCategory();
                viewModel.dataSource(mapped);
            }
            else if (viewModel.selectedTab() == 2) {
                var mapped = getDataByOffice();
                viewModel.dataSource(mapped);
            }
            else {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
        },
        loading: ko.observable(false),
        tabClicked: function (e) {

            if (e.itemData.text == "by Date") {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
            else if (e.itemData.text == "by Category") {
                var mapped = getDataByCategory();
                viewModel.dataSource(mapped);
            }
            else if (e.itemData.text == "by Office") {
                var mapped = getDataByOffice();
                viewModel.dataSource(mapped);
            }
        }
    };


    getDataByDate = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/rent.php',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        office: item.Office,
                        id: item.ID,
                        title: item.Title,
                        bid: 'Bid on: ' + item.BidTime,
                        info: 'Info on: ' + item.InfoTime,
                        cat: item.Category,
                        url: item.URL,
                        image: 'images/cat/64/' + item.CatID + '_64.png'
                    };
                })
                viewModel.dataSource(mapped);
              //  viewModel.loadPanel(false);
            }
        });
    }

    getDataByCategory = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/tendersCategory.php?id=6',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: '6,' + item.ID,
                        category: item.Name,
                        count: 'Total: ' + item.Count + ' Items',
                        image: 'images/cat/64/' + item.ID + '_64.png',
                        cat: item.Name
                    };
                })
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    }


    getDataByOffice = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/tendersOffice.php?id=6',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: '6,' + item.ID,
                        office: item.Name,
                        count: 'Total: ' + item.Count + ' Items',
                        image: 'images/officetype/48/' + item.OfficeTypeID + '_48.png',
                        officetype: item.OfficeTypeID,
                        officetype: item.OfficeType
                    };
                })
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    };


    return viewModel;
};

﻿GazetteManagerMV.tendersbycategory = function (params) {

    var viewModel = {
        id: params.id,
        title: ko.observable("Tenders By Category"),
        dataSource: ko.observable(),
       // loadPanel: ko.observable(false),
        //jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            var mapped = getData();
            viewModel.dataSource(mapped);
        },
        loading: ko.observable(false)
    };

    getData = function (id) {
       // viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/tendersbycategory.php?id=' + viewModel.id,
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        office: item.Office,
                        id: item.ID,
                        title: item.Title,
                        teng: item.TitleASC,
                        bid: 'Bid on: ' + item.BidTime,
                        info: 'Info on: ' + item.InfoTime,
                        cat: item.Category,
                        url: item.URL,
                        image: 'images/cat/64/' + item.CatID + '_64.png'
                    };
                })
                //return mapped;
                //viewModel.title(data.cat);
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    }


    return viewModel;
};

﻿GazetteManagerMV.imageLegend = function (params) {

    var viewModel = {
        dataSource: ko.observable(),
        //loadPanel: ko.observable(false),
        selectedTab: ko.observable(0),
        //jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            if (viewModel.selectedTab() == 0) {
                dataSource:getDataByCategory();
               // viewModel.dataSource(dataSource);
            }
            else if (viewModel.selectedTab() == 1) {
                dataSource:getDataByDocTypes();
                //viewModel.dataSource(dataSource);
            }
            else if (viewModel.selectedTab() == 2) {
                dataSource: getDataByOfficeTypes();
               // viewModel.dataSource(dataSource);
            }
            else {
                dataSource:getDataByCategory();
               // viewModel.dataSource(dataSource);
            }
        },
        loading: ko.observable(false),
        tabClicked: function (e) {

            if (e.itemData.text == "Category") {
                dataSource:getDataByCategory();
                //viewModel.dataSource(dataSource);
            }
            else if (e.itemData.text == "Gazette Types") {
                dataSource:getDataByDocTypes();
                //viewModel.dataSource(dataSource);
            }
            else if (e.itemData.text == "Office Types") {
                dataSource:getDataByOfficeTypes();
                //viewModel.dataSource(dataSource);
            }
        }
    };


    getDataByCategory = function () {
      //  viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/Images.php?id=1',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: item.ID,
                        title: item.Name,
                        image: 'images/cat/64/' + item.ID + '_64.png'
                    };
                })
                viewModel.dataSource(mapped);
              //  viewModel.loadPanel(false);
            }
        });
    };

    getDataByDocTypes = function () {
      //  viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/Images.php?id=2',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: item.ID,
                        title: item.Name,
                        image: 'images/doctype/' + item.ID + '.png'
                    };
                })
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    };

    getDataByOfficeTypes = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/Images.php?id=3',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: item.ID,
                        title: item.Name,
                        image: 'images/officetype/48/' + item.ID + '_48.png'
                    };
                })
                viewModel.dataSource(mapped);
                //viewModel.loadPanel(false);
            }
        });
    };




    return viewModel;
};

﻿GazetteManagerMV.geninfo = function (params) {

    var viewModel = {
        dataSource: ko.observable(),
        viewShown: function () {
            $.ajax({
                url: 'http://www.shuhood.me/gazette/json/generalinfo.php',
                dataType: 'json',
                success: function (data) {
                    var mapped = $.map(data.Documents, function (item, index) {
                        return {
                            office: item.Office,
                            id: item.ID,
                            title: item.Title,
                            //bid: 'Bid on: ' + item.BidTime,
                            //info: 'Info on: ' + item.InfoTime,
                            //cat: item.Category,
                            url: item.URL,
                            //image: 'images/cat/64/' + item.CatID + '_64.png'
                        };
                    })
                    viewModel.dataSource(mapped);
                }
            });
        },
        loading: ko.observable(false)
    };

    return viewModel;
};

﻿GazetteManagerMV.jobcategory = function (params) {

    var viewModel = {
        id: params.id,
        title: ko.observable("Jobs By Category"),
        dataSource: ko.observable(),
       // loadPanel: ko.observable(false),
        //jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            var mapped = getData();
            viewModel.dataSource(mapped);
        },
        loading: ko.observable(false)
    };

    getData = function (id) {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/jobsbycategory.php?id=' + viewModel.id,
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        office: item.Office,
                        id: item.JobID,
                        job: 'Job ' + item.Job,
                        bid: 'Expiry: ' + item.BidTime,
                        cat: item.Category,
                        url: item.URL,
                        image: 'images/officetype/48/' + item.OfficeTypeID + '_48.png',
                        salary: 'Salary: ' + item.Salary + ' MVR',
                        officetypeid: item.OfficeTypeID,
                        officetype: item.OfficeType
                    };
                })
                //return mapped;
                //viewModel.title(data.cat);
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    }


    return viewModel;
};

﻿GazetteManagerMV.competitions = function (params) {

    var viewModel = {
        dataSource: ko.observable(),
        //loadPanel: ko.observable(false),
        selectedTab: ko.observable(0),
        //jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            if (viewModel.selectedTab() == 0) {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
            else if (viewModel.selectedTab() == 1) {
                var mapped = getDataByCategory();
                viewModel.dataSource(mapped);
            }
            else if (viewModel.selectedTab() == 2) {
                var mapped = getDataByOffice();
                viewModel.dataSource(mapped);
            }
            else {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
        },
        loading: ko.observable(false),
        tabClicked: function (e) {

            if (e.itemData.text == "by Date") {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
            else if (e.itemData.text == "by Category") {
                var mapped = getDataByCategory();
                viewModel.dataSource(mapped);
            }
            else if (e.itemData.text == "by Office") {
                var mapped = getDataByOffice();
                viewModel.dataSource(mapped);
            }
        }
    };


    getDataByDate = function () {
       // viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/competitions.php',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        office: item.Office,
                        id: item.ID,
                        title: item.Title,
                        bid: 'Bid on: ' + item.BidTime,
                        info: 'Info on: ' + item.InfoTime,
                        cat: item.Category,
                        url: item.URL,
                        image: 'images/cat/64/' + item.CatID + '_64.png'
                    };
                })
                viewModel.dataSource(mapped);
                //viewModel.loadPanel(false);
            }
        });
    }

    getDataByCategory = function () {
      //  viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/tendersCategory.php?id9',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: '9,' + item.ID,
                        category: item.Name,
                        count: 'Total: ' + item.Count + ' Items',
                        image: 'images/cat/64/' + item.ID + '_64.png',
                        cat: item.Name
                    };
                })
                viewModel.dataSource(mapped);
             //   viewModel.loadPanel(false);
            }
        });
    }


    getDataByOffice = function () {
       // viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/tendersOffice.php?id=9',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: '9,' + item.ID,
                        office: item.Name,
                        count: 'Total: ' + item.Count + ' Items',
                        image: 'images/officetype/48/' + item.OfficeTypeID + '_48.png',
                        officetype: item.OfficeTypeID,
                        officetype: item.OfficeType
                    };
                })
                viewModel.dataSource(mapped);
                //viewModel.loadPanel(false);
            }
        });
    };


    return viewModel;
};

﻿GazetteManagerMV.joboffice = function (params) {

    var viewModel = {
        id: params.id,
        title: ko.observable("Jobs By Office"),
        dataSource: ko.observable(),
        //loadPanel: ko.observable(false),
       // jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            var mapped = getData();
            viewModel.dataSource(mapped);
        },
        loading: ko.observable(false)
    };

    getData = function (id) {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/jobsbyoffice.php?id=' + viewModel.id,
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        office: item.Office,
                        id: item.JobID,
                        job: 'Job ' + item.Job,
                        bid: 'Expiry: ' + item.BidTime,
                        cat: item.Category,
                        url: item.URL,
                        image: 'images/cat/64/' + item.CatID + '_64.png',
                        salary: 'Salary: ' + item.Salary + ' MVR',
                        officetypeid: item.OfficeTypeID,
                        officetype: item.OfficeType
                    };
                })
                //return mapped;
                //viewModel.title(data.cat);
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    }

    return viewModel;
};

﻿GazetteManagerMV.announceview = function (params) {

    var viewModel = {
        jid: params.id,
        dataSource: ko.observable(),
        //jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            $.ajax({
                url: 'http://www.shuhood.me/gazette/json/tenderdetails.php?id=' + this.jid,
                dataType: 'json',
                success: function (data) {
                    var mapped = $.map(data.Documents, function (item, index) {
                        return {
                            office: item.Office,
                            title: item.Title,
                            id: item.ID,
                            cat: item.Category,
                            url: 'http://www.shuhood.me/gazette/json/android_url.php?url=' + item.URL,
                            image: 'images/cat/64/' + item.CatID + '_64.png',
                            details: item.Details
                        };
                    })
                    viewModel.dataSource(mapped);
                }
            });
        }
    };

    return viewModel;
};

﻿GazetteManagerMV.insurance = function (params) {

    var viewModel = {
        dataSource: ko.observable(),
        //loadPanel: ko.observable(false),
        selectedTab: ko.observable(0),
        //jobName: ko.observable().extend({ throttle: 500 }),
        viewShown: function () {
            if (viewModel.selectedTab() == 0) {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
            else if (viewModel.selectedTab() == 1) {
                var mapped = getDataByCategory();
                viewModel.dataSource(mapped);
            }
            else if (viewModel.selectedTab() == 2) {
                var mapped = getDataByOffice();
                viewModel.dataSource(mapped);
            }
            else {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
        },
       // loading: ko.observable(false),
        tabClicked: function (e) {

            if (e.itemData.text == "by Date") {
                var mapped = getDataByDate();
                viewModel.dataSource(mapped);
            }
            else if (e.itemData.text == "by Category") {
                var mapped = getDataByCategory();
                viewModel.dataSource(mapped);
            }
            else if (e.itemData.text == "by Office") {
                var mapped = getDataByOffice();
                viewModel.dataSource(mapped);
            }
        }
    };


    getDataByDate = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/insurance.php',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        office: item.Office,
                        id: item.ID,
                        title: item.Title,
                        bid: 'Bid on: ' + item.BidTime,
                        info: 'Info on: ' + item.InfoTime,
                        cat: item.Category,
                        url: item.URL,
                        image: 'images/cat/64/' + item.CatID + '_64.png'
                    };
                })
                viewModel.dataSource(mapped);
                //viewModel.loadPanel(false);
            }
        });
    }

    getDataByCategory = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/tendersCategory.php?id=8',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: '8,' + item.ID,
                        category: item.Name,
                        count: 'Total: ' + item.Count + ' Items',
                        image: 'images/cat/64/' + item.ID + '_64.png',
                        cat: item.Name
                    };
                })
                viewModel.dataSource(mapped);
               // viewModel.loadPanel(false);
            }
        });
    }


    getDataByOffice = function () {
        //viewModel.loadPanel(true);
        $.ajax({
            url: 'http://www.shuhood.me/gazette/json/tendersOffice.php?id=8',
            dataType: 'json',
            success: function (data) {
                var mapped = $.map(data.Documents, function (item, index) {
                    return {
                        id: '8,' + item.ID,
                        office: item.Name,
                        count: 'Total: ' + item.Count + ' Items',
                        image: 'images/officetype/48/' + item.OfficeTypeID + '_48.png',
                        officetype: item.OfficeTypeID,
                        officetype: item.OfficeType
                    };
                })
                viewModel.dataSource(mapped);
                //viewModel.loadPanel(false);
            }
        });
    };


    return viewModel;
};
