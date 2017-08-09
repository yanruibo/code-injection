












        	if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
        		document.write('<script type="text/javascript" src="cordova-2.5.0-ios.js"><\/script>');
        		document.write('<script type="text/javascript" src="InAppPurchaseManager.js"><\/script>');
        	} else /* Android or browser */ {
        		document.write('<script type="text/javascript" src="cordova-2.5.0.js"><\/script>');
        	}
        







































/** 
 * A plugin to enable iOS In-App Purchases.
 *
 * Copyright (c) Matt Kane 2011
 * Copyright (c) Guillaume Charhon 2012
 */

var InAppPurchaseManager = function() { 
	cordova.exec(null, function () {
		// It occurs when user can't purchase anything
	}, "InAppPurchaseManager", "setup", []);
}

/**
 * Makes an in-app purchase. 
 * 
 * @param {String} productId The product identifier. e.g. "com.example.MyApp.myproduct"
 * @param {int} quantity 
 */

InAppPurchaseManager.prototype.makePurchase = function(productId, quantity) {
	var q = parseInt(quantity);
	if(!q) {
		q = 1;
	}
    
    // return
    cordova.exec(null, null, "InAppPurchaseManager", "makePurchase", [productId, q]);
}

/**
 * Asks the payment queue to restore previously completed purchases.
 * The restored transactions are passed to the onRestored callback, so make sure you define a handler for that first.
 * 
 */

InAppPurchaseManager.prototype.restoreCompletedTransactions = function() {
	// return
    cordova.exec(null, null, "InAppPurchaseManager", "restoreCompletedTransactions", []);
}


/**
 * Retrieves the localised product data, including price (as a localised string), name, description.
 * You must call this before attempting to make a purchase.
 *
 * @param {String} productId The product identifier. e.g. "com.example.MyApp.myproduct"
 * @param {Function} successCallback Called once for each returned product id. Signature is function(productId, title, description, price)
 * @param {Function} failCallback Called once for each invalid product id. Signature is function(productId)
 */

InAppPurchaseManager.prototype.requestProductData = function(productId, successCallback, failCallback) {
    cordova.exec(successCallback, failCallback, "InAppPurchaseManager", "requestProductData", [productId]);	
}

/**
 * Retrieves localised product data, including price (as localised
 * string), name, description of multiple products.
 *
 * @param {Array} productIds
 *   An array of product identifier strings.
 *
 * @param {Function} callback
 *   Called once with the result of the products request. Signature:
 *
 *     function(validProducts, invalidProductIds)
 *
 *   where validProducts receives an array of objects of the form
 *
 *     {
 *      id: "<productId>",
 *      title: "<localised title>",
 *      description: "<localised escription>",
 *      price: "<localised price>"
 *     }
 *
 *  and invalidProductIds receives an array of product identifier
 *  strings which were rejected by the app store.
 */
InAppPurchaseManager.prototype.requestProductsData = function(productIds, callback) {
	cordova.exec(callback, null, "InAppPurchaseManager", "requestProductsData", [productIds]);
};

/* function(transactionIdentifier, productId, transactionReceipt) */
InAppPurchaseManager.prototype.onPurchased = null;

/* function(originalTransactionIdentifier, productId, originalTransactionReceipt) */
InAppPurchaseManager.prototype.onRestored = null;

/* function(errorCode, errorText) */
InAppPurchaseManager.prototype.onFailed = null;

/* function() */
InAppPurchaseManager.prototype.onRestoreCompletedTransactionsFinished = function () {
	console.log("restored transaction");
};

/* function(errorCode) */
InAppPurchaseManager.prototype.onRestoreCompletedTransactionsFailed = null;

/* This is called from native.*/

InAppPurchaseManager.prototype.updatedTransactionCallback = function(state, errorCode, errorText, transactionIdentifier, productId, transactionReceipt) {
	switch(state) {
		case "PaymentTransactionStatePurchased":
			if(window.plugins.inAppPurchaseManager.onPurchased)
                window.plugins.inAppPurchaseManager.onPurchased(transactionIdentifier, productId, transactionReceipt);
			
			return; 
			
		case "PaymentTransactionStateFailed":
			if(window.plugins.inAppPurchaseManager.onFailed)
				window.plugins.inAppPurchaseManager.onFailed(errorCode, errorText);
			
			return;
            
		case "PaymentTransactionStateRestored":
            if(window.plugins.inAppPurchaseManager.onRestored)
                window.plugins.inAppPurchaseManager.onRestored(transactionIdentifier, productId, transactionReceipt);
			return;
	}
};

InAppPurchaseManager.prototype.restoreCompletedTransactionsFinished = function() {
    if (this.onRestoreCompletedTransactionsFinished) {
        this.onRestoreCompletedTransactionsFinished();
    }
};

InAppPurchaseManager.prototype.restoreCompletedTransactionsFailed = function(errorCode) {
    if (this.onRestoreCompletedTransactionsFailed) {
        this.onRestoreCompletedTransactionsFailed(errorCode);
    }
};

/*
 * This queue stuff is here because we may be sent events before listeners have been registered. This is because if we have 
 * incomplete transactions when we quit, the app will try to run these when we resume. If we don't register to receive these
 * right away then they may be missed. As soon as a callback has been registered then it will be sent any events waiting
 * in the queue.
 */

InAppPurchaseManager.prototype.runQueue = function() {
	if(!this.eventQueue.length || (!this.onPurchased && !this.onFailed && !this.onRestored)) {
		return;
	}

	var args;
	/* We can't work directly on the queue, because we're pushing new elements onto it */
	var queue = this.eventQueue.slice();
	this.eventQueue = [];
	while(args = queue.shift()) {
		this.updatedTransactionCallback.apply(this, args);
	}
	if(!this.eventQueue.length) {	
		this.unWatchQueue();
	}
}

InAppPurchaseManager.prototype.watchQueue = function() {
	if(this.timer) {
		return;
	}
	this.timer = setInterval("window.plugins.inAppPurchaseManager.runQueue()", 10000);
}

InAppPurchaseManager.prototype.unWatchQueue = function() {
	if(this.timer) {
		clearInterval(this.timer);
		this.timer = null;
	}
}

InAppPurchaseManager.prototype.callbackMap = {};
InAppPurchaseManager.prototype.callbackIdx = 0;
InAppPurchaseManager.prototype.eventQueue = [];
InAppPurchaseManager.prototype.timer = null;

document.addEventListener("deviceready", function()  {
	window.plugins = window.plugins || {};
	window.plugins.inAppPurchaseManager = InAppPurchaseManager.manager = new InAppPurchaseManager();

	window.plugins.inAppPurchaseManager.onPurchased = function(transactionIdentifier, productId, transactionReceipt) {
        console.log('purchased: ' + productId);

        // If failed a receipt validation on server, you can restore transaction this payment.
        // window.plugins.inAppPurchaseManager.restoreCompletedTransactions();
    }

    // Perhaps It did rollback a transaction
    window.plugins.inAppPurchaseManager.onRestored = function(transactionIdentifier, productId, transactionReceipt) {
        console.log('restored: ' + productId);
        /* See the developer guide for details of what to do with this */
    }

    // Failed to purchase an item
    window.plugins.inAppPurchaseManager.onFailed = function(errno, errtext) {
    	alert(errtext);
    }

    // requestProductData -> { id, title, description, price }
    // requestProductsData -> [[{ id, title, description, price }, ... ], [invaildID]]
    // plugins.inAppPurchaseManager.requestProductData("1", function(result) {
    //         window.plugins.inAppPurchaseManager.makePurchase(result.id, 1 /* quantity */);
    //     }, function(id) {
    //         console.log("[In JS] Invalid product id: " + id);
    //     }
    // );
});




var signupPage = (function signupPage() {	// signupPage namespace

$('#signupPage').live('pageshow', function(event) {
	// Signup
	activeContent('#signup').click(function () {
		var email = activeContent('#email').val();
		var password = activeContent('#password').val();
		var confirm_password = activeContent('#confirm_password').val();
		signup(email, password, confirm_password);
	});
	
	// Login dopo signed up (bottone Accedi in popup)
	activePage('.login').click(function () {
		activeContent().hide();
		var email = activeContent('#email').val();
		var password = activeContent('#password').val();
		// Login (sfrutta la funzione dichiarate nell'index)
		login(email, password);
	});
});

//Signup
function signup(email, password, confirm_password) {
	var actionUrl = getServiceAction('signup');
	
	// Online: check login
	if (sync.isOnline()) {
		showLoading();
		$.post(actionUrl, {email: email, password: password, confirm_password: confirm_password}, function (response) {
			response = $.parseJSON(response);
			hideLoading();
			if (response.valid) {
				activePage('#signupSuccess').popup();
				activePage('#signupSuccess').popup('open');
				activePage('#signupSuccess').on({
				    popupbeforeposition: function () {
				        $('.ui-popup-screen').off();	// evita di chiudere il popup se si clicca fuori
				    }
				});
			} else {
				activePage('#signupError p').html("Errore durante la registrazione:"+response.errorMsg);
				activePage('#signupError').popup();
				activePage('#signupError').popup('open');
			}
		});
	} else {
		
		activePage('#signupError p').html("Connessione non disponibile: impossibile effettuare la registrazione.");
		activePage('#signupError').popup();
		activePage('#signupError').popup('open');
		
	}
}

})();	// signupPage namespace end

var statdayParamPage = (function statdayParamPage() {	// statdayParamPage namespace

var timerId = 0;
var deleteMode = false;

$('#statdayParamPage').live('pagecreate', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	var day = val(undefToEmpty(params['day']));	// js timestamp
	
	var date = new Date(day);
	
	// title
	$(this).find('[data-role="header"] h1').text(date.format('dddd d mmmm yyyy'));
	
	// add params to add_routine link
	$(this).find('[data-role="content"] a.add_routine').each(function () {
		var href = $(this).attr('href');
		// return here (select_mode=1 parameter already appended in static page)
		href += '&return_uri='+strurl('statday_param.html?day='+day);
		// apply new href
		$(this).attr('href', href);
	});
});

$('#statdayParamPage').live('pageinit', function(event) {
});

$('#statdayParamPage').live('pagebeforeshow', function(event) {
	
});

$('#statdayParamPage').live('pageshow', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	var day = val(undefToEmpty(params['day']));	// js timestamp
	var routineLocalId = val((undefToEmpty(params['routine_local_id'])));	// return from routines.html in select mode
	
	if (routineLocalId > 0) {
		// add routine to statdays
		cc.get('routines', {local_id: routineLocalId}, function (routine) {
			// check it's sync: need to add server id...
			if (routine.id == 0) {	// not sync: show message to sync
				msgAlert("Impossibile aggiungere questa scheda perché non ancora sincronizzata con il server.");
				doList(day);
			} else {
				showLoading();
				addStatdayRoutine(day, routine, function () {
					sync.postGetData();	// force sync now
					doList(day);
				});
			}
		});
	} else {
		doList(day);
	}
	
	// show/hide syncing message
	checkSync(day);
	timerId = setInterval(function () {
		checkSync(day);
	}, 5000);
});

$('#statdayParamPage').live('pageremove', function(event) {
	// reset namespace vars
	clearInterval(timerId);
	timerId = 0;
	deleteMode = false;
});

$('#statdayParamPage .delete_mode').live('click', function() {
	switchDeleteMode(true);
});
$('#statdayParamPage .delete_mode_end').live('click', function() {
	switchDeleteMode(false);
});
$('#statdayParamPage ul.statday_routines li a').live('click', function () {
	var params = getUrlVars();
	var day = val(undefToEmpty(params['day']));	// js timestamp
	
	if (deleteMode) {
		showLoading();
		var routineId = $(this).data('routine_id');
		removeStatdayRoutine(day, routineId, function () {
			//sync.postGetData();	// force sync now
			activeContent('ul.statday_routines li[data-routine_id="'+routineId+'"]').remove();
			hideLoading();
		});
		return false;
	}
});

function checkSync(day) {
	var date = new Date(day);
	cc.get('statdays', { where: function (item) {return item.day == date.format('yyyy-mm-dd');} }, function (statday) {
		if (statday != null) {
			if (statday.post && sync.started)
				activeContent('.statday_sync').show();
			else
				activeContent('.statday_sync').hide();
		}
	});
}

function doList(day) {
	var date = new Date(day);
	var routines = [];
	
	showLoading();
	cc.get('statdays', { where: function (item) {return item.day == date.format('yyyy-mm-dd');} }, function (statday) {
		if (statday != null) {
			routines = statday.routines;
		}
		
		if (routines.length > 0) {
			// retrive all exercieses (used to show every routine list items)
			cc.getList('exercises', {}, function (exercises) {
				// loop statday routines (reverse to show in order of adding desc.)
				var html = '';
				var i = 0;	// use this i instead of index of $.each loop: cc.get is async.
				$.each(routines.reverse(), function (index, routine) {
					if (routine != null) {	// routine could be deleted
						var image = routine._image_small;
						if (routine.exercises.length > 0) {
							var exercise = cc.linqFilter(exercises, {where: function (item) {return item.id == routine.exercises[0].exercise_id} });
							if (exercise.length > 0)
								image = exercise[0]._image_small;
						}
						routine._image = image;
						html += htmlStatdayRoutine(routine);
					}
					i++;
					if (i == routines.length) {	// all routine items are ready
						activeContent('ul.statday_routines').html(html);
						activeContent('ul.statday_routines').listview('refresh');
						activeContent('ul.statday_routines').show();
						if (!deleteMode)
							activeContent('.delete_mode').show();	// have routines: can go in delete mode to select a routine to delete it...
						hideLoading();
					}
				});
			});
		} else {
			// no routines yet
			var html = '';
			html += '<li class="noresults"><p>Nessuna scheda ancora presente in questo giorno.</p></li>';
			activeContent('ul.statday_routines').html(html);
			activeContent('ul.statday_routines').listview('refresh');
			activeContent('ul.statday_routines').show();
			hideLoading();
		}
	});
}

function htmlStatdayRoutine(routine) {
	var params = getUrlVars();
	var day = val(undefToEmpty(params['day']));	// js timestamp
	
	// Build HTML for the single routine item
	var html = '';
	
	if (deleteMode)
		html = '<li data-icon="trash" data-routine_id="'+routine.id+'">';
	else
		html = '<li data-icon="bar-chart">';
	
	html += '<a href="routine.html?day='+day+'&routine_id='+routine.id+'&stats_mode=1&return_uri='+strurl('statday_param.html?day='+day)+'" data-routine_id="'+routine.id+'">';
	
	html += '<img src="'+routine._image+'">';
	html += '<h2 style="'+(deleteMode ? 'color:red;' : '')+'">'+routine.name+'</h2>';
	
	if (routine._descr1)
		html += '<p class="descr1">'+routine._descr1+'</p>';
	if (routine._descr2)
		html += '<p class="descr2">'+routine._descr2+'</p>';
	
	html += '</a>';
	html += '</li>';
	
	return html;
}

function switchDeleteMode(on) {
	var params = getUrlVars();
	var day = val(undefToEmpty(params['day']));	// js timestamp
	
	deleteMode = on;
	
	showLoading();
	on ? sync.stop() : sync.start();
	on ? activePage('.delete_mode_end').show() : activePage('.delete_mode_end').hide();;
	on ? activePage('[data-role="header"] h1').addClass('left') : activePage('[data-role="header"] h1').removeClass('left');;
	on ? activePage('[data-role="header"] .back').hide() : activePage('[data-role="header"] .back').show();;
	on ? activeContent('.delete_mode_msg').show() : activeContent('.delete_mode_msg').hide();;
	on ? activeContent('.delete_mode').hide() : activeContent('.delete_mode').show();;
	on ? activeContent('.add_routine').hide() : activeContent('.add_routine').show();;
	on ? activeContent('.info_msg').hide() : activeContent('.info_msg').show();
	
	doList(day);
	$(document).scrollTop(0);
}

})();	// statdayParamPage namespace end

var settingsPage = (function settingsPage() {	// settingsPage namespace

$('#settingsPage').live('pagecreate', function(event) {
});

$('#settingsPage').live('pageinit', function(event) {
	sync.stop();
});

$('#settingsPage').live('pagebeforeshow', function(event) {
	activeContent('[data-tab-content="account"]').hide();
	activeContent('[data-tab-content="info"]').show();
	activeContent().hide();
});

$('#settingsPage').live('pageshow', function(event) {
	// tabs
	activePage('[data-role="navbar"] [data-tab]').click(function () {
		var tab = $(this).data('tab');
		activeContent('[data-tab-content]').hide();
		activeContent('[data-tab-content="'+tab+'"]').show();
		$(document).scrollTop(0);
	});
	
	showLoading();
	cc.get('users', {id: storage.getItem('userId')}, function (user) {
		$.each(user, function (key, value) {
			console.log(key+': '+value);
			switch (key) {
				case 'birthday':
					if (val(value) > 0) {	// if date is not 0000-00-00
						var d = getDate(value);
						activeContent('[name="birthday_d"]').val(d.getDate());
						activeContent('[name="birthday_m"]').val(d.getMonth()+1);
						activeContent('[name="birthday_y"]').val(d.getFullYear());
					}
					// no break: goto default
				case 'image':
					if (value != '') {
						activeContent('img.image').attr('src', user._image_small);
					}
					// no break: goto default
				default:
					activeContent('[name="'+key+'"]').val(value);
					break;
			}
		});
		hideLoading();
		activeContent().show();
		
		// Refresh Selects
		activeContent('select').selectmenu('refresh');
		
		// Version
		activeContent('.version').text(userTypeDescr(user.type));
		activeContent('.created').text(getDate(user._created_local).format('dd/mm/yyyy'));
		activeContent('.upgrade_android a').attr('href', appAndroidPro)
		activeContent('.upgrade_ios a').attr('href', appiOsPro)
		if (user.type == 'free' && typeof device !== 'undefined') {
			if (device.platform == 'Android')
				activeContent('.upgrade_android').show();
			else if (device.platform == 'iOS' || device.platform == 'iPhone' || device.platform == 'iPod' || device.platform == 'iPad')
				activeContent('.upgrade_ios').show();
		}
		
		
		// Events
		activePage('.captureAndUpload').click(function () {
			var camera = $(this).data('camera');
			captureAndUpload(camera);
		});
		activePage('.removePhoto').click(function () {
			removePhoto();
		});
		activePage('.save').click(function () {
			// Per modificare le impostazioni bisogna essere online (soprattutto per il discorso del cambio email: il controllo
			// di disponibilità nuova email va fatto subito e anche per l'upload dell'immagine).
			if (!sync.isOnline()) {
				msgAlert("Attenzione! Non è possibile modificare le informazioni del profilo in modalità offline.")
			} else {
				// save settings to server directly
				save();
			}
			return false;
		});
	});
});

function captureAndUpload(camera) {
	if (window.location.href.substr(0, 4) == 'http' || typeof Camera == 'undefined') {	// Phonegap è file://
		alert("Modalità test via browser: funzione disponibile solo nell'app reale.");
		return;
	}
	
	showLoading();
	uploadImage.captureAndUpload(camera, 'user', storage.getItem('userId'), 'image', function (response, imageURI) {
		//alert($.toJSON(response));
		if (undefToEmpty(response.success, false)) {
			//setTimeout(function () {	// fix
				sync.postGetData(function () {	// get new image resized
					cc.get('users', {id: storage.getItem('userId')}, function (user) {
						activeContent('img.image').attr('src', user._image_small);
						hideLoading();
					});
				});
			//}, 0);
		} else {
			hideLoading();
			alert(response.error);
		}
	}, function (error) {
		hideLoading();
		alert($.toJSON(error));
	});
	return false;
}

function removePhoto() {
	showLoading();
	cc.get('users', {id: storage.getItem('userId')}, function (user) {
		user.image = '';
		cc.save('users', user, function () {
			uploadImage.removeUpload('user', storage.getItem('userId'), 'image', function () {
				sync.postGetData(function () {	// get new image resized
					cc.get('users', {id: storage.getItem('userId')}, function (user) {
						activeContent('img.image').attr('src', user._image_small);
						hideLoading();
					});
				});
			});
		});
	});
}

function save() {
	var userId = storage.getItem('userId');
	var userIdEnc = storage.getItem('userIdEnc');
	
	var params = {
		from_app: true,
		user_id: userId,
		user_id_enc: userIdEnc,
		save: true
	};
	
	activeContent('form input, form textarea, form select').each(function () {
		var paramName = $(this).attr('name');
		var value = $(this).val();
		params[paramName] = value;
	});
	
	// save...
	console.log(serverUrl+'account/settings');
	console.log($.param(params));
	showLoading();
	// post to server
	$.post(serverUrl+'account/settings', params, function (response) {
		var response = $.parseJSON(response);
		if (response.valid) {	// OK!
			// save locally
			cc.get('users', {id: userId}, function (user) {
				$.each(user, function (key, value) {
					if (params[key] !== undefined)
						user[key] = params[key];
				});
				cc.save('users', user, function () {
					hideLoading();
					if (storage.getItem('loginEmail') != params['email']) {
						storage.setItem('loginEmail', params['email']);
					}
					$.mobile.changePage('home.html');	// back to home
				});
			});
		} else {	// KO!
			hideLoading();
			activePage('#settingsError p').html("Errore durante il salvataggio:"+response.errorMsg);
			activePage('#settingsError').popup();
			activePage('#settingsError').popup('open');
		}
	});
}

})();	// settingsPage namespace end

/**
 * Storage class
 */

var storage = new function Storage() {
	
	this.setItem = function(key, value) {
		window.localStorage.setItem(key, value);
	}
	
	this.getItem = function(key) {
		return window.localStorage.getItem(key);
	}
	
	this.removeItem = function(key) {
		window.localStorage.removeItem(key);
	}
	
	this.clear = function() {
		window.localStorage.clear();
	}
}

