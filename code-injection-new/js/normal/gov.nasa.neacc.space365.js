







            
            document.addEventListener("deviceready", function() {
                                      console.log("Pulse: Initializing");
                                      Pulse.initialize({environment: "production", 
                                                       application: "Space365", 
                                                       applicationVersion: "2.0.0"});
                                      console.log("Pulse: Finished Init");
                                      
                                      console.log("Pulse: Reporting");
                                      Pulse.startVisit();                                  
                                      
                                      }, true);
            







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
        











                    
                    // result contains any message sent from the plugin call
                    function successHandler(result) {
                        //alert('result = '+result)
                    }
                    
                    // result contains any error description text returned from the plugin call
                    function errorHandler(error) {
                        //alert('error = '+error)
                    }
                    
                    function tokenHandler(result) {
                        // Your iOS push server needs to know the token before it can push to this device
                        // here is where you might want to send it the token for later use.
                        console.log('device token = '+result);
                        Pulse.setNotificationRegistrationId(result);
                    }
                    
                    // iOS
                    function onNotificationAPN(event) {
                        if (event.alert) {
                            navigator.notification.alert(event.alert);
                        }
                        
                        if (event.sound) {
                            var snd = new Media(event.sound);
                            snd.play();
                        }
                        
                        if (event.badge) {
                            pushNotification.setApplicationIconBadgeNumber(successHandler, event.badge);
                        }
                    }
                    
                    // Android
function onNotificationGCM(e)
  {
	//alert("On Notify " + e);
    switch (e.event)
    {
      case 'registered':
        if (e.regid.length > 0)
        {
          //alert("Got registration id " + e.regid);
          Pulse.setNotificationRegistrationId(e.regid);
        }
        break;

      case 'message':
        //alert(e.payload.message);
        break;

      case 'error':
        console.log("NOTIFICATION ERROR: " + e.msg);
        break;

      default:
        break;
    }
  }                    
                    document.addEventListener("deviceready", function() {
                                              console.log("Pulse: Initializing");
                                              Pulse.initialize({environment: "production",
                                                               application: "Space365",
                                                               applicationVersion: "2.2.0"});
                                              console.log("Pulse: Finished Init");
                                              
                                              console.log("Pulse: Reporting");
                                              Pulse.startVisit();
                                              console.log("Pulse start finished");
                                              
                                              console.log("PushNotification: Register");
                                              var pushNotification;
                                              pushNotification = window.plugins.pushNotification;
                                              console.log("pushNotification = " +pushNotification);
                                              if (device.platform == 'android' || device.platform == 'Android') {
                                                  pushNotification.register(successHandler, errorHandler,{"senderID":"661780372179","ecb":"onNotificationGCM"});
                                              } else {
                                                  pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});
                                              }
                                              
                                              }, true);

                    







        if (!Ext.browser.is.WebKit) {
            alert("The current browser is unsupported.\n\nSupported browsers:\n" +
                "Google Chrome\n" +
                "Apple Safari\n" +
                "Mobile Safari (iOS)\n" +
                "Android Browser\n" +
                "BlackBerry Browser"
            );
        }
    

var eonlineStore = Ext.getStore('EventsJsonStore'),
    elocalStore = Ext.create('Ext.data.Store', {
        model: "Space365.model.EventOfflineModel"
    }),
    me = this;

elocalStore.load();

/*
* When app is online, store all the records to HTML5 local storage.
* This will be used as a fallback if app is offline more
*/

if (!elocalStore.getCount()) {

    //Ext.Msg.alert('Initial Launch','Loading initial Space365 Event data.');    

    eonlineStore.on('refresh', function (store, records) {

        // Get rid of old records, so store can be repopulated with latest details
        elocalStore.getProxy().clear();

        store.each(function(record) {

            var rec = {
                item : record.data.item,
                event_date : record.data.event_date,
                short_text : record.data.short_text,
                image : record.data.image
            };

            elocalStore.add(rec);
            elocalStore.sync();
        });

    });

}

Ext.Viewport.setMasked(false);

