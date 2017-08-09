
require.config({

	baseUrl: 'libs',

	paths: {
		app: '../js',
		tpl: '../tpl',
		jquery: 'jquery/jquery-1.11.1.min',
		jquery_bindfirst: 'jquery/jquery.bind-first-0.2.3.min',
		underscore: 'underscore/underscore-min',
		backbone: 'backbone/backbone-min',
		iscroll: 'iscroll/iscroll',
		hammerjs: 'hammer/hammer.min',
		jquery_hammer: 'hammer/jquery.hammer.min',
		lru: 'lru',
		mcrypt: 'crypto/mcrypt',
		rijndael: 'crypto/rijndael',
		async: 'async',
	},

	map: {
		'*': {
			'app/adapters/init': 'app/adapters/persistencejs/init',
			'app/adapters/generic': 'app/adapters/persistencejs/generic',
			'app/adapters/competition': 'app/adapters/persistencejs/competition',
			'app/adapters/competes': 'app/adapters/persistencejs/competes',
			'app/adapters/team': 'app/adapters/persistencejs/team',
			'app/adapters/person': 'app/adapters/persistencejs/person',
			'app/adapters/plays': 'app/adapters/persistencejs/plays',
			'app/adapters/manages': 'app/adapters/persistencejs/manages',
			'app/adapters/updater': 'app/adapters/persistencejs/updater',
			// 'app/adapters/favorite': 'app/adapters/persistencejs/favorite',
			// 'app/adapters/version': 'app/adapters/persistencejs/version',
		},
	},

	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone',
		},
		'underscore': {
			exports: '_',
		},
		'hammerjs': {
			exports: 'Hammer',
		},
		'jquery_hammer': {
			deps: ['jquery', 'hammerjs'],
		},
		'jquery_bindfirst': {
			deps: ['jquery'],
		},
		'iscroll': {
			exports: 'IScroll',
		},
		'mcrypt': {
			deps: ['rijndael'],
			exports: 'mcrypt',
		},
		'rijndael': {
			exports: 'Rijndael',
		},
	},

});


function onBodyLoad() {
	if (navigator.userAgent.match(App.Config.mobileUserAgent)) {
		if (App.Config.debug) console.log('mobile');
		document.addEventListener("deviceready", onDeviceReady, false);
	} else if (navigator.userAgent.match(App.Config.tizenUserAgent)) {
		if (App.Config.debug) console.log('tizen');
		onDeviceReady();
	} else {
		if (App.Config.debug) console.log('browser');
		onDeviceReady();
	}
}

function onDeviceReady() {
	if (App.Config.debug) console.log('deviceready');
	require(["app/app"]);
}



document.write(App.Config.appName);
document.write(App.Config.version);






















define(function (require) {

	"use strict";

	var $ 				= require('jquery'),
		$bindfirst 		= require('jquery_bindfirst'),
		Hammer			= require('hammerjs'),
		$Hammer			= require('jquery_hammer'),

		DataCache = require("app/utils/datacache"),
		Scroller = require('app/utils/scroller');

	var Events = App.Events = {

		Config: {
			hammer_settings: {
				drag: false,
				swipe: false,
				transform: false,
			},
		},

		onBackKeyDown: function(event) {
			if (event) event.preventDefault();
			var hash = window.location.hash;
			if (["", "#menu/contactus", "#menu/about"].indexOf(hash) != -1) {
				App.Router.navigate("#menu", {trigger: true});
			} else if (["#menu/about/privacy", "#menu/about/terms"].indexOf(hash) != -1) {
				App.Router.navigate("#menu/about", {trigger: true});
			} else if (hash.indexOf("#competition") == 0) {
				App.Router.navigate("#", {trigger: true});
			} else if (hash.indexOf("#team") == 0) {
				var comp_id = DataCache.get("history", "comp_id");
				var season = DataCache.get("history", "season");
				App.Router.navigate("#competition/" + comp_id + (season ? "/"+season : ""), {trigger: true});
			} else if (hash.indexOf("#person") == 0) {
				var team_id = DataCache.get("history", "team_id");
				var season = DataCache.get("history", "season");
				App.Router.navigate("#team/" + team_id + (season ? "/"+season : ""), {trigger: true});
			} else if (hash === "#menu") {

			} else {
				App.Router.navigate("#menu", {trigger: true});
			}
		},

		onMenuKeyDown: function(event) {
			if (event) event.preventDefault();
			App.Router.navigate("#menu", {trigger: true});
		},

		init: function() {

			if (navigator.userAgent.match(App.Config.mobileUserAgent)) {
				document.addEventListener("backbutton", Events.onBackKeyDown, false);
				document.addEventListener("menubutton", Events.onMenuKeyDown, false);
			} else if (navigator.userAgent.match(App.Config.tizenUserAgent)) {
				document.addEventListener('tizenhwkey', function(e) {
					if (e.keyName == "back") {
						Events.onBackKeyDown(e);
					}
					if (e.keyName == "menu") {
						Events.onMenuKeyDown(e);
					}
				});
			}

			document.addEventListener("touchstart", function(){}, true);

			$("body").on("click", ".back-button", function(event) {
				event.preventDefault();
				Events.onBackKeyDown(event);
			});

			$("body").hammer(Events.Config.hammer_settings).on("tap", "ul.highlight > li > a", function(event) {
				// save current scroll position
				var id = $(".main-content", "#appcontent").attr("id");
				DataCache.save("scroller", id+"_x", Scroller.x(id));
				DataCache.save("scroller", id+"_y", Scroller.y(id));

				var $this = $(this);
				$this.one("webkitAnimationEnd", function() {
					$this.removeClass("active");
				}).addClass("active");
			});

			$("body").hammer(Events.Config.hammer_settings).on("tap", ".topcoat-icon-button--quiet", function(event) {
				var $this = $(this);
				$this.one("webkitAnimationEnd", function() {
					$this.removeClass("active");
				}).addClass("active");
			});

		},

	};

	return Events;

});


var App = {

	Router: {},

	Views: {},

	Controllers: {},

	Config: {
		appName: "Football Squad",
		code: "fs2013",
		debug: false,
		version: "v1.0.5",
		mobileUserAgent: /(iPhone|iPod|iPad|Android|BlackBerry)/,
		tizenUserAgent: /(Tizen)/,
	},

	Server: {
		url: "http://fs2.nethruworks.com",
		base: "/api/v2",
		k: "m5vewY2yrKVCvbzS",
		b: 256,
	},

	Session: {
		cache: {},
		favorites: [],
		favoriteTeams: [],
	},

	Constants: {
		defaultSeason: {
			"1": "2014-2015",
			"2": "2014-2015",
			"3": "2014-2015",
			"4": "2014-2015",
			"5": "2014-2015",
			"6": "2013-2014",
		},
	},

	Models: {},

	Collections: {},

	DAO: {},

	LocalDB: {},

};


define(function (require) {

	"use strict";

	var Backbone = require("backbone"),
		DataCache = require("app/utils/datacache"),
		Network = require("app/utils/network");

	var Crud = function(entity){

		var dbEntity = entity;

		var crud = {

			fetchServer: function(model, ori_data, callback) {
				model.fetchServer = false;
				if (model.url) {
					var success = callback.success;
					callback.success = function(response) {
						success(response);
					};

					Backbone.sync("read", model, callback);
				} else {
					callback.success(ori_data);
				}
			},

			readOne: function(model, callback) {
				dbEntity.get(model, {
					filters: callback.filters,
					success: function(item) {
						callback.success(item);
					},
				});
			},

			readAll: function(model, callback) {

				var toFetchServer = model.fetchServer === true;

				if (Network.check() === true && toFetchServer) {
					crud.fetchServer(model, null, callback);
				} else {
					dbEntity.getAll(model, {
						filters: callback.filters,
						success: function(collection) {
							toFetchServer = toFetchServer || collection == null;
							toFetchServer = toFetchServer || (Array.isArray(collection) && collection.length < 1);
							toFetchServer = toFetchServer || (!Array.isArray(collection) && collection.id === undefined);

							if (Network.check() === true && toFetchServer === true) {
								crud.fetchServer(model, collection, callback);
							} else {
								callback.success(collection);
							}
						},
					});
				}

			},

			createAction: function(model, callback) {
				dbEntity.create(model, callback);
			},

			updateAction: function(model, callback) {
				dbEntity.update(model, callback);
			},

			deleteAction: function(model, callback) {
				dbEntity.remove(model, callback);
			},

		};

		return crud;
	};

	var CrudWrapper = function(crud) {

		var dbCrud = crud;

		var hybridSync = function(method, model, callback) {
			switch (method) {
				case "read":
					if (model.id) {
						dbCrud.readOne(model, callback);
					} else {
						dbCrud.readAll(model, callback);
					}
					break;
				case "create":
					dbCrud.createAction(model, callback);
					break;
				case "update":
					dbCrud.updateAction(model, callback);
					break;
				case "delete":
					dbCrud.deleteAction(model, callback);
					break;
			}
		};

		return hybridSync;

	};

	return {
		Crud: Crud,
		CrudWrapper: CrudWrapper,
	};

});


define(function (require) {

	"use strict";

	var $ = require('jquery');

	var DB = {

		init: function() {

			var Adapters = require("app/adapters/init");
			Adapters.setup();

			var deferred = $.Deferred();
			Adapters.init().done(function() {
				
				var competitionDAO = App.DAO.CompetitionDAO;
				var teamDAO = App.DAO.TeamDAO;
				var competesDAO = App.DAO.CompetesDAO;
				var personDAO = App.DAO.PersonDAO;
				var playsDAO = App.DAO.PlaysDAO;
				var managesDAO = App.DAO.ManagesDAO;
				var updaterDAO = App.DAO.UpdaterDAO;
				// favoriteDAO		= new $.models.Favorite().dao,
				// versionDAO		= new $.models.Version().dao,

				var deferreds = [];
				deferreds.push(competitionDAO.onStart());
				deferreds.push(competesDAO.onStart());
				deferreds.push(teamDAO.onStart());
				deferreds.push(personDAO.onStart());
				deferreds.push(playsDAO.onStart());
				deferreds.push(managesDAO.onStart());
				deferreds.push(updaterDAO.onStart());
				
				$.when.apply($, deferreds).done(function () {
					// versionDAO.update(new $.models.Version({object: "app", version: App.Config.version}));

					if (App.Config.debug) console.log('data init success');
					deferred.resolve();
				});
			});
			return deferred.promise();

		},

	};

	return DB;

});

