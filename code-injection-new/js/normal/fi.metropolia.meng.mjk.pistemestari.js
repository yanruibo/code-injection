









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


(function (MyApp, $, undefined) {

	// Using strict mode to throw exceptions for 'unsafe' actions and coding patterns
	'use strict';
	
	//console.log('app');

	// Initializes app
	// Binds event handlers to pages, buttons, list items etc.
	// Checks for unfinished game
	function init() {
		//console.log('init');

		// Hide the splashscreen
		navigator.splashscreen.hide();

		// If trim() is not supported on the browser add the support
		if (!String.prototype.trim) {
			//console.log('Trim() not supported on this browser!');
			String.prototype.trim = function () {
				return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			};
		}

		// Capitalize words
		if (!String.prototype.capitalize) {
			//console.log('capitalize() not supported on this browser!');
			String.prototype.capitalize = function() {
				return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
			};		
		}

		// If filter() is not supported on the browser add the support
		if (!Array.prototype.filter) {
			alert('filter() not supported on this browser!');
			Array.prototype.filter = function(fun) {
				var i, t, len, val, res;

				if (this == null) {
					throw new TypeError();
				}

				t		= Object(this);
				len		= t.length >>> 0;

				if (typeof fun !== "function") {
					throw new TypeError();
				}

				res		= [];

				for (i = 0; i < len; i += 1) {
					if (i in t) {
						val		= t[i]; // in case fun mutates this
						if (fun.call(val, i, t)) {
							res.push(val);
						}
					}
				}

				return res;
			};
		}

		// THIS IS FOR DEBUG ONLY
		Array.prototype.printAllNames = function () {
			var txt	= '',
				i;
			
			for (i = 0 ; i < this.length ; i += 1) {
					txt += this[i].name + ' ' + this[i].score + ', ';
			}
			return txt;
		};

		// Prevents Android from crashing when trying to JSON.parse(null)
		JSON.originalParse = JSON.parse;

		JSON.parse = function( text ){
			if ( text ) {
				return JSON.originalParse( text );
			}
			// no longer crashing on null value but just returning null
			return null;
		};


		/*
		window.localStorage.clear();
		var newPlayers	= [];
		newPlayers.push({name: 'jussi vares', totalScore: 11, won: 2, lost: 4});
		newPlayers.push({name: 'timo tapani', totalScore: 26, won: 2, lost: 1});
		newPlayers.push({name: 'hannele lauri', totalScore: 10, won: 0, lost: 2});
		newPlayers.push({name: 'alpo rusi', totalScore: 133, won: 33, lost: 28});
		newPlayers.push({name: 'anselmiina kuoppamäki', totalScore: 22, won: 2, lost: 2});
		newPlayers.push({name: 'juan pablo escobar', totalScore: 88, won: 6, lost: 0});
		newPlayers.push({name: 'xávier fernandez', totalScore: 2, won: 2, lost: 2});
		newPlayers.push({name: 'friedrich shüller', totalScore: 8, won: 2, lost: 2});
		newPlayers.push({name: 'iivari kiiski', totalScore: 27, won: 3, lost: 1});
		newPlayers.push({name: 'ronald mcdonald', totalScore: 51, won: 0, lost: 1});
		newPlayers.push({name: 'guy gerbert', totalScore: 23, won: 2, lost: 4});
		newPlayers.push({name: 'anna-liisa seppälä', totalScore: 21, won: 1, lost: 3});
		MyApp.utils.addItem('players', newPlayers);
		*/

		// Get and set the language object
		MyApp.utils.setLanguageObject();
		MyApp.dom.updateButtonLabels();
		MyApp.dom.updatePageHeaders();
		MyApp.dom.showLogo();

		// Initialize DOM related
		MyApp.dom.init();

		// Use fastclick javascript library to get rid of the 300 ms delay on default click event
		new FastClick(document.body);

		//MyApp.utils.checkConnection();
	}

	// Utilities to access storage
	MyApp.utils = {

		// Checks the network connection
		// ALERT MOVED TO STOP WATCH INITIALIZING FUNCTION!
		checkConnection: function () {
			//console.log('MyApp.utils.checkConnection()');
			var networkState = navigator.connection.type;

			var states = {};
			states[Connection.UNKNOWN]  = 'Unknown connection';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI]     = 'WiFi connection';
			states[Connection.CELL_2G]  = 'Cell 2G connection';
			states[Connection.CELL_3G]  = 'Cell 3G connection';
			states[Connection.CELL_4G]  = 'Cell 4G connection';
			states[Connection.NONE]     = 'No network connection';

			//console.log(states[networkState]);

			if (states[networkState] !== 'Unknown connection' && states[networkState] !== 'No network connection') {
				alert('For stopwatch to function properly please ensure that airplane mode is enabled and auto-lock is set over 5 minutes.');
			}
		},

		// Gets the language setting from the storage, or English as default, and
		// gets the corresponding language object and sets it as MyApp.lang object
		setLanguageObject: function () {
			//console.log('MyApp.utils.setLanguageObject');

			window.localizable.getDefaultLocale( function( result ) {
				if ( result != null && result.length > 0 ) {
					// Finnish
					if ( result.toLowerCase().indexOf( 'fi' ) !== -1 ) {
						MyApp.lang = MyApp.language.fi;
					} else {
						MyApp.lang = MyApp.language.en;
					}
				}
			});
		},

		// Adds players into the storage by first getting them from the storage
		// then concatenates new players to that already existing array.
		// @param players (array)		- array of player objects to add
		addPlayers: function (players) {
			//console.log('MyApp.utils.addPlayers()');
			//console.log(players);
			var playersStored	= JSON.parse(window.localStorage.getItem('players')) || [];

			try {
				playersStored	= playersStored.concat(players);
				window.localStorage.setItem('players', JSON.stringify(playersStored));
				//console.log('Players added');
			} catch (e) {
				//console.log('ERROR WHILE ADDING PLAYERS TO THE STORAGE: ' + e);
			}
		},

		// Adds a key-value-pair into the storage
		addItem: function (key, item) {
			//console.log('MyApp.utils.addItem(' + key + ', ' + item + ')');
			if (key === 'players'  && item.length > 0) {
				// Insert the stringified items array into the storage
				window.localStorage.setItem(key, JSON.stringify(item));
				//console.log('Item: ' + item + ' set into local storage');
			} else if (key !== 'players') {
				// Insert the item into the storage
				window.localStorage.setItem(key, item);
				//console.log('Item: ' + item + ' set into local storage');
			}
		},

		// Deletes an item in the storage
		deleteItem: function (key) {
			try {
				window.localStorage.removeItem(key);
				//console.log('succesfully deleted an item with a key: ' + key);
			} catch (e) {
				//console.log('error: ' + e + ' while deleting item with a key: ' + key);
			}
		},


		// Gets and returns an array of objects from the storage, or false if not found
		// @param key (string)		- the key of the objects are stored as
		getItem: function (key) {
			// Items from the storage
			//console.log('MyApp.utils.getItem(' + key + ')');
			var items		= JSON.parse(window.localStorage.getItem(key));
			//console.log('MyApp.utils.getItem(' + key + ') successful');

			return items || false;
		},

		// Checks if the value already exists in the storage and either
		// returns 'true' or 'false' if it does not exist
		isStored: function (items, key, value) {
			//console.log('MyApp.utils.isStored(' + key + ', ' + value + ')');

			var len		= items.length,
				i;

			// Check if the player already exists
			if (key === 'name') {
				//console.log(items);
				for (i = 0; i < len; i += 1) {
					// Return true if a match is found
					if (value.toLowerCase() === items[i].name.toLowerCase()) {
						//console.log(value + ' === ' + items[i].name);
						//console.log('value already exists');
						return true;
					}

					//console.log(value + ' !== ' + items[i].name);
				}
			}

			return false;
		},

		// Validates the name to allow:
		// - only to start with an alphabet
		// - only to end with an alphabet
		// - only to have one consecutive hyphen
		// - only to have one consecutive space
		// Returns true if valid, false otherwise.
		isNameValid: function (name) {

			// Create RegEx pattern - only alphabets from 'a' to 'z', international characters and hyphen
			var validRegExPattern	= /[a-zàáâèéêëìíïòóôœùúüÿåäö\- ]/i;

			// Test the name against the regex pattern
			if (!validRegExPattern.test(name)) {
				alert('Not a valid name: ' + name);
				return false;
			}

			// Create RegEx pattern - the first letter must be from 'a' to 'z' or an international character
			validRegExPattern		= /^[a-zàáâèéêëìíïòóôœùúüÿåäö]/i;

			// Test the name against the regex pattern
			if (!validRegExPattern.test(name)) {
				alert('Not a valid first character: ' + name);
				return false;
			}

			// Create RegEx pattern - the last letter must be from 'a' to 'z' or an international character
			validRegExPattern		= /[a-zàáâèéêëìíïòóôœùúüÿåäö]$/i;

			// Test the name against the regex pattern
			if (!validRegExPattern.test(name)) {
				alert('Not a valid last character: ' + name);
				return false;
			}

			// Create RegEx pattern - must have only one consecutive hyphen
			validRegExPattern		= /(\-\-)/i;

			// Test the name against the regex pattern
			if (validRegExPattern.test(name)) {
				alert('Too many consecutive hyphens: ' + name);
				return false;
			}

			// Create RegEx pattern - must have only one consecutive space
			validRegExPattern		= /(\s{2,})/i;

			// Test the name against the regex pattern
			if (validRegExPattern.test(name)) {
				alert('Too many consecutive spaces: ' + name);
				return false;
			}
			
			return true;
		},

		// Validates the input character only to allow alphabets, hyphen and comma
		isCharacterAllowed: function (event) {

			// Catch the character's keycode
			var keycode				= event.keyCode || event.which,

			// Create RegEx pattern - from 'a' to 'z', international characters, hyphen, comma and space
				validRegExPattern	= /[a-zàáâèéêëìíïòóôœùúüÿåäö\-, ]/i;

			// Convert unicode keycode to string
			keycode					= String.fromCharCode(keycode);

			//console.log(validRegExPattern.test(keycode));

			// Test the character against the regex pattern
			if (!validRegExPattern.test(keycode)) {
				navigator.notification.alert(
					MyApp.lang.alertInvalidMessage,		// Message
					null,								// Callback
					MyApp.lang.alertInvalidTitle		// Title
				);

				// Prevent default event being triggered
				event.preventDefault();
			}
		},

		// Parses the players' names.
		// Returns an array of sorted and trimmed names, or false if the names are not valid
		parseNames: function (namesString) {
			//console.log('parseNames(' + namesString + ')');

			// The trimmed value of the text input element
			var namesArray		= namesString.split(','),
			// The array of sorted and trimmed names that is returned
				sortedArray		= [],
			// Trimmed name
				trimmedName,
			// The boolean to check if all the names are valid
				areNamesValid	= false;

			// If the input value is empty return false
			if (!namesArray.length) {
				//console.log('Input value empty');
				return false;
			}

			//console.log('namesArray length: ' + namesArray.length);

			// Trim each of the names in the array
			$.each(namesArray, function (index, name) {
				trimmedName	= name.trim();

				if (trimmedName.length > 0) {
					//console.log('parseNames: ' + trimmedName);
					// If the name is valid set flag to 'true', otherwise set it to 'false' and exit the loop early
					if (MyApp.utils.isNameValid(trimmedName)) {
						areNamesValid = true;
					} else {
						areNamesValid = false;
						return false;
					}

					// Push the trimmed name to the array
					sortedArray.push(trimmedName);
				}
			});

			// If not all names are valid nullify the array and return false
			if (!areNamesValid) {
				sortedArray		= null;
				return false;
			}

			// Return the sorted array
			return sortedArray.sort();
		},

		// Gets all possible combinations of 'k' objects from a set of 'items'
		getAllCombinations: function (items, k) {
			var i, j, combs, head, tailcombs;

			if (k > items.length || k <= 0) {
				return [];
			}

			if (k === items.length) {
				return [items];
			}

			if (k === 1) {
				combs = [];
				for (i = 0; i < items.length; i += 1) {
					combs.push([items[i]]);
				}
				return combs;
			}

			combs = [];
			for (i = 0; i < items.length - k + 1; i += 1) {
				head = items.slice(i, i + 1);
				tailcombs = MyApp.utils.getAllCombinations(items.slice(i + 1), k - 1);
				for (j = 0; j < tailcombs.length; j += 1) {
					combs.push(head.concat(tailcombs[j]));
				}
			}
			return combs;
		},

		// Checks for matching name in two arrays.
		// To be used with filter method. The second array is passed as context
		// and used as 'this' inside the function.
		filterByName: function (element, index, array) {
			var i, len;

			for (i = 0, len = this.length; i < len; i += 1) {
				if (element.name === this[i].name) {
					return false;
				}
			}
			return true;
		},

		// Compares the 'name' property
		// To be used with sort function
		compareNames: function (a, b) {
			var nameA = a.name.toLowerCase(),
				nameB = b.name.toLowerCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		},

		// Compares the 'score' and 'name' property
		// To be used with sort function
		compareScores: function (a, b) {
			var scoreA	= parseInt(a.score, 10),
				scoreB	= parseInt(b.score, 10),
				nameA	= a.name.toLowerCase(),
				nameB	= b.name.toLowerCase();
			if (scoreA > scoreB) {
				return -1;
			}
			if (scoreA < scoreB) {
				return 1;
			}
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		},

		// Compares the 'score' and 'name' property
		// To be used with sort function
		compareFinalScores: function (a, b) {
			var scoreA	= parseInt(a.score, 10),
				scoreB	= parseInt(b.score, 10);
			if (scoreA > scoreB) {
				return -1;
			}
			if (scoreA < scoreB) {
				return 1;
			}
			return 0;
		},

		// Sort the array and finds unique players
		// Returns an array with unique player objects
		getUniqueSortedArray: function (array) {
			var unique, i;

			array.sort(MyApp.utils.compareNames);

			unique = [array[0]];
			for (i = 1; i < array.length; i += 1) {
				if (array[i-1].name.toLowerCase() !== array[i].name.toLowerCase()) {
					unique.push(array[i]);
				}
			}
			return unique;
		},

		shuffleArray: function (arr) {
			//console.log('MyApp.utils.shuffleArray()');

			var i			= arr.length,
				j, tempi, tempj;

			if (i === 0) {
				return false;
			}

			while (i) {
				i -= 1;
				j = Math.floor( Math.random() * ( i + 1 ) );
				tempi = arr[i];
				tempj = arr[j];
				arr[i] = tempj;
				arr[j] = tempi;
			}		
		}
	};

	// Manages DOM manipulation & binding event listeners
	MyApp.dom = {
		// Binds click event listeners and jQuery Mobile page event listeners 
		init: function () {
			//console.log('dom init()');
			
			// TODO:
			// Remove the event binding from addToList function loop and move it to here

			// Bind click event listener on anchor elements to go back
			$('.button-back, .button-cancel').on('click', MyApp.handlers.goBack);

			// Bind click event listener on anchor elements to go back to add players page from game page to add more player
			$('.button-settings').on('click', MyApp.handlers.addMorePlayers);

			// Bind click event listener on anchor elements to show rules
			$('.button-rules').on('click', MyApp.handlers.showRules);

			// Bind click event listener on anchor elements to add players to the storage or to the game
			$('#button-add-players').on('click', MyApp.players.addPlayers);

			// Bind click event listener on the anchor element to initialize new game
			$('#button-start-game').on('click', MyApp.handlers.initNewGame);

			// Bind click event listener on the anchor element to get next round
			$('#button-next-round').on('click', MyApp.handlers.initNewRound);

			// Bind click event listener on the anchor element to play the final
			$('#button-final-round').on('click', MyApp.handlers.initFinalRound);

			// Bind click event listener on the anchor element to quit current game
			$('.button-quit').on('click', MyApp.handlers.quitGame);

			// Bind click event listener on the anchor element to start the round
			$('#button-start-round').on('click', MyApp.handlers.startRound);

			// Bind click event listener on the anchor element to save the round
			$('#button-save-round').on('click', MyApp.handlers.saveRound);

			// Bind click event listener on the anchor element to save the round
			$('.button-bar, .button-bar2').on('vmousedown', MyApp.handlers.buttonPressed);

			// Bind click event listener on the anchor element to save the round
			$('div[data-role="page"]').on('vmouseup', MyApp.handlers.buttonReleased);

			// Bind click event listener on list item elements to toggle duration selection
			$('#list-game-round-duration, #list-game-round-duration-2, #list-game-final-duration').on('click', '.duration', MyApp.handlers.toggleDuration);

			// Bind click event listener on list item elements to toggle player selection
			$('#list-game-pick-players').on('click', '.list-item-pick-player', MyApp.handlers.togglePlayer);

			// Bind click event listener on list item elements to toggle team selection
			$('#list-round-won').on('click', '.list-item', MyApp.handlers.toggleTeam);

			// Bind click event listener on list item elements to toggle goal difference selection
			$('#list-round-goal-difference').on('click', '.list-item', MyApp.handlers.toggleGoalDifference);

			// Bind click event listener on list item elements to toggle game mode selection
			$('#list-final-game-mode').on('click', '.game-mode', MyApp.handlers.toggleGameMode);

			// Bind click event listener on buttons to delete a player
			$('#page-game-settings, #page-players, #page-add-players').on('click', '.button-delete', MyApp.handlers.deletePlayer);

			// Bind click event listener on buttons to save players
			$('#page-add-players').on('click', '.button-save', MyApp.handlers.savePlayers);

			// Bind click event listener on buttons to save players
			$('#page-add-players').on('click', '.button-add-players', MyApp.handlers.addTmpPlayers);

			// Bind keypress event listener on text input elements to validate the character
			$('.input-add-players').on('keypress', MyApp.utils.isCharacterAllowed);

			// Bind page before create event listener on game page to start new game
			$('#page-game').on('pagebeforeshow', MyApp.handlers.initGamePage);

			// Bind page before show event listener on game settings page to initialize the page
			$('#page-game-settings').on('pagebeforeshow', MyApp.handlers.initGameSettingsPage);

			// Bind page before show event listener on add players page to initialize the page
			$('#page-add-players').on('pagebeforeshow', MyApp.handlers.initAddPlayersPage);

			// Bind page before create event listener on players page to initialize the page
			$('#page-players').on('pagebeforeshow', MyApp.handlers.initPlayersPage);

			// Bind page before show event listener on round end page to initialize the page
			$('#page-round-end').on('pagebeforeshow', MyApp.handlers.initRoundEndPage);

			// Bind page before show event listener on standings page to initialize the page
			$('#page-standings').on('pagebeforeshow', MyApp.handlers.initStandingsPage);

			// Bind page before show event listener on stopwatch page to initialize the page
			$('#page-game-stopwatch').on('pagebeforeshow', MyApp.handlers.initStopwatchPage);

			// Bind page show event listener on stopwatch page to vertically center the stopwatch
			$('#page-game-stopwatch').on('pageshow', MyApp.stopwatch.centerVertically );

			// Bind page before hide event listener on stopwatch page to stop the stopwatch running
			$('#page-game-stopwatch').on('pagebeforehide', MyApp.stopwatch.pauseTimer);

			// Bind page before create event listener on rules & instruction page
			$('#page-rules').on('pagebeforecreate', MyApp.handlers.initRulesPage);

			// Bind button click event on rules & instructions headers to toggle content
			$('#page-rules').on('click', '.page-rules-container h1',  MyApp.handlers.toggleRulesList);

			// Bind button click event on rules & instructions footer buttons to dynamically change content
			$('#page-rules').on('click', '.button-show-rules, .button-show-instructions',  MyApp.handlers.toggleRulesContent);

			// Bind button click event on rules & instructions footer buttons to dynamically change content
			$('#page-rules').on('click', '.external-link',  MyApp.handlers.loadUrl);

			// Bind page before show event listener on standings page to initialize the page
			//$('#page-dashboard').on('pageshow', MyApp.dom.resizePageContent);

			// Bind page before show event listener on standings page to initialize the page
			//$('#page-dashboard').on('pageshow', MyApp.dom.resizePageContent);

			MyApp.dom.resizePageContent();
			//MyApp.dom.showLogo();
			
			// STOPWATCH BINDINGS
			// Bind click events on buttons
			$('#startStopwatch').on('click', MyApp.stopwatch.startTimer);
			$('#pauseStopwatch').on('click', MyApp.stopwatch.pauseTimer);
			$('#resetStopwatch').on('click', MyApp.stopwatch.resetTimer);
			$('#quitStopwatch').on('click', MyApp.stopwatch.quitTimer);
			
			// Dashboard buttons
			$('#button-players').on('click', function() {$.mobile.changePage('#page-players');});
			$('#button-new-game').on('click', function() {$.mobile.changePage('#page-game-settings');});
			$('#button-rules').on('click', function() {$.mobile.changePage('#page-rules');});

			// TODO:
			// Add pagebeforeshow event on players page to hide/show the list of players depending
			// whether any players exists on the storage

		},

		// Updates the button labels to match localized strings
		updateButtonLabels: function () {
			//console.log('MyApp.dom.updateButtonLabels()');

			$('#button-start-game').find('span')[0].textContent		= MyApp.lang.buttonStartGame;
			$('#button-next-round').find('span')[0].textContent		= MyApp.lang.buttonNextRound;
			$('#button-final-round').find('span')[0].textContent	= MyApp.lang.buttonFinalRound;
			$('#button-save-round').find('span')[0].textContent		= MyApp.lang.buttonSave;
			$('#button-start-round').find('span')[0].textContent	= MyApp.lang.buttonStartRound;
			$('.button-quit').find('span').text(MyApp.lang.buttonQuit); // Two buttons
			$('.button-cancel').find('span')[0].textContent			= MyApp.lang.buttonCancel;
			$('.button-save').find('span')[0].textContent			= MyApp.lang.buttonSave;
			$('#resetStopwatch').find('span')[1].textContent		= MyApp.lang.buttonReset;
			$('#pauseStopwatch').find('span')[1].textContent		= MyApp.lang.buttonPause;
			$('#startStopwatch').find('span')[1].textContent		= MyApp.lang.buttonPlay;
			$('#quitStopwatch').find('span')[1].textContent			= MyApp.lang.buttonSkip;
			$('.button-show-rules').find('span')[0].textContent					= MyApp.lang.buttonRulesFooter;
			$('.button-show-instructions').find('span')[0].textContent			= MyApp.lang.buttonInstructionsFooter;

			// Dashboard buttons
			$('#button-players').find('a')[0].textContent			= MyApp.lang.buttonPlayers;
			$('#button-new-game').find('a')[0].textContent			= MyApp.lang.buttonNewGame;
			$('#button-rules').find('a')[0].textContent				= MyApp.lang.buttonRules;
		},

		// Updates the page headers to match localized strings
		updatePageHeaders: function () {
			//console.log('MyApp.dom.updatePageHeaders()');

			$('#page-game-settings').find('[data-role="header"] h1')
				.text(MyApp.lang.headerSettings);

			$('#page-add-players').find('[data-role="header"] h1')
				.text(MyApp.lang.headerAddPlayers);

			$('#page-standings').find('[data-role="header"] h1')
				.text(MyApp.lang.headerStandings);

			$('#page-players').find('[data-role="header"] h1')
				.text(MyApp.lang.headerPlayers);

			$('#page-game-stopwatch').find('[data-role="header"] h1')
				.text(MyApp.lang.headerStopwatch);

			$('#page-rules').find('[data-role="header"] h1')
				.text(MyApp.lang.headerRules);

			$('#page-round-end').find('[data-role="header"] h1')
				.text(MyApp.lang.headerScoring);
		
		},

		// Resizes the dashboard page content area to fill up empty space, if any, and
		// shows the correct logo based on localization
		showLogo: function (event) {
			//console.log('MyApp.dom.showLogo()');
			
			var $logoElem		= $('#page-dashboard').find('.logo');

			// Check whether the language is finnish or english
			if (MyApp.lang.round === 'round' || MyApp.lang.round == null) {
				$logoElem.addClass('logo-en');
			} else {
				$logoElem.addClass('logo-fi');
			
			}
			//console.log($logoElem.hasClass('logo'));
			//console.log($logoElem.hasClass('logo-en'));
			//console.log($logoElem.hasClass('logo-fi'));
/*
			var content_height	= $.mobile.activePage.children('[data-role="content"]').outerHeight(true),
				header_height	= $.mobile.activePage.children('[data-role="header"]').outerHeight(true),
				footer_height	= $.mobile.activePage.children('[data-role="footer"]').outerHeight(true),
				window_height	= $('body').height();

			//console.log(content_height);
			//console.log(footer_height);
			//console.log(header_height);
			//console.log(window_height);
			//console.log($('body').height());

			if (content_height < (window_height - header_height - footer_height)) {
				$.mobile.activePage.css('min-height', (content_height + header_height + footer_height));
				$.mobile.activePage.children('[data-role="content"]').css('min-height', (window_height - header_height - footer_height));
				//console.log($.mobile.activePage.children('[data-role="content"]').outerHeight(true));
			}
			*/
			//event.stopImmediatePropagation();
		},

		// Resizes the page content are to fill up empty space, if any
		resizePageContent: function (event) {
			//console.log('MyApp.dom.resizePageContent()');
			var content_height	= $.mobile.activePage.children('[data-role="content"]').outerHeight(true) || 0,
				header_height	= $.mobile.activePage.children('[data-role="header"]').outerHeight(true) || 0,
				footer_height	= $.mobile.activePage.children('[data-role="footer"]').outerHeight(true) || 0,
				window_height	= $('body').height();

			//console.log(content_height);
			//console.log(footer_height);
			//console.log(header_height);
			//console.log(window_height);

			if (content_height < (window_height - header_height - footer_height)) {
				$.mobile.activePage.css('min-height', (content_height + header_height + footer_height));
				$.mobile.activePage.children('[data-role="content"]').css('min-height', (window_height - header_height - footer_height));
				$('#page-dashboard').find('.logo').css('min-height', (window_height - header_height - footer_height));
			}

			//event.stopImmediatePropagation();
		},

		// Empties a list with items.
		// Takes 2 parameters.
		// @param type (string)		- type of items to be removed, e.g. 'pick-players' or 'scores'
		// @param listId (string)	- id of the list to remove items from
		emptyList: function (type, listId) {
			//console.log('MyApp.dom.emptyList(' + type + ', ' + listId + ')');
			var elemsToRemove		= document.getElementById(listId).getElementsByClassName('list-item');

			// If elements are found remove list items
			if (elemsToRemove) {
				while (elemsToRemove[0]) {
					$(elemsToRemove[0]).remove();
				}
			}
		},

		// Adds items found in the array to the DOM list.
		// Takes 3 parameters.
		// @param type (string)		- type of players to be added, e.g. 'storage', 'game', 'pick-players', or 'scores'
		// @param items (array)		- array of items to be added
		// @param listId (string)	- id of the page of the list to add items to
		addToList: function (type, items, listId) {
			//console.log('MyApp.dom.addToList(' + type + ', items, ' + listId + ')');
			// List to add items to
			var list,
			// Length of the items array
				len					= items.length,
			// Is the length of pick players array odd
				isOdd				= false,//(type === 'pick-players' && len % 2),
			// Index of the array
				i,
				liFragment			= document.createDocumentFragment(),
				liElem,
				divElem,
				spanElem,
				aElem,
				liClass				= '',
				divClass			= '',
				spanClass			= '',
				spanSideClass		= '',
				aClass				= '',
				inputClass			= '',
				labelClass			= '',
				name,
				isNewPlayer			= false;

			// Assing class names for each elements depending on type
			if (type === 'storage') {
				liClass				= 'list-item list-item-player';
				divClass			= 'player-container';
				spanClass			= 'list-content players';
				aClass				= 'button list-button button-delete ss-delete';
				spanSideClass		= 'list-side ss-user';
			} else if (type === 'game') {
				liClass				= 'list-item list-item-player';

				divClass			= 'player-container';
				spanClass			= 'list-content players';
				aClass				= 'button list-button button-delete ss-delete';
				spanSideClass		= 'list-side ss-user';
			} else if (type === 'team' || type === 'standings' || type === 'resting') {
				liClass				= 'list-item list-item-player';

				divClass			= 'player-container';
				spanClass			= 'list-content players';
				spanSideClass		= 'list-side score';
			} else if (type === 'pick-players') {
				liClass				= 'list-item list-item-pick-player';
				inputClass			= 'input-pick-player';
				labelClass			= 'label-pick-player players';

				divClass			= 'player-container';
				spanClass			= 'list-content players';
				aClass				= 'button list-button button-delete';
				spanSideClass		= 'list-side ss-user';
			} else if (type === 'tmp') {
				liClass				= 'list-item list-item-player';

				divClass			= 'player-container';
				spanClass			= 'list-content players';
				aClass				= 'button list-button button-delete ss-delete';
				spanSideClass		= 'list-side ss-user';
			}

			list				= document.getElementById(listId);

			// Iterate over all players in the array and add them to htmlData as list items
			for (i = 0; i < len; i += 1) {
				name					= items[i].name;
				isNewPlayer				= items[i].newPlayer || false;

				liElem					= document.createElement('li');
				liElem.className		= liClass;
				liElem.setAttribute('data-name', name);

				// Create and append elements depending on type
				if (type === 'game' || type === 'storage') {

					aElem					= document.createElement('a');
					aElem.className			= aClass;
					aElem.textContent		= String.fromCharCode(160); // Non-breaking space
					aElem.name				= type;

					liElem.appendChild(aElem);

					spanElem				= document.createElement('span');
					spanElem.className		= spanSideClass;
					spanElem.textContent	= String.fromCharCode(160); // Non-breaking space

					liElem.appendChild(spanElem);

					divElem					= document.createElement('div');
					divElem.className		= divClass;

					liElem.appendChild(divElem);

					spanElem				= document.createElement('span');
					spanElem.className		= spanClass;
					spanElem.textContent	= name;

					divElem.appendChild(spanElem);

					if (isNewPlayer) {
						spanElem				= document.createElement('span');
						spanElem.className		= 'stats';
						spanElem.textContent	= MyApp.lang.contentNewPlayer;

						divElem.appendChild(spanElem);

					} else {
						spanElem				= document.createElement('span');
						spanElem.className		= 'stats';
						spanElem.textContent	= MyApp.lang.contentTimesWon + ': ' + items[i].won;

						divElem.appendChild(spanElem);

						spanElem				= document.createElement('span');
						spanElem.className		= 'stats';
						spanElem.textContent	= MyApp.lang.contentTimesLost + ': ' + items[i].lost;

						divElem.appendChild(spanElem);

						spanElem				= document.createElement('span');
						spanElem.className		= 'stats';
						spanElem.textContent	= MyApp.lang.contentPointsAlltime + ': ' + items[i].totalScore;

						divElem.appendChild(spanElem);

						liElem.appendChild(divElem);

					}

				} else if (type === 'storagesss') {

					aElem					= document.createElement('a');
					aElem.className			= aClass;
					aElem.textContent		= String.fromCharCode(160); // Non-breaking space
					aElem.name				= type;

					liElem.appendChild(aElem);
					spanElem				= document.createElement('span');
					spanElem.className		= spanSideClass;
					spanElem.textContent	= String.fromCharCode(160); // Non-breaking space

					liElem.appendChild(spanElem);

					divElem					= document.createElement('div');
					divElem.className		= divClass;

					liElem.appendChild(divElem);

					spanElem				= document.createElement('span');
					spanElem.className		= spanClass;
					spanElem.textContent	= name;

					divElem.appendChild(spanElem);

					spanElem				= document.createElement('span');
					spanElem.className		= 'stats';
					spanElem.textContent	= MyApp.lang.contentTimesWon + ': ' + items[i].won;

					divElem.appendChild(spanElem);

					spanElem				= document.createElement('span');
					spanElem.className		= 'stats';
					spanElem.textContent	= MyApp.lang.contentTimesLost + ': ' + items[i].lost;

					divElem.appendChild(spanElem);

					spanElem				= document.createElement('span');
					spanElem.className		= 'stats';
					spanElem.textContent	= MyApp.lang.contentPointsAlltime + ': ' + items[i].totalScore;

					divElem.appendChild(spanElem);
					liElem.appendChild(divElem);

				} else if (type === 'teamsss' || type === 'standingssss') {
					spanElem				= document.createElement('span');
					spanElem.className		= spanSideClass;
					spanElem.textContent	= items[i].score;

					liElem.appendChild(spanElem);

					spanElem				= document.createElement('span');
					spanElem.className		= spanClass;
					spanElem.textContent	= name;

					liElem.appendChild(spanElem);

				} else if (type === 'restingsss') {
					spanElem				= document.createElement('span');
					spanElem.className		= spanSideClass;
					spanElem.textContent	= items.score;

					liElem.appendChild(spanElem);

					spanElem				= document.createElement('span');
					spanElem.className		= spanClass;
					spanElem.textContent	= name;

					liElem.appendChild(spanElem);

				} else if (type === 'pick-players' || type === 'tmp' || type === 'team' || type === 'standings' || type === 'resting') {
					//liElem.textContent		= items[i].name;
					if (type === 'tmp') {
						aElem					= document.createElement('a');
						aElem.className			= aClass;
						aElem.textContent		= String.fromCharCode(160); // Non-breaking space
						aElem.name				= type;

						liElem.appendChild(aElem);

					}

					spanElem				= document.createElement('span');
					spanElem.className		= spanSideClass;
					if (type === 'pick-players' || type === 'tmp') {
						spanElem.textContent	= String.fromCharCode(160); // Non-breaking space
					
					} else {
						spanElem.textContent	= items[i].score;
					}

					liElem.appendChild(spanElem);

					divElem					= document.createElement('div');
					divElem.className		= divClass;

					liElem.appendChild(divElem);

					spanElem				= document.createElement('span');
					spanElem.className		= spanClass;
					spanElem.textContent	= name;

					divElem.appendChild(spanElem);

					if (isNewPlayer) {
						spanElem				= document.createElement('span');
						spanElem.className		= 'stats';
						spanElem.textContent	= MyApp.lang.contentNewPlayer;

						divElem.appendChild(spanElem);

					} else {
						spanElem				= document.createElement('span');
						spanElem.className		= 'stats';
						spanElem.textContent	= MyApp.lang.contentTimesWon + ': ' + items[i].won;

						divElem.appendChild(spanElem);

						spanElem				= document.createElement('span');
						spanElem.className		= 'stats';
						spanElem.textContent	= MyApp.lang.contentTimesLost + ': ' + items[i].lost;

						divElem.appendChild(spanElem);

						spanElem				= document.createElement('span');
						spanElem.className		= 'stats';
						spanElem.textContent	= MyApp.lang.contentPointsAlltime + ': ' + items[i].totalScore;

						divElem.appendChild(spanElem);

						liElem.appendChild(divElem);

					}

				} else if (type === 'tmp') {

					aElem					= document.createElement('a');
					aElem.className			= aClass;
					aElem.textContent		= String.fromCharCode(160); // Non-breaking space
					aElem.name				= type;

					liElem.appendChild(aElem);

					spanElem				= document.createElement('span');
					spanElem.className		= spanSideClass;
					spanElem.textContent	= String.fromCharCode(160); // Non-breaking space

					liElem.appendChild(spanElem);

					divElem					= document.createElement('div');
					divElem.className		= divClass;

					liElem.appendChild(divElem);

					spanElem				= document.createElement('span');
					spanElem.className		= spanClass;
					spanElem.textContent	= name;

					divElem.appendChild(spanElem);

					spanElem				= document.createElement('span');
					spanElem.className		= 'stats';
					spanElem.textContent	= MyApp.lang.contentNewPlayer;

					divElem.appendChild(spanElem);

					liElem.appendChild(divElem);

				}

				liFragment.appendChild(liElem);

			}

			// Add a dummy list item
			if (isOdd) {
				liElem					= document.createElement('li');
				liElem.className		= 'list-item list-item-dummy';
				liElem.textContent		= String.fromCharCode(160); // Non-breaking space

				liFragment.appendChild(liElem);
			}

			list.appendChild(liFragment);
		},

		// Updates the list header.
		// @param listID (string)		- id of the list
		// @param localStr (string)		- localized string to get
		// @param getLocalized (boolean)- boolean whether the localStr is already fetched or not
		updateListHeader: function (listID, localStr, getLocalized) {
			//console.log('MyApp.dom.updateListHeader()');

			var listHeader			= document.getElementById(listID).getElementsByClassName('list-title')[0].firstChild;

			listHeader.textContent	= getLocalized ? MyApp.lang[localStr] : localStr;
		},

		// Updates the list info.
		// @param listID (string)		- id of the list
		// @param localStr (string)		- localized string to get
		// @param getLocalized (boolean)- boolean whether to localize the localStr
		updateListInfo: function (listID, localStr, getLocalized) {
			//console.log('MyApp.dom.updateListHeader()');

			var listInfo	= document.getElementById(listID).getElementsByClassName('list-title')[0].firstChild.nextSibling,
				text,
				score		= 0,
				i;

			if (listID === 'list-game-players-team-a') {
				text		= MyApp.lang.infoTotal + ' ';

				for (i = 0; i < MyApp.game.teamA.players.length; i += 1) {
					score	+= MyApp.game.teamA.players[i].score;
				}
				text		+= score + ' ' + (score !== 1 ? MyApp.lang.infoPoints : MyApp.lang.infoPoint);

				listInfo.textContent	= text;

			} else if (listID === 'list-game-players-team-b') {
				text		= MyApp.lang.infoTotal + ' ';

				for (i = 0; i < MyApp.game.teamB.players.length; i += 1) {
					score	+= MyApp.game.teamB.players[i].score;
				}
				text		+= score + ' ' + (score !== 1 ? MyApp.lang.infoPoints : MyApp.lang.infoPoint);

				listInfo.textContent	= text;

			} else if (listID === 'list-game-players-resting') {
				text		= MyApp.lang.infoTotal + ' ';

				for (i = 0; i < MyApp.game.restingPlayer.length; i += 1) {
					score	+= MyApp.game.restingPlayer[i].score;
				}
				text		+= score + ' ' + (score !== 1 ? MyApp.lang.infoPoints : MyApp.lang.infoPoint);

				listInfo.textContent	= text;

			} else {
				listInfo.textContent	= getLocalized ? MyApp.lang[localStr] : localStr;				
			}
		}

	};

	// Manages players stored in the storage
	MyApp.players = {
		// Initializes players page
		init: function () {
			//console.log('MyApp.players.init()');
		
		},

		// Temporary array that holds players added to the storage
		addedPlayers: [],

		// Handles the click event on 'add players' buttons.
		// Parses the names on the text input element and, depending on which button 
		// triggered this function, adds players either to the storage or to the game.
		addPlayers: function (event) {
			//console.log('MyApp.players.addPlayers()');
			var self			= MyApp.players,
			// Text input element next to the button that triggered this funtion
				inputElem		= $(this).siblings('div').children('input')[0],
			// Type of players, i.e. where players are added to, e.g. 'game', 'storage'
				typeOf			= inputElem.name,
			// Trimmed names string entered on the text input element
				namesStr		= inputElem.value.trim().toLowerCase() || false,
			// Id of the list to add players found in the storage
				listToAdd		= typeOf === 'game' ? 
									$(this).closest('ul').attr('id') : 
									'list-players-stored',
			// Array to add new player objects
				arrayToAdd		= typeOf === 'game' ?
									MyApp.game.addedPlayers :
									self.getAllPlayers() || [],
			// Array of new player objects added
				newPlayers		= [],
			// Array of parsed and trimmed names
				namesArray,
			// Array of all players stored in storage
				allPlayers,
			// Length of an array
				len,
			// Index of an array
				i;

			// If the names string is empty, i.e. 'false', return the function early
			if (!namesStr) {
				//console.log('!namesString: ' + namesStr);
				alert('Name not entered. Please enter a valid name');
				return;
			}

			// Parse names from the text input element
			namesArray			= MyApp.utils.parseNames(namesStr);

			// If the names array is empty, i.e. 'false', return the function early
			if (!namesArray) {
				return;
			}

			// Get the array of player objects from the storage or create one if not found
			//playersArray		= self.getAllPlayers() || [];

			// Length of the array of parsed and trimmed players' names
			len			= namesArray.length;

			// Iterate over all names to check if they already exist in the stored array of players
			for (i = 0; i < len; i += 1) {
				//console.log('addPlayers: ' + namesArray[i]);

				// If a player is not found yet
				if (!MyApp.utils.isStored(arrayToAdd, 'name', namesArray[i])) {
					// Push it to the array
					arrayToAdd.push({name: namesArray[i]});

					// Push it to the new players array
					newPlayers.push({name: namesArray[i], won: 0, lost: 0, totalScore: 0, newPlayer: true});
				}
			}

			// If the array is not empty replace the corresponding array with it
			if (newPlayers.length > 0) {
				if (typeOf === 'game') {
					// Add players to the game
					MyApp.game.addedPlayers = arrayToAdd;
				} else if (typeOf === 'storage') {
					// Add players to the storage
					MyApp.utils.addPlayers(newPlayers);
				}

				// Show the list
				$(document.getElementById(listToAdd)).show();

				// Get all players and update the list
				allPlayers		= MyApp.players.getAllPlayers();
				allPlayers.sort(MyApp.utils.compareNames);
				MyApp.dom.emptyList('', 'list-players-stored');
				MyApp.dom.addToList('storage', allPlayers, 'list-players-stored');

				// Set list title text
				MyApp.dom.updateListInfo('list-players-stored', allPlayers.length + ' ' + (allPlayers.length === 1 ? MyApp.lang.onePlayer : MyApp.lang.multiplePlayers) + ' ' + (typeOf === 'storage' ? MyApp.lang.infoSaved : MyApp.lang.infoAdded), false);

			}
			
			inputElem.value = '';

			// Prevent default event being triggered and event bubbling up on DOM tree
			event.preventDefault();
			event.stopPropagation();
		},

		// Removes the player from the DOM list and either deletes the player in
		// the storage or removes the player from the game depending on the 
		// name attribute of the element that triggered this function
		deletePlayer: function (event) {
			//console.log('MyApp.players.deletePlayer()');
			var self			= MyApp.players,
			// Type of player to delete, i.e. where to delete the player, e.g. 'storage' or 'game'
				typeOf			= this.name,
			// DOM element to contain player's name
				nameElem		= this.previousSibling || false,
			// Player's name
				name			= false,
			// Player's name stored in the storage to match the name to
				storedName,
			// Array to add new player objects
				arrayToDelete	= typeOf === 'game' ?
									MyApp.game.addedPlayers :
									self.getAllPlayers() || [],
				len,
				i;

			if (nameElem) {
				name			= nameElem.textContent.toLowerCase();
				//console.log('name: ' + name);
			}

			if (arrayToDelete && name) {

				len				= arrayToDelete.length;

				for (i = 0; i < len; i += 1) {

					storedName	= arrayToDelete[i].name.toLowerCase();

					// If the 'name' equals the name stored in the array mark the index and break the loop early
					if (name === storedName) {
						//console.log(name + ' === ' + storedName);

						// Delete the player from the array
						arrayToDelete.splice(i, 1);
						break;
					}
				}
			}

			// If the player is to be deleted from the storage
			if (typeOf === 'storage') {
				if (arrayToDelete.length) {
					// Add the updated players to the storage overwriting the old one
					MyApp.utils.addItem('players', arrayToDelete);
				} else {
					// Remove the players item from local storage
					MyApp.utils.deleteItem('players');
				}
			}

			// Remove the corresponding list item from DOM
			$(this.parentNode).remove();

			// Prevent default event being triggered and event bubbling up on DOM tree
			event.preventDefault();
			event.stopPropagation();
		},

		// Gets a player by name
		getPlayersByName: function (names) {
			//console.log('MyApp.players.getPlayerByName()');
			var stored		= MyApp.utils.getItem('players') || false,
				players		= [],
				i, j;
			//console.log(stored);

			if (stored.length && names.length) {
				for (i = 0; i < stored.length; i += 1) {
					for (j = 0; j < names.length; j += 1) {
						if (stored[i].name === names[j].toLowerCase()) {
							players.push(stored[i]);
						}
					}
				}
			}

			return players;
		},

		// Gets and returns the player, or false if not found, from the storage
		getPlayer: function (name) {
			return MyApp.utils.getItem(name) || false;
		},

		// Gets all players from the storage as an array of objects or 'false' if not found
		getAllPlayers: function () {
			return MyApp.utils.getItem('players') || false;
		},

		// Updates players.
		// If player is not found on storage creates one
		updatePlayers: function (players) {
			//console.log('MyApp.players.updatePlayers()');

			var stored		= MyApp.utils.getItem('players') || [],
				newPlayers	= [],
				isStored	= false,
				i, j;

			if (players.length) {
				for (i = 0; i < players.length; i += 1) {
					for (j = 0; j < stored.length; j += 1) {
						if (stored[j].name === players[i].name) {
							isStored	= true;
							stored[j] = players[i];
							break;
						} else {
							isStored	= false;
						}
					}

					if (!isStored) {
						newPlayers.push(players[i]);					
					}
				}
			}

			if (newPlayers.length) {
				stored = stored.concat(newPlayers);
			}

			MyApp.utils.addItem('players', stored);
		}

	};

	// Manages the game
	MyApp.game = {

		// Holds game settings, e.g. duration of a round and players per team
		settings: {
			duration: false,
			playersPerTeam: 0
		},

		// Array that holds players playing the game
		addedPlayers: [],

		// Array that holds indexes of players still to be rested
		restingPlayers: [],

		// Holds a player resting
		restingPlayer: [],

		// Holds the number of matches played
		matchesPlayed: 0,

		// Holds the boolean to check for final round
		isFinal: false,

		// Holds the lastest scores for a round
		latestScores: {
			pointsWon: 0,
			playersAffected: [],
			teamName: ''
		},

		// Holds the team players currently playing a match and a name of the team
		teamA: {
			players: [],
			name: 'team name'
		},

		teamB: {
			players: [],
			name: 'team name'
		},


		// Gets the next resting player's index.
		getRestingPlayer: function () {
			//console.log('MyApp.game.getRestingPlayer');
			var len		= MyApp.game.restingPlayers.length,
				i;
			//console.log('len: ' + len);
			// Create new array of resting player indexes if the previous is empty
			if (!len) {
				//console.log('creating new array for resting players');
				for (i = 0; i < MyApp.game.players.length; i += 1) {
					MyApp.game.restingPlayers.push(this.players[i].index);
				}
				MyApp.utils.shuffleArray(MyApp.game.restingPlayers);
			}

			return MyApp.game.restingPlayers.pop();		
		},

		// Creates teams for the next round.
		// Checks the player count, and if odd, gets the resting player.
		// If more than 10 players, shuffles the players array and populates the
		// TeamA & TeamB arrays by cutting the players array half.
		// If 10 or less players, uses the matches array instead of players array
		// to populate TeamA & TeamB array.
		createNewTeams: function () {
			//console.log('MyApp.game.createNewTeams()');
			//console.log(this);
			var playerCount			= this.players.length,
				restingPlayerIdx	= false,
				isValid				= false,
				i;

			this.teamA.players		= [];
			this.teamB.players		= [];
			this.restingPlayer		= [];

			if (playerCount % 2) {
				restingPlayerIdx	= this.getRestingPlayer();

				for (i = 0; i < playerCount; i += 1) {
					if (this.players[i].index === restingPlayerIdx) {
						//restingPlayer	= this.players[i];
						this.restingPlayer.push(this.players[i]);
						break;
					}
				}
			}
			//console.log(restingPlayerIdx);

			if (playerCount > 10) {
				MyApp.utils.shuffleArray(this.players);

				for (i = 0; i < playerCount; i += 1) {
					if (this.players[i].index !== restingPlayerIdx) {
						this.teamA.players.push(this.players[i]);
					}
				}

				this.teamB.players	= this.teamA.players.splice(0, Math.floor(playerCount / 2));

			} else {
				if (!this.matches.length) {
					this.createMatchCombinations();
				}



				// THIS FOR DEBUG ONLY
				/*
				for (var ii = 0 ; ii < MyApp.game.matches.length ; ii += 1) {
					//console.log(MyApp.game.matches[ii].Team1.list.printAllNames());
					//console.log(MyApp.game.matches[ii].Team2.list.printAllNames());
					//console.log(MyApp.game.matches[ii].Resting ? (MyApp.game.matches[ii].Resting.list.printAllNames()) : '');
					//console.log('---');
				}
				*/

				for (i = 0; i < this.matches.length; i += 1) {
					if (this.restingPlayer.length && this.restingPlayer[0].index === this.matches[i].Resting.list[0].index) {
						isValid				= true;
						//console.log('FOUND A MATCH');
						//console.log('--> ' + this.restingPlayer[0].index + ' ' + this.matches[i].Resting.list[0].index);
					} else if (this.restingPlayer.length) {
						isValid				= false;
					} else {
						isValid				= true;
					}

					if (isValid) {
						var test = this.matches[i];
						//console.log(test);
						this.teamA.players			= this.matches[i].Team1.list;
						this.teamB.players			= this.matches[i].Team2.list;

						this.matches.splice(i, 1);
						break;
					}
				}

			}

			// Set team name by randomly selecting it from the players
			//console.log(this.teamA);
			//console.log(this.teamB);
			this.teamA.name = this.teamA.players[Math.floor(Math.random() * this.teamA.players.length)].name;
			this.teamB.name = this.teamB.players[Math.floor(Math.random() * this.teamB.players.length)].name;

			// Sort players by their score
			this.teamA.players.sort(MyApp.utils.compareScores);
			this.teamB.players.sort(MyApp.utils.compareScores);

		},

		// Creates teams for the final round.
		// Populates the teamA & teamB arrays by sorting players array by 
		// player's score and then cutting it half (if number of players are odd,
		// the team with losing players gets the extra player)
		createFinalTeams: function () {
			//console.log('MyApp.game.createFinalTeams()');
			var playerCount		= this.players.length,
				i;

			this.teamA.players	= [];
			this.teamB.players	= [];
			this.restingPlayer	= [];

			MyApp.utils.shuffleArray(this.players);
			this.players.sort(MyApp.utils.compareFinalScores);

			for (i = 0; i < playerCount; i += 1) {
					this.teamA.players.push(this.players[i]);
			}

			this.teamB.players	= this.teamA.players.splice(Math.floor(playerCount / 2));

			// Set team name by the player with the most points
			this.teamA.name = this.teamA.players[0].name;
			this.teamB.name = this.teamB.players[0].name;
		},

		startNewGame: function () {
			//console.log('MyApp.game.startNewGame()');
			//console.log(this);
			var playerCount			= this.addedPlayers.length,
				i;

			// Reset game
			this.restingPlayers		= [];
			this.restingPlayer		= [];
			this.players			= [];
			this.matches			= [];
			this.teams				= [];
			this.teamA.players		= [];
			this.teamB.players		= [];
			this.matchesPlayed		= 0;
			this.isFinal			= false;
			this.latestScores.pointsWon			= 0;
			this.latestScores.playersAffected	= [];
			this.latestScores.teamName			= '';

			// Show a loading message
			$.mobile.loading( 'show', {
				text: 'Calculating match combinations, please wait...',
				textonly: true,
				textVisible: true,
				theme: 'a'
			});

			// Add players to the game itself
			for (i = 0; i < playerCount; i += 1) {
				this.players[i] = {
					index: i,
					mask: 1 << i,
					name: this.addedPlayers[i].name,
					score: 0,
					totalScore: this.addedPlayers[i].totalScore || 0,
					won: this.addedPlayers[i].won || 0,
					lost: this.addedPlayers[i].lost || 0,
					newPlayer: this.addedPlayers[i].newPlayer || false
				};
			}

			// If no more than 10 players create all match combinations
			if (playerCount <= 10) {
				this.createTeamCombinations();
				this.createMatchCombinations();
			}

			this.initNewRound();

			// Reset the added players
			//this.addedPlayers		= [];

		},

		initNewRound: function () {
			//console.log('MyApp.game.initNewRound()');

			this.createNewTeams();
			//console.log(this.teamA.players.printAllNames());
			//console.log(this.teamB.players.printAllNames());
			//console.log(this.restingPlayer.length ? (this.restingPlayer[0].name) : '');
			$.mobile.changePage('#page-game');
		},

		initFinalRound: function () {
			//console.log('MyApp.game.initFinalRound()');

			this.createFinalTeams();
			this.isFinal		= true;
			//console.log(this.teamA);
			//console.log(this.teamB);
			//console.log(this.restingPlayer);
			$.mobile.changePage('#page-game');
		
		},

		// Quits the game.
		// Updates the player statistics and resets game
		quitGame: function() {
			//console.log('MyApp.game.quitGame()');

			/***
			// Reset game
			this.addedPlayers		= [];
			this.restingPlayers		= [];
			this.restingPlayer		= [];
			this.players			= [];
			this.matches			= [];
			this.matchesTaken		= [];
			this.teams				= [];
			this.teamA.players		= [];
			this.teamB.players		= [];
			this.matchesPlayed		= 0;
			this.settings.duration	= 0;
			this.isFinal			= false;
			MyApp.utils.deleteItem('duration');
			***/

			// Reset game
			MyApp.game.matches					= [];
			MyApp.game.matchesTaken				= [];
			MyApp.game.players					= [];
			MyApp.game.teams					= [];
			MyApp.game.teamA.players			= [];
			MyApp.game.teamB.players			= [];
			MyApp.game.addedPlayers				= [];
			MyApp.game.restingPlayers			= [];
			MyApp.game.restingPlayer			= [];
			MyApp.game.isFinal					= false;
			MyApp.game.settings.playersPerTeam	= 0;
			MyApp.game.settings.duration		= 0;
			MyApp.game.settings.gameMode		= 0;
			MyApp.game.matchesPlayed			= 0;
			MyApp.utils.deleteItem('duration');
			MyApp.game.latestScores.pointsWon		= 0;
			MyApp.game.latestScores.playersAffected	= [];
			MyApp.game.latestScores.teamName		= '';

			$.mobile.changePage('#page-dashboard');
		
		},

		finishRound: function () {
		},

		matchesTaken: [],

		players: [],

		teams: [],

		matches: [],

		Team: function () {
			this.list			= [];
			this.mask			= 0;
			this.count			= 0;
			this.full			= false;
			this.name			= '';
			this.Add			= function (i) {
				this.list.push(MyApp.game.players[i]);
				this.mask		|= MyApp.game.players[i].mask;
				this.full		= (this.count += 1) === Math.floor(MyApp.game.players.length/2);
			};
		},

		Resting: function () {
			this.list			= [];
			this.mask			= 0;
			this.count			= 0;
			this.full			= false;
			this.Add			= function (i) {
				this.list.push(MyApp.game.players[i]);
				this.mask		|= MyApp.game.players[i].mask;
				this.full		= (this.count += 1) === 1;
			};
		},

		createTeamCombinations: function () {
			//console.log('MyApp.game.createTeamCombinations()');
			var GAME			= MyApp.game,
				indexes			= [],//new Array(playersPerTeam);
				p,
				playersPerTeam	= Math.floor(GAME.players.length/2),
				l				= playersPerTeam - 1;

			for (p = 0; p < playersPerTeam; p += 1) {
				indexes[p] = p;
			}

			function addteam() {
				var team = new GAME.Team(),
					p;

				for (p = 0; p < playersPerTeam; p += 1) {
					team.Add(indexes[p]);
				}

				// Set team name by randomly selecting it from the playrs
				team.name = team.list[Math.floor(Math.random() * team.list.length)].name;

				GAME.teams.push(team);
			}

			function addplayer(start, depth) {
				var target = GAME.players.length - playersPerTeam + depth + 1,
					i;

				for (i = start; i < target; i += 1) {
					indexes[depth] = i;
					if (depth === l) {
						addteam();
					} else {
						addplayer(i + 1, depth + 1);
					}
				}
			}

			addplayer(0, 0);
		},

		createMatchCombinations: function () {
			//console.log('MyApp.game.createMatchCombinations()');
			var playerCount		= MyApp.game.players.length,
				teamCount		= MyApp.game.teams.length,
				i, j, k,
				teamA,
				teamB,
				restingPlayer,
				restingMask;

			// Sort the players array by their index property
			MyApp.game.players.sort(function (a, b) {
				if (a.index < b.index) { return -1; }
				if (a.index > b.index) { return 1; }
				return 0;
			});
			//console.log(MyApp.game.players);

			for (i = 0; i < teamCount; i += 1) {
				for (j = i + 1; j < teamCount; j += 1) {
					teamA					= MyApp.game.teams[i];
					teamB					= MyApp.game.teams[j];
					restingPlayer			= (playerCount % 2) ? new MyApp.game.Resting() : false;

					if ((teamA.mask & teamB.mask) === 0) {
						if (restingPlayer) {
							restingMask		= teamA.mask ^ teamB.mask;

							for (k = 0; k < playerCount; k += 1) {
								if ((restingMask & 1) === 0) {
									restingPlayer.Add(k);
									break;
								}
								restingMask	>>>= 1;
							}
						}

						MyApp.game.matches.push({
							Team1: teamA,
							Team2: teamB,
							Resting: restingPlayer
						});
					}
				}
			}

			MyApp.utils.shuffleArray(MyApp.game.matches);
		
		}

	};

	// Manages the stopwatch
	MyApp.stopwatch = {

		// Initializes the stopwatch.
		init: function () {
			//console.log('MyApp.stopwatch.init');

			var self		= MyApp.stopwatch;

			// Bind pause event listener to call 'pauseTimer' when a PhoneGap application is put into the background.
			// document.addEventListener('pause', self.pauseTimer, false);
			
			// If came back to stopwatch page, and stopwatch was automatically paused
			if ( MyApp.stopwatch.settings.isPaused ) {
				//console.log( 'continue where left' );
				
				// Displays the stopwatch
				self.displayTimer();
			} else {
				//console.log( 'init stopwatch' );
				
				// Show an alert to notify user that stopwatch may not work properly if screen auto-locks
				if ( !MyApp.stopwatch.settings.isUserNotified ) {
					alert( MyApp.lang.alertStopwatch );
				}

				// Init settings
				MyApp.stopwatch.settings = {
					timerId: -1,
					interval: 1000,
					millis: 0,
					seconds: 0, //MyApp.game.settings.duration || 3,
					minutes: MyApp.game.settings.duration || 3,
					started: 0,
					isUserNotified: true,
					isPaused: false
				};
				
				// Displays the stopwatch
				self.displayTimer();
				
			}

			// Hide the reset button
			$('#resetStopwatch').hide();
			$('#pauseStopwatch').show();
			$('#startStopwatch').show();
			$('#quitStopwatch').show();
		},

		// Flip counter
		counter: {},

		// Settings for stopwatch
		settings: {},

		// Displays the numeric setting values (minutes, seconds & milliseconds) on DOM element
		displayTimer: function () {
			var settings			= MyApp.stopwatch.settings,
				millis				= Math.round(settings.millis / 100).toFixed(0), // Format milliseconds to only show a tenth of a second
				seconds				= settings.seconds,
				minutes				= settings.minutes,
				stopwatch			= document.getElementById('stopwatch');

			// Format 'seconds' to include a leading zero
			if (seconds < 10) {
				seconds				= '0' + seconds;
			}

			// Format 'minutes' to include a leading zero
			if (minutes < 10) {
				minutes				= '0' + minutes;
			}

			// Show formatted values on DOM element
			stopwatch.getElementsByClassName('mins')[0].textContent		= minutes;
			stopwatch.getElementsByClassName('secs')[0].textContent		= seconds;
			
			// SPAN SHOWING MILLISECONDS AND COMMA IS SET HIDDEN IN CSS-FILE – REMOVE 'DISPLAY: NONE' IF INTERVAL !== 1000 MILLISECONDS
			stopwatch.getElementsByClassName('tenths')[0].textContent	= millis;
		},

		// Updates the 'settings' of the stopwatch and then calls 'displayTimer'
		updateTimer: function () {
			var self				= MyApp.stopwatch,
				settings			= self.settings;

			// Decrease 'milliseconds' by the 'interval'
			settings.millis			-= settings.interval;

			// If timer ran out pause it and change to end of round page
			if (settings.millis <= 0 && settings.seconds <= 0 && settings.minutes <= 0) {
				self.resetTimer();
				MyApp.audio.loopAudio();
				return;
			}

			// Decrease 'seconds' if 'milliseconds' passed a value of 1000
			if (settings.millis < 0) {
				settings.millis		= 1000 - settings.interval;
				settings.seconds	-= 1;
			}

			// Decrease 'minutes' if 'seconds' passed a value of 60
			if (settings.seconds < 0) {
				settings.millis		= 1000 - settings.interval;
				settings.seconds	= 59;
				settings.minutes	-= 1;
			}

			// Display the stopwatch
			self.displayTimer();
		},

		// Pauses the stopwatch by clearing the interval function and
		// sets the 'timerId' back to the default value of '-1'
		pauseTimer: function (event) {
			//console.log('MyApp.stopwatch.pauseTimer');

			// Clear the interval function
			window.clearInterval(MyApp.stopwatch.settings.timerId);

			// Set the 'timerId' back to the default value
			MyApp.stopwatch.settings.timerId 	= -1;
			
			// Set stopwatch to paused state
			MyApp.stopwatch.settings.isPaused	= true;
			
			if (event) {
				// Prevent default event being triggered
				event.preventDefault();
			}

			// Hide the pause button and show reset button
			$('#pauseStopwatch').hide();
			$('#resetStopwatch').show();
		},

		// Starts the stopwatch by setting up the interval function
		startTimer: function (event) {
			//console.log('MyApp.stopwatch.startTimer');
			MyApp.audio.preloadAudio();

			// Set up an interval function if the 'timerId' still is the default value of '-1'
			if (MyApp.stopwatch.settings.timerId === -1) {
				// Set the 'timerId' to match the interval function's ID
				MyApp.stopwatch.settings.timerId = window.setInterval(MyApp.stopwatch.updateTimer, MyApp.stopwatch.settings.interval);
			}
			
			if (event) {
				// Prevent default event being triggered
				event.preventDefault();
			}

			// Hide the reset button and show pause button
			$('#resetStopwatch').hide();
			$('#pauseStopwatch').show();
		},

		// Resets the stopwatch
		resetTimer: function (event) {
			//console.log('MyApp.stopwatch.resetTimer');

			// Pause the stopwatch
            MyApp.stopwatch.pauseTimer();

			// Set time related variables back to the default value of '0'
			MyApp.stopwatch.settings = {
				timerId: -1,
				interval: 1000,
				millis: 0,
				seconds: 0, //MyApp.game.settings.duration || 3,
				minutes: MyApp.game.settings.duration || 3,
				started: 0,
				isUserNotified: true,
				isPaused: false
			};

			// Display the stopwatch
            MyApp.stopwatch.displayTimer();
			
			if (event) {
				// Prevent default event being triggered
				event.preventDefault();
			}

			// Hide the reset button and show pause button
			$('#pauseStopwatch').show();
			$('#resetStopwatch').hide();
		},

		// Quits the stopwatch
		quitTimer: function (event) {
			//console.log('MyApp.stopwatch.resetTimer');

			// Reset the stopwatch and change page
            MyApp.stopwatch.resetTimer();
			$.mobile.changePage('#page-round-end');
		},

		// Vertically centers the stopwatch
		centerVertically: function ( event ) {
			//console.log( 'MyApp.stopwatch.centerVertically' );
			var	$page		= $( '#page-game-stopwatch' ),
				hHeight		= $page.find( 'div[data-role="header"]' ).height() || 0,
				fHeight		= $page.find( 'div[data-role="footer"]' ).height() || 0,
				elemHeight	= $page.find( '.mins' ).height() || 0;
			
			//console.log( 'height ' + elemHeight );
			//console.log( 'fh ' + fHeight );
			//console.log( 'hh ' + hHeight );
			$page.find( '#page-game-stopwatch-content' ).css( 'margin-top', '-' + ( elemHeight / 2 + ( ( fHeight - hHeight ) / 2 ) ) + 'px' );
			
		}
		
	};

	// Manages audio
	MyApp.audio = {
		preloadAudio: function () {
			//console.log('MyApp.audio.preloadAudio()');
			PGLowLatencyAudio.preloadAudio(
				'airhorn',
				'audio/airhorn.mp3',
				1,
				function () {
					//console.log('success');
				},
				function(e) {
					//console.log('error: ' + e);
				}
			);
		},

		loopAudio: function () {
			//console.log('MyApp.audio.loopAudio()');
			//$.mobile.changePage('#page-round-end');
			//return;
			PGLowLatencyAudio.loop('airhorn');
			navigator.notification.alert(
				MyApp.lang.alertRoundEndedMessage,		// Message
				function () {							// Callback function
					PGLowLatencyAudio.stop(
						'airhorn',
						function() {
							//console.log('stopped audio');
						},
						function (e) {
							//console.log('error: ' + e);
						}
					);
					PGLowLatencyAudio.unload(
						'airhorn',
						function() {
							//console.log('unloaded audio');
						},
						function (e) {
							//console.log('error: ' + e);
						}
					);
					$.mobile.changePage('#page-round-end');
				},
				MyApp.lang.alertRoundEndedTitle			// Title				
			);
		},

		media: null,

		playAudio: function () {
			//console.log('MyApp.audio.playAudio()');
			PGLowLatencyAudio.loop('airhorn');
			return;
			
			/* THIS IS NOT NEEDED IF USING PGLOWLATENCYAUDIO PLUGING
			// Get the path of the application,
			// that is '/var/mobile/Applications/{GUID}/{appname}.app/www/index.html'
			var path	= window.location.pathname;

			// Strip off 'index.html' and prepend file-protocol
			path		= path.substr(path, path.length - 10);

			if (this.media == null) {
				//console.log('null');
				this.media	= new Media(path + 'audio/air_horn.mp3', this.onSuccess, this.onError);
				this.media.play();

			} else {
				this.media.stop();
				this.media.release();
				this.media = null;

			}
			*/
		},

		pauseAudio: function () {
			//console.log('MyApp.audio.pauseAudio()');
		},

		stopAudio: function () {
			//console.log('MyApp.audio.stopAudio()');
		},

		onSuccess: function () {
			//console.log('MyApp.audio.onSuccess()');

			MyApp.audio.media.release();
			MyApp.audio.media = null;
		},

		onError: function (error) {
			//console.log('MyApp.audio.onError()');
			alert('code: '    + error.code    + '\n' + 
                  'message: ' + error.message + '\n');
		}

	};

	// Manages event handlers
	MyApp.handlers = {

		// Toggles list items in the duration of a round list and adds the 
		// selected value to the game settings.
		// Mimics radio button behaviour, i.e. only one item could be selected
		toggleDuration: function (event, ui) {
			//console.log('toggleDuration()');

			var value;

			// Return early if this is already selected
			if ($(this).hasClass('selected')) {
				return;
			}

			// Mark this as selected, i.e. add a class name 'selected' to this 
			// and remove the class name from every siblings
			$(this).addClass('selected')
				   .siblings('.selected').removeClass('selected');

			// Add the value found in this element to the game settings
			value							= parseInt($(this).attr('data-value'), 10) || false;
			MyApp.game.settings.duration	= value;
			
			// Reset the timer if it's currently being paused
			if ( MyApp.stopwatch.settings.isPaused ) {
				MyApp.stopwatch.resetTimer();				
			}

			// Add the selected setting to the list side bar
			$(this).parent().siblings('.list-side').addClass('selected');

			// Update the list info with localized string
			MyApp.dom.updateListInfo('list-game-round-duration', value + ' ' + MyApp.lang.infoDuration, false);
			MyApp.dom.updateListInfo('list-game-round-duration-2', value + ' ' + MyApp.lang.infoDuration, false);
			MyApp.dom.updateListInfo('list-game-final-duration', value + ' ' + MyApp.lang.infoDuration, false);

			if ($.mobile.activePage.attr('id') === 'page-add-players') {
				// Show the footer
				$('#footer-add-players').show();
			} else if ($.mobile.activePage.attr('id') === 'page-game') {
				// Show the footer
				$('#footer-game').show();
			
			} else if (MyApp.game.addedPlayers.length > 3) {
				// Show the footer
				$('#footer-settings').show();
			}
		},

		// Toggles list items in the players list and adds selected players to
		// the game. 
		// Mimics checkbox behaviour, i.e. multiple items could be selected
		togglePlayer: function (event) {
			//console.log('MyApp.handlers.togglePlayer()');

			var selectedPlayers,
				infoText;

			// Toggle class name 'selected' on this element
			$(this).toggleClass('selected');

			// Get selected players
			selectedPlayers			= $(this).parent().find('.selected');

			// Enable the button bar if at least one player is selected or added to the list
			if (selectedPlayers.length || $('#list-game-add-players').find('.list-item-player').length) {
				$('#footer-add-players').show();

			} else {
				$('#footer-add-players').hide();

			}

			// Update the list info
			if(selectedPlayers.length) {
				infoText	= selectedPlayers.length + ' ';
				infoText	+= ((selectedPlayers.length === 1) ? 
										MyApp.lang.onePlayer : 
										MyApp.lang.multiplePlayers) + ' ';
				infoText	+= MyApp.lang.infoSelected;
				MyApp.dom.updateListInfo('list-game-pick-players', infoText, false);
			} else {
				infoText	= MyApp.lang.noPlayers + ' ' + MyApp.lang.infoSelected;
				MyApp.dom.updateListInfo('list-game-pick-players', infoText, false);
			
			}
			
			//console.log(selectedPlayers.length);
		},

		// Toggles list items in the team list on the end of round page.
		// Mimics radio button behaviour, i.e. only one item could be selected
		toggleTeam: function (event) {
			//console.log('MyApp.handlers.toggleTeam()');
			var teamName;

			// Return early if this is already selected
			if ($(this).hasClass('selected')) {
				return;
			}

			//console.log(this);

			// Mark this as selected, i.e. add a class name 'selected' to this 
			// and remove the class name from every siblings
			$(this).addClass('selected')
				   .siblings('.selected').removeClass('selected');


			// Update the list info with localized string
			teamName			= $(this).find('.list-content').text();
			teamName			= $(this).attr('data-value');


			if (teamName !== 'draw') {
				MyApp.dom.updateListInfo('list-round-won', MyApp.lang.infoTeam + ' ' + teamName + ' ' + MyApp.lang.infoSelected, false);
			} else {			
				MyApp.dom.updateListInfo('list-round-won', MyApp.lang.contentDraw + ' ' + MyApp.lang.infoSelected, false);
			}

			if (teamName === 'draw' || MyApp.game.isFinal) {
				$('#list-round-goal-difference')
					.hide()					
					.find('.selected').removeClass('selected').end();
					//.siblings('.button-bar').removeClass('disabled');

				$('#footer-round-end').show();

				// Update the list info
				MyApp.dom.updateListInfo('list-round-goal-difference', 'infoNotSet', true);

			} else {
				$('#list-round-goal-difference').show();
				
				// Enable the button bar if both team and goal difference is selected
				if ($('#list-round-goal-difference').find('.selected').length) {
					//$(this).closest('ul').siblings('.button-bar').removeClass('disabled');

					$('#footer-round-end').show();
				} else {
					//$(this).closest('ul').siblings('.button-bar').addClass('disabled');

					$('#footer-round-end').hide();
				}
			}
		},

		// Toggles list items in the goal difference list on the end of round page.
		// Mimics radio button behaviour, i.e. only one item could be selected
		toggleGoalDifference: function (event) {
			//console.log('MyApp.handlers.toggleGoalDifference()');
			var goalDifference;

			// Return early if this is already selected
			if ($(this).hasClass('selected')) {
				return;
			}

			// Mark this as selected, i.e. add a class name 'selected' to this 
			// and remove the class name from every siblings
			$(this).addClass('selected')
				   .siblings('.selected').removeClass('selected');

			// Enable the button bar if both team and goal difference is selected
			//$(this).closest('ul').siblings('.button-bar').removeClass('disabled');

			$('#footer-round-end').show();
			
			// Update the list info with localized string
			goalDifference			= $(this).find('.list-content').text();
			MyApp.dom.updateListInfo('list-round-goal-difference', goalDifference + ' ' + MyApp.lang.infoSelected, false);
			
		},

		// Toggles list items in the game mode list on the game page.
		// Only visible when about to play a final round.
		// Mimics radio button behaviour, i.e. only one item could be selected
		toggleGameMode: function (event) {
			//console.log('MyApp.handlers.toggleGameMode()');

			var gameMode;

			// Return early if this is already selected
			if ($(this).hasClass('selected')) {
				return;
			}

			// Mark this as selected, i.e. add a class name 'selected' to this 
			// and remove the class name from every siblings
			$(this).addClass('selected')
				   .siblings('.selected').removeClass('selected');

			// Add the selected setting to the list side bar
			$(this).parent().siblings('.list-side').addClass('selected');
			
			// Enable the button bar
			//$(this).closest('ul').siblings('.button-bar').removeClass('disabled');

			if ($(this).attr('data-value') === 'off') {
				$('#footer-game').show();
				$('#list-game-final-duration').hide();
			} else {
				$('#footer-game').show();
				$('#list-game-final-duration').show();

				// Scroll to bottom of page
				$('html, body').animate({ scrollTop: $(document).height() }, 'slow');
			}

			// Add selected value to settings
			MyApp.game.settings.gameMode = $(this).attr('data-value');

			// Update the list info with localized string
			gameMode			= $(this).text();
			MyApp.dom.updateListInfo('list-final-game-mode', gameMode + ' ' + MyApp.lang.infoSelected, false);
			
		},

		// Adds players temporarly to the list found on the game players page
		addTmpPlayers: function (event) {
			//console.log('MyApp.handlers.addTmpPlayers');
			var $list			= $(this).closest('ul'),
				listId			= $list.attr('id'),
			// Player list items already added to this list
				$tmpPlayers		= $list.find('.list-item-player'),
			// Text input element next to the button that triggered this funtion
				inputElem		= $(this).siblings('div').children('input')[0],
			// Trimmed names string entered on the text input element
				namesStr		= inputElem.value.trim().toLowerCase() || false,
			// Array of parsed and trimmed names
				namesArray,
			// Array of new player objects added
				newPlayers		= [],
				isValid			= false,
				stored			= MyApp.players.getAllPlayers(),
				len,
				i,
				count,
				infoText;

			//console.log($tmpPlayers);

			// If the names string is empty, i.e. 'false', return the function early
			if (!namesStr) {
				//console.log('!namesString: ' + namesStr);
				alert('Name not entered. Please enter a valid name');
				return;
			}

			// Parse names from the text input element
			namesArray			= MyApp.utils.parseNames(namesStr);

			// If the names array is empty, i.e. 'false', return the function early
			if (!namesArray) {
				return;
			}

			// Add already added temporary players to the new players list
			$tmpPlayers.each(function (index, element) {
				newPlayers.push({ name: this.getAttribute('data-name').toLowerCase(), won: 0, lost: 0, totalScore: 0, newPlayer: true });
			});

			// Length of the array of parsed and trimmed players' names
			len			= namesArray.length;

			// Iterate over all names to check if they are already added to the game
			for (i = 0; i < len; i += 1) {
				//console.log('addPlayers: ' + namesArray[i]);
				isValid			= false;

				// If a player is not found yet
				if (!MyApp.utils.isStored(MyApp.game.addedPlayers, 'name', namesArray[i])) {
					isValid		= true;
				}

				if (isValid && !MyApp.utils.isStored(stored, 'name', namesArray[i])) {
					// Push it to the new players array
					newPlayers.push({name: namesArray[i], won: 0, lost: 0, totalScore: 0, newPlayer: true});					
				}
			}

			// Filter unique players
			if (newPlayers.length) {
				newPlayers			= MyApp.utils.getUniqueSortedArray(newPlayers);
			}
			if (newPlayers.length) {
				MyApp.dom.emptyList('', listId);
				MyApp.dom.addToList('tmp', newPlayers, listId);
			}

			// Update the list info with localized string
			count = $list.find('.list-item-player').length;
			if (count) {
				infoText	= count + ' ';
				infoText	+= ((count === 1) ? 
									MyApp.lang.onePlayer : 
									MyApp.lang.multiplePlayers) + ' ';
				infoText	+= MyApp.lang.infoAdded;
				MyApp.dom.updateListInfo('list-game-add-players', infoText, false);
			
			} else {
				MyApp.dom.updateListInfo('list-game-add-players', MyApp.lang.infoToGame, false);
			
			}

			// Show the button bar if this list has players on it or at least one player is selected
			if ($list.find('.list-item-player').length || $('#list-game-pick-players').find('.selected').length) {
				$('#footer-add-players').show();

			}

			// Clear the input value
			$(inputElem).val('');

		},

		// Saves the selected players to the game and changes the page back to
		// previous page
		savePlayers: function (event) {
			//console.log('MyApp.handlers.savePlayers');

			if ($(this).parent().hasClass('disabled')) {
				return;
			}

			// Get selected players
			var $selectedPlayers		= $('#list-game-pick-players').find('.selected').removeClass('selected'),
			// Get added players
				$addedPlayers			= $('#list-game-add-players').find('.list-item'),
				newPlayers				= [],
				playerNames				= [],
				len,
				i;
			
			//console.log($selectedPlayers);
			//console.log($addedPlayers);

			// Add the selected players to the game
			if ($selectedPlayers.length) {
				for (i = 0, len = $selectedPlayers.length; i < len; i += 1) {
					//newPlayers.push({name: $selectedPlayers[i].textContent});
					playerNames.push($selectedPlayers[i].getAttribute('data-name'));
				}

				newPlayers = MyApp.players.getPlayersByName(playerNames);
			}

			// Add the selected players to the game
			if ($addedPlayers.length) {
				for (i = 0, len = $addedPlayers.length; i < len; i += 1) {
					//newPlayers.push({name: $addedPlayers[i].textContent});
					newPlayers.push({name: $addedPlayers[i].getAttribute('data-name'), won: 0, lost: 0, totalScore: 0, newPlayer: true});
				}
			}

			// Filter unique players
			if (newPlayers.length) {
				newPlayers					= MyApp.utils.getUniqueSortedArray(newPlayers);
			}

			// Add unique players to the game
			if (newPlayers.length) {
				MyApp.game.addedPlayers		= MyApp.game.addedPlayers.concat(newPlayers);
			
			}

			// Go back to the previous page
			history.back();
		},
		

		// Adds the picked players to the game, hides the pick players list and
		// shows the list of players added to the game
		pickPlayers: function (event) {
			//console.log('MyApp.handlers.pickPlayers()');

			var GAME				= MyApp.game,
			// Selected players as jQuery object
				$selectedPlayers	= $(this).parent().siblings('.selected'),
			// Array of selected players
				arrSelected			= [],
			// Array of players still left to be picked after the selected players
				arrStillToPick		= [],
			// Players stored in the storage
				playersStored		= MyApp.players.getAllPlayers(),
			// Array of players already added to the game
				addedPlayers		= GAME.addedPlayers,
				len,
				i;

			//console.log($selectedPlayers);

			if ($selectedPlayers.length) {
				for (i = 0, len = $selectedPlayers.length; i < len; i += 1) {
					// Add player objects from selected players
					arrSelected.push({name: $selectedPlayers[i].textContent});
				}
			}

			if (arrSelected.length) {
				// Filter already added players from the selected players
				arrSelected			= arrSelected.filter(MyApp.utils.filterByName, addedPlayers);
			}

			if (arrSelected.length) {
				// Add players from the array to the game
				for (i = 0, len = arrSelected.length; i < len; i += 1) {
					addedPlayers.push(arrSelected[i]);
				}

				// Sort the array by name
				addedPlayers.sort(MyApp.utils.compareNames);

				// Filter already added players from the stored players
				arrStillToPick		= playersStored.filter(MyApp.utils.filterByName, addedPlayers);

				// Add selected players to the list of added players and show it
				MyApp.dom.emptyList('game', 'list-game-players-participating');
				MyApp.dom.addToList('game', addedPlayers, 'list-game-players-participating');
				$('#list-game-players-participating').show();
			}

			if (arrStillToPick.length) {
				// Sort the array by name
				arrStillToPick.sort(MyApp.utils.compareNames);

				// Add players still left to be picked to the list and hide the add button
				MyApp.dom.emptyList('pick-players', 'list-game-pick-players');
				MyApp.dom.addToList('pick-players', arrStillToPick, 'list-game-pick-players');
			} else {
				// Empty the list and hide it
				MyApp.dom.emptyList('pick-players', 'list-game-pick-players');
			}

			// Prevent default event being triggered and event bubbling up on DOM tree
			event.preventDefault();
			event.stopPropagation();
		},

		// Deletes the player either from the game or the storage

		// Removes the player from the DOM list and either deletes the player in
		// the storage or removes the player from the game depending on the 
		// name attribute of the element that triggered this function
		deletePlayer: function (event) {
			//console.log('MyApp.handlers.deletePlayer()');
			// Type of player to delete, i.e. where to delete the player, e.g. 'storage' or 'game'
			var	typeOf			= this.name,
			// Player's name
				name			= this.parentNode.getAttribute('data-name') || false,
			// Player's name stored in the storage to match the name to
				storedName,
			// Array to delete the player from
				arrayToDelete	= typeOf === 'game' ?
									MyApp.game.addedPlayers :
									MyApp.players.getAllPlayers() || [],
				$list			= $(this).closest('ul'),
				len,
				i,
				infoText;

			// If this is triggered by a button on game add players page
			// remove the list item from DOM and return
			if (typeOf === 'tmp') {
				$(this).parent().remove();
				len				= $list.find('.list-item-player').length;
				//console.log(len);

				if (len) {
					infoText	= len + ' ';
					infoText	+= ((len === 1) ? 
										MyApp.lang.onePlayer : 
										MyApp.lang.multiplePlayers) + ' ';
					infoText	+= MyApp.lang.infoAdded;
					MyApp.dom.updateListInfo('list-game-add-players', infoText, false);
				
				} else {
					MyApp.dom.updateListInfo('list-game-add-players', MyApp.lang.infoToGame, false);
				
				}

				return;
			}

			if (arrayToDelete && name) {
				len				= arrayToDelete.length;
				for (i = 0; i < len; i += 1) {
					storedName	= arrayToDelete[i].name.toLowerCase();

					// If the 'name' equals the name stored in the array mark the index and break the loop early
					if (name === storedName) {
						//console.log(name + ' === ' + storedName);
						// Delete the player from the array
						arrayToDelete.splice(i, 1);
						break;
					}
				}
			}

			// If the player is to be deleted from the storage
			if (typeOf === 'storage') {
				if (arrayToDelete.length) {
					// Add the updated players to the storage overwriting the old one
					MyApp.utils.addItem('players', arrayToDelete);
				} else {
					// Remove the players item from local storage
					MyApp.utils.deleteItem('players');
					$list.hide();
				}
			}
			//console.log(arrayToDelete.length);

			// If the list is empty add info item to the list
			if (!arrayToDelete.length) {
				//console.log('not len');
				$(this).closest('ul').find('.list-divider')
					.after('<li class="list-item list-item-info"><span class="list-content info">' + MyApp.lang.contentAddPlayers + '</span></li>');
				//$('#list-game-players-participating').find('.list-item-info').show();

				// Set list title text
				MyApp.dom.updateListInfo($list.attr('id'), MyApp.lang.noPlayers + ' ' + (typeOf === 'storage' ? MyApp.lang.infoSaved : MyApp.lang.infoAdded), false);

			} else {
				// Set list title text
				infoText	= arrayToDelete.length + ' ';
				infoText	+= ((arrayToDelete.length === 1) ?
									MyApp.lang.onePlayer :
									MyApp.lang.multiplePlayers) + ' ';
				infoText	+= typeOf === 'storage' ?
									MyApp.lang.infoSaved : 
									MyApp.lang.infoAdded;
				MyApp.dom.updateListInfo($list.attr('id'), infoText, false);
			
			}

			// Remove the corresponding list item from DOM
			$(this).parent().remove();

			// Handle the footer show/hide depending on the active page
			if ($.mobile.activePage.attr('id') === 'page-game-settings' && arrayToDelete.length < 4) {
				$('#footer-settings').hide();
			}

			/*
			$list.find('.list-title span')
				.text(arrayToDelete.length + ' ' + MyApp.lang.players_found);
			*/

			// Prevent default event being triggered and event bubbling up on DOM tree
			event.preventDefault();
			event.stopPropagation();
		},

		// Initializes 'players' page before the page itself is created
		initPlayersPage: function (event) {
			//console.log('MyApp.handlers.initPlayersPage()');

			// Players stored in the storage
			var playersStored			= MyApp.players.getAllPlayers(),
			// Id of the list to add players found in the storage
				listToAdd				= 'list-players-stored',
			// List of the players found in the storage
				list					= document.getElementById(listToAdd),
				infoText;

			// Update list header and info with localized strings
			MyApp.dom.updateListHeader('list-add-players', 'listAddPlayers', true);
			MyApp.dom.updateListInfo('list-add-players', 'infoToDatabase', true);
			

			// If players are found add them to the list else hide the list
			if (playersStored) {
				$(list).show();

				// Update list header and info with localized strings
				MyApp.dom.updateListHeader(listToAdd, 'listPlayers', true);
				infoText	= playersStored.length + ' ';
				infoText	+= ((playersStored.length === 1) ? 
									MyApp.lang.onePlayer : 
									MyApp.lang.multiplePlayers) + ' ';
				infoText	+= MyApp.lang.infoSaved;
				MyApp.dom.updateListInfo(listToAdd, infoText, false);

				playersStored.sort(MyApp.utils.compareNames);
				MyApp.dom.emptyList('', 'list-players-stored');
				MyApp.dom.addToList('storage', playersStored, 'list-players-stored');

			} else {
				$(list).hide();
			}

			// Set the input placeholder and divider text
			$('#list-add-players')
				.find('.input-add-players').attr('placeholder', MyApp.lang.placeholderName);

		},

		// Initializes 'add player' page.
		// Gets all stored players and players already added to the game, and
		// based on the players that are not added then populates the list with
		// those players
		initAddPlayersPage: function (event, ui) {
			//console.log('MyApp.handlers.initAddPlayersPage()');

			// Players stored in the storage
			var	playersStored		= MyApp.players.getAllPlayers() || [],
			// Array of players already added to the game
				addedPlayers		= MyApp.game.addedPlayers.length > 0 ?
										MyApp.game.addedPlayers :
										MyApp.game.players.length > 0 ?
											MyApp.game.players :
											[],
			// Array of players still left to be picked
				arrStillToPick		= [];

			//console.log(MyApp.game.addedPlayers.length);

			if (ui.prevPage.attr('id') === 'page-game' || ui.prevPage.attr('id') === 'page-standings') {
				$('#list-game-round-duration-2')
					.show()
					.find('.duration[data-value="' + MyApp.game.settings.duration + '"]').addClass('selected').end()
					.find('.list-side').addClass('selected');

				MyApp.game.addedPlayers		= [];
				addedPlayers				= MyApp.game.players;

			} else {

				$('#list-game-round-duration-2').hide();
			}

			// Update list headers with localized strings
			MyApp.dom.updateListHeader('list-game-round-duration-2', 'listDuration', true);
			MyApp.dom.updateListHeader('list-game-add-players', 'listAddPlayers', true);
			MyApp.dom.updateListHeader('list-game-pick-players', 'listPickPlayers', true);
			MyApp.dom.updateListInfo('list-game-add-players', 'infoToGame', true);

			// Get the players that are not already added to the game
			arrStillToPick			= playersStored.filter(MyApp.utils.filterByName, addedPlayers);

			// Populate the list with players still to be picked
			if (arrStillToPick.length) {
				arrStillToPick.sort(MyApp.utils.compareNames);

				MyApp.dom.emptyList('', 'list-game-pick-players');
				MyApp.dom.addToList('pick-players', arrStillToPick, 'list-game-pick-players');
				$('#list-game-pick-players').show();

				// Update list info
				MyApp.dom.updateListInfo('list-game-pick-players', MyApp.lang.noPlayers + ' ' + MyApp.lang.infoSelected, false);

			} else {
				$('#list-game-pick-players').hide();

			}

			// Remove any old added players from the list and
			// disable the button bar
			$('#list-game-add-players').find('.list-item-player').remove().end();
				//.siblings('.button-bar').addClass('disabled');

			// Hide the footer
			$('#footer-add-players').hide();

			// Update the input placeholder text with localized string
			$('#list-game-add-players')
				.find('.input-add-players').attr('placeholder', MyApp.lang.placeholderName);
		
		},

		initGameSettingsPage: function (event, ui) {
			//console.log('MyApp.handlers.initGameSettingsPage()');
			var GAME					= MyApp.game,
			// Players already added to the game
				playersAdded			= GAME.addedPlayers || [],
			// Duration list
				$listDuration			= $('#list-game-round-duration'),
			// Duration setting stored in the storage
				durationSetting			= GAME.settings.duration,
				infoText;

			//console.log('duration: ' + durationSetting);
			//console.log(playersAdded.length);

			if (ui.prevPage.attr('id') === 'page-game') {
				playersAdded			= MyApp.game.players;
			}

			// Update list headers with localized strings
			MyApp.dom.updateListHeader('list-game-round-duration', 'listDuration', true);
			MyApp.dom.updateListHeader('list-game-players-participating', 'listPlayersGame', true);

			// Populate the list of duration setting
			if (durationSetting) {

				// Add class 'selected' to the correct list item and remove it from others
				$listDuration.find('[data-value="' + durationSetting + '"]').addClass('selected')
					.siblings().removeClass('selected').end().end()
					.find('.list-side').addClass('selected');

				// Update list info
				MyApp.dom.updateListInfo('list-game-round-duration', durationSetting + ' ' + MyApp.lang.infoDuration, false);

			} else {
				// Set footer text and remove 'selected' class
				$listDuration
					.find('.selected').removeClass('selected');

				// Update list info
				MyApp.dom.updateListInfo('list-game-round-duration', 'infoNotSet', true);

			}

			// Populate the list of players participating
			if (playersAdded.length) {
				// Sort the array by name
				playersAdded.sort(MyApp.utils.compareNames);

				MyApp.dom.emptyList('', 'list-game-players-participating');
				MyApp.dom.addToList('game', playersAdded, 'list-game-players-participating');

				// Update list info
				infoText	= playersAdded.length + ' ';
				infoText	+= ((playersAdded.length === 1) ? 
									MyApp.lang.onePlayer : 
									MyApp.lang.multiplePlayers) + ' ';
				infoText	+= MyApp.lang.infoAdded;
				MyApp.dom.updateListInfo('list-game-players-participating', infoText, false);

				if (playersAdded.length > 3 && durationSetting) {
					// show the footer
					$('#footer-settings').show();
				} else {
					// hide the footer
					$('#footer-settings').hide();				
				}

			} else {
				$('#list-game-players-participating')
					.find('.list-item').remove().end();

				// Update list content
				$('#list-game-players-participating')
					.find('.list-divider')
					.after('<li class="list-item list-item-info"><span class="list-content info">' + MyApp.lang.contentAddPlayers + '</span></li>');


				// Update list info
				MyApp.dom.updateListInfo('list-game-players-participating', MyApp.lang.noPlayers + ' ' + MyApp.lang.infoAdded, false);

				// Hide footer
				$('#footer-settings').hide();

			}
		},

		// Initializes 'end of round' page
		// Populates the lists with team names and goal difference
		initRoundEndPage: function (event, ui) {
			//console.log('MyApp.handlers.initRoundEndPage()');
			var teamName1,
				teamName2,
				i;

			teamName1			= MyApp.lang.contentTeam + ' ' + MyApp.game.teamA.name;
			teamName2			= MyApp.lang.contentTeam + ' ' + MyApp.game.teamB.name;

			// Set correct team names and data-name attribute
			$('#list-round-won')
				.find('.list-item').removeClass('selected').end()
				.find('.team-name-1').text(teamName1).parent().attr('data-value', MyApp.game.teamA.name).end().end()
				.find('.team-name-2').text(teamName2).parent().attr('data-value', MyApp.game.teamB.name).end().end()
				.find('.team-draw').text(MyApp.lang.contentDraw).parent().attr('data-value', 'draw').show();

			MyApp.dom.updateListHeader('list-round-won', 'listWinners', true);
			MyApp.dom.updateListInfo('list-round-won', 'infoNotSet', true);

			// Set correct goal differences
			if (!MyApp.game.isFinal) {
				$('#list-round-goal-difference')
					.hide()
					.find('.list-item').removeClass('selected').end()
					.find('.goal-difference-over').text(MyApp.lang.contentGoalsOver).parent().attr('data-value', 'over').end().end()
					.find('.goal-difference-under').text(MyApp.lang.contentGoalsUnder).parent().attr('data-value', 'under');
					//.siblings('.button-bar').addClass('disabled');

				$('#footer-round-end')
					.hide()
					.find('span').text(MyApp.lang.buttonSave);

				MyApp.dom.updateListHeader('list-round-goal-difference', 'listGoals', true);
				MyApp.dom.updateListInfo('list-round-goal-difference', 'infoNotSet', true);
			} else {
				$('#list-round-won')
					.find('.team-draw').parent().hide();

				$('#list-round-goal-difference')
					.hide();
					//.siblings('.button-bar').addClass('disabled');

				$('#footer-round-end')
					.hide()
					.find('span').text(MyApp.lang.buttonQuit);
			}

			// If came back from standings page show the footer and
			// select previously selected team and goal difference and subtract 
			// scores from players' scores who won the previous round
			if (ui.prevPage.attr('id') === 'page-standings') {
				$('#footer-round-end').show();

				if (MyApp.game.latestScores.pointsWon === 1) {
					$('#list-round-won')
						.find('.team-draw').parent().addClass('selected');
				} else {
					$('#list-round-won')
						.find('.list-item[data-value="' + MyApp.game.latestScores.teamName + '"]').addClass('selected');

					$('#list-round-goal-difference')
						.show()
						.find('.list-item[data-value="' + (MyApp.game.latestScores.pointsWon === 3 ? 'over' : 'under' ) + '"]').addClass('selected');
				
				}

				for (i = 0; i < MyApp.game.latestScores.playersAffected.length; i += 1) {
					MyApp.game.latestScores.playersAffected[i].score		-= MyApp.game.latestScores.pointsWon;
					MyApp.game.latestScores.playersAffected[i].totalScore	-= MyApp.game.latestScores.pointsWon;
				}

				MyApp.game.matchesPlayed -= 1;
			}

		},

		// Initializes 'standings' page
		// Populates the list with players and their scores
		initStandingsPage: function (event, ui) {
			//console.log('MyApp.handlers.initStandingsPage()');
			//console.log(MyApp.game.latestScores.pointsWon);
			//console.log(MyApp.game.latestScores.playersAffected[1]);
			//console.log(MyApp.game.players.length);
			//console.log(MyApp.game.addedPlayers.length);

			var players			= MyApp.game.players,
				len,
				i,
				infoText;

			// In case the user got back from final round, reset the boolean
			MyApp.game.isFinal	= false;

			if (ui.prevPage.attr('id') === 'page-add-players' && MyApp.game.addedPlayers.length) {
				len				= MyApp.game.players.length;
				// Add players to the game itself
				for (i = 0; i < MyApp.game.addedPlayers.length; i += 1) {
					MyApp.game.players.push({
						index: i + len,
						mask: 1 << i + len,
						name: MyApp.game.addedPlayers[i].name,
						score: 0,
						totalScore: MyApp.game.addedPlayers[i].totalScore || 0,
						won: MyApp.game.addedPlayers[i].won || 0,
						lost: MyApp.game.addedPlayers[i].lost || 0,
						newPlayer: MyApp.game.addedPlayers[i].newPlayer || false
					});
				}

				// Reset the game
				MyApp.game.restingPlayers	= [];
				MyApp.game.restingPlayer	= [];
				MyApp.game.teams			= [];
				MyApp.game.matches			= [];
				MyApp.game.teamA.players	= [];
				MyApp.game.teamB.players	= [];

				if (MyApp.game.players.length <= 10) {
					MyApp.game.createTeamCombinations();
					MyApp.game.createMatchCombinations();
				}
			}

			// Sort players by scores (descending)
			players.sort(MyApp.utils.compareScores);

			// Update list header and info with localizes strings
			MyApp.dom.updateListHeader('list-standings', 'listStandings', true);
			infoText	= MyApp.lang.infoAfter ? MyApp.lang.infoAfter + ' ' : '';
			infoText	+= MyApp.game.matchesPlayed + ' ';
			infoText	+= (MyApp.game.matchesPlayed === 1) ? 
								MyApp.lang.infoRound :
								MyApp.lang.infoRounds;
			MyApp.dom.updateListInfo('list-standings', infoText, false);			

			// Remove any old list items from the list
			MyApp.dom.emptyList('', 'list-standings');
			MyApp.dom.addToList('standings', players, 'list-standings');
		},

		// Initializes 'stopwatch' page.
		initStopwatchPage: function (event) {
			//console.log('MyApp.handlers.initStopwatchPage()');
		
			// Initialize stopwatch
			MyApp.stopwatch.init();
		},

		// Initializes a new game.
		// Checks that the game is setup correctly, i.e. duration of a round is 
		// set and there's enough players participating. If the check is passed
		// changes to the game page.
		initNewGame: function (event) {
			//console.log('MyApp.handlers.initNewGame()');
			// Duration of a round
			var durationValue		= MyApp.game.settings.duration,
			// Players added to the game
				playersAdded		= MyApp.game.addedPlayers,
			// Players stored in the storage
				playersStored		= MyApp.players.getAllPlayers() || [],
			// New players to be added to the storage
				newPlayers			= [],
			// Is 'save players automatically' enabled
				isSaveEnabled		= MyApp.utils.getItem('saveEnabled');

			if (!durationValue) {
				navigator.notification.alert(
					MyApp.lang.alertDurationMessage,		// Message
					null,									// Callback
					MyApp.lang.alertDurationTitle			// Title
				);
				// Prevent default event being triggered and event bubbling up on DOM tree
				event.preventDefault();
				event.stopPropagation();
				return;
			}

			if (playersAdded.length < 4) {
				navigator.notification.alert(
					MyApp.lang.alertPlayersMessage,			// Message
					null,									// Callback
					MyApp.lang.alertPlayersTitle			// Title
				);
				// Prevent default event being triggered and event bubbling up on DOM tree
				event.preventDefault();
				event.stopPropagation();
				return;
			}

			// If saving is enabled save added players to the storage if they're new
			if (isSaveEnabled) {
				// Filter players already stored from the added players
				newPlayers			= playersAdded.filter(MyApp.utils.filterByName, playersStored);
				// Add these new players to the storage
				MyApp.utils.addPlayers(newPlayers);
				//console.log(newPlayers);
			}
			
			// Save duration to the storage
			//MyApp.utils.addItem('duration', durationValue);

			//MyApp.handlers.startNewGame();
			MyApp.game.startNewGame();
		},

		// Initializes a new round.
		// Gets the next possible match setup that has not already been played
		// and checks that no player won't be resting twice before everybody has
		// rested at least once.
		// After the suitable match setup has been found populates the lists.
		initGamePage: function (event, ui) {
			//console.log('MyApp.handlers.initGamePage()');

			var len,
				i;
			
			if (ui.prevPage.attr('id') === 'page-add-players') {
				len		= MyApp.game.players.length;
				// Add players to the game itself
				for (i = 0; i < MyApp.game.addedPlayers.length; i += 1) {
					MyApp.game.players.push({
						index: i + len,
						mask: 1 << i + len,
						name: MyApp.game.addedPlayers[i].name,
						score: 0,
						totalScore: MyApp.game.addedPlayers[i].totalScore || 0,
						won: MyApp.game.addedPlayers[i].won || 0,
						lost: MyApp.game.addedPlayers[i].lost || 0,
						newPlayer: MyApp.game.addedPlayers[i].newPlayer || false
					});
				}

				// Reset the game
				MyApp.game.addedPlayers		= MyApp.game.players;
				MyApp.game.restingPlayers	= [];
				MyApp.game.restingPlayer	= [];
				MyApp.game.teams			= [];
				MyApp.game.matches			= [];
				MyApp.game.teamA.players	= [];
				MyApp.game.teamB.players	= [];

				// If total of players are no more than 10 players create all match combinations
				if (MyApp.game.players.length <= 10) {
					MyApp.game.createTeamCombinations();
					MyApp.game.createMatchCombinations();
				}

				// THIS FOR DEBUG ONLY
				/*
				for (var ii = 0 ; ii < MyApp.game.players.length ; ii += 1) {
					//console.log(MyApp.game.players[ii].index + ' ' + MyApp.game.players[ii].name + ' ' + MyApp.game.players[ii].mask);
				}
				*/

				// Create new teams with newly added players
				MyApp.game.createNewTeams();
			}

			if (MyApp.game.isFinal) {

				// Update the page header
				$('#page-game').find('[data-role="header"] h1')
					.text(MyApp.lang.headerFinal);

				// Hide the button for adding new players
				$('.button-settings').hide();

				// Show the game mode list and update game mode texts to match localized strings
				$('#list-final-game-mode')
					.show()
					.find('.list-side').removeClass('selected').end()
					.find('.game-mode').removeClass('selected').end()
					.find('.game-mode[data-value="on"]').text(MyApp.lang.contentStopwatch).end()
					.find('.game-mode[data-value="off"]').text(MyApp.lang.contentGoals).end()
					.find('.game-mode[data-value="' + MyApp.game.settings.gameMode + '"]').addClass('selected').end();
					//.siblings('.button-bar').addClass('disabled');

				// Update list title and info text
				MyApp.dom.updateListHeader('list-final-game-mode', 'listGameMode', true);
				
				// If Game Mode is previously selected, highlight the selection and show the footer buttons
				if ( MyApp.game.settings.gameMode ) {
					$('#list-final-game-mode').find('.list-side').addClass('selected');
					$('#footer-game').show();

					// Update list title and info text
					MyApp.dom.updateListInfo('list-final-game-mode', (MyApp.game.settings.gameMode === 'on' ? MyApp.lang.contentStopwatch : MyApp.lang.contentGoals) + ' ' + MyApp.lang.infoSelected , false);
				} else {
					$('#footer-game').hide();

					// Update list title and info text
					MyApp.dom.updateListInfo('list-final-game-mode', 'infoNotSet', true);
				}

				// Highlight the previously selected game duration
				$('#list-game-final-duration')
					.find('.duration[data-value="' + MyApp.game.settings.duration + '"]').addClass('selected').end()
					.find('.list-side').addClass('selected');

			} else {
				// Show the button for adding new players
				$('.button-settings').show();

				// Hide the game mode list
				$('#list-final-game-mode').hide();

				$('#footer-game').show();

				$('#list-game-final-duration').hide();

				MyApp.dom.updateListHeader('list-game-final-duration', 'listDuration', true);

				// Update the page header
				$('#page-game').find('[data-role="header"] h1')
					.text(MyApp.lang.round + ' ' + (MyApp.game.matchesPlayed + 1));
			}
			
			$.mobile.loading( 'hide' );

			MyApp.dom.emptyList('team', 'list-game-players-team-a');
			MyApp.dom.emptyList('team', 'list-game-players-team-b');

			MyApp.dom.addToList('team', MyApp.game.teamA.players, 'list-game-players-team-a');
			MyApp.dom.addToList('team', MyApp.game.teamB.players, 'list-game-players-team-b');

			if (MyApp.game.restingPlayer.length) {
				$('#list-game-players-resting').show();

				MyApp.dom.emptyList('resting', 'list-game-players-resting');
				MyApp.dom.addToList('resting', MyApp.game.restingPlayer, 'list-game-players-resting');
				MyApp.dom.updateListHeader('list-game-players-resting', MyApp.lang.listResting, false);
				MyApp.dom.updateListInfo('list-game-players-resting', '', '');

			} else {
				$('#list-game-players-resting').hide();

			}

			// Set team names
			MyApp.dom.updateListHeader('list-game-players-team-a', MyApp.lang.listTeam + ' ' + MyApp.game.teamA.name, false);
			MyApp.dom.updateListHeader('list-game-players-team-b', MyApp.lang.listTeam + ' ' + MyApp.game.teamB.name, false);

			MyApp.dom.updateListInfo('list-game-players-team-a', '', '');
			MyApp.dom.updateListInfo('list-game-players-team-b', '', '');

		},

		// Initializes a new round
		initNewRound: function () {
			//console.log('MyApp.handlers.initNewRound()');
			MyApp.stopwatch.resetTimer();
			MyApp.game.initNewRound();
		},

		// Initializes the final round
		initFinalRound: function () {
			//console.log('MyApp.handlers.initFinalRound()');
			MyApp.stopwatch.resetTimer();
			MyApp.game.initFinalRound();
		},

		// Starts the round.
		// Changes to stopwatch or round end page depending on whether this is a final round.
		// Resets the latest scores object
		startRound: function (event) {
			//console.log('MyApp.handlers.startRound()');
			var gameMode;

			if ($(this).parent().hasClass('disabled')) {
				return;
			}

			if (MyApp.game.isFinal) {
				// Get the game mode, i.e. whether to show stopwatch or not 
				gameMode	= $('#list-final-game-mode').find('.game-mode.selected').attr('data-value');

				if (gameMode === 'off') {
					$.mobile.changePage('#page-round-end');
					return;
				}
			}

			$.mobile.changePage('#page-game-stopwatch');
		},

		// Saves the round.
		// Gets the selected team that won the round and the selected goal 
		// difference, and based on those selections, saves the scores and
		// initializes new round
		saveRound: function (event) {
			//console.log('MyApp.handlers.saveRound()');

			if ($(this).parent().hasClass('disabled')) {
				return;
			}

			var teamName,
				goalDifference,
				pointsWon,
				teamWon,
				teamLost,
				i,
				isDraw				= false;

			// Reset the latest scores object
			MyApp.game.latestScores.pointsWon		= 0;
			MyApp.game.latestScores.playersAffected	= [];
			MyApp.game.latestScores.teamName		= '';

			// Get the selected team and goal difference
			teamName			= $('#list-round-won').find('.selected').attr('data-value');

			// Get the team that won and the points to be won
			if (teamName === 'draw') {
				isDraw				= true;
			} else {
				teamWon				= (MyApp.game.teamA.name === teamName) ? MyApp.game.teamA : MyApp.game.teamB;
				teamLost			= (MyApp.game.teamA.name === teamName) ? MyApp.game.teamB : MyApp.game.teamA;
				//console.log(teamWon);
			}

			MyApp.game.matchesPlayed += 1;

			if (MyApp.game.isFinal) {
				// Give winning players points
				for (i = 0; i < teamWon.players.length; i += 1) {
					teamWon.players[i].won			+= 1;
					teamWon.players[i].newPlayer	= false;
				}

				MyApp.players.updatePlayers(teamWon.players);

				// Give losing players points
				for (i = 0; i < teamLost.players.length; i += 1) {
					teamLost.players[i].lost		+= 1;
					teamLost.players[i].newPlayer	= false;
				}

				MyApp.players.updatePlayers(teamLost.players);

				// Show the alert and quit game
				teamName	= MyApp.lang.contentTeam + ' ' + teamName;
				teamName	= teamName.capitalize();
				navigator.notification.alert(
						teamName + ' ' + 
						MyApp.lang.alertGameOverMessage,		// Message
					function () {								// Callback
						MyApp.game.quitGame();
					},
					MyApp.lang.alertGameOverTitle				// Title
				);

			} else {
				goalDifference		= $('#list-round-goal-difference').find('.selected').attr('data-value');
				if (isDraw) {
					//console.log('isDraw');

					pointsWon								= 1;

					// Update the latest scores object
					MyApp.game.latestScores.pointsWon		= pointsWon;
					MyApp.game.latestScores.playersAffected	= MyApp.game.teamA.players.concat(MyApp.game.teamB.players);

					// Give all players points
					for (i = 0; i < MyApp.game.teamA.players.length; i += 1) {
						MyApp.game.teamA.players[i].score			+= pointsWon;
						MyApp.game.teamA.players[i].totalScore		+= pointsWon;
						MyApp.game.teamB.players[i].score			+= pointsWon;
						MyApp.game.teamB.players[i].totalScore		+= pointsWon;
					
					}
				} else {
					pointsWon		= (goalDifference === 'over') ? 3 : 2;

					// Update the latest scores object
					MyApp.game.latestScores.pointsWon		= pointsWon;
					MyApp.game.latestScores.playersAffected	= teamWon.players;
					MyApp.game.latestScores.teamName		= teamWon.name;

					// Give winning players points
					for (i = 0; i < teamWon.players.length; i += 1) {
						teamWon.players[i].score		+= pointsWon;
						teamWon.players[i].totalScore	+= pointsWon;
					}
				}

				// Change to 'standings' page
				$.mobile.changePage('#page-standings');

			}

		},

		// Quits the current game.
		// Resets game and changes to 'dashboard' page
		quitGame: function (event) {
			//console.log('MyApp.handlers.quitGame()');

			var i;
				navigator.notification.confirm(
				MyApp.lang.alertQuitMessage,			// message
				function (buttonIdx) {
					//console.log(buttonIdx);
					if (buttonIdx == '1') {

						// Update players and save them
						if (MyApp.game.teamA.players.length && MyApp.game.teamB.players.length) {
							for (i = 0; i < MyApp.game.teamA.players.length; i += 1) {
								MyApp.game.teamA.players[i].newPlayer	= false;
							}

							MyApp.players.updatePlayers(MyApp.game.teamA.players);

							for (i = 0; i < MyApp.game.teamB.players.length; i += 1) {
								MyApp.game.teamB.players[i].newPlayer	= false;
							}

							MyApp.players.updatePlayers(MyApp.game.teamB.players);

						}

						// Update resting players and save them
						if (MyApp.game.restingPlayer.length) {
							for (i = 0; i < MyApp.game.restingPlayer.length; i += 1) {
								MyApp.game.restingPlayer[i].newPlayer	= false;
							}

							MyApp.players.updatePlayers(MyApp.game.restingPlayer);
						}

						// Reset game
						MyApp.game.matches					= [];
						MyApp.game.matchesTaken				= [];
						MyApp.game.players					= [];
						MyApp.game.teams					= [];
						MyApp.game.teamA.players			= [];
						MyApp.game.teamB.players			= [];
						MyApp.game.addedPlayers				= [];
						MyApp.game.restingPlayers			= [];
						MyApp.game.restingPlayer			= [];
						MyApp.game.isFinal					= false;
						MyApp.game.settings.playersPerTeam	= 0;
						MyApp.game.settings.duration		= 0;
						MyApp.game.settings.gameMode		= 0;
						MyApp.game.matchesPlayed			= 0;
						MyApp.utils.deleteItem('duration');
						MyApp.game.latestScores.pointsWon		= 0;
						MyApp.game.latestScores.playersAffected	= [];
						MyApp.game.latestScores.teamName		= '';

						$.mobile.changePage('#page-dashboard');
					
					}
				},							// callback to invoke with index of button pressed
				MyApp.lang.alertQuitTitle	// title
				);
		},

		buttonPressed: function (event) {
			//console.log('MyApp.handlers.buttonPressed()');
			var target	= event.target.tagName.toLowerCase() === 'a' ?
							event.target :
							event.target.parentNode;

			$(target).addClass('button-highlight');
		
		},

		buttonReleased: function (event) {
			//console.log('MyApp.handlers.buttonReleased()');
			/*
			var target	= event.target.tagName.toLowerCase() === 'a' ?
							event.target :
							event.target.parentNode;

			$(target).removeClass('button-highlight');
			*/
			var page		= $.mobile.activePage,
				buttonBar	= page.find('.button-bar').length ? 
								page.find('.button-bar') : 
								page.find('.button-bar2');

			buttonBar.children('a').removeClass('button-highlight');

		
		},

		// Goes back on history
		goBack: function (event) {
			//console.log('MyApp.handlers.goBack()');

			history.back();
		},

		// Shows 'add more players' page and adds selected players to the game
		// and then goes back to the game
		addMorePlayers: function (event) {
			//console.log('MyApp.handlers.addMorePlayers()');
			$.mobile.changePage('#page-add-players');
		},

		// Shows 'rules' page
		showRules: function (event) {
			//console.log('MyApp.handlers.showRules()');
			$.mobile.changePage('#page-rules');
		},

		isInArray: function (arr, obj) {
			var i, len;

			for (i = 0, len = arr.length; i < len; i += 1) {
				if (arr[i] === obj) {
					return true;
				}
			}
			return false;
		},

		shuffleArray: function (arr) {
			//console.log('shuffleArray()');

			var i			= arr.length,
				j, tempi, tempj,
				started		= new Date(),
				stopped,
				timeTaken;

			if (i === 0) {
				return false;
			}

			while (i) {
				j = Math.floor( Math.random() * ( i + 1 ) );
				tempi = arr[i];
				tempj = arr[j];
				arr[i] = tempj;
				arr[j] = tempi;
				i -= 1;
			}

			stopped			= new Date();
			timeTaken		= stopped - started;
			//console.log(timeTaken);			
		},

		initRulesPage: function () {
			//console.log( 'MyApp.handlers.initRulesPage' );
			MyApp.handlers.showRulesOrInstructions( 'rules' );
		},

		showRulesOrInstructions: function ( type ) {
			var pageContent		= document.getElementById( 'page-rules-content' ),
			intro				= type === 'rules' ? MyApp.lang.rulesIntro : MyApp.lang.instructionsIntro,
			content				= type === 'rules' ? MyApp.lang.rulesContent : MyApp.lang.instructionsContent,
			outro				= type === 'rules' ? MyApp.lang.rulesOutro : '',
			header,
			fragmentElem		= document.createDocumentFragment(),
			containerElem,
			headerElem;

		for ( header in content ) {
			containerElem				= document.createElement( 'div' );
			containerElem.className		= 'page-rules-container';

			headerElem					= document.createElement( 'h1' );
			headerElem.innerHTML		= header;

			containerElem.appendChild( headerElem );
			containerElem.innerHTML		+= content[header];

			fragmentElem.appendChild( containerElem );
		}

		pageContent.innerHTML			= intro;
		pageContent.appendChild( fragmentElem );
		pageContent.innerHTML			+= outro;
			
		},

		toggleRulesList: function () {
			//console.log( 'MyApp.handlers.toggleRulesList' );
			$( this ).parent().siblings().find( 'p' ).hide();
			$( this ).nextAll().toggle();
		},

		toggleRulesContent: function () {
			//console.log( 'MyApp.handlers.toggleRulesContent' );
			$( this ).addClass( 'button-active' ).siblings().removeClass( 'button-active' );

			if ( $( this ).hasClass( 'button-show-rules' ) ) {
				MyApp.handlers.showRulesOrInstructions( 'rules' );
			} else {
				MyApp.handlers.showRulesOrInstructions( 'instructions' );
			}
		},
		
		loadUrl: function( event ) {
			//console.log( 'loadUrl() ' );
			var url		= this.getAttribute( 'rel' );
			navigator.app.loadUrl( url, { openExternal:true } );
			return false;
		}
	};

	// Language traslations
	MyApp.language = {		
		fi: {
			// General -- 3
			'onePlayer'				: 'pelaaja',
			'multiplePlayers'		: 'pelaajaa',
			'noPlayers'				: 'pelaajia ei',

			// Page headers -- 9
			'round'					: 'erä',
			'headerSettings'		: 'asetukset',
			'headerPlayers'			: 'pelaajat',
			'headerAddPlayers'		: 'pelin pelaajat',
			'headerFinal'			: 'finaali',
			'headerStandings'		: 'pistetilanne',
			'headerStopwatch'		: 'pelikello',
			'headerRules'			: 'säännöt & ohjeet',
			'headerScoring'			: 'pisteytys',

			// List headers -- 11
			'listPlayers'			: 'pelaajat',
			'listDuration'			: 'erän pituus',
			'listPlayersGame'		: 'pelin pelaajat',
			'listAddPlayers'		: 'lisää pelaajia',
			'listPickPlayers'		: 'valitse pelaajia',
			'listTeam'				: 'joukkue',
			'listResting'			: 'lepovuorossa',
			'listWinners'			: 'voittajat',
			'listGoals'				: 'maaliero',
			'listStandings'			: 'pistetilanne',
			'listGameMode'			: 'pelimuoto',

			// List infos -- 14
			'infoToDatabase'		: 'tietokantaan',
			'infoToGame'			: 'peliin',
			'infoNotSet'			: 'ei määritetty',
			'infoSaved'				: 'tallennettu',
			'infoAdded'				: 'lisätty',
			'infoSelected'			: 'valittu',
			'infoDuration'			: 'minuuttia valittu',
			'infoAfter'				: '', // after 3 rounds : 3 erän jälkeen
			'infoRound'				: 'erän jälkeen',
			'infoRounds'			: 'erän jälkeen',
			'infoPoint'				: 'piste',
			'infoPoints'			: 'pistettä',
			'infoTotal'				: 'yhteensä',
			'infoTeam'				: 'joukkue',

			// List contents -- 11
			'contentTeam'			: 'joukkue',
			'contentGoalsOver'		: 'vähintään 4 maalia',
			'contentGoalsUnder'		: 'alle 4 maalia',
			'contentDraw'			: 'tasapeli',
			'contentAddPlayers'		: 'lisätäksesi pelaajia paina "+"-nappia',
			'contentNewPlayer'		: 'uusi pelaaja',
			'contentTimesWon'		: 'voitot',
			'contentTimesLost'		: 'häviöt',
			'contentPointsAlltime'	: 'pisteet yht.',
			'contentStopwatch'		: 'peliaika',
			'contentGoals'			: 'maalit',

			// Placeholders for input elements -- 1
			'placeholderName'		: 'kirjoita nimi',

			// Alerts -- 14
			'alertPlayersTitle'		: 'Virhe',
			'alertPlayersMessage'	: 'Peli vaatii vähintään 4 pelajaa.',
			'alertDurationTitle'	: 'Virhe',
			'alertDurationMessage'	: 'Määritä erän pituus.',
			'alertRoundEndedTitle'	: 'Erä loppui',
			'alertRoundEndedMessage': 'Paina OK jatkaaksesi.',
			'alertGameOverTitle'	: 'Peli loppui',
			'alertGameOverTeam'		: 'Joukkue',
			'alertGameOverMessage'	: 'voitti pelin.',
			'alertInvalidTitle'		: 'Virhe',
			'alertInvalidMessage'	: 'Virheellinen merkki. Ainoastaan aakkoset, pilkku, väliviiva ja -lyönti ovat sallittuja.',
			'alertQuitTitle'		: 'Lopeta peli',
			'alertQuitMessage'		: 'Haluatko varmasti lopettaa pelin? Saadut pisteet tallennetaan, mutta ketään ei julisteta voittajaksi.',
			'alertStopwatch'		: 'Jotta pelikello toimisi moitteettomasti, tarkista että puhelin on lentotilassa ja näytön automaattinen sammuminen on asetettu yli erän pituuden.',

			// Button labels -- 21
			'buttonPlayers'			: 'pelaajat',
			'buttonNewGame'			: 'uusi peli',
			'buttonRules'			: 'säännöt & ohjeet',
			'buttonSetup'			: 'pelin asetukset',
			'buttonBack'			: 'takaisin',
			'buttonDelete'			: 'tuhoa',
			'buttonRemove'			: 'poista',
			'buttonAdd'				: 'lisää',
			'buttonCancel'			: 'peruuta',
			'buttonQuit'			: 'lopeta',
			'buttonSave'			: 'tallenna',
			'buttonNextRound'		: 'seuraava erä',
			'buttonFinalRound'		: 'pelaa finaali',
			'buttonStartGame'		: 'aloita peli',
			'buttonStartRound'		: 'aloita erä',
			'buttonPlay'			: 'toista',
			'buttonPause'			: 'pysäytä',
			'buttonReset'			: 'nollaa',
			'buttonSkip'			: 'lopeta',
			'buttonRulesFooter'			: 'Säännöt',
			'buttonInstructionsFooter'	: 'Ohjeet',

			// Rules -- 10
			'rulesIntro'			: '<p>Pistemestari on salibandyyn ja sählyyn tarkoitettu pelisovellus, joka sopii erityisen hyvin pienille ryhmille. Pistemestarissa ideana on, että jokainen pelaaja kerää henkilökohtaisia pisteitä, joita saa jatkuvasti vaihtuvien joukkueiden menestyksen perusteella. Pelisovelluksen on kehitellyt suomalainen salibandylegenda Jarmo Perttilä.</p><p>Harraste- ja kuntopeleihin tarkoitetussa Pistemestari -taulukkosählyssä, kun kenttä ja maalit usein ovat pienet ja kaukalokin voi puuttua, on sählyn pelaaminen mielekkäämpi ja tarkoituksenmukaisempi vaihtoehto salibandyn sijaan. Pääsääntöisesti sählyssä noudatetaan <a class="external-link" href="#" rel="http://salibandy.net/kilpailutoiminta/saannot-ja-ohjeet">salibandyn sääntöjä</a>, mutta joitakin poikkeuksia on:</p>',
			'rulesContent'			: {
										'- Pelialue'								: '<p>Pelialue on käytettävissä oleva liikuntatila. Jos pallo menee paikkaan missä sitä on mahdoton pelata, peliä jatketaan sisäänlyönnillä, muutoin peli jatkuu pallon ollessa pelattavissa. Myös salibandykaukaloa on mahdollista käyttää.</p>',
										'- Maali ja maalialue'						: '<p>Maalin kokoa ei ole määritelty, mutta pelatessa ilman maalivahteja parhaiten peliin soveltuvat isommat harrastemaalit, joiden koko on n. 90 x 105-110 cm. Myös nk. sählymaalit (90 x 60 cm) soveltuvat peliin erinomaisesti.</p><p>Käytettäessa sählymaaleja, maalin edessä on puoliympyrän muotoinen maalialue, jonka säde on 1,5 m. Pelaaja ei saa koskettaa millään kehonsa osalla maalialuetta (jos sellainen on). Maalialueen yli voi kuitenkin astua tai hypätä. Maalialueella saa pelata mailalla. Hyökkääjäpelaajan maalialuerikkomuksesta tuomitaan vapaalyönti ja puolustuspelaajan maalialuerikkomuksesta on seurauksena rangaistuslyönti.</p>',
										'- Erotuomari'								: '<p>Pistemestarissa ei ole erotuomareita, vaan pelaajat ohjaavat ottelut itse pelin ohessa. Tärkeäksi koetuista säännöistä on kuitenkin hyvä sopia etukäteen pelaajien kesken.</p>',
										'- Pelin kulku'								: '<p>Pistemestari koostuu yksittäisistä minipeleistä, jotka vaihtuvat määritellyn erän keston välein. Kustakin minipelistä jaetaan voittajajoukkueen pelaajille 3 (maaliero väh. 4 maalia) tai 2 (maaliero alle 4maalia) pistettä. Tasapelistä kaikki pelivuorossa olleet pelaajat saavat yhden pisteen ja tappiosta nolla. Jotta epätasainen ottelu ei kestäisi liian kauan, minipeli katkeaa maalieron kasvaessa neljään maaliin.</p><p>Pelattaessa parittomalla määrällä pelaajia, yksi pelaaja lepää yhden minipelin vuorollaan. Mikäli pelataan useampi pelikierros, kuin on osallistuvia pelaajia, sovellus arpoo toisen kierroksen lepovuorot sattumanvaraisesti, ensimmäisen kierroksen vaikuttamatta järjestykseen.<p>Pelaajien pelattua ennalta sovitun määrän minipelejä, pelataan pelivuoron lopuksi finaali, jossa enemmän pisteitä keränneet pelaajat kohtaavat vähemmän pisteitä keränneet pelaajat. Parittomalla pelaajamäärällä pelatessa vähemmän pisteitä keränneet saavat yhden ylimääräisen pelaajan. Finaali voidaan pelata joko tiettyyn maalimäärään tai ajalla, jolloin vaihtoehtoina mobiilisovelluksessa on 2, 3, 4, 5, 8, 10, 12 ja 15 minuuttia.</p>',
										'- Joukkueen koko ja maalivahdin käyttö'	: '<p>Peliä voidaan pelata maalivahdeilla tai ilman. Ilman maalivahteja pelatessa kaikki pelaajat ovat kenttäpelaajia. Kerrallaan kentällä voi olla 3-5 pelaajaa / joukkue. Pelaajien lukumäärä tulee mukauttaa kentän koon mukaan. Vähimmäismäärä on kolme pelaajaa / joukkue. Vaihtopelaajien määrää ei ole rajattu, mutta suositeltavaa on, että vaihtopelaajia on korkeintaan saman verran kuin kenttäpelaajiakin.</p>',
										'- Pelin aloitus'							: '<p>Ensimmäisenä mainittu joukkue aloittaa pelin syöttämällä pallon hyökkäyssuuntaan nähden taaksepäin keskipisteestä. Aloittava joukkue vastaa kellon käynnistämisestä.</p>',
										'- Sääntörikkeet'							: '<p>Jos maalintekotilanteessa puolustava joukkue tekee sääntörikkeen, jonka tarkoituksena on estää maali, on seurauksena rangaistuslyönti. Rangaistuslyönti suoritetaan pelaajien sopimalla tavalla, esimerkiksi vapaalyönti oman maalin edustalta tyhjään vastustajan maaliin.</p><p>Muissa tilanteissa tapahtuneista rikkeistä seuraa vapaalyönti. Vapaalyönti ja sisäänlyönti voivat mennä suoraan maaliin.</p>',
										'- Pelin jatkaminen maalin jälkeen'			: '<p>Hyväksytyn maalin jälkeen peli jatkuu sen joukkueen, joka ei tehnyt maalia, aloituslyönnillä keskipisteestä. Aloituslyönti tulee suorittaa taaksepäin hyökkäyssuuntaan nähden.</p>',
										'- Paremmuuden jatkaminen tasapisteissä'	: '<p>Pistemestari –mobiilisovellus arpoo pelaajat paremmuusjärjestykseen pisteiden ollessa tasan.</p>'
									},
			'rulesOutro'			: '<p>Mainitut säännöt ovat ohjeistuksia ja niitä voidaan pelaajien niin sopiessa soveltaa pelialueen, pelaajamäärän tai muiden vaikuttavien seikkojen mukaan. Tarkemmat sovelluksen käyttöohjeet löytyvät osoitteesta <a href="http://salibandy.net/pistemestari" target="_blank">salibandy.net/pistemestari.</a></p>',

			// Instructions -- 4
			'instructionsIntro'		: '<p>Jotta sovelluksen kello toimisi katkeamatta erien ajan, tulee puhelin asettaa lentotilaan ja näytön virransäästötilaan siirtymisajaksi pitempi aika, kuin erien pituus. Saapuva puhelu ja laitteen siirtyminen virransäästötilaan pysäyttävät sovelluksen sekuntikellon.</p>',
			'instructionsContent'	: {
										'- Pelaajat'			: '<p>Tässä valikossa pääset tarkastelemaan sovellukseen aiemmin tallennettuja pelaajaprofiileita. Näet täällä myös kunkin pelaajan minipeleistä kerätyt kokonaispisteet sekä finaalien voitot.</p><p>Myös pelaajien poistaminen ja lisääminen sovelluksen tietokannasta tapahtuu tässä valikossa. Pelaajien lisäämiseksi kirjoita uuden pelaajan nimi "Kirjoita nimi" –kenttään ja paina "+". Usean pelaajan lisääminen onnistuu erottamalla nimet pilkulla. Poistaaksesi pelaajan paina punaista ruksia pelaajan nimen jälkeen.</p>',
										'- Uusi peli'			: '<p>Tässä valikossa pääset aloittamaan uuden Pistemestari –pelituokion. Ensiksi tulee valita erän pituus ja osallistuvat pelaajat. Erän pituus valitaan painamalla haluttua minuuttimäärää. Pelaajia voidaan lisätä valitsemalla "+" ja valitsemalla osallistuvat pelaajat joko tallennettujen pelaajien joukosta tai lisäämällä uuden pelaajan "Lisää pelaajia" –toiminnolla (muista tallentaa pelaaja painamalla "+"). Kun kaikki osallistuvat pelaajat on lisätty, tallennetaan valinnat valitsemalla "Tallenna". Kun erän pituus ja osallistuvat pelaajat on valittu, valitaan "Aloita peli".</p><p>Nyt sovellus näyttää seuraavan erän joukkueet sekä lepovuorossa olevan pelaajan. Joukkuejako ilmoitetaan osallistuville pelaajille ja joukkueet erotellaan esimerkiksi liivein. Ylempänä mainittu joukkue aloittaa pelin aloituslyönnillä ja huolehtii kellonkäynnistämisestä. Peli aloitetaan valitsemalla "Aloita erä", jonka jälkeen kello käynnistetään valitsemalla "Toista".</p><p>Kellon voi keskeyttää valitsemalla "Pysäytä" ja jatkaa valitsemalla "Toista". Mikäli toinen joukkue saavuttaa neljän maalin johdon, voidaan erä lopettaa kesken valitsemalla "Lopeta". Mikäli neljän maalin eroa ei synny ja peliaika kuluu loppuun, ilmoittaa sovellus peliajan päättymisestä äänimerkillä (muista asettaa soittoäänen voimakkuus tarpeeksi lujaksi). Pelin jälkeen ilmoitetaan erän tulos valitsemalla näytöltä ottelun voittanut joukkue tai tasapelin sattuessa "Tasapeli". Lisäksi jommankumman joukkueen voittaessa valitaan vielä maaliero valitsemalla "Vähintään 4 maalia" tai "Alle 4 maalia", riippuen lopputuloksesta. Erän pisteet vahvistetaan ja tallennetaan valitsemalla "Tallenna".</p><p>Sovellus näyttää jokaisen erän jälkeen sen hetkisen pistetilanteen. Tässä valikossa voidaan valita, jatketaanko peliä uudella erällä, pelataanko finaali vai lopetetaanko peli. Valittaessa "Seuraava erä" sovellus ilmoittaa seuraavan erän joukkueet ja lepovuorossa olevan pelaajan kuten ennen edellistäkin erää.</p><p>Valitessa "Pelaa finaali" sovellus jakaa pelaajat kahteen joukkueeseen sen hetkisen pistetilanteen mukaan siten, että enemmän pisteitä keränneet pelaajat muodostavat yhden ja vähemmän pisteitä keränneet toisen joukkueen. Finaalin pelimuodoksi voidaan valita joko "Peliaika" tai "Maalit". Valitessa "Peliaika" sovellus ehdottaa finaalin peliajaksi vaihtoehtoja, joista soveltuvin valitaan painamalla kyseistä minuuttimäärää kuvaavaa numeroa. Valittaessa "Maalit" pelaajat sopivat keskenään mihin maalimäärään finaali pelataan. Finaali aloitetaan valitsemalla "Aloita erä" ja pelatessa ajalla vielä tämän jälkeen käynnistetään kello valitsemalla "Toista". Kello toimii kuten alkuerissäkin. Finaalin päätyttyä ilmoitetaan voittanut joukkue ja "Lopeta". Sovellus palaa aloitusvalikkoon.</p><p>Valitessa "Lopeta", peli lopetetaan ja kerätyt pisteet sekä pelatut ottelut tallennetaan, mutta ketään ei julisteta pelin voittajaksi. Sovellus palaa aloitusvalikkoon.</p>',
										'- Säännöt & ohjeet'	: '<p>Valikosta löytyy Pistemestarin sääntösovellukset sekä mobiilisovelluksen käyttöohjeet. Lisää sääntöjä ja ohjeita löytyy osoitteesta <a class="external-link" href="#" rel="http://salibandy.net/pistemestari">salibandy.net/pistemestari</a></p>'
									}
			
		},

		en: {

			// General -- 3
			'onePlayer'				: 'player',
			'multiplePlayers'		: 'players',
			'noPlayers'				: 'no players',

			// Page headers -- 9
			'round'					: 'round',
			'headerSettings'		: 'game settings',
			'headerPlayers'			: 'players',
			'headerAddPlayers'		: 'players participating',
			'headerFinal'			: 'final round',
			'headerStandings'		: 'standings',
			'headerStopwatch'		: 'stopwatch',
			'headerRules'			: 'rules & instructions',
			'headerScoring'			: 'scoring',

			// List headers -- 11
			'listPlayers'			: 'players',
			'listDuration'			: 'duration',
			'listPlayersGame'		: 'players participating',
			'listAddPlayers'		: 'add players',
			'listPickPlayers'		: 'pick players',
			'listTeam'				: 'team',
			'listResting'			: 'resting',
			'listWinners'			: 'winners',
			'listGoals'				: 'goal difference',
			'listStandings'			: 'standings',
			'listGameMode'			: 'game mode',

			// List infos -- 14
			'infoToDatabase'		: 'to database',
			'infoToGame'			: 'to game',
			'infoNotSet'			: 'not set',
			'infoSaved'				: 'saved',
			'infoAdded'				: 'added',
			'infoSelected'			: 'selected',
			'infoDuration'			: 'minutes selected',
			'infoAfter'				: 'after', // after 3 rounds : 3 erän jälkeen
			'infoRound'				: 'round',
			'infoRounds'			: 'rounds',
			'infoPoint'				: 'point',
			'infoPoints'			: 'points',
			'infoTotal'				: 'total of',
			'infoTeam'				: 'team',

			// List contents -- 11
			'contentTeam'			: 'team',
			'contentGoalsOver'		: 'at least 4 goals',
			'contentGoalsUnder'		: 'under 4 goals',
			'contentDraw'			: 'draw',
			'contentAddPlayers'		: 'to add players tap "+"-button',
			'contentNewPlayer'		: 'new player',
			'contentTimesWon'		: 'won',
			'contentTimesLost'		: 'lost',
			'contentPointsAlltime'	: 'total points',
			'contentStopwatch'		: 'stopwatch',
			'contentGoals'			: 'goals',

			// Placeholders for input elements -- 1
			'placeholderName'		: 'type name',

			// Alerts --- 14
			'alertPlayersTitle'		: 'Error',
			'alertPlayersMessage'	: 'Game requires at least 4 players.',
			'alertDurationTitle'	: 'Error',
			'alertDurationMessage'	: 'Set the duration of a round.',
			'alertRoundEndedTitle'	: 'Round Ended',
			'alertRoundEndedMessage': 'Click OK to continue.',
			'alertGameOverTitle'	: 'Game Over',
			'alertGameOverTeam'		: 'Team',
			'alertGameOverMessage'	: 'won the game.',
			'alertInvalidTitle'		: 'Error',
			'alertInvalidMessage'	: 'Not a valid character. Only alphabets, hyphen, comma and space are accepted.',
			'alertQuitTitle'		: 'Quit Game',
			'alertQuitMessage'		: 'Are you sure you want to quit the game? Points obtained will be saved but no one will be declared winner.',
			'alertStopwatch'		: 'For stopwatch to function properly please ensure that airplane mode is enabled and screen timeout is set over round\'s duration.',

			// Button labels -- 21
			'buttonPlayers'			: 'players',
			'buttonNewGame'			: 'new game',
			'buttonRules'			: 'rules & instructions',
			'buttonSetup'			: 'game setup',
			'buttonBack'			: 'back',
			'buttonDelete'			: 'delete',
			'buttonRemove'			: 'remove',
			'buttonAdd'				: 'add',
			'buttonCancel'			: 'cancel',
			'buttonQuit'			: 'quit',
			'buttonSave'			: 'save',
			'buttonNextRound'		: 'next round',
			'buttonFinalRound'		: 'play final',
			'buttonStartGame'		: 'start the game',
			'buttonStartRound'		: 'start the round',
			'buttonPlay'			: 'play',
			'buttonPause'			: 'pause',
			'buttonReset'			: 'reset',
			'buttonSkip'			: 'skip',
			'buttonRulesFooter'			: 'Rules',
			'buttonInstructionsFooter'	: 'Instructions',

			// Rules -- 10
			'rulesIntro'			: '<p>The Floorball Points Master is a game application of  Floorball adapted especially well for smaller groups of players, when playing on a full size field is not meaningful or when there just is not large fields to play on. The basic idea with the Floorball Points Master is that each player is collecting personal points, which they gather in the games based on the continuously changing team’s performance. The game application is originally created by the Finnish Floorball legend Mr. Jarmo Perttilä.</p><p>The Floorball Points Master is aimed for recreational and training purposes, when the field and the goals could be smaller and you might not have a rink. It is up to the players of Points Master if they play with goalies or without. The rules are applied <a class="external-link" href="#" rel="http://salibandy.net/kilpailutoiminta/saannot-ja-ohjeet">Floorball rules</a>, with some exceptions:</p>',
			'rulesContent'			: {
										'- Game Area'								: '<p>You can use any available sporting area for playing, from a squash box to a sports hall. If the ball ends up in place where you can’t play it the game is continued with a hit in. Otherwise the game continues as long as the ball is playable. If you are using a Floorball rink and the ball bounces back in continue playing.</p>',
										'- Goal and goal area'					: '<p>There are no rules for the goal size in Floorball Points Master, but if you play without a goalie, the best suitable goals are big recreational goals 90 x 110 cm. But you can also play in small goals (90 x 60 cm), which gives the game an extra twist.</p><p>If you are using the small goals (90 x 60 cm), you need to tape a small half circle goal area, with a radius of 1,5 meters. The players are not allowed to touch the goal area with any part of their body, if you are using a goal area. You can however jump or step over the goal area. It is also allowed to play with your stick in the goal area. If a player from the attacking team commits a goal area foul a free hit is given and if the player of the defending team is making the fault, then a penalty shot is giving.</p>',
										'- Referee'							: '<p>In the Floorball Points Master there is no referee in the game, so the teams referee the game by themselves while playing. If it is a part of a team practice the coach can act as a referee.</p>',
										'- Running the game'							: '<p>The Floorball Points Master is consisting of single mini games, which are changing based on the pre-set game time. From each mini game the winning team can get 3 points (if they win with four goals), 2 points (if they win with less than 4 goals). If the mini game ends in a draw all players from both teams receives one point each and if you lose the mini game you receive no points at all. To prevent the unequal games to last too long, the mini game ends if the goal difference is four goals.</p><p>If you have an uneven number of players, one player is in principle resting one mini game at their turn. If you are playing more rounds than what there are players, the application will then for the second round ballot who will be resting based randomly.</p><p>When the players have played the pre-set number of mini games, you play a “Grande Finale” in the end of the session, where the players that have collected the most points are playing against the team of players who have collected the least points. If there are an uneven number of players, the lower scoring players are having one substitute. The Grande Finale can be played to a certain number of goals or with a fixed time, then the mobile application gives the following alternatives 2, 3, 4, 5, 8, 10, 12 or 15 minutes.</p>',
										'- Team size and the use of goalkeepers'	: '<p>You can play the game either with or without goalkeepers. If you play without goalkeepers all players are considered to be field players. There can be between 3-5 players per team on the field. You need to adjust the number of players to the size of the field. The minimum number of players is always 3, in order to have a proper game. There can be any number of substitute players, but it is not recommended to have more than the equal amount of substitutes than there are players on the field.</p>',
										'- Faults'							: '<p>If the defending player in a goal scoring situation makes a fault, which is aimed to prevent a goal from being scored, it always results in a penalty shoot. The way the penalty shot is taken, can be decided by the players, for example with a free hit from in front of their own goal to the empty opponent net.</p><p>In all other cases when a fault is committed, there is a free hit given. A free hit and a hit in can go straight into the goal.</p>',
										'- The game continuation after a goal'							: '<p>After an approved goal, the game continues with a free hit from the middle of the field for the team who didn’t score a goal. The free hit has here to be given backwards towards the own goal.</p>',
										'- How to settle the player ranking in equal points'		: '<p>The Floorball Points Master application randomly ballots  the ranking of the players if they are on even points after the group stage.</p>'
									},
			'rulesOutro'			: '<p>The mentioned rules are recommendations for how to play the Floorball Points Master game and they can be changed or altered, when it comes to the size of the field, number of players or other criteria’s, if the players agree to do that. More specific user manuals are found at: <a class="external-link" href="#" rel="http://salibandy.net/pistemestari">salibandy.net/pistemestari</a></p>',

			// Instructions -- 4
			'instructionsIntro'		: '<p>Turn on Flight mode from Settings and also from Settings define Screen timeout to longer than game duration - otherwise Stopwatch will not work correctly. Incoming call and screen saver will stop the Stopwatch.</p>',
			'instructionsContent'	: {
										'- Players'			: '<p>This menu item displays previously stored player profiles including points earned from mini games and finals.</p><p>This menu item enables you to add and remove players from the memory. Adding a player: write name of the player in the "type player" field and click "+". Remove player by clicking red cross at the end player row.</p>',
										'- New game'			: '<p>This menu item enables you to start a new game. First you have to define mini game duration and participant plyers. Game duration will be defined by selecting predefined amount of minutes. You can select players for the game by clicking "+" and then picking participating players from the player list. You can also add new players into the list by writing name of the player in the "type player" field and clicking "+". When all participating players have been selected the save selection by clicking "Save". When game duration is defined and players selected then click "Start the Game"</p><p>Application will display teams and resting players. Inform players what is their team and how to separate teams, like using vest. First mentioned team in application will start the game with a hit and make sure that stopwatch will run. Start the game by clicking "Start the round", and start the stopwatch by clicking "Play".</p><p>You can pause the stopwatch by clicking "Pause" and continue clicking "Play". If one of the teams will lead with four goals, you can finish the round by clicking "Skip". If the goal difference is less than four goals and time is off you will hear a sound (remember to set audio level high enough). After the game define round result by clicking winning team or "Draw". In case of winning team define goal difference by clicking either "At least 4 Goals" or "Under 4 Goals" depending on the result. Store round result by clicking "Save"</p><p>Application will display the current standings after every round. You can select whether to continue with a next round or play finals or end the game. If you select "Next Round" application will display teams and resting players.</p><p>If you select "Play Final" application will divide players into two teams based on current standings: one team will consist of players with highest standings and the other team will consist of palyers with lower standings. Final game mode can be selected either "Stopwatch" or "Goals". If stopwatch-mode is selected then game duration will be defined by selecting predefined amount of minutes. If goals-mode is selected then teams should agree on the amount of goals required. Final game will start by clicking "Start the Round" and in case of stopwatch-mode start the stopwatch by clicking "Play". Stopwatch functions like in earlier rounds. After final game define the winning team by selecting team and clicking "Quit". Application will return to Main screen.</p><p>When "Quit" is clicked, game is over and player statistics will be stored in phone memory. </p>',
										'- Rules & Instructions'	: '<p>This menu item displays Pointmaster rules and instructions how to use this application. More information: <a href="http://salibandy.net/pistemestari" target="_blank">salibandy.net/pistemestari</a></p>'
									}
		}
	};

	// Language object set on init() function, or whenever user changes 
	// the language setting
	MyApp.lang		= {};

	// PhoneGap, jQuery & device is ready now -> initialize - COMMENT THIS IF RUNNING ON DESKTOP BROWSER
	$(document).on('deviceready', init);

	// jQuery Mobile is ready now -> override defaults
	$(document).on('mobileinit', function () {
		//console.log('mobileinit');

		// Set the default page transition
		$.mobile.defaultPageTransition	= 'none';

		// Ignore automatic style enhancements for element that has 'data-enhance=false' attribute
		//$.mobile.ignoreContentEnabled	= 'false';
	});

	// THIS IS ONLY FOR DEBUGGING IN DESKTOP BROWSER - COMMENT IF RUNNING ON DEVICE 
	//$(document).ready(init);

}(window.MyApp = window.MyApp || {}, jQuery));

