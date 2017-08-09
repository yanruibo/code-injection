









		var m = null;
		var currentPanel = null;
		var analyticsOK = false;
		function attachTouchHandlers() {
			$(window).bind('touchstart', windowTouchStart);
			$('#container').bind('touchstart', containerTouchStart);
			$('#container').bind('touchmove', containerTouchMove);
			$('#container').bind('touchend', containerTouchEnd);
		}
		function detachTouchHandlers() {
			$(window).unbind('touchstart', windowTouchStart);
			$('#container').unbind('touchstart', containerTouchStart);
			$('#container').unbind('touchmove', containerTouchMove);
			$('#container').unbind('touchend', containerTouchEnd);
		}
		function windowTouchStart(ev) {
			ev.preventDefault();
		}
		function containerTouchStart(ev) {
			m.touchStart(ev.originalEvent);
		}
		function containerTouchMove(ev) {
			m.touchMove(ev.originalEvent);
			ev.preventDefault();
		}
		function containerTouchEnd(ev) {
			m.touchEnd(ev.originalEvent);
		}
		function newGame(difficulty) {
			console.log("new game");
			$(currentPanel).hide();
			$('#container').show();
			try {
				m = new Maze(difficulty, 'maze', 'trail', 'container');
			} catch(e) {
				alert("No se puede mostrar el laberinto:\n" + e);
			}
			m.onmazecompleted = showMain;
			$(window).keydown(function(ev) {
				var key = ev.keyCode;
				if (key == '38') {
					m.move(Maze.UP);
					ev.preventDefault();
				} else if (key == '39') {
					m.move(Maze.RIGHT);
					ev.preventDefault();
				} else if (key == '40') {
					m.move(Maze.DOWN);
					ev.preventDefault();
				} else if (key == '37') {
					m.move(Maze.LEFT);
					ev.preventDefault();
				}
			});
			attachTouchHandlers();
			window.focus();
			currentPanel = $('#container')[0];
			console.log("Set #container as currentPanel");
			if (analyticsOK) {
				window.plugins.analytics.trackPageView('maze.html', 
					function() {
						console.log('Successfully registered page view');
					}, 
					function() {
						console.log('Failed registration of page view');
					}
				);
			}
		}
		function continueGame() {
			console.log("continue game");
			if (!m.completed) {
				attachTouchHandlers();
				$(currentPanel).hide();
				$('#container').show();
				window.focus();
				currentPanel = $('#container')[0];
				console.log("Set #container as currentPanel");
				console.log("Returned to game");
			}
		}
		function showMain() {
			console.log("show main");
			detachTouchHandlers();
			$(currentPanel).hide();
			$('#main').show();
			if (m.completed) {
				$('#continueGameButton').attr('disabled', 'disabled');
			} else {
				$('#continueGameButton').removeAttr('disabled');
			}
			currentPanel = $('#main')[0];
			console.log("Set #main as currentPanel");
		}
		$(document).ready(function() {
			$('#container').hide();
			$('#continueGameButton').attr('disabled', 'disabled');
			if (typeof(navigator.device) === 'undefined') {
				document.addEventListener('deviceready', deviceready, false);
				console.log("device undefined, added documentready handler");
			} else {
				deviceready();
			}
			currentPanel = $('#main')[0];
			console.log("Set #main as currentPanel");
		});
		function backbutton() {
			console.log("backbutton pressed");
			if (currentPanel == $('#main')[0]) {
				exitApp();
			} else {
				showMain();
			}
		}
		function deviceready() {
			console.log("deviceready");
			document.addEventListener('backbutton', backbutton, false);
			window.plugins.analytics.start('UA-25862126-1', 
				function() {
					analyticsOK = true;
					console.log('Analytics registered successfully');
					window.plugins.analytics.trackPageView('main.html',
							function() {
								console.log('Successfully registered page view');
							},
							function() {
								console.log('Failed registration of page view');
							}
						);
				}, 
				function() {
					analyticsOK = false;
					console.log('Analytics failed registration');
				}
			);
			window.plugins.globalization.getLocaleName(
					function(locale) {
						var strings = null;
						var lang = locale.value;
						console.log('Current language: ' + lang);
						if (lang.indexOf('es') > -1) {
							strings = strings_es;
						} else if (lang.indexOf('fr') > -1) {
							strings = strings_fr;
						} else if (lang.indexOf('de') > -1) {
							strings = strings_de;
						} else if (lang.indexOf('it') > -1) {
							strings = strings_it;
						} else {
							strings = strings_en;
						}
						$('html').localize(strings);
					},
					function() {
						console.log("Failed to get localization information. Defaulting to English.")						
						$('html').localize(strings_en);
					}
			);
		}
		function exitApp() {
			if (typeof(navigator.device) != 'undefined') {
				console.log('Exiting app');
				navigator.app.exitApp();
			}
		}
	

