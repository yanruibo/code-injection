






	$(document).bind("mobileinit",
	function() {
		$.mobile.page.prototype.options.addBackBtn = true;
		$.mobile.defaultPageTransition = "none";
		$.mobile.theme = 'c';
		
		$.mobile.touchOverflowEnabled = false;

		// Page
		$.mobile.page.prototype.options.headerTheme = "c"; // Page header only
		$.mobile.page.prototype.options.contentTheme = "c";
		$.mobile.page.prototype.options.footerTheme = "c";
		
		// Listviews
		$.mobile.listview.prototype.options.headerTheme = "d"; // Header for nested lists
		$.mobile.listview.prototype.options.theme = "d"; // List items / content
		$.mobile.listview.prototype.options.dividerTheme = "d"; // List divider

		$.mobile.listview.prototype.options.splitTheme = "a";
		$.mobile.listview.prototype.options.countTheme = "a";
		$.mobile.listview.prototype.options.filterTheme = "a";
		$.mobile.listview.prototype.options.filterPlaceholder = "Filter data...";
		
		$.mobile.changePage.defaults.allowSamePageTransition = true;
		
		if(window.localStorage.getItem("useInternet") == null){
			window.localStorage.setItem("useInternet", 1);
		}
	});










		
		$(document).bind("ready", function() {
			
			var currentLang = window.localStorage.getItem("currentLang");
			if(currentLang == null){
				window.localStorage.setItem("currentLang", 1);
				currentLang = 1;
			}
			
			$("#select-language").val(currentLang);
			
			$("#select-language").change( function(event, ui) {
				var selected = $(this).val();
				window.localStorage.setItem("currentLang", selected);
			});
			
			
			var useInternet = window.localStorage.getItem("useInternet");
			
			if(getInternetEnabled() == false){
				$("#switch-internet").val("off");
			}
			else{
				$("#switch-internet").val("on");
			}
		
			$( "#switch-internet" ).bind( "change", function(event, ui) {
				
				if($(this).val() == "on"){
					window.localStorage.setItem("useInternet", 1);
				}
				else{
					window.localStorage.setItem("useInternet", 0);
				}
			});
		});
		
		$("body").delegate("#update_app", "click", function(evt){
			/*if(checkConnection() == 'none'){
				var htmlPopup = '';
				htmlPopup += 'Please check your internet connection and try again later';
				$("#update_progress").html(htmlPopup);
			}
			else{*/
				_syncProgress = function(percent, msgKey, message){
					$("#update_progress").html(percent+" "+ msgKey+"%");
					if(msgKey == "100"){
						$("#home_links").empty();
						$(".ui-dialog").each(function() { $(this).dialog("close"); });
					}
			    };
		    	
	    		SYNCDATA.initTestDb(function(){
	    	    	DBSYNC.initSync(SYNCDATA.tableToSync, SYNCDATA.database, SYNCDATA.sync_info, SYNCDATA.url, function(firstSync){
	    	    		DBSYNC.syncNow(_syncProgress, function(syncResult){
	    	            });
	    	        });
	    	    });	
			/*}*/
	    });			
		

$('#pages').live('pageshow', function() {
	showPage();
});

document.addEventListener("backbutton", function(e){
    if($.mobile.activePage.is('#home')){
        e.preventDefault();
        navigator.app.exitApp();
    }
    else {
        navigator.app.backHistory();
    }
}, false);

$(document).live('pagebeforechange', function(event, data){
	var pageSelector = location.hash.replace(/\?.*$/, "");
	$page = $(pageSelector);
	
	if ($('.ps-carousel').length) {
	    $('body').removeClass('ps-active');
	    
	    $('ul.gallery').each(function(){
	        var photoSwipe = window.Code.PhotoSwipe;
	        var photoSwipeInstance = photoSwipe.getInstance('products');
	        if (typeof photoSwipeInstance != "undefined" && photoSwipeInstance != null) {
	        	photoSwipe.unsetActivateInstance(photoSwipeInstance);
	        	photoSwipe.detatch(photoSwipeInstance);
	        }
	    });
	}
	
	if(pageSelector == "#pages"){
		$content = $page.find(".iscroll-content");
		$content.empty();
	}
});

