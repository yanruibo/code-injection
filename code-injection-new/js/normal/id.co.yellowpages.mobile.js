

		















var Config = function(successCallback, errorCallback) {
    
    this.getUrl = function(key, callback) {
        return this.urls[key];
        callLater(callback, this.urls[key]);
    }
    
    this.getCallback = function() {
    	return this.callback;
        callLater(callback, this.callback);
    }

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }

    this.urls = {
        "find": "http://mobile.yellowpages.co.id/find.json",
        "findByProduct": "http://mobile.yellowpages.co.id/findproduct.json",
        "findByPhone": "http://mobile.yellowpages.co.id/findphone.json",
        "findByAddress": "http://mobile.yellowpages.co.id/findaddress.json",
        "category": "http://mobile.yellowpages.co.id/category.json",
        "nearby": "http://mobile.yellowpages.co.id/nearby.json",
        "partner": "http://mobile.yellowpages.co.id/partner.json",
        "careerList": "http://mobile.yellowpages.co.id/careerlist.json",
        "careerView": "http://mobile.yellowpages.co.id/careerview.json",
        "geocode": "http://maps.googleapis.com/maps/api/geocode/json"
    };
    
    this.categories = [
    	{"name": "Advertising, Promotion & Publishing","slug": "advertising-promotion-publishing"},
		{"name": "Agriculture, Forestry & Fishing","slug": "agriculture-forestry-fishing"},
		{"name": "Arts & Gifts","slug": "arts-gifts"},
		{"name": "Automotive","slug": "automotive"},
		{"name": "Chemicals","slug": "chemicals"},
		{"name": "Education","slug": "education"},
		{"name": "Electric & Electronic","slug": "electric-electronic"},
		{"name": "Fashion ","slug": "fashion-"},
		{"name": "Finance","slug": "finance"},
		{"name": "Food, Beverages, Cigar, Cigarette & Tobacco","slug": "food-beverages-cigar-cigarette-tobacco"},
		{"name": "Government","slug": "government"},
		{"name": "Health & Care","slug": "health-care"},
		{"name": "Home & Office","slug": "home-office"},
		{"name": "Hotel & Motel","slug": "hotel-motel"},
		{"name": "Industry","slug": "industry"},
		{"name": "Information Technology","slug": "information-technology"},
		{"name": "Mining","slug": "mining"},
		{"name": "Property & Building Materials","slug": "property-building-materials"},
		{"name": "Services","slug": "services"},
		{"name": "Shopping","slug": "shopping"},
		{"name": "Sports, Recreations & Amusement","slug": "sports-recreations-amusement"},
		{"name": "Transportation & Communications","slug": "transportation-communications"}
	];
	
	this.nearbies = [
		{"name":"Banks & ATMs","slug":"bank"},
		{"name":"Beauty Centers & Barber Shops","slug":"barber-shops,beauty-salons,beauty-aroma-therapy"},
		{"name":"Cafes & Bars","slug":"cafe-1,cafe-baker,cafe-cocktail,cafeteria,pub,bars,bars-cocktail-wine,bars-music"},
		{"name":"Hospitals & Clinics","slug":"hospital,clinic"},
		{"name":"Hotels","slug":"bungalow,cottages,hostels,hotel-motel-1"},
		{"name":"Monuments & Museums","slug":"monuments,museums"},
		{"name":"Nightclubs & Discotheques","slug":"disco,night-clubs"},
		{"name":"Restaurants","slug":"restaurants"},
		{"name":"Shopping Centers & Supermarkets","slug":"departments-stores,duty-free-stores,factory-outlet,mini-market,shopping-centres,sundries-stores,supermarket,shopping-centres-1,shopping-center"},
		{"name":"Spas, Saunas & Skin Treatments","slug":"spa-sauna,skin-treatments-1"},
		{"name":"Sport Centers","slug":"futsal-center,golf-driving-range,golf-course,racing-circuit,sport-center-1,swimming-pool,tennis-courts"},
		{"name":"Theaters, Recreation & Game Centers","slug":"recreation-centres,game-centre,amusement-places-1,theatres"}
	];
    
    this.callback = 'ypcoid';

    callLater(successCallback);

}

var app;
var isTouching = false;
var xhr = null;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var activeBasic = true;
var activeProduct = false;
var activePhone = false;
var activeAddress = false;
var scroller = null;

