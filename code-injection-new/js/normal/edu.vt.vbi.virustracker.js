











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

});


describe('VirusTrackerApp', function() {

  describe('Controllers', function(){
    beforeEach(module('virusTracker.controllers'));

    describe('WelcomeController', function(){
      it('should create "games" model with 2 games', 
        inject(function($rootScope, $controller) {
          var scope = $rootScope.$new(),
              apiService = { 'games': function(id) { return [{'id': 1},{'id': 2}]; } },
              ctrl = $controller('WelcomeCtrl', {$scope: scope, apiService: apiService});
          
          expect(scope.games.length).toBe(2);
        })
      );
    });

    describe('GameController', function(){
      it('should create an game object for the requested game', 
        inject(function($rootScope, $controller) {
          var scope = $rootScope.$new(),
              routeParams = { 'gameId': 100 },
              apiService = { 'game': function(id) { return {'id': id}; } },
              ctrl = $controller('GameCtrl', {$scope: scope, $routeParams: routeParams, apiService: apiService});
          expect(scope.game.id).toBe(100);
        })
      );
    });
  });

});
    


(function() {
	/**
	 * Event handler for 'deviceready' event. This event is fired when
	 * PhoneGap has fully loaded. Since our angular app depends on
	 * services provided by PhoneGap, we will bootstrap angular only after
	 * PhoneGap has loaded.
	 */
	function onDeviceReady() {
		if (window.cordova.logger) {
			window.cordova.logger.__onDeviceReady();
		}


		if (parseFloat(window.device.version) >= 7.0 && !window.device.model.match(/ipad/gi)) {
			document.body.className = "ios7";
		}

		// Bootstrap angular
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['virusTracker']);
		});
	}

	// Initialize Global Objects.
	if (!window.plugins) {
		window.plugins = {};
	}
	if (!window.plugins.virustracker) {
		window.plugins.virustracker = {};
	}

	// Bind the onDeviceReady function to the deviceready event.
	document.addEventListener('deviceready', onDeviceReady, false);

	// Initialize FastClick, this removes the delay for touch clicks.
	window.addEventListener('load', function() {
		FastClick.attach(document.body);
	}, false);

	// Auto close select menus when option is selected.
	$(document).on('change', 'select', function(e) {
		$(this).blur();
		e.preventDefault();
	});
})();

var damm = function (number) {
  if (isNaN(Number(number)) || Number(number) <= 0) {
    return false;
  }

  var table = ["0317598642", "7092154863", "4206871359", "1750983426", "6123045978",
               "3674209581", "5869720134", "8945362017", "9438617205", "2581436790"];

  var interim = 0;
  for (var p = 0; p < number.length; p++) {
    var n = Number(number.charAt(p));
    if (isNaN(n)) {
      return false;
    }

    interim = table[n].charAt(interim);
  }

  return interim === 0;
};


(function() {
	'use strict';

	/**
	 * Virus Tracker Angular Module
	 *
	 * Serves as a wrapper for all of VirusTracker and defines the global
	 * configuration. This module may be bootstrapped by using the
	 * 'ng-app="virusTracker"' directive.
	 */
	angular.module('virusTracker', [
			'virusTracker.config.app',
			'virusTracker.services.user',
			'virusTracker.services.api',
			'virusTracker.services.loading',
			'virusTracker.services.messages',
			'virusTracker.services.device',
			'virusTracker.services.general',
			'virusTracker.services.offline',
			'virusTracker.services.httpInterceptor',
			'virusTracker.directives.activeRoute',
			'virusTracker.directives.pullDownAction',
			'virusTracker.directives.validators',
			'virusTracker.controllers.welcome',
			'virusTracker.controllers.about',
			'virusTracker.controllers.leaderboard',
			'virusTracker.controllers.auth',
			'virusTracker.controllers.participant',
			'virusTracker.controllers.games',
			'virusTracker.controllers.team',
			'virusTracker.controllers.messages',
			'virusTracker.controllers.scan',
			'virusTracker.controllers.menu',
			'virusTracker.controllers.header',
			'virusTracker.controllers.mutation',
			'virusTracker.controllers.offline',
			'btford.phonegap.geolocation',
			'btford.phonegap.notification',
			'ngSanitize',
			'ngRoute',
			'angular-carousel'
		])

		/**
		 * Application Configuration
		 *
		 * Configures application and routes.
		 */
		.config(function($routeProvider, $locationProvider, $compileProvider) {
			$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file):/);
			$routeProvider.when('', {
				templateUrl: 'views/welcome.html',
				controller: 'WelcomeCtrl',
				guestAccess: true
			});
			$routeProvider.when('/welcome', {
				templateUrl: 'views/welcome.html',
				controller: 'WelcomeCtrl',
				guestAccess: true
			});
			$routeProvider.when('/register', {
				templateUrl: 'views/register.html',
				controller: 'RegisterCtrl',
				guestAccess: true
			});
			$routeProvider.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl',
				guestAccess: true
			});
			$routeProvider.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'AboutCtrl',
				guestAccess: true,
				authAccess: true
			});
			$routeProvider.when('/leaderboard/:gameId', {
				templateUrl: 'views/leaderboard.html',
				controller: 'LeaderboardCtrl'
			});
			$routeProvider.when('/games/stats/:gameId', {
				templateUrl: 'views/gameStats.html',
				controller: 'GameStatsCtrl'
			});
			$routeProvider.when('/team/stats/:teamId', {
				templateUrl: 'views/teamStats.html',
				controller: 'TeamStatsCtrl'
			});
			$routeProvider.when('/participant/stats/:bandId', {
				templateUrl: 'views/participantStats.html',
				controller: 'ParticipantStatsCtrl'
			});
			$routeProvider.when('/participant/stats', {
				templateUrl: 'views/participantStats.html',
				controller: 'ParticipantStatsCtrl'
			});
			$routeProvider.when('/games/:gameId/scan', {
				templateUrl: 'views/scan.html',
				controller: 'ScanCtrl'
			});
			$routeProvider.when('/messages', {
				templateUrl: 'views/messages.html',
				controller: 'MessagesCtrl'
			});
			$routeProvider.when('/mutation', {
				templateUrl: 'views/mutation.html',
				controller: 'MutationCtrl'
			});
			$routeProvider.when('/offline', {
				templateUrl: 'views/offline.html',
				controller: 'OfflineHelpCtrl',
				errorPage: true
			});
			$routeProvider.otherwise({redirectTo: '/welcome'});
		})

		/**
		 * Application Initialization
		 *
		 * The following is run when the injector has loaded all modules.
		 */
		.run(function($rootScope, $location, $route, geolocation, notification, user, api, messages, device, offline) {
			// Verify that a user is authenticated before loading a new view.
			$rootScope.$on('$routeChangeStart', function(event, next, current) {
				$rootScope.isAuthenticated = user.isAuthenticated();
				if($rootScope.isAuthenticated) {
					$rootScope.gameId = user.gameId;
				}
				if (next.errorPage) {
					// do nothing;
				} else if (!$rootScope.isAuthenticated && !next.guestAccess) {
					$location.path("/welcome");
				} else if ($rootScope.isAuthenticated && next.guestAccess && !next.authAccess) {
					$location.path("/leaderboard/" + user.gameId);
				}
			});

			function updateParticipantState() {
				if (user.isAuthenticated()) {
					api.participantState().then(function(result) {
						user.state = result.data.state;
						user.mutation = result.data.mutation;
					});
				}
			}

			// Reload the current page when app is resumed from the background.
			document.addEventListener("resume", function() {
				$route.reload();
				updateParticipantState();
				$rootScope.$broadcast('virustracker.resume');
			}, false);

			// Update Participant's State
			$rootScope.$on('virustracker.login', function(event, isNewUser) {
				updateParticipantState();
			});
			updateParticipantState();

			// Menu
			$('#menu').css('display', 'none')
				.css('top', 0 - window.innerHeight)
				.css('height', window.innerHeight)
				.css('display', 'block');

			$('#header-wrapper').on('click', '#menu-button', function(e) {
				event.stopPropagation(); event.preventDefault();
				var menu = $('#menu');
				if (menu.position().top < 0) {
					menu.css('top', 0);
				} else {
					menu.css('top', 0 - window.innerHeight);
				}
			});

			$('#header-wrapper').on('click', '#menu a, header a', function(e) {
				$('#menu').css('top', 0 - window.innerHeight);
			});

			// Device Ready Events
			document.addEventListener('deviceready', function() {
				setTimeout(function() {
					navigator.splashscreen.hide();
				}, 500);

				document.addEventListener('online', function() {
					offline.onOnline();
				}, false);
				document.addEventListener('offline', function() {
					offline.onOffline();
				}, false);
			}, false);
		});

}());


(function() {
	'use strict';

	/**
	 * Wrapper for Virus Tracker constant values for injection into Virus Tracker components.
	 */
	angular.module('virusTracker.config.app', [
	]).constant('appConfig', (function () {
		return {
			'API_BASE_URL': 'https://virustracker.vbi.vt.edu',
			//'API_BASE_URL': 'http://virustracker-dev.vbi.vt.edu',
			//'API_BASE_URL': 'http://128.173.101.142:9000',
			//'API_BASE_URL': 'http://192.168.0.6:9000',

			'TRACKING_INTERVAL': 300000,
			'GCM_SENDER_ID': '574879118719',
			'PUSH_NOTIFICATIONS': true,
			'API_TIMEOUT_MS': 10000,
			'QR_BAND_REGEX': /^(?:http.*id=)?(\d+)$/i,
			'DATE_FORMAT': 'dddd, MMMM Do YYYY, h:mm a',

			// Setting to show/hide Social Eyes ID field on
			// registration form. Show == TRUE, Hide == False.
			'SOCIAL_EYES': false,

			// Setting to show/hide Teams
			'USE_TEAMS': false,

			// Default Options for Geolocation
			'GEO_HIGH_ACCURACY': true,
			'GEO_TIMEOUT': 1000,
			'GEO_MAX_AGE': 120000,

			// Constants
			'HTTP_REQUEST_QUEUED': 'REQUEST_QUEUED',
			'QUEUEABLE_REQUEST': 'queueable',
			'INTERACTION_API': 'api/scan',
			'LEADERBOARD_LIMIT': 10
		};
	})());
}());

(function() {
	'use strict';

	/**
	 * Form Validation Directives
	 *
	 */
	var module = angular.module('virusTracker.directives.validators', [
		'virusTracker.services.api'
	]).directive('bandIdRegistration', function (api) {
		return {
			require: 'ngModel',
			link: function (scope, elm, attrs, ctrl) {
				ctrl.$parsers.push(function (viewValue) {
					api.bandIdForRegistration(viewValue).then(
						function (result) {
							console.log(JSON.stringify(result.data));
							if (result.data && result.data.accept) {
								ctrl.$setValidity('bandIdRegistration', true);
							} else {
								ctrl.$setValidity('bandIdRegistration', false);
							}
						},
						function (error) {
							ctrl.$setValidity('bandIdRegistration', false);
							return undefined;
						}
					);

					return viewValue;
				});
			}
		};
	});

}());