define(function (require) {

	"use strict";

	var $				= require('jquery'),
		_				= require('underscore'),
		Backbone		= require('backbone'),
		async			= require('async'),
		PageSlider		= require('app/utils/pageslider'),
		Loader			= require('app/utils/loader'),
		DataCache 		= require('app/utils/datacache'),
		SeasonUtils		= require('app/utils/seasonutils'),
		ImageLoader		= require('app/utils/imageloader'),

		Models			= require('app/models/init');

	App.Controllers.Main = Backbone.Router.extend({

		is_start: true,

		routes: {
			"menu": "menu",
			"menu/about": "about",
			"menu/about/privacy": "privacy",
			"menu/about/terms": "terms",
			"menu/contactus": "contactus",
			"": "competitions",
			"competition/:comp_id(/:season)": "competedTeams",
			"team/:team_id(/:season)": "team",
			"person/:person_id": "person",
		},

		initialize: function() {
			App.PageSlider = new PageSlider($('#appcontent'));
		},

		execute: function(callback, args) {
			ImageLoader.cancel();
			Loader.show();
			if (callback) {
				var _this = this;
				var wait = setInterval(function() {
					if (Models.getQueueSize() < 1) {
						clearInterval(wait);
						callback.apply(_this, args);
					}
				}, 200);
			}
		},

		changePage: function(view, fadeout) {
			var _this = this;
			var deferred = $.Deferred();

			var callback = function () {
				if (view.afterRender()) view.afterRender();

				// hide the loading icon
				Loader.hide();

				// $(document).dequeue("LocalQ");
				Models.saveNext();

				if (_this.is_start) {
					_this.is_start = false;
				}

				deferred.resolve();
			};

			view.render();

			if (fadeout === true) {
				App.PageSlider.slidePage(view, "fadeout", callback);
			} else {
				App.PageSlider.slidePage(view, callback);
			}

			return deferred.promise();
		},


		/*!----------- Routes started here ---------------*/
		menu: function() {
			var view = new App.Views.Menu();
			this.changePage(view);
		},

		about: function() {
			var view = new App.Views.About();
			this.changePage(view);
		},

		privacy: function() {
			var view = new App.Views.Privacy();
			this.changePage(view);
		},

		terms: function() {
			var view = new App.Views.Terms();
			this.changePage(view);
		},

		contactus: function() {
			var view = new App.Views.ContactUs();
			this.changePage(view);
		},

		competitions: function() {
			var _this = this;
			async.waterfall([
				// 1. fetch competition list
				function(callback) {
					var collection = new App.Collections.CompetitionList();
					collection.fetch({
						success: function() {
							callback(null, collection);
						},
					});
				},
			],
			// callback
			function(error, competitionList) {
				var view = new App.Views.Competitions({
					collection: competitionList,
				});
				_this.changePage(view);
			});
		},

		competedTeams: function(comp_id, season) {
			var _this = this;
			comp_id = parseInt(comp_id, 10);
			season = season || SeasonUtils.getCurrent();
			async.waterfall([
				// 1. fetch competition
				function(callback) {
					var competition = new App.Models.Competition({
						comp_id: comp_id,
					});

					competition.fetch({
						filters: {
							comp_id: comp_id,
						},
						success: function() {
							callback(null, competition);
						},
					});
				},
				// 2. fetch competes list
				function(competition, callback) {
					var competesList = new App.Collections.CompetesList([], {
						comp_id: comp_id,
						season: season,
					});

					competesList.fetch({
						filters: {
							comp_id: comp_id,
							season: season,
						},
						success: function() {
							callback(null, competition, competesList);
						},
					});
				},
				// 3. fetch team for each competes record
				function(competition, competesList, callback) {
					var deferreds = [];
					var teamlist = new Backbone.Collection();

					competesList.each(function(item) {
						var deferred = $.Deferred();

						var team = new App.Models.Team({
							team_id: item.get("team_id"),
						});

						team.fetch({
							filters: {
								team_id: item.get("team_id"),
							},
							success: function(resp) {
								teamlist.push(resp);
								deferred.resolve();
							},
						});

						deferreds.push(deferred);
					});

					$.when.apply($, deferreds).then(function() {
						teamlist.comparator = "short_name";
						teamlist.sort();
						callback(null, competition, teamlist);
					});
				},
			],
			// callback
			function(error, competition, teamlist) {
				var view = new App.Views.CompetedTeams({
					comp_id: comp_id,
					competition: competition,
					collection: teamlist,
					season: season,
				});
				_this.changePage(view);
			});
		},

		team: function(team_id, season) {
			var _this = this;
			team_id = parseInt(team_id, 10);
			season = season || SeasonUtils.getCurrent();
			async.waterfall([
				// 1. fetch team
				function(callback) {
					var team = new App.Models.Team({
						team_id: team_id,
					});
					team.fetch({
						filters: {
							team_id: team_id,
						},
						success: function() {
							callback(null, team);
						},
					});
				},
				// 2. fetch players
				function(team, callback) {
					var players = new App.Collections.PlaysList([], {
						team_id: team_id,
						season: season,
					});
					players.fetch({
						filters: {
							team_id: team_id,
							season: season,
							// is_current: 1,
							// deleted_at: null,
						},
						success: function() {
							callback(null, team, players);
						},
					});
				},
				// 3. fetch person for each players record
				function(team, players, callback) {
					var deferreds = [];
					var newlist = new Backbone.Collection();

					players.each(function(item) {
						var deferred = $.Deferred();

						item.person = new App.Models.Person({
							person_id: item.get("person_id"),
						});

						item.person.fetch({
							filters: {
								person_id: item.get("person_id"),
							},
							success: function() {
								newlist.push(item);
								deferred.resolve();
							},
						});

						deferreds.push(deferred);
					});

					$.when.apply($, deferreds).then(function() {
						newlist.comparator = players.comparator;
						newlist.sort();
						callback(null, team, newlist);
					});
				},
				// 4. fetch staffs
				function(team, players, callback) {
					var staffs = new App.Collections.ManagesList([], {
						team_id: team_id,
						season: season,
					});
					staffs.fetch({
						filters: {
							team_id: team_id,
							season: season,
							// is_current: 1,
							// deleted_at: null,
						},
						success: function() {
							callback(null, team, players, staffs);
						},
					});
				},
				// 5. fetch person for each staffs record
				function(team, players, staffs, callback) {
					var deferreds = [];
					var newlist = new Backbone.Collection();

					staffs.each(function(item) {
						var deferred = $.Deferred();

						item.person = new App.Models.Person({
							person_id: item.get("person_id"),
						});

						item.person.fetch({
							filters: {
								person_id: item.get("person_id"),
							},
							success: function() {
								newlist.push(item);
								deferred.resolve();
							},
						});

						deferreds.push(deferred);
					});

					$.when.apply($, deferreds).then(function() {
						newlist.comparator = staffs.comparator;
						newlist.sort();
						callback(null, team, players, newlist);
					});
				},
				// 6. fetch competes list
				function(team, players, staffs, callback) {
					var competesList = new App.Collections.CompetesList([], {
						team_id: team_id,
					});

					competesList.fetch({
						filters: {
							team_id: team_id,
						},
						success: function() {
							callback(null, team, players, staffs, competesList);
						},
					});
				},
				// 7. fetch competitions for the competes list
				function(team, players, staffs, competesList, callback) {
					var deferreds = [];
					var newlist = new Backbone.Collection();

					competesList.each(function(item) {
						var deferred = $.Deferred();

						var competition = new App.Models.Competition({
							comp_id: item.get("comp_id"),
						});

						competition.fetch({
							filters: {
								comp_id: item.get("comp_id"),
							},
							success: function() {
								item.competition = competition;
								newlist.add(item);
								deferred.resolve();
							},
						});

						deferreds.push(deferred);
					});

					$.when.apply($, deferreds).then(function() {
						callback(null, team, players, staffs, newlist);
					});
				}
			],
			// callback
			function(error, team, players, staffs, competesList) {
				var view = new App.Views.Team({
					team_id: team_id,
					competesList: competesList,
					team: team,
					players: players,
					staffs: staffs,
					season: season,
				});
				_this.changePage(view);
			});
		},

		person: function(person_id) {
			var _this = this;
			person_id = parseInt(person_id, 10);
			async.waterfall([
				// 1. fetch person
				function(callback) {
					var person = new App.Models.Person({
						person_id: person_id,
					});
					person.fetch({
						filters: {
							person_id: person_id,
						},
						success: function() {
							callback(null, person);
						},
					});
				},
			],
			// callback
			function(error, person) {
				var view = new App.Views.Person({
					person_id: person_id,
					person: person,
				});
				_this.changePage(view);
			});
		},

	});

});


define(function (require) {

	"use strict";

	var $ 				= require('jquery'),
		Backbone 		= require('backbone'),
		Events			= require('app/events'),
		DB 				= require('app/db'),
		FS 				= require('app/utils/fs'),
		Network 		= require('app/utils/network'),
		TemplateLoader	= require('app/utils/templateloader'),
		Loader 			= require('app/utils/loader'),
		Nations			= require('app/data/nations');


	if (App.Config.debug) {
		App.Server.url = "http://admin.footballsquad.localhost";
	}

	App.Session.nations = Nations;
	FS.initCache();
	Events.init();

	var db_done			= $.Deferred();
	var models_done		= $.Deferred();
	var views_done		= $.Deferred();

	// 1. Init database
	DB.init().done(function() {
		db_done.resolve();
	});

	// 2. Init models
	db_done.done(function() {
		require(["app/models/init"], function(Models) {
			Models.init().done(function() {
				models_done.resolve();
			});
		});
	});

	// 3. Init views
	models_done.done(function() {
		require(["app/views/init"], function(Views) {
			Views.init().done(function() {
				views_done.resolve();
			});
		});
	});

	$.when.apply($, [db_done, models_done, views_done]).done(function() {

		// save device info
		// Network.saveDevice();

		// save favorite teams
		// var uuid = navigator.userAgent.match(window.config.mobileUserAgent) ? device.uuid : "t01";
		// var data = {
		// 	team_ids: JSON.stringify(window.session.favorites),
		// };
		// Network.saveToServer("api/v2/favorites/"+uuid, data, function (data) {
		// 	if (window.config.debug) console.log(data);
		// });

		var templateList = [
			"Competitions",
			"CompetedTeams",
			"Menu",
			"About",
			"Privacy",
			"Terms",
			"ContactUs",
			"TeamInfo",
			"TeamPlayers",
			"TeamStaffs",
			"PersonInfo",
		];

		TemplateLoader.load(templateList, function() {
			if (App.Config.debug) console.log("all templates loaded");

			require(['app/router'], function() {
				App.Router = new App.Controllers.Main();
				Backbone.history.start();
				Loader.hide();
				$(".loadingcontent").remove();

				if (App.Config.debug) console.log("App Started!!");
			});
		});

	});

});


define(function (require) {

	"use strict";

	var _ = require('underscore'),

		EntityExtension = require('app/adapters/generic').EntityExtension;

	var ManagesEntity = persistence.define('Manages', {
		// id: "INT",			// auto generate by persistencejs
		team_id: "INT",
		person_id: "INT",
		season: "TEXT",
		season_order: "INT",
		role: "TEXT",
		created_at: "DATE",
		updated_at: "DATE",
		deleted_at: "DATE",
		is_current: "BOOL",
		pteam: "TEXT",
		nteam: "TEXT",
	});

	ManagesEntity.getEntityName = function() {
		return "Manages";
	};

	ManagesEntity.convertModel = function(item, model) {
		// item.id = model.get('id');
		item.team_id = model.get('team_id');
		item.person_id = model.get('person_id');
		item.season = model.get('season');
		item.season_order = model.get('season_order');
		item.role = model.get('role');
		item.created_at = EntityExtension.convertTimestamp(model.get('created_at'));
		item.updated_at = EntityExtension.convertTimestamp(model.get('updated_at'));
		item.deleted_at = EntityExtension.convertTimestamp(model.get('deleted_at'));
		item.is_current = model.get('is_current') == 1;
		item.pteam = model.get('pteam');
		item.nteam = model.get('nteam');
	};

	ManagesEntity.getAll = function(model, callback) {
		EntityExtension.getAll(ManagesEntity, model, callback);
	};

	ManagesEntity.get = function(model, callback) {
		EntityExtension.get(ManagesEntity, model.id, callback);
	};

	ManagesEntity.create = function(model, callback) {
		EntityExtension.create(ManagesEntity, model, callback, false);
	};

	ManagesEntity.update = function(model, callback) {
		EntityExtension.update(ManagesEntity, model.id, model, callback, false);
	};

	ManagesEntity.remove = function(model, callback) {
		EntityExtension.remove(ManagesEntity, model.id, model, callback, false);
	};

	ManagesEntity.onStart = function() {

	};

	App.DAO.ManagesDAO = ManagesEntity;

});


define(function (require) {

	"use strict";

	var _ = require('underscore'),

		EntityExtension = require('app/adapters/generic').EntityExtension;

	var PersonEntity = persistence.define('Person', {
		person_id: "INT",
		name: "TEXT",
		full_name: "TEXT",
		position: "INT",
		nation: "TEXT",
		dob: "DATE",
		height: "INT",
		created_at: "DATE",
		updated_at: "DATE",
	});

	PersonEntity.getEntityName = function() {
		return "Person";
	};

	PersonEntity.convertModel = function(item, model) {
		item.person_id = model.get('person_id');
		item.name = model.get('name');
		item.full_name = model.get('full_name');
		item.position = model.get('position');
		item.nation = model.get('nation');
		item.dob = model.get('dob');
		item.height = model.get('height');
		item.created_at = EntityExtension.convertTimestamp(model.get('created_at'));
		item.updated_at = EntityExtension.convertTimestamp(model.get('updated_at'));
	};

	PersonEntity.getAll = function(model, callback) {
		EntityExtension.getAll(PersonEntity, model, callback);
	};

	PersonEntity.get = function(model, callback) {
		EntityExtension.get(PersonEntity, model.id, callback);
	};

	PersonEntity.create = function(model, callback) {
		EntityExtension.create(PersonEntity, model, callback, false);
	};

	PersonEntity.update = function(model, callback) {
		EntityExtension.update(PersonEntity, model.id, model, callback, false);
	};

	PersonEntity.remove = function(model, callback) {
		EntityExtension.remove(PersonEntity, model.id, model, callback, false);
	};

	PersonEntity.onStart = function() {

	};

	App.DAO.PersonDAO = PersonEntity;

});


