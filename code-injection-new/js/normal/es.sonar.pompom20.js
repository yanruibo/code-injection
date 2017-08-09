



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
        







        // var _gaq=[['_setAccount','UA-XXXXXXX-X'],['_trackPageview']];
        // (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        // g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        // s.parentNode.insertBefore(g,s)}(document,'script'));
    





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
















window.app = window.app || {};


requirejs.config({
  baseUrl: 'js', 

  shim: {
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }, 
    'underscore': {
      deps: ['underscore.string'],
      exports: '_',
      init: function(UnderscoreString){
        _.mixin(UnderscoreString);
      }
    }, 
    'bootstrap': {
      deps: ['jquery']
    }
  }, 
  
  paths: {
    underscore: 'vendor/underscore', 
    'underscore.string': 'vendor/underscore.string.min',
    backbone: 'vendor/backbone-min', 
    bootstrap: 'vendor/bootstrap.min',
    retina: 'vendor/retina', 
    moment: "vendor/moment", 
    deviceDetection: "vendor/devicedetection", 

    i18n: 'helpers/i18n', 
    sequencer: 'helpers/jquery.sequence', 
    templates: 'helpers/templates', 
    imageCache: 'helpers/imageCache', 

    messageModel: 'models/message', 
    messagesCollection: 'collections/messages', 

    aboutView: 'views/about', 
    createView: 'views/create', 
    galleryView: 'views/gallery', 
    homeView: 'views/home', 
    messageView: 'views/message', 
    navView: 'views/nav', 
    portraitLockView: 'views/portrait-lock', 
    popoverView: 'views/popover', 
    preloaderView: 'views/preloader', 
    previewView: 'views/preview', 
    privacyView: 'views/privacy', 
    sentenceView: 'views/sentence', 
    tickerView: 'views/ticker'
  }
});

require([
  'backbone', 
  'i18n', 
  'templates', 
  'router', 
  'messageModel', 
  'portraitLockView',
  'underscore',  
  'bootstrap', 
  'deviceDetection', 
  'retina', 
  'sequencer', 
  'imageCache'

  ], 
  function (Backbone, i18n, templates, Router, MessageModel, PortraitLockView) {
    console.log("Main modules loaded");

    app.lang = navigator.locale || 'en';
    app.stage = $('#app');
    app.baseEl = $('#app #app-base');
    app.sheetEl = $('#app #app-sheet');
    app.deviceDetection = new DeviceDetection();

    app.messageModel = new MessageModel();
    app.router = new Router();


    app.start = function () {
      console.log('App started');

      if (app.deviceDetection.isSmartPhone()) {
        this.portraitLockView = new PortraitLockView(); 
        app.stage.append( this.portraitLockView.el );
      }

      Backbone.history.start({root: app.lang});
    }

        // Load templates
        var loadTemplates = function(){
          templates.loadTemplates([
            'about',
            'create',
            'gallery',
            'home',
            'message',
            'nav',
            'portrait-lock',
            'popover',
            'preview',
            'privacy',
            'sentence',
            'ticker'
          ],
          function() {
            console.log("All templates loaded");
            i18n.changeLanguage(app.lang, app.start); // load locale file
          });
        }
        
        var loadGooglePlusScript = function(){
          window.___gcfg = {
            parseTags: 'explicit'
          };
          var id = 'gplus-code';
          var ref = document.getElementsByTagName('script')[0];
          if (!document.getElementById(id)){
            var js = document.createElement('script');
            js.type = 'text/javascript';
            js.async = true;
            js.id = id;
            js.src = 'https://apis.google.com/js/plusone.js';
            ref.parentNode.insertBefore(js, ref);
          }
        }
        
        var onDeviceReady = function(){
          console.log('Device ready');
          navigator.globalization.getLocaleName(
            function (locale) {
              locale = locale.substr(0, 2).toLowerCase();
              console.log('Locale defined to: ' + locale);
              if (['en', 'es', 'pt', 'cat'].indexOf(locale) > -1){
                 app.lang = locale;
              }
            },
            function () {
              console.log('Error getting locale\n');
            //            loadTemplates();
            }
          );

          loadTemplates();
        }
        console.log("waiting for device ready event");
        document.addEventListener('deviceready', onDeviceReady, true);
        // loadGooglePlusScript();
//        loadTemplates();
  }
);



window.app = window.app || {};


define(
  ['backbone', 'aboutView', 'createView', 'galleryView', 'homeView', 'messagesCollection', 'navView', 'previewView'], 
  function (Backbone, AboutView, CreateView, GalleryView, HomeView, MessagesCollection, NavView, PreviewView) {
  
  return Backbone.Router.extend({

    routes:{
      "": "home", 
      "about": "about", 
      "create": "create", 
      "gallery": "gallery", 
      "gallery/page/:page": "gallery",
      "home": "home", 
      "preview": "preview", 
      "preview/:id": "previewID", 
      "search/:string": "search", 
      "search/:string/page/:page": "search", 
      "*other": "defaultRoute"
    }, 

    currentSection: undefined, 
    currentSheet: undefined, 
    prevRoute: 'home', 
    prevSheet: '', 

    updateViews: function () {
      if (this.currentSection) {
        // this.currentSection.remove();
        this.currentSection.render();
      }
    }, 
    
    about: function () {
      console.log("Router a About");
      this.beforeRoute();
      this.currentSection = new AboutView();
      app.baseEl.append( this.currentSection.render().el );      
      this.afterRoute();
    }, 
    
    create: function () {
      console.log("Router a Create");
      this.currentSheet = new CreateView({ model:app.messageModel });
      this.currentSheet.prevRoute = this.prevRoute;

      if (this.currentSection && (this.prevRoute == 'home' || this.prevRoute == 'gallery')) {
        this.currentSection.pauseSequences();
        this.currentSheet.once('close', this.currentSection.resumeSequences);
      }

      app.sheetEl.html( this.currentSheet.render().el );
      this.afterRoute();
    }, 

    gallery: function (page) {
      console.log("Router a Gallery");
      if (!page) page = 1;
      this.beforeRoute();
      this.currentSection = new GalleryView({ collection:app.messagesCollection, page: page });      
      app.baseEl.append( this.currentSection.render().el );
      this.afterRoute();
    }, 
    
    home: function () {
      console.log("Router a Home");
      this.beforeRoute();
      this.currentSection = new HomeView();
      app.baseEl.append( this.currentSection.render().el );
      this.afterRoute();
    }, 
    
    preview: function () {
      console.log("Router a Preview");

      if (app.messageModel.get('message') == "") {
        this.navigate('create', {trigger:true});
        return;
      }
      
      this.currentSheet = new PreviewView({ model:app.messageModel });
      app.sheetEl.html( this.currentSheet.render().el );

      if (this.currentSection && (this.prevRoute == 'home' || this.prevRoute == 'gallery')) {        
        this.currentSheet.once('close', this.currentSection.resumeSequences);
      }
      this.afterRoute();
    }, 
    
    previewID: function (id) {
      console.log("Router a Preview ID");

      var model = undefined;

      if (app.messagesCollection && app.messagesCollection.get(id)) {
        model = app.messagesCollection.get(id);
      } 

      this.currentSheet = new PreviewView({ model:model });
      this.currentSheet.hideFullOptions = true;

      if (!model) this.currentSheet.getModelID = id;
      // this.currentSheet.prevRoute = this.prevRoute;
      app.sheetEl.html( this.currentSheet.render().el );

      if (this.prevRoute == 'gallery') {
        this.currentSheet.once('close', this.currentSection.resumeSequences);
      }
      this.afterRoute();
    }, 
    
    search: function (string, page) {
      console.log("Router a Search");
      if (!page) page = 1;
      if (string == "" || string == undefined) this.navigate('gallery/page/'+page, {trigger:true});

      // var searchCollection = new MessagesCollection();
      // collection.add(app.messagesCollection.filterByString(string));
      
      this.beforeRoute();
      var searchCollection = new MessagesCollection();
      searchCollection.searchTerm = string;
      this.currentSection = new GalleryView({page: page, collection: searchCollection }); // collection:searchCollection
      this.currentSection.searchString = string;
      this.currentSection.isSearch = true;
      app.baseEl.append( this.currentSection.render().el );
      this.afterRoute();
    }, 

    defaultRoute: function () {
      console.log("Router a DefaultRoute");
      this.beforeRoute();
      this.navigate("home", {replace:true});
    }, 

    beforeRoute: function () {
      $('body').scrollTop(0);
      
      if (this.currentSection != undefined) {
        this.currentSection.destroy();
        this.currentSection = undefined;
      }

      if (this.currentSheet) this.currentSheet = undefined;

      if (!this.nav) {
        this.nav = new NavView();
        app.baseEl.append( this.nav.render().el );
      }

      this.nav.show();
    }, 

    afterRoute: function () {
      if (Retina && Retina.isRetina()) Retina.init(window);
    }

  });
});

!function(e,t){"use strict";var n=t.prototype.trim,r=t.prototype.trimRight,i=t.prototype.trimLeft,s=function(e){return e*1||0},o=function(e,t){if(t<1)return"";var n="";while(t>0)t&1&&(n+=e),t>>=1,e+=e;return n},u=[].slice,a=function(e){return e==null?"\\s":e.source?e.source:"["+p.escapeRegExp(e)+"]"},f={lt:"<",gt:">",quot:'"',amp:"&",apos:"'"},l={};for(var c in f)l[f[c]]=c;l["'"]="#39";var h=function(){function e(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}var n=o,r=function(){return r.cache.hasOwnProperty(arguments[0])||(r.cache[arguments[0]]=r.parse(arguments[0])),r.format.call(null,r.cache[arguments[0]],arguments)};return r.format=function(r,i){var s=1,o=r.length,u="",a,f=[],l,c,p,d,v,m;for(l=0;l<o;l++){u=e(r[l]);if(u==="string")f.push(r[l]);else if(u==="array"){p=r[l];if(p[2]){a=i[s];for(c=0;c<p[2].length;c++){if(!a.hasOwnProperty(p[2][c]))throw new Error(h('[_.sprintf] property "%s" does not exist',p[2][c]));a=a[p[2][c]]}}else p[1]?a=i[p[1]]:a=i[s++];if(/[^s]/.test(p[8])&&e(a)!="number")throw new Error(h("[_.sprintf] expecting number but found %s",e(a)));switch(p[8]){case"b":a=a.toString(2);break;case"c":a=t.fromCharCode(a);break;case"d":a=parseInt(a,10);break;case"e":a=p[7]?a.toExponential(p[7]):a.toExponential();break;case"f":a=p[7]?parseFloat(a).toFixed(p[7]):parseFloat(a);break;case"o":a=a.toString(8);break;case"s":a=(a=t(a))&&p[7]?a.substring(0,p[7]):a;break;case"u":a=Math.abs(a);break;case"x":a=a.toString(16);break;case"X":a=a.toString(16).toUpperCase()}a=/[def]/.test(p[8])&&p[3]&&a>=0?"+"+a:a,v=p[4]?p[4]=="0"?"0":p[4].charAt(1):" ",m=p[6]-t(a).length,d=p[6]?n(v,m):"",f.push(p[5]?a+d:d+a)}}return f.join("")},r.cache={},r.parse=function(e){var t=e,n=[],r=[],i=0;while(t){if((n=/^[^\x25]+/.exec(t))!==null)r.push(n[0]);else if((n=/^\x25{2}/.exec(t))!==null)r.push("%");else{if((n=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t))===null)throw new Error("[_.sprintf] huh?");if(n[2]){i|=1;var s=[],o=n[2],u=[];if((u=/^([a-z_][a-z_\d]*)/i.exec(o))===null)throw new Error("[_.sprintf] huh?");s.push(u[1]);while((o=o.substring(u[0].length))!=="")if((u=/^\.([a-z_][a-z_\d]*)/i.exec(o))!==null)s.push(u[1]);else{if((u=/^\[(\d+)\]/.exec(o))===null)throw new Error("[_.sprintf] huh?");s.push(u[1])}n[2]=s}else i|=2;if(i===3)throw new Error("[_.sprintf] mixing positional and named placeholders is not (yet) supported");r.push(n)}t=t.substring(n[0].length)}return r},r}(),p={VERSION:"2.3.0",isBlank:function(e){return e==null&&(e=""),/^\s*$/.test(e)},stripTags:function(e){return e==null?"":t(e).replace(/<\/?[^>]+>/g,"")},capitalize:function(e){return e=e==null?"":t(e),e.charAt(0).toUpperCase()+e.slice(1)},chop:function(e,n){return e==null?[]:(e=t(e),n=~~n,n>0?e.match(new RegExp(".{1,"+n+"}","g")):[e])},clean:function(e){return p.strip(e).replace(/\s+/g," ")},count:function(e,n){if(e==null||n==null)return 0;e=t(e),n=t(n);var r=0,i=0,s=n.length;for(;;){i=e.indexOf(n,i);if(i===-1)break;r++,i+=s}return r},chars:function(e){return e==null?[]:t(e).split("")},swapCase:function(e){return e==null?"":t(e).replace(/\S/g,function(e){return e===e.toUpperCase()?e.toLowerCase():e.toUpperCase()})},escapeHTML:function(e){return e==null?"":t(e).replace(/[&<>"']/g,function(e){return"&"+l[e]+";"})},unescapeHTML:function(e){return e==null?"":t(e).replace(/\&([^;]+);/g,function(e,n){var r;return n in f?f[n]:(r=n.match(/^#x([\da-fA-F]+)$/))?t.fromCharCode(parseInt(r[1],16)):(r=n.match(/^#(\d+)$/))?t.fromCharCode(~~r[1]):e})},escapeRegExp:function(e){return e==null?"":t(e).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")},splice:function(e,t,n,r){var i=p.chars(e);return i.splice(~~t,~~n,r),i.join("")},insert:function(e,t,n){return p.splice(e,t,0,n)},include:function(e,n){return n===""?!0:e==null?!1:t(e).indexOf(n)!==-1},join:function(){var e=u.call(arguments),t=e.shift();return t==null&&(t=""),e.join(t)},lines:function(e){return e==null?[]:t(e).split("\n")},reverse:function(e){return p.chars(e).reverse().join("")},startsWith:function(e,n){return n===""?!0:e==null||n==null?!1:(e=t(e),n=t(n),e.length>=n.length&&e.slice(0,n.length)===n)},endsWith:function(e,n){return n===""?!0:e==null||n==null?!1:(e=t(e),n=t(n),e.length>=n.length&&e.slice(e.length-n.length)===n)},succ:function(e){return e==null?"":(e=t(e),e.slice(0,-1)+t.fromCharCode(e.charCodeAt(e.length-1)+1))},titleize:function(e){return e==null?"":t(e).replace(/(?:^|\s)\S/g,function(e){return e.toUpperCase()})},camelize:function(e){return p.trim(e).replace(/[-_\s]+(.)?/g,function(e,t){return t.toUpperCase()})},underscored:function(e){return p.trim(e).replace(/([a-z\d])([A-Z]+)/g,"$1_$2").replace(/[-\s]+/g,"_").toLowerCase()},dasherize:function(e){return p.trim(e).replace(/([A-Z])/g,"-$1").replace(/[-_\s]+/g,"-").toLowerCase()},classify:function(e){return p.titleize(t(e).replace(/_/g," ")).replace(/\s/g,"")},humanize:function(e){return p.capitalize(p.underscored(e).replace(/_id$/,"").replace(/_/g," "))},trim:function(e,r){return e==null?"":!r&&n?n.call(e):(r=a(r),t(e).replace(new RegExp("^"+r+"+|"+r+"+$","g"),""))},ltrim:function(e,n){return e==null?"":!n&&i?i.call(e):(n=a(n),t(e).replace(new RegExp("^"+n+"+"),""))},rtrim:function(e,n){return e==null?"":!n&&r?r.call(e):(n=a(n),t(e).replace(new RegExp(n+"+$"),""))},truncate:function(e,n,r){return e==null?"":(e=t(e),r=r||"...",n=~~n,e.length>n?e.slice(0,n)+r:e)},prune:function(e,n,r){if(e==null)return"";e=t(e),n=~~n,r=r!=null?t(r):"...";if(e.length<=n)return e;var i=function(e){return e.toUpperCase()!==e.toLowerCase()?"A":" "},s=e.slice(0,n+1).replace(/.(?=\W*\w*$)/g,i);return s.slice(s.length-2).match(/\w\w/)?s=s.replace(/\s*\S+$/,""):s=p.rtrim(s.slice(0,s.length-1)),(s+r).length>e.length?e:e.slice(0,s.length)+r},words:function(e,t){return p.isBlank(e)?[]:p.trim(e,t).split(t||/\s+/)},pad:function(e,n,r,i){e=e==null?"":t(e),n=~~n;var s=0;r?r.length>1&&(r=r.charAt(0)):r=" ";switch(i){case"right":return s=n-e.length,e+o(r,s);case"both":return s=n-e.length,o(r,Math.ceil(s/2))+e+o(r,Math.floor(s/2));default:return s=n-e.length,o(r,s)+e}},lpad:function(e,t,n){return p.pad(e,t,n)},rpad:function(e,t,n){return p.pad(e,t,n,"right")},lrpad:function(e,t,n){return p.pad(e,t,n,"both")},sprintf:h,vsprintf:function(e,t){return t.unshift(e),h.apply(null,t)},toNumber:function(e,n){if(e==null||e=="")return 0;e=t(e);var r=s(s(e).toFixed(~~n));return r===0&&!e.match(/^0+$/)?Number.NaN:r},numberFormat:function(e,t,n,r){if(isNaN(e)||e==null)return"";e=e.toFixed(~~t),r=typeof r=="string"?r:",";var i=e.split("."),s=i[0],o=i[1]?(n||".")+i[1]:"";return s.replace(/(\d)(?=(?:\d{3})+$)/g,"$1"+r)+o},strRight:function(e,n){if(e==null)return"";e=t(e),n=n!=null?t(n):n;var r=n?e.indexOf(n):-1;return~r?e.slice(r+n.length,e.length):e},strRightBack:function(e,n){if(e==null)return"";e=t(e),n=n!=null?t(n):n;var r=n?e.lastIndexOf(n):-1;return~r?e.slice(r+n.length,e.length):e},strLeft:function(e,n){if(e==null)return"";e=t(e),n=n!=null?t(n):n;var r=n?e.indexOf(n):-1;return~r?e.slice(0,r):e},strLeftBack:function(e,t){if(e==null)return"";e+="",t=t!=null?""+t:t;var n=e.lastIndexOf(t);return~n?e.slice(0,n):e},toSentence:function(e,t,n,r){t=t||", ",n=n||" and ";var i=e.slice(),s=i.pop();return e.length>2&&r&&(n=p.rtrim(t)+n),i.length?i.join(t)+n+s:s},toSentenceSerial:function(){var e=u.call(arguments);return e[3]=!0,p.toSentence.apply(p,e)},slugify:function(e){if(e==null)return"";var n="ąàáäâãåæćęèéëêìíïîłńòóöôõøùúüûñçżź",r="aaaaaaaaceeeeeiiiilnoooooouuuunczz",i=new RegExp(a(n),"g");return e=t(e).toLowerCase().replace(i,function(e){var t=n.indexOf(e);return r.charAt(t)||"-"}),p.dasherize(e.replace(/[^\w\s-]/g,""))},surround:function(e,t){return[t,e,t].join("")},quote:function(e){return p.surround(e,'"')},exports:function(){var e={};for(var t in this){if(!this.hasOwnProperty(t)||t.match(/^(?:include|contains|reverse)$/))continue;e[t]=this[t]}return e},repeat:function(e,n,r){if(e==null)return"";n=~~n;if(r==null)return o(t(e),n);for(var i=[];n>0;i[--n]=e);return i.join(r)},levenshtein:function(e,n){if(e==null&&n==null)return 0;if(e==null)return t(n).length;if(n==null)return t(e).length;e=t(e),n=t(n);var r=[],i,s;for(var o=0;o<=n.length;o++)for(var u=0;u<=e.length;u++)o&&u?e.charAt(u-1)===n.charAt(o-1)?s=i:s=Math.min(r[u],r[u-1],i)+1:s=o+u,i=r[u],r[u]=s;return r.pop()}};p.strip=p.trim,p.lstrip=p.ltrim,p.rstrip=p.rtrim,p.center=p.lrpad,p.rjust=p.lpad,p.ljust=p.rpad,p.contains=p.include,p.q=p.quote,typeof exports!="undefined"&&(typeof module!="undefined"&&module.exports&&(module.exports=p),exports._s=p),typeof define=="function"&&define.amd&&define("underscore.string",[],function(){return p}),e._=e._||{},e._.string=e._.str=p}(this,String);


/**
 * DeviceDetection Class
 * @author Daniel Pötzinger
 * @author Darius Aukstinaitis
 */
DeviceDetection = function(ua) {
	/**
	 * @type string the user agend string used (readonly)
	 */
	this.ua;
	/**
	 * @type object struct with common check results for performance
	 */
	this.checks;
	/**
	 * Constructor
	 * @param string ua Optional the useragent string - if not given its retrieved from browser
	 */
	this.construct = function(ua) {
		if (typeof ua == 'undefined') {
			var ua = navigator.userAgent;
		}
		this.ua = ua;
		// parse data
		this.checks = {
		  iphone: Boolean(ua.match(/iPhone/)),
		  ipod: Boolean(ua.match(/iPod/)),
		  ipad: Boolean(ua.match(/iPad/)),
		  blackberry: Boolean(ua.match(/BlackBerry/)),
		  playbook: Boolean(ua.match(/PlayBook/)),
		  android: Boolean(ua.match(/Android/)),
		  macOS: Boolean(ua.match(/Mac OS X/)),
		  win: Boolean(ua.match(/Windows/)),
		  mac: Boolean(ua.match(/Macintosh/)),	  
		  wphone: Boolean(ua.match(/(Windows Phone OS|Windows CE|Windows Mobile)/)),
		  mobile: Boolean(ua.match(/Mobile/)),
		  /* http://mojosunite.com/tablet-user-agent-strings */
		  androidTablet: Boolean( ua.match(/(GT-P1000|SGH-T849|SHW-M180S)/) ),
		  tabletPc: Boolean(ua.match(/Tablet PC/)),
		  palmDevice: Boolean(ua.match(/(PalmOS|PalmSource| Pre\/)/)),
		  kindle: Boolean(ua.match(/(Kindle)/)),
		  otherMobileHints: Boolean(ua.match(/(Opera Mini|IEMobile|SonyEricsson|smartphone)/)),
		};		
	}

	this.isTouchDevice = function() {
		return this.checks.iphone || this.checks.ipod || this.checks.ipad;
	}
	
	this.isApple = function() {
		return this.checks.iphone || this.checks.ipod || this.checks.ipad || this.checks.macOS  || this.checks.mac;
	}
	
	this.isBlackberry = function() {
		return this.checks.blackberry;
	}
	
	this.isAndroid = function() {
		return this.checks.android;
	}
	
	this.isTablet = function() {
		return this.checks.ipad || this.checks.tabletPc || this.checks.playbook || this.checks.androidTablet || this.checks.kindle;
	}
	this.isDesktop = function() {
		return !this.isTouchDevice() && !this.isSmartPhone() && !this.isTablet()
	}
	this.isSmartPhone = function() {
		return (this.checks.mobile || this.checks.blackberry || this.checks.palmDevice || this.checks.otherMobileHints) && !this.isTablet() && !this.checks.ipod;
	}	
	
	this.construct(ua);
}




// retina.js, a high-resolution image swapper (http://retinajs.com), v0.0.2

// (function(){console.log("Retina JS loaded");function t(e){this.path=e;var t=this.path.split("."),n=t.slice(0,t.length-1).join("."),r=t[t.length-1];this.at_2x_path=n+"@2x."+r}function n(e){this.el=e,this.path=new t(this.el.getAttribute("src"));var n=this;this.path.check_2x_variant(function(e){e&&n.swap()})}var e=typeof exports=="undefined"?window:exports;e.RetinaImagePath=t,t.confirmed_paths=[],t.prototype.is_external=function(){return!!this.path.match(/^https?\:/i)&&!this.path.match("//"+document.domain)},t.prototype.check_2x_variant=function(e){var n,r=this;if(this.is_external())return e(!1);if(this.at_2x_path in t.confirmed_paths)return e(!0);n=new XMLHttpRequest,n.open("HEAD",this.at_2x_path),n.onreadystatechange=function(){return n.readyState!=4?e(!1):n.status>=200&&n.status<=399?(t.confirmed_paths.push(r.at_2x_path),e(!0)):e(!1)},n.send()},e.RetinaImage=n,n.prototype.swap=function(e){function n(){t.el.complete?(t.el.setAttribute("width",t.el.offsetWidth),t.el.setAttribute("height",t.el.offsetHeight),t.el.setAttribute("src",e)):setTimeout(n,5)}typeof e=="undefined"&&(e=this.path.at_2x_path);var t=this;n()},e.devicePixelRatio>1&&(window.onload=function(){console.log("Hello darling");var e=document.getElementsByTagName("img"),t=[],r,i;for(r=0;r<e.length;r++)i=e[r],t.push(new n(i))})})();

(function() {

  var root = (typeof exports == 'undefined' ? window : exports);

  var config = {
    // Ensure Content-Type is an image before trying to load @2x image
    // https://github.com/imulus/retinajs/pull/45)
    check_mime_type: true
  };



  root.Retina = Retina;

  function Retina() {}

  Retina.configure = function(options) {
    if (options == null) options = {};
    for (var prop in options) config[prop] = options[prop];
  };

  Retina.init = function(context) {
    if (context == null) context = root;

    var existing_onload = context.onload || new Function;

    // context.onload = function() {
      var images = document.getElementsByTagName("img"), retinaImages = [], i, image;      
      for (i = 0; i < images.length; i++) {
        image = images[i];
        retinaImages.push(new RetinaImage(image));
      }
      existing_onload();
    // }
  };

  Retina.isRetina = function(){
    var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
                      (min--moz-device-pixel-ratio: 1.5),\
                      (-o-min-device-pixel-ratio: 3/2),\
                      (min-resolution: 1.5dppx)";

    if (root.devicePixelRatio > 1)
      return true;

    if (root.matchMedia && root.matchMedia(mediaQuery).matches)
      return true;

    return false;
  };


  root.RetinaImagePath = RetinaImagePath;

  function RetinaImagePath(path) {
    this.path = path;
    this.at_2x_path = path.replace(/\.\w+$/, function(match) { return "@2x" + match; });
  }

  RetinaImagePath.confirmed_paths = [];

  RetinaImagePath.prototype.is_external = function() {
    return !!(this.path.match(/^https?\:/i) && !this.path.match('//' + document.domain) )
  }

  RetinaImagePath.prototype.check_2x_variant = function(callback) {
    var http, that = this;
    if (this.is_external()) {
      return callback(false);
    } else if (this.at_2x_path in RetinaImagePath.confirmed_paths) {
      return callback(true);
    } else {
      http = new XMLHttpRequest;
      http.open('HEAD', this.at_2x_path);
      http.onreadystatechange = function() {
        if (http.readyState != 4) {
          return callback(false);
        }

        if (http.status >= 200 && http.status <= 399) {
          if (config.check_mime_type) {
            var type = http.getResponseHeader('Content-Type');
            if (type == null || !type.match(/^image/i)) {
              return callback(false);
            }
          }

          RetinaImagePath.confirmed_paths.push(that.at_2x_path);
          return callback(true);
        } else {
          return callback(false);
        }
      }
      http.send();
    }
  }

  function RetinaImage(el) {
    this.el = el;
    this.path = new RetinaImagePath(this.el.getAttribute('src'));

    var that = this;    
    this.path.check_2x_variant(function(hasVariant) {
      if (hasVariant) that.swap();
    });
  }

  root.RetinaImage = RetinaImage;

  RetinaImage.prototype.swap = function(path) {
    if (typeof path == 'undefined') path = this.path.at_2x_path;

    var that = this;
    function load() {
      if (! that.el.complete) {
        setTimeout(load, 5);
      } else {
        that.el.setAttribute('width', that.el.offsetWidth);
        that.el.setAttribute('height', that.el.offsetHeight);
        that.el.setAttribute('src', path);
      }
    }
    load();
  }




  if (Retina.isRetina()) {
    Retina.init(root);
  }

})();



(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,v=e.reduce,h=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,_=Object.keys,j=i.bind,w=function(n){return n instanceof w?n:this instanceof w?(this._wrapped=n,void 0):new w(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=w),exports._=w):n._=w,w.VERSION="1.4.3";var A=w.each=w.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a in n)if(w.has(n,a)&&t.call(e,n[a],a,n)===r)return};w.map=w.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e[e.length]=t.call(r,n,u,i)}),e)};var O="Reduce of empty array with no initial value";w.reduce=w.foldl=w.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduce===v)return e&&(t=w.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},w.reduceRight=w.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduceRight===h)return e&&(t=w.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=w.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},w.find=w.detect=function(n,t,r){var e;return E(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},w.filter=w.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&(e[e.length]=n)}),e)},w.reject=function(n,t,r){return w.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},w.every=w.all=function(n,t,e){t||(t=w.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var E=w.some=w.any=function(n,t,e){t||(t=w.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};w.contains=w.include=function(n,t){return null==n?!1:y&&n.indexOf===y?-1!=n.indexOf(t):E(n,function(n){return n===t})},w.invoke=function(n,t){var r=o.call(arguments,2);return w.map(n,function(n){return(w.isFunction(t)?t:n[t]).apply(n,r)})},w.pluck=function(n,t){return w.map(n,function(n){return n[t]})},w.where=function(n,t){return w.isEmpty(t)?[]:w.filter(n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},w.max=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.max.apply(Math,n);if(!t&&w.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>=e.computed&&(e={value:n,computed:a})}),e.value},w.min=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.min.apply(Math,n);if(!t&&w.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;e.computed>a&&(e={value:n,computed:a})}),e.value},w.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=w.random(r++),e[r-1]=e[t],e[t]=n}),e};var F=function(n){return w.isFunction(n)?n:function(t){return t[n]}};w.sortBy=function(n,t,r){var e=F(t);return w.pluck(w.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||void 0===r)return 1;if(e>r||void 0===e)return-1}return n.index<t.index?-1:1}),"value")};var k=function(n,t,r,e){var u={},i=F(t||w.identity);return A(n,function(t,a){var o=i.call(r,t,a,n);e(u,o,t)}),u};w.groupBy=function(n,t,r){return k(n,t,r,function(n,t,r){(w.has(n,t)?n[t]:n[t]=[]).push(r)})},w.countBy=function(n,t,r){return k(n,t,r,function(n,t){w.has(n,t)||(n[t]=0),n[t]++})},w.sortedIndex=function(n,t,r,e){r=null==r?w.identity:F(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;u>r.call(e,n[o])?i=o+1:a=o}return i},w.toArray=function(n){return n?w.isArray(n)?o.call(n):n.length===+n.length?w.map(n,w.identity):w.values(n):[]},w.size=function(n){return null==n?0:n.length===+n.length?n.length:w.keys(n).length},w.first=w.head=w.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},w.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},w.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},w.rest=w.tail=w.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},w.compact=function(n){return w.filter(n,w.identity)};var R=function(n,t,r){return A(n,function(n){w.isArray(n)?t?a.apply(r,n):R(n,t,r):r.push(n)}),r};w.flatten=function(n,t){return R(n,t,[])},w.without=function(n){return w.difference(n,o.call(arguments,1))},w.uniq=w.unique=function(n,t,r,e){w.isFunction(t)&&(e=r,r=t,t=!1);var u=r?w.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:w.contains(a,r))||(a.push(r),i.push(n[e]))}),i},w.union=function(){return w.uniq(c.apply(e,arguments))},w.intersection=function(n){var t=o.call(arguments,1);return w.filter(w.uniq(n),function(n){return w.every(t,function(t){return w.indexOf(t,n)>=0})})},w.difference=function(n){var t=c.apply(e,o.call(arguments,1));return w.filter(n,function(n){return!w.contains(t,n)})},w.zip=function(){for(var n=o.call(arguments),t=w.max(w.pluck(n,"length")),r=Array(t),e=0;t>e;e++)r[e]=w.pluck(n,""+e);return r},w.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},w.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=w.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},w.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},w.range=function(n,t,r){1>=arguments.length&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=Array(e);e>u;)i[u++]=n,n+=r;return i};var I=function(){};w.bind=function(n,t){var r,e;if(n.bind===j&&j)return j.apply(n,o.call(arguments,1));if(!w.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));I.prototype=n.prototype;var u=new I;I.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},w.bindAll=function(n){var t=o.call(arguments,1);return 0==t.length&&(t=w.functions(n)),A(t,function(t){n[t]=w.bind(n[t],n)}),n},w.memoize=function(n,t){var r={};return t||(t=w.identity),function(){var e=t.apply(this,arguments);return w.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},w.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},w.defer=function(n){return w.delay.apply(w,[n,1].concat(o.call(arguments,1)))},w.throttle=function(n,t){var r,e,u,i,a=0,o=function(){a=new Date,u=null,i=n.apply(r,e)};return function(){var c=new Date,l=t-(c-a);return r=this,e=arguments,0>=l?(clearTimeout(u),u=null,a=c,i=n.apply(r,e)):u||(u=setTimeout(o,l)),i}},w.debounce=function(n,t,r){var e,u;return function(){var i=this,a=arguments,o=function(){e=null,r||(u=n.apply(i,a))},c=r&&!e;return clearTimeout(e),e=setTimeout(o,t),c&&(u=n.apply(i,a)),u}},w.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},w.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},w.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},w.after=function(n,t){return 0>=n?t():function(){return 1>--n?t.apply(this,arguments):void 0}},w.keys=_||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)w.has(n,r)&&(t[t.length]=r);return t},w.values=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push(n[r]);return t},w.pairs=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push([r,n[r]]);return t},w.invert=function(n){var t={};for(var r in n)w.has(n,r)&&(t[n[r]]=r);return t},w.functions=w.methods=function(n){var t=[];for(var r in n)w.isFunction(n[r])&&t.push(r);return t.sort()},w.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},w.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},w.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)w.contains(r,u)||(t[u]=n[u]);return t},w.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)null==n[r]&&(n[r]=t[r])}),n},w.clone=function(n){return w.isObject(n)?w.isArray(n)?n.slice():w.extend({},n):n},w.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof w&&(n=n._wrapped),t instanceof w&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==t+"";case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;r.push(n),e.push(t);var a=0,o=!0;if("[object Array]"==u){if(a=n.length,o=a==t.length)for(;a--&&(o=S(n[a],t[a],r,e)););}else{var c=n.constructor,f=t.constructor;if(c!==f&&!(w.isFunction(c)&&c instanceof c&&w.isFunction(f)&&f instanceof f))return!1;for(var s in n)if(w.has(n,s)&&(a++,!(o=w.has(t,s)&&S(n[s],t[s],r,e))))break;if(o){for(s in t)if(w.has(t,s)&&!a--)break;o=!a}}return r.pop(),e.pop(),o};w.isEqual=function(n,t){return S(n,t,[],[])},w.isEmpty=function(n){if(null==n)return!0;if(w.isArray(n)||w.isString(n))return 0===n.length;for(var t in n)if(w.has(n,t))return!1;return!0},w.isElement=function(n){return!(!n||1!==n.nodeType)},w.isArray=x||function(n){return"[object Array]"==l.call(n)},w.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){w["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),w.isArguments(arguments)||(w.isArguments=function(n){return!(!n||!w.has(n,"callee"))}),w.isFunction=function(n){return"function"==typeof n},w.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},w.isNaN=function(n){return w.isNumber(n)&&n!=+n},w.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},w.isNull=function(n){return null===n},w.isUndefined=function(n){return void 0===n},w.has=function(n,t){return f.call(n,t)},w.noConflict=function(){return n._=t,this},w.identity=function(n){return n},w.times=function(n,t,r){for(var e=Array(n),u=0;n>u;u++)e[u]=t.call(r,u);return e},w.random=function(n,t){return null==t&&(t=n,n=0),n+(0|Math.random()*(t-n+1))};var T={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};T.unescape=w.invert(T.escape);var M={escape:RegExp("["+w.keys(T.escape).join("")+"]","g"),unescape:RegExp("("+w.keys(T.unescape).join("|")+")","g")};w.each(["escape","unescape"],function(n){w[n]=function(t){return null==t?"":(""+t).replace(M[n],function(t){return T[n][t]})}}),w.result=function(n,t){if(null==n)return null;var r=n[t];return w.isFunction(r)?r.call(n):r},w.mixin=function(n){A(w.functions(n),function(t){var r=w[t]=n[t];w.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(w,n))}})};var N=0;w.uniqueId=function(n){var t=""+ ++N;return n?n+t:t},w.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;w.template=function(n,t,r){r=w.defaults({},r,w.templateSettings);var e=RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(D,function(n){return"\\"+B[n]}),r&&(i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(i+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),a&&(i+="';\n"+a+"\n__p+='"),u=o+t.length,t}),i+="';\n",r.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=Function(r.variable||"obj","_",i)}catch(o){throw o.source=i,o}if(t)return a(t,w);var c=function(n){return a.call(this,n,w)};return c.source="function("+(r.variable||"obj")+"){\n"+i+"}",c},w.chain=function(n){return w(n).chain()};var z=function(n){return this._chain?w(n).chain():n};w.mixin(w),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];w.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];w.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),w.extend(w.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);

/**
 * VERSION: beta 1.21
 * DATE: 2012-05-15
 * JavaScript (ActionScript 3 and 2 also available)
 * UPDATES AND DOCS AT: http://www.greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, easing.EasePack, plugins.CSSPlugin, plugins.RoundPropsPlugin
 *
 * Copyright (c) 2008-2012, GreenSock. All rights reserved. 
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * corporate Club GreenSock members, the software agreement that was issued with the corporate 
 * membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

(window._gsQueue || (window._gsQueue = [])).push( function() {

/*
 * ----------------------------------------------------------------
 * TweenMax
 * ----------------------------------------------------------------
 */
	_gsRequire("TweenMax", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {
		
		var TweenMax = function(target, duration, vars) {
				TweenLite.call(this, target, duration, vars);
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo == true);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._dirty = true; //ensures that if there is any repeat, the totalDuration will get recalculated to accurately report it.
			},
			p = TweenMax.prototype = TweenLite.to({}, 0.1, {}),
			_blankArray = [];
			
		p.constructor = TweenMax;
		p.kill()._gc = false;
		TweenMax.killTweensOf = TweenMax.killDelayedCallsTo = TweenLite.killTweensOf;
		TweenMax.getTweensOf = TweenLite.getTweensOf;		
	
		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo == true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return TweenLite.invalidate.call(this);
		};
		
		p.updateTo = function(vars, resetDuration) {
			var curRatio = this.ratio, p;
			if (resetDuration) if (this.timeline != null) if (this._startTime < this._timeline._time) {
				this._startTime = this._timeline._time;
				this._uncache(false);
				if (this._gc) {
					this._enabled(true, false);
				} else {
					this._timeline.insert(this, this._startTime - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			for (p in vars) {
				this.vars[p] = vars[p];
			}
			if (this._initted) {
				if (resetDuration) {
					this._initted = false;
				} else {
					if (this._notifyPluginsOfEnabled && this._firstPT) {
						TweenLite._onPluginEvent("_onDisable", this); //in case a plugin like MotionBlur must perform some cleanup tasks
					}
					if (this._time / this._duration > 0.998) { //if the tween has finished (or come extremely close to finishing), we just need to rewind it to 0 and then render it again at the end which forces it to re-initialize (parsing the new vars). We allow tweens that are close to finishing (but haven't quite finished) to work this way too because otherwise, the values are so small when determining where to project the starting values that binary math issues creep in and can make the tween appear to render incorrectly when run backwards. 
						var prevTime = this._time;
						this.render(0, true, false);
						this._initted = false;
						this.render(prevTime, true, false);
					} else if (this._time > 0) {
						this._initted = false;
						this._init();
						var inv = 1 / (1 - curRatio),
							pt = this._firstPT, endValue;
						while (pt) {
							endValue = pt.s + pt.c; 
							pt.c *= inv;
							pt.s = endValue - pt.c;
							pt = pt._next;
						}
					}
				}
			}
			return this;
		};
				
		p.render = function(time, suppressEvents, force) {
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(), 
				prevTime = this._time,
				prevTotalTime = this._totalTime, 
				prevCycle = this._cycle, 
				isComplete, callback, pt;
			if (time >= totalDur) {
				this._totalTime = totalDur;
				this._cycle = this._repeat;
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = 0;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				} else {
					this._time = this._duration;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				}
				if (!this._reversed) {
					isComplete = true;
					callback = "onComplete";
				}
				if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time) {
						force = true;
					}
					this._rawPrevTime = time;
				}
				
			} else if (time <= 0) {
				this._totalTime = this._time = this._cycle = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTotalTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (this._rawPrevTime >= 0) {
							force = true;
						}
						this._rawPrevTime = time;
					}
				} else if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;
				
				if (this._repeat !== 0) {
					var cycleDuration = this._duration + this._repeatDelay;
					this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but Flash reports it as 0.79999999!)
					if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration) {
						this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
					}
					this._time = this._totalTime - (this._cycle * cycleDuration);
					if (this._yoyo) if ((this._cycle & 1) !== 0) {
						this._time = this._duration - this._time;
					}
					if (this._time > this._duration) {
						this._time = this._duration;
					} else if (this._time < 0) {
						this._time = 0;
					}
				}
				
				if (this._easeType) {
					var r = this._time / this._duration, 
						type = this._easeType, 
						pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}
					
					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (this._time / this._duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}
					
				} else {
					this.ratio = this._ease.getRatio(this._time / this._duration);
				}
				
			}
				
			if (prevTime === this._time && !force) {
				return;
			} else if (!this._initted) {
				this._init();
				if (!isComplete && this._time) { //_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
					this.ratio = this._ease.getRatio(this._time / this._duration);
				}
			}
			
			
			
			if (!this._active) if (!this._paused) {
				this._active = true; //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTotalTime == 0) if (this.vars.onStart) if (this._totalTime !== 0 || this._duration === 0) if (!suppressEvents) {
				this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
			}
			
			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}
			
			if (this._onUpdate) if (!suppressEvents) {
				this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
			}
			if (this._cycle != prevCycle) if (!suppressEvents) if (!this._gc) if (this.vars.onRepeat) {
				this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || _blankArray);
			}
			if (callback) if (!this._gc) { //check gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents) if (this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}
		};
		