if (!PhoneGap.hasResource("globalization")) {
	PhoneGap.addResource("globalization");
	
function Globalization()
{

};
	
/**
* Returns the string identifier for the client's current locale setting.
* It returns the locale identifier string to the successCB callback with a 
* properties object as a parameter. If there is an error getting the locale, 
* then the errorCB callback is invoked.
*
* @param {Function} successCB
* @param {Function} errorCB
*
* @return Object.value {String}: The locale identifier
*
* @error GlobalizationError.UNKNOWN_ERROR 
*
* Example
*	globalization.getLocaleName(function (locale) {alert('locale:' + locale.value + '\n');}, 
*								function () {});
*/	
Globalization.prototype.getLocaleName = function(successCB, failureCB)
{
	// successCallback required
	if (typeof successCB != "function") {	
        console.log("Globalization.getLocaleName Error: successCB is not a function");
        return;
    }
	
    // errorCallback required
    if (typeof failureCB != "function") {        
    	console.log("Globalization.getLocaleName Error: failureCB is not a function");
        return;
    }
	PhoneGap.exec(successCB, failureCB, "GlobalizationCommand","getLocaleName", []);
};

	
/**
* Returns a date formatted as a string according to the client's user preferences and 
* calendar using the time zone of the client. It returns the formatted date string to the 
* successCB callback with a properties object as a parameter. If there is an error 
* formatting the date, then the errorCB callback is invoked. 
*
* The defaults are: formatLenght="short" and selector="date and time"
*
* @param {Date} date 
* @param {Function} successCB
* @param {Function} errorCB
* @param {Object} options {optional}
*			formatLength {String}: 'short', 'medium', 'long', or 'full'
*			selector {String}: 'date', 'time', or 'date and time' 
* 
* @return Object.value {String}: The localized date string
*
* @error GlobalizationError.FORMATTING_ERROR 
*
* Example
*	globalization.dateToString(new Date(),
*				function (date) {alert('date:' + date.value + '\n');},
*				function (errorCode) {alert(errorCode);},
*				{formatLength:'short'}); 
*/	
Globalization.prototype.dateToString = function(date, successCB, failureCB, options)
{
	// successCallback required
	if (typeof successCB != "function") {
        console.log("Globalization.dateToString Error: successCB is not a function");
        return;
    }
	
    // errorCallback required
    if (typeof failureCB != "function") {
        console.log("Globalization.dateToString Error: failureCB is not a function");
        return;
    }
	
	
	if (date instanceof Date){
		var dateValue;
		dateValue = date.valueOf();		
		PhoneGap.exec(successCB, failureCB, "GlobalizationCommand", "dateToString", [{"date": dateValue, "options": options}]);
	}
	else {
		console.log("Globalization.dateToString Error: date is not a Date object");
	}
};


/**
* Parses a date formatted as a string according to the client's user 
* preferences and calendar using the time zone of the client and returns 
* the corresponding date object. It returns the date to the successCB 
* callback with a properties object as a parameter. If there is an error 
* parsing the date string, then the errorCB callback is invoked.
*
* The defaults are: formatLength="short" and selector="date and time"
*
* @param {String} dateString 
* @param {Function} successCB
* @param {Function} errorCB
* @param {Object} options {optional}
*			formatLength {String}: 'short', 'medium', 'long', or 'full'
*			selector {String}: 'date', 'time', or 'date and time' 
* 
* @return	Object.year {Number}: The four digit year
*			Object.month {Number}: The month from (0 - 11)
*			Object.day {Number}: The day from (1 - 31)
*			Object.hour {Number}: The hour from (0 - 23)
*			Object.minute {Number}: The minute from (0 - 59)
*			Object.second {Number}: The second from (0 - 59)
*			Object.millisecond {Number}: The milliseconds (from 0 - 999), 
*										not available on all platforms
* 
* @error GlobalizationError.PARSING_ERROR
*
* Example
*	globalization.stringToDate('4/11/2011',
*				function (date) { alert('Month:' + date.month + '\n' +
*					'Day:' + date.day + '\n' +
*					'Year:' + date.year + '\n');},
*				function (errorCode) {alert(errorCode);},
*				{selector:'date'});
*/	
Globalization.prototype.stringToDate = function(dateString, successCB, failureCB, options)
{
	// successCallback required
	if (typeof successCB != "function") {
        console.log("Globalization.stringToDate Error: successCB is not a function");
        return;
    }
	
    // errorCallback required
    if (typeof failureCB != "function") {
        console.log("Globalization.stringToDate Error: failureCB is not a function");
        return;
    }	
	if (typeof dateString == "string"){
		PhoneGap.exec(successCB, failureCB, "GlobalizationCommand", "stringToDate", [{"dateString": dateString, "options": options}]);
	}
	else {
		console.log("Globalization.stringToDate Error: dateString is not a string");
	}
};

	
/**
* Returns a pattern string for formatting and parsing dates according to the client's 
* user preferences. It returns the pattern to the successCB callback with a 
* properties object as a parameter. If there is an error obtaining the pattern, 
* then the errorCB callback is invoked.
*
* The defaults are: formatLength="short" and selector="date and time"
*
* @param {Function} successCB
* @param {Function} errorCB
* @param {Object} options {optional}
*			formatLength {String}: 'short', 'medium', 'long', or 'full'
*			selector {String}: 'date', 'time', or 'date and time' 
* 
* @return	Object.pattern {String}: The date and time pattern for formatting and parsing dates. 
*									The patterns follow Unicode Technical Standard #35
*									http://unicode.org/reports/tr35/tr35-4.html
*			Object.timezone {String}: The abbreviated name of the time zone on the client
*			Object.utc_offset {Number}: The current difference in seconds between the client's 
*										time zone and coordinated universal time. 
*			Object.dst_offset {Number}: The current daylight saving time offset in seconds 
*										between the client's non-daylight saving's time zone 
*										and the client's daylight saving's time zone.
*
* @error GlobalizationError.PATTERN_ERROR
*
* Example
*	globalization.getDatePattern(new Date(),
*				function (date) {alert('pattern:' + date.pattern + '\n');},
*				function () {},
*				{formatLength:'short'});
*/	
Globalization.prototype.getDatePattern = function(successCB, failureCB, options)
{
	// successCallback required
	if (typeof successCB != "function") {
        console.log("Globalization.getDatePattern Error: successCB is not a function");
        return;
    }
	
    // errorCallback required
    if (typeof failureCB != "function") {
        console.log("Globalization.getDatePattern Error: failureCB is not a function");
        return;
    }
	
	PhoneGap.exec(successCB, failureCB, "GlobalizationCommand", "getDatePattern", [{"options": options}]);
};

	
/**
* Returns an array of either the names of the months or days of the week 
* according to the client's user preferences and calendar. It returns the array of names to the 
* successCB callback with a properties object as a parameter. If there is an error obtaining the 
* names, then the errorCB callback is invoked.
*
* The defaults are: type="wide" and item="months"
*
* @param {Function} successCB
* @param {Function} errorCB
* @param {Object} options {optional}
*			type {String}: 'narrow' or 'wide'
*			item {String}: 'months', or 'days' 
* 
* @return Object.value {Array{String}}: The array of names starting from either 
*										the first month in the year or the 
*										first day of the week.
* @error GlobalizationError.UNKNOWN_ERROR
*
* Example
*	globalization.getDateNames(function (names) { 
*		for(var i = 0; i < names.value.length; i++) {
*			alert('Month:' + names.value[i] + '\n');}},
*		function () {});
*/	
Globalization.prototype.getDateNames = function(successCB, failureCB, options)
{
	// successCallback required
	if (typeof successCB != "function") {
        console.log("Globalization.getDateNames Error: successCB is not a function");
        return;
    }
	
    // errorCallback required
    if (typeof failureCB != "function") {
        console.log("Globalization.getDateNames Error: failureCB is not a function");
        return;
    }
    PhoneGap.exec(successCB, failureCB, "GlobalizationCommand", "getDateNames", [{"options": options}]);
};

/**
* Returns whether daylight savings time is in effect for a given date using the client's 
* time zone and calendar. It returns whether or not daylight savings time is in effect 
* to the successCB callback with a properties object as a parameter. If there is an error 
* reading the date, then the errorCB callback is invoked.
*
* @param {Date} date
* @param {Function} successCB
* @param {Function} errorCB 
* 
* @return Object.dst {Boolean}: The value "true" indicates that daylight savings time is 
*								in effect for the given date and "false" indicate that it is not.
*
* @error GlobalizationError.UNKNOWN_ERROR
*
* Example
*	globalization.isDayLightSavingsTime(new Date(),
*				function (date) {alert('dst:' + date.dst + '\n');}
*				function () {});
*/	
Globalization.prototype.isDayLightSavingsTime = function(date, successCB, failureCB)
{
	// successCallback required
	if (typeof successCB != "function") {
        console.log("Globalization.isDayLightSavingsTime Error: successCB is not a function");
        return;
    }
	
    // errorCallback required
    if (typeof failureCB != "function") {
        console.log("Globalization.isDayLightSavingsTime Error: failureCB is not a function");
        return;
    }
	
	
	if (date instanceof Date){
		var dateValue;
		dateValue = date.valueOf();
		PhoneGap.exec(successCB, failureCB, "GlobalizationCommand", "isDayLightSavingsTime", [{"date": dateValue}]);
	}
	else {
		console.log("Globalization.isDayLightSavingsTime Error: date is not a Date object");
	}
	
};

/**
* Returns the first day of the week according to the client's user preferences and calendar. 
* The days of the week are numbered starting from 1 where 1 is considered to be Sunday. 
* It returns the day to the successCB callback with a properties object as a parameter. 
* If there is an error obtaining the pattern, then the errorCB callback is invoked.
*
* @param {Function} successCB
* @param {Function} errorCB 
* 
* @return Object.value {Number}: The number of the first day of the week.
*
* @error GlobalizationError.UNKNOWN_ERROR
*
* Example
*	globalization.getFirstDayOfWeek(function (day) 
*				{ alert('Day:' + day.value + '\n');},
*				function () {});
*/	
Globalization.prototype.getFirstDayOfWeek = function(successCB, failureCB)
{
	// successCallback required
	if (typeof successCB != "function") {
        console.log("Globalization.getFirstDayOfWeek Error: successCB is not a function");
        return;
    }
	
    // errorCallback required
    if (typeof failureCB != "function") {
        console.log("Globalization.getFirstDayOfWeek Error: failureCB is not a function");
        return;
    }
	
	PhoneGap.exec(successCB, failureCB, "GlobalizationCommand", "getFirstDayOfWeek", []);
};

	
/**
* Returns a number formatted as a string according to the client's user preferences. 
* It returns the formatted number string to the successCB callback with a properties object as a 
* parameter. If there is an error formatting the number, then the errorCB callback is invoked.
*
* The defaults are: type="decimal"
*
* @param {Number} number
* @param {Function} successCB
* @param {Function} errorCB
* @param {Object} options {optional}
*			type {String}: 'decimal', "percent", or 'currency'
* 
* @return Object.value {String}: The formatted number string.
*
* @error GlobalizationError.FORMATTING_ERROR
*
* Example
*	globalization.numberToString(3.25,
*				function (number) {alert('number:' + number.value + '\n');},
*				function () {},
*				{type:'decimal'});
*/	
Globalization.prototype.numberToString = function(number, successCB, failureCB, options)
{
	// successCallback required
	if (typeof successCB != "function") {
        console.log("Globalization.numberToString Error: successCB is not a function");
        return;
    }
	
    // errorCallback required
    if (typeof failureCB != "function") {
        console.log("Globalization.numberToString Error: failureCB is not a function");
        return;
    }
	
	if(typeof number == "number") {
		PhoneGap.exec(successCB, failureCB, "GlobalizationCommand", "numberToString", [{"number": number, "options": options}]);
	}
	else {
		console.log("Globalization.numberToString Error: number is not a number");
	}
};

/**
* Parses a number formatted as a string according to the client's user preferences and 
* returns the corresponding number. It returns the number to the successCB callback with a
* properties object as a parameter. If there is an error parsing the number string, then 
* the errorCB callback is invoked.
*
* The defaults are: type="decimal"
*
* @param {String} numberString
* @param {Function} successCB
* @param {Function} errorCB
* @param {Object} options {optional}
*			type {String}: 'decimal', "percent", or 'currency'
* 
* @return Object.value {Number}: The parsed number.
*
* @error GlobalizationError.PARSING_ERROR
*
* Example
*	globalization.stringToNumber('1234.56',
*				function (number) {alert('Number:' + number.value + '\n');},
*				function () { alert('Error parsing number');});
*/	
Globalization.prototype.stringToNumber = function(numberString, successCB, failureCB, options)
{
	// successCallback required
	if (typeof successCB != "function") {
        console.log("Globalization.stringToNumber Error: successCB is not a function");
        return;
    }
	
    // errorCallback required
    if (typeof failureCB != "function") {
        console.log("Globalization.stringToNumber Error: failureCB is not a function");
        return;
    }
	
	if(typeof numberString == "string") {
		PhoneGap.exec(successCB, failureCB, "GlobalizationCommand", "stringToNumber", [{"numberString": numberString, "options": options}]);
	}
	else {
		console.log("Globalization.stringToNumber Error: numberString is not a string");
	}
};

/**
* Returns a pattern string for formatting and parsing numbers according to the client's user 
* preferences. It returns the pattern to the successCB callback with a properties object as a 
* parameter. If there is an error obtaining the pattern, then the errorCB callback is invoked.
*
* The defaults are: type="decimal"
*
* @param {Function} successCB
* @param {Function} errorCB
* @param {Object} options {optional}
*			type {String}: 'decimal', "percent", or 'currency'
* 
* @return	Object.pattern {String}: The number pattern for formatting and parsing numbers. 
*									The patterns follow Unicode Technical Standard #35. 
*									http://unicode.org/reports/tr35/tr35-4.html
*			Object.symbol {String}: The symbol to be used when formatting and parsing 
*									e.g., percent or currency symbol.
*			Object.fraction {Number}: The number of fractional digits to use when parsing and 
*									formatting numbers.
*			Object.rounding {Number}: The rounding increment to use when parsing and formatting.
*			Object.positive {String}: The symbol to use for positive numbers when parsing and formatting.
*			Object.negative: {String}: The symbol to use for negative numbers when parsing and formatting.
*			Object.decimal: {String}: The decimal symbol to use for parsing and formatting.
*			Object.grouping: {String}: The grouping symbol to use for parsing and formatting.
*
* @error GlobalizationError.PATTERN_ERROR
*
* Example
*	globalization.getNumberPattern(
*				function (pattern) {alert('Pattern:' + pattern.pattern + '\n');},
*				function () {});
*/	
Globalization.prototype.getNumberPattern = function(successCB, failureCB, options)
{
	// successCallback required
	if (typeof successCB != "function") {
        console.log("Globalization.getNumberPattern Error: successCB is not a function");
        return;
    }
	
    // errorCallback required
    if (typeof failureCB != "function") {
        console.log("Globalization.getNumberPattern Error: failureCB is not a function");
        return;
    }
	
	PhoneGap.exec(successCB, failureCB, "GlobalizationCommand", "getNumberPattern", [{"options": options}]);	
};

/**
* Returns a pattern string for formatting and parsing currency values according to the client's 
* user preferences and ISO 4217 currency code. It returns the pattern to the successCB callback with a 
* properties object as a parameter. If there is an error obtaining the pattern, then the errorCB 
* callback is invoked.
*
* @param {String} currencyCode	
* @param {Function} successCB
* @param {Function} errorCB
* 
* @return	Object.pattern {String}: The currency pattern for formatting and parsing currency values. 
*									The patterns follow Unicode Technical Standard #35 
*									http://unicode.org/reports/tr35/tr35-4.html
*			Object.code {String}: The ISO 4217 currency code for the pattern.
*			Object.fraction {Number}: The number of fractional digits to use when parsing and 
*									formatting currency.
*			Object.rounding {Number}: The rounding increment to use when parsing and formatting.
*			Object.decimal: {String}: The decimal symbol to use for parsing and formatting.
*			Object.grouping: {String}: The grouping symbol to use for parsing and formatting.
*
* @error GlobalizationError.FORMATTING_ERROR
*
* Example
*	globalization.getCurrencyPattern('EUR',
*				function (currency) {alert('Pattern:' + currency.pattern + '\n');}
*				function () {});
*/	
Globalization.prototype.getCurrencyPattern = function(currencyCode, successCB, failureCB)
{
	// successCallback required
	if (typeof successCB != "function") {
        console.log("Globalization.getCurrencyPattern Error: successCB is not a function");
        return;
    }
	
    // errorCallback required
    if (typeof failureCB != "function") {
        console.log("Globalization.getCurrencyPattern Error: failureCB is not a function");
        return;
    }
	
	if(typeof currencyCode == "string") {
		PhoneGap.exec(successCB, failureCB, "GlobalizationCommand", "getCurrencyPattern", [{"currencyCode": currencyCode}]);
	}
	else {
		console.log("Globalization.getCurrencyPattern Error: currencyCode is not a currency code");
	}
};
PhoneGap.addConstructor(function()
{
	PhoneGap.addPlugin('globalization', new Globalization());
});

GlobalizationError = function() {
	this.code = null;
}

// Globalization error codes
GlobalizationError.UNKNOWN_ERROR = 0;
GlobalizationError.FORMATTING_ERROR = 1;
GlobalizationError.PARSING_ERROR = 2;
GlobalizationError.PATTERN_ERROR = 3;
};

