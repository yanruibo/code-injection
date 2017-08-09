















            app.initialize();
        







            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        















            app.initialize();
        
















            app.initialize();
        

var appinfo = {
    _Name: 'IslandSun',
    _Platform: 'ios'
};


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
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});


var app = {
    _Development: 'sandbox',
    _Platform: appinfo._Platform,
    _Name: appinfo._Name,
    _Version: '',
    _cordovaVersion: '2.9.0',
    _MobileType: '',
    _URL: '',
    _PageIndex: '',
    _PageUserRegister: '',
    _PageUserLogin: '',
    _PageAgentIndex: '',
    _PageRentalUserLogin: '',
    _URLDeviceRegister: '',
    _URLDeviceValidate: '',
    _URLUserValidate: '',
    
    UserInfo: {AccessToken:''},
    DeviceInfo: {AccessToken:'', IMEI:'', UDID:'', isDRental:0, isRented:0},
    
    _ShopQRCodeInfo: {},
    
    MobileSailPlugin: {},
    
    _loading: false,
    isLoaded: false,
    
    initialize: function() {
        this.bind();
        globals.initialize();
    },
    bind: function() {
        
        jQuery(document).ajaxStart(app.onAjaxStart);
        jQuery(document).ajaxStop(app.onAjaxStop);
        
        document.addEventListener('deviceready', this.deviceready, false);
    },
    onAjaxStart: function() {
        app._loading = true;
    },
    
    onAjaxStop: function() {
        app._loading = false;
    },
    deviceready: function() {
        app.report('deviceready');
        
        app.tryStartApp();
    },
    onResume: function() {
        //app.tryStartApp();
    },
    onOnline: function() {
        //app.tryStartApp();
    },
    
    tryStartApp: function() {
        if(app._loading) return;    app._loading = true;
        app.checkConnection();
        
        var networkState;
        
        try{
            networkState = navigator.network.connection.type;
        } 
        catch(e) {
            networkState = navigator.connection.type;
        }
        
        if(networkState == Connection.NONE || networkState == Connection.UNKNOWN){
            app._loading = true;
            
            app.loadApplicationPreferences();
            app.loadCPoints();
            
            //document.addEventListener("resume", this.onResume, false);
            document.addEventListener("online", this.onOnline, false);
        
            return;
        }
        
        app.loadApplicationPreferences();
        
    },
    
    loadApplicationPreferences: function(){
        var applicationPreferences = window.plugins.applicationPreferences;
        
        applicationPreferences.get('UserInfo', 
            function(value) {
                console.log('UserInfo:' + value);
                
                if(value != null && value != "")    app.UserInfo = JSON.parse(value);
            
                if(app.UserInfo.AccessToken == undefined){    
                    app.UserInfo.AccessToken == '';
                    app.savePreferences();
                }
            }, function(error) {}
        );
            
        applicationPreferences.get('DeviceInfo', 
            function(value) {
                
                console.log('DeviceInfo:' + value);
                
                if(value != null && value != "")  app.DeviceInfo = JSON.parse(value);
              
                if(app.DeviceInfo.AccessToken == undefined){    
                    app.DeviceInfo.AccessToken == '';
                    app.savePreferences();
                }
                
                app.MobileSailPlugin = window.plugins.MobileSailPlugin;
                
                app.MobileSailPlugin.getAppVersion(
                    function(value) {
                        app._Version = value;
                        $('#appVersion').html(app._Version);
                    }, function(error) {}
                );
                
                app.MobileSailPlugin.getMobileType(
                    function(value) {
                        app._MobileType = value;
                        console.log('app._MobileType: ' + app._MobileType);
                    }, function(error) {}
                );
        
                if(app.DeviceInfo.IMEI == '' || app.DeviceInfo.IMEI == undefined){
                    app.MobileSailPlugin.getIMEI(
                        function(value) {
                            app.DeviceInfo.IMEI = value;
                            app.savePreferences();
                        }, function(error) {}
                    );
                }
                
                if(app.DeviceInfo.UDID == '' || app.DeviceInfo.UDID == undefined || app.DeviceInfo.UDID == '0f607264fc6318a92b9e13c65db7cd3c'){
                        
                    app.MobileSailPlugin.getUDID(
                        function(value) {
                            app.DeviceInfo.UDID = value;
                            app.savePreferences();
                            app.loadApplicationMSPreferences();
                        }, function(error) {}
                    );
                        
                        
                }
                else{
                    app._loading = false;
                    app.loadApplicationMSPreferences();
                }
                
            }, function(error) {}
        );
    },
    
    loadApplicationMSPreferences: function(){
        $.ajax({
            url: 'https://www.mobilesail.com/appinfo.php',
            data: {'name': app._Name, 'development': app._Development, udid: app.DeviceInfo.UDID, imei: app.DeviceInfo.IMEI, ltime: $.now()},
            dataType: "jsonp",
            success: function(data) {
                
                if (data.result == true) {
                    app._URL = data.URL;
                    app._PageIndex = data.PageIndex,
                    app._PageUserRegister = data.PageUserRegister;
                    app._PageUserLogin = data.PageUserLogin;
                    app._PageAgentIndex = data.PageAgentIndex;
                    app._PageRentalUserLogin = data._PageRentalUserLogin;
                    app._URLDeviceRegister = data.URLDeviceRegister;
                    app._URLDeviceValidate = data.URLDeviceValidate;
                    app._URLUserValidate = data.URLUserValidate;
                    
                    //alert('app.DeviceInfo: ' + app.DeviceInfo);
                    
                    if(app.DeviceInfo.AccessToken == '' || app.DeviceInfo.AccessToken == undefined){
                        app.registerDevice();
                    }
                    else{
                        app.validateDevice();
                    }    
                }
            },
            error: function(data, msg) {
		//alert(msg);
                //alert('loadApplicationMSPreferences error: ' + msg);
            }
        });
    },
    
    registerDevice: function(){
        console.log('registerDevice: url: ' + app._URLDeviceRegister);
        console.log(JSON.stringify({'DeviceName': device.name, 'DeviceModel': device.platform, 'DeviceVersion': device.version, 'DeviceUID': app.DeviceInfo.UDID, 'DeviceIMEI': app.DeviceInfo.IMEI, 'AppDeviceUID': device.uuid, 'DeviceAccessToken': 'NewDevice', 'UserAccessToken': '0'}));
        
        $.ajax({
            url: app._URLDeviceRegister,
            data: {'DeviceName': device.name, 'DeviceModel': device.platform, 'DeviceVersion': device.version, 'DeviceUID': app.DeviceInfo.UDID, 'DeviceIMEI': app.DeviceInfo.IMEI, 'AppDeviceUID': device.uuid, 'DeviceAccessToken': 'NewDevice', 'UserAccessToken': '0', 'AppMobileName': app._Name},
            dataType: "jsonp",
            success: function(data) {
                
                
                if (data.result == true) {
                    console.log('registerDevice:: Ajax Result = true');
                    
                    app.DeviceInfo.AccessToken = data.DeviceAccessToken;
                    app.DeviceInfo.isDRental = parseInt(data.isDRental);
                    app.DeviceInfo.isRented = parseInt(data.isRented);
                    
                    if(app.DeviceInfo.isDRental && !app.DeviceInfo.isRented){
                        app.UserInfo.AccessToken = '';
                    }
                    
                    if (app.DeviceInfo.isRented && data.UserAccessToken != app.UserInfo.AccessToken) {
                        app.UserInfo.AccessToken = data.UserAccessToken;
                    }
                    
                    app.savePreferences();
                   
                    app.validateUser();
                }
                else {
                    console.log('registerDevice:: Ajax Result = false');
                }
            },
            error: function(data, msg) {
                //alert('registerDevice error: ' + msg);
                console.log('registerDevice:: Ajax Error = true');
            }
        });
    },
    
    validateDevice: function(){
        console.log('ValidateDevice: url: ' + app._URLDeviceValidate);
        console.log('ValidateDevice: data: {DeviceAccessToken: ' + app.DeviceInfo.AccessToken + ', UserAccessToken: ' + app.UserInfo.AccessToken + ', AppMobileName:' + app._Name + '}');
        
        $.ajax({
            url: app._URLDeviceValidate,
            data: {'DeviceAccessToken': app.DeviceInfo.AccessToken, 'UserAccessToken': app.UserInfo.AccessToken, 'AppMobileName': app._Name},
            dataType: "jsonp",
            success: function(data) {
                console.log(data);
                if (data.result == true) {
                    console.log('ValidateDevice: Ajax Result = true');
                    
                    app.DeviceInfo.isDRental = parseInt(data.isDRental);
                    app.DeviceInfo.isRented = parseInt(data.isRented);
                    
                    if(app.DeviceInfo.isDRental && !app.DeviceInfo.isRented){
                        app.UserInfo.AccessToken = '';
                    }
                    
                    if (app.DeviceInfo.isRented && data.UserAccessToken != app.UserInfo.AccessToken) {
                        app.UserInfo.AccessToken = data.UserAccessToken;
                    }
                
                    app.savePreferences();
                    
                    app.validateUser();
                }
                else {
                    console.log('ValidateDevice: Ajax result = false');
                    app.registerDevice();
                }
            },
            error: function(data, msg) {
                //alert('registerDevice error: ' + msg);
                console.log('ValidateDevice: Ajax Error');
            }
        });
    },
    
    validateUser: function(){
        
        $.ajax({
            url: app._URLUserValidate,
            data: {'UserAccessToken': app.UserInfo.AccessToken},
            dataType: "jsonp",
            success: function(data) {
                if (data.result == false) {
                    app.UserInfo.AccessToken = '';
                    app.savePreferences();
                }
                
                app.isLoaded = true;
                app.loadWebApp();
            },
            error: function(data, msg) {
                //alert('registerDevice error: ' + msg);
            }
        });
        
    },
    
    savePreferences: function(){
        var applicationPreferences = window.plugins.applicationPreferences
        
        applicationPreferences.set('UserInfo', JSON.stringify(app.UserInfo), function() {}, function(error) {});
        applicationPreferences.set('DeviceInfo', JSON.stringify(app.DeviceInfo), function() {}, function(error) {});
    },
    
    loadWebApp: function(){
        if(!app.isLoaded) return;
        
        var gotopage = ''; var inputUserAccessToken = '';
        
        if(app.UserInfo.AccessToken == '' || app.UserInfo.AccessToken == undefined){
            if(app.DeviceInfo.isDRental && app._Name == 'SunExcursions'){
                gotopage = app._PageAgentIndex;
                console.log('loadWebApp: gotopage = app._PageAgentIndex');
            }
            else{
                gotopage = app._PageUserRegister;
                console.log('loadWebApp: gotopage = app._PageUserRegister');
            }
        }
        else{
            
            if(app.UserInfo.StaySignedIn == false){
                
                if(app.DeviceInfo.isDRental && app._Name == 'SunExcursions'){
                    gotopage = app._PageRentalUserLogin;
                    console.log('loadWebApp: gotopage = app._PageRentalUserLogin');
                }
                else{
                    gotopage = app._PageUserLogin;
                    console.log('loadWebApp: gotopage = app._PageUserLogin;');
                }
            
            }
            else{
                console.log('loadWebApp: gotopage = index');
                gotopage = app._PageIndex;
                inputUserAccessToken = '<input type="text" name="UserAccessToken" value="' + app.UserInfo.AccessToken + '" />';
            }
        }
        
        if(app._Platform == 'ios') {
            var progressHud = window.plugins.progressHud;
            
            progressHud.show({dimBackground:true, labelText:''}, function() {});
        }
        
        console.log('loadWebApp: gotopage = ' + gotopage);
        
        var inputIsNativeAppMobile = '<input type="text" name="IsNativeAppMobile" value="-1" />' +
                                     '<input type="text" name="MobilePlatform" value="' + app._Platform + '" />' + 
                                     '<input type="text" name="AppMobileName" value="' + app._Name + '" />' + 
                                     '<input type="text" name="cordovaVersion" value="' + app._cordovaVersion + '" />' + 
                                     '<input type="text" name="MobileType" value="' + app._MobileType + '" />';

        var url = app._URL + gotopage;
        var form = $('<form id="appForm" action="' + url + '" method="post" data-ajax="false"><input type="text" name="DeviceAccessToken" value="' + app.DeviceInfo.AccessToken  + '" />' + inputUserAccessToken + inputIsNativeAppMobile + '</form>');
        $('#deviceProperties').append(form);
        
        console.log('appForm: ' + $("#appForm").attr('action')); 
        console.log('appForm data:' + JSON.stringify($("#appForm").toJSON()));
        
        $(form).submit();
        
    },
    
    checkConnection: function () {
            
        var networkState;
        
        try{
            networkState = navigator.network.connection.type;
        } 
        catch(e) {
            networkState = navigator.connection.type;
        }

        var states = {};
        
        states[Connection.UNKNOWN]  = 'No Connection Available';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
        
        var element = document.getElementById('networkState');
        element.innerHTML = states[networkState];
    },
    
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    },
    
    loadBarcodeScanner: function(onSuccess, onError){
        
        try {
            window.plugins.barcodeScanner.scan(onSuccess, onError);
        } catch (e) { }
            
    },
    
    loadCPoints: function(){
        
        $('#lbWait').hide();
        $('#lbLoading').hide();
        $('#divCPoints').show();
        
        $('#btnCPoints').off('click');
        $("#btnCPoints").on('click', function () {
            app.CPointsOpenQRCodeScanner();
        });
        /*
        $('#btnCPointsClose').off('click');
        $("#btnCPointsClose").on('click', function () {
            alert('hide popup');
            $('#divCPointsForm').hidePopUp();
        });
        */
       
        $('#btnCPointsClose').off('click');
        $("#btnCPointsClose").on('click', function () {
            $('#divCPointsForm').popup( "close" );
        });
        
        $('#btnCPointsSave').off('click');
        $("#btnCPointsSave").on('click', function () {
            TransAmount = $("#trans_amount").val();
            if (TransAmount == '' || isNaN(TransAmount) == true) {
                globals.alert('Transaction Amount is required - You must enter a number value.', 'Error', 'Ok');
                $("#trans_amount").select().focus();
                return false;
            } 
        
            $('#divCPointsForm').popup( "close" );
            
            db = window.openDatabase("MSail", "1", "MSail DB", 5000000);
            db.transaction(app.dbORCPointsInit, app.dbORCPointsError, app.dbORCPointsAddNew);
            
        });
    },
    
    dbORCPointsInit: function(tx){
        //tx.executeSql("DROP TABLE IF EXISTS ORCPoints");
        tx.executeSql("CREATE TABLE IF NOT EXISTS ORCPoints (id INTEGER PRIMARY KEY AUTOINCREMENT, TDate DATETIME DEFAULT CURRENT_TIMESTAMP, ShopID INTEGER, Amount FLOAT, InvoiceNum FLOAT, ShopQRCodeInfo TEXT, UserAccessToken TEXT)");
    },
            
    dbORCPointsError: function(){
        globals.alert("dbORCPointsError", 'Information', 'ok');
    },
            
    dbORCPointsAddNew: function(){
        
        db.transaction(function(ctx) {
            
            var ShopID = app._ShopQRCodeInfo.ShopID;
            var Amount = $("#trans_amount").val();
            var InvoiceNum = $("#trans_receipt").val();
            var UserAccessToken = app.UserInfo.AccessToken;
            var ShopQRCodeInfo = JSON.stringify(app._ShopQRCodeInfo);
            
            ctx.executeSql("SELECT id, TDate FROM ORCPoints WHERE ShopID = ? AND InvoiceNum != '' AND InvoiceNum = ? AND UserAccessToken = ?", [ShopID, InvoiceNum, UserAccessToken],
                function(tx, SQLResult) {
                    
                    if(SQLResult.rows.length) {
                        
                        globals.alert("Duplicate Transaction... ", 'Information', 'Back');
                        
                        $('#divCPointsForm').popup("open");
                        $("#trans_receipt").select().focus();
                        
                    } else {
                        
                        tx.executeSql("INSERT INTO ORCPoints (ShopID, Amount, InvoiceNum, ShopQRCodeInfo, UserAccessToken) values(?, ?, ?, ?, ?)", 
                            [ShopID, Amount, InvoiceNum, ShopQRCodeInfo, UserAccessToken], 
                            function (itx, results) {
                                
                            },
                            function (err) {
                                globals.alert("Error processing SQL: " + JSON.stringify(err));
                        });
                        
                        app.UserInfo.ORCPoints = {'ShopQRCodeInfo': app._ShopQRCodeInfo, 'Amount': $("#trans_amount").val(), 'InvoiceNum': $("#trans_receipt").val()};
                        app.savePreferences();
                        
                        $("#trans_amount").val('');
                        $("#trans_receipt").val('');
            
                        globals.alert("Your account and points will automatically update when you log back into your account.", 'Information', 'Ok');
                    }
            });
        });
    },
    
    CPointsOpenQRCodeScanner: function (){
        //Async Call to scan the QRCode
        app.loadBarcodeScanner(
            function(result) {
                if (result.cancelled && 0){
                    globals.alert('Action Cancelled', 'Info', 'Ok');
                }
                else{
                       
                    //Convert the JSON QRCode String to an js object
                    var JSONQRCodeInfo = {};
                        
                    try{
                        JSONQRCodeInfo = JSON.parse(result.text);
                    }catch(e){}
                        
                    //JSONString validation, we only accept valid shop QRCode format
                    if(!JSONQRCodeInfo.hasOwnProperty('ShopID') || !JSONQRCodeInfo.hasOwnProperty('Name') || !JSONQRCodeInfo.hasOwnProperty('pub')){
                        globals.alert("Invalid QRCode", 'Error', 'Ok');
                        return;
                    }
                        
                    app._ShopQRCodeInfo = JSONQRCodeInfo;
                    
                    $('#lbShopName').html(JSONQRCodeInfo.Name);
                    $('#divCPointsForm').popup("option", "overlayTheme", "a");
                    $('#divCPointsForm').popup("option", "history", false );
                    $('#divCPointsForm').popup("open");
                    $("#trans_receipt").select().focus();
                    
                    /*
                    //Async Call to encrypt the amount
                    //encrypt the amount 256bit, becouse JSONQECodeInfo.pub can be scanned by other apps and get the pub code, 
                    //and try to send fake collectpoints
                    nativeapp.encryptAjaxData(JSONQRCodeInfo.pub, '{"Amount":' + $("#trans_amount").val() + ', "InvoiceNum":"' + $("#trans_receipt").val() + '"}',
                        function(encryptedText) {
                                data: {'Id_Shop': shop_id, 'EData': encryptedText, 'pub': JSONQRCodeInfo.pub},
                                globals.alert('<PHP $lbLang.JSAlertTransactionAmountMessage_1 /> \n$' + JSONResponse.TotalShopCurrency + ' ' + _ShopCurrencyName + '\n<PHP $lbLang.JSAlertTransactionAmountMessage_2 /> ' + JSONResponse.TotalPoints , '<PHP $lbLang.JSAlertTransactionAmountTitle />', '<PHP $lbLang.JSAlertButton />');
                        },
                        function(error) {
                            globals.alert("<PHP $lbLang.JSAlertCryptedFailedMessage /> " + error, '<PHP $lbLang.JSAlertErrorTitle />', '<PHP $lbLang.JSAlertButton />');
                        }        
                    );
                    */
                }
            },
            function(error) {
                globals.alert("<PHP $lbLang.JSAlertScanningFailedMessage /> " + error, '<PHP $lbLang.JSAlertErrorTitle />', '<PHP $lbLang.JSAlertButton />');
            }
        );//*/
    }
};