//---- STATIC FUNCTIONS -----------------------------------------------------------------------------------------------------------
		
		TweenMax.to = function(target, duration, vars) {
			return new TweenMax(target, duration, vars);
		};
		
		TweenMax.from = function(target, duration, vars) {
			vars.runBackwards = true;
			if (vars.immediateRender != false) {
				vars.immediateRender = true;
			}
			return new TweenMax(target, duration, vars);
		};
		
		TweenMax.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			if (fromVars.immediateRender) {
				toVars.immediateRender = true;
			}
			return new TweenMax(target, duration, toVars);
		};
		
		TweenMax.staggerTo = TweenMax.allTo = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			stagger = stagger || 0;
			var a = [],
				l = targets.length,
				delay = vars.delay || 0,
				copy, i, p;
			for (i = 0; i < l; i++) {
				copy = {};
				for (p in vars) {
					copy[p] = vars[p];
				}
				copy.delay = delay;
				if (i === l - 1) if (onCompleteAll) {
					copy.onComplete = function() {
						if (vars.onComplete) {
							vars.onComplete.apply(vars.onCompleteScope, vars.onCompleteParams);
						}
						onCompleteAll.apply(onCompleteAllScope, onCompleteAllParams);
					}
				}
				a[i] = new TweenMax(targets[i], duration, copy);
				delay += stagger;
			}
			return a;
		};
		
		TweenMax.staggerFrom = TweenMax.allFrom = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.runBackwards = true;
			if (vars.immediateRender != false) {
				vars.immediateRender = true;
			}
			return TweenMax.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};
		
		TweenMax.staggerFromTo = TweenMax.allFromTo = function(targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			if (fromVars.immediateRender) {
				toVars.immediateRender = true;
			}
			return TweenMax.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};
				
		TweenMax.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenMax(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, onCompleteScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, onReverseCompleteScope:scope, immediateRender:false, useFrames:useFrames, overwrite:0});
		};
		
		TweenMax.set = function(target, vars) {
			return new TweenMax(target, 0, vars);
		};
		
		TweenMax.isTweening = function(target) {
			var a = TweenLite.getTweensOf(target),
				i = a.length,
				tween;
			while (--i > -1) {
				if (((tween = a[i])._active || (tween._startTime === tween.timeline._time && tween.timeline._active))) {
					return true;
				}
			}
			return false;
		};
		
		TweenMax.getAllTweens = function(includeTimelines) {
			var a = _getChildrenOf(Animation._rootTimeline, includeTimelines);
			return a.concat( _getChildrenOf(Animation._rootFramesTimeline, includeTimelines) );
		};
		
		var _getChildrenOf = function(timeline, includeTimelines) {
			var a = [],
				cnt = 0,
				tween = timeline._first;
			while (tween) {
				if (tween instanceof TweenLite) {
					a[cnt++] = tween;
				} else {
					if (includeTimelines) {
						a[cnt++] = tween;
					}
					a = a.concat(_getChildrenOf(tween, includeTimelines));
					cnt = a.length;
				}
				tween = tween._next;
			}
			return a;
		};
		
		TweenMax.killAll = function(complete, tweens, delayedCalls, timelines) {
			if (tweens == null) {
				tweens = true;
			}
			if (delayedCalls == null) {
				delayedCalls = true;
			}
			var a = getAllTweens((timelines != false)),
				i = a.length,
				allTrue = (tweens && delayedCalls && timelines),
				isDC, tween;
			while (--i > -1) {
				tween = a[i];
				if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					if (complete) {
						tween.totalTime(tween.totalDuration());
					} else {
						tween._enabled(false, false);
					}
				}
			}
		};
		
		TweenMax.pauseAll = function(tweens, delayedCalls, timelines) {
			_changePause(true, tweens, delayedCalls, timelines);
		};
		
		TweenMax.resumeAll = function(tweens, delayedCalls, timelines) {
			_changePause(false, tweens, delayedCalls, timelines);
		};
		
		var _changePause = function(pause, tweens, delayedCalls, timelines) {
			if (tweens == undefined) {
				tweens = true;
			}
			if (delayedCalls == undefined) {
				delayedCalls = true;
			}
			var a = getAllTweens(timelines),
				allTrue = (tweens && delayedCalls && timelines),
				i = a.length,
				isDC, tween;
			while (--i > -1) {
				tween = a[i];
				if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					tween.paused(pause);
				}
			}
		};
		
	
//---- GETTERS / SETTERS ----------------------------------------------------------------------------------------------------------
		
		p.progress = function(value) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * value + (this._cycle * this._duration), false);
		};
		
		p.totalProgress = function(value) {
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, false);
		};
		
		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat != 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};
		
		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					//instead of Infinity, we use 999999999999 so that we can accommodate reverses
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
					this._dirty = false;
				}
				return this._totalDuration;
			}
			return (this._repeat == -1) ? this : this.duration( (value - (this._repeat * this._repeatDelay)) / (this._repeat + 1) );
		};
		
		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};
		
		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};
		
		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};
		
		
		return TweenMax;
		
	}, true);




/*
 * ----------------------------------------------------------------
 * TimelineLite 													(!TimelineLite)
 * ----------------------------------------------------------------
 */
	_gsRequire("TimelineLite", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {
		
		"use strict";
		
		var TimelineLite = function(vars) {
				SimpleTimeline.call(this, vars);
				this._labels = {};
				this.autoRemoveChildren = (this.vars.autoRemoveChildren == true);
				this.smoothChildTiming = (this.vars.smoothChildTiming == true);
				this._sortChildren = true;
				this._onUpdate = this.vars.onUpdate;
				var i = _paramProps.length,
					j, a;
				while (--i > -1) {
					if ((a = this.vars[_paramProps[i]])) {
						j = a.length;
						while (--j > -1) {
							if (a[j] === "{self}") {
								a = this.vars[_paramProps[i]] = a.concat(); //copy the array in case the user referenced the same array in multiple timelines/tweens (each {self} should be unique)
								a[j] = this;
							}
						}
					}
				}
				if (this.vars.tweens instanceof Array) {
					this.insertMultiple(this.vars.tweens, 0, this.vars.align || "normal", this.vars.stagger || 0);
				}
			},
			_paramProps = ["onStartParams","onUpdateParams","onCompleteParams","onReverseCompleteParams","onRepeatParams"],
			_blankArray = [],
			p = TimelineLite.prototype = new SimpleTimeline();
			
		p.constructor = TimelineLite;
		p.kill()._gc = false;
		
		p.to = function(target, duration, vars, offset, baseTimeOrLabel) {
			return this.insert( new TweenLite(target, duration, vars), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0)); 
		}
		
		p.from = function(target, duration, vars, offset, baseTimeOrLabel) {
			return this.insert( TweenLite.from(target, duration, vars), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
		}
		
		p.fromTo = function(target, duration, fromVars, toVars, offset, baseTimeOrLabel) {
			return this.insert( TweenLite.fromTo(target, duration, fromVars, toVars), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
		}
		
		p.staggerTo = function(targets, duration, vars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			var tl = new TimelineLite({onComplete:onCompleteAll, onCompleteParams:onCompleteAllParams, onCompleteScope:onCompleteAllScope});
			stagger = stagger || 0;
			for (var i = 0; i < targets.length; i++) {
				tl.insert( new TweenLite(targets[i], duration, vars), i * stagger);
			}
			return this.insert(tl, this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
		}
		
		p.staggerFrom = function(targets, duration, vars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			if (vars.immediateRender == null) {
				vars.immediateRender = true;
			}
			vars.runBackwards = true;
			return this.staggerTo(targets, duration, vars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		}
		
		p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			if (fromVars.immediateRender) {
				toVars.immediateRender = true;
			}
			return this.staggerTo(targets, duration, toVars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		}
		
		p.call = function(callback, params, scope, offset, baseTimeOrLabel) {
			return this.insert( TweenLite.delayedCall(0, callback, params, scope), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
		}
		
		p.set = function(target, vars, offset, baseTimeOrLabel) {
			vars.immediateRender = false;
			return this.insert( new TweenLite(target, 0, vars), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
		}
		
		TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
			vars = vars || {};
			if (vars.smoothChildTiming == null) {
				vars.smoothChildTiming = true;
			}
			var tl = new TimelineLite(vars),
				root = tl._timeline;
			if (ignoreDelayedCalls == null) {
				ignoreDelayedCalls = true;
			}
			root._remove(tl, true);
			tl._startTime = 0;

			tl._rawPrevTime = tl._time = tl._totalTime = root._time;
			var tween = root._first, next;
			while (tween) {
				next = tween._next;
				if (!ignoreDelayedCalls || !(tween instanceof TweenLite && tween.target == tween.vars.onComplete)) {
					tl.insert(tween, tween._startTime - tween._delay);
				}
				tween = next;
			}
			root.insert(tl, 0);
			return tl;
		}
		
		p.insert = function(value, timeOrLabel) {
			if (value instanceof Animation) {
				//continue...
			} else if (value instanceof Array) {
				return this.insertMultiple(value, timeOrLabel);
			} else if (typeof(value) === "string") {
				return this.addLabel(value, this._parseTimeOrLabel(timeOrLabel || 0, true));
			} else if (typeof(value) === "function") {
				value = TweenLite.delayedCall(0, value);
			} else {
				throw ("ERROR: Cannot insert() " + value + " into the TimelineLite/Max because it is neither a tween, timeline, function, nor a String.");
				return this;
			}
			
			SimpleTimeline.prototype.insert.call(this, value, this._parseTimeOrLabel(timeOrLabel || 0, true));
			
			//if the timeline has already ended but the inserted tween/timeline extends the duration past the parent timeline's currentTime, we should enable this timeline again so that it renders properly.  
			if (this._gc) if (!this._paused) if (this._startTime + (value._startTime + (value._totalDuration / value._timeScale)) / this._timeScale > this.timeline._time) {
				//in case any of the anscestors had completed but should now be enabled...
				var tl = this;
				while (tl._gc && tl._timeline) {
					tl.totalTime(tl._totalTime, true); //also enables them
					tl = tl._timeline;
				}
			}
			return this;
		}
		
		p.remove = function(value) {
			if (value instanceof Animation) {
				return this._remove(value, false);
			} else if (value instanceof Array) {
				var i = value.length;
				while (--i > -1) {
					this.remove(value[i]);
				}
				return this;
			} else if (typeof(value) === "string") {
				return this.removeLabel(value);
			}
			return this.kill(null, value);
		}
		
		p.append = function(value, offset) {
			return this.insert(value, this.duration() + (offset || 0));
		}
		
		p.insertMultiple = function(tweens, timeOrLabel, align, stagger) {
			align = align || "normal";
			stagger = stagger || 0;
			var i, tween, curTime = this._parseTimeOrLabel(timeOrLabel || 0, true), l = tweens.length;
			for (i = 0; i < l; i++) {
				if ((tween = tweens[i]) instanceof Array) {
					tween = new TimelineLite({tweens:tween});
				}
				this.insert(tween, curTime);
				if (typeof(tween) === "string" || typeof(tween) === "function") {
					//do nothing
				} else if (align === "sequence") {
					curTime = tween._startTime + (tween.totalDuration() / tween._timeScale);
				} else if (align === "start") {
					tween._startTime -= tween.delay();
				}
				curTime += stagger;
			}
			return this._uncache(true);
		}
		
		p.appendMultiple = function(tweens, offset, align, stagger) {
			return this.insertMultiple(tweens, this.duration() + (offset || 0), align, stagger);
		}
		
		p.addLabel = function(label, time) {
			this._labels[label] = time;
			return this;
		}
	
		p.removeLabel = function(label) {
			delete this._labels[label];
			return this;
		}
		
		p.getLabelTime = function(label) {
			return (this._labels[label] != null) ? this._labels[label] : -1;
		}
		
		p._parseTimeOrLabel = function(timeOrLabel, appendIfAbsent) {
			if (timeOrLabel == null) {
				return this.duration();
			} else if (typeof(timeOrLabel) === "string" && isNaN(timeOrLabel)) {
				if (this._labels[timeOrLabel] == null) {
					return (appendIfAbsent) ? (this._labels[timeOrLabel] = this.duration()) : 0;
				}
				return this._labels[timeOrLabel];
			}
			return Number(timeOrLabel);
		}
		
		p.seek = function(timeOrLabel, suppressEvents) {
			return this.totalTime(this._parseTimeOrLabel(timeOrLabel, false), (suppressEvents != false));
		}
		
		p.stop = function() {
			return this.paused(true);
		}
	
		p.gotoAndPlay = function(timeOrLabel, suppressEvents) {
			return SimpleTimeline.prototype.play.call(this, timeOrLabel, suppressEvents);
		}
		
		p.gotoAndStop = function(timeOrLabel, suppressEvents) {
			return this.pause(timeOrLabel, suppressEvents);
		}
		
		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			this._active = !this._paused; 
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(), 
				prevTime = this._time, 
				prevStart = this._startTime, 
				prevTimeScale = this._timeScale, 
				prevPaused = this._paused,
				tween, isComplete, next, callback;
			if (time >= totalDur) {
				this._totalTime = this._time = totalDur;
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					if (this._duration === 0) if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time) { //In order to accommodate zero-duration timelines, we must discern the momentum/direction of time in order to render values properly when the "playhead" goes past 0 in the forward direction or lands directly on it, and also when it moves past it in the backward direction (from a postitive time to a negative time).
						force = true;
					}
				}
				this._rawPrevTime = time;
				time = totalDur + 0.000001; //to avoid occassional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off)

			} else if (time <= 0) {
				this._totalTime = this._time = 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._duration === 0) if (this._rawPrevTime >= 0) { //zero-duration timelines are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						force = true;
					}
				} else if (!this._initted) {
					force = true;
				}
				this._rawPrevTime = time;
				time = -0.000001; //to avoid occassional floating point rounding errors in Flash - sometimes child tweens/timelines were not being rendered at the very beginning (their progress might be 0.000000000001 instead of 0 because when Flash performed _time - tween._startTime, floating point errors would return a value that was SLIGHTLY off)
				
			} else {
				this._totalTime = this._time = this._rawPrevTime = time;
			}
			
			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._initted = true;
			}
			if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0) if (!suppressEvents) {
				this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
			}
			
			if (this._time > prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
						
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, false);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, false);
						}
						
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, false);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, false);
						}
						
					}
					tween = next;
				}
			}
			
			if (this._onUpdate) if (!suppressEvents) {
				this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
			}
			
			if (callback) if (!this._gc) if (prevStart === this._startTime || prevTimeScale != this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents) if (this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}
			
		}
		
		p._hasPausedChild = function() {
			var tween = this._first;
			while (tween) {
				if (tween._paused || ((tween instanceof TimelineLite) && tween._hasPausedChild())) {
					return true;
				}
				tween = tween._next;
			}
			return false;
		}
		
		p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || -9999999999;
			var a = [], 
				tween = this._first, 
				cnt = 0;
			while (tween) {
				if (tween._startTime < ignoreBeforeTime) {
					//do nothing
				} else if (tween instanceof TweenLite) {
					if (tweens != false) {
						a[cnt++] = tween;
					}
				} else {
					if (timelines != false) {
						a[cnt++] = tween;
					}
					if (nested != false) {
						a = a.concat(tween.getChildren(true, tweens, timelines));
						cnt = a.length;
					}
				}
				tween = tween._next;
			}
			return a;
		}
		
		p.getTweensOf = function(target, nested) {
			var tweens = TweenLite.getTweensOf(target), 
				i = tweens.length, 
				a = [], 
				cnt = 0;
			while (--i > -1) {
				if (tweens[i].timeline === this || (nested && this._contains(tweens[i]))) {
					a[cnt++] = tweens[i];
				}
			}
			return a;
		}
		
		p._contains = function(tween) {
			var tl = tween.timeline;
			while (tl) {
				if (tl === this) {
					return true;
				}
				tl = tl.timeline;
			}
			return false;
		}
		
		p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || 0;
			var tween = this._first;
			while (tween) {
				if (tween._startTime >= ignoreBeforeTime) {
					tween._startTime += amount;
				}
				tween = tween._next;
			}
			if (adjustLabels) {
				for (var p in this._labels) {
					if (this._labels[p] >= ignoreBeforeTime) {
						this._labels[p] += amount;
					}
				}
			}
			return this._uncache(true);
		}
		
		p._kill = function(vars, target) {
			if (vars == null) if (target == null) {
				return this._enabled(false, false);
			}
			var tweens = (target == null) ? this.getChildren(true, true, false) : this.getTweensOf(target),
				i = tweens.length, 
				changed = false;
			while (--i > -1) {
				if (tweens[i]._kill(vars, target)) {
					changed = true;
				}
			}
			return changed;
		}
		
		p.clear = function(labels) {
			var tweens = this.getChildren(false, true, true),
				i = tweens.length;
			this._time = this._totalTime = 0;
			while (--i > -1) {
				tweens[i]._enabled(false, false);
			}
			if (labels != false) {
				this._labels = {};
			}
			return this._uncache(true);
		}
		
		p.invalidate = function() {
			var tween = this._first;
			while (tween) {
				tween.invalidate();
				tween = tween._next;
			}
			return this;
		}
		
		p._enabled = function(enabled, ignoreTimeline) {
			if (enabled == this._gc) {
				var tween = this._first;
				while (tween) {
					tween._enabled(enabled, true);
					tween = tween._next;
				}
			}
			return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
		}
		
		p.progress = function(value) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime(this.duration() * value, false);
		}
		
		p.duration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					this.totalDuration(); //just triggers recalculation
				}
				return this._duration;
			}
			if (this.duration() !== 0) if (value !== 0) {
				this.timeScale(this._duration / value);
			}
			return this;
		}
		
		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					var max = 0, 
						tween = this._first, 
						prevStart = -999999999999, 
						next, end;
					while (tween) {
						next = tween._next; //record it here in case the tween changes position in the sequence...
						
						if (tween._startTime < prevStart && this._sortChildren) { //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
							this.insert(tween, tween._startTime - tween._delay);
						} else {
							prevStart = tween._startTime;
						}
						if (tween._startTime < 0) {//children aren't allowed to have negative startTimes, so adjust here if one is found.
							max -= tween._startTime;
							this.shiftChildren(-tween._startTime, false, -9999999999);
						}
						end = tween._startTime + ((!tween._dirty ? tween._totalDuration : tween.totalDuration()) / tween._timeScale);
						if (end > max) {
							max = end;
						}
						
						tween = next;
					}
					this._duration = this._totalDuration = max;
					this._dirty = false;
				}
				return this._totalDuration;
			}
			if (this.totalDuration() !== 0) if (value !== 0) {
				this.timeScale(this._totalDuration / value);
			}
			return this;
		}
		
		p.usesFrames = function() {
			var tl = this._timeline;
			while (tl._timeline) {
				tl = tl._timeline;
			}
			return (tl === Animation._rootFramesTimeline);
		}
		
		p.rawTime = function() {
			return (this._paused || (this._totalTime !== 0 && this._totalTime !== this._totalDuration)) ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale;
		}
		
		return TimelineLite;
		
	}, true);
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * TimelineMax
 * ----------------------------------------------------------------
 */
	_gsRequire("TimelineMax", ["TimelineLite","TweenLite","easing.Ease"], function(TimelineLite, TweenLite, Ease) {
		
		var TimelineMax = function(vars) {
				TimelineLite.call(this, vars);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo == true);
				this._dirty = true;
			},
			_blankArray = [],
			_easeNone = new Ease(null, null, 1, 0),
			_getGlobalPaused = function(tween) {
				while (tween) {
					if (tween._paused) {
						return true;
					}
					tween = tween._timeline;
				}
				return false;
			},
			p = TimelineMax.prototype = new TimelineLite();
			
		p.constructor = TimelineMax;
		p.kill()._gc = false;
		TimelineMax.version = 12.0;
		
		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo == true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return TimelineLite.prototype.invalidate.call(this);
		}
		
		p.addCallback = function(callback, timeOrLabel, params, scope) {
			return this.insert( TweenLite.delayedCall(0, callback, params, scope), timeOrLabel);
		}
		
		p.removeCallback = function(callback, timeOrLabel) {
			if (timeOrLabel == null) {
				this._kill(null, callback);
			} else {
				var a = this.getTweensOf(callback, false),
					i = a.length,
					time = this._parseTimeOrLabel(timeOrLabel, false);
				while (--i > -1) {
					if (a[i]._startTime === time) {
						a[i]._enabled(false, false);
					}
				}
			}
			return this;
		}
		
		p.tweenTo = function(timeOrLabel, vars) {
			vars = vars || {};
			var copy = {ease:_easeNone, overwrite:2, useFrames:this.usesFrames(), immediateRender:false}, p, t;
			for (p in vars) {
				copy[p] = vars[p];
			}
			copy.time = this._parseTimeOrLabel(timeOrLabel, false);
			t = new TweenLite(this, (Math.abs(Number(copy.time) - this._time) / this._timeScale) || 0.001, copy);
			copy.onStart = function() {
				t.target.paused(true);
				if (t.vars.time != t.target.time()) { //don't make the duration zero - if it's supposed to be zero, don't worry because it's already initting the tween and will complete immediately, effectively making the duration zero anyway. If we make duration zero, the tween won't run at all.
					t.duration( Math.abs( t.vars.time - t.target.time()) / t.target._timeScale );
				}
				if (vars.onStart) { //in case the user had an onStart in the vars - we don't want to overwrite it.
					vars.onStart.apply(vars.onStartScope || t, vars.onStartParams || _blankArray);
				}
			}
			return t;
		}
		
		p.tweenFromTo = function(fromTimeOrLabel, toTimeOrLabel, vars) {
			vars = vars || {};
			vars.startAt = {time:this._parseTimeOrLabel(fromTimeOrLabel, false)};
			var t = this.tweenTo(toTimeOrLabel, vars);
			return t.duration((Math.abs( t.vars.time - t.vars.startAt.time) / this._timeScale) || 0.001);
		}
		
		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			this._active = !this._paused;
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(), 
				prevTime = this._time, 
				prevTotalTime = this._totalTime, 
				prevStart = this._startTime, 
				prevTimeScale = this._timeScale, 
				prevRawPrevTime = this._rawPrevTime,
				prevPaused = this._paused, 
				prevCycle = this._cycle, 
				tween, isComplete, next, dur, callback;
			if (time >= totalDur) {
				if (!this._locked) {
					this._totalTime = totalDur;
					this._cycle = this._repeat;
				}
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					if (this._duration === 0) if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time) { //In order to accommodate zero-duration timelines, we must discern the momentum/direction of time in order to render values properly when the "playhead" goes past 0 in the forward direction or lands directly on it, and also when it moves past it in the backward direction (from a postitive time to a negative time).
						force = true;
					}
				}
				this._rawPrevTime = time;
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = 0;
					time = -0.000001; //to avoid occassional floating point rounding errors - sometimes child tweens/timelines were not being rendered at the very beginning (their progress might be 0.000000000001 instead of 0 because when Flash performed _time - tween._startTime, floating point errors would return a value that was SLIGHTLY off)
				} else {
					this._time = this._duration;
					time = this._duration + 0.000001; //to avoid occassional floating point rounding errors in Flash - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when Flash performed _time - tween._startTime, floating point errors would return a value that was SLIGHTLY off)
				}
				
			} else if (time <= 0) {
				if (!this._locked) {
					this._totalTime = this._cycle = 0;
				}
				this._time = 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._duration === 0) if (this._rawPrevTime >= 0) { //zero-duration timelines are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						force = true;
					}
				} else if (!this._initted) {
					force = true;
				}
				this._rawPrevTime = time;
				time = -0.000001; //to avoid occassional floating point rounding errors in Flash - sometimes child tweens/timelines were not being rendered at the very beginning (their progress might be 0.000000000001 instead of 0 because when Flash performed _time - tween._startTime, floating point errors would return a value that was SLIGHTLY off)
				
			} else {
				this._time = this._rawPrevTime = time;
				if (!this._locked) {
					this._totalTime = time;
					if (this._repeat !== 0) {
						var cycleDuration = this._duration + this._repeatDelay;
						this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but Flash reports it as 0.79999999!)
						if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration) {
							this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
						}
						this._time = this._totalTime - (this._cycle * cycleDuration);
						if (this._yoyo) if ((this._cycle & 1) != 0) {
							this._time = this._duration - this._time;
						}
						if (this._time > this._duration) {
							this._time = this._duration;
							time = this._duration + 0.000001; //to avoid occassional floating point rounding errors in Flash - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when Flash performed _time - tween._startTime, floating point errors would return a value that was SLIGHTLY off)
						} else if (this._time < 0) {
							this._time = 0;
							time = -0.000001; //to avoid occassional floating point rounding errors in Flash - sometimes child tweens/timelines were not being rendered at the very beginning (their progress might be 0.000000000001 instead of 0 because when Flash performed _time - tween._startTime, floating point errors would return a value that was SLIGHTLY off)
						} else {
							time = this._time;
						}
					}
				}
			}
			
			if (this._cycle !== prevCycle) if (!this._locked) {
				/*
				make sure children at the end/beginning of the timeline are rendered properly. If, for example, 
				a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
				would get transated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
				could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So 
				we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
				ensure that zero-duration tweens at the very beginning or end of the TimelineMax work. 
				*/
				var backwards = (this._yoyo && (prevCycle & 1) !== 0),
					wrap = (backwards === (this._yoyo && (this._cycle & 1) !== 0)),
					recTotalTime = this._totalTime,
					recCycle = this._cycle,
					recRawPrevTime = this._rawPrevTime,
					recTime = this._time;
				
				this._totalTime = prevCycle * this._duration;
				if (this._cycle < prevCycle) {
					backwards = !backwards;
				} else {
					this._totalTime += this._duration;
				}
				this._time = prevTime; //temporarily revert _time so that render() renders the children in the correct order. Without this, tweens won't rewind correctly. We could arhictect things in a "cleaner" way by splitting out the rendering queue into a separate method but for performance reasons, we kept it all inside this method.
				
				this._rawPrevTime = prevRawPrevTime;
				this._cycle = prevCycle;
				this._locked = true; //prevents changes to totalTime and skips repeat/yoyo behavior when we recursively call render()
				prevTime = (backwards) ? 0 : this._duration;	
				this.render(prevTime, suppressEvents, false);
				if (!suppressEvents) if (!this._gc) {
					if (this.vars.onRepeat) {
						this.vars.onRepeat.apply(this.vars.onRepeatScope || this, vars.onRepeatParams || _blankArray);
					}
				}
				if (wrap) {
					prevTime = (backwards) ? this._duration + 0.000001 : -0.000001;
					this.render(prevTime, true, false);
				}
				this._time = recTime;
				this._totalTime = recTotalTime;
				this._cycle = recCycle;
				this._rawPrevTime = recRawPrevTime;
				this._locked = false;
			}

			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._initted = true;
			}
			
			if (prevTotalTime === 0) if (this.vars.onStart) if (this._totalTime !== 0) if (!suppressEvents) {
				this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
			}
			
			if (this._time > prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
						
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, false);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, false);
						}
						
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, false);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, false);
						}
						
					}
					tween = next;
				}
			}
			
			if (this._onUpdate) if (!suppressEvents) {
				this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
			}
			
			if (callback) if (!this._locked) if (!this._gc) if (prevStart === this._startTime || prevTimeScale != this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents) if (this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}
		}
		
		p.getActive = function(nested, tweens, timelines) {
			if (nested == null) {
				nested = true;
			}
			if (tweens == null) {
				tweens = true;
			}
			if (timelines == null) {
				timelines = false;
			}
			var a = [], 
				all = this.getChildren(nested, tweens, timelines), 
				cnt = 0, 
				l = all.length,
				i, tween;
			for (i = 0; i < l; i++) {
				tween = all[i];
				//note: we cannot just check tween.active because timelines that contain paused children will continue to have "active" set to true even after the playhead passes their end point (technically a timeline can only be considered complete after all of its children have completed too, but paused tweens are...well...just waiting and until they're unpaused we don't know where their end point will be).
				if (!tween._paused) if (tween._timeline._totalTime >= tween._startTime) if (tween._timeline._totalTime < tween._startTime + tween._totalDuration / tween._timeScale) if (!_getGlobalPaused(tween._timeline)) {
					a[cnt++] = tween;
				}
			}
			return a;
		}
		
		
		p.getLabelAfter = function(time) {
			if (!time) if (time !== 0) { //faster than isNan()
				time = this._time;
			}
			var labels = this._getLabelsArray(),
				l = labels.length,
				i;
			for (i = 0; i < l; i++) {
				if (labels[i].time > time) {
					return labels[i].name;
				}
			}
			return null;
		}
		
		p.getLabelBefore = function(time) {
			if (time == null) {
				time = this._time;
			}
			var labels = this._getLabelsArray(),
				i = labels.length;
			while (--i > -1) {
				if (labels[i].time < time) {
					return labels[i].name;
				}
			}
			return null;
		}
		
		p._getLabelsArray = function() {
			var a = [],
				cnt = 0,
				p;
			for (p in this._labels) {
				a[cnt++] = {time:this._labels[p], name:p};
			}
			a.sort(function(a,b) {
				return a.time - b.time;
			});
			return a;
		}
		
		