(function() {
	'use strict';

	/**
	 * Pull Down Action Directive.
	 *
	 * This directive, 'pull-down-action', is used to execute a function
	 * on the pull down action is performed, i.e. pulling down to refresh content.
	 */
	angular.module('virusTracker.directives.pullDownAction', [
		// No Dependencies
	]).directive('pullDownAction', [
		'$compile',
		'$timeout',
		'$q',
		function($compile, $timeout, $q) {
			return {
				scope: true,
				restrict: 'A',
				transclude: true,
				templateUrl:  function(tElement, tAttrs) {
					return tAttrs.templateUrl || 'virustracker-pull-down-action.tpl.html';
				},
				compile: function compile(tElement, tAttrs, transclude) {

					return function postLink(scope, iElement, iAttrs) {
						var defaultConfig = {
							animationDuration: 400,
							refreshDuration: 500,
							text: {
								pull: 'pull to refresh',
								refresh: 'refreshing...',
								load: 'loading...'
							},
							icon: {
								pull: 'icon-arrow-down',
								refresh: 'icon-refresh icon-spin',
								load: 'icon-spinner icon-spin',
							}
						};

						var config = angular.extend(defaultConfig, iAttrs);
						var scrollElement = iElement.parent();
						var pullDownElement = window.ptr = iElement.children()[0];

						// Initialize isolated scope vars
						scope.text = config.text;
						scope.icon = config.icon;
						scope.status = 'pull';

						var setStatus = function(status) {
							scope.$apply(function() {
								scope.status = status;
							});
						};

						var preventAction = false,
							waitForNewTouch = false,
							lastY = 0;

						function pullDownAction() {
							if (preventAction) {
								preventAction = false;
								return;
							}

							preventAction = true;
							waitForNewTouch = true;
							pullDownElement.style.webkitTransitionDuration = 0;
							pullDownElement.style.margin = '0 auto';
							setStatus('refresh');

							var start = Date.now();
							$q.when(scope.$eval(iAttrs.pullDownAction))
							.then(function() {
								resetPullDown(start);
							});
						}

						function resetPullDown(startTime) {
							var elapsed = +new Date() - startTime;
							$timeout(function() {
								pullDownElement.style.transitionDuration = config.animationDuration + 'ms';
								pullDownElement.style.marginTop = (pullDownElement.offsetHeight * -1) + 'px';
								$timeout(function() {
									scope.status = 'pull';
								}, config.animationDuration);
								preventAction = false;
							}, elapsed < config.refreshDuration ? config.refreshDuration - elapsed : 0);
						}

						function swipeMove(ev) {
							if (preventAction || waitForNewTouch) {
								return;
							}

							var y = ev.originalEvent.touches[0].pageY;

							if (lastY !== 0 && lastY - y !== 0) {
								pullDownElement.style.transitionDuration = '';

								var top = pullDownElement.style.marginTop || pullDownElement.offsetHeight * -1;

								// Limit the position of the "pull-down-action" element.
								top = Math.min(parseInt(top) + y - lastY, 0);
								top = Math.max(top, pullDownElement.offsetHeight * -1);

								// Modify the position of the pull down element.
								pullDownElement.style.marginTop = Math.min(top, 0) + 'px';

								if (top === 0) {
									pullDownAction();
								}
							}

							lastY = y;
						}

						function swipeEnd(ev) {
							lastY = 0;
							waitForNewTouch = false;
							if(!preventAction) {
								pullDownElement.style.transitionDuration = config.animationDuration + 'ms';
								pullDownElement.style.marginTop = (pullDownElement.offsetHeight * -1) + 'px';
							}
						}

						iElement.bind('touchmove', swipeMove);
						iElement.bind('touchend', swipeEnd);

						scope.$on('$destroy', function() {
							iElement.unbind('touchmove', swipeMove);
							iElement.unbind('touchend', swipeEnd);
						});

						var loadStart = Date.now();
						scope.$watch('loading', function (newValue) {
							if (newValue === true && scope.status === 'pull') {
								loadStart = Date.now();
								preventAction = true;
								waitForNewTouch = true;
								scope.status = 'load';
								pullDownElement.style.transitionDuration = config.animationDuration + 'ms';
								pullDownElement.style.marginTop = '0px';
							} else if (newValue === false) {
								resetPullDown(loadStart);
								lastY = 0;
								waitForNewTouch = false;
							}
						}, true);

					};
				}
			};
		}
	]).run([
		'$templateCache',
		function ($templateCache) {
			var tmpl =
				'<div class="pull-down-action">\n' +
				'  <i ng-class="icon[status]"></i>&nbsp;\n' +
				'  <span ng-bind="text[status]"></span>\n' +
				'</div>\n' +
				'<div ng-transclude></div>\n';

			$templateCache.put('virustracker-pull-down-action.tpl.html', tmpl);
		}
	]);

}());

(function() {
	'use strict';

	/**
	 * Highlight Active Route Directive.
	 *
	 * This directive, 'highlight-active-route', is used in conjuction with
	 * 'match-route="regex"' to add the css class 'active' to the element
	 * with the match-route directive where the regex matches the current route.
	 */
	angular.module('virusTracker.directives.activeRoute', [
		// No Dependencies
	]).directive('highlightActiveRoute', function($location) {
		return {
			link: function($scope, element, attrs, controller) {
				$scope.$watch(
					function() {
						return $location.path();
					},
					function(newValue, oldValue) {
						element.find('li').each(function(k, li) {
							var $li = angular.element(li),
							regex = new RegExp($li.attr('match-route'));
							if(regex.test(newValue)) {
								$li.addClass('active');
							} else {
								$li.removeClass('active');
							}
						});
					}
				);
			}
		};
	});

}());

(function() {
	'use strict';

	angular.module('virusTracker.controllers.about', [
		'virusTracker.services.api'
	]).controller('AboutCtrl', function ($scope, api) {
		/**
		 * About Screen Controller
		 *
		 * About is presently just a static page
		 */
	});
}());


(function() {
	'use strict';

	/**
	 * Participant Controllers
	 *
	 */
	angular.module('virusTracker.controllers.participant', [
		'virusTracker.config.app',
		'virusTracker.services.api',
		'virusTracker.services.offline',
		'virusTracker.services.user',
		'ngRoute'
	]).controller('ParticipantStatsCtrl', function ($scope, $routeParams, api, $q, user, offlineState, appConfig) {
		$scope.loading = true;
		$scope.userName = user.screenName;
		$scope.bandId = user.dammBandId;
		$scope.teamName = user.teamName;
		$scope.useTeams = appConfig.USE_TEAMS;
		$scope.interactionsToProcess = offlineState.requestsToProcess(appConfig.INTERACTION_API);
		$scope.unknownStats = false;
		$scope.statsErrorMessage = false;

		if (!$scope.userName) {
			$scope.userName = $scope.bandId;
		}

		// Update State and Mutation
		api.participantState().then(function(result) {
			user.state = result.data.state;
			user.mutation = result.data.mutation;
		});

		var sPromise =  api.participantStats($routeParams.gameId).then(
			function(result) {
				if (result.data === Object(result.data)) {
					$scope.participantStats = result.data.participantStats;
					$scope.participantStats.updatedTime = Date.now();
				}
			}, function(reason) {
				if (reason.data === Object(reason.data)) {
					$scope.statsErrorMessage = reason.data.message;
				}
			}
		);

		var gPromise = api.game(parseInt(user.gameId)).then(
			function(result) {
				if (result.data === Object(result.data)) {
					$scope.game = result.data;
					$scope.game.updatedTime = Date.now();
				}
			}
		);

		$q.all([sPromise, gPromise]).finally(function() {
			// Save or Load Game data to/from cache.
			if ($scope.game === Object($scope.game)) {
				window.localStorage.setItem('virustracker.cache.game', JSON.stringify($scope.game));
			} else if (window.localStorage.getItem('virustracker.cache.game') !== null) {
				$scope.game = JSON.parse(window.localStorage.getItem('virustracker.cache.game'));
			}

			// If we have game data set the current cycle
			// and whether or not to show the cycle list.
			if ($scope.game === Object($scope.game)) {
				var cycles = [];
				for (var x in $scope.game.cycles) {
					if ($scope.game.cycles.hasOwnProperty(x)) {
						var cycle = $scope.game.cycles[x];
						if (cycle.current) {
							$scope.gameCycle = cycle;
						}

						if (cycle.end === null || user.registrationTime === null ||
							!moment(cycle.end).isBefore(user.registrationTime)) {
							cycles.push(cycle);
						}
					}
				}

				$scope.showCycleList = cycles.length > 2 || !(cycles.length == 2 && moment(cycles[0].start).isSame(cycles[1].start));
				$scope.participantsGameCycles = cycles;
			}

			displayResult();
		});

		$scope.cycleChanged = function(pullRefresh) {
			if (pullRefresh !== true) {
				$scope.loading = true;
				$scope.unknownStats = false;
				$scope.participantStats = null;
				$scope.updatedTimeAgo = false;
			}

			api.participantCycleStats($scope.gameCycle.cycleId).then(
				function(result) {
					if (result.data === Object(result.data)) {
						$scope.participantStats = result.data.participantStats;
						$scope.participantStats.updatedTime = Date.now();
					}
				}, function(reason) {
					if (reason.data === Object(reason.data)) {
						$scope.statsErrorMessage = reason.data.message;
					}
				}
			).finally(displayResult);
		};

		$scope.pullRefresh = function() {
			$scope.cycleChanged(true);
		};

		function cacheStats() {
			var cycleId = 'unknown';
			if ($scope.gameCycle) {
				cycleId = $scope.gameCycle.cycleId;
			}

			var statCache = 'virustracker.cache.participantStats.' + cycleId;
			if ($scope.participantStats === Object($scope.participantStats)) {
				window.localStorage.setItem(statCache, JSON.stringify($scope.participantStats));
			} else if (window.localStorage.getItem(statCache) !== null) {
				$scope.participantStats = JSON.parse(window.localStorage.getItem(statCache));
			} else {
				// Failed, Stats are unknown at this point.
				$scope.unknownStats = true;
				$scope.participantSats = null;
			}
		}

		function displayResult() {
			cacheStats();

			// Set the "time ago" string.
			if ($scope.participantStats === Object($scope.participantStats)) {
				$scope.updatedTimeAgo = moment($scope.participantStats.updatedTime).fromNow();
			}

			$scope.loading = false;
		}
	});

}());

(function() {
	'use strict';

	angular.module('virusTracker.controllers.header', [
		'virusTracker.services.api',
		'virusTracker.services.messages',
		'virusTracker.services.user'
	]).controller('HeaderCtrl', function ($scope, $location, api, messages, user) {
		/**
		 * Menu Controller
		 *
		 */

		$scope.showAuthHeader = false;
		$scope.showGuestHeader = false;

		// Watch Location to Determine Header to display.
		$scope.$watch(
			function () {
				return $location.path();
			},
			function (path) {
				if (path === null || path === '/' || path === '') {
					return;
				}
				$scope.showAuthHeader = user.isAuthenticated();

				$scope.showGuestHeader = !user.isAuthenticated() && path !== "/welcome";
			}
		);

		// Messages - Watch property on messages service and scope variable to
		// display notifications icon.
		$scope.$watch(
			function () {
				return messages.count();
			},
			function (count) {
				$scope.hasNotifications = count > 0;
			},
			true
		);

		// User State - Watch user state to set icon in header.
		$scope.logo = 'virtrak';
		$scope.$watch(
			function() {
				if (user.state) {
					return user.state.cd;
				}
				return null;
			},
			updateStateLogo,
			true
		);

		function updateUserState() {
			api.participantState().then(function(result) {
				user.state = result.data.state;
				user.mutation = result.data.mutation;

				updateStateLogo();
			});
		}

		function updateStateLogo(state) {
			messages.validateMessages();

			if (user.isInfected()) {
				$scope.logo = 'infected';
			} else if (user.isInoculated()) {
				$scope.logo = 'immunized';
			} else {
				$scope.logo = 'virtrak';
			}
		}

		$scope.$on('virustracker.messages.update', updateUserState);
		$scope.$on('virustracker.scan.close', updateUserState);

		// Set a scope param that can be used as search param for hrefs to force
		// angular to reload pages even if the location doesn't change.
		$scope.reload = new Date().getTime();
		$scope.$on('$routeChangeStart', function() {
			$scope.reload = new Date().getTime();
		});
	});

}());