$('#home').live('pageshow', function() {
	
	var currentLang = getCurrentLang();
	
	$("#home_links").empty();
	SYNCDATA.initTestDb(function(){
		DBSYNC.initSync(SYNCDATA.tableToSync, SYNCDATA.database, SYNCDATA.sync_info, SYNCDATA.url, function(firstSync){
			DBSYNC._selectSql('SELECT * FROM menu_items AS mi ' +
				'INNER JOIN link_settings AS ls ON mi.link_id=ls.id ' +
				'INNER JOIN links AS l ON (ls.id=l.link_index AND l.language_id='+currentLang+')',
				null, function(results) {
					var len = results.length, i;
					if(len>0){
						$("#ajax_loader").hide();
						for (i = 0; i < len; i++){
							listChildren(results[i].link_index);						
					    }
					}
					else{
						SYNCDATA.initTestDb(function(){
					    	DBSYNC.initSync(SYNCDATA.tableToSync, SYNCDATA.database, SYNCDATA.sync_info, SYNCDATA.url, function(firstSync){
					    		DBSYNC.insertPreloaded(function(percent, msgKey, message){
					    			if(msgKey == "100"){
					    				getLinks();
					    			}
					    		}, function(syncResult){
					            });
					        });
					    });	
					}
				});
        });
    });
	
	function getLinks(){
		DBSYNC._selectSql('SELECT * FROM menu_items AS mi ' +
			'INNER JOIN link_settings AS ls ON mi.link_id=ls.id ' +
			'INNER JOIN links AS l ON (ls.id=l.link_index AND l.language_id='+currentLang+')',
			null, function(results) {
				var len = results.length, i;
				if(len>0){
					$("#ajax_loader").hide();
					for (i = 0; i < len; i++){
						listChildren(results[i].link_index);						
				    }
				}
			}
		);
	}
	
	function listChildren(linkIndex){
		var img='m1';
		
		DBSYNC._selectSql('SELECT * FROM link_settings AS ls ' +
				'INNER JOIN links AS l ON ls.id=l.link_index ' + 
				'WHERE ls.id='+linkIndex+' AND l.language_id='+currentLang+' ORDER BY l.name ASC', null, function(res) {
			switch(linkIndex){
				case 9:
					img = 'm11';
					break;
				case 20:
					img = 'm2';
					break;
				case 21:
					img = 'm1';
					break;
				case 22:
					img = 'm3';
					break;
				case 27:
					img = 'm4';
					break;
				case 37:
					img = 'm5';
					break;
				case 64:
					img = 'm7';
					break;
				case 88:
					img = 'm8';
					break;
				case 106:
					img = 'm6';
					break;
				case 120:
					img = 'm12';
					break;
				case 131:
					img = 'm10';
					break;
				case 135:
					img = 'm9';
					break;
			}
			$("#home_links").append('<li><a href="#pages?page='+res[0].link_index+'"><img src="images/'+img+'.jpg" width="48" height="48" /><span>'+res[0].name+'</span></a></li>');
		});
	}
});

$('#maps').live('pageshow', function() {
	
	$page = $.mobile.activePage;
	$content = $page.children(":jqmData(role=content)");
	
	var markup = '';
	
	var msg = checkGoogleMapsAvailability();
	
	if(msg == ''){
		
		$(window).resize(function() {
			var newWidth = window.innerWidth - 30;
			$("#map_canvas").css({width:newWidth});
			$("#map_canvas").gmap("refresh");
		}); 
		
		$('#map_canvas').gmap({'disableDefaultUI':true, 'zoomControl':true, 'mapTypeId': google.maps.MapTypeId.HYBRID, 'center': '43.357107,16.951901', 'zoom': 13, 'minZoom': 13, 'maxZoom': 16}).bind('init', function(evt, map) {
			$('#map_canvas').gmap('addControl', 'tags-control', google.maps.ControlPosition.TOP_LEFT);
		});
		
		var currentLang = getCurrentLang();
		
		var image = 'images/marker.png';
		
		var categories = [];
		var marker = [];
		
		var currentTag = $('#tags').val();
		
		$('#tags').empty();
		$('#tags').append('<option value="all"></option>');
		
		DBSYNC._selectSql('SELECT * FROM gmap_categories AS gc ' +
			'INNER JOIN link_settings AS ls ON gc.link_id=ls.id ' +
			'INNER JOIN links AS l ON ls.id=l.link_index ' +
			'WHERE l.language_id='+currentLang,
			null, function(results) {
				var len = results.length, i;
			
			   for (i = 0; i < len; i++){
				   parentIndex = results[i].link_index;
					appendTags(parentIndex, ""+i);
					
					if(i == currentTag){
						$('#tags').append('<option value="'+i+'" selected="selected">'+results[i].name+'</option>');
					}
					else{
						$('#tags').append('<option value="'+i+'">'+results[i].name+'</option>');	
					}
					
					$('#tags').selectmenu('refresh', true);
			    }
			});
		
		var appendTags = function(linkIndex, category) {
			DBSYNC._selectSql('SELECT * FROM link_settings AS ls ' +
			'INNER JOIN links AS l ON ls.id=l.link_index ' +
			'WHERE ls.parent_id=' + linkIndex + ' AND l.language_id='+currentLang,
			null, function(results) {
				var len = results.length, i;
				for (i = 0; i < len; i++){
					if(results[i].gmap_address == ''){
						continue;
					}
					else{
						var parts = results[i].gmap_address.split(',');
						if(parts.length < 2){
							continue;
						}
					}
					
					categories[0] = category;
					
					marker['icon'] = image;
					marker['tags'] = category;
					marker['bound'] = true;
					
					if(currentTag == category){
						marker['visible'] = true;
					}
					else{
						marker['visible'] = false;
					}
					
					marker['position'] = results[i].gmap_address;
					marker['html'] = "<strong>"+results[i].name+"</strong><br />" + "<br />" +results[i].gmap_html;
					
					$(function(){
						var html = marker.html;
						$('#map_canvas').gmap('addMarker', marker ).click(function() {
							$('#map_canvas').gmap('openInfoWindow', { 'content': html }, this);
						});
					});
				}
			});
		};
		
		$("#tags").change(function() {
			$('#map_canvas').gmap('closeInfoWindow');
			$('#map_canvas').gmap('set', 'bounds', null);
			if ( $(this).val() == 'all' ) {
				$.each($('#map_canvas').gmap('get', 'markers'), function(i, marker) {
					marker.setVisible(false); 
				});
			} else {
				$('#map_canvas').gmap('find', 'markers', { 'property': 'tags', 'value': $(this).val() }, function(marker, found) {
					if (found) {
						$('#map_canvas').gmap('addBounds', marker.position);
					}
					marker.setVisible(found); 
				});
			}
		});
		
		if($("#tags").val != 'all'){
			$("#tags").change();
		}
		
	}
	else{
		markup += '<div class="ui-state-error" style="margin:0 auto; width:300px; margin-top:20px; ">'+msg+'</div>';
		
		$content.html(markup);
		$page.trigger("create");
	}
});