define(function (require) {

	"use strict";

	var _ = require('underscore'),

		EntityExtension = require('app/adapters/generic').EntityExtension;

	var CompetesEntity = persistence.define('Competes', {
		// id: "INT",		// auto generate by persistencejs
		comp_id: "INT",
		team_id: "INT",
		season: "TEXT",
		created_at: "DATE",
		updated_at: "DATE",
		deleted_at: "DATE",
	});

	CompetesEntity.getEntityName = function() {
		return "Competes";
	};

	CompetesEntity.convertModel = function(item, model) {
		// item.id = model.get('id');
		item.comp_id = model.get('comp_id');
		item.team_id = model.get('team_id');
		item.season = model.get('season');
		item.created_at = EntityExtension.convertTimestamp(model.get('created_at'));
		item.updated_at = EntityExtension.convertTimestamp(model.get('updated_at'));
		item.deleted_at = EntityExtension.convertTimestamp(model.get('deleted_at'));
	};

	CompetesEntity.getAll = function(model, callback) {
		EntityExtension.getAll(CompetesEntity, model, callback);
	};

	CompetesEntity.get = function(model, callback) {
		EntityExtension.get(CompetesEntity, model.id, callback);
	};

	CompetesEntity.create = function(model, callback) {
		EntityExtension.create(CompetesEntity, model, callback, false);
	};

	CompetesEntity.update = function(model, callback) {
		EntityExtension.update(CompetesEntity, model.id, model, callback, false);
	};

	CompetesEntity.remove = function(model, callback) {
		EntityExtension.remove(CompetesEntity, model.id, model, callback, false);
	};

	CompetesEntity.onStart = function() {

	};

	App.DAO.CompetesDAO = CompetesEntity;

});


define(function (require) {

	"use strict";

	var $ = require('jquery');

	var adapters = [
		"app/adapters/competition",
		"app/adapters/team",
		"app/adapters/competes",
		"app/adapters/person",
		"app/adapters/plays",
		"app/adapters/manages",
		"app/adapters/updater",
	];

	var Adapters = {

		setup: function() {

			var supports_webdatabase = !!window.openDatabase;
			var using_localstorage = !supports_webdatabase;

			if (supports_webdatabase) {

				// Empty methods which would be implemented by persistence.store.memory
				persistence.loadFromLocalStorage = function(callback) { callback(); };
				persistence.saveToLocalStorage = function(callback) { callback(); };

				if (navigator.userAgent.match(App.Config.mobileUserAgent)) {
					// Use Cordova Plugin
					persistence.store.cordovasql.config(persistence, "FSDB1", "1.0", "Football Squad DB", 0.5 * 1024 * 1024, 0);
				} else {
					// Use WebSQL
					persistence.store.websql.config(persistence, "FSDB1", "Football Squad DB", 0.5 * 1024 * 1024);
				}

			} else {

				// Use localStorage
				persistence.store.memory.config(persistence, "FSDB1", 0.5 * 1024 * 1024, "1.0");

			}

			// Confs
			persistence.debug = App.Config.debug;
			
		},

		init: function() {
			
			var deferred = $.Deferred();
			require(adapters, function() {
				var Competition = App.DAO.CompetitionDAO;
				var Team = App.DAO.TeamDAO;
				var Competes = App.DAO.CompetesDAO;
				var Person = App.DAO.PersonDAO;
				var Plays = App.DAO.PlaysDAO;
				var Manages = App.DAO.ManagesDAO;

				// Competition.hasMany('competedTeams', Competes, 'comp_id');
				// Team.hasMany('leagues', Competes, 'team_id');
				// Team.hasMany('players', Plays, 'team_id');
				// Team.hasMany('staffs', Manages, 'team_id');
				// Person.hasMany('playedTeams', Plays, 'person_id');
				// Person.hasMany('managedTeams', Manages, 'person_id');

				persistence.schemaSync(function(tx) {
					if (App.Config.debug) console.log("init adapters success");
					deferred.resolve();
				});
			});
			return deferred.promise();

		},

	};

	return Adapters;

});

define(function (require) {

	"use strict";

	// Sync local database with server
	var db = {

		// Load elements from localStorage (if used) and sync with server (if dontSync == false)
		load: function(callback) {
			persistence.loadFromLocalStorage(function() { // if using localStorage
				callback();
			});
		},
		// Save elements to localStorage (if used) and sync with server (if dontSync == false)
		save: function(callback, item) {
			persistence.saveToLocalStorage(function() { // if using localStorage
				persistence.flush(); // Flush the new changes
				callback();
			});
		},

	};



	var EntityExtension = {};

	EntityExtension.getAll = function(entity, model, callback) {
		var dbEntity = entity;

		db.load(function() {
			var selectOne = false;
			if (model instanceof Backbone.Model) {
				selectOne = true;
			}

			if (callback.filters) {
				dbEntity = dbEntity.all();

				var filters = callback.filters;
				_.each(Object.keys(filters), function(col) {
					dbEntity = dbEntity.filter(col, '=', filters[col]);
				});
				dbEntity.list(null, function(results) { // Asynchronously fetches the results matching the query
					var resp = [];
					results.forEach(function(item) { // Iterate over the results
						resp.push(item.toJSON());
					});
					EntityExtension.response(callback, resp, selectOne); // Success callback (will render the page)
				});
			} else if (model instanceof persistence.PropertyFilter
				|| model instanceof persistence.AndFilter
				|| model instanceof persistence.OrFilter) {
				dbEntity = dbEntity.all();

				var filter = model;
				dbEntity.and(filter).list(null, function(results) { // Asynchronously fetches the results matching the query
					var resp = [];
					results.forEach(function(item) { // Iterate over the results
						resp.push(item.toJSON());
					});
					EntityExtension.response(callback, resp, selectOne); // Success callback (will render the page)
				});
			} else {
				dbEntity.all().list(null, function(results) { // Asynchronously fetches the results matching the query
					var resp = [];
					results.forEach(function(item) { // Iterate over the results
						resp.push(item.toJSON());
					});
					EntityExtension.response(callback, resp, selectOne); // Success callback (will render the page)
				});
			}
		});
	};

	EntityExtension.get = function(entity, id, callback) {
		var dbEntity = entity;

		db.load(function() {
			dbEntity.load(id, function(item) {
				if (item != null) {
					EntityExtension.response(callback, item.toJSON(), true); // Success callback (will render the page)
				} else {
					EntityExtension.response(callback, null, true);
				}
			});
		});
	};

	EntityExtension.create = function(entity, model, callback, with_timestamp) {
		var dbEntity = entity;
		var item = new dbEntity();
		// The constructor automatically generates an id
		dbEntity.convertModel(item, model);
		var now = new Date();
		if (with_timestamp === true) {
			item.created_at = now.toDBString();
			item.updated_at = now.toDBString();
		}
		persistence.add(item); // Add to database
		model.set(item.toJSON());

		// Save changes in localStorage (if using) and sync with server
		db.save(function() {
			EntityExtension.response(callback, model, true); // Success callback (will render the page)
		}, item);
	};

	EntityExtension.update = function(entity, id, model, callback, with_timestamp) {
		var dbEntity = entity;
		dbEntity.load(id, function(item) {
			dbEntity.convertModel(item, model);
			var now = new Date();
			if (with_timestamp === true) {
				item.updated_at = now.toDBString();
			}
			model.set(item.toJSON());

			// Save changes in localStorage (if using) and sync with server
			db.save(function() {
				EntityExtension.response(callback, model, true); // Success callback (will render the page)
			}, item);
		});
	};

	EntityExtension.remove = function(entity, id, model, callback, with_deleted) {
		var dbEntity = entity;

		if (id) {
			dbEntity.load(id, function(item) {
				if (item) {
					if (with_deleted === true) {
						var now = new Date();
						item.deleted_at = now.toDBString();
						model.set(item.toJSON());
					} else {
						persistence.remove(item);
					}
				}

				// Save changes in localStorage (if using) and sync with server
				db.save(function() {
					EntityExtension.response(callback, model, true);
				}, item);
			});
		} else if (callback.filters) {
			dbEntity = dbEntity.all();

			var filters = callback.filters;
			_.each(Object.keys(filters), function(col) {
				dbEntity = dbEntity.filter(col, '=', filters[col]);
			});
			dbEntity.list(null, function(results) { // Asynchronously fetches the results matching the query
				results.forEach(function(item) { // Iterate over the results
					if (item) {
						if (with_deleted === true) {
							var now = new Date();
							item.deleted_at = now.toDBString();
						} else {
							persistence.remove(item);
						}
					}
				});

				// Save changes in localStorage (if using) and sync with server
				db.save(function() {
					EntityExtension.response(callback, true, true);
				}, results);
			});
		} else {
			if (callback) EntityExtension.response(callback, false, true);
		}
	};

	EntityExtension.response = function(callback, resp, selectOne) {
		var returnData = resp;
		if (selectOne === true && resp instanceof Array) {
			returnData = resp.length > 0 ? resp[0] : null;
		}

		if (callback) callback.success(returnData);
	};

	EntityExtension.convertTimestamp = function(ts) {
		if (ts && ts.indexOf("+00:00") < 0) {
			return ts + " +00:00";
		}
		return ts;
	};

	return {
		EntityExtension: EntityExtension,
	};

});


define(function (require) {

	"use strict";

	var _ = require('underscore'),

		EntityExtension = require('app/adapters/generic').EntityExtension;

	var PlaysEntity = persistence.define('Plays', {
		// id: "INT",			// auto generate by persistencejs
		team_id: "INT",
		person_id: "INT",
		season: "TEXT",
		season_order: "INT",
		number: "INT",
		is_captain: "BOOL",
		is_vicecaptain: "BOOL",
		is_loan: "BOOL",
		created_at: "DATE",
		updated_at: "DATE",
		deleted_at: "DATE",
		is_current: "BOOL",
		pteam: "TEXT",
		nteam: "TEXT",
		nteam_loan: "BOOL",
	});

	PlaysEntity.getEntityName = function() {
		return "Plays";
	};

	PlaysEntity.convertModel = function(item, model) {
		// item.id = model.get('id');
		item.team_id = model.get('team_id');
		item.person_id = model.get('person_id');
		item.season = model.get('season');
		item.season_order = model.get('season_order');
		item.number = model.get('number');
		item.is_captain = model.get('is_captain') == 1;
		item.is_vicecaptain = model.get('is_vicecaptain') == 1;
		item.is_loan = model.get('is_loan') == 1;
		item.created_at = EntityExtension.convertTimestamp(model.get('created_at'));
		item.updated_at = EntityExtension.convertTimestamp(model.get('updated_at'));
		item.deleted_at = EntityExtension.convertTimestamp(model.get('deleted_at'));
		item.is_current = model.get('is_current') == 1;
		item.pteam = model.get('pteam');
		item.nteam = model.get('nteam');
		item.nteam_loan = model.get('nteam_loan') == 1;
	};

	PlaysEntity.getAll = function(model, callback) {
		EntityExtension.getAll(PlaysEntity, model, callback);
	};

	PlaysEntity.get = function(model, callback) {
		EntityExtension.get(PlaysEntity, model.id, callback);
	};

	PlaysEntity.create = function(model, callback) {
		EntityExtension.create(PlaysEntity, model, callback, false);
	};

	PlaysEntity.update = function(model, callback) {
		EntityExtension.update(PlaysEntity, model.id, model, callback, false);
	};

	PlaysEntity.remove = function(model, callback) {
		EntityExtension.remove(PlaysEntity, model.id, model, callback, false);
	};

	PlaysEntity.onStart = function() {

	};

	App.DAO.PlaysDAO = PlaysEntity;

});


define(function (require) {

	"use strict";

	var _ = require('underscore'),

		EntityExtension = require('app/adapters/generic').EntityExtension;

	var UpdaterEntity = persistence.define('Updater', {
		version: "TEXT",
	});

	UpdaterEntity.getEntityName = function() {
		return "Updater";
	};

	UpdaterEntity.convertModel = function(item, model) {
		item.version = model.get('version');
	};

	UpdaterEntity.getAll = function(model, callback) {
		EntityExtension.getAll(UpdaterEntity, model, callback);
	};

	UpdaterEntity.get = function(model, callback) {
		EntityExtension.get(UpdaterEntity, model.id, callback);
	};

	UpdaterEntity.create = function(model, callback) {
		EntityExtension.create(UpdaterEntity, model, callback, false);
	};

	UpdaterEntity.update = function(model, callback) {
		EntityExtension.update(UpdaterEntity, model.id, model, callback, false);
	};

	UpdaterEntity.remove = function(model, callback) {
		EntityExtension.remove(UpdaterEntity, model.id, model, callback, false);
	};

	UpdaterEntity.onStart = function() {

	};

	App.DAO.UpdaterDAO = UpdaterEntity;

});


