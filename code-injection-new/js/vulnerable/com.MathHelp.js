






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
        







            //callWebSite();
        

           // alert('dadss');
            app.initialize();
        




                
                
                // If you want to prevent dragging, uncomment this section
                /*
                 function preventBehavior(e)
                 {
                 e.preventDefault();
                 };
                 document.addEventListener("touchmove", preventBehavior, false);
                 */
                
                /* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
                 see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
                 for more details -jm */
                /*
                 function handleOpenURL(url)
                 {
                 // TODO: do something with the url passed in.
                 }
                 */
                
                function onBodyLoad()
                {
                    
                    document.addEventListener("deviceready", onDeviceReady, false);
                    
                    scanButton = document.getElementById("scan-button");
                    resultSpan = document.getElementById("scan-result");
                  
                }
                
                
                /* When this function is called, PhoneGap has been initialized and is ready to roll */
                /* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
                 see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
                 for more details -jm */
                function onDeviceReady()
                {
                    // do your thing!
                    //alert("fasdfsadf");
                    navigator.notification.alert("PhoneGap is working");
                    
                    scanButton.addEventListener("click", clickScan, false);
                    createButton.addEventListener("click", clickCreate, false);
                    
                }
                
                
                function clickScan() {
                    window.plugins.barcodeScanner.scan(scannerSuccess, scannerFailure);
                }
                
                
                //------------------------------------------------------------------------------
                function scannerSuccess(result) {
                    console.log("scannerSuccess: result: " + result)
                    resultSpan.innerText = "success: " + JSON.stringify(result)
                }
                
                //------------------------------------------------------------------------------
                function scannerFailure(message) {
                    console.log("scannerFailure: message: " + message)
                    resultSpan.innerText = "failure: " + JSON.stringify(message)
                }
                
                
                
                

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
var siteURL='http://math-help-services.org/apps/';
var UNIQUEID=null;
var UNIQUEID2=null;
var UNIQUEID_USED;

var USERNAME;
var PASSWORD;

var db;
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
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
        
        if (!window.openDatabase) {
            return;
        }
        
				console.log("Device Dimention using PhoneGap");
        		console.log("Width = " + window.innerWidth);
        		console.log("Height = " + window.innerHeight);
        
        
        // this line tries to open the database base locally on the device
        // if it does not exist, it will create it and return a database object stored in variable db
        db = window.openDatabase('Math-help-services', '1.0', 'Math-help-services',65535);
        
        // this line will try to create the table Settings in the database just created/openned
        
        db.transaction(function(tx){
                       
                       // you can uncomment this next line if you want the Settings table to be empty each time the application runs
                       // tx.executeSql( 'DROP TABLE User',nullHandler,nullHandler);
                       
                       // this line actually creates the table Settings if it does not exist and sets up the three columns and their types
                       // note the UserId column is an auto incrementing column which is useful if you want to pull back distinct rows
                       // easily from the table.
                       tx.executeSql( 'CREATE TABLE IF NOT EXISTS Settings(UserId INTEGER NOT NULL PRIMARY KEY, USERNAME TEXT NOT NULL, PASSWORD TEXT NOT NULL,UNIQUEID TEXT NULL,UNIQUEID2 TEXT NULL)', [],nullHandler,errorHandler);
                       },errorHandler,successCallBack);
        
        // this next section will select all the content from the Settinbgs table and then go through it row by row
        // appending the Seetings to the elements on the page
       
        db.transaction(function(transaction) {
                         
                       transaction.executeSql('SELECT * FROM Settings;', [],
                                              function(transaction, result) {
                                              if (result != null && result.rows != null && result.rows.length > 0) {
                                              var row = result.rows.item(0);
                                              
                                              USERNAME=row.USERNAME;
                                              PASSWORD=row.PASSWORD;
                                              UNIQUEID=row.UNIQUEID;
                                              UNIQUEID2=row.UNIQUEID2;
                                              UNIQUEID_USED=(UNIQUEID!=null)?UNIQUEID:UNIQUEID2;
                                              
                                              $.mobile.changePage('#homePage', {reverse: false, changeHash: false});
                                              } else{
                                                $.mobile.changePage('#loginPage', {reverse: false, changeHash: false});
                                                }
                                              }
                                              ,errorHandler);
                       },errorHandler,nullHandler);

        
        
        
        app.receivedEvent('deviceready');
        
        //$.mobile.changePage('#backgroundPage', {reverse: false, changeHash: false});
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


// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
    
}

// this is called when a successful transaction happens
function successCallBack() {
    
}

function nullHandler(){};


