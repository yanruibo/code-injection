
window.PerformanceCalculator = $.extend(true, window.PerformanceCalculator, {
  "config": {
    "defaultLayout": "slideout",
    "navigation": [
      {
        "title": "Dati di Produzione",
        "action": "#variables",
        "icon": "clock"
      },
      {
        "title": "Statistiche",
        "action": "#statistics",
        "icon": "percent"
      },
      {
        "title": "Velocita'",
        "action": "#speedloss",
        "icon": "runner"
      },
      {
        "title": "Impostazioni",
        "action": "#settings",
        "icon": "preferences"
      },
      {
          "title": "Informazioni",
          "action": "#about",
          "icon": "info"
      }
      /*
      {
        "title": "orders",
        "action": "#orders",
        "icon": "orders"
      }
      */
    ]
  }
});

﻿window.PerformanceCalculator = window.PerformanceCalculator || {};

$(function() {
    PerformanceCalculator.app = new DevExpress.framework.html.HtmlApplication({
        namespace: PerformanceCalculator,
        defaultLayout: PerformanceCalculator.config.defaultLayout,
        navigation: PerformanceCalculator.config.navigation
    });
    PerformanceCalculator.app.router.register(":view/:id", { view: "variables", id: undefined });
    PerformanceCalculator.app.navigate();
});






















﻿/// <reference path="../js/jquery-1.9.1.min.js"; />
/// <reference path="../js/knockout-2.2.1.js"; />
/// <reference path="../js/dx.all.js"; />

(function() {
    PerformanceCalculator.db = {

        sampleData: new DevExpress.data.RestStore({
            url: "/data/sampleData.json"
        })

    };
})();

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

﻿//Controllo del localStorage per la presenza di variabili già in memoria da sessioni precedenti
if (localStorage.getItem('target_efficiency')) {
    var gTargetEfficiency = localStorage.getItem('target_efficiency');
}
else {
    var gTargetEfficiency = 70;         // %
}

if (localStorage.getItem('target_performance')) {
    var gTargetPerformance = localStorage.getItem('target_performance');
}
else {
    var gTargetPerformance = 70;         // %
}

if (localStorage.getItem('target_speed_loss')) {
    var gTargetSpeedLoss = localStorage.getItem('target_speed_loss');
}
else {
    var gTargetSpeedLoss = 20;         // %
}

// Quantità di tempo pianificata per la conclusione di un ciclo di produzione o 
// per la produzione dell'intera quantità di un ordine
var gTargetPO = 0;
// Quantità di tempo di produzione effettiva, depurata dai downtime programmati 
// e non relativi al PO stesso
var gEffectivePO = 0;

// Quantità di tempo per le fermate programmate e relative allo specifico PO
var gDownTimePO = 0;
// Quantità di tempo per le fermate programmate e non relative allo specifico PO
var gDownTimeNPO = 0;
// Quantità di tempo per le fermate non programmate e non relative allo specifico PO
var gBreakDownPO = 0;

var gDownTimeTotal = gDownTimeNPO + gDownTimePO;


// Calcolo del DownTime Totale
function CalculateDownTimeTotal() {
    gDownTimeTotal = gDownTimePO + gDownTimeNPO;
};

var gPerformance = 0;
var gEfficiency = 0;

// Calcolo Performance
function CalculatePerformance() {
    if (gEffectivePO !== 0) {
        gPerformance = (gTargetPO / gEffectivePO) * 100;
    }
    else {
        gPerformance = 0;
    }
};

// Calcolo Efficienza
function CalculateEfficiency() {
    if ((gEffectivePO - gDownTimePO) !== 0) {
        gEfficiency = gTargetPO / (gEffectivePO - gDownTimePO) * 100;
    }
    else {
        gEfficiency = 0;        
    }
};

var gSpeedLoss = 0;
var gSpeedLossPercent = 0;

// Calcolo perdita di velocità
function CalculateSpeedLoss() {
    gSpeedLoss = gEffectivePO - gTargetPO - gDownTimePO - gBreakDownPO;
    gSpeedLossPercent = gSpeedLoss / gEffectivePO * 100;
};

﻿PerformanceCalculator.settings = function (params) {

    var viewModel = {
        // Variabili associate ai controlli
        targetEfficiency: ko.observable(gTargetEfficiency),
        targetPerformance: ko.observable(gTargetPerformance),
        targetSpeedLoss: ko.observable(gTargetSpeedLoss),

        targetEfficiency_focusOut: function () {
            gTargetEfficiency = this.targetEfficiency();
            //Salvo il valore modificato della gVariabile nel localStorage associandolo alla stessa key ad ogni modifica

            localStorage.setItem('target_efficiency', JSON.stringify(gTargetEfficiency));
        },
        targetPerformance_focusOut: function () {
            gTargetPerformance = this.targetPerformance();

            localStorage.setItem('target_performance', JSON.stringify(gTargetPerformance));
        },
        targetSpeedLoss_focusOut: function () {
            gTargetSpeedLoss = this.targetSpeedLoss();

            localStorage.setItem('target_speed_loss', JSON.stringify(gTargetSpeedLoss));
        },

    };
    
    return viewModel;
};