define(function (require) {

	"use strict";

	var _ = require('underscore'),
		$ = require('jquery'),

		EntityExtension = require('app/adapters/generic').EntityExtension;

	var CompetitionEntity = persistence.define('Competition', {
		comp_id: "INT",
		full_name: "TEXT",
		short_name: "TEXT",
		nation: "TEXT",
		season: "TEXT",
		created_at: "DATE",
		updated_at: "DATE",
	});

	CompetitionEntity.getEntityName = function() {
		return "Competition";
	};

	CompetitionEntity.convertModel = function(item, model) {
		item.comp_id = model.get('comp_id');
		item.full_name = model.get('full_name');
		item.short_name = model.get('short_name');
		item.nation = model.get('nation');
		item.season = model.get('season');
		item.created_at = EntityExtension.convertTimestamp(model.get('created_at'));
		item.updated_at = EntityExtension.convertTimestamp(model.get('updated_at'));
	};

	CompetitionEntity.getAll = function(model, callback) {
		EntityExtension.getAll(CompetitionEntity, model, callback);
	};

	CompetitionEntity.get = function(model, callback) {
		EntityExtension.get(CompetitionEntity, model.id, callback);
	};

	CompetitionEntity.create = function(model, callback) {
		EntityExtension.create(CompetitionEntity, model, callback, false);
	};

	CompetitionEntity.update = function(model, callback) {
		EntityExtension.update(CompetitionEntity, model.id, model, callback, false);
	};

	CompetitionEntity.remove = function(model, callback) {
		EntityExtension.remove(CompetitionEntity, model.id, model, callback, false);
	};

	CompetitionEntity.onStart = function() {

	};

	App.DAO.CompetitionDAO = CompetitionEntity;

});


define(function (require) {

	"use strict";

	var _ = require('underscore'),

		EntityExtension = require('app/adapters/generic').EntityExtension;

	var TeamEntity = persistence.define('Team', {
		team_id: "INT",
		full_name: "TEXT",
		short_name: "TEXT",
		nickname: "TEXT",
		comp_id: "INT",
		stadium: "TEXT",
		nation: "TEXT",
		season: "TEXT",
		founded: "TEXT",
		rivals: "TEXT",
		derbies: "TEXT",
		created_at: "DATE",
		updated_at: "DATE",
	});

	TeamEntity.getEntityName = function() {
		return "Team";
	};

	TeamEntity.convertModel = function(item, model) {
		item.team_id = model.get('team_id');
		item.full_name = model.get('full_name');
		item.short_name = model.get('short_name');
		item.nickname = model.get('nickname');
		item.comp_id = model.get('comp_id');
		item.stadium = model.get('stadium');
		item.nation = model.get('nation');
		item.season = model.get('season');
		item.founded = model.get('founded');
		item.rivals = model.get('rivals');
		item.derbies = model.get('derbies');
		item.created_at = EntityExtension.convertTimestamp(model.get('created_at'));
		item.updated_at = EntityExtension.convertTimestamp(model.get('updated_at'));
	};

	TeamEntity.getAll = function(model, callback) {
		EntityExtension.getAll(TeamEntity, model, callback);
	};

	TeamEntity.get = function(model, callback) {
		EntityExtension.get(TeamEntity, model.id, callback);
	};

	TeamEntity.create = function(model, callback) {
		EntityExtension.create(TeamEntity, model, callback, false);
	};

	TeamEntity.update = function(model, callback) {
		EntityExtension.update(TeamEntity, model.id, model, callback, false);
	};

	TeamEntity.remove = function(model, callback) {
		EntityExtension.remove(TeamEntity, model.id, model, callback, false);
	};

	TeamEntity.onStart = function() {

	};

	App.DAO.TeamDAO = TeamEntity;

});


define(function (require) {

	"use strict";

	// Asynchronous template loader
	var TemplateLoader = {

		config: {
			debug: false,
		},

		// Map of preloaded templates for the app
		templates: {},

		// Recursively pre-load all the templates for the app.
		// This implementation should be changed in a production environment. A build script should concatenate
		// all the template files in a single file.
		load: function (names, callback) {

			var self = this;

			var loadTemplate = function (index) {
				var name = names[index];
				if (TemplateLoader.config.debug) console.log('loading template: ' + name);
				$.get('tpl/compressed/' + name + '.html', function (data) {
					self.templates[name] = data;
					index++;
					if (index < names.length) {
						loadTemplate(index);
					} else {
						if (callback) callback();
					}
				}, 'text');
			};

			loadTemplate(0);
		},

		// Get template by name from map of preloaded templates
		get: function (name) {
			return this.templates[name];
		}

	};

	return TemplateLoader;

});

define(function (require) {

	"use strict";

	// return require('app/utils/localcache');
	return require('app/utils/lrucache');

});

define(function (require) {
	
	"use strict";

	var _		= require('underscore'),
		$		= require('jquery');

	return {

		toFeet: function (num) {
			var feet = Math.floor(num * 3.3);
			var inch = Math.floor(((num * 3.3) - feet) * 12);
			return feet + " ft " + inch + " in";
		},

		padZero: function (num, max) {
			var str = "" + num;
			return str.length < max ? this.padZero("0"+str, max) : str;
		}

	};

});

define(function (require) {

	"use strict";

	var _		= require('underscore'),
		$		= require('jquery'),

		mcrypt = require('mcrypt'),
		k = App.Server.k,
		b = App.Server.b;

	var Network = {

		config: {
			remoteSite: App.Server.url,
			path: App.Server.base + "/devices",
			debug: false,
		},

		check: function() {
			if (navigator.userAgent.match(App.Config.mobileUserAgent)) {
				return navigator.connection.type != Connection.NONE;
			} else {
				return true;
			}
		},

		saveDevice: function() {
			if (Network.check()) {
				var data = {};
				if (navigator.userAgent.match(App.Config.mobileUserAgent)) {
					data.uuid = device.uuid;
					data.name = device.model;
					data.platform = device.platform;
					data.version = device.version;
				} else {
					data.uuid = "t01";
					data.name = "Testing Device";
					data.platform = "UAT";
					data.version = "0.0.1";
				}

				Network.saveToServer(Network.config.path, data, function(data) {
					if (data) {
						if (Network.config.debug) console.log(data);
					} else {
						if (Network.config.debug) console.error("Save to server error");
					}
				});
			}
		},

		saveToServer: function(path, data, callback) {
			if (Network.check()) {
				$.post(Network.config.remoteSite+path, data)
					.done(function(data) {
						if (callback) callback(Network.parse(data));
					})
					.fail(function() {
						if (callback) callback(null);
					});
			} else {
				if (callback) callback(null);
			}
		},

		parse: function(raw) {
			var parsed = mcrypt.Decrypt(raw, null, k+App.Config.code, 'rijndael-'+b, 'ecb');
			parsed = JSON.parse(parsed.trim().replace(/[\x00-\x1f]/g, ''));
			if (Network.config.debug)
				console.log("parsed: "+parsed.substring(0, 50)+(parsed.length>50?"...":""));
			return parsed;
		},

	};

	return Network;

});

define(function (require) {

	"use strict";

	var _		= require('underscore'),
		$		= require('jquery'),

		months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

	return {

		getAge: function(birthDate, otherDate) {
			birthDate = new Date(birthDate);
			otherDate = otherDate ? new Date(otherDate) : new Date();

			var years = (otherDate.getFullYear() - birthDate.getFullYear());

			if (otherDate.getMonth() < birthDate.getMonth() ||
				(otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate())) {
				years--;
			}

			return years;
		},

		toString: function(date) {
			date = new Date(date);
			return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
		},

		parse: function(dateString) {
			var date = new Date(dateString);
			return date;
		},

	};

});


define(function (require) {

	"use strict";

	var $ = require('jquery');

	var PageSlider = function(container) {

		var currentPage, $currentPage,
			removePage,
			stateHistory = [];

		this.back = function() {
			location.hash = stateHistory[stateHistory.length - 2];
		};

		this.push = function(page) {
			stateHistory.push(page);
		};

		this.pop = function() {
			stateHistory.pop();
		};

		// Use this function if you want PageSlider to automatically determine the sliding direction based on the state history
		this.slidePage = function(page, from, callback) {

			var l = stateHistory.length,
				state = window.location.hash;

			if (typeof from == "function") {
				callback = from;
				from = null;
			}

			if (l === 0) {
				stateHistory.push(state);
				this._transition(page, null, callback);
				return;
			}
			if (state === stateHistory[l - 2]) {
				stateHistory.pop();
				this._transition(page, from||'page-left', callback);
			} else {
				stateHistory.push(state);
				this._transition(page, from||'page-right', callback);
			}

		};

		this._transition = function(page, from, callback) {

			if (from === "fadeout") {
				this.fadeOut(page, callback);
			} else {
				this.slidePageFrom(page, from, callback);
			}

		};

		// Use this function directly if you want to control the sliding direction outside PageSlider
		this.slidePageFrom = function(page, from, callback) {

			var $page = page.$el ? page.$el : $(page);

			container.append($page);

			if (!currentPage || !from) {
				$page.attr("class", "page page-center");
				currentPage = page;
				$currentPage = $page;
				setTimeout(function () {
					if (callback) callback();
				}, 250);
				return;
			}

			// Position the page at the starting position of the animation
			$page.attr("class", "page " + from);

			$currentPage.one('webkitTransitionEnd transitionend', function (e) {
				if (removePage) removePage.close();
				removePage = null;
				$(this).remove();
				if (callback) callback();
			});

			// Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
			container[0].offsetWidth;

			setTimeout(function () {
				// Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
				$page.attr("class", "page transition page-center");
				$currentPage.attr("class", "page transition " + (from === "page-left" ? "page-right" : "page-left"));
				removePage = currentPage;
				currentPage = page;
				$currentPage = $page;
			}, 250);

		};

		this.fadeOut = function(page, callback) {

			var $page = page.$el ? page.$el : $(page);

			container.append($page);

			if (!currentPage) {
				$page.attr("class", "page page-center");
				currentPage = page;
				$currentPage = $page;
				setTimeout(function () {
					if (callback) callback();
				}, 250);
				return;
			}

			$page.attr("class", "page page-center");

			$currentPage.one('webkitTransitionEnd transitionend', function (e) {
				if (removePage) removePage.close();
				removePage = null;
				$(this).remove();
				if (callback) callback();
			});

			container[0].offsetWidth;

			setTimeout(function () {
				$currentPage.attr("class", "page transition fast page-left");
				removePage = currentPage;
				currentPage = page;
				$currentPage = $page;
			}, 0);

		};

	};

	return PageSlider;

});


define(function (require) {

	"use strict";

	var $			= require('jquery'),
		_			= require('underscore'),
		Hammer		= require('hammerjs'),
		$Hammer		= require('jquery_hammer'),
		iscroll 	= require('iscroll');

	var Scroller = {

		config: {
			debug: false,
			scroller: {
				bounce: true,
				click: true,
				preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },
			},
			scrollable: ".scroller_panel",
		},

		buffers: {},

		init: function(container) {
			var $scrollable = $(Scroller.config.scrollable, container);

			$scrollable.each(function(idx, element) {
				if (Scroller.config.debug) console.log("Init scrollable");
				var sc = new IScroll(element, Scroller.config.scroller);

				Scroller.buffers[$(element).attr("id")] = sc;
			});
		},

		refresh: function(id) {
			if (id) {
				setTimeout(function() {
					if (Scroller.config.debug) console.log("Refresh scrollable");
					if (Scroller.buffers[id]) Scroller.buffers[id].refresh();
				}, 0);
			} else {
				for (var sc in Scroller.buffers) {
					setTimeout(function() {
						if (Scroller.config.debug) console.log("Refresh scrollable");
						Scroller.buffers[sc].refresh();
					}, 0);
				}
			}
		},

		destroy: function(id) {
			if (id) {
				if (Scroller.config.debug) console.log("Destroy scrollable");
				if (Scroller.buffers[id]) Scroller.buffers[id].destroy();
			} else {
				for (var sc in Scroller.buffers) {
					if (Scroller.config.debug) console.log("Destroy scrollable");
					Scroller.buffers[sc].destroy();
					delete Scroller.buffers[sc];
				}
			}
		},

		x: function(id) {
			if (id) {
				if (Scroller.buffers[id]) return Scroller.buffers[id].x;
			}
			return null;
		},

		y: function(id) {
			if (id) {
				if (Scroller.buffers[id]) return Scroller.buffers[id].y;
			}
			return null;
		},

		scrollToElement: function(id, element, delay) {
			if (id) {
				if (Scroller.buffers[id]) {
					setTimeout(function() {
						Scroller.buffers[id].scrollToElement($(element)[0], delay);
					}, 0);
				}
			}
		},

		scrollTo: function(id, x, y, delay) {
			if (id) {
				if (Scroller.buffers[id]) {
					setTimeout(function() {
						Scroller.buffers[id].scrollTo(x, y, delay);
					}, 0);
				}
			}
		},

	};

	return Scroller;

});




