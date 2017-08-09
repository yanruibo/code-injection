






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
        


			var strGUID = GUID();

        	window['CacheJS'] = false;
			window['CacheCSS'] = false;
			window['IsDesktopApplication'] = (window.location.search == '?DesktopApplication=true');
			window['IsPhoneGap'] = (window.location.protocol == 'file:');

			// Style sheets
			document.write('<link rel="stylesheet" type="text/css" href="css/Global.css' + ((window['CacheJS']) ? '' : '?' + strGUID) + '">');
			document.write('<link rel="stylesheet" type="text/css" href="css/Message.css' + ((window['CacheJS']) ? '' : '?' + strGUID) + '">');
			document.write('<link rel="stylesheet" type="text/css" href="css/CompanySelection.css' + ((window['CacheJS']) ? '' : '?' + strGUID) + '">');

			// Check the height of the screen.
			var aScreenSize = getWindowSizes();
			if (Number(aScreenSize[1]) < 600)
				document.write('<link rel="stylesheet" type="text/css" href="css/SmallFormFactor.css' + ((window['CacheJS']) ? '' : '?' + strGUID) + '">');
            
			// Check if running in PhoneGap.
			if (window['IsPhoneGap'])
				document.write('<script charset="utf-8" src="cordova.js"><\/script>');

			document.write('<script charset="utf-8" src="scripts/Classes/Base.js' + ((window['CacheJS']) ? '' : '?' + strGUID) + '"><\/script>');
			document.write('<script charset="utf-8" src="scripts/Classes/Functions.js' + ((window['CacheJS']) ? '' : '?' + strGUID) + '"><\/script>');
			document.write('<script charset="utf-8" src="scripts/Index.js' + ((window['CacheJS']) ? '' : '?' + strGUID) + '"><\/script>');
			document.write('<script charset="utf-8" src="scripts/CompanySelection.js' + ((window['CacheJS']) ? '' : '?' + strGUID) + '"><\/script>');
            
			// Scripts.
			document.write('<script charset="utf-8" src="scripts/Classes/DateEx.js' + ((window['CacheJS']) ? '' : '?' + strGUID) + '"><\/script>');
			document.write('<script charset="utf-8" src="scripts/Classes/Message.js' + ((window['CacheJS']) ? '' : '?' + strGUID) + '"><\/script>');
			document.write('<script charset="utf-8" src="scripts/Classes/Recordset.js' + ((window['CacheJS']) ? '' : '?' + strGUID) + '"><\/script>');
			document.write('<script charset="utf-8" src="scripts/Classes/SoapClient.js' + ((window['CacheJS']) ? '' : '?' + strGUID) + '"><\/script>');
			document.write('<script charset="utf-8" src="scripts/Classes/Transform.js' + ((window['CacheJS']) ? '' : '?' + strGUID) + '"><\/script>');
			document.write('<script charset="utf-8" src="scripts/Classes/DataProcessor.js' + ((window['CacheJS']) ? '' : '?' + strGUID) + '"><\/script>');

			//==================================================
			// GUID.
			//==================================================
			function GUID()
			{
				try{
					var chars = '0123456789abcdef'.split('');

					var uuid = [], rnd = Math.random, r;
					uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
					uuid[14] = '4'; // version 4

					for (var i = 0; i < 36; i++){
						if (!uuid[i]){
							r = 0 | rnd()*16;
							uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
						}
					}
				}
				catch(exc){
					this.OnError(exc);
				}
				return uuid.join('');
			}

			//==================================================
			// Get the size of the window.
			//==================================================
			function getWindowSizes(){
				var windowHeight = 0, windowWidth = 0;
				if (typeof (window.innerWidth) == 'number'){
					windowHeight = window.innerHeight;
					windowWidth = window.innerWidth;
				}
				else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)){
					windowHeight = document.documentElement.clientHeight;
					windowWidth = document.documentElement.clientWidth;
				}
				else if (document.body && (document.body.clientWidth || document.body.clientHeight)){
					windowHeight = document.body.clientHeight;
					windowWidth = document.body.clientWidth;
				}
				return [windowWidth, windowHeight];
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


﻿Index.prototype = new Base;
Index.prototype.constructor = Index;