//---- GETTERS / SETTERS -------------------------------------------------------------------------------------------------------
		
		p.progress = function(value) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * value + (this._cycle * this._duration), false);
		}
		
		p.totalProgress = function(value) {
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, false);
		}
		
		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					TimelineLite.prototype.totalDuration.call(this); //just forces refresh
					//Instead of Infinity, we use 999999999999 so that we can accommodate reverses.
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
				}
				return this._totalDuration;
			}
			return (this._repeat == -1) ? this : this.duration( (value - (this._repeat * this._repeatDelay)) / (this._repeat + 1) );
		}
		
		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat != 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		}
		
		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		}
		
		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		}
		
		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		}
		
		p.currentLabel = function(value) {
			if (!arguments.length) {
				return this.getLabelBefore(this._time + 0.00000001);
			}
			return this.seek(value, true);
		}
		
		return TimelineMax;
		
	}, true);
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * CSSPlugin 						(!CSSPlugin)
 * ----------------------------------------------------------------
 */
	_gsRequire("plugins.CSSPlugin", ["plugins.TweenPlugin","TweenLite"], function(TweenPlugin, TweenLite) {
		
		"use strict";
		
		var CSSPlugin = function() {
				TweenPlugin.call(this, "css");
				this._overwriteProps.pop();
			},
			p = CSSPlugin.prototype = new TweenPlugin("css");
		
		p.constructor = CSSPlugin;
		CSSPlugin.API = 2;
		CSSPlugin.suffixMap = {top:"px", right:"px", bottom:"px", left:"px", width:"px", height:"px", fontSize:"px", padding:"px", margin:"px"};
			
		//set up some local variables and functions that we can reuse for all tweens - we do this only once and cache things to improve performance
		var _NaNExp = /[^\d\-\.]/g,
			_suffixExp = /(\d|\-|\+|=|#|\.)*/g,
			_numExp = /\d+/g,
			_opacityExp = /opacity=([^)]*)/,
			_opacityValExp = /opacity:([^;]*)/,
			_capsExp = /([A-Z])/g,
			_camelExp = /-([a-z])/gi,
			_camelFunc = function(s, g) { return g.toUpperCase() },
			_horizExp = /(Left|Right|width|Width)/,
			_ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
			_ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
			_DEG2RAD = Math.PI / 180,
			_RAD2DEG = 180 / Math.PI,
			_tempDiv = document.createElement("div"),
			
			//primarily for older versions of IE
			_supportsOpacity = (function() {
				var d = document.createElement("div"), a;
				d.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>";
				if (!(a = d.getElementsByTagName("a")[0])) {
					return false;
				}
				return /^0.55/.test(a.style.opacity);
			})(),
			
			//parses a color (like #9F0, #FF9900, or rgb(255,51,153)) into an array with 3 elements for red, green, and blue. Also handles rgba() values (splits into array of 4 elements of course) 
			_parseColor = function(color) {
				if (!color || color === "") {
					return _colorLookup.black;
				} else if (_colorLookup[color]) {
					return _colorLookup[color];
				} else if (color.charAt(0) === "#") {
					if (color.length === 4) { //for shorthand like #9F0
						color = "#" + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2) + color.charAt(3) + color.charAt(3);
					}
					color = parseInt(color.substr(1), 16);
					return [color >> 16, (color >> 8) & 255, color & 255];
				} else {
					return color.match(_numExp) || _colorLookup.transparent;
				}
			},
			_getIEOpacity = function(obj) {
				return (_opacityExp.test( ((typeof(obj) === "string") ? obj : (obj.currentStyle ? obj.currentStyle.filter : obj.style.filter) || "") ) ? ( parseFloat( RegExp.$1 ) / 100 ) : 1);
			},
			_getComputedStyle = (document.defaultView) ? document.defaultView.getComputedStyle : function(o,s) {},
			
			//gets an individual style property. cs is for computedStyle (a speed optimization - we don't want to run it more than once if we don't have to). calc forces the returned value to be based on the computedStyle, ignoring anything that's in the element's "style" property (computing normalizes certain things for us)
			_getStyle = function(t, p, cs, calc) { 
				if (!_supportsOpacity && p === "opacity") { //several versions of IE don't use the standard "opacity" property - they use things like filter:alpha(opacity=50), so we parse that here.
					return _getIEOpacity(t);
				} else if (!calc && t.style[p]) {
					return t.style[p];
				} else if ((cs = cs || _getComputedStyle(t, null))) {
					t = cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
					return (t || cs.length) ? t : cs[p]; //Opera behaves VERY strangely - length is usually 0 and cs[p] is the only way to get accurate results EXCEPT when checking for -o-transform which only works with cs.getPropertyValue()!
				} else if (t.currentStyle) {
					return t.currentStyle[p];
				}
				return null;
			},
			
			//returns at object containing ALL of the style properties in camel-case and their associated values.
			_getStyles = function(t, cs) {  
				var s = {}, i;
				if ((cs = cs || _getComputedStyle(t, null))) {
					if ((i = cs.length)) {
						while (--i > -1) {
							s[cs[i].replace(_camelExp, _camelFunc)] = cs.getPropertyValue(cs[i]);
						}
					} else { //Opera behaves differently - cs.length is always 0, so we must do a for...in loop.
						for (i in cs) {
							s[i] = cs[i];
						}
					}
				} else if ((cs = t.currentStyle || t.style)) {
					for (i in cs) {
						s[i.replace(_camelExp, _camelFunc)] = cs[i];
					}
				}
				if (!_supportsOpacity) {
					s.opacity = _getIEOpacity(t);
				}
				var tr = _getTransform(t, cs, false);
				s.rotation = tr.rotation * _RAD2DEG;
				s.skewX = tr.skewX * _RAD2DEG;
				s.scaleX = tr.scaleX;
				s.scaleY = tr.scaleY;
				s.x = tr.x;
				s.y = tr.y;
				if (s.filters != null) {
					delete s.filters;
				}
				return s;
			},
			
			//analyzes two style objects (as returned by _getStyles()) and only looks for differences between them that contain tweenable values (like a number or color). It returns an object containing only those isolated properties and values for tweening, and optionally populates an array of those property names too (so that we can loop through them at the end of the tween and remove them for css tweens that apply a className - we don't want the cascading to get messed up)
			_cssDif = function(s1, s2, v, d) { 
				var s = {}, val, p;
				for (p in s2) {
					if (p !== "cssText") if (p !== "length") if (isNaN(p)) if (val !== _transformProp) if (s1[p] != (val = s2[p])) if (typeof(val) === "number" || typeof(val) === "string") {
						s[p] = val;
						if (d) {
							d.props.push(p);
						}
					}
				}
				if (v) {
					for (p in v) { //copy properties (except className)
						if (p !== "className") {
							s[p] = v[p];
						}
					}
				}
				return s;
			},
			_transformMap = {scaleX:1, scaleY:1, x:1, y:1, rotation:1, shortRotation:1, skewX:1, skewY:1, scale:1},
			
			//the css transform property, like -ms-transform, -webkit-transform, -moz-transform, or -o-transform (we populate this in the method that's called for _transformProp
			_transformPropCSS,
			
			//the Javascript (camelCase) transform property, like msTransform, WebkitTransform, MozTransform, or OTransform.
			_transformProp = (function() { //determines the transform property to use (with the appropriate vendor prefix).
				var d = document.body || document.documentElement,
					cs = _getComputedStyle(d, ""),
					a = ["O","-o-","Moz","-moz-","ms","-ms-","Webkit","-webkit-"],
					i = 9;
				while ((i-=2) > -1 && !_getStyle(d, a[i]+"transform", cs)) { }
				if (i > 0) {
					_transformPropCSS = a[i] + "transform";
					return a[i-1] + "Transform";
				}
				return null;
			})(),
						
			//parses the transform values for an element, returning an object with x, y, scaleX, scaleY, rotation, skewX, and skewY properties. Note: by default (for performance reasons), all skewing is combined into skewX and rotation but skewY still has a place in the transform object so that we can record how much of the skew is attributed to skewX vs skewY. Remember, a skewY of 10 looks the same as a rotation of 10 and skewX of -10.
			_getTransform = function(t, cs, rec) {
				var s;
				if (_transformProp) {
					s = _getStyle(t, _transformPropCSS, cs, true);
				} else if (t.currentStyle) {
					//for older versions of IE, we need to interpret the filter portion that is in the format: progid:DXImageTransform.Microsoft.Matrix(M11=6.123233995736766e-17, M12=-1, M21=1, M22=6.123233995736766e-17, sizingMethod='auto expand') Notice that we need to swap b and c compared to a normal matrix.
					s = t.currentStyle.filter.match(_ieGetMatrixExp);
					s = (s && s.length === 4) ? s[0].substr(4) + "," + Number(s[2].substr(4)) + "," + Number(s[1].substr(4)) + "," + s[3].substr(4) + ",0,0" : null;
				}
				var v = (s || "").replace(/[^\d\-\.e,]/g, "").split(","), 
					k = (v.length >= 6),
					a = k ? Number(v[0]) : 1,
					b = k ? Number(v[1]) : 0,
					c = k ? Number(v[2]) : 0,
					d = k ? Number(v[3]) : 1,
					min = 0.00000001,
					m = rec ? t._gsTransform || {skewY:0} : {skewY:0},
					invX = (m.scaleX < 0); //in order to interpret things properly, we need to know if the user applied a negative scaleX previously so that we can adjust the rotation and skewX accordingly. Otherwise, if we always interpret a flipped matrix as affecting scaleY and the user only wants to tween the scaleX on multiple sequential tweens, it would keep the negative scaleY without that being the user's intent.
					
				m.x = (k ? Number(v[4]) : 0);
				m.y = (k ? Number(v[5]) : 0);
				m.rotation = Math.atan2(b, a);
				m.scaleX = Math.sqrt(a * a + b * b);
				m.scaleY = Math.sqrt(d * d + c * c);
				m.skewX = Math.atan2(c, d) + m.rotation;
				if ((a < 0 && d >= 0) || (a > 0 && d <= 0)) {
					if (invX) {
						m.scaleX *= -1;
						m.skewX += (m.rotation <= 0) ? Math.PI : -Math.PI;
						m.rotation += (m.rotation <= 0) ? Math.PI : -Math.PI;
					} else {
						m.scaleY *= -1;
						m.skewX += (m.skewX <= 0) ? Math.PI : -Math.PI;
					}
				}
				//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases. The conditional logic here is faster than calling Math.abs().
				if (m.rotation < min) if (m.rotation > -min) {
					m.rotation = 0;
				}
				if (m.skewX < min) if (m.skewX > -min) {
					m.skewX = 0;
				}
				if (rec) {
					t._gsTransform = m; //record to the object's _gsTransform which we use so that tweens can control individual properties independently (we need all the properties to accurately recompose the matrix in the setRatio() method)
				}
				return m;
			},
			
			_dimensions = {width:["Left","Right"], height:["Top","Bottom"]},
			_margins = ["marginLeft","marginRight","marginTop","marginBottom"], 
			_getDimension = function(n, t, cs) {
				var v = parseFloat((n === "width") ? t.offsetWidth : t.offsetHeight),
					a = _dimensions[n],
					i = a.length, 
					cs = cs || _getComputedStyle(t, null);
				while (--i > -1) {
					v -= parseFloat( _getStyle(t, "padding" + a[i], cs, true) ) || 0;
					v -= parseFloat( _getStyle(t, "border" + a[i] + "Width", cs, true) ) || 0;
				}
				return v;
			},
			
			//pass the target element, the property name, the numeric value, and the suffix (like "%", "em", "px", etc.) and it will spit back the equivalent pixel number
			_convertToPixels = function(t, p, v, sfx, recurse) {
				if (sfx === "px") { return v; }
				if (sfx === "auto") { return 0; }
				var horiz = _horizExp.test(p),
					node = t;
				_tempDiv.style.cssText = "border-style:solid; border-width:0; position:absolute; line-height:0;";
				if (sfx === "%" || sfx === "em") {
					node = t.parentNode || document.body;
					_tempDiv.style[(horiz ? "width" : "height")] = v + sfx;
				} else {
					_tempDiv.style[(horiz ? "borderLeftWidth" : "borderTopWidth")] = v + sfx;
				}
				node.appendChild(_tempDiv);
				var pix = parseFloat(_tempDiv[(horiz ? "offsetWidth" : "offsetHeight")]);
				node.removeChild(_tempDiv);
				if (pix === 0 && !recurse) { //in some browsers (like IE7/8), occasionally the value isn't accurately reported initially, but if we run the function again it will take effect. 
					pix = _convertToPixels(t, p, v, sfx, true);
				}
				return pix;
			},
			
			//for parsing things like transformOrigin or backgroundPosition which must recognize keywords like top/left/right/bottom/center as well as percentages and pixel values. Decorates the supplied object with the following properties: "ox" (offsetX), "oy" (offsetY), "oxp" (if true, "ox" is a percentage not a pixel value), and "oxy" (if true, "oy" is a percentage not a pixel value)
			_parsePosition = function(v, o) {
				if (v == null || v === "" || v === "auto") {
					v = "0 0";
				}
				o = o || {};
				var x = (v.indexOf("left") !== -1) ? "0%" : (v.indexOf("right") !== -1) ? "100%" : v.split(" ")[0],
					y = (v.indexOf("top") !== -1) ? "0%" : (v.indexOf("bottom") !== -1) ? "100%" : v.split(" ")[1];
				if (y == null) {
					y = "0";
				}
				o.oxp = (x.indexOf("%") !== -1);
				o.oyp = (y.indexOf("%") !== -1);
				o.oxr = (x.charAt(1) === "=");
				o.oyr = (y.charAt(1) === "=");
				o.ox = parseFloat(x.replace(_NaNExp, ""));
				o.oy = parseFloat(y.replace(_NaNExp, ""));
				return o;
			},
			
			//takes a value and a default number, checks if the value is relative, null, or numeric and spits back a normalized number accordingly. Primarily used in the _parseTransform() function.
			_parseVal = function(v, d) {
				return (v == null) ? d : (typeof(v) === "string" && v.indexOf("=") === 1) ? Number(v.split("=").join("")) + d : Number(v);
			},
			
			//translates strings like "40deg" or "40" or 40rad" or "+=40deg" to a numeric radian angle, optionally relative to a default value (if "+=" or "-=" prefix is found)
			_parseAngle = function(v, d) { 
				var m = (v.indexOf("rad") === -1) ? _DEG2RAD : 1, 
					r = (v.indexOf("=") === 1);
				v = Number(v.replace(_NaNExp, "")) * m;
				return r ? v + d : v;
			},
			_colorLookup = {aqua:[0,255,255],
							lime:[0,255,0],
							silver:[192,192,192],
							black:[0,0,0],
							maroon:[128,0,0],
							teal:[0,128,128],
							blue:[0,0,255],
							navy:[0,0,128],
							white:[255,255,255],
							fuchsia:[255,0,255],
							olive:[128,128,0],
							yellow:[255,255,0],
							orange:[255,165,0],
							gray:[128,128,128],
							purple:[128,0,128],
							green:[0,128,0],
							red:[255,0,0],
							pink:[255,192,203],
							cyan:[0,255,255],
							transparent:[255,255,255,0]};
							
		
		//gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc. 
		p._onInitTween = function(target, value, tween) {
			if (!target.nodeType) { //css is only for dom elements
				return false;
			}
			this._target = target;
			this._tween = tween;
			this._classData = this._transform = null; //_transform is only used for scaleX/scaleY/x/y/rotation/skewX/skewY tweens and _classData is only used if className is defined - this will be an array of properties that we're tweening related to the class which should be removed from the target.style at the END of the tween when the className is populated so that cascading happens properly.
			var s = this._style = target.style, 
				cs = _getComputedStyle(target, ""),
				copy, start, v;
				
			if (typeof(value) === "string") { 
				copy = s.cssText;
				start = _getStyles(target, cs);
				s.cssText = copy + ";" + value;
				v = _cssDif(start, _getStyles(target));
				if (!_supportsOpacity && _opacityValExp.test(value)) {
					val.opacity = parseFloat( RegExp.$1 );
				}
				value = v;
				s.cssText = copy;
			} else if (value.className) {
				copy = target.className;
				start = _getStyles(target, cs);
				target.className = (value.className.charAt(1) !== "=") ? value.className : (value.className.charAt(0) === "+") ? target.className + " " + value.className.substr(2) : target.className.split(value.className.substr(2)).join("");
				value = _cssDif(start, _getStyles(target), value, (this._classData = {b:copy, e:target.className, props:[]}));
				target.className = copy;
			}
			this._parseVars(value, target, cs, value.suffixMap || CSSPlugin.suffixMap);
			return true;
		}
		
		//feed a vars object to this function and it will parse through its properties and add PropTweens as necessary. This is split out from the _onInitTween() so that we can recurse if necessary, like "margin" should affect "marginLeft", "marginRight", "marginTop", and "marginBottom".
		p._parseVars = function(vars, t, cs, map) {
			var s = this._style, 
				p, v, pt, beg, clr1, clr2, bsfx, esfx, rel, start, copy;
			
			for (p in vars) {
				
				v = vars[p];
				
				if (p === "transform" || p === _transformProp) {
					this._parseTransform(t, v, cs, map);
					continue;
				} else if (_transformMap[p] || p === "transformOrigin") {
					this._parseTransform(t, vars, cs, map);
					continue;
				} else if (p === "alpha" || p === "autoAlpha") { //alpha tweens are opacity tweens			
					p = "opacity";
				} else if (p === "margin" || p === "padding") {
					copy = v.split(" ");
					rel = copy.length;
					pt = {};
					pt[p + "Top"] = copy[0];
					pt[p + "Right"] = (rel > 1) ? copy[1] : copy[0];
					pt[p + "Bottom"] = (rel === 4) ? copy[2] : copy[0];
					pt[p + "Left"] = (rel === 4) ? copy[3] : (rel === 2) ? copy[1] : copy[0];
					this._parseVars(pt, t, cs, map);
					continue;
				} else if (p === "backgroundPosition" || p === "backgroundSize") {
					pt = _parsePosition(v); //end values 
					start = _parsePosition( (beg = _getStyle(t, p, cs)) ); //starting values
					this._firstPT = pt = {_next:this._firstPT, t:s, p:p, b:beg, f:false, n:"css_" + p, type:3,
							s:start.ox, //x start
							c:pt.oxr ? pt.ox : pt.ox - start.ox, //change in x
							ys:start.oy, //y start
							yc:pt.oyr ? pt.oy : pt.oy - start.oy, //change in y
							sfx:pt.oxp ? "%" : "px", //x suffix
							ysfx:pt.oyp ? "%" : "px", //y suffix
							r:(!pt.oxp && vars.autoRound !== false)};
					pt.e = (pt.s + pt.c) + pt.sfx + " " + (pt.ys + pt.yc) + pt.ysfx; //we can't just use v because it could contain relative values, like +=50px which is an illegal final value.
					continue;
				} else if (p === "border") {
					copy = v.split(" ");
					this._parseVars({borderWidth:copy[0], borderStyle:copy[1] || "none", borderColor:copy[2] || "#000000"}, t, cs, map);
					continue;
				} else if (p === "autoRound") {
					continue;
				}
				
				beg = _getStyle(t, p, cs); 
				beg = (beg != null) ? beg + "" : ""; //make sure beginning value is a string. Don't do beg = _getStyle(...) || "" because if _getStyle() returns 0, it will make it "" since 0 is a "falsey" value.
				
				//Some of these properties are in place in order to conform with the standard PropTweens in TweenPlugins so that overwriting and roundProps occur properly. For example, f and r may seem unnecessary here, but they enable other functionality.
				//_next:*	next linked list node		[object]
				//t: 	*	target 						[object]
				//p:	*	property (camelCase)		[string]
				//s: 	*	starting value				[number]
				//c:	*	change value				[number]
				//f:	* 	is function					[boolean]
				//n:	*	name (for overwriting)		[string]
				//sfx:		suffix						[string]
				//b:		beginning value				[string]
				//i:		intermediate value			[string]
				//e: 		ending value				[string]
				//r:	*	round						[boolean]
				//type:		0=normal, 1=color, 2=rgba, 3=positional offset (like backgroundPosition or backgroundSize), 4=unsupported opacity (ie), -1=non-tweening prop	[number]
				this._firstPT = pt = {_next:this._firstPT, 
					  t:s, 
					  p:p, 
					  b:beg,	 
					  f:false,
					  n:"css_" + p,
					  sfx:"",
					  r:false,
					  type:0};
					  
				//if it's an autoAlpha, add a new PropTween for "visibility". We must make sure the "visibility" PropTween comes BEFORE the "opacity" one in order to work around a bug in old versions of IE tht would ignore "visibility" changes if made right after an alpha change. Remember, we add PropTweens in reverse order - that's why we do this here, after creating the original PropTween.
				if (p === "opacity") if (vars.autoAlpha != null) {
					this._firstPT = pt._prev = {_next:pt, t:s, p:"visibility", f:false, n:"css_visibility", r:false, type:-1, b:(Number(beg) !== 0) ? "visible" : "hidden", i:"visible", e:(Number(v) === 0) ? "hidden" : "visible"};
					this._overwriteProps.push("css_visibility");
				}
									
				//color values must be split apart into their R, G, B (and sometimes alpha) values and tweened independently.
				if (p === "color" || p === "fill" || p === "stroke" || p.indexOf("Color") !== -1 || (typeof(v) === "string" && !v.indexOf("rgb("))) { //Opera uses background: to define color sometimes in addition to backgroundColor:
					clr1 = _parseColor(beg);
					clr2 = _parseColor(v);
					pt.e = v;
					pt.s = Number(clr1[0]);				//red starting value
					pt.c = Number(clr2[0]) - pt.s;		//red change
					pt.gs = Number(clr1[1]);			//green starting value
					pt.gc = Number(clr2[1]) - pt.gs;	//green change
					pt.bs = Number(clr1[2]);			//blue starting value
					pt.bc = Number(clr2[2]) - pt.bs;	//blue change
					if (clr1.length > 3 || clr2.length > 3) { //detect an rgba() value
						pt.as = (clr1.length < 4) ? 1 : Number(clr1[3]);
						pt.ac = ((clr2.length < 4) ? 1 : Number(clr2[3])) - pt.as;
						pt.type = (pt.c || pt.gc || pt.bc || pt.ac) ? 2 : -1; //2 = rgba() tween, -1 = no tween, just set the value at the end
					} else {
						pt.type = (pt.c || pt.gc || pt.bc) ? 1 : -1; //1 = color tween, -1 = no tween, just set the value at the end because there's no changes
					}
					
				} else {
					
					bsfx = beg.replace(_suffixExp, ""); //beginning suffix
					
					if (beg === "" || beg === "auto") {
						if (p === "width" || p === "height") {
							start = _getDimension(p, t, cs);
							bsfx = "px";
						} else {
							start = (p !== "opacity") ? 0 : 1;
						}
					} else {
						start = (beg.indexOf(" ") === -1) ? parseFloat(beg.replace(_NaNExp, "")) : NaN;
					}
					
					if (typeof(v) === "string") {
						rel = (v.charAt(1) === "=");
						esfx = v.replace(_suffixExp, "");
						v = (v.indexOf(" ") === -1) ? parseFloat(v.replace(_NaNExp, "")) : NaN;
					} else {
						rel = false;
						esfx = "";
					}
					
					if (esfx === "") {
						esfx = map[p] || bsfx; //populate the end suffix, prioritizing the map, then if none is found, use the beginning suffix.
					}
					
					pt.e = (v || v === 0) ? (rel ? v + start : v) + esfx : vars[p]; //ensures that any += or -= prefixes are taken care of. Record the end value before normalizing the suffix because we always want to end the tween on exactly what they intended even if it doesn't match the beginning value's suffix.

					//if the beginning/ending suffixes don't match, normalize them...
					if (bsfx !== esfx) if (esfx !== "") if (v || v === 0) if (start || start === 0) { 
						start = _convertToPixels(t, p, start, bsfx);
						if (esfx === "%") {
							start /= _convertToPixels(t, p, 100, "%") / 100;
							if (start > 100) { //extremely rare
								start = 100;
							}
							
						} else if (esfx === "em") {
							start /= _convertToPixels(t, p, 1, "em");
							
						//otherwise convert to pixels.
						} else {
							v = _convertToPixels(t, p, v, esfx);
							esfx = "px"; //we don't use bsfx after this, so we don't need to set it to px too.
						}
						if (rel) if (v || v === 0) {
							pt.e = (v + start) + esfx; //the changes we made affect relative calculations, so adjust the end value here.
						}
					}
					
					if ((start || start === 0) && (v || v === 0) && (pt.c = (rel ? v : v - start))) { //faster than isNaN(). Also, we set pt.c (change) here because if it's 0, we'll just treat it like a non-tweening value. can't do (v !== start) because if it's a relative value and the CHANGE is identical to the START, the condition will fail unnecessarily.
						pt.s = start;
						pt.sfx = esfx;
						if (p === "opacity") {
							if (!_supportsOpacity) {
								pt.type = 4;
								pt.p = "filter";
								pt.b = "alpha(opacity=" + (pt.s * 100) + ")";
								pt.e = "alpha(opacity=" + ((pt.s + pt.c) * 100) + ")";
								pt.dup = (vars.autoAlpha != null); //dup = duplicate the setting of the alpha in order to work around a bug in IE7 and IE8 that prevents changes to "visibility" from taking effect if the filter is changed to a different alpha(opacity) at the same time. Setting it to the SAME value first, then the new value works around the IE7/8 bug.
								this._style.zoom = 1; //helps correct an IE issue.
							}
						} else if (vars.autoRound !== false && (esfx === "px" || p === "zIndex")) { //always round zIndex, and as long as autoRound isn't false, round pixel values (that improves performance in browsers typically)
							pt.r = true;
						}
					} else {
						pt.type = -1;
						pt.i = pt.e; //intermediate value is typically the same as the end value.
						pt.s = pt.c = 0;
					}
					
				}
				
				this._overwriteProps.push("css_" + p);
				if (pt._next) {
					pt._next._prev = pt;
				}
			}
			
		}
		
		
		//compares the beginning x, y, scaleX, scaleY, rotation, and skewX properties with the ending ones and adds PropTweens accordingly wherever necessary. We must tween them individually (rather than just tweening the matrix values) so that elgant overwriting can occur, like if one tween is controlling scaleX, scaleY, and rotation and then another one starts mid-tween that is trying to control the scaleX only - this tween should continue tweening scaleY and rotation.
		p._parseTransform = function(t, v, cs, map) {
			if (this._transform) { return; } //only need to parse the transform once, and only if the browser supports it.
			
			var m1 = this._transform = _getTransform(t, cs, true), 
				s = this._style,
				m2, skewY, p, pt, copy, orig;
			
			if (typeof(v) === "object") { //for values like scaleX, scaleY, rotation, x, y, skewX, and skewY or transform:{...} (object)

				m2 = {scaleX:_parseVal((v.scaleX != null) ? v.scaleX : v.scale, m1.scaleX),
					  scaleY:_parseVal((v.scaleY != null) ? v.scaleY : v.scale, m1.scaleY),
					  x:_parseVal(v.x, m1.x),
					  y:_parseVal(v.y, m1.y)};
					  
				if (v.shortRotation != null) {
					m2.rotation = (typeof(v.shortRotation) === "number") ? v.shortRotation * _DEG2RAD : _parseAngle(v.shortRotation, m1.rotation);
					var dif = (m2.rotation - m1.rotation) % (Math.PI * 2);
					if (dif !== dif % Math.PI) {
						dif += Math.PI * ((dif < 0) ? 2 : -2);
					}
					m2.rotation = m1.rotation + dif;
					
				} else {
					m2.rotation = (v.rotation == null) ? m1.rotation : (typeof(v.rotation) === "number") ? v.rotation * _DEG2RAD : _parseAngle(v.rotation, m1.rotation);
				}
				m2.skewX = (v.skewX == null) ? m1.skewX : (typeof(v.skewX) === "number") ? v.skewX * _DEG2RAD : _parseAngle(v.skewX, m1.skewX);
				
				//note: for performance reasons, we combine all skewing into the skewX and rotation values, ignoring skewY but we must still record it so that we can discern how much of the overall skew is attributed to skewX vs. skewY. Otherwise, if the skewY would always act relative (tween skewY to 10deg, for example, multiple times and if we always combine things into skewX, we can't remember that skewY was 10 from last time). Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of -10 degrees.
				m2.skewY = (v.skewY == null) ? m1.skewY : (typeof(v.skewY) === "number") ? v.skewY * _DEG2RAD : _parseAngle(v.skewY, m1.skewY);
				if ((skewY = m2.skewY - m1.skewY)) {
					m2.skewX += skewY;
					m2.rotation += skewY;
				}
				
				//if a transformOrigin is defined, handle it here...
				if ((orig = v.transformOrigin) != null) {
					if (_transformProp) {
						p = _transformProp + "Origin";
						this._firstPT = pt = {_next:this._firstPT, t:s, p:p, s:0, c:0, n:p, f:false, r:false, b:s[p], e:orig, i:orig, type:-1, sfx:""};
						if (pt._next) {
							pt._next._prev = pt;
						}
					
					//for older versions of IE (6-8), we need to manually calculate things inside the setRatio() function. We record origin x and y (ox and oy) and whether or not the values are percentages (oxp and oyp). 
					} else {
						_parsePosition(orig, m1);
					}
				}
				
			} else if (typeof(v) === "string" && _transformProp) { //for values like transform:"rotate(60deg) scale(0.5, 0.8)"
				copy = s[_transformProp];
				s[_transformProp] = v;
				m2 = _getTransform(t, null, false);
				s[_transformProp] = copy;
			} else {
				return;
			}
			
			if (!_transformProp) {
				s.zoom = 1; //helps correct an IE issue.
			} else if (_transformProp === "WebkitTransform") {
				s[_transformProp + "Style"] = "preserve-3d"; //corrects a bug in Safari that causes it to skip rendering changes to "top" and "left" that are made on the same frame/render as a transform update.
			}
			
			for (p in _transformMap) {
				if (m1[p] !== m2[p]) if (p !== "shortRotation") if (p !== "scale") {
					this._firstPT = pt = {_next:this._firstPT, t:m1, p:p, s:m1[p], c:m2[p] - m1[p], n:p, f:false, r:false, b:m1[p], e:m2[p], type:0, sfx:0};
					if (pt._next) {
						pt._next._prev = pt;
					}
					this._overwriteProps.push("css_" + p);
				}
			}
		};
		
		
		//gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.
		p.setRatio = function(v) {
			var pt = this._firstPT, val, y;
			
			//at the end of the tween, we set the values to exactly what we received in order to make sure non-tweening values (like "position" or "float" or whatever) are set and so that if the beginning/ending suffixes (units) didn't match and we normalized to px, the value that the user passed in is used here. We check to see if the tween is at its beginning in case it's a from() tween in which case the ratio will actually go from 1 to 0 over the course of the tween (backwards). 
			if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
				while (pt) {
					pt.t[pt.p] = pt.e;
					if (pt.type === 4) if (pt.s + pt.c === 1) { //for older versions of IE that need to use a filter to apply opacity, we should remove the filter if opacity hits 1 in order to improve performance.
						this._style.removeAttribute("filter");
					}
					pt = pt._next;
				}
			
			} else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0)) {
				
				while (pt) {
					val = pt.c * v + pt.s;
					if (pt.r) {
						val = (val > 0) ? (val + 0.5) >> 0 : (val - 0.5) >> 0; 
					}
					if (!pt.type) {
						pt.t[pt.p] = val + pt.sfx;
					} else if (pt.type === 1) { //rgb()
						pt.t[pt.p] = "rgb(" + (val >> 0) + ", " + ((pt.gs + (v * pt.gc)) >> 0) + ", " + ((pt.bs + (v * pt.bc)) >> 0) + ")";
					} else if (pt.type === 2) { //rgba()
						pt.t[pt.p] = "rgba(" + (val >> 0) + ", " + ((pt.gs + (v * pt.gc)) >> 0) + ", " + ((pt.bs + (v * pt.bc)) >> 0) + ", " + (pt.as + (v * pt.ac)) + ")";
					} else if (pt.type === -1) { //non-tweening
						pt.t[pt.p] = pt.i;
					} else if (pt.type === 3) { //positional property with an x and y, like backgroundPosition or backgroundSize
						y = pt.ys + v * pt.yc;
						if (pt.r) {
							y = (y > 0) ? (y + 0.5) >> 0 : (y - 0.5) >> 0; 
						}
						pt.t[pt.p] = val + pt.sfx + " " + y + pt.ysfx;						
					} else {
						if (pt.dup) {
							pt.t.filter = pt.t.filter || "alpha(opacity=100)"; //works around bug in IE7/8 that prevents changes to "visibility" from being applied propertly if the filter is changed to a different alpha on the same frame.
						}
						if (pt.t.filter.indexOf("opacity=") === -1) { //only used if browser doesn't support the standard opacity style property (IE 7 and 8)
							pt.t.filter += " alpha(opacity=" + ((val * 100) >> 0) + ")"; //we round the value because otherwise, bugs in IE7/8 can prevent "visibility" changes from being applied properly.
						} else {
							pt.t.filter = pt.t.filter.replace(_opacityExp, "opacity=" + ((val * 100) >> 0)); //we round the value because otherwise, bugs in IE7/8 can prevent "visibility" changes from being applied properly.
						}
					}
					pt = pt._next;
				}
				
			//if the tween is reversed all the way back to the beginning, we need to restore the original values which may have different units (like % instead of px or em or whatever).
			} else {
				while (pt) {
					pt.t[pt.p] = pt.b;
					if (pt.type === 4) if (pt.s === 1) { //for older versions of IE that need to use a filter to apply opacity, we should remove the filter if opacity hits 1 in order to improve performance. 
						this._style.removeAttribute("filter");
					}
					pt = pt._next;
				}
			}
			
			//apply transform values like x, y, scaleX, scaleY, rotation, skewX, or skewY. We do these after looping through all the PropTweens because those are where the changes are made to scaleX/scaleY/rotation/skewX/skewY/x/y.
			if (this._transform) {
				pt = this._transform; //to improve speed and reduce size, reuse the pt variable as an alias to the _transform property
				//if there is no rotation, browsers render the transform faster if we just feed it the list of transforms like translate() skewX() scale(), otherwise defining the matrix() values directly is fastest.
				if (_transformProp && !pt.rotation) {
					this._style[_transformProp] = ((pt.x || pt.y) ? "translate(" + pt.x + "px," + pt.y + "px) " : "") + (pt.skewX ? "skewX(" + pt.skewX + "rad) " : "") + ((pt.scaleX !== 1 || pt.scaleY !== 1) ? "scale(" + pt.scaleX + "," + (Math.cos(pt.skewX) * pt.scaleY) + ")" : "") || "translate(0px,0px)"; //we need to default to translate(0px,0px) to work around a Chrome bug that rears its ugly head when the transform is set to "".
				} else {
					var ang = _transformProp ? pt.rotation : -pt.rotation, 
						skew = _transformProp ? ang - pt.skewX : ang + pt.skewX,
						a = Math.cos(ang) * pt.scaleX,
						b = Math.sin(ang) * pt.scaleX,
						c = Math.sin(skew) * -pt.scaleY,
						d = Math.cos(skew) * pt.scaleY,
						min = 0.00000001,
						cs;
					//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases for both b and c. The conditional logic here is faster than calling Math.abs().
					if (b < min) if (b > -min) {
						b = 0;
					}
					if (c < min) if (c > -min) {
						c = 0;
					}
					if (_transformProp) {
						this._style[_transformProp] = "matrix(" + a + "," + b + "," + c + "," + d + "," + pt.x + "," + pt.y + ")";
						
					//only for older versions of IE (6-8), we use a filter and marginLeft/marginTop to simulate the transform.
					} else if ((cs = this._target.currentStyle)) {
						min = b; //just for swapping the variables an inverting them (reused "min" to avoid creating another variable in memory). IE's filter matrix uses a non-standard matrix configuration (angle goes the opposite way, and b and c are reversed and inverted)
						b = -c;
						c = -min;
						var filters = this._style.filter;
						this._style.filter = ""; //remove filters so that we can accurately measure offsetWidth/offsetHeight
						var w = this._target.offsetWidth,
							h = this._target.offsetHeight,
							clip = (cs.position !== "absolute"),
							m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
							ox = pt.x,
							oy = pt.y,
							dx, dy;
						
						//if transformOrigin is being used, adjust the offset x and y
						if (pt.ox != null) {
							dx = ((pt.oxp) ? w * pt.ox * 0.01 : pt.ox) - w / 2;
							dy = ((pt.oyp) ? h * pt.oy * 0.01 : pt.oy) - h / 2;
							ox = dx - (dx * a + dy * b) + pt.x;
							oy = dy - (dx * c + dy * d) + pt.y;
						}
						
						if (!clip) {
							var i = 4, marg, prop;
							dx = pt.ieOffsetX || 0;
							dy = pt.ieOffsetY || 0;
							pt.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
							pt.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);
							while (--i > -1) {
								prop = _margins[i];
								marg = cs[prop];
								//we need to get the current margin in case it is being tweened separately (we want to respect that tween's changes)
								val = (marg.indexOf("px") !== -1) ? parseFloat(marg) : _convertToPixels(this._target, p, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;
								if (i === 1) { //the right and bottom margins don't need to factor in the x/y changes.
									val -= ox;
								} else if (i === 3) {
									val -= oy;
								}
								this._style[prop] = Math.round( (val - ((i < 2) ? dx - pt.ieOffsetX : dy - pt.ieOffsetY)) ) + "px";
							}
							m += ",sizingMethod='auto expand')";
						} else {
							dx = (w / 2),
							dy = (h / 2);
							//translate to ensure that transformations occur around the correct origin (default is center).
							m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
						}
						
						if (filters.indexOf("progid:DXImageTransform.Microsoft.Matrix(") !== -1) {
							this._style.filter = filters.replace(_ieSetMatrixExp, m);
						} else {
							this._style.filter = filters + " " + m;
						}
	
						//at the end or beginning of the tween, if the matrix is normal (1, 0, 0, 1) and opacity is 100 (or doesn't exist), remove the filter to improve browser performance.
						if (v === 0 || v === 1) if (a === 1) if (b === 0) if (c === 0) if (d === 1) if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100) {
							this._style.removeAttribute("filter");
						}
					}
				}
			}
			
			//if we're adding/changing a class, we should do so at the END of the tween, and drop any of the associated properties that are in the target.style object in order to preserve proper cascading.
			if (this._classData) {
				pt = this._classData; //speeds things up slightly and helps minification
				if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
					var i = pt.props.length;
					while (--i > -1) {
						this._style[pt.props[i]] = "";
					}
					this._target.className = pt.e;
				} else if (this._target.className !== pt.b) {
					this._target.className = pt.b;
				}
			}
		}
		
		//we need to make sure that if alpha or autoAlpha is killed, opacity is too. And autoAlpha affects the "visibility" property.
		p._kill = function(lookup) {
			var copy = lookup, p;
			if (lookup.autoAlpha || lookup.alpha) {
				copy = {};
				for (p in lookup) { //copy the lookup so that we're not changing the original which may be passed elsewhere.
					copy[p] = lookup[p];
				}
				copy.opacity = 1;
				if (copy.autoAlpha) {
					copy.visibility = 1;
				}
			}
			return TweenPlugin.prototype._kill.call(this, copy);
		}
		
		
		TweenPlugin.activate([CSSPlugin]);
		return CSSPlugin;
		
	}, true);
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * RoundPropsPlugin
 * ----------------------------------------------------------------
 */
	_gsRequire("plugins.RoundPropsPlugin", ["plugins.TweenPlugin"], function(TweenPlugin) {
		
		var RoundPropsPlugin = function(props, priority) {
				TweenPlugin.call(this, "roundProps", -1);
			},
			p = RoundPropsPlugin.prototype = new TweenPlugin("roundProps", -1);
		
		p.constructor = RoundPropsPlugin;
		RoundPropsPlugin.API = 2;
		
		p._onInitTween = function(target, value, tween) {
			this._tween = tween;
			return true;
		}
		
		p._onInitAllProps = function() {
			var rp = (this._tween.vars.roundProps instanceof Array) ? this._tween.vars.roundProps : this._tween.vars.roundProps.split(","), 
				i = rp.length,
				lookup = {},
				prop, pt, next;
			while (--i > -1) {
				lookup[rp[i]] = 1;
			}
			i = rp.length;
			while (--i > -1) {
				prop = rp[i];
				pt = this._tween._firstPT;
				while (pt) {
					next = pt._next; //record here, because it may get removed
					if (pt.pg) {
						pt.t._roundProps(lookup, true);
					} else if (pt.n == prop) {
						this._add(pt.t, prop, pt.s, pt.c);
						//remove from linked list
						if (pt._next) {
							pt._next._prev = pt._prev;
						}
						if (pt._prev) {
							pt._prev._next = pt._next;
						} else if (_tween._firstPT === pt) {
							this._tween._firstPT = pt._next;
						}
						pt._next = pt._prev = null;
						this._tween._propLookup[prop] = this;
					}
					pt = pt._next;
				}
			}
			return false;
		}
				
		p._add = function(target, p, s, c) {
			this._addTween(target, p, s, s + c, p, true);
			this._overwriteProps.push(p);
		}
		
		TweenPlugin.activate([RoundPropsPlugin]);
		
		return RoundPropsPlugin;
		
	}, true);
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * EasePack
 * ----------------------------------------------------------------
 */
	_gsRequire("easing.Back", ["easing.Ease"], function(Ease) {
		
		var gs = window.com.greensock, 
			_class = gs._class, 
			_create = function(n, f) {
				var c = _class("easing." + n, function(){}, true), 
					p = c.prototype = new Ease();
				p.constructor = c;
				p.getRatio = f;
				return c;
			},
			
			//BACK
			_createBack = function(n, f) {
				var c = _class("easing." + n, function(overshoot) {
						this._p1 = (overshoot || overshoot === 0) ? overshoot : 1.70158;
						this._p2 = this._p1 * 1.525;
					}, true), 
					p = c.prototype = new Ease();
				p.constructor = c;
				p.getRatio = f;
				p.config = function(overshoot) {
					return new c(overshoot);
				};
				return c;
			}, 
			BackOut = _createBack("BackOut", function(p) {
				return ((p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1);
			}), 
			BackIn = _createBack("BackIn", function(p) {
				return p * p * ((this._p1 + 1) * p - this._p1);
			}), 
			BackInOut = _createBack("BackInOut", function(p) {
				return ((p *= 2) < 1) ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
			}),  
			
			//BOUNCE
			BounceOut = _create("BounceOut", function(p) {
				if (p < 1 / 2.75) {
					return 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					return 7.5625 * (p -= 1.5 / 2.75) * p + .75;
				} else if (p < 2.5 / 2.75) {
					return 7.5625 * (p -= 2.25 / 2.75) * p + .9375;
				} else {
					return 7.5625 * (p -= 2.625 / 2.75) * p + .984375;
				}
			}), 
			BounceIn = _create("BounceIn", function(p) {
				if ((p = 1 - p) < 1 / 2.75) {
					return 1 - (7.5625 * p * p);
				} else if (p < 2 / 2.75) {
					return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + .75);
				} else if (p < 2.5 / 2.75) {
					return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + .9375);
				} else {
					return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + .984375);
				}
			}), 
			BounceInOut = _create("BounceInOut", function(p) {
				var invert = (p < 0.5);
				if (invert) {
					p = 1 - (p * 2);
				} else {
					p = (p * 2) - 1;
				}
				if (p < 1 / 2.75) {
					p = 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					p = 7.5625 * (p -= 1.5 / 2.75) * p + .75;
				} else if (p < 2.5 / 2.75) {
					p = 7.5625 * (p -= 2.25 / 2.75) * p + .9375;
				} else {
					p = 7.5625 * (p -= 2.625 / 2.75) * p + .984375;
				}
				return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
			}),
			
			//CIRC
			CircOut = _create("CircOut", function(p) {
				return Math.sqrt(1 - (p = p - 1) * p);
			}),
			CircIn = _create("CircIn", function(p) {
				return -(Math.sqrt(1 - (p * p)) - 1);
			}),
			CircInOut = _create("CircInOut", function(p) {
				return ((p*=2) < 1) ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
			}),
			
			//ELASTIC
			_2PI = Math.PI * 2,
			_createElastic = function(n, f, def) {
				var c = _class("easing." + n, function(amplitude, period) {
						amplitude = amplitude || 0;
						this._p1 = (!amplitude || amplitude < 1) ? 1 : amplitude;
						this._p2 = period || def;
						this._p3 = this._p2 / _2PI * Math.asin(1 / this._p1);
					}, true), 
					p = c.prototype = new Ease();
				p.constructor = c;
				p.getRatio = f;
				p.config = function(amplitude, period) {
					return new c(amplitude, period);
				};
				return c;
			}, 
			ElasticOut = _createElastic("ElasticOut", function(p) {
				return this._p1 * Math.pow(2, -10 * p) * Math.sin( (p - this._p3) * _2PI / this._p2 ) + 1;
			}, 0.3), 
			ElasticIn = _createElastic("ElasticIn", function(p) {
				return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * _2PI / this._p2 ));
			}, 0.3), 
			ElasticInOut = _createElastic("ElasticInOut", function(p) {
				return ((p *= 2) < 1) ? -.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * _2PI / this._p2)) : this._p1 * Math.pow(2, -10 *(p -= 1)) * Math.sin( (p - this._p3) * _2PI / this._p2 ) *.5 + 1;
			}, 0.45),
			
			//Expo
			ExpoOut = _create("ExpoOut", function(p) {
				return 1 - Math.pow(2, -10 * p);
			}),
			ExpoIn = _create("ExpoIn", function(p) {
				return Math.pow(2, 10 * (p - 1)) - 0.001;
			}),
			ExpoInOut = _create("ExpoInOut", function(p) {
				return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
			}), 
			
			//Sine
			_HALF_PI = Math.PI / 2,
			SineOut = _create("SineOut", function(p) {
				return Math.sin(p * _HALF_PI);
			}),
			SineIn = _create("SineIn", function(p) {
				return -Math.cos(p * _HALF_PI) + 1;
			}),
			SineInOut = _create("SineInOut", function(p) {
				return -0.5 * (Math.cos(Math.PI * p) - 1);
			}),
			
			//SlowMo
			SlowMo = _class("easing.SlowMo", function(linearRatio, power, yoyoMode) {
				power = (power || power === 0) ? power : 0.7;
				if (linearRatio == null) {
					linearRatio = 0.7;
				} else if (linearRatio > 1) {
					linearRatio = 1;
				}
				this._p = (linearRatio != 1) ? power : 0;
				this._p1 = (1 - linearRatio) / 2;
				this._p2 = linearRatio;
				this._p3 = this._p1 + this._p2;
				this._calcEnd = (yoyoMode == true);
			}, true),
			p = SlowMo.prototype = new Ease();
			
		p.constructor = SlowMo;
		p.getRatio = function(p) {
			var r = p + (0.5 - p) * this._p;
			if (p < this._p1) {
				return this._calcEnd ? 1 - ((p = 1 - (p / this._p1)) * p) : r - ((p = 1 - (p / this._p1)) * p * p * p * r);
			} else if (p > this._p3) {
				return this._calcEnd ? 1 - (p = (p - this._p3) / this._p1) * p : r + ((p - r) * (p = (p - this._p3) / this._p1) * p * p * p);
			}
			return this._calcEnd ? 1 : r;
		};
		SlowMo.ease = new SlowMo(0.7, 0.7);
		
		p.config = function(linearRatio, power, yoyoMode) {
			return new SlowMo(linearRatio, power, yoyoMode);
		};
		
		
		_class("easing.Bounce", {
				easeOut:new BounceOut(),
				easeIn:new BounceIn(),
				easeInOut:new BounceInOut()
			}, true);
		
		_class("easing.Circ", {
				easeOut:new CircOut(),
				easeIn:new CircIn(),
				easeInOut:new CircInOut()
			}, true);
		
		_class("easing.Elastic", {
				easeOut:new ElasticOut(),
				easeIn:new ElasticIn(),
				easeInOut:new ElasticInOut()
			}, true);
			
		_class("easing.Expo", {
				easeOut:new ExpoOut(),
				easeIn:new ExpoIn(),
				easeInOut:new ExpoInOut()
			}, true);
			
		_class("easing.Sine", {
				easeOut:new SineOut(),
				easeIn:new SineIn(),
				easeInOut:new SineInOut()
			}, true);
		
		
		return {
			easeOut:new BackOut(),
			easeIn:new BackIn(),
			easeInOut:new BackInOut()
		};
		
	}, true);


}); 