define(function (require) {

	"use strict";

	var _		= require('underscore'),
		$		= require('jquery'),

		separator_defn = "-";

	var SeasonUtils = {

		get: function (fromYear, toYear, separator) {
			var from	= fromYear && _.isNumber(fromYear) ? fromYear : (new Date()).getFullYear(),
				to		= toYear && _.isNumber(toYear) ? toYear : (from + 1),
				sep		= separator && _.isString(separator) ? separator : separator_defn;
			return from + sep + to;
		},

		getCurrent: function(separator) {
			var from	= (new Date()).getFullYear(),
				to		= from + 1,
				sep		= separator && _.isString(separator) ? separator : separator_defn;

			if ((new Date()).getMonth() <= 6) {
				from--;
				to--;
			}

			return SeasonUtils.get(from, to, separator);
		},

		getArray: function(fromYear, toYear, separator) {
			var from	= fromYear && _.isNumber(fromYear) ? fromYear : 2010,
				to		= toYear && _.isNumber(toYear) ? toYear : (new Date()).getFullYear(),
				sep		= separator && _.isString(separator) ? separator : separator_defn;

			var list = [];
			for (var i=from; i<=to; i++) {
				var season = SeasonUtils.get(i, i+1, separator);
				list.push(season);
			}
			return list;
		},

		getArrayUntilCurrent: function(fromYear, separator) {
			var from	= fromYear && _.isNumber(fromYear) ? fromYear : 2010,
				to		= (new Date()).getFullYear(),
				sep		= separator && _.isString(separator) ? separator : separator_defn;

			if ((new Date()).getMonth() <= 8) {
				to--;
			}

			return SeasonUtils.getArray(from, to, separator);
		},

	};

	return SeasonUtils;

});


define(function (require) {

	"use strict";

	var FS = {

		fs: null,
		path: "remote-fs/",

		initCache: function(callback) {
			window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function(filesystem) {
				FS.fs = filesystem;
				FS.fs.root.getDirectory(FS.path, {create: true, exclusive: false}, function(dir) {
					if (App.Config.debug) console.log("Created dir "+dir.name);
				}, function(error) {
					console.error("Error creating directory "+error.code);
				});
				if (callback) callback();
			});
		},

		getFile: function(name, callback) {
			if (!FS.fs) {
				if (callback) callback(null);
				return;
			}
			FS.fs.root.getFile(FS.path+name, null, function(fileEntry) {
				fileEntry.file(function(file) {
					var reader = new FileReader();
					reader.onloadend = function(evt) {
						callback(evt.target.result);
					};
					reader.readAsText(file);
				});
			}, function() {
				callback(null);
			});
		},

		saveFile: function(name, data, callback) {
			if (!FS.fs) {
				if (callback) callback(false);
				return;
			}
			FS.fs.root.getFile(FS.path+name, {create: true, exclusive: false}, function(fileEntry) {
				fileEntry.createWriter(function(writer) {
					writer.onwriteend = function(evt) {
						if (callback) callback(true);
					};
					// not tested
					writer.write(new Blob([data], {type: 'text/plain'}));
				}, function() {
					if (callback) callback(false);
				});
			}, function() {
				if (callback) callback(false);
			});
		},

	};

	return FS;

});


define(function (require) {

	"use strict";

	var $ = require('jquery'),

		$cache = $(App.Session.cache),

		MAX_SIZE = 20;

	return {

		init: function(type, size) {
			if (!$cache[type]) {
				$cache[type] = [];
			}
		},

		save: function(type, key, data) {
			this.get(type, key, true);

			$cache[type].push({ key: key, data: data });
			if ($cache[type].length > MAX_SIZE) {
				$cache[type].shift();
			}
		},

		get: function(type, key, is_remove) {
			var object = null,
				idx = -1;

			if (!$cache[type]) {
				$cache[type] = [];
			}

			for (var i = 0; i < $cache[type].length; i++) {
				if ($cache[type][i] && key == $cache[type][i].key) {
					object = $cache[type][i].data;
					idx = i;
				}
			};

			if (is_remove && idx > -1) {
				$cache[type].splice(idx, 1);
			} else if (idx > -1) {
				var data = $cache[type].splice(idx, 1)[0];
				$cache[type].push(data);
			}

			return object;
		},

		clear: function(type, key) {
			if (key) {
				this.get(type, key, true);
			} else {
				if (!$cache[type]) {
					$cache[type] = [];
				}
				$cache[type].length = 0;
			}
		},

		toString: function() {
			for (var type in $cache) {
				console.log(type + ": " + $cache[type]);
			}
		}

	};

});

define(function (require) {

	"use strict";

	var $ = require('jquery'),
		lru = require('lru'),

		cache = new Array(),
		MAX_SIZE = 20;

	return {

		init: function(type, size) {
			if (!cache[type]) {
				if (size) cache[type] = new LRUCache(size);
				else cache[type] = new LRUCache(MAX_SIZE);
			}
		},

		save: function(type, key, data) {
			this.get(type, key, true);

			cache[type].put(key, data);
		},

		get: function(type, key, is_remove) {
			if (!cache[type]) {
				cache[type] = new LRUCache(MAX_SIZE);
			}

			if (is_remove) {
				return cache[type].remove(key);
			} else {
				return cache[type].get(key);
			}
		},

		clear: function(type, key) {
			if (!cache[type]) {
				cache[type] = new LRUCache(MAX_SIZE);
			}
			
			if (key) {
				cache[type].remove(key);
			} else {
				cache[type].removeAll();
			}
		},

		toString: function() {
			for (var type in cache) {
				console.log(type + ": " + cache[type].toJSON());
			}
		}

	}

});

define(function (require) {

	"use strict";

	var $ = require('jquery'),

		$apploader = $("#apploader");

	return {

		show: function(message) {
			$("#loader-message", $apploader).html(message || "Loading");
			$("body").addClass('ui-loading');
		},

		hide: function() {
			$("#loader-message", $apploader).html("Loading");
			$("body").removeClass('ui-loading');
		},

	};

});


define(function (require) {

	"use strict";

	var _				= require('underscore'),
		$				= require('jquery'),
		DataCache 		= require('app/utils/datacache'),
		Network 		= require('app/utils/network'),
		Updater			= require('app/utils/updater'),
		FS 				= require('app/utils/fs');

	DataCache.init("imageloadercomp", 20);
	DataCache.init("imageloaderteam", 100);
	DataCache.init("imageloaderavatar", 100);

	var ImageLoader = {

		config: {
			remoteSite: App.Server.url,
			localPath: "/img",
			remotePath: "/api/v2/images",
			imgClass: "cached",
			concurrentAjax: 5,
			debug: false,
			queue: "ImageLoaderQ",
		},

		currentAjax: 0,

		loadAll: function(target, delays) {
			delays = delays || 50;
			$("img."+ImageLoader.config.imgClass, $(target)).each(function () {
				var $img = $(this),
					type = $img.attr('data-type'),
					name = $img.attr('data-name'),
					mime = $img.attr('data-mime') || 'jpg';

				var d = ImageLoader._loadMemoryCache(type, name);
				if (d) {
					ImageLoader.display($img, mime, d);
				} else {
					$(document).queue(ImageLoader.config.queue, function () {
						ImageLoader.load(type, name, $img, mime);
					}).delay(delays, ImageLoader.config.queue);
				}
			});
			ImageLoader._next();
		},

		cancel: function() {
			$(document).clearQueue(ImageLoader.config.queue);
		},

		load: function(type, name, img, mime) {
			var d = ImageLoader._loadMemoryCache(type, name);
			if (d) {
				ImageLoader.display(img, mime, d);
			} else {
				var __loadRemoteDone = function (data) {
						if (data) {
							ImageLoader.display(img, mime, data);
							ImageLoader._saveToMemoryCache(type, name, data);
							ImageLoader._saveCache(type, name, data);
							ImageLoader.currentAjax--;
							ImageLoader._next();
						} else {
							ImageLoader.displayFail(img);
							ImageLoader.currentAjax--;
							ImageLoader._next();
						}
					},

					__loadLocalDone = function (data) {
						if (data) {
							ImageLoader.display(img, mime, data);
							ImageLoader._saveToMemoryCache(type, name, data);
							ImageLoader.currentAjax--;
							ImageLoader._next();
						} else {
							ImageLoader._loadRemote(type, name, __loadRemoteDone);
						}
					},

					__loadCacheDone = function (data) {
						if (data) {
							ImageLoader.display(img, mime, data);
							ImageLoader._saveToMemoryCache(type, name, data);
							ImageLoader.currentAjax--;
							ImageLoader._next();
						} else {
							ImageLoader._loadLocal(type, name, mime, __loadLocalDone);
						}
					};

				ImageLoader.currentAjax++;
				ImageLoader._loadCache(type, name, __loadCacheDone);
			}
		},

		_next: function() {
			if (ImageLoader.currentAjax < ImageLoader.config.concurrentAjax)
				$(document).dequeue(ImageLoader.config.queue);
		},

		_loadMemoryCache: function(type, name) {
			if (ImageLoader.config.debug) console.log("load memory cache");
			return DataCache.get("imageloader"+type, name);
		},

		_saveToMemoryCache: function(type, name, data) {
			DataCache.save("imageloader"+type, name, data);
		},

		_loadLocal: function(type, name, mime, callback) {
			if (ImageLoader.config.debug) console.log("load local");
			var filepath = ImageLoader._getPath(type, name, mime)+"?"+$.now();
			$.get(ImageLoader.config.localPath+filepath).done(function (data) {
				if (callback) callback(data);
			}).fail(function () {
				if (callback) callback(null);
			});
		},

		_loadCache: function(type, name, callback) {
			if (ImageLoader.config.debug) console.log("load fs cache");
			if (FS) {
				FS.getFile(type + "_" + name, callback);
			} else {
				if (callback) callback(null);
			}
		},

		_saveCache: function(type, name, data, callback) {
			if (FS) {
				FS.saveFile(type + "_" + name, data, callback);
			} else {
				if (callback) callback(null);
			}
		},

		_loadRemote: function(type, name, callback) {
			if (ImageLoader.config.debug) console.log("load remote");

			if (Network.check()) {
				var filepath = "/"+type+"/"+name+"?"+$.now();
				$.get(ImageLoader.config.remoteSite+ImageLoader.config.remotePath+filepath).done(function (data) {
					data = JSON.parse(Updater._parse(data));
					if (data && !data.error) {
						if (callback) callback(data.content);
					} else {
						if (callback) callback(null);
					}
				}).fail(function () {
					if (callback) callback(null);
				});
			}
		},

		display: function(img, mime, data) {
			$(img).attr('src', ImageLoader._formatBase64Src(mime, data));
			$(img).removeClass(ImageLoader.config.imgClass);
		},

		displayFail: function(img) {
			$(img).attr('src', $(img).attr('data-fail')+"?"+$.now());
		},

		_getPath: function(type, name, mime) {
			var path = "/";
			if (type == "comp" || type == "team") {
				path += "logos/" + type + "_" + name;
			} else {
				path += type + "/" + name;
			}
			if (mime) path += "." + mime;
			return path;
		},

		_formatBase64Src: function(mime, data) {
			return "data:image/"+mime+";base64,"+data;
		},

		getDefaultSrc: function(type, name, mime, failSrc) {
			var data = ImageLoader._loadMemoryCache(type, name);
			if (data) {
				return ImageLoader._formatBase64Src(mime, data);
			} else {
				return failSrc;
			}
		},

	};

	return ImageLoader;

});