$('#weather').live('pageshow', function() {
	
	var useInternet = getInternetEnabled();
	
	var markup = '';
	
	$page = $.mobile.activePage;
	$content = $page.children(":jqmData(role=content)");
	
	if(useInternet){
		jQuery.ajax({
	        url: DBSYNC.serverUrl+'weather',
	        type: 'POST',
	        dataType: 'jsonp',
	        beforeSend: function(x) {
	            if (x && x.overrideMimeType) {
	                x.overrideMimeType('application/j-son;charset=UTF-8');
	            }
	        },
			complete: function(serverAnswer) {
				
			},
	        success: function(serverAnswer) {
	        	
	        	markup += '<div class="pic"><img src="images/pic.jpg" width="320" height="203"></div>';
        		markup += '<div class="weather"> <span class="s1">Baška Voda</span> <span class="s2"><img src="'+serverAnswer.image+'" width="78" height="78"><span>'+serverAnswer.temp+'</span></span>';
					markup += '<table width="200" border="0" cellspacing="0" cellpadding="5">';
						markup += '<tr>';
							markup += '<td width="61%">Vlaznost</td>';
							markup += '<td width="39%">'+serverAnswer.humidity+'</td>';
						markup += '</tr>';
						markup += '<tr>';
							markup += '<td>Tlak zraka</td>';
							markup += '<td>'+serverAnswer.pressure+'</td>';
						markup += '</tr>';
						markup += '<tr>';
							markup += '<td>Vidljivost</td>';
							markup += '<td>'+serverAnswer.visibility+'</td>';
						markup += '</tr>';
						markup += '<tr>';
							markup += '<td>Brzina vjetra</td>';
							markup += '<td>'+serverAnswer.wind_speed+'</td>';
						markup += '</tr>';
					markup += '</table>';
				markup += '</div><br /><br />';
	        	
	        	$content.html(markup);
	        	$page.trigger("create");
	        	
	        },
			error: function(serverAnswer) {
				serverAnswer.result = 'ERROR';
			}
	    });
	}
	else{
		markup += '<div class="ui-state-error" style="margin:0 auto; width:300px; margin-top:20px; ">In order to view weather please enable internet in settings.</div>';
		
		$content.html(markup);
    	$page.trigger("create");
	}
});

// jqm.page.params.js - version 0.1
// Copyright (c) 2011, Kin Blas
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the <organization> nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

