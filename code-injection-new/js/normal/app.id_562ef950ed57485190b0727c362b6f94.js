
window.BGS2 = $.extend(true, window.BGS2, {
  "config": {
      "defaultLayout": "navbar",
      "navigation": [
           {
               "title": "Login",
               "action": "#Login",
               visible: ko.observable(false)
           },
      {
        "title": "Customers",
        "action": "#ManagementList"
      },
      {
        "title": "Buildings",
        "action": "#BuildingList",
        visible: ko.observable(false)
      },
      {
        "title": "Building Info",
        "action": "#BuildingInfo",
        visible: ko.observable(false)
      }
    ]
  }
});

﻿window.BGS2 = window.BGS2 || {};
var USERNAME = '', PASSWORD = '', MID = '', BID = '', BNAME = '', USERID = '', ISADMIN = false;

$(function () {
    DevExpress.devices.current("iPhone");
    BGS2.app = new DevExpress.framework.html.HtmlApplication({
        namespace: BGS2,
        themeClasses: "dx-theme-ios dx-theme-ios-typography",
        defaultLayout: BGS2.config.defaultLayout,
        disableViewCache: true,
        navigation: BGS2.config.navigation
    });
    BGS2.app.router.register(":view/:id", { view: "Login", id: undefined });
  
        db = window.openDatabase("Database", "1.0", "BGSdb", 200000);
        db.transaction(checkCredentials, errorCB);
   


});
function checkCredentials(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS Credentials (id unique, data)');
    tx.executeSql('SELECT * FROM Credentials', [], storageSUC, storageERR);//
}

function storageSUC(tx, results) {
    if (results.rows.length > 0) {
        if (results.rows.item(2).data > 1) 
            BGS2.app.navigate("ManagementList", { root: true });// target: 'current',
        else 
            BGS2.app.navigate("BuildingList/" + results.rows.item(3).data, { root: true });// target: 'current',parsed.MemberOfCompanys[0]
    }
    else 
        BGS2.app.navigate("Login", { root: true });
    
}

function storageERR(err) {
    BGS2.app.navigate("Login");
}

function errorCB(tx, err) {
    BGS2.app.navigate("Login", { root: true });
}
function deleteDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS Credentials');
}

function deleteErr() {
    DevExpress.ui.dialog.alert("Delete Error",'Error');
}

function deleteSUC() {
    BGS2.app.navigate("Login", { root: true }); //   target: 'current', clearHistory: true
}

function SetUandP(username, password, userid, isAdmin) {
    USERNAME = username;
    PASSWORD = password;
    USERID = userid;
    ISADMIN = isAdmin;
}

function setManagement(mid) {
    MID = mid;
}

function setBuilding(bid, bname) {
    BID = bid;
    BNAME = bname;
}
























﻿/// <reference path="../js/jquery-1.9.1.min.js"; />
/// <reference path="../js/knockout-2.2.1.js"; />
/// <reference path="../js/dx.all.js"; />

(function() {
    BGS2.db = {

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

﻿BGS2.Login = function (params) {
    var db = '',  parsed = '';
    //function checkCredentials(tx) {
    //    tx.executeSql('CREATE TABLE IF NOT EXISTS Credentials (id unique, data)');
    //    tx.executeSql('SELECT * FROM Credentials', [], storageSUC, storageERR);
    //}

    //function storageSUC(tx, results) {
    //    if (results.rows.length > 0) {
    //        if (results.rows.item(2).data > 1)
    //            BGS2.app.navigate("ManagementList", { target: 'current', clearHistory: true });
    //        else
    //            BGS2.app.navigate("BuildingList/" + results.rows.item(3).data, { target: 'current', clearHistory: true });//parsed.MemberOfCompanys[0]
    //    }
    //}

    //function storageERR(err) {
    //    DevExpress.ui.dialog.alert(err,'Error');
    //}

    function populateDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS Credentials');
        tx.executeSql('CREATE TABLE IF NOT EXISTS Credentials (id unique, data)');
        tx.executeSql('INSERT INTO Credentials (id, data) VALUES (1, "' + viewModel.username().toString() + '")');
        tx.executeSql('INSERT INTO Credentials (id, data) VALUES (2, "' + viewModel.password().toString() + '")');
        tx.executeSql('INSERT INTO Credentials (id, data) VALUES (3, "' + parsed.MemberOfCompanys.length + '")');
        tx.executeSql('INSERT INTO Credentials (id, data) VALUES (4, "' + parsed.MemberOfCompanys[0] + '")');
        tx.executeSql('INSERT INTO Credentials (id, data) VALUES (5, "' + parsed.IsAdministrator + '")');
        tx.executeSql('INSERT INTO Credentials (id, data) VALUES (6, "' + parsed.UserID + '")');
    }

    function errorCB(tx, err) {
        DevExpress.ui.dialog.alert("Error in Credentials",'Error');
    }

    function successCB(tx, results) {
        if (parsed.MemberOfCompanys.length > 1)
            BGS2.app.navigate("ManagementList", { target: 'current',  root: true });
        else {
            setManagement(parsed.MemberOfCompanys[0]);
            BGS2.app.navigate("BuildingList/" + parsed.MemberOfCompanys[0], { target: 'current', root: true });
        }
    }

    //function deleteSUC() {
    //    if (parsed.MemberOfCompanys.length > 1)
    //        BGS2.app.navigate("ManagementList", { target: 'current', clearHistory: true });
    //    else {
    //        setManagement(parsed.MemberOfCompanys[0]);
    //        BGS2.app.navigate("BuildingList/" + parsed.MemberOfCompanys[0], { target: 'current', clearHistory: true });
    //    }
    //}

    var viewModel = {
        username: ko.observable(''),
        password: ko.observable(''),
        checkstate: ko.observable(true),
        viewShown: function () {
            $(".layout-footer").remove();
            //db = window.openDatabase("Database", "1.0", "BGSdb", 200000);
            //db.transaction(checkCredentials, errorCB);
        },
        login1: function () {
            xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
            var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><mobile_getUserSerialized xmlns="http://tempuri.org/"><aUserName>' + viewModel.username() + '</aUserName><aPassword>' + viewModel.password() + '</aPassword><aPath></aPath><aSysPath></aSysPath></mobile_getUserSerialized></soap:Body></soap:Envelope>';
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        doc = xmlhttp.responseXML;
                        xmlreponse = doc.getElementsByTagName("mobile_getUserSerializedResult")[0].textContent;
                        if (xmlreponse != "null") {
                            parsed = JSON.parse(xmlreponse);

                            db = window.openDatabase("Database", "1.0", "BGSdb", 200000);
                            if (viewModel.checkstate() == true)
                                db.transaction(populateDB, errorCB, successCB);
                            else 
                                db.transaction(deleteDB, deleteErr, deleteSUC);

                            SetUandP(viewModel.username(), viewModel.password(), parsed.UserID, parsed.IsAdministrator);
                        }
                        else
                            DevExpress.ui.dialog.alert('Please enter valid username and password', 'Invalid');
                    }
                    else
                       DevExpress.ui.dialog.alert('Error Retrieving Data','Error:');
                }
            }
            xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/mobile_getUserSerialized");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
            xmlhttp.send(sr);
        }
    };

    return viewModel;
};

﻿BGS2.Contacts = function (params) {

    function getContacts() {
        viewModel.BName(BNAME);
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getCustomerContacts_mobile xmlns="http://tempuri.org/"><aCustomerID>'+MID+'</aCustomerID><aBuildingID>'+BID+'</aBuildingID><aUSerName>'+USERNAME+'</aUSerName><aPassword>'+PASSWORD+'</aPassword></getCustomerContacts_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    doc = xmlhttp.responseXML;
                    xmlreponse = doc.getElementsByTagName("getCustomerContacts_mobileResult")[0].textContent;
                    parsed = JSON.parse(xmlreponse);
                    contactList = parsed.substring(15, parsed.length - 2).replace(/\"/g, "");
                    
                    myArray = new DevExpress.data.ArrayStore({ key: 'contactid', data: [] });
                    var items = contactList.split('},{');
                    for (i = 0; i < items.length; i++) {
                        itemA = items[i].split(',');
                        var add = { contactid: itemA[0].split(' : ')[1], fullname: itemA[5].split(' : ')[1], phone: itemA[10].split(' : ')[1], mobile: itemA[13].split(' : ')[1], emailaddress: itemA[15].split(' : ')[1], title: itemA[14].split(' : ')[1], fax: itemA[12].split(' : ')[1], receivealerts: itemA[18].split(' : ')[1], receivedailyreports: itemA[19].split(' : ')[1], receivedailyalerts: itemA[20].split(' : ')[1], receivesms: itemA[21].split(' : ')[1], mobilecarrier: itemA[22].split(' : ')[1], alerttemplateid: itemA[16].split(' : ')[1], };
                        myArray.insert(add).done(function (createdItem, createdID) { });  
                    }
                    viewModel.ds(myArray);
                    viewModel.loadPanelVisible(false);
                }
                else {
                    DevExpress.ui.dialog.alert('Error loading Page', 'Page Error:');
                    viewModel.loadPanelVisible(false);
                }
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/getCustomerContacts_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }

   

    var viewModel = {
        ds:ko.observableArray(),
        loadPanelVisible: ko.observable(true),
        phone1: ko.observable(''),
        BName: ko.observable(''),
        viewShown: function () { $('#navBar').dxNavBar('instance').option('selectedIndex', 3); viewModel.loadPanelVisible(true); getContacts(); },
        logout: function () { var db = window.openDatabase("Database", "1.0", "Credentials DB", 200000); db.transaction(deleteDB, deleteErr, deleteSUC); },
        cdetail: function (e) { BGS2.app.navigate("ContactDetails/" + e.itemData.contactid + ',' + e.itemData.fullname + ',' + e.itemData.phone + ',' + e.itemData.mobile + ',' + e.itemData.emailaddress + ',' + e.itemData.title + ',' + e.itemData.fax + ',' + e.itemData.receivealerts + ',' + e.itemData.receivedailyreports + ',' + e.itemData.receivedailyalerts + ',' + e.itemData.receivesms + ',' + e.itemData.mobilecarrier + ',' + e.itemData.alerttemplateid); },
        AddCon: function (e) { BGS2.app.navigate("ContactDetails/,,,,,,,,,,,,,"); }
    };

    return viewModel;
};