define(function (require) {

	"use strict";

	var nations = {
		"ALL": "Worldwide",
		"AFG": "Afghanistan",
		"ALB": "Albania",
		"ALG": "Algeria",
		"ASA": "American Samoa",
		"AND": "Andorra",
		"ANG": "Angola",
		"AIA": "Anguilla",
		"ATG": "Antigua and Barbuda",
		"ARG": "Argentina",
		"ARM": "Armenia",
		"ARU": "Aruba",
		"AUS": "Australia",
		"AUT": "Austria",
		"AZE": "Azerbaijan",
		"BAH": "Bahamas",
		"BHR": "Bahrain",
		"BAN": "Bangladesh",
		"BRB": "Barbados",
		"BLR": "Belarus",
		"BEL": "Belgium",
		"BLZ": "Belize",
		"BEN": "Benin",
		"BER": "Bermuda",
		"BHU": "Bhutan",
		"BOL": "Bolivia",
		"BIH": "Bosnia-Herzegovina",
		"BOT": "Botswana",
		"BRA": "Brazil",
		"VGB": "British Virgin Islands",
		"BRU": "Brunei Darussalam",
		"BUL": "Bulgaria",
		"BFA": "Burkina Faso",
		"BDI": "Burundi",
		"CAM": "Cambodia",
		"CMR": "Cameroon",
		"CAN": "Canada",
		"CPV": "Cape Verde Islands",
		"CAY": "Cayman Islands",
		"CTA": "Central African Republic",
		"CHA": "Chad",
		"CHI": "Chile",
		"CHN": "China PR",
		"TPE": "Chinese Taipei",
		"COL": "Colombia",
		"COM": "Comoros",
		"CGO": "Congo",
		"COD": "Congo DR",
		"COK": "Cook Islands",
		"CRC": "Costa Rica",
		"CIV": "Ivory Coast",
		"CRO": "Croatia",
		"CUB": "Cuba",
		"CUW": "Curaçao",
		"CYP": "Cyprus",
		"CZE": "Czech Republic",
		"DEN": "Denmark",
		"DJI": "Djibouti",
		"DMA": "Dominica",
		"DOM": "Dominican Republic",
		"ECU": "Ecuador",
		"EGY": "Egypt",
		"SLV": "El Salvador",
		"ENG": "England",
		"EQG": "Equatorial Guinea",
		"ERI": "Eritrea",
		"EST": "Estonia",
		"ETH": "Ethiopia",
		"FRO": "Faroe Islands",
		"FIJ": "Fiji",
		"FIN": "Finland",
		"FRA": "France",
		"MKD": "FYR Macedonia",
		"GAB": "Gabon",
		"GAM": "Gambia",
		"GEO": "Georgia",
		"GER": "Germany",
		"GHA": "Ghana",
		"GRE": "Greece",
		"GRN": "Grenada",
		"GUM": "Guam",
		"GUA": "Guatemala",
		"GUI": "Guinea",
		"GNB": "Guinea-Bissau",
		"GUY": "Guyana",
		"HAI": "Haiti",
		"HON": "Honduras",
		"HKG": "Hong Kong",
		"HUN": "Hungary",
		"ISL": "Iceland",
		"IND": "India",
		"IDN": "Indonesia",
		"IRN": "Iran",
		"IRQ": "Iraq",
		"ISR": "Israel",
		"ITA": "Italy",
		"JAM": "Jamaica",
		"JPN": "Japan",
		"JOR": "Jordan",
		"KAZ": "Kazakhstan",
		"KEN": "Kenya",
		"PRK": "Korea DPR",
		"KOR": "Korea Republic",
		"KOS": "Kosovo",
		"KUW": "Kuwait",
		"KGZ": "Kyrgyzstan",
		"LAO": "Laos",
		"LVA": "Latvia",
		"LIB": "Lebanon",
		"LES": "Lesotho",
		"LBR": "Liberia",
		"LBY": "Libya",
		"LIE": "Liechtenstein",
		"LTU": "Lithuania",
		"LUX": "Luxembourg",
		"MAC": "Macau",
		"MAD": "Madagascar",
		"MWI": "Malawi",
		"MAS": "Malaysia",
		"MDV": "Maldives",
		"MLI": "Mali",
		"MLT": "Malta",
		"MTQ": "Martinique",
		"MTN": "Mauritania",
		"MRI": "Mauritius",
		"MEX": "Mexico",
		"MDA": "Moldova",
		"MNG": "Mongolia",
		"MNE": "Montenegro",
		"MSR": "Montserrat",
		"MAR": "Morocco",
		"MOZ": "Mozambique",
		"MYA": "Myanmar",
		"NAM": "Namibia",
		"NEP": "Nepal",
		"NED": "Netherlands",
		"NCL": "New Caledonia",
		"NZL": "New Zealand",
		"NCA": "Nicaragua",
		"NIG": "Niger",
		"NGA": "Nigeria",
		"NIR": "Northern Ireland",
		"NOR": "Norway",
		"OMA": "Oman",
		"PAK": "Pakistan",
		"PLE": "Palestine",
		"PAN": "Panama",
		"PNG": "Papua New Guinea",
		"PAR": "Paraguay",
		"PER": "Peru",
		"PHI": "Philippines",
		"POL": "Poland",
		"POR": "Portugal",
		"PUR": "Puerto Rico",
		"QAT": "Qatar",
		"IRL": "Republic of Ireland",
		"ROU": "Romania",
		"RUS": "Russia",
		"RWA": "Rwanda",
		"SAM": "Samoa",
		"SMR": "San Marino",
		"STP": "São Tomé e Príncipe",
		"KSA": "Saudi Arabia",
		"SCO": "Scotland",
		"SEN": "Senegal",
		"SRB": "Serbia",
		"SEY": "Seychelles",
		"SLE": "Sierra Leone",
		"SIN": "Singapore",
		"SVK": "Slovakia",
		"SVN": "Slovenia",
		"SOL": "Solomon Islands",
		"SOM": "Somalia",
		"RSA": "South Africa",
		"SSD": "South Sudan",
		"ESP": "Spain",
		"SRI": "Sri Lanka",
		"SKN": "St. Kitts and Nevis",
		"LCA": "St. Lucia",
		"VIN": "St. Vincent and the Grenadines",
		"SDN": "Sudan",
		"SUR": "Suriname",
		"SWZ": "Swaziland",
		"SWE": "Sweden",
		"SUI": "Switzerland",
		"SYR": "Syria",
		"TAH": "Tahiti",
		"TJK": "Tajikistan",
		"TAN": "Tanzania",
		"THA": "Thailand",
		"TLS": "Timor-Leste",
		"TOG": "Togo",
		"TGA": "Tonga",
		"TRI": "Trinidad and Tobago",
		"TUN": "Tunisia",
		"TUR": "Turkey",
		"TKM": "Turkmenistan",
		"TCA": "Turks and Caicos Islands",
		"UGA": "Uganda",
		"UKR": "Ukraine",
		"UAE": "United Arab Emirates",
		"URU": "Uruguay",
		"VIR": "US Virgin Islands",
		"USA": "USA",
		"UZB": "Uzbekistan",
		"VAN": "Vanuatu",
		"VEN": "Venezuela",
		"VIE": "Vietnam",
		"WAL": "Wales",
		"YEM": "Yemen",
		"ZAM": "Zambia",
		"ZIM": "Zimbabwe"
	};

	return nations;

});


define(function (require) {

	"use strict";

	var $					= require('jquery'),
		_					= require('underscore'),
		Backbone 			= require('backbone'),

		Crud = require("app/db-utils").Crud,
		CrudWrapper = require('app/db-utils').CrudWrapper,
		Network = require("app/utils/network"),
		DateUtils = require("app/utils/dateutils");

	App.Models.Manages = Backbone.Model.extend({

		pk: ["team_id", "person_id", "season"],
		sync: CrudWrapper(new Crud(App.DAO.ManagesDAO)),
		dao: App.DAO.ManagesDAO,

		initialize: function() {
			this.team = {};
			this.person = {};
		},

	});

	App.Collections.ManagesList = Backbone.Collection.extend({

		model: App.Models.Manages,
		sync: CrudWrapper(new Crud(App.DAO.ManagesDAO)),
		dao: App.DAO.ManagesDAO,

		filters: {},

		initialize: function(models, options) {
			this.filters = {};
			if (options.team_id) this.filters.team_id = options.team_id;
			if (options.season) this.filters.season = options.season;
		},

		url: function() {
			var url = App.Server.url + App.Server.base;
			return url + "/manages/team/" + this.filters.team_id + "/" + this.filters.season;
		},

		parse: function(response, options) {
			if (typeof(response) == "string") {
				var collection = JSON.parse(Network.parse(response));
				App.Models.Model.savetolocal(App.Models.Manages, collection);

				if (options.filters) collection = _.where(collection, options.filters);
				collection = _.where(collection, {
					is_current: 1,
					deleted_at: null,
				});
				return collection;
			} else {
				if (this.refresh) this.refresh(response);
				var collection = _.where(response, {
					is_current: true,
					deleted_at: null,
				});
				return collection;
			}
		},

		refresh: function(collection) {
			var max_item = _.max(collection, function(item) {
				return DateUtils.parse(item.updated_at).getTime();
			});
			this.url = this.url() + "/" + DateUtils.parse(max_item.updated_at).toUTCFormat("YYYYMMDDHH24MISS");
			this.fetchServer = true;
			this.fetch();
		},

		comparator: function(item) {
			var role = item.get("role").toLowerCase(),
				rank = 100;
			if (role.indexOf("director") >= 0) {
				rank -= 90;
			}
			if (role.indexOf("manager") >= 0) {
				rank -= 80;
			}
			if (role.indexOf("head coach") >= 0) {
				rank -= 70;
			}
			if (role.indexOf("assistant") >= 0) {
				rank += 5;
			}
			return rank;
		},

	});

});


define(function (require) {

	"use strict";

	var $					= require('jquery'),
		_					= require('underscore'),
		Backbone 			= require('backbone'),

		Crud = require("app/db-utils").Crud,
		CrudWrapper = require('app/db-utils').CrudWrapper,
		Network = require("app/utils/network"),
		DateUtils = require("app/utils/dateutils");

	App.Models.Person = Backbone.Model.extend({

		pk: "person_id",
		sync: CrudWrapper(new Crud(App.DAO.PersonDAO)),
		dao: App.DAO.PersonDAO,

		isNew: function() {
			return this.get("is_new") === true || this.get(this.idAttribute) == undefined;
		},

		initialize: function() {
			this.playedTeams = [];
			this.managedTeams = [];
			_.bindAll(this, "isNew", "url");
		},

		url: function() {
			var url = App.Server.url + App.Server.base;
			return url + "/person/" + this.get("person_id");
		},

		parse: function(response, options) {
			if (typeof(response) == "string") {
				var data = JSON.parse(Network.parse(response));
				var list = data;
				if (!Array.isArray(data)) {
					list = [];
					list.push(data);
				}
				App.Models.Model.savetolocal(App.Models.Person, list);
				return data;
			} else {
				if (this.refresh) this.refresh(response);
				return response;
			}
		},

		refresh: function(data) {
			var url = App.Server.url + App.Server.base;
			this.url = url + "/person/" + data.person_id + "/" + DateUtils.parse(data.updated_at).toUTCFormat("YYYYMMDDHH24MISS");
			this.fetchServer = true;
			this.fetch();
		},

	});

	App.Collections.PersonList = Backbone.Collection.extend({

		model: App.Models.Person,
		sync: CrudWrapper(new Crud(App.DAO.PersonDAO)),
		dao: App.DAO.PersonDAO,
		comparator: "position",

	});

});


define(function (require) {

	"use strict";

	var $					= require('jquery'),
		_					= require('underscore'),
		Backbone 			= require('backbone'),

		Crud = require("app/db-utils").Crud,
		CrudWrapper = require('app/db-utils').CrudWrapper,
		Network = require("app/utils/network"),
		DateUtils = require("app/utils/dateutils");

	App.Models.Competes = Backbone.Model.extend({

		pk: ["comp_id", "team_id", "season"],
		sync: CrudWrapper(new Crud(App.DAO.CompetesDAO)),
		dao: App.DAO.CompetesDAO,

		initialize: function() {
			this.competition = {};
			this.team = {};
		},

	});

	App.Collections.CompetesList = Backbone.Collection.extend({

		model: App.Models.Competes,
		sync: CrudWrapper(new Crud(App.DAO.CompetesDAO)),
		dao: App.DAO.CompetesDAO,

		filters: {},

		initialize: function(models, options) {
			this.filters = {};
			if (options.comp_id) this.filters.comp_id = options.comp_id;
			if (options.team_id) this.filters.team_id = options.team_id;
			if (options.season) this.filters.season = options.season;
		},

		url: function() {
			var url = App.Server.url + App.Server.base;
			if (this.filters.team_id) {
				return url + "/competes/team/" + this.filters.team_id;
			} else {
				return url + "/competes/competition/" + this.filters.comp_id + "/" + this.filters.season;
			}
		},

		parse: function(response, options) {
			if (typeof(response) == "string") {
				var collection = JSON.parse(Network.parse(response));
				App.Models.Model.savetolocal(App.Models.Competes, collection);

				if (options.filters) return _.where(collection, options.filters);
				else return collection;
			} else {
				if (this.refresh) this.refresh(response);
				return response;
			}
		},

		refresh: function(collection) {
			var max_item = _.max(collection, function(item) {
				return DateUtils.parse(item.updated_at).getTime();
			});
			this.url = this.url() + "/" + DateUtils.parse(max_item.updated_at).toUTCFormat("YYYYMMDDHH24MISS");
			this.fetchServer = true;
			this.fetch();
		},

		comparator: function(item) {
			return item.get('season');
		},

	});

});