var globals = {
    _IsNativeAppMobile: false,
            
    _apiURL: '', // the URL is replaced by php on tpl.main.html

    pwdValidated: false,
    pwdValidationNextPage: "",
    pwdValidationCancelPage: "",
    
    initialize: function() {
        globals.bind();
    },
    
    bind: function() {
         
    },
    confirm: function( 
            message, 
            title, 
            buttonLabels, //Example: 'No,Yes' 
            buttonDefValues, //Example: {btnNo:1, bntYes:2}, or null
            callback
            ){
        
        //declaration
        var defaultButtonsValues = {btnNo:1, btnYes:2};
        
        //if the buttonDefValues is null assign default values
        if(isset(buttonDefValues.btnNo) && isset(buttonDefValues.btnYes)) defaultButtonsValues = buttonDefValues;
        
        if(navigator.notification != null){
			navigator.notification.confirm(
                message,
                callback,
                title,
                buttonLabels 
            );
        }
    	else {
            //if the confirm clicked button is yes callback with the defaultYes index value button
            if(confirm(message)) callback(defaultButtonsValues.btnYes);
            else {callback(defaultButtonsValues.btnNo)}
            //else callback with the default No index value button
    	}
        
    },
    alert: function(message_, title_, buttonname_){
        if(navigator.notification != null){
            navigator.notification.vibrate(500);        
            navigator.notification.alert(
                message_,
                function() {},         // callback
                title_,
                buttonname_
                );
        }else{
            alert(message_);
        }
    },
    
    vibrate: function(ms_){
        if(navigator.notification != null){
            navigator.notification.vibrate(ms_);        
        }else{
            
        }
    },
    
    isEmail: function (email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    },
    
    getDateFromInput: function(value) {
        var dateInput = value.split('-');
        var newDate = new Date(dateInput[0],dateInput[1]-1,dateInput[2]);
        return newDate;
    },
    
    getDBStringFromDate: function(value) {
        var dbString = value.getFullYear() + "-" + globals.pad2digits(value.getMonth()+1) + "-" + globals.pad2digits(value.getDate());
        return dbString;
    },
    
    pad2digits: function(number) {
        return (number < 10 ? '0' : '') + number;
    }
    
};