﻿BGS2.Settings = function (params) {
    var parsed2, amtofRS = '', tables, tables2 = '', MySender = true, values2 = '', values = '', myRow='';
    function settingsGV() {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getGroupsRulesetsForBuildings_mobile xmlns="http://tempuri.org/"><aCustomerID>' +MID + '</aCustomerID><aBuildingList>' + BID + '</aBuildingList><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></getGroupsRulesetsForBuildings_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try{
                        doc = xmlhttp.responseXML;
                        xmlreponse = doc.getElementsByTagName("getGroupsRulesetsForBuildings_mobileResult")[0].textContent;
                        parsed = JSON.parse(xmlreponse);
                        tables = parsed.toString().replace(/\"/g, "").split('}]}{Rulesets');
                        groups = tables[0].split('},{');
                        myArray = new DevExpress.data.ArrayStore({ text: [] });
                        for (i = 0; i < groups.length; i++) {
                            var add = { text: groups[i].split(',')[1].split(' : ')[1] };
                            myArray.insert(add).done(function (createdItem, createdID) { });
                        }
                        viewModel.tabs(myArray);
                        getTabContent(groups[0].split(',')[1].split(' : ')[1]);
                        viewModel.bname(BNAME);
                    }
                    catch (err) {
                        DevExpress.ui.dialog.alert(err, 'Page Error:');
                        viewModel.loadPanelVisible(false);
                    }
                }
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/getGroupsRulesetsForBuildings_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }

    function getTabContent(RSgroup) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getSetPoints_CT_mobile xmlns="http://tempuri.org/"><aBuildingID>' + BID + '</aBuildingID><aRelay></aRelay><aOverrides>' + false + '</aOverrides><aWeekEnd>' + false + '</aWeekEnd><aRSGroup>' + RSgroup + '</aRSGroup><aRSGroup2>' + RSgroup + '</aRSGroup2><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></getSetPoints_CT_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    doc = xmlhttp.responseXML;
                    xmlreponse = doc.getElementsByTagName("getSetPoints_CT_mobileResult")[0].textContent;
                    parsed2 = JSON.parse(xmlreponse);
                    amtofRS = '';
                    tables2 = parsed2.toString().replace(/\"/g, "").split('}]}{');
                    var mytable = '';
                    var myID = '';
                    if (tables2.length > 3) {
                        sps = tables2[0].substring(17, tables2[0].length).split('},{');
                        sps2 = tables2[1].split('},{');
                        sps3 = tables2[3].substring(13, tables2[0].length).split('},{');
                        for (h = 1; h < sps3[0].split(',').length; h++) {
                            if (sps3[0].split(',')[h].split(' : ')[0] != 'Total')
                                amtofRS += sps3[0].split(',')[h].split(' : ')[0] + ',';
                        }
                        mytable = '<div align="center"><table width="94%"  style="font-size:16px;" id="SettingsTable"><tr style=" font-weight:bold; border-bottom:3px groove;"><td>SP Name</td><td>Time</td>';
                        if (amtofRS.split(',').length > 1)
                            viewModel.direct('both');
                        else
                            viewModel.direct('vertical');
                        for (f = 0; f < amtofRS.split(',').length - 1; f++)
                            mytable += '<td width="40px">' + amtofRS.split(',')[f] + '</td>';
                        mytable += '<td></td><td></td></tr>';
                        for (var a = 0; a < sps.length; a++) {
                            mysp = sps[a].split(',')
                            times = mysp[5].split(' : ')[1].split(' ');
                            myTime = times[1].substring(0, times[1].length - 3) + ' ' + times[2];
                            mytable += '<tr class="' + a + '" id="' + mysp[0].split(' : ')[1] + '" style="border-bottom:2px groove; line-height:45px; background-color:#BAC0CD;"><td width="105px" style="padding-left:6px">' +
                            '<input   class = "' + a + '" disabled="true" style="height:30px; font-size:15px;font-family:Arial Unicode MS; background-color:transparent; border:none; width:90px; text-align:center;" value="' + mysp[2].split(' : ')[1] + '" /></td>' +
                            '<td width="110px"><input  style="height:30px; font-size:15px;font-family:Tahoma; background-color:transparent; border:none; width:100px; " class = "' + a + '"  type="time" disabled="true"  value="' + convertTime(myTime) + '" /></td>';
                            for (var c = 0; c < sps3.length; c++) {
                                if (sps3[c].split(',')[0].split(' : ')[1] == mysp[0].split(' : ')[1]) {
                                    for (d = 0; d < sps3[c].split(',').length; d++) {
                                        for (g = 0; g < amtofRS.split(',').length - 1; g++) {
                                            if (sps3[a].split(',')[d].split(' : ')[0] == amtofRS.split(',')[g]) {
                                                for (var n = 0; n < sps2.length; n++) {
                                                    if (sps2[n].split(',')[3].split(' : ')[1] == mysp[0].split(' : ')[1] && sps2[n].split(',')[4].split(' : ')[1] == amtofRS.split(',')[g]) {
                                                        myID = sps2[n].split(',')[0].split(' : ')[1];
                                                        myVal = sps3[c].split(',')[d].split(' : ')[1].substring(0, sps3[c].split(',')[d].split(' : ')[1].length - 3);
                                                    }
                                                }
                                                mytable += '<td width="45px"><input id="' + myID + '" style="height:30px; font-size:15px;font-family:Tahoma; background-color:transparent; border:none; width:35px; text-align:center;" class = "' + a + '" disabled="true"  value="' + myVal + '" /></td>';
                                            }
                                        }
                                    }
                                    break;
                                }
                            }
                            mytable += '<td style="text-align:right; padding-right:6px"><input  class="myButtons" type="button" value = "X" id="' + mysp[0].split(' : ')[1] + '"/></td></tr>'; //id="' + mysp[0].split(' : ')[1] + '"
                        }
                        mytable += '</table></div>';
                        viewModel.HtmlGV(mytable);
                        if (ISADMIN == 'true') {
                            var rows = document.getElementById("SettingsTable").getElementsByTagName("td");
                            for (j = 0; j < rows.length; j++) {
                                $(rows[j]).click(function (e) {
                                    EditMode();
                                });
                            }
                        }
                        buttons = document.getElementsByClassName("myButtons");
                        for (m = 0; m < buttons.length; m++) {
                            $(buttons[m]).click(function () { DeleteSP(RSgroup); });
                        }
                        if ($('#settingsGV').children().width() <= $(window).width())
                            $('#settingsGV').width($(window).width());
                        else
                            $('#settingsGV').width($('#settingsGV').children().width());
                        
                    }
                    else {
                        viewModel.direct('vertical');
                        mytable = '<div width="100%" align="center">No Data to Display</div>';
                        viewModel.HtmlGV(mytable);
                    }
                    viewModel.loadPanelVisible(false);
                }
                else {
                    DevExpress.ui.dialog.alert('Error loading Data', 'Page Error:');
                    viewModel.loadPanelVisible(false);
                }
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/getSetPoints_CT_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }

    function convertTime(timeStr) {
        var meridian = timeStr.substr(timeStr.length - 2).toLowerCase();
        var hours = timeStr.substring(0, timeStr.indexOf(':'));
        var minutes = timeStr.substring(timeStr.indexOf(':') + 1, timeStr.indexOf(' '));
        if (meridian == 'pm') {
            hours = (hours == '12') ? '00' : parseInt(hours) + 12;
        }
        else if (hours.length < 2) {
            hours = '0' + hours;
        }
        return hours + ':' + minutes;
    }

    function EditMode() {
        var newSender = '';
        var ids = '';
        newSender = (this && this.target) || (window.event && window.event.srcElement);
      
        if (MySender != false) {
            values2 = '';
            myRow = document.getElementById("SettingsTable").getElementsByClassName(newSender.className);
            for (l = 0; l < myRow.length; l++) {
          
                if (myRow[l].tagName == 'INPUT') { 
                    myRow[l].disabled = false;
                    myRow[l].style.backgroundColor = '#FFFFFF';
                    myRow[l].style.border = '2px solid #E8C77A';
                    myRow[l].style.borderRadius = '10px';
                    values2 += myRow[l].value + ',';
                    MySender = myRow[1].disabled;
                }
            }           
        }
        else {
            if (newSender.className != myRow[1].className) {
            values = '';
            for (l = 0; l < myRow.length; l++) {
                if (myRow[l].tagName == 'INPUT') {
                    myRow[l].disabled = true;
                    myRow[l].style.backgroundColor = 'transparent';
                    myRow[l].style.border = 'none';
                    values += myRow[l].value + ',';
                    ids += myRow[l].id + ',';
                    MySender = true;
                }
            }
            if (values != '' && values != values2) {
                updateSetpoint(myRow[0].id, values, ids);
            }
           }
        }   
    }

    function updateSetpoint(SetPointID, values, ids) {
        myvals = values.split(',');
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><updateSetpoint_mobile xmlns="http://tempuri.org/"><aSetPointID>' + SetPointID + '</aSetPointID><aBuildingID>' +BID + '</aBuildingID><aSetPointName>' + myvals[0] + '</aSetPointName><aSetPointMode>2</aSetPointMode><isOverride>' + false + '</isOverride><aFromTime>' + myvals[1] + '</aFromTime><aToTime>' + myvals[1] + '</aToTime><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></updateSetpoint_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    for (i = 0; i < ids.split(',').length; i++) {
                        if (ids.split(',')[i] != '') {
                            xmlhttp2 = new XMLHttpRequest();
                            xmlhttp2.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
                            var sr2 = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><updateGoalValue_mobile xmlns="http://tempuri.org/"><aBuildingID>' + BID + '</aBuildingID><aRulesetID>' + parseInt(ids.split(',')[i]) + '</aRulesetID><aGoalValue>' + parseInt(myvals[i]) + '</aGoalValue><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></updateGoalValue_mobile></soap:Body></soap:Envelope>';
                            xmlhttp2.onreadystatechange = function () {
                                if (xmlhttp2.readyState == 4) {
                                    if (xmlhttp2.status == 200) {

                                        viewModel.myMess('Setpoint Updated Successfully.'); //A message has been sent the the building with updated setpoint. It may take several moments for changes to take effect.
                                        viewModel.toastVisible(true);

                                        //                            xmlhttp3 = new XMLHttpRequest();
                                        //                            xmlhttp3.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
                                        //                            var sr3 = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><updateMessageInfo_mobile xmlns="http://tempuri.org/"><aMessageID>-1</aMessageID><aBuildingID>' + BID + '</aBuildingID><aMessageTypeID>0</aMessageTypeID><aParam1>com</aParam1><aParam2></aParam2><aData>s</aData><aStatus>false</aStatus><aTimestamp>string</aTimestamp><aLastUpdated>string</aLastUpdated><aAgent>' +  USERNAME + '</aAgent><aUSerName>' +  USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></updateMessageInfo_mobile></soap:Body></soap:Envelope>';
                                        //                            xmlhttp3.onreadystatechange = function () {
                                        //                                if (xmlhttp3.readyState == 4) {
                                        //                                    if (xmlhttp3.status == 200) {
                                        //                                      ((BGCWS.BGCMainWS)Session["BGCWS"]).updateMessageInfo(-1, (int)Session["CURRENT_BUILDINGID"], 0, com, "", s, false, DateTime.Now, DateTime.Now, ((BGCWS.BGCUser)Session["SEC_USER"]).UserName + " - " + ((BGCWS.BGCUser)Session["SEC_USER"]).LastName + ", " + ((BGCWS.BGCUser)Session["SEC_USER"]).FirstName, (BGCWS.BGCUser)Session["SEC_USER"]);
                                        //                                    }
                                        //                                }
                                        //                            }
                                        //                            xmlhttp3.setRequestHeader("SOAPAction", "http://tempuri.org/updateMessageInfo_mobile");
                                        //                            xmlhttp3.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
                                        //                            xmlhttp3.send(sr3);

                                    }
                                    else 
                                        DevExpress.ui.dialog.alert('Error Updating','Error:');
                                }
                            }
                     
                            xmlhttp2.setRequestHeader("SOAPAction", "http://tempuri.org/updateGoalValue_mobile");
                            xmlhttp2.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
                            xmlhttp2.send(sr2);
                        }
                    }
                }
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/updateSetpoint_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }

    function DeleteSP(tab) {
        if (ISADMIN == 'true') {
            var sender = (this && this.target) || (window.event && window.event.srcElement);
            var result = DevExpress.ui.dialog.confirm("Are you sure you want to delete this setpoint?", "Confirm changes");
            result.done(function (dialogResult) {
                if (dialogResult == true) Del2(tab, sender.id);
            });
        }
        else {
            DevExpress.ui.dialog.alert('Admin status is needed to delete this setpoint', 'Alert:');
        }
    }

    function Del2(tab, newID){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><deleteSetpoint_mobile xmlns="http://tempuri.org/"><aBuildingID>' + BID + '</aBuildingID><aSetpointid>' + parseInt(newID) + '</aSetpointid><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></deleteSetpoint_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    viewModel.loadPanelVisible(false);
                    getTabContent(tab);
                    viewModel.myMess('Setpoint Deleted Successfully.');
                    viewModel.toastVisible(true);
                }
                else {
                        DevExpress.ui.dialog.alert('Error Deleting','Error:');
                        viewModel.loadPanelVisible(false);
                     }
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/deleteSetpoint_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }

    function createGoals() {
        var gth = '<table id="goalsTBL">';
        rows = tables[1].substring(0, tables[1].length - 3).split('},{');
        for (i = 0; i < rows.length; i++) {
            if (rows[i].split(',')[2].split(' : ')[1] != 'Cycles' && rows[i].split(',')[2].split(' : ')[1] != 'Cycle')
            gth += '<tr><td>' + rows[i].split(',')[2].split(' : ')[1] + '</td><td><input id="' + rows[i].split(',')[2].split(' : ')[1] + ':' + rows[i].split(',')[3].split(' : ')[1] + '" style="font-family:Arial Unicode MS;padding-left:5px; width:55px;border-radius:7px;height:20px;" type="text" value = ' + getVal(rows[i].split(',')[2].split(' : ')[1]) + ' /></td></tr>';
        }
        gth += '</table>';
        viewModel.goalsTB(gth);
        viewModel.PopupVisible(true);
    }

    function getVal(rs) {
        switch (rs) {
            case "HW":
                return 170;
                break;
            case "Space":
                return 72;
                break;
            case "Out":
                return 55;
                break;
            default:
                return 0;
                break;
        }
    }

    function SaveNew() {

        //  viewModel.loadPanelVisible(true);
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><updateSetpoint_mobile xmlns="http://tempuri.org/"><aSetPointID>' + -1 + '</aSetPointID><aBuildingID>' + BID + '</aBuildingID><aSetPointName>' + (viewModel.spname() == '' ? 'New Setpoint' : viewModel.spname()) + '</aSetPointName><aSetPointMode>2</aSetPointMode><isOverride>' + false + '</isOverride><aFromTime>' + viewModel.sptime().getHours() + ':' + viewModel.sptime().getMinutes() + '</aFromTime><aToTime>' + viewModel.sptime().getHours() + ':' + viewModel.sptime().getMinutes() + '</aToTime><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></updateSetpoint_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                 try{
                var SPID = xmlhttp.responseXML.getElementsByTagName("updateSetpoint_mobileResult")[0].textContent.replace(/\"/g, "");
                var inputs = document.getElementById("goalsTBL").getElementsByTagName("input");
                var val = '';
                for (var i = 0; i < inputs.length; i++) {
                    val = inputs[i].value == 0 ? '' : inputs[i].value;
                    xmlhttp2 = new XMLHttpRequest();
                    xmlhttp2.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
                    var sr2 =  '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><updateRulesets_mobile xmlns="http://tempuri.org/"><aRulesetID>'+ -1 +'</aRulesetID><aBuildingID>' + BID + '</aBuildingID><aRSConfType>S</aRSConfType><aSetPointID>' + SPID + '</aSetPointID><aRuleSetName>' + inputs[i].id.split(':')[0] + '</aRuleSetName><aRulesetGroup>unknown</aRulesetGroup><aGoalValue>' + val + '</aGoalValue><aOperator>'+0+'</aOperator><aRuleSetType>' + 0 + '</aRuleSetType><aLogicalType>' + 0 + '</aLogicalType><aDiffHi>'+ parseFloat(.5, 10) +'</aDiffHi><aDiffLo>' + parseFloat(.5, 10) + '</aDiffLo><aDisabledOnSummer>'+ false +'</aDisabledOnSummer><aRelayAssociated>' + inputs[i].id.split(':')[1] + '</aRelayAssociated><aCycleMode>' + true + '</aCycleMode><aRuleSetGroup2></aRuleSetGroup2><aShowExCharts>' + true + '</aShowExCharts><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></updateRulesets_mobile></soap:Body></soap:Envelope>';

                    xmlhttp2.onreadystatechange = function () {
                        if (xmlhttp2.readyState == 4){
                            if(xmlhttp2.status == 200) {
                                var RSiD = xmlhttp2.responseXML.getElementsByTagName("updateRulesets_mobileResult")[0].textContent;
                                viewModel.sptime(new Date());
                                viewModel.spname('');
                                viewModel.loadPanelVisible(false);
                                viewModel.PopupVisible(false);
                                viewModel.myMess('Setpoint Added Successfully.');
                                viewModel.toastVisible(true);
                            }
                            else {
                                DevExpress.ui.dialog.alert('Error Saving','Error:');
                                viewModel.loadPanelVisible(false);
                                viewModel.sptime(new Date());
                                viewModel.spname('');
                                viewModel.PopupVisible(false);
                            }
                        }
                    }
                    xmlhttp2.setRequestHeader("SOAPAction", "http://tempuri.org/updateRulesets_mobile");
                    xmlhttp2.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
                    xmlhttp2.send(sr2)
                }
                 }
                catch (err) {
                    viewModel.loadPanelVisible(false);
                    DevExpress.ui.dialog.alert(err, 'Error:');
                }
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/updateSetpoint_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);

    }

  
 
    var viewModel = {
        tabs: ko.observableArray(),
        tabClicked: function (e) { getTabContent(e.itemData.text) },
        selectedTab: ko.observable(0),
        loadPanelVisible: ko.observable(true),
        myContent: ko.observable(''),
        bname: ko.observable(''),
        hidePopup: function () { viewModel.PopupVisible(false); },
        PopupVisible: ko.observable(false),
        pVis: function () { createGoals(); },
        sptime: ko.observable(new Date()),
        spname: ko.observable(''),
        saveSP: function () { SaveNew(); },
        HtmlGV: ko.observable(),
        toastVisible: ko.observable(false),
        myMess: ko.observable(''),
        direct:ko.observable('vertical'),
        goalsTB: ko.observable(''),
        popup_onAfterShow: function (e) {
            var popupHeight = e.element.height();
            var popupTitleElement = e.element.find('.dx-popup-title');
            var popupContentElement = e.element.find('.dx-popup-content');
            var titleHeight = popupTitleElement.height() + parseInt(popupTitleElement.css('padding-top')) + parseInt(popupTitleElement.css('padding-bottom'));
            popupContentElement.height(popupHeight - titleHeight - parseInt(popupContentElement.css('padding-top')) - parseInt(popupContentElement.css('padding-bottom')));},
        viewShown: function () { $('#navBar').dxNavBar('instance').option('selectedIndex', 3); viewModel.loadPanelVisible(true); settingsGV(); },
        logout: function () { var db = window.openDatabase("Database", "1.0", "Credentials DB", 200000); db.transaction(deleteDB, deleteErr, deleteSUC); }
    };
    //http://www.devexpress.com/Support/Center/Question/Details/KA18803 scrollable
    return viewModel;

};