define(function (require) {

	"use strict";

	var $ = require('jquery'),
		async = require('async');

	var models = [
		"app/models/competition",
		"app/models/team",
		"app/models/competes",
		"app/models/person",
		"app/models/plays",
		"app/models/manages",
		"app/models/updater",
	];

	var Models = {

		config: {
			queue: "LocalQ",
			concurrentAjax: 1,
		},

		currentAjax: 0,

		init: function() {

			var deferred = $.Deferred();
			require(models, function() {
				if (App.Config.debug) console.log("init models success");
				deferred.resolve();
			});
			return deferred.promise();

		},

		savetolocal: function(ModelClass, collection) {

			_.each(collection, function(item) {
				$(document).queue(Models.config.queue, function() {
					Models.currentAjax++;

					async.waterfall([
						// 1. delete
						function(callback) {
							var object = new ModelClass();
							var filters = {};
							if (Array.isArray(object.pk)) {
								_.each(object.pk, function(pk) {
									filters[pk] = item[pk];
								});
							} else {
								filters[object.pk] = item[object.pk];
							}
							object.dao.remove(object, {
								filters: filters,
								success: function() {
									callback(null);
								},
							});
						},
						// 2. create
						function(callback) {
							var object = new ModelClass(item);
							object.dao.create(object, {
								success: function() {
									callback(null);
								},
							});
						},
					],
					// callback
					function(error) {
						Models.currentAjax--;
						Models.saveNext();
					});
				}).delay(50, Models.config.queue);
			});

		},

		saveNext: function() {
			if (Models.currentAjax < Models.config.concurrentAjax)
				$(document).dequeue(Models.config.queue);
		},

		getQueueSize: function() {
			return $(document).queue(Models.config.queue).length;
		},

	};

	App.Models.Model = Models;

	return Models;

});


define(function (require) {

	"use strict";

	var $					= require('jquery'),
		_					= require('underscore'),
		Backbone 			= require('backbone'),

		Crud = require("app/db-utils").Crud,
		CrudWrapper = require('app/db-utils').CrudWrapper,
		Network = require("app/utils/network"),
		NumberUtils = require('app/utils/numberutils'),
		DateUtils = require("app/utils/dateutils");

	App.Models.Plays = Backbone.Model.extend({

		pk: ["team_id", "person_id", "season"],
		sync: CrudWrapper(new Crud(App.DAO.PlaysDAO)),
		dao: App.DAO.PlaysDAO,

		initialize: function() {
			this.team = {};
			this.person = {};
		},
	});

	App.Collections.PlaysList = Backbone.Collection.extend({

		model: App.Models.Plays,
		sync: CrudWrapper(new Crud(App.DAO.PlaysDAO)),
		dao: App.DAO.PlaysDAO,

		filters: {},

		initialize: function(models, options) {
			this.filters = {};
			if (options.team_id) this.filters.team_id = options.team_id;
			if (options.season) this.filters.season = options.season;
		},

		url: function() {
			var url = App.Server.url + App.Server.base;
			return url + "/plays/team/" + this.filters.team_id + "/" + this.filters.season;
		},

		parse: function(response, options) {
			if (typeof(response) == "string") {
				var collection = JSON.parse(Network.parse(response));
				App.Models.Model.savetolocal(App.Models.Plays, collection);

				if (options.filters) collection = _.where(collection, options.filters);
				collection = _.where(collection, {
					is_current: 1,
					deleted_at: null,
				});
				return collection;
			} else {
				if (this.refresh) this.refresh(response);
				var collection = _.where(response, {
					is_current: true,
					deleted_at: null,
				});
				return collection;
			}
		},

		refresh: function(collection) {
			var max_item = _.max(collection, function(item) {
				return DateUtils.parse(item.updated_at).getTime();
			});
			this.url = this.url() + "/" + DateUtils.parse(max_item.updated_at).toUTCFormat("YYYYMMDDHH24MISS");
			this.fetchServer = true;
			this.fetch();
		},

		comparator: function(item) {
			var number = item.get("number");
			if (item.person && item.person instanceof Backbone.Model) {

				var pos = item.person ? item.person.get("position") : null;
				var rank = "100";
				if ((pos&8) != 0) {//FW
					rank = "004";
				}
				if ((pos&4) != 0) {//MF
					rank = "003";
				}
				if ((pos&2) != 0) {//DF
					rank = "002";
				}
				if ((pos&1) != 0) {//GK
					rank = "001";
				}
				return rank + NumberUtils.padZero(number, 3);

			} else {

				return NumberUtils.padZero(number, 3);

			}
		},

	});

});


define(function (require) {

	"use strict";

	var $					= require('jquery'),
		_					= require('underscore'),
		Backbone 			= require('backbone'),

		DAO = require('app/adapters/favorite'),

		Favorite = $.models.Favorite = Backbone.Model.extend({

			idAttribute: "team_id",

			initialize: function () {
				this.dao = new DAO(Favorite.table, Favorite.fields);
				this.team = {};
				_.bindAll(this, "isNew", "load", "getTeam");
			},

			isNew: function () {
				return this.get("is_new") === true;
			},

			load: function (callback) {
				var deferred = $.Deferred();
				this.fetch().done(function () {
					if (callback) callback();
					deferred.resolve();
				});
				return deferred.promise();
			},

			getTeam: function (callback) {
				var deferred = $.Deferred();
				this.team = new $.models.Team({team_id: this.get("team_id")});
				this.team.fetch().done(function () {
					if (callback) callback();
					deferred.resolve();
				});
				return deferred.promise();
			},

		},
		{
			table: "Favorite",

			fields: [
				{name:"team_id",type:"number",pk:true},
				{name:"is_new",type:"boolean"},
			]
		}),

		FavoriteList = $.models.FavoriteList = Backbone.Collection.extend({

			model: Favorite,
			
			initialize: function () {
				this.dao = new DAO(Favorite.table, Favorite.fields);
			}

		});

	return {
		Favorite: Favorite,
		FavoriteList: FavoriteList
	}

});

define(function (require) {

	"use strict";

	var $					= require('jquery'),
		_					= require('underscore'),
		Backbone 			= require('backbone'),

		Crud = require("app/db-utils").Crud,
		CrudWrapper = require('app/db-utils').CrudWrapper;

	App.Models.Updater = Backbone.Model.extend({

		// idAttribute: "version",
		sync: CrudWrapper(new Crud(App.DAO.UpdaterDAO)),
		dao: App.DAO.UpdaterDAO,

		isNew: function() {
			return this.get("is_new") === true || this.get(this.idAttribute) == undefined;
		},

		initialize: function() {
			_.bindAll(this, "isNew");
		},

	});

	App.Collections.UpdaterList = Backbone.Collection.extend({

		model: App.Models.Updater,
		sync: CrudWrapper(new Crud(App.DAO.UpdaterDAO)),
		dao: App.DAO.UpdaterDAO,
		
	});

});

define(function (require) {

	"use strict";

	var $					= require('jquery'),
		_					= require('underscore'),
		Backbone 			= require('backbone'),

		Crud = require("app/db-utils").Crud,
		CrudWrapper = require('app/db-utils').CrudWrapper,
		Network = require("app/utils/network"),
		DateUtils = require("app/utils/dateutils");

	App.Models.Competition = Backbone.Model.extend({

		pk: "comp_id",
		sync: CrudWrapper(new Crud(App.DAO.CompetitionDAO)),
		dao: App.DAO.CompetitionDAO,

		initialize: function() {
			this.competedTeams = [];
		},

	});

	App.Collections.CompetitionList = Backbone.Collection.extend({

		model: App.Models.Competition,
		sync: CrudWrapper(new Crud(App.DAO.CompetitionDAO)),
		dao: App.DAO.CompetitionDAO,
		comparator: "comp_id",

		url: function() {
			var url = App.Server.url + App.Server.base;
			return url + "/competitions";
		},

		parse: function(response, options) {
			if (typeof(response) == "string") {
				var collection = JSON.parse(Network.parse(response));
				App.Models.Model.savetolocal(App.Models.Competition, collection);

				if (options.filters) return _.where(collection, options.filters);
				else return collection;
			} else {
				if (this.refresh) this.refresh(response);
				return response;
			}
		},

		refresh: function(collection) {
			var max_item = _.max(collection, function(item) {
				return DateUtils.parse(item.updated_at).getTime();
			});
			this.url = this.url() + "/" + DateUtils.parse(max_item.updated_at).toUTCFormat("YYYYMMDDHH24MISS");
			this.fetchServer = true;
			this.fetch();
		},

	});

});


define(function (require) {

	"use strict";

	var $					= require('jquery'),
		_					= require('underscore'),
		Backbone 			= require('backbone'),

		Crud = require("app/db-utils").Crud,
		CrudWrapper = require('app/db-utils').CrudWrapper,
		Network = require("app/utils/network"),
		DateUtils = require("app/utils/dateutils");

	App.Models.Team = Backbone.Model.extend({

		pk: "team_id",
		sync: CrudWrapper(new Crud(App.DAO.TeamDAO)),
		dao: App.DAO.TeamDAO,

		isNew: function() {
			return this.get("is_new") === true || this.get(this.idAttribute) == undefined;
		},

		initialize: function() {
			this.leagues = [];
			this.players = [];
			this.staffs = [];
			_.bindAll(this, "isNew", "url");
		},

		url: function() {
			var url = App.Server.url + App.Server.base;
			return url + "/team/" + this.get("team_id");
		},

		parse: function(response, options) {
			if (typeof(response) == "string") {
				var data = JSON.parse(Network.parse(response));
				var list = data;
				if (!Array.isArray(data)) {
					list = [];
					list.push(data);
				}
				App.Models.Model.savetolocal(App.Models.Team, list);
				return data;
			} else {
				if (this.refresh) this.refresh(response);
				return response;
			}
		},

		refresh: function(data) {
			var url = App.Server.url + App.Server.base;
			this.url = url + "/team/" + data.team_id + "/" + DateUtils.parse(data.updated_at).toUTCFormat("YYYYMMDDHH24MISS");
			this.fetchServer = true;
			this.fetch();
		},

	});

	App.Collections.TeamList = Backbone.Collection.extend({

		model: App.Models.Team,
		sync: CrudWrapper(new Crud(App.DAO.TeamDAO)),
		dao: App.DAO.TeamDAO,
		comparator: "short_name",

	});

});


define(function (require) {

	"use strict";

	var $				= require('jquery'),
		_				= require('underscore'),
		Backbone		= require('backbone'),

		TemplateLoader	= require('app/utils/templateloader'),
		ImageLoader		= require('app/utils/imageloader'),
		Scroller		= require('app/utils/scroller'),
		DataCache		= require('app/utils/datacache');

	App.Views.Competitions = Backbone.View.extend({

		initialize: function(options) {
			this.options = options || {};
			this.template = _.template(TemplateLoader.get("Competitions"));
			this.listenTo(this.options.collection, "reset", this.render);
		},

		render: function() {
			this.$el.html(this.template({
				collection: this.options.collection.toJSON(),
				ImageLoader: ImageLoader,
			}));
		},

		afterRender: function() {
			// init the scroller
			Scroller.init(this.el);
			// reset to previous scroll position
			var id = $(".main-content", "#appcontent").attr("id");
			var x = DataCache.get("scroller", id+"_x", true) || 0;
			var y = DataCache.get("scroller", id+"_y", true) || 0;
			Scroller.scrollTo(id, x, y);
			// load images
			ImageLoader.loadAll(this.$el);
		},

	});

});


define(function (require) {

	"use strict";

	var $ = require('jquery'),
		ImageLoader = require('app/utils/imageloader'),
		Scroller = require('app/utils/scroller');

	var views = [
		"app/views/Menu",
		"app/views/About",
		"app/views/Privacy",
		"app/views/Terms",
		"app/views/ContactUs",
		"app/views/Competitions",
		"app/views/CompetedTeams",
		"app/views/Team",
		"app/views/Person",
	];

	var Views = {

		init: function() {

			Backbone.View.prototype.close = function () {
				if (this.beforeClose) {
					this.beforeClose();
				}

				Scroller.destroy();
				ImageLoader.cancel();

				this.remove();
				this.unbind();

				if (App.Config.debug) console.log('View undelegateEvents');
				this.undelegateEvents();
			};

			var deferred = $.Deferred();
			require(views, function() {
				if (App.Config.debug) console.log("init views success");
				deferred.resolve();
			});
			return deferred.promise();

		},

	};

	return Views;

});


define(function (require) {

	"use strict";

	var $				= require('jquery'),
		_				= require('underscore'),
		Backbone		= require('backbone'),

		TemplateLoader	= require('app/utils/templateloader'),
		ImageLoader		= require('app/utils/imageloader'),
		DateUtils		= require('app/utils/dateutils'),
		NumberUtils		= require('app/utils/numberutils'),
		Scroller		= require('app/utils/scroller'),
		DataCache		= require('app/utils/datacache');

	App.Views.Person = Backbone.View.extend({

		initialize: function(options) {
			this.options = options || {};
			this.template = _.template(TemplateLoader.get("PersonInfo"));
			this.listenTo(this.options.person, "change", this.render);
		},

		render: function() {
			this.$el.html(this.template({
				person: this.options.person.toJSON(),
				ImageLoader: ImageLoader,
				DateUtils: DateUtils,
				NumberUtils: NumberUtils,
			}));
		},

		afterRender: function() {
			// init the scroller
			Scroller.init(this.el);
			// reset to previous scroll position
			var id = $(".main-content", "#appcontent").attr("id");
			var x = DataCache.get("scroller", id+"_x", true) || 0;
			var y = DataCache.get("scroller", id+"_y", true) || 0;
			Scroller.scrollTo(id, x, y);
			// load images
			ImageLoader.loadAll(this.$el);
		},

	});

});