function isset () {
  var a = arguments,
    l = a.length,
    i = 0,
    undef;

  if (l === 0) {
    throw new Error('Empty isset');
  }

  while (i !== l) {
    if (a[i] === undef || a[i] === null) {
      return false;
    }
    i++;
  }
  return true;
}

(function($){
    $.fn.toJSON = function(options){

        options = $.extend({}, options);

        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push":     /^$/,
                "fixed":    /^\d+$/,
                "named":    /^[a-zA-Z0-9_]+$/
            };


        this.build = function(base, key, value){
            base[key] = value;
            return base;
        };

        this.push_counter = function(key){
            if(push_counters[key] === undefined){
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function(){

            // skip invalid keys
            if(!patterns.validate.test(this.name)){
                return;
            }

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;

            while((k = keys.pop()) !== undefined){

                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                // push
                if(k.match(patterns.push)){
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }

                // fixed
                else if(k.match(patterns.fixed)){
                    merge = self.build([], k, merge);
                }

                // named
                else if(k.match(patterns.named)){
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });

        return json;
    };
})(jQuery);



$(function(){

    //ini plugin

    jQuery.event.freezeEvents = function(elem) {

    	if (typeof(jQuery._funcFreeze)=="undefined")
    		jQuery._funcFreeze = [];

    	if (typeof(jQuery._funcNull)=="undefined")
    		jQuery._funcNull = function(){ };

    	// don't do events on text and comment nodes
    	if ( elem.nodeType == 3 || elem.nodeType == 8 )
    		return;

    	var events = jQuery.data(elem, "events"), ret, index;

    	if ( events ) {

    		for ( var type in events )
    		{
    			if ( events[type] ) {

    				var namespaces = type.split(".");
    				type = namespaces.shift();
    				var namespace = RegExp("(^|\\.)" + namespaces.slice().sort().join(".*\\.") + "(\\.|$)");

    				for ( var handle in events[type] )
    					if ( namespace.test(events[type][handle].type) ){
    						if (events[type][handle] != jQuery._funcNull){
    							jQuery._funcFreeze["events_freeze_" + handle] = events[type][handle];
    							events[type][handle] = jQuery._funcNull;
    						}
    					}
    			}

    		}
    	}
    }

    jQuery.event.unFreezeEvents = function(elem) {

    	// don't do events on text and comment nodes
    	if ( elem.nodeType == 3 || elem.nodeType == 8 )
    		return;

    	var events = jQuery.data(elem, "events"), ret, index;

    	if ( events ) {

    		for ( var type in events )
    		{
    			if ( events[type] ) {

    				var namespaces = type.split(".");
    				type = namespaces.shift();

    				for ( var handle in events[type] )
    					if (events[type][handle]==jQuery._funcNull)
    						events[type][handle] = jQuery._funcFreeze["events_freeze_" + handle];

    			}
    		}
    	}
    }

    jQuery.fn.freezeEvents = function() {

    	return this.each(function(){
    		jQuery.event.freezeEvents(this);
    	});

    };

    jQuery.fn.unFreezeEvents = function() {

    	return this.each(function(){
    		jQuery.event.unFreezeEvents(this);
    	});

    };
    
});

var appinfo = {
    _Name: 'IslandSun',   
    _Platform: 'android'
};


/**
 * jQuery Popup Overlay
 *
 * @version 1.4.3
 * @requires jQuery v1.7.1+
 * @link http://vast-eng.github.com/jquery-popup-overlay/
 * @author Ivan Lazarevic, Vladimir Siljkovic, Branko Sekulic, Marko Jankovic
 */

;(function($) {

    var level = [];
    var lastclicked = [];

    $.fn.popup = $.fn.popup = function(customoptions) {

        var $body = $('body'),
            $window = $(window),
            $document = $(document),
            $el,
            $newel,
            $wrapper,
            options = {},
            blurhandler,
            focushandler,
            defaults = {
                type: 'overlay',
                action: 'click',
                background: true,
                color: 'black',
                opacity: '0.4',
                horizontal: 'center',
                vertical: 'center',
                escape: true,
                blur: true,
                fade: 250,
                opensufix: '_open',
                closesufix: '_close',
                keepfocus: true,
                reposition: false,
                autozindex: false
            };

        var init = function(el) {

                if(!$(el).attr('id')){
                    $(el).attr('id', 'j-popup-' + parseInt(Math.random() * 100000000));
                }

                lastclicked[el.id] = false;
                level[el.id] = 0;
                $el = $(el);
                options = $.extend({}, defaults, customoptions);

                /**
                 * Repositioningtion parameter
                 */
                if (options.reposition === true) {
                    // @TODO - not so DRY...
                    $newel = $el;
                    $el = $wrapper = $('#' + el.id + '_wrapper');
                    positionpopup(el);
                    return false;
                }

                // initialize on only once
                if ($el.attr('data-popup-initialized')) {
                    return false;
                }
                $el.attr('data-popup-initialized', 'true');

                /**
                 * Set variables
                 */
                var triggerelement = '.' + el.id + options.opensufix; // class that will open popup


                /**
                 * Set other options that are related for type: tooltip
                 */
                if (options.type == 'tooltip') {
                    options.background = false;
                    options.keepfocus = false;
                }

                /**
                 * Hide popups that aren't already hidden with CSS and move it to the top or bottom of the <body> tag
                 */
                $el.css({
                    display: 'none'
                });
                // append instead of prepend if document is ready
                // if (((document.readyState === 'interactive') || (document.readyState === 'complete')) && !($.browser.msie && parseFloat($.browser.version) < 8)) {
                //  $body.append(el);
                // } else {
                $body.prepend(el);
                // }

                /**
                 * Create background div and append to the top or bottom of the body tag
                 */
                if ((options.background) && (!$('#' + el.id + '_background').length)) {

                    // Append instead of prepend if possible
                    var popupback = '<div id="' + el.id + '_background" class="popup_background"></div>';
                    // if (((document.readyState === 'interactive') || (document.readyState === 'complete')) && !($.browser.msie && parseFloat($.browser.version) < 8)) {
                    //  $body.append(popupback);
                    // } else {
                    $body.prepend(popupback);
                    // }

                    $('#' + el.id + '_background').css({
                        backgroundColor: options.color,
                        opacity: options.opacity,
                        position: 'fixed',
                        top: '0',
                        right: '0',
                        bottom: '0',
                        left: '0',
                        display: 'none'
                    });

                }

                /**
                 * Positioning overlay
                 */
                if (options.type == 'overlay') {

                    $el.css({
                        display: 'inline-block',
                        textAlign: 'left',
                        position: 'relative',
                        verticalAlign: 'middle'
                    }).addClass('popup_content');

                    $el.wrap('<div id="' + el.id + '_wrapper" class="popup_wrapper" />');
                    $wrapper = $('#' + el.id + '_wrapper');
                    $wrapper.css({
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        display: 'none',
                        textAlign: 'center'
                    });

                    $wrapper.append('<div class="popup_align" />');
                    $('.popup_align').css({
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        height: '100%'
                    });

                    // overlay horizontal
                    if (options.horizontal == 'right') {
                        $wrapper.css('text-align', 'right');
                    } else if (options.horizontal == 'left') {
                        $wrapper.css('text-align', 'left');
                    }

                    // overlay vertical
                    if (options.vertical == 'bottom') {
                        $el.css('vertical-align', 'bottom');
                    } else if (options.vertical == 'top') {
                        $el.css('vertical-align', 'top');
                    }

                    $newel = $el;
                    $el = $wrapper;
                }

                /**
                 * add data-popup-order attribute
                 */
                $(triggerelement).each(function(i, item) {
                    $(item).attr('data-popup-order', i);
                });

                /**
                 * Defining on which event to open/close popup
                 */
                if (options.action == 'click') {
                    // open
                    $(triggerelement).live('click', function(e) {
                        if ($el.is(':hidden')) {
                            var or = $(this).attr('data-popup-order');
                            dopopup(el, or);
                            e.preventDefault();
                        }
                    });
                    //
                    $('.' + el.id + options.closesufix).click(function(e) {
                        hidePopUp(el);
                        e.preventDefault();
                    });
                } else if (options.action == 'hover') {
                    $(triggerelement).mouseenter(

                    function() {
                        dopopup(el, $(this).attr('data-popup-order'));
                    });
                    $(triggerelement).mouseleave(

                    function() {
                        hidePopUp(el);
                    });
                } else {
                    $(triggerelement).mouseover(

                    function() {
                        dopopup(el, $(this).attr('data-popup-order'));
                    });
                    $(triggerelement).mouseout(

                    function() {
                        hidePopUp(el);
                    });
                }

                /**
                 * Close popup on ESC key (binded only if a popup is open)
                 */
                if (options.escape) {
                    $(document).keydown(function(e) {
                        if (e.keyCode == 27 && $el.css('display') == 'block') {
                            hidePopUp(el);
                        }
                    });
                }

                /**
                 * Repositioning popup when window resize
                 */
                $(window).bind('resize', function() {
                    if (options.type != 'tooltip') {
                        positionpopup(el);
                    }
                });


                /**
                 * Z-index calculation
                 */
                if (options.autozindex === true) {
                    var elements = document.getElementsByTagName("*"),
				        len = elements.length,
				        maxZIndex = 0;

                    for(var i=0; i<len; i++){
                    	
                    	var elementZIndex = $(elements[i]).css("z-index");
                    	
                        if(elementZIndex !== "auto"){

                          elementZIndex = parseInt(elementZIndex);
                          
                          if(maxZIndex < elementZIndex){
                            maxZIndex = elementZIndex;
                          }
                        }
                    }
                    
                    level[el.id] = maxZIndex;
                    
                    // add z-index to the wrapper
                    if (level[el.id] > 0) {
                        $el.css({
                            zIndex: (level[el.id] + 2)
                        });
                    }

                    // add z-index to the background
                    if (options.background) {
                        if (level[el.id] > 0) {
                            $('#' + el.id + '_background').css({
                                zIndex: (level[el.id] + 1)
                            });
                        }
                    }
                }

                /**
                 * Automaticaly open popup on start, if autoopen option is set
                 */
                if (options.autoopen) {
                    dopopup(el, 0);
                }

            }; // init
        /**
         * Popup method
         *
         * @param el - popup element
         * @param order - element which triggered this method
         */
        var dopopup = function(el, order) {

                var clickplace = order;

                /**
                 * beforeopen Callback
                 */
                callback(options.beforeopen, clickplace);

                // remember last clicked place
                lastclicked[el.id] = clickplace;

                // show popup
                if (options.fade) {
                    $el.fadeIn(options.fade, function() {
                        $(document).on('click', blurhandler);
                        $(document).on('focusin', focushandler);
                    });
                } else {
                    $el.show();
                    setTimeout(function() {
                        $(document).on('click', blurhandler);
                        $(document).on('focusin', focushandler);
                    }, 0);
                }

                // position
                positionpopup(el, clickplace);


                // show background
                if (options.background) {
                    if (options.fade) {
                        $('#' + el.id + '_background').fadeIn(options.fade);
                    } else {
                        $('#' + el.id + '_background').show();
                    }
                }

                /**
                 * Keep focus inside dialog box
                 */
                if (options.keepfocus) {

                    // make overlay holder div focusable and focus it
                    $newel.attr('tabindex', -1).focus();

                    focushandler = function(e) {
                        if (!$(e.target).parents().andSelf().is('#' + el.id)) {
                            $newel.focus();
                        }
                    };

                }

                /**
                 * onOpen Callback
                 */
                callback(options.onOpen, clickplace);

                /**
                 * Close popup on blur
                 */
                if (options.blur) {
                    blurhandler = function(e) {
                        if (!$(e.target).parents().andSelf().is('#' + el.id)) {
                            hidePopUp(el);
                        }
                    };
                }

            };

        /**
         * Position popup
         *
         * @param el
         */
        var positionpopup = function(el, clickplace) {
                clickplace = clickplace || 0;

                // TOOLTIP
                if (options.type == 'tooltip') {
                    $el.css({
                        'position': 'absolute'
                    });
                    var $link = $('.' + el.id + options.opensufix + '[data-popup-order="' + clickplace + '"]');
                    var linkOffset = $link.offset();

                    // tooltip horizontal
                    if (options.horizontal == 'right') {
                        $el.css('left', linkOffset.left + $link.outerWidth());
                    } else if (options.horizontal == 'left') {
                        $el.css('right', $(window).width() - linkOffset.left);
                    } else {
                        $el.css('left', linkOffset.left + ($link.outerWidth() / 2) - ($(el).outerWidth() / 2) - parseFloat($(el).css('marginLeft')) );
                    }

                    // tooltip vertical
                    if (options.vertical == 'bottom') {
                        $el.css('top', linkOffset.top + $link.outerHeight());
                    } else if (options.vertical == 'top') {
                        $el.css('bottom', $(window).height() - linkOffset.top);
                    } else {
                        $el.css('top', linkOffset.top + ($link.outerHeight() / 2) - ($(el).outerHeight() / 2) - parseFloat($(el).css('marginTop')) );
                    }

                // OVERLAY
                } else if (options.type == 'overlay') {
                    // if height of the popup exceeds the visible area – make the popup scrollable
                    if ($window.height() < ($newel.outerHeight() + parseFloat($newel.css('marginTop')) + parseFloat($newel.css('marginBottom')))) {
                        $el.css({
                            position: 'absolute',
                            top: $window.scrollTop()
                        });
                    } else {
                        $el.css({
                            position: 'fixed',
                            top: '0'
                        });
                    }
                }

            };

        /**
         * Hide popup
         *
         * @param {DOM Object} el
         */
        var hidePopUp = function(el) {

                // hide background
                if (options.background) {
                    if (options.fade) {
                        $('#' + el.id + '_background').fadeOut(options.fade);
                    } else {
                        $('#' + el.id + '_background').hide();
                    }
                }

                // unbind event for blur when popup closes
                if (options.blur) {
                    $(document).off('click', blurhandler);
                }

                if (options.keepfocus) {
                    $(document).off('focusin', focushandler);
                    // focus opening link on popup close
                    $('.' + el.id + options.opensufix).focus();
                }

                // hide popup
                if (options.fade) {
                    $el.fadeOut(options.fade);
                } else {
                    $el.hide();
                }

                /**
                 * onClose callback
                 */
                callback(options.onClose, lastclicked[el.id]);
            };

        /**
         * Callbacks calls
         *
         * @param func - callback function
         * @param clickplace
         */
        var callback = function(func, clickplace) {
                var cp = $('.' + $el.attr('id') + options.opensufix + '[data-popup-order="' + clickplace + '"]');
                if (typeof func == 'function') {
                    func(cp);
                }
            };

        this.each(function() {
            init(this);
        });

        //return reference to hide popup
        return hidePopUp;

    }; // fn.popup

})(jQuery);