(function() {
	'use strict';

	angular.module('virusTracker.controllers.scan', [
		'virusTracker.config.app',
		'virusTracker.services.api',
		'virusTracker.services.user',
		'btford.phonegap.geolocation',
		'ui.bootstrap',
		'ngRoute'
	]).controller('ScanCtrl', function ($scope, $rootScope, $q, $routeParams, $location, $modal, api, user, geolocation, appConfig) {
		$('#qrcode').qrcode({
			text: window.localStorage.getItem('virustracker.user.dammBandId'),
			render: "table"
		});

		$scope.scanCode = function() {
			$scope.fieldsDisabled = true;
			window.cordova.plugins.barcodeScanner.scan(
				function(result) {
					if (result.text) {
						$scope.loading = true;
						var p2BandId = 0;

						var match = appConfig.QR_BAND_REGEX.exec(result.text);
						if (match) {
							p2BandId = parseInt(match[1]);
						}

						makeRestCall(p2BandId);
					} else {
						$scope.$apply(function() {
							$scope.fieldsDisabled = false;
						});
					}
				},
				function(error) {
					$scope.$apply(function() {
						modal('Oops!', 'Unable to open the camera.');
						$scope.fieldsDisabled = false;
					});
				}
			);
		};

		function makeRestCall(scannedBandId) {
			var title = 'Interaction Failed!';
			var message = 'There was a problem, the interaction was not recorded.';

			api.scan(scannedBandId).then(
				function(result) {
					if (typeof result.data === 'object' && result.data.interactionResults.successFlag === 't') {
						title = 'Successful Interaction!';
						api.participantState().then(function(result) {
							user.state = result.data.state;
							user.mutation = result.data.mutation;
						});
					}

					if (typeof result.data === 'object' && result.data.interactionResults.message) {
						message = result.data.interactionResults.message;
					}

					modal(title, message);
				},
				function(error) {
					// TODO: Modal
					if (error === appConfig.HTTP_REQUEST_QUEUED) {
						title = "Interaction Saved!";
						message = "Interaction was saved and will be recorded once a network connection is available.";
					}
				}
			).finally(function() {
				$scope.loading = false;
				$scope.fieldsDisabled = false;
				modal(title, message);
			});
		}

		function modal(title, message) {
			$scope.opts = {
				backdrop: 'static',
				templateUrl: 'views/registerDialog.html',
				controller: 'RegisterDialogCtrl',
				resolve: {
					model: function() {
						return {
							title: title,
							message: message
						};
					},
					closeFunction: function() {
						return function() {};
					}
				}
			};

			$modal.open($scope.opts);
		}

		$scope.$on('$destroy', function() {
			$rootScope.$broadcast('virustracker.scan.close');
		});
	});

}());

(function() {
	'use strict';

	angular.module('virusTracker.controllers.menu', [
		'virusTracker.services.api',
		'virusTracker.services.user',
		'virusTracker.config.app'
	]).controller('MenuCtrl', function ($scope, $location, api, user, appConfig) {
		/**
		 * Menu Controller
		 *
		 */

		document.getElementById('menu-page-wrap').addEventListener('touchmove',
			function(e) {
				e.preventDefault();
			}, false
		);

		$scope.useTeams = appConfig.USE_TEAMS;
		$scope.gameId = parseInt(window.localStorage.getItem('virustracker.user.gameId'));
		$scope.teamId = parseInt(window.localStorage.getItem('virustracker.user.teamId'));

		$scope.$on('virustracker.login', function() {
			console.log("Setting Menu Scope Game ID to " + user.gameId + ", " + user.teamId);
			$scope.gameId = user.gameId;
			$scope.teamId = user.teamId;
		});

		$scope.logout = function () {
			api.logout();
			$location.path('/welcome');
		};
	});

}());

(function() {
	'use strict';

	/**
	 * Game Controllers
	 *
	 */
	angular.module('virusTracker.controllers.leaderboard', [
		'virusTracker.config.app',
		'virusTracker.services.api',
		'virusTracker.services.user',
		'ngRoute'
	]).controller('LeaderboardCtrl', function ($scope, $routeParams, $q, api, user, appConfig) {
		/**
		 * Game Details Screen Controller
		 *
		 */
		$scope.loading = true;
		$scope.useTeams = appConfig.USE_TEAMS;
		$scope.maxRank = appConfig.LEADERBOARD_LIMIT;
		$scope.screenName = user.screenName;
		$scope.teamName = user.teamName;
		$scope.unknownStats = false;

		/**
		 * This is needed to force angular to iterate our leaderboard
		 * object in the order it's returned from the server.
		 */
		$scope.keys = function(obj){
			return obj? Object.keys(obj) : [];
		};

		var gPromise = api.game($routeParams.gameId).then(
			function(result) {
				if (result.data === Object(result.data)) {
					$scope.game = result.data;
					$scope.game.updatedTime = Date.now();
				}
			}
		);

		var sPromise = api.gameLeaderboards($routeParams.gameId).then(
			function(result) {
				if (result.data === Object(result.data)) {
					$scope.leaderboards = {
						'leaderboards': result.data,
						'updatedTime': Date.now()
					};
				}
			}
		);

		$q.all([sPromise, gPromise]).finally(function() {
			// Save or Load Game data to/from cache.
			if ($scope.game === Object($scope.game)) {
				window.localStorage.setItem('virustracker.cache.game', JSON.stringify($scope.game));
			} else if (window.localStorage.getItem('virustracker.cache.game') !== null) {
				$scope.game = JSON.parse(window.localStorage.getItem('virustracker.cache.game'));
			}

			// If we have game data set the current cycle
			// and whether or not to show the cycle list.
			if ($scope.game === Object($scope.game)) {
				$scope.showCycleList = $scope.game.cycles.length > 2;

				for (var x in $scope.game.cycles) {
					if ($scope.game.cycles[x].current) {
						$scope.gameCycle = $scope.game.cycles[x];
						break;
					}
				}
			}

			displayResult();
		});

		$scope.cycleChanged = function(pullRefresh) {
			if (pullRefresh !== true) {
				$scope.loading = true;
				$scope.unknownStats = false;
				$scope.leaderboards = null;
				$scope.updatedTimeAgo = false;
			}

			api.gameCycleLeaderboards($scope.gameCycle.cycleId).then(
				function(result) {
					if (result.data === Object(result.data)) {
						$scope.leaderboards = {
							'leaderboards': result.data,
							'updatedTime': Date.now()
						};
					}
				}
			).finally(displayResult);
		};

		$scope.pullRefresh = function() {
			$scope.cycleChanged(true);
		};

		function cacheLeaderboards() {
			var cycleId = 'unknown';
			if ($scope.gameCycle) {
				cycleId = $scope.gameCycle.cycleId;
			}

			var leaderboardCache = 'virustracker.cache.game.leaderboard.' + cycleId;

			if ($scope.leaderboards === Object($scope.leaderboards)) {
				window.localStorage.setItem(leaderboardCache, JSON.stringify($scope.leaderboards));
			} else if (window.localStorage.getItem(leaderboardCache) !== null) {
				$scope.leaderboards = JSON.parse(window.localStorage.getItem(leaderboardCache));
			} else {
				// Failed, Stats are unknown at this point.
				$scope.unknownStats = true;
				$scope.leaderboards = null;
			}
		}

		function displayResult() {
			cacheLeaderboards();

			// Set the "time ago" string.
			if ($scope.leaderboards) {
				$scope.updatedTimeAgo = moment($scope.leaderboards.updatedTime).fromNow();
			}

			$scope.loading = false;
		}

	});

}());

(function() {
	'use strict';

	angular.module('virusTracker.controllers.offline', [
		'virusTracker.services.offline',
		'ui.bootstrap'
	]).controller('OfflineHelpCtrl', function ($scope, $window) {
		$scope.back = function() {
			$window.history.back();
		};
	}).controller('OfflineCtrl', function ($scope, $q, $modal, offlineState) {

		$scope.offline = offlineState.isOffline();
		var modalInstance = null;

		$scope.$on('virustracker.online', function(thisEvent, promise) {
			$scope.offline = false;

			if (modalInstance === null && promise) {
				var status = {
					title: "Data Sync",
					message: "Connection established, beginning synchronization with the server.",
					percent: 0,
					done: false,
					error: false
				};

				$scope.opts = {
					backdrop:    'static',
					templateUrl: 'views/onlineDialog.html',
					controller:  'OnlineDialogCtrl',
					resolve: {
						model: function() {
							return status;
						}
					}
				};

				promise.then(
					function(result) {
						status.percent = 100;
						status.message = "Completed data synchronization.";
					},
					function(error) {
						status.percent = 100;
						status.message = error.message;
						status.error = true;
					},
					function(notify) {
						if (typeof notify === 'object') {
							status.message = 'Processing ' + notify.processing + ' out of ' + notify.total;
							status.percent = (notify.processing - 1) / notify.total;
						} else if (typeof notify === 'string') {
							status.message = notify;
						}
					}
				).finally(
					function() {
						status.done = true;
					}
				);

				modalInstance = $modal.open($scope.opts);
				modalInstance.result.then(
					function() {
						modalInstance = null;
					}
				);
			}
		});

		$scope.$on('virustracker.offline', function() {
			$scope.$apply(function() {
				$scope.offline = true;
			});
		});
	}).controller('OnlineDialogCtrl', function($scope, $modalInstance, model) {
		/**
		 * Controller for the Data Syncrhonization modal dialog.
		 *
		 */

		$scope.model = model;

		$scope.close = function() {
			$modalInstance.close();
		};
	});

}());

(function() {
	'use strict';

	angular.module('virusTracker.controllers.welcome', [
		// No Dependencies
	]).controller('WelcomeCtrl', function ($scope,$rootScope) {
		// Move along, nothing to see here.
	});

}());

