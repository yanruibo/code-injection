






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


// Gallery Walk JS - Version 1.0

var historyList = new Array();
var data;
var dataLoaded = false;
var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

if (iOS) {
	var mapDomain = "apple.com";
} else {
	var mapDomain = "google.com";
}

$("document").ready(function(){
	$.mobile.loading( "show", {	theme: "d" } );
	$('[data-role=header],[data-role=footer]').fixedtoolbar({ tapToggle:false });
	bindAll();
	loadReadData();
});

// Attempt to read lastbuild from localstorage. If not found then it's nothing.
// If argument bForce is true, then never use cache...
function loadReadData(bForce){
	var lstBld = null;
	var theUrl = "http://www.ptowngallerywalk.com/appData/getData";
	if((typeof(Storage)!=="undefined") && (!bForce)){
		if (localStorage){
			lstBld = localStorage.lastBuild;
			if (typeof(lstBld) !== "undefined"){
				theUrl += "/" + lstBld;
			}
		}
	}
	$.ajax({
	  dataType: "jsonp",
      url: theUrl,
	  success: function(json) {
		  data = json;
		  // Check if we should use cached version or not
		  checkLoadCache();
		  init();
		 },
	  error: function(e) {
	  	$.mobile.loading( "hide" );
	  	$("#content").append("<p>There was an error loading content. Please check your network connection and try again.</p>");
	  }
	});	
}

// At this point, either "data" will contain the entire JSON
// or it will just contain a single entry indicating to use
// cached version.
function checkLoadCache(){
	if(typeof(Storage)!=="undefined"){
		if (data.cache == "valid"){
			data = JSON.parse(localStorage.dataset);
		} else {
			localStorage.lastBuild = data.lastbuild;
			localStorage.dataset = JSON.stringify(data);
		}
	}
	dataLoaded = true;
}

function init() {
	if (dataLoaded) {
		$.mobile.loading( "hide" );
		$("#footer").fadeIn('fast');
		$(".ui-page").css("height",window.innerHeight);
		$("#content").height(window.innerHeight - $("#header").height() - $("#footer").height() - 30).width($(window).width() - 30).css("top",($("#header").height()));
		setTimeout(function(){setUIstate("eventsList")},150);
	} else {
		setTimeout(init,10);
	}
}

function bindAll() {
	$(document).bind('touchmove', function(e) {
		if ($(e.target).parents("#content").length) {
			return true;
		} else {
			return false;
		}
	});
	$("body")
		.delegate("[url]", 'click', function(){
            var ref = window.open(encodeURI($(this).attr("url")), '_system', 'location=yes');
        })
		.delegate("#back", 'click',function(){
			goBack();
		})
		.delegate("#header", 'click', function(){
			$("#content").scrollTop(0);	
		})
		.delegate("[event]", 'click',function(){
			setUIstate("event",$(this).attr("event"));
		})
		.delegate("[gallery]", 'click',function(){
			setUIstate("gallery",$(this).attr("gallery"));
		})
		.delegate("[artist]", 'click',function(){
			setUIstate("artist",$(this).attr("artist"));
		})
		.delegate("[material]", 'click',function(){
			if ($(this).parents('#gallery').length) return false;
			setUIstate("material",$(this).attr("material"));
		})
		.delegate("[map]", 'click',function(){
			setUIstate("map",$(this).attr("map"));
		})
		.delegate("#eventsListBtn", 'click',function(){
			setUIstate("eventsList");
		})
		.delegate("#galleriesListBtn", 'click',function(){
			setUIstate("galleriesList");
		})
		.delegate("#artistsListBtn", 'click',function(){
			setUIstate("artistsList");
		})
		.delegate("#materialsListBtn", 'click',function(){
			setUIstate("materialsList");
		})
		.delegate("#mapBtn", 'click',function(){
			setUIstate("map");
		});
	$(window).resize(function(){
		$("#content").height(window.innerHeight - $("#header").height() - $("#footer").height() - 30).width($(window).width() - 30).css("top",($("#header").height()));
		$("#map").height(window.innerHeight - $("#header").height() - $("#footer").height()).width($(window).width());
	});
}