/*
 * ----------------------------------------------------------------
 * Base classes like TweenLite, SimpleTimeline, Ease, Ticker, etc. (!TweenLite)
 * ----------------------------------------------------------------
 */
(function(window) {
	
		"use strict";
		var _namespace = function(ns) {
				var a = ns.split("."), 
					p = window, i;
				for (i = 0; i < a.length; i++) {
					p[a[i]] = p = p[a[i]] || {};
				}
				return p;
			},
			gs = _namespace("com.greensock"),
			a, i, e, e2, p,
			_classLookup = {},
			
			//_DepClass is for defining a dependent class. ns = namespace (leaving off "com.greensock." as that's assumed), dep = an array of namespaces that are required, def = the function that will return the class definition (this function will be passed each dependency in order as soon as they arrive), global = if true, the class is added to the global scope (window) or if requirejs is being used, it will tap into that instead.
			_DepClass = function(ns, dep, def, global) {
				this.sc = (_classLookup[ns]) ? _classLookup[ns].sc : []; //subclasses
				_classLookup[ns] = this;
				this.gsClass = null;
				this.def = def;
				var _dep = dep || [],
					_classes = [];
				this.check = function(init) {
					var i = _dep.length, cnt = 0, cur;
					while (--i > -1) {
						if ((cur = _classLookup[_dep[i]] || new _DepClass(_dep[i])).gsClass) {
							_classes[i] = cur.gsClass;
						} else {
							cnt++;
							if (init) {
								cur.sc.push(this);
							}
						}
					}
					if (cnt === 0 && def) {
						var a = ("com.greensock." + ns).split("."),
							n = a.pop(),
							cl = _namespace(a.join("."))[n] = this.gsClass = def.apply(def, _classes);
						
						//exports to multiple environments
						if (global) {
							if (typeof(define) === "function" && define.amd){ //AMD
								define(n, [], function() { return cl; });
							} else if (typeof(module) !== "undefined" && module.exports){ //node
								module.exports = cl;
							} else {
								window[n] = cl;
							}
						}
						
						for (i = 0; i < this.sc.length; i++) {
							this.sc[i].check(false);
						}
						
					}
				};
				this.check(true);
			},
			//a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
			_class = gs._class = function(ns, f, g) {
				new _DepClass(ns, [], function(){ return f; }, g);
				return f;
			};
		
		//Used to create _DepClass instances (which basically registers a class that has dependencies). ns = namespace, dep = dependencies (array), f = initialization function which should return the class, g = global (whether or not the class should be added to the global namespace (or if RequireJS is used, it will be defined as a named module instead)
		window._gsRequire = function(ns, dep, f, g) {
			return new _DepClass(ns, dep, f, g);
		};
		
	

/*
 * ----------------------------------------------------------------
 * Ease
 * ----------------------------------------------------------------
 */
		var _baseParams = [0, 0, 1, 1],
			_blankArray = [],
			Ease = _class("easing.Ease", function(func, extraParams, type, power) {
				this._func = func;
				this._type = type || 0;
				this._power = power || 0;
				this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
			}, true);
		
		p = Ease.prototype;
		p._calcEnd = false;
		p.getRatio = function(p) {
			if (this._func) {
				this._params[0] = p;
				return this._func.apply(null, this._params);
			} else {
				var t = this._type, 
					pw = this._power, 
					r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
				if (pw === 1) {
					r *= r;
				} else if (pw === 2) {
					r *= r * r;
				} else if (pw === 3) {
					r *= r * r * r;
				} else if (pw === 4) {
					r *= r * r * r * r;
				}
				return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
			}
		};
		
		//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
		a = ["Linear","Quad","Cubic","Quart","Quint"];
		i = a.length;
		while(--i > -1) {
			e = _class("easing." + a[i], function(){}, true);
			e2 = _class("easing.Power" + i, function(){}, true);
			e.easeOut = e2.easeOut = new Ease(null, null, 1, i);
			e.easeIn = e2.easeIn = new Ease(null, null, 2, i);
			e.easeInOut = e2.easeInOut = new Ease(null, null, 3, i);
		}
		_class("easing.Strong", gs.easing.Power4, true);
		gs.easing.Linear.easeNone = gs.easing.Linear.easeIn;
	

/*
 * ----------------------------------------------------------------
 * EventDispatcher
 * ----------------------------------------------------------------
 */
		p = _class("events.EventDispatcher", function(target) {
			this._listeners = {};
			this._eventTarget = target || this;
		}).prototype;
		
		p.addEventListener = function(type, callback, scope, useParam, priority) {
			priority = priority || 0;
			var list = this._listeners[type],
				index = 0,
				listener, i;
			if (list == null) {
				this._listeners[type] = list = [];
			}
			i = list.length;
			while (--i > -1) {
				listener = list[i];
				if (listener.c === callback) {
					list.splice(i, 1);
				} else if (index === 0 && listener.pr < priority) {
					index = i + 1;
				}
			}
			list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});
		};
		
		p.removeEventListener = function(type, callback) {
			var list = this._listeners[type];
			if (list) {
				var i = list.length;
				while (--i > -1) {
					if (list[i].c === callback) {
						list.splice(i, 1);
						return;
					}
				}
			}
		};
		
		p.dispatchEvent = function(type) {
			var list = this._listeners[type];
			if (list) {
				var i = list.length, listener,
					t = this._eventTarget;
				while (--i > -1) {
					listener = list[i];
					if (listener.up) {
						listener.c.call(listener.s || t, {type:type, target:t});
					} else {
						listener.c.call(listener.s || t);
					}
				}
			}
		};


/*
 * ----------------------------------------------------------------
 * Ticker
 * ----------------------------------------------------------------
 */
 		var _reqAnimFrame = window.requestAnimationFrame, 
			_cancelAnimFrame = window.cancelAnimationFrame, 
			_getTime = Date.now || function() {return new Date().getTime();};
		
		//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
		a = ["ms","moz","webkit","o"];
		i = a.length;
		while (--i > -1 && !_reqAnimFrame) {
			_reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
			_cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
		}
		if (!_cancelAnimFrame) {
			_cancelAnimFrame = function(id) {
				window.clearTimeout(id);
			}
		}
		
		_class("Ticker", function(fps, useRAF) {
			this.time = 0;
			this.frame = 0;
			var _self = this,
				_startTime = _getTime(),
				_useRAF = (useRAF !== false),
				_fps, _req, _id, _gap, _nextTime;
			
			this.tick = function() {
				_self.time = (_getTime() - _startTime) / 1000;
				if (!_fps || _self.time >= _nextTime) {
					_self.frame++;
					_nextTime = _self.time + _gap - (_self.time - _nextTime) - 0.0005;
					if (_nextTime <= _self.time) {
						_nextTime = _self.time + 0.001;
					}
					_self.dispatchEvent("tick");
				}
				_id = _req( _self.tick );
			};
			
			this.fps = function(value) {
				if (!arguments.length) {
					return _fps;
				}
				_fps = value;
				_gap = 1 / (_fps || 60);
				_nextTime = this.time + _gap;
				_req = (_fps === 0) ? function(f){} : (!_useRAF || !_reqAnimFrame) ? function(f) { return window.setTimeout( f, (((_nextTime - _self.time) * 1000 + 1) >> 0) || 1);	} : _reqAnimFrame;
				_cancelAnimFrame(_id);
				_id = _req( _self.tick );
			};
			
			this.useRAF = function(value) {
				if (!arguments.length) {
					return _useRAF
				}
				_useRAF = value;
				this.fps(_fps);
			};
			
			this.fps(fps);
		});
		
		p = gs.Ticker.prototype = new gs.events.EventDispatcher();
		p.constructor = gs.Ticker;


/*
 * ----------------------------------------------------------------
 * Animation
 * ----------------------------------------------------------------
 */
		var Animation = _class("core.Animation", function(duration, vars) {
				this.vars = vars || {};
				this._duration = this._totalDuration = duration || 0;
				this._delay = Number(this.vars.delay) || 0;
				this._timeScale = 1;
				this._active = (this.vars.immediateRender == true);
				this.data = this.vars.data;
				this._reversed = (this.vars.reversed == true);
				
				if (!_rootTimeline) {
					return;
				}
				
				var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
				tl.insert(this, tl._time);
				
				if (this.vars.paused) {
					this.paused(true);
				}
			}),
			_ticker = Animation.ticker = new gs.Ticker();
		
		p = Animation.prototype;
		p._dirty = p._gc = p._initted = p._paused = false;
		p._totalTime = p._time = 0;
		p._rawPrevTime = -1;
		p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
		p._paused = false;
		
		p.play = function(from, suppressEvents) {
			if (arguments.length) {
				this.seek(from, suppressEvents);
			}
			this.reversed(false);
			return this.paused(false);
		};
		
		p.pause = function(atTime, suppressEvents) {
			if (arguments.length) {
				this.seek(atTime, suppressEvents);
			}
			return this.paused(true);
		};
		
		p.resume = function(from, suppressEvents) {
			if (arguments.length) {
				this.seek(from, suppressEvents);
			}
			return this.paused(false);
		};
		
		p.seek = function(time, suppressEvents) {
			return this.totalTime(Number(time), (suppressEvents != false));
		};
		
		p.restart = function(includeDelay, suppressEvents) {
			this.reversed(false);
			this.paused(false);
			return this.totalTime((includeDelay) ? -this._delay : 0, (suppressEvents != false));
		};
		
		p.reverse = function(from, suppressEvents) {
			if (arguments.length) {
				this.seek((from || this.totalDuration()), suppressEvents);
			}
			this.reversed(true);
			return this.paused(false);
		};
		
		p.render = function() {
			
		};
		
		p.invalidate = function() {
			return this;
		};
		
		p._enabled = function (enabled, ignoreTimeline) {
			this._gc = !enabled; 
			this._active = (enabled && !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration);
			if (ignoreTimeline != true) {
				if (enabled && this.timeline == null) {
					this._timeline.insert(this, this._startTime - this._delay);
				} else if (!enabled && this.timeline != null) {
					this._timeline._remove(this, true);
				}
			}
			return false;
		};
	
		
		p._kill = function(vars, target) {
			return this._enabled(false, false);
		};
		
		p.kill = function(vars, target) {
			this._kill(vars, target);
			return this;
		};
		
		p._uncache = function(includeSelf) {
			var tween = includeSelf ? this : this.timeline;
			while (tween) {
				tween._dirty = true;
				tween = tween.timeline;
			}
			return this;
		};
	
//----Animation getters/setters --------------------------------------------------------
		
		p.eventCallback = function(type, callback, params, scope) {
			if (type == null) {
				return null;
			} else if (type.substr(0,2) === "on") {
				if (arguments.length === 1) {
					return this.vars[type];
				}
				if (callback == null) {
					delete this.vars[type];
				} else {
					this.vars[type] = callback;
					this.vars[type + "Params"] = params;
					this.vars[type + "Scope"] = scope;
					if (params) {
						var i = params.length;
						while (--i > -1) {
							if (params[i] === "{self}") {
								params = this.vars[type + "Params"] = params.concat(); //copying the array avoids situations where the same array is passed to multiple tweens/timelines and {self} doesn't correctly point to each individual instance.
								params[i] = this;
							}
						}
					}
				}
				if (type === "onUpdate") {
					this._onUpdate = callback;

				}
			}
			return this;
		}
		
		p.delay = function(value) {
			if (!arguments.length) {
				return this._delay;
			}
			if (this._timeline.smoothChildTiming) {
				this.startTime( this._startTime + value - this._delay );
			}
			this._delay = value;
			return this;
		};
		
		p.duration = function(value) {
			if (!arguments.length) {
				this._dirty = false;
				return this._duration;
			}
			this._duration = this._totalDuration = value;
			this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration. 
			if (this._timeline.smoothChildTiming) if (this._active) if (value != 0) {
				this.totalTime(this._totalTime * (value / this._duration), true);
			}
			return this;
		};
		
		p.totalDuration = function(value) {
			this._dirty = false;
			return (!arguments.length) ? this._totalDuration : this.duration(value);
		};
		
		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			return this.totalTime(value, suppressEvents);
		};
		
		p.totalTime = function(time, suppressEvents) {
			if (!arguments.length) {
				return this._totalTime;
			}
			if (this._timeline) {
				if (time < 0) {
					time += this.totalDuration();
				}
				if (this._timeline.smoothChildTiming) {
					if (this._dirty) {
						this.totalDuration();
					}
					if (time > this._totalDuration) {
						time = this._totalDuration;
					}
					this._startTime = (this._paused ? this._pauseTime : this._timeline._time) - ((!this._reversed ? time : this._totalDuration - time) / this._timeScale);
					if (!this._timeline._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the anscestors as dirty too, so skip the function call here.
						this._uncache(false);
					}
					if (!this._timeline._active) {
						//in case any of the anscestors had completed but should now be enabled...
						var tl = this._timeline;
						while (tl._timeline) {
							tl.totalTime(tl._totalTime, true);
							tl = tl._timeline;
						}
					}
				}
				if (this._gc) {
					this._enabled(true, false);
				}
				if (this._totalTime != time) {
					this.render(time, suppressEvents, false);
				}
			}
			return this;
		};
		
		p.startTime = function(value) {
			if (!arguments.length) {
				return this._startTime;
			}
			if (value != this._startTime) {
				this._startTime = value;
				if (this.timeline) if (this.timeline._sortChildren) {
					this.timeline.insert(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			return this;
		};
		
		p.timeScale = function(value) {
			if (!arguments.length) {
				return this._timeScale;
			}
			value = value || 0.000001; //can't allow zero because it'll throw the math off
			if (this._timeline && this._timeline.smoothChildTiming) {
				var t = (this._pauseTime || this._pauseTime == 0) ? this._pauseTime : this._timeline._totalTime;
				this._startTime = t - ((t - this._startTime) * this._timeScale / value);
			}
			this._timeScale = value;
			return this._uncache(false);
		};
		
		p.reversed = function(value) {
			if (!arguments.length) {
				return this._reversed;
			}
			if (value != this._reversed) {
				this._reversed = value;
				this.totalTime(this._totalTime, true);
			}
			return this;
		};
		
		p.paused = function(value) {
			if (!arguments.length) {
				return this._paused;
			}
			if (value != this._paused) if (this._timeline) {
				if (!value && this._timeline.smoothChildTiming) {
					this._startTime += this._timeline.rawTime() - this._pauseTime;
					this._uncache(false);
				}
				this._pauseTime = (value) ? this._timeline.rawTime() : null;
				this._paused = value;
				this._active = (!this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration);
			}
			if (this._gc) if (!value) {
				this._enabled(true, false);
			}
			return this;
		};
	

/*
 * ----------------------------------------------------------------
 * SimpleTimeline
 * ----------------------------------------------------------------
 */
		var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
			Animation.call(this, 0, vars);
			this.autoRemoveChildren = this.smoothChildTiming = true;
		});
		
		p = SimpleTimeline.prototype = new Animation();
		p.constructor = SimpleTimeline;
		p.kill()._gc = false;
		p._first = p._last = null;
		p._sortChildren = false;
		
		p.insert = function(tween, time) {
			tween._startTime = Number(time || 0) + tween._delay;
			if (tween._paused) if (this !== tween._timeline) { //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order). 
				tween._pauseTime = tween._startTime + ((this.rawTime() - tween._startTime) / tween._timeScale);
			}
			if (tween.timeline) {
				tween.timeline._remove(tween, true); //removes from existing timeline so that it can be properly added to this one.
			}
			tween.timeline = tween._timeline = this;
			if (tween._gc) {
				tween._enabled(true, true);
			}
			
			var prevTween = this._last;
			if (this._sortChildren) {
				var st = tween._startTime;
				while (prevTween && prevTween._startTime > st) {
					prevTween = prevTween._prev;
				}
			}
			if (prevTween) {
				tween._next = prevTween._next;
				prevTween._next = tween;
			} else {
				tween._next = this._first;
				this._first = tween;
			}
			if (tween._next) {
				tween._next._prev = tween;
			} else {
				this._last = tween;
			}
			tween._prev = prevTween;
			
			if (this._timeline) {
				this._uncache(true);
			}
			return this;
		};
		
		p._remove = function(tween, skipDisable) {
			if (tween.timeline === this) {
				if (!skipDisable) {
					tween._enabled(false, true);
				}
				tween.timeline = null;
				
				if (tween._prev) {
					tween._prev._next = tween._next;
				} else if (this._first === tween) {
					this._first = tween._next;
				}
				if (tween._next) {
					tween._next._prev = tween._prev;
				} else if (this._last === tween) {
					this._last = tween._prev;
				}
				
				if (this._timeline) {
					this._uncache(true);
				}
			}
			return this;
		};
		
		p.render = function(time, suppressEvents, force) {
			var tween = this._first, 
				next;
			this._totalTime = this._time = this._rawPrevTime = time;
			while (tween) {
				next = tween._next; //record it here because the value could change after rendering...
				if (tween._active || (time >= tween._startTime && !tween._paused)) {
					if (!tween._reversed) {
						tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, false);
					} else {
						tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, false);
					}
				}
				tween = next;
			}
		};
				
		p.rawTime = function() {
			return this._totalTime;			
		};
	
	
/*
 * ----------------------------------------------------------------
 * TweenLite
 * ----------------------------------------------------------------
 */
		var TweenLite = _class("TweenLite", function(target, duration, vars) {
				Animation.call(this, duration, vars);
				
				if (target == null) {
					throw "Cannot tween an undefined reference.";
				}
				this.target = target;		
				
				this._overwrite = (this.vars.overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof(this.vars.overwrite) === "number") ? this.vars.overwrite >> 0 : _overwriteLookup[this.vars.overwrite];
				
				var jq, i, targ;
				if ((target instanceof Array || target.jquery) && typeof(target[0]) === "object") { 
					this._targets = target.slice(0); //works for both jQuery and Array instances
					this._propLookup = [];
					this._siblings = [];
					for (i = 0; i < this._targets.length; i++) {
						targ = this._targets[i];
						//in case the user is passing in an array of jQuery objects, for example, we need to check one more level and pull things out if necessary...
						if (targ.jquery) { 
							this._targets.splice(i--, 1);
							this._targets = this._targets.concat(targ.constructor.makeArray(targ));
							continue;
						}
						this._siblings[i] = _register(targ, this, false);
						if (this._overwrite === 1) if (this._siblings[i].length > 1) {
							_applyOverwrite(targ, this, null, 1, this._siblings[i]);
						}
					}
					
				} else {
					this._propLookup = {};
					this._siblings = _register(target, this, false);
					if (this._overwrite === 1) if (this._siblings.length > 1) {
						_applyOverwrite(target, this, null, 1, this._siblings);
					}
				}
				
				if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender != false)) {
					this.render(0, false, true);
				}
			}, true);
	
		p = TweenLite.prototype = new Animation();
		p.constructor = TweenLite;
		p.kill()._gc = false;
	
//----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------
	
		p.ratio = 0;
		p._firstPT = p._targets = p._overwrittenProps = null;
		p._notifyPluginsOfEnabled = false;
		
		TweenLite.version = 12;
		TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
		TweenLite.defaultOverwrite = "auto";
		TweenLite.ticker = _ticker;
		
		var _plugins = TweenLite._plugins = {},
			_tweenLookup = {}, 
			_tweenLookupNum = 0,
			_reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, orientToBezier:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1},
			_overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},
			_rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(), 
			_rootTimeline = Animation._rootTimeline = new SimpleTimeline();
			
		_rootTimeline._startTime = _ticker.time;
		_rootFramesTimeline._startTime = _ticker.frame;
		_rootTimeline._active = _rootFramesTimeline._active = true;
		
		Animation._updateRoot = function() {
				_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
				_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
				if (!(_ticker.frame % 120)) { //dump garbage every 120 frames...
					var i, a, p;
					for (p in _tweenLookup) {
						a = _tweenLookup[p].tweens;
						i = a.length;
						while (--i > -1) {
							if (a[i]._gc) {
								a.splice(i, 1);
							}
						}
						if (a.length === 0) {
							delete _tweenLookup[p];
						}
					}
				}
			};
		
		_ticker.addEventListener("tick", Animation._updateRoot);
		
		var _register = function(target, tween, scrub) {
				var id = target._gsTweenID, a, i;
				if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
					_tweenLookup[id] = {target:target, tweens:[]};
				}
				if (tween) {
					a = _tweenLookup[id].tweens;
					a[(i = a.length)] = tween;
					if (scrub) {
						while (--i > -1) {
							if (a[i] === tween) {
								a.splice(i, 1);
							}
						}
					}
				}
				return _tweenLookup[id].tweens;
			},
			
			_applyOverwrite = function(target, tween, props, mode, siblings) {
				var i, changed, curTween;
				if (mode === 1 || mode >= 4) {
					var l = siblings.length;
					for (i = 0; i < l; i++) {
						if ((curTween = siblings[i]) !== tween) {
							if (!curTween._gc) if (curTween._enabled(false, false)) {
								changed = true;
							}
						} else if (mode === 5) {
							break;
						}
					}
					return changed;
				}
				//NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
				var startTime = tween._startTime + 0.0000000001, 
					overlaps = [], 
					oCount = 0, 
					globalStart;
				i = siblings.length;
				while (--i > -1) {
					if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
						//ignore
					} else if (curTween._timeline !== tween._timeline) {
						globalStart = globalStart || _checkOverlap(tween, 0);
						if (_checkOverlap(curTween, globalStart) === 0) {
							overlaps[oCount++] = curTween;
						}
					} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale + 0.0000000001 > startTime) if (!((tween._duration === 0 || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
						overlaps[oCount++] = curTween;
					}
				}
				
				i = oCount;
				while (--i > -1) {
					curTween = overlaps[i];
					if (mode === 2) if (curTween._kill(props, target)) {
						changed = true;
					}
					if (mode !== 2 || (!curTween._firstPT && curTween._initted)) { 
						if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.
							changed = true;
						}
					}
				}
				return changed;
			},
			
			_checkOverlap = function(tween, reference) {
				var tl = tween._timeline, 
					ts = tl._timeScale, 
					t = tween._startTime;
				while (tl._timeline) {
					t += tl._startTime;
					ts *= tl._timeScale;
					if (tl._paused) {
						return -100;
					}
					tl = tl._timeline;
				}
				t /= ts;
				return (t > reference) ? t - reference : (!tween._initted && t - reference < 0.0000000002) ? 0.0000000001 : ((t = t + tween.totalDuration() / tween._timeScale / ts + 0.0000000001) > reference) ? 0 : t - reference - 0.0000000001;
			};

	
//---- TweenLite instance methods -----------------------------------------------------------------------------

		p._init = function() {
			if (this.vars.startAt) {
				this.vars.startAt.overwrite = 0;
				this.vars.startAt.immediateRender = true;
				TweenLite.to(this.target, 0, this.vars.startAt);
			}
			var i, initPlugins, pt;
			if (this.vars.ease instanceof Ease) {
				this._ease = (this.vars.easeParams instanceof Array) ? this.vars.ease.config.apply(this.vars.ease, this.vars.easeParams) : this.vars.ease;
			} else if (typeof(this.vars.ease) === "function") {
				this._ease = new Ease(this.vars.ease, this.vars.easeParams);
			} else {
				this._ease = TweenLite.defaultEase;
			}
			this._easeType = this._ease._type;
			this._easePower = this._ease._power;
			this._firstPT = null;
			
			if (this._targets) {
				i = this._targets.length;
				while (--i > -1) {
					if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (this._overwrittenProps ? this._overwrittenProps[i] : null)) ) {
						initPlugins = true;
					}
				}
			} else {
				initPlugins = this._initProps(this.target, this._propLookup, this._siblings, this._overwrittenProps);
			}
			
			if (initPlugins) {
				TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
			}
			if (this._overwrittenProps) if (this._firstPT == null) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
				this._enabled(false, false);
			}
			if (this.vars.runBackwards) {
				pt = this._firstPT;
				while (pt) {
					pt.s += pt.c;
					pt.c = -pt.c;
					pt = pt._next;
				}
			}
			this._onUpdate = this.vars.onUpdate;
			this._initted = true;
		};
		
		p._initProps = function(target, propLookup, siblings, overwrittenProps) {
			var p, i, initPlugins, plugin, a;
			if (target == null) {
				return false;
			}
			for (p in this.vars) {
				if (_reservedProps[p]) { 
					if (p === "onStartParams" || p === "onUpdateParams" || p === "onCompleteParams" || p === "onReverseCompleteParams" || p === "onRepeatParams") if ((a = this.vars[p])) {
						i = a.length;
						while (--i > -1) {
							if (a[i] === "{self}") {
								a = this.vars[p] = a.concat(); //copy the array in case the user referenced the same array in multiple tweens/timelines (each {self} should be unique)
								a[i] = this;
							}
						}
					}
					
				} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this)) {
					
					//t - target 		[object]
					//p - property 		[string]
					//s - start			[number]
					//c - change		[number]
					//f - isFunction	[boolean]
					//n - name			[string]
					//pg - isPlugin 	[boolean]
					//pr - priority		[number]
					this._firstPT = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:true, n:p, pg:true, pr:plugin._priority};
					i = plugin._overwriteProps.length;
					while (--i > -1) {
						propLookup[plugin._overwriteProps[i]] = this._firstPT;
					}
					if (plugin._priority || plugin._onInitAllProps) {
						initPlugins = true;
					}
					if (plugin._onDisable || plugin._onEnable) {
						this._notifyPluginsOfEnabled = true;
					}
					
				} else {
					this._firstPT = propLookup[p] = {_next:this._firstPT, t:target, p:p, f:(typeof(target[p]) === "function"), n:p, pg:false, pr:0};
					this._firstPT.s = (!this._firstPT.f) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
					this._firstPT.c = (typeof(this.vars[p]) === "number") ? this.vars[p] - this._firstPT.s : (typeof(this.vars[p]) === "string") ? parseFloat(this.vars[p].split("=").join("")) : 0;
				}
				if (this._firstPT) if (this._firstPT._next) {
					this._firstPT._next._prev = this._firstPT;
				}
			}
			
			if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
				return this._initProps(target, propLookup, siblings, overwrittenProps);
			}
			if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
				this._kill(propLookup, target);
				return this._initProps(target, propLookup, siblings, overwrittenProps);
			}
			return initPlugins;
		};
		
		p.render = function(time, suppressEvents, force) {
			var prevTime = this._time,
				isComplete, callback, pt;
			if (time >= this._duration) {
				this._totalTime = this._time = this._duration;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				if (!this._reversed) {
					isComplete = true;
					callback = "onComplete";
				}
				if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time) {
						force = true;
					}
					this._rawPrevTime = time;
				}
				
			} else if (time <= 0) {
				this._totalTime = this._time = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (this._rawPrevTime >= 0) {
							force = true;
						}
						this._rawPrevTime = time;
					}
				} else if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;
				}
				
			} else {
				this._totalTime = this._time = time;
				
				if (this._easeType) {
					var r = time / this._duration, type = this._easeType, pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}
					
					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (time / this._duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}
					
				} else {
					this.ratio = this._ease.getRatio(time / this._duration);
				}
				
			}
			
			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._init();
				if (!isComplete && this._time) { //_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
					this.ratio = this._ease.getRatio(this._time / this._duration);
				}
			}
			
			if (!this._active) if (!this._paused) {
				this._active = true;  //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0 || this._duration === 0) if (!suppressEvents) {
				this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
			}
			
			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}
			
			
			if (this._onUpdate) if (!suppressEvents) {
				this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
			}
			
			if (callback) if (!this._gc) { //check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents) if (this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}
			
		};
		
		p._kill = function(vars, target) {
			if (vars === "all") {
				vars = null;
			}
			if (vars == null) if (target == null || target == this.target) {
				return this._enabled(false, false);
			}
			target = target || this._targets || this.target;
			var i, overwrittenProps, p, pt, propLookup, changed, killProps, record;
			if ((target instanceof Array || target.jquery) && typeof(target[0]) === "object") { 
				i = target.length;
				while (--i > -1) {
					if (this._kill(vars, target[i])) {
						changed = true;
					}
				}
			} else {
				if (this._targets) {
					i = this._targets.length;
					while (--i > -1) {
						if (target === this._targets[i]) {
							propLookup = this._propLookup[i] || {};
							this._overwrittenProps = this._overwrittenProps || [];
							overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
							break;
						}
					}
				} else if (target !== this.target) {
					return false;
				} else {
					propLookup = this._propLookup;
					overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
				}

				if (propLookup) {
					killProps = vars || propLookup;
					record = (vars != overwrittenProps && overwrittenProps != "all" && vars != propLookup && (vars == null || vars._tempKill != true)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
					for (p in killProps) {
						if ((pt = propLookup[p])) {
							if (pt.pg && pt.t._kill(killProps)) {
								changed = true; //some plugins need to be notified so they can perform cleanup tasks first
							}
							if (!pt.pg || pt.t._overwriteProps.length === 0) {
								if (pt._prev) {
									pt._prev._next = pt._next;
								} else if (pt === this._firstPT) {
									this._firstPT = pt._next;
								}
								if (pt._next) {
									pt._next._prev = pt._prev;
								}
								pt._next = pt._prev = null;
							}
							delete propLookup[p];
						}
						if (record) { 
							overwrittenProps[p] = 1;
						}
					}
				}
			}
			return changed;
		};
	
		p.invalidate = function() {
			if (this._notifyPluginsOfEnabled) {
				TweenLite._onPluginEvent("_onDisable", this);
			}
			this._firstPT = null;
			this._overwrittenProps = null;
			this._onUpdate = null;
			this._initted = this._active = this._notifyPluginsOfEnabled = false;
			this._propLookup = (this._targets) ? {} : [];
			return this;
		};
		
		p._enabled = function(enabled, ignoreTimeline) {
			if (enabled && this._gc) {
				if (this._targets) {
					var i = this._targets.length;
					while (--i > -1) {
						this._siblings[i] = _register(this._targets[i], this, true);
					}
				} else {
					this._siblings = _register(this.target, this, true);
				}
			}
			Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
			if (this._notifyPluginsOfEnabled) if (this._firstPT) {
				return TweenLite._onPluginEvent(((enabled) ? "_onEnable" : "_onDisable"), this);
			}
			return false;
		};
	
	
//----TweenLite static methods -----------------------------------------------------
		
		TweenLite.to = function(target, duration, vars) {
			return new TweenLite(target, duration, vars);
		};
		
		TweenLite.from = function(target, duration, vars) {
			vars.runBackwards = true;
			if (vars.immediateRender != false) {
				vars.immediateRender = true;
			}
			return new TweenLite(target, duration, vars);
		};
		
		TweenLite.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			if (fromVars.immediateRender) {
				toVars.immediateRender = true;
			}
			return new TweenLite(target, duration, toVars);
		};
		
		TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, onCompleteScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, onReverseCompleteScope:scope, immediateRender:false, useFrames:useFrames, overwrite:0});
		};
		
		TweenLite.set = function(target, vars) {
			return new TweenLite(target, 0, vars);
		};
		
		TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, vars) {
			var a = TweenLite.getTweensOf(target), 
				i = a.length;
			while (--i > -1) {
				a[i]._kill(vars, target);
			}
		};
		
		TweenLite.getTweensOf = function(target) {
			if (target == null) { return; }
			var i, a, j, t;
			if ((target instanceof Array || target.jquery) && typeof(target[0]) === "object") { 
				i = target.length;
				a = [];
				while (--i > -1) {
					a = a.concat(TweenLite.getTweensOf(target[i]));
				}
				i = a.length;
				//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
				while (--i > -1) {
					t = a[i];
					j = i;
					while (--j > -1) {
						if (t === a[j]) {
							a.splice(i, 1);
						}
					}
				}
			} else {
				a = _register(target).concat();
				i = a.length;
				while (--i > -1) {
					if (a[i]._gc) {
						a.splice(i, 1);
					}
				}
			}
			return a;
		};
		
		
		
/*
 * ----------------------------------------------------------------
 * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another <script> call before loading plugins which is easy to forget)
 * ----------------------------------------------------------------
 */
		var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
					this._overwriteProps = (props || "").split(",");
					this._propName = this._overwriteProps[0];
					this._priority = priority || 0;
				}, true);
		
		p = TweenPlugin.prototype;
		TweenPlugin.version = 12;
		TweenPlugin.API = 2;
		p._firstPT = null;		
			
		p._addTween = function(target, prop, start, end, overwriteProp, round) {
			if (end != null && (c = (typeof(end) === "number" || end.indexOf("=") === -1) ? Number(end) - start : Number(end.split("=").join("")))) {
				this._firstPT = {_next:this._firstPT, t:target, p:prop, s:start, c:c, f:(typeof(target[prop]) == "function"), n:overwriteProp || prop, r:round};
				if (this._firstPT._next) {
					this._firstPT._next._prev = this._firstPT;
				}
			}
		}
			
		p.setRatio = function(v) {
			var pt = this._firstPT, 
				val;
			while (pt) {
				val = pt.c * v + pt.s;
				if (pt.r) {
					val = (val + ((val > 0) ? 0.5 : -0.5)) >> 0; //about 4x faster than Math.round()
				}
				if (pt.f) {
					pt.t[pt.p](val);
				} else {
					pt.t[pt.p] = val;
				}
				pt = pt._next;
			}
		}
			
		p._kill = function(lookup) {
			if (lookup[this._propName] != null) {
				this._overwriteProps = [];
			} else {
				var i = this._overwriteProps.length;
				while (--i > -1) {
					if (lookup[this._overwriteProps[i]] != null) {
						this._overwriteProps.splice(i, 1);
					}
				}
			}
			var pt = this._firstPT;
			while (pt) {
				if (lookup[pt.n] != null) {
					if (pt._next) {
						pt._next._prev = pt._prev;
					}
					if (pt._prev) {
						pt._prev._next = pt._next;
						pt._prev = null;
					} else if (this._firstPT === pt) {
						this._firstPT = pt._next;
					}
				}
				pt = pt._next;
			}
			return false;
		}
			
		p._roundProps = function(lookup, value) {
			var pt = this._firstPT;
			while (pt) {
				if (lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ])) { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
					pt.r = value;
				}
				pt = pt._next;
			}
		}
		
		TweenLite._onPluginEvent = function(type, tween) {
			var pt = tween._firstPT, 
				changed;
			if (type === "_onInitAllProps") {
				//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
				var pt2, first, last, next;
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				pt = tween._firstPT = first;
			}
			while (pt) {
				if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {
					changed = true;
				}
				pt = pt._next;
			}
			return changed;
		}
		
		TweenPlugin.activate = function(plugins) {
			var i = plugins.length;
			while (--i > -1) {
				if (plugins[i].API === TweenPlugin.API) {
					TweenLite._plugins[(new plugins[i]())._propName] = plugins[i];
				}
			}
			return true;
		}
		
		
		
		//now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you. 
		if ((a = window._gsQueue)) {
			for (i = 0; i < a.length; i++) {
				a[i]();
			}
			for (p in _classLookup) {
				if (!_classLookup[p].def) {
					console.log("Warning: TweenLite encountered missing dependency: com.greensock."+p);
				}
			}
		}
		
	
})(window);