(function() {
	'use strict';

	/**
	 * Game Controllers
	 *
	 */
	angular.module('virusTracker.controllers.games', [
		'virusTracker.config.app',
		'virusTracker.services.api',
		'ngRoute'
	]).controller('GameStatsCtrl', function ($scope, $routeParams, $q, api, appConfig) {
		/**
		 * Game Details Screen Controller
		 *
		 */

		$scope.loading = true;
		$scope.useTeams = appConfig.USE_TEAMS;
		$scope.unknownStats = false;

		var sPromise =  api.gameStats($routeParams.gameId).then(
			function(result) {
				if (result.data === Object(result.data)) {
					$scope.gameStats = result.data.gameStats;
					$scope.gameStats.updatedTime = Date.now();
				}
			}
		);

		var gPromise = api.game(parseInt(window.localStorage.getItem('virustracker.user.gameId'))).then(
			function(result) {
				if (result.data === Object(result.data)) {
					$scope.game = result.data;
					$scope.game.updatedTime = Date.now();
				}
			}
		);

		$q.all([sPromise, gPromise]).finally(function() {
			// Save or Load Game data to/from cache.
			if ($scope.game === Object($scope.game)) {
				window.localStorage.setItem('virustracker.cache.game', JSON.stringify($scope.game));
			} else if (window.localStorage.getItem('virustracker.cache.game') !== null) {
				$scope.game = JSON.parse(window.localStorage.getItem('virustracker.cache.game'));
			}

			// If we have game data set the current cycle
			// and whether or not to show the cycle list.
			if ($scope.game === Object($scope.game)) {
				$scope.showCycleList = $scope.game.cycles.length > 2;
				for (var x in $scope.game.cycles) {
					if ($scope.game.cycles[x].current) {
						$scope.gameCycle = $scope.game.cycles[x];
						break;
					}
				}
			}

			displayResult();
		});

		$scope.cycleChanged = function(pullRefresh) {
			if (pullRefresh !== true) {
				$scope.loading = true;
				$scope.unknownStats = false;
				$scope.gameStats = null;
				$scope.updatedTimeAgo = false;
			}

			api.gameCycleStats($scope.gameCycle.cycleId).then(
				function(result) {
					if (result.data === Object(result.data)) {
						$scope.gameStats = result.data.gameStats;
						$scope.gameStats.updatedTime = Date.now();
					}
				}
			).finally(displayResult);
		};

		$scope.pullRefresh = function() {
			$scope.cycleChanged(true);
		};

		function cacheStats() {
			var cycleId = 'unknown';
			if ($scope.gameCycle) {
				cycleId = $scope.gameCycle.cycleId;
			}

			var statCache = 'virustracker.cache.gameStats.' + cycleId;
			if ($scope.gameStats === Object($scope.gameStats)) {
				window.localStorage.setItem(statCache, JSON.stringify($scope.gameStats));
			} else if (window.localStorage.getItem(statCache) !== null) {
				$scope.gameStats = JSON.parse(window.localStorage.getItem(statCache));
			} else {
				// Failed, Stats are unknown at this point.
				$scope.unknownStats = true;
				$scope.gameStats = null;
			}
		}

		function displayResult() {
			cacheStats();

			// Set the "time ago" string.
			if ($scope.gameStats === Object($scope.gameStats)) {
				$scope.updatedTimeAgo = moment($scope.gameStats.updatedTime).fromNow();
			}

			$scope.loading = false;
		}
	});

}());

(function() {
	'use strict';

	/**
	 * Message Controllers
	 *
	 */
	angular.module('virusTracker.controllers.messages', [
		'ngSanitize',
		'virusTracker.services.messages',
		'virusTracker.services.api',
		'virusTracker.services.general',
		'virusTracker.services.user',
		'virusTracker.config.app',
		'ui.bootstrap'
	]).controller('MessagesCtrl', function ($scope, $rootScope, $modal, $timeout, messages, api, general, user, appConfig) {
		/**
		 * Messages Screen Controller
		 *
		 */
		messages.validateMessages();
		$scope.messages = messages.messages().messages;
		messagesToArray();
		$scope.optNum = [];
		$scope.newMessagesCount = 0;

		$scope.showMessage = function(m) {
			return !!m;
		};

		var title = 'defaultTitle';
		var message = 'defaultMessage';

		// Hack to force the state icon to update, if necessary.
		$rootScope.$broadcast('virustracker.messages.update');

		$scope.showQuizQuestion = function(message) {
			return !!message.quizQuestion && moment(message.mutation.startUnix).isAfter();
		};

		$scope.submitAnswer = function (id, mutationId) {
			$(document.activeElement).filter(':input:focus').blur();
			$scope.fieldsDisabled = true;

			api.quizForVaccine(mutationId, $scope.messages[id].quizQuestion.id, $scope.optNum[id].optionNum).then(
				function(result) {
					if (result.data.interactionResults.successFlag == 't') {
						title = "You have been Inoculated!";
						user.state = {
							'cd': 'i',
							'name': 'Inoculated',
							'descr': ''
						};
						user.mutation = $scope.messages[id].mutation;
					} else {
						title = "Vaccine Not Received!";
						api.participantState().then(function(result) {
							user.state = result.data.state;
							user.mutation = result.data.mutation;
						});
					}
					message = result.data.interactionResults.message;
				},
				function(reason) {
					if (reason === appConfig.HTTP_REQUEST_QUEUED) {
						if ($scope.optNum[id].correct === true) {
							title = "You have been Inoculated!";
							message = "You have obtained the latest vaccine. Help other by interacting with them.";
							user.state = {
								'cd': 'i',
								'name': 'Inoculated',
								'descr': ''
							};
							user.mutation = $scope.messages[id].mutation;
						} else {
							title = "Vaccine Not Received!";
							message = "Sorry, that was not the correct answer. You have not obtained the needed vaccine. Find someone with the vaccine!";
						}
					} else {
						title = "Vaccine Not Received!";
						message = "Sorry, we are experiencing problems. You have not obtained the needed vaccine. Find someone with the vaccine!";
					}
				}
			).finally(function() {
				var modalOpts = {
					backdrop: 'static',
					templateUrl: 'views/registerDialog.html',
					controller: 'MessageDeleteDialogCtrl',
					resolve:{
						model: function() {
							return {
								title: title,
								message: message
							};
						}
					}
				};

				$modal.open(modalOpts).result.then(function() {
					$scope.deleteMessage(id);
				});
			});
		};

		$scope.deleteMessage = function(index) {
			$scope.fieldsDisabled = true;
			messages.removeMessage(index);
			$scope.messages = messages.messages().messages;
			messagesToArray();
			$scope.fieldsDisabled = false;
		};

		$scope.classForMessageType = function(type) {
			if (type == 'ma') {
				return 'message-mutation';
			} else if (type == 'rq') {
				return 'message-infected';
			} else if (type == 'sc') {
				return 'message-infected';
			} else if (type == 'ir') {
				return 'message-interactionresult';
			} else if (type == 'cc') {
				return 'message-cyclechange';
			}

			return 'message-mutation';
		};

		function messagesToArray() {
			$scope.messageArray = [];
			for(var index in $scope.messages) {
				if ($scope.messages.hasOwnProperty(index)) {
					$scope.messageArray.push($scope.messages[index]);
				}
			}
		}

		// Messages - Watch property on messages service and scope variable to
		// display notifications icon.
		$scope.$watch(
			function () {
				return messages.count();
			},
			function (count) {
				$scope.hasNotifications = count > 0;
			},
			true
		);

		$scope.$on("virustracker.messages.update", function(event, count) {
			$scope.newMessagesCount = count;
		});

		$scope.reloadMessages = function() {
			return $timeout(function() {
				$scope.messages = messages.messages().messages;
				messagesToArray();
				$scope.optNum = [];
				$scope.newMessagesCount = 0;
			}, 0);
		};
	}).controller('MessageDeleteDialogCtrl', function ($scope, $modalInstance, model) {
		$scope.model = model;

		$scope.close = function() {
			$modalInstance.close();
		};
	});

}());

(function() {
	'use strict';

	angular.module('virusTracker.controllers.mutation', [
		'virusTracker.services.game',
		'virusTracker.services.user',
		'virusTracker.services.messages',
		'virusTracker.config.app'
	]).controller('MutationCtrl', function ($scope, $timeout, $q, game, user, messages, appConfig) {
		/**
		 * Mutation/Doomsday Clock Controller
		 *
		 */

		var clockTO = null,
			reloadTO = null,
			interval = 10,
			runClock = true,
			deadClockDelay = 30000,
			retryDelay = 60000;

		$scope.loading = false;
		$scope.currentMutation = null;
		$scope.nextMutation = null;
		$scope.doomsdayClock = null;

		$scope.disableDoomsdayClock = function () {
			runClock = false;
		};

		$scope.tickClock = function () {
			if (clockTO) {
				$timeout.cancel(clockTO);
			}
			if (!runClock) {
				if ($scope.nextMutation) {
					$scope.reload(Math.max($scope.nextMutation.startMoment.valueOf() - moment().valueOf(), 0));
				}
				return $q.when('Clock Disabled');
			}

			if (!$scope.nextMutation || (user.isInoculated() && user.mutation && user.mutation.id == $scope.nextMutation.id)) {
				$scope.doomsdayClock = null;
				if ($scope.nextMutation) {
					$scope.nextMutation.inoculated = true;
					$scope.reload(Math.max($scope.nextMutation.startMoment.valueOf() - moment().valueOf(), 0));
				} else {
					$scope.reload(retryDelay);
				}


				return $q.when('Participant Inoculated');
			}

			clockTO = $timeout(function () {
				var millisLeft = $scope.nextMutation.startUnix - moment().valueOf();
				if (millisLeft > 0) {
					$scope.finished = false;

					var duration = moment.duration(millisLeft);
					if (millisLeft < 60000) {// < 1 Minute
						$scope.doomsdayClock = moment(duration.asMilliseconds()).format('ss.S');
						interval = 100;
					} else if (millisLeft < 86400000) {// < 1 Day
						$scope.doomsdayClock = zeroPad(duration.hours()) + ":" +
							zeroPad(duration.minutes()) + ":" + zeroPad(duration.seconds());
						interval = 1000;
					} else if (millisLeft < 2592000000) {// < 1 Month
						$scope.doomsdayClock = duration.days();
						$scope.doomsdayClock += ($scope.doomsdayClock > 1 ? ' Days' : ' Day');
						interval = 3600000;
					} else {
						$scope.doomsdayClock = duration.months();
						$scope.doomsdayClock += ($scope.doomsdayClock > 1 ? ' Months' : ' Month');
						$timeout.cancel(clockTO);
						return;
					}

					if (clockTO) {
						clockTO.then(function () {
							$scope.tickClock();
						});
					} else {
						$scope.tickClock();
					}
				} else {
					messages.mutationStartedMessage($scope.nextMutation);
					$scope.doomsdayClock = '00.0';
					$scope.finished = true;
					$scope.reload(deadClockDelay);
					$timeout.cancel(clockTO);
				}
			}, interval);
			return clockTO;
		};

		var zeroPad = function (num) {
			if (num < 10) {
				return '0' + num;
			}
			return num;
		};

		$scope.pullRefresh = function() {
			$scope.reload(0);
		};

		$scope.reload = function (delay) {
			delay = delay || 0;
			if (!reloadTO) {
				// Cancel Existing TO before recalling.
				$timeout.cancel(reloadTO);
			}
			reloadTO = $timeout(function () {
				if (!$scope.loading) {
					$scope.load();
				}
			}, delay);
			return reloadTO;
		};

		function parseMutations(forceUpdate) {
			return game.getGame(user.gameId, forceUpdate).then(
				function (gameData) {
					// Iterate over mutations to find the current and next.
					for (var key in gameData.mutations) {
						if (gameData.mutations.hasOwnProperty(key)) {
							var mutation = gameData.mutations[key];

							var mutationStartDiff = moment().diff(mutation.startUnix);

							if (!moment(mutation.startUnix).isAfter() &&
									($scope.currentMutation === null || mutation.startUnix >= $scope.currentMutation.startUnix)) {
								// Current Mutation if:
								// - start time was before now
								// - start time was after current 'current mutation' candidate
								$scope.currentMutation = scopeMutation(mutation);
							} else if (moment(mutation.startUnix).isAfter() &&
									($scope.nextMutation === null ||
										!moment($scope.nextMutation.startUnix).isAfter() ||
										mutation.startUnix <= $scope.nextMutation.startUnix)) {
								// Next Mutation if:
								// - start time is after now
								// - starts before our current 'next mutation' candidate
								// - or the current 'next mutation' is invalid.
								$scope.nextMutation = scopeMutation(mutation);
								$scope.nextMutation.inoculated = !!(user.isInoculated() && user.mutation && user.mutation.id == $scope.nextMutation.id);
							}
						}
					}

					// Not sure if we have the latest and don't have what we need
					// then we should force the cached Game to update.
					if (game.shouldUpdate() && forceUpdate !== true && ($scope.currentMutation === null || $scope.nextMutation === null)) {
						return parseMutations(true);
					}
				},
				function (reason) {
					// TODO: Don't have the mutations, what whould happen?
					return $q.reject(reason);
				}
			);
		}

		function scopeMutation(mutation) {
			mutation.announceMoment = moment(mutation.announcementUnix);
			mutation.startMoment = moment(mutation.startUnix);
			mutation.appeared = mutation.announceMoment.format(appConfig.DATE_FORMAT);
			mutation.prevalent = mutation.startMoment.format(appConfig.DATE_FORMAT);
			mutation.effectiveness = Math.floor(mutation.vaccineEffectiveness * 100) + '%';
			return mutation;
		}

		$scope.load = function () {
			$scope.loading = true;

			// Once the next mutation starts (becomes current) reset it.
			if ($scope.nextMutation !== null && !moment($scope.nextMutation.startUnix).isAfter()) {
				$scope.currentMutation = $scope.nextMutation;
				$scope.nextMutation = null;
				$scope.doomsdayClock = null;
			}

			parseMutations().then(
				function() {
					if ($scope.currentMutation) {
						messages.mutationStartedMessage($scope.currentMutation);
					}

					if ($scope.nextMutation) {
						if (moment($scope.nextMutation.announcementUnix).isBefore() || moment($scope.nextMutation.announcementUnix).isSame()) {
							// The Next Mutation has been announced, add message and start the clock.
							messages.mutationAnnouncedMessage($scope.nextMutation);
							return $scope.tickClock();
						} else {
							// Set to check again when the mutation is scheduled for announcement.
							var msToAnnouncement = Math.max($scope.nextMutation.announceMoment.valueOf() - moment().valueOf(), 0);
							$scope.nextMutation = null;
							$scope.reload(msToAnnouncement);
						}
					} else {
						$scope.reload(retryDelay);
					}
				}
			).finally(
				function() {
					$scope.loading = false;
				}
			);
		};

		$scope.load();

		// Refresh this controller when the app is resumed or a user signs in.
		$scope.$on('virustracker.login', function () {
			$scope.reload(0);
		});
		$scope.$on('virustracker.resume', function () {
			$scope.reload(0);
		});
		$scope.$on('virustracker.startDoomsday', function () {
			$scope.reload(0);
		});

		// Watch the user's current mutation id and keep the local variable updated.
		// This will allow the clock to stop once the user has been inoculated with the next mutation.
		$scope.$watch(function () {
			if (user.mutation) {
				return user.mutation.id;
			}
			return '';
		}, function (mutationId) {
			$scope.tickClock();
		}, true);

		// Be sure all timeouts have been stopped.
		$scope.$on('$destroy', function () {
			$timeout.cancel(reloadTO);
			$timeout.cancel(clockTO);
		});
	});

}());


