






document.addEventListener("deviceready", onDeviceReady, false);
app.initialize();  




function onDeviceReady() 
{
//    document.addEventListener("backbutton", backButtonPressed, false);
    
    try{
    
    configGameSetup();
    showMainMenu();
    }
    catch(err)
    {
    	
    }
}

function showMainMenu()
{
	$("#wrapper").html("");

	var screenWidthFix = screen.width;

	if (screen.width > screen.height)
	{
		screenWidthFix = screen.height;
	}
	
	var logoWidth = screenWidthFix - scaleWidth(200);
	var logoHeight = logoWidth;

	$("#wrapper").append("<div id=\"logo\"><img src=\"logo.png\" width=\"" + logoWidth + "\" height=\"" + logoHeight + "\"/></div>");
	
	$("#logo").css("width", screenWidthFix + "px");	
	$("#logo").css("padding-top", scaleHeight(50) + "px");	
	$("#logo").css("padding-bottom", scaleHeight(60) + "px");	
	
	$("#logo").css("text-align", "center");	
	
	logoWidth = logoWidth /2;
	logoHeight = logoWidth;
	
	$("#wrapper").append("<div id=\"next\"><a href=\"http://gtav.cheatcodesgalore.com\"><img src=\"300a.png\" width=\"" + logoWidth + "\" height=\"" + logoHeight + "\"/></a></div>");
	
	$("#next").css("width", screenWidthFix + "px");	
	$("#next").css("padding-bottom", scaleHeight(60) + "px");	
	
	$("#next").css("text-align", "center");	
	
}
function scaleHeight(y)
{
	return (_screenHeight * y) / 1024;
}

function scaleWidth(x)
{
	return (_screenWidth * x) / 600;
}


var _screenWidth = 1;
var _screenHeight = 1;

var _contentWidth = 1;
var _contentHeight = 1;

function configGameSetup()
{
    _screenHeight = window.innerHeight - (window.innerHeight * 0.1);
    _screenWidth = 600 * _screenHeight / 1024;

    if (screen.width > screen.height) {
        _isWideScreen = true;
        _screenHeight =  window.innerHeight - ( window.innerHeight * 0.1);
        _screenWidth = _screenHeight * 600 / 1024;
    }

    _isAndroid = true;

    _contentWidth = screen.width;
    _contentHeight =  window.innerHeight;
    
}

function showInterstitialAd()
{
	try
	{
		window.plugins.waitingDialog.showInterstitial();
	}
	catch(err)
	{
		errorAlert(err);	
	}
}

function openlink(link)
{
	window.plugins.waitingDialog.openlink(link);
}

function share(text, subject, title)
{
	window.plugins.waitingDialog.share(text, subject, title);
}

function shareImage(text, subject, title, image)
{
	window.plugins.waitingDialog.shareimage(text, subject, title, image);
}

function sendAnalyticsEvent(category, action, label)
{
	window.plugins.waitingDialog.sendAnalyticsEvent(category, action, label);
}

function showAlert(title, msg)
{
	window.plugins.waitingDialog.showAlert(title, msg);
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