function onDeviceReady() {
	app = {
		showAlert: function (message, title) {
		    if (navigator.notification) {
		        navigator.notification.alert(message, null, title, 'Ok');
		    } else {
		        alert(title ? (title + ": " + message) : message);
		    }
		},
		
		showConfirm: function (message, title, callback) {
		    if (navigator.notification) {
		        navigator.notification.confirm(message, callback, title, 'Cancel, Ok');
		    } else {
		        confirm(title ? (title + ": " + message) : message);
		    }
		},
		
		registerEvents: function() {
		    var self = this;
		    
		    // Back button
		    document.addEventListener("backbutton", function(e){
		    	var hash = window.location.hash;
		    	
		    	if ($('#menu').hasClass('open')) {
	        		self.toggleMenu();
	        		
	        		return false;
		    	} else {
				    if(!hash || hash == '#home'){
				    	self.showConfirm('Exit application?', 'Confirm', function(response) {
				    		if (response == 2) {
						        e.preventDefault();
						        navigator.app.exitApp();
				    		}
				    	});
				    } else {
				    	self.hideLoader();
				    	self.hideVisit();
				        navigator.app.backHistory();
				    }
			    }
			}, false);
			
			// Fast click
			window.addEventListener('load', function() {
			    FastClick.attach(document.body);
			}, false);

			// Touch effect
		    if (document.documentElement.hasOwnProperty('ontouchstart')) {					        
		        // Menu	   
		        $('body').on('touchstart', '#menu-toggle', function(event) {
		        	self.toggleMenu();
		        	event.preventDefault();
		        	event.stopPropagation();
		        	return false;
		        });
		             
		        // Loader
		        $('body').on('touchstart', '#loader', function(event) {
		        	setTimeout(function() {
		        		self.hideLoader();
		        	}, 500);
					return false;
		        });
		        
		        // Refresh location
		        $('body').on('touchend', '#my-location-refresh', function(event) {
		        	self.detectLocation();
		        	return false;
		        });
		        
		        // Tappable links
		        $('body').on('touchstart', '.tappable', function(e) {
		        	$('.tappable').removeClass('active');
		        	var item = e.currentTarget;
					if(isTouching) return;
					e.currentTarget.moved = false;
					isTouching = true;
					
					setTimeout(function(){
					  if(item.moved===false) {
					    $(item).addClass('active');
					  }
					}, 80);
		        });
		        $('body').on('touchmove', '.tappable', function(e) {
		        	var item = e.currentTarget;
					item.moved = true;
					isTouching = false;
					$(item).removeClass('active');
		        });
		        $('body').on('touchend', '.tappable', function(e) {
		        	var item = e.currentTarget;
		        	isTouching = false;
		        	setTimeout(function() {
					  $(item).removeClass('active');
					}, 1000);
					
					delete item.moved;
		        });
		        
		        // Back link
		        $('body').on('touchend', '.back-link', function(e) {
		        	var hash = window.location.hash;
				    if(!hash || hash == '#home'){
				    	self.showConfirm('Exit application?', 'Confirm', function(response) {
				    		if (response == 2) {
						        e.preventDefault();
						        navigator.app.exitApp();
				    		}
				    	});
				    } else {
				    	self.hideLoader();
				    	self.hideVisit();
				        navigator.app.backHistory();
				    }
		      	});
		        
		        // Directory link
		        $('body').on('touchend', '.directory-link', function(e) {
		        	self.dirLink = $(e.target).data('url');
					self.showVisit();
					return false;
		        });
		        $('body').on('touchstart', '#visit-ok', function(e) {
		        	navigator.app.loadUrl(self.dirLink, {openExternal: true});
		        	setTimeout(function() {
						self.hideVisit();
					}, 500);
					return false;
		        });
		        $('body').on('touchstart', '#visit-cancel', function(e) {
		        	self.dirLink = '';
		        	setTimeout(function() {
						self.hideVisit();
					}, 500);
					return false;
		        });
		        
		        // Menu link
		        $('body').on('touchstart', '.menu-link', function(e) {
		        	$('.menu-link').removeClass('active');
		        	var item = e.currentTarget;
					if(isTouching) return;
					e.currentTarget.moved = false;
					isTouching = true;
					
					setTimeout(function(){
					  if(item.moved===false) {
					    $(item).addClass('active');
					    self.toggleMenu();
		        		if (xhr) xhr.abort();
		        		window.location.hash = $(event.target).attr('href');
					  }

			        	e.preventDefault();
			        	e.stopPropagation();
			        	return false;
					}, 80);

		        	e.preventDefault();
		        	e.stopPropagation();
		        	return false;
		        });
		        $('body').on('touchmove', '.menu-link', function(e) {
		        	var item = e.currentTarget;
					item.moved = true;
					isTouching = false;
					$(item).removeClass('active');
		        });
		        $('body').on('touchend', '.menu-link', function(e) {
		        	var item = e.currentTarget;
		        	isTouching = false;
		        	setTimeout(function() {
					  $(item).removeClass('active');
					}, 1000);
					
					delete item.moved;
		        });
		        
		        // Career link
		        $('body').on('touchstart', '.career-link', function(e) {
		        	$('.career-link').removeClass('active');
		        	var item = e.currentTarget;
					if(isTouching) return;
					e.currentTarget.moved = false;
					isTouching = true;
					
					setTimeout(function(){
					  if(item.moved===false) {
					    $(item).addClass('active');
					    self.toggleMenu();
		        		if (xhr) xhr.abort();
						self.loadCareers();

			        	e.preventDefault();
			        	e.stopPropagation();
			        	return false;
					  }
					}, 80);

		        	e.preventDefault();
		        	e.stopPropagation();
		        	return false;
		        });
		        $('body').on('touchmove', '.career-link', function(e) {
		        	var item = e.currentTarget;
					item.moved = true;
					isTouching = false;
					$(item).removeClass('active');
		        });
		        $('body').on('touchend', '.career-link', function(e) {
		        	var item = e.currentTarget;
		        	isTouching = false;
		        	setTimeout(function() {
					  $(item).removeClass('active');
					}, 1000);
					
					delete item.moved;
		        });
		        
		        // Career Detail link
		        $('body').on('touchend', '.career-detail-link', function(e) {
		        	var slug = $(e.target).parents('.career-detail-link').data('slug');
					self.loadCareer(slug);
					return false;
		        });
		        
		        // Career refresh link
		        $('body').on('touchend', '.career-refresh-link', function(e) {
		        	app.career = null;
					var oldHash = window.location.hash;
		        	if (oldHash == '#careers') $(window).trigger('hashchange');
		        	else window.location.hash = $(item).attr('href');
		        	
					return false;
		        });
		        
		        // Find link
		        $('body').on('touchstart', '.find-link', function(e) {
		        	$('.find-link').removeClass('active');
		        	var item = e.currentTarget;
					if(isTouching) return;
					e.currentTarget.moved = false;
					isTouching = true;
					
					setTimeout(function(){
					  if(item.moved===false) {
					    $(item).addClass('active');
					    self.toggleMenu();
		        		if (xhr) xhr.abort();
		        	
			        	var active = $(item).data('find');
			        	switch (active) {
			        		case 'product':
			        			activeProduct = true;
			        			activeBasic = activePhone = activeAddress = false;
			        			break;
			        		case 'phone':
			        			activePhone = true;
			        			activeProduct = activeBasic = activeAddress = false;
			        			break;
			        		case 'address':
			        			activeAddress = true;
			        			activeProduct = activePhone = activeBasic = false;
			        			break;
			        		default:
			        			activeBasic = true;
			        			activeProduct = activePhone = activeAddress = false;
			        			break;
			        	}
	
						var oldHash = window.location.hash;
			        	if (oldHash == '#find') $(window).trigger('hashchange');
			        	else window.location.hash = $(item).attr('href');

			        	e.preventDefault();
			        	e.stopPropagation();
			        	return false;
					  }
					}, 80);

		        	e.preventDefault();
		        	e.stopPropagation();
		        	return false;
		        });
		        $('body').on('touchmove', '.find-link', function(e) {
		        	var item = e.currentTarget;
					item.moved = true;
					isTouching = false;
					$(item).removeClass('active');
		        });
		        $('body').on('touchend', '.find-link', function(e) {
		        	var item = e.currentTarget;
		        	isTouching = false;
		        	setTimeout(function() {
					  $(item).removeClass('active');
					}, 1000);
					
					delete item.moved;
		        });
		        
		        // Exit link
		        $('body').on('touchstart', '.exit-link', function(event) {
			    	self.showConfirm('Exit application?', 'Confirm', function(response) {
			    		if (response == 2) {
				        	event.preventDefault();
				        	event.stopPropagation();
					        navigator.app.exitApp();
			    		} else {
				        	event.preventDefault();
				        	event.stopPropagation();
			    			return false;
			    		}
			    	});
			    	
			    	return false;
				});
		    } else {				        
		        // Menu	   
		        $('body').on('mousedown', '#menu-toggle', function(event) {
					self.toggleMenu();
		        	event.preventDefault();
		        	event.stopPropagation();
		        	return false;
		        });
		                
		        // Loader
		        $('body').on('mousedown', '#loader', function(event) {
		        	self.hideLoader();
					return false;
		        });
		        
		        // Refresh location
		        $('body').on('mousedown', '#my-location-refresh', function(event) {
		        	self.detectLocation();
		        	return false;
		        });
		        
		        // Back link
		        $('body').on('mousedown', '.back-link', function(e) {
		        	var hash = window.location.hash;
				    if(!hash || hash == '#home'){
				    	self.showConfirm('Exit application?', 'Confirm', function(response) {
				    		if (response == 2) {
						        e.preventDefault();
						        navigator.app.exitApp();
				    		}
				    	});
				    } else {
				    	self.hideLoader();
				    	self.hideVisit();
				        navigator.app.backHistory();
				    }
		      	});
		        
		        // Directory link
		        $('body').on('mousedown', '.directory-link', function(e) {
		        	self.dirLink = $(e.target).data('url');
					self.showVisit();
					return false;
		        });
		        $('body').on('mousedown', '#visit-ok', function(e) {
		        	window.open(self.dirLink, '_system');
		        	self.hideVisit();
					return false;
		        });
		        $('body').on('mousedown', '#visit-cancel', function(e) {
		        	self.dirLink = '';
		        	self.hideVisit();
					return false;
		        });
		        
		        // Menu link
		        $('body').on('mousedown', '.menu-link', function(event) {
	        		self.toggleMenu();
		        	if (xhr) xhr.abort();
	        		
		        	window.location.hash = $(event.target).attr('href');
		        	event.preventDefault();
		        	event.stopPropagation();
		        	return false;
		        });
		        
		        // Career link
		        $('body').on('mousedown', '.career-link', function(event) {
		        	$(event.target).addClass('active');
	        		self.toggleMenu();
		        	if (xhr) xhr.abort();

					self.loadCareers();
					
		        	event.preventDefault();
		        	event.stopPropagation();
		        	return false;
		        });
		        
		        // Career Detail link
		        $('body').on('mousedown', '.career-detail-link', function(e) {
		        	var slug = $(e.target).parents('.career-detail-link').data('slug');
					self.loadCareer(slug);
					return false;
		        });
		        
		        // Career refresh link
		        $('body').on('mousedown', '.career-refresh-link', function(e) {
		        	app.career = null;
					var oldHash = window.location.hash;
		        	if (oldHash == '#careers') $(window).trigger('hashchange');
		        	else window.location.hash = $(item).attr('href');
		        	
					return false;
		        });
		        
		        // Find link
		        $('body').on('mousedown', '.find-link', function(event) {
	        		self.toggleMenu();
		        	if (xhr) xhr.abort();
		        	
		        	var active = $(event.target).data('find');
		        	switch (active) {
		        		case 'product':
		        			activeProduct = true;
		        			activeBasic = activePhone = activeAddress = false;
		        			break;
		        		case 'phone':
		        			activePhone = true;
		        			activeProduct = activeBasic = activeAddress = false;
		        			break;
		        		case 'address':
		        			activeAddress = true;
		        			activeProduct = activePhone = activeBasic = false;
		        			break;
		        		default:
		        			activeBasic = true;
		        			activeProduct = activePhone = activeAddress = false;
		        			break;
		        	}

					var oldHash = window.location.hash;
		        	window.location.hash = $(event.target).attr('href');
		        	if (oldHash == '#find') $(window).trigger('hashchange');
		        	event.preventDefault();
		        	event.stopPropagation();
		        	return false;
		        });
		    }
		    
		    // Routing
		    $(window).on('hashchange', $.proxy(this.route, this));
		},
		
		route: function() {
			var self = this;
		    var hash = window.location.hash;
			
			switch (hash) {
				case '#list':
					break;
				case '#browse':
					$('content').html(new BrowseView().render().el);
					break;
				case '#nearby':
					$('content').html(new NearbyView().render().el);
					break;
				case '#partner':
					$('content').html(new PartnerView().render().el);
					break;
				case '#find':
					$('content').html(new FindView().render().el);
					break;
				case '#careers':
					$('content').html(new CareerListView().render().el);
					break;
				case '#career':
					break;
				case '#about':
					$('content').html(new AboutView().render().el);
					break;
				default:
					$('content').html(new HomeView().render().el);
					break;
			}
		},
		
		showLoader: function(text) {
			var loaderText = 'Loading ...';
			if (text) loaderText = text;
			$('#loader .text').html(loaderText);
			$('#loader').show();
		},
		
		hideLoader: function() {
			if (xhr) xhr.abort();
			$('#loader').hide();
		},
		
		showOverlay: function() {
			$('#overlay').show();
		},
		
		hideOverlay: function() {
			$('#overlay').hide();
		},
		
		showVisit: function() {
			$('#visit-confirm').show();
		},
		
		hideVisit: function() {
			$('#visit-confirm').hide();
		},
		
		toggleMenu: function() {
			var self = this;
			
        	if ($('#menu').hasClass('open')) {
        		self.hideOverlay();
        		$('#menu').removeClass('open');
        		$('#menu-toggle').removeClass('open');
        		$('#menu-toggle').css('right', 0);
        	} else {
        		$('#menu a').removeClass('active');
        		self.showOverlay();
        		if (scroller != null) scroller.scrollTo(0, 0);
        		$('#menu-toggle').addClass('open');
        		$('#menu-toggle').css('right', screenWidth - 50);
        		$('#menu').addClass('open');
        	}
		},
		
		loadMoreList: function(url, params) {
			app.showLoader('Loading ...');
			var config = new Config();
			var url = config.getUrl(url);
			
			if (xhr) xhr.abort();
			xhr = $.ajax({
				type: 'GET',
				data: JSON.parse(window.atob(params)),
				dataType: 'jsonp',
				url: url + '?callback=ypcoid',
				success: function(data) {
					app.hideLoader();
					$('.load-more').remove();
					$('.directories').append(new ListMoreView().render(data).el);
				},
				error: function() {
					app.hideLoader();
					app.showAlert('Failed connecting to server, check your connection.', 'Error');
				}
			});
		},
		
		loadMoreCareers: function(url, params) {
			app.showLoader('Loading ...');
			var config = new Config();
			var url = config.getUrl(url);
			
			if (xhr) xhr.abort();
			xhr = $.ajax({
				type: 'GET',
				data: JSON.parse(window.atob(params)),
				dataType: 'jsonp',
				jsonpCallback: 'ypcoid',
				url: url,
				success: function(data) {
					app.hideLoader();
					app.career['summary'] = data.summary;
					app.career['careers'] = app.career['careers'].concat(data.careers);
					$('.load-more-career').remove();
					$('.careers').append(new CareerListMoreView().render(data).el);
				},
				error: function() {
					app.hideLoader();
					app.showAlert('Failed connecting to server, check your connection.', 'Error');
				}
			});
		},
		
		loadCareer: function(slug) {
			app.showLoader('Loading ...');
			var config = new Config();
			var url = config.getUrl('careerView');
			
			if (xhr) xhr.abort();
			xhr = $.ajax({
				type: 'GET',
				data: {slug: slug},
				dataType: 'jsonp',
				jsonpCallback: 'ypcoid',
				url: url,
				success: function(data) {
					app.hideLoader();
					window.location.hash = '#career';
					$('content').html(new CareerDetailView().render(data).el);
				},
				error: function() {
					app.hideLoader();
					app.showAlert('Failed connecting to server, check your connection.', 'Error');
				}
			});
		},
		
		detectLocation: function() {
			var self = this;
			$('#my-location .located').hide();
			$('#my-location .locating').show();
			$('#my-location .unlocated').hide();
			$('#my-location #my-location-actions').hide();
			
			navigator.geolocation.getCurrentPosition(
				// Success
				function(position) {
					self.userPos = position;
					self.userArea = '';
					
					// Get location name
					var config = new Config();
					var geocodeUrl = config.getUrl('geocode');	
			
					$.ajax({
						type: 'GET',
						data: {
							latlng: self.userPos.coords.latitude + ',' + self.userPos.coords.longitude,
							language: 'id',
							sensor: false
						},
						dataType: 'json',
						url: geocodeUrl,
						success: function(data) {
							if (data.status == 'OK') {
								if (data.results[1] != 'undefined') {
									self.userArea = self.userArea + data.results[1]['formatted_address'];
								} else {
									self.userArea = self.userArea + data.results[0]['formatted_address'];
								}
							}

							$('#my-location .located .text').html(self.userArea);
							$('#my-location .located').show();
							$('#my-location .locating').hide();
							$('#my-location .unlocated').hide();
							$('#my-location #my-location-actions').show();
							$('#my-location-map').show();
						},
						error: function() {	
							self.userArea = self.userArea + self.userPos.coords.latitude + ', ' + self.userPos.coords.longitude;	
							$('#my-location .located .text').html(self.userArea);
							$('#my-location .located').show();
							$('#my-location .locating').hide();
							$('#my-location .unlocated').hide();
							$('#my-location #my-location-actions').show();
							$('#my-location-map').show();
						}
					});
				},
				
				// Error
				function() {
					self.showAlert('Unable to locate your position, please try again.');	
					$('#my-location .located .text').html('Unable to locate your position, please try again.');
					$('#my-location .located').hide();
					$('#my-location .locating').hide();
					$('#my-location .unlocated').show();
					$('#my-location #my-location-actions').show();
					$('#my-location-map').hide();
				},
				
				{
					enableHighAccuracy: true,
					timeout: 60000
				}
			);
		},
		
		calculateDistance: function(vnLat, vnLon) {
			var self = this;
			var ret = false;
			
			if (self.userPos && vnLat != 0 && vnLon != 0) {
				var vnLat = parseFloat(vnLat);
				var vnLong = parseFloat(vnLon);
				userLat = parseFloat(self.userPos.coords.latitude);
				userLon = parseFloat(self.userPos.coords.longitude);
				dLat = (vnLat - userLat) * Math.PI / 180;
				dLon = (vnLong - userLon) * Math.PI / 180; 
				a = Math.sin(dLat/2) * Math.sin(dLat/2) +
					Math.cos(userLat * Math.PI / 180) * Math.cos(vnLat * Math.PI / 180) * 
					Math.sin(dLon/2) * Math.sin(dLon/2);
				c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
				d = 6371 * c;
				d = d.toFixed(2);
				ret = d + 'km';
			}
			
			return ret;
		},
		
		initialize: function() {
			var self = this;
			self.career = null;
			
			// Route
			self.route();
			
			// Register events
			self.registerEvents();
			
			// Geo location
			self.detectLocation();
	
			// Handlebars helper
			Handlebars.registerHelper('ifCond', function(v1, v2, options) {
				var ret = options.inverse(this);
				if (v1 || v2) ret = options.fn(this);
				
				return ret;
			});
			
			// Foundation js
			$(document).foundation();
			
			// Menu
			$('#menu').width(screenWidth - 50);
			$('#menu').height(screenHeight);
			$('#menu').css('left', screenWidth);
			$('#menu').show();
			
			setTimeout(function() {
				scroller = new iScroll('mscroll', {
					hScroll: false,
					hScrollbar: false,
					vScrollbar: false
				});
			}, 80);
		},		
	};
	
	app.initialize();
}