(function() {
	'use strict';

	/**
	 * Team Controllers
	 *
	 */
	angular.module('virusTracker.controllers.team', [
		'virusTracker.services.api',
		'virusTracker.services.user',
		'ngRoute'
	]).controller('TeamStatsCtrl', function ($scope, $routeParams, $q, api, user) {
		$scope.loading = true;
		$scope.teamName = user.teamName;

		var gPromise = api.game(parseInt(user.gameId)).then(
			function(result) {
				$scope.gameCycles = result.data.cycles;

				$scope.showCycleList = $scope.gameCycles.length > 2;

				for (var x in $scope.gameCycles) {
					if ($scope.gameCycles[x].current) {
						$scope.gameCycle = $scope.gameCycles[x];
						break;
					}
				}
			}
		);

		var sPromise = api.teamStats(parseInt(user.teamId)).then(
			function(result) {
				$scope.teamStats = result.data.teamStats;
				$scope.teamName = $scope.teamStats.name;
			},
			function(error) {
			//**TODO: handle lack of connectivity
				console.log("teamStats call error: " + JSON.stringify(error));
			}
		);

		$q.all([sPromise, gPromise]).then(function() {
			$scope.loading = false;
		});

		$scope.cycleChanged = function(pullRefresh) {
			if (pullRefresh !== true) {
				$scope.loading = true;
			}

			api.teamCycleStats($scope.gameCycle.cycleId).then(
				function(result) {
					$scope.teamStats = result.data.teamStats;
					$scope.loading = false;
				},
				function(error) {
					$scope.loading = false;
					//**TODO: handle lack of connectivity
					console.log("teamCycleStats call error: " + JSON.stringify(error));
				}
			);
		};

		$scope.pullRefresh = function() {
			$scope.cycleChanged(true);
		};

	});

}());

(function() {
	'use strict';

	/**
	 * Loading Service
	 *
	 * This service knows when the application is waiting for a response from
	 * an ajax request (i.e. an API call).
	 */
	angular.module('virusTracker.services.loading', [
	]).factory('loadingService', function() {
		var service = {
			requestCount: 0,
			isLoading: function() {
				return service.requestCount > 0;
			}
		};
		return service;
	}).factory('onStartInterceptor', function(loadingService) {
		return function (data, headersGetter) {
			loadingService.requestCount++;
			return data;
		};
	}).factory('onCompleteInterceptor', function(loadingService) {
		return function(promise) {
			var decrementRequestCount = function(response) {
				loadingService.requestCount--;
				return response;
			};
			return promise.then(decrementRequestCount, decrementRequestCount);
		};
	}).config(function($httpProvider) {
		$httpProvider.responseInterceptors.push('onCompleteInterceptor');
	}).run(function($http, onStartInterceptor) {
		$http.defaults.transformRequest.push(onStartInterceptor);
	}).controller('LoadingCtrl', function($scope, loadingService) {
		$scope.$watch(
			function() { return loadingService.isLoading(); },
			function(value) { $scope.loading = value; }
		);
	});

}());


(function() {
	'use strict';

	/**
	 * User Model
	 *
	 * Model representing the current user.
	 */
	angular.module('virusTracker.services.user', [
		'virusTracker.services.apiUtils'
	]).factory('user', function(apiUtils) {
		return {
			authenticated: false,
			screenName: null,
			apiKey: null,
			gameId: null,
			dammBandId: null,
			teamId: null,
			teamName: null,
			state: null,
			mutation: null,
			registrationTime: null,
			isAuthenticated: function() {
				if (!this.authenticated) {
					this.loadFromLocalStorage();
				}
				return this.authenticated;
			},
			isInoculated: function() {
				return this.state && this.state.cd.toLowerCase() === 'i';
			},
			isInfected: function() {
				return this.state && this.state.cd.toLowerCase() === 'v';
			},
			loadUser: function(data) {
				this.authenticated = true;
				this.screenName = data.screenName;
				this.apiKey = CryptoJS.enc.Base64.parse(data.apiKey);
				this.gameId = data.gameId;
				this.dammBandId = data.dammBandId;
				this.teamId = data.teamId;
				this.teamName = data.teamName;
				this.registrationTime = data.registrationTime;
				this.state = null;
				this.mutation = null;
				this.copyToLocalStorage();
			},
			copyToLocalStorage: function() {
				window.localStorage.setItem('virustracker.user.screenName', this.screenName);
				window.localStorage.setItem('virustracker.user.apiKey', CryptoJS.enc.Base64.stringify(this.apiKey));
				window.localStorage.setItem('virustracker.user.gameId', this.gameId);
				window.localStorage.setItem('virustracker.user.teamId', this.teamId);
				window.localStorage.setItem('virustracker.user.teamName', this.teamName);
				window.localStorage.setItem('virustracker.user.dammBandId', this.dammBandId);
				window.localStorage.setItem('virustracker.user.registrationTime', this.registrationTime);
				apiUtils.initMessagesPoolForBandId(this.dammBandId);
			},
			loadFromLocalStorage: function() {
				this.screenName = window.localStorage.getItem('virustracker.user.screenName');
				this.apiKey = window.localStorage.getItem('virustracker.user.apiKey');
				this.gameId = window.localStorage.getItem('virustracker.user.gameId');
				this.teamId = window.localStorage.getItem('virustracker.user.teamId');
				this.teamName = window.localStorage.getItem('virustracker.user.teamName');
				this.dammBandId = window.localStorage.getItem('virustracker.user.dammBandId');
				this.registrationTime = window.localStorage.getItem('virustracker.user.registrationTime');
				if (this.registrationTime) {
					this.registrationTime = parseInt(this.registrationTime);
				}
				if (this.screenName && this.apiKey && this.dammBandId) {
						this.apiKey = CryptoJS.enc.Base64.parse(this.apiKey);
						this.authenticated = true;
				}
			},
			logout: function(callback) {
				this.authenticated = false;
				this.state = null;
				this.mutation = null;
				window.localStorage.removeItem('virustracker.user.gameId');
				window.localStorage.removeItem('virustracker.user.teamId');
				window.localStorage.removeItem('virustracker.user.teamName');
				window.localStorage.removeItem('virustracker.user.screenName');
				window.localStorage.removeItem('virustracker.user.apiKey');
				window.localStorage.removeItem('virustracker.user.dammBandId');
				window.localStorage.removeItem('virustracker.user.registrationTime');
			}
		};
	});

}());