/*
* If app is offline a Proxy exception will be thrown. If that happens then use
* the fallback / local stoage store instead
*/
eonlineStore.getProxy().on('exception', function () {
    //me.getNewsList().setStore(localStore); //rebind the view to the local store
    elocalStore.load(); // This causes the "loading" mask to disappear
    //Ext.Msg.alert('Notice', 'You are using local data!', Ext.emptyFn); //alert the user that they are in offline mode
});


/**
 * Pinch Zoom Image
 * creates a pinch zoom able image in a scrollable container
 *
 * Can be uses with dynamic size from the height width of the container
 *
 * @example
 *     {
 *         flex: 1,
 *         xtype: 'pinchzoomimage',
 *         src: '/resources/images/casinomenu.jpg'
 *     }
 *
 * or with fixed sizes
 *
 * {
 *         xtype: 'pinchzoomimage',
 *         src: '/resources/images/casinomenu.jpg',
 *         width: 320,
 *         height: 440
 *     }
 *
 *
 * @author     Nils Dehl <mail@nils-dehl.de>
 * @www     http://www.nils-dehl.de
 *
 * @version: 1.0.0
 */
Ext.define('Ux.PinchZoomImage', {
    extend: 'Ext.Container',
    xtype: 'pinchzoomimage',
    alias: 'widget.pinchzoomimage',


    config: {
        /**
         * Image src url
         *
         * @type String
         */
        src: '',


        /**
         * height of the pinchzoom image
         *
         * @type int
         */
        height: null,


        /**
         * width of the pinchzoom image
         *
         * @type int
         */
        width: null,


        scrollable: true,
        listeners: {
            painted: 'initImage'
        }
    },


    /**
     * init the image in the scrollable container
     *
     * @param {} newImageSrc
     */
    initImage: function(newImageSrc) {
        var height = this.getHeight() || this.element.getHeight(),
            width = this.getWidth() || this.element.getWidth(),
            src = this.getSrc() || newImageSrc,
            image = null;


            if (Ext.isString(src) && src !== '') {
            image = Ext.create('Ext.Img', {
                // set mode auf empty to create a real image tag
                mode: '',
                height: height,
                width: width,
                src: src,
                listeners: {
                    pinch: {
                        element: 'element',
                        fn: this.onImagePinch


                    },
                    doubletap: {
                        element: 'element',
                        fn: this.onImageDoubletap
                    }
                }
            });


            this.add(image);
        }
    },


    /**
     * reset the image to initial size
     *
     * @param {} e
     */
    onImageDoubletap: function(e) {
        var initialWidth  = this.getInitialConfig('width'),
            initialHeight = this.getInitialConfig('height'),
            container     = this,
            image         = this.element;




        container.setWidth(initialWidth);
        container.setHeight(initialHeight);
        image.setWidth(initialWidth);
        image.setHeight(initialHeight);
    },


    /**
     * on image pinch scale the image size
     * and set the scroller to a new position
     *
     * @param {} e eventobject
     */
    onImagePinch: function(e) {
        var initialWidth  = this.getInitialConfig('width'),
            initialHeight = this.getInitialConfig('height'),
            newWidth      = initialWidth * e.scale,
            newHeight     = initialHeight * e.scale,
            container     = this,
            image         = this.element,
            scroller = this.up('container').getScrollable().getScroller(),
            pos = scroller.getMaxPosition();




        container.setWidth(newWidth);
        container.setHeight(newHeight);
        image.setWidth(newWidth);
        image.setHeight(newHeight);
        scroller.scrollTo(pos.x/2, pos.y/2);
    },


    /**
     * if set Src is called and an
     * old image exist destroy the old
     * one and add the new one
     *
     * @param {} newImageSrc
     * @param {} oldImageSrc
     */
    applySrc: function(newImageSrc) {
        var oldImage = this.down('img');


        if (Ext.isObject(oldImage)) {
            oldImage.destroy();
        }


        this.initImage(newImageSrc);
    }


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
},
    
};


