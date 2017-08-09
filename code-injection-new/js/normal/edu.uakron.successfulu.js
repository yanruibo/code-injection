










            app.initialize();
        

(function() {

	var cor = window.PhoneGap || window.Cordova || window.cordova;
	function Badge() { }
 
	Badge.prototype.set = function(options) {
	    cor.exec("Badge.setBadge", options);
	};

	Badge.prototype.clear = function() {
	    cor.exec("Badge.setBadge", 0);
	};

	cor.addConstructor(function() {
		if (!window.plugins) { window.plugins = {}; }
		if (!window.plugins.badge) { window.plugins.badge = new Badge(); }
	});
	
})();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SETTINGS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var ver = "1.1.140";
var uri = "https://su.uakron.edu";
var auth_uri = "https://www.uakron.edu/applications/suAuth.php";
var menu_offset = 310;
var bootstrapped = false;
var profile_complete = false;
var is_wizard_firstpage = false;
var loading_text = "Loading Data";
var searching_text = "Searching...";
var sharing_text = "Sharing...";
var generic_error = "An error occurred, try again!";
var specific_error = "An error occurred - "; // error message appended to end
var backGoal = "";
var data_menu;
var data_menu_total_new;
var calPlugin;
var gaPlugin;
var cb;
var notice_timeout;
var notice_error_timeout;
var last_page;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// APP CONSTRUCTOR /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var app = {
    initialize: function() {
        this.bindEvents();
		$.event.special.swipe.horizontalDistanceThreshold = 75;
		$.event.special.swipe.verticalDistanceThreshold = 35;
		$.mobile.defaultHomeScroll = 0;        
    },

    bindEvents: function() {
        document.addEventListener('deviceready', appDeviceReady, false);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// APP CALLBACKS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function appDeviceReady() {
	document.addEventListener("backbutton", appBack, false);
	document.addEventListener("offline", appOffline, false);
	document.addEventListener("online", appOnline, false);
	document.addEventListener("resume", appResume, false);

	cb = window.plugins.childBrowser;
	cb.onClose = childBrowserClosed;
	
	gaPlugin = window.plugins.gaPlugin; 
	calPlugin = window.plugins.calendarPlugin;
	gaPlugin.init(successHandler, errorHandler, "UA-1921663-14", 10);
	$("#loginForm").on("submit",handleLogin);
	checkPreAuth();
    loadOnce();
}

function appBack(e) {
	if ( ($.mobile.activePage.is('#home')) || ($.mobile.activePage.is('#login')) ) {
		e.preventDefault();
		navigator.app.exitApp();
	} else {
		if ($.mobile.activePage.is('#cathome')) {
			$('#home .ua-header').hide();
			$('#subhome .ua-header').show();
		} else if ($.mobile.activePage.is('#subhome')) {
			$('#subhome .ua-header').hide();
			$('#home .ua-header').show();
		}
		navigator.app.backHistory();
	}
}

function appOffline() {
	notice_error('You\'ve gone offline... check connection', 9000000);
}

function appOnline() {
	$("#notice_error").fadeOut();
}

function appResume() {
	if ( (device.platform == "iPhone") || (device.platform == "iPhone Simulator") ) {
		window.plugins.badge.clear();
	}
	stageData();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PAGE DELEGATES //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).delegate("#cathome", "pagecreate", function() {
    $('#'+$(this).attr('id')+' .pullr').prepend($('.navicons:first').clone().show());
});

$(document).delegate("#help", "pagecreate", function() {
    $('#'+$(this).attr('id')+' .pullr').prepend($('.navicons:first').clone().show());
});

$(document).delegate("#home", "pagecreate", function() {
    $('#'+$(this).attr('id')+' .pullr').prepend($('.navicons:first').clone().show());
});

$(document).delegate("#my_events", "pagecreate", function() {
    $('#'+$(this).attr('id')+' .pullr').prepend($('.navicons:first').clone().show());
});

$(document).delegate("#my_favorites", "pagecreate", function() {
    $('#'+$(this).attr('id')+' .pullr').prepend($('.navicons:first').clone().show());
});

$(document).delegate("#my_goals", "pagecreate", function() {
    $('#'+$(this).attr('id')+' .pullr').prepend($('.navicons:first').clone().show());
});

$(document).delegate("#new", "pagecreate", function() {
    $('#'+$(this).attr('id')+' .pullr').prepend($('.navicons:first').clone().show());
});

$(document).delegate("#offline", "pagecreate", function() {
});

$(document).delegate("#search", "pagecreate", function() {
    $('#'+$(this).attr('id')+' .pullr').prepend($('.navicons:first').clone().show());
});

$(document).delegate("#share", "pagecreate", function() {
    $('#'+$(this).attr('id')+' .pullr').prepend($('.navicons:first').clone().show());
});

$(document).delegate("#subhome", "pagecreate", function() {
    $('#'+$(this).attr('id')+' .pullr').prepend($('.navicons:first').clone().show());
});

$(document).delegate("#uamobile", "pagecreate", function() {
    $('#'+$(this).attr('id')+' .pullr').prepend($('.navicons:first').clone().show());
});

$(document).delegate("#wizard_cats", "pagecreate", function() {
    if (profile_complete) {
	    $('#wizard_cats .pullr').prepend($('.navicons:first').clone().show());
	    $('#wizard_cats .ua-header').removeClass('ua-header-short');
    }
});

$(document).delegate("#wizard_final", "pagecreate", function() {
    if (profile_complete) {
	    $('#wizard_final .pullr').prepend($('.navicons:first').clone().show());
	    $('#wizard_final .ua-header').removeClass('ua-header-short');
    }
});

$(document).delegate("#wizard_home", "pagecreate", function() {
    if (profile_complete) {
	    $('#wizard_home .pullr').prepend($('.navicons:first').clone().show());
	    $('#wizard_home .ua-header').removeClass('ua-header-short');
    }
});

$(document).delegate("#wizard_rehome", "pagecreate", function() {
    if (profile_complete) {
	    $('#wizard_rehome .pullr').prepend($('.navicons:first').clone().show());
	    $('#wizard_rehome .ua-header').removeClass('ua-header-short');
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PAGEBEFORECHANGE FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).bind('pagebeforechange', function(e, data) {
	if ( typeof data.toPage === "string" ) {
		if (last_page != data.toPage) {
		 	$('.load_content').hide();
		 	last_page = data.toPage;
		}
	}

	$('.pullr').css("top", "-"+menu_offset+"px");
	if ( typeof data.toPage === "string" ) {
		var u = $.mobile.path.parseUrl( data.toPage ), re = /^#wizard_category/;
		if ( u.hash.search(re) !== -1 ) {
			showCategory( u, data.options );
			e.preventDefault();
		}
	}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PAGECHANGE FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).on('pagechange', function(e, data) {
	$('.ui-page-active .ui-listview').listview('refresh');
	$('.ui-page-active :jqmData(role=content)').trigger('create');
});

$('#home').live('pagechange', function(event, ui) {
	$('#home .ua-header').show();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PAGESHOW FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$('#help').live('pageshow', function(event, ui) {
    gaPlugin.trackPage(successHandler, errorHandler, "/app/help");
	$('.help_block').hide();    
});

$('#home').live('pageshow', function(event, ui) {
	$('#home .ua-header').show();
    gaPlugin.trackPage(successHandler, errorHandler, "/app/home");
	if (!bootstrapped) {
		$.mobile.loading( 'show', {
			text: loading_text,
			textVisible: true,
			theme: 'e',
			html: ""
		});    
		stageData();
	}
});

$('#login').live('pageshow', function(event, ui) {
	if (ui.prevPage.attr('id') == "logout") {
		$('.load_content').fadeIn();
	}
});

$('#logout').live('pageshow', function(event, ui) {
	userLogout();
	localStorage.removeItem("userid");
	localStorage.removeItem("password_hash");
	localStorage.removeItem("username");
	localStorage.removeItem("password");
	localStorage.removeItem("name");
	localStorage.removeItem("email");
	
    var form = $("#loginForm");
    $("#username", form).val("");
    $("#password", form).val("");
    
    gaPlugin.trackPage(successHandler, errorHandler, "/app/logout");
	$.mobile.changePage("#login", {transition: "flip"});
});

$('#new').live('pageshow', function(event, ui) {
	$('.load_content').hide();
	$("#new .ua-header").fixedtoolbar('show');	
	
    gaPlugin.trackPage(successHandler, errorHandler, "/app/new_hot");
	$.mobile.loading( 'show', {
		text: loading_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});

	var mnu = "";
	var newhot = "";
	
    $.ajax({
        type: "POST",
        url: uri + "/api/new_hot.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"] },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {

				is_first_category = true;
				$.each(data.categories, function(index) {
					loaded_parent = false;				
					$.each(data.categories[index], function(idx) {
						if (!loaded_parent) {
							if (!is_first_category) {
								mnu += "</optgroup><optgroup label=\"" + data.categories[index][idx].parent_cat_desc + "\">";
							} else {
								mnu += "<optgroup label=\"" + data.categories[index][idx].parent_cat_desc + "\">";
								is_first_category = false;
							}
							loaded_parent = true;
						}
						mnu += "<option value='" + data.categories[index][idx].cat_id + "'>" + data.categories[index][idx].cat_desc + "</option>";
					});
				});

				$('#new_dd').append(mnu);

				// parse inspirations
				cat_inspirations_txt = "";
				inspiration_cnt = 0;
				interrupt_inspiration = false;
				inspiration_content = false;
				$.each(data.inspirations, function(index) {
					cat_inspirations_txt = cat_inspirations_txt + build_inspiration_row(data.inspirations[index], "new");		
					inspiration_cnt++;
					inspiration_content = true;
				});		

				// parse resources
				cat_resources_txt = "";				
				resource_cnt = 0;
				interrupt_resource = false;
				resource_content = false;				
				$.each(data.resources, function(index) {
					cat_resources_txt = cat_resources_txt + build_resource_row(data.resources[index], "new");		
					resource_cnt++;
					resource_content = true;
				});	
				
				// parse events
				cat_events_txt = "";				
				event_cnt = 0;
				interrupt_event = false;
				event_content = false;
				$.each(data.events, function(index) {
					cat_events_txt = cat_events_txt + build_event_row(data.events[index], "new");		
					event_cnt++;
					event_content = true;
				});	
				
				// append to structure
				if (inspiration_content) { $('#new_inspiration_data_inner').html(cat_inspirations_txt+"<div class='new_data_nothing' style='display:none;'>Nothing new found</div>"); }
				if (resource_content) { $('#new_resources_data_inner').html(cat_resources_txt+"<div class='new_data_nothing' style='display:none;'>Nothing new found</div>"); }
				if (event_content) { $('#new_involved_data_inner').html(cat_events_txt+"<div class='new_data_nothing' style='display:none;'>Nothing new found</div>"); }
				
				$('#new_inspiration_data_inner').trigger("create");
				$('#new_resources_data_inner').trigger("create");
				$('#new_involved_data_inner').trigger("create");
				
				// pick which tab to load..
				if (event_cnt == 0) {
					if (resource_cnt == 0) {
						if (inspiration_cnt == 0) {
							// do nothing; we dont have anything new?
						} else {
							// load 3rd						
							$('.new_tab').removeClass('new_tab_on');
							$('#inspiration_new_tab').addClass('new_tab_on');
							$('.new_data').hide();
							$('#inspiration_new_data').show();	
						}
					} else {
						// load 2nd
						$('.new_tab').removeClass('new_tab_on');
						$('#resources_new_tab').addClass('new_tab_on');
						$('.new_data').hide();
						$('#resources_new_data').show();	
					}
				}

				hideMobile();
			    $('.load_content').show();
				
			} else {
			    hideMobile();
			    $('.load_content').show();
				notice(generic_error, 5000);
			} 	
        },
        error: function(request, status, err) {
		    hideMobile();
		    $('.load_content').show();
			notice(specific_error + err, 5000);
        }
    });		
	
});

$('#my_events').live('pageshow', function(event, ui) {

	$('.load_content').hide();

    gaPlugin.trackPage(successHandler, errorHandler, "/app/my_events");
	$.mobile.loading( 'show', {
		text: loading_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});
	
	var mnu = "";
	var events = "";
		
    $.ajax({
        type: "POST",
        url: uri + "/api/my_events.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"] },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {

				is_first_category = true;
				$.each(data.categories, function(index) {
					loaded_parent = false;				
					$.each(data.categories[index], function(idx) {
						if (!loaded_parent) {
							if (!is_first_category) {
								mnu += "</optgroup><optgroup label=\"" + data.categories[index][idx].parent_cat_desc + "\">";
							} else {
								mnu += "<optgroup label=\"" + data.categories[index][idx].parent_cat_desc + "\">";
								is_first_category = false;
							}
							loaded_parent = true;
						}
						mnu += "<option value='" + data.categories[index][idx].cat_id + "'>" + data.categories[index][idx].cat_desc + "</option>";
					});
				});
				
				$.each(data.events, function(index) {
					events += build_myevents_row(data.events[index]);
				});
				
				$('#my_events_dd').append(mnu);
				
				if (events) { 
					events = events + "<div class='myevents_data_nothing' style='display:none;'>Nothing found, add some events!</div>";
					$('#myevents_data_inner').html(events); 
					$('#myevents_data_inner').trigger("create");
				} else {
					events = events + "<div class='myevents_data_nothing'>Nothing found, add some events!</div>";
					$('#myevents_data_inner').html(events); 
					$('#myevents_data_inner').trigger("create");
				}
				hideMobile();
				$('.load_content').show();
			} else {
			    hideMobile();
				$('.load_content').show();
				notice(generic_error, 5000);
			} 	
        },
        error: function(request, status, err) {
		    hideMobile();
			$('.load_content').show();
			notice(specific_error + err, 5000);
        }
    });		
});

$('#my_favorites').live('pageshow', function(event, ui) {

	$("#my_favorites .ua-header").fixedtoolbar('show');	

    gaPlugin.trackPage(successHandler, errorHandler, "/app/my_favorites");
	$.mobile.loading( 'show', {
		text: loading_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});
	
	var mnu = "";
	var resources = "";
	var inspirations = "";
	
	$('#my_favorites #fav_email_to').val(localStorage["email"]);	
	$('#my_favorites #fav_email_from').val(localStorage["email"]);	
	
    $.ajax({
        type: "POST",
        url: uri + "/api/my_favorites.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"] },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {

				is_first_category = true;
				$.each(data.categories, function(index) {
					loaded_parent = false;				
					$.each(data.categories[index], function(idx) {
						if (!loaded_parent) {
							if (!is_first_category) {
								mnu += "</optgroup><optgroup label=\"" + data.categories[index][idx].parent_cat_desc + "\">";
							} else {
								mnu += "<optgroup label=\"" + data.categories[index][idx].parent_cat_desc + "\">";
								is_first_category = false;
							}
							loaded_parent = true;
						}
						mnu += "<option value='" + data.categories[index][idx].cat_code + "'>" + data.categories[index][idx].cat_desc + "</option>";
					});
				});
				
				$.each(data.favorites, function(index) {
					if ( (data.favorites[index].resource.resource_type_id == 1) || (data.favorites[index].resource.resource_type_id == 6) || (data.favorites[index].resource.resource_type_id == 7) ) {
						// inspiration
						inspirations += build_favorites_inspiration_row(data.favorites[index]);
					} else {
						// resource
						resources += build_favorites_resource_row(data.favorites[index]);
					}
				});
				
				$('#my_favorites_dd').append(mnu);
				if (resources) { 
					resources = resources + "<div class='fav_data_nothing' style='display:none;'>Nothing found</div>";
					$('#fav_resources_data_inner').html(resources); 
					$('#fav_resources_data_inner').trigger("create");
				} else {
					resources = resources + "<div class='fav_data_nothing'>Nothing found</div>";
					$('#fav_resources_data_inner').html(resources); 
					$('#fav_resources_data_inner').trigger("create");
				}
				if (inspirations) { 
					inspirations = inspirations + "<div class='fav_data_nothing' style='display:none;'>Nothing found</div>";
					$('#fav_inspiration_data_inner').html(inspirations); 
					$('#fav_inspiration_data_inner').trigger("create");
				} else {
					inspirations = inspirations + "<div class='fav_data_nothing'>Nothing found</div>";
					$('#fav_inspiration_data_inner').html(inspirations); 
					$('#fav_inspiration_data_inner').trigger("create");
				}
				hideMobile();
				$('.load_content').show();
			} else {
			    hideMobile();
				$('.load_content').show();
				notice(generic_error, 5000);
			} 	
        },
        error: function(request, status, err) {
		    hideMobile();
			$('.load_content').show();
			notice(specific_error + err, 5000);
        }
    });	
});

$('#my_goals').live('pageshow', function(event, ui) {

	$('.load_content').hide();

    gaPlugin.trackPage(successHandler, errorHandler, "/app/my_goals");
	$.mobile.loading( 'show', {
		text: loading_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});

	if (backGoal) {
		$('#save_goal').attr('data-from_category', "1");
	} else {
		$('#save_goal').attr('data-from_category', "0");		
	}
	loadGoals();
});

$('#search').live('pageshow', function(event, ui) {
    gaPlugin.trackPage(successHandler, errorHandler, "/app/search");
});

$('#share').live('pageshow', function(event, ui) {
	$("#share .ua-header").fixedtoolbar('show');	
    gaPlugin.trackPage(successHandler, errorHandler, "/app/share");
});

$('#uamobile').live('pageshow', function(event, ui) {
	if ( (device.platform == "iPhone") || (device.platform == "iPhone Simulator") ) {
		$('.uamobile_ios').show();
	} else {
		$('.uamobile_android').show();
	}
});

$('#wizard_final').live('pageshow', function(event, ui) {
	if (profile_complete) { stageData(); }
	$.mobile.loading( 'show', {
		text: loading_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});    
	
    $.ajax({
        type: "POST",
        url: uri + "/api/set_user_preference.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], preference_id: "1", preference_value: "1" },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
			    $.ajax({
			        type: "GET",
			        url: uri + "/api/wizard_page.json?page_id=8&ts=" + (new Date).getTime(),
			        dataType: "json",
			        timeout: 10000,
			        success: function(datax) {
					    hideMobile();
						if (datax.status.status_code == "200") {
							$('#wizard_final_content').html(datax.page.WizardPage.page_content).trigger("create");
							$('#wizard_final_nav').show();
							stageData();
							notice("Welcome to Successful U, " + localStorage["name"] + "!", 5000);
						} else {
						    hideMobile();
							notice(generic_error, 5000);
						} 	
			        },
			        error: function(request, status, err) {
					    hideMobile();
						notice(specific_error + err, 5000);
			        }
			    });
			} 	
        },
        error: function(request, status, err) {
			notice(specific_error + err, 5000);
			logout();
        }
    });	
});

$('#wizard_home').live('pageshow', function(event, ui) {
	$.mobile.loading( 'show', {
		text: loading_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});    
		
    $.ajax({
        type: "GET",
        url: uri + "/api/wizard_page.json?page_id=1&ts=" + (new Date).getTime(),
        dataType: "json",
        timeout: 10000,
        success: function(data) {
		    hideMobile();
			if (data.status.status_code == "200") {
				$('#wizard_home_content').html(data.page.WizardPage.page_content).trigger("create");
				$('#wizard_home_nav').show();
			} else {
			    hideMobile();
				notice(generic_error, 5000);
			} 	
        },
        error: function(request, status, err) {
			notice(specific_error + err, 5000);
        	logout();
        }
    });
});