(function() {
	'use strict';

	/**
	 * VirusTracker API Service
	 *
	 * Provides access to the VirusTracke REST APIs.
	 */
	var module = angular.module('virusTracker.services.api', [
		'virusTracker.config.app',
		'virusTracker.services.user',
		'btford.phonegap.geolocation'
	]).factory('api', function($http, $q, $rootScope, $timeout, user, geolocation, appConfig) {
		return {
			teamStats: function(teamId) {
				return this.ajaxCall("GET", "/api/team/stats/" + teamId);
			},
			teamCycleStats: function(teamId, cycleId) {
				return this.ajaxCall("GET", "/api/team/cycle/stats/" + teamId + "/" + cycleId);
			},
			game: function(gameId) {
				return this.ajaxCall("GET", "/api/games/" + gameId);
			},
			gameStats: function(gameId) {
				return this.ajaxCall("GET", "/api/games/stats/" + gameId);
			},
			gameCycleStats: function(gameCycleId) {
				return this.ajaxCall("GET", "/api/games/cycle/stats/" + gameCycleId);
			},
			leaderboardStats: function(gameId) {
				return this.ajaxCall("GET", "/api/games/lboardstats/" + gameId);
			},
			leaderboardCycleStats: function(gameCycleId) {
				return this.ajaxCall("GET", "/api/games/cycle/lboardstats/" + gameCycleId);
			},
			gameLeaderboards: function(gameId, limit) {
				limit = limit || appConfig.LEADERBOARD_LIMIT;
				return this.ajaxCall("GET", "/api/games/" + gameId + "/leaderboards/user/" + user.dammBandId + "?limit=" + limit);
			},
			gameCycleLeaderboards: function(gameCycleId, limit) {
				limit = limit || appConfig.LEADERBOARD_LIMIT;
				return this.ajaxCall("GET", "/api/games/cycle/" + gameCycleId + "/leaderboards/user/" + user.dammBandId + "?limit=" + limit);
			},
			participantStats: function() {
				var data = {
					dammBandId: parseInt(window.localStorage.getItem('virustracker.user.dammBandId'))
				};

				return this.ajaxCall("POST", this.protectedApi("/api/user/stats"), data);
			},
			participantCycleStats: function(gameCycleId) {
				var data = {
					dammBandId: parseInt(window.localStorage.getItem('virustracker.user.dammBandId')),
					gameCycleId: gameCycleId
				};

				return this.ajaxCall("POST", this.protectedApi("/api/user/cycle/stats"), data);
			},
			participantState: function() {
				return this.ajaxCall("GET", this.protectedApi("/api/user/currentState"));
			},
			scan: function(scannedBandId) {
				var data = {
					gameId: parseInt(window.localStorage.getItem('virustracker.user.gameId')),
					p1DammBandId: parseInt(window.localStorage.getItem('virustracker.user.dammBandId')),
					p2DammBandId: scannedBandId,
					timestampEpoch: new Date().getTime()
				};

				var api = this;

				return this.getGeoLocationPosition().then(
					function(position) {
						if (position) {
							data.latitude = position.latitude;
							data.longitude = position.longitude;
						}
						//return $q.resolve();
					}
				).then(
					function() {
						return api.ajaxCall("POST", api.protectedApi("/api/scan"), data, true);
					}
				);
			},

			updateVaccine: function(scannedValue) {
				var deferred = $q.defer();
				var data = {
					gameId: parseInt(window.localStorage.getItem('virustracker.user.gameId')),
					p1DammBandId: parseInt(window.localStorage.getItem('virustracker.user.dammBandId')),
					timestampEpoch: new Date().getTime()
				};

				// Note the $rootScope.$apply in the callbacks for current location.
				// The callbacks here are used to resolve a promise, which is later
				// chained with more promises. The then function of a promise only
				// occur in a $digest cycle. Thus without the $apply the chained promises
				// are only executed on the next $digest, which is usually when the user
				// performs other actions.
				navigator.geolocation.getCurrentPosition(
					function(position) {
						data.latitude = position.latitude;
						data.longitude = position.longitude;
						$rootScope.$apply(function() {
							deferred.resolve();
						});
					},
					function() {
						$rootScope.$apply(function() {
							deferred.resolve();
						});
					}
				);

				var api = this;
				return deferred.promise.then(function() {
						return api.ajaxCall('POST', api.protectedApi('/api/user/vaccine'), data).then(
								function(result) {
										return result;
								}, function(error) {
										return $q.reject(error);
								}
						);
					});
			},

			updateVaccineViaQuiz: function(notificationId, optNum) {
				var deferred = $q.defer();
				var data = {
					gameId: parseInt(window.localStorage.getItem('virustracker.user.gameId')),
					p1DammBandId: parseInt(window.localStorage.getItem('virustracker.user.dammBandId')),
					notificationId: notificationId,
					optNum: optNum
				};

				navigator.geolocation.getCurrentPosition(
					function(position) {
						data.latitude = position.latitude;
						data.longitude = position.longitude;
						$rootScope.$apply(function() {
							deferred.resolve();
						});
					},
					function() {
						$rootScope.$apply(function() {
							deferred.resolve();
						});
					}
				);

				var api = this;
				return deferred.promise.then(function() {
					return api.ajaxCall('POST', api.protectedApi('/api/user/updateVaccineViaQuiz'), data).then(
						function(result) {
							return result;
						}, function(error) {
							return $q.reject(error);
						}
					);
				});
			},

			quizForVaccine: function(mutationId, quizQuestionId, quizQuestionOptionId) {
				var data = {
					gameId: parseInt(window.localStorage.getItem('virustracker.user.gameId')),
					p1DammBandId: parseInt(window.localStorage.getItem('virustracker.user.dammBandId')),
					mutationId: mutationId,
					quizQuestionId: quizQuestionId,
					quizQuestionOptionId: quizQuestionOptionId,
					timestampEpoch: new Date().getTime()
				};

				var api = this;

				return this.getGeoLocationPosition().then(
					function(position) {
						if (position) {
							data.latitude = position.latitude;
							data.longitude = position.longitude;
						}
					}
				).then(
					function() {
						return api.ajaxCall("POST", api.protectedApi("/api/user/quizForVaccine"), data, true);
					}
				);
			},

			/**
			 * Attempt to get the Geolocation.
			 * Failure is an option, we just don't report it.
			 *
			 * @returns Promise that is always resolved (success). If the location is
			 * is obtained, the position object will be available.
			 */
			getGeoLocationPosition: function() {
				var deferred = $q.defer();

				// The use of $timeout is to ensure $digest cycle is called,
				// but protects us against the '$digest alredy in progress' error.
				geolocation.getCurrentPosition(
					function(position) {
						$timeout(function() {
							deferred.resolve(position);
						});
					},
					function() {
						$timeout(function() {
							deferred.resolve();
						});
					}
				);

				return deferred.promise;
			},

			track: function(position) {
				var data = {
					key: user.screenName,
					position: position
				};
				return this.ajaxCall("POST", this.protectedApi("/api/track"), data);
			},

			notification: function(mutationId, typeCd) {
				return this.notificationForBandId(mutationId, typeCd, parseInt(user.dammBandId));
			},

			notificationForBandId: function(mutationId, typeCd, dammBandId) {
				var callData = {
					dammBandId: parseInt(dammBandId),
					mutationId: mutationId,
					typeCd: typeCd
				};

				return this.ajaxCall("POST", this.protectedApi("/api/user/notification"), callData).then(
					function (data) {
						console.log("success callback from /api/user/notification: " + JSON.stringify(data));
						data.callData = callData;
						return data;
					},
					function (error) {
						console.log("error callback from /api/user/notification" + error);
						console.log("requested notifs for: " + JSON.stringify(callData));
						return $q.reject(error);
					}
				);
			},
			nextMutation: function() {
				return this.ajaxCall("GET", "/api/game/nextMutation/" + user.gameId);
			},
			currentMutation: function() {
				return this.ajaxCall("GET", "/api/game/currentMutation/" + user.gameId);
			},
			mutations: function() {
				return this.ajaxCall("GET", "/api/game/mutations/" + user.gameId);
			},
			bandIdForRegistration: function(bandId) {
				return this.ajaxCall("GET", "/api/user/band/registration/" + bandId);
			},

			/**
			 * Makes call to the login API. On successful login the User model is
			 * updated with the data returned by the API and a 'login' event is
			 * broadcasted.
			 *
			 * @param {Object} gameId
			 * @param {Object} identifier Screen Name or Band ID
			 * @param {Object} password
			 */
			login: function(gameId, identifier, password) {
				var deferred = $q.defer();
				var loginData = {
					gameId: gameId,
					user: identifier,
					password: password
				};

				this.ajaxCall("POST", "/api/login", loginData).then(
					function(success) {
						user.loadUser(success.data.registrant);
						$rootScope.$broadcast('virustracker.login');
						deferred.resolve(success);
					},
					function(error) {
						deferred.reject(error);
					}
				);

				return deferred.promise;
			},

			/**
			 * Makes call to the Auth.Register API. On successful registration the
			 * use is logged in, the User model is updated, and a 'login' event is
			 * broadcasted.
			 *
			 */
			register: function(registrationData) {
				var deferred = $q.defer();

				this.ajaxCall("POST", "/api/appRegister", registrationData).then(
					function(result) {
						console.log("ajaxCall to appRegister results: " + JSON.stringify(result));
						if (result.data.interactionResults.successFlag == 't') {
							user.loadUser(result.data.registrant);
							$rootScope.$broadcast('virustracker.login', true);
							deferred.resolve({ interactionResults: result.data.interactionResults });
						} else {
							deferred.reject(result);
						}
					},
					function(error) {
						deferred.reject(error);
					}
				);

				return deferred.promise;
			},

			/**
			 * No API call is made (yet). This is here in case there is ever a need
			 * to perform logout operations server side. After logout, a 'logout'
			 * event is broadcasted.
			 */
			logout: function() {
				var bandId = user.dammBandId;
				user.logout();
				$rootScope.$broadcast('virustracker.logout', bandId);
			},

			ping: function() {
				return this.ajaxCall("GET", "/api/info");
			},

			/**
			 * Builds an URL that contains HMAC parameters.
			 *
			 * @param {Object} path The API URL path
			 * @param {Object} queryParams Map of additional query parameters (not including key, stamp, and token)
			 */
			protectedApi: function(path, queryParams) {
				// Build URL used for HMAC hash
				var url = path + "?key=" + encodeURIComponent(user.screenName);
				url += "&stamp=" + new Date().getTime();
				for (var key in queryParams) {
					if (queryParams.hasOwnProperty(key)) {
						url += "&" + key + "=" + encodeURIComponent(queryParams[key]);
					}
				}

				// Generate HMAC hash and append to URL as 'token' query parameter.
				var hash = CryptoJS.HmacSHA256(url, user.apiKey).toString(CryptoJS.enc.Base64);
				url += "&token=" + encodeURIComponent(hash);

				return url;
			},

			/**
			 * Determine if the provided URL is a protected API call.
			 */
			isProtectedUrl: function(url) {
				var queryIndex = url.indexOf('?');
				return url.indexOf('token=') > queryIndex;
			},

			/**
			 * Helper function to make an API call and return a promise that can
			 * be used by the invoker.
			 */
			ajaxCall: function(method, url, data, queueable) {
				if (url.indexOf(appConfig.API_BASE_URL) !== 0) {
					url = appConfig.API_BASE_URL + url;
				}

				var config = {
					'method': method,
					'url': url,
					'timeout': appConfig.API_TIMEOUT_MS
				};

				config[appConfig.QUEUEABLE_REQUEST] = queueable;

				if (data) {
					config.data = data;
				}

				return $http(config);
			}
		};
	});

}());


(function() {
	'use strict';

	/**
	 * VirusTracker API Service Utils
	 *
	 * Utility functions to assist with api calls.
	 */
	var module = angular.module('virusTracker.services.apiUtils', [
		'virusTracker.config.app'
	]).factory('apiUtils', function ($http, $q, $rootScope, appConfig) {
		return {
			/**
			 * Helper function to make an API call and return a promise that can
			 * be used by the invoker.
			 */
			ajaxCall: function(method, url, data, queueable) {
				if (url.indexOf(appConfig.API_BASE_URL) !== 0) {
					url = appConfig.API_BASE_URL + url;
				}

				var config = {
					'method': method,
					'url': url,
					'timeout': appConfig.API_TIMEOUT_MS
				};

				config[appConfig.QUEUEABLE_REQUEST] = queueable;

				if (data) {
					config.data = data;
				}

				return $http(config);
			},

			//this ideally belongs in the message service, but it needs to be called from the user service, and they each have a dependency on the other
			// so run into the circular reference problem. So, going here...
			initMessagesPoolForBandId: function (dammBandId) {
				//if there is no messages pool, set it to be an empty object
				var messagesPool = JSON.parse(window.localStorage.getItem('virustracker.messages') || '{}');

				//if there is no box for the current user in the messages pool, add an empty one and store it back in localStorage
				if (dammBandId && !messagesPool[dammBandId]) {
					messagesPool[dammBandId] = {'messages':{}};
					window.localStorage.setItem('virustracker.messages', JSON.stringify(messagesPool));
				}
			}
		};
	});

}());