$(document).ready(function() {
	window.isphone = false;
    if(document.URL.indexOf("http://") == -1) {
      window.isphone = true;
    }

    if(window.isphone) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});

var HomeView = function() {
	this.initialize = function() {
		this.el = $('<div id="home"/>');
		this.el.on('click', '#do-find', this.find);
		this.el.on('click', '.popular-link', this.popular);
		this.el.on('submit', '#find-form form', this.find);
		
		if (!app.userPos) {
			$('#my-location-map').hide();
		}
	};
	
	this.render = function() {
		var self = this;
		var data = {
			userPos: app.userPos,
			userArea: app.userArea
		};
		
		self.el.html(HomeView.template(data));
		
		scroll(0,0);
		
		return self;
	}
	
	this.find = function() {
		var what = $('#what').val();
		
		if (!what) {
			app.showAlert('Please enter the keywords!', 'Error');
		} else {
			app.showLoader('Searching ...');
			var config = new Config();
			var url = config.getUrl('find');
		
			var userLat = 0;
			var userLon = 0;
			if (app.userPos) {
				userLat = app.userPos.coords.latitude;
				userLon = app.userPos.coords.longitude;
			}
			
			if (xhr) xhr.abort();
			xhr = $.ajax({
				type: 'GET',
				data: {
					what: what,
					userLat: userLat,
					userLon: userLon
				},
				dataType: 'jsonp',
				url: url + '?callback=ypcoid',
				success: function(data) {
					app.hideLoader();
					window.location.hash = '#list';
					$('content').html(new ListView().render(data).el);
				},
				error: function() {
					app.hideLoader();
					app.showAlert('Failed connecting to server, check your connection.', 'Error');
				}
			});
		}
		
		return false;
	}
	
	this.popular = function(event) {
		var what = $(event.target).data('keywords');
		if (!what) what = $(event.target).parents('a.popular-link').data('keywords');
		
		if (!what) {
			app.showAlert('Please enter the keywords!', 'Error');
		} else {
			app.showLoader('Searching ...');
			var config = new Config();
			var url = config.getUrl('find');
		
			var userLat = 0;
			var userLon = 0;
			if (app.userPos) {
				userLat = app.userPos.coords.latitude;
				userLon = app.userPos.coords.longitude;
			}
			
			if (xhr) xhr.abort();
			xhr = $.ajax({
				type: 'GET',
				data: {
					what: what,
					userLat: userLat,
					userLon: userLon
				},
				dataType: 'jsonp',
				url: url + '?callback=ypcoid',
				success: function(data) {
					app.hideLoader();
					window.location.hash = '#list';
					$('content').html(new ListView().render(data).el);
				},
				error: function() {
					app.hideLoader();
					app.showAlert('Failed connecting to server, check your connection.', 'Error');
				}
			});
		}
		
		return false;
	}
	
	this.initialize();
}