var routineExercisePage = (function routineExercisePage() {	// routineExercisePage namespace

var title = '';		// keep title
var sliderPosition = 0;
var scrollPos = 0;
var isBack = false;

var noVideo = false;

$('#routineExercisePage').live('pagecreate', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	var tab = undefToEmpty(params['tab'], 'info');
	var routine_local_id = undefToEmpty(params['routine_local_id'], 0);
	var routine_exercise_index = undefToEmpty(params['routine_exercise_index'], 0);
	var trainingMode = val(undefToEmpty(params['training_mode'], 0));
	
	// browsing standalone exercises
	var exercise_local_id = undefToEmpty(params['exercise_local_id'], 0);
	
	// h1
	if (title) {	// avoid title flashing on tab change
		$(this).find('[data-role="header"] h1').text(title);
	}
	
	// active tab
	$(this).find('[data-role="header"] [data-tab="'+tab+'"] a').addClass('ui-btn-active');
	
	// add params to tab links
	$(this).find('[data-role="header"] [data-tab] a').each(function () {
		var href = $(this).attr('href');
		// fix link to same page issue
		href += '&ts='+(new Date().getTime());
		// add routine_local_id and routine_exercise_index
		href += '&routine_local_id='+routine_local_id+'&routine_exercise_index='+routine_exercise_index+'&training_mode='+trainingMode+'&exercise_local_id='+exercise_local_id;
		// apply new href
		$(this).attr('href', href);
	});
	
	// Back to routine (
	$(this).page().find('[data-rel="back"]').click(function() {
		if (routine_local_id > 0)	// back to routine
			$.mobile.changePage('routine.html?local_id='+routine_local_id+'&training_mode='+trainingMode);
		else	// browsing exercises: back to exercise list
			$.mobile.changePage('exercises.html');
		return false;
	});
	
	if (noVideo) {
		$(this).page().find('[data-role="header"] [data-tab="video"]').remove();
		$(this).page().find('[data-role="header"] [data-role="navbar"] ul').removeClass('ui-grid-c').addClass('ui-grid-b');
	}
	
	if (exercise_local_id > 0) {	// browsing standalone exercise
		$(this).page().find('[data-role="header"] [data-tab="sets"]').remove();
	}
});

$('#routineExercisePage').live('pagebeforeshow', function(event, data) {
	isBack = (data.prevPage.attr('id') == 'setPage');
});

$('#routineExercisePage').live('pageshow', function(event) {
	// stop sync (restart at page change)
	sync.stop();
	
	var params = getUrlVars($(this).attr('data-url'));
	var tab = undefToEmpty(params['tab'], 'info');
	var routine_local_id = undefToEmpty(params['routine_local_id'], 0);
	var routine_exercise_index = undefToEmpty(params['routine_exercise_index'], 0);
	var trainingMode = val(undefToEmpty(params['training_mode'], 0));
	
	// browsing standalone exercises
	var exercise_local_id = undefToEmpty(params['exercise_local_id'], 0);
	
	showLoading();
	
	cc.get('routines', {local_id: routine_local_id}, function (routine) {
		var exercise_id = 0;
		if (routine != null)
			exercise_id = routine.exercises[routine_exercise_index].exercise_id;
		
		cc.get('exercises', exercise_id ? {id: exercise_id}/*routine exercise*/ : {local_id: exercise_local_id}/*browsing exercise*/, function (exercise) {
			title = exercise.name;
			setTitle(title);
			
			activeContent('#routineExercisePage-'+tab).show();
			
			// INFO
			if (tab == 'info') {
				activeContent('.exercise_name').text(strmsg(exercise.name));
				activeContent('.exercise_description').text(strmsg(exercise.description));
				cc.getList('equipments', {}, function (equipments) {
					var exercise_equipments = exercise.equipments;
					var html = '';
					$.each(exercise_equipments, function (i, exercise_equipment) {
						var equipment = cc.linqFilter(equipments, {where: function (item) {return item.id == exercise_equipment.equipment_id } });
						if (equipment.length > 0) {
							equipment = equipment[0];
							if (html != '') html += ', ';
							html += equipment.name;
						}
					});
					activeContent('.exercise_equipments').html(html);
				});
				cc.getList('musclegroups', {}, function (musclegroups) {
					for (s = 0; s <= 1; s++) {
						var exercise_musclegroups = cc.linqFilter(exercise.musclegroups, {where: function(item) {return item.section == s; }});
						var html = '';
						$.each(exercise_musclegroups, function (i, exercise_musclegroup) {
							var musclegroup = cc.linqFilter(musclegroups, {where: function (item) {return item.id == exercise_musclegroup.musclegroup_id } });
							if (musclegroup.length > 0) {
								musclegroup = musclegroup[0];
								if (html != '') html += ', ';
								html += musclegroup.name;
							}
						});
						activeContent('.exercise_musclegroups_'+s).html(html);
					}
				});
				activeContent('.exercise_notes').text(strmsg(exercise.notes));
				
				if (routine != null && routine._type == 'created') {	// if it's mine
					var position = routine.exercises[routine_exercise_index].position;
					activeContent('[name="routine_exercise_position"]').attr('min', 1).attr('max', routine.exercises.length).attr('value', position);
					activeContent('[name="routine_exercise_position"]').slider('refresh');
					activeContent('.ul-routine_exercise_position').show();
					sliderPosition = position;
					$('[name="routine_exercise_position"]').change(function() {
						sliderPosition = $(this).val();
					});
					
					// delete
					activePage('.delete').show();
					activePage('.confirm_delete').click(function () {
						remove(routine_local_id, routine_exercise_index);
					});
					activePage('.cancel_delete').click(function () {
						$('#routineExerciseDelete').popup('close');
					});
				}
			}
			
			// IMAGE
			var loadingImage = false;
			if (tab == 'image') {
				var image = exercise._image_medium;
				showLoading();
				loadingImage = true;
				activeContent('.exercise_image').attr('src', image);
				activeContent(".exercise_image").load(function(){
					loadingImage = false;
					hideLoading();
				});
				activeContent(".exercise_image").error(function(){
					loadingImage = false;
					hideLoading();
					$(this).attr("src", "img/missing_medium.png");
				});
			}
			
			// VIDEO direct link
			if (exercise.video != '') {
				//activePage('[data-role="header"] [data-tab="video"] a').attr('href', "http://m.youtube.com/watch?v="+exercise.video).attr('target', '_blank');
				activePage('[data-role="header"] [data-tab="video"] a').click(function () {
					window.open("http://m.youtube.com/watch?v="+exercise.video, '_system');
					return false;
				});
				if (navigator.network != undefined) {	// is in phonegap
					activePage('[data-role="header"] [data-tab="video"] a').click(function () {
						var url = $(this).attr('href');
						navigator.app.loadUrl(url, { openExternal: true});
						return false;
					});
				}
			} else {
				activePage('[data-role="header"] [data-tab="video"]').remove();
				activePage('[data-role="header"] [data-role="navbar"] ul').removeClass('ui-grid-c').addClass('ui-grid-b');
				noVideo = true;
			}
			
			// SETS
			if (tab == 'sets') {
				var set_index = undefToEmpty(params['set_index'], 0);	// back from set
				var routineExercise = routine.exercises[routine_exercise_index];
				var sets = routine.exercises[routine_exercise_index].sets;
				var variableParams = exercise._variable_params;
				var fixedParams = exercise._fixed_params;
				var html = '';
				//console.log(sets);
				if (sets.length > 0) {
					$.each(sets, function (i, set) {
						//console.log(set);
						html += '<div data-role="collapsible" '+(i == set_index ? 'data-collapsed="false"' : '')+'>';
						html += '	<h3>Serie '+(i+1)+'</h3>';
						html += '	<div class="ui-grid-b">';
						
						var alfa = ['a', 'b', 'c'];
						var a = 0;
						// variable
						$.each(variableParams, function (paramId, paramName) {
							if (set[paramId] != undefined && set[paramId] != '') {
								html += '	<div class="ui-block-'+alfa[a]+'">';
								html += '		<ul data-role="listview" data-inset="true">';
								html += '			<li data-role="list-divider">'+paramName+'</li>';
								html += '			<li>'+undefToEmpty(set[paramId])+'</li>';
								html += '		</ul>';
								html += '	</div>';
							}
							a++; if (a == 3) a = 0;
						});
						// fixed
						if (set['wait'] != undefined && set['wait'] != '') {
							html += '	<div class="ui-block-'+alfa[a]+'">';
							html += '		<ul data-role="listview" data-inset="true">';
							html += '			<li data-role="list-divider">'+fixedParams['wait']+'</li>';
							html += '			<li>'+undefToEmpty(set['wait'])+'</li>';
							html += '		</ul>';
							html += '	</div>';
						}
						
						html += '	</div>';	// close grid
						
						if (set['notes'] != undefined && set['notes'] != '') {
							html += '<div class="ui-grid-solo">';	// le note occupano una riga intera
							html += '	<div class="ui-block-a">';
							html += '		<ul data-role="listview" data-inset="true">';
							html += '			<li data-role="list-divider">'+fixedParams['notes']+'</li>';
							html += '			<li class="notes">'+undefToEmpty(set['notes'])+'</li>';
							html += '		</ul>';
							html += '	</div>';
							html += '</div>';	// close grid
						}
						
						// Edit button (if it's mine)
						if (routine._type == 'created') {
							html += '	<div style="text-align: center;">';
							html += '		<a href="set.html?routine_local_id='+routine_local_id+'&routine_exercise_index='+routine_exercise_index+'&set_index='+i+'&training_mode='+trainingMode+'" data-role="button" data-mini="true" data-inline="true" data-icon="pencil" class="btn-font-special">Modifica</a>';
							html += '	</div>';
						}
						
						html += '</div>';	// close collapsible
					});
				} else {
					html += '<p style="padding: 1em">Nessuna serie impostata</p>';
				}
				
				activeContent('.exercise_sets').html(html);
				activeContent().trigger('create');
				
				// Add set link (show it it's mine)
				var new_index = sets != undefined ? sets.length : 0;
				activeContent('.add_set').attr('href', 'set.html?routine_local_id='+routine_local_id+'&routine_exercise_index='+routine_exercise_index+'&set_index='+new_index+'&training_mode='+trainingMode);
				if (routine._type == 'created') {
					activeContent('.add_set').show();
				}
				
				if (isBack)
					$(document).scrollTop(scrollPos);	// restore scroll pos
			}
			
			if (!loadingImage)
				hideLoading();
		});
	});
});

$('#routineExercisePage img').live('error', function() {
	$(this).replaceWith('<p><em>Immagine non disponibile offline.</em></p>');
});

$('#routineExercisePage a').live('click', function(event) {
	scrollPos = $(document).scrollTop();
});

$('#routineExercisePage').live('pageremove', function(event) {
	// salva
	var params = getUrlVars($(this).attr('data-url'));
	tab = undefToEmpty(params['tab'], 'info');
	routine_local_id = undefToEmpty(params['routine_local_id'], 0);
	routine_exercise_index = undefToEmpty(params['routine_exercise_index'], 0);
	if (routine_local_id > 0)
		save(routine_local_id, routine_exercise_index, tab);
	
	// se sto tornando alla lista faccio ripartire la sync
	// riparte dal routine.js (in modo da attendere l'eventuale salvataggio)
	/*var nextPage = event.delegateTarget.URL;
	if (nextPage.indexOf('/routine_exercise.html') == -1 && nextPage.indexOf('/set.html') == -1) {	// se esce dalla modifica dell'esercizio scheda
		if (!sync.started)	// restart automatic sync
			sync.start();
	}*/
	// Reset vars
	
	var nextPage = event.delegateTarget.URL;
	if (nextPage.indexOf('/routine_exercise.html') == -1) {
		title = '';
		noVideo = false;
	}
});

function save(routine_local_id, routine_exercise_index, tab) {
	routinePage_wait = true;
	cc.get('routines', {local_id: routine_local_id}, function (routine) {
		if (routine._type == 'created') {	// it's mine: can edit
			if (tab == 'info') {
				var routine_exercise = routine.exercises[routine_exercise_index];
				var position = sliderPosition;
				// update position
				if (routine_exercise.position != position) {
					oldPosition = routine_exercise.position;
					routine_exercise.position = position;
					fixPosition(routine_exercise, oldPosition);
					updatePositions(routine, routine_exercise);
					routine_exercise.post = true;
					routine.post = true;
					cc.save('routines', routine, function () {
						// Saved!
						routinePage_wait = false;
					});
				} else {
					routinePage_wait = false;
				}
			} else {
				routinePage_wait = false;
			}
		} else {
			routinePage_wait = false;
		}
	});
}

function remove(routine_local_id, routine_exercise_index) {
	showLoading();
	
	cc.get('routines', {local_id: routine_local_id}, function (routine) {
		routine.exercises[routine_exercise_index].deleted = 1/*true*/;
		routine.exercises[routine_exercise_index].post = true;
		routine.post = true;
		//console.log(routine.exercises[routine_exercise_index].sets);
		cc.save('routines', routine, function () {
			// back to sets
			$.mobile.changePage('routine.html?local_id='+routine_local_id);
		});
	});
	
	return false;
}

function fixPosition(routine_exercise, oldPosition) {	// come server side Routine_exercise_object::update_positions()
	/*if (routine_exercise.id > 0)
	{*/
		if (routine_exercise.position < oldPosition) {
			routine_exercise.position--;
		}
	/*}*/
}

function updatePositions(routine, routine_exercise) {	// come server side Routines_exercises_model::update_positions() server side
	
	var p = 1;
	var routine_exercises = routine.exercises;
	$.each(routine_exercises, function (i, re) {
		re._updated = 0;
	});
	routine_exercise._updated = 1;
	routine_exercises = cc.linqFilter(routine_exercises, {orderBy: function (item) {return item.position*10 + item._updated; }});
	//console.log(routine_exercises);
	
	$.each(routine_exercises, function (i, routine_exercise) {
		routine_exercise.position = p;
		routine_exercise.post = true;
		p++;
	});
	routine.exercises = routine_exercises;
}

})();	// routineExercisePage namespace end

var prefetchImagesPage = (function prefetchImagesPage() {	// prefetchImagesPage namespace


$('#prefetchImagesPage').live('pagecreate', function(event) {
});

$('#prefetchImagesPage').live('pageinit', function(event) {
	if (sync.isOnline() && !sync.hasData) {
		var intervalId = setInterval(function () {
			if (sync.hasData) {
				clearInterval(intervalId);
				cc.getList('users', {}, function (users) {
					$.each(users, function (i, user) {
						prefetch(user._image_small);
						prefetch(user._image_medium);
					});
					cc.getList('exercises', {}, function (exercises) {
						$.each(exercises, function (i, exercise) {
							prefetch(exercise._image_small);
							prefetch(exercise._image_medium);
						});
						cc.getList('routines', {}, function (routines) {
							$.each(routines, function (i, routine) {
								prefetch(routine._image_small);
								//prefetch(routine._image_medium);
							});
						});
					});
				});
			}
		}, 100);
	}
});

function prefetch(src) {
	if (src !== undefined) {
		// add and remove image after loaded
		var img = $('<img src="'+src+'">').on('load', function(){ $(this).remove(); })
		$('#prefetchImagesPage [data-role="content"]').append(img);
	}
}

})();	// prefetchImagesPage namespace end

var routinePage = (function routinePage() {	// routinePage namespace

var created = false;
var timerId = 0;
var doingList = false;
var htmlOld = '//////////////';
var scrollPos = 0;
var isBack = false;

$('#routinePage').live('pagecreate', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	// stats mode parameters
	var statsMode = val(undefToEmpty(params['stats_mode'], 0));
	var trainingMode = val(undefToEmpty(params['training_mode'], 0));
	var returnUri = strurldec(undefToEmpty(params['return_uri']));
	
	created = true;
	
	// Back to routines (
	$(this).page().find('[data-rel="back"]').click(function() {
		$.mobile.changePage('routines.html?training_mode='+trainingMode);
		return false;
	});
	
	// stats mode header (select and return routine ID)
	if (statsMode) {
		$(this).find('[data-role="header"] > a').remove();
		$(this).find('[data-role="header"] h1').removeClass('left');
		$(this).find('[data-role="header"] h1').text("Statistiche esercizi scheda");
		$(this).find('[data-role="header"] h1').before('<a href="'+returnUri+'" class="ui-icon-nodisc" data-iconshadow="false" data-role="button" data-icon="arrow-left" data-iconpos="notext" data-inline="true">Back</a>');
	}
	// training mode header (hide edit and add exercise button, show start training button)
	if (trainingMode) {
		$(this).find('[data-role="header"] > a.add_exercise').remove();
		$(this).find('[data-role="header"] > a.copy').remove();
		$(this).find('[data-role="content"] > a.add_exercise').remove();
		$(this).find('[data-role="header"] h1').text("Esercizi scheda");
		if (!val(storage.getItem('training')))	// training time not already active
			$(this).find('[data-role="header"] h1').after('<a href="#" data-role="button" data-icon="play" class="ui-btn-right start_training" data-theme="b">Registra allenamento</a>');
	}
});

$('#routinePage').live('pagebeforeshow', function(event, data) {
	isBack = (data.prevPage.attr('id') == 'routineExercisePage');
});

$('#routinePage').live('pageshow', function(event) {
	var params = getUrlVars();
	var local_id = undefToEmpty(params['local_id']);
	// stats mode parameters
	var statsMode = val(undefToEmpty(params['stats_mode'], 0));
	var returnUri = strurldec(undefToEmpty(params['return_uri']));
	var day = val(undefToEmpty(params['day']));
	
	showLoading();
	
	var intervalId = setInterval(function () {
		if (!routinePage_wait) {
			clearInterval(intervalId);
			if (!sync.started)	// riparte con il sync dopo essere stato nell'esercizio
				sync.start();
			if (statsMode) {	// stats mode: see routine as it were that day (routine is copied in statday.rotutines array)
				var date = new Date(day);
				var routineId = val(undefToEmpty(params['routine_id']));
				cc.get('statdays', { where: function (item) {return item.day == date.format('yyyy-mm-dd');} }, function (statday) {
					for (i = 0; i < statday.routines.length; i++)
						if (statday.routines[i].id == routineId)
							break;
					if (i < statday.routines.length)
						doList(statday.routines[i]);
				});
			} else {	// standard mode: see fitnessitaly/created/shared routines, can edit created routines
				cc.get('routines', {local_id: local_id}, function (routine) {
					if (routine._type == 'created') {
						// Add exercise link
						activePage('.add_exercise').attr('href', 'exercises.html?routine_local_id='+local_id);
						activePage('.add_exercise').show();
					} else {
						activePage('.copy').show();
					}
					storage.setItem('routinesPage.lastTab', routine._type);
					doList(routine);
				});
			}
		}
	}, 100);
});

$('#routinePage ul.routine').live('click', function(event) {
	scrollPos = $(document).scrollTop();
});

$('#routinePage').live('pageremove', function(event) {
	// ferma timer e resetta variabili
	clearInterval(timerId);
	timerId = 0;
	doingList = false;
	htmlOld = '//////////////';
});

$('#routinePage a.start_training').live('click', function() {
	var params = getUrlVars();
	var localId = val((undefToEmpty(params['local_id'])));
	
	cc.get('routines', {local_id: localId}, function (routine) {
		// check it's sync: need to add server id...
		if (routine.id == 0) {	// not sync: show message to sync
			msgAlert("Impossibile allenarsi su questa scheda perché non ancora sincronizzata con il server.");
		} else {
			var date = new Date();	// check if can register routines after traning stop
			checkAddDayProOnly('param', date, function (canAdd) {
				if (canAdd) {
					if (routine._type != 'created') {
						activePage('#startTrainingCopy').popup();
						activePage('#startTrainingCopy').popup('open');
						// prosegue dopo l'evento di conferma
					} else {
						// start training
						startStopTraining(true, routine.id);
					}
				}
			});
		}
	});
});
$('#routinePage #startTrainingCopy .confirm_copy').live('click', function() {
	var params = getUrlVars();
	var localId = val((undefToEmpty(params['local_id'])));
	
	activePage('#startTrainingCopy').popup('close');
	
	setTimeout(function () {	// opening buy pro popup while closing copy popup
		checkAddRoutineProOnly(function (canAdd) {
			if (canAdd) {
				// copy...
				showLoading(0, "Copia e sincronizzazione in corso...");
				cc.get('routines', {local_id: localId}, function (routine) {
					if (routine != null) {
						copyRoutine(routine, function (routineCopy) {
							if (sync.isOnline()) {
								// attesa sincronizzazione
								sync.postGetData(function () {
									// sincronizzato: controlla che abbia l'id
									cc.get('routines', {local_id: routineCopy.local_id}, function (routineCopy) {
										if (routineCopy.id > 0) {
											startStopTraining(true, routineCopy.id, 'routine.html?local_id='+routineCopy.local_id+'&training_mode=1');
										} else {
											msgAlert("Errore durante la sincronizzazione, riprovare...");
										}
									});
								});
							} else {
								msgAlert("Impossibile allenarsi su questa scheda perché non ancora sincronizzata con il server. Per sincronizzare la sincronizzazione, uscira dalla modalità offline.");
							}
						});
					}
				});
			}
		});
	}, 0);
	return false;
});
$('#routinePage #startTrainingCopy .cancel_copy').live('click', function() {
	activePage('#startTrainingCopy').popup('close');
});

$('#routinePage a.copy').live('click', function() {
	var params = getUrlVars();
	var localId = val((undefToEmpty(params['local_id'])));
	
	checkAddRoutineProOnly(function (canAdd) {
		if (canAdd) {
			// copy routine and create a new routine
			showLoading(0, 'Copia scheda in corso...');
			cc.get('routines', {local_id: localId}, function (routine) {
				if (routine != null) {
					copyRoutine(routine, function (routineCopy) {
						hideLoading();
						activePage('#copySuccess').popup();
						activePage('#copySuccess').popup('open');
					});
				}
			});
		}
	});
	return false;
});
$('#routinePage #copySuccess .popup_close').live('click', function() {
	//activePage('#copySuccess').popup('close');
	$.mobile.changePage('routines.html?tab=created');
});

function doList(routine, refresh) {
	var params = getUrlVars();
	// stats mode parameters
	var statsMode = val(undefToEmpty(params['stats_mode'], 0));
	var trainingMode = val(undefToEmpty(params['training_mode'], 0));
	var returnUri = strurldec(undefToEmpty(params['return_uri']));
	
	if (refresh == undefined)
		refresh = false;
	
	if (doingList)
		return;
	
	doingList = true;
	//console.log('doList');
	
	cc.getList('exercises', {}, function (exercises) {
		
		var html = '';
		if (routine) {
			
			var editButton = '';	// modifica nome e descr. scheda
			if (routine._type == 'created' && !statsMode  && !trainingMode)
				editButton = '<a href="routine_edit.html?local_id='+routine.local_id+'" data-role="button" class="ui-icon-nodisc list-divider-btn" data-iconshadow="false" data-icon="pencil" data-iconpos="notext" data-inline="true">Plus</a>';
			
			// name in list header
			html += '<li data-role="list-divider" class="ucase">'+routine.name+' '+editButton+'</li>';
			
			// descr.
			if (routine.description)
				html += '<li><p class="descr" style="font-size: 0.8em">'+routine.description+'</p></li>';
			
			if (routine.exercises.length > 0) {
				// mem original index
				$.each(routine.exercises, function (index, routine_exercise) {
					routine_exercise._index = index;
				});
				// don't show deleted, order by position
				var routine_exercises = cc.linqFilter(routine.exercises, {where: function (item) {return !undefToEmpty(item.deleted, false); }, orderBy: function (item) {return val(item.position) }});
				$.each(routine_exercises, function (index, routine_exercise) {
					
					var exercise = cc.linqFilter(exercises, {where: function (item) {return item.id == routine_exercise.exercise_id} });
					routine_exercise._exercise = exercise.length > 0 ? exercise[0] : null;
					
					html += htmlRoutineExercise(routine, routine_exercise._index, routine_exercise);
				});
				
			} else {
				html += '<li class="noresults"><p>Nessun esercizio presente in questa scheda.</p></li>';
			}
			
			if (html != htmlOld) {
				activeContent('ul.routine').html(html);
				activeContent('ul.routine').trigger('create');
				activeContent('ul.routine').listview('refresh');
				activeContent('ul.routine').show();
				activeContent("img").error(function(){
					$(this).attr("src", "img/missing_small.png");
				});
				htmlOld = html;
				if (created && undefToEmpty(getUrlVars()['exercise_added'])) {
					$(document).scrollTop($(document).height());	// scroll to bottom
					scrollPos = $(document).scrollTop();
				}
				created = false;
			}
			if (!refresh) {
				timerId = setInterval(function () {
					var params = getUrlVars();
					var local_id = undefToEmpty(params['local_id']);
					cc.get('routines', {local_id: local_id}, function (routine) {
						doList(routine, true);
					});
				}, 5000);
				if (isBack)
					$(document).scrollTop(scrollPos);	// restore scroll pos
			}
			
			hideLoading();
			doingList = false;
		}
		
	});
	
	
}

$('#routinePage ul.routine li a.go-pro-link').live('click', function () {
	if (isiOS()) {
		iOSPurchasePro();
		return false;
	}
});

function htmlRoutineExercise(routine, index, routine_exercise) {
	var params = getUrlVars();
	// stats mode parameters
	var statsMode = val(undefToEmpty(params['stats_mode'], 0));
	var trainingMode = val(undefToEmpty(params['training_mode'], 0));
	var returnUri = strurldec(undefToEmpty(params['return_uri']));
	
	var exercise = routine_exercise._exercise;
	
	var html = '';
	if (statsMode)
		html = '<li data-icon="bar-chart">';
	else
		html = '<li>';
	
	if (exercise != null && userType == 'free' && val(exercise.user_id) == 0 && !val(exercise.free)) {	// pro exercise locked
		var proLink = navigator.userAgent.match(/(iPhone|iPod|iPad)/) ? appiOsPro : appAndroidPro;
		
		html += '<a href="'+proLink+'" target="_blank" class="go-pro-link">';
		
		html += '<div style="background-color: rgba(0, 0, 0, 0.50); position: absolute; height: 81px; width: 81px; top: 0; left: 0; z-index: 9;"></div>';
		html += '<img src="'+exercise._image_small+'">';
		html += '<h2 style="margin-top: -0.5em; overflow: visible; white-space: normal; color: rgba(255, 255, 255, 0.50);">'+exercise.name+'</h2>';
		
		html += '<p class="routine_exercise_params" style="color: rgba(255, 255, 255, 0.75);">';
		html += '	<span class="ui-icon ui-icon-lock" style="color: rgba(255, 255, 255, 0.75); background: transparent;"></span> Solo utenti <span class="special"><strong>PRO</strong></span>';
		html += '</p>';
		
		html += '</a>';
		
	} else {	 // exercise
		
		if (statsMode)
			html += '<a href="statgraph.html?exercise_id='+routine_exercise.exercise_id+'&return_uri='+strurl('routine.html?local_id='+routine.local_id+'&stats_mode=1&return_uri='+strurl(returnUri))+'">';
		else
			html += '<a href="routine_exercise.html?routine_local_id='+routine.local_id+'&routine_exercise_index='+index+'&training_mode='+trainingMode+'">';
		
		if (exercise != null) {
			html += '<img src="'+exercise._image_small+'">';
			html += '<h2 style="margin-top: -0.5em; overflow: visible; white-space: normal;">'+exercise.name+'</h2>';
		} else {
			html += '<h2 style="margin-top: -0.5em; overflow: visible; white-space: normal;"><small>Esercizio non più disponibile.</small></h2>';
		}
		
		if (routine_exercise.post) {
			html += '<p>';
			html += '	<em>Sincronizzazione in corso...</em>';
			html += '</p>';
		} else {
			html += '<p class="routine_exercise_params">';
			html += '	'+routine_exercise._param_format;
			html += '</p>';
		}
		
		html += '</a>';
		
	}
	
	html += '</li>';
	
	return html;
}

function copyRoutine(routine, onReady) {
	sanitizeRoutine(routine);
	routine.local_id = 0;
	routine.id = 0;
	routine.client_id = 0;
	routine._type = 'created';
	routine.post = true;
	for (var i = 0; i < routine.exercises.length; i++) {
		routine.exercises[i].id = 0;
		routine.exercises[i].post = true;
	}
	
	cc.save('routines', routine, function () {
		// get just saved routine
		cc.get('routines', {order: 'local_id DESC'}, function (routineCopy) {
			onReady(routineCopy);
		});
	});
}

})();	// routinePage namespace end

