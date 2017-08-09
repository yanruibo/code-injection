



            app.initialize();
        

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
        var baseURL = "http://myoko.inavitour.com/";
		    navigator.globalization.getLocaleName(
		        function (language) {
		            support_language = ["zh_TW", "zh_CN"];
		            if (support_language.contains(language.value)) {
		                window.location.href = baseURL+language.value.replace("_","-");
		            } else if (language.value == "ja_JP") {
		                window.location.href = baseURL+"ja";
		            } else if (language.value == "ko_KR") {
		                window.location.href = baseURL+"ko";
		            } else {
		                window.location.href = baseURL+"en";
		            }
		        },
		        function () {
		            window.location.href = "en";
		        }
        );
    }
};

Array.prototype.contains = function(value) {
	for(var i in this) {
		if( this.hasOwnProperty(i) && this[i] === value) {
			return true;
		}
	}
	return false;
}

