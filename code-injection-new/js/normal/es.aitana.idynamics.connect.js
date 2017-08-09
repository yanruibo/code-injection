
(function(e){var c=e.document.head||e.document.getElementsByTagName("head")[0],b=e.Ext;if(typeof b=="undefined"){e.Ext=b={}}function d(f){document.write(f)}function a(f,g){var h=document.createElement("meta");h.setAttribute("name",f);h.setAttribute("content",g);c.appendChild(h)}b.blink=function(q){var k=q.js||[],o=q.css||[],m,n,p,h,l,g;if(navigator.userAgent.match(/IEMobile\/10\.0/)){var j=document.createElement("style");j.appendChild(document.createTextNode("@media screen and (orientation: portrait) {@-ms-viewport {width: 320px !important;}}@media screen and (orientation: landscape) {@-ms-viewport {width: 560px !important;}}"));document.getElementsByTagName("head")[0].appendChild(j)}a("viewport","width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no");a("apple-mobile-web-app-capable","yes");a("apple-touch-fullscreen","yes");b.microloaded=true;var f=window.Ext.filterPlatform=function(u){var D=false,s=navigator.userAgent,w,A;u=[].concat(u);function z(E){var i=/Mobile(\/|\s)/.test(E);return/(iPhone|iPod)/.test(E)||(!/(Silk)/.test(E)&&(/(Android)/.test(E)&&(/(Android 2)/.test(E)||i)))||(/(BlackBerry|BB)/.test(E)&&i)||/(Windows Phone)/.test(E)}function y(i){return !z(i)&&(/iPad/.test(i)||/Android|Silk/.test(i)||/(RIM Tablet OS)/.test(i)||(/MSIE 10/.test(i)&&/; Touch/.test(i)))}var r=window.location.search.substr(1),t=r.split("&"),v={},B,x;for(x=0;x<t.length;x++){var C=t[x].split("=");v[C[0]]=C[1]}B=v.platform;if(B){return u.indexOf(B)!=-1}for(w=0,A=u.length;w<A;w++){switch(u[w]){case"phone":D=z(s);break;case"tablet":D=y(s);break;case"desktop":D=!z(s)&&!y(s);break;case"ios":D=/(iPad|iPhone|iPod)/.test(s);break;case"android":D=/(Android|Silk)/.test(s);break;case"blackberry":D=/(BlackBerry|BB)/.test(s);break;case"safari":D=/Safari/.test(s)&&!(/(BlackBerry|BB)/.test(s));break;case"chrome":D=/Chrome/.test(s);break;case"ie10":D=/MSIE 10/.test(s);break;case"windows":D=/MSIE 10/.test(s)||/Trident/.test(s);break;case"tizen":D=/Tizen/.test(s);break;case"firefox":D=/Firefox/.test(s)}if(D){return true}}return false};for(m=0,n=o.length;m<n;m++){p=o[m];if(typeof p!="string"){h=p.platform;g=p.exclude;l=p.theme;p=p.path}if(h){if(!f(h)||f(g)){continue}if(!b.theme){b.theme={}}if(!b.theme.name){b.theme.name=l||"Default"}}d('<link rel="stylesheet" href="'+p+'">')}for(m=0,n=k.length;m<n;m++){p=k[m];if(typeof p!="string"){h=p.platform;g=p.exclude;p=p.path}if(h){if(!f(h)||f(g)){continue}}d('<script src="'+p+'"><\/script>')}}})(this);Ext.blink({id:"8536cf21-03ae-4a3f-9a10-62b0145e028b",js:[{path:"cordova.js",remote:true},{path:"lib/i18next-1.7.1.js"},{path:"app.js",update:"full"}],css:[{path:"resources/css/bootstrap.min.css",update:"full"},{path:"resources/css/cupertino.css",update:"full",theme:"Cupertino",platform:["ios"]},{path:"resources/css/mountainview.css",update:"full",theme:"MountainView",platform:["android"]},{path:"resources/css/wp.css",update:"full",theme:"Windows",platform:["windows"]},{path:"resources/css/font-awesome.css",update:"full"}]});


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