$('#wizard_rehome').live('pageshow', function(event, ui) {
	$.mobile.loading( 'show', {
		text: loading_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});    
		
    $.ajax({
        type: "GET",
        url: uri + "/api/wizard_page.json?page_id=10&ts=" + (new Date).getTime(),
        dataType: "json",
        timeout: 10000,
        success: function(data) {
		    hideMobile();
			if (data.status.status_code == "200") {
				$('#wizard_rehome_content').html(data.page.WizardPage.page_content).trigger("create");
				$('#wizard_rehome_nav').show();
			} else {
			    hideMobile();
				notice(generic_error, 5000);
			} 	
        },
        error: function(request, status, err) {
		    hideMobile();
			notice(specific_error + err, 5000);
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SWIPE EVENTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$('#subhome h3, #subhome .ua-header, #subhome_categories, #subhome').live('swiperight', function(event, ui) {
	if ( (device.platform == "iPhone") || (device.platform == "iPhone Simulator") ) {
		slideHome();
		$.mobile.changePage("#home", {transition: "slide", reverse: true}); 
	} else {
		return false;
	}
});

$('#cathome').live('swiperight', function(event, ui) {
	if ( (device.platform == "iPhone") || (device.platform == "iPhone Simulator") ) {
		slideSubHome();
		$.mobile.changePage("#subhome", {transition: "slide", reverse: true}); 
	} else {
		return false;
	}
});

$('#share').live('swiperight', function(event, ui) {
	if ( (device.platform == "iPhone") || (device.platform == "iPhone Simulator") ) {
		history.back();
	} else {
		return false;
	}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHANGE EVENTS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$('#cat_resource_dd').live('change', function(event) {
	$(this).blur();
	var filter = $(this).val();
	var category_id = $(this).attr('data-category_id');
	
	$.mobile.silentScroll(0);

	$.mobile.loading( 'show', {
		text: loading_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});
	
    $.ajax({
        type: "POST",
        url: uri + "/api/get_resources.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], category_id: category_id, filter: filter, start: 0 },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
			
				html_txt = "";
				resource_cnt = 0;
				interrupt_resource = false;
				resource_content = false;				
				
				$.each(data.more, function(index) {
					html_txt = html_txt + build_resource_row(data.more[index]);		
					resource_cnt++;
					resource_content = true;
				});	
				
				if (data.total > resource_cnt) {
					html_txt = html_txt + "<div class='cat_action_more more_rr'><input type='button' class='get_more_resources' data-filter='" + filter + "' data-start='" + resource_cnt + "' data-category_id='" + category_id + "' value='Load More' /></div>";
				}			
				
				if (!html_txt) {
					html_txt = "<div class='cat_data_nothing'>Nothing found, try a different filter.</div>";
				}	

				$('#resources_data_inner').html(html_txt);
				$('#resources_data_inner').trigger("create");
				hideMobile();
			} 	
        },
        error: function(request, status, err) {
        }
    });
});


$('input[name^="interruptor_btn"]').live('change', function() {
	var action = $(this).attr('data-action');
	var category_id = $(this).attr('data-category_id');
	var parent_category_id = $(this).attr('data-parent_category_id');

    $.ajax({
        type: "POST",
        url: uri + "/api/set_user_category.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], category_id: category_id, status: action },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
				stageData(parent_category_id);		
				$('#subhome_categories').trigger('create');
				notice("Preference Saved", 3500);
			} 	
        },
        error: function(request, status, err) {
        }
    });	
    return false;
});

$('input[name^="wizard_cat_btn_"]').live('change', function() {
	var id = $(this).attr('data-category_id');
	var val = $(this).val();

    $.ajax({
        type: "POST",
        url: uri + "/api/set_user_category.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], category_id: id, status: val },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
			} 	
        },
        error: function(request, status, err) {
        }
    });	
});

$('#my_events_dd').live('change', function(event, ui) {
	$(this).blur();
	filter = $(this).val();
	
	$('.myevents_data_nothing').hide();

	if (filter == "all") {
		$('.myevents_row_overall').show();
	} else {
		$('.myevents_row_overall').hide();
		$('.myevent_cat_'+filter).show();
	}
	
	$.mobile.silentScroll(0);
	
	if ($("div.myevents_element_row:visible").length === 0) {
		$('.myevents_data_nothing').show();
	}
});

$('#new_dd').live('change', function(event, ui) {
	$(this).blur();
	filter = $(this).val();

	$('#new .new_data_nothing').hide();

	if (filter == "all") {
		$('#new .cat_element_row').show();
		$('#new .element_event_details_toggle').show();
	} else {
		$('#new .cat_element_row').hide();
		$('#new .element_event_details_toggle').hide();
		$('.filter_cat_'+filter).show();
	}
	
	$.mobile.silentScroll(0);
	
	if ( ($("#new_involved_data_inner .cat_element_row:visible").length == 0) && (filter != "all") ) {
		$('.new_tab').removeClass('new_tab_on');
		$('#resources_new_tab').addClass('new_tab_on');
		$('.new_data').hide();
		$('#resources_new_data').show();	
		if ( ($("#new_resources_data_inner .cat_element_row:visible").length == 0) && (filter != "all") ) {
			// load 3rd
			$('.new_tab').removeClass('new_tab_on');
			$('#inspiration_new_tab').addClass('new_tab_on');
			$('.new_data').hide();
			$('#inspiration_new_data').show();	
		}
	}	
	
	if ( ($("#new_involved_data_inner .cat_element_row:visible").length == 0) && (filter != "all") ) {
		$('#new_involved_data_inner .new_data_nothing').show();
	} else {
		$('#new_involved_data_inner .new_data_nothing').hide();
	}

	if ( ($("#new_resources_data_inner .cat_element_row:visible").length == 0) && (filter != "all") ) {
		$('#new_resources_data_inner .new_data_nothing').show();
	} else {
		$('#new_resources_data_inner .new_data_nothing').hide();
	}

	if ( ($("#new_inspiration_data_inner .cat_element_row:visible").length == 0) && (filter != "all") ) {
		$('#new_inspiration_data_inner .new_data_nothing').show();
	} else {
		$('#new_inspiration_data_inner .new_data_nothing').hide();
	}	
	
	$("#new_involved_data_inner div.cat_element_row").removeClass("first_child");
	$("#new_involved_data_inner .filter_cat_"+filter+":first").addClass("first_child");
	
});

$('#my_favorites_dd').live('change', function(event, ui) {
	$(this).blur();
	filter = $(this).val();
	$('.fav_data_nothing').hide();

	if (filter == "all") {
		$('.fav_element_row').show();
	} else {
		$('.fav_element_row').hide();
		$('.row_'+filter).show();
	}
	
	$.mobile.silentScroll(0);
	
	if ( ($("#fav_resources_data_inner .row_"+filter).length == 0) && (filter != "all") ) {
		$('#fav_resources_data_inner .fav_data_nothing').show();
	} else {
		$('#fav_resources_data_inner .fav_data_nothing').hide();
	}
	
	if ( ($("#fav_inspiration_data_inner .row_"+filter).length == 0) && (filter != "all") ) {
		$('#fav_inspiration_data_inner .fav_data_nothing').show();
	} else {
		$('#fav_inspiration_data_inner .fav_data_nothing').hide();
	}
	
	$("#fav_resources_data_inner div.fav_element_row").removeClass("first_child");
	$("#fav_inspiration_data_inner div.fav_element_row").removeClass("first_child");

	$("#fav_resources_data_inner .row_"+filter+":first").addClass("first_child");
	$("#fav_inspiration_data_inner .row_"+filter+":first").addClass("first_child");

	if ( ($("#fav_resources_data_inner .row_"+filter).length == 0) && (filter != "all") ) {
		$('.fav_tab').removeClass('fav_tab_on');
		$('#inspiration_fav_tab').addClass('fav_tab_on');
		$('.fav_data').hide();
		$('#inspiration_fav_data').show();	
	} else {
		$('.fav_tab').removeClass('fav_tab_on');
		$('#resources_fav_tab').addClass('fav_tab_on');
		$('.fav_data').hide();
		$('#resources_fav_data').show();	
	}
});

$('#my_goals_dd').live('change', function(event, ui) {
	$(this).blur();
});

$('#search_dd').live('change', function(event, ui) {
	keywords = $('#search_ipt').val();
	category = $('#search_dd').val();
	$('#search_dd').blur();
	
	if ( (keywords) || (category) ) {
		goSearch(keywords, category);
	}
	return false;
});

$('#search_ipt').live('change keypress', function(event, ui) {
	if (event.keyCode == 13) {
		keywords = $('#search_ipt').val();
		category = $('#search_dd').val();
		$('#search_ipt').blur();
		
		if ( (keywords) || (category) ) {
			goSearch(keywords, category);
		}
		return false;
	}
});

/*
$('#tog_badge').live('change', function(event, ui) {
	if ($(this).val() == "on") {
		// on
		localStorage["tog_showbadgecount"] = 1;
		window.plugins.badge.set(localStorage['badge_count']);
	} else {
		// off
		localStorage["tog_showbadgecount"] = 0;
		window.plugins.badge.clear();
	}
});
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TAP EVENTS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$('.cat_tab').live('tap', function(event, ui) { 
	var tab = $(this).attr('data-tab');
	$('.cat_tab').removeClass('cat_tab_on');
	$(this).addClass('cat_tab_on');
	$('.cat_data').hide();
	$('#' + tab + "_data").show();	
});

$('.fav_tab').live('tap', function(event, ui) { 
	var tab = $(this).attr('data-tab');
	$('.fav_tab').removeClass('fav_tab_on');
	$(this).addClass('fav_tab_on');
	$('.fav_data').hide();
	$('#' + tab + "_fav_data").show();	
});

$('.new_tab').live('tap', function(event, ui) { 
	var filter = $('#new_dd').val();
	var tab = $(this).attr('data-tab');
	$('.new_tab').removeClass('new_tab_on');
	$(this).addClass('new_tab_on');
	$('.new_data').hide();
	$('#' + tab + "_new_data").show();	

	
	if ( ($("#new_involved_data_inner .cat_element_row:visible").length == 0) && (filter != "all") ) {
		$('#new_involved_data_inner .new_data_nothing').show();
	} else {
		if ((filter != "all")) {
			$('#new_involved_data_inner .new_data_nothing').hide();
		}
	}

	if ( ($("#new_resources_data_inner .cat_element_row:visible").length == 0) && (filter != "all") ) {
		$('#new_resources_data_inner .new_data_nothing').show();
	} else {
		if ((filter != "all")) {
			$('#new_resources_data_inner .new_data_nothing').hide();
		}
	}

	if ( ($("#new_inspiration_data_inner .cat_element_row:visible").length == 0) && (filter != "all") ) {
		$('#new_inspiration_data_inner .new_data_nothing').show();
	} else {
		if ((filter != "all")) {
			$('#new_inspiration_data_inner .new_data_nothing').hide();
		}
	}
		
});

$('.goal_tab').live('tap', function(event, ui) { 
	$('.edit_goal_content').hide();
	$('.add_goal_content').show();

	var tab = $(this).attr('data-tab');
	$('.goal_tab').removeClass('goal_tab_on');
	$(this).addClass('goal_tab_on');
	$('.goal_data').hide();
	$('#' + tab + "_goal_data").show();	
});

$('.search_tab').live('tap', function(event, ui) { 
	var tab = $(this).attr('data-tab');
	$('.search_tab').removeClass('search_tab_on');
	$(this).addClass('search_tab_on');
	$('.search_data').hide();
	$('#' + tab + "_search_data").show();	
});

$('.help_wrap').live('tap', function(event, ui) {
	if ($(this).children('.help_block').is(":visible")) {
		$(this).children('.help_block').hide();
	} else {
		$(this).children('.help_block').show();
	}	
});

$('#email_share').live('tap', function(event, ui) {
	var share_email_to = $('#share_email_to').val();
	var share_email_from = $('#share_email_from').val();
	var share_type = $(this).attr('data-content_type');
	var share_src = $(this).attr('data-content_src');
	var share_id = $(this).attr('data-content_id');
	
	$.mobile.loading( 'show', {
		text: sharing_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});

    $.ajax({
        type: "POST",
        url: uri + "/api/email_share.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], email_address_to: share_email_to, email_address_from: share_email_from, share_type: share_type, share_src: share_src, share_id: share_id },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
				hideMobile();
				notice("Content shared successfully!", 3500);
			} else {
				hideMobile();
				notice(generic_error, 5000);
			}
        },
        error: function(request, status, err) {
		    hideMobile();
			notice(specific_error + err, 5000);
        }
    });
});

$('#fav_email_share').live('tap', function(event, ui) {
	var data_tab = $('.fav_tab.fav_tab_on').attr('data-tab');
	var fav_email_to = $('#fav_email_to').val();
	var fav_email_from = $('#fav_email_from').val();

	$.mobile.loading( 'show', {
		text: sharing_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});
			
    $.ajax({
        type: "POST",
        url: uri + "/api/email_favorites.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], email_address_to: fav_email_to, email_address_from: fav_email_from, share_type: data_tab },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
				hideMobile();
				notice("Content shared successfully!", 3500);
			} else {
				hideMobile();
				notice(generic_error, 5000);
			}
        },
        error: function(request, status, err) {
		    hideMobile();
			notice(specific_error + err, 5000);
        }
    });
});

$('.go_share').live('tap', function(event, ui) {
	var data_src = $(this).attr('data-src');
	var data_type = $(this).attr('data-type');
	var data_id = $(this).attr('data-id');

	$.mobile.loading( 'show', {
		text: loading_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});
	
    $.ajax({
        type: "POST",
        url: uri + "/api/share.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], data_src: data_src, data_type: data_type, data_id: data_id },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
				
				// fill in header
				$('.share_title').html(data.data.title);
				
				// fill in facebook link
				$('.share_facebook_link').attr('data-href', data.data.facebook_link);
				
				// fill in twitter link
				$('.share_twitter_link').attr('data-href', data.data.twitter_link);
				
				// fill in linkedin link
				$('.share_linkedin_link').attr('data-href', data.data.linkedin_link);
				
				// fill in email to
				$('#share_email_to').val(localStorage["email"]);
				
				// fill in email from
				$('#share_email_from').val(localStorage["email"]);
				
				// fill in email form data (src, type, id)
				$('#email_share').attr('data-content_id', data_id);
				$('#email_share').attr('data-content_type', data_type);
				$('#email_share').attr('data-content_src', data_src);
				
				hideMobile();
				$('.load_content').show();		
			} else {
				hideMobile();
				$('.load_content').show();		
				notice(generic_error, 5000);
			}
        },
        error: function(request, status, err) {
			hideMobile();
			$('.load_content').show();		
			notice(specific_error + err, 5000);        
        }
    });		

	$.mobile.changePage("#share", {transition: "fade"}); 
	return false;
});

$('#my_favorites_dd').live('blur', function(event) {
	$("#my_favorites .ua-header").fixedtoolbar('hide');	
	return false;
});

$('#my_favorites_dd').live('focus', function(event) {
	$("#my_favorites .ua-header").fixedtoolbar('hide');	
	return false;
});

$('#my_favorites #fav_email_to, #my_favorites #fav_email_from').live('blur', function(event) {
	$("#my_favorites .ua-header").fixedtoolbar('hide');	
	return false;
});

$('#my_favorites #fav_email_to, #my_favorites #fav_email_from').live('focus', function(event) {
	$("#my_favorites .ua-header").fixedtoolbar('hide');	
	return false;
});

$('#share #share_email_to, #share #share_email_from').live('blur', function(event) {
	$("#share .ua-header").fixedtoolbar('hide');	
	return false;
});

$('#share #share_email_to, #share #share_email_from').live('focus', function(event) {
	$("#share .ua-header").fixedtoolbar('hide');	
	return false;
});

$('.get_more_resources').live('tap', function(event) {
	var filter = $(this).attr('data-filter');
	var start = $(this).attr('data-start');
	var category_id = $(this).attr('data-category_id');

	$.mobile.loading( 'show', {
		text: loading_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});
	
    $.ajax({
        type: "POST",
        url: uri + "/api/get_resources.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], category_id: category_id, filter: filter, start: start },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
				html_txt = "";
				resource_cnt = start;
				interrupt_resource = false;
				resource_content = false;
				
				$.each(data.more, function(index) {
					html_txt = html_txt + build_resource_row(data.more[index]);
					resource_cnt++;
					resource_content = true;
				});
				
				if (data.total > resource_cnt) {
					html_txt = html_txt + "<div class='cat_action_more more_rr'><input type='button' class='get_more_resources' data-filter='" + filter + "' data-start='" + resource_cnt + "' data-category_id='" + category_id + "' value='Load More' /></div>";
				}			
				
				if (!html_txt) {
					html_txt = "<div class='cat_data_nothing'>Nothing found, try a different filter.</div>";
				}	
				
				$('.more_rr').remove();
				$('#resources_data_inner').append(html_txt);
				$('#resources_data_inner').trigger("create");
				hideMobile();
			} 	
        },
        error: function(request, status, err) {
        }
    });	
	return false;
});

$('.search_more').live('tap', function(event, ui) {

	// store the onpage vars (keywords and category_code
	var keywords = $('#search_ipt').val();
	var category_code = $('#search_dd').val();
	
	var type_id = $(this).attr('data-type');
	var current = parseInt($(this).attr('data-current'));
	
	// change to sub_category and load events..	
	$.mobile.loading( 'show', {
		text: searching_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});
	
    $.ajax({
        type: "POST",
        url: uri + "/api/search_more.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], category_code: category_code, keywords: keywords, type: type_id, start: current },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
			
				hideMobile();
				cntr = current;
				
				if (type_id == "i") {
					html_more = "";
					$.each(data.more, function(index) {
						html_more = html_more + build_search_inspiration_row(data.more[index]);												
						cntr++;
					});
					if (html_more) { 
						$('.search_more_i').remove();		
						if (data.total > cntr) {
							html_more = html_more + "<div class='cat_action_more search_more_i'><input type='button' class='search_more' data-type='i' data-current='" + cntr + "' value='Load More' /></div>";
						}
						$('#search_inspiration_data_inner').append(html_more);
						$('#search_inspiration_data_inner').trigger("create");
					}
				}
				if (type_id == "r") {
					html_more = "";
					$.each(data.more, function(index) {
						html_more = html_more + build_search_resource_row(data.more[index]);												
						cntr++;
					});
					if (html_more) { 
						$('.search_more_r').remove();		
						if (data.total > cntr) {
							html_more = html_more + "<div class='cat_action_more search_more_r'><input type='button' class='search_more' data-type='r' data-current='" + cntr + "' value='Load More' /></div>";
						}
						$('#search_resources_data_inner').append(html_more);
						$('#search_resources_data_inner').trigger("create");
					}
				}
				if (type_id == "e") {
					html_more = "";
					$.each(data.more, function(index) {
						html_more = html_more + build_search_event_row(data.more[index]);												
						cntr++;
					});
					if (html_more) { 
						$('.search_more_e').remove();		
						if (data.total > cntr) {
							html_more = html_more + "<div class='cat_action_more search_more_e'><input type='button' class='search_more' data-type='e' data-current='" + cntr + "' value='Load More' /></div>";
						}
						$('#search_events_data_inner').append(html_more);
						$('#search_events_data_inner').trigger("create");
					}
				}				
				
			} else {
				hideMobile();
				notice(generic_error, 5000);			
			}
        },
        error: function(request, status, err) {
			hideMobile();
			notice(specific_error + err, 5000);        
        }
    });		
    return false;
});

$('.element_event_details_toggle').live('tap', function(event, ui) {
	var id = $(this).attr('data-id');
	var type = $(this).attr('data-type');
	
	if ($('#'+type+'event_details_'+id).is(":visible")) {
		$('#' + type + 'event_details_' + id).slideUp(300, function() { $(this).hide(); });
		$(this).html("+ MORE");
	} else {
		$('#' + type + 'event_details_' + id).slideDown(300, function() { $(this).trigger('create'); });
		$(this).html("- LESS");
	}
	return false;
});

$('.toggle_more').live('tap', function(event, ui) {
	var id = $(this).attr('data-id');
	var type = $(this).attr('data-type');
	
	if ($('#'+type+'event_details_'+id).is(":visible")) {
		$('#' + type + 'event_details_' + id).slideUp(300, function() { $(this).hide(); });
		$('#' + type + 'event_toggle_' + id).html('+ MORE');
	} else {
		$('#' + type + 'event_details_' + id).slideDown(300, function() { $(this).trigger('create'); });
		$('#' + type + 'event_toggle_' + id).html('- LESS');
	}
	return false;
});


$('#cancel_goal').live('tap', function(event, ui) {
	$('#my_goals_dd').val("Select..");
	$('#my_goals_dd').selectmenu('refresh', true);
	$('#add_goal_body').val("");
	
	$('.edit_goal_content').hide();
	$('.add_goal_content').show();
	
    $('.goal_tab').removeClass('goal_tab_on');
	$('#current_goal_tab').addClass('goal_tab_on');
	$('.goal_data').hide();
	$('#current_goal_data').show();
});

$('#edit_goal').live('tap', function(event, ui) {

//	$('.load_content').hide();

	var goal_id = $(this).attr('data-id');
	var goal_category_id = $('#my_goals_edit_dd').val();
	var goal_content = $('#edit_goal_body').val();

	$.mobile.loading( 'show', {
		text: loading_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});
		
    $.ajax({
        type: "POST",
        url: uri + "/api/user_goal_edit.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], goal_id: goal_id, category_id: goal_category_id, goal_content: goal_content },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
				// load edit screen..
				$('.edit_goal_content').hide();
				$('.add_goal_content').show();

			    $('.goal_tab').removeClass('goal_tab_on');
				$('#current_goal_tab').addClass('goal_tab_on');
				$('.goal_data').hide();
				$('#current_goal_data').show();

				$.mobile.silentScroll(0);
				loadGoals();
				notice("Goal has been saved", 3500);
			} else {
				hideMobile();
				notice(generic_error, 5000);			
			}
        },
        error: function(request, status, err) {
			hideMobile();
			notice(specific_error + err, 5000);        
        }
    });		
    return false;	
});


$('.goal_edit').live('tap', function(event, ui) {
	var goal_id = $(this).attr('data-id');

	// get goal info
    $.ajax({
        type: "POST",
        url: uri + "/api/user_goal_detail.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], goal_id: goal_id },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
			
				// load edit screen..
				$('.add_goal_content').hide();
				$('.edit_goal_content').show();

				$('#my_goals_edit_dd').val(data.goal.Category.category_code);
				$('#my_goals_edit_dd').selectmenu('refresh', true);
				$('#edit_goal_body').val(data.goal.UserGoal.goal_content);		
				
				$('#edit_goal').attr('data-id', data.goal.UserGoal.id);						
				$('#delete_goal').attr('data-id', data.goal.UserGoal.id);						
								
			    $('.goal_tab').removeClass('goal_tab_on');
				$('#add_goal_tab').addClass('goal_tab_on');
				$('.goal_data').hide();
				$('#add_goal_data').show();
				
			} else {
				hideMobile();
				notice(generic_error, 5000);
			}
        },
        error: function(request, status, err) {
			hideMobile();
			notice(specific_error + err, 5000);
        }
    });		
    return false;	
});


$('.goal_delete, #delete_goal').live('tap', function(event, ui) {
	var goal_id = $(this).attr('data-id');
	navigator.notification.confirm(
		'Are you sure you want to delete this goal?',
        function(resp) { 
        	if (resp == 1) {
				$.mobile.loading( 'show', {
					text: loading_text,
					textVisible: true,
					theme: 'e',
					html: ""
				});
				
			    $.ajax({
			        type: "POST",
			        url: uri + "/api/user_goal_delete.json?ts=" + (new Date).getTime(),
			        data: { user: localStorage["userid"], hash: localStorage["password_hash"], goal_id: goal_id },
			        dataType: "json",
			        timeout: 10000,
			        success: function(data) {
						if (data.status.status_code == "200") {
							loadGoals();
						    $('.goal_tab').removeClass('goal_tab_on');
							$('#current_goal_tab').addClass('goal_tab_on');
							$('.goal_data').hide();
							$('#current_goal_data').show();
							notice("Goal has been deleted", 3500);
						} else {
							hideMobile();
							notice(generic_error, 5000);
						}
			        },
			        error: function(request, status, err) {
						hideMobile();
						notice(specific_error + err, 5000);			        
			        }
			    });		        	
        	}
        },
        'Delete Confirmation',
        'Delete,Cancel'
    );
    return false;
});


$('#complete_goal').live('tap', function(event, ui) {
	$.mobile.loading( 'show', {
		text: loading_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});
	var goal_id = $(this).attr('data-id');
	
    $.ajax({
        type: "POST",
        url: uri + "/api/user_goal_complete.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], goal_id: goal_id },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {			
				loadGoals();
			    $('.goal_tab').removeClass('goal_tab_on');
				$('#current_goal_tab').addClass('goal_tab_on');
				$('.goal_data').hide();
				$('#current_goal_data').show();
				notice('Goal completed successfully!', 3500);
			} else {
				hideMobile();
				notice(generic_error, 5000);
			}
        },
        error: function(request, status, err) {
			hideMobile();
			notice(specific_error + err, 5000);
        }
    });	
    return false;
});

$('#save_goal').live('tap', function(event, ui) {
	$('#add_goal_body').blur();
	$.mobile.loading( 'show', {
		text: loading_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});
	
	var category_id = $('#my_goals_dd').val();
	var goal_content = $('#add_goal_body').val();
	var from_category = $('#save_goal').attr('data-from_category');
	
    $.ajax({
        type: "POST",
        url: uri + "/api/user_goal_add.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], category_id: category_id, goal_content: goal_content },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {			
				loadGoals();
				$('#my_goals_dd').val("Select..");
				$('#my_goals_dd').selectmenu('refresh', true);
				$('#add_goal_body').val("");
				
			    $('.goal_tab').removeClass('goal_tab_on');
				$('#current_goal_tab').addClass('goal_tab_on');
				$('.goal_data').hide();
				$('#current_goal_data').show();
				
				if (from_category == "1") {
					backGoal = "";
					history.back();
					notice('Goal has been added', 3500);
				}
			} else {
				// it may just not have data..
                navigator.notification.alert("All fields are required.\n Try again.", function() {});
                hideMobile();
                return false;
			}
        },
        error: function(request, status, err) {
			hideMobile();
			notice(specific_error + err, 5000);
        }
    });
    return false;
});

$('.set_goal').live('tap', function(event, ui) {
	var category_id = $(this).attr('data-category_id');
	$.mobile.changePage("#my_goals", {transition: "fade"});

	$('#my_goals_dd').val(category_id);
	$('#my_goals_dd').selectmenu('refresh', true);
	
    $('.goal_tab').removeClass('goal_tab_on');
	$('#add_goal_tab').addClass('goal_tab_on');
	$('.goal_data').hide();
	$('#add_goal_data').show();

	backGoal = "back";
	return false;
});

$('.fav_delete').live('tap', function(event, ui) {
	var element_id = parseInt($(this).attr('data-id'));
	var type_id = $(this).attr('data-type');
	if ( (type_id == "i") || (type_id == "r") ) {
		type_id_actual = 1;
	} else {
		type_id_actual = 2;
	}
	
    $.ajax({
        type: "POST",
        url: uri + "/api/user_favorite.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], favorite_type_id: element_id, favorite_type: type_id_actual },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
				$('#my_favorite_'+element_id).fadeOut(250, function() { 
					$(this).hide();
					if (type_id == "i") {
						notice("Inspiration removed from My Favorites", 3500);					
						if ( $("#fav_inspiration_data_inner div.fav_element_row:visible").length < 1 ) {
							$('#fav_inspiration_data_inner .fav_data_nothing').show();
						}
					} else if (type_id == "r") {
						notice("Resource removed from My Favorites", 3500);					
						if ( $("#fav_resources_data_inner div.fav_element_row:visible").length < 1 ) {
							$('#fav_resources_data_inner .fav_data_nothing').show();
						}
					}
				});
			} else {
			    hideMobile();
				notice(generic_error, 5000);
			}
        },
        error: function(request, status, err) {
		    hideMobile();
			notice(specific_error + err, 5000);
        }
    });
    return false;
});

$('.myevents_delete').live('tap', function(event, ui) {
	var element_id = parseInt($(this).attr('data-id'));
    $.ajax({
        type: "POST",
        url: uri + "/api/user_events.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], event_id: element_id },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
				$('#myevent_'+element_id).fadeOut(250, function() {
					$(this).hide();
					$('#myevents_event_details_'+element_id).hide();
					$('#myevents_event_toggle_'+element_id).hide();

					$("div.myevents_element_row:visible:first").addClass("first_child");
					if ( $("#myevents_data_inner div.myevents_element_row:visible").length < 1 ) {
						$('.myevents_data_nothing').trigger('create');
						$('.myevents_data_nothing').show();
					}
				});
				notice("Event has been deleted", 3500);
			} else {
				hideMobile();
				notice(generic_error, 5000);			
			}
        },
        error: function(request, status, err) {
			hideMobile();
			notice(specific_error + err, 5000);
        }
    });		
    return false;
});

$('.fave').live('tap', function(event, ui) {

	var element_id = parseInt($(this).attr('data-id'));
	var type_id = $(this).attr('data-type');
	
	if ( (type_id == "i") || (type_id == "r") ) {
		type_id_actual = 1;
	} else {
		type_id_actual = 2;
	}
    $.ajax({
        type: "POST",
        url: uri + "/api/user_favorite.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], favorite_type_id: element_id, favorite_type: type_id_actual },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
				if (data.action == "a") {
					$(".fave[data-id='"+element_id+"'][data-type='"+type_id+"']").addClass('fave_on');
					notice("Content added to My Favorites", 3500);
				} else {
					$(".fave[data-id='"+element_id+"'][data-type='"+type_id+"']").removeClass('fave_on');
					notice("Content removed from My Favorites", 3500);
				}
			} else {
				hideMobile();
				notice(generic_error, 5000);
			}
        },
        error: function(request, status, err) {
			hideMobile();
			notice(specific_error + err, 5000);
        }
    });		
    return false;
});

$('.event_toggle').live('tap', function(event, ui) {

	var element_id = parseInt($(this).attr('data-id'));
	var type_id = $(this).attr('data-type');
	
    $.ajax({
        type: "POST",
        url: uri + "/api/user_events.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], event_id: element_id },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
				if (data.action == "a") {
					$(".event_toggle[data-id='"+element_id+"'][data-type='"+type_id+"']").addClass('event_on');
					notice("Event added to My Events", 3500);
				} else {
					$(".event_toggle[data-id='"+element_id+"'][data-type='"+type_id+"']").removeClass('event_on');
					notice("Event removed from My Events", 3500);
				}
			} else {
				hideMobile();
				notice(generic_error, 5000);
			}
        },
        error: function(request, status, err) {
			hideMobile();
			notice(specific_error + err, 5000);        
        }
    });	
    return false;
});

$('.load_more').live('tap', function(event, ui) {

	var category_id = parseInt($(this).attr('data-category_id'));
	var type_id = $(this).attr('data-type');
	var current = parseInt($(this).attr('data-current'));
	
	// change to sub_category and load events..	
	$.mobile.loading( 'show', {
		text: loading_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});
	
    $.ajax({
        type: "POST",
        url: uri + "/api/get_more.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], category_id: category_id, type: type_id, start: current },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
				hideMobile();
				cntr = current;
				if (type_id == "i") {
					html_more = "";
					$.each(data.more, function(index) {
						html_more = html_more + build_inspiration_row(data.more[index]);												
						cntr++;
					});
					if (html_more) { 
						$('.more_i').remove();		
						if (data.total > cntr) {
							html_more = html_more + "<div class='cat_action_more more_i'><input type='button' class='load_more' data-type='i' data-current='" + cntr + "' data-category_id='" + data.category.Category.id  + "' value='Load More' /></div>";
						}
						$('#inspired_data_inner').append(html_more);
						$('#inspired_data_inner').trigger("create");
					}
				}
				if (type_id == "r") {
					html_more = "";
					$.each(data.more, function(index) {
						html_more = html_more + build_resource_row(data.more[index]);												
						cntr++;
					});
					if (html_more) { 
						$('.more_r').remove();		
						if (data.total > cntr) {
							html_more = html_more + "<div class='cat_action_more more_r'><input type='button' class='load_more' data-type='r' data-current='" + cntr + "' data-category_id='" + data.category.Category.id  + "' value='Load More' /></div>";
						}
						$('#resources_data_inner').append(html_more);
						$('#resources_data_inner').trigger("create");
					}
				}
				if (type_id == "e") {
					html_more = "";
					$.each(data.more, function(index) {
						html_more = html_more + build_event_row(data.more[index]);												
						cntr++;
					});
					
					if (html_more) { 
						$('.more_e').remove();		
						if (data.total > cntr) {
							html_more = html_more + "<div class='cat_action_more more_e'><input type='button' class='load_more' data-type='e' data-current='" + cntr + "' data-category_id='" + data.category.Category.id  + "' value='Load More' /></div>";
						}
						$('#involved_data_inner').append(html_more);
						$('#involved_data_inner').trigger("create");
					}
				}				
				
			} else {
				hideMobile();
				notice(generic_error, 5000);			
			}
        },
        error: function(request, status, err) {
			hideMobile();
			notice(specific_error + err, 5000);
        }
    });		
    return false;
});

$('.root_category').live('tap', function(event) {
	var cat_id = parseInt($(this).attr('data-id'));
	
	buildSubcat(cat_id);
	$('#home .ua-header').hide();
	$('#subhome .ua-header').show();
	
    gaPlugin.trackPage(successHandler, errorHandler, "/app/home/"+$(this).attr('data-code'));
	$.mobile.changePage("#subhome", {transition: "slide"});
	return false;
});

$('.sub_category').live('tap', function(event) { 

	console.log('sub_category tap');

	$('#inspired_data_inner').html('<div class="cat_data_nothing">Nothing found.</div>');
	$('#resources_data_inner').html('<div class="cat_data_nothing">Nothing found.</div>');
	$('#involved_data_inner').html('<div class="cat_data_nothing">Nothing found.</div>');
	$('#inspired_data_inner').trigger("create");
	$('#resources_data_inner').trigger("create");
	$('#involved_data_inner').trigger("create");
				
	$('#cathome .ua-header').show();
	$('.cat_tab').removeClass('cat_tab_on');
	$('#involved_tab').addClass('cat_tab_on');
	$('.cat_data').hide();
	$('#involved_data').show();	

	var cat_id = parseInt($(this).attr('data-id'));

	// change to sub_category and load events..	
	$.mobile.loading( 'show', {
		text: loading_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});
	
    $.ajax({
        type: "POST",
        url: uri + "/api/sub_category.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], category_id: cat_id },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
			
				$('.tweet_link').attr('data-href', 'http://twitter.com/intent/tweet?hashtags='+data.category.Category.hash_tag);
				$('.tweet_convo_link').attr('data-href', 'https://mobile.twitter.com/search/%23'+data.category.Category.hash_tag);
				$('.tweet_hash').text(data.category.Category.hash_tag);
				$('.set_goal').attr('data-category_id', data.category.Category.category_code);
				
				$('#cathome .h3').html(data.parent_category.Category.category_description + ": <br/><span class='cathome_h3'>" + data.category.Category.category_description + '</span>');
				$('#cat_resource_dd').attr("data-category_id", cat_id);
				
				// parse inspirations
				cat_inspirations_txt = "";
				inspiration_cnt = 0;
				interrupt_inspiration = false;
				inspiration_content = false;
				$.each(data.inspirations, function(index) {
					cat_inspirations_txt = cat_inspirations_txt + build_inspiration_row(data.inspirations[index]);		
					
					if ( (inspiration_cnt == 4) ) {
						cat_inspirations_txt = cat_inspirations_txt + build_interruptor(data);
						interrupt_inspiration = true;
					}
					inspiration_cnt++;
					inspiration_content = true;
				});		
				
				if (!interrupt_inspiration) {
					cat_inspirations_txt = cat_inspirations_txt + build_interruptor(data);
					interrupt_inspiration = true;
				}
				
				// append more button if needed..
				if (data.totals.inspirations > inspiration_cnt) {
					cat_inspirations_txt = cat_inspirations_txt + "<div class='cat_action_more more_i'><input type='button' class='load_more' data-type='i' data-current='" + inspiration_cnt + "' data-category_id='" + data.category.Category.id  + "' value='Load More' /></div>";
				}
				
				// parse resources
				cat_resources_txt = "";				
				resource_cnt = 0;
				interrupt_resource = false;
				resource_content = false;				
				$.each(data.resources, function(index) {
					cat_resources_txt = cat_resources_txt + build_resource_row(data.resources[index]);		

					if ( (resource_cnt == 4) ) {
						cat_resources_txt = cat_resources_txt + build_interruptor(data);	
						interrupt_resource = true;
					}
					resource_cnt++;
					resource_content = true;
				});	
				
				if (!interrupt_resource) {
					cat_resources_txt = cat_resources_txt + build_interruptor(data);
					interrupt_resource = true;
				}
				
				// append more button if needed..
				if (data.totals.resources > resource_cnt) {
					cat_resources_txt = cat_resources_txt + "<div class='cat_action_more more_r'><input type='button' class='load_more' data-type='r' data-current='" + resource_cnt + "' data-category_id='" + data.category.Category.id  + "' value='Load More' /></div>";
				}							

				// parse events
				cat_events_txt = "";				
				event_cnt = 0;
				interrupt_event = false;
				event_content = false;
				$.each(data.events, function(index) {
					cat_events_txt = cat_events_txt + build_event_row(data.events[index]);		

					if ( (event_cnt == 4) ) {
						cat_events_txt = cat_events_txt + build_interruptor(data);	
						interrupt_event = true;
					}
					event_cnt++;
					event_content = true;
				});	
				
				if (!interrupt_event) {
					cat_events_txt = cat_events_txt + build_interruptor(data);
					interrupt_event = true;
				}
								
				// append more button if needed..
				if (data.totals.events > event_cnt) {
					cat_events_txt = cat_events_txt + "<div class='cat_action_more more_e'><input type='button' class='load_more' data-type='e' data-current='" + event_cnt + "' data-category_id='" + data.category.Category.id  + "' value='Load More' /></div>";
				}

				// append to structure
				if (inspiration_content) { $('#inspired_data_inner').html(cat_inspirations_txt); }
				if (resource_content) { $('#resources_data_inner').html(cat_resources_txt); }
				if (event_content) { $('#involved_data_inner').html(cat_events_txt); }
				
				$('#inspired_data_inner').trigger("create");
				$('#resources_data_inner').trigger("create");
				$('#involved_data_inner').trigger("create");

			    hideMobile();
                gaPlugin.trackPage(successHandler, errorHandler, "/app/category/"+cat_id);
            	$('.cat_page').show();
				$('#subhome .ua-header').hide();
            	$.mobile.changePage("#cathome", {transition: "none"}); // was slide
			} else {
				notice(generic_error, 5000);
			    hideMobile();
			}
        },
        error: function(request, status, err) {
		    hideMobile();
			notice(specific_error + err, 5000);
        }
    });	
});

$('.hdrimg, .ret_pullstring').live('tap', function() {
	var top = parseInt($('.pullr').css('top'), 10);
	
	if ( (device.platform == "iPhone") || (device.platform == "iPhone Simulator") ) {
		if (top < 0) {
			$('.pullr').animate({ top: "20px" }, 600);
		} else {
			$('.pullr').animate({ top: "-"+menu_offset+"px" }, 600);
		}
	} else {
		if (top < 0) {
			$('.pullr').css("top","20px");
		} else {
			$('.pullr').css("top","-"+menu_offset+"px");
		}
	}	
	return false;
});

$('.cb_call').live('tap', function(ui, e) {
	var url = $(this).attr('data-href');
	cb.showWebPage(url, { showLocationBar: true });
	return false;
});

$('.add_ical').live('tap', function(ui, e) { 
	var id = $(this).attr('data-id');
    $.ajax({
        type: "POST",
        url: uri + "/api/get_event.json?ts=" + (new Date).getTime(),
        data: { event_id: id },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
				createEvent(data.event.Event.title, data.event.Event.event_locator, data.event.Event.description, data.event.Event.start_date, data.event.Event.end_date);
			} else {
			    hideMobile();
				notice(generic_error, 5000);
			}
        },
        error: function(request, status, err) {
		    hideMobile();
			notice(specific_error + err, 5000);
        }
    });	
    return false;
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GENERAL FUNCTIONS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function buildSubcat(cat_id) {
	var subcats = "";
	var highlighted_subcats = "";
	
	$.each(data_menu, function(index) {
		if (data_menu[index].Category.id == cat_id) {
			$.each(data_menu[index].ChildCategory, function(idx) {
				highlighted = false;
				row_style = "category_row_off";
				interest_txt = "You have not shown any interest in this area";
				if (data_menu[index].ChildCategory[idx].UserCategory.status == "1") {
					row_style = "category_row_on";
					
					highlighted_total = data_menu[index].ChildCategory[idx].count_new;
					
					if (highlighted_total > 0) {
						if (highlighted_total == 1) { append = ""; } else { append = "s"; }
						interest_txt = highlighted_total + " new item" + append + " in the last " + localStorage["new_check_age"] + " days";					
					} else {
						interest_txt = "Nothing new in the last " + localStorage["new_check_age"] + " days";
					}
										
					highlighted = true;
				}
				
				if (highlighted) {
					highlighted_subcats = highlighted_subcats + "<div data-code='" + data_menu[index].ChildCategory[idx].category_code + "' data-id='" + data_menu[index].ChildCategory[idx].id + "' class='sub_category category_row " + row_style + "'><h4>" + data_menu[index].ChildCategory[idx].category_description + "</h4><div class='my_cat_info'>" + interest_txt + "</div></div>";
				} else {
					subcats = subcats + "<div data-code='" + data_menu[index].ChildCategory[idx].category_code + "' data-id='" + data_menu[index].ChildCategory[idx].id + "' class='sub_category category_row " + row_style + "'><h4>" + data_menu[index].ChildCategory[idx].category_description + "</h4><div class='my_cat_info'>" + interest_txt + "</div></div>";
				}					
			});
			$('#subhome .h3').html(data_menu[index].Category.category_description);
		}
	});
	$('#subhome_categories').html(highlighted_subcats + subcats);
	$('#subhome_categories').trigger('create');
}

function checkPreAuth() {
    var form = $("#loginForm");
    if (localStorage["username"] != undefined && localStorage["password"] != undefined) {
    	$('.load_content').hide();
        $("#username", form).val(localStorage["username"]);
        $("#password", form).val(localStorage["password"]);
        handleLogin();
    } else {
		$('.load_content').show();
    }
    $('.ret, .ret_pullstring').retina();
}

function childBrowserClosed() {
}

function createEvent(title, location, notes, startDate, endDate) {
	var reminder = 60;
	calPlugin.createEvent(title,location,notes,startDate,endDate,reminder,
	    function() {
	        notice("Event has been added to your calendar", 3500);
	    },
	    function(errmsg) { } 
	);
}

function errorHandler(result) {
}

function goSearch(keywords, category_code) {
	$.mobile.loading( 'show', {
		text: searching_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});    
	
	// hide and reset tabs
	$('.search_tab').removeClass('search_tab_on');
	$('.search_tab').hide();
	$('.search_data').hide();
	$('.search_nothing').hide();
	
	inspirations = "";
	inspirations_cnt = 0;
	resources = "";
	resources_cnt = 0;
	events = "";	
	events_cnt = 0;
	turned_on = false;
	
    $.ajax({
        type: "POST",
        url: uri + "/api/search.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], category_code: category_code, keywords: keywords },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {

				$.each(data.resources, function(index) {
					resources += build_search_resource_row(data.resources[index]);
					resources_cnt++;
				});
								
				$.each(data.inspirations, function(index) {
					inspirations += build_search_inspiration_row(data.inspirations[index]);
					inspirations_cnt++;
				});

				$.each(data.events, function(index) {
					events += build_search_event_row(data.events[index]);
					events_cnt++;
				});

				if (events) { 
					if (data.totals.events > events_cnt) {
						events = events + "<div class='cat_action_more search_more_e'><input type='button' class='search_more' data-type='e' data-current='" + events_cnt + "' value='Load More' /></div>";
					}
				
					$('#search_events_data_inner .search_data_nothing').hide();
					$('#search_events_data_inner').html(events); 
					$('#search_events_data_inner').trigger("create");
					
					if (!turned_on) {
						$('#search_events_tab').show();
						$('#events_search_data').show();
						$('#search_events_tab').addClass('search_tab_on');
						turned_on = true;						
					} else {
						$('#search_events_tab').show();
					}
				}
				if (resources) {
					if (data.totals.resources > resources_cnt) {
						resources = resources + "<div class='cat_action_more search_more_r'><input type='button' class='search_more' data-type='r' data-current='" + resources_cnt + "' value='Load More' /></div>";
					}
				
					$('#search_resources_data_inner .search_data_nothing').hide();
					$('#search_resources_data_inner').html(resources); 
					$('#search_resources_data_inner').trigger("create");
					
					if (!turned_on) {
						$('#search_resources_tab').show();
						$('#resources_search_data').show();
						$('#search_resources_tab').addClass('search_tab_on');
						turned_on = true;						
					} else {
						$('#search_resources_tab').show();
					}
				}
				if (inspirations) { 
					if (data.totals.inspirations > inspirations_cnt) {
						inspirations = inspirations + "<div class='cat_action_more search_more_i'><input type='button' class='search_more' data-type='i' data-current='" + inspirations_cnt + "' value='Load More' /></div>";
					}
				
					$('#search_inspiration_data_inner .search_data_nothing').hide();
					$('#search_inspiration_data_inner').html(inspirations); 
					$('#search_inspiration_data_inner').trigger("create");
					
					if (!turned_on) {
						$('#search_inspiration_tab').show();
						$('#inspiration_search_data').show();
						$('#search_inspiration_tab').addClass('search_tab_on');
						turned_on = true;
					} else {
						$('#search_inspiration_tab').show();
					}					
				}
				
				if (!turned_on) {
					$('.search_nothing').show();
				}
				hideMobile();
			} else {
				hideMobile();
				notice(generic_error, 5000);
			} 	
        },
        error: function(request, status, err) {
			hideMobile();
			notice(specific_error + err, 5000);
        }
    });	
}

function handleLogin() {

	if ( (device.platform == "iPhone") || (device.platform == "iPhone Simulator") ) {
		window.plugins.badge.clear();
	}
				
	$("#password").blur();
	$.mobile.loading( 'show', {
		text: 'Logging In',
		textVisible: true,
		theme: 'e',
		html: ""
	});
	
    var form = $("#loginForm");    
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    
    if (u != '' && p!= '') {
	    $.ajax({
	        type: "POST",
			url: uri + "/api/authenticate.json?ts=" + (new Date).getTime(),
	        data: { user_id: u, password: p },
			dataType: "json",	        
	        timeout: 10000,
	        success: function(data) {
				if (data.ua.status.status_code == "200") {
				
	                localStorage["userid"] = data.user.user_id; 
	                localStorage["password_hash"] = data.user.password_hash;
	                localStorage["username"] = u;
	                localStorage["password"] = p;
	                localStorage["name"] = data.user.profile.full_name;
	                localStorage["email"] = data.user.profile.email;
	                
	                userLogin(data.user.user_id, data.user.password_hash);
	                
				    $.ajax({
				        type: "POST",
				        url: uri + "/api/user_preference.json?ts=" + (new Date).getTime(),
				        data: { user: data.user.user_id, hash: data.user.password_hash, preference_id: "1" },
				        dataType: "json",
				        timeout: 10000,
				        success: function(data_p) {
							if (data_p.status.status_code == "200") {
								var done_load = stageData();				
				                if (done_load) { 
				                	profile_complete = true;
					                gaPlugin.trackPage(successHandler, errorHandler, "/app/login");
				                	$.mobile.changePage("#home", {transition: "fade"}); 
				                	
				                	notice('Welcome back, ' + localStorage["name"] + '!', 4500);
				                } 
							} else {
								// need to go through wizard..
				                gaPlugin.trackPage(successHandler, errorHandler, "/app/wizard/home");
			                	$.mobile.changePage("#wizard_home", {transition: "fade"}); 
							} 	
				        },
				        error: function(request, status, err) {
					    	$('.load_content').show();
							logout();
				        }
				    });			                
				} else {
			    	$('.load_content').show();
	                hideMobile();
	                navigator.notification.alert(data.ua.status.message + "\nPlease try again.", function() {});
				} 	        
	        },
	        error: function(request, status, err) {
	        	if (status == "timeout") {
			    	$('.load_content').show();
	                hideMobile();
	                navigator.notification.alert("Authentication timed out.\nPlease try again.", function() {});
	        	}
	        }
	    });
		$("#submitButton").removeAttr("disabled");
    } else {
    	$('.load_content').show();
        $.mobile.loading('hide');
        navigator.notification.alert("You must enter a username and password.", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}

function hideMenus() {
	$('.pullstring').trigger('tap');
}

function hideMobile() {
	$.mobile.loading('hide');
}

function loadGoals() {
	var current_goals = "";
	var completed_goals = "";

	$.ajax({
	    type: "POST",
	    url: uri + "/api/my_goals.json?ts=" + (new Date).getTime(),
	    data: { user: localStorage["userid"], hash: localStorage["password_hash"] },
	    dataType: "json",
	    timeout: 10000,
	    success: function(data) {
			if (data.status.status_code == "200") {

				$.each(data.current, function(index) {
					current_goals += build_goal_row(data.current[index], 'current');
				});
				$.each(data.completed, function(index) {
					completed_goals += build_goal_row(data.completed[index], 'completed');
				});
				
				if (current_goals) { 
					current_goals = current_goals + "<div class='current_goal_data_nothing' style='display:none;'>Nothing found, add some goals!</div>";
					$('#current_goal_data_inner').html(current_goals); 
					$('#current_goal_data_inner').trigger("create");
				} else {
					current_goals = current_goals + "<div class='current_goal_data_nothing'>Nothing found, add some goals!</div>";
					$('#current_goal_data_inner').html(current_goals); 
					$('#current_goal_data_inner').trigger("create");
				}
				
				if (completed_goals) { 
					completed_goals = completed_goals + "<div class='completed_goal_data_nothing' style='display:none;'>Nothing found, add some goals!</div>";
					$('#completed_goal_data_inner').html(completed_goals); 
					$('#completed_goal_data_inner').trigger("create");
				} else {
					completed_goals = completed_goals + "<div class='current_goal_data_nothing'>Nothing found, add some goals!</div>";
					$('#completed_goal_data_inner').html(completed_goals); 
					$('#completed_goal_data_inner').trigger("create");
				}				
				
				hideMobile();
				$('.load_content').show();
				
			} else {
				hideMobile();
				$('.load_content').show();
				notice(generic_error, 5000);
			} 	
	    },
	    error: function(request, status, err) {
			hideMobile();
			$('.load_content').show();
			notice(specific_error + err, 5000);
	    }
	});
}

function loadOnce() {
    $.ajax({
        type: "GET",
        url: uri + "/api/help.json?ts=" + (new Date).getTime(),
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
				$('#help_content').html(data.help.Help.content);
				$('#help_content').trigger("create");
			} else {
			} 	
        },
        error: function(request, status, err) {
        }
    });	
    
    $.ajax({
        type: "GET",
        url: uri + "/api/root_categories.json?ts=" + (new Date).getTime(),
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
				mnu = "";
				mnu_woall = "";
				is_first_category = true;
				$.each(data.categories, function(index) {
					if (!is_first_category) {
						mnu += "</optgroup><optgroup label=\"" + data.categories[index].Category.category_description + "\">";
						mnu_woall += "</optgroup><optgroup label=\"" + data.categories[index].Category.category_description + "\">";
					} else {
						mnu += "<optgroup label=\"" + data.categories[index].Category.category_description + "\">";
						mnu_woall += "<optgroup label=\"" + data.categories[index].Category.category_description + "\">";
						is_first_category = false;
					}
					mnu += "<option value='" + data.categories[index].Category.category_code + "'>All of '" + data.categories[index].Category.category_description + "'</option>";
					$.each(data.categories[index].ChildCategory, function(idx) {
						mnu += "<option value='" + data.categories[index].ChildCategory[idx].category_code + "'>" + data.categories[index].ChildCategory[idx].category_description + "</option>";
						mnu_woall += "<option value='" + data.categories[index].ChildCategory[idx].category_code + "'>" + data.categories[index].ChildCategory[idx].category_description + "</option>";
					});
				});
				$('#search_dd').append(mnu);
				$('#my_goals_dd').append(mnu_woall);
				$('#my_goals_edit_dd').append(mnu_woall);
			} else {
			} 	
        },
        error: function(request, status, err) {
        }
    });	    
    
    $('.ver').append(ver);
}

function logout() {
	hideMobile();
	$('#logout').trigger("pageshow");
	$('.load_content').show();
	return false;
}

function notice(msg, delay) {
	clearTimeout(notice_timeout);
	$('#notice h5').text(msg);
	$('#notice').fadeIn();
	notice_timeout = setTimeout( function() { $("#notice").fadeOut(); }, delay );
}

function notice_error(msg, delay) {
	clearTimeout(notice_error_timeout);
	$('#notice_error h5').text(msg);
	$('#notice_error').fadeIn();
	notice_error_timeout = setTimeout( function() { $("#notice_error").fadeOut(); }, delay );
}

function showCategory(urlObj, options) {
	if (profile_complete) { stageData(); }

	var category_id = urlObj.hash.replace( /.*category=/, "" );
	if (category_id == "first") {
		is_wizard_firstpage = true;
	}
	
	$('.wizard_stage').hide();
	$('#wizard_category_nav').html("");
	$('#wizard_category_content').html("");

	// get category information
	$.mobile.loading( 'show', {
		text: loading_text,
		textVisible: true,
		theme: 'e',
		html: ""
	});   
	
    $.ajax({
        type: "POST",
        url: uri + "/api/sub_categories.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"], category_id: category_id },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
			
				$('#wizard_cats .h3').html(data.category.Category.category_description);
				if (data.page.WizardPage.page_content) {
					$('#wizard_category_description').html(data.page.WizardPage.page_content);
				}

				cat_txt = "";				
				$.each(data.sub_categories, function(index) {
				
					cat_txt = cat_txt + "<div class='wizard_cat_row' id='wizard_cat_" + data.sub_categories[index].Category.id + "'><div class='wizard_cat_name' >" + data.sub_categories[index].Category.category_description + "</div>";
					cat_txt = cat_txt + "<div class='wizard_cat_buttons'>";
					cat_txt = cat_txt + "<fieldset data-role=\"controlgroup\" data-type=\"horizontal\" data-mini=\"true\">";

					if (data.sub_categories[index].UserCategory.status == "1") {
						cat_txt = cat_txt + "<input data-category_id=\"" + data.sub_categories[index].Category.id + "\" checked id=\"wizard_cat_btn_" + data.sub_categories[index].Category.id + "_1\" name=\"wizard_cat_btn_" + data.sub_categories[index].Category.id + "\" value=\"1\" type=\"radio\"><label for=\"wizard_cat_btn_" + data.sub_categories[index].Category.id + "_1\">Yes</label>";
					} else {
						cat_txt = cat_txt + "<input data-category_id=\"" + data.sub_categories[index].Category.id + "\" id=\"wizard_cat_btn_" + data.sub_categories[index].Category.id + "_1\" name=\"wizard_cat_btn_" + data.sub_categories[index].Category.id + "\" value=\"1\" type=\"radio\"><label for=\"wizard_cat_btn_" + data.sub_categories[index].Category.id + "_1\">Yes</label>";
					}
					
					if (data.sub_categories[index].UserCategory.status == "0") {
						cat_txt = cat_txt + "<input data-category_id=\"" + data.sub_categories[index].Category.id + "\" checked id=\"wizard_cat_btn_" + data.sub_categories[index].Category.id + "_0\" name=\"wizard_cat_btn_" + data.sub_categories[index].Category.id + "\" value=\"0\" type=\"radio\"><label for=\"wizard_cat_btn_" + data.sub_categories[index].Category.id + "_0\">No</label>";
					} else {
						cat_txt = cat_txt + "<input data-category_id=\"" + data.sub_categories[index].Category.id + "\" id=\"wizard_cat_btn_" + data.sub_categories[index].Category.id + "_0\" name=\"wizard_cat_btn_" + data.sub_categories[index].Category.id + "\" value=\"0\" type=\"radio\"><label for=\"wizard_cat_btn_" + data.sub_categories[index].Category.id + "_0\">No</label>";
					}
					cat_txt = cat_txt + "</fieldset></div></div>";
				});

				$('#wizard_category_content').html(cat_txt);

				// create navigation.. 
				nav = "";
				if ( (data.page.WizardPage.prev_page) && (!is_wizard_firstpage) ) {
					nav = nav + '<a href="' + data.page.WizardPage.prev_page + '" data-transition="fade" data-role="button">&lt;&lt; BACK</a>';
				}
				if (data.page.WizardPage.next_page) {
					nav = nav + '<a href="' + data.page.WizardPage.next_page + '" data-transition="fade" data-role="button">NEXT &gt;&gt;</a>';
				}
				$('#wizard_category_nav').html(nav);
				$('.wizard_stage').trigger('create');
				$('.wizard_stage').fadeIn();
				
			    hideMobile();
                gaPlugin.trackPage(successHandler, errorHandler, "/app/wizard/category/"+category_id);
            	$.mobile.changePage("#wizard_cats", {transition: "fade"}); 

			} else {
				hideMobile();
				notice(generic_error, 5000);			
			}
        },
        error: function(request, status, err) {
			notice(specific_error + err, 5000);
        	logout();
        }
    });
}

function slideHome() {
	$('#home .ua-header').show();
	$('#subhome .ua-header').hide();
}

function slideSubHome() {
	$('#cathome .ua-header').hide();
	$('.cat_page').hide();
	$('#subhome .ua-header').show();
}

function stageData(cat_id) {
    $.ajax({
        type: "POST",
        url: uri + "/api/my_categories.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"] },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			bootstrapped = true;
		    hideMobile();
			if (data.status.status_code == "200") {
				data_menu = data.categories;
				
				localStorage["data_menu"] = data.categories;
				localStorage["new_check_age"] = data.status.new_check_age;
				
				var overall_new = 0;
				var cats = "";
				var highlighted_cats = "";
				$.each(data.categories, function(index) {
				
					highlighted = false;
					row_style = "category_row_off";
					interest_txt = "You have not shown any interest in this area";
					
					highlighted_total = 0;
					
					// check child cats real quick, if any are flagged, they need to be blue..
					$.each(data.categories[index].ChildCategory, function(idx) {
						if (data.categories[index].ChildCategory[idx].UserCategory.status == "1") {
							highlighted = true;
							row_style = "category_row_on";
							highlighted_total = highlighted_total + data.categories[index].ChildCategory[idx].count_new;
						}						
					});
					
					if (highlighted) {
						if ( (highlighted_total > 0) ) {
							if (highlighted_total == 1) { append = ""; } else { append = "s"; }
							interest_txt = highlighted_total + " new item" + append + " in the last " + data.status.new_check_age + " days";					
						} else {
							interest_txt = "Nothing new in the last " + data.status.new_check_age + " days";
						}
						overall_new = overall_new + highlighted_total;
					}

					if (highlighted) {
						highlighted_cats = highlighted_cats + "<div data-code='" + data.categories[index].Category.category_code + "' data-id='" + data.categories[index].Category.id + "' class='root_category category_row " + row_style + "'><h4>" + data.categories[index].Category.category_description + "</h4><div class='my_cat_info'>" + interest_txt + "</div></div>";
					} else {
						cats = cats + "<div data-code='" + data.categories[index].Category.category_code + "' data-id='" + data.categories[index].Category.id + "' class='root_category category_row " + row_style + "'><h4>" + data.categories[index].Category.category_description + "</h4><div class='my_cat_info'>" + interest_txt + "</div></div>";
					}
					
				});	
				
/*
				if ( (device.platform == "iPhone") || (device.platform == "iPhone Simulator") ) {
					window.plugins.badge.clear();
					window.plugins.badge.set(900);
					if (overall_new > 0) {
						localStorage['badge_count'] = overall_new;
						if (localStorage["tog_showbadgecount"] == 0) {
						} else {
							window.plugins.badge.set(overall_new);
						}
					}
				}
*/

				$('#home_categories').html(highlighted_cats + cats);
				$("#home_categories").trigger("create");

				//switchToggles();				
				
				if (cat_id) {
					buildSubcat(cat_id);
				}
				
			} else {
				logout();
			} 	
        },
        error: function(request, status, err) {
			bootstrapped = true;
			hideMobile();
			notice(specific_error + err, 5000);						
        }
    });
	return true;
}