function setUIstate(state,id,pos,isBack) {
	var prevPos = $("#content").scrollTop();
	$("#content").css("left","-99999px");
	$("#header h1").removeClass("fadein").hide(0);
	$("#content").removeClass("fadein").hide(0, function() {
		$("#navbar .ui-btn-active").removeClass("ui-btn-active");
		$("#content").empty();
		$("#content,#header h1").css("opacity","0").show();
		switch(state) {
			case "eventsList":
					buildList("events");
					$("#header h1").text("Events");
					$("#eventsListBtn").addClass("ui-btn-active");
				break;
			case "galleriesList":
					buildList("galleries");
					$("#header h1").text("All Galleries");
					$("#galleriesListBtn").addClass("ui-btn-active");
				break;
				
			case "artistsList":
					buildList("artists");
					$("#header h1").text("All Artists");
					$("#artistsListBtn").addClass("ui-btn-active");
				break;
				
			case "materialsList":
					buildList("materials");
					$("#header h1").text("All Media");
					$("#materialsListBtn").addClass("ui-btn-active");
				break;
				
			case "event":
					buildItem("event",id);
				break;
				
			case "gallery":
					buildItem("gallery",id);
				break;
				
			case "artist":
					buildItem("artist",id);
				break;
				
			case "material":
					buildItem("material",id);
				break;
				
			case "map":
					$("#header h1").text("Map");
					createMap(id);
				break;
				
			default:
					console.log("Invalid UI state");
					setUIstate("galleriesList");
				break;
		}
		$("#content").css("left","0px");
		$("#content").height(window.innerHeight - $("#header").height() - $("#footer").height() - 30).width($(window).width() - 30).css("top",($("#header").height()));
		if (isBack && pos) {
			setTimeout(function(){$("#content").scrollTop(pos)},1);
		} else {
			if (state == "eventsList" || state == "galleriesList" || state == "artistsList" || state == "materialsList") {
				setTimeout(function(){$("#content").scrollTop(70)},1);
			} else {
				setTimeout(function(){$("#content").scrollTop(0)},1);	
			}
		}
		$("#header h1").addClass("fadein");
		$("#content").addClass("fadein");
	});
		
	// Add the screen to the history stack if it's a detail page only.  If the user resets to one of the main lists, reset the history stack.
	if (!isBack) {
		if (typeof(id) == "undefined") {
			historyList.length = 0;
		}
		var historyItem = {
			type: state,
			id: id,
			pos: null
		};
		historyList.push(historyItem);
	}
	
	// Now if there's any history, show the back button, otherwise get rid of it
	if (historyList.length > 1) {
		if (!isBack) {
			historyList[historyList.length - 2].pos = prevPos;
		}
		$("#back").addClass("fadein");
	} else {
		$("#back").removeClass("fadein").fadeOut(10, function() {
			$("#back").css("opacity","0").show();
		});
	}
}

function goBack() {
	if (historyList.length > 1) {
		historyList.pop();
		var lastItem = historyList[historyList.length-1];
		setUIstate(lastItem.type,lastItem.id,lastItem.pos,true);
	}
}