var routinePage_wait = false;	// please wait...

/**
 * HTML5 sqlite database
 */

var db = new function Database() {
	
	this._db = null;
	
	/**
	 * Open database
	 */
	this.open = function(name, descr, ver, size) {
		if (ver == undefined)
			ver = "";
		
		this._db = window.openDatabase(name, ver, descr, size);
	}
	
	/**
	 * Database version
	 */
	this.version = function() {
		return this._db.version;
	}
	
	/**
	 * Execute an SQL command or an array of commands
	 */
	this.execute = function(sql, onSuccess, onError) {
		this._db.transaction(function(tx) {
			
			if (sql.constructor == Array) {
				for (i = 0; i < sql.length; i++)
					tx.executeSql(sql[i]);
			}
			else {
				tx.executeSql(sql);
			}
			
		}, onError, onSuccess);
	}
	
	/**
	 * Execute an SQL query
	 */
	this.query = function(sql, onSuccess, onError) {
		this._db.transaction(function(tx) {
			tx.executeSql(sql, [], onSuccess, onError);
		}, onError);
	}
	
	/**
	 * Upgrade to new version
	 * sqlVers = [{ver: "1", sql: "sql command 1"}, {ver: "2.0", sql: "sql command 2.0"}, {ver: "3.1", sql: "sql command 3.1"}, ...]
	 */
	this.upgrade = function(sqlVers, onSuccess, onError) {
		var currentVer = 0;
		if (this._db.version)
			currentVer = parseFloat(this._db.version);
		var sqlExec = new Array();
		
		for (i = 0; i < sqlVers.length; i++) {
			var ver = parseFloat(sqlVers[i].ver);
			var sql = sqlVers[i].sql;
			if (ver > currentVer) {
				sqlExec.push(sql);
			}
		}
		
		var currentVer = this._db.version;
		var lastVer = (sqlVers[sqlVers.length - 1]).ver;
		
		if (sqlExec.length > 0) {
			this.changeVersion(currentVer, lastVer, sqlExec, onSuccess, onError);
		}
	}
	
	/**
	 * Change database version
	 * sql = single SQL command or array of SQL commands
	 */
	this.changeVersion = function(oldVer, newVer, sql, onSuccess, onError) {
		this._db.changeVersion(oldVer, newVer, function (tx) {

			if (sql.constructor == Array) {
				for (i = 0; i < sql.length; i++)
					tx.executeSql(sql[i]);
			}
			else {
				tx.executeSql(sql);
			}
	      
	    }, onError, onSuccess);
	}
	
	/**
	 * Check if can use HTML5 SQLite web database
	 */
	this.webDbImplemented = function() {
		return (window.openDatabase != undefined);
	}
}

/**
 * Prepare string to be used in SQL query
 * 
 * @param s
 * @returns {String}
 */
function strsql(s) {
	return "'"+s.replace(/'/g, "''")+"'";
}


/**
 * UploadImage class
 */

var uploadImage = new function UploadImage() {
	
	this.captureAndUpload = function(camera, entity, entityId, field, onUploaded, onFailed, onCancelled) {
		if (camera == undefined) camera = false;
		
		var params = {
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: (camera ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.SAVEDPHOTOALBUM),
			encodingType: Camera.EncodingType.JPEG,
			quality: 90,
			targetWidth: 750,
			targetHeight: 750
		};
		
		navigator.camera.getPicture(function (imageURI) {	// capture success
			uploadImage.upload(entity, entityId, field, imageURI, onUploaded, onFailed);
		}, function (message) {	// selezione annullata...
			if (typeof(onCancelled) == "function")
				onCancelled(message);
		}, params);
	}
	
	// if photo is captured successfully, then upload to server:
	this.upload = function(entity, entityId, field, imageURI, onUploaded, onFail) {
		var fail, ft, options, params, win;
		var userId = storage.getItem('userId');
		var userIdEnc = storage.getItem('userIdEnc');
		
		options = new FileUploadOptions();
		// parameter name of file:
		options.fileKey = "qqfile";
		// name of the file:
		options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
		// mime type:
		//options.mimeType = "text/plain";
		options.mimeType = 'image/jpeg';
		options.params = {
			from_app: true,
			user_id: userId,
			user_id_enc: userIdEnc
		};
		
		ft = new FileTransfer();
		ft.upload(imageURI, serverUrl+'ajax/upload/'+entity+'/'+entityId+'/image/'+field, function (r) {
			if (typeof(onUploaded) == "function") 
				onUploaded($.parseJSON(r.response), imageURI);
		}, function (error) {
			if (typeof(onFail) == "function") 
				onFail(error);
		}, options);
	}
	
	this.removeUpload = function(entity, entityId, field, onRemoved) {
		var userId = storage.getItem('userId');
		var userIdEnc = storage.getItem('userIdEnc');
		var params = {
			from_app: true,
			user_id: userId,
			user_id_enc: userIdEnc
		};
		
		$.get(serverUrl+'ajax/remove_upload/'+entity+'/'+entityId+'/image/'+field, params, function() {
			if (typeof(onRemoved) == "function")
				onRemoved();
		});
	}
}

var exercisesPage = (function exercisesPage() {	// exercisesPage namespace

var creating = false;
var musclegroupsHasAll = false;
var scrollPos = 0;
var isBack = false;

$('#exercisesPage').live('pagecreate', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	routine_local_id = undefToEmpty(params['routine_local_id'], 0);
	
	creating = true;
	
	// Back to routine (
	$(this).page().find('[data-rel="back"]').click(function() {
		if (routine_local_id > 0)	// select routine
			$.mobile.changePage('routine.html?local_id='+routine_local_id);
		else	// browsing exercises
			$.mobile.changePage('home.html');
		return false;
	});
});

$('#exercisesPage').live('pageinit', function(event) {
	// stop sync
	sync.stop();
});

$('#exercisesPage').live('pagebeforeshow', function(event, data) {
	isBack = (data.prevPage.attr('id') == 'routineExercisePage');
});

$('#exercisesPage').live('pageshow', function(event) {
	/*var params = getUrlVars();
	routine_local_id = undefToEmpty(params['routine_local_id']);*/
	
	if (creating) {	// first access
		showLoading();
		
		// perp filters
		cc.getList('eqcategories', {}, function (eqcategories) {
			fillSelect('eqcategories', eqcategories);
			cc.getList('musclegroups', {orderBy: function (item) {return val(item.position); }}, function (musclegroups) {
				fillSelect('musclegroups', musclegroups);
				// list
				filterList('', 0, 0);
			});
		});
		creating = false;
		
		// filter events
		activePage('[name="eqcategories"], [name="musclegroups"]').bind('change', function () {
			eqcategoryId = $(this).attr('name') == 'eqcategories' ? val($(this).val()) : val(activePage('[name="eqcategories"]').val());
			musclegroupId = $(this).attr('name') == 'musclegroups' ? val($(this).val()) : val(activePage('[name="musclegroups"]').val());
			search = undefToEmpty(activePage('[name="search"]').val());
			
			showLoading();
			setTimeout(function () {
				filterList(search, eqcategoryId, musclegroupId);
			}, 0);
		});
		activePage('[name="search"]').bind('keydown', function (event) {
			if (event.which == 13) {
				showLoading();
				search();
				return false;
			}
		});
		activePage('[name="search"]').bind('keyup', search);
		activePage('.ui-input-clear').bind('click', search);
	}
	
	if (isBack)
		$(document).scrollTop(scrollPos);	// restore scroll pos
});

$('#exercisesPage ul.exercises a').live('click', function(event) {
	scrollPos = $(document).scrollTop();
});

$('#exercisesPage').live('pageremove', function(event) {
	// non rimuove la pagina se vado al singolo esercizio (nel caso di browsing esercizi standalone)
	//var params = getUrlVars(event.delegateTarget.URL);
	if (event.delegateTarget.URL.indexOf('/routine_exercise.html') >= 0) {
		event.preventDefault();
		// will be back...
	}
});

// Integrazione dialogo jQM automatico per selezione gruppi muscolari
$('#musclegroups-dialog').live('dialogcreate', function () {
	$(this).find('[data-role="content"]').append('<img src="img/musclegroups_front.png" class="imgfront">').append('<img src="img/musclegroups_back.png" class="imgback">');
	
});
$(document).delegate('#musclegroups-dialog', 'pagebeforeshow', function() {
	if (musclegroupsHasAll) {
		$(this).addClass('hasall');
	} else {
		$(this).removeClass('hasall');
	}
});

function search() {
	var search = activePage('[name="search"]').val();
	eqcategoryId = val(activePage('[name="eqcategories"]').val());
	musclegroupId = val(activePage('[name="musclegroups"]').val());
	filterList(search, eqcategoryId, musclegroupId);
}

function filterList(search, eqcategoryId, musclegroupId) {
	// Apply filters
	var filter = {};
	filter.where = function (item) {
		var seOk = true;
		if (search != '') {
			seOk = false;
			if (item.name.toLowerCase().match(search.toLowerCase(), 'g') != null) {
				seOk = true;
			}
		}
		
		var eqOk = true;
		if (eqcategoryId > 0) {
			eqOk = false
			$.each(item.equipments, function (i, equipment) {
				if (eqcategoryId == equipment.equipment_eqcategory_id)
					eqOk = true;
			});
		}
		
		var muOk = true;
		if (musclegroupId > 0) {
			muOk = false
			$.each(item.musclegroups, function (i, musclegroup) {
				if (musclegroupId == musclegroup.musclegroup_id && musclegroup.section == 0)
					muOk = true;
			});
		}
		
		/*if (userType == 'free')
			if (val(item.user_id) == 0 && !val(item.free))	// fitnessitaly exercise pro only
				return false;*/
		
		// (se non è usabile, ma non usabile perché è solo per pro, la visualizza comunque
		// - per capirlo basta guardare se è un esercizio fitnessitaly: user_id == 0)
		return (item._usable || val(item.user_id) == 0) && seOk && eqOk && muOk;
	};
	
	filter.orderBy = function (item) {
		return val(item.user_id) > 0 ? '' : item.name;
	};
	
	doList(filter);
}

function doList(filter) {
	if (filter == undefined) filter = {};
	
	//showLoading();
	
	setTimeout(function () {
		cc.getList('exercises', filter, function (exercises) {
			
			//console.log(exercises);
			
			/*var html = '';
			if (exercises.length > 0) {
				$.each(exercises, function (index, exercise) {
					html += htmlExercise(exercise);
				});
			} else {
				html += '<li class="noresults"><p>Nessun esercizio trovato.</p></li>';
			}
			
			activeContent('ul.exercises').html(html);
			activeContent('ul.exercises').listview('refresh');
			activeContent('ul.exercises').show();
			activeContent("img").error(function(){
				$(this).attr("src", "img/missing_small.png");
			});
			
			// Select action
			$('ul.exercises li a').click(function () {
				var id = $(this).data('id');
				selected(id);
				return false;
			});
			
			hideLoading();
			*/
			
			$(document).scrollTop(0);
			if (exercises.length > 0) {
				paginatedList(exercises, activeContent('ul.exercises'), function (exercisesPart, list, page, more) {
					var html = '';
					$.each(exercisesPart, function (index, exercise) {
						html += htmlExercise(exercise);
					});
					list.append(html);
				});
			} else {
				var html = '';
				html += '<li class="noresults"><p>Nessun esercizio trovato.</p></li>';
				activeContent('ul.exercises').html(html);
				activeContent('ul.exercises').listview('refresh');
			}
			
			selectCheckShowAll('eqcategories');
			selectCheckShowAll('musclegroups');
			
		});
	}, 0);
}

$('#exercisesPage ul.exercises img').live('error', function() {
	$(this).attr("src", "img/missing_small.png");
});

// Select action
$('#exercisesPage ul.exercises li a').live('click', function () {
	var params = getUrlVars();
	var routine_local_id = undefToEmpty(params['routine_local_id'], 0);
	
	var id = $(this).data('id');
	var local_id = $(this).data('local_id');
	
	if (routine_local_id > 0) {	// select exercise to add in routine
		if (val(id) > 0) {
			showLoading();
			selected(id);
			return false;
		}
	} else {	// browsing exercises
		if (val(id) > 0) {
			// view exercise data
			$.mobile.changePage('routine_exercise.html?routine_local_id=0&exercise_local_id='+local_id);
			return false;
		}
	}
});

$('#exercisesPage ul.exercises li a.go-pro-link').live('click', function () {
	if (isiOS()) {
		iOSPurchasePro();
		return false;
	}
});

function htmlExercise(exercise) {
	var html = '<li>';
	
	if (userType == 'free' && val(exercise.user_id) == 0 && !val(exercise.free)) {	// pro exercise locked
		var proLink = navigator.userAgent.match(/(iPhone|iPod|iPad)/) ? appiOsPro : appAndroidPro;
		
		html += '<a href="'+proLink+'" target="_blank" data-id="0" class="go-pro-link">';
		
		html += '	<div style="background-color: rgba(0, 0, 0, 0.50); position: absolute; height: 81px; width: 81px; top: 0; left: 0; z-index: 9;"></div>';
		html += '	<img src="'+exercise._image_small+'">';
		html += '	<h2 style="margin-top: -0.5em; overflow: visible; white-space: normal; color: rgba(255, 255, 255, 0.50);">'+exercise.name+'</h2>';
		
		html += '	<p class="routine_exercise_params" style="color: rgba(255, 255, 255, 0.75);">';
		html += '		<span class="ui-icon ui-icon-lock" style="color: rgba(255, 255, 255, 0.75); background: transparent;"></span> Solo utenti <span class="special"><strong>PRO</strong></span>';
		html += '	</p>';
		
		html += '</a>';
		
	} else {	 // exercise
		
		html += '<a href="#" data-id="'+exercise.id+'" data-local_id="'+exercise.local_id+'">';
		
		html += '	<img src="'+exercise._image_small+'">';
		html += '	<h2 style="overflow: visible; white-space: normal;">'+exercise.name+'</h2>';
		
		html += '</a>';
	}
	
	html += '</li>';
	
	return html;
}

function fillSelect(selectName, options, all, optgroupClass) {
	if (all == undefined) all = false;
	if (optgroupClass == undefined) optgroupClass = '';
	
	if (all) options.unshift({id: 0, name: 'Tutti'});
	
	$.each(options, function (i, option) {
		activePage('[name="'+selectName+'"]'+(optgroupClass?' .'+optgroupClass:'')).append($("<option></option>").attr("value", option.id).text(option.name)); 
	});
	activePage('[name="'+selectName+'"]').selectmenu('refresh');
}

function selectCheckShowAll(selectName) {
	var selectId = val(activePage('[name="'+selectName+'"]').val());
	musclegroupsHasAll = false;
	
	if (selectId > 0) {
		if (activePage('[name="'+selectName+'"]').find('[value="0"]').length == 0)
			activePage('[name="'+selectName+'"]').prepend($("<option></option>").attr("value", '0').text("Tutti"));
		musclegroupsHasAll = true;
	} else {
		activePage('[name="'+selectName+'"]').find('[value="0"]').remove();
	}
	activePage('[name="'+selectName+'"]').selectmenu('refresh');
}

function selected(id) {
	var params = getUrlVars();
	routine_local_id = undefToEmpty(params['routine_local_id']);
	
	cc.get('routines', {local_id: routine_local_id}, function (routine) {
		if (routine._type == 'created') {	// safety
			routine_exercise = new Object();
			routine_exercise.local_id = 0;
			routine_exercise.id = 0;
			routine_exercise.exercise_id = id;
			routine_exercise.position = routine.exercises.length + 1;
			routine_exercise.sets = new Array();
			routine_exercise.post = true;
			routine.exercises.push(routine_exercise);
			routine.post = true;
			cc.save('routines', routine, function () {
				$.mobile.changePage('routine.html?local_id='+routine_local_id+'&exercise_added=1');
			});
		}
	});
}

})();	// exercisesPage namespace end