HomeView.template = Handlebars.compile($("#home-tpl").html());


var ListMoreView = function() {
	this.initialize = function() {
		this.el = $('<div class="more-list"/>');
	};
	
	this.render = function(data) {
		var self = this;
		
		var i = 0;
		$.each(data.directories, function() {
			var d = this;
			if (d['address']['latitude'] != 0 && d['address']['longitude'] != 0) {
				data.directories[i]['address']['distance'] = app.calculateDistance(d['address']['latitude'], d['address']['longitude']);
			} else {
				data.directories[i]['address']['latitude'] = null;
				data.directories[i]['address']['longitude'] = null;
				data.directories[i]['address']['distance'] = null;
			}
			i++;
		});
		
		self.el.html(ListMoreView.template(data));
		
		return self;
	}
	
	this.initialize();
}

ListMoreView.template = Handlebars.compile($("#list-more-tpl").html());


var FindView = function() {
	this.initialize = function() {
		this.el = $('<div/>');
		this.el.on('click', '.popular-link', this.popular);
		
		// Basic search
		this.el.on('submit', 'form#basic-form', this.find);
		this.el.on('click', '#do-find-basic', this.find);
		
		// By product search
		this.el.on('submit', 'form#product-form', this.findByProduct);
		this.el.on('click', '#do-find-product', this.findByProduct);
		
		// By phone search
		this.el.on('submit', 'form#phone-form', this.findByPhone);
		this.el.on('click', '#do-find-phone', this.findByPhone);
		
		// By address search
		this.el.on('submit', 'form#address-form', this.findByAddress);
		this.el.on('click', '#do-find-address', this.findByAddress);
	};
	
	this.render = function() {	
		var self = this;
		
		var data = {
			activeBasic: activeBasic,
			activeProduct: activeProduct,
			activePhone: activePhone,
			activeAddress: activeAddress
		};
			
		self.el.html(FindView.template(data));
		
		setTimeout(function() {
			scroll(0,0);
		}, 200);
		
		return self;
	}
	
	this.find = function() {
		$('input[type="text"]').blur();
		var what = $('#basic-what').val();
		var where = $('#basic-where').val();
		
		if (!what) {
			app.showAlert('Please enter the keywords!', 'Error');
		} else {
			app.showLoader('Searching ...');
			var config = new Config();
			var url = config.getUrl('find');
		
			var userLat = 0;
			var userLon = 0;
			if (app.userPos) {
				userLat = app.userPos.coords.latitude;
				userLon = app.userPos.coords.longitude;
			}
			
			if (xhr) xhr.abort();
			xhr = $.ajax({
				type: 'GET',
				data: {
					what: what,
					where: where,
					userLat: userLat,
					userLon: userLon
				},
				dataType: 'jsonp',
				url: url + '?callback=ypcoid',
				success: function(data) {
					app.hideLoader();
					window.location.hash = '#list';
					$('content').html(new ListView().render(data).el);
				},
				error: function() {
					app.hideLoader();
					app.showAlert('Failed connecting to server, check your connection.', 'Error');
				}
			});
		}
		
		return false;
	}
	
	this.findByProduct = function() {
		$('input[type="text"]').blur();
		var what = $('#product-what').val();
		var where = $('#product-where').val();
		
		if (!what) {
			app.showAlert('Please enter the keywords!', 'Error');
		} else {
			app.showLoader('Searching ...');
			var config = new Config();
			var url = config.getUrl('findByProduct');
		
			var userLat = 0;
			var userLon = 0;
			if (app.userPos) {
				userLat = app.userPos.coords.latitude;
				userLon = app.userPos.coords.longitude;
			}
			
			if (xhr) xhr.abort();
			xhr = $.ajax({
				type: 'GET',
				data: {
					what: what,
					where: where,
					userLat: userLat,
					userLon: userLon
				},
				dataType: 'jsonp',
				url: url + '?callback=ypcoid',
				success: function(data) {
					app.hideLoader();
					window.location.hash = '#list';
					$('content').html(new ListView().render(data).el);
				},
				error: function() {
					app.hideLoader();
					app.showAlert('Failed connecting to server, check your connection.', 'Error');
				}
			});
		}
		
		return false;
	}
	
	this.findByPhone = function() {
		$('input[type="text"]').blur();
		var what = $('#phone-what').val();
		
		if (!what) {
			app.showAlert('Please enter the keywords!', 'Error');
		} else {
			app.showLoader('Searching ...');
			var config = new Config();
			var url = config.getUrl('findByPhone');
		
			var userLat = 0;
			var userLon = 0;
			if (app.userPos) {
				userLat = app.userPos.coords.latitude;
				userLon = app.userPos.coords.longitude;
			}
			
			if (xhr) xhr.abort();
			xhr = $.ajax({
				type: 'GET',
				data: {
					what: what,
					userLat: userLat,
					userLon: userLon
				},
				dataType: 'jsonp',
				url: url + '?callback=ypcoid',
				success: function(data) {
					app.hideLoader();
					window.location.hash = '#list';
					$('content').html(new ListView().render(data).el);
				},
				error: function() {
					app.hideLoader();
					app.showAlert('Failed connecting to server, check your connection.', 'Error');
				}
			});
		}
		
		return false;
	}
	
	this.findByAddress = function() {
		$('input[type="text"]').blur();
		var what = $('#address-what').val();
		var where = $('#address-street').val();
		var city = $('#address-city').val();
		var province = $('#address-province').val();
		var zipcode = $('#address-zipcode').val();
		
		if (!what) {
			app.showAlert('Please enter the keywords!', 'Error');
		} else {
			app.showLoader('Searching ...');
			var config = new Config();
			var url = config.getUrl('findByAddress');
		
			var userLat = 0;
			var userLon = 0;
			if (app.userPos) {
				userLat = app.userPos.coords.latitude;
				userLon = app.userPos.coords.longitude;
			}
			
			if (xhr) xhr.abort();
			xhr = $.ajax({
				type: 'GET',
				data: {
					what: what,
					street: where,
					city: city,
					province: province,
					zipcode: zipcode,
					userLat: userLat,
					userLon: userLon
				},
				dataType: 'jsonp',
				url: url + '?callback=ypcoid',
				success: function(data) {
					app.hideLoader();
					window.location.hash = '#list';
					$('content').html(new ListView().render(data).el);
				},
				error: function() {
					app.hideLoader();
					app.showAlert('Failed connecting to server, check your connection.', 'Error');
				}
			});
		}
		
		return false;
	}
	
	this.popular = function(event) {
		var what = $(event.target).data('keywords');
		if (!what) what = $(event.target).parents('a.popular-link').data('keywords');
		
		if (!what) {
			app.showAlert('Please enter the keywords!', 'Error');
		} else {
			app.showLoader('Searching ...');
			var config = new Config();
			var url = config.getUrl('find');
		
			var userLat = 0;
			var userLon = 0;
			if (app.userPos) {
				userLat = app.userPos.coords.latitude;
				userLon = app.userPos.coords.longitude;
			}
			
			if (xhr) xhr.abort();
			xhr = $.ajax({
				type: 'GET',
				data: {
					what: what,
					userLat: userLat,
					userLon: userLon
				},
				dataType: 'jsonp',
				url: url + '?callback=ypcoid',
				success: function(data) {
					app.hideLoader();
					window.location.hash = '#list';
					$('content').html(new ListView().render(data).el);
				},
				error: function() {
					app.hideLoader();
					app.showAlert('Failed connecting to server, check your connection.', 'Error');
				}
			});
		}
		
		return false;
	}
	
	this.initialize();
}

