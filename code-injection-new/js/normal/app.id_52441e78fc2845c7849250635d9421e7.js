
window.PreflightMobile2 = $.extend(true, window.PreflightMobile2, {
  "config": {
    "defaultLayout": "navbar",
    "navigation": [
      {
        "title": "Menu",
        "action": "#menuMain",
        "icon": "home"
      },
      {
        "title": "Reservations",
        "action": "#ResList",
        "icon": "event"
      },
      {
        "title": "Cards",
        "action": "#cardList",
        "icon": "card"
      },
      {
        "title": "Awards",
        "action": "#MenuAward",
        "icon": "gift"
      },
      {
        "title": "Account",
        "action": "#accountMenu",
        "icon": "user"
      }
    ]
  }
});



﻿window.PreflightMobile2 = window.PreflightMobile2 || {};

$(function () {
    PreflightMobile2.app = new DevExpress.framework.html.HtmlApplication({
        namespace: PreflightMobile2,
        defaultLayout: PreflightMobile2.config.defaultLayout,
        navigation: PreflightMobile2.config.navigation,
        startupView: "menuMain"
    });

    //Routes:
    PreflightMobile2.app.router.register(":view/:id", { view: "menuMain", id: undefined });
    PreflightMobile2.app.navigate();

    //Switch to the iOS theme GJS 7/14/2013
    var devices = DevExpress.devices,
        iosVersion = devices.iosVersion();
    if (devices.current().platform === "ios") {
        $(".dx-viewport")
            .removeClass("dx-theme-ios")
            .addClass("dx-theme-ios7");
    }
    //also switch the android theme. GJS 7/14/2013
    if (devices.current().platform === "android") {
        $(".dx-viewport")
            .removeClass("dx-theme-android")
            .addClass("dx-theme-ios7");
    }

    //Custom Validation code: GJS 7/14/2013
    ko.validation.configure({
        //decorateElement: true,
        insertMessages: true,
        errorElementClass: 'error'
    });

    // Validation plugin support code SJS / GJS 7/14/2013
    var temp = document.createElement("div");
    function getObservableForProp(element, widgetName, propName) {
        var dataAttrName = "data-" + DevExpress.inflector.underscore(widgetName);
        temp.setAttribute("data-bind", "_:" + element.getAttribute(dataAttrName));
        var o = ko.bindingProvider.instance.getBindings(temp, ko.contextFor(element));
        return o._[propName];
    }
    makedxBindingHandlerValidatable = function (handlerName) {
        var init = ko.bindingHandlers[handlerName].init;

        ko.bindingHandlers[handlerName].init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

            init(element, valueAccessor, allBindingsAccessor);

            valueAccessor = function () { return getObservableForProp(element, handlerName, "value"); };
            return ko.bindingHandlers['validationCore'].init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
        };
    };
    makedxBindingHandlerValidatable("dxTextBox");
    makedxBindingHandlerValidatable("dxLookup");
    makedxBindingHandlerValidatable("dxDateBox");
    
});













































































﻿var showLOG = true; //True or False if you want debug/log messages in the console.
if (!showLOG) {
    if (!window.console) window.console = {};
    var methods = ["log", "debug", "warn", "info"];
    for (var i = 0; i < methods.length; i++) {
        console[methods[i]] = function () { };
    }
}

//Custom Global variables:
//var apiUrl = "http://localhost:55415/";
//var apiUrl = "https://preflightapitest.intpark.com/pfmapi/";
var apiUrl = "https://preflightapi.intpark.com/";

var appVersionNum = "1.2.4";

var msg_RequiredField = "One or more fields haven't been filled in. Please enter information into the required fields and try again. Make sure to scroll to the bottom of the form in case you can't see all the fields.";

console.log("apiURL:", apiUrl);

//Custom Global Functions SC GJS 7/14/13. Put any misc. Global functions or variables here.

//shrink the navbar to 0px if false, otherwise set it to show. 
function setNavBar(showNavBarTF) {
    if (showNavBarTF) {

        $(".layout-footer").css('height', '59px'); //show
        $(".has-navbar").css('bottom', '59px');
        $(".layout-content").css('bottom', '59px');
    }
    else {
        $(".layout-footer").css('height', '0px'); //hide.
        $(".has-navbar").css('bottom', '0px');
        $(".layout-content").css('bottom', '0px');
    }
   
};

function RemoveViewFromCache(viewName) {
    var requiredView = null;
    for (var prop in PreflightMobile2.app._viewCache._cache) {
        var v = PreflightMobile2.app._viewCache._cache[prop];
        if (v.viewName == viewName) {
            requiredView = prop;
            break;
        }
    }
    if (requiredView)
        PreflightMobile2.app._viewCache.removeView(requiredView);
}

﻿/// <reference path="../js/jquery-1.9.1.min.js"; />
/// <reference path="../js/knockout-2.2.1.js"; />
/// <reference path="../js/dx.all.js"; />

(function() {
    PreflightMobile2.db = {

        sampleData: new DevExpress.data.RestStore({
            url: "/data/sampleData.json"
        })

    };
})();

﻿var pfList = {
    locList: ""
};




﻿var ReservationObject = {

    //ReservationID: 642607,
    ReservationID: 0,
    LocID: 0,
    StartDT: "",
    EndDT: "",
    StartTime: "",
    EndTime: "",
    ParkingTypeID: 0,
    ReceiptCD: "",
    ApproveDuplicate: false,
    ParkingType: "",



    FirstName: "",
    LastName: "",
    Zip: "",
    MobilePhone: "",
    Email: "",

    UseRewardsTF: "",
    CardID: 0,
    PrepaidYN: false,
    RedeemedDT: "",
    IsSaturdayStay: false,

    Weeks: 0,
    Days: 0,

    ParkingFees: 0,
    TotalCost: 0, // Total Cost of Reservation 
    AdjustedTotalCost: 0, //cost after awards
    TotalPayments: 0, // how much the user has paid so far
    NewTotalCost: 0, // Amount remaining for the user to pay -- if they've already paid a portion. 
    AirportFees: 0,
    TotalPointsUsed: 0,
    TotalPointsDiscount: 0,
    TotalParkValue: 0,
    TaxFees: 0,
    ChargeRate: "",

    LocationPriceIDs: "",
    LstRewDefIDsUsed: "",
    RewardValue: "",

    LocName: "", 
    LocAddress: "", 
    LocCity: "",
    LocState: "", 
    LocZip: "",
    LocPhone: "",
    LocEmail: "", 

    CardName: "",
    CreditCard: "",
    BillAddress: "",
    BillCity: "",
    BillZip: "",
    BillCountry: "",
    BillProvince: "",
    BillState: "",
    CardType: "",
    ExpMonth: "",
    ExpYear: "",

    WeekRewDefID: 0,
    DayRewDefID: 0,
    rewWeekQty: 0,
    rewDayQty: 0,
    ConvertingToPrePaid: false,

    AcknowledgedTF: false,

   
    AcctID: 0,
    CCType: 0,
    CCNumber: "",
    CCLastFour: "",
    CCAddr1: "",
    CCCity: "",
    CCState: "",
    CCProvince: "",
    CCZip: "",
    CCFullName: "",
    CCExpDT: "",
    CCCountry: "",
    CCUseStoredCCInfo: "",
    CreditCardStoredTF: false,

    MsgTerms: "",


    //LocationPricingIDsUsed: "",
    rewusedTF: false
};


ReservationObject.init = function () {
    console.log("init() called...");
    this.ReservationID = 0;
    this.LocID = 0;
    this.StartDT = "";
    this.EndDT = "";
    this.StartTime = "";
    this.EndTime = "";
    this.ParkingTypeID = 0;
    this.ReceiptCD = "";
    this.ApproveDuplicate = false;
    this.ParkingType = "";

    this.FirstName = "";
    this.LastName = "";
    this.Zip = "";
    this.MobilePhone = "";
    this.Email = "";

    this.UseRewardsTF = "";
    this.CardID = 0;
    this.PrepaidYN = false;
    this.RedeemedDT = "";
    this.IsSaturdayStay = false;

    this.Weeks = 0;
    this.Days = 0;

    this.ParkingFees = 0;
    this.TotalCost = 0;
    this.AdjustedTotalCost = 0;
    this.TotalPayments = 0;
    this.NewTotalCost = 0;
    this.AirportFees = 0;
    this.TotalPointsUsed = 0;
    this.TotalPointsDiscount = 0;
    this.TotalParkValue = 0;
    this.TaxFees = 0;
    this.ChargeRate = "";

    this.LocationPriceIDs = "";
    this.LstRewDefIDsUsed = "";
    this.RewardValue = "";

    this.LocName = "";
    this.LocAddress = "";
    this.LocCity = "";
    this.LocState = "";
    this.LocZip = "";
    this.LocPhone = "";
    this.LocEmail = "";

    this.CardName = "";
    this.CreditCard = "";
    this.BillAddress = "";
    this.BillCity = "";
    this.BillZip = "";
    this.BillCountry = "";
    this.BillProvince = "";
    this.BillState = "";
    this.CardType = "";
    this.ExpMonth = "";
    this.ExpYear = "";

    this.WeekRewDefID = 0;
    this.DayRewDefID = 0;
    this.rewWeekQty = 0;
    this.rewDayQty = 0;
    this.ConvertingToPrePaid = false;

    this.AcknowledgedTF = false;

    this.AcctID = 0;
    this.CCType = 0;
    this.CCNumber = "";
    this.CCLastFour = "";
    this.CCAddr1 = "";
    this.CCCity = "";
    this.CCState = "";
    this.CCProvince = "";
    this.CCZip = "";
    this.CCFullName = "";
    this.CCExpDT = "";
    this.CCCountry = "";
    this.CCUseStoredCCInfo = "";
    this.CreditCardStoredTF = false;

    this.MsgTerms = "";
    this.rewusedTF = false
    console.log("cleared:", ReservationObject);
}

//CCType: ReservationObject.CCType,
//    CCNumber: ReservationObject.CCNumber,
//CCLastFour: ReservationObject.CCLastFour,
//CCAddr1: ReservationObject.CCAddr1,
//CCCity: ReservationObject.CCCity,
//CCState: ReservationObject.CCState,
//CCProvince: ReservationObject.CCProvince,
//CCZip: ReservationObject.CCZip,
//CCFullName: ReservationObject.CCFullName,
//CCExpDT: ReservationObject.CCExpDT,
//CCCountry: ReservationObject.CCCountry,
//CCbSaveCard: ReservationObject.CCbSaveCard,
//CCUseStoredCCInfo: ReservationObject.CCUseStoredCCInfo,

﻿//pfUser object used on most pages. GJS 7/16/2013
var pfUser = {
    authToken: "",
    authTokenExpireMin: 20,
    authTokenLastUpdateDT: new Date("1/1/2000 12:01 AM"),
    returnViewName: "menuMain",
    loginTryCnt: 0,
    loadmenuMainLists: false, //needed to load the list AFTER a user logs in. but not EVERYTIME they hit the main page. 

    email: "NOT_SET",
    zip: "00000",
    homeLocID: 0,
    
    userName: window.localStorage.getItem("username"),
    userPassword: window.localStorage.getItem("pwd"),
    _allowAutoLoginTF: true,

    oResIndicator: ko.observable(0),
    oAwardIndicator: ko.observable(0),
    oPointsIndicator: ko.observable(0),
    oCardID: ko.observable(0),
    oDisplayName: ko.observable("Click 'Login' to begin."),
    oReloadDT: ko.observable(new Date()),
    oSysMsg: ko.observable(""),
    oLoginText: ko.observable("Login"),
    oGlobalErrorNum: ko.observable("0"),
    oGlobalError: ko.observable("No Errors Recorded.")
}

pfUser.storeUserInfo = function (storePwdTF) {
    window.localStorage.setItem("username", this.userName);
    if (storePwdTF) {
        window.localStorage.setItem("pwd", this.userPassword);
    } else {
        window.localStorage.removeItem("pwd");
    }
}

pfUser.clearUserInfo = function () {
    console.log("clearUserInfo() called...");
    this.setAuthToken("");
    this.authTokenLastUpdateDT = new Date("1/1/2000 12:01 AM");
    this.returnPageName = "menuMain";
    this.email = "NOT_SET";
    this.zip = "00000";
    this.homeLocID = 0;
    this.oCardID(0);
    this.oDisplayName("Click 'Login' to begin.");
    this.oLoginText("Login");
    //this.oReloadDT(new Date());
    console.log("cleared:", pfUser);
}

pfUser.isTokenStillValid = function () {
    console.log("this.authToken:", this.authToken);
    console.log("this.authToken.length", this.authToken.length);
    if (!this.authToken || this.authToken.length <= 1) {
        console.log("pfUser.isTokenStillValid() . authToken length <= 1, so token isn't valid.");
        return false;
    }
    var dtNow = new Date();
    var timeOffset = dtNow.getTime() - this.authTokenLastUpdateDT.getTime();
    var timeOffsetMin = Math.round(timeOffset / (1000 * 60));
    //console.log("pfUser.isTokenStillValid() pfUser.timeOffset:", timeOffset);
    console.log("pfUser.isTokenStillValid() pfUser.timeOffsetMin:", timeOffsetMin);
    //console.log("timeOffsetMin >= this.authTokenExpireMin", timeOffsetMin >= this.authTokenExpireMin);
    return timeOffsetMin >= this.authTokenExpireMin ? false : true;
}

pfUser.setAuthToken = function (authToken) {
    pfUser.authToken = authToken;
    pfUser.authTokenLastUpdateDT = new Date();
}

pfUser.hasUserPasswordSaved = function () {
    return pfUser.userPassword && pfUser.userPassword.length > 1 ? true : false;
}

pfUser.hasUserNameSaved = function () {
    return pfUser.userName && pfUser.userName.length > 1 ? true : false;
}

pfUser.allowAutoLogin = function () {
    console.log("pfUser. :", pfUser.hasUserNameSaved());
    console.log("pfUser.hasUserNameSaved() :", pfUser.hasUserNameSaved());
    console.log("pfUser.hasUserPasswordSaved() :", pfUser.hasUserPasswordSaved());
    console.log("pfUser._allowAutoLoginTF :", pfUser._allowAutoLoginTF);
    if (pfUser.hasUserNameSaved() && pfUser.hasUserPasswordSaved() && pfUser._allowAutoLoginTF)
        return true;
    else
        return false;
}

pfUser.apiLoginAuto = function (returnViewName) {
    if (pfUser.allowAutoLogin()) {
        console.log("apiLoginAuto called...");
        pfUser.apiLogin(pfUser.userName, pfUser.userPassword, true, returnViewName);
    } else {
        console.error("apiLoginAuto can't autologin. user or pwd is not saved. calling LoginFail so user will get sent to login page.");
        pfUser.reportLoginFail(null, returnViewName);
    }
}

pfUser.apiLogin = function (uname, pwd, savePwdTF, returnPageName) {
    pfUser._allowAutoLoginTF = true;
    pfUser.loadmenuMainLists = true;
    pfUser.returnPageName = returnPageName;
    console.log("pfUser.apiLogin() Starting...", pfUser);
    pfUser.userName = uname;
    if (savePwdTF) {
        console.log("savePwdTF", savePwdTF);
        pfUser.userPassword = pwd;
    }
    else
        pfUser.userPassword = "";

    this.storeUserInfo(savePwdTF);
    $.ajax({
        url: apiUrl + 'API/Login/login',
        data: {
            username: uname,
            password: pwd
        },
        async: false,
        type: 'POST',
        success: function (result) {
            var jResult = JSON.parse(result);
            var rslt = jResult[0];
            console.log("rslt:", rslt);
            if (rslt.access_token == "fail") {
                pfUser.loginTryCnt++;
                console.log("pfUser.apiLogin() call succeeded, but 'Fail Message' getting token. rslt: ", rslt);
                pfUser.reportLoginFail(result, 'pfUser.apiLogin success-with-fail-result.');
            }
            else {
                pfUser.loginTryCnt = 0; //reset it to zero.
                console.log("Login Successful");
                pfUser.oSysMsg('');
                pfUser.oReloadDT(new Date());
                pfUser.setAuthToken(rslt.access_token);
                pfUser.oDisplayName(rslt.DisplayName);
                pfUser.oCardID(rslt.cardID);
                pfUser.email = rslt.email;
                pfUser.zip = rslt.zip;
                pfUser.homeLocID = rslt.homeLocID;
                pfUser.oLoginText("Logout");
                console.log("displayName:", pfUser.oDisplayName());
                console.log("cardID:", pfUser.oCardID());
                console.log("zip:", pfUser.zip);
                console.log("email:", pfUser.email);
                console.log("homeLocID:", pfUser.homeLocID);
                console.log("oReloadDT:", pfUser.oReloadDT());
                console.log("pfUser.authToken:", pfUser.authToken);
                console.log("pfUser.apiLogin() success. rslt: ", rslt);
                console.log("pfUser.apiLogin() success. pfUser: ", pfUser);
                pfUser.UserPointCount();

                PreflightMobile2.app.navigate(pfUser.returnViewName);
            }
        },
        error: function (result) {
            pfUser.loginTryCnt++;
            pfUser.apiError(result, "pfUser.apiLogin", "menuMain");
        }
    });
}

// use this method to handle most api calls in the application.
pfUser.apiError = function (result, viewName, returnViewName) {
    console.error("View:" + viewName.name + ": api call FAIL, rslt: ", result);
    console.error("result.status:", result.status);
    console.error("pfUser:", pfUser);
    pfUser.returnViewName = returnViewName;
    if (result && result.status == 401) {
        pfUser.reportLoginFail(result, viewName, returnViewName);
    }
    else if (result && result.status == 500) {
        console.error("500: Error result: ", result);
        console.error("Server Error processing request. viewName=" + viewName + " status:", result.status);
        pfUser.oSysMsg('Server Error processing request. Please try again and make sure all fields are filled in. If you receive the error again, please contact technical support. View: ' + viewName + ' Error Code:' + result.status);
        pfUser.oGlobalErrorNum('result.status: ' + result.status);
        pfUser.oGlobalError('responseText: ' + result.responseText);
        PreflightMobile2.app.navigate("showError");
    }
    else {
        console.error("OTHER: Error result: ", result);
        console.error("Unable to contact the server. viewName=" + viewName + ". status:", result.status);
        pfUser.oSysMsg('Unable to contact the server. Please try later.  ' + viewName + '. status:"' + result.status);
        pfUser.oGlobalErrorNum('result.status: ' + result.status);
        pfUser.oGlobalError('responseText: ' + result.responseText);
        PreflightMobile2.app.navigate("showError");
    }
}

//Internal function to just report to the user that their credentials weren't accepted. 
pfUser.reportLoginFail = function (result, viewName, returnViewName) {
    console.log("401: Error result: ", result);
    console.log("Server Error processing request. viewName=" + viewName + " status:", result.status);
    console.log("401 - Unauthorized. incorrect uname/pwd.");
    console.log("pfUser:", ko.toJSON(pfUser));


    console.log("tryCNT", pfUser.loginTryCnt);
    if (pfUser.loginTryCnt > 0) {
        console.log("'Unable to login with the supplied username and password. Please verify they are correct.");
        pfUser.oSysMsg('Unable to login with the supplied username and password. Please verify they are correct.');
    } else if (pfUser.loginTryCnt == 0 && pfUser.allowAutoLogin()) {
        console.log("reportLoginFail: Try AutoLogin since pwd is saved.");
        pfUser.oGlobalError("reportLoginFail: Try AutoLogin since pwd is saved.");
        pfUser.oGlobalErrorNum("401");
        pfUser.apiLoginAuto(returnViewName); //try to auto login... GJS
    } else { 
        pfUser.oSysMsg(''); //First attempt, no saved pwd.
    }
    pfUser.oGlobalErrorNum('result.status: ' + result.status);
    pfUser.oGlobalError('responseText: ' + result.responseText);

    console.log("viewName: ", viewName);
    console.log("viewName: ", viewName.indexOf('pfUser'));
    if (viewName.indexOf('pfUser') != -1 || !pfUser.allowAutoLogin()) {
        console.log("redirecting to login view");
        pfUser.FailAutoLogin();
        console.log("testing: should have redirected...");

    }
}

pfUser.UserPointCount = function () {
    var deferred = new $.Deferred();
    $.ajax({
        dataType: "json",
        url: apiUrl + "API/Account/LoadAccountDets",
        headers: { 'Authorization': 'Session ' + pfUser.authToken },
        type: 'POST',
        async: false,
        success: function (result) {
            var r = result[0];
            pfUser.oPointsIndicator(r.PointsAvailable);
        },
        error: function (result) {
            pfUser.oPointsIndicator(0);
        }
    });
};

pfUser.logout = function () {
    pfUser.clearUserInfo();
    pfUser._allowAutoLoginTF = false;
    $.ajax({
        //url: apiUrl + 'API/login/ProcessLogin',
        url: apiUrl + 'API/Login/logout',
        type: 'POST',
        success: function (result) {
            var jResult = JSON.parse(result);
            var rslt = jResult[0];
            pfUser.oAwardIndicator("You have no awards at this time.");
            pfUser.oPointsIndicator(0);
            pfUser.oResIndicator("You have no reservations at this time.");
            PreflightMobile2.app.navigate("menuMain");

        },
        error: function (result) {
            textarray = result;
            console.log("pfUser:", result);
            var rslt = JSON.parse(textarray);
            console.error("pfUser.logout() FAIL rslt: ", rslt);
            console.log("pfUser:", pfUser);
        }
    });
}

pfUser.FailAutoLogin = function () {
    pfUser.oAwardIndicator("You have no awards at this time.");
    pfUser.oPointsIndicator(0);
    pfUser.oResIndicator("You have no reservations at this time.");
    PreflightMobile2.app.navigate("login");
}

// pfUser Test Cases: (GJS)
console.log("Setup pfUser", pfUser);
if (pfUser.allowAutoLogin()) {
    console.log("pfUser starting autologin...");
    pfUser.apiLoginAuto("menuMain");
    console.log("pfUser after autologin:", pfUser);
}

//setTimeout(function () {
//    pfUser.displayReLoginAlertIfNecessary();
//}, 5000);


﻿var AccountCCObject = {
    AccountCCID: "",
    AcctID: "",
    CCType: "",
    CCNumber: "",
    CCLastFour: "",
    CCAddr1: "",
    CCCity: "",
    CCState: "",
    CCZip: "",
    CCFullName: "",
    CCExpDT: "",
    CCCountry: "",
    CCUseStoredCCInfo: "New"
};

﻿var pfNewAcct = {
    //Loc fields
    ExpressPassTF: "",
    ShowFFProgTF: "",
    locID: "",


    //Account fields
    acctID: "",
    acctName: "",
    AccountNeedsUserUpdate: "",
    billAddr1: "",
    billAddr2: "",
    state: "",
    city: "",
    email: "",
    zipcode: "",
    phone1: "",
    phone2: "",
    ffProgID: "",
    ffAccountNumber: "",
    companyName: "",
    statusCD: "",
    compID: "",
    corpCD: "",
    stmtDeliveryMethod: "",
    PointsEarnedLifetime: "",
    PointsAvailable: "",
    PointsExpiring60days: "",
    corpProg: "",
    country: "",
    effectiveDate: "",

    //card fields
    cardID: "",
    cardnumber: "",
    cardType: "",
    firstname: "",
    middlename: "",
    lastname: "",
    statusCD: "",
    password: "",
    encryptedpassword: "",
    AuthQuestionID: "",
    AuthQuestionAnswer: "",
    barcodeOnlyTF: false
};


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

(function(){function o(a,b,c){a.isValidating(!0);b.validator(a(),c.params||!0,function(e){var d=!1,i="";if(a.__valid__()&&(e.message?(d=e.isValid,i=e.message):d=e,!d))a.error=ko.validation.formatMessage(i||c.message||b.message,c.params),a.__valid__(d);a.isValidating(!1)})}if(void 0===typeof ko)throw"Knockout is required, please ensure it is loaded before loading this validation plug-in";var j={registerExtenders:!0,messagesOnModified:!0,messageTemplate:null,insertMessages:!0,parseInputAttributes:!1,
writeInputAttributes:!1,decorateElement:!1,errorClass:null,errorElementClass:"validationElement",errorMessageClass:"validationMessage",grouping:{deep:!1,observable:!0}},f=ko.utils.extend({},j),k=["required","pattern","min","max","step"],d,l=(new Date).getTime(),m={};d={isArray:function(a){return a.isArray||"[object Array]"===Object.prototype.toString.call(a)},isObject:function(a){return null!==a&&"object"===typeof a},values:function(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(a[c]);return b},
getValue:function(a){return"function"===typeof a?a():a},hasAttribute:function(a,b){return null!==a.getAttribute(b)},isValidatable:function(a){return a.rules&&a.isValid&&a.isModified},insertAfter:function(a,b){a.parentNode.insertBefore(b,a.nextSibling)},newId:function(){return l+=1},getConfigOptions:function(a){return d.contextFor(a)||f},setDomData:function(a,b){var c=a.__ko_validation__;c||(a.__ko_validation__=c=d.newId());m[c]=b},getDomData:function(a){a=a.__ko_validation__;return!a?void 0:m[a]},
contextFor:function(a){switch(a.nodeType){case 1:case 8:var b=d.getDomData(a);if(b)return b;if(a.parentNode)return d.contextFor(a.parentNode)}},isEmptyVal:function(a){if(void 0===a||null===a||""===a)return!0}};var n=0;ko.validation={utils:d,init:function(a,b){if(!(0<n)||b)a=a||{},a.errorElementClass=a.errorElementClass||a.errorClass||f.errorElementClass,a.errorMessageClass=a.errorMessageClass||a.errorClass||f.errorMessageClass,ko.utils.extend(f,a),f.registerExtenders&&ko.validation.registerExtenders(),
n=1},configure:function(a){ko.validation.init(a)},reset:function(){f=$.extend(f,j)},group:function(a,b){var b=ko.utils.extend(f.grouping,b),c=ko.observableArray([]),e=null,g=function h(a,e){var g=[],f=ko.utils.unwrapObservable(a),e=void 0!==e?e:b.deep?1:-1;ko.isObservable(a)&&(a.isValid||a.extend({validatable:!0}),c.push(a));f&&(d.isArray(f)?g=f:d.isObject(f)&&(g=d.values(f)));0!==e&&ko.utils.arrayForEach(g,function(a){a&&!a.nodeType&&h(a,e+1)})};b.observable?(g(a),e=ko.computed(function(){var a=
[];ko.utils.arrayForEach(c(),function(b){b.isValid()||a.push(b.error)});return a})):e=function(){var b=[];c([]);g(a);ko.utils.arrayForEach(c(),function(a){a.isValid()||b.push(a.error)});return b};e.showAllMessages=function(a){a==void 0&&(a=true);e();ko.utils.arrayForEach(c(),function(b){b.isModified(a)})};a.errors=e;a.isValid=function(){return a.errors().length===0};a.isAnyMessageShown=function(){var a=false;e();ko.utils.arrayForEach(c(),function(b){!b.isValid()&&b.isModified()&&(a=true)});return a};
return e},formatMessage:function(a,b){return a.replace(/\{0\}/gi,b)},addRule:function(a,b){a.extend({validatable:!0});a.rules.push(b);return a},addAnonymousRule:function(a,b){var c=d.newId();void 0===b.message&&(rulesObj.message="Error");ko.validation.rules[c]=b;ko.validation.addRule(a,{rule:c,params:b.params})},addExtender:function(a){ko.extenders[a]=function(b,c){return c.message||c.onlyIf?ko.validation.addRule(b,{rule:a,message:c.message,params:d.isEmptyVal(c.params)?!0:c.params,condition:c.onlyIf}):
ko.validation.addRule(b,{rule:a,params:c})}},registerExtenders:function(){if(f.registerExtenders)for(var a in ko.validation.rules)ko.validation.rules.hasOwnProperty(a)&&(ko.extenders[a]||ko.validation.addExtender(a))},insertValidationMessage:function(a){var b=document.createElement("SPAN");b.className=d.getConfigOptions(a).errorMessageClass;d.insertAfter(a,b);return b},parseInputValidationAttributes:function(a,b){ko.utils.arrayForEach(k,function(c){d.hasAttribute(a,c)&&ko.validation.addRule(b(),{rule:c,
params:a.getAttribute(c)||!0})})},writeInputValidationAttributes:function(a,b){var c=b();if(c&&c.rules){var e=c.rules();ko.utils.arrayForEach(k,function(b){var c,d=ko.utils.arrayFirst(e,function(a){return a.rule.toLowerCase()===b.toLowerCase()});d&&(c=d.params,"pattern"==d.rule&&d.params instanceof RegExp&&(c=d.params.source),a.setAttribute(b,c))});e=null}}};ko.validation.rules={};ko.validation.rules.required={validator:function(a,b){var c=/^\s+|\s+$/g,e;if(void 0===a||null===a)return!b;e=a;"string"==
typeof a&&(e=a.replace(c,""));return b&&0<(e+"").length},message:"This field is required."};ko.validation.rules.min={validator:function(a,b){return d.isEmptyVal(a)||a>=b},message:"Please enter a value greater than or equal to {0}."};ko.validation.rules.max={validator:function(a,b){return d.isEmptyVal(a)||a<=b},message:"Please enter a value less than or equal to {0}."};ko.validation.rules.minLength={validator:function(a,b){return d.isEmptyVal(a)||a.length>=b},message:"Please enter at least {0} characters."};
ko.validation.rules.maxLength={validator:function(a,b){return d.isEmptyVal(a)||a.length<=b},message:"Please enter no more than {0} characters."};ko.validation.rules.pattern={validator:function(a,b){return d.isEmptyVal(a)||null!=a.match(b)},message:"Please check this value."};ko.validation.rules.step={validator:function(a,b){return d.isEmptyVal(a)||0===100*a%(100*b)},message:"The value must increment by {0}"};ko.validation.rules.email={validator:function(a,b){return d.isEmptyVal(a)||b&&/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a)},
message:"Please enter a proper email address"};ko.validation.rules.date={validator:function(a,b){return d.isEmptyVal(a)||b&&!/Invalid|NaN/.test(new Date(a))},message:"Please enter a proper date"};ko.validation.rules.dateISO={validator:function(a,b){return d.isEmptyVal(a)||b&&/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a)},message:"Please enter a proper date"};ko.validation.rules.number={validator:function(a,b){return d.isEmptyVal(a)||b&&/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a)},message:"Please enter a number"};
ko.validation.rules.digit={validator:function(a,b){return d.isEmptyVal(a)||b&&/^\d+$/.test(a)},message:"Please enter a digit"};ko.validation.rules.phoneUS={validator:function(a,b){if("string"!==typeof a)return!1;if(d.isEmptyVal(a))return!0;a=a.replace(/\s+/g,"");return b&&9<a.length&&a.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/)},message:"Please specify a valid phone number"};ko.validation.rules.equal={validator:function(a,b){return a===d.getValue(b)},message:"Values must equal"};
ko.validation.rules.notEqual={validator:function(a,b){return a!==d.getValue(b)},message:"Please choose another value."};ko.validation.rules.unique={validator:function(a,b){var c=d.getValue(b.collection),e=d.getValue(b.externalValue),g=0;if(!a||!c)return!0;ko.utils.arrayFilter(ko.utils.unwrapObservable(c),function(c){a===(b.valueAccessor?b.valueAccessor(c):c)&&g++});return g<(void 0!==e&&a!==e?1:2)},message:"Please make sure the value is unique."};ko.validation.registerExtenders();ko.bindingHandlers.validationCore=
{init:function(a,b){var c=d.getConfigOptions(a);if(c.parseInputAttributes){var e=function(){ko.validation.parseInputValidationAttributes(a,b)};window.setImmediate?window.setImmediate(e):window.setTimeout(e,0)}c.insertMessages&&d.isValidatable(b())&&(e=ko.validation.insertValidationMessage(a),c.messageTemplate?ko.renderTemplate(c.messageTemplate,{field:b()},null,e,"replaceNode"):ko.applyBindingsToNode(e,{validationMessage:b()}));c.writeInputAttributes&&d.isValidatable(b())&&ko.validation.writeInputValidationAttributes(a,
b);c.decorateElement&&d.isValidatable(b())&&ko.applyBindingsToNode(a,{validationElement:b()})},update:function(){}};var p=ko.bindingHandlers.value.init;ko.bindingHandlers.value.init=function(a,b,c,e,d){p(a,b,c);return ko.bindingHandlers.validationCore.init(a,b,c,e,d)};ko.bindingHandlers.validationMessage={update:function(a,b){var c=b(),e=d.getConfigOptions(a);ko.utils.unwrapObservable(c);var g=!1,f=!1;c.extend({validatable:!0});g=c.isModified();f=c.isValid();ko.bindingHandlers.text.update(a,function(){return!e.messagesOnModified||
g?f?null:c.error:null});ko.bindingHandlers.visible.update(a,function(){return g?!f:!1})}};ko.bindingHandlers.validationElement={update:function(a,b){var c=b(),e=d.getConfigOptions(a);ko.utils.unwrapObservable(c);var g=!1,f=!1;c.extend({validatable:!0});g=c.isModified();f=c.isValid();ko.bindingHandlers.css.update(a,function(){var a={},b=g?!f:!1;e.decorateElement||(b=!1);a[e.errorElementClass]=b;return a})}};ko.bindingHandlers.validationOptions={init:function(a,b){var c=ko.utils.unwrapObservable(b());
if(c){var e=ko.utils.extend({},f);ko.utils.extend(e,c);d.setDomData(a,e)}}};ko.extenders.validation=function(a,b){ko.utils.arrayForEach(d.isArray(b)?b:[b],function(b){ko.validation.addAnonymousRule(a,b)});return a};ko.extenders.validatable=function(a,b){if(b&&!d.isValidatable(a)){a.error=null;a.rules=ko.observableArray();a.isValidating=ko.observable(!1);a.__valid__=ko.observable(!0);a.isModified=ko.observable(!1);var c=ko.computed(function(){a();a.rules();ko.validation.validateObservable(a);return!0});
a.isValid=ko.computed(function(){return a.__valid__()});var e=a.subscribe(function(){a.isModified(!0)});a._disposeValidation=function(){a.isValid.dispose();a.rules.removeAll();a.isModified._subscriptions.change=[];a.isValidating._subscriptions.change=[];a.__valid__._subscriptions.change=[];e.dispose();c.dispose();delete a.rules;delete a.error;delete a.isValid;delete a.isValidating;delete a.__valid__;delete a.isModified}}else!1===b&&d.isValidatable(a)&&a._disposeValidation&&a._disposeValidation();
return a};ko.validation.validateObservable=function(a){for(var b=0,c,e,d=a.rules(),f=d.length;b<f;b++)if(e=d[b],!e.condition||e.condition())if(c=ko.validation.rules[e.rule],c.async||e.async)o(a,c,e);else{var h;h=a;c.validator(h(),void 0===e.params?!0:e.params)?h=!0:(h.error=ko.validation.formatMessage(e.message||c.message,e.params),h.__valid__(!1),h=!1);if(!h)return!1}a.error=null;a.__valid__(!0);return!0};ko.validatedObservable=function(a){if(!ko.validation.utils.isObject(a))return ko.observable(a).extend({validatable:!0});
var b=ko.observable(a);b.errors=ko.validation.group(a);b.isValid=ko.computed(function(){return 0===b.errors().length});return b};ko.validation.localize=function(a){for(var b in a)ko.validation.rules.hasOwnProperty(b)&&(ko.validation.rules[b].message=a[b])};ko.applyBindingsWithValidation=function(a,b,c){var e=arguments.length,d,f;2<e?(d=b,f=c):2>e?d=document.body:arguments[1].nodeType?d=b:f=arguments[1];ko.validation.init();f&&ko.validation.utils.setDomData(d,f);ko.applyBindings(a,b)};var q=ko.applyBindings;
ko.applyBindings=function(a,b){ko.validation.init();q(a,b)}})();