function successHandler(result) {
}

function switchToggles() {

/*
	if ( (device.platform == "iPhone") || (device.platform == "iPhone Simulator") ) {

		// load toggle switches for preferences..
		if (localStorage["tog_showbadgecount"] == 0) {
			$('#tog_badge').val('off').slider('refresh');
		} else {
			$('#tog_badge').val('on').slider('refresh');
		}
	
		$('.toggles').show();
	}
*/

}

function userLogin(user, hash) {

    $.ajax({
        type: "POST",
        url: uri + "/api/user_set.json?ts=" + (new Date).getTime(),
        data: { user: user, hash: hash },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
			} else {
	            navigator.notification.alert("A general error occurred.\nPlease try again.", function() {});
				logout();
			} 	
        },
        error: function(request, status, err) {
            navigator.notification.alert("A general error occurred.\nPlease try again.", function() {});
			logout();
        }
    });
}

function userLogout() {
    $.ajax({
        type: "POST",
        url: uri + "/api/user_logout.json?ts=" + (new Date).getTime(),
        data: { user: localStorage["userid"], hash: localStorage["password_hash"] },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
			if (data.status.status_code == "200") {
			} else {
			} 	
        },
        error: function(request, status, err) {
        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BUILDER FUNCTIONS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function build_interruptor(d) {

	h = "";
	h = h + "<div class='interrupt'>";
	h = h + "<form action=''>";
	h = h + "<span class='interrupt_text'>Interested in this category?<br /><span class='interrupt_parent_category'>" + d.parent_category.Category.category_description + "</span> - \"" + d.category.Category.category_description + "\"</span>";
	h = h + "<div class='interrupt_btns' data-role='fieldcontain'  data-theme='c'><fieldset data-role='controlgroup' data-type='horizontal' data-mini='true'>";
	
	if (d.user_category.UserCategory.status == 1) {
		h = h + "<input class='interrupt_btn' data-action='1' data-parent_category_id='" + d.parent_category.Category.id + "' data-category_id='" + d.category.Category.id + "' id='interrupt_rdo_1' name='interruptor_btn' checked value='Yes' type='radio' /><label class='interrupt_btn' for='interrupt_rdo_1'>Yes</label>";
	} else {
		h = h + "<input class='interrupt_btn' data-action='1' data-parent_category_id='" + d.parent_category.Category.id + "' data-category_id='" + d.category.Category.id + "' id='interrupt_rdo_1' name='interruptor_btn' value='Yes' type='radio' /><label class='interrupt_btn' for='interrupt_rdo_1'>Yes</label>";
	}
	if (d.user_category.UserCategory.status == 0) {
		h = h + "<input class='interrupt_btn' data-action='0' data-parent_category_id='" + d.parent_category.Category.id + "' data-category_id='" + d.category.Category.id + "' id='interrupt_rdo_2' name='interruptor_btn' checked value='No' type='radio' /><label class='interrupt_btn' for='interrupt_rdo_2'>No</label>";
	} else {
		h = h + "<input class='interrupt_btn' data-action='0' data-parent_category_id='" + d.parent_category.Category.id + "' data-category_id='" + d.category.Category.id + "' id='interrupt_rdo_2' name='interruptor_btn' value='No' type='radio' /><label class='interrupt_btn' for='interrupt_rdo_2'>No</label>";
	}
	h = h + "</fieldset>";
	h = h + "</div></form></div>";
	return h;
}

function build_goal_row(d, t) {
	h = "";
	h = h + "<div data-id='" + d.UserGoal.id  + "' id='my_goal_" + d.UserGoal.id + "' class='goal_element_row'>";
	h = h + "<div class='goal_info'>";
	h = h + "<div class='goal_content'>" + d.UserGoal.goal_content + "</div>";
	h = h + "<div class='goal_category'>Related to: " + d.ParentCategory.category_description + " - \"" + d.Category.category_description + "\"</div>";
	if (t == "current") {
		h = h + "<div class='goal_created_content'>GOAL CREATED " + d.UserGoal.custom_created + "</div>";		
		h = h + "<input type='button' data-id='" + d.UserGoal.id  + "' id='complete_goal' data-role='button' data-inline='true' data-theme='f' data-mini='true' value='GOAL COMPLETED' />";	
	} else {
		h = h + "<div class='goal_completed_content'>GOAL COMPLETED " + d.UserGoal.custom_completed + "</div>";		
	}
	h = h + "</div>";

	h = h + "<div class='goal_actions'>";
	if (t == "current") {
		h = h + "<div data-id='" + d.UserGoal.id + "' class='goal_edit goal_action_" + d.UserGoal.id + " goal_element_row_icon uaicon edit'></div>";
	}
	h = h + "<div data-id='" + d.UserGoal.id + "' class='goal_delete goal_action_" + d.UserGoal.id + " goal_element_row_icon uaicon delete'></div>";
	h = h + "</div>";
	
	h = h + "</div>";
	return h;
}

function build_favorites_inspiration_row(d) {

	flags = "";
	removed = "";
	if (d.resource.status_id == 2) {
		flags = " removed ";
		removed = "<div class='removed_warning'>This item has expired or has been removed.</div>";
	}

	h = "";
	h = h + "<div data-id='" + d.resource.id  + "' id='my_favorite_" + d.resource.id + "' class='row_" + d.category.category_code + " fav_element_row " + flags + "'><div class='results_left'>";
	if (d.resource.is_university_resource == "1") {
		h = h + "<div class='fav_element_row_icon uatall uaicon_type " + d.resource_type.type_name + "'><span class=\"uahighlight\"></span></div>";
	} else {
		h = h + "<div class='fav_element_row_icon uaicon_type " + d.resource_type.type_name + "'><span class=\"uahighlight\"></span></div>";
	}
	h = h + "<div class='fav_element_row_content'>";
	if (d.resource_type.type_name == "inspirational_quote") {
		h = h + "\"" + d.quote.ResourceExtra.extra_value + "\"";
		h = h + "<span class=\"inspired_author\">";
		h = h + d.author.ResourceExtra.extra_value;
		h = h + "</span>";
	}
	if ( (d.resource_type.type_name == "inspirational_video") || (d.resource_type.type_name == "inspirational_audio") ) {
		if (!removed) {
			h = h + "<div class='cat_element_row_website_hdr'><a class=\"cat_element_a cb_call\" href=\"#\" data-href=\"" + d.resource.url + "\">" + d.resource.title + "</a></div>";
		} else {
			h = h + "<div class='cat_element_row_website_hdr'>" + d.resource.title + "</div>";
		}
		h = h + "<div class='cat_element_row_website_desc'>";
		h = h + d.resource.description;
		if (d.resource.is_mobile == "1") {
			h = h + " <span class='mobile_friendly'>(mobile friendly)</span>";
		}
		h = h + removed;
		h = h + "</div></a>";
	}	
	
	h = h + "</div></div><div class='results_right'>"; // results
	h = h + "<div class='uaicon_wrap'>";
	if (!removed) {
		h = h + "<div data-id='" + d.resource.id + "' data-type='i' data-src='myfavorites' class='fav_share fav_action_" + d.resource.id + " fav_element_row_icon uaicon share go_share'></div>";
	}
	h = h + "<div data-id='" + d.resource.id + "' data-type='i' class='fav_delete fav_action_" + d.resource.id + " fav_element_row_icon uaicon delete'></div>";
	h = h + "</div></div></div>";
	return h;
}

function build_favorites_resource_row(d) {

	flags = "";
	removed = "";
	if (d.resource.status_id == 2) {
		flags = " removed ";
		removed = "<div class='removed_warning'>This item has expired or has been removed.</div>";
	}

	h = "";
	h = h + "<div data-id='" + d.resource.id  + "' id='my_favorite_" + d.resource.id + "' class='row_" + d.category.category_code + " fav_element_row " + flags + "'><div class='results_left'>";
	if (d.resource.is_university_resource == "1") {
		h = h + "<div class='fav_element_row_icon uatall uaicon_type " + d.resource_type.type_name + "'><span class=\"uahighlight\"></span></div>";
	} else {
		h = h + "<div class='fav_element_row_icon uaicon_type " + d.resource_type.type_name + "'><span class=\"uahighlight\"></span></div>";
	}
	h = h + "<div class='fav_element_row_content'>";
	if (d.resource_type.type_name == "website") {
		if (!removed) {
			h = h + "<div class='cat_element_row_website_hdr'><a class=\"cat_element_a cb_call\" href=\"#\" data-href=\"" + d.resource.url + "\">" + d.resource.title + "</a></div>";
		} else {
			h = h + "<div class='cat_element_row_website_hdr'>" + d.resource.title + "</div>";
		}
		h = h + "<div class='cat_element_row_website_desc'>";
		h = h + d.resource.description;
		if (d.resource.is_mobile == "1") {
			h = h + " <span class='mobile_friendly'>(mobile friendly)</span>";
		}
		h = h + removed;
		h = h + "</div>";
	} else {
		h = h + "<div class='cat_element_row_website_hdr'><a class=\"cat_element_a cb_call\" href=\"#\" data-href=\"" + d.resource.url + "\">" + d.resource.title + "</a></div>";
		h = h + "<div class='cat_element_row_website_desc'>";
		h = h + d.resource.description;
		if (d.resource.is_mobile == "1") {
			h = h + " <span class='mobile_friendly'>(mobile friendly)</span>";
		}
		h = h + removed;
		h = h + "</div>";
	}
	h = h + "</div></div><div class='results_right'>"; // results
	h = h + "<div class='uaicon_wrap'>";
	if (!removed) {
		h = h + "<div data-id='" + d.resource.id + "' data-type='r' data-src='myfavorites' class='fav_share fav_action_" + d.resource.id + " fav_element_row_icon uaicon share go_share'></div>";
	}
	h = h + "<div data-id='" + d.resource.id + "' data-type='r' class='fav_delete fav_action_" + d.resource.id + " fav_element_row_icon uaicon delete'></div>";
	h = h + "</div></div></div>";	
	return h;
}

/** category resource builders **/

function build_inspiration_row(d, type) {

	flags = "";
	prepend = "";
	cats = "";	
	
	if (d[0].really_new == "1") {
		flags += " new_item ";
		prepend = "<span class='flag_new'><i>NEW</i></span> ";
	}
	if (d[0].really_hot == "1") {
		flags += " hot_topic ";
		prepend = "<span class='flag_hot'><i>HOT</i></span> ";
	}

	if (type == "new") {
		$.each(d.categories, function(index) {
			cats += "filter_cat_" + d.categories[index].Category.id + " ";
		});	
	}

	h = "";
	h = h + "<div data-id='" + d.r.id  + "' class='cat_element_row " + flags + cats + "'><div class='results_left'>";
	if (d.r.is_university_resource == "1") {
		h = h + "<div class='cat_element_row_icon uatall uaicon_type " + d.rt.type_name + "'><span class=\"uahighlight\"></span></div>";
	} else {
		h = h + "<div class='cat_element_row_icon uaicon_type " + d.rt.type_name + "'><span class=\"uahighlight\"></span></div>";
	}
	h = h + "<div class='cat_element_row_content'>";
	if (d.rt.type_name == "inspirational_quote") {
		h = h + prepend + "\"" + d[0].quote + "\"";
		h = h + "<span class=\"inspired_author\">";
		h = h + d[0].author;
		h = h + "</span>";
	}
	if ( (d.rt.type_name == "inspirational_video") || (d.rt.type_name == "inspirational_audio") ) {
		h = h + "<div class='cat_element_row_website_hdr'><a class=\"cat_element_a cb_call\" href=\"#\" data-href=\"" + d.r.url + "\">" + prepend + d.r.title + "</a></div>";
		h = h + "<div class='cat_element_row_website_desc'>";
		h = h + d.r.description;
		if (d.r.is_mobile == "1") {
			h = h + " <span class='mobile_friendly'>(mobile friendly)</span>";
		}
		h = h + "</div></a>";
	}
	
	h = h + "</div></div><div class='results_right'>"; // results
	h = h + "<div class='uaicon_wrap'>";
	if (d.uf.id) {
		h = h + "<div data-id='" + d.r.id + "' data-type='i' class='cat_action_" + d.r.id + " cat_element_row_icon uaicon fave fave_on'></div>";
	} else {
		h = h + "<div data-id='" + d.r.id + "' data-type='i' class='cat_action_" + d.r.id + " cat_element_row_icon uaicon fave'></div>";
	}
	h = h + "<div data-id='" + d.r.id + "' data-type='i' data-src='category' class='cat_action_" + d.r.id + " cat_element_row_icon uaicon share go_share'></div>";
	h = h + "<div style='display:none;' class='cat_read_" + d.r.id + " cat_element_markread'><a href='javascript:;' data-role='button' data-inline='true' data-mini='true' data-theme='b'>Read</a></div>";
	h = h + "</div></div></div>";
	
	return h;
}

function build_resource_row(d, type) {

	flags = "";
	prepend = "";
	cats = "";
	
	if (d[0].really_new == "1") {
		flags += " new_item ";
		prepend = "<span class='flag_new'><i>NEW</i></span> ";
	}	
	if (d[0].really_hot == "1") {
		flags += " hot_topic ";
		prepend = "<span class='flag_hot'><i>HOT</i></span> ";
	}
	
	if (type == "new") {
		$.each(d.categories, function(index) {
			cats += "filter_cat_" + d.categories[index].Category.id + " ";
		});	
	}

	h = "";
	h = h + "<div data-id='" + d.r.id  + "' class='cat_element_row " + flags + cats + "'><div class='results_left'>";
	if (d.r.is_university_resource == "1") {
		h = h + "<div class='cat_element_row_icon uatall uaicon_type " + d.rt.type_name + "'><span class=\"uahighlight\"></span></div>";
	} else {
		h = h + "<div class='cat_element_row_icon uaicon_type " + d.rt.type_name + "'><span class=\"uahighlight\"></span></div>";
	}
	
	h = h + "<div class='cat_element_row_content'>";
	if (d.rt.type_name == "website") {
		h = h + "<div class='cat_element_row_website_hdr'><a class=\"cat_element_a cb_call\" href=\"#\" data-href=\"" + d.r.url + "\">" + prepend + d.r.title + "</a></div>";
		h = h + "<div class='cat_element_row_website_desc'>";
		h = h + d.r.description;
		if (d.r.is_mobile == "1") {
			h = h + " <span class='mobile_friendly'>(mobile friendly)</span>";
		}
		h = h + "</div></a>";
	} else {
		h = h + "<div class='cat_element_row_website_hdr'><a class=\"cat_element_a cb_call\" href=\"#\" data-href=\"" + d.r.url + "\">" + prepend + d.r.title + "</a></div>";
		h = h + "<div class='cat_element_row_website_desc'>";
		h = h + d.r.description;
		if (d.r.is_mobile == "1") {
			h = h + " <span class='mobile_friendly'>(mobile friendly)</span>";
		}
		h = h + "</div></a>";
	}

	h = h + "</div></div><div class='results_right'>"; // results
	h = h + "<div class='uaicon_wrap'>";
	
	if (d.uf.id) {
		h = h + "<div data-id='" + d.r.id + "' data-type='r' class='cat_action_" + d.r.id + " cat_element_row_icon uaicon fave fave_on'></div>";
	} else {
		h = h + "<div data-id='" + d.r.id + "' data-type='r' class='cat_action_" + d.r.id + " cat_element_row_icon uaicon fave'></div>";
	}
	h = h + "<div data-id='" + d.r.id + "' data-type='r' data-src='category' class='cat_action_" + d.r.id + " cat_element_row_icon uaicon share go_share'></div>";
	h = h + "<div style='display:none;' class='cat_read_" + d.r.id + " cat_element_markread'><a href='javascript:;' data-role='button' data-inline='true' data-mini='true' data-theme='b'>Read</a></div>";
	h = h + "</div></div></div>";	
	return h;
}


function build_myevents_row(d) {

	flags = "";
	removed = "";
	cats = "";

	if (d.event.expired == 1) {
		flags = " removed ";
		removed = "<div class='removed_warning'>This item has expired or has been removed.</div>";
	}
	
	$.each(d.categories, function(index) {
		cats += "myevent_cat_" + d.categories[index].category_id + " ";
	});	
	
	h = "<div class='myevents_row_overall " + cats + flags + "'>";
	h = h + "<div data-id='" + d.event.id  + "' id='myevent_" + d.event.id + "' class='myevents_element_row'><div class='results_left'>";
	h = h + "<div data-id='" + d.event.id + "' data-type='myevents_' class='element_event_cal toggle_more'><div class='calendarrow'><div class='themonth m" + d.special.month + "'><span></span></div><div class='theday d" + d.special.day + "'></div></div></div>";
	h = h + "<div class='element_event_info'>";					
	h = h + "<div data-id='" + d.event.id + "' data-type='myevents_' class='element_event_title toggle_more'>";					
	h = h + d.event.event_name;	
	h = h + "</div>";
	h = h + "<div class='element_event_desc'>";					
	if (d.event.title) {
		h = h + d.event.title + "<br/>";	
	}
	if (d.event.event_type) {
		h = h + "<div class='element_event_type'>(";
		h = h + d.event.event_type;		
		h = h + ")</div>";
	}
	h = h + "<div class='element_event_locations'>";
	first = 0;
	$.each(d.spaces, function(ix) {
		if (first == 0) {
			h = h + "<div class='element_event_location'>" + d.spaces[ix].formal_name + "</div>";
			first = 1;
		}
	});
	h = h + "</div>";
	
	h = h + "<div class='element_event_datetime'>";
	if (d.special.formatted_start_day == d.special.formatted_end_day) {
		h = h + d.special.formatted_start + " to " + d.special.formatted_end_time;	
	} else {
		h = h + d.special.formatted_start + " to " + d.special.formatted_end;	
	}
	h = h + "</div>";
	h = h + removed;
	h = h + "</div>";
	h = h + "</div>";
	h = h + "</div><div class='results_right'>"; // results

	h = h + "<div class='uaicon_wrap'>";
	if (!removed) {
		h = h + "<div data-id='" + d.event.id + "' data-type='e' data-src='myevents' class='cat_action_" + d.event.id + " myevents_element_row_icon uaicon share go_share'></div>";
	}
	if ( (device.platform == "iPhone") || (device.platform == "iPhone Simulator") ) {
		if (!removed) {
			h = h + "<div data-id='" + d.event.id + "' class='cat_action_" + d.event.id + " myevents_element_row_icon uaicon add_ical'></div>";
		}
	}
	h = h + "<div data-id='" + d.event.id + "' class='cat_action_" + d.event.id + " myevents_element_row_icon uaicon myevents_delete delete'></div>";
	h = h + "</div></div>";
	h = h + "</div>"; // /results

	if (!removed) {
		h = h + "<div id='myevents_event_details_" + d.event.id + "' data-id='" + d.event.id + "' class='element_event_details' style='display:none;'>";
		if (d.event.description) {
			h = h + "<div class='element_event_details_description_lbl'>Description:</div>";
			h = h + "<div class='element_event_details_description'>";
			h = h + d.event.description;
			h = h + "</div>";	
		}
		if (d.event.event_locator) {
			h = h + "<div class='element_event_details_lineitem'><b>Reference:</b> " + d.event.event_locator + "</div>";	
		}
		if (d.event.organization_title) {
			h = h + "<div class='element_event_details_lineitem'><b>Organization:</b> " + d.event.organization_title + "</div>";	
		} else {
			if (d.event.organization_name) {
				h = h + "<div class='element_event_details_lineitem'><b>Organization:</b> " + d.event.organization_name + "</div>";	
			}
		}
		if (d.event.attendee_count) {
			h = h + "<div class='element_event_details_lineitem'><b>Head Count:</b> " + d.event.attendee_count + "</div>";	
		}
		h = h + "</div>";	
		h = h + "<div data-id='" + d.event.id + "' id='myevents_event_toggle_" + d.event.id + "' data-type='myevents_' class='element_event_details_toggle'>+ MORE</div>";
	}
	
	h = h + "</div></div>";	
	return h;
}


function build_event_row(d, type) {

	flags = "";
	prepend = "";
	cats = "";
	
	if (d[0].really_new == "1") {
		flags += " new_item ";
		prepend = "<span class='flag_new'><i>NEW</i></span> ";
	}
	
	if (type == "new") {
		$.each(d.categories, function(index) {
			cats += "filter_cat_" + d.categories[index].Category.id + " ";
		});	
	}

	h = "";
	h = h + "<div data-id='" + d.e.id  + "' class='cat_element_row " + flags + cats + "'><div class='results_left'>";
	h = h + "<div data-id='" + d.e.id + "' data-type='search_' class='element_event_cal toggle_more'><div class='calendarrow'><div class='themonth m" + d[0].month + "'><span></span></div><div class='theday d" + d[0].day + "'></div></div></div>";
	h = h + "<div class='element_event_info'>";					
	h = h + "<div data-id='" + d.e.id + "' data-type='search_' class='element_event_title toggle_more'>";					
	h = h + prepend + d.e.event_name;	
	h = h + "</div>";
	h = h + "<div class='element_event_desc'>";					
	if (d.e.title) {
		h = h + d.e.title + "<br/>";	
	}
	if (d.e.event_type) {
		h = h + "<div class='element_event_type'>(";
		h = h + d.e.event_type;		
		h = h + ")</div>";
	}
	h = h + "<div class='element_event_locations'>";
	first = 0;
	$.each(d.es, function(ix) {
		if (first == 0) {
			h = h + "<div class='element_event_location'>" + d.es[ix].event_spaces.formal_name + "</div>";
			first = 1;
		}
	});
	h = h + "</div>";
	
	h = h + "<div class='element_event_datetime'>";
	if (d[0].formatted_start_day == d[0].formatted_end_day) {
		h = h + d[0].formatted_start + " to " + d[0].formatted_end_time;	
	} else {
		h = h + d[0].formatted_start + " to " + d[0].formatted_end;	
	}
	h = h + "</div>";
	h = h + "</div>";
	h = h + "</div>";
	h = h + "</div><div class='results_right'>"; // results
	h = h + "<div class='uaicon_wrap'>";
	if (d.ue.id) {
		h = h + "<div data-id='" + d.e.id + "' data-type='e' class='cat_action_" + d.e.id + " cat_element_row_icon uaicon event_toggle event event_on'></div>";
	} else {
		h = h + "<div data-id='" + d.e.id + "' data-type='e' class='cat_action_" + d.e.id + " cat_element_row_icon uaicon event_toggle event'></div>";
	}
	if ( (device.platform == "iPhone") || (device.platform == "iPhone Simulator") ) {
		h = h + "<div data-id='" + d.e.id + "' class='cat_action_" + d.e.id + " cat_element_row_icon uaicon add_ical'></div>";
	}
	h = h + "<div data-id='" + d.e.id + "' data-type='e' data-src='category' class='cat_action_" + d.e.id + " cat_element_row_icon uaicon share go_share'></div>";

	h = h + "</div></div>";
	h = h + "</div>"; // /results

	h = h + "<div id='search_event_details_" + d.e.id + "' data-id='" + d.e.id + "' class='element_event_details' style='display:none;'>";
	if (d.e.description) {
		h = h + "<div class='element_event_details_description_lbl'>Description:</div>";
		h = h + "<div class='element_event_details_description'>";
		h = h + d.e.description;
		h = h + "</div>";	
	}
	if (d.e.event_locator) {
		h = h + "<div class='element_event_details_lineitem'><b>Reference:</b> " + d.e.event_locator + "</div>";	
	}
	if (d.e.organization_title) {
		h = h + "<div class='element_event_details_lineitem'><b>Organization:</b> " + d.e.organization_title + "</div>";	
	} else {
		if (d.e.organization_name) {
			h = h + "<div class='element_event_details_lineitem'><b>Organization:</b> " + d.e.organization_name + "</div>";	
		}
	}
	if (d.e.attendee_count) {
		h = h + "<div class='element_event_details_lineitem'><b>Head Count:</b> " + d.e.attendee_count + "</div>";	
	}
	h = h + "</div>";	
	h = h + "<div data-id='" + d.e.id + "' id='search_event_toggle_" + d.e.id + "' data-type='search_' class='element_event_details_toggle " + cats + "'>+ MORE</div>";

	h = h + "</div>";	
	return h;
}


/** search builders **/

function build_search_inspiration_row(d) {

	flags = "";
	prepend = "";
	
	if (d[0].really_new == "1") {
		flags += " new_item ";
		prepend = "<span class='flag_new'><i>NEW</i></span> ";
	}
	if (d[0].really_hot == "1") {
		flags += " hot_topic ";
		prepend = "<span class='flag_hot'><i>HOT</i></span> ";
	}
	
	h = "";
	h = h + "<div data-id='" + d.r.id  + "' id='search_" + d.r.id + "' class='search_element_row " + flags + "'><div class='results_left'>";
	if (d.r.is_university_resource == "1") {
		h = h + "<div class='search_element_row_icon uatall uaicon_type " + d.rt.type_name + "'><span class=\"uahighlight\"></span></div>";
	} else {
		h = h + "<div class='search_element_row_icon uaicon_type " + d.rt.type_name + "'><span class=\"uahighlight\"></span></div>";
	}
	h = h + "<div class='search_element_row_content'>";
	if (d.rt.type_name == "inspirational_quote") {
		h = h + prepend + "\"" + d[0].quote + "\"";
		h = h + "<span class=\"inspired_author\">";
		h = h + d[0].author;
		h = h + "</span>";
	}
	h = h + "</div></div><div class='results_right'>"; // results
	h = h + "<div class='uaicon_wrap'>";
	if (d.uf.id) {
		h = h + "<div data-id='" + d.r.id + "' data-type='i' class='cat_action_" + d.r.id + " cat_element_row_icon uaicon fave fave_on'></div>";
	} else {
		h = h + "<div data-id='" + d.r.id + "' data-type='i' class='cat_action_" + d.r.id + " cat_element_row_icon uaicon fave'></div>";
	}
	h = h + "<div data-id='" + d.r.id + "' data-type='i' data-src='search' class='cat_action_" + d.r.id + " cat_element_row_icon uaicon share go_share'></div>";
	h = h + "</div></div></div>";
	return h;
}

function build_search_resource_row(d) {

	flags = "";
	prepend = "";

	if (d[0].really_new == "1") {
		flags += " new_item ";
		prepend = "<span class='flag_new'><i>NEW</i></span> ";
	}
	if (d[0].really_hot == "1") {
		flags += " hot_topic ";
		prepend = "<span class='flag_hot'><i>HOT</i></span> ";
	}
	
	h = "";
	h = h + "<div data-id='" + d.r.id  + "' id='search_" + d.r.id + "' class='search_element_row " + flags + "'><div class='results_left'>";
	if (d.r.is_university_resource == "1") {
		h = h + "<div class='search_element_row_icon uatall uaicon_type " + d.rt.type_name + "'><span class=\"uahighlight\"></span></div>";
	} else {
		h = h + "<div class='search_element_row_icon uaicon_type " + d.rt.type_name + "'><span class=\"uahighlight\"></span></div>";
	}
	h = h + "<div class='search_element_row_content'>";
	if (d.rt.type_name == "website") {
		h = h + "<div class='cat_element_row_website_hdr'><a class=\"cat_element_a cb_call\" href=\"#\" data-href=\"" + d.r.url + "\">" + prepend + d.r.title + "</a></div>";
		h = h + "<div class='cat_element_row_website_desc'>";
		h = h + d.r.description;
		if (d.r.is_mobile == "1") {
			h = h + " <span class='mobile_friendly'>(mobile friendly)</span>";
		}
		h = h + "</div></a>";
	} else {
		h = h + "<div class='cat_element_row_website_hdr'><a class=\"cat_element_a cb_call\" href=\"#\" data-href=\"" + d.r.url + "\">" + prepend + d.r.title + "</a></div>";
		h = h + "<div class='cat_element_row_website_desc'>";
		h = h + d.r.description;
		if (d.r.is_mobile == "1") {
			h = h + " <span class='mobile_friendly'>(mobile friendly)</span>";
		}
		h = h + "</div></a>";
	}
	h = h + "</div></div><div class='results_right'>"; // results
	h = h + "<div class='uaicon_wrap'>";
	if (d.uf.id) {
		h = h + "<div data-id='" + d.r.id + "' data-type='r' class='cat_action_" + d.r.id + " cat_element_row_icon uaicon fave fave_on'></div>";
	} else {
		h = h + "<div data-id='" + d.r.id + "' data-type='r' class='cat_action_" + d.r.id + " cat_element_row_icon uaicon fave'></div>";
	}
	h = h + "<div data-id='" + d.r.id + "' data-type='r' data-src='search' class='cat_action_" + d.r.id + " cat_element_row_icon uaicon share go_share'></div>";
	h = h + "</div></div></div>";	
	return h;
}

function build_search_event_row(d) {

	flags = "";
	prepend = "";
	if (d[0].really_new == "1") {
		flags += " new_item ";
		prepend = "<span class='flag_new'><i>NEW</i></span> ";
	}
	
	h = "";
	h = h + "<div data-id='" + d.e.id  + "' id='search_" + d.e.id + "' class='search_element_row " + flags + "'><div class='results_left'>";
	h = h + "<div data-id='" + d.e.id + "' data-type='search_' class='element_event_cal toggle_more'><div class='calendarrow'><div class='themonth m" + d[0].month + "'><span></span></div><div class='theday d" + d[0].day + "'></div></div></div>";
	h = h + "<div class='element_event_info'>";					
	h = h + "<div data-id='" + d.e.id + "' data-type='search_' class='element_event_title toggle_more'>";					
	h = h + prepend + d.e.event_name;	
	h = h + "</div>";
	h = h + "<div class='element_event_desc'>";					
	if (d.e.title) {
		h = h + d.e.title + "<br/>";	
	}

	if (d.e.event_type) {
		h = h + "<div class='element_event_type'>(";
		h = h + d.e.event_type;		
		h = h + ")</div>";
	}
	h = h + "<div class='element_event_locations'>";
	first = 0;
	$.each(d.es, function(ix) {
		if (first == 0) {
			h = h + "<div class='element_event_location'>" + d.es[ix].event_spaces.formal_name + "</div>";
			first = 1;
		}
	});
	h = h + "</div>";
					
	h = h + "<div class='element_event_datetime'>";
	if (d[0].formatted_start_day == d[0].formatted_end_day) {
		h = h + d[0].formatted_start + " to " + d[0].formatted_end_time;	
	} else {
		h = h + d[0].formatted_start + " to " + d[0].formatted_end;	
	}
	h = h + "</div>";
	h = h + "</div>";
	h = h + "</div>";
	h = h + "</div><div class='results_right'>"; // results
	h = h + "<div class='uaicon_wrap'>";
	if (d.ue.id) {
		h = h + "<div data-id='" + d.e.id + "' data-type='e' class='cat_action_" + d.e.id + " cat_element_row_icon uaicon event_toggle event event_on'></div>";
	} else {
		h = h + "<div data-id='" + d.e.id + "' data-type='e' class='cat_action_" + d.e.id + " cat_element_row_icon uaicon event_toggle event'></div>";
	}
	if ( (device.platform == "iPhone") || (device.platform == "iPhone Simulator") ) {
		h = h + "<div data-id='" + d.e.id + "' class='cat_action_" + d.e.id + " cat_element_row_icon uaicon add_ical'></div>";
	}
	h = h + "<div data-id='" + d.e.id + "' data-type='e' data-src='search' class='cat_action_" + d.e.id + " cat_element_row_icon uaicon share go_share'></div>";
	h = h + "</div></div>";
	h = h + "</div>"; // /results

	h = h + "<div id='search_event_details_" + d.e.id + "' data-id='" + d.e.id + "' class='element_event_details' style='display:none;'>";
	if (d.e.description) {
		h = h + "<div class='element_event_details_description_lbl'>Description:</div>";
		h = h + "<div class='element_event_details_description'>";
		h = h + d.e.description;
		h = h + "</div>";	
	}
	if (d.e.event_locator) {
		h = h + "<div class='element_event_details_lineitem'><b>Reference:</b> " + d.e.event_locator + "</div>";	
	}
	if (d.e.organization_title) {
		h = h + "<div class='element_event_details_lineitem'><b>Organization:</b> " + d.e.organization_title + "</div>";	
	} else {
		if (d.e.organization_name) {
			h = h + "<div class='element_event_details_lineitem'><b>Organization:</b> " + d.e.organization_name + "</div>";	
		}
	}
	if (d.e.attendee_count) {
		h = h + "<div class='element_event_details_lineitem'><b>Head Count:</b> " + d.e.attendee_count + "</div>";	
	}
	h = h + "</div>";	
	h = h + "<div data-id='" + d.e.id + "' id='search_event_toggle_" + d.e.id + "' data-type='search_' class='element_event_details_toggle'>+ MORE</div>";

	h = h + "</div>";	
	return h;
}


//
// Cordova Calendar Plugin
// Author: Felix Montanez 
// Created: 01-17-2012
//
// Contributors:
// Michael Brooks

function calendarPlugin() {
}

calendarPlugin.prototype.createEvent = function(title,location,notes,startDate,endDate,reminderMinutes,success,fail) {
    console.log("calendarPlugin.createEvent");
    cordova.exec(success,fail,"calendarPlugin","createEvent", [title,location,notes,startDate,endDate,reminderMinutes]);
};

// More methods will need to be added like fetch events, delete event, edit event

calendarPlugin.install = function()
{
    if(!window.plugins)
    {
        window.plugins = {};
    }
    
    window.plugins.calendarPlugin = new calendarPlugin();
    return window.plugins.calendarPlugin;
};

cordova.addConstructor(calendarPlugin.install);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SETTINGS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function appDeviceReady(){document.addEventListener("backbutton",appBack,!1);document.addEventListener("offline",appOffline,!1);document.addEventListener("online",appOnline,!1);document.addEventListener("resume",appResume,!1);cb=window.plugins.childBrowser;cb.onClose=childBrowserClosed;gaPlugin=window.plugins.gaPlugin;calPlugin=window.plugins.calendarPlugin;gaPlugin.init(successHandler,errorHandler,"UA-1921663-14",10);$("#loginForm").on("submit",handleLogin);checkPreAuth();loadOnce()}function appBack(e){if($.mobile.activePage.is("#home")||$.mobile.activePage.is("#login")){e.preventDefault();navigator.app.exitApp()}else{if($.mobile.activePage.is("#cathome")){$("#home .ua-header").hide();$("#subhome .ua-header").show()}else if($.mobile.activePage.is("#subhome")){$("#subhome .ua-header").hide();$("#home .ua-header").show()}navigator.app.backHistory()}}function appOffline(){notice_error("You've gone offline... check connection",9e6)}function appOnline(){$("#notice_error").fadeOut()}function appResume(){(device.platform=="iPhone"||device.platform=="iPhone Simulator")&&window.plugins.badge.clear();stageData()}function buildSubcat(e){var t="",n="";$.each(data_menu,function(r){if(data_menu[r].Category.id==e){$.each(data_menu[r].ChildCategory,function(e){highlighted=!1;row_style="category_row_off";interest_txt="You have not shown any interest in this area";if(data_menu[r].ChildCategory[e].UserCategory.status=="1"){row_style="category_row_on";highlighted_total=data_menu[r].ChildCategory[e].count_new;if(highlighted_total>0){highlighted_total==1?append="":append="s";interest_txt=highlighted_total+" new item"+append+" in the last "+localStorage.new_check_age+" days"}else interest_txt="Nothing new in the last "+localStorage.new_check_age+" days";highlighted=!0}highlighted?n=n+"<div data-code='"+data_menu[r].ChildCategory[e].category_code+"' data-id='"+data_menu[r].ChildCategory[e].id+"' class='sub_category category_row "+row_style+"'><h4>"+data_menu[r].ChildCategory[e].category_description+"</h4><div class='my_cat_info'>"+interest_txt+"</div></div>":t=t+"<div data-code='"+data_menu[r].ChildCategory[e].category_code+"' data-id='"+data_menu[r].ChildCategory[e].id+"' class='sub_category category_row "+row_style+"'><h4>"+data_menu[r].ChildCategory[e].category_description+"</h4><div class='my_cat_info'>"+interest_txt+"</div></div>"});$("#subhome .h3").html(data_menu[r].Category.category_description)}});$("#subhome_categories").html(n+t);$("#subhome_categories").trigger("create")}function checkPreAuth(){var e=$("#loginForm");if(localStorage["username"]!=undefined&&localStorage["password"]!=undefined){$(".load_content").hide();$("#username",e).val(localStorage.username);$("#password",e).val(localStorage.password);handleLogin()}else $(".load_content").show();$(".ret, .ret_pullstring").retina()}function childBrowserClosed(){}function createEvent(e,t,n,r,i){var s=60;calPlugin.createEvent(e,t,n,r,i,s,function(){notice("Event has been added to your calendar",3500)},function(e){})}function errorHandler(e){}function goSearch(e,t){$.mobile.loading("show",{text:searching_text,textVisible:!0,theme:"e",html:""});$(".search_tab").removeClass("search_tab_on");$(".search_tab").hide();$(".search_data").hide();$(".search_nothing").hide();inspirations="";inspirations_cnt=0;resources="";resources_cnt=0;events="";events_cnt=0;turned_on=!1;$.ajax({type:"POST",url:uri+"/api/search.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,category_code:t,keywords:e},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){$.each(e.resources,function(t){resources+=build_search_resource_row(e.resources[t]);resources_cnt++});$.each(e.inspirations,function(t){inspirations+=build_search_inspiration_row(e.inspirations[t]);inspirations_cnt++});$.each(e.events,function(t){events+=build_search_event_row(e.events[t]);events_cnt++});if(events){e.totals.events>events_cnt&&(events=events+"<div class='cat_action_more search_more_e'><input type='button' class='search_more' data-type='e' data-current='"+events_cnt+"' value='Load More' /></div>");$("#search_events_data_inner .search_data_nothing").hide();$("#search_events_data_inner").html(events);$("#search_events_data_inner").trigger("create");if(!turned_on){$("#search_events_tab").show();$("#events_search_data").show();$("#search_events_tab").addClass("search_tab_on");turned_on=!0}else $("#search_events_tab").show()}if(resources){e.totals.resources>resources_cnt&&(resources=resources+"<div class='cat_action_more search_more_r'><input type='button' class='search_more' data-type='r' data-current='"+resources_cnt+"' value='Load More' /></div>");$("#search_resources_data_inner .search_data_nothing").hide();$("#search_resources_data_inner").html(resources);$("#search_resources_data_inner").trigger("create");if(!turned_on){$("#search_resources_tab").show();$("#resources_search_data").show();$("#search_resources_tab").addClass("search_tab_on");turned_on=!0}else $("#search_resources_tab").show()}if(inspirations){e.totals.inspirations>inspirations_cnt&&(inspirations=inspirations+"<div class='cat_action_more search_more_i'><input type='button' class='search_more' data-type='i' data-current='"+inspirations_cnt+"' value='Load More' /></div>");$("#search_inspiration_data_inner .search_data_nothing").hide();$("#search_inspiration_data_inner").html(inspirations);$("#search_inspiration_data_inner").trigger("create");if(!turned_on){$("#search_inspiration_tab").show();$("#inspiration_search_data").show();$("#search_inspiration_tab").addClass("search_tab_on");turned_on=!0}else $("#search_inspiration_tab").show()}turned_on||$(".search_nothing").show();hideMobile()}else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}})}function handleLogin(){(device.platform=="iPhone"||device.platform=="iPhone Simulator")&&window.plugins.badge.clear();$("#password").blur();$.mobile.loading("show",{text:"Logging In",textVisible:!0,theme:"e",html:""});var e=$("#loginForm");$("#submitButton",e).attr("disabled","disabled");var t=$("#username",e).val(),n=$("#password",e).val();if(t!=""&&n!=""){$.ajax({type:"POST",url:uri+"/api/authenticate.json?ts="+(new Date).getTime(),data:{user_id:t,password:n},dataType:"json",timeout:1e4,success:function(e){if(e.ua.status.status_code=="200"){localStorage.userid=e.user.user_id;localStorage.password_hash=e.user.password_hash;localStorage.username=t;localStorage.password=n;localStorage.name=e.user.profile.full_name;localStorage.email=e.user.profile.email;userLogin(e.user.user_id,e.user.password_hash);$.ajax({type:"POST",url:uri+"/api/user_preference.json?ts="+(new Date).getTime(),data:{user:e.user.user_id,hash:e.user.password_hash,preference_id:"1"},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){var t=stageData();if(t){profile_complete=!0;gaPlugin.trackPage(successHandler,errorHandler,"/app/login");$.mobile.changePage("#home",{transition:"fade"});notice("Welcome back, "+localStorage.name+"!",4500)}}else{gaPlugin.trackPage(successHandler,errorHandler,"/app/wizard/home");$.mobile.changePage("#wizard_home",{transition:"fade"})}},error:function(e,t,n){$(".load_content").show();logout()}})}else{$(".load_content").show();hideMobile();navigator.notification.alert(e.ua.status.message+"\nPlease try again.",function(){})}},error:function(e,t,n){if(t=="timeout"){$(".load_content").show();hideMobile();navigator.notification.alert("Authentication timed out.\nPlease try again.",function(){})}}});$("#submitButton").removeAttr("disabled")}else{$(".load_content").show();$.mobile.loading("hide");navigator.notification.alert("You must enter a username and password.",function(){});$("#submitButton").removeAttr("disabled")}return!1}function hideMenus(){$(".pullstring").trigger("tap")}function hideMobile(){$.mobile.loading("hide")}function loadGoals(){var e="",t="";$.ajax({type:"POST",url:uri+"/api/my_goals.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash},dataType:"json",timeout:1e4,success:function(n){if(n.status.status_code=="200"){$.each(n.current,function(t){e+=build_goal_row(n.current[t],"current")});$.each(n.completed,function(e){t+=build_goal_row(n.completed[e],"completed")});if(e){e+="<div class='current_goal_data_nothing' style='display:none;'>Nothing found, add some goals!</div>";$("#current_goal_data_inner").html(e);$("#current_goal_data_inner").trigger("create")}else{e+="<div class='current_goal_data_nothing'>Nothing found, add some goals!</div>";$("#current_goal_data_inner").html(e);$("#current_goal_data_inner").trigger("create")}if(t){t+="<div class='completed_goal_data_nothing' style='display:none;'>Nothing found, add some goals!</div>";$("#completed_goal_data_inner").html(t);$("#completed_goal_data_inner").trigger("create")}else{t+="<div class='current_goal_data_nothing'>Nothing found, add some goals!</div>";$("#completed_goal_data_inner").html(t);$("#completed_goal_data_inner").trigger("create")}hideMobile();$(".load_content").show()}else{hideMobile();$(".load_content").show();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();$(".load_content").show();notice(specific_error+n,5e3)}})}function loadOnce(){$.ajax({type:"GET",url:uri+"/api/help.json?ts="+(new Date).getTime(),dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){$("#help_content").html(e.help.Help.content);$("#help_content").trigger("create")}},error:function(e,t,n){}});$.ajax({type:"GET",url:uri+"/api/root_categories.json?ts="+(new Date).getTime(),dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){mnu="";mnu_woall="";is_first_category=!0;$.each(e.categories,function(t){if(!is_first_category){mnu+='</optgroup><optgroup label="'+e.categories[t].Category.category_description+'">';mnu_woall+='</optgroup><optgroup label="'+e.categories[t].Category.category_description+'">'}else{mnu+='<optgroup label="'+e.categories[t].Category.category_description+'">';mnu_woall+='<optgroup label="'+e.categories[t].Category.category_description+'">';is_first_category=!1}mnu+="<option value='"+e.categories[t].Category.category_code+"'>All of '"+e.categories[t].Category.category_description+"'</option>";$.each(e.categories[t].ChildCategory,function(n){mnu+="<option value='"+e.categories[t].ChildCategory[n].category_code+"'>"+e.categories[t].ChildCategory[n].category_description+"</option>";mnu_woall+="<option value='"+e.categories[t].ChildCategory[n].category_code+"'>"+e.categories[t].ChildCategory[n].category_description+"</option>"})});$("#search_dd").append(mnu);$("#my_goals_dd").append(mnu_woall);$("#my_goals_edit_dd").append(mnu_woall)}},error:function(e,t,n){}});$(".ver").append(ver)}function logout(){hideMobile();$("#logout").trigger("pageshow");$(".load_content").show();return!1}function notice(e,t){clearTimeout(notice_timeout);$("#notice h5").text(e);$("#notice").fadeIn();notice_timeout=setTimeout(function(){$("#notice").fadeOut()},t)}function notice_error(e,t){clearTimeout(notice_error_timeout);$("#notice_error h5").text(e);$("#notice_error").fadeIn();notice_error_timeout=setTimeout(function(){$("#notice_error").fadeOut()},t)}function showCategory(e,t){profile_complete&&stageData();var n=e.hash.replace(/.*category=/,"");n=="first"&&(is_wizard_firstpage=!0);$(".wizard_stage").hide();$("#wizard_category_nav").html("");$("#wizard_category_content").html("");$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});$.ajax({type:"POST",url:uri+"/api/sub_categories.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,category_id:n},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){$("#wizard_cats .h3").html(e.category.Category.category_description);e.page.WizardPage.page_content&&$("#wizard_category_description").html(e.page.WizardPage.page_content);cat_txt="";$.each(e.sub_categories,function(t){cat_txt=cat_txt+"<div class='wizard_cat_row' id='wizard_cat_"+e.sub_categories[t].Category.id+"'><div class='wizard_cat_name' >"+e.sub_categories[t].Category.category_description+"</div>";cat_txt+="<div class='wizard_cat_buttons'>";cat_txt+='<fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">';e.sub_categories[t].UserCategory.status=="1"?cat_txt=cat_txt+'<input data-category_id="'+e.sub_categories[t].Category.id+'" checked id="wizard_cat_btn_'+e.sub_categories[t].Category.id+'_1" name="wizard_cat_btn_'+e.sub_categories[t].Category.id+'" value="1" type="radio"><label for="wizard_cat_btn_'+e.sub_categories[t].Category.id+'_1">Yes</label>':cat_txt=cat_txt+'<input data-category_id="'+e.sub_categories[t].Category.id+'" id="wizard_cat_btn_'+e.sub_categories[t].Category.id+'_1" name="wizard_cat_btn_'+e.sub_categories[t].Category.id+'" value="1" type="radio"><label for="wizard_cat_btn_'+e.sub_categories[t].Category.id+'_1">Yes</label>';e.sub_categories[t].UserCategory.status=="0"?cat_txt=cat_txt+'<input data-category_id="'+e.sub_categories[t].Category.id+'" checked id="wizard_cat_btn_'+e.sub_categories[t].Category.id+'_0" name="wizard_cat_btn_'+e.sub_categories[t].Category.id+'" value="0" type="radio"><label for="wizard_cat_btn_'+e.sub_categories[t].Category.id+'_0">No</label>':cat_txt=cat_txt+'<input data-category_id="'+e.sub_categories[t].Category.id+'" id="wizard_cat_btn_'+e.sub_categories[t].Category.id+'_0" name="wizard_cat_btn_'+e.sub_categories[t].Category.id+'" value="0" type="radio"><label for="wizard_cat_btn_'+e.sub_categories[t].Category.id+'_0">No</label>';cat_txt+="</fieldset></div></div>"});$("#wizard_category_content").html(cat_txt);nav="";e.page.WizardPage.prev_page&&!is_wizard_firstpage&&(nav=nav+'<a href="'+e.page.WizardPage.prev_page+'" data-transition="fade" data-role="button">&lt;&lt; BACK</a>');e.page.WizardPage.next_page&&(nav=nav+'<a href="'+e.page.WizardPage.next_page+'" data-transition="fade" data-role="button">NEXT &gt;&gt;</a>');$("#wizard_category_nav").html(nav);$(".wizard_stage").trigger("create");$(".wizard_stage").fadeIn();hideMobile();gaPlugin.trackPage(successHandler,errorHandler,"/app/wizard/category/"+n);$.mobile.changePage("#wizard_cats",{transition:"fade"})}else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){notice(specific_error+n,5e3);logout()}})}function slideHome(){$("#home .ua-header").show();$("#subhome .ua-header").hide()}function slideSubHome(){$("#cathome .ua-header").hide();$(".cat_page").hide();$("#subhome .ua-header").show()}function stageData(e){$.ajax({type:"POST",url:uri+"/api/my_categories.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash},dataType:"json",timeout:1e4,success:function(t){bootstrapped=!0;hideMobile();if(t.status.status_code=="200"){data_menu=t.categories;localStorage.data_menu=t.categories;localStorage.new_check_age=t.status.new_check_age;var n=0,r="",i="";$.each(t.categories,function(e){highlighted=!1;row_style="category_row_off";interest_txt="You have not shown any interest in this area";highlighted_total=0;$.each(t.categories[e].ChildCategory,function(n){if(t.categories[e].ChildCategory[n].UserCategory.status=="1"){highlighted=!0;row_style="category_row_on";highlighted_total+=t.categories[e].ChildCategory[n].count_new}});if(highlighted){if(highlighted_total>0){highlighted_total==1?append="":append="s";interest_txt=highlighted_total+" new item"+append+" in the last "+t.status.new_check_age+" days"}else interest_txt="Nothing new in the last "+t.status.new_check_age+" days";n+=highlighted_total}highlighted?i=i+"<div data-code='"+t.categories[e].Category.category_code+"' data-id='"+t.categories[e].Category.id+"' class='root_category category_row "+row_style+"'><h4>"+t.categories[e].Category.category_description+"</h4><div class='my_cat_info'>"+interest_txt+"</div></div>":r=r+"<div data-code='"+t.categories[e].Category.category_code+"' data-id='"+t.categories[e].Category.id+"' class='root_category category_row "+row_style+"'><h4>"+t.categories[e].Category.category_description+"</h4><div class='my_cat_info'>"+interest_txt+"</div></div>"});$("#home_categories").html(i+r);$("#home_categories").trigger("create");e&&buildSubcat(e)}else logout()},error:function(e,t,n){bootstrapped=!0;hideMobile();notice(specific_error+n,5e3)}});return!0}function successHandler(e){}function switchToggles(){}function userLogin(e,t){$.ajax({type:"POST",url:uri+"/api/user_set.json?ts="+(new Date).getTime(),data:{user:e,hash:t},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code!="200"){navigator.notification.alert("A general error occurred.\nPlease try again.",function(){});logout()}},error:function(e,t,n){navigator.notification.alert("A general error occurred.\nPlease try again.",function(){});logout()}})}function userLogout(){$.ajax({type:"POST",url:uri+"/api/user_logout.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash},dataType:"json",timeout:1e4,success:function(e){e.status.status_code=="200"},error:function(e,t,n){}})}function build_interruptor(e){h="";h+="<div class='interrupt'>";h+="<form action=''>";h=h+"<span class='interrupt_text'>Interested in this category?<br /><span class='interrupt_parent_category'>"+e.parent_category.Category.category_description+'</span> - "'+e.category.Category.category_description+'"</span>';h+="<div class='interrupt_btns' data-role='fieldcontain'  data-theme='c'><fieldset data-role='controlgroup' data-type='horizontal' data-mini='true'>";e.user_category.UserCategory.status==1?h=h+"<input class='interrupt_btn' data-action='1' data-parent_category_id='"+e.parent_category.Category.id+"' data-category_id='"+e.category.Category.id+"' id='interrupt_rdo_1' name='interruptor_btn' checked value='Yes' type='radio' /><label class='interrupt_btn' for='interrupt_rdo_1'>Yes</label>":h=h+"<input class='interrupt_btn' data-action='1' data-parent_category_id='"+e.parent_category.Category.id+"' data-category_id='"+e.category.Category.id+"' id='interrupt_rdo_1' name='interruptor_btn' value='Yes' type='radio' /><label class='interrupt_btn' for='interrupt_rdo_1'>Yes</label>";e.user_category.UserCategory.status==0?h=h+"<input class='interrupt_btn' data-action='0' data-parent_category_id='"+e.parent_category.Category.id+"' data-category_id='"+e.category.Category.id+"' id='interrupt_rdo_2' name='interruptor_btn' checked value='No' type='radio' /><label class='interrupt_btn' for='interrupt_rdo_2'>No</label>":h=h+"<input class='interrupt_btn' data-action='0' data-parent_category_id='"+e.parent_category.Category.id+"' data-category_id='"+e.category.Category.id+"' id='interrupt_rdo_2' name='interruptor_btn' value='No' type='radio' /><label class='interrupt_btn' for='interrupt_rdo_2'>No</label>";h+="</fieldset>";h+="</div></form></div>";return h}function build_goal_row(e,t){h="";h=h+"<div data-id='"+e.UserGoal.id+"' id='my_goal_"+e.UserGoal.id+"' class='goal_element_row'>";h+="<div class='goal_info'>";h=h+"<div class='goal_content'>"+e.UserGoal.goal_content+"</div>";h=h+"<div class='goal_category'>Related to: "+e.ParentCategory.category_description+' - "'+e.Category.category_description+'"</div>';if(t=="current"){h=h+"<div class='goal_created_content'>GOAL CREATED "+e.UserGoal.custom_created+"</div>";h=h+"<input type='button' data-id='"+e.UserGoal.id+"' id='complete_goal' data-role='button' data-inline='true' data-theme='f' data-mini='true' value='GOAL COMPLETED' />"}else h=h+"<div class='goal_completed_content'>GOAL COMPLETED "+e.UserGoal.custom_completed+"</div>";h+="</div>";h+="<div class='goal_actions'>";t=="current"&&(h=h+"<div data-id='"+e.UserGoal.id+"' class='goal_edit goal_action_"+e.UserGoal.id+" goal_element_row_icon uaicon edit'></div>");h=h+"<div data-id='"+e.UserGoal.id+"' class='goal_delete goal_action_"+e.UserGoal.id+" goal_element_row_icon uaicon delete'></div>";h+="</div>";h+="</div>";return h}function build_favorites_inspiration_row(e){flags="";removed="";if(e.resource.status_id==2){flags=" removed ";removed="<div class='removed_warning'>This item has expired or has been removed.</div>"}h="";h=h+"<div data-id='"+e.resource.id+"' id='my_favorite_"+e.resource.id+"' class='row_"+e.category.category_code+" fav_element_row "+flags+"'><div class='results_left'>";e.resource.is_university_resource=="1"?h=h+"<div class='fav_element_row_icon uatall uaicon_type "+e.resource_type.type_name+'\'><span class="uahighlight"></span></div>':h=h+"<div class='fav_element_row_icon uaicon_type "+e.resource_type.type_name+'\'><span class="uahighlight"></span></div>';h+="<div class='fav_element_row_content'>";if(e.resource_type.type_name=="inspirational_quote"){h=h+'"'+e.quote.ResourceExtra.extra_value+'"';h+='<span class="inspired_author">';h+=e.author.ResourceExtra.extra_value;h+="</span>"}if(e.resource_type.type_name=="inspirational_video"||e.resource_type.type_name=="inspirational_audio"){removed?h=h+"<div class='cat_element_row_website_hdr'>"+e.resource.title+"</div>":h=h+'<div class=\'cat_element_row_website_hdr\'><a class="cat_element_a cb_call" href="#" data-href="'+e.resource.url+'">'+e.resource.title+"</a></div>";h+="<div class='cat_element_row_website_desc'>";h+=e.resource.description;e.resource.is_mobile=="1"&&(h+=" <span class='mobile_friendly'>(mobile friendly)</span>");h+=removed;h+="</div></a>"}h+="</div></div><div class='results_right'>";h+="<div class='uaicon_wrap'>";removed||(h=h+"<div data-id='"+e.resource.id+"' data-type='i' data-src='myfavorites' class='fav_share fav_action_"+e.resource.id+" fav_element_row_icon uaicon share go_share'></div>");h=h+"<div data-id='"+e.resource.id+"' data-type='i' class='fav_delete fav_action_"+e.resource.id+" fav_element_row_icon uaicon delete'></div>";h+="</div></div></div>";return h}function build_favorites_resource_row(e){flags="";removed="";if(e.resource.status_id==2){flags=" removed ";removed="<div class='removed_warning'>This item has expired or has been removed.</div>"}h="";h=h+"<div data-id='"+e.resource.id+"' id='my_favorite_"+e.resource.id+"' class='row_"+e.category.category_code+" fav_element_row "+flags+"'><div class='results_left'>";e.resource.is_university_resource=="1"?h=h+"<div class='fav_element_row_icon uatall uaicon_type "+e.resource_type.type_name+'\'><span class="uahighlight"></span></div>':h=h+"<div class='fav_element_row_icon uaicon_type "+e.resource_type.type_name+'\'><span class="uahighlight"></span></div>';h+="<div class='fav_element_row_content'>";if(e.resource_type.type_name=="website"){removed?h=h+"<div class='cat_element_row_website_hdr'>"+e.resource.title+"</div>":h=h+'<div class=\'cat_element_row_website_hdr\'><a class="cat_element_a cb_call" href="#" data-href="'+e.resource.url+'">'+e.resource.title+"</a></div>";h+="<div class='cat_element_row_website_desc'>";h+=e.resource.description;e.resource.is_mobile=="1"&&(h+=" <span class='mobile_friendly'>(mobile friendly)</span>");h+=removed;h+="</div>"}else{h=h+'<div class=\'cat_element_row_website_hdr\'><a class="cat_element_a cb_call" href="#" data-href="'+e.resource.url+'">'+e.resource.title+"</a></div>";h+="<div class='cat_element_row_website_desc'>";h+=e.resource.description;e.resource.is_mobile=="1"&&(h+=" <span class='mobile_friendly'>(mobile friendly)</span>");h+=removed;h+="</div>"}h+="</div></div><div class='results_right'>";h+="<div class='uaicon_wrap'>";removed||(h=h+"<div data-id='"+e.resource.id+"' data-type='r' data-src='myfavorites' class='fav_share fav_action_"+e.resource.id+" fav_element_row_icon uaicon share go_share'></div>");h=h+"<div data-id='"+e.resource.id+"' data-type='r' class='fav_delete fav_action_"+e.resource.id+" fav_element_row_icon uaicon delete'></div>";h+="</div></div></div>";return h}function build_inspiration_row(e,t){flags="";prepend="";cats="";if(e[0].really_new=="1"){flags+=" new_item ";prepend="<span class='flag_new'><i>NEW</i></span> "}if(e[0].really_hot=="1"){flags+=" hot_topic ";prepend="<span class='flag_hot'><i>HOT</i></span> "}t=="new"&&$.each(e.categories,function(t){cats+="filter_cat_"+e.categories[t].Category.id+" "});h="";h=h+"<div data-id='"+e.r.id+"' class='cat_element_row "+flags+cats+"'><div class='results_left'>";e.r.is_university_resource=="1"?h=h+"<div class='cat_element_row_icon uatall uaicon_type "+e.rt.type_name+'\'><span class="uahighlight"></span></div>':h=h+"<div class='cat_element_row_icon uaicon_type "+e.rt.type_name+'\'><span class="uahighlight"></span></div>';h+="<div class='cat_element_row_content'>";if(e.rt.type_name=="inspirational_quote"){h=h+prepend+'"'+e[0].quote+'"';h+='<span class="inspired_author">';h+=e[0].author;h+="</span>"}if(e.rt.type_name=="inspirational_video"||e.rt.type_name=="inspirational_audio"){h=h+'<div class=\'cat_element_row_website_hdr\'><a class="cat_element_a cb_call" href="#" data-href="'+e.r.url+'">'+prepend+e.r.title+"</a></div>";h+="<div class='cat_element_row_website_desc'>";h+=e.r.description;e.r.is_mobile=="1"&&(h+=" <span class='mobile_friendly'>(mobile friendly)</span>");h+="</div></a>"}h+="</div></div><div class='results_right'>";h+="<div class='uaicon_wrap'>";e.uf.id?h=h+"<div data-id='"+e.r.id+"' data-type='i' class='cat_action_"+e.r.id+" cat_element_row_icon uaicon fave fave_on'></div>":h=h+"<div data-id='"+e.r.id+"' data-type='i' class='cat_action_"+e.r.id+" cat_element_row_icon uaicon fave'></div>";h=h+"<div data-id='"+e.r.id+"' data-type='i' data-src='category' class='cat_action_"+e.r.id+" cat_element_row_icon uaicon share go_share'></div>";h=h+"<div style='display:none;' class='cat_read_"+e.r.id+" cat_element_markread'><a href='javascript:;' data-role='button' data-inline='true' data-mini='true' data-theme='b'>Read</a></div>";h+="</div></div></div>";return h}function build_resource_row(e,t){flags="";prepend="";cats="";if(e[0].really_new=="1"){flags+=" new_item ";prepend="<span class='flag_new'><i>NEW</i></span> "}if(e[0].really_hot=="1"){flags+=" hot_topic ";prepend="<span class='flag_hot'><i>HOT</i></span> "}t=="new"&&$.each(e.categories,function(t){cats+="filter_cat_"+e.categories[t].Category.id+" "});h="";h=h+"<div data-id='"+e.r.id+"' class='cat_element_row "+flags+cats+"'><div class='results_left'>";e.r.is_university_resource=="1"?h=h+"<div class='cat_element_row_icon uatall uaicon_type "+e.rt.type_name+'\'><span class="uahighlight"></span></div>':h=h+"<div class='cat_element_row_icon uaicon_type "+e.rt.type_name+'\'><span class="uahighlight"></span></div>';h+="<div class='cat_element_row_content'>";if(e.rt.type_name=="website"){h=h+'<div class=\'cat_element_row_website_hdr\'><a class="cat_element_a cb_call" href="#" data-href="'+e.r.url+'">'+prepend+e.r.title+"</a></div>";h+="<div class='cat_element_row_website_desc'>";h+=e.r.description;e.r.is_mobile=="1"&&(h+=" <span class='mobile_friendly'>(mobile friendly)</span>");h+="</div></a>"}else{h=h+'<div class=\'cat_element_row_website_hdr\'><a class="cat_element_a cb_call" href="#" data-href="'+e.r.url+'">'+prepend+e.r.title+"</a></div>";h+="<div class='cat_element_row_website_desc'>";h+=e.r.description;e.r.is_mobile=="1"&&(h+=" <span class='mobile_friendly'>(mobile friendly)</span>");h+="</div></a>"}h+="</div></div><div class='results_right'>";h+="<div class='uaicon_wrap'>";e.uf.id?h=h+"<div data-id='"+e.r.id+"' data-type='r' class='cat_action_"+e.r.id+" cat_element_row_icon uaicon fave fave_on'></div>":h=h+"<div data-id='"+e.r.id+"' data-type='r' class='cat_action_"+e.r.id+" cat_element_row_icon uaicon fave'></div>";h=h+"<div data-id='"+e.r.id+"' data-type='r' data-src='category' class='cat_action_"+e.r.id+" cat_element_row_icon uaicon share go_share'></div>";h=h+"<div style='display:none;' class='cat_read_"+e.r.id+" cat_element_markread'><a href='javascript:;' data-role='button' data-inline='true' data-mini='true' data-theme='b'>Read</a></div>";h+="</div></div></div>";return h}function build_myevents_row(e){flags="";removed="";cats="";if(e.event.expired==1){flags=" removed ";removed="<div class='removed_warning'>This item has expired or has been removed.</div>"}$.each(e.categories,function(t){cats+="myevent_cat_"+e.categories[t].category_id+" "});h="<div class='myevents_row_overall "+cats+flags+"'>";h=h+"<div data-id='"+e.event.id+"' id='myevent_"+e.event.id+"' class='myevents_element_row'><div class='results_left'>";h=h+"<div data-id='"+e.event.id+"' data-type='myevents_' class='element_event_cal toggle_more'><div class='calendarrow'><div class='themonth m"+e.special.month+"'><span></span></div><div class='theday d"+e.special.day+"'></div></div></div>";h+="<div class='element_event_info'>";h=h+"<div data-id='"+e.event.id+"' data-type='myevents_' class='element_event_title toggle_more'>";h+=e.event.event_name;h+="</div>";h+="<div class='element_event_desc'>";e.event.title&&(h=h+e.event.title+"<br/>");if(e.event.event_type){h+="<div class='element_event_type'>(";h+=e.event.event_type;h+=")</div>"}h+="<div class='element_event_locations'>";first=0;$.each(e.spaces,function(t){if(first==0){h=h+"<div class='element_event_location'>"+e.spaces[t].formal_name+"</div>";first=1}});h+="</div>";h+="<div class='element_event_datetime'>";e.special.formatted_start_day==e.special.formatted_end_day?h=h+e.special.formatted_start+" to "+e.special.formatted_end_time:h=h+e.special.formatted_start+" to "+e.special.formatted_end;h+="</div>";h+=removed;h+="</div>";h+="</div>";h+="</div><div class='results_right'>";h+="<div class='uaicon_wrap'>";removed||(h=h+"<div data-id='"+e.event.id+"' data-type='e' data-src='myevents' class='cat_action_"+e.event.id+" myevents_element_row_icon uaicon share go_share'></div>");if(device.platform=="iPhone"||device.platform=="iPhone Simulator")removed||(h=h+"<div data-id='"+e.event.id+"' class='cat_action_"+e.event.id+" myevents_element_row_icon uaicon add_ical'></div>");h=h+"<div data-id='"+e.event.id+"' class='cat_action_"+e.event.id+" myevents_element_row_icon uaicon myevents_delete delete'></div>";h+="</div></div>";h+="</div>";if(!removed){h=h+"<div id='myevents_event_details_"+e.event.id+"' data-id='"+e.event.id+"' class='element_event_details' style='display:none;'>";if(e.event.description){h+="<div class='element_event_details_description_lbl'>Description:</div>";h+="<div class='element_event_details_description'>";h+=e.event.description;h+="</div>"}e.event.event_locator&&(h=h+"<div class='element_event_details_lineitem'><b>Reference:</b> "+e.event.event_locator+"</div>");e.event.organization_title?h=h+"<div class='element_event_details_lineitem'><b>Organization:</b> "+e.event.organization_title+"</div>":e.event.organization_name&&(h=h+"<div class='element_event_details_lineitem'><b>Organization:</b> "+e.event.organization_name+"</div>");e.event.attendee_count&&(h=h+"<div class='element_event_details_lineitem'><b>Head Count:</b> "+e.event.attendee_count+"</div>");h+="</div>";h=h+"<div data-id='"+e.event.id+"' id='myevents_event_toggle_"+e.event.id+"' data-type='myevents_' class='element_event_details_toggle'>+ MORE</div>"}h+="</div></div>";return h}function build_event_row(e,t){flags="";prepend="";cats="";if(e[0].really_new=="1"){flags+=" new_item ";prepend="<span class='flag_new'><i>NEW</i></span> "}t=="new"&&$.each(e.categories,function(t){cats+="filter_cat_"+e.categories[t].Category.id+" "});h="";h=h+"<div data-id='"+e.e.id+"' class='cat_element_row "+flags+cats+"'><div class='results_left'>";h=h+"<div data-id='"+e.e.id+"' data-type='search_' class='element_event_cal toggle_more'><div class='calendarrow'><div class='themonth m"+e[0].month+"'><span></span></div><div class='theday d"+e[0].day+"'></div></div></div>";h+="<div class='element_event_info'>";h=h+"<div data-id='"+e.e.id+"' data-type='search_' class='element_event_title toggle_more'>";h=h+prepend+e.e.event_name;h+="</div>";h+="<div class='element_event_desc'>";e.e.title&&(h=h+e.e.title+"<br/>");if(e.e.event_type){h+="<div class='element_event_type'>(";h+=e.e.event_type;h+=")</div>"}h+="<div class='element_event_locations'>";first=0;$.each(e.es,function(t){if(first==0){h=h+"<div class='element_event_location'>"+e.es[t].event_spaces.formal_name+"</div>";first=1}});h+="</div>";h+="<div class='element_event_datetime'>";e[0].formatted_start_day==e[0].formatted_end_day?h=h+e[0].formatted_start+" to "+e[0].formatted_end_time
:h=h+e[0].formatted_start+" to "+e[0].formatted_end;h+="</div>";h+="</div>";h+="</div>";h+="</div><div class='results_right'>";h+="<div class='uaicon_wrap'>";e.ue.id?h=h+"<div data-id='"+e.e.id+"' data-type='e' class='cat_action_"+e.e.id+" cat_element_row_icon uaicon event_toggle event event_on'></div>":h=h+"<div data-id='"+e.e.id+"' data-type='e' class='cat_action_"+e.e.id+" cat_element_row_icon uaicon event_toggle event'></div>";if(device.platform=="iPhone"||device.platform=="iPhone Simulator")h=h+"<div data-id='"+e.e.id+"' class='cat_action_"+e.e.id+" cat_element_row_icon uaicon add_ical'></div>";h=h+"<div data-id='"+e.e.id+"' data-type='e' data-src='category' class='cat_action_"+e.e.id+" cat_element_row_icon uaicon share go_share'></div>";h+="</div></div>";h+="</div>";h=h+"<div id='search_event_details_"+e.e.id+"' data-id='"+e.e.id+"' class='element_event_details' style='display:none;'>";if(e.e.description){h+="<div class='element_event_details_description_lbl'>Description:</div>";h+="<div class='element_event_details_description'>";h+=e.e.description;h+="</div>"}e.e.event_locator&&(h=h+"<div class='element_event_details_lineitem'><b>Reference:</b> "+e.e.event_locator+"</div>");e.e.organization_title?h=h+"<div class='element_event_details_lineitem'><b>Organization:</b> "+e.e.organization_title+"</div>":e.e.organization_name&&(h=h+"<div class='element_event_details_lineitem'><b>Organization:</b> "+e.e.organization_name+"</div>");e.e.attendee_count&&(h=h+"<div class='element_event_details_lineitem'><b>Head Count:</b> "+e.e.attendee_count+"</div>");h+="</div>";h=h+"<div data-id='"+e.e.id+"' id='search_event_toggle_"+e.e.id+"' data-type='search_' class='element_event_details_toggle "+cats+"'>+ MORE</div>";h+="</div>";return h}function build_search_inspiration_row(e){flags="";prepend="";if(e[0].really_new=="1"){flags+=" new_item ";prepend="<span class='flag_new'><i>NEW</i></span> "}if(e[0].really_hot=="1"){flags+=" hot_topic ";prepend="<span class='flag_hot'><i>HOT</i></span> "}h="";h=h+"<div data-id='"+e.r.id+"' id='search_"+e.r.id+"' class='search_element_row "+flags+"'><div class='results_left'>";e.r.is_university_resource=="1"?h=h+"<div class='search_element_row_icon uatall uaicon_type "+e.rt.type_name+'\'><span class="uahighlight"></span></div>':h=h+"<div class='search_element_row_icon uaicon_type "+e.rt.type_name+'\'><span class="uahighlight"></span></div>';h+="<div class='search_element_row_content'>";if(e.rt.type_name=="inspirational_quote"){h=h+prepend+'"'+e[0].quote+'"';h+='<span class="inspired_author">';h+=e[0].author;h+="</span>"}h+="</div></div><div class='results_right'>";h+="<div class='uaicon_wrap'>";e.uf.id?h=h+"<div data-id='"+e.r.id+"' data-type='i' class='cat_action_"+e.r.id+" cat_element_row_icon uaicon fave fave_on'></div>":h=h+"<div data-id='"+e.r.id+"' data-type='i' class='cat_action_"+e.r.id+" cat_element_row_icon uaicon fave'></div>";h=h+"<div data-id='"+e.r.id+"' data-type='i' data-src='search' class='cat_action_"+e.r.id+" cat_element_row_icon uaicon share go_share'></div>";h+="</div></div></div>";return h}function build_search_resource_row(e){flags="";prepend="";if(e[0].really_new=="1"){flags+=" new_item ";prepend="<span class='flag_new'><i>NEW</i></span> "}if(e[0].really_hot=="1"){flags+=" hot_topic ";prepend="<span class='flag_hot'><i>HOT</i></span> "}h="";h=h+"<div data-id='"+e.r.id+"' id='search_"+e.r.id+"' class='search_element_row "+flags+"'><div class='results_left'>";e.r.is_university_resource=="1"?h=h+"<div class='search_element_row_icon uatall uaicon_type "+e.rt.type_name+'\'><span class="uahighlight"></span></div>':h=h+"<div class='search_element_row_icon uaicon_type "+e.rt.type_name+'\'><span class="uahighlight"></span></div>';h+="<div class='search_element_row_content'>";if(e.rt.type_name=="website"){h=h+'<div class=\'cat_element_row_website_hdr\'><a class="cat_element_a cb_call" href="#" data-href="'+e.r.url+'">'+prepend+e.r.title+"</a></div>";h+="<div class='cat_element_row_website_desc'>";h+=e.r.description;e.r.is_mobile=="1"&&(h+=" <span class='mobile_friendly'>(mobile friendly)</span>");h+="</div></a>"}else{h=h+'<div class=\'cat_element_row_website_hdr\'><a class="cat_element_a cb_call" href="#" data-href="'+e.r.url+'">'+prepend+e.r.title+"</a></div>";h+="<div class='cat_element_row_website_desc'>";h+=e.r.description;e.r.is_mobile=="1"&&(h+=" <span class='mobile_friendly'>(mobile friendly)</span>");h+="</div></a>"}h+="</div></div><div class='results_right'>";h+="<div class='uaicon_wrap'>";e.uf.id?h=h+"<div data-id='"+e.r.id+"' data-type='r' class='cat_action_"+e.r.id+" cat_element_row_icon uaicon fave fave_on'></div>":h=h+"<div data-id='"+e.r.id+"' data-type='r' class='cat_action_"+e.r.id+" cat_element_row_icon uaicon fave'></div>";h=h+"<div data-id='"+e.r.id+"' data-type='r' data-src='search' class='cat_action_"+e.r.id+" cat_element_row_icon uaicon share go_share'></div>";h+="</div></div></div>";return h}function build_search_event_row(e){flags="";prepend="";if(e[0].really_new=="1"){flags+=" new_item ";prepend="<span class='flag_new'><i>NEW</i></span> "}h="";h=h+"<div data-id='"+e.e.id+"' id='search_"+e.e.id+"' class='search_element_row "+flags+"'><div class='results_left'>";h=h+"<div data-id='"+e.e.id+"' data-type='search_' class='element_event_cal toggle_more'><div class='calendarrow'><div class='themonth m"+e[0].month+"'><span></span></div><div class='theday d"+e[0].day+"'></div></div></div>";h+="<div class='element_event_info'>";h=h+"<div data-id='"+e.e.id+"' data-type='search_' class='element_event_title toggle_more'>";h=h+prepend+e.e.event_name;h+="</div>";h+="<div class='element_event_desc'>";e.e.title&&(h=h+e.e.title+"<br/>");if(e.e.event_type){h+="<div class='element_event_type'>(";h+=e.e.event_type;h+=")</div>"}h+="<div class='element_event_locations'>";first=0;$.each(e.es,function(t){if(first==0){h=h+"<div class='element_event_location'>"+e.es[t].event_spaces.formal_name+"</div>";first=1}});h+="</div>";h+="<div class='element_event_datetime'>";e[0].formatted_start_day==e[0].formatted_end_day?h=h+e[0].formatted_start+" to "+e[0].formatted_end_time:h=h+e[0].formatted_start+" to "+e[0].formatted_end;h+="</div>";h+="</div>";h+="</div>";h+="</div><div class='results_right'>";h+="<div class='uaicon_wrap'>";e.ue.id?h=h+"<div data-id='"+e.e.id+"' data-type='e' class='cat_action_"+e.e.id+" cat_element_row_icon uaicon event_toggle event event_on'></div>":h=h+"<div data-id='"+e.e.id+"' data-type='e' class='cat_action_"+e.e.id+" cat_element_row_icon uaicon event_toggle event'></div>";if(device.platform=="iPhone"||device.platform=="iPhone Simulator")h=h+"<div data-id='"+e.e.id+"' class='cat_action_"+e.e.id+" cat_element_row_icon uaicon add_ical'></div>";h=h+"<div data-id='"+e.e.id+"' data-type='e' data-src='search' class='cat_action_"+e.e.id+" cat_element_row_icon uaicon share go_share'></div>";h+="</div></div>";h+="</div>";h=h+"<div id='search_event_details_"+e.e.id+"' data-id='"+e.e.id+"' class='element_event_details' style='display:none;'>";if(e.e.description){h+="<div class='element_event_details_description_lbl'>Description:</div>";h+="<div class='element_event_details_description'>";h+=e.e.description;h+="</div>"}e.e.event_locator&&(h=h+"<div class='element_event_details_lineitem'><b>Reference:</b> "+e.e.event_locator+"</div>");e.e.organization_title?h=h+"<div class='element_event_details_lineitem'><b>Organization:</b> "+e.e.organization_title+"</div>":e.e.organization_name&&(h=h+"<div class='element_event_details_lineitem'><b>Organization:</b> "+e.e.organization_name+"</div>");e.e.attendee_count&&(h=h+"<div class='element_event_details_lineitem'><b>Head Count:</b> "+e.e.attendee_count+"</div>");h+="</div>";h=h+"<div data-id='"+e.e.id+"' id='search_event_toggle_"+e.e.id+"' data-type='search_' class='element_event_details_toggle'>+ MORE</div>";h+="</div>";return h}var ver="1.1.140",uri="https://su.uakron.edu",auth_uri="https://www.uakron.edu/applications/suAuth.php",menu_offset=310,bootstrapped=!1,profile_complete=!1,is_wizard_firstpage=!1,loading_text="Loading Data",searching_text="Searching...",sharing_text="Sharing...",generic_error="An error occurred, try again!",specific_error="An error occurred - ",backGoal="",data_menu,data_menu_total_new,calPlugin,gaPlugin,cb,notice_timeout,notice_error_timeout,last_page,app={initialize:function(){this.bindEvents();$.event.special.swipe.horizontalDistanceThreshold=75;$.event.special.swipe.verticalDistanceThreshold=35;$.mobile.defaultHomeScroll=0},bindEvents:function(){document.addEventListener("deviceready",appDeviceReady,!1)}};$(document).delegate("#cathome","pagecreate",function(){$("#"+$(this).attr("id")+" .pullr").prepend($(".navicons:first").clone().show())});$(document).delegate("#help","pagecreate",function(){$("#"+$(this).attr("id")+" .pullr").prepend($(".navicons:first").clone().show())});$(document).delegate("#home","pagecreate",function(){$("#"+$(this).attr("id")+" .pullr").prepend($(".navicons:first").clone().show())});$(document).delegate("#my_events","pagecreate",function(){$("#"+$(this).attr("id")+" .pullr").prepend($(".navicons:first").clone().show())});$(document).delegate("#my_favorites","pagecreate",function(){$("#"+$(this).attr("id")+" .pullr").prepend($(".navicons:first").clone().show())});$(document).delegate("#my_goals","pagecreate",function(){$("#"+$(this).attr("id")+" .pullr").prepend($(".navicons:first").clone().show())});$(document).delegate("#new","pagecreate",function(){$("#"+$(this).attr("id")+" .pullr").prepend($(".navicons:first").clone().show())});$(document).delegate("#offline","pagecreate",function(){});$(document).delegate("#search","pagecreate",function(){$("#"+$(this).attr("id")+" .pullr").prepend($(".navicons:first").clone().show())});$(document).delegate("#share","pagecreate",function(){$("#"+$(this).attr("id")+" .pullr").prepend($(".navicons:first").clone().show())});$(document).delegate("#subhome","pagecreate",function(){$("#"+$(this).attr("id")+" .pullr").prepend($(".navicons:first").clone().show())});$(document).delegate("#uamobile","pagecreate",function(){$("#"+$(this).attr("id")+" .pullr").prepend($(".navicons:first").clone().show())});$(document).delegate("#wizard_cats","pagecreate",function(){if(profile_complete){$("#wizard_cats .pullr").prepend($(".navicons:first").clone().show());$("#wizard_cats .ua-header").removeClass("ua-header-short")}});$(document).delegate("#wizard_final","pagecreate",function(){if(profile_complete){$("#wizard_final .pullr").prepend($(".navicons:first").clone().show());$("#wizard_final .ua-header").removeClass("ua-header-short")}});$(document).delegate("#wizard_home","pagecreate",function(){if(profile_complete){$("#wizard_home .pullr").prepend($(".navicons:first").clone().show());$("#wizard_home .ua-header").removeClass("ua-header-short")}});$(document).delegate("#wizard_rehome","pagecreate",function(){if(profile_complete){$("#wizard_rehome .pullr").prepend($(".navicons:first").clone().show());$("#wizard_rehome .ua-header").removeClass("ua-header-short")}});$(document).bind("pagebeforechange",function(e,t){if(typeof t.toPage=="string"&&last_page!=t.toPage){$(".load_content").hide();last_page=t.toPage}$(".pullr").css("top","-"+menu_offset+"px");if(typeof t.toPage=="string"){var n=$.mobile.path.parseUrl(t.toPage),r=/^#wizard_category/;if(n.hash.search(r)!==-1){showCategory(n,t.options);e.preventDefault()}}});$(document).on("pagechange",function(e,t){$(".ui-page-active .ui-listview").listview("refresh");$(".ui-page-active :jqmData(role=content)").trigger("create")});$("#home").live("pagechange",function(e,t){$("#home .ua-header").show()});$("#help").live("pageshow",function(e,t){gaPlugin.trackPage(successHandler,errorHandler,"/app/help");$(".help_block").hide()});$("#home").live("pageshow",function(e,t){$("#home .ua-header").show();gaPlugin.trackPage(successHandler,errorHandler,"/app/home");if(!bootstrapped){$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});stageData()}});$("#login").live("pageshow",function(e,t){t.prevPage.attr("id")=="logout"&&$(".load_content").fadeIn()});$("#logout").live("pageshow",function(e,t){userLogout();localStorage.removeItem("userid");localStorage.removeItem("password_hash");localStorage.removeItem("username");localStorage.removeItem("password");localStorage.removeItem("name");localStorage.removeItem("email");var n=$("#loginForm");$("#username",n).val("");$("#password",n).val("");gaPlugin.trackPage(successHandler,errorHandler,"/app/logout");$.mobile.changePage("#login",{transition:"flip"})});$("#new").live("pageshow",function(e,t){$(".load_content").hide();$("#new .ua-header").fixedtoolbar("show");gaPlugin.trackPage(successHandler,errorHandler,"/app/new_hot");$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});var n="",r="";$.ajax({type:"POST",url:uri+"/api/new_hot.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){is_first_category=!0;$.each(e.categories,function(t){loaded_parent=!1;$.each(e.categories[t],function(r){if(!loaded_parent){if(!is_first_category)n+='</optgroup><optgroup label="'+e.categories[t][r].parent_cat_desc+'">';else{n+='<optgroup label="'+e.categories[t][r].parent_cat_desc+'">';is_first_category=!1}loaded_parent=!0}n+="<option value='"+e.categories[t][r].cat_id+"'>"+e.categories[t][r].cat_desc+"</option>"})});$("#new_dd").append(n);cat_inspirations_txt="";inspiration_cnt=0;interrupt_inspiration=!1;inspiration_content=!1;$.each(e.inspirations,function(t){cat_inspirations_txt+=build_inspiration_row(e.inspirations[t],"new");inspiration_cnt++;inspiration_content=!0});cat_resources_txt="";resource_cnt=0;interrupt_resource=!1;resource_content=!1;$.each(e.resources,function(t){cat_resources_txt+=build_resource_row(e.resources[t],"new");resource_cnt++;resource_content=!0});cat_events_txt="";event_cnt=0;interrupt_event=!1;event_content=!1;$.each(e.events,function(t){cat_events_txt+=build_event_row(e.events[t],"new");event_cnt++;event_content=!0});inspiration_content&&$("#new_inspiration_data_inner").html(cat_inspirations_txt+"<div class='new_data_nothing' style='display:none;'>Nothing new found</div>");resource_content&&$("#new_resources_data_inner").html(cat_resources_txt+"<div class='new_data_nothing' style='display:none;'>Nothing new found</div>");event_content&&$("#new_involved_data_inner").html(cat_events_txt+"<div class='new_data_nothing' style='display:none;'>Nothing new found</div>");$("#new_inspiration_data_inner").trigger("create");$("#new_resources_data_inner").trigger("create");$("#new_involved_data_inner").trigger("create");if(event_cnt==0)if(resource_cnt==0){if(inspiration_cnt!=0){$(".new_tab").removeClass("new_tab_on");$("#inspiration_new_tab").addClass("new_tab_on");$(".new_data").hide();$("#inspiration_new_data").show()}}else{$(".new_tab").removeClass("new_tab_on");$("#resources_new_tab").addClass("new_tab_on");$(".new_data").hide();$("#resources_new_data").show()}hideMobile();$(".load_content").show()}else{hideMobile();$(".load_content").show();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();$(".load_content").show();notice(specific_error+n,5e3)}})});$("#my_events").live("pageshow",function(e,t){$(".load_content").hide();gaPlugin.trackPage(successHandler,errorHandler,"/app/my_events");$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});var n="",r="";$.ajax({type:"POST",url:uri+"/api/my_events.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){is_first_category=!0;$.each(e.categories,function(t){loaded_parent=!1;$.each(e.categories[t],function(r){if(!loaded_parent){if(!is_first_category)n+='</optgroup><optgroup label="'+e.categories[t][r].parent_cat_desc+'">';else{n+='<optgroup label="'+e.categories[t][r].parent_cat_desc+'">';is_first_category=!1}loaded_parent=!0}n+="<option value='"+e.categories[t][r].cat_id+"'>"+e.categories[t][r].cat_desc+"</option>"})});$.each(e.events,function(t){r+=build_myevents_row(e.events[t])});$("#my_events_dd").append(n);if(r){r+="<div class='myevents_data_nothing' style='display:none;'>Nothing found, add some events!</div>";$("#myevents_data_inner").html(r);$("#myevents_data_inner").trigger("create")}else{r+="<div class='myevents_data_nothing'>Nothing found, add some events!</div>";$("#myevents_data_inner").html(r);$("#myevents_data_inner").trigger("create")}hideMobile();$(".load_content").show()}else{hideMobile();$(".load_content").show();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();$(".load_content").show();notice(specific_error+n,5e3)}})});$("#my_favorites").live("pageshow",function(e,t){$("#my_favorites .ua-header").fixedtoolbar("show");gaPlugin.trackPage(successHandler,errorHandler,"/app/my_favorites");$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});var n="",r="",i="";$("#my_favorites #fav_email_to").val(localStorage.email);$("#my_favorites #fav_email_from").val(localStorage.email);$.ajax({type:"POST",url:uri+"/api/my_favorites.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){is_first_category=!0;$.each(e.categories,function(t){loaded_parent=!1;$.each(e.categories[t],function(r){if(!loaded_parent){if(!is_first_category)n+='</optgroup><optgroup label="'+e.categories[t][r].parent_cat_desc+'">';else{n+='<optgroup label="'+e.categories[t][r].parent_cat_desc+'">';is_first_category=!1}loaded_parent=!0}n+="<option value='"+e.categories[t][r].cat_code+"'>"+e.categories[t][r].cat_desc+"</option>"})});$.each(e.favorites,function(t){e.favorites[t].resource.resource_type_id==1||e.favorites[t].resource.resource_type_id==6||e.favorites[t].resource.resource_type_id==7?i+=build_favorites_inspiration_row(e.favorites[t]):r+=build_favorites_resource_row(e.favorites[t])});$("#my_favorites_dd").append(n);if(r){r+="<div class='fav_data_nothing' style='display:none;'>Nothing found</div>";$("#fav_resources_data_inner").html(r);$("#fav_resources_data_inner").trigger("create")}else{r+="<div class='fav_data_nothing'>Nothing found</div>";$("#fav_resources_data_inner").html(r);$("#fav_resources_data_inner").trigger("create")}if(i){i+="<div class='fav_data_nothing' style='display:none;'>Nothing found</div>";$("#fav_inspiration_data_inner").html(i);$("#fav_inspiration_data_inner").trigger("create")}else{i+="<div class='fav_data_nothing'>Nothing found</div>";$("#fav_inspiration_data_inner").html(i);$("#fav_inspiration_data_inner").trigger("create")}hideMobile();$(".load_content").show()}else{hideMobile();$(".load_content").show();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();$(".load_content").show();notice(specific_error+n,5e3)}})});$("#my_goals").live("pageshow",function(e,t){$(".load_content").hide();gaPlugin.trackPage(successHandler,errorHandler,"/app/my_goals");$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});backGoal?$("#save_goal").attr("data-from_category","1"):$("#save_goal").attr("data-from_category","0");loadGoals()});$("#search").live("pageshow",function(e,t){gaPlugin.trackPage(successHandler,errorHandler,"/app/search")});$("#share").live("pageshow",function(e,t){$("#share .ua-header").fixedtoolbar("show");gaPlugin.trackPage(successHandler,errorHandler,"/app/share")});$("#uamobile").live("pageshow",function(e,t){device.platform=="iPhone"||device.platform=="iPhone Simulator"?$(".uamobile_ios").show():$(".uamobile_android").show()});$("#wizard_final").live("pageshow",function(e,t){profile_complete&&stageData();$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});$.ajax({type:"POST",url:uri+"/api/set_user_preference.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,preference_id:"1",preference_value:"1"},dataType:"json",timeout:1e4,success:function(e){e.status.status_code=="200"&&$.ajax({type:"GET",url:uri+"/api/wizard_page.json?page_id=8&ts="+(new Date).getTime(),dataType:"json",timeout:1e4,success:function(e){hideMobile();if(e.status.status_code=="200"){$("#wizard_final_content").html(e.page.WizardPage.page_content).trigger("create");$("#wizard_final_nav").show();stageData();notice("Welcome to Successful U, "+localStorage.name+"!",5e3)}else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}})},error:function(e,t,n){notice(specific_error+n,5e3);logout()}})});$("#wizard_home").live("pageshow",function(e,t){$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});$.ajax({type:"GET",url:uri+"/api/wizard_page.json?page_id=1&ts="+(new Date).getTime(),dataType:"json",timeout:1e4,success:function(e){hideMobile();if(e.status.status_code=="200"){$("#wizard_home_content").html(e.page.WizardPage.page_content).trigger("create");$("#wizard_home_nav").show()}else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){notice(specific_error+n,5e3);logout()}})});$("#wizard_rehome").live("pageshow",function(e,t){$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});$.ajax({type:"GET",url:uri+"/api/wizard_page.json?page_id=10&ts="+(new Date).getTime(),dataType:"json",timeout:1e4,success:function(e){hideMobile();if(e.status.status_code=="200"){$("#wizard_rehome_content").html(e.page.WizardPage.page_content).trigger("create");$("#wizard_rehome_nav").show()}else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}})});$("#subhome h3, #subhome .ua-header, #subhome_categories, #subhome").live("swiperight",function(e,t){if(device.platform!="iPhone"&&device.platform!="iPhone Simulator")return!1;slideHome();$.mobile.changePage("#home",{transition:"slide",reverse:!0})});$("#cathome").live("swiperight",function(e,t){if(device.platform!="iPhone"&&device.platform!="iPhone Simulator")return!1;slideSubHome();$.mobile.changePage("#subhome",{transition:"slide",reverse:!0})});$("#share").live("swiperight",function(e,t){if(device.platform!="iPhone"&&device.platform!="iPhone Simulator")return!1;history.back()});$("#cat_resource_dd").live("change",function(e){$(this).blur();var t=$(this).val(),n=$(this).attr("data-category_id");$.mobile.silentScroll(0);$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});$.ajax({type:"POST",url:uri+"/api/get_resources.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,category_id:n,filter:t,start:0},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){html_txt="";resource_cnt=0;interrupt_resource=!1;resource_content=!1;$.each(e.more,function(t){html_txt+=build_resource_row(e.more[t]);resource_cnt++;resource_content=!0});e.total>resource_cnt&&(html_txt=html_txt+"<div class='cat_action_more more_rr'><input type='button' class='get_more_resources' data-filter='"+t+"' data-start='"+resource_cnt+"' data-category_id='"+n+"' value='Load More' /></div>");html_txt||(html_txt="<div class='cat_data_nothing'>Nothing found, try a different filter.</div>");$("#resources_data_inner").html(html_txt);$("#resources_data_inner").trigger("create");hideMobile()}},error:function(e,t,n){}})});$('input[name^="interruptor_btn"]').live("change",function(){var e=$(this).attr("data-action"),t=$(this).attr("data-category_id"),n=$(this).attr("data-parent_category_id");$.ajax({type:"POST",url:uri+"/api/set_user_category.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,category_id:t,status:e},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){stageData(n);$("#subhome_categories").trigger("create");notice("Preference Saved",3500)}},error:function(e,t,n){}});return!1});$('input[name^="wizard_cat_btn_"]').live("change",function(){var e=$(this).attr("data-category_id"),t=$(this).val();$.ajax({type:"POST",url:uri+"/api/set_user_category.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,category_id:e,status:t},dataType:"json",timeout:1e4,success:function(e){e.status.status_code=="200"},error:function(e,t,n){}})});$("#my_events_dd").live("change",function(e,t){$(this).blur();filter=$(this).val();$(".myevents_data_nothing").hide();if(filter=="all")$(".myevents_row_overall").show();else{$(".myevents_row_overall").hide();$(".myevent_cat_"+filter).show()}$.mobile.silentScroll(0);$("div.myevents_element_row:visible").length===0&&$(".myevents_data_nothing").show()});$("#new_dd").live("change",function(e,t){$(this).blur();filter=$(this).val();$("#new .new_data_nothing").hide();if(filter=="all"){$("#new .cat_element_row").show();$("#new .element_event_details_toggle").show()}else{$("#new .cat_element_row").hide();$("#new .element_event_details_toggle").hide();$(".filter_cat_"+filter).show()}$.mobile.silentScroll(0);if($("#new_involved_data_inner .cat_element_row:visible").length==0&&filter!="all"){$(".new_tab").removeClass("new_tab_on");$("#resources_new_tab").addClass("new_tab_on");$(".new_data").hide();$("#resources_new_data").show();if($("#new_resources_data_inner .cat_element_row:visible").length==0&&filter!="all"){$(".new_tab").removeClass("new_tab_on");$("#inspiration_new_tab").addClass("new_tab_on");$(".new_data").hide();$("#inspiration_new_data").show()}}$("#new_involved_data_inner .cat_element_row:visible").length==0&&filter!="all"?$("#new_involved_data_inner .new_data_nothing").show():$("#new_involved_data_inner .new_data_nothing").hide();$("#new_resources_data_inner .cat_element_row:visible").length==0&&filter!="all"?$("#new_resources_data_inner .new_data_nothing").show():$("#new_resources_data_inner .new_data_nothing").hide();$("#new_inspiration_data_inner .cat_element_row:visible").length==0&&filter!="all"?$("#new_inspiration_data_inner .new_data_nothing").show():$("#new_inspiration_data_inner .new_data_nothing").hide();$("#new_involved_data_inner div.cat_element_row").removeClass("first_child");$("#new_involved_data_inner .filter_cat_"+filter+":first").addClass("first_child")});$("#my_favorites_dd").live("change",function(e,t){$(this).blur();filter=$(this).val();$(".fav_data_nothing").hide();if(filter=="all")$(".fav_element_row").show();else{$(".fav_element_row").hide();$(".row_"+filter).show()}$.mobile.silentScroll(0);$("#fav_resources_data_inner .row_"+filter).length==0&&filter!="all"?$("#fav_resources_data_inner .fav_data_nothing").show():$("#fav_resources_data_inner .fav_data_nothing").hide();$("#fav_inspiration_data_inner .row_"+filter).length==0&&filter!="all"?$("#fav_inspiration_data_inner .fav_data_nothing").show():$("#fav_inspiration_data_inner .fav_data_nothing").hide();$("#fav_resources_data_inner div.fav_element_row").removeClass("first_child");$("#fav_inspiration_data_inner div.fav_element_row").removeClass("first_child");$("#fav_resources_data_inner .row_"+filter+":first").addClass("first_child");$("#fav_inspiration_data_inner .row_"+filter+":first").addClass("first_child");if($("#fav_resources_data_inner .row_"+filter).length==0&&filter!="all"){$(".fav_tab").removeClass("fav_tab_on");$("#inspiration_fav_tab").addClass("fav_tab_on");$(".fav_data").hide();$("#inspiration_fav_data").show()}else{$(".fav_tab").removeClass("fav_tab_on");$("#resources_fav_tab").addClass("fav_tab_on");$(".fav_data").hide();$("#resources_fav_data").show()}});$("#my_goals_dd").live("change",function(e,t){$(this).blur()});$("#search_dd").live("change",function(e,t){keywords=$("#search_ipt").val();category=$("#search_dd").val();$("#search_dd").blur();(keywords||category)&&goSearch(keywords,category);return!1});$("#search_ipt").live("change keypress",function(e,t){if(e.keyCode==13){keywords=$("#search_ipt").val();category=$("#search_dd").val();$("#search_ipt").blur();(keywords||category)&&goSearch(keywords,category);return!1}});$(".cat_tab").live("tap",function(e,t){var n=$(this).attr("data-tab");$(".cat_tab").removeClass("cat_tab_on");$(this).addClass("cat_tab_on");$(".cat_data").hide();$("#"+n+"_data").show()});$(".fav_tab").live("tap",function(e,t){var n=$(this).attr("data-tab");$(".fav_tab").removeClass("fav_tab_on");$(this).addClass("fav_tab_on");$(".fav_data").hide();$("#"+n+"_fav_data").show()});$(".new_tab").live("tap",function(e,t){var n=$("#new_dd").val(),r=$(this).attr("data-tab");$(".new_tab").removeClass("new_tab_on");$(this).addClass("new_tab_on");$(".new_data").hide();$("#"+r+"_new_data").show();$("#new_involved_data_inner .cat_element_row:visible").length==0&&n!="all"?$("#new_involved_data_inner .new_data_nothing").show():n!="all"&&$("#new_involved_data_inner .new_data_nothing").hide();$("#new_resources_data_inner .cat_element_row:visible").length==0&&n!="all"?$("#new_resources_data_inner .new_data_nothing").show():n!="all"&&$("#new_resources_data_inner .new_data_nothing").hide();$("#new_inspiration_data_inner .cat_element_row:visible").length==0&&n!="all"?$("#new_inspiration_data_inner .new_data_nothing").show():n!="all"&&$("#new_inspiration_data_inner .new_data_nothing").hide()});$(".goal_tab").live("tap",function(e,t){$(".edit_goal_content").hide();$(".add_goal_content").show();var n=$(this).attr("data-tab");$(".goal_tab").removeClass("goal_tab_on");$(this).addClass("goal_tab_on");$(".goal_data").hide();$("#"+n+"_goal_data").show()});$(".search_tab").live("tap",function(e,t){var n=$(this).attr("data-tab");$(".search_tab").removeClass("search_tab_on");$(this).addClass("search_tab_on");$(".search_data").hide();$("#"+n+"_search_data").show()});$(".help_wrap").live("tap",function(e,t){$(this).children(".help_block").is(":visible")?$(this).children(".help_block").hide():$(this).children(".help_block").show()});$("#email_share").live("tap",function(e,t){var n=$("#share_email_to").val(),r=$("#share_email_from").val(),i=$(this).attr("data-content_type"),s=$(this).attr("data-content_src"),o=$(this).attr("data-content_id");$.mobile.loading("show",{text:sharing_text,textVisible:!0,theme:"e",html:""});$.ajax({type:"POST",url:uri+"/api/email_share.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,email_address_to:n,email_address_from:r,share_type:i,share_src:s,share_id:o},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){hideMobile();notice("Content shared successfully!",3500)}else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}})});$("#fav_email_share").live("tap",function(e,t){var n=$(".fav_tab.fav_tab_on").attr("data-tab"),r=$("#fav_email_to").val(),i=$("#fav_email_from").val();$.mobile.loading("show",{text:sharing_text,textVisible:!0,theme:"e",html:""});$.ajax({type:"POST",url:uri+"/api/email_favorites.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,email_address_to:r,email_address_from:i,share_type:n},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){hideMobile();notice("Content shared successfully!",3500)}else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}})});$(".go_share").live("tap",function(e,t){var n=$(this).attr("data-src"),r=$(this).attr("data-type"),i=$(this).attr("data-id");$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});$.ajax({type:"POST",url:uri+"/api/share.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,data_src:n,data_type:r,data_id:i},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){$(".share_title").html(e.data.title);$(".share_facebook_link").attr("data-href",e.data.facebook_link);$(".share_twitter_link").attr("data-href",e.data.twitter_link);$(".share_linkedin_link").attr("data-href",e.data.linkedin_link);$("#share_email_to").val(localStorage.email);$("#share_email_from").val(localStorage.email);$("#email_share").attr("data-content_id",i);$("#email_share").attr("data-content_type",r);$("#email_share").attr("data-content_src",n);hideMobile();$(".load_content").show()}else{hideMobile();$(".load_content").show();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();$(".load_content").show();notice(specific_error+n,5e3)}});$.mobile.changePage("#share",{transition:"fade"});return!1});$("#my_favorites_dd").live("blur",function(e){$("#my_favorites .ua-header").fixedtoolbar("hide");return!1});$("#my_favorites_dd").live("focus",function(e){$("#my_favorites .ua-header").fixedtoolbar("hide");return!1});$("#my_favorites #fav_email_to, #my_favorites #fav_email_from").live("blur"
,function(e){$("#my_favorites .ua-header").fixedtoolbar("hide");return!1});$("#my_favorites #fav_email_to, #my_favorites #fav_email_from").live("focus",function(e){$("#my_favorites .ua-header").fixedtoolbar("hide");return!1});$("#share #share_email_to, #share #share_email_from").live("blur",function(e){$("#share .ua-header").fixedtoolbar("hide");return!1});$("#share #share_email_to, #share #share_email_from").live("focus",function(e){$("#share .ua-header").fixedtoolbar("hide");return!1});$(".get_more_resources").live("tap",function(e){var t=$(this).attr("data-filter"),n=$(this).attr("data-start"),r=$(this).attr("data-category_id");$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});$.ajax({type:"POST",url:uri+"/api/get_resources.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,category_id:r,filter:t,start:n},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){html_txt="";resource_cnt=n;interrupt_resource=!1;resource_content=!1;$.each(e.more,function(t){html_txt+=build_resource_row(e.more[t]);resource_cnt++;resource_content=!0});e.total>resource_cnt&&(html_txt=html_txt+"<div class='cat_action_more more_rr'><input type='button' class='get_more_resources' data-filter='"+t+"' data-start='"+resource_cnt+"' data-category_id='"+r+"' value='Load More' /></div>");html_txt||(html_txt="<div class='cat_data_nothing'>Nothing found, try a different filter.</div>");$(".more_rr").remove();$("#resources_data_inner").append(html_txt);$("#resources_data_inner").trigger("create");hideMobile()}},error:function(e,t,n){}});return!1});$(".search_more").live("tap",function(e,t){var n=$("#search_ipt").val(),r=$("#search_dd").val(),i=$(this).attr("data-type"),s=parseInt($(this).attr("data-current"));$.mobile.loading("show",{text:searching_text,textVisible:!0,theme:"e",html:""});$.ajax({type:"POST",url:uri+"/api/search_more.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,category_code:r,keywords:n,type:i,start:s},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){hideMobile();cntr=s;if(i=="i"){html_more="";$.each(e.more,function(t){html_more+=build_search_inspiration_row(e.more[t]);cntr++});if(html_more){$(".search_more_i").remove();e.total>cntr&&(html_more=html_more+"<div class='cat_action_more search_more_i'><input type='button' class='search_more' data-type='i' data-current='"+cntr+"' value='Load More' /></div>");$("#search_inspiration_data_inner").append(html_more);$("#search_inspiration_data_inner").trigger("create")}}if(i=="r"){html_more="";$.each(e.more,function(t){html_more+=build_search_resource_row(e.more[t]);cntr++});if(html_more){$(".search_more_r").remove();e.total>cntr&&(html_more=html_more+"<div class='cat_action_more search_more_r'><input type='button' class='search_more' data-type='r' data-current='"+cntr+"' value='Load More' /></div>");$("#search_resources_data_inner").append(html_more);$("#search_resources_data_inner").trigger("create")}}if(i=="e"){html_more="";$.each(e.more,function(t){html_more+=build_search_event_row(e.more[t]);cntr++});if(html_more){$(".search_more_e").remove();e.total>cntr&&(html_more=html_more+"<div class='cat_action_more search_more_e'><input type='button' class='search_more' data-type='e' data-current='"+cntr+"' value='Load More' /></div>");$("#search_events_data_inner").append(html_more);$("#search_events_data_inner").trigger("create")}}}else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}});return!1});$(".element_event_details_toggle").live("tap",function(e,t){var n=$(this).attr("data-id"),r=$(this).attr("data-type");if($("#"+r+"event_details_"+n).is(":visible")){$("#"+r+"event_details_"+n).slideUp(300,function(){$(this).hide()});$(this).html("+ MORE")}else{$("#"+r+"event_details_"+n).slideDown(300,function(){$(this).trigger("create")});$(this).html("- LESS")}return!1});$(".toggle_more").live("tap",function(e,t){var n=$(this).attr("data-id"),r=$(this).attr("data-type");if($("#"+r+"event_details_"+n).is(":visible")){$("#"+r+"event_details_"+n).slideUp(300,function(){$(this).hide()});$("#"+r+"event_toggle_"+n).html("+ MORE")}else{$("#"+r+"event_details_"+n).slideDown(300,function(){$(this).trigger("create")});$("#"+r+"event_toggle_"+n).html("- LESS")}return!1});$("#cancel_goal").live("tap",function(e,t){$("#my_goals_dd").val("Select..");$("#my_goals_dd").selectmenu("refresh",!0);$("#add_goal_body").val("");$(".edit_goal_content").hide();$(".add_goal_content").show();$(".goal_tab").removeClass("goal_tab_on");$("#current_goal_tab").addClass("goal_tab_on");$(".goal_data").hide();$("#current_goal_data").show()});$("#edit_goal").live("tap",function(e,t){var n=$(this).attr("data-id"),r=$("#my_goals_edit_dd").val(),i=$("#edit_goal_body").val();$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});$.ajax({type:"POST",url:uri+"/api/user_goal_edit.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,goal_id:n,category_id:r,goal_content:i},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){$(".edit_goal_content").hide();$(".add_goal_content").show();$(".goal_tab").removeClass("goal_tab_on");$("#current_goal_tab").addClass("goal_tab_on");$(".goal_data").hide();$("#current_goal_data").show();$.mobile.silentScroll(0);loadGoals();notice("Goal has been saved",3500)}else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}});return!1});$(".goal_edit").live("tap",function(e,t){var n=$(this).attr("data-id");$.ajax({type:"POST",url:uri+"/api/user_goal_detail.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,goal_id:n},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){$(".add_goal_content").hide();$(".edit_goal_content").show();$("#my_goals_edit_dd").val(e.goal.Category.category_code);$("#my_goals_edit_dd").selectmenu("refresh",!0);$("#edit_goal_body").val(e.goal.UserGoal.goal_content);$("#edit_goal").attr("data-id",e.goal.UserGoal.id);$("#delete_goal").attr("data-id",e.goal.UserGoal.id);$(".goal_tab").removeClass("goal_tab_on");$("#add_goal_tab").addClass("goal_tab_on");$(".goal_data").hide();$("#add_goal_data").show()}else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}});return!1});$(".goal_delete, #delete_goal").live("tap",function(e,t){var n=$(this).attr("data-id");navigator.notification.confirm("Are you sure you want to delete this goal?",function(e){if(e==1){$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});$.ajax({type:"POST",url:uri+"/api/user_goal_delete.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,goal_id:n},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){loadGoals();$(".goal_tab").removeClass("goal_tab_on");$("#current_goal_tab").addClass("goal_tab_on");$(".goal_data").hide();$("#current_goal_data").show();notice("Goal has been deleted",3500)}else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}})}},"Delete Confirmation","Delete,Cancel");return!1});$("#complete_goal").live("tap",function(e,t){$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});var n=$(this).attr("data-id");$.ajax({type:"POST",url:uri+"/api/user_goal_complete.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,goal_id:n},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){loadGoals();$(".goal_tab").removeClass("goal_tab_on");$("#current_goal_tab").addClass("goal_tab_on");$(".goal_data").hide();$("#current_goal_data").show();notice("Goal completed successfully!",3500)}else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}});return!1});$("#save_goal").live("tap",function(e,t){$("#add_goal_body").blur();$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});var n=$("#my_goals_dd").val(),r=$("#add_goal_body").val(),i=$("#save_goal").attr("data-from_category");$.ajax({type:"POST",url:uri+"/api/user_goal_add.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,category_id:n,goal_content:r},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code!="200"){navigator.notification.alert("All fields are required.\n Try again.",function(){});hideMobile();return!1}loadGoals();$("#my_goals_dd").val("Select..");$("#my_goals_dd").selectmenu("refresh",!0);$("#add_goal_body").val("");$(".goal_tab").removeClass("goal_tab_on");$("#current_goal_tab").addClass("goal_tab_on");$(".goal_data").hide();$("#current_goal_data").show();if(i=="1"){backGoal="";history.back();notice("Goal has been added",3500)}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}});return!1});$(".set_goal").live("tap",function(e,t){var n=$(this).attr("data-category_id");$.mobile.changePage("#my_goals",{transition:"fade"});$("#my_goals_dd").val(n);$("#my_goals_dd").selectmenu("refresh",!0);$(".goal_tab").removeClass("goal_tab_on");$("#add_goal_tab").addClass("goal_tab_on");$(".goal_data").hide();$("#add_goal_data").show();backGoal="back";return!1});$(".fav_delete").live("tap",function(e,t){var n=parseInt($(this).attr("data-id")),r=$(this).attr("data-type");r=="i"||r=="r"?type_id_actual=1:type_id_actual=2;$.ajax({type:"POST",url:uri+"/api/user_favorite.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,favorite_type_id:n,favorite_type:type_id_actual},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200")$("#my_favorite_"+n).fadeOut(250,function(){$(this).hide();if(r=="i"){notice("Inspiration removed from My Favorites",3500);$("#fav_inspiration_data_inner div.fav_element_row:visible").length<1&&$("#fav_inspiration_data_inner .fav_data_nothing").show()}else if(r=="r"){notice("Resource removed from My Favorites",3500);$("#fav_resources_data_inner div.fav_element_row:visible").length<1&&$("#fav_resources_data_inner .fav_data_nothing").show()}});else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}});return!1});$(".myevents_delete").live("tap",function(e,t){var n=parseInt($(this).attr("data-id"));$.ajax({type:"POST",url:uri+"/api/user_events.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,event_id:n},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){$("#myevent_"+n).fadeOut(250,function(){$(this).hide();$("#myevents_event_details_"+n).hide();$("#myevents_event_toggle_"+n).hide();$("div.myevents_element_row:visible:first").addClass("first_child");if($("#myevents_data_inner div.myevents_element_row:visible").length<1){$(".myevents_data_nothing").trigger("create");$(".myevents_data_nothing").show()}});notice("Event has been deleted",3500)}else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}});return!1});$(".fave").live("tap",function(e,t){var n=parseInt($(this).attr("data-id")),r=$(this).attr("data-type");r=="i"||r=="r"?type_id_actual=1:type_id_actual=2;$.ajax({type:"POST",url:uri+"/api/user_favorite.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,favorite_type_id:n,favorite_type:type_id_actual},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200")if(e.action=="a"){$(".fave[data-id='"+n+"'][data-type='"+r+"']").addClass("fave_on");notice("Content added to My Favorites",3500)}else{$(".fave[data-id='"+n+"'][data-type='"+r+"']").removeClass("fave_on");notice("Content removed from My Favorites",3500)}else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}});return!1});$(".event_toggle").live("tap",function(e,t){var n=parseInt($(this).attr("data-id")),r=$(this).attr("data-type");$.ajax({type:"POST",url:uri+"/api/user_events.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,event_id:n},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200")if(e.action=="a"){$(".event_toggle[data-id='"+n+"'][data-type='"+r+"']").addClass("event_on");notice("Event added to My Events",3500)}else{$(".event_toggle[data-id='"+n+"'][data-type='"+r+"']").removeClass("event_on");notice("Event removed from My Events",3500)}else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}});return!1});$(".load_more").live("tap",function(e,t){var n=parseInt($(this).attr("data-category_id")),r=$(this).attr("data-type"),i=parseInt($(this).attr("data-current"));$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});$.ajax({type:"POST",url:uri+"/api/get_more.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,category_id:n,type:r,start:i},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){hideMobile();cntr=i;if(r=="i"){html_more="";$.each(e.more,function(t){html_more+=build_inspiration_row(e.more[t]);cntr++});if(html_more){$(".more_i").remove();e.total>cntr&&(html_more=html_more+"<div class='cat_action_more more_i'><input type='button' class='load_more' data-type='i' data-current='"+cntr+"' data-category_id='"+e.category.Category.id+"' value='Load More' /></div>");$("#inspired_data_inner").append(html_more);$("#inspired_data_inner").trigger("create")}}if(r=="r"){html_more="";$.each(e.more,function(t){html_more+=build_resource_row(e.more[t]);cntr++});if(html_more){$(".more_r").remove();e.total>cntr&&(html_more=html_more+"<div class='cat_action_more more_r'><input type='button' class='load_more' data-type='r' data-current='"+cntr+"' data-category_id='"+e.category.Category.id+"' value='Load More' /></div>");$("#resources_data_inner").append(html_more);$("#resources_data_inner").trigger("create")}}if(r=="e"){html_more="";$.each(e.more,function(t){html_more+=build_event_row(e.more[t]);cntr++});if(html_more){$(".more_e").remove();e.total>cntr&&(html_more=html_more+"<div class='cat_action_more more_e'><input type='button' class='load_more' data-type='e' data-current='"+cntr+"' data-category_id='"+e.category.Category.id+"' value='Load More' /></div>");$("#involved_data_inner").append(html_more);$("#involved_data_inner").trigger("create")}}}else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}});return!1});$(".root_category").live("tap",function(e){var t=parseInt($(this).attr("data-id"));buildSubcat(t);$("#home .ua-header").hide();$("#subhome .ua-header").show();gaPlugin.trackPage(successHandler,errorHandler,"/app/home/"+$(this).attr("data-code"));$.mobile.changePage("#subhome",{transition:"slide"});return!1});$(".sub_category").live("tap",function(e){console.log("sub_category tap");$("#inspired_data_inner").html('<div class="cat_data_nothing">Nothing found.</div>');$("#resources_data_inner").html('<div class="cat_data_nothing">Nothing found.</div>');$("#involved_data_inner").html('<div class="cat_data_nothing">Nothing found.</div>');$("#inspired_data_inner").trigger("create");$("#resources_data_inner").trigger("create");$("#involved_data_inner").trigger("create");$("#cathome .ua-header").show();$(".cat_tab").removeClass("cat_tab_on");$("#involved_tab").addClass("cat_tab_on");$(".cat_data").hide();$("#involved_data").show();var t=parseInt($(this).attr("data-id"));$.mobile.loading("show",{text:loading_text,textVisible:!0,theme:"e",html:""});$.ajax({type:"POST",url:uri+"/api/sub_category.json?ts="+(new Date).getTime(),data:{user:localStorage.userid,hash:localStorage.password_hash,category_id:t},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200"){$(".tweet_link").attr("data-href","http://twitter.com/intent/tweet?hashtags="+e.category.Category.hash_tag);$(".tweet_convo_link").attr("data-href","https://mobile.twitter.com/search/%23"+e.category.Category.hash_tag);$(".tweet_hash").text(e.category.Category.hash_tag);$(".set_goal").attr("data-category_id",e.category.Category.category_code);$("#cathome .h3").html(e.parent_category.Category.category_description+": <br/><span class='cathome_h3'>"+e.category.Category.category_description+"</span>");$("#cat_resource_dd").attr("data-category_id",t);cat_inspirations_txt="";inspiration_cnt=0;interrupt_inspiration=!1;inspiration_content=!1;$.each(e.inspirations,function(t){cat_inspirations_txt+=build_inspiration_row(e.inspirations[t]);if(inspiration_cnt==4){cat_inspirations_txt+=build_interruptor(e);interrupt_inspiration=!0}inspiration_cnt++;inspiration_content=!0});if(!interrupt_inspiration){cat_inspirations_txt+=build_interruptor(e);interrupt_inspiration=!0}e.totals.inspirations>inspiration_cnt&&(cat_inspirations_txt=cat_inspirations_txt+"<div class='cat_action_more more_i'><input type='button' class='load_more' data-type='i' data-current='"+inspiration_cnt+"' data-category_id='"+e.category.Category.id+"' value='Load More' /></div>");cat_resources_txt="";resource_cnt=0;interrupt_resource=!1;resource_content=!1;$.each(e.resources,function(t){cat_resources_txt+=build_resource_row(e.resources[t]);if(resource_cnt==4){cat_resources_txt+=build_interruptor(e);interrupt_resource=!0}resource_cnt++;resource_content=!0});if(!interrupt_resource){cat_resources_txt+=build_interruptor(e);interrupt_resource=!0}e.totals.resources>resource_cnt&&(cat_resources_txt=cat_resources_txt+"<div class='cat_action_more more_r'><input type='button' class='load_more' data-type='r' data-current='"+resource_cnt+"' data-category_id='"+e.category.Category.id+"' value='Load More' /></div>");cat_events_txt="";event_cnt=0;interrupt_event=!1;event_content=!1;$.each(e.events,function(t){cat_events_txt+=build_event_row(e.events[t]);if(event_cnt==4){cat_events_txt+=build_interruptor(e);interrupt_event=!0}event_cnt++;event_content=!0});if(!interrupt_event){cat_events_txt+=build_interruptor(e);interrupt_event=!0}e.totals.events>event_cnt&&(cat_events_txt=cat_events_txt+"<div class='cat_action_more more_e'><input type='button' class='load_more' data-type='e' data-current='"+event_cnt+"' data-category_id='"+e.category.Category.id+"' value='Load More' /></div>");inspiration_content&&$("#inspired_data_inner").html(cat_inspirations_txt);resource_content&&$("#resources_data_inner").html(cat_resources_txt);event_content&&$("#involved_data_inner").html(cat_events_txt);$("#inspired_data_inner").trigger("create");$("#resources_data_inner").trigger("create");$("#involved_data_inner").trigger("create");hideMobile();gaPlugin.trackPage(successHandler,errorHandler,"/app/category/"+t);$(".cat_page").show();$("#subhome .ua-header").hide();$.mobile.changePage("#cathome",{transition:"none"})}else{notice(generic_error,5e3);hideMobile()}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}})});$(".hdrimg, .ret_pullstring").live("tap",function(){var e=parseInt($(".pullr").css("top"),10);device.platform=="iPhone"||device.platform=="iPhone Simulator"?e<0?$(".pullr").animate({top:"20px"},600):$(".pullr").animate({top:"-"+menu_offset+"px"},600):e<0?$(".pullr").css("top","20px"):$(".pullr").css("top","-"+menu_offset+"px");return!1});$(".cb_call").live("tap",function(e,t){var n=$(this).attr("data-href");cb.showWebPage(n,{showLocationBar:!0});return!1});$(".add_ical").live("tap",function(e,t){var n=$(this).attr("data-id");$.ajax({type:"POST",url:uri+"/api/get_event.json?ts="+(new Date).getTime(),data:{event_id:n},dataType:"json",timeout:1e4,success:function(e){if(e.status.status_code=="200")createEvent(e.event.Event.title,e.event.Event.event_locator,e.event.Event.description,e.event.Event.start_date,e.event.Event.end_date);else{hideMobile();notice(generic_error,5e3)}},error:function(e,t,n){hideMobile();notice(specific_error+n,5e3)}});return!1});

(function( $ ){
	$.fn.retina = function(retina_part) {
		// Set default retina file part to '-2x'
		// Eg. some_image.jpg will become some_image-2x.jpg
		var settings = {'retina_part': '@2x'};
		if(retina_part) jQuery.extend(settings, { 'retina_part': retina_part });

		if(window.devicePixelRatio >= 2) {
			this.each(function(index, element) {
				if(!$(element).attr('src')) return;
				
				var checkForRetina = new RegExp("(.+)("+settings['retina_part']+"\\.\\w{3,4})");
				if(checkForRetina.test($(element).attr('src'))) return;

				var new_image_src = $(element).attr('src').replace(/(.+)(\.\w{3,4})$/, "$1"+ settings['retina_part'] +"$2");
				$.ajax({url: new_image_src, type: "HEAD", success: function() {
					$(element).attr('src', new_image_src);
				}});
			});
		}
		return this;
	}
})( jQuery );