function buildList(type) {
	switch(type) {
		case "events":
			var mNow = moment();
			$("#content").append('<ul id="eventList" data-inset="true" data-role="listview" data-dividertheme="b" data-filter-theme="z" data-autodividers="true" data-filter="true"></ul>');
			$.each(data.events.entries, function(i,r) {
				if (this.Type !== "Show") {
					// IMM060213 >>>
					var galO = getGalleryByID(this.GalleryID);
					if (galO !== null){
						var mBeg = moment(this.StartDate + " " + this.StartTime);
						var mEnd = moment(this.EndDate + " " + this.EndTime);
						if ((mBeg.diff(mNow) >= 0) || (mEnd.diff(mNow) >= 0)){
							$("#eventList").append('<li cleanDate="' + 
								moment(this.StartDate).format('dddd, MMMM Do YYYY') + 
								'" sort="' + moment(this.StartDate + " " + this.StartTime).valueOf() + 
								'" type="' + this.Type + 
								'" event="' + this.ID + '">' + '<h3>' + galO.Name  + 
								'</h3><p>' + this.Name + '</p><p>' + this.Type + ': ' + 
								moment(this.StartDate + " " + this.StartTime).format("h:mm A") + 
								'</p></li>');
						}
					}
					// <<< IMM060213
				}
			});
			var mylist = $('#eventList');
			var listitems = mylist.children('li').get();
			listitems.sort(function(a, b) {
			   return $(a).attr("sort").localeCompare($(b).attr("sort"));
			})
			$.each(listitems, function(idx, itm) { mylist.append(itm); });
			$("#eventList").listview({autodividersSelector: function ( li ) { var out = $(li).attr("cleanDate"); return out; }}).listview("refresh");
			break;
			
		case "galleries":
			$("#content").append('<ul id="galleryList" data-inset="true" data-role="listview" data-dividertheme="b" data-filter-theme="z" data-autodividers="true" data-filter="true"></ul>');
			$.each(data.galleries.entries, function(i,r) {
				$("#galleryList").append('<li gallery="' + this.ID + '">' + this.Name + '</li>');
			});
			$("#galleryList").listview().listview("refresh");
			break;
			
		case "artists":
			$("#content").append('<ul id="artistsList" data-inset="true" data-role="listview" data-dividertheme="b" data-filter-theme="z" data-autodividers="true" data-filter="true"></ul>');
			$.each(data.artists.entries, function(i,r) {
				$("#artistsList").append('<li artist="' + this.ID + '" sort="' + this.LastName + ' ' + this.FirstName + '">' + this.FirstName + ' ' + this.LastName + '</li>');
			});
			$("#artistsList").listview({autodividersSelector: function ( li ) { var out = $(li).attr("sort").substr(0,1); return out; }}).listview("refresh");
			break;
			
		case "materials":
			$("#content").append('<ul id="materialsList" data-inset="true" data-role="listview" data-dividertheme="b" data-filter-theme="z" data-autodividers="true" data-filter="true"></ul>');
			$.each(data.materials.entries, function(i,r) {
				$("#materialsList").append('<li material="' + this.ID + '">' + this.Name + '</li>');
			});
			$("#materialsList").listview().listview("refresh");
			break;
			
		default:
			console.log("Invalid list type");
			break;
	}
}

function buildItem(type, id) {
	switch(type) {
		case "event":
			var result;
			$.each(data.events.entries, function(i,r) {
				if (this.ID == id) {
					result = this;
				}
			});
			// IMM060213 >>>
			if (result){
				var galO = getGalleryByID(result.GalleryID);
				if (galO !== null){
					var html = $('<ul id="event" data-inset="true" data-role="listview"></ul>');
					$("#header h1").text(result.Name);
					
					html.append("<li class='address' map='" + result.GalleryID + "'><strong>" + galO.Name + "</strong><br/>" + galO.StreetAddress + "<br/>" + galO.CityTown + ", " + galO.State + " " + galO.Zip + "</li>");
					
					if (result.Description)	html.append("<li class='description'>" + result.Description + "</li>");
					
					if (result.EndDate) {
						html.append("<li class='date'>" + moment(result.StartDate).format("LL") + " - " + moment(result.EndDate).format("LL") + "</li>"); 
					} else {
						html.append("<li class='date'>" + moment(result.StartDate).format("LL") + "</li>"); 
					}
					
					if (result.EndTime) {
						html.append("<li class='date'>" + moment(result.StartDate + " " + result.StartTime).format("h:mm A") + " - " + moment(result.StartDate + " " + result.EndTime).format("h:mm A") + "</li>");
					} else {
						html.append("<li class='date'>" + moment(result.StartDate + " " + result.StartTime).format("h:mm A") + "</li>");
					}
					html.append("<li class='directions' url='"+getDirectionsURL(galO)+"'><a>Get Directions</a></li>");
					html.append("<li class='phone' url='tel:" + galO.MainPhone + "'><a>" + galO.MainPhone + "</a></li>");
								
					$("#content").append(html);
					$("#event").listview().listview("refresh");
				}
			}
			// <<< IMM060213
			break;

		case "gallery":
			var result;
			$.each(data.galleries.entries, function(i,r) {
				if (this.ID == id) {
					result = this;
				}
			});
			var html = $('<ul id="gallery" data-inset="true" data-role="listview"></ul>');
			$("#header h1").text(result.Name);
			html
				.append("<li class='address' map='" + result.ID + "'>" + result.StreetAddress + "<br/>" + result.CityTown + ", " + result.State + " " + result.Zip + "</li>")
				.append("<li class='directions' url='"+getDirectionsURL(result)+"'><a>Get Directions</a></li>")
				.append("<li class='phone' url='tel:" + result.MainPhone + "'><a>" + result.MainPhone + "</a> </li>")
				.append("<li class='website' url='" + result.Website + "'><a>Gallery\'s Website</a></li>");
				
			if (result.events.length) {
				html.append(getRelatedEventsList(result.events));
			}
			if (result.artists.length) {
				html.append(getRelatedArtistsList(result.artists));
			}
			if (result.materials.length) {
				html.append(getRelatedMaterialsList(result.materials));
			}
			$("#content").append(html);
			$("#events,#gallery,#artists,#materials").listview().listview("refresh");
			break;
			
		case "artist":
			var result;
			$.each(data.artists.entries, function(i,r) {
				if (this.ID == id) {
					result = this;
				}
			});
			var html = $('<ul id="artist" data-inset="true" data-role="listview"></ul>');
			$("#header h1").text(result.FirstName + " " + result.LastName);
			if (result.materials.length) {
				html.append(getRelatedMaterialsList(result.materials));
			}
			html.append("<li class='website' url='" + result.Website + "'><a>Artist\'s Gallery Page</a></li>");
				
			html.append(getRelatedGalleriesList(result.galleries));
			
			$("#content").append(html);
			$("#artist,#galleries,#materials").listview().listview("refresh");
			break;
			
		case "material":
			var result;
			$.each(data.materials.entries, function(i,r) {
				if (this.ID == id) {
					result = this;
				}
			});
			var html = $('<ul id="material" data-inset="true" data-role="listview"></ul>');
			$("#header h1").text(result.Name);
			if (result.galleries.length) {
				html.append(getRelatedGalleriesList(result.galleries));
			}
			if (result.artists.length) {
				html.append(getRelatedArtistsList(result.artists));
			}
			$("#content").append(html);
			$("#material,#galleries,#artists").listview().listview("refresh");
			break;
			
		default:
			console.log("Invalid item type");
			break;
	}
}