(function(r){r.fn.qrcode=function(h){var s;function u(a){this.mode=s;this.data=a}function o(a,c){this.typeNumber=a;this.errorCorrectLevel=c;this.modules=null;this.moduleCount=0;this.dataCache=null;this.dataList=[]}function q(a,c){if(void 0==a.length)throw Error(a.length+"/"+c);for(var d=0;d<a.length&&0==a[d];)d++;this.num=Array(a.length-d+c);for(var b=0;b<a.length-d;b++)this.num[b]=a[b+d]}function p(a,c){this.totalCount=a;this.dataCount=c}function t(){this.buffer=[];this.length=0}u.prototype={getLength:function(){return this.data.length},
write:function(a){for(var c=0;c<this.data.length;c++)a.put(this.data.charCodeAt(c),8)}};o.prototype={addData:function(a){this.dataList.push(new u(a));this.dataCache=null},isDark:function(a,c){if(0>a||this.moduleCount<=a||0>c||this.moduleCount<=c)throw Error(a+","+c);return this.modules[a][c]},getModuleCount:function(){return this.moduleCount},make:function(){if(1>this.typeNumber){for(var a=1,a=1;40>a;a++){for(var c=p.getRSBlocks(a,this.errorCorrectLevel),d=new t,b=0,e=0;e<c.length;e++)b+=c[e].dataCount;
for(e=0;e<this.dataList.length;e++)c=this.dataList[e],d.put(c.mode,4),d.put(c.getLength(),j.getLengthInBits(c.mode,a)),c.write(d);if(d.getLengthInBits()<=8*b)break}this.typeNumber=a}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17;this.modules=Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=Array(this.moduleCount);for(var b=0;b<this.moduleCount;b++)this.modules[d][b]=null}this.setupPositionProbePattern(0,0);this.setupPositionProbePattern(this.moduleCount-
7,0);this.setupPositionProbePattern(0,this.moduleCount-7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(a,c);7<=this.typeNumber&&this.setupTypeNumber(a);null==this.dataCache&&(this.dataCache=o.createData(this.typeNumber,this.errorCorrectLevel,this.dataList));this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,c){for(var d=-1;7>=d;d++)if(!(-1>=a+d||this.moduleCount<=a+d))for(var b=-1;7>=b;b++)-1>=c+b||this.moduleCount<=c+b||(this.modules[a+d][c+b]=
0<=d&&6>=d&&(0==b||6==b)||0<=b&&6>=b&&(0==d||6==d)||2<=d&&4>=d&&2<=b&&4>=b?!0:!1)},getBestMaskPattern:function(){for(var a=0,c=0,d=0;8>d;d++){this.makeImpl(!0,d);var b=j.getLostPoint(this);if(0==d||a>b)a=b,c=d}return c},createMovieClip:function(a,c,d){a=a.createEmptyMovieClip(c,d);this.make();for(c=0;c<this.modules.length;c++)for(var d=1*c,b=0;b<this.modules[c].length;b++){var e=1*b;this.modules[c][b]&&(a.beginFill(0,100),a.moveTo(e,d),a.lineTo(e+1,d),a.lineTo(e+1,d+1),a.lineTo(e,d+1),a.endFill())}return a},
setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(a=8;a<this.moduleCount-8;a++)null==this.modules[6][a]&&(this.modules[6][a]=0==a%2)},setupPositionAdjustPattern:function(){for(var a=j.getPatternPosition(this.typeNumber),c=0;c<a.length;c++)for(var d=0;d<a.length;d++){var b=a[c],e=a[d];if(null==this.modules[b][e])for(var f=-2;2>=f;f++)for(var i=-2;2>=i;i++)this.modules[b+f][e+i]=-2==f||2==f||-2==i||2==i||0==f&&0==i?!0:!1}},setupTypeNumber:function(a){for(var c=
j.getBCHTypeNumber(this.typeNumber),d=0;18>d;d++){var b=!a&&1==(c>>d&1);this.modules[Math.floor(d/3)][d%3+this.moduleCount-8-3]=b}for(d=0;18>d;d++)b=!a&&1==(c>>d&1),this.modules[d%3+this.moduleCount-8-3][Math.floor(d/3)]=b},setupTypeInfo:function(a,c){for(var d=j.getBCHTypeInfo(this.errorCorrectLevel<<3|c),b=0;15>b;b++){var e=!a&&1==(d>>b&1);6>b?this.modules[b][8]=e:8>b?this.modules[b+1][8]=e:this.modules[this.moduleCount-15+b][8]=e}for(b=0;15>b;b++)e=!a&&1==(d>>b&1),8>b?this.modules[8][this.moduleCount-
b-1]=e:9>b?this.modules[8][15-b-1+1]=e:this.modules[8][15-b-1]=e;this.modules[this.moduleCount-8][8]=!a},mapData:function(a,c){for(var d=-1,b=this.moduleCount-1,e=7,f=0,i=this.moduleCount-1;0<i;i-=2)for(6==i&&i--;;){for(var g=0;2>g;g++)if(null==this.modules[b][i-g]){var n=!1;f<a.length&&(n=1==(a[f]>>>e&1));j.getMask(c,b,i-g)&&(n=!n);this.modules[b][i-g]=n;e--; -1==e&&(f++,e=7)}b+=d;if(0>b||this.moduleCount<=b){b-=d;d=-d;break}}}};o.PAD0=236;o.PAD1=17;o.createData=function(a,c,d){for(var c=p.getRSBlocks(a,
c),b=new t,e=0;e<d.length;e++){var f=d[e];b.put(f.mode,4);b.put(f.getLength(),j.getLengthInBits(f.mode,a));f.write(b)}for(e=a=0;e<c.length;e++)a+=c[e].dataCount;if(b.getLengthInBits()>8*a)throw Error("code length overflow. ("+b.getLengthInBits()+">"+8*a+")");for(b.getLengthInBits()+4<=8*a&&b.put(0,4);0!=b.getLengthInBits()%8;)b.putBit(!1);for(;!(b.getLengthInBits()>=8*a);){b.put(o.PAD0,8);if(b.getLengthInBits()>=8*a)break;b.put(o.PAD1,8)}return o.createBytes(b,c)};o.createBytes=function(a,c){for(var d=
0,b=0,e=0,f=Array(c.length),i=Array(c.length),g=0;g<c.length;g++){var n=c[g].dataCount,h=c[g].totalCount-n,b=Math.max(b,n),e=Math.max(e,h);f[g]=Array(n);for(var k=0;k<f[g].length;k++)f[g][k]=255&a.buffer[k+d];d+=n;k=j.getErrorCorrectPolynomial(h);n=(new q(f[g],k.getLength()-1)).mod(k);i[g]=Array(k.getLength()-1);for(k=0;k<i[g].length;k++)h=k+n.getLength()-i[g].length,i[g][k]=0<=h?n.get(h):0}for(k=g=0;k<c.length;k++)g+=c[k].totalCount;d=Array(g);for(k=n=0;k<b;k++)for(g=0;g<c.length;g++)k<f[g].length&&
(d[n++]=f[g][k]);for(k=0;k<e;k++)for(g=0;g<c.length;g++)k<i[g].length&&(d[n++]=i[g][k]);return d};s=4;for(var j={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,
78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var c=a<<10;0<=j.getBCHDigit(c)-j.getBCHDigit(j.G15);)c^=j.G15<<j.getBCHDigit(c)-j.getBCHDigit(j.G15);return(a<<10|c)^j.G15_MASK},getBCHTypeNumber:function(a){for(var c=a<<12;0<=j.getBCHDigit(c)-
j.getBCHDigit(j.G18);)c^=j.G18<<j.getBCHDigit(c)-j.getBCHDigit(j.G18);return a<<12|c},getBCHDigit:function(a){for(var c=0;0!=a;)c++,a>>>=1;return c},getPatternPosition:function(a){return j.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,c,d){switch(a){case 0:return 0==(c+d)%2;case 1:return 0==c%2;case 2:return 0==d%3;case 3:return 0==(c+d)%3;case 4:return 0==(Math.floor(c/2)+Math.floor(d/3))%2;case 5:return 0==c*d%2+c*d%3;case 6:return 0==(c*d%2+c*d%3)%2;case 7:return 0==(c*d%3+(c+d)%2)%2;default:throw Error("bad maskPattern:"+
a);}},getErrorCorrectPolynomial:function(a){for(var c=new q([1],0),d=0;d<a;d++)c=c.multiply(new q([1,l.gexp(d)],0));return c},getLengthInBits:function(a,c){if(1<=c&&10>c)switch(a){case 1:return 10;case 2:return 9;case s:return 8;case 8:return 8;default:throw Error("mode:"+a);}else if(27>c)switch(a){case 1:return 12;case 2:return 11;case s:return 16;case 8:return 10;default:throw Error("mode:"+a);}else if(41>c)switch(a){case 1:return 14;case 2:return 13;case s:return 16;case 8:return 12;default:throw Error("mode:"+
a);}else throw Error("type:"+c);},getLostPoint:function(a){for(var c=a.getModuleCount(),d=0,b=0;b<c;b++)for(var e=0;e<c;e++){for(var f=0,i=a.isDark(b,e),g=-1;1>=g;g++)if(!(0>b+g||c<=b+g))for(var h=-1;1>=h;h++)0>e+h||c<=e+h||0==g&&0==h||i==a.isDark(b+g,e+h)&&f++;5<f&&(d+=3+f-5)}for(b=0;b<c-1;b++)for(e=0;e<c-1;e++)if(f=0,a.isDark(b,e)&&f++,a.isDark(b+1,e)&&f++,a.isDark(b,e+1)&&f++,a.isDark(b+1,e+1)&&f++,0==f||4==f)d+=3;for(b=0;b<c;b++)for(e=0;e<c-6;e++)a.isDark(b,e)&&!a.isDark(b,e+1)&&a.isDark(b,e+
2)&&a.isDark(b,e+3)&&a.isDark(b,e+4)&&!a.isDark(b,e+5)&&a.isDark(b,e+6)&&(d+=40);for(e=0;e<c;e++)for(b=0;b<c-6;b++)a.isDark(b,e)&&!a.isDark(b+1,e)&&a.isDark(b+2,e)&&a.isDark(b+3,e)&&a.isDark(b+4,e)&&!a.isDark(b+5,e)&&a.isDark(b+6,e)&&(d+=40);for(e=f=0;e<c;e++)for(b=0;b<c;b++)a.isDark(b,e)&&f++;a=Math.abs(100*f/c/c-50)/5;return d+10*a}},l={glog:function(a){if(1>a)throw Error("glog("+a+")");return l.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;256<=a;)a-=255;return l.EXP_TABLE[a]},EXP_TABLE:Array(256),
LOG_TABLE:Array(256)},m=0;8>m;m++)l.EXP_TABLE[m]=1<<m;for(m=8;256>m;m++)l.EXP_TABLE[m]=l.EXP_TABLE[m-4]^l.EXP_TABLE[m-5]^l.EXP_TABLE[m-6]^l.EXP_TABLE[m-8];for(m=0;255>m;m++)l.LOG_TABLE[l.EXP_TABLE[m]]=m;q.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var c=Array(this.getLength()+a.getLength()-1),d=0;d<this.getLength();d++)for(var b=0;b<a.getLength();b++)c[d+b]^=l.gexp(l.glog(this.get(d))+l.glog(a.get(b)));return new q(c,0)},mod:function(a){if(0>
this.getLength()-a.getLength())return this;for(var c=l.glog(this.get(0))-l.glog(a.get(0)),d=Array(this.getLength()),b=0;b<this.getLength();b++)d[b]=this.get(b);for(b=0;b<a.getLength();b++)d[b]^=l.gexp(l.glog(a.get(b))+c);return(new q(d,0)).mod(a)}};p.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],
[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,
116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,
43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,
3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,
55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,
45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];p.getRSBlocks=function(a,c){var d=p.getRsBlockTable(a,c);if(void 0==d)throw Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+c);for(var b=d.length/3,e=[],f=0;f<b;f++)for(var h=d[3*f+0],g=d[3*f+1],j=d[3*f+2],l=0;l<h;l++)e.push(new p(g,j));return e};p.getRsBlockTable=function(a,c){switch(c){case 1:return p.RS_BLOCK_TABLE[4*(a-1)+0];case 0:return p.RS_BLOCK_TABLE[4*(a-1)+1];case 3:return p.RS_BLOCK_TABLE[4*
(a-1)+2];case 2:return p.RS_BLOCK_TABLE[4*(a-1)+3]}};t.prototype={get:function(a){return 1==(this.buffer[Math.floor(a/8)]>>>7-a%8&1)},put:function(a,c){for(var d=0;d<c;d++)this.putBit(1==(a>>>c-d-1&1))},getLengthInBits:function(){return this.length},putBit:function(a){var c=Math.floor(this.length/8);this.buffer.length<=c&&this.buffer.push(0);a&&(this.buffer[c]|=128>>>this.length%8);this.length++}};"string"===typeof h&&(h={text:h});h=r.extend({},{render:"canvas",width:256,height:256,typeNumber:-1,
correctLevel:2,background:"#ffffff",foreground:"#000000"},h);return this.each(function(){var a;if("canvas"==h.render){a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();var c=document.createElement("canvas");c.width=h.width;c.height=h.height;for(var d=c.getContext("2d"),b=h.width/a.getModuleCount(),e=h.height/a.getModuleCount(),f=0;f<a.getModuleCount();f++)for(var i=0;i<a.getModuleCount();i++){d.fillStyle=a.isDark(f,i)?h.foreground:h.background;var g=Math.ceil((i+1)*b)-Math.floor(i*b),
j=Math.ceil((f+1)*b)-Math.floor(f*b);d.fillRect(Math.round(i*b),Math.round(f*e),g,j)}}else{a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();c=r("<table></table>").css("width",h.width+"px").css("height",h.height+"px").css("border","0px").css("border-collapse","collapse").css("background-color",h.background);d=h.width/a.getModuleCount();b=h.height/a.getModuleCount();for(e=0;e<a.getModuleCount();e++){f=r("<tr></tr>").css("height",b+"px").appendTo(c);for(i=0;i<a.getModuleCount();i++)r("<td></td>").css("width",
d+"px").css("background-color",a.isDark(e,i)?h.foreground:h.background).appendTo(f)}}a=c;jQuery(a).appendTo(this)})}})(jQuery);


(function( $ ){
	$.fn.qrcode = function(options) {
		// if options is string, 
		if( typeof options === 'string' ){
			options	= { text: options };
		}

		// set default values
		// typeNumber < 1 for automatic calculation
		options	= $.extend( {}, {
			render		: "canvas",
			width		: 256,
			height		: 256,
			typeNumber	: -1,
			correctLevel	: QRErrorCorrectLevel.H,
                        background      : "#ffffff",
                        foreground      : "#000000"
		}, options);

		var createCanvas	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();

			// create canvas element
			var canvas	= document.createElement('canvas');
			canvas.width	= options.width;
			canvas.height	= options.height;
			var ctx		= canvas.getContext('2d');

			// compute tileW/tileH based on options.width/options.height
			var tileW	= options.width  / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// draw in the canvas
			for( var row = 0; row < qrcode.getModuleCount(); row++ ){
				for( var col = 0; col < qrcode.getModuleCount(); col++ ){
					ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
					var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
					var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
					ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);  
				}	
			}
			// return just built canvas
			return canvas;
		}

		// from Jon-Carlos Rivera (https://github.com/imbcmdth)
		var createTable	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();
			
			// create table element
			var $table	= $('<table></table>')
				.css("width", options.width+"px")
				.css("height", options.height+"px")
				.css("border", "0px")
				.css("border-collapse", "collapse")
				.css('background-color', options.background);
		  
			// compute tileS percentage
			var tileW	= options.width / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// draw in the table
			for(var row = 0; row < qrcode.getModuleCount(); row++ ){
				var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table);
				
				for(var col = 0; col < qrcode.getModuleCount(); col++ ){
					$('<td></td>')
						.css('width', tileW+"px")
						.css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background)
						.appendTo($row);
				}	
			}
			// return just built canvas
			return $table;
		}
  

		return this.each(function(){
			var element	= options.render == "canvas" ? createCanvas() : createTable();
			$(element).appendTo(this);
		});
	};
})( jQuery );


﻿PreflightMobile2.RedeemedAwardList = function (params) {
    var viewModel = {
        firstViewTF: true,
        awardList: {
            changed: new $.Callbacks(),
            load: function (loadOptions) {
                if (loadOptions.refresh) {
                    var textarray = "";
                    var deferred = new $.Deferred();
                    $
                        .ajax({
                            dataType: "json",
                            url: apiUrl + "API/Award/RedeemedAwardsList",
                            headers: { 'Authorization': 'Session ' + pfUser.authToken },
                            type: 'POST',
                            async: false,
                            success: function (result) {
                                textarray = result;
                            },
                            error: function (result) {
                                pfUser.apiError(result, "RedeemedAwardList", "RedeemedAwardList");
                            }
                        });
                    return textarray;
                }
            }
        }
    };
    viewModel.viewShown = function () {
        setNavBar(false); //Show NavBar.
        (viewModel.firstViewTF == true) ? viewModel.firstViewTF = false : viewModel.awardList.changed.fire(); // Refresh Data repeat visits. (first time is automatic.)
    }
    return viewModel;
};

﻿PreflightMobile2.MenuAward = function (params) {

    var viewModel = {
        mainMenu: [
                {
                    text: "MY AWARDS",
                    iconScr: "images/menuAccount/icon-general.png",
                    action: {
                        view: "RedeemedAwardList"
                    }
                },
               {
                   text: "AWARD STORE",
                   iconScr: "images/menuAccount/icon-awards.png",
                   action: {
                       view: "AwardStore"
                   }
               },

                {
                    text: "TRANSACTION HISTORY",
                    iconScr: "images/menuAccount/icon-history.png",
                    action: {
                        view: "pointTranHist"
                    }
                }
        ],
        viewShown: function () { setNavBar(false); }, //Show NavBar.
    };

    return viewModel;
};

﻿PreflightMobile2.AwardStore = function (params) {

    var viewModel = {        
        //*** Error list displays the server validation errors at the top of the list/or view***
        errorList: ko.observableArray(),
        viewShown: function () {      
            setNavBar(false);
            (viewModel.firstViewTF == true) ? viewModel.firstViewTF = false :  viewModel.selectedLoc(pfUser.homeLocID); // Refresh Data repeat visits. (first time is automatic.)
        },
        //UserLocation
        selectedLoc: ko.observable(pfUser.homeLocID),
        //
        PointsEarnedLifetime: ko.observable(),
        PointsExpiring60days: ko.observable(),
        PointsAvailable: ko.observable()

    };


    //Custom mapping of values - for easy on screen calcuation and updaditng. 
    var awardDef = function (rewDefID, RewDefType, RedeemedLocationID, AwardName, Points, RewardText1, RewardText2, IconURL, FFNoAccountMsgVisibleTF, AwardDescrVisibleTF, AwardUnit, AwardDescr) {
        this.rewDefID = ko.observable(rewDefID);
        this.RewDefType = ko.observable(RewDefType);
        this.RedeemedLocationID = ko.observable(viewModel.selectedLoc());
        this.AwardName = ko.observable(AwardName);
        this.quantity = ko.observable();
        this.Points = ko.observable(Points);
        this.RewardText1 = ko.observable(RewardText1);
        this.RewardText2 = ko.observable(RewardText2);
        this.IconURL = ko.observable(IconURL);
        this.FFNoAccountMsgVisibleTF = ko.observable(FFNoAccountMsgVisibleTF);
        this.AwardDescrVisibleTF = ko.observable(AwardDescrVisibleTF);
        this.AwardUnit = ko.observable(AwardUnit);
        this.AwardDescr = ko.observable(AwardDescr);
        this.pointTotal = ko.computed(function () {
            if (!isNaN(this.quantity())) {
                return (this.Points() * this.quantity()).toFixed(2);
            }
            else {
                return 0;
            }
        },
       this);
    };

    //list of awards from server.
    viewModel.awardList = ko.computed(function () {
        var ll = "";
        var deferred = new $.Deferred();
        $
            .ajax({
                dataType: "json",
                url: apiUrl + "API/Award/AwardsByLocation",
                headers: { 'Authorization': 'Session ' + pfUser.authToken },
                data: {
                    LocID: viewModel.selectedLoc()
                },
                type: 'POST',
                async: false,
                success: function (result) {
                    ll = result;
                }, error: function (result) {
                    pfUser.apiError(result, "AwardStore", "AwardStore");
                }
            });
        pfList.locList = ll;
        return ll;
    });

    //Load account Data
    locData = ko.computed(function () {
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/Account/LoadAccountDets",
            headers: { 'Authorization': 'Session ' + pfUser.authToken },
            type: 'POST',
            async: false,
            success: function (result) {
                var r = result[0];
                viewModel.PointsAvailable(r.PointsAvailable);
                viewModel.PointsEarnedLifetime(r.PointsEarnedLifetime);
                viewModel.PointsExpiring60days(r.PointsExpiring60days);
            },error: function (result) {
                pfUser.apiError(result, "AwardStore", "AwardStore");
            }
        });
    });

    //mappig server data to the awardDef funciton
    viewModel.mappedData = ko.computed(function () {
        return ko.utils.arrayMap(viewModel.awardList(), function (item) {
            return new awardDef(item.RewDefID, item.RewDefType, item.RedeemedLocationID, item.AwardName, item.Points, item.RewardText1, item.RewardText2, item.IconUrl, item.FFNoAccountMsgVisibleTF, item.AwardDescrVisibleTF, item.AwardUnit, item.AwardDescr);
        });
    });

    //filter out any rows that do not have 
    viewModel.saveRows = ko.computed(function () {
        return ko.utils.arrayFilter(viewModel.mappedData(), function (r) { return r.quantity() > 0; });
    });

    //load location list
    viewModel.locationList = ko.computed(function () {        
        var ll = "";
        var deferred = new $.Deferred();
        $
            .ajax({
                dataType: "json",
                url: apiUrl + "API/Home/locationLookupList",
                type: 'POST',
                async: false,
                success: function (result) {
                    ll = result;
                },
                error: function (result) {
                    pfUser.apiError(result, "acct_Info", "accountMenu");
                }
            });

        return ll;
    });

    //Total of all awards
    viewModel.totalCost = ko.computed(function () {
        var total = 0;
        ko.utils.arrayForEach(viewModel.mappedData(), function (item) {
            var value = parseFloat(item.pointTotal());
            if (!isNaN(value)) {
                total += value;
            }
        });
        return total.toFixed(2);
    }, this);

    //send to the server and save. 
    viewModel.btRedeem = function () {
        if (parseInt(viewModel.totalCost()) > 0) {
            if (parseInt(viewModel.PointsAvailable()) < parseInt(viewModel.totalCost())) {
                //alert("No action was taken.\n The awards you wish to redeem cost " + viewModel.totalCost() + " points and you only have " + viewModel.PointsAvailable() + " points.", "Alert!");
                DevExpress.ui.dialog.alert("No action was taken.\n The awards you wish to redeem cost " + viewModel.totalCost() + " points and you only have " + viewModel.PointsAvailable() + " points.", "Alert!");
            }
            else {
                // if (confirm("Redeeming points for parking? We suggest that you stop and use the Prepaid Reservation function where you can use points towards a reservation.\n\nYou are about to redeem " + viewModel.totalCost() + " points.")) { alert("TODO: Wireup submit"); } else { PFMobile_1.app.navigate("#Reservation") };

                this.errorList.removeAll();
                var deferred = new $.Deferred();
                $.ajax({
                    dataType: "json",
                    url: apiUrl + "API/Award/createAward",
                    headers: { 'Authorization': 'Session ' + pfUser.authToken },
                    data: {
                        jstring: ko.toJSON(viewModel.saveRows())
                    },
                    type: 'POST',
                    async: false,
                    success: function (result) {
                        //checking if the reply from the server is True or False - if its false bind the error list to show the server validation.
                        var r = result[0];
                        if (!r.Success) {
                            console.error("Error from Award/createAward r:", r);
                            //viewModel.errorList(r);
                            viewModel.errorList.push({ "errorMessage": "Oops! We were unable to process your award. " + 
                                "It could be that too much time has passed since you loaded this page. " +
                                "Please refresh the page and try again."
                            });
                            //viewModel.toastMessage("There was an issue saving your data");
                            //var toast = $("#toast-success").data("dxToast");
                            //toast.show();
                        }
                        else {
                            pfUser.loadmenuMainLists = true;
                            var dialogOptions = {
                                title: 'Award Store',
                                message: 'Your Award has been created!',
                                buttons: [
                                    {
                                        text: 'OK',
                                        clickAction: function () {
                                            RemoveViewFromCache("AwardStore");
                                            PreflightMobile2.app.navigate("RedeemedAwardList");
                                        }
                                    }
                                ]
                            };
                            //alert('Your card infromation has been updated.');
                            var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
                            cusconfirm.show();
                        }
                    }, error: function (result) {
                        pfUser.apiError(result, "AwardStore", "AwardStore");
                    }
                });
            }
        }
        else {
            DevExpress.ui.dialog.alert('There were no awards selected. Please select an award you would like to redeem.', 'Alert!');
        }
    };

    return viewModel;
};




﻿PreflightMobile2.pointTranHist = function (params) {

    var viewModel = {
        firstViewListTF: true,
        firstViewTF: true,
        PointsAvailable: ko.observable(),
        PointsEarnedLifetime: ko.observable(),
        PointsExpiring60days: ko.observable(),
        transList: {
            changed: new $.Callbacks(),
            load: function (loadOptions) {
                if (loadOptions.refresh) {
                    var textarray = "";
                    var deferred = new $.Deferred();
                    $
                        .ajax({
                            dataType: "json",
                            url: apiUrl + "API/Award/PointTransHistory",
                            headers: { 'Authorization': 'Session ' + pfUser.authToken },
                            type: 'POST',
                            async: false,
                            success: function (result) {
                                textarray = result;
                            },
                            error: function (result) {
                                pfUser.apiError(result, "pointTranHist", "MenuAward");
                            }
                        });
                    return textarray;
                }
            }
        },
        locData: {
            changed: new $.Callbacks(),
            load: function (loadOptions) {
                console.log("locData fired")
                if (loadOptions.refresh) {
                    var textarray = "";
                    var deferred = new $.Deferred();
                    $.ajax({
                        dataType: "json",
                        url: apiUrl + "API/Account/LoadAccountDets",
                        headers: { 'Authorization': 'Session ' + pfUser.authToken },
                        type: 'POST',
                        async: false,
                        success: function (result) {
                            var r = result[0];
                            viewModel.PointsAvailable(r.PointsAvailable);
                            viewModel.PointsEarnedLifetime(r.PointsEarnedLifetime);
                            viewModel.PointsExpiring60days(r.PointsExpiring60days);
                        }, error: function (result) {
                            pfUser.apiError(result, "pointTranHist", "MenuAward");
                        }
                    });
                    return textarray;
                }
            }
        }
    };
    viewModel.viewShown = function () {
        setNavBar(false); //Show NavBar.
        console.log("viewshown, viewModel.firstViewListTF: ", viewModel.firstViewListTF);
        console.log("viewshown, viewModel.firstViewTF: ", viewModel.firstViewTF);
        //var x = viewModel.locData;
        viewModel.getLocData();
        (viewModel.firstViewListTF == true) ? viewModel.firstViewListTF = false : viewModel.transList.changed.fire();
        //(viewModel.firstViewTF == true) ? viewModel.firstViewTF = false : viewModel.locData.changed.fire();
        //if (viewModel.firstViewTF == true)  
        //    viewModel.firstViewTF = false;
        //else
        //{
        //    viewModel.transList.changed.fire();
        //    viewModel.locData.changed.fire();
        //} // Refresh Data on repeat visits. (first time is automatic.)
    };

    getIconURL = function (TranType)
    {
        return TranType == 'SALE' ? 'images/menuAccount/icon-parker.png' : 'images/menuAccount/icon-awards.png';
    }

    viewModel.getLocData = function ()
    {
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/Account/LoadAccountDets",
            headers: { 'Authorization': 'Session ' + pfUser.authToken },
            type: 'POST',
            async: false,
            success: function (result) {
                var r = result[0];
                viewModel.PointsAvailable(r.PointsAvailable);
                viewModel.PointsEarnedLifetime(r.PointsEarnedLifetime);
                viewModel.PointsExpiring60days(r.PointsExpiring60days);
            }, error: function (result) {
                pfUser.apiError(result, "pointTranHist", "MenuAward");
            }
        });
    }

    viewModel.pulledDown = function (e)
    {
        alert("Pulled!");
    }

    return viewModel;
};