(function() {
	'use strict';

	/**
	 * User Model
	 *
	 * Model representing the current user.
	 */
	angular.module('virusTracker.services.game', [
		'virusTracker.services.apiUtils'
	]).factory('game', function($q, apiUtils) {

		var STORAGE_KEY = 'virustracker.game',
			USED_QUESTIONS_KEY = 'virustracker.game.questions.used.',
			MAX_AGE = 600000; // Milliseconds before checking for updates. // 10 Minutes

		var game = {};
		/*
		Game Object = {
			gameId: 1,
			name: 'string,
			descr: 'string',
			cycles: {},
			mutations: {},
			questions: {},
			config: {},
			updatedTime: Date.now()
		}
		*/

		function cacheLocally(data) {
			if (!data) {
				return JSON.parse(window.localStorage.getItem(STORAGE_KEY));
			}
			data.updatedTime = Date.now();
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
			return data;
		}

		// We only ever need one request at a time. This is to store
		// the API promise so we can pass it to callers when the game
		// is requested while it's being retrieved by another call.
		var promise = null;

		return {
			/**
			 * Get the current game.
			 *
			 * @param force Forces update from the server (if possible).
			 * @return promise There is a good chance this requires an API call.
			 */
			getGame: function(gameId, force) {
				if (promise) {
					return promise;
				}

				var deferred = $q.defer();

				if (force !== true) {
					game = cacheLocally();

					if (!this.shouldUpdate() && game.gameId === gameId) {
						deferred.resolve(game);
						return deferred.promise;
					}
				}

				// About to make the API call, save the promise to ensure
				// this isn't made unecessarily in the future.
				promise = deferred.promise;

				// Either were forcing an update, the game was not cached, or
				// the cached version "expired".
				apiUtils.ajaxCall("GET", "/api/games/" + gameId + "/complete").then(
					function(result) {
						if (typeof result.data !== 'object') {
							return deferred.reject(result);
						}
						game = {};
						for (var key in result.data) {
							if (result.data.hasOwnProperty(key)) {
								game[key] = result.data[key];
							}
						}
						deferred.resolve(cacheLocally(game));
					},
					function(reason) {
						deferred.reject(reason);
					}
				).finally(function() {
					promise = null;
				});

				return deferred.promise;
			},

			vaccineOnMutationAnnouncment: function() {
				var game = cacheLocally();
				var percent = 0.5;
				if (game !== null) {
					percent = game.config.mutationAnnounceVaccineDistPct;
				}
				return Math.random() <= percent;
			},

			randomQuestion: function(userDammBandId) {
				var game = cacheLocally();

				// Get a random question.
				var index = Math.floor(Math.random() * game.questions.length);
				var question = game.questions[index];

				if (userDammBandId) {
					// Get list of used questions for this user.
					var used = JSON.parse(window.localStorage.getItem(USED_QUESTIONS_KEY + userDammBandId)) || [];

					// Find an unused question. (not optimal but should be good enough)
					var totalQuestions = game.questions.length,
						attempts = 1;
					while (used.indexOf(question.id) >= 0 && attempts < totalQuestions ) {
						index = (index + 1) % totalQuestions;
						question = game.questions[index];
						attempts++;
					}

					// Clear used list if all questions have been used,
					// otherwise add this question to the used list.
					if (totalQuestions - 1 < used.length) {
						used = [];
					} else {
						used.push(question.id);
					}

					// Save the list of used question for this user.
					window.localStorage.setItem(USED_QUESTIONS_KEY + userDammBandId, JSON.stringify(used));
				}

				return question;
			},

			shouldUpdate: function() {
				return game === null || moment(game.updatedTime + MAX_AGE).isBefore(/* Now */);
			}
		};
	});

}());

(function() {
	'use strict';

	/**
	 * User Service
	 *
	 * Provides functions to register and authenticate users, and maintains
	 * the current user.
	 */
	angular.module('virusTracker.services.general', [
		'virusTracker.services.apiUtils'
	]).factory('general', function ($http, $q, apiUtils) {
		return {
			ageRanges: function () {
				return this.currentGameId().then(
					function (gameId) {
						return apiUtils.ajaxCall("GET", "/api/info/ages/" + gameId);
					},
					function (error) {
						return $q.reject(error);
					}
				);
			},
			genders: function () {
				return apiUtils.ajaxCall("GET", "/api/info/genders");
			},
			currentMutationId: function() {
				return apiUtils.ajaxCall("GET", "/api/game/currentMutationId/" +
						window.localStorage.getItem('virustracker.user.gameId'));
			},
			currentGameId: function () {
				return this.currentGame().then(
					function(game) {
						return game.gameId;
					},
					function(error) {
						$q.reject(error);
					});
			},
			currentGameTeams: function() {
				return this.currentGameId().then(
					function(gameId) {
						return apiUtils.ajaxCall("GET", "/api/teams/" + gameId);
					},
					function(error) {
						return $q.reject(error);
					}
				);
			},
			currentGame: function () {
				var deferred = $q.defer(),
					that = this;
				if (this._currentGame) {
					deferred.resolve(this._currentGame);
				} else {
					apiUtils.ajaxCall("GET", "/api/info/currentGame").then(
						function(result) {
							that._currentGame = result.data;
							deferred.resolve(that._currentGame);
						},
						function(error) {
							deferred.reject(null);
						}
					);
				}
				return deferred.promise;
			},
			_currentGame: null
		};
	});

}());

(function() {
	'use strict';

	/**
	 * Angular Service wrapper for cordova Device api.
	 *
	 * window.device is not defined until the deviceready event has fired.
	 * Since angular is bootstrapped before the deviceready event this wrapper
	 * ensures that window.device is loaded before executing.
	 */
	angular.module('virusTracker.services.device', [
		'btford.phonegap.ready'
	]).factory('device', function ($rootScope, phonegapReady) {
		return {
			platform: phonegapReady(function (callback) {
				callback(window.device.platform);
			}),
			info: phonegapReady(function (callback) {
				callback(window.device);
			})
		};
	});

}());

(function() {
	'use strict';

	/**
	 * Angular Service for handling offline/online events and states.
	 *
	 */
	angular.module('virusTracker.services.offline', [
		'virusTracker.config.app',
		'virusTracker.services.api'
	]).factory('offlineState', function() {
		// Initialize local storage.
		if (!Array.isArray(JSON.parse(window.localStorage.getItem('virustracker.offline.queue')))) {
			saveQueue([]);
		}

		function saveQueue(queue) {
			window.localStorage.setItem('virustracker.offline.queue', JSON.stringify(queue));
		}

		return {
			'isOffline': function() {
				return navigator.connection.type === Connection.NONE;
			},
			'queueRequest': function(requestConfig) {
				var queue = this.requestQueue();
				queue.push(requestConfig);
				saveQueue(queue);
			},
			'popRequest': function() {
				var queue = this.requestQueue();
				queue.shift();
				saveQueue(queue);
			},
			'isQueueEmpty': function() {
				return this.requestQueue().length === 0;
			},
			'requestsToProcess': function(url) {
				var count = 0,
					queue = this.requestQueue();

				for(var i = 0; i < queue.length; i++) {
					if (queue[i].url.indexOf(url) != -1) {
						count++;
					}
				}
				return count;
			},
			'requestQueue': function() {
				return JSON.parse(window.localStorage.getItem('virustracker.offline.queue'));
			},
			'isProcessing': false
		};
	}).

	factory('offline', function ($rootScope, api, $q, offlineState, appConfig) {
		var service = {
			'onOnline': function() {
				if (offlineState.requestQueue().length > 0 && !offlineState.isProcessing) {
					var deferred = $q.defer();

					$rootScope.$broadcast('virustracker.online', deferred.promise);

					deferred.notify("Checking for offline activity...");
					offlineState.isProcessing = true;
					processNextRequest(deferred, processingStatus());
				} else {
					$rootScope.$broadcast('virustracker.online');
				}
			},
			'onOffline': function() {
				$rootScope.$broadcast('virustracker.offline');
			}
		};

		function processNextRequest(deferred, status) {
			var queue = offlineState.requestQueue();
			if (queue.length === 0) {
				offlineState.isProcessing = false;
				status.message = 'Done';
				deferred.resolve(status);
				return;
			}

			deferred.notify(status);

			var config = queue[0];

			// Reconstruct request, this is necessary because of the
			// timestamp and token associated with the requests.
			var url = config.url;
			if (api.isProtectedUrl(url)) {
				url = api.protectedApi(url.substr(0, url.indexOf("?")));
			}

			api.ajaxCall(config.method, url, config.data, false).success(
				function(data, statusCode, headers, config) {
					status.processing += 1;
					status.successful += 1;
					offlineState.popRequest();
					processNextRequest(deferred, status);
				}
			).error(
				function(data, statusCode, headers, config) {
					if (!offlineState.isOffline() && statusCode !== null &&
							statusCode !== 0 && statusCode !== 503) {
						status.errors.push(data);
						status.processing++;

						// Bad request, so we just remove it and act like it never happened.
						offlineState.popRequest();
						processNextRequest(deferred, status);
					} else {
						status.message = 'Update aborted, connection may have been lost or server is not responding.';
						deferred.reject(status);
					}
				}
			);
		}

		function processingStatus() {
			return {
				'message': 'Processing',
				'total': offlineState.requestQueue().length,
				'processing': 1,
				'successful': 0,
				'errors': []
			};
		}

		return service;
	});

}());