/*!
 * VERSION: beta 1.2
 * DATE: 2012-05-15
 * JavaScript (ActionScript 3 and 2 also available)
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Copyright (c) 2008-2012, GreenSock. All rights reserved. 
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * corporate Club GreenSock members, the software agreement that was issued with the corporate 
 * membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
	
(window._gsQueue || (window._gsQueue = [])).push( function() {

	_gsRequire("TimelineLite", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {
		
		"use strict";
		
		var TimelineLite = function(vars) {
				SimpleTimeline.call(this, vars);
				this._labels = {};
				this.autoRemoveChildren = (this.vars.autoRemoveChildren == true);
				this.smoothChildTiming = (this.vars.smoothChildTiming == true);
				this._sortChildren = true;
				this._onUpdate = this.vars.onUpdate;
				var i = _paramProps.length,
					j, a;
				while (--i > -1) {
					if ((a = this.vars[_paramProps[i]])) {
						j = a.length;
						while (--j > -1) {
							if (a[j] === "{self}") {
								a = this.vars[_paramProps[i]] = a.concat(); //copy the array in case the user referenced the same array in multiple timelines/tweens (each {self} should be unique)
								a[j] = this;
							}
						}
					}
				}
				if (this.vars.tweens instanceof Array) {
					this.insertMultiple(this.vars.tweens, 0, this.vars.align || "normal", this.vars.stagger || 0);
				}
			},
			_paramProps = ["onStartParams","onUpdateParams","onCompleteParams","onReverseCompleteParams","onRepeatParams"],
			_blankArray = [],
			p = TimelineLite.prototype = new SimpleTimeline();
			
		p.constructor = TimelineLite;
		p.kill()._gc = false;
		
		p.to = function(target, duration, vars, offset, baseTimeOrLabel) {
			return this.insert( new TweenLite(target, duration, vars), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0)); 
		}
		
		p.from = function(target, duration, vars, offset, baseTimeOrLabel) {
			return this.insert( TweenLite.from(target, duration, vars), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
		}
		
		p.fromTo = function(target, duration, fromVars, toVars, offset, baseTimeOrLabel) {
			return this.insert( TweenLite.fromTo(target, duration, fromVars, toVars), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
		}
		
		p.staggerTo = function(targets, duration, vars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			var tl = new TimelineLite({onComplete:onCompleteAll, onCompleteParams:onCompleteAllParams, onCompleteScope:onCompleteAllScope});
			stagger = stagger || 0;
			for (var i = 0; i < targets.length; i++) {
				tl.insert( new TweenLite(targets[i], duration, vars), i * stagger);
			}
			return this.insert(tl, this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
		}
		
		p.staggerFrom = function(targets, duration, vars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			if (vars.immediateRender == null) {
				vars.immediateRender = true;
			}
			vars.runBackwards = true;
			return this.staggerTo(targets, duration, vars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		}
		
		p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			if (fromVars.immediateRender) {
				toVars.immediateRender = true;
			}
			return this.staggerTo(targets, duration, toVars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		}
		
		p.call = function(callback, params, scope, offset, baseTimeOrLabel) {
			return this.insert( TweenLite.delayedCall(0, callback, params, scope), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
		}
		
		p.set = function(target, vars, offset, baseTimeOrLabel) {
			vars.immediateRender = false;
			return this.insert( new TweenLite(target, 0, vars), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
		}
		
		TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
			vars = vars || {};
			if (vars.smoothChildTiming == null) {
				vars.smoothChildTiming = true;
			}
			var tl = new TimelineLite(vars),
				root = tl._timeline;
			if (ignoreDelayedCalls == null) {
				ignoreDelayedCalls = true;
			}
			root._remove(tl, true);
			tl._startTime = 0;
			tl._rawPrevTime = tl._time = tl._totalTime = root._time;
			var tween = root._first, next;
			while (tween) {
				next = tween._next;
				if (!ignoreDelayedCalls || !(tween instanceof TweenLite && tween.target == tween.vars.onComplete)) {
					tl.insert(tween, tween._startTime - tween._delay);
				}
				tween = next;
			}
			root.insert(tl, 0);
			return tl;
		}
		
		p.insert = function(value, timeOrLabel) {
			if (value instanceof Animation) {
				//continue...
			} else if (value instanceof Array) {
				return this.insertMultiple(value, timeOrLabel);
			} else if (typeof(value) === "string") {
				return this.addLabel(value, this._parseTimeOrLabel(timeOrLabel || 0, true));
			} else if (typeof(value) === "function") {
				value = TweenLite.delayedCall(0, value);
			} else {
				throw ("ERROR: Cannot insert() " + value + " into the TimelineLite/Max because it is neither a tween, timeline, function, nor a String.");
				return this;
			}
			
			SimpleTimeline.prototype.insert.call(this, value, this._parseTimeOrLabel(timeOrLabel || 0, true));
			
			//if the timeline has already ended but the inserted tween/timeline extends the duration past the parent timeline's currentTime, we should enable this timeline again so that it renders properly.  
			if (this._gc) if (!this._paused) if (this._startTime + (value._startTime + (value._totalDuration / value._timeScale)) / this._timeScale > this.timeline._time) {
				//in case any of the anscestors had completed but should now be enabled...
				var tl = this;
				while (tl._gc && tl._timeline) {
					tl.totalTime(tl._totalTime, true); //also enables them
					tl = tl._timeline;
				}
			}
			return this;
		}
		
		p.remove = function(value) {
			if (value instanceof Animation) {
				return this._remove(value, false);
			} else if (value instanceof Array) {
				var i = value.length;
				while (--i > -1) {
					this.remove(value[i]);
				}
				return this;
			} else if (typeof(value) === "string") {
				return this.removeLabel(value);
			}
			return this.kill(null, value);
		}
		
		p.append = function(value, offset) {
			return this.insert(value, this.duration() + (offset || 0));
		}
		
		p.insertMultiple = function(tweens, timeOrLabel, align, stagger) {
			align = align || "normal";
			stagger = stagger || 0;
			var i, tween, curTime = this._parseTimeOrLabel(timeOrLabel || 0, true), l = tweens.length;
			for (i = 0; i < l; i++) {
				if ((tween = tweens[i]) instanceof Array) {
					tween = new TimelineLite({tweens:tween});
				}
				this.insert(tween, curTime);
				if (typeof(tween) === "string" || typeof(tween) === "function") {
					//do nothing
				} else if (align === "sequence") {
					curTime = tween._startTime + (tween.totalDuration() / tween._timeScale);
				} else if (align === "start") {
					tween._startTime -= tween.delay();
				}
				curTime += stagger;
			}
			return this._uncache(true);
		}
		
		p.appendMultiple = function(tweens, offset, align, stagger) {
			return this.insertMultiple(tweens, this.duration() + (offset || 0), align, stagger);
		}
		
		p.addLabel = function(label, time) {
			this._labels[label] = time;
			return this;
		}
	
		p.removeLabel = function(label) {
			delete this._labels[label];
			return this;
		}
		
		p.getLabelTime = function(label) {
			return (this._labels[label] != null) ? this._labels[label] : -1;
		}
		
		p._parseTimeOrLabel = function(timeOrLabel, appendIfAbsent) {
			if (timeOrLabel == null) {
				return this.duration();
			} else if (typeof(timeOrLabel) === "string" && isNaN(timeOrLabel)) {
				if (this._labels[timeOrLabel] == null) {
					return (appendIfAbsent) ? (this._labels[timeOrLabel] = this.duration()) : 0;
				}
				return this._labels[timeOrLabel];
			}
			return Number(timeOrLabel);
		}
		
		p.seek = function(timeOrLabel, suppressEvents) {
			return this.totalTime(this._parseTimeOrLabel(timeOrLabel, false), (suppressEvents != false));
		}
		
		p.stop = function() {
			return this.paused(true);
		}
	
		p.gotoAndPlay = function(timeOrLabel, suppressEvents) {
			return SimpleTimeline.prototype.play.call(this, timeOrLabel, suppressEvents);
		}
		
		p.gotoAndStop = function(timeOrLabel, suppressEvents) {
			return this.pause(timeOrLabel, suppressEvents);
		}
		
		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			this._active = !this._paused; 
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(), 
				prevTime = this._time, 
				prevStart = this._startTime, 
				prevTimeScale = this._timeScale, 
				prevPaused = this._paused,
				tween, isComplete, next, callback;
			if (time >= totalDur) {
				this._totalTime = this._time = totalDur;
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					if (this._duration === 0) if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time) { //In order to accommodate zero-duration timelines, we must discern the momentum/direction of time in order to render values properly when the "playhead" goes past 0 in the forward direction or lands directly on it, and also when it moves past it in the backward direction (from a postitive time to a negative time).
						force = true;
					}
				}
				this._rawPrevTime = time;
				time = totalDur + 0.000001; //to avoid occassional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off)

			} else if (time <= 0) {
				this._totalTime = this._time = 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._duration === 0) if (this._rawPrevTime >= 0) { //zero-duration timelines are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						force = true;
					}
				} else if (!this._initted) {
					force = true;
				}
				this._rawPrevTime = time;
				time = -0.000001; //to avoid occassional floating point rounding errors in Flash - sometimes child tweens/timelines were not being rendered at the very beginning (their progress might be 0.000000000001 instead of 0 because when Flash performed _time - tween._startTime, floating point errors would return a value that was SLIGHTLY off)
				
			} else {
				this._totalTime = this._time = this._rawPrevTime = time;
			}
			
			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._initted = true;
			}
			if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0) if (!suppressEvents) {
				this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
			}
			
			if (this._time > prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
						
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, false);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, false);
						}
						
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, false);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, false);
						}
						
					}
					tween = next;
				}
			}
			
			if (this._onUpdate) if (!suppressEvents) {
				this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
			}
			
			if (callback) if (!this._gc) if (prevStart === this._startTime || prevTimeScale != this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents) if (this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}
			
		}
		
		p._hasPausedChild = function() {
			var tween = this._first;
			while (tween) {
				if (tween._paused || ((tween instanceof TimelineLite) && tween._hasPausedChild())) {
					return true;
				}
				tween = tween._next;
			}
			return false;
		}
		
		p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || -9999999999;
			var a = [], 
				tween = this._first, 
				cnt = 0;
			while (tween) {
				if (tween._startTime < ignoreBeforeTime) {
					//do nothing
				} else if (tween instanceof TweenLite) {
					if (tweens != false) {
						a[cnt++] = tween;
					}
				} else {
					if (timelines != false) {
						a[cnt++] = tween;
					}
					if (nested != false) {
						a = a.concat(tween.getChildren(true, tweens, timelines));
						cnt = a.length;
					}
				}
				tween = tween._next;
			}
			return a;
		}
		
		p.getTweensOf = function(target, nested) {
			var tweens = TweenLite.getTweensOf(target), 
				i = tweens.length, 
				a = [], 
				cnt = 0;
			while (--i > -1) {
				if (tweens[i].timeline === this || (nested && this._contains(tweens[i]))) {
					a[cnt++] = tweens[i];
				}
			}
			return a;
		}
		
		p._contains = function(tween) {
			var tl = tween.timeline;
			while (tl) {
				if (tl === this) {
					return true;
				}
				tl = tl.timeline;
			}
			return false;
		}
		
		p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || 0;
			var tween = this._first;
			while (tween) {
				if (tween._startTime >= ignoreBeforeTime) {
					tween._startTime += amount;
				}
				tween = tween._next;
			}
			if (adjustLabels) {
				for (var p in this._labels) {
					if (this._labels[p] >= ignoreBeforeTime) {
						this._labels[p] += amount;
					}
				}
			}
			return this._uncache(true);
		}
		
		p._kill = function(vars, target) {
			if (vars == null) if (target == null) {
				return this._enabled(false, false);
			}
			var tweens = (target == null) ? this.getChildren(true, true, false) : this.getTweensOf(target),
				i = tweens.length, 
				changed = false;
			while (--i > -1) {
				if (tweens[i]._kill(vars, target)) {
					changed = true;
				}
			}
			return changed;
		}
		
		p.clear = function(labels) {
			var tweens = this.getChildren(false, true, true),
				i = tweens.length;
			this._time = this._totalTime = 0;
			while (--i > -1) {
				tweens[i]._enabled(false, false);
			}
			if (labels != false) {
				this._labels = {};
			}
			return this._uncache(true);
		}
		
		p.invalidate = function() {
			var tween = this._first;
			while (tween) {
				tween.invalidate();
				tween = tween._next;
			}
			return this;
		}
		
		p._enabled = function(enabled, ignoreTimeline) {
			if (enabled == this._gc) {
				var tween = this._first;
				while (tween) {
					tween._enabled(enabled, true);
					tween = tween._next;
				}
			}
			return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
		}
		
		p.progress = function(value) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime(this.duration() * value, false);
		}
		
		p.duration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					this.totalDuration(); //just triggers recalculation
				}
				return this._duration;
			}
			if (this.duration() !== 0) if (value !== 0) {
				this.timeScale(this._duration / value);
			}
			return this;
		}
		
		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					var max = 0, 
						tween = this._first, 
						prevStart = -999999999999, 
						next, end;
					while (tween) {
						next = tween._next; //record it here in case the tween changes position in the sequence...
						
						if (tween._startTime < prevStart && this._sortChildren) { //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
							this.insert(tween, tween._startTime - tween._delay);
						} else {
							prevStart = tween._startTime;
						}
						if (tween._startTime < 0) {//children aren't allowed to have negative startTimes, so adjust here if one is found.
							max -= tween._startTime;
							this.shiftChildren(-tween._startTime, false, -9999999999);
						}
						end = tween._startTime + ((!tween._dirty ? tween._totalDuration : tween.totalDuration()) / tween._timeScale);
						if (end > max) {
							max = end;
						}
						
						tween = next;
					}
					this._duration = this._totalDuration = max;
					this._dirty = false;
				}
				return this._totalDuration;
			}
			if (this.totalDuration() !== 0) if (value !== 0) {
				this.timeScale(this._totalDuration / value);
			}
			return this;
		}
		
		p.usesFrames = function() {
			var tl = this._timeline;
			while (tl._timeline) {
				tl = tl._timeline;
			}
			return (tl === Animation._rootFramesTimeline);
		}
		
		p.rawTime = function() {
			return (this._paused || (this._totalTime !== 0 && this._totalTime !== this._totalDuration)) ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale;
		}
		
		return TimelineLite;
		
	}, true);


}); if (window._gsRequire) { _gsQueue.pop()(); }

/*!
 * VERSION: beta 1.2
 * DATE: 2012-05-15
 * JavaScript (ActionScript 3 and 2 also available)
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Copyright (c) 2008-2012, GreenSock. All rights reserved. 
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * corporate Club GreenSock members, the software agreement that was issued with the corporate 
 * membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
	
(window._gsQueue || (window._gsQueue = [])).push( function() {

	_gsRequire("TimelineMax", ["TimelineLite","TweenLite","easing.Ease"], function(TimelineLite, TweenLite, Ease) {
		
		var TimelineMax = function(vars) {
				TimelineLite.call(this, vars);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo == true);
				this._dirty = true;
			},
			_blankArray = [],
			_easeNone = new Ease(null, null, 1, 0),
			_getGlobalPaused = function(tween) {
				while (tween) {
					if (tween._paused) {
						return true;
					}
					tween = tween._timeline;
				}
				return false;
			},
			p = TimelineMax.prototype = new TimelineLite();
			
		p.constructor = TimelineMax;
		p.kill()._gc = false;
		TimelineMax.version = 12.0;
		
		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo == true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return TimelineLite.prototype.invalidate.call(this);
		}
		
		p.addCallback = function(callback, timeOrLabel, params, scope) {
			return this.insert( TweenLite.delayedCall(0, callback, params, scope), timeOrLabel);
		}
		
		p.removeCallback = function(callback, timeOrLabel) {
			if (timeOrLabel == null) {
				this._kill(null, callback);
			} else {
				var a = this.getTweensOf(callback, false),
					i = a.length,
					time = this._parseTimeOrLabel(timeOrLabel, false);
				while (--i > -1) {
					if (a[i]._startTime === time) {
						a[i]._enabled(false, false);
					}
				}
			}
			return this;
		}
		
		p.tweenTo = function(timeOrLabel, vars) {
			vars = vars || {};
			var copy = {ease:_easeNone, overwrite:2, useFrames:this.usesFrames(), immediateRender:false}, p, t;
			for (p in vars) {
				copy[p] = vars[p];
			}
			copy.time = this._parseTimeOrLabel(timeOrLabel, false);
			t = new TweenLite(this, (Math.abs(Number(copy.time) - this._time) / this._timeScale) || 0.001, copy);
			copy.onStart = function() {
				t.target.paused(true);
				if (t.vars.time != t.target.time()) { //don't make the duration zero - if it's supposed to be zero, don't worry because it's already initting the tween and will complete immediately, effectively making the duration zero anyway. If we make duration zero, the tween won't run at all.
					t.duration( Math.abs( t.vars.time - t.target.time()) / t.target._timeScale );
				}
				if (vars.onStart) { //in case the user had an onStart in the vars - we don't want to overwrite it.
					vars.onStart.apply(vars.onStartScope || t, vars.onStartParams || _blankArray);
				}
			}
			return t;
		}
		
		p.tweenFromTo = function(fromTimeOrLabel, toTimeOrLabel, vars) {
			vars = vars || {};
			vars.startAt = {time:this._parseTimeOrLabel(fromTimeOrLabel, false)};
			var t = this.tweenTo(toTimeOrLabel, vars);
			return t.duration((Math.abs( t.vars.time - t.vars.startAt.time) / this._timeScale) || 0.001);
		}
		
		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			this._active = !this._paused;
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(), 
				prevTime = this._time, 
				prevTotalTime = this._totalTime, 
				prevStart = this._startTime, 
				prevTimeScale = this._timeScale, 
				prevRawPrevTime = this._rawPrevTime,
				prevPaused = this._paused, 
				prevCycle = this._cycle, 
				tween, isComplete, next, dur, callback;
			if (time >= totalDur) {
				if (!this._locked) {
					this._totalTime = totalDur;
					this._cycle = this._repeat;
				}
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					if (this._duration === 0) if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time) { //In order to accommodate zero-duration timelines, we must discern the momentum/direction of time in order to render values properly when the "playhead" goes past 0 in the forward direction or lands directly on it, and also when it moves past it in the backward direction (from a postitive time to a negative time).
						force = true;
					}
				}
				this._rawPrevTime = time;
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = 0;
					time = -0.000001; //to avoid occassional floating point rounding errors - sometimes child tweens/timelines were not being rendered at the very beginning (their progress might be 0.000000000001 instead of 0 because when Flash performed _time - tween._startTime, floating point errors would return a value that was SLIGHTLY off)
				} else {
					this._time = this._duration;
					time = this._duration + 0.000001; //to avoid occassional floating point rounding errors in Flash - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when Flash performed _time - tween._startTime, floating point errors would return a value that was SLIGHTLY off)
				}
				
			} else if (time <= 0) {
				if (!this._locked) {
					this._totalTime = this._cycle = 0;
				}
				this._time = 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._duration === 0) if (this._rawPrevTime >= 0) { //zero-duration timelines are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						force = true;
					}
				} else if (!this._initted) {
					force = true;
				}
				this._rawPrevTime = time;
				time = -0.000001; //to avoid occassional floating point rounding errors in Flash - sometimes child tweens/timelines were not being rendered at the very beginning (their progress might be 0.000000000001 instead of 0 because when Flash performed _time - tween._startTime, floating point errors would return a value that was SLIGHTLY off)
				
			} else {
				this._time = this._rawPrevTime = time;
				if (!this._locked) {
					this._totalTime = time;
					if (this._repeat !== 0) {
						var cycleDuration = this._duration + this._repeatDelay;
						this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but Flash reports it as 0.79999999!)
						if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration) {
							this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
						}
						this._time = this._totalTime - (this._cycle * cycleDuration);
						if (this._yoyo) if ((this._cycle & 1) != 0) {
							this._time = this._duration - this._time;
						}
						if (this._time > this._duration) {
							this._time = this._duration;
							time = this._duration + 0.000001; //to avoid occassional floating point rounding errors in Flash - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when Flash performed _time - tween._startTime, floating point errors would return a value that was SLIGHTLY off)
						} else if (this._time < 0) {
							this._time = 0;
							time = -0.000001; //to avoid occassional floating point rounding errors in Flash - sometimes child tweens/timelines were not being rendered at the very beginning (their progress might be 0.000000000001 instead of 0 because when Flash performed _time - tween._startTime, floating point errors would return a value that was SLIGHTLY off)
						} else {
							time = this._time;
						}
					}
				}
			}
			
			if (this._cycle !== prevCycle) if (!this._locked) {
				/*
				make sure children at the end/beginning of the timeline are rendered properly. If, for example, 
				a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
				would get transated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
				could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So 
				we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
				ensure that zero-duration tweens at the very beginning or end of the TimelineMax work. 
				*/
				var backwards = (this._yoyo && (prevCycle & 1) !== 0),
					wrap = (backwards === (this._yoyo && (this._cycle & 1) !== 0)),
					recTotalTime = this._totalTime,
					recCycle = this._cycle,
					recRawPrevTime = this._rawPrevTime,
					recTime = this._time;
				
				this._totalTime = prevCycle * this._duration;
				if (this._cycle < prevCycle) {
					backwards = !backwards;
				} else {
					this._totalTime += this._duration;
				}
				this._time = prevTime; //temporarily revert _time so that render() renders the children in the correct order. Without this, tweens won't rewind correctly. We could arhictect things in a "cleaner" way by splitting out the rendering queue into a separate method but for performance reasons, we kept it all inside this method.
				
				this._rawPrevTime = prevRawPrevTime;
				this._cycle = prevCycle;
				this._locked = true; //prevents changes to totalTime and skips repeat/yoyo behavior when we recursively call render()
				prevTime = (backwards) ? 0 : this._duration;	
				this.render(prevTime, suppressEvents, false);
				if (!suppressEvents) if (!this._gc) {
					if (this.vars.onRepeat) {
						this.vars.onRepeat.apply(this.vars.onRepeatScope || this, vars.onRepeatParams || _blankArray);
					}
				}
				if (wrap) {
					prevTime = (backwards) ? this._duration + 0.000001 : -0.000001;
					this.render(prevTime, true, false);
				}
				this._time = recTime;
				this._totalTime = recTotalTime;
				this._cycle = recCycle;
				this._rawPrevTime = recRawPrevTime;
				this._locked = false;
			}

			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._initted = true;
			}
			
			if (prevTotalTime === 0) if (this.vars.onStart) if (this._totalTime !== 0) if (!suppressEvents) {
				this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
			}
			
			if (this._time > prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
						
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, false);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, false);
						}
						
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, false);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, false);
						}
						
					}
					tween = next;
				}
			}
			
			if (this._onUpdate) if (!suppressEvents) {
				this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
			}
			
			if (callback) if (!this._locked) if (!this._gc) if (prevStart === this._startTime || prevTimeScale != this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents) if (this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}
		}
		
		p.getActive = function(nested, tweens, timelines) {
			if (nested == null) {
				nested = true;
			}
			if (tweens == null) {
				tweens = true;
			}
			if (timelines == null) {
				timelines = false;
			}
			var a = [], 
				all = this.getChildren(nested, tweens, timelines), 
				cnt = 0, 
				l = all.length,
				i, tween;
			for (i = 0; i < l; i++) {
				tween = all[i];
				//note: we cannot just check tween.active because timelines that contain paused children will continue to have "active" set to true even after the playhead passes their end point (technically a timeline can only be considered complete after all of its children have completed too, but paused tweens are...well...just waiting and until they're unpaused we don't know where their end point will be).
				if (!tween._paused) if (tween._timeline._time >= tween._startTime) if (tween._timeline._time < tween._startTime + tween._totalDuration / tween._timeScale) if (!_getGlobalPaused(tween._timeline)) {
					a[cnt++] = tween;
				}
			}
			return a;
		}
		
		
		p.getLabelAfter = function(time) {
			if (!time) if (time !== 0) { //faster than isNan()
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				l = labels.length,
				i;
			for (i = 0; i < l; i++) {
				if (labels[i].time > time) {
					return labels[i].name;
				}
			}
			return null;
		}
		
		p.getLabelBefore = function(time) {
			if (time == null) {
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				i = labels.length;
			while (--i > -1) {
				if (labels[i].time < time) {
					return labels[i].name;
				}
			}
			return null;
		}
		
		p.getLabelsArray = function() {
			var a = [],
				cnt = 0,
				p;
			for (p in this._labels) {
				a[cnt++] = {time:this._labels[p], name:p};
			}
			a.sort(function(a,b) {
				return a.time - b.time;
			});
			return a;
		}
		
		
//---- GETTERS / SETTERS -------------------------------------------------------------------------------------------------------
		
		p.progress = function(value) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * value + (this._cycle * this._duration), false);
		}
		
		p.totalProgress = function(value) {
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, false);
		}
		
		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					TimelineLite.prototype.totalDuration.call(this); //just forces refresh
					//Instead of Infinity, we use 999999999999 so that we can accommodate reverses.
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
				}
				return this._totalDuration;
			}
			return (this._repeat == -1) ? this : this.duration( (value - (this._repeat * this._repeatDelay)) / (this._repeat + 1) );
		}
		
		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat != 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		}
		
		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		}
		
		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		}
		
		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		}
		
		p.currentLabel = function(value) {
			if (!arguments.length) {
				return this.getLabelBefore(this._time + 0.00000001);
			}
			return this.seek(value, true);
		}
		
		return TimelineMax;
		
	}, true);
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * TimelineLite
 * ----------------------------------------------------------------
 */
	_gsRequire("TimelineLite", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {
		
		"use strict";
		
		var TimelineLite = function(vars) {
				SimpleTimeline.call(this, vars);
				this._labels = {};
				this.autoRemoveChildren = (this.vars.autoRemoveChildren == true);
				this.smoothChildTiming = (this.vars.smoothChildTiming == true);
				this._sortChildren = true;
				this._onUpdate = this.vars.onUpdate;
				var i = _paramProps.length,
					j, a;
				while (--i > -1) {
					if ((a = this.vars[_paramProps[i]])) {
						j = a.length;
						while (--j > -1) {
							if (a[j] === "{self}") {
								a = this.vars[_paramProps[i]] = a.concat(); //copy the array in case the user referenced the same array in multiple timelines/tweens (each {self} should be unique)
								a[j] = this;
							}
						}
					}
				}
				if (this.vars.tweens instanceof Array) {
					this.insertMultiple(this.vars.tweens, 0, this.vars.align || "normal", this.vars.stagger || 0);
				}
			},
			_paramProps = ["onStartParams","onUpdateParams","onCompleteParams","onReverseCompleteParams","onRepeatParams"],
			_blankArray = [],
			p = TimelineLite.prototype = new SimpleTimeline();
			
		p.constructor = TimelineLite;
		p.kill()._gc = false;
		
		p.to = function(target, duration, vars, offset, baseTimeOrLabel) {
			return this.insert( new TweenLite(target, duration, vars), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0)); 
		}
		
		p.from = function(target, duration, vars, offset, baseTimeOrLabel) {
			return this.insert( TweenLite.from(target, duration, vars), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
		}
		
		p.fromTo = function(target, duration, fromVars, toVars, offset, baseTimeOrLabel) {
			return this.insert( TweenLite.fromTo(target, duration, fromVars, toVars), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
		}
		
		p.staggerTo = function(targets, duration, vars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			var tl = new TimelineLite({onComplete:onCompleteAll, onCompleteParams:onCompleteAllParams, onCompleteScope:onCompleteAllScope});
			stagger = stagger || 0;
			for (var i = 0; i < targets.length; i++) {
				tl.insert( new TweenLite(targets[i], duration, vars), i * stagger);
			}
			return this.insert(tl, this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
		}
		
		p.staggerFrom = function(targets, duration, vars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			if (vars.immediateRender == null) {
				vars.immediateRender = true;
			}
			vars.runBackwards = true;
			return this.staggerTo(targets, duration, vars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		}
		
		p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			if (fromVars.immediateRender) {
				toVars.immediateRender = true;
			}
			return this.staggerTo(targets, duration, toVars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		}
		
		p.call = function(callback, params, scope, offset, baseTimeOrLabel) {
			return this.insert( TweenLite.delayedCall(0, callback, params, scope), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
		}
		
		p.set = function(target, vars, offset, baseTimeOrLabel) {
			return this.insert( new TweenLite(target, 0, vars), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
		}
		
		TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
			vars = vars || {};
			if (vars.smoothChildTiming == null) {
				vars.smoothChildTiming = true;
			}
			var tl = new TimelineLite(vars),
				root = tl._timeline;
			if (ignoreDelayedCalls == null) {
				ignoreDelayedCalls = true;
			}
			root._remove(tl, true);
			tl._startTime = 0;
			tl._rawPrevTime = tl._time = tl._totalTime = root._time;
			var tween = root._first, next;
			while (tween) {
				next = tween._next;
				if (!ignoreDelayedCalls || !(tween instanceof TweenLite && tween.target == tween.vars.onComplete)) {
					tl.insert(tween, tween._startTime - tween._delay);
				}
				tween = next;
			}
			root.insert(tl, 0);
			return tl;
		}
		
		p.insert = function(value, timeOrLabel) {
			if (value instanceof Animation) {
				//continue...
			} else if (value instanceof Array) {
				return this.insertMultiple(value, timeOrLabel);
			} else if (typeof(value) === "string") {
				return this.addLabel(value, this._parseTimeOrLabel(timeOrLabel || 0, true));
			} else if (typeof(value) === "function") {
				value = TweenLite.delayedCall(0, value);
			} else {
				throw ("ERROR: Cannot insert() " + value + " into the TimelineLite/Max because it is neither a tween, timeline, function, nor a String.");
				return this;
			}
			
			SimpleTimeline.prototype.insert.call(this, value, this._parseTimeOrLabel(timeOrLabel || 0, true));
			
			//if the timeline has already ended but the inserted tween/timeline extends the duration past the parent timeline's currentTime, we should enable this timeline again so that it renders properly.  
			if (this._gc) if (!this._paused) if (this._startTime + (value._startTime + (value._totalDuration / value._timeScale)) / this._timeScale > this.timeline._time) {
				//in case any of the anscestors had completed but should now be enabled...
				var tl = this;
				while (tl._gc && tl._timeline) {
					tl.totalTime(tl._totalTime, true); //also enables them
					tl = tl._timeline;
				}
			}
			return this;
		}
		
		p.remove = function(value) {
			if (value instanceof Animation) {
				return this._remove(value, false);
			} else if (value instanceof Array) {
				var i = value.length;
				while (--i > -1) {
					this.remove(value[i]);
				}
				return this;
			} else if (typeof(value) === "string") {
				return this.removeLabel(value);
			}
			return this.kill(null, value);
		}
		
		p.append = function(value, offset) {
			return this.insert(value, this.duration() + (offset || 0));
		}
		
		p.insertMultiple = function(tweens, timeOrLabel, align, stagger) {
			align = align || "normal";
			stagger = stagger || 0;
			var i, tween, curTime = this._parseTimeOrLabel(timeOrLabel || 0, true), l = tweens.length;
			for (i = 0; i < l; i++) {
				if ((tween = tweens[i]) instanceof Array) {
					tween = new TimelineLite({tweens:tween});
				}
				this.insert(tween, curTime);
				if (typeof(tween) === "string" || typeof(tween) === "function") {
					//do nothing
				} else if (align === "sequence") {
					curTime = tween._startTime + (tween.totalDuration() / tween._timeScale);
				} else if (align === "start") {
					tween._startTime -= tween.delay();
				}
				curTime += stagger;
			}
			return this._uncache(true);
		}
		
		p.appendMultiple = function(tweens, offset, align, stagger) {
			return this.insertMultiple(tweens, this.duration() + (offset || 0), align, stagger);
		}
		
		p.addLabel = function(label, time) {
			this._labels[label] = time;
			return this;
		}
	
		p.removeLabel = function(label) {
			delete this._labels[label];
			return this;
		}
		
		p.getLabelTime = function(label) {
			return (this._labels[label] != null) ? this._labels[label] : -1;
		}
		
		p._parseTimeOrLabel = function(timeOrLabel, appendIfAbsent) {
			if (timeOrLabel == null) {
				return this.duration();
			} else if (typeof(timeOrLabel) === "string") {
				if (this._labels[timeOrLabel] == null) {
					return (appendIfAbsent) ? (this._labels[timeOrLabel] = this.duration()) : 0;
				}
				return this._labels[timeOrLabel];
			}
			return Number(timeOrLabel);
		}
		
		p.seek = function(timeOrLabel, suppressEvents) {
			return this.totalTime(this._parseTimeOrLabel(timeOrLabel, false), (suppressEvents != false));
		}
		
		p.stop = function() {
			return this.paused(true);
		}
	
		p.gotoAndPlay = function(timeOrLabel, suppressEvents) {
			return SimpleTimeline.prototype.play.call(this, timeOrLabel, suppressEvents);
		}
		
		p.gotoAndStop = function(timeOrLabel, suppressEvents) {
			return this.pause(timeOrLabel, suppressEvents);
		}
		
		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			this._active = !this._paused; 
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(), 
				prevTime = this._time, 
				prevStart = this._startTime, 
				prevTimeScale = this._timeScale, 
				prevPaused = this._paused,
				tween, isComplete, next, callback;
			if (time >= totalDur) {
				this._totalTime = this._time = totalDur;
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					if (this._duration === 0) if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time) { //In order to accommodate zero-duration timelines, we must discern the momentum/direction of time in order to render values properly when the "playhead" goes past 0 in the forward direction or lands directly on it, and also when it moves past it in the backward direction (from a postitive time to a negative time).
						force = true;
					}
				}
				this._rawPrevTime = time;
				time = totalDur + 0.000001; //to avoid occassional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off)

			} else if (time <= 0) {
				this._totalTime = this._time = 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._duration === 0) if (this._rawPrevTime >= 0) { //zero-duration timelines are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						force = true;
					}
				} else if (!this._initted) {
					force = true;
				}
				this._rawPrevTime = time;
				time = -0.000001; //to avoid occassional floating point rounding errors in Flash - sometimes child tweens/timelines were not being rendered at the very beginning (their progress might be 0.000000000001 instead of 0 because when Flash performed _time - tween._startTime, floating point errors would return a value that was SLIGHTLY off)
				
			} else {
				this._totalTime = this._time = this._rawPrevTime = time;
			}
			
			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._initted = true;
			}
			if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0) if (!suppressEvents) {
				this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
			}
			
			if (this._time > prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
						
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, false);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, false);
						}
						
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, false);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, false);
						}
						
					}
					tween = next;
				}
			}
			
			if (this._onUpdate) if (!suppressEvents) {
				this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
			}
			
			if (callback) if (!this._gc) if (prevStart === this._startTime || prevTimeScale != this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents) if (this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}
			
		}
		
		p._hasPausedChild = function() {
			var tween = this._first;
			while (tween) {
				if (tween._paused || ((tween instanceof TimelineLite) && tween._hasPausedChild())) {
					return true;
				}
				tween = tween._next;
			}
			return false;
		}
		
		p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || -9999999999;
			var a = [], 
				tween = this._first, 
				cnt = 0;
			while (tween) {
				if (tween._startTime < ignoreBeforeTime) {
					//do nothing
				} else if (tween instanceof TweenLite) {
					if (tweens != false) {
						a[cnt++] = tween;
					}
				} else {
					if (timelines != false) {
						a[cnt++] = tween;
					}
					if (nested != false) {
						a = a.concat(tween.getChildren(true, tweens, timelines));
						cnt = a.length;
					}
				}
				tween = tween._next;
			}
			return a;
		}
		
		p.getTweensOf = function(target, nested) {
			var tweens = TweenLite.getTweensOf(target), 
				i = tweens.length, 
				a = [], 
				cnt = 0;
			while (--i > -1) {
				if (tweens[i].timeline === this || (nested && this._contains(tweens[i]))) {
					a[cnt++] = tweens[i];
				}
			}
			return a;
		}
		
		p._contains = function(tween) {
			var tl = tween.timeline;
			while (tl) {
				if (tl === this) {
					return true;
				}
				tl = tl.timeline;
			}
			return false;
		}
		
		p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || 0;
			var tween = this._first;
			while (tween) {
				if (tween._startTime >= ignoreBeforeTime) {
					tween._startTime += amount;
				}
				tween = tween._next;
			}
			if (adjustLabels) {
				for (var p in this._labels) {
					if (this._labels[p] >= ignoreBeforeTime) {
						this._labels[p] += amount;
					}
				}
			}
			return this._uncache(true);
		}
		
		p._kill = function(vars, target) {
			if (vars == null) if (target == null) {
				return this._enabled(false, false);
			}
			var tweens = (target == null) ? this.getChildren(true, true, false) : this.getTweensOf(target),
				i = tweens.length, 
				changed = false;
			while (--i > -1) {
				if (tweens[i]._kill(vars, target)) {
					changed = true;
				}
			}
			return changed;
		}
		
		p.clear = function(labels) {
			var tweens = this.getChildren(false, true, true),
				i = tweens.length;
			this._time = this._totalTime = 0;
			while (--i > -1) {
				tweens[i]._enabled(false, false);
			}
			if (labels != false) {
				this._labels = {};
			}
			return this._uncache(true);
		}
		
		p.invalidate = function() {
			var tween = this._first;
			while (tween) {
				tween.invalidate();
				tween = tween._next;
			}
			return this;
		}
		
		p._enabled = function(enabled, ignoreTimeline) {
			if (enabled == this._gc) {
				var tween = this._first;
				while (tween) {
					tween._enabled(enabled, true);
					tween = tween._next;
				}
			}
			return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
		}
		
		p.progress = function(value) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime(this.duration() * value, false);
		}
		
		p.duration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					this.totalDuration(); //just triggers recalculation
				}
				return this._duration;
			}
			if (this.duration() !== 0) if (value !== 0) {
				this.timeScale(this._duration / value);
			}
			return this;
		}
		
		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					var max = 0, 
						tween = this._first, 
						prevStart = -999999999999, 
						next, end;
					while (tween) {
						next = tween._next; //record it here in case the tween changes position in the sequence...
						
						if (tween._startTime < prevStart && this._sortChildren) { //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
							this.insert(tween, tween._startTime - tween._delay);
						} else {
							prevStart = tween._startTime;
						}
						if (tween._startTime < 0) {//children aren't allowed to have negative startTimes, so adjust here if one is found.
							max -= tween._startTime;
							this.shiftChildren(-tween._startTime, false, -9999999999);
						}
						end = tween._startTime + ((!tween._dirty ? tween._totalDuration : tween.totalDuration()) / tween._timeScale);
						if (end > max) {
							max = end;
						}
						
						tween = next;
					}
					this._duration = this._totalDuration = max;
					this._dirty = false;
				}
				return this._totalDuration;
			}
			if (this.totalDuration() !== 0) if (value !== 0) {
				this.timeScale(this._totalDuration / value);
			}
			return this;
		}
		
		p.usesFrames = function() {
			var tl = this._timeline;
			while (tl._timeline) {
				tl = tl._timeline;
			}
			return (tl === Animation._rootFramesTimeline);
		}
		
		p.rawTime = function() {
			return (this._paused || (this._totalTime !== 0 && this._totalTime !== this._totalDuration)) ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale;
		}
		
		return TimelineLite;
		
	}, true);


}); if (window._gsRequire) { _gsQueue.pop()(); }

/*!
 * VERSION: beta 1.2
 * DATE: 2012-05-15
 * JavaScript (ActionScript 3 and 2 also available)
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Copyright (c) 2008-2012, GreenSock. All rights reserved. 
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * corporate Club GreenSock members, the software agreement that was issued with the corporate 
 * membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(function(window) {
	
		"use strict";
		var _namespace = function(ns) {
				var a = ns.split("."), 
					p = window, i;
				for (i = 0; i < a.length; i++) {
					p[a[i]] = p = p[a[i]] || {};
				}
				return p;
			},
			gs = _namespace("com.greensock"),
			a, i, e, e2, p,
			_classLookup = {},
			
			//_DepClass is for defining a dependent class. ns = namespace (leaving off "com.greensock." as that's assumed), dep = an array of namespaces that are required, def = the function that will return the class definition (this function will be passed each dependency in order as soon as they arrive), global = if true, the class is added to the global scope (window) or if requirejs is being used, it will tap into that instead.
			_DepClass = function(ns, dep, def, global) {
				this.sc = (_classLookup[ns]) ? _classLookup[ns].sc : []; //subclasses
				_classLookup[ns] = this;
				this.gsClass = null;
				this.def = def;
				var _dep = dep || [],
					_classes = [];
				this.check = function(init) {
					var i = _dep.length, cnt = 0, cur;
					while (--i > -1) {
						if ((cur = _classLookup[_dep[i]] || new _DepClass(_dep[i])).gsClass) {
							_classes[i] = cur.gsClass;
						} else {
							cnt++;
							if (init) {
								cur.sc.push(this);
							}
						}
					}
					if (cnt === 0 && def) {
						var a = ("com.greensock." + ns).split("."),
							n = a.pop(),
							cl = _namespace(a.join("."))[n] = this.gsClass = def.apply(def, _classes);
						
						//exports to multiple environments
						if (global) {
							if (typeof(define) === "function" && define.amd){ //AMD
								define(n, [], function() { return cl; });
							} else if (typeof(module) !== "undefined" && module.exports){ //node
								module.exports = cl;
							} else {
								window[n] = cl;
							}
						}
						
						for (i = 0; i < this.sc.length; i++) {
							this.sc[i].check(false);
						}
						
					}
				};
				this.check(true);
			},
			//a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
			_class = gs._class = function(ns, f, g) {
				new _DepClass(ns, [], function(){ return f; }, g);
				return f;
			};
		
		//Used to create _DepClass instances (which basically registers a class that has dependencies). ns = namespace, dep = dependencies (array), f = initialization function which should return the class, g = global (whether or not the class should be added to the global namespace (or if RequireJS is used, it will be defined as a named module instead)
		window._gsRequire = function(ns, dep, f, g) {
			return new _DepClass(ns, dep, f, g);
		};
		
	

/*
 * ----------------------------------------------------------------
 * Ease
 * ----------------------------------------------------------------
 */
		var _baseParams = [0, 0, 1, 1],
			_blankArray = [],
			Ease = _class("easing.Ease", function(func, extraParams, type, power) {
				this._func = func;
				this._type = type || 0;
				this._power = power || 0;
				this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
			}, true);
		
		p = Ease.prototype;
		p._calcEnd = false;
		p.getRatio = function(p) {
			if (this._func) {
				this._params[0] = p;
				return this._func.apply(null, this._params);
			} else {
				var t = this._type, 
					pw = this._power, 
					r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
				if (pw === 1) {
					r *= r;
				} else if (pw === 2) {
					r *= r * r;
				} else if (pw === 3) {
					r *= r * r * r;
				} else if (pw === 4) {
					r *= r * r * r * r;
				}
				return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
			}
		};
		
		//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
		a = ["Linear","Quad","Cubic","Quart","Quint"];
		i = a.length;
		while(--i > -1) {
			e = _class("easing." + a[i], function(){}, true);
			e2 = _class("easing.Power" + i, function(){}, true);
			e.easeOut = e2.easeOut = new Ease(null, null, 1, i);
			e.easeIn = e2.easeIn = new Ease(null, null, 2, i);
			e.easeInOut = e2.easeInOut = new Ease(null, null, 3, i);
		}
		_class("easing.Strong", gs.easing.Power4, true);
		gs.easing.Linear.easeNone = gs.easing.Linear.easeIn;
	

