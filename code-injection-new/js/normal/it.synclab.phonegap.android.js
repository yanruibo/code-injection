





var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-37219455-1']);
_gaq.push(['_setDomainName', 'none']);
_gaq.push(['_trackPageview', 'RoccarasoSki.Main.Page']);





	$(document).bind("mobileinit", function(){
		$.mobile.allowCrossDomainPages = true;
		$.mobile.buttonMarkup.hoverDelay = 10
		$.mobile.defaultPageTransition="none";
	});
	












	var Application;
	$.RoccarasoSki_Model.Application = Class.extend({
		init: function(){
			this.currentPage;
			this.currentMap;

			this.content;
			this.tabbar;
			this.topbar;
			
			this.userAgent = window.navigator.userAgent; 

			this.i386 = false;
			if( this.userAgent.indexOf( "Intel" ) > -1 )
				this.i386 =  true;
			
			this._waitingElement = $("#waiting");
			this._opsElement = $("#ops-error");
			var that = this;
			$(document).smartpreload({ 
				images: ["./css/images/locateme.png",
				         "./css/images/locateme-active.png",
				         "./css/images/waiting-background.png",
				         "./css/images/zoom-in.png",
				         "./css/images/zoom-out.png",
				         "./img/background_texture_gray.png",
				         "./img/bargreenbackground_selected.png",
				         "./img/bargreenbackground.png",
				         "./img/barredbackground.png",
				         "./img/roccarasoski.png",
				         "./img/topbar.png",
				         "./img/cabinovia.png",
				         "./img/impianti.png",
				         "./img/mappa.png",
				         "./img/meteo.png",
				         "./img/seggiovia.png",
				         "./img/sciovia.png",
				         "./img/share.png",
				         "./img/webcam.png",
				         "./img/manovia.png",
				         "./images/ops.png",
				         ], 
				onloadall: function() {
					if ( that.i386 || true )
						$.mobile.changePage("#main", {changeHash: false});
					else
						document.addEventListener('deviceready', that.onDeviceReady.bind(that), false);					
				}
			});					
			
		},
		onDeviceReady: function(){
			$.mobile.changePage("#main", {changeHash: false});
		},
		opsElement: function(){
			return this._opsElement.clone();
		},
		waitingElement: function(){
			return this._waitingElement.clone();
		},
		start: function(){
			this.content = $("#content");
			this.tabbar = $("#tabbar");
			this.tabbar.bind("click", this.tabbarfnx.bind(this));
			this.topbar = $("#topbar");
			var document = $(window);
			var hvalue = document.height()-this.tabbar.height()-this.topbar.height();
			if ( this.isiOSDevice() ) {
				;
			}else{
				this.content.parent().append(this.content);
			}
			
			this.content.css({ "width": document.width(), "height": hvalue });

			if ( this.currentPage == null ){
	            this.tabbarfnx(null, "mappa");
			}			
		},
		isiOSDevice: function(){
			return this.userAgent.match(/iPad/i) || this.userAgent.match(/iPhone/i);
		},
		loading: function(){
			this.content.append("Loading");
		},
		tabbarfnx: function(e, pageName ){
			var li, id;
			if ( e != null ){
				li = $(e.target).parents("li");
				id = li.data("id");
			}else{
				li = $("li[data-id="+pageName+"]");
				id = pageName;
			}

			if ( this.currentPage == null || this.currentPage != null && this.currentPage.name != id ){		
				if ( id != "condividi"){
					$(".ui-bar-b-selected").each( function(){ $(this).removeClass("ui-bar-b-selected") });
					li.addClass("ui-bar-b-selected");
					
					if ( this.currentPage != null && this.currentPage.removeFromParent != undefined )
						this.currentPage.removeFromParent();						
				}
								
				if (_gaq) _gaq.push(['_trackEvent', "roccaraso.ski", "click", id, id]);
				
				if( id  == "piste" ){
					this.currentPage = new $.RoccarasoSki_Model.Stazione( this.content );
				}else if ( id == "mappa" ){
					if ( this.currentMap == null ){
						this.currentMap  = new $.RoccarasoSki_Model.Mappa( this.content );
					}else{
						this.currentMap.showOnPage();
					}
					this.currentPage = this.currentMap; //tmp				
				}else if(id=="webcam"){		
					this.currentPage = new $.RoccarasoSki_Model.WebCam(this.content );					
				}else if(id=="meteo"){
					this.currentPage = new $.RoccarasoSki_Model.Meteo( this.content );						
				}else if ( id == "condividi"){
					window.open("http://facebook.com", "_blank");
					//navigator.app.loadUrl( "http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent( "http://www.facebook.com/pages/Roccaraso-ski-smartphone-app/477768842273951" )+"&t=Un modo nuovo per sciare informati", { openExternal:true } );
				}
			}
		}
	});

	$("#index").live("pageinit", function(){
		if ( Application == null ){
			Application = new $.RoccarasoSki_Model.Application();
		}		
	});
	
	$("#main").live("pageinit", function(){
		if ( Application == null ){
			Application = new $.RoccarasoSki_Model.Application();
		}
		setTimeout( function(){ Application.start(); }, 100 );

	})

	$("#stazione-dati").live("tap", function(){
		//navigator.app.loadUrl('http://www.roccaraso.net/', { openExternal:true } ); 
	});
	







	    var _gaq = _gaq || [];
	    _gaq.push(['_setAccount', 'UA-37219455-1']);
	    _gaq.push(['_setDomainName', 'none']);
	    _gaq.push(['_trackPageview', 'RoccarasoSki.Starting.Page']);
	    



            app.initialize();
        



			    //<![CDATA[

			    /*
			     * Constants for given map
			     * TODO: read it from tilemapresource.xml
			     */

			    var mapBounds = new GLatLngBounds(new GLatLng(41.8099943643, 13.98919), new GLatLng(41.85393, 14.0395561243));
			    var mapMinZoom = 13;
			    var mapMaxZoom = 16;

			    var opacity = 0.75;
			    var map;
			    var ge;
			    var hybridOverlay;

			    /*
			     * Create a Custom Opacity GControl
			     * http://www.maptiler.org/google-maps-overlay-opacity-control/
			     */

			    var CTransparencyLENGTH = 58; 
			    // maximum width that the knob can move (slide width minus knob width)

			    function CTransparencyControl( overlay ) {
			        this.overlay = overlay;
			        this.opacity = overlay.getTileLayer().getOpacity();
			    }
			    CTransparencyControl.prototype = new GControl();

			    // This function positions the slider to match the specified opacity
			    CTransparencyControl.prototype.setSlider = function(pos) {
			        var left = Math.round((CTransparencyLENGTH*pos));
			        this.slide.left = left;
			        this.knob.style.left = left+"px";
			        this.knob.style.top = "0px";
			    }

			    // This function reads the slider and sets the overlay opacity level
			    CTransparencyControl.prototype.setOpacity = function() {
				    // set the global variable
			        opacity = this.slide.left/CTransparencyLENGTH;
			        this.map.clearOverlays();
			        this.map.addOverlay(this.overlay, { zPriority: 0 });
			        if (this.map.getCurrentMapType() == G_HYBRID_MAP) {
			            this.map.addOverlay(hybridOverlay);
			        }
			    }

			    // This gets called by the API when addControl(new CTransparencyControl())
			    CTransparencyControl.prototype.initialize = function(map) {
			        var that=this;
			        this.map = map;

			        // Is this MSIE, if so we need to use AlphaImageLoader
			        var agent = navigator.userAgent.toLowerCase();
			        if ((agent.indexOf("msie") > -1) && (agent.indexOf("opera") < 1)){this.ie = true} else {this.ie = false}

			        // create the background graphic as a <div> containing an image
			        var container = document.createElement("div");
			        container.style.width="70px";
			        container.style.height="21px";

			        // Handle transparent PNG files in MSIE
			        if (this.ie) {
			          var loader = "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://www.maptiler.org/img/opacity-slider.png', sizingMethod='crop');";
			          container.innerHTML = '<div style="height:21px; width:70px; ' +loader+ '" ></div>';
			        } else {
			          container.innerHTML = '<div style="height:21px; width:70px; background-image: url(http://www.maptiler.org/img/opacity-slider.png)" ></div>';
			        }

			        // create the knob as a GDraggableObject
			        // Handle transparent PNG files in MSIE
			        if (this.ie) {
			          var loader = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://www.maptiler.org/img/opacity-slider.png', sizingMethod='crop');";
			          this.knob = document.createElement("div"); 
			          this.knob.style.height="21px";
			          this.knob.style.width="13px";
				  this.knob.style.overflow="hidden";
			          this.knob_img = document.createElement("div"); 
			          this.knob_img.style.height="21px";
			          this.knob_img.style.width="83px";
			          this.knob_img.style.filter=loader;
				  this.knob_img.style.position="relative";
				  this.knob_img.style.left="-70px";
			          this.knob.appendChild(this.knob_img);
			        } else {
			          this.knob = document.createElement("div"); 
			          this.knob.style.height="21px";
			          this.knob.style.width="13px";
			          this.knob.style.backgroundImage="url(http://www.maptiler.org/img/opacity-slider.png)";
			          this.knob.style.backgroundPosition="-70px 0px";
			        }
			        container.appendChild(this.knob);
			        this.slide=new GDraggableObject(this.knob, {container:container});
			        this.slide.setDraggableCursor('pointer');
			        this.slide.setDraggingCursor('pointer');
			        this.container = container;

			        // attach the control to the map
			        map.getContainer().appendChild(container);

			        // init slider
			        this.setSlider(this.opacity);

			        // Listen for the slider being moved and set the opacity
			        GEvent.addListener(this.slide, "dragend", function() {that.setOpacity()});
			        //GEvent.addListener(this.container, "click", function( x, y ) { alert(x, y) });

			        return container;
			      }

			      // Set the default position for the control
			      CTransparencyControl.prototype.getDefaultPosition = function() {
			        return new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(7, 47));
			      }

			    /*
			     * Full-screen Window Resize
			     */

			    function getWindowHeight() {
			        if (self.innerHeight) return self.innerHeight;
			        if (document.documentElement && document.documentElement.clientHeight)
			            return document.documentElement.clientHeight;
			        if (document.body) return document.body.clientHeight;
			        return 0;
			    }

			    function getWindowWidth() {
			        if (self.innerWidth) return self.innerWidth;
			        if (document.documentElement && document.documentElement.clientWidth)
			            return document.documentElement.clientWidth;
			        if (document.body) return document.body.clientWidth;
			        return 0;
			    }

			    function resize() {  
			        var map = document.getElementById("map");  
			        var header = document.getElementById("header");  
			        var subheader = document.getElementById("subheader");  
			        map.style.height = (getWindowHeight()-80) + "px";
			        map.style.width = (getWindowWidth()-20) + "px";
			        header.style.width = (getWindowWidth()-20) + "px";
			        subheader.style.width = (getWindowWidth()-20) + "px";
			        // map.checkResize();
			    } 


			    /*
			     * Main load function:
			     */

			    function load() {

			       if (GBrowserIsCompatible()) {

			          // Bug in the Google Maps: Copyright for Overlay is not correctly displayed
			          var gcr = GMapType.prototype.getCopyrights;
			          GMapType.prototype.getCopyrights = function(bounds,zoom) {
			              return [""].concat(gcr.call(this,bounds,zoom));
			          }

			          map = new GMap2( document.getElementById("map"), { backgroundColor: '#fff' } );

			          map.addMapType(G_PHYSICAL_MAP);
			          map.setMapType(G_PHYSICAL_MAP);

			          map.setCenter( mapBounds.getCenter(), map.getBoundsZoomLevel( mapBounds ));

			          hybridOverlay = new GTileLayerOverlay( G_HYBRID_MAP.getTileLayers()[1] );
			          GEvent.addListener(map, "maptypechanged", function() {
			            if (map.getCurrentMapType() == G_HYBRID_MAP) {
			                map.addOverlay(hybridOverlay);
			            } else {
			               map.removeOverlay(hybridOverlay);
			            }
			          } );

			          var tilelayer = new GTileLayer(GCopyrightCollection(''), mapMinZoom, mapMaxZoom);
			          var mercator = new GMercatorProjection(mapMaxZoom+1);
			          tilelayer.getTileUrl = function(tile,zoom) {
			              if ((zoom < mapMinZoom) || (zoom > mapMaxZoom)) {
			                  return "http://www.maptiler.org/img/none.png";
			              } 
			              var ymax = 1 << zoom;
			              var y = ymax - tile.y -1;
			              var tileBounds = new GLatLngBounds(
			                  mercator.fromPixelToLatLng( new GPoint( (tile.x)*256, (tile.y+1)*256 ) , zoom ),
			                  mercator.fromPixelToLatLng( new GPoint( (tile.x+1)*256, (tile.y)*256 ) , zoom )
			              );
			              if (mapBounds.intersects(tileBounds)) {
			                  return zoom+"/"+tile.x+"/"+y+".png";
			              } else {
			                  return "http://www.maptiler.org/img/none.png";
			              }
			          }
			          // IE 7-: support for PNG alpha channel
			          // Unfortunately, the opacity for whole overlay is then not changeable, either or...
			          tilelayer.isPng = function() { return true;};
			          tilelayer.getOpacity = function() { return opacity; }

			          overlay = new GTileLayerOverlay( tilelayer );
			          map.addOverlay(overlay);

			          map.addControl(new GLargeMapControl3D());
			          map.addControl(new GHierarchicalMapTypeControl());
			          map.addControl(new CTransparencyControl( overlay ));
		

			          map.enableContinuousZoom();
			          map.enableScrollWheelZoom();

			          map.setMapType(G_HYBRID_MAP);
			       }
			       resize();
			    }
		
			    onresize=function(){ resize(); };

			    //]]>
			    






		        var map;
			    var mapBounds = new OpenLayers.Bounds( 13.98919, 41.8099943643, 14.0395561243, 41.85393);
			    var mapMinZoom = 13;
			    var mapMaxZoom = 16;

		        // avoid pink tiles
		        OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
		        OpenLayers.Util.onImageLoadErrorColor = "transparent";

		        function init(){
	            var options = {
	                controls: [],
	                projection: new OpenLayers.Projection("EPSG:900913"),
	                displayProjection: new OpenLayers.Projection("EPSG:4326"),
	                units: "m",
	                maxResolution: 156543.0339,
	                maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34)
		            };
	            map = new OpenLayers.Map('map', options);

	            // create Google Mercator layers
	            var gmap = new OpenLayers.Layer.Google("Google Streets",
					{ sphericalMercator: true, numZoomLevels: 20} );
	            var gsat = new OpenLayers.Layer.Google("Google Satellite",
					{type: G_SATELLITE_MAP, sphericalMercator: true, numZoomLevels: 20} );
	            var ghyb = new OpenLayers.Layer.Google("Google Hybrid",
					{type: G_HYBRID_MAP, sphericalMercator: true, numZoomLevels: 20});
	            var gter = new OpenLayers.Layer.Google("Google Terrain",
					{type: G_PHYSICAL_MAP, sphericalMercator: true, numZoomLevels: 20 });

	            // create Virtual Earth layers
				OpenLayers.Layer.VirtualEarth.prototype.MAX_ZOOM_LEVEL=19;
				OpenLayers.Layer.VirtualEarth.prototype.RESOLUTIONS=OpenLayers.Layer.Google.prototype.RESOLUTIONS
	            var veroad = new OpenLayers.Layer.VirtualEarth("Virtual Earth Roads",
					{'type': VEMapStyle.Road, 'sphericalMercator': true, numZoomLevels: 20});
	            var veaer = new OpenLayers.Layer.VirtualEarth("Virtual Earth Aerial",
					{'type': VEMapStyle.Aerial, 'sphericalMercator': true, numZoomLevels: 20 });
	            var vehyb = new OpenLayers.Layer.VirtualEarth("Virtual Earth Hybrid",
	                {'type': VEMapStyle.Hybrid, 'sphericalMercator': true});

	            // create Yahoo layer
	            var yahoo = new OpenLayers.Layer.Yahoo("Yahoo Street",
	                {'sphericalMercator': true});
	            var yahoosat = new OpenLayers.Layer.Yahoo("Yahoo Satellite",
	                {'type': YAHOO_MAP_SAT, 'sphericalMercator': true});
	            var yahoohyb = new OpenLayers.Layer.Yahoo("Yahoo Hybrid",
	                {'type': YAHOO_MAP_HYB, 'sphericalMercator': true});

	            // create OSM/OAM layer
	            var osm = new OpenLayers.Layer.TMS( "OpenStreetMap",
	                "http://tile.openstreetmap.org/",
	                { type: 'png', getURL: osm_getTileURL, displayOutsideMaxExtent: true, 
					  attribution: '<a href="http://www.openstreetmap.org/">OpenStreetMap</a>'} );
	            var oam = new OpenLayers.Layer.TMS( "OpenAerialMap",
	                "http://tile.openaerialmap.org/tiles/1.0.0/openaerialmap-900913/",
	                { type: 'png', getURL: osm_getTileURL } );

	            // create TMS Overlay layer
	            var tmsoverlay = new OpenLayers.Layer.TMS( "TMS Overlay", "",
	                {   // url: '', serviceVersion: '.', layername: '.',
						type: 'png', getURL: overlay_getTileURL, alpha: true, 
						isBaseLayer: false
	                });
				if (OpenLayers.Util.alphaHack() == false) { tmsoverlay.setOpacity(0.7); }

	            map.addLayers([gmap, gsat, ghyb, gter, veroad, veaer, vehyb,
	                           yahoo, yahoosat, yahoohyb, osm, oam,
	                           tmsoverlay]);

	            var switcherControl = new OpenLayers.Control.LayerSwitcher();
	            map.addControl(switcherControl);
	            switcherControl.maximizeControl();
	
	            map.zoomToExtent( mapBounds.transform(map.displayProjection, map.projection ) );
			
	            map.addControl(new OpenLayers.Control.PanZoomBar());
	            map.addControl(new OpenLayers.Control.MousePosition());
	            map.addControl(new OpenLayers.Control.MouseDefaults());
	            map.addControl(new OpenLayers.Control.KeyboardDefaults());
	        }
			
	        function osm_getTileURL(bounds) {
	            var res = this.map.getResolution();
	            var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
	            var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
	            var z = this.map.getZoom();
	            var limit = Math.pow(2, z);

	            if (y < 0 || y >= limit) {
	                return "http://www.maptiler.org/img/none.png";
	            } else {
	                x = ((x % limit) + limit) % limit;
	                return this.url + z + "/" + x + "/" + y + "." + this.type;
	            }
	        }
	
	        function overlay_getTileURL(bounds) {
	            var res = this.map.getResolution();
	            var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
	            var y = Math.round((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h));
	            var z = this.map.getZoom();
	            if (this.map.baseLayer.name == 'Virtual Earth Roads' || this.map.baseLayer.name == 'Virtual Earth Aerial' || this.map.baseLayer.name == 'Virtual Earth Hybrid') {
	               z = z + 1;
	            }
		        if (mapBounds.intersectsBounds( bounds ) && z >= mapMinZoom && z <= mapMaxZoom ) {
	               //console.log( this.url + z + "/" + x + "/" + y + "." + this.type);
	               return this.url + z + "/" + x + "/" + y + "." + this.type;
                } else {
                   return "http://www.maptiler.org/img/none.png";
                }
	        }		
			
		   function getWindowHeight() {
		        if (self.innerHeight) return self.innerHeight;
		        if (document.documentElement && document.documentElement.clientHeight)
		            return document.documentElement.clientHeight;
		        if (document.body) return document.body.clientHeight;
			        return 0;
		    }

		    function getWindowWidth() {
			    if (self.innerWidth) return self.innerWidth;
			    if (document.documentElement && document.documentElement.clientWidth)
			        return document.documentElement.clientWidth;
			    if (document.body) return document.body.clientWidth;
			        return 0;
		    }

		    function resize() {  
			    var map = document.getElementById("map");  
			    var header = document.getElementById("header");  
			    var subheader = document.getElementById("subheader");  
			    map.style.height = (getWindowHeight()-80) + "px";
			    map.style.width = (getWindowWidth()-20) + "px";
			    header.style.width = (getWindowWidth()-20) + "px";
			    subheader.style.width = (getWindowWidth()-20) + "px";
				if (map.updateSize) { map.updateSize(); };
		    } 

		    onresize=function(){ resize(); };

		    
resize()

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


$.RoccarasoSki_Model.Pista  = Class.extend({
	init: function(){
		this.nome;
		this.stato;
		this.difficolta;		
	}
});