﻿PreflightMobile2.RedeemedAwardDetail = function (params) {

    var viewModel = {
        errorList: ko.observableArray(),
        AwardName: ko.observable(),
        AwardedDT: ko.observable(),
        Quanity: ko.observable(),
        Address: ko.observable(),
        Phone: ko.observable(),
        CardNumber: ko.observable(),
        ExpirationDT: ko.observable(),
        ImportantInfoLabel: ko.observable(),
        InfoLabel1: ko.observable(),
        InfoLabel2: ko.observable(),
        RewardCD: ko.observable(),
        LocName: ko.observable(),
        CardName: ko.observable(),

        viewShown: function () {
            setNavBar(false); //Show NavBar.
            console.log("detail", params);

            viewModel.AwardName(params.id.AwardName);
            viewModel.AwardedDT(params.id.AwardedDT);
            viewModel.AwardedDT(moment(params.id.AwardedDT).format('M/D/YY'));
            viewModel.Address(params.id.Address);
            viewModel.CardNumber(params.id.CardNumber);
            viewModel.ExpirationDT(moment(params.id.ExpirationDT).format('M/D/YY'));
            viewModel.ImportantInfoLabel(params.id.ImportantInfoLabel);
            viewModel.InfoLabel1(params.id.InfoLabel1);
            viewModel.InfoLabel2(params.id.InfoLabel2);
            viewModel.Phone(params.id.Phone);
            viewModel.Quanity(params.id.Quanity);
            viewModel.RewardCD(params.id.RewardCD);
            viewModel.LocName(params.id.LocName);
            viewModel.CardName(params.id.CardName);

            $("#BarcodeTarget").barcode(params.id.RewardCD, "code128", { barWidth: 2, barHeight: 175 });
        },

    };

    viewModel.btCancelAward = function () {
        console.log("Cancel Pressed", params.id.RewardCD);
        console.log("Cancel Pressed", params.id.RewardID);

        var dialogOptions = {
            title: 'Alert!',
            message: 'Are you sure you want to cancel this Award?',
            buttons: [
                {
                    text: 'YES',
                    clickAction: function () {
                        cancelAward();
                    }
                },
                {
                    text: 'NO',
                    clickAction: function () {

                    }
                }
            ]
        };
        //alert('Your card infromation has been updated.');
        var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
        cusconfirm.show();
    }

    cancelAward = function () {
        pfUser.loadmenuMainLists = true;
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/Award/deleteAward",
            headers: { 'Authorization': 'Session ' + pfUser.authToken },
            type: 'POST',
            data: {
                "RewardID": (params.id.RewardID)
            },
            async: false,
            success: function (result) {
                //checking if the reply from the server is True or False - if its false bind the error list to show the server validation.
                var r = result[0];
                if (!r.Success) {
                    viewModel.errorList(result);

                }
                else {
                    var dialogOptions = {
                        title: 'Alert!',
                        message: 'Your Reward has been deleted and the points refunded to your account.',
                        buttons: [
                            {
                                text: 'OK',
                                clickAction: function () {                                    
                                    PreflightMobile2.app.navigate("RedeemedAwardList");
                                }
                            }
                        ]
                    };
                    //alert('Your card infromation has been updated.');
                    var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
                    cusconfirm.show();
                }
            },
            error: function (result) {
                pfUser.apiError(result, "RedeemedAwardDetail", "RedeemedAwardList");
            }
        })
    };

    return viewModel;
};

﻿PreflightMobile2.RedeemedAwardDetailRO = function (params) {

    var viewModel = {
        ResAlert: ko.observable("This award has already been redeemed."),
        AlertClass: ko.observable("BoxAlert ListSmallTitle"),
        IsRedeemed: ko.observable(),
        AwardName: ko.observable(),
        AwardedDT: ko.observable(),
        RewardCD: ko.observable(),
        IconURL: ko.observable(),
        LocName: ko.observable(),

        viewShown: function () {
            setNavBar(false); //Show NavBar.
            console.log("detail", params);

            viewModel.IsRedeemed(params.id.IsRedeemed);
            viewModel.AwardName(params.id.AwardName);
            viewModel.AwardedDT(moment(params.id.AwardedDT).format('M/D/YY'));
            viewModel.RewardCD(params.id.RewardCD);
            viewModel.IconURL('https://www.preflightairportparking.com/members/' + params.id.IconURL);
            viewModel.LocName(params.id.LocName);

        }
    };


    return viewModel;
};

﻿PreflightMobile2.menuMain = function (params) {   
    var viewModel = {
        PointsIndicator: ko.observable(pfUser.PointsIndicator),
        reservationList: {
            firstViewTF: true,
            changed: new $.Callbacks(),
            load: function (loadOptions) {
                if (loadOptions.refresh) {
                    var textarray = "";
                    console.log("oLoginText", pfUser.oLoginText());
                    if (pfUser.oLoginText() !== "Login") {

                        var startDT = new Date();
                        var endDT = new Date();

                        startDT.setHours(0, 0, 0, 0);
                        endDT.setMonth(endDT.getMonth() + 12);

                        var deferred = new $.Deferred();
                        $
                            .ajax({
                                dataType: "json",
                                url: apiUrl + "API/Reservation/UpcomingResList",
                                headers: { 'Authorization': 'Session ' + pfUser.authToken },
                                data: {
                                    StartDT: startDT.toDateString(),
                                    EndDT: endDT.toDateString()
                                },
                                type: 'POST',
                                async: false,
                                success: function (result) {
                                    textarray = result;
                                },
                                error: function (result) {                                    
                                    pfUser.apiError(result, "ResListmenuMain", "menuMain");
                                }
                            });
                    }
                    return textarray;
                }
            }
        },

        awardList: {
            changed: new $.Callbacks(),
            load: function (loadOptions) {
                if (loadOptions.refresh) {
                    if (pfUser.oLoginText() !== "Login") {
                        var textarray = "";
                        var deferred = new $.Deferred();
                        $
                            .ajax({
                                dataType: "json",
                                url: apiUrl + "API/Award/UpcomingAwards",
                                headers: { 'Authorization': 'Session ' + pfUser.authToken },
                                type: 'POST',
                                async: false,
                                success: function (result) {
                                    textarray = result;
                                },
                                error: function (result) {
                                    pfUser.apiError(result, "RedeemedAwardList", "menuMain");
                                }
                            });
                        return textarray;
                    }
                }
            }
        },


        viewShown: function () {
            setNavBar(false); //Show NavBar.
            if (pfUser.loadmenuMainLists) {
                pfUser.UserPointCount();
                viewModel.reservationList.changed.fire();
                viewModel.awardList.changed.fire();                
                pfUser.loadmenuMainLists = false;
            }
        },
                        

        onItemClick: function (e) {
            var vw = e.itemData.view;
            PreflightMobile2.app.navigate(vw);
        },
    };

    viewModel.pulledDown = function (e) {
        viewModel.reservationList.changed.fire();
        viewModel.awardList.changed.fire();        
        e.component.release();
    };

    viewModel.btLoginClick = function () {
        pfUser.returnViewName = "menuMain";
        if (pfUser.oLoginText() == "Login") {
            PreflightMobile2.app.navigate("login");
        } else {
            pfUser.logout();
            viewModel.reservationList.changed.fire();
            viewModel.awardList.changed.fire();
        }
    }

    getIconURL = function (PrepaidTF) {
        return PrepaidTF == 'Yes' ? 'images/reservation/icon-prepaid.png' : 'images/reservation/icon-reserved.png';
    }

    rcpText = function (ReceiptCD, ReservationID) {
        console.log("ReceiptCD: ", ReceiptCD);
        console.log("ReservationID: ", ReservationID);
        return ReceiptCD == '' ? 'Reservation Only' : ReceiptCD;
    }

    return viewModel;
};

﻿PreflightMobile2.login = function (params) {

    var viewModel = {
        viewShown: function () {
            setNavBar(false); //Show NavBar.
            console.log("login viewShown")
            if (!pfUser.hasUserPasswordSaved()) {
                this.password("");
            }
        },

        ////login logic

        saveTF: ko.observable(""),
        email: ko.observable(pfUser.userName).extend({ required: true }),
        password: ko.observable(pfUser.userPassword).extend({ required: true }),
        savePwdTF: ko.observable(pfUser.hasUserPasswordSaved()),

        login: function () {
            var validationResult = ko.validation.group(viewModel, { deep: true });
            if (viewModel.isValid()) {
                //DevExpress.ui.dialog.alert('All the fields are valid', 'Alert');
                pfUser.apiLogin(viewModel.email(), viewModel.password(), viewModel.savePwdTF(), "menuMain");
            }
            else {
                validationResult.showAllMessages();
            }

        },
        popup: {
            showPopup: function () {
                var popup = $("#popup").data("dxPopup");
                popup.show();
            },
            hidePopup: function () {
                var popup = $("#popup").data("dxPopup");
                popup.hide();
            }
        }
    };

    return viewModel;
};

﻿PreflightMobile2.ExampleListGrid = function (params) {

    var viewModel = {
//  Put the binding properties here
    };

    return viewModel;
};

﻿PreflightMobile2.ExampleList = function (params) {

    var viewModel = {
        viewShown: function () { setNavBar(false); }, //Show NavBar.            
    };

    return viewModel;
};

﻿PreflightMobile2.ExampleBarCode = function (params) {

    var viewModel = {

    //    btGetFromServer: function () {
    //        var textBox = $("#tbBarCode").dxTextBox("instance");
    //        console.log("textBox:", textBox);
    //        var barcodeValue = textBox.option('value');
    //        console.log("value of textBox:", barcodeValue);
    //        ($("#bcTarget")[0]).innerHTML = barcodeValue;
    //        }
    };

    viewModel.btCreateBarCode = function () {

        // To grab a dx widget and manipulate it with code:
        var textBox = $("#tbBarCode").dxTextBox("instance");    // access a widget
        //textBox.option('value', 'DRS9-IV9');       // set an option
        var barcodeValue = textBox.option('value');

        //Generate barcode and put it into the 
        $("#bcTarget").barcode(barcodeValue, "code128", { barWidth: 2, barHeight: 175 });

        // To grab a regular div, you can do this:
        //var divbcTarget = $("#bcTarget")[0];
        //console.log("divbcTarget [0]", divbcTarget);
        //console.log("divbcTarget innerHTML", divbcTarget.innerHTML);
        //console.log("divbcTarget ", ($("#bcTarget")[0]).innerHTML);
        //($("#bcTarget")[0]).innerHTML =
        //'<div id="barcodeTarget" class="barcodeTarget" style="padding: 0px; overflow: auto; width: 286px; display: block;"><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 20px"></div><div style="float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 2px"></div><div style="float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 4px"></div><div style="float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 8px"></div><div style="float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 2px"></div><div style="float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 6px"></div><div style="float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 6px"></div><div style="float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 6px"></div><div style="float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 2px"></div><div style="float: left; font-size: 0px; width:0; border-left: 6px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 2px"></div><div style="float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 2px"></div><div style="float: left; font-size: 0px; width:0; border-left: 6px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 2px"></div><div style="float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 6px"></div><div style="float: left; font-size: 0px; width:0; border-left: 6px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 4px"></div><div style="float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 2px"></div><div style="float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 4px"></div><div style="float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 4px"></div><div style="float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 2px"></div><div style="float: left; font-size: 0px; width:0; border-left: 6px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 4px"></div><div style="float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 6px"></div><div style="float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 6px"></div><div style="float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 2px"></div><div style="float: left; font-size: 0px; width:0; border-left: 6px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 2px"></div><div style="float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 2px"></div><div style="float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 6px"></div><div style="float: left; font-size: 0px; width:0; border-left: 6px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 4px"></div><div style="float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 2px"></div><div style="float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 4px"></div><div style="float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 2px"></div><div style="float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 6px"></div><div style="float: left; font-size: 0px; width:0; border-left: 6px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 2px"></div><div style="float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 6px"></div><div style="float: left; font-size: 0px; width:0; border-left: 6px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 2px"></div><div style="float: left; font-size: 0px; width:0; border-left: 2px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 2px"></div><div style="float: left; font-size: 0px; width:0; border-left: 4px solid #000000; height: 180px;"></div><div style="float: left; font-size: 0px; background-color: #FFFFFF; height: 180px; width: 20px"></div><div style="clear:both; width: 100%; background-color: #FFFFFF; color: #000000; text-align: center; font-size: 10px; margin-top: 5px;">DRS9-IV9</div></div>';

        //($("#bcTarget")[0]).barcode("1234567890128", "ean13"); // Doesn't work, so we'll call the barcode page from the server instead. 
    }
    /*
    viewModel.locationInfo = ko.computed(function () {
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "html",
            url: apiUrl + "barcodeGen.html",
            type: 'GET',
            data: {
                locationID: params.id
            },
            async: false,
            success: function (result) {
                //var r = result[0];
                //viewModel.Abbreviation(r.Abbreviation);
                console.log("Result from ajax", result);
                viewModel.barcodeHtml(result);
            }
        });

    })*/

    return viewModel;
};

﻿PreflightMobile2.ExamplePopupSearch = function (params) {

    var viewModel = {
        searchVisible : ko.observable(false),
        dtStart : ko.observable(new Date()),
        dtEnd : ko.observable(new Date()),
        AlertClass : ko.observable("BoxAlert ListSmall"),
        AlertHtml : ko.observable("This is dynamically set HTML.</br></br> The alert goes here. <br/><br/>")
    };

    viewModel.showSearch = function () {
        searchVisible(true);
    }

    viewModel.hideSearch = function () {
        searchVisible(false);
    }

    viewModel.submitSearch = function () {
        DevExpress.ui.dialog.alert('Submit will be called with dates:' + dtStart() + ' to ' + dtEnd(), 'Alert');
        searchVisible(false);
    }    

    viewModel.create = function () {
        DevExpress.ui.dialog.alert('Create will be called.', 'Alert');
    }
    viewModel.hideAlert = function () {
        //viewModel.AlertHtml("I'm going away now...");
        viewModel.AlertClass("Hidden");
    }

    return viewModel;
};

﻿PreflightMobile2.fontTest = function (params) {

    var viewModel = {
    };
    viewModel.btBackTest = function () {
        console.log("btBackTest fired.");
        //var btBack = ($("#btBack")).dxButton("instance");
        //var btBack = ($("#btBack")[0]).dxButton("instance");
        //btBack.execute();

        (new DevExpress.framework.dxCommand({ action: "#_back" })).execute();
    }
    viewModel.btNavOut = function () {
        window.open('http://google.com', '_blank', 'location=yes');
    }

    return viewModel;
};

﻿PreflightMobile2.ExampleMenu = function (params) {

    var viewModel = {
//  Put the binding properties here
    };

    return viewModel;
};

﻿PreflightMobile2.CreateReservationText = function (params) {

    var viewModel = {
        btSubmit: function () {
            var deferred = new $.Deferred();
            $.ajax({
                dataType: "json",
                url: apiUrl + "API/ReservationEdit/MakeNonPrePaidReservation",
                headers: { 'Authorization': 'Session ' + pfUser.authToken },
                type: 'POST',
                data: {
                    //pfReservation fields.
                    ReservationID: ReservationObject.ReservationID,
                    CardID: ReservationObject.CardID, 
                    StartDT: ReservationObject.StartDT, 
                    StartTime: ReservationObject.StartTime, 
                    EndDT: ReservationObject.EndDT,
                    EndTIme: ReservationObject.EndTime,
                    FirstName: ReservationObject.FirstName,
                    LastName: ReservationObject.LastName,
                    Zip: ReservationObject.Zip, 
                    Email: ReservationObject.Email, 
                    MobilePhone: ReservationObject.MobilePhone,
                    AcknowledgedTF: ReservationObject.AcknowledgedTF,                    
                    ConvertingToPRepaid: ReservationObject.ConvertingToPRepaid,
                    LocID: ReservationObject.LocID,
                    ParkingTypeID: ReservationObject.ParkingTypeID,

                    //AccountCC fields                                        
                    CCType: ReservationObject.CCType,
                    CCNumber: ReservationObject.CCNumber,
                    CCLastFour: ReservationObject.CCLastFour,
                    CCAddr1: ReservationObject.CCAddr1,
                    CCCity: ReservationObject.CCCity,
                    CCState: ReservationObject.CCState,
                    CCProvince: ReservationObject.CCProvince,
                    CCZip: ReservationObject.CCZip,
                    CCFullName: ReservationObject.CCFullName,
                    CCExpDT: ReservationObject.CCExpDT,
                    CCCountry: ReservationObject.CCCountry,
                    CCbSaveCard: ReservationObject.CCbSaveCard,
                    CCUseStoredCCInfo: ReservationObject.CCUseStoredCCInfo,

                },
                async: false,
                success: function (result) {

                    var r = result[0];
                    if (!r.Success) {
                        viewModel.errorList(result);

                    }
                    else {
                        var dialogOptions = {
                            title: 'Account Info',
                            message: 'Your information has been saved.',
                            buttons: [
                                {
                                    text: 'OK',
                                    clickAction: function () {
                                        RemoveViewFromCache("accountMenu");
                                        PreflightMobile2.app.navigate("accountMenu");
                                    }
                                }
                            ]
                        };
                        var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
                        cusconfirm.show();
                    }
                },
                error: function (result) {
                    pfUser.apiError(result, "acct_Info", "accountMenu");
                }
            });
        }
    };

    return viewModel;
};

﻿PreflightMobile2.ExampleForm = function (params) {

    var viewModel = {
        viewShown: function () { setNavBar(false); }, //Show NavBar.

        //selection values  
        accountName: ko.observable().extend({
            required: {
                message: "Name required",
                params: true
            }
        }),
        companyName: ko.observable(),
        email: ko.observable().extend({
            required: true,
            pattern: {
                message: "Invalid email.",
                params: "[\\w']+([-+.][\\w']+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*"
            }
        }),
        dayPhone: ko.observable().extend({
            required: true,
            pattern: {
                message: "Invalid phone number.",
                params: "^(([2-9]{1}\\d{2}[/.]\d{3}[.]\\d{4})|([2-9]{1}\\d{2}[/-]\\d{3}[-]\\d{4})|([2-9]{1}\\d{9})|(\\([2-9]{1}\\d{2}\\)\\s\\d{3}-\\d{4}))$"
            }
        }),
        mobilePhone: ko.observable().extend({
            required: true,
            pattern: {
                message: "Invalid mobile number.",
                params: "^(([2-9]{1}\\d{2}[/.]\d{3}[.]\\d{4})|([2-9]{1}\\d{2}[/-]\\d{3}[-]\\d{4})|([2-9]{1}\\d{9})|(\\([2-9]{1}\\d{2}\\)\\s\\d{3}-\\d{4}))$"
            }
        }),
        selectedStatement: ko.observable().extend({
            required: {
                message: "Required"
            }
        }),
        selectedStatus: ko.observable().extend({
            required: {
                message: "Required"
            }
        }),
        selectedLoc: ko.observable().extend({
            required: {
                message: "Select a location"
            }
        }),
        corpCode: ko.observable(),
        corpProgram: ko.observable(),


        btSubmit: function () {
            //DevExpress.ui.dialog.alert('Submitted.', 'Alert');
            var validationResult = ko.validation.group(viewModel, { deep: true });
            if (viewModel.isValid()) {
                //TODO: add submission logic. Navigate to next page it it worked, or show alert that one or more are wrong.
                DevExpress.ui.dialog.alert('All the fields are valid', 'Alert');
            }
            else {
                //DevExpress.ui.dialog.alert('There are some fields with problems.', 'Alert');
                validationResult.showAllMessages();
            }
            
        },
        btLogout: function () {
            DevExpress.ui.dialog.alert('logout pressed.', 'Alert');
            pfUser.logout();
        }
    };


    return viewModel;
};



this.locationList = ko.observableArray(
                   [{ locationName: "ATL", locationID: 2 },
                    { locationName: "BOS", locationID: 3 }
                   ]);

this.statusList = ko.observableArray(
                   [{ statusID: 1, statusName: "OPEN" },
                    { statusID: 2, statusName: "CLOSED" }
                   ]);

this.statement = ko.observableArray(
                   [{ StatementText: "Email", StatementID: 1 },
                    { StatementText: "No Statement", StatementID: 2 }
                   ]);

﻿PreflightMobile2.ExampleFull = function (params) {

    var viewModel = {
        viewShown: function () { setNavBar(false); }, //Hide NavBar.
        btPopup1: function () {
            DevExpress.ui.dialog.alert('Test Action Successful.', 'Alert');
        }

    };

    return viewModel;
};

﻿PreflightMobile2.ExampleTileView = function (params) {
    viewModel = {
        locName: "Houston Hobby Airport",
        locAddress: "Houston",
        parkType: "Valet",
        ArrivalDT: new Date(moment("12/31/2013 12:30 AM")),
        DepartureDT: new Date(moment("1/15/2014 1:00 PM")),
        PointsMsg: ko.observable("Not Set"),
        ShowWeeks: true,
        subtractWeeks: "",
        weekcount: ko.observable(2),
        daycount: ko.observable(10),
        dayPoints: ko.observable(5),
        weekPoints: ko.observable(20),
        addWeeks: "",
        ShowDays: true,
        subtractDays: "",
        addDays: "",
        recalcRemainingPoint: "test message",
        recalcRemaingPoints: "test message",
        errorList: ko.observableArray([]),
        availPoints: ko.observable(500),

        ChargePrice: ko.observable(5.50),
        ChargeAirportFee: ko.observable(10.20),
        ChargeTaxes: ko.observable(12.20),
        ChargeSubTot: ko.observable(17.28),
        ChargePointDiscount: ko.observable(),
        ChargeDifference: ko.observable(50),
        ChargeTotal: ko.observable(20.30),
        showCancelFee: "",
        message: "message goes here",
        ChargePointsApplied: 50,
        showDifference: true,
        ChargeCancelFee: "$5.50 to cancel",
    };


    viewModel.btApplyPoints = function () {
        var tot = 0;
        console.log("viewModel.availPoints():", viewModel.availPoints());
        console.log("viewModel.weekcount():", viewModel.weekcount());
        console.log("viewModel.dayPoints():", viewModel.dayPoints());
        console.log("viewModel.daycount():", viewModel.daycount());
        console.log("viewModel.weekPoints():", viewModel.weekPoints());
        console.log("viewModel.weekcount() * viewModel.dayPoints()=", viewModel.weekcount() * viewModel.dayPoints());
        console.log("(viewModel.daycount() * viewModel.weekPoints())", (viewModel.daycount() * viewModel.weekPoints()));

        var tot =
            viewModel.availPoints() -
            (viewModel.weekcount() * viewModel.weekPoints())
            - (viewModel.daycount() * viewModel.dayPoints());

        console.log("total points left:", tot);
        viewModel.PointsMsg(tot);

    }

	return viewModel;
};

﻿PreflightMobile2.ExampleVideo = function (params) {

    var viewModel = {
//  Put the binding properties here
    };

    return viewModel;
};

﻿PreflightMobile2.accountMenu = function (params) {

    var viewModel = {
        mainMenu: [
                {
                    text: "GENERAL INFO",
                    iconScr: "images/menuAccount/icon-general.png",
                    action: {
                        view: "accountInfoMenu"
                    }
                },

                {
                    text: "EXPRESS PASS",
                    iconScr: "images/menuAccount/icon-express-pass.png",
                    action: {
                        view: "expressPassList"
                    }
                },

                {
                    text: "FREQUENT PARKER CARDS",
                    iconScr: "images/menuAccount/icon-parker.png",
                    action: {
                        view: "cardList"
                    }
                },

                {
                    text: "AWARD CENTER",
                    iconScr: "images/menuAccount/icon-awards.png",
                    action: {
                        view: "MenuAward"
                    }
                },

                {
                    text: "RESERVATION HISTORY",
                    iconScr: "images/menuAccount/icon-history.png",
                    action: {
                        view: "ResList"
                    }
                },

                {
                    text: "TRANSACTION HISTORY",
                    iconScr: "images/menuAccount/icon-history.png",
                    action: {
                        view: "pointTranHist"
                    }
                }
        ],
        viewShown: function () { setNavBar(false); }, //Show NavBar.
    };

    return viewModel; 
};

﻿PreflightMobile2.accountInfoMenu = function (params) {

    var viewModel = {
        mainMenu: [
             {
                 text: "ACCOUNT INFO",
                 iconScr: "images/menuAccountInfo/icon-account.png",
                 action: {
                     view: "acct_Info"
                 }
             },

             {
                 text: "CONTACT INFO",
                 iconScr: "images/menuAccountInfo/icon-contact.png",
                 action: {
                     view: "acct_Contact"
                 }
             },

             {
                 text: "FREQUENT FLIER INFO",
                 iconScr: "images/menuAccountInfo/icon-flier.png",
                 action: {
                     view: "acct_FrequentFlier"
                 }
             }      
        ],
        viewShown: function () { setNavBar(false); }, //Show NavBar.
    };
    return viewModel;
};

﻿PreflightMobile2.acct_SignUpFF = function (params) {
    var viewModel = {
        acctErrorList: ko.observableArray(),
        cardErrorList: ko.observableArray(),
        expErrorList: ko.observableArray(),
        selectedPromo: ko.observable(0),
        accountNumber: ko.observable(),
        accNumReq: ko.observable(false),
        btSubmitText: ko.observable('Create Account'),

        //Save changes to server 
        //TODO: Make this submit the whole thing, or not.  
        btSubmit: function () {
            var validationResult = ko.validation.group(viewModel, { deep: true });
            if (viewModel.isValid()) {
                var dialogOptions = {
                    title: 'Terms and Conditions',
                    message: 'I request that a Frequent Parker account be opened for me. I have read and agree to the following terms and conditions: I or the issuer may cancel the card at any time. PreFlight reserves the right to change the program without notice. I agree to supply the requested information on the application and I guarantee the accuracy of the information.',
                    buttons: [
                        {
                            text: 'I Agreee',
                            clickAction: function () {
                                viewModel.saveAcct();
                            }
                        },
                        {
                            text: 'Cancel',
                            clickAction: function () {
                            }
                        }
                    ]
                };
                //alert('Your card infromation has been updated.');
                var myDialog = new DevExpress.ui.dialog.custom(dialogOptions);
                myDialog.show();
            }
            else {
                validationResult.showAllMessages();
            }
        },

        viewShown: function () {
            setNavBar(false);
            viewModel.acctErrorList.removeAll();
            viewModel.cardErrorList.removeAll();
            viewModel.expErrorList.removeAll();
        }, //Show NavBar.
    };

    viewModel.saveAcct = function () {
        viewModel.storeAcctInfo();
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/Account/createNewAccount",
            type: 'POST',
            data: {
                //acct info                       
                promoCD: pfNewAcct.promoCD,
                selectedPrefix: pfNewAcct.selectedPrefix,
                corpProgram: pfNewAcct.corpProgram,
                firstname: pfNewAcct.firstname,
                middlename: pfNewAcct.middlename,
                lastname: pfNewAcct.lastname,
                AuthQuestionID: pfNewAcct.AuthQuestionID,
                AuthQuestionAnswer: pfNewAcct.AuthQuestionAnswer,
                password: pfNewAcct.password,
                address1: pfNewAcct.address1,
                address2: pfNewAcct.address2,
                city: pfNewAcct.city,
                zipCode: pfNewAcct.zipCode,
                country: pfNewAcct.selectedCountry,
                state: pfNewAcct.selectedState,
                accountName: pfNewAcct.accountName,
                companyName: pfNewAcct.companyName,
                email: pfNewAcct.email,
                phone1: pfNewAcct.dayPhone,
                phone2: pfNewAcct.mobilePhone,
                selectedStatement: pfNewAcct.selectedStatement,
                selectedStatus: pfNewAcct.selectedStatus,
                selectedLoc: pfNewAcct.selectedLoc,
                corpCode: pfNewAcct.corpCode,
                //Card details
                incExpressPass: pfNewAcct.incExpressPass,
                EPcardnumber: pfNewAcct.EPcardnumber,
                cardTypeID: pfNewAcct.cardTypeID,
                EPCardName: pfNewAcct.EPCardName,
                EPCardExpMonth: pfNewAcct.EPCardExpMonth,
                EPCardExpYear: pfNewAcct.EPCardExpYear,
                EPAddress1: pfNewAcct.EPAddress1,
                EPAddress2: pfNewAcct.EPAddress2,
                EPCity: pfNewAcct.EPCity,
                EPCardCountry: pfNewAcct.EPCardCountry,
                EPCardState: pfNewAcct.EPCardState,
                EPPostalCD: pfNewAcct.EPPostalCD,
                EPPromoCD: pfNewAcct.EPPromoCD,
                incExpressPass: pfNewAcct.incExpressPass,
                locID: pfNewAcct.locID,
                corpProgram: pfNewAcct.corpProgram,
                stmtDeliveryMethod: pfNewAcct.stmtDeliveryMethod,
                //FF Dets
                ffProgID: pfNewAcct.ffProgID,
                ffAccountNumber: pfNewAcct.ffAccountNumber,
                barcodeOnlyTF: pfNewAcct.barcodeOnlyTF

            },
            async: false,
            success: function (result) {
                //checking if the reply from the server is True or False - if its false bind the error list to show the server validation.                
                var r = result[0];
                if (!result[0].Success) {
                    viewModel.cardErrorList(r.cardErrorList);
                    viewModel.acctErrorList(r.acctErrorList);
                    viewModel.expErrorList(r.expErrorList)
                }
                else {
                    var dialogOptions = {
                        title: 'Account Created',
                        message: 'Your account info has been saved.',
                        buttons: [
                            {
                                text: 'OK',
                                clickAction: function () {
                                    pfNewAcct = "";
                                    RemoveViewFromCache("acct_SignUp");
                                    RemoveViewFromCache("acct_SignUpCard");
                                    RemoveViewFromCache("acct_SignUpFF");
                                    PreflightMobile2.app.navigate("login", { root: true });
                                }
                            }
                        ]
                    };
                    var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
                    cusconfirm.show();
                }
            }
        });

    };

    //Stores form data to the pfNewAcct obj
    viewModel.storeAcctInfo = function () {
        pfNewAcct.ffProgID = viewModel.selectedPromo();
        pfNewAcct.ffAccountNumber = viewModel.accountNumber();
    };


    //load ff progam list
    viewModel.promoList = ko.computed(function () {
        var deferred = new $.Deferred();
        $
            .ajax({
                dataType: "json",
                url: apiUrl + "API/Account/NewAcctffPromoList",
                data: {
                    locID: pfNewAcct.locID
                },
                type: 'POST',
                async: false,
                success: function (result) {
                    sl = result;
                },
            });
        return sl;
    });

    return viewModel;
};