/*
 * ----------------------------------------------------------------
 * EventDispatcher
 * ----------------------------------------------------------------
 */
		p = _class("events.EventDispatcher", function(target) {
			this._listeners = {};
			this._eventTarget = target || this;
		}).prototype;
		
		p.addEventListener = function(type, callback, scope, useParam, priority) {
			priority = priority || 0;
			var list = this._listeners[type],
				index = 0,
				listener, i;
			if (list == null) {
				this._listeners[type] = list = [];
			}
			i = list.length;
			while (--i > -1) {
				listener = list[i];
				if (listener.c === callback) {
					list.splice(i, 1);
				} else if (index === 0 && listener.pr < priority) {
					index = i + 1;
				}
			}
			list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});
		};
		
		p.removeEventListener = function(type, callback) {
			var list = this._listeners[type];
			if (list) {
				var i = list.length;
				while (--i > -1) {
					if (list[i].c === callback) {
						list.splice(i, 1);
						return;
					}
				}
			}
		};
		
		p.dispatchEvent = function(type) {
			var list = this._listeners[type];
			if (list) {
				var i = list.length, listener,
					t = this._eventTarget;
				while (--i > -1) {
					listener = list[i];
					if (listener.up) {
						listener.c.call(listener.s || t, {type:type, target:t});
					} else {
						listener.c.call(listener.s || t);
					}
				}
			}
		};


/*
 * ----------------------------------------------------------------
 * Ticker
 * ----------------------------------------------------------------
 */
 		var _reqAnimFrame = window.requestAnimationFrame, 
			_cancelAnimFrame = window.cancelAnimationFrame, 
			_getTime = Date.now || function() {return new Date().getTime();};
		
		//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
		a = ["ms","moz","webkit","o"];
		i = a.length;
		while (--i > -1 && !_reqAnimFrame) {
			_reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
			_cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
		}
		if (!_cancelAnimFrame) {
			_cancelAnimFrame = function(id) {
				window.clearTimeout(id);
			}
		}
		
		_class("Ticker", function(fps, useRAF) {
			this.time = 0;
			this.frame = 0;
			var _self = this,
				_startTime = _getTime(),
				_useRAF = (useRAF !== false),
				_fps, _req, _id, _gap, _nextTime;
			
			this.tick = function() {
				_self.time = (_getTime() - _startTime) / 1000;
				if (!_fps || _self.time >= _nextTime) {
					_self.frame++;
					_nextTime = _self.time + _gap - (_self.time - _nextTime) - 0.0005;
					if (_nextTime <= _self.time) {
						_nextTime = _self.time + 0.001;
					}
					_self.dispatchEvent("tick");
				}
				_id = _req( _self.tick );
			};
			
			this.fps = function(value) {
				if (!arguments.length) {
					return _fps;
				}
				_fps = value;
				_gap = 1 / (_fps || 60);
				_nextTime = this.time + _gap;
				_req = (_fps === 0) ? function(f){} : (!_useRAF || !_reqAnimFrame) ? function(f) { return window.setTimeout( f, (((_nextTime - _self.time) * 1000 + 1) >> 0) || 1);	} : _reqAnimFrame;
				_cancelAnimFrame(_id);
				_id = _req( _self.tick );
			};
			
			this.useRAF = function(value) {
				if (!arguments.length) {
					return _useRAF
				}
				_useRAF = value;
				this.fps(_fps);
			};
			
			this.fps(fps);
		});
		
		p = gs.Ticker.prototype = new gs.events.EventDispatcher();
		p.constructor = gs.Ticker;


/*
 * ----------------------------------------------------------------
 * Animation
 * ----------------------------------------------------------------
 */
		var Animation = _class("core.Animation", function(duration, vars) {
				this.vars = vars || {};
				this._duration = this._totalDuration = duration || 0;
				this._delay = Number(this.vars.delay) || 0;
				this._timeScale = 1;
				this._active = (this.vars.immediateRender == true);
				this.data = this.vars.data;
				this._reversed = (this.vars.reversed == true);
				
				if (!_rootTimeline) {
					return;
				}
				
				var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
				tl.insert(this, tl._time);
				
				if (this.vars.paused) {
					this.paused(true);
				}
			}),
			_ticker = Animation.ticker = new gs.Ticker();
		
		p = Animation.prototype;
		p._dirty = p._gc = p._initted = p._paused = false;
		p._totalTime = p._time = 0;
		p._rawPrevTime = -1;
		p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
		p._paused = false;
		
		p.play = function(from, suppressEvents) {
			if (arguments.length) {
				this.seek(from, suppressEvents);
			}
			this.reversed(false);
			return this.paused(false);
		};
		
		p.pause = function(atTime, suppressEvents) {
			if (arguments.length) {
				this.seek(atTime, suppressEvents);
			}
			return this.paused(true);
		};
		
		p.resume = function(from, suppressEvents) {
			if (arguments.length) {
				this.seek(from, suppressEvents);
			}
			return this.paused(false);
		};
		
		p.seek = function(time, suppressEvents) {
			return this.totalTime(Number(time), (suppressEvents != false));
		};
		
		p.restart = function(includeDelay, suppressEvents) {
			this.reversed(false);
			this.paused(false);
			return this.totalTime((includeDelay) ? -this._delay : 0, (suppressEvents != false));
		};
		
		p.reverse = function(from, suppressEvents) {
			if (arguments.length) {
				this.seek((from || this.totalDuration()), suppressEvents);
			}
			this.reversed(true);
			return this.paused(false);
		};
		
		p.render = function() {
			
		};
		
		p.invalidate = function() {
			return this;
		};
		
		p._enabled = function (enabled, ignoreTimeline) {
			this._gc = !enabled; 
			this._active = (enabled && !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration);
			if (ignoreTimeline != true) {
				if (enabled && this.timeline == null) {
					this._timeline.insert(this, this._startTime - this._delay);
				} else if (!enabled && this.timeline != null) {
					this._timeline._remove(this, true);
				}
			}
			return false;
		};
	
		
		p._kill = function(vars, target) {
			return this._enabled(false, false);
		};
		
		p.kill = function(vars, target) {
			this._kill(vars, target);
			return this;
		};
		
		p._uncache = function(includeSelf) {
			var tween = includeSelf ? this : this.timeline;
			while (tween) {
				tween._dirty = true;
				tween = tween.timeline;
			}
			return this;
		};
	
//----Animation getters/setters --------------------------------------------------------
		
		p.eventCallback = function(type, callback, params, scope) {
			if (type == null) {
				return null;
			} else if (type.substr(0,2) === "on") {
				if (arguments.length === 1) {
					return this.vars[type];
				}
				if (callback == null) {
					delete this.vars[type];
				} else {
					this.vars[type] = callback;
					this.vars[type + "Params"] = params;
					this.vars[type + "Scope"] = scope;
					if (params) {
						var i = params.length;
						while (--i > -1) {
							if (params[i] === "{self}") {
								params = this.vars[type + "Params"] = params.concat(); //copying the array avoids situations where the same array is passed to multiple tweens/timelines and {self} doesn't correctly point to each individual instance.
								params[i] = this;
							}
						}
					}
				}
				if (type === "onUpdate") {
					this._onUpdate = callback;
				}
			}
			return this;
		}
		
		p.delay = function(value) {
			if (!arguments.length) {
				return this._delay;
			}
			if (this._timeline.smoothChildTiming) {
				this.startTime( this._startTime + value - this._delay );
			}
			this._delay = value;
			return this;
		};
		
		p.duration = function(value) {
			if (!arguments.length) {
				this._dirty = false;
				return this._duration;
			}
			this._duration = this._totalDuration = value;
			this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration. 
			if (this._timeline.smoothChildTiming) if (this._active) if (value != 0) {
				this.totalTime(this._totalTime * (value / this._duration), true);
			}
			return this;
		};
		
		p.totalDuration = function(value) {
			this._dirty = false;
			return (!arguments.length) ? this._totalDuration : this.duration(value);
		};
		
		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			return this.totalTime(value, suppressEvents);
		};
		
		p.totalTime = function(time, suppressEvents) {
			if (!arguments.length) {
				return this._totalTime;
			}
			if (this._timeline) {
				if (time < 0) {
					time += this.totalDuration();
				}
				if (this._timeline.smoothChildTiming) {
					if (this._dirty) {
						this.totalDuration();
					}
					if (time > this._totalDuration) {
						time = this._totalDuration;
					}
					this._startTime = (this._paused ? this._pauseTime : this._timeline._time) - ((!this._reversed ? time : this._totalDuration - time) / this._timeScale);
					if (!this._timeline._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the anscestors as dirty too, so skip the function call here.
						this._uncache(false);
					}
					if (!this._timeline._active) {
						//in case any of the anscestors had completed but should now be enabled...
						var tl = this._timeline;
						while (tl._timeline) {
							tl.totalTime(tl._totalTime, true);
							tl = tl._timeline;
						}
					}
				}
				if (this._gc) {
					this._enabled(true, false);
				}
				if (this._totalTime != time) {
					this.render(time, suppressEvents, false);
				}
			}
			return this;
		};
		
		p.startTime = function(value) {
			if (!arguments.length) {
				return this._startTime;
			}
			if (value != this._startTime) {
				this._startTime = value;
				if (this.timeline) if (this.timeline._sortChildren) {
					this.timeline.insert(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			return this;
		};
		
		p.timeScale = function(value) {
			if (!arguments.length) {
				return this._timeScale;
			}
			value = value || 0.000001; //can't allow zero because it'll throw the math off
			if (this._timeline && this._timeline.smoothChildTiming) {
				var t = (this._pauseTime || this._pauseTime == 0) ? this._pauseTime : this._timeline._totalTime;
				this._startTime = t - ((t - this._startTime) * this._timeScale / value);
			}
			this._timeScale = value;
			return this._uncache(false);
		};
		
		p.reversed = function(value) {
			if (!arguments.length) {
				return this._reversed;
			}
			if (value != this._reversed) {
				this._reversed = value;
				this.totalTime(this._totalTime, true);
			}
			return this;
		};
		
		p.paused = function(value) {
			if (!arguments.length) {
				return this._paused;
			}
			if (value != this._paused) if (this._timeline) {
				if (!value && this._timeline.smoothChildTiming) {
					this._startTime += this._timeline.rawTime() - this._pauseTime;
					this._uncache(false);
				}
				this._pauseTime = (value) ? this._timeline.rawTime() : null;
				this._paused = value;
				this._active = (!this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration);
			}
			if (this._gc) if (!value) {
				this._enabled(true, false);
			}
			return this;
		};
	

/*
 * ----------------------------------------------------------------
 * SimpleTimeline
 * ----------------------------------------------------------------
 */
		var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
			Animation.call(this, 0, vars);
			this.autoRemoveChildren = this.smoothChildTiming = true;
		});
		
		p = SimpleTimeline.prototype = new Animation();
		p.constructor = SimpleTimeline;
		p.kill()._gc = false;
		p._first = p._last = null;
		p._sortChildren = false;
		
		p.insert = function(tween, time) {
			tween._startTime = Number(time || 0) + tween._delay;
			if (tween._paused) if (this !== tween._timeline) { //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order). 
				tween._pauseTime = tween._startTime + ((this.rawTime() - tween._startTime) / tween._timeScale);
			}
			if (tween.timeline) {
				tween.timeline._remove(tween, true); //removes from existing timeline so that it can be properly added to this one.
			}
			tween.timeline = tween._timeline = this;
			if (tween._gc) {
				tween._enabled(true, true);
			}
			
			var prevTween = this._last;
			if (this._sortChildren) {
				var st = tween._startTime;
				while (prevTween && prevTween._startTime > st) {
					prevTween = prevTween._prev;
				}
			}
			if (prevTween) {
				tween._next = prevTween._next;
				prevTween._next = tween;
			} else {
				tween._next = this._first;
				this._first = tween;
			}
			if (tween._next) {
				tween._next._prev = tween;
			} else {
				this._last = tween;
			}
			tween._prev = prevTween;
			
			if (this._timeline) {
				this._uncache(true);
			}
			return this;
		};
		
		p._remove = function(tween, skipDisable) {
			if (tween.timeline === this) {
				if (!skipDisable) {
					tween._enabled(false, true);
				}
				tween.timeline = null;
				
				if (tween._prev) {
					tween._prev._next = tween._next;
				} else if (this._first === tween) {
					this._first = tween._next;
				}
				if (tween._next) {
					tween._next._prev = tween._prev;
				} else if (this._last === tween) {
					this._last = tween._prev;
				}
				
				if (this._timeline) {
					this._uncache(true);
				}
			}
			return this;
		};
		
		p.render = function(time, suppressEvents, force) {
			var tween = this._first, 
				next;
			this._totalTime = this._time = this._rawPrevTime = time;
			while (tween) {
				next = tween._next; //record it here because the value could change after rendering...
				if (tween._active || (time >= tween._startTime && !tween._paused)) {
					if (!tween._reversed) {
						tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, false);
					} else {
						tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, false);
					}
				}
				tween = next;
			}
		};
				
		p.rawTime = function() {
			return this._totalTime;			
		};
	
	
/*
 * ----------------------------------------------------------------
 * TweenLite
 * ----------------------------------------------------------------
 */
		var TweenLite = _class("TweenLite", function(target, duration, vars) {
				Animation.call(this, duration, vars);
				
				if (target == null) {
					throw "Cannot tween an undefined reference.";
				}
				this.target = target;		
				
				this._overwrite = (this.vars.overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof(this.vars.overwrite) === "number") ? this.vars.overwrite >> 0 : _overwriteLookup[this.vars.overwrite];
				
				var jq, i, targ;
				if ((target instanceof Array || target.jquery) && typeof(target[0]) === "object") { 
					this._targets = target.slice(0); //works for both jQuery and Array instances
					this._propLookup = [];
					this._siblings = [];
					for (i = 0; i < this._targets.length; i++) {
						targ = this._targets[i];
						//in case the user is passing in an array of jQuery objects, for example, we need to check one more level and pull things out if necessary...
						if (targ.jquery) { 
							this._targets.splice(i--, 1);
							this._targets = this._targets.concat(targ.constructor.makeArray(targ));
							continue;
						}
						this._siblings[i] = _register(targ, this, false);
						if (this._overwrite === 1) if (this._siblings[i].length > 1) {
							_applyOverwrite(targ, this, null, 1, this._siblings[i]);
						}
					}
					
				} else {
					this._propLookup = {};
					this._siblings = _register(target, this, false);
					if (this._overwrite === 1) if (this._siblings.length > 1) {
						_applyOverwrite(target, this, null, 1, this._siblings);
					}
				}
				
				if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender != false)) {
					this.render(0, false, true);
				}
			}, true);
	
		p = TweenLite.prototype = new Animation();
		p.constructor = TweenLite;
		p.kill()._gc = false;
	
//----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------
	
		p.ratio = 0;
		p._firstPT = p._targets = p._overwrittenProps = null;
		p._notifyPluginsOfEnabled = false;
		
		TweenLite.version = 12;
		TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
		TweenLite.defaultOverwrite = "auto";
		TweenLite.ticker = _ticker;
		
		var _plugins = TweenLite._plugins = {},
			_tweenLookup = {}, 
			_tweenLookupNum = 0,
			_reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, orientToBezier:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1},
			_overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},
			_rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(), 
			_rootTimeline = Animation._rootTimeline = new SimpleTimeline();
			
		_rootTimeline._startTime = _ticker.time;
		_rootFramesTimeline._startTime = _ticker.frame;
		_rootTimeline._active = _rootFramesTimeline._active = true;
		
		Animation._updateRoot = function() {
				_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
				_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
				if (!(_ticker.frame % 120)) { //dump garbage every 120 frames...
					var i, a, p;
					for (p in _tweenLookup) {
						a = _tweenLookup[p].tweens;
						i = a.length;
						while (--i > -1) {
							if (a[i]._gc) {
								a.splice(i, 1);
							}
						}
						if (a.length === 0) {
							delete _tweenLookup[p];
						}
					}
				}
			};
		
		_ticker.addEventListener("tick", Animation._updateRoot);
		
		var _register = function(target, tween, scrub) {
				var id = target._gsTweenID, a, i;
				if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
					_tweenLookup[id] = {target:target, tweens:[]};
				}
				if (tween) {
					a = _tweenLookup[id].tweens;
					a[(i = a.length)] = tween;
					if (scrub) {
						while (--i > -1) {
							if (a[i] === tween) {
								a.splice(i, 1);
							}
						}
					}
				}
				return _tweenLookup[id].tweens;
			},
			
			_applyOverwrite = function(target, tween, props, mode, siblings) {
				var i, changed, curTween;
				if (mode === 1 || mode >= 4) {
					var l = siblings.length;
					for (i = 0; i < l; i++) {
						if ((curTween = siblings[i]) !== tween) {
							if (!curTween._gc) if (curTween._enabled(false, false)) {
								changed = true;
							}
						} else if (mode === 5) {
							break;
						}
					}
					return changed;
				}
				//NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
				var startTime = tween._startTime + 0.0000000001, 
					overlaps = [], 
					oCount = 0, 
					globalStart;
				i = siblings.length;
				while (--i > -1) {
					if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
						//ignore
					} else if (curTween._timeline !== tween._timeline) {
						globalStart = globalStart || _checkOverlap(tween, 0);
						if (_checkOverlap(curTween, globalStart) === 0) {
							overlaps[oCount++] = curTween;
						}
					} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale + 0.0000000001 > startTime) if (!((tween._duration === 0 || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
						overlaps[oCount++] = curTween;
					}
				}
				
				i = oCount;
				while (--i > -1) {
					curTween = overlaps[i];
					if (mode === 2) if (curTween._kill(props, target)) {
						changed = true;
					}
					if (mode !== 2 || (!curTween._firstPT && curTween._initted)) { 
						if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.
							changed = true;
						}
					}
				}
				return changed;
			},
			
			_checkOverlap = function(tween, reference) {
				var tl = tween._timeline, 
					ts = tl._timeScale, 
					t = tween._startTime;
				while (tl._timeline) {
					t += tl._startTime;
					ts *= tl._timeScale;
					if (tl._paused) {
						return -100;
					}
					tl = tl._timeline;
				}
				t /= ts;
				return (t > reference) ? t - reference : (!tween._initted && t - reference < 0.0000000002) ? 0.0000000001 : ((t = t + tween.totalDuration() / tween._timeScale / ts + 0.0000000001) > reference) ? 0 : t - reference - 0.0000000001;
			};

	
//---- TweenLite instance methods -----------------------------------------------------------------------------

		p._init = function() {
			if (this.vars.startAt) {
				this.vars.startAt.overwrite = 0;
				this.vars.startAt.immediateRender = true;
				TweenLite.to(this.target, 0, this.vars.startAt);
			}
			var i, initPlugins, pt;
			if (this.vars.ease instanceof Ease) {
				this._ease = (this.vars.easeParams instanceof Array) ? this.vars.ease.config.apply(this.vars.ease, this.vars.easeParams) : this.vars.ease;
			} else if (typeof(this.vars.ease) === "function") {
				this._ease = new Ease(this.vars.ease, this.vars.easeParams);
			} else {
				this._ease = TweenLite.defaultEase;
			}
			this._easeType = this._ease._type;
			this._easePower = this._ease._power;
			this._firstPT = null;
			
			if (this._targets) {
				i = this._targets.length;
				while (--i > -1) {
					if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (this._overwrittenProps ? this._overwrittenProps[i] : null)) ) {
						initPlugins = true;
					}
				}
			} else {
				initPlugins = this._initProps(this.target, this._propLookup, this._siblings, this._overwrittenProps);
			}
			
			if (initPlugins) {
				TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
			}
			if (this._overwrittenProps) if (this._firstPT == null) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
				this._enabled(false, false);
			}
			if (this.vars.runBackwards) {
				pt = this._firstPT;
				while (pt) {
					pt.s += pt.c;
					pt.c = -pt.c;
					pt = pt._next;
				}
			}
			this._onUpdate = this.vars.onUpdate;
			this._initted = true;
		};
		
		p._initProps = function(target, propLookup, siblings, overwrittenProps) {
			var p, i, initPlugins, plugin, a;
			if (target == null) {
				return false;
			}
			for (p in this.vars) {
				if (_reservedProps[p]) { 
					if (p === "onStartParams" || p === "onUpdateParams" || p === "onCompleteParams" || p === "onReverseCompleteParams" || p === "onRepeatParams") if ((a = this.vars[p])) {
						i = a.length;
						while (--i > -1) {
							if (a[i] === "{self}") {
								a = this.vars[p] = a.concat(); //copy the array in case the user referenced the same array in multiple tweens/timelines (each {self} should be unique)
								a[i] = this;
							}
						}
					}
					
				} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this)) {
					
					//t - target 		[object]
					//p - property 		[string]
					//s - start			[number]
					//c - change		[number]
					//f - isFunction	[boolean]
					//n - name			[string]
					//pg - isPlugin 	[boolean]
					//pr - priority		[number]
					this._firstPT = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:true, n:p, pg:true, pr:plugin._priority};
					i = plugin._overwriteProps.length;
					while (--i > -1) {
						propLookup[plugin._overwriteProps[i]] = this._firstPT;
					}
					if (plugin._priority || plugin._onInitAllProps) {
						initPlugins = true;
					}
					if (plugin._onDisable || plugin._onEnable) {
						this._notifyPluginsOfEnabled = true;
					}
					
				} else {
					this._firstPT = propLookup[p] = {_next:this._firstPT, t:target, p:p, f:(typeof(target[p]) === "function"), n:p, pg:false, pr:0};
					this._firstPT.s = (!this._firstPT.f) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
					this._firstPT.c = (typeof(this.vars[p]) === "number") ? this.vars[p] - this._firstPT.s : (typeof(this.vars[p]) === "string") ? parseFloat(this.vars[p].split("=").join("")) : 0;
				}
				if (this._firstPT) if (this._firstPT._next) {
					this._firstPT._next._prev = this._firstPT;
				}
			}
			
			if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
				return this._initProps(target, propLookup, siblings, overwrittenProps);
			}
			if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
				this._kill(propLookup, target);
				return this._initProps(target, propLookup, siblings, overwrittenProps);
			}
			return initPlugins;
		};
		
		p.render = function(time, suppressEvents, force) {
			var prevTime = this._time,
				isComplete, callback, pt;
			if (time >= this._duration) {
				this._totalTime = this._time = this._duration;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				if (!this._reversed) {
					isComplete = true;
					callback = "onComplete";
				}
				if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time) {
						force = true;
					}
					this._rawPrevTime = time;
				}
				
			} else if (time <= 0) {
				this._totalTime = this._time = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (this._rawPrevTime >= 0) {
							force = true;
						}
						this._rawPrevTime = time;
					}
				} else if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;
				}
				
			} else {
				this._totalTime = this._time = time;
				
				if (this._easeType) {
					var r = time / this._duration, type = this._easeType, pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}
					
					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (time / this._duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}
					
				} else {
					this.ratio = this._ease.getRatio(time / this._duration);
				}
				
			}
			
			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._init();
				if (!isComplete && this._time) { //_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
					this.ratio = this._ease.getRatio(this._time / this._duration);
				}
			}
			
			if (!this._active) if (!this._paused) {
				this._active = true;  //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0 || this._duration === 0) if (!suppressEvents) {
				this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
			}
			
			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}
			
			
			if (this._onUpdate) if (!suppressEvents) {
				this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
			}
			
			if (callback) if (!this._gc) { //check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents) if (this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}
			
		};
		
		p._kill = function(vars, target) {
			if (vars === "all") {
				vars = null;
			}
			if (vars == null) if (target == null || target == this.target) {
				return this._enabled(false, false);
			}
			target = target || this._targets || this.target;
			var i, overwrittenProps, p, pt, propLookup, changed, killProps, record;
			if ((target instanceof Array || target.jquery) && typeof(target[0]) === "object") { 
				i = target.length;
				while (--i > -1) {
					if (this._kill(vars, target[i])) {
						changed = true;
					}
				}
			} else {
				if (this._targets) {
					i = this._targets.length;
					while (--i > -1) {
						if (target === this._targets[i]) {
							propLookup = this._propLookup[i] || {};
							this._overwrittenProps = this._overwrittenProps || [];
							overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
							break;
						}
					}
				} else if (target !== this.target) {
					return false;
				} else {
					propLookup = this._propLookup;
					overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
				}

				if (propLookup) {
					killProps = vars || propLookup;
					record = (vars != overwrittenProps && overwrittenProps != "all" && vars != propLookup && (vars == null || vars._tempKill != true)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
					for (p in killProps) {
						if ((pt = propLookup[p])) {
							if (pt.pg && pt.t._kill(killProps)) {
								changed = true; //some plugins need to be notified so they can perform cleanup tasks first
							}
							if (!pt.pg || pt.t._overwriteProps.length === 0) {
								if (pt._prev) {
									pt._prev._next = pt._next;
								} else if (pt === this._firstPT) {
									this._firstPT = pt._next;
								}
								if (pt._next) {
									pt._next._prev = pt._prev;
								}
								pt._next = pt._prev = null;
							}
							delete propLookup[p];
						}
						if (record) { 
							overwrittenProps[p] = 1;
						}
					}
				}
			}
			return changed;
		};
	
		p.invalidate = function() {
			if (this._notifyPluginsOfEnabled) {
				TweenLite._onPluginEvent("_onDisable", this);
			}
			this._firstPT = null;
			this._overwrittenProps = null;
			this._onUpdate = null;
			this._initted = this._active = this._notifyPluginsOfEnabled = false;
			this._propLookup = (this._targets) ? {} : [];
			return this;
		};
		
		p._enabled = function(enabled, ignoreTimeline) {
			if (enabled && this._gc) {
				if (this._targets) {
					var i = this._targets.length;
					while (--i > -1) {
						this._siblings[i] = _register(this._targets[i], this, true);
					}
				} else {
					this._siblings = _register(this.target, this, true);
				}
			}
			Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
			if (this._notifyPluginsOfEnabled) if (this._firstPT) {
				return TweenLite._onPluginEvent(((enabled) ? "_onEnable" : "_onDisable"), this);
			}
			return false;
		};
	
	
//----TweenLite static methods -----------------------------------------------------
		
		TweenLite.to = function(target, duration, vars) {
			return new TweenLite(target, duration, vars);
		};
		
		TweenLite.from = function(target, duration, vars) {
			vars.runBackwards = true;
			if (vars.immediateRender != false) {
				vars.immediateRender = true;
			}
			return new TweenLite(target, duration, vars);
		};
		
		TweenLite.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			if (fromVars.immediateRender) {
				toVars.immediateRender = true;
			}
			return new TweenLite(target, duration, toVars);
		};
		
		TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, onCompleteScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, onReverseCompleteScope:scope, immediateRender:false, useFrames:useFrames, overwrite:0});
		};
		
		TweenLite.set = function(target, vars) {
			return new TweenLite(target, 0, vars);
		};
		
		TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, vars) {
			var a = TweenLite.getTweensOf(target), 
				i = a.length;
			while (--i > -1) {
				a[i]._kill(vars, target);
			}
		};
		
		TweenLite.getTweensOf = function(target) {
			if (target == null) { return; }
			var i, a, j, t;
			if ((target instanceof Array || target.jquery) && typeof(target[0]) === "object") { 
				i = target.length;
				a = [];
				while (--i > -1) {
					a = a.concat(TweenLite.getTweensOf(target[i]));
				}
				i = a.length;
				//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
				while (--i > -1) {
					t = a[i];
					j = i;
					while (--j > -1) {
						if (t === a[j]) {
							a.splice(i, 1);
						}
					}
				}
			} else {
				a = _register(target).concat();
				i = a.length;
				while (--i > -1) {
					if (a[i]._gc) {
						a.splice(i, 1);
					}
				}
			}
			return a;
		};
		
		
		
/*
 * ----------------------------------------------------------------
 * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another <script> call before loading plugins which is easy to forget)
 * ----------------------------------------------------------------
 */
		var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
					this._overwriteProps = (props || "").split(",");
					this._propName = this._overwriteProps[0];
					this._priority = priority || 0;
				}, true);
		
		p = TweenPlugin.prototype;
		TweenPlugin.version = 12;
		TweenPlugin.API = 2;
		p._firstPT = null;		
			
		p._addTween = function(target, prop, start, end, overwriteProp, round) {
			if (end != null && (c = (typeof(end) === "number" || end.indexOf("=") === -1) ? Number(end) - start : Number(end.split("=").join("")))) {
				this._firstPT = {_next:this._firstPT, t:target, p:prop, s:start, c:c, f:(typeof(target[prop]) == "function"), n:overwriteProp || prop, r:round};
				if (this._firstPT._next) {
					this._firstPT._next._prev = this._firstPT;
				}
			}
		}
			
		p.setRatio = function(v) {
			var pt = this._firstPT, 
				val;
			while (pt) {
				val = pt.c * v + pt.s;
				if (pt.r) {
					val = (val + ((val > 0) ? 0.5 : -0.5)) >> 0; //about 4x faster than Math.round()
				}
				if (pt.f) {
					pt.t[pt.p](val);
				} else {
					pt.t[pt.p] = val;
				}
				pt = pt._next;
			}
		}
			
		p._kill = function(lookup) {
			if (lookup[this._propName] != null) {
				this._overwriteProps = [];
			} else {
				var i = this._overwriteProps.length;
				while (--i > -1) {
					if (lookup[this._overwriteProps[i]] != null) {
						this._overwriteProps.splice(i, 1);
					}
				}
			}
			var pt = this._firstPT;
			while (pt) {
				if (lookup[pt.n] != null) {
					if (pt._next) {
						pt._next._prev = pt._prev;
					}
					if (pt._prev) {
						pt._prev._next = pt._next;
						pt._prev = null;
					} else if (this._firstPT === pt) {
						this._firstPT = pt._next;
					}
				}
				pt = pt._next;
			}
			return false;
		}
			
		p._roundProps = function(lookup, value) {
			var pt = this._firstPT;
			while (pt) {
				if (lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ])) { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
					pt.r = value;
				}
				pt = pt._next;
			}
		}
		
		TweenLite._onPluginEvent = function(type, tween) {
			var pt = tween._firstPT, 
				changed;
			if (type === "_onInitAllProps") {
				//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
				var pt2, first, last, next;
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				pt = tween._firstPT = first;
			}
			while (pt) {
				if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {
					changed = true;
				}
				pt = pt._next;
			}
			return changed;
		}
		
		TweenPlugin.activate = function(plugins) {
			var i = plugins.length;
			while (--i > -1) {
				if (plugins[i].API === TweenPlugin.API) {
					TweenLite._plugins[(new plugins[i]())._propName] = plugins[i];
				}
			}
			return true;
		}
		
		
		
		//now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you. 
		if ((a = window._gsQueue)) {
			for (i = 0; i < a.length; i++) {
				a[i]();
			}
			for (p in _classLookup) {
				if (!_classLookup[p].def) {
					console.log("Warning: TweenLite encountered missing dependency: com.greensock."+p);
				}
			}
		}
		
	
})(window);

/*!
 * VERSION: beta 1.2
 * DATE: 2012-05-15
 * JavaScript (ActionScript 3 and 2 also available)
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Copyright (c) 2008-2012, GreenSock. All rights reserved. 
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * corporate Club GreenSock members, the software agreement that was issued with the corporate 
 * membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue || (window._gsQueue = [])).push( function() {

	_gsRequire("easing.Back", ["easing.Ease"], function(Ease) {
		
		var gs = window.com.greensock, 
			_class = gs._class, 
			_create = function(n, f) {
				var c = _class("easing." + n, function(){}, true), 
					p = c.prototype = new Ease();
				p.constructor = c;
				p.getRatio = f;
				return c;
			},
			
			//BACK
			_createBack = function(n, f) {
				var c = _class("easing." + n, function(overshoot) {
						this._p1 = (overshoot || overshoot === 0) ? overshoot : 1.70158;
						this._p2 = this._p1 * 1.525;
					}, true), 
					p = c.prototype = new Ease();
				p.constructor = c;
				p.getRatio = f;
				p.config = function(overshoot) {
					return new c(overshoot);
				};
				return c;
			}, 
			BackOut = _createBack("BackOut", function(p) {
				return ((p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1);
			}), 
			BackIn = _createBack("BackIn", function(p) {
				return p * p * ((this._p1 + 1) * p - this._p1);
			}), 
			BackInOut = _createBack("BackInOut", function(p) {
				return ((p *= 2) < 1) ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
			}),  
			
			//BOUNCE
			BounceOut = _create("BounceOut", function(p) {
				if (p < 1 / 2.75) {
					return 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					return 7.5625 * (p -= 1.5 / 2.75) * p + .75;
				} else if (p < 2.5 / 2.75) {
					return 7.5625 * (p -= 2.25 / 2.75) * p + .9375;
				} else {
					return 7.5625 * (p -= 2.625 / 2.75) * p + .984375;
				}
			}), 
			BounceIn = _create("BounceIn", function(p) {
				if ((p = 1 - p) < 1 / 2.75) {
					return 1 - (7.5625 * p * p);
				} else if (p < 2 / 2.75) {
					return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + .75);
				} else if (p < 2.5 / 2.75) {
					return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + .9375);
				} else {
					return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + .984375);
				}
			}), 
			BounceInOut = _create("BounceInOut", function(p) {
				var invert = (p < 0.5);
				if (invert) {
					p = 1 - (p * 2);
				} else {
					p = (p * 2) - 1;
				}
				if (p < 1 / 2.75) {
					p = 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					p = 7.5625 * (p -= 1.5 / 2.75) * p + .75;
				} else if (p < 2.5 / 2.75) {
					p = 7.5625 * (p -= 2.25 / 2.75) * p + .9375;
				} else {
					p = 7.5625 * (p -= 2.625 / 2.75) * p + .984375;
				}
				return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
			}),
			
			//CIRC
			CircOut = _create("CircOut", function(p) {
				return Math.sqrt(1 - (p = p - 1) * p);
			}),
			CircIn = _create("CircIn", function(p) {
				return -(Math.sqrt(1 - (p * p)) - 1);
			}),
			CircInOut = _create("CircInOut", function(p) {
				return ((p*=2) < 1) ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
			}),
			
			//ELASTIC
			_2PI = Math.PI * 2,
			_createElastic = function(n, f, def) {
				var c = _class("easing." + n, function(amplitude, period) {
						amplitude = amplitude || 0;
						this._p1 = (!amplitude || amplitude < 1) ? 1 : amplitude;
						this._p2 = period || def;
						this._p3 = this._p2 / _2PI * Math.asin(1 / this._p1);
					}, true), 
					p = c.prototype = new Ease();
				p.constructor = c;
				p.getRatio = f;
				p.config = function(amplitude, period) {
					return new c(amplitude, period);
				};
				return c;
			}, 
			ElasticOut = _createElastic("ElasticOut", function(p) {
				return this._p1 * Math.pow(2, -10 * p) * Math.sin( (p - this._p3) * _2PI / this._p2 ) + 1;
			}, 0.3), 
			ElasticIn = _createElastic("ElasticIn", function(p) {
				return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * _2PI / this._p2 ));
			}, 0.3), 
			ElasticInOut = _createElastic("ElasticInOut", function(p) {
				return ((p *= 2) < 1) ? -.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * _2PI / this._p2)) : this._p1 * Math.pow(2, -10 *(p -= 1)) * Math.sin( (p - this._p3) * _2PI / this._p2 ) *.5 + 1;
			}, 0.45),
			
			//Expo
			ExpoOut = _create("ExpoOut", function(p) {
				return 1 - Math.pow(2, -10 * p);
			}),
			ExpoIn = _create("ExpoIn", function(p) {
				return Math.pow(2, 10 * (p - 1)) - 0.001;
			}),
			ExpoInOut = _create("ExpoInOut", function(p) {
				return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
			}), 
			
			//Sine
			_HALF_PI = Math.PI / 2,
			SineOut = _create("SineOut", function(p) {
				return Math.sin(p * _HALF_PI);
			}),
			SineIn = _create("SineIn", function(p) {
				return -Math.cos(p * _HALF_PI) + 1;
			}),
			SineInOut = _create("SineInOut", function(p) {
				return -0.5 * (Math.cos(Math.PI * p) - 1);
			}),
			
			//SlowMo
			SlowMo = _class("easing.SlowMo", function(linearRatio, power, yoyoMode) {
				power = (power || power === 0) ? power : 0.7;
				if (linearRatio == null) {
					linearRatio = 0.7;
				} else if (linearRatio > 1) {
					linearRatio = 1;
				}
				this._p = (linearRatio != 1) ? power : 0;
				this._p1 = (1 - linearRatio) / 2;
				this._p2 = linearRatio;
				this._p3 = this._p1 + this._p2;
				this._calcEnd = (yoyoMode === true);
			}, true),
			p = SlowMo.prototype = new Ease();
			
		p.constructor = SlowMo;
		p.getRatio = function(p) {
			var r = p + (0.5 - p) * this._p;
			if (p < this._p1) {
				return this._calcEnd ? 1 - ((p = 1 - (p / this._p1)) * p) : r - ((p = 1 - (p / this._p1)) * p * p * p * r);
			} else if (p > this._p3) {
				return this._calcEnd ? 1 - (p = (p - this._p3) / this._p1) * p : r + ((p - r) * (p = (p - this._p3) / this._p1) * p * p * p);
			}
			return this._calcEnd ? 1 : r;
		};
		SlowMo.ease = new SlowMo(0.7, 0.7);
		
		p.config = function(linearRatio, power, yoyoMode) {
			return new SlowMo(linearRatio, power, yoyoMode);
		};
		
		
		_class("easing.Bounce", {
				easeOut:new BounceOut(),
				easeIn:new BounceIn(),
				easeInOut:new BounceInOut()
			}, true);
		
		_class("easing.Circ", {
				easeOut:new CircOut(),
				easeIn:new CircIn(),
				easeInOut:new CircInOut()
			}, true);
		
		_class("easing.Elastic", {
				easeOut:new ElasticOut(),
				easeIn:new ElasticIn(),
				easeInOut:new ElasticInOut()
			}, true);
			
		_class("easing.Expo", {
				easeOut:new ExpoOut(),
				easeIn:new ExpoIn(),
				easeInOut:new ExpoInOut()
			}, true);
			
		_class("easing.Sine", {
				easeOut:new SineOut(),
				easeIn:new SineIn(),
				easeInOut:new SineInOut()
			}, true);
		
		
		return {
			easeOut:new BackOut(),
			easeIn:new BackIn(),
			easeInOut:new BackInOut()
		};
		
	}, true);

}); if (window._gsRequire) { _gsQueue.pop()(); }


window.app = window.app || {};


define(['backbone', 'messageModel', 'moment'], function (Backbone, MessageModel, moment) {

    return Backbone.Collection.extend({

      model: MessageModel, 

      url: function(){
        var host = 'http://pompom.sonar.es/';
//        if (location.port === '') host = ''
        var url =  host + 'php/getMessages.php?page='+ this.pagination.page +'&npp=' + this.pagination.npp + '&time=' + (new Date().getTime())
        if (this.searchTerm) 
          url = url + '&q=' + this.searchTerm
        return url;
      },

      initialize: function(options){
        this.pagination = { page: 1, npp: 3 };
      },

      comparator: function (model) {
        return - moment(model.get('date')).unix();
      }, 

      filterByString: function (string) {
        var results = _.filter(this.models, function (model) {
        var message = model.get('message').toLowerCase();
        var user = model.get('user');
        
        if (message.indexOf(string) != -1 || user.indexOf(string) != -1) return true;
        return false;
        });

        return results;
      },

      parse: function(resp, xhr) {
        this.pagination = resp.pagination
        this.searchTerm = null;
        return resp.messages;
      }, 

      goToPage: function (page, options) {
        this.pagination.page = page;
        this.fetch(options);
      }, 

      search: function (string, options) {
        this.searchTerm = string;
        this.fetch(options);
      }

    });
  }
);


window.app = window.app || {};


define(['backbone'], function (Backbone) {
  
  return Backbone.Model.extend({

    defaults: {
      id: 0, 
      message: "", // This is a test, hello gello This is a test, hello gello This is a test, hello gello This is a test, hello gello This is a test, hello gello
      user: "", 
      email: "", 
      date: undefined, 
      published: 0
    }

  });
  }
);




window.app = window.app || {};


define(['underscore'], function (_) {
  
  _.templateSettings = { interpolate : /\{\{(.+?)\}\}/g }; // use templates as Moustache

  app.tpl = {
    templates: {}, // Hash of preloaded templates for the app

    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment:
    // All the template files should be concatenated in a single file.
    loadTemplates: function(names, callback) {
      var that = this;

      var loadTemplate = function(index) {
        var name = names[index];
        // console.log('Loading template: ' + name);
        $.get('templates/' + name + '.html', function(data) {
          that.templates[name] = data;
          index++;
          if (index < names.length) {
            loadTemplate(index);
          } else {
            callback();
          }
        });
      }

      loadTemplate(0);
    },

    // Get template by name from hash of preloaded templates
    get: function(name) {
      return this.templates[name];
    }
  }

  return app.tpl;
});




// Based on jQuery Sequence Animator by Calvin Lai, edited by Aer Studio

/* jQuery Sequence Animator
 * Animates a sequence of PNG files with some limited options.
 * @author Calvin Lai
 * @email callai@gmail.com 
 * @copyright 2012 Calvin Lai
*/