//-------------
///////////////////////////////
function saveSetting() {
                           if (!window.openDatabase) {
                           alert('Databases are not supported in this browser.');
                           return;
                           }
                            USERNAME=$('#username').val();
                            PASSWORD=$('#password').val();
                           if(USERNAME == "" ||PASSWORD == "")
                              
                           {
                               showMessage('Error','Please fill missing fields');
                           return;
                           }
                           
    						console.log(siteURL+'registration.aspx?username='+USERNAME+'&password='+PASSWORD+'&timestamp='+Date.now());
                            
                            $.ajax({
                                   url: siteURL+'registration.aspx?username='+USERNAME+'&password='+PASSWORD+'&timestamp='+Date.now(),
                                   success: successLogin,
                                   cache:false,
                                   error:errorLogin,
                                   complete:completeLogin
                                    });
    //return;
                           // this is the section that actually inserts the values into the Settings table
                                                     
}
///////////////////////////////
function successLogin(result,status,xhr)
{
    if (result=='Fail=True')
    {
        showMessage('Login Fail','password is incorrect');
        
    }else if (result=='Login=False')
    {
        showMessage('Login Fail','the account cannot be located');
        
    }else if (result.indexOf('UniqueID')!==-1)
    {
        UNIQUEID=result.replace("UniqueID=", "");
        UNIQUEID_USED=UNIQUEID;
        db.transaction(function(transaction) {
                       transaction.executeSql('DELETE FROM Settings', nullHandler,errorHandler);
                       });
        db.transaction(function(transaction) {
                       transaction.executeSql('INSERT INTO Settings(USERNAME, PASSWORD,UNIQUEID,UNIQUEID2) VALUES (?,?,?,?)',[ $('#username').val(), $('#password').val(),UNIQUEID,UNIQUEID2], nullHandler,errorHandler);
                       });
        $.mobile.loading('show');
        $.mobile.changePage('#homePage', {transition: 'pop', role: 'page'});
        $.mobile.loading('hide');
    }else if (result.indexOf('UniqueID-2')!==-1)
    {
        showMessage('Alert','this account is not currently active');
        UNIQUEID2=result.replace("UniqueID-2=", "");
        UNIQUEID_USED=UNIQUEID2;
        
        db.transaction(function(transaction) {
                       transaction.executeSql('DELETE FROM Settings', nullHandler,errorHandler);
                       });
        db.transaction(function(transaction) {
                       transaction.executeSql('INSERT INTO Settings(USERNAME, PASSWORD,UNIQUEID,UNIQUEID2) VALUES (?,?,?,?)',[ $('#username').val(), $('#password').val(),UNIQUEID,UNIQUEID2], nullHandler,errorHandler);
                       });
        $.mobile.loading('show');
        $.mobile.changePage('#homePage', {transition: 'pop', role: 'page'});
        $.mobile.loading('hide');
        
        
        
    }else if (result.indexOf('Error=')!==-1)
    {
        getErrorMessage(result.replace("Error=", ""));
    }
    
    
}function errorLogin(xhr,status,error)
{
    alert(status + " " + error + "" + xhr);
    
}function completeLogin(xhr,status)
{
}
////////////////////////////////

////////////////////////////////
//. http://math-help-services.org/apps/
function getErrorMessage(msgCode)
{
    $.ajax({
           url: siteURL+'contact.aspx?apperror=true&message='+msgCode,
           success:successGetError,
           cache:false,
           error:errorLogin,
           complete:completeLogin
           });

}
function successGetError(result,status,xhr)
{
    showMessage('Error',result);
}
/////////////////////////////////
//check if the host setting is exist or not
$('#loginpage').live('pageshow', function(event, ui){
                      //$.mobile.changePage('#settingPage', {reverse: false, changeHash: false});
                     });
///////////////////////////////
function clickScan() {
    
    window.plugins.barcodeScanner.scan(scannerSuccess, scannerFailure);
    //var scanner = cordova.require("cordova/plugin/BarcodeScanner");
    //scanner.scan(scannerSuccess, scannerFailure);
}
//------------------------------------------------------------------------------
function scannerSuccess(result) {
    
    
    var requiredId=0;
    var pars =result.text.substring(result.text.indexOf('?') + 1).split('&');
    for (var i = 0; i < pars.length; i++) {
        var tempValues=pars[i].split('=');
        if(tempValues[0]=='id')
            requiredId=tempValues[1];
    }
    if(checkConnection()==false)
        return;
    
    var url= siteURL+'qrcode.aspx?ID='+requiredId+'&uniqueID='+UNIQUEID_USED+'&timestamp='+Date.now();
  
    $('#iframeDevContent').html('<iframe src="'+url+'" id="QRCodeView" height="100%" width="100%" frameborder="0" scrolling="yes" overflow="scroll" onload="endWaitting()"></iframe>');
    
    showWaitting();
}
//-----------------------
function showWaitting()
{
    $.mobile.loading( 'show', {
                     text: 'loading...',
                     textVisible: true,
                     theme: 'b',
                     html: ""
                     });
}
//----------------------
function endWaitting()
{
    $.mobile.loading( 'hide');
}
//------------------------------------------------------------------------------
function scannerFailure(message) {
    showMessage('Error','scanner Failure');
    console.log("scannerFailure: message: " + message);
    resultSpan.innerText = "failure: " + JSON.stringify(message);
}
//-------------------------------
function showMessage(header,meg)
{
    navigator.notification.alert(
                                 meg,
                                 null,
                                 header,
                                 'OK'
                                 );
}
//-----------------------------

function callScan()
{
    $('#iframeDevContent').html('');
}
function callWebSite()
{
    
    if (checkConnection()==false)return; 
    var url=siteURL+'default.aspx?uniqueID='+UNIQUEID_USED+'&username='+USERNAME+'&timestamp='+Date.now();
        
    
    $('#webSiteViewIframe').html('<iframe src="'+url+'" id="webSiteView" height="100%" width="100%" frameborder="0" scrolling="yes" onload="endWaitting()" ></iframe>');
    

//    $('#webSiteView').css('height',$('[data-role="page"]').first().height());
    $.mobile.changePage('#webSite', {reverse: false, changeHash: false});
    showWaitting();
}
//-------------------
//---------------------
function checkConnection()
{
    var result;
    $.ajax({
           async:   false,
           url: 'http://math-help-services.org',
           success: function(result,status,xhr){
            //alert('Connection active!');
            result= true;
           },
           error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert('Internet Connection Not Valid! ');
            result = false;
           }
           });
    return result;
}