﻿PerformanceCalculator.speedloss = function (params) {

    var viewModel = {
        speedLoss: ko.observable(gSpeedLoss),
        speedLossPercent: ko.observable(gSpeedLossPercent),

        // Opzioni per la percentuale di Efficienza
        speedLossGaugeOptions: {
            scale: {
                startValue: 0,
                endValue: 100,
                majorTick: {
                    showCalculatedTicks: false,
                    customTickValues: [0, 25, 50, 75, 100]
                }
            }
        },

        viewShown: function () {
            CalculateSpeedLoss();
            this.speedLoss(gSpeedLoss);
            this.speedLossPercent(gSpeedLossPercent);
            $("#lgSpeedLoss").dxLinearGauge({
                rangeContainer: {
                    ranges: [
                        { startValue: 0, endValue: gTargetSpeedLoss, color: '#A6C567' },
                        { startValue: gTargetSpeedLoss, endValue: 100, color: '#E19094' }]
                },
                markers: [{ value: gSpeedLossPercent }]
            });
        }
    };

    return viewModel;
}; 


﻿PerformanceCalculator.orders = function (params) {

    var viewModel = {
//  Put the binding properties here
    };

    return viewModel;
};


﻿PerformanceCalculator.variables = function (params) {

    var viewModel = {
        // Variabili associate ai controlli
        targetPO: ko.observable(gTargetPO),
        effectivePO: ko.observable(gEffectivePO),
        downTimePO: ko.observable(gDownTimePO),
        downTimeNPO: ko.observable(gDownTimeNPO),
        breakDownNPO: ko.observable(gBreakDownPO),
        downTimeTotal: ko.observable(gDownTimeTotal),

        RefreshStopChart: function () {
            $("#chStops").dxPieChart({
                dataSource:
                [{ arg: 'Dt. PO', val: gDownTimePO },
                    { arg: 'Dt. NPO', val: gDownTimeNPO },
                    { arg: 'BD', val: gBreakDownPO }], series: {}
            })
        },

        downTimePO_focusOut: function () {
            gDownTimePO = this.downTimePO();
            CalculateDownTimeTotal();
            this.downTimeTotal(gDownTimeTotal);
            this.RefreshStopChart();
        },
        downTimeNPO_focusOut: function () {
            gDownTimeNPO = this.downTimeNPO();
            CalculateDownTimeTotal();
            this.downTimeTotal(gDownTimeTotal);
            this.RefreshStopChart();
        },
        targetPO_focusOut: function () {
            gTargetPO = this.targetPO();
        },
        effectivePO_focusOut: function () {
            gEffectivePO = this.effectivePO();
        },
        breakDownNPO_focusOut: function () {
            gBreakDownPO = this.breakDownNPO();
            this.RefreshStopChart();
        }

    };

    return viewModel;
};

﻿PerformanceCalculator.home = function (params) {

    var viewModel = {
    };

    return viewModel;
};

﻿PerformanceCalculator.statistics = function (params) {

    var viewModel = {
        // Variabili associate ai controlli
        efficiency: ko.observable(gEfficiency),
        performance: ko.observable(gPerformance),

        // Opzioni per la percentuale di Efficienza
        efficiencyGaugeOptions: {
            scale: {
                startValue: 0,
                endValue: 100,
                majorTick: {
                    showCalculatedTicks: false,
                    customTickValues: [0, 25, 50, 75, 100]
                }
            }
        },

        // Opzioni per la percentuale di Performance
        performanceGaugeOptions: {
            scale: {
                startValue: 0,
                endValue: 100,
                majorTick: {
                    showCalculatedTicks: false,
                    customTickValues: [0, 25, 50, 75, 100]
                }
            }
        },

        // Opzioni per la percentuale di DownTime
        downTimePercentGaugeOptions: {
            scale: {
                startValue: 0,
                endValue: 100,
                majorTick: {
                    showCalculatedTicks: false,
                    customTickValues: [0, 25, 50, 75, 100]
                }
            }
        },

        // Opzioni per la percentuale di BreakDown
        breakDownPercentGaugeOptions: {
            scale: {
                startValue: 0,
                endValue: 100,
                majorTick: {
                    showCalculatedTicks: false,
                    customTickValues: [0, 25, 50, 75, 100]
                }                
            }
        },

        viewShown: function () {
            CalculatePerformance();
            CalculateEfficiency();
            this.efficiency(gEfficiency);
            this.performance(gPerformance);
            $("#lgEfficiency").dxLinearGauge({
                rangeContainer: {
                    ranges: [
                        { startValue: 0, endValue: gTargetEfficiency, color: '#E19094' },
                        { startValue: gTargetEfficiency, endValue: 100, color: '#A6C567' }]
                },
                markers: [{ value: gEfficiency }]
            });
            $("#lgPerformance").dxLinearGauge({
                rangeContainer: {
                    ranges: [
                        { startValue: 0, endValue: gTargetPerformance, color: '#E19094' },
                        { startValue: gTargetPerformance, endValue: 100, color: '#A6C567' }]
                },
                markers: [{ value: gPerformance }]
            });

            var downtimePercent = 0;
            var breakdownPercent = 0;
            if (gEffectivePO !== 0) {
                downtimePercent = gDownTimeTotal / gEffectivePO * 100;
                breakdownPercent = gBreakDownPO / gEffectivePO * 100;
            }           

            $("#lgDownTimePercent").dxLinearGauge({
                markers: [{ value: downtimePercent }]
            });
            $("#lgBreakDownPercent").dxLinearGauge({
                markers: [{ value: breakdownPercent }]
            });
        },

    };

    return viewModel;
};