/*
 Copyright (c) 2010-2012, CloudMade, Vladimir Agafonkin
 Leaflet is an open-source JavaScript library for mobile-friendly interactive maps.
 http://leaflet.cloudmade.com
*/
(function(e,t){var n,r;typeof exports!=t+""?n=exports:(r=e.L,n={},n.noConflict=function(){return e.L=r,this},e.L=n),n.version="0.4.5",n.Util={extend:function(e){var t=Array.prototype.slice.call(arguments,1);for(var n=0,r=t.length,i;n<r;n++){i=t[n]||{};for(var s in i)i.hasOwnProperty(s)&&(e[s]=i[s])}return e},bind:function(e,t){var n=arguments.length>2?Array.prototype.slice.call(arguments,2):null;return function(){return e.apply(t,n||arguments)}},stamp:function(){var e=0,t="_leaflet_id";return function(n){return n[t]=n[t]||++e,n[t]}}(),limitExecByInterval:function(e,t,n){var r,i;return function s(){var o=arguments;if(r){i=!0;return}r=!0,setTimeout(function(){r=!1,i&&(s.apply(n,o),i=!1)},t),e.apply(n,o)}},falseFn:function(){return!1},formatNum:function(e,t){var n=Math.pow(10,t||5);return Math.round(e*n)/n},splitWords:function(e){return e.replace(/^\s+|\s+$/g,"").split(/\s+/)},setOptions:function(e,t){return e.options=n.Util.extend({},e.options,t),e.options},getParamString:function(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n+"="+e[n]);return"?"+t.join("&")},template:function(e,t){return e.replace(/\{ *([\w_]+) *\}/g,function(e,n){var r=t[n];if(!t.hasOwnProperty(n))throw Error("No value provided for variable "+e);return r})},emptyImageUrl:"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="},function(){function t(t){var n,r,i=["webkit","moz","o","ms"];for(n=0;n<i.length&&!r;n++)r=e[i[n]+t];return r}function r(t){return e.setTimeout(t,1e3/60)}var i=e.requestAnimationFrame||t("RequestAnimationFrame")||r,s=e.cancelAnimationFrame||t("CancelAnimationFrame")||t("CancelRequestAnimationFrame")||function(t){e.clearTimeout(t)};n.Util.requestAnimFrame=function(t,s,o,u){t=n.Util.bind(t,s);if(!o||i!==r)return i.call(e,t,u);t()},n.Util.cancelAnimFrame=function(t){t&&s.call(e,t)}}(),n.Class=function(){},n.Class.extend=function(e){var t=function(){this.initialize&&this.initialize.apply(this,arguments)},r=function(){};r.prototype=this.prototype;var i=new r;i.constructor=t,t.prototype=i;for(var s in this)this.hasOwnProperty(s)&&s!=="prototype"&&(t[s]=this[s]);return e.statics&&(n.Util.extend(t,e.statics),delete e.statics),e.includes&&(n.Util.extend.apply(null,[i].concat(e.includes)),delete e.includes),e.options&&i.options&&(e.options=n.Util.extend({},i.options,e.options)),n.Util.extend(i,e),t},n.Class.include=function(e){n.Util.extend(this.prototype,e)},n.Class.mergeOptions=function(e){n.Util.extend(this.prototype.options,e)};var i="_leaflet_events";n.Mixin={},n.Mixin.Events={addEventListener:function(e,t,r){var s=this[i]=this[i]||{},o,u,a;if(typeof e=="object"){for(o in e)e.hasOwnProperty(o)&&this.addEventListener(o,e[o],t);return this}e=n.Util.splitWords(e);for(u=0,a=e.length;u<a;u++)s[e[u]]=s[e[u]]||[],s[e[u]].push({action:t,context:r||this});return this},hasEventListeners:function(e){return i in this&&e in this[i]&&this[i][e].length>0},removeEventListener:function(e,t,r){var s=this[i],o,u,a,f,l;if(typeof e=="object"){for(o in e)e.hasOwnProperty(o)&&this.removeEventListener(o,e[o],t);return this}e=n.Util.splitWords(e);for(u=0,a=e.length;u<a;u++)if(this.hasEventListeners(e[u])){f=s[e[u]];for(l=f.length-1;l>=0;l--)(!t||f[l].action===t)&&(!r||f[l].context===r)&&f.splice(l,1)}return this},fireEvent:function(e,t){if(!this.hasEventListeners(e))return this;var r=n.Util.extend({type:e,target:this},t),s=this[i][e].slice();for(var o=0,u=s.length;o<u;o++)s[o].action.call(s[o].context||this,r);return this}},n.Mixin.Events.on=n.Mixin.Events.addEventListener,n.Mixin.Events.off=n.Mixin.Events.removeEventListener,n.Mixin.Events.fire=n.Mixin.Events.fireEvent,function(){var r=navigator.userAgent.toLowerCase(),i=!!e.ActiveXObject,s=i&&!e.XMLHttpRequest,o=r.indexOf("webkit")!==-1,u=r.indexOf("gecko")!==-1,a=r.indexOf("chrome")!==-1,f=e.opera,l=r.indexOf("android")!==-1,c=r.search("android [23]")!==-1,h=typeof orientation!=t+""?!0:!1,p=document.documentElement,d=i&&"transition"in p.style,v=o&&"WebKitCSSMatrix"in e&&"m11"in new e.WebKitCSSMatrix,m=u&&"MozPerspective"in p.style,g=f&&"OTransition"in p.style,y=!e.L_NO_TOUCH&&function(){var e="ontouchstart";if(e in p)return!0;var t=document.createElement("div"),n=!1;return t.setAttribute?(t.setAttribute(e,"return;"),typeof t[e]=="function"&&(n=!0),t.removeAttribute(e),t=null,n):!1}(),b="devicePixelRatio"in e&&e.devicePixelRatio>1||"matchMedia"in e&&e.matchMedia("(min-resolution:144dpi)").matches;n.Browser={ua:r,ie:i,ie6:s,webkit:o,gecko:u,opera:f,android:l,android23:c,chrome:a,ie3d:d,webkit3d:v,gecko3d:m,opera3d:g,any3d:!e.L_DISABLE_3D&&(d||v||m||g),mobile:h,mobileWebkit:h&&o,mobileWebkit3d:h&&v,mobileOpera:h&&f,touch:y,retina:b}}(),n.Point=function(e,t,n){this.x=n?Math.round(e):e,this.y=n?Math.round(t):t},n.Point.prototype={add:function(e){return this.clone()._add(n.point(e))},_add:function(e){return this.x+=e.x,this.y+=e.y,this},subtract:function(e){return this.clone()._subtract(n.point(e))},_subtract:function(e){return this.x-=e.x,this.y-=e.y,this},divideBy:function(e,t){return new n.Point(this.x/e,this.y/e,t)},multiplyBy:function(e,t){return new n.Point(this.x*e,this.y*e,t)},distanceTo:function(e){e=n.point(e);var t=e.x-this.x,r=e.y-this.y;return Math.sqrt(t*t+r*r)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},clone:function(){return new n.Point(this.x,this.y)},toString:function(){return"Point("+n.Util.formatNum(this.x)+", "+n.Util.formatNum(this.y)+")"}},n.point=function(e,t,r){return e instanceof n.Point?e:e instanceof Array?new n.Point(e[0],e[1]):isNaN(e)?e:new n.Point(e,t,r)},n.Bounds=n.Class.extend({initialize:function(e,t){if(!e)return;var n=t?[e,t]:e;for(var r=0,i=n.length;r<i;r++)this.extend(n[r])},extend:function(e){return e=n.point(e),!this.min&&!this.max?(this.min=e.clone(),this.max=e.clone()):(this.min.x=Math.min(e.x,this.min.x),this.max.x=Math.max(e.x,this.max.x),this.min.y=Math.min(e.y,this.min.y),this.max.y=Math.max(e.y,this.max.y)),this},getCenter:function(e){return new n.Point((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,e)},getBottomLeft:function(){return new n.Point(this.min.x,this.max.y)},getTopRight:function(){return new n.Point(this.max.x,this.min.y)},contains:function(e){var t,r;return typeof e[0]=="number"||e instanceof n.Point?e=n.point(e):e=n.bounds(e),e instanceof n.Bounds?(t=e.min,r=e.max):t=r=e,t.x>=this.min.x&&r.x<=this.max.x&&t.y>=this.min.y&&r.y<=this.max.y},intersects:function(e){e=n.bounds(e);var t=this.min,r=this.max,i=e.min,s=e.max,o=s.x>=t.x&&i.x<=r.x,u=s.y>=t.y&&i.y<=r.y;return o&&u}}),n.bounds=function(e,t){return!e||e instanceof n.Bounds?e:new n.Bounds(e,t)},n.Transformation=n.Class.extend({initialize:function(e,t,n,r){this._a=e,this._b=t,this._c=n,this._d=r},transform:function(e,t){return this._transform(e.clone(),t)},_transform:function(e,t){return t=t||1,e.x=t*(this._a*e.x+this._b),e.y=t*(this._c*e.y+this._d),e},untransform:function(e,t){return t=t||1,new n.Point((e.x/t-this._b)/this._a,(e.y/t-this._d)/this._c)}}),n.DomUtil={get:function(e){return typeof e=="string"?document.getElementById(e):e},getStyle:function(e,t){var n=e.style[t];!n&&e.currentStyle&&(n=e.currentStyle[t]);if(!n||n==="auto"){var r=document.defaultView.getComputedStyle(e,null);n=r?r[t]:null}return n==="auto"?null:n},getViewportOffset:function(e){var t=0,r=0,i=e,s=document.body;do{t+=i.offsetTop||0,r+=i.offsetLeft||0;if(i.offsetParent===s&&n.DomUtil.getStyle(i,"position")==="absolute")break;if(n.DomUtil.getStyle(i,"position")==="fixed"){t+=s.scrollTop||0,r+=s.scrollLeft||0;break}i=i.offsetParent}while(i);i=e;do{if(i===s)break;t-=i.scrollTop||0,r-=i.scrollLeft||0,i=i.parentNode}while(i);return new n.Point(r,t)},create:function(e,t,n){var r=document.createElement(e);return r.className=t,n&&n.appendChild(r),r},disableTextSelection:function(){document.selection&&document.selection.empty&&document.selection.empty(),this._onselectstart||(this._onselectstart=document.onselectstart,document.onselectstart=n.Util.falseFn)},enableTextSelection:function(){document.onselectstart=this._onselectstart,this._onselectstart=null},hasClass:function(e,t){return e.className.length>0&&RegExp("(^|\\s)"+t+"(\\s|$)").test(e.className)},addClass:function(e,t){n.DomUtil.hasClass(e,t)||(e.className+=(e.className?" ":"")+t)},removeClass:function(e,t){function n(e,n){return n===t?"":e}e.className=e.className.replace(/(\S+)\s*/g,n).replace(/(^\s+|\s+$)/,"")},setOpacity:function(e,t){if("opacity"in e.style)e.style.opacity=t;else if(n.Browser.ie){var r=!1,i="DXImageTransform.Microsoft.Alpha";try{r=e.filters.item(i)}catch(s){}t=Math.round(t*100),r?(r.Enabled=t!==100,r.Opacity=t):e.style.filter+=" progid:"+i+"(opacity="+t+")"}},testProp:function(e){var t=document.documentElement.style;for(var n=0;n<e.length;n++)if(e[n]in t)return e[n];return!1},getTranslateString:function(e){var t=n.Browser.webkit3d,r="translate"+(t?"3d":"")+"(",i=(t?",0":"")+")";return r+e.x+"px,"+e.y+"px"+i},getScaleString:function(e,t){var r=n.DomUtil.getTranslateString(t.add(t.multiplyBy(-1*e))),i=" scale("+e+") ";return r+i},setPosition:function(e,t,r){e._leaflet_pos=t,!r&&n.Browser.any3d?(e.style[n.DomUtil.TRANSFORM]=n.DomUtil.getTranslateString(t),n.Browser.mobileWebkit3d&&(e.style.WebkitBackfaceVisibility="hidden")):(e.style.left=t.x+"px",e.style.top=t.y+"px")},getPosition:function(e){return e._leaflet_pos}},n.Util.extend(n.DomUtil,{TRANSITION:n.DomUtil.testProp(["transition","webkitTransition","OTransition","MozTransition","msTransition"]),TRANSFORM:n.DomUtil.testProp(["transform","WebkitTransform","OTransform","MozTransform","msTransform"])}),n.LatLng=function(e,t,n){var r=parseFloat(e),i=parseFloat(t);if(isNaN(r)||isNaN(i))throw Error("Invalid LatLng object: ("+e+", "+t+")");n!==!0&&(r=Math.max(Math.min(r,90),-90),i=(i+180)%360+(i<-180||i===180?180:-180)),this.lat=r,this.lng=i},n.Util.extend(n.LatLng,{DEG_TO_RAD:Math.PI/180,RAD_TO_DEG:180/Math.PI,MAX_MARGIN:1e-9}),n.LatLng.prototype={equals:function(e){if(!e)return!1;e=n.latLng(e);var t=Math.max(Math.abs(this.lat-e.lat),Math.abs(this.lng-e.lng));return t<=n.LatLng.MAX_MARGIN},toString:function(){return"LatLng("+n.Util.formatNum(this.lat)+", "+n.Util.formatNum(this.lng)+")"},distanceTo:function(e){e=n.latLng(e);var t=6378137,r=n.LatLng.DEG_TO_RAD,i=(e.lat-this.lat)*r,s=(e.lng-this.lng)*r,o=this.lat*r,u=e.lat*r,a=Math.sin(i/2),f=Math.sin(s/2),l=a*a+f*f*Math.cos(o)*Math.cos(u);return t*2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l))}},n.latLng=function(e,t,r){return e instanceof n.LatLng?e:e instanceof Array?new n.LatLng(e[0],e[1]):isNaN(e)?e:new n.LatLng(e,t,r)},n.LatLngBounds=n.Class.extend({initialize:function(e,t){if(!e)return;var n=t?[e,t]:e;for(var r=0,i=n.length;r<i;r++)this.extend(n[r])},extend:function(e){return typeof e[0]=="number"||e instanceof n.LatLng?e=n.latLng(e):e=n.latLngBounds(e),e instanceof n.LatLng?!this._southWest&&!this._northEast?(this._southWest=new n.LatLng(e.lat,e.lng,!0),this._northEast=new n.LatLng(e.lat,e.lng,!0)):(this._southWest.lat=Math.min(e.lat,this._southWest.lat),this._southWest.lng=Math.min(e.lng,this._southWest.lng),this._northEast.lat=Math.max(e.lat,this._northEast.lat),this._northEast.lng=Math.max(e.lng,this._northEast.lng)):e instanceof n.LatLngBounds&&(this.extend(e._southWest),this.extend(e._northEast)),this},pad:function(e){var t=this._southWest,r=this._northEast,i=Math.abs(t.lat-r.lat)*e,s=Math.abs(t.lng-r.lng)*e;return new n.LatLngBounds(new n.LatLng(t.lat-i,t.lng-s),new n.LatLng(r.lat+i,r.lng+s))},getCenter:function(){return new n.LatLng((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new n.LatLng(this._northEast.lat,this._southWest.lng,!0)},getSouthEast:function(){return new n.LatLng(this._southWest.lat,this._northEast.lng,!0)},contains:function(e){typeof e[0]=="number"||e instanceof n.LatLng?e=n.latLng(e):e=n.latLngBounds(e);var t=this._southWest,r=this._northEast,i,s;return e instanceof n.LatLngBounds?(i=e.getSouthWest(),s=e.getNorthEast()):i=s=e,i.lat>=t.lat&&s.lat<=r.lat&&i.lng>=t.lng&&s.lng<=r.lng},intersects:function(e){e=n.latLngBounds(e);var t=this._southWest,r=this._northEast,i=e.getSouthWest(),s=e.getNorthEast(),o=s.lat>=t.lat&&i.lat<=r.lat,u=s.lng>=t.lng&&i.lng<=r.lng;return o&&u},toBBoxString:function(){var e=this._southWest,t=this._northEast;return[e.lng,e.lat,t.lng,t.lat].join(",")},equals:function(e){return e?(e=n.latLngBounds(e),this._southWest.equals(e.getSouthWest())&&this._northEast.equals(e.getNorthEast())):!1}}),n.latLngBounds=function(e,t){return!e||e instanceof n.LatLngBounds?e:new n.LatLngBounds(e,t)},n.Projection={},n.Projection.SphericalMercator={MAX_LATITUDE:85.0511287798,project:function(e){var t=n.LatLng.DEG_TO_RAD,r=this.MAX_LATITUDE,i=Math.max(Math.min(r,e.lat),-r),s=e.lng*t,o=i*t;return o=Math.log(Math.tan(Math.PI/4+o/2)),new n.Point(s,o)},unproject:function(e){var t=n.LatLng.RAD_TO_DEG,r=e.x*t,i=(2*Math.atan(Math.exp(e.y))-Math.PI/2)*t;return new n.LatLng(i,r,!0)}},n.Projection.LonLat={project:function(e){return new n.Point(e.lng,e.lat)},unproject:function(e){return new n.LatLng(e.y,e.x,!0)}},n.CRS={latLngToPoint:function(e,t){var n=this.projection.project(e),r=this.scale(t);return this.transformation._transform(n,r)},pointToLatLng:function(e,t){var n=this.scale(t),r=this.transformation.untransform(e,n);return this.projection.unproject(r)},project:function(e){return this.projection.project(e)},scale:function(e){return 256*Math.pow(2,e)}},n.CRS.EPSG3857=n.Util.extend({},n.CRS,{code:"EPSG:3857",projection:n.Projection.SphericalMercator,transformation:new n.Transformation(.5/Math.PI,.5,-0.5/Math.PI,.5),project:function(e){var t=this.projection.project(e),n=6378137;return t.multiplyBy(n)}}),n.CRS.EPSG900913=n.Util.extend({},n.CRS.EPSG3857,{code:"EPSG:900913"}),n.CRS.EPSG4326=n.Util.extend({},n.CRS,{code:"EPSG:4326",projection:n.Projection.LonLat,transformation:new n.Transformation(1/360,.5,-1/360,.5)}),n.Map=n.Class.extend({includes:n.Mixin.Events,options:{crs:n.CRS.EPSG3857,fadeAnimation:n.DomUtil.TRANSITION&&!n.Browser.android23,trackResize:!0,markerZoomAnimation:n.DomUtil.TRANSITION&&n.Browser.any3d},initialize:function(e,r){r=n.Util.setOptions(this,r),this._initContainer(e),this._initLayout(),this._initHooks(),this._initEvents(),r.maxBounds&&this.setMaxBounds(r.maxBounds),r.center&&r.zoom!==t&&this.setView(n.latLng(r.center),r.zoom,!0),this._initLayers(r.layers)},setView:function(e,t){return this._resetView(n.latLng(e),this._limitZoom(t)),this},setZoom:function(e){return this.setView(this.getCenter(),e)},zoomIn:function(){return this.setZoom(this._zoom+1)},zoomOut:function(){return this.setZoom(this._zoom-1)},fitBounds:function(e){var t=this.getBoundsZoom(e);return this.setView(n.latLngBounds(e).getCenter(),t)},fitWorld:function(){var e=new n.LatLng(-60,-170),t=new n.LatLng(85,179);return this.fitBounds(new n.LatLngBounds(e,t))},panTo:function(e){return this.setView(e,this._zoom)},panBy:function(e){return this.fire("movestart"),this._rawPanBy(n.point(e)),this.fire("move"),this.fire("moveend")},setMaxBounds:function(e){e=n.latLngBounds(e),this.options.maxBounds=e;if(!e)return this._boundsMinZoom=null,this;var t=this.getBoundsZoom(e,!0);return this._boundsMinZoom=t,this._loaded&&(this._zoom<t?this.setView(e.getCenter(),t):this.panInsideBounds(e)),this},panInsideBounds:function(e){e=n.latLngBounds(e);var t=this.getBounds(),r=this.project(t.getSouthWest()),i=this.project(t.getNorthEast()),s=this.project(e.getSouthWest()),o=this.project(e.getNorthEast()),u=0,a=0;return i.y<o.y&&(a=o.y-i.y),i.x>o.x&&(u=o.x-i.x),r.y>s.y&&(a=s.y-r.y),r.x<s.x&&(u=s.x-r.x),this.panBy(new n.Point(u,a,!0))},addLayer:function(e){var t=n.Util.stamp(e);if(this._layers[t])return this;this._layers[t]=e,e.options&&!isNaN(e.options.maxZoom)&&(this._layersMaxZoom=Math.max(this._layersMaxZoom||0,e.options.maxZoom)),e.options&&!isNaN(e.options.minZoom)&&(this._layersMinZoom=Math.min(this._layersMinZoom||Infinity,e.options.minZoom)),this.options.zoomAnimation&&n.TileLayer&&e instanceof n.TileLayer&&(this._tileLayersNum++,this._tileLayersToLoad++,e.on("load",this._onTileLayerLoad,this));var r=function(){e.onAdd(this),this.fire("layeradd",{layer:e})};return this._loaded?r.call(this):this.on("load",r,this),this},removeLayer:function(e){var t=n.Util.stamp(e);if(!this._layers[t])return;return e.onRemove(this),delete this._layers[t],this.options.zoomAnimation&&n.TileLayer&&e instanceof n.TileLayer&&(this._tileLayersNum--,this._tileLayersToLoad--,e.off("load",this._onTileLayerLoad,this)),this.fire("layerremove",{layer:e})},hasLayer:function(e){var t=n.Util.stamp(e);return this._layers.hasOwnProperty(t)},invalidateSize:function(e){var t=this.getSize();this._sizeChanged=!0,this.options.maxBounds&&this.setMaxBounds(this.options.maxBounds);if(!this._loaded)return this;var r=t.subtract(this.getSize()).divideBy(2,!0);return e===!0?this.panBy(r):(this._rawPanBy(r),this.fire("move"),clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(n.Util.bind(this.fire,this,"moveend"),200)),this},addHandler:function(e,t){if(!t)return;return this[e]=new t(this),this.options[e]&&this[e].enable(),this},getCenter:function(){return this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var e=this.getPixelBounds(),t=this.unproject(e.getBottomLeft()),r=this.unproject(e.getTopRight());return new n.LatLngBounds(t,r)},getMinZoom:function(){var e=this.options.minZoom||0,t=this._layersMinZoom||0,n=this._boundsMinZoom||0;return Math.max(e,t,n)},getMaxZoom:function(){var e=this.options.maxZoom===t?Infinity:this.options.maxZoom,n=this._layersMaxZoom===t?Infinity:this._layersMaxZoom;return Math.min(e,n)},getBoundsZoom:function(e,t){e=n.latLngBounds(e);var r=this.getSize(),i=this.options.minZoom||0,s=this.getMaxZoom(),o=e.getNorthEast(),u=e.getSouthWest(),a,f,l,c=!0;t&&i--;do i++,f=this.project(o,i),l=this.project(u,i),a=new n.Point(Math.abs(f.x-l.x),Math.abs(l.y-f.y)),t?c=a.x<r.x||a.y<r.y:c=a.x<=r.x&&a.y<=r.y;while(c&&i<=s);return c&&t?null:t?i:i-1},getSize:function(){if(!this._size||this._sizeChanged)this._size=new n.Point(this._container.clientWidth,this._container.clientHeight),this._sizeChanged=!1;return this._size},getPixelBounds:function(){var e=this._getTopLeftPoint();return new n.Bounds(e,e.add(this.getSize()))},getPixelOrigin:function(){return this._initialTopLeftPoint},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(e){var t=this.options.crs;return t.scale(e)/t.scale(this._zoom)},getScaleZoom:function(e){return this._zoom+Math.log(e)/Math.LN2},project:function(e,r){return r=r===t?this._zoom:r,this.options.crs.latLngToPoint(n.latLng(e),r)},unproject:function(e,r){return r=r===t?this._zoom:r,this.options.crs.pointToLatLng(n.point(e),r)},layerPointToLatLng:function(e){var t=n.point(e).add(this._initialTopLeftPoint);return this.unproject(t)},latLngToLayerPoint:function(e){var t=this.project(n.latLng(e))._round();return t._subtract(this._initialTopLeftPoint)},containerPointToLayerPoint:function(e){return n.point(e).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(e){return n.point(e).add(this._getMapPanePos())},containerPointToLatLng:function(e){var t=this.containerPointToLayerPoint(n.point(e));return this.layerPointToLatLng(t)},latLngToContainerPoint:function(e){return this.layerPointToContainerPoint(this.latLngToLayerPoint(n.latLng(e)))},mouseEventToContainerPoint:function(e){return n.DomEvent.getMousePosition(e,this._container)},mouseEventToLayerPoint:function(e){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e))},mouseEventToLatLng:function(e){return this.layerPointToLatLng(this.mouseEventToLayerPoint(e))},_initContainer:function(e){var t=this._container=n.DomUtil.get(e);if(t._leaflet)throw Error("Map container is already initialized.");t._leaflet=!0},_initLayout:function(){var e=this._container;e.innerHTML="",n.DomUtil.addClass(e,"leaflet-container"),n.Browser.touch&&n.DomUtil.addClass(e,"leaflet-touch"),this.options.fadeAnimation&&n.DomUtil.addClass(e,"leaflet-fade-anim");var t=n.DomUtil.getStyle(e,"position");t!=="absolute"&&t!=="relative"&&t!=="fixed"&&(e.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var e=this._panes={};this._mapPane=e.mapPane=this._createPane("leaflet-map-pane",this._container),this._tilePane=e.tilePane=this._createPane("leaflet-tile-pane",this._mapPane),this._objectsPane=e.objectsPane=this._createPane("leaflet-objects-pane",this._mapPane),e.shadowPane=this._createPane("leaflet-shadow-pane"),e.overlayPane=this._createPane("leaflet-overlay-pane"),e.markerPane=this._createPane("leaflet-marker-pane"),e.popupPane=this._createPane("leaflet-popup-pane");var t=" leaflet-zoom-hide";this.options.markerZoomAnimation||(n.DomUtil.addClass(e.markerPane,t),n.DomUtil.addClass(e.shadowPane,t),n.DomUtil.addClass(e.popupPane,t))},_createPane:function(e,t){return n.DomUtil.create("div",e,t||this._objectsPane)},_initializers:[],_initHooks:function(){var e,t;for(e=0,t=this._initializers.length;e<t;e++)this._initializers[e].call(this)},_initLayers:function(e){e=e?e instanceof Array?e:[e]:[],this._layers={},this._tileLayersNum=0;var t,n;for(t=0,n=e.length;t<n;t++)this.addLayer(e[t])},_resetView:function(e,t,r,i){var s=this._zoom!==t;i||(this.fire("movestart"),s&&this.fire("zoomstart")),this._zoom=t,this._initialTopLeftPoint=this._getNewTopLeftPoint(e),r?this._initialTopLeftPoint._add(this._getMapPanePos()):n.DomUtil.setPosition(this._mapPane,new n.Point(0,0)),this._tileLayersToLoad=this._tileLayersNum,this.fire("viewreset",{hard:!r}),this.fire("move"),(s||i)&&this.fire("zoomend"),this.fire("moveend",{hard:!r}),this._loaded||(this._loaded=!0,this.fire("load"))},_rawPanBy:function(e){n.DomUtil.setPosition(this._mapPane,this._getMapPanePos().subtract(e))},_initEvents:function(){if(!n.DomEvent)return;n.DomEvent.on(this._container,"click",this._onMouseClick,this);var t=["dblclick","mousedown","mouseup","mouseenter","mouseleave","mousemove","contextmenu"],r,i;for(r=0,i=t.length;r<i;r++)n.DomEvent.on(this._container,t[r],this._fireMouseEvent,this);this.options.trackResize&&n.DomEvent.on(e,"resize",this._onResize,this)},_onResize:function(){n.Util.cancelAnimFrame(this._resizeRequest),this._resizeRequest=n.Util.requestAnimFrame(this.invalidateSize,this,!1,this._container)},_onMouseClick:function(e){if(!this._loaded||this.dragging&&this.dragging.moved())return;this.fire("preclick"),this._fireMouseEvent(e)},_fireMouseEvent:function(e){if(!this._loaded)return;var t=e.type;t=t==="mouseenter"?"mouseover":t==="mouseleave"?"mouseout":t;if(!this.hasEventListeners(t))return;t==="contextmenu"&&n.DomEvent.preventDefault(e);var r=this.mouseEventToContainerPoint(e),i=this.containerPointToLayerPoint(r),s=this.layerPointToLatLng(i);this.fire(t,{latlng:s,layerPoint:i,containerPoint:r,originalEvent:e})},_onTileLayerLoad:function(){this._tileLayersToLoad--,this._tileLayersNum&&!this._tileLayersToLoad&&this._tileBg&&(clearTimeout(this._clearTileBgTimer),this._clearTileBgTimer=setTimeout(n.Util.bind(this._clearTileBg,this),500))},_getMapPanePos:function(){return n.DomUtil.getPosition(this._mapPane)},_getTopLeftPoint:function(){if(!this._loaded)throw Error("Set map center and zoom first.");return this._initialTopLeftPoint.subtract(this._getMapPanePos())},_getNewTopLeftPoint:function(e,t){var n=this.getSize().divideBy(2);return this.project(e,t)._subtract(n)._round()},_latLngToNewLayerPoint:function(e,t,n){var r=this._getNewTopLeftPoint(n,t).add(this._getMapPanePos());return this.project(e,t)._subtract(r)},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize().divideBy(2))},_getCenterOffset:function(e){return this.latLngToLayerPoint(e).subtract(this._getCenterLayerPoint())},_limitZoom:function(e){var t=this.getMinZoom(),n=this.getMaxZoom();return Math.max(t,Math.min(n,e))}}),n.Map.addInitHook=function(e){var t=Array.prototype.slice.call(arguments,1),n=typeof e=="function"?e:function(){this[e].apply(this,t)};this.prototype._initializers.push(n)},n.map=function(e,t){return new n.Map(e,t)},n.Projection.Mercator={MAX_LATITUDE:85.0840591556,R_MINOR:6356752.3142,R_MAJOR:6378137,project:function(e){var t=n.LatLng.DEG_TO_RAD,r=this.MAX_LATITUDE,i=Math.max(Math.min(r,e.lat),-r),s=this.R_MAJOR,o=this.R_MINOR,u=e.lng*t*s,a=i*t,f=o/s,l=Math.sqrt(1-f*f),c=l*Math.sin(a);c=Math.pow((1-c)/(1+c),l*.5);var h=Math.tan(.5*(Math.PI*.5-a))/c;return a=-o*Math.log(h),new n.Point(u,a)},unproject:function(e){var t=n.LatLng.RAD_TO_DEG,r=this.R_MAJOR,i=this.R_MINOR,s=e.x*t/r,o=i/r,u=Math.sqrt(1-o*o),a=Math.exp(-e.y/i),f=Math.PI/2-2*Math.atan(a),l=15,c=1e-7,h=l,p=.1,d;while(Math.abs(p)>c&&--h>0)d=u*Math.sin(f),p=Math.PI/2-2*Math.atan(a*Math.pow((1-d)/(1+d),.5*u))-f,f+=p;return new n.LatLng(f*t,s,!0)}},n.CRS.EPSG3395=n.Util.extend({},n.CRS,{code:"EPSG:3395",projection:n.Projection.Mercator,transformation:function(){var e=n.Projection.Mercator,t=e.R_MAJOR,r=e.R_MINOR;return new n.Transformation(.5/(Math.PI*t),.5,-0.5/(Math.PI*r),.5)}()}),n.TileLayer=n.Class.extend({includes:n.Mixin.Events,options:{minZoom:0,maxZoom:18,tileSize:256,subdomains:"abc",errorTileUrl:"",attribution:"",zoomOffset:0,opacity:1,unloadInvisibleTiles:n.Browser.mobile,updateWhenIdle:n.Browser.mobile},initialize:function(e,t){t=n.Util.setOptions(this,t),t.detectRetina&&n.Browser.retina&&t.maxZoom>0&&(t.tileSize=Math.floor(t.tileSize/2),t.zoomOffset++,t.minZoom>0&&t.minZoom--,this.options.maxZoom--),this._url=e;var r=this.options.subdomains;typeof r=="string"&&(this.options.subdomains=r.split(""))},onAdd:function(e){this._map=e,this._initContainer(),this._createTileProto(),e.on({viewreset:this._resetCallback,moveend:this._update},this),this.options.updateWhenIdle||(this._limitedUpdate=n.Util.limitExecByInterval(this._update,150,this),e.on("move",this._limitedUpdate,this)),this._reset(),this._update()},addTo:function(e){return e.addLayer(this),this},onRemove:function(e){e._panes.tilePane.removeChild(this._container),e.off({viewreset:this._resetCallback,moveend:this._update},this),this.options.updateWhenIdle||e.off("move",this._limitedUpdate,this),this._container=null,this._map=null},bringToFront:function(){var e=this._map._panes.tilePane;return this._container&&(e.appendChild(this._container),this._setAutoZIndex(e,Math.max)),this},bringToBack:function(){var e=this._map._panes.tilePane;return this._container&&(e.insertBefore(this._container,e.firstChild),this._setAutoZIndex(e,Math.min)),this},getAttribution:function(){return this.options.attribution},setOpacity:function(e){return this.options.opacity=e,this._map&&this._updateOpacity(),this},setZIndex:function(e){return this.options.zIndex=e,this._updateZIndex(),this},setUrl:function(e,t){return this._url=e,t||this.redraw(),this},redraw:function(){return this._map&&(this._map._panes.tilePane.empty=!1,this._reset(!0),this._update()),this},_updateZIndex:function(){this._container&&this.options.zIndex!==t&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(e,t){var n=e.getElementsByClassName("leaflet-layer"),r=-t(Infinity,-Infinity),i;for(var s=0,o=n.length;s<o;s++)n[s]!==this._container&&(i=parseInt(n[s].style.zIndex,10),isNaN(i)||(r=t(r,i)));this._container.style.zIndex=isFinite(r)?r+t(1,-1):""},_updateOpacity:function(){n.DomUtil.setOpacity(this._container,this.options.opacity);var e,t=this._tiles;if(n.Browser.webkit)for(e in t)t.hasOwnProperty(e)&&(t[e].style.webkitTransform+=" translate(0,0)")},_initContainer:function(){var e=this._map._panes.tilePane;if(!this._container||e.empty)this._container=n.DomUtil.create("div","leaflet-layer"),this._updateZIndex(),e.appendChild(this._container),this.options.opacity<1&&this._updateOpacity()},_resetCallback:function(e){this._reset(e.hard)},_reset:function(e){var t,n=this._tiles;for(t in n)n.hasOwnProperty(t)&&this.fire("tileunload",{tile:n[t]});this._tiles={},this._tilesToLoad=0,this.options.reuseTiles&&(this._unusedTiles=[]),e&&this._container&&(this._container.innerHTML=""),this._initContainer()},_update:function(e){if(this._map._panTransition&&this._map._panTransition._inProgress)return;var t=this._map.getPixelBounds(),r=this._map.getZoom(),i=this.options.tileSize;if(r>this.options.maxZoom||r<this.options.minZoom)return;var s=new n.Point(Math.floor(t.min.x/i),Math.floor(t.min.y/i)),o=new n.Point(Math.floor(t.max.x/i),Math.floor(t.max.y/i)),u=new n.Bounds(s,o);this._addTilesFromCenterOut(u),(this.options.unloadInvisibleTiles||this.options.reuseTiles)&&this._removeOtherTiles(u)},_addTilesFromCenterOut:function(e){var t=[],r=e.getCenter(),i,s,o;for(i=e.min.y;i<=e.max.y;i++)for(s=e.min.x;s<=e.max.x;s++)o=new n.Point(s,i),this._tileShouldBeLoaded(o)&&t.push(o);var u=t.length;if(u===0)return;t.sort(function(e,t){return e.distanceTo(r)-t.distanceTo(r)});var a=document.createDocumentFragment();this._tilesToLoad||this.fire("loading"),this._tilesToLoad+=u;for(s=0;s<u;s++)this._addTile(t[s],a);this._container.appendChild(a)},_tileShouldBeLoaded:function(e){if(e.x+":"+e.y in this._tiles)return!1;if(!this.options.continuousWorld){var t=this._getWrapTileNum();if(this.options.noWrap&&(e.x<0||e.x>=t)||e.y<0||e.y>=t)return!1}return!0},_removeOtherTiles:function(e){var t,n,r,i;for(i in this._tiles)this._tiles.hasOwnProperty(i)&&(t=i.split(":"),n=parseInt(t[0],10),r=parseInt(t[1],10),(n<e.min.x||n>e.max.x||r<e.min.y||r>e.max.y)&&this._removeTile(i))},_removeTile:function(e){var t=this._tiles[e];this.fire("tileunload",{tile:t,url:t.src}),this.options.reuseTiles?(n.DomUtil.removeClass(t,"leaflet-tile-loaded"),this._unusedTiles.push(t)):t.parentNode===this._container&&this._container.removeChild(t),n.Browser.android||(t.src=n.Util.emptyImageUrl),delete this._tiles[e]},_addTile:function(e,t){var r=this._getTilePos(e),i=this._getTile();n.DomUtil.setPosition(i,r,n.Browser.chrome||n.Browser.android23),this._tiles[e.x+":"+e.y]=i,this._loadTile(i,e),i.parentNode!==this._container&&t.appendChild(i)},_getZoomForUrl:function(){var e=this.options,t=this._map.getZoom();return e.zoomReverse&&(t=e.maxZoom-t),t+e.zoomOffset},_getTilePos:function(e){var t=this._map.getPixelOrigin(),n=this.options.tileSize;return e.multiplyBy(n).subtract(t)},getTileUrl:function(e){return this._adjustTilePoint(e),n.Util.template(this._url,n.Util.extend({s:this._getSubdomain(e),z:this._getZoomForUrl(),x:e.x,y:e.y},this.options))},_getWrapTileNum:function(){return Math.pow(2,this._getZoomForUrl())},_adjustTilePoint:function(e){var t=this._getWrapTileNum();!this.options.continuousWorld&&!this.options.noWrap&&(e.x=(e.x%t+t)%t),this.options.tms&&(e.y=t-e.y-1)},_getSubdomain:function(e){var t=(e.x+e.y)%this.options.subdomains.length;return this.options.subdomains[t]},_createTileProto:function(){var e=this._tileImg=n.DomUtil.create("img","leaflet-tile");e.galleryimg="no";var t=this.options.tileSize;e.style.width=t+"px",e.style.height=t+"px"},_getTile:function(){if(this.options.reuseTiles&&this._unusedTiles.length>0){var e=this._unusedTiles.pop();return this._resetTile(e),e}return this._createTile()},_resetTile:function(e){},_createTile:function(){var e=this._tileImg.cloneNode(!1);return e.onselectstart=e.onmousemove=n.Util.falseFn,e},_loadTile:function(e,t){e._layer=this,e.onload=this._tileOnLoad,e.onerror=this._tileOnError,e.src=this.getTileUrl(t)},_tileLoaded:function(){this._tilesToLoad--,this._tilesToLoad||this.fire("load")},_tileOnLoad:function(e){var t=this._layer;this.src!==n.Util.emptyImageUrl&&(n.DomUtil.addClass(this,"leaflet-tile-loaded"),t.fire("tileload",{tile:this,url:this.src})),t._tileLoaded()},_tileOnError:function(e){var t=this._layer;t.fire("tileerror",{tile:this,url:this.src});var n=t.options.errorTileUrl;n&&(this.src=n),t._tileLoaded()}}),n.tileLayer=function(e,t){return new n.TileLayer(e,t)},n.TileLayer.WMS=n.TileLayer.extend({defaultWmsParams:{service:"WMS",request:"GetMap",version:"1.1.1",layers:"",styles:"",format:"image/jpeg",transparent:!1},initialize:function(e,t){this._url=e;var r=n.Util.extend({},this.defaultWmsParams);t.detectRetina&&n.Browser.retina?r.width=r.height=this.options.tileSize*2:r.width=r.height=this.options.tileSize;for(var i in t)this.options.hasOwnProperty(i)||(r[i]=t[i]);this.wmsParams=r,n.Util.setOptions(this,t)},onAdd:function(e){var t=parseFloat(this.wmsParams.version)>=1.3?"crs":"srs";this.wmsParams[t]=e.options.crs.code,n.TileLayer.prototype.onAdd.call(this,e)},getTileUrl:function(e,t){var r=this._map,i=r.options.crs,s=this.options.tileSize,o=e.multiplyBy(s),u=o.add(new n.Point(s,s)),a=i.project(r.unproject(o,t)),f=i.project(r.unproject(u,t)),l=[a.x,f.y,f.x,a.y].join(","),c=n.Util.template(this._url,{s:this._getSubdomain(e)});return c+n.Util.getParamString(this.wmsParams)+"&bbox="+l},setParams:function(e,t){return n.Util.extend(this.wmsParams,e),t||this.redraw(),this}}),n.tileLayer.wms=function(e,t){return new n.TileLayer.WMS(e,t)},n.TileLayer.Canvas=n.TileLayer.extend({options:{async:!1},initialize:function(e){n.Util.setOptions(this,e)},redraw:function(){var e,t=this._tiles;for(e in t)t.hasOwnProperty(e)&&this._redrawTile(t[e])},_redrawTile:function(e){this.drawTile(e,e._tilePoint,e._zoom)},_createTileProto:function(){var e=this._canvasProto=n.DomUtil.create("canvas","leaflet-tile"),t=this.options.tileSize;e.width=t,e.height=t},_createTile:function(){var e=this._canvasProto.cloneNode(!1);return e.onselectstart=e.onmousemove=n.Util.falseFn,e},_loadTile:function(e,t,n){e._layer=this,e._tilePoint=t,e._zoom=n,this.drawTile(e,t,n),this.options.async||this.tileDrawn(e)},drawTile:function(e,t,n){},tileDrawn:function(e){this._tileOnLoad.call(e)}}),n.tileLayer.canvas=function(e){return new n.TileLayer.Canvas(e)},n.ImageOverlay=n.Class.extend({includes:n.Mixin.Events,options:{opacity:1},initialize:function(e,t,r){this._url=e,this._bounds=n.latLngBounds(t),n.Util.setOptions(this,r)},onAdd:function(e){this._map=e,this._image||this._initImage(),e._panes.overlayPane.appendChild(this._image),e.on("viewreset",this._reset,this),e.options.zoomAnimation&&n.Browser.any3d&&e.on("zoomanim",this._animateZoom,this),this._reset()},onRemove:function(e){e.getPanes().overlayPane.removeChild(this._image),e.off("viewreset",this._reset,this),e.options.zoomAnimation&&e.off("zoomanim",this._animateZoom,this)},addTo:function(e){return e.addLayer(this),this},setOpacity:function(e){return this.options.opacity=e,this._updateOpacity(),this},bringToFront:function(){return this._image&&this._map._panes.overlayPane.appendChild(this._image),this},bringToBack:function(){var e=this._map._panes.overlayPane;return this._image&&e.insertBefore(this._image,e.firstChild),this},_initImage:function(){this._image=n.DomUtil.create("img","leaflet-image-layer"),this._map.options.zoomAnimation&&n.Browser.any3d?n.DomUtil.addClass(this._image,"leaflet-zoom-animated"):n.DomUtil.addClass(this._image,"leaflet-zoom-hide"),this._updateOpacity(),n.Util.extend(this._image,{galleryimg:"no",onselectstart:n.Util.falseFn,onmousemove:n.Util.falseFn,onload:n.Util.bind(this._onImageLoad,this),src:this._url})},_animateZoom:function(e){var t=this._map,r=this._image,i=t.getZoomScale(e.zoom),s=this._bounds.getNorthWest(),o=this._bounds.getSouthEast(),u=t._latLngToNewLayerPoint(s,e.zoom,e.center),a=t._latLngToNewLayerPoint(o,e.zoom,e.center).subtract(u),f=t.latLngToLayerPoint(o).subtract(t.latLngToLayerPoint(s)),l=u.add(a.subtract(f).divideBy(2));r.style[n.DomUtil.TRANSFORM]=n.DomUtil.getTranslateString(l)+" scale("+i+") "},_reset:function(){var e=this._image,t=this._map.latLngToLayerPoint(this._bounds.getNorthWest()),r=this._map.latLngToLayerPoint(this._bounds.getSouthEast()).subtract(t);n.DomUtil.setPosition(e,t),e.style.width=r.x+"px",e.style.height=r.y+"px"},_onImageLoad:function(){this.fire("load")},_updateOpacity:function(){n.DomUtil.setOpacity(this._image,this.options.opacity)}}),n.imageOverlay=function(e,t,r){return new n.ImageOverlay(e,t,r)},n.Icon=n.Class.extend({options:{className:""},initialize:function(e){n.Util.setOptions(this,e)},createIcon:function(){return this._createIcon("icon")},createShadow:function(){return this._createIcon("shadow")},_createIcon:function(e){var t=this._getIconUrl(e);if(!t){if(e==="icon")throw Error("iconUrl not set in Icon options (see the docs).");return null}var n=this._createImg(t);return this._setIconStyles(n,e),n},_setIconStyles:function(e,t){var r=this.options,i=n.point(r[t+"Size"]),s;t==="shadow"?s=n.point(r.shadowAnchor||r.iconAnchor):s=n.point(r.iconAnchor),!s&&i&&(s=i.divideBy(2,!0)),e.className="leaflet-marker-"+t+" "+r.className,s&&(e.style.marginLeft=-s.x+"px",e.style.marginTop=-s.y+"px"),i&&(e.style.width=i.x+"px",e.style.height=i.y+"px")},_createImg:function(e){var t;return n.Browser.ie6?(t=document.createElement("div"),t.style.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+e+'")'):(t=document.createElement("img"),t.src=e),t},_getIconUrl:function(e){return this.options[e+"Url"]}}),n.icon=function(e){return new n.Icon(e)},n.Icon.Default=n.Icon.extend({options:{iconSize:new n.Point(25,41),iconAnchor:new n.Point(13,41),popupAnchor:new n.Point(1,-34),shadowSize:new n.Point(41,41)},_getIconUrl:function(e){var t=e+"Url";if(this.options[t])return this.options[t];var r=n.Icon.Default.imagePath;if(!r)throw Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");return r+"/marker-"+e+".png"}}),n.Icon.Default.imagePath=function(){var e=document.getElementsByTagName("script"),t=/\/?leaflet[\-\._]?([\w\-\._]*)\.js\??/,n,r,i,s;for(n=0,r=e.length;n<r;n++){i=e[n].src,s=i.match(t);if(s)return i.split(t)[0]+"/images"}}(),n.Marker=n.Class.extend({includes:n.Mixin.Events,options:{icon:new n.Icon.Default,title:"",clickable:!0,draggable:!1,zIndexOffset:0,opacity:1},initialize:function(e,t){n.Util.setOptions(this,t),this._latlng=n.latLng(e)},onAdd:function(e){this._map=e,e.on("viewreset",this.update,this),this._initIcon(),this.update(),e.options.zoomAnimation&&e.options.markerZoomAnimation&&e.on("zoomanim",this._animateZoom,this)},addTo:function(e){return e.addLayer(this),this},onRemove:function(e){this._removeIcon(),this.closePopup&&this.closePopup(),e.off({viewreset:this.update,zoomanim:this._animateZoom},this),this._map=null},getLatLng:function(){return this._latlng},setLatLng:function(e){this._latlng=n.latLng(e),this.update(),this._popup&&this._popup.setLatLng(e)},setZIndexOffset:function(e){this.options.zIndexOffset=e,this.update()},setIcon:function(e){this._map&&this._removeIcon(),this.options.icon=e,this._map&&(this._initIcon(),this.update())},update:function(){if(!this._icon)return;var e=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(e)},_initIcon:function(){var e=this.options,t=this._map,r=t.options.zoomAnimation&&t.options.markerZoomAnimation,i=r?"leaflet-zoom-animated":"leaflet-zoom-hide",s=!1;this._icon||(this._icon=e.icon.createIcon(),e.title&&(this._icon.title=e.title),this._initInteraction(),s=this.options.opacity<1,n.DomUtil.addClass(this._icon,i)),this._shadow||(this._shadow=e.icon.createShadow(),this._shadow&&(n.DomUtil.addClass(this._shadow,i),s=this.options.opacity<1)),s&&this._updateOpacity();var o=this._map._panes;o.markerPane.appendChild(this._icon),this._shadow&&o.shadowPane.appendChild(this._shadow)},_removeIcon:function(){var e=this._map._panes;e.markerPane.removeChild(this._icon),this._shadow&&e.shadowPane.removeChild(this._shadow),this._icon=this._shadow=null},_setPos:function(e){n.DomUtil.setPosition(this._icon,e),this._shadow&&n.DomUtil.setPosition(this._shadow,e),this._icon.style.zIndex=e.y+this.options.zIndexOffset},_animateZoom:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center);this._setPos(t)},_initInteraction:function(){if(!this.options.clickable)return;var e=this._icon,t=["dblclick","mousedown","mouseover","mouseout"];n.DomUtil.addClass(e,"leaflet-clickable"),n.DomEvent.on(e,"click",this._onMouseClick,this);for(var r=0;r<t.length;r++)n.DomEvent.on(e,t[r],this._fireMouseEvent,this);n.Handler.MarkerDrag&&(this.dragging=new n.Handler.MarkerDrag(this),this.options.draggable&&this.dragging.enable())},_onMouseClick:function(e){n.DomEvent.stopPropagation(e);if(this.dragging&&this.dragging.moved())return;if(this._map.dragging&&this._map.dragging.moved())return;this.fire(e.type,{originalEvent:e})},_fireMouseEvent:function(e){this.fire(e.type,{originalEvent:e}),e.type!=="mousedown"&&n.DomEvent.stopPropagation(e)},setOpacity:function(e){this.options.opacity=e,this._map&&this._updateOpacity()},_updateOpacity:function(){n.DomUtil.setOpacity(this._icon,this.options.opacity),this._shadow&&n.DomUtil.setOpacity(this._shadow,this.options.opacity)}}),n.marker=function(e,t){return new n.Marker(e,t)},n.DivIcon=n.Icon.extend({options:{iconSize:new n.Point(12,12),className:"leaflet-div-icon"},createIcon:function(){var e=document.createElement("div"),t=this.options;return t.html&&(e.innerHTML=t.html),t.bgPos&&(e.style.backgroundPosition=-t.bgPos.x+"px "+ -t.bgPos.y+"px"),this._setIconStyles(e,"icon"),e},createShadow:function(){return null}}),n.divIcon=function(e){return new n.DivIcon(e)},n.Map.mergeOptions({closePopupOnClick:!0}),n.Popup=n.Class.extend({includes:n.Mixin.Events,options:{minWidth:50,maxWidth:300,maxHeight:null,autoPan:!0,closeButton:!0,offset:new n.Point(0,6),autoPanPadding:new n.Point(5,5),className:""},initialize:function(e,t){n.Util.setOptions(this,e),this._source=t},onAdd:function(e){this._map=e,this._container||this._initLayout(),this._updateContent();var t=e.options.fadeAnimation;t&&n.DomUtil.setOpacity(this._container,0),e._panes.popupPane.appendChild(this._container),e.on("viewreset",this._updatePosition,this),n.Browser.any3d&&e.on("zoomanim",this._zoomAnimation,this),e.options.closePopupOnClick&&e.on("preclick",this._close,this),this._update(),t&&n.DomUtil.setOpacity(this._container,1)},addTo:function(e){return e.addLayer(this),this},openOn:function(e){return e.openPopup(this),this},onRemove:function(e){e._panes.popupPane.removeChild(this._container),n.Util.falseFn(this._container.offsetWidth),e.off({viewreset:this._updatePosition,preclick:this._close,zoomanim:this._zoomAnimation},this),e.options.fadeAnimation&&n.DomUtil.setOpacity(this._container,0),this._map=null},setLatLng:function(e){return this._latlng=n.latLng(e),this._update(),this},setContent:function(e){return this._content=e,this._update(),this},_close:function(){var e=this._map;e&&(e._popup=null,e.removeLayer(this).fire("popupclose",{popup:this}))},_initLayout:function(){var e="leaflet-popup",t=this._container=n.DomUtil.create("div",e+" "+this.options.className+" leaflet-zoom-animated"),r;this.options.closeButton&&(r=this._closeButton=n.DomUtil.create("a",e+"-close-button",t),r.href="#close",r.innerHTML="&#215;",n.DomEvent.on(r,"click",this._onCloseButtonClick,this));var i=this._wrapper=n.DomUtil.create("div",e+"-content-wrapper",t);n.DomEvent.disableClickPropagation(i),this._contentNode=n.DomUtil.create("div",e+"-content",i),n.DomEvent.on(this._contentNode,"mousewheel",n.DomEvent.stopPropagation),this._tipContainer=n.DomUtil.create("div",e+"-tip-container",t),this._tip=n.DomUtil.create("div",e+"-tip",this._tipContainer)},_update:function(){if(!this._map)return;this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan()},_updateContent:function(){if(!this._content)return;if(typeof this._content=="string")this._contentNode.innerHTML=this._content;else{while(this._contentNode.hasChildNodes())this._contentNode.removeChild(this._contentNode.firstChild);this._contentNode.appendChild(this._content)}this.fire("contentupdate")},_updateLayout:function(){var e=this._contentNode,t=e.style;t.width="",t.whiteSpace="nowrap";var r=e.offsetWidth;r=Math.min(r,this.options.maxWidth),r=Math.max(r,this.options.minWidth),t.width=r+1+"px",t.whiteSpace="",t.height="";var i=e.offsetHeight,s=this.options.maxHeight,o="leaflet-popup-scrolled";s&&i>s?(t.height=s+"px",n.DomUtil.addClass(e,o)):n.DomUtil.removeClass(e,o),this._containerWidth=this._container.offsetWidth},_updatePosition:function(){var e=this._map.latLngToLayerPoint(this._latlng),t=n.Browser.any3d,r=this.options.offset;t&&n.DomUtil.setPosition(this._container,e),this._containerBottom=-r.y-(t?0:e.y),this._containerLeft=-Math.round(this._containerWidth/2)+r.x+(t?0:e.x),this._container.style.bottom=this._containerBottom+"px",this._container.style.left=this._containerLeft+"px"},_zoomAnimation:function(e){var t=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center);n.DomUtil.setPosition(this._container,t)},_adjustPan:function(){if(!this.options.autoPan)return;var e=this._map,t=this._container.offsetHeight,r=this._containerWidth,i=new n.Point(this._containerLeft,-t-this._containerBottom);n.Browser.any3d&&i._add(n.DomUtil.getPosition(this._container));var s=e.layerPointToContainerPoint(i),o=this.options.autoPanPadding,u=e.getSize(),a=0,f=0;s.x<0&&(a=s.x-o.x),s.x+r>u.x&&(a=s.x+r-u.x+o.x),s.y<0&&(f=s.y-o.y),s.y+t>u.y&&(f=s.y+t-u.y+o.y),(a||f)&&e.panBy(new n.Point(a,f))},_onCloseButtonClick:function(e){this._close(),n.DomEvent.stop(e)}}),n.popup=function(e,t){return new n.Popup(e,t)},n.Marker.include({openPopup:function(){return this._popup&&this._map&&(this._popup.setLatLng(this._latlng),this._map.openPopup(this._popup)),this},closePopup:function(){return this._popup&&this._popup._close(),this},bindPopup:function(e,t){var r=n.point(this.options.icon.options.popupAnchor)||new n.Point(0,0);return r=r.add(n.Popup.prototype.options.offset),t&&t.offset&&(r=r.add(t.offset)),t=n.Util.extend({offset:r},t),this._popup||this.on("click",this.openPopup,this),this._popup=(new n.Popup(t,this)).setContent(e),this},unbindPopup:function(){return this._popup&&(this._popup=null,this.off("click",this.openPopup)),this}}),n.Map.include({openPopup:function(e){return this.closePopup(),this._popup=e,this.addLayer(e).fire("popupopen",{popup:this._popup})},closePopup:function(){return this._popup&&this._popup._close(),this}}),n.LayerGroup=n.Class.extend({initialize:function(e){this._layers={};var t,n;if(e)for(t=0,n=e.length;t<n;t++)this.addLayer(e[t])},addLayer:function(e){var t=n.Util.stamp(e);return this._layers[t]=e,this._map&&this._map.addLayer(e),this},removeLayer:function(e){var t=n.Util.stamp(e);return delete this._layers[t],this._map&&this._map.removeLayer(e),this},clearLayers:function(){return this.eachLayer(this.removeLayer,this),this},invoke:function(e){var t=Array.prototype.slice.call(arguments,1),n,r;for(n in this._layers)this._layers.hasOwnProperty(n)&&(r=this._layers[n],r[e]&&r[e].apply(r,t));return this},onAdd:function(e){this._map=e,this.eachLayer(e.addLayer,e)},onRemove:function(e){this.eachLayer(e.removeLayer,e),this._map=null},addTo:function(e){return e.addLayer(this),this},eachLayer:function(e,t){for(var n in this._layers)this._layers.hasOwnProperty(n)&&e.call(t,this._layers[n])}}),n.layerGroup=function(e){return new n.LayerGroup(e)},n.FeatureGroup=n.LayerGroup.extend({includes:n.Mixin.Events,addLayer:function(e){return this._layers[n.Util.stamp(e)]?this:(e.on("click dblclick mouseover mouseout mousemove contextmenu",this._propagateEvent,this),n.LayerGroup.prototype.addLayer.call(this,e),this._popupContent&&e.bindPopup&&e.bindPopup(this._popupContent),this)},removeLayer:function(e){return e.off("click dblclick mouseover mouseout mousemove contextmenu",this._propagateEvent,this),n.LayerGroup.prototype.removeLayer.call(this,e),this._popupContent?this.invoke("unbindPopup"):this},bindPopup:function(e){return this._popupContent=e,this.invoke("bindPopup",e)},setStyle:function(e){return this.invoke("setStyle",e)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var e=new n.LatLngBounds;return this.eachLayer(function(t){e.extend(t instanceof n.Marker?t.getLatLng():t.getBounds())},this),e},_propagateEvent:function(e){e.layer=e.target,e.target=this,this.fire(e.type,e)}}),n.featureGroup=function(e){return new n.FeatureGroup(e)},n.Path=n.Class.extend({includes:[n.Mixin.Events],statics:{CLIP_PADDING:n.Browser.mobile?Math.max(0,Math.min(.5,(1280/Math.max(e.innerWidth,e.innerHeight)-1)/2)):.5},options:{stroke:!0,color:"#0033ff",dashArray:null,weight:5,opacity:.5,fill:!1,fillColor:null,fillOpacity:.2,clickable:!0},initialize:function(e){n.Util.setOptions(this,e)},onAdd:function(e){this._map=e,this._container||(this._initElements(),this._initEvents()),this.projectLatlngs(),this._updatePath(),this._container&&this._map._pathRoot.appendChild(this._container),e.on({viewreset:this.projectLatlngs,moveend:this._updatePath},this)},addTo:function(e){return e.addLayer(this),this},onRemove:function(e){e._pathRoot.removeChild(this._container),this._map=null,n.Browser.vml&&(this._container=null,this._stroke=null,this._fill=null),e.off({viewreset:this.projectLatlngs,moveend:this._updatePath},this)},projectLatlngs:function(){},setStyle:function(e){return n.Util.setOptions(this,e),this._container&&this._updateStyle(),this},redraw:function(){return this._map&&(this.projectLatlngs(),this._updatePath()),this}}),n.Map.include({_updatePathViewport:function(){var e=n.Path.CLIP_PADDING,t=this.getSize(),r=n.DomUtil.getPosition(this._mapPane),i=r.multiplyBy(-1)._subtract(t.multiplyBy(e)),s=i.add(t.multiplyBy(1+e*2));this._pathViewport=new n.Bounds(i,s)}}),n.Path.SVG_NS="http://www.w3.org/2000/svg",n.Browser.svg=!!document.createElementNS&&!!document.createElementNS(n.Path.SVG_NS,"svg").createSVGRect,n.Path=n.Path.extend({statics:{SVG:n.Browser.svg},bringToFront:function(){return this._container&&this._map._pathRoot.appendChild(this._container),this},bringToBack:function(){if(this._container){var e=this._map._pathRoot;e.insertBefore(this._container,e.firstChild)}return this},getPathString:function(){},_createElement:function(e){return document.createElementNS(n.Path.SVG_NS,e)},_initElements:function(){this._map._initPathRoot(),this._initPath(),this._initStyle()},_initPath:function(){this._container=this._createElement("g"),this._path=this._createElement("path"),this._container.appendChild(this._path)},_initStyle:function(){this.options.stroke&&(this._path.setAttribute("stroke-linejoin","round"),this._path.setAttribute("stroke-linecap","round")),this.options.fill&&this._path.setAttribute("fill-rule","evenodd"),this._updateStyle()},_updateStyle:function(){this.options.stroke?(this._path.setAttribute("stroke",this.options.color),this._path.setAttribute("stroke-opacity",this.options.opacity),this._path.setAttribute("stroke-width",this.options.weight),this.options.dashArray?this._path.setAttribute("stroke-dasharray",this.options.dashArray):this._path.removeAttribute("stroke-dasharray")):this._path.setAttribute("stroke","none"),this.options.fill?(this._path.setAttribute("fill",this.options.fillColor||this.options.color),this._path.setAttribute("fill-opacity",this.options.fillOpacity)):this._path.setAttribute("fill","none")},_updatePath:function(){var e=this.getPathString();e||(e="M0 0"),this._path.setAttribute("d",e)},_initEvents:function(){if(this.options.clickable){(n.Browser.svg||!n.Browser.vml)&&this._path.setAttribute("class","leaflet-clickable"),n.DomEvent.on(this._container,"click",this._onMouseClick,this);var e=["dblclick","mousedown","mouseover","mouseout","mousemove","contextmenu"];for(var t=0;t<e.length;t++)n.DomEvent.on(this._container,e[t],this._fireMouseEvent,this)}},_onMouseClick:function(e){if(this._map.dragging&&this._map.dragging.moved())return;this._fireMouseEvent(e),n.DomEvent.stopPropagation(e)},_fireMouseEvent:function(e){if(!this.hasEventListeners(e.type))return;e.type==="contextmenu"&&n.DomEvent.preventDefault(e);var t=this._map,r=t.mouseEventToContainerPoint(e),i=t.containerPointToLayerPoint(r),s=t.layerPointToLatLng(i);this.fire(e.type,{latlng:s,layerPoint:i,containerPoint:r,originalEvent:e})}}),n.Map.include({_initPathRoot:function(){this._pathRoot||(this._pathRoot=n.Path.prototype._createElement("svg"),this._panes.overlayPane.appendChild(this._pathRoot),this.options.zoomAnimation&&n.Browser.any3d?(this._pathRoot.setAttribute("class"," leaflet-zoom-animated"),this.on({zoomanim:this._animatePathZoom,zoomend:this._endPathZoom})):this._pathRoot.setAttribute("class"," leaflet-zoom-hide"),this.on("moveend",this._updateSvgViewport),this._updateSvgViewport())},_animatePathZoom:function(e){var t=this.getZoomScale(e.zoom),r=this._getCenterOffset(e.center).divideBy(1-1/t),i=this.containerPointToLayerPoint(this.getSize().multiplyBy(-n.Path.CLIP_PADDING)),s=i.add(r).round();this._pathRoot.style[n.DomUtil.TRANSFORM]=n.DomUtil.getTranslateString(s.multiplyBy(-1).add(n.DomUtil.getPosition(this._pathRoot)).multiplyBy(t).add(s))+" scale("+t+") ",this._pathZooming=!0},_endPathZoom:function(){this._pathZooming=!1},_updateSvgViewport:function(){if(this._pathZooming)return;this._updatePathViewport();var e=this._pathViewport,t=e.min,r=e.max,i=r.x-t.x,s=r.y-t.y,o=this._pathRoot,u=this._panes.overlayPane;n.Browser.mobileWebkit&&u.removeChild(o),n.DomUtil.setPosition(o,t),o.setAttribute("width",i),o.setAttribute("height",s),o.setAttribute("viewBox",[t.x,t.y,i,s].join(" ")),n.Browser.mobileWebkit&&u.appendChild(o)}}),n.Path.include({bindPopup:function(e,t){if(!this._popup||this._popup.options!==t)this._popup=new n.Popup(t,this);return this._popup.setContent(e),this._openPopupAdded||(this.on("click",this._openPopup,this),this._openPopupAdded=!0),this},openPopup:function(e){return this._popup&&(e=e||this._latlng||this._latlngs[Math.floor(this._latlngs.length/2)],this._openPopup({latlng:e})),this},_openPopup:function(e){this._popup.setLatLng(e.latlng),this._map.openPopup(this._popup)}}),n.Browser.vml=function(){try{var e=document.createElement("div");e.innerHTML='<v:shape adj="1"/>';var t=e.firstChild;return t.style.behavior="url(#default#VML)",t&&typeof t.adj=="object"}catch(n){return!1}}(),n.Path=n.Browser.svg||!n.Browser.vml?n.Path:n.Path.extend({statics:{VML:!0,CLIP_PADDING:.02},_createElement:function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(e){return document.createElement("<lvml:"+e+' class="lvml">')}}catch(e){return function(e){return document.createElement("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}}(),_initPath:function(){var e=this._container=this._createElement("shape");n.DomUtil.addClass(e,"leaflet-vml-shape"),this.options.clickable&&n.DomUtil.addClass(e,"leaflet-clickable"),e.coordsize="1 1",this._path=this._createElement("path"),e.appendChild(this._path),this._map._pathRoot.appendChild(e)},_initStyle:function(){this._updateStyle()},_updateStyle:function(){var e=this._stroke,t=this._fill,n=this.options,r=this._container;r.stroked=n.stroke,r.filled=n.fill,n.stroke?(e||(e=this._stroke=this._createElement("stroke"),e.endcap="round",r.appendChild(e)),e.weight=n.weight+"px",e.color=n.color,e.opacity=n.opacity,n.dashArray?e.dashStyle=n.dashArray.replace(/ *, */g," "):e.dashStyle=""):e&&(r.removeChild(e),this._stroke=null),n.fill?(t||(t=this._fill=this._createElement("fill"),r.appendChild(t)),t.color=n.fillColor||n.color,t.opacity=n.fillOpacity):t&&(r.removeChild(t),this._fill=null)},_updatePath:function(){var e=this._container.style;e.display="none",this._path.v=this.getPathString()+" ",e.display=""}}),n.Map.include(n.Browser.svg||!n.Browser.vml?{}:{_initPathRoot:function(){if(this._pathRoot)return;var e=this._pathRoot=document.createElement("div");e.className="leaflet-vml-container",this._panes.overlayPane.appendChild(e),this.on("moveend",this._updatePathViewport),this._updatePathViewport()}}),n.Browser.canvas=function(){return!!document.createElement("canvas").getContext}(),n.Path=n.Path.SVG&&!e.L_PREFER_CANVAS||!n.Browser.canvas?n.Path:n.Path.extend({statics:{CANVAS:!0,SVG:!1},redraw:function(){return this._map&&(this.projectLatlngs(),this._requestUpdate()),this},setStyle:function(e){return n.Util.setOptions(this,e),this._map&&(this._updateStyle(),this._requestUpdate()),this},onRemove:function(e){e.off("viewreset",this.projectLatlngs,this).off("moveend",this._updatePath,this),this._requestUpdate(),this._map=null},_requestUpdate:function(){this._map&&(n.Util.cancelAnimFrame(this._fireMapMoveEnd),this._updateRequest=n.Util.requestAnimFrame(this._fireMapMoveEnd,this._map))},_fireMapMoveEnd:function(){this.fire("moveend")},_initElements:function(){this._map._initPathRoot(),this._ctx=this._map._canvasCtx},_updateStyle:function(){var e=this.options;e.stroke&&(this._ctx.lineWidth=e.weight,this._ctx.strokeStyle=e.color),e.fill&&(this._ctx.fillStyle=e.fillColor||e.color)},_drawPath:function(){var e,t,r,i,s,o;this._ctx.beginPath();for(e=0,r=this._parts.length;e<r;e++){for(t=0,i=this._parts[e].length;t<i;t++)s=this._parts[e][t],o=(t===0?"move":"line")+"To",this._ctx[o](s.x,s.y);this instanceof n.Polygon&&this._ctx.closePath()}},_checkIfEmpty:function(){return!this._parts.length},_updatePath:function(){if(this._checkIfEmpty())return;var e=this._ctx,t=this.options;this._drawPath(),e.save(),this._updateStyle(),t.fill&&(t.fillOpacity<1&&(e.globalAlpha=t.fillOpacity),e.fill()),t.stroke&&(t.opacity<1&&(e.globalAlpha=t.opacity),e.stroke()),e.restore()},_initEvents:function(){this.options.clickable&&this._map.on("click",this._onClick,this)},_onClick:function(e){this._containsPoint(e.layerPoint)&&this.fire("click",e)}}),n.Map.include(n.Path.SVG&&!e.L_PREFER_CANVAS||!n.Browser.canvas?{}:{_initPathRoot:function(){var e=this._pathRoot,t;e||(e=this._pathRoot=document.createElement("canvas"),e.style.position="absolute",t=this._canvasCtx=e.getContext("2d"),t.lineCap="round",t.lineJoin="round",this._panes.overlayPane.appendChild(e),this.options.zoomAnimation&&(this._pathRoot.className="leaflet-zoom-animated",this.on("zoomanim",this._animatePathZoom),this.on("zoomend",this._endPathZoom)),this.on("moveend",this._updateCanvasViewport),this._updateCanvasViewport())},_updateCanvasViewport:function(){if(this._pathZooming)return;this._updatePathViewport();var e=this._pathViewport,t=e.min,r=e.max.subtract(t),i=this._pathRoot;n.DomUtil.setPosition(i,t),i.width=r.x,i.height=r.y,i.getContext("2d").translate(-t.x,-t.y)}}),n.LineUtil={simplify:function(e,t){if(!t||!e.length)return e.slice();var n=t*t;return e=this._reducePoints(e,n),e=this._simplifyDP(e,n),e},pointToSegmentDistance:function(e,t,n){return Math.sqrt(this._sqClosestPointOnSegment(e,t,n,!0))},closestPointOnSegment:function(e,t,n){return this._sqClosestPointOnSegment(e,t,n)},_simplifyDP:function(e,n){var r=e.length,i=typeof Uint8Array!=t+""?Uint8Array:Array,s=new i(r);s[0]=s[r-1]=1,this._simplifyDPStep(e,s,n,0,r-1);var o,u=[];for(o=0;o<r;o++)s[o]&&u.push(e[o]);return u},_simplifyDPStep:function(e,t,n,r,i){var s=0,o,u,a;for(u=r+1;u<=i-1;u++)a=this._sqClosestPointOnSegment(e[u],e[r],e[i],!0),a>s&&(o=u,s=a);s>n&&(t[o]=1,this._simplifyDPStep(e,t,n,r,o),this._simplifyDPStep(e,t,n,o,i))},_reducePoints:function(e,t){var n=[e[0]];for(var r=1,i=0,s=e.length;r<s;r++)this._sqDist(e[r],e[i])>t&&(n.push(e[r]),i=r);return i<s-1&&n.push(e[s-1]),n},clipSegment:function(e,t,n,r){var i=n.min,s=n.max,o=r?this._lastCode:this._getBitCode(e,n),u=this._getBitCode(t,n);this._lastCode=u;for(;;){if(!(o|u))return[e,t];if(o&u)return!1;var a=o||u,f=this._getEdgeIntersection(e,t,a,n),l=this._getBitCode(f,n);a===o?(e=f,o=l):(t=f,u=l)}},_getEdgeIntersection:function(e,t,r,i){var s=t.x-e.x,o=t.y-e.y,u=i.min,a=i.max;if(r&8)return new n.Point(e.x+s*(a.y-e.y)/o,a.y);if(r&4)return new n.Point(e.x+s*(u.y-e.y)/o,u.y);if(r&2)return new n.Point(a.x,e.y+o*(a.x-e.x)/s);if(r&1)return new n.Point(u.x,e.y+o*(u.x-e.x)/s)},_getBitCode:function(e,t){var n=0;return e.x<t.min.x?n|=1:e.x>t.max.x&&(n|=2),e.y<t.min.y?n|=4:e.y>t.max.y&&(n|=8),n},_sqDist:function(e,t){var n=t.x-e.x,r=t.y-e.y;return n*n+r*r},_sqClosestPointOnSegment:function(e,t,r,i){var s=t.x,o=t.y,u=r.x-s,a=r.y-o,f=u*u+a*a,l;return f>0&&(l=((e.x-s)*u+(e.y-o)*a)/f,l>1?(s=r.x,o=r.y):l>0&&(s+=u*l,o+=a*l)),u=e.x-s,a=e.y-o,i?u*u+a*a:new n.Point(s,o)}},n.Polyline=n.Path.extend({initialize:function(e,t){n.Path.prototype.initialize.call(this,t),this._latlngs=this._convertLatLngs(e),n.Handler.PolyEdit&&(this.editing=new n.Handler.PolyEdit(this),this.options.editable&&this.editing.enable())},options:{smoothFactor:1,noClip:!1},projectLatlngs:function(){this._originalPoints=[];for(var e=0,t=this._latlngs.length;e<t;e++)this._originalPoints[e]=this._map.latLngToLayerPoint(this._latlngs[e])},getPathString:function(){for(var e=0,t=this._parts.length,n="";e<t;e++)n+=this._getPathPartStr(this._parts[e]);return n},getLatLngs:function(){return this._latlngs},setLatLngs:function(e){return this._latlngs=this._convertLatLngs(e),this.redraw()},addLatLng:function(e){return this._latlngs.push(n.latLng(e)),this.redraw()},spliceLatLngs:function(e,t){var n=[].splice.apply(this._latlngs,arguments);return this._convertLatLngs(this._latlngs),this.redraw(),n},closestLayerPoint:function(e){var t=Infinity,r=this._parts,i,s,o=null;for(var u=0,a=r.length;u<a;u++){var f=r[u];for(var l=1,c=f.length;l<c;l++){i=f[l-1],s=f[l];var h=n.LineUtil._sqClosestPointOnSegment(e,i,s,!0);h<t&&(t=h,o=n.LineUtil._sqClosestPointOnSegment(e,i,s))}}return o&&(o.distance=Math.sqrt(t)),o},getBounds:function(){var e=new n.LatLngBounds,t=this.getLatLngs();for(var r=0,i=t.length;r<i;r++)e.extend(t[r]);return e},onAdd:function(e){n.Path.prototype.onAdd.call(this,e),this.editing&&this.editing.enabled()&&this.editing.addHooks()},onRemove:function(e){this.editing&&this.editing.enabled()&&this.editing.removeHooks(),n.Path.prototype.onRemove.call(this,e)},_convertLatLngs:function(e){var t,r;for(t=0,r=e.length;t<r;t++){if(e[t]instanceof Array&&typeof e[t][0]!="number")return;e[t]=n.latLng(e[t])}return e},_initEvents:function(){n.Path.prototype._initEvents.call(this)},_getPathPartStr:function(e){var t=n.Path.VML;for(var r=0,i=e.length,s="",o;r<i;r++)o=e[r],t&&o._round(),s+=(r?"L":"M")+o.x+" "+o.y;return s},_clipPoints:function(){var e=this._originalPoints,t=e.length,r,i,s;if(this.options.noClip){this._parts=[e];return}this._parts=[];var o=this._parts,u=this._map._pathViewport,a=n.LineUtil;for(r=0,i=0;r<t-1;r++){s=a.clipSegment(e[r],e[r+1],u,r);if(!s)continue;o[i]=o[i]||[],o[i].push(s[0]);if(s[1]!==e[r+1]||r===t-2)o[i].push(s[1]),i++}},_simplifyPoints:function(){var e=this._parts,t=n.LineUtil;for(var r=0,i=e.length;r<i;r++)e[r]=t.simplify(e[r],this.options.smoothFactor)},_updatePath:function(){if(!this._map)return;this._clipPoints(),this._simplifyPoints(),n.Path.prototype._updatePath.call(this)}}),n.polyline=function(e,t){return new n.Polyline(e,t)},n.PolyUtil={},n.PolyUtil.clipPolygon=function(e,t){var r=t.min,i=t.max,s,o=[1,4,2,8],u,a,f,l,c,h,p,d,v=n.LineUtil;for(u=0,h=e.length;u<h;u++)e[u]._code=v._getBitCode(e[u],t);for(f=0;f<4;f++){p=o[f],s=[];for(u=0,h=e.length,a=h-1;u<h;a=u++)l=e[u],c=e[a],l._code&p?c._code&p||(d=v._getEdgeIntersection(c,l,p,t),d._code=v._getBitCode(d,t),s.push(d)):(c._code&p&&(d=v._getEdgeIntersection(c,l,p,t),d._code=v._getBitCode(d,t),s.push(d)),s.push(l));e=s}return e},n.Polygon=n.Polyline.extend({options:{fill:!0},initialize:function(e,t){n.Polyline.prototype.initialize.call(this,e,t),e&&e[0]instanceof Array&&typeof e[0][0]!="number"&&(this._latlngs=this._convertLatLngs(e[0]),this._holes=e.slice(1))},projectLatlngs:function(){n.Polyline.prototype.projectLatlngs.call(this),this._holePoints=[];if(!this._holes)return;for(var e=0,t=this._holes.length,r;e<t;e++){this._holePoints[e]=[];for(var i=0,s=this._holes[e].length;i<s;i++)this._holePoints[e][i]=this._map.latLngToLayerPoint(this._holes[e][i])}},_clipPoints:function(){var e=this._originalPoints,t=[];this._parts=[e].concat(this._holePoints);if(this.options.noClip)return;for(var r=0,i=this._parts.length;r<i;r++){var s=n.PolyUtil.clipPolygon(this._parts[r],this._map._pathViewport);if(!s.length)continue;t.push(s)}this._parts=t},_getPathPartStr:function(e){var t=n.Polyline.prototype._getPathPartStr.call(this,e);return t+(n.Browser.svg?"z":"x")}}),n.polygon=function(e,t){return new n.Polygon(e,t)},function(){function e(e){return n.FeatureGroup.extend({initialize:function(e,t){this._layers={},this._options=t,this.setLatLngs(e)},setLatLngs:function(t){var n=0,r=t.length;this.eachLayer(function(e){n<r?e.setLatLngs(t[n++]):this.removeLayer(e)},this);while(n<r)this.addLayer(new e(t[n++],this._options));return this}})}n.MultiPolyline=e(n.Polyline),n.MultiPolygon=e(n.Polygon),n.multiPolyline=function(e,t){return new n.MultiPolyline(e,t)},n.multiPolygon=function(e,t){return new n.MultiPolygon(e,t)}}(),n.Rectangle=n.Polygon.extend({initialize:function(e,t){n.Polygon.prototype.initialize.call(this,this._boundsToLatLngs(e),t)},setBounds:function(e){this.setLatLngs(this._boundsToLatLngs(e))},_boundsToLatLngs:function(e){return e=n.latLngBounds(e),[e.getSouthWest(),e.getNorthWest(),e.getNorthEast(),e.getSouthEast(),e.getSouthWest()]}}),n.rectangle=function(e,t){return new n.Rectangle(e,t)},n.Circle=n.Path.extend({initialize:function(e,t,r){n.Path.prototype.initialize.call(this,r),this._latlng=n.latLng(e),this._mRadius=t},options:{fill:!0},setLatLng:function(e){return this._latlng=n.latLng(e),this.redraw()},setRadius:function(e){return this._mRadius=e,this.redraw()},projectLatlngs:function(){var e=this._getLngRadius(),t=new n.LatLng(this._latlng.lat,this._latlng.lng-e,!0),r=this._map.latLngToLayerPoint(t);this._point=this._map.latLngToLayerPoint(this._latlng),this._radius=Math.max(Math.round(this._point.x-r.x),1)},getBounds:function(){var e=this._map,t=this._radius*Math.cos(Math.PI/4),r=e.project(this._latlng),i=new n.Point(r.x-t,r.y+t),s=new n.Point(r.x+t,r.y-t),o=e.unproject(i),u=e.unproject(s);return new n.LatLngBounds(o,u)},getLatLng:function(){return this._latlng},getPathString:function(){var e=this._point,t=this._radius;return this._checkIfEmpty()?"":n.Browser.svg?"M"+e.x+","+(e.y-t)+"A"+t+","+t+",0,1,1,"+(e.x-.1)+","+(e.y-t)+" z":(e._round(),t=Math.round(t),"AL "+e.x+","+e.y+" "+t+","+t+" 0,"+23592600)},getRadius:function(){return this._mRadius},_getLngRadius:function(){var e=40075017,t=e*Math.cos(n.LatLng.DEG_TO_RAD*this._latlng.lat);return this._mRadius/t*360},_checkIfEmpty:function(){if(!this._map)return!1;var e=this._map._pathViewport,t=this._radius,n=this._point;return n.x-t>e.max.x||n.y-t>e.max.y||n.x+t<e.min.x||n.y+t<e.min.y}}),n.circle=function(e,t,r){return new n.Circle(e,t,r)},n.CircleMarker=n.Circle.extend({options:{radius:10,weight:2},initialize:function(e,t){n.Circle.prototype.initialize.call(this,e,null,t),this._radius=this.options.radius},projectLatlngs:function(){this._point=this._map.latLngToLayerPoint(this._latlng)},setRadius:function(e){return this._radius=e,this.redraw()}}),n.circleMarker=function(e,t){return new n.CircleMarker(e,t)},n.Polyline.include(n.Path.CANVAS?{_containsPoint:function(e,t){var r,i,s,o,u,a,f,l=this.options.weight/2;n.Browser.touch&&(l+=10);for(r=0,o=this._parts.length;r<o;r++){f=this._parts[r];for(i=0,u=f.length,s=u-1;i<u;s=i++){if(!t&&i===0)continue;a=n.LineUtil.pointToSegmentDistance(e,f[s],f[i]);if(a<=l)return!0}}return!1}}:{}),n.Polygon.include(n.Path.CANVAS?{_containsPoint:function(e){var t=!1,r,i,s,o,u,a,f,l;if(n.Polyline.prototype._containsPoint.call(this,e,!0))return!0;for(o=0,f=this._parts.length;o<f;o++){r=this._parts[o];for(u=0,l=r.length,a=l-1;u<l;a=u++)i=r[u],s=r[a],i.y>e.y!=s.y>e.y&&e.x<(s.x-i.x)*(e.y-i.y)/(s.y-i.y)+i.x&&(t=!t)}return t}}:{}),n.Circle.include(n.Path.CANVAS?{_drawPath:function(){var e=this._point;this._ctx.beginPath(),this._ctx.arc(e.x,e.y,this._radius,0,Math.PI*2,!1)},_containsPoint:function(e){var t=this._point,n=this.options.stroke?this.options.weight/2:0;return e.distanceTo(t)<=this._radius+n}}:{}),n.GeoJSON=n.FeatureGroup.extend({initialize:function(e,t){n.Util.setOptions(this,t),this._layers={},e&&this.addData(e)},addData:function(e){var t=e instanceof Array?e:e.features,r,i;if(t){for(r=0,i=t.length;r<i;r++)this.addData(t[r]);return this}var s=this.options;if(s.filter&&!s.filter(e))return;var o=n.GeoJSON.geometryToLayer(e,s.pointToLayer);return o.feature=e,this.resetStyle(o),s.onEachFeature&&s.onEachFeature(e,o),this.addLayer(o)},resetStyle:function(e){var t=this.options.style;t&&this._setLayerStyle(e,t)},setStyle:function(e){this.eachLayer(function(t){this._setLayerStyle(t,e)},this)},_setLayerStyle:function(e,t){typeof t=="function"&&(t=t(e.feature)),e.setStyle&&e.setStyle(t)}}),n.Util.extend(n.GeoJSON,{geometryToLayer:function(e,t){var r=e.type==="Feature"?e.geometry:e,i=r.coordinates,s=[],o,u,a,f,l;switch(r.type){case"Point":return o=this.coordsToLatLng(i),t?t(e,o):new n.Marker(o);case"MultiPoint":for(a=0,f=i.length;a<f;a++)o=this.coordsToLatLng(i[a]),l=t?t(e,o):new n.Marker(o),s.push(l);return new n.FeatureGroup(s);case"LineString":return u=this.coordsToLatLngs(i),new n.Polyline(u);case"Polygon":return u=this.coordsToLatLngs(i,1),new n.Polygon(u);case"MultiLineString":return u=this.coordsToLatLngs(i,1),new n.MultiPolyline(u);case"MultiPolygon":return u=this.coordsToLatLngs(i,2),new n.MultiPolygon(u);case"GeometryCollection":for(a=0,f=r.geometries.length;a<f;a++)l=this.geometryToLayer(r.geometries[a],t),s.push(l);return new n.FeatureGroup(s);default:throw Error("Invalid GeoJSON object.")}},coordsToLatLng:function(e,t){var r=parseFloat(e[t?0:1]),i=parseFloat(e[t?1:0]);return new n.LatLng(r,i,!0)},coordsToLatLngs:function(e,t,n){var r,i=[],s,o;for(s=0,o=e.length;s<o;s++)r=t?this.coordsToLatLngs(e[s],t-1,n):this.coordsToLatLng(e[s],n),i.push(r);return i}}),n.geoJson=function(e,t){return new n.GeoJSON(e,t)},n.DomEvent={addListener:function(e,t,r,i){var s=n.Util.stamp(r),o="_leaflet_"+t+s,u,a,f;return e[o]?this:(u=function(t){return r.call(i||e,t||n.DomEvent._getEvent())},n.Browser.touch&&t==="dblclick"&&this.addDoubleTapListener?this.addDoubleTapListener(e,u,s):("addEventListener"in e?t==="mousewheel"?(e.addEventListener("DOMMouseScroll",u,!1),e.addEventListener(t,u,!1)):t==="mouseenter"||t==="mouseleave"?(a=u,f=t==="mouseenter"?"mouseover":"mouseout",u=function(t){if(!n.DomEvent._checkMouse(e,t))return;return a(t)},e.addEventListener(f,u,!1)):e.addEventListener(t,u,!1):"attachEvent"in e&&e.attachEvent("on"+t,u),e[o]=u,this))},removeListener:function(e,t,r){var i=n.Util.stamp(r),s="_leaflet_"+t+i,o=e[s];if(!o)return;return n.Browser.touch&&t==="dblclick"&&this.removeDoubleTapListener?this.removeDoubleTapListener(e,i):"removeEventListener"in e?t==="mousewheel"?(e.removeEventListener("DOMMouseScroll",o,!1),e.removeEventListener(t,o,!1)):t==="mouseenter"||t==="mouseleave"?e.removeEventListener(t==="mouseenter"?"mouseover":"mouseout",o,!1):e.removeEventListener(t,o,!1):"detachEvent"in e&&e.detachEvent("on"+t,o),e[s]=null,this},stopPropagation:function(e){return e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,this},disableClickPropagation:function(e){var t=n.DomEvent.stopPropagation;return n.DomEvent.addListener(e,n.Draggable.START,t).addListener(e,"click",t).addListener(e,"dblclick",t)},preventDefault:function(e){return e.preventDefault?e.preventDefault():e.returnValue=!1,this},stop:function(e){return n.DomEvent.preventDefault(e).stopPropagation(e)},getMousePosition:function(e,t){var r=document.body,i=document.documentElement,s=e.pageX?e.pageX:e.clientX+r.scrollLeft+i.scrollLeft,o=e.pageY?e.pageY:e.clientY+r.scrollTop+i.scrollTop,u=new n.Point(s,o);return t?u._subtract(n.DomUtil.getViewportOffset(t)):u},getWheelDelta:function(e){var t=0;return e.wheelDelta&&(t=e.wheelDelta/120),e.detail&&(t=-e.detail/3),t},_checkMouse:function(e,t){var n=t.relatedTarget;if(!n)return!0;try{while(n&&n!==e)n=n.parentNode}catch(r){return!1}return n!==e},_getEvent:function(){var t=e.event;if(!t){var n=arguments.callee.caller;while(n){t=n.arguments[0];if(t&&e.Event===t.constructor)break;n=n.caller}}return t}},n.DomEvent.on=n.DomEvent.addListener,n.DomEvent.off=n.DomEvent.removeListener,n.Draggable=n.Class.extend({includes:n.Mixin.Events,statics:{START:n.Browser.touch?"touchstart":"mousedown",END:n.Browser.touch?"touchend":"mouseup",MOVE:n.Browser.touch?"touchmove":"mousemove",TAP_TOLERANCE:15},initialize:function(e,t){this._element=e,this._dragStartTarget=t||e},enable:function(){if(this._enabled)return;n.DomEvent.on(this._dragStartTarget,n.Draggable.START,this._onDown,this),this._enabled=!0},disable:function(){if(!this._enabled)return;n.DomEvent.off(this._dragStartTarget,n.Draggable.START,this._onDown),this._enabled=!1,this._moved=!1},_onDown:function(e){if(!n.Browser.touch&&e.shiftKey||e.which!==1&&e.button!==1&&!e.touches)return;this._simulateClick=!0;if(e.touches&&e.touches.length>1){this._simulateClick=!1;return}var t=e.touches&&e.touches.length===1?e.touches[0]:e,r=t.target;n.DomEvent.preventDefault(e),n.Browser.touch&&r.tagName.toLowerCase()==="a"&&n.DomUtil.addClass(r,"leaflet-active"),this._moved=!1;if(this._moving)return;this._startPos=this._newPos=n.DomUtil.getPosition(this._element),this._startPoint=new n.Point(t.clientX,t.clientY),n.DomEvent.on(document,n.Draggable.MOVE,this._onMove,this),n.DomEvent.on(document,n.Draggable.END,this._onUp,this)},_onMove:function(e){if(e.touches&&e.touches.length>1)return;var t=e.touches&&e.touches.length===1?e.touches[0]:e,r=new n.Point(t.clientX,t.clientY),i=r.subtract(this._startPoint);if(!i.x&&!i.y)return;n.DomEvent.preventDefault(e),this._moved||(this.fire("dragstart"),this._moved=!0,n.Browser.touch||(n.DomUtil.disableTextSelection(),this._setMovingCursor())),this._newPos=this._startPos.add(i),this._moving=!0,n.Util.cancelAnimFrame(this._animRequest),this._animRequest=n.Util.requestAnimFrame(this._updatePosition,this,!0,this._dragStartTarget)},_updatePosition:function(){this.fire("predrag"),n.DomUtil.setPosition(this._element,this._newPos),this.fire("drag")},_onUp:function(e){if(this._simulateClick&&e.changedTouches){var t=e.changedTouches[0],r=t.target,i=this._newPos&&this._newPos.distanceTo(this._startPos)||0;r.tagName.toLowerCase()==="a"&&n.DomUtil.removeClass(r,"leaflet-active"),i<n.Draggable.TAP_TOLERANCE&&this._simulateEvent("click",t)}n.Browser.touch||(n.DomUtil.enableTextSelection(),this._restoreCursor()),n.DomEvent.off(document,n.Draggable.MOVE,this._onMove),n.DomEvent.off(document,n.Draggable.END,this._onUp),this._moved&&(n.Util.cancelAnimFrame(this._animRequest),this.fire("dragend")),this._moving=!1},_setMovingCursor:function(){n.DomUtil.addClass(document.body,"leaflet-dragging")},_restoreCursor:function(){n.DomUtil.removeClass(document.body,"leaflet-dragging")},_simulateEvent:function(t,n){var r=document.createEvent("MouseEvents");r.initMouseEvent(t,!0,!0,e,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),n.target.dispatchEvent(r)}}),n.Handler=n.Class.extend({initialize:function(e){this._map=e},enable:function(){if(this._enabled)return;this._enabled=!0,this.addHooks()},disable:function(){if(!this._enabled)return;this._enabled=!1,this.removeHooks()},enabled:function(){return!!this._enabled}}),n.Map.mergeOptions({dragging:!0,inertia:!n.Browser.android23,inertiaDeceleration:3e3,inertiaMaxSpeed:1500,inertiaThreshold:n.Browser.touch?32:14,worldCopyJump:!0}),n.Map.Drag=n.Handler.extend({addHooks:function(){if(!this._draggable){this._draggable=new n.Draggable(this._map._mapPane,this._map._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this);var e=this._map.options;e.worldCopyJump&&(this._draggable.on("predrag",this._onPreDrag,this),this._map.on("viewreset",this._onViewReset,this))}this._draggable.enable()},removeHooks:function(){this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},_onDragStart:function(){var e=this._map;e.fire("movestart").fire("dragstart"),e._panTransition&&e._panTransition._onTransitionEnd(!0),e.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(){if(this._map.options.inertia){var e=this._lastTime=+(new Date),t=this._lastPos=this._draggable._newPos;this._positions.push(t),this._times.push(e),e-this._times[0]>200&&(this._positions.shift(),this._times.shift())}this._map.fire("move").fire("drag")},_onViewReset:function(){var e=this._map.getSize().divideBy(2),t=this._map.latLngToLayerPoint(new n.LatLng(0,0));this._initialWorldOffset=t.subtract(e).x,this._worldWidth=this._map.project(new n.LatLng(0,180)).x},_onPreDrag:function(){var e=this._map,t=this._worldWidth,n=Math.round(t/2),r=this._initialWorldOffset,i=this._draggable._newPos.x,s=(i-n+r)%t+n-r,o=(i+n+r)%t-n-r,u=Math.abs(s+r)<Math.abs(o+r)?s:o;this._draggable._newPos.x=u},_onDragEnd:function(){var e=this._map,r=e.options,i=+(new Date)-this._lastTime,s=!r.inertia||i>r.inertiaThreshold||this._positions[0]===t;if(s)e.fire("moveend");else{var o=this._lastPos.subtract(this._positions[0]),u=(this._lastTime+i-this._times[0])/1e3,a=o.multiplyBy(.58/u),f=a.distanceTo(new n.Point(0,0)),l=Math.min(r.inertiaMaxSpeed,f),c=a.multiplyBy(l/f),h=l/r.inertiaDeceleration,p=c.multiplyBy(-h/2).round(),d={duration:h,easing:"ease-out"};n.Util.requestAnimFrame(n.Util.bind(function(){this._map.panBy(p,d)},this))}e.fire("dragend"),r.maxBounds&&n.Util.requestAnimFrame(this._panInsideMaxBounds,e,!0,e._container)},_panInsideMaxBounds:function(){this.panInsideBounds(this.options.maxBounds)}}),n.Map.addInitHook("addHandler","dragging",n.Map.Drag),n.Map.mergeOptions({doubleClickZoom:!0}),n.Map.DoubleClickZoom=n.Handler.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick)},_onDoubleClick:function(e){this.setView(e.latlng,this._zoom+1)}}),n.Map.addInitHook("addHandler","doubleClickZoom",n.Map.DoubleClickZoom),n.Map.mergeOptions({scrollWheelZoom:!n.Browser.touch}),n.Map.ScrollWheelZoom=n.Handler.extend({addHooks:function(){n.DomEvent.on(this._map._container,"mousewheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){n.DomEvent.off(this._map._container,"mousewheel",this._onWheelScroll)},_onWheelScroll:function(e){var t=n.DomEvent.getWheelDelta(e);this._delta+=t,this._lastMousePos=this._map.mouseEventToContainerPoint(e),clearTimeout(this._timer),this._timer=setTimeout(n.Util.bind(this._performZoom,this),40),n.DomEvent.preventDefault(e)},_performZoom:function(){var e=this._map,t=Math.round(this._delta),n=e.getZoom();t=Math.max(Math.min(t,4),-4),t=e._limitZoom(n+t)-n,this._delta=0;if(!t)return;var r=n+t,i=this._getCenterForScrollWheelZoom(this._lastMousePos,r);e.setView(i,r)},_getCenterForScrollWheelZoom:function(e,t){var n=this._map,r=n.getZoomScale(t),i=n.getSize().divideBy(2),s=e.subtract(i).multiplyBy(1-1/r),o=n._getTopLeftPoint().add(i).add(s);return n.unproject(o)}}),n.Map.addInitHook("addHandler","scrollWheelZoom",n.Map.ScrollWheelZoom),n.Util.extend(n.DomEvent,{addDoubleTapListener:function(e,t,n){function l(e){if(e.touches.length!==1)return;var t=Date.now(),n=t-(r||t);o=e.touches[0],i=n>0&&n<=s,r=t}function c(e){i&&(o.type="dblclick",t(o),r=null)}var r,i=!1,s=250,o,u="_leaflet_",a="touchstart",f="touchend";return e[u+a+n]=l,e[u+f+n]=c,e.addEventListener(a,l,!1),e.addEventListener(f,c,!1),this},removeDoubleTapListener:function(e,t){var n="_leaflet_";return e.removeEventListener(e,e[n+"touchstart"+t],!1),e.removeEventListener(e,e[n+"touchend"+t],!1),this}}),n.Map.mergeOptions({touchZoom:n.Browser.touch&&!n.Browser.android23}),n.Map.TouchZoom=n.Handler.extend({addHooks:function(){n.DomEvent.on(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){n.DomEvent.off(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(e){var t=this._map;if(!e.touches||e.touches.length!==2||t._animatingZoom||this._zooming)return;var r=t.mouseEventToLayerPoint(e.touches[0]),i=t.mouseEventToLayerPoint(e.touches[1]),s=t._getCenterLayerPoint();this._startCenter=r.add(i).divideBy(2,!0),this._startDist=r.distanceTo(i),this._moved=!1,this._zooming=!0,this._centerOffset=s.subtract(this._startCenter),n.DomEvent.on(document,"touchmove",this._onTouchMove,this).on(document,"touchend",this._onTouchEnd,this),n.DomEvent.preventDefault(e)},_onTouchMove:function(e){if(!e.touches||e.touches.length!==2)return;var t=this._map,r=t.mouseEventToLayerPoint(e.touches[0]),i=t.mouseEventToLayerPoint(e.touches[1]);this._scale=r.distanceTo(i)/this._startDist,this._delta=r.add(i).divideBy(2,!0).subtract(this._startCenter);if(this._scale===1)return;this._moved||(n.DomUtil.addClass(t._mapPane,"leaflet-zoom-anim leaflet-touching"),t.fire("movestart").fire("zoomstart")._prepareTileBg(),this._moved=!0),n.Util.cancelAnimFrame(this._animRequest),this._animRequest=n.Util.requestAnimFrame(this._updateOnMove,this,!0,this._map._container),n.DomEvent.preventDefault(e)},_updateOnMove:function(){var e=this._map,t=this._getScaleOrigin(),r=e.layerPointToLatLng(t);e.fire("zoomanim",{center:r,zoom:e.getScaleZoom(this._scale)}),e._tileBg.style[n.DomUtil.TRANSFORM]=n.DomUtil.getTranslateString(this._delta)+" "+n.DomUtil.getScaleString(this._scale,this._startCenter)},_onTouchEnd:function(e){if(!this._moved||!this._zooming)return;var t=this._map;this._zooming=!1,n.DomUtil.removeClass(t._mapPane,"leaflet-touching"),n.DomEvent.off(document,"touchmove",this._onTouchMove).off(document,"touchend",this._onTouchEnd);var r=this._getScaleOrigin(),i=t.layerPointToLatLng(r),s=t.getZoom(),o=t.getScaleZoom(this._scale)-s,u=o>0?Math.ceil(o):Math.floor(o),a=t._limitZoom(s+u);t.fire("zoomanim",{center:i,zoom:a}),t._runAnimation(i,a,t.getZoomScale(a)/this._scale,r,!0)},_getScaleOrigin:function(){var e=this._centerOffset.subtract(this._delta).divideBy(this._scale);return this._startCenter.add(e)}}),n.Map.addInitHook("addHandler","touchZoom",n.Map.TouchZoom),n.Map.mergeOptions({boxZoom:!0}),n.Map.BoxZoom=n.Handler.extend({initialize:function(e){this._map=e,this._container=e._container,this._pane=e._panes.overlayPane},addHooks:function(){n.DomEvent.on(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){n.DomEvent.off(this._container,"mousedown",this._onMouseDown)},_onMouseDown:function(e){if(!e.shiftKey||e.which!==1&&e.button!==1)return!1;n.DomUtil.disableTextSelection(),this._startLayerPoint=this._map.mouseEventToLayerPoint(e),this._box=n.DomUtil.create("div","leaflet-zoom-box",this._pane),n.DomUtil.setPosition(this._box,this._startLayerPoint),this._container.style.cursor="crosshair",n.DomEvent.on(document,"mousemove",this._onMouseMove,this).on(document,"mouseup",this._onMouseUp,this).preventDefault(e),this._map.fire("boxzoomstart")},_onMouseMove:function(e){var t=this._startLayerPoint,r=this._box,i=this._map.mouseEventToLayerPoint(e),s=i.subtract(t),o=new n.Point(Math.min(i.x,t.x),Math.min(i.y,t.y));n.DomUtil.setPosition(r,o),r.style.width=Math.abs(s.x)-4+"px",r.style.height=Math.abs(s.y)-4+"px"},_onMouseUp:function(e){this._pane.removeChild(this._box),this._container.style.cursor="",n.DomUtil.enableTextSelection(),n.DomEvent.off(document,"mousemove",this._onMouseMove).off(document,"mouseup",this._onMouseUp);var t=this._map,r=t.mouseEventToLayerPoint(e),i=new n.LatLngBounds(t.layerPointToLatLng(this._startLayerPoint),t.layerPointToLatLng(r));t.fitBounds(i),t.fire("boxzoomend",{boxZoomBounds:i})}}),n.Map.addInitHook("addHandler","boxZoom",n.Map.BoxZoom),n.Map.mergeOptions({keyboard:!0,keyboardPanOffset:80,keyboardZoomOffset:1}),n.Map.Keyboard=n.Handler.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61],zoomOut:[189,109]},initialize:function(e){this._map=e,this._setPanOffset(e.options.keyboardPanOffset),this._setZoomOffset(e.options.keyboardZoomOffset)},addHooks:function(){var e=this._map._container;e.tabIndex===-1&&(e.tabIndex="0"),n.DomEvent.addListener(e,"focus",this._onFocus,this).addListener(e,"blur",this._onBlur,this).addListener(e,"mousedown",this._onMouseDown,this),this._map.on("focus",this._addHooks,this).on("blur",this._removeHooks,this)},removeHooks:function(){this._removeHooks();var e=this._map._container;n.DomEvent.removeListener(e,"focus",this._onFocus,this).removeListener(e,"blur",this._onBlur,this).removeListener(e,"mousedown",this._onMouseDown,this),this._map.off("focus",this._addHooks,this).off("blur",this._removeHooks,this)},_onMouseDown:function(){this._focused||this._map._container.focus()},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanOffset:function(e){var t=this._panKeys={},n=this.keyCodes,r,i;for(r=0,i=n.left.length;r<i;r++)t[n.left[r]]=[-1*e,0];for(r=0,i=n.right.length;r<i;r++)t[n.right[r]]=[e,0];for(r=0,i=n.down.length;r<i;r++)t[n.down[r]]=[0,e];for(r=0,i=n.up.length;r<i;r++)t[n.up[r]]=[0,-1*e]},_setZoomOffset:function(e){var t=this._zoomKeys={},n=this.keyCodes,r,i;for(r=0,i=n.zoomIn.length;r<i;r++)t[n.zoomIn[r]]=e;for(r=0,i=n.zoomOut.length;r<i;r++)t[n.zoomOut[r]]=-e},_addHooks:function(){n.DomEvent.addListener(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){n.DomEvent.removeListener(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(e){var t=e.keyCode;if(this._panKeys.hasOwnProperty(t))this._map.panBy(this._panKeys[t]);else{if(!this._zoomKeys.hasOwnProperty(t))return;this._map.setZoom(this._map.getZoom()+this._zoomKeys[t])}n.DomEvent.stop(e)}}),n.Map.addInitHook("addHandler","keyboard",n.Map.Keyboard),n.Handler.MarkerDrag=n.Handler.extend({initialize:function(e){this._marker=e},addHooks:function(){var e=this._marker._icon;this._draggable||(this._draggable=(new n.Draggable(e,e)).on("dragstart",this._onDragStart,this).on("drag",this._onDrag,this).on("dragend",this._onDragEnd,this)),this._draggable.enable()},removeHooks:function(){this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},_onDragStart:function(e){this._marker.closePopup().fire("movestart").fire("dragstart")},_onDrag:function(e){var t=n.DomUtil.getPosition(this._marker._icon);this._marker._shadow&&n.DomUtil.setPosition(this._marker._shadow,t),this._marker._latlng=this._marker._map.layerPointToLatLng(t),this._marker.fire("move").fire("drag")},_onDragEnd:function(){this._marker.fire("moveend").fire("dragend")}}),n.Handler.PolyEdit=n.Handler.extend({options:{icon:new n.DivIcon({iconSize:new n.Point(8,8),className:"leaflet-div-icon leaflet-editing-icon"})},initialize:function(e,t){this._poly=e,n.Util.setOptions(this,t)},addHooks:function(){this._poly._map&&(this._markerGroup||this._initMarkers(),this._poly._map.addLayer(this._markerGroup))},removeHooks:function(){this._poly._map&&(this._poly._map.removeLayer(this._markerGroup),delete this._markerGroup,delete this._markers)},updateMarkers:function(){this._markerGroup.clearLayers(),this._initMarkers()},_initMarkers:function(){this._markerGroup||(this._markerGroup=new n.LayerGroup),this._markers=[];var e=this._poly._latlngs,t,r,i,s;for(t=0,i=e.length;t<i;t++)s=this._createMarker(e[t],t),s.on("click",this._onMarkerClick,this),this._markers.push(s);var o,u;for(t=0,r=i-1;t<i;r=t++){if(t===0&&!(n.Polygon&&this._poly instanceof n.Polygon))continue;o=this._markers[r],u=this._markers[t],this._createMiddleMarker(o,u),this._updatePrevNext(o,u)}},_createMarker:function(e,t){var r=new n.Marker(e,{draggable:!0,icon:this.options.icon});return r._origLatLng=e,r._index=t,r.on("drag",this._onMarkerDrag,this),r.on("dragend",this._fireEdit,this),this._markerGroup.addLayer(r),r},_fireEdit:function(){this._poly.fire("edit")},_onMarkerDrag:function(e){var t=e.target;n.Util.extend(t._origLatLng,t._latlng),t._middleLeft&&t._middleLeft.setLatLng(this._getMiddleLatLng(t._prev,t)),t._middleRight&&t._middleRight.setLatLng(this._getMiddleLatLng(t,t._next)),this._poly.redraw()},_onMarkerClick:function(e){if(this._poly._latlngs.length<3)return;var t=e.target,n=t._index;t._prev&&t._next&&(this._createMiddleMarker(t._prev,t._next),this._updatePrevNext(t._prev,t._next)),this._markerGroup.removeLayer(t),t._middleLeft&&this._markerGroup.removeLayer(t._middleLeft),t._middleRight&&this._markerGroup.removeLayer(t._middleRight),this._markers.splice(n,1),this._poly.spliceLatLngs(n,1),this._updateIndexes(n,-1),this._poly.fire("edit")},_updateIndexes:function(e,t){this._markerGroup.eachLayer(function(n){n._index>e&&(n._index+=t)})},_createMiddleMarker:function(e,t){var n=this._getMiddleLatLng(e,t),r=this._createMarker(n),i,s,o;r.setOpacity(.6),e._middleRight=t._middleLeft=r,s=function(){var s=t._index;r._index=s,r.off("click",i).on("click",this._onMarkerClick,this),n.lat=r.getLatLng().lat,n.lng=r.getLatLng().lng,this._poly.spliceLatLngs(s,0,n),this._markers.splice(s,0,r),r.setOpacity(1),this._updateIndexes(s,1),t._index++,this._updatePrevNext(e,r),this._updatePrevNext(r,t)},o=function(){r.off("dragstart",s,this),r.off("dragend",o,this),this._createMiddleMarker(e,r),this._createMiddleMarker(r,t)},i=function(){s.call(this),o.call(this),this._poly.fire("edit")},r.on("click",i,this).on("dragstart",s,this).on("dragend",o,this),this._markerGroup.addLayer(r)},_updatePrevNext:function(e,t){e._next=t,t._prev=e},_getMiddleLatLng:function(e,t){var n=this._poly._map,r=n.latLngToLayerPoint(e.getLatLng()),i=n.latLngToLayerPoint(t.getLatLng());return n.layerPointToLatLng(r._add(i).divideBy(2))}}),n.Control=n.Class.extend({options:{position:"topright"},initialize:function(e){n.Util.setOptions(this,e)},getPosition:function(){return this.options.position},setPosition:function(e){var t=this._map;return t&&t.removeControl(this),this.options.position=e,t&&t.addControl(this),this},addTo:function(e){this._map=e;var t=this._container=this.onAdd(e),r=this.getPosition(),i=e._controlCorners[r];return n.DomUtil.addClass(t,"leaflet-control"),r.indexOf("bottom")!==-1?i.insertBefore(t,i.firstChild):i.appendChild(t),this},removeFrom:function(e){var t=this.getPosition(),n=e._controlCorners[t];return n.removeChild(this._container),this._map=null,this.onRemove&&this.onRemove(e),this}}),n.control=function(e){return new n.Control(e)},n.Map.include({addControl:function(e){return e.addTo(this),this},removeControl:function(e){return e.removeFrom(this),this},_initControlPos:function(){function i(i,s){var o=t+i+" "+t+s;e[i+s]=n.DomUtil.create("div",o,r)}var e=this._controlCorners={},t="leaflet-",r=this._controlContainer=n.DomUtil.create("div",t+"control-container",this._container);i("top","left"),i("top","right"),i("bottom","left"),i("bottom","right")}}),n.Control.Zoom=n.Control.extend({options:{position:"topleft"},onAdd:function(e){var t="leaflet-control-zoom",r=n.DomUtil.create("div",t);return this._createButton("Zoom in",t+"-in",r,e.zoomIn,e),this._createButton("Zoom out",t+"-out",r,e.zoomOut,e),r},_createButton:function(e,t,r,i,s){var o=n.DomUtil.create("a",t,r);return o.href="#",o.title=e,n.DomEvent.on(o,"click",n.DomEvent.stopPropagation).on(o,"click",n.DomEvent.preventDefault).on(o,"click",i,s).on(o,"dblclick",n.DomEvent.stopPropagation),o}}),n.Map.mergeOptions({zoomControl:!0}),n.Map.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new n.Control.Zoom,this.addControl(this.zoomControl))}),n.control.zoom=function(e){return new n.Control.Zoom(e)},n.Control.Attribution=n.Control.extend({options:{position:"bottomright",prefix:'Powered by <a href="http://leaflet.cloudmade.com">Leaflet</a>'},initialize:function(e){n.Util.setOptions(this,e),this._attributions={}},onAdd:function(e){return this._container=n.DomUtil.create("div","leaflet-control-attribution"),n.DomEvent.disableClickPropagation(this._container),e.on("layeradd",this._onLayerAdd,this).on("layerremove",this._onLayerRemove,this),this._update(),this._container},onRemove:function(e){e.off("layeradd",this._onLayerAdd).off("layerremove",this._onLayerRemove)},setPrefix:function(e){return this.options.prefix=e,this._update(),this},addAttribution:function(e){if(!e)return;return this._attributions[e]||(this._attributions[e]=0),this._attributions[e]++,this._update(),this},removeAttribution:function(e){if(!e)return;return this._attributions[e]--,this._update(),this},_update:function(){if(!this._map)return;var e=[];for(var t in this._attributions)this._attributions.hasOwnProperty(t)&&this._attributions[t]&&e.push(t);var n=[];this.options.prefix&&n.push(this.options.prefix),e.length&&n.push(e.join(", ")),this._container.innerHTML=n.join(" &#8212; ")},_onLayerAdd:function(e){e.layer.getAttribution&&this.addAttribution(e.layer.getAttribution())},_onLayerRemove:function(e){e.layer.getAttribution&&this.removeAttribution(e.layer.getAttribution())}}),n.Map.mergeOptions({attributionControl:!0}),n.Map.addInitHook(function(){this.options.attributionControl&&(this.attributionControl=(new n.Control.Attribution).addTo(this))}),n.control.attribution=function(e){return new n.Control.Attribution(e)},n.Control.Scale=n.Control.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0,updateWhenIdle:!1},onAdd:function(e){this._map=e;var t="leaflet-control-scale",r=n.DomUtil.create("div",t),i=this.options;return this._addScales(i,t,r),e.on(i.updateWhenIdle?"moveend":"move",this._update,this),this._update(),r},onRemove:function(e){e.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(e,t,r){e.metric&&(this._mScale=n.DomUtil.create("div",t+"-line",r)),e.imperial&&(this._iScale=n.DomUtil.create("div",t+"-line",r))},_update:function(){var e=this._map.getBounds(),t=e.getCenter().lat,n=6378137*Math.PI*Math.cos(t*Math.PI/180),r=n*(e.getNorthEast().lng-e.getSouthWest().lng)/180,i=this._map.getSize(),s=this.options,o=0;i.x>0&&(o=r*(s.maxWidth/i.x)),this._updateScales(s,o)},_updateScales:function(e,t){e.metric&&t&&this._updateMetric(t),e.imperial&&t&&this._updateImperial(t)},_updateMetric:function(e){var t=this._getRoundNum(e);this._mScale.style.width=this._getScaleWidth(t/e)+"px",this._mScale.innerHTML=t<1e3?t+" m":t/1e3+" km"},_updateImperial:function(e){var t=e*3.2808399,n=this._iScale,r,i,s;t>5280?(r=t/5280,i=this._getRoundNum(r),n.style.width=this._getScaleWidth(i/r)+"px",n.innerHTML=i+" mi"):(s=this._getRoundNum(t),n.style.width=this._getScaleWidth(s/t)+"px",n.innerHTML=s+" ft")},_getScaleWidth:function(e){return Math.round(this.options.maxWidth*e)-10},_getRoundNum:function(e){var t=Math.pow(10,(Math.floor(e)+"").length-1),n=e/t;return n=n>=10?10:n>=5?5:n>=3?3:n>=2?2:1,t*n}}),n.control.scale=function(e){return new n.Control.Scale(e)},n.Control.Layers=n.Control.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0},initialize:function(e,t,r){n.Util.setOptions(this,r),this._layers={},this._lastZIndex=0;for(var i in e)e.hasOwnProperty(i)&&this._addLayer(e[i],i);for(i in t)t.hasOwnProperty(i)&&this._addLayer(t[i],i,!0)},onAdd:function(e){return this._initLayout(),this._update(),this._container},addBaseLayer:function(e,t){return this._addLayer(e,t),this._update(),this},addOverlay:function(e,t){return this._addLayer(e,t,!0),this._update(),this},removeLayer:function(e){var t=n.Util.stamp(e);return delete this._layers[t],this._update(),this},_initLayout:function(){var e="leaflet-control-layers",t=this._container=n.DomUtil.create("div",e);n.Browser.touch?n.DomEvent.on(t,"click",n.DomEvent.stopPropagation):n.DomEvent.disableClickPropagation(t);var r=this._form=n.DomUtil.create("form",e+"-list");if(this.options.collapsed){n.DomEvent.on(t,"mouseover",this._expand,this).on(t,"mouseout",this._collapse,this);var i=this._layersLink=n.DomUtil.create("a",e+"-toggle",t);i.href="#",i.title="Layers",n.Browser.touch?n.DomEvent.on(i,"click",n.DomEvent.stopPropagation).on(i,"click",n.DomEvent.preventDefault).on(i,"click",this._expand,this):n.DomEvent.on(i,"focus",this._expand,this),this._map.on("movestart",this._collapse,this)}else this._expand();this._baseLayersList=n.DomUtil.create("div",e+"-base",r),this._separator=n.DomUtil.create("div",e+"-separator",r),this._overlaysList=n.DomUtil.create("div",e+"-overlays",r),t.appendChild(r)},_addLayer:function(e,t,r){var i=n.Util.stamp(e);this._layers[i]={layer:e,name:t,overlay:r},this.options.autoZIndex&&e.setZIndex&&(this._lastZIndex++,e.setZIndex(this._lastZIndex))},_update:function(){if(!this._container)return;this._baseLayersList.innerHTML="",this._overlaysList.innerHTML="";var e=!1,t=!1;for(var n in this._layers)if(this._layers.hasOwnProperty(n)){var r=this._layers[n];this._addItem(r),t=t||r.overlay,e=e||!r.overlay}this._separator.style.display=t&&e?"":"none"},_createRadioElement:function(e,t){var n='<input type="radio" name="'+e+'"';t&&(n+=' checked="checked"'),n+="/>";var r=document.createElement("div");return r.innerHTML=n,r.firstChild},_addItem:function(e){var t=document.createElement("label"),r,i=this._map.hasLayer(e.layer);e.overlay?(r=document.createElement("input"),r.type="checkbox",r.defaultChecked=i):r=this._createRadioElement("leaflet-base-layers",i),r.layerId=n.Util.stamp(e.layer),n.DomEvent.on(r,"click",this._onInputClick,this);var s=document.createTextNode(" "+e.name);t.appendChild(r),t.appendChild(s);var o=e.overlay?this._overlaysList:this._baseLayersList;o.appendChild(t)},_onInputClick:function(){var e,t,n,r=this._form.getElementsByTagName("input"),i=r.length;for(e=0;e<i;e++)t=r[e],n=this._layers[t.layerId],t.checked?this._map.addLayer(n.layer,!n.overlay):this._map.removeLayer(n.layer)},_expand:function(){n.DomUtil.addClass(this._container,"leaflet-control-layers-expanded")},_collapse:function(){this._container.className=this._container.className.replace(" leaflet-control-layers-expanded","")}}),n.control.layers=function(e,t,r){return new n.Control.Layers(e,t,r)},n.Transition=n.Class.extend({includes:n.Mixin.Events,statics:{CUSTOM_PROPS_SETTERS:{position:n.DomUtil.setPosition},implemented:function(){return n.Transition.NATIVE||n.Transition.TIMER}},options:{easing:"ease",duration:.5},_setProperty:function(e,t){var r=n.Transition.CUSTOM_PROPS_SETTERS;e in r?r[e](this._el,t):this._el.style[e]=t}}),n.Transition=n.Transition.extend({statics:function(){var e=n.DomUtil.TRANSITION,t=e==="webkitTransition"||e==="OTransition"?e+"End":"transitionend";return{NATIVE:!!e,TRANSITION:e,PROPERTY:e+"Property",DURATION:e+"Duration",EASING:e+"TimingFunction",END:t,CUSTOM_PROPS_PROPERTIES:{position:n.Browser.any3d?n.DomUtil.TRANSFORM:"top, left"}}}(),options:{fakeStepInterval:100},initialize:function(e,t){this._el=e,n.Util.setOptions(this,t),n.DomEvent.on(e,n.Transition.END,this._onTransitionEnd,this),this._onFakeStep=n.Util.bind(this._onFakeStep,this)},run:function(e){var t,r=[],i=n.Transition.CUSTOM_PROPS_PROPERTIES;for(t in e)e.hasOwnProperty(t)&&(t=i[t]?i[t]:t,t=this._dasherize(t),r.push(t));this._el.style[n.Transition.DURATION]=this.options.duration+"s",this._el.style[n.Transition.EASING]=this.options.easing,this._el.style[n.Transition.PROPERTY]="all";for(t in e)e.hasOwnProperty(t)&&this._setProperty(t,e[t]);n.Util.falseFn(this._el.offsetWidth),this._inProgress=!0,n.Browser.mobileWebkit&&(this.backupEventFire=setTimeout(n.Util.bind(this._onBackupFireEnd,this),this.options.duration*1.2*1e3)),n.Transition.NATIVE?(clearInterval(this._timer),this._timer=setInterval(this._onFakeStep,this.options.fakeStepInterval)):this._onTransitionEnd()},_dasherize:function(){function t(e){return"-"+e.toLowerCase()}var e=/([A-Z])/g;return function(n){return n.replace(e,t)}}(),_onFakeStep:function(){this.fire("step")},_onTransitionEnd:function(e){this._inProgress&&(this._inProgress=!1,clearInterval(this._timer),this._el.style[n.Transition.TRANSITION]="",clearTimeout(this.backupEventFire),delete this.backupEventFire,this.fire("step"),e&&e.type&&this.fire("end"))},_onBackupFireEnd:function(){var e=document.createEvent("Event");e.initEvent(n.Transition.END,!0,!1),this._el.dispatchEvent(e)}}),n.Transition=n.Transition.NATIVE?n.Transition:n.Transition.extend({statics:{getTime:Date.now||function(){return+(new Date)},TIMER:!0,EASINGS:{linear:function(e){return e},"ease-out":function(e){return e*(2-e)}},CUSTOM_PROPS_GETTERS:{position:n.DomUtil.getPosition},UNIT_RE:/^[\d\.]+(\D*)$/},options:{fps:50},initialize:function(e,t){this._el=e,n.Util.extend(this.options,t),this._easing=n.Transition.EASINGS[this.options.easing]||n.Transition.EASINGS["ease-out"],this._step=n.Util.bind(this._step,this),this._interval=Math.round(1e3/this.options.fps)},run:function(e){this._props={};var t=n.Transition.CUSTOM_PROPS_GETTERS,r=n.Transition.UNIT_RE;this.fire("start");for(var i in e)if(e.hasOwnProperty(i)){var s={};if(i in t)s.from=t[i](this._el);else{var o=this._el.style[i].match(r);s.from=parseFloat(o[0]),s.unit=o[1]}s.to=e[i],this._props[i]=s}clearInterval(this._timer),this._timer=setInterval(this._step,this._interval),this._startTime=n.Transition.getTime()},_step:function(){var e=n.Transition.getTime(),t=e-this._startTime,r=this.options.duration*1e3;t<r?this._runFrame(this._easing(t/r)):(this._runFrame(1),this._complete())},_runFrame:function(e){var t=n.Transition.CUSTOM_PROPS_SETTERS,r,i,s;for(r in this._props)this._props.hasOwnProperty(r)&&(i=this._props[r],r in t?(s=i.to.subtract(i.from).multiplyBy(e).add(i.from),t[r](this._el,s)):this._el.style[r]=(i.to-i.from)*e+i.from+i.unit);this.fire("step")},_complete:function(){clearInterval(this._timer),this.fire("end")}}),n.Map.include(!n.Transition||!n.Transition.implemented()?{}:{setView:function(e,t,n){t=this._limitZoom(t);var r=this._zoom!==t;if(this._loaded&&!n&&this._layers){var i=r?this._zoomToIfClose&&this._zoomToIfClose(e,t):this._panByIfClose(e);if(i)return clearTimeout(this._sizeTimer),this}return this._resetView(e,t),this},panBy:function(e,t){return e=n.point(e),!e.x&&!e.y?this:(this._panTransition||(this._panTransition=new n.Transition(this._mapPane),this._panTransition.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),n.Util.setOptions(this._panTransition,n.Util.extend({duration:.25},t)),this.fire("movestart"),n.DomUtil.addClass(this._mapPane,"leaflet-pan-anim"),this._panTransition.run({position:n.DomUtil.getPosition(this._mapPane).subtract(e)}),this)},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){n.DomUtil.removeClass(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_panByIfClose:function(e){var t=this._getCenterOffset(e)._floor();return this._offsetIsWithinView(t)?(this.panBy(t),!0):!1},_offsetIsWithinView:function(e,t){var n=t||1,r=this.getSize();return Math.abs(e.x)<=r.x*n&&Math.abs(e.y)<=r.y*n}}),n.Map.mergeOptions({zoomAnimation:n.DomUtil.TRANSITION&&!n.Browser.android23&&!n.Browser.mobileOpera}),n.DomUtil.TRANSITION&&n.Map.addInitHook(function(){n.DomEvent.on(this._mapPane,n.Transition.END,this._catchTransitionEnd,this)}),n.Map.include(n.DomUtil.TRANSITION?{_zoomToIfClose:function(e,t){if(this._animatingZoom)return!0;if(!this.options.zoomAnimation)return!1;var r=this.getZoomScale(t),i=this._getCenterOffset(e).divideBy(1-1/r);if(!this._offsetIsWithinView(i,1))return!1;n.DomUtil.addClass(this._mapPane,"leaflet-zoom-anim"),this.fire("movestart").fire("zoomstart"),this.fire("zoomanim",{center:e,zoom:t});var s=this._getCenterLayerPoint().add(i);return this._prepareTileBg(),this._runAnimation(e,t,r,s),!0},_catchTransitionEnd:function(e){this._animatingZoom&&this._onZoomTransitionEnd()},_runAnimation:function(e,t,r,i,s){this._animateToCenter=e,this._animateToZoom=t,this._animatingZoom=!0;var o=n.DomUtil.TRANSFORM,u=this._tileBg;clearTimeout(this._clearTileBgTimer),n.Util.falseFn(u.offsetWidth);var a=n.DomUtil.getScaleString(r,i),f=u.style[o];u.style[o]=s?f+" "+a:a+" "+f},_prepareTileBg:function(){var e=this._tilePane,t=this._tileBg;if(t&&this._getLoadedTilesPercentage(t)>.5&&this._getLoadedTilesPercentage(e)<.5){e.style.visibility="hidden",e.empty=!0,this._stopLoadingImages(e);return}t||(t=this._tileBg=this._createPane("leaflet-tile-pane",this._mapPane),t.style.zIndex=1),t.style[n.DomUtil.TRANSFORM]="",t.style.visibility="hidden",t.empty=!0,e.empty=!1,this._tilePane=this._panes.tilePane=t;var r=this._tileBg=e;n.DomUtil.addClass(r,"leaflet-zoom-animated"),this._stopLoadingImages(r)},_getLoadedTilesPercentage:function(e){var t=e.getElementsByTagName("img"),n,r,i=0;for(n=0,r=t.length;n<r;n++)t[n].complete&&i++;return i/r},_stopLoadingImages:function(e){var t=Array.prototype.slice.call(e.getElementsByTagName("img")),r,i,s;for(r=0,i=t.length;r<i;r++)s=t[r],s.complete||(s.onload=n.Util.falseFn,s.onerror=n.Util.falseFn,s.src=n.Util.emptyImageUrl,s.parentNode.removeChild(s))},_onZoomTransitionEnd:function(){this._restoreTileFront(),n.Util.falseFn(this._tileBg.offsetWidth),this._resetView(this._animateToCenter,this._animateToZoom,!0,!0),n.DomUtil.removeClass(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1},_restoreTileFront:function(){this._tilePane.innerHTML="",this._tilePane.style.visibility="",this._tilePane.style.zIndex=2,this._tileBg.style.zIndex=1},_clearTileBg:function(){!this._animatingZoom&&!this.touchZoom._zooming&&(this._tileBg.innerHTML="")}}:{}),n.Map.include({_defaultLocateOptions:{watch:!1,setView:!1,maxZoom:Infinity,timeout:1e4,maximumAge:0,enableHighAccuracy:!1},locate:function(e){e=this._locationOptions=n.Util.extend(this._defaultLocateOptions,e);if(!navigator.geolocation)return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var t=n.Util.bind(this._handleGeolocationResponse,this),r=n.Util.bind(this._handleGeolocationError,this);return e.watch?this._locationWatchId=navigator.geolocation.watchPosition(t,r,e):navigator.geolocation.getCurrentPosition(t,r,e),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch(this._locationWatchId),this},_handleGeolocationError:function(e){var t=e.code,n=e.message||(t===1?"permission denied":t===2?"position unavailable":"timeout");this._locationOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:t,message:"Geolocation error: "+n+"."})},_handleGeolocationResponse:function(e){var t=180*e.coords.accuracy/4e7,r=t*2,i=e.coords.latitude,s=e.coords.longitude,o=new n.LatLng(i,s),u=new n.LatLng(i-t,s-r),a=new n.LatLng(i+t,s+r),f=new n.LatLngBounds(u,a),l=this._locationOptions;if(l.setView){var c=Math.min(this.getBoundsZoom(f),l.maxZoom);this.setView(o,c)}this.fire("locationfound",{latlng:o,bounds:f,accuracy:e.coords.accuracy})}})})(this);

var cache = {};

$.RoccarasoSki_Model.Stazione  = Class.extend({
	init: function( container ){
		this.name = "piste";
		this.impianti = [];    
		this.stato;
		this.nome;
		this.neveMin;
		this.neveMax;
		this.aggiornatoAl;
		this.telefono;
		this.scroller = null;
		this.container = container;
		this.selectedStazione = null;
		this.previousSelectedButton = null;
		this.waitingElement;
		this.errorElement;
		this.selector = $("#stazione-selector");
		
		this.listContainer = $("#stazione-list-wrapper");
		this.list = $("#stazione-list", this.listContainer);
		this.stazioneStatus = $("#stazione-status", this.listContainer);
		this.stazioneDati = $("#stazione-dati", this.listContainer);
		
		this.list.css({ width:"100%" });
				
		if ( Application.isiOSDevice() ){
			this.listContainer.css({ top: this.selector.actual("height")+this.container.offset().top, bottom: "56px" } );
			this.selector.css({top: this.container.offset().top});
			this.container.append( this.selector );
			this.container.append( this.listContainer );
		}else{
			this.listContainer.css({ bottom: this.selector.actual("height"), top: this.container.offset().top } );
			this.container.append( this.listContainer );
			this.selector.css({bottom:"0px"});
			this.container.append( this.selector );
		}
	
		this.selector.bind( "click", this.click.bind(this) );
		
		if( this.selectedStazione == null ){
			this.click( null, "aremogna" );
		}
	},
	click: function(e, idStazione ){
		var id, target;
		if ( e != null ){
			target = $(e.target);
			id = target.attr("id") ;
		}else{
			target = $("#"+idStazione);
			id = idStazione;
		}
		if ( id != this.selectedStazione ){
			this.selectedStazione = id;
			
			if (this.previousSelectedButton != null )
				this.previousSelectedButton.removeClass("selected");
			
			this.previousSelectedButton = target;
			target.addClass("selected");
			
			this.clearStazione();
			this.waitingElement = Application.waitingElement();
			this.container.append( this.waitingElement );
			this.fetchAndShow( this.selectedStazione );
		}
	},
	removeFromParent: function(){
		this.selector.unbind("click");
		var templates = $("#templates"); 
		templates.append( this.selector );
		this.clearStazione();
		templates.append(this.listContainer);
		if ( this.previousSelectedButton != null )
			this.previousSelectedButton.removeClass("selected");

		if ( this.waitingElement != null )
			this.waitingElement.remove();	
		
		if ( this.errorElement != null )
			this.errorElement.remove();
		
		if ( this.scroller != null )
			this.scroller.destroy();
		
		this.previousSelectedButton = null;
		this.selectedStazione = null;
	},
	clearStazione: function(){
		if ( this.scroller != null )
			this.scroller.destroy();
		
		if ( this.waitingElement != null )
			this.waitingElement.remove();

		if ( this.errorElement != null )
			this.errorElement.remove();
		
		
		this.stazioneStatus.hide();
		this.list.hide();
		this.stazioneDati.hide();
		$.removeAllChildrens(this.stazioneStatus);
		$.removeAllChildrens(this.list);
	},
	draw: function(){
		this.stazioneStatus.show();
		this.list.show();
		this.stazioneDati.show();
		
		for(var i=0; i < this.impianti.length; i++){  
			var impianto = this.impianti[i];
			this.list.append("<li data-role='list-divider' class='stato"+impianto.stato+"' role='heading'><span class='ui-li-count' id='"+impianto.stato+"'>"+impianto.stato+"</span><span class='nomeImpianto'>"+impianto.nome+" </span></li>");
			for( var x = 0; x < impianto.piste.length ; x++){
				var pista = impianto.piste[x];
				this.list.append('<li data-theme="c" class="'+pista.difficolta+'">'+pista.nome+' <span class="ui-li-count" id="'+pista.stato+'">&#160;&#160;</span></li>');
			}
		}
		this.list.listview('refresh');

		var color = "red";
		if ( this.stato.toLowerCase() == "aperta"){
			this.stazioneStatus.addClass("opened");
		}
		
		var data = this.aggiornatoAl.split( " " );
		var day = data[0].split("-");
		
		var dataAggiornamentoStringa =day[2] + '/' + day[1]+ '/' + day[0] + ' ' + data[1];
		//this.stazioneStatus.append( "Altezza neve: MIN " + this.neveMin+", MAX "+this.neveMax + "<br>Aggiornato al "+ dataAggiornamentoStringa);
		this.stazioneStatus.append( "Aggiornato al "+ dataAggiornamentoStringa);
		this.list.listview('refresh');
		this.scroller = new iScroll("stazione-list-wrapper", {bounce: false});
		this.waitingElement.remove();
		$("#stazione-dati").show();
	},	
	fetchAndShow:function( idStazione ){
		var that = this;
		
		$.ajax({
			  url: "http://www.roccaraso.net/bollettino/"+idStazione+".php",
			  //url: "aremogna.html",
			  type: 'GET',
			  async: true,
			  error:function(e){
				  that.waitingElement.remove();
				  that.errorElement = Application.opsElement();
				  that.container.append( that.errorElement );
			  },
			  success: function(data1) {
				   	if ( idStazione == that.selectedStazione ){
						var i=0;
						var nomeTmp = [];
						var cont;
						var arrayPiste = [];
						var piste =[];	
						var nomeImpianto;
						
						$("td.impianto", data1).each(
							function(){
								if($(this).text().match(/^\w+/)){
									
									nomeImpianto = $(this).text();
									
									if(nomeImpianto.indexOf(')')!=-1)
										nomeImpianto=nomeImpianto.replace(nomeImpianto.substring(nomeImpianto.indexOf('('),nomeImpianto.indexOf(')')+1),"");
									else if(nomeImpianto.indexOf('(')!=-1)
										nomeImpianto=nomeImpianto.substring(0,nomeImpianto.indexOf('('));
									
								    nomeTmp[i] = trim(nomeImpianto);
								    
									var parents = $(this).parents("table") ;
									var parent = parents[1];
									
									var trs = $("tr",parent);
									
									var tbody = $(trs[4]).parent();
									piste = [];
									$("td.pista",tbody).each(function(){
										
										if($(this).text()!='\xA0'){
											var pista = new $.RoccarasoSki_Model.Pista();
								
											pista.nome = $(this).text();																
											var difficolta = pista.nome.split('\xA0')[0].toLowerCase();
											
											if(
													( !difficolta.match(/^\w+/) ) || (
																						( difficolta.match(/^\w+/) ) && 
																						(difficolta!="azzurra" && difficolta!="rossa" && difficolta!="nera" && difficolta!="verde") 
																					  )
											  ){
													pista.difficolta = "ND";
											}
											else
												pista.difficolta = trim(difficolta);
											
											
											var tmp = pista.nome.split('\xA0');
											if(tmp[1]== null|| tmp[1] == ""){
												pista.nome = trim(tmp[0]);
											}else
												pista.nome = trim(tmp[1]);
											
											if ( pista.nome.toLowerCase() == "direttissima" || pista.nome.toLowerCase().indexOf("lupo") != -1  ){
												pista.difficolta = "nera";
											}
											
											if(!$(this).next().next().text().match(/^\w+/)){
												if(tmp[0].toLowerCase() == "chiusa")
													pista.stato="Chiusa";
												else if(tmp[0].toLowerCase() == "aperta")
													pista.stato("Aperta");
												else 
													pista.stato="ND";
											}
											else
												pista.stato = trim($(this).next().next().text());
										
											var str=pista.nome.substring(0,pista.nome.indexOf('('));
											if(str!="")
											pista.nome = str;
											piste.push(pista);
										}
									});
									arrayPiste[i] = piste;	
									i++;
								} 
							}
						);
						
						var statoTmp = [];
						$("td.rosso,td.verde", $(data1)).each(function(){
							if($(this).text().match(/^\w+/)){
								statoTmp.push(trim($(this).text()));
							}
						});
	
						var aggiornatoAlImpTmp = [];
						$("td.bianco", $(data1)).each(function(){
							if($(this).text().match(/^\w+/)){
								aggiornatoAlImpTmp.push( trim($(this).text()) );
							}
						});
	
						var datiStazione = [];
						$("td.arancio", $(data1)).each(function(){
							if($(this).text().match(/^\w+/)){
								console.log("-"+trim($(this).text()));
								datiStazione.push(trim($(this).text()));
							}
							else
								datiStazione.push("nd");
							
						});
	
						for(var j=0;j<nomeTmp.length;j++){
							that.impianti[j] = new $.RoccarasoSki_Model.Impianto();
							that.impianti[j].nome = nomeTmp[j];
							that.impianti[j].stato = statoTmp[j+1];
							that.impianti[j].aggiornatoAl = aggiornatoAlImpTmp[j];
							that.impianti[j].piste = arrayPiste[j];
						}
						
						
						//that.neveMin = datiStazione[0];
						//that.neveMax = datiStazione[1];
						that.aggiornatoAl = datiStazione[2];
						that.telefono = datiStazione[3];
						
						that.stato=statoTmp[0];
						
						that.draw();
				   	}
				}
			});
	}
});





$.RoccarasoSki_Model.Previsione = Class.extend({
	init: function(){
		this.velVento;
		this.umidita;
		this.srcImg;
		this.temperatura;
		this.condizione;
		
		this.data;
		this.min;
		this.max		
	}
});

$.RoccarasoSki_Model.Meteo  = Class.extend({
	init: function( container ){	
		this.name = "meteo";		
		this.forecast = [];
		
		this.container = container;
		this.waitingElement;
		this.errorElement;
		this.fetchAndShow();
		this.listContainer = $("#meteo-list-wrapper");
		this.list = $("#meteo-list");
	},
	removeFromParent: function(){
		if ( this.waitingElement != null ) this.waitingElement.remove();
		if ( this.errorElement != null ) this.errorElement.remove();
		$("#templates").append( this.listContainer );
		$.removeAllChildrens( this.list );
	},
	showOnPage: function(){
		if ( this.waitingElement != null ) this.waitingElement.remove();
		if ( this.errorElement != null ) this.errorElement.remove();
		this.container.append( this.listContainer );
		
		this.list.append('<li data-role="list-divider" role="heading" class="statoAperto">Oggi</li>');
		var currentMeteo = this.forecast[0];
		console.log( this );
		this.list.append('<li data-theme="c" class="immagineMeteo"><img src="'+currentMeteo.srcImg+'"/>Temperatura: '+currentMeteo.temperatura+'° <br><br>Vento: '+currentMeteo.velVento+' km\h<br><br>Umidità: '+currentMeteo.umidita+'% <span class="condizione">'+currentMeteo.condizione+'</span><br/><br><span class="tempMin">'+currentMeteo.min+'°</span><span class="tempMax">'+currentMeteo.max+'°</span><br>min max</li>');			

		currentMeteo = this.forecast[1];
		this.list.append('<li data-role="list-divider" role="heading" class="statoAperto">'+currentMeteo.data+'</li>');
		this.list.append('<li data-theme="c" class="immagineMeteo" data-inline="true" data-mini="true"><img  src="'+currentMeteo.srcImg+'"/> <br><span class="tempMin">'+currentMeteo.min+'°</span><span class="tempMax">'+currentMeteo.max+'°</span><br>min max<span class="condizione">'+currentMeteo.condizione+'</span></li>');
		
		this.list.listview('refresh');
	},
	fetchAndShow:function(){		
		var roccarasoWOEID="12681087";
		console.log( this );
		this.waitingElement = Application.waitingElement();
		this.container.append( this.waitingElement );
		var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid=%27"+roccarasoWOEID+"%27%20and%20u=%27c%27&format=json";
		var that = this;
		$.ajax({
			   url: url,
			   dataType: "json",
			   async: true,
			   error:function(data) {
				   that.waitingElement.remove();
				   that.errorElement = Application.opsElement();
				   that.container.append( that.errorElement );
			   },
			   success: function(data) {
				   var tmp;
				   var prevision = new $.RoccarasoSki_Model.Previsione();
				   prevision.velVento = data.query.results.channel.wind.speed;
				   prevision.umidita = data.query.results.channel.atmosphere.humidity;
				   prevision.temperatura = data.query.results.channel.item.condition.temp;
				   prevision.min = data.query.results.channel.item.forecast[0].low;
				   prevision.max = data.query.results.channel.item.forecast[0].high;
 				   tmp = traduzioniMeteo[data.query.results.channel.item.condition.code];
				   prevision.condizione = tmp == undefined ? data.query.results.channel.item.forecast[i].text : tmp;
				   prevision.srcImg = "http://l.yimg.com/a/i/us/we/52/"+data.query.results.channel.item.condition.code+".gif";
				   that.forecast.push( prevision );
				   
				   prevision = new $.RoccarasoSki_Model.Previsione();
					prevision.srcImg = "http://l.yimg.com/a/i/us/we/52/"+data.query.results.channel.item.forecast[1].code+".gif" ;
					prevision.data = data.query.results.channel.item.forecast[1].date;
				   prevision.min = data.query.results.channel.item.forecast[1].low;
				   prevision.max = data.query.results.channel.item.forecast[1].high;
				   tmp = traduzioniMeteo[data.query.results.channel.item.forecast[1].code];
				   prevision.condizione = tmp == undefined ? data.query.results.channel.item.forecast[1].text : tmp;
				   that.forecast.push( prevision );					
				   
				   var prevision;
				   	for(var i=0;i<2;i++){
				   		prevision = new $.RoccarasoSki_Model.Previsione();			   		
				   		prevision.srcImg = "http://l.yimg.com/a/i/us/we/52/"+data.query.results.channel.item.forecast[i].code+".gif" ;
				   		prevision.data = data.query.results.channel.item.forecast[i].date;
				   		prevision.min = data.query.results.channel.item.forecast[i].low;
				   		prevision.max = data.query.results.channel.item.forecast[i].high;
				   		var tmp = traduzioniMeteo[data.query.results.channel.item.forecast[i].code];
				   		prevision.condizione = tmp == undefined ? data.query.results.channel.item.forecast[i].text : tmp;
				   		that.forecast.push( prevision );
				   	}
				   that.showOnPage();
			      }
			 });
	}
});

var lastClick = new Date().getTime();

function canClick(e){
	var now = new Date().getTime();
	if ( now  - lastClick >= 100 ){
		lastClick = now;
		return true;
	}
	if ( e != null ){
		L.DomEvent.stopPropagation(e)
	}
	return false;
}

function closeOverlay(e){
	if ( canClick(e) ){
		Application.currentMap.closeOverlay();
	}
}


var LocateControl = L.Control.extend({
	setRMap: function( rmap ){
		this.rmap = rmap;
	},
    options: {
        position: 'bottomleft'
    },
    showPosition: function( pos ){
    	this.rmap.map.panTo(pos);
    	if ( this.rmap.currentPosition == null ){
    		var icon = L.icon({
    		    iconUrl: "sonoqui.png",
    		    iconSize: [25, 25],
    		    iconAnchor: [12.5, 12.5],
    		    popupAnchor: [0, 0]
    		});		
    		this.rmap.currentPosition = new L.Marker( pos , {"icon": icon} ).addTo(this.rmap.map);
    	}else{
    		this.rmap.currentPosition.setLatLng( pos );
    	}    	
    },
    stopLocalization: function(){
		navigator.geolocation.clearWatch(this.localizationId);
		this.localizationId = null;
		this.icon.removeClass( "map-locate-active-icon" );
		this.icon.addClass("map-locate-icon");	
		this.localizationActive = false;
    },
    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'map-locate leaflet-control-zoom');
        var icon = L.DomUtil.create('a', 'map-locate-icon');
        container.appendChild( icon );
        this.icon = $(icon);
        var that = this;
        this.localizationCounter = 0;
        this.lowFrequencyUpdate = false;
        this.localizationId = null;
        this.localizationActive = false;
        $(container).live("click", function( ){
        	if ( canClick() ){
	        	if ( !that.localizationActive ){
	        		that.localizationActive = true;
		    		that.icon.removeClass( "map-locate-icon" );
		    		that.icon.addClass( "map-locate-active-icon" );
		    		that.rmap.showOverlay( "Localizzazione in corso ..." );
		        	if ( that.localizationId == null ){
		        		console.log( "Starting localization");
		        		navigator.geolocation.getCurrentPosition(function(){}, function(){}, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }); 
		        		that.localizationId = navigator.geolocation.watchPosition(
		        				that.onSuccess.bind(that),
		        				that.onError.bind(that),
		        			    { frequency: 2000, enableHighAccuracy: true  }
		        		);
		        	}
	        	}else{
	        		console.log( "Request localization stop");
	        		that.stopLocalization();
	        		that.rmap.closeOverlay();
	        	}
        	}
        		
        });
        return container;
    },
    onError: function(){
    	this.stopLocalization();
    	this.rmap.showOverlay( "Si è verificato un errore" );
    },
    onSuccess: function(position) {
    	var MACCURACY = 40;
    	
    	var accuracy = position.coords.accuracy;
    	this.localizationCounter++;
    	if ( accuracy <= MACCURACY  ){
    		this.localizationCounter = 0;
			if ( this.rmap.roccarasoBounds.contains( [position.coords.latitude, position.coords.longitude ] ) ){
				this.rmap.closeOverlay();
				this.showPosition( [position.coords.latitude, position.coords.longitude ] );
				if ( !this.lowFrequencyUpdate ){
					navigator.geolocation.clearWatch(this.localizationId);
					setTimeout( function() { 					
						this.lowFrequencyUpdate = true;
						this.stopLocalization();
						this.localizationId = navigator.geolocation.watchPosition(
	        				this.onSuccess.bind(this),
	        				this.onError.bind(this),
	        			    { frequency: 1000*120, enableHighAccuracy: true  }
						);
						console.log( "Start low frequency position update");
					}.bind(this), 1000 * 60 );
				}
			}else{
				console.log("Out of zone");
				this.stopLocalization();
				this.rmap.showOverlay( "La tua posizione è all'esterno della mappa degli impianti" );
			}
    	}else{
    		console.log( "Low accuracy");
    		this.rmap.showOverlay( "Localizzazione in corso ..." );
    		this.localizationCounter++;
    		if(this.localizationCounter > 20 ){ 
	    		this.rmap.showOverlay( "Impossibile ottenere la tua posizione. Attiva il GPS" )
	    		this.stopLocalization();
    		}
		}
    }
    
});


$.RoccarasoSki_Model.Mappa  = Class.extend({
	init: function(container){
		this.name = "mappa";
		this.map;
		var overLayer;
		var currentPosition ;
		var pisteLayer;
						
		var width = $(window).width();
		var height = $(window).height();
		
		this.parentContainer = $(container);
		
		this.mapDiv = $("#myrmap", $("#templates"));
		if ( this.mapDiv.length == 0 ){
			this.mapDiv = $('<div id="myrmap"></div>');
			this.showOnPage();
			this.mapDiv.css({ "width": "100%", "height": "100%" });
			
			var roccaraso = [41.85288, 13.99242];
			this.roccarasoBounds = new L.LatLngBounds(
						[41.85393, 13.98919], 
						[41.8099999999,14.039562]
						); 
			
			this.map = L.map( this.mapDiv.attr("id"), { zoomControl:false, inertia:false } ).setView(roccaraso, 8);
			this.map.setMaxBounds(this.roccarasoBounds);
			var that = this;
			
			this.map.attributionControl.setPrefix("");
			this.map.attributionControl.addAttribution("");
		
			var zoomControl = new L.Control.Zoom( {position:"bottomleft"});
			this.map.addControl( zoomControl );
			var locateControl =  new LocateControl();
			locateControl.setRMap( this );
			this.map.addControl(locateControl);
			this.map.invalidateSize(true);
			
			new L.TileLayer('map/{z}/{x}/{y}.png', {
				maxZoom: 16,
				tms: true,
				attribution: ''
			}).addTo(this.map);		
			
			
			imageBounds = [[41.85393, 13.98919], [ 41.81037,14.039562]];
			
			var tmp = [];
			
			var markerCount = 0;
			
			$.ajax({
				url: "mapdata.kml",
				type: 'GET',
				async: true,
				error:function(){
					showAlert( "<b>Connessione assente o limitata</b>");
				},
				success: function(rd) {
						var styles = {};
						$("Style", rd ).each(
								function(){
									var tmp = $("color", this);
									var text = tmp.text();
									var id = $(this).attr("id") ;
									var href = $("href", this);
									styles[ id ] =  { color: text.substring(2, text.length ), iconImage: href.text() };
								});
						
						$("Placemark", rd ).each(
							function(){
								var point = $("Point", this );
								var coords = $("coordinates", this);
								var name = $("name", this).text();
								var style = $("styleUrl", this).text();
								coords = coords.text().split("\n");
								var latlngs = [];
								for( var i = 0; i< coords.length; i++ ){
									var c = trim(coords[i]);
									if ( c != "" ){
										c = trim(c);
										c = c.split(",");
										latlngs.push([ parseFloat( c[1] ), parseFloat( c[0] ) ] );
									}
								}
								if ( point.length == 0 ){
									style = styles[style.replace("#", "")].color;
									var dash = "";
									if ( style == "33CCFF" ){
										dash = "15, 10, 5, 10, 15" ;
										style = "006400";	
									}
									var tmp = L.polyline(latlngs, {noClip: true, clickable: true, weight: 3, opacity: .9 , dashArray: dash, color: "#"+style }).addTo(that.map);
									tmp = L.polyline(latlngs, {noClip: true, clickable: true, weight: 35, opacity: 0 , dashArray: dash, color: "#"+style }).addTo(that.map);
									tmp.addEventListener( "click", that.showMapInfo, {"name": name } ) ;
								}else{
									style = styles[ style.replace("#", "") ];
									var iconName = style.iconImage.split("/");
									iconName = iconName[ iconName.length-1 ];
									
									if ( iconName == "wheel_chair_accessible.png" ){
										icon = "seggiovia.png";
									}else if (iconName == "tram.png"){
										icon = "cabinovia.png";
									}else if (iconName == "ski.png"  ){
										icon = "sciovia.png";
									}else if ( iconName == "trail.png"){
										icon = "manovia.png";
									}
									var icon = L.icon({
									    iconUrl: "img/"+icon,
									    iconSize: [25, 25],
									    iconAnchor: [12.5, 12.5],
									    popupAnchor: [0, 0]
									});
	
									var marker = L.marker(latlngs[0], {"icon": icon}).addTo(that.map).addEventListener(  "click", that.showMapInfo, { "name": name } ) ;																	
								}
							}
							
						);					
				}
				
			});
			
			this.mapOverlay = $("<div id='mapOverlay' style='display:none'></div>");
			this.mapDiv.append(this.mapOverlay);		
			this.mapOverlay.css({ "width": width+"px", height: 50+"px",  "opacity": .95, "text-transform":"uppercase" });
			var mo = this.mapOverlay;
		}else{
			this.showOnPage();
		}
	},
	showOnPage: function(){
		this.mapDiv.show();
		this.parentContainer.append( this.mapDiv );
		if ( this.map != null ) this.map.invalidateSize();
	},
	removeFromParent: function(){
		this.mapDiv.hide();
		$("#templates").append( this.mapDiv );		
	},
	showMapInfo: function(e){
		if (canClick(e)){
			if ( this.name != null && this.name != ""  )
				Application.currentMap.showOverlay(this.name);		
		}	
	},
	showOverlay: function(message){	
		var overlay = $("#mapOverlay");
		$.removeAllChildrens( overlay );
		overlay.append( '<div><div style="width: '+(overlay.width() - 60)+'px; float:left; padding-top:7px;  padding-left: 20px;"> <span style="font-size:13px;"><b>'+message+'</b></span></p></div> <div style="float:right; width: 40px; padding-right: 0px; padding-top:14px;"><a href="#" onclick="closeOverlay()"><img border="0" src="img/close.png" width="20px" height="20px"></img></a></div></div>' );
		overlay.show();
	},
	closeOverlay: function(){
		$("#mapOverlay").hide();		
		return false;
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

var app = {
    initialize: function() {
        this.bindEvents();
        
		$(document).smartpreload({ 
			images: ["./css/images/locateme.png",
			         "./css/images/locateme-active.png",
			         "./css/images/waiting-background.png",
			         "./css/images/zoom-in.png",
			         "./css/images/zoom-out.png",
			         "./img/background_texture_gray.png",
			         "./img/bargreenbackground_selected.png",
			         "./img/bargreenbackground.png",
			         "./img/barredbackground.png",
			         "./img/roccarasoski.png",
			         "./img/topbar.png",
			         "./img/cabinovia.png",
			         "./img/impianti.png",
			         "./img/mappa.png",
			         "./img/meteo.png",
			         "./img/seggiovia.png",
			         "./img/sciovia.png",
			         "./img/share.png",
			         "./img/webcam.png",
			         "./img/manovia.png",
			         "./images/ops.png",
			         ], 
			onloadall: function() {
				setTimeout( function(){ location.replace('./main.html'); }, 2000 );
			}.bind(this)
		});		
        
        
        /*setTimeout( function(){ 
        	
        }, 1500 );*/
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('load', this.load, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //
    },
    load:function(id){
    	console.log('Load: ' + id);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};


$.RoccarasoSki_Model.Impianto  = Class.extend({
	init: function(){
		this.nome;
		this.tipo;
		this.stato;
		this.aggiornatoAl;
		this.piste = new Array(); 		
	}
});


(function(){var g=void 0,h=!0,j=null,l=!1,aa=encodeURIComponent,ba=Infinity,ca=setTimeout,n=Math,da=decodeURIComponent;function ea(a,b){return a.name=b}
var p="push",fa="test",ia="slice",q="replace",ja="load",ka="floor",la="charAt",ma="value",r="indexOf",na="match",oa="port",pa="createElement",qa="path",s="name",v="host",w="toString",x="length",y="prototype",ra="clientWidth",z="split",sa="stopPropagation",ta="scope",A="location",ua="search",B="protocol",va="clientHeight",wa="href",C="substring",xa="apply",ya="navigator",D="join",E="toLowerCase",F;function za(a,b){switch(b){case 0:return""+a;case 1:return 1*a;case 2:return!!a;case 3:return 1E3*a}return a}function Aa(a){return"function"==typeof a}function Ba(a){return a!=g&&-1<(a.constructor+"")[r]("String")}function G(a,b){return g==a||"-"==a&&!b||""==a}function Ca(a){if(!a||""==a)return"";for(;a&&-1<" \n\r\t"[r](a[la](0));)a=a[C](1);for(;a&&-1<" \n\r\t"[r](a[la](a[x]-1));)a=a[C](0,a[x]-1);return a}function Da(){return n.round(2147483647*n.random())}function Ea(){}
function H(a,b){if(aa instanceof Function)return b?encodeURI(a):aa(a);I(68);return escape(a)}function J(a){a=a[z]("+")[D](" ");if(da instanceof Function)try{return da(a)}catch(b){I(17)}else I(68);return unescape(a)}var Fa=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},Ga=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,!!d):a.detachEvent&&a.detachEvent("on"+b,c)};
function Ha(a,b){if(a){var c=K[pa]("script");c.type="text/javascript";c.async=h;c.src=a;c.id=b;var d=K.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d);return c}}function L(a){return a&&0<a[x]?a[0]:""}function Ia(a){var b=a?a[x]:0;return 0<b?a[b-1]:""}var Ja=function(){this.prefix="ga.";this.R={}};Ja[y].set=function(a,b){this.R[this.prefix+a]=b};Ja[y].get=function(a){return this.R[this.prefix+a]};Ja[y].contains=function(a){return this.get(a)!==g};function Ka(a){0==a[r]("www.")&&(a=a[C](4));return a[E]()}function La(a,b){var c,d={url:a,protocol:"http",host:"",path:"",d:new Ja,anchor:""};if(!a)return d;c=a[r]("://");0<=c&&(d.protocol=a[C](0,c),a=a[C](c+3));c=a[ua]("/|\\?|#");if(0<=c)d.host=a[C](0,c)[E](),a=a[C](c);else return d.host=a[E](),d;c=a[r]("#");0<=c&&(d.anchor=a[C](c+1),a=a[C](0,c));c=a[r]("?");0<=c&&(Ma(d.d,a[C](c+1)),a=a[C](0,c));d.anchor&&b&&Ma(d.d,d.anchor);a&&"/"==a[la](0)&&(a=a[C](1));d.path=a;return d}
function Oa(a,b){function c(a){var b=(a.hostname||"")[z](":")[0][E](),c=(a[B]||"")[E](),c=1*a[oa]||("http:"==c?80:"https:"==c?443:"");a=a.pathname||"";0==a[r]("/")||(a="/"+a);return[b,""+c,a]}var d=b||K[pa]("a");d.href=K[A][wa];var e=(d[B]||"")[E](),f=c(d),k=d[ua]||"",m=e+"//"+f[0]+(f[1]?":"+f[1]:"");0==a[r]("//")?a=e+a:0==a[r]("/")?a=m+a:!a||0==a[r]("?")?a=m+f[2]+(a||k):0>a[z]("/")[0][r](":")&&(a=m+f[2][C](0,f[2].lastIndexOf("/"))+"/"+a);d.href=a;e=c(d);return{protocol:(d[B]||"")[E](),host:e[0],
port:e[1],path:e[2],Oa:d[ua]||"",url:a||""}}function Ma(a,b){function c(b,c){a.contains(b)||a.set(b,[]);a.get(b)[p](c)}for(var d=Ca(b)[z]("&"),e=0;e<d[x];e++)if(d[e]){var f=d[e][r]("=");0>f?c(d[e],"1"):c(d[e][C](0,f),d[e][C](f+1))}}function Pa(a,b){if(G(a)||"["==a[la](0)&&"]"==a[la](a[x]-1))return"-";var c=K.domain;return a[r](c+(b&&"/"!=b?b:""))==(0==a[r]("http://")?7:0==a[r]("https://")?8:0)?"0":a};var Qa=0;function Ra(a,b,c){!(1<=Qa)&&!(1<=100*n.random())&&(a=["utmt=error","utmerr="+a,"utmwv=5.3.8","utmn="+Da(),"utmsp=1"],b&&a[p]("api="+b),c&&a[p]("msg="+H(c[C](0,100))),M.w&&a[p]("aip=1"),Sa(a[D]("&")),Qa++)};var Ta=0,Ua={};function N(a){return Va("x"+Ta++,a)}function Va(a,b){Ua[a]=!!b;return a}
var Wa=N(),Xa=Va("anonymizeIp"),Ya=N(),$a=N(),ab=N(),bb=N(),O=N(),P=N(),cb=N(),db=N(),eb=N(),fb=N(),gb=N(),hb=N(),ib=N(),jb=N(),kb=N(),lb=N(),nb=N(),ob=N(),pb=N(),qb=N(),rb=N(),sb=N(),tb=N(),ub=N(),vb=N(),wb=N(),xb=N(),yb=N(),zb=N(),Ab=N(),Bb=N(),Cb=N(),Db=N(),Eb=N(),Fb=N(h),Gb=Va("currencyCode"),Hb=Va("page"),Ib=Va("title"),Jb=N(),Kb=N(),Lb=N(),Mb=N(),Nb=N(),Ob=N(),Pb=N(),Qb=N(),Rb=N(),Q=N(h),Sb=N(h),Tb=N(h),Ub=N(h),Vb=N(h),Wb=N(h),Zb=N(h),$b=N(h),ac=N(h),bc=N(h),cc=N(h),R=N(h),dc=N(h),ec=N(h),fc=
N(h),gc=N(h),hc=N(h),ic=N(h),jc=N(h),S=N(h),kc=N(h),lc=N(h),mc=N(h),nc=N(h),oc=N(h),pc=N(h),qc=N(h),rc=Va("campaignParams"),sc=N(),tc=Va("hitCallback"),uc=N();N();var vc=N(),wc=N(),xc=N(),yc=N(),zc=N(),Ac=N(),Bc=N(),Cc=N(),Dc=N(),Ec=N(),Fc=N(),Gc=N(),Hc=N(),Ic=N();N();var Mc=N(),Nc=N(),Oc=N();function Pc(a){var b=this.plugins_;if(b)return b.get(a)}var T=function(a,b,c,d){a[b]=function(){try{return d!=g&&I(d),c[xa](this,arguments)}catch(a){throw Ra("exc",b,a&&a[s]),a;}}},Qc=function(a,b,c,d){U[y][a]=function(){try{return I(c),za(this.a.get(b),d)}catch(e){throw Ra("exc",a,e&&e[s]),e;}}},V=function(a,b,c,d,e){U[y][a]=function(f){try{I(c),e==g?this.a.set(b,za(f,d)):this.a.set(b,e)}catch(k){throw Ra("exc",a,k&&k[s]),k;}}};var Rc=RegExp(/(^|\.)doubleclick\.net$/i),Sc=function(a,b){return Rc[fa](K[A].hostname)?h:"/"!==b?l:(0==a[r]("www.google.")||0==a[r](".google.")||0==a[r]("google."))&&!(-1<a[r]("google.org"))?h:l},Tc=function(a){var b=a.get(bb),c=a.c(P,"/");Sc(b,c)&&a[sa]()};var Zc=function(){var a={},b={},c=new Uc;this.g=function(a,b){c.add(a,b)};var d=new Uc;this.e=function(a,b){d.add(a,b)};var e=l,f=l,k=h;this.T=function(){e=h};this.j=function(a){this[ja]();this.set(sc,a,h);a=new Vc(this);e=l;d.execute(this);e=h;b={};this.n();a.Ja()};this.load=function(){e&&(e=l,this.Ka(),Wc(this),f||(f=h,c.execute(this),Xc(this),Wc(this)),e=h)};this.n=function(){if(e)if(f)e=l,Xc(this),e=h;else this[ja]()};this.get=function(c){Ua[c]&&this[ja]();return b[c]!==g?b[c]:a[c]};this.set=
function(c,d,e){Ua[c]&&this[ja]();e?b[c]=d:a[c]=d;Ua[c]&&this.n()};this.z=function(b){a[b]=this.b(b,0)+1};this.b=function(a,b){var c=this.get(a);return c==g||""===c?b:1*c};this.c=function(a,b){var c=this.get(a);return c==g?b:c+""};this.Ka=function(){if(k){var b=this.c(bb,""),c=this.c(P,"/");Sc(b,c)||(a[O]=a[hb]&&""!=b?Yc(b):1,k=l)}}};Zc[y].stopPropagation=function(){throw"aborted";};
var Vc=function(a){var b=this;this.q=0;var c=a.get(tc);this.Ua=function(){0<b.q&&c&&(b.q--,b.q||c())};this.Ja=function(){!b.q&&c&&ca(c,10)};a.set(uc,b,h)};function $c(a,b){b=b||[];for(var c=0;c<b[x];c++){var d=b[c];if(""+a==d||0==d[r](a+"."))return d}return"-"}
var bd=function(a,b,c){c=c?"":a.c(O,"1");b=b[z](".");if(6!==b[x]||ad(b[0],c))return l;c=1*b[1];var d=1*b[2],e=1*b[3],f=1*b[4];b=1*b[5];if(!(0<=c&&0<d&&0<e&&0<f&&0<=b))return l;a.set(Q,c);a.set(Vb,d);a.set(Wb,e);a.set(Zb,f);a.set($b,b);return h},cd=function(a){var b=a.get(Q),c=a.get(Vb),d=a.get(Wb),e=a.get(Zb),f=a.b($b,1);return[a.b(O,1),b!=g?b:"-",c||"-",d||"-",e||"-",f][D](".")},dd=function(a){return[a.b(O,1),a.b(cc,0),a.b(R,1),a.b(dc,0)][D](".")},ed=function(a,b,c){c=c?"":a.c(O,"1");var d=b[z](".");
if(4!==d[x]||ad(d[0],c))d=j;a.set(cc,d?1*d[1]:0);a.set(R,d?1*d[2]:10);a.set(dc,d?1*d[3]:a.get(ab));return d!=j||!ad(b,c)},fd=function(a,b){var c=H(a.c(Tb,"")),d=[],e=a.get(Fb);if(!b&&e){for(var f=0;f<e[x];f++){var k=e[f];k&&1==k[ta]&&d[p](f+"="+H(k[s])+"="+H(k[ma])+"=1")}0<d[x]&&(c+="|"+d[D]("^"))}return c?a.b(O,1)+"."+c:j},gd=function(a,b,c){c=c?"":a.c(O,"1");b=b[z](".");if(2>b[x]||ad(b[0],c))return l;b=b[ia](1)[D](".")[z]("|");0<b[x]&&a.set(Tb,J(b[0]));if(1>=b[x])return h;b=b[1][z](-1==b[1][r](",")?
"^":",");for(c=0;c<b[x];c++){var d=b[c][z]("=");if(4==d[x]){var e={};ea(e,J(d[1]));e.value=J(d[2]);e.scope=1;a.get(Fb)[d[0]]=e}}return h},hd=function(a){var b;b=function(b,e){if(!G(a.get(b))){var f=a.c(b,""),f=f[z](" ")[D]("%20"),f=f[z]("+")[D]("%20");c[p](e+"="+f)}};var c=[];b(ic,"utmcid");b(nc,"utmcsr");b(S,"utmgclid");b(kc,"utmgclsrc");b(lc,"utmdclid");b(mc,"utmdsid");b(jc,"utmccn");b(oc,"utmcmd");b(pc,"utmctr");b(qc,"utmcct");return(b=c[D]("|"))?[a.b(O,1),a.b(ec,0),a.b(fc,1),a.b(gc,1),b][D]("."):
""},id=function(a,b,c){c=c?"":a.c(O,"1");b=b[z](".");if(5>b[x]||ad(b[0],c))return a.set(ec,g),a.set(fc,g),a.set(gc,g),a.set(ic,g),a.set(jc,g),a.set(nc,g),a.set(oc,g),a.set(pc,g),a.set(qc,g),a.set(S,g),a.set(kc,g),a.set(lc,g),a.set(mc,g),l;a.set(ec,1*b[1]);a.set(fc,1*b[2]);a.set(gc,1*b[3]);var d=b[ia](4)[D](".");b=function(a){return(a=d[na](a+"=(.*?)(?:\\|utm|$)"))&&2==a[x]?a[1]:g};c=function(b,c){c?(c=e?J(c):c[z]("%20")[D](" "),a.set(b,c)):a.set(b,g)};-1==d[r]("=")&&(d=J(d));var e="2"==b("utmcvr");
c(ic,b("utmcid"));c(jc,b("utmccn"));c(nc,b("utmcsr"));c(oc,b("utmcmd"));c(pc,b("utmctr"));c(qc,b("utmcct"));c(S,b("utmgclid"));c(kc,b("utmgclsrc"));c(lc,b("utmdclid"));c(mc,b("utmdsid"));return h},ad=function(a,b){return b?a!=b:!/^\d+$/[fa](a)};var Uc=function(){this.filters=[]};Uc[y].add=function(a,b){this.filters[p]({name:a,s:b})};Uc[y].execute=function(a){try{for(var b=0;b<this.filters[x];b++)this.filters[b].s.call(W,a)}catch(c){}};function jd(a){100!=a.get(vb)&&a.get(Q)%1E4>=100*a.get(vb)&&a[sa]()}function kd(a){ld(a.get(Wa))&&a[sa]()}function md(a){"_file:"==K[A][B]&&a[sa]()}function nd(a){a.get(Ib)||a.set(Ib,K.title,h);a.get(Hb)||a.set(Hb,K[A].pathname+K[A][ua],h)};var od=new function(){var a=[];this.set=function(b){a[b]=h};this.Xa=function(){for(var b=[],c=0;c<a[x];c++)a[c]&&(b[n[ka](c/6)]=b[n[ka](c/6)]^1<<c%6);for(c=0;c<b[x];c++)b[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[la](b[c]||0);return b[D]("")+"~"}};function I(a){od.set(a)};var W=window,K=document,ld=function(a){var b=W._gaUserPrefs;return b&&b.ioo&&b.ioo()||!!a&&W["ga-disable-"+a]===h},pd=function(a){var b=[],c=K.cookie[z](";");a=RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$");for(var d=0;d<c[x];d++){var e=c[d][na](a);e&&b[p](e[1])}return b},X=function(a,b,c,d,e,f){e=ld(e)?l:Sc(d,c)?l:h;if(e){if(b&&0<=W[ya].userAgent[r]("Firefox")){b=b[q](/\n|\r/g," ");e=0;for(var k=b[x];e<k;++e){var m=b.charCodeAt(e)&255;if(10==m||13==m)b=b[C](0,e)+"?"+b[C](e+1)}}b&&2E3<b[x]&&(b=b[C](0,2E3),I(69));
a=a+"="+b+"; path="+c+"; ";f&&(a+="expires="+(new Date((new Date).getTime()+f)).toGMTString()+"; ");d&&(a+="domain="+d+";");K.cookie=a}};var qd,rd,sd=function(){if(!qd){var a={},b=W[ya],c=W.screen;a.Q=c?c.width+"x"+c.height:"-";a.P=c?c.colorDepth+"-bit":"-";a.language=(b&&(b.language||b.browserLanguage)||"-")[E]();a.javaEnabled=b&&b.javaEnabled()?1:0;a.characterSet=K.characterSet||K.charset||"-";try{var d=K.documentElement,e=K.body,f=e&&e[ra]&&e[va],b=[];d&&(d[ra]&&d[va])&&("CSS1Compat"===K.compatMode||!f)?b=[d[ra],d[va]]:f&&(b=[e[ra],e[va]]);a.Wa=b[D]("x")}catch(k){I(135)}qd=a}},td=function(){sd();for(var a=qd,b=W[ya],a=b.appName+
b.version+a.language+b.platform+b.userAgent+a.javaEnabled+a.Q+a.P+(K.cookie?K.cookie:"")+(K.referrer?K.referrer:""),b=a[x],c=W.history[x];0<c;)a+=c--^b++;return Yc(a)},ud=function(a){sd();var b=qd;a.set(Lb,b.Q);a.set(Mb,b.P);a.set(Pb,b.language);a.set(Qb,b.characterSet);a.set(Nb,b.javaEnabled);a.set(Rb,b.Wa);if(a.get(ib)&&a.get(jb)){if(!(b=rd)){var c,d,e;d="ShockwaveFlash";if((b=(b=W[ya])?b.plugins:g)&&0<b[x])for(c=0;c<b[x]&&!e;c++)d=b[c],-1<d[s][r]("Shockwave Flash")&&(e=d.description[z]("Shockwave Flash ")[1]);
else{d=d+"."+d;try{c=new ActiveXObject(d+".7"),e=c.GetVariable("$version")}catch(f){}if(!e)try{c=new ActiveXObject(d+".6"),e="WIN 6,0,21,0",c.AllowScriptAccess="always",e=c.GetVariable("$version")}catch(k){}if(!e)try{c=new ActiveXObject(d),e=c.GetVariable("$version")}catch(m){}e&&(e=e[z](" ")[1][z](","),e=e[0]+"."+e[1]+" r"+e[2])}b=e?e:"-"}rd=b;a.set(Ob,rd)}else a.set(Ob,"-")};var vd=function(a){if(Aa(a))this.s=a;else{var b=a[0],c=b.lastIndexOf(":"),d=b.lastIndexOf(".");this.h=this.i=this.l="";-1==c&&-1==d?this.h=b:-1==c&&-1!=d?(this.i=b[C](0,d),this.h=b[C](d+1)):-1!=c&&-1==d?(this.l=b[C](0,c),this.h=b[C](c+1)):c>d?(this.i=b[C](0,d),this.l=b[C](d+1,c),this.h=b[C](c+1)):(this.i=b[C](0,d),this.h=b[C](d+1));this.k=a[ia](1);this.Ma=!this.l&&"_require"==this.h;this.J=!this.i&&!this.l&&"_provide"==this.h}},Y=function(){T(Y[y],"push",Y[y][p],5);T(Y[y],"_getPlugin",Pc,121);T(Y[y],
"_createAsyncTracker",Y[y].Sa,33);T(Y[y],"_getAsyncTracker",Y[y].Ta,34);this.I=new Ja;this.p=[]};F=Y[y];F.Na=function(a,b,c){var d=this.I.get(a);if(!Aa(d))return l;b.plugins_=b.plugins_||new Ja;b.plugins_.set(a,new d(b,c||{}));return h};F.push=function(a){var b=Z.Va[xa](this,arguments),b=Z.p.concat(b);for(Z.p=[];0<b[x]&&!Z.O(b[0])&&!(b.shift(),0<Z.p[x]););Z.p=Z.p.concat(b);return 0};F.Va=function(a){for(var b=[],c=0;c<arguments[x];c++)try{var d=new vd(arguments[c]);d.J?this.O(d):b[p](d)}catch(e){}return b};
F.O=function(a){try{if(a.s)a.s[xa](W);else if(a.J)this.I.set(a.k[0],a.k[1]);else{var b="_gat"==a.i?M:"_gaq"==a.i?Z:M.u(a.i);if(a.Ma){if(!this.Na(a.k[0],b,a.k[2])){if(!a.Pa){var c=Oa(""+a.k[1]);var d=c[B],e=K[A][B];var f;if(f="https:"==d||d==e?h:"http:"!=d?l:"http:"==e){var k;a:{var m=Oa(K[A][wa]);if(!(c.Oa||0<=c.url[r]("?")||0<=c[qa][r]("://")||c[v]==m[v]&&c[oa]==m[oa]))for(var t="http:"==c[B]?80:443,u=M.S,b=0;b<u[x];b++)if(c[v]==u[b][0]&&(c[oa]||t)==(u[b][1]||t)&&0==c[qa][r](u[b][2])){k=h;break a}k=
l}f=k&&!ld()}f&&(a.Pa=Ha(c.url))}return h}}else a.l&&(b=b.plugins_.get(a.l)),b[a.h][xa](b,a.k)}}catch(Za){}};F.Sa=function(a,b){return M.r(a,b||"")};F.Ta=function(a){return M.u(a)};var yd=function(){function a(a,b,c,d){g==f[a]&&(f[a]={});g==f[a][b]&&(f[a][b]=[]);f[a][b][c]=d}function b(a,b,c){if(g!=f[a]&&g!=f[a][b])return f[a][b][c]}function c(a,b){if(g!=f[a]&&g!=f[a][b]){f[a][b]=g;var c=h,d;for(d=0;d<k[x];d++)if(g!=f[a][k[d]]){c=l;break}c&&(f[a]=g)}}function d(a){var b="",c=l,d,e;for(d=0;d<k[x];d++)if(e=a[k[d]],g!=e){c&&(b+=k[d]);for(var c=[],f=g,ha=g,ha=0;ha<e[x];ha++)if(g!=e[ha]){f="";ha!=mb&&g==e[ha-1]&&(f+=ha[w]()+Za);for(var Cd=e[ha],Jc="",Yb=g,Kc=g,Lc=g,Yb=0;Yb<Cd[x];Yb++)Kc=
Cd[la](Yb),Lc=Na[Kc],Jc+=g!=Lc?Lc:Kc;f+=Jc;c[p](f)}b+=m+c[D](u)+t;c=l}else c=h;return b}var e=this,f=[],k=["k","v"],m="(",t=")",u="*",Za="!",Na={"'":"'0"};Na[t]="'1";Na[u]="'2";Na[Za]="'3";var mb=1;e.Ra=function(a){return g!=f[a]};e.A=function(){for(var a="",b=0;b<f[x];b++)g!=f[b]&&(a+=b[w]()+d(f[b]));return a};e.Qa=function(a){if(a==g)return e.A();for(var b=a.A(),c=0;c<f[x];c++)g!=f[c]&&!a.Ra(c)&&(b+=c[w]()+d(f[c]));return b};e.f=function(b,c,d){if(!wd(d))return l;a(b,"k",c,d);return h};e.o=function(b,
c,d){if(!xd(d))return l;a(b,"v",c,d[w]());return h};e.getKey=function(a,c){return b(a,"k",c)};e.N=function(a,c){return b(a,"v",c)};e.L=function(a){c(a,"k")};e.M=function(a){c(a,"v")};T(e,"_setKey",e.f,89);T(e,"_setValue",e.o,90);T(e,"_getKey",e.getKey,87);T(e,"_getValue",e.N,88);T(e,"_clearKey",e.L,85);T(e,"_clearValue",e.M,86)};function wd(a){return"string"==typeof a}function xd(a){return"number"!=typeof a&&(g==Number||!(a instanceof Number))||n.round(a)!=a||NaN==a||a==ba?l:h};var zd=function(a){var b=W.gaGlobal;a&&!b&&(W.gaGlobal=b={});return b},Ad=function(){var a=zd(h).hid;a==j&&(a=Da(),zd(h).hid=a);return a},Dd=function(a){a.set(Kb,Ad());var b=zd();if(b&&b.dh==a.get(O)){var c=b.sid;c&&("0"==c&&I(112),a.set(Zb,c),a.get(Sb)&&a.set(Wb,c));b=b.vid;a.get(Sb)&&b&&(b=b[z]("."),1*b[1]||I(112),a.set(Q,1*b[0]),a.set(Vb,1*b[1]))}};var Ed,Fd=function(a,b,c){var d=a.c(bb,""),e=a.c(P,"/"),f=a.b(cb,0);a=a.c(Wa,"");X(b,c,e,d,a,f)},Xc=function(a){var b=a.c(bb,"");a.b(O,1);var c=a.c(P,"/"),d=a.c(Wa,"");X("__utma",cd(a),c,b,d,a.get(cb));X("__utmb",dd(a),c,b,d,a.get(db));X("__utmc",""+a.b(O,1),c,b,d);var e=hd(a,h);e?X("__utmz",e,c,b,d,a.get(eb)):X("__utmz","",c,b,"",-1);(e=fd(a,l))?X("__utmv",e,c,b,d,a.get(cb)):X("__utmv","",c,b,"",-1)},Wc=function(a){var b=a.b(O,1);if(!bd(a,$c(b,pd("__utma"))))return a.set(Ub,h),l;var c=!ed(a,$c(b,
pd("__utmb")));a.set(bc,c);id(a,$c(b,pd("__utmz")));gd(a,$c(b,pd("__utmv")));Ed=!c;return h},Gd=function(a){!Ed&&!(0<pd("__utmb")[x])&&(X("__utmd","1",a.c(P,"/"),a.c(bb,""),a.c(Wa,""),1E4),0==pd("__utmd")[x]&&a[sa]())};var Jd=function(a){a.get(Q)==g?Hd(a):a.get(Ub)&&!a.get(Mc)?Hd(a):a.get(bc)&&Id(a)},Kd=function(a){a.get(hc)&&!a.get(ac)&&(Id(a),a.set(fc,a.get($b)))},Hd=function(a){var b=a.get(ab);a.set(Sb,h);a.set(Q,Da()^td(a)&2147483647);a.set(Tb,"");a.set(Vb,b);a.set(Wb,b);a.set(Zb,b);a.set($b,1);a.set(ac,h);a.set(cc,0);a.set(R,10);a.set(dc,b);a.set(Fb,[]);a.set(Ub,l);a.set(bc,l)},Id=function(a){a.set(Wb,a.get(Zb));a.set(Zb,a.get(ab));a.z($b);a.set(ac,h);a.set(cc,0);a.set(R,10);a.set(dc,a.get(ab));a.set(bc,l)};var Ld="daum:q eniro:search_word naver:query pchome:q images.google:q google:q yahoo:p yahoo:q msn:q bing:q aol:query aol:q lycos:q lycos:query ask:q netscape:query cnn:query about:terms mamma:q voila:rdata virgilio:qs live:q baidu:wd alice:qs yandex:text najdi:q seznam:q rakuten:qt biglobe:q goo.ne:MT wp:szukaj onet:qt yam:k kvasir:q ozu:q terra:query rambler:query conduit:q babylon:q search-results:q avg:q comcast:q incredimail:q startsiden:q go.mail.ru:q search.centrum.cz:q".split(" "),Sd=function(a){if(a.get(kb)&&
!a.get(Mc)){for(var b=!G(a.get(ic))||!G(a.get(nc))||!G(a.get(S))||!G(a.get(lc)),c={},d=0;d<Md[x];d++){var e=Md[d];c[e]=a.get(e)}(d=a.get(rc))?(I(149),e=new Ja,Ma(e,d),d=e):d=La(K[A][wa],a.get(gb)).d;if(!("1"==Ia(d.get(a.get(ub)))&&b)){var f=d,k=function(b,c){c=c||"-";var d=Ia(f.get(a.get(b)));return d&&"-"!=d?J(d):c},d=Ia(f.get(a.get(nb)))||"-",e=Ia(f.get(a.get(qb)))||"-",m=Ia(f.get(a.get(pb)))||"-",t=Ia(f.get("gclsrc"))||"-",u=Ia(f.get("dclid"))||"-",Za=k(ob,"(not set)"),Na=k(rb,"(not set)"),mb=
k(sb),k=k(tb);if(G(d)&&G(m)&&G(u)&&G(e))d=l;else{var Xb=!G(m)&&!G(t),Xb=G(e)&&(!G(u)||Xb),Bd=G(mb);if(Xb||Bd){var ga=Nd(a),ga=La(ga,h);if((ga=Od(a,ga))&&!G(ga[1]&&!ga[2]))Xb&&(e=ga[0]),Bd&&(mb=ga[1])}Pd(a,d,e,m,t,u,Za,Na,mb,k);d=h}d=d||Qd(a);!d&&(!b&&a.get(ac))&&(Pd(a,g,"(direct)",g,g,g,"(direct)","(none)",g,g),d=h);if(d&&(a.set(hc,Rd(a,c)),b="(direct)"==a.get(nc)&&"(direct)"==a.get(jc)&&"(none)"==a.get(oc),a.get(hc)||a.get(ac)&&!b))a.set(ec,a.get(ab)),a.set(fc,a.get($b)),a.z(gc)}}},Qd=function(a){var b=
Nd(a),c=La(b,h);if(!(b!=g&&b!=j&&""!=b&&"0"!=b&&"-"!=b&&0<=b[r]("://"))||c&&-1<c[v][r]("google")&&c.d.contains("q")&&"cse"==c[qa])return l;if((b=Od(a,c))&&!b[2])return Pd(a,g,b[0],g,g,g,"(organic)","organic",b[1],g),h;if(b||!a.get(ac))return l;a:{for(var b=a.get(Bb),d=Ka(c[v]),e=0;e<b[x];++e)if(-1<d[r](b[e])){a=l;break a}Pd(a,g,d,g,g,g,"(referral)","referral",g,"/"+c[qa]);a=h}return a},Od=function(a,b){for(var c=a.get(zb),d=0;d<c[x];++d){var e=c[d][z](":");if(-1<b[v][r](e[0][E]())){var f=b.d.get(e[1]);
if(f&&(f=L(f),!f&&-1<b[v][r]("google.")&&(f="(not provided)"),!e[3]||-1<b.url[r](e[3]))){a:{for(var c=f,d=a.get(Ab),c=J(c)[E](),k=0;k<d[x];++k)if(c==d[k]){c=h;break a}c=l}return[e[2]||e[0],f,c]}}}return j},Pd=function(a,b,c,d,e,f,k,m,t,u){a.set(ic,b);a.set(nc,c);a.set(S,d);a.set(kc,e);a.set(lc,f);a.set(jc,k);a.set(oc,m);a.set(pc,t);a.set(qc,u)},Md=[jc,ic,S,lc,nc,oc,pc,qc],Rd=function(a,b){function c(a){a=(""+a)[z]("+")[D]("%20");return a=a[z](" ")[D]("%20")}function d(c){var d=""+(a.get(c)||"");c=
""+(b[c]||"");return 0<d[x]&&d==c}if(d(S)||d(lc))return I(131),l;for(var e=0;e<Md[x];e++){var f=Md[e],k=b[f]||"-",f=a.get(f)||"-";if(c(k)!=c(f))return h}return l},Td=RegExp(/^https:\/\/(www\.)?google(\.com?)?(\.[a-z]{2}t?)?\/?$/i),Nd=function(a){a=Pa(a.get(Jb),a.get(P));try{if(Td[fa](a))return I(136),a+"?q="}catch(b){I(145)}return a};var Ud,Vd,Wd=function(a){Ud=a.c(S,"");Vd=a.c(kc,"")},Xd=function(a){var b=a.c(S,""),c=a.c(kc,"");b!=Ud&&(-1<c[r]("ds")?a.set(mc,g):!G(Ud)&&-1<Vd[r]("ds")&&a.set(mc,Ud))};var Zd=function(a){Yd(a,K[A][wa])?(a.set(Mc,h),I(12)):a.set(Mc,l)},Yd=function(a,b){if(!a.get(fb))return l;var c=La(b,a.get(gb)),d=L(c.d.get("__utma")),e=L(c.d.get("__utmb")),f=L(c.d.get("__utmc")),k=L(c.d.get("__utmx")),m=L(c.d.get("__utmz")),t=L(c.d.get("__utmv")),c=L(c.d.get("__utmk"));if(Yc(""+d+e+f+k+m+t)!=c){d=J(d);e=J(e);f=J(f);k=J(k);f=$d(d+e+f+k,m,t,c);if(!f)return l;m=f[0];t=f[1]}if(!bd(a,d,h))return l;ed(a,e,h);id(a,m,h);gd(a,t,h);ae(a,k,h);return h},ce=function(a,b,c){var d;d=cd(a)||"-";
var e=dd(a)||"-",f=""+a.b(O,1)||"-",k=be(a)||"-",m=hd(a,l)||"-";a=fd(a,l)||"-";var t=Yc(""+d+e+f+k+m+a),u=[];u[p]("__utma="+d);u[p]("__utmb="+e);u[p]("__utmc="+f);u[p]("__utmx="+k);u[p]("__utmz="+m);u[p]("__utmv="+a);u[p]("__utmk="+t);d=u[D]("&");if(!d)return b;e=b[r]("#");if(c)return 0>e?b+"#"+d:b+"&"+d;c="";f=b[r]("?");0<e&&(c=b[C](e),b=b[C](0,e));return 0>f?b+"?"+d+c:b+"&"+d+c},$d=function(a,b,c,d){for(var e=0;3>e;e++){for(var f=0;3>f;f++){if(d==Yc(a+b+c))return I(127),[b,c];var k=b[q](/ /g,"%20"),
m=c[q](/ /g,"%20");if(d==Yc(a+k+m))return I(128),[k,m];k=k[q](/\+/g,"%20");m=m[q](/\+/g,"%20");if(d==Yc(a+k+m))return I(129),[k,m];try{var t=b[na]("utmctr=(.*?)(?:\\|utm|$)");if(t&&2==t[x]&&(k=b[q](t[1],H(J(t[1]))),d==Yc(a+k+c)))return I(139),[k,c]}catch(u){}b=J(b)}c=J(c)}};var de="|",fe=function(a,b,c,d,e,f,k,m,t){var u=ee(a,b);u||(u={},a.get(Cb)[p](u));u.id_=b;u.affiliation_=c;u.total_=d;u.tax_=e;u.shipping_=f;u.city_=k;u.state_=m;u.country_=t;u.items_=u.items_||[];return u},ge=function(a,b,c,d,e,f,k){a=ee(a,b)||fe(a,b,"",0,0,0,"","","");var m;a:{if(a&&a.items_){m=a.items_;for(var t=0;t<m[x];t++)if(m[t].sku_==c){m=m[t];break a}}m=j}t=m||{};t.transId_=b;t.sku_=c;t.name_=d;t.category_=e;t.price_=f;t.quantity_=k;m||a.items_[p](t);return t},ee=function(a,b){for(var c=
a.get(Cb),d=0;d<c[x];d++)if(c[d].id_==b)return c[d];return j};var he,ie=function(a){if(!he){var b;b=K[A].hash;var c=W[s],d=/^#?gaso=([^&]*)/;if(c=(b=(b=b&&b[na](d)||c&&c[na](d))?b[1]:L(pd("GASO")))&&b[na](/^(?:[|!]([-0-9a-z.]{1,40})[|!])?([-.\w]{10,1200})$/i))Fd(a,"GASO",""+b),M._gasoDomain=a.get(bb),M._gasoCPath=a.get(P),a=c[1],Ha("https://www.google.com/analytics/web/inpage/pub/inpage.js?"+(a?"prefix="+a+"&":"")+Da(),"_gasojs");he=h}};var ae=function(a,b,c){c&&(b=J(b));c=a.b(O,1);b=b[z](".");!(2>b[x])&&/^\d+$/[fa](b[0])&&(b[0]=""+c,Fd(a,"__utmx",b[D](".")))},be=function(a,b){var c=$c(a.get(O),pd("__utmx"));"-"==c&&(c="");return b?H(c):c};var ke=function(a,b){var c=n.min(a.b(Dc,0),100);if(a.b(Q,0)%100>=c)return l;a:{if(c=(c=W.performance||W.webkitPerformance)&&c.timing){var d=c.navigationStart;if(0==d)I(133);else{c=[c.loadEventStart-d,c.domainLookupEnd-c.domainLookupStart,c.connectEnd-c.connectStart,c.responseStart-c.requestStart,c.responseEnd-c.responseStart,c.fetchStart-d,c.domInteractive-d,c.domContentLoadedEventStart-d];break a}}c=g}c||(W.top!=W?c=g:(d=(c=W.external)&&c.onloadT,c&&!c.isValidLoadTime&&(d=g),2147483648<d&&(d=g),
0<d&&c.setPageReadyTime(),c=d==g?g:[d]));if(c==g)return l;d=c[0];if(d==g||d==ba||isNaN(d))return l;if(0<d){a:{for(d=1;d<c[x];d++)if(isNaN(c[d])||c[d]==ba||0>c[d]){d=l;break a}d=h}d?b(je(c)):b(je(c[ia](0,1)))}else Fa(W,"load",function(){ke(a,b)},l);return h},me=function(a,b,c,d){var e=new yd;e.f(14,90,b[C](0,64));e.f(14,91,a[C](0,64));e.f(14,92,""+le(c));d!=g&&e.f(14,93,d[C](0,64));e.o(14,90,c);return e},le=function(a){return isNaN(a)||0>a?0:5E3>a?10*n[ka](a/10):5E4>a?100*n[ka](a/100):41E5>a?1E3*n[ka](a/
1E3):41E5},je=function(a){for(var b=new yd,c=0;c<a[x];c++)b.f(14,c+1,""+le(a[c])),b.o(14,c+1,a[c]);return b};var U=function(a,b,c){function d(a){return function(b){if((b=b.get(Nc)[a])&&b[x])for(var c={type:a,target:e,stopPropagation:function(){throw"aborted";}},d=0;d<b[x];d++)b[d].call(e,c)}}var e=this;this.a=new Zc;this.get=function(a){return this.a.get(a)};this.set=function(a,b,c){this.a.set(a,b,c)};this.set(Wa,b||"UA-XXXXX-X");this.set($a,a||"");this.set(Ya,c||"");this.set(ab,n.round((new Date).getTime()/1E3));this.set(P,"/");this.set(cb,63072E6);this.set(eb,15768E6);this.set(db,18E5);this.set(fb,l);
this.set(yb,50);this.set(gb,l);this.set(hb,h);this.set(ib,h);this.set(jb,h);this.set(kb,h);this.set(lb,h);this.set(ob,"utm_campaign");this.set(nb,"utm_id");this.set(pb,"gclid");this.set(qb,"utm_source");this.set(rb,"utm_medium");this.set(sb,"utm_term");this.set(tb,"utm_content");this.set(ub,"utm_nooverride");this.set(vb,100);this.set(Dc,1);this.set(Ec,l);this.set(wb,"/__utm.gif");this.set(xb,1);this.set(Cb,[]);this.set(Fb,[]);this.set(zb,Ld[ia](0));this.set(Ab,[]);this.set(Bb,[]);this.B("auto");this.set(Jb,
K.referrer);a=this.a;try{var f=La(K[A][wa],l),k=da(Ia(f.d.get("utm_referrer")))||"";k&&a.set(Jb,k);var m=W.gaData&&W.gaData.expId;m||(m=da(L(f.d.get("utm_expid")))||"");m&&a.set(Oc,""+m)}catch(t){I(146)}this.set(Nc,{hit:[],load:[]});this.a.g("0",Zd);this.a.g("1",Wd);this.a.g("2",Jd);this.a.g("3",Sd);this.a.g("4",Xd);this.a.g("5",Kd);this.a.g("6",d("load"));this.a.g("7",ie);this.a.e("A",kd);this.a.e("B",md);this.a.e("C",Jd);this.a.e("D",jd);this.a.e("E",Tc);this.a.e("F",ne);this.a.e("G",Gd);this.a.e("H",
nd);this.a.e("I",ud);this.a.e("J",Dd);this.a.e("K",d("hit"));this.a.e("L",oe);this.a.e("M",pe);0===this.get(ab)&&I(111);this.a.T();this.H=g};F=U[y];F.m=function(){var a=this.get(Db);a||(a=new yd,this.set(Db,a));return a};F.La=function(a){for(var b in a){var c=a[b];a.hasOwnProperty(b)&&this.set(b,c,h)}};F.K=function(a){if(this.get(Ec))return l;var b=this,c=ke(this.a,function(c){b.set(Hb,a,h);b.t(c)});this.set(Ec,c);return c};
F.Fa=function(a){a&&Ba(a)?(I(13),this.set(Hb,a,h)):"object"===typeof a&&a!==j&&this.La(a);this.H=a=this.get(Hb);this.a.j("page");this.K(a)};F.F=function(a,b,c,d,e){if(""==a||(!wd(a)||""==b||!wd(b))||c!=g&&!wd(c)||d!=g&&!xd(d))return l;this.set(wc,a,h);this.set(xc,b,h);this.set(yc,c,h);this.set(zc,d,h);this.set(vc,!!e,h);this.a.j("event");return h};
F.Ha=function(a,b,c,d,e){var f=this.a.b(Dc,0);1*e===e&&(f=e);if(this.a.b(Q,0)%100>=f)return l;c=1*(""+c);if(""==a||(!wd(a)||""==b||!wd(b)||!xd(c)||isNaN(c)||0>c||0>f||100<f)||d!=g&&(""==d||!wd(d)))return l;this.t(me(a,b,c,d));return h};F.Ga=function(a,b,c,d){if(!a||!b)return l;this.set(Ac,a,h);this.set(Bc,b,h);this.set(Cc,c||K[A][wa],h);d&&this.set(Hb,d,h);this.a.j("social");return h};F.Ea=function(){this.set(Dc,10);this.K(this.H)};F.Ia=function(){this.a.j("trans")};
F.t=function(a){this.set(Eb,a,h);this.a.j("event")};F.ia=function(a){this.v();var b=this;return{_trackEvent:function(c,d,e){I(91);b.F(a,c,d,e)}}};F.ma=function(a){return this.get(a)};F.xa=function(a,b){if(a)if(Ba(a))this.set(a,b);else if("object"==typeof a)for(var c in a)a.hasOwnProperty(c)&&this.set(c,a[c])};F.addEventListener=function(a,b){var c=this.get(Nc)[a];c&&c[p](b)};F.removeEventListener=function(a,b){for(var c=this.get(Nc)[a],d=0;c&&d<c[x];d++)if(c[d]==b){c.splice(d,1);break}};F.qa=function(){return"5.3.8"};
F.B=function(a){this.get(hb);a="auto"==a?Ka(K.domain):!a||"-"==a||"none"==a?"":a[E]();this.set(bb,a)};F.va=function(a){this.set(hb,!!a)};F.na=function(a,b){return ce(this.a,a,b)};F.link=function(a,b){if(this.a.get(fb)&&a){var c=ce(this.a,a,b);K[A].href=c}};F.ua=function(a,b){this.a.get(fb)&&(a&&a.action)&&(a.action=ce(this.a,a.action,b))};
F.za=function(){this.v();var a=this.a,b=K.getElementById?K.getElementById("utmtrans"):K.utmform&&K.utmform.utmtrans?K.utmform.utmtrans:j;if(b&&b[ma]){a.set(Cb,[]);for(var b=b[ma][z]("UTM:"),c=0;c<b[x];c++){b[c]=Ca(b[c]);for(var d=b[c][z](de),e=0;e<d[x];e++)d[e]=Ca(d[e]);"T"==d[0]?fe(a,d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8]):"I"==d[0]&&ge(a,d[1],d[2],d[3],d[4],d[5],d[6])}}};F.$=function(a,b,c,d,e,f,k,m){return fe(this.a,a,b,c,d,e,f,k,m)};F.Y=function(a,b,c,d,e,f){return ge(this.a,a,b,c,d,e,f)};
F.Aa=function(a){de=a||"|"};F.ea=function(){this.set(Cb,[])};F.wa=function(a,b,c,d){var e=this.a;if(0>=a||a>e.get(yb))a=l;else if(!b||!c||128<b[x]+c[x])a=l;else{1!=d&&2!=d&&(d=3);var f={};ea(f,b);f.value=c;f.scope=d;e.get(Fb)[a]=f;a=h}a&&this.a.n();return a};F.ka=function(a){this.a.get(Fb)[a]=g;this.a.n()};F.ra=function(a){return(a=this.a.get(Fb)[a])&&1==a[ta]?a[ma]:g};F.Ca=function(a,b,c){this.m().f(a,b,c)};F.Da=function(a,b,c){this.m().o(a,b,c)};F.sa=function(a,b){return this.m().getKey(a,b)};
F.ta=function(a,b){return this.m().N(a,b)};F.fa=function(a){this.m().L(a)};F.ga=function(a){this.m().M(a)};F.ja=function(){return new yd};F.W=function(a){a&&this.get(Ab)[p](a[E]())};F.ba=function(){this.set(Ab,[])};F.X=function(a){a&&this.get(Bb)[p](a[E]())};F.ca=function(){this.set(Bb,[])};F.Z=function(a,b,c,d,e){if(a&&b){a=[a,b[E]()][D](":");if(d||e)a=[a,d,e][D](":");d=this.get(zb);d.splice(c?0:d[x],0,a)}};F.da=function(){this.set(zb,[])};
F.ha=function(a){this.a[ja]();var b=this.get(P),c=be(this.a);this.set(P,a);this.a.n();ae(this.a,c);this.set(P,b)};F.ya=function(a,b){if(0<a&&5>=a&&Ba(b)&&""!=b){var c=this.get(Fc)||[];c[a]=b;this.set(Fc,c)}};F.V=function(a){a=""+a;if(a[na](/^[A-Za-z0-9]{1,5}$/)){var b=this.get(Ic)||[];b[p](a);this.set(Ic,b)}};F.v=function(){this.a[ja]()};F.Ba=function(a){a&&""!=a&&(this.set(Tb,a),this.a.j("var"))};var ne=function(a){"trans"!==a.get(sc)&&500<=a.b(cc,0)&&a[sa]();if("event"===a.get(sc)){var b=(new Date).getTime(),c=a.b(dc,0),d=a.b(Zb,0),c=n[ka](1*((b-(c!=d?c:1E3*c))/1E3));0<c&&(a.set(dc,b),a.set(R,n.min(10,a.b(R,0)+c)));0>=a.b(R,0)&&a[sa]()}},pe=function(a){"event"===a.get(sc)&&a.set(R,n.max(0,a.b(R,10)-1))};var qe=function(){var a=[];this.add=function(b,c,d){d&&(c=H(""+c));a[p](b+"="+c)};this.toString=function(){return a[D]("&")}},re=function(a,b){(b||2!=a.get(xb))&&a.z(cc)},se=function(a,b){b.add("utmwv","5.3.8");b.add("utms",a.get(cc));b.add("utmn",Da());var c=K[A].hostname;G(c)||b.add("utmhn",c,h);c=a.get(vb);100!=c&&b.add("utmsp",c,h)},te=function(a,b){b.add("utmac",Ca(a.get(Wa)));a.get(Oc)&&b.add("utmxkey",a.get(Oc),h);a.get(vc)&&b.add("utmni",1);var c=a.get(Ic);c&&0<c[x]&&b.add("utmdid",c[D]("."));
var c=function(a,b){b&&d[p](a+"="+b+";")},d=[];c("__utma",cd(a));c("__utmz",hd(a,l));c("__utmv",fd(a,h));c("__utmx",be(a));b.add("utmcc",d[D]("+"),h);a.get(Xa)!==l&&(a.get(Xa)||M.w)&&b.add("aip",1);b.add("utmu",od.Xa())},ue=function(a,b){for(var c=a.get(Fc)||[],d=[],e=1;e<c[x];e++)c[e]&&d[p](e+":"+H(c[e][q](/%/g,"%25")[q](/:/g,"%3A")[q](/,/g,"%2C")));d[x]&&b.add("utmpg",d[D](","))},ve=function(a,b){a.get(ib)&&(b.add("utmcs",a.get(Qb),h),b.add("utmsr",a.get(Lb)),a.get(Rb)&&b.add("utmvp",a.get(Rb)),
b.add("utmsc",a.get(Mb)),b.add("utmul",a.get(Pb)),b.add("utmje",a.get(Nb)),b.add("utmfl",a.get(Ob),h))},we=function(a,b){a.get(lb)&&a.get(Ib)&&b.add("utmdt",a.get(Ib),h);b.add("utmhid",a.get(Kb));b.add("utmr",Pa(a.get(Jb),a.get(P)),h);b.add("utmp",H(a.get(Hb),h),h)},xe=function(a,b){for(var c=a.get(Db),d=a.get(Eb),e=a.get(Fb)||[],f=0;f<e[x];f++){var k=e[f];k&&(c||(c=new yd),c.f(8,f,k[s]),c.f(9,f,k[ma]),3!=k[ta]&&c.f(11,f,""+k[ta]))}!G(a.get(wc))&&!G(a.get(xc),h)&&(c||(c=new yd),c.f(5,1,a.get(wc)),
c.f(5,2,a.get(xc)),e=a.get(yc),e!=g&&c.f(5,3,e),e=a.get(zc),e!=g&&c.o(5,1,e));c?b.add("utme",c.Qa(d),h):d&&b.add("utme",d.A(),h)},ye=function(a,b,c){var d=new qe;re(a,c);se(a,d);d.add("utmt","tran");d.add("utmtid",b.id_,h);d.add("utmtst",b.affiliation_,h);d.add("utmtto",b.total_,h);d.add("utmttx",b.tax_,h);d.add("utmtsp",b.shipping_,h);d.add("utmtci",b.city_,h);d.add("utmtrg",b.state_,h);d.add("utmtco",b.country_,h);xe(a,d);ve(a,d);we(a,d);(b=a.get(Gb))&&d.add("utmcu",b,h);c||(ue(a,d),te(a,d));return d[w]()},
ze=function(a,b,c){var d=new qe;re(a,c);se(a,d);d.add("utmt","item");d.add("utmtid",b.transId_,h);d.add("utmipc",b.sku_,h);d.add("utmipn",b.name_,h);d.add("utmiva",b.category_,h);d.add("utmipr",b.price_,h);d.add("utmiqt",b.quantity_,h);xe(a,d);ve(a,d);we(a,d);(b=a.get(Gb))&&d.add("utmcu",b,h);c||(ue(a,d),te(a,d));return d[w]()},Ae=function(a,b){var c=a.get(sc);if("page"==c)c=new qe,re(a,b),se(a,c),xe(a,c),ve(a,c),we(a,c),b||(ue(a,c),te(a,c)),c=[c[w]()];else if("event"==c)c=new qe,re(a,b),se(a,c),
c.add("utmt","event"),xe(a,c),ve(a,c),we(a,c),b||(ue(a,c),te(a,c)),c=[c[w]()];else if("var"==c)c=new qe,re(a,b),se(a,c),c.add("utmt","var"),!b&&te(a,c),c=[c[w]()];else if("trans"==c)for(var c=[],d=a.get(Cb),e=0;e<d[x];++e){c[p](ye(a,d[e],b));for(var f=d[e].items_,k=0;k<f[x];++k)c[p](ze(a,f[k],b))}else"social"==c?b?c=[]:(c=new qe,re(a,b),se(a,c),c.add("utmt","social"),c.add("utmsn",a.get(Ac),h),c.add("utmsa",a.get(Bc),h),c.add("utmsid",a.get(Cc),h),xe(a,c),ve(a,c),we(a,c),ue(a,c),te(a,c),c=[c[w]()]):
"feedback"==c?b?c=[]:(c=new qe,re(a,b),se(a,c),c.add("utmt","feedback"),c.add("utmfbid",a.get(Gc),h),c.add("utmfbpr",a.get(Hc),h),xe(a,c),ve(a,c),we(a,c),ue(a,c),te(a,c),c=[c[w]()]):c=[];return c},oe=function(a){var b,c=a.get(xb),d=a.get(uc),e=d&&d.Ua,f=0;if(0==c||2==c){var k=a.get(wb)+"?";b=Ae(a,h);for(var m=0,t=b[x];m<t;m++)Sa(b[m],e,k,h),f++}if(1==c||2==c){b=Ae(a);m=0;for(t=b[x];m<t;m++)try{Sa(b[m],e),f++}catch(u){u&&Ra(u[s],g,u.message)}}d&&(d.q=f)};var Be=function(){return"https:"==K[A][B]||M.G?"https://ssl.google-analytics.com":"http://www.google-analytics.com"},Ce=function(a){ea(this,"len");this.message=a+"-8192"},De=function(a){ea(this,"ff2post");this.message=a+"-2036"},Sa=function(a,b,c,d){b=b||Ea;if(d||2036>=a[x]){var e=b;b=c||Be()+"/__utm.gif?";var f=new Image(1,1);f.src=b+a;f.onload=function(){f.onload=j;f.onerror=j;e()};f.onerror=function(){f.onload=j;f.onerror=j;e()}}else if(8192>=a[x]){var k=b;if(0<=W[ya].userAgent[r]("Firefox")&&
![].reduce)throw new De(a[x]);var m;b=Be()+"/p/__utm.gif";if(c=W.XDomainRequest)m=new c,m.open("POST",b);else if(c=W.XMLHttpRequest)c=new c,"withCredentials"in c&&(m=c,m.open("POST",b,h),m.setRequestHeader("Content-Type","text/plain"));m?(m.onreadystatechange=function(){4==m.readyState&&(k(),m=j)},m.send(a),b=h):b=g;b||Ee(a,k)}else throw new Ce(a[x]);},Ee=function(a,b){if(K.body){a=aa(a);try{var c=K[pa]('<iframe name="'+a+'"></iframe>')}catch(d){c=K[pa]("iframe"),ea(c,a)}c.height="0";c.width="0";
c.style.display="none";c.style.visibility="hidden";var e=K[A],e=Be()+"/u/post_iframe.html#"+aa(e[B]+"//"+e[v]+"/favicon.ico"),f=function(){c.src="";c.parentNode&&c.parentNode.removeChild(c)};Fa(W,"beforeunload",f);var k=l,m=0,t=function(){if(!k){try{if(9<m||c.contentWindow[A][v]==K[A][v]){k=h;f();Ga(W,"beforeunload",f);b();return}}catch(a){}m++;ca(t,200)}};Fa(c,"load",t);K.body.appendChild(c);c.src=e}else ca(function(){Ee(a,b)},100)};var $=function(){this.G=this.w=l;this.C={};this.D=[];this.U=0;this.S=[["www.google-analytics.com","","/plugins/"]];this._gasoCPath=this._gasoDomain=g;var a=function(a,c,d){T($[y],a,c,d)};a("_createTracker",$[y].r,55);a("_getTracker",$[y].oa,0);a("_getTrackerByName",$[y].u,51);a("_getTrackers",$[y].pa,130);a("_anonymizeIp",$[y].aa,16);a("_forceSSL",$[y].la,125);a("_getPlugin",Pc,120);a=function(a,c,d){T(U[y],a,c,d)};Qc("_getName",$a,58);Qc("_getAccount",Wa,64);Qc("_visitCode",Q,54);Qc("_getClientInfo",
ib,53,1);Qc("_getDetectTitle",lb,56,1);Qc("_getDetectFlash",jb,65,1);Qc("_getLocalGifPath",wb,57);Qc("_getServiceMode",xb,59);V("_setClientInfo",ib,66,2);V("_setAccount",Wa,3);V("_setNamespace",Ya,48);V("_setAllowLinker",fb,11,2);V("_setDetectFlash",jb,61,2);V("_setDetectTitle",lb,62,2);V("_setLocalGifPath",wb,46,0);V("_setLocalServerMode",xb,92,g,0);V("_setRemoteServerMode",xb,63,g,1);V("_setLocalRemoteServerMode",xb,47,g,2);V("_setSampleRate",vb,45,1);V("_setCampaignTrack",kb,36,2);V("_setAllowAnchor",
gb,7,2);V("_setCampNameKey",ob,41);V("_setCampContentKey",tb,38);V("_setCampIdKey",nb,39);V("_setCampMediumKey",rb,40);V("_setCampNOKey",ub,42);V("_setCampSourceKey",qb,43);V("_setCampTermKey",sb,44);V("_setCampCIdKey",pb,37);V("_setCookiePath",P,9,0);V("_setMaxCustomVariables",yb,0,1);V("_setVisitorCookieTimeout",cb,28,1);V("_setSessionCookieTimeout",db,26,1);V("_setCampaignCookieTimeout",eb,29,1);V("_setReferrerOverride",Jb,49);V("_setSiteSpeedSampleRate",Dc,132);a("_trackPageview",U[y].Fa,1);a("_trackEvent",
U[y].F,4);a("_trackPageLoadTime",U[y].Ea,100);a("_trackSocial",U[y].Ga,104);a("_trackTrans",U[y].Ia,18);a("_sendXEvent",U[y].t,78);a("_createEventTracker",U[y].ia,74);a("_getVersion",U[y].qa,60);a("_setDomainName",U[y].B,6);a("_setAllowHash",U[y].va,8);a("_getLinkerUrl",U[y].na,52);a("_link",U[y].link,101);a("_linkByPost",U[y].ua,102);a("_setTrans",U[y].za,20);a("_addTrans",U[y].$,21);a("_addItem",U[y].Y,19);a("_clearTrans",U[y].ea,105);a("_setTransactionDelim",U[y].Aa,82);a("_setCustomVar",U[y].wa,
10);a("_deleteCustomVar",U[y].ka,35);a("_getVisitorCustomVar",U[y].ra,50);a("_setXKey",U[y].Ca,83);a("_setXValue",U[y].Da,84);a("_getXKey",U[y].sa,76);a("_getXValue",U[y].ta,77);a("_clearXKey",U[y].fa,72);a("_clearXValue",U[y].ga,73);a("_createXObj",U[y].ja,75);a("_addIgnoredOrganic",U[y].W,15);a("_clearIgnoredOrganic",U[y].ba,97);a("_addIgnoredRef",U[y].X,31);a("_clearIgnoredRef",U[y].ca,32);a("_addOrganic",U[y].Z,14);a("_clearOrganic",U[y].da,70);a("_cookiePathCopy",U[y].ha,30);a("_get",U[y].ma,
106);a("_set",U[y].xa,107);a("_addEventListener",U[y].addEventListener,108);a("_removeEventListener",U[y].removeEventListener,109);a("_addDevId",U[y].V);a("_getPlugin",Pc,122);a("_setPageGroup",U[y].ya,126);a("_trackTiming",U[y].Ha,124);a("_initData",U[y].v,2);a("_setVar",U[y].Ba,22);V("_setSessionTimeout",db,27,3);V("_setCookieTimeout",eb,25,3);V("_setCookiePersistence",cb,24,1);a("_setAutoTrackOutbound",Ea,79);a("_setTrackOutboundSubdomains",Ea,81);a("_setHrefExamineLimit",Ea,80)};F=$[y];
F.oa=function(a,b){return this.r(a,g,b)};F.r=function(a,b,c){b&&I(23);c&&I(67);b==g&&(b="~"+M.U++);a=new U(b,a,c);M.C[b]=a;M.D[p](a);return a};F.u=function(a){a=a||"";return M.C[a]||M.r(g,a)};F.pa=function(){return M.D[ia](0)};F.aa=function(){this.w=h};F.la=function(){this.G=h};var Fe=function(a){if("prerender"==K.webkitVisibilityState)return l;a();return h};var M=new $;var Ge=W._gat;Ge&&Aa(Ge._getTracker)?M=Ge:W._gat=M;var Z=new Y;var He=function(){var a=W._gaq,b=l;if(a&&Aa(a[p])&&(b="[object Array]"==Object[y][w].call(Object(a)),!b)){Z=a;return}W._gaq=Z;b&&Z[p][xa](Z,a)};if(!Fe(He)){I(123);var Ie=l,Je=function(){!Ie&&Fe(He)&&(Ie=h,Ga(K,"webkitvisibilitychange",Je))};Fa(K,"webkitvisibilitychange",Je)};function Yc(a){var b=1,c=0,d;if(a){b=0;for(d=a[x]-1;0<=d;d--)c=a.charCodeAt(d),b=(b<<6&268435455)+c+(c<<14),c=b&266338304,b=0!=c?b^c>>21:b}return b};})();