FindView.template = Handlebars.compile($("#find-tpl").html());


var CareerListView = function() {	
	this.initialize = function() {
		this.el = $('<div id="c"/>');
		
		if (document.documentElement.hasOwnProperty('ontouchstart')) {
	        this.el.on('touchend', '#load-more-career-button', function(event) {
	        	var params = $(event.target).data('params');
	        	var url = $(event.target).data('url');
				app.loadMoreCareers(url, params);
	        	return false;
	        });
		} else {
	        this.el.on('mousedown', '#load-more-career-button', function(event) {
	        	var params = $(event.target).data('params');
	        	var url = $(event.target).data('url');
				app.loadMoreCareers(url, params);
	        	return false;
	        });
		}
	};
	
	this.render = function(data) {
		var self = this;
		
		if (app.career != null) {
			self.el.html(CareerListView.template(app.career));
		} else {
			app.showLoader('Loading ...');
			var config = new Config();
			var url = config.getUrl('careerList');
			
			if (xhr) xhr.abort();
			xhr = $.ajax({
				type: 'GET',
				data: {},
				dataType: 'jsonp',
				jsonpCallback: 'ypcoid',
				url: url,
				success: function(data) {
					app.career = data;
					app.hideLoader();
					self.el.html(CareerListView.template(data));
				},
				error: function() {
					app.hideLoader();
					app.showAlert('Failed connecting to server, check your connection.', 'Error');
				}
			});
		}
		
		scroll(0,0);
		
		return self;
	}
	
	this.initialize();
}

