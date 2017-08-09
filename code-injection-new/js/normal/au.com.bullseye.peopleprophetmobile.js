










            // to populate mobile system vars, to check if it comes from browser or from mobile apps
            window.mobile_system = '';
            var userAgent = navigator.userAgent + '';
            if (userAgent.indexOf('iPhone') > -1) {
                window.mobile_system = 'iphone';
            } else if (userAgent.indexOf('Android') > -1) {
                window.mobile_system = 'android';
            } else {
                window.mobile_system = '';
            }
            // end to populate mobile system vars
            yepnope({
                test: window.mobile_system === 'android' || window.mobile_system === '',
                yep: ['js/cordova-2.5.0.js', 'js/plugins/GCMPlugin.js'],
                callback: function () {
                    window.cordovaLoaded = true;
                },
                complete: function () {
                    if (window.cordovaLoaded) {
                        window.onCordovaLoaded();
                    }
                }
            });

            yepnope({
                test: window.mobile_system === 'iphone',
                yep: ['js/cordova.ios.js', 'js/plugins/APNSPlugin.js'],
                callback: function () {
                    window.cordovaLoaded = true;
                },
                complete: function () {
                    if (window.cordovaLoaded) {
                        window.onCordovaLoaded();
                    }
                }
            });

		


























            var device_ready = false;

            var initApp = function () {
                //alert('initapp');
                if ((device_ready && jqm_mobile_init) || (jqm_mobile_init && !window.mobile_system)) {
                    App.start();
                }
            };

            var onDeviceReady = function () {
                //alert('ondeviceready');
                device_ready = true;
                initApp();
            };

            if (window.mobile_system.length === 0) {
                $(document).ready(function () {
                    initApp();
                });
            }

            window.onCordovaLoaded = function () {
                document.addEventListener("deviceready", onDeviceReady, false);
            };

		



























var jqm_mobile_init = false;

(function ($) {
	/*** JQM CONFIG ***/

	// TO ENABLE BACKBONE AND JQUERY MOBILE
	$(document).on("mobileinit", function () {
	    $.mobile.ajaxEnabled = false;
	    $.mobile.linkBindingEnabled = false;
	    $.mobile.hashListeningEnabled = false;
	    $.mobile.pushStateEnabled = false;
	    $.mobile.changePage.defaults.changeHash = false;
	    $.mobile.defaultPageTransition = 'none';
	    jqm_mobile_init = true;
	});

	/*** end jqm config ***/
} (jQuery));


(function (app, libs, $) {
	function showPingResult () {
		if(navigator.app) {
			app.showOnScreenNotification('Sorry, we cannot connect to the People Prophet servers. Please check your internet connection or try again later', "error", 9000, navigator.app.exitApp);
		}
	}
	function pingApiService () {
		var deferred = $.Deferred();
		app.Models.PingModel = new libs.Models.PingModel();
		app.Models.PingModel.fetch({
			success: function () { deferred.resolve(); },
			error: function () { deferred.reject(); }
		});
		return deferred.promise();
	}
	libs.AuthenticatedRouter = Backbone.Router.extend({
		requireLogin: function (callback) {
			if (app.currentUser.isSignedIn()) {
				callback.call(this);
			} else {
				this.navigate('login', {trigger:true, replace: true});
			}
		}
	});
	libs.Router = libs.AuthenticatedRouter.extend({
		routes: {
			'': 'dashboard',
			'home': 'dashboard',
			'login': 'login',
			'dashboard': 'dashboard',
			'kudos/:kudosid': 'kudosDetail',
			'leaderboards': 'leaderboardsActive',
			'leaderboards/active': 'leaderboardsActive',
			'leaderboards/thismonth': 'leaderboardsThisMonth',
			'leaderboards/alltime': 'leaderboardsAllTime',
			'peopleregister': 'peopleRegister',
			'peopleregister/:id': 'userProfile',
			'forgotpassword': 'forgotpassword',
			'settings': 'settings'
		},
		initialize: function () {
			app.routerHits = 0;
		},
		login: function () {
			var that = this;
			var pingpromise = pingApiService();
			// cannot hinder redundant hide splashscreen because it needs to be ordered correctly
			pingpromise.fail(function () {
				if (navigator.splashscreen) { navigator.splashscreen.hide(); }
				app.Views.LoginView = new libs.Views.LoginView();
				that.changePage(app.Views.LoginView);
				showPingResult();
			});
			pingpromise.done(function () {
				var pingModel = app.Models.PingModel.toJSON();
				if (pingModel.IsSuccess) {
					app.Views.LoginView = new libs.Views.LoginView();
					that.changePage(app.Views.LoginView);
					if (navigator.splashscreen) { navigator.splashscreen.hide(); }
				} else {
					if (navigator.splashscreen) { navigator.splashscreen.hide(); }
					showPingResult();
				}
			});
		},
		dashboard: function () {
			this.requireLogin(function () {
				app.Views.DashboardView = new libs.Views.DashboardView();
				this.changePage(app.Views.DashboardView);
				app.Common.backButtonTargetRoute = 'dashboard';
				$('#dashboard_scrolling_section').data('mobileIscrollview').iscroll.options.vScrollbar = false;
				app.Views.DashboardView.loadData(); // load data to trigger loader and refresh page
				app.currentUser.refreshData(); // refresh user data
				//console.log(app.NotificationHandler);
				app.NotificationHandler.RegisterDevice();
			});
			if (navigator.splashscreen) { navigator.splashscreen.hide(); }
		},
		kudosDetail: function (kudosid) {
			this.requireLogin(function () {
				app.Views.KudosDetailView = new libs.Views.KudosDetailView();
				app.Views.KudosDetailView.selectedKudosId = kudosid;
				$('#popup_kudos_form_reason').removeAttr('style').hide();
				$('#popup_kudos_form_label_container').removeAttr('style').hide();
				this.changePage(app.Views.KudosDetailView);
				app.Models.KudosDetailModel.fetch();
			});
		},
		leaderboardsActive: function () {
			this.requireLogin(function () {
				var data = new libs.Models.LeaderboardsCollection()	;
				app.Views.LeaderboardsActive = new libs.Views.KudosLeaderboardsView({ collection: data });
				app.Views.LeaderboardsActive.activeTab = "active";
				this.changePage(app.Views.LeaderboardsActive);
				app.Common.backButtonTargetRoute = 'leaderboards/active';
				data.loadActive();
			});
		},
		leaderboardsThisMonth: function () {
			this.requireLogin(function () {
				var data = new libs.Models.LeaderboardsCollection();
				app.Views.LeaderboardsThisMonth = new libs.Views.KudosLeaderboardsView({ collection: data });
				app.Views.LeaderboardsThisMonth.activeTab = "thismonth";
				this.changePage(app.Views.LeaderboardsThisMonth);
				app.Common.backButtonTargetRoute = 'leaderboards/thismonth';
				data.loadThisMonth();
			});
		},
		leaderboardsAllTime: function () {
			this.requireLogin(function () {
				var data = new libs.Models.LeaderboardsCollection();
				app.Views.LeaderboardsAllTime = new libs.Views.KudosLeaderboardsView({ collection: data });
				app.Views.LeaderboardsAllTime.activeTab = "alltime";
				app.Common.backButtonTargetRoute = 'leaderboards/alltime';
				this.changePage(app.Views.LeaderboardsAllTime);
				data.loadAllTime();
			});
		},
		peopleRegister: function () {
			this.requireLogin(function () {
				app.Models.PeopleRegisterCollection = new libs.Models.EmployeeProfileCollection();
				app.Views.PeopleRegisterView = new libs.Views.PeopleRegisterView({
					collection: app.Models.PeopleRegisterCollection
				});
				this.changePage(app.Views.PeopleRegisterView);
				app.Common.backButtonTargetRoute = 'peopleregister';
				$('#people_register_scrolling_section').data('mobileIscrollview').iscroll.options.vScrollbar = false;
				app.Models.PeopleRegisterCollection.search('');
			});
		},
		userProfile: function (id) {
			this.requireLogin(function () {
				app.Views.EmployeeProfileView = new libs.Views.UserDetailsView();
				app.Views.EmployeeProfileView.selectedProfileId = id;
				this.changePage(app.Views.EmployeeProfileView);
				$('#history_list').data('mobileIscrollview').iscroll.options.vScrollbar = false;
				app.Models.EmployeeProfileModel.fetch({ reset: true });
			});
		},
		forgotpassword: function () {
			app.Views.ForgotPasswordView = new libs.Views.ForgotPasswordView();
			this.changePage(app.Views.ForgotPasswordView);
		},
		settings: function () {
			this.requireLogin(function () {
				app.Models.SettingsModel = new libs.Models.SettingsModel();
				app.Views.SettingsView = new libs.Views.SettingsView({
					model: app.Models.SettingsModel
				});
				this.changePage(app.Views.SettingsView);
				app.Views.SettingsView.loadData();
			});
		},
		changePage: function (view) {
			$.mobile.loading('hide');
			view.render();
			$('body').append($(view.el));
			$.mobile.changePage($(view.el), {changeHash:false});
			app.routerHits  = app.routerHits + 1;

		}
	});
} (App, Libs, jQuery));


Libs = { Models: {}, Views: {} };
App = {	Models: {},	Views: {} };

(function ($, app, libs) {

	app.Templates = {
		templates: {},
		loadTemplates: function (names, callback) {
			var that = this;
			var loadTemplate = function (index) {
				var name = names[index];
				$.get('templates' + '/' + name + '.html', function (data) {
					that.templates[name] = data;
					index++;
					if (index < names.length) {
						loadTemplate(index);
					} else {
						callback();
					}
				});
			};
			loadTemplate(0);
		},
		get: function (name) {
			return this.templates[name];
		}
	};

	app.Common = {
		copyModelAttributes: function (model, raw) {
			for (var key in raw) {
				model.set(key, raw[key]);
			}
		},
		backButtonTargetRoute: null,
		goBack: function (e) {
			if (app.Common.backButtonTargetRoute) {
				App.Router.navigate(app.Common.backButtonTargetRoute, {trigger:true, replace: false});
			} else {
				App.Router.navigate('dashboard', {trigger:true, replace: false});
			}
		}
	};

	app.Cache =  {};

	var useSession = false;
	var baseApiUrl = '/api';
	var storageKey = {
		_res_UserId: '__x-userId',
		_res_UserGuid: '__x-userGuid',
		_res_token: '__x-token',
		_res_currentUser: '__x-currentUser'
	};
	function getToken () { // don't refactor this. This should be a function because it has to recall / refetch data from local storage
		return window.localStorage.getItem(storageKey._res_token);
	}
	app.Config = {
		setSessionMode: function (isUsingSession) {
			useSession = isUsingSession;
		},
		setToken: function (token) {
			window.localStorage.setItem(storageKey._res_token, token);
		},
		url: function () {
			return this.host();
		},
		apiUrl: function () {
			return this.host() + baseApiUrl;
		},
		authorizedApiUrl: function () {
			if (useSession) {
				return this.host() + baseApiUrl;
			} else {
				return this.host() + '/' + getToken() + baseApiUrl;
			}
		},
		authorizedUrl: function () {
			if (useSession) {
				return this.host();
			} else {
				return this.host() + '/' + getToken();
			}
		},
		userGuid: function () {
			return window.localStorage.getItem(storageKey._res_UserGuid);
		},
		setUserGuid: function (value) {
			window.localStorage.setItem(storageKey._res_UserGuid, value);
		}
	};
	app.currentUser = function () {
		var currentUserModel = null;
		return {
			get: function () {
				var json = window.localStorage.getItem(storageKey._res_currentUser);
				var obj = JSON.parse(json);
				if (!currentUserModel) {
					var model = new libs.Models.EmployeeProfileModel();
					app.Common.copyModelAttributes(model, obj);
					currentUserModel = model;
				}
				return currentUserModel;
			},
			set: function (model) {
				window.localStorage.setItem(storageKey._res_currentUser, JSON.stringify(model));
				currentUserModel = null; // reset model so it gets from storage
			},
			refreshData: function() {
				currentUserModel = app.currentUser.get();
				currentUserModel.fetch({reset: true, success: function(resp) {
					app.currentUser.set(resp);
				}});
			},
			isSignedIn: function () {
				var userGuid = app.Config.userGuid();
				if (userGuid) {
					return userGuid === this.get().id;
				}
				return false;
			}
		};
	}();

	app.TimestampDecorator = {
		addTimestampQueryString: function(url) {
			//console.log(url.indexOf('.png'));
			if (url.indexOf('.png') >= -1) {
				return url;
			}
			return url + "&ts=" + new Date().getTime();
		}
	};

	app.convertNewlineToBr = function (str) {
		if (str && str !== '') {
			return str.replace(/\n/g, '<br />');
		}
		return '';
	};

	app.routerHits = null;

	function setupEvents () {
		// Remove page from DOM when it's being replaced
		$(document).delegate('div[data-role="page"]', 'pagehide', function (event, ui) {
			$(event.currentTarget).remove();
		});
		$(document).delegate('div[data-role="page"]', 'pagebeforehide', function() {
		});
		$(document).delegate('div[data-role="page"]', 'pageshow', function() {
		});
		$(document).delegate('div[data-role="page"]', 'swiperight', function() {
			$(".ui-page").focus();
			if ($("#kudos_panel").hasClass('ui-panel-closed')) {
				$("#nav_panel").panel("open");
			} else {
				$("#kudos_panel").panel("close");
			}
		});
		$(document).delegate('div[data-role="page"]', 'swipeleft', function() {
			$(".ui-page").focus();
			if ($("#nav_panel").hasClass('ui-panel-closed')) {
				$("#kudos_panel").panel("open");
			} else {
				$("#nav_panel").panel("close");
			}
		});
		$(document).ajaxStart(function() {
			//$.mobile.loading('show', { text: 'loading', textVisible: true });
		});
		$(document).ajaxStop(function() {
			$.mobile.loading('hide');
		});
		window.onerror = function (error, url, line) {
			alert('Unhandled error: ' + JSON.stringify(error));
		}
		// by default show scrollbar on iscrollview,
		// explicitly set the vScroll option to false if it needs to
		// eg. $('#popup_kudos_form_label_container').data('mobileIscrollview').iscroll.options.vScrollbar = false;
		$.mobile.iscrollview.prototype.options.vScrollbar = true;
	}
	function allowCors () {
		$.support.cors = true;
		$.mobile.allowCrossDomainPages = true;
	}
	var templateNames = [
		'splash',
		'login',
		'dashboard',
		'dashboard-header',
		'dashboard-kudos-info',
		'kudos-feed',
		'kudos-feed-item',
		'kudos-details',
		'kudos-details-content',
		'leaderboards',
		'leaderboards-item',
		'people-register',
		'people-register-item',
		'user-details',
		'user-details-header',
		'user-details-basic-info',
		'user-details-kudos-history',
		'user-details-kudos-history-item',
		'page-header-no-sidebar',
		'page-header-with-sidebar',
		'left-sidebar',
		'give-kudos',
		'forgot-password',
		'settings',
		'settings-content',
		'notification-on-screen'
	];
	app.start = function () {
		//alert("app start")
		// CHANGE THIS TO USE SESSION/SESSIONLESS SYSTEM
		app.Config.setSessionMode(false);
		allowCors();
		setupEvents();
		app.Templates.loadTemplates(templateNames, function () {
			app.Router = new libs.Router();
			Backbone.history.start();
		});
	};

} (jQuery, App, Libs));