var statdaysPage = (function statdaysPage() {	// statdaysPage namespace

// back support (calendar)
var monthBack = -1;
// back support (list)
var scrollPos = 0;
var htmlBack = '';
var pageBack = 1;
//

$('#statdaysPage').live('pagecreate', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	var type = undefToEmpty(params['type'], 'param');	// param or statparam
	var tab = undefToEmpty(params['tab'], lastTab());	// calendar or list
	
	// title
	$(this).find('[data-role="header"] h1').text(type == 'param' ? "Statistiche Allenamenti" : "Statistiche Misurazioni");
	
	// active tab
	$(this).find('[data-role="header"] [data-tab="'+tab+'"] a').addClass('ui-btn-active');
	
	// add params to tab links
	$(this).find('[data-role="header"] [data-tab] a').each(function () {
		var href = $(this).attr('href');
		// fix link to same page issue
		href += '&ts='+(new Date().getTime());
		// add type
		href += '&type='+type;
		// apply new href
		$(this).attr('href', href);
	});
	
	// Actions: save selected tab in storage to use next time this page opens
	$(this).find('[data-role="header"] [data-tab]').click(function() {
		tab = $(this).data('tab');
		storage.setItem('statdaysPage.lastTab', tab);
	});
});

$('#statdaysPage').live('pageinit', function(event) {
});

$('#statdaysPage').live('pagebeforeshow', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	var type = undefToEmpty(params['type'], 'param');
	var tab = undefToEmpty(params['tab'], lastTab());
	
	activePage('.statdays_calendar').hide();
	activePage('.statdays_list').hide();
	activePage('.statdays_'+tab).show();
});

$('#statdaysPage').live('pageshow', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	var type = undefToEmpty(params['type'], 'param');
	var tab = undefToEmpty(params['tab'], lastTab());
	
	if (tab == 'calendar')
		renderCalendar(type);
	else if (tab == 'list')
		doList(type);
});

$('#statdaysPage ul.statdays_list').live('click', function(event) {
	scrollPos = $(document).scrollTop();	// back support
});

$('#statdaysPage').live('pageremove', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	var tab = undefToEmpty(params['tab'], lastTab());
	
	// non rimuove la pagina se vado nel singolo giorno (solo per la visualizzazione lista)
	//var params = getUrlVars(event.delegateTarget.URL);
	if (event.delegateTarget.URL.indexOf('statday_') != -1 && tab == 'calendar') {
		//event.preventDefault();
		// will be back...
		var date = $("#statdaysCalendar").fullCalendar('getDate');
		monthBack = date.getMonth();
		
	} else if (event.delegateTarget.URL.indexOf('statday_') != -1 && tab == 'list') {
		//event.preventDefault();
		// will be back...
		htmlBack = $(this).find('.statdays_list').html();
		// pageBack is saved every paginatedList response
		
	} else {
		// next time, reset month (list)
		monthBack = -1;
		// next time, restart from first page (list)
		htmlBack = '';
		pageBack = 1;
	}
});

function renderCalendar(type) {
	$('#statdaysCalendar').fullCalendar({
		firstDay: 1,
		monthNames: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
		monthNamesShort: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
		dayNames: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
		dayNamesShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
		buttonText: {
			today: "oggi"
		},
		dayClick: function(date, allDay, jsEvent, view) {
			checkAddDayProOnly(type, date, function (canAdd) {
				if (canAdd) $.mobile.changePage('statday_'+type+'.html?day='+date.getTime());
			});
			
		},
		eventClick: function(calEvent, jsEvent, view) {
			checkAddDayProOnly(type, calEvent.start, function (canAdd) {
				if (canAdd) $.mobile.changePage('statday_'+type+'.html?day='+calEvent.start.getTime());
			});
        },
        aspectRatio: 1.1,
        loading: function(bool) {
			if (bool) {
				showLoading();
			} else {
				hideLoading();
			}
		},
		events: function(start, end, callback) {
			if (type == 'param') {
				// get current range days
				cc.getList('statdays', { where: function (item) {return getDate(item.day) >= start && getDate(item.day) <= end; } }, function (statdays) {
					var events = [];
					// prep events
					$.each(statdays, function (index, statday) {
						if (statday.routines.length > 0) {
							events.push({
								title: ''+statday.routines.length,
		                        start: getDate(statday.day),
		                        statday: statday	// custom
		                    });
						}
					});
					callback(events);
				});
			} else if (type == 'statparam') {
				// get current range days
				cc.getList('stats', { where: function (item) {return getDate(item.day) >= start && getDate(item.day) <= end && item.param_type == 'statparam' && !undefToEmpty(item.deleted); } }, function (stats) {
					var events = [];
					// prep events
					for (var date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
						var statsFilter = cc.linqFilter(stats, {where: function (item) {return item.day == date.format('yyyy-mm-dd')} });
						if (statsFilter.length > 0) {
							events.push({
								title: ''+statsFilter.length,
		                        start: new Date(date),
		                        stats: statsFilter	// custom
		                    });
						}
					}
					callback(events);
				});
			}
		},
		eventRender: function(event, element) {
			// custom event render
			if (type == 'param') {
				var statday = event.statday;
				element.find('.fc-event-inner').html('<span class="ui-icon ui-icon-folder-open"></span> '+statday.routines.length);
			} else {
				var stats = event.stats;
				element.find('.fc-event-inner').html('<span class="ui-icon ui-icon-user"></span> '+stats.length);
			}
		},
		month: (monthBack >= 0 ? monthBack : undefined)/* back support */,
		
	});
	
	// fullCalendar replace button styles
	$('#statdaysCalendar .fc-button').addClass('ui-btn-up-c').removeClass('fc-state-default');
	$('#statdaysCalendar .fc-button').hover(function () {
		$(this).addClass('ui-btn-hover-c').removeClass('ui-btn-up-c').removeClass('fc-state-hover');
	}, function () {
		$(this).addClass('ui-btn-up-c').removeClass('ui-btn-hover-c').removeClass('fc-state-default');
	});
}

function doList(type) {
	showLoading(pageBack);
	
	if (type == 'param') {
		cc.getList('exercises', {}, function (exercises) {	// exercieses needed for last routine image added to that day
			cc.getList('statdays', {where: function (item) { return item.routines.length > 0; }, orderByDesc: function(item) { return getDate(item.day); } }, function (statdays) {
				doListStatdays(type, statdays);
			});
		});
	} else if (type == 'statparam') {
		cc.getList('stats', {where: function (item) { return item.param_type == 'statparam' && !undefToEmpty(item.deleted); }, orderByDesc: function(item) { return getDate(item.day); } }, function (stats) {
			// stats is ordered by date DESC so can loop like this to collect involved days
			var days = new Array();
			var dayPrec = '';
			var index = 0;
			for (i = 0; i < stats.length; i++) {
				if (stats[i].day != dayPrec) {
					var day = new Object();
					day.day = stats[i].day;
					day.stats = cc.linqFilter(stats, {where: function (item) { return item.day == day.day; } })
					days.push(day);
					dayPrec = stats[i].day;
				}
			}
			doListStatdays(type, days);
		});
	}
}

function doListStatdays(type, statdays) {
	// back support
	var uidBack = undefined;
	if (htmlBack) {
		uidBack = getUID();
		activeContent('ul.statdays_list').attr('data-uid', uidBack);
		activeContent('ul.statdays_list').html(htmlBack)/*.children().removeClass('ui-btn-active')*/;
		$(document).scrollTop(scrollPos);	// restore scroll pos
		//pageBack passed as paginatedList page parameter
		// re-render li.ui-btn-active item (from which I'm back): may have been changed by user
		$('#statdaysPage ul.statdays_list li.ui-btn-active').each(function (index) {
			var day = $(this).data('day');
			var statdaysFilter = cc.linqFilter(statdays, {where: function (item) {return item.day == day; } })
			if (statdaysFilter.length > 0) $(this).replaceWith(htmlStatdayListItem(type, statdaysFilter[0]));
		});
	}
	
	if (statdays.length > 0) {
		paginatedList(statdays, activeContent('ul.statdays_list'), function (statdaysPart, list, page, more) {
			var html = '';
			$.each(statdaysPart, function (index, statday) {
				html += htmlStatdayListItem(type, statday);
			});
			list.append(html);
			pageBack = page+1;	// back support
		}, pageBack, uidBack /* back support */);
	} else {
		var html = '';
		html += '<li class="noresults"><p>Nessun giorno ancora impostato.</p></li>';
		activeContent('ul.statdays_list').html(html);
		activeContent('ul.statdays_list').listview('refresh');
		activeContent().append('<div class="section" style="margin-top: 10px;"><small><span class="ui-icon ui-icon-info-sign"></span> Per aggiungere i dati relativi ad una data, spostarsi in modalità calendario e selezionare un giorno.</small></div>');
		hideLoading();
	}
}

function htmlStatdayListItem(type, statday) {
	
	var date = getDate(statday.day);
	
	var html = '<li data-day="'+statday.day+'">';
	
	html += '<a href="statday_'+type+'.html?day='+date.getTime()+'">';
	
	html += '<h2>'+getDate(statday.day).format('dddd d mmmm yyyy')+'</h2>';
	
	if (type == 'param') {
		var numSchede = statday.routines.length;
		html += '<p><span class="ui-icon ui-icon-folder-open"></span>&nbsp;&nbsp;'+numSchede+' '+(numSchede==1?'scheda allenamento':'schede allenamento')+'</p>';
	} else if (type == 'statparam') {
		var numCompilati = statday.stats.length;
		html += '<p><span class="ui-icon ui-icon-user"></span>&nbsp;&nbsp;'+numCompilati+' '+(numCompilati==1?'parametro impostato':'parametri impostati')+'</p>';
	}
	
	html += '</a>';
	html += '</li>';
	
	return html;
}

function lastTab() {
	return storage.getItem('statdaysPage.lastTab') ? storage.getItem('statdaysPage.lastTab') : 'calendar';
}

})();	// statdaysPage namespace end

var routineEditPage = (function routineEditPage() {	// routineEditPage namespace

$('#routineEditPage').live('pagecreate', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	local_id = parseInt(undefToEmpty(params['local_id']), 10);
	
	if (local_id == 0) {
		$(this).find('[data-role="header"] h1').text('Nuova scheda');
		$(this).find('.delete').hide();
		storage.setItem('routinesPage.lastTab', 'created');	// se nuova, dopo salvato va alle schede create
	}
	
	// Back to routine
	$(this).page().find('[data-rel="back"]').click(function() {
		back(local_id);
		return false;
	});
});

$('#routineEditPage').live('pageinit', function(event) {
	// stop sync
	sync.stop();
});

$('#routineEditPage').live('pageshow', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	local_id = undefToEmpty(params['local_id']);
	
	showLoading();
	
	cc.get('routines', {local_id: local_id}, function (routine) {
		if (routine != null) {
			activeContent('[name="name"]').val(routine.name);
			activeContent('[name="description"]').val(routine.description);
			
			activeContent('form textarea').trigger('keyup');	// textarea autogrow
		}
		
		hideLoading();
		
	});
	
	// Actions
	activePage('.save').click(function () {
		save(local_id);
	});
	activePage('.confirm_delete').click(function () {
		remove(local_id);
	});
	activePage('.cancel_delete').click(function () {
		$('#routineDelete').popup('close');
	});
});

function save(local_id) {
	showLoading();
	
	cc.get('routines', {local_id: local_id}, function (routine) {
		if (routine == null) {
			routine = new Object();
			routine.local_id = 0;
			routine.id = 0;
			routine.exercises = new Array();
			routine._type = 'created';
			routine._image_small = 'img/file.png';
		}
		
		activeContent('form input, form textarea').each(function () {
			var name = $(this).attr('name');
			var value = $(this).val();
			routine[name] = value;
		});
		routine.post = true;
		cc.save('routines', routine, function () {
			 back(local_id);
		});
	});
}

function remove(local_id) {
	showLoading();
	
	cc.get('routines', {local_id: local_id}, function (routine) {
		routine.post = true;
		routine.deleted = 1/*true*/;
		cc.save('routines', routine, function () {
			// Back to routines
			$.mobile.changePage('routines.html');
		});
	});
}

function back(local_id) {
	if (local_id > 0)	// edit
		$.mobile.changePage('routine.html?local_id='+local_id);
	else	// add
		$.mobile.changePage('routines.html');
}

})();	// routineEditPage namespace end

var sync = new function Sync() {
	
	this._email = '';
	this._password = '';
	this._lastSync = '';
	
	this.executingGetData = false;
	this.executingPostData = false;
	
	this._timerId = 0;
	this.started = false;
	this.hasData = false;
	
	this.start = function() {
		// sync every x seconds
		this.postData();
		this._timerId = setInterval(function() { sync.postData(); }, syncInterval*1000);
		// sync started
		this.started = true;
	}
	
	this.stop = function() {
		clearInterval(this._timerId);
		this.started = false;
	}
	
	this.fetchSettings = function() {
		this._email = storage.getItem("loginEmail");
		this._password = storage.getItem("loginPassword");
		this._lastSync = storage.getItem("lastSync");
	}
	
	this.getData = function() {
		if (!sync.isOnline() || sync.executingGetData)
			return;
		
		sync.executingGetData = true;
		
		console.log("sync.getData");
		
		setTimeout(function() {	// rilascia thread per visualizzazione icona sync
		
			// init connection variables
			sync.fetchSettings();
			
			try
			{
				var params = {
						email: sync._email,
						password: sync._password,
						last_sync: sync._lastSync
				};
				
				var actionUrl = getServiceAction('get_data', params);
				
				$.getJSON(actionUrl, function(response) {
					if (!response.error) {
						sync._recursiveSave(response.tables, function () {
							sync._recursiveDelete(response.deleted, function () {
								storage.setItem("lastSync", response.lastSync);
								sync.hasData = true;
							});
						});
					} else {
						msgAlert(response.errorMsg);
					}
				}).complete(function() {
					sync.executingGetData = false;
				});
				
			}
			catch(err)
			{
				sync.executingGetData = false;
			}
			
		}, 500);
	}
	
	this.postData = function(getDataFunct) {
		if (!sync.isOnline() || sync.executingPostData)
			return;
		
		sync.executingPostData = true;
		
		console.log("sync.postData");
		
		setTimeout(function() {	// rilascia thread per visualizzazione icona sync
		
			// init connection variables
			sync.fetchSettings();
			
			try
			{
				var params = {
						email: sync._email,
						password: sync._password,
						last_sync: sync._lastSync
				};
				
				var actionUrl = getServiceAction('post_data');
				
				params.tables = new Object();	// Object instead of assoc array for correct JSON ser.
				cc.getList('routines', {post: true}, function (routines) {
					params.tables['routines'] = routines;
					
					// (other tables here...)
					if (routines.length > 0) {
						console.log("post!");
						console.log($.param(params));	// to debug post_data server side use
						sync.executingGetData = true;	// stop getData while updating local rows
						$.post(actionUrl, params, function(response) {
							var response = $.parseJSON(response);
							if (!response.error) {	// update with response rows (set server ids for new rows and update rows with server processed fields)
								sync._recursiveSave(response.tables, function () {
									sync._recursiveDelete(response.deleted, function () {
										// Saved!
										storage.setItem("lastSync", response.lastSync);
										sync.hasData = true;
										sync.executingGetData = false;	// restart getData
									});
								});
							} else {
								msgAlert(response.errorMsg);
								sync.executingGetData = false;	// restart getData
							}
						}).complete(function() {
							sync.executingPostData = false;
						});
					} else {
						sync.executingPostData = false;
						if (typeof(getDataFunct) == "function")
							getDataFunct();
					}
				});
			}
			catch(err)
			{
				sync.executingPostData = false;
			}
		
		}, 500);
	}
	
	this._recursiveSave = function(tables, onComplete, i) {
		if (i == undefined)
			i = 0;
		
		if (i < Object.keys(tables).length) {
			var index = 0;
			$.each(tables, function (table, rows) {
				if (index == i) {
					//console.log(table);
					cc.saveList(table, rows, function () {
						sync._recursiveSave(tables, onComplete, i+1);
					});
				}
				index++;
			});
		} else {
			if (typeof(onComplete) == "function")
				onComplete(); 
		}
	}
	
	this._recursiveDelete = function(deleted, onComplete, i) {
		if (i == undefined)
			i = 0;
		
		if (i < Object.keys(deleted).length) {
			var index = 0;
			$.each(deleted, function (index, toDelete) {
				if (index == i) {
					//console.log(table);
					cc.remove(toDelete.table, {id: toDelete.row_id}, function () {
						sync._recursiveDelete(deleted, onComplete, i+1);
					});
				}
				index++;
			});
		} else {
			if (typeof(onComplete) == "function")
				onComplete(); 
		}
	}
	
	this.isOnline = function() {
		if (navigator.network == undefined)	// web app
			return true;
		
		if (navigator.network.connection.type != Connection.NONE)	// phonegap
			return true;

		return false;
	}
	
	this.executing = function() {
		return this.executingGetData || this.executingPostData;
	}
	
}


var statgraphPage = (function statgraphPage() {	// statgraphPage namespace

var creating = false;
	
$('#statgraphPage').live('pagecreate', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	var type = undefToEmpty(params['type'], 'param');	// param or statparam
	var returnUri = strurldec(undefToEmpty(params['return_uri']));
	
	creating = true;
	
	if (returnUri)
		$(this).find('[data-role="header"] a.back').attr('href', returnUri);
});

$('#statgraphPage').live('pageinit', function(event) {
});

$('#statgraphPage').live('pagebeforeshow', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	var type = undefToEmpty(params['type'], 'param');
	
});

$('#statgraphPage').live('pageshow', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	var type = undefToEmpty(params['type'], 'param');
	var exerciseId = undefToEmpty(params['exercise_id'], 0);
	
	if (creating) {	// first access
		creating = false;
		
		showLoading();
		if (type == 'param') {
			// exercise parameters
			cc.get('exercises', {id: exerciseId}, function (exercise) {
				if (exercise != null) {
					setTitle(exercise.name);
				}
			});
		} else if (type == 'statparam') {
			setTitle("Misurazioni");
		}
		
		// prep. params. array
		prepParamsArray(type, exerciseId, function (paramsArr) {
			// fill params select
			fillSelect('param_id', paramsArr);
			var hasParams = false;
			// seleziona peso di default (se esiste) oppure il primo presente nella lista
			var pesoKey = 0;
			var firstKey = 0;
			$.each(paramsArr, function (key, val) {
				hasParams = true;
				if (firstKey == 0)
					firstKey = key;
				if (val == 'Peso')
					pesoKey = key;
			});
			if (hasParams) {
				activePage('[name="param_id"]').val(pesoKey ? pesoKey : firstKey);
				activePage('[name="param_id"]').selectmenu('refresh');
				showGraph();
			} else {
				activeContent('.graph-container').hide();
				activeContent().append('<div class="section" style="margin-top: 10px;"><small>Nessun parametro ancora disponibile per la creazione del grafico.</small></div>');
				hideLoading();
			}
		});
	}
});

$('#statgraphPage [name="param_id"], #statgraphPage [name="period"]').live('change', function() {
	showLoading();
	var intervalId = setInterval(function () {
		if ($('#statgraphPage #graph').is(':visible')) {	// fix back from select page
			clearInterval(intervalId);
			showGraph();
		}
	}, 0);
});

// Prep a "[paramId][day] = value" array/object
function prepStatsArray(paramType, exerciseId, onReady) {
	var statsArr = new Object();	// multidim. array [paramId][day] = value (object to be a numeric associative array)
	
	// exercise parameters
	// get available parameters (order by paramId and then by date)
	cc.getList('stats', {where: function (item) { return item.exercise_id == exerciseId && item.param_type == paramType; }, orderBy: function (item) { return item.param_id; } }, function (stats) {
		stats = cc.linqFilter(stats, {orderBy: function (item) {return getDate(item.day); } });
		$.each(stats, function (index, stat) {
			// create subarray if not created yet
			if (statsArr[stat.param_id] == undefined)
				statsArr[stat.param_id] = new Object();
			statsArr[stat.param_id][stat.day] = stat.value;
		});
		onReady(statsArr);
	});
}

// Return available parameters (don't show parameters without any stats data)
function prepParamsArray(paramType, exerciseId, onReady) {
	var paramsArr = new Object();
	
	if (paramType == 'param') {
		cc.get('exercises', {id: exerciseId}, function (exercise) {
			if (exercise != null) {
				var variableParams = exercise._variable_params;
				prepStatsArray(paramType, exerciseId, function (statsArr) {
					$.each(statsArr, function (paramId, days) {
						if (paramsArr[paramId] == undefined)
							paramsArr[paramId] = variableParams[paramId];	// id => name
					});
					onReady(paramsArr);
				});
			}
		});
	} else {
		cc.getList('statparams', {}, function (statparams) {
			prepStatsArray(paramType, 0, function (statsArr) {
				$.each(statsArr, function (paramId, days) {
					if (paramsArr[paramId] == undefined) {
						var statparamsFilter = cc.linqFilter(statparams, {where: function (item) { return item.id == paramId; }});
						if (statparamsFilter.length > 0)
							paramsArr[paramId] = statparamsFilter[0].name;	// id => name
					}
				});
				onReady(paramsArr);
			});
		});
	}
}