(function($){
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  // requestAnimationFrame polyfill by Erik Möller
  // fixes from Paul Irish and Tino Zijdel
  var lastTimeCaptured = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                               || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTimeCaptured));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
          timeToCall);
        lastTimeCaptured = currTime + timeToCall;
        return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
  }

  //Animates PNG sequences.
  var Sequence = window.Sequence = function (el, options) {    
    //Defaultsuence
    this.defaults = {
      name: undefined,       
      fps: 12, 
      repeat: true, 
      autoInit: true, 
      preload: false, 
      imageClassName: null, 
      innerLoops: 0
    };

    this.opts = $.extend({}, this.defaults, options);
    
    this.$el = $(el);
    this.isAnimated = false;
    this.lastTime = 0;
    this.totalFrames = 0;
    this.currentFrame = 0;
    this.speed = 1;
    this.direction = 1;
    this.innerCurrent = 0;
    this.innerRange = [5, 7];

    if (this.opts.autoInit) this.init();
  }

  Sequence.prototype = {
    init: function() {
      // var _this = this;
      var elem = this.$el; // get all frames and hide each one

      _.bindAll(this);

      this.frames = $('img' + (this.opts.imageClassName!=null? '.'+this.opts.imageClassName : ''), elem);
      this.totalFrames = this.frames.length;
      // _this.currentFrame = _this.frames.length;

      if (this.opts.name) {
        this.name = this.opts.name;
      }

      if (this.opts.preload) {
        var images = [];
        for (var i = 0; i < this.frames.length; i++) {
          var frame = $(this.frames[i]);
          images.push(frame.attr('src'));
        }
        this.preload(images);

      } else {
        this.start();
      }
    }, 

    destroy: function () {
      // this.frames = null;
    }, 

    render: function(time){
      if (!this.isAnimated) return;
      
      // if (time - this.lastTime < 1000 / this.opts.fps) return;      
      if (time - this.lastTime > 1000 / this.opts.fps) {
        this.lastTime = time;

        if (this.direction == 1) {
          if (this.currentFrame == this.frames.length-1) {
            this.direction = -1;         
          }
        
        } else if (this.direction == -1) {
          if (this.currentFrame == this.innerRange[0] && this.innerCurrent < this.opts.innerLoops) {
            this.innerCurrent++;
            this.direction = 1;            
          }

          if (this.currentFrame == 0) {
            if (this.opts.repeat) {
              this.innerCurrent = 0;
              this.direction = 1;
            } else {
              this.stop();
            }
          }
        }

        this.showFrame(this.currentFrame + (this.direction*this.speed));        
      }

      requestAnimationFrame( this.render );
    }, 

    start: function() {
      if (typeof this.opts.start == 'function') {
        this.opts.start(this.frames.length);
      }

      this.isAnimated = true;
      requestAnimationFrame(this.render);
    },
    
    stop: function() {
      this.isAnimated = false;
    }, 

    pause: function() {
      this.isAnimated = false;
    }, 

    resume: function() {
      this.start();
    }, 

    showFrame: function(newFrame) {      
      var currentFrame = this.currentFrame;
      // if (this.name == 'seq-0') console.log("name: ", this.name, "newFrame: ", newFrame, " currentFrame: ", currentFrame, " total: ", this.frames.length); 

      $(this.frames[currentFrame]).css('display', 'none'); // show the next frame
      $(this.frames[newFrame]).css('display', 'inline'); // show the next frame

      this.currentFrame = newFrame;
    }, 

    removeFrames: function (frames) {      
      if (!frames || frames.length == 0) return;

      for (var i=0; i<frames.length; i++) {
        var frameToRemove = frames[i];
        this.$el.find(this.frames[frameToRemove]).remove();
        delete this.frames[frameToRemove];
      }

      for (var i=0; i<this.frames.length; i++) {
        if (this.frames[i] == undefined) {
          this.frames.splice(i, 1);
          i--;
        }
      }

      this.totalFrames = this.frames.length;
      this.currentFrame = 0; // this.frames.length-1;
      this.lastTime = 0;
    }, 

    /* preload()
     * Preloads images specified as an array of relative paths.
     */
    preload: function(sources) {
      var _this = this;
      for (var i = 0, loaded = 0; i < sources.length; ++i) {
        // insert each image into the dom to preload them
        $('<img />').on('load', function() {
          loaded++;
          if (loaded >= sources.length) {
            console.log("Sequence ", _this.opts.name, " finished loading");
            // _this.start();
          }
        }).attr('src', sources[i]).appendTo('body').css('display','none');
      }
    }
  };

})(jQuery);




window.app = window.app || {};


define(['underscore', 'moment'], function (_, moment) {
  // _.bindAll(this);

  app.i18n = {
    strings: {}, 

    t: function (string) {
      var that = this;

      if (!that.strings) {
        console.log("ERROR: no strings defined");
        return string;
      }

      if (that.strings[string] == undefined) {
        console.log("ERROR: key \""+string+"\" not found in locale file");
        return string;
      }

      return that.strings[string];
    },

    changeLanguage: function (lang, callback) {
      var that = this;    

      this.ajax = $.getJSON('locale/strings-'+lang+'.json', 
        function(){
          // console.log("Succes loading locale file "+lang);
        })
        .complete( function(data) {
          console.log("Loaded strings: ", lang);
          that.strings = $.parseJSON(data.responseText);
          
          app.lang = lang;
          $('html').attr('lang', lang);        
          that.setMomentLang(lang);

          callback();
        });
    }, 

    setMomentLang: function (lang) {
      if (!moment) return;

      var that = this;
      if (lang == 'es') {
        moment.lang('es', {
          months : "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
          monthsShort : "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
          weekdays : "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
          weekdaysShort : "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
          weekdaysMin : "Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),
          longDateFormat : {
              LT : "H:mm",
              L : "DD/MM/YYYY",
              LL : "D \\de MMMM \\de YYYY",
              LLL : "D \\de MMMM \\de YYYY LT",
              LLLL : "dddd, D \\de MMMM \\de YYYY LT"
          },
          calendar : {
              sameDay : function () {
                  return '[hoy a la' + ((that.hours() !== 1) ? 's' : '') + '] LT';
              },
              nextDay : function () {
                  return '[mañana a la' + ((that.hours() !== 1) ? 's' : '') + '] LT';
              },
              nextWeek : function () {
                  return 'dddd [a la' + ((that.hours() !== 1) ? 's' : '') + '] LT';
              },
              lastDay : function () {
                  return '[ayer a la' + ((that.hours() !== 1) ? 's' : '') + '] LT';
              },
              lastWeek : function () {
                  return '[el] dddd [pasado a la' + ((that.hours() !== 1) ? 's' : '') + '] LT';
              },
              sameElse : 'L'
          },
          relativeTime : {
              future : "en %s",
              past : "hace %s",
              s : "unos segundos",
              m : "un minuto",
              mm : "%d minutos",
              h : "una hora",
              hh : "%d horas",
              d : "un día",
              dd : "%d días",
              M : "un mes",
              MM : "%d meses",
              y : "un año",
              yy : "%d años"
          },
          ordinal : '%dº',
          week : {
              dow : 1, // Monday is the first day of the week.
              doy : 4  // The week that contains Jan 4th is the first week of the year.
          }
        });
      }
      else if (lang == 'ca') {
        moment.lang('ca', {
          months : "Gener_Febrer_Març_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre".split("_"),
          monthsShort : "Gen._Febr._Mar._Abr._Mai._Jun._Jul._Ag._Set._Oct._Nov._Des.".split("_"),
          weekdays : "Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres_Dissabte".split("_"),
          weekdaysShort : "Dg._Dl._Dt._Dc._Dj._Dv._Ds.".split("_"),
          weekdaysMin : "Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),
          longDateFormat : {
              LT : "H:mm",
              L : "DD/MM/YYYY",
              LL : "D MMMM YYYY",
              LLL : "D MMMM YYYY LT",
              LLLL : "dddd D MMMM YYYY LT"
          },
          calendar : {
              sameDay : function () {
                  return '[avui a ' + ((that.hours() !== 1) ? 'les' : 'la') + '] LT';
              },
              nextDay : function () {
                  return '[demà a ' + ((that.hours() !== 1) ? 'les' : 'la') + '] LT';
              },
              nextWeek : function () {
                  return 'dddd [a ' + ((that.hours() !== 1) ? 'les' : 'la') + '] LT';
              },
              lastDay : function () {
                  return '[ahir a ' + ((that.hours() !== 1) ? 'les' : 'la') + '] LT';
              },
              lastWeek : function () {
                  return '[el] dddd [passat a ' + ((that.hours() !== 1) ? 'les' : 'la') + '] LT';
              },
              sameElse : 'L'
          },
          relativeTime : {
              future : "en %s",
              past : "fa %s",
              s : "uns segons",
              m : "un minut",
              mm : "%d minuts",
              h : "una hora",
              hh : "%d hores",
              d : "un dia",
              dd : "%d dies",
              M : "un mes",
              MM : "%d mesos",
              y : "un any",
              yy : "%d anys"
          },
          ordinal : '%dº',
          week : {
              dow : 1, // Monday is the first day of the week.
              doy : 4  // The week that contains Jan 4th is the first week of the year.
          }
        });
      }
      else if (lang == 'pt') {
        moment.lang('pt', {
          months : "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
          monthsShort : "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
          weekdays : "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),
          weekdaysShort : "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
          weekdaysMin : "Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),
          longDateFormat : {
              LT : "HH:mm",
              L : "DD/MM/YYYY",
              LL : "D \\de MMMM \\de YYYY",
              LLL : "D \\de MMMM \\de YYYY LT",
              LLLL : "dddd, D \\de MMMM \\de YYYY LT"
          },
          calendar : {
              sameDay: '[Hoje às] LT',
              nextDay: '[Amanhã às] LT',
              nextWeek: 'dddd [às] LT',
              lastDay: '[Ontem às] LT',
              lastWeek: function () {
                  return (that.day() === 0 || that.day() === 6) ?
                      '[Último] dddd [às] LT' : // Saturday + Sunday
                      '[Última] dddd [às] LT'; // Monday - Friday
              },
              sameElse: 'L'
          },
          relativeTime : {
              future : "em %s",
              past : "%s atrás",
              s : "segundos",
              m : "um minuto",
              mm : "%d minutos",
              h : "uma hora",
              hh : "%d horas",
              d : "um dia",
              dd : "%d dias",
              M : "um mês",
              MM : "%d meses",
              y : "um ano",
              yy : "%d anos"
          },
          ordinal : '%dº',
          week : {
              dow : 1, // Monday is the first day of the week.
              doy : 4  // The week that contains Jan 4th is the first week of the year.
          }
        });
      }
      else {
        moment.lang('en');
      }
    }
  }

  return app.i18n;
});

window.app = window.app || {};


define(['backbone', 'messageView', 'previewView', 'messagesCollection'], 
  function (Backbone, MessageView, PreviewView, MessagesCollection) {

    return Backbone.View.extend({

      id: "gallery", 
      messageViews: undefined, 
      isSearch: false, 
      page: 1, 
      pagesTotal: 0, 
      itemsPerPage: 5, 
      loadedMessages: 0, 

      events: {
        // 'click .search': 'highlightSearch',
        // 'click .focus-object': 'backToMessageView', 
        'click .sentence': 'onSentenceClicked', 
        'click .search .submit': 'onSubmitClicked', 
        // 'keyup .search .search-query': 'onInputUp', 
        'click [href="#gallery"]': 'onGalleryClicked', 
        'click .pagination-item': 'onPaginationItemClicked',
                                
        'touchstart .search .submit': 'onEnter',
        'touchend .search .submit': 'onLeave'
      },

      initialize: function (options) {
        this.messageViews = new Array();        
        this.template = app.tpl.get(this.id);
        this.currentPage = options.page || 1;
        
        _.bindAll(this);
      }, 

      destroy: function () {
        // if (app.router.currentSheet) app.router.currentSheet.off('close', this.resumeSequences);
        this.destroyMessages();
        this.isSearch = false;
        this.page = 0;
        this.pagesTotal = 0;
        this.messageViews = null;
        this.loadedMessages = 0;

        this.remove();
      }, 

      destroyMessages: function () {
        _.each(this.messageViews, function (messageView) { messageView.destroy() });
      }, 

      render: function () {
        if (this.messageViews.length > 0) {
          this.destroyMessages();
          this.messageViews = new Array();
        }

        this.$el.html(_.template( this.template ));
        
        this.$listEl = this.$el.find('.message-list');
        this.$paginationEl = this.$el.find('.pagination ul');
        this.$searchEl = this.$el.find('.search-container');

        if (!this.collection || !app.messagesCollection) {
          this.collection = app.messagesCollection = new MessagesCollection();
        }

        if (this.isSearch) {
          this.$el.find('.back-to-gallery').removeClass('hidden');

          if (app.deviceDetection.isSmartPhone()) { // || app.deviceDetection.isDesktop()
            this.$searchEl.css({ width:'60%', left:'37%' });
            this.$searchEl.find('input').css({ width:'75%' });
          }

          this.$searchEl.find('input').val(this.searchString);
          this.collection.searchTerm = this.searchString;
        
        } else {
          this.collection.searchTerm = null;
        }
        
        if (this.collection.page != this.currentPage || this.collection.length === 0){
          this.collection.goToPage( this.currentPage, {success:this.onCollectionFetchedSuccess, error:this.onCollectionFetchedError});
        }

        return this;
      }, 

      createPagination: function () {
        // this.pagesTotal = Math.ceil(this.collection.length/this.itemsPerPage);
        // console.log(app.messagesCollection);

        if (!app.messagesCollection.pagination) return;
        this.pagesTotal = app.messagesCollection.pagination.totalPages;
        
        if (this.$paginationEl.children().length == this.pagesTotal) return;

        if (this.pagesTotal <= 1) {
          this.$paginationEl.addClass('hidden');
          return;
        }

        var maxItems = 5;
        var currentPage = this.collection.pagination.page;
        var totalPages = this.collection.pagination.totalPages;
        
        if (this.$paginationEl.children().length > 0 && this.$paginationEl.children().length != this.pagesTotal) {
          this.$paginationEl.empty();
        }
        var disabled = currentPage === 1 ? "disabled" : ""
        if (currentPage > 1){
          this.$paginationEl.html('<li class="pagination-item prev '+disabled+'"><a href="#">&laquo;</a></li>');
          this.$paginationEl.append('<li class="pagination-item first '+disabled+'" ><a href="#">'+ app.i18n.t('First')+'</a></li>');
        }
        var page;
        if (this.pagesTotal <= maxItems){
          for (page=0; page <= totalPages; page++) {          
            var enabled = (page == currentPage) ? 'active' : '';
            
            this.$paginationEl.append('<li class="pagination-item '+enabled+'" data-page="'+ page +'"><a href="#">'+page+'</a></li>');
          }
        }else{
          var startPage = currentPage - Math.floor((maxItems - 1) / 2);
          if (startPage < 1) startPage = 1;
          var endPage = currentPage + Math.floor((maxItems - 1) / 2);
          if (endPage > totalPages) endPage = totalPages;

          if (startPage !== 1) this.$paginationEl.append('<li class="pagination-item ellipsis disabled" ><a href="#">...</a></li>');

          for (var page = startPage; page <= endPage; page++) {          
            var enabled = (page == currentPage) ? 'active' : '';
            this.$paginationEl.append('<li class="pagination-item '+enabled+'" data-page="'+ page +'"><a href="#">'+page+'</a></li>');
          }
          if (endPage !== totalPages) this.$paginationEl.append('<li class="pagination-item ellipsis disabled" ><a href="#">...</a></li>');
          // console.log('interval: '+startPage+', '+endPage);
          // console.log('current page: '+ currentPage);
          // console.log('total pages: '+ totalPages);
        }

        disabled = currentPage === totalPages ? "disabled" : ""
        if (currentPage < totalPages){
          this.$paginationEl.append('<li class="pagination-item last '+disabled+'" ><a href="#">'+ app.i18n.t('Last')+'</a></li>');
          this.$paginationEl.append('<li class="pagination-item next '+disabled+'" ><a href="#">&raquo;</a></li>');
        }
      }, 

      showMessages: function (page) {
        if (!page || page == '' || page == 0) return;

        var models;
        this.page = parseInt(page);
        this.$listEl.empty(); // *** parar las animas?

        if (this.isSearch) {
          // this.searchCollection = new MessagesCollection();
          // this.searchCollection.add(app.messagesCollection.filterByString(this.searchString));

          // if (this.searchCollection.length == 0) {
          //   this.$listEl.html('No results found');
          //   return;
          // } 

          // models = this.searchCollection.models;            

        } else {
          var startIndex = (this.page-1)*this.itemsPerPage;
          models = this.collection.models.slice(startIndex, startIndex+this.itemsPerPage); 
        }
        // var startIndex = (this.page-1)*this.itemsPerPage;
        // models = this.collection.models.slice(startIndex, startIndex+this.itemsPerPage); 

        // _.each(this.collection.model, this.createSentence);
        // this.collection.each(this.createSentence);

        this.loadedMessages = 0;
        this.loadNextMessage();
      }, 

      createSentence: function (model, index) {
        var id = model.get('id');
        var messageView = new MessageView({ id:'message-'+id, model:model, attributes:{"data-id":id} });

        messageView.once('show', this.loadNextMessage);

        this.messageViews.push(messageView);
        this.$listEl.append( messageView.render().el );
      }, 

      loadNextMessage: function () {
        if (this.loadedMessages >= this.collection.length) return;

        this.createSentence(this.collection.models[this.loadedMessages]);
        this.loadedMessages++;

        if (this.collection.length == 1 || this.loadedMessages == 2) this.createPagination();
      }, 

      pauseSequences: function () {
        _.each(this.messageViews, function (messageView) { messageView.pauseSequence() }, this);
      }, 

      resumeSequences: function () {
        _.each(this.messageViews, function (messageView) { messageView.resumeSequence() }, this);
      }, 

      goSearch: function () {
        var searchString = this.$el.find('.search-query').val().toLowerCase();

        if (searchString == "") {
          console.log("Search field is empty");
        }

        // this.destroy();
        this.isSearch = searchString != "";
        if (this.isSearch){
          app.router.navigate('search/'+searchString+'/page/1');
        }else{
          app.router.navigate('gallery');
        }
        this.collection = new MessagesCollection();
        this.searchString = this.isSearch ? searchString : null;
        
        this.collection.searchTerm = searchString;
        this.currentPage = 1;
        this.messageViews = new Array();   
        this.render();
      }, 

      onCollectionFetchedSuccess: function (e) {
        // this.collection = app.messagesCollection;
        if (this.collection.length === 0){
          this.$('.no-messages').removeClass('hidden')
          this.$('.message-list').css({display: 'none'})
          return;
        }

        this.showMessages(1);
        // this.createPagination();
      }, 

      onCollectionFetchedError: function (e) {
        console.log("Fetching collection error", e);
        this.$listEl.html(app.i18n.t('Error getting the data'));
      }, 

      onInputUp: function (e) {
        e.preventDefault();

        if (e.keyCode == 13) { // Enter
          this.goSearch();
        }
      }, 

      onSentenceClicked: function (e) {
        e.preventDefault();
        var id = parseInt($(e.currentTarget).parent().attr('data-id'));
        
        this.pauseSequences();
        // this.destroy();

        app.router.prevRoute = 'gallery';       
        app.router.navigate('preview/'+id, {trigger:true});
      }, 

      onGalleryClicked: function (e) {
        e.preventDefault();
        this.destroy();

        app.router.navigate('gallery', {trigger:true});
      }, 

      onSubmitClicked: function (e) {
        e.preventDefault();
        this.goSearch();
      }, 

      onPaginationItemClicked: function (e) {
        e.preventDefault();
        var $currentEl =  $(e.currentTarget);
        this.pauseSequences();

        this.$paginationEl.find('li').removeClass('active');
        $currentEl.addClass('active');

        if ($currentEl.hasClass('ellipsis')) return;
        
        var page = null;
        if ($currentEl.hasClass('prev')){
          if (this.collection.pagination.page > 1){
            page = this.collection.pagination.page - 1;
          }else{
            page = 1;
          }
        }else if ($currentEl.hasClass('next')){
          if (this.collection.pagination.page < this.collection.pagination.totalPages){
            page = this.collection.pagination.page + 1;
          }else{
            page = this.collection.pagination.totalPages;
          }
        }else if ($currentEl.hasClass('first')){
          page = 1;
        }else if ($currentEl.hasClass('last')){
          page = this.collection.pagination.totalPages;
        }else{
          // this.showMessages( parseInt($currentEl.find('a').text()) );
          page = parseInt($currentEl.attr("data-page"));
        }
        this.currentPage = page;
        if (this.isSearch){
          this.collection.searchTerm = this.searchString;
          app.router.navigate('search/'+this.searchString+'/page/'+page);
        }else{
          app.router.navigate('gallery/page/'+page);
        }
        this.collection.goToPage( page, {success:this.onCollectionFetchedSuccess, error:this.onCollectionFetchedError});
        }, 
                                
        onEnter: function (e) {
            $(e.currentTarget).addClass('hover');
        }, 
        
        onLeave: function (e) {        
            $(e.currentTarget).removeClass('hover');
        }

    });
  }
);


window.app = window.app || {};


define(['backbone'], function (Backbone) {

    return Backbone.View.extend({

      id: "about",
                                
      events: {
        'click .link': 'openLink'
      },
                                
      openLink: function(e){
        e.preventDefault();
        e.stopPropagation();
        var $target = $(e.currentTarget);
        var href = $target.attr('href');
        window.open(href, '_blank', 'location=yes&presentationstyle=pagesheet&transitionstyle=coververtical');
      },

      initialize: function () {
        this.template = app.tpl.get(this.id);
      }, 

      destroy: function () {
        this.template = null;
        this.remove();
      }, 

      render: function () {
        this.$el.html(_.template( this.template ));
        
        var isPhone = app.deviceDetection.isSmartPhone();

        var video = this.$el.find('iframe');
        var windowWidth = $(window).width();
        video.css('width', isPhone?400:550);
        video.css('height', video.width()*360/640);

        if (app.lang === 'es' || app.lang === 'ca') {
          this.$el.find('.share-options .rss a').attr('href', 'http://www.sonar.es/rss/RSS_'+app.lang.toUpperCase()+'.xml');
          this.$el.find('.tickets a').attr('href', 'http://www.sonar.es/'+app.lang.toLowerCase()+'/pg/tickets');

        }

        if (app.deviceDetection.isSmartPhone()) this.$el.find('.logotype').removeClass('hidden');

        return this;
      }

    });
  }
);


window.app = window.app || {};


define(['backbone'], function (Backbone) {

    return Backbone.View.extend({

      id: "ticker", 
      isDestroyed: false, 
      isPhone: false, 
      isMoving: true, 
      currentSequenceIndex: 0, 
      currentSequenceExitIndex: 0, 
      charWidth: 0,
      spaceWidth: 0, 
      stepDelay: 50, 
      stepTranslation: 0, 
      sentenceLeft: 0, 
      sentenceWidth: 0, 
      loadedCounter: 0, 
      sequences: undefined, 
      imagesToCache: undefined, 
      deviceType: '', // 'phone' || 'tablet'

      events: {
        'click': 'togglePause'
      }, 

      initialize: function () {
        this.sequences = new Array();
        this.sequenceInstances = new Array();
        this.imagesToCache = new Array();        

        // device check
        this.isPhone = app.deviceDetection.isSmartPhone();
        this.deviceType = this.isPhone ? 'phone' : 'tablet';

        this.charWidth = this.isPhone ? 135 : 270;
        this.charHeight = this.isPhone ? 177 : 441;
        this.spaceWidth = this.isPhone ? 55 : 100;
        this.stepTranslation = this.isPhone?  10:19;

        this.template = app.tpl.get(this.id);
        _.bindAll(this);
      }, 

      destroy: function () {
        this.isDestroyed = true;

        _.each(this.sequenceInstances, function (item) { item.stop() }, this);
        this.remove();
      }, 

      render: function () {
        this.$el.html(_.template( this.template ));
        this.$sentenceEl = this.$el.find('#ticker-inner');
        this.$clickerEl = this.$el.find('#ticker-clicker');
        this.$toggleIconEl = this.$clickerEl.find('i');
        this.$preloaderEl = this.$el.find('.preloader');

        this.create();
        return this;
      }, 
      
      create: function () {
        this.createWords(this.model.get('message'));

        this.chars = this.model.get('message').replace(' ', '').split('');
        var spaces = this.model.get('message').match(/\s+/);
        this.numberOfSpaces = (spaces != null && spaces.length > 0) ? this.model.get('message').match(/\s+/)[0].length : 0;

        var windowH = $(window).height();
        var headerH = $('#preview .header').height();
        var actionsH = $('#preview .action').height();
        var verticalSpace = windowH - headerH - actionsH;

        if (verticalSpace < this.charHeight) {
          var shrinkValue = verticalSpace/this.charHeight - .25;
          this.charWidth *= shrinkValue;
          this.charHeight *= shrinkValue;
          this.spaceWidth *= shrinkValue;

          _.each(['transform', '-ms-transform', '-webkit-transform', '-moz-transform', '-o-transform'], function(prop){
            this.$sentenceEl.css(prop, 'scale('+shrinkValue+')');  
          }, this);
          
        }
  
        this.sentenceWidth = (this.chars.length*this.charWidth + this.numberOfSpaces*this.spaceWidth);        
        // this.$sentenceEl.css('width', this.sentenceWidth);
        this.$sentenceEl.css('height', this.charHeight);
        this.$el.css('height', this.charHeight);
        this.$sentenceEl.css('left', $(window).width());

        // loader
        imageCache.pushArray(this.imagesToCache, this.onImageLoaded, this.onAllImagesLoaded);
      }, 

      createWords: function (message) {
        this.words = message.split(' ');
        
        this.$sentenceEl.append('<div id="t-word-'+0+'" class="word"></div>');
        this.$wordEl = this.$sentenceEl.find('#t-word-'+0);
        this.createChars(message, 0);
      }, 

      createChars: function (string, wordIndex) {
        var chars = string.split('');
        this.$wordEl.css({width:chars.length*this.charWidth, "margin-right":this.spaceWidth});

        _.each(chars, function (char, index) {
          if (char != ' '){
            this.$wordEl.append('<div id="t-char-'+wordIndex+'-'+index+'" class="char char-'+char+' '+this.deviceType+'"></div>');
            this.$charEl =  this.$wordEl.find('#t-char-'+wordIndex+'-'+index);
            this.sequences.push(this.$charEl); // for further starting calls
            this.createFrames(char);
          }else{
            this.$wordEl.append('<div id="t-char-'+wordIndex+'-'+index+'" class="char space '+this.deviceType+'" style="padding: '+this.spaceWidth/2+'px"></div>');
          }
        }, this);
      }, 

      createFrames: function (char) {
        var imageURL;

        for (var i = 0; i < 8; i++) {
          var display = i==0? 'block':'none';
          imageURL = 'http://pompom.sonar.es/img/chars/'+this.deviceType+'/big/'+this.decodeCharsToFilenames(char.toUpperCase())+'_0000'+i+'.png';
          this.imagesToCache.push(imageURL);

          this.$charEl.append('<img class="frame-'+i+'" src="'+imageURL+'" style="display:'+display+';">');
        }
      }, 

      move: function () {
        if (this.isDestroyed || !this.isMoving) return;  

        // last one
        if (this.currentSequenceIndex == this.sequences.length && this.sequences[this.currentSequenceIndex-1].offset().left < -this.charWidth) {
          this.onTickerCompleted();
          return;
        }
        
        this.sentenceLeft = parseInt(this.$sentenceEl.css('left'));
        this.$sentenceEl.css('left', this.sentenceLeft-this.stepTranslation);      
      
        if (this.currentSequenceIndex < this.sequences.length) {
          // char getting OUT the stage
          if (this.sequences[this.currentSequenceExitIndex].offset().left <= -this.charWidth) {
            this.sequenceInstances[this.currentSequenceExitIndex].stop();
            this.currentSequenceExitIndex++;
          }

          // char coming IN the stage
          if (this.sequences[this.currentSequenceIndex].offset().left <= $(window).width()-this.charWidth) {
            this.startCharSequence();
            this.currentSequenceIndex++;
          }
        }

        _.delay(this.move, this.stepDelay);
      }, 

      startCharSequence: function () {
        // console.log(">> VOY a ", this.currentSequenceIndex);
        // var sequenceInstance = new Sequence(this.sequences[this.currentSequenceIndex], { name:'seq-'+this.currentSequenceIndex, repeat:false, complete:this.removeFrames });        
        var sequenceInstance = new Sequence(this.sequences[this.currentSequenceIndex], { name:'seq-'+this.currentSequenceIndex, repeat:true, innerLoops:200 });
        this.sequenceInstances.push(sequenceInstance);
      }, 

      removeFrames: function (instance) { 
        instance.removeFrames([0, 1, 2, 3, 4, 5]);

        instance.opts.complete = null;
        instance.opts.repeat = true;
        instance.resume();
      }, 

      decodeCharsToFilenames: function ( _char ) {
        this.output = _char;
        switch ( _char ) {
          case '+':
            this.output = "plus";
            break;
          case '!':
            this.output = "exclamation";
            break;
          case '\'':          
            this.output = "apost";
            break;
          case '´':          
            this.output = "apost";
            break;
          case '.':
            this.output = "point";
            break;
          case ',':
            this.output = "colon";
            break;
          case ';':
            this.output = "semicolon";
            break;
          case '@':
            this.output = "atsign";
            break;
          case '&':
            this.output = "and";
            break;
          case '-':
            this.output = "dash";
            break;
          case '=':
            this.output = "equal";
            break;
          case '?':
            this.output = "question";
            break; 
          case '#':
            this.output = "pound";
            break; 
          case '♥':
            this.output = "inlove";
            break;  
          case '☺':
            this.output = "happyface";
            break;
          case 'Ñ':
            this.output = 'ntilde';
            break;
          case 'Ç':
            this.output = 'cedilla';
            break;
          default:
            break;
        }
        return this.output;
      }, 

      togglePause: function (e) {        
        e.preventDefault();
        e.stopPropagation();

        if (!this.$preloaderEl.hasClass('hidden')) return; // still loading

        this.isMoving = !this.isMoving;

        var icon;

        if (this.isMoving) {
          this.move();          
          icon = "icon-play";
        }
        else {
          icon = "icon-pause";
        }

        this.$toggleIconEl.attr('class', icon+' icon-4x');
        this.$toggleIconEl.css('opacity', 1);
        
        TweenMax.killTweensOf(this.$toggleIconEl);
        TweenMax.to(this.$toggleIconEl, 1, {delay:.35, ease:Expo.easeOut, css:{opacity:0}});
      }, 

      onImageLoaded: function (e) {
        // console.log("loadImageEvent", e);
        this.loadedCounter++;
        this.$preloaderEl.html('Loaded '+Math.floor((this.loadedCounter*100)/this.imagesToCache.length)+'%');
      }, 

      onAllImagesLoaded: function (e) {
        if (this.isDestroyed) return;
        console.log("All images loaded");

        this.$preloaderEl.addClass('hidden');
        this.$clickerEl.css('cursor', 'pointer');
        this.move();
      }, 

      onTickerCompleted: function () {
        console.log("Ticker: animation completed");        
        this.trigger('complete');
      }

    });
  }
);


window.app = window.app || {};


define(['backbone'], function (Backbone) {

    return Backbone.View.extend({

      className: "sentence", 
      isDestroyed: false, 
      isPhone: false, 
      charID: 0, 
      loadedCounter: 0, 
      sequences: undefined, 
      imagesToCache: undefined, 
      deviceType: '', // 'phone' || 'tablet'

      initialize: function () {
        this.sequences = new Array();
        this.charElements = new Array();
        this.imagesToCache = new Array();
        this.isPhone = app.deviceDetection.isSmartPhone();
        this.deviceType = this.isPhone? 'phone':'tablet';
        
        this.template = app.tpl.get(this.className);
        _.bindAll(this);
      }, 

      destroy: function () {
        this.isDestroyed = true;

        _.each(this.sequences, function (item) { item.stop() }, this);
        this.$sentenceEl.empty();

        this.isPhone = false;
        this.charID = 0;
        this.loadedCounter = 0;
        this.sequences = undefined;
        this.imagesToCache = undefined;
        this.deviceType = '';

        this.remove();
      }, 

      render: function () {
        this.$el.html(_.template( this.template ));
        this.$preloaderEl = this.$el.find('.preloader');
        this.$sentenceEl = this.$el.find('.sentence-inner');

        this.create();
        return this;
      }, 

      create: function () {
        this.createWords(this.model.get('message'));        
        imageCache.pushArray(this.imagesToCache, this.onImageLoaded, this.onAllImagesLoaded); // loader
      }, 

      createWords: function ( message ) {
        if (message.indexOf(' ') == -1) {
          this.words = [message];
        } else {
          this.words = message.split(' ');          
        }

        _.each(this.words, function (word, index) {      
          this.$sentenceEl.append('<div id="word-'+index+'" class="word"></div>');
          this.$wordEl = this.$el.find('#word-'+index);
          
          this.createChars(word, index);
        }, this);

        this.$sentenceEl.append('<div class="clearfix"></div>');
      }, 

      createChars: function ( string, wordIndex ) {
        var chars = string.split('');

        _.each(chars, function (char, index) {
          this.$wordEl.append('<div id="char-'+wordIndex+'-'+index+'" class="char char-'+char+' '+this.deviceType+'"></div>');
          this.$charEl =  this.$wordEl.find('#char-'+wordIndex+'-'+index);
          
          this.charElements.push(this.$charEl);
          this.createFrames(char);
        }, this);
      }, 

      createFrames: function (char) {
        var imageURL;

        for (var i = 0; i < 8; i++) {
          var display = i==0? 'block':'none';
          imageURL = 'http://pompom.sonar.es/img/chars/'+this.deviceType+'/small/'+this.decodeCharsToFilenames(char.toUpperCase())+'_0000'+i+'.png';
          this.$charEl.append('<img class="frame-'+i+'" src="'+imageURL+'" style="display:'+display+';">');
          
          this.imagesToCache.push(imageURL);
        }
      }, 

      startSequence: function () {
        if (this.isDestroyed) return;

        for (var i = 0; i < this.charElements.length; i++) {
          // var sequence = new Sequence(this.charElements[i], { name:'seq-'+i, repeat:true });
          var sequence = new Sequence(this.charElements[i], { name:'seq-'+i, repeat:true, innerLoops:7 });
          this.sequences.push(sequence);
        }
      },

      pauseSequence: function () {
        _.each(this.sequences, function (item) { item.pause() }, this);
      }, 

      resumeSequence: function () {
        _.each(this.sequences, function (item) { item.resume() }, this);
      }, 

      decodeCharsToFilenames: function (_char) {
        this.output = _char;
        switch ( _char ) {
          case '+':
            this.output = "plus";
            break;
          case '!':
            this.output = "exclamation";
            break;
          case '\'':
            this.output = "apost";
            break;
          case '´':          
            this.output = "apost";
            break;
          case '.':
            this.output = "point";
            break;
          case ',':
            this.output = "colon";
            break;
          case ';':
            this.output = "semicolon";
            break;
          case '@':
            this.output = "atsign";
            break;
          case '&':
            this.output = "and";
            break;
          case '-':
            this.output = "dash";
            break;
          case '=':
            this.output = "equal";
            break;
          case '?':
            this.output = "question";
            break;
          case '#':
            this.output = "pound";
            break; 
          case '♥':
            this.output = "inlove";
            break;  
          case '☺':
            this.output = "happyface";
            break;
          case 'Ñ':
            this.output = 'ntilde';
            break;
          case 'Ç':
            this.output = 'cedilla';
            break;       
          default:
            break;
        }
        return this.output;
      },

      onImageLoaded: function (e) {
        if (this.isDestroyed) return;
        
        this.loadedCounter++;
        this.$preloaderEl.html('Loaded '+Math.floor((this.loadedCounter*100)/this.imagesToCache.length)+'%');
      }, 

      onAllImagesLoaded: function (e) {
        if (this.isDestroyed) return;

        console.log('All images loaded');
        this.$preloaderEl.addClass('hidden');
        this.$sentenceEl.removeClass('hidden');

        TweenMax.from(this.$sentenceEl, .75, {css:{opacity:0}, onComplete:this.startSequence});

        this.trigger('loadingComplete');
      }

    });
  }
);