var Maze = klass({
	initialize: function(cellSize, maze, trail, container) {
		Maze.INSTANCE = this;
		if (typeof(container) === 'string') {
			this.container = document.getElementById(container);
		} else if (typeof(container) == 'object') {
			this.container = container;
		}
		if (typeof(maze) === 'string') {
			this.mazeElement = document.getElementById(maze);
		} else if (typeof(maze) === 'object') {
			this.mazeElement = maze;
		}
		if (typeof(trail) === 'string') {
			this.trailElement = document.getElementById(trail);
		} else if (typeof(trail) === 'object') {
			this.trailElement = trail;
		}
		this.mazeCtx = this.mazeElement.getContext('2d');
		this.trailCtx = this.trailElement.getContext('2d');
		this.mazeCtx.canvas.width = this.container.offsetWidth;
		this.mazeCtx.canvas.height = this.container.offsetHeight;
		this.trailCtx.canvas.width = this.container.offsetWidth;
		this.trailCtx.canvas.height = this.container.offsetHeight;
		this.newGame(cellSize);
	},
	newGame: function(cellSize) {
		this.preload();
		this.initVariables();
		if (undefined != cellSize) {
			this.cellSize = parseInt(cellSize, 10);
		} else {
			this.cellSize = Maze.MEDIUM;
		}
		this.completed = false;
		this.flashes = 0;
		this.width = Math.floor((this.mazeCtx.canvas.width-1)/this.cellSize);
		this.height = Math.floor((this.mazeCtx.canvas.height-1)/this.cellSize);
		this.deltaWidth = (this.mazeCtx.canvas.width - this.width * this.cellSize) / 2;
		this.deltaHeight = (this.mazeCtx.canvas.height - this.height * this.cellSize) / 2;
		this.setupIcons();
		this.iconImg = new Image();
		this.iconImg.src = this.iconName;
		this.flagImg = new Image();
		this.flagImg.src = this.flagName;
		this.generate();
	},
	preload: function() {
		var imageNames = ["bug16", "bug24", "bug32", "bug64", "flag16", "flag24", "flag32", "flag64"];
		var images = [];
		this.loadedImages = 0;
		this.totalImages = imageNames.length;
		for (nameIdx in imageNames) {
			images[name] = new Image();
			images[name].src = imageNames[nameIdx] + ".png";
			images[name].onload = function() {
				Maze.INSTANCE.loadedImages++;
				if (Maze.INSTANCE.loadedImages == Maze.INSTANCE.totalImages) {
					Maze.INSTANCE.startGame();
				}
			}
		}
	},
	initVariables: function() {
		this.hWalls = [];
		this.vWalls = [];
		this.xPos = 0;
		this.yPos = 0;
		this.width = 0;
		this.height = 0;
		this.trail = [];
		this.showTrail = true;
		this.iconName = "bug64.png";
		this.iconImg = null;
		this.flagName = "flag64.png";
		this.flagImg = null;
		this.completed = false;
		this.intervalId = null;
		this.flashes = 0;
		this.moveAllowed = false;
		this.touchCellX = 0;
		this.touchCellY = 0;
		this.direction = null;
		this.onmazecompleted = null;
	},
	startGame: function() {
		this.displayGraphic();
		this.updatePosition();
	},
	setupIcons: function() {
		if (this.cellSize > 64) {
			this.iconName = "bug64";
			this.flagName = "flag64";
		} else if (this.cellSize > 32) {
			this.iconName = "bug32";
			this.flagName = "flag32";
		} else if (this.cellSize > 24) {
			this.iconName = "bug24";
			this.flagName = "flag24";
		} else {
			this.iconName = "bug16";
			this.flagName = "flag16";
		}
		this.iconName += ".png";
		this.flagName += ".png";
	},
	generate: function() {
		var x = this.width;
		var y = this.height;
		var n=x*y-1;
		if (n<0) {alert("illegal maze dimensions");return;}
		var horiz=[]; for (var j= 0; j<x+1; j++) horiz[j]= [];
		var verti=[]; for (var j= 0; j<x+1; j++) verti[j]= [];
		var here= [Math.floor(Math.random()*x), Math.floor(Math.random()*y)];
		var path= [here];
		var unvisited= [];
		for (var j= 0; j<x+2; j++) {
			unvisited[j]= [];
			for (var k= 0; k<y+1; k++)
				unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
		}
		while (0<n) {
			var potential= [[here[0]+1, here[1]], [here[0],here[1]+1],
			    [here[0]-1, here[1]], [here[0],here[1]-1]];
			var neighbors= [];
			for (var j= 0; j < 4; j++)
				if (unvisited[potential[j][0]+1][potential[j][1]+1])
					neighbors.push(potential[j]);
			if (neighbors.length) {
				n= n-1;
				next= neighbors[Math.floor(Math.random()*neighbors.length)];
				unvisited[next[0]+1][next[1]+1]= false;
				if (next[0] == here[0])
					horiz[next[0]][(next[1]+here[1]-1)/2]= true;
				else 
					verti[(next[0]+here[0]-1)/2][next[1]]= true;
				path.push(here= next);
			} else 
				here= path.pop();
		}
		this.hWalls = horiz;
		this.vWalls = verti;
	},
	displayGraphic: function() {
		this.mazeCtx.fillStyle = "rgba(0, 0, 0, 1)";
		this.mazeCtx.clearRect(0, 0, this.mazeCtx.canvas.width, this.mazeCtx.canvas.height);
		this.mazeCtx.fillStyle = "rgba(239, 239, 239, 1)";
		this.mazeCtx.fillRect(this.deltaWidth, this.deltaHeight, this.width*this.cellSize, this.height*this.cellSize);
		this.mazeCtx.strokeStyle = "rgba(0, 0, 0, 1)";
		this.mazeCtx.globalAlpha = 1;
		this.mazeCtx.lineWidth = 1.5;
		this.mazeCtx.lineCap = "square";
		this.mazeCtx.beginPath();
		for (var i=0; i<this.width; i++) {
			for (var j=0; j<this.height; j++) {
				if (!this.vWalls[i][j]) {
					this.mazeCtx.moveTo(this.cellSize*(i+1)+this.deltaWidth, this.cellSize*j+this.deltaHeight);
					this.mazeCtx.lineTo(this.cellSize*(i+1)+this.deltaWidth, this.cellSize*(j+1)+this.deltaHeight);
				}
				if (!this.hWalls[i][j]) {
					this.mazeCtx.moveTo(this.cellSize*i+this.deltaWidth, this.cellSize*(j+1)+this.deltaHeight);
					this.mazeCtx.lineTo(this.cellSize*(i+1)+this.deltaWidth, this.cellSize*(j+1)+this.deltaHeight);
				}
			}
		}
		this.mazeCtx.moveTo(0+this.deltaWidth, this.cellSize*this.height+this.deltaHeight);
		this.mazeCtx.lineTo(0+this.deltaWidth, 0+this.deltaHeight);
		this.mazeCtx.lineTo(this.cellSize*this.width+this.deltaWidth, 0+this.deltaHeight);
		this.mazeCtx.stroke();
		this.mazeCtx.closePath();
		var x = this.cellSize*(this.width-1) + (this.cellSize-this.flagImg.width)/2 + this.deltaWidth;
		var y = this.cellSize*(this.height-1) + (this.cellSize-this.flagImg.height)/2 + this.deltaHeight;
		this.mazeCtx.drawImage(this.flagImg, x, y);
	},
	displayText: function() {
		var text= [];
		for (var j= 0; j<this.width*2+1; j++) {
			var line= [];
			if (0 == j%2) {
				for (var k=0; k<this.height*4+1; k++) {
					if (0 == k%4) {
						line[k]= '+';
					} else {
						if (j>0 && this.vWalls[j/2-1][Math.floor(k/4)]) {
							line[k]= ' ';
						} else {
							line[k]= '-';
						}
					}
				}
			} else {
				for (var k=0; k<this.height*4+1; k++){
					if (0 == k%4) {
						if (k>0 && this.hWalls[(j-1)/2][k/4-1]){
							line[k]= ' ';
						} else {
							line[k]= '|';
						}
					} else {
						line[k]= ' ';
					}
				}
			}
			if (0 == j) line[1]= line[2]= line[3]= ' ';
			if (this.width*2-1 == j) line[4*this.height]= ' ';
			text.push(line.join('')+'\r\n');
		}
		return text.join('');
	},
	move: function(direction) {
		if (!this.completed) {
			if (Maze.LEFT === direction) {
				this.moveLeft();
			} else if (Maze.RIGHT === direction) {
				this.moveRight();
			} else if (Maze.UP === direction) {
				this.moveUp();
			} else if (Maze.DOWN === direction) {
				this.moveDown();
			}
			this.updatePosition();
			if ((this.xPos == this.width-1) && (this.yPos == this.height-1)) {
				this.mazeCompleted();
			}
		}
	},
	moveLeft: function() {
		if (this.xPos > 0 && this.vWalls[this.xPos-1][this.yPos]) {
			this.xPos -= 1;
			if (this.trail[this.trail.length-1] === Maze.RIGHT) {
				this.trail.pop();
			} else {
				this.trail.push(Maze.LEFT);
			}
		}
	},
	moveRight: function() {
		if (this.xPos <= this.width && this.vWalls[this.xPos][this.yPos]) {
			this.xPos += 1;
			if (this.trail[this.trail.length-1] === Maze.LEFT) {
				this.trail.pop();
			} else {
				this.trail.push(Maze.RIGHT);
			}
		}
	},
	moveUp: function() {
		if (this.yPos > 0 && this.hWalls[this.xPos][this.yPos-1]) {
			this.yPos -= 1;
			if (this.trail[this.trail.length-1] === Maze.DOWN) {
				this.trail.pop();
			} else {
				this.trail.push(Maze.UP);
			}
		}
	},
	moveDown: function() {
		if (this.yPos <= this.height && this.hWalls[this.xPos][this.yPos]) {
			this.yPos += 1;
			if (this.trail[this.trail.length-1] === Maze.UP) {
				this.trail.pop();
			} else {
				this.trail.push(Maze.DOWN);
			}
		}
	},
	touchStart: function(ev) {
		if (ev.touches.length == 1) {
			this.moveAllowed = true;
			var touch = ev.touches[0];
			this.touchCellDiffX = this.xPos - Math.floor((touch.screenX - container.offsetLeft + this.deltaWidth) / this.cellSize);
			this.touchCellDiffY = this.yPos - Math.floor((touch.screenY - container.offsetTop + this.deltaHeight) / this.cellSize);
		} else {
			this.moveAllowed = false;
		}
	},
	touchMove: function(ev) {
		if (this.moveAllowed) {
			var touch = ev.touches[0];
			var newCellX = Math.floor((touch.screenX - container.offsetLeft + this.deltaWidth) / this.cellSize) + this.touchCellDiffX;
			var newCellY = Math.floor((touch.screenY - container.offsetTop + this.deltaHeight) / this.cellSize) + this.touchCellDiffY;
			var direction = null;
			if (Math.abs(this.xPos - newCellX) > Math.abs(this.yPos - newCellY)) {
				if (this.xPos > newCellX) {
					direction = Maze.LEFT;
				} else if (this.xPos < newCellX) {
					direction = Maze.RIGHT;
				}
			} else if (Math.abs(this.xPos - newCellX) < Math.abs(this.yPos - newCellY)) {
				if (this.yPos > newCellY) {
					direction = Maze.UP;
				} else if (this.yPos < newCellY) {
					direction = Maze.DOWN;
				}
			}
			if (direction != null) {
				this.move(direction);
			}
		}
	},
	touchEnd: function(ev) {
		this.moveAllowed = false;
		this.touchCellDiffX = 0;
		this.touchCellDiffY = 0;
	},
	updatePosition: function() {
		this.trailCtx.clearRect(0, 0, this.trailCtx.canvas.width, this.trailCtx.canvas.height);
		if (this.showTrail == true) {
			var x=this.cellSize/2+this.deltaWidth,y=this.cellSize/2+this.deltaHeight;
			this.trailCtx.beginPath();
			this.trailCtx.moveTo(x, y);
			for (var i=0; i<this.trail.length; i++) {
				if (this.trail[i] === Maze.LEFT) {
					x -= this.cellSize;
				} else if (this.trail[i] === Maze.RIGHT) {
					x += this.cellSize;
				} else if (this.trail[i] === Maze.UP) {
					y -= this.cellSize;
				} else if (this.trail[i] === Maze.DOWN) {
					y += this.cellSize;
				}
				this.trailCtx.lineTo(x, y);
			}
			this.trailCtx.strokeStyle = "rgba(255, 0, 0, 1)";
			this.trailCtx.lineWidth = this.cellSize/4;
			this.trailCtx.lineCap = "round";
			this.trailCtx.lineJoin = "round";
			this.trailCtx.stroke();
			this.trailCtx.closePath();
		}
		if (this.cellSize > this.iconImg.width) {
			x = this.xPos*this.cellSize + (this.cellSize-this.iconImg.width)/2 + this.deltaWidth;
			y = this.yPos*this.cellSize + (this.cellSize-this.iconImg.height)/2 + this.deltaHeight;
			this.trailCtx.drawImage(this.iconImg, x, y);
		} else {
			x = this.xPos*this.cellSize + this.cellSize/4 + this.deltaWidth;
			y = this.yPos*this.cellSize + this.cellSize/4 + this.deltaHeight;
			this.trailCtx.fillStyle = "rgba(255, 0, 0, 1)";
			this.trailCtx.fillRect(x, y, this.cellSize/2, this.cellSize/2);
		}
	},
	mazeCompleted: function() {
		this.intervalId = setInterval(this.animateCompleted, 250);
		this.completed = true;
	},
	animateCompleted: function() {
		if (Maze.INSTANCE.flashes == 8) {
			clearInterval(Maze.INSTANCE.intervalId);
			if (typeof(Maze.INSTANCE.onmazecompleted) != 'undefined') {
				Maze.INSTANCE.onmazecompleted.call(window);
			}
		} else if (Maze.INSTANCE.flashes%2 == 0) {
			Maze.INSTANCE.trailCtx.clearRect(0, 0, Maze.INSTANCE.trailCtx.canvas.width, Maze.INSTANCE.trailCtx.canvas.height);
			Maze.INSTANCE.flashes += 1;
		} else if (Maze.INSTANCE.flashes%2 == 1) {
			Maze.INSTANCE.flashes += 1;
			Maze.INSTANCE.updatePosition();			
		}
	}
}).statics({
	INSTANCE: null,
	DELTA: 0.5,
	EASY: 40,
	MEDIUM: 20,
	HARD: 10,
	LEFT: "left",
	RIGHT: "right",
	UP: "up",
	DOWN: "down"
});