function fillSelect(selectName, arrOptions) {
	$.each(arrOptions, function (key, text) {
		activePage('[name="'+selectName+'"]').append($("<option></option>").attr("value", key).text(text)); 
	});
	activePage('[name="'+selectName+'"]').selectmenu('refresh');
}

function showGraph() {
	showLoading();
	
	var params = getUrlVars($(this).attr('data-url'));
	var type = undefToEmpty(params['type'], 'param');
	var exerciseId = undefToEmpty(params['exercise_id'], 0);
	
	// get selected parameter
	var paramId = $('#statgraphPage [name="param_id"]').val();
	var period = $('#statgraphPage [name="period"]').val();
	
	prepStatsArray(type, exerciseId, function (statsArr) {
		// test
		//var d = [[-373597200000, 315.71], [-370918800000, 317.45], [-368326800000, 317.50], [-363056400000, 315.86], [-360378000000, 314.93], [-357699600000, 313.19], [-352429200000, 313.34], [-349837200000, 314.67], [-347158800000, 315.58], [-344480400000, 316.47], [-342061200000, 316.65], [-339382800000, 317.71], [-336790800000, 318.29], [-334112400000, 318.16], [-331520400000, 316.55], [-328842000000, 314.80], [-326163600000, 313.84], [-323571600000, 313.34], [-320893200000, 314.81], [-318301200000, 315.59], [-315622800000, 316.43], [-312944400000, 316.97], [-310438800000, 317.58], [-307760400000, 319.03], [-305168400000, 320.03], [-302490000000, 319.59], [-299898000000, 318.18], [-297219600000, 315.91], [-294541200000, 314.16], [-291949200000, 313.83], [-289270800000, 315.00], [-286678800000, 316.19], [-284000400000, 316.89], [-281322000000, 317.70], [-278902800000, 318.54], [-276224400000, 319.48], [-273632400000, 320.58], [-270954000000, 319.78], [-268362000000, 318.58], [-265683600000, 316.79], [-263005200000, 314.99], [-260413200000, 315.31], [-257734800000, 316.10], [-255142800000, 317.01], [-252464400000, 317.94], [-249786000000, 318.56], [-247366800000, 319.69], [-244688400000, 320.58], [-242096400000, 321.01], [-239418000000, 320.61], [-236826000000, 319.61], [-234147600000, 317.40], [-231469200000, 316.26], [-228877200000, 315.42], [-226198800000, 316.69], [-223606800000, 317.69], [-220928400000, 318.74], [-218250000000, 319.08], [-215830800000, 319.86], [-213152400000, 321.39], [-210560400000, 322.24], [-207882000000, 321.47], [-205290000000, 319.74], [-202611600000, 317.77], [-199933200000, 316.21], [-197341200000, 315.99], [-194662800000, 317.07], [-192070800000, 318.36], [-189392400000, 319.57], [-178938000000, 322.23], [-176259600000, 321.89], [-173667600000, 320.44], [-170989200000, 318.70], [-168310800000, 316.70], [-165718800000, 316.87], [-163040400000, 317.68], [-160448400000, 318.71], [-157770000000, 319.44], [-155091600000, 320.44], [-152672400000, 320.89], [-149994000000, 322.13], [-147402000000, 322.16], [-144723600000, 321.87], [-142131600000, 321.21], [-139453200000, 318.87], [-136774800000, 317.81], [-134182800000, 317.30], [-131504400000, 318.87], [-128912400000, 319.42], [-126234000000, 320.62], [-123555600000, 321.59], [-121136400000, 322.39], [-118458000000, 323.70], [-115866000000, 324.07], [-113187600000, 323.75], [-110595600000, 322.40], [-107917200000, 320.37], [-105238800000, 318.64], [-102646800000, 318.10], [-99968400000, 319.79], [-97376400000, 321.03], [-94698000000, 322.33], [-92019600000, 322.50], [-89600400000, 323.04], [-86922000000, 324.42], [-84330000000, 325.00], [-81651600000, 324.09], [-79059600000, 322.55], [-76381200000, 320.92], [-73702800000, 319.26], [-71110800000, 319.39], [-68432400000, 320.72], [-65840400000, 321.96], [-63162000000, 322.57], [-60483600000, 323.15], [-57978000000, 323.89], [-55299600000, 325.02], [-52707600000, 325.57], [-50029200000, 325.36], [-47437200000, 324.14], [-44758800000, 322.11], [-42080400000, 320.33], [-39488400000, 320.25], [-36810000000, 321.32], [-34218000000, 322.90], [-31539600000, 324.00], [-28861200000, 324.42], [-26442000000, 325.64], [-23763600000, 326.66], [-21171600000, 327.38], [-18493200000, 326.70], [-15901200000, 325.89], [-13222800000, 323.67], [-10544400000, 322.38], [-7952400000, 321.78], [-5274000000, 322.85], [-2682000000, 324.12], [-3600000, 325.06], [2674800000, 325.98], [5094000000, 326.93], [7772400000, 328.13], [10364400000, 328.07], [13042800000, 327.66], [15634800000, 326.35], [18313200000, 324.69], [20991600000, 323.10], [23583600000, 323.07], [26262000000, 324.01], [28854000000, 325.13], [31532400000, 326.17], [34210800000, 326.68], [36630000000, 327.18], [39308400000, 327.78], [41900400000, 328.92], [44578800000, 328.57], [47170800000, 327.37], [49849200000, 325.43], [52527600000, 323.36], [55119600000, 323.56], [57798000000, 324.80], [60390000000, 326.01], [63068400000, 326.77], [65746800000, 327.63], [68252400000, 327.75], [70930800000, 329.72], [73522800000, 330.07], [76201200000, 329.09], [78793200000, 328.05], [81471600000, 326.32], [84150000000, 324.84], [86742000000, 325.20], [89420400000, 326.50], [92012400000, 327.55], [94690800000, 328.54], [97369200000, 329.56], [99788400000, 330.30], [102466800000, 331.50], [105058800000, 332.48], [107737200000, 332.07], [110329200000, 330.87], [113007600000, 329.31], [115686000000, 327.51], [118278000000, 327.18], [120956400000, 328.16], [123548400000, 328.64], [126226800000, 329.35], [128905200000, 330.71], [131324400000, 331.48], [134002800000, 332.65], [136594800000, 333.16], [139273200000, 332.06], [141865200000, 330.99], [144543600000, 329.17], [147222000000, 327.41], [149814000000, 327.20], [152492400000, 328.33], [155084400000, 329.50], [157762800000, 330.68], [160441200000, 331.41], [162860400000, 331.85], [165538800000, 333.29], [168130800000, 333.91], [170809200000, 333.40], [173401200000, 331.78], [176079600000, 329.88], [178758000000, 328.57], [181350000000, 328.46], [184028400000, 329.26], [189298800000, 331.71], [191977200000, 332.76], [194482800000, 333.48], [197161200000, 334.78], [199753200000, 334.78], [202431600000, 334.17], [205023600000, 332.78], [207702000000, 330.64], [210380400000, 328.95], [212972400000, 328.77], [215650800000, 330.23], [218242800000, 331.69], [220921200000, 332.70], [223599600000, 333.24], [226018800000, 334.96], [228697200000, 336.04], [231289200000, 336.82], [233967600000, 336.13], [236559600000, 334.73], [239238000000, 332.52], [241916400000, 331.19], [244508400000, 331.19], [247186800000, 332.35], [249778800000, 333.47], [252457200000, 335.11], [255135600000, 335.26], [257554800000, 336.60], [260233200000, 337.77], [262825200000, 338.00], [265503600000, 337.99], [268095600000, 336.48], [270774000000, 334.37], [273452400000, 332.27], [276044400000, 332.41], [278722800000, 333.76], [281314800000, 334.83], [283993200000, 336.21], [286671600000, 336.64], [289090800000, 338.12], [291769200000, 339.02], [294361200000, 339.02], [297039600000, 339.20], [299631600000, 337.58], [302310000000, 335.55], [304988400000, 333.89], [307580400000, 334.14], [310258800000, 335.26], [312850800000, 336.71], [315529200000, 337.81], [318207600000, 338.29], [320713200000, 340.04], [323391600000, 340.86], [325980000000, 341.47], [328658400000, 341.26], [331250400000, 339.29], [333928800000, 337.60], [336607200000, 336.12], [339202800000, 336.08], [341881200000, 337.22], [344473200000, 338.34], [347151600000, 339.36], [349830000000, 340.51], [352249200000, 341.57], [354924000000, 342.56], [357516000000, 343.01], [360194400000, 342.47], [362786400000, 340.71], [365464800000, 338.52], [368143200000, 336.96], [370738800000, 337.13], [373417200000, 338.58], [376009200000, 339.89], [378687600000, 340.93], [381366000000, 341.69], [383785200000, 342.69], [389052000000, 344.30], [391730400000, 343.43], [394322400000, 341.88], [397000800000, 339.89], [399679200000, 337.95], [402274800000, 338.10], [404953200000, 339.27], [407545200000, 340.67], [410223600000, 341.42], [412902000000, 342.68], [415321200000, 343.46], [417996000000, 345.10], [420588000000, 345.76], [423266400000, 345.36], [425858400000, 343.91], [428536800000, 342.05], [431215200000, 340.00], [433810800000, 340.12], [436489200000, 341.33], [439081200000, 342.94], [441759600000, 343.87], [444438000000, 344.60], [446943600000, 345.20], [452210400000, 347.36], [454888800000, 346.74], [457480800000, 345.41], [460159200000, 343.01], [462837600000, 341.23], [465433200000, 341.52], [468111600000, 342.86], [470703600000, 344.41], [473382000000, 345.09], [476060400000, 345.89], [478479600000, 347.49], [481154400000, 348.00], [483746400000, 348.75], [486424800000, 348.19], [489016800000, 346.54], [491695200000, 344.63], [494373600000, 343.03], [496969200000, 342.92], [499647600000, 344.24], [502239600000, 345.62], [504918000000, 346.43], [507596400000, 346.94], [510015600000, 347.88], [512690400000, 349.57], [515282400000, 350.35], [517960800000, 349.72], [520552800000, 347.78], [523231200000, 345.86], [525909600000, 344.84], [528505200000, 344.32], [531183600000, 345.67], [533775600000, 346.88], [536454000000, 348.19], [539132400000, 348.55], [541551600000, 349.52], [544226400000, 351.12], [546818400000, 351.84], [549496800000, 351.49], [552088800000, 349.82], [554767200000, 347.63], [557445600000, 346.38], [560041200000, 346.49], [562719600000, 347.75], [565311600000, 349.03], [567990000000, 350.20], [570668400000, 351.61], [573174000000, 352.22], [575848800000, 353.53], [578440800000, 354.14], [581119200000, 353.62], [583711200000, 352.53], [586389600000, 350.41], [589068000000, 348.84], [591663600000, 348.94], [594342000000, 350.04], [596934000000, 351.29], [599612400000, 352.72], [602290800000, 353.10], [604710000000, 353.65], [607384800000, 355.43], [609976800000, 355.70], [612655200000, 355.11], [615247200000, 353.79], [617925600000, 351.42], [620604000000, 349.81], [623199600000, 350.11], [625878000000, 351.26], [628470000000, 352.63], [631148400000, 353.64], [633826800000, 354.72], [636246000000, 355.49], [638920800000, 356.09], [641512800000, 357.08], [644191200000, 356.11], [646783200000, 354.70], [649461600000, 352.68], [652140000000, 351.05], [654735600000, 351.36], [657414000000, 352.81], [660006000000, 354.22], [662684400000, 354.85], [665362800000, 355.66], [667782000000, 357.04], [670456800000, 358.40], [673048800000, 359.00], [675727200000, 357.99], [678319200000, 356.00], [680997600000, 353.78], [683676000000, 352.20], [686271600000, 352.22], [688950000000, 353.70], [691542000000, 354.98], [694220400000, 356.09], [696898800000, 356.85], [699404400000, 357.73], [702079200000, 358.91], [704671200000, 359.45], [707349600000, 359.19], [709941600000, 356.72], [712620000000, 354.79], [715298400000, 352.79], [717894000000, 353.20], [720572400000, 354.15], [723164400000, 355.39], [725842800000, 356.77], [728521200000, 357.17], [730940400000, 358.26], [733615200000, 359.16], [736207200000, 360.07], [738885600000, 359.41], [741477600000, 357.44], [744156000000, 355.30], [746834400000, 353.87], [749430000000, 354.04], [752108400000, 355.27], [754700400000, 356.70], [757378800000, 358.00], [760057200000, 358.81], [762476400000, 359.68], [765151200000, 361.13], [767743200000, 361.48], [770421600000, 360.60], [773013600000, 359.20], [775692000000, 357.23], [778370400000, 355.42], [780966000000, 355.89], [783644400000, 357.41], [786236400000, 358.74], [788914800000, 359.73], [791593200000, 360.61], [794012400000, 361.58], [796687200000, 363.05], [799279200000, 363.62], [801957600000, 363.03], [804549600000, 361.55], [807228000000, 358.94], [809906400000, 357.93], [812502000000, 357.80], [815180400000, 359.22], [817772400000, 360.44], [820450800000, 361.83], [823129200000, 362.95], [825634800000, 363.91], [828309600000, 364.28], [830901600000, 364.94], [833580000000, 364.70], [836172000000, 363.31], [838850400000, 361.15], [841528800000, 359.40], [844120800000, 359.34], [846802800000, 360.62], [849394800000, 361.96], [852073200000, 362.81], [854751600000, 363.87], [857170800000, 364.25], [859845600000, 366.02], [862437600000, 366.46], [865116000000, 365.32], [867708000000, 364.07], [870386400000, 361.95], [873064800000, 360.06], [875656800000, 360.49], [878338800000, 362.19], [880930800000, 364.12], [883609200000, 364.99], [886287600000, 365.82], [888706800000, 366.95], [891381600000, 368.42], [893973600000, 369.33], [896652000000, 368.78], [899244000000, 367.59], [901922400000, 365.84], [904600800000, 363.83], [907192800000, 364.18], [909874800000, 365.34], [912466800000, 366.93], [915145200000, 367.94], [917823600000, 368.82], [920242800000, 369.46], [922917600000, 370.77], [925509600000, 370.66], [928188000000, 370.10], [930780000000, 369.08], [933458400000, 366.66], [936136800000, 364.60], [938728800000, 365.17], [941410800000, 366.51], [944002800000, 367.89], [946681200000, 369.04], [949359600000, 369.35], [951865200000, 370.38], [954540000000, 371.63], [957132000000, 371.32], [959810400000, 371.53], [962402400000, 369.75], [965080800000, 368.23], [967759200000, 366.87], [970351200000, 366.94], [973033200000, 368.27], [975625200000, 369.64], [978303600000, 370.46], [980982000000, 371.44], [983401200000, 372.37], [986076000000, 373.33], [988668000000, 373.77], [991346400000, 373.09], [993938400000, 371.51], [996616800000, 369.55], [999295200000, 368.12], [1001887200000, 368.38], [1004569200000, 369.66], [1007161200000, 371.11], [1009839600000, 372.36], [1012518000000, 373.09], [1014937200000, 373.81], [1017612000000, 374.93], [1020204000000, 375.58], [1022882400000, 375.44], [1025474400000, 373.86], [1028152800000, 371.77], [1030831200000, 370.73], [1033423200000, 370.50], [1036105200000, 372.18], [1038697200000, 373.70], [1041375600000, 374.92], [1044054000000, 375.62], [1046473200000, 376.51], [1049148000000, 377.75], [1051740000000, 378.54], [1054418400000, 378.20], [1057010400000, 376.68], [1059688800000, 374.43], [1062367200000, 373.11], [1064959200000, 373.10], [1067641200000, 374.77], [1070233200000, 375.97], [1072911600000, 377.03], [1075590000000, 377.87], [1078095600000, 378.88], [1080770400000, 380.42], [1083362400000, 380.62], [1086040800000, 379.70], [1088632800000, 377.43], [1091311200000, 376.32], [1093989600000, 374.19], [1096581600000, 374.47], [1099263600000, 376.15], [1101855600000, 377.51], [1104534000000, 378.43], [1107212400000, 379.70], [1109631600000, 380.92], [1112306400000, 382.18], [1114898400000, 382.45], [1117576800000, 382.14], [1120168800000, 380.60], [1122847200000, 378.64], [1125525600000, 376.73], [1128117600000, 376.84], [1130799600000, 378.29], [1133391600000, 380.06], [1136070000000, 381.40], [1138748400000, 382.20], [1141167600000, 382.66], [1143842400000, 384.69], [1146434400000, 384.94], [1149112800000, 384.01], [1151704800000, 382.14], [1154383200000, 380.31], [1157061600000, 378.81], [1159653600000, 379.03], [1162335600000, 380.17], [1164927600000, 381.85], [1167606000000, 382.94], [1170284400000, 383.86], [1172703600000, 384.49], [1175378400000, 386.37], [1177970400000, 386.54], [1180648800000, 385.98], [1183240800000, 384.36], [1185919200000, 381.85], [1188597600000, 380.74], [1191189600000, 381.15], [1193871600000, 382.38], [1196463600000, 383.94], [1199142000000, 385.44]]; 
		var d = [];
		$.each(statsArr[paramId], function (day, value) {
			console.log(day+' '+value);
			var date = getDate(day);
			d.push([date.getTime(), value]);
		});
		
		// min-max
		var max = new Date();
		max.setHours(24, 60, 60, 1000);
		var min = new Date();
		min.setHours(0, 0, 0, 0);
		
		// show points if not too much points
		var showPoints = false;
		
		switch (period)
		{
			case 'week':
				min.setDate(min.getDate() - 7);
				showPoints = true;
				break;
			case 'month':
				min.setMonth(min.getMonth() - 1);
				showPoints = true;
				break;
			case '3months':
				min.setMonth(min.getMonth() - 3);
				showPoints = false;
				break;
			case '6months':
				min.setMonth(min.getMonth() - 6);
				showPoints = false;
				break;
			case 'year':
				min.setFullYear(min.getFullYear() - 1);
				showPoints = false;
				break;
			case 'all':
				showPoints = (d.length <= 30);
				max = null;
				min = null;
				break;
		}
		
		// here we go!
		adjustGraphContainer();
		
		console.log('min: '+min);
		console.log('max: '+max);
		
		$.plot('#graph', [{data: d, color: '#63C832'/*verde più chiaro*/}], {
			xaxis: {
				mode: 'time',
				timezone: 'browser',
				min: min,
				max: max,
				monthNames: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
				dayNames: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"]
			},
			yaxis: {
				tickFormatter: function (value, axis) {
					// COPY of axis.tickFormatter = function (value, axis) from jquery.flot with italian decimal point (. to ,). s2s tag for changes
					var factor = axis.tickDecimals ? Math.pow(10, axis.tickDecimals) : 1;
					var formatted = "" + Math.round(value * factor) / factor;
					
					// If tickDecimals was specified, ensure that we have exactly that
					// much precision; otherwise default to the value's own precision.
					
					if (axis.tickDecimals != null) {
						var decimal = formatted.indexOf(".");
						var precision = decimal == -1 ? 0 : formatted.length - decimal - 1;
						if (precision < axis.tickDecimals) {
							return ((precision ? formatted : formatted + ".") + ("" + factor).substr(1, axis.tickDecimals - precision))
								.replace(/\./g, ',');	// s2s replace: italian decimal point (. to ,)
						}
					}
					
                    return formatted.replace(/\./g, ',');	// s2s replace: italian decimal point (. to ,)
				}
			},
			lines: {
				show: true
			},
			points: {
				show: showPoints
			}
		});
		
		hideLoading();
	});
}


$(window).resize(function() {
	if (activeContent('.graph-container').length > 0)
		adjustGraphContainer();
});
function adjustGraphContainer() {
	activeContent('.graph-container').width('100%');
	activeContent('.graph-container').height($(window).height() - (activePage('.selectForm').offset().top + activePage('.selectForm').outerHeight()) - 20);
}


})();	// statgraphPage namespace end

// Environment: development or production
var env = 'production';		

// Web service
var serverUrl = 'http://www.fitnessitaly.com/';
//var serverUrl = 'http://192.168.1.10:8080/fitnessitaly/';
var serviceUrl = serverUrl+'service/webservice';
var serviceKey = 'fititaly2013mobapp';

// Sync interval (seconds)
var syncInterval = 10;

// Android / iOS App Pro
var appAndroidPro = 'market://details?id=it.Fitnessitaly.MobilePro';
var appiOsPro = 'https://itunes.apple.com/it/app/id652146837';

// App type free or pro
// package: it.Fitnessitaly.Mobile / it.Fitnessitaly.MobilePro
//Eclipse: right click on Project > Android Tools > Rename Application Package; in AndroidManifest.xml set <application> and <activity> android:label="Fitnessitaly PRO"
//xCode: Project Target > Info > rename Bundle identifier and Bundle display name
var appType = 'free';
var appVersion = '2.0.1';

// Fitnessitaly Mobile
var userType = 'free';	// set after login in home

// Listener per evento PhoneGap pronto
var deviceReady = false;
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
	//PhoneGap pronto
	deviceReady = true;
}

$('[data-role="page"]').live('pagecreate', function(event) {
	var currentUrl = $(this).attr('data-url');
	/*var params = getUrlVars($(this).attr('data-url'));
	var list = undefToEmpty(params['list']);*/
	
	// header fisso e costante
	$(this).find('[data-role="header"]').attr('data-position', 'fixed');
	$(this).find('[data-role="header"]').attr('data-id', 'persistentHeader');
	$(this).find('[data-role="header"]').attr('data-tap-toggle', 'false');
	
	// allenamento in corso: aggiunge relativo footer alla pagina
	if (val(storage.getItem('training')) && currentUrl.indexOf('/index.html') == -1  && currentUrl.indexOf('/signup.html') == -1) {
		if ($(this).find('[data-role="footer"].trainingfooter').length == 0) {
			$(this).append('<div data-role="footer" data-position="fixed" data-id="persistentTrainingFooter" data-tap-toggle="false" data-theme="e" class="trainingfooter"></div>');
			// training footer html
			var html = '<div class="training_name">'+storage.getItem('trainingRoutineName')+'</div>';
			html += '<div class="training_info"><small>Allenamento in corso...</small> <span class="training_time">'+storage.getItem('trainingTimerText')+'</span></div>';
			html += '<a href="#" data-role="button" data-icon="ok" class="ui-btn-right training_stop">Stop</a>';
			$(this).find('.trainingfooter').html(html);
		}
	} else {
		$(this).find('[data-role="footer"].trainingfooter').remove();
	}
});
$('[data-role="footer"].trainingfooter .training_stop').live('click', function() {
	// click on training_stop button in training footer
	startStopTraining(false);
});