/*
* Symbolset
* www.symbolset.com
* Copyright © 2012 Oak Studios LLC
*
* Upload this file to your web server
* and place this before the closing </body> tag.
* <script src="webfonts/ss-pika.js"></script>
*/

if (/(MSIE [7-9]\.|Opera.*Version\/(10\.[5-9]|(11|12)\.)|Chrome\/([1-9]|10)\.|Version\/[2-4][\.0-9]+ Safari\/|Version\/(4\.0\.[4-9]|4\.[1-9]|5\.0)[\.0-9]+? Mobile\/.*Safari\/|Android [1-2]\.|BlackBerry.*WebKit)/.test(navigator.userAgent) && !/(IEMobile)/.test(navigator.userAgent)) {

  var ss_set={'notifications disabled':'\uD83D\uDD15','notification disabled':'\uD83D\uDD15','wheelchair accessible':'\u267F','notificationsdisabled':'\uD83D\uDD15','notificationdisabled':'\uD83D\uDD15','horizontal bar chart':'\uE574','downwards line chart':'\uD83D\uDCC9','wheelchairaccessible':'\u267F','line chart clipboard':'\uE2B5','downwards bar chart':'\uE573','medical thermometer':'\uF4B3','linechartclipboard':'\uE2B5','upwards line chart':'\uD83D\uDCC8','medicalthermometer':'\uF4B3','telephone disabled':'\uE300','downwardslinechart':'\uD83D\uDCC9','horizontalbarchart':'\uE574','wine glass sparkle':'\uF129','compact lightbulb':'\uEA85','telephonedisabled':'\uE300','navigation mobile':'\uEA2A','downwardsbarchart':'\uE573','upwards bar chart':'\uE572','charging battery':'\uEA14','navigationmobile':'\uEA2A','compactlightbulb':'\uEA85','cooking utensils':'\uF151','writing disabled':'\uE071','pie chart thirds':'\uE571','anatomical heart':'\uF4D0','wineglasssparkle':'\uF129','upwardslinechart':'\uD83D\uDCC8','compass navigate':'\uE680','music open book':'\uE966','compassnavigate':'\uE680','check clipboard':'\uE2B3','pencil disabled':'\uE071','upwardsbarchart':'\uE572','writingdisabled':'\uE071','anatomicalheart':'\uF4D0','cookingutensils':'\uF151','chargingbattery':'\uEA14','delete calendar':'\uF073','shopping basket':'\uE510','download folder':'\uEC76','remove calendar':'\uF071','deletecalendar':'\uF073','traffic camera':'\uF314','baseball glove':'\uF404','delivery truck':'\uE5E1','bathroom scale':'\uF4B7','steering wheel':'\uF313','downloadfolder':'\uEC76','weather online':'\uEA35','battery mobile':'\uEA2B','checkclipboard':'\uE2B3','download cloud':'\uEB00','pencildisabled':'\uE071','christmas tree':'\uD83C\uDF84','search barcode':'\uE531','phone disabled':'\uE300','check calendar':'\uF072','piechartthirds':'\uE571','medium battery':'\uEA11','wifi open book':'\uE969','picture folder':'\uEC87','download crate':'\uEB03','shoppingbasket':'\uE510','removecalendar':'\uF071','globe location':'\uE6D2','support ribbon':'\uD83C\uDF80','navigate right':'\u25BB','announcements':'\uD83D\uDCE2','picturefolder':'\uEC87','exercise bike':'\uF415','supportribbon':'\uD83C\uDF80','download file':'\uEC06','weatheronline':'\uEA35','baseballglove':'\uF404','globelocation':'\uE6D2','compass arrow':'\uE681','realty online':'\uEA33','browse online':'\uEA30','medical cross':'\uF4B0','trafficcamera':'\uF314','navigate down':'\uF501','traffic light':'\uD83D\uDEA6','deliverytruck':'\uE5E1','bathroomscale':'\uF4B7','female avatar':'\uD83D\uDC67','steeringwheel':'\uF313','scatter chart':'\uE578','rubber eraser':'\uE221','partly cloudy':'\u26C5','batterymobile':'\uEA2B','settings file':'\uEC0A','downloadcloud':'\uEB00','musicopenbook':'\uE966','dollar mobile':'\uEA27','tropical fish':'\uEF21','downloadcrate':'\uEB03','business user':'\uE407','empty battery':'\uEA13','christmastree':'\uD83C\uDF84','shopping cart':'\uE500','navigateright':'\u25BB','phonedisabled':'\uE300','mediumbattery':'\uEA11','notifications':'\uD83D\uDD14','download book':'\uE963','call disabled':'\uE300','previous page':'\u2397','download cart':'\uE505','dispense cash':'\uE542','checkcalendar':'\uF072','measuring cup':'\uF162','bell disabled':'\uD83D\uDD15','navigate left':'\u25C5','upload folder':'\uEC77','secure folder':'\uEC83','cash register':'\uE530','searchbarcode':'\uE531','uploadfolder':'\uEC77','trafficlight':'\uD83D\uDEA6','digital safe':'\uE541','dispensecash':'\uE542','downloadcart':'\uE505','partly sunny':'\u26C5','notification':'\uD83D\uDD14','thunderstorm':'\u26C8','shoppingcart':'\uE500','tape measure':'\uF036','businessuser':'\uE407','user profile':'\uE406','partlycloudy':'\u26C5','scatterchart':'\uE578','femaleavatar':'\uD83D\uDC67','delivery van':'\uE5E0','this side up':'\uE5E8','tropicalfish':'\uEF21','search house':'\uE612','compassarrow':'\uE681','medicalcross':'\uF4B0','map location':'\uE6D1','add calendar':'\uF070','train tunnel':'\uD83D\uDE87','donotdisturb':'\uE422','vinyl record':'\uE810','movie folder':'\uEC88','exercisebike':'\uF415','fast forward':'\u23E9','announcement':'\uD83D\uDCE2','securefolder':'\uEC83','skip forward':'\u23ED','cloud folder':'\uEC80','cashregister':'\uE530','belldisabled':'\uD83D\uDD15','downloadbook':'\uE963','calldisabled':'\uE300','rubber stamp':'\uE226','paint roller':'\uE225','table tennis':'\uF402','rubbereraser':'\uE221','navigatedown':'\uF501','mobile phone':'\uEA02','navigateleft':'\u25C5','wifiopenbook':'\uE969','picture file':'\uEC17','full battery':'\uD83D\uDD0B','high battery':'\uEA10','emptybattery':'\uEA13','heart mobile':'\uEA23','phone mobile':'\uEA24','dollarmobile':'\uEA27','weather vane':'\uF200','power mobile':'\uEA2C','browseonline':'\uEA30','realtyonline':'\uEA33','direct right':'\u25B9','lightbulb on':'\uEA83','picnic table':'\uEAB1','settingsfile':'\uEC0A','previouspage':'\u2397','download box':'\uEB02','measuringcup':'\uF162','upload cloud':'\uEB40','upload crate':'\uEB43','intersection':'\uF322','downloadfile':'\uEC06','rotate right':'\u21BB','skipforward':'\u23ED','deliveryvan':'\uE5E0','rotate left':'\u21BA','lock folder':'\uEC81','tapemeasure':'\uF036','female user':'\uD83D\uDC67','broken bone':'\uF4E1','credit card':'\uD83D\uDCB3','solar panel':'\uF281','stethoscope':'\uF4B4','male avatar':'\uD83D\uDC64','rubberstamp':'\uE226','search book':'\uE967','eye surgery':'\uF4E0','searchhouse':'\uE612','tabletennis':'\uF402','paintroller':'\uE225','open folder':'\uD83D\uDCC2','check heart':'\uF4D1','alarm clock':'\u23F0','mobilephone':'\uEA02','thermometer':'\uF201','walky talky':'\uEA03','delete cart':'\uE504','digitalsafe':'\uE541','traintunnel':'\uD83D\uDE87','fullbattery':'\uD83D\uDD0B','maplocation':'\uE6D1','highbattery':'\uEA10','userprofile':'\uE406','delete date':'\uF073','empty heart':'\u2661','low battery':'\uEA12','addcalendar':'\uF070','thumbs down':'\uD83D\uDC4E','heartmobile':'\uEA23','delete user':'\uE404','phonemobile':'\uEA24','remove user':'\uE402','lock mobile':'\uEA25','text mobile':'\uEA26','floppy disk':'\uD83D\uDCBE','euro mobile':'\uEA28','information':'\u2139','weathervane':'\uF200','directright':'\u25B9','powermobile':'\uEA2C','eighth note':'\u266A','remove cart':'\uE502','shop online':'\uEA31','bank online':'\uEA32','high volume':'\uD83D\uDD0A','vinylrecord':'\uE810','read online':'\uEA34','lightbulbon':'\uEA83','line charts':'\uE576','picnictable':'\uEAB1','cloudfolder':'\uEC80','picturefile':'\uEC17','direct down':'\u25BE','waterbottle':'\uF128','direct left':'\u25C3','moviefolder':'\uEC88','export file':'\uEC09','import file':'\uEC08','upload file':'\uEC07','photographs':'\uD83C\uDF04','downloadbox':'\uEB02','videocamera':'\uD83D\uDCF9','temperature':'\uF201','uploadcloud':'\uEB40','navigate up':'\uF500','uploadcrate':'\uEB43','fastforward':'\u23E9','partlysunny':'\u26C5','supplements':'\uF4B6','rotateright':'\u21BB','pill bottle':'\uF4B5','delete file':'\uEC04','remove file':'\uEC02','remove date':'\uF071','deletedate':'\uF073','linecharts':'\uE576','motorcycle':'\uF303','alarmclock':'\u23F0','brokenbone':'\uF4E1','pull quote':'\u201C','spoon fork':'\uF150','floor plan':'\uE610','lowbattery':'\uEA12','photograph':'\uD83C\uDF04','empty cart':'\uE507','emptyheart':'\u2661','half heart':'\uE1A0','navigateup':'\uF500','user group':'\uE400','play video':'\uE8A1','removedate':'\uF071','deletecart':'\uE504','lockmobile':'\uEA25','house sale':'\uE613','textmobile':'\uEA26','navigation':'\uE670','automobile':'\uD83D\uDE98','thumbsdown':'\uD83D\uDC4E','euromobile':'\uEA28','directions':'\uE672','rss mobile':'\uEA29','disapprove':'\uD83D\uDC4E','maleavatar':'\uD83D\uDC64','calculator':'\uE551','creditcard':'\uD83D\uDCB3','rotateleft':'\u21BA','removecart':'\uE502','down right':'\u2B0A','flower tag':'\uE103','shoponline':'\uEA31','lockfolder':'\uEC81','bankonline':'\uEA32','locomotive':'\uD83D\uDE82','eyesurgery':'\uF4E0','deleteuser':'\uE404','readonline':'\uEA34','checkheart':'\uF4D1','descending':'\u25BE','wine glass':'\uD83C\uDF77','heart book':'\uE962','femaleuser':'\uD83D\uDC67','directdown':'\u25BE','no smoking':'\uD83D\uDEAD','hair dryer':'\uEA88','cargo ship':'\uE5E3','pillbottle':'\uF4B5','containers':'\uE5E6','searchbook':'\uE967','floppydisk':'\uD83D\uDCBE','directleft':'\u25C3','solarpanel':'\uF281','left right':'\u2B0C','scale down':'\uEE05','hard drive':'\uE7B0','exportfile':'\uEC09','thissideup':'\uE5E8','importfile':'\uEC08','thumbnails':'\uE9A3','uploadfile':'\uEC07','eighthnote':'\u266A','attachment':'\uD83D\uDCCE','visibility':'\uD83D\uDC40','openfolder':'\uD83D\uDCC2','removeuser':'\uE402','bank check':'\uE544','binoculars':'\uE010','grid lines':'\uE206','smartphone':'\uEA02','upload box':'\uEB42','microphone':'\uD83C\uDFA4','departures':'\uF324','wheelchair':'\u267F','check date':'\uF072','cell phone':'\uD83D\uDCF1','walkytalky':'\uEA03','helicopter':'\uD83D\uDE81','interstate':'\uF320','low volume':'\uD83D\uDD09','deletefile':'\uEC04','eyedropper':'\uE200','connection':'\uEB85','screenshot':'\uE004','highvolume':'\uD83D\uDD0A','removefile':'\uEC02','paperclip':'\uD83D\uDCCE','palm tree':'\uD83C\uDF34','evergreen':'\uD83C\uDF32','piggybank':'\uE545','playvideo':'\uE8A1','gridlines':'\uE206','direct up':'\u25B4','money bag':'\uD83D\uDCB0','briefcase':'\uD83D\uDCBC','warehouse':'\uE602','rssmobile':'\uEA29','floorplan':'\uE610','checkdate':'\uF072','skip back':'\u23EE','calculate':'\uE551','next page':'\u2398','down left':'\u2B0B','housesale':'\uE613','thumbs up':'\uD83D\uDC4D','bear face':'\uD83D\uDC3B','pie chart':'\uE570','backspace':'\u232B','checkmark':'\u2713','badminton':'\uF403','hot sauce':'\uF133','ambulance':'\uD83D\uDE91','heartbook':'\uE962','wifi mail':'\uE352','bar chart':'\uD83D\uDCCA','nosmoking':'\uD83D\uDEAD','lightbulb':'\uD83D\uDCA1','billiards':'\uD83C\uDFB1','emptycart':'\uE507','leftright':'\u2B0C','ice skate':'\u26F8','downright':'\u2B0A','hamburger':'\uD83C\uDF54','hairdryer':'\uEA88','ascending':'\u25B4','newspaper':'\uD83D\uDCF0','analytics':'\uE575','halfheart':'\uE1A0','user file':'\uEC15','crosshair':'\u2316','lock file':'\uEC11','olive oil':'\uF132','male user':'\uD83D\uDC64','christmas':'\uD83C\uDF84','rightward':'\uF503','page curl':'\uE9B0','clockwise':'\u2941','spoonfork':'\uF150','wineglass':'\uD83C\uDF77','scaledown':'\uEE05','three die':'\u2682','harddrive':'\uE7B0','telephone':'\uD83D\uDCDE','call bell':'\uF424','stopwatch':'\u23F1','cellphone':'\uD83D\uDCF1','musicnote':'\u266B','sunscreen':'\uF423','usergroup':'\uE400','egg timer':'\uF165','dashboard':'\uF000','text file':'\uEC19','wifi book':'\uE968','bbq apron':'\uF171','uploadbox':'\uEB42','departure':'\uF324','half star':'\uE1A1','ice cream':'\uD83C\uDF68','lowvolume':'\uD83D\uDD09','spaghetti':'\uD83C\uDF5D','price tag':'\uE102','snowflake':'\u2744','cargoship':'\uE5E3','highlight':'\uED11','flowertag':'\uE103','open book':'\uD83D\uDCD6','side dish':'\uD83C\uDF5A','pullquote':'\u201C','megaphone':'\uD83D\uDCE2','jump rope':'\uF417','bankcheck':'\uE544','palmtree':'\uD83C\uDF34','add file':'\uEC01','five die':'\u2684','four die':'\u2683','threedie':'\u2682','elevator':'\uF380','lockfile':'\uEC11','userfile':'\uEC15','campfire':'\uD83D\uDD25','iceskate':'\u26F8','textfile':'\uEC19','wifibook':'\uE968','passport':'\uF316','jerrycan':'\uF315','computer':'\uD83D\uDCBB','pagecurl':'\uE9B0','notebook':'\uD83D\uDCD3','openbook':'\uD83D\uDCD6','document':'\uE903','football':'\uD83C\uDFC8','exercise':'\uF414','skipback':'\u23EE','dumbbell':'\uF416','jumprope':'\uF417','pictures':'\uD83C\uDF04','sky lift':'\uD83D\uDEA1','meditate':'\uF418','schooner':'\uF305','typeface':'\uED01','sailboat':'\u26F5','suitcase':'\uE420','redirect':'\u21AA','contract':'\uEE01','question':'\u2753','arrivals':'\uF325','callbell':'\uF424','sign out':'\uEE02','scale up':'\uEE04','database':'\uE7A0','firewall':'\uE720','hospital':'\u26E8','subtract':'\u002D','location':'\uE6D0','signpost':'\uE672','bearface':'\uD83D\uDC3B','navigate':'\uE670','building':'\uD83C\uDFE2','download':'\uEB01','seedling':'\uD83C\uDF31','forklift':'\uE5E2','settings':'\u2699','umbrella':'\u2602','barchart':'\uD83D\uDCCA','piechart':'\uE570','moneybag':'\uD83D\uDCB0','banknote':'\uD83D\uDCB5','fracture':'\uF4E1','add cart':'\uE501','add user':'\uE401','up right':'\u2B08','maleuser':'\uD83D\uDC64','calendar':'\uD83D\uDCC5','wifimail':'\uE352','downleft':'\u2B0B','add date':'\uF070','envelope':'\u2709','facetime':'\uE320','end call':'\uE300','bullseye':'\uD83C\uDFAF','halfstar':'\uE1A1','favorite':'\u22C6','previous':'\u25C5','directup':'\u25B4','thumbsup':'\uD83D\uDC4D','sidedish':'\uD83C\uDF5A','bookmark':'\uD83D\uDD16','pricetag':'\uE102','icecream':'\uD83C\uDF68','keywords':'\uE100','bbqapron':'\uF171','trashcan':'\uE0D0','cocktail':'\uD83C\uDF78','dropdown':'\u25BE','insecure':'\uD83D\uDD13','unlocked':'\uD83D\uDD13','oliveoil':'\uF132','hotsauce':'\uF133','leftward':'\uF505','sriracha':'\uF133','eggtimer':'\uF165','colander':'\uF163','nextpage':'\u2398','zoom out':'\uE003','barbecue':'\uF142','utensils':'\uD83C\uDF74','display':'\uD83D\uDCBB','refresh':'\u21BB','tornado':'\uF213','rainbow':'\uD83C\uDF08','package':'\uD83D\uDCE6','airplay':'\uE800','desktop':'\uD83D\uDCBB','printer':'\u2399','percent':'\u0025','bonfire':'\uEAB3','savings':'\uE545','bicycle':'\uD83D\uDEB2','receipt':'\uE972','notepad':'\uE972','present':'\uD83C\uDF81','speaker':'\uD83D\uDD08','luggage':'\uE421','addcart':'\uE501','upright':'\u2B08','columns':'\uE9A2','adduser':'\uE401','droplet':'\uD83D\uDCA7','avatars':'\uD83D\uDC65','weather':'\uF210','balloon':'\uD83C\uDF88','dictate':'\uD83C\uDFA4','forward':'\u27A1','retweet':'\uF600','comment':'\uD83D\uDCAC','highway':'\uF320','fivedie':'\u2684','adddate':'\uF070','arrival':'\uF325','warning':'\u26A0','up left':'\u2B09','caution':'\u26D4','headset':'\uE302','log out':'\uEE02','endcall':'\uE300','feather':'\uE220','windows':'\uE202','signout':'\uEE02','bowling':'\uF406','tractor':'\uD83D\uDE9C','sign in':'\uEE03','sausage':'\uF103','scaleup':'\uEE04','dislike':'\uD83D\uDC4E','loading':'\uEB83','approve':'\uD83D\uDC4D','shuffle':'\uD83D\uDD00','battery':'\uD83D\uDD0B','noodles':'\uD83C\uDF5C','caravan':'\uD83D\uDE90','handbag':'\uD83D\uDC5C','fourdie':'\u2683','pushpin':'\uD83D\uDCCC','keyword':'\uE100','fitness':'\uF414','descend':'\u25BE','syncing':'\uEB82','checked':'\u2713','platter':'\uF166','two die':'\u2681','compass':'\uE671','one die':'\u2680','private':'\uD83D\uDD12','ereader':'\uEA04','compose':'\uD83D\uDCDD','chicken':'\uD83D\uDC26','address':'\uE611','addfile':'\uEC01','lodging':'\uD83C\uDFE8','picture':'\uD83C\uDF04','visible':'\uD83D\uDC40','monitor':'\uD83D\uDCBB','syringe':'\uD83D\uDC89','fragile':'\uE5E7','skylift':'\uD83D\uDEA1','zoomout':'\uE003','zoom in':'\uE002','bandage':'\uF4B2','puzzle':'\uE710','reload':'\uEB87','camera':'\uD83D\uDCF7','locked':'\uD83D\uDD12','zoomin':'\uE002','wrench':'\uD83D\uDD27','basket':'\uE510','layout':'\uEDA0','action':'\uEE00','images':'\uD83C\uDF04','secure':'\uD83D\uDD12','hockey':'\uF401','expand':'\u2922','photos':'\uD83C\uDF04','sample':'\uE200','avatar':'\uD83D\uDC64','unlock':'\uD83D\uDD13','videos':'\uD83D\uDCF9','notice':'\uE973','target':'\u25CE','layers':'\uE202','tunnel':'\uF323','logout':'\uEE02','knight':'\u265E','onedie':'\u2680','locate':'\uE670','twodie':'\u2681','log in':'\uEE03','camper':'\uD83D\uDE90','signin':'\uEE03','ascend':'\u25B4','weight':'\uE5E5','resume':'\uEC15','charts':'\uE575','record':'\u25CF','burger':'\uD83C\uDF54','rewind':'\u23EA','pencil':'\u270E','hyphen':'\u002D','hanger':'\uF1A0','shrimp':'\uD83C\uDF64','turkey':'\uF105','laptop':'\uEA00','remove':'\u002D','sixdie':'\u2685','tablet':'\uEA01','tennis':'\uD83C\uDFBE','public':'\uD83D\uDD13','carrot':'\uF111','delete':'\u2421','iphone':'\uEA02','rocket':'\uD83D\uDE80','coffee':'\u2615','folder':'\uD83D\uDCC1','bottle':'\uF122','outlet':'\uF282','mobile':'\uEA02','fishes':'\uEF20','eraser':'\u2710','teapot':'\uF127','volume':'\uD83D\uDD08','upleft':'\u2B09','tagged':'\uE100','upload':'\uEB41','pepper':'\uF131','office':'\uD83C\uDFE2','shower':'\uD83D\uDEBF','repeat':'\uD83D\uDD01','replay':'\u21BA','search':'\uD83D\uDD0E','attach':'\uD83D\uDCCE','soccer':'\u26BD','street':'\uF321','scales':'\u2696','outbox':'\uD83D\uDCE4','stereo':'\uE801','cursor':'\uE001','boxing':'\uF405','garage':'\uE600','ribbon':'\uD83C\uDF80','knife':'\uD83D\uDD2A','share':'\uF601','write':'\u270E','stove':'\uF141','erase':'\u2710','scale':'\uF164','trash':'\uE0D0','heart':'\u2665','zelda':'\uE1A0','apron':'\uF170','medal':'\uE1C1','quill':'\uE220','phone':'\uD83D\uDCDE','reply':'\u21A9','purse':'\uD83D\uDC5C','steak':'\uF106','email':'\u2709','inbox':'\uD83D\uDCE5','right':'\u27A1','pizza':'\uD83C\uDF55','users':'\uD83D\uDC65','alarm':'\u23F0','timer':'\u23F1','cloud':'\u2601','apple':'\uD83C\uDF4F','watch':'\u231A','store':'\uD83C\uDFEC','sunny':'\u2600','coins':'\uE543','clock':'\u23F2','flash':'\u2301','stock':'\uE579','crate':'\uE5D8','rainy':'\u2614','earth':'\uD83C\uDF0E','world':'\uD83C\uDF0E','globe':'\uD83C\uDF10','music':'\u266B','audio':'\u266B','sound':'\uD83D\uDD08','grass':'\uEF70','radio':'\uD83D\uDCFB','image':'\uD83C\uDF04','photo':'\uD83C\uDF04','video':'\uD83D\uDCF9','pause':'\uE8A0','eject':'\u23CF','close':'\u2421','hiker':'\uF410','index':'\uE902','check':'\u2713','train':'\uD83D\uDE86','minus':'\u002D','books':'\uD83D\uDCDA','ebook':'\uEA05','truck':'\uD83D\uDE9A','flame':'\uEAB2','enter':'\uEE03','login':'\uEE03','sweep':'\uEA86','plane':'\u2708','alert':'\u26A0','broom':'\uEA86','chess':'\u265E','visit':'\uEE00','merge':'\uEB81','nodes':'\uEB85','quote':'\u201C','print':'\u2399','knob':'\uF004','boat':'\uD83D\uDEA2','font':'\uED01','text':'\uED00','list':'\uED50','zoom':'\uE002','view':'\uD83D\uDC40','look':'\uD83D\uDC40','link':'\uD83D\uDD17','move':'\uE070','fuel':'\u26FD','edit':'\u270E','cook':'\uD83C\uDF73','oven':'\uF140','file':'\uD83D\uDCC4','bike':'\uD83D\uDEB2','wifi':'\uEB84','sync':'\uEB82','road':'\uF321','redo':'\u21BB','draw':'\u270F','fork':'\uEB80','help':'\u2753','info':'\u2139','exit':'\uEE02','golf':'\uF400','fire':'\uD83D\uDD25','plus':'\u002B','lock':'\uD83D\uDD12','idea':'\uD83D\uDCA1','coal':'\uF136','tags':'\uE100','ipad':'\uEA01','rows':'\uE9A1','news':'\uD83D\uDCF0','flag':'\u2691','book':'\uD83D\uDCD5','page':'\uE903','like':'\uD83D\uDC4D','undo':'\u21BA','taxi':'\uD83D\uDE96','hike':'\uF410','pool':'\uE412','salt':'\uF130','skip':'\u23ED','stop':'\u25A0','bird':'\uD83D\uDC26','play':'\u25B6','plug':'\uD83D\uDD0C','tree':'\uD83C\uDF33','leaf':'\uD83C\uDF42','yoga':'\uF418','disc':'\uD83D\uDCBF','love':'\u2665','star':'\u22C6','beer':'\uD83C\uDF7A','wind':'\uF212','crop':'\uE201','next':'\u25BB','save':'\uD83D\uDCBE','chef':'\uF172','call':'\uD83D\uDCDE','corn':'\uF110','gear':'\u2699','dial':'\uF004','send':'\uE350','mail':'\u2709','home':'\u2302','pill':'\uD83D\uDC8A','hook':'\uE5E4','rain':'\u2614','back':'\u2B05','form':'\uE582','bell':'\uD83D\uDD14','left':'\u2B05','bank':'\uD83C\uDFE6','work':'\uD83D\uDCBC','time':'\u23F2','cash':'\uD83D\uDCB5','fish':'\uD83D\uDC1F','safe':'\uE540','down':'\u2B07','drop':'\uD83D\uDCA7','gift':'\uD83C\uDF81','chat':'\uD83D\uDCAC','cart':'\uE500','date':'\uD83D\uDCC5','talk':'\uD83D\uDCAC','user':'\uD83D\uDC64','cell':'\uD83D\uDCF1','car':'\uD83D\uDE98','sun':'\u2600','atm':'\uD83C\uDFE7','tip':'\uE546','dna':'\uF4C2','box':'\uD83D\uDCE6','bed':'\uD83C\uDFE8','fax':'\uD83D\uDCE0','map':'\uE673','rss':'\uE310','gps':'\uE674','pin':'\uD83D\uDCCD','hdd':'\uE7B0','mug':'\u2615','pen':'\u2712','fog':'\uF211','mic':'\uD83C\uDFA4','cog':'\u2699','tea':'\uD83C\uDF75','fan':'\uF280','png':'\uEC36','cab':'\uD83D\uDE96','add':'\u002B','bbq':'\uF142','tag':'\uE100','new':'\uD83C\uDD95','bus':'\uD83D\uDE8D','ban':'\uD83D\uDEAB','key':'\uD83D\uDD11','cfl':'\uEA85','out':'\uEE00','exe':'\uEC30','zip':'\uEC31','gas':'\u26FD','doc':'\uEC32','ppt':'\uEC33','pdf':'\uEC34','eye':'\uD83D\uDC40','jpg':'\uEC35','up':'\u2B06','za':'\uD83C\uDF55'};

  if (typeof ss_icons !== 'object' || typeof ss_icons !== 'object') {
    var ss_icons = ss_set;
    var ss_keywords = [];
    for (var i in ss_set) { ss_keywords.push(i); };
  } else {
    for (var i in ss_set) { ss_icons[i] = ss_set[i]; ss_keywords.push(i); }
  };

  if (typeof ss_legacy !== 'function') {

    /* domready.js */
    !function(a,b){typeof module!="undefined"?module.exports=b():typeof define=="function"&&typeof define.amd=="object"?define(b):this[a]=b()}("ss_ready",function(a){function m(a){l=1;while(a=b.shift())a()}var b=[],c,d=!1,e=document,f=e.documentElement,g=f.doScroll,h="DOMContentLoaded",i="addEventListener",j="onreadystatechange",k="readyState",l=/^loade|c/.test(e[k]);return e[i]&&e[i](h,c=function(){e.removeEventListener(h,c,d),m()},d),g&&e.attachEvent(j,c=function(){/^c/.test(e[k])&&(e.detachEvent(j,c),m())}),a=g?function(c){self!=top?l?c():b.push(c):function(){try{f.doScroll("left")}catch(b){return setTimeout(function(){a(c)},50)}c()}()}:function(a){l?a():b.push(a)}})

    var ss_legacy = function(node) {

      if (!node instanceof Object) return false;

      if (node.length) {
        for (var i=0; i<node.length; i++) {
          ss_legacy(node[i]);
        }
        return;
      };

      if (node.value) {
        node.value = ss_liga(node.value);
      } else if (node.nodeValue) {
        node.nodeValue = ss_liga(node.nodeValue);
      } else if (node.innerHTML) {
        node.innerHTML = ss_liga(node.innerHTML);
      }

    };

    var ss_getElementsByClassName = function(node, classname) {
      if (document.querySelectorAll) {
        return document.querySelectorAll('.'+classname);
      }
      var a = [];
      var re = new RegExp('(^| )'+classname+'( |$)');
      var els = node.getElementsByTagName("*");
      for(var i=0,j=els.length; i<j; i++)
          if(re.test(els[i].className))a.push(els[i]);
      return a;
    };

    var ss_liga = function(that) {
      var re = new RegExp(ss_keywords.join('|').replace(/[-[\]{}()*+?.,\\^$#\s]/g, "\\$&"),"gi");
      return that.replace(re, function(v) {
        return ss_icons[v.toLowerCase()];
      });
    };

    ss_ready(function() {
      if (document.getElementsByClassName) {
        ss_legacy(document.getElementsByClassName('ss-icon'));
      } else {
        ss_legacy(ss_getElementsByClassName(document.body, 'ss-icon'));
      }
    });

  }

};


var PGLowLatencyAudio = {
  
preloadFX: function ( id, assetPath, success, fail) {
    return cordova.exec(success, fail, "PGLowLatencyAudio", "preloadFX", [id, assetPath]);
},    
    
preloadAudio: function ( id, assetPath, voices, success, fail) {
    return cordova.exec(success, fail, "PGLowLatencyAudio", "preloadAudio", [id, assetPath, voices]);
},
    
play: function (id, success, fail) {
    return cordova.exec(success, fail, "PGLowLatencyAudio", "play", [id]);
},
    
stop: function (id, success, fail) {
    return cordova.exec(success, fail, "PGLowLatencyAudio", "stop", [id]);
},
    
loop: function (id, success, fail) {
    return cordova.exec(success, fail, "PGLowLatencyAudio", "loop", [id]);
},
    
unload: function (id, success, fail) {
    return cordova.exec(success, fail, "PGLowLatencyAudio", "unload", [id]);
}
    
    
};

window.localizable = {
	getDefaultLocale: function(callback) {
		cordova.exec(
			callback,
			function(err) {
				callback('Nothing to echo.');
			},
			"Localizable",
			"getDefaultLocale",
			[]);
	}
}