// IMM060213 >>>
function getDirectionsURL(galO){
	return (galO ? "http://maps." + mapDomain + "/maps?saddr=&daddr=" + galO.StreetAddress.replace(" ","+") + ", " + galO.CityTown.replace(" ","+") + ", " + galO.State.replace(" ","+") + " " + galO.Zip : "");
}
// <<< IMM060213

function getRelatedEventsList(ids) {
	function showDateRange(result) {
		if (result.EndDate) {
			return moment(result.StartDate).format("LL") + " - " + moment(result.EndDate).format("LL"); 
		} else {
			return moment(result.StartDate).format("LL"); 
		}
	}

	var counter = 0;
	var mNow = moment();
	var html = '<li class="events"><div><h3>Shows</h3><ul id="events" data-inset="true">';
	$(ids).each(function(i,r) {
		var cur = r;
		$.each(data.events.entries, function(ix,re) {
			var mBeg = moment(re.StartDate + " " + re.StartTime);
			var mEnd = moment(re.EndDate + " " + re.EndTime);
			if (this.ID == cur && (this.Type == "Shows" || this.Type == "Show") && ((mBeg.diff(mNow) >= 0) || (mEnd.diff(mNow) >= 0))) {
				counter++;
				html += '<li sort="' + moment(re.StartDate).valueOf() + '" type="' + re.Type + '" event="' + re.ID + '">' + '<h3>' + re.Name + '</h3><p style="margin-top:6px;margin-bottom: 0;">' + showDateRange(this) + '</p></li>';
			}
		});
	});
	html += '</ul></div></li>';
	if (counter > 0) {
		return html;
	} else {
		return null;
	}
}

// IMM060213 >>>
function getGalleryByID(gid){
	var galID = -1;
	var gidx = 0;
	var galO = null;
	$.each(data.galleries.entries, function(ix,re){
		if (this.ID == gid){
			galID = gidx;
			return false;
		} else {
			gidx++;
		}
	});
	if (galID > -1){
		galO = data.galleries.entries[galID];
	}
	return galO;
}
// <<< IMM060213

function getRelatedGalleriesList(ids) {
	var counter = 0;
	var html = '<li class="galleries"><div><h3>Galleries</h3><ul id="galleries" data-inset="true">';
	$(ids).each(function(i,r) {
		var cur = r;
		$.each(data.galleries.entries, function(ix,re) {
			if (this.ID == cur) {
				counter++;
				html += "<li gallery='" + re.ID + "'>" + re.Name + "</li>";
			}
		});
	});
	html += '</ul></div></li>';
	if (counter > 0) {
		return html;
	} else {
		return null;
	}
}