//==================================================
// Company selection class.
//==================================================
function Index(){
    var self = this;
    this.Name = 'Index';

	//=====================================================
	// OnDeviceReady event handler.
	//=====================================================
	this.onDeviceReady = function(){
		try{
			//alert('Index:onDeviceReady');

			// Get the browser detail.
            Functions.Browser();

			// Set the application restart session value to false.
			Functions.SetSessionItem('ApplicationRestart', false);

			// Check if running directly on a desktop browser.
			if (window['Platform'] == 'Desktop'){
				var strURL = window.location.href.toLowerCase();
				strURL = strURL.replace('http:', '');
				strURL = strURL.replace('https:', '');
				strURL = strURL.replace(/\//g, '');
				self.GetSiteIndex_Completed(strURL);
				return;
			}

			// Check if running in the desktop application.
			if (window['Platform'] == 'DesktopApplication'){
				window.external.GetSiteIndex(self.GetSiteIndex_Completed);
				return;
			}

			// Invoke the 'getSiteIndex' plugin.
			cordova.exec(self.GetSiteIndex_Completed, Functions.PluginError, 'VersionInformation', 'getSiteIndex', []);
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//=====================================================
	// ReceivedEvent message handler.
	//=====================================================
	this.ReceivedEvent = function(){
		try{
			if (window['Platform'] == 'Tablet')
                console.log('Received Event: ' + id);
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==================================================
	// Get site index completed handler.
	//==================================================
	this.GetSiteIndex_Completed = function(SiteIndex){
		try{
            //alert('GetSiteIndex_Completed:' + SiteIndex);
			
			// Check the site index.
			switch (SiteIndex){
				case 'safetycheck.truckfile.co.uk':
				case 'safetycheck.truckfile.com':
				case 'safetycheck.truckfile.com.au':
				case 'uk.co.truckfile.dsc':
				case 'co.uk.magicinternet.dsc':
				case 'uk.co.magicinternet.dsc':
				case 'dsc.truckfile.magicinternet':
				case 'SafetyCheck':
					window['SiteIndex'] = 'SafetyCheck';
					window['SiteName'] = 'Safety Check';
					window['LogoTitle'] = '<div class="AppName"><span class="Dark">truck</span><span class="Light">file</span></div>';
					window['LogoImage'] = 'Images/NeutralLogo.png';
					window['FavIcon'] = 'Images/favicon.ico';
					break;

				case 'ftacheck.truckfile.co.uk':
				case 'ftacheck.truckfile.com':
				case 'ftacheck.truckfile.com.au':
				case 'co.uk.truckfile.dsc.fta':
				case 'uk.co.truckfile.dsc.fta':
				case 'fta.dsc.truckfile.magicinternet':
				case 'uk.co.magicinternet.dsc.fta':
				case 'co.uk.magicinternet.dsc.fta':
					window['SiteIndex'] = 'SafetyCheck';
					window['SiteName'] = 'FTA Drivers Walkaround Check';
					window['LogoTitle'] = '';
					window['LogoImage'] = 'Images/FTA/Logo.png';
					window['FavIcon'] = 'Images/FTA/favicon.ico';
					break;
                
				case 'workshop.truckfile.co.uk':
				case 'workshop.truckfile.com':
				case 'workshop.truckfile.com.au':
				case 'uk.co.truckfile.workshop':
				case 'co.uk.truckfile.workshop':
				case 'workshop.truckfile.magicinternet':
				case 'Workshop':
					window['SiteIndex'] = 'WorkshopApplication';
					window['SiteName'] = 'Workshop Application';
					window['LogoTitle'] = '<div class="AppName"><span class="Dark">truck</span><span class="Light">file</span></div>';
					window['LogoImage'] = 'Images/NeutralLogo.png';
					break;
			}

			// Check if compatiblity mode is enabled.
			if ((window['BrowserName'] == 'IE') && (document.documentMode < 8)){
				var objControls = new Object();
				objControls.btnYes = document.createElement('BUTTON');
				objControls.btnYes.setAttribute('type', 'button');
				objControls.btnYes.innerHTML = 'OK';
				objControls.btnYes.IsDefault = true;
				objControls.btnYes.onclick = function(){
					self.winMessage.Close();

					if (window['IsDesktopApplication'])
						window.external.ExitApplicationConfirmed();
				};

				self.winMessage = new Message().Prompt('Please contact your I.T Department/System Administrator (NOT Truckfile Support) as your browser is currently running in \'Compatible Mode\' and is not supported in this application.<br/><br/>Thank you<br/>Truckfile Support.', objControls, window['SiteName'], 'Information');
				return;
			}
			else{
				if ((window['BrowserName'] == 'IE') && (Number(window['BrowserVersion']) < 8)){
					var objControls = new Object();
					objControls.btnYes = document.createElement('BUTTON');
					objControls.btnYes.setAttribute('type', 'button');
					objControls.btnYes.innerHTML = 'OK';
					objControls.btnYes.IsDefault = true;
					objControls.btnYes.onclick = function(){
						self.winMessage.Close();

						if (window['IsDesktopApplication'])
							window.external.ExitApplicationConfirmed();
					};

					self.winMessage = new Message().Prompt('Please contact your I.T Department/System Administrator (NOT Truckfile Support) as your browser is currently running \'Microsoft Internet Explorer ' + window['BrowserVersion'] + '\' which is not supported.<br/><br/>Supported browsers are Internet Explorer 8/9, Chrome, Safari and Firefox.<br/><br/>Thank you<br/>Truckfile Support.', objControls, window['SiteName'], 'Information');
					return;
				}
			}
        
			// Get the application version number.
			Functions.GetApplicationVersion();
        
			// Set the application title.
			document.getElementById('lblSiteName').innerHTML = '<span>' + window['SiteName'] + '</span>';
        
			// Check if running in the desktop application.
			if (window['Platform'] == 'DesktopApplication'){
				window.external.SetApplicationName(window['SiteName']);
				window.external.SiteIndex();
			}

			self.HeadItems = new Object();

			if (window['OS'] == 'iOS')
				self.HeadItems['css/' + window['OS'] + '.css'] = {Type: 'text/css', Source: 'css/' + window['OS'] + '.css'};

			self.HeadItems['css/' + window['BrowserName'] + ((window['BrowserVersion'] == 0) ? '' : window['BrowserVersion']) + '.css'] = {Type: 'text/css', Source: 'css/' + window['BrowserName'] + ((window['BrowserVersion'] == 0) ? '' : window['BrowserVersion']) + '.css'};
			self.HeadItems['css/' + window['SiteIndex'] + '/Global.css'] = {Type: 'text/css', Source: 'css/' + window['SiteIndex'] + '/Global.css'};
			self.HeadItems['css/' + window['SiteIndex'] + '/Settings.css'] = {Type: 'text/css', Source: 'css/' + window['SiteIndex'] + '/Settings.css'};
			self.HeadItems['scripts/Settings.js'] = {Type: 'text/javascript', Source: 'scripts/Settings.js'};
			self.HeadItems['scripts/' + window['SiteIndex'] + '/Login.js'] = {Type: 'text/javascript', Source: 'scripts/' + window['SiteIndex'] + '/Login.js'};

			// Check the site index.
			switch (SiteIndex){
				case 'safetycheck.truckfile.co.uk':
				case 'uk.co.truckfile.dsc':
				case 'co.uk.magicinternet.dsc':
				case 'dsc.truckfile.magicinternet':
				case 'SafetyCheck':
					break;

				case 'ftacheck.truckfile.co.uk':
				case 'uk.co.truckfile.dsc.fta':
				case 'fta.dsc.truckfile.magicinternet':
					if (Number(aScreenSize[1]) < 600)
						self.HeadItems['css/' + window['SiteIndex'] + '/FTA/SmallFormFactor.css'] = {Type: 'text/css', Source: 'css/' + window['SiteIndex'] + '/FTA/SmallFormFactor.css'};
					break;
                
				case 'workshop.truckfile.co.uk':
				case 'uk.co.truckfile.workshop':
				case 'workshop.truckfile.magicinternet':
				case 'Workshop':
					break;
			}

			// Load Android specific scripts.
			if (window['IsPhoneGap']){
				if (window['BrowserName'] == 'Android')
					self.HeadItems['scripts/Classes/iscroll.js'] = {Type: 'text/javascript', Source: 'scripts/Classes/iscroll.js'};
			}

			// Load Windows Phone specific stylesheets.
			if (window['WindowsPhone'])
			{
				self.HeadItems['css/WindowsPhone.css'] = {Type: 'text/css', Source: 'css/WindowsPhone.css'};

				var aWindowSize = getWindowSizes();

				// Dynamically add the viewport screen width and height.
				var sheet = document.createElement('style'); 
				sheet.type = 'text/css'; 
				sheet.innerHTML = '@-ms-viewport{width: ' + aWindowSize[0] + 'px; height: ' + aWindowSize[1] + 'px;}';
				document.body.appendChild(sheet);
			}

			var aControls = ['VehicleSelection', 'JobSelection', 'Header', 'DailySafetyCheckVehicle', 'SafetyCheckHours', 'Sections', 'Questions', 'Answers', 'Rectifications', 'History', 'DocumentView'];

			// Load control scripts and styles.
			for(Control in aControls){
				self.HeadItems['css/' + window['SiteIndex'] + '/' + aControls[Control] + '.css'] = {Type: 'text/css', Source: 'css/' + window['SiteIndex'] + '/' + aControls[Control] + '.css'};
				self.HeadItems['scripts/' + window['SiteIndex'] + '/' + aControls[Control] + '.js'] = {Type: 'text/javascript', Source: 'scripts/' + window['SiteIndex'] + '/' + aControls[Control] + '.js'};
			}

			// Load the head items.
			Functions.LoadHeadItems(self.HeadItems, self.LoadedComplete);
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==================================================
	// Load complete handler.
	//==================================================
	this.LoadedComplete = function(){
		try{
			//alert('Index:LoadedComplete');

			// Start the data processor.
			DataProcessor.AddLocalToQueue();

			document.getElementById('BodyContainer').style.display = '';
			document.getElementById('BodyContainer').className = '';
			document.getElementById('btnSettings').style.display = '';

			// Format the title.
			Functions.FormatTitle('lblSiteName', 52, 3);

			// Get the current control.
			var strCurrentControl = Functions.GetSessionItem('CurrentControl');

			// Hide the splash screen (iOS devices only, Android is handled in the 'onCreate' java class).
			if (window['iDevice'])
				navigator.splashscreen.hide();

			// Check the current control.
			if (strCurrentControl == ''){
				window['Login'] = new Login();
				window['Login'].Init();
			}
			else{
				Functions.LoadControl(strCurrentControl);
			}
		}
		catch (exc){
			//self.OnError(exc);
		}
	}

	//==================================================
	// Page load event handler.
	//==================================================
	this.Load = function(){
		try{
			Base.prototype.Load.call(self);

			// Call the device ready.
			if (window['IsPhoneGap']){
				document.addEventListener('deviceready', self.onDeviceReady, false);
				
				Functions.BackButtonHandler(undefined, true);
			}
			else{
				self.onDeviceReady();
			}
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

var Index = new Index();

﻿Settings.prototype = new Base;
Settings.prototype.constructor = Settings;

//==================================================
// Settings class.
//==================================================
function Settings(){
	var self = this;
	this.Name = 'Settings';

	//==============================================
    // Load event handler.
    //==============================================
    this.ChangePassword_Loaded = function(Callback){
		try{
			// Get form elements.
			self.txtCurrentPIN = document.getElementById('txtCurrentPIN');
			self.txtNewPIN = document.getElementById('txtNewPIN');
			self.txtConfirmNewPIN = document.getElementById('txtConfirmNewPIN');

			// Set focus to the current PIN textbox.
			self.txtCurrentPIN.focus();
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
    // Reset the form.
    //==============================================
	this.ResetForm = function(){
		try{
			self.txtCurrentPIN.value = '';
			self.txtNewPIN.value = '';
			self.txtConfirmNewPIN.value = '';
			self.txtCurrentPIN.focus();
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
    // Change PIN OK button click event handler.
    //==============================================
	this.btnChangePINOK_Click = function(){
		try{
			var strValidateMessage = '';

			strValidateMessage += (self.txtCurrentPIN.value == '') ? '<li>Your current PIN</li>' : '';
			strValidateMessage += (self.txtNewPIN.value == '') ? '<li>Your new PIN</li>' : '';
			strValidateMessage += (self.txtConfirmNewPIN.value == '') ? '<li>Confirmation of your new PIN</li>' : '';

			// Check if the user has entered their current password, new password and confirmed new password.
			if (strValidateMessage != ''){
				new Message().Prompt('Please enter the following information: -<ol>' + strValidateMessage + '</ol>', undefined, window['SiteName'], 'Error');
				return;
			}

			// Check the length of the new password.
			if (self.txtNewPIN.value.length < 4){
				self.ResetForm();
				new Message().Prompt('Your new PIN must be a minimum of 4 characters.', undefined, window['SiteName'], 'Error');
				return;
			}

			// Check if the new PIN is not the same as the current PIN.
			if (self.txtNewPIN.value == self.txtCurrentPIN.value){
				self.ResetForm();
				new Message().Prompt('Your new PIN cannot be the same as your existing PIN.', undefined, window['SiteName'], 'Error');
				return;
			}

			// Check if the new PIN and confirm PIN match.
			if (self.txtConfirmNewPIN.value != self.txtNewPIN.value){
				self.ResetForm();
				new Message().Prompt('The confirmed PIN doen\'t match your new PIN.', undefined, window['SiteName'], 'Error');
				return;
			}

			// Validate the user's PIN.
			Functions.GetData('UserList', function(FileData){
				if (FileData == undefined){
					self.SendPINUpdate();
					return;
				}

				var blnPINCorrect = false;

				// Load the data.
				var objUserListRS = new Recordset();
				objUserListRS.LoadXML(FileData[1], 'Users');

				// Find the row relating to the user.
				if (objUserListRS.Find('[XUserID]=' +Number(Functions.GetSessionItem('XUserID')))){
					blnPINCorrect = (Number(self.txtCurrentPIN.value) == Number(objUserListRS.Rows[objUserListRS.CurrentPosition]['Passcode'].Value));
				}

				delete objUserListRS;

				// Check if the PIN was correct.
				if (blnPINCorrect){
					self.SendPINUpdate();
				}else{
					self.ResetForm();
					new Message().Prompt('You have entered an incorrect PIN.', undefined, window['SiteName'], 'Error');
				}
			});
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
    // Send the PIN update.
    //==============================================
	this.SendPINUpdate = function(){
		try{
			// Build the data processor XML.
			var strXML = '<Data>';
			strXML += '	<XUserID>' + Functions.GetSessionItem('XUserID') + '</XUserID>';
			strXML += '	<CurrentPIN>' + self.txtCurrentPIN.value + '</CurrentPIN>';
			strXML += '	<NewPIN>' + self.txtNewPIN.value + '</NewPIN>';
			strXML += '</Data>';

			self.winChangingPassword = new Message().WaitWindow('Changing password, please wait...');

			// Send the data to the processor.
			DataProcessor.AddToQueue('ChangePIN', strXML, self.PasswordChanged, true, 'changing the password');
		}
        catch (exc){
            self.OnError(exc);
        }
	}
	
	//==============================================
    // Password changed handler.
    //==============================================
	this.PasswordChanged = function(Response, PerformedSilently, Data){
		try{
			if (self.winChangingPassword){
				self.winChangingPassword.Close();
				delete self.winChangingPassword;
			}

			// Update the user's PIN.
			if (!PerformedSilently){
				Functions.GetData('UserList', function(FileData){
					if (FileData == undefined)
						return;

					// Load the data.
					var objUserListRS = new Recordset();
					objUserListRS.LoadXML(FileData[1], 'Users');

					// Find the row relating to the user.
					if (objUserListRS.Find('[XUserID]=' + Number(Functions.GetSessionItem('XUserID')))){
						var objData = new Recordset();
						objData.LoadXML(Data, 'Data');
						objUserListRS.Rows[objUserListRS.CurrentPosition]['Passcode'].Value = Number(objData['NewPIN']);
						Functions.StoreData('UserList', objUserListRS.toString());
						delete objData;
					}

					delete objUserListRS;
				});
			}
			
			// Check the response.
			if (Response == "Success"){
				if (self.winChangePassword){
					self.winChangePassword.Close();
					delete self.winChangePassword;
				}

				// Check if the pas
				if (!PerformedSilently)
					new Message().Prompt('Your PIN has been changed.', undefined, window['SiteName'], 'Information');
			}
			else{
				if (Response == "Failure"){
					if (self.winChangePassword){
						self.winChangePassword.Close();
						delete self.winChangePassword;
					}
					return;
				}
				self.ResetForm();

				// Check the response.
				if (Response)
					new Message().Prompt(Response, undefined, window['SiteName'], 'Error');
			}
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
	// Flow control button clicked event handler.
	//==============================================
	this.FlowControl_Clicked = function(Setting, Value){
		try{
			var btnOn = document.getElementById('btn' + Setting + '_On');
			var btnOff = document.getElementById('btn' + Setting + '_Off');

			// Store the setting.
			Functions.SetUserItem(Setting, Value);

			// Check the setting.
			switch (Value)
			{
				case 'On':
					btnOn.className = 'Selected';
					btnOff.className = 'NotSelected';
					break;

				case 'Off':
					btnOn.className = 'NotSelected';
					btnOff.className = 'Selected';
					break;
			}
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// Change PIN button clicked event handler.
	//==============================================
	this.btnChangePIN_Click = function(){
		try{
			var objControls = new Object();
		
			objControls.btnOK = document.createElement('BUTTON');
			objControls.btnOK.setAttribute('type', 'button');
			objControls.btnOK.innerHTML = 'OK';
			objControls.btnOK.onclick = function(){ Settings.btnChangePINOK_Click(); };

			objControls.btnClose = document.createElement('BUTTON');
			objControls.btnClose.setAttribute('type', 'button');
			objControls.btnClose.innerHTML = 'Cancel';

			self.winChangePassword = new Message().PopupWindow(undefined, 'Xslt/ChangePIN.xslt', window['SiteName'], objControls, 314, self.ChangePassword_Loaded, true);
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// Log out button click event handler.
	//==============================================
	this.btnLogOut_Click = function(){
		try{
			var objControls = new Object();
			objControls.btnYes = document.createElement('BUTTON');
			objControls.btnYes.setAttribute('type', 'button');
			objControls.btnYes.innerHTML = 'Yes';
			objControls.btnYes.IsDefault = true;
			objControls.btnYes.onclick = function(){
				Settings.winLogout.Close();

				// Reset login details etc..
				Functions.ResetVariables();

				Functions.winSettings.Close();
			
				// Load the login control.
				Functions.LoadControl(window['SiteIndex'] + '/Login');
			};

			objControls.btnNo = document.createElement('BUTTON');
			objControls.btnNo.setAttribute('type', 'button');
			objControls.btnNo.innerHTML = 'No';

			self.winLogout = new Message().Prompt(((Functions.GetSessionItem('PerformingCheck').toString() == 'true') ? 'You are currently in the peforming a safety check on \''+ Functions.GetSessionItem('RegistrationNumber') + '\'. If you log out now you will loose all data which has currently been record.<br/><br/>' : '') + 'Are you sure that you want to logout?', objControls, window['SiteName'], 'Question');
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==============================================
	// Country listbox change event handler.
	//==============================================
	this.lstCountry_Change = function lstCountry_Change(evt){
		try{
			var objSourceElement = evt.srcElement ? evt.srcElement : evt.target;
			Functions.SetItem('Country', objSourceElement.options[objSourceElement.selectedIndex].value);
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==============================================
	// Image quality listbox change event handler.
	//==============================================
	this.lstImageQuality_Change = function lstImageQuality_Change(evt){
		try{
			var objSourceElement = evt.srcElement ? evt.srcElement : evt.target;
			Functions.SetItem('ImageQuality', objSourceElement.options[objSourceElement.selectedIndex].value);
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==============================================
	// Image size listbox change event handler.
	//==============================================
	this.lstImageSize_Change = function lstImageSize_Change(evt){
		try{
			var objSourceElement = evt.srcElement ? evt.srcElement : evt.target;
			var aImageSize = objSourceElement.options[objSourceElement.selectedIndex].value.split('x');
			Functions.SetItem('ImageTargetWidth', aImageSize[0]);
			Functions.SetItem('ImageTargetHeight', aImageSize[1]);
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

var Settings = new Settings();

CompanySelection.prototype = new Base;
CompanySelection.prototype.constructor = CompanySelection;

//==================================================
// Company selection class.
//==================================================
function CompanySelection(){
    var self = this;
    this.Name = 'CompanySelection';
    this.Xslt = 'Xslt/CompanySelection.xslt';
    
    //==============================================
    // Load event handler.
    //==============================================
    this.Loaded = function(){
        try{
			Functions.BackButtonHandler(self.btnCancel_Click, true);

			// Get form elements.
            self.txtCompanyName = document.getElementById('txtCompanyName');
			self.btnSearch = document.getElementById('btnSearch');
			
			// Set focus to the company name textbox.
			self.txtCompanyName.focus();
        }
        catch (exc){
            self.OnError(exc);
        }
    }
    
    //==============================================
    // Company name focus handler.
    //==============================================
    this.CompanyName_Focus = function(){
        try{
            self.winCompanyName.Close();
            self.txtCompanyName.focus();
        }
        catch (exc){
            self.OnError(exc);
        }
    }
	
    //==============================================
    // Company name keypress event handler.
    //==============================================
	this.txtCompanyName_KeyPress = function(evt){
		try{
			var objSourceElement = evt.srcElement ? evt.srcElement : evt.target;
			var intKeyCode = evt.keyCode ? evt.keyCode : evt.which;

			// Check the keycode.
			if (intKeyCode == 13)
			{
				window.setTimeout(function(){ self.btnSearch_Click(); }, 0);
			
				if (evt.preventDefault)
					evt.returnValue = false;

				return false;
			}
		}
        catch (exc){
            self.OnError(exc);
        }
	}
    
    //==============================================
    // Company search soap completed handler.
    //==============================================
    this.CompanySearch_Completed = function(Response, Object){
        try{
			// Check if an error occured.
			if (Response[0] == 'ERROR'){
				return;
			}

			// Render the data.
            new Transform().Render(document.getElementById('MainContainer'), Response[1], self.Xslt + '?Action=DisplayData', 'Loading data, please wait...', self.CompanySearchXSLT_Completed, true);
        }
        catch (exc){
            self.OnError(exc);
        }
    }
    
    //==============================================
    // Company search result XLST completed handler.
    //==============================================
    this.CompanySearchXSLT_Completed = function CompanySearchXSLT_Completed(){
        try{
			Functions.EnableScroll('CompanyResults');
        }
        catch (exc){
            self.OnError(exc);
        }
    }
    
    //==============================================
    // Company button click event handler.
    //==============================================
    this.btnCompanySelection_Click = function(CompanyID){
        try{
			// Store the company ID.
			Functions.SetItem('CompanyID', CompanyID);

			// Delete store data.
			Functions.DeleteData('UserList', self.CompanySelected);
        }
        catch (exc){
            self.OnError(exc);
        }
    }
	
    //==============================================
    // Company selected.
    //==============================================
	this.CompanySelected = function CompanySelected(){
		try{
			// Redirect user back to login page.
			Functions.LoadControl('Login', undefined, undefined, function(){ Functions.GetData('UserList', Login.UserList_Loaded); });
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
	// Search button click event handler.
	//==============================================
	this.btnSearch_Click = function(){
		try{
			// Check the company name value.
			if (this.txtCompanyName.value.length < 3){
				var objControls = new Object();
				objControls.btnOK = document.createElement('BUTTON');
				objControls.btnOK.setAttribute('type', 'button');
				objControls.btnOK.innerHTML = 'OK';
				objControls.btnOK.IsDefault = true;
				objControls.btnOK.onclick = function(){ CompanySelection.CompanyName_Focus(); };

				self.winCompanyName = new Message().Prompt('Please enter at least the first three characters of your company name.', objControls, window['SiteName'], 'Question');
				return;
			}

			self.btnSearch.focus();

			// Get a list of matching companies.
			var soapClient = new SoapClient(self.WebServiceURL, 'CompanySearch', self.CompanySearch_Completed, undefined, 'Searching companies' + Functions.NetworkMessage() + ', please wait...');
			soapClient.AddParameter('CompanyName', self.txtCompanyName.value);
			soapClient.Send();
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// Cancel button click event handler.
	//==============================================
	this.btnCancel_Click = function(){
		try{
			Functions.RemoveBackButtonHandler();
			Functions.LoadControl(window['SiteIndex'] + '/Login');
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// Try again button click event handler.
	//==============================================
	this.btnTryAgain_Click = function(){
		try{
			Functions.LoadControl('CompanySelection');
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// Cancel search results button click event handler.
	//==============================================
	this.btnCancelResults_Click = function(){
		try{
			Functions.LoadControl(window['SiteIndex'] + '/Login');
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

Login.prototype = new Base;
Login.prototype.constructor = Login;

//==================================================
// Login class.
//==================================================
function Login(){
    var self = this;
    this.Name = 'Login';
    
    //==============================================
    // Load event handler.
    //==============================================
    this.Loaded = function(){
        try{
			// Check if a company has been selected.
            if (Functions.GetItem('CompanyID') == ''){
                self.btnChangeCompany_Click();
            }
        }
        catch (exc){
            this.OnError(exc);
        }
    }
    
    //==============================================
    // Soap test completed handler.
    //==============================================
    this.SoapTest_Completed = function(Response, Object){
        try{
            Functions.Decompress(Response[0], self.Decompress_Completed);
        }
        catch (exc){
            this.OnError(exc);
        }
    }
}

//==================================================
// QR code login button click event handler.
//==================================================
Login.prototype.btnQRCodeLogin_Click = function(){
    try{
        Functions.Scan();
    }
	catch (exc){
		this.OnError(exc);
	}
}

//==================================================
// Change company button click event handler.
//==================================================
Login.prototype.btnChangeCompany_Click = function(){
    try{
        Functions.LoadControl(CompanySelection);
    }
	catch (exc){
		this.OnError(exc);
	}
}

//==================================================
// Login button click event handler.
//==================================================
Login.prototype.btnLogin_Click = function(){
    try{
        // Check if a company has been selected.
        if (Functions.GetItem('CompanyID') == ''){
            this.btnChangeCompany_Click();
        }
    }
	catch (exc){
		this.OnError(exc);
	}
}

﻿DocumentView.prototype = new Base;
DocumentView.prototype.constructor = DocumentView;

//==================================================
// Document View.
//==================================================
function DocumentView(){
    var self = this;
    this.Name = 'DocumentView';

	//==============================================
    // Load event handler.
    //==============================================
    this.Loaded = function(){
        try{
			this.SessionManager();

			Functions.BackButtonHandler(self.btnBack_Click, true);

			// Close the wait window.
			if (window['winDocument'])
				window['winDocument'].Close();

			// Check if the document has been loaded.
			if (document.getElementById('scroller').innerHTML == ''){
				self.btnBack_Click();
				return;
			}

			// Enable the scroller on the document.
			Functions.EnableScroll('DocumentViewContainer');
        }
        catch (exc){
            self.OnError(exc);
        }
    }

	//==============================================
	// Template loaded event handler.
	//==============================================
	this.TemplateLoaded = function(Data){
		try{
            var strXML = self.DocumentXML + Data;
            
            // Load the document.
			Functions.LoadControl(window['SiteIndex'] + '/DocumentView', '<DataSet>' + strXML + '</DataSet>');
			new Message().WaitWindow('Loading, please wait...');
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
	// End of day check button click event handler.
	//==============================================
	this.btnEndOfDayCheck_Click = function(){
		try{
			// Get the user to confirm the end of day check,
			var objControls = new Object();
			objControls.btnYes = document.createElement('BUTTON');
			objControls.btnYes.setAttribute('type', 'button');
			objControls.btnYes.innerHTML = 'Yes';
			objControls.btnYes.IsDefault = true;
			objControls.btnYes.onclick = function(){
				self.winMessage.Close();

				// Set the 'EndOfDayCheck' session value.
				Functions.SetSessionItem('EndOfDayCheck', true);
				
				// Load the header control.
				Functions.LoadControl(window['SiteIndex'] + '/Header');
			};

			objControls.btnNo = document.createElement('BUTTON');
			objControls.btnNo.setAttribute('type', 'button');
			objControls.btnNo.innerHTML = 'No';

			self.winMessage = new Message().Prompt('Are you sure that you want to perform the \'End of Day Check\' on \'' + Functions.GetSessionItem('RegistrationNumber') + '\'.', objControls, window['SiteName'], 'Question');
		}
        catch (exc){
            self.OnError(exc);
        }
	}
	
	//==============================================
	// Send button click event handler.
	//==============================================
	this.btnSend_Click = function(){
		try{
			// Send the check, this is done by invoking the 'SafeToDrive' function with 'true = Vehicle/Asset is safe to drive'.
			var objControls = new Object();
			objControls.btnYes = document.createElement('BUTTON');
			objControls.btnYes.setAttribute('type', 'button');
			objControls.btnYes.innerHTML = 'Yes';
			objControls.btnYes.IsDefault = true;
			objControls.btnYes.onclick = function(){
				self.winMessage.Close();

				var strXML = Functions.GetSessionItem('SendCheckXML');
				strXML = strXML.replace(/&lt;/gi, '<');
				strXML = strXML.replace(/&gt;/gi, '>');

				self.WaitWindow = new Message().WaitWindow('Sending check, please wait...');
				DataProcessor.AddToQueue('ProcessJobSheet', strXML, self.CheckSent, false, 'safety check', true);
			};

			objControls.btnNo = document.createElement('BUTTON');
			objControls.btnNo.setAttribute('type', 'button');
			objControls.btnNo.innerHTML = 'No';

			var strNetworkInfoMessage = '';

			// Check the network type.
			switch (Functions.CheckConnection())
			{
				case 'Cell 2G connection':
				case 'Cell 3G connection':
				case 'Cell generic connection':
					strNetworkInfoMessage = '<br/><br/><strong>N.B</strong> The data may take a while to send over the mobile network.';
					break;
			}

			self.winMessage = new Message().Prompt('Are you sure that you want to send the safety check?' + strNetworkInfoMessage, objControls, window['SiteName'], 'Question');
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==============================================
	// Check sent event handler.
	//==============================================
	this.CheckSent = function(){
		try{
			self.WaitWindow.Close();
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==============================================
	// Back button click event handler.
	//==============================================
	this.btnBack_Click = function(){
		try{
            self.LoadAttempt = 0;
            
			// Get the history data.
			Functions.GetData('History', function(Data){
				// Load the history control.
				Functions.LoadControl(window['SiteIndex'] + '/History', ((Data == undefined) ? '' : Data[1]), '?UserID=' + Functions.GetSessionItem('XUserID'));
			});
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

﻿SafetyCheck_Hours.prototype = new Base;
SafetyCheck_Hours.prototype.constructor = SafetyCheck_Hours;

//==================================================
// Safety check - hours class.
//==================================================
function SafetyCheck_Hours(){
    var self = this;
    this.Name = 'SafetyCheck_Hours';

	//==============================================
    // Load event handler.
    //==============================================
    this.Loaded = function(){
        try{
			this.SessionManager();

			// Remove the section, question and answer scrollbar position.
			Functions.DeleteSessionItem('Section_ScrollTop');
			Functions.DeleteSessionItem('Question_ScrollTop');
			Functions.DeleteSessionItem('Answer_ScrollTop');

			// Update the registration number.
			document.getElementById('lblRegistrationNumber').innerHTML = Functions.GetSessionItem('RegistrationNumber');

			// Get form elements.
			self.txtHours = document.getElementById('txtHours');
			self.ValidateHours = true;

			// Get the vehicle's/asset's hours value, if it's empty, set it to zero.
			if (Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_Hours') == '')
				Functions.SetItem(Functions.GetSessionItem('VehicleID') + '_Hours', 0);

			// Set the hours textbox values.
			self.txtHours.value = Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_Hours');

			// Check the value, if zero, check session storage.
			if (self.txtHours.value == '0')
				self.txtHours.value = Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_Hours');

			// Store the original hours.
			self.OriginalHours = Number(self.txtHours.value);

			// Check the hours textbox value before moving focus to it, if it's zero, empty the content.
			if (Number(self.txtHours.value) == 0)
				self.txtHours.value = '';

			// Focus the hours textbox.
			self.txtHours.focus();
        }
        catch (exc){
            self.OnError(exc);
        }
    }

    //==============================================
    // Hours textbox keypress event handler.
    //==============================================
	this.txtHours_KeyPress = function(evt){
		try{
			Functions.NumericOnly(evt, self.btnContinue_Click, false, false);
		}
        catch (exc){
            self.OnError(exc);
        }
	}
	
    //==============================================
    // Hours textbox blur event handler.
    //==============================================
	this.txtHours_Blur = function(){
		try{
			self.txtHours.value = (self.txtHours.value == '') ? 0 : self.txtHours.value;
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
	// Continue button click event handler.
	//==============================================
	this.btnContinue_Click = function(){
		try{
			if (Functions.GetSessionItem('HeaderControlValidate') == 'true'){
				// Check if the user has entered the hours.
				if (Number(self.txtHours.value) == 0){
					self.winMessage = new Message().SimplePrompt('Please enter the current hours.', function(){
						self.txtHours.value = '';
						self.txtHours.focus();
						self.winMessage.Close();
					}, 'Information');
					return;
				}

				// Check if the hours has been changed.
				if (self.ValidateHours){
					var strMessage = '';

					if (Number(self.txtHours.value) < Number(Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_Hours'))){
						strMessage = 'The hours you have entered is less than previously recorded';
					}
					else{
						if (Number(self.txtHours.value) == Number(Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_Hours'))){
							strMessage = 'The hours you have entered is the same as previously recorded';
						}
					}
			
					// Check the message.
					if (strMessage != ''){
						var objControls = new Object();
						objControls.btnYes = document.createElement('BUTTON');
						objControls.btnYes.setAttribute('type', 'button');
						objControls.btnYes.innerHTML = 'Yes';
						objControls.btnYes.IsDefault = true;
						objControls.btnYes.onclick = function(){
							self.ValidateHours = false;
							self.winMessage.Close();
							self.Continue();
						};

						objControls.btnNo = document.createElement('BUTTON');
						objControls.btnNo.setAttribute('type', 'button');
						objControls.btnNo.innerHTML = 'No';
						objControls.btnNo.onclick = function(){
							self.winMessage.Close();
							self.txtHours.value = '';
							self.txtHours.focus();
						};

						self.winMessage = new Message().Prompt(strMessage + '. Are you sure that you want to continue with this value?', objControls, window['SiteName'], 'Question');
						return;
					}
				}
			
				// Check the fuel value.
				self.Continue();
			}
			else{
				// Contine the process.
				self.Continue();
			}
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==============================================
	// Contine process.
	//==============================================
	this.Continue = function(){
		try{
			// Store the form values.
			Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_Mileage', 0);
			Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_Hours', Number(self.txtHours.value));
			Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_Fuel', 0);
			Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_MileageType', 4);

			// Load the sections.
			Functions.LoadControl(window['SiteIndex'] + '/Sections', Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'JobDataItem']));
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

Login.prototype = new Base;
Login.prototype.constructor = Login;

//==================================================
// Login class.
//==================================================
function Login(){
    var self = this;
    this.Name = 'Login';
    this.Xslt = 'Xslt/SafetyCheck/Login.xslt';
	this.StoreUserList = false;

	//==============================================
    // Init event handler.
    //==============================================
	this.Init = function(){
		try{
			this.SetBranding();
			Functions.LoadControl('Login');
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
    // Load event handler.
    //==============================================
    this.Loaded = function(Callback){
        try{
			this.SetBranding();

			Functions.BackButtonHandler(undefined, true);

			// Reset variables.
			Functions.SetSessionItem('CurrentControl', null);
			Functions.ResetVariables();

			// Check if the device has a camera.
			Functions.HasCamera(self.HasCamera);

			// Display the main body container.
			document.getElementById('BodyContainer').className = '';

			// Get the current position of the device.
			Functions.GetCurrentPosition();

			// Check if a callback has been defined.
			if (Callback)
				Callback();
        }
        catch (exc){
            self.OnError(exc);
        }
    }
	
    //==============================================
    // Has camera handler.
    //==============================================
	this.HasCamera = function(){
		try{
			// Check if the device has a camera, if so, enable the QR code button.
			if (document.getElementById('btnQRCodeLogin'))
				document.getElementById('btnQRCodeLogin').className = (window['HasCamera']) ? '' : 'Hide';
		}
        catch (exc){
            self.OnError(exc);
        }
	}
    
    //==============================================
    // Change company prompt handler.
    //==============================================
    this.ChangeCompany = function(){
        try{
            self.winCompanySelect.Close();
            Functions.LoadControl('CompanySelection');
        }
        catch (exc){
            self.OnError(exc);
        }
    }
    
    //==============================================
    // Soap test completed handler.
    //==============================================
    this.SoapTest_Completed = function(Response, Object){
        try{
            Functions.Decompress(Response[0], self.Decompress_Completed);
        }
        catch (exc){
            self.OnError(exc);
        }
    }
    
    //==============================================
    // Login scan completed handler.
    //==============================================
    this.LoginScanSuccess = function(Result){
        try{
			// Check if a result was returned.
            if (Result != ''){
                var aResult = Result.split('|');

				// Check if the QRcode is for a user.
				if (aResult[0] == 'User'){
					// Login has been successful, store the user details and continue to the next process
					self.LoginSuccessContinue(Number(aResult[1]), aResult[2], '');
				}
				else{
					var objControls = new Object();
					objControls.btnTryAgain = document.createElement('BUTTON');
					objControls.btnTryAgain.setAttribute('type', 'button');
					objControls.btnTryAgain.innerHTML = 'Try Again';
					objControls.btnTryAgain.IsDefault = true;
					objControls.btnTryAgain.onclick = function(){
						self.winScanMessage.Close();
						Functions.Scan(self.LoginScanSuccess);
					};

					objControls.btnCancel = document.createElement('BUTTON');
					objControls.btnCancel.setAttribute('type', 'button');
					objControls.btnCancel.innerHTML = 'Cancel';

					self.winScanMessage = new Message().Prompt('The QR code you have scanned is not for a user.', objControls, window['SiteName'], 'Question');
				}
            }
        }
        catch (exc){
            self.OnError(exc);
        }
    }

	//==============================================
    // Login has been successful, store the user details and continue to the next process.
    //==============================================
	this.LoginSuccessContinue = function(UserID, Name, Permissions){
		try{
			// Store the user details.
			Functions.SetSessionItem('XUserID', UserID);
			Functions.SetSessionItem('Name', Name);
			Functions.SetSessionItem('Permissions', Permissions);

			// Set application flow control settings.
			Functions.SetUserItem('AllOK', ((Functions.GetUserItem('AllOK') == '') ? 'On' : Functions.GetUserItem('AllOK')));
			Functions.SetUserItem('AllComplete', ((Functions.GetUserItem('AllComplete') == '') ? 'On' : Functions.GetUserItem('AllComplete')));
			Functions.SetUserItem('AnswerSelected', ((Functions.GetUserItem('AnswerSelected') == '') ? 'On' : Functions.GetUserItem('AnswerSelected')));
			Functions.SetUserItem('RectificationSelected', ((Functions.GetUserItem('RectificationSelected') == '') ? 'On' : Functions.GetUserItem('RectificationSelected')));

			// Load the job selection.
			Functions.LoadControl(window['SiteIndex'] + '/JobSelection');
		}
        catch (exc){
            self.OnError(exc);
        }
	}
    
    //==============================================
    // User list data loaded handler.
    //==============================================
    this.UserList_Loaded = function(Data){
        try{
            // Get the users for the company.
			if (Data){
				self.StoreUserList = false;
				self.UserList_Completed(Data);
			}
			else{
				self.StoreUserList = (window['Platform'] == 'Desktop') ? false : true;

				var soapClient = new SoapClient(self.WebServiceURL, 'UserList', self.UserList_Completed, undefined, 'Downloading driver list' + Functions.NetworkMessage() + ', please wait...');
				soapClient.AddParameter('CompanyID', Functions.GetItem('CompanyID'));
				soapClient.Send();
			}

			Functions.BackButtonHandler(self.btnCancelLogin_Click);
        }
        catch (exc){
            self.OnError(exc);
        }
    }
	
    //==============================================
    // User list completed handler.
    //==============================================
	this.UserList_Completed = function(Response, Object){
		try{
			// Check if an error occured.
			if (Response[0] != 'ERROR'){
				// Store the data.
				if (self.StoreUserList)
					Functions.StoreData('UserList', Response[1]);
			}

			// Load the user list.
			self.UserListRS = new Recordset();
			self.UserListRS.LoadXML(Response[1], 'Users');

			// Render the data.
			new Transform().Render(document.getElementById('MainContainer'), Response[1], self.Xslt + '?Action=UserList&UserID=' + Number(Functions.GetItem('LastLoginID')), undefined, self.UserListXSLT_Completed, true);
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
    // User list XSLT completed handler.
    //==============================================
	this.UserListXSLT_Completed = function(){
		try{
			// Get form elements.
			self.lstUserList = document.getElementById('lstUserList');
			self.txtPinCode = document.getElementById('txtPinCode');

			// Focus the PIN code.
			if (self.txtPinCode)
				self.txtPinCode.focus();
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
    // User listbox onchange event handler.
    //==============================================
	this.lstUserList_OnChange = function(){
		try{
			document.getElementById('txtPinCode').focus();
		}
        catch (exc){
            self.OnError(exc);
        }
	}
	
	//==============================================
    // Login textbox keypress event handler.
    //==============================================
	this.txtLogin_KeyPress = function(evt){
		try{
			var objSourceElement = evt.srcElement ? evt.srcElement : evt.target;
			var intKeyCode = evt.keyCode ? evt.keyCode : evt.which;

			// Check the keycode.
			if (intKeyCode == 13)
			{
				window.setTimeout(function(){ self.btnLoginValidate_Click(); }, 0);
			
				if (evt.preventDefault)
					evt.returnValue = false;

				return false;
			}
		}
        catch (exc){
            self.OnError(exc);
        }
	}
	
    //==============================================
    // Login validate button click event handler.
    //==============================================
	this.btnLoginValidate_Click = function(){
		try{
			// Check if the user has entered a PIN code.
			if (self.txtPinCode.value.length < 4){
				self.txtPinCode.value = '';
				self.winPINRequired = new Message().SimplePrompt('Please enter your PIN number.', function(){
					self.txtPinCode.focus();
					self.winPINRequired.Close();
				}, 'Information');
				return;
			}
			
			// Validate the users PIN number.
			var objDataRows = self.UserListRS.Select('[XUserID]=' + self.lstUserList.options[self.lstUserList.selectedIndex].value + ' AND [Passcode]=\'' + self.txtPinCode.value + '\'');
			if (objDataRows.length == 1){
				// Store the ID so it can be used to select the correct option from the user listbox.
				Functions.SetItem('LastLoginID', Number(objDataRows[0]['XUserID'].Value));

				// Login has been successful, store the user details and continue to the next process
				self.LoginSuccessContinue(Number(objDataRows[0]['XUserID'].Value), objDataRows[0]['Name'].Value, objDataRows[0]['Permissions'].Value);
			}
			else{
				// Blank the PIN number textbox value.
				self.txtPinCode.value = '';

				// Display a message to the user.
				self.winPINRequired = new Message().SimplePrompt('You have entered an incorrect PIN.', function(){
					self.txtPinCode.focus();
					self.winPINRequired.Close();
				}, 'Error');
			}

		}
        catch (exc){
            self.OnError(exc);
        }
	}
	
    //==============================================
    // Login cancel button click event handler.
    //==============================================
	this.btnCancelLogin_Click = function(){
		try{
			Functions.RemoveBackButtonHandler();
			Functions.LoadControl(window['SiteIndex'] + '/Login');
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
	// QR code login button click event handler.
	//==============================================
	this.btnQRCodeLogin_Click = function(){
		try{
			Functions.Scan(self.LoginScanSuccess);
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// Pin code login button click event handler.
	//==============================================
	this.btnPinCodeLogin_Click = function(){
		try{
			// Check if a company has been selected.
			if (Functions.GetItem('CompanyID') == ''){
				var objControls = new Object();
				objControls.btnYes = document.createElement('BUTTON');
				objControls.btnYes.setAttribute('type', 'button');
				objControls.btnYes.innerHTML = 'Yes';
				objControls.btnYes.IsDefault = true;
				objControls.btnYes.onclick = function(){ Login.ChangeCompany(); };

				objControls.btnNo = document.createElement('BUTTON');
				objControls.btnNo.setAttribute('type', 'button');
				objControls.btnNo.innerHTML = 'No';

				self.winCompanySelect = new Message().Prompt('You need to select your company first, would you like to do that now?', objControls, window['SiteName'], 'Question');
				return;
			}

			// Check the company ID.
			if (Number(Functions.GetItem('CompanyID')) > 0){
				// Check the network connection.
				if (Functions.CheckConnection() == undefined){
					Functions.GetData('UserList', self.UserList_Loaded);
				}
				else{
					self.UserList_Loaded();
				}
			}
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// Change company button click event handler.
	//==============================================
	this.btnChangeCompany_Click = function(){
		try{
			Functions.LoadControl('CompanySelection');
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

﻿DailySafetyCheck_Vehicle.prototype = new Base;
DailySafetyCheck_Vehicle.prototype.constructor = DailySafetyCheck_Vehicle;

//==================================================
// Daily safety check - vehicle class.
//==================================================
function DailySafetyCheck_Vehicle(){
    var self = this;
    this.Name = 'DailySafetyCheck_Vehicle';

	//==============================================
    // Load event handler.
    //==============================================
    this.Loaded = function(){
        try{
			this.SessionManager();

			// Remove the section, question and answer scrollbar position.
			Functions.DeleteSessionItem('Section_ScrollTop');
			Functions.DeleteSessionItem('Question_ScrollTop');
			Functions.DeleteSessionItem('Answer_ScrollTop');

			// Update the registration number.
			document.getElementById('lblRegistrationNumber').innerHTML = Functions.GetSessionItem('RegistrationNumber');

			// Get form elements.
			self.MileageContainer = document.getElementById('MileageContainer');
			self.txtMileage = document.getElementById('txtMileage');
			self.btnMiles = document.getElementById('btnMiles');
			self.btnKMS = document.getElementById('btnKMS');
			self.FuelContainer = document.getElementById('FuelContainer');
			self.txtFuel = document.getElementById('txtFuel');
			self.ValidateMileageValue = true;
			self.ValidateFuelValue = true;

			// Get the vehicle's mileage value, if it's empty, set it to zero.
			if (Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_Mileage', true) == '')
				Functions.SetItem(Functions.GetSessionItem('VehicleID') + '_Mileage', 0);

			// Get the vehicle's fuel value, if it's empty, set it to zero.
			if (Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_Fuel', true) == '')
				Functions.SetItem(Functions.GetSessionItem('VehicleID') + '_Fuel', 0);

			// Get the vehicle's mileage type, if it's empty, set it to miles (1 = Miles, 2 = Kilometers, 4 = hours).
			if (Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_MileageType', true) == '')
				Functions.SetItem(Functions.GetSessionItem('VehicleID') + '_MileageType', 1);

			// Set the mileage and fuel textbox values.
			self.txtMileage.value = Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_Mileage');
			self.txtFuel.value = Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_Fuel');
			self.MileageType = Number((Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_MileageType') == '') ? Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_MileageType') : Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_MileageType'));

			// Check the value, if zero, check session storage.
			if (self.txtMileage.value == '0')
				self.txtMileage.value = Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_Mileage');

			// Check the value, if zero, check session storage.
			if (self.txtFuel.value == '0')
				self.txtFuel.value = Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_Fuel');

			// Store the original mileage value and type.
			self.OriginalMileage = Number(self.txtMileage.value);
			self.OriginalMileageType = Number(self.MileageType);


			// Check the mileage type.
			switch (self.MileageType){
				case 1:
					self.btnMiles_Click();
					break;

				case 2:
					self.btnKMS_Click();
					break;
			}

			// Check the mileage textbox value before moving focus to it, if it's zero, empty the content.
			if (Number(self.txtMileage.value) == 0)
				self.txtMileage.value = '';

			// Focus the mileage textbox.
			if ((window['Platform'] == 'Desktop') || (window['Platform'] == 'DesktopApplication'))
				self.txtMileage.focus();

			// Check the TM apply to type ID to determine whether the fuel detail is required.
			if ((Functions.GetSessionItem('TMApplyToTypeID') == 3) || (Functions.GetSessionItem('TMApplyToTypeID') == 4) || (Functions.GetSessionItem('TMApplyToTypeID') == 7) || (Functions.GetSessionItem('TMApplyToTypeID') == 13)){
				self.FuelContainer.className = "Hide";
				self.ValidateFuelValue = false;
			}
        }
        catch (exc){
            self.OnError(exc);
        }
    }

    //==============================================
    // Mileage textbox keypress event handler.
    //==============================================
	this.txtMileage_KeyPress = function(evt){
		try{
			Functions.NumericOnly(evt, self.btnContinue_Click, false, false);
		}
        catch (exc){
            self.OnError(exc);
        }
	}
	
    //==============================================
    // Mileage textbox blur event handler.
    //==============================================
	this.txtMileage_Blur = function(){
		try{
			self.txtMileage.value = (self.txtMileage.value == '') ? 0 : self.txtMileage.value;
		}
        catch (exc){
            self.OnError(exc);
        }
	}

    //==============================================
    // Fuel texbox keypress event handler.
    //==============================================
	this.txtFuel_KeyPress = function(evt){
		try{
			Functions.NumericOnly(evt, self.btnContinue_Click, false, false);
		}
        catch (exc){
            self.OnError(exc);
        }
	}
	
    //==============================================
    // Fuel textbox blur event handler.
    //==============================================
	this.txtFuel_Blur = function(){
		try{
			self.txtFuel.value = (self.txtFuel.value == '') ? 0 : self.txtFuel.value;
		}
        catch (exc){
            self.OnError(exc);
        }
	}

    //==============================================
    // Miles button click event handler.
    //==============================================
	this.btnMiles_Click = function(){
		try{
			self.btnMiles.className = 'Orange';
			self.btnKMS.className = 'Grey';

			// Check the current mileage type.
			if (self.MileageType != 1){
				self.txtMileage.value = Functions.RoundNumber(Number(self.txtMileage.value / 1.609344), 0);
			}

			self.MileageType = 1;
		}
        catch (exc){
            self.OnError(exc);
        }
	}

    //==============================================
    // KMS button click event handler.
    //==============================================
	this.btnKMS_Click = function(){
		try{
			self.btnMiles.className = 'Grey';
			self.btnKMS.className = 'Orange';

			// Check the current mileage type.
			if (self.MileageType != 2){
				self.txtMileage.value = Functions.RoundNumber(Number(self.txtMileage.value * 1.609344), 0);
			}

			self.MileageType = 2;
		}
        catch (exc){
            self.OnError(exc);
        }
	}
	
	//==============================================
	// Return whether the mileage has been changed.
	//==============================================
	this.MileageChanged = function(){
		try{
			var intCurrentMileageValue = Number(self.txtMileage.value);

			// Check the mileage type.
			if (self.MileageType != self.OriginalMileageType)
			{
				// Convert the mileage value.
				switch (self.OriginalMileageType)
				{
					case 1:
						// Convert to miles.
						intCurrentMileageValue = Functions.RoundNumber(Number(intCurrentMileageValue / 1.609344), 0);
						break;
						
					case 2:
						// Convert to kilometers.
						intCurrentMileageValue = Functions.RoundNumber(Number(intCurrentMileageValue * 1.609344), 0);
						break;
				}
			}

			// Check if the mileage value has been changed.
			if (Number(intCurrentMileageValue) < Number(self.OriginalMileage)){
				return 'Less';
			}
			else{
				if (Number(intCurrentMileageValue) == Number(self.OriginalMileage))
					return 'Same';
			}
		}
        catch (exc){
            self.OnError(exc);
        }
		return 'Greater';
	}

	//==============================================
	// Continue button click event handler.
	//==============================================
	this.btnContinue_Click = function(){
		try{
			if (Functions.GetSessionItem('HeaderControlValidate') == 'true'){
				// Check if the user has entered the mileage.
				if (Number(self.txtMileage.value) == 0){
					self.winMessage = new Message().SimplePrompt('Please enter the current mileage.', function(){
						self.txtMileage.value = '';
						self.txtMileage.focus();
						self.winMessage.Close();
					}, 'Information');
					return;
				}

				// Check if the mileage has been changed.
				if (self.ValidateMileageValue){
					var strMessage = '';
					switch (self.MileageChanged()){
						case 'Less':
							strMessage = 'The mileage value you have entered is less than previously recorded';
							break;

						case 'Same':
							strMessage = 'The mileage value you have entered is the same as previously recorded';
							break;
					}
			
					// Check the message.
					if (strMessage != ''){
						var objControls = new Object();
						objControls.btnYes = document.createElement('BUTTON');
						objControls.btnYes.setAttribute('type', 'button');
						objControls.btnYes.innerHTML = 'Yes';
						objControls.btnYes.IsDefault = true;
						objControls.btnYes.onclick = function(){
							self.ValidateMileageValue = false;
							self.winMessage.Close();
							self.CheckFuelValue();
						};

						objControls.btnNo = document.createElement('BUTTON');
						objControls.btnNo.setAttribute('type', 'button');
						objControls.btnNo.innerHTML = 'No';
						objControls.btnNo.onclick = function(){
							self.winMessage.Close();
							self.txtMileage.value = '';
							self.txtMileage.focus();
						};

						self.winMessage = new Message().Prompt(strMessage + '. Are you sure that you want to continue with this value?', objControls, window['SiteName'], 'Question');
						return;
					}
				}
			
				// Check the fuel value.
				self.CheckFuelValue();
			}
			else{
				// Contine the process.
				self.Continue();
			}
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// Check the fuel value.
	//==============================================
	this.CheckFuelValue = function(){
		try{
			// Check if the fuel should be validated.
			if (self.ValidateFuelValue){
				// Check if the user has entered the fuel.
				if (self.txtFuel){
					if (Number(self.txtFuel.value) == 0){
						var objControls = new Object();
						objControls.btnYes = document.createElement('BUTTON');
						objControls.btnYes.setAttribute('type', 'button');
						objControls.btnYes.innerHTML = 'Yes';
						objControls.btnYes.IsDefault = true;
						objControls.btnYes.onclick = function(){
							self.txtFuel.value = '';
							self.txtFuel.focus();
							self.winMessage.Close();
						};

						objControls.btnNo = document.createElement('BUTTON');
						objControls.btnNo.setAttribute('type', 'button');
						objControls.btnNo.innerHTML = 'No';
						objControls.btnNo.onclick = function(){
							self.winMessage.Close();
							self.ValidateFuelValue = false;
							self.Continue();
						};

						self.winMessage = new Message().Prompt('You haven\'t entered the current fuel level, would you like to do that now?', objControls, window['SiteName'], 'Question');
						return;
					}
				}
			}

			// Contine the process.
			self.Continue();
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==============================================
	// Contine process.
	//==============================================
	this.Continue = function(){
		try{
			// Store the form values.
			Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_Mileage', Number(self.txtMileage.value));
			Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_Hours', 0);
			Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_Fuel', Number(self.txtFuel.value));
			Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_MileageType', self.MileageType);

			// Load the sections.
			Functions.LoadControl(window['SiteIndex'] + '/Sections', Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'JobDataItem']));
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

﻿VehicleSelection.prototype = new Base;
VehicleSelection.prototype.constructor = VehicleSelection;

//==================================================
// Vehicle selection class.
//==================================================
function VehicleSelection(){
    var self = this;
    this.Name = 'VehicleSelection';
    this.Xslt = 'Xslt/SafetyCheck/VehicleSelection.xslt';
    
    //==============================================
    // Load event handler.
    //==============================================
    this.Loaded = function(){
        try{
			this.SessionManager();

			Functions.BackButtonHandler(self.btnCancel_Click, true);

            // Get form elements.
            self.txtRegistrationNumber = document.getElementById('txtRegistrationNumber');
			self.btnSearch = document.getElementById('btnSearch');
			self.txtRegistrationNumber.focus();
        }
        catch (exc){
            self.OnError(exc);
        }
    }
    
    //==============================================
    // Registration number focus handler.
    //==============================================
    this.Registration_Focus = function(){
        try{
            self.winRegistrationNumber.Close();
            self.txtRegistrationNumber.focus();
        }
        catch (exc){
            self.OnError(exc);
        }
    }
	
    //==============================================
    // Registration number keypress event handler.
    //==============================================
	this.txtRegistrationNumber_KeyPress = function(evt){
		try{
			var objSourceElement = evt.srcElement ? evt.srcElement : evt.target;
			var intKeyCode = evt.keyCode ? evt.keyCode : evt.which;

			// Check the keycode.
			if (intKeyCode == 13)
			{
				window.setTimeout(function(){ self.btnSearch_Click(); }, 0);
			
				if (evt.preventDefault)
					evt.returnValue = false;

				return false;
			}
		}
        catch (exc){
            self.OnError(exc);
        }
	}
    
    //==============================================
    // Vehicle search soap completed handler.
    //==============================================
    this.VehicleSearch_Completed = function(Response, Object){
        try{
			// Check if an error occured.
			if (Response[0] == 'ERROR'){
				return;
			}

			// Render the data.
            new Transform().Render(document.getElementById('MainContainer'), Response[1], self.Xslt + '?Action=DisplayData', undefined, self.VehicleSearchXSLT_Completed, true);
        }
        catch (exc){
            self.OnError(exc);
        }
    }
    
    //==============================================
    // Vehicles search result XLST completed handler.
    //==============================================
    this.VehicleSearchXSLT_Completed = function VehicleSearchXSLT_Completed(){
        try{
            Functions.EnableScroll('VehicleResults');
			Functions.BackButtonHandler(self.btnCancelResults_Click);
        }
        catch (exc){
            self.OnError(exc);
        }
    }
    
    //==============================================
    // Vehicle button click event handler.
    //==============================================
    this.btnVehicleSelection_Click = function(VehicleID, RegistrationNumber, TMApplyToTypeID, TemplateID){
        try{
			// Store the vehicle details.
			Functions.SetSessionItem('VehicleID', VehicleID);
			Functions.SetSessionItem('RegistrationNumber', RegistrationNumber);
			Functions.SetSessionItem('TMApplyToTypeID', TMApplyToTypeID);
			Functions.SetSessionItem('TemplateID', TemplateID);

			// Load the header control.
			Functions.LoadControl(window['SiteIndex'] + '/Header');
        }
        catch (exc){
            self.OnError(exc);
        }
    }

	//==============================================
	// Search button click event handler.
	//==============================================
	this.btnSearch_Click = function(){
		try{
			// Check the company name value.
			if (this.txtRegistrationNumber.value.length < 3){
				var objControls = new Object();
				objControls.btnOK = document.createElement('BUTTON');
				objControls.btnOK.setAttribute('type', 'button');
				objControls.btnOK.innerHTML = 'OK';
				objControls.btnOK.IsDefault = true;
				objControls.btnOK.onclick = function(){ VehicleSelection.Registration_Focus(); };

				self.winRegistrationNumber = new Message().Prompt('Please enter at least the first three characters of a vehicle or asset.', objControls, window['SiteName'], 'Question');
				return;
			}

			self.btnSearch.focus();
			Functions.BackButtonHandler(self.btnCancelResults_Click);
        
			// Get a list of matching vehicles.
			var soapClient = new SoapClient(self.WebServiceURL, 'VehicleSearch', self.VehicleSearch_Completed, undefined, 'Searching vehicles and assets' + Functions.NetworkMessage() + ', please wait...');
			soapClient.AddParameter('UserID', Functions.GetSessionItem('XUserID'));
			soapClient.AddParameter('RegistrationNumber', self.txtRegistrationNumber.value.toUpperCase());
			soapClient.Send();
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// Cancel button click event handler.
	//==============================================
	this.btnCancel_Click = function(){
		try{
			Functions.RemoveBackButtonHandler();
			Functions.LoadControl(window['SiteIndex'] + '/JobSelection');
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// Cancel search results button click event handler.
	//==============================================
	this.btnCancelResults_Click = function(){
		try{
			Functions.RemoveBackButtonHandler();
			Functions.LoadControl(window['SiteIndex'] + '/VehicleSelection');
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

﻿Rectifications.prototype = new Base;
Rectifications.prototype.constructor = Rectifications;

//==================================================
// Rectifications.
//==================================================
function Rectifications(){
    var self = this;
    this.Name = 'Rectifications';
    this.Xslt = 'Xslt/SafetyCheck/Rectifications.xslt';

	//==============================================
    // Load event handler.
    //==============================================
    this.Loaded = function(){
        try{
			this.SessionManager();

			var objRectificationDRs = window['RectificationRS'].Select('[AnswerID]=' + Functions.GetSessionItem('AnswerID'));

			if (objRectificationDRs.length > 0){
				// Check the control.
				if ((document.getElementById('scroller').innerHTML == '') && (window['Platform'] != 'Tablet')){
					Functions.LoadControl(window['SiteIndex'] + '/Rectifications', Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'Rectification', 'JobDataItem']), '?QuestionID=' + Functions.GetSessionItem('Rectification_QuestionID') + '&AnswerID=' + Functions.GetSessionItem('AnswerID') + '&Code=' + Functions.GetSessionItem('Code'));
					return;
				}
			}

			Functions.BackButtonHandler(self.btnBack_Click, true);
			
			// Format the title.
			Functions.FormatTitle();

			// Check if the job sheet recordsets exist.
			Functions.CheckJobSheetRecordsets();

			// Get form elements.
			self.DataContainer = document.getElementById('DataContainer');

			// Render the data.
			self.DataXSLT_Completed();
        }
        catch (exc){
            self.OnError(exc);
        }
    }

	//==============================================
    // Data XSLT transform completed handler.
    //==============================================
	this.DataXSLT_Completed = function(){
		try{
			Functions.EnableScroll('DataContainer');
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
    // Delete answer button click event handler.
    //==============================================
	this.btnDelete_Click = function(){
		try{
			var AnswerDRs = window['AnswerRS'].Select('[AnswerID]=' + Functions.GetSessionItem('AnswerID'));

			if (AnswerDRs.length == 1){
				var objControls = new Object();
				objControls.btnYes = document.createElement('BUTTON');
				objControls.btnYes.setAttribute('type', 'button');
				objControls.btnYes.innerHTML = 'Yes';
				objControls.btnYes.IsDefault = true;
				objControls.btnYes.onclick = function(){
					self.winMessage.Close();
					window['JobDataItemRS'].DeleteRows('[AnswerID]=' + Functions.GetSessionItem('AnswerID'));
					self.btnBack_Click();
				};

				objControls.btnNo = document.createElement('BUTTON');
				objControls.btnNo.setAttribute('type', 'button');
				objControls.btnNo.innerHTML = 'No';

				self.winMessage = new Message().Prompt('Are you sure that you want to delete the ' + ((AnswerDRs[0]['Code'].Value == 'NONS') ? 'fault' : 'advisory') + ' \'' + AnswerDRs[0]['AnswerText'].Value + '\'?', objControls, window['SiteName'], 'Question');
			}
		}
        catch (exc){
            self.OnError(exc);
        }
	}

    //==============================================
    // Rectification button click event handler.
    //==============================================
	this.btnRectification_Click = function(RectificationID){
		try{
			// Get the job data item record for the answer.
			var objJobDataItemDRs = window['JobDataItemRS'].Select('[SectionID]=' + Functions.GetSessionItem('SectionID') + ' AND [QuestionID]=' + Functions.GetSessionItem('QuestionID') + ' AND [AnswerID]=' + Functions.GetSessionItem('AnswerID'));

			if (objJobDataItemDRs.length == 1){
				objJobDataItemDRs[0]['RectificationID'].Value = RectificationID;
			}

			// Store the job data item recordset.
			Functions.SetSessionItem('JobDataItemRS', window['JobDataItemRS'].toString());

			// Check the 'Rectification selected' user setting.
			if (Functions.GetUserItem('RectificationSelected') == 'On'){
				self.btnBack_Click();
			}
			else{
				// Render the data.
				new Transform().Render(self.DataContainer, Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'Rectification', 'JobDataItem']), self.Xslt + '?Action=RectificationList&AnswerID=' + Functions.GetSessionItem('AnswerID') + '&Code=' + Functions.GetSessionItem('Code'), undefined, self.DataXSLT_Completed, true);
			}
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
	// Free text button click event handler.
	//==============================================
	this.btnFreeText_Click = function(QuestionID, AnswerID){
		try{
			self.FreeTextElement = document.getElementById('FreeText_' + AnswerID);
			self.lblImage = document.getElementById('lblImage_' + AnswerID);

			// Get the job data item record for the answer.
			self.JobDataItemDRs = window['JobDataItemRS'].Select('[SectionID]=' + Functions.GetSessionItem('SectionID') + ' AND [QuestionID]=' + Functions.GetSessionItem('QuestionID') + ' AND [AnswerID]=' + Functions.GetSessionItem('AnswerID'));

			if (self.JobDataItemDRs.length == 1){
				Functions.btnFreeText_Click(self.JobDataItemDRs[0], self.FreeTextLoaded, self.btnFreeText_OK, self.btnImageCapture_OK);
			}
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
	// Free text popup window loaded handler.
	//==============================================
	this.FreeTextLoaded = function(){
		try{
			// Get form elements.
			self.txtFreeText = document.getElementById('txtFreeText');
			self.btnViewImage = document.getElementById('btnViewPhoto');

			if (self.btnViewImage)
				self.btnViewImage.className = (self.JobDataItemDRs[0]['ImageData'].Value.length == 0) ? 'Hide' : '';

			// Set focus to the textbox.
			self.txtFreeText.focus();
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
	// Free text popup window OK button click event handler.
	//==============================================
	this.btnFreeText_OK = function(){
		try{
			// Check if a image exists.
			if (self.lblImage){
				if (self.JobDataItemDRs[0]['ImageData'].Value.length > 0)
					self.lblImage.innerHTML = ' (Contains a Photo)';
			}

			// Check if any free text was entered.
			if (self.txtFreeText.value != ''){
				self.FreeTextElement.innerHTML = self.txtFreeText.value;
				self.JobDataItemDRs[0]['FreeText'].Value = self.txtFreeText.value;

				// Store the job data item recordset.
				Functions.SetSessionItem('JobDataItemRS', window['JobDataItemRS'].toString());
			}
		}
        catch (exc){
            self.OnError(exc);
        }
	}
    
	//==============================================
	// Free text popup window image capture success handler.
	//==============================================
    this.btnImageCapture_OK = function(imageData){
        try{
			// Check if there is any image data.
			if (imageData.length == 0){
				new Message().Alert('Unfortunately there was an error retrieving the image data.');
				return;
			}

			self.JobDataItemDRs[0]['ImageData'].Value = imageData;

			// Show the view photo button.
			self.btnViewImage.className = '';

			// Store the job data item recordset.
			Functions.SetSessionItem('JobDataItemRS', window['JobDataItemRS'].toString());
        }
        catch (exc){
            self.OnError(exc);
        }
    }

	//==============================================
	// Send button click event handler.
	//==============================================
	this.btnBack_Click = function(){
		try{
			Functions.RemoveBackButtonHandler();
			Functions.LoadControl(window['SiteIndex'] + '/Answers', Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'Rectification', 'JobDataItem']), '?SectionID=' + Functions.GetSessionItem('SectionID') + '&QuestionID=' + Functions.GetSessionItem('QuestionID') + '&InheritedID=' + Functions.GetSessionItem('InheritedID') + '&PointerQuestionID=' + Functions.GetSessionItem('PointerQuestionID'));
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

﻿Sections.prototype = new Base;
Sections.prototype.constructor = Sections;

//==================================================
// Sections.
//==================================================
function Sections(){
    var self = this;
    this.Name = 'Sections';
    this.Xslt = 'Xslt/SafetyCheck/Sections.xslt';

	//==============================================
    // Load event handler.
    //==============================================
    this.Loaded = function(){
        try{
			this.SessionManager();

			// Check the control.
			if ((document.getElementById('scroller').innerHTML == '') && (window['Platform'] != 'Tablet')){
				Functions.LoadControl(window['SiteIndex'] + '/Sections', Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'JobDataItem']));
				return;
			}

			Functions.BackButtonHandler(self.btnBack_Click, true);

			self.SafeToDrive = true;
			self.PromptForSafeToDriveOnNONS = true;
			
			// Format the title.
			Functions.FormatTitle();

			// Remove the question and answer scrollbar position.
			Functions.DeleteSessionItem('Question_ScrollTop');
			Functions.DeleteSessionItem('Answer_ScrollTop');

			// Get form elements.
			self.DataContainer = document.getElementById('DataContainer');
			self.btnSend = document.getElementById('btnSend');

//			self.btnSend.disabled = true;
//			self.btnSend.className = 'DisabledButton';

			// Check if the job sheet recordsets exist.
			Functions.CheckJobSheetRecordsets();

			// Render the data.
			self.DataXSLT_Completed();
        }
        catch (exc){
            self.OnError(exc);
        }
    }

	//==============================================
    // Data XSLT transform completed handler.
    //==============================================
	this.DataXSLT_Completed = function(){
		try{
			Functions.EnableScroll('DataContainer');

			// Get the position of the scrollbar.
			Functions.SetScrollbarPosition(self.Name, self.DataContainer);

			window.setTimeout(function(){
				self.intQuestionCount = 0;
				self.intQuestionsAnswered = 0;

				// Work out the number of questions and the number of answered questions.
				if (window['SectionRS']){
					window['SectionRS'].MoveFirst();
					do{
						var objCompletedCount = document.getElementById('Completed_' + window['SectionRS']['SectionID'].Value);
						var objQuestionDRs = window['QuestionRS'].Select('[SectionID]=' + window['SectionRS']['SectionID'].Value);
						var intQuestionAnswerCount = 0;

						self.intQuestionCount += objQuestionDRs.length;

						for(Row in objQuestionDRs){
							var objJobDataItemDRs = window['JobDataItemRS'].Select('[SectionID]=' + window['SectionRS']['SectionID'].Value + ' AND [QuestionID]=' + objQuestionDRs[Row]['QuestionID'].Value);
							if (objJobDataItemDRs.length > 0)
								intQuestionAnswerCount++
						}

						self.intQuestionsAnswered += intQuestionAnswerCount;
						objCompletedCount.innerHTML = intQuestionAnswerCount + ' of ' + objQuestionDRs.length;
						objCompletedCount.className = '';
					}while(window['SectionRS'].MoveNext())
				}

//				// Check if all the questions have been answered.
//				if ((self.intQuestionsAnswered == self.intQuestionCount)){
//					self.btnSend.disabled = false;
//					self.btnSend.className = '';
//				}
			}, 0);
		}
        catch (exc){
            self.OnError(exc);
        }
	}

    //==============================================
    // Section button click event handler.
    //==============================================
	this.btnSection_Click = function(SectionID){
		try{
			// Check the platform.
			if (!window['HasCamera']){
				self.SectionSuccessContinue(SectionID);
				return;
			}

			// Check if the user is allowed to bypass the scanning of the QR code.
			if (Functions.HasPermission(156)){
				self.SectionSuccessContinue(SectionID);
			}
			else{
				// Invoke the scanner to check the SectionID.
				if (Functions.GetSessionItem('Section_' + SectionID) == ''){
					self.SectionID = Number(SectionID);
					Functions.Scan(self.SectionScanSuccess);
				}
				else{
					self.SectionSuccessContinue(SectionID);
				}
			}
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
	// Section scan completed handler.
	//==============================================
	this.SectionScanSuccess = function(Result){
		try{
			// Check if a result was returned.
            if (Result != ''){
                var aResult = Result.split('|');

				// Check if the QRcode is for a vehicle.
				if (aResult[0] == 'Section'){
					// Check the section ID.
					if (Number(aResult[1]) == self.SectionID){
						Functions.SetSessionItem('Section_' + Number(aResult[1]), 'Checked');
						self.SectionSuccessContinue(Number(aResult[1]));
					}
					else{
						var objControls = new Object();
						objControls.btnTryAgain = document.createElement('BUTTON');
						objControls.btnTryAgain.setAttribute('type', 'button');
						objControls.btnTryAgain.innerHTML = 'Try Again';
						objControls.btnTryAgain.IsDefault = true;
						objControls.btnTryAgain.onclick = function(){
							self.winScanMessage.Close();
							Functions.Scan(self.SectionScanSuccess);
						};

						objControls.btnCancel = document.createElement('BUTTON');
						objControls.btnCancel.setAttribute('type', 'button');
						objControls.btnCancel.innerHTML = 'Cancel';

						self.winScanMessage = new Message().Prompt('The QR code you have scanned is for \'' + aResult[2] + '\' and not selected section.', objControls, window['SiteName'], 'Question');
					}
				}
				else{
					var objControls = new Object();
					objControls.btnTryAgain = document.createElement('BUTTON');
					objControls.btnTryAgain.setAttribute('type', 'button');
					objControls.btnTryAgain.innerHTML = 'Try Again';
					objControls.btnTryAgain.IsDefault = true;
					objControls.btnTryAgain.onclick = function(){
						self.winScanMessage.Close();
						Functions.Scan(self.SectionScanSuccess);
					};

					objControls.btnCancel = document.createElement('BUTTON');
					objControls.btnCancel.setAttribute('type', 'button');
					objControls.btnCancel.innerHTML = 'Cancel';

					self.winScanMessage = new Message().Prompt('The QR code you have scanned is not for a section.', objControls, window['SiteName'], 'Question');
				}
            }
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
	// Section selection has been successful, store the section details and continue to the next process.
	//==============================================
	this.SectionSuccessContinue = function(SectionID){
		try{
			// Get the position of the scrollbar.
			Functions.GetScrollbarPosition(self.Name, self.DataContainer);

			// Store the section ID.
			Functions.SetSessionItem('SectionID', SectionID);

			// Set the check all completed state for the question control.
			Functions.SetSessionItem('QuestionCheckAllCompleted', false);

			// Load the questions.
			Functions.LoadControl(window['SiteIndex'] + '/Questions', Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'Rectification', 'JobDataItem']), '?SectionID=' + SectionID);
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
	// Send button click event handler.
	//==============================================
	this.btnSend_Click = function(){
		try{
			// Check if all questions have been completed, if so, check the 'All Complete' user setting.
			if ((self.intQuestionsAnswered == self.intQuestionCount)){
				var objJobDataItemDRs = window['JobDataItemRS'].Select('[Code]=\'NONS\'');
				
				// Check if there are any NONS answers.
				if (self.PromptForSafeToDriveOnNONS){
					if (objJobDataItemDRs.length > 0){
						// There is at least one fault, mark the check as not safe to drive/operate.
						self.SafeToDrive = false;
						self.PromptForSafeToDriveOnNONS = false;

						var objControls = new Object();
						objControls.btnYes = document.createElement('BUTTON');
						objControls.btnYes.setAttribute('type', 'button');
						objControls.btnYes.innerHTML = 'Yes';
						objControls.btnYes.IsDefault = true;
						objControls.btnYes.onclick = function(){
							self.SafeToDrive = true;
							self.winMessage.Close();
							self.btnSend_Click();
						};

						objControls.btnNo = document.createElement('BUTTON');
						objControls.btnNo.setAttribute('type', 'button');
						objControls.btnNo.innerHTML = 'No';
						objControls.btnNo.onclick = function(){
							self.winMessage.Close();
							self.btnSend_Click();
						};

						self.winMessage = new Message().Prompt('You have identified ' + objJobDataItemDRs.length + ((objJobDataItemDRs.length == 1) ? ' fault' : ' faults') + ' on this safety check. Is \'' + Functions.GetSessionItem('RegistrationNumber') + '\' safe to drive/operate?', objControls, window['SiteName'], 'Question');
						return;
					}
				}

				self.PromptForSafeToDriveOnNONS = true;

				// Send the check, this is done by invoking the 'SafeToDrive' function with 'true = Vehicle/Asset is safe to drive'.
				var objControls = new Object();
				objControls.btnYes = document.createElement('BUTTON');
				objControls.btnYes.setAttribute('type', 'button');
				objControls.btnYes.innerHTML = 'Yes';
				objControls.btnYes.IsDefault = true;
				objControls.btnYes.onclick = function(){
					Sections.SendCheck();
				};

				objControls.btnNo = document.createElement('BUTTON');
				objControls.btnNo.setAttribute('type', 'button');
				objControls.btnNo.innerHTML = 'No';

				var strNetworkInfoMessage = '';

				// Check the network type.
				switch (Functions.CheckConnection())
				{
					case 'Cell 2G connection':
					case 'Cell 3G connection':
					case 'Cell generic connection':
						strNetworkInfoMessage = '<br/><br/><strong>N.B</strong> The data may take a while to send over the mobile network.';
						break;
				}

				self.winMessage = new Message().Prompt('Are you sure that you want to send the safety check for \'' + Functions.GetSessionItem('RegistrationNumber') + '\'?' + strNetworkInfoMessage, objControls, window['SiteName'], 'Question');
			}
			else{
				self.winMessage = new Message().SimplePrompt(((self.intQuestionsAnswered == 0) ? 'You haven\'t answered any questions' : 'You have currently answered ' + self.intQuestionsAnswered + ((self.intQuestionsAnswered == 1) ? ' question' : ' questions')) + ((self.intQuestionsAnswered == 0) ? '' : ' out of ' + self.intQuestionCount) + '. You need to answer all the questions before submitting the safety check.', function(){
					self.winMessage.Close();
				}, 'Information');
			}
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// Send check handler.
	//==============================================
	this.SendCheck = function(){
		try{
			// Close the window prompt.
			self.winMessage.Close();

			//self.winDataProcessor = new Message().WaitWindow('Sending/Saving, please wait...');
			//self.AddedToQueue();

			window.setTimeout(function(){
				// Store the mileage value and type for future safety checks.
				Functions.SetItem(Functions.GetSessionItem('VehicleID') + '_Mileage', Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_Mileage'));
				Functions.SetItem(Functions.GetSessionItem('VehicleID') + '_Hours', Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_Hours'));
				Functions.SetItem(Functions.GetSessionItem('VehicleID') + '_Fuel', Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_Fuel'));
				Functions.SetItem(Functions.GetSessionItem('VehicleID') + '_MileageType', Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_MileageType'));

				// Get the overall outcome of the job.
				var strOutCome = 'SERV';

				if (window['JobDataItemRS'].Select('[Code]=\'NONS\'').length > 0){
					strOutCome = 'NONS';
				}
				else{
					if (window['JobDataItemRS'].Select('[Code]=\'ADVI\'').length > 0)
						strOutCome = 'NONS';
				}

				var aPosition = Functions.GetSessionItem('Position').split(',');
				var dtDate = new Date();

				// Add the remaining header information detail.
				window['HeaderInformationRS'].Rows[0]['EndDateTime'].Value = new Date().ToSQLFormat();
				window['HeaderInformationRS'].Rows[0]['MileageType'].Value = self.GetMileageTypeName(Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_MileageType'));
				window['HeaderInformationRS'].Rows[0]['MileageValue'].Value = Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_Mileage');
				window['HeaderInformationRS'].Rows[0]['HoursValue'].Value = Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_Hours');
				window['HeaderInformationRS'].Rows[0]['FuelLitresStart'].Value = ((Functions.GetSessionItem('EndOfDayCheck') == 'true') ? 0 : Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_Fuel'));
				window['HeaderInformationRS'].Rows[0]['FuelLitresEnd'].Value = ((Functions.GetSessionItem('EndOfDayCheck') == 'true') ? Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_Fuel') : 0);
				window['HeaderInformationRS'].Rows[0]['Code'].Value = strOutCome;
				window['HeaderInformationRS'].Rows[0]['SafeToDrive'].Value = self.SafeToDrive;
				window['HeaderInformationRS'].Rows[0]['Latitude'].Value = aPosition[0];
				window['HeaderInformationRS'].Rows[0]['Longitude'].Value = aPosition[1];
				window['HeaderInformationRS'].Rows[0]['Device'].Value = window['BrowserName'];
				window['HeaderInformationRS'].Rows[0]['HistoryID'].Value = (Functions.GetSessionItem('HistoryID') == '') ? 0 : Functions.GetSessionItem('HistoryID');
				//window['HeaderInformationRS'].Rows[0]['UTCDate'].Value = Number(Date.UTC(dtDate.getFullYear(), dtDate.getMonth(), dtDate.getDate(), 23, 59, 59));
				window['HeaderInformationRS'].Rows[0]['UTCDate'].Value = (new Date()).getTime();

				var strXML = '<Data>';
				strXML += window['HeaderInformationRS'].toString().replace(/<([\W]*)DataSet>/g, '');
				strXML += window['JobDataItemRS'].toString().replace(/<([\W]*)DataSet>/g, '');
				strXML += '</Data>';

				self.AddedToQueue();

				// Store the job sheet in the local history.
				Functions.StoreJobSheet(strXML);

				// Send the data to the processor.
				DataProcessor.AddToQueue('ProcessJobSheet', strXML, undefined, false, 'safety check', true);
			}, 20);
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==============================================
	// The job sheet has been added to the queue.
	//==============================================
	this.AddedToQueue = function(Response, PerformedSilently, Data){
		try{
			if (self.winDataProcessor)
				self.winDataProcessor.Close();

			// Check if the application should automatically log off the user.
			if (Functions.GetUserItem('AutoLogOutAfterCheck') == 'On'){
				// Reset login details etc..
				Functions.ResetVariables();
			
				// Load the login control.
				Functions.LoadControl(window['SiteIndex'] + '/Login');
			}
			else{
				// Load the job selection control.
				Functions.LoadControl(window['SiteIndex'] + '/JobSelection');
			}
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==============================================
	// Get the mileage type name.
	//==============================================
	this.GetMileageTypeName = function(MileageType){
		var strReturnValue = 'Unknown';
		try{
			switch(Number(MileageType)){
				case 1:
					strReturnValue = 'Miles';
					break;

				case 2:
					strReturnValue = 'KMS';
					break;

				case 4:
					strReturnValue = 'Hours';
					break;
			}
		}
		catch (exc){
			self.OnError(exc);
		}
		finally{
			return strReturnValue
		}
	}

	//==============================================
	// Comments button click event handler.
	//==============================================
	this.btnComments_Click = function(){
		try{
			var objControls = new Object();

			objControls.btnCommentsClose = document.createElement('BUTTON');
			objControls.btnCommentsClose.setAttribute('type', 'button');
			objControls.btnCommentsClose.innerHTML = 'Close';
			objControls.btnCommentsClose.onclick = function(){ Sections.btnCommentsClose_Click('false'); };

			var strXML = '<Data>';
			strXML += '	<Comments><![CDATA[' + window['HeaderInformationRS'].Rows[0]['Comments'].Value + ']]></Comments>';
			strXML += '</Data>';

			self.winComments = new Message().PopupWindow(strXML, 'Xslt/' + window['SiteIndex'] + '/Comments.xslt', window['SiteName'] + ' - Comments', objControls, undefined, self.CommentsLoaded, true);
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==============================================
	// Comments loaded event handler.
	//==============================================
	this.CommentsLoaded = function(){
		try{
			self.txtComments = document.getElementById('txtComments');
			
			// Set the cursor to the end the text.
			if (window['Platform'] != 'Tablet'){
				self.txtComments.focus();
				self.txtComments.selectionStart = self.txtComments.selectionEnd = self.txtComments.value.length;
			}
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==============================================
	// Comments close button click event handler.
	//==============================================
	this.btnCommentsClose_Click = function(){
		try{
			window['HeaderInformationRS'].Rows[0]['Comments'].Value = self.txtComments.value;
			self.winComments.Close();
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==============================================
	// Back button click event handler.
	//==============================================
	this.btnBack_Click = function(){
		try{
			Functions.RemoveBackButtonHandler();
			Functions.SetSessionItem('HeaderControlValidate', false);
			Functions.LoadControl(window['SiteIndex'] + '/' + Functions.GetSessionItem('HeaderControl'));
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

﻿Header.prototype = new Base;
Header.prototype.constructor = Header;

//==================================================
// Header class.
//==================================================
function Header(){
    var self = this;
    this.Name = 'Header';

	//==============================================
    // Load event handler.
    //==============================================
    this.Loaded = function(){
        try{
			// Delete the seperate template recordset.
			Functions.DeleteTemplateRecordSets();

			Functions.BackButtonHandler(self.btnCancel_Click, true);

			// Set the performing check session item.
			Functions.SetSessionItem('PerformingCheck', true);

			// Get the current position of the device.
			Functions.GetCurrentPosition();

			// Create a 'HeaderInformation' recordset.
			window['HeaderInformationRS'] = new Recordset('HeaderInformation');
			window['HeaderInformationRS'].AddColumn('TemplateID', 'Integer');
			window['HeaderInformationRS'].AddColumn('HeaderControl', 'String');
			window['HeaderInformationRS'].AddColumn('UserID', 'Integer');
			window['HeaderInformationRS'].AddColumn('UserName', 'String');
			window['HeaderInformationRS'].AddColumn('VehicleID', 'Integer');
			window['HeaderInformationRS'].AddColumn('TMApplyToTypeID', 'Integer');
			window['HeaderInformationRS'].AddColumn('RegistrationNumber', 'String');
			window['HeaderInformationRS'].AddColumn('StartDateTime', 'DateTime');
			window['HeaderInformationRS'].AddColumn('EndDateTime', 'DateTime');
			window['HeaderInformationRS'].AddColumn('MileageType', 'Integer');
			window['HeaderInformationRS'].AddColumn('MileageValue', 'Integer');
			window['HeaderInformationRS'].AddColumn('HoursValue', 'Double');
			window['HeaderInformationRS'].AddColumn('FuelLitresStart', 'Double');
			window['HeaderInformationRS'].AddColumn('FuelLitresEnd', 'Double');
			window['HeaderInformationRS'].AddColumn('Code', 'String');
			window['HeaderInformationRS'].AddColumn('SafeToDrive', 'Boolean');
			window['HeaderInformationRS'].AddColumn('Latitude', 'Double');
			window['HeaderInformationRS'].AddColumn('Longitude', 'Double');
			window['HeaderInformationRS'].AddColumn('Device', 'String');
			window['HeaderInformationRS'].AddColumn('HistoryID', 'Integer');
			window['HeaderInformationRS'].AddColumn('UTCDate', 'Integer');
			window['HeaderInformationRS'].AddColumn('Comments', 'String');
			window['HeaderInformationRS'].NewRow();

			// Create a 'JobDataItem' recordset. 
			window['JobDataItemRS'] = new Recordset('JobDataItem');
			window['JobDataItemRS'].AddColumn('SectionID', 'Integer');
			window['JobDataItemRS'].AddColumn('QuestionID', 'Integer');
			window['JobDataItemRS'].AddColumn('AnswerID', 'Integer');
			window['JobDataItemRS'].AddColumn('RectificationID', 'Integer');
			window['JobDataItemRS'].AddColumn('SeverityID', 'Integer');
			window['JobDataItemRS'].AddColumn('Code', 'String');
			window['JobDataItemRS'].AddColumn('FreeText', 'String');
			window['JobDataItemRS'].AddColumn('ImageData', 'String');

			// Update the registration number.
			document.getElementById('lblRegistrationNumber').innerHTML = Functions.GetSessionItem('RegistrationNumber');

			// Get form elements.
			self.lblStatus = document.getElementById('lblStatus');
			self.lblStatus.innerHTML = 'Loading template, step 2, please wait...';

			// Load the template.
			Functions.LoadTemplate(Functions.GetSessionItem('TemplateID'), self.TemplateLoaded);
        }
        catch (exc){
            self.OnError(exc);
        }
    }
	
	//==============================================
    // Temmplate loaded handler.
    //==============================================
	this.TemplateLoaded = function(Data){
		try{
			// Load the template details.
			window['TemplateRS'] = new Recordset();
			window['TemplateRS'].LoadXML(Data, 'Templates');

			// Update the header information recordset
			window['HeaderInformationRS'].Rows[0]['TemplateID'].Value = Functions.GetSessionItem('TemplateID');
			window['HeaderInformationRS'].Rows[0]['HeaderControl'].Value = window['TemplateRS'].Rows[0]['HeaderControl'].Value;
			window['HeaderInformationRS'].Rows[0]['UserID'].Value = Functions.GetSessionItem('XUserID');
			window['HeaderInformationRS'].Rows[0]['UserName'].Value = Functions.GetSessionItem('Name');
			window['HeaderInformationRS'].Rows[0]['VehicleID'].Value = Functions.GetSessionItem('VehicleID');
			window['HeaderInformationRS'].Rows[0]['TMApplyToTypeID'].Value = Functions.GetSessionItem('TMApplyToTypeID');
			window['HeaderInformationRS'].Rows[0]['RegistrationNumber'].Value = Functions.GetSessionItem('RegistrationNumber');
			window['HeaderInformationRS'].Rows[0]['StartDateTime'].Value = new Date().ToSQLFormat();

			// Set session items.
			Functions.SetSessionItem('HeaderInformationRS', window['HeaderInformationRS'].toString());
			Functions.SetSessionItem('JobDataItemRS', window['JobDataItemRS'].toString());
			Functions.SetSessionItem('TemplateXML', Data);
			Functions.SetSessionItem('HeaderControlValidate', true);

			// Check if the template has been split into seperate tables.
			Functions.TemplateRecordSet();

			var strHeaderControl = window['TemplateRS'].Rows[0]['HeaderControl'].Value.replace('.dll', '');

			// Load the actual header control.
			switch (strHeaderControl){
				case 'SafetyInspection_Vehicle':
				case 'DailySafetyCheck_Vehicle':
					Functions.SetSessionItem('HeaderControl', '/DailySafetyCheckVehicle');
					Functions.LoadControl(window['SiteIndex'] + '/DailySafetyCheckVehicle');
					break;

				case 'SafetyCheck_Hours':
					Functions.SetSessionItem('HeaderControl', '/SafetyCheckHours');
					Functions.LoadControl(window['SiteIndex'] + '/SafetyCheckHours');
					break;

				case 'NoControl':
					Functions.SetSessionItem('HeaderControl', '/JobSelection');

					// Store the form values.
					Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_Mileage', 0);
					Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_Hours', 0);
					Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_Fuel', 0);
					Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_MileageType', 0);

					// Load the sections.
					Functions.LoadControl(window['SiteIndex'] + '/Sections', Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'JobDataItem']));
					break;

				default:
					var objControls = new Object();
					objControls.btnOK = document.createElement('BUTTON');
					objControls.btnOK.setAttribute('type', 'button');
					objControls.btnOK.innerHTML = 'OK';
					objControls.btnOK.IsDefault = true;
					objControls.btnOK.onclick = function(){
						self.winMessage.Close();
						Functions.LoadControl(window['SiteIndex'] + '/JobSelection');
					};
					
					self.winMessage = new Message().Prompt('Unfortunately you will not be able to complete a \'Safety Check\' for \'' + Functions.GetSessionItem('RegistrationNumber') + '\' because a valid template cannot be loaded.', objControls, window['SiteName'], 'Information');
					break;
			}
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
	// Cancel button click event handler.
	//==============================================
	this.btnCancel_Click = function(){
		try{
			Functions.LoadControl(window['SiteIndex'] + '/JobSelection');
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

﻿Questions.prototype = new Base;
Questions.prototype.constructor = Questions;

//==================================================
// Questions.
//==================================================
function Questions(){
    var self = this;
    this.Name = 'Questions';
    this.Xslt = 'Xslt/SafetyCheck/Questions.xslt';

	//==============================================
    // Load event handler.
    //==============================================
    this.Loaded = function(){
        try{
			this.SessionManager();

			// Check the control.
			if ((document.getElementById('scroller').innerHTML == '') && (window['Platform'] != 'Tablet')){
				Functions.LoadControl(window['SiteIndex'] + '/Questions', Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'Rectification', 'JobDataItem']), '?SectionID=' + Functions.GetSessionItem('SectionID'));
				return;
			}

			Functions.BackButtonHandler(self.btnBack_Click, true);
			
			// Format the title.
			Functions.FormatTitle();

			// Remove the answer scrollbar position.
			Functions.DeleteSessionItem('Answer_ScrollTop');

			// Check if the job sheet recordsets exist.
			Functions.CheckJobSheetRecordsets();

			// Check if the control is to examine if all the questions have been answered. This should only be allowed when
			// an answer has been selectedand the user is returning to this control.
			if (Functions.GetSessionItem('QuestionCheckAllCompleted') == 'true'){
				Functions.SetSessionItem('QuestionCheckAllCompleted', false);

				// Check if all questions have been completed, if so, check the 'All Complete' user setting.
				if ((document.getElementById('lblCompleted').innerHTML == 'true'))
					if (Functions.GetUserItem('AllComplete') == 'On'){
						self.btnBack_Click();
						return;
					}
			}

			// Get form elements.
			self.DataContainer = document.getElementById('DataContainer');

			// Render the data.
			self.DataXSLT_Completed();
        }
        catch (exc){
            self.OnError(exc);
        }
    }

	//==============================================
    // Data XSLT transform completed handler.
    //==============================================
	this.DataXSLT_Completed = function(){
		try{
			Functions.EnableScroll('DataContainer');

			// Get the position of the scrollbar.
			Functions.SetScrollbarPosition(self.Name, self.DataContainer);
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
    // 'All OK' button click event handler.
    //==============================================
	this.btnAllOK_Click = function(){
		try{
			// Filter the questions by the section ID.
			var objQuestionDRs = window['QuestionRS'].Select('[SectionID]=' + Functions.GetSessionItem('SectionID'));

			// Loop through the rows.
			for(Row in objQuestionDRs){
				// Get the SERV answer for the question.
				var objAnswerDRs = window['AnswerRS'].Select('([QuestionID]=' + objQuestionDRs[Row]['QuestionID'].Value + ' OR [QuestionID]=' + objQuestionDRs[Row]['InheritedID'].Value + ' OR [QuestionID]=' + objQuestionDRs[Row]['PointerQuestionID'].Value + ') AND [Code]=\'SERV\'');

				if (objAnswerDRs.length == 1){
					// Check if the job data already contains a record for the section and question.
					var objJobDataItemDRs = window['JobDataItemRS'].Select('[SectionID]=' + objQuestionDRs[Row]['SectionID'].Value + ' AND [QuestionID]=' + objQuestionDRs[Row]['QuestionID'].Value);

					if (objJobDataItemDRs.length == 0){
						// Create a new row.
						var objNewRow = window['JobDataItemRS'].NewRow();
						objNewRow['SectionID'].Value = objQuestionDRs[Row]['SectionID'].Value;
						objNewRow['QuestionID'].Value = objQuestionDRs[Row]['QuestionID'].Value;
						objNewRow['AnswerID'].Value = objAnswerDRs[0]['AnswerID'].Value;
						objNewRow['Code'].Value = objAnswerDRs[0]['Code'].Value;
						objNewRow['FreeText'].Value = '';
					}
				}
			}

			// Store the job data item recordset.
			Functions.SetSessionItem('JobDataItemRS', window['JobDataItemRS'].toString());

			// Check the 'All OK' user setting.
			if (Functions.GetUserItem('AllOK') == 'On'){
				self.btnBack_Click();
			}
			else{
				// Render the data.
				new Transform().Render(self.DataContainer, Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'Rectification', 'JobDataItem']), self.Xslt + '?Action=QuestionList&SectionID=' + Functions.GetSessionItem('SectionID'), undefined, self.QuestionsXSLT_Completed, true);
			}
		}
        catch (exc){
            self.OnError(exc);
        }
	}

    //==============================================
    // Question button click event handler.
    //==============================================
	this.btnQuestion_Click = function(QuestionID, InheritedID, PointerQuestionID){
		try{
			// Get the position of the scrollbar.
			Functions.GetScrollbarPosition(self.Name, self.DataContainer);

			// Store question ID, inherited ID and pointer questionID.
			Functions.SetSessionItem('QuestionID', QuestionID);
			Functions.SetSessionItem('InheritedID', InheritedID);
			Functions.SetSessionItem('PointerQuestionID', PointerQuestionID);

			// Load the answers.
			Functions.LoadControl(window['SiteIndex'] + '/Answers', Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'Rectification', 'JobDataItem']), '?SectionID=' + Functions.GetSessionItem('SectionID') + '&QuestionID=' + QuestionID + '&InheritedID=' + InheritedID + '&PointerQuestionID=' + PointerQuestionID);
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
	// Send button click event handler.
	//==============================================
	this.btnBack_Click = function(){
		try{
			Functions.RemoveBackButtonHandler();
			Functions.LoadControl(window['SiteIndex'] + '/Sections', Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'Rectification', 'JobDataItem']));
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

﻿History.prototype = new Base;
History.prototype.constructor = History;

//==================================================
// History.
//==================================================
function History(){
    var self = this;
    this.Name = 'History';
	this.LoadAttempt = 0;

	//==============================================
    // Load event handler.
    //==============================================
    this.Loaded = function(){
        try{
			this.SessionManager();

			Functions.BackButtonHandler(self.btnBack_Click, true);

			// Enable the scroller on the container.
			Functions.EnableScroll('HistoryDataContainer');
        }
        catch (exc){
            self.OnError(exc);
        }
    }

	//==============================================
    // Reload the control after saving data.
    //==============================================
	this.ReloadControl = function(XML){
		try{
			Functions.LoadControl(window['SiteIndex'] + '/History', XML, '?UserID=' + Functions.GetSessionItem('XUserID'));
		}
        catch (exc){
            self.OnError(exc);
        }
	}

    //==============================================
    // History item button click event handler.
    //==============================================
	this.btnHistoryItem_Click = function(UTCDate, HistoryID, VehicleID, RegistrationNumber, TMApplyToTypeID, TemplateID){
		try{
			// Store the history ID.
			Functions.SetSessionItem('HistoryID', UTCDate);
			Functions.SetSessionItem('VehicleID', VehicleID);
			Functions.SetSessionItem('RegistrationNumber', RegistrationNumber);
			Functions.SetSessionItem('TMApplyToTypeID', TMApplyToTypeID);
			Functions.SetSessionItem('TemplateID', TemplateID);

			window['winDocument'] = new Message().WaitWindow('Loading document, please wait...');

			Functions.GetData('History', function(Data){
				var objHistoryRS = new Recordset();
				objHistoryRS.LoadXML(Data[1], 'History');

				// Get the history XML.
				var objHistoryDRs = objHistoryRS.Select('[UTCDate]=' + UTCDate);
				self.DocumentXML = unescape(objHistoryDRs[0]['XML'].Value);

				Functions.SetSessionItem('SendCheckXML', self.DocumentXML);

				var dtDate = new Date();
				var dtStartDateTime = StringToDate(objHistoryDRs[0]['Date'].Value);

				// Check the number of hours passed since the safety check was completed, this is to allow the 'End of Day Check'.
				Functions.SetSessionItem('EndOfDayAllowed', (dtStartDateTime.getHoursDifference(dtDate) < 24));
				
				// Check/Get the related history item.
				self.RelatedDocumentXML = '';
				var strStatement = (HistoryID == 0) ? '[HistoryID]=' + UTCDate : '[UTCDate]=' + HistoryID;
				var objRelatedDRS = objHistoryRS.Select(strStatement);

				if (objRelatedDRS.length == 1)
					self.RelatedDocumentXML = unescape(objRelatedDRS[0]['XML'].Value);

				// Load the template.
				Functions.LoadTemplate(objHistoryDRs[0]['TemplateID'].Value, self.TemplateLoaded);

				delete objHistoryDRs;
				delete objHistoryRS;
			});
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
	// Template loaded event handler.
	//==============================================
	this.TemplateLoaded = function(Data){
		try{
			var strParameters = '';

            if (window['IsPhoneGap'] || window['IsDesktopApplication']){
                self.DocumentXML = self.DocumentXML.replace(/&lt;/g, '<');
                self.DocumentXML = self.DocumentXML.replace(/&gt;/g, '>');
                
                self.RelatedDocumentXML = self.RelatedDocumentXML.replace(/&lt;/g, '<');
                self.RelatedDocumentXML = self.RelatedDocumentXML.replace(/&gt;/g, '>');
            }
            
            // Get the history information from the related history record.
            if (self.RelatedDocumentXML != ''){
				var objHistoryRS = new Recordset();
				objHistoryRS.LoadXML(self.RelatedDocumentXML, 'HeaderInformation');

				strParameters = '?HistoryID=' + objHistoryRS['HistoryID'].Value;
				strParameters += '&FuelLitresStart=' + objHistoryRS['FuelLitresStart'].Value;

				delete objHistoryRS;
			}
            
			var strXML = self.DocumentXML + Data;
			strParameters += ((strParameters == '') ? '?' : '&') + 'EndOfDayAllowed=' + Functions.GetSessionItem('EndOfDayAllowed');

			// Load the document.
			Functions.LoadControl(window['SiteIndex'] + '/DocumentView', '<DataSet>' + strXML + '</DataSet>', strParameters);
		}
        catch (exc){
            self.OnError(exc);
        }
	}

    //==============================================
    // Download past safety checks button click event handler.
    //==============================================
	this.btnDownload_Click = function(){
		try{
			// Get a list of matching companies.
			var soapClient = new SoapClient(self.WebServiceURL, 'DownloadPastInspections', self.DownloadPastInspections_Completed, undefined, 'Downloading past safety checks, please wait...');
			soapClient.AddParameter('UserID', Functions.GetSessionItem('XUserID'));
			soapClient.Send();
		}
        catch (exc){
            self.OnError(exc);
        }
	}
    
    //==============================================
    // Download past job soap completed handler.
    //==============================================
    this.DownloadPastInspections_Completed = function(Response, Object){
        try{
			// Check if there is any data.
			if (Response[1] == '<DataSet></DataSet>'){
				new Message().Alert('There are currently no historic safety inspections available.');
				return;
			}

			self.winWaitWindow = new Message().WaitWindow('Processing data, please wait...');

			window.setTimeout(function(){
				// Check if the history recordset has been defined and contains all the columns required.
				self.HistoryRS = Functions.CreateHistoryTable(self.HistoryRS);

				var objHistory = new Recordset();
				objHistory.LoadXML(Response[1], 'History');
				objHistory.MoveFirst();

				// Loop through the history records.
				do{
					// Check if the history record already exists.
					var objHistoryDRs = self.HistoryRS.Select('[VehicleID]=' + objHistory['VehicleID'].Value + ' AND [UTCDate]=' + objHistory['UTCDate'].Value);

					if (objHistoryDRs == undefined)
						continue;

					if (objHistoryDRs.length == 0){
						var strHistoryXML = objHistory['XML'].Value;
						strHistoryXML = strHistoryXML.replace(/&amp;lt;/g, '<');
						strHistoryXML = strHistoryXML.replace(/&amp;gt;/g, '>');

						var objNewRow = self.HistoryRS.NewRow();
						objNewRow['UTCDate'].Value = objHistory['UTCDate'].Value;
						objNewRow['HistoryID'].Value = objHistory['HistoryID'].Value;
						objNewRow['TemplateID'].Value = objHistory['TemplateID'].Value;
						objNewRow['TMApplyToTypeID'].Value = objHistory['TMApplyToTypeID'].Value;
						objNewRow['VehicleID'].Value = objHistory['VehicleID'].Value;
						objNewRow['RegistrationNumber'].Value = objHistory['RegistrationNumber'].Value;
						objNewRow['Date'].Value = StringToDate2(objHistory['Date'].Value).ToSQLFormat();
						objNewRow['UserID'].Value = Functions.GetSessionItem('XUserID');
						objNewRow['UserName'].Value = objHistory['UserName'].Value;
						objNewRow['Mileage'].Value = objHistory['MileageValue'].Value + ' ' + objHistory['MileageType'].Value;
						objNewRow['Hours'].Value = objHistory['HoursValue'].Value;
						objNewRow['Code'].Value = objHistory['Code'].Value;
						objNewRow['SafeToDrive'].Value = objHistory['SafeToDrive'].Value;
						objNewRow['XML'].Value = escape(strHistoryXML);
					}
				}while(objHistory.MoveNext());

				var strXML = self.HistoryRS.toString();

				// Store the data.
				Functions.StoreData('History', strXML);

				// Reload the control.
				self.ReloadControl(strXML);

				delete strXML;
				delete objHistory;

				// Close the wait window.
				self.winWaitWindow.Close();
			}, 20);
        }
        catch (exc){
            self.OnError(exc);
        }
    }

    //==============================================
    // Clear history button click event handler.
    //==============================================
	this.btnClear_Click = function(){
		try{
			var objControls = new Object();
			objControls.btnYes = document.createElement('BUTTON');
			objControls.btnYes.setAttribute('type', 'button');
			objControls.btnYes.innerHTML = 'Yes';
			objControls.btnYes.IsDefault = true;
			objControls.btnYes.onclick = function(){
				self.winWaitWindow = new Message().WaitWindow('Removing history data, please wait...');

				Functions.GetData('History', function(Data){
					if (Data == undefined){
						self.winWaitWindow.Close();
						return;
					}

					var intXUserID = Number(Functions.GetSessionItem('XUserID'));
					var objHistoryRS = new Recordset();
					objHistoryRS.LoadXML(Data[1], 'History');

					do{
						// Check if the user ID on the history record matches the currently logged in user, if so delete the record.
						if (Number(objHistoryRS['UserID'].Value) == intXUserID)
							objHistoryRS.DeleteRow();
					}while(objHistoryRS.MoveNext());

					var strXML = objHistoryRS.toString();

					// Store the data.
					Functions.StoreData('History', strXML, self.HistoryCleared);

					delete strXML;
					delete objHistoryRS;
					delete intXUserID;

					self.winWaitWindow.Close();
				});
				self.winMessage.Close();
			};

			objControls.btnNo = document.createElement('BUTTON');
			objControls.btnNo.setAttribute('type', 'button');
			objControls.btnNo.innerHTML = 'No';

			self.winMessage = new Message().Prompt('Are you sure that you want to clear the history?', objControls, window['SiteName'], 'Question');
		}
        catch (exc){
            self.OnError(exc);
        }
	}
	
	//==============================================
	// History cleared callback handler.
	//==============================================
	this.HistoryCleared = function(){
		try{
			// Reload the control.
			self.ReloadControl();
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==============================================
	// Back button click event handler.
	//==============================================
	this.btnBack_Click = function(){
		try{
            self.LoadAttempt = 0;
			Functions.LoadControl(window['SiteIndex'] + '/JobSelection');
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

JobSelection.prototype = new Base;
JobSelection.prototype.constructor = JobSelection;

//==================================================
// Job selection class.
//==================================================
function JobSelection(){
    var self = this;
    this.Name = 'JobSelection';
    
    //==============================================
    // Load event handler.
    //==============================================
    this.Loaded = function(){
        try{
			this.SessionManager();

			this.SetBranding();

			Functions.BackButtonHandler(self.btnLogOut_Click, true);

			// Clear session information.
			Functions.ClearSessionItems();

			// Set the performing check session item.
			Functions.SetSessionItem('PerformingCheck', false);

			// Check the users permissions for 'vehicle and asset searching'.
			if (Functions.HasPermission(155)){
				document.getElementById('btnSearch').className = '';
			}
			else{
				// Check if the device has a camera, if so, enable the QR code button.
				document.getElementById('btnScan').className = (window['HasCamera']) ? '' : 'Hide';
			}
        }
        catch (exc){
            self.OnError(exc);
        }
    }

	//==============================================
	// Scan button click event handler.
	//==============================================
	this.btnScan_Click = function(){
		try{
			Functions.Scan(self.VehicleScanSuccess);
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==============================================
	// Vehicle scan completed handler.
	//==============================================
	this.VehicleScanSuccess = function(Result){
		try{
			// Check if a result was returned.
            if (Result != ''){
                var aResult = Result.split('|');

				// Check if the QRcode is for a vehicle.
				if (aResult[0] == 'Vehicle'){
					// Store the vehicle details.
					Functions.SetSessionItem('VehicleID', Number(aResult[1]));
					Functions.SetSessionItem('RegistrationNumber', aResult[2]);
					//Functions.SetSessionItem('TMApplyToTypeID', aResult[3]);

					// Check if the TMApplyToType for the vehicle exists.
					if (Functions.GetItem(aResult[1] + '_TMApplyToTypeID') == ''){
						// Get a list of matching companies.
						var soapClient = new SoapClient(self.WebServiceURL, 'VehicleDetails', self.VehicleDetails_Completed, undefined, 'Validating vehicle/asset, please wait...');
						soapClient.AddParameter('VehicleID', aResult[1]);
						soapClient.Send();
					}
					else{
						// Store the vehicle details.
						Functions.SetSessionItem('TMApplyToTypeID', Functions.GetItem(aResult[1] + '_TMApplyToTypeID'));
						Functions.SetSessionItem('TemplateID', Functions.GetItem(aResult[1] + '_TemplateID'));

						// Load the header control.
						Functions.LoadControl(window['SiteIndex'] + '/Header');
					}
				}
				else{
					var objControls = new Object();
					objControls.btnTryAgain = document.createElement('BUTTON');
					objControls.btnTryAgain.setAttribute('type', 'button');
					objControls.btnTryAgain.innerHTML = 'Try Again';
					objControls.btnTryAgain.IsDefault = true;
					objControls.btnTryAgain.onclick = function(){
						self.winScanMessage.Close();
						Functions.Scan(self.VehicleScanSuccess);
					};

					objControls.btnCancel = document.createElement('BUTTON');
					objControls.btnCancel.setAttribute('type', 'button');
					objControls.btnCancel.innerHTML = 'Cancel';

					self.winScanMessage = new Message().Prompt('The QR code you have scanned is not for a vehicle or asset.', objControls, window['SiteName'], 'Question');
				}
            }
		}
		catch (exc){
			self.OnError(exc);
		}
	}
    
    //==============================================
    // Vehicle details soap completed handler.
    //==============================================
    this.VehicleDetails_Completed = function(Response, Object){
        try{
			// Check if an error occured.
			if (Response[0] == 'ERROR'){
				return;
			}

			var intVehicleID = Functions.GetSessionItem('VehicleID');

			Functions.SetItem(intVehicleID + '_TMApplyToTypeID', Response[1]);
			Functions.SetItem(intVehicleID + '_TemplateID', Response[2]);

			// Store the vehicle details.
			Functions.SetSessionItem('TMApplyToTypeID', Response[1]);
			Functions.SetSessionItem('TemplateID', Response[2]);

			// Load the header control.
			Functions.LoadControl(window['SiteIndex'] + '/Header');
        }
        catch (exc){
            self.OnError(exc);
        }
    }

	//==============================================
	// Search button click event handler.
	//==============================================
	this.btnSearch_Click = function(){
		try{
			Functions.LoadControl(window['SiteIndex'] + '/VehicleSelection');
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// Change PIN button click event handler.
	//==============================================
	this.btnChangePIN_Click = function(){
		try{
			new Message().Alert('JobSelection:btnChangePIN_Click()');
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// View history button click event handler.
	//==============================================
	this.btnHistory_Click = function(){
		try{
			self.winHistoryCheck = new Message().WaitWindow('Checking & removing historic data, please wait...');

			// Get the history data.
			Functions.GetData('History', function(Data){
				if (Data != undefined){
					self.HistoryRS = new Recordset();
					self.HistoryRS.LoadXML(Data[1], 'History');

					// Remove any jobs which are older than 7 days.
					var dtDate = new Date();
					dtDate.dateAdd("d", -7);
					var dtUTCNow = Number(Date.UTC(dtDate.getFullYear(), dtDate.getMonth(), dtDate.getDate(), 23, 59, 59)) / 1000;

					// Loop through the history records.
					self.HistoryRS.MoveFirst();
					do{
						var dtHistoryItem = StringToDate(self.HistoryRS['Date'].Value);
						var dtHistoryItemUTC = Number(Date.UTC(dtHistoryItem.getFullYear(), dtHistoryItem.getMonth(), dtHistoryItem.getDate(), 23, 59, 59)) / 1000;
							
						// Check if the UTC date is less than the UTC date now, if it is, remove the record.
						if (dtHistoryItemUTC < dtUTCNow){
							self.HistoryRS.DeleteRow();
						}

					}while(self.HistoryRS.MoveNext());

					// Store the history data.
					Functions.StoreData('History', self.HistoryRS.toString());
					Data[1] = self.HistoryRS.toString();
				}

				// Close the wait window.
				self.winHistoryCheck.Close();

				// Load the history control.
				Functions.LoadControl(window['SiteIndex'] + '/History', ((Data == undefined) ? '' : Data[1]), '?UserID=' + Functions.GetSessionItem('XUserID'));
			});
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// Log out button click event handler.
	//==============================================
	this.btnLogOut_Click = function(){
		try{
			var objControls = new Object();
			objControls.btnYes = document.createElement('BUTTON');
			objControls.btnYes.setAttribute('type', 'button');
			objControls.btnYes.innerHTML = 'Yes';
			objControls.btnYes.IsDefault = true;
			objControls.btnYes.onclick = function(){
				self.winLogout.Close();

				Functions.RemoveBackButtonHandler();

				// Reset login details etc..
				Functions.ResetVariables();
			
				// Load the login control.
				Functions.LoadControl(window['SiteIndex'] + '/Login');
			};

			objControls.btnNo = document.createElement('BUTTON');
			objControls.btnNo.setAttribute('type', 'button');
			objControls.btnNo.innerHTML = 'No';

			self.winLogout = new Message().Prompt('Are you sure that you want to logout?', objControls, window['SiteName'], 'Question');
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

﻿SafetyCheckHours.prototype = new Base;
SafetyCheckHours.prototype.constructor = SafetyCheckHours;

//==================================================
// Safety check - hours class.
//==================================================
function SafetyCheckHours(){
    var self = this;
    this.Name = 'SafetyCheckHours';

	//==============================================
    // Load event handler.
    //==============================================
    this.Loaded = function(){
        try{
			this.SessionManager();

			Functions.BackButtonHandler(Functions.btnCancelCheck_Click, true);

			// Remove the section, question and answer scrollbar position.
			Functions.DeleteSessionItem('Section_ScrollTop');
			Functions.DeleteSessionItem('Question_ScrollTop');
			Functions.DeleteSessionItem('Answer_ScrollTop');

			// Update the registration number.
			document.getElementById('lblRegistrationNumber').innerHTML = Functions.GetSessionItem('RegistrationNumber');

			// Get form elements.
			self.txtHours = document.getElementById('txtHours');
			self.ValidateHours = true;

			// Get the vehicle's/asset's hours value, if it's empty, set it to zero.
			if (Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_Hours') == '')
				Functions.SetItem(Functions.GetSessionItem('VehicleID') + '_Hours', 0);

			// Set the hours textbox values.
			self.txtHours.value = Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_Hours');

			// Check the value, if zero, check session storage.
			if (self.txtHours.value == '0')
				self.txtHours.value = Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_Hours');

			// Store the original hours.
			self.OriginalHours = Number(self.txtHours.value);

			// Check the hours textbox value before moving focus to it, if it's zero, empty the content.
			if (Number(self.txtHours.value) == 0)
				self.txtHours.value = '';

			// Focus the hours textbox.
			self.txtHours.focus();
        }
        catch (exc){
            self.OnError(exc);
        }
    }

    //==============================================
    // Hours textbox keypress event handler.
    //==============================================
	this.txtHours_KeyPress = function(evt){
		try{
			Functions.NumericOnly(evt, self.btnContinue_Click, false, false);
		}
        catch (exc){
            self.OnError(exc);
        }
	}
	
    //==============================================
    // Hours textbox blur event handler.
    //==============================================
	this.txtHours_Blur = function(){
		try{
			self.txtHours.value = (self.txtHours.value == '') ? 0 : self.txtHours.value;
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
	// Continue button click event handler.
	//==============================================
	this.btnContinue_Click = function(){
		try{
			if (Functions.GetSessionItem('HeaderControlValidate') == 'true'){
				// Check if the user has entered the hours.
				if (Number(self.txtHours.value) == 0){
					self.winMessage = new Message().SimplePrompt('Please enter the current hours.', function(){
						self.txtHours.value = '';
						self.txtHours.focus();
						self.winMessage.Close();
					}, 'Information');
					return;
				}

				// Check if the hours has been changed.
				if (self.ValidateHours){
					var strMessage = '';

					if (Number(self.txtHours.value) < Number(Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_Hours'))){
						strMessage = 'The hours you have entered is less than previously recorded';
					}
					else{
						if (Number(self.txtHours.value) == Number(Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_Hours'))){
							strMessage = 'The hours you have entered is the same as previously recorded';
						}
					}
			
					// Check the message.
					if (strMessage != ''){
						var objControls = new Object();
						objControls.btnYes = document.createElement('BUTTON');
						objControls.btnYes.setAttribute('type', 'button');
						objControls.btnYes.innerHTML = 'Yes';
						objControls.btnYes.IsDefault = true;
						objControls.btnYes.onclick = function(){
							self.ValidateHours = false;
							self.winMessage.Close();
							self.Continue();
						};

						objControls.btnNo = document.createElement('BUTTON');
						objControls.btnNo.setAttribute('type', 'button');
						objControls.btnNo.innerHTML = 'No';
						objControls.btnNo.onclick = function(){
							self.winMessage.Close();
							self.txtHours.value = '';
							self.txtHours.focus();
						};

						self.winMessage = new Message().Prompt(strMessage + '. Are you sure that you want to continue with this value?', objControls, window['SiteName'], 'Question');
						return;
					}
				}
			
				// Check the fuel value.
				self.Continue();
			}
			else{
				// Contine the process.
				self.Continue();
			}
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==============================================
	// Contine process.
	//==============================================
	this.Continue = function(){
		try{
			// Store the form values.
			Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_Mileage', 0);
			Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_Hours', Number(self.txtHours.value));
			Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_Fuel', 0);
			Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_MileageType', 4);

			// Load the sections.
			Functions.LoadControl(window['SiteIndex'] + '/Sections', Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'JobDataItem']));
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

﻿Answers.prototype = new Base;
Answers.prototype.constructor = Answers;

//==================================================
// Answers.
//==================================================
function Answers(){
    var self = this;
    this.Name = 'Answers';
    this.Xslt = 'Xslt/SafetyCheck/Answers.xslt';

	//==============================================
    // Load event handler.
    //==============================================
    this.Loaded = function(){
        try{
			this.SessionManager();

			// Check the control.
			if ((document.getElementById('scroller').innerHTML == '') && (window['Platform'] != 'Tablet')){
				Functions.LoadControl(window['SiteIndex'] + '/Answers', Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'Rectification', 'JobDataItem']), '?SectionID=' + Functions.GetSessionItem('SectionID') + '&QuestionID=' + Functions.GetSessionItem('QuestionID') + '&InheritedID=' + Functions.GetSessionItem('InheritedID') + '&PointerQuestionID=' + Functions.GetSessionItem('PointerQuestionID'));
				return;
			}

			Functions.BackButtonHandler(self.btnBack_Click, true);
			
			// Format the title.
			Functions.FormatTitle();

			// Get form elements.
			self.DataContainer = document.getElementById('DataContainer');

			// Check if the job sheet recordsets exist.
			Functions.CheckJobSheetRecordsets();

			// Render the data.
			self.DataXSLT_Completed();
        }
        catch (exc){
            self.OnError(exc);
        }
    }

	//==============================================
    // Data XSLT transform completed handler.
    //==============================================
	this.DataXSLT_Completed = function(){
		try{
			Functions.EnableScroll('DataContainer');

			// Get the position of the scrollbar.
			Functions.SetScrollbarPosition(self.Name, self.DataContainer);
		}
        catch (exc){
            self.OnError(exc);
        }
	}

    //==============================================
    // Answer button click event handler.
    //==============================================
	this.btnAnswer_Click = function(SectionID, QuestionID, AnswerID, Code){
		try{
			// Get the position of the scrollbar.
			Functions.GetScrollbarPosition(self.Name, self.DataContainer);

			// Check the code, if a SERV or NONA answer has been selected, delete any existing rows.
			if ((Code == 'SERV') || (Code == 'NONA')){
				window['JobDataItemRS'].DeleteRows('[QuestionID]=' + QuestionID);
			}
			else{
				window['JobDataItemRS'].DeleteRows('[QuestionID]=' + QuestionID + ' AND ([Code]=\'SERV\' OR [Code]=\'NONA\')');

				// Check if the question allows multiple answers.
				if (window['QuestionRS'].Find('[QuestionID]=' + QuestionID)){
					// If multiple answers are not allowed, delete any existing rows.
					if (window['QuestionRS']['AllowMultipleAnswers'].Value == 'false')
						window['JobDataItemRS'].DeleteRows('[QuestionID]=' + QuestionID + ' AND [AnswerID]!=' + AnswerID);
				}
			}

			// Check if the job data already contains a record for the section, question and answer.
			var objJobDataItemDRs = window['JobDataItemRS'].Select('[SectionID]=' + SectionID + ' AND [QuestionID]=' + QuestionID + ' AND [AnswerID]=' + AnswerID);

			if (objJobDataItemDRs.length == 0){
				// Create a new row.
				var objNewRow = window['JobDataItemRS'].NewRow();
				objNewRow['SectionID'].Value = SectionID;
				objNewRow['QuestionID'].Value = QuestionID;
				objNewRow['AnswerID'].Value = AnswerID;
				objNewRow['Code'].Value = Code;
				objNewRow['FreeText'].Value = '';
			}
			else{
				objJobDataItemDRs[0]['SectionID'].Value = SectionID;
				objJobDataItemDRs[0]['QuestionID'].Value = QuestionID;
				objJobDataItemDRs[0]['AnswerID'].Value = AnswerID;
				objJobDataItemDRs[0]['Code'].Value = Code;
			}

			// Store the job data item recordset.
			Functions.SetSessionItem('JobDataItemRS', window['JobDataItemRS'].toString());

			// Set the check all completed state for the question control.
			Functions.SetSessionItem('QuestionCheckAllCompleted', true);

			// Check the answer's code.
			if ((Code == 'NONS') || (Code == 'ADVI')){
				// Load the rectifications for the answers. N.B There may not be any rectifications so just display the control.
				Functions.SetSessionItem('Rectification_QuestionID', QuestionID);
				Functions.SetSessionItem('AnswerID', AnswerID);
				Functions.SetSessionItem('Code', Code);

				Functions.LoadControl(window['SiteIndex'] + '/Rectifications', Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'Rectification', 'JobDataItem']), '?QuestionID=' + QuestionID + '&AnswerID=' + AnswerID + '&Code=' + Code);
				return;
			}

			// Check the 'All OK' user setting.
			if (Functions.GetUserItem('AnswerSelected') == 'On'){
				self.btnBack_Click();
			}
			else{
				// Render the data.
				new Transform().Render(self.DataContainer, Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'Rectification', 'JobDataItem']), self.Xslt + '?Action=AnswerList&SectionID=' + Functions.GetSessionItem('SectionID') + '&QuestionID=' + Functions.GetSessionItem('QuestionID') + '&InheritedID=' + Functions.GetSessionItem('InheritedID') + '&PointerQuestionID=' + Functions.GetSessionItem('PointerQuestionID'), undefined, self.QuestionsXSLT_Completed, true);
			}
		}
        catch (exc){
            self.OnError(exc);
        }
	}

	//==============================================
	// Send button click event handler.
	//==============================================
	this.btnBack_Click = function(){
		try{
			Functions.RemoveBackButtonHandler();
			Functions.LoadControl(window['SiteIndex'] + '/Questions', Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'Rectification', 'JobDataItem']), '?SectionID=' + Functions.GetSessionItem('SectionID'));
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

﻿DailySafetyCheckVehicle.prototype = new Base;
DailySafetyCheckVehicle.prototype.constructor = DailySafetyCheckVehicle;

//==================================================
// Daily safety check - vehicle class.
//==================================================
function DailySafetyCheckVehicle(){
    var self = this;
    this.Name = 'DailySafetyCheckVehicle';

	//==============================================
    // Load event handler.
    //==============================================
    this.Loaded = function(){
        try{
			this.SessionManager();

			Functions.BackButtonHandler(Functions.btnCancelCheck_Click, true);

			// Remove the section, question and answer scrollbar position.
			Functions.DeleteSessionItem('Section_ScrollTop');
			Functions.DeleteSessionItem('Question_ScrollTop');
			Functions.DeleteSessionItem('Answer_ScrollTop');

			// Update the registration number.
			document.getElementById('lblRegistrationNumber').innerHTML = Functions.GetSessionItem('RegistrationNumber');

			// Get form elements.
			self.MileageContainer = document.getElementById('MileageContainer');
			self.txtMileage = document.getElementById('txtMileage');
			self.btnMiles = document.getElementById('btnMiles');
			self.btnKMS = document.getElementById('btnKMS');
			self.FuelContainer = document.getElementById('FuelContainer');
			self.txtFuel = document.getElementById('txtFuel');
			self.ValidateMileageValue = true;
			self.ValidateFuelValue = true;

			// Get the vehicle's mileage value, if it's empty, set it to zero.
			if (Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_Mileage', true) == '')
				Functions.SetItem(Functions.GetSessionItem('VehicleID') + '_Mileage', 0);

			// Get the vehicle's fuel value, if it's empty, set it to zero.
			if (Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_Fuel', true) == '')
				Functions.SetItem(Functions.GetSessionItem('VehicleID') + '_Fuel', 0);

			// Get the vehicle's mileage type, if it's empty, set it to miles (1 = Miles, 2 = Kilometers, 4 = hours).
			if (Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_MileageType', true) == '')
				Functions.SetItem(Functions.GetSessionItem('VehicleID') + '_MileageType', 1);

			// Set the mileage and fuel textbox values.
			self.txtMileage.value = Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_Mileage');
			self.txtFuel.value = Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_Fuel');
			self.MileageType = Number((Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_MileageType') == '') ? Functions.GetItem(Functions.GetSessionItem('VehicleID') + '_MileageType') : Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_MileageType'));

			// Check the value, if zero, check session storage.
			if (self.txtMileage.value == '0')
				self.txtMileage.value = Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_Mileage');

			// Check the value, if zero, check session storage.
			if (self.txtFuel.value == '0')
				self.txtFuel.value = Functions.GetSessionItem(Functions.GetSessionItem('VehicleID') + '_Fuel');

			// Store the original mileage value and type.
			self.OriginalMileage = Number(self.txtMileage.value);
			self.OriginalMileageType = Number(self.MileageType);


			// Check the mileage type.
			switch (self.MileageType){
				case 1:
					self.btnMiles_Click();
					break;

				case 2:
					self.btnKMS_Click();
					break;
			}

			// Check the mileage textbox value before moving focus to it, if it's zero, empty the content.
			if (Number(self.txtMileage.value) == 0)
				self.txtMileage.value = '';

			// Focus the mileage textbox.
			if ((window['Platform'] == 'Desktop') || (window['Platform'] == 'DesktopApplication'))
				self.txtMileage.focus();

			// Check the TM apply to type ID to determine whether the fuel detail is required.
			if ((Functions.GetSessionItem('TMApplyToTypeID') == 3) || (Functions.GetSessionItem('TMApplyToTypeID') == 4) || (Functions.GetSessionItem('TMApplyToTypeID') == 7) || (Functions.GetSessionItem('TMApplyToTypeID') == 13)){
				self.FuelContainer.className = "Hide";
				self.ValidateFuelValue = false;
			}
        }
        catch (exc){
            self.OnError(exc);
        }
    }

    //==============================================
    // Mileage textbox keypress event handler.
    //==============================================
	this.txtMileage_KeyPress = function(evt){
		try{
			Functions.NumericOnly(evt, self.btnContinue_Click, false, false);
		}
        catch (exc){
            self.OnError(exc);
        }
	}
	
    //==============================================
    // Mileage textbox blur event handler.
    //==============================================
	this.txtMileage_Blur = function(){
		try{
			self.txtMileage.value = (self.txtMileage.value == '') ? 0 : self.txtMileage.value;
		}
        catch (exc){
            self.OnError(exc);
        }
	}

    //==============================================
    // Fuel texbox keypress event handler.
    //==============================================
	this.txtFuel_KeyPress = function(evt){
		try{
			Functions.NumericOnly(evt, self.btnContinue_Click, false, false);
		}
        catch (exc){
            self.OnError(exc);
        }
	}
	
    //==============================================
    // Fuel textbox blur event handler.
    //==============================================
	this.txtFuel_Blur = function(){
		try{
			self.txtFuel.value = (self.txtFuel.value == '') ? 0 : self.txtFuel.value;
		}
        catch (exc){
            self.OnError(exc);
        }
	}

    //==============================================
    // Miles button click event handler.
    //==============================================
	this.btnMiles_Click = function(){
		try{
			self.btnMiles.className = 'Orange';
			self.btnKMS.className = 'Grey';

			// Check the current mileage type.
			if (self.MileageType != 1){
				self.txtMileage.value = Functions.RoundNumber(Number(self.txtMileage.value / 1.609344), 0);
			}

			self.MileageType = 1;
		}
        catch (exc){
            self.OnError(exc);
        }
	}

    //==============================================
    // KMS button click event handler.
    //==============================================
	this.btnKMS_Click = function(){
		try{
			self.btnMiles.className = 'Grey';
			self.btnKMS.className = 'Orange';

			// Check the current mileage type.
			if (self.MileageType != 2){
				self.txtMileage.value = Functions.RoundNumber(Number(self.txtMileage.value * 1.609344), 0);
			}

			self.MileageType = 2;
		}
        catch (exc){
            self.OnError(exc);
        }
	}
	
	//==============================================
	// Return whether the mileage has been changed.
	//==============================================
	this.MileageChanged = function(){
		try{
			var intCurrentMileageValue = Number(self.txtMileage.value);

			// Check the mileage type.
			if (self.MileageType != self.OriginalMileageType)
			{
				// Convert the mileage value.
				switch (self.OriginalMileageType)
				{
					case 1:
						// Convert to miles.
						intCurrentMileageValue = Functions.RoundNumber(Number(intCurrentMileageValue / 1.609344), 0);
						break;
						
					case 2:
						// Convert to kilometers.
						intCurrentMileageValue = Functions.RoundNumber(Number(intCurrentMileageValue * 1.609344), 0);
						break;
				}
			}

			// Check if the mileage value has been changed.
			if (Number(intCurrentMileageValue) < Number(self.OriginalMileage)){
				return 'Less';
			}
			else{
				if (Number(intCurrentMileageValue) == Number(self.OriginalMileage))
					return 'Same';
			}
		}
        catch (exc){
            self.OnError(exc);
        }
		return 'Greater';
	}

	//==============================================
	// Continue button click event handler.
	//==============================================
	this.btnContinue_Click = function(){
		try{
			if (Functions.GetSessionItem('HeaderControlValidate') == 'true'){
				// Check if the user has entered the mileage.
				if (Number(self.txtMileage.value) == 0){
					self.winMessage = new Message().SimplePrompt('Please enter the current mileage.', function(){
						self.txtMileage.value = '';
						self.txtMileage.focus();
						self.winMessage.Close();
					}, 'Information');
					return;
				}

				// Check if the mileage has been changed.
				if (self.ValidateMileageValue){
					var strMessage = '';
					switch (self.MileageChanged()){
						case 'Less':
							strMessage = 'The mileage value you have entered is less than previously recorded';
							break;

						case 'Same':
							strMessage = 'The mileage value you have entered is the same as previously recorded';
							break;
					}
			
					// Check the message.
					if (strMessage != ''){
						var objControls = new Object();
						objControls.btnYes = document.createElement('BUTTON');
						objControls.btnYes.setAttribute('type', 'button');
						objControls.btnYes.innerHTML = 'Yes';
						objControls.btnYes.IsDefault = true;
						objControls.btnYes.onclick = function(){
							self.ValidateMileageValue = false;
							self.winMessage.Close();
							self.CheckFuelValue();
						};

						objControls.btnNo = document.createElement('BUTTON');
						objControls.btnNo.setAttribute('type', 'button');
						objControls.btnNo.innerHTML = 'No';
						objControls.btnNo.onclick = function(){
							self.winMessage.Close();
							self.txtMileage.value = '';
							self.txtMileage.focus();
						};

						self.winMessage = new Message().Prompt(strMessage + '. Are you sure that you want to continue with this value?', objControls, window['SiteName'], 'Question');
						return;
					}
				}
			
				// Check the fuel value.
				self.CheckFuelValue();
			}
			else{
				// Contine the process.
				self.Continue();
			}
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// Check the fuel value.
	//==============================================
	this.CheckFuelValue = function(){
		try{
			// Check if the fuel should be validated.
			if (self.ValidateFuelValue){
				// Check if the user has entered the fuel.
				if (self.txtFuel){
					if (Number(self.txtFuel.value) == 0){
						var objControls = new Object();
						objControls.btnYes = document.createElement('BUTTON');
						objControls.btnYes.setAttribute('type', 'button');
						objControls.btnYes.innerHTML = 'Yes';
						objControls.btnYes.IsDefault = true;
						objControls.btnYes.onclick = function(){
							self.txtFuel.value = '';
							self.txtFuel.focus();
							self.winMessage.Close();
						};

						objControls.btnNo = document.createElement('BUTTON');
						objControls.btnNo.setAttribute('type', 'button');
						objControls.btnNo.innerHTML = 'No';
						objControls.btnNo.onclick = function(){
							self.winMessage.Close();
							self.ValidateFuelValue = false;
							self.Continue();
						};

						self.winMessage = new Message().Prompt('You haven\'t entered the current fuel level, would you like to do that now?', objControls, window['SiteName'], 'Question');
						return;
					}
				}
			}

			// Contine the process.
			self.Continue();
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==============================================
	// Contine process.
	//==============================================
	this.Continue = function(){
		try{
			// Store the form values.
			Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_Mileage', Number(self.txtMileage.value));
			Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_Hours', 0);
			Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_Fuel', Number(self.txtFuel.value));
			Functions.SetSessionItem(Functions.GetSessionItem('VehicleID') + '_MileageType', self.MileageType);

			// Load the sections.
			Functions.LoadControl(window['SiteIndex'] + '/Sections', Functions.CombineData(['Templates', 'Section', 'Question', 'Answer', 'JobDataItem']));
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

SoapClient.prototype = new Base;
SoapClient.prototype.constructor = SoapClient;

//=========================================================
// Soap client class.
//=========================================================
function SoapClient(URL, Method, Callback, DataObject, WaitMessage){
	var self = this;
	this.Name = 'SoapClient';

	this.Secure = false;
	this.URL = URL + '?op=' + Method,
	this.Method = Method;
	this.Callback = Callback,
	this.DataObject = DataObject,
	this.WaitMessage = WaitMessage;
	this.Async = (((Callback == undefined) || (Callback == null)) ? false : true);
	this.Parameters = new Array();
    this.DisplayNetworkErrors = true;

	//=========================================================
	// Add parameter.
	//=========================================================
	this.AddParameter = function(Name, Value){
		try{
			this.Parameters.push(new Array(Name, Value));
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Send the request.
	//=========================================================
	this.Send = function(){
		try{
            // Check the connection state.
            if (Functions.CheckConnection() == undefined){
				var aResponse = new Array();
				aResponse.push('ERROR');
				aResponse.push('The connection to the Internet is not currently available.');
                
                // Check if network errors should be displayed.
                if (self.DisplayNetworkErrors){
                    new Message().Prompt(aResponse[1], undefined, window['SiteName'], 'Information');
                }

				if (self.WaitWindow)
					self.WaitWindow.Close();

				if (self.Callback)
					self.Callback(aResponse, self.DataObject);
                return;
            }
            
			if (self.WaitMessage)
				self.WaitWindow = new Message().WaitWindow(self.WaitMessage);
            
            // Check if the request will be sent via SSL.
			if (self.Secure){
				self.URL = self.URL.replace('http://', 'https://');
			}

			// Set the country specific URL.
			var strCountrySpecificURL = '.truckfile.co.uk';
			switch (Functions.GetItem('Country'))
			{
				case 'en-gb':
					strCountrySpecificURL = '.truckfile.co.uk';
					break;

				case 'en-au':
					strCountrySpecificURL = '.truckfile.com.au';
					break;

				default:
					strCountrySpecificURL = '.truckfile.co.uk';
					break;
			}

			// Update the URL.
			self.URL = 'https://' + window['SiteIndex'].toLowerCase() + strCountrySpecificURL + self.URL;

			// Create the XML HTTP request object.
			if (window['BrowserName'] == 'IE'){
				if (window['Platform'] == 'DesktopApplication'){
					window.external.SoapClient(self);
					return;
				}
				else{
					self.Request = new XMLHttpRequest();
				}
			}
			else{
				self.Request = new XMLHttpRequest();
			}

			self.Request.open('POST', self.URL, self.Async);
			self.Request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			self.Request.setRequestHeader("Cache-Control", "no-cache");
            self.Request.setRequestHeader("UserName", self.WebServiceUserName);
            self.Request.setRequestHeader("Password", self.WebServicePassword);
            self.Request.setRequestHeader("CompressData", window['CompressData'].toString());
            
			// Check if the request is being sent synchronously or asynchronously.
			if (self.Async){
				// Set up the state changed event handler.
				self.Request.onreadystatechange = StateChange;
				self.Request.send(SoapEnvelope());
			}
			else{
				self.Request.send(SoapEnvelope());

				if (self.WaitWindow)
					self.WaitWindow.Close();

				return ProcessResponse(self.Request.responseText);
			}
		}
		catch(exc){
			if (self.WaitWindow)
				self.WaitWindow.Close();

			self.OnError(exc);
		}
		finally{
			if (!self.Async)
				self.Dispose();
		}
	}
	
	//=========================================================
	// Construct the soap envelope.
	//=========================================================
	function SoapEnvelope(){
		try{
			var strSoapEnvelope = '';

			strSoapEnvelope = '';
			strSoapEnvelope += '<?xml version="1.0" encoding="utf-8"?>';
			strSoapEnvelope += '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
			strSoapEnvelope += '<soap12:Body>';
			strSoapEnvelope += '<' + self.Method  + ' xmlns="' + self.Xmlns + '">';

			// Build the parameters.
			if (self.Parameters != undefined){
				for(var intCounter = 0; intCounter < self.Parameters.length; intCounter++){
					strSoapEnvelope += '<' + self.Parameters[intCounter][0] + '>' + self.Parameters[intCounter][1] + '</' + self.Parameters[intCounter][0] + '>';
				}
			}

			strSoapEnvelope += '</' + self.Method  + '>';
			strSoapEnvelope += '</soap12:Body>';
			strSoapEnvelope += '</soap12:Envelope>';

			return strSoapEnvelope;
		}
		catch(exc){
			if (self.WaitWindow)
				self.WaitWindow.Close();

			self.OnError(exc);
		}
	}

	//=========================================================
	// XML HTTP request state change event handler.
	//=========================================================
	function StateChange(){
		try{
            // Check the XML HTTP request objects state.
			if (self.Request.readyState == 4){
				if ((self.Request.status == 200) || (self.Request.status == 0)){
					// Check if there was an error.
					if (self.Request.responseText == 'ERROR'){
						alert('An error has occured in the soap request the request.\n\n' + ProcessErrorResponse(self.Request.responseText));
					}
					else{
                        // Check if the data was compressed.
                        if (window['CompressData']){
                            if (window['iDevice']){
                                Functions.Decompress(ProcessResponse(self.Request.responseText), Decompress_Completed, ((self.DataObject == undefined) ? null : self.DataObject.Name));
                            }
                            else{
                                Functions.Decompress(ProcessResponse(self.Request.responseText), Decompress_Completed);
                            }
                        }
                        else{
                            self.Callback(ProcessResponse(self.Request.responseText), self.DataObject);
                        }
					}
				}
				else{
					alert('An error has occured in the soap request the request (' + self.Request.status + ').\n\n' + ProcessErrorResponse(self.Request.responseText));
				}

				if (self.WaitWindow)
					self.WaitWindow.Close();

				//self.Dispose();
			}
		}
		catch(exc){
			if (self.WaitWindow)
				self.WaitWindow.Close();

			self.OnError(exc);
		}
	}

	//=========================================================
	// Process the response.
	//=========================================================
	function ProcessResponse(Response){
		try{
			// Check if a fault occured.
			if (Response.indexOf('<soap:Fault>') > 0){
				var aResponse = new Array();
				aResponse.push('ERROR');
				aResponse.push(Response);
				return (aResponse);
			}
			else{
				var strResponse = (Response == undefined ? '' : Response);
				strResponse = strResponse.substring(strResponse.indexOf('<' + self.Method + 'Result>') + ('<' + self.Method + 'Result>').length, strResponse.indexOf('</' + self.Method + 'Result>'));
				strResponse = strResponse.replace(/&lt;/gi, '<');
				strResponse = strResponse.replace(/&gt;/gi, '>');

                // Check if the data is compressed.
                if (window['CompressData']){
                    return strResponse;
                }
                else{
                    var aResponse = strResponse.split('|');
                    return aResponse;
                }
			}
		}
		catch(exc){
			if (self.WaitWindow)
				self.WaitWindow.Close();

			self.OnError(exc);
		}
	}

	//=========================================================
	// Process the response.
	//=========================================================
	this.ProcessResponseExternal = function(Response){
		try{
			var aResponse = Response.split('|');

			// Check if an error occured.
			if (aResponse[0] == 'ERROR')
				alert(aResponse[1]);
            
			if (self.Callback)
				self.Callback(aResponse, self.DataObject);

			if (self.WaitWindow)
				self.WaitWindow.Close();
		}
		catch(exc){
			if (self.WaitWindow)
				self.WaitWindow.Close();

			//self.OnError(exc);
		}
	}

	//=========================================================
	// Process the error from the response.
	//=========================================================
	function ProcessErrorResponse(Response){
		try{
			var strResponse = (Response == undefined ? '' : Response);
			strResponse = strResponse.substring(strResponse.indexOf('<soap:Text xml:lang="en">') + ('<soap:Text xml:lang="en">').length, strResponse.indexOf('</soap:Text>'));
			strResponse = strResponse.replace(/&lt;/gi, '<');
			strResponse = strResponse.replace(/&gt;/gi, '>');
			return strResponse;
		}
		catch(exc){
			if (self.WaitWindow)
				self.WaitWindow.Close();

			self.OnError(exc);
		}
	}
    
    //=========================================================
	// Decompress completed handler.
	//=========================================================
    function Decompress_Completed(Result){
        try{
            if (window['iDevice']){
                var aResponse = Result[0].split('|');

                // Check if an error occured.
                if (aResponse[0] == 'ERROR')
                    alert(aResponse[1]);
                
                self.Callback(aResponse, Result[1]);
            }
            else{
                var aResponse = Result.split('|');

                // Check if an error occured.
                if (aResponse[0] == 'ERROR')
                    alert(aResponse[1]);
                
                self.Callback(aResponse, ((self.DataObject == undefined) ? '' : self.DataObject.Name));
            }

			try{
				if (self.WaitWindow)
					self.WaitWindow.Close();
			}
			catch(exc){}
        }
		catch(exc){
			if (self.WaitWindow)
				self.WaitWindow.Close();

			self.OnError(exc);
		}

		// Dispose of the object.
		self.Dispose();
    }
}

//==================================================
// Base class.
//==================================================
function Base(){
    this.SiteName = (window['SiteName']) ? window['SiteName'] : 'Loading';
    this.SiteIndex = (window['SiteIndex']) ? window['SiteIndex'] : 'Loading';
    this.ApplicationVersion = '0.0';
    this.WebServiceURL = '/proxy/safetycheckapplication.asmx';
    this.Xmlns = 'http://proxy.truckfile.co.uk/';
    this.WebServiceUserName = 'eNrzNEwqNcgzAAAIhgIg';
    this.WebServicePassword = 'eNrzMK60MMzPSzEEAA28AtA=';
	this.Debug = false;
	this.DebugData = false;
}

//=========================================================
// Dispose handler.
//=========================================================
Base.prototype.Dispose = function(){
	try{
        // Loop through the elements in the object.
		for (Element in this){
			if (typeof(this[Element]) != 'function'){
				// Ignore the name property.
				if (Element == 'Name')
					continue;

				if ((this[Element] != undefined) || (this[Element] != null)){
					if (Element != 'undefined'){
						this[Element] = null;
						delete this[Element];
					}
				}
			}
		}
	}
	catch (exc){
		this.OnError(exc);
	}
}

//=========================================================
// Page load event handler.
//=========================================================
Base.prototype.Load = function(){
	try{
		this.Debug = (window['Platform'] == 'Desktop') ? this.Debug : false;
		this.DebugData = (window['Platform'] == 'Desktop') ? this.DebugData : false;

		// Check if the country has been selected, if not, default to United Kingdon (en-gb).
		if (Functions.GetItem('Country') == '')
			Functions.SetItem('Country', 'en-gn');

		// Set the image capture quality.
		if (Functions.GetItem('ImageQuality') == '')
			Functions.SetItem('ImageQuality', 50);

		// Set the image capture target width
		if (Functions.GetItem('ImageTargetWidth') == '')
			Functions.SetItem('ImageTargetWidth', 500);

		// Set the image capture target height
		if (Functions.GetItem('ImageTargetHeight') == '')
			Functions.SetItem('ImageTargetHeight', 500);
		
		document.getElementById('BodyContainer').className = '';
		try{
			document.getElementById('BodyContainer').focus();
		}
		catch(exc){
			// Do nothing.
		}
		
		window.onerror = this.OnError;
	}
	catch (exc){
		this.OnError(exc);
	}
}

//=========================================================
// Page UnLoad event handler.
//=========================================================
Base.prototype.UnLoad = function(){
	try{
		this.Dispose();
	}
	catch (exc){
		this.OnError(exc);
	}
}

//=========================================================
// Display error event handler.
//=========================================================
Base.prototype.OnError = function(Exception, URL, LineNumber){
	alert('The following error has occured ' + ((this.Name == undefined) ? '' : 'in \'' + this.Name + '\'') + ': -\n'
			+ ((Exception.stack == undefined) ? '\nException: ' + Exception : '\nStack Trace: ' + Exception.stack)
			+ ((URL == undefined) ? '' : '\nURL: ' + URL)
			+ ((LineNumber == undefined) ? '' : '\nLineNumber: ' + LineNumber)
			);
}

//=========================================================
// Plugin success handler.
//=========================================================
Base.prototype.PluginSuccess = function(){
}

//=========================================================
// Plugin error handler.
//=========================================================
Base.prototype.PluginError = function(Error){
	alert(Error);
}

//=========================================================
// Cordova error handler.
//=========================================================
Base.prototype.CordovaError = function(evt){
    alert(evt.target.error.code);
}

//=========================================================
// Session manager.
//=========================================================
Base.prototype.SessionManager = function(){
	try{
		window['SessionManagerPoll'] = true;
	}
	catch (exc){
		this.OnError(exc);
	}
}

//=========================================================
// Set the branding for the site.
//=========================================================
Base.prototype.SetBranding = function(){
	try{
		if (document.getElementById('LogoTitle') != undefined)
			document.getElementById('LogoTitle').innerHTML = window['LogoTitle'];

		if (document.getElementById('LogoImage') != undefined)
			document.getElementById('LogoImage').src = window['LogoImage'];

		if (document.getElementById('Logo') != undefined)
			document.getElementById('Logo').className = '';

		// Check if running on a desktop.
		if (window['Platform'] == 'Desktop'){
			var objHead = document.getElementsByTagName('head')[0];
			var objHeadElement = document.createElement('link');
			objHeadElement.rel = 'icon';
			objHeadElement.type = 'Images/x-icon';
			objHeadElement.href = window['FavIcon'];
			objHead.appendChild(objHeadElement);

			var objHeadElement = document.createElement('link');
			objHeadElement.rel = 'shortcut icon';
			objHeadElement.type = 'Images/x-icon';
			objHeadElement.href = window['FavIcon'];
			objHead.appendChild(objHeadElement);
		}
	}
	catch (exc){
		this.OnError(exc);
	}
}

window['SessionManagerPoll'] = false;

// Set the session manager interval.
window.setInterval(function(){
	if (!window['SessionManagerPoll'])
		return;

	// Check if an application restart is required.
	if (Functions.GetSessionItem('ApplicationRestart').toString() == 'true'){
		ApplicationUpdate();
	}

	// Check the users ID.
	if (Functions.GetSessionItem('XUserID') == ''){
		window.setTimeout(function(){
			window['SessionManagerPoll'] = false;
			Functions.LoadControl('Login');

			new Message().Prompt('You have been logged out.', undefined, window['SiteName'], 'Information');
		}, 20);
	}
}, 1000);

// DateEx.js - JavaScript Date object extensions
	
// ====================
// === String to date ===
// ====================
// returns:		[Date], parameter String, format: 2010-09-08T00:00:00
	function StringToDate(DateString)
	{
		var intYear = Number(DateString.toString().substring(0, 4));
		var intMonth = Number(DateString.toString().substring(5, 7)) - 1;
		var intDay = Number(DateString.toString().substring(8, 10));
		var intHour = Number(DateString.toString().substring(11, 13));
		var intMinute = Number(DateString.toString().substring(14, 16));
		var intSecond = Number(DateString.toString().substring(17, 19));
		
		return new Date(intYear, intMonth, intDay, intHour, intMinute, intSecond);
	}
	
// ====================
// === String to date2 ===
// ====================
// returns:		[Date], parameter String, format: 06/09/2010 00:00:00
	function StringToDate2(DateString)
	{
		var intYear = Number(DateString.toString().substring(6, 10));
		var intMonth = Number(DateString.toString().substring(3, 5)) - 1;
		var intDay = Number(DateString.toString().substring(0, 2));
		var intHour = Number(DateString.toString().substring(11, 13));
		var intMinute = Number(DateString.toString().substring(14, 16));
		var intSecond = Number(DateString.toString().substring(17, 19));
		
		return new Date(intYear, intMonth, intDay, intHour, intMinute, intSecond);
	}

// ====================
// Get the date in SQL format YYYY-MM-DD HH:MM:SS
// ====================
	Date.prototype.ToSQLFormat = function(){
		return this.getFullYear() + '-' + this.PadLeft((this.getMonth() + 1), 2, '0') + '-' + this.PadLeft(this.getDate(), 2, '0') + 'T' + this.PadLeft(this.getHours(), 2, '0') + ':' + this.PadLeft(this.getMinutes(), 2, '0') + ':' + this.PadLeft(this.getSeconds(), 2, '0');
	}

// ====================
// Get the date as UTC.
// ====================
	Date.prototype.ToUTCFormat = function(){
		return Date.UTC(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
	}

	//=====================================================================
	// Left pad a value.
	//=====================================================================
	Date.prototype.PadLeft = function(Value, Length, Character)
	{
		try
		{
			var objRegExp = new RegExp(".{" + Length + "}$");
			var pad = "";
			
			if (!Character) Character = " ";
			do  {
				pad += Character;
			}while(pad.length < Length);
			
			return objRegExp.exec(pad + Value)[0];
		}
		catch (exc)
		{
			Functions.ApplicationError(THIS.Name + ".PadLeft()", exc);
		}
		return;
	}
	
// ====================
// === getDayOfYear ===
// ====================
// returns:			[Integer]	the day of the year (eg Jan 4 would be day 4)
	Date.prototype.getDayOfYear = function()
	{
		// declare local variables
		var dtDate = new Date(this.getFullYear(), 0, 1);
		var lngDayOfYear = this.getDayDifference(dtDate);

		// the result will be a negative value, so convert to positive.
		lngDayOfYear *= -1;

		// increment, as our starting number is 1, rather than 0
		lngDayOfYear++;

		// return the day of the year
		return lngDayOfYear;
	}

// =====================
// === getWeekOfYear ===
// =====================
// returns:			[Integer]	the week number of the year (Week 1 is the week in which Jan 4 occurs. Week is Sun-Sat)
	Date.prototype.getWeekOfYear = function()
	{	
		// declare local variables
		var dtDate = new Date(this.getFullYear(), 0 , 1);
		var lngDay = dtDate.getDay();
		if(lngDay == 0)
		{
			lngDay = 7;
		}

		var lngDifference = 0;
		var lngWeekNo = 1;

		// crank the day back to the beginning of the week
		dtDate.setDate((lngDay * -1) + 1);

		// get the number of days
		lngDifference = this.getDayDifference(dtDate) * -1;
		
		// decrement as days are 1-based, not 0-based
		lngDifference--;

		// divide by seven to get the number of weeks
		lngDifference /= 7;

		// get the integer part and increment (as week numbers are 1-based not 0-based)
		lngWeekNo = parseInt(lngDifference, 10) + 1;

		// if the first day of the year is on friday or later, add an extra week
//		if(lngDay > 3)
//		{
//			lngWeekNo -= 1;
//		}

		// return the week number
		return lngWeekNo;
	}

// =====================
// === getDifference ===
// =====================
// in: strInterval	[String]	the interval to which the difference is calculated, valid values for strInterval are, 
//								'ms' - milliseconds
//								's'  - seconds
//								'mn' - minutes
//								'h'  - hours
//								'd'  - days (hrs, mins, secs and msecs are ignored)
//								'w'  - weeks (7-day unit)
//								'ww' - weeks (by week number)
//								'm'  - months (days are ignored)
//								'y'  - years (months are ignored)
//								Any other value causes the function to return null.
//
// in: dtDate		[Date]		the date with which, we wish to calculate the difference.
//
// returns:			[Integer]	the difference, in the number of intervals as specified by strInterval, between 
//								dtDate and this Date object, or null if the calculation could not be performed.
	Date.prototype.getDifference = function getDifference(strInterval, dtDate)
	{
		// validate the incoming parameters
		if(strInterval.constructor != String)
		{
			return null;
		}

		if(dtDate.constructor != Date)
		{
			return null;
		}

		// declare local variables
		var lngDifference = 0;
		var regExp = /\s/;
		
		// trim the interval parameter and convert to lower case
		strInterval = strInterval.replace(regExp, "");
		strInterval = strInterval.toLowerCase();
		
		// test the interval parameter to see what interval we wish to use
		switch(strInterval)
		{	
			// milliseconds
			case "ms"	:	lngDifference = this.getMillisecondsDifference(dtDate);
							break;

			// seconds
			case "s"	:	lngDifference = this.getSecondsDifference(dtDate);
							break;

			// minutes
			case "mn"	:	lngDifference = this.getMinutesDifference(dtDate);
							break;

			// hours
			case "h"	:	lngDifference = this.getHoursDifference(dtDate);
							break;

			// days
			case "d"	:	lngDifference = this.getDayDifference(dtDate);
							break;
			
			// weeks
			case "w"	:	lngDifference = this.getWeekDifference(dtDate);
							break;
			
			// weeks (by week no)
			case "ww"	:	lngDifference = this.getWeekNoDifference(dtDate);
							break;

			// months
			case "m"	:	lngDifference = this.getMonthDifference(dtDate);
							break;
			
			// years
			case "y"	:	lngDifference = this.getYearDifference(dtDate);
							break;
			
			// unknown
			default		:	lngDifference = null;
		}
		
		// return the difference
		return lngDifference;
	}

// =================================
// === getMillisecondsDifference ===
// =================================
// in: dtDate		[Date]		the date with which, we wish to calculate the difference.
//
// returns:			[Integer]	the difference, in milliseconds, between dtDate and this Date object,
//								or null if the calculation could not be performed.
	Date.prototype.getMillisecondsDifference = function(dtDate)
	{
		// check the incoming date parameter
		if(dtDate.constructor != Date)
		{
			return null;
		}

		// declare local variables and calculate the difference
		var lngDifference = Date.parse(dtDate) - Date.parse(this);

		// return the difference
		return parseInt(lngDifference, 10);
	}

// ============================
// === getSecondsDifference ===
// ============================
// in: dtDate		[Date]		the date with which, we wish to calculate the difference.
//
// returns:			[Integer]	the difference, in seconds, between dtDate and this Date object,
//								or null if the calculation could not be performed.
	Date.prototype.getSecondsDifference = function(dtDate)
	{
		// check the incoming date parameter
		if(dtDate.constructor != Date)
		{
			return null;
		}

		// declare local variables and calculate the difference
		var lngDifference = Date.parse(dtDate) - Date.parse(this);

		// now divide by 1000 to get the seconds
		lngDifference /= 1000;

		// return the difference
		return parseInt(lngDifference, 10);
	}

// ============================
// === getMinutesDifference ===
// ============================
// in: dtDate		[Date]		the date with which, we wish to calculate the difference.
//
// returns:			[Integer]	the difference, in minutes, between dtDate and this Date object,
//								or null if the calculation could not be performed.
	Date.prototype.getMinutesDifference = function(dtDate)
	{
		if(dtDate.constructor != Date)
		{
			return null;
		}

		// declare local variables and calculate the difference
		var lngDifference = Date.parse(dtDate) - Date.parse(this);

		// now divide by (1000 * 60) to get the minutes
		lngDifference /= (1000 * 60);

		// return the difference
		return parseInt(lngDifference, 10);
	}

// ==========================
// === getHoursDifference ===
// ==========================
// in: dtDate		[Date]		the date with which, we wish to calculate the difference.
//
// returns:			[Integer]	the difference, in hours, between dtDate and this Date object,
//								or null if the calculation could not be performed.
	Date.prototype.getHoursDifference = function(dtDate)
	{
		if(dtDate.constructor != Date)
		{
			return null;
		}

		// declare local variables and calculate the difference
		var lngDifference = Date.parse(dtDate) - Date.parse(this);

		// now divide by (1000 * 60 * 60) to get the hours
		lngDifference /= (1000 * 60 * 60);

		// return the difference
		return parseInt(lngDifference, 10);
	}

// ========================
// === getDayDifference ===
// ========================
// in: dtDate		[Date]		the date with which, we wish to calculate the difference.
//
// returns:			[Integer]	the difference, in days, between dtDate and this Date object,
//								or null if the calculation could not be performed.
	Date.prototype.getDayDifference = function(dtDate)
	{
		// check our incoming date parameter
		if(dtDate.constructor != Date)
		{
			return null;
		}

		// declare local variables
		var lngDifference = 0;
		var dtDate1 = new Date(this.getFullYear(), this.getMonth(), this.getDate());
		var dtDate2 = new Date(dtDate.getFullYear(), dtDate.getMonth(), dtDate.getDate());
		
		// calculate the difference in milliseconds
		lngDifference = Date.parse(dtDate2) - Date.parse(dtDate1);
		
		// now divide to convert milliseconds into days
		lngDifference /= (1000 * 60 * 60 * 24);
		
		// return the difference
		return parseInt(lngDifference, 10);
	}

// =========================
// === getWeekDifference ===
// =========================
// in: dtDate		[Date]		the date with which, we wish to calculate the difference.
//
// returns:			[Integer]	the difference, in weeks(7-day units), between dtDate and this Date object,
//								or null if the calculation could not be performed.
	Date.prototype.getWeekDifference = function(dtDate)
	{
		// check our incoming date parameter
		if(dtDate.constructor != Date)
		{
			return null;
		}

		// declare local variables
		var lngDifference = this.getDayDifference(dtDate);
		
		// now divide to convert days into weeks
		lngDifference /= 7;
		
		// return the difference
		return parseInt(lngDifference, 10);
	}

// ===========================
// === getWeekNoDifference ===
// ===========================
// in: dtDate		[Date]		the date with which, we wish to calculate the difference.
//
// returns:			[Integer]	the difference, in weeks(by week number), between dtDate and this Date object,
//								or null if the calculation could not be performed.
	Date.prototype.getWeekNoDifference = function(dtDate)
	{
		// check our incoming date parameter
		if(dtDate.constructor != Date)
		{
			return null;
		}

		// declare local variables
		var lngDifference = dtDate.getWeekOfYear() - this.getWeekOfYear();

		// return the difference
		return lngDifference;
	}

// ==========================
// === getMonthDifference ===
// ==========================
// in: dtDate		[Date]		the date with which, we wish to calculate the difference.
//
// returns:			[Integer]	the difference, in months, between dtDate and this Date object,
//								or null if the calculation could not be performed.
	Date.prototype.getMonthDifference = function(dtDate)
	{
		// declare local variables
		var lngDifference	= 0;
		var lngYearDiff		= 0;
		var lngMonthDiff	= 0;
		
		// check our incoming date parameter
		if(dtDate.constructor != Date)
		{
			return null;
		}
		
		// calculate the difference between the year part of the dates
		lngYearDiff = this.getYearDifference(dtDate);

		// calculate the difference between the month part of the dates
		lngMonthDiff = dtDate.getMonth() - this.getMonth();
		
		// calculate the difference in months, between the dates
		lngDifference = (lngYearDiff * 12) + lngMonthDiff;
		
		// return the difference
		return parseInt(lngDifference, 10);
	}

// =========================
// === getYearDifference ===
// =========================
// in: dtDate		[Date]		the date with which, we wish to calculate the difference.
//
// returns:			[Integer]	the difference, in years, between dtDate and this Date object,
//								or null if the calculation could not be performed.
	Date.prototype.getYearDifference = function(dtDate)
	{
		// check our incoming date parameter
		if(dtDate.constructor != Date)
		{
			return null;
		}
	
		// calculate the difference between the year part of the dates
		lngDifference = dtDate.getFullYear() - this.getFullYear();
		
		// return the difference
		return parseInt(lngDifference, 10);
	}

// ====================
// === getMonthName ===
// ====================
// returns:			[String]	the name of the month stored in this Date object, or null if the month value
//								is not valid.
	Date.prototype.getMonthName = function()
	{
		// declare local variables
		var strMonthName;

		// which month name do we want?
		switch(this.getMonth())
		{
			case 0	:	strMonthName = "January";
						break;
			
			case 1	:	strMonthName = "February";
						break;

			case 2	:	strMonthName = "March";
						break;

			case 3	:	strMonthName = "April";
						break;

			case 4	:	strMonthName = "May";
						break;

			case 5	:	strMonthName = "June";
						break;
			
			case 6	:	strMonthName = "July";
						break;
			
			case 7	:	strMonthName = "August";
						break;

			case 8	:	strMonthName = "September";
						break;

			case 9	:	strMonthName = "October";
						break;

			case 10	:	strMonthName = "November";
						break;

			case 11	:	strMonthName = "December";
						break;

			default	:	strMonthName = null;
		}
		
		// return the month name
		return strMonthName;
	}

// ======================
// === getWeekdayName ===
// ======================
// returns:			[String]	the name of the weekday stored in this Date object, or null 
//								if the weekday value is not valid.
	Date.prototype.getWeekdayName = function()
	{		
		// declare local variables
		var strWeekdayName;

		// which weekday name do we want?
		switch(this.getDay())
		{
			case 0	:	strWeekdayName = "Sunday";
						break;

			case 1	:	strWeekdayName = "Monday";
						break;

			case 2	:	strWeekdayName = "Tuesday";
						break;

			case 3	:	strWeekdayName = "Wednesday";
						break;

			case 4	:	strWeekdayName = "Thursday";
						break;

			case 5	:	strWeekdayName = "Friday";
						break;

			case 6	:	strWeekdayName = "Saturday";
						break;

			default	:	strWeekdayName = null;
		}
		
		// return the weekday name
		return strWeekdayName;
	}

// =====================
// === getDateSuffix ===
// =====================
// returns:			[String]	the suffix, i.e. "st", "nd", "rd", "th" of the day part of this Date object.
	Date.prototype.getDateSuffix = function()
	{
		// declare local variables
		var strSuffix;
		
		// which day of the month is it?
		switch(this.getDate())
		{
			case 1	:
			case 21	:
			case 31	:	strSuffix = "st";
						break;
			
			case 2	:
			case 22	:	strSuffix = "nd";
						break;

			case 3	:
			case 23 :	strSuffix = "rd";
						break;

			default	:	strSuffix = "th";
		}
		
		// return the suffix
		return strSuffix;
	}

// ===================
// === getLongDate ===
// ===================
// returns:			[String]	the long string format representation of the Date - eg "Monday 1st January, 2002"
	Date.prototype.getLongDate = function()
	{
		// declare local variables
		var strDate;

		// build the long date
		strDate = this.getWeekdayName() + " " + this.getDate().toString() + this.getDateSuffix() + " " + this.getMonthName() + ", " + this.getFullYear().toString();

		return strDate;
	}
	
// ===================
// === getLongDateSimple ===
// ===================
// returns:			[String]	the long string format representation of the Date - eg "1 January 2002"
	Date.prototype.getLongDateSimple = function()
	{
		// declare local variables
		var strDate;

		// build the long date
		strDate = this.getDate().toString() + " " + this.getMonthName() + " " + this.getFullYear().toString();

		return strDate;
	}
	
// ===================
// === getLongDateSimpleWithSuffix ===
// ===================
// returns:			[String]	the long string format representation of the Date - eg "1st January 2002"
	Date.prototype.getLongDateSimpleWithSuffix = function()
	{
		// declare local variables
		var strDate;

		// build the long date
		strDate = this.getDate().toString() + this.getDateSuffix() + " " + this.getMonthName() + " " + this.getFullYear().toString();

		return strDate;
	}

// ====================
// === getShortDate ===
// ====================
// returns			[String]	the short string format representation of the Date as dd/mm/yyyy
//								eg "01/01/2001"
	Date.prototype.getShortDate = function()
	{
		// declare local variables
		var strDay = this.getDate().toString();
		var strMonth = (this.getMonth() + 1).toString();
		var strYear = this.getFullYear().toString();

		// check if the day needs a leading zero
		if(strDay.length < 2)
		{
			strDay = "0" + strDay;
		}

		// check if the month needs a leading zero
		if(strMonth.length < 2)
		{
			strMonth = "0" + strMonth;
		}

		// return the short date
		return strDay + "/" + strMonth + "/" + strYear;
	}

// ======================
// === getDaysInMonth ===
// ======================
// returns			[Integer]	the number of days in the month of the Date object (28, 29, 30, 31)
	Date.prototype.getDaysInMonth = function()
	{
		// declare local variables
		var dtDate1 = new Date(this.getFullYear(), this.getMonth(), 1);
		var dtDate2 = new Date(this.getFullYear(), this.getMonth(), 1);
		var lngDifference = 0;
		
		// add one month to the second date
		dtDate2.setMonth(dtDate1.getMonth() + 1);

		// now get the difference
		lngDifference = dtDate1.getDifference("d", dtDate2);

		// return the number of days
		return lngDifference;
	}

// ==========================
// === getFirstDayOfMonth ===
// ==========================
// returns			[Integer]	the enumerated value for the day of the week the first day of the month
//								of this Date object falls on.
	Date.prototype.getFirstDayOfMonth = function()
	{
		// declare local variables
		dtDate = new Date(this.getFullYear(), this.getMonth(), 1);

		// return the weekday
		return dtDate.getDay();
	}

// ===============
// === dateAdd ===
// ===============
// in: strInterval	[String]	the interval we wish to add to the date, valid values for strInterval are, 
//								'ms' - milliseconds
//								's'  - seconds
//								'mn' - minutes
//								'h'  - hours
//								'd'  - days 
//								'w'  - weeks (7-day unit)
//								'm'  - months 
//								'y'  - years 
//
//	in:	lngNumber	[Integer]	the number of intervals to add to the date
//	
//	returns:		[Boolean]	indicates success or failure of the method.
	Date.prototype.dateAdd = function(strInterval, lngNumber)
	{
		// validate the incoming parameters
		if(strInterval.constructor != String)
		{
			return false;
		}

		if(lngNumber.constructor != Number)
		{
			return false;
		}

		// declare local variables
		var regExp = /\s/;
		
		// trim the interval parameter and convert to lower case
		strInterval = strInterval.replace(regExp, "");
		strInterval = strInterval.toLowerCase();
		
		// test the interval parameter to see what interval we wish to use
		switch(strInterval)
		{	
			// milliseconds
			case "ms"	:	this.setMilliseconds(this.getMilliseconds() + lngNumber);
							break;

			// seconds
			case "s"	:	this.setSeconds(this.getSeconds() + lngNumber);
							break;

			// minutes
			case "mn"	:	this.setMinutes(this.getMinutes() + lngNumber);
							break;

			// hours
			case "h"	:	this.setHours(this.getHours() + lngNumber);
							break;

			// days
			case "d"	:	this.setDate(this.getDate() + lngNumber);
							break;
			
			// weeks
			case "w"	:	this.setDate(this.getDate() + (lngNumber * 7))
							break;
			
			// months
			case "m"	:	this.setMonth(this.getMonth() + lngNumber)
							break;
			
			// years
			case "y"	:	this.setYear(this.getFullYear() + lngNumber)
							break;
			
			// unknown
			default		:	return false;
		}
		
		// return success
		return true; 
	}

Message.prototype = new Base;
Message.prototype.constructor = Message;

//=========================================================
// Message class.
//=========================================================
function Message(){
	var self = this;
	this.IsWaitWindow = false;
	this.IsPopupWindow = false;
	this.Name = 'Message';
	this.Width = (window.innerWidth == undefined) ? document.documentElement.clientWidth : window.innerWidth;
	this.Height = (window.innerHeight == undefined) ? document.documentElement.clientHeight : window.innerHeight;

	//=========================================================
	// Render the lock layer.
	//=========================================================
	this.RenderLockLayer = function(){
		try{
			if (window['zIndex'] == undefined)
				window['zIndex'] = 99;

			window['zIndex']++;

			self.LockLayer = document.createElement('DIV');
			self.LockLayer.id = self.GUID + 'LockLayer';
			self.LockLayer.className = 'LockLayer';
			self.LockLayer.style.zIndex = window['zIndex'];
		}
		catch(exc){
			self.OnError(exc);
		}
	}
	
	//=========================================================
	// Render the message container.
	//=========================================================
	this.RenderMessageContainer = function(){
		try{
			window['zIndex']++;

			self.MessageContainer = document.createElement('DIV');
			self.MessageContainer.id = self.GUID + 'MessageContainer';
			self.MessageContainer.className = 'MessageContainer ' + ((self.Title == undefined) ? '' : self.Title.replace(/ /g, '').replace(/-/g, ''));
			self.MessageContainer.style.zIndex = window['zIndex'];
		}
		catch(exc){
			self.OnError(exc);
		}
	}
	
	//=========================================================
	// Render default items, title, controls container etc...
	//=========================================================
	this.RenderDefaultItems = function(){
		try{
			self.TitleContainer = document.createElement('DIV');
			self.ContentContainer = document.createElement('DIV');
			self.ControlsContainer = document.createElement('DIV');

			self.TitleContainer.className = 'MessageTitle';
			self.ContentContainer.className = 'MessageContent';
			self.ControlsContainer.className = 'MessageControls';
			self.TitleContainer.innerHTML = (self.Title == undefined) ? window['SiteName'] : self.Title;

			if (document.addEventListener){
				window.addEventListener('mousemove', self.OnMouseMove, false);
			}
			else{
				document.attachEvent('onmousemove', self.OnMouseMove);
			}

			self.TitleContainer.parent = self;
			self.TitleContainer.onmousedown = function(evt){
				evt = (evt == undefined) ? window.event : evt;
				self.WindowedObjectOffsetX = evt.offsetX;
				self.WindowedObjectOffsetY = evt.offsetY;
				self.WindowedObject = this.parent.MessageContainer;
			};
			self.TitleContainer.onmouseup = function(evt){
				evt = (evt == undefined) ? window.event : evt;
				delete self.WindowedObjectOffsetY;
				delete self.WindowedObjectOffsetX;
				delete self.WindowedObject;
			}

			self.MessageContainer.appendChild(self.TitleContainer);
			self.MessageContainer.appendChild(self.ContentContainer);
			self.MessageContainer.appendChild(self.ControlsContainer);
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// OnMouseMove event handler.
	//=========================================================
	this.OnMouseMove = function(evt){
		try{
			var objSourceElement = evt.srcElement ? evt.srcElement : evt.target;
		
			if (self.WindowedObject == undefined)
				return;

			// Check if a window object is defined.
			if (self.WindowedObject){
				self.WindowedObject.style.top = (evt.clientY - ((self.WindowedObjectOffsetY == undefined) ? 0 : self.WindowedObjectOffsetY)) + 'px';
				self.WindowedObject.style.left = (evt.clientX - ((self.WindowedObjectOffsetX == undefined) ? 0 : self.WindowedObjectOffsetX)) + 'px';
			}
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Add the controls.
	//=========================================================
	this.AddControls = function(){
		try{
			for(Button in self.Controls){
				self.Controls[Button].parent = self;

				if (self.Controls[Button].onclick == null)
					self.Controls[Button].onclick = self.Close;

				self.ControlsContainer.appendChild(self.Controls[Button]);
			}

			Functions.BackButtonHandler(self.Close);
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Focus the default control.
	//=========================================================
	this.FocusDefaultControl = function(){
		try{
			for(Button in self.Controls){
				if (self.Controls[Button].IsDefault){
					if (!self.Controls[Button].disabled)
						self.Controls[Button].focus();
				}
			}
		}
		catch(exc){
			self.OnError(exc);
		}
	}
	
	//=========================================================
	// Position.
	//=========================================================
	this.Position = function(){
		try{
			document.body.appendChild(self.LockLayer);
			document.body.appendChild(self.MessageContainer);

			var intWidth = (self.IsPopupWindow) ? (self.Width - 50) : 300;
			var intHeight = (self.IsPopupWindow) ? (self.Height - 50) : 300;

			self.MessageContainer.style.width = ((self.FrameWidth == undefined) ? intWidth : self.FrameWidth) + 'px';

			if (self.Title == 'View Image'){
				self.ContentContainer.className = 'MessageContent ViewImageContent';
				self.ControlsContainer.className = 'MessageControls ViewImageControls';
				self.MessageContainer.style.height = ((self.FrameHeight == undefined) ? intHeight : self.FrameHeight) + 'px';
			}

			self.MessageContainer.style.left = (self.Width / 2) - (self.MessageContainer.offsetWidth / 2) + 'px';
			self.MessageContainer.style.top = (self.Height / 2) - (self.MessageContainer.offsetHeight / 2) + 'px';

			// Focus the default control.
			self.FocusDefaultControl();
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Render the message.
	//=========================================================
	this.Render = function(Text, Controls, Title, Icon){
		try{
			self.GUID = Functions.GUID();
			self.Controls = Controls;
			self.Title = Title;

			// Render the lock layer and message container.
			self.RenderLockLayer();
			self.RenderMessageContainer();
			self.RenderDefaultItems();
	
			// Add the controls.
			self.AddControls();

			if (Icon){
				var objIcon = document.createElement('IMG');
				objIcon.src = 'Images/' + Icon + '.png';
				objIcon.align = 'left';
				self.ContentContainer.appendChild(objIcon);
			}

			var objText = document.createElement('SPAN');
			objText.innerHTML = Text;
			self.ContentContainer.appendChild(objText);

			// Position.
			self.Position();
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Loaded event handler.
	//=========================================================
	this.Loaded = function Loaded(){
		try{
			// Position.
			self.Position();

			// Invoke the callback handler.
			if (self.Callback)
				self.Callback();
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Close handler.
	//=========================================================
	this.Close = function(evt){
		try{
			if (self.parent){
				if (document.addEventListener){
					window.removeEventListener('mousemove', self.parent.OnMouseMove, false);
				}
				else{
					document.detachEvent('onmousemove', self.parent.OnMouseMove);
				}

				if (document.getElementById(self.parent.LockLayer.id) != undefined){
					document.body.removeChild(document.getElementById(self.parent.LockLayer.id));
					document.body.removeChild(document.getElementById(self.parent.MessageContainer.id));
				}
				self.parent.Dispose();
			}else{
				if (document.addEventListener){
					window.removeEventListener('mousemove', self.OnMouseMove, false);
				}
				else{
					document.detachEvent('onmousemove', self.OnMouseMove);
				}

				try{
					if (document.getElementById(self.LockLayer.id) != undefined){
						document.body.removeChild(document.getElementById(self.LockLayer.id));
						document.body.removeChild(document.getElementById(self.MessageContainer.id));
					}
				}catch(exc){}

				if (!self.IsWaitWindow){
					if (self.IsWaitWindow != undefined)
						Functions.RemoveBackButtonHandler();
				}

				self.Dispose();
			}
		}
		catch(exc){
			if (self.parent){
				self.parent.OnError(exc);
			}else{
				self.OnError(exc);
			}
		}
	}

	//=========================================================
	// Wait window handler.
	//=========================================================
	this.WaitWindow = function(Text){
		try{
			self.GUID = Functions.GUID();

			// Render the lock layer.
			self.RenderLockLayer();

			window['zIndex']++;
			self.MessageContainer = document.createElement('DIV');
			self.MessageContainer.id = self.GUID + 'WaitWindowContainer';
			self.MessageContainer.className = 'WaitWindowContainer';
			self.MessageContainer.style.zIndex = window['zIndex'];
			self.IsWaitWindow = true;

			var objContent = document.createElement('DIV');
			objContent.innerHTML = Text;
			objContent.className = 'WaitWindowContent';

			self.MessageContainer.appendChild(objContent);

			// Position.
			self.FrameWidth = 260;
			self.Position();
			return this;
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Alter handler.
	//=========================================================
	this.Alert = function(Text){
		try{
			var objControls = new Object();
			objControls.btnOK = document.createElement('BUTTON');
			objControls.btnOK.setAttribute('type', 'button');
			objControls.btnOK.innerHTML = 'OK';
			objControls.btnOK.IsDefault = true;
			objControls.btnOK.onclick = self.Close;

			self.Render(Text, objControls);
			return this;
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Simple prompt handler.
	//=========================================================
	this.SimplePrompt = function(Question, OnClick, Icon){
		try{
			var objControls = new Object();
			objControls.btnOK = document.createElement('BUTTON');
			objControls.btnOK.setAttribute('type', 'button');
			objControls.btnOK.innerHTML = 'OK';
			objControls.btnOK.IsDefault = true;
			objControls.btnOK.onclick = OnClick;

			self.Render(Question, objControls, undefined, Icon);
			return this;
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Prompt handler.
	//=========================================================
	this.Prompt = function(Question, Controls, Title, Icon){
		try{
			if (Controls == undefined){
				Controls = new Object();
				Controls.btnClose = document.createElement('BUTTON');
				Controls.btnClose.setAttribute('type', 'button');
				Controls.btnClose.innerHTML = 'Close';
				Controls.btnClose.IsDefault = true;
			}

			self.Render(Question, Controls, Title, Icon);
			return this;
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Popup window handler.
	//=========================================================
	this.PopupWindow = function(XML, XSLT, Title, Controls, Width, Callback, Relative){
		try{
			self.GUID = Functions.GUID();
			self.Title = Title;
			self.Controls = Controls;
			self.FrameWidth = Width;
			self.Callback = Callback;
			self.IsPopupWindow = true;

			// Render the lock layer and message container.
			self.RenderLockLayer();
			self.RenderMessageContainer();
			self.RenderDefaultItems();

			// Add the controls.
			self.AddControls();

			// Transform the XML/XSLT.
			new Transform().Render(self.ContentContainer, XML, XSLT, undefined, self.Loaded, ((Relative == undefined) ? false : Relative));

			return this;
		}
		catch(exc){
			self.OnError(exc);
		}
	}
}

﻿DataProcessor.prototype = new Base;
DataProcessor.prototype.constructor = DataProcessor;

//==================================================
// Data processor class.
//==================================================
function DataProcessor(){
	var self = this;
	this.Name = 'DataProcessor';
	this.Queue = new Object();
	this.tmrProcessor = window.setTimeout(ProcessQueue, 1000);
	this.Debug = false;

	//==============================================
	// All local files to queue for processing.
	//==============================================
	this.AddLocalToQueue = function(){
		try{
			Functions.FileList('*.tmp', self.FileList);
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// File list callback handler.
	//==============================================
	this.FileList = function(Files){
		try{
			// Check if there are any files to add to the queue.
			if ((Files == undefined) || (Files == ''))
				return;

			var aFiles = Files.split(',');
			self.QueueLength = aFiles.length;

			// Loop through the files.
			for(File in aFiles){
				var strFile = aFiles[File].replace('.tmp', '');
				Functions.GetData(aFiles[File], function(Data){
					// Check if the file was retrieved.
					if (Data[0] == 'OK'){
						var aFileContent = Data[1].split('|');

						// Add the item to the queue.
						self.Queue[strFile] = new Object({
							Name: strFile,
							ProcessName: aFileContent[0],
							Data: escape(aFileContent[1]),
							Callback: undefined,
							Processing: false,
							Error: '',
							Attempt: 1,
							NotifyFailure: undefined,
							NotifyText: undefined,
							PerformedSilently: true
						});
					}
				});
			}

			// Refresh the pending count.
			self.RefreshPending();
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// Process the items in the queue.
	//==============================================
	function ProcessQueue(){
		try{
			window.clearTimeout(self.tmrProcessor);

			// Check if debug is enabled.
			if (self.Debug){
				var objDebug = document.getElementById('Debug');
				objDebug.className = 'DebugContainer';
			}

			// Refresh the pending count.
			self.RefreshPending();

			// Check if there are any items in the queue waiting for processing.
			for(objItem in self.Queue){
				if (self.Debug)
					objDebug.innerHTML += self.Queue[objItem].Name + ', processing = ' + self.Queue[objItem].Processing + '<br/>';

				if (!self.Queue[objItem].Processing){
					self.Queue[objItem].Processing = true;
                    
					// Send the data.
					var soapClient = new SoapClient(self.WebServiceURL, 'ProcessData', self.Process_Completed, self.Queue[objItem]);
                    //soapClient.DataObject = self.Queue[objItem].Data;
					soapClient.AddParameter('Name', objItem);
					soapClient.AddParameter('CompanyID', Functions.GetItem('CompanyID'));
					soapClient.AddParameter('ProcessName', self.Queue[objItem].ProcessName);
					soapClient.AddParameter('Data', self.Queue[objItem].Data);
                    soapClient.DisplayNetworkErrors = false;
					soapClient.Send();
				}
			}

			// Start the timer.
			self.tmrProcessor = window.setTimeout(ProcessQueue, 1000);
		}
		catch (exc){
			self.OnError(exc);
		}
	}

	//==============================================
	// Process completed handler.
	//==============================================
	this.Process_Completed = function(Response, Name){
		try{
			// Check the name parameter, it will be an object if running direct or in the windows mobile app.
			if (typeof(Name) == 'object')
				Name = Name.Name;

            var DataObject = self.Queue[Name];

			// Refresh the pending count.
			self.RefreshPending();
            
			// Check if an error occured.
			if (Response[0] == 'ERROR'){
				DataObject.Attempt++;
				DataObject.Error = Response[1];
				DataObject.Processing = (DataObject.Attempt > 3);

				// Check the attempt.
				if (DataObject.Attempt > 3){
					// Check if the failure should notify the user.
					if (DataObject.NotifyFailure){
						DataObject.Callback('Failure', DataObject.PerformedSilently, unescape(DataObject.Data));

						var objControls = new Object();
						objControls.btnYes = document.createElement('BUTTON');
						objControls.btnYes.setAttribute('type', 'button');
						objControls.btnYes.innerHTML = 'OK';
						objControls.btnYes.onclick = function(){
							DataObject.Attempt = 1;
							DataObject.Processing = false;
							DataObject.NotifyFailure = undefined;
							DataObject.NotifyText = undefined;
							DataObject.PerformedSilently = true;

							DataObject.winMessage.Close();
							delete DataObject.MessagePrompt;
						};

						DataObject.winMessage = new Message().Prompt(DataObject.Error + ' The data for the ' + DataObject.NotifyText + ' will be stored locally and sent when a connection is established.', objControls, window['SiteName'], 'Question');
					}
					else{
						DataObject.Attempt = 1;
						DataObject.Processing = false;
					}
				}
				return;
			}

			// Delete the data from the saved data store.
			Functions.DeleteData(DataObject.Name + '.tmp');

			// Invoke the callback handler.
			if (DataObject.Callback)
				DataObject.Callback(Response[1], DataObject.PerformedSilently, unescape(DataObject.Data));

			// Remove the item from the queue.
			delete self.Queue[DataObject.Name];
		}
		catch (exc){
			self.OnError(exc);
		}
	}
	
	//==============================================
	// Refresh the pending count.
	//==============================================
	this.RefreshPending = function(){
		try{
			var intQueueLength = 0;

			if (self.PendingContainer == undefined)
				self.PendingContainer = document.getElementById('PendingContainer');

			if (self.lblPendingCount == undefined)
				self.lblPendingCount = document.getElementById('lblPendingCount');

			// Count the items in the queue.
			for(objItem in self.Queue)
				intQueueLength++;
				
			self.PendingContainer.className = (intQueueLength == 0) ? 'Hide' : '';
			self.lblPendingCount.innerHTML = intQueueLength;
		}
		catch (exc){
			self.OnError(exc);
		}
	}
}

//==================================================
// Add data to the queue.
//==================================================
DataProcessor.prototype.AddToQueue = function(ProcessName, Data, Callback, NotifyFailure, NotifyText, PerformedSilently){
	try{
		var strName = Functions.GUID();

		//Data = Data.replace(/(\s+)/g, '');

		// Store the data.
		Functions.StoreData(strName + '.tmp', ProcessName + "|" + Data);

		// Add the data.
		this.Queue[strName] = new Object({
			Name: strName,
			ProcessName: ProcessName,
			Data: escape(Data),
			Callback: Callback,
			Processing: false,
			Error: '',
			Attempt: 1,
			NotifyFailure: NotifyFailure,
			NotifyText: NotifyText,
			PerformedSilently: PerformedSilently
		});

		// Refresh the pending count.
		this.RefreshPending();
	}
    catch (exc){
        this.OnError(exc);
    }
}

var DataProcessor = new DataProcessor();

﻿Recordset.prototype = new Base;
Recordset.prototype.constructor = Recordset;

//=========================================================
// Column object class.
//=========================================================
function Column(){
	this.nodeType = undefined;
}

//=========================================================
// Recordset class.
//=========================================================
function Recordset(DefaultTableName){
	var self = this;
	this.Name = 'Recordset';
	this.TableName = (DefaultTableName == undefined) ? undefined : DefaultTableName;

	this.CurrentPosition = 0;
	this.Columns = new Object();
	this.Rows = new Array();

	//=========================================================
	// Add a column.
	//=========================================================
	this.AddColumn = function(Name, NodeType){
		try{
			// Check if the column has already been defined.
			if (self.Columns[Name] == undefined){
				// Check the node type.
				switch (NodeType){
					case 'Integer':
					case 'Double':
					case 'Float':
					case 'Boolean':
					case 'Date':
					case 'DateTime':
						NodeType = 3;
						break;

					case 'String':
						NodeType = 4;
						break;
				}

				// Add the column.
				self.Columns[Name] = new Object({ Value: null, nodeType: NodeType });
			}
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Load XML into the recordset.
	//=========================================================
	this.LoadXML = function(XML, Table){
		try{
			// Load the XML.
			if (window.ActiveXObject || 'ActiveXObject' in window){
				var xmlDOMDocument = new ActiveXObject("Microsoft.XMLDOM");
				xmlDOMDocument.async = false;
				xmlDOMDocument.loadXML(XML);
			}
			else{
				var xmlDOMDocument = document.implementation.createDocument('', '', null);
				var objParser = new DOMParser();
				xmlDOMDocument.async = false;
				xmlDOMDocument = objParser.parseFromString(XML, 'text/xml');
			}

			// if a table wasn't defined, get the first child element as the table.
			if (!Table){
				if (xmlDOMDocument.documentElement.childNodes.length == 0){
					new Message().Alert('Unable to construct the recordset object as the XML is empty.');
					return;
				}

				Table = xmlDOMDocument.documentElement.childNodes[((xmlDOMDocument.documentElement.childNodes.length == 1) ? 0 : 1)].nodeName;
			}

			self.TableName = Table;

			// Check if the table exists.
			if (xmlDOMDocument.getElementsByTagName(Table).length == 0){
				return;
			}

			var dtTable = xmlDOMDocument.getElementsByTagName(Table);
			var rowCurrent = dtTable[0].parentNode.firstChild;
			var rowLast = dtTable[0].parentNode.lastChild;

			// Loop through the rows.
			while (true){
				// Check if the node type is an element.
				if ((rowCurrent.nodeType == 1) && (rowCurrent.nodeName == Table)){
					var colCurrent = rowCurrent.firstChild;
					var colLast = rowCurrent.lastChild;
					var aColumns = new Object();

					// Loop through the columns.
					while (true){
						// Check the node type.
						if ((colCurrent != null) && (colCurrent.nodeType == 1)){
							// Store the column.
							self.Columns[colCurrent.nodeName] = new Object({ Value: null, nodeType: ((colCurrent.childNodes.length == 0) ? '' : colCurrent.childNodes[0].nodeType) });

							//aColumns[colCurrent.nodeName] = (colCurrent.childNodes.length == 0) ? '' : colCurrent.childNodes[0].nodeValue;
							aColumns[colCurrent.nodeName] = new Object({ Value: ((colCurrent.childNodes.length == 0) ? '' : colCurrent.childNodes[0].nodeValue), nodeType: ((colCurrent.childNodes.length == 0) ? '' : colCurrent.childNodes[0].nodeType) });
						}

						// Check if the last column has been reached.
						if (colCurrent == colLast)
							break;

						// Get the next column.
						colCurrent = colCurrent.nextSibling;
					}

					// Add the row.
					self.Rows.push(aColumns);
				}

				// Check if the last row has been reached.
				if (rowCurrent == rowLast)
					break;

				// Get the next row.
				rowCurrent = rowCurrent.nextSibling;
			}

			// Move to the first record.
			self.MoveFirst();
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Get the record count.
	//=========================================================
	this.RecordCount = function(){
		return self.Rows.length;
	}

	//=========================================================
	// Move to the first record.
	//=========================================================
	this.MoveFirst = function(){
		try{
			// Check if there are any rows.
			if ((self.Rows.length - 1) < 0)
				return;

			self.CurrentPosition = 0;
			self.CurrentRow();
			return self.Rows[self.CurrentPosition].Value;
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Move to the next record.
	//=========================================================
	this.MoveNext = function(){
		try{
			// Check if there are any rows.
			if ((self.Rows.length - 1) < 0)
				return false;

			// Check if the current position equals the record count.
			if (self.CurrentPosition == (self.Rows.length - 1))
				return false;

			self.CurrentPosition++;
			self.CurrentRow();
			self.Rows[self.CurrentPosition].Value;
			return true;
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Move to the previous record.
	//=========================================================
	this.MovePrevious = function(){
		try{
			// Check if there are any rows.
			if ((self.Rows.length - 1) < 0)
				return;

			// Check if the current position equals the record count.
			if (self.CurrentPosition == 0)
				return false;

			self.CurrentPosition--;
			self.CurrentRow();
			self.Rows[self.CurrentPosition].Value;
			return true;
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Move to the last record.
	//=========================================================
	this.MoveLast = function(){
		try{
			// Check if there are any rows.
			if ((self.Rows.length - 1) < 0)
				return;

			self.CurrentPosition = (self.Rows.length - 1);
			self.CurrentRow();
			return self.Rows[self.CurrentPosition].Value;
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Check for end-of-file (EOF).
	//=========================================================
	this.EOF = function(){
		try{
			// Check if there are any rows.
			if ((self.Rows.length - 1) < 0)
				return true;

			return (self.CurrentPosition == (self.Rows.length - 1));
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Current row.
	//=========================================================
	this.CurrentRow = function(){
		try{
			// Check if there are any rows.
			if ((self.Rows.length - 1) < 0)
				return;

			for(Column in self.Rows[self.CurrentPosition]){
				self[Column] = self.Rows[self.CurrentPosition][Column];
			}
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Create a new row.
	//=========================================================
	this.NewRow = function(){
		try{
			var aColumns = new Object();

			for(Column in self.Columns)
				aColumns[Column] = new Object({ Value: self.Columns[Column].Value, nodeType: self.Columns[Column].nodeType });

			self.Rows.push(aColumns);
			return self.Rows[(self.Rows.length - 1)];
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Delete row.
	//=========================================================
	this.DeleteRow = function(Index){
		try{
			// Check the index.
			if (Index == undefined)
				Index = self.CurrentPosition;

			self.Rows.splice(Index, 1);
			self.CurrentPosition--;
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Delete rows which match the colun and value.
	//=========================================================
	this.DeleteRows = function(Statement){
		try{
			// Check if there are any rows.
			if ((self.Rows.length - 1) < 0)
				return false;

			// Format the filter statement.
			Statement = self.FormatStatement(Statement);

			self.MoveFirst();
			do{
				if (eval(Statement))
					self.DeleteRow(self.CurrentPosition);
			}while(self.MoveNext())
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Find a matching row.
	//=========================================================
	this.Find = function(Statement){
		try{
			// Check if there are any rows.
			if ((self.Rows.length - 1) < 0)
				return false;

			// Format the filter statement.
			Statement = self.FormatStatement(Statement);

			var blnFound = false;

			self.MoveFirst();
			do{
				if (eval(Statement)){
					blnFound = true;

					self.CurrentRow();
					break;
				}
			}while(self.MoveNext())
			return blnFound;
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Format the filter statement.
	//=========================================================
	this.FormatStatement = function(Statement){
		try{
			// Split the filter condition into the required filter fields.
			Statement = Statement.replace(/\[/gi, '');
			Statement = Statement.replace(/\]/gi, '');
			//Statement = Statement.replace(/ /gi, ''); Why is a space being removed?
			Statement = Statement.replace(/AND/g, ' && ');
			Statement = Statement.replace(/OR/g, ' || ');
			Statement = Statement.replace(/ AND /g, ' && ');
			Statement = Statement.replace(/ OR /g, ' || ');
			Statement = Statement.replace(/!=/gi, '\']!=');
			Statement = Statement.replace(/=/gi, '\']==');
			Statement = Statement.replace(/</gi, '\']<');
			Statement = Statement.replace(/>/gi, '\']>');
			Statement = Statement.replace(/^/gi, 'self[\'');
			Statement = Statement.replace(/(&& )+/gi, '&& self[\'');
			Statement = Statement.replace(/(\|\| )+/gi, '|| self[\'');
			Statement = Statement.replace(/self\[\'\(/gi, '(self[\'');
			Statement = Statement.replace(/\)\']/gi, '\'])');
			Statement = Statement.replace(/!\']==/gi, '!=');
			Statement = Statement.replace(/self\[\' /gi, 'self[\'');
			Statement = Statement.replace(/self\[\'\(/gi, '(self[\''); // fix "this['QuestionID']==723  && this['AxleTyreID']==0  && this['(Code']=="SERV"  || this['Code']=="NONA")"
			Statement = Statement.replace(/\']/gi, '\'].Value');
			Statement = Statement.replace(/(\W)*\']/g, '\']');

			return Statement;
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Select records based upon the statement.
	//=========================================================
	this.Select = function(Statement){
		try{
			// Check if a statement has been passed.
			if ((Statement == undefined) || (Statement == ''))
				return self.Rows.slice(0);

			// Check if there are any rows.
			if (self.Rows.length == 0)
				return new Array();

			// Format the filter statement.
			Statement = self.FormatStatement(Statement);

			// Create the return array.
			var aMatched = new Array();

			// Move to the first record and start loop.
			self.MoveFirst();
			do{
				if (eval(Statement)){
					var objRow = new Object();

					for(Field in self.Rows[self.CurrentPosition])
						objRow[Field] = self.Rows[self.CurrentPosition][Field];

					aMatched = aMatched.concat(objRow);
				}
			}while(self.MoveNext())

			// Reset the recordset.
			self.MoveFirst();

			// Return the matched records.
			return aMatched;
		}
		catch(exc){
			self.OnError(exc);
		}
	}

	//=========================================================
	// Cast the Recordset as a XML string.
	//=========================================================
	this.toString = function(){
		try{
			var objXMLDoc = null;

			// IE.
			if (window.ActiveXObject || 'ActiveXObject' in window){
				objXMLDoc = new ActiveXObject('Microsoft.XMLDOM');
				objXMLDoc.async = false;
				objXMLDoc.loadXML('<DataSet/>');
			}
			else{
				//Firefox, Mozilla, Opera, etc.
				objXMLDoc = document.implementation.createDocument('', '',null);
				objXMLDoc.async = false;
				objParser = new DOMParser();
				objXMLDoc = objParser.parseFromString('<DataSet/>', "text/xml");
			}

			// Check if there are any rows.
			if (self.Rows.length == 0){
				// Create a new XML element.
				var objRowElement = objXMLDoc.createElement(self.TableName);

				for(Column in self.Columns){
					var objFieldElement = objXMLDoc.createElement(Column);
					objRowElement.appendChild(objFieldElement);
				}

				// Append the row element to the XML document.
				objXMLDoc.childNodes[0].appendChild(objRowElement);
			}
			else{
				// Loop through the rows.
				for(var intRow = 0; intRow < self.Rows.length; intRow++)
				{
					// Create a new XML element.
					var objRowElement = objXMLDoc.createElement(self.TableName);
			
					// Loop through the columns.
					for(Column in self.Columns){
						if (self.Columns[Column] == undefined)
							continue;

						if (self.Rows[intRow][Column].Value == undefined){
							switch (self.Rows[intRow][Column].nodeType){
								case 4:
									self.Rows[intRow][Column].Value = '';
									break;

								default:
									self.Rows[intRow][Column].Value = 0;
									break;
							}
						}

						if (self.Rows[intRow][Column].Value == null){
							switch (self.Rows[intRow][Column].nodeType){
								case 4:
									self.Rows[intRow][Column].Value = '';
									break;

								default:
									self.Rows[intRow][Column].Value = 0;
									break;
							}
						}

						var objFieldElement = objXMLDoc.createElement(Column);

						// Check the node type.
						switch (self.Rows[intRow][Column].nodeType){
							case 4:
								var objFieldElementText = objXMLDoc.createCDATASection(self.Rows[intRow][Column].Value);
								break;

							default:
								var objFieldElementText = objXMLDoc.createTextNode(self.Rows[intRow][Column].Value);
								break;
						}

						// Append the field element text to the field element node.
						objFieldElement.appendChild(objFieldElementText);

						// Append the field to the row element.
						objRowElement.appendChild(objFieldElement);

					}
			
					// Append the row element to the XML document.
					objXMLDoc.childNodes[0].appendChild(objRowElement);
				}
			}

			// Check the XML document.
			if (objXMLDoc.xml)
			{
				return objXMLDoc.xml;
			}
			else
			{
				try
				{
					return new XMLSerializer().serializeToString(objXMLDoc);
				}
				catch (exc)
				{
					return 'Unable to get XML';
				}
			}

			return undefined;
		}
		catch(exc){
			self.OnError(exc);
		}
	}
}

Transform.prototype = new Base;
Transform.prototype.constructor = Transform;

//=========================================================
// Transform class.
//=========================================================
function Transform(){
	var self = this;
	this.Name = 'Transform';

	//=========================================================
	// Get the content of the transformed XML/XSLT/
	//=========================================================
	this.GetContent = function(){
		try{
			// Check if any XML has been passed.
			if ((self.XML == undefined) || (self.XML == ''))
				self.XML = '<Data/>';

			if (self.tmrTransform)
				window.clearTimeout(self.tmrTransform);

			// Check if the browser.
			if (window.ActiveXObject || 'ActiveXObject' in window){
				self.XSLTDocument = new ActiveXObject('Msxml2.FreeThreadedDOMDocument.3.0');
				self.XSLTDocument.async = window['WindowsPhone'] ? true : false;
				self.XSLTDocument.load(((self.Relative) ? '' : window.location.protocol + '//' + window.location.hostname) + self.XSLT);

				if (self.XSLTDocument.parseError.errorCode != 0){
					var objError = self.XSLTDocument.parseError;
					alert('An error has occured whilst parsing the XSLT document: -\n\n' + objError.reason + '\nDocument: ' + ((self.Relative) ? '' : window.location.protocol + '//' + window.location.hostname) + self.XSLT + '\nCode:' + self.XSLTDocument.parseError.errorCode);
				}

				self.XSLTemplate = new ActiveXObject('Msxml2.XSLTemplate.3.0');
				self.XSLTemplate.stylesheet = self.XSLTDocument;

				self.XMLDocument = new ActiveXObject('Msxml2.DOMDocument.3.0');
				self.XMLDocument.async = false;
				self.XMLDocument.loadXML(self.XML);

				if (self.XMLDocument.parseError.errorCode != 0){
					var objError = self.XMLDocument.parseError;
					alert('An error has occured whilst parsing the XML document: -\n\n' + objError.reason + '\n' + self.XML);
				}

				self.XSLTProcessor = self.XSLTemplate.createProcessor();
				self.XSLTProcessor.input = self.XMLDocument;
                
                // Add parameters.
                if (self.aParameters != undefined)
                {
                    for (var intCounter = 0; intCounter < self.aParameters.length; intCounter++)
                    {
                        var aParameter = self.aParameters[intCounter].toString().split('=');
                        self.XSLTProcessor.addParameter(aParameter[0], unescape(aParameter[1]));
                    }
                }
        
				self.XSLTProcessor.transform();

				if (self.Container == 'writeln'){
					document.writeln(self.XSLTProcessor.output);
				}
				else{
					self.Container.innerHTML = self.XSLTProcessor.output;
				}
			}
			else{
                // Check if the application is running on an Android device.
                if (window['IsPhoneGap'] & (window['BrowserName'] == 'Android')){
                    // Check if the device has a built-in XSLT processor.
                    if (cordova.exec == undefined){
                        var objXSLTProcessor = new XSLTProcessor();
                        delete objXSLTProcessor;
                    }
                    else{
                        // Invoke the 'XSLT processor' plugin.
                        cordova.exec(self.XSLTProcessor_Completed, self.PluginError, 'XSLTransform', 'Transform', [self.XML, self.XSLT + self.Parameters]);
                        return;
                    }
				}
                
				self.Parser = new DOMParser();
				self.XMLDocument = document.implementation.createDocument('', '', null);
				self.XMLDocument.async = false;
				self.XMLDocument = self.Parser.parseFromString(self.XML, "text/xml");
				self.XMLHttpRequest = new XMLHttpRequest();

				self.XMLHttpRequest.open('GET', ((self.Relative) ? '' : window.location.protocol + '//' + window.location.hostname) + self.XSLT, false);
				self.XMLHttpRequest.setRequestHeader('Cache-Control', 'no-cache');
				self.XMLHttpRequest.send(this.GUID);
				self.XSLTDocument = self.XMLHttpRequest.responseXML;

				if (document.implementation && document.implementation.createDocument){
					self.XSLTProcessor = new XSLTProcessor();
					self.XSLTProcessor.importStylesheet(self.XSLTDocument);
                    
                    // Add parameters.
                    if (self.aParameters != undefined)
                    {
                        for (var intCounter = 0; intCounter < self.aParameters.length; intCounter++)
                        {
                            var aParameter = self.aParameters[intCounter].toString().split('=');
                            self.XSLTProcessor.setParameter(null, aParameter[0], unescape(aParameter[1]));
                        }
                    }
                    
					var output = self.XSLTProcessor.transformToFragment(self.XMLDocument, self.XSLTDocument);
					var serializer = new XMLSerializer();

					if (self.Container == 'writeln'){
						document.writeln(serializer.serializeToString(output));
					}
					else{
						self.Container.innerHTML = serializer.serializeToString(output);
					}
				}
			}

			// Invoke the callback handler.
			if (self.Callback)
				self.Callback();

			if (self.WaitWindow)
				self.WaitWindow.Close();

			self.Dispose();
		}
		catch(exc){
			if (self.WaitWindow)
				self.WaitWindow.Close();

			self.OnError(exc);
		}
	}
	
	//=========================================================
	// XSLT processed completed handler.
	//=========================================================
	this.XSLTProcessor_Completed = function(HTML){
		try{
			if (self.Container == 'writeln'){
				document.writeln(HTML);
			}
			else{
				self.Container.innerHTML = HTML;
			}
			
			// Invoke the callback handler.
			if (self.Callback)
				self.Callback();

			if (self.WaitWindow)
				self.WaitWindow.Close();

			self.Dispose();
		}
		catch(exc){
			if (self.WaitWindow)
				self.WaitWindow.Close();

			self.OnError(exc);
		}
	}

	//=========================================================
	// Render handler.
	//=========================================================
	this.Render = function(Container, XML, XSLT, WaitMessage, Callback, Relative){
		try{
			self.Container = Container;
			self.XML = XML;
			self.XSLT = XSLT;
			self.Callback = Callback;
			self.Relative = (Relative == undefined) ? false : Relative;
			self.Parameters = '';
        
			if (self.XSLT.toString().indexOf('.xslt?') != -1){
				self.Parameters = self.XSLT.substring(self.XSLT.indexOf('?'));
				self.aParameters = self.XSLT.toString().substring((self.XSLT.toString().indexOf('.xslt') + 6)).split('&');
				self.XSLT = self.XSLT.substring(0, self.XSLT.indexOf('?'));
			}

			if (WaitMessage)
				self.WaitWindow = new Message().WaitWindow(WaitMessage);

			// Check if directly writing to the document layer.
			if (self.Container == 'writeln'){
				self.GetContent();
			}
			else{
				self.tmrTransform = window.setTimeout(self.GetContent, 10);
			}
		}
		catch(exc){
			if (self.WaitWindow)
				self.WaitWindow.Close();

			self.OnError(exc);
		}
	}
}