(function ($, app) {
	app.Config.host = function () {
		var local = "http://192.168.4.147:8082",
			stage = "http://apis.peopleprophet.stage4.bullseye.com.au",
			demo = "http://demo.apis.people-prophet.com",
			live = "http://apis.people-prophet.com";
		
		return live;
	};
} (jQuery, App));


(function(){var t=this;var e=t.Backbone;var i=[];var r=i.push;var s=i.slice;var n=i.splice;var a;if(typeof exports!=="undefined"){a=exports}else{a=t.Backbone={}}a.VERSION="1.0.0";var h=t._;if(!h&&typeof require!=="undefined")h=require("underscore");a.$=t.jQuery||t.Zepto||t.ender||t.$;a.noConflict=function(){t.Backbone=e;return this};a.emulateHTTP=false;a.emulateJSON=false;var o=a.Events={on:function(t,e,i){if(!l(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var r=this._events[t]||(this._events[t]=[]);r.push({callback:e,context:i,ctx:i||this});return this},once:function(t,e,i){if(!l(this,"once",t,[e,i])||!e)return this;var r=this;var s=h.once(function(){r.off(t,s);e.apply(this,arguments)});s._callback=e;return this.on(t,s,i)},off:function(t,e,i){var r,s,n,a,o,u,c,f;if(!this._events||!l(this,"off",t,[e,i]))return this;if(!t&&!e&&!i){this._events={};return this}a=t?[t]:h.keys(this._events);for(o=0,u=a.length;o<u;o++){t=a[o];if(n=this._events[t]){this._events[t]=r=[];if(e||i){for(c=0,f=n.length;c<f;c++){s=n[c];if(e&&e!==s.callback&&e!==s.callback._callback||i&&i!==s.context){r.push(s)}}}if(!r.length)delete this._events[t]}}return this},trigger:function(t){if(!this._events)return this;var e=s.call(arguments,1);if(!l(this,"trigger",t,e))return this;var i=this._events[t];var r=this._events.all;if(i)c(i,e);if(r)c(r,arguments);return this},stopListening:function(t,e,i){var r=this._listeners;if(!r)return this;var s=!e&&!i;if(typeof e==="object")i=this;if(t)(r={})[t._listenerId]=t;for(var n in r){r[n].off(e,i,this);if(s)delete this._listeners[n]}return this}};var u=/\s+/;var l=function(t,e,i,r){if(!i)return true;if(typeof i==="object"){for(var s in i){t[e].apply(t,[s,i[s]].concat(r))}return false}if(u.test(i)){var n=i.split(u);for(var a=0,h=n.length;a<h;a++){t[e].apply(t,[n[a]].concat(r))}return false}return true};var c=function(t,e){var i,r=-1,s=t.length,n=e[0],a=e[1],h=e[2];switch(e.length){case 0:while(++r<s)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<s)(i=t[r]).callback.call(i.ctx,n);return;case 2:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a);return;case 3:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a,h);return;default:while(++r<s)(i=t[r]).callback.apply(i.ctx,e)}};var f={listenTo:"on",listenToOnce:"once"};h.each(f,function(t,e){o[e]=function(e,i,r){var s=this._listeners||(this._listeners={});var n=e._listenerId||(e._listenerId=h.uniqueId("l"));s[n]=e;if(typeof i==="object")r=this;e[t](i,r,this);return this}});o.bind=o.on;o.unbind=o.off;h.extend(a,o);var d=a.Model=function(t,e){var i;var r=t||{};e||(e={});this.cid=h.uniqueId("c");this.attributes={};h.extend(this,h.pick(e,p));if(e.parse)r=this.parse(r,e)||{};if(i=h.result(this,"defaults")){r=h.defaults({},r,i)}this.set(r,e);this.changed={};this.initialize.apply(this,arguments)};var p=["url","urlRoot","collection"];h.extend(d.prototype,o,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(t){return h.clone(this.attributes)},sync:function(){return a.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return h.escape(this.get(t))},has:function(t){return this.get(t)!=null},set:function(t,e,i){var r,s,n,a,o,u,l,c;if(t==null)return this;if(typeof t==="object"){s=t;i=e}else{(s={})[t]=e}i||(i={});if(!this._validate(s,i))return false;n=i.unset;o=i.silent;a=[];u=this._changing;this._changing=true;if(!u){this._previousAttributes=h.clone(this.attributes);this.changed={}}c=this.attributes,l=this._previousAttributes;if(this.idAttribute in s)this.id=s[this.idAttribute];for(r in s){e=s[r];if(!h.isEqual(c[r],e))a.push(r);if(!h.isEqual(l[r],e)){this.changed[r]=e}else{delete this.changed[r]}n?delete c[r]:c[r]=e}if(!o){if(a.length)this._pending=true;for(var f=0,d=a.length;f<d;f++){this.trigger("change:"+a[f],this,c[a[f]],i)}}if(u)return this;if(!o){while(this._pending){this._pending=false;this.trigger("change",this,i)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,h.extend({},e,{unset:true}))},clear:function(t){var e={};for(var i in this.attributes)e[i]=void 0;return this.set(e,h.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!h.isEmpty(this.changed);return h.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?h.clone(this.changed):false;var e,i=false;var r=this._changing?this._previousAttributes:this.attributes;for(var s in t){if(h.isEqual(r[s],e=t[s]))continue;(i||(i={}))[s]=e}return i},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return h.clone(this._previousAttributes)},fetch:function(t){t=t?h.clone(t):{};if(t.parse===void 0)t.parse=true;var e=this;var i=t.success;t.success=function(r){if(!e.set(e.parse(r,t),t))return false;if(i)i(e,r,t);e.trigger("sync",e,r,t)};R(this,t);return this.sync("read",this,t)},save:function(t,e,i){var r,s,n,a=this.attributes;if(t==null||typeof t==="object"){r=t;i=e}else{(r={})[t]=e}if(r&&(!i||!i.wait)&&!this.set(r,i))return false;i=h.extend({validate:true},i);if(!this._validate(r,i))return false;if(r&&i.wait){this.attributes=h.extend({},a,r)}if(i.parse===void 0)i.parse=true;var o=this;var u=i.success;i.success=function(t){o.attributes=a;var e=o.parse(t,i);if(i.wait)e=h.extend(r||{},e);if(h.isObject(e)&&!o.set(e,i)){return false}if(u)u(o,t,i);o.trigger("sync",o,t,i)};R(this,i);s=this.isNew()?"create":i.patch?"patch":"update";if(s==="patch")i.attrs=r;n=this.sync(s,this,i);if(r&&i.wait)this.attributes=a;return n},destroy:function(t){t=t?h.clone(t):{};var e=this;var i=t.success;var r=function(){e.trigger("destroy",e,e.collection,t)};t.success=function(s){if(t.wait||e.isNew())r();if(i)i(e,s,t);if(!e.isNew())e.trigger("sync",e,s,t)};if(this.isNew()){t.success();return false}R(this,t);var s=this.sync("delete",this,t);if(!t.wait)r();return s},url:function(){var t=h.result(this,"urlRoot")||h.result(this.collection,"url")||U();if(this.isNew())return t;return t+(t.charAt(t.length-1)==="/"?"":"/")+encodeURIComponent(this.id)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==null},isValid:function(t){return this._validate({},h.extend(t||{},{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=h.extend({},this.attributes,t);var i=this.validationError=this.validate(t,e)||null;if(!i)return true;this.trigger("invalid",this,i,h.extend(e||{},{validationError:i}));return false}});var v=["keys","values","pairs","invert","pick","omit"];h.each(v,function(t){d.prototype[t]=function(){var e=s.call(arguments);e.unshift(this.attributes);return h[t].apply(h,e)}});var g=a.Collection=function(t,e){e||(e={});if(e.url)this.url=e.url;if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,h.extend({silent:true},e))};var m={add:true,remove:true,merge:true};var y={add:true,merge:false,remove:false};h.extend(g.prototype,o,{model:d,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return a.sync.apply(this,arguments)},add:function(t,e){return this.set(t,h.defaults(e||{},y))},remove:function(t,e){t=h.isArray(t)?t.slice():[t];e||(e={});var i,r,s,n;for(i=0,r=t.length;i<r;i++){n=this.get(t[i]);if(!n)continue;delete this._byId[n.id];delete this._byId[n.cid];s=this.indexOf(n);this.models.splice(s,1);this.length--;if(!e.silent){e.index=s;n.trigger("remove",n,this,e)}this._removeReference(n)}return this},set:function(t,e){e=h.defaults(e||{},m);if(e.parse)t=this.parse(t,e);if(!h.isArray(t))t=t?[t]:[];var i,s,a,o,u,l;var c=e.at;var f=this.comparator&&c==null&&e.sort!==false;var d=h.isString(this.comparator)?this.comparator:null;var p=[],v=[],g={};for(i=0,s=t.length;i<s;i++){if(!(a=this._prepareModel(t[i],e)))continue;if(u=this.get(a)){if(e.remove)g[u.cid]=true;if(e.merge){u.set(a.attributes,e);if(f&&!l&&u.hasChanged(d))l=true}}else if(e.add){p.push(a);a.on("all",this._onModelEvent,this);this._byId[a.cid]=a;if(a.id!=null)this._byId[a.id]=a}}if(e.remove){for(i=0,s=this.length;i<s;++i){if(!g[(a=this.models[i]).cid])v.push(a)}if(v.length)this.remove(v,e)}if(p.length){if(f)l=true;this.length+=p.length;if(c!=null){n.apply(this.models,[c,0].concat(p))}else{r.apply(this.models,p)}}if(l)this.sort({silent:true});if(e.silent)return this;for(i=0,s=p.length;i<s;i++){(a=p[i]).trigger("add",a,this,e)}if(l)this.trigger("sort",this,e);return this},reset:function(t,e){e||(e={});for(var i=0,r=this.models.length;i<r;i++){this._removeReference(this.models[i])}e.previousModels=this.models;this._reset();this.add(t,h.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return this},push:function(t,e){t=this._prepareModel(t,e);this.add(t,h.extend({at:this.length},e));return t},pop:function(t){var e=this.at(this.length-1);this.remove(e,t);return e},unshift:function(t,e){t=this._prepareModel(t,e);this.add(t,h.extend({at:0},e));return t},shift:function(t){var e=this.at(0);this.remove(e,t);return e},slice:function(t,e){return this.models.slice(t,e)},get:function(t){if(t==null)return void 0;return this._byId[t.id!=null?t.id:t.cid||t]},at:function(t){return this.models[t]},where:function(t,e){if(h.isEmpty(t))return e?void 0:[];return this[e?"find":"filter"](function(e){for(var i in t){if(t[i]!==e.get(i))return false}return true})},findWhere:function(t){return this.where(t,true)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");t||(t={});if(h.isString(this.comparator)||this.comparator.length===1){this.models=this.sortBy(this.comparator,this)}else{this.models.sort(h.bind(this.comparator,this))}if(!t.silent)this.trigger("sort",this,t);return this},sortedIndex:function(t,e,i){e||(e=this.comparator);var r=h.isFunction(e)?e:function(t){return t.get(e)};return h.sortedIndex(this.models,t,r,i)},pluck:function(t){return h.invoke(this.models,"get",t)},fetch:function(t){t=t?h.clone(t):{};if(t.parse===void 0)t.parse=true;var e=t.success;var i=this;t.success=function(r){var s=t.reset?"reset":"set";i[s](r,t);if(e)e(i,r,t);i.trigger("sync",i,r,t)};R(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?h.clone(e):{};if(!(t=this._prepareModel(t,e)))return false;if(!e.wait)this.add(t,e);var i=this;var r=e.success;e.success=function(s){if(e.wait)i.add(t,e);if(r)r(t,s,e)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(t instanceof d){if(!t.collection)t.collection=this;return t}e||(e={});e.collection=this;var i=new this.model(t,e);if(!i._validate(t,e)){this.trigger("invalid",this,t,e);return false}return i},_removeReference:function(t){if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(e&&t==="change:"+e.idAttribute){delete this._byId[e.previous(e.idAttribute)];if(e.id!=null)this._byId[e.id]=e}this.trigger.apply(this,arguments)}});var _=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","indexOf","shuffle","lastIndexOf","isEmpty","chain"];h.each(_,function(t){g.prototype[t]=function(){var e=s.call(arguments);e.unshift(this.models);return h[t].apply(h,e)}});var w=["groupBy","countBy","sortBy"];h.each(w,function(t){g.prototype[t]=function(e,i){var r=h.isFunction(e)?e:function(t){return t.get(e)};return h[t](this.models,r,i)}});var b=a.View=function(t){this.cid=h.uniqueId("view");this._configure(t||{});this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()};var x=/^(\S+)\s*(.*)$/;var E=["model","collection","el","id","attributes","className","tagName","events"];h.extend(b.prototype,o,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();this.stopListening();return this},setElement:function(t,e){if(this.$el)this.undelegateEvents();this.$el=t instanceof a.$?t:a.$(t);this.el=this.$el[0];if(e!==false)this.delegateEvents();return this},delegateEvents:function(t){if(!(t||(t=h.result(this,"events"))))return this;this.undelegateEvents();for(var e in t){var i=t[e];if(!h.isFunction(i))i=this[t[e]];if(!i)continue;var r=e.match(x);var s=r[1],n=r[2];i=h.bind(i,this);s+=".delegateEvents"+this.cid;if(n===""){this.$el.on(s,i)}else{this.$el.on(s,n,i)}}return this},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid);return this},_configure:function(t){if(this.options)t=h.extend({},h.result(this,"options"),t);h.extend(this,h.pick(t,E));this.options=t},_ensureElement:function(){if(!this.el){var t=h.extend({},h.result(this,"attributes"));if(this.id)t.id=h.result(this,"id");if(this.className)t["class"]=h.result(this,"className");var e=a.$("<"+h.result(this,"tagName")+">").attr(t);this.setElement(e,false)}else{this.setElement(h.result(this,"el"),false)}}});a.sync=function(t,e,i){var r=k[t];h.defaults(i||(i={}),{emulateHTTP:a.emulateHTTP,emulateJSON:a.emulateJSON});var s={type:r,dataType:"json"};if(!i.url){s.url=h.result(e,"url")||U()}if(i.data==null&&e&&(t==="create"||t==="update"||t==="patch")){s.contentType="application/json";s.data=JSON.stringify(i.attrs||e.toJSON(i))}if(i.emulateJSON){s.contentType="application/x-www-form-urlencoded";s.data=s.data?{model:s.data}:{}}if(i.emulateHTTP&&(r==="PUT"||r==="DELETE"||r==="PATCH")){s.type="POST";if(i.emulateJSON)s.data._method=r;var n=i.beforeSend;i.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",r);if(n)return n.apply(this,arguments)}}if(s.type!=="GET"&&!i.emulateJSON){s.processData=false}if(s.type==="PATCH"&&window.ActiveXObject&&!(window.external&&window.external.msActiveXFilteringEnabled)){s.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")}}var o=i.xhr=a.ajax(h.extend(s,i));e.trigger("request",e,o,i);return o};var k={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};a.ajax=function(){return a.$.ajax.apply(a.$,arguments)};var S=a.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var $=/\((.*?)\)/g;var T=/(\(\?)?:\w+/g;var H=/\*\w+/g;var A=/[\-{}\[\]+?.,\\\^$|#\s]/g;h.extend(S.prototype,o,{initialize:function(){},route:function(t,e,i){if(!h.isRegExp(t))t=this._routeToRegExp(t);if(h.isFunction(e)){i=e;e=""}if(!i)i=this[e];var r=this;a.history.route(t,function(s){var n=r._extractParameters(t,s);i&&i.apply(r,n);r.trigger.apply(r,["route:"+e].concat(n));r.trigger("route",e,n);a.history.trigger("route",r,e,n)});return this},navigate:function(t,e){a.history.navigate(t,e);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=h.result(this,"routes");var t,e=h.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(A,"\\$&").replace($,"(?:$1)?").replace(T,function(t,e){return e?t:"([^/]+)"}).replace(H,"(.*?)");return new RegExp("^"+t+"$")},_extractParameters:function(t,e){var i=t.exec(e).slice(1);return h.map(i,function(t){return t?decodeURIComponent(t):null})}});var I=a.History=function(){this.handlers=[];h.bindAll(this,"checkUrl");if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var N=/^[#\/]|\s+$/g;var P=/^\/+|\/+$/g;var O=/msie [\w.]+/;var C=/\/$/;I.started=false;h.extend(I.prototype,o,{interval:50,getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getFragment:function(t,e){if(t==null){if(this._hasPushState||!this._wantsHashChange||e){t=this.location.pathname;var i=this.root.replace(C,"");if(!t.indexOf(i))t=t.substr(i.length)}else{t=this.getHash()}}return t.replace(N,"")},start:function(t){if(I.started)throw new Error("Backbone.history has already been started");I.started=true;this.options=h.extend({},{root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var e=this.getFragment();var i=document.documentMode;var r=O.exec(navigator.userAgent.toLowerCase())&&(!i||i<=7);this.root=("/"+this.root+"/").replace(P,"/");if(r&&this._wantsHashChange){this.iframe=a.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;this.navigate(e)}if(this._hasPushState){a.$(window).on("popstate",this.checkUrl)}else if(this._wantsHashChange&&"onhashchange"in window&&!r){a.$(window).on("hashchange",this.checkUrl)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}this.fragment=e;var s=this.location;var n=s.pathname.replace(/[^\/]$/,"$&/")===this.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!n){this.fragment=this.getFragment(null,true);this.location.replace(this.root+this.location.search+"#"+this.fragment);return true}else if(this._wantsPushState&&this._hasPushState&&n&&s.hash){this.fragment=this.getHash().replace(N,"");this.history.replaceState({},document.title,this.root+this.fragment+s.search)}if(!this.options.silent)return this.loadUrl()},stop:function(){a.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl);clearInterval(this._checkUrlInterval);I.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getFragment(this.getHash(this.iframe))}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()||this.loadUrl(this.getHash())},loadUrl:function(t){var e=this.fragment=this.getFragment(t);var i=h.any(this.handlers,function(t){if(t.route.test(e)){t.callback(e);return true}});return i},navigate:function(t,e){if(!I.started)return false;if(!e||e===true)e={trigger:e};t=this.getFragment(t||"");if(this.fragment===t)return;this.fragment=t;var i=this.root+t;if(this._hasPushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,i)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getFragment(this.getHash(this.iframe))){if(!e.replace)this.iframe.document.open().close();this._updateHash(this.iframe.location,t,e.replace)}}else{return this.location.assign(i)}if(e.trigger)this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else{t.hash="#"+e}}});a.history=new I;var j=function(t,e){var i=this;var r;if(t&&h.has(t,"constructor")){r=t.constructor}else{r=function(){return i.apply(this,arguments)}}h.extend(r,i,e);var s=function(){this.constructor=r};s.prototype=i.prototype;r.prototype=new s;if(t)h.extend(r.prototype,t);r.__super__=i.prototype;return r};d.extend=g.extend=S.extend=b.extend=I.extend=j;var U=function(){throw new Error('A "url" property or function must be specified')};var R=function(t,e){var i=e.error;e.error=function(r){if(i)i(t,r,e);t.trigger("error",t,r,e)}}}).call(this);
/*
//@ sourceMappingURL=backbone-min.map
*/

/*yepnope1.5.x|WTFPL*/
(function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);

(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,d=e.filter,g=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,_=Object.keys,j=i.bind,w=function(n){return n instanceof w?n:this instanceof w?(this._wrapped=n,void 0):new w(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=w),exports._=w):n._=w,w.VERSION="1.4.4";var A=w.each=w.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a in n)if(w.has(n,a)&&t.call(e,n[a],a,n)===r)return};w.map=w.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e[e.length]=t.call(r,n,u,i)}),e)};var O="Reduce of empty array with no initial value";w.reduce=w.foldl=w.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=w.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},w.reduceRight=w.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=w.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=w.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},w.find=w.detect=function(n,t,r){var e;return E(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},w.filter=w.select=function(n,t,r){var e=[];return null==n?e:d&&n.filter===d?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&(e[e.length]=n)}),e)},w.reject=function(n,t,r){return w.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},w.every=w.all=function(n,t,e){t||(t=w.identity);var u=!0;return null==n?u:g&&n.every===g?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var E=w.some=w.any=function(n,t,e){t||(t=w.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};w.contains=w.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:E(n,function(n){return n===t})},w.invoke=function(n,t){var r=o.call(arguments,2),e=w.isFunction(t);return w.map(n,function(n){return(e?t:n[t]).apply(n,r)})},w.pluck=function(n,t){return w.map(n,function(n){return n[t]})},w.where=function(n,t,r){return w.isEmpty(t)?r?null:[]:w[r?"find":"filter"](n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},w.findWhere=function(n,t){return w.where(n,t,!0)},w.max=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.max.apply(Math,n);if(!t&&w.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>=e.computed&&(e={value:n,computed:a})}),e.value},w.min=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.min.apply(Math,n);if(!t&&w.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;e.computed>a&&(e={value:n,computed:a})}),e.value},w.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=w.random(r++),e[r-1]=e[t],e[t]=n}),e};var k=function(n){return w.isFunction(n)?n:function(t){return t[n]}};w.sortBy=function(n,t,r){var e=k(t);return w.pluck(w.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index<t.index?-1:1}),"value")};var F=function(n,t,r,e){var u={},i=k(t||w.identity);return A(n,function(t,a){var o=i.call(r,t,a,n);e(u,o,t)}),u};w.groupBy=function(n,t,r){return F(n,t,r,function(n,t,r){(w.has(n,t)?n[t]:n[t]=[]).push(r)})},w.countBy=function(n,t,r){return F(n,t,r,function(n,t){w.has(n,t)||(n[t]=0),n[t]++})},w.sortedIndex=function(n,t,r,e){r=null==r?w.identity:k(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;u>r.call(e,n[o])?i=o+1:a=o}return i},w.toArray=function(n){return n?w.isArray(n)?o.call(n):n.length===+n.length?w.map(n,w.identity):w.values(n):[]},w.size=function(n){return null==n?0:n.length===+n.length?n.length:w.keys(n).length},w.first=w.head=w.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},w.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},w.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},w.rest=w.tail=w.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},w.compact=function(n){return w.filter(n,w.identity)};var R=function(n,t,r){return A(n,function(n){w.isArray(n)?t?a.apply(r,n):R(n,t,r):r.push(n)}),r};w.flatten=function(n,t){return R(n,t,[])},w.without=function(n){return w.difference(n,o.call(arguments,1))},w.uniq=w.unique=function(n,t,r,e){w.isFunction(t)&&(e=r,r=t,t=!1);var u=r?w.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:w.contains(a,r))||(a.push(r),i.push(n[e]))}),i},w.union=function(){return w.uniq(c.apply(e,arguments))},w.intersection=function(n){var t=o.call(arguments,1);return w.filter(w.uniq(n),function(n){return w.every(t,function(t){return w.indexOf(t,n)>=0})})},w.difference=function(n){var t=c.apply(e,o.call(arguments,1));return w.filter(n,function(n){return!w.contains(t,n)})},w.zip=function(){for(var n=o.call(arguments),t=w.max(w.pluck(n,"length")),r=Array(t),e=0;t>e;e++)r[e]=w.pluck(n,""+e);return r},w.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},w.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=w.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},w.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},w.range=function(n,t,r){1>=arguments.length&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=Array(e);e>u;)i[u++]=n,n+=r;return i},w.bind=function(n,t){if(n.bind===j&&j)return j.apply(n,o.call(arguments,1));var r=o.call(arguments,2);return function(){return n.apply(t,r.concat(o.call(arguments)))}},w.partial=function(n){var t=o.call(arguments,1);return function(){return n.apply(this,t.concat(o.call(arguments)))}},w.bindAll=function(n){var t=o.call(arguments,1);return 0===t.length&&(t=w.functions(n)),A(t,function(t){n[t]=w.bind(n[t],n)}),n},w.memoize=function(n,t){var r={};return t||(t=w.identity),function(){var e=t.apply(this,arguments);return w.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},w.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},w.defer=function(n){return w.delay.apply(w,[n,1].concat(o.call(arguments,1)))},w.throttle=function(n,t){var r,e,u,i,a=0,o=function(){a=new Date,u=null,i=n.apply(r,e)};return function(){var c=new Date,l=t-(c-a);return r=this,e=arguments,0>=l?(clearTimeout(u),u=null,a=c,i=n.apply(r,e)):u||(u=setTimeout(o,l)),i}},w.debounce=function(n,t,r){var e,u;return function(){var i=this,a=arguments,o=function(){e=null,r||(u=n.apply(i,a))},c=r&&!e;return clearTimeout(e),e=setTimeout(o,t),c&&(u=n.apply(i,a)),u}},w.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},w.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},w.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},w.after=function(n,t){return 0>=n?t():function(){return 1>--n?t.apply(this,arguments):void 0}},w.keys=_||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)w.has(n,r)&&(t[t.length]=r);return t},w.values=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push(n[r]);return t},w.pairs=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push([r,n[r]]);return t},w.invert=function(n){var t={};for(var r in n)w.has(n,r)&&(t[n[r]]=r);return t},w.functions=w.methods=function(n){var t=[];for(var r in n)w.isFunction(n[r])&&t.push(r);return t.sort()},w.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},w.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},w.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)w.contains(r,u)||(t[u]=n[u]);return t},w.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)null==n[r]&&(n[r]=t[r])}),n},w.clone=function(n){return w.isObject(n)?w.isArray(n)?n.slice():w.extend({},n):n},w.tap=function(n,t){return t(n),n};var I=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof w&&(n=n._wrapped),t instanceof w&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==t+"";case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;r.push(n),e.push(t);var a=0,o=!0;if("[object Array]"==u){if(a=n.length,o=a==t.length)for(;a--&&(o=I(n[a],t[a],r,e)););}else{var c=n.constructor,f=t.constructor;if(c!==f&&!(w.isFunction(c)&&c instanceof c&&w.isFunction(f)&&f instanceof f))return!1;for(var s in n)if(w.has(n,s)&&(a++,!(o=w.has(t,s)&&I(n[s],t[s],r,e))))break;if(o){for(s in t)if(w.has(t,s)&&!a--)break;o=!a}}return r.pop(),e.pop(),o};w.isEqual=function(n,t){return I(n,t,[],[])},w.isEmpty=function(n){if(null==n)return!0;if(w.isArray(n)||w.isString(n))return 0===n.length;for(var t in n)if(w.has(n,t))return!1;return!0},w.isElement=function(n){return!(!n||1!==n.nodeType)},w.isArray=x||function(n){return"[object Array]"==l.call(n)},w.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){w["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),w.isArguments(arguments)||(w.isArguments=function(n){return!(!n||!w.has(n,"callee"))}),"function"!=typeof/./&&(w.isFunction=function(n){return"function"==typeof n}),w.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},w.isNaN=function(n){return w.isNumber(n)&&n!=+n},w.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},w.isNull=function(n){return null===n},w.isUndefined=function(n){return n===void 0},w.has=function(n,t){return f.call(n,t)},w.noConflict=function(){return n._=t,this},w.identity=function(n){return n},w.times=function(n,t,r){for(var e=Array(n),u=0;n>u;u++)e[u]=t.call(r,u);return e},w.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))};var M={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};M.unescape=w.invert(M.escape);var S={escape:RegExp("["+w.keys(M.escape).join("")+"]","g"),unescape:RegExp("("+w.keys(M.unescape).join("|")+")","g")};w.each(["escape","unescape"],function(n){w[n]=function(t){return null==t?"":(""+t).replace(S[n],function(t){return M[n][t]})}}),w.result=function(n,t){if(null==n)return null;var r=n[t];return w.isFunction(r)?r.call(n):r},w.mixin=function(n){A(w.functions(n),function(t){var r=w[t]=n[t];w.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),D.call(this,r.apply(w,n))}})};var N=0;w.uniqueId=function(n){var t=++N+"";return n?n+t:t},w.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var T=/(.)^/,q={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},B=/\\|'|\r|\n|\t|\u2028|\u2029/g;w.template=function(n,t,r){var e;r=w.defaults({},r,w.templateSettings);var u=RegExp([(r.escape||T).source,(r.interpolate||T).source,(r.evaluate||T).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(B,function(n){return"\\"+q[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,w);var c=function(n){return e.call(this,n,w)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},w.chain=function(n){return w(n).chain()};var D=function(n){return this._chain?w(n).chain():n};w.mixin(w),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];w.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],D.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];w.prototype[n]=function(){return D.call(this,t.apply(this._wrapped,arguments))}}),w.extend(w.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);

(function (app, libs) {
	libs.Models.ModulePermissionResponseModel = Backbone.Model.extend({
		clientId: null,
		defaults: {
			IsSuccess: false,
			Message: ''
		},
		url: function () {
			return app.Config.authorizedApiUrl() + '/modulePermission?clientId=' + this.clientId;
		}
	});
}(App, Libs));

(function (app, libs) {
	libs.Models.LeaderboardsItemModel = libs.Models.EmployeeProfileModel.extend({});
	libs.Models.LeaderboardsCollection = Backbone.Collection.extend({
		model: libs.Models.LeaderboardsItemModel,
		url: function () {
			return app.Config.authorizedApiUrl() + '/kudosleaderboard';
		},
		loadActive: function () {
			this.periodType = 1;
			this.fetchData();
		},
		loadAllTime: function () {
			this.periodType = 0;
			this.fetchData();
		},
		loadThisMonth: function () {
			this.periodType = 3;
			this.fetchData();
		},
		fetchData: function () {
			this.fetch({ data: { kudosCalculationPeriod: this.periodType }, reset: true });
		},
		setDisplayedKudos: function () {
			var that = this;
			this.each(function (item) {
				switch (that.periodType) {
					case 1: item.set('displayedKudos', item.get('ActiveKudos')); break;
					case 0: item.set('displayedKudos', item.get('AllTimeKudos')); break;
					case 3: item.set('displayedKudos', item.get('ThisMonthKudos')); break;
					default: item.set('displayedKudos', {}); break;
				};
			});
		}
	});
} (App, Libs));

(function (app, libs) {
	libs.Models.EmployeeProfileModel = Backbone.Model.extend({
		idAttribute: 'ProfileUserId',
		defaults: {
			RegisteredUserId: 0,
			ProfileUserId: '',
			AvatarUrl: '/assets/images/avatar_big.png',
			Email: '',
			FirstName: '',
			LastName: '',
			MiddleName: '',
			KnownAs: '',
			FullName: '',
			ActiveKudos: {},
			AllTimeKudos: {},
			ThisMonthKudos: {},
			ActiveGivenKudos: {},
			Rank: 0,
			RankTotal: 0,
			DateJoined: '',
			DateJoinedDisplay: ''
		},
		url: function () {
			return app.Config.authorizedApiUrl() + '/employees?uid=' + this.id;
		}
	});
	libs.Models.EmployeeProfileCollection = Backbone.Collection.extend({
		page: 0,
		numberOfRows: 9,
		searchTerm: '',
		model: libs.Models.EmployeeProfileModel,
		url: function () {
			return app.Config.authorizedApiUrl() + '/employees';
		},
		search: function (searchTerm) {
			var that = this;
			this.page = 0;
			this.searchTerm = searchTerm;
			this.fetch({ data: { page: that.page, numberOfRows: that.numberOfRows, searchTerm: that.searchTerm }, reset: true});
		},
		clearSearch: function () {
			this.search('');
		},
		loadMore: function (callback) {
			var that = this;
			this.fetch({ data: { page: ++that.page, numberOfRows: that.numberOfRows, searchTerm: that.searchTerm }, success: function(model, response){ callback(); }});
		}
	});
} (App, Libs));

(function (app, libs) {
	libs.Models.SecurityQuestionModel = Backbone.Model.extend({
		idAttribute: 'id',
		defaults: {
			id: -1,
			Email: '',
			Question: '',
			Answer: '',
			Attempt: 0
		},
		url: function () {
			return app.Config.apiUrl() + '/securityquestion';
		}
	});
} (App, Libs));


(function (app, libs) {
	libs.Models.PingModel = Backbone.Model.extend({
		defaults: {
			IsSuccess: false,
			Message: ''
		},
		url: function () {
			return app.Config.apiUrl() + '/ping';
		}
	});
}(App, Libs));

var oldCollectionFetch = Backbone.Collection.prototype.fetch;
Backbone.Collection.prototype.fetch = function(options) {
	$.mobile.loading('show', { text: 'loading', textVisible: true });
	oldCollectionFetch.call(this, options);
};


var oldModelFetch = Backbone.Model.prototype.fetch;
Backbone.Model.prototype.fetch = function(options) {
	$.mobile.loading('show', { text: 'loading', textVisible: true });
	oldModelFetch.call(this, options);
};


(function (app, libs) {
	libs.Models.SettingsModel = Backbone.Model.extend({
		defaults: {
			MobileDeviceId: 0,
			MobileSettingsId: 0,
			NotificationScope: 1,
			RegistrationId: "",
			SendNotifications: false,
			UserId: 0
		},
		url: function () {
			return app.Config.authorizedApiUrl() + '/settings';
		}
	});
}(App, Libs));

(function (app, libs) {
	libs.Models.KudosModel = Backbone.Model.extend({
		idAttribute: 'KudosPointsAwardedId',
		defaults: {
			KudosPointsAwardedId: 0,
			AwardedByRegisteredUserId: 0,
			AwardedToRegisteredUserId: 0,
			PointsAwarded: 0,
			WhyPointsWereAwarded: '',
			EntityId: 0,
			AwardedByEmployeeProfile: {
				AvatarUrl: '/assets/images/avatar_big.png'
			},
			AwardedToEmployeeProfile: {
				ActiveKudos: { Value: 0, Count: 0 },
				AvatarUrl: '/assets/images/avatar_big.png'
			},
			DatePointsAwarded: {},
			DisplayedDatePointsAwarded: '',
			LocalDatePointsAwarded: {},
			DisplayedLocalDatePointsAwarded: '',
			LocalDatePointsAwardedLabel: '',
			KudosLabels: [],
			IsReceivedKudos: false
		},
		url: function () {
			return app.Config.authorizedApiUrl() + '/kudos?kudosid=' + this.id;
		}
	});
	libs.Models.KudosFeedCollection = Backbone.Collection.extend({
		model: libs.Models.KudosModel,
		initialize: function () {

		},
		upperPivot: function () {
			if (this.models && this.models.length > 0) {
				var upper = this.max(function (item) {
					return item.get('KudosPointsAwardedId');
				});
				if (upper) {
					return parseInt(upper.get('KudosPointsAwardedId'), 10);
				} else {
					return 0;
				}
			} else {
				return 0;
			}
		},
		lowerPivot: function () {
			if (this.models && this.models.length > 0) {
				var lower = this.min(function (item) {
					return item.get('KudosPointsAwardedId');
				});
				if (lower) {
					return parseInt(lower.get('KudosPointsAwardedId'), 10);
				} else {
					return 0;
				}
			} else {
				return 0;
			}
		},
		url: function () {
			return app.Config.authorizedApiUrl() + '/kudos';
			//?upperPivot=' + this.upperPivot() + '&lowerPivot=' + this.lowerPivot();
		},
		loadFirst: function (callback) {
			this.prevUpperPivot = 9007199254740992;
			if (this.profileUserId) {
				this.fetch({
					data: { uid: this.profileUserId, upperPivot: 0, lowerPivot: 0 },
					reset: false,
					success: function () { if (callback) callback(); }
				});
			} else {
				this.fetch({
					data: { upperPivot: 0, lowerPivot: 0 },
					reset: false,
					success: function () { if (callback) callback(); }
				});
			}
		},
		loadMore: function (callback) {
			this.prevLowerPivot = this.lowerPivot();
			if (this.profileUserId) {
				this.fetch({
					data: { uid: this.profileUserId, upperPivot: 0, lowerPivot: this.lowerPivot() },
					remove: false,
					success: function () { if (callback) callback(); }
				});
			} else {
				this.fetch({
					data: { upperPivot: 0, lowerPivot: this.lowerPivot() },
					remove: false,
					success: function () { if (callback) callback(); }
				});
			}
		},
		loadRecent: function (callback) {
			this.prevUpperPivot = this.upperPivot();
			if (this.profileUserId) {
				this.fetch({
					data: { uid: this.profileUserId, upperPivot: this.upperPivot(), lowerPivot: 0 },
					remove: false,
					success: function () { if (callback) callback(); }
				});
			} else {
				this.fetch({
					data: { upperPivot: this.upperPivot(), lowerPivot: 0 },
					remove: false,
					success: function () { if (callback) callback(); }
				});
			}
		}
	});
	libs.Models.GiveKudosLookupModel = Backbone.Model.extend({
		url: function () {
			return app.Config.authorizedApiUrl() + '/employees';
		}
	});
	libs.Models.GiveKudosModel = Backbone.Model.extend({
		idAttribute: 'Id',
		defaults: {
			Id: 123, // TODO: ???? why not null or -1 instead
			From: '',
			To: '',
			Reason: '',
			Labels: []
		},
		url: function () {
			return app.Config.authorizedApiUrl() + '/kudos';
		}
	});
	libs.Models.KudosLabelModel = Backbone.Model.extend({
		defaults: { },
		url: function () {
			return app.Config.authorizedApiUrl() + '/kudoslabels?id=' + this.id;
		}
	});
	libs.Models.KudosLabelCollection = Backbone.Collection.extend({
		model: libs.Models.KudosLabelModel,
		url: function () {
			return app.Config.authorizedApiUrl() + '/kudoslabels';
		}
	});
} (App, Libs));


(function (app, libs) {
	libs.Models.LoginModel = Backbone.Model.extend({
		idAttribute: 'id',
		defaults: {
			id: 123,
			Username: '',
			Password: ''
		},
		url: function () {
			return app.Config.apiUrl() + '/account';
		}
	});
} (App, Libs));

(function ($, app, libs) {
	libs.Views.KudosLeaderboardsItemView = Backbone.View.extend({
		tagName: 'li',
		render: function () {
			var that = this;
			var rawTemplate = App.Templates.get('leaderboards-item');
			that.$el.html(_.template(rawTemplate, this.model.toJSON()));
			return this;
		}
	});
	libs.Views.KudosLeaderboardsView = Libs.Views.PageView.extend({
		tagName: 'div',
		initialize: function () {
			_.bindAll(this, 'render');
			this.collection.bind('reset', this.renderItems, this);
		},
		render: function () {
			var that = this;
			var rawTemplate = App.Templates.get('leaderboards');
			that.$el.html(_.template(rawTemplate));
			that.$el.attr('data-role', 'page');
			that.$el.attr('data-theme', 'a');
			that.$el.attr('id', 'page_leaderboards');
			that.$el.find("#leaderboard_tab_" + that.activeTab).attr('href', 'javascript:void(0);').addClass("ui-btn-active");
			that.renderPageHeader(true, 'Leaderboards');
			that.renderSidebarPanel();
			that.renderGiveKudos();
			that.renderItems();
			return this;
		},
		renderItems: function () {
			var that = this,
				list,
				container = that.$el.find('#leaderboard_container');
			this.collection.setDisplayedKudos();
			list = $('<ul id="leaderboard_listview" class="listview-like-wrapper"></ul>');
			container.html(list);
			this.collection.each(function (item) {
				var itemView = new libs.Views.KudosLeaderboardsItemView({
					model: item
				});
				var itemTemplate = itemView.render();
				list.append(itemTemplate.$el);
			});
			container.trigger("create");
			that.setupPageHeight();
		},
		setupPageHeight: function() {
				var windowSize = {
						height: 0,
						width: 0,
						headersHeight: 0,
						tabGroupHeight: 0,
						mainHeight: 0,
						offset: 50,
						rankcellWidth: 10,
						avatarcellWidth: 15,
						fullnamecellWidth: 50,
						kudospointcellWidth: 25,
						setDimensions: function(){
								windowSize.height = $('body').height();
								windowSize.width = $('body').width();
								windowSize.headersHeight = $('.pp-fix-header').height();
								windowSize.tabGroupHeight = $('#leaderboard_type').height();
								windowSize.mainHeight = windowSize.height - windowSize.headersHeight - windowSize.tabGroupHeight - windowSize.offset;
								windowSize.updateSizes();
						},
						updateSizes: function(){
								var numOfColMultipier = $('.avatar-cell:visible').length ? 2 : 1;
								var onePerTenSize = windowSize.mainHeight/10;

								$('#leaderboard_listview').find('.cell').css('height', onePerTenSize+'px');
								$('.rank-cell').css('width', onePerTenSize + 'px');
								$('.avatar-cell').css('width', onePerTenSize + 'px');
								$('.fullname-cell').css('width', windowSize.width*(windowSize.fullnamecellWidth/100) + 'px');
								$('.kudos-point-cell').css('width', windowSize.width - (numOfColMultipier * onePerTenSize) - (windowSize.width*(windowSize.fullnamecellWidth/100))  + 'px');
						},
						init: function(){
								if($('#leaderboard_listview').length){
										windowSize.setDimensions();
										$(window).resize(function() {
												windowSize.setDimensions();
										});
								}
						}
				};

				windowSize.init();
		}
	});
} (jQuery, App, Libs));


(function ($, app, libs) {
	libs.Views.DashboardHeaderView = Backbone.View.extend({
		feedUpdateCount: 0,
		tagName: 'div',
		events: {
			'click #kudos_notification': 'loadRecent'
		},
		initialize: function () {
			_.bindAll(this, 'render');
			this.model.bind('change', this.render, this);
		},
		render: function () {
			var that = this;
			var rawTemplate = App.Templates.get('dashboard-header');
			that.$el.html(_.template(rawTemplate, this.model.toJSON()));
			that.$el.attr('id', 'dashboard_fixed_top');
			return this;
		},
		renderFeedUpdateCount: function() {
			var that = this,
				bar = that.$el.find("#kudos_notification");
			that.feedUpdateCount++;
			bar.find("p").html(that.feedUpdateCount);

			if (bar.is(":hidden")) {
				bar.slideDown();
			}

			return this;
		},
		resetFeedUpdateCount: function() {
			var that = this;
			that.feedUpdateCount = 0;

			return this;
		},
		loadRecent: function (event, data) {
			this.$el.find("#kudos_notification").slideUp();
			app.Views.DashboardView.loadRecent();
		}
	});
	libs.Views.DashboardKudosInfoView = Backbone.View.extend({
		tagName: 'div',
		initialize: function () {
			_.bindAll(this, 'render');
			this.model.bind('change', this.render, this);
		},
		render: function () {
			var that = this;
			var rawTemplate = App.Templates.get('dashboard-kudos-info');
			that.$el.html(_.template(rawTemplate, this.model.toJSON()));
			that.$el.attr('id', 'dashboard_kudos_details');
			that.$el.addClass('page-detailed-section');
			return this;
		}
	});
	libs.Views.DashboardView = Libs.Views.PageView.extend({
		tagName: 'div',
		render: function () {
			var that = this;
			var rawTemplate = App.Templates.get('dashboard');
			that.$el.html(_.template(rawTemplate));
			that.$el.addClass('jqm-demos ui-responsive-panel');
			that.$el.attr('data-role', 'page');
			that.$el.attr('data-theme', 'a');
			that.$el.attr('id', 'page_dashboard');
			that.renderPageHeader(true, 'Dashboard');
			that.renderHeader();
			that.renderKudosInfo();
			that.renderKudosFeed();
			that.renderSidebarPanel();
			that.renderGiveKudos();
			return this;
		},
		loadData: function () {
			this.kudosFeedView.loadData();

            app.Views.DashboardView.dashboardHeaderView.resetFeedUpdateCount();

            app.NotificationHandler.resetAppleBadgeCounter();
		},
		loadRecent: function () {
			var data = {
					iscrollview: $('#dashboard_scrolling_section').data('mobileIscrollview')
			};
			this.kudosFeedView.loadRecent(event, data);

            app.Views.DashboardView.dashboardHeaderView.resetFeedUpdateCount();

            app.NotificationHandler.resetAppleBadgeCounter();
		},
		renderHeader: function () {
			var that = this;
			that.dashboardHeaderView = new libs.Views.DashboardHeaderView({
				model: app.currentUser.get()
			});
			var dashboardHeader = that.dashboardHeaderView.render();
			that.$el.find('.scrolling-section').before(dashboardHeader.$el);
			//that.$el.find('#page_content').prepend(dashboardHeader.$el);
		},
		renderKudosInfo: function () {
			var that = this;
			that.dashboardKudosInfoView = new libs.Views.DashboardKudosInfoView({
				model: app.currentUser.get()
			});
			var kudosInfo = that.dashboardKudosInfoView.render();
			that.$el.find('.scrolling-section').append(kudosInfo.$el);
		},
		renderKudosFeed: function () {
			var that = this;
			app.Models.KudosFeedCollection = new libs.Models.KudosFeedCollection();
			that.kudosFeedView = new libs.Views.KudosFeedView({
				collection: app.Models.KudosFeedCollection
			});
			var kudosFeed = that.kudosFeedView.render();
			that.$el.find('.scrolling-section').append(kudosFeed.$el);
			//that.$el.find('.scrolling-section .iscroll-pulldown').before(kudosFeed.$el);
		}
	});
} (jQuery, App, Libs));


(function ($, app, libs) {
	libs.Views.ForgotPasswordView = Backbone.View.extend({
		tagName: 'div',
		model: null,
		events: {
			'click .btnBackToLogin': 'backToLogin',
			'click #btnCancel': 'backToLogin',
			'click #btnNext': 'next'
		},
		next: function () {
			var that = this;
			$.mobile.loading('show');
			if (this.model.get('Attempt') == 0) {
				this.model.set('Email', this.$el.find("#txtInput").val());
			} else {
				this.model.set('Answer', this.$el.find("#txtInput").val());
			}

			this.model.save(null, {
				success: function (model, response, options) {
					$.mobile.loading('hide');
					if (!response.IsSuccess && response.Model != null) {
						App.showOnScreenNotification(response.Message, "warn", 5000);
						that.model.set('Question', response.Model.Question);
						that.model.set('Attempt', response.Model.Attempt);

						that.renderQuestion();
					} else if (response.IsSuccess && response.Message) {
						App.showOnScreenNotification(response.Message, "success", 5000, that.backToLogin);
					} else if (response.Message) {
						App.showOnScreenNotification(response.Message, "error", 5000, that.backToLogin);
					}
				},
				error: function (model, xhr, options) {
					$.mobile.loading('hide');
					App.showOnScreenNotification("Sorry, an unknown error has occurred.  Please try again later.", "error", 5000);
				}
			});
		},
		backToLogin: function () {
			app.Router.navigate('login', true);
		},
		render: function () {
			var that = this;
			var rawTemplate = App.Templates.get('forgot-password');
			that.$el.html(_.template(rawTemplate));
			that.$el.attr('data-role', 'page');
			that.$el.attr('data-theme', 'a');
			that.$el.attr('id', 'page_login');
			that.$el.find("#divBackToLogin").hide();
			that.model = new libs.Models.SecurityQuestionModel();
			return this;
		},
		renderQuestion: function () {
			this.$el.find("#intro").text("");
			this.$el.find("#question").text(this.model.get('Question'));
			this.$el.find("#txtInput").val("").attr("placeholder", "Answer");
		}
	});
} (jQuery, App, Libs));


(function ($, app, libs) {

/* GLOBALS
 * ====================== */
 // Object that will be send to server/act as placeholder
 //
  var kudosItemObj = {
    from: app.Config.userGuid(),
    selectedDivision: null,
    selectedDivisionText: null,
    selectedRecipient: null,
    selectedRecipientText: null,
    givenReason: '',
    selectedLabel: null,
    selectedLabelText: null
  };

/* DIVISION
 * ====================== */

  var _divisionSetupHandlers,
      _startRenderPickers,
      _divisionOpenPopup,
      _divisionUpdateFeedbackText;

  _divisionSetupHandlers = function () {
    var view = this;

    $(document).on('tap', '.division-picker-item', function (e) {
      var $this = $(this),
          divisionId = $this.attr('data-item-id'),
          divisionText = $this.find('h2').text();

      $('#popup_kudos_form_division_container').fadeOut('fast');
      // set the value on form
      kudosItemObj.selectedDivision = divisionId;
      kudosItemObj.selectedDivisionText = divisionText;

      view.onDivisionChanged(); // trigger division changed
      _divisionUpdateFeedbackText(divisionText);
      e.preventDefault();
    });
  };

  _startRenderPickers = function () {
    var that = this,
        $target = $('#popup_kudos_form_division'),
        divisions = that.model.get('Divisions'),
        data = {},
        html = '',
        list = '',
        closeListItemTemplate = '<li class="close-popup-list"><a class="custom-fullscreen-picker" href="javascript:void(0);">' +
          '<h2>Cancel</h2><div class="clear"></div></a></li>',
        listTemplate = '<li<% if(primary) {%> class="active" <%} %>>' +
          ' <a href="javascript:void(0);" data-item-id="<%= value %>"' +
          'class="custom-fullscreen-picker division-picker-item">' +
          ' <h2><%= text %></h2>' +
          ' <div class="clear"></div>' +
          ' </a>' +
          '</li>';

    $target.empty(); // empty it!
    $target.append(closeListItemTemplate);

    _.each(divisions, function (divs) {
      data = {
        value: divs.Value,
        text: divs.Text,
        primary: divs.Properties.IsPrimaryEntity
      };
      list = _(listTemplate).template(data);
      $target.append(list);

      if (divs.Properties.IsPrimaryEntity) {
        kudosItemObj.selectedDivision = divs.Value;
        kudosItemObj.selectedDivisionText = divs.Text;
        _divisionUpdateFeedbackText(kudosItemObj.selectedDivisionText);
      }
    });

    /** Select and hide if there's only one division */
    if (divisions && divisions.length === 1) {
      that.$el.find("#kudos_form_user_feedback_division").closest('li').hide();
      that.$el.find("#selDivisions").hide();
      that.$el.find("#selDivisions").closest('td').hide();
    }

    if ($('#popup_kudos_form_division').children().length > 0) {
      _setKudosFormElementRenderingState('divisions', true);
    } else {
      _setKudosFormElementRenderingState('divisions', false);
    }

    // continue rendering other pickers,
    // by triggering list:changed #popup_kudos_form_division that handled by
    // model.onDivisionChanged
    that.onDivisionChanged();
  };

  _divisionOpenPopup = function () {
    var $popup = $('#popup_kudos_form_division_container'),
        selectedDivision = kudosItemObj.selectedDivision,
        maxHeight = $( window ).height();

    // move popup element to directly below body if not already yet
    if (! $popup.parent().hasClass('ui-mobile-viewport')) {
      $popup.appendTo('body');
    }

    $('#popup_kudos_form_division .active').removeClass('active');
    $popup.css('height', maxHeight);

    if (selectedDivision) {
      $('.division-picker-item[data-item-id="' + selectedDivision + '"]').closest('li').addClass('active');
    }

    $popup.fadeIn('fast', function() {
      if ($popup.data('mobileIscrollview').iscroll) {
        $popup.data('mobileIscrollview').iscroll.refresh();
      }
    });
  };

  _divisionUpdateFeedbackText = function (text) {
    var $target = $('#kudos_form_user_feedback_division .item-description'),
        defaultText = $target.data('default-text');

    if (text) {
      $target.text(text);
      $('#kudos_form_user_feedback_division').closest('li').addClass('selected'); // add selected indicator
    } else {
      $target.text(defaultText);
      $('#kudos_form_user_feedback_division').closest('li').removeClass('selected'); // remove selected indicator
    }
  };


  /* RECIPIENT
   * ====================== */

  var _recipientSetupHandlers,
      _recipientRenderPicker;

  _recipientSetupHandlers = function () {
    $(document).on('tap', '.recipient-picker-item', function (e) {
      var $this = $(this),
          recipientId = $this.attr('data-item-id'),
          recipientText = $this.find('h2').text();

      $('#popup_kudos_form_recipient_container').fadeOut('fast');
      // set the value on form
      kudosItemObj.selectedRecipient = recipientId;
      kudosItemObj.selectedRecipientText = recipientText;
      _recipientUpdateFeedbackText(recipientText);
      e.preventDefault();
    });
  };

  _recipientRenderPicker = function () {
    var that = this,
        $target = $('#popup_kudos_form_recipient'),
        divsId = parseInt(kudosItemObj.selectedDivision, 10),
        employees = [];
        list = '',
        closeListItemTemplate = '<li class="close-popup-list"><a class="custom-fullscreen-picker" href="javascript:void(0);">' +
          '<h2>Cancel</h2><div class="clear"></div></a></li>',
        listTemplate = '<li>' +
          ' <a href="javascript:void(0);" data-item-id="<%= value %>"' +
          'class="custom-fullscreen-picker recipient-picker-item">' +
          ' <h2><%= text %></h2>' +
          ' <div class="clear"></div>' +
          ' </a>' +
          '</li>';

    $target.empty();
    $target.append(closeListItemTemplate);

    employees = _(that.model.get('Employees')).filter(function (emps) {
      return emps.Properties.EntityId === divsId && emps.Value !== app.Config.userGuid();
    });

    _.each(employees, function (emp) {
      data = {
        value: emp.Value,
        text: emp.Text
      };
      list = _(listTemplate).template(data);
      $target.append(list);
    });

    if ($('#popup_kudos_form_recipient').children().length > 0) {
      _setKudosFormElementRenderingState('employees', true);
    } else {
      _setKudosFormElementRenderingState('employees', false);
    }
  };

  _recipientUpdateFeedbackText = function (text) {
    var $target = $('#kudos_form_user_feedback_recipient .item-description'),
        defaultText = $target.data('default-text');

    if (text) {
      $target.text(text);
      $('#kudos_form_user_feedback_recipient').closest('li').addClass('selected'); // add selected indicator
    } else {
      $target.text(defaultText);
      $('#kudos_form_user_feedback_recipient').closest('li').removeClass('selected'); // remove selected indicator
    }
  };

  _recipientOpenPopup = function () {
    var $popup = $('#popup_kudos_form_recipient_container'),
        selectedRecipient = kudosItemObj.selectedRecipient,
        maxHeight = $( window ).height();

    // move popup element to directly below body if not already yet
    if (! $popup.parent().hasClass('ui-mobile-viewport')) {
      $popup.appendTo('body');
    }

    $('#popup_kudos_form_recipient .active').removeClass('active');
    $popup.css('height', maxHeight);

    if (selectedRecipient) {
      $('.recipient-picker-item[data-item-id="' + selectedRecipient + '"]').closest('li').addClass('active');
    }

    $popup.fadeIn('fast', function() {
      if ($popup.data('mobileIscrollview').iscroll) {
        $popup.data('mobileIscrollview').iscroll.refresh();
      }
    });
  };


  /* REASON
   * ====================== */

  var _reasonSetupHandlers,
      _reasonRenderPopup,
      _reasonOpenPopup;

  _reasonSetupHandlers = function() {
    $(document).on('tap', '#popup_kudos_form_close', function (e) {
      $('#popup_kudos_form_reason').fadeOut('fast');
      e.preventDefault();
    });

    $(document).on('tap', '#popup_kudos_form_reset', function (e) {
      var reasonText = kudosItemObj.givenReason;
      $('#popup_kudos_form_reason_textarea').val(reasonText);
      e.preventDefault();
    });

    $(document).on('tap', '#popup_kudos_form_save', function (e) {
      var reasonText = $('#popup_kudos_form_reason_textarea').val();

      kudosItemObj.givenReason = $.trim(reasonText); // save reason text to object
      _reasonUpdateFeedbackText(kudosItemObj.givenReason); // update reason picker text

      $('#popup_kudos_form_reason').fadeOut('fast');
      e.preventDefault();
    });
  };

  _reasonRenderPopup = function() {
    var $reasonPopup = this.$el.find('#popup_kudos_form_reason');
    $reasonPopup.appendTo('body');
  };

  _reasonOpenPopup = function () {
    var reasonText = kudosItemObj.givenReason;
    $('#popup_kudos_form_reason').fadeIn(400, function() {
      $('#popup_kudos_form_reason_textarea').val(reasonText);
      $('#popup_kudos_form_reason_textarea').focus().select();
    });

    if(window.mobile_system === "iphone") {
      setTimeout(function() {
        $('#popup_kudos_form_reason_textarea').focus();
      }, 500);
    }
  };

  _reasonUpdateFeedbackText = function (text) {
    var $target = $('#kudos_form_user_feedback_reason .item-description'),
        defaultText = $target.data('default-text');

    if (text) {
      $target.text(text);
      $('#kudos_form_user_feedback_reason').closest('li').addClass('selected'); // add selected indicator
    } else {
      $target.text(defaultText);
      $('#kudos_form_user_feedback_reason').closest('li').removeClass('selected'); // remove selected indicator
    }
  };

  /* LABEL
   * ====================== */

  var _labelSetupHandlers,
      _labelRenderPicker,
      _labelOpenPopup;

  _labelSetupHandlers = function () {
    $(document).on('tap', '.kudos-form-label-item', function(e) {
      var $this = $(this);
      var labelId = $this.attr('data-label-id');
      var labelText = $this.attr('data-label-text');
      $('#popup_kudos_form_label_container').fadeOut('fast');
      // set the value on form
      kudosItemObj.selectedLabel = labelId;
      kudosItemObj.selectedLabelText = labelText;
      _labelUpdateFeedbackText(labelText);
      e.preventDefault();
    });
  };

  _labelRenderPicker = function () {
    var that = this,
        $target = $('#popup_kudos_form_label'),
        html = '',
        closeListItemTemplate = '<li class="close-popup-list"><a class="custom-fullscreen-picker" href="javascript:void(0);">' +
          '<h2>Cancel</h2><div class="clear"></div></a></li>',
        divsId = parseInt(kudosItemObj.selectedDivision, 10),
        kudosLabels, list;

    $target.empty();
    $target.append(closeListItemTemplate);

    if (! that.model.get('KudosLabels')) {
      return false;
    }

    kudosLabels = _(that.model.get('KudosLabels')).filter(function (kdslbl) {
      return kdslbl.Properties.DivisionId === divsId;
    });

    _.each(kudosLabels, function (kdslb) {
      list = '';
      if(kdslb) {
        list += '<li><a href="javascript:void(0);" class="kudos-form-label-item" ';
        list += 'data-label-id="' + kdslb.Value + '" data-label-text="' + kdslb.Text + '">';
        if (kdslb.Properties.Icon) {
          list += '<img src="' + app.Config.url() + kdslb.Properties.Icon.IconPath.replace("Small", "Large")  + '" />';
        }
        list += '<h2>' + kdslb.Text + '</h2>';
        list += '<div class="clear"></div>';
        list += '</a></li>';
        $target.append($(list));
      }
    });

    $('#page_dashboard').trigger('create');

    if ($('#popup_kudos_form_label').children().length > 0) {
      _setKudosFormElementRenderingState('labels', true);
    } else {
      _setKudosFormElementRenderingState('labels', false);
    }
  };

  _labelOpenPopup = function() {
    var that = this;
    var selectedLabel = kudosItemObj.selectedLabel;
    var maxHeight = $( window ).height();
    var $popup = $('#popup_kudos_form_label_container');
    var labels = $('#popup_kudos_form_label').children();

    if ($popup.hasClass('openLabelsFormPopup') || ! labels.length) {
      _labelRenderPicker.call(that); // rerender!
      return false;
    }

    // move popup element to directly below body if not already yet
    if (! $popup.parent().hasClass('ui-mobile-viewport')) {
      $popup.appendTo('body');
    }

    $('#popup_kudos_form_label .active').removeClass('active');
    $popup.css('height', maxHeight);

    if (selectedLabel) {
      $('.kudos-form-label-item[data-label-id="' + selectedLabel + '"]').closest('li').addClass('active');
    }

    //$('#popup_kudos_form_label_container').css('height', $(window).height());

    // show the popup
    $popup.fadeIn('fast', function() {
      if ($popup.data('mobileIscrollview').iscroll) {
        $popup.data('mobileIscrollview').iscroll.refresh();
      }
    });
  };

  _labelUpdateFeedbackText = function (text) {
    var $target = $('#kudos_form_user_feedback_labels .item-description'),
        defaultText = $target.data('default-text');

    if (text) {
      $target.text(text);
      $('#kudos_form_user_feedback_labels').closest('li').addClass('selected'); // add selected indicator
    } else {
      $target.text(defaultText);
      $('#kudos_form_user_feedback_labels').closest('li').removeClass('selected'); // remove selected indicator
    }
  };

  /* CLOSE PICKER POPUP EVENT
   * ========================== */

  var _setupGlobalPickerEventHandlers = function () {
    $(document).on('tap', '.close-popup-list', function (e) {
      var $this = $(this),
          $target = $this.closest('.custom-fullscreen-picker-container');

      $target.fadeOut('fast');
      e.preventDefault();
    });
  };

  /**
   * Clear Kudos Form visual and global objects
   * @return {void}
   */
  var _clearForm = function() {
      /** Clear pickers feedback texts */
      _recipientUpdateFeedbackText('');
      _reasonUpdateFeedbackText('');
      _labelUpdateFeedbackText('');

      /** Clear popups visual */
      // $('#popup_kudos_form_division').val(''); leave division untouch
      $('#popup_kudos_form_recipient .active').removeClass('active');
      $('#popup_kudos_form_reason_textarea').val('');
      $('#popup_kudos_form_label .active').removeClass('active');

      // Reset Kudos global objects
      kudosItemObj.selectedRecipient = null;
      kudosItemObj.selectedRecipientText = null;
      kudosItemObj.givenReason = '';
      kudosItemObj.selectedLabel = null;
      kudosItemObj.selectedLabelText = null;
  };


  /* KUDOS FORM BUTTON (TOP) AVAILABILITY
   * ================================================== */

  var _setKudosFormElementRenderingState,
      kudosFormElementRenderingState,
      _setKudosFormButtonState;

  // TODO store inside view object
  kudosFormElementRenderingState = {
    divisions: false,
    employees: false,
    labels: false
  };

  // TODO store inside view object
  _setKudosFormButtonState = function (state) {
    if (state) {
      $('#btn_trigger_kudosmenu').attr('href', '#kudos_panel');
      $('#btn_trigger_kudosmenu').find('img').attr('src', 'images/btn-header-kudos2x.png');
    }
  };

  _setKudosFormElementRenderingState = function(element, status) {
    var renderingState = kudosFormElementRenderingState;
    renderingState[element] = status;
    if (renderingState.divisions && renderingState.employees && renderingState.labels) {
      _setKudosFormButtonState(true);
    } else {
      _setKudosFormButtonState(false);
    }
  };


  /* START!!
   * ==================================== */

  libs.Views.GiveKudosView = Backbone.View.extend({
    tagName: 'div',
    initialize: function () {
      _.bindAll(this, 'render');
      this.model.bind('change', _startRenderPickers, this);

      // Start wiring event handlers
      _divisionSetupHandlers.call(this);
      _recipientSetupHandlers.call(this);
      _reasonSetupHandlers.call(this);
      _labelSetupHandlers.call(this);

      _setupGlobalPickerEventHandlers.call(this);
    },
    events: {
      'list:changed #popup_kudos_form_division': function () { this.onDivisionChanged(); },
      'click .open-division-picker': function () { _divisionOpenPopup.call(this); },
      'click .open-recipient-picker': function () { _recipientOpenPopup.call(this); },
      'click .open-reason-popup': function() { _reasonOpenPopup.call(this); },
      'click .open-kudos-label-picker': function () { _labelOpenPopup.call(this); },
      'click #kudos_form_trigger_submit_form': function () { this.giveKudos(); }
    },
    render: function () {
      var template = App.Templates.get('give-kudos');
      this.$el.html(_.template(template));
      this.$el.attr('data-role', 'panel');
      this.$el.attr('data-position', 'right');
      this.$el.attr('data-position-fixed', 'false');
      this.$el.attr('data-animate', false);
      this.$el.attr('data-theme', 'a');
      this.$el.attr('data-swipe-close', false);
      this.$el.attr('data-dismissible', false);
      this.$el.attr('id', 'kudos_panel');

      /**
       * only render reason, all other will be render after model done fetch
       * see initialize method property of this object
       */
      _reasonRenderPopup.call(this);

      return this;
    },
    onDivisionChanged: function () {
      _divisionUpdateFeedbackText(kudosItemObj.selectedDivisionText);

      _recipientRenderPicker.call(this);
      _recipientUpdateFeedbackText(null);
      kudosItemObj.selectedRecipient = null;
      kudosItemObj.selectedRecipientText = null;

      _labelRenderPicker.call(this);
      _labelUpdateFeedbackText(null);
      kudosItemObj.selectedLabel = null;
      kudosItemObj.selectedLabelText = null;
    },
    giveKudos: function (e) {
      var self = this,
          errors = [],
          giveKudos, labels;

      kudosItemObj.from = app.Config.userGuid();

      if (! kudosItemObj.from) {
        errors.push('From is required');
      }
      if (! kudosItemObj.selectedRecipient) {
        errors.push('Recipient is required field');
      }
      if (! kudosItemObj.givenReason) {
        errors.push('Reason is required field');
      }
      if (! kudosItemObj.selectedLabel) {
        errors.push('Label is required field');
      }
      if (errors.length === 0) {
        giveKudos = new libs.Models.GiveKudosModel();

        //webservice accept labels as array of ids
        labels = [kudosItemObj.selectedLabel];

        giveKudos.set('To', kudosItemObj.selectedRecipient);
        giveKudos.set('From', kudosItemObj.from);
        giveKudos.set('Reason', kudosItemObj.givenReason);
        giveKudos.set('Labels', labels);

        $.mobile.loading( 'show', { text: 'giving kudos', textVisible: true });
        $.simpleBlock.start();

        giveKudos.save(null, {
          success: function (model, response, options) {
            $.mobile.loading('hide');
            $.simpleBlock.stop();
            if (!!response.IsSuccess) {
              App.showOnScreenNotification("Kudos sent successfully", 'success');
              _clearForm();
              $('#kudos_panel').panel('close');
            } else {
              App.showOnScreenNotification(response.Message, 'error');
            }
          },
          error: function (model, xhr, options) {
            $.mobile.loading('hide');
            $.simpleBlock.stop();
          }
        });
      } else {
        App.showOnScreenNotification(errors, 'error');
      }
      return false;
    }
  });

} (jQuery, App, Libs));


(function ($, app, libs) {
	libs.Views.SplashView = Backbone.View.extend({
		tagName: 'div',
		render: function () {
			var that = this;
			var rawTemplate = App.Templates.get('splash');
			that.$el.html(_.template(rawTemplate));
			that.$el.attr('data-role', 'page');
			that.$el.attr('data-theme', 'a');
			that.$el.attr('id', 'giveIdHere1');
			return this;
		}
	});
} (jQuery, App, Libs));

(function ($, app, libs) {
	libs.Views.PeopleRegisterItemView = Backbone.View.extend({
		tagName: 'div',
		render: function () {
			var that = this;
			that.$el.addClass('person-item');
			var rawTemplate = App.Templates.get('people-register-item');
			that.$el.html(_.template(rawTemplate, this.model.toJSON()));
			return this;
		}
	});
	libs.Views.PeopleRegisterView = Libs.Views.PageView.extend({
		tagName: 'div',
		counter: 0,
		hasLoadMoreRendered: false,
		events: {
			'click #btn_load_more': 'loadMore',
			'keyup #searchPeople': 'searchPeople',
			'change #searchPeople': 'searchPeopleChange'
		},
		initialize: function () {
			_.bindAll(this, 'render');
			this.collection.bind('reset', this.renderItems, this);
			this.collection.bind('add', this.renderItem, this);
		},
		render: function () {
			var that = this;
			var rawTemplate = App.Templates.get('people-register');
			that.$el.html(_.template(rawTemplate));
			that.$el.attr('data-role', 'page');
			that.$el.attr('data-theme', 'a');
			that.$el.attr('id', 'page_people_register');
			that.renderPageHeader(true, 'People Register');
			that.renderSidebarPanel();
			that.renderGiveKudos();

			return this;
		},
		renderItems: function () {
			var that = this;
			that.counter = 0;
			that.$el.find('.people-list').empty();
			if (that.collection.length) {
				that.collection.each(function (item) {
					that.renderItem(item);
				});
			} else {
				that.renderNoResult();
			}
			that.renderLoadMore();
		},
		renderLoadMore: function () {
			var that = this;
			this.hasLoadMoreRendered = true;
			$(".iscroll-wrapper").bind({
				iscroll_onpullup : function (event, data) {
					// add remove previous offset if any, and re-add the offset indicator for scrollTo
					// after the new data successfully draw
					$('.person-item.offset').removeClass('offset');
					$('.person-item:last').addClass('offset');
					that.loadMore(event, data);
				}
			});
			setTimeout(function() {
				if ($('#people_register_scrolling_section').data("mobileIscrollview")) {
					$('#people_register_scrolling_section').data("mobileIscrollview").refresh();
				}
			}, 1000);
		},
		renderItem: function (item) {
			var itemClass = '';
			switch (this.counter++ % 3){
				case 0: itemClass = 'ui-block-a';
					break;
				case 1: itemClass = 'ui-block-b';
					break;
				case 2: itemClass = 'ui-block-c';
					break;
				default: itemClass = '';
					break;
			}
			var itemView = new libs.Views.PeopleRegisterItemView({
				model: item
			});
				
			var itemTemplate = itemView.render();
			itemTemplate.$el.addClass(itemClass);
			this.$el.find('.people-list').append(itemTemplate.$el);
		},
		renderNoResult: function() {
			this.$el.find('#searchPeople').blur();
			app.showOnScreenNotification('Your search returned no results. Check if your spelling is correct or try a different search.', 'error');
		},
		searchPeopleWait: 0,
		searchPeople: function () {
			var that = this;
			var searchTerm = this.$el.find('#searchPeople').val();

			clearTimeout(that.searchPeopleWait);
			that.searchPeopleWait = setTimeout(function() {
				that.collection.search(searchTerm);
			}, 1000);

			return false;
		},
		searchPeopleChange: function() {
			var that = this;
			var searchTerm = this.$el.find('#searchPeople').val();
			// clear searches
			if (! searchTerm) {
				that.collection.clearSearch();
			}

			return false;
		},
		loadMore: function(event, data){
			this.collection.loadMore(function (){
				var iscrollview = data.iscrollview;
				window.loadMoreTimerCounter = 0;
				setTimeout(function() {
					iscrollview.refresh(null, null,
						$.proxy(function afterRefreshCallback() {
							var $startingElement = $('.person-item.offset').next();
							var nextIndex = $('.person-item.offset').index() + 2;

//							if ($startingElement) {
//								this.scrollToElement('.people-list > div:nth-child(' + nextIndex + ')', 400);
//							}
						}, iscrollview)
					);
				}, 1000);
			});
		}
	});
} (jQuery, App, Libs));

(function ($, app, libs) {

	libs.Views.SidebarView = Backbone.View.extend({
		tagName: 'div',
		events: {
			'click #btnLogout': 'logout',
			'click #btnUnregister': 'unregister'
		},
		unregister: function () {
		},
		render: function () {
			var template = App.Templates.get('left-sidebar');
			this.$el.html(_.template(template));
			this.$el.attr('data-role', 'panel');
			this.$el.attr('data-theme', 'a');
			this.$el.attr('data-position', 'left');
			this.$el.attr('data-animate', false);
			this.$el.attr('data-swipe-close', false);
			this.$el.attr('data-dismissible', false);
			this.$el.attr('data-position-fixed', 'false');
			this.$el.attr('id', 'nav_panel');
			this.$el.attr('data-display', 'reveal');
			return this;

		},
		logout: function () {
			app.NotificationHandler.UnregisterDevice(function() {
				var lastLoginEmail = app.currentUser.get().get("Email");

				app.Config.setToken('');
				app.Config.setUserGuid('');
				app.currentUser.set(null);

				window.localStorage.clear();
				window.localStorage.setItem('lastLoginEmail', lastLoginEmail);

				app.Router.navigate('login', true);
			});
		}
	});

	// Move to give-kudos.js

	libs.Views.PageView = Backbone.View.extend({
		renderPageHeader: function (withSidebar, headerTitle) {
			var template = '';
			if (withSidebar) {
				template = App.Templates.get('page-header-with-sidebar');
			} else {
				template = App.Templates.get('page-header-no-sidebar');
			}
			this.$el.prepend(_.template(template));
			this.$el.find('#header_title').text(headerTitle);
		},
		renderSidebarPanel: function () {
			var sidebarView = new libs.Views.SidebarView();
			var sdbrtpl = sidebarView.render();
			this.$el.append(sdbrtpl.$el);
		},
		renderGiveKudos: function () {
			var that = this;
			app.Models.GiveKudosLookupModel = new libs.Models.GiveKudosLookupModel();
			app.Models.KudosLabelCollection = new libs.Models.KudosLabelCollection();
			var giveKudosView = new libs.Views.GiveKudosView({
				model: app.Models.GiveKudosLookupModel
			});
			// fetch data
			if (!app.Models.GiveKudosLookupModel.fetched) {
				app.Models.GiveKudosLookupModel.fetch({
					reset: true,
					success: function(collection, response) {
						app.Models.GiveKudosLookupModel.fetched = true;
					}
				}); // trigger kudos lookup
			}

			var gvkdstpl = giveKudosView.render();
			this.$el.append(gvkdstpl.$el);
		}
	});

	libs.Views.SettingsContentView = Backbone.View.extend({
		events: {
			'change [name="settings-enable"]': 'changeSettings',
			'change [name="settings-scope"]': 'changeSettings'
		},
		initialize: function () {
			_.bindAll(this, 'render');
			this.model.bind('change', this.render, this);
		},
		render: function () {
			var that = this;
			var rawTemplate = App.Templates.get('settings-content');
			this.$el.html(_.template(rawTemplate, that.model.toJSON()));
			if (that.model.get('SendNotifications')) {
				this.$el.find('#settings-enable').prop('checked', true);
				this.$el.find('[name="settings-scope"]').prop("disabled", false);
			}
			this.$el.find('[name="settings-scope"][value="' + that.model.get('NotificationScope') + '"]').attr('checked', 'checked');
			this.$el.trigger('create');
			return this;
		},
		changeSettings: function () {
			// changes, most likely come from radio button and checkboxes
			var enabled = this.$el.find('[name="settings-enable"]').is(':checked');
			var scope = this.$el.find('[name="settings-scope"]:checked').val();
			this.$el.find('[name="settings-scope"]').prop("disabled", !enabled).checkboxradio( "refresh" );
			this.model.set('SendNotifications', enabled, {silent: true});
			this.model.set('NotificationScope', scope, {silent: true});
			this.model.save(null, {
				success: function (model, response, options) {
				},
				error: function (model, xhr, options) {
				}
			});
		}
	});

	libs.Views.SettingsView = libs.Views.PageView.extend({
		tagName: 'div',
		loadData: function () {
			app.Models.SettingsModel.fetch({
				data: {
					userId: app.currentUser.get().get('RegisteredUserId'),
					registrationId: app.NotificationHandler.DeviceRegistrationId
				}
			});
		},
		render: function () {
			var that = this;
			var rawTemplate = App.Templates.get('settings');
			this.$el.html(_.template(rawTemplate));
			this.$el.attr('data-role', 'page');
			this.$el.attr('data-theme', 'a');
			this.$el.attr('id', 'page_settings');
			this.renderPageHeader(false, 'Settings');
			this.renderGiveKudos();
			var contentView = new libs.Views.SettingsContentView({
				model: that.model,
				el: that.$el.find('#settingsContent')
			});
			var ctpl = contentView.render();
			return this;
		}
	});

} (jQuery, App, Libs));


(function ($, app, libs) {
	libs.Views.KudosFeedItemView = Backbone.View.extend({
		tagName: 'li',
		initialize: function () {
			_.bindAll(this, 'render');
			this.model.bind('change', this.render, this);
		},
		render: function () {
			var that = this;
			var rawTemplate = App.Templates.get('kudos-feed-item');
			that.$el.html(_.template(rawTemplate, that.model.toJSON()));
			that.$el.addClass('kudos-list-item');
			return this;
		}
	});
	libs.Views.KudosFeedView = Backbone.View.extend({
		tagName: 'div',
		events: {
			'click #loadMore': 'loadMore',
			'click #loadRecent': 'loadRecent'
		},
		initialize: function () {
			_.bindAll(this, 'render');
			var that = this;
			that.collection.bind('reset', this.render, this);
			that.collection.bind('add', this.addOne, this);
		},
		loadData: function () {
			var that = this;
			that.collection.loadFirst(function () {
				that.renderLoadMore();
				if ($('.iscroll-wrapper').data("mobileIscrollview")) {
					$('.iscroll-wrapper').data("mobileIscrollview").refresh();
				}
			});
		},
		render: function () {
			var that = this;
			var rawTemplate = App.Templates.get('kudos-feed');
			that.$el.html(_.template(rawTemplate));
			that.collection.each(function (item) {
				that.addOne(item);
			});
			return this;
		},
		renderLoadMore: function () {
			var that = this;
			$(".iscroll-wrapper").bind({
				iscroll_onpulldown : function (event, data) {
					that.loadRecent(event, data);
				},
				iscroll_onpullup : function (event, data) {
					that.loadMore(event, data);
				}
			});

			// iscroll-dashboard-hacks - Move the pullup to before kudos details
			$('.iscroll-pulldown').insertBefore($('#dashboard_kudos_details'));
			$('.iscroll-pulldown').show();
			$('.iscroll-scroller').addClass('loaded');
		},
		addOne: function (item) {
			var feedItemView = new libs.Views.KudosFeedItemView({
				model: item
			});
			var itemTemplate = feedItemView.render();
			if (item.get('KudosPointsAwardedId') > this.collection.prevUpperPivot) {
				this.$el.find('#dashboard_listview').prepend(itemTemplate.$el);
			} else {
				this.$el.find('#dashboard_listview').append(itemTemplate.$el);
			}
		},
		loadMore: function (event, data) {
			app.currentUser.refreshData();
			this.collection.loadMore(function () {
				var iscrollview = data.iscrollview;
				iscrollview.refresh(null, null,
					$.proxy(function afterRefreshCallback() {
						//this.scrollToElement('#dashboard_listview>li:last-child', 400);
					}, iscrollview)
				);
			});
            app.NotificationHandler.resetAppleBadgeCounter();
		},
		loadRecent: function (event, data) {
			app.currentUser.refreshData();
			this.collection.loadRecent(function () {
				var iscrollview = data.iscrollview;
				iscrollview.refresh(null, null,
					$.proxy(function afterRefreshCallback() {
						//this.scrollToElement('#dashboard_kudos_details', 400);
					}, iscrollview)
				);
			});
			$("#kudos_notification").slideUp();
            app.NotificationHandler.resetAppleBadgeCounter();
		}
	});
	libs.Views.KudosDetailContentView = Backbone.View.extend({
		initialize: function () {
			_.bindAll(this, 'render');
			this.model.bind('change', this.render, this);
		},
		render: function () {
			var rawTemplate = App.Templates.get('kudos-details-content');
			window._debug_kudosdetail = this.model;
			this.$el.html(_.template(rawTemplate, this.model.toJSON()));
			return this;
		}
	});
	libs.Views.KudosDetailView = Libs.Views.PageView.extend({
		tagName: 'div',
		initialize: function () {
		},
		render: function () {
			var that = this;
			var rawTemplate = App.Templates.get('kudos-details');
			that.$el.html(_.template(rawTemplate));
			that.$el.attr('data-role', 'page');
			that.$el.attr('data-theme', 'a');
			that.$el.attr('id', 'page_kudos_details');
			app.Models.KudosDetailModel = new libs.Models.KudosModel({
				KudosPointsAwardedId: that.selectedKudosId
			});
			that.renderContent();
			that.renderPageHeader(false, 'Kudos Details');
			that.renderGiveKudos();
			return this;
		},
		renderContent: function () {
			var that = this;
			this.contentView = new libs.Views.KudosDetailContentView({
				model: app.Models.KudosDetailModel,
				el: that.$el.find("#kudos-details")
			});
			this.contentView.render();
		}
	});
} (jQuery, App, Libs));


(function ($, app, libs) {
	libs.Views.LoginView = Backbone.View.extend({
		tagName: 'div',
		events: {
			'click #btnLogin': 'doLogin',
			'submit #login_form': 'doLoginForm',
			'click #forgotPassword': 'forgotPassword'
		},
		forgotPassword: function () {
			app.Router.navigate('forgotpassword', true);
		},
		doLoginForm: function(e){
			this.doLogin(e);
			return false;
		},
		render: function () {
			var that = this;
			var rawTemplate = App.Templates.get('login');
			that.$el.html(_.template(rawTemplate));
			that.$el.attr('data-role', 'page');
			that.$el.attr('id', 'page_login');
			var lastLoginEmail = window.localStorage.getItem('lastLoginEmail');
			if (lastLoginEmail) {
				this.$el.find('#Username').val(lastLoginEmail);
			}
			return this;
		},
		doLogin: function (e) {
			var self = this;
			var username = this.$el.find('#Username').val();
			var password = this.$el.find('#Password').val();
			var loginModel = new libs.Models.LoginModel();
			loginModel.set('Username', username);
			loginModel.set('Password', password);
			$.mobile.loading( 'show', { text: 'loading', textVisible: true });
			loginModel.save(null, {
				success: function (model, response, options) {
					//ToDo: response need to have more meaning, since now its validating permissions also
					if(response && response.IsSuccess) {
						var splitResponse = response.Message.split(';');
						var token = splitResponse[0];
						var userId = splitResponse[1];
						var userGuid = splitResponse[2];
						var clientId = splitResponse[3];

						app.Config.setToken(token);
						app.Config.setUserGuid(userGuid);

						self.validateModulePermission(clientId, userGuid, token);
					} else {
						//when response from service is empty
						$.mobile.loading('hide');
						App.showOnScreenNotification(response.Message, 'error', 5000);
					}
				},
				error: function (model, xhr, options) {
					$.mobile.loading('hide');
					App.showOnScreenNotification("Failed to get response from authentication service.", 'error', 5000);
				}
			});
			e.preventDefault();
		},
		validateModulePermission: function(clientId, userGuid, token) {
			//call ModulePermission first, if success then fetch the current user
			var modulePermission = new libs.Models.ModulePermissionResponseModel();
			modulePermission.clientId = clientId;

			modulePermission.fetch({
				success: function() {
					if(modulePermission.attributes.IsSuccess) {
						/*app.Config.setToken(token);
						app.Config.setUserGuid(userGuid);*/
						var currentUser = new libs.Models.EmployeeProfileModel({
							ProfileUserId: userGuid
						});
						currentUser.fetch({
							success: function () {
								app.currentUser.set(currentUser);
								//app.Models.GiveKudosLookupModel.fetch({ reset: true }); // trigger kudos lookup
								app.Router.navigate('dashboard', {trigger:true, replace: true});
							},
							error: function () {
								$.mobile.loading('hide');
								App.showOnScreenNotification("Your email address or password is incorrect, please re-enter and try again.", 'error', 5000);
							}
						});
					} else {
						$.mobile.loading('hide');
						App.showOnScreenNotification("You do not have sufficient permission to access this application.", 'error', 5000);
					}
				},
				error: function() {
					$.mobile.loading('hide');
					App.showOnScreenNotification("Failed to get response from module permission service.", 'error', 5000);
				}
			});
		}
	});
} (jQuery, App, Libs));


(function ($, app, libs) {
	libs.Views.KudosHistoryItemView = Backbone.View.extend({
		tagName: 'li',
		initialize: function () {
			_.bindAll(this, 'render');
			this.model.bind('change', this.render, this);
		},
		render: function () {
			var that = this;
			var isReceivedKudos = that.model.get("IsReceivedKudos");
			var rawTemplate = App.Templates.get('user-details-kudos-history-item');
			if (isReceivedKudos) {
				that.$el.addClass("from-type clearfix");
			} else {
				that.$el.addClass("to-type clearfix");
			}
			that.$el.html(_.template(rawTemplate, that.model.toJSON()));
			return this;
		}
	});
	libs.Views.KudosHistoryView = Backbone.View.extend({
		//tagName: 'ul',
		events: {
			'click #loadMore': 'loadMore',
			'click #loadRecent': 'loadRecent'
		},
		initialize: function () {
			_.bindAll(this, 'render');
			this.collection.bind('reset', this.render, this);
			this.collection.bind('add', this.addOne, this);
		},
		loadData: function () {
			var that = this;
			app.Models.KudosHistoryCollection.loadFirst(function () {
				that.renderLoadMore();
			});
		},
		render: function () {
			var that = this;
			var rawTemplate = App.Templates.get('user-details-kudos-history');
			that.$el.html(_.template(rawTemplate));
			that.collection.each(function (item) {
				that.addOne(item);
			});
			//that.$el.attr('id', 'history_list');
			that.$el.css('display', 'none');
			that.$el.attr("data-iscroll","");
			return this;
		},
		addOne: function (item) {
			item.set('IsReceivedKudos', this.collection.profileUserId === item.get('AwardedToEmployeeProfile').ProfileUserId);
			var itemView = new libs.Views.KudosHistoryItemView({
				model: item
			});
			var itemTemplate = itemView.render();
			if (item.get('KudosPointsAwardedId') > this.collection.prevUpperPivot) {
				//this.$el.find('#history_list').prepend(itemTemplate.$el);
				this.$el.find('ul').prepend(itemTemplate.$el);
			} else {
				//this.$el.find('#history_list').append(itemTemplate.$el);
				this.$el.find('ul').append(itemTemplate.$el);
			}
		},
		renderLoadMore: function () {
			var that = this;
			$(".iscroll-wrapper").bind({
				iscroll_onpulldown : function (event, data) {
					that.loadRecent(event, data);
				},
				iscroll_onpullup : function (event, data) {
					that.loadMore(event, data);
				}
			});
		},
		loadMore: function (event, data) {
			this.collection.loadMore(function () {
				if ($("#history_list").data("mobileIscrollview")) {
					$("#history_list").data("mobileIscrollview").refresh();
				}
//				var iscrollview = data.iscrollview;
//				iscrollview.refresh(null, null,
//					$.proxy(function afterRefreshCallback() {
//						//this.scrollToElement('ul>li:last-child', 400);
//					}, iscrollview)
//				);
			});
		},
		loadRecent: function (event, data) {
			this.collection.loadRecent(function () {
				if ($("#history_list").data("mobileIscrollview")) {
					$("#history_list").data("mobileIscrollview").refresh();
				}
				var iscrollview = data.iscrollview;
//				iscrollview.refresh(null, null,
//					$.proxy(function afterRefreshCallback() {
//						this.scrollToElement('ul>li:first-child', 400);
//					}, iscrollview)
//				);
			});
		}
	});
	libs.Views.UserDetailsHeaderView = Backbone.View.extend({
		tagName: 'div',
		initialize: function () {
			_.bindAll(this, 'render');
			this.model.bind('change', this.render, this);
		},
		render: function () {
			var rawTemplate = App.Templates.get('user-details-header');
			this.$el.html(_.template(rawTemplate, this.model.toJSON()));
			this.$el.addClass('page-user-section');
			return this;
		}
	});
	libs.Views.UserDetailsBasicInfoView = Backbone.View.extend({
		//tagName: 'ul',
		initialize: function () {
			_.bindAll(this, 'render');
			this.model.bind('change', this.render, this);
		},
		render: function () {
			var that = this;
			var rawTemplate = App.Templates.get('user-details-basic-info');
			that.$el.html(_.template(rawTemplate, this.model.toJSON()));
			//that.$el.attr('id', 'action_list');
			//that.$el.css('display', 'none');
			return this;
		}
	});
	libs.Views.UserDetailsView = libs.Views.PageView.extend({
		tagName: 'div',
		events: {
			'click #btnBasicInfo': 'showBasicInfo',
			'click #btnKudosHistory': 'showKudosHistory'
		},
		initialize: function () {
			//this.model.bind('change', this.render, this);
		},
		render: function () {
			var that = this;
			var rawTemplate = App.Templates.get('user-details');
			that.$el.html(_.template(rawTemplate));
			that.$el.attr('data-role', 'page');
			that.$el.attr('data-theme', 'a');
			that.$el.attr('id', 'page_user_details');
			app.Models.EmployeeProfileModel = new libs.Models.EmployeeProfileModel({ ProfileUserId: that.selectedProfileId });
			that.renderPageHeader(false, 'User Details');
			that.renderGiveKudos();
			that.renderHeader();
			that.renderBasicInfo();
			that.renderKudosHistory();
			//that.$el.find('#userDetailContent').trigger('create');
			return this;
		},
		renderHeader: function () {
			this.headerView = new libs.Views.UserDetailsHeaderView({
				model: app.Models.EmployeeProfileModel
			});
			var tpl = this.headerView.render();
			this.$el.find('.page-detailed-section').prepend(tpl.$el);
		},
		renderBasicInfo: function () {
			var that = this;
			this.basicInfoView = new libs.Views.UserDetailsBasicInfoView({
				model: app.Models.EmployeeProfileModel,
				el: that.$el.find('#action_list')
			});
			var template = that.basicInfoView.render();
			//that.$el.find('.page-detailed-section').append(template.$el);
		},
		renderKudosHistory: function () {
			var that = this;
			app.Models.KudosHistoryCollection = new libs.Models.KudosFeedCollection();
			app.Models.KudosHistoryCollection.profileUserId = that.selectedProfileId;
			this.kudosHistoryView = new libs.Views.KudosHistoryView({
				collection: app.Models.KudosHistoryCollection,
				el: that.$el.find('#history_list')
			});
			var template = this.kudosHistoryView.render();
			//that.$el.find('.page-detailed-section').append(template.$el);
			//app.Models.KudosHistoryCollection.loadFirst();
			this.kudosHistoryView.loadData();
		},
		showBasicInfo: function (e) {
			// show basic info, hide kudos history
			this.$el.find('.ui-btn-active').removeClass('ui-btn-active');
			this.$el.find('#btnBasicInfo').addClass('ui-btn-active');
			this.$el.find('#action_list').show();
			this.$el.find('#history_list').hide();
			if (e) {
				e.preventDefault();
			}
		},
		showKudosHistory: function (e) {
			// hide basic info, show kudos history
			this.$el.find('.ui-btn-active').removeClass('ui-btn-active');
			this.$el.find('#btnKudosHistory').addClass('ui-btn-active');
			this.$el.find('#action_list').hide();
			this.$el.find('#history_list').show();
			if (this.$el.find('#history_list').data("mobileIscrollview")) {
				this.$el.find('#history_list').data("mobileIscrollview").refresh();
			}
			if (e) {
				e.preventDefault();
			}
		}
	});
} (jQuery, App, Libs));