﻿PreflightMobile2.acct_Info = function (params) {

    var viewModel = {
        //hidden values         
        //*** Error list displays the server validation errors at the top of the list/or view***
        errorList: ko.observableArray(),
        needsUpdate: ko.observable(),
        forceRefresh: ko.observable(),
        viewShown: function () {
            viewModel.forceRefresh.valueHasMutated(); //force refresh of the reservationList.
            setNavBar(false); //Show NavBar.
        },


        //START Form values 

        accountName: ko.observable().extend({
            required: {
                message: "Name required",
                params: true
            }
        }),
        companyName: ko.observable(),
        email: ko.observable().extend({
            required: true,
            pattern: {
                message: "Invalid email.",
                params: "[\\w']+([-+.][\\w']+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*"
            }
        }),
        dayPhone: ko.observable().extend({
            required: true,
            pattern: {
                message: "Invalid phone number.",
                params: "^(([2-9]{1}\\d{2}[/.]\\d{3}[.]\\d{4})|([2-9]{1}\\d{2}[/-]\\d{3}[-]\\d{4})|([2-9]{1}\\d{9})|(\\([2-9]{1}\\d{2}\\)\\s\\d{3}-\\d{4}))$"
            }
        }),
        mobilePhone: ko.observable(),
        selectedStatement: ko.observable().extend({
            required: {
                message: "Required"
            }
        }),
        selectedStatus: ko.observable().extend({
            required: {
                message: "Required"
            }
        }),
        selectedLoc: ko.observable().extend({
            required: {
                message: "Select a location"
            }
        }),
        corpCode: ko.observable(),
        //END Form Values


        //Save changes to server
        btSubmit: function () {
            var validationResult = ko.validation.group(viewModel, { deep: true });
            if (viewModel.isValid()) {
                var deferred = new $.Deferred();
                $.ajax({
                    dataType: "json",
                    url: apiUrl + "API/Account/saveAccountDetails",
                    headers: { 'Authorization': 'Session ' + pfUser.authToken },
                    type: 'POST',
                    data: {
                        acctName: viewModel.accountName(),
                        locID: viewModel.selectedLoc(),
                        companyName: viewModel.companyName(),
                        email: viewModel.email(),
                        phone1: viewModel.dayPhone(),
                        phone2: viewModel.mobilePhone(),
                        statusCD: viewModel.selectedStatus(),
                        corpCD: viewModel.corpCode(),
                        corpProg: corpProgram,
                        stmtDeliveryMethod: viewModel.selectedStatement()

                    },
                    async: false,
                    success: function (result) {
                        //checking if the reply from the server is True or False - if its false bind the error list to show the server validation.
                        var r = result[0];
                        if (!r.Success) {
                            viewModel.errorList(result);
                            //viewModel.toastMessage("There was an issue saving your data");
                            //var toast = $("#toast-success").data("dxToast");
                            //toast.show();
                        }
                        else {
                            var dialogOptions = {
                                title: 'Account Info',
                                message: 'Your information has been saved.',
                                buttons: [
                                    {
                                        text: 'OK',
                                        clickAction: function () {
                                            RemoveViewFromCache("accountMenu");
                                            PreflightMobile2.app.navigate("accountMenu");
                                        }
                                    }
                                ]
                            };
                            //alert('Your card infromation has been updated.');
                            var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
                            cusconfirm.show();
                        }
                    },
                    error: function (result) {
                        pfUser.apiError(result, "acct_Info", "accountInfoMenu");
                    }
                });
            }
            else {
                validationResult.showAllMessages();
            }
        }
    };

    //load status list
    viewModel.statusList = ko.computed(function () {
        viewModel.forceRefresh();
        var sl = "";
        var deferred = new $.Deferred();
        $
            .ajax({
                dataType: "json",
                url: apiUrl + "API/Account/statusList",
                type: 'POST',
                async: false,
                success: function (result) {
                    sl = result;
                },
                error: function (result) {
                    pfUser.apiError(result, "acct_Info", "accountInfoMenu");
                }
            });
        return sl;
    }),


    //load location list
    viewModel.locationList = ko.computed(function () {
        var deferred = new $.Deferred();
        $
            .ajax({
                dataType: "json",
                url: apiUrl + "API/Home/locationLookupList",
                type: 'POST',
                async: false,
                success: function (result) {
                    ll = result;
                },
                error: function (result) {
                    RemoveViewFromCache("acct_Info");
                    pfUser.apiError(result, "acct_Info", "accountInfoMenu");
                }
            });
        return ll;
    });

    //load statement list
    viewModel.statement = ko.computed(function () {
        var sl = "";
        var deferred = new $.Deferred();
        $
            .ajax({
                dataType: "json",
                url: apiUrl + "API/Account/statementList",
                type: 'POST',
                async: false,
                success: function (result) {
                    sl = result;
                },
                error: function (result) {
                    pfUser.apiError(result, "acct_Info", "accountInfoMenu");
                }
            });
        return sl;
    }),

    //Load account Data
    locData = ko.computed(function () {
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/Account/LoadAccountDets",
            headers: { 'Authorization': 'Session ' + pfUser.authToken },
            type: 'POST',
            async: false,
            success: function (result) {
                var r = result[0];
                viewModel.accountName(r.acctName);
                viewModel.selectedLoc(r.locID);
                viewModel.companyName(r.companyName);
                viewModel.email(r.email);
                viewModel.dayPhone(r.dayPhone);
                viewModel.mobilePhone(r.mobilePhone);
                viewModel.selectedStatus(r.statusCD);
                viewModel.corpCode(r.compID == "-1" ? " " : r.compID);
                viewModel.selectedStatement(r.stmtDeliveryMethod);
                viewModel.needsUpdate(r.AccountNeedsUserUpdate);
            },
            error: function (result) {
                pfUser.apiError(result, "acct_Contact", "accountInfoMenu");
            }
        });
    });

    //Validate and fill the corp program based on the account - this will update when focus is lost from the text box, or on the button submit
    corpProgram = ko.computed(function () {
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/Account/checkCorpCode",
            type: 'POST',
            data: {
                corpCD: viewModel.corpCode()
            },
            async: false,
            success: function (result) {
                var r = result[0];
                text = r.corpProg;
            },
            error: function (result) {
                text = "None";
            }
        });
        return text;
    })

    return viewModel;
};


﻿PreflightMobile2.acct_SignUpCard = function (params) {

    var viewModel = {
        //Misc                
        acctErrorList: ko.observableArray(),
        cardErrorList: ko.observableArray(),
        expErrorList: ko.observableArray(),
        btSubmitText: ko.observable('Create Account'),

        //START: Form  
        incExpressPass: ko.observable(false),
        cardNumberReadOnly: ko.observable(),
        selectedCard: ko.observable().extend({
            required: {
                message: "Select Card"
            }
        }),

        selectedMonth: ko.observable().extend({
            required: {
                message: "Month Required"
            }
        }),
        selectedYear: ko.observable().extend({
            required: {
                message: "Year Required"
            }
        }),
        cardName: ko.observable().extend({
            required: {
                message: "Name Required"
            }
        }),

        address1: ko.observable().extend({
            required: {
                message: "Enter your address",
            }
        }),
        address2: ko.observable(),

        selectedCountry: ko.observable().extend({
            required: {
                message: "Country Required"
            }
        }),
        selectedState: ko.observable().extend({
            required: {
                message: "State Required"
            }
        }),

        //State and City list - these are used to cascade the selection
        city: ko.observable().extend({
            required: {
                message: "Enter a city",
            }
        }),
        zipCode: ko.observable().extend({
            required: true,
            pattern: {
                message: "Invalid Poastal Code.",
                params: "\\d{5}(-\\d{4})?|(^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\\d{1}[A-Za-z]{1} *\\d{1}[A-Za-z]{1}\\d{1}$)"
            }
        }),
        //END: Form values


        //Save to sever
        btSubmit: function () {
            var validationResult = ko.validation.group(viewModel, { deep: true });
            if (viewModel.incExpressPass()) {
                if (viewModel.isValid()) {
                    viewModel.storeAcctInfo();
                    if (pfNewAcct.ShowFFProgTF) {
                        PreflightMobile2.app.navigate("acct_SignUpFF");
                    }
                        //done, submit and save the data. 
                    else {
                        saveAcct();
                    }
                }
                else {
                    validationResult.showAllMessages();
                }
            }
            else {
                var dialogOptions = {
                    title: 'Terms and Conditions',
                    message: 'I request that a Frequent Parker account be opened for me. I have read and agree to the following terms and conditions: I or the issuer may cancel the card at any time. PreFlight reserves the right to change the program without notice. I agree to supply the requested information on the application and I guarantee the accuracy of the information.',
                    buttons: [
                        {
                            text: 'I Agreee',
                            clickAction: function () {
                                viewModel.saveAcct()
                            }
                        },
                        {
                            text: 'Cancel',
                            clickAction: function () {

                            }
                        }
                    ]
                };
                //alert('Your card infromation has been updated.');
                var myDialog = new DevExpress.ui.dialog.custom(dialogOptions);
                myDialog.show();
            }
        },

        viewShown: function () {
            setNavBar(false);
            viewModel.acctErrorList.removeAll();
            viewModel.cardErrorList.removeAll();
            viewModel.expErrorList.removeAll();
        }, //Show NavBar.
    };

    viewModel.saveAcct = function () {
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/Account/createNewAccount",
            type: 'POST',
            data: {
                promoCD: pfNewAcct.promoCD,
                selectedPrefix: pfNewAcct.selectedPrefix,
                corpProgram: pfNewAcct.corpProgram,
                firstname: pfNewAcct.firstname,
                middlename: pfNewAcct.middlename,
                lastname: pfNewAcct.lastname,
                password: pfNewAcct.password,
                AuthQuestionID: pfNewAcct.AuthQuestionID,
                AuthQuestionAnswer: pfNewAcct.AuthQuestionAnswer,
                address1: pfNewAcct.address1,
                address2: pfNewAcct.address2,
                city: pfNewAcct.city,
                zipCode: pfNewAcct.zipCode,
                country: pfNewAcct.selectedCountry,
                state: pfNewAcct.selectedState,
                accountName: pfNewAcct.accountName,
                companyName: pfNewAcct.companyName,
                email: pfNewAcct.email,
                phone1: pfNewAcct.dayPhone,
                phone2: pfNewAcct.mobilePhone,
                selectedStatement: pfNewAcct.selectedStatement,
                selectedStatus: pfNewAcct.selectedStatus,
                selectedLoc: pfNewAcct.selectedLoc,
                corpCode: pfNewAcct.corpCode,
                EPcardnumber: pfNewAcct.EPcardnumber,
                cardTypeID: pfNewAcct.cardTypeID,
                EPCardName: pfNewAcct.EPCardName,
                EPCardExpMonth: pfNewAcct.EPCardExpMonth,
                EPCardExpYear: pfNewAcct.EPCardExpYear,
                EPAddress1: pfNewAcct.EPAddress1,
                EPAddress2: pfNewAcct.EPAddress2,
                EPCity: pfNewAcct.EPCity,
                EPCardCountry: pfNewAcct.EPCardCountry,
                EPCardState: pfNewAcct.EPCardState,
                EPPostalCD: pfNewAcct.EPPostalCD,
                EPPromoCD: pfNewAcct.EPPromoCD,
                incExpressPass: viewModel.incExpressPass(),
                locID: pfNewAcct.locID,
                stmtDeliveryMethod: pfNewAcct.stmtDeliveryMethod,
                barcodeOnlyTF: pfNewAcct.barcodeOnlyTF

            },
            async: false,
            success: function (result) {
                console.log(result);
                console.log(result[0]);
                var r = result[0];
                if (r.Success) {
                    var dialogOptions = {
                        title: 'Account Created',
                        message: 'Your account info has been saved.',
                        buttons: [
                            {
                                text: 'OK',
                                clickAction: function () {
                                    pfNewAcct = "";
                                    RemoveViewFromCache("acct_SignUp");
                                    RemoveViewFromCache("acct_SignUpCard");
                                    PreflightMobile2.app.navigate("login", { root: true });
                                }
                            }
                        ]
                    };
                    //alert('Your card infromation has been updated.');
                    var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
                    cusconfirm.show();
                }
                else {
                    viewModel.cardErrorList(result.cardErrorList);
                    viewModel.acctErrorList(result.acctErrorList);
                    viewModel.expErrorList(result.expErrorList)
                }
            }
        });
    };

    //Stores form data to the pfNewAcct obj
    viewModel.storeAcctInfo = function () {
        pfNewAcct.EPcardnumber = viewModel.cardNumber();
        pfNewAcct.cardTypeID = viewModel.selectedCard();
        pfNewAcct.EPCardName = viewModel.cardName();
        pfNewAcct.EPCardExpMonth = viewModel.selectedMonth();
        pfNewAcct.EPCardExpYear = viewModel.selectedYear();
        pfNewAcct.EPAddress1 = viewModel.address1();
        pfNewAcct.EPAddress2 = viewModel.address2();
        pfNewAcct.EPCity = viewModel.city();
        pfNewAcct.EPCardCountry = viewModel.selectedCountry();
        pfNewAcct.EPCardState = viewModel.selectedState();
        pfNewAcct.EPPostalCD = viewModel.zipCode();
        pfNewAcct.incExpressPass = viewModel.incExpressPass();
    };

    viewModel.cardNumber = ko.observable().extend({
        required: {
            message: "Enter Card Number"
        },
        pattern: {
            message: "Invalid Card Number.",
            params: "^(?:(?:4\\d{3})|(?:5[1-5]\\d{2})|(?:6011)|(?:(?:3[68]\\d{2})|(?:30[012345]\\d))|(?:3[47]\\d{2}))([ -]?)(?:(?:\\d{6}\\1\\d{5})|(?:\\d{6}\\1\\d{4})|(?:\\d{4}\\1\\d{4}\\1\\d{4}))$ |" +
                    "^(?:3[47]\\d{2})([ -]?)(?:\\d{6}\\1\\d{5})|" +
                    "^(?:(?:(?:3[68]\\d{2})|(?:30[012345]\\d)))([ -]?)(?:\\d{6}\\1\\d{4})$|" +
                    "^(?:6011)([ -]?)(?:\\d{4}\\1\\d{4}\\1\\d{4})$|" +
                    "^(?:5[1-5]\\d{2})([ -]?)(?:\\d{4}\\1\\d{4}\\1\\d{4})$|" +
                    "^(?:4\\d{3})([ -]?)((?:\\d{4}\\1\\d{4}\\1\\d{4})|(?:\\d{3}\\1\\d{3}\\1\\d{3}))$"
        }
    });

    viewModel.cardList = ko.observableArray(
               [{ cardType: "AMEX", value: 1 },
                { cardType: "VISA", value: 2 },
                { cardType: "MASTERCARD", value: 3 },
                { cardType: "DINERS CLUB", value: 4 }
               ]);


    viewModel.monthList = ko.observableArray(
                   [{ monthNum: "01" },
                    { monthNum: "02" },
                    { monthNum: "03" },
                    { monthNum: "04" },
                    { monthNum: "05" },
                    { monthNum: "06" },
                    { monthNum: "07" },
                    { monthNum: "08" },
                    { monthNum: "09" },
                    { monthNum: "10" },
                    { monthNum: "11" },
                    { monthNum: "12" }
                   ]);
    //list of countries
    viewModel.countries = ko.observableArray(
                   [{ country: "Canada" },
                    { country: "United States" }
                   ]);

    //list of states/provinces
    viewModel.states = ko.observableArray(
                   [{ stateName: 'Alabama', abr: 'AL', country: 'United States' },
                    { stateName: 'Alaska', abr: 'AK', country: 'United States' },
                    { stateName: 'Arizona', abr: 'AZ', country: 'United States' },
                    { stateName: 'Arkansas', abr: 'AR', country: 'United States' },
                    { stateName: 'California', abr: 'CA', country: 'United States' },
                    { stateName: 'Colorado', abr: 'CO', country: 'United States' },
                    { stateName: 'Connecticut', abr: 'CT', country: 'United States' },
                    { stateName: 'Delaware', abr: 'DE', country: 'United States' },
                    { stateName: 'District of Columbia', abr: 'DC', country: 'United States' },
                    { stateName: 'Florida', abr: 'FL', country: 'United States' },
                    { stateName: 'Georgia', abr: 'GA', country: 'United States' },
                    { stateName: 'Hawaii', abr: 'HI', country: 'United States' },
                    { stateName: 'Idaho', abr: 'ID', country: 'United States' },
                    { stateName: 'Illinois', abr: 'IL', country: 'United States' },
                    { stateName: 'Indiana', abr: 'IN', country: 'United States' },
                    { stateName: 'Iowa', abr: 'IA', country: 'United States' },
                    { stateName: 'Kansas', abr: 'KS', country: 'United States' },
                    { stateName: 'Kentucky', abr: 'KY', country: 'United States' },
                    { stateName: 'Louisiana', abr: 'LA', country: 'United States' },
                    { stateName: 'Maine', abr: 'ME', country: 'United States' },
                    { stateName: 'Montana', abr: 'MT', country: 'United States' },
                    { stateName: 'Nebraska', abr: 'NE', country: 'United States' },
                    { stateName: 'Nevada', abr: 'NV', country: 'United States' },
                    { stateName: 'New Hampshire', abr: 'NH', country: 'United States' },
                    { stateName: 'New Jersey', abr: 'NJ', country: 'United States' },
                    { stateName: 'New Mexico', abr: 'NM', country: 'United States' },
                    { stateName: 'New York', abr: 'NY', country: 'United States' },
                    { stateName: 'North Carolina', abr: 'NC', country: 'United States' },
                    { stateName: 'North Dakota', abr: 'ND', country: 'United States' },
                    { stateName: 'Ohio', abr: 'OH', country: 'United States' },
                    { stateName: 'Oklahoma', abr: 'OK', country: 'United States' },
                    { stateName: 'Oregon', abr: 'OR', country: 'United States' },
                    { stateName: 'Maryland', abr: 'MD', country: 'United States' },
                    { stateName: 'Massachusetts', abr: 'MA', country: 'United States' },
                    { stateName: 'Michigan', abr: 'MI', country: 'United States' },
                    { stateName: 'Minnesota', abr: 'MN', country: 'United States' },
                    { stateName: 'Mississippi', abr: 'MS', country: 'United States' },
                    { stateName: 'Missouri', abr: 'MO', country: 'United States' },
                    { stateName: 'Pennsylvania', abr: 'PA', country: 'United States' },
                    { stateName: 'Rhode Island', abr: 'RI', country: 'United States' },
                    { stateName: 'South Carolina', abr: 'SC', country: 'United States' },
                    { stateName: 'South Dakota', abr: 'SD', country: 'United States' },
                    { stateName: 'Tennessee', abr: 'TN', country: 'United States' },
                    { stateName: 'Texas', abr: 'TX', country: 'United States' },
                    { stateName: 'Utah', abr: 'UT', country: 'United States' },
                    { stateName: 'Vermont', abr: 'VT', country: 'United States' },
                    { stateName: 'Virginia', abr: 'VA', country: 'United States' },
                    { stateName: 'Washington', abr: 'WA', country: 'United States' },
                    { stateName: 'West Virginia', abr: 'WV', country: 'United States' },
                    { stateName: 'Wisconsin', abr: 'WI', country: 'United States' },
                    { stateName: 'Wyoming', abr: 'WY', country: 'United States' },
                    { stateName: 'Alberta', abr: 'AB', country: 'Canadaada' },
                    { stateName: 'British Columbia', abr: 'BC', country: 'Canada' },
                    { stateName: 'Manitoba', abr: 'MB', country: 'Canada' },
                    { stateName: 'New Brunswick', abr: 'NB', country: 'Canada' },
                    { stateName: 'Newfoundland and Labrador', abr: 'NL', country: 'Canada' },
                    { stateName: 'Northwest Territories', abr: 'NT', country: 'Canada' },
                    { stateName: 'Nova Scotia', abr: 'NS', country: 'Canada' },
                    { stateName: 'Nunavut', abr: 'NU', country: 'Canada' },
                    { stateName: 'Ontario', abr: 'ON', country: 'Canada' },
                    { stateName: 'Prince Edward Island', abr: 'PE', country: 'Canada' },
                    { stateName: 'Quebec', abr: 'QC', country: 'Canada' },
                    { stateName: 'Saskatchewan', abr: 'SK', country: 'Canada' },
                    { stateName: 'Yukon', abr: 'YT', country: 'Canada' }
                   ]);

    viewModel.statesToShow = ko.computed(function () {
        return ko.utils.arrayFilter(viewModel.states(), function (st) { return st.country == viewModel.selectedCountry(); });
    });


    viewModel.yearList = ko.observableArray();

    //Adds yeas to year list. 
    viewModel.addYears = function () {
        for (var i = new Date().getFullYear() ; i < new Date().getFullYear() + 7; i++) {
            viewModel.yearList.push({ yearNum: i });
        }
    };

    //Load card Data
    cardData = ko.computed(function () {
        var name = pfNewAcct.firstname + " " + pfNewAcct.lastname;
        viewModel.cardName(name);
        viewModel.address1(pfNewAcct.address1);
        viewModel.address2(pfNewAcct.address2);
        viewModel.selectedCountry(pfNewAcct.selectedCountry);
        viewModel.selectedState(pfNewAcct.selectedState);
        viewModel.city(pfNewAcct.city);
        viewModel.zipCode(pfNewAcct.zipCode);

    });


    viewModel.setBTTEst = function () {
        if (pfNewAcct.ShowFFProgTF) {
            viewModel.btSubmitText('Continue');
        }
    };
    viewModel.setBTTEst();
    viewModel.addYears();
    return viewModel;
};




﻿PreflightMobile2.cardDetails = function (params) {
    var viewModel = {      
        viewShown: function () {
            setNavBar(false); //Show NavBar.
        },

        //misc observables
        errorList: ko.observableArray(),
        selectedPrefix: ko.observable(),
        cardnumber: ko.observable(),
        passedID: ko.observable(params.id == '-1' ? 'New Card' : params.id),

        //STARD Form values
        firstname: ko.observable().extend({
            required: {
                message: "First Name required",
                params: true
            }
        }),

        middlename: ko.observable(),

        lastname: ko.observable().extend({
            required: {
                message: "Last Name required",
                params: true
            }
        }),

        newpassword: ko.observable().extend({
            required: {
                message: "Password required",
                params: true
            },
            pattern: {
                message: "Must include one upper case letter, one lower case letter, one number, and a length of 7 or more characters.",
                params: "(?=^.{7,}$)((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s))^.*"
            }
        }),

        selquestionID: ko.observable().extend({
            required: {
                message: "Select a question",
                params: true
            }
        }),

        NewChallengeAnswer: ko.observable().extend({
            required: {
                message: "Enter an Answer",
                params: true
            }
        })

        //END Form values
    };

    viewModel.btSubmit = function () {
        var validationResult = ko.validation.group(viewModel, { deep: true });        
        if (viewModel.isValid()) {
            var deferred = new $.Deferred();
            $.ajax({
                dataType: "json",
                url: apiUrl + "API/Card/save",
                headers: { 'Authorization': 'Session ' + pfUser.authToken },
                type: 'POST',
                data: {
                    cardID: params.id,
                    firstname: viewModel.firstname(),
                    middlename: viewModel.middlename(),
                    lastname: viewModel.lastname(),
                    password: viewModel.newpassword(),
                    AuthQuestionID: viewModel.selquestionID(),
                    AuthQuestionAnswer: viewModel.NewChallengeAnswer(),
                    cardnumber: viewModel.cardnumber()
                },
                async: false,
                success: function (result) {
                    var r = result[0];
                    if (!r.Success) {
                        viewModel.errorList(result);
                    }
                    else {
                        var dialogOptions = {
                            title: 'Card Details',
                            message: 'Your card information has been saved.',
                            buttons: [
                                {
                                    text: 'OK',
                                    clickAction: function () {
                                        RemoveViewFromCache("cardList");
                                        PreflightMobile2.app.navigate("cardList");
                                    }
                                }
                            ]
                        };
                        //alert('Your card infromation has been updated.');
                        var myDialog = new DevExpress.ui.dialog.custom(dialogOptions);
                        myDialog.show();
                    }
                },
                error: function (result) {
                    pfUser.apiError(result, "cardList", "accountMenu");
                }
            });
        }
        else {
            validationResult.showAllMessages();
        }
    };

    //list of prefixes
    viewModel.prefixList = ko.observableArray(
                   [{ prefixID: 'MR' },
                    { prefixID: 'MRS' },
                    { prefixID: 'MS' }
                   ]);


    viewModel.questionList = ko.computed(function () {
        var qs = "";
        var deferred = new $.Deferred();
        $
            .ajax({
                dataType: "json",
                url: apiUrl + "API/Card/questionList",
                type: 'POST',
                async: false,
                success: function (result) {
                    qs = result;
                },
                error: function (result) {
                    pfUser.apiError(result, "cardList", "cardList");
                }
            });
        return qs;
    }),

    //Load card Data
    cardData = ko.computed(function () {        
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/Card/LoadFFCard",
            headers: { 'Authorization': 'Session ' + pfUser.authToken },
            type: 'POST',
            data: {
                cardID: params.id
            },
            async: false,
            success: function (result) {
                var r = result[0];               
                viewModel.selectedPrefix(r.prefix);
                viewModel.firstname(r.firstname);
                viewModel.middlename(r.middlename);
                viewModel.lastname(r.lastname);
                viewModel.newpassword(r.password);
                viewModel.selquestionID(r.AuthQuestionID);
                viewModel.cardnumber(r.cardNumber);
            },
            error: function (result) {
                pfUser.apiError(result, "cardList", "cardList");
            }
        });

    });

    getCardNumberValue = function (cNum)
    {
        console.log("Cardnumber: ", cNum);
        return params.id == '-1' ? 'New Card' : 'Card Number: ' + cNum;
    }

    return viewModel;
};


﻿PreflightMobile2.acct_Contact = function (params) {

    var viewModel = {

        forceRefresh: ko.observable(),
        viewShown: function () {
            viewModel.forceRefresh.valueHasMutated(); //force refresh of the reservationList.
            setNavBar(false); //Show NavBar.
        },


        //Read Only Address info
        currAddressLine1: ko.observable(),
        currAddressLine2: ko.observable(),
        currAddressLine3: ko.observable(),
        contactHeader: ko.observable(),
        showline2TF: ko.observable(),
        showCurrentTF: ko.observable(),
        showDateEditTF: ko.observable(),

        //START: Form values Future address 
        effectiveDate: ko.observable().extend({
            required: {
                message: "Enter an Effective Date",
            }
        }),
        address1: ko.observable().extend({
            required: {
                message: "Enter your address",
            }
        }),
        address2: ko.observable(),
        city: ko.observable().extend({
            required: {
                message: "Enter a city",
            }
        }),
        zipCode: ko.observable().extend({
            required: true,
            pattern: {
                message: "Invalid Poastal Code.",
                params: "\\d{5}(-\\d{4})?|(^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\\d{1}[A-Za-z]{1} *\\d{1}[A-Za-z]{1}\\d{1}$)"
            }
        }),
        selectedCountry: ko.observable().extend({
            required: {
                message: "Counrty Required",
            }
        }),
        selectedState: ko.observable().extend({
            required: {
                message: "State Required",
            }
        }),
        //END: Form Values
    };

    //Load account Data
    locData = ko.computed(function () {
        viewModel.forceRefresh();
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/Account/LoadAccountDets",
            headers: { 'Authorization': 'Session ' + pfUser.authToken },
            type: 'POST',
            async: false,
            success: function (result) {
                var r = result[0];
                if (r.AccountNeedsUserUpdate === "true") {
                    viewModel.showCurrentTF(false);
                    viewModel.contactHeader("Current Address");
                    viewModel.showDateEditTF(false);
                }
                else {
                    viewModel.showDateEditTF(true);
                    viewModel.showCurrentTF(true);
                    viewModel.currAddressLine1(r.billAddr1);
                    viewModel.currAddressLine2(r.billAddr2);
                    viewModel.currAddressLine3(r.billAddrCity + ", " + r.billAddrState + "  " + r.billAddrZip);
                    viewModel.showline2TF(r.billAddr2 === '' ? false : true);
                    //Future setting future address         
                    viewModel.selectedCountry(r.FutrAddrCountry);
                    viewModel.address1(r.FutrAddr1);
                    viewModel.address2(r.FutrAddr2);
                    viewModel.city(r.FutrAddrCity);
                    viewModel.selectedState(r.FutrAddrState);
                    viewModel.selectedCountry(r.FutrAddrCountry);
                    viewModel.zipCode(r.FutrAddrZip);
                    console.log("FutrFutrAddrEffDT:", new Date(moment(r.FutrFutrAddrEffDT))); //new Date(moment("2013-07-22T00:00:00")) GJS.
                    console.log("Conditional Date Check: ",
                        new Date(moment(r.FutrFutrAddrEffDT) > moment('1/1/1900') ? moment(r.FutrFutrAddrEffDT) : moment()));
                    viewModel.effectiveDate(new Date(moment(r.FutrFutrAddrEffDT) > moment('1/1/1900') ? moment(r.FutrFutrAddrEffDT): moment()));
                    viewModel.contactHeader("Future Address");
                }
            },
            error: function (result) {
                pfUser.apiError(result, "acct_Contact", "accountInfoMenu");
            }
        });
    });

    //list of states/provinces
    viewModel.states = ko.observableArray(
                   [{ stateName: 'Alabama', abr: 'AL', country: 'United States' },
                    { stateName: 'Alaska', abr: 'AK', country: 'United States' },
                    { stateName: 'Arizona', abr: 'AZ', country: 'United States' },
                    { stateName: 'Arkansas', abr: 'AR', country: 'United States' },
                    { stateName: 'California', abr: 'CA', country: 'United States' },
                    { stateName: 'Colorado', abr: 'CO', country: 'United States' },
                    { stateName: 'Connecticut', abr: 'CT', country: 'United States' },
                    { stateName: 'Delaware', abr: 'DE', country: 'United States' },
                    { stateName: 'District of Columbia', abr: 'DC', country: 'United States' },
                    { stateName: 'Florida', abr: 'FL', country: 'United States' },
                    { stateName: 'Georgia', abr: 'GA', country: 'United States' },
                    { stateName: 'Hawaii', abr: 'HI', country: 'United States' },
                    { stateName: 'Idaho', abr: 'ID', country: 'United States' },
                    { stateName: 'Illinois', abr: 'IL', country: 'United States' },
                    { stateName: 'Indiana', abr: 'IN', country: 'United States' },
                    { stateName: 'Iowa', abr: 'IA', country: 'United States' },
                    { stateName: 'Kansas', abr: 'KS', country: 'United States' },
                    { stateName: 'Kentucky', abr: 'KY', country: 'United States' },
                    { stateName: 'Louisiana', abr: 'LA', country: 'United States' },
                    { stateName: 'Maine', abr: 'ME', country: 'United States' },
                    { stateName: 'Montana', abr: 'MT', country: 'United States' },
                    { stateName: 'Nebraska', abr: 'NE', country: 'United States' },
                    { stateName: 'Nevada', abr: 'NV', country: 'United States' },
                    { stateName: 'New Hampshire', abr: 'NH', country: 'United States' },
                    { stateName: 'New Jersey', abr: 'NJ', country: 'United States' },
                    { stateName: 'New Mexico', abr: 'NM', country: 'United States' },
                    { stateName: 'New York', abr: 'NY', country: 'United States' },
                    { stateName: 'North Carolina', abr: 'NC', country: 'United States' },
                    { stateName: 'North Dakota', abr: 'ND', country: 'United States' },
                    { stateName: 'Ohio', abr: 'OH', country: 'United States' },
                    { stateName: 'Oklahoma', abr: 'OK', country: 'United States' },
                    { stateName: 'Oregon', abr: 'OR', country: 'United States' },
                    { stateName: 'Maryland', abr: 'MD', country: 'United States' },
                    { stateName: 'Massachusetts', abr: 'MA', country: 'United States' },
                    { stateName: 'Michigan', abr: 'MI', country: 'United States' },
                    { stateName: 'Minnesota', abr: 'MN', country: 'United States' },
                    { stateName: 'Mississippi', abr: 'MS', country: 'United States' },
                    { stateName: 'Missouri', abr: 'MO', country: 'United States' },
                    { stateName: 'Pennsylvania', abr: 'PA', country: 'United States' },
                    { stateName: 'Rhode Island', abr: 'RI', country: 'United States' },
                    { stateName: 'South Carolina', abr: 'SC', country: 'United States' },
                    { stateName: 'South Dakota', abr: 'SD', country: 'United States' },
                    { stateName: 'Tennessee', abr: 'TN', country: 'United States' },
                    { stateName: 'Texas', abr: 'TX', country: 'United States' },
                    { stateName: 'Utah', abr: 'UT', country: 'United States' },
                    { stateName: 'Vermont', abr: 'VT', country: 'United States' },
                    { stateName: 'Virginia', abr: 'VA', country: 'United States' },
                    { stateName: 'Washington', abr: 'WA', country: 'United States' },
                    { stateName: 'West Virginia', abr: 'WV', country: 'United States' },
                    { stateName: 'Wisconsin', abr: 'WI', country: 'United States' },
                    { stateName: 'Wyoming', abr: 'WY', country: 'United States' },
                    { stateName: 'Alberta', abr: 'AB', country: 'Canadaada' },
                    { stateName: 'British Columbia', abr: 'BC', country: 'Canada' },
                    { stateName: 'Manitoba', abr: 'MB', country: 'Canada' },
                    { stateName: 'New Brunswick', abr: 'NB', country: 'Canada' },
                    { stateName: 'Newfoundland and Labrador', abr: 'NL', country: 'Canada' },
                    { stateName: 'Northwest Territories', abr: 'NT', country: 'Canada' },
                    { stateName: 'Nova Scotia', abr: 'NS', country: 'Canada' },
                    { stateName: 'Nunavut', abr: 'NU', country: 'Canada' },
                    { stateName: 'Ontario', abr: 'ON', country: 'Canada' },
                    { stateName: 'Prince Edward Island', abr: 'PE', country: 'Canada' },
                    { stateName: 'Quebec', abr: 'QC', country: 'Canada' },
                    { stateName: 'Saskatchewan', abr: 'SK', country: 'Canada' },
                    { stateName: 'Yukon', abr: 'YT', country: 'Canada' }
                   ]);
    //list of countries
    viewModel.countries = ko.observableArray(
                   [{ country: "Canada" },
                    { country: "United States" }
                   ]);

    //cascaded list of stats/provinces based on the country selection. 
    viewModel.statesToShow = ko.computed(function () {
        return ko.utils.arrayFilter(viewModel.states(), function (st) { return st.country === viewModel.selectedCountry(); });
    });


    //Save changes to server
    btSubmit = function () {
        var validationResult = ko.validation.group(viewModel, { deep: true });
        if (viewModel.isValid()) {
            var deferred = new $.Deferred();
            $.ajax({
                dataType: "json",
                url: apiUrl + "API/Account/saveContactDetails",
                headers: { 'Authorization': 'Session ' + pfUser.authToken },
                type: 'POST',
                data: {
                    billAddr1: viewModel.address1(),
                    billAddr2: viewModel.address2(),
                    city: viewModel.city(),
                    state: viewModel.selectedState(),
                    zipcode: viewModel.zipCode(),
                    effectiveDate: moment(viewModel.effectiveDate()).format("MM/DD/YYYY"),
                    country: viewModel.selectedCountry()
                },
                async: false,
                success: function (result) {
                    //checking if the reply from the server is True or False - if its false bind the error list to show the server validation.
                    var r = result[0];
                    if (!r.Success) {
                        viewModel.errorList(result);
                    }
                    var dialogOptions = {
                        title: 'Contact Info',
                        message: 'Contact information has been saved.',
                        buttons: [
                            {
                                text: 'OK',
                                clickAction: function () {
                                    PreflightMobile2.app._viewCache.removeView("acct_Contact");
                                    PreflightMobile2.app.navigate("accountInfoMenu");
                                }
                            }
                        ]
                    };
                    //alert('Your card infromation has been updated.');
                    var myDialog = new DevExpress.ui.dialog.custom(dialogOptions);
                    myDialog.show();
                },
                error: function (result) {
                    pfUser.apiError(result, "acct_Contact", "accountInfoMenu");
                }
            });
        }
        else {
            validationResult.showAllMessages();
        }
    };

    return viewModel;
};