$('#indexPage').live('pagebeforeshow', function(event, data) {
	//activeContent().hide();
});

$('#indexPage').live('pageshow', function(event) {
	// wait device to be ready
	showLoading();
	var intervalId = setInterval(function () {
		if (deviceReady || !isPhonegap()) {
			clearInterval(intervalId);
			
			var params = getUrlVars();
			logout = undefToEmpty(params['logout']);
			
			if (storage.getItem('loginValid') && !logout) {
				hideLoading();
				$.mobile.changePage('home.html');
			} else {
				sync.stop();
				activeContent('#email').val(storage.getItem('loginEmail'));
				activeContent('#password').val(storage.getItem('loginPassword'));
				
				// first login: show alert
				if (activeContent('#email').val() == '' && activeContent('#password').val() == '') {
					//activePage('#firstLoginAlert p').html('');
					activePage('#firstLoginAlert').popup();
					activePage('#firstLoginAlert').popup('open');
				}
				
				// Login
				activeContent('#login').click(function () {
					var email = activeContent('#email').val();
					var password = activeContent('#password').val();
					login(email, password);
				});
				
				activeContent().show();
				hideLoading();
			}
			
		}
	}, 100);
});

// Login
function login(email, password) {
	var actionUrl = getServiceAction('check_login');
	
	// Online: check login
	if (sync.isOnline()) {
		showLoading();
		$.post(actionUrl, {email: email, password: password}, function (response) {
			response = $.parseJSON(response);
			if (response.valid) {
				checkVersioneChanged(function () {
					checkUserChanged(email, function () {
						hideLoading();
						storage.setItem('loginAppVersion', appVersion);
						storage.setItem('loginEmail', email);
						storage.setItem('loginPassword', password);
						storage.setItem('loginValid', 1);
						storage.setItem('userId', response.userId);
						storage.setItem('userIdEnc', response.userIdEnc);
						// Al login forzo il refresh dei dati non ancora scaricati
						sync.hasData = false;
						// Here we go!
						$.mobile.changePage('home.html');
					});
				});
			} else {
				hideLoading();
				activePage('#loginError p').html(response.errorMsg);
				activePage('#loginError').popup();
				activePage('#loginError').popup('open');
			}
		});
	} else {
		
		// Offline login
		if (storage.getItem('loginValid')) {
			$.mobile.changePage('home.html');
		} else {
			activePage('#loginError p').html("Connessione non disponibile: impossibile effettuare il login.");
			activePage('#loginError').popup();
			activePage('#loginError').popup('open');
		}
	}
}

//Se la versione dell'app è cambiata, forza l'aggiornamento di tutti i dati
function checkVersioneChanged(onReady) {
	if (storage.getItem('loginAppVersion') != null && appVersion != storage.getItem('loginAppVersion')) {
		console.log('New version: force complete refresh db!');
		storage.removeItem("lastSync");
	}
	onReady();
}

// Se l'utente è cambiato, resetta il database
function checkUserChanged(email, onReady) {
	if (storage.getItem('loginEmail') != null && email != storage.getItem('loginEmail')) {
		// prima di resettare, sincronizzo per eventuali modifiche ancora da inviare
		showLoading(0, "Sincronizzazione dati in corso...");
		sync.postGetData(function () {
			// resetta il db!
			console.log('reset db!');
			storage.removeItem("lastSync");
			cc.reset(onReady);
		});
	} else {
		onReady();
	}
}

/**
 * Con la free è possibile creare solo 1 scheda
 */
function checkAddRoutineProOnly(onChecked) {
	if (userType == 'pro') {
		onChecked(true);
	} else {
		cc.getList('routines', {where: function (item) { return item._type == 'created'; } }, function (routines) {
			if (routines.length < 1) {
				onChecked(true);	// 1 limit not reached yet
			} else {
				// copy in current page
				if (activePage('#addRoutineProOnly').length == 0)
					activePage('[data-role="content"]').append($('#indexPage #addRoutineProOnly').clone());
				activePage('#addRoutineProOnly').trigger('create');
				activePage('#addRoutineProOnly').popup();
				activePage('#addRoutineProOnly').popup('open');
				onChecked(false);	// 1 limit already reached
			}
		});
	}
}

/**
 * Con la free è possibile aggiungere solo un giorno di statistiche per ogni tipo di statistica
 */
function checkAddDayProOnly(paramType, clickDate, onChecked) {
	if (userType == 'pro') {
		onChecked(true);
	} else {
		// count compiled days (except clicked day)
		_countCompiledDays(paramType, function (count) {
		_isCompiledDay(paramType, clickDate, function (isCompiled) {
			if (count < 1 || isCompiled) {
				onChecked(true);	// 1 limit not reached yet
			} else {
				// copy in current page
				if (activePage('#addDayProOnly').length == 0)
					activePage('[data-role="content"]').append($('#indexPage #addDayProOnly').clone());
				activePage('#addDayProOnly').trigger('create');
				activePage('#addDayProOnly').popup();
				activePage('#addDayProOnly').popup('open');
				onChecked(false);	// 1 limit already reached
			}
		});
		});
	}
}
function _countCompiledDays(paramType, onReady) {
	if (paramType == 'param') {
		var days = new Object();
		cc.getList('statdays', { }, function (statdays) {
			$.each(statdays, function (index, statday) {
				if (statday.routines.length > 0)
					days[statday.day] = val(days[statday.day]) + 1;
			});
			onReady(Object.keys(days).length);
		});
	} else if (paramType == 'statparam') {
		var days = new Object();
		cc.getList('stats', { where: function (item) {return item.param_type == paramType;} }, function (stats) {
			$.each(stats, function (index, stat) {
				days[stat.day] = val(days[stat.day]) + 1;
			});
			onReady(Object.keys(days).length);
		});
	}
}
function _isCompiledDay(paramType, date, onReady) {
	if (paramType == 'param') {
		var days = new Object();
		cc.get('statdays', { where: function (item) {return item.day == date.format('yyyy-mm-dd'); } }, function (statday) {
			onReady(statday != null && statday.routines.length > 0);
		});
	} else if (paramType == 'statparam') {
		var days = new Object();
		cc.getList('stats', { where: function (item) {return item.param_type == paramType && item.day == date.format('yyyy-mm-dd');} }, function (stats) {
			onReady(stats.length > 0);
		});
	}
}

// #addRoutineProOnly/#addDayProOnly .go-pro-link general click event (common dialog copied from #indexPage)
$('#addRoutineProOnly .go-pro-link, #addDayProOnly .go-pro-link').live('click', function() {
	var proLink = isiOS() ? appiOsPro : appAndroidPro;
	if (isiOS()) {
		iOSPurchasePro();
	} else {
		window.open(proLink, '_system');
	}
	return false;
});


// Refresh sync info
setInterval(refreshSyncIcon, 100);
function refreshSyncIcon()
{
	if (sync.isOnline()) {	// online image
		$('.offline').remove();
	} else {
		if ($('.ui-page-active .offline').length == 0)
			$('.ui-page-active').append('<span class="offline">Modalità offline</span>');
	}
}

var homePage = (function homePage() {	// homePage namespace

$('#homePage').live('pageinit', function(event) {
	// start sync if not started
	if (!sync.started) {
		sync.start();
	}
});

$('#homePage').live('pagebeforeshow', function(event) {
	activeContent().hide();
});

$('#homePage').live('pageshow', function(event) {
	// if first sync, wait to be sync
	if (sync.isOnline() && !sync.hasData) {
		showLoading(0, "Download dati in corso...");
		activePage('.downloading_footer').show();	// show cancel download button
		var intervalId = setInterval(function () {
			if (sync.hasData) {
				clearInterval(intervalId);
				activePage('.downloading_footer').hide();	// hide cancel download button
				show();
			}
		}, 100);
	} else {
		show();
	}
});

function show() {
	cc.get('users', {id: storage.getItem('userId')}, function (user) {
		userType = user.type;	// defined globally in index
		activeContent('.user_image').attr('src', user._image_small);
		activeContent('.user_name').text(user.first_name+' '+user.last_name);
		activeContent('.user_email').text(user.email);
		activeContent('.user_type').text(userTypeDescr(user.type));
		
		// Show go-to-pro message if user is free
		if (userType == 'free') {
			var proLink = navigator.userAgent.match(/(iPhone|iPod|iPad)/) ? appiOsPro : appAndroidPro;
			//activeContent('a.go-pro-link').attr('href', proLink);
			activeContent('a.go-pro-link').click(function () {
				if (isiOS()) {
					iOSPurchasePro();
				} else {
					window.open(proLink, '_system');
				}
				return false;
			});
			activeContent('.go-pro').show();
		}
		
		hideLoading();
		activeContent().show();
	});
	
	// Events
	activePage('.settings').click(function () {
		// Per modificare le impostazioni bisogna essere online (soprattutto per il discorso del cambio email: il controllo
		// di disponibilità nuova email va fatto subito e anche per l'upload dell'immagine).
		if (!sync.isOnline()) {
			msgAlert("Attenzione! In modalità offline puoi visualizzare ma non modificare le informazioni del profilo.")
		}
	});
}

})();	// homePage namespace end

var trainingEndPage = (function trainingEndPage() {	// trainingEndPage namespace

$('#trainingEndPage').live('pagecreate', function(event) {
});

$('#trainingEndPage').live('pagebeforeshow', function(event, data) {
});

$('#trainingEndPage').live('pageshow', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	var totalTime = val(undefToEmpty(params['total_time'], 0));
	var routineId = val(undefToEmpty(params['routine_id'], 0));
	
	showLoading();
	
	// set time
	var diff = Math.round(totalTime / 1000);
	activeContent('.training_totaltime').html('<span class="ui-icon ui-icon-time"></span> '+jintervals(diff, '{MM}:{ss}'));
	
	cc.get('routines', {id: routineId}, function (routine) {
		if (routine != null) {
			activeContent('.routine_name').html('<span class="ui-icon ui-icon-folder-open"></span> '+routine.name);
			activeContent('.routine_exercisenum').html('<span class="ui-icon ui-icon-bar-chart"></span> '+routine.exercises.length);
			
			hideLoading();
		}
	});
	
});

$('#trainingEndPage img').live('error', function() {
});

$('#trainingEndPage a').live('click', function(event) {
});

$('#trainingEndPage').live('pageremove', function(event) {
});

})();	// trainingEndPage namespace end

var loadingMsgOn = false;

//$.ajaxSetup({timeout: 10000});
$.ajaxSetup({timeout: 90000});

if (env != 'development') {
	var console = {};
	console.log = function(){};
}

/**
 * Ritorna parametro da URL da utilizzare nell'evento pageshow
 */
function getUrlVars(url) {
	if (url == undefined)
		url = window.location.href;
	
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

/**
 * Ritorna il content div per la pagina mobile attiva
 */
function activeContent(find) {
	if (!find)
		return $.mobile.activePage.find('[data-role="content"]');
	else
		return $.mobile.activePage.find('[data-role="content"]').find(find);
}

/**
 * Ritorna il div della pagina mobile attiva
 */
function activePage(find) {
	if (!find)
		return $.mobile.activePage;
	else
		return $.mobile.activePage.find(find);
}

/**
 * Undefined to ''
 * @param v
 * @returns
 */
function undefToEmpty(v, emptyVal) {
	if (emptyVal == undefined)
		emptyVal = '';
	
	if (v == undefined)
		return emptyVal;
	return v;
}

/**
 * Encode string for url
 * @param s
 * @returns
 */
function strurl(s) {
	return encodeURIComponent(s).replace(/\(/g, '%28').replace(/\)/g, '%29');
}

/**
 * Decode string from url
 * @param s
 * @returns
 */
function strurldec(s) {
	return decodeURIComponent(s).replace(/%28/g, '(').replace(/%29/g, ')');
}

/**
 * Imposta titolo per la pagina corrente
 * @param s
 */
function setTitle(title) {
	activePage('[data-role="header"] h1').html(title);
}

/**
 * Ritorna querystring per l'azione con parametri indicati
 * @param action
 * @param params
 * @returns {String}
 */
function getServiceAction(action, params) {
	var actionUrl = serviceUrl+'?key='+serviceKey+'&app_type='+appType+'&app_version='+appVersion;
	if (action)
		actionUrl += '&action='+action;
	if (params)
		actionUrl += '&'+$.param(params);
	
	//actionUrl += '&callback=?';	// supporto cross-domain request
	
	return actionUrl;
}

function ajaxError(jqXHR, textStatus, errorThrown) {
	hideLoading();
	var msg;
	if (textStatus == 'timeout')
		msg = 'Connessione non disponibile!';
	else
		msg = textStatus;
	
	msgAlert(msg);
}

function msgAlert(msg) {
	try {	// phonegap
		navigator.notification.alert(msg, null, 'Fitnessitaly');
	} catch(err) {	// browser
		alert(msg);
	}
}

function msgConfirm(msg, onConfirm, onCancel) {
	try {	// phonegap
		navigator.notification.confirm(msg, function(index) {
			if (index == 1)
				onConfirm();
			else
				if (onCancel != undefined)
					onCancel();
		}, 'Fitnessitaly');
	} catch(err) {	// browser
		if (confirm(msg))
			onConfirm();
	}
}

/**
 * Funzione generica per visualizzazione lista paginata dopo richiesta json
 * 
 * @param action
 * @param params
 * @param target
 * @param onResult
 * @param page
 */
//function paginatedList(action, params, target, onResult, page, uid) {
function paginatedList(all, list, onResult, page, uid) {
	if (page == undefined) page = 1;
	//params.page = page;			// pagina da richiedere
	if (typeof pagesize == 'undefined') pagesize = 10;
	//params.pagesize = pagesize;	// da config.js
	//params.checkmore = true;	// ritorna un elemento in più per sapere se devo caricare altre pagine
	
	//var actionUrl = getServiceAction(action, params);
	
	if (uid == undefined)
		uid = getUID();	// evita che la lista vengona popolata da chiamate partite da pagine precedenti
	
	// se è la prima pagina, pulisce in content e crea la lista
	if (page <= 1) {
		/*target.empty();
		target.append('<ul data-uid="'+uid+'"></ul>');*/
		list.empty();
		list.attr('data-uid', uid);
	}
	//var list = target.find('ul[data-uid="'+uid+'"]');
	console.log(page);
	
	showLoading(page);
	//$.getJSON(actionUrl, function(data) {
	var data = all.slice(pagesize*(page-1), pagesize*(page-1) + pagesize);
	
		// il server, se ci sono ancora pagina dopo di questa, restituisce pagesize+1 elementi
		var more = false;
		/*if (data.length == pagesize+1) {
			more = true;
			data.splice(data.length-1, 1);	// rimuove l'elemento in più
		}*/
		if (all.length > pagesize*page)
			more = true;
		
		// rimuove da lista loading item precedente
		removeLoading(list);
		
		// chiamata funzione di composizione lista
		onResult(data, list, page, more);
		
		if (more) {
			// aggiunge a lista loading item
			appendLoading(list);
			// carica ulteriori dati quando arrivo a fine pagina
			//pagination(list, function() {paginatedList(action, params, target, onResult, page+1, uid)});
			pagination(list, function() {paginatedList(all, list, onResult, page+1, uid)});
		}
		
		// applica aspetto listview
		//list.listview(page <= 1 ? null : 'refresh');
		list.listview(list.hasClass('ui-listview') ? 'refresh': null);
		hideLoading(page);
		
	//}).error(ajaxError);
}

/**
 * Motore paginazione
 * 
 * @param loadFunct
 * @returns
 */
function pagination(list, loadFunct, offset) {
	if (offset == undefined) offset = 30;
	
	var uid = list.attr('data-uid');
	
	this.wait = false;
	
	// pulizia eventi paginazione
	//$.each($(window).data('events').scroll, function() {
	$.each($._data($(window)[0], "events").scroll, function() {
		if (this.namespace == 'pagination') {
			// unbind eventi paginazione collegati a liste non più presenti
			if ( $('ul[data-uid="'+this.data.uid+'"]').length == 0) {
				$(window).unbind('scroll', this);
			}
			// unbind evento paginazione con questo uid perché verrà riapplicato dopo
			if (this.data.uid == uid) {
				$(window).unbind('scroll', this);
			}
		}
	});
	
	// unbind paginazione precedente
	//$(window).unbind('scroll.pagination');
	//console.log($(window).data('events').scroll);
	
	if (loadFunct != null) {
		// chiama la funzione di caricamento se lo scroll è in fondo
		$(window).bind('scroll.pagination', {uid: uid}, function() {
			// evita popolamento liste in cache ma non visibili
			if (!list.is(':visible')) return;
			if (activeContent('ul[data-uid="'+uid+'"]').length == 0) return;
			// richiesta nuova pagina
			if ($(window).scrollTop() >= $(document).height() - $(window).height() - offset) {
				if (!this.wait) {
					this.wait = true;
					loadFunct();
				}
			}
		});
		
		list.listview({
			create: function(event, ui) { 
				// fix altezza lista <= altezza finestra
				if ($(document).height() == $(window).height())
					loadFunct();
			}
		});
	}
}

/**
 * Accoda loading a lista
 * @param list
 */
function appendLoading(list, image, message) {
	if (image == undefined) image = 'loading.gif';
	if (message == undefined) message = 'Loading...';
	list.append('<li id="loading">'+
                '<div style="text-align:center">'+
                '<img src="img/'+image+'" /> '+message+'</div>'+
                '</li>');
}

/**
 * Rimuove loading da lista
 * @param list
 */
function removeLoading(list) {
	list.find('li#loading').remove();
}


/**
 * Visualizza loading generale o per paginazione
 * 
 * @param div
 * @param page
 */
function showLoading(page, msgText)
{
	if (page == undefined) page = 1;
	if (msgText == undefined) msgText = '';
	if (page <= 1 && !loadingMsgOn) {
		loadingMsgOn = true;	// custom property
		//$.mobile.showPageLoadingMsg();
		 $.mobile.loading('show', {
			 text: msgText,
			 textVisible: (msgText != ''),
			 theme: "b"
		});
	}
}

/**
 * Nasconde loading generale o per paginazione
 * 
 * @param div
 * @param page
 */
function hideLoading(page)
{
	if (page == undefined) page = 1;
	if (page <= 1) {
		loadingMsgOn = false;
		 $.mobile.loading('hide');
	}
}

/**
 * Ritorna un id univoco secondo il datetime
 */
function getUID() {
	var newDate = new Date;
    return newDate.getTime();
}

/**
 * Validazione link e sostituzione \n con <br />
 * 
 * @param s
 * @returns
 */
function strmsg(s) {
	var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	s = s.replace(exp,'<a href="$1" target="_blank">$1</a>'); 
	s = s.replace(/\n/g, '<br />');
	return s;
}

/**
 * Ritorna una data da una stringa yyyy-MM-dd hh:mm:ss oppure yyyy/MM/dd hh:mm:ss
 * @param s
 */
function getDate(s) {
	/*// replace / con -
	s = s.replace(/\//g, '-');
	
	var strDate = s.substr(0, 10)+'T'+s.substr(11);
	var d = new Date(Date.parse(strDate));*/
	
	var d = new Date();
	
	d.setFullYear(parseInt(s.substr(0, 4), 10));
	d.setMonth(parseInt(s.substr(5, 2), 10) - 1);
	d.setDate(parseInt(s.substr(8, 2), 10));
	
	if (s.length > 11)
		d.setHours(parseInt(s.substr(11, 2), 10));
	else
		d.setHours(0);
	
	if (s.length > 14)
		d.setMinutes(parseInt(s.substr(14, 2), 10));
	else
		d.setMinutes(0);
	
	if (s.length > 17)
		d.setSeconds(parseInt(s.substr(17, 2), 10));
	else
		d.setSeconds(0);
	
	return d;
}

/**
 * Convert to int (if not a number, return 0)
 * @param s: string
 * @param d: decimal places
 */
function val(s, d) {
	if (d == undefined) d = 0;
	
	if (d == 0) {
		var n = parseInt(s, 10) || 0;
	} else {
		var n = parseFloat(s) || 0;
		n = parseFloat(n.toFixed(d));
	}
	
	return n;
}

/**
 * Return array index or -1 comparing values, not string (if necessary, convert string to number)
 * @param v
 * @param arr
 * @returns {Boolean}
 */
function indexOfVal(v, arr) {
	for (var i = 0; i < arr.length; i++) {
		if (val(v) == val(arr[i]))
			return i;
	}
	return -1;
}

/**
 * Check running in Phonegap
 */
function isPhonegap() {
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
		return true;
	} else {
		return false;
	}
}

/**
 * Check running on iOS
 */
function isiOS() {
	if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
		return true;
	} else {
		return false;
	}
}

/**
 * Check running on Android
 */
function isAndroid() {
	if (navigator.userAgent.match(/(Android)/)) {
		return true;
	} else {
		return false;
	}
}


// FUNCTIONS FOR THIS PROJECT
// https://github.com/chrisben/imgcache.js
/*function applyImgCacheManager() {
	activeContent().imagesLoaded(function($images, $proper, $broken) {
		// see console output for debug info
		ImgCache.options.debug = true;
		ImgCache.options.usePersistentCache = true;
		
		ImgCache.init(function() {
			// 1. cache images
			for (var i = 0; i < $proper.length; i++) {
				ImgCache.cacheFile($($proper[i]).attr('src'));
			}
			// 2. broken images get replaced
			for (var i = 0; i < $broken.length; i++) {
				//ImgCache.useCachedFile($($broken[i]));
				alert("aaaa");
			}
			
		});
	});
}*/