﻿BGS2.Boiler = function (params) {
    var boilers2 = '', relay = '', dailyReadings = '';
    function BoilerDiagram() {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getDevicesStatus_mobile xmlns="http://tempuri.org/"><aBuildingID>' + BID + '</aBuildingID><aRefreshOnly>' + false + '</aRefreshOnly><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></getDevicesStatus_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try{
                        doc = xmlhttp.responseXML;
                        xmlreponse = doc.getElementsByTagName("getDevicesStatus_mobileResult")[0].textContent;
                        parsed = JSON.parse(xmlreponse);
                        tables = parsed.replace(/\"/g, "").substring(10, parsed.length).split('Table');
                        viewModel.BName(BNAME);
                        var boilerDiagram = '<table style="position:relative; text-align:center;">';
                        for (var i = 0; i < tables[0].split('},{').length; i++) {
                            boilers = tables[0].split('},{');
                            (boilers[i].split(',')[3].split(' : ')[1] == 'True' ? boilers2 += boilers[i].split(',')[2].split(' : ')[1] + '-' + boilers[i].split(',')[1].split(' : ')[1] + '@':'');
                            switch (boilers[i].split(',')[4].split(' : ')[1]) {
                                case "1":
                                    boilerDiagram += '<tr><td style="height:200px;  border-bottom:thin solid #42556F;"><img src = "Images/Boiler.png" /></td></tr>';
                                    break;
                                case "2":
                                    boilerDiagram += '<tr><td style="height:200px;  border-bottom:thin solid #42556F;"><img src = "Images/Valvenew.png" /></td></tr>';
                                    break;
                                case "3":
                                    boilerDiagram += '<tr><td style="height:200px; border-bottom:thin solid #42556F;"><img src = "Images/Pumprsz2.png" /></td></tr>';
                                    break;
                                case "5":
                                    boilerDiagram += '<tr><td style="height:200px;   border-bottom:thin solid #42556F;"><img width="230px" src = "Images/TankandLogo.gif" /></td></tr>';
                                    break;
                            }
                      
                            boilerDiagram += '<tr><td style="position:relative">';
                            sensors = tables[2].split('},{');
                            var coil;
                            for (var a = 0; a < sensors.length; a++) {
                                if (boilers[i].split(',')[4].split(' : ')[1] == "1") {
                                    switch (sensors[a].split(',')[3].split(' : ')[1]) {
                                        case "0": //aqua
                                            boilerDiagram += '<table style=" position:absolute;  top:' + (-105) + 'px; left:170px;"><tr><td><div id="AquaDiv" class = "divTemps" style="cursor:pointer;"><img src = "Images/Label.png" style="position:relative;" /><p style="position:relative; top:-32px; font-size:10px; font-family:Arial; color:navy; font-weight:bold;">AQUA</p><p  style="position:relative; top:-32px; font-family:Arial; font-size:10px; color:#D5693A; font-weight:bold;">' + sensors[a].split(',')[4].split(' : ')[1] + '</p></div></td></tr></table>';
                                            break;
                                        case "1":
                                            coil = sensors[a].split(',')[4].split(' : ')[1];
                                            break;
                                        case "2": //1-coil,2-dhw
                                            boilerDiagram += '<table style="position:absolute;top:' + (-140) + 'px; left:0px;"><tr><td><div id="DHWDiv" class = "divTemps" style="cursor:pointer;" ><img width="85px" height="40px" src = "Images/Label.png" style="position:relative;"><p style="position:relative; top:-42px; font-size:10px; font-family:Arial; color:navy; font-weight:bold;">DHW</p><p id="DHWDiv" style="position:relative; top:-42px; font-family:Arial; font-size:10px; color:#D5693A; font-weight:bold;"><span  style=" font-size:10px; font-family:Arial; color:navy; font-weight:bold;">PreMix: </span>' + coil + '</p><p   id="DHWDiv" style="position:relative; top:-42px; font-family:Arial; font-size:10px; color:#D5693A; font-weight:bold;"><span style=" font-size:10px; font-family:Arial; color:navy; font-weight:bold;">PostMix: </span>' + sensors[a].split(',')[4].split(' : ')[1] + '</p></div></td></tr></table>';
                                            break;
                                        case "3": //return
                                            boilerDiagram += '<table style=" position:absolute; top:' + (-34) + 'px; left:185px;"><tr><td><div id="ReturnDiv" class = "divTemps" style="cursor:pointer;"><img src = "Images/Label.png" style="position:relative;"><p style="position:relative; top:-32px; font-size:10px; font-family:Arial; color:navy; font-weight:bold;">RETURN</p><p  style="position:relative; top:-32px; font-family:Arial; font-size:10px; color:#D5693A; font-weight:bold;">' + sensors[a].split(',')[4].split(' : ')[1] + '</p></div></td></tr></table>';
                                            break;
                                        case "5": //stack
                                            boilerDiagram += '<table style="position:absolute; top:' + (-167) + 'px; left:155px;"><tr><td><div id="StackDiv" class = "divTemps" style="cursor:pointer; "><img src = "Images/Label.png" style="position:relative;"><p style="position:relative; top:-32px; font-size:10px; font-family:Arial; color:navy; font-weight:bold;">STACK</p><p  style="position:relative; top:-32px; font-family:Arial; font-size:10px; color:#D5693A; font-weight:bold;">' + sensors[a].split(',')[4].split(' : ')[1] + '</p></div></td></tr></table>';
                                            break;
                                        case "9": //meter
                                            boilerDiagram += '<table style="position:absolute; top:' +  (-190) + 'px; left:40px;"><tr><td><div id="MeterDiv" class = "divTemps" style="cursor:pointer;"><img src = "Images/Label.png" style="position:relative;"><p style="position:relative; top:-32px;  font-size:10px; font-family:Arial; color:navy; font-weight:bold;">METER</p><p  style="position:relative; top:-32px; font-family:Arial; font-size:10px; color:#D5693A; font-weight:bold;">' + sensors[a].split(',')[4].split(' : ')[1] + '</p></div></td></tr></table>';
                                            break;
                                    }
                                }
                            }
                            boilerDiagram += (boilers[i].split(',')[4].split(' : ')[1] == "1" ? '<div style="position:absolute; left:170px; top:' + (-70) + 'px; color:white; font-size:11px;">' + boilers[i].split(',')[2].split(' : ')[1] + '</div></td></tr>':'</td></tr>');

                            calls = tables[1].substring(5, tables[1].length).split('},{');
                            var boilerflamestatus = '<tr><td style="position:relative"><div style="position:absolute; top:' + (-190) + 'px; left:60px;">';
                            for (var b = 0; b < calls.length; b++) {

                                if (calls[b].split(',')[0].split(' : ')[1] == boilers[i].split(',')[0].split(' : ')[1]) {
                                    if (calls[b].split(',')[8].split(' : ')[1] == "True") {
                                        boilerflamestatus = boilerflamestatus.replace(boilerflamestatus.toString(), '<tr><td style="position:relative"><div style="position:absolute; top:' + (-54) + 'px; left:15px;"><img width="40px" height="50px" src="Images/on-switch_boiler.gif" style="position:relative;" /></div>');
                                        if (calls[b].split(',')[5].split(' : ')[1] == "True") {
                                            boilerDiagram += '<tr><td style="position:relative"><div style="position:absolute; top:' + (-130) + 'px; left:75px;"><img width="68px" height="68px" src="Images/flame-high.gif" style="position:relative;" /></div></td></tr>';
                                            viewModel.switchState(true);
                                        }
                                        break;
                                    }
                                    else if (calls[b].split(',')[5].split(' : ')[1] == "True" && calls[b].split(',')[8].split(' : ')[1] == "False") {
                                        boilerDiagram += '<div style="position:absolute; top:' + (-130) + 'px; left:75px;"><img width="68px" height="68px" src="Images/flame-high.gif" style="position:relative;" /></div>';
                                        boilerflamestatus = boilerflamestatus.replace(boilerflamestatus.toString(), '<tr><td style="position:relative"><div style="position:absolute; top:' + (-54) + 'px; left:15px;"><img width="40px" height="50px" src="Images/off-switch_boiler.gif" style="position:relative;" /></div>');
                                        viewModel.switchState(true);
                                        break;
                                    }
                                    else if (calls[b].split(',')[8].split(' : ')[1] == "False")
                                        boilerflamestatus = boilerflamestatus.replace(boilerflamestatus.toString(), '<tr><td style="position:relative"><div style="position:absolute; top:' + (-54) + 'px; left:15px;"><img width="40px" height="50px" src="Images/off-switch_boiler.gif" style="position:relative;" /></div>');
                                }
                            }
                            boilerflamestatus += '</td></tr>';
                            boilerDiagram += boilerflamestatus;
                        }

                        boilerDiagram += '</table>';



                        viewModel.text1(boilers2.split('@')[0].split('-')[0]);
                        myArray = new DevExpress.data.ArrayStore({ text: [] });
                        for (var g = 0; g < boilers2.split('@').length - 1; g++) {
                        
                            var add = { text: boilers2.split('@')[g] };
                            myArray.insert(add);
                        }
                        viewModel.allRelays(myArray);

                        viewModel.boilerD(boilerDiagram);

                        var cells = document.getElementsByClassName("divTemps");
                        for (h = 0; h < cells.length; h++) {
                            $(cells[h]).click(function () { showMatrix(); });
                        }
                        getReadings();
                        viewModel.loadPanelVisible(false);
                    }
                    catch (err) {
                        DevExpress.ui.dialog.alert(err, 'Page Error:');
                        viewModel.loadPanelVisible(false);
                    }
                }  
            }
        }

        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/getDevicesStatus_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }

    function showMatrix() {
        var sender = (this && this.target) || (window.event && window.event.srcElement);
        var idnew = $(sender).parent()[0].id;
        var newID = idnew.substring(0, idnew.indexOf('Div'));
        var t = new Date();
        var today = t.getMonth() + 1 + '/' + t.getDate() + '/' + t.getFullYear();
        var title = 'Hourly Readings for ' + (newID == 'DHW' ? newID + ' & Coil' : newID) + ' on ' + today;
        var matrixTable = '<table  style="text-align:center; font-family:calibri;font-size:12px"><tr><td width="50px">Time</td><td width="50px">Reading</td></tr>';
        matrixRows = dailyReadings.replace(/\"/g, "").substring(9, dailyReadings.length).split('},{');
        var b = 0;
        for (i = 0; i < matrixRows.length; i++) {
            itemA = matrixRows[i].split(',');
            for (a = 0; a < itemA.length; a++) {
                if (itemA[a].split(' : ')[0] == newID && matrixRows[i].split(',')[0].split(' : ')[1] != 'Total' && matrixRows[i].split(',')[0].split(' : ')[1] != 'type') {
                    b++;// && matrixRows[i].split(',')[0].split(' : ')[1] != 'Total' || matrixRows[i].split(',')[0].split(' : ')[1] != 'type'
                    matrixTable += '<tr><td style="padding:3px; border:thin solid #42556F;">' + matrixRows[i].split(',')[0].split(' : ')[1].substring(0, 5) + '</td><td style="border:thin solid #42556F;">' + itemA[a].split(' : ')[1];
                    if (newID == 'DHW')
                        matrixTable += ' \ ' + itemA[a - 2].split(' : ')[1];
                    matrixTable += '</td></tr>';
                }
            }
          
        }
        if (b == 0) matrixTable += '<tr><td colspan="2" style="font-size:16px">There is no data to display</td></tr>';
        matrixTable += '</table>';
        viewModel.matrixTitle(title);
        viewModel.myMatrix(matrixTable);
        viewModel.popupVisible2(true);
    }

    function getReadings() {
        xmlhttp = new XMLHttpRequest();
        var d = new Date();
        var today = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear() + ' 00:00:00';
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getCrossTabLogs_mobile xmlns="http://tempuri.org/"><aBuildingID>' + BID + '</aBuildingID><aFromDate>' + today + '</aFromDate><aMinuteRange>' + 60 + '</aMinuteRange><aApartmentsOnly>' + false + '</aApartmentsOnly><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></getCrossTabLogs_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    doc = xmlhttp.responseXML;
                    xmlreponse = doc.getElementsByTagName("getCrossTabLogs_mobileResult")[0].textContent;
                    dailyReadings = JSON.parse(xmlreponse);
                }
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/getCrossTabLogs_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }

    function BoilerStatus() {
        if (viewModel.switchState() == false)
            viewModel.popupVisible(true);
        else if (viewModel.switchState() == true) {
            var result = DevExpress.ui.dialog.confirm("Are you sure you want to turn off this boiler?", "Confirm changes");
            result.done(function (dialogResult) {
                if (dialogResult == true) sendMsg();
                else (viewModel.switchState(true));
            });
        }
          
    }

    function sendMsg() {
        viewModel.loadPanelVisible(true);
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var d = new Date();
        var today = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><updateMessageInfo_mobile xmlns="http://tempuri.org/"><aMessageID>-1</aMessageID><aBuildingID>' + BID + '</aBuildingID><aMessageTypeID>14</aMessageTypeID><aParam1>' + relay + '</aParam1><aParam2>' + viewModel.number() + '</aParam2><aData></aData><aStatus>' + false + '</aStatus><aTimestamp>' + today + '</aTimestamp><aLastUpdated>' + today + '</aLastUpdated><aAgent>' + USERNAME + '</aAgent><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></updateMessageInfo_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    viewModel.popupVisible(false);
                    viewModel.loadPanelVisible(false);
                    viewModel.toastVisible(true);
                }
                else {
                    DevExpress.ui.dialog.alert('Error Sending Message to Building', 'Error:');
                    viewModel.loadPanelVisible(false);
                    viewModel.popupVisible(false);
                }
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/updateMessageInfo_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }
    var viewModel = {
        boilerD: ko.observable(),
        BName: ko.observable(),
        switchState: ko.observable(false),
        sendCommand: function () {
            BoilerStatus();
        },
        popupVisible: ko.observable(false),
        hidePopup: function () { viewModel.popupVisible(false); viewModel.switchState(false); },
        number: ko.observable(25),
        text1: ko.observable(''),
        menuItemClicked: function (e) { viewModel.text1(e.itemData.text.split('-')[0]); relay = e.itemData.text.split('-')[1] },
        allRelays: ko.observableArray(),
        sendMessage: function () { sendMsg(); },
        loadPanelVisible: ko.observable(true),
        toastVisible: ko.observable(false),
        popupVisible2: ko.observable(false),
        matrixTitle: ko.observable('Title'),
        myMatrix: ko.observable(''),
        isAdmintrue: ISADMIN == 'true' ? ko.observable(true) : ko.observable(false), // ko.observable(false) ,
        hidePopup2: function () { viewModel.popupVisible2(false); },
        popup_onAfterShow: function (e) {
            var popupHeight = e.element.height();
            var popupTitleElement = e.element.find('.dx-popup-title');
            var popupContentElement = e.element.find('.dx-popup-content');
            var titleHeight = popupTitleElement.height() + parseInt(popupTitleElement.css('padding-top')) + parseInt(popupTitleElement.css('padding-bottom'));
            popupContentElement.height(popupHeight - titleHeight - parseInt(popupContentElement.css('padding-top')) - parseInt(popupContentElement.css('padding-bottom')));},
        viewShown: function () { $('#navBar').dxNavBar('instance').option('selectedIndex', 3); viewModel.loadPanelVisible(true); BoilerDiagram(); },
        logout: function () { var db = window.openDatabase("Database", "1.0", "Credentials DB", 200000); db.transaction(deleteDB, deleteErr, deleteSUC); }

    };

    return viewModel;
};