﻿PreflightMobile2.cardList = function (params) {

    var viewModel = {
        firstViewTF: true,
        frequentParkerList: {
            changed: new $.Callbacks(),
            load: function (loadOptions) {
                if (loadOptions.refresh) {
                    var textarray = "";
                    var deferred = new $.Deferred();
                    $
                        .ajax({
                            dataType: "json",
                            url: apiUrl + "API/Card/CardList",
                            headers: { 'Authorization': 'Session ' + pfUser.authToken },
                            type: 'POST',
                            async: false,
                            success: function (result) {
                                textarray = result;
                            },
                            error: function (result) {
                                pfUser.apiError(result, "cardList", "accountMenu");
                            }
                        });
                    return textarray;
                }
            }
        }
    };
    viewModel.viewShown = function () {
        setNavBar(false); //Show NavBar.
        (viewModel.firstViewTF == true) ? viewModel.firstViewTF = false : viewModel.frequentParkerList.changed.fire(); // Refresh Data repeat visits. (first time is automatic.)
        this.showBarcodes();
    }
    viewModel.btTest = function () {
        //console.log("btTest got pressed. 188921", $("#bc0101540010213992"));
        //console.log("btTest got pressed. 188922", $("#bc0101540010213984"));
        //$("#bc0101540010213992").barcode("0101540010213992", "code128", { barWidth: 2, barHeight: 175 });
        //$("#bc0101540010213984").barcode("0101540010213984", "code128", { barWidth: 2, barHeight: 175 });
        this.showBarcodes();
    }

    viewModel.showBarcodes = function () {
        $(".bcTarget").each(function () {
            console.log("Setting barcode for div.id: ", this.id);
            $("#" + this.id).barcode(this.id.replace("bc", ""), "code128", { barWidth: 2, barHeight: 175 });
        })
    }

    assignBarcode = function (cardNumber) {
        if (cardNumber.toLowerCase().indexOf("not set") !== -1) { //Card#s are 16.
            return "";
        }
        else {
            var div = $("#bcTarget");
            console.log("temp:", div);
            console.log("before barcode:", div[0].innerHTML);
            div.barcode(cardNumber, "code128", { barWidth: 2, barHeight: 175 });
            console.log("after barcode:", div[0].innerHTML);
            return div[0].innerHTML;
        }

    }

    //viewModel.frequentParkerList = ko.computed(function () {
    //    viewModel.forceRefresh();
    //    var textarray = "";
    //    var deferred = new $.Deferred();
    //    $
    //        .ajax({
    //            dataType: "json",
    //            url: apiUrl + "API/Card/CardList",
    //            headers: { 'Authorization': 'Session ' + pfUser.authToken },
    //            type: 'POST',
    //            async: false,           
    //            success: function (result) {
    //                textarray = result;
    //            },
    //            error: function (result) {
    //                pfUser.apiError(result, "cardList", "accountMenu");
    //            }
    //        });
    //    return textarray;
    //});

    viewModel.btAddNew = function () {
        PreflightMobile2.app.navigate("cardDetails/-1")
    };
    return viewModel;

    viewModel.frequentParkerList.filter(null);
};

﻿PreflightMobile2.expressPassDetails = function (params) {

    var viewModel = {
        viewShown: function () {
            setNavBar(false); //Show NavBar.
        },

        //Misc
        passedID: ko.observable(params.id),
        showCancel: ko.observable(),
        cardNew: ko.observable(),
        disableEdit: ko.observable(),
        showCardEdit: ko.observable(),
        errorList: ko.observableArray(),
        editCard: ko.observable(false),

        //START: Form values
        statusCD: ko.observable(),
        cardNumberReadOnly: ko.observable(),
        selectedCardText: ko.observable(),
        selectedCountry: ko.observable().extend({
            required: {
                message: "Country Required"
            }
        }),
        selectedState: ko.observable().extend({
            required: {
                message: "State Required"
            }
        }),

        selectedMonth: ko.observable().extend({
            required: {
                message: "Month Required"
            }
        }),
        selectedYear: ko.observable().extend({
            required: {
                message: "Year Required"
            }
        }),
        cardName: ko.observable().extend({
            required: {
                message: "Name Required"
            }
        }),
        selectedCard: ko.observable().extend({
            required: {
                message: "Select Card"
            }
        }),
        promoCode: ko.observable(),

        address1: ko.observable().extend({
            required: {
                message: "Enter your address",
            }
        }),
        address2: ko.observable(),
        //END: Form values

        //State and City list - these are used to cascade the selection
        city: ko.observable().extend({
            required: {
                message: "Enter a city",
            }
        }),
        zipCode: ko.observable().extend({
            required: true,
            pattern: {
                message: "Invalid Poastal Code.",
                params: "\\d{5}(-\\d{4})?|(^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\\d{1}[A-Za-z]{1} *\\d{1}[A-Za-z]{1}\\d{1}$)"
            }
        }),

        //Save to sever
        btSubmit: function () {
            var validationResult = ko.validation.group(viewModel, { deep: true });
            if (viewModel.isValid()) {
                if (params.id == "-1") {
                    var dialogOptions = {
                        title: 'Terms and Conditions',
                        message: 'I have read and agree to the following terms and conditions: I or the issuer may cancel the card at any time. PreFlight reserves the right to change the program without notice. I agree to supply the requested information on the application and I guarantee the accuracy of the information. Terms and Conditions. 1) By clicking "Process Application" you agree to pay the one time setup fee if applicable. 2) Setup fee will not be refunded upon cancellation.',
                        buttons: [
                            {
                                text: 'I Agreee',
                                clickAction: function () {
                                    viewModel.saveExpPass();
                                }
                            },
                            {
                                text: 'Cancel',
                                clickAction: function () {
                                }
                            }
                        ]
                    };
                    //alert('Your card infromation has been updated.');
                    var myDialog = new DevExpress.ui.dialog.custom(dialogOptions);
                    myDialog.show();
                }
                else {
                    viewModel.saveExpPass();
                }
            }
            else {
                validationResult.showAllMessages();
            }
        },



        //Cancel the express pass
        btCancelCard: function () {
            var dialogOptions = {
                title: 'Warning',
                message: 'Are you sure you want to cancel this card? This cannot be undone.',
                buttons: [{
                    text: "Yes",
                    clickAction: function () {
                        cancelCard();
                    }
                }, {
                    text: "No",
                    clickAction: function () {
                        return false
                    }
                }]

            };
            //alert('Your card infromation has been updated.');
            var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
            cusconfirm.show();
        }
    };

    cancelCard = function () {
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/ExpressPass/delete",
            headers: { 'Authorization': 'Session ' + pfUser.authToken },
            type: 'POST',
            data: {
                expresspassID: params.id
            },
            async: false,
            success: function (result) {
                var r = result[0];
                if (!r.Success) {
                    viewModel.errorList(result);
                }
                else {
                    DevExpress.ui.dialog.alert("Card is now peniding cancellation", "Alert!");
                    RemoveViewFromCache("expressPassList");
                    PreflightMobile2.app.navigate("expressPassList");
                }
            },
            error: function (result) {
                pfUser.apiError(result, "expressPassDetails", "expressPassList");
            }
        });
    };

    viewModel.saveExpPass = function () {
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/ExpressPass/save",
            headers: { 'Authorization': 'Session ' + pfUser.authToken },
            type: 'POST',
            data: {
                expresspassID: params.id,
                cardnumber: viewModel.cardNumber(),
                cardTypeID: viewModel.selectedCard(),
                EPCardName: viewModel.cardName,
                EPCardExpMonth: viewModel.selectedMonth(),
                EPCardExpYear: viewModel.selectedYear(),
                EPAddress1: viewModel.address1(),
                EPAddress2: viewModel.address2(),
                EPCity: viewModel.city(),
                EPCardCountry: viewModel.selectedCountry(),
                EPCardState: viewModel.selectedState(),
                EPPostalCD: viewModel.zipCode(),
                EPPromoCD: viewModel.promoCode()
            },
            async: false,
            success: function (result) {
                var r = result[0];
                if (!r.Success) {
                    viewModel.errorList(result);
                    //viewModel.toastMessage("There was an issue saving your data");
                    //var toast = $("#toast-success").data("dxToast");
                    //toast.show();
                }
                else {
                    var dialogOptions = {
                        title: 'Card Details',
                        message: 'Your card information has been saved.',
                        buttons: [
                            {
                                text: 'OK',
                                clickAction: function () {
                                    RemoveViewFromCache("expressPassList");
                                    PreflightMobile2.app.navigate("expressPassList");
                                }
                            }
                        ]
                    };
                    //alert('Your card infromation has been updated.');
                    var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
                    cusconfirm.show();
                }
            },
            error: function (result) {
                pfUser.apiError(result, "expressPassDetails", "expressPassList");
            }
        });
    };

    //Make Card editable and hide the read only "display text"
    viewModel.bteditCard = function () {
        viewModel.editCard(true);
        viewModel.showCardEdit(false);
        viewModel.cardNumberReadOnly('');
        $("#cardReadOnly").hide();
        viewModel.cardNumber('');
    };


    viewModel.cardNumber = ko.observable().extend({
        required: {
            message: "Enter Card Number",
            onlyIF: function () {
                return viewModel.editCard();
            }
        },

        pattern: {
            message: "Invalid Card Number.",
            params: "^(?:(?:4\\d{3})|(?:5[1-5]\\d{2})|(?:6011)|(?:(?:3[68]\\d{2})|(?:30[012345]\\d))|(?:3[47]\\d{2}))([ -]?)(?:(?:\\d{6}\\1\\d{5})|(?:\\d{6}\\1\\d{4})|(?:\\d{4}\\1\\d{4}\\1\\d{4}))$ |" +
                    "^(?:3[47]\\d{2})([ -]?)(?:\\d{6}\\1\\d{5})|" +
                    "^(?:(?:(?:3[68]\\d{2})|(?:30[012345]\\d)))([ -]?)(?:\\d{6}\\1\\d{4})$|" +
                    "^(?:6011)([ -]?)(?:\\d{4}\\1\\d{4}\\1\\d{4})$|" +
                    "^(?:5[1-5]\\d{2})([ -]?)(?:\\d{4}\\1\\d{4}\\1\\d{4})$|" +
                    "^(?:4\\d{3})([ -]?)((?:\\d{4}\\1\\d{4}\\1\\d{4})|(?:\\d{3}\\1\\d{3}\\1\\d{3}))$",
            onlyIF: function () {
                return viewModel.editCard();
            }
        }
    });

    viewModel.cardList = ko.observableArray(
               [{ cardType: "AMEX", value: 1 },
                { cardType: "VISA", value: 2 },
                { cardType: "MASTERCARD", value: 3 },
                { cardType: "DINERS CLUB", value: 4 }
               ]);


    viewModel.monthList = ko.observableArray(
                   [{ monthNum: "01" },
                    { monthNum: "02" },
                    { monthNum: "03" },
                    { monthNum: "04" },
                    { monthNum: "05" },
                    { monthNum: "06" },
                    { monthNum: "07" },
                    { monthNum: "08" },
                    { monthNum: "09" },
                    { monthNum: "10" },
                    { monthNum: "11" },
                    { monthNum: "12" }
                   ]);

    //list of countries
    viewModel.countries = ko.observableArray(
                   [{ country: "Canada" },
                    { country: "US" }
                   ]);

    //list of states/provinces
    viewModel.states = ko.observableArray(
                   [{ stateName: 'Alabama', abr: 'AL', country: 'US' },
                    { stateName: 'Alaska', abr: 'AK', country: 'US' },
                    { stateName: 'Arizona', abr: 'AZ', country: 'US' },
                    { stateName: 'Arkansas', abr: 'AR', country: 'US' },
                    { stateName: 'California', abr: 'CA', country: 'US' },
                    { stateName: 'Colorado', abr: 'CO', country: 'US' },
                    { stateName: 'Connecticut', abr: 'CT', country: 'US' },
                    { stateName: 'Delaware', abr: 'DE', country: 'US' },
                    { stateName: 'District of Columbia', abr: 'DC', country: 'US' },
                    { stateName: 'Florida', abr: 'FL', country: 'US' },
                    { stateName: 'Georgia', abr: 'GA', country: 'US' },
                    { stateName: 'Hawaii', abr: 'HI', country: 'US' },
                    { stateName: 'Idaho', abr: 'ID', country: 'US' },
                    { stateName: 'Illinois', abr: 'IL', country: 'US' },
                    { stateName: 'Indiana', abr: 'IN', country: 'US' },
                    { stateName: 'Iowa', abr: 'IA', country: 'US' },
                    { stateName: 'Kansas', abr: 'KS', country: 'US' },
                    { stateName: 'Kentucky', abr: 'KY', country: 'US' },
                    { stateName: 'Louisiana', abr: 'LA', country: 'US' },
                    { stateName: 'Maine', abr: 'ME', country: 'US' },
                    { stateName: 'Montana', abr: 'MT', country: 'US' },
                    { stateName: 'Nebraska', abr: 'NE', country: 'US' },
                    { stateName: 'Nevada', abr: 'NV', country: 'US' },
                    { stateName: 'New Hampshire', abr: 'NH', country: 'US' },
                    { stateName: 'New Jersey', abr: 'NJ', country: 'US' },
                    { stateName: 'New Mexico', abr: 'NM', country: 'US' },
                    { stateName: 'New York', abr: 'NY', country: 'US' },
                    { stateName: 'North Carolina', abr: 'NC', country: 'US' },
                    { stateName: 'North Dakota', abr: 'ND', country: 'US' },
                    { stateName: 'Ohio', abr: 'OH', country: 'US' },
                    { stateName: 'Oklahoma', abr: 'OK', country: 'US' },
                    { stateName: 'Oregon', abr: 'OR', country: 'US' },
                    { stateName: 'Maryland', abr: 'MD', country: 'US' },
                    { stateName: 'Massachusetts', abr: 'MA', country: 'US' },
                    { stateName: 'Michigan', abr: 'MI', country: 'US' },
                    { stateName: 'Minnesota', abr: 'MN', country: 'US' },
                    { stateName: 'Mississippi', abr: 'MS', country: 'US' },
                    { stateName: 'Missouri', abr: 'MO', country: 'US' },
                    { stateName: 'Pennsylvania', abr: 'PA', country: 'US' },
                    { stateName: 'Rhode Island', abr: 'RI', country: 'US' },
                    { stateName: 'South Carolina', abr: 'SC', country: 'US' },
                    { stateName: 'South Dakota', abr: 'SD', country: 'US' },
                    { stateName: 'Tennessee', abr: 'TN', country: 'US' },
                    { stateName: 'Texas', abr: 'TX', country: 'US' },
                    { stateName: 'Utah', abr: 'UT', country: 'US' },
                    { stateName: 'Vermont', abr: 'VT', country: 'US' },
                    { stateName: 'Virginia', abr: 'VA', country: 'US' },
                    { stateName: 'Washington', abr: 'WA', country: 'US' },
                    { stateName: 'West Virginia', abr: 'WV', country: 'US' },
                    { stateName: 'Wisconsin', abr: 'WI', country: 'US' },
                    { stateName: 'Wyoming', abr: 'WY', country: 'US' },
                    { stateName: 'Alberta', abr: 'AB', country: 'Canadaada' },
                    { stateName: 'British Columbia', abr: 'BC', country: 'Canada' },
                    { stateName: 'Manitoba', abr: 'MB', country: 'Canada' },
                    { stateName: 'New Brunswick', abr: 'NB', country: 'Canada' },
                    { stateName: 'Newfoundland and Labrador', abr: 'NL', country: 'Canada' },
                    { stateName: 'Northwest Territories', abr: 'NT', country: 'Canada' },
                    { stateName: 'Nova Scotia', abr: 'NS', country: 'Canada' },
                    { stateName: 'Nunavut', abr: 'NU', country: 'Canada' },
                    { stateName: 'Ontario', abr: 'ON', country: 'Canada' },
                    { stateName: 'Prince Edward Island', abr: 'PE', country: 'Canada' },
                    { stateName: 'Quebec', abr: 'QC', country: 'Canada' },
                    { stateName: 'Saskatchewan', abr: 'SK', country: 'Canada' },
                    { stateName: 'Yukon', abr: 'YT', country: 'Canada' }
                   ]);

    viewModel.statesToShow = ko.computed(function () {
        return ko.utils.arrayFilter(viewModel.states(), function (st) { return st.country == viewModel.selectedCountry(); });
    });

    viewModel.yearList = ko.observableArray();

    //Adds yeas to year list. 
    viewModel.addYears = function () {
        for (var i = new Date().getFullYear() ; i < new Date().getFullYear() + 7; i++) {
            viewModel.yearList.push({ yearNum: i });
        }
    };

    //Load card Data
    cardData = ko.computed(function () {

        if (viewModel.passedID() == "0") {
            console.log("expressPassDetails: new card()");
            return "";
            return;
        }

        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/ExpressPass/RExpCard",
            headers: { 'Authorization': 'Session ' + pfUser.authToken },
            type: 'POST',
            data: {
                expressPassID: params.id
            },
            async: false,
            success: function (result) {
                var r = result[0];
                viewModel.cardName(r.EPCardName);
                viewModel.cardNumberReadOnly(r.CardLastFour);
                viewModel.selectedMonth(r.EPCardExpMonth);
                viewModel.selectedYear(r.EPCardExpYear);
                viewModel.address1(r.EPAddress1);
                viewModel.address2(r.EPAddress2);
                viewModel.promoCode(r.EPPromoCD);
                viewModel.selectedCard(r.CreditCardName);
                viewModel.selectedCountry(r.EPCardCountry);
                viewModel.selectedState(r.EPCardState);
                viewModel.selectedCard(r.cardTypeID);
                viewModel.city(r.EPCity);
                viewModel.zipCode(r.EPPostalCD);
                viewModel.statusCD(r.statusCD);
            },
            error: function (result) {
                pfUser.apiError(result, "expressPassDetails", "expressPassList");
            }
        });

    });

    setContols = function () {
        if (viewModel.passedID() == "0") {
            console.log("expressPassDetails: setControls() starting...");
            viewModel.editCard(true);
            viewModel.showCardEdit(false);
            viewModel.showCancel(false);
            viewModel.statusCD("NEW CARD");
            $("#cardReadOnly").hide();
        }
        else {
            viewModel.editCard(false);
            viewModel.showCardEdit(true);
            viewModel.showCancel(true);
        }
    };

    setContols();
    viewModel.addYears();
    return viewModel;
};




﻿
PreflightMobile2.acct_SignUp = function (params) {
    var viewModel = {

        //hidden values             
        acctErrorList: ko.observableArray(),
        cardErrorList: ko.observableArray(),
        expErrorList: ko.observableArray(),
        //*** Error list displays the server validation errors at the top of the list/or view***
        btSubmitText: ko.observable('Create Account'),
        barcodeOnlyTF: ko.observable(),
        EPSignupTF: ko.observable(),

        //START Form Values:        
        promoCD: ko.observable(''),
        selectedPrefix: ko.observable(''),

        firstname: ko.observable('').extend({
            required: {
                message: "First Name required",
                params: true
            }
        }),
        middlename: ko.observable(''),
        lastname: ko.observable('').extend({
            required: {
                message: "Last Name required",
                params: true
            }
        }),
        selquestionID: ko.observable('').extend({
            required: {
                message: "Select a question",
                params: true
            }
        }),
        NewChallengeAnswer: ko.observable('').extend({
            required: {
                message: "Enter an Answer",
                params: true
            }
        }),

        address1: ko.observable('').extend({
            required: {
                message: "Enter your address",
            }
        }),
        address2: ko.observable(''),
        city: ko.observable('').extend({
            required: {
                message: "Enter a city",
            }
        }),
        zipCode: ko.observable('').extend({
            required: true,
            pattern: {
                message: "Invalid Poastal Code.",
                params: "\\d{5}(-\\d{4})?|(^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\\d{1}[A-Za-z]{1} *\\d{1}[A-Za-z]{1}\\d{1}$)"
            }
        }),
        selectedCountry: ko.observable('').extend({
            required: {
                message: "Counrty Required",
            }
        }),
        selectedState: ko.observable('').extend({
            required: {
                message: "State Required",
            }
        }),

        companyName: ko.observable(''),
        email: ko.observable('').extend({
            required: true,
            pattern: {
                message: "Invalid email.",
                params: "[\\w']+([-+.][\\w']+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*"
            }
        }),
        dayPhone: ko.observable('').extend({
            required: true,
            pattern: {
                message: "Invalid phone number.",
                params: "^(([2-9]{1}\\d{2}[/.]\\d{3}[.]\\d{4})|([2-9]{1}\\d{2}[/-]\\d{3}[-]\\d{4})|([2-9]{1}\\d{9})|(\\([2-9]{1}\\d{2}\\)\\s\\d{3}-\\d{4}))$"
            }
        }),
        mobilePhone: ko.observable('').extend({
            pattern: {
                message: "Invalid mobile number.",
                params: "^(([2-9]{1}\\d{2}[/.]\\d{3}[.]\\d{4})|([2-9]{1}\\d{2}[/-]\\d{3}[-]\\d{4})|([2-9]{1}\\d{9})|(\\([2-9]{1}\\d{2}\\)\\s\\d{3}-\\d{4}))$"
            }
        }),
        selectedStatement: ko.observable('').extend({
            required: {
                message: "Required"
            }
        }),

        selectedLoc: ko.observable('').extend({
            required: {
                message: "Select a location"
            }
        }),
        corpCode: ko.observable(''),
        //END Form views

        btSubmit: function () {
            var validationResult = ko.validation.group(viewModel, { deep: true });
            //alert(viewModel.isValid());
            if (viewModel.isValid()) {
                viewModel.storeAcctInfo();
                //Send to Express Pass Sign up
                //if (pfNewAcct.ExpressPassTF) {
                //   PreflightMobile2.app.navigate("acct_SignUpCard");
                //}
                //send to FF sign up
                if (pfNewAcct.ShowFFProgTF) {
                    PreflightMobile2.app.navigate("acct_SignUpFF");
                }
                    //done, submit and save the data. 
                else {
                    var dialogOptions = {
                        title: 'Terms and Conditions',
                        message: 'I request that a Frequent Parker account be opened for me. I have read and agree to the following terms and conditions: I or the issuer may cancel the card at any time. PreFlight reserves the right to change the program without notice. I agree to supply the requested information on the application and I guarantee the accuracy of the information.',
                        buttons: [
                            {
                                text: 'I Agreee',
                                clickAction: function () {
                                    viewModel.createAcct();
                                }
                            },
                            {
                                text: 'Cancel',
                                clickAction: function () {

                                }
                            }
                        ]
                    };
                    //alert('Your card infromation has been updated.');
                    var myDialog = new DevExpress.ui.dialog.custom(dialogOptions);
                    myDialog.show();
                }
            }
            else {
                validationResult.showAllMessages();
                DevExpress.ui.dialog.alert(msg_RequiredField, "Missing Field!");
            }

        },

        viewShown: function () { setNavBar(false); }, //Show NavBar.

    };

    viewModel.password = ko.observable('').extend({
        required: {
            message: "Enter Password"
        },
        pattern: {
            message: "Must include one upper case letter, one lower case letter, one number, and a length of 7 or more characters.",
            params: "(?=^.{7,}$)((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s))^.*"
        },
    });

    viewModel.passwordconfirm = ko.observable('').extend({
        required: {
            message: "Confirm Password"
        },
        pattern: {
            message: "Must include one upper case letter, one lower case letter, one number, and a length of 7 or more characters.",
            params: "(?=^.{7,}$)((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s))^.*"
        },
        validation: {
            validator: function (val, params) {
                console.log("val", val)
                var otherValue = params;
                console.log("viewModlePassword", viewModel.password())
                return val === viewModel.password();
            },
            message: 'Passwords do not match.',
            params: viewModel.password(),
            onlyIf: viewModel.password().lenght > 0
        }
    });

    viewModel.createAcct = function () {
        {
            var deferred = new $.Deferred();
            $.ajax({
                dataType: "json",
                url: apiUrl + "API/Account/createNewAccount",
                type: 'POST',
                data: {
                    promoCD: pfNewAcct.promoCD,
                    selectedPrefix: pfNewAcct.selectedPrefix,
                    corpProgram: pfNewAcct.corpProgram,
                    firstname: pfNewAcct.firstname,
                    middlename: pfNewAcct.middlename,
                    lastname: pfNewAcct.lastname,
                    password: pfNewAcct.password,
                    AuthQuestionID: pfNewAcct.AuthQuestionID,
                    AuthQuestionAnswer: pfNewAcct.AuthQuestionAnswer,
                    address1: pfNewAcct.address1,
                    address2: pfNewAcct.address2,
                    city: pfNewAcct.city,
                    zipCode: pfNewAcct.zipCode,
                    country: pfNewAcct.selectedCountry,
                    state: pfNewAcct.selectedState,
                    accountName: pfNewAcct.accountName,
                    companyName: pfNewAcct.companyName,
                    email: pfNewAcct.email,
                    phone1: pfNewAcct.dayPhone,
                    phone2: pfNewAcct.mobilePhone,
                    corpCode: pfNewAcct.corpCode,
                    corpProgram: pfNewAcct.corpProgram,
                    locID: pfNewAcct.locID,
                    stmtDeliveryMethod: pfNewAcct.stmtDeliveryMethod,
                    barcodeOnlyTF: pfNewAcct.barcodeOnlyTF
                },
                async: false,
                success: function (result) {
                    //checking if the reply from the server is True or False - if its false bind the error list to show the server validation.                 
                    console.log(result);
                    console.log(result[0]);
                    var r = result[0];
                    if (!r.Success) {
                        viewModel.cardErrorList(r.cardErrorList);
                        viewModel.acctErrorList(r.acctErrorList);
                        viewModel.expErrorList(r.expErrorList)
                    }
                    var dialogOptions = {
                        title: 'Account Created',
                        message: 'Your account has been created, you can now login.',
                        buttons: [
                            {
                                text: 'OK',
                                clickAction: function () {
                                    pfNewAcct = "";
                                    RemoveViewFromCache("acct_SignUp");
                                    PreflightMobile2.app.navigate("login", { root: true });
                                }
                            }
                        ]
                    };
                    //alert('Your card infromation has been updated.');
                    var myDialog = new DevExpress.ui.dialog.custom(dialogOptions);
                    myDialog.show();
                },
                //TODO: Handle connection issue, or security auth
                error: function (result) {
                    pfUser.apiError(result, "acct_signUp", "menuMain");
                }
            });
        }
    }


    //load status list
    viewModel.statusList = ko.computed(function () {
        var deferred = new $.Deferred();
        $
            .ajax({
                dataType: "json",
                url: apiUrl + "API/Account/statusList",
                type: 'POST',
                async: false,
                success: function (result) {
                    sl = result;
                },
            });
        return sl;
    }),

    //load location list
    viewModel.locationList = ko.computed(function () {
        var deferred = new $.Deferred();
        $
            .ajax({
                dataType: "json",
                url: apiUrl + "API/Home/locationLookupList",
                type: 'POST',
                async: false,
                success: function (result) {
                    ll = result;
                },
            });
        return ll;
    });

    //Load Question List
    viewModel.questionList = ko.computed(function () {
        var deferred = new $.Deferred();
        $
            .ajax({
                dataType: "json",
                url: apiUrl + "API/Card/questionList",
                type: 'POST',
                async: false,
                success: function (result) {
                    qs = result;
                },
            });
        return qs;
    }),

    //list of states/provinces
    viewModel.states = ko.observableArray(
                   [{ stateName: 'Alabama', abr: 'AL', country: 'United States' },
                    { stateName: 'Alaska', abr: 'AK', country: 'United States' },
                    { stateName: 'Arizona', abr: 'AZ', country: 'United States' },
                    { stateName: 'Arkansas', abr: 'AR', country: 'United States' },
                    { stateName: 'California', abr: 'CA', country: 'United States' },
                    { stateName: 'Colorado', abr: 'CO', country: 'United States' },
                    { stateName: 'Connecticut', abr: 'CT', country: 'United States' },
                    { stateName: 'Delaware', abr: 'DE', country: 'United States' },
                    { stateName: 'District of Columbia', abr: 'DC', country: 'United States' },
                    { stateName: 'Florida', abr: 'FL', country: 'United States' },
                    { stateName: 'Georgia', abr: 'GA', country: 'United States' },
                    { stateName: 'Hawaii', abr: 'HI', country: 'United States' },
                    { stateName: 'Idaho', abr: 'ID', country: 'United States' },
                    { stateName: 'Illinois', abr: 'IL', country: 'United States' },
                    { stateName: 'Indiana', abr: 'IN', country: 'United States' },
                    { stateName: 'Iowa', abr: 'IA', country: 'United States' },
                    { stateName: 'Kansas', abr: 'KS', country: 'United States' },
                    { stateName: 'Kentucky', abr: 'KY', country: 'United States' },
                    { stateName: 'Louisiana', abr: 'LA', country: 'United States' },
                    { stateName: 'Maine', abr: 'ME', country: 'United States' },
                    { stateName: 'Montana', abr: 'MT', country: 'United States' },
                    { stateName: 'Nebraska', abr: 'NE', country: 'United States' },
                    { stateName: 'Nevada', abr: 'NV', country: 'United States' },
                    { stateName: 'New Hampshire', abr: 'NH', country: 'United States' },
                    { stateName: 'New Jersey', abr: 'NJ', country: 'United States' },
                    { stateName: 'New Mexico', abr: 'NM', country: 'United States' },
                    { stateName: 'New York', abr: 'NY', country: 'United States' },
                    { stateName: 'North Carolina', abr: 'NC', country: 'United States' },
                    { stateName: 'North Dakota', abr: 'ND', country: 'United States' },
                    { stateName: 'Ohio', abr: 'OH', country: 'United States' },
                    { stateName: 'Oklahoma', abr: 'OK', country: 'United States' },
                    { stateName: 'Oregon', abr: 'OR', country: 'United States' },
                    { stateName: 'Maryland', abr: 'MD', country: 'United States' },
                    { stateName: 'Massachusetts', abr: 'MA', country: 'United States' },
                    { stateName: 'Michigan', abr: 'MI', country: 'United States' },
                    { stateName: 'Minnesota', abr: 'MN', country: 'United States' },
                    { stateName: 'Mississippi', abr: 'MS', country: 'United States' },
                    { stateName: 'Missouri', abr: 'MO', country: 'United States' },
                    { stateName: 'Pennsylvania', abr: 'PA', country: 'United States' },
                    { stateName: 'Rhode Island', abr: 'RI', country: 'United States' },
                    { stateName: 'South Carolina', abr: 'SC', country: 'United States' },
                    { stateName: 'South Dakota', abr: 'SD', country: 'United States' },
                    { stateName: 'Tennessee', abr: 'TN', country: 'United States' },
                    { stateName: 'Texas', abr: 'TX', country: 'United States' },
                    { stateName: 'Utah', abr: 'UT', country: 'United States' },
                    { stateName: 'Vermont', abr: 'VT', country: 'United States' },
                    { stateName: 'Virginia', abr: 'VA', country: 'United States' },
                    { stateName: 'Washington', abr: 'WA', country: 'United States' },
                    { stateName: 'West Virginia', abr: 'WV', country: 'United States' },
                    { stateName: 'Wisconsin', abr: 'WI', country: 'United States' },
                    { stateName: 'Wyoming', abr: 'WY', country: 'United States' },
                    { stateName: 'Alberta', abr: 'AB', country: 'Canadaada' },
                    { stateName: 'British Columbia', abr: 'BC', country: 'Canada' },
                    { stateName: 'Manitoba', abr: 'MB', country: 'Canada' },
                    { stateName: 'New Brunswick', abr: 'NB', country: 'Canada' },
                    { stateName: 'Newfoundland and Labrador', abr: 'NL', country: 'Canada' },
                    { stateName: 'Northwest Territories', abr: 'NT', country: 'Canada' },
                    { stateName: 'Nova Scotia', abr: 'NS', country: 'Canada' },
                    { stateName: 'Nunavut', abr: 'NU', country: 'Canada' },
                    { stateName: 'Ontario', abr: 'ON', country: 'Canada' },
                    { stateName: 'Prince Edward Island', abr: 'PE', country: 'Canada' },
                    { stateName: 'Quebec', abr: 'QC', country: 'Canada' },
                    { stateName: 'Saskatchewan', abr: 'SK', country: 'Canada' },
                    { stateName: 'Yukon', abr: 'YT', country: 'Canada' }
                   ]);

    //list of countries
    viewModel.countries = ko.observableArray(
                   [{ country: "Canada" },
                    { country: "United States" }
                   ]);

    //cascaded list of stats/provinces based on the country selection. 
    viewModel.statesToShow = ko.computed(function () {
        return ko.utils.arrayFilter(viewModel.states(), function (st) { return st.country === viewModel.selectedCountry(); });
    });

    //Stores form data to the pfNewAcct obj
    viewModel.storeAcctInfo = function () {
        pfNewAcct.promoCD = viewModel.promoCD();
        pfNewAcct.selectedPrefix = viewModel.selectedPrefix();
        pfNewAcct.corpProgram = corpProgram;
        pfNewAcct.firstname = viewModel.firstname();
        pfNewAcct.middlename = viewModel.middlename();
        pfNewAcct.lastname = viewModel.lastname();
        pfNewAcct.password = viewModel.password();
        pfNewAcct.AuthQuestionID = viewModel.selquestionID();
        pfNewAcct.AuthQuestionAnswer = viewModel.NewChallengeAnswer();
        pfNewAcct.address1 = viewModel.address1();
        pfNewAcct.address2 = viewModel.address2();
        pfNewAcct.city = viewModel.city();
        pfNewAcct.zipCode = viewModel.zipCode();
        pfNewAcct.selectedCountry = viewModel.selectedCountry();
        pfNewAcct.selectedState = viewModel.selectedState();
        pfNewAcct.companyName = viewModel.companyName();
        pfNewAcct.email = viewModel.email();
        pfNewAcct.dayPhone = viewModel.dayPhone();
        pfNewAcct.mobilePhone = viewModel.mobilePhone();
        pfNewAcct.corpCode = viewModel.corpCode();
        pfNewAcct.stmtDeliveryMethod = viewModel.selectedStatement();
        pfNewAcct.barcodeOnlyTF = viewModel.barcodeOnlyTF();
    };

   
    //load statement list
    viewModel.statement = ko.computed(function () {
        var deferred = new $.Deferred();
        $
            .ajax({
                dataType: "json",
                url: apiUrl + "API/Account/statementList",
                type: 'POST',
                async: false,
                success: function (result) {
                    sl = result;
                },
            });
        return sl;
    });

    //list of prefixes
    viewModel.prefixList = ko.observableArray(
                   [{ prefixID: 'MR' },
                    { prefixID: 'MRS' },
                    { prefixID: 'MS' }
                   ]);

    viewModel.clickTEST = function (itemData) {
        var match = ko.utils.arrayFirst(viewModel.locationList(), function (item) {
            return item.LocID == viewModel.selectedLoc();
        });
        alert(match.Abbreviation);
    };

    viewModel.selectedLoc.subscribe(function (newValue) {
        var match = ko.utils.arrayFirst(viewModel.locationList(), function (item) {
            return item.LocID == viewModel.selectedLoc();
        });

        pfNewAcct.ExpressPassTF = match.ExpressPassTF;
        pfNewAcct.incExpressPass = match.ExpressPassTF;
        pfNewAcct.ShowFFProgTF = match.ShowFFProgTF;
        pfNewAcct.locID = match.LocID;
        if (pfNewAcct.ExpressPassTF || pfNewAcct.ShowFFProgTF) {
            viewModel.btSubmitText('Continue');
        }
    });

    //Validate and fill the corp program based on the account - this will update when focus is lost from the text box, or on the button submit
    corpProgram = ko.computed(function () {
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/Account/checkCorpCode",
            type: 'POST',
            data: {
                corpCD: viewModel.corpCode()
            },
            async: false,
            success: function (result) {
                var r = result[0];
                text = r.corpProg;
            },
            error: function (result) {
                text = "None";
        }
        });
        return text;
    });

    return viewModel;
};