CareerListView.template = Handlebars.compile($("#careers-tpl").html());



var ListView = function() {
	this.initialize = function() {
		this.el = $('<div/>');
		
		if (document.documentElement.hasOwnProperty('ontouchstart')) {
	        this.el.on('touchend', '#load-more-button', function(event) {
	        	var params = $(event.target).data('params');
	        	var url = $(event.target).data('url');
				app.loadMoreList(url, params);
	        	return false;
	        });
		} else {
	        this.el.on('mousedown', '#load-more-button', function(event) {
	        	var params = $(event.target).data('params');
	        	var url = $(event.target).data('url');
				app.loadMoreList(url, params);
	        	return false;
	        });
		}
	};
	
	this.render = function(data) {
		var self = this;
		
		var i = 0;
		$.each(data.directories, function() {
			var d = this;
			if (d['address']['latitude'] != 0 && d['address']['longitude'] != 0) {
				data.directories[i]['address']['distance'] = app.calculateDistance(d['address']['latitude'], d['address']['longitude']);
			} else {
				data.directories[i]['address']['latitude'] = null;
				data.directories[i]['address']['longitude'] = null;
				data.directories[i]['address']['distance'] = null;
			}
			i++;
		});
		
		self.el.html(ListView.template(data));
		
		scroll(0,0);
		
		return self;
	}
	
	this.initialize();
}