define(function (require) {

	"use strict";

	var $				= require('jquery'),
		_				= require('underscore'),
		Backbone		= require('backbone'),

		TemplateLoader	= require('app/utils/templateloader'),
		Scroller		= require('app/utils/scroller'),
		ImageLoader		= require('app/utils/imageloader'),
		DataCache		= require('app/utils/datacache');

	App.Views.About = Backbone.View.extend({

		initialize: function(options) {
			this.options = options || {};
			this.template = _.template(TemplateLoader.get("About"));
		},

		render: function() {
			this.$el.html(this.template());
		},

		afterRender: function() {
			// init the scroller
			Scroller.init(this.el);
			// reset to previous scroll position
			var id = $(".main-content", "#appcontent").attr("id");
			var x = DataCache.get("scroller", id+"_x", true) || 0;
			var y = DataCache.get("scroller", id+"_y", true) || 0;
			Scroller.scrollTo(id, x, y);
			// load images
			ImageLoader.loadAll(this.$el);
		},

	});

});


define(function (require) {

	"use strict";

	var $				= require('jquery'),
		_				= require('underscore'),
		Backbone		= require('backbone'),

		TemplateLoader	= require('app/utils/templateloader'),
		ImageLoader		= require('app/utils/imageloader'),
		Scroller		= require('app/utils/scroller'),
		SeasonUtils		= require('app/utils/seasonutils'),
		DataCache		= require('app/utils/datacache');

	App.Views.CompetedTeams = Backbone.View.extend({

		events: {
			"change #season": "changeSeason",
		},

		initialize: function(options) {
			this.options = options || {};
			this.template = _.template(TemplateLoader.get("CompetedTeams"));
			this.listenTo(this.options.collection, "reset", this.render);
		},

		render: function() {
			this.$el.html(this.template({
				competition: this.options.competition,
				collection: this.options.collection,
				season: this.options.season,
				ImageLoader: ImageLoader,
				SeasonUtils: SeasonUtils,
			}));
		},

		afterRender: function() {
			this.$el.find("#season").val(this.options.season);
			DataCache.save("history", "comp_id", this.options.comp_id);
			DataCache.save("history", "season", this.options.season);
			// init the scroller
			Scroller.init(this.el);
			// reset to previous scroll position
			var id = $(".main-content", "#appcontent").attr("id");
			var x = DataCache.get("scroller", id+"_x", true) || 0;
			var y = DataCache.get("scroller", id+"_y", true) || 0;
			Scroller.scrollTo(id, x, y);
			// load images
			ImageLoader.loadAll(this.$el);
		},

		changeSeason: function() {
			DataCache.clear("scroller");
			DataCache.clear("scroller");

			var season = this.$el.find("#season").val();
			App.Router.navigate("#competition/" + this.options.comp_id + "/" + season, {trigger: true});
		},

	});

});


define(function (require) {

	"use strict";

	var $				= require('jquery'),
		_				= require('underscore'),
		Backbone		= require('backbone'),

		TemplateLoader	= require('app/utils/templateloader'),
		ImageLoader		= require('app/utils/imageloader'),
		Scroller		= require('app/utils/scroller'),
		DataCache		= require('app/utils/datacache');

	App.Views.ContactUs = Backbone.View.extend({

		events: {
			"click .submit-btn": "submit",
		},

		initialize: function(options) {
			this.options = options || {};
			this.template = _.template(TemplateLoader.get("ContactUs"));
		},

		render: function() {
			this.$el.html(this.template());
		},

		afterRender: function() {
			var _this = this;

			$(".spacer", this.$el).css({
				"height": window.innerHeight
			});

			$("input, textarea", this.$el).on("focus", function () {
				Scroller.scrollToElement("contactus_scroller", $(this).parents("li")[0]);
			}).on("blur", function() {
				Scroller.scrollTo("contactus_scroller", 0, 0);
			});

			// init the scroller
			Scroller.init(this.el);
			// reset to previous scroll position
			var id = $(".main-content", "#appcontent").attr("id");
			var x = DataCache.get("scroller", id+"_x", true) || 0;
			var y = DataCache.get("scroller", id+"_y", true) || 0;
			Scroller.scrollTo(id, x, y);
			// load images
			ImageLoader.loadAll(this.$el);
		},

		submit: function(e) {
			e.preventDefault();
			var _this = this,
				$form = this.$("#ss-form"),
				$sending = $(".sending", $form),
				haserror = false;

			$sending.addClass("hidden");
			$("label", $form).removeClass("error");
			$(".required", $form).each(function () {
				var $el = $(this);
				if ($el.val() === "") {
					haserror = true;
					$el.siblings("label").addClass("error");
				}
			});
			window.isGoogleFormSubmitted = (haserror === false);
			if (haserror === false) {
				$sending.removeClass("hidden");
				$.ajax({
					url: $form.attr("action"),
					data: $form.serialize(),
					type: "POST",
					crossDomain: true,
					dataType: "jsonp",
					error: function() {
					},
					complete: function() {
						_this.googleSubmit();
					},
				});
			}
		},

		googleSubmit: function() {
			if (window.isGoogleFormSubmitted === true) {
				if (navigator.userAgent.match(App.Config.mobileUserAgent)) {
					navigator.notification.alert(
						"Thanks for your response!",
						function () {
							window.location = "#menu";
						},
						"Alert",
						"OK");
				} else {
					alert("Thanks for your response!");
					window.location = "#menu";
				}
				window.isGoogleFormSubmitted = false;
			}
		},

	});

});


define(function (require) {

	"use strict";

	var $				= require('jquery'),
		_				= require('underscore'),
		Backbone		= require('backbone'),

		TemplateLoader	= require('app/utils/templateloader'),
		ImageLoader		= require('app/utils/imageloader'),
		Scroller		= require('app/utils/scroller'),
		DataCache		= require('app/utils/datacache');

	App.Views.Privacy = Backbone.View.extend({

		initialize: function(options) {
			this.options = options || {};
			this.template = _.template(TemplateLoader.get("Privacy"));
		},

		render: function() {
			this.$el.html(this.template());
		},

		afterRender: function() {
			// init the scroller
			Scroller.init(this.el);
			// reset to previous scroll position
			var id = $(".main-content", "#appcontent").attr("id");
			var x = DataCache.get("scroller", id+"_x", true) || 0;
			var y = DataCache.get("scroller", id+"_y", true) || 0;
			Scroller.scrollTo(id, x, y);
			// load images
			ImageLoader.loadAll(this.$el);
		},

	});

});


define(function (require) {

	"use strict";

	var $				= require('jquery'),
		_				= require('underscore'),
		Backbone		= require('backbone'),

		TemplateLoader	= require('app/utils/templateloader'),
		Scroller		= require('app/utils/scroller'),
		ImageLoader		= require('app/utils/imageloader'),
		DataCache		= require('app/utils/datacache');

	App.Views.Menu = Backbone.View.extend({

		events: {
			"click #share": "share",
			"click #exit": "exit",
		},

		initialize: function(options) {
			this.options = options || {};
			this.template = _.template(TemplateLoader.get("Menu"));
		},

		render: function() {
			this.$el.html(this.template());
		},

		afterRender: function() {
			// init the scroller
			Scroller.init(this.el);
			// reset to previous scroll position
			var id = $(".main-content", "#appcontent").attr("id");
			var x = DataCache.get("scroller", id+"_x", true) || 0;
			var y = DataCache.get("scroller", id+"_y", true) || 0;
			Scroller.scrollTo(id, x, y);
			// load images
			ImageLoader.loadAll(this.$el);
		},

		share: function(e) {
			e.preventDefault();
			if (navigator.userAgent.match(App.Config.mobileUserAgent)) {
				window.plugins.socialsharing.share('I just found Football Squad. It is a great football app showing different team squad information. Download it here: http://goo.gl/aTMIfW');
			} else {
				alert("Shared!");
			}
		},

		exit: function(e) {
			e.preventDefault();
			if (navigator.userAgent.match(App.Config.mobileUserAgent)) {
				navigator.notification.confirm(
					"Exit?",
					function (button) {
						if (button == 2) {
							navigator.app.exitApp();
						} else {
							window.location = "#menu";
						}
					},
					"Confirm",
					"No, Yes");
			} else if (navigator.userAgent.match(App.Config.tizenUserAgent)) {
				if (confirm("Exit?")) {
					tizen.application.getCurrentApplication().exit();
				} else {
					window.location = "#menu";
				}
			} else {
				alert("Exited!");
			}
		},

	});

});


define(function (require) {

	"use strict";

	var $				= require('jquery'),
		_				= require('underscore'),
		Backbone		= require('backbone'),

		TemplateLoader	= require('app/utils/templateloader'),
		ImageLoader		= require('app/utils/imageloader'),
		SeasonUtils		= require('app/utils/seasonutils'),
		Scroller		= require('app/utils/scroller'),
		DataCache		= require('app/utils/datacache');

	App.Views.Team = Backbone.View.extend({

		events: {
			"click #team_info": "teamInfo",
			"click #team_players": "teamPlayers",
			"click #team_staffs": "teamStaffs",
			"change #season": "changeSeason",
		},

		initialize: function(options) {
			this.options = options || {};
			var page = DataCache.get("team", "page", true) || "TeamPlayers";
			this.template = _.template(TemplateLoader.get(page));
			this.listenTo(this.options.team, "change", this.render);
		},

		render: function() {
			this.$el.html(this.template({
				competesList: this.options.competesList,
				team: this.options.team.toJSON(),
				players: this.options.players,
				staffs: this.options.staffs,
				season: this.options.season,
				ImageLoader: ImageLoader,
				SeasonUtils: SeasonUtils,
			}));
		},

		afterRender: function() {
			this.$el.find("#season").val(this.options.season);
			DataCache.save("history", "team_id", this.options.team_id);
			DataCache.save("history", "season", this.options.season);
			// init the scroller
			Scroller.init(this.el);
			// reset to previous scroll position
			var id = $(".main-content", "#appcontent").attr("id");
			var x = DataCache.get("scroller", id+"_x", true) || 0;
			var y = DataCache.get("scroller", id+"_y", true) || 0;
			Scroller.scrollTo(id, x, y);
			// load images
			ImageLoader.loadAll(this.$el);
		},

		teamInfo: function() {
			DataCache.save("team", "page", "TeamInfo");
			this.template = _.template(TemplateLoader.get("TeamInfo"));
			this.render();
			if (this.afterRender()) this.afterRender();
			Scroller.init(this.el);
		},

		teamPlayers: function() {
			DataCache.save("team", "page", "TeamPlayers");
			this.template = _.template(TemplateLoader.get("TeamPlayers"));
			this.render();
			if (this.afterRender()) this.afterRender();
			Scroller.init(this.el);
		},

		teamStaffs: function() {
			DataCache.save("team", "page", "TeamStaffs");
			this.template = _.template(TemplateLoader.get("TeamStaffs"));
			this.render();
			if (this.afterRender()) this.afterRender();
			Scroller.init(this.el);
		},

		changeSeason: function() {
			DataCache.clear("scroller");
			DataCache.clear("scroller");

			var season = this.$el.find("#season").val();
			App.Router.navigate("#team/" + this.options.team_id + "/" + season, {trigger: true});
		},

	});

});


define(function (require) {

	"use strict";

	var $				= require('jquery'),
		_				= require('underscore'),
		Backbone		= require('backbone'),

		TemplateLoader	= require('app/utils/templateloader'),
		ImageLoader		= require('app/utils/imageloader'),
		Scroller		= require('app/utils/scroller'),
		DataCache		= require('app/utils/datacache');

	App.Views.Terms = Backbone.View.extend({

		initialize: function(options) {
			this.options = options || {};
			this.template = _.template(TemplateLoader.get("Terms"));
		},

		render: function() {
			this.$el.html(this.template());
		},

		afterRender: function() {
			// init the scroller
			Scroller.init(this.el);
			// reset to previous scroll position
			var id = $(".main-content", "#appcontent").attr("id");
			var x = DataCache.get("scroller", id+"_x", true) || 0;
			var y = DataCache.get("scroller", id+"_y", true) || 0;
			Scroller.scrollTo(id, x, y);
			// load images
			ImageLoader.loadAll(this.$el);
		},

	});

});