﻿BGS2.ContactDetails = function (params) {
    var myIds = '';
    function deleteContact() {
        var result = DevExpress.ui.dialog.confirm("Are you sure you want to delete this contact?", "Confirm changes");
        result.done(function (dialogResult) {
            if (dialogResult == true) {
                xmlhttp = new XMLHttpRequest();
                xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
                var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><deleteContact_mobile xmlns="http://tempuri.org/"><ContactID>'+params.id.split(',')[0]+'</ContactID><customerID>'+MID+'</customerID><aUSerName>'+USERNAME+'</aUSerName><aPassword>'+PASSWORD+'</aPassword></deleteContact_mobile></soap:Body></soap:Envelope>';
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4) {
                        if (xmlhttp.status == 200) {
                            viewModel.mess('Contact Deleted Successfully');
                            viewModel.toastVisible(true);
                            BGS2.app.navigate("Contacts");
                        }
                        else {
                            DevExpress.ui.dialog.alert('Error Deleting', 'Error:');
                            BGS2.app.navigate("Contacts");
                        }
                    }
                }
                xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/deleteContact_mobile");
                xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
                xmlhttp.send(sr);
            }
        }); 
    }

    function SaveContact() {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '';
        var phone = viewModel.phone() == '' ? 0 : parseInt(viewModel.phone().replace(/-/g, '').replace('(', '').replace(')', '').replace(/ /g, ''));
        var mobile = viewModel.mobile() == '' ? 0 : parseInt(viewModel.mobile().replace(/-/g, '').replace('(', '').replace(')', '').replace(/ /g, ''));
        if (params.id != ',,,,,,,,,,,,,') {
            sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><updateCustomerContact_mobile xmlns="http://tempuri.org/"><ContactID>' + parseInt(params.id.split(',')[0]) + '</ContactID><CustomerID>' + MID + '</CustomerID><ContactType>NA</ContactType><FirstName>' + viewModel.name() + '</FirstName><LastName>' + viewModel.last() + '</LastName><Address></Address><City></City><State></State><zip></zip><Phone>' + phone + '</Phone><ExtNum></ExtNum><Fax>' + parseInt(params.id.split(',')[6]) + '</Fax><Mobile>' + mobile + '</Mobile><Description>' + viewModel.title1() + '</Description><emailAddress>' + viewModel.email() + '</emailAddress><receiveElerts>' + params.id.split(',')[7].toLowerCase() + '</receiveElerts><receiveDailyReports>' + params.id.split(',')[8].toLowerCase() + '</receiveDailyReports><receiveDailyAlerts>' + params.id.split(',')[9].toLowerCase() + '</receiveDailyAlerts><receiveSMS>' + params.id.split(',')[10].toLowerCase() + '</receiveSMS><mobileCarrier>' + params.id.split(',')[11] + '</mobileCarrier><alertTemplateID>' + (params.id.split(',')[12] == '' ? -1 : parseInt(params.id.split(',')[12])) + '</alertTemplateID><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></updateCustomerContact_mobile></soap:Body></soap:Envelope>';
          viewModel.mess('Contact Updated Successfully');
          xmlhttp.onreadystatechange = function () {
              if (xmlhttp.readyState == 4) {
                  if (xmlhttp.status == 200) {
                      viewModel.toastVisible(true);
                      BGS2.app.navigate("Contacts");
                  }
                  else {
                      DevExpress.ui.dialog.alert('Error Saving', 'Error:');
                      BGS2.app.navigate("Contacts");
                  }
              }
           }
      
        }
        else {
            sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><updateCustomerContact_mobile xmlns="http://tempuri.org/"><ContactID>'+ -1 +'</ContactID><CustomerID>' + MID + '</CustomerID><ContactType>NA</ContactType><FirstName>' + viewModel.name() + '</FirstName><LastName>' + viewModel.last() + '</LastName><Address></Address><City></City><State></State><zip></zip><Phone>' + phone + '</Phone><ExtNum></ExtNum><Fax>'+0+'</Fax><Mobile>' + mobile + '</Mobile><Description>' + viewModel.title1() + '</Description><emailAddress>' + viewModel.email() + '</emailAddress><receiveElerts>' + false + '</receiveElerts><receiveDailyReports>' + false + '</receiveDailyReports><receiveDailyAlerts>' + false + '</receiveDailyAlerts><receiveSMS>' + false + '</receiveSMS><mobileCarrier></mobileCarrier><alertTemplateID>'+ -1+'</alertTemplateID><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></updateCustomerContact_mobile></soap:Body></soap:Envelope>';
            viewModel.mess('Contact Added Successfully');
        
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try{
                    CID = xmlhttp.responseXML.getElementsByTagName("updateCustomerContact_mobileResult")[0].textContent.replace(/\"/g, "");

                    xmlhttp2 = new XMLHttpRequest();
                    xmlhttp2.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
                    var sr2 = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><updateContactBuilding_mobile xmlns="http://tempuri.org/"><contactid>' + parseInt(CID) + '</contactid><buildingid>' + BID + '</buildingid><buildingname>' + BNAME + '</buildingname><isassigned>' + true + '</isassigned><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></updateContactBuilding_mobile></soap:Body></soap:Envelope>';
                    xmlhttp2.onreadystatechange = function () {
                        if (xmlhttp2.readyState == 4) {
                            if (xmlhttp2.status == 200) {
                                if (myIds != '') {
                                    for (j = 0; j < myIds.split(',').length - 1; j++) {
                                        xmlhttp3 = new XMLHttpRequest();
                                        xmlhttp3.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
                                        var sr3 = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><updateContactBuilding_mobile xmlns="http://tempuri.org/"><contactid>' + parseInt(CID) + '</contactid><buildingid>' + parseInt(myIds.split(',')[j]) + '</buildingid><buildingname>' + BNAME + '</buildingname><isassigned>' + true + '</isassigned><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></updateContactBuilding_mobile></soap:Body></soap:Envelope>';
                                        xmlhttp3.onreadystatechange = function () {
                                            if (xmlhttp3.readyState == 4) {
                                                if (xmlhttp3.status == 200 && j == myIds.split(',').length - 1) {
                                                    myIds = '';
                                                    viewModel.toastVisible(true);
                                                    BGS2.app.navigate("Contacts");
                                                }
                                                else if (j == myIds.split(',').length - 1 && xmlhttp3.status != 200) {
                                                    DevExpress.ui.dialog.alert('Error Assigning', 'Error:');
                                                    BGS2.app.navigate("Contacts");
                                                }
                                            }
                                        }

                                        xmlhttp3.setRequestHeader("SOAPAction", "http://tempuri.org/updateContactBuilding_mobile");
                                        xmlhttp3.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
                                        xmlhttp3.send(sr3);
                                    }
                                }
                                else {
                                    viewModel.toastVisible(true);
                                    BGS2.app.navigate("Contacts");
                                }
                            }
                        }
                    }

                    xmlhttp2.setRequestHeader("SOAPAction", "http://tempuri.org/updateContactBuilding_mobile");
                    xmlhttp2.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
                    xmlhttp2.send(sr2);
                }
                    catch(err){
                        DevExpress.ui.dialog.alert('Error Saving', 'Error:');
                        BGS2.app.navigate("Contacts");
                    }
                }
           

                }
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/updateCustomerContact_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }

    function unassignContact() {
        var result = DevExpress.ui.dialog.confirm("Are you sure you want to unassign contact from this building?", "Confirm changes");
        result.done(function (dialogResult) {
            if (dialogResult == true) {
                xmlhttp2 = new XMLHttpRequest();
                xmlhttp2.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
                var sr2 =  '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><updateContactBuilding_mobile xmlns="http://tempuri.org/"><contactid>' + parseInt(params.id.split(',')[0]) + '</contactid><buildingid>' + BID + '</buildingid><buildingname>' + BNAME + '</buildingname><isassigned>' + false + '</isassigned><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></updateContactBuilding_mobile></soap:Body></soap:Envelope>';
                xmlhttp2.onreadystatechange = function () {
                    if (xmlhttp2.readyState == 4) {
                        if (xmlhttp2.status == 200) {
                            viewModel.mess('Contact Unnasigned');
                            viewModel.toastVisible(true);
                            BGS2.app.navigate("Contacts");
                        }
                        else {
                            DevExpress.ui.dialog.alert('Error Unassigning', 'Error:');
                            BGS2.app.navigate("Contacts");
                        }
                    }
                }

                xmlhttp2.setRequestHeader("SOAPAction", "http://tempuri.org/updateContactBuilding_mobile");
                xmlhttp2.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
                xmlhttp2.send(sr2);
            }
        });
    }

    function getBuildingList() {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetCustomersNBuildingsList_mobile xmlns="http://tempuri.org/"><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></GetCustomersNBuildingsList_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    xmlreponse = xmlhttp.responseXML.getElementsByTagName("GetCustomersNBuildingsList_mobileResult")[0].textContent;
                    parsed = JSON.parse(xmlreponse);
                    buildingList = parsed.toString().split('BUILDINGS_LIST')[1].replace(/\"/g, "").substring();
                    var htmltable = '<table id="BTB">';
                    var items = buildingList.split('},{');
                    for (i = 0; i < items.length; i++) {
                        itemA = items[i].split(',');
                        if (itemA[0].split(' : ')[1].toString() == MID) {
                            htmltable += '<tr style="line-height:25px;"><td> <input type="checkbox"  id="' + itemA[1].split(' : ')[1] + '"></td><td>' + itemA[3].split(' : ')[1] + '</td></tr>';
                        }
                    }
                    htmltable += '</table>';
                    viewModel.OLMsg(htmltable);
                    viewModel.popupVisible(true);
                }
                else 
                    DevExpress.ui.dialog.alert('Error Retrieving Building List', 'Error:');
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/GetCustomersNBuildingsList_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }

    function SaveNew() {
        var inputs = document.getElementById("BTB").getElementsByTagName("input");
        for (i = 0; i < inputs.length; i++) {
            if (inputs[i].checked)
                myIds += inputs[i].id + ',';
        }
        viewModel.popupVisible(false);
    }

    var viewModel = {
        ContactName: ko.observable(params.id.split(',')[1]),
        email: ko.observable(params.id.split(',')[4]),
        name: ko.observable(params.id.split(',')[1].split(' ')[0]),
        phone: ko.observable((params.id.split(',')[2] == '' ?0:params.id.split(',')[2])),
        mobile: ko.observable((params.id.split(',')[3]==''?0:params.id.split(',')[3])),
        title1: ko.observable(params.id.split(',')[5]),
        last: ko.observable(params.id.split(',')[1].split(' ')[1]),
        mess:ko.observable(''),
        loadPanelVisible: ko.observable(false),
        Delete: function () { deleteContact(); },
        Save: function () { SaveContact(); },
        ifnew: ko.observable(false),
        ifnotnew:ko.observable(false),
        OLMsg:ko.observable(''),
        Dial1: function () { window.location = "tel:+" + viewModel.phone(); },
        Dial2: function () { window.location = "tel:+" + viewModel.mobile(); },
        Unasign: function () { unassignContact(); },
        Assign: function () { getBuildingList();  },
        hidePopup: function () { viewModel.popupVisible(false) },
        CancelP: function () { viewModel.popupVisible(false) },
        SaveP:function (){SaveNew()},
        popupVisible: ko.observable(false),
        mynumber: ko.observable('tel:'+parseInt(params.id.split(',')[2])),
        toastVisible:ko.observable(false),
        Cancel:function () {BGS2.app.navigate("Contacts");},
        viewShown: function () {
            $('#navBar').dxNavBar('instance').option('selectedIndex', 3);
            if (params.id == ',,,,,,,,,,,,,') {
                viewModel.ifnew(false);
                viewModel.ifnotnew(true);
                viewModel.email('');
                viewModel.name('');
                viewModel.phone(0);
                viewModel.mobile(0);
                viewModel.title1('');
                viewModel.last('');
            }
            else {
                viewModel.ifnew(true);
                viewModel.ifnotnew(false);
                viewModel.email(params.id.split(',')[4]);
                viewModel.name(params.id.split(',')[1].split(' ')[0]);
                viewModel.phone((params.id.split(',')[2] == '' ? 0 : params.id.split(',')[2]));
                viewModel.mobile((params.id.split(',')[3] == '' ? 0 : params.id.split(',')[3]));
                viewModel.title1(params.id.split(',')[5]);
                viewModel.last(params.id.split(',')[1].split(' ')[1]);
            }
       
        },
        logout: function () { var db = window.openDatabase("Database", "1.0", "Credentials DB", 200000); db.transaction(deleteDB, deleteErr, deleteSUC); },
        popup_onAfterShow: function (e) {
            var popupHeight = e.element.height();
            var popupTitleElement = e.element.find('.dx-popup-title');
            var popupContentElement = e.element.find('.dx-popup-content');
            var titleHeight = popupTitleElement.height() + parseInt(popupTitleElement.css('padding-top')) + parseInt(popupTitleElement.css('padding-bottom'));
            popupContentElement.height(popupHeight - titleHeight - parseInt(popupContentElement.css('padding-top')) - parseInt(popupContentElement.css('padding-bottom')));}
    };

    return viewModel;
};