function userTypeDescr(type) {
	if (type == 'free')
		return "Free";
	if (type == 'pro')
		return "Pro";
	if (type == 'pt')
		return "Personal trainer";
	if (type == 'fc')
		return "Centro fitness";
}


function uploadPhoto(capture) {
	if (capture == undefined) capture = false;
	
	var sourceType = (capture ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.SAVEDPHOTOALBUM);
	navigator.camera.getPicture(this.onCaptureSuccess, this.onCaptureFail, {
		destinationType: Camera.DestinationType.FILE_URI,
		sourceType: sourceType,
		correctOrientation: true
	});
}


// https://github.com/phonegap/phonegap-plugins/tree/master/iPhone/InAppPurchaseManager
// https://developer.apple.com/library/ios/#documentation/NetworkingInternet/Conceptual/StoreKitGuide/Introduction/Introduction.html
// Sandbox: https://developer.apple.com/library/mac/documentation/NetworkingInternet/Conceptual/StoreKitGuide/DevelopingwithStoreKit/DevelopingwithStoreKit.html
function iOSPurchasePro() {
	if (!sync.isOnline()) {
		msgAlert("Attenzione! Impossibile acquistare la versione PRO in modalità offline. Collegarsi ad internet per l'acquisto del prodotto.")
		return;
	}
	
	showLoading(0, "Fitnessitaly PRO");
	
	window.plugins.inAppPurchaseManager.requestProductData("fitnessitaly_pro", function(result) {
		//hideLoading();
		window.plugins.inAppPurchaseManager.makePurchase(result.id, 1);
	}, function(id) {
		hideLoading();
		console.log("Invalid product id: " + result);
	});
	
	window.plugins.inAppPurchaseManager.onPurchased = function(transactionIdentifier, productId, transactionReceipt) {
		//hideLoading();
		console.log('purchased: ' + productId);
		
		// force relogin to set this user as "pro" server side
		appType = 'pro';
		var actionUrl = getServiceAction('check_login');
		showLoading(0, 'Passaggio a PRO in corso...');
		var email = storage.getItem('loginEmail');
		var password = storage.getItem('loginPassword');
		$.post(actionUrl, {email: email, password: password}, function (response) {
			response = $.parseJSON(response);
			if (response.valid) {
				msgAlert("Fitnessitaly PRO attivato!");
				userType = 'pro';
				cc.get('users', {id: response.userId}, function (user) {
					user.type = 'pro';
					cc.save('users', user, function () {
						hideLoading();
						$.mobile.changePage('home.html', {reloadPage: true});
					});
				});
			} else {
				hideLoading();
				window.plugins.inAppPurchaseManager.restoreCompletedTransactions();
				msgAlert("Errore durante l'attivazione Fitnessitaly PRO: connessione non più attiva oppure indirizzo email modificato dal sito web. Per proseguire, rieffettuare il login.");
			}
		});
	}
	
	window.plugins.inAppPurchaseManager.onRestored = function(transactionIdentifier, productId, transactionReceipt) {
		hideLoading();
		console.log('restored: ' + productId);
	}
	
	window.plugins.inAppPurchaseManager.onFailed = function(errno, errtext) {
		hideLoading();
		console.log('failed: ' + errtext);
	}
}

/**
 * Aggiunta dati scheda allenamento in statistiche di quel giorno
 * COPIA LA SCHEDA nell'array, non salvo solo l'id, per mantenere i valori dei parametri nel momento in cui l'ho aggiunta
 * (le statistiche prevedono un grafico con, per ogni esercizio, il massimo valore di ogni parametro impostato per quel giorno)
 * @param day (timestamp)
 * @param routineId
 * @param onSaved
 */
function addStatdayRoutine(day, routine, onSaved, muted) {
	if (muted == undefined) muted = false;
	
	var date = new Date(day);
	
	// Get current day row
	cc.get('statdays', { where: function (item) {return item.day == date.format('yyyy-mm-dd');} }, function (statday) {
		if (statday == null) {	// current day does not exit in statdays table yet: add a staday row
			statday = new Object();
			statday.local_id = 0;
			statday.id = 0;
			statday.day = date.format('yyyy-mm-dd');
			statday.routines = new Array();
		}
		// routine already added?
		for (i = 0; i < statday.routines.length; i++) {
			if (statday.routines[i].id == routine.id) {
				if (!muted)
					alert("Questa scheda è già stata aggiunta nel giorno corrente.");
				if (typeof(onSaved) == "function")
					onSaved();
				return;
			}
		}
		// add routine to this statday routines
		sanitizeRoutine(routine);
		statday.routines.push(routine);
		// add/update row
		statday.post = true;
		// save and recalc. stats
		cc.save('statdays', statday, function () {
			calcStatsParam(day, function () {
				if (typeof(onSaved) == "function")
					onSaved();
			});
		});
	});
}

/**
 * Rimozione dati scheda allenamento in statistiche di quel giorno
 * @param day (timestamp)
 * @param routineId
 * @param onRemoved
 */
function removeStatdayRoutine(day, routineId, onRemoved) {
	var date = new Date(day);
	
	cc.get('statdays', { where: function (item) {return item.day == date.format('yyyy-mm-dd');} }, function (statday) {
		for (i = 0; i < statday.routines.length; i++)
			if (statday.routines[i].id == routineId)
				break;
		
		if (i < statday.routines.length)
			statday.routines.splice(i, 1);
		statday.post = true;
		cc.save('statdays', statday, function () {
			calcStatsParam(day, function () {
				if (typeof(onRemoved) == "function")
					onRemoved();
			});
		});
	});
}

/**
 * Calculate or Recalculate Stats
 * @param day (timestamp)
 * @param onReady
 */
function calcStatsParam(day, onReady) {
	var date = new Date(day);
	var statArr = new Object();	// multidim. array [exerciseId][paramId] = value (object to be a numeric associative array)
	
	// prep. routines and exercises table to filter synchronously
	cc.getList('exercises', {}, function (exercises) {
		
		// day
		cc.get('statdays', { where: function (item) {return item.day == date.format('yyyy-mm-dd');} }, function (statday) {
			
			// routines executed this day
			$.each(statday.routines, function (rIndex, routine) {
				// loop routine exercises (not deleted)
				var routineExercises = cc.linqFilter(routine.exercises, {where: function (item) {return !undefToEmpty(item.deleted, false); } });
				$.each(routineExercises, function (reIndex, routineExercise) {
					// get exercise variable parameters
					var exerciseFilter = cc.linqFilter(exercises, {where: function (item) {return item.id == routineExercise.exercise_id} });
					if (exerciseFilter.length > 0) {
						var exercise = exerciseFilter[0];
						var variableParams = exercise._variable_params;
						// for each routine exercise set
						var routineExerciseSets = routineExercise.sets != undefined ? routineExercise.sets : new Object();	// fix sets undefined
						$.each(routineExerciseSets, function (sIndex, set) {
							// for each available parameter
							$.each(variableParams, function (paramId, paramName) {
								set[paramId] = undefToEmpty(set[paramId], '').replace(/,/g, '.');	// fix num,dec to num.dec
								if (set[paramId] != undefined && set[paramId] != '' && !isNaN(set[paramId])) {	// it's a valid number
									// create subarray if not created yet
									if (statArr[exercise.id] == undefined)
										statArr[exercise.id] = new Object();
									if (statArr[exercise.id][paramId] == undefined)
										statArr[exercise.id][paramId] = 0;
									// keep max value
									if (val(set[paramId], 2) > statArr[exercise.id][paramId])
										statArr[exercise.id][paramId] = val(set[paramId], 2);
								}
							});
						});
					}
				});
			});
			
			console.log(statArr);
			
			// now save all in stats table
			var toSaveLength = 0;
			$.each(statArr, function (exerciseId, paramArr) {
				$.each(paramArr, function (paramId, value) {
					toSaveLength++;
				});
			});
			if (toSaveLength > 0) {
				var countSaved = 0;
				$.each(statArr, function (exerciseId, paramArr) {
					$.each(paramArr, function (paramId, value) {
						
						// update a day-exercise-param?
						cc.get('stats', { where: function (item) {return item.day == date.format('yyyy-mm-dd') && item.exercise_id == exerciseId && item.param_type == 'param' && item.param_id == paramId;} }, function (stat) {
							if (stat == null) {
								console.log('new stats record: ');
								stat = new Object();
								stat.local_id = 0;
								stat.id = 0;
								stat.day = date.format('yyyy-mm-dd');
								stat.exercise_id = exerciseId;
								stat.param_type = 'param';
								stat.param_id = paramId;
							}
							stat.value = value;
							stat.post = true;
							stat.deleted = 0/*false*/;
							console.log(stat);
							cc.save('stats', stat, function () {
								countSaved++;
								if (countSaved == toSaveLength) {
									console.log('stats: saved all!');
									if (typeof(onReady) == "function")
										onReady();
								}
							});
						});
					});
				});
			} else {
				if (typeof(onReady) == "function")
					onReady();
			}
			
			// delete this day param stat record no longer present in paramArr
			cc.getList('stats', { where: function (item) {return item.day == date.format('yyyy-mm-dd') && item.param_type == 'param';} }, function (stats) {
				$.each(stats, function (index, stat) {
					var found = false;
					$.each(statArr, function (exerciseId, paramArr) {
						$.each(paramArr, function (paramId, value) {
							if (val(exerciseId) == val(stat.exercise_id) && val(paramId) == val(stat.param_id))
								found = true;
						});
					});
					if (!found) {
						console.log('stat item with local id '+stat.local_id+' deleted.');
						stat.post = true;
						stat.deleted = 1/*true*/;
						cc.save('stats', stat);
					}
				});
			});
		});
		
	});
}


/**
 * Start training 
 */
function startStopTraining(start, routineId, reloadUri) {
	if (routineId == undefined) routineId = 0;
	if (reloadUri == undefined) reloadUri = '';
	
	var date = new Date();
	var currentUrl = window.location.href;
	var currentUri = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
	
	// replace/append new ts
	var params = getUrlVars(currentUri);
	var tsOld = undefToEmpty(params['ts'], '');
	if (tsOld == '')
		currentUri += (currentUri.indexOf('?')>0?'&':'?')+'ts='+(new Date().getTime());
	else
		currentUri = currentUri.replace('ts='+tsOld, 'ts='+(new Date().getTime()));
	
	showLoading(0, start ? "Inizio allenamento..." : "Fine allenamento...");
	
	if (start == true) {	// start
		
		storage.setItem('training', 1);
		storage.setItem('trainingRoutineId', routineId);
		storage.setItem('trainingRoutineStart', date.getTime());
		storage.setItem('trainingTimerText', '00:00');
		
		cc.get('routines', {id: routineId}, function (routine) {
			// HTML for footer
			if (routine != null) {
				storage.setItem('trainingRoutineName', routine.name);
				
				// timer
				startStopTraining.timerInterval = setInterval(function () {
					console.log('training timer');
					var nowTime = (new Date().getTime());
					var startTime = val(storage.getItem('trainingRoutineStart'));
					if (startTime > 0) {
						var diff = Math.round((nowTime - startTime) / 1000);
						var timerText = jintervals(diff, '{MM}:{ss}');
						$('.trainingfooter .training_time').text(timerText);
						storage.setItem('trainingTimerText', timerText);	// immediately apply current timer text on page change
					}
				}, 1000);
				
				// reload this page to show training footer
				$.mobile.changePage(reloadUri == '' ? currentUri : reloadUri);
			}
		});
		
		
	} else if (start == false) {	// stop
		
		var routineId = val(storage.getItem('trainingRoutineId'));
		var startTime = val(storage.getItem('trainingRoutineStart'));
		var totalTime = date.getTime() - startTime;
		// register stats
		cc.get('routines', {id: routineId}, function (routine) {
			if (routine != null) {
				addStatdayRoutine(startTime, routine, function () {}, true);
			}
		});
		
		// reset storage
		storage.setItem('training', 0);
		storage.setItem('trainingRoutineId', 0);
		storage.setItem('trainingRoutineStart', 0);
		storage.setItem('trainingRoutineName', '');
		storage.setItem('trainingTimerText', '00:00');
		
		// reset timer
		clearInterval(startStopTraining.timerInterval);
		
		// go to training end page and show data
		$.mobile.changePage('training_end.html?total_time='+totalTime+'&routine_id='+routineId);
	}
}

function htmlTrainingFooter(routine) {
	var html = '<div class="training_name">'+routine.name+'</div>';
	html += '<div class="training_info"><small>Allenamento in corso...</small> <span class="training_time">00:00</span></div>';
	html += '<a href="#" data-role="button" data-icon="ok" class="ui-btn-right training_stop">Stop</a>';
	return html;
}


/**
 * Clear all redundant data to avoid posting large amount of data
 * @param routine
 */
function sanitizeRoutine(routine) {
	/*$.each(routine, function (property, value) {
		if (property != 'id' && property != 'exercises' && property != 'name' && property != 'description' && property != '_type' && property != '_descr1' && property != '_descr2')
			delete routine[property];
	});*/
	
	if (undefToEmpty(routine.exercises, []).length > 0) {
		$.each(routine.exercises, function (index, exercise) {
			$.each(exercise, function (property, value) {
				if ((property.substr(0, 9) == 'exercise_' && property != 'exercise_id') || (property.substr(0, 8) == 'routine_' && property != 'routine_id'))
					delete exercise[property];
			});
		});
	}
}

$(document).bind('mobileinit', function() {
    $.mobile.pushStateEnabled = false;
    if (navigator.userAgent.match(/(Android)/))	// fix Android transition
    	$.mobile.defaultPageTransition = 'none';
    $.mobile.transitionFallbacks.slide = 'none';
});

var routinesPage = (function routinesPage() {	// routinesPage namespace

var timerId = 0;
var doingList = false;
var htmlOld = '//////////////';
var scrollPos = 0;
var isBack = false;

$('#routinesPage').live('pagecreate', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	var tab = undefToEmpty(params['tab'], lastTab());
	// select mode parameters
	var selectMode = val(undefToEmpty(params['select_mode'], 0));
	var trainingMode = val(undefToEmpty(params['training_mode'], 0));
	var returnUri = strurldec(undefToEmpty(params['return_uri']));
	
	$(this).find('[data-role="header"] [data-tab="'+tab+'"] a').addClass('ui-btn-active');
	
	// add params to tab links
	$(this).find('[data-role="header"] [data-tab] a').each(function () {
		var href = $(this).attr('href');
		// fix link to same page issue
		href += '&ts='+(new Date().getTime());
		// keep select mode parameters
		href += '&select_mode='+selectMode;
		href += '&training_mode='+trainingMode;
		href += '&return_uri='+strurl(returnUri);
		// apply new href
		$(this).attr('href', href);
	});
	
	// Actions: save selected tab in storage to use next time this page opens
	$(this).find('[data-role="header"] [data-tab]').click(function() {
		tab = $(this).data('tab');
		storage.setItem('routinesPage.lastTab', tab);
	});
	
	// select mode header (select and return routine ID)
	if (selectMode) {
		$(this).find('[data-role="header"] > a').hide();
		$(this).find('[data-role="header"] h1').removeClass('hasback');
		$(this).find('[data-role="header"] h1').text("Seleziona scheda allenamento");
		$(this).find('[data-role="header"] h1').after('<a href="'+returnUri+(returnUri.indexOf('?')>0?'&':'?')+'routine_local_id=0" data-role="button" data-icon="back" class="ui-btn-right cancel_select">Annulla</a>');
	}
	// training mode header (hide add button and change title: select a routine to start training time)
	if (trainingMode) {
		$(this).find('[data-role="header"] > a.add').hide();
		$(this).find('[data-role="header"] h1').text("Seleziona scheda allenamento");
	}
});

$('#routinesPage').live('pageinit', function(event) {
	// start sync if not started
	if (!sync.started)
		sync.start();
});

$('#routinesPage').live('pagebeforeshow', function(event, data) {
	isBack = (data.prevPage.attr('id') == 'routinePage');
});

$('#routinesPage').live('pageshow', function(event) {
	var params = getUrlVars();
	tab = undefToEmpty(params['tab'], lastTab());
	
	// if first sync, wait to be sync
	if (sync.isOnline() && !sync.hasData) {
		showLoading();
		var intervalId = setInterval(function () {
			if (sync.hasData) {
				clearInterval(intervalId);
				doList();
			}
		}, 100);
	} else {
		doList(tab);
	}
	
});

$('#routinesPage ul.routines').live('click', function(event) {
	scrollPos = $(document).scrollTop();
});

$('#routinesPage .add').live('click', function(event) {
	storage.setItem('routinesPage.lastTab', 'created');
	
	// free: possibile creare solo 1 scheda personalizzata
	checkAddRoutineProOnly(function (canAdd) {
		if (canAdd)
			$.mobile.changePage('routine_edit.html?local_id=0');
	});
	
	return false;
});

$('#routinesPage').live('pageremove', function(event) {
	// ferma timer e resetta variabili
	clearInterval(timerId);
	timerId = 0;
	doingList = false;
	htmlOld = '//////////////';
});

function doList(tab, refresh) {
	if (refresh == undefined)
		refresh = false;
	
	if (doingList)
		return;
	
	doingList = true;
	//console.log('doList');
	
	var params = getUrlVars();
	tab = undefToEmpty(params['tab'], lastTab());
	
	if (!refresh) {
		setTimeout(function () {
			showLoading();
		}, 0);
	}
	
	setTimeout(function () {
		// prep routines and fill list
		cc.getList('routines', {order: 'local_id DESC', where: function (item) {return item._type == tab && !undefToEmpty(item.deleted, false);}, orderBy: function (item) {return item._type == 'fitnessitaly' ? item.name : null } }, function (routines) {
			cc.getList('exercises', {}, function (exercises) {
				var html = '';
				if (routines.length > 0) {
					$.each(routines, function (index, routine) {
						var image = routine._image_small;
						if (routine.exercises.length > 0) {
							var exercise = cc.linqFilter(exercises, {where: function (item) {return item.id == routine.exercises[0].exercise_id} });
							if (exercise.length > 0)
								image = exercise[0]._image_small;
						}
						routine._image = image;
						html += htmlRoutine(routine);
					});
				} else {
					html += '<li class="noresults"><p>Nessuna scheda presente in questa lista.</p></li>';
				}
				
				if (html != htmlOld) {
					activeContent('ul.routines').html(html);
					activeContent('ul.routines').listview('refresh');
					activeContent('ul.routines').show();
					activeContent("img").error(function(){
						$(this).attr("src", "img/missing_small.png");
					});
					htmlOld = html;
				}
				if (!refresh) {
					timerId = setInterval(function () {doList(tab, true);}, 5000);
					if (isBack)
						$(document).scrollTop(scrollPos);	// restore scroll pos
				}
				hideLoading();
				doingList = false;
			});
		});
	}, 100);
	
	// DB TEST
	//var exercise = {id: 1, campo1: 'a', campo2: 'b', campo3: 'c'};
	//cc.save('exercises', exercise, function() { alert("OK!"); });
	
	//var exercises = [{id: 1, campo1: 'a1', campo2: 'b1', campo3: 'c1'}, {id: 2, campo1: 'a2', campo2: 'b2', campo3: 'c2'}, {id: 3, campo1: 'a3', campo2: 'b3', campo3: 'c3'}];
	//cc.saveList('exercises', exercises, function () { alert("YEAH!"); });
	
	//cc.getList('exercises', {where: function(item) {return item.campo1 == 'a1' || item.campo1 == 'a2'; }, orderByDesc: function(item) {return item.campo1 } }, function (exercises) {
	//	console.log(exercises);
	//});
	
	//cc.get('exercises', {local_id: 1}, function (exercise) {
	//	console.log(exercise);
	//});
}

function htmlRoutine(routine) {
	var params = getUrlVars();
	// select mode parameters
	var selectMode = val(undefToEmpty(params['select_mode'], 0));
	var trainingMode = val(undefToEmpty(params['training_mode'], 0));
	var returnUri = strurldec(undefToEmpty(params['return_uri']));
	
	// Build HTML for the single routine item
	var html = '<li>';
	if (selectMode)	// select mode
		html += '<a href="'+returnUri+(returnUri.indexOf('?')>0?'&':'?')+'routine_local_id='+routine.local_id+'">';
	else	// standard: open routine exercises
		html += '<a href="routine.html?local_id='+routine.local_id+'&training_mode='+trainingMode+'">';
	
	html += '<img src="'+routine._image+'">';
	html += '<h2>'+routine.name+'</h2>';
	
	if (routine.post) {
		html += '<p>';
		html += '	<em>Sincronizzazione in corso...</em>';
		html += '</p>';
	} else {
		if (routine._descr1)
			html += '<p class="descr1">'+routine._descr1+'</p>';
		if (routine._descr2)
			html += '<p class="descr2">'+routine._descr2+'</p>';
	}
	
	html += '</a>';
	html += '</li>';
	
	return html;
}

function lastTab() {
	return storage.getItem('routinesPage.lastTab') ? storage.getItem('routinesPage.lastTab') : 'fitnessitaly';
}

})();	// routinesPage namespace end

/**
 * Cache system
 */