ListView.template = Handlebars.compile($("#list-tpl").html());


var BrowseView = function() {
	this.initialize = function() {
		this.el = $('<div/>');
		this.el.on('click', 'a.category-link', this.browse);
	};
	
	this.render = function() {
		var self = this;
		var config = new Config();
		var categories = config.categories;
		var url = config.getUrl('category');
		var data = {
			"categories": categories,
			"url": url
		};
		
		self.el.html(BrowseView.template(data));
		
		scroll(0,0);
		
		return self;
	}
	
	this.browse = function(e) {
		var slug = $(e.target).data('slug');

		app.showLoader('Loading ...');
		var config = new Config();
		var url = config.getUrl('category');
		
		var userLat = 0;
		var userLon = 0;
		if (app.userPos) {
			userLat = app.userPos.coords.latitude;
			userLon = app.userPos.coords.longitude;
		}
		
		if (xhr) xhr.abort();
		xhr = $.ajax({
			type: 'GET',
			data: {
				category: slug,
				userLat: userLat,
				userLon: userLon
			},
			dataType: 'jsonp',
			url: url + '?callback=ypcoid',
			success: function(data) {
				app.hideLoader();
				window.location.hash = '#list';
				$('content').html(new ListView().render(data).el);
			},
			error: function() {
				app.hideLoader();
				app.showAlert('Failed connecting to server, check your connection.', 'Error');
			}
		});
		
		return false;
	}
	
	this.initialize();
}