﻿PreflightMobile2.expressPassList = function (params) {

    var viewModel = {
        firstViewTF: true,
        EmptyText: ko.observable('No passes to show. Click the + to add a new pass.'),
        ExpPassTF: ko.observable(true),
    };
    viewModel.viewShown = function () {
        setNavBar(false); //Show NavBar.
        (viewModel.firstViewTF == true) ? viewModel.firstViewTF = false : viewModel.cardList.changed.fire(); // Refresh Data on repeat visits. (first time is automatic.)
        if (params.id == "New" && viewModel.loaded)
        {
            params.ID = "";
            viewModel.addNew();
        }
    };

    viewModel.loaded = false;

    viewModel.addNew = function () {
        if (viewModel.ExpPassTF()) {
            PreflightMobile2.app.navigate("expressPassDetails/0");
        }
        else {
            DevExpress.ui.dialog.alert('Your location does not currently support Express Passes.','Alert!');
        }
    };
    viewModel.cardList = {
        changed: new $.Callbacks(),
        load: function (loadOptions) {
            if (loadOptions.refresh) {
                var textarray = "";
                var deferred = new $.Deferred();
                $
                    .ajax({
                        dataType: "json",
                        url: apiUrl + "API/ExpressPass/ExpCardList",
                        headers: { 'Authorization': 'Session ' + pfUser.authToken },
                        type: 'POST',
                        async: false,
                        success: function (result) {
                            console.log("result:", result)
                            console.log("ExpressPassTF:", result[0].ExpressPassTF);
                            if (!result[0].ExpressPassTF) {
                                viewModel.ExpPassTF(false);                                
                                viewModel.EmptyText('This location does not support Express Passes.');
                            }
                            else {
                                console.log("aExpList:", result[0].aExpList)
                                textarray = result[0].aExpList;
                            }
                            viewModel.loaded = true;
                        },
                        error: function (result) {
                            pfUser.apiError(result, "expressPassList", "accountMenu");
                        }
                    });
                return textarray;
            }
        }
    };


    return viewModel;
};




﻿PreflightMobile2.acct_FrequentFlier = function (params) {

    var viewModel = {
        forceRefresh: ko.observable(),
        viewShown: function () {
            viewModel.forceRefresh.valueHasMutated(); //force refresh of the reservationList.
            setNavBar(false); //Show NavBar.
        },

        selectedPromo: ko.observable(),
        accountNumber: ko.observable(),

        accNumReq: ko.observable(false),

        //Save changes to server
        btSubmit: function () {
            var validationResult = ko.validation.group(viewModel, { deep: true });
            if (viewModel.isValid()) {
                var deferred = new $.Deferred();
                $.ajax({
                    dataType: "json",
                    url: apiUrl + "API/Account/saveFrequentFlierDetails",
                    headers: { 'Authorization': 'Session ' + pfUser.authToken },
                    type: 'POST',
                    data: {
                        ffProgID: viewModel.selectedPromo(),
                        ffAccountNumber: viewModel.accountNumber()
                    },
                    async: false,
                    success: function (result) {
                        //checking if the reply from the server is True or False - if its false bind the error list to show the server validation.
                        var r = result[0];
                        if (!r.Success) {
                            viewModel.errorList(result);
                        }
                        else {
                            var dialogOptions = {
                                title: 'Frequent Flier Info',
                                message: 'Your information has been saved.',
                                buttons: [
                                    {
                                        text: 'OK',
                                        clickAction: function () {                                            
                                                RemoveViewFromCache("accountMenu");
                                                PreflightMobile2.app.navigate("accountMenu");
                                        }
                                    }
                                ]
                            };
                            //alert('Your card infromation has been updated.');
                            var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
                            cusconfirm.show();
                        }
                    },
                    error: function (result) {
                        pfUser.apiError(result, "acct_FrequentFlier", "accountInfoMenu");
                    }
                });
            }
            else {
                validationResult.showAllMessages();
            }
        }
    };

    //load ff progam list
    viewModel.promoList = ko.computed(function () {
        viewModel.forceRefresh()
        var sl = "";
        var deferred = new $.Deferred();
        $
            .ajax({
                dataType: "json",
                headers: { 'Authorization': 'Session ' + pfUser.authToken },
                url: apiUrl + "API/Account/ffPromoList",
                type: 'POST',
                async: false,
                success: function (result) {
                    sl = result;
                },
                error: function (result) {
                    pfUser.apiError(result, "acct_FrequentFlier", "accountInfoMenu");
                }
            });
        return sl;
    }),

    //Load ff data
    ffData = ko.computed(function () {
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/Account/LoadAccountDets",
            headers: { 'Authorization': 'Session ' + pfUser.authToken },
            type: 'POST',
            async: false,
            success: function (result) {
                var r = result[0];
                viewModel.selectedPromo(r.ffProgID);
                viewModel.accountNumber(r.ffAccountNumber);
            },
            error: function (result) {
                pfUser.apiError(result, "acct_Contact", "accountInfoMenu");
            }
        });
    });

    return viewModel;
};


﻿PreflightMobile2.ResList = function (params) {
    searchText = ko.observable('Loading...');
    searchVisible = ko.observable(false);
    dtStart = ko.observable(new Date()); // Wired to the search popup values.
    dtEnd = ko.observable(new Date());
    dtStart().setMonth(dtStart().getMonth() - 2);
    dtEnd().setMonth(dtEnd().getMonth() + 12);

    var dtStartParm = dtStart(); //Only change these "Parms" when you press search.
    var dtEndParm = dtEnd();

    var viewModel = {
        firstViewTF: true,
        reservationList: {
            changed: new $.Callbacks(),
            load: function (loadOptions) {
                if (loadOptions.refresh) {
                    var textarray = "";
                    var deferred = new $.Deferred();
                    $
                        .ajax({
                            dataType: "json",
                            url: apiUrl + "API/Reservation/ResList",
                            headers: { 'Authorization': 'Session ' + pfUser.authToken },
                            data: {
                                StartDT: dtStartParm.toDateString(),
                                EndDT: dtEndParm.toDateString()
                            },
                            type: 'POST',
                            async: false,
                            success: function (result) {
                                searchText('Results for: ' + dtStartParm.toDateString() + ' to ' + dtEndParm.toDateString())
                                textarray = result;
                            },
                            error: function (result) {
                                searchText('Error Retrieving Data');
                                pfUser.apiError(result, "ResList", "ResList");
                            }
                        });
                    return textarray;
                }
            }
        }
    };

    viewModel.viewShown = function () {
        setNavBar(false); //Show NavBar.
        (viewModel.firstViewTF == true) ? viewModel.firstViewTF = false : viewModel.reservationList.changed.fire(); // Refresh Data repeat visits. (first time is automatic.)
    };

    viewModel.showSearch = function () {
        searchVisible(true);
    }

    viewModel.hideSearch = function () {
        searchVisible(false);
    }

    viewModel.submitSearch = function () {
        dtStartParm = dtStart(); // Change the Parms which are observed, which will cause a call to the api server. 
        dtEndParm = dtEnd();
        searchText(dtStartParm.toDateString() + ' to ' + dtEndParm.toDateString())
        viewModel.reservationList.changed.fire();
        searchVisible(false);
    }

    viewModel.create = function () {
        PreflightMobile2.app.navigate(ResEdit_1);
    }

    getIconURL = function (PrepaidTF) {
        return PrepaidTF == 'Yes' ? 'images/reservation/icon-prepaid.png' : 'images/reservation/icon-reserved.png';
    }

    getPrepaidLabel = function (PrepaidTF) {
        return PrepaidTF == 'Yes' ? 'Prepaid' : '';
    }
    getIDLabel = function (ReceiptCD, ReservationID)
    {
        console.log("ReceiptCD: ", ReceiptCD);
        console.log("ReservationID: ", ReservationID);
        return ReceiptCD == '' ? ReservationID : ReceiptCD;
    }


    return viewModel;
};

﻿PreflightMobile2.ResEdit_CCard = function (params) {


    var viewModel = {        
        duplicateText: ko.observable(),
        dupReciptCD: ko.observable(),
        dupReciptButton: ko.observable(),
        CustomerIsOKwithDuplicateTF: ko.observable(false),
        duplicateClass: ko.observable("Hidden"),
        ResErrorList: ko.observableArray(),
        RDErrorList: ko.observableArray(),
        CPrrorList: ko.observableArray(),
        CreditCardStoredTF: ko.observable(),
        MsgTerms: ko.observable(ReservationObject.MsgTerms),
        CCbSaveCard: ko.observable(),
        CCUseStoredCCInfo: ko.observable(),
        reload: ko.observable(),
        btTitle: ko.observable(ReservationObject.ReservationID > 0 ? 'Update Reservation' : 'Create Reservation'),
       
        viewShown: function () {
            setNavBar(false); //Show NavBar. 
            viewModel.reload.valueHasMutated();
            if (ReservationObject == "") {
                PreflightMobile2.app.navigate("menuMain");                
            }           
        },
        Terms: "<span>Terms and Conditions</span><br />1) You may cancel up to 24 hours after the reservation start time.<br /> 2) Cancellation fee equals 1 day of parking at the rate above.<br /> 3) Additional days will be charged by the cashier upon exit. Unused days are non-refundable.<br /> 4) This pre-paid discount rate is not valid with any other discounts or offers.<br /> 5) Unused days are non-refundable. If you are unsure about the length of your trip, we recommend that you make the reservation for the shorter time period. You can pay (the discounted daily rate) to the cashier upon exit for additional days, but the cashier cannot refund unused days.",
        //START: Form values        

        AcknowledgedTF: ko.observable(false).extend({
            required: {
                message: "Required"
            }
        }),

        selectedPayType: ko.observable().extend({
            required: {
                message: "Required"
            }
        }),

        selectedCountry: ko.observable().extend({
            required: {
                message: "Country Required"
            }
        }),
        selectedState: ko.observable().extend({
            required: {
                message: "State Required"
            }
        }),

        selectedMonth: ko.observable().extend({
            required: {
                message: "Month Required"
            }
        }),
        selectedYear: ko.observable().extend({
            required: {
                message: "Year Required"
            }
        }),
        cardName: ko.observable().extend({
            required: {
                message: "Name Required"
            }
        }),
        selectedCard: ko.observable().extend({
            required: {
                message: "Select Card Type",
            }
        }),
        address1: ko.observable().extend({
            required: {
                message: "Enter your address",
            }
        }),

        city: ko.observable().extend({
            required: {
                message: "Enter a city",
            }
        }),
        zipCode: ko.observable().extend({
            required: true,
            pattern: {
                message: "Invalid Poastal Code.",
                params: "\\d{5}(-\\d{4})?|(^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\\d{1}[A-Za-z]{1} *\\d{1}[A-Za-z]{1}\\d{1}$)"
            }
        }),
        
        //Save to sever
        btSubmit: function () {            
            var validationResult = ko.validation.group(viewModel, { deep: true });
            if (viewModel.AcknowledgedTF()) {
                if (viewModel.selectedPayType() === "New" || viewModel.selectedPayType() === "Change") {
                    if (viewModel.isValid()) {
                        viewModel.save();
                    }

                    else {
                        validationResult.showAllMessages();
                    }
                }
                else {
                    if (!ReservationObject.CreditCardStoredTF) {
                        DevExpress.ui.dialog.alert('You do not have a card on file. Please choose "Pay with New Card" to Contiue. You can add a card to you account using the Account Menu at any time.', 'Alert!');
                    }
                    else {
                        viewModel.save();
                    }
                }
            }
            else {
                DevExpress.ui.dialog.alert('You must accept the Terms and Conditions to continue.', 'Alert!');
            }
        }
    };

    //Setting the controls to endabled/disabled based on the 
    //disabledTF: ko.observable(ReservationObject.ReservationID > 0 ? true : false),
    viewModel.disabledTF = ko.observable(ReservationObject.ReservationID > 0 ? viewModel.CreditCardStoredTF() ? true : false : false),

    viewModel.save = function () {
        {
            var deferred = new $.Deferred();
            $.ajax({
                dataType: "json",
                url: apiUrl + "API/ReservationEdit/MakeReservation",
                headers: { 'Authorization': 'Session ' + pfUser.authToken },
                type: 'POST',
                data: {
                    //pfReservation fields.
                    AcknowledgedTF: viewModel.AcknowledgedTF(),
                    ReservationID: ReservationObject.ReservationID,
                    CardID: ReservationObject.CardID,
                    StartDT: ReservationObject.StartDT,
                    StartTime: ReservationObject.StartTime,
                    EndDT: ReservationObject.EndDT,
                    EndTIme: ReservationObject.EndTime,
                    FirstName: ReservationObject.FirstName,
                    LastName: ReservationObject.LastName,
                    Zip: ReservationObject.Zip,
                    Email: ReservationObject.Email,
                    MobilePhone: ReservationObject.MobilePhone,
                    ConvertingToPRepaid: ReservationObject.ConvertingToPRepaid,
                    LocID: ReservationObject.LocID,
                    ParkingTypeID: ReservationObject.ParkingTypeID,
                    LocationPriceIDs: ReservationObject.LocationPriceIDs,
                    Days: ReservationObject.Days,
                    Weeks: ReservationObject.Weeks,
                    TotalParkValue: ReservationObject.TotalParkValue,
                    LstRewDefIDsUsed: ReservationObject.LstRewDefIDsUsed,
                    RewardUsed: ReservationObject.RewardUsed,
                    TotalPointsUsed: ReservationObject.TotalPointsUsed,
                    AccessFee: ReservationObject.AccessFee,
                    CustomerIsOKwithDuplicateTF: viewModel.CustomerIsOKwithDuplicateTF(),
                    //Reward fields                    
                    RewardValue: ReservationObject.TotalPointsDiscount, //Renamed here for clarity, not on reservation controller because its the same name as ResObj field.                                         
                    WeekRewDefID: ReservationObject.WeekRewDefID,
                    DayRewDefID: ReservationObject.DayRewDefID,
                    rewWeekQty:  ReservationObject.rewWeekQty,                                        
                    rewDayQty: ReservationObject.rewDayQty,

                    //AccountCC fields                                        
                    CCType: viewModel.selectedCard(),
                    CCNumber: viewModel.cardNumber(),
                    CCAddr1: viewModel.address1(),
                    CCCity: viewModel.city(),
                    CCState: viewModel.selectedState(),
                    CCProvince: viewModel.selectedState(),
                    CCZip: viewModel.zipCode(),
                    CCFullName: viewModel.cardName(),
                    CCExpDT: viewModel.selectedMonth().toString() + viewModel.selectedYear().toString(),
                    CCCountry: viewModel.selectedCountry(),
                    CCUseStoredCCInfo: viewModel.selectedPayType(),
                    CCbSaveCard:  viewModel.selectedPayType() == "New" ? viewModel.CCbSaveCard() : true
                },
                async: false,
                success: function (result) {
                    //checking if the reply from the server is True or False - if its false bind the error list to show the server validation.
                    var r = result[0];
                    if (!r.Success) {
                        console.log("Result: ", r);
                        console.log("result.ObjResErrorList", r.ObjResErrorList);
                        viewModel.ResErrorList(r.ObjResErrorList);
                        console.log("result.RDerrorList", r.ResDetailErrorList);
                        viewModel.RDErrorList(r.ResDetailErrorList);
                        console.log("result.CPerrorList", r.CardPaymentErrorList);
                        viewModel.CPrrorList(r.CardPaymentErrorList);
                        //Duplicate checks - SJS 10/29/13

                        //{"duplicateFoundTF", objRes.ResDuplicateInfo.DuplicateFoundTF},
                        //   {"duplicateErrorTF", objRes.ResDuplicateInfo.ErrorTF},
                        //   {"duplicateRedirectToReceiptTF", objRes.ResDuplicateInfo.RedirectToReceiptTF},
                        //   {"duplicateMSG", objRes.ResDuplicateInfo.Msg},
                        //   {"duplicateReceiptCD", objRes.ResDuplicateInfo.DuplicateReceiptCD},                             
                        //   {"errorKey", p.Key},
                        //   {"errorMessage", p.Value.Message}

                        console.log("duplicateFoundTF: ", r.duplicateFoundTF)
                        console.log("duplicateErrorTF: ", r.duplicateErrorTF)
                        console.log("duplicateRedirectToReceiptTF: ", r.duplicateRedirectToReceiptTF)
                        
                        if (r.duplicateFoundTF)
                        {
                            viewModel.duplicateClass("SscBox");
                            viewModel.ResErrorList.removeAll();
                        }
                        if (r.duplicateErrorTF && r.duplicateRedirectToReceiptTF == true)
                        {
                            //The order# was a duplicate. This shouldn't be resubmitted to Retail Decisions, so we'll redirect to a page where they can see the duplicate (if it still exists).                           
                            var id = new Object();
                            id.ReceiptCD = r.duplicateReceiptCD;
                            id.duplicateMsg = r.duplicateMSG;
                            var uri = PreflightMobile2.app.router.format({ view: 'Res_Details', id: id });
                            PreflightMobile2.app.navigate(uri);
                            return;
                        }
                        else if (r.duplicateErrorTF && r.duplicateRedirectToReceiptTF == false)
                        {
                            //The order# was a duplicate. But we don't have the reservation info to redirect to, so send to an error page. Delete the existing session and cookies.                                                      
                            pfUser.oSysMsg = r.duplicateMSG;
                            var uri = PreflightMobile2.app.router.format({ view: 'showError'});
                            PreflightMobile2.app.navigate(uri);
                            return; //don't continue.
                        }
                        else if (r.duplicateFoundTF) // no error related to ReD OrderID, just a duplicate.
                        {
                            //Display the duplicate info to the customer so they can choose what to do. 
                            viewModel.duplicateText(r.duplicateMSG);
                            viewModel.dupReciptButton("Click to view existing reservation: " + r.duplicateReceiptCD);
                            viewModel.dupReciptCD(r.duplicateReceiptCD);
                            viewModel.duplicateClass("scBox");
                            $("#scroller").dxScrollView("instance").scrollTo(1, true);
                            return;
                        }
                    }
                    else {
                        pfUser.loadmenuMainLists = true;
                        var r = result[0];
                        var dialogOptions = {
                            title: 'Confirmation',
                            message: ReservationObject.ReservationID > 0 ? 'Your Reservation has been adjusted' : 'Your reservation has been created',
                            buttons: [
                                {
                                    text: 'OK',
                                    clickAction: function () {
                                        var id = new Object();
                                        id.ReceiptCD = r.ReceiptCD;
                                        id.ReservationID = r.ReservationID;
                                        var uri = PreflightMobile2.app.router.format({ view: 'ResDetails', id: id });
                                        ReservationObject.init();
                                        PreflightMobile2.app._viewCache.removeView("ResEdt_1");
                                        PreflightMobile2.app._viewCache.removeView("ResEdt_2");
                                        PreflightMobile2.app._viewCache.removeView("ResEdit_CCard");
                                        PreflightMobile2.app._viewCache.removeView("ResEdit_Award");
                                        PreflightMobile2.app.navigate(uri, { root: true, target: 'current'});
                                    }
                                }
                            ]
                        };
                        //alert('Your card infromation has been updated.');
                        var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
                        cusconfirm.show();
                    }
                },
                error: function (result) {
                    pfUser.apiError(result, "ResEdit_CCard", "ResEdit_CCard");
                    DevExpress.ui.dialog.alert('There was an error processing your request. Please try submitting this reservation again.', 'Alert!');
                }
            });
        }

    };

    viewModel.dupRecieptClick = function () {
        var id = new Object();
        id.ReceiptCD = viewModel.dupReciptCD();
        var uri = PreflightMobile2.app.router.format({ view: 'ResDetails', id: id });
        PreflightMobile2.app.navigate(uri);
    }

    viewModel.cardNumber = ko.observable().extend({
        required: {
            message: "Enter Card Number"
        },
        pattern: {
            message: "Invalid Card Number.",
            params: "^(?:(?:4\\d{3})|(?:5[1-5]\\d{2})|(?:6011)|(?:(?:3[68]\\d{2})|(?:30[012345]\\d))|(?:3[47]\\d{2}))([ -]?)(?:(?:\\d{6}\\1\\d{5})|(?:\\d{6}\\1\\d{4})|(?:\\d{4}\\1\\d{4}\\1\\d{4}))$ |" +
                    "^(?:3[47]\\d{2})([ -]?)(?:\\d{6}\\1\\d{5})|" +
                    "^(?:(?:(?:3[68]\\d{2})|(?:30[012345]\\d)))([ -]?)(?:\\d{6}\\1\\d{4})$|" +
                    "^(?:6011)([ -]?)(?:\\d{4}\\1\\d{4}\\1\\d{4})$|" +
                    "^(?:5[1-5]\\d{2})([ -]?)(?:\\d{4}\\1\\d{4}\\1\\d{4})$|" +
                    "^(?:4\\d{3})([ -]?)((?:\\d{4}\\1\\d{4}\\1\\d{4})|(?:\\d{3}\\1\\d{3}\\1\\d{3}))$",
            onlyIF: function () {
                return true;
            }
        }
    });

    viewModel.cardList = ko.observableArray(
               [{ cardType: "AMEX", value: 1 },
                { cardType: "VISA", value: 2 },
                { cardType: "MASTERCARD", value: 3 },
                { cardType: "DINERS CLUB", value: 4 }
               ]);


    viewModel.monthList = ko.observableArray(
                   [{ monthNum: "01" },
                    { monthNum: "02" },
                    { monthNum: "03" },
                    { monthNum: "04" },
                    { monthNum: "05" },
                    { monthNum: "06" },
                    { monthNum: "07" },
                    { monthNum: "08" },
                    { monthNum: "09" },
                    { monthNum: "10" },
                    { monthNum: "11" },
                    { monthNum: "12" }
                   ]);


    //list of states/provinces
    viewModel.states = ko.observableArray(
                   [{ stateName: 'Alabama', abr: 'AL', country: 'United States' },
                    { stateName: 'Alaska', abr: 'AK', country: 'United States' },
                    { stateName: 'Arizona', abr: 'AZ', country: 'United States' },
                    { stateName: 'Arkansas', abr: 'AR', country: 'United States' },
                    { stateName: 'California', abr: 'CA', country: 'United States' },
                    { stateName: 'Colorado', abr: 'CO', country: 'United States' },
                    { stateName: 'Connecticut', abr: 'CT', country: 'United States' },
                    { stateName: 'Delaware', abr: 'DE', country: 'United States' },
                    { stateName: 'District of Columbia', abr: 'DC', country: 'United States' },
                    { stateName: 'Florida', abr: 'FL', country: 'United States' },
                    { stateName: 'Georgia', abr: 'GA', country: 'United States' },
                    { stateName: 'Hawaii', abr: 'HI', country: 'United States' },
                    { stateName: 'Idaho', abr: 'ID', country: 'United States' },
                    { stateName: 'Illinois', abr: 'IL', country: 'United States' },
                    { stateName: 'Indiana', abr: 'IN', country: 'United States' },
                    { stateName: 'Iowa', abr: 'IA', country: 'United States' },
                    { stateName: 'Kansas', abr: 'KS', country: 'United States' },
                    { stateName: 'Kentucky', abr: 'KY', country: 'United States' },
                    { stateName: 'Louisiana', abr: 'LA', country: 'United States' },
                    { stateName: 'Maine', abr: 'ME', country: 'United States' },
                    { stateName: 'Montana', abr: 'MT', country: 'United States' },
                    { stateName: 'Nebraska', abr: 'NE', country: 'United States' },
                    { stateName: 'Nevada', abr: 'NV', country: 'United States' },
                    { stateName: 'New Hampshire', abr: 'NH', country: 'United States' },
                    { stateName: 'New Jersey', abr: 'NJ', country: 'United States' },
                    { stateName: 'New Mexico', abr: 'NM', country: 'United States' },
                    { stateName: 'New York', abr: 'NY', country: 'United States' },
                    { stateName: 'North Carolina', abr: 'NC', country: 'United States' },
                    { stateName: 'North Dakota', abr: 'ND', country: 'United States' },
                    { stateName: 'Ohio', abr: 'OH', country: 'United States' },
                    { stateName: 'Oklahoma', abr: 'OK', country: 'United States' },
                    { stateName: 'Oregon', abr: 'OR', country: 'United States' },
                    { stateName: 'Maryland', abr: 'MD', country: 'United States' },
                    { stateName: 'Massachusetts', abr: 'MA', country: 'United States' },
                    { stateName: 'Michigan', abr: 'MI', country: 'United States' },
                    { stateName: 'Minnesota', abr: 'MN', country: 'United States' },
                    { stateName: 'Mississippi', abr: 'MS', country: 'United States' },
                    { stateName: 'Missouri', abr: 'MO', country: 'United States' },
                    { stateName: 'Pennsylvania', abr: 'PA', country: 'United States' },
                    { stateName: 'Rhode Island', abr: 'RI', country: 'United States' },
                    { stateName: 'South Carolina', abr: 'SC', country: 'United States' },
                    { stateName: 'South Dakota', abr: 'SD', country: 'United States' },
                    { stateName: 'Tennessee', abr: 'TN', country: 'United States' },
                    { stateName: 'Texas', abr: 'TX', country: 'United States' },
                    { stateName: 'Utah', abr: 'UT', country: 'United States' },
                    { stateName: 'Vermont', abr: 'VT', country: 'United States' },
                    { stateName: 'Virginia', abr: 'VA', country: 'United States' },
                    { stateName: 'Washington', abr: 'WA', country: 'United States' },
                    { stateName: 'West Virginia', abr: 'WV', country: 'United States' },
                    { stateName: 'Wisconsin', abr: 'WI', country: 'United States' },
                    { stateName: 'Wyoming', abr: 'WY', country: 'United States' },
                    { stateName: 'Alberta', abr: 'AB', country: 'Canadaada' },
                    { stateName: 'British Columbia', abr: 'BC', country: 'Canada' },
                    { stateName: 'Manitoba', abr: 'MB', country: 'Canada' },
                    { stateName: 'New Brunswick', abr: 'NB', country: 'Canada' },
                    { stateName: 'Newfoundland and Labrador', abr: 'NL', country: 'Canada' },
                    { stateName: 'Northwest Territories', abr: 'NT', country: 'Canada' },
                    { stateName: 'Nova Scotia', abr: 'NS', country: 'Canada' },
                    { stateName: 'Nunavut', abr: 'NU', country: 'Canada' },
                    { stateName: 'Ontario', abr: 'ON', country: 'Canada' },
                    { stateName: 'Prince Edward Island', abr: 'PE', country: 'Canada' },
                    { stateName: 'Quebec', abr: 'QC', country: 'Canada' },
                    { stateName: 'Saskatchewan', abr: 'SK', country: 'Canada' },
                    { stateName: 'Yukon', abr: 'YT', country: 'Canada' }
                   ]);
    //list of countries
    viewModel.countries = ko.observableArray(
                   [{ country: "Canada" },
                    { country: "United States" }
                   ]);

    //cascaded list of stats/provinces based on the country selection. 
    viewModel.statesToShow = ko.computed(function () {
        return ko.utils.arrayFilter(viewModel.states(), function (st) { return st.country === viewModel.selectedCountry(); });
    });

    viewModel.yearList = ko.observableArray();

    //Adds yeas to year list. 
    viewModel.addYears = function () {
        for (var i = new Date().getFullYear() ; i < new Date().getFullYear() + 7; i++) {
            viewModel.yearList.push({ yearNum: i });
        }
    };

    //Load card Data
    cardData = ko.computed(function () {
        viewModel.reload();
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/ReservationEdit/LoadAcctCC",
            type: 'POST',
            headers: { 'Authorization': 'Session ' + pfUser.authToken },
            async: false,
            success: function (result) {
                var r = result[0];
                if (r.CreditCardStoredTF) {                    
                    ReservationObject.CreditCardStoredTF = r.CreditCardStoredTF;
                    viewModel.CreditCardStoredTF(r.CreditCardStoredTF);
                    viewModel.cardName(r.CCFullName);
                    viewModel.cardNumber(r.CCLastFour);
                    viewModel.selectedMonth(r.CCExpDTMonth);
                    viewModel.selectedYear(r.CCExpDTYear);
                    viewModel.address1(r.CCAddr1);
                    viewModel.selectedCard(r.CCType);
                    viewModel.selectedCountry(r.CCCountry);
                    viewModel.selectedState(r.CCState);
                    viewModel.selectedCard(r.cardTypeID);
                    viewModel.city(r.CCCity);
                    viewModel.zipCode(r.CCZip);
                    viewModel.selectedCard(r.CardType);
                    viewModel.selectedPayType("UseExisting");
                    viewModel.cardNumber.isModified(false);
                }
                else {
                    viewModel.selectedPayType("New");
                }
            },
            error: function (result) {
                pfUser.apiError(result, "ResEdit_CCard", "ResEdit_CCard");
            }
        });

    });

    viewModel.paymentTypeList = ko.observableArray(
                [{ payType: "Pay with Existing Card", CCUseStoredCCInfo: "UseExisting", CCbSaveCard: true },
                 { payType: "Add New / Update Existing Card", CCUseStoredCCInfo: "Change", CCbSaveCard: true },
                 { payType: "Use One Time", CCUseStoredCCInfo: "New", CCbSaveCard: false }
                ]);

    viewModel.selectedPayType.subscribe(function (newValue) {
        var match = ko.utils.arrayFirst(viewModel.paymentTypeList(), function (item) {
            return item.CCUseStoredCCInfo == viewModel.selectedPayType();
        });
        viewModel.CCUseStoredCCInfo(match.CCUseStoredCCInfo);
        viewModel.CCbSaveCard(match.CCbSaveCard);      
        //if (match.CCUseStoredCCInfo == "New") {            
        //    $("#saveCard").show();
        //}
        //else {            
        //    $("#saveCard").hide();
        //}

        if (match.CCUseStoredCCInfo == "UseExisting") {
            viewModel.reload.valueHasMutated();
        }        
        else {
            viewModel.CreditCardStoredTF('')
            viewModel.cardName('');
            viewModel.cardNumber('');
            viewModel.selectedMonth('');
            viewModel.selectedYear('');
            viewModel.address1('');            
            viewModel.selectedCountry('');
            viewModel.selectedState('');            
            viewModel.city('');
            viewModel.zipCode('');
            viewModel.selectedCard('');            
        }
        
    });

    if (!ReservationObject.CreditCardStoredTF) {
        viewModel.paymentTypeList.remove(function (item) { return item.CCUseStoredCCInfo == "UseExisting" })
    }

    viewModel.addYears();
    return viewModel;
};