﻿BGS2.BuildingInfo = function (params) {
    var weatherDesc, ffalert, bpalert, wlalert, callTime, flameTime, flameTime2, callTime2, conn, conn2, pieTable = '', hwRCount = 0, heatRCount = 0, otherRCount = 0, hwCCount = 0, heatCCount = 0, otherCCount = 0, BuildingName22 = '';
   
    function getBuildingInfo() {
        hwRCount = 0; heatRCount = 0; otherRCount = 0; hwCCount = 0; heatCCount = 0; otherCCount = 0;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body> <GetBuildingsSnapshot_mobile xmlns="http://tempuri.org/"><aCustomerID>' + MID + '</aCustomerID><aBuildingID>' + BID + '</aBuildingID><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></GetBuildingsSnapshot_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try{
                        doc = xmlhttp.responseXML;
                        xmlreponse = doc.getElementsByTagName("GetBuildingsSnapshot_mobileResult")[0].textContent;
                        parsed = JSON.parse(xmlreponse);
                        table1 = parsed.toString().split('BoilerInfo')[0];
                        eindex = table1.toString().lastIndexOf("]}");
                        sindex = table1.indexOf("[{");
                        removeStart = table1.substring(sindex, eindex);
                        removeStart2 = removeStart.replace(/\"/g, "");
                  
                        var items = removeStart2.split(',');
                        if (items.length > 1) {
                            BuildingName22 = items[4].split(' : ')[1];
                            viewModel.buildingName(items[4].split(' : ')[1]);
                            var d = new Date(items[9].split(' : ')[1]);
                            var time;
                            hours = d.getHours();
                            minutes = (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes();
                            if (hours == 12) time = hours + ':' + minutes + ' PM';
                            else if (hours == 0) time = 12 + ':' + minutes + ' AM';
                            else if (hours > 12) time = hours - 12 + ':' + minutes + ' PM';
                            else if (hours < 12) time = hours + ':' + minutes + ' AM';
                            viewModel.Time(time);
                            if (items[6].split(' : ')[1] != 'True') {
                                conn2 = items[9].split(' : ')[1];
                                $("#ConStatus").click(function () { viewModel.width11(225); viewModel.height11(50); viewModel.OLMsg('Disconnected Since: ' + conn2); viewModel.overlayVisible(true); });
                            }
                            viewModel.Temp(items[14].split(' : ')[1] + '°F');
                            weatherDesc = items[15].split(' : ')[1]; //'<div style="background-color:#CED3DC; border:2px solid #5A6C88; padding:15px;">'+ + '</div>' + 
                            $("#weatherDiv").click(function () { viewModel.width11(125); viewModel.height11(50); viewModel.OLMsg(weatherDesc); viewModel.overlayVisible(true); }); //viewModel.myControl(document.getElementById("weatherDiv"));  viewModel.myControl($("weatherDiv"));
                            $("#weatherImg").click(function () { viewModel.width11(125); viewModel.height11(50); viewModel.OLMsg(weatherDesc); viewModel.overlayVisible(true); });
                            switch (items[28].split(' : ')[1]) {
                                case '00':
                                    viewModel.Mode('Off/');
                                    break;
                                case '01':
                                    viewModel.Mode('Manuel/');
                                    break;
                                case '02':
                                    viewModel.Mode('Auto/');
                                    break;
                            }
                            (items[29].split(' : ')[1] == 'True') ? viewModel.Season('Summer') : viewModel.Season('Winter');
                            if (items[6].split(' : ')[1] == 'True') 
                                viewModel.imageSource('Images/connected.gif');
                            else 
                                viewModel.imageSource('Images/not_connected.gif');
                            viewModel.imageSource2(items[13].split(' : ')[1]);

                            table2 = parsed.toString().split('Table')[2];
                            table2.split(',').length > 1 ? viewModel.AptTemp(table2.split(',')[1].split(' : ')[1].replace(/\"/g, "")) : viewModel.AptTemp('N/A');


                            table3 = parsed.toString().split('Table')[3];
                            alerts = table3.split('","');
                            alerts[2].split('" : "')[1] == 'True' ? (viewModel.imageSource4('Images/Icon_Bypass.png')) : '';
                            alerts[1].split('" : "')[1] == 'True' ? (viewModel.imageSource5('Images/Icon_FlameFailurersz.png')) : '';
                            alerts[6].split('" : "')[1] == 'True' ? (viewModel.imageSource6('Images/Icon_WaterLossrsz.png')) : '';

                            if (alerts[9].split('" : "')[1].length > 2) {
                                ffalert = alerts[9].split('" : "')[1];
                                $("#All2").click(function () { viewModel.OLMsg(ffalert); viewModel.width11(300); viewModel.height11(60); viewModel.overlayVisible(true); });
                            }
                            if (alerts[10].split('" : "')[1].length > 2) {
                                bpalert = alerts[10].split('" : "')[1];
                                $("#All1").click(function () { viewModel.OLMsg(bpalert); viewModel.width11(300); viewModel.height11(60); viewModel.overlayVisible(true); });
                            }
                            if (alerts[14].split('" : "')[1].length > 2) {
                                wlalert = alerts[14].split('" : "')[1];
                                $("#All3").click(function () { viewModel.OLMsg(wlalert); viewModel.width11(300); viewModel.height11(60); viewModel.overlayVisible(true); });
                            }

                            table5 = parsed.toString().split('Table')[5];
                            if (table5.split(',').length > 1)
                            {
                                calls = table5.replace(/\"/g, "").split('},{');
                                var count1 = 0;
                                var count2 = 0;
                                var count3 = 0;
                                for (var a = 0; a < calls.length; a++) {
                                    count3 == 0 ? viewModel.Caller(calls[a].split(',')[1].split(' : ')[1]) : viewModel.Caller2(calls[a].split(',')[1].split(' : ')[1]);
                                    count3++;
                                    if (calls[a].split(',')[2].split(' : ')[1] != '') {
                                        if (count1 == 0) {
                                            viewModel.imageSource7('Images/call_on77.gif');
                                            callTime = calls[a].split(',')[2].split(' : ')[1];
                                            $("#CallImg").click(function () { viewModel.OLMsg(callTime); viewModel.width11(125); viewModel.height11(50); viewModel.overlayVisible(true); });
                                            count1++;
                                        }
                                        else {
                                            viewModel.imageSource9('Images/call_on77.gif');
                                            callTime2 = calls[a].split(',')[2].split(' : ')[1];
                                            $("#CallImg2").click(function () { viewModel.OLMsg(callTime2); viewModel.width11(125); viewModel.height11(50); viewModel.overlayVisible(true); });
                                        } 
                                    }
                                    if (calls[a].split(',')[3].split(' : ')[1] != '') {
                                        if (count2 == 0) {
                                            viewModel.imageSource8('Images/flame_on8.gif');
                                            flameTime = calls[a].split(',')[3].split(' : ')[1];
                                            $("#FlameImg").click(function () { viewModel.OLMsg(flameTime); viewModel.width11(125); viewModel.height11(50); viewModel.overlayVisible(true); });
                                            count2++;
                                        }
                                        else {
                                            viewModel.imageSource10('Images/flame_on8.gif');
                                            flameTime2 = calls[a].split(',')[3].split(' : ')[1];
                                            $("#FlameImg2").click(function () { viewModel.OLMsg(flameTime2); viewModel.width11(125); viewModel.height11(50); viewModel.overlayVisible(true); });
                                        }
                                    }
                                }
                            }

                            count1 = 0;
                            count2 = 0;
                            count3 = 0;
                            createPie();
                        }
                        else {
                            viewModel.loadPanelVisible(false);
                            viewModel.toastVisible(true);
                            viewModel.bdis(true);
                        }
                    }
                    catch (err) {
                        DevExpress.ui.dialog.alert(err, 'Page Error:');
                        viewModel.loadPanelVisible(false);
                    }
                } 
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/GetBuildingsSnapshot_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }

    function createPie() {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetRunsNCalls_mobile xmlns="http://tempuri.org/"><aCustomerID>' + MID + '</aCustomerID><aUSerName>' +USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></GetRunsNCalls_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try{
                        doc = xmlhttp.responseXML;
                        xmlreponse = doc.getElementsByTagName("GetRunsNCalls_mobileResult")[0].textContent;
                        parsed = JSON.parse(xmlreponse);
                        eindex = parsed.toString().lastIndexOf("]}");
                        sindex = parsed.indexOf("[{");
                        removeStart = parsed.substring(sindex, eindex);
                        removeStart2 = removeStart.replace(/\"/g, "");
                        pieTable = '<table   id="legendTable"   style="font-size:11px; line-height: 14px; border: thin solid #000000; color:black; text-align:center;" ><tr style="font-weight:bold"><td ></td><td  style="padding:5px;">Caller</td><td>#Cycles</td><td>Total</td><td style="border-right:thin solid #000000;">Avg</td></tr>'; //<td>Shortest</td><td>Longest</td>
                        htmlArray = new Array();
                        var items = removeStart2.split('},{');
                        var a = 0;
                        var backcolor = '#ACB5C4';
                        var totalrt = 0;
                        for (i = 0; i < items.length; i++) {
                            itemA = items[i].split(',');
                            if (itemA[0].split(' : ')[1].toString() == BID) {
                                color1 = createColor(itemA[6].split(' : ')[1])
                                htmlArray[a] = { value: parseInt(itemA[5].split(' : ')[1]), color: color1 };
                                pieTable += '<tr style="background-color:' + backcolor + ';"><td style="font-size:35px; padding:5px;  color:' + color1 + ';">&#8226;&nbsp;</td><td width="115px">' + itemA[3].split(' : ')[1] + '</td><td>' + (itemA[7].split(' : ')[1] == '0' ? '' : itemA[7].split(' : ')[1]).toString() + '</td><td style="padding-right:8px;">' +
                                (itemA[5].split(' : ')[1] == '0.00' ? '' : convertTime(itemA[5].split(' : ')[1])) + '</td><td style="border-right:thin solid #000000; padding-right:5px;">' + (itemA[10].split(' : ')[1] == '0.000000' ? '' : convertTime(itemA[10].split(' : ')[1])) + '</td></tr>'; //<td>' + (itemA[8].split(' : ')[1] == '0.00' ? '' : convertTime(itemA[8].split(' : ')[1])) + '</td><td>' + (itemA[9].split(' : ')[1] == '0.00' ? '' : convertTime(itemA[9].split(' : ')[1])) + '</td>
                                a++;
                                if (itemA[1].split(' : ')[1] == 'R') totalrt += parseInt(itemA[5].split(' : ')[1]);
                                backcolor == '#ACB5C4' ? backcolor = '#BBC1CE' : backcolor = '#ACB5C4';
                            }
                        }
                        pieTable += '<tr><td colspan="7" style="font-weight:bold;  padding:5px;">Total Run Time: ' + convertTime(totalrt) + '</td></tr></table>';
                        if (a == 0) {
                            document.getElementById('pieChart').innerHTML = 'No Runtime';
                        }
                        else {
                            var options = { segmentStrokeColor: 'black', segmentStrokeWidth: .5, animation: false };
                            var myPie = new Chart(document.getElementById("myChart").getContext("2d")).Pie(htmlArray, options);
                    
                            $("#pieChart").click(function () {
                                viewModel.OLMsg(pieTable);
                                viewModel.popupVisible(true);
                            });
                        }
                        viewModel.loadPanelVisible(false);
                    }
                    catch (err) {
                        DevExpress.ui.dialog.alert('Error Retrieving Pie Data: ' + err, 'Error:');
                        viewModel.loadPanelVisible(false);
                    }
                }
               
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/GetRunsNCalls_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }

    function convertTime(seconds) {
        var HH, MM, SS;
        HH = parseInt(seconds) / 3600;
        MM = (parseInt(seconds) - (Math.floor(HH) * 3600)) / 60;
        SS = (parseInt(seconds) - (Math.floor(HH) * 3600)) - (Math.floor(MM) * 60);
        return ("0" + Math.floor(HH).toString()).substring(1 + Math.floor(HH).toString().length - 2) + (":") + ("0" + Math.floor(MM).toString()).substring(1 + Math.floor(MM).toString().length - 2) + (":") + ("0" + Math.floor(SS).toString()).substring(1 + Math.floor(SS).toString().length - 2);
    }

    function createColor(Color) {
        HeatRunColors = new Array();
        HeatRunColors[0] = "rgb(247, 184, 172)";
        HeatRunColors[1] = "rgb(240, 140, 121)";
        HeatRunColors[2] = "rgb(238, 121, 100)";
        HeatRunColors[3] = "rgb(244, 164, 147)";
        HeatRunColors[4] = "rgb(240, 135, 113)";
        HeatRunColors[5] = "rgb(237, 107, 80)";
        HeatRunColors[6] = "rgb(232, 126, 123)";
        HeatRunColors[7] = "rgb(232, 83, 83)";
        HeatRunColors[8] = "rgb(232, 83, 83)";
        HeatRunColors[9] = "rgb(232, 83, 83)";
        HeatRunColors[10] = "rgb(232, 83, 83)";
        HeatRunColors[11] = "rgb(232, 83, 83)";
        HeatRunColors[12] = "rgb(232, 83, 83)";
        HeatRunColors[13] = "rgb(232, 83, 83)";
        HeatRunColors[14] = "rgb(232, 83, 83)";
        HeatRunColors[15] = "rgb(232, 83, 83)";
        HeatRunColors[16] = "rgb(232, 83, 83)";
        HeatRunColors[17] = "rgb(232, 83, 83)";
        HeatRunColors[18] = "rgb(232, 83, 83)";
        HeatRunColors[19] = "rgb(232, 83, 83)";

        HWRunColors = new Array();
        HWRunColors[0] = "rgb(123, 52, 24)";
        HWRunColors[1] = "rgb(171, 53, 36)";
        HWRunColors[2] = "DarkRed";

        OtherRunColors = new Array();
        OtherRunColors[0] = "rgb(255, 255, 81)";
        OtherRunColors[1] = "rgb(255, 255, 164)";
        OtherRunColors[2] = "rgb(255, 255, 121)";
        OtherRunColors[3] = "rgb(250, 176, 255)";
        OtherRunColors[4] = "rgb(255, 225, 134)";
        OtherRunColors[5] = "rgb(240, 212, 25)";
        OtherRunColors[6] = "rgb(240, 225, 255)";
        OtherRunColors[7] = "rgb(240, 225, 255)";
        OtherRunColors[8] = "rgb(240, 225, 255)";
        OtherRunColors[9] = "rgb(240, 225, 255)";
        OtherRunColors[10] = "rgb(240, 225, 255)";
        OtherRunColors[11] = "rgb(240, 225, 255)";
        OtherRunColors[12] = "rgb(240, 225, 255)";
        OtherRunColors[13] = "rgb(240, 225, 255)";
        OtherRunColors[14] = "rgb(240, 225, 255)";
        OtherRunColors[15] = "rgb(240, 225, 255)";
        OtherRunColors[16] = "rgb(240, 225, 255)";
        OtherRunColors[17] = "rgb(240, 225, 255)";
        OtherRunColors[18] = "rgb(240, 225, 255)";
        OtherRunColors[19] = "rgb(240, 225, 255)";

        HeatCallColors = new Array();
        HeatCallColors[0] = "rgb(130, 178, 114)";
        HeatCallColors[1] = "rgb(177, 207, 167)";
        HeatCallColors[2] = "rgb(123, 174, 106)";
        HeatCallColors[3] = "rgb(149, 190, 135)";
        HeatCallColors[4] = "rgb(129, 177, 112)";
        HeatCallColors[5] = "rgb(118, 170, 100)";
        HeatCallColors[6] = "rgb(221, 234, 217)";
        HeatCallColors[7] = "rgb(84, 150, 92)";
        HeatCallColors[8] = "Black";
        HeatCallColors[9] = "Black";
        HeatCallColors[10] = "Black";
        HeatCallColors[11] = "Black";
        HeatCallColors[12] = "Black";
        HeatCallColors[13] = "Black";
        HeatCallColors[14] = "Black";
        HeatCallColors[15] = "Black";
        HeatCallColors[16] = "Black";
        HeatCallColors[17] = "Black";
        HeatCallColors[18] = "Black";
        HeatCallColors[19] = "Black";

        HWCallColors = new Array();
        HWCallColors[0] = "rgb(11, 87, 44)";
        HWCallColors[1] = "rgb(21, 106, 54)";
        HWCallColors[2] = "ForestGreen";

        OtherCallColors = new Array();
        OtherCallColors[2] = "rgb(51, 102, 255)";
        OtherCallColors[1] = "rgb(100, 136, 255)";
        OtherCallColors[0] = "rgb(166, 188, 255)";
        OtherCallColors[3] = "rgb(106, 143, 255)";
        OtherCallColors[4] = "rgb(89, 131, 255)";
        OtherCallColors[5] = "rgb(62, 111, 255)";
        OtherCallColors[6] = "rgb(4, 67, 255)";
        OtherCallColors[7] = "rgb(0, 56, 225)";
        OtherCallColors[8] = "rgb(0, 49, 193)";
        OtherCallColors[9] = "rgb(210, 222, 255)";
        OtherCallColors[10] = "rgb(0, 22, 83)";
        OtherCallColors[11] = "rgb(0, 41, 151)";
        OtherCallColors[12] = "rgb(5, 114, 146)";
        OtherCallColors[13] = "rgb(7, 163, 207)";
        OtherCallColors[14] = "rgb(21, 196, 247)";
        OtherCallColors[15] = "rgb(90, 214, 250)";

        switch (Color) {
            case "1":
                heatRCount++;
                return HeatRunColors[heatRCount - 1];
                break;
            case "2":
                hwRCount++;
                return HWRunColors[hwRCount - 1];
                break;
            case "3":
                otherRCount++;
                return OtherRunColors[otherRCount - 1];
                break;
            case "4":
                heatCCount++;
                return HeatCallColors[heatCCount - 1];
                break;
            case "5":
                hwCCount++;
                return HWCallColors[hwCCount - 1];
                break;
            case "6":
                otherCCount++;
                return OtherCallColors[otherCCount - 1];
                break;
        }
    }

    var viewModel = {
        buildingName: ko.observable(),
        Time: ko.observable(),
        Temp: ko.observable(),
        AptTemp: ko.observable(),
        Mode: ko.observable(),
        Season: ko.observable(),
        Caller: ko.observable(),
        Caller2: ko.observable(),
        loadPanelVisible: ko.observable(true),
        overlayVisible: ko.observable(false),
        buttonClicked: function () { BGS2.app.navigate("Comments"); },
        button4Clicked: function () { BGS2.app.navigate("Contacts"); },
        button1Clicked: function () { BGS2.app.navigate("Diagram"); },
        button2Clicked: function () { BGS2.app.navigate("Boiler"); },
        button3Clicked: function () { BGS2.app.navigate("Settings"); },
        OLMsg: ko.observable(),
        width11: ko.observable(),
        height11: ko.observable(),
        hideOverlay: function () { viewModel.overlayVisible(false); },
        popupVisible: ko.observable(false),
        hidePopup: function () { viewModel.popupVisible(false); },
        toastVisible: ko.observable(false),
        bdis: ko.observable(false),
        imageSource: ko.observable(),
        imageSource2: ko.observable(),
       // imageSource3: ko.observable(),
        imageSource4: ko.observable('Images/Icon_BypassInactive.png'),
        imageSource5: ko.observable('Images/Icon_FlameFailureInactive.png'),
        imageSource6: ko.observable('Images/Icon_WaterLossInactive.png'),
        imageSource7: ko.observable(),
        imageSource8: ko.observable(),
        imageSource9: ko.observable(),
        imageSource10: ko.observable(),
        //myControl: ko.observable(document),
        viewShown: function () {
            BGS2.config.navigation[3].visible(true);
            $('#navBar').dxNavBar('instance').option('selectedIndex', 3);
            viewModel.loadPanelVisible(true); getBuildingInfo();
        },
        logout: function () { var db = window.openDatabase("Database", "1.0", "Credentials DB", 200000); db.transaction(deleteDB, deleteErr, deleteSUC); }

    };
    return viewModel;
};

﻿BGS2.Comments = function (params) {
  var  CommentHeader = 0;

    function getComments() {
        viewModel.BName(BNAME);
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getComments_mobile xmlns="http://tempuri.org/"><aCustomerID>'+MID+'</aCustomerID><aBuildingID>'+BID+'</aBuildingID><aUSerName>' +USERNAME+'</aUSerName><aPassword>'+PASSWORD+'</aPassword></getComments_mobile></soap:Body></soap:Envelope>';
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        xmlreponse = xmlhttp.responseXML.getElementsByTagName("getComments_mobileResult")[0].textContent;
                        parsed = JSON.parse(xmlreponse);
                        commentList = parsed.substring(19, parsed.length - 2)//.replace(/\"/g, "");
                        myArray = new DevExpress.data.ArrayStore({ key: 'commentheaderid', data: [] });
                        var items = commentList.split('},{');
                        for (i = 0; i < items.length; i++) {
                            itemA = items[i].split('","');
                            if (itemA[6].split('" : "')[1] == '2' || itemA[6].split('" : "')[1] == '3' || itemA[6].split('" : "')[1] == '5') {
                                var add = { commentheaderid: itemA[0].split('" : "')[1], createdate: itemA[5].split('" : "')[1], subject: itemA[7].split('" : "')[1], subject2: itemA[8].split('" : "')[1], status: itemA[10].split('" : "')[1], username: itemA[14].split('" : "')[1] };
                                myArray.insert(add).done(function (createdItem, createdID) { });
                            }
                        }
                        viewModel.ds(myArray);
                        viewModel.loadPanelVisible(false);
                    }
                    else {
                        DevExpress.ui.dialog.alert('Error Loading Page', 'Error:');
                        viewModel.loadPanelVisible(false);
                    }
                }
            }
            xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/getComments_mobile");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
            xmlhttp.send(sr);
       }

    function getDetails(CHID) {
        CommentHeader = CHID;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getCommentsDetail_mobile xmlns="http://tempuri.org/"><aCommentID>'+CHID+'</aCommentID><aUSerName>'+USERNAME+'</aUSerName><aPassword>'+PASSWORD+'</aPassword></getCommentsDetail_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    xmlreponse = xmlhttp.responseXML.getElementsByTagName("getCommentsDetail_mobileResult")[0].textContent;
                    parsed = JSON.parse(xmlreponse);
                    DetailList = parsed.substring(20, parsed.length - 2).replace(/\"/g, "").split('},{');
                    if (DetailList[0].split(',').length > 1) {
                        var detailstable = '<table>';
                        for (i = 0; i < DetailList.length; i++) {
                            thisDetail = DetailList[i].split(',');
                            detailstable += '<tr><td style="font-weight:bold; padding-top:10px;">' + thisDetail[6].split(' : ')[1] + ' replied on ' + thisDetail[3].split(' : ')[1].substring(0, 9) + ':</td></tr><tr><td style="border-bottom:thin solid black; padding-bottom:10px;">' + thisDetail[4].split(' : ')[1] + '</td></tr>';
                        }
                        detailstable += '</table>';
                    }
                    viewModel.mydetails(detailstable);
                    viewModel.loadPanelVisible(false);
                    viewModel.overlayVisible(true);
                }
                else {
                    DevExpress.ui.dialog.alert('Error Retrieving Data', 'Error:');
                    viewModel.loadPanelVisible(false);
                }
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/getCommentsDetail_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }

    function updateDetail() {
        var d = new Date();
        var today = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><updateCommentsDetail_mobile xmlns="http://tempuri.org/"><CommentsDetailID>'+ -1 +'</CommentsDetailID><CommentsHeaderID>' + CommentHeader + '</CommentsHeaderID><UserID>'+USERID+'</UserID><CreatedDate>'+today+'</CreatedDate><Comment>'+viewModel.newComm()+'</Comment><aInHouse>'+false+'</aInHouse><aLinkedID></aLinkedID><aUSerName>'+USERNAME+'</aUSerName><aPassword>'+PASSWORD +'</aPassword></updateCommentsDetail_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    if (viewModel.emailto() != '') {
                        //var link = "mailto:adina@buildgreensolutions.com&subject=" + escape("This is my subject")  + "&body=" + escape("hi");
                        //window.location.href = link;
                        xmlhttp2 = new XMLHttpRequest();
                        xmlhttp2.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
                        var sr2 = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><updateComentsEmail_mobile xmlns="http://tempuri.org/"><aCommentsEmailID>' + -1 + '</aCommentsEmailID><aCommentsHeaderID>' + CommentHeader + '</aCommentsHeaderID><aCommentsDetailID>' + -1 + '</aCommentsDetailID><aBuildingid>' + BID + '</aBuildingid><aStatus>' + false + '</aStatus><aEmailAddress>' + viewModel.emailto() + '</aEmailAddress><aCC></aCC><aUserName>' + USERNAME + '</aUserName><aPassword>' + PASSWORD + '</aPassword></updateComentsEmail_mobile></soap:Body></soap:Envelope>';
                        xmlhttp2.onreadystatechange = function () {
                            if (xmlhttp2.readyState == 4) {
                                if (xmlhttp2.status == 200) {
                                    viewModel.overlayVisible(false);
                                    viewModel.mess('Comment Added and Emailed');
                                    viewModel.toastVisible(true);
                                    viewModel.newComm('');
                                    viewModel.emailto('');
                                    viewModel.loadPanelVisible(false);
                                }
                                else {
                                    viewModel.newComm('');
                                    viewModel.emailto('');
                                    viewModel.overlayVisible(false);
                                    DevExpress.ui.dialog.alert('Saved, Error Emailing', 'Error:');
                                    viewModel.loadPanelVisible(false);
                                }
                            }
                        }
                        xmlhttp2.setRequestHeader("SOAPAction", "http://tempuri.org/updateComentsEmail_mobile");
                        xmlhttp2.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
                        xmlhttp2.send(sr2);  
                    }
                    else {
                        viewModel.overlayVisible(false);
                        viewModel.mess('Comment Added');
                        viewModel.toastVisible(true);
                        viewModel.newComm('');
                        viewModel.loadPanelVisible(false);
                    }
                }
                else {
                    viewModel.newComm('');
                    viewModel.emailto('');
                    viewModel.overlayVisible(false);
                    DevExpress.ui.dialog.alert('Error Updating', 'Error:');
                    viewModel.loadPanelVisible(false);
                }
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/updateCommentsDetail_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }

    function saveHeader() {
        var d = new Date();
        var today = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><updateCommentsHeader_mobile xmlns="http://tempuri.org/"><acommentsHeaderID>'+ -1 +'</acommentsHeaderID><aBuildingID>'+BID+'</aBuildingID><aUserID>'+USERID+'</aUserID><aCreateDate>'+today+'</aCreateDate><aReasonID>'+2+'</aReasonID><aSubject>'+viewModel.subject3()+'</aSubject><aSubject2>' + viewModel.newCommHeader() + '</aSubject2><aClass>' + -1 +'</aClass><aPriority>'+1+'</aPriority><aStatus>'+ 0 +'</aStatus><aInHouse>' + false + '</aInHouse><aReminder>'+false+'</aReminder><alastactivityDate>'+today+'</alastactivityDate><aCustomerID>'+MID+'</aCustomerID><aLinkedID>'+-1+'</aLinkedID><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD +'</aPassword></updateCommentsHeader_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    if (viewModel.emailHeader() != '') {
                        CHID2 = xmlhttp.responseXML.getElementsByTagName("updateCommentsHeader_mobileResult")[0].textContent.replace(/\"/g, "");
                        xmlhttp2 = new XMLHttpRequest();
                        xmlhttp2.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
                        var sr2 = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><updateComentsEmail_mobile xmlns="http://tempuri.org/"><aCommentsEmailID>' + -1 + '</aCommentsEmailID><aCommentsHeaderID>' + CHID2 + '</aCommentsHeaderID><aCommentsDetailID>' + -1 + '</aCommentsDetailID><aBuildingid>' + BID + '</aBuildingid><aStatus>' + false + '</aStatus><aEmailAddress>' + viewModel.emailHeader() + '</aEmailAddress><aCC></aCC><aUserName>' + USERNAME + '</aUserName><aPassword>' + PASSWORD + '</aPassword></updateComentsEmail_mobile></soap:Body></soap:Envelope>';
                        xmlhttp2.onreadystatechange = function () {
                            if (xmlhttp2.readyState == 4) {
                                if (xmlhttp2.status == 200) {
                                    getComments();
                                    viewModel.fieldVisible(false);
                                    viewModel.loadPanelVisible(false);
                                    viewModel.mess('Comment Added and Emailed');
                                    viewModel.toastVisible(true);
                                    viewModel.newComm('');
                                    viewModel.emailto('');
                                    viewModel.emailHeader('');
                                }
                                else {
                                    DevExpress.ui.dialog.alert('Saved, Error Emailing', 'Error:');
                                    viewModel.loadPanelVisible(false);
                                    viewModel.fieldVisible(false);
                                    viewModel.newComm('');
                                    viewModel.emailto('');
                                    viewModel.emailHeader('');
                                }
                            }
                        }
                        xmlhttp2.setRequestHeader("SOAPAction", "http://tempuri.org/updateComentsEmail_mobile");
                        xmlhttp2.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
                        xmlhttp2.send(sr2);
                    }
                    else {
                        getComments();
                        viewModel.fieldVisible(false);
                        viewModel.loadPanelVisible(false);
                        viewModel.mess('Comment Added');
                        viewModel.toastVisible(true);
                        viewModel.newCommHeader('');
                        viewModel.subject3('');
                    }
                }
                else {
                    DevExpress.ui.dialog.alert('Error Saving', 'Error:');
                    viewModel.loadPanelVisible(false);
                }
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/updateCommentsHeader_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }
    var viewModel = {
        emailHeader:ko.observable(''),
        newCommHeader: ko.observable(''),
        subject3:ko.observable(''),
        BName:ko.observable(''),
        subject: ko.observable(''),
        subject2: ko.observable(''),
        username: ko.observable(''),
        createdate: ko.observable(''),
        CancelDetail: function () {  viewModel.overlayVisible(false); viewModel.newComm('');viewModel.emailto(''); },
        SaveDetail: function () { viewModel.loadPanelVisible(true); updateDetail(); },
        emailto: ko.observable(''),
        newComm:ko.observable(''),
        overlayVisible: ko.observable(false),
        hideOverlay: function () {   viewModel.overlayVisible(false); viewModel.newComm('');  viewModel.emailto(''); },
        toastVisible: ko.observable(false),
        mess:ko.observable(''),
        ds: ko.observableArray(),
        cdetail: function (e) {
            viewModel.loadPanelVisible(true);
            getDetails(e.itemData.commentheaderid);
            viewModel.subject('Subject: '+e.itemData.subject);
            viewModel.subject2(e.itemData.subject2);
            viewModel.username('Created By: '+e.itemData.username);
            viewModel.createdate('Create Date: '+e.itemData.createdate.substring(0,9));},
        mydetails: ko.observable(''),
        fieldVisible:ko.observable(false),
        openPopup: function () { viewModel.fieldVisible(true); },
        loadPanelVisible: ko.observable(true),
        saveNew: function () { viewModel.loadPanelVisible(true); saveHeader();},
        cancelNew: function () { viewModel.fieldVisible(false); viewModel.newCommHeader(''); viewModel.emailHeader(''); viewModel.subject3(''); },
        viewShown: function () { $('#navBar').dxNavBar('instance').option('selectedIndex', 3); viewModel.loadPanelVisible(true); getComments(); },
        logout: function () { var db = window.openDatabase("Database", "1.0", "Credentials DB", 200000); db.transaction(deleteDB, deleteErr, deleteSUC); }
        //popup_onAfterShow: function (e) {
        //    var popupHeight = e.element.height();
        //    alert(popupHeight);
        //    var popupTitleElement = e.element.find('.dx-popup-title');
        //    var popupContentElement = e.element.find('.dx-popup-content');
        //    var titleHeight = popupTitleElement.height() + parseInt(popupTitleElement.css('padding-top')) + parseInt(popupTitleElement.css('padding-bottom'));
        //    popupContentElement.height(popupHeight - titleHeight - parseInt(popupContentElement.css('padding-top')) - parseInt(popupContentElement.css('padding-bottom'))); }
    };

    return viewModel;
};