$.RoccarasoSki_Model.Immagine  = Class.extend({
	init: function(src,nome){
		this.src = src;
		this.nome = nome;		
	}
});

$.RoccarasoSki_Model.WebCam  = Class.extend({
	init: function(container){
		this.name = "webcam";
		this.images = [];

		this.container = container;
		this.waitingElement;
		this.errorElement;

		this.listContainer = $("#webcam-list-wrapper");
		this.list = $("#webcam-list", this.listContainer );
		this.stazioneDati = $("#stazione-dati", this.listContainer);
		this.stazioneDati.hide();
		this.list.hide();
		this.scroller;

		if ( Application.isiOSDevice() ){
			this.listContainer.css({ top: 40, bottom: "56px" } );
			this.container.append( this.listContainer );
		}else{
			this.listContainer.css({ top: this.container.offset().top } );
			this.container.append( this.listContainer );
		}		
		
		this.waitingElement = Application.waitingElement();
		this.container.append( this.waitingElement );		
		
		this.fetchAndShow();
	},
	removeFromParent: function(){
		if ( this.waitingElement != null ) this.waitingElement.remove();
		if ( this.errorElement != null ) this.errorElement.remove();
		$("#templates").append( this.listContainer );
		$.removeAllChildrens( this.list );
		this.list.hide();
		this.stazioneDati.hide();
		if ( this.scroller != null )
			this.scroller.destroy();
	},	
	showOnPage: function(){
		
		var srcTmp = [];
		for( var i = 0; i < this.images.length; i++ ){
			srcTmp.push( this.images[i].src );
		}
		
		$(document).smartpreload({ 
        						images: srcTmp, 
        						onloadall: function() {
        							if ( this.waitingElement != null ) this.waitingElement.remove();
        							
        							for(var i = 0; i < this.images.length; i++){  
        								this.list.append("<li data-role='list-divider' role='heading' class='statoAperto'>"+this.images[i].nome+"</li>");
        								this.list.append('<img class="immagineWeb" src="'+this.images[i].src+'"/>');
        							}
        							this.list.show();
        							this.stazioneDati.show();
        							this.list.listview('refresh'); 
        							setTimeout( function(){this.scroller = new iScroll("webcam-list-wrapper", {bounce: false} )}.bind(this), 100 );
        						}.bind(this)
        });		
		
	},
	fetchAndShow:function(callback){
		var that = this;
		$.ajax({
			url: "http://www.roccaraso.net/index.php?option=com_content&view=article&id=85&Itemid=517",
			//url: "webcam.html",
			type: 'GET',
			async: true,
			error:function(){
				  that.waitingElement.remove();
				  that.errorElement = Application.opsElement();
				  that.container.append( that.errorElement );
			},
			success: function(data) {
				var finei=7;
				var inizioi=0;
				var divp4 = $("div.p4", data);
						for(var j=0;j<2;j++){
                            var div=$("div", divp4[j]);
                            if(j==1)finei=3;
                            if(j==0) inizioi=1;
                            else inizioi=0;
                            for(var i=inizioi;i<finei;i++){
                                  var src = $("img",div[i]);   
                                  var img = $("a",div[i]);
                                  var immagine = new $.RoccarasoSki_Model.Immagine($(src).attr("src"),$(img[1]).text());
                                  if(immagine.nome!=""){
                                  	if(!immagine.src.match(/^http:\/\//))
                                  		immagine.src= "http://www.roccaraso.net"+immagine.src;
                                  	      	
                                  that.images.push(immagine);
                                  }        
                           }	
                         }
						that.showOnPage();
		  			}
			});
	}
});