window.app = window.app || {};


define(['backbone', 'privacyView'], function (Backbone, PrivacyView) {

    return Backbone.View.extend({

      id: "popover",
      events: {
        'click [href="#gallery"]': 'onGalleryClicked', 

        'click .save a.submit': 'onSaveSubmitClicked', 
        'click .save a.privacy': 'onPrivacyClicked', 
                
        'click button.close': 'onAlertCloseClicked',
        
        'click .share a.twitter': 'shareTwitter',
        'click .share a.facebook': 'shareFacebook',
        'click .share a.gplus': 'shareGooglePlus',
//        'click .share a.email': 'shareMail',
                                
        'touchstart .share a.twitter': 'onEnter',
        'touchend .share a.twitter': 'onLeave',
        'touchstart .share a.facebook': 'onEnter',
        'touchend .share a.facebook': 'onLeave',
        'touchstart .share a.gplus': 'onEnter',
        'touchend .share a.gplus': 'onLeave',
        'touchstart .share a.email': 'onEnter', 
        'touchend .share a.email': 'onLeave', 

        'click .share-email a.submit': 'onShareEmailSubmitClicked', 
        'click .share-email a.privacy': 'onPrivacyClicked'
      }, 

      initialize: function (options) {
        this.template = app.tpl.get(this.id);
        this.idPreview = this.model.id || options.idPreview || 0
        _.bindAll(this);
      }, 

      destroy: function () {
        
      }, 

      onAlertCloseClicked: function (e) {
        e.preventDefault();
        console.log('closing popover');
        // this.hideAlert();
        this.remove();
        this.trigger('remove');
      },

      render: function () {
        this.$el.html(_.template( this.template ));
        
        if (this.className == "save") {      
          this.$saveEl = this.$el.find('.save');
          this.$formEl = this.$saveEl.find('form');
          this.$sendingEl = this.$saveEl.find('.sending');
          this.$feedbackEl = this.$saveEl.find('.feedback');
          this.$alertEl = this.$saveEl.find('.alert');

          this.$saveEl.removeClass('hidden');

        } else if (this.className == "share") {
          this.$shareEl = this.$el.find('.share');

          this.$shareEmailEl = this.$el.find('.share-email');
          this.$formEl = this.$shareEmailEl.find('form');
          this.$alertEl = this.$shareEmailEl.find('.alert');
          this.$sendingEl = this.$shareEmailEl.find('.sending');

          this.$shareEl.removeClass('hidden');
          
          var $emailLink = this.$('.share a.email')
          var mailto = "mailto:?subject="+encodeURIComponent(app.i18n.t('email subject'))+"&body="+encodeURIComponent(app.i18n.t('email body').replace('%%LINK%%', 'http://pompom.sonar.es/#preview/'+this.idPreview))
          $emailLink.attr('href', mailto)
        }

        this.$el.css({ opacity:0, bottom:'150px' });
        var bottomDest = app.deviceDetection.isSmartPhone()? '45px':'50px';
        TweenMax.to(this.$el, .5, {ease:Expo.easeOut, css:{opacity:1, bottom:bottomDest }});

        return this;
      }, 

      shareTwitter: function(e){
        e.preventDefault();
        e.stopPropagation();

        console.log('share twitter - id '+this.model.get('id'));
//        window.open("http://twitter.com/home?status=" + encodeURIComponent(app.i18n.t('sharing text') + ' ' + 'http://'+location.host+location.pathname+'#preview/'+this.idPreview), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
        window.open("twitter://post?message=" + encodeURIComponent(app.i18n.t('sharing text') + ' ' + 'http://pompom.sonar.es#preview/'+this.idPreview))
      },

      shareGooglePlus: function(e){
        e.preventDefault();
        e.stopPropagation();
        console.log('share google plus - id '+this.model.get('id'));        

        window.open("https://plus.google.com/share?url=" + encodeURIComponent('http://pompom.sonar.es#preview/'+this.idPreview), '_blank', 'location=yes')
      },

      shareFacebook: function(e){
        e.preventDefault();
        e.stopPropagation();

        console.log('share facebook - id '+this.model.get('id'));
        window.open("https://www.facebook.com/sharer.php?u=" + encodeURIComponent('http://pompom.sonar.es#preview/'+this.idPreview)+'&t='+encodeURIComponent(app.i18n.t('sharing title')), '_blank', 'location=yes')
      },

      shareMail: function(e){
        e.preventDefault();
        e.stopPropagation();   

        console.log('share email - id '+this.model.get('id'));     
        
        this.$shareEmailEl.removeClass('hidden');
        this.$shareEl.addClass('hidden');
      },

      validateEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }, 

      validateEmails: function (emails) {        
        var emailsClean = emails.replace(/;| /g, '');
        emailsClean = emailsClean.split(',');

        for (var i=0; i<emailsClean.length; i++) {
          if (!this.validateEmail(emailsClean[i])) {
            return false;
            break;
          }
        }

        return true;
      }, 

      showAlert: function (message) {
        this.$formEl.addClass('hidden');

        this.$alertEl.find('p').html(message);
        this.$alertEl.removeClass('hidden');

        _.delay(this.hideAlert, 3000);
      }, 

      hideAlert: function () {
        this.$alertEl.addClass('hidden');
        this.$formEl.removeClass('hidden');
      }, 

      onShareEmailSubmitClicked: function (e) {
        e.preventDefault();
        e.stopPropagation();

        var senderName = this.$formEl.find('[name="sender-name"]').val();
        var senderEmail = this.$formEl.find('[name="sender-email"]').val();
        var receiverEmails = this.$formEl.find('[name="receiver-emails"]').val();
        var checkbox = this.$formEl.find('[type="checkbox"]').prop('checked');

        if (senderName == '' || senderEmail == '' || receiverEmails == '') {
          this.showAlert(app.i18n.t('User and email can\'t be empty'));
          return;
        }

        if (!this.validateEmail(senderEmail)) {
          this.showAlert(app.i18n.t('email not valid'));
          return;
        }

        if (!this.validateEmails(receiverEmails)) {
          this.showAlert(app.i18n.t('email not valid'));
          return;
        }

        if (checkbox == false) {
          this.showAlert(app.i18n.t('accept privacy policy')); 
          return;
        }

        this.$formEl.addClass('hidden');
        this.$sendingEl.removeClass('hidden');

        // cristobal@aerstudio.com, hector@aerstudio.com, j.el

        var data = {
          fromName: senderName, 
          from: senderEmail, 
          to: receiverEmails.split(','),
          lang: app.lang,
          id: this.idPreview
        };
        var that = this;
        host = 'http://pompom.sonar.es'
//        if (location.port === ''){
//          host = '';
//        }
        $.ajax({
          url: host +'/php/sendMail.php',
          data: data,
          type: 'POST',
          success: function(res, status, xhr){
            var numSents = receiverEmails.split(',').length;
            var successfulSents = res.success.length;
            if (numSents != successfulSents){
              var errorMails = '';
              for (var i = 0; i < res.error.length; i++){
                var err = res.error[i];
                errorMails += err.to + ' ';
              }
              that.showAlert(app.i18n.t("These emails have not been sent: " + errorMails));
              that.$sendingEl.addClass('hidden');
            }else{
              that.showAlert(app.i18n.t('mail has been sent'));
              that.$sendingEl.addClass('hidden');
            }
          },
          error: function(xhr, status, err){
            that.showAlert(app.i18n.t(err));
            that.$sendingEl.addClass('hidden');
          }

        });

      }, 

      onSaveSubmitClicked: function (e) {
        e.preventDefault();

        var user = this.$formEl.find('[name="user"]').val();
        var email = this.$formEl.find('[name="email"]').val();
        var checkbox = this.$formEl.find('[type="checkbox"]').prop('checked');

        if (user == '' || email == '') {
          this.showAlert(app.i18n.t('User and email can\'t be empty'));
          return;
        }

        if (!this.validateEmail(email)) {
          this.showAlert(app.i18n.t('email not valid'));
          return;
        }

        if (checkbox == false) {
          this.showAlert(app.i18n.t('accept privacy policy')); 
          return;
        }

        this.$formEl.addClass('hidden');
        this.$sendingEl.removeClass('hidden');

        // AJAX call
        var data = {
          id: this.model.get('id'), 
          user: user, 
          email: email, 
          published: 1
        };

        var host = 'http://pompom.sonar.es/';
//        if (location.port === '') host = '';
        $.post( host + 'php/update.php', data, this.onUpdatePostCallback);
      }, 

      onUpdatePostCallback: function (e) {
        console.log("Updated message", e);
        this.$sendingEl.addClass('hidden');
        this.$feedbackEl.removeClass('hidden');

        if (app.messagesCollection) app.messagesCollection.add( JSON.parse(e) );
        this.model.set('message', '');        
      }, 

      onPrivacyClicked: function (e) {
        e.preventDefault();
        var privacy = new PrivacyView();
        app.stage.append( privacy.render().el );
      }, 

      onGalleryClicked: function (e) {
        e.preventDefault();
        this.remove();
        this.trigger('onVisitGalleryClicked');

        app.baseEl.removeClass('hidden');
        app.router.navigate('gallery', {trigger:true});
        app.router.nav.render();
      },
                      
                      
      onEnter: function (e) {
          $(e.currentTarget).addClass('hover');
      },
      
      onLeave: function (e) {
          $(e.currentTarget).removeClass('hover');
      }


    });
  }
);




window.app = window.app || {};


define(
  ['backbone', 'messageModel', 'popoverView', 'sentenceView', 'tickerView'], 
  function (Backbone, MessageModel, PopoverView, SentenceView, TickerView) {

    return Backbone.View.extend({

      id: "preview", 
      state: "", 
      prevRoute: "", 
      ticker: undefined, 
      sentence: undefined, 

      events: {
        'click a[href="#create"]': 'onEditClicked', 
        'click a[href="#close-sheet"]': 'onCloseSheetClicked', 
        'click .actions .share': 'onShareClicked', 
        'click .actions .save-message': 'onSaveMessageClicked',
        'click h3': 'gotoHome', 

        'click .actions .replay': 'onReplayClicked',
        'click .actions .sentence': 'onSentenceModeClicked',
                                
        'touchstart a[href="#close-sheet"]': 'onEnter',
        'touchend a[href="#close-sheet"]': 'onLeave',
        'touchstart a.button': 'onEnter',
        'touchend a.button': 'onLeave'
      },


      gotoHome: function(e){
        e.preventDefault();
        e.stopPropagation();
        this.onCloseSheetClicked(e);
        $('#nav ul li').removeClass('selected');
        $($('#nav ul li')[0]).addClass('selected');
        app.router.navigate('/', {trigger: true});
      },

      initialize: function () {
        _.bindAll(this);
        this.template = app.tpl.get(this.id);
      }, 

      destroy: function () {
        if (this.popover) {
          this.popover.off('onVisitGalleryClicked', this.destroy);
        }

        if (this.state == "ticker") {
          this.ticker.off('complete', this.createSentence);
          this.ticker.destroy();
        } 
        else if (this.state == "sentence") {
          this.sentence.destroy();
        }

        if (app.router.currentSection && (app.router.prevRoute == 'home' || app.router.prevRoute == 'gallery')) {
          this.off('close', app.router.currentSection.resumeSequences);
        }
        
        this.state = "";        
        this.ticker = null;
        this.sentence = null;
        this.remove();
      }, 

      render: function () {
        this.$el.html(_.template( this.template ));

        this.$messageContainerEl = this.$el.find('#message-container');
        this.$headerEl = this.$el.find('.header');
        this.$actionsEl = this.$el.find('.actions');
        this.$playTickerEl = this.$actionsEl.find('.replay');
        this.$playSentenceEl = this.$actionsEl.find('.sentence');
        
        app.baseEl.addClass('hidden');

        if (this.hideFullOptions) {
          this.$el.find('.ctr.left a').addClass('hidden');
          this.$el.find('.actions .save-message').addClass('hidden');

          if (!this.model) {
            // AJAX call
            var data = {
              id: parseInt(this.getModelID)
            };
            var host = 'http://pompom.sonar.es/';
            $.post( host + 'php/getMessage.php', data, this.onGetOneMessage);
          
          } else {
            this.createTicker();
          }

        } else {
          this.saveMessage();
          this.createTicker();
        }
        
        // this.createSentence();
        return this;
      }, 

      onGetOneMessage: function (e) {
        console.log("onGetOneMessage");

        var response = JSON.parse(e);

        if (response.message) {
          this.model = new MessageModel();
          this.model.set('message', response.message);

          this.createTicker();

        } else {
          this.destroy();

          app.router.navigate('gallery', { trigger:true });
          app.baseEl.removeClass('hidden');
        }
      }, 

      saveMessage: function (e) {
        var data = {
          message: this.model.get('message'), 
          published: 0
        };

        var host = 'http://pompom.sonar.es/';

        $.post(host + 'php/create.php', data, this.onSavePostCallback);
      }, 

      onSavePostCallback: function (e) {        
        var response = JSON.parse(e); 
        this.model.set(response);
        // this.model.set('id', response.id);

        // console.log("Pre-saved", this.model.attributes );        
      }, 

      createTicker: function () {
        this.state = "ticker";
        if (this.sentence) this.sentence.destroy();

        this.$playTickerEl.addClass('hidden');
        this.$playSentenceEl.removeClass('hidden');

        this.ticker = new TickerView({ model:this.model });
        this.ticker.on('complete', this.createSentence);
        this.$messageContainerEl.html( this.ticker.render().el );
      },

      createSentence: function () {
        this.state = "sentence";

        if (this.ticker) {
          this.ticker.off('complete', this.createSentence);
          this.ticker.destroy();
          this.ticker = null;
        }

        this.$playTickerEl.removeClass('hidden');
        this.$playSentenceEl.addClass('hidden');

        this.sentence = new SentenceView({ id:'sentence', model:this.model });
        this.sentence.once('loadingComplete', this.sentenceLoaded);
        this.$messageContainerEl.html( this.sentence.render().el );
      }, 

      sentenceLoaded: function (e) {
        var verticalSpace = $(window).height() - this.$headerEl.outerHeight() - this.$actionsEl.outerHeight();
        // console.log("verticalSpace >>>", verticalSpace);
        // console.log("sentence.height > verticalSpace", this.sentence.$el.height() > verticalSpace);
        if (this.sentence.$el.height() > verticalSpace) {
          this.$messageContainerEl.css('height', verticalSpace);
        }        
      }, 

      closeSheet: function () {
        var isBaseElEmpty = app.baseEl.children().length==0;        

        this.trigger('close');
        this.destroy();

        app.baseEl.removeClass('hidden');
        console.log(">>", app.router.prevRoute);
        app.router.navigate(app.router.prevRoute, {trigger:isBaseElEmpty});
      }, 

      onEditClicked: function (e) {
        e.preventDefault();
        this.destroy();

        app.router.prevSheet = 'preview';
        app.router.navigate('create', {trigger:true});
      }, 

      onCloseSheetClicked: function (e) {      
        e.preventDefault();
        TweenMax.to(this.$el, .5, {ease:Expo.easeIn, css:{top:200, opacity:0}, onComplete:this.closeSheet});
      }, 

      onShareClicked: function (e) {
        e.preventDefault();

        if (this.popover) {
          var popoverType = this.popover.className;  
          this.popover.remove();
        }

        if (popoverType == 'share') {
          this.popover = null;
          return;
        }

        this.popover = new PopoverView({ className:'share', model:this.model, idPreview:this.model.id });
        this.popover.once('onVisitGalleryClicked', this.destroy);
        var that = this;
        this.popover.once('remove', function(){ that.popover = null })
        this.$el.append( this.popover.render().el );
      }, 

      onSaveMessageClicked: function (e) {
        e.preventDefault();
        
        if (this.popover) {
          var popoverType = this.popover.className;  
          this.popover.remove();
        }

        if (popoverType == 'save') {
          this.popover = null;
          return;
        }

        this.popover = new PopoverView({ className:'save', model:this.model });
        this.popover.once('onVisitGalleryClicked', this.destroy);
        this.$el.append( this.popover.render().el );
      }, 

      onReplayClicked: function (e) {
        e.preventDefault();
        $(e.currentTarget).removeClass('hover');
        if (this.popover) this.popover.remove();
        this.createTicker();
      }, 

      onSentenceModeClicked: function (e) {
        e.preventDefault();
        if (this.popover) this.popover.remove();        
        this.createSentence();
      },
                                
                                
        onEnter: function (e) {
            $(e.currentTarget).addClass('hover');
        },
        
        onLeave: function (e) {
            $(e.currentTarget).removeClass('hover');
        }

    });
  }
);


window.app = window.app || {};


define(['backbone'], function (Backbone) {

    return Backbone.View.extend({

      id: 'modal', 
      className: 'privacy', 
      events: {
        'click .modal-header button.close': 'onCloseClicked', 
        'click .modal-footer button.close': 'onCloseClicked', 
        'click #modal-background': 'onCloseClicked'
      }, 

      initialize: function () {
        this.template = app.tpl.get(this.className);
      }, 

      render: function () {
        this.$el.html(_.template( this.template ));
        return this;
      }, 

      onCloseClicked: function (e) {
        e.preventDefault();
        this.remove();
      }

    });
  }
);


window.app = window.app || {};


define(['backbone'], function (Backbone) {

    return Backbone.View.extend({

      id: "preloader", 

      initialize: function () {
        this.template = app.tpl.get(this.id);
      }, 

      render: function () {
        // this.setStrings();

        this.$el.html(_.template( this.template )); // , this.model.toJSON()
        return this;
      }, 

      setStrings: function () {
        // this.model.set('key', app.i18n.t('value'));
      }

    });
  }
);


window.app = window.app || {};
'use strict';


define(['backbone'], function (Backbone) {
    
    return Backbone.View.extend({

      id: "home", 
      className: "section", 
      introMessage: 'sonar',     
      isPhone: false, 
      deviceType: '', 
      loadedCounter: 0, 
      sequenceWidth: 0, 
      sequenceHeight: 0, 
      sequence: undefined, 
      sequences: undefined, 
      sequenceInstances: undefined, 
      imagesToCache: undefined,

      events: {
        'click .app-store-btn a': 'onStoreButtonClicked',
        'click .link': 'openLink',
                                
        'touchstart .share-btn': 'onEnter',
        'touchend .share-btn': 'onLeave'
      },
                                
      openLink: function(e){
        e.preventDefault();
        e.stopPropagation();
        var $target = $(e.currentTarget);
        var href = $target.attr('href');
        console.log('opening link: '+href);
        window.open(href, '_blank', 'location=yes');
      },
                                
      initialize: function () {
        this.sequences = new Array();
        this.sequenceInstances = new Array();
        this.imagesToCache = new Array();

        this.isPhone = app.deviceDetection.isSmartPhone();
        this.deviceType = this.isPhone? 'phone':'tablet';
        this.sequenceWidth = (this.isPhone?39:78)*this.introMessage.length; // 39:78
        this.sequenceHeight = this.isPhone?46:91;
        
        this.template = app.tpl.get(this.id);
        _.bindAll(this);
      }, 

      destroy: function () {
        _.each(this.sequenceInstances, function (item) { item.stop() }, this);

        this.isPhone = false;
        this.deviceType = null;
        this.sequenceWidth = 0;
        this.sequenceHeight = 0;
        this.sequences = null;
        this.sequenceInstances = null;
        this.imagesToCache = null;
        this.template = null;
        this.remove();
      }, 

      render: function () {
        this.$el.html(_.template( this.template ));
        this.$sequenceEl = this.$el.find('.message');
                
        if (app.lang === 'es' || app.lang === 'ca') {
          this.$el.find('.share-options .rss a').attr('href', 'http://www.sonar.es/rss/RSS_'+app.lang.toUpperCase()+'.xml');
          this.$el.find('.tickets a').attr('href', 'http://www.sonar.es/'+app.lang.toLowerCase()+'/pg/tickets');
        }

        _.delay(this.createSequence, 1000);        

        return this;
      }, 

      createSequence: function (e) {
        if (this.sequenceInstances.length > 0) {
          _.each(this.sequenceInstances, function (item) { item.stop() }, this);
          this.sequenceInstances = new Array();
        }
        
        this.$sequenceEl.empty();
        this.$sequenceEl.width(this.sequenceWidth);
        this.$sequenceEl.height(this.sequenceHeight);

        for (var i=0; i<this.introMessage.length; i++) {
          this.$sequenceEl.append('<div id="char-'+i+'" class="char"></div>');
          
          var char = this.introMessage.charAt(i).toUpperCase();
          var $charEl = this.$sequenceEl.find('#char-'+i);
          $charEl.css('float', 'left');

          this.sequences[i] = $charEl;
          var imageURL;

          // add frames
          for (var j=0; j<8; j++) {
            var display = j==0? 'block':'none';
            imageURL = 'img/chars/'+this.deviceType+'/small/'+char+'_0000'+j+'.png';
            $charEl.append('<img class="frame-'+j+'" src="'+imageURL+'" style="display:'+display+';">');

            this.imagesToCache.push(imageURL);
          }
        }

        imageCache.pushArray(this.imagesToCache, this.onImageLoaded, this.onAllImagesLoaded);
      },

      startSequence: function () {
        _.each(this.sequences, function (item, index) {
          var sequence = new Sequence(item, { name:'seq-'+index, repeat:true, innerLoops:4 });
          this.sequenceInstances.push(sequence);      
        }, this);
      }, 

      pauseSequences: function () {
        _.each(this.sequenceInstances, function (item) { item.pause() }, this);
      }, 

      resumeSequences: function () {
        _.each(this.sequenceInstances, function (item) { item.resume() }, this);
        // this.stopListening(null, 'close');
      }, 

      onImageLoaded: function (e) {
        this.loadedCounter++;
        // this.$preloaderEl.html('Loaded '+Math.floor((this.loadedCounter*100)/this.imagesToCache.length)+'%');
      }, 

      onAllImagesLoaded: function (e) {
        // console.log('All images loaded');

        this.$sequenceEl.removeClass('hidden');
        TweenMax.from(this.$sequenceEl, .75, {css:{opacity:0}, onComplete:this.startSequence});
      }, 

      onStoreButtonClicked: function (e) {
        e.preventDefault();
      }, 
        
        onEnter: function (e) {
            $(e.currentTarget).addClass('hover');
        },
        
        onLeave: function (e) {
            $(e.currentTarget).removeClass('hover');
        }

    });

  }
);

// namespace
window.app = window.app || {};


define(['backbone'], function (Backbone) {

    return Backbone.View.extend({

      id: "nav", 
      attributes: { "role": "nav" }, 

      events: {
        'click .logo': 'onLogoClicked', 
        'click .nav-item': 'onNavItemClicked', 

        'click .language-current': 'onLanguageCurrentClicked', 
        'click .language-list li': 'onLanguageItemClicked', 
      }, 

      initialize: function () {
        this.template = app.tpl.get(this.id);
        _.bindAll(this);
      }, 

      destroy: function () {

      }, 

      render: function () {
        this.$el.html(_.template( this.template ));

        this.$sectionSelectorEl = this.$el.find('ul#section-selector');
        this.$navItemsEl = this.$sectionSelectorEl.find('li.nav-item');

        this.$languageSelectorEl = this.$el.find('#language-selector');
        this.$languageCurrentEl = this.$languageSelectorEl.find('.language-current');
        this.$languageListEl = this.$languageSelectorEl.find('.language-list');

        var section = Backbone.history.fragment == ''? 'home': Backbone.history.fragment.split('/')[0];
        this.$sectionSelectorEl.find('[data-id="'+section+'"]').addClass('selected');

        this.$languageCurrentEl.text( $('html').attr('lang') );

        this.tweenStart();
        return this;
      }, 

      tweenStart: function () {
        TweenMax.staggerTo(this.$el.find('li a'), .45, {delay:.25, ease:Expo.easeOut, css:{top: 0}}, .15);
      }, 

      show: function () {
        this.$el.removeClass('hidden');
        this.$languageCurrentEl.removeClass('hidden');
        this.$languageListEl.addClass('hidden');
      }, 

      hide: function () {
        this.$el.addClass('hidden');
      }, 

      onLogoClicked: function (e) {
        e.preventDefault();

        this.$navItemsEl.removeClass('selected');
        $(this.$navItemsEl[0]).addClass('selected');
        app.router.navigate('home', {trigger:true});
      }, 

      onNavItemClicked: function (e) {
        e.preventDefault();

        if (Backbone.history.fragment != '') app.router.prevRoute = Backbone.history.fragment;
        var prevRoute = app.router.prevRoute;
        var id = $(e.currentTarget).attr('data-id');

        if (id != 'create') {          
          this.$navItemsEl.removeClass('selected');
          $(e.currentTarget).addClass('selected');
        }

        app.router.navigate(id, {trigger:true});
      },

      onLanguageCurrentClicked: function (e) {
        e.preventDefault();
        e.stopPropagation();

        this.$languageCurrentEl.addClass('hidden');
        this.$languageListEl.removeClass('hidden');        
      }, 

      onLanguageItemClicked: function (e) {
        e.preventDefault();
        e.stopPropagation();

        var lang = $(e.currentTarget).text();        
        this.$languageCurrentEl.text(lang);
        this.$languageCurrentEl.removeClass('hidden');

        this.$languageListEl.addClass('hidden');
        
        if (lang != $('html').attr('lang')) app.i18n.changeLanguage(lang, this.onLanguageLoaded);
      }, 

      onLanguageLoaded: function (e) {
        this.render();
        app.router.updateViews();
      }

    });
  }
);

window.app = window.app || {};


define(['backbone'], function (Backbone) {
    view = Backbone.View.extend({

      id: "create", 
      className: "section", 

      minCharsAmount: 3, 
      maxChars: 140,      
      // alertCharNotFound: app.i18n.t('can\'t make that character'), 

      events: {
        'click a[href="#preview"]': 'onPreviewClicked', 
        'click a[href="#close-sheet"]': 'onCloseClicked', 
        'click a[href="#close-alert"]': 'onCloseAlertClicked', 
        'click li#add-smiley': 'onAddSmileyClicked', 
        'click li#add-heart': 'onAddHeartClicked',
        
        'touchstart a[href="#close-sheet"]': 'onEnter',
        'toucheend a[href="#close-sheet"]': 'onLeave',
        'touchstart a.button': 'onEnter',
        'toucheend a.button': 'onLeave'
      },

      initialize: function () {
        this.template = app.tpl.get(this.id);
        this.$textareaEl = this.$el.find('textarea');
        this.validChars = [
          '&', '@', ',', '-', '=', '!', '☺', '♥', '+', '.', '#', '?', ';', '\'', '´', 
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 
          'A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ',
          'á', 'à', 'â', 'ä', 'Á', 'À', 'Â',
          'é', 'è', 'ê', 'ë', 'É', 'Ê', 'Ë',
          'í', 'î', 'ï', 'Í', 'Î',
          'ó', 'ô', 'ö', 'Ó', 'Ö',
          'ú', 'ù', 'û', 'Ú', 'ü', 'Ü'
        ];
        this.accentListA = ['á', 'à', 'â', 'ä', 'Á', 'À', 'Â'];
        this.accentListE = ['é', 'è', 'ê', 'ë', 'É', 'Ê', 'Ë'];
        this.accentListI = ['í', 'î', 'ï', 'Í', 'Î'];
        this.accentListO = ['ó', 'ô', 'ö', 'Ó', 'Ö'];
        this.accentListU = ['ú', 'ù', 'û', 'Ú', 'ü', 'Ü'];

        _.bindAll(this);
      }, 

      destroy: function () {
        if (app.router.currentSection && (app.router.prevRoute == 'home' || app.router.prevRoute == 'gallery')) {
          this.off('close', app.router.currentSection.resumeSequences);
        }

        this.remove();
      }, 

      render: function () {
        this.$el.html(_.template( this.template ));

        this.$textareaEl = this.$el.find('textarea');
        this.$charsLeftEl = this.$el.find('.chars-left strong');
        this.$alertEl = this.$el.find('.alert');
        this.$alertTextEl = this.$el.find('.alert span');
        
        this.$textareaEl.val(this.model.get('message'));
        this.$textareaEl.on('input', this.onKeyUp);
        this.$textareaEl.on('keypress', this.onKeyPress);
        this.$textareaEl.focus().click();
        this.updateCharCounter();

        app.baseEl.addClass('hidden');

        // animating in the sheet
        if (app.router.prevSheet != 'preview') {
          TweenMax.from(this.$el, .5, {delay:.15, ease:Expo.easeOut, css:{top:200, opacity: 0}});
        }

        app.router.prevSheet = 'create';
        return this;
      }, 

      previewMessage: function () {
        this.model.set('message', this.$textareaEl.val());
        this.destroy();

        app.router.navigate('preview', {trigger:true});
      }, 

      setStrings: function () {
        // this.model.set('key', app.i18n.t('value'));
      }, 

      updateCharCounter: function (e) {
        var messageLength = this.$textareaEl.val().length;
        this.$charsLeftEl.html(this.maxChars-messageLength);
      }, 

      checkCharacter: function (char, e) {
        if (this.$textareaEl.val().length == 0) return;
        if (e){
          if (e.keyCode == 8) { return true; } // Backspace

          if (e.keyCode == 13) { // Enter
            e.preventDefault();
            this.previewMessage();
            return false;
          }
        }

        if (!_.contains(this.validChars, char)) {
          if (e) e.preventDefault();
          this.$alertTextEl.html( app.i18n.t('cant make that character') );
          this.$alertEl.removeClass('hidden');
          _.delay(this.hideAlert, 1500);
          return false;
        }

        return true;
      }, 

      hideAlert: function () {
        console.log("hideAlert");
        this.$alertEl.addClass('hidden');
      }, 

      closeSheet: function () {
        var isBaseElEmpty = app.baseEl.children().length == 0;

        this.trigger('close');
        this.destroy();

        app.baseEl.removeClass('hidden');
        app.router.navigate(app.router.prevRoute, { trigger:isBaseElEmpty });
      }, 

      onKeyPress: function(e){

        if (e.keyCode === 13){
          this.onPreviewClicked(e);
        }
      },

      onKeyUp: function (e) {
        var textareaValue = this.$textareaEl.val();
        // var lastChar = textareaValue.substring(textareaValue.length-1);

        var chars = _.unique(_.chars(textareaValue));
        this.lastChars = this.lastChars || [];
        
        var newChars = _.difference(chars, this.lastChars);
        var character, nullChars = [];
        for (var i = 0; i < newChars.length; i++){
          character = newChars[i];
          if (!this.checkCharacter(character.toUpperCase())){
            nullChars.push(character);
          }
        }
        console.log(nullChars);

        this.lastChars = _.without(chars, nullChars);

        var nullChar;
        while(nullChars.length > 0){
          nullChar = nullChars.pop();
          textareaValue = textareaValue.replace(nullChar, '');
        }

        

        this.$textareaEl.val(removeDiacritics(textareaValue).toUpperCase());

        this.updateCharCounter();

        // console.log(e);
      }, 

      onCloseClicked: function (e) {
        e.preventDefault();
        TweenMax.to(this.$el, .25, {ease:Expo.easeIn, css:{top:200, opacity:0}, onComplete:this.closeSheet});
      }, 

      onPreviewClicked: function (e) {
        e.preventDefault();
        
        if (this.$textareaEl.val().length < this.minCharsAmount) {
          this.$alertTextEl.html( app.i18n.t('at least 3 characters') );
          // this.$alertTextEl.html(this.alertEmptyField);
          this.$alertEl.removeClass('hidden');
          return;
        }

        this.previewMessage();
      }, 

      onCloseAlertClicked: function (e) {
        e.preventDefault();
        this.$alertEl.addClass('hidden');
      }, 

      onAddHeartClicked: function (e) {
        e.preventDefault();

        var val =this.$textareaEl.val();
        this.$textareaEl.val(val+"♥");
        this.$textareaEl.focus().click();
        this.setCaretToPos(this.$textareaEl[0], this.$textareaEl.val().length)
        this.updateCharCounter();

      }, 

      onAddSmileyClicked: function (e) {
        e.preventDefault();

        var val =this.$textareaEl.val();
        this.$textareaEl.val(val+"☺");
        this.$textareaEl.focus().click();
        this.setCaretToPos(this.$textareaEl[0], this.$textareaEl.val().length)  
        this.updateCharCounter();
      }, 
                                
        onEnter: function (e) {
            $(e.currentTarget).addClass('hover');
        },
        
        onLeave: function (e) {
            $(e.currentTarget).removeClass('hover');
        },

      setSelectionRange: function (input, selectionStart, selectionEnd) {
        if (input.setSelectionRange) {
          input.focus();
          input.setSelectionRange(selectionStart, selectionEnd);
        }
        else if (input.createTextRange) {
          var range = input.createTextRange();
          range.collapse(true);
          range.moveEnd('character', selectionEnd);
          range.moveStart('character', selectionStart);
          range.select();
        }
      }, 

      setCaretToPos: function (input, pos) {
        this.setSelectionRange(input, pos, pos);
      }

    });
    
    var defaultDiacriticsRemovalMap = [
      {'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
      {'base':'AA','letters':/[\uA732]/g},
      {'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
      {'base':'AO','letters':/[\uA734]/g},
      {'base':'AU','letters':/[\uA736]/g},
      {'base':'AV','letters':/[\uA738\uA73A]/g},
      {'base':'AY','letters':/[\uA73C]/g},
      {'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
      {'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u1E08\u0187\u023B\uA73E]/g},
      {'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
      {'base':'DZ','letters':/[\u01F1\u01C4]/g},
      {'base':'Dz','letters':/[\u01F2\u01C5]/g},
      {'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
      {'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
      {'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
      {'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
      {'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
      {'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
      {'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
      {'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
      {'base':'LJ','letters':/[\u01C7]/g},
      {'base':'Lj','letters':/[\u01C8]/g},
      {'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
      {'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
      {'base':'NJ','letters':/[\u01CA]/g},
      {'base':'Nj','letters':/[\u01CB]/g},
      {'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
      {'base':'OI','letters':/[\u01A2]/g},
      {'base':'OO','letters':/[\uA74E]/g},
      {'base':'OU','letters':/[\u0222]/g},
      {'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
      {'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
      {'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
      {'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
      {'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
      {'base':'TZ','letters':/[\uA728]/g},
      {'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
      {'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
      {'base':'VY','letters':/[\uA760]/g},
      {'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
      {'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
      {'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
      {'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
      {'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
      {'base':'aa','letters':/[\uA733]/g},
      {'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
      {'base':'ao','letters':/[\uA735]/g},
      {'base':'au','letters':/[\uA737]/g},
      {'base':'av','letters':/[\uA739\uA73B]/g},
      {'base':'ay','letters':/[\uA73D]/g},
      {'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
      {'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u1E09\u0188\u023C\uA73F\u2184]/g},
      {'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
      {'base':'dz','letters':/[\u01F3\u01C6]/g},
      {'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
      {'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
      {'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
      {'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
      {'base':'hv','letters':/[\u0195]/g},
      {'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
      {'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
      {'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
      {'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
      {'base':'lj','letters':/[\u01C9]/g},
      {'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
      {'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
      {'base':'nj','letters':/[\u01CC]/g},
      {'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
      {'base':'oi','letters':/[\u01A3]/g},
      {'base':'ou','letters':/[\u0223]/g},
      {'base':'oo','letters':/[\uA74F]/g},
      {'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
      {'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
      {'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
      {'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
      {'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
      {'base':'tz','letters':/[\uA729]/g},
      {'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
      {'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
      {'base':'vy','letters':/[\uA761]/g},
      {'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
      {'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
      {'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
      {'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
    ];

    var changes;
    function removeDiacritics (str) {
        if(!changes) {
            changes = defaultDiacriticsRemovalMap;
        }
        for(var i=0; i<changes.length; i++) {
            str = str.replace(changes[i].letters, changes[i].base);
        }
        return str;
    }

    return view;
  }
);



window.app = window.app || {};


define(['backbone'], function (Backbone) {

    return Backbone.View.extend({

      id: 'portrait-lock', 
      className:'hidden', 
      events: {
        'click': 'onThisClicked', 
        
      }, 

      initialize: function () {
        this.template = app.tpl.get(this.id);

        _.bindAll(this);
        this.onOrientationChange();
        window.addEventListener('orientationchange', this.onOrientationChange);
      }, 

      destroy: function () {
        this.template = null;
        this.remove();
      }, 

      render: function () {
        this.$el.html(_.template( this.template ));

        TweenMax.from(this.$el.find('.message'), .4, {delay:.25, css:{opacity:0}});
        return this;
      }, 

      onThisClicked: function (e) {
        e.preventDefault();
        e.stopPropagation();
      }, 

      onOrientationChange: function (e) {        
        console.log("Orientation Change", e);
        var that = this;
        window.setTimeout( function(){
          var w = $(window).width();

          if (w <= 320) {
            console.log("Portrait lock on");
            app.baseEl.addClass('hidden');
            if (app.router.currentSheet) app.sheetEl.addClass('hidden');

            that.$el.removeClass('hidden');
            that.render();

          } else {
            console.log("Portrait lock off");
            
            that.$el.addClass('hidden');
            that.$el.empty();

            if (app.router.currentSheet) {
              app.sheetEl.removeClass('hidden');          
            } else {
              app.baseEl.removeClass('hidden');            
            }
          }
        }, 500);
      }

    });
  }
);


window.app = window.app || {};


define(['backbone', 'moment', 'sentenceView'], 
  function (Backbone, moment, SentenceView) {

    return Backbone.View.extend({

      className: 'message',
      isDestroyed: false, 

      initialize: function () {        
        this.template = app.tpl.get('message');
        _.bindAll(this);
      }, 

      destroy: function () {
        this.isDestroyed = true;

        this.sentence.off('loadingComplete', this.show);
        this.sentence.destroy();
        this.remove();
      }, 

      render: function () {
        this.$el.html(_.template( this.template, this.templateData() ));
        this.$userInfoEl = this.$el.find('.user-info');

        this.sentence = new SentenceView({ id:'sentence-'+this.model.get('id'), model:this.model });
        this.sentence.once('loadingComplete', this.show);
        this.$el.prepend( this.sentence.render().el );

        this.sentence.$el.find('.cover').removeClass('hidden');

        return this;
      }, 

      show: function () {
        if (this.isDestroyed) return;

        TweenMax.from(this.$userInfoEl, .75, {css:{opacity:0}});
        this.$userInfoEl.removeClass('hidden');

        this.trigger('show');
      }, 

      pauseSequence: function () {
        this.sentence.pauseSequence();
      }, 

      resumeSequence: function () {
        this.sentence.resumeSequence();
      }, 

      templateData: function () {
        var date = moment(this.model.get('date'));
        if ( date.diff() > 0 ){
          date = moment();
        }
        
        return {
          user: this.model.get('user'), 
          date: date.fromNow()
        };
      }

    });
  }
);