﻿PreflightMobile2.ResEdit_2 = function (params) {

    var viewModel = {
        reload: ko.observable(),     
        errorList: ko.observableArray(),
        dsPrepaidLocCalcPrices: ko.observableArray(),
        dsNonPrepaidLocCalcPrices: ko.observableArray(),
        //AirportClass: ko.observable(),
        //TaxesClass: ko.observable(),

        PrepaybuttonClick: function (itemData) {
            console.log("prepaybutton click.");
            console.log(itemData);
             //alert("This functionality is not yet implemented.");
             ReservationObject.LocationPriceIDs = itemData.TotalCost;
             ReservationObject.ParkingTypeID = itemData.ParkingTypeID;
             ReservationObject.ParkingType = itemData.ParkingType;
             ReservationObject.Days = itemData.DaysCnt;
             ReservationObject.Weeks = itemData.WeekCnt;
             ReservationObject.PrepaidYN = true;

             ReservationObject.AccessFee = itemData.AccessFee;
             ReservationObject.TotalCost = itemData.TotalCost;
             ReservationObject.AdjustedTotalCost = itemData.TotalCost; //Start out as Total Cost.
             ReservationObject.TotalParkValue = itemData.TotalCost; //Start out as Total cost.

             ReservationObject.AirportFees = itemData.AirportFee;
             ReservationObject.TaxFees = itemData.Taxes;
             ReservationObject.ChargeRate = itemData.MsgChargeRate; //gjs1
             ReservationObject.MsgTerms = itemData.MsgTerms; //gjs1
             ReservationObject.ParkingFees = itemData.ParkingFees; //gjs1
            //flag res as convertToPrepaid when an edit - this is what the site does. 
             if (ReservationObject.ReservationID > 0) {
                 ReservationObject.ConvertingToPRepaid = true;
             }
             console.log("ReservationObject", ReservationObject);
             RemoveViewFromCache("ResEdit_FPCard")
             PreflightMobile2.app.navigate("ResEdit_FPCard");
        },
        ReservebuttonClick: function (itemData) {
            console.log("ReservationButton Click.");
            ReservationObject.LocationPriceIDs = itemData.TotalCost;
            ReservationObject.ParkingTypeID = itemData.ParkingTypeID;
            ReservationObject.ParkingType = itemData.ParkingType;
            ReservationObject.Days = itemData.DaysCnt;
            ReservationObject.Weeks = itemData.WeekCnt;
            ReservationObject.PrepaidYN = false;
            ReservationObject.AccessFee = itemData.AccessFee;

            RemoveViewFromCache("ResEdit_FPCard")
            PreflightMobile2.app.navigate("ResEdit_FPCard");
        }
    };


    viewModel.Data = ko.computed(function () {
        console.log("Loading data on ResEdit_2.js");
        viewModel.errorList.removeAll(); //clear messages.
        viewModel.reload();
        //viewModel.AirportClass(viewModel.AirportFee().length > 0 ? AirportFee : "Hidden");
        //viewModel.TaxesClass(viewModel.Taxes().length > 0 ? Taxes : "Hidden");
        var textArray;
        console.log("ReservationObject", ReservationObject);
       $ 
            .ajax({
                dataType: "json",
                url: apiUrl + "API/ReservationEdit/ValidateReservationDates",
                headers: { 'Authorization': 'Session ' + pfUser.authToken },
                type: 'POST',
                async: false,
                data: {
                    "StartDT": ReservationObject.StartDT,
                    "StartTime": ReservationObject.StartTime,
                    "EndDT": ReservationObject.EndDT,
                    "EndTime": ReservationObject.EndTime,
                    "LocID": ReservationObject.LocID,
                    "Email": ReservationObject.email,
                    "FirstName": ReservationObject.FirstName,
                    "LastName": ReservationObject.LastName,
                    "ApproveDuplicate": false, // not used anymore.
                },
                success: function (result) {
                    textArray = result[0];
                }
            })
        return textArray;
    });

    viewModel.viewShown = function () {
        setNavBar(false); //Show NavBar.
        viewModel.errorList.removeAll();
        console.log("ResEdit_2: viewShown starting...");
        console.log("viewModel.Data().isDuplicate", viewModel.Data().isDuplicate);
        if (viewModel.Data().isDuplicate) {
            var msg = 'There is a reservation made for the specified times at this location already. Are you sure you would like to make an additional reservation?';
            console.log(msg);
            viewModel.errorList.push({ "errorMessage": msg });
        }


        if (viewModel.Data() != null &&
            viewModel.Data().isValid == true ) {
            console.log("Data() is valid.");
            console.log("viewModel.Data().IsPrepaidBlackout", viewModel.Data().IsPrepaidBlackout);
            console.log("viewModel.Data().IsNonPrepaidBlackout", viewModel.Data().IsNonPrepaidBlackout);
            if (viewModel.Data().IsPrepaidBlackout == false && viewModel.Data().IsNonPrepaidBlackout == false) {
                // all is good, just move forward. 
                viewModel.dsPrepaidLocCalcPrices(viewModel.Data().PrepaidLocCalcPrices);
                console.log("PrepaidLocCalcPrices: ", ko.toJSON(viewModel.dsPrepaidLocCalcPrices));
                viewModel.dsNonPrepaidLocCalcPrices(viewModel.Data().NonPrepaidLocCalcPrices);
            }
            else if (viewModel.Data().IsPrepaidBlackout && viewModel.Data().IsNonPrepaidBlackout) {
                var msg = 'There are no parking spaces available for the alloted time.';
                console.log("msg");
                viewModel.errorList.push({ "errorMessage": msg });
                // display alert letting them know no parking is allowed at this time and send them back to date picker on confirmation click.
                //var dialogOptions = {
                //    title: 'Alert!',
                //    message: 'There are no parking spaces available for the alloted time.',
                //    buttons: [
                //        {
                //            text: 'RETURN',
                //            clickAction: function () {
                //                PreflightMobile2.app.navigate('ResEdit_1');
                //            }
                //        }
                //    ]
                //};
                //var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
                //cusconfirm.show();
            }
            else {
                console.log("Data() is NOT valid.");
                if (viewModel.Data().IsPrepaidBlackout && !viewModel.Data().IsNonPrepaidBlackout) {
                    console.log("Data() is prepaidBlackout and NOT isNONPrepaidBlackout.");
                    //display alert letting them know only non-prepaid reservations are allowed. hide list. 
                    viewModel.dsPrepaidLocCalcPrices = viewModel.Data().NonPrepaidLocCalcPrices;
                    viewModel.dsPrepaidLocCalcPrices = null;
                    viewModel.errorList = viewModel.Data().ValidationErrors;
                }
                else if (viewModel.Data().IsNonPrepaidBlackout && !viewModel.Data().IsPrepaidBlackout) {
                    console.log("Data() is nonprepaidBlackout and NOT isPrepaidBlackout.");
                    //display alert letting them know only prepaid reservations are allowed. hide list. 
                    dsNonPrepaidLocCalcPrices = null;
                    viewModel.dsPrepaidLocCalcPrices = viewModel.Data().PrepaidLocCalcPrices;
                    viewModel.errorList(viewModel.Data().ValidationErrors);
                }
                else {
                    console.log("Data() is both blacked out..");
                    console.log("errorList:", viewModel.Data().ValidationErrors);
                    viewModel.dsPrepaidLocCalcPrices = viewModel.Data().NonPrepaidLocCalcPrices;
                    viewModel.dsNonPrepaidLocCalcPrices = viewModel.Data().PrepaidLocCalcPrices;
                    viewModel.errorList(viewModel.Data().ValidationErrors);
                }
            }

        }
        else {
            // display validation errors or handle failure for large if statement above. 
            console.log("Data() is NOT valid. (main IF)");
            viewModel.dsPrepaidLocCalcPrices = null;
            viewModel.dsNonPrepaidLocCalcPrices = null;
            viewModel.errorList(viewModel.Data().ValidationErrors);

        }
    }

    return viewModel;
};

﻿PreflightMobile2.ResEdit_FPCard = function (params) {

    var viewModel = {
        forceRefresh: ko.observable(),
        selectedCard: ko.observable().extend({
            required: {
                message: "Select a Card."
            }
        }),
        errorList: ko.observableArray(),
        viewShown: function () {
            viewModel.forceRefresh.valueHasMutated(); //force refresh of the reservationList.
            setNavBar(false); //Show NavBar.
        },
        //Form Values - START
        firstName: ko.observable(),
        lastName: ko.observable(),
        zipcode: ko.observable(),
        email: ko.observable(),
        emailconfirm: ko.observable(),
        mobilephone: ko.observable().extend({
            required: {
                message: "Please enter a mobile number."
            },
            pattern: {
                message: "Invalid phone number.",
                params: "^(([2-9]{1}\\d{2}[/.]\\d{3}[.]\\d{4})|([2-9]{1}\\d{2}[/-]\\d{3}[-]\\d{4})|([2-9]{1}\\d{9})|(\\([2-9]{1}\\d{2}\\)\\s\\d{3}-\\d{4}))$"
            }
        }),
        //Form Values - START

        btSubmit: function () {
            var validationResult = ko.validation.group(viewModel, { deep: true });
            if (viewModel.isValid()) {
                ReservationObject.CardID = viewModel.selectedCard();

                ReservationObject.FirstName = viewModel.firstName();
                ReservationObject.LastName = viewModel.lastName();
                ReservationObject.Zip = viewModel.zipcode();
                ReservationObject.Email = viewModel.email();
                ReservationObject.MobilePhone = viewModel.mobilephone();


                // Call Set Rewards method here. 
                if (ReservationObject.PrepaidYN) {
                    //alert("This functionality is not yet implemented.");
                    //   RemoveViewFromCache("ResEdit_Award")
                    //   PreflightMobile2.app.navigate("ResEdit_Award");
                    var deferred = new $.Deferred();
                    $.ajax({
                        dataType: "json",
                        url: apiUrl + "API/ReservationEdit/LoadRewDefs",
                        headers: { 'Authorization': 'Session ' + pfUser.authToken },
                        type: 'POST',
                        data: {
                            //pfReservation fields.
                            ReservationID: ReservationObject.ReservationID,
                            CardID: ReservationObject.CardID,
                            StartDT: ReservationObject.StartDT,
                            StartTime: ReservationObject.StartTime,
                            EndDT: ReservationObject.EndDT,
                            EndTIme: ReservationObject.EndTime,
                            FirstName: viewModel.firstName(),
                            LastName: viewModel.lastName(),
                            Zip: viewModel.zipcode(),
                            Email: viewModel.email(),
                            MobilePhone: viewModel.mobilephone(),
                            ConvertingToPRepaid: ReservationObject.ConvertingToPRepaid,
                            LocID: ReservationObject.LocID,
                            ParkingTypeID: ReservationObject.ParkingTypeID,
                            Weeks: ReservationObject.Weeks,
                            Days: ReservationObject.Days
                        },
                        async: false,
                        success: function (result) {
                            var r = result[0];
                            if (r !== undefined) {
                                //viewModel.errorList(result);
                                if (r.acctPointsAvailable > r.dayPoints) {
                                    var id = new Object();
                                    // alert(r.ReservationID);

                                    id.WeekRewDefID = r.WeekRewDefID;
                                    id.DayRewDefID = r.DayRewDefID;
                                    id.FPWeekCost = r.FPWeekCost;
                                    id.FPDayCost = r.FPDayCost;
                                    id.ShowWeeks = r.ShowWeeks;
                                    id.ShowDays = r.ShowDays;
                                    id.PointsMsg = r.PointsMsg;
                                    id.acctPointsAvailable = r.acctPointsAvailable;
                                    id.dayPoints = r.dayPoints;
                                    id.weekPoints = r.weekPoints;
                                    ReservationObject.LocName = r.LocFullName;
                                    ReservationObject.LocAddress = r.LocAddr1;
                                    ReservationObject.LocCity = r.locCity;
                                    ReservationObject.LocState = r.locState;
                                    ReservationObject.LocZip = r.locZip;
                                    ReservationObject.LocEmail = r.locEmail;
                                    ReservationObject.LocPhone = r.locPhone;
                                    console.log("ResEdit_FPCard.js: ReservationObject: ", ko.toJSON(ReservationObject));

                                    RemoveViewFromCache("Res_Award");

                                    var uri = PreflightMobile2.app.router.format({ view: 'ResEdit_Award', id: id });
                                    PreflightMobile2.app.navigate(uri);
                                }
                                else {
                                    $.ajax({
                                        dataType: "json",
                                        url: apiUrl + "API/ReservationEdit/SetPrices",
                                        headers: { 'Authorization': 'Session ' + pfUser.authToken },
                                        type: 'POST',
                                        data: {
                                            //pfReservation fields.
                                            ReservationID: ReservationObject.ReservationID,
                                            CardID: ReservationObject.CardID,
                                            StartDT: ReservationObject.StartDT,
                                            StartTime: ReservationObject.StartTime,
                                            EndDT: ReservationObject.EndDT,
                                            EndTIme: ReservationObject.EndTime,
                                            LocID: ReservationObject.LocID,
                                            ParkingTypeID: ReservationObject.ParkingTypeID,

                                        },
                                        async: false,
                                        success: function (result) {
                                            var r = result[0];
                                            if (r != undefined) {
                                              
                                                if (r.ErrorMsg == 'None') {                                              
                                                    ReservationObject.AirportFees = r.dChargeAirportFee;
                                                    ReservationObject.TaxFees = r.dChargeTaxes;
                                                    ReservationObject.LocationPriceIDs = r.LocCalcPriceIDsUsed;
                                                    ReservationObject.TotalPayments = r.dTotalPayments;
                                                    ReservationObject.ParkingFees = r.dChargePrice;
                                                    ReservationObject.TotalPointsUsed = 0;
                                                    ReservationObject.TotalPointsDiscount = 0;
                                                    ReservationObject.NewCharge = r.dNewCharge;
                                                    ReservationObject.ChargeTotal = r.dChargeTotal;
                                                    ReservationObject.Days = r.Days;
                                                    ReservationObject.Weeks = r.Weeks;
                                                    ReservationObject.LstRewDefIDsUsed = "";
                                                    ReservationObject.WeekRewDefID = 0;
                                                    ReservationObject.DayRewDefID = 0;
                                                    ReservationObject.rewWeekQty = 0;
                                                    ReservationObject.rewDayQty = 0;
                                                    ReservationObject.MsgTerms = r.MsgTerms;
                                                    ReservationObject.RewardUsed = false;
                                                    ReservationObject.LocName = r.LocFullName;
                                                    ReservationObject.LocAddress = r.LocAddr1;
                                                    ReservationObject.LocCity = r.locCity;
                                                    ReservationObject.LocState = r.locState;
                                                    ReservationObject.LocZip = r.locZip;
                                                    ReservationObject.LocEmail = r.locEmail;
                                                    ReservationObject.LocPhone = r.locPhone;
                                                    ReservationObject.BalanceAppiled = r.BalanceAppiled;
                                                    RemoveViewFromCache("ResEdit_Conf");
                                                    console.log("setPrices:", ReservationObject);
                                                    PreflightMobile2.app.navigate("ResEdit_Conf");
                                                }
                                                else {
                                                    DevExpress.ui.dialog.alert(r.ErrorMsg, 'Alert!');
                                                }
                                            }
                                            else { //Failure of some type.
                                                var dialogOptions = {
                                                    title: 'Error',
                                                    message: 'An error has occured. Please try again.',
                                                    buttons: [
                                                        {
                                                            text: 'OK',
                                                            clickAction: function () {
                                                                PreflightMobile2.app.navigate("ResEdit_FPCard");
                                                            }
                                                        }
                                                    ]
                                                };
                                                var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
                                                cusconfirm.show();
                                            }
                                        },
                                        error: function (result) {
                                            pfUser.apiError(result, "ResEdit_Award", "ResEdit_FPCard");
                                        }
                                    })
                                    RemoveViewFromCache("Res_Conf");
                                    var uri = PreflightMobile2.app.router.format({ view: 'ResEdit_Conf', id: id });
                                    PreflightMobile2.app.navigate(uri);

                                }
                            }
                            else { //Failure of some type.
                                var dialogOptions = {
                                    title: 'Error',
                                    message: 'An Error Has Occured. Please try reserving your space again.',
                                    buttons: [
                                        {
                                            text: 'OK',
                                            clickAction: function () {
                                                PreflightMobile2.app.navigate("ResEdit_2");
                                            }
                                        }
                                    ]
                                };
                                var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
                                cusconfirm.show();
                            }
                        },
                        error: function (result) {
                            pfUser.apiError(result, "ResEdit_FPCard", "ResEdit_2");
                        }
                    });
                }
                else {
                    pfUser.loadmenuMainLists = true;
                    var deferred = new $.Deferred();
                    $.ajax({
                        dataType: "json",                        
                        url: apiUrl + "API/ReservationEdit/MakeNonPrepaidReservation",
                        headers: { 'Authorization': 'Session ' + pfUser.authToken },
                        type: 'POST',
                        data: {
                            //pfReservation fields.
                            ReservationID: ReservationObject.ReservationID,
                            CardID: ReservationObject.CardID,
                            StartDT: ReservationObject.StartDT,
                            StartTime: ReservationObject.StartTime,
                            EndDT: ReservationObject.EndDT,
                            EndTIme: ReservationObject.EndTime,
                            FirstName: viewModel.firstName(),
                            LastName: viewModel.lastName(),
                            Zip: viewModel.zipcode(),
                            Email: viewModel.email(),
                            MobilePhone: viewModel.mobilephone(),
                            ConvertingToPRepaid: ReservationObject.ConvertingToPRepaid,
                            LocID: ReservationObject.LocID,
                            ParkingTypeID: ReservationObject.ParkingTypeID,

                        },
                        async: false,
                        success: function (result) {
                            var r = result[0];
                            if (r.ReservationID > 0) {
                                //viewModel.errorList(result);
                                var id = new Object();
                                // alert(r.ReservationID);
                                id.ReservationID = r.ReservationID;
                                id.FirstName = viewModel.firstName();
                                id.LastName = viewModel.lastName();
                                id.Email = viewModel.email();
                                id.ReservationDT = ReservationObject.StartDT + ' ' + ReservationObject.StartTime;
                                id.EndDateTime = ReservationObject.EndTime;
                                id.PostalCD = viewModel.zipcode();
                                id.ParkingType = ReservationObject.ParkingType;
                                id.LocFullName = r.LocFullName;
                                id.locPhone = r.locPhone;
                                id.LocAddr1 = r.LocAddr1;
                                id.locCity = r.locCity;
                                id.locState = r.locState;
                                id.locZip = r.locZip;
                                id.locEmail = r.locEmail;

                                //Success, so go to reservation page.
                                RemoveViewFromCache("ResDetailsNP");
                                console.log("id:", id);
                                //PreflightMobile2.app.navigate("ResDetailsNP/" + id); //doesn't work for complex objects?
                                //go and send the 'id' object with the call. To access on the next page, use this type of syntax: params.id.Email
                                var uri = PreflightMobile2.app.router.format({ view: 'ResDetailsNP', id: id });
                                PreflightMobile2.app.navigate(uri, { root: true });
                            }
                            else { //Failure of some type.
                                var dialogOptions = {
                                    title: 'Error',
                                    message: 'An Error Has Occured. Please try reserving your space again.',
                                    buttons: [
                                        {
                                            text: 'OK',
                                            clickAction: function () {
                                                RemoveViewFromCache("accountMenu");
                                                PreflightMobile2.app.navigate("accountMenu");
                                            }
                                        }
                                    ]
                                };
                                var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
                                cusconfirm.show();
                            }
                        },
                        error: function (result) {
                            pfUser.apiError(result, "ResEdit_FPCard", "ResEdit_2");
                        }
                    });
                }
            }

            else {
                validationResult.showAllMessages();
                DevExpress.ui.dialog.alert(msg_RequiredField, "Missing Field!");
            }
        }
    };

    viewModel.cardList = ko.computed(function () {
        viewModel.forceRefresh();
        var textarray = "";
        var deferred = new $.Deferred();
        $
            .ajax({
                dataType: "json",
                url: apiUrl + "API/Card/CardList",
                headers: { 'Authorization': 'Session ' + pfUser.authToken },
                type: 'POST',
                async: false,
                success: function (result) {
                    console.log("cardList result: ", result);
                    console.log("cardList result[0].cardNumber: ", result[0].cardNumber);
                    console.log("cardList result[0].cardID: ", result[0].cardID);
                    viewModel.selectedCard(result[0].cardID);
                    viewModel.selectedCard.valueHasMutated();
                    textarray = result;
                },
                error: function (result) {
                    pfUser.apiError(result, "ResEdit_FPCard", "ResEdit_FPCard");
                }
            })

        return textarray;
    });

    viewModel.selectedCard.subscribe(function (newValue) {
        var match = ko.utils.arrayFirst(viewModel.cardList(), function (item) {
            return item.cardID == viewModel.selectedCard();
        });
        viewModel.firstName(match.firstname);
        viewModel.lastName(match.lastname);
        viewModel.zipcode(match.zipcode);
        viewModel.email(match.email);
        viewModel.emailconfirm(match.email);
        viewModel.mobilephone(match.mobile);
    });


    return viewModel;
};

﻿PreflightMobile2.ResEdit_Award = function (params) {

    var viewModel = {
        errorList: ko.observableArray(),
        WeekRewDefID: params.id.WeekRewDefID,
        DayRewDefID: params.id.DayRewDefID,
        FPWeekCost: params.id.FPWeekCost,
        FPDayCost: params.id.FPDayCost,
        ShowWeeks: params.id.ShowWeeks,
        ShowDays: params.id.ShowDays,
        PointsMsg: params.id.PointsMsg,              

        locName: ko.observable(ReservationObject.LocName),
        locAddress: ko.observable(ReservationObject.LocAddress),
        parkType: ko.observable(ReservationObject.ParkingType),
        StartDT: ko.observable(ReservationObject.StartDT + " " + ReservationObject.StartTime),
        EndDT: ko.observable(ReservationObject.EndDT + " " + ReservationObject.EndTime),
        availPoints: ko.observable(params.id.acctPointsAvailable),
        weekcount: ko.observable(0),
        daycount: ko.observable(0),
        weekPoints: ko.observable(params.id.weekPoints),
        dayPoints: ko.observable(params.id.dayPoints),
        errorMsg: ko.observable(),
        
        subtractWeeks: function () {
            if (viewModel.weekcount() > 0) {
                viewModel.weekcount(viewModel.weekcount() - 1);               
            }

        },
        addWeeks: function () {
            viewModel.weekcount(viewModel.weekcount() + 1);            
        },
        subtractDays: function () {
            if (viewModel.daycount() > 0) {
                viewModel.daycount(viewModel.daycount() - 1);            
            }
        },
        addDays: function () {
            viewModel.daycount(viewModel.daycount() + 1);           
        },

        btApplyPoints: function () {
            if (viewModel.weekcount() == 0 && viewModel.daycount() == 0) {
                $.ajax({
                    dataType: "json",
                    url: apiUrl + "API/ReservationEdit/SetPrices",
                    headers: { 'Authorization': 'Session ' + pfUser.authToken },
                    type: 'POST',
                    data: {
                        //pfReservation fields.
                        ReservationID: ReservationObject.ReservationID,
                        CardID: ReservationObject.CardID,
                        StartDT: ReservationObject.StartDT,
                        StartTime: ReservationObject.StartTime,
                        EndDT: ReservationObject.EndDT,
                        EndTIme: ReservationObject.EndTime,
                        LocID: ReservationObject.LocID,
                        ParkingTypeID: ReservationObject.ParkingTypeID
                    },
                    async: false,
                    success: function (result) {
                        var r = result[0];
                        if (r != undefined) {
                            //viewModel.errorList(result);
                            if (r.ErrorMsg == 'None') {                            
                                ReservationObject.AirportFees = r.dChargeAirportFee;
                                ReservationObject.TaxFees = r.dChargeTaxes;
                                ReservationObject.LocationPriceIDs = r.LocCalcPriceIDsUsed;
                                ReservationObject.TotalPayments = r.dTotalPayments;
                                ReservationObject.ParkingFees = r.dChargePrice;
                                ReservationObject.TotalPointsUsed = 0;
                                ReservationObject.TotalPointsDiscount = 0;
                                ReservationObject.NewCharge = r.dNewCharge;
                                ReservationObject.ChargeTotal = r.dChargeTotal;                                
                                ReservationObject.Days = r.Days;
                                ReservationObject.Weeks = r.Weeks;
                                ReservationObject.LstRewDefIDsUsed = "";
                                ReservationObject.WeekRewDefID = 0;
                                ReservationObject.DayRewDefID = 0;
                                ReservationObject.rewWeekQty = 0;
                                ReservationObject.rewDayQty = 0;
                                ReservationObject.RewardUsed = false;
                                ReservationObject.MsgTerms = r.MsgTerms;
                                ReservationObject.BalanceAppiled = r.BalanceAppiled;
                                RemoveViewFromCache("ResEdit_Conf");
                                console.log("setPrices:", ReservationObject);
                                PreflightMobile2.app.navigate("ResEdit_Conf");
                            }
                            else {
                                DevExpress.ui.dialog.alert(r.ErrorMsg, 'Alert!');
                            }
                        }
                        else { //Failure of some type.
                            var dialogOptions = {
                                title: 'Error',
                                message: 'An error has occured. Please try again.',
                                buttons: [
                                    {
                                        text: 'OK',
                                        clickAction: function () {
                                            PreflightMobile2.app.navigate("ResEdit_FPCard");
                                        }
                                    }
                                ]
                            };
                            var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
                            cusconfirm.show();
                        }
                    },
                    error: function (result) {
                        pfUser.apiError(result, "ResEdit_Award", "ResEdit_FPCard");
                    }
                });
            }
            else {
                $.ajax({
                    dataType: "json",
                    url: apiUrl + "API/ReservationEdit/SetRewards",
                    headers: { 'Authorization': 'Session ' + pfUser.authToken },
                    type: 'POST',
                    data: {
                        //pfReservation fields.
                        ReservationID: ReservationObject.ReservationID,
                        CardID: ReservationObject.CardID,
                        StartDT: ReservationObject.StartDT,
                        StartTime: ReservationObject.StartTime,
                        EndDT: ReservationObject.EndDT,
                        EndTIme: ReservationObject.EndTime,
                        LocID: ReservationObject.LocID,
                        ParkingTypeID: ReservationObject.ParkingTypeID,
                        TotalParkValue: ReservationObject.TotalParkValue,
                        WeekRewDefID: viewModel.WeekRewDefID,
                        DayRewDefID: viewModel.DayRewDefID,
                        rewDayQty: viewModel.daycount(),
                        rewWeekQty: viewModel.weekcount(),
                        PointsAvailable: params.id.acctPointsAvailable,

                    },
                    async: false,
                    success: function (result) {
                        var r = result[0];
                        if (r != undefined) {
                            //viewModel.errorList(result);
                            if (r.ErrorMsg == 'None') {
                          
                                ReservationObject.LocationPriceIDs = r.LocCalcPriceIDsUsed;
                                ReservationObject.TotalPayments = r.dTotalPayments;
                                ReservationObject.ChargeTotal = r.dChargeTotal;
                                ReservationObject.TotalPointsUsed = r.dChargePointsApplied;
                                ReservationObject.TotalPointsDiscount = r.dChargePointDiscount;
                                ReservationObject.NewCharge = r.dNewCharge;
                                ReservationObject.Days = r.Days;
                                ReservationObject.Weeks = r.Weeks;
                                ReservationObject.LstRewDefIDsUsed = r.LstRewDefIDsUsed;
                                ReservationObject.WeekRewDefID = viewModel.WeekRewDefID;
                                ReservationObject.DayRewDefID = viewModel.DayRewDefID;
                                ReservationObject.rewWeekQty = viewModel.weekcount();
                                ReservationObject.rewDayQty = viewModel.daycount();
                                ReservationObject.RewardUsed = true;
                                ReservationObject.MsgTerms = r.MsgTerms;
                                ReservationObject.BalanceAppiled = r.BalanceAppiled;
                                RemoveViewFromCache("ResEdit_Conf");
                                console.log("setRew:", ReservationObject);
                                PreflightMobile2.app.navigate("ResEdit_Conf");
                            }
                            else {
                                DevExpress.ui.dialog.alert(r.ErrorMsg, 'Alert!');
                            }
                        }
                        else { //Failure of some type.
                            var dialogOptions = {
                                title: 'Error',
                                message: 'An error has occured. Please try again.',
                                buttons: [
                                    {
                                        text: 'OK',
                                        clickAction: function () {
                                            PreflightMobile2.app.navigate("ResEdit_FPCard");
                                        }
                                    }
                                ]
                            };
                            var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
                            cusconfirm.show();
                        }
                    },
                    error: function (result) {
                        pfUser.apiError(result, "ResEdit_Award", "ResEdit_FPCard");
                    }
                });
            }
        },

        viewShown: function () {           
            setNavBar(false);            
            if (ReservationObject.ReservationID > 0) {               
                var deferred = new $.Deferred();
                $.ajax({
                    dataType: "json",
                    url: apiUrl + "API/ReservationEdit/LoadRewards",
                    headers: { 'Authorization': 'Session ' + pfUser.authToken },
                    data: {
                        ReservationID: ReservationObject.ReservationID
                    },
                    type: 'POST',
                    async: false,
                    success: function (result) {
                        var r = result[0];
                        viewModel.daycount(r.FPDays);
                        viewModel.weekcount(r.FPWeeks);
                        ReservationObject.rewWeekQty = r.FPWeeks;
                        ReservationObject.rewDayQty = r.FPDays;
                    },
                    error: function (result) {
                        pfUser.apiError(result, "LoadReward", "ResEdit_FPCard");
                    }
                });
            }
        }
    };

    viewModel.recalcRemaingPoints = ko.computed(function () {
        //return (viewModel.availPoints() - (viewModel.weekcount() * viewModel.dayPoints()) - (viewModel.daycount() * viewModel.weekPoints()));      
        var tot = 0;
        console.log("viewModel.availPoints():", viewModel.availPoints());
        console.log("viewModel.weekcount():", viewModel.weekcount());
        console.log("viewModel.dayPoints():", viewModel.dayPoints());
        console.log("viewModel.daycount():", viewModel.daycount());
        console.log("viewModel.weekPoints():", viewModel.weekPoints());
        console.log("viewModel.weekcount() * viewModel.dayPoints()=", viewModel.weekcount() * viewModel.dayPoints());
        console.log("(viewModel.daycount() * viewModel.weekPoints())", (viewModel.daycount() * viewModel.weekPoints()));

        var avail = viewModel.availPoints();

        //NOTE: We are adding the point cost to the available points for Edits to show correct on screen counts. 
        if (ReservationObject.ReservationID > 0 ){
            avail = viewModel.availPoints() + ReservationObject.TotalPointsUsed;
        }        

        var tot =
             avail -
            (viewModel.weekcount() * viewModel.weekPoints())
            - (viewModel.daycount() * viewModel.dayPoints());

        console.log("total points left:", tot);
        return tot;

    });


    return viewModel;
};