﻿BGS2.ManagementList = function (params) {
    var removeStart2 = '';

    function getManagements() {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetCustomersNBuildingsList_mobile xmlns="http://tempuri.org/"><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></GetCustomersNBuildingsList_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    doc = xmlhttp.responseXML;
                    xmlreponse = doc.getElementsByTagName("GetCustomersNBuildingsList_mobileResult")[0].textContent;
                    parsed = JSON.parse(xmlreponse);
                    custList = parsed.toString().split('BUILDINGS_LIST')[0];
                    eindex = custList.toString().lastIndexOf("]}");
                    sindex = custList.indexOf("[{");
                    removeStart = custList.substring(sindex, eindex);
                    removeStart2 = removeStart.replace(/\"/g, "");
                    allItems(removeStart2);
                   
                }
                else {
                    DevExpress.ui.dialog.alert('Error loading Page','Page Error:');
                    viewModel.loadPanelVisible(false);
                }
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/GetCustomersNBuildingsList_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }

    function allItems(removeStart2) {
        myArray = new DevExpress.data.ArrayStore({ key: 'customerid', data: [] });
        var items = removeStart2.split('},{');
        for (i = 0; i < items.length; i++) {
            itemA = items[i].split(',');
            var add = { customerid: itemA[0].split(' : ')[1], numberid: i, BussinessName: itemA[1].split(' : ')[1], custID: itemA[2].split(' : ')[1] };
            myArray.insert(add).done(function (createdItem, createdID) { });
        }
        viewModel.dataSource1(myArray);
        viewModel.loadPanelVisible(false);
    }

    function searchItems(removeStart2) {
        myArray = new DevExpress.data.ArrayStore({ key: 'customerid', data: [] });
        var items = removeStart2.split('},{');
        var g = 1;
        for (i = 0; i < items.length; i++) {
            itemA = items[i].split(',');
            if (itemA[1].split(' : ')[1].toUpperCase().indexOf(viewModel.searchString().toUpperCase()) == 0) {
                g++;
                var add = { customerid: itemA[0].split(' : ')[1], numberid: g, BussinessName: itemA[1].split(' : ')[1], custID: itemA[2].split(' : ')[1] };
                myArray.insert(add).done(function (createdItem, createdID) { });
            }
        }
        viewModel.dataSource1(myArray);
    }

    function queryDB(tx) {
        tx.executeSql('SELECT * FROM Credentials', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        USERNAME = results.rows.item(0).data;
        PASSWORD = results.rows.item(1).data;
        USERID = results.rows.item(5).data;;
        ISADMIN = results.rows.item(4).data;
        getManagements();
    }

    function errorCB(err) {
        if (params.length < 2) 
            BGS2.app.navigate("home", { target: 'current', clearHistory: true });
        else {
            getManagements();
        }

    }

    var viewModel = {
        dataSource1: ko.observableArray([]),
        loadPanelVisible:ko.observable(true),
        redirect: function (e) {
            setManagement(e.itemData.customerid);
            BGS2.app.navigate("BuildingList", { root: true });
        },
        find: function () { viewModel.showSearch(!viewModel.showSearch()); viewModel.searchString(''); },
        showSearch: ko.observable(false),
        searchString: ko.observable(''),
        GetColor: function (itemID) {
            return itemID % 2 == 0 ? '#99ABC4' : '#B4C1D3';
        },
        search2: function () { viewModel.searchString() == '' ? allItems(removeStart2) : searchItems(removeStart2); },
        viewShown: function () {
            $(".layout-footer").add();
            BGS2.config.navigation[3].visible(false);
            BGS2.config.navigation[2].visible(false);
            var db = window.openDatabase("Database", "1.0", "Credentials DB", 200000); db.transaction(queryDB, errorCB);
        },
        logout: function () { var db = window.openDatabase("Database", "1.0", "Credentials DB", 200000); db.transaction(deleteDB, deleteErr, deleteSUC); }
    };
    return viewModel;
};

﻿BGS2.BuildingList = function (params) {
    var removeStart2 = '';
   
    var GeneralInfo = '', TempInfo = '', AlertInfo = '';

    function getBuildings() {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetCustomersNBuildingsList_mobile xmlns="http://tempuri.org/"><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></GetCustomersNBuildingsList_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    doc = xmlhttp.responseXML;
                    xmlreponse = doc.getElementsByTagName("GetCustomersNBuildingsList_mobileResult")[0].textContent;
                    parsed = JSON.parse(xmlreponse);
                    buildingList = parsed.toString().split('BUILDINGS_LIST')[1];
                    eindex = buildingList.toString().lastIndexOf("]}");
                    sindex = buildingList.indexOf("[{");
                    removeStart = buildingList.substring(sindex, eindex);
                    removeStart2 = removeStart.replace(/\"/g, "");
                   

                    xmlhttp2 = new XMLHttpRequest();
                    xmlhttp2.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
                    var sr2 = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body> <GetBuildingsSnapshot_mobile xmlns="http://tempuri.org/"><aCustomerID>' + MID + '</aCustomerID><aBuildingID>' + -1 + '</aBuildingID><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></GetBuildingsSnapshot_mobile></soap:Body></soap:Envelope>';
                    xmlhttp2.onreadystatechange = function () {
                        if (xmlhttp2.readyState == 4) {
                            if (xmlhttp2.status == 200) {
                                xmlreponse2 = xmlhttp2.responseXML.getElementsByTagName("GetBuildingsSnapshot_mobileResult")[0].textContent;
                                MyBdgInfo = JSON.parse(xmlreponse2);
                                GeneralInfo = MyBdgInfo.replace(/\"/g, "").split('BoilerInfo')[0]
                                TempInfo = MyBdgInfo.replace(/\"/g, "").split('Table')[2];
                                AlertInfo = MyBdgInfo.split('Table')[3];
                                allItems(removeStart2);
                            }
                        }
                    }
                    xmlhttp2.setRequestHeader("SOAPAction", "http://tempuri.org/GetBuildingsSnapshot_mobile");
                    xmlhttp2.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
                    xmlhttp2.send(sr2);
                }
                else 
                    DevExpress.ui.dialog.alert('Error loading Page','Page Error:');
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/GetCustomersNBuildingsList_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }

    function allItems() {
        var a = 1;
        myArray = new DevExpress.data.ArrayStore({ key: 'buildingid', data: [] });
        var items = removeStart2.split('},{');
        for (i = 0; i < items.length; i++) {
            itemA = items[i].split(',');
            if (itemA[0].split(' : ')[1].toString() == MID) {
                a++;
                var status = getBInfo(itemA[1].split(' : ')[1]);
                values = status.split('*');
                var add = { customerid: itemA[0].split(' : ')[1], numberid: a, buildingid: itemA[1].split(' : ')[1], location: itemA[3].split(' : ')[1], connection: values[0], isAlert: values[1], avgAptHi: ((values.length > 3) ? values[2] : 'N/A'), avgAptLow: ((values.length > 3) ? values[3] : 'N/A') };
                myArray.insert(add).done(function (createdItem, createdID) { });
            }
        }
        viewModel.dataSource(myArray);
        viewModel.loadPanelVisible(false);
    }
    function getBInfo(bid) {
        var isConnected = '';
        buildings = GeneralInfo.split('},{');
        for (c = 0; c < buildings.length; c++) {
            if (buildings[c].split(',')[2].split(' : ')[1] == bid) {
                isConnected = buildings[c].split(',')[6].split(' : ')[1] + '*';
                break;
            }
        }
        Alerts = AlertInfo.split('},{');
        for (b = 0; b < Alerts.length; b++) {
            isAlert = Alerts[b].split('","');
            if (isAlert[0].split('" : "')[1] == bid) {
                if (isAlert[2].split('" : "')[1] == 'False' && isAlert[1].split('" : "')[1] == 'False' && isAlert[6].split('" : "')[1] == 'False')
                    isConnected += 'False*';
                else
                    isConnected += 'True*';
                break;
            }
        }
        Temps = TempInfo.substring(16, TempInfo.length).split('},{');
        for (a = 0; a < Temps.length; a++) {
            if (Temps[a].split(',')[0].split(' : ')[1] == bid) {
                isConnected += Temps[a].split(',')[3].split(' : ')[1] + '*' + Temps[a].split(',')[2].split(' : ')[1];
                break;
            }
        }
        return isConnected;
    }
    function searchItems() {
        var f = 1;
        myArray = new DevExpress.data.ArrayStore({ key: 'buildingid', data: [] });
        var items = removeStart2.split('},{');
        for (i = 0; i < items.length; i++) {
            itemA = items[i].split(',');
            if (itemA[0].split(' : ')[1].toString() == MID && itemA[3].split(' : ')[1].toUpperCase().indexOf(viewModel.searchString().toUpperCase()) == 0) {
                f++;
                var status = getBInfo(itemA[1].split(' : ')[1]);
                values = status.split('*');
                var add = { customerid: itemA[0].split(' : ')[1], numberid:f, buildingid: itemA[1].split(' : ')[1], location: itemA[3].split(' : ')[1], connection: values[0], isAlert: values[1], avgAptHi: ((values.length > 3) ? values[2] : 'N/A'), avgAptLow: ((values.length > 3) ? values[3] : 'N/A') };
                myArray.insert(add).done(function (createdItem, createdID) { });
            }
        }
        viewModel.dataSource(myArray);
    }

    var viewModel = {
        rgb: ko.observable( '#627C9E'),
        dataSource: ko.observableArray([]),
        find: function () { viewModel.showSearch(!viewModel.showSearch()); viewModel.searchString(''); },
        showSearch:ko.observable(false),
        loadPanelVisible: ko.observable(true),
        info: function (e) {setBuilding(e.itemData.buildingid, e.itemData.location); BGS2.app.navigate("BuildingInfo"); },
        searchString: ko.observable(''),
        GetColor: function (itemID) {
            return itemID % 2 == 0 ? '#99ABC4' : '#B4C1D3';//90A4BE
        },
        search2: function () { viewModel.searchString() == '' ? allItems(removeStart2) : searchItems(removeStart2); },
        viewShown: function () { $(".layout-footer").add(); BGS2.config.navigation[3].visible(false); BGS2.config.navigation[2].visible(true); viewModel.loadPanelVisible(true); getBuildings(); },
        logout: function () { var db = window.openDatabase("Database", "1.0", "Credentials DB", 200000); db.transaction(deleteDB, deleteErr, deleteSUC); }
    };
    return viewModel;
};

﻿BGS2.Diagram = function (params) {
    var red = 0, green = 0, blue = 0, tabs = '', dailyReadings = '';
    //var MID = 55;

    //var USERNAME = 'aeichorn';
    //var PASSWORD = 'ae123456';
    function CreateDiagram() {
        // alert(document.documentElement('.dx-scrollable-content'));
    //   viewModel.width1(document.getElementById('sv').clientWidth);
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetApartmentReadings_mobile xmlns="http://tempuri.org/"><aBuildingID>' + BID + '</aBuildingID><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></GetApartmentReadings_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    try{
                        doc = xmlhttp.responseXML;
                        xmlreponse = doc.getElementsByTagName("GetApartmentReadings_mobileResult")[0].textContent;
                        parsed = JSON.parse(xmlreponse);
                        tables = parsed.toString().split('Table');
                        var diagram = '';
                        numBuildings = tables[1].replace(/\"/g, "").split('},{');
                        if (numBuildings.length > 1) {
                            tabs += "<table style='border-bottom:2px solid #42556F; font-size:12px; font-family:Calibri; background-color:#CCD0D7; border-collapse:separate; border-spacing:3px;' id='tabsTable' ><tr>";
                            for (g = 0; g < numBuildings.length; g++) {
                                var backcolor = g == 0 ? '#B4BAC5' : '#CCD0D7';
                                tabs += "<td style='border-radius:6px;  border-left:2px solid #42556F; border-top:2px solid #42556F; border-right:2px solid #42556F;padding:5px; cursor:pointer; background-color:" + backcolor + ";' id='tabs_" + g + "'>" + numBuildings[g].split(',')[6].split(' : ')[1] + "</td>";
                            }
                            tabs += "</tr></table>";
                        }
                        items = tables[1].replace(/\"/g, "").split(',');
                        floors = items[1].split(' : ')[1];
                        apts = items[2].split(' : ')[1];
                        startNum = items[7].split(' : ')[1].split('}')[0];
                        readings = tables[2].replace(/\"/g, "").split(',');
                        newNumber = new Array();
                        floors2 = tables[2].replace(/\"/g, "").split('},{');
                        for (e = 0; e < floors2.length; e++) {
                            whatNumber = floors2[e].split(',')[9].split(' : ')[1];
                            newNumber[e] = whatNumber;
                        }
                        createTable(items, floors, apts, readings, newNumber, startNum);
                        viewModel.MultipleTabs(tabs);
                        if (tabs != '') {
                            var cells = document.getElementById("tabsTable").getElementsByTagName("td");
                            for (i = 0; i < cells.length; i++) {
                                $("#tabs_" + i).click(function () { changeContent(tables); });
                            }
                        }
                        getReadings();
                        viewModel.loadPanelVisible(false);
                        if ($('#myDiv').children().width() <= $(window).width())
                            $('#myDiv').width($(window).width());
                        else
                            $('#myDiv').width($('#myDiv').children().width());
                    }
                    catch (err) {
                        DevExpress.ui.dialog.alert(err, 'Page Error:');
                        viewModel.loadPanelVisible(false);
                    }
                }  
            }         
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/GetApartmentReadings_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }

    function getReadings() {
        xmlhttp = new XMLHttpRequest();
        var d = new Date();
        var today = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear() + ' 00:00:00';
        xmlhttp.open('POST', 'http://bgcsolutions.mine.nu/bgcws.asmx', true);
        var sr = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getCrossTabLogs_mobile xmlns="http://tempuri.org/"><aBuildingID>' + BID + '</aBuildingID><aFromDate>' + today + '</aFromDate><aMinuteRange>' + 60 + '</aMinuteRange><aApartmentsOnly>' + true + '</aApartmentsOnly><aUSerName>' + USERNAME + '</aUSerName><aPassword>' + PASSWORD + '</aPassword></getCrossTabLogs_mobile></soap:Body></soap:Envelope>';
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                        doc = xmlhttp.responseXML;
                        xmlreponse = doc.getElementsByTagName("getCrossTabLogs_mobileResult")[0].textContent;
                        dailyReadings = JSON.parse(xmlreponse);
                }
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/getCrossTabLogs_mobile");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
        xmlhttp.send(sr);
    }

    function createTable(items, floors, apts, readings, newNumber, startNum) {
        //height="340" 
            red = 0; green = 0; blue = 0;
            diagram = '<table style="width:100%" ><tr><td colspan="' + parseInt(apts + 2) + '"><div style="heigth:100%; width:100%; color:Navy; font-weight:bold; text-align:center; background-color:#E4E4E4; line-height:35px; font-family:Calibri; font-size:18px" id="BName">' + items[6].split(' : ')[1] + '</div></td></tr><tr style="background-color:#616E7D;line-height:5px;"><td><br /></td></tr><tr style="background-color:#CCD0D7;line-height:5px;"><td colspan="' + parseInt(apts + 2) + '"> <br /></td colspan="' + parseInt(apts + 2) + '"> </tr><tr><td colspan="7" style="background-color:#E4E4E4;text-align:center;font-size:11.5px; font-family:calibri;">[<span></span>]</td></tr><tr><td align="center">';
            diagram += '<table  style="border-collapse:separate;  width:100%" >';//border-spacing:2px;
            var d = 0;
            parseInt(startNum) == 1 ? d = (floors * apts) : d = parseInt(startNum) + (floors * apts);
            var a = 1;
            var isSensors = true;
            var alreadyTable = false;


            for (var i = floors; i > 0; i--) {
                var SensorsOnFloor = floors > 6 ? containsObject(i, newNumber) : true;
                if (SensorsOnFloor == true) {
                    isSensors = true;
                    diagram += '<tr><td width="10px" height="40px" style="background-color:#E4E4E4;text-align:center;font-size:10px;">' + i + '</td>';
                    (a == 1) ? d = (d - apts) : d = d - (apts * 2);
                    for (a = 1; a < parseInt(apts) + 1; a++) {
                        alreadyTable = false;
                        diagram += '<td style="border:thin solid #42556F; text-align:center; color:White; background-color:#5C769A; font-size:12px; min-width:30px;">'; 
                        d++;
                        var floorLabel = '', AptLabel = '';
                        switch (items[4].split(' : ')[1]) {
                            case '#':
                                AptLabel = (items[3].split(' : ')[1] == '-' ? d : a);
                                break;
                            case '@':
                                AptLabel = getLetter(a - 1).toUpperCase();
                                break;
                            case '':
                                AptLabel = getLetter(a - 1).toUpperCase();
                                break;
                            case ' ':
                                AptLabel = getLetter(a - 1).toUpperCase();
                                break;
                            case '##':
                                AptLabel = (a < 10 ? '0' + a : a);
                                break;
                        }
                        switch (items[3].split(' : ')[1]) {
                            case '#':
                                floorLabel = i;
                                break;
                            case '@':
                                floorLabel = getLetter(i - 1).toUpperCase();
                                break;
                            case '-':
                                floorLabel = '';
                                break;
                            case '':
                                floorLabel = i;
                                break;
                            case ' ':
                                floorLabel = i;
                                break;
                        }
                        var Apt = '';
                        if (items[5].split(' : ')[1] != '' && items[5].split(' : ')[1] != ' ') Apt = items[5].split(' : ')[1] + '-' + floorLabel + '' + AptLabel;
                        else Apt = floorLabel + '' + AptLabel;
                        diagram += '<span style="width:30px; "  id="span_' + a + '">' + Apt + '</span>';
                        for (c = 0; c < readings.length; c++) {
                            if (readings[c].split(' : ')[0] == 'Floors' && readings[c].split(' : ')[1] == i.toString()) {
                                if ((readings[c + 1].split(' : ')[1] == a.toString() || (readings[c + 1].split(' : ')[1] == (parseInt(startNum) + a).toString() && startNum != 1)) && alreadyTable == false) {
                                    diagram = diagram.replace('<span style="width:30px; float:right;"  id="span_' + a + '">' + Apt + '</span>', '<span style="width:30px;" id="span_' + a + '">' + readings[c - 6].split(' : ')[1] + '</span>');
                                    diagram += '<table align="center" style="width:100%; font-size:10px;"><tr><td align="center" ><span  class="Labels" id="' + readings[c - 6].split(' : ')[1] + '_pub" style="cursor:pointer; background-color:' + getColor(readings[c - 2].split(' : ')[1], readings[c - 4].split(' : ')[1]) + '">' + readings[c - 5].split(' : ')[1] + '</span></td></tr></table>';
                                    alreadyTable = true;
                                }
                            }
                        }
                        diagram += '</td>';
                    }
                    diagram += '<td width="10px" height="10px" style="background-color:#E4E4E4;text-align:center;"></td></tr>';
                }
                else {
                    if (isSensors == true)
                        diagram += '<tr style="line-height:10px;"><td ></td><td  colspan = "' + parseInt(apts) + '" style="background-color:#CCD0D7;text-align:center;font-size:9px;">There are no sensors on this/these floor(s)</td><td ></td></tr>'; //style="background-color:#E4E4E4;"
                    isSensors = false;
                }
            }
            diagram = diagram.replace('[<span></span>]', '[<span style="color:Red;">' + red + ' satisfied </span><span style="color:green;">' + green + ' in differential </span><span style="color:blue;">' + blue + ' calling</span>]');
            diagram += '</table></td></tr><tr style="line-height:15px; background-color:#E4E4E4;"> <td  colspan = "' + parseInt(apts + 2) + '"> <br /></td></tr><tr style="background-color:#CCD0D7;line-height:5px;"><td colspan = "' + parseInt(apts + 2) + '"> <br /></td></tr><tr style="background-color:#616E7D;line-height:5px;"> <td colspan = "' + parseInt(apts + 2) + '"><br /> </td> </tr> </table>';
            viewModel.buildingDiagram(diagram);
            var labels = document.getElementsByClassName("Labels");
            for (i = 0; i < labels.length; i++) {
                $(labels[i]).click(function () { aptMatrix() });
            }
    }

    function aptMatrix() {
        var sender = (this && this.target) || (window.event && window.event.srcElement);
        var newID = sender.id.substring(0, sender.id.indexOf('_'));
        var t = new Date();
        var today = t.getMonth() + 1 + '/' + t.getDate() + '/' + t.getFullYear();
        var title = 'Hourly Readings for ' + newID + ' on ' + today;
        var matrixTable = '<table  style="text-align:center; font-family:calibri;font-size:12px"><tr><td width="50px">Time</td><td width="50px">Reading</td></tr>';
        matrixRows = dailyReadings.replace(/\"/g, "").substring(9, dailyReadings.length).split('},{');
        var b = 0;
                    for (i = 0; i < matrixRows.length; i++) {
                        itemA = matrixRows[i].split(',');
                        for (a = 0; a < itemA.length; a++) {
                            if (itemA[a].split(' : ')[0] == newID && matrixRows[i].split(',')[0].split(' : ')[1] != 'Total' && matrixRows[i].split(',')[0].split(' : ')[1] != 'type') {// && matrixRows[i].split(',')[0].split(' : ')[1] != 'Total' || matrixRows[i].split(',')[0].split(' : ')[1] != 'type'
                                b++;
                               matrixTable += '<tr><td style="padding:3px; border:thin solid #42556F;">' + matrixRows[i].split(',')[0].split(' : ')[1].substring(0, 5) + '</td><td style="border:thin solid #42556F;">' + itemA[a].split(' : ')[1] + '</td></tr>';
                            }
                        }
                    }
                    if (b == 0) matrixTable += '<tr><td colspan="2" style="font-size:16px">There is no data to display</td></tr>';
                    matrixTable += '</table>';
                    viewModel.diagramTitle(title);
                    viewModel.OLMsg(matrixTable);
                    viewModel.width1(250);
                    viewModel.height1(310);
                    viewModel.overlayVisible(true);
    }

    function changeContent(tables) {
        var sender = (this && this.target) || (window.event && window.event.srcElement);
        var cells = document.getElementById("tabsTable").getElementsByTagName("td");
        for (i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "#CCD0D7";
        }
        sender.style.backgroundColor = "#B4BAC5";
        number = sender.id.substring(5, sender.id.length);

        numBuildings = tables[1].replace(/\"/g, "").split('},{');

        items = numBuildings[parseInt(number)].replace(/\"/g, "").split(',');
        floors = items[1].split(' : ')[1];
        apts = items[2].split(' : ')[1];
        startNum = items[7].split(' : ')[1].split('}')[0];
        readings = tables[parseInt(number) + 2].replace(/\"/g, "").split(',');
        newNumber = new Array();
        floors2 = tables[parseInt(number) + 2].replace(/\"/g, "").split('},{');
        for (e = 0; e < floors2.length; e++) {
            whatNumber = floors2[e].split(',')[9].split(' : ')[1];
            newNumber[e] = whatNumber;
        }
        document.getElementById("BName").innerHTML = numBuildings[parseInt(number)].split(',')[6].split(' : ')[1];
        createTable(items, floors, apts, readings, newNumber, startNum);
    }

    function containsObject(fl, newNumber) {
        for (f = 0; f < newNumber.length; f++) {
            if (newNumber[f].toString() === fl.toString()) {
                return true;
            }
        }
        return false;
    }

    function getColor(color, active) {
        if (active == "True") {
            switch (color) {
                case "1":
                    red++;
                    return "Red";
                    break;
                case "2":
                    blue++;
                    return "Blue";
                    break;
                case "3":
                    green++;
                    return "Green";
                    break;
            }
        }
        else
            return "Grey";
    }

    function getLetter(number) {
        abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        if (number <= 25)
            return abc[number];
        else
            return "";
    }

  

    var viewModel = {
        buildingDiagram: ko.observable(),
        loadPanelVisible: ko.observable(true),
        MultipleTabs: ko.observable(),
        overlayVisible: ko.observable(false),
        OLMsg: ko.observable(),
        hideOverlay: function () { viewModel.overlayVisible(false); },
        width1: ko.observable(),
        height1: ko.observable(),
        diagramTitle: ko.observable(''),
        scrolldirection: ko.observable('horizontal'),
        popup_onAfterShow: function (e) {
            var popupHeight = e.element.height();
            var popupTitleElement = e.element.find('.dx-popup-title');
            var popupContentElement = e.element.find('.dx-popup-content');
            var titleHeight = popupTitleElement.height() + parseInt(popupTitleElement.css('padding-top')) + parseInt(popupTitleElement.css('padding-bottom'));
            popupContentElement.height(popupHeight - titleHeight - parseInt(popupContentElement.css('padding-top')) - parseInt(popupContentElement.css('padding-bottom')));},
        viewShown: function () { $('#navBar').dxNavBar('instance').option('selectedIndex', 3); viewModel.loadPanelVisible(true); $('#myDiv').width(0); CreateDiagram(); },
        logout: function () { var db = window.openDatabase("Database", "1.0", "Credentials DB", 200000); db.transaction(deleteDB, deleteErr, deleteSUC); }
    };
    return viewModel;
};