function getRelatedArtistsList(ids) {
	var counter = 0;
	var html = '<li class="artists"><div><h3>Artists</h3><ul id="artists" data-inset="true">';
	$(ids).each(function(i,r) {
		var cur = r;
		$.each(data.artists.entries, function(ix,re) {
			if (this.ID == cur) {
				counter++;
				html += "<li artist='" + re.ID + "'>" + re.FirstName + " " + re.LastName + "</li>";
			}
		});
	});
	html += '</ul></div></li>';
	if (counter > 0) {
		return html;
	} else {
		return null;
	}
}

function getRelatedMaterialsList(ids) {
	var counter = 0;
	var html = '<li class="materials"><div><h3>Media</h3><ul id="materials" data-inset="true">';
	$(ids).each(function(i,r) {
		var cur = r;
		$.each(data.materials.entries, function(ix,re) {
			if (this.ID == cur) {
			counter++;
				html += "<li material='" + re.ID + "'>" + re.Name + "</li>";
			}
		});
	});
	html += '</ul></div></li>';
	if (counter > 0) {
		return html;
	} else {
		return null;
	}
}


function createMap(ids) {
	var map;
	var markersArray = [];
	
	function initialize() {
		$("#map").css("opacity","0");
		$.mobile.loading( "show", {	theme: "d" } );
		var mapOptions = {
			center: new google.maps.LatLng(0,0),
			zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles:[{
		        featureType:"poi",
		        elementType:"labels",
		        stylers:[{
		            visibility:"off"
		        }]
		    }]
		};
		map = new google.maps.Map(document.getElementById("map"), mapOptions);
		addMarkersToMap();
	}
		
	function addMarkersToMap() {
		google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
			$("#map").hide().css("opacity","1");
			var bounds = new google.maps.LatLngBounds();
			for (i in markersArray) {
				bounds.extend(new google.maps.LatLng(markersArray[i].position.lat(), markersArray[i].position.lng()));
			}
			map.fitBounds(bounds);
			google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
				for (i in markersArray) {
					markersArray[i].setMap(map);
					attachIWindow(markersArray[i].content, markersArray[i]);
				}
				map.setZoom(0);
				google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
					$.mobile.loading( "hide" );
					$("#map").fadeIn('slow');
					map.fitBounds(bounds);
					if (ids) {
						var zoom = map.getZoom();
						map.setZoom(zoom-4);
						//setTimeout(function(){infowindow.open(map, markersArray[0])},250);
					}
				});
			});
    	});
	}
	
	function attachIWindow(content, marker){
		infowindow = new google.maps.InfoWindow({
			content: content,
			maxWidth: 200
		});
		google.maps.event.addListener(marker, 'click', function(){
			infowindow.content = this.content;
			infowindow.open(map, marker);
		});
	}

	function addMarker(location, title) {
		var marker = new google.maps.Marker({
			position: location,
			map: map,
			content: title
		});
		markersArray.push(marker);
	}

	$.each(data.galleries.entries, function(i, r) {
		var content = "<div style='max-width: 200px; height: 90px;' id='mapinfo'><h3 style='font-size: 15px; width: 200px; white-space: nowrap; overflow: hidden; margin:0;line-height: 100%;text-overflow: ellipsis'>" + r.Name + "</h3><p style='font-size:13px; margin: 4px 0;'>" + r.StreetAddress + "<br/>" + r.CityTown + ", " + r.State + " " + r.Zip + "</p><p align='left' style='margin: 8px 0 0;'><a class='infobutton' gallery='" + r.ID + "'>View Details</a><a class='infobutton' style='float: right; margin-right: 0' url='"+getDirectionsURL(r)+"'>Get Directions</a></p></div>";
		if (ids) {
			if (ids.indexOf(r.ID) > -1) {
				addMarker(new google.maps.LatLng(r.Latitude, r.Longitude), content);
				$("#header h1").text(r.Name);
			}
		} else {
			addMarker(new google.maps.LatLng(r.Latitude, r.Longitude), content);
		}
	});
	
	$("#content").append("<div id='map' />");
	$("#map").height(window.innerHeight - $("#header").height() - $("#footer").height()).width($(window).width());
	initialize();
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