var isEventSupported = (function(){
    var TAGNAMES = {
      'select':'input','change':'input',
      'submit':'form','reset':'form',
      'error':'img','load':'img','abort':'img'
    }
    function isEventSupported(eventName) {
      var el = document.createElement(TAGNAMES[eventName] || 'div');
      eventName = 'on' + eventName;
      var isSupported = (eventName in el);
      if (!isSupported) {
        el.setAttribute(eventName, 'return;');
        isSupported = typeof el[eventName] == 'function';
      }
      el = null;
      return isSupported;
    }
    return isEventSupported;
  })();

function isMouseEventSupported(eventName) {
    var el = document.createElement('div');
    eventName = 'on' + eventName;
    var isSupported = (eventName in el);
    if (!isSupported) {
      el.setAttribute(eventName, 'return;');
      isSupported = typeof el[eventName] == 'function';
    }
    el = null;
    return isSupported;
  }







	var m = null;
	Events.ready(function() {	
		try {
			var difficulty = window.location.hash.substring(1);
			m = new Maze(difficulty, 'maze', 'trail', 'container');
		} catch(e) {
			alert("No se puede mostrar el laberinto:\n" + e);
		}
		key('up', function() {
			m.move(Maze.UP);
		});
		key('down', function() {
			m.move(Maze.DOWN);
		});
		key('left', function() {
			m.move(Maze.LEFT);
		});
		key('right', function() {
			m.move(Maze.RIGHT);
		});
	 	Events.bind(window, 'touchstart', function(e) {
			return false;
		});
		Events.bind(document.getElementById('container'), 'touchstart', function(e) {
			m.touchStart(e);
		});
		Events.bind(document.getElementById('container'), 'touchmove', function(e) {
			m.touchMove(e);
			e.preventDefault();
		});
		Events.bind(document.getElementById('container'), 'touhend', function(e) {
			m.touchEnd(e);
		});
		window.focus();
	});
	