BrowseView.template = Handlebars.compile($("#browse-tpl").html());


var PartnerView = function() {	
	this.initialize = function() {
		this.el = $('<div id="partner"/>');
	};
	
	this.render = function(data) {
		var self = this;
		
		app.showLoader('Loading ...');
		var config = new Config();
		var url = config.getUrl('partner');
		
		if (xhr) xhr.abort();
		xhr = $.ajax({
			type: 'GET',
			data: {},
			dataType: 'jsonp',
			url: url + '?callback=ypcoid',
			success: function(data) {
				app.hideLoader();
		
				var i = 0;
				$.each(data.directories, function() {
					var d = this;
					if (d['address']['latitude'] != 0 && d['address']['longitude'] != 0) {
						data.directories[i]['address']['distance'] = app.calculateDistance(d['address']['latitude'], d['address']['longitude']);
					} else {
						data.directories[i]['address']['latitude'] = null;
						data.directories[i]['address']['longitude'] = null;
						data.directories[i]['address']['distance'] = null;
					}
					i++;
				});
		
				self.el.html(PartnerView.template(data));
			},
			error: function() {
				app.hideLoader();
				app.showAlert('Failed connecting to server, check your connection.', 'Error');
			}
		});
		
		scroll(0,0);
		
		return self;
	}
	
	this.initialize();
}

PartnerView.template = Handlebars.compile($("#partner-tpl").html());


var NearbyView = function() {
	this.initialize = function() {
		this.el = $('<div/>');
		this.el.on('click', 'a.category-link', this.browse);
	};
	
	this.render = function() {
		var self = this;
		var config = new Config();
		var nearbies = config.nearbies;
		var url = config.getUrl('category');
		var data = {
			"nearbies": nearbies,
			"url": url
		};
		
		self.el.html(NearbyView.template(data));
		
		scroll(0,0);
		
		return self;
	}
	
	this.browse = function(e) {
		var slug = $(e.target).data('slug');
		var title = $(e.target).data('title');
		
		var userLat = 0;
		var userLon = 0;
		if (app.userPos) {
			userLat = app.userPos.coords.latitude;
			userLon = app.userPos.coords.longitude;
		}

		app.showLoader('Loading ...');
		var config = new Config();
		var url = config.getUrl('nearby');
		
		if (xhr) xhr.abort();
		xhr = $.ajax({
			type: 'GET',
			data: {
				title: title,
				category: slug,
				userLat: userLat,
				userLon: userLon
			},
			dataType: 'jsonp',
			url: url + '?callback=ypcoid',
			success: function(data) {
				app.hideLoader();
				window.location.hash = '#list';
				$('content').html(new ListView().render(data).el);
			},
			error: function() {
				app.hideLoader();
				app.showAlert('Failed connecting to server, check your connection.', 'Error');
			}
		});
		
		return false;
	}
	
	this.initialize();
}

NearbyView.template = Handlebars.compile($("#nearby-tpl").html());


var CareerListMoreView = function() {
	this.initialize = function() {
		this.el = $('<div class="career-more-list"/>');
	};
	
	this.render = function(data) {
		var self = this;
		
		self.el.html(CareerListMoreView.template(data));
		
		return self;
	}
	
	this.initialize();
}

CareerListMoreView.template = Handlebars.compile($("#careers-more-tpl").html());


var CareerDetailView = function() {
	this.initialize = function() {
		this.el = $('<div/>');
	};
	
	this.render = function(data) {
		var self = this;
		
		self.el.html(CareerDetailView.template(data));
		
		scroll(0,0);
		
		return self;
	}
	
	this.initialize();
}

CareerDetailView.template = Handlebars.compile($("#career-tpl").html());


var AboutView = function() {
	this.initialize = function() {
		this.el = $('<div/>');
	};
	
	this.render = function() {
		var self = this;
		
		self.el.html(AboutView.template());
		
		setTimeout(function() {
			scroll(0,0);
		}, 200);
		
		return self;
	}
	
	this.initialize();
}

AboutView.template = Handlebars.compile($("#about-tpl").html());