var cc = new function Cache() {
	
	if (db.webDbImplemented()) {
	
		// Open database
		db.open("Fitnessitaly", "Fitnessitaly", "", 1024 * 1024);
		
		// First creation
		if (db.version() == "") {
			// Full database creation
			var sql = [
	   			"CREATE TABLE eqcategories (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"
	   			, "CREATE TABLE equipments (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"
	   			, "CREATE TABLE musclegroups (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"
	   			, "CREATE TABLE exercises (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"
	   			, "CREATE TABLE routines (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"
	   			, "CREATE TABLE users (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"
	   			, "CREATE TABLE statparams (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"
	   			, "CREATE TABLE statdays (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"
	   			, "CREATE TABLE stats (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"
	   		];
			db.changeVersion("", "3", sql,
					function() { }, function(err) { alert("Error in database creation: "+err.message); } );
		
		} else {
		
			// Upgrade database (database diff)
			var sqlVers = [
				{ver: "1", sql: "CREATE TABLE eqcategories (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"}
				, {ver: "1", sql: "CREATE TABLE equipments (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"}
				, {ver: "1", sql: "CREATE TABLE musclegroups (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"}
				, {ver: "1", sql: "CREATE TABLE exercises (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"}
				, {ver: "1", sql: "CREATE TABLE routines (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"}
				, {ver: "2", sql: "CREATE TABLE users (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"}
				, {ver: "3", sql: "CREATE TABLE statparams (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"}
				, {ver: "3", sql: "CREATE TABLE statdays (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"}
				, {ver: "3", sql: "CREATE TABLE stats (local_id INTEGER PRIMARY KEY, id INTEGER, data TEXT, post INTEGER)"}
			];
			db.upgrade(sqlVers, function() { }, function(err) { alert("Error in database upgrade: "+err.message); } );
		}
	}
	
	/**
	 * Insert/Update a row
	 */
	this.save = function(table, item, onSaved) {
		if (item.id == undefined) item.id = 0;
		if (item.local_id == undefined) item.local_id = 0;
		if (item.post == undefined) item.post = false;	// if true, post to server
		
		db.query("SELECT * FROM "+table+" WHERE id = "+item.id, function(tx, results) {	// get Local ID from ID (query also if not necessary to simplify the procedure layout)
			if (!item.local_id && item.id) {
				if (results.rows.length > 0)
					item.local_id = results.rows.item(0).local_id;
			}
			
			// execute command
			var sql = "INSERT OR REPLACE INTO "+table+" (local_id, id, data, post)";
			sql += " VALUES ("+(item.local_id ? item.local_id : 'NULL')+", "+item.id+", "+strsql($.toJSON(item))+", "+(item.post ? 1 : 0)+")";
			db.execute(sql, function() {
				if (typeof(onSaved) == "function")
					onSaved(); 
			}, cc._execError);
		}, cc._execError);
	}
	
	
	/**
	 * Insert/Update one or more rows (recursive to consider async response)
	 */
	this.saveList = function(table, items, onSaved, i) {
		if (i == undefined) i = 0;
		
		if (i < items.length) {
			cc.save(table, items[i], function () {
				cc.saveList(table, items, onSaved, i+1);
			});
		} else {
			if (typeof(onSaved) == "function")
				onSaved(); 
		}
	}
	
	/**
	 * Get a row
	 */
	this.get = function(table, filter, onResult) {
		cc.getList(table, filter, function (items) {
			var item = null;
			if (items.length > 0)
				item = items[0];
			
			onResult(item);
		});
	}
	
	/**
	 * Get rows
	 */
	this.getList = function(table, filter, onResult) {
		if (filter == undefined) filter = {};
		
		var sql = "SELECT * FROM "+table;
		
		sql += " WHERE 1=1";
		if (filter.local_id != undefined)
			sql += " AND local_id = "+filter.local_id;
		if (filter.id != undefined)
			sql += " AND id = "+filter.id;
		if (filter.post != undefined)
			sql += " AND post = "+(filter.post ? 1 : 0);
		
		if (filter.order)	// order
			sql += " ORDER BY "+filter.order;
		
		db.query(sql, function(tx, results) {
			var items = [];
			
			for (i = 0; i < results.rows.length; i++) {
				var item = $.evalJSON(results.rows.item(i).data);
				item.id = results.rows.item(i).id;
				item.local_id = results.rows.item(i).local_id;
				item.post = results.rows.item(i).post ? true : false;
				items.push(item);
			}
			
			// apply linq extra filters
			items = cc.linqFilter(items, filter);
			
			if (typeof(onResult) == "function")
				onResult(items);
		
		}, cc._queryError);
	}
	
	/**
	 * Apply LINQ filters (where, orderBy, orderByDesc)
	 */
	this.linqFilter = function(items, filter) {
		// apply linq filters
		if (filter.where != undefined || filter.orderBy != undefined || filter.orderByDesc != undefined) {
			var linqItems = JSLINQ(items);
			if (filter.where != undefined)
				linqItems = linqItems.Where(filter.where);
			if (filter.orderBy != undefined)
				linqItems = linqItems.OrderBy(filter.orderBy);
			if (filter.orderByDesc != undefined)
				linqItems = linqItems.OrderByDescending(filter.orderByDesc);
			
			items = linqItems.items;
		}
		
		return items;
	}
	
	this.remove = function(table, filter, onDeleted) {
		if (filter == undefined) filter = {};
		if (filter.local_id == undefined) filter.local_id = 0;
		if (filter.id == undefined) filter.id = 0;
		
		var sql = "DELETE FROM "+table;
		
		if (filter.local_id || filter.id) {
			sql += " WHERE";
			if (filter.local_id)
				sql += " local_id = "+filter.local_id;
			else
				sql += " id = "+filter.id;
		}
		
		db.execute(sql, function() { 
			if (typeof(onDeleted) == "function")
				onDeleted();
		}, cc._execError);
	}
	
	this.reset = function(onEmpty) {
		var sqls = [
			"DELETE FROM eqcategories"
			, "DELETE FROM equipments"
			, "DELETE FROM musclegroups"
			, "DELETE FROM exercises"
			, "DELETE FROM routines"
			, "DELETE FROM users"
			, "DELETE FROM statparams"
			, "DELETE FROM statdays"
			, "DELETE FROM stats"
		];
		db.execute(sqls, function() {
			if (typeof(onEmpty) == "function")
				onEmpty(); 
		}, cc._execError);
	}
	
	
	this._execError = function(err) {
		//alert("Error in executing SQLite command: "+err.message);
		console.log("Error in executing SQLite command: "+err.message);
	}
	
	this._queryError = function(tx, err) {
		//alert("Error in executing SQLite query: "+err.message);
		console.log("Error in executing SQLite query: "+err.message);
	}
}



var setPage = (function setPage() {	// setPage namespace

$('#setPage').live('pagecreate', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	set_index = parseInt(undefToEmpty(params['set_index']), 10);
	
	$(this).find('[data-role="header"] h1').text('Serie '+(set_index+1));
	
	// Back to routine_exercise (
	$(this).page().find('[data-rel="back"]').click(function() {
		back(routine_local_id, routine_exercise_index, set_index);
		return false;
	});
});

$('#setPage').live('pageshow', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	routine_local_id = undefToEmpty(params['routine_local_id']);
	routine_exercise_index = undefToEmpty(params['routine_exercise_index']);
	set_index = undefToEmpty(params['set_index']);
	
	showLoading();
	
	cc.get('routines', {local_id: routine_local_id}, function (routine) {
		var exercise_id = routine.exercises[routine_exercise_index].exercise_id;
		cc.get('exercises', {id: exercise_id}, function (exercise) {
			var sets = routine.exercises[routine_exercise_index].sets;
			var set = sets[set_index] ? sets[set_index] : new Object();	// consider new sets
			var variableParams = exercise._variable_params;
			var fixedParams = exercise._fixed_params;
			var html = '';
			
			// new set: hide delete
			if (sets[set_index] == undefined) {
				activeContent('.delete').hide();
			}
			
			// variable
			$.each(variableParams, function (paramId, paramName) {
				html += '<div data-role="fieldcontain">';
				html += '	<label for="params['+paramId+']">'+paramName+'</label>';
				html += '	<input data-id="'+paramId+'" name="params['+paramId+']" id="params['+paramId+']" placeholder="" value="'+undefToEmpty(set[paramId])+'" type="'+(isPhonegap()?'number':'text')+'">';
				html += '</div>';
			});
			
			// fixed
			html += '<div data-role="fieldcontain">';
			html += '	<label for="params[wait]">'+fixedParams['wait']+'</label>';
			html += '	<input data-id="wait" name="params[wait]" id="params[wait]" placeholder="" value="'+undefToEmpty(set['wait'], 60)+'" type="'+(isPhonegap()?'number':'text')+'">';
			html += '</div>';
			
			html += '<div data-role="fieldcontain">';
			html += '	<label for="params[notes]">'+fixedParams['notes']+'</label>';
			html += '	<textarea data-id="notes" name="params[notes]" id="params[notes]" placeholder="">'+undefToEmpty(set['notes'])+'</textarea>';
			html += '</div>';
			
			activeContent('form').html(html);
			activeContent().trigger('create');
			activeContent('form textarea').trigger('keyup');	// autogrow
			
			hideLoading();
		});
	});
	
	// Actions
	activePage('.save').click(function () {
		save(routine_local_id, routine_exercise_index, set_index);
	});
	activePage('.confirm_delete').click(function () {
		remove(routine_local_id, routine_exercise_index, set_index);
	});
	activePage('.cancel_delete').click(function () {
		$('#setDelete').popup('close');
	});
});

function save(routine_local_id, routine_exercise_index, set_index) {
	showLoading();
	
	var set = new Object();	// Object instead of assoc array for correct JSON ser.
	activeContent('form input, form textarea').each(function () {
		var paramId = $(this).data('id');
		var value = $(this).val();
		set[paramId] = value;
	});
	
	cc.get('routines', {local_id: routine_local_id}, function (routine) {
		routine.exercises[routine_exercise_index].sets[set_index] = set;
		routine.exercises[routine_exercise_index].post = true;
		routine.post = true;
		cc.save('routines', routine, function () {
			// back to sets
			back(routine_local_id, routine_exercise_index, set_index);
		});
	});
	
	return false;
}

function remove(routine_local_id, routine_exercise_index, set_index) {
	showLoading();
	
	cc.get('routines', {local_id: routine_local_id}, function (routine) {
		routine.exercises[routine_exercise_index].sets.splice(set_index, 1);
		routine.exercises[routine_exercise_index].post = true;
		routine.post = true;
		//console.log(routine.exercises[routine_exercise_index].sets);
		cc.save('routines', routine, function () {
			// back to sets
			back(routine_local_id, routine_exercise_index, set_index);
		});
	});
}

function back(routine_local_id, routine_exercise_index, set_index) {
	var params = getUrlVars();
	var trainingMode = val(undefToEmpty(params['training_mode'], 0));
	
	var backParams = 'routine_local_id='+routine_local_id+'&routine_exercise_index='+routine_exercise_index+'&tab=sets&set_index='+set_index+'&training_mode='+trainingMode;
	$.mobile.changePage('routine_exercise.html?'+backParams);
}

})();	// setPage namespace end

var sync = new function Sync() {
	
	this._userId = '';
	this._userIdEnc = '';
	this._lastSync = '';
	
	this.executingGetData = false;
	this.executingPostData = false;
	
	this._timerId = 0;
	this.started = false;
	this.hasData = false;
	
	this.start = function() {
		// sync every x seconds
		this.postGetData();
		if (!this.started) {
			this._timerId = setInterval(function() { sync.postGetData(); }, syncInterval*1000);
			// sync started
			this.started = true;
		}
	}
	
	this.stop = function() {
		clearInterval(this._timerId);
		this.started = false;
	}
	
	this.fetchSettings = function() {
		this._userId = storage.getItem("userId");
		this._userIdEnc = storage.getItem("userIdEnc");
		this._lastSync = storage.getItem("lastSync");
	}
	
	// All in One
	this.postGetData = function(onSaved) {
		if (!sync.isOnline() || sync.executing())
			return;
		
		sync.executingPostData = true;
		
		console.log("sync.postGetData");
		
		setTimeout(function() {	// rilascia thread per visualizzazione icona sync
		
			// init connection variables
			sync.fetchSettings();
			
			try
			{
				var params = {
						user_id: sync._userId,
						user_id_enc: sync._userIdEnc,
						last_sync: sync._lastSync
				};
				
				var actionUrl = getServiceAction('post_data');
				
				params.tables = new Object();	// Object instead of assoc array for correct JSON ser.
				cc.getList('routines', {post: true}, function (routines) {
				cc.getList('statdays', {post: true}, function (statdays) {
				cc.getList('stats', {post: true}, function (stats) {
					params.tables['routines'] = routines;
					params.tables['statdays'] = statdays;
					params.tables['stats'] = stats;
					// (other tables here...)
					
					// 2.0.0 fix too much vars in tables (official server doesn't response): table to json
					params.tables = $.toJSON(params.tables);
					
					if (routines.length > 0 || statdays.length > 0) {
						console.log("post!");
					}
					// TO DEBUG SERVER SIDE: 
					//console.log('http://127.0.0.1:8080/fitnessitaly/service/webservice?key=fititaly2013mobapp&app_version=2.0.0&action=post_data&'+$.param(params));	// to debug post_data server side
					sync.executingGetData = true;	// stop getData till local rows update
					$.post(actionUrl, params, function(response) {
						var response = $.parseJSON(response);
						if (!response.error) {	// update with response rows (set server ids for new rows and update rows with server processed fields)
							sync._recursiveSave(response.tables, function () {
								sync._recursiveDelete(response.deleted, function () {
									// Saved!
									storage.setItem("lastSync", response.lastSync);
									sync.hasData = true;
									sync.executingGetData = false;	// restart getData
									if (typeof(onSaved) == "function")
										onSaved();
								});
							});
						} else {
							msgAlert(response.errorMsg);
							sync.executingGetData = false;	// restart getData
						}
					}).fail(function() {
						sync.executingGetData = false;
					}).always(function() {
						sync.executingPostData = false;
					});
					
				});	// table stats
				});	// table statdays
				});	// table routines
				
			}
			catch(err)
			{
				sync.executingGetData = false;
				sync.executingPostData = false;
			}
		
		}, 500);
	}
	
	this._recursiveSave = function(tables, onComplete, i) {
		if (i == undefined)
			i = 0;
		
		if (i < Object.keys(tables).length) {
			var index = 0;
			$.each(tables, function (table, rows) {
				if (index == i) {
					//console.log(table);
					cc.saveList(table, rows, function () {
						sync._recursiveSave(tables, onComplete, i+1);
					});
				}
				index++;
			});
		} else {
			if (typeof(onComplete) == "function")
				onComplete(); 
		}
	}
	
	this._recursiveDelete = function(deleted, onComplete, i) {
		if (i == undefined)
			i = 0;
		
		if (i < Object.keys(deleted).length) {
			var index = 0;
			$.each(deleted, function (index, toDelete) {
				if (index == i) {
					//console.log(table);
					cc.remove(toDelete.table, {id: toDelete.row_id}, function () {
						sync._recursiveDelete(deleted, onComplete, i+1);
					});
				}
				index++;
			});
		} else {
			if (typeof(onComplete) == "function")
				onComplete(); 
		}
	}
	
	this.isOnline = function() {
		if (navigator.network == undefined)	// web app
			return true;
		
		if (navigator.network.connection.type != Connection.NONE)	// phonegap
			return true;

		return false;
	}
	
	this.executing = function() {
		return this.executingGetData || this.executingPostData;
	}
	
}


var statdayStatparamPage = (function statdayStatparamPage() {	// statdayStatparamPage namespace

$('#statdayStatparamPage').live('pagecreate', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	var day = val(undefToEmpty(params['day']));	// js timestamp
	
	var date = new Date(day);
	
	// title
	$(this).find('[data-role="header"] h1').text(date.format('dddd d mmmm yyyy'));
	
	// add params to add_routine link
	$(this).find('[data-role="content"] a.set_statparams, [data-role="content"] a.show_graph').each(function () {
		var href = $(this).attr('href');
		// return here (select_mode=1 parameter already appended in static page)
		href += (href.indexOf('?')>0?'&':'?')+'return_uri='+strurl('statday_statparam.html?day='+day)+'&day='+day;
		// apply new href
		$(this).attr('href', href);
	});
});

$('#statdayStatparamPage').live('pageinit', function(event) {
});

$('#statdayStatparamPage').live('pagebeforeshow', function(event) {
});

$('#statdayStatparamPage').live('pageshow', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	var day = val(undefToEmpty(params['day']));	// js timestamp
	
	var date = new Date(day);
	
	showLoading();
	cc.getList('stats', {where: function (item) { return item.day == date.format('yyyy-mm-dd') && item.param_type == 'statparam' && !undefToEmpty(item.deleted); } }, function (stats) {
		var count = stats.length;
		if (count == 0)
			activeContent('.n_statparams_msg').text("Nessun parametro impostato");
		else
			activeContent('.n_statparams_msg').text(count + " " + (count == 1 ? "parametro impostato" : "parametri impostati"));
		activeContent('.n_statparams_msg').show();
		hideLoading();
	});
});

$('#statdayStatparamPage').live('pageremove', function(event) {
});

$('#statdayStatparamPage .delete_mode').live('click', function() {
});
$('#statdayStatparamPage .delete_mode_end').live('click', function() {
});
$('#statdayStatparamPage ul.statday_routines li a').live('click', function () {
});

})();	// statdayStatparamPage namespace end

var statparamsPage = (function statparamsPage() {	// statparamsPage namespace

$('#statparamsPage').live('pagecreate', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	var day = val(undefToEmpty(params['day']));
	var returnUri = strurldec(undefToEmpty(params['return_uri']));
	
	var date = new Date(day);
	
	// title
	$(this).find('[data-role="header"] h1').text('Misurazioni '+date.format('ddd d mmm yyyy'));
	
	if (returnUri)
		$(this).find('[data-role="header"] a.back').attr('href', returnUri);
});

$('#statparamsPage').live('pageinit', function(event) {
});

$('#statparamsPage').live('pagebeforeshow', function(event) {
	activeContent('[data-tab-content="v"]').show();
	activeContent('[data-tab-content="m"]').hide();
	activeContent().hide();
});

$('#statparamsPage').live('pageshow', function(event) {
	var params = getUrlVars($(this).attr('data-url'));
	var day = val(undefToEmpty(params['day']));
	
	var date = new Date(day);
	
	// tabs
	activePage('[data-role="navbar"] [data-tab]').click(function () {
		var tab = $(this).data('tab');
		activeContent('[data-tab-content]').hide();
		activeContent('[data-tab-content="'+tab+'"]').show();
		$(document).scrollTop(0);
	});
	
	showLoading();
	// get all available statparams
	cc.getList('statparams', {order: 'id'}, function (statparams) {
	// get statparams already set this day
	cc.getList('stats', {where: function (item) { return item.day == date.format('yyyy-mm-dd') && item.param_type == 'statparam'; } }, function (stats) {
		var html = new Object();	// assoc. array by object
		html['v'] = '';
		html['m'] = '';
		// foreach available statparams, print the field with the value (if set) or empty
		$.each(statparams, function (index, statparam) {
			// check if user already set a value for this parameter this day
			var value = '';
			var statsFilter = cc.linqFilter(stats, {where: function (item) { return item.param_id == statparam.id; } });
			if (statsFilter.length > 0)
				value = (val(statsFilter[0].value, 2)+'').replace(/\./g, ',');	// italian decimal point (. to ,)
			// print the field
			var section = statparam.section;	// v or m
			html[section] += '<div data-role="fieldcontain">';
			html[section] += '	<label for="statparams['+statparam.id+']">'+statparam.name + (statparam.unit !='' ? ' ('+statparam.unit+')' : '') + '</label>';
			html[section] += '	<input data-id="'+statparam.id+'" name="params['+statparam.id+']" id="params['+statparam.id+']" placeholder="" value="'+value+'" type="'+(isPhonegap()?'number':'text')+'">';
			html[section] += '</div>';
		});
		
		$.each(html, function (section, htmlSection) {
			activeContent('form [data-tab-content="'+section+'"]').append(htmlSection);
		});
		activeContent().trigger('create');
		activeContent('form textarea').trigger('keyup');	// autogrow
		hideLoading();
		activeContent().show();
	});	// close getList statparams
	});	// close getList stats
	
	// Actions
	activePage('.save').click(function () {
		save(day);
	});
});

$('#statparamsPage').live('pageremove', function(event) {
});

function save(day) {
	var params = getUrlVars($(this).attr('data-url'));
	var returnUri = strurldec(undefToEmpty(params['return_uri']));
	
	var date = new Date(day);
	
	showLoading();
	
	// get this day statparams values from stats
	cc.getList('stats', {where: function (item) { return item.day == date.format('yyyy-mm-dd') && item.param_type == 'statparam' && !undefToEmpty(item.deleted); } }, function (stats) {
		
		// create/update compiled params rows
		var set = new Object();	// Object instead of assoc array for correct JSON ser.
		activeContent('form input, form textarea').each(function () {
			var paramId = $(this).data('id');
			var value = $(this).val().replace(/,/g, '.');
			console.log(value)
			if (value != '' && !isNaN(value)) {
				value = val(value, 2);
				var stat = null;
				var statsFilter = cc.linqFilter(stats, {where: function (item) { return item.param_id == paramId; } });
				if (statsFilter.length > 0) {
					stat = statsFilter[0];
				} else {
					stat = new Object();
					stats.push(stat);	// add to stats loaded
					stat.day = date.format('yyyy-mm-dd');
					stat.exercise_id = 0;
					stat.param_type = 'statparam';
					stat.param_id = paramId;
				}
				stat.value = value;
				stat.post = true;
			}
		});
		
		// delete not compiled parameters
		$.each(stats, function (index, stat) {
			// check if this parameter has a value
			var value = null;
			var value = $('form input[data-id="'+stat.param_id+'"], form textarea[data-id="'+stat.param_id+'"]').val().replace(/,/g, '.');
			if (value == '' || isNaN(value)) {
				stat.deleted = 1/*true*/;
				stat.post = true;
			}
		});
		
		// Save all changes
		cc.saveList('stats', stats, function () {
			sync.postGetData();	// force sync now
			hideLoading();
			$.mobile.changePage(returnUri);
		});
	});
	
	return false;
}

function getValue() {
	
}

})();	// statparamsPage namespace end