﻿PreflightMobile2.ResEdit_Conf = function (params) {

    var viewModel ={        
        ParkingType: ko.observable(ReservationObject.ParkingType),
        ResAddress: ko.observable(ReservationObject.LocAddress),
        ResCityStateZip: ko.observable(ReservationObject.LocCity + ", " + ReservationObject.LocState),
        ResPhone: ko.observable(ReservationObject.LocPhone),
        ResDepDT: ko.observable(ReservationObject.StartDT + " " + ReservationObject.StartTime),
        ResLocation: ko.observable(ReservationObject.LocName),
        ResRetDT: ko.observable(ReservationObject.EndDT + " " + ReservationObject.EndTime),
        AlertClass: ko.observable("BoxAlert ListSmall"),
       
        ChargeRate: ko.observable(ReservationObject.ChargeRate),

        ParkingFees: ko.observable("$" + ReservationObject.ParkingFees.toFixed(2)),
        AirportFees: ko.observable("$" + ReservationObject.AirportFees.toFixed(2)),
        TaxFees: ko.observable("$" + ReservationObject.TaxFees.toFixed(2)),
        TotalCost: ko.observable("$" + ReservationObject.TotalCost),
        ChargeTotal: ko.observable(ReservationObject.ReservationID > 0 ? (ReservationObject.NewCharge > 0 ? "$" + ReservationObject.NewCharge.toFixed(2) : "($" + (ReservationObject.NewCharge * -1).toFixed(2) + ")") : "$" + ReservationObject.ChargeTotal.toFixed(2)),
        ReceiptCD: ko.observable(ReservationObject.ReceiptCD),                 
        ChargeCancelFee: ko.observable(ReservationObject.ChargeCancelFee),
        showCancelFee: ko.observable(ReservationObject.ReservationID > 0 ? true : false),
        ChargePointDiscount: ko.observable("("+ ReservationObject.TotalPointsDiscount + ")"),
        ChargePointsApplied: ko.observable("Points Redeemed (" + ReservationObject.TotalPointsUsed + ")"),
        
        showDifference: ko.observable(ReservationObject.ReservationID > 0 ? true : false),
        BalanceApplied: ko.observable("(" + ReservationObject.BalanceAppiled.toFixed(2) + ")"),

        message: ko.observable(''),
               
        viewShown: function () {
            setNavBar(false); //Show NavBar.
        }
    };
    console.log("Res obj:", ReservationObject);
    return viewModel;
};

﻿PreflightMobile2.ResDetailsNP = function (params) {

    var viewModel = {
        //*** Error list displays the server validation errors at the top of the list/or view***
        errorList: ko.observableArray(),
        ResAlert: ko.observable("Your reservation has been confirmed and you will be emailed a confirmation."),
        AlertClass: ko.observable("BoxAlert ListSmall"),
        ReservationID: ko.observable(),
        FirstName: ko.observable(),
        LastName: ko.observable(),
        Email: ko.observable(),
        ReservationDT: ko.observable(),
        EndDateTime: ko.observable(),
        PostalCD: ko.observable(),
        ParkingType: ko.observable(),
        LocFullName: ko.observable(),
        locPhone: ko.observable(),
        LocAddr1: ko.observable(),
        locCity: ko.observable(),
        locState: ko.observable(),
        locZip: ko.observable(),
        locEmail: ko.observable(),
        btEditVisibleTF: ko.observable(),
        

        viewShown: function () {
            setNavBar(false); //Show NavBar.
            console.log("detail", params.id.ReservationID);

            viewModel.ReservationID(params.id.ReservationID);
            viewModel.FirstName(params.id.FirstName);
            viewModel.LastName(params.id.LastName);
            viewModel.Email(params.id.Email);
            viewModel.ReservationDT(params.id.ReservationDT);
            viewModel.EndDateTime(params.id.EndDateTime);
            viewModel.PostalCD(params.id.PostalCD);
            viewModel.ParkingType(params.id.ParkingType);
            viewModel.LocFullName(params.id.LocFullName);
            viewModel.locPhone(params.id.locPhone);
            viewModel.LocAddr1(params.id.LocAddr1);
            viewModel.locCity(params.id.locCity);
            viewModel.locState(params.id.locState);
            viewModel.locZip(params.id.locZip);
            viewModel.locEmail(params.id.locEmail);
            viewModel.btEditVisibleTF(moment(viewModel.ReservationDT()).diff(moment()) > 0 ? true:false);
        },

    };

    //How the Cancel button works
    viewModel.btCancelRes = function () {

        var dialogOptions = {
            title: 'Alert!',
            message: 'Are you sure you want to cancel this Reservation? Note: When you press "Yes", please allow the system 10 to 60 seconds to process your request.',
            buttons: [
                {
                    text: 'YES',
                    clickAction: function () {
                        cancelRes();
                    }
                },
                {
                    text: 'NO',
                    clickAction: function () {

                    }
                }
            ]
        };
        //alert('Your card infromation has been updated.');
        var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
        cusconfirm.show();
    }

    cancelRes = function () {
        viewModel.errorList.removeAll();
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/Reservation/cancelReservation",
            headers: { 'Authorization': 'Session ' + pfUser.authToken },
            type: 'POST',
            data: {
                "ReservationID": (params.id.ReservationID)
            },
            async: false,
            success: function (result) {
                //checking if the reply from the server is True or False - if its false bind the error list to show the server validation.
                var r = result[0];
                if (!r.bSuccessTF) {
                    viewModel.errorList.push({ "errorMessage": r.sMessage });

                }
                else {
                    var dialogOptions = {
                        title: 'Confirmation!',
                        message: r.sMessage,
                        buttons: [
                            {
                                text: 'OK',
                                clickAction: function () {
                                    PreflightMobile2.app.navigate("ResList");
                                }
                            }
                        ]
                    };
                    //alert('Your card infromation has been updated.');
                    var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
                    cusconfirm.show();
                }
            },
            error: function (result) {
                pfUser.apiError(result, "ResDetails", "ResList");
            }
        })
    };

    return viewModel;
};

﻿PreflightMobile2.ResDetails = function (params) {
  
    var viewModel = {
        //*** Error list displays the server validation errors at the top of the list/or view***
        errorList: ko.observableArray(),
        duplicateMsg: ko.observable(params.id.duplicateMsg),
        dupAlertClass: ko.observable(!params.id.duplicateMsg ? "Hidden" : params.id.duplicateMsg.length > 0 ? "BoxAlert ListSmall" : "Hidden" ),
        ReceiptCD: ko.observable(params.id.ReceiptCD),
        ReservationID: ko.observable(params.id.ReservationID),
        successMsg: ko.observable(),
        successMsgBold: ko.observable(),
        locAddress: ko.observable(),
        barcodeVisibleTF: ko.observable(),
        resCanceledTF: ko.observable(),
        resConfirmedTF: ko.observable(),
        resDelayedTF: ko.observable(),
        resRejectedTF: ko.observable(),
        Email: ko.observable(),
        ResLocation: ko.observable(),
        CCApplied: ko.observable(),
        ChargeAirportFee: ko.observable(),
        ChargeCancelFee: ko.observable(),
        ChargePointDiscount: ko.observable(),
        ChargePointsApplied: ko.observable(),
        ChargePrice: ko.observable(),
        ChargeRate: ko.observable(),
        ChargeSubTot: ko.observable(),
        ChargeTaxes: ko.observable(),
        ChargeTotal: ko.observable(),
        FName: ko.observable(),
        FPApplied: ko.observable(),
        FPAppliedPointsTF: ko.observable(),
        FPNum: ko.observable(),
        message: ko.observable(),
        MobileNum: ko.observable(),
        ParkingType: ko.observable(),
        PhoneNum: ko.observable(),
        RCPT_CD: ko.observable(),
        RCPT_COST: ko.observable(),
        RCPT_TAX: ko.observable(),
        ResAddress: ko.observable(),
        ResCityStateZip: ko.observable(),
        ResDepDT: ko.observable(),
        ResDuration: ko.observable(),
        ResLocation: ko.observable(),
        ResRetDT: ko.observable(),
        WeekTF: ko.observable(),
        AlertClass: ko.observable("BoxAlert ListSmall"),
        parkingTypeImageURL: ko.observable(),
        btEditVisibleTF: ko.observable(true),
        pageReload: ko.observable(),

        

        viewShown: function () {
            setNavBar(false); //Show NavBar.
            console.log("ReceiptCD", params.id.ReceiptCD);
            console.log("ReservationID", params.id.ReservationID);
            viewModel.errorList.removeAll();
            viewModel.pageReload.valueHasMutated();
            $("#BarcodeTarget").barcode(params.id.ReceiptCD, "code128", { barWidth: 2, barHeight: 175 });

            }, 

    };

    viewModel.locationInfo = ko.computed(function () {
        viewModel.pageReload();
        console.log("LocationInfo being reset from server.");
        viewModel.errorList.removeAll();
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/Reservation/ResById",
            headers: { 'Authorization': 'Session ' + pfUser.authToken },
            type: 'POST',
            data: {
                ReceiptCD: params.id.ReceiptCD
            },
            async: false,
            success: function (result) {
                var res = result[0];
                viewModel.ReceiptCD(res.ReceiptCD);
                viewModel.successMsg(res.successMsg);
                viewModel.successMsgBold(res.successMsgBold);
                viewModel.locAddress(res.locAddress);
                viewModel.barcodeVisibleTF(res.barcodeVisibleTF);
                viewModel.resCanceledTF(res.resCanceledTF);
                viewModel.resConfirmedTF(res.resConfirmedTF);
                viewModel.resDelayedTF(res.resDelayedTF);
                viewModel.resRejectedTF(res.resRejectedTF);
                viewModel.Email(res.Email);
                viewModel.ResLocation(res.ResLocation);
                viewModel.CCApplied(res.CCApplied);
                viewModel.ChargeAirportFee(res.ChargeAirportFee);
                viewModel.ChargeCancelFee(res.ChargeCancelFee);
                viewModel.ChargePointDiscount(res.ChargePointDiscount);
                viewModel.ChargePointsApplied(res.ChargePointsApplied);
                viewModel.ChargePrice(res.ChargePrice);
                viewModel.ChargeRate(res.ChargeRate);
                viewModel.ChargeSubTot(res.ChargeSubTot);
                viewModel.ChargeTaxes(res.ChargeTaxes);
                viewModel.ChargeTotal(res.ChargeTotal);
                viewModel.FName(res.FName);
                viewModel.FPApplied(res.FPApplied);
                viewModel.FPAppliedPointsTF(res.FPAppliedPointsTF);
                viewModel.FPNum(res.FPNum);
                viewModel.message(res.message);
                viewModel.MobileNum(res.MobileNum);
                viewModel.ParkingType(res.ParkingType);
                viewModel.PhoneNum(res.PhoneNum);
                viewModel.RCPT_CD(res.RCPT_CD);
                viewModel.RCPT_COST(res.RCPT_COST);
                viewModel.RCPT_TAX(res.RCPT_TAX);
                viewModel.ResAddress(res.ResAddress);
                viewModel.ResCityStateZip(res.ResCityStateZip);
                viewModel.ResDepDT(res.ResDepDT);
                viewModel.ResDuration(res.ResDuration);
                viewModel.ResLocation(res.ResLocation);
                viewModel.ResRetDT(res.ResRetDT);
                viewModel.WeekTF(res.WeekTF);
                viewModel.AlertClass(viewModel.successMsgBold().length > 0 ? "BoxAlert ListSmall" : "Hidden");
                viewModel.btEditVisibleTF(res.bEditableTF);
                viewModel.parkingTypeImageURL(res.parkingTypeImageURL);
                console.log("btEditVisibleTF: ", viewModel.btEditVisibleTF());
                console.log("res.bEditableTF: ", res.bEditableTF);
            },
            error: function (result) {
                pfUser.apiError(result, "ResDetails", "ResList");
            }
        });

    })


    //How the Cancel button works
    viewModel.btCancelRes = function () {

        var dialogOptions = {
            title: 'Alert!',
            message: 'Are you sure you want to cancel this Reservation? Note: When you press "Yes", please allow the system 10 to 60 seconds to process your request.',
            buttons: [
                {
                    text: 'YES',
                    clickAction: function () {
                        viewModel.cancelRes();
                    }
                },
                {
                    text: 'NO',
                    clickAction: function () {

                    }
                }
            ]
        };
        //alert('Your card infromation has been updated.');
        var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
        cusconfirm.show();
    }

    viewModel.cancelRes = function () {
        pfUser.loadmenuMainLists = true;
        viewModel.errorList.removeAll();
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/Reservation/cancelReservation",
            headers: { 'Authorization': 'Session ' + pfUser.authToken },
            type: 'POST',
            data: {
                "ReservationID": (params.id.ReservationID)
            },
            async: false,
            success: function (result) {
                //checking if the reply from the server is True or False - if its false bind the error list to show the server validation.
                var r = result[0];
                if (!r.bSuccessTF) {
                    viewModel.errorList.push({ "errorMessage": r.sMessage });
                }
                else {
                    var dialogOptions = {
                        title: 'Confirmation',
                        message: r.sMessage,
                        buttons: [
                            {
                                text: 'OK',
                                clickAction: function () {
                                    PreflightMobile2.app.navigate("ResList");
                                }
                            }
                        ]
                    };
                    //alert('Your card infromation has been updated.');
                    var cusconfirm = new DevExpress.ui.dialog.custom(dialogOptions);
                    cusconfirm.show();
                }
            },
            error: function (result) {
                pfUser.apiError(result, "ResDetails", "ResList");
            }
        })
    };

    return viewModel;
};

﻿PreflightMobile2.ResReceipt = function (params) {

    var viewModel = {
        viewShown: function () { setNavBar(false); }, //Show NavBar.
    };

    return viewModel;
};

﻿PreflightMobile2.ResEdit_1 = function (params) {
    var viewModel = {
        AlertClass: ko.observable("BoxAlert ListSmall"),
        reload: ko.observable(new Date()),
        fieldDisabled: ko.observable(false),      
        buttonVisible: ko.observable(true),
        locationDisabled: ko.observable(false),
        showMessage: ko.observable(false),        

        errorList: ko.observableArray(),
        departDT: ko.observable().extend({
            required: {
                message: "Enter an End Date",
            }
        }),
        departTime: ko.observable().extend({
            required: {
                message: "Required",
            }
        }),
        arriveDT: ko.observable().extend({
            required: {
                message: "Enter a Start Date",
            }
        }),
        arriveTime: ko.observable().extend({
            required: {
                message: "Required",
            }
        }),
        selectedLoc: ko.observable().extend({
            required: {
                message: "Select a Location",
            }
        }),



        btDisplay: function () {
            var validationResult = ko.validation.group(viewModel, { deep: true });
            if (viewModel.isValid()) {
                ReservationObject.StartDT = viewModel.departDT().toDateString();
                ReservationObject.EndDT = viewModel.arriveDT().toDateString();
                ReservationObject.StartTime = viewModel.departTime();
                ReservationObject.EndTime = viewModel.arriveTime();
                ReservationObject.LocID = viewModel.selectedLoc();
                //ReservationObject.FirstName = pfUser.FirstName; // Grab From Card
                //ReservationObject.LastName = pfUser.LastName; // Grab From Card
                ReservationObject.Zip = pfUser.Zip;
                ReservationObject.Email = pfUser.Email;
                RemoveViewFromCache("ResEdit_2")
                PreflightMobile2.app.navigate("ResEdit_2");
            }
            else {
                validationResult.showAllMessages();
                DevExpress.ui.dialog.alert(msg_RequiredField, "Missing Field!");
            }
        },

        btCancel: function () {
        }
    };

    viewModel.viewShown = function () {
        viewModel.reload(new Date());
        setNavBar(false);
        viewModel.AlertClass("Hidden");
        console.log("detail", params);
        if (params.id > 0) {
            viewModel.locationDisabled(true);
            var deferred = new $.Deferred();
            $.ajax({
                dataType: "json",
                url: apiUrl + "API/ReservationEdit/LoadReservation",
                headers: { 'Authorization': 'Session ' + pfUser.authToken },
                data: {
                    ReservationID: params.id
                },
                type: 'POST',
                async: false,
                success: function (result) {
                    var r = result[0];
                    ReservationObject.ReservationID = params.id;
                    ReservationObject.CardID = r.CardID;
                    ReservationObject.StartDT = r.StartDT;
                    ReservationObject.EndDT = r.EndDT;
                    ReservationObject.StartTime = r.StartTime;
                    ReservationObject.EndTime = r.EndTime;
                    ReservationObject.FirstName = r.FirstName;
                    ReservationObject.LastName = r.LastName;
                    ReservationObject.Zip = r.Zipcode;
                    ReservationObject.Email = r.Email;
                    ReservationObject.MobilePhone = r.MobilePhone;
                    ReservationObject.LocID = r.LocationID;		
                    ReservationObject.ParkingTypeID = r.ParkingTypeID;
                    ReservationObject.LocationPriceIDs = r.LocCalcPriceIDsUsed;
                    ReservationObject.Days = r.Days;
                    ReservationObject.Weeks = r.Weeks;	
                    ReservationObject.TotalParkValue = r.TotalParkValue;	
                    ReservationObject.LstRewDefIDsUsed = r.LstRewDefIDsUsed;	                    
                    ReservationObject.TotalPointsUsed = r.TotalPointsUsed;               
                    ReservationObject.CCType =  r.CardType;
                    ReservationObject.CCNumber = r.CardLastFour;
                    ReservationObject.CCAddr1 = r.CardBillAddress1;
                    ReservationObject.CCCity = r.CardBillCity;
                    ReservationObject.CCState = r.CardBillState;
                    ReservationObject.CCProvince = r.CardBillState;
                    ReservationObject.CCZip = r.CardBillZip;
                    ReservationObject.CCFullName = r.NameOnCard;
                    ReservationObject.CCExpDT = r.ExpMonth.toString() +  r.ExpYear.toString();
                    viewModel.selectedLoc(r.LocationID);
                    viewModel.departDT(new Date(moment(r.StartDT)));
                    viewModel.departTime(r.StartTime);
                    viewModel.arriveDT(new Date(moment(r.EndDT)));
                    viewModel.arriveTime(r.EndTime);
                    if (!r.IsEditable) {
                        viewModel.fieldDisabled(true); //this is confusing, but the field I am setting is Disabled, so its opposite of IsEditable                            
                    }
                    viewModel.buttonVisible(r.IsEditable);

                },
                error: function (result) {
                    pfUser.apiError(result, "ResEdit_1", "menuMain");
                }
            });
        }
    };

    viewModel.hourList = ko.observableArray(
               [{ hour: "12:01 AM" },
                { hour: "1:00 AM" },
                { hour: "2:00 AM" },
                { hour: "3:00 AM" },
                { hour: "4:00 AM" },
                { hour: "5:00 AM" },
                { hour: "6:00 AM" },
                { hour: "7:00 AM" },
                { hour: "8:00 AM" },
                { hour: "9:00 AM" },
                { hour: "10:00 AM" },
                { hour: "11:00 AM" },
                { hour: "12:00 PM" },
                { hour: "1:00 PM" },
                { hour: "2:00 PM" },
                { hour: "3:00 PM" },
                { hour: "4:00 PM" },
                { hour: "5:00 PM" },
                { hour: "6:00 PM" },
                { hour: "7:00 PM" },
                { hour: "8:00 PM" },
                { hour: "9:00 PM" },
                { hour: "10:00 PM" },
                { hour: "11:00 PM" }]);

    //load location list
    viewModel.locationList = ko.computed(function () {
        var deferred = new $.Deferred();
        var x = viewModel.reload();
        var ll = "";
        $
            .ajax({
                dataType: "json",
                headers: { 'Authorization': 'Session ' + pfUser.authToken },
                url: apiUrl + "API/Home/locationLookupListAuth", //Force the login when getting the list.
                type: 'POST',
                async: false,
                success: function (result) {
                    ll = result;
                },
                error: function (result) {
                    pfUser.apiError(result, "ResEdit_1", "ResEdit_1");
                },
            });
        return ll;
    })

    return viewModel;
};



﻿PreflightMobile2.showError = function (params) {

    var viewModel = {
        viewShown : function () {
            setNavBar(false); //Show NavBar.
            console.log("oGlobalErrorNum: ", pfUser.oGlobalErrorNum());
            console.log("oGlobalError: ", pfUser.oGlobalError());
            //(viewModel.firstViewTF == true) ? viewModel.firstViewTF = false : viewModel.awardList.changed.fire(); // Refresh Data repeat visits. (first time is automatic.)
        }
    };

    return viewModel;
};

﻿PreflightMobile2.showConsole = function (params) {

    var viewModel = {
    };



    return viewModel;
};

﻿PreflightMobile2.menuDebug = function (params) {

    var viewModel = {
//  Put the binding properties here
    };

    return viewModel;
};

﻿PreflightMobile2.info = function (params) {

    var viewModel = {
        viewShown: function () { setNavBar(false); }, //Show NavBar.

    };

    return viewModel;
};

﻿PreflightMobile2.frequentParkingInfo = function (params) {

    var viewModel = {
        viewShown: function () { setNavBar(false); }, //Show NavBar.
    };

    return viewModel;
};

﻿PreflightMobile2.locList = function (params) {

    var viewModel = {
        firstViewTF: true,
        contactList: {
            changed: new $.Callbacks(),
            load: function (loadOptions) {
                if (loadOptions.refresh) {
                    var textarray = "";
                    var deferred = new $.Deferred();
                    $
                        .ajax({
                            dataType: "json",
                            url: apiUrl + "API/Home/ContactUsList",
                            headers: { 'Authorization': 'Session ' + pfUser.authToken },
                            type: 'POST',
                            async: false,
                            success: function (result) {                              
                                textarray = result;
                            },
                            error: function (result) {
                                pfUser.apiError(result, "locList", "locList");
                            }
                        });
                    return textarray;
                }
            }
        }
    };
    viewModel.viewShown = function () {
        setNavBar(false); //Show NavBar.
        //(viewModel.firstViewTF == true) ? viewModel.firstViewTF = false : viewModel.contactList.changed.fire(); // Refresh Data repeat visits. (first time is automatic.)
    }

    return viewModel;
};

﻿PreflightMobile2.termsOfUse = function (params) {

    var viewModel = {
        viewShown: function () { setNavBar(false); }, //Show NavBar.
    };

    return viewModel;
};

﻿PreflightMobile2.locDetails = function (params) {

    var viewModel = {
        Abbreviation: ko.observable(),
        Address1: ko.observable(),
        Address2: ko.observable(),
        Code: ko.observable(),
        Contact: ko.observable(),
        Email: ko.observable(),
        emailMailTo: ko.observable(),
        Fax: ko.observable(),
        ID: ko.observable(),
        Location: ko.observable(),
        Phone: ko.observable(),
        MapImgUrl: ko.observable(),
        LocationMapUrl: ko.observable(),
        CouponHtml: ko.observable(),
        AlertHtml: ko.observable(),
        DirectionsHtml: ko.observable(),
        SurveyUrl: ko.observable(),
        WhatToExpectHtml: ko.observable(),
        AlertClass: ko.observable("BoxAlert ListSmall"),

        viewShown: function () { setNavBar(false); }, //Show NavBar.

        
    };

    viewModel.locationInfo = ko.computed(function () {
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/home/LocationById",
            type: 'POST',
            data: {
                locationID: params.id
            },
            async: false,
            success: function (result) {
                var r = result[0];
                viewModel.Abbreviation(r.Abbreviation);
                viewModel.Address1(r.Address1);
                viewModel.Address2(r.Address2);
                viewModel.AlertHtml(r.Alert);
                viewModel.Code(r.Code);
                viewModel.Contact(r.Contact);
                viewModel.CouponHtml(r.CouponText);
                viewModel.DirectionsHtml(r.Directions);
                viewModel.Email(r.Email);
                viewModel.emailMailTo("mailto:" + r.Email);
                viewModel.Fax(r.Fax);
                viewModel.ID(r.ID);
                viewModel.Location(r.Location);
                viewModel.LocationMapUrl(r.LocationMapUrl);
                viewModel.MapImgUrl(r.MapImgUrl);
                viewModel.Phone(r.Phone);
                viewModel.SurveyUrl(r.SurveyUrl);
                viewModel.WhatToExpectHtml(r.WhatToExpect);
                viewModel.AlertClass(viewModel.AlertHtml().length > 0 ?"BoxAlert ListSmall":"Hidden");
                
                //console.log("document.find('#divCoupon')", document.find("#divCoupon"));
                //console.log("locationInfo loaded", $("#simulatorFrame").contents().find("#divCoupon"));
                //console.log("locationInfo loaded", $("#simulatorFrame").contents().find("#divCoupon").html);
                //document.find("#divCoupon").html("hello");
                //$("#simulatorFrame").contents().find("#divCoupon").html(viewModel.CouponText());
                //console.log("locationInfo loaded", $("div#divCoupon"));
                //$("div#divCoupon").innerHTML = viewModel.CouponText();
                //console.log("locationInfo loaded", $("div#divCoupon").innerHTML);
            },
            error: function (result) {
                pfUser.apiError(result, "locDetails", "locDetails");
            }
        });

    })

    viewModel.AmenitiesList = ko.computed(function () {
        var deferred = new $.Deferred();
        $
            .ajax({
                dataType: "json",
                url: apiUrl + "API/Home/LocationAmenitiesList",
                type: 'POST',
                data: {
                    locationID: params.id
                },
                async: false,
                success: function (result) {
                    rslt = result;
                }
            });
        return rslt;
    })

    viewModel.btTest = function () {
        console.log("btTest pressed", $("#divCoupon"));
    }

    return viewModel;
};

﻿PreflightMobile2.privacyInfo = function (params) {

    var viewModel = {
        viewShown: function () { setNavBar(false); }, //Show NavBar.
    };

    return viewModel;
};

﻿PreflightMobile2.contactUs = function (params) {

    var viewModel = {
        firstViewTF: true,
        contactList: {
            changed: new $.Callbacks(),
            load: function (loadOptions) {
                if (loadOptions.refresh) {
                    var textarray = "";
                    var deferred = new $.Deferred();
                    $
                        .ajax({
                            dataType: "json",
                            url: apiUrl + "API/Home/ContactUsList",
                            headers: { 'Authorization': 'Session ' + pfUser.authToken },
                            type: 'POST',
                            async: false,
                            success: function (result) {
                                textarray = result;
                            },
                            error: function (result) {
                                pfUser.apiError(result, "contactUs", "contactUs");
                            }
                        });
                    return textarray;
                }
            }
        }
    };
    viewModel.viewShown = function () {
        setNavBar(false); //Show NavBar.
        //(viewModel.firstViewTF == true) ? viewModel.firstViewTF = false : viewModel.contactList.changed.fire(); // Refresh Data repeat visits. (first time is automatic.)
    }

    return viewModel;
};

﻿PreflightMobile2.customerReview = function (params) {

    var viewModel = {
        firstViewTF: true,
        cardList: {
            changed: new $.Callbacks(),
            load: function (loadOptions) {
                if (loadOptions.refresh) {
                    var textarray = "";
                    var deferred = new $.Deferred();
                    $
                        .ajax({
                            dataType: "json",
                            url: apiUrl + "API/Home/TestimonialList",
                            type: 'POST',
                            async: false,
                            success: function (result) {
                                textarray = result;
                            },
                            error: function (result) {
                                pfUser.apiError(result, "customerReview", "customerReview");
                            }
                        });
                    return textarray;
                }
            }
        }
    };
    viewModel.viewShown = function () {
        setNavBar(false); //Show NavBar.
        //(viewModel.firstViewTF == true) ? viewModel.firstViewTF = false : viewModel.cardList.changed.fire(); // Refresh Data repeat visits. (first time is automatic.)
    }

    return viewModel;
};

﻿PreflightMobile2.coupon = function (params) {

    var viewModel = {
        selectedLoc: ko.observable(pfUser.homeLocID),
        CouponHtml: ko.observable(),
        firstViewTF: true,
        QRText: ko.observable(),
        viewShown: function () {
            setNavBar(false);
            console.log("PFUser: ", pfUser);
            if (viewModel.firstViewTF == true) {                
                viewModel.qrinfo();
            }
        }
    };

    viewModel.qrinfo = function () {
        viewModel.firstViewTF = false;
        var deferred = new $.Deferred();
        $.ajax({
            dataType: "json",
            url: apiUrl + "API/Account/userCoupon",
            headers: { 'Authorization': 'Session ' + pfUser.authToken },
            type: 'POST',
            data: {
                locID: viewModel.selectedLoc()
            },
            async: false,
            success: function (result) {
                var r = result[0];
                viewModel.CouponHtml(r.CouponHTML)
                viewModel.QRText("~" + r.PrimaryCardID + "|" + r.CardNumber + "|" + r.acctName + "|" + r.CouponVCD + "|" + r.CouponText);

            },
            error: function (result) {
                pfUser.apiError(result, "coupon", "coupon");
                console.log("Authorization failed 2 - MDS");
            }
        });

    };

    viewModel.setQR = ko.computed(function () {
        //if (viewModel.selectedLoc > 0) {
            console.log("setting QR: ", viewModel.QRText())
            jQuery('#QR').qrcode({
                text: viewModel.QRText(),
                width: 135,
                height: 135
            });
        //}
        //else {
        //   $("#QR").html("Hello World");
        //}
    });

    //load location list
    viewModel.locationList = ko.computed(function () {
        var deferred = new $.Deferred();
        $
            .ajax({
                dataType: "json",
                url: apiUrl + "API/Home/locationLookupList",
                type: 'POST',
                async: false,              
                success: function (result) {
                    ll = result;
                },
                error: function (result) {
                    RemoveViewFromCache("acct_Info");
                    pfUser.apiError(result, "acct_Info", "acct_Info");
                }
            });
        return ll;
    });

    viewModel.selectedLoc.subscribe(function (newValue) {             
        $('#QR').empty();
        viewModel.qrinfo();
    });

    return viewModel;
};

﻿PreflightMobile2.expressPassInfo = function (params) {

    var viewModel = {
        viewShown: function () { setNavBar(false); }, //Show NavBar.
        btSignUp: function () { PreflightMobile2.app.navigate("expressPassList/New"); }

    };

    return viewModel;
};