/*
jQuery Localizer Plugin

Copyright (c) 2011 Sagi Mann
All rights reserved.

Redistribution and use in source and binary forms are permitted
provided that the above copyright notice and this paragraph are
duplicated in all such forms and that any documentation,
advertising materials, and other materials related to such
distribution and use acknowledge that the software was developed
by the <organization>.  The name of the
University may not be used to endorse or promote products derived
from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED ``AS IS'' AND WITHOUT ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, WITHOUT LIMITATION, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
*/

jQuery.fn.localize = function(stringsVar) {
	var stringRes = stringsVar || strings;
	this.find("*").contents().each(function() {
			if (typeof this.data == 'string') {
				var s = jQuery.trim(this.data);
				if (typeof s == 'string' && s.length > 0) {
					var s2 = stringRes[s];
					if (typeof s2 == 'string') {
						this.data = s2;
					}
				}
			}
			
			if (this.nodeName == "IMG") {
				// use the nodeValue instead of this.src because this.src is resolved to full path instead of the original value in the html, so it can't be known at coding time.
				var s2 = stringRes[this.attributes['src'].nodeValue];
				if (typeof s2 == 'string') {
					this.attributes['src'].nodeValue = s2;
				}
			}

			if (this.nodeName == "A") {
				// use the nodeValue instead of this.href because this.href is resolved to full path instead of the original value in the html, so it can't be known at coding time.
				var s2 = stringRes[this.attributes['href'].nodeValue];
				if (typeof s2 == 'string') {
					this.href = s2;
				}
			}
			return this;
	});
	
};