(function( $, window, undefined ) {

// Given a query string, convert all the name/value pairs
// into a property/value object. If a name appears more than
// once in a query string, the value is automatically turned
// into an array.
function queryStringToObject( qstr )
{
	var result = {},
		nvPairs = ( ( qstr || "" ).replace( /^\?/, "" ).split( /&/ ) ),
		i, pair, n, v;

	for ( i = 0; i < nvPairs.length; i++ ) {
		var pstr = nvPairs[ i ];
		if ( pstr ) {
			pair = pstr.split( /=/ );
			n = pair[ 0 ];
			v = pair[ 1 ];
			if ( result[ n ] === undefined ) {
				result[ n ] = v;
			} else {
				if ( typeof result[ n ] !== "object" ) {
					result[ n ] = [ result[ n ] ];
				}
				result[ n ].push( v );
			}
		}
	}

	return result;
}

// The idea here is to listen for any pagebeforechange notifications from
// jQuery Mobile, and then muck with the toPage and options so that query
// params can be passed to embedded/internal pages. So for example, if a
// changePage() request for a URL like:
//
//    http://mycompany.com/myapp/#page-1?foo=1&bar=2
//
// is made, the page that will actually get shown is:
//
//    http://mycompany.com/myapp/#page-1
//
// The browser's location will still be updated to show the original URL.
// The query params for the embedded page are also added as a property/value
// object on the options object. You can access it from your page notifications
// via data.options.pageData.
$( document ).bind( "pagebeforechange", function( e, data ) {

	// We only want to handle the case where we are being asked
	// to go to a page by URL, and only if that URL is referring
	// to an internal page by id.

	if ( typeof data.toPage === "string" ) {
		var u = $.mobile.path.parseUrl( data.toPage );
		if ( $.mobile.path.isEmbeddedPage( u ) ) {
			

			// The request is for an internal page, if the hash
			// contains query (search) params, strip them off the
			// toPage URL and then set options.dataUrl appropriately
			// so the location.hash shows the originally requested URL
			// that hash the query params in the hash.

			var u2 = $.mobile.path.parseUrl( u.hash.replace( /^#/, "" ) );
			if ( u2.search ) {
				if ( !data.options.dataUrl ) {
					data.options.dataUrl = data.toPage;
				}
				data.options.pageData = queryStringToObject( u2.search );
				data.toPage = u.hrefNoHash + "#" + u2.pathname;
			}
		}
	}
});

})( jQuery, window );

function getCurrentLang(){
	var currentLang = window.localStorage.getItem("currentLang");
	if(currentLang == null){
		window.localStorage.setItem("currentLang", 1);
		currentLang = 1;
	}
	
	return currentLang;
}

function getInternetEnabled(){
	if(window.localStorage.getItem("useInternet") == 1){
		return true;
	}
	else{
		return false;
	}
}

function getInternetAvailable(){
	if(navigator.network != undefined){
		if(navigator.network.connection.type == Connection.NONE){
			return false;
		}
		else{
			return true;
		}
	}
	else{
		return true;
	}
}

var googleMapsState = "";

document.addEventListener("deviceready", setup, false);

//setup();

function setup() {
    loadGoogleMaps();
 
    document.addEventListener("online", function(e) {
        if (googleMapsState == "" || googleMapsState == "error") {
            loadGoogleMaps();
        }
    }, false);
}

function loadGoogleMaps() {
    googleMapsState = "loading";
 
    var script = document.createElement("script");
    script.src = "http://maps.google.com/maps/api/js?v=3.7&sensor=true&callback=googleMapsReady";
    script.type = "text/javascript";
 
    script.addEventListener("error", function(e) {
        googleMapsState = "error";
    }, false);
 
    script.addEventListener("load", function(e) {
        setTimeout(function() {
            if (googleMapsState == "loading") googleMapsState = "error";
        }, 5000);
    }, false);
 
    document.getElementsByTagName("head")[0].appendChild(script);
}

function googleMapsReady() {
    googleMapsState = "ready";
}

function checkGoogleMapsAvailability() {
	if(getInternetEnabled() == true && getInternetAvailable() == true){
		
		if (googleMapsState == "" || googleMapsState == "error") {
	        return "Maps are not currently available";
	    }
	 
	    if (googleMapsState == "loading") {
	        return "Maps are loading, try again aoon";
	    }
    }
	else{
		return "Internet not enabled or no network connection available.";
	}
 
    return "";
}

String.repeat = function(string, num){ return new Array(parseInt(num) + 1).join(string); };

function showPage() {
		var pageIndex = location.hash.replace(/.*page=/, ""), pageSelector = location.hash.replace(/\?.*$/, "");
		var layout_index, parent_layout;
		
		var currentLang = getCurrentLang();
		var useInternet = getInternetEnabled();
		
		var preferedLang = currentLang;
		
		var $page = $(pageSelector),
		$content = $page.children(":jqmData(role=content)");
		
		var myNavBar = '<ul>';
		
		/**
		 * Dinamicko generiranje footer-a. Ovo je potrebno da bi se moglo postaviti da je link aktivan ukoliko se nalazimo na stranici
		 * koja je generirana dinamicki a ima isti hash pages (#pages?id=56 -> hash=pages). 
		 * To su stranice "services" i "tourist board", dok ostale stranice koje se nalaze u footeru imaju hash 
		 * "maps", "settings", "weather" pa kod njih nema problema sa otkrivanjem da su one aktivne.
		 * 
		 * Ukoliko treba koristiti custom ikone, prouciti jquery mobile dokumentaciju i ubaciti te ikone.
		 */
		if(pageIndex == 113){
			myNavBar += '<li><a href="#pages?page=113" data-icon="f1" data-icon="grid" class="ui-btn-active ui-state-persist">TZ</a></li>';
		}
		else{
			myNavBar += '<li><a href="#pages?page=113" data-icon="f1" data-icon="grid">TZ</a></li>';
		}
		
		if(pageIndex == 67){
			myNavBar += '<li><a href="#pages?page=67" data-icon="f2" data-icon="star" class="ui-btn-active ui-state-persist">services</a></li>';
		}
		else{
			myNavBar += '<li><a href="#pages?page=67" data-icon="f2" data-icon="star">services</a></li>';
		}
		
			myNavBar += '<li><a href="#weather" data-icon="f3" data-icon="gear">weather</a></li>';
			myNavBar += '<li><a href="#maps" data-icon="f4" data-icon="gear">map</a></li>';
			myNavBar += '<li><a href="#settings" data-icon="f5" data-icon="gear">settings</a></li>';
		myNavBar += '</ul>';
			
		$('#navbar_container').html('<div data-role="navbar">' + myNavBar + '</div>').trigger('create');
		
		/**
		 * Query koji izvlaci.
		 */
		DBSYNC._selectSql('SELECT ls.*, l.*, lp.images AS parent_images, lhr.name AS name_hr FROM link_settings AS ls ' +
				'INNER JOIN links AS l ON ls.id=l.link_index ' + 
				'INNER JOIN links AS lhr ON (ls.id=lhr.link_index AND lhr.language_id=1) ' + 
				'LEFT JOIN link_settings AS lp ON (ls.parent_id=lp.id) ' + 
				'WHERE ls.id='+pageIndex+' AND l.language_id='+currentLang+' LIMIT 1', null, function(res) {
			
				var len = res.length;
				
				if(len>0) {
					thinksToDoPage = res[0].name;
					thinksToDoPageHr = res[0].name_hr;
					
					layout_index = res[0].layout_index;
					parent_layout = res[0].parent_layout;
					
					var no_image = 'images/pic.jpg';
					
					var images = [];
					var i = 0;
					
					if(res[0].images != '' && res[0].images != null && res[0].images != 'undefined'){
						images = res[0].images.split(',');
						for (i in images) { images[i]=images[i]+imgsuffix; }
					}
					else if(res[0].parent_images != '' && res[0].parent_images != null && res[0].parent_images != 'undefined'){
						images = res[0].parent_images.split(',');
						for (i in images) { images[i]=images[i]+imgsuffix; }
					}
					else{
						images.push(no_image);
					}
					
					var single_image = images[0];
					
					if(layout_index == "10" || layout_index == "6"){
						
						/*if(layout_index == "10"){
							preferedLang = 1;
						}*/
						
						DBSYNC._selectSql('SELECT ls.*, l.*, lp.images AS parent_images, lhr.name AS name_hr FROM link_settings AS ls ' +
								'INNER JOIN links AS l ON ls.id=l.link_index ' + 
								'INNER JOIN links AS lhr ON (ls.id=lhr.link_index AND lhr.language_id=1) ' + 
								'LEFT JOIN link_settings AS lp ON (ls.parent_id=lp.id) ' + 
								'WHERE ls.parent_id='+pageIndex+' AND l.language_id='+preferedLang+' ORDER BY l.name ASC', null, function(res) {
							
								var markup = '<div class="list">';
								
								var len = res.length, i;
								
								for (i = 0; i < len; i++){
									
									var images;
									var image;
									
									if(res[i].images != '' && res[i].images != null && res[i].images != 'undefined'){
										images = res[i].images.split(',');
										image = images[0]+'&w=100&h=67&zc=1&aoe=1&q=90';
									}
									else if(res[i].parent_images != '' && res[i].parent_images != null && res[i].parent_images != 'undefined'){
										images = res[i].parent_images.split(',');
										image = images[0]+'&w=100&h=67&zc=1&aoe=1&q=90';
									}
									else{
										image = no_image;
									}
									
									markup += '<a href="#pages?page='+res[i].link_index+'"><div class="list_item">';
									
									if(useInternet){
										markup += '<img class="li_pic" src="'+image+'" width="100" height="67" />';
									}
									
									markup += '<span>'+res[i].name+'</span></div></a>';
								}
								
								markup += '</div>';
								
								$content.html(markup);
								$page.page();
								
								

							});
					}	
					else if(layout_index == "3"){
						var markup = '';
						
						if(getInternetEnabled() && getInternetAvailable()){
							if(res[0].images != ''){
								var images = res[0].images.split(',');
								
								var i = 0;
								
								markup += '<ul id="Gallery" class="gallery" style="display:none; ">';
								
								for(i in images){
									markup += '<li><a href="'+images[i]+'&w=320&h=450&zc=1&aoe=1"><img src="'+images[i]+'&w=320&h=480&zc=1&aoe=1" alt="" /></a></li>';
								}
								markup += '</ul>';
							}
							
							$content.html(markup);
							
							$page.trigger("create");
							
							(function(window, $, PhotoSwipe){
									
								var options = { 
										preventHide: true,
										getImageCaption: function(el){
											captionImg = document.createElement('img');
											captionImg.setAttribute('src', 'images/logo.png');
											captionImg.setAttribute('width', '110');
											captionImg.setAttribute('height', '70');
											captionImg.setAttribute('alt', 'Home');
											captionLink = document.createElement('a');
											captionLink.setAttribute('href', '#home');
											captionLink.appendChild(captionImg);
											captionEl = document.createElement('div'); 
											captionEl.appendChild(captionLink);
											return captionEl;
										}
									}, 
									instance = PhotoSwipe.attach( window.document.querySelectorAll('#Gallery a'), options, ('products') );
								
								instance.show(0);

							}(window, window.jQuery, window.Code.PhotoSwipe));
						}
						else{
							markup += '<div class="ui-state-error" style="margin:0 auto; width:300px; margin-top:20px; ">In order to view gallery please enable internet in settings.</div>';
							
							$content.html(markup);
							
							$page.trigger("create");
							
							
						}
					}
					else if(layout_index == "8" || layout_index == "9") {
						
						var gmap_index = res[0].link_index;
						
						DBSYNC._selectSql('SELECT ls.*, l.*, lp.images AS parent_images, lhr.name AS name_hr FROM link_settings AS ls ' +
								'INNER JOIN links AS l ON ls.id=l.link_index ' + 
								'INNER JOIN links AS lhr ON (ls.id=lhr.link_index AND lhr.language_id=1) ' + 
								'LEFT JOIN link_settings AS lp ON (ls.parent_id=lp.id) ' + 
								'WHERE ls.parent_id='+gmap_index+' AND l.language_id='+preferedLang+' ORDER BY l.name ASC', null, function(res) {
							
							var settings = '';
						
							var markup = '';
							
							var msg = checkGoogleMapsAvailability();
							
							if(msg == ''){
								markup += '<div class="blue">';
									markup += '<div data-role="controlgroup" data-type="horizontal">';
										markup += '<a href="#" id="show_map" data-role="button" data-theme="t">Map</a>';
										markup += '<a href="#" id="show_list" data-role="button" data-theme="t">List</a>';
									markup += '</div>';
								markup += '</div>';
							}
								
								markup += '<div id="tab-parent">';
								
									markup += '<div id="a-tab-panel">';
									
									if(msg == ''){
										markup += '<div class="gmap" style="width:100%; ">';
										markup += '<div id="hotels_map" style="min-height:500px; height:auto; margin-left:20px; "></div>';
										markup += '</div>';
									}
									
									markup += '</div>';
									
									if(msg == ''){
										markup += '<div id="b-tab-panel" style="display:none; ">';
									}
									else{
										markup += '<div id="b-tab-panel">';
									}
									
										markup += '<div class="list">';
										
										var len = res.length, i;
										
										for (i = 0; i < len; i++){
											
											settings = jQuery.parseJSON(res[i].settings);
											
											var images;
											var image;
											
											if(res[i].images != '' && res[i].images != null && res[i].images != 'undefined'){
												images = res[i].images.split(',');
												image = images[0]+'&w=100&h=67&zc=1&aoe=1&q=90';
											}
											else{
												image = no_image;
											}
											
											markup += '<a href="#pages?page='+res[i].link_index+'">';
											
												markup += '<div class="list_item">';
												
												if(useInternet){
													markup += '<img class="li_pic" src="'+image+'" width="100" height="67">';
												}
												
												markup += '<span>'+res[i].name+'<br>';
												
												if(layout_index == 8){
													markup += String.repeat('<img src="images/star.png" width="17" height="16">', settings.classification);
												}
												
												markup += '</span>';
												markup += '</div>';
											
											markup += '</a>';
										}
										
										markup += '</div>';
										
									markup += '</div>';
									
								markup += '</div><br /><br />';
								
							markup += '<script type="text/javascript">';
							
							if(msg == ''){
								
								markup += 'var newWidth = window.innerWidth - 60;';
								markup += '$("#hotels_map").css({width:newWidth});';
								markup += '$("#tab-parent").css("height", $("#a-tab-panel").height());';
								
								markup += '$("#show_map").click(function() {';
									markup += '$("#a-tab-panel").show();';
									markup += '$("#b-tab-panel").hide();';
									markup += '$("#tab-parent").css("height", $("#a-tab-panel").height());';
									markup += 'return false;';
								markup += '});';
								
								markup += '$("#show_list").click(function() {';
								markup += '$("#a-tab-panel").hide();';
								markup += '$("#b-tab-panel").show();';
									markup += '$("#tab-parent").css("height", $("#b-tab-panel").height());';
									markup += 'return false;';
								markup += '});';
							}
							else{
								markup += '$("#b-tab-panel").css("position", "relative");';
								markup += '$("#a-tab-panel").css("position", "absolute");';
								markup += '$("#b-tab-panel").css("left", "0px");';
							}
									
							markup += '</script>';
							
							$(window).resize(function() {
								var newWidth = window.innerWidth - 60;
								$("#hotels_map").css({width:newWidth});
								
								if(msg == ''){
									$("#hotels_map").gmap("refresh");
								}
							}); 
							
							$content.html(markup);
							
							if(msg == ''){
								$('#hotels_map').gmap({'disableDefaultUI':true, 'zoomControl':true, 'mapTypeId': google.maps.MapTypeId.HYBRID, 'center': '43.357107,16.951901', 'zoom': 13, 'minZoom': 13, 'maxZoom': 16}).bind('init', function(evt, map) {
									
									var image = 'images/marker.png';
									
									var marker = [];
									
									appendTags(gmap_index);
									
									function appendTags(linkIndex) {
										DBSYNC._selectSql('SELECT * FROM link_settings AS ls ' +
										'INNER JOIN links AS l ON ls.id=l.link_index ' +
										'WHERE ls.parent_id=' + linkIndex + ' AND ls.gmap_address!="" AND l.language_id='+currentLang,
										null, function(results) {
											var len = results.length, i;
											
											for (i = 0; i < len; i++){
												if(results[i].gmap_address == ''){
													continue;
												}
												else{
													var parts = results[i].gmap_address.split(',');
													if(parts.length < 2){
														continue;
													}
												}
												
												marker['icon'] = image;
												marker['bound'] = true;
												marker['visible'] = true;
												marker['position'] = results[i].gmap_address;
												marker['html'] = "<strong>"+results[i].name+"</strong><br />" + "<br />" +results[i].gmap_html;
												
												$(function(){
													var html = marker.html;
													$('#hotels_map').gmap('addMarker', marker ).click(function() {
														$('#hotels_map').gmap('openInfoWindow', { 'content': html }, this);
													});
													$('#hotels_map').gmap('addBounds', marker.position);
												});
											}
										});
									}
								});
							}
							else{
								
							}
							
							$page.trigger("create");
						});
					}
					else if(layout_index == 102){
						var articleTitle = '';
						if(preferedLang == 1){
							articleTitle = thinksToDoPageHr;
						}
						
						var linkres = res[0];
						var kontakt = jQuery.parseJSON(linkres.kontakt);
						var opis = linkres.description;
						var settings = jQuery.parseJSON(linkres.settings);
						var pikto = settings.pikto;
						
						var groups = settings.capacity_groups;
						
						piktogramiStr = '<div class="ics">';
						
							piktogramiStr += '<div class="ic">';
							piktogramiStr += '<img width="25" height="25" ';
							piktogramiStr += 'src="images/distance_center_yes.png">';
							piktogramiStr += '<br>'+pikto.distance_center;
							piktogramiStr += '</div>';
							
							piktogramiStr += '<div class="ic">';
							piktogramiStr += '<img width="25" height="25" ';
							piktogramiStr += 'src="images/distance_beach_yes.png">';
							piktogramiStr += '<br>'+pikto.distance_beach;
							piktogramiStr += '</div>';
							
							piktogramiStr += '<div class="ic">';
							piktogramiStr += '<img width="25" height="25" ';
							piktogramiStr += 'src="images/distance_market_yes.png">';
							piktogramiStr += '<br>'+pikto.distance_market;
							piktogramiStr += '</div>';
							
							piktogramiStr += '<div class="ic">';
							piktogramiStr += '<img width="25" height="25" ';
							if(pikto.parking_space == 1){ piktogramiStr += 'src="images/parking_space_yes.png">'; }
							else{ piktogramiStr += 'src="images/parking_space_no.png">'; }
							piktogramiStr += '<br>&nbsp;';
							piktogramiStr += '</div>';
							
							piktogramiStr += '<div class="ic">';
							piktogramiStr += '<img width="25" height="25" ';
							if(pikto.internet == 1){ piktogramiStr += 'src="images/internet_yes.png">'; }
							else{ piktogramiStr += 'src="images/internet_no.png">'; }
							piktogramiStr += '<br>&nbsp;';
							piktogramiStr += '</div>';
							
							piktogramiStr += '<div class="ic">';
							piktogramiStr += '<img width="25" height="25" ';
							if(pikto.barbecue == 1){ piktogramiStr += 'src="images/barbecue_yes.png">'; }
							else{ piktogramiStr += 'src="images/barbecue_no.png">'; }
							piktogramiStr += '<br>&nbsp;';
							piktogramiStr += '</div>';
							
						piktogramiStr += '</div>';
						
						var apartmaniStr = '';
						
						
						
						apartmaniStr += '<div class="podaci">';
							apartmaniStr += '<table width="100%" border="0" cellspacing="0" cellpadding="3">';
							
							for(var i in groups){
								
								apartmaniStr += '<tr>';
									apartmaniStr += '<td width="50%" align="right">App '+groups[i].classification+'</td>';
									apartmaniStr += '<td width="50%" align="left">'+String.repeat('<img src="images/person.png" width="19" height="17" />', groups[i].persons)+'</td>';
								apartmaniStr += '</tr>';
							}
							
							apartmaniStr += '</table>';
						apartmaniStr += '</div>';
						
						var markup = '';
						
						if(useInternet){
							markup += '<div class="obj_gal">';
								markup += '<ul class="gal">';
									markup += '<li><img class="wide" src="'+single_image+'"  /> </li>';
								markup += '</ul>';
							markup += '</div>';
						}
						
						markup += '<div class="title">'+articleTitle+'</div>';
						
						var kontaktStr = '<div class="podaci">';
						
						if(kontakt.address != ''){
							kontaktStr += '<span class="o_data o1">'+kontakt.address+'</span>';
						}
						if(kontakt.phone != ''){
							kontaktStr += '<span class="o_data o2">'+kontakt.phone+'</span>';
						}
						if(kontakt.email != ''){
							kontaktStr += '<span class="o_data o3">'+kontakt.email+'</span>';
						}
						if(kontakt.webpage != ''){
							kontaktStr += '<span class="o_data o4">'+kontakt.webpage+'</span>';
						}
						
						kontaktStr += '</div>';
						
						markup += apartmaniStr;
						
						markup += kontaktStr;
						
						markup += piktogramiStr;
						
						
						markup += '<div class="podaci_txt">';
						markup += opis;
						markup += '</div><br /><br />';
						
						$content.html(markup);
						$page.page();
						
						
				
					}
					else if(layout_index == 105){
						var articleTitle = thinksToDoPage;
						if(preferedLang == 1){
							articleTitle = thinksToDoPageHr;
						}
						
						var linkres = res[0];
						var kontakt = jQuery.parseJSON(linkres.kontakt);
						var opis = linkres.description;
						var settings = jQuery.parseJSON(linkres.settings);
						var pikto = settings.pikto;
						
						piktogramiStr = '<div class="ics">';
						
							piktogramiStr += '<div class="ic">';
							piktogramiStr += '<img width="25" height="25" ';
							piktogramiStr += 'src="images/distance_center_yes.png">';
							piktogramiStr += '<br>'+pikto.distance_center;
							piktogramiStr += '</div>';
							
							piktogramiStr += '<div class="ic">';
							piktogramiStr += '<img width="25" height="25" ';
							piktogramiStr += 'src="images/distance_beach_yes.png">';
							piktogramiStr += '<br>'+pikto.distance_beach;
							piktogramiStr += '</div>';
							
							piktogramiStr += '<div class="ic">';
							piktogramiStr += '<img width="25" height="25" ';
							piktogramiStr += 'src="images/distance_market_yes.png">';
							piktogramiStr += '<br>'+pikto.distance_market;
							piktogramiStr += '</div>';
							
							piktogramiStr += '<div class="ic">';
							piktogramiStr += '<img width="25" height="25" ';
							if(pikto.parking_space == 1){ piktogramiStr += 'src="images/parking_space_yes.png">'; }
							else{ piktogramiStr += 'src="images/parking_space_no.png">'; }
							piktogramiStr += '<br>&nbsp;';
							piktogramiStr += '</div>';
							
							piktogramiStr += '<div class="ic">';
							piktogramiStr += '<img width="25" height="25" ';
							if(pikto.internet == 1){ piktogramiStr += 'src="images/internet_yes.png">'; }
							else{ piktogramiStr += 'src="images/internet_no.png">'; }
							piktogramiStr += '<br>&nbsp;';
							piktogramiStr += '</div>';
							
							piktogramiStr += '<div class="ic">';
							piktogramiStr += '<img width="25" height="25" ';
							if(pikto.barbecue == 1){ piktogramiStr += 'src="images/barbecue_yes.png">'; }
							else{ piktogramiStr += 'src="images/barbecue_no.png">'; }
							piktogramiStr += '<br>&nbsp;';
							piktogramiStr += '</div>';
							
						piktogramiStr += '</div>';
						
						var markup = '';
						
						if(useInternet){
							markup += '<div class="obj_gal">';
								markup += '<ul class="gal">';
									markup += '<li><img class="wide" src="'+single_image+'"  /> </li>';
								markup += '</ul>';
							markup += '</div>';
						}
						
						markup += '<div class="title">'+articleTitle;
						
						markup += String.repeat('<img src="images/star.png" width="17" height="16" />', settings.classification);
						
						markup += '</div>';
						
						var kontaktStr = '<div class="podaci">';
						
						if(kontakt.address != ''){
							kontaktStr += '<span class="o_data o1">'+kontakt.address+'</span>';
						}
						if(kontakt.phone != ''){
							kontaktStr += '<span class="o_data o2">'+kontakt.phone+'</span>';
						}
						if(kontakt.email != ''){
							kontaktStr += '<span class="o_data o3">'+kontakt.email+'</span>';
						}
						if(kontakt.webpage != ''){
							kontaktStr += '<span class="o_data o4">'+kontakt.webpage+'</span>';
						}
						
						kontaktStr += '</div>';
						
						markup += kontaktStr;
						
						markup += piktogramiStr;
						
						
						markup += '<div class="podaci_txt">';
						markup += opis;
						markup += '</div>';
						
						$content.html(markup);
						$page.page();
						
						
					}
					else{
						if(parent_layout == "6"){
							preferedLang = 1;
						}
						var articleTitle = thinksToDoPage;
						if(preferedLang == 1){
							articleTitle = thinksToDoPageHr;
						}
						DBSYNC._selectSql('SELECT * FROM content AS c ' +
							'INNER JOIN links AS l ON c.link_id=l.id ' +
							'INNER JOIN link_settings AS ls ON l.link_index=ls.id ' +
							'WHERE ls.id='+pageIndex+' AND l.language_id='+preferedLang, null, function(res) {
							
							var markup = '';
							
							if(useInternet){
								markup += '<div class="obj_gal">';
									markup += '<ul class="gal">';
										markup += '<li><img class="wide" src="'+single_image+'"  /> </li>';
									markup += '</ul>';
								markup += '</div>';
							}
							
							markup += '<div class="title">'+articleTitle+'</div>';
							markup += '<div class="podaci_txt">';
								var len = res.length, i;
								
								for (i = 0; i < len; i++){
									markup += res[i].text;
								}
							markup += '</div><br /><br />';
							
							$content.html(markup);
							$page.page();
							
							
						});
					}				
				}
		});

	}