(function() {
	'use strict';

	angular.module('virusTracker.services.messages', [
		'virusTracker.services.api',
		'virusTracker.services.general',
		'virusTracker.services.user',
		'virusTracker.services.game',
		'virusTracker.services.offline',
		'virusTracker.config.app'
	]).factory('messages', function ($rootScope, api, general, user, $http, $q, game, offlineState, appConfig) {
		return {
			updateMessages: function (mutationId, typeCd, message, user) {
				var promises = [];
				message = message || {};
				var messageService = this;
				var messagesPool = this.messagesPool();
				var alertUser = false;
				var currMutationId;
				var currBandId = parseInt(window.localStorage.getItem('virustracker.user.dammBandId'));

				function notifSuccess(result) {
					//if no data was found for the bandId, type and mutationId, then a 404 will be returned, so just skip and move on
					if (result.status == 200) {
						//TODO: really need to call addMessage as a promise-returning function
						// different notificationForBandId api calls will be returning at different times
						// and the addMessage could potentially not finish up until after all the api calls are complete
						// the .all below ensures that all of the api calls have completed, but not that all of the
						// addMessge calls have completed. This would result in only a partial update of the messagePool JSON
						// being written to localStorage.
						//Highly unlikely to be a problem, but not impossible
						messageService.addMessage(result, messagesPool, currMutationId);
					}
				}

				function notifError(error) {
					console.log("error of notifForBand: " + JSON.stringify(error));
				}

				//get the current mutationId
				general.currentMutationId(window.localStorage.getItem('virustracker.user.gameId')).then(
					function(currMutIdResult) {
						var currMutationId = currMutIdResult.data;

						//ignore prior-mutation messages (but take any w/o a mutationId)
						if (!mutationId || mutationId >= currMutationId) {
							//for each bandId in the messagePool, check to see if there is a message for that participant associated with this notif
							for (var idxBandId in messagesPool) {
								if (messagesPool.hasOwnProperty(idxBandId)) {
									//attempt to pull participant notification for the bandId from the pool
									promises[promises.length] = api.notificationForBandId(mutationId, typeCd, idxBandId).then(
										notifSuccess,
										notifError
									);

									if (idxBandId == currBandId) {
										alertUser = true;
									}

									messagesPool[idxBandId].size = Object.keys(messagesPool[idxBandId].messages).length;
								}
							}

							$q.all(promises).then(
								function(result) {
									//save the messagesPool back to localStorage
									window.localStorage.setItem('virustracker.messages', JSON.stringify(messagesPool));

									//if the currently-logged-in user received any messages, broadcast the update
									if (alertUser) {
										messagesPool[currBandId].size = 0;
										messagesPool[currBandId].size = Object.keys(messagesPool[currBandId].messages).length;

										$rootScope.$broadcast('virustracker.messages.update', messagesPool[currBandId].size);
									}
								}, function(error) {
									console.log("$q.all error callback: " + JSON.stringify(error));
								}
							);
						}
					}
				);
			},

			//TODO: this really needs to be a deferred/promise arrangement, as it is called in a multi-threaded manner from promise handlers for calls
			// to the REST service. It is highly unlikely that direct manipulation of the array would take longer than getting a REST response,
			// but if it were to happen, then the calling function might lose some data
			// it is unlikely that direct manip
			addMessage: function (data, messagesPool, currMutationId) {
				var message = data.data.notification;
				var dammBandId = data.callData.dammBandId;

				if (message.mutationId) {

					//only add current/future mutId messages - ignore past ones. (just in case things get out of order/whack in the platform notifs process)
					if (message.mutationId >= currMutationId) {
						var delMessage = false;
						for (var x in messagesPool[dammBandId].messages) {
							//double check that this isn't a repeat of something already in the list
							if (messagesPool[dammBandId].messages[x].notificationId != message.notificationId) {

								//remove anything (w/ a mutationId) prior to the current mutationId
								//sc should also remove ma of same mutation
								//cc should remove all proir mutation messages

								//breaking this up into individual conditionals for the sake of clarity
								//if the pool message has a muationId
								if (messagesPool[dammBandId].messages[x].mutationId) {
									//if it is from a previous mutationId
									if (messagesPool[dammBandId].messages[x].mutationId <= currMutationId) {
										delMessage = true;
									//or if this message is an 'ma' or 'sc', and the pool message is 'ma' or 'sc'
									} else if ((message.type == 'ma' || message.type == 'sc') && (messagesPool[dammBandId].messages[x].type == 'ma' || messagesPool[dammBandId].messages[x].type == 'sc')) {
										delMessage = true;
									}
								}

								if (delMessage) {
									delete messagesPool[dammBandId].messages[x];
								}

							}
						}

						messagesPool[dammBandId].messages[message.notificationId] = message;
						messagesPool[dammBandId].size = Object.keys(messagesPool[dammBandId].messages).length;

						//alert the current user if this is a state change
						if (dammBandId === parseInt(window.localStorage.getItem('virustracker.user.dammBandId')) && (message.type == 'sc' || message.type == 'ir')) {
							api.participantState().then(function(result) {
								user.state = result.data.state;
								user.mutation = result.data.mutation;
							});
						}

						//start the doomsday clock if this is an 'ma'
						if (message.type == 'ma') {
							$rootScope.$broadcast('virustracker.startDoomsday');
						}
					}

				} else {
					messagesPool[dammBandId].messages[message.notificationId] = message;
					messagesPool[dammBandId].size = Object.keys(messagesPool[dammBandId].messages).length;
				}

			},
			removeMessage: function (messageId) {
				var messagesPool = this.messagesPool();
				var dammBandId = window.localStorage.getItem('virustracker.user.dammBandId');

				if (messagesPool[dammBandId].messages[messageId]) {
					delete messagesPool[dammBandId].messages[messageId];

					messagesPool[dammBandId].size = Object.keys(messagesPool[dammBandId].messages).length;
					window.localStorage.setItem('virustracker.messages', JSON.stringify(messagesPool));
				}
			},
			/*
				this is intended only for controllers/views that are reading/displaying messages, NOT for manipulation of messages.
				For manipulation of messages (ie, to be written back to localStorage), use the messagesPool function below, and work
				on the specific user's set of messages
			*/
			messages: function () {
				var pool = this.messagesPool();
				return pool[window.localStorage.getItem('virustracker.user.dammBandId')] || JSON.parse('{ "size": 0, "messages":{} }');
			},
			messagesPool: function () {
				var messagesPool = window.localStorage.getItem('virustracker.messages') || '{}';
				return JSON.parse(messagesPool);
			},
			count: function () {
				return this.messages().size;
			},

			// TODO Move LocalStorage access to function to handle concurrency.

			// ----
			// TODO Need to revisit this whole service. Implementing new functions
			// rather than trying to make sense of what is hapening above.
			// This is to support offline mode and no Push Notifications.

			updatedCount: function() {
				return this.validateMessages().count;
			},

			validateMessages: function() {
				var pool = this.messagesPool();
				var messages = {size: 0, messages: {} };
				for (var key in pool[user.dammBandId].messages) {
					if (pool[user.dammBandId].messages.hasOwnProperty(key)) {
						var message = pool[user.dammBandId].messages[key];
						if (key === 'ma' && message.mutation && moment(message.mutation.startUnix).isAfter()) {
							// Mutation Annoucement message exists and the mutation has not started.
							messages.messages[key] = message;
						} else if (key === 'sc' && !(user.isInoculated() && user.mutation &&
								(user.mutation.id === message.mutation.id ||
								user.mutation.startUnix > message.mutation.startUnix))) {
							// State Change message exists and the user is not innoculated
							// against this mutation or a later mutation, so it is still valid.
							messages.messages[key] = message;
						}
					}
				}
				messages.size = Object.keys(messages.messages).length;

				pool[user.dammBandId] = messages;
				window.localStorage.setItem('virustracker.messages', JSON.stringify(pool));
				return messages;
			},

			mutationAnnouncedMessage: function(mutation) {
				if (window.localStorage.getItem('virustracker.messages.ma.last') === mutation.name) {
					return; // This mutation already has/had an announced message.
				}

				window.localStorage.setItem('virustracker.messages.ma.last', mutation.name);

				var message = {
					type: 'ma',
					mutation: mutation,
					time: Date.now(),
					notificationTime: moment().format(appConfig.DATE_FORMAT),
					action: 'Check It!'
				};

				message.message = 'A new mutation has emerged!';
				message.details = 'The ' + mutation.name +
					' mutation is forecast to reach full prevalence by ' +
					moment(mutation.startUnix).format(appConfig.DATE_FORMAT) + '. ';

				if (user.isInoculated()) {
					message.details += 'Be sure to get vaccinated before this time, or you will be turned back into a Zombie!';
				} else {
					message.details += 'Be sure to get vaccinated to help fight this mutation.';
				}

				// determine if a question should be offered:
				// by game config param and user's state for this mutation.
				if (!(user.isInoculated() && user.mutation && user.mutation.id == mutation.id) &&
						game.vaccineOnMutationAnnouncment()) {
					message.quizQuestion = game.randomQuestion(user.dammBandId);
				}

				// Add message to pool.
				this._saveMessage(message);
			},

			mutationStartedMessage: function(mutation) {
				// If the user is innoculated with the new mutation or
				// the next mutation then there's nothing to do.
				if (user.isInoculated() && user.mutation &&
					(user.mutation.id == mutation.id ||
						user.mutation.startUnix > mutation.startUnix)) {
					return;
				}

				if (window.localStorage.getItem('virustracker.messages.sc.last') === mutation.name) {
					return; // This mutation already has/had a message.
				}

				window.localStorage.setItem('virustracker.messages.sc.last', mutation.name);

				var message = {
					type: 'sc',
					mutation: mutation,
					time: Date.now(),
					notificationTime: moment().format(appConfig.DATE_FORMAT),
					action: 'Dismiss'
				};

				// If the user is offline and has some interactions
				// then adjust message to indicate the state is unknown.
				if (offlineState.requestQueue().length > 0) {
					message.message = 'Mutation is Fully Prevalent!';
					message.details = 'You have been active while offline. Your current state is unknown. Find a network connection to get an update.';
				} else {
					// Otherwise, Assume they are now a zombie (with the new mutation).
					message.message = 'You are a Zombie!';
					message.details = 'The new mutation, ' + mutation.name + ', has reached full prevalence. You did not find the latest vaccine in time, and have been infected with the new mutation.';

					user.state = {
						'cd': 'v',
						'name': 'infected',
						'descr': ''
					};
					user.mutation = mutation;
				}

				// What data is needed here?
				this._saveMessage(message);
			},

			_saveMessage: function(message) {
				var pool = this.messagesPool();
				if (pool[user.dammBandId].messages[message.type] && pool[user.dammBandId].messages[message.type].mutation.id === message.mutation.id) {
					// Do not overwrite existing message for the mutation.
					return;
				}
				pool[user.dammBandId].messages[message.type] = message;
				pool[user.dammBandId].size = Object.keys(pool[user.dammBandId].messages).length;
				window.localStorage.setItem('virustracker.messages', JSON.stringify(pool));

				$rootScope.$broadcast('virustracker.messages.update', pool[user.dammBandId].size);
			}

		};
	});

}());


(function() {
	'use strict';

	/**
	 * Http Interceptor Service
	 *
	 * Intercept all Http Responses
	 */
	var module = angular.module('virusTracker.services.httpInterceptor', [
		'virusTracker.config.app',
		'virusTracker.services.offline'
	]).factory('offlineHttpInterceptor',function ($q, $location, appConfig, offlineState) {

		function queueRequest(config) {
			if (config && config[appConfig.QUEUEABLE_REQUEST]) {
				offlineState.queueRequest(config);
				return true;
			}
			return false;
		}

		return {
			'request': function(config) {
				// Add timestamp to config for sorting if necessary.
				config.time = Date.now();

				// If the request is queueable and we're currently offline
				// queue the request and return a rejected promise.
				if ((offlineState.isOffline() || offlineState.isProcessing) && queueRequest(config)) {
					return $q.reject(appConfig.HTTP_REQUEST_QUEUED);
				}

				return config;
			},

			'response': function(response) {
				function queueRequestFromResponse(response) {
					// If response or status is null then the request timed out.
					// So we treat that as the server is down or not responding.
					// In which case the request should be queued if necessary.
					if (response !== null && (response.status === null ||
							response.status === 0 || response.status === 503)) {
						return queueRequest(response.config);
					}
					return false;
				}

				return $q.when(response).then(
					function (response) {
						if (response === appConfig.HTTP_REQUEST_QUEUED) {
							return $q.reject(response);
						} else if (queueRequestFromResponse(response)) {
							return $q.reject(appConfig.HTTP_REQUEST_QUEUED);
						} else if (response === null || response.status === null ||
								response.status === 0 || response.status >= 400) {
							return $q.reject(response);
						}

						// At this point let's assume we got an acceptable response
						// from our server (that is if it was actually a request to
						// the server). Send all saved REST calls to the server
						// while we have the chance.
						if (response.config && response.config.url.indexOf(appConfig.API_BASE_URL) === 0) {
							document.dispatchEvent(new CustomEvent('online'));
						}

						return response;
					},
					function (response) {
						if (queueRequestFromResponse(response)) {
							return $q.reject(appConfig.HTTP_REQUEST_QUEUED);
						} else {
							return $q.reject(response);
						}
					}
				);
			}
		};

	}).config(function ($httpProvider) {
		$httpProvider.interceptors.push('offlineHttpInterceptor');
	});

}());

