var strings_es = {
		'Nueva partida': 'Nueva partida',
		'Continuar partida': 'Continuar partida',
		'Dificultad': 'Dificultad',
		'Muy fácil': 'Muy fácil',
		'Fácil': 'Fácil',
		'Medio': 'Medio',
		'Difícil': 'Difícil',
		'Muy difícil': 'Muy difícil',
		'Salir': 'Salir'
};

var strings_en = {
		'Nueva partida': 'New game',
		'Continuar partida': 'Continue game',
		'Dificultad': 'Difficulty',
		'Muy fácil': 'Very easy',
		'Fácil': 'Easy',
		'Medio': 'Medium',
		'Difícil': 'Hard',
		'Muy difícil': 'Very hard',
		'Salir': 'Quit game'
};

var strings_fr = {
		'Nueva partida': 'Nouveau jeu',
		'Continuar partida': 'Reprise du jeu',
		'Dificultad': 'Difficulté',
		'Muy fácil': 'Très facile',
		'Fácil': 'Facile',
		'Medio': 'Moyens',
		'Difícil': 'Difficile',
		'Muy difícil': 'Très difficile',
		'Salir': 'Quitter'
};

var strings_de = {
	'Nueva partida': 'Neues Spiel',
	'Continuar partida': 'Spiel fortsetzen',
	'Dificultad': 'Schwierigkeit',
	'Muy fácil': 'Sehr einfach',
	'Fácil': 'Leicht',
	'Medio': 'Mittel',
	'Difícil': 'Schwierig',
	'Muy difícil': 'Very hard',
	'Salir': 'Spiel beenden'
};

var strings_it = {
	'Nueva partida': 'Nuovo gioco',
	'Continuar partida': 'Riprendi gioco',
	'Dificultad': 'Difficoltà',
	'Muy fácil': 'Molto facile',
	'Fácil': 'Facile',
	'Medio': 'Mezzo',
	'Difícil': 'Difficile',
	'Muy difícil': 'Molto difficile',
	'Salir': 'Esci dal gioco'
};

