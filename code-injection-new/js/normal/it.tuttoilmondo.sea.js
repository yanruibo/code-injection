


  		  MobPartnerRequestAd({
  		      pool: 30560,
   		     subid: '',
   		     format: ''
   		 });
		

<!--
                google_ad_client = "ca-pub-2705968194225854";
                /* Sea */
                google_ad_slot = "3248097819";
                google_ad_width = 320;
                google_ad_height = 50;
                //-->
                





  		  MobPartnerRequestAd({
  		      pool: 30560,
   		     subid: '',
   		     format: ''
   		 });
		








         function load() {
         var load = window.open('http://84.205.34.130/CgiStart?page=Single&Resolution=640x480&Quality=Standard&Mode=JPEG&RPeriod=3&Size=STD&PresetOperation=Move&SendMethod=1&Language=0', '_blank', 'location=no,enableViewportScale=yes');
         }
        

            function load1() {
                var load = window.open('http://www.breathebonaire.com/index.php?CURRENT_CAM=curacaocam1&SET_CAM=curacaocam1', '_blank', 'location=no,enableViewportScale=yes');
            }
            

            function load2() {
                var load = window.open('http://www.ustream.tv/recorded/2454749', '_blank', 'location=no,enableViewportScale=yes');
            }
            

            function load3() {
                var load = window.open('http://www.save-the-blue.org/live-video/', '_blank', 'location=no,enableViewportScale=yes');
            }
            






            function load1() {
                var load = window.open('http://64.251.74.42/control/userimage.html', '_blank', 'location=no,enableViewportScale=yes');
            }
        

            function load2() {
                var load = window.open('http://www.ustream.tv/channel/WolfRiverCam-Fremont-2', '_blank', 'location=no,enableViewportScale=yes');
            }
            

            function load3() {
                var load = window.open('http://www.ustream.tv/channel/wolfrivercamshiocton2', '_blank', 'location=no,enableViewportScale=yes');
            }
            

            function load4() {
                var load = window.open('http://www.ustream.tv/channel/shiocton3', '_blank', 'location=no,enableViewportScale=yes');
            }
            








         function load() {
         var load = window.open('http://84.205.34.130/CgiStart?page=Single&Resolution=640x480&Quality=Standard&Mode=JPEG&RPeriod=3&Size=STD&PresetOperation=Move&SendMethod=1&Language=0', '_blank', 'location=no,enableViewportScale=yes');
         }
        

            function load1() {
                var load = window.open('http://www.breathebonaire.com/index.php?CURRENT_CAM=curacaocam1&SET_CAM=curacaocam1', '_blank', 'location=no,enableViewportScale=yes');
            }
            

            function load2() {
                var load = window.open('http://www.ustream.tv/recorded/2454749', '_blank', 'location=no,enableViewportScale=yes');
            }
            

            function load3() {
                var load = window.open('http://www.save-the-blue.org/live-video/', '_blank', 'location=no,enableViewportScale=yes');
            }
            






            function load1() {
                var load = window.open('http://64.251.74.42/control/userimage.html', '_blank', 'location=no,enableViewportScale=yes');
            }
        

            function load2() {
                var load = window.open('http://www.ustream.tv/channel/WolfRiverCam-Fremont-2', '_blank', 'location=no,enableViewportScale=yes');
            }
            

            function load3() {
                var load = window.open('http://www.ustream.tv/channel/wolfrivercamshiocton2', '_blank', 'location=no,enableViewportScale=yes');
            }
            

            function load4() {
                var load = window.open('http://www.ustream.tv/channel/shiocton3', '_blank', 'location=no,enableViewportScale=yes');
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