/*
 * Ext.ux.ImageViewer
 *
 * A zoom-able Image Viewer Class for the Sencha Touch 2.0 Framework.
 *
 * Initial work by Perdiga with thanks to Armode for the help, publicated at Sencha Forum:
 * http://www.sencha.com/forum/showthread.php?197903-Pinch-Image-with-carousel-and-working-fine
 * 
 * Based on work by themightychris:
 * http://www.sencha.com/forum/showthread.php?137632-mostly-working-pinch-zoom-image-carousel-help-perfect-it!
 *
 * @updated till 2012-08 Many enhancements and BugFixes by users of the Sencha Forum
 * @updated 2012-08-24   by Dipl.-Ing. (FH) André Fiedler (https://twitter.com/sonnenkiste)
 * Collected Enhancements from the Forum, Code Cleanup and Formating, Demos
 */
Ext.define('Ext.ux.ImageViewer', {

    extend: 'Ext.Container',
    xtype : 'imageviewer',
    alias : 'widget.imageviewer',
    
    config: {
        doubleTapScale: 1,
        maxScale      : 4,
        loadingMask   : true,
        previewSrc    : false,
        resizeOnLoad  : true,
        imageSrc      : false,
        initOnActivate: false,
        cls           : 'imageBox',
        scrollable    : 'both',
        loadingMessage: 'Loading ...',
        html          : '<figure><img></figure>',
        errorImage    : false
    },
    
    duringDestroy: false,
    
    initialize: function() {
        var me = this;
        
        if (me.getInitOnActivate()) {
            me.on('activate', me.initViewer, me, {
                delay: 10, 
                single: true
            });
        } else {
            me.on('painted', me.initViewer, me, {
                delay: 10, 
                single: true
            });
        }
    },

    initViewer: function() {
        var me = this,
            scroller = me.getScrollable().getScroller(),
            element = me.element;

        //disable scroller
        scroller.setDisabled(true);

        // mask image viewer
        if (me.getLoadingMask()) {
            me.setMasked({
                xtype : 'loadmask',
                message : me.getLoadingMessage()
            });
        }

        // retrieve DOM els
        me.figEl = element.down('figure');
        me.imgEl = me.figEl.down('img');

        // apply required styles
        me.figEl.setStyle({
            overflow : 'hidden',
            display : 'block',
            margin : 0
        });

        me.imgEl.setStyle({
            '-webkit-user-drag' : 'none',
            '-webkit-transform-origin' : '0 0',
            'visibility' : 'hidden'
        });

        // show preview
        if (me.getPreviewSrc()) {
            element.setStyle({
                backgroundImage : 'url(' + me.getPreviewSrc() + ')',
                backgroundPosition : 'center center',
                backgroundRepeat : 'no-repeat',
                webkitBackgroundSize : 'contain'
            });
        }

        // attach event listeners
        me.on('load', me.onImageLoad, me);
        me.imgEl.addListener({
            scope : me,
            doubletap : me.onDoubleTap,
            pinchstart : me.onImagePinchStart,
            pinch : me.onImagePinch,
            pinchend : me.onImagePinchEnd
        });

        // load image
        if (me.getImageSrc()) {
            me.loadImage(me.getImageSrc());
        }
    },

    loadImage: function(src) {
        var me = this;
        if (me.imgEl) {
            me.imgEl.dom.src = src;
            me.imgEl.dom.onload = Ext.Function.bind(me.onLoad, me, me.imgEl, 0);
            if(me.getErrorImage()){
                me.imgEl.dom.onerror = function() {
                    this.src = me.getErrorImage();
                };
            }
        } else {
            me.setImageSrc(src);
        }
    },
    
    unloadImage: function() {  
        var me = this;
    
        // mask image viewer
        if (me.getLoadingMask()) {
            me.setMasked({
                xtype: 'loadmask',
                message:me.getLoadingMessage()
            });
        }
    
        if (me.imgEl) {
            me.imgEl.dom.src = '';
            me.imgEl.setStyle({ visibility: 'hidden' });
        } else {
            me.setImageSrc('');
            me.imgEl.setStyle({ visibility: 'hidden' });
        }
    },

    onLoad : function(el, e) {
        var me = this;
        me.fireEvent('load', me, el, e);
    },

    onImageLoad : function() {
        var me = this,
            parentElement = me.parent.element;

        // get viewport size
        me.viewportWidth = me.viewportWidth || me.getWidth() || parentElement.getWidth();
        me.viewportHeight = me.viewportHeight || me.getHeight() || parentElement.getHeight();

        // grab image size
        me.imgWidth = me.imgEl.dom.width;
        me.imgHeight = me.imgEl.dom.height;

        // calculate and apply initial scale to fit image to screen
        if (me.getResizeOnLoad()) {
            me.scale = me.baseScale = Math.min(me.viewportWidth / me.imgWidth, me.viewportHeight / me.imgHeight);
            me.setMaxScale(me.scale * 4);
        } else {
            me.scale = me.baseScale = 1;
        }

        // calc initial translation
        var tmpTranslateX = (me.viewportWidth - me.baseScale * me.imgWidth) / 2,
            tmpTranslateY = (me.viewportHeight - me.baseScale * me.imgHeight) / 2;
        
        // set initial translation to center
        me.setTranslation(tmpTranslateX, tmpTranslateY);
        me.translateBaseX = me.translateX;
        me.translateBaseY = me.translateY;

        // apply initial scale and translation
        me.applyTransform();

        // initialize scroller configuration
        me.adjustScroller();

        // show image and remove mask
        me.imgEl.setStyle({
            visibility : 'visible'
        });

        // remove preview
        if (me.getPreviewSrc()) {
            me.element.setStyle({
                backgroundImage : 'none'
            });
        }

        if (me.getLoadingMask()) {
            me.setMasked(false);
        }

        me.fireEvent('imageLoaded', me);
    },

    onImagePinchStart: function(ev) {
        var me = this,
            scroller = me.getScrollable().getScroller(),
            scrollPosition = scroller.position,
            touches = ev.touches,
            element = me.element,
            scale = me.scale;

        // disable scrolling during pinch
        scroller.stopAnimation();
        scroller.setDisabled(true);

        // store beginning scale
        me.startScale = scale;

        // calculate touch midpoint relative to image viewport
        me.originViewportX = (touches[0].pageX + touches[1].pageX) / 2 - element.getX();
        me.originViewportY = (touches[0].pageY + touches[1].pageY) / 2 - element.getY();

        // translate viewport origin to position on scaled image
        me.originScaledImgX = me.originViewportX + scrollPosition.x - me.translateX;
        me.originScaledImgY = me.originViewportY + scrollPosition.y - me.translateY;

        // unscale to find origin on full size image
        me.originFullImgX = me.originScaledImgX / scale;
        me.originFullImgY = me.originScaledImgY / scale;

        // calculate translation needed to counteract new origin and keep image in same position on screen
        me.translateX += (-1 * ((me.imgWidth * (1 - scale)) * (me.originFullImgX / me.imgWidth)));
        me.translateY += (-1 * ((me.imgHeight * (1 - scale)) * (me.originFullImgY / me.imgHeight)));

        // apply new origin
        me.setOrigin(me.originFullImgX, me.originFullImgY);

        // apply translate and scale CSS
        me.applyTransform();
    },

    onImagePinch: function(ev) {
        var me = this;
        
        // prevent scaling to smaller than screen size
        me.scale = Ext.Number.constrain(ev.scale * me.startScale, me.baseScale - 2, me.getMaxScale());
        me.applyTransform();
    },

    onImagePinchEnd : function(ev) {
        var me = this;

        // set new translation
        if (me.scale == me.baseScale) {
            // move to center
            me.setTranslation(me.translateBaseX, me.translateBaseY);
        } else {
            //Resize to init size like ios
            if (me.scale < me.baseScale && me.getResizeOnLoad()) {
                me.resetZoom();
                return;
            }
            // calculate rescaled origin
            me.originReScaledImgX = me.originScaledImgX * (me.scale / me.startScale);
            me.originReScaledImgY = me.originScaledImgY * (me.scale / me.startScale);

            // maintain zoom position
            me.setTranslation(me.originViewportX - me.originReScaledImgX, me.originViewportY - me.originReScaledImgY);
        }
        // reset origin and update transform with new translation
        me.setOrigin(0, 0);
        me.applyTransform();

        // adjust scroll container
        me.adjustScroller();
    },

    onZoomIn: function() {
        var me = this,
            ev = {
                pageX: 0,
                pageY: 0
            },
            myScale = me.scale;
            
        if (myScale < me.getMaxScale()) {
            myScale = me.scale + 0.05;
        }
        
        if (myScale >= me.getMaxScale()) {
            myScale = me.getMaxScale();
        }

        ev.pageX = me.viewportWidth / 2;
        ev.pageY = me.viewportHeight / 2;
        
        me.zoomImage(ev, myScale);
    },

    onZoomOut: function() {
        var me = this,
            ev = {
                pageX: 0,
                pageY: 0
            },
            myScale = me.scale;
            
        if (myScale > me.baseScale) {
            myScale = me.scale - 0.05;
        }
        
        if (myScale <= me.baseScale) {
            myScale = me.baseScale;
        }

        ev.pageX = me.viewportWidth / 2;
        ev.pageY = me.viewportHeight / 2;
        
        me.zoomImage(ev, myScale);
    },

    zoomImage: function(ev, scale, scope) {
        var me = this,
            scroller = me.getScrollable().getScroller(),
            scrollPosition = scroller.position,
            element = me.element;

        // zoom in toward tap position
        var oldScale = me.scale,
            newScale = scale,
            originViewportX = ev ? (ev.pageX - element.getX()) : 0,
            originViewportY = ev ? (ev.pageY - element.getY()) : 0,
            originScaledImgX = originViewportX + scrollPosition.x - me.translateX,
            originScaledImgY = originViewportY + scrollPosition.y - me.translateY,
            originReScaledImgX = originScaledImgX * (newScale / oldScale),
            originReScaledImgY = originScaledImgY * (newScale / oldScale);

        me.scale = newScale;
        setTimeout(function() {
            me.setTranslation(originViewportX - originReScaledImgX, originViewportY - originReScaledImgY);
            // reset origin and update transform with new translation
            //that.setOrigin(0, 0);

            // reset origin and update transform with new translation
            me.applyTransform();

            // adjust scroll container
            me.adjustScroller();

            // force repaint to solve occasional iOS rendering delay
            Ext.repaint();
        }, 50);
    },

    onDoubleTap: function(ev, t) {
        var me = this,
            scroller = me.getScrollable().getScroller(),
            scrollPosition = scroller.position,
            element = me.element;

        if (!me.getDoubleTapScale()){
            return false;
        }

        // set scale and translation
        if (me.scale > me.baseScale) {
            // zoom out to base view
            me.scale = me.baseScale;
            me.setTranslation(me.translateBaseX, me.translateBaseY);
            // reset origin and update transform with new translation
            me.applyTransform();

            // adjust scroll container
            me.adjustScroller();

            // force repaint to solve occasional iOS rendering delay
            Ext.repaint();
        } else {
            // zoom in toward tap position
            var oldScale = me.scale,
                newScale = me.baseScale * 4,

                originViewportX = ev ? (ev.pageX - element.getX()) : 0,
                originViewportY = ev ? (ev.pageY - element.getY()) : 0,

                originScaledImgX = originViewportX + scrollPosition.x - me.translateX,
                originScaledImgY = originViewportY + scrollPosition.y - me.translateY,

                originReScaledImgX = originScaledImgX * (newScale / oldScale),
                originReScaledImgY = originScaledImgY * (newScale / oldScale);

            me.scale = newScale;

            //smoothes the transition
            setTimeout(function() {
                me.setTranslation(originViewportX - originReScaledImgX, originViewportY - originReScaledImgY);
                // reset origin and update transform with new translation
                me.applyTransform();

                // adjust scroll container
                me.adjustScroller();

                // force repaint to solve occasional iOS rendering delay
                Ext.repaint();
            }, 50);
        }
    },

    setOrigin: function(x, y) {
        this.imgEl.dom.style.webkitTransformOrigin = x + 'px ' + y + 'px';
    },

    setTranslation: function(translateX, translateY) {
        var me = this;
        
        me.translateX = translateX;
        me.translateY = translateY;

        // transfer negative translations to scroll offset
        me.scrollX = me.scrollY = 0;

        if (me.translateX < 0) {
            me.scrollX = me.translateX;
            me.translateX = 0;
        }
        if (me.translateY < 0) {
            me.scrollY = me.translateY;
            me.translateY = 0;
        }
    },

    resetZoom: function() {
        var me = this;
        
        if (me.duringDestroy) {
            return;
        }
        
        //Resize to init size like ios
        me.scale = me.baseScale;

        me.setTranslation(me.translateBaseX, me.translateBaseY);

        // reset origin and update transform with new translation
        me.setOrigin(0, 0);
        me.applyTransform();

        // adjust scroll container
        me.adjustScroller();

    },
    
    resize: function() {
        var me = this;
        
        // get viewport size
        me.viewportWidth = me.parent.element.getWidth() || me.viewportWidth || me.getWidth();
        me.viewportHeight = me.parent.element.getHeight() || me.viewportHeight || me.getHeight();

        // grab image size
        me.imgWidth = me.imgEl.dom.width;
        me.imgHeight = me.imgEl.dom.height;

        // calculate and apply initial scale to fit image to screen
        if (me.getResizeOnLoad()) {
            me.scale = me.baseScale = Math.min(me.viewportWidth / me.imgWidth, me.viewportHeight / me.imgHeight);
            me.setMaxScale(me.scale * 4);
        } else {
            me.scale = me.baseScale = 1;
        }

        // set initial translation to center
        me.translateX = me.translateBaseX = (me.viewportWidth - me.baseScale * me.imgWidth) / 2;
        me.translateY = me.translateBaseY = (me.viewportHeight - me.baseScale * me.imgHeight) / 2;

        // apply initial scale and translation
        me.applyTransform();

        // initialize scroller configuration
        me.adjustScroller();
    },

    applyTransform: function() {
        var me = this,
            fixedX = Ext.Number.toFixed(me.translateX, 5),
            fixedY = Ext.Number.toFixed(me.translateY, 5),
            fixedScale = Ext.Number.toFixed(me.scale, 8);

        if (Ext.os.is.Android) {
            me.imgEl.dom.style.webkitTransform =
            //'translate('+fixedX+'px, '+fixedY+'px)'
            //+' scale('+fixedScale+','+fixedScale+')';
            'matrix(' + fixedScale + ',0,0,' + fixedScale + ',' + fixedX + ',' + fixedY + ')';
        } else {
            me.imgEl.dom.style.webkitTransform = 'translate3d(' + fixedX + 'px, ' + fixedY + 'px, 0)' + ' scale3d(' + fixedScale + ',' + fixedScale + ',1)';
        }
    },

    adjustScroller: function() {
        var me = this,
            scroller = me.getScrollable().getScroller(),
            scale = me.scale;

        // disable scrolling if zoomed out completely, else enable it
        if (scale == me.baseScale) {
            scroller.setDisabled(true);
        } else {
            scroller.setDisabled(false);
        }

        // size container to final image size
        var boundWidth = Math.max(me.imgWidth * scale + 2 * me.translateX, me.viewportWidth);
        var boundHeight = Math.max(me.imgHeight * scale + 2 * me.translateY, me.viewportHeight);

        me.figEl.setStyle({
            width : boundWidth + 'px',
            height: boundHeight + 'px'
        });

        // update scroller to new content size
        scroller.refresh();

        // apply scroll
        var x = 0;
        if (me.scrollX) {
            x = me.scrollX;
        }
        
        var y = 0;
        if (me.scrollY) {
            y = me.scrollY;
        }
        
        scroller.scrollTo(x * -1, y * -1);
    },
    
    destroy: function() {
        var me = this;
        
        me.duringDestroy = true;
        
        me.un('activate', me.initViewer, me);
        me.un('painted', me.initViewer, me);
        
        Ext.destroy(me.getScrollable(), me.imgEl);
        
        me.callParent();
    }
});
