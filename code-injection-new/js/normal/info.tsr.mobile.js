






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
        












				
			var mobileDemo = { 'center': '57.7973333,12.0502107', 'zoom': 10 };				
        

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


	String.prototype.format = function() { a = this; for ( k in arguments ) { a = a.replace("{" + k + "}", arguments[k]); } return a; };
	window.demo = { 
		'version': '3.0-rc1',
		'ga': '',
		'primaryUrl': 'http://code.google.com/p/jquery-ui-map/',
		'url': 'http://jquery-ui-map.googlecode.com/', 
		'forum': 'http://groups.google.com/group/jquery-ui-map-discuss/feed/rss_v2_0_msgs.xml', 
		'subscribe': 'http://groups.google.com/group/jquery-ui-map-discuss/boxsubscribe', 
		'exception': 'Unable to load due to either poor internet connection or some CDN\'s aren\'t as responsive as we would like them to be. Try refreshing the page :D.', 
		'init': function() {
			//window._gaq = [['_setAccount', this.ga], ['_trackPageview'], ['_trackPageLoadTime']];
			//Modernizr.load({ 'test': ( location.href.indexOf(this.url) > -1 ), 'yep': 'http://www.google-analytics.com/ga.js' });
			this.test('Backbone', function() {
				$('#forum').append('<h2>Forum</h2><ul id="forum_posts"></ul><h2>Subscribe</h2><form id="forum_subscribe" class="subscribe" action="#"><label for="email">E-mail:</label><input id="email" type="text" name="email" /><input type="submit" name="sub" value="Subscribe" /></form>');
				ForumCollection = Backbone.Collection.extend({ 'url': 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q={0}'.format(encodeURIComponent(demo.forum)), 'parse': function(response) { return response.responseData.feed.entries; } });
				ForumPost = Backbone.View.extend({ 'tagName': 'li', 'className': 'group-item', 'template': _.template('<a href="<%=link%>"><%=title%></a></h3>'), 'render': function() { $(this.el).html(this.template(this.model.toJSON())); return this; } }); 
				Forum = Backbone.View.extend({ 'el': $("#forum"), 'initialize': function() { this.col = new ForumCollection(); this.col.bind('reset', this.load, this); this.col.fetch(); }, 'add': function(post) { var view = new ForumPost({'model': post}); $('#forum_posts').append(view.render().el); }, 'load': function () { this.col.each(this.add); $('#forum_subscribe').attr('action', demo.subscribe); $(this.el).show(); } });
				var app = new Forum();
			});
			this.test('prettyPrint', function() { prettyPrint(); });
			$('#version').text(this.version);
		},
		'redirect': function(url) { alert('This page is deprecated. Please update your URL. Redirecting to new page.'); window.location = url; },
		'col': [], 
		'tests': [],
		'test': function(a, b) { if ( window[a] ) { b(); } },
		'add': function(a, b) { if (b) { this.col[a] = b; } else { this.col.push(a); } return this; },
		'load': function(a) { var self = this; if (a) { self.col[a](); } else { $.each(self.col, function(i,d) { try { d(); } catch (err) { alert(self.exception); } }); } },
		'timeStart': function(key, desc) { this.tests[key] = { 'start': new Date().getTime(), 'desc': desc }; },
		'timeEnd': function(key) { this.tests[key].elapsed = new Date().getTime(); },
		'report': function(id) { var i = 1; for ( var k in this.tests ) { var t = this.tests[k]; $(id).append('<div class="benchmark rounded"><div class="benchmark-result lt">' + (t.elapsed - t.start) + ' ms</div><div class="lt"><p class="benchmark-iteration">Benchmark case ' + i + '</p><p class="benchmark-title">' + t.desc + '</p></div></div>'); i++; }; }
	};
		
	demo.init();

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


$('#home').live('pageinit', function() {
	$.mobile.pushStateEnabled=false;
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$("#select-choice-4").parent().hide();
	$("#select-choice-1").bind( "change", function(event) {
    	selectNatureElements(event);
    	$("#select-choice-1-button").removeClass("red");
	});
	$("#select-choice-2").bind( "change", function(event) {
    	$("#select-choice-2-button").removeClass("red");
	});
	$("#select-choice-3").bind( "change", function(event) {
    	$("#select-choice-3-button").removeClass("red");
	});
	$("#select-choice-4").bind( "change", function(event) {
    	$("#select-choice-4-button").removeClass("red");
	});
	$("#select-choice-5").bind( "change", function(event) {
    	$("#select-choice-5-button").removeClass("red");
	});
	$("#markbutton").bind( "click", function(event) {
		if(validate(event)){
    		if(navigator.geolocation) { 
    			$.mobile.showPageLoadingMsg();
    			var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
    			navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    		} else {
    			alert("your browser does not support geolocation");
    		}
    	}
	});
});

////////////////////////////////////////////////////////////

$('#directions_map').live('pageinit', function() {
	demo.add('directions_map', function() {
		$('#map_canvas_1').gmap({'center': mobileDemo.center, 'zoom': mobileDemo.zoom, 'disableDefaultUI':true, 'callback': function() {
			var self = this;
			self.set('getCurrentPosition', function() {
				self.refresh();
				self.getCurrentPosition( function(position, status) {
					if ( status === 'OK' ) {
						var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
						self.get('map').panTo(latlng);
						self.search({ 'location': latlng }, function(results, status) {
							if ( status === 'OK' ) {
								$('#from').val(results[0].formatted_address);
							}
						});
					} else {
						alert('Unable to get current position');
					}
				});
			});
			/*$('#submit').click(function() {
				calcRoute(self);
			});*/
			$("#select-choice-6").bind( "change", function(event) {
				calcRoute(self);
			});
		}});
	}).load('directions_map');
});

$('#directions_map').live('pageshow', function() {
	demo.add('directions_map', $('#map_canvas_1').gmap('get', 'getCurrentPosition')).load('directions_map');
});
			
function calcRoute(obj){
	if(!$('#from').val() || !$('#to').val())
		return false;
	if($('#map_canvas_1').gmap('get', 'overlays > FusionTablesLayer')) {
		$('#map_canvas_1').gmap('get', 'overlays > FusionTablesLayer').setMap(null);
	}
	obj.displayDirections({ 'origin': $('#from').val(), 'destination': $('#to').val(), 'travelMode': google.maps.DirectionsTravelMode.DRIVING }, { 'panel': document.getElementById('directions')}, function(response, status) {
		SWLAT = response.routes[0].bounds.getSouthWest().lat();
        SWLNG = response.routes[0].bounds.getSouthWest().lng();
        NELAT = response.routes[0].bounds.getNorthEast().lat();
        NELNG = response.routes[0].bounds.getNorthEast().lng();
        $('#map_canvas_1').gmap('loadFusion', { 'query': { 'from': '19ZyjTyDCYccePHh_q-gYxP4oLfgS41lC_4oF1eA','where':"ST_INTERSECTS(Location, RECTANGLE(LATLNG("+SWLAT+", "+SWLNG+"), LATLNG("+NELAT+", "+NELNG+"))) and LastUpdatedDate >= '"+getDate()+"' " } } );
        ( status === 'OK' ) ? $('#results').show() : $('#results').hide();
	});
	return false;
}

function selectNatureElements(event) {
	var selectedValue = $("#select-choice-1 option:selected").val();
	if(selectedValue==="Accident"){
		$("#select-choice-4").parent().hide();
		$("#select-choice-3").parent().show();
		$("#select-choice-2").parent().show();
	} else if(selectedValue==="Natural Disaster"){
		$("#select-choice-4").parent().show();
		$("#select-choice-2").parent().hide();
		$("#select-choice-3").parent().hide();
	}
}

function validate(event) {
	var error = false;
	var category = $("#select-choice-1 option:selected").val();
	if(!category || category.length===0) {
		$("#select-choice-1-button").addClass("red");
		error = true;
	}
	if($("#select-choice-2 option:selected")){
		var transport = $("#select-choice-2 option:selected").val();
		if(!transport || transport.length===0) {
			$("#select-choice-2-button").addClass("red");
			error = true;
		}
	}
	if(!category || category.length===0 || category==="Accident"){
		if($("#select-choice-3 option:selected")) {
			var reason = $("#select-choice-3 option:selected").val();
			if(!reason || reason.length===0) {
				$("#select-choice-3-button").addClass("red");
				error = true;
			}
		}
	} else if(category==="Natural Disaster"){
		if($("#select-choice-4 option:selected")) {
			var nature = $("#select-choice-4 option:selected").val();
			if(!nature || nature.length===0) {
				$("#select-choice-4-button").addClass("red");
				error = true;
			}
		}	
	}	
	var severity = $("#select-choice-5 option:selected").val();
	if(!severity || severity.length===0) {
		$("#select-choice-5-button").addClass("red");
		error = true;
	}
	if(!error) {
		return true;
	} else {
		return false;	
	}	 
}

/* onSuccess Callback : This method accepts a `Position` object, which contains
 * the current GPS coordinates
 */
var onSuccess = function(position) {
	/*alert('Latitude: '          + position.coords.latitude          + '\n' +
	     'Longitude: '         + position.coords.longitude         + '\n' +
	     'Altitude: '          + position.coords.altitude          + '\n' +
	     'Accuracy: '          + position.coords.accuracy          + '\n' +
	     'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	     'Heading: '           + position.coords.heading           + '\n' +
	     'Speed: '             + position.coords.speed             + '\n' +
	     'Timestamp: '         + position.timestamp                + '\n');*/
	if(position.coords.accuracy && position.coords.accuracy>100) {
		alert("Enable GPS for marking");
		$.mobile.hidePageLoadingMsg();
	} else {
		var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var location = position.coords.latitude+","+position.coords.longitude;
		getLocationfromGoogle(latLng, function(geo_address){
			insertMark(location, geo_address.address_components);
		});
	}
}

/*
 *onError Callback receives a PositionError object 
 */
function onError(error) {
	//alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
	alert("Enable GPS for marking");
	$.mobile.hidePageLoadingMsg();
}

function getLocationfromGoogle(latLng, callback) {
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({ 'latLng': latLng}, function (results, status) {
    	if (status == google.maps.GeocoderStatus.OK) {
        	//console.log(results[0].formatted_address);
    		if (callback && typeof(callback) === "function") {  
    			callback(results[0]);  
    	    }
        } else {
        	console.log('Google convertion is not succesfully done.');  
        	$.mobile.hidePageLoadingMsg();
        }
    });
}

function insertMark(location, address_components){
	var category = $("#select-choice-1 option:selected").val();
	var transportation = $("#select-choice-2 option:selected").val();
	var reason = $("#select-choice-3 option:selected").val();
	var severity = $("#select-choice-5 option:selected").val();
	if(category==='Natural Disaster') {
		transportation= '';
		reason = $("#select-choice-4 option:selected").val();
	}
	var description = $("#desc").val();
	var data = {"location":location,
				"category":category,"transportation":transportation,
				"reason":reason,"severity":severity,
				"description":description, "address":address_components};
	$.ajax({
        url: "http://www.routemarks.com/markfn/insert",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: post_Succeeded,
        error: post_Failed
      });
}
function post_Succeeded(result) {
	alert('Your mark has been stored successfully. Thank you!');
	$.mobile.hidePageLoadingMsg();
}

function post_Failed(p1, p2, p3) {
	alert('Error during save. Please try again.');
	$.mobile.hidePageLoadingMsg();
}
function getLastWeekDate(){
	var now = new Date();
	now.setDate(now.getDate() - 7);
	var mm = (now.getMonth()+1);
	if(mm<10){
		mm='0'+mm;
	}
	date = mm+"/"+now.getDate()+"/"+(now.getFullYear()-2000);
	return date;
}
function getDate(){
	var option = $("#select-choice-6 option:selected").val();
	var date;
	if(option==='today') {
		date = getTodaysDate();
	} if(option==='lastday') {
		date = getYesterdaysDate();
	} else if(option==='lastweek') {
		date = getLastWeekDate();
	} else if(option==='lastmonth') {
		date = getLastMonthDate();
	} else if(option==='lastyear') {
		date = getLastYearDate();
	}     
	return date;
}
function getTodaysDate(){
	var now = new Date();
	now.setDate(now.getDate());
	var mm = (now.getMonth()+1);
	if(mm<10){
		mm='0'+mm;
	}
	date = mm+"/"+now.getDate()+"/"+(now.getFullYear()-2000);
	return date;
}
function getYesterdaysDate(){
	var now = new Date();
	now.setDate(now.getDate() - 1);
	var mm = (now.getMonth()+1);
	if(mm<10){
		mm='0'+mm;
	}
	date = mm+"/"+now.getDate()+"/"+(now.getFullYear()-2000);
	return date;
}

function getLastWeekDate(){
	var now = new Date();
	now.setDate(now.getDate() - 7);
	var mm = (now.getMonth()+1);
	if(mm<10){
		mm='0'+mm;
	}
	date = mm+"/"+now.getDate()+"/"+(now.getFullYear()-2000);
	return date;
}

function getLastMonthDate(){
	var now = new Date();
	now.setDate(now.getDate() - 30);
	var mm = (now.getMonth()+1);
	if(mm<10){
		mm='0'+mm;
	}
	date = mm+"/"+now.getDate()+"/"+(now.getFullYear()-2000);
	return date;
}

function getLastYearDate(){
	var now = new Date();
	now.setDate(now.getDate() - 365);
	var mm = (now.getMonth()+1);
	if(mm<10){
		mm='0'+mm;
	}
	date = mm+"/"+now.getDate()+"/"+(now.getFullYear()-2000);
	return date;
}

/* Modernizr 2.0.6 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-geolocation-iepp-cssclasses-load
 */
;window.Modernizr=function(a,b,c){function x(a,b){return!!~(""+a).indexOf(b)}function w(a,b){return typeof a===b}function v(a,b){return u(prefixes.join(a+";")+(b||""))}function u(a){k.cssText=a}var d="2.0.6",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l,m=Object.prototype.toString,n={},o={},p={},q=[],r,s={}.hasOwnProperty,t;!w(s,c)&&!w(s.call,c)?t=function(a,b){return s.call(a,b)}:t=function(a,b){return b in a&&w(a.constructor.prototype[b],c)},n.geolocation=function(){return!!navigator.geolocation};for(var y in n)t(n,y)&&(r=y.toLowerCase(),e[r]=n[y](),q.push((e[r]?"":"no-")+r));u(""),j=l=null,a.attachEvent&&function(){var a=b.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function s(a){var b=-1;while(++b<g)a.createElement(f[b])}a.iepp=a.iepp||{};var d=a.iepp,e=d.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",f=e.split("|"),g=f.length,h=new RegExp("(^|\\s)("+e+")","gi"),i=new RegExp("<(/*)("+e+")","gi"),j=/^\s*[\{\}]\s*$/,k=new RegExp("(^|[^\\n]*?\\s)("+e+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),l=b.createDocumentFragment(),m=b.documentElement,n=m.firstChild,o=b.createElement("body"),p=b.createElement("style"),q=/print|all/,r;d.getCSS=function(a,b){if(a+""===c)return"";var e=-1,f=a.length,g,h=[];while(++e<f){g=a[e];if(g.disabled)continue;b=g.media||b,q.test(b)&&h.push(d.getCSS(g.imports,b),g.cssText),b="all"}return h.join("")},d.parseCSS=function(a){var b=[],c;while((c=k.exec(a))!=null)b.push(((j.exec(c[1])?"\n":c[1])+c[2]+c[3]).replace(h,"$1.iepp_$2")+c[4]);return b.join("\n")},d.writeHTML=function(){var a=-1;r=r||b.body;while(++a<g){var c=b.getElementsByTagName(f[a]),d=c.length,e=-1;while(++e<d)c[e].className.indexOf("iepp_")<0&&(c[e].className+=" iepp_"+f[a])}l.appendChild(r),m.appendChild(o),o.className=r.className,o.id=r.id,o.innerHTML=r.innerHTML.replace(i,"<$1font")},d._beforePrint=function(){p.styleSheet.cssText=d.parseCSS(d.getCSS(b.styleSheets,"all")),d.writeHTML()},d.restoreHTML=function(){o.innerHTML="",m.removeChild(o),m.appendChild(r)},d._afterPrint=function(){d.restoreHTML(),p.styleSheet.cssText=""},s(b),s(l);d.disablePP||(n.insertBefore(p,n.firstChild),p.media="print",p.className="iepp-printshim",a.attachEvent("onbeforeprint",d._beforePrint),a.attachEvent("onafterprint",d._afterPrint))}(a,b),e._version=d,g.className=g.className.replace(/\bno-js\b/,"")+(f?" js "+q.join(" "):"");return e}(this,this.document),function(a,b,c){function k(a){return!a||a=="loaded"||a=="complete"}function j(){var a=1,b=-1;while(p.length- ++b)if(p[b].s&&!(a=p[b].r))break;a&&g()}function i(a){var c=b.createElement("script"),d;c.src=a.s,c.onreadystatechange=c.onload=function(){!d&&k(c.readyState)&&(d=1,j(),c.onload=c.onreadystatechange=null)},m(function(){d||(d=1,j())},H.errorTimeout),a.e?c.onload():n.parentNode.insertBefore(c,n)}function h(a){var c=b.createElement("link"),d;c.href=a.s,c.rel="stylesheet",c.type="text/css";if(!a.e&&(w||r)){var e=function(a){m(function(){if(!d)try{a.sheet.cssRules.length?(d=1,j()):e(a)}catch(b){b.code==1e3||b.message=="security"||b.message=="denied"?(d=1,m(function(){j()},0)):e(a)}},0)};e(c)}else c.onload=function(){d||(d=1,m(function(){j()},0))},a.e&&c.onload();m(function(){d||(d=1,j())},H.errorTimeout),!a.e&&n.parentNode.insertBefore(c,n)}function g(){var a=p.shift();q=1,a?a.t?m(function(){a.t=="c"?h(a):i(a)},0):(a(),j()):q=0}function f(a,c,d,e,f,h){function i(){!o&&k(l.readyState)&&(r.r=o=1,!q&&j(),l.onload=l.onreadystatechange=null,m(function(){u.removeChild(l)},0))}var l=b.createElement(a),o=0,r={t:d,s:c,e:h};l.src=l.data=c,!s&&(l.style.display="none"),l.width=l.height="0",a!="object"&&(l.type=d),l.onload=l.onreadystatechange=i,a=="img"?l.onerror=i:a=="script"&&(l.onerror=function(){r.e=r.r=1,g()}),p.splice(e,0,r),u.insertBefore(l,s?null:n),m(function(){o||(u.removeChild(l),r.r=r.e=o=1,j())},H.errorTimeout)}function e(a,b,c){var d=b=="c"?z:y;q=0,b=b||"j",C(a)?f(d,a,b,this.i++,l,c):(p.splice(this.i++,0,a),p.length==1&&g());return this}function d(){var a=H;a.loader={load:e,i:0};return a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=r&&!s,u=s?l:n.parentNode,v=a.opera&&o.call(a.opera)=="[object Opera]",w="webkitAppearance"in l.style,x=w&&"async"in b.createElement("script"),y=r?"object":v||x?"img":"script",z=w?"img":y,A=Array.isArray||function(a){return o.call(a)=="[object Array]"},B=function(a){return Object(a)===a},C=function(a){return typeof a=="string"},D=function(a){return o.call(a)=="[object Function]"},E=[],F={},G,H;H=function(a){function f(a){var b=a.split("!"),c=E.length,d=b.pop(),e=b.length,f={url:d,origUrl:d,prefixes:b},g,h;for(h=0;h<e;h++)g=F[b[h]],g&&(f=g(f));for(h=0;h<c;h++)f=E[h](f);return f}function e(a,b,e,g,h){var i=f(a),j=i.autoCallback;if(!i.bypass){b&&(b=D(b)?b:b[a]||b[g]||b[a.split("/").pop().split("?")[0]]);if(i.instead)return i.instead(a,b,e,g,h);e.load(i.url,i.forceCSS||!i.forceJS&&/css$/.test(i.url)?"c":c,i.noexec),(D(b)||D(j))&&e.load(function(){d(),b&&b(i.origUrl,h,g),j&&j(i.origUrl,h,g)})}}function b(a,b){function c(a){if(C(a))e(a,h,b,0,d);else if(B(a))for(i in a)a.hasOwnProperty(i)&&e(a[i],h,b,i,d)}var d=!!a.test,f=d?a.yep:a.nope,g=a.load||a.both,h=a.callback,i;c(f),c(g),a.complete&&b.load(a.complete)}var g,h,i=this.yepnope.loader;if(C(a))e(a,0,i,0);else if(A(a))for(g=0;g<a.length;g++)h=a[g],C(h)?e(h,0,i,0):A(h)?H(h):B(h)&&b(h,i);else B(a)&&b(a,i)},H.addPrefix=function(a,b){F[a]=b},H.addFilter=function(a){E.push(a)},H.errorTimeout=1e4,b.readyState==null&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",G=function(){b.removeEventListener("DOMContentLoaded",G,0),b.readyState="complete"},0)),a.yepnope=d()}(this,this.document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
