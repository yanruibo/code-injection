



			$('#feedback').click(function(e) {				
				logUserData({"View":"Settings","Item":"Feedback","Action":"Clicked"});
			});                                   
		



            function onBodyLoad()
            {		
                document.addEventListener("deviceready",onDeviceReady,false);
                console.log('index test');
            }
        









			$('#call').click(function(e) {				
				logUserData({"View":"Local Resources/Help","Item":"Call","Action":"Clicked"});
			}); 
			$('#email').click(function(e) {				
				logUserData({"View":"Local Resources/Help","Item":"Email","Action":"Clicked"});
			}); 			
		

/**
 * LifeArmor Accessibility Module
 * @Author: Chris Allen, Darren Basler
 * 
 * If you read the comments at the top of lifearmor.js, you'll find several 'standards' that need to be 
 * maintained to allow boilerplate code to run for given types of pages.  Accessibility adds more
 * standards, defined here.  Mostly, abiding by these just allows pages to be automatically read.
 * 	* All learn pages should have id='learn'.
 * 	* All assessment pages should have id='assessment'.
 * 	* All tool pages should have class='tool'.
 */

/*
 * We can set device="FAKE" (currently can be set in start-fake.html to FAKE that we're on a device.  
 * This will turn on accessibility, even in a browser. Obviously, it will only read text to the console, 
 * but it's very useful for getting things together quickly. 
 */


/*
 * Global variable to tell us whether accessibility is on or not.
 */
var accessibility_on = false;

/**
 * All actions here get sent to AccessibilityPlugin.execute and pass the action name.
 * @return Instance of AccessibilityPlugin
 */
var AccessibilityPlugin = function() {};

/**
 * @param directory        The directory for which we want the listing
 * @param successCallback  The callback which will be called on successful completion
 * @param failureCallback  The callback which will be called on error
 */
AccessibilityPlugin.prototype.checkAccessibility = function(successCallback, failureCallback)
{
	return PhoneGap.exec(successCallback, failureCallback, 'AccessibilityPlugin', 'checkAccessibility', [] ); 
};

/**
 * <ul>
 * <li>Register the Accessibility Plugin</li>
 * <li>Also register native call which will be called when this plugin runs</li>
 * </ul>
 */
PhoneGap.addConstructor(function() {
	PhoneGap.addPlugin('accessibility', new AccessibilityPlugin());
});


/******************************************************/


function updateAccessibilitySetting ()
{
	console.debug("Updating Accessibility flag");
	// only run if we're on a device.
	if (device != null) {
		try
		{
			window.plugins.accessibility.checkAccessibility(
				function (bool) {
					console.info("Accessibility: Device set to: " + bool);
					accessibility_on = bool;
				}, 
				function () {
					console.warn("Accessibility: Device setting could not be determined.  Set to false.");
					accessibility_on = false;
				}
			);
		}
		catch (accessibility_err) {
			console.error("Error calling accessibility:" + accessibility_err);
			accessibility_on = false;
		}
	}
};

function initAccessibility () {
	setupAccessibility();
}

/**
 * These elements will have click events registered that will allow them to be spoken when clicked.
 */
var ACCESSIBLE_ELEMENTS = 'a, #favorite, .respeakable, h1, label, button, div.ui-controlgroup-label';

/*
 * Important note: I tried (hard) to inject our code into the jqm click handlers so that we could emulate
 * iOS and do single-click speaks and double-click activates.  It turns out that it is very complicated, with
 * handling being done in jqm's virtual-click layer, jquery's event scheme, and also (!) jqm's events registered
 * directly with the document (outside of jQuery!).  To make matters worse, Android's webkit grabs all double-
 * click events and tries to do a browser zoom (which is disabled by PhoneGap).  I even implemented a mousedown
 * double-click emulator with some success, but it was occassionally problematic and refused to behave.
 *  After chasing the rabbit down the hole for a long time and essentially getting stuck, I decided to "DRINK ME" 
 *  so I could get through the little door into the Queen's garden.  It's nicer here, but the grounds-keepers are a 
 *  bit strange. Anyway, we've decided to implement Android style accessibility, where you click on something 
 *  and it just tells you what you're doing while it does it.  Much easier,  but also fraught with some strangeness. -ca  
 */

//$(document).ready(function () {
function setupAccessibility () {
	console.debug('Accessibility initializing');
	/* 
	 * Accessibility code that runs on every pageshow.  Note the data-role bit.  Because of the way
	 * live events are done, a 'div'.live fires before the '#id'.live events registered in lifearmor.js.  So,
	 * adding the data-role selector slows it down so that it fires after events registered on ids.  
	 */
	$('div[data-role="page"]').live('pageshow.accessibility', function (event, ui) {
		// check accessibility on every pageshow, in case the user has just turned it on.
		updateAccessibilitySetting(); //TODO: This doesn't work, as the following code usually completes before the callback fires.
		if (accessibility_on && localStorage.getItem("pref_accessibility_enabled") == true) {
			/*
			 * attach a click listener as the very first bind on any ACCESSIBLE ELEMENT.
			 * there's an important reason we have to do this as a bind on each page load
			 * instead of as a live event: it has to be first.  the anchor clicks, in particular, must
			 * be read before any following text, and  clicking on an anchor flushes any
			 * text currently being read.
			 */
			
			var accessibles = $(this).find(ACCESSIBLE_ELEMENTS);
			console.debug('Attaching events to accessible elements:', accessibles.length);
			accessibles.bindFirst('click.accessibility', function(event, ui) {
				//console.debug('click.accessibility', event);
				speakSmarter(this, event);
			});
			accessibles.bindFirst('taphold.accessibility', function(event, ui) {
				//console.debug('taphold.accessibility');
				event.preventDefault();
				speakSmarter(this, event);
			});			
		}
	});

	/*
	 * main and foursquares, we can just read aloud.
	 */
	$('#main, #foursquare').live('pageshow.accessibility',function(event, ui) {
		if (accessibility_on && localStorage.getItem("pref_accessibility_enabled") == true) {
			speakSmarter(this, event);
		}
	});

	$('#learn').live('pageshow', function(event) {
		if (accessibility_on) {
			// get rid of the pesky "click to expand contents" spans.  they don't do anything for us in this env except try to get spoken.
			$('span.ui-collapsible-heading-status').remove();
			var text = '';
			
			var h3s = $(this).find('h3 > a > span > span.ui-btn-text').clone();
			$(h3s).children().remove();
			
			text = text + $(this).find('h1').text() + '.';
			text = text + $(h3s).delimitedText('.');
			text = text + $(this).find('.navbar');
			speakSmarter(text);
		}
	});
	
	$('div[data-role="page"].assessment').live('pageshow.accessibility', function(event, ui) {
		if (accessibility_on) {
			speakSmarter(this, event);
		}
	});
	
	/*
	 * tools pages... we need to be a bit smarter and speak elements explicitly.
	 */
	$('div[data-role="page"].tool').live('pageshow.accessibility',function(event, ui) {
		if (accessibility_on) {
			if ($(this).has('.interactive-message').length > 0) {
				speakSmarter($(this).find('h1').text() + ". " + $(this).find('.interactive-instruct').text(), event);
				// Note: the text of the interactive gets read by an 'update' event generated by rotateText
				
				// this next part is a bit of a hack.  I had trouble with the timing, and how to get the footer to
				// read AFTER the text had rotated for the first time.  So... we simply pause 1 sec to allow the 
				// text to load before we add the button and navbar to the speak queue.
				$('.interactive-message').one('update.accessibility', function(event, ui) {
					window.setTimeout( function () {
						speakSmarter($('div.tool button').text() + " button." +  $('.navbar').text(), null);
					}, 1000);
				});
			}
			else {
				speakSmarter(this, event);
			}
		}	
	});

	/*
	 * On any pagehide, stop the TTS engine, so that we don't keep a-speakin away.
	 */
	$('div').live('pagehide.accessibility', function (event, ui) {
		if (accessibility_on) {
			// allow anchors to come through, as it is probably speaking "clicked whatever",
			// otherwise, always kill tts on page change.
			if (lastSpokenNodeName !== 'A') {
				text_to_speech("stop");
			}
		}
	});
	
	$('div.ui-collapsible-contain').live('expand.accessibility',  function(event) {
		if (accessibility_on) {		
			speakSmarter("clicked " + $(this).find('span.ui-btn-text:first').text() + "." + $(this).children('.ui-collapsible-content').text(), event);
		}
	});
	
	/*
	 * When we receive word (update) that the message has changed, read it.
	 */
	$('.interactive-message').live('update.accessibility', function(event, ui) {
		if (accessibility_on) {
			speakSmarter($('.interactive-message'), null);
		}
	});
	
	/*
	 * When a clock has changed, read it.
	 */
	$('.clock').live('update.accessibility', function(event, ui) {
		if (accessibility_on) {
			speakSmarter($(this).text(), null);
		}
	});	
	console.debug('Accessibility initialized');
}



var lastSpokenNodeName = null;
/**
 * A reusable function to help us say things smarter.
 * @param stuff  Stuff to say
 * @param event  We need the event to find out how to be smarter.
 */
function speakSmarter(stuff, event) {
	var text = '';
	if (stuff instanceof HTMLElement) {
		text = $(stuff).text();
	}
	else if (stuff instanceof jQuery){
		$(stuff).each(function(i, element) {
			if (element instanceof HTMLElement){
				text = text + $(element).text();
			} 
			else {
				text = text + stuff;
			}
		});
	}
	else {
		text = stuff;
	}
	
	//console.debug('speakSmarter', text);
	
	var nodeName = null;
	var addOption = 'add';
	
	// if we have an event, be smarter.
	if (event) {
		
		if (event.currentTarget) {
			nodeName = event.currentTarget.nodeName;
			//if a or button, add 'clicked'
			if (nodeName === 'A' || nodeName === 'BUTTON') {
				text = 'clicked ' + text;
				addOption = 'flush';
			}
			if (event.currentTarget.id === 'favorite') {
				addOption = 'flush';
			}
		}
		
		// clicky handling seems broken on devices with anchors.  so, we read the click on expand.
		console.log(event.type);
		if (event.type === 'expand') {
			addOption = 'flush';
		}
	}
	
	// if we just did an anchor, always add, don't flush.
	if (lastSpokenNodeName === 'A') {
		console.debug('speakSmarter just spoke an anchor.  ADD.');
		addOption = 'add';
	}
	lastSpokenNodeName = nodeName;
	text_to_speech(text, addOption);
}




/*
 * Since .text() runs text together, this function allows you to add a delimiter between elements.
 * NOTE: This probably doesn't work yet if there are child elements.
 */
$.fn.extend({
	delimitedText: function(delimiter) {
		var newthis = $(this).clone();
		var result =  $(newthis).text( function(i, string) {
			return string + delimiter;
		});
		return result.text();
	}
});

/*
 *
 * LifeArmor
 *
 * Copyright Â© 2009-2012 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright Â© 2009-2012 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 *
 */

function checked(name,id, errorArray)
{
	var number;
	var number_as_string;
	
	// Checked
	errorArray.pop();
	// You found a checked element so it's no longer an error
	choice_selected = name;
	number_as_string = choice_selected.match(/\d+/);
	number = parseInt(number_as_string[0], 10);
	if ($("#error" + number).length > 0)
	{
		$("#error" + number).remove();
	}
	return choice_selected;
}

function unchecked(name,id, errorArray, choice_selected)
{
	var number;
	var number_as_string;
	
	if (errorArray.indexOf(id) === -1) {
		// We check every individual element to see if it's not checked.
		// If it's not, we list it as an error.
		if (choice_selected !== name)
		{
			if (errorArray.indexOf(name) === -1)
			{
				errorArray.push(name);
				number_as_string = name.match(/\d+/);
				// Don't add 'Invalid answer' twice if it's already there
				number = parseInt(number_as_string[0], 10);
				
				// Add the span saying Required question if it doesn't already exist
				// Change the label to red
				if ($("#error" + number).length <= 0)
				{
					$("#" + name + "_fieldcontain .ui-controlgroup-label")
					.after("<span id=error" + number+ " style='color:red'>Required question</span>").trigger('create');
				}
			}
		}
	}
}

function getCurrentPage() 
{
   var base = 'www';//Cut off in Path,
   var result = '';
   
   if(location.hash) //Parse Hash
       result = location.hash.substring(1);
   else
       result = location.pathname;
	   
   var path = jQuery.mobile.path.parseUrl(result).pathname;
   var indexPosition = path.indexOf(base);
   
   if(indexPosition > -1)
       path = path.substring(path.indexOf(base)+base.length+1);
	   
   indexPosition = path.indexOf('&');
   
   if(indexPosition > -1) 
   {
	   path = path.replace("&ui-state=", " ");
   }
   return path;
}



			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		




// accessibility page reading automatically provided by accessibility.js

var results = null;
$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#assessment-submit").bind("tap", function (e) {
	e.preventDefault();
	var total = 0;
	var numChecked = 0;
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		
		total = total + Number($(this).val());
		numChecked = numChecked + 1;
	});

	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='radio']").each(function () {
		
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});

	if (numChecked < 17) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	
	var last = localStorage.getItem("milSexTraumaAssessLastScore");
	var key = score(last) + "-" + score(total);
	localStorage.setItem("milSexTraumaAssessLastScore", total);

	resultsText = results[key];
	if (resultsText == null || resultsText.length == 0) {
		resultsText = "An error occurred while scoring this assessment.";
	}
	
	footerText = results['FOOTER'];
	if (footerText == null || footerText.length == 0) {
		footerText = "";
	}

	var currentpage = getCurrentPage().replace(".html","").split("/");
	$("input[type='radio']:checked").each(function () {
		var questionText = "";
		$(this).closest('fieldset').children().each(function() {
			questionText = $(this).text();
			console.log($(this).text());
			return false;
		});
		
		logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
	});
    logUserData({"View":currentpage[1] + " assessment","Item":"","Action":"Completed","Value":total});
	
	// display the scored results.
	alertDialog(resultsText + footerText, 'Results', 2);
	//history.back();
	
	//this was working, but broke.
/*	$(this).simpledialog({
		'mode' : 'bool',
		'prompt' : '<div class="popup-text">' + results[key] + '</div>',
		'buttons' : {
			'OK': {
				click: function () {
					reset();
					//history.back();
				}
			}
		}
	});*/
}); 




/* apply scoring algorithm */
function score(total) {
	if (total == null) {
		return null;
	}
	else if (total <= 33) {
		return "low";
	}
	else if (total <= 43) {
		return "med";
	}
	else {
		return "high";
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}







					$('#videos').bind("pageshow", function(event) {
						displayPlaylist( 1054629571001 );
					});
				


			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		






			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		




// accessibility page reading automatically provided by accessibility.js

var results = null;

$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#anger_assessment-submit").bind("tap", function (e) {
	e.preventDefault();
	var total = 0;
	var numChecked = 0;
	$("input").each(function () {
		// add up each checked radio button.
		total = total + Number($(this).val());
		numChecked = numChecked + 1;
		
	});
	console.debug(total);
	
	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='range']").each(function () {
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});
	
	if (numChecked < 7) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	
	var last = localStorage.getItem("angerAssessLastScore");
	var key = score(last) + "-" + score(total);
	localStorage.setItem("angerAssessLastScore", total);

	//displayed scored results
	alertDialog(results[key], 'Results', 2);
	//history.back();
}); 

/* apply scoring algorithm */
function score(total) {
	if (total == null) {
		return null;
	}
	else if (total <= 22) {
		return "low";
	}
	else if (total <= 42) {
		return "med";
	}
	else {
		return "high";
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}





// accessibility page reading automatically provided by accessibility.js

var results = null;
$('.assessment').bind('pageshow.assessment', function(event, ui) {
    /* Load results data */
    $.getJSON('assessment.json', function (data) {
        results = data;
    });
});

$("#anger_assessment-submit").bind("tap", function (e) {
    e.preventDefault();
    var total = 0;
    var numChecked = 0;
    $("input[type='radio']:checked").each(function () {
        // add up each checked radio button.
        
        total = total + Number($(this).val());
        numChecked = numChecked + 1;
    });

    var errorArray = new Array();
    var choice_selected = null;
    var name = null;
    var id = null;
    
    $("input[type='radio']").each(function () {
        name = $(this).attr("name");
        id = $(this).attr("id");
        
        // add up each checked radio button.
        if ($(this).attr("checked"))
        {
            choice_selected = checked(name, id, errorArray);
        }
        else
        {
            // Unchecked
            unchecked(name, id, errorArray, choice_selected);
        }
    });
    
    if (numChecked < 7) {
        console.log('not done');
        $(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
        return false;
    }
    
    var last = localStorage.getItem("angerAssessLastScore");
    var key = score(last) + "-" + score(total);
    localStorage.setItem("angerAssessLastScore", total);

	var currentpage = getCurrentPage().replace(".html","").split("/");
	$("input[type='radio']:checked").each(function () {
		var questionText = "";
		$(this).closest('fieldset').children().each(function() {
			questionText = $(this).text();
			console.log($(this).text());
			return false;
		});
		
		logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
	});
    logUserData({"View":currentpage[1] + " assessment","Item":"","Action":"Completed","Value":total});
    //displayed scored results
    alertDialog(results[key], 'Results', 2);
    //history.back();
}); 

/* apply scoring algorithm */
function score(total) {
    if (total == null) {
        return null;
    }
    else if (total <= 22) {
        return "low";
    }
    else if (total <= 42) {
        return "med";
    }
    else {
        return "high";
    }
}

/* reset all radio buttons */
function reset() {
    $('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}







$('#videos').bind("pageshow", function(event) {
	displayPlaylist( 1046591994001 );
});
			


			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		




// accessibility page reading automatically provided by accessibility.js

var results = null;
$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#depression_assessment-submit").bind("tap", function (e) {
	e.preventDefault();
	var total = 0;
	var numChecked = 0;
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		total = total + Number($(this).val());
		numChecked = numChecked + 1;
	});

	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='radio']").each(function () {
		
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});
	
	if (numChecked < 9) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	var last = localStorage.getItem("depressionAssessLastScore");
	var key = score(last) + "-" + score(total);
	localStorage.setItem("depressionAssessLastScore", total);

	var currentpage = getCurrentPage().replace(".html","").split("/");
	$("input[type='radio']:checked").each(function () {
		var questionText = "";
		$(this).closest('fieldset').children().each(function() {
			questionText = $(this).text();
			console.log($(this).text());
			return false;
		});
		
		logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
	});
    logUserData({"View":currentpage[1] + " assessment","Item":"","Action":"Completed","Value":total});
	//displayed scored results
	alertDialog(results[key], 'Results', 2);
}); 

/* apply scoring algorithm */
function score(total) {
	if (total == null) {
		return null;
	}
	else if (total <= 4) {
		return "low";
	}
	else if (total <= 15) {
		return "med";
	}
	else {
		return "high";
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}







$('#videos').bind("pageshow", function(event) {
	displayPlaylist( 1054629565001 );
});
			


			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		







					$('#videos').bind("pageshow", function(event) {
						displayPlaylist( 1054629568001 );
					});
				


			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		




// accessibility page reading automatically provided by accessibility.js

var results = null;
$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#spirituality_assessment-submit").bind("tap", function (e) {
	e.preventDefault();
	var numChecked = 0;
	var answers = new Array();
	var total = 0;
	
	//Initialize the answers array to zeros.
	for(var i = 0; i < 5; i++)
	{
		answers[i] = 0;
	}
	
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		total += Number($(this).val());
		answers[Number($(this).val())]++;
		numChecked = numChecked + 1;
	});

	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='radio']").each(function () {
		
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});
	
	if (numChecked < 15) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	
	var last = localStorage.getItem("spiritualityAssessLastScore");
	var now = score(answers);
	var key = last + "-" + now;
	localStorage.setItem("spiritualityAssessLastScore", now);

	var currentpage = getCurrentPage().replace(".html","").split("/");
	$("input[type='radio']:checked").each(function () {
		var questionText = "";
		$(this).closest('fieldset').children().each(function() {
			questionText = $(this).text();
			console.log($(this).text());
			return false;
		});
		
		logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
	});
    logUserData({"View":currentpage[1] + " assessment","Item":"","Action":"Completed","Value":total});
	//displayed scored results
	alertDialog(results[key], 'Results', 2);
	//history.back();
}); 

/* apply scoring algorithm */
function score(answers) {
	if (answers == null) {
		return null;
	}	
	else if (answers[1] == 15 || (answers[1] >= 6 && answers[1] + answers[2] == 15)) {
		return "low";
	}
	else if (answers[2] == 2 && answers[2] + answers[1] == 15) {
		return "med";
	}
	else if(((answers[3] + answers[4]) >= 2) 
		|| ((answers[2] + answers[3] + answers[4]) >= 3)
		|| (answers[2] == 1 && (answers[3] > 0 || answers[4] > 0))){
		return "high";
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}







					$('#videos').bind("pageshow", function(event) {
						displayPlaylist( 1057669879001 );
					});
				


			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		




// accessibility page reading automatically provided by accessibility.js

var results = null;
$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#families_friendships_assessment-submit").bind("tap", function (e) {
	//log.debug("Tap");
	e.preventDefault();
	var total = 0;
	var numChecked = 0;
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		
		total = total + Number($(this).val());
		numChecked = numChecked + 1;
	});

	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='radio']").each(function () {
		
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});
	
	if (numChecked < 6) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	
	var last = localStorage.getItem("mtbiAssessLastScore");
	var key = score(last) + "-" + score(total);
	localStorage.setItem("mtbiAssessLastScore", total);

	var currentpage = getCurrentPage().replace(".html","").split("/");
	$("input[type='radio']:checked").each(function () {
		var questionText = "";
		$(this).closest('fieldset').children().each(function() {
			questionText = $(this).text();
			console.log($(this).text());
			return false;
		});
		
		logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
	});
    logUserData({"View":currentpage[1] + " assessment","Item":"","Action":"Completed","Value":total});

	// display scored results
	alertDialog(results[key], 'Results', 2);
	//history.back();
}); 




/* apply scoring algorithm */
function score(total) {
	if (total == null) {
		return null;
	}
	else if (total <= 15) {
		return "low";
	}
	else if (total <= 18) {
		return "med";
	}
	else {
		return "high";
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}







$('#videos').bind("pageshow", function(event) {
	displayPlaylist( 1054629566001 );
});
			


			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		




// accessibility page reading automatically provided by accessibility.js

var results = null;

$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#anxiety_assessment-submit").bind("tap", function (e) {
	e.preventDefault();
	var numChecked = 0;
	var answers = new Array();
	var index = 0;
	var total = 0;
	
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		total += Number($(this).val());
		answers[index] = Number($(this).val());
		index = index + 1;
		numChecked = numChecked + 1;
	});

	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='radio']").each(function () {
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});
	
	if (numChecked < 7) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	
	var last = localStorage.getItem("anxietyAssessLastScore");
	var now = scoreViaQuestions(answers);
	var key = last + "-" + now;
	console.log(key);
	localStorage.setItem("anxietyAssessLastScore", now);

	var currentpage = getCurrentPage().replace(".html","").split("/");
	$("input[type='radio']:checked").each(function () {
		var questionText = "";
		$(this).closest('fieldset').children().each(function() {
			questionText = $(this).text();
			console.log($(this).text());
			return false;
		});
		
		logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
	});
    logUserData({"View":currentpage[1] + " assessment","Item":"","Action":"Completed","Value":total});
	// display the scored results.
	alertDialog(results[key], 'Results', 2);
	//history.back();
}); 

/* apply current assessment scoring algorithm */
function scoreViaQuestions(answers){

	if(answers == null)
	{
		return "null";
	}
	
	if(answers[0] == 1)
	{
		return "low";
	}
	if(answers[0] == 2 || answers[0] == 3)
	{
		var highcount = 0;
		var medcount = 0;
		for(var i = 1; i < answers.length; i++)
		{
			if(answers[i] > 2)
			{
				highcount++;
			}
			if(answers[i] > 1)
			{
				medcount++;
			}
		}
		if(answers[0] == 3 && highcount > 2)
		{
			return "high";
		}
		else if(medcount > 0)
		{
			return "med";
		}
	}
	if(answers[0] == 3 || answers[0] == 4)
	{
		var count = 0;
		for(var i = 1; i < answers.length; i++)
		{
			if(answers[i] > 2)
			{
				count++;
			}
		}
		if(count > 2)
		{
			return "high";
		}
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}






			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		




// accessibility page reading automatically provided by accessibility.js

var results = null;
$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#tobacco-assessment-submit").bind("tap", function (e) {
	//log.debug("Tap");
	e.preventDefault();
	var total = 0;
	var numChecked = 0;
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		
		total = total + Number($(this).val());
		numChecked = numChecked + 1;
	});

	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='radio']").each(function () {
		
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});

	if (numChecked < 6) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	
	var last = localStorage.getItem("tobaccoAssessLastScore");
	var key = score(last) + "-" + score(total);
	localStorage.setItem("tobaccoAssessLastScore", total);

	var currentpage = getCurrentPage().replace(".html","").split("/");
	$("input[type='radio']:checked").each(function () {
		var questionText = "";
		$(this).closest('fieldset').children().each(function() {
			questionText = $(this).text();
			console.log($(this).text());
			return false;
		});
		
		logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
	});
    logUserData({"View":currentpage[1] + " assessment","Item":"","Action":"Completed","Value":total});
	alertDialog(results[key], 'Results', 2);
	//history.back();
}); 




/* apply scoring algorithm */
function score(total) {
	if (total == null) {
		return null;
	}
	else if (total <= 4) {
		return "low";
	}
	else if (total <= 6) {
		return "med";
	}
	else {
		return "high";
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}







					$('#videos').bind("pageshow", function(event) {
						displayPlaylist( 1057669882001 );
					});
				


			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		




// accessibility page reading automatically provided by accessibility.js

var results = null;
$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#sleep_assessment-submit").bind("tap", function (e) {
	e.preventDefault();
	var total = 0;
	var numChecked = 0;
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		total = total + Number($(this).val());
		numChecked = numChecked + 1;
	});

	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='radio']").each(function () {
		
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});
	
	if (numChecked < 10) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	var last = localStorage.getItem("sleepAssessLastScore");
	var key = score(last) + "-" + score(total);
	localStorage.setItem("sleepAssessLastScore", total);

	var currentpage = getCurrentPage().replace(".html","").split("/");
	$("input[type='radio']:checked").each(function () {
		var questionText = "";
		$(this).closest('fieldset').children().each(function() {
			questionText = $(this).text();
			console.log($(this).text());
			return false;
		});
		
		logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
	});
    logUserData({"View":currentpage[1] + " assessment","Item":"","Action":"Completed","Value":total});
	//displayed scored results
	alertDialog(results[key], 'Results', 2);
}); 

/* apply scoring algorithm */
function score(total) {
	if (total == null) {
		return null;
	}
	else if (total <= 0) {
		return "low";
	}
	else if (total <= 2) {
		return "med";
	}
	else {
		return "high";
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}









$('#videos').bind("pageshow", function(event) {
	displayPlaylist( 1054629576001 );
});
			


			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		




// accessibility page reading automatically provided by accessibility.js

var results = null;
$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#pys_injury_assessment-submit").bind("tap", function (e) {
	e.preventDefault();
	var total = 0;
	var numChecked = 0;
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		
		total = total + Number($(this).val());
		numChecked = numChecked + 1;
	});

	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='radio']").each(function () {
		
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});

	if (numChecked < 22) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	
	var last = localStorage.getItem("physicalInjuryAssessLastScore");
	var key = score(last) + "-" + score(total);
	localStorage.setItem("physicalInjuryAssessLastScore", total);

	var currentpage = getCurrentPage().replace(".html","").split("/");
	$("input[type='radio']:checked").each(function () {
		var questionText = "";
		$(this).closest('fieldset').children().each(function() {
			questionText = $(this).text();
			console.log($(this).text());
			return false;
		});
		
		logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
	});
    logUserData({"View":currentpage[1] + " assessment","Item":"","Action":"Completed","Value":total});
	// display the scored results.
	alertDialog(results[key], 'Results', 2);
	//history.back();
	
	//this was working, but broke.
/*	$(this).simpledialog({
		'mode' : 'bool',
		'prompt' : '<div class="popup-text">' + results[key] + '</div>',
		'buttons' : {
			'OK': {
				click: function () {
					reset();
					//history.back();
				}
			}
		}
	});*/
}); 




/* apply scoring algorithm */
function score(total) {
	if (total == null) {
		return null;
	}
	else if (total <= 49) {
		return "low";
	}
	else if (total <= 70) {
		return "med";
	}
	else {
		return "high";
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}







					$('#videos').bind("pageshow", function(event) {
						displayPlaylist( 1054629573001 );
					});
				


			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		







var results = null;
var alcohol_drugs_array = new Array();
var begin = null;
var drug = null;
var end = null;
var alcohol_pressed = false;
var cannabis_pressed = false;
var cocaine_pressed = false;
var amphetamine_pressed = false;
var sedatives_pressed = false;
var other_drug_use_pressed = false;

var show_2_alcohol = false, 
	show_2_cannabis = false, 
	show_2_cocaine = false, 
	show_2_amphetamine = false,
	show_2_sedatives = false;
	show_2_other_drug_use = false;

	var notAtAll = "Not at all";
	var severalDays = "Several days";
	var moreHalfDays = "More than half the days";
	var nEveryDay = "Nearly every day";
	var daily = "Daily or almost daily";

	var noNever = "No, Never";
	var yPast3Mo = "Yes, in the past 3 month";
	var yNPast3Mo = "Yes, but not in the past 3 months";

	var never = "Never";
	var onceOrTwice = "Once or twice";
	var monthly = "Monthly";
	var weekly = "Weekly";

$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});

	// Hide the legend at first, we only show it when a yes has been chosen for 
	// one of the options of question 1
	$("#2_legend").hide();
});



/* Replace the word substance with the current drug chosen*/
function add_text(id, drug_of_choice)
{
	var new_text;
	new_text = $(id).text();
		
	// Need to replace all occurrences of [substance]
	new_text = new_text.replace('[substance]', drug_of_choice);
	$(id).text(new_text);
}

/*************************************************************************************************/
/*
 * 
 1a - 1f are if the user has ever used these drugs in their life  
 */
/*************************************************************************************************/
$(":input[name='1a']").bind("change", function(event, ui) {
	var drug_of_choice = 'Alcohol (beer, wine, spirits, etc.)';
	if ($(this).val() === '1') {
		if ($("#2:hidden"))
		{
			$("#2_legend").show();
		}
		
		/*
		 * If alcohol hasn't been chosen already then create question 2 
		 * */
		if (!show_2_alcohol)
		{
			$("#2_legend").after(
			'<div data-role="fieldcontain" id="2_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<legend>a.  Alcohol (beer, wine, spirits, etc.)</legend>' +
				'<input type="radio" name="2sub_alcohol" id="alcohol_drugs20sub1" value="0"/><label for="alcohol_drugs20sub1">' + notAtAll  + '</label>' +
				'<input type="radio" name="2sub_alcohol" id="alcohol_drugs21sub1" value="2"/><label for="alcohol_drugs21sub1">' + severalDays + '</label>' +
				'<input type="radio" name="2sub_alcohol" id="alcohol_drugs22sub1" value="3"/><label for="alcohol_drugs22sub1">' + moreHalfDays + '</label>' +
				'<input type="radio" name="2sub_alcohol" id="alcohol_drugs23sub1" value="4"/><label for="alcohol_drugs23sub1">' + nEveryDay + '</label>' +
				'<input type="radio" name="2sub_alcohol" id="alcohol_drugs24sub1" value="6"/><label for="alcohol_drugs24sub1">' + daily + '</label>' +
				
			'</fieldset>' +
			
			'</div>');
			
			$("#2_alcohol").trigger('create');
			
			// Find the correct area to place question 6 about alcohol
			var placement;
			// Drugs after alcohol
			if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			else if ($("#2_amphetamine").length > 0)
			{
				placement = "#2_amphetamine";
			}
			else if ($("#2_cocaine_fieldcontain").length > 0)
			{
				placement = "#2_cocaine_fieldcontain";
			}
			else if ($("#2_cannabis_fieldcontain").length > 0)
			{
				placement = "#2_cannabis_fieldcontain";
			}
			else
			{
				placement = "#2_alcohol";
			}
			
			$(placement).after(
			'<div data-role="fieldcontain" id="6_alcohol_fieldcontain">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="concern_a">6 a.	Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
				'<input type="radio" name="6_alcohol" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + '</label>' +
				'<input type="radio" name="6_alcohol" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + '</label>' +
				'<input type="radio" name="6_alcohol" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + '</label>' +
				
			'</fieldset>' +
			'</div>');
			// Add the css to the question
			$("#6_alcohol_fieldcontain").trigger('create');
			
			// Find the correct area to place question 7 about alcohol
			add_text('#concern_a', drug_of_choice);
			
			if ($("#6f_alcohol").length > 0)
			{
				placement = "#6f_alcohol";
			}
			else if ($("#6e_alcohol").length > 0)
			{
				placement = "#6e_alcohol";
			}
			else if ($("#6d_alcohol").length > 0)
			{
				placement = "#6d_alcohol";
			}
			else if ($("#6_cocaine").length > 0)
			{
				placement = "#6_cocaine";
			}
			else if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			else if ($("#6_alcohol_fieldcontain").length > 0)
			{
				placement = "#6_alcohol_fieldcontain";
			}
			
			$(placement).after('<div data-role="fieldcontain" id="7_alcohol_fieldcontain">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="control_a">7 a.	Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
				'<input type="radio" name="7_alcohol" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + noNever + '</label>' +
				'<input type="radio" name="7_alcohol" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
				'<input type="radio" name="7_alcohol" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +
			'</fieldset>' +
			'</div>');
			// Add the css to the question
			$("#7_alcohol_fieldcontain").trigger('create');
			
			add_text('#control_a', drug_of_choice);
			show_2_alcohol = true;
		}
	} 
	else
	{
		/* Remove the dynamically created text, allow the button to be pressed again, 
		 * and hide the legend if necessary
		*/
		alcohol_pressed = false;
		$("#2_alcohol").remove();
		$("#3a_alcohol_fieldcontain").remove();
		$("#4a_alcohol_fieldcontain").remove();
		$("#5a_alcohol_fieldcontain").remove();
		$("#6_alcohol_fieldcontain").remove();
		$("#7_alcohol_fieldcontain").remove();
		
		show_2_alcohol = false;
		if (	!show_2_alcohol && !show_2_cannabis && 
				!show_2_cocaine && !show_2_amphetamine &&
				!show_2_sedatives && !show_2_other_drug_use)
		{
			$("#2_legend").hide();
			
		}
	}
});

$(":input[name='1b']").bind("change", function(event, ui) {
	var drug_of_choice = 'Cannabis (marijuana, pot, grass, hash, etc.)'; 
	if ($(this).val() === '1') {
		if ($("#2:hidden"))
		{
			$("#2_legend").show();
		}
		
		/*
		 * If cannabis hasn't been chosen already then create question 2 
		 * */
		if (!show_2_cannabis)
		{
			var placement;
			if ($("#2_alcohol").length > 0)
			{
				placement = "#2_alcohol";
			}
			else
			{
				placement = "#2_legend";
			}
			$(placement).after(
			'<div data-role="fieldcontain" id="2_cannabis_fieldcontain">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<legend>b.  Cannabis (marijuana, pot, grass, hash, etc.)</legend>' +
					'<input type="radio" name="2sub_cannabis" id="alcohol_drugs20sub2" value="0"/><label for="alcohol_drugs20sub2">' + never + '</label>' + 
					'<input type="radio" name="2sub_cannabis" id="alcohol_drugs21sub2" value="2"/><label for="alcohol_drugs21sub2">' + onceOrTwice + '</label>' +
					'<input type="radio" name="2sub_cannabis" id="alcohol_drugs22sub2" value="3"/><label for="alcohol_drugs22sub2">' + monthly + '</label>' +
					'<input type="radio" name="2sub_cannabis" id="alcohol_drugs23sub2" value="4"/><label for="alcohol_drugs23sub2">' + weekly + '</label>' +
					'<input type="radio" name="2sub_cannabis" id="alcohol_drugs24sub2" value="6"/><label for="alcohol_drugs24sub2">' + daily + '</label>' +
					
				'</fieldset>' +
				'</div>');
			
			$("#2_cannabis_fieldcontain").trigger('create');
			// Drugs before cannabis
			if ($("#6_alcohol_fieldcontain").length > 0)
			{
				placement = "#6_alcohol_fieldcontain";
			}
			// Drugs after cannabis
			else if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			else if ($("#2_amphetamine").length > 0)
			{
				placement = "#2_amphetamine";
			}
			else if ($("#2_cocaine_fieldcontain").length > 0)
			{
				placement = "#2_cocaine_fieldcontain";
			}
			else
			{
				placement = "#2_cannabis_fieldcontain";
			}
			
			$(placement).after(
			'<div data-role="fieldcontain" id="6_cannabis_fieldcontain">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="concern_b">6 b.	Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
				'<input type="radio" name="6_cannabis" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + ' </label>' +
				'<input type="radio" name="6_cannabis" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + ' </label>' +
				'<input type="radio" name="6_cannabis" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + ' </label>' +

			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#6_cannabis_fieldcontain").trigger('create');
			
			add_text('#concern_b', drug_of_choice);
			
			// Figure out where to put question 7b
			if ($("#7_alcohol_fieldcontain").length > 0)
			{
				placement = "#7_alcohol_fieldcontain";
			}
			else if ($("#6f_alcohol").length > 0)
			{
				placement = "#6f_alcohol";
			}
			else if ($("#6e_alcohol").length > 0)
			{
				placement = "#6e_alcohol";
			}
			else if ($("#6d_alcohol").length > 0)
			{
				placement = "#6d_alcohol";
			}
			else if ($("#6_cocaine").length > 0)
			{
				placement = "#6_cocaine";
			}
			else if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			
			$(placement).after('<div data-role="fieldcontain" id="7b_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="control_b">7 b.	Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
				'<input type="radio" name="7_cannabis" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + noNever + '</label>' +
				'<input type="radio" name="7_cannabis" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
				'<input type="radio" name="7_cannabis" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +

			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#7b_alcohol").trigger('create');
			
			add_text('#control_b', drug_of_choice);
			
			show_2_cannabis = true;
		}
	} 
	else
	{
		/* Remove the dynamically created text, allow the button to be pressed again, 
		 * and hide the legend if necessary
		*/
		cannabis_pressed = false;
		$("#2_cannabis_fieldcontain").remove();
		$("#3b_cannabis_fieldcontain").remove();
		$("#4b_cannabis_fieldcontain").remove();
		$("#5b_amphetamine_fieldcontain").remove();
		$("#6_cannabis_fieldcontain").remove();
		$("#7b_alcohol").remove();
		show_2_cannabis = false;
		if (	!show_2_alcohol && !show_2_cannabis && 
				!show_2_cocaine && !show_2_amphetamine &&
				!show_2_sedatives && !show_2_other_drug_use)
		{
			$("#2_legend").hide();
			
		}
	}
});

$(":input[name='1c']").bind("change", function(event, ui) {
	var drug_of_choice = 'Cocaine (coke, crack, etc.)'; 
	
	if ($(this).val() === '1') {
		if ($("#2:hidden"))
		{
			$("#2_legend").show();
		}
		
		/*
		 * If cocaine hasn't been chosen already then create question 2 
		 * */
		if (!show_2_cocaine)
		{
			var placement;
			if ($("#2_cannabis_fieldcontain").length > 0)
			{
				placement = "#2_cannabis_fieldcontain";
			}
			else if ($("#2_alcohol").length > 0)
			{
				placement = "#2_alcohol";
			}
			else
			{
				placement = "#2_legend";
			}
			$(placement).after(
			'<div data-role="fieldcontain" id="2_cocaine_fieldcontain">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<legend>c.  Cocaine (coke, crack, etc.)</legend>' +
					'<input type="radio" name="2sub_cocaine" id="alcohol_drugs20sub3" value="0"/><label for="alcohol_drugs20sub3">' + never + '</label>' + 
					'<input type="radio" name="2sub_cocaine" id="alcohol_drugs21sub3" value="2"/><label for="alcohol_drugs21sub3">' + onceOrTwice + '</label>' +
					'<input type="radio" name="2sub_cocaine" id="alcohol_drugs22sub3" value="3"/><label for="alcohol_drugs22sub3">' + monthly + '</label>' +
					'<input type="radio" name="2sub_cocaine" id="alcohol_drugs23sub3" value="4"/><label for="alcohol_drugs23sub3">' + weekly + '</label>' +
					'<input type="radio" name="2sub_cocaine" id="alcohol_drugs24sub3" value="6"/><label for="alcohol_drugs24sub3">' + daily + '</label>' +

				'</fieldset>' +
				'</div>');
			
			$("#2_cocaine_fieldcontain").trigger('create');
			
			// Figure out the correct placement
			// Drugs before cocaine
			if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			else if ($("#6_alcohol").length > 0)
			{
				placement = "#6_alcohol";
			}
			
			// Drugs after cocaine
			else if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			else if ($("#2_amphetamine").length > 0)
			{
				placement = "#2_amphetamine";
			}
			else
			{
				placement = "#2_cocaine_fieldcontain";
			}
			$(placement).after(
			'<div data-role="fieldcontain" id="6_cocaine">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="concern_c">6 c.	Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
				'<input type="radio" name="6_cocaine" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + '</label>' +
				'<input type="radio" name="6_cocaine" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + '</label>' +
				'<input type="radio" name="6_cocaine" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + '</label>' +
			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#6_cocaine").trigger('create');
			
			add_text('#concern_c', drug_of_choice);
			
			// Figure out the correct placement of question 7
			if ($("#7b_alcohol").length > 0)
			{
				placement = "#7b_alcohol";
			}
			else if ($("#6f_alcohol").length > 0)
			{
				placement = "#6f_alcohol";
			}
			else if ($("#6e_alcohol").length > 0)
			{
				placement = "#6e_alcohol";
			}
			else if ($("#6d_alcohol").length > 0)
			{
				placement = "#6d_alcohol";
			}
			else
			{
				placement = "#6_cocaine";
			}
			
			$(placement).after('<div data-role="fieldcontain" id="7c_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="control_c">7 c.	Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
				'<input type="radio" name="7_cocaine" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + never + '</label>' +
				'<input type="radio" name="7_cocaine" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
				'<input type="radio" name="7_cocaine" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +
			'</fieldset>' +
			'</div>');
			
			$("#7c_alcohol").trigger('create');
			
			// Radio buttons 1-4 are pressed
			add_text('#control_c', drug_of_choice);
			
			show_2_cocaine = true;
		}
	} 
	else
	{
		/* Remove the dynamically created text, allow the button to be pressed again, 
		 * and hide the legend if necessary
		*/
		cocaine_pressed = false;
		$("#2_cocaine_fieldcontain").remove();
		$("#3c_cocaine_fieldcontain").remove();
		$("#4c_cocaine_fieldcontain").remove();
		$("#5c_cocaine_fieldcontain").remove();
		$("#6_cocaine").remove();
		$("#7c_alcohol").remove();
		show_2_cocaine = false;
		if (	!show_2_alcohol && !show_2_cannabis && 
				!show_2_cocaine && !show_2_amphetamine &&
				!show_2_sedatives && !show_2_other_drug_use)
		{
			$("#2_legend").hide();
		}
	}
});

$(":input[name='1d']").bind("change", function(event, ui) {
	var drug_of_choice = 'Amphetamine type stimulants (speed, diet pills, ecstasy, etc.)'; 
	if ($(this).val() === '1') {
		if ($("#2:hidden"))
		{
			$("#2_legend").show();
		}
		
		/*
		 * If amphetamine hasn't been chosen already then create question 2 
		 * */
		if (!show_2_amphetamine)
		{
			var placement;
			if ($("#2_cocaine_fieldcontain").length > 0)
			{
				placement = "#2_cocaine_fieldcontain";
			}
			else if ($("#2_cannabis_fieldcontain").length > 0)
			{
				placement = "#2_cannabis_fieldcontain";
			}
			else if ($("#2_alcohol").length > 0)
			{
				placement = "#2_alcohol";
			}
			else
			{
				placement = "#2_legend";
			}
			$(placement).after(
					'<div data-role="fieldcontain" id="2_amphetamine">' +
						'<fieldset data-role="controlgroup" class=likert1-5_alcohol>' +
							'<legend>d.  Amphetamine type stimulants (speed, diet pills, ecstasy, etc.)</legend>' +
							'<input type="radio" name="2sub_amphetamine" id="alcohol_drugs20sub4" value="0"/><label for="alcohol_drugs20sub4">' + never + '</label>' +
							'<input type="radio" name="2sub_amphetamine" id="alcohol_drugs21sub4" value="2"/><label for="alcohol_drugs21sub4">' + onceOrTwice + '</label>' +
							'<input type="radio" name="2sub_amphetamine" id="alcohol_drugs22sub4" value="3"/><label for="alcohol_drugs22sub4">' + monthly + '</label>' +
							'<input type="radio" name="2sub_amphetamine" id="alcohol_drugs23sub4" value="4"/><label for="alcohol_drugs23sub4">' + weekly + '</label>' +
							'<input type="radio" name="2sub_amphetamine" id="alcohol_drugs24sub4" value="6"/><label for="alcohol_drugs24sub4">' + daily + '</label>' +

						'</fieldset>' +
					'</div>');
			
			// Add the css to the question
			$("#2_amphetamine").trigger('create');
			
			// Figure out where to place question 6
			// Drugs before amphetamine
			if ($("#6_cocaine").length > 0)
			{
				placement = "#6_cocaine";
			}
			else if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			else if ($("#6_alcohol").length > 0)
			{
				placement = "#6_alcohol";
			}
			
			// Drugs after amphetamine
			else if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			
			// No drugs present so make it after amphetamine in question 2
			else
			{
				placement = "#2_amphetamine";
			}
			$(placement).after(
			'<div data-role="fieldcontain" id="6d_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="concern_d">6 d.	Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
				'<input type="radio" name="6_amphetamine" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + '</label>' +
				'<input type="radio" name="6_amphetamine" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + '</label>' +
				'<input type="radio" name="6_amphetamine" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + '</label>' +
			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#6d_alcohol").trigger('create');
			
			add_text('#concern_d', drug_of_choice);
			
			// Figure out where to place question 7
			if ($("#7c_alcohol").length > 0)
			{
				placement = "#7c_alcohol";
			}
			else if ($("#7b_alcohol").length > 0)
			{
				placement = "#7b_alcohol";
			}
			else if ($("#7_alcohol_fieldcontain").length > 0)
			{
				placement = "#7_alcohol_fieldcontain";
			}
			else if ($("#6f_alcohol").length > 0)
			{
				placement = "#6f_alcohol";
			}
			else if ($("#6e_alcohol").length > 0)
			{
				placement = "#6e_alcohol";
			}
			else if ($("#6d_alcohol").length > 0)
			{
				placement = "#6d_alcohol";
			}
			else if ($("#6_cocaine").length > 0)
			{
				placement = "#6_cocaine";
			}
			else if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			else 
			{
				placement = "#6_alcohol";
			}
			
			$(placement).after('<div data-role="fieldcontain" id="7d_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="control_d">7 d.	Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
				'<input type="radio" name="77_sedatives" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + noNever + '</label>' +
				'<input type="radio" name="77_sedatives" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
				'<input type="radio" name="77_sedatives" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +
			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#7d_alcohol").trigger('create');
			
			add_text('#control_d', drug_of_choice);
			
			show_2_amphetamine = true;
		}
	} 
	else
	{
		/* Remove the dynamically created text, allow the button to be pressed again, 
		 * and hide the legend if necessary
		*/
		amphetamine_pressed = false;
		$("#2_amphetamine").remove();
		$("#3d_amphetamine_fieldcontain").remove();
		$("#4d_amphetamine_fieldcontain").remove();
		$("#5d_amphetamine_fieldcontain").remove();
		$("#6d_alcohol").remove();
		$("#7d_alcohol").remove();
		show_2_amphetamine = false;
		if (	!show_2_alcohol && !show_2_cannabis && 
				!show_2_cocaine && !show_2_amphetamine &&
				!show_2_sedatives && !show_2_other_drug_use)
		{
			$("#2_legend").hide();
		}
	}
});

$(":input[name='1e']").bind("change", function(event, ui) {
	var drug_of_choice = 'Sedatives or sleeping pills (Valium, Serapax, Rohypnol, Ambien, etc.)';
	if ($(this).val() === '1') {
		if ($("#2:hidden"))
		{
			$("#2_legend").show();
		}
		
		/*
		 * If sedatives hasn't been chosen already then create question 2 
		 * */
		if (!show_2_sedatives)
		{
			var placement;
			if ($("#2_amphetamine").length > 0)
			{
				placement = "#2_amphetamine";
			}
			else if ($("#2_cocaine_fieldcontain").length > 0)
			{
				placement = "#2_cocaine_fieldcontain";
			}
			else if ($("#2_cannabis_fieldcontain").length > 0)
			{
				placement = "#2_cannabis_fieldcontain";
			}
			else if ($("#2_alcohol").length > 0)
			{
				placement = "#2_alcohol";
			}
			else
			{
				placement = "#2_legend";
			}
			$(placement).after(
					'<div data-role="fieldcontain" id="2_sedatives">' +
						'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
							'<legend>e.  Sedatives or sleeping pills (Valium, Serapax, Rohypnol, Ambien, etc.)</legend>' +
							'<input type="radio" name="2sub_sedatives" id="alcohol_drugs20sub5" value="0"/><label for="alcohol_drugs20sub5">' + never + '</label>' +
							'<input type="radio" name="2sub_sedatives" id="alcohol_drugs21sub5" value="2"/><label for="alcohol_drugs21sub5">' + onceOrTwice + '</label>' +
							'<input type="radio" name="2sub_sedatives" id="alcohol_drugs22sub5" value="3"/><label for="alcohol_drugs22sub5">' + monthly + '</label>' +
							'<input type="radio" name="2sub_sedatives" id="alcohol_drugs23sub5" value="4"/><label for="alcohol_drugs23sub5">' + weekly + '</label>' +
							'<input type="radio" name="2sub_sedatives" id="alcohol_drugs24sub5" value="6"/><label for="alcohol_drugs24sub5">' + daily + '</label>' +

						'</fieldset>' +
					'</div>');
			
			// Add the css to the question
			$("#2_sedatives").trigger('create');
			
			// Figure out where to place question 6
			// Drugs before sedatives
			if ($("#6d_alcohol").length > 0)
			{
				placement = "#6d_alcohol";
			}
			else if ($("#6_cocaine").length > 0)
			{
				placement = "#6_cocaine";
			}
			else if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			else if ($("#6_alcohol").length > 0)
			{
				placement = "#6_alcohol";
			}
			
			// Drugs after sedatives
			else if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else
			{
				placement = "#2_sedatives";
			}
			$(placement).after(
			'<div data-role="fieldcontain" id="6e_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="concern_e">6 e.	Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
				'<input type="radio" name="6_sedatives" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + '</label>' +
				'<input type="radio" name="6_sedatives" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + '</label>' +
				'<input type="radio" name="6_sedatives" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + '</label>' +
			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#6e_alcohol").trigger('create');
			
			add_text('#concern_e', drug_of_choice);
			
			// Figure out where to place question 7
			if ($("#7d_alcohol").length > 0)
			{
				placement = "#7d_alcohol";
			}
			else if ($("#7c_alcohol").length > 0)
			{
				placement = "#7c_alcohol";
			}
			else if ($("#7b_alcohol").length > 0)
			{
				placement = "#7b_alcohol";
			}
			else if ($("#7_alcohol_fieldcontain").length > 0)
			{
				placement = "#7_alcohol_fieldcontain";
			}
			else if ($("#6f_alcohol").length > 0)
			{
				placement = "#6f_alcohol";
			}
			else if ($("#6e_alcohol").length > 0)
			{
				placement = "#6e_alcohol";
			}
			else if ($("#6d_alcohol").length > 0)
			{
				placement = "#6d_alcohol";
			}
			else if ($("#6_cocaine").length > 0)
			{
				placement = "#6_cocaine";
			}
			else if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			else 
			{
				placement = "#6_alcohol";
			}
			
			$(placement).after('<div data-role="fieldcontain" id="7e_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="control_e">7 e.	Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
				'<input type="radio" name="7_other_drug_use" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + noNever + '</label>' +
				'<input type="radio" name="7_other_drug_use" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
				'<input type="radio" name="7_other_drug_use" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +

			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#7e_alcohol").trigger('create');
			
			add_text('#control_e', drug_of_choice);
			
			show_2_sedatives = true;
		}
	} 
	else
	{
		/* Remove the dynamically created text, allow the button to be pressed again, 
		 * and hide the legend if necessary
		*/
		sedatives_pressed = false;
		$("#2_sedatives").remove();
		$("#3e_sedatives_fieldcontain").remove();
		$("#4e_sedatives_fieldcontain").remove();
		$("#5e_sedatives_fieldcontain").remove();
		$("#6e_alcohol").remove();
		$("#7e_alcohol").remove();
		show_2_sedatives = false;
		if (	!show_2_alcohol && !show_2_cannabis && 
				!show_2_cocaine && !show_2_amphetamine &&
				!show_2_sedatives && !show_2_other_drug_use)
		{
			$("#2_legend").hide();
		}
	}
});

$(":input[name='1f']").bind("change", function(event, ui) {
	var drug_of_choice = 'Other drug use (inhalants, hallucinogens, opiods, etc.)'; 
	if ($(this).val() === '1') {
		if ($("#2:hidden"))
		{
			$("#2_legend").show();
		}
		
		/*
		 * If other drug use hasn't been chosen already then create question 2 
		 * */
		
		if (!show_2_other_drug_use)
		{
			var placement;
			if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			else if ($("#2_amphetamine").length > 0)
			{
				placement = "#2_amphetamine";
			}
			else if ($("#2_cocaine_fieldcontain").length > 0)
			{
				placement = "#2_cocaine_fieldcontain";
			}
			else if ($("#2_cannabis_fieldcontain").length > 0)
			{
				placement = "#2_cannabis_fieldcontain";
			}
			else if ($("#2_alcohol").length > 0)
			{
				placement = "#2_alcohol";
			}
			else
			{
				placement = "#2_legend";
			}
			$(placement).after(
					'<div data-role="fieldcontain" id="2_other_drug_use">' +
						'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
							'<legend>f.  Other drug use (inhalants, hallucinogens, opiods, etc.)</legend>' +
							'<input type="radio" name="2sub_other_drug_use" id="alcohol_drugs20sub6" value="0"/><label for="alcohol_drugs20sub6">' + never + '</label>' +
							'<input type="radio" name="2sub_other_drug_use" id="alcohol_drugs21sub6" value="2"/><label for="alcohol_drugs21sub6">' + onceOrTwice + '</label>' +
							'<input type="radio" name="2sub_other_drug_use" id="alcohol_drugs22sub6" value="3"/><label for="alcohol_drugs22sub6">' + monthly + '</label>' +
							'<input type="radio" name="2sub_other_drug_use" id="alcohol_drugs23sub6" value="4"/><label for="alcohol_drugs23sub6">' + weekly + '</label>' +
							'<input type="radio" name="2sub_other_drug_use" id="alcohol_drugs24sub6" value="6"/><label for="alcohol_drugs24sub6">' + daily + '</label>' +
						'</fieldset>' +
					'</div>');
			
			$("#2_other_drug_use").trigger('create');
			
			// Figure out where to place question 7
			// Drugs before other drug use
			if ($("#6e_alcohol").length > 0)
			{
				placement = "#6e_alcohol";
			}
			else if ($("#6d_alcohol").length > 0)
			{
				placement = "#6d_alcohol";
			}
			else if ($("#6_cocaine").length > 0)
			{
				placement = "#6_cocaine";
			}
			else if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			else if ($("#6_alcohol").length > 0)
			{
				placement = "#6_alcohol";
			}
			else
			{
				placement = "#2_other_drug_use";
			}
			$(placement).after(
			'<div data-role="fieldcontain" id="6f_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="concern_f">6 f.	Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
				'<input type="radio" name="6f_alcohol_radio" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + '</label>' +
				'<input type="radio" name="6f_alcohol_radio" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + '</label>' +
				'<input type="radio" name="6f_alcohol_radio" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + '</label>' +
			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#6f_alcohol").trigger('create');
			
			add_text('#concern_f', drug_of_choice);
			
			// Figure out where to place question 7
			if ($("#7e_alcohol").length > 0)
			{
				placement = "#7e_alcohol";
			}
			else if ($("#7d_alcohol").length > 0)
			{
				placement = "#7d_alcohol";
			}
			else if ($("#7c_alcohol").length > 0)
			{
				placement = "#7c_alcohol";
			}
			else if ($("#7b_alcohol").length > 0)
			{
				placement = "#7b_alcohol";
			}
			else if ($("#7_alcohol_fieldcontain").length > 0)
			{
				placement = "#7_alcohol_fieldcontain";
			}
			else if ($("#6f_alcohol").length > 0)
			{
				placement = "#6f_alcohol";
			}
			else if ($("#6e_alcohol").length > 0)
			{
				placement = "#6e_alcohol";
			}
			else if ($("#6d_alcohol").length > 0)
			{
				placement = "#6d_alcohol";
			}
			else if ($("#6_cocaine").length > 0)
			{
				placement = "#6_cocaine";
			}
			else if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			else 
			{
				placement = "#6_alcohol";
			}
			
			$(placement).after('<div data-role="fieldcontain" id="7f_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="control_f">7 f.	Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
				'<input type="radio" name="7_other_drug_use" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + noNever + '</label>' +
				'<input type="radio" name="7_other_drug_use" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
				'<input type="radio" name="7_other_drug_use" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +

			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#7f_alcohol").trigger('create');
			
			add_text('#control_f', drug_of_choice);
			
			show_2_other_drug_use = true;
		}
	} 
	else
	{
		/* Remove the dynamically created text, allow the other drug use button to be pressed again, 
		 * and hide the legend if necessary
		*/
		other_drug_use_pressed = false;
		$("#2_other_drug_use").remove();
		$("#3f_other_drug_use_fieldcontain").remove();
		$("#4f_other_drug_use_fieldcontain").remove();
		$("#5f_other_drug_use_fieldcontain").remove();
		$("#6f_alcohol").remove();
		$("#7f_alcohol").remove();
		show_2_other_drug_use = false;
		if (	!show_2_alcohol && !show_2_cannabis && 
				!show_2_cocaine && !show_2_amphetamine &&
				!show_2_sedatives && !show_2_other_drug_use)
		{
			$("#2_legend").hide();
		}
	}
});

/*************************************************************************************************/
/*
 * 
 End of 1a - 1f  
 */
/*************************************************************************************************/
$(":input[name='2sub_alcohol']").live("change", function(event, ui) {
	var drug_of_choice = 'Alcohol (beer, wine, spirits, etc.)';
	if ($(this).val() === '0') {
		/* Remove the dynamically created text, allow the button to be pressed again */
		$("#3a_alcohol_fieldcontain").remove();
		$("#4a_alcohol_fieldcontain").remove();
		$("#5a_alcohol_fieldcontain").remove();
		alcohol_pressed = false;
	} 
	else
	{
		// Figure out where to place question 3, 4, and 5 for alcohol.
		if (!alcohol_pressed)
		{
			if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			else if ($("#2_amphetamine").length > 0)
			{
				placement = "#2_amphetamine";
			}
			else if ($("#2_cocaine_fieldcontain").length > 0)
			{
				placement = "#2_cocaine_fieldcontain";
			}
			else if ($("#2_cannabis_fieldcontain").length > 0)
			{
				placement = "#2_cannabis_fieldcontain";
			}
			else
			{
				placement = "#2_alcohol";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="3a_alcohol_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
						'<div id="desire_a">3 a.	During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
						'<input type="radio" name="3_alcohol" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
						'<input type="radio" name="3_alcohol" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
						'<input type="radio" name="3_alcohol" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
						'<input type="radio" name="3_alcohol" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
						'<input type="radio" name="3_alcohol" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +
					'</fieldset>' +
				'</div>').trigger('create');
			
			$("#3a_alcohol_fieldcontain").trigger('create');
			
			add_text('#desire_a', drug_of_choice);
			
			if ($("#3f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#3f_other_drug_use_fieldcontain";
			}
			else if ($("#3e_sedatives_fieldcontain").length > 0)
			{
				placement = "#3e_sedatives_fieldcontain";
			}
			else if ($("#3d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#3d_amphetamine_fieldcontain";
			}
			else if ($("#3c_cocaine_fieldcontain").length > 0)
			{
				placement = "#3c_cocaine_fieldcontain";
			}
			else if ($("#3b_cannabis_fieldcontain").length > 0)
			{
				placement = "#3b_cannabis_fieldcontain";
			}
			else
			{
				placement = "#3a_alcohol_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="4a_alcohol_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
					'<div id="problems_a">4 a.	During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
				'<input type="radio" name="4_alcohol" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
				'<input type="radio" name="4_alcohol" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
				'<input type="radio" name="4_alcohol" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
				'<input type="radio" name="4_alcohol" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
				'<input type="radio" name="4_alcohol" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +

			'</fieldset>' + 
			'</div>').trigger('create');
			
			$("#4a_alcohol_fieldcontain").trigger('create');
			
			add_text('#problems_a', drug_of_choice);
			
			if ($("#4f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#4f_other_drug_use_fieldcontain";
			}
			else if ($("#4e_sedatives_fieldcontain").length > 0)
			{
				placement = "#4e_sedatives_fieldcontain";
			}
			else if ($("#4d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#4d_amphetamine_fieldcontain";
			}
			else if ($("#4c_cocaine_fieldcontain").length > 0)
			{
				placement = "#4c_cocaine_fieldcontain";
			}
			else if ($("#4b_cannabis_fieldcontain").length > 0)
			{
				placement = "#4b_cannabis_fieldcontain";
			}
			else
			{
				placement = "#4a_alcohol_fieldcontain";
			}
			$(placement).after(
				'<div data-role="fieldcontain" id="5a_alcohol_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
						'<div id="failed_a">5 a.	During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
					'<input type="radio" name="5_alcohol" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
					'<input type="radio" name="5_alcohol" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
					'<input type="radio" name="5_alcohol" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
					'<input type="radio" name="5_alcohol" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
					'<input type="radio" name="5_alcohol" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +

				'</fieldset>' +
				'</div>');
			
			$("#5a_alcohol_fieldcontain").trigger('create');
			
			add_text('#failed_a', drug_of_choice);
			
			alcohol_pressed = true;
		
			$("input[type='radio']").each(function () {
				$(this).click(function (e) {
					var questionText = "";
					var currentpage = getCurrentPage().replace(".html","").split("/");
					$(this).closest('fieldset').children().each(function() {
						questionText = $(this).text();
						console.log($(this).text());
						return false;
					});
					
					logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
					e.preventDefault();
				});
			});
		}
	}
});

$(":input[name='2sub_cannabis']").live("change", function(event, ui) {
	var drug_of_choice = 'Cannabis (marijuana, pot, grass, hash, etc.)'; 
	
	if ($(this).val() === '0') {
		/* Remove the dynamically created text, allow the button to be pressed again */
		$("#3b_cannabis_fieldcontain").remove();
		$("#4b_cannabis_fieldcontain").remove();
		$("#5b_amphetamine_fieldcontain").remove();
		cannabis_pressed = false;
	} 
	else
	{
		if (!cannabis_pressed)
		{
			// Figure out where to place question 3, 4, and 5 for cannabis.
			var placement;
			
			if ($("#3a_alcohol_fieldcontain").length > 0)
			{
				placement = "#3a_alcohol_fieldcontain";
			}
			else if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			else if ($("#2_amphetamine").length > 0)
			{
				placement = "#2_amphetamine";
			}
			else if ($("#2_cocaine_fieldcontain").length > 0)
			{
				placement = "#2_cocaine_fieldcontain";
			}
			else
			{
				placement = "#2_cannabis_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="3b_cannabis_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
						'<div id="desire_b">3 b.	During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
						'<input type="radio" name="3_cannabis" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
						'<input type="radio" name="3_cannabis" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
						'<input type="radio" name="3_cannabis" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
						'<input type="radio" name="3_cannabis" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
						'<input type="radio" name="3_cannabis" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +
					'</fieldset>' +
				'</div>');
				
			$("#3b_cannabis_fieldcontain").trigger('create');
	
			add_text('#desire_b', drug_of_choice);
			
			if ($("#4a_alcohol_fieldcontain").length > 0)
			{
				placement = "#4a_alcohol_fieldcontain";
			}
			else if ($("#3f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#3f_other_drug_use_fieldcontain";
			}
			else if ($("#3e_sedatives_fieldcontain").length > 0)
			{
				placement = "#3e_sedatives_fieldcontain";
			}
			else if ($("#3d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#3d_amphetamine_fieldcontain";
			}
			else if ($("#3c_cocaine_fieldcontain").length > 0)
			{
				placement = "#3c_cocaine_fieldcontain";
			}
			else
			{
				placement = "#3b_cannabis_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="4b_cannabis_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
					'<div id="problems_b">4 b.	During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
				'<input type="radio" name="4_cannabis" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
				'<input type="radio" name="4_cannabis" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
				'<input type="radio" name="4_cannabis" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
				'<input type="radio" name="4_cannabis" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
				'<input type="radio" name="4_cannabis" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +

			'</fieldset>' + 
			'</div>').trigger('create');
			
			$("#4b_cannabis_fieldcontain").trigger('create');
			
			add_text('#problems_b', drug_of_choice);
				
			if ($("#5a_alcohol_fieldcontain").length > 0)
			{
				placement = "#5a_alcohol_fieldcontain";
			}
			else if ($("#4f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#4f_other_drug_use_fieldcontain";
			}
			else if ($("#4e_sedatives_fieldcontain").length > 0)
			{
				placement = "#4e_sedatives_fieldcontain";
			}
			else if ($("#4d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#4d_amphetamine_fieldcontain";
			}
			else if ($("#4c_cocaine_fieldcontain").length > 0)
			{
				placement = "#4c_cocaine_fieldcontain";
			}
			else
			{
				placement = "#4b_cannabis_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="5b_amphetamine_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
						'<div id="failed_b">5 b.	During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
					'<input type="radio" name="5_cannabis" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
					'<input type="radio" name="5_cannabis" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
					'<input type="radio" name="5_cannabis" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
					'<input type="radio" name="5_cannabis" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
					'<input type="radio" name="5_cannabis" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +
				'</fieldset>' +
				'</div>');
			
			$("#5b_amphetamine_fieldcontain").trigger('create');
			
			// Radio buttons 1-4 are pressed
			add_text('#failed_b', drug_of_choice);
				
			cannabis_pressed = true;
		
			$("input[type='radio']").each(function () {
				$(this).click(function (e) {
					var questionText = "";
					var currentpage = getCurrentPage().replace(".html","").split("/");
					$(this).closest('fieldset').children().each(function() {
						questionText = $(this).text();
						console.log($(this).text());
						return false;
					});
					
					logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
					e.preventDefault();
				});
			});
		}
	}
});

$(":input[name='2sub_cocaine']").live("change", function(event, ui) {
	var drug_of_choice = 'Cocaine (coke, crack, etc.)'; 
	
	if ($(this).val() === '0') {
		/* Remove the dynamically created text, allow the button to be pressed again */
		$("#3c_cocaine_fieldcontain").remove();
		$("#4c_cocaine_fieldcontain").remove();
		$("#5c_cocaine_fieldcontain").remove();
		cocaine_pressed = false;
	} 
	else
	{
		if (!cocaine_pressed)
		{
			// Figure out where to place question 3, 4, and 5 for cocaine.
			var placement;
			if ($("#3b_cannabis_fieldcontain").length > 0)
			{
				placement = "#3b_cannabis_fieldcontain";
			}
			else if ($("#3a_alcohol_fieldcontain").length > 0)
			{
				placement = "#3a_alcohol_fieldcontain";
			}
			else if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			else if ($("#2_amphetamine").length > 0)
			{
				placement = "#2_amphetamine";
			}
			else
			{
				placement = "#2_cocaine_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="3c_cocaine_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
						'<div id="desire_c">3 c.	During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
						'<input type="radio" name="3_cocaine" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
						'<input type="radio" name="3_cocaine" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
						'<input type="radio" name="3_cocaine" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
						'<input type="radio" name="3_cocaine" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
						'<input type="radio" name="3_cocaine" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +
					'</fieldset>' +
				'</div>').trigger('create');
			
			$("#3c_cocaine_fieldcontain").trigger('create');
			
			add_text('#desire_c', drug_of_choice);
			
			if ($("#4b_cannabis_fieldcontain").length > 0)
			{
				placement = "#4b_cannabis_fieldcontain";
			}
			else if ($("#4a_alcohol_fieldcontain").length > 0)
			{
				placement = "#4a_alcohol_fieldcontain";
			}
			else if ($("#3f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#3f_other_drug_use_fieldcontain";
			}
			else if ($("#3e_sedatives_fieldcontain").length > 0)
			{
				placement = "#3e_sedatives_fieldcontain";
			}
			else if ($("#3d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#3d_amphetamine_fieldcontain";
			}
			else
			{
				placement = "#3c_cocaine_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="4c_cocaine_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
					'<div id="problems_c">4 c.	During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
				'<input type="radio" name="4_cocaine" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
				'<input type="radio" name="4_cocaine" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
				'<input type="radio" name="4_cocaine" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
				'<input type="radio" name="4_cocaine" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
				'<input type="radio" name="4_cocaine" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +
			'</fieldset>' + 
			'</div>').trigger('create');
			
			$("#4c_cocaine_fieldcontain").trigger('create');
			
			// Radio buttons 1-4 are pressed
			add_text('#problems_c', drug_of_choice);
			
			if ($("#5b_amphetamine_fieldcontain").length > 0)
			{
				placement = "#5b_amphetamine_fieldcontain";
			}
			else if ($("#5a_alcohol_fieldcontain").length > 0)
			{
				placement = "#5a_alcohol_fieldcontain";
			}
			else if ($("#4f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#4f_other_drug_use_fieldcontain";
			}
			else if ($("#4e_sedatives_fieldcontain").length > 0)
			{
				placement = "#4e_sedatives_fieldcontain";
			}
			else if ($("#4d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#4d_amphetamine_fieldcontain";
			}
			else
			{
				placement = "#4c_cocaine_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="5c_cocaine_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
						'<div id="failed_c">5 c.	During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
					'<input type="radio" name="5_cocaine" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
					'<input type="radio" name="5_cocaine" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
					'<input type="radio" name="5_cocaine" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
					'<input type="radio" name="5_cocaine" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
					'<input type="radio" name="5_cocaine" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +
				'</fieldset>' +
				'</div>');
			
			$("#5c_cocaine_fieldcontain").trigger('create');
			
			// Radio buttons 1-4 are pressed
			add_text('#failed_c', drug_of_choice);
			
			cocaine_pressed = true;
		
			$("input[type='radio']").each(function () {
				$(this).click(function (e) {
					var questionText = "";
					var currentpage = getCurrentPage().replace(".html","").split("/");
					$(this).closest('fieldset').children().each(function() {
						questionText = $(this).text();
						console.log($(this).text());
						return false;
					});
					
					logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
					e.preventDefault();
				});
			});
		}
	}
});

$(":input[name='2sub_amphetamine']").live("change", function(event, ui) {
	var drug_of_choice = 'Amphetamine type stimulants (speed, diet pills, ecstasy, etc.)'; 
	
	if ($(this).val() === '0') {
		/* Remove the dynamically created text, allow the button to be pressed again */
		$("#3d_amphetamine_fieldcontain").remove();
		$("#4d_amphetamine_fieldcontain").remove();
		$("#5d_amphetamine_fieldcontain").remove();
		amphetamine_pressed = false;
	} 
	else
	{
		if (!amphetamine_pressed)
		{
			// Figure out where to place question 3, 4, and 5 for amphetamine.
			var placement;
			if ($("#3c_cocaine_fieldcontain").length > 0)
			{
				placement = "#3c_cocaine_fieldcontain";
			}
			else if ($("#3b_cannabis_fieldcontain").length > 0)
			{
				placement = "#3b_cannabis_fieldcontain";
			}
			else if ($("#3a_alcohol_fieldcontain").length > 0)
			{
				placement = "#3a_alcohol_fieldcontain";
			}
			else if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			else
			{
				placement = "#2_amphetamines";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="3d_amphetamine_fieldcontain">' +
					'<fieldset data-role="controlgroup"  class="likert1-5_alcohol">' + 
						'<div id="desire_d">3 d.	During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
						'<input type="radio" name="3_amphetamine" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
						'<input type="radio" name="3_amphetamine" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
						'<input type="radio" name="3_amphetamine" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
						'<input type="radio" name="3_amphetamine" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
						'<input type="radio" name="3_amphetamine" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +

					'</fieldset>' +
				'</div>').trigger('create');
			
			$("#3d_amphetamine_fieldcontain").trigger('create');
			
			// Radio buttons 1-4 are pressed
			add_text('#desire_d', drug_of_choice);
			
			if ($("#4c_cocaine_fieldcontain").length > 0)
			{
				placement = "#4c_cocaine_fieldcontain";
			}
			else if ($("#4b_cannabis_fieldcontain").length > 0)
			{
				placement = "#4b_cannabis_fieldcontain";
			}
			else if ($("#4a_alcohol_fieldcontain").length > 0)
			{
				placement = "#4a_alcohol_fieldcontain";
			}
			else if ($("#3f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#3f_other_drug_use_fieldcontain";
			}
			else if ($("#3e_sedatives_fieldcontain").length > 0)
			{
				placement = "#3e_sedatives_fieldcontain";
			}
			else
			{
				placement = "#3d_amphetamine_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="4d_amphetamine_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
					'<div id="problems_d">4 d.	During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
				'<input type="radio" name="4_amphetamine" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
				'<input type="radio" name="4_amphetamine" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
				'<input type="radio" name="4_amphetamine" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
				'<input type="radio" name="4_amphetamine" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
				'<input type="radio" name="4_amphetamine" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +

			'</fieldset>' + 
			'</div>').trigger('create');
			
			$("#4d_amphetamine_fieldcontain").trigger('create');
			
			// Radio buttons 1-4 are pressed
			add_text('#problems_d', drug_of_choice);
				
			if ($("#5c_cocaine_fieldcontain").length > 0)
			{
				placement = "#5c_cocaine_fieldcontain";
			}
			else if ($("#5b_amphetamine_fieldcontain").length > 0)
			{
				placement = "#5b_amphetamine_fieldcontain";
			}
			else if ($("#5a_alcohol_fieldcontain").length > 0)
			{
				placement = "#5a_alcohol_fieldcontain";
			}
			else if ($("#4f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#4f_other_drug_use_fieldcontain";
			}
			else if ($("#4e_sedatives_fieldcontain").length > 0)
			{
				placement = "#4e_sedatives_fieldcontain";
			}
			else
			{
				placement = "#4d_amphetamine_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="5d_amphetamine_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
						'<div id="failed_d">5 d.	During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
					'<input type="radio" name="5_amphetamine" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
					'<input type="radio" name="5_amphetamine" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
					'<input type="radio" name="5_amphetamine" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
					'<input type="radio" name="5_amphetamine" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
					'<input type="radio" name="5_amphetamine" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +
				'</fieldset>' +
				'</div>');
			
			$("#5d_amphetamine_fieldcontain").trigger('create');
			
			// Radio buttons 1-4 are pressed
			add_text('#failed_d', drug_of_choice);
			
			amphetamine_pressed = true;
		
			$("input[type='radio']").each(function () {
				$(this).click(function (e) {
					var questionText = "";
					var currentpage = getCurrentPage().replace(".html","").split("/");
					$(this).closest('fieldset').children().each(function() {
						questionText = $(this).text();
						console.log($(this).text());
						return false;
					});
					
					logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
					e.preventDefault();
				});
			});
		}
	}
});

$(":input[name='2sub_sedatives']").live("change", function(event, ui) {
	var drug_of_choice = 'Sedatives or sleeping pills (Valium, Serapax, Rohypnol, Ambien, etc.)'; 
	
	if ($(this).val() === '0') {
		/* Remove the dynamically created text, allow the button to be pressed again */
		$("#3e_sedatives_fieldcontain").remove();
		$("#4e_sedatives_fieldcontain").remove();
		$("#5e_sedatives_fieldcontain").remove();
		sedatives_pressed = false;
	} 
	else
	{
		if (!sedatives_pressed)
		{
			// Figure out where to place question 3, 4, and 5 for sedatives.
			var placement;
			if ($("#3d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#3d_amphetamine_fieldcontain";
			}
			else if ($("#3c_cocaine_fieldcontain").length > 0)
			{
				placement = "#3c_cocaine_fieldcontain";
			}
			else if ($("#3b_cannabis_fieldcontain").length > 0)
			{
				placement = "#3b_cannabis_fieldcontain";
			}
			else if ($("#3a_alcohol_fieldcontain").length > 0)
			{
				placement = "#3a_alcohol_fieldcontain";
			}
			else if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}

			$(placement).after(
				'<div data-role="fieldcontain" id="3e_sedatives_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
						'<div id="desire_e">3 e.	During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
						'<input type="radio" name="3_sedatives" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
						'<input type="radio" name="3_sedatives" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
						'<input type="radio" name="3_sedatives" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
						'<input type="radio" name="3_sedatives" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
						'<input type="radio" name="3_sedatives" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +
					'</fieldset>' +
				'</div>').trigger('create');
			
			$("#3e_sedatives_fieldcontain").trigger('create');
			
			add_text('#desire_e', drug_of_choice);
			
			if ($("#4d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#4d_amphetamine_fieldcontain";
			}
			else if ($("#4c_cocaine_fieldcontain").length > 0)
			{
				placement = "#4c_cocaine_fieldcontain";
			}
			else if ($("#4b_cannabis_fieldcontain").length > 0)
			{
				placement = "#4b_cannabis_fieldcontain";
			}
			else if ($("#4a_alcohol_fieldcontain").length > 0)
			{
				placement = "#4a_alcohol_fieldcontain";
			}
			else if ($("#3f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#3f_other_drug_use_fieldcontain";
			}
			else if ($("#3d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#3d_amphetamine_fieldcontain";
			}
			else if ($("#3c_cocaine_fieldcontain").length > 0)
			{
				placement = "#3c_cocaine_fieldcontain";
			}
			else if ($("#3b_cannabis_fieldcontain").length > 0)
			{
				placement = "#3b_cannabis_fieldcontain";
			}
			else if ($("#3a_alcohol_fieldcontain").length > 0)
			{
				placement = "#3a_alcohol_fieldcontain";
			}
			else
			{
				placement = "#3e_sedatives_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="4e_sedatives_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
					'<div id="problems_e">4 e.	During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
				'<input type="radio" name="4_sedatives" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
				'<input type="radio" name="4_sedatives" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
				'<input type="radio" name="4_sedatives" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
				'<input type="radio" name="4_sedatives" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
				'<input type="radio" name="4_sedatives" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +

			'</fieldset>' + 
			'</div>').trigger('create');
			
			$("#4e_sedatives_fieldcontain").trigger('create');
			
			add_text('#problems_e', drug_of_choice);
				
			if ($("#5d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#5d_amphetamine_fieldcontain";
			}
			else if ($("#5c_cocaine_fieldcontain").length > 0)
			{
				placement = "#5c_cocaine_fieldcontain";
			}
			else if ($("#5b_amphetamine_fieldcontain").length > 0)
			{
				placement = "#5b_amphetamine_fieldcontain";
			}
			else if ($("#5a_alcohol_fieldcontain").length > 0)
			{
				placement = "#5a_alcohol_fieldcontain";
			}
			else if ($("#4f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#4f_other_drug_use_fieldcontain";
			}
			else
			{
				placement = "#4e_sedatives_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="5e_sedatives_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
						'<div id="failed_e">5 e.	During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
					'<input type="radio" name="5_sedatives" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
					'<input type="radio" name="5_sedatives" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
					'<input type="radio" name="5_sedatives" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
					'<input type="radio" name="5_sedatives" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
					'<input type="radio" name="5_sedatives" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +

				'</fieldset>' +
				'</div>');
			
			$("#5e_sedatives_fieldcontain").trigger('create');
			
			add_text('#failed_e', drug_of_choice);
				
			sedatives_pressed = true;
		
			$("input[type='radio']").each(function () {
				$(this).click(function (e) {
					var questionText = "";
					var currentpage = getCurrentPage().replace(".html","").split("/");
					$(this).closest('fieldset').children().each(function() {
						questionText = $(this).text();
						console.log($(this).text());
						return false;
					});
					
					logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
					e.preventDefault();
				});
			});
		}
	}
});

$(":input[name='2sub_other_drug_use']").live("change", function(event, ui) {
	var drug_of_choice = 'Other drug use (inhalants, hallucinogens, opiods, etc.)'; 
	
	if ($(this).val() === '0') {
		/* Remove the dynamically created text, allow the button to be pressed again */
		$("#3f_other_drug_use_fieldcontain").remove();
		$("#4f_other_drug_use_fieldcontain").remove();
		$("#5f_other_drug_use_fieldcontain").remove();
		other_drug_use_pressed = false;
	} 
	else
	{
		if (!other_drug_use_pressed)
		{
			// Figure out where to place question 3, 4, and 5 for other drug use.
			var placement;
			if ($("#3e_sedatives_fieldcontain").length > 0)
			{
				placement = "#3e_sedatives_fieldcontain";
			}
			else if ($("#3d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#3d_amphetamine_fieldcontain";
			}
			else if ($("#3c_cocaine_fieldcontain").length > 0)
			{
				placement = "#3c_cocaine_fieldcontain";
			}
			else if ($("#3b_cannabis_fieldcontain").length > 0)
			{
				placement = "#3b_cannabis_fieldcontain";
			}
			else if ($("#3a_alcohol_fieldcontain").length > 0)
			{
				placement = "#3a_alcohol_fieldcontain";
			}
			else
			{
				placement = "#2_other_drug_use";
			}
			$(placement).after(
				'<div data-role="fieldcontain" id="3f_other_drug_use_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
						'<div id="desire_f">3 f.	During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
						'<input type="radio" name="3_other_drug_use" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
						'<input type="radio" name="3_other_drug_use" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
						'<input type="radio" name="3_other_drug_use" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
						'<input type="radio" name="3_other_drug_use" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
						'<input type="radio" name="3_other_drug_use" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +

					'</fieldset>' +
				'</div>');
				
			$("#3f_other_drug_use_fieldcontain").trigger('create');
	
			add_text('#desire_f', drug_of_choice);
			
			if ($("#4e_sedatives_fieldcontain").length > 0)
			{
				placement = "#4e_sedatives_fieldcontain";
			}
			else if ($("#4d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#4d_amphetamine_fieldcontain";
			}
			else if ($("#4c_cocaine_fieldcontain").length > 0)
			{
				placement = "#4c_cocaine_fieldcontain";
			}
			else if ($("#4b_cannabis_fieldcontain").length > 0)
			{
				placement = "#4b_cannabis_fieldcontain";
			}
			else if ($("#4a_alcohol_fieldcontain").length > 0)
			{
				placement = "#4a_alcohol_fieldcontain";
			}
			else
			{
				placement = "#3f_other_drug_use_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="4f_other_drug_use_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
					'<div id="problems_f">4 f.	During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
				'<input type="radio" name="4_other_drug_use" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
				'<input type="radio" name="4_other_drug_use" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
				'<input type="radio" name="4_other_drug_use" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
				'<input type="radio" name="4_other_drug_use" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
				'<input type="radio" name="4_other_drug_use" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +

			'</fieldset>' + 
			'</div>').trigger('create');
			
			$("#4f_other_drug_use_fieldcontain").trigger('create');
			
			add_text('#problems_f', drug_of_choice);
			if ($("#5e_sedatives_fieldcontain").length > 0)
			{
				placement = "#5e_sedatives_fieldcontain";
			}
			else if ($("#5d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#5d_amphetamine_fieldcontain";
			}
			else if ($("#5c_cocaine_fieldcontain").length > 0)
			{
				placement = "#5c_cocaine_fieldcontain";
			}
			else if ($("#5b_amphetamine_fieldcontain").length > 0)
			{
				placement = "#5b_amphetamine_fieldcontain";
			}
			else if ($("#5a_alcohol_fieldcontain").length > 0)
			{
				placement = "#5a_alcohol_fieldcontain";
			}
			else
			{
				placement = "#4f_other_drug_use_fieldcontain";
			}
			$(placement).after(
				'<div data-role="fieldcontain" id="5f_other_drug_use_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
						'<div id="failed_f">5 f.	During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
					'<input type="radio" name="5_other_drug_use" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
					'<input type="radio" name="5_other_drug_use" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
					'<input type="radio" name="5_other_drug_use" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
					'<input type="radio" name="5_other_drug_use" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
					'<input type="radio" name="5_other_drug_use" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +
				'</fieldset>' +
				'</div>');
			
			$("#5f_other_drug_use_fieldcontain").trigger('create');
			
			// Radio buttons 1-4 are pressed
			add_text('#failed_f', drug_of_choice);
				
			other_drug_use_pressed = true;
		
			$("input[type='radio']").each(function () {
				$(this).click(function (e) {
					var questionText = "";
					var currentpage = getCurrentPage().replace(".html","").split("/");
					$(this).closest('fieldset').children().each(function() {
						questionText = $(this).text();
						console.log($(this).text());
						return false;
					});
					
					logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
					e.preventDefault();
				});
			});
		}
	}
});

$("#alcohol_drugs-assessment-submit").bind("tap", function (e) {
	e.preventDefault();
	var total = 0;
	var alcohol_score = 0;
	var cannabis_score = 0;
	var cocaine_score = 0;
	var amphetamine_score = 0;
	var sedatives_score = 0;
	var other_drug_use_score = 0;
	
	var numChecked = 0;
	var question1_use_alcohol = false;
	var question1_use_cannabis = false;
	var question1_use_cocaine = false;
	var question1_use_amphetamine = false;
	var question1_use_sedatives = false;
	var question1_use_other_drug_use = false;
	
	/*********************************/
	// For questions 3-7
	var alcohol_used_2 = false;
	var cannabis_used_2 = false;
	var cocaine_used_2 = false;
	var amphetamine_used_2 = false;
	var sedatives_used_2 = false;
	var other_drug_use_used_2 = false;
	
	/*********************************/
	
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		// Questions 1a - 1f will be used to check if scoring is needed for the later questions
		
		switch($(this).attr('name'))
		{
		case '1a':
			if ($(this).val() === '1')
			{
				question1_use_alcohol = true;
			}
			break;
		case '1b':
			if ($(this).val() === '1')
			{
				question1_use_cannabis = true;
			}
			break;
		case '1c':
			if ($(this).val() === '1')
			{
				question1_use_cocaine = true;
			}
			break;
		case '1d':
			if ($(this).val() === '1')
			{
				question1_use_amphetamine = true;
			}
			break;
		case '1e':
			if ($(this).val() === '1')
			{
				question1_use_sedatives = true;
			}
			break;
		case '1f':
			if ($(this).val() === '1')
			{
				question1_use_other_drug_use = true;
			}
			break;
		/************************************************************************************/
		// If you have answers yes for question 1 and the answer is greater than zero 
		// then proceed to questions 3-7 for scoring.
		// This is done for all of the alcohol and drugs
		/************************************************************************************/
			
		case '2sub_alcohol':
			if ($(this).val() > '0' && question1_use_alcohol)
			{
				alcohol_used_2 = true;
				alcohol_score += Number($(this).val());
			}
			break;
		case '3_alcohol':
		case '4_alcohol':
		case '5_alcohol':
		case '6_alcohol':
		case '7_alcohol':
			if (alcohol_used_2)
			{
				alcohol_score += Number($(this).val());
			}
			break;
			
		case '2sub_cannabis':
			if ($(this).val() > '0' && question1_use_cannabis)
			{
				cannabis_used_2 = true;
				cannabis_score += Number($(this).val());
			}
			break;
		case '3_cannabis':
		case '4_cannabis':
		case '5_cannabis':
		case '6_cannabis':
		case '7_cannabis':
			if (cannabis_used_2)
			{
				cannabis_score += Number($(this).val());
			}
			break;
			
		case '2sub_cocaine':
			if ($(this).val() > '0' && question1_use_cocaine)
			{
				cocaine_used_2 = true;
				cocaine_score += Number($(this).val());
			}
			break;
		case '3_cocaine':
		case '4_cocaine':
		case '5_cocaine':
		case '6_cocaine':
		case '7_cocaine':
			if (cocaine_used_2)
			{
				cocaine_score += Number($(this).val());
			}
			break;
			
		
		case '2sub_amphetamine':
			if ($(this).val() > '0' && question1_use_amphetamine)
			{
				amphetamine_used_2 = true;
				amphetamine_score += Number($(this).val());
			}
			break;
		case '3_amphetamine':
		case '4_amphetamine':
		case '5_amphetamine':
		case '6_amphetamine':
		case '7_amphetamine':
			if (amphetamine_used_2)
			{
				amphetamine_score += Number($(this).val());
			}
			break;
			
		case '2sub_sedatives':
			if ($(this).val() > '0' && question1_use_sedatives)
			{
				sedatives_used_2 = true;
				sedatives_score += Number($(this).val());
			}
			break;
		case '3_sedatives':
		case '4_sedatives':
		case '5_sedatives':
		case '6_sedatives':
		case '7_sedatives':
			if (sedatives_used_2)
			{
				sedatives_score += Number($(this).val());
			}
			break;
			
		case '2sub_other_drug_use':
			if ($(this).val() > '0' && question1_use_other_drug_use)
			{
				other_drug_use_used_2 = true;
				other_drug_use_score += Number($(this).val());
			}
			break;
		case '3_other_drug_use':
		case '4_other_drug_use':
		case '5_other_drug_use':
		case '6_other_drug_use':
		case '7_other_drug_use':
			if (other_drug_use_used_2)
			{
				other_drug_use_score += Number($(this).val());
			}
			break;
		}
		numChecked = numChecked + 1;
	});

	// We start at 6 because if nothing is selected or it's all set to no for question 1,
	// we need to make sure that those 6 have been selected
	
	var value_to_be_checked = 6;
	/***************************************************************************/
	// Add up all of the alcohol and drug scores
	/***************************************************************************/
	if (question1_use_alcohol)
	{
		if (!alcohol_used_2)
		{
			value_to_be_checked += 3;
		}
		else if (alcohol_used_2)
		{
				
			value_to_be_checked += 6;
		}
	}
	if (question1_use_cannabis)
	{
		if (!cannabis_used_2)
		{
			value_to_be_checked += 3;
		}
		else if (cannabis_used_2)
		{
			value_to_be_checked += 6;
		}
	}
	if (question1_use_cocaine)
	{
		if (!cocaine_used_2)
		{
			value_to_be_checked += 3;
		}
		else if (cocaine_used_2)
		{
			value_to_be_checked += 6;
		}
	}
	if (question1_use_amphetamine)
	{
		if (!amphetamine_used_2)
		{
			value_to_be_checked += 3;
		}
		else if (amphetamine_used_2)
		{
			value_to_be_checked += 6;
		}
	}
	
	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='radio']").each(function () {
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});
	
	if (numChecked < value_to_be_checked) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	
	var key;
	// Figure out based on the alcohol and drug score what feedback to show
	if (	alcohol_score <= 10 && 
			(cannabis_score + cocaine_score +
			amphetamine_score + sedatives_score +
			other_drug_use_score <= 3)) 
	{
		key = 'feedback1';
	} 
	else if (	alcohol_score >= 11 && alcohol_score <= 26 
			&& (cannabis_score + cocaine_score +
			amphetamine_score + sedatives_score +
			other_drug_use_score <= 3))
	{
		key = 'feedback2';
	}
	else if (	alcohol_score >= 27 && alcohol_score <= 38 
			&& (cannabis_score + cocaine_score +
			amphetamine_score + sedatives_score +
			other_drug_use_score <= 3))
	{
		key = 'feedback3';
	}
	else if (
				alcohol_score <= 10 && cannabis_score  < 27 && cocaine_score < 27 && 
				amphetamine_score < 27 && sedatives_score < 27 && other_drug_use_score < 27 && 
				((cannabis_score >= 4 && cannabis_score <= 26) || 
				(cocaine_score >= 4 && cocaine_score <= 26) || 
				(amphetamine_score >= 4 && amphetamine_score <= 26) || 
				(sedatives_score >= 4 && sedatives_score <= 26) ||
				(other_drug_use_score >= 4 && other_drug_use_score <= 26)))
	{
		key = 'feedback4';
	}
	else if (alcohol_score <= 10 && 
			((cannabis_score >= 27 && cannabis_score <= 38) || 
			(cocaine_score >= 27 && cocaine_score <= 38) || 
			(amphetamine_score >= 27 && amphetamine_score <= 38) || 
			(sedatives_score >= 27 && sedatives_score <= 38) ||
			(other_drug_use_score >= 27 && other_drug_use_score <= 38)))
	{
		key = 'feedback5';
	}
	else if (
			alcohol_score >= 11 && alcohol_score >= 26 && cannabis_score  < 27 && cocaine_score < 27 && 
			amphetamine_score < 27 && sedatives_score < 27 && other_drug_use_score < 27 && 
			((cannabis_score >= 4 && cannabis_score <= 26) || 
			(cocaine_score >= 4 && cocaine_score <= 26) || 
			(amphetamine_score >= 4 && amphetamine_score <= 26) || 
			(sedatives_score >= 4 && sedatives_score <= 26) ||
			(other_drug_use_score >= 4 && other_drug_use_score <= 26)))
	{
		key = 'feedback6';
	}
	else if ((alcohol_score >= 27 && alcohol_score <= 38 &&
			(cannabis_score >= 3 || 
			cocaine_score >= 3 || 
			amphetamine_score >= 3 || 
			sedatives_score >= 3 ||
			other_drug_use_score >= 3)) ||
			
			(alcohol_score >= 10 && (cannabis_score > 26 || 
					cocaine_score > 26 || 
					amphetamine_score > 26 || 
					sedatives_score > 26 ||
					other_drug_use_score > 26)))
	{
		key = 'feedback7';
	}
	
	var currentpage = getCurrentPage().replace(".html","").split("/");
	$("input[type='radio']:checked").each(function () {
		var questionText = "";
		$(this).closest('fieldset').children().each(function() {
			questionText = $(this).text();
			console.log($(this).text());
			return false;
		});
		
		logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
	});
	
	logUserData({"View":currentpage[1] + " assessment",
				 "Item":"",
				 "Action":"Completed",
				 "Value":"Alcohol Score:" + alcohol_score + " ,Cannabis Score:" + cannabis_score + " ,Cocaine Score:" + cocaine_score + " ,Amphetamine Score:" + amphetamine_score + ", Sedatives Score:" + sedatives_score + ", Other Drugs Score:" + other_drug_use_score});
	//displayed scored results
	alertDialog(results[key], null, 2);
});






				$('#videos').bind("pageshow", function(event) {
					displayPlaylist( 1046591995001 );
				});                                   
			


			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		




// accessibility page reading automatically provided by accessibility.js

var results = null;
$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#fwk_assessment-submit").bind("tap", function (e) {
	e.preventDefault();
	var total = 0;
	var numChecked = 0;
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		
		total = total + Number($(this).val());
		numChecked = numChecked + 1;
	});

	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='radio']").each(function () {
		
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});
	
	if (numChecked < 16) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	
	var last = localStorage.getItem("fwkAssessLastScore");
	var key = score(last) + "-" + score(total);
	localStorage.setItem("fwkAssessLastScore", total);

	var currentpage = getCurrentPage().replace(".html","").split("/");
	$("input[type='radio']:checked").each(function () {
		var questionText = "";
		$(this).closest('fieldset').children().each(function() {
			questionText = $(this).text();
			console.log($(this).text());
			return false;
		});
		
		logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
	});
    logUserData({"View":currentpage[1] + " assessment","Item":"","Action":"Completed","Value":total});
	//displayed scored results
	alertDialog(results[key], 'Results', 2);
	//history.back();
}); 

/* apply scoring algorithm */
function score(total) {
	if (total == null) {
		return null;
	}
	else if (total <= 60) {
		return "low";
	}
	else if (total <= 73) {
		return "med";
	}
	else {
		return "high";
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}







					$('#videos').bind("pageshow", function(event) {
						displayPlaylist( 1054629567001 );
					});
				


			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		




// accessibility page reading automatically provided by accessibility.js

var results = null;
$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#life_stress_assessment-submit").bind("tap", function (e) {
	e.preventDefault();
	var total = 0;
	var numChecked = 0;
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		
		total = total + Number($(this).val());
		numChecked = numChecked + 1;
	});

	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='radio']").each(function () {
		
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});

	if (numChecked < 10) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	
	var last = localStorage.getItem("lifeStressAssessLastScore");
	var key = score(last) + "-" + score(total);
	localStorage.setItem("lifeStressAssessLastScore", total);

	var currentpage = getCurrentPage().replace(".html","").split("/");
	$("input[type='radio']:checked").each(function () {
		var questionText = "";
		$(this).closest('fieldset').children().each(function() {
			questionText = $(this).text();
			console.log($(this).text());
			return false;
		});
		
		logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
	});
    logUserData({"View":currentpage[1] + " assessment","Item":"","Action":"Completed","Value":total});
	//displayed scored results
	alertDialog(results[key], 'Results', 2);
	//history.back();
}); 

/* apply scoring algorithm */
function score(total) {
	if (total == null) {
		return null;
	}
	else if (total <= 10) {
		return "low";
	}
	else if (total <= 25) {
		return "med";
	}
	else {
		return "high";
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}







					$('#videos').bind("pageshow", function(event) {
						displayPlaylist( 1054629569001 );
					});
				


			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		




// accessibility page reading automatically provided by accessibility.js

var results = null;
$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#work_adjustment_assessment-submit").bind("tap", function (e) {
	//log.debug("Tap");
	e.preventDefault();
	var total = 0;
	var numChecked = 0;
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		
		total = total + Number($(this).val());
		numChecked = numChecked + 1;
	});

	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='radio']").each(function () {
		
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});
	
	if (numChecked < 10) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	
	var last = localStorage.getItem("work_adjustmentAssessLastScore");
	var key = score(last) + "-" + score(total);
	localStorage.setItem("work_adjustmentAssessLastScore", total);

	var currentpage = getCurrentPage().replace(".html","").split("/");
	$("input[type='radio']:checked").each(function () {
		var questionText = "";
		$(this).closest('fieldset').children().each(function() {
			questionText = $(this).text();
			console.log($(this).text());
			return false;
		});
		
		logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
	});
    logUserData({"View":currentpage[1] + " assessment","Item":"","Action":"Completed","Value":total});
	alertDialog(results[key], 'Results', 2);
	//history.back();
}); 

/* apply scoring algorithm */
function score(total) {
	if (total == null) {
		return null;
	}
	else if (total <= 24) {
		return "low";
	}
	else if (total <= 34) {
		return "med";
	}
	else {
		return "high";
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}







					$('#videos').bind("pageshow", function(event) {
						displayPlaylist( 1057669883001 );
					});
				


			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		




// accessibility page reading automatically provided by accessibility.js

var results = null;
$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#ptsd-assessment-submit").bind("tap", function (e) {
	e.preventDefault();
	var total = 0;
	var numChecked = 0;
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		total = total + Number($(this).val());
		numChecked = numChecked + 1;
	});
	
    var errorArray = new Array();
    var choice_selected = null;
    var name = null;
    var id = null;
    
    $("input[type='radio']").each(function () {
        
        name = $(this).attr("name");
        id = $(this).attr("id");
        
        // add up each checked radio button.
        if ($(this).attr("checked"))
        {
            choice_selected = checked(name, id, errorArray);
        }
        else
        {
            // Unchecked
            unchecked(name, id, errorArray, choice_selected);
        }
    });
    
	if (numChecked < 17) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	var last = localStorage.getItem("ptsdAssessLastScore");
	var key = score(last) + "-" + score(total);
	localStorage.setItem("ptsdAssessLastScore", total);

	var currentpage = getCurrentPage().replace(".html","").split("/");
	$("input[type='radio']:checked").each(function () {
		var questionText = "";
		$(this).closest('fieldset').children().each(function() {
			questionText = $(this).text();
			console.log($(this).text());
			return false;
		});
		
		logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
	});
    logUserData({"View":currentpage[1] + " assessment","Item":"","Action":"Completed","Value":total});
	//displayed scored results
	alertDialog(results[key], 'Results', 2);
}); 

/* apply scoring algorithm */
function score(total) {
	if (total == null) {
		return null;
	}
	else if (total <= 33) {
		return "low";
	}
	else if (total <= 43) {
		return "med";
	}
	else {
		return "high";
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}







					$('#videos').bind("pageshow", function(event) {
						displayPlaylist( 1054629574001 );
					});
				


			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		




// accessibility page reading automatically provided by accessibility.js

var results = null;
$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#stigma_assessment-submit").bind("tap", function (e) {
	e.preventDefault();
	var total = 0;
	var numChecked = 0;
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		
		total = total + Number($(this).val());
		numChecked = numChecked + 1;
	});

	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='radio']").each(function () {
		
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});
	
	if (numChecked < 10) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	
	var last = localStorage.getItem("stigmaAssessLastScore");
	var key = score(last) + "-" + score(total);
	localStorage.setItem("stigmaAssessLastScore", total);

	var currentpage = getCurrentPage().replace(".html","").split("/");
	$("input[type='radio']:checked").each(function () {
		var questionText = "";
		$(this).closest('fieldset').children().each(function() {
			questionText = $(this).text();
			console.log($(this).text());
			return false;
		});
		
		logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
	});
    logUserData({"View":currentpage[1] + " assessment","Item":"","Action":"Completed","Value":total});
	//displayed scored results
	alertDialog(results[key], 'Results', 2);
	//history.back();
}); 

/* apply scoring algorithm */
function score(total) {
	if (total == null) {
		return null;
	}
	else if (total <= 22) {
		return "low";
	}
	else if (total <= 32) {
		return "med";
	}
	else {
		return "high";
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}







					$('#videos').bind("pageshow", function(event) {
						displayPlaylist( 1057669880001 );
					});
				


			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		




// accessibility page reading automatically provided by accessibility.js

var results = null;
$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#mtbi-assessment-submit").bind("tap", function (e) {
	//log.debug("Tap");
	e.preventDefault();
	var total = 0;
	var numChecked = 0;
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		
		total = total + Number($(this).val());
		numChecked = numChecked + 1;
	});

	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='radio']").each(function () {
		
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});
	
	if (numChecked < 13) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	
	var last = localStorage.getItem("mtbiAssessLastScore");
	var key = score(last) + "-" + score(total);
	localStorage.setItem("mtbiAssessLastScore", total);

	var currentpage = getCurrentPage().replace(".html","").split("/");
	$("input[type='radio']:checked").each(function () {
		var questionText = "";
		$(this).closest('fieldset').children().each(function() {
			questionText = $(this).text();
			console.log($(this).text());
			return false;
		});
		
		logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
	});
    logUserData({"View":currentpage[1] + " assessment","Item":"","Action":"Completed","Value":total});
	// display scored results
	alertDialog(results[key], 'Results', 2);
	//this was working, but broke.
/*	$(this).simpledialog({
		'mode' : 'bool',
		'prompt' : '<div class="popup-text">' + results[key] + '</div>',
		'buttons' : {
			'OK': {
				click: function () {
					reset();
					//history.back();
				}
			}
		}
	});*/
}); 




/* apply scoring algorithm */
function score(total) {
	if (total == null) {
		return null;
	}
	else if (total <= 59) {
		return "low";
	}
	else if (total <= 114) {
		return "med";
	}
	else {
		return "high";
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}







					$('#videos').bind("pageshow", function(event) {
						displayPlaylist( 1054629570001 );
					});
				


			$('#learn').bind('pageshow', function(event, ui) {				
				var currentpage = getCurrentPage().replace(".html","").split("/");
				logUserData({"View":currentpage[1],"Item":"Learn","Action":"Open"});
			});
			$("[data-role='collapsible']").each(function() {
				$(this).click(function(e) {
					if(!$(this).hasClass('ui-collapsible-collapsed')) {
						//click to collapse contents is added to the text when calling .text() on the h3 child
						var topictitle = $(this).children('h3').text().replace("click to collapse contents", "").trim();
						var currentpage = getCurrentPage().replace(".html","").split("/");
						logUserData({"View":"Learn","Item":topictitle,"Action":"Open"});
					}
				});
			});
		




// accessibility page reading automatically provided by accessibility.js

var results = null;
$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#resilience_assessment-submit").bind("tap", function (e) {
	e.preventDefault();
	var total = 0;
	var numChecked = 0;
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		
		total = total + Number($(this).val());
		numChecked = numChecked + 1;
	});

	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='radio']").each(function () {
		
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});

	if (numChecked < 22) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}
	
	var last = localStorage.getItem("resilienceAssessLastScore");
	var key = score(last) + "-" + score(total);
	localStorage.setItem("resilienceAssessLastScore", total);
	
	var currentpage = getCurrentPage().replace(".html","").split("/");
	$("input[type='radio']:checked").each(function () {
		var questionText = "";
		$(this).closest('fieldset').children().each(function() {
			questionText = $(this).text();
			console.log($(this).text());
			return false;
		});
		
		logUserData({"View":currentpage[1] + " assessment","Item":questionText,"Action":"Selected","Value":$(this).val()});
	});
    logUserData({"View":currentpage[1] + " assessment","Item":"","Action":"Completed","Value":total});
	//displayed scored results
	alertDialog(results[key], 'Results', 2);
	//history.back();
}); 

/* apply scoring algorithm */
function score(total) {
	if (total == null) {
		return null;
	}
	else if (total <= 49) {
		return "low";
	}
	else if (total <= 70) {
		return "med";
	}
	else {
		return "high";
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}







					$('#videos').bind("pageshow", function(event) {
						displayPlaylist( 1054629575001 );
					});
				

/**
 * 
 * 
 * All actions here get sent to TextToSpeechPlugin.execute and pass the action name.
 * 
 * @return Instance of TextToSpeechPlugin
 */
var TextToSpeechPlugin = function()
{
};

/**
 * @param directory        The directory for which we want the listing
 * @param successCallback  The callback which will be called on successful completion
 * @param failureCallback  The callback which will be called on error
 */
TextToSpeechPlugin.prototype.speakEventStartFlush = function(event, successCallback, failureCallback)
{
	return PhoneGap.exec(successCallback, failureCallback, 'TextToSpeechPlugin', 'speakEventStartFlush', [event] ); 
};

TextToSpeechPlugin.prototype.speakEventStartAdd = function(event, successCallback, failureCallback)
{
	return PhoneGap.exec(successCallback, failureCallback, 'TextToSpeechPlugin', 'speakEventStartAdd', [event] ); 
};

TextToSpeechPlugin.prototype.speakEventStop = function(event, successCallback, failureCallback)
{
	return PhoneGap.exec(successCallback, failureCallback, 'TextToSpeechPlugin', 'speakEventStop', [event] ); 
};
/**
 * <ul>
 * <li>Register the TextToSpeech Plugin</li>
 * <li>Also register native call which will be called when this plugin runs</li>
 * </ul>
 */
PhoneGap.addConstructor(function()
{
	// Register the javascript plugin with PhoneGap
	PhoneGap.addPlugin('text_to_speech', new TextToSpeechPlugin());
});

text_to_speech = function (stuff, choice)
{
	var text;
	if (stuff instanceof HTMLElement){
		text = $(stuff).text();
	} 
	else {
		text = stuff;
	}
		
	// only run if we're on a device.
	if (device != null) {
		
		// next bit makes the logs prettier and easier to understand.
		var logLineLimit = 200;
		var text_bit = text.substring(0,logLineLimit*2).replace(/[\r\n\t]/gm,' ').replace(/( )+/gm, ' ').substring(0,logLineLimit);
		if (text_bit.length >= logLineLimit) {text_bit = text_bit + '...';}
		
		if (text === "stop") {
			try {
				window.plugins.text_to_speech.speakEventStop(
					text, 
					function () { console.debug('TTS: Stop'); }, 
					function () { console.warn('TTS: Stop FAILURE'); }
				);
			}
			catch (stop_err) {
				console.error('TTS: Stop ERROR', stop_err);
			}
		}
		else if (choice === "add") {
			try {
				window.plugins.text_to_speech.speakEventStartAdd(
					text, 
					function () { console.debug('TTS: Add', text_bit); }, 
					function () { console.warn('TTS: Add FAILURE', text_bit); }
				);
			}
			catch (add_err) {
				console.error('TTS: Add ERROR', text_bit, add_err);
			}
		}
		else {
			try {
				window.plugins.text_to_speech.speakEventStartFlush(
					text, 
					null, 
					function () { console.debug('TTS: Flush', text_bit); }, 
					function () { console.warn('TTS: Flush FAILURE', text_bit); }
				);
			}
			catch (flush_err) {
				console.error('TTS: Flush ERROR', text_bit, flush_err);
			}
		}
	}
};

/*
 *
 * LifeArmor
 *
 * Copyright Â© 2009-2012 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright Â© 2009-2012 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 *
 */

var add_favorites = new Array(), module_list;
var tool_list;
var videoSrc = '';
var videoName = '';
var enabled = true;
var historyCount = 0;
var flurrySetting;
var researchSetting;
var then = new Date();
var previousPage;
var reportData = false;


module_list = {
            'alcohol_drugs': 'Alcohol &amp; Drugs',
            'anger': 'Anger',
            'anxiety': 'Anxiety',
            'depression': 'Depression',
            'families_friendships': 'Families &amp; Friendships',
            'families_with_kids': 'Families With Kids',
            'life_stress': 'Life Stress',
            'mild_traumatic_brain_injury': 'Mild Traumatic Brain Injury',
            'military_sexual_trauma': 'Military Sexual Trauma',
            'physical_injury': 'Physical Injury',
            'post_traumatic_stress': 'Post Traumatic Stress',
            'resilience': 'Resilience',
            'sleep': 'Sleep',
            'spirituality': 'Spirituality',
            'stigma': 'Stigma',
            'tobacco': 'Tobacco',
            'work_adjustment': 'Work Adjustment'
        };

tool_list = {
            'assertiveness':'Assertiveness',
            'distract':'Distract Yourself',
            'gratitude':'Gratitude',
            'grounding':'Grounding',
            //'health_habits':'Health Habits',
            'help_falling_asleep':'Help with Sleep',
            'inspiring_quotes':'Inspiring Quotes',
            //'iso_plan':'Build Your Social Support',
            'optimism':'Optimism',
            'perspective_change':'Perspective Change',
            'pleasant_events':'Pleasant Events',
            'relax_breathe':'Relax/Breathe',
            //'relaxation':'Relaxation',
            'rid':'R.I.D.',
            //'safety_plan':'Safety Plan',
            'seek_support':'Support Finder',
            'time_out':'Time Out'
};

//document.addEventListener("deviceready", onDeviceReady, false);
//for diagnosing the sequince of events 
/*
$( document ).bind("pagebeforecreate pagecreate pagebeforechange pagechange pagebeforeshow pageshow pagebeforehide pagehide", function( e ) {
    console.log( e.type + ": " + e.target.nodeName + " - " + ( e.target.id ? "#" + e.target.id : "<No ID>" ) );
});
*/

$('div').live('pagecreate',function(event, ui) {
    $(this).hasClass('add-footer') && $(this).append('<div data-role="footer" data-position="fixed" class="ui-state-persist" id="footerID">');
});

$('div').live('pagehide', function(event) {
	reportData = true;
});

$('div').live('pageshow',function(event,ui){
    setFlurry();
    adjustHistory();
    onPageChange();
	
    $("#favorite").bind("click", function(event, ui) {
        var id = $(this).attr("id");
        var faves = localStorage.getItem('favorites');
        if ( !jQuery.isArray(faves)) {
            faves = [];
        }
        var module = myPath.split('/')[1];
        var pos = faves.indexOf(module);

        if ( pos  === -1 ) {
            faves.push(module);
            $(this).removeClass('unfavorite').addClass('favorite');
			logUserData({"View":getCurrentPage().replace(".html","").split("/")[1],"Item":"Favorite","Action":"On"});
            //console.log('a ' + id);  
        } 
        else {
            faves.splice(pos, 1);
            $(this).removeClass('favorite').addClass('unfavorite');
			logUserData({"View":getCurrentPage().replace(".html","").split("/")[1],"Item":"Favorite","Action":"Off"});
            //$(this).children('speak').text('Add to favorites.');  // set the speech for next click.
        }
        localStorage.setItem('favorites', faves);
    }); 

    $('.interactive-rotate-button').bind('click', function () {
        rotateMessage('data.json', $(".interactive-message"));
    });
    
    $( "#flurryPluginButton" ).bind( "change", function(event, ui) {
        //console.log("changed");
        //e.preventDefault();
        var flurrySetting = $( "#flurryPluginButton" ).val();
        
       /* $("input[type='radio']:checked").each(function () {
            flurrySetting = flurrySetting + Number($(this).val());
        }); */
        
        if (flurrySetting == 0){
            //console.log("flurry is off");
            $("#flurryPluginButton").val('0').slider('refresh');
        } else {
            //console.log("flurry is on");
            $("#flurryPluginButton").val('1').slider('refresh');
        }
        
        localStorage.setItem("flurryPluginButton", flurrySetting);
    });
});

$('#settings').live('pageshow', function(event, ui) {
    //flurryToggle();
    getStatus("Test");
});


$('#tools').live('pagebeforeshow', function(event, ui){
    $('div[data-role="navbar"]').empty().remove();
});

$('#player').live('pageshow', function(event, ui) {
                  $('#videoSrcID').attr('src', videoSrc);
                  $('#playerHeader').text(videoName);
                  //console.log('VideoSrc: ' + videoSrc);
                  //console.log('VideoName: ' + videoName);
});

$('#main').live('pagebeforeshow',function(event, ui)    {
    historyCount = 0;
    createTopicList();
    mainFooter(); 
});

$('#toolListPage').live('pageshow',function(event, ui)    {
    createToolList();
});

$('#foursquare').live('pagebeforeshow',function(event, ui) {
    $('a').bind('click', function(event, ui){
        $.mobile.showPageLoadingMsg(); 
    });
    $('div[data-role="navbar"]').remove();
        myPath = getCurrentPage();
        if (myPath.search('/four.html') > -1 ) {
            localStorage.setItem('foursquare', myPath);
            var faves = localStorage.getItem('favorites');
            // if current module is in faves, show favorite star.
            if (faves != null && faves.indexOf(myPath.split('/')[1]) > -1 ) {
                //console.log("Topic is a favorite.");
                $(this).children('div[data-role="header"]').append('<div id="favorite" class="favorite" speak-action="Removed from favorites"></div>');
            }
            else {
                //console.log("Topic is not a favorite.");
                $(this).children('div[data-role="header"]').append('<div id="favorite" class="unfavorite"></div>');
            }
        }
        else if ( myPath === 'index.html'  || myPath === 'tools/index.html' ) {
            localStorage.removeItem("foursquare");
        }
});

$('.tool').live('pageshow', function (event, ui) {
    if ($(this).has('.interactive-message').length > 0) {
        rotateMessage('data.json', $('.interactive-message'));
    }
});

/* LEARN */
$('div[data-role="collapsible"]').live('expand', function (event, ui) {
    // when expanding a collapsible, scroll to the top of the collapsible.
    var targ = event.currentTarget;
    var offie = $(targ).offset();
    $(window).scrollTop(offie.top - 60);
});

$('div.ui-collapsible-contain').live('expand', function() {
    var lastExpanded;
    $(this).hide().trigger('updatelayout');
    var $expandable = $(this);
    // wait until the lastExpanded is collapsed
    var intervalId = setInterval(function() {
        if (lastExpanded && lastExpanded.has( ".ui-collapsible-heading-collapsed" )) {
            var expandableTop = $expandable.offset().top,
            $window = $(window),
            targetPos = expandableTop - $window.scrollTop() + $expandable.height();
            if (targetPos > $window.height() || expandableTop < $window.scrollTop()) {
                $.mobile.silentScroll(expandableTop);
            }
            clearInterval(intervalId);
            lastExpanded = $expandable;
        } else {
            lastExpanded = $expandable;
        }
    }, 200);
});

/*******************************************************************************
 ****************************** FUNCTIONS **************************************
 *******************************************************************************/

function onBackKeyDown() {
    //console.log('backbutton called');
   // buttonPress(StateEnum.NONE);
    if (historyCount == 0){
        navigator.app.exitApp();
    } else {
        window.history.back();
    }
}

function adjustHistory() {
    historyCount--;
    //console.log("historyCount = " + historyCount);
}

function setFlurry() {
    if (localStorage.getItem("flurryPluginButton") == null){
            flurrySetting = 1;
    } else{
            flurrySetting = localStorage.getItem("flurryPluginButton");
    }
    //console.log(flurrySetting);
}

function onPageChange() {    
	document.addEventListener("deviceready", onDeviceReadyPageChange, false);
	document.addEventListener("resume", onDeviceResume, false);
}

function onDeviceReadyPageChange() {
    // pagechange code
	//if (flurrySetting == null || flurrySetting == 1 ){
    //    logAnalytics( 'Page: ' + getCurrentPage());
    //} else {
    //    //console.log("Flurry Disabled");
    //}	
	
	if(reportData == true) {
		var now = new Date();
		var duration = now.getTime() - then.getTime();
		if(previousPage[0] == "index")
			logUserData({"Duration":duration,"View":"Dashboard","Item":"","Action":"Close With Duration"});
		else if(previousPage[0] == "settings")
			logUserData({"Duration":duration,"View":"Settings","Item":"","Action":"Close With Duration"});
		else if(previousPage[0] == "about")
			logUserData({"Duration":duration,"View":"About","Item":"","Action":"Close With Duration"});
		else if(previousPage[0] == "local")
			logUserData({"Duration":duration,"View":"Local Resources/Help","Item":"","Action":"Close With Duration"});
		else if(previousPage[2] == "learn")
			logUserData({"Duration":duration,"View":previousPage[1],"Item":"Learn","Action":"Close With Duration"});
		else if(previousPage[0] == "index dialog") //tools main
			logUserData({"Duration":duration,"View":"Tools","Item":"","Action":"Close With Duration"});
		else if(previousPage[0] == "tools")
			logUserData({"Duration":duration,"View":"Tools","Item":previousPage[1],"Action":"Close With Duration"});
		else if(previousPage[2] == "videos")
			logUserData({"Duration":duration,"View":"Videos","Item":"","Action":"Close With Duration"});
		else if(previousPage[2] == "four")
			logUserData({"Duration":duration,"View":previousPage[1],"Item":"","Action":"Close With Duration"});
		else if(previousPage[2] == "assessment")
			logUserData({"Duration":duration,"View":previousPage[1] + " " + previousPage[2],"Item":"","Action":"Close With Duration"});
		
		then = new Date();
		reportData = false;
	}
	previousPage = getCurrentPage().replace(".html","").split("/");
	
	// Send the open event either after the close event
	if(previousPage[0] == "index")
		logUserData({"View":"Dashboard","Item":"","Action":"Open"}); 
	else if(previousPage[0] == "settings")
		logUserData({"View":"Settings","Item":"","Action":"Open"}); 
	else if(previousPage[0] == "about")
		logUserData({"View":"About","Item":"","Action":"Open"}); 
	else if(previousPage[0] == "local")
		logUserData({"View":"Local Resources/Help","Item":"","Action":"Open"}); 
	else if(previousPage[2] == "learn")
		logUserData({"View":previousPage[1],"Item":"Learn","Action":"Open"}); 
	else if(previousPage[0] == "index dialog") //tools main
		logUserData({"View":"Tools","Item":"","Action":"Open"}); 
	else if(previousPage[0] == "tools")
		logUserData({"View":"Tools","Item":previousPage[1],"Action":"Open"}); 
	else if(previousPage[2] == "videos")
		logUserData({"View":"Videos","Item":"","Action":"Open"}); 
	else if(previousPage[2] == "four")
		logUserData({"View":previousPage[1],"Item":"","Action":"Open"}); 
	else if(previousPage[2] == "assessment")
		logUserData({"View":previousPage[1] + " " + previousPage[2],"Item":"","Action":"Open"}); 
}

function onDeviceResume(){
	then = new Date();
}

function disenrollUser(){
    disenroll("disenroll");
}

function sendUserData(){
    sendData("sendData");
}

function startFetch(isStudy){
    //console.log('+++++++++++start fetch called: ' + isStudy);
    var theHTML;
    
    if (isStudy == 0){
        theHTML = '';
    } else {
        theHTML = '<a href="javascript:sendUserData()" data-role="button" data-theme="z" data-icon="info">Send Research Data</a>' +
		'<a href="javascript:alertDialogDisenrollment()" data-role="button" data-theme="z" data-icon="info">Disenroll from Study</a>';
    }

    $('#researchMenuToggle').html(theHTML).trigger('create');
    
}

function getCurrentPage() {
   var base = 'www';//Cut off in Path,
   var result = '';
   if(location.hash) //Parse Hash
       result = location.hash.substring(1);
   else
       result = location.pathname;
   var path = jQuery.mobile.path.parseUrl(result).pathname;
   var indexPosition = path.indexOf(base);
   if(indexPosition > -1)
       path = path.substring(path.indexOf(base)+base.length+1);
   indexPosition = path.indexOf('&');
   if(indexPosition > -1) { //Parse Query String to sub Page
       // var bar = jQuery('.ui-header', jQuery.mobile.activePage);
       // var subPage = 'Nested-List ' + jQuery('.ui-title', bar).html();
       // path = path.substring(0,indexPosition) + ' ' + subPage;
	   path = path.replace("&ui-state=", " ");
   }
   return path;
}

function clearData(){
    localStorage.clear();
}

/*
function flurryToggle(){ 

    if (flurrySetting == 1 || flurrySetting == null){
        var flurryNo = '<option value="0" id="flurryNo">No</option>'; 
        var flurryYes = '<option value="1" id="flurryYes" selected="selected">Yes</option>';
    } else {
        var flurryNo = '<option value="0" id="flurryNo" selected="selected">No</option>'; 
        var flurryYes = '<option value="1" id="flurryYes">Yes</option>';
    } 
    
    //var flurryNo = '<option value="0" id="flurryNo" ' + selected + '>No</option>'; 
    //var flurryYes = '<option value="1" id="flurryYes" ' + selected + '>Yes</option>';
    
    $('#flurryToggle').html('<div data-role="fieldcontain">' + 
                        '<label for="flurryPluginButton">Send anonymous data</label>' +
                        '<select name="flurryPluginButton" id="flurryPluginButton" data-role="slider" data-mini="true" data-theme="z">' +
                        flurryNo + 
                        flurryYes + 
                        '</select> ' +
                        '</div> ').trigger('create');
}
*/

function mainFooter(){
    $('#footerID').html('<div data-role="navbar" >' + 
                        '<ul>'  + 
                        '<li><a href="#toolListPage" data-theme="z" data-icon="grid">Tools</a></li>' +
                        '<li><a href="settings.html" data-theme="z" data-icon="gear">Settings</a></li>' +
                        '</ul></div>').trigger('create');
    //console.log('tool list called');
}

function createTopicList() {

    var listHtml = "";
    var selectedFavorites = localStorage.getItem('favorites');
    var path = jQuery.mobile.path.parseUrl(location.pathname).pathname;
    var dir = path.substring(path.indexOf(''), path.lastIndexOf('/'));

    if ( jQuery.isArray(selectedFavorites) ) {
        selectedFavorites = selectedFavorites.sort();
    }
    else {
        selectedFavorites = [];
    }

    if (selectedFavorites.length > 0) {
        listHtml = listHtml + "<speak>Category: </speak><li data-role='list-divider' data-theme='z'>Favorites</li><speak> contains the following links:</speak>";
    
        for (var i in selectedFavorites)
        {
            var module = selectedFavorites[i];
            var moduleDescription = module_list[module];
            
            // if we can't find moduleDescription, then we must have a bad element in faves.  get rid of it!
            if (moduleDescription == undefined) {
                selectedFavorites.splice(i, 1);
                localStorage.setItem('favorites', selectedFavorites);
                continue;
            }
            var enabled = localStorage.getItem('pref_' + module + '_enabled');
            if (enabled === false || enabled === "false" ) {
                enabled = false;
            } 
            else {
                enabled = true; // yes, undefined defaults to true.
            }
            if (enabled){
                listHtml = listHtml + "<li>" +
                        "<a href='modules/" + module + "/four.html'>" +
                       // "<img src='modules/" + module + "/module.png' class='ui-li-thumb'/>" +
                        "<img src='" + dir + "/modules/" + module + "/module.png' class='ui-li-thumb'/>" +
                        "<h3 class='ui-li-heading'>" + moduleDescription + "</h3><speak>.</speak>" +
                    "</a>" +
                        "</li>";
            } else {
                listHtml = listHtml + "<!--" + module + " hidden --->";
            }
        }

        // if we had favorites, we'll need a separate header for other topics.
        listHtml = listHtml + "<speak>Category: </speak><li data-role='list-divider' data-theme='z'>Other Topics </li><speak> contains the following links:</speak>";
    }
    
    // If the user has favorited every module then don't bother populating the unfavorited
    // modules as there aren't any.
    if (selectedFavorites.length < keys(module_list).length ) 
    {
        var sortedKeys = keys(module_list).sort();
    
        for (var i in sortedKeys)
        {
            var module = sortedKeys[i];
            var enabled = localStorage.getItem('pref_' + module + '_enabled');
            if (enabled === false || enabled === "false" ) {
                enabled = false;
            } 
            else {
                enabled = true; // yes, undefined defaults to true.
            }
            //console.log(module + " = " + enabled);
            if (enabled && selectedFavorites.indexOf(module) === -1) {
                var moduleDescription = module_list[module];
                listHtml = listHtml + "<li>" +
                    "<a href='modules/" + module + "/four.html'>" +
                    "<img src='" + dir + "/modules/" + module + "/module.png' class='ui-li-thumb'/>" +
                    "<h3 class='ui-li-heading'>" + moduleDescription + "</h3>" +
                    "</a>" +
                    "</li>";
            }
        }
    }
    $('.topic-list').html('<ul data-role="listview" id="subject" data-theme="z">' + listHtml + '</ul>').trigger('create');
}

function createToolList() {
    var listHtml = "";
    var sortedKeys = keys(tool_list).sort();

    for (var i in sortedKeys)
    {
        var tool = sortedKeys[i];
        
            if (enabled === false || enabled === "false" ) {
                enabled = false;
            } 
            else {
                enabled = true; // yes, undefined defaults to true.
            }
        console.log("Tool enabled?", tool, enabled);
        if (enabled) {
            var toolDescription = tool_list[tool];
            listHtml = listHtml + '<li>' +
                '<a href="tools/' + tool + '/index.html">' + 
                '<h3 class="ui-li-heading">' + toolDescription + '</h3>' +
                '</a>' +
                '</li>';
        }
    }
    //console.log(listHtml);
    $('.tool-list').html('<ul data-role="listview" id="subjectTools"  style="margin-top: 0em !important; margin-bottom: 0em !important;">' + listHtml + '</ul>').trigger('create');
}

/*
 * Given a json file containing an array and a domElement, randomly choose an array element 
 * and replace the domElement's innerHtml with the results. This function also ensures the element
 * isn't the same as the one most recently chosen.
 */
function rotateMessage(jsonFile, domElement) {
    // look to see if json data is already loaded.
    var messageData = $(domElement).data('messageData');
    if (messageData == undefined) {
        $.getJSON(jsonFile, function (data) {
            //console.log('Loaded ' + jsonFile);
            messageData = data;
            $(domElement).data('messageData', messageData);
            // this getJSON function seems to complete after the calling function completes.
            // so... make sure you leave this next call inside the function.
            doRotateMessage(messageData, domElement); 
        });
    } 
    else {
        doRotateMessage(messageData, domElement);
    }
}

/*
 * Given an array of messages, randomly choose an array element 
 * and replace the domElement's innerHtml with the results.
 * This function also ensures the element isn't the same as the one most recently chosen.
 * "do..." because it actually does the work of rotateMessage above. 
 */
function doRotateMessage(messageData, domElement){
    // check for a previous message, so we don't duplicate
    var lastIndx = $(domElement).data('messageIndx');
    // now get a new message
    var indx;
    do {
        indx = Math.floor(Math.random() * messageData.length);
        if (indx == lastIndx) {
            //console.log("Duplicate message avoided.");
        }
    } while (indx == lastIndx);
    // and set the element
    //console.log('Message index: ' + indx + ' (was ' + lastIndx + ')');
    $(domElement).html(messageData[indx]);
    $(domElement).trigger('update');
    // update the index so we don't duplicate this one next time.
    $(domElement).data('messageIndx', indx);
}

/**
 *  add seconds=xx to a domElement and have this automatically start a countdown in the element.
 * */
function startCountdown(domElement) {
    var seconds = $(domElement).data('seconds');
    if (seconds == null) {
        //console.log('No seconds attribute on ' + $(domElement).prop('id'));
    }
    else {
        startCountdown(domElement, seconds);
    }
}

/** Start a countdown timer on a domElement, replacing the html with time left. */
function startCountdown(domElement, seconds) {
    $(domElement).stopTime();
    $(domElement).html(formatTime(seconds));
    $(domElement).everyTime('1s', function(t) {
        var remaining = seconds - t;
        var display = formatTime(remaining);
        $(domElement).html(display).trigger('update');
    }, seconds);
}

/** Reset a countdown timer on a domElement, replacing the html with 0:00.  */
function resetCountdown(domElement) {
    $(domElement).stopTime();
    $(domElement).html(formatTime(0));
}

/** Make a number of seconds look pretty, in the mm:ss format. */
function formatTime(seconds) {
    var minutesPart = Math.floor(seconds / 60);
    var secondsPart = seconds % 60; 
    var display = minutesPart + ':' + (secondsPart<10?'0':'') + secondsPart;    
    return display;
}

/**
 * Return the keys from an associative array.  Remember that associative arrays really hoover in javascript.  This
 * provides some relief, e.g., you can get the array's length by keys(array).length.
 * (I noticed recently that there's a .keys method that has somewhat recently been defined. We should investigate. -ca)
 * @param associativeArray
 * @returns {Array}
 */
function keys(associativeArray) {
    var keys = [];
    for (var key in associativeArray) {
        keys.push(key);
    }
    return keys;
}

/**
 * Score a form full of radio buttons by summing all the radio values.
 * It assumes that all radio's are required to be completed and that they are all wrapped in fieldsets.
 * Throws an error if any items are incomplete.
 * @param formName
 * @returns {Number}
 */
function scoreRadioForm(formName) {
    var total = 0;
    var numChecked = 0;
    $(formName + " input[type='radio']:checked").each(function (index) {
        // add up each checked radio button.
        total = total + Number($(this).val());
        numChecked = numChecked + 1;
    });
    var numItems = $(formName).find('fieldset').length;
    
    //console.log('score: ' + total);
    //console.log('#checked: ' + numChecked + '/' + numItems);
    
    if (numChecked < numItems ) {
        console.log('All form items are required, but not all items were completed.');
        throw 'Please make a selection on each question';
    }
    return total;
}

function alertDialog(pageText, headerText, back) {
    if (headerText == null) {
        headerText = "LifeArmor";
    }
    if(back == null || back == 0) {
        back = 1;
    }
    else {
        back = Math.abs(back);
    }
    
    $.mobile.changePage( '../../dialog.html' , { role: 'dialog'});

    $('#dialog').live('pageshow', function(event, ui){          
        $('#dialog h1').text(headerText);
        $('#dialog-text').html(pageText);
               //console.log('PAGE TEXT: ' + pageText);
        $('#dialog-close').attr('href', 'javascript:history.go(-' + back + ');');
     });
}

function alertDialogDisenrollment() {
    $.mobile.changePage( 'dialogYesNo.html' , { role: 'dialog'});

    $('#dialog').live('pageshow', function(event, ui){          
        $('#dialog h1').text('Study Disenrollment');
        $('#dialog-text').html('This action will permanently delete your current useage log, and disenroll you from the study. Would you like to continue\?');
               //console.log('PAGE TEXT: ' + pageText);
        $('#dialog-yes').attr('href', 'javascript:disenrollUser();history.go(-1);');
        $('#dialog-no').attr('href', 'javascript:history.go(-1);');
     });
}

/*
 *
 * LifeArmor
 *
 * Copyright Â© 2009-2012 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright Â© 2009-2012 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 *
 */

var devicePlatform = '';
$(document).bind("mobileinit", function() {

     (function( $, undefined ) {
          $.mobile.page.prototype.options.backBtnText  = "Back";
          $.mobile.page.prototype.options.addBackBtnFooter   = true;
          $.mobile.page.prototype.options.backBtnTheme = null;
          $.mobile.page.prototype.options.headerTheme  = "a";
          $.mobile.page.prototype.options.footerTheme  = "a";
          $.mobile.page.prototype.options.contentTheme = null;
          $( ":jqmData(role='page'), :jqmData(role='dialog')" ).live( "pagecreate", function( e ) {                                                      
             var $page = $( this ),
             o = $page.data( "page" ).options,
             pageTheme = o.theme;
             $( ":jqmData(role='header'), :jqmData(role='footer'), :jqmData(role='content')", this ).each(function() {
                  var $this = $( this ),
                  role = $this.jqmData( "role" ),
                  theme = $this.jqmData( "theme" ),
                  $headeranchors,
                  leftbtn,
                  rightbtn,
                  backBtn,
                  toolBtn,
                  newBtn;
                  
                  $this.addClass( "ui-" + role );	
                  
                  //apply theming and markup modifications to page,header,content,footer
                  if ( role === "header" || role === "footer" ) {
                  
                  var thisTheme = theme || ( role === "footer" ? o.headerTheme : o.footerTheme ) || pageTheme;
                  
                  $this
                  //add theme class
                  .addClass( "ui-bar-" + thisTheme )
                  // Add ARIA role
                  .attr( "role", role === "footer" ? "banner" : "contentinfo" );
                  
                  // Right,left buttons
                  $headeranchors	= $this.children( "a" );
                  leftbtn	= $headeranchors.hasClass( "ui-btn-left" );
                  rightbtn = $headeranchors.hasClass( "ui-btn-right" );
                  
                  leftbtn = leftbtn || $headeranchors.eq( 0 ).not( ".ui-btn-right" ).addClass( "ui-btn-left" ).length;
                  
                  rightbtn = rightbtn || $headeranchors.eq( 1 ).addClass( "ui-btn-right" ).length;
                  
                  // Auto-add back btn on pages beyond first view
                  if ( o.addBackBtnFooter && 
                      role === "footer" &&
                      $( ".ui-page" ).length > 1 &&
                      $this.jqmData( "url" ) !== $.mobile.path.stripHash( location.hash )
                      ) {
                  
                  backBtn = $("<a href='' data-rel='back' data-"+ $.mobile.ns +" data-"+ $.mobile.ns +"icon='arrow-l'>"+ o.backBtnText +"</a>" )
                  .attr( "data-"+ $.mobile.ns +"theme", o.backBtnTheme || thisTheme )
                  .prependTo( $this ); 
                  }
                   
                  if ( o.addBackBtnFooter && 
                          role === "footer" &&
                          $('div').hasClass('interactive-message')) {
                      $newBtn = $( '<div data-role="navbar"><ul><li><button class="interactive-rotate-button" data-icon="refresh" data-position="fixed" data-theme="a">New Suggestion</button></li></ul></div>' )
                      .attr( "data-"+ $.mobile.ns +"theme", o.backBtnTheme || thisTheme )
                      .prependTo( $this );
                      } 
                  } 
                  });
             });
      })( jQuery );

	$.mobile.defaultPageTransition = 'none'; // Turn off the transitions for all page animations
	$.mobile.defaultDialogTransition  = 'none'; // Turn off the transitions for all dialog animations
	$.mobile.pushStateEnabled = false;
    $.mobile.selectmenu.prototype.options.nativeMenu = false;
});                 

function onDeviceReady() {
    //console.log("Device Ready in LifeArmor init called");
    devicePlatform = device.platform;
	//window.plugins.flurry.init();
	
	//Load Analytics
	if(!window.plugins) {
	    window.plugins = {};
	}

	//if (!window.plugins.flurry) {
	//    window.plugins.flurry = new init();
	//}
}



/**
 * Extend the Storage object to assume everything going in and out will be stored and retrieved 
 * using JSON.parse and JSON.stringify.  Works like a charm... (I hope!) -ca
 * adapted from //http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
 * @param key
 * @param value
*/

Storage.prototype._setItem = Storage.prototype.setItem;
Storage.prototype.setItem = function(key, value){
	var json = JSON.stringify(value);
	//console.log('Storage.setItem("' +  key + '": "' + json + '")');
	this._setItem(key, json);
};

Storage.prototype._getItem = Storage.prototype.getItem;
Storage.prototype.getItem = function(key) {  
	try {
		var json = this._getItem(key);
		console.log('Storage.getItem("' +  key + '") = ' + json);
		return JSON.parse(json);
	}
	catch(e) {
		value = this._getItem(key);
		console.log('Storage.getItem failed to retrieve or parse JSON.  Returning: ' + value);
		return value;
	}
}; 




/*
 *
 * LifeArmor
 *
 * Copyright Â© 2009-2012 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright Â© 2009-2012 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 *
 */

console.log('Device: ' + devicePlatform);
console.log('videos.js called');
function displayPlaylist(playlistId) 
{
	try 
	{
		var html = '<div class="message">Loading...</div>';
		$('#video-list').html(html);
		
		BCMAPI.token = "aEKaJd8fSOxJHDP_akYJVkjXLywOcC8jSESi13ZrmdY0VVI6r7FDEQ.."; //ad.org
		BCMAPI.callback = "parsePlaylist";
		BCMAPI.find("find_playlist_by_id", 
		{
			"playlist_id": playlistId,
			"playlist_fields":"name,videos",
			"video_fields":"FLVURL,name,shortDescription,thumbnailURL,videoFullLength",
			"media_delivery":"http"				
		} );
	}
	catch (err) 
	{
		console.log("ERROR", err);
		var html = '<div class="error">Viewing videos requires a network connection.</div>';
		$('#video-list').html(html);
	}
}

function parsePlaylist (playlist) {
	//console.log("PARSING", playlist);
	var list = $('#video-list');
	if (playlist != null && playlist.error === undefined && playlist.videos != null && playlist.videos.length > 0) {
		var html = "";
        var setVideoSrc = "";
        var vidURL = "";
        var setOnClick = "";
        var vidName= "";
        var setVideoName ="";
		//console.log("Parsing video list");
		//console.log(playlist);
        
		$.each(playlist.videos, function(key, val) {
			if (val.videoFullLength.videoContainer == "MP4") 
			{
				//console.log("Adding video to list.", key, val);
			    vidURL = "'" + val.FLVURL + "'";
	            videoName = "'" + val.name + "'";
	            setVideoSrc = "(videoSrc=" + vidURL + "); ";
	            setVideoSrcMobile = "playVideo(" + videoName + "," + vidURL + "); ";
	            setVideoName = "(videoName=" + videoName + "); ";
	            setOnClick = 'onclick="' + setVideoSrc + setVideoName + 'return true;"';
	            setOnClickMobile = 'onclick="' + setVideoSrcMobile + '"';
	               
               if (devicePlatform == "Android" || devicePlatform == "iOS")
			   {
					//html += '<li><a href="' + val.FLVURL + '"><img src="' + val.thumbnailURL + '" class="ui-li-thumb video-thumb"/><div><h3 class="ui-li-heading">' + val.name + '</h3><p>' + val.shortDescription + '</p></div></a></li>';
					html += '<li><a href="#" ' + setOnClickMobile + '><img src="' + val.thumbnailURL + '" class="ui-li-thumb video-thumb"/><div><h3 class="ui-li-heading">' + val.name + '</h3><p>' + val.shortDescription + '</p></div></a></li>';
                   //html += '<li><a href="#" onclick="'window.plugins.videoPlayer.play("http://brightcove.vo.llnwd.net/pd16/media/1041122098001/1041122098001_1125427800001_Depression---03-Guilt-compilation.mp4?pubId=1041122098001&videoId=1125397186001"); return true;'"><img src="' + val.thumbnailURL + '" class="ui-li-thumb video-thumb"/><div><h3 class="ui-li-heading">' + val.name + '</h3><p>' + val.shortDescription + '</p></div></a></li>';
			   }
			   else 
			   {          
					html += '<li><a href="../player.html"' + setOnClick + '><img src="' + val.thumbnailURL + '" class="ui-li-thumb video-thumb"/><div><h3 class="ui-li-heading">' + val.name + '</h3><p>' + val.shortDescription + '</p></div></a></li>';
			   }
		   }
			else
			{
				console.log("Skipping non-MP4 video.", key, val);
			}
		});
		//What if playlist isn't empty, but has no mp4 vids?  (e.g. all flv)
		$(list).empty().append(html).listview('refresh');
	}
	else {
		console.log("Empty Playlist.");
		var html = '<div class="error">Videos for this topic could not be retrieved.</div>';
		$(list).empty().append(html);
	}
}

/*
 * 
 * LifeArmor
 * 
 * Copyright © 2009-2012 United States Government as represented by 
 * the Chief Information Officer of the National Center for Telehealth 
 * and Technology. All Rights Reserved.
 * 
 * Copyright © 2009-2012 Contributors. All Rights Reserved. 
 * 
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE, 
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN 
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT 
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY"). 
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN 
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR 
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES, 
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED 
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE 
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 * 
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email 
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 * 
 */
$('#time-out-page').live('pageshow', function(event) {
    $('#time-out-page .reset-timer').bind('click', function() {
        startCountdown($('#time-out-page .clock'), 300);
    });

    $('#time-out-page .interactive-rotate-button').bind("click", function (event) {
        $('#timer-group').show();
        $("#message").html('').removeClass('interactive-instruct').addClass('interactive-message');
        rotateMessage('data.json', $("#message"));
        $('#time-out-page .interactive-rotate-button .ui-btn-text ').html('New Suggestion');
        event.stopPropagation();  // don't let the live handler do this one.
        //resetCountdown($('#time-out-page .clock'));
        $('#time-out-page .clock').stopTime();
        $('#time-out-page .clock').html(formatTime(0));
    });


    $('#time-out-page #timer-1').bind("click", function () {
        startCountdown($('#time-out-page .clock'), 60);
    });
    $('#time-out-page #timer-5').bind("click", function () {
        startCountdown($('#time-out-page .clock'), 300);
    });
    $('#time-out-page #timer-10').bind("click", function () {
        startCountdown($('#time-out-page .clock'), 600);
    });
    $('#time-out-page #timer-30').bind("click", function () {
        startCountdown($('#time-out-page .clock'), 1800);
    });
    
});



$('#seek-support-page').live('pageshow', function(event) {

        $('#seek-support-contacts').empty();
        $('#seek-support-contacts').append('<div class="message">Loading...</div>');
        
        var options = new ContactFindOptions();
        options.multiple = true;
        //TODO: be aware of iOS quirks with displayName.  see phonegap docs.
        var fields = ["id", "displayName", "phoneNumbers"];
        console.log(navigator.contacts);
        if (navigator.contacts == null) {
            console.log('contacts not supported on this device');
            $("#setup_button").hide();
            $('#seek-support-contacts').html('<div class="error">Your device does not support contact retrieval.</div>');
        }
        else {
            console.log ('retrieving contacts');
            if ($("#setup_button:hidden")) {
                $("#setup_button").show();
            }
            navigator.contacts.find(fields, onSeekSupportContactsFindSuccess, onSeekSupportContactsFindError, options);
        }


    function onSeekSupportContactsFindSuccess(contacts) {
        console.log('Contracts retrieved: ' + contacts.length);
        var selectedContactsJson = localStorage.getItem("seekSupportNetwork");
        
        var selectedContacts = null;
        if (selectedContactsJson != null) {
            selectedContacts = JSON.parse(selectedContactsJson);
        }
        else {
            selectedContacts = new Array();
        }
        console.log(selectedContacts.length + ' contacts parsed from localstorage: ' + selectedContactsJson);
        $('#seek-support-contacts').empty();
        
        $('<div class="ui-grid-a"/>').appendTo('#seek-support-contacts');
        $.each(contacts, function(index, contact) {
            var html = '';
            var contactIdNum = parseInt(contact.id);
            if (jQuery.inArray(contactIdNum, selectedContacts) >= 0 && contact.displayName != null && contact.phoneNumbers != null) {
                
                    html = html + '<div class="ui-block-a">' + contact.displayName + '</div>';
                    html = html + '<div class="ui-block-b">';
                    $.each(contact.phoneNumbers, function (i2, phoneNumber) {
                        html = html + '<a href="tel: ' + phoneNumber.value + '" data-role="button">' + phoneNumber.type + '</a>';
                    });
                    html = html + '<br/></div>';

                $(html).appendTo('#seek-support-contacts div.ui-grid-a');
            }
        });

        $('#seek-support-contacts').trigger('create');  // add jqm styling to all created elements
    }

    function onSeekSupportContactsFindError(err) {
        alert('Error: ' + err);
    }
});


$('#seek-support-setup-page').live('pageshow', function(event) {
      $('#seek-support-setup-contacts').empty();
      $('#seek-support-setup-contacts').append('<div class="message">Loading...</div>');  
      
      var options = new ContactFindOptions();
      options.multiple = true;
      var fields = ["id", "displayName", "phoneNumbers"];
      console.log(navigator.contacts);
      if (navigator.contacts == null) {
          console.log('contacts not supported on this device');
          $('#seek-support-setup-contacts').html('<div class="error">Your device does not support contact retrieval.</div>');
          $('#seek-support-setup-submit').button('disable');  //TODO: would actually like to hide, but can't find jqm method to do so easily.  more investigation.
      }
      else {
          console.log ('retrieving contacts');
          navigator.contacts.find(fields, onSeekSupportSetupContactsFindSuccess, onSeekSupportSetupContactsFindError, options);
      }

  function onSeekSupportSetupContactsFindSuccess(contacts) {
      console.log('Contracts retrieved: ' + contacts.length);
      if (contacts.length == 0) {
          alert('You do not have any contacts in your phone book, or your device does not support contact retrieval.');
      }
      else {
          var selectedContactsJson = localStorage.getItem("seekSupportNetwork");
          
          var selectedContacts = null;
          if (selectedContactsJson != null) {
              selectedContacts = JSON.parse(selectedContactsJson);
          }
          else {
              selectedContacts = new Array();
          }
          console.log(selectedContacts.length + ' contacts parsed from localstorage: ' + selectedContactsJson);
          $('#seek-support-setup-contacts').empty();

          $.each(contacts, function(index, contact) {
              console.log('contact.id: ' + contact.id + ", name: " + contact.displayName);
              if (contact.displayName != null && contact.phoneNumbers != null)    {
                  var contactIdNum = parseInt(contact.id);
                  var checkIt;
                  if (jQuery.inArray(contactIdNum, selectedContacts) >= 0) {
                      checkIt = "checked";
                      console.log ("Contact with phone, previously selected.");
                  }
                  else {
                      checkIt = "";
                      console.log ("Contact with phone.");
                  }
                  var nodeBase = 'seek-support-setup-contacts-';  // if you change this, change the substring line, far below
                  var nodeName = nodeBase + contactIdNum;
                  var nodeHtml = '<input type="checkbox" name="' + nodeName + '" id="' + nodeName + '" ' + checkIt + ' />' +
                                      '<label for="' + nodeName + '" id=' + nodeName + '-lbl">' + contact.displayName + '</label>';
                  $('#seek-support-setup-contacts').append(nodeHtml);
              }
          });
          $('#seek-support-setup-contacts').trigger('create');
      }
  }
  function onSeekSupportSetupContactsFindError(err) {
      //TODO: probably don't need to give technical error back to user without addl niceness
      alert('Error: ' + err);
  }

  $('#seek-support-setup-submit').bind('tap', function (event) {
      var checked = new Array();
      $('input[type="checkbox"]').each(function () {
          if ( $(this).prop('checked') ) {
              var contactId = $(this).prop('name').substring(28); //length of nodeBase, above.
              console.log(contactId + "   checked");
              checked.push(parseInt(contactId));
          }
      });
      var checkedJson =  JSON.stringify(checked);
      console.log(checkedJson);
      localStorage.setItem("seekSupportNetwork", checkedJson);
  });
});


$('#rid-r-page').live('pageshow', function(event) {
    $('#rid-r-page .reset-timer').bind('click', function() {
        $('#go_on').show();
        $('#rid-r-page .reset-timer').parent().find('.ui-btn-text').text("Reset Timer");
        startCountdown($('#rid-r-page .clock'), 30);
    });

    // stop timers on any anchor tap
    $('#rid-r-page a').bind('click', function() {
        $('#rid-r-page .clock').stopTime();
    });

    $('#rid-r-page').bind('pagehide', function() {
        $('#rid-r-page .clock').stopTime();
    });
});





$('#breathe_intervention').live('pageshow', function(event) {

    var audio_inhale = null;
    var audio_hold = null;
    var audio_exhale = null;
    var StateEnum = {"NONE": 0, "BREATHE": 3};
    var state = StateEnum.NONE;
    var counter = null;

    document.addEventListener("pause", onApplicationPause, false);
    
    $( '#breathe_intervention' ).bind( 'pagebeforeshow',function(event){
        buttonPress(StateEnum.NONE);
    });

    $( '#breathe_intervention' ).bind( 'pagebeforehide',function(event){
        buttonPress(StateEnum.NONE);
    });
    
    $("#breatheButton").bind('click', function() {
        buttonPress(StateEnum.BREATHE);
    });

    function setAButtonText(txt){
        $('#breatheButton .ui-btn-text').text(txt);
    }

    function onApplicationPause() {
       // console.log('STATE: ' + state);
        buttonPress(StateEnum.NONE);
    };

    function buttonPress(targetState) {
       // console.log("Button press: " + targetState);
        if (targetState == state)
        {
            targetState = StateEnum.NONE;
        }
        changeState(targetState);
    };

    function changeState(newState) {
        var oldState = state;
        state = newState;
        
        console.log("State change, " + oldState + " to " + state);

        //clean up from the old state
        switch (oldState)
        {
        case StateEnum.NONE:
            break;
        case StateEnum.BREATHE:
            if (audio_inhale)
            {
                audio_inhale.stop();
            }
            if (audio_hold)
            {
                audio_hold.stop();
            }
            if (audio_exhale)
            {
                audio_exhale.stop();
            }
            $(this).stopTime("breathe");
            setAButtonText("Start");
            $("#instruction").text("");
            $("#counter").text("");
            $("#orb_green").css({'-webkit-backface-visibility':'hidden','visibility': 'hidden'});
            $("#orb_yellow_full").css({'webkitTransform':'scale(2)', '-webkit-backface-visibility':'hidden', 'visibility': 'hidden'});
            $("#orb_red").css({'webkitTransform':'scale(2)', '-webkit-backface-visibility':'hidden', 'visibility': 'hidden'});
            $("#orb_yellow_empty").css('visibility', 'hidden');
            break;
        }
        switch (state)
        {
        case StateEnum.NONE:
            break;
        case StateEnum.BREATHE:
            setAButtonText("Stop");
            runBreathe();
            break;  
        }
    };

    function runBreathe(){
        var path = jQuery.mobile.path.parseUrl(location.pathname).pathname;
        var dir = path.substring(path.indexOf(''), path.lastIndexOf('/'));
        
            audio_inhale = new Media( dir + "/tools/relax_breathe/audio/Alford/inhale.mp3" );
            audio_hold   = new Media( dir + "/tools/relax_breathe/audio/Alford/hold.mp3" );
            audio_exhale = new Media( dir + "/tools/relax_breathe/audio/Alford/exhale.mp3" );
                    
        counter = -4;

        $(this).stopTime();
        $(this).everyTime(1200, "breathe", function () {
            var instruction = $("#instruction");
            
            function updateCounter(msg){  
                $('.counter').html(msg);  
            }
            
            
            if (counter < 0) {
                updateCounter(Math.abs(counter));
            } else {
                var fourcount = counter % 4 + 1;
                updateCounter(fourcount);
            }
            
            switch (counter)
            {
            case -4:
                $(orb_green).css("visibility", "visible");

                $(instruction).text("Ready");
                break;
            case -3:
                $(instruction).text("Relax");
                break;
            case -2:
                $(instruction).text("Exhale");
                break;
            case -1:
                $(instruction).text("Begin");
                break;
            case 0:
                $("#orb_yellow_full").css('visibility', 'hidden');
                
                $(instruction).text("Inhale");
                console.log('before green transition');
                $("#orb_green").css({'visibility': 'visible', '-webkit-transition-timing-function':'-webkit-transform ease-in-out', '-webkit-transform':'scale(2)','-webkit-transition-duration':'4000ms'});
                //$('#orb_green').animate({'visibility': 'visible', '-webkit-transition':'-webkit-transform 4s ease-in-out', '-webkit-transform':'scale(2)'});
                 if (audio_inhale) 
                    {
                        audio_inhale.play();
                    }
                break;
            case 4:
                $(instruction).text("Hold");
                // hide green orb and scale back to 1.
                $("#orb_green").css({'visibility': 'hidden', 'webkitTransition':'', 'webkitTransform': 'scale(1)'});
                // show yellow orb at scale 2.
                console.log('before yellow transition');
                $("#orb_yellow_full").css({'visibility': 'visible', 'webkitTransform': 'scale(2)'});
                if (audio_hold) 
                {
                    audio_hold.play();
                }
                break;
            case 8:
                $(instruction).text("Exhale");
                // show red orb and shrink
                console.log('before red transition');
                $("#orb_red").css({'visibility': 'visible', 'webkitTransition':'-webkit-transform 4s ease-in-out', 'webkitTransform':'scale(1)'});
                
                // hide yellow orb
                $("#orb_yellow_full").css('visibility', 'hidden');
                if (audio_exhale) 
                {
                    audio_exhale.play();
                }                   
                break;
            case 12:
                $(instruction).text("Hold");
                // hide red orb and scale back to 2.
                console.log('before red transition');
                $("#orb_red").css({'visibility': 'hidden', 'webkitTransition':'', 'webkitTransform': 'scale(2)'});
                // show yellow orb at scale 1.
                $("#orb_yellow_full").css({'visibility': 'visible', 'webkitTransform': 'scale(1)'});
                if (audio_hold)
                {
                    audio_hold.play();
                }
                break;
            case 15:
                //reset to beginning.
                counter = -1;
                break;
            }
            counter++; 
        });
    };
    

    
    
    
    
    
    
    
    
    
    
    
    
    /**
     * Adds a layer of control over PhoneGap's Media object, including the ability
     * to automatically re-acquire media handles that have been released.
     * 
     * @param source
     *            String containing path to source media.
     * @returns boolean indicating successful object creation
     */
    var MediaWrapper = function (source, successCallback, errorCallback)
    {
        if (!(this instanceof arguments.callee)) {  
            return new MediaWrapper(source, successCallback, errorCallback);  
        }   

        this.source = source;
        this.shortSource = source.match("[^/]*/[^/]*$");
        this.playing = false;
        this.media = null;
        this.successCall = successCallback;
        this.errorCall = errorCallback;
        this.muted = false;
       // console.log("MediaWrapper created. [" + this.shortSource + "]");
    };

    MediaWrapper.prototype.play = function ()
    {
        if (!this.isMuted()) // If not muted
        {
            this.playing = true;
            
            // stop any media stopping timers that might be running.  See .stopSafe() for details.
            $(this).stopTime(this.source);
            
            this.acquire();  //ensure we actually have the media handle.
            if (this.media != null)
            {
               // console.log("MediaWrapper playing.  [" + this.shortSource + "]");
                this.media.play();
            } else
            {
              //  console.log("MediaWrapper could not acquire media:  [" + this.shortSource + "]");
            }
        }
    };

    MediaWrapper.prototype.setMuted = function (muted)
    {
        this.muted = muted;
    };

    MediaWrapper.prototype.isMuted = function ()
    {
        return this.muted;
    };

    MediaWrapper.prototype.pause = function ()
    {
       // console.log("MediaWrapper pausing. [" + this.shortSource + "]");
        if (this.media && this.playing)
        {
            this.media.pause();
            this.playing = false;
        }
    };
    MediaWrapper.prototype.togglePause = function ()
    {
       // console.log("MediaWrapper toggle pause. [" + this.shortSource + "]");
        if (this.media)
        {
            if (this.playing)
            {
                this.pause();
            } else
            {
                this.play();
            }
        } else
        {
            this.play();
        }
    };

    MediaWrapper.prototype.stop = function ()
    {
        //console.log("MediaWrapper stopping. [" + this.shortSource + "]");
        if (this.media)
        {
            this.media.stop();
            this.playing = false;
        }
    };
    MediaWrapper.prototype.stopSafe = function ()
    {
       // console.log("MediaWrapper safe stopping. [" + this.shortSource + "]");
        if (this.media)
        {
            var _this = this;  //get around this pointing to Window inside setTimeout.
            $(this).oneTime(700, this.source ,function ()
            {
                _this.stopUnsafe();
            });
        }
    };

    MediaWrapper.prototype.release = function ()
    {
        //console.log("MediaWrapper releasing resource. [" + this.shortSource + "]");
        if (this.media)
        {
            this.media.stop();
            this.media.release();
            this.media = null;
            this.playing = false;
        }
    };
    MediaWrapper.prototype.acquire = function ()
    {
        if (typeof device != 'undefined')
        {
            if (this.media == null) // media not created yet.
            {
               // console.log("MediaWrapper loading media. [" + this.shortSource + "]");
                this.media = new Media(this.source, this.mediaCompleted(),
                    function (code, message)
                    {
                        //console.log("Error " + code + " (" + message + ") occurred in Media. [" + this.shortSource + "]");
                    }
                );
            } else
            { 
                //console.log("MediaWrapper already has media handle. [" + this.shortSource + "]");
            }
        } else
        {
            //console.log("MediaWrapper attempted to load media on a non-mobile device [" + this.shortSource + "]");
        }
    };

    MediaWrapper.prototype.mediaCompleted = function ()
    {
        this.playing = false;
        //console.log("Callback reports MediaWrapper completed. [" + this.shortSource + "]");
        if (this.successCall)
        {
            this.successCall();
        }
    };

    MediaWrapper.prototype.mediaError = function ()
    {
        this.playing = false;
        //console.error("Callback reports MediaWrapper error occurred. [" + this.shortSource + "]");
        if (this.errorCall)
        {
            this.errorCall();
        }
    };
});

/*
 *
 * LifeArmor
 *
 * Copyright Â© 2009-2012 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright Â© 2009-2012 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 *
 */

/**
 * Constructor
 */
var videoPlayer = 
{
	play: function (success, fail, info)
	{
		return cordova.exec( success, fail, "VideoPlayer", "playVideo", info );
	}
};

function playVideo(name, url)
{
    videoPlayer.play(
        function(result)
		{
			console.log('Success playVideo : ' + result);
        },
        function(result)
		{
			console.log('Error playVideo : ' + result);
        },
        [url, name]);
}

/*
 * 
 * LifeArmor
 * 
 * Copyright © 2009-2012 United States Government as represented by 
 * the Chief Information Officer of the National Center for Telehealth 
 * and Technology. All Rights Reserved.
 * 
 * Copyright © 2009-2012 Contributors. All Rights Reserved. 
 * 
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE, 
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN 
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT 
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY"). 
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN 
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR 
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES, 
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED 
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE 
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 * 
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email 
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 * 
 */
// accessibility page reading automatically provided by accessibility.js
       var low = null;
       var med = null;
       var total = null;
       var numChecked = null;
       var results = null;
       //var minNumChecked = null;
       
       var alcohol_drugs_array = new Array();
       var begin = null;
       var drug = null;
       var end = null;
       var alcohol_pressed = false;
       var cannabis_pressed = false;
       var cocaine_pressed = false;
       var amphetamine_pressed = false;
       var sedatives_pressed = false;
       var other_drug_use_pressed = false;
       var show_2_alcohol = false, 
           show_2_cannabis = false, 
           show_2_cocaine = false, 
           show_2_amphetamine = false,
           show_2_sedatives = false;
           show_2_other_drug_use = false;
       var notAtAll = "Not at all";
       var severalDays = "Several days";
       var moreHalfDays = "More than half the days";
       var nEveryDay = "Nearly every day";
       var daily = "Daily or almost daily";

       var noNever = "No, Never";
       var yPast3Mo = "Yes, in the past 3 month";
       var yNPast3Mo = "Yes, but not in the past 3 months";

       var never = "Never";
       var onceOrTwice = "Once or twice";
       var monthly = "Monthly";
       var weekly = "Weekly";
       

/* reset all radio buttons */
function reset() {
    $('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}

function checked(name,id, errorArray)
{
    var number;
    var number_as_string;
    
    // Checked
    errorArray.pop();
    // You found a checked element so it's no longer an error
    choice_selected = name;
    number_as_string = choice_selected.match(/\d+/);
    number = parseInt(number_as_string[0], 10);
    if ($("#error" + number).length > 0)
    {
        $("#error" + number).remove();
    }
    return choice_selected;
}

function unchecked(name,id, errorArray, choice_selected)
{
    var number;
    var number_as_string;
    
    if (errorArray.indexOf(id) === -1) {
        // We check every individual element to see if it's not checked.
        // If it's not, we list it as an error.
        if (choice_selected !== name)
        {
            if (errorArray.indexOf(name) === -1)
            {
                errorArray.push(name);
                number_as_string = name.match(/\d+/);
                // Don't add 'Invalid answer' twice if it's already there
                number = parseInt(number_as_string[0], 10);
                
                // Add the span saying Required question if it doesn't already exist
                // Change the label to red
                if ($("#error" + number).length <= 0)
                {
                    $("#" + name + "_fieldcontain .ui-controlgroup-label")
                    .after("<span id=error" + number+ " style='color:red'>Required question</span>").trigger('create');
                }
            }
        }
    }
}

function add_text(id, drug_of_choice)
{
    var new_text;
    new_text = $(id).text();
        
    // Need to replace all occurrences of [substance]
    new_text = new_text.replace('[substance]', drug_of_choice);
    $(id).text(new_text);
}
/* scoring */
function score(total) {
    if (total == null) {
        return null;
    }
    else if (total <= low) {
        return "low";
    }
    else if (total <= med) {
        return "med";
    }
    else {
        return "high";
    }
}

function checkAssessment(numChecked, minNumChecked, localStorageItemName){
    //e.preventDefault();
    var total = 0;
    var numChecked = 0;
    $("input[type='radio']:checked").each(function () {
        // add up each checked radio button.
        total = total + Number($(this).val());
        numChecked = numChecked + 1;
    });

    var errorArray = new Array();
    var choice_selected = null;
    var name = null;
    var id = null;
    $("input[type='radio']").each(function () {
        
        name = $(this).attr("name");
        id = $(this).attr("id");
        
        // add up each checked radio button.
        if ($(this).attr("checked"))
        {
            choice_selected = checked(name, id, errorArray);
        }
        else
        {
            // Unchecked
            unchecked(name, id, errorArray, choice_selected);
        }
    });
    if (numChecked < minNumChecked) {
        console.log('not done');
        $(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
        return false;
    }
    
    var last = localStorage.getItem(localStorageItemName);
    var key = score(last) + "-" + score(total);
    localStorage.setItem(localStorageItemName, total);

    $.getJSON("assessment.json", function (data, status, jqHXR) {
        if (status =='success'){
            alertDialog(data[key], 'Results', 2);
            return true;
        }
     });
	var currentpage = getCurrentPage().split("/");
    logUserData({"Duration":time,"View":currentpage[1] + " assessment","Item":"","Action":"Completed","Value":total});
    reset();
}
$('#work_adjustment-assessment').live('pageshow', function(event) {
    $("#work_adjustment_assessment-submit").bind("tap", function (e) {
        e.preventDefault();
        var low = 24;
        var med = 34;
        checkAssessment(0, 10, "work_adjustmentAssessLastScore");
    }); 
});
$('#tobacco-assessment').live('pageshow', function(event) {
    $("#tobacco-assessment-submit").bind("tap", function (e) {
        e.preventDefault();
        var low = 4;
        var med = 6;
        checkAssessment(0, 6, "tobaccoAssessLastScore");
    }); 
});
$('#stigma_assessment').live('pageshow', function(event) {
    $("#stigma_assessment-submit").bind("tap", function (e) {
        e.preventDefault();
        var low = 22;
        var med = 32;
        checkAssessment(0, 10, "stigmaAssessLastScore");
    }); 
});
$('#spirituality_assessment').live('pageshow', function(event) {
    $("#spirituality_assessment-submit").bind("tap", function (e) {
        e.preventDefault();
        var low = 9;
        var med = 10;
        checkAssessment(0, 15, "spiritualityAssessLastScore");
    }); 
});
$('#sleep_assessment').live('pageshow', function(event) {
    $("#sleep_assessment-submit").bind("tap", function (e) {
        e.preventDefault();
        var low = 0;
        var med = 2;
        checkAssessment(0, 10, "sleepAssessLastScore");
    }); 
});
$('#resilience_assessment').live('pageshow', function(event) {
    $("#resilience_assessment-submit").bind("tap", function (e) {
        e.preventDefault();
        var low = 49;
        var med = 70;
        checkAssessment(0, 22, "resilienceAssessLastScore");
    }); 
});
$('#ptsd-assessment').live('pageshow', function(event) {
    $("#ptsd-assessment-submit").bind("tap", function (e) {
        e.preventDefault();
        var low = 33;
        var med = 49;
        checkAssessment(0, 17, "ptsdAssessLastScore");
    }); 
});
$('#pys_injury_assessment').live('pageshow', function(event) {
    $("#pys_injury_assessment-submit").bind("tap", function (e) {
        e.preventDefault();
        var low = 49;
        var med = 70;
        checkAssessment(0, 0, "physicalInjuryAssessLastScore");
    }); 
});
$('#mst-assessment').live('pageshow', function(event) {
    $("#mst_assessment-submit").bind("tap", function (e) {
        e.preventDefault();
        var low = 33;
        var med = 43;
        checkAssessment(0, 0, "milSexTraumaAssessLastScore");
    }); 
});
$('#mtbi-assessment_mtbi').live('pageshow', function(event) {
    $("#mtbi-assessment-submit").bind("tap", function (e) {
        e.preventDefault();
        var low = 59;
        var med = 114;
        checkAssessment(0, 13, "mtbiAssessLastScore");
    }); 
});
$('#life_stress-assessment').live('pageshow', function(event) {
    $("#life_stress_assessment-submit").bind("tap", function (e) {
        e.preventDefault();
        var low = 10;
        var med = 25;
        checkAssessment(0, 10, "lifeStressAssessLastScore");
    }); 
});
$('#fwk_assessment').live('pageshow', function(event) {
    $("#fwk_assessment-submit").bind("tap", function (e) {
        e.preventDefault();
        var low = 60;
        var med = 73;
        checkAssessment(0, 16, "fwkAssessLastScore");
    }); 
});

$('#families_friendships_assessment').live('pageshow', function(event) {
    $("#families_friendships_assessment-submit").bind("tap", function (e) {
        e.preventDefault();
        var low = 15;
        var med = 18;
        checkAssessment(0, 6, "mtbiAssessLastScore");
    }); 
});

$('#depression_assessment').live('pageshow', function(event) {
    $("#depression_assessment-submit").bind("tap", function (e) {
        e.preventDefault();
        var low = 4;
        var med = 15;
        checkAssessment(0, 9, "depressionAssessLastScore");
    }); 
});

$('#anxiety_assessment').live('pageshow', function(event) {
    $("#anxiety_assessment-submit").bind("tap", function (e) {
        e.preventDefault();
        var low = 39;
        var med = 59;
        checkAssessment(0, 16, "anxietyAssessLastScore");
    }); 
});

$('#anger_assessment').live('pageshow', function(event) {
    $("#anger_assessment-submit").bind("tap", function (e) {
        e.preventDefault();
        var low = 22;
        var med = 42;
        checkAssessment(0, 6, "angerAssessLastScore");
    }); 
});

$('#alcohol_assessment').live('pageshow', function(event) {
    $("#2_legend").hide();
    /* Replace the word substance with the current drug chosen*/

    $("#alcohol_drugs-assessment-submit").bind("tap", function (e) {
        e.preventDefault();
        var total = 0;
        var alcohol_score = 0;
        var cannabis_score = 0;
        var cocaine_score = 0;
        var amphetamine_score = 0;
        var sedatives_score = 0;
        var other_drug_use_score = 0;
        
        var numChecked = 0;
        var question1_use_alcohol = false;
        var question1_use_cannabis = false;
        var question1_use_cocaine = false;
        var question1_use_amphetamine = false;
        var question1_use_sedatives = false;
        var question1_use_other_drug_use = false;
        
        /*********************************/
        // For questions 3-7
        var alcohol_used_2 = false;
        var cannabis_used_2 = false;
        var cocaine_used_2 = false;
        var amphetamine_used_2 = false;
        var sedatives_used_2 = false;
        var other_drug_use_used_2 = false;
        
        /*********************************/
        
        $("input[type='radio']:checked").each(function () {
            // add up each checked radio button.
            // Questions 1a - 1f will be used to check if scoring is needed for the later questions
            
            switch($(this).attr('name'))
            {
            case '1a':
                if ($(this).val() === '1')
                {
                    question1_use_alcohol = true;
                }
                break;
            case '1b':
                if ($(this).val() === '1')
                {
                    question1_use_cannabis = true;
                }
                break;
            case '1c':
                if ($(this).val() === '1')
                {
                    question1_use_cocaine = true;
                }
                break;
            case '1d':
                if ($(this).val() === '1')
                {
                    question1_use_amphetamine = true;
                }
                break;
            case '1e':
                if ($(this).val() === '1')
                {
                    question1_use_sedatives = true;
                }
                break;
            case '1f':
                if ($(this).val() === '1')
                {
                    question1_use_other_drug_use = true;
                }
                break;
            /************************************************************************************/
            // If you have answers yes for question 1 and the answer is greater than zero 
            // then proceed to questions 3-7 for scoring.
            // This is done for all of the alcohol and drugs
            /************************************************************************************/
                
            case '2sub_alcohol':
                if ($(this).val() > '0' && question1_use_alcohol)
                {
                    alcohol_used_2 = true;
                    alcohol_score += Number($(this).val());
                }
                break;
            case '3_alcohol':
            case '4_alcohol':
            case '5_alcohol':
            case '6_alcohol':
            case '7_alcohol':
                if (alcohol_used_2)
                {
                    alcohol_score += Number($(this).val());
                }
                break;
                
            case '2sub_cannabis':
                if ($(this).val() > '0' && question1_use_cannabis)
                {
                    cannabis_used_2 = true;
                    cannabis_score += Number($(this).val());
                }
                break;
            case '3_cannabis':
            case '4_cannabis':
            case '5_cannabis':
            case '6_cannabis':
            case '7_cannabis':
                if (cannabis_used_2)
                {
                    cannabis_score += Number($(this).val());
                }
                break;
                
            case '2sub_cocaine':
                if ($(this).val() > '0' && question1_use_cocaine)
                {
                    cocaine_used_2 = true;
                    cocaine_score += Number($(this).val());
                }
                break;
            case '3_cocaine':
            case '4_cocaine':
            case '5_cocaine':
            case '6_cocaine':
            case '7_cocaine':
                if (cocaine_used_2)
                {
                    cocaine_score += Number($(this).val());
                }
                break;
                
            
            case '2sub_amphetamine':
                if ($(this).val() > '0' && question1_use_amphetamine)
                {
                    amphetamine_used_2 = true;
                    amphetamine_score += Number($(this).val());
                }
                break;
            case '3_amphetamine':
            case '4_amphetamine':
            case '5_amphetamine':
            case '6_amphetamine':
            case '7_amphetamine':
                if (amphetamine_used_2)
                {
                    amphetamine_score += Number($(this).val());
                }
                break;
                
            case '2sub_sedatives':
                if ($(this).val() > '0' && question1_use_sedatives)
                {
                    sedatives_used_2 = true;
                    sedatives_score += Number($(this).val());
                }
                break;
            case '3_sedatives':
            case '4_sedatives':
            case '5_sedatives':
            case '6_sedatives':
            case '7_sedatives':
                if (sedatives_used_2)
                {
                    sedatives_score += Number($(this).val());
                }
                break;
                
            case '2sub_other_drug_use':
                if ($(this).val() > '0' && question1_use_other_drug_use)
                {
                    other_drug_use_used_2 = true;
                    other_drug_use_score += Number($(this).val());
                }
                break;
            case '3_other_drug_use':
            case '4_other_drug_use':
            case '5_other_drug_use':
            case '6_other_drug_use':
            case '7_other_drug_use':
                if (other_drug_use_used_2)
                {
                    other_drug_use_score += Number($(this).val());
                }
                break;
            }
            numChecked = numChecked + 1;
        });

        // We start at 6 because if nothing is selected or it's all set to no for question 1,
        // we need to make sure that those 6 have been selected
        
        var value_to_be_checked = 6;
        /***************************************************************************/
        // Add up all of the alcohol and drug scores
        /***************************************************************************/
        if (question1_use_alcohol)
        {
            if (!alcohol_used_2)
            {
                value_to_be_checked += 3;
            }
            else if (alcohol_used_2)
            {
                    
                value_to_be_checked += 6;
            }
        }
        if (question1_use_cannabis)
        {
            if (!cannabis_used_2)
            {
                value_to_be_checked += 3;
            }
            else if (cannabis_used_2)
            {
                value_to_be_checked += 6;
            }
        }
        if (question1_use_cocaine)
        {
            if (!cocaine_used_2)
            {
                value_to_be_checked += 3;
            }
            else if (cocaine_used_2)
            {
                value_to_be_checked += 6;
            }
        }
        if (question1_use_amphetamine)
        {
            if (!amphetamine_used_2)
            {
                value_to_be_checked += 3;
            }
            else if (amphetamine_used_2)
            {
                value_to_be_checked += 6;
            }
        }
        
        var errorArray = new Array();
        var choice_selected = null;
        var name = null;
        var id = null;
        
        $("input[type='radio']").each(function () {
            name = $(this).attr("name");
            id = $(this).attr("id");
            
            // add up each checked radio button.
            if ($(this).attr("checked"))
            {
                choice_selected = checked(name, id, errorArray);
            }
            else
            {
                // Unchecked
                unchecked(name, id, errorArray, choice_selected);
            }
        });
        
        if (numChecked < value_to_be_checked) {
            console.log('not done');
            $(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
            return false;
        }

        var key;
        // Figure out based on the alcohol and drug score what feedback to show
        if (    alcohol_score <= 10 && 
                (cannabis_score + cocaine_score +
                amphetamine_score + sedatives_score +
                other_drug_use_score <= 3)) 
        {
            key = 'feedback1';
        } 
        else if (   alcohol_score >= 11 && alcohol_score <= 26 
                && (cannabis_score + cocaine_score +
                amphetamine_score + sedatives_score +
                other_drug_use_score <= 3))
        {
            key = 'feedback2';
        }
        else if (   alcohol_score >= 27 && alcohol_score <= 38 
                && (cannabis_score + cocaine_score +
                amphetamine_score + sedatives_score +
                other_drug_use_score <= 3))
        {
            key = 'feedback3';
        }
        else if (
                    alcohol_score <= 10 && cannabis_score  < 27 && cocaine_score < 27 && 
                    amphetamine_score < 27 && sedatives_score < 27 && other_drug_use_score < 27 && 
                    ((cannabis_score >= 4 && cannabis_score <= 26) || 
                    (cocaine_score >= 4 && cocaine_score <= 26) || 
                    (amphetamine_score >= 4 && amphetamine_score <= 26) || 
                    (sedatives_score >= 4 && sedatives_score <= 26) ||
                    (other_drug_use_score >= 4 && other_drug_use_score <= 26)))
        {
            key = 'feedback4';
        }
        else if (alcohol_score <= 10 && 
                ((cannabis_score >= 27 && cannabis_score <= 38) || 
                (cocaine_score >= 27 && cocaine_score <= 38) || 
                (amphetamine_score >= 27 && amphetamine_score <= 38) || 
                (sedatives_score >= 27 && sedatives_score <= 38) ||
                (other_drug_use_score >= 27 && other_drug_use_score <= 38)))
        {
            key = 'feedback5';
        }
        else if (
                alcohol_score >= 11 && alcohol_score >= 26 && cannabis_score  < 27 && cocaine_score < 27 && 
                amphetamine_score < 27 && sedatives_score < 27 && other_drug_use_score < 27 && 
                ((cannabis_score >= 4 && cannabis_score <= 26) || 
                (cocaine_score >= 4 && cocaine_score <= 26) || 
                (amphetamine_score >= 4 && amphetamine_score <= 26) || 
                (sedatives_score >= 4 && sedatives_score <= 26) ||
                (other_drug_use_score >= 4 && other_drug_use_score <= 26)))
        {
            key = 'feedback6';
        }
        else if ((alcohol_score >= 27 && alcohol_score <= 38 &&
                (cannabis_score >= 3 || 
                cocaine_score >= 3 || 
                amphetamine_score >= 3 || 
                sedatives_score >= 3 ||
                other_drug_use_score >= 3)) ||
                
                (alcohol_score >= 10 && (cannabis_score > 26 || 
                        cocaine_score > 26 || 
                        amphetamine_score > 26 || 
                        sedatives_score > 26 ||
                        other_drug_use_score > 26)))
        {
            key = 'feedback7';
        }
        //displayed scored results
        $.getJSON("assessment.json", function (data, status, jqHXR) {
            if (status =='success'){
                alertDialog(data[key], 'Results', 2);
            }
         }); 
		var currentpage = getCurrentPage().split("/");
		logUserData({"Duration":time,
					 "View":currentpage[1] + " assessment",
					 "Item":"",
					 "Action":"Completed",
					 "Value":total,
					 "Data":{"Alcohol Score":alcohol_score,"Cannabis Score":cannabis_score,"Cocaine Score":cocaine_score,"Amphetamine Score":amphetamine_score,"Sedatives Score":sedatives_score,"Other Drugs Score":other_drug_use_score}});
    });

    


    $("input[name='1a']").bind("change", function() {
        var drug_of_choice = 'Alcohol (beer, wine, spirits, etc.)';
        if ($(this).val() === '1') {
            if ($("#2:hidden"))
            {
                $("#2_legend").show();
            }
            
            /*
             * If alcohol hasn't been chosen already then create question 2 
             * */
            if (!show_2_alcohol)
            {
                $("#2_legend").after(
                '<div data-role="fieldcontain" id="2_alcohol">' +
                    '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                        '<legend>a.  Alcohol (beer, wine, spirits, etc.)</legend>' +
                    '<input type="radio" name="2sub_alcohol" id="alcohol_drugs20sub1" value="0"/><label for="alcohol_drugs20sub1">' + notAtAll  + '</label>' +
                    '<input type="radio" name="2sub_alcohol" id="alcohol_drugs21sub1" value="2"/><label for="alcohol_drugs21sub1">' + severalDays + '</label>' +
                    '<input type="radio" name="2sub_alcohol" id="alcohol_drugs22sub1" value="3"/><label for="alcohol_drugs22sub1">' + moreHalfDays + '</label>' +
                    '<input type="radio" name="2sub_alcohol" id="alcohol_drugs23sub1" value="4"/><label for="alcohol_drugs23sub1">' + nEveryDay + '</label>' +
                    '<input type="radio" name="2sub_alcohol" id="alcohol_drugs24sub1" value="6"/><label for="alcohol_drugs24sub1">' + daily + '</label>' +
                    
                '</fieldset>' +
                
                '</div>');
                
                $("#2_alcohol").trigger('create');
                
                // Find the correct area to place question 6 about alcohol
                var placement;
                // Drugs after alcohol
                if ($("#2_other_drug_use").length > 0)
                {
                    placement = "#2_other_drug_use";
                }
                else if ($("#2_sedatives").length > 0)
                {
                    placement = "#2_sedatives";
                }
                else if ($("#2_amphetamine").length > 0)
                {
                    placement = "#2_amphetamine";
                }
                else if ($("#2_cocaine_fieldcontain").length > 0)
                {
                    placement = "#2_cocaine_fieldcontain";
                }
                else if ($("#2_cannabis_fieldcontain").length > 0)
                {
                    placement = "#2_cannabis_fieldcontain";
                }
                else
                {
                    placement = "#2_alcohol";
                }
                
                $(placement).after(
                '<div data-role="fieldcontain" id="6_alcohol_fieldcontain">' +
                    '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                        '<div id="concern_a">6 a.   Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
                    '<input type="radio" name="6_alcohol" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + '</label>' +
                    '<input type="radio" name="6_alcohol" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + '</label>' +
                    '<input type="radio" name="6_alcohol" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + '</label>' +
                    
                '</fieldset>' +
                '</div>');
                // Add the css to the question
                $("#6_alcohol_fieldcontain").trigger('create');
                
                // Find the correct area to place question 7 about alcohol
                add_text('#concern_a', drug_of_choice);
                
                if ($("#6f_alcohol").length > 0)
                {
                    placement = "#6f_alcohol";
                }
                else if ($("#6e_alcohol").length > 0)
                {
                    placement = "#6e_alcohol";
                }
                else if ($("#6d_alcohol").length > 0)
                {
                    placement = "#6d_alcohol";
                }
                else if ($("#6_cocaine").length > 0)
                {
                    placement = "#6_cocaine";
                }
                else if ($("#6_cannabis_fieldcontain").length > 0)
                {
                    placement = "#6_cannabis_fieldcontain";
                }
                else if ($("#6_alcohol_fieldcontain").length > 0)
                {
                    placement = "#6_alcohol_fieldcontain";
                }
                
                $(placement).after('<div data-role="fieldcontain" id="7_alcohol_fieldcontain">' +
                    '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                        '<div id="control_a">7 a.   Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
                    '<input type="radio" name="7_alcohol" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + noNever + '</label>' +
                    '<input type="radio" name="7_alcohol" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
                    '<input type="radio" name="7_alcohol" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +
                '</fieldset>' +
                '</div>');
                // Add the css to the question
                $("#7_alcohol_fieldcontain").trigger('create');
                
                add_text('#control_a', drug_of_choice);
                show_2_alcohol = true;
            }
        } 
        else
        {
            /* Remove the dynamically created text, allow the button to be pressed again, 
             * and hide the legend if necessary
            */
            alcohol_pressed = false;
            $("#2_alcohol").remove();
            $("#3a_alcohol_fieldcontain").remove();
            $("#4a_alcohol_fieldcontain").remove();
            $("#5a_alcohol_fieldcontain").remove();
            $("#6_alcohol_fieldcontain").remove();
            $("#7_alcohol_fieldcontain").remove();
            
            show_2_alcohol = false;
            if (    !show_2_alcohol && !show_2_cannabis && 
                    !show_2_cocaine && !show_2_amphetamine &&
                    !show_2_sedatives && !show_2_other_drug_use)
            {
                $("#2_legend").hide();
                
            }
        }
    });

    $(":input[name='1b']").bind("change", function(event, ui) {
        var drug_of_choice = 'Cannabis (marijuana, pot, grass, hash, etc.)'; 
        if ($(this).val() === '1') {
            if ($("#2:hidden"))
            {
                $("#2_legend").show();
            }
            
            /*
             * If cannabis hasn't been chosen already then create question 2 
             * */
            if (!show_2_cannabis)
            {
                var placement;
                if ($("#2_alcohol").length > 0)
                {
                    placement = "#2_alcohol";
                }
                else
                {
                    placement = "#2_legend";
                }
                $(placement).after(
                '<div data-role="fieldcontain" id="2_cannabis_fieldcontain">' +
                    '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                        '<legend>b.  Cannabis (marijuana, pot, grass, hash, etc.)</legend>' +
                        '<input type="radio" name="2sub_cannabis" id="alcohol_drugs20sub2" value="0"/><label for="alcohol_drugs20sub2">' + never + '</label>' + 
                        '<input type="radio" name="2sub_cannabis" id="alcohol_drugs21sub2" value="2"/><label for="alcohol_drugs21sub2">' + onceOrTwice + '</label>' +
                        '<input type="radio" name="2sub_cannabis" id="alcohol_drugs22sub2" value="3"/><label for="alcohol_drugs22sub2">' + monthly + '</label>' +
                        '<input type="radio" name="2sub_cannabis" id="alcohol_drugs23sub2" value="4"/><label for="alcohol_drugs23sub2">' + weekly + '</label>' +
                        '<input type="radio" name="2sub_cannabis" id="alcohol_drugs24sub2" value="6"/><label for="alcohol_drugs24sub2">' + daily + '</label>' +
                        
                    '</fieldset>' +
                    '</div>');
                
                $("#2_cannabis_fieldcontain").trigger('create');
                // Drugs before cannabis
                if ($("#6_alcohol_fieldcontain").length > 0)
                {
                    placement = "#6_alcohol_fieldcontain";
                }
                // Drugs after cannabis
                else if ($("#2_other_drug_use").length > 0)
                {
                    placement = "#2_other_drug_use";
                }
                else if ($("#2_sedatives").length > 0)
                {
                    placement = "#2_sedatives";
                }
                else if ($("#2_amphetamine").length > 0)
                {
                    placement = "#2_amphetamine";
                }
                else if ($("#2_cocaine_fieldcontain").length > 0)
                {
                    placement = "#2_cocaine_fieldcontain";
                }
                else
                {
                    placement = "#2_cannabis_fieldcontain";
                }
                
                $(placement).after(
                '<div data-role="fieldcontain" id="6_cannabis_fieldcontain">' +
                    '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                        '<div id="concern_b">6 b.   Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
                    '<input type="radio" name="6_cannabis" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + ' </label>' +
                    '<input type="radio" name="6_cannabis" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + ' </label>' +
                    '<input type="radio" name="6_cannabis" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + ' </label>' +

                '</fieldset>' +
                '</div>');
                
                // Add the css to the question
                $("#6_cannabis_fieldcontain").trigger('create');
                
                add_text('#concern_b', drug_of_choice);
                
                // Figure out where to put question 7b
                if ($("#7_alcohol_fieldcontain").length > 0)
                {
                    placement = "#7_alcohol_fieldcontain";
                }
                else if ($("#6f_alcohol").length > 0)
                {
                    placement = "#6f_alcohol";
                }
                else if ($("#6e_alcohol").length > 0)
                {
                    placement = "#6e_alcohol";
                }
                else if ($("#6d_alcohol").length > 0)
                {
                    placement = "#6d_alcohol";
                }
                else if ($("#6_cocaine").length > 0)
                {
                    placement = "#6_cocaine";
                }
                else if ($("#6_cannabis_fieldcontain").length > 0)
                {
                    placement = "#6_cannabis_fieldcontain";
                }
                
                $(placement).after('<div data-role="fieldcontain" id="7b_alcohol">' +
                    '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                        '<div id="control_b">7 b.   Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
                    '<input type="radio" name="7_cannabis" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + noNever + '</label>' +
                    '<input type="radio" name="7_cannabis" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
                    '<input type="radio" name="7_cannabis" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +

                '</fieldset>' +
                '</div>');
                
                // Add the css to the question
                $("#7b_alcohol").trigger('create');
                
                add_text('#control_b', drug_of_choice);
                
                show_2_cannabis = true;
            }
        } 
        else
        {
            /* Remove the dynamically created text, allow the button to be pressed again, 
             * and hide the legend if necessary
            */
            cannabis_pressed = false;
            $("#2_cannabis_fieldcontain").remove();
            $("#3b_cannabis_fieldcontain").remove();
            $("#4b_cannabis_fieldcontain").remove();
            $("#5b_amphetamine_fieldcontain").remove();
            $("#6_cannabis_fieldcontain").remove();
            $("#7b_alcohol").remove();
            show_2_cannabis = false;
            if (    !show_2_alcohol && !show_2_cannabis && 
                    !show_2_cocaine && !show_2_amphetamine &&
                    !show_2_sedatives && !show_2_other_drug_use)
            {
                $("#2_legend").hide();
                
            }
        }
    });

    $(":input[name='1c']").bind("change", function(event, ui) {
        var drug_of_choice = 'Cocaine (coke, crack, etc.)'; 
        
        if ($(this).val() === '1') {
            if ($("#2:hidden"))
            {
                $("#2_legend").show();
            }
            
            /*
             * If cocaine hasn't been chosen already then create question 2 
             * */
            if (!show_2_cocaine)
            {
                var placement;
                if ($("#2_cannabis_fieldcontain").length > 0)
                {
                    placement = "#2_cannabis_fieldcontain";
                }
                else if ($("#2_alcohol").length > 0)
                {
                    placement = "#2_alcohol";
                }
                else
                {
                    placement = "#2_legend";
                }
                $(placement).after(
                '<div data-role="fieldcontain" id="2_cocaine_fieldcontain">' +
                    '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                        '<legend>c.  Cocaine (coke, crack, etc.)</legend>' +
                        '<input type="radio" name="2sub_cocaine" id="alcohol_drugs20sub3" value="0"/><label for="alcohol_drugs20sub3">' + never + '</label>' + 
                        '<input type="radio" name="2sub_cocaine" id="alcohol_drugs21sub3" value="2"/><label for="alcohol_drugs21sub3">' + onceOrTwice + '</label>' +
                        '<input type="radio" name="2sub_cocaine" id="alcohol_drugs22sub3" value="3"/><label for="alcohol_drugs22sub3">' + monthly + '</label>' +
                        '<input type="radio" name="2sub_cocaine" id="alcohol_drugs23sub3" value="4"/><label for="alcohol_drugs23sub3">' + weekly + '</label>' +
                        '<input type="radio" name="2sub_cocaine" id="alcohol_drugs24sub3" value="6"/><label for="alcohol_drugs24sub3">' + daily + '</label>' +

                    '</fieldset>' +
                    '</div>');
                
                $("#2_cocaine_fieldcontain").trigger('create');
                
                // Figure out the correct placement
                // Drugs before cocaine
                if ($("#6_cannabis_fieldcontain").length > 0)
                {
                    placement = "#6_cannabis_fieldcontain";
                }
                else if ($("#6_alcohol").length > 0)
                {
                    placement = "#6_alcohol";
                }
                
                // Drugs after cocaine
                else if ($("#2_other_drug_use").length > 0)
                {
                    placement = "#2_other_drug_use";
                }
                else if ($("#2_sedatives").length > 0)
                {
                    placement = "#2_sedatives";
                }
                else if ($("#2_amphetamine").length > 0)
                {
                    placement = "#2_amphetamine";
                }
                else
                {
                    placement = "#2_cocaine_fieldcontain";
                }
                $(placement).after(
                '<div data-role="fieldcontain" id="6_cocaine">' +
                    '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                        '<div id="concern_c">6 c.   Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
                    '<input type="radio" name="6_cocaine" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + '</label>' +
                    '<input type="radio" name="6_cocaine" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + '</label>' +
                    '<input type="radio" name="6_cocaine" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + '</label>' +
                '</fieldset>' +
                '</div>');
                
                // Add the css to the question
                $("#6_cocaine").trigger('create');
                
                add_text('#concern_c', drug_of_choice);
                
                // Figure out the correct placement of question 7
                if ($("#7b_alcohol").length > 0)
                {
                    placement = "#7b_alcohol";
                }
                else if ($("#6f_alcohol").length > 0)
                {
                    placement = "#6f_alcohol";
                }
                else if ($("#6e_alcohol").length > 0)
                {
                    placement = "#6e_alcohol";
                }
                else if ($("#6d_alcohol").length > 0)
                {
                    placement = "#6d_alcohol";
                }
                else
                {
                    placement = "#6_cocaine";
                }
                
                $(placement).after('<div data-role="fieldcontain" id="7c_alcohol">' +
                    '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                        '<div id="control_c">7 c.   Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
                    '<input type="radio" name="7_cocaine" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + never + '</label>' +
                    '<input type="radio" name="7_cocaine" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
                    '<input type="radio" name="7_cocaine" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +
                '</fieldset>' +
                '</div>');
                
                $("#7c_alcohol").trigger('create');
                
                // Radio buttons 1-4 are pressed
                add_text('#control_c', drug_of_choice);
                
                show_2_cocaine = true;
            }
        } 
        else
        {
            /* Remove the dynamically created text, allow the button to be pressed again, 
             * and hide the legend if necessary
            */
            cocaine_pressed = false;
            $("#2_cocaine_fieldcontain").remove();
            $("#3c_cocaine_fieldcontain").remove();
            $("#4c_cocaine_fieldcontain").remove();
            $("#5c_cocaine_fieldcontain").remove();
            $("#6_cocaine").remove();
            $("#7c_alcohol").remove();
            show_2_cocaine = false;
            if (    !show_2_alcohol && !show_2_cannabis && 
                    !show_2_cocaine && !show_2_amphetamine &&
                    !show_2_sedatives && !show_2_other_drug_use)
            {
                $("#2_legend").hide();
            }
        }
    });

    $(":input[name='1d']").bind("change", function(event, ui) {
        var drug_of_choice = 'Amphetamine type stimulants (speed, diet pills, ecstasy, etc.)'; 
        if ($(this).val() === '1') {
            if ($("#2:hidden"))
            {
                $("#2_legend").show();
            }
            
            /*
             * If amphetamine hasn't been chosen already then create question 2 
             * */
            if (!show_2_amphetamine)
            {
                var placement;
                if ($("#2_cocaine_fieldcontain").length > 0)
                {
                    placement = "#2_cocaine_fieldcontain";
                }
                else if ($("#2_cannabis_fieldcontain").length > 0)
                {
                    placement = "#2_cannabis_fieldcontain";
                }
                else if ($("#2_alcohol").length > 0)
                {
                    placement = "#2_alcohol";
                }
                else
                {
                    placement = "#2_legend";
                }
                $(placement).after(
                        '<div data-role="fieldcontain" id="2_amphetamine">' +
                            '<fieldset data-role="controlgroup" class=likert1-5_alcohol>' +
                                '<legend>d.  Amphetamine type stimulants (speed, diet pills, ecstasy, etc.)</legend>' +
                                '<input type="radio" name="2sub_amphetamine" id="alcohol_drugs20sub4" value="0"/><label for="alcohol_drugs20sub4">' + never + '</label>' +
                                '<input type="radio" name="2sub_amphetamine" id="alcohol_drugs21sub4" value="2"/><label for="alcohol_drugs21sub4">' + onceOrTwice + '</label>' +
                                '<input type="radio" name="2sub_amphetamine" id="alcohol_drugs22sub4" value="3"/><label for="alcohol_drugs22sub4">' + monthly + '</label>' +
                                '<input type="radio" name="2sub_amphetamine" id="alcohol_drugs23sub4" value="4"/><label for="alcohol_drugs23sub4">' + weekly + '</label>' +
                                '<input type="radio" name="2sub_amphetamine" id="alcohol_drugs24sub4" value="6"/><label for="alcohol_drugs24sub4">' + daily + '</label>' +

                            '</fieldset>' +
                        '</div>');
                
                // Add the css to the question
                $("#2_amphetamine").trigger('create');
                
                // Figure out where to place question 6
                // Drugs before amphetamine
                if ($("#6_cocaine").length > 0)
                {
                    placement = "#6_cocaine";
                }
                else if ($("#6_cannabis_fieldcontain").length > 0)
                {
                    placement = "#6_cannabis_fieldcontain";
                }
                else if ($("#6_alcohol").length > 0)
                {
                    placement = "#6_alcohol";
                }
                
                // Drugs after amphetamine
                else if ($("#2_other_drug_use").length > 0)
                {
                    placement = "#2_other_drug_use";
                }
                else if ($("#2_sedatives").length > 0)
                {
                    placement = "#2_sedatives";
                }
                
                // No drugs present so make it after amphetamine in question 2
                else
                {
                    placement = "#2_amphetamine";
                }
                $(placement).after(
                '<div data-role="fieldcontain" id="6d_alcohol">' +
                    '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                        '<div id="concern_d">6 d.   Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
                    '<input type="radio" name="6_amphetamine" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + '</label>' +
                    '<input type="radio" name="6_amphetamine" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + '</label>' +
                    '<input type="radio" name="6_amphetamine" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + '</label>' +
                '</fieldset>' +
                '</div>');
                
                // Add the css to the question
                $("#6d_alcohol").trigger('create');
                
                add_text('#concern_d', drug_of_choice);
                
                // Figure out where to place question 7
                if ($("#7c_alcohol").length > 0)
                {
                    placement = "#7c_alcohol";
                }
                else if ($("#7b_alcohol").length > 0)
                {
                    placement = "#7b_alcohol";
                }
                else if ($("#7_alcohol_fieldcontain").length > 0)
                {
                    placement = "#7_alcohol_fieldcontain";
                }
                else if ($("#6f_alcohol").length > 0)
                {
                    placement = "#6f_alcohol";
                }
                else if ($("#6e_alcohol").length > 0)
                {
                    placement = "#6e_alcohol";
                }
                else if ($("#6d_alcohol").length > 0)
                {
                    placement = "#6d_alcohol";
                }
                else if ($("#6_cocaine").length > 0)
                {
                    placement = "#6_cocaine";
                }
                else if ($("#6_cannabis_fieldcontain").length > 0)
                {
                    placement = "#6_cannabis_fieldcontain";
                }
                else 
                {
                    placement = "#6_alcohol";
                }
                
                $(placement).after('<div data-role="fieldcontain" id="7d_alcohol">' +
                    '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                        '<div id="control_d">7 d.   Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
                    '<input type="radio" name="77_sedatives" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + noNever + '</label>' +
                    '<input type="radio" name="77_sedatives" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
                    '<input type="radio" name="77_sedatives" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +
                '</fieldset>' +
                '</div>');
                
                // Add the css to the question
                $("#7d_alcohol").trigger('create');
                
                add_text('#control_d', drug_of_choice);
                
                show_2_amphetamine = true;
            }
        } 
        else
        {
            /* Remove the dynamically created text, allow the button to be pressed again, 
             * and hide the legend if necessary
            */
            amphetamine_pressed = false;
            $("#2_amphetamine").remove();
            $("#3d_amphetamine_fieldcontain").remove();
            $("#4d_amphetamine_fieldcontain").remove();
            $("#5d_amphetamine_fieldcontain").remove();
            $("#6d_alcohol").remove();
            $("#7d_alcohol").remove();
            show_2_amphetamine = false;
            if (    !show_2_alcohol && !show_2_cannabis && 
                    !show_2_cocaine && !show_2_amphetamine &&
                    !show_2_sedatives && !show_2_other_drug_use)
            {
                $("#2_legend").hide();
            }
        }
    });

    $(":input[name='1e']").bind("change", function(event, ui) {
        var drug_of_choice = 'Sedatives or sleeping pills (Valium, Serapax, Rohypnol, Ambien, etc.)';
        if ($(this).val() === '1') {
            if ($("#2:hidden"))
            {
                $("#2_legend").show();
            }
            
            /*
             * If sedatives hasn't been chosen already then create question 2 
             * */
            if (!show_2_sedatives)
            {
                var placement;
                if ($("#2_amphetamine").length > 0)
                {
                    placement = "#2_amphetamine";
                }
                else if ($("#2_cocaine_fieldcontain").length > 0)
                {
                    placement = "#2_cocaine_fieldcontain";
                }
                else if ($("#2_cannabis_fieldcontain").length > 0)
                {
                    placement = "#2_cannabis_fieldcontain";
                }
                else if ($("#2_alcohol").length > 0)
                {
                    placement = "#2_alcohol";
                }
                else
                {
                    placement = "#2_legend";
                }
                $(placement).after(
                        '<div data-role="fieldcontain" id="2_sedatives">' +
                            '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                                '<legend>e.  Sedatives or sleeping pills (Valium, Serapax, Rohypnol, Ambien, etc.)</legend>' +
                                '<input type="radio" name="2sub_sedatives" id="alcohol_drugs20sub5" value="0"/><label for="alcohol_drugs20sub5">' + never + '</label>' +
                                '<input type="radio" name="2sub_sedatives" id="alcohol_drugs21sub5" value="2"/><label for="alcohol_drugs21sub5">' + onceOrTwice + '</label>' +
                                '<input type="radio" name="2sub_sedatives" id="alcohol_drugs22sub5" value="3"/><label for="alcohol_drugs22sub5">' + monthly + '</label>' +
                                '<input type="radio" name="2sub_sedatives" id="alcohol_drugs23sub5" value="4"/><label for="alcohol_drugs23sub5">' + weekly + '</label>' +
                                '<input type="radio" name="2sub_sedatives" id="alcohol_drugs24sub5" value="6"/><label for="alcohol_drugs24sub5">' + daily + '</label>' +

                            '</fieldset>' +
                        '</div>');
                
                // Add the css to the question
                $("#2_sedatives").trigger('create');
                
                // Figure out where to place question 6
                // Drugs before sedatives
                if ($("#6d_alcohol").length > 0)
                {
                    placement = "#6d_alcohol";
                }
                else if ($("#6_cocaine").length > 0)
                {
                    placement = "#6_cocaine";
                }
                else if ($("#6_cannabis_fieldcontain").length > 0)
                {
                    placement = "#6_cannabis_fieldcontain";
                }
                else if ($("#6_alcohol").length > 0)
                {
                    placement = "#6_alcohol";
                }
                
                // Drugs after sedatives
                else if ($("#2_other_drug_use").length > 0)
                {
                    placement = "#2_other_drug_use";
                }
                else
                {
                    placement = "#2_sedatives";
                }
                $(placement).after(
                '<div data-role="fieldcontain" id="6e_alcohol">' +
                    '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                        '<div id="concern_e">6 e.   Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
                    '<input type="radio" name="6_sedatives" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + '</label>' +
                    '<input type="radio" name="6_sedatives" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + '</label>' +
                    '<input type="radio" name="6_sedatives" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + '</label>' +
                '</fieldset>' +
                '</div>');
                
                // Add the css to the question
                $("#6e_alcohol").trigger('create');
                
                add_text('#concern_e', drug_of_choice);
                
                // Figure out where to place question 7
                if ($("#7d_alcohol").length > 0)
                {
                    placement = "#7d_alcohol";
                }
                else if ($("#7c_alcohol").length > 0)
                {
                    placement = "#7c_alcohol";
                }
                else if ($("#7b_alcohol").length > 0)
                {
                    placement = "#7b_alcohol";
                }
                else if ($("#7_alcohol_fieldcontain").length > 0)
                {
                    placement = "#7_alcohol_fieldcontain";
                }
                else if ($("#6f_alcohol").length > 0)
                {
                    placement = "#6f_alcohol";
                }
                else if ($("#6e_alcohol").length > 0)
                {
                    placement = "#6e_alcohol";
                }
                else if ($("#6d_alcohol").length > 0)
                {
                    placement = "#6d_alcohol";
                }
                else if ($("#6_cocaine").length > 0)
                {
                    placement = "#6_cocaine";
                }
                else if ($("#6_cannabis_fieldcontain").length > 0)
                {
                    placement = "#6_cannabis_fieldcontain";
                }
                else 
                {
                    placement = "#6_alcohol";
                }
                
                $(placement).after('<div data-role="fieldcontain" id="7e_alcohol">' +
                    '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                        '<div id="control_e">7 e.   Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
                    '<input type="radio" name="7_other_drug_use" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + noNever + '</label>' +
                    '<input type="radio" name="7_other_drug_use" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
                    '<input type="radio" name="7_other_drug_use" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +

                '</fieldset>' +
                '</div>');
                
                // Add the css to the question
                $("#7e_alcohol").trigger('create');
                
                add_text('#control_e', drug_of_choice);
                
                show_2_sedatives = true;
            }
        } 
        else
        {
            /* Remove the dynamically created text, allow the button to be pressed again, 
             * and hide the legend if necessary
            */
            sedatives_pressed = false;
            $("#2_sedatives").remove();
            $("#3e_sedatives_fieldcontain").remove();
            $("#4e_sedatives_fieldcontain").remove();
            $("#5e_sedatives_fieldcontain").remove();
            $("#6e_alcohol").remove();
            $("#7e_alcohol").remove();
            show_2_sedatives = false;
            if (    !show_2_alcohol && !show_2_cannabis && 
                    !show_2_cocaine && !show_2_amphetamine &&
                    !show_2_sedatives && !show_2_other_drug_use)
            {
                $("#2_legend").hide();
            }
        }
    });

    $(":input[name='1f']").bind("change", function(event, ui) {
        var drug_of_choice = 'Other drug use (inhalants, hallucinogens, opiods, etc.)'; 
        if ($(this).val() === '1') {
            if ($("#2:hidden"))
            {
                $("#2_legend").show();
            }
            
            /*
             * If other drug use hasn't been chosen already then create question 2 
             * */
            
            if (!show_2_other_drug_use)
            {
                var placement;
                if ($("#2_sedatives").length > 0)
                {
                    placement = "#2_sedatives";
                }
                else if ($("#2_amphetamine").length > 0)
                {
                    placement = "#2_amphetamine";
                }
                else if ($("#2_cocaine_fieldcontain").length > 0)
                {
                    placement = "#2_cocaine_fieldcontain";
                }
                else if ($("#2_cannabis_fieldcontain").length > 0)
                {
                    placement = "#2_cannabis_fieldcontain";
                }
                else if ($("#2_alcohol").length > 0)
                {
                    placement = "#2_alcohol";
                }
                else
                {
                    placement = "#2_legend";
                }
                $(placement).after(
                        '<div data-role="fieldcontain" id="2_other_drug_use">' +
                            '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                                '<legend>f.  Other drug use (inhalants, hallucinogens, opiods, etc.)</legend>' +
                                '<input type="radio" name="2sub_other_drug_use" id="alcohol_drugs20sub6" value="0"/><label for="alcohol_drugs20sub6">' + never + '</label>' +
                                '<input type="radio" name="2sub_other_drug_use" id="alcohol_drugs21sub6" value="2"/><label for="alcohol_drugs21sub6">' + onceOrTwice + '</label>' +
                                '<input type="radio" name="2sub_other_drug_use" id="alcohol_drugs22sub6" value="3"/><label for="alcohol_drugs22sub6">' + monthly + '</label>' +
                                '<input type="radio" name="2sub_other_drug_use" id="alcohol_drugs23sub6" value="4"/><label for="alcohol_drugs23sub6">' + weekly + '</label>' +
                                '<input type="radio" name="2sub_other_drug_use" id="alcohol_drugs24sub6" value="6"/><label for="alcohol_drugs24sub6">' + daily + '</label>' +
                            '</fieldset>' +
                        '</div>');
                
                $("#2_other_drug_use").trigger('create');
                
                // Figure out where to place question 7
                // Drugs before other drug use
                if ($("#6e_alcohol").length > 0)
                {
                    placement = "#6e_alcohol";
                }
                else if ($("#6d_alcohol").length > 0)
                {
                    placement = "#6d_alcohol";
                }
                else if ($("#6_cocaine").length > 0)
                {
                    placement = "#6_cocaine";
                }
                else if ($("#6_cannabis_fieldcontain").length > 0)
                {
                    placement = "#6_cannabis_fieldcontain";
                }
                else if ($("#6_alcohol").length > 0)
                {
                    placement = "#6_alcohol";
                }
                else
                {
                    placement = "#2_other_drug_use";
                }
                $(placement).after(
                '<div data-role="fieldcontain" id="6f_alcohol">' +
                    '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                        '<div id="concern_f">6 f.   Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
                    '<input type="radio" name="6f_alcohol_radio" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + '</label>' +
                    '<input type="radio" name="6f_alcohol_radio" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + '</label>' +
                    '<input type="radio" name="6f_alcohol_radio" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + '</label>' +
                '</fieldset>' +
                '</div>');
                
                // Add the css to the question
                $("#6f_alcohol").trigger('create');
                
                add_text('#concern_f', drug_of_choice);
                
                // Figure out where to place question 7
                if ($("#7e_alcohol").length > 0)
                {
                    placement = "#7e_alcohol";
                }
                else if ($("#7d_alcohol").length > 0)
                {
                    placement = "#7d_alcohol";
                }
                else if ($("#7c_alcohol").length > 0)
                {
                    placement = "#7c_alcohol";
                }
                else if ($("#7b_alcohol").length > 0)
                {
                    placement = "#7b_alcohol";
                }
                else if ($("#7_alcohol_fieldcontain").length > 0)
                {
                    placement = "#7_alcohol_fieldcontain";
                }
                else if ($("#6f_alcohol").length > 0)
                {
                    placement = "#6f_alcohol";
                }
                else if ($("#6e_alcohol").length > 0)
                {
                    placement = "#6e_alcohol";
                }
                else if ($("#6d_alcohol").length > 0)
                {
                    placement = "#6d_alcohol";
                }
                else if ($("#6_cocaine").length > 0)
                {
                    placement = "#6_cocaine";
                }
                else if ($("#6_cannabis_fieldcontain").length > 0)
                {
                    placement = "#6_cannabis_fieldcontain";
                }
                else 
                {
                    placement = "#6_alcohol";
                }
                
                $(placement).after('<div data-role="fieldcontain" id="7f_alcohol">' +
                    '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                        '<div id="control_f">7 f.   Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
                    '<input type="radio" name="7_other_drug_use" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + noNever + '</label>' +
                    '<input type="radio" name="7_other_drug_use" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
                    '<input type="radio" name="7_other_drug_use" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +

                '</fieldset>' +
                '</div>');
                
                // Add the css to the question
                $("#7f_alcohol").trigger('create');
                
                add_text('#control_f', drug_of_choice);
                
                show_2_other_drug_use = true;
            }
        } 
        else
        {
            /* Remove the dynamically created text, allow the other drug use button to be pressed again, 
             * and hide the legend if necessary
            */
            other_drug_use_pressed = false;
            $("#2_other_drug_use").remove();
            $("#3f_other_drug_use_fieldcontain").remove();
            $("#4f_other_drug_use_fieldcontain").remove();
            $("#5f_other_drug_use_fieldcontain").remove();
            $("#6f_alcohol").remove();
            $("#7f_alcohol").remove();
            show_2_other_drug_use = false;
            if (    !show_2_alcohol && !show_2_cannabis && 
                    !show_2_cocaine && !show_2_amphetamine &&
                    !show_2_sedatives && !show_2_other_drug_use)
            {
                $("#2_legend").hide();
            }
        }
    });

    /*************************************************************************************************/
    /*
     * 
     End of 1a - 1f  
     */
    /*************************************************************************************************/
    $(":input[name='2sub_alcohol']").live("change", function(event, ui) {
        var drug_of_choice = 'Alcohol (beer, wine, spirits, etc.)';
        if ($(this).val() === '0') {
            /* Remove the dynamically created text, allow the button to be pressed again */
            $("#3a_alcohol_fieldcontain").remove();
            $("#4a_alcohol_fieldcontain").remove();
            $("#5a_alcohol_fieldcontain").remove();
            alcohol_pressed = false;
        } 
        else
        {
            // Figure out where to place question 3, 4, and 5 for alcohol.
            if (!alcohol_pressed)
            {
                if ($("#2_other_drug_use").length > 0)
                {
                    placement = "#2_other_drug_use";
                }
                else if ($("#2_sedatives").length > 0)
                {
                    placement = "#2_sedatives";
                }
                else if ($("#2_amphetamine").length > 0)
                {
                    placement = "#2_amphetamine";
                }
                else if ($("#2_cocaine_fieldcontain").length > 0)
                {
                    placement = "#2_cocaine_fieldcontain";
                }
                else if ($("#2_cannabis_fieldcontain").length > 0)
                {
                    placement = "#2_cannabis_fieldcontain";
                }
                else
                {
                    placement = "#2_alcohol";
                }
                
                $(placement).after(
                    '<div data-role="fieldcontain" id="3a_alcohol_fieldcontain">' +
                        '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
                            '<div id="desire_a">3 a.    During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
                            '<input type="radio" name="3_alcohol" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
                            '<input type="radio" name="3_alcohol" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
                            '<input type="radio" name="3_alcohol" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
                            '<input type="radio" name="3_alcohol" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
                            '<input type="radio" name="3_alcohol" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +
                        '</fieldset>' +
                    '</div>').trigger('create');
                
                $("#3a_alcohol_fieldcontain").trigger('create');
                
                add_text('#desire_a', drug_of_choice);
                
                if ($("#3f_other_drug_use_fieldcontain").length > 0)
                {
                    placement = "#3f_other_drug_use_fieldcontain";
                }
                else if ($("#3e_sedatives_fieldcontain").length > 0)
                {
                    placement = "#3e_sedatives_fieldcontain";
                }
                else if ($("#3d_amphetamine_fieldcontain").length > 0)
                {
                    placement = "#3d_amphetamine_fieldcontain";
                }
                else if ($("#3c_cocaine_fieldcontain").length > 0)
                {
                    placement = "#3c_cocaine_fieldcontain";
                }
                else if ($("#3b_cannabis_fieldcontain").length > 0)
                {
                    placement = "#3b_cannabis_fieldcontain";
                }
                else
                {
                    placement = "#3a_alcohol_fieldcontain";
                }
                
                $(placement).after(
                    '<div data-role="fieldcontain" id="4a_alcohol_fieldcontain">' +
                        '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
                        '<div id="problems_a">4 a.  During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
                    '<input type="radio" name="4_alcohol" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
                    '<input type="radio" name="4_alcohol" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
                    '<input type="radio" name="4_alcohol" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
                    '<input type="radio" name="4_alcohol" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
                    '<input type="radio" name="4_alcohol" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +

                '</fieldset>' + 
                '</div>').trigger('create');
                
                $("#4a_alcohol_fieldcontain").trigger('create');
                
                add_text('#problems_a', drug_of_choice);
                
                if ($("#4f_other_drug_use_fieldcontain").length > 0)
                {
                    placement = "#4f_other_drug_use_fieldcontain";
                }
                else if ($("#4e_sedatives_fieldcontain").length > 0)
                {
                    placement = "#4e_sedatives_fieldcontain";
                }
                else if ($("#4d_amphetamine_fieldcontain").length > 0)
                {
                    placement = "#4d_amphetamine_fieldcontain";
                }
                else if ($("#4c_cocaine_fieldcontain").length > 0)
                {
                    placement = "#4c_cocaine_fieldcontain";
                }
                else if ($("#4b_cannabis_fieldcontain").length > 0)
                {
                    placement = "#4b_cannabis_fieldcontain";
                }
                else
                {
                    placement = "#4a_alcohol_fieldcontain";
                }
                $(placement).after(
                    '<div data-role="fieldcontain" id="5a_alcohol_fieldcontain">' +
                        '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                            '<div id="failed_a">5 a.    During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
                        '<input type="radio" name="5_alcohol" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
                        '<input type="radio" name="5_alcohol" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
                        '<input type="radio" name="5_alcohol" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
                        '<input type="radio" name="5_alcohol" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
                        '<input type="radio" name="5_alcohol" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +

                    '</fieldset>' +
                    '</div>');
                
                $("#5a_alcohol_fieldcontain").trigger('create');
                
                add_text('#failed_a', drug_of_choice);
                
                alcohol_pressed = true;
            }
        }
    });

    $(":input[name='2sub_cannabis']").live("change", function(event, ui) {
        var drug_of_choice = 'Cannabis (marijuana, pot, grass, hash, etc.)'; 
        
        if ($(this).val() === '0') {
            /* Remove the dynamically created text, allow the button to be pressed again */
            $("#3b_cannabis_fieldcontain").remove();
            $("#4b_cannabis_fieldcontain").remove();
            $("#5b_amphetamine_fieldcontain").remove();
            cannabis_pressed = false;
        } 
        else
        {
            if (!cannabis_pressed)
            {
                // Figure out where to place question 3, 4, and 5 for cannabis.
                var placement;
                
                if ($("#3a_alcohol_fieldcontain").length > 0)
                {
                    placement = "#3a_alcohol_fieldcontain";
                }
                else if ($("#2_other_drug_use").length > 0)
                {
                    placement = "#2_other_drug_use";
                }
                else if ($("#2_sedatives").length > 0)
                {
                    placement = "#2_sedatives";
                }
                else if ($("#2_amphetamine").length > 0)
                {
                    placement = "#2_amphetamine";
                }
                else if ($("#2_cocaine_fieldcontain").length > 0)
                {
                    placement = "#2_cocaine_fieldcontain";
                }
                else
                {
                    placement = "#2_cannabis_fieldcontain";
                }
                
                $(placement).after(
                    '<div data-role="fieldcontain" id="3b_cannabis_fieldcontain">' +
                        '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
                            '<div id="desire_b">3 b.    During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
                            '<input type="radio" name="3_cannabis" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
                            '<input type="radio" name="3_cannabis" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
                            '<input type="radio" name="3_cannabis" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
                            '<input type="radio" name="3_cannabis" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
                            '<input type="radio" name="3_cannabis" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +
                        '</fieldset>' +
                    '</div>');
                    
                $("#3b_cannabis_fieldcontain").trigger('create');
        
                add_text('#desire_b', drug_of_choice);
                
                if ($("#4a_alcohol_fieldcontain").length > 0)
                {
                    placement = "#4a_alcohol_fieldcontain";
                }
                else if ($("#3f_other_drug_use_fieldcontain").length > 0)
                {
                    placement = "#3f_other_drug_use_fieldcontain";
                }
                else if ($("#3e_sedatives_fieldcontain").length > 0)
                {
                    placement = "#3e_sedatives_fieldcontain";
                }
                else if ($("#3d_amphetamine_fieldcontain").length > 0)
                {
                    placement = "#3d_amphetamine_fieldcontain";
                }
                else if ($("#3c_cocaine_fieldcontain").length > 0)
                {
                    placement = "#3c_cocaine_fieldcontain";
                }
                else
                {
                    placement = "#3b_cannabis_fieldcontain";
                }
                
                $(placement).after(
                    '<div data-role="fieldcontain" id="4b_cannabis_fieldcontain">' +
                        '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
                        '<div id="problems_b">4 b.  During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
                    '<input type="radio" name="4_cannabis" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
                    '<input type="radio" name="4_cannabis" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
                    '<input type="radio" name="4_cannabis" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
                    '<input type="radio" name="4_cannabis" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
                    '<input type="radio" name="4_cannabis" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +

                '</fieldset>' + 
                '</div>').trigger('create');
                
                $("#4b_cannabis_fieldcontain").trigger('create');
                
                add_text('#problems_b', drug_of_choice);
                    
                if ($("#5a_alcohol_fieldcontain").length > 0)
                {
                    placement = "#5a_alcohol_fieldcontain";
                }
                else if ($("#4f_other_drug_use_fieldcontain").length > 0)
                {
                    placement = "#4f_other_drug_use_fieldcontain";
                }
                else if ($("#4e_sedatives_fieldcontain").length > 0)
                {
                    placement = "#4e_sedatives_fieldcontain";
                }
                else if ($("#4d_amphetamine_fieldcontain").length > 0)
                {
                    placement = "#4d_amphetamine_fieldcontain";
                }
                else if ($("#4c_cocaine_fieldcontain").length > 0)
                {
                    placement = "#4c_cocaine_fieldcontain";
                }
                else
                {
                    placement = "#4b_cannabis_fieldcontain";
                }
                
                $(placement).after(
                    '<div data-role="fieldcontain" id="5b_amphetamine_fieldcontain">' +
                        '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                            '<div id="failed_b">5 b.    During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
                        '<input type="radio" name="5_cannabis" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
                        '<input type="radio" name="5_cannabis" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
                        '<input type="radio" name="5_cannabis" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
                        '<input type="radio" name="5_cannabis" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
                        '<input type="radio" name="5_cannabis" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +
                    '</fieldset>' +
                    '</div>');
                
                $("#5b_amphetamine_fieldcontain").trigger('create');
                
                // Radio buttons 1-4 are pressed
                add_text('#failed_b', drug_of_choice);
                    
                cannabis_pressed = true;
            }
        }
    });

    $(":input[name='2sub_cocaine']").live("change", function(event, ui) {
        var drug_of_choice = 'Cocaine (coke, crack, etc.)'; 
        
        if ($(this).val() === '0') {
            /* Remove the dynamically created text, allow the button to be pressed again */
            $("#3c_cocaine_fieldcontain").remove();
            $("#4c_cocaine_fieldcontain").remove();
            $("#5c_cocaine_fieldcontain").remove();
            cocaine_pressed = false;
        } 
        else
        {
            if (!cocaine_pressed)
            {
                // Figure out where to place question 3, 4, and 5 for cocaine.
                var placement;
                if ($("#3b_cannabis_fieldcontain").length > 0)
                {
                    placement = "#3b_cannabis_fieldcontain";
                }
                else if ($("#3a_alcohol_fieldcontain").length > 0)
                {
                    placement = "#3a_alcohol_fieldcontain";
                }
                else if ($("#2_other_drug_use").length > 0)
                {
                    placement = "#2_other_drug_use";
                }
                else if ($("#2_sedatives").length > 0)
                {
                    placement = "#2_sedatives";
                }
                else if ($("#2_amphetamine").length > 0)
                {
                    placement = "#2_amphetamine";
                }
                else
                {
                    placement = "#2_cocaine_fieldcontain";
                }
                
                $(placement).after(
                    '<div data-role="fieldcontain" id="3c_cocaine_fieldcontain">' +
                        '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
                            '<div id="desire_c">3 c.    During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
                            '<input type="radio" name="3_cocaine" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
                            '<input type="radio" name="3_cocaine" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
                            '<input type="radio" name="3_cocaine" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
                            '<input type="radio" name="3_cocaine" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
                            '<input type="radio" name="3_cocaine" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +
                        '</fieldset>' +
                    '</div>').trigger('create');
                
                $("#3c_cocaine_fieldcontain").trigger('create');
                
                add_text('#desire_c', drug_of_choice);
                
                if ($("#4b_cannabis_fieldcontain").length > 0)
                {
                    placement = "#4b_cannabis_fieldcontain";
                }
                else if ($("#4a_alcohol_fieldcontain").length > 0)
                {
                    placement = "#4a_alcohol_fieldcontain";
                }
                else if ($("#3f_other_drug_use_fieldcontain").length > 0)
                {
                    placement = "#3f_other_drug_use_fieldcontain";
                }
                else if ($("#3e_sedatives_fieldcontain").length > 0)
                {
                    placement = "#3e_sedatives_fieldcontain";
                }
                else if ($("#3d_amphetamine_fieldcontain").length > 0)
                {
                    placement = "#3d_amphetamine_fieldcontain";
                }
                else
                {
                    placement = "#3c_cocaine_fieldcontain";
                }
                
                $(placement).after(
                    '<div data-role="fieldcontain" id="4c_cocaine_fieldcontain">' +
                        '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
                        '<div id="problems_c">4 c.  During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
                    '<input type="radio" name="4_cocaine" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
                    '<input type="radio" name="4_cocaine" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
                    '<input type="radio" name="4_cocaine" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
                    '<input type="radio" name="4_cocaine" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
                    '<input type="radio" name="4_cocaine" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +
                '</fieldset>' + 
                '</div>').trigger('create');
                
                $("#4c_cocaine_fieldcontain").trigger('create');
                
                // Radio buttons 1-4 are pressed
                add_text('#problems_c', drug_of_choice);
                
                if ($("#5b_amphetamine_fieldcontain").length > 0)
                {
                    placement = "#5b_amphetamine_fieldcontain";
                }
                else if ($("#5a_alcohol_fieldcontain").length > 0)
                {
                    placement = "#5a_alcohol_fieldcontain";
                }
                else if ($("#4f_other_drug_use_fieldcontain").length > 0)
                {
                    placement = "#4f_other_drug_use_fieldcontain";
                }
                else if ($("#4e_sedatives_fieldcontain").length > 0)
                {
                    placement = "#4e_sedatives_fieldcontain";
                }
                else if ($("#4d_amphetamine_fieldcontain").length > 0)
                {
                    placement = "#4d_amphetamine_fieldcontain";
                }
                else
                {
                    placement = "#4c_cocaine_fieldcontain";
                }
                
                $(placement).after(
                    '<div data-role="fieldcontain" id="5c_cocaine_fieldcontain">' +
                        '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                            '<div id="failed_c">5 c.    During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
                        '<input type="radio" name="5_cocaine" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
                        '<input type="radio" name="5_cocaine" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
                        '<input type="radio" name="5_cocaine" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
                        '<input type="radio" name="5_cocaine" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
                        '<input type="radio" name="5_cocaine" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +
                    '</fieldset>' +
                    '</div>');
                
                $("#5c_cocaine_fieldcontain").trigger('create');
                
                // Radio buttons 1-4 are pressed
                add_text('#failed_c', drug_of_choice);
                
                cocaine_pressed = true;
            }
        }
    });

    $(":input[name='2sub_amphetamine']").live("change", function(event, ui) {
        var drug_of_choice = 'Amphetamine type stimulants (speed, diet pills, ecstasy, etc.)'; 
        
        if ($(this).val() === '0') {
            /* Remove the dynamically created text, allow the button to be pressed again */
            $("#3d_amphetamine_fieldcontain").remove();
            $("#4d_amphetamine_fieldcontain").remove();
            $("#5d_amphetamine_fieldcontain").remove();
            amphetamine_pressed = false;
        } 
        else
        {
            if (!amphetamine_pressed)
            {
                // Figure out where to place question 3, 4, and 5 for amphetamine.
                var placement;
                if ($("#3c_cocaine_fieldcontain").length > 0)
                {
                    placement = "#3c_cocaine_fieldcontain";
                }
                else if ($("#3b_cannabis_fieldcontain").length > 0)
                {
                    placement = "#3b_cannabis_fieldcontain";
                }
                else if ($("#3a_alcohol_fieldcontain").length > 0)
                {
                    placement = "#3a_alcohol_fieldcontain";
                }
                else if ($("#2_other_drug_use").length > 0)
                {
                    placement = "#2_other_drug_use";
                }
                else if ($("#2_sedatives").length > 0)
                {
                    placement = "#2_sedatives";
                }
                else
                {
                    placement = "#2_amphetamines";
                }
                
                $(placement).after(
                    '<div data-role="fieldcontain" id="3d_amphetamine_fieldcontain">' +
                        '<fieldset data-role="controlgroup"  class="likert1-5_alcohol">' + 
                            '<div id="desire_d">3 d.    During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
                            '<input type="radio" name="3_amphetamine" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
                            '<input type="radio" name="3_amphetamine" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
                            '<input type="radio" name="3_amphetamine" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
                            '<input type="radio" name="3_amphetamine" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
                            '<input type="radio" name="3_amphetamine" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +

                        '</fieldset>' +
                    '</div>').trigger('create');
                
                $("#3d_amphetamine_fieldcontain").trigger('create');
                
                // Radio buttons 1-4 are pressed
                add_text('#desire_d', drug_of_choice);
                
                if ($("#4c_cocaine_fieldcontain").length > 0)
                {
                    placement = "#4c_cocaine_fieldcontain";
                }
                else if ($("#4b_cannabis_fieldcontain").length > 0)
                {
                    placement = "#4b_cannabis_fieldcontain";
                }
                else if ($("#4a_alcohol_fieldcontain").length > 0)
                {
                    placement = "#4a_alcohol_fieldcontain";
                }
                else if ($("#3f_other_drug_use_fieldcontain").length > 0)
                {
                    placement = "#3f_other_drug_use_fieldcontain";
                }
                else if ($("#3e_sedatives_fieldcontain").length > 0)
                {
                    placement = "#3e_sedatives_fieldcontain";
                }
                else
                {
                    placement = "#3d_amphetamine_fieldcontain";
                }
                
                $(placement).after(
                    '<div data-role="fieldcontain" id="4d_amphetamine_fieldcontain">' +
                        '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
                        '<div id="problems_d">4 d.  During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
                    '<input type="radio" name="4_amphetamine" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
                    '<input type="radio" name="4_amphetamine" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
                    '<input type="radio" name="4_amphetamine" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
                    '<input type="radio" name="4_amphetamine" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
                    '<input type="radio" name="4_amphetamine" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +

                '</fieldset>' + 
                '</div>').trigger('create');
                
                $("#4d_amphetamine_fieldcontain").trigger('create');
                
                // Radio buttons 1-4 are pressed
                add_text('#problems_d', drug_of_choice);
                    
                if ($("#5c_cocaine_fieldcontain").length > 0)
                {
                    placement = "#5c_cocaine_fieldcontain";
                }
                else if ($("#5b_amphetamine_fieldcontain").length > 0)
                {
                    placement = "#5b_amphetamine_fieldcontain";
                }
                else if ($("#5a_alcohol_fieldcontain").length > 0)
                {
                    placement = "#5a_alcohol_fieldcontain";
                }
                else if ($("#4f_other_drug_use_fieldcontain").length > 0)
                {
                    placement = "#4f_other_drug_use_fieldcontain";
                }
                else if ($("#4e_sedatives_fieldcontain").length > 0)
                {
                    placement = "#4e_sedatives_fieldcontain";
                }
                else
                {
                    placement = "#4d_amphetamine_fieldcontain";
                }
                
                $(placement).after(
                    '<div data-role="fieldcontain" id="5d_amphetamine_fieldcontain">' +
                        '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                            '<div id="failed_d">5 d.    During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
                        '<input type="radio" name="5_amphetamine" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
                        '<input type="radio" name="5_amphetamine" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
                        '<input type="radio" name="5_amphetamine" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
                        '<input type="radio" name="5_amphetamine" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
                        '<input type="radio" name="5_amphetamine" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +
                    '</fieldset>' +
                    '</div>');
                
                $("#5d_amphetamine_fieldcontain").trigger('create');
                
                // Radio buttons 1-4 are pressed
                add_text('#failed_d', drug_of_choice);
                
                amphetamine_pressed = true;
            }
        }
    });

    $(":input[name='2sub_sedatives']").live("change", function(event, ui) {
        var drug_of_choice = 'Sedatives or sleeping pills (Valium, Serapax, Rohypnol, Ambien, etc.)'; 
        
        if ($(this).val() === '0') {
            /* Remove the dynamically created text, allow the button to be pressed again */
            $("#3e_sedatives_fieldcontain").remove();
            $("#4e_sedatives_fieldcontain").remove();
            $("#5e_sedatives_fieldcontain").remove();
            sedatives_pressed = false;
        } 
        else
        {
            if (!sedatives_pressed)
            {
                // Figure out where to place question 3, 4, and 5 for sedatives.
                var placement;
                if ($("#3d_amphetamine_fieldcontain").length > 0)
                {
                    placement = "#3d_amphetamine_fieldcontain";
                }
                else if ($("#3c_cocaine_fieldcontain").length > 0)
                {
                    placement = "#3c_cocaine_fieldcontain";
                }
                else if ($("#3b_cannabis_fieldcontain").length > 0)
                {
                    placement = "#3b_cannabis_fieldcontain";
                }
                else if ($("#3a_alcohol_fieldcontain").length > 0)
                {
                    placement = "#3a_alcohol_fieldcontain";
                }
                else if ($("#2_other_drug_use").length > 0)
                {
                    placement = "#2_other_drug_use";
                }
                else if ($("#2_sedatives").length > 0)
                {
                    placement = "#2_sedatives";
                }

                $(placement).after(
                    '<div data-role="fieldcontain" id="3e_sedatives_fieldcontain">' +
                        '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
                            '<div id="desire_e">3 e.    During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
                            '<input type="radio" name="3_sedatives" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
                            '<input type="radio" name="3_sedatives" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
                            '<input type="radio" name="3_sedatives" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
                            '<input type="radio" name="3_sedatives" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
                            '<input type="radio" name="3_sedatives" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +
                        '</fieldset>' +
                    '</div>').trigger('create');
                
                $("#3e_sedatives_fieldcontain").trigger('create');
                
                add_text('#desire_e', drug_of_choice);
                
                if ($("#4d_amphetamine_fieldcontain").length > 0)
                {
                    placement = "#4d_amphetamine_fieldcontain";
                }
                else if ($("#4c_cocaine_fieldcontain").length > 0)
                {
                    placement = "#4c_cocaine_fieldcontain";
                }
                else if ($("#4b_cannabis_fieldcontain").length > 0)
                {
                    placement = "#4b_cannabis_fieldcontain";
                }
                else if ($("#4a_alcohol_fieldcontain").length > 0)
                {
                    placement = "#4a_alcohol_fieldcontain";
                }
                else if ($("#3f_other_drug_use_fieldcontain").length > 0)
                {
                    placement = "#3f_other_drug_use_fieldcontain";
                }
                else if ($("#3d_amphetamine_fieldcontain").length > 0)
                {
                    placement = "#3d_amphetamine_fieldcontain";
                }
                else if ($("#3c_cocaine_fieldcontain").length > 0)
                {
                    placement = "#3c_cocaine_fieldcontain";
                }
                else if ($("#3b_cannabis_fieldcontain").length > 0)
                {
                    placement = "#3b_cannabis_fieldcontain";
                }
                else if ($("#3a_alcohol_fieldcontain").length > 0)
                {
                    placement = "#3a_alcohol_fieldcontain";
                }
                else
                {
                    placement = "#3e_sedatives_fieldcontain";
                }
                
                $(placement).after(
                    '<div data-role="fieldcontain" id="4e_sedatives_fieldcontain">' +
                        '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
                        '<div id="problems_e">4 e.  During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
                    '<input type="radio" name="4_sedatives" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
                    '<input type="radio" name="4_sedatives" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
                    '<input type="radio" name="4_sedatives" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
                    '<input type="radio" name="4_sedatives" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
                    '<input type="radio" name="4_sedatives" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +

                '</fieldset>' + 
                '</div>').trigger('create');
                
                $("#4e_sedatives_fieldcontain").trigger('create');
                
                add_text('#problems_e', drug_of_choice);
                    
                if ($("#5d_amphetamine_fieldcontain").length > 0)
                {
                    placement = "#5d_amphetamine_fieldcontain";
                }
                else if ($("#5c_cocaine_fieldcontain").length > 0)
                {
                    placement = "#5c_cocaine_fieldcontain";
                }
                else if ($("#5b_amphetamine_fieldcontain").length > 0)
                {
                    placement = "#5b_amphetamine_fieldcontain";
                }
                else if ($("#5a_alcohol_fieldcontain").length > 0)
                {
                    placement = "#5a_alcohol_fieldcontain";
                }
                else if ($("#4f_other_drug_use_fieldcontain").length > 0)
                {
                    placement = "#4f_other_drug_use_fieldcontain";
                }
                else
                {
                    placement = "#4e_sedatives_fieldcontain";
                }
                
                $(placement).after(
                    '<div data-role="fieldcontain" id="5e_sedatives_fieldcontain">' +
                        '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                            '<div id="failed_e">5 e.    During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
                        '<input type="radio" name="5_sedatives" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
                        '<input type="radio" name="5_sedatives" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
                        '<input type="radio" name="5_sedatives" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
                        '<input type="radio" name="5_sedatives" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
                        '<input type="radio" name="5_sedatives" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +

                    '</fieldset>' +
                    '</div>');
                
                $("#5e_sedatives_fieldcontain").trigger('create');
                
                add_text('#failed_e', drug_of_choice);
                    
                sedatives_pressed = true;
            }
        }
    });

    $(":input[name='2sub_other_drug_use']").live("change", function(event, ui) {
        var drug_of_choice = 'Other drug use (inhalants, hallucinogens, opiods, etc.)'; 
        
        if ($(this).val() === '0') {
            /* Remove the dynamically created text, allow the button to be pressed again */
            $("#3f_other_drug_use_fieldcontain").remove();
            $("#4f_other_drug_use_fieldcontain").remove();
            $("#5f_other_drug_use_fieldcontain").remove();
            other_drug_use_pressed = false;
        } 
        else
        {
            if (!other_drug_use_pressed)
            {
                // Figure out where to place question 3, 4, and 5 for other drug use.
                var placement;
                if ($("#3e_sedatives_fieldcontain").length > 0)
                {
                    placement = "#3e_sedatives_fieldcontain";
                }
                else if ($("#3d_amphetamine_fieldcontain").length > 0)
                {
                    placement = "#3d_amphetamine_fieldcontain";
                }
                else if ($("#3c_cocaine_fieldcontain").length > 0)
                {
                    placement = "#3c_cocaine_fieldcontain";
                }
                else if ($("#3b_cannabis_fieldcontain").length > 0)
                {
                    placement = "#3b_cannabis_fieldcontain";
                }
                else if ($("#3a_alcohol_fieldcontain").length > 0)
                {
                    placement = "#3a_alcohol_fieldcontain";
                }
                else
                {
                    placement = "#2_other_drug_use";
                }
                $(placement).after(
                    '<div data-role="fieldcontain" id="3f_other_drug_use_fieldcontain">' +
                        '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
                            '<div id="desire_f">3 f.    During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
                            '<input type="radio" name="3_other_drug_use" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
                            '<input type="radio" name="3_other_drug_use" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
                            '<input type="radio" name="3_other_drug_use" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
                            '<input type="radio" name="3_other_drug_use" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
                            '<input type="radio" name="3_other_drug_use" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +

                        '</fieldset>' +
                    '</div>');
                    
                $("#3f_other_drug_use_fieldcontain").trigger('create');
        
                add_text('#desire_f', drug_of_choice);
                
                if ($("#4e_sedatives_fieldcontain").length > 0)
                {
                    placement = "#4e_sedatives_fieldcontain";
                }
                else if ($("#4d_amphetamine_fieldcontain").length > 0)
                {
                    placement = "#4d_amphetamine_fieldcontain";
                }
                else if ($("#4c_cocaine_fieldcontain").length > 0)
                {
                    placement = "#4c_cocaine_fieldcontain";
                }
                else if ($("#4b_cannabis_fieldcontain").length > 0)
                {
                    placement = "#4b_cannabis_fieldcontain";
                }
                else if ($("#4a_alcohol_fieldcontain").length > 0)
                {
                    placement = "#4a_alcohol_fieldcontain";
                }
                else
                {
                    placement = "#3f_other_drug_use_fieldcontain";
                }
                
                $(placement).after(
                    '<div data-role="fieldcontain" id="4f_other_drug_use_fieldcontain">' +
                        '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
                        '<div id="problems_f">4 f.  During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
                    '<input type="radio" name="4_other_drug_use" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
                    '<input type="radio" name="4_other_drug_use" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
                    '<input type="radio" name="4_other_drug_use" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
                    '<input type="radio" name="4_other_drug_use" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
                    '<input type="radio" name="4_other_drug_use" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +

                '</fieldset>' + 
                '</div>').trigger('create');
                
                $("#4f_other_drug_use_fieldcontain").trigger('create');
                
                add_text('#problems_f', drug_of_choice);
                if ($("#5e_sedatives_fieldcontain").length > 0)
                {
                    placement = "#5e_sedatives_fieldcontain";
                }
                else if ($("#5d_amphetamine_fieldcontain").length > 0)
                {
                    placement = "#5d_amphetamine_fieldcontain";
                }
                else if ($("#5c_cocaine_fieldcontain").length > 0)
                {
                    placement = "#5c_cocaine_fieldcontain";
                }
                else if ($("#5b_amphetamine_fieldcontain").length > 0)
                {
                    placement = "#5b_amphetamine_fieldcontain";
                }
                else if ($("#5a_alcohol_fieldcontain").length > 0)
                {
                    placement = "#5a_alcohol_fieldcontain";
                }
                else
                {
                    placement = "#4f_other_drug_use_fieldcontain";
                }
                $(placement).after(
                    '<div data-role="fieldcontain" id="5f_other_drug_use_fieldcontain">' +
                        '<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
                            '<div id="failed_f">5 f.    During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
                        '<input type="radio" name="5_other_drug_use" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
                        '<input type="radio" name="5_other_drug_use" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
                        '<input type="radio" name="5_other_drug_use" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
                        '<input type="radio" name="5_other_drug_use" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
                        '<input type="radio" name="5_other_drug_use" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +
                    '</fieldset>' +
                    '</div>');
                
                $("#5f_other_drug_use_fieldcontain").trigger('create');
                
                // Radio buttons 1-4 are pressed
                add_text('#failed_f', drug_of_choice);
                    
                other_drug_use_pressed = true;
            }
        }
    });


});




/*
 *
 * LifeArmor
 *
 * Copyright Â© 2009-2012 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright Â© 2009-2012 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 *
 */

$('#seek-support-setup-page').bind('pageshow', function (event, ui) {
	console.log('seek support setup pageshow');
	
	$('#seek-support-setup-contacts').empty();
	$('#seek-support-setup-contacts').append('<div class="message">Loading...</div>');	
	
	var options = new ContactFindOptions();
	options.multiple = true;
	//TODO: be aware of iOS quirks with displayName.  see phonegap docs.
	var fields = ["id", "displayName", "phoneNumbers"];
	console.log(navigator.contacts);
	if (navigator.contacts == null) {
		console.log('contacts not supported on this device');
		$('#seek-support-setup-contacts').html('<div class="error">Your device does not support contact retrieval.</div>');
		$('#seek-support-setup-submit').button('disable');  //TODO: would actually like to hide, but can't find jqm method to do so easily.  more investigation.
	}
	else {
		console.log ('retrieving contacts');
		navigator.contacts.find(fields, onSeekSupportSetupContactsFindSuccess, onSeekSupportSetupContactsFindError, options);
	}
});

function onSeekSupportSetupContactsFindSuccess(contacts) {
	console.log('Contracts retrieved: ' + contacts.length);
	if (contacts.length == 0) {
		alert('You do not have any contacts in your phone book, or your device does not support contact retrieval.');
	}
	else {
		var selectedContactsJson = localStorage.getItem("seekSupportNetwork");
		
		var selectedContacts = null;
		if (selectedContactsJson != null) {
			selectedContacts = JSON.parse(selectedContactsJson);
		}
		else {
			selectedContacts = new Array();
		}
		console.log(selectedContacts.length + ' contacts parsed from localstorage: ' + selectedContactsJson);
		$('#seek-support-setup-contacts').empty();

		$.each(contacts, function(index, contact) {
			console.log('contact.id: ' + contact.id + ", name: " + contact.displayName);
			if (contact.displayName != null && contact.phoneNumbers != null)	{
				var contactIdNum = parseInt(contact.id);
				var checkIt;
				if (jQuery.inArray(contactIdNum, selectedContacts) >= 0) {
					checkIt = "checked";
					console.log ("Contact with phone, previously selected.");
				}
				else {
					checkIt = "";
					console.log ("Contact with phone.");
				}
				var nodeBase = 'seek-support-setup-contacts-';  // if you change this, change the substring line, far below
				var nodeName = nodeBase + contactIdNum;
				var nodeHtml = '<input type="checkbox" name="' + nodeName + '" id="' + nodeName + '" ' + checkIt + ' />' +
									'<label for="' + nodeName + '" id=' + nodeName + '-lbl">' + contact.displayName + '</label>';
				$('#seek-support-setup-contacts').append(nodeHtml);
				//( $.inArray(contactIdNum, selectedContacts) > 0 ? "selected" : "" )
			}
		});
		$('#seek-support-setup-contacts').trigger('create');
	}
}

function onSeekSupportSetupContactsFindError(err) {
	//TODO: probably don't need to give technical error back to user without addl niceness
	alert('Error: ' + err);
}


$('#seek-support-setup-submit').bind('tap', function (event) {
	var checked = new Array();
	$('input[type="checkbox"]').each(function () {
		if ( $(this).prop('checked') ) {
			var contactId = $(this).prop('name').substring(28); //length of nodeBase, above.
			console.log(contactId + "   checked");
			checked.push(parseInt(contactId));
		}
	});
	var checkedJson =  JSON.stringify(checked);
	console.log(checkedJson);
	localStorage.setItem("seekSupportNetwork", checkedJson);
	// href will take the user back a page.
});










/*
 *
 * LifeArmor
 *
 * Copyright Â© 2009-2012 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright Â© 2009-2012 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 *
 */

$('#seek-support-page').bind('pageshow', function (event, ui) {
	console.log('seek support pageshow');
	
	$('#seek-support-contacts').empty();
	$('#seek-support-contacts').append('<div class="message">Loading...</div>');
	
	var options = new ContactFindOptions();
	options.multiple = true;
	//TODO: be aware of iOS quirks with displayName.  see phonegap docs.
	var fields = ["id", "displayName", "phoneNumbers"];
	console.log(navigator.contacts);
	if (navigator.contacts == null) {
		console.log('contacts not supported on this device');
		$("#setup_button").hide();
		$('#seek-support-contacts').html('<div class="error">Your device does not support contact retrieval.</div>');
	}
	else {
		console.log ('retrieving contacts');
		if ($("#setup_button:hidden")) {
			$("#setup_button").show();
		}
		navigator.contacts.find(fields, onSeekSupportContactsFindSuccess, onSeekSupportContactsFindError, options);
	}
});

function onSeekSupportContactsFindSuccess(contacts) {
	console.log('Contracts retrieved: ' + contacts.length);
	var selectedContactsJson = localStorage.getItem("seekSupportNetwork");
	
	var selectedContacts = null;
	if (selectedContactsJson != null) {
		selectedContacts = JSON.parse(selectedContactsJson);
	}
	else {
		selectedContacts = new Array();
	}
	console.log(selectedContacts.length + ' contacts parsed from localstorage: ' + selectedContactsJson);
	$('#seek-support-contacts').empty();
	
	$('<div class="ui-grid-a"/>').appendTo('#seek-support-contacts');
	$.each(contacts, function(index, contact) {
		var html = '';
		//console.log('(' + index + ') contact.id: ' + contact.id + ", name: " + contact.displayName);
		var contactIdNum = parseInt(contact.id);
		// if (in support list && has name && has phone)
		if (jQuery.inArray(contactIdNum, selectedContacts) >= 0 && contact.displayName != null && contact.phoneNumbers != null)	{
			
			//if (contact.phoneNumbers.length > 1)	{
				html = html + '<div class="ui-block-a">' + contact.displayName + '</div>';
				html = html + '<div class="ui-block-b">';
				//$('<div data-role="controlgroup" >').appendTo('#seek-support-contacts');
				$.each(contact.phoneNumbers, function (i2, phoneNumber) {
					html = html + '<a href="tel: ' + phoneNumber.value + '" data-role="button">' + phoneNumber.type + '</a>';
				});
				html = html + '<br/></div>';
			//} 
			//else {
				//nodeHtml = '<a href="tel: ' + contact.phoneNumbers[0].value + '" data-role="button">Call: ' + contact.displayName + '</a>';
			//}
			//console.log(nodeHtml);
			$(html).appendTo('#seek-support-contacts div.ui-grid-a');
		}
	});

	console.log($('#seek-support-contacts').html() );
	$('#seek-support-contacts').trigger('create');  // add jqm styling to all created elements
}

function onSeekSupportContactsFindError(err) {
	//TODO: probably don't need to give technical error back to user without addl niceness
	alert('Error: ' + err);
}








/*
 *
 * LifeArmor
 *
 * Copyright Â© 2009-2012 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright Â© 2009-2012 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 *
 */

$('#rid-r-page').bind('pageshow', function (event, ui) {
	//startCountdown($('#rid-r-page .clock'), 30);
});

$('#rid-r-page .reset-timer').bind('click', function() {
	$('#go_on').show();
	$('#rid-r-page .reset-timer').parent().find('.ui-btn-text').text("Reset Timer");
	startCountdown($('#rid-r-page .clock'), 30);
});

// stop timers on any anchor tap
$('#rid-r-page a').bind('click', function() {
	$('#rid-r-page .clock').stopTime();
});

$('#rid-r-page').bind('pagehide', function() {
	$('#rid-r-page .clock').stopTime();
});










/*
 *
 * LifeArmor
 *
 * Copyright Â© 2009-2012 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright Â© 2009-2012 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 *
 */


$('#iso-plan-contacts').bind( 'tap', function () {
	displayContacts();
} );



function displayContacts() {
	var options = new ContactFindOptions();
	var fields = ["displayName", "name"];
	navigator.contacts.find(fields, contactsFindSuccess, contactsFindError, options);
}


function contactsFindSuccess(contacts) {
	console.log('success');
}

function contactsFindError(err) {
	//TODO: probably don't need to give technical error back to user without addl niceness
	alert('Error: ' + err);
}




/*
 *
 * LifeArmor
 *
 * Copyright Â© 2009-2012 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright Â© 2009-2012 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 *
 */

$('#iso-plan-page').bind('pageshow', function (event, ui) {
	console.log('iso plan pageshow');
	
	
	$('#contacts ul').empty();
	$('#contacts').append('<div class="message">Loading...</div>');	
	
	var options = new ContactFindOptions();
	options.multiple = true;
	//TODO: be aware of iOS quirks with displayName.  see phonegap docs.
	var fields = ["id", "displayName"];
	console.log(navigator.contacts);
	if (navigator.contacts == null) {
		//contacts are not available, which means we're on the web or on a non-phone (e.g. tablet) device.
		console.log('contacts not supported on this device');
		//$('#contacts').html('<div class="error">Your device does not support contact retrieval.</div>');
		
		//this is to help test on the web... makes a fake entry.
		if (device.indexOf("FAKE") >= 0) {
			$('#contacts .message').remove();
			var c = new Contact();
			c.displayName = "Test Contact";
			var phoneNumbers = [3];
			phoneNumbers[0] = new ContactField('work', '212-555-1234', false);
			phoneNumbers[1] = new ContactField('mobile', '917-555-5432', true); // preferred number
			phoneNumbers[2] = new ContactField('home', '203-555-7890', false);
			c.phoneNumbers = phoneNumbers;
		}
		$('#contacts ul').append('<li><a href="activity.html?' +  encodeURIComponent(JSON.stringify(c)) + '"  id="iso-plan-contact-32">Test Contact</a></li>').listview('refresh');
		$('#contacts ul').bind('tap', function(event) {
		});		
		//$('#contacts').button('disable');  //TODO: would actually like to hide, but can't find jqm method to do so easily.  more investigation.
	}
	else {
		console.log ('retrieving contacts');
		navigator.contacts.find(fields, onIsoPlanContactsFindSuccess, onIsoPlanContactsFindError, options);
	}
});

function onIsoPlanContactsFindSuccess(contacts) {
	console.log('Contracts retrieved: ' + contacts.length);
	if (contacts.length == 0) {
		alert('You do not have any contacts in your phone book, or your device does not support contact retrieval.');
	}
	else {
		//$('#contacts').empty().append('<ul data-role="listview" data-theme="z" data-filter="true" data-filter-theme="z">');
		$('#contacts .message').remove();
		
		$.each(contacts, function(index, contact) {
			console.log('contact.id: ' + contact.id + ", name: " + contact.displayName);
			//TODO: right now, it pulls all contacts.  Only with phone or email?
			if (contact.displayName != null)	{
				console.log('x= ' + JSON.stringify(contact));
				var contactIdNum = parseInt(contact.id);
				var nodeBase = 'iso-plan-contact-';  // if you change this, change the substring line, far below
				var nodeName = nodeBase + contactIdNum;
				var nodeHtml = '<li><a id="' + nodeName + '">' + contact.displayName + '</a></li>';
				$('#contacts ul').append(nodeHtml);
				//( $.inArray(contactIdNum, selectedContacts) > 0 ? "selected" : "" )
			}
		});
		console.log($('#contacts').html() );
		//$('#contacts').trigger('create');
		$('#contacts ul').listview('refresh');
		$('#contacts ul').bind('tap', function(event) {
			
			console.log('event.target= ' + event.target);
		});
	}
}

function onIsoPlanContactsFindError(err) {
	//TODO: probably don't need to give technical error back to user without addl niceness
	alert('Error: ' + err);
}




/*
 *
 * LifeArmor
 *
 * Copyright Â© 2009-2012 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright Â© 2009-2012 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 *
 */

var options = new ContactFindOptions();
var fields = ["displayName", "name"];
navigator.contacts.find(fields, onSuccess, onError, options);


function contactsFindSuccess(contacts) {
	console.log('success');
	//log.debug('#contacts' + contacts.length);
}

function contactsFindError(err) {
	//TODO: probably don't need to give technical error back to user without addl niceness
	alert('Error: ' + err);
}





/*
 *
 * LifeArmor
 *
 * Copyright Â© 2009-2012 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright Â© 2009-2012 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 *
 */

$('#time-out-page .reset-timer').bind('click', function() {
	startCountdown($('#time-out-page .clock'), 300);
});

$('#time-out-page .interactive-rotate-button').bind("click", function (event) {
	$('#timer-group').show();
	// blank the html before doing class setting to avoid flashing effect of changing class.
	$("#message").html('').removeClass('interactive-instruct').addClass('interactive-message');
	rotateMessage('data.json', $("#message"));
	$('#time-out-page .interactive-rotate-button .ui-btn-text ').html('New Suggestion');
	event.stopPropagation();  // don't let the live handler do this one.
	//resetCountdown($('#time-out-page .clock'));
	$('#time-out-page .clock').stopTime();
	$('#time-out-page .clock').html(formatTime(0));
});


$('#time-out-page #timer-1').bind("click", function () {
	startCountdown($('#time-out-page .clock'), 60);
});
$('#time-out-page #timer-5').bind("click", function () {
	startCountdown($('#time-out-page .clock'), 300);
});
$('#time-out-page #timer-10').bind("click", function () {
	startCountdown($('#time-out-page .clock'), 600);
});
$('#time-out-page #timer-30').bind("click", function () {
	startCountdown($('#time-out-page .clock'), 1800);
});





/*
 *
 * LifeArmor
 *
 * Copyright Â© 2009-2012 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright Â© 2009-2012 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 *
 */

var audio_inhale = null;
var audio_hold = null;
var audio_exhale = null;
var StateEnum = {"NONE": 0, "BREATHE": 3};
var state = StateEnum.NONE;
var counter = null;


document.addEventListener("pause", onApplicationPause, false);



$( '#breathe_intervention' ).bind( 'pagebeforeshow',function(event, ui){
    buttonPress(StateEnum.NONE);
});

$( '#breathe_intervention' ).bind( 'pagebeforehide',function(event){
    buttonPress(StateEnum.NONE);
});

$("#breatheButton").bind('click', function() {
    buttonPress(StateEnum.BREATHE);
});

function setAButtonText(txt){
    $('#breatheButton .ui-btn-text').text(txt);
}

function onApplicationPause() {
    console.log('STATE: ' + state);
    buttonPress(StateEnum.NONE);
};



function buttonPress(targetState) {
	console.log("Button press: " + targetState);
	// if we press the button for the state we're in, we really want to stop.
	if (targetState == state)
	{
		targetState = StateEnum.NONE;
	}
	changeState(targetState);
};

function changeState(newState) {
	var oldState = state;
	state = newState;
	
	console.log("State change, " + oldState + " to " + state);

	//clean up from the old state
	switch (oldState)
	{
	case StateEnum.NONE:
		break;
	case StateEnum.BREATHE:
		if (audio_inhale)
		{
			audio_inhale.stop();
		}
		if (audio_hold)
		{
			audio_hold.stop();
		}
		if (audio_exhale)
		{
			audio_exhale.stop();
		}
		$(this).stopTime("breathe");
		//$("#breatheButton").html('Start');
		setAButtonText("Start");
	    $("#instruction").text("");
	    $("#counter").text("");
	    //$("#orb_green").hide();
	    $("#orb_green").css({'visibility': 'hidden'});
	    //$("#orb_yellow_full").hide();
	    $("#orb_yellow_full").css({'webkitTransform':'scale(2)', 'visibility': 'hidden'});
	    //$("#orb_red").hide();
	    $("#orb_red").css({'webkitTransform':'scale(2)', 'visibility': 'hidden'});
	    //$("#orb_yellow_empty").hide();
	    $("#orb_yellow_empty").css('visibility', 'hidden');
		
		break;
	}
	switch (state)
	{
	case StateEnum.NONE:
		break;
	case StateEnum.BREATHE:
		//$("#breatheButton").html('Stop');
	    setAButtonText("Stop");
		runBreathe();
		break;	
	}
};

function runBreathe()
{
    var path = jQuery.mobile.path.parseUrl(location.pathname).pathname;
    var dir = path.substring(path.indexOf(''), path.lastIndexOf('/'));
    console.log("MP3" + dir + "/tools/relax_breathe/audio/Alford/inhale.mp3");
	
	if (devicePlatform == "iOS")
    {
		audio_inhale = new Media("/tools/relax_breathe/audio/Alford/inhale.mp3" );
		audio_hold   = new Media("/tools/relax_breathe/audio/Alford/hold.mp3" );
    	audio_exhale = new Media("/tools/relax_breathe/audio/Alford/exhale.mp3" );
	}
	else  
	{
		audio_inhale = new Media( dir + "/tools/relax_breathe/audio/Alford/inhale.mp3" );
		audio_hold   = new Media( dir + "/tools/relax_breathe/audio/Alford/hold.mp3" );
    	audio_exhale = new Media( dir + "/tools/relax_breathe/audio/Alford/exhale.mp3" );	
	}
	counter = -4;

	$(this).stopTime();
	$(this).everyTime(1200, "breathe", function () 
	{
		var instruction = $("#instruction");
		var orb_green = $("#orb_green");
		
		console.log('counter=' + counter);  
             
	    if (counter < 0) {
	        $("#counter").text(Math.abs(counter));
	    } else {
	    	var fourcount = counter % 4 + 1;
	        $("#counter").text(fourcount);
	    }
	    
	    // Show the text and then display the circles.
		switch (counter)
		{
		case -4:
			$(orb_green).css("visibility", "visible");

			$(instruction).text("Ready");
			break;
		case -3:
			$(instruction).text("Relax");
			break;
		case -2:
			$(instruction).text("Exhale");
			break;
		case -1:
		    $(instruction).text("Begin");
			break;
		case 0:
		    $("#orb_yellow_full").css('visibility', 'hidden');
		    $(instruction).text("Inhale");
		    $('#orb_green').css({'visibility': 'visible', '-webkit-transition':'-webkit-transform 4s ease-in-out', '-webkit-transform':'scale(2)'});
			//$('#orb_green').animate({'visibility': 'visible', '-webkit-transition':'-webkit-transform 4s ease-in-out', '-webkit-transform':'scale(2)'}, [,4][,easing][,complete]);
	         if (audio_inhale) 
	            {
	                audio_inhale.play();
	            }
			break;
		case 4:
			$(instruction).text("Hold");
			// hide green orb and scale back to 1.
			$('#orb_green').css({'visibility': 'hidden', 'webkitTransition':'', 'webkitTransform': 'scale(1)'});
			// show yellow orb at scale 2.
			$("#orb_yellow_full").css({'visibility': 'visible', 'webkitTransform': 'scale(2)'});
			if (audio_hold) 
			{
				audio_hold.play();
			}
			break;
		case 8:
			$(instruction).text("Exhale");
			// show red orb and shrink
			$("#orb_red").css({'visibility': 'visible', 'webkitTransition':'-webkit-transform 4s ease-in-out', 'webkitTransform':'scale(1)'});
			
			// hide yellow orb
			$("#orb_yellow_full").css('visibility', 'hidden');
		    if (audio_exhale) 
		    {
		    	audio_exhale.play();
		    }    			    
			break;
		case 12:
			$(instruction).text("Hold");
			// hide red orb and scale back to 2.
			$("#orb_red").css({'visibility': 'hidden', 'webkitTransition':'', 'webkitTransform': 'scale(2)'});
			// show yellow orb at scale 1.
			$("#orb_yellow_full").css({'visibility': 'visible', 'webkitTransform': 'scale(1)'});
			if (audio_hold)
			{
				audio_hold.play();
			}
			break;
		case 15:
		    //reset to beginning.
		    counter = -1;
		    break;
		}
		counter++;
	});
};

console.log('loaded');

var audio_intro = null;
var audio_inhale = null;
var audio_hold = null;
var audio_exhale = null;
var audio_tutorial = null;

var pausedByLifecycleChange = false;

var StateEnum = {"NONE": 0, "INTRO": 1, "TUTORIAL": 2, "BREATHE": 3};
var state = StateEnum.NONE;

var voice = "Alford";
var muted;
var vibrate;
var flurry;

var change_voice;
var change_muted;
var change_vibrate;
var change_flurry;


document.addEventListener("pause", onApplicationPause, false);

$("#speaker_unmuted").hide();
$("#speaker_muted").hide();

// Read the radio button change
//$("input[name=voice]").change(changeVoice);

//$("input[name=audio]").change(toggleAudio);

//$("input[name=vibrate]").change(toggleVibration);

//$("input[name=flurry]").change(toggleFlurry);
// register event listeners (touchstart is faster to respond than click)
//TODO: should detect environment and use click when not on device.

$("#breatheButton").bind('tap', function() {
	console.log ('tap!');
	buttonPress(StateEnum.BREATHE);
});


//$("#breatheButton").bind('touchstart', runBreathe);

//$("#speaker_muted").bind("tap", buttonPressUnmute);

//$("#speaker_unmuted").bind("tap", buttonPressMute);
// Set the voice and muted to local storage
voice = localStorage.voice;
muted = localStorage.muted;
vibrate = localStorage.vibrate;
flurry = localStorage.flurry;

//updateMedia();

// transform the settings radiobuttons to jqueryui buttonsets.
/*$("#radio_voice").buttonset();
$("#radio_audio").buttonset();
$("#radio_vibration").buttonset();
$("#radio_flurry").buttonset();*/

// eliminate click delays. 
/*var x;
x = new NoClickDelay(document.getElementById('radio_voice'));	
x = new NoClickDelay(document.getElementById('radio_audio'));
x = new NoClickDelay(document.getElementById('radio_vibration'));
x = new NoClickDelay(document.getElementById('radio_flurry'));*/
//TODO: eliminate click delay on OK and cancel buttons.

function changeVoice ()
{
	// change_voice is a temporary variable that sets voice to it if Ok is pressed in the Settings dialog box.
	// Otherwise voice is still the old value.  This is so you can cancel out of Settings and it won't save 
	// your changes.
	if ($("input[name=voice]:checked").val() === 'female')
	{
		change_voice = 'Alford'; //saves to the database, “key”, “value”
	}
	else if ($("input[name=voice]:checked").val() === 'male')
	{
		change_voice = 'Adam'; //saves to the database, “key”, “value”
	}
};

function toggleAudio ()
{
	// change_muted is a temporary variable that sets muted to it if Ok is pressed in the Settings dialog box.
	// Otherwise muted is still the old value.  This is so you can cancel out of Settings and it won't save 
	// your changes.
	if ($("input[name=audio]:checked").val() === 'no')
	{
		change_muted = "off"; //saves to the database, “key”, “value”
	}
	
	else if ($("input[name=audio]:checked").val() === 'yes')
	{
		change_muted = "on"; //saves to the database, “key”, “value”
	}
}; 
	
function toggleVibration ()
{
	// change_vibrate is a temporary variable that sets vibrate to it if Ok is pressed in the Settings dialog box.
	// Otherwise vibrate is still the old value.  This is so you can cancel out of Settings and it won't save 
	// your changes.
	if ($("input[name=vibrate]:checked").val() === 'noVibration')
	{
		change_vibrate = "off"; //saves to the database, “key”, “value”
	}
	
	else if ($("input[name=vibrate]:checked").val() === 'yesVibration')
	{
		change_vibrate = "on"; //saves to the database, “key”, “value”
	}
};

function toggleFlurry () 
{
	// change_flurry is a temporary variable that sets flurry to it if Ok is pressed in the Settings dialog box.
	// Otherwise flurry is still the old value.  This is so you can cancel out of Settings and it won't save 
	// your changes.
	if ($("input[name=flurry]:checked").val() === 'noFlurry')
	{
		change_flurry = "off"; //saves to the database, “key”, “value”
	}
	
	else if ($("input[name=flurry]:checked").val() === 'yesFlurry')
	{
		change_flurry = "on"; //saves to the database, “key”, “value”
	}
};

/*
 * Temporary until I can get passing parameters from delegate or live functions.
 */
function buttonPressIntro ()
{
	buttonPress(StateEnum.INTRO);
};
function buttonPressTutorial ()
{
	buttonPress(StateEnum.TUTORIAL);
};

function buttonPressMute ()
{
	$("#speaker_unmuted").hide();
	$("#speaker_muted").show();
	muted = "on";
	if (audio_inhale)
	{
		audio_inhale.stop();
	}
	if (audio_hold)
	{
		audio_hold.stop();
	}
	if (audio_exhale)
	{
		audio_exhale.stop();
	}
};

function buttonPressUnmute ()
{
	$("#speaker_unmuted").show();
	$("#speaker_muted").hide();
	muted = "off";
};

function buttonPress (targetState)
{
	console.log("Button press: " + targetState);
	// if we press the button for the state we're in, we really want to stop.
	if (targetState == state)
	{
		targetState = StateEnum.NONE;
	}
	changeState(targetState);
};

function changeState (newState)
{
	var oldState = state;
	state = newState;
	
	console.log("State change, " + oldState + " to " + state);

	//clean up from the old state
	switch (oldState)
	{
	case StateEnum.NONE:
		break;
	case StateEnum.BREATHE:
		if (audio_inhale)
		{
			audio_inhale.stop();
		}
		if (audio_hold)
		{
			audio_hold.stop();
		}
		if (audio_exhale)
		{
			audio_exhale.stop();
		}
		$(this).stopTime("breathe");
		$("#breatheButton .ui-btn-text").text("Start");
	    $("#instruction").text("");
	    $("#counter").text("");
	    //$("#orb_green").hide();
	    $("#orb_yellow_full").hide();
	    $("#orb_red").hide();
	    $("#orb_yellow_empty").hide();
	    $("#speaker_unmuted").hide();
		$("#speaker_muted").hide();
		break;
	}
	
	switch (state)
	{
	case StateEnum.NONE:
		break;
	case StateEnum.BREATHE:
		$("#breatheButton .ui-btn-text").text("Stop");
		runBreathe();
		break;	
	}

};


function runIntro ()
{
	console.log("Intro button pressed.");
	//logAnalytics("intro");
	
	// load media if not already loaded.
	if (audio_intro == null) 
	{
		audio_intro = new MediaWrapper("/android_asset/www/tools/breathing/audio/" + voice + "/intro1.mp3");
	}

	audio_intro.play();
	
	// set a timer to reset our state and button when audio is completed.
	var duration;
	if (voice === "Alford")
	{
		duration = "57s";
	} else {
		duration = "68s";
	}
	$(this).oneTime(duration, "intro", function () 
    {
		changeState(StateEnum.NONE);
    });
		
};
	
/*function runTutorial ()
{
	console.log("Tutorial button pressed.");
	logAnalytics("tutorial");
	
	// load media if not already loaded.
	if (audio_tutorial == null) 
	{
		audio_tutorial = new MediaWrapper("/android_asset/www/tools/breathing/audio/" + voice + "/intro2.mp3");
	}
	
	//TODO: worried about this variable getting out of sync with buttons... need to think about it.
	var counter = 0;
	$(this).everyTime(1000, "tutorial", function () 
	{
		// Play audio and show the green circle at the appropriate time
		switch (counter)
		{
		case 0:
			if (audio_tutorial) {
				audio_tutorial.play();
			}
			console.log("Playing new audio:" + audio_tutorial.source);
			break;
		case 10:
			break;
		case 12:
			$("#orb_green").replaceWith($("#orb_green").clone(true));  //resets animation
			$("#orb_green").show();
			$("#orb_green").css("webkitAnimationPlayState", "running");
			break;
		case 13:
			$("#counter").text(1);
			break;
		case 14:
			$("#counter").text(2);
			break;
		case 15:
			$("#counter").text(3);
			break;
		case 16:
			$("#counter").text(4);
			break;
		case 17:
			$("#orb_yellow_full").replaceWith($("#orb_yellow_full").clone(true)); //resets animation
			$("#orb_yellow_full").show();
			$("#orb_yellow_full").css("webkitAnimationPlayState", "running");
			$("#counter").text(1);
			break;
		case 18:
			$("#counter").text(2);
			break;
		case 19:
			$("#counter").text(3);
			break;
		case 20:
			$("#counter").text(4);
			break;
		case 21:
			$("#orb_red").replaceWith($("#orb_red").clone(true)); //resets animation
			$("#orb_red").show();
			$("#orb_red").css("webkitAnimationPlayState", "running");
			break;
		case 22:
			$("#counter").text(1);
			break;
		case 23:
			$("#counter").text(2);
			break;
		case 24:
			$("#orb_yellow_empty").replaceWith($("#orb_yellow_empty").clone(true)); //resets animation
			$("#orb_yellow_empty").show();
			$("#orb_yellow_empty").css("webkitAnimationPlayState", "running");
			$("#counter").text(3);
			break;
		case 25:
			$("#counter").text(4);
			break;
		case 26:
			$("#counter").text(1);
			break;
		case 27:
			$("#counter").text(2);
			break;
		case 28:
			$("#counter").text(3);
			break;
		case 29:
			$("#counter").text(4);
			break;
		case 30:
			$("#counter").text("");
			break;	
		case 31:
			// all done.
			$("#tutorialButton").stopTime("tutorial");
			changeState(StateEnum.NONE);
			return;
		}
		counter++;
	});
};*/

function runBreathe ()
{
	//logAnalytics("breathe");
		
	if (muted === "off") // Show the speaker
	{
		$("#speaker_unmuted").show();
		$("#speaker_muted").hide();
	}
	else if (muted === "on") // Hide the speaker
	{
		$("#speaker_unmuted").hide();
		$("#speaker_muted").show();
	}

	// load media if not already loaded.
	if (audio_inhale == null) 
	{    	
		audio_inhale = new MediaWrapper("/android_asset/www/tools/breathing/audio/" + voice + "/inhale.mp3");
	}
	if (audio_hold   == null) 
	{		
		audio_hold   = new MediaWrapper("/android_asset/www/tools/breathing/audio/" + voice + "/hold.mp3");
	}
    if (audio_exhale == null) 
	{
    	audio_exhale = new MediaWrapper("/android_asset/www/tools/breathing/audio/" + voice + "/exhale.mp3");
	}    	    		
	
	var counter = -4;

	$(this).everyTime(1200, "breathe", function () 
	{
		if (muted === "off") // Show the speaker
		{
	    	audio_inhale.setMuted(false);
	    	audio_hold.setMuted(false);
	    	audio_exhale.setMuted(false);
		}
		else if (muted === "on") // Hide the speaker
		{
			audio_inhale.setMuted(true);
			audio_hold.setMuted(true);
	    	audio_exhale.setMuted(true);
		}
		
		// do the counting automatically
	    if (counter < 0) {
	        $("#counter").text(Math.abs(counter));
	    } else {
	    	var fourcount = counter % 4 + 1;
	        $("#counter").text(fourcount);
	        
	        // TODO: need to have this off by default and provide a way to turn it on in the settings.
	        // heartbeat vibrations
	        if (vibrate === "on")
	        {
		        if (fourcount === 1)
	        	{
	        		navigator.notification.vibrate(70);
	        	} else {
	        		navigator.notification.vibrate(30);
	        	}
	        }
	    }
	    
	    // Show the text and then display the circles.
		switch (counter)
		{
		case -4:
			$("#instruction").text("Ready");
			break;
		case -3:
			$("#instruction").text("Relax");
			break;
		case -2:
			$("#instruction").text("Exhale");
			break;
		case -1:
		    $("#instruction").text("Begin");
			break;
		case 0:
			$("#instruction").text("Inhale");
			
			$("#orb_green").replaceWith($("#orb_green").clone(true));  //resets animation
			$("#orb_green").show();
			$("#orb_green").css("webkitAnimationPlayState", "running");
			if (audio_inhale) 
			{
				audio_inhale.play();
			}
			break;
		case 4:
			$("#instruction").text("Hold");
			$("#orb_yellow_full").replaceWith($("#orb_yellow_full").clone(true)); //resets animation
            $("#orb_yellow_full").show();
			$("#orb_yellow_full").css("webkitAnimationPlayState", "running"); 
			if (audio_hold) 
			{
				audio_hold.play();
			}
			break;
		case 8:
		    $("#instruction").text("Exhale");
		    $("#orb_red").replaceWith($("#orb_red").clone(true)); //resets animation
            $("#orb_red").show();
		    $("#orb_red").css("webkitAnimationPlayState", "running");
		    if (audio_exhale) 
		    {
		    	audio_exhale.play();
		    }    			    
			break;
		case 12:
			$("#instruction").text("Hold");
			$("#orb_yellow_empty").replaceWith($("#orb_yellow_empty").clone(true)); //resets animation
            $("#orb_yellow_empty").show();
			$("#orb_yellow_empty").css("webkitAnimationPlayState", "running");
			if (audio_hold)
			{
				audio_hold.play();
			}
			break;
		case 15:
		    //reset to beginning.
		    counter = -1;
		    break;
		}
		counter++;
	});
};


function updateMedia ()
{
	console.log("updateMedia");
	
    if (voice == null)
	{
    	// Alford will be the default if nothing is in the localStorage
		voice = "Alford";
	}
    
    if (muted == null)
	{
    	// Off will be the default if nothing is in the localStorage
    	muted = "off";
	}
    
    if (vibrate == null)
	{
    	// Off will be the default if nothing is in the localStorage
    	vibrate = "off";
	}
    
    if (flurry == null)
	{
    	// On will be the default if nothing is in the localStorage
    	flurry = "on";
	}
    
    destroyAllMedia();
};

/**
 * Releases all acquired media handles.
 */
function releaseAllMedia ()
{
    if (audio_intro != null)
	{
    	audio_intro.release();
	}
    if (audio_tutorial != null)
	{
    	audio_tutorial.release();
	}
    if (audio_inhale != null)
	{
    	audio_inhale.release();
	}
    if (audio_hold != null)
	{
    	audio_hold.release();
	}
    if (audio_exhale != null)
	{
    	audio_exhale.release();
	}    
};

/**
 * Releases all acquired media handles and then nulls all media variables.
 */
function destroyAllMedia ()
{
	releaseAllMedia();
	audio_intro = null;
	audio_tutorial = null;
	audio_inhale = null;
	audio_hold = null;
	audio_exhale = null;
};

/**
 * Runs on PhoneGap initialization (does not run for browser)
 */
function onDeviceReady () {
    console.log("Device Ready");
    
    
    /*voice = preferences("voice");
	muted = preferences("muted");
	vibrate = preferences("vibrate");
	flurry = preferences("flurry");
	// Used here for the preferences menu
	*/
    //document.addEventListener("resume", onApplicationResume, false);
    //document.addEventListener("backbutton", onBackButton, false);
};

function onApplicationPause () {
    console.log("applicationPause");
    destroyAllMedia();
};

function showSettings ()
{
	//NOTE: if we rewrite this in native code, we still need to sendJavascript the changeState.
	changeState(StateEnum.NONE);
    
    $("#dialog-message-settings").css("display:inline");
	$("#dialog-message-settings").dialog({
		modal: true,
		open: function (event, ui) {
			// Hide the little "X" in the upper right corner as we have a Cancel button already
			$(".ui-dialog-titlebar-close").hide();
			
			// Set the voice to Adam otherwise default to Alford
			var index = voice === 'Adam' ? 1 : 0;
			$("#radio_voice input:radio").eq(index).attr('checked', true);

			// Check to see if it's muted otherwise default to unmuted
			index = muted === 'on' ? 1 : 0;
			$("#radio_audio input:radio").eq(index).attr('checked', true);
			
			// Set vibration on otherwise default to off
			index = vibrate === 'on' ? 1 : 0;
			$("#radio_vibration input:radio").eq(index).attr('checked', true);
			
			// Set flurry off otherwise default to on 
			index = flurry === 'on' ? 1 : 0;
			$("#radio_flurry input:radio").eq(index).attr('checked', true);
			
			// JQuery UI doesn't automatically refresh the radio buttons so we have to do it.
			// This migth be fixed in a later release 
			$('#radio_voice').buttonset("refresh");
			$('#radio_audio').buttonset("refresh");
			$('#radio_vibration').buttonset("refresh");
			$('#radio_flurry').buttonset("refresh");
			
		},
		buttons: {
			Ok: function () {
				$("#dialog-message-settings").css("display:none");
				$(this).dialog("close");
				
				
				//TODO: it probably makes sense to include all these in one try.
				try 
				{
					// Set the voice and localStorage to change_voice.  We are setting voice and 
					// localStorage separately so if localStorage fails, the user can still use the 
					// app for that session.
					voice = change_voice;
					localStorage.voice = change_voice;
				} 
				catch (e1) 
				{
					if (e1 == QUOTA_EXCEEDED_ERR) 
					{
						//TODO: probably don't need to give technical error back to user without addl niceness
						alert('Quota exceeded - voice!'); //data wasn't successfully saved due to quota exceed so throw an error
					}
				}
				
				try 
				{
					// Set the muted and localStorage to change_muted.  We are setting muted and 
					// localStorage separately so if localStorage fails, the user can still use the 
					// app for that session.
					muted = change_muted;
					localStorage.muted = change_muted;
				} 
				catch (e2) 
				{
					if (e2 == QUOTA_EXCEEDED_ERR) 
					{
						//TODO: probably don't need to give technical error back to user without addl niceness
						alert('Quota exceeded - muted!'); //data wasn't successfully saved due to quota exceed so throw an error
					}
				}
				
				try 
				{
					// Set the vibrate and localStorage to change_vibrate.  We are setting vibrate and 
					// localStorage separately so if localStorage fails, the user can still use the 
					// app for that session.
					vibrate = change_vibrate;
					localStorage.vibrate = change_vibrate;
				} 
				catch (e3) 
				{
					if (e3 == QUOTA_EXCEEDED_ERR) 
					{
						//TODO: probably don't need to give technical error back to user without addl niceness
						alert('Quota exceeded - vibrate!'); //data wasn't successfully saved due to quota exceed so throw an error
					}
				}
				
				try
				{
					// Set the flurry and localStorage to change_flurry.  We are setting flurry and 
					// localStorage separately so if localStorage fails, the user can still use the 
					// app for that session.
					flurry = change_flurry;
					localStorage.flurry = change_flurry;
				}
				catch (e4)
				{
					if (e4 == QUOTA_EXCEEDED_ERR) 
					{
						//TODO: probably don't need to give technical error back to user without addl niceness
						alert('Quota exceeded - flurry!'); //data wasn't successfully saved due to quota exceed so throw an error
					}
				}
				
				updateMedia();
			}, 
			Cancel: function () {
				$("#dialog-message-settings").css("display:none");
				$(this).dialog("close");
			}
		}
	});
};









/*
 * From http://cubiq.org/remove-onclick-delay-on-webkit-for-iphone
 * Use:  new NoClickDelay(document.getElementById('element'));
 * 
 * After discovering this code, I came across:
 * http://code.google.com/intl/ro-RO/mobile/articles/fast_buttons.html
 * and
 * https://github.com/jbroadway/jquery-fast-click
 * ... but chose not to implement them, as this seemed to be working.  I did steal a bit of code to add the
 * touchmove 50 pixel tolerance below. -ca
 * ... also, read the comments on the first url to discover possible problems with the pressed class
 * and the possible touchcancel event.
 */
function NoClickDelay(el) {
	console.log ("Creating new NoClickDelay");
	this.element = typeof el == 'object' ? el : document.getElementById(el);
	//if( window.Touch )
	this.element.addEventListener('touchstart', this, false);
}

NoClickDelay.prototype = {
	handleEvent: function(e) {
		switch(e.type) {
			case 'touchstart': this.onTouchStart(e); break;
			case 'touchmove': this.onTouchMove(e); break;
			case 'touchend': this.onTouchEnd(e); break;
		}
	},

	onTouchStart: function(e) {
		e.preventDefault();
		this.moved = false;

		this.theTarget = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
		if(this.theTarget.nodeType == 3) this.theTarget = theTarget.parentNode;
		this.theTarget.className+= ' pressed';
        this.startX = event.touches[0].clientX;
        this.startY = event.touches[0].clientY;
		this.element.addEventListener('touchmove', this, false);
		this.element.addEventListener('touchend', this, false);
	},

	onTouchMove: function(e) {
		// if we haven't moved 50 pixels, let's not call it a move.
		if(Math.abs(event.touches[0].clientX - this.startX) > 50 || Math.abs(event.touches[0].clientY - this.startY) > 50)
		{
			this.moved = true;
		}
		this.theTarget.className = this.theTarget.className.replace(/ ?pressed/gi, '');
	},

	onTouchEnd: function(e) {
		this.element.removeEventListener('touchmove', this, false);
		this.element.removeEventListener('touchend', this, false);

		if( !this.moved && this.theTarget ) {
			this.theTarget.className = this.theTarget.className.replace(/ ?pressed/gi, '');
			var theEvent = document.createEvent('MouseEvents');
			theEvent.initEvent('click', true, true);
			this.theTarget.dispatchEvent(theEvent);
		}

		this.theTarget = undefined;
	}
};

/*
 *
 * LifeArmor
 *
 * Copyright Â© 2009-2012 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright Â© 2009-2012 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 *
 */
/**
 * Adds a layer of control over PhoneGap's Media object, including the ability
 * to automatically re-acquire media handles that have been released.
 * 
 * @param source
 *            String containing path to source media.
 * @returns boolean indicating successful object creation
 */
var MediaWrapper = function (source, successCallback, errorCallback)
{
    if (!(this instanceof arguments.callee)) {  
        return new MediaWrapper(source, successCallback, errorCallback);  
    }  	

	this.source = source;
	this.shortSource = source.match("[^/]*/[^/]*$");
	this.playing = false;
	this.media = null;
	this.successCall = successCallback;
	this.errorCall = errorCallback;
	this.muted = false;
	console.log("MediaWrapper created. [" + this.shortSource + "]");
};

MediaWrapper.prototype.play = function ()
{
	if (!this.isMuted()) // If not muted
	{
		this.playing = true;
		
		// stop any media stopping timers that might be running.  See .stopSafe() for details.
		$(this).stopTime(this.source);
		
		this.acquire();  //ensure we actually have the media handle.
		if (this.media != null)
		{
			console.log("MediaWrapper playing.  [" + this.shortSource + "]");
			this.media.play();
		} else
		{
			console.log("MediaWrapper could not acquire media:  [" + this.shortSource + "]");
		}
	}
};

MediaWrapper.prototype.setMuted = function (muted)
{
	this.muted = muted;
};

MediaWrapper.prototype.isMuted = function ()
{
	return this.muted;
};

MediaWrapper.prototype.pause = function ()
{
	console.log("MediaWrapper pausing. [" + this.shortSource + "]");
	if (this.media && this.playing)
	{
		this.media.pause();
		this.playing = false;
	}
};
MediaWrapper.prototype.togglePause = function ()
{
	console.log("MediaWrapper toggle pause. [" + this.shortSource + "]");
	if (this.media)
	{
		if (this.playing)
		{
			this.pause();
		} else
		{
			this.play();
		}
	} else
	{
		this.play();
	}
};

MediaWrapper.prototype.stop = function ()
{
	console.log("MediaWrapper stopping. [" + this.shortSource + "]");
	if (this.media)
	{
    	this.media.stop();
		this.playing = false;
	}
};
MediaWrapper.prototype.stopSafe = function ()
{
	console.log("MediaWrapper safe stopping. [" + this.shortSource + "]");
	if (this.media)
	{
		/*
		 * Still trying to figure out why, but Darren found some situations where stop doesn't stop if called
		 * very soon after play.  I'm not able to recreate at this time, but we'll leave this "stopSafe" code
		 * around in case someone encounters it again.
		 * This timeout will ensure we actually stop.  Note that we're using the jQuery timer plugin here, so 
		 * it will need to be included.  
		 * Note that play stops this timer, so pressing stop then play within the timeout  will just continue playing.*/
		
		var _this = this;  //get around this pointing to Window inside setTimeout.
		$(this).oneTime(700, this.source ,function ()
	    {
	    	_this.stopUnsafe();
	    });
	}
};

MediaWrapper.prototype.release = function ()
{
	console.log("MediaWrapper releasing resource. [" + this.shortSource + "]");
	if (this.media)
	{
		this.media.stop();
		this.media.release();
		this.media = null;
		this.playing = false;
	}
};
MediaWrapper.prototype.acquire = function ()
{
	// if 'device' has been defined by phonegap, then phonegap is active and we
	// can load the media.
	if (typeof device != 'undefined')
	{
		if (this.media == null) // media not created yet.
		{
			console.log("MediaWrapper loading media. [" + this.shortSource + "]");
			this.media = new Media(this.source, this.mediaCompleted(),
				function (code, message)
				{
					console.log("Error " + code + " (" + message + ") occurred in Media. [" + this.shortSource + "]");
				}
			);
		} else
		{ // media already created.
			// TODO: if media released....
			console.log("MediaWrapper already has media handle. [" + this.shortSource + "]");
		}
	} else
	{
		// TODO: Trying to see if an empty media gives us more control over
		// state.
		// this.media = new Media("");
		console.log("MediaWrapper attempted to load media on a non-mobile device [" + this.shortSource + "]");
	}
};

MediaWrapper.prototype.mediaCompleted = function ()
{
	this.playing = false;
	console.log("Callback reports MediaWrapper completed. [" + this.shortSource + "]");
	if (this.successCall)
	{
		this.successCall();
	}
};

MediaWrapper.prototype.mediaError = function ()
{
	this.playing = false;
	console.error("Callback reports MediaWrapper error occurred. [" + this.shortSource + "]");
	if (this.errorCall)
	{
		this.errorCall();
	}
};

/*
 *
 * LifeArmor
 *
 * Copyright Â© 2009-2012 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright Â© 2009-2012 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 *
 */
/**
 * 
 * 
 * All actions here get sent to FlurryPlugin.execute and pass the action name.
 * 
 * @return Instance of FlurryPlugin
 */
var FlurryPlugin = function ()
{
};

/**
 * @param directory        The directory for which we want the listing
 * @param successCallback  The callback which will be called on successful completion
 * @param failureCallback  The callback which will be called on error
 */
FlurryPlugin.prototype.logEvent = function (event, successCallback, failureCallback) {
	return PhoneGap.exec(successCallback, failureCallback, 'FlurryPlugin', 'logEvent', [event]); 
};

/**
 * <ul>
 * <li>Register the Flurry Plugin</li>
 * <li>Also register native call which will be called when this plugin runs</li>
 * </ul>
 */
PhoneGap.addConstructor(function () {
	// Register the javascript plugin with PhoneGap
	PhoneGap.addPlugin('flurry', new FlurryPlugin());

	// Register the native class of plugin with PhoneGap
	PluginManager.addService("FlurryPlugin", "t2.phongap.plugin.flurry.FlurryPlugin");
});


/*
logAnalytics = function (tag) {
	if (desktop) {
		console.log('FlurryPlugin.logAnalytics("' + tag + '");');
		return;
	}
	if (flurry == "on") {
		try {
			window.plugins.flurry.logEvent(
				tag, 
				function () {
					console.log("Callback reports analytics event recorded: " + tag);
				}, 
				function () {
					console.warn("Callback reports analytics event FAILED: " + tag); 
				}
			);
		}
		catch (err) {
			console.log("Error calling analytics");
		}
	}
};
*/

/**
 * 
 * 
 * All actions here get sent to FlurryPlugin.execute and pass the action name.
 * 
 * @return Instance of FlurryPlugin
 */
var PreferencesPlugin = function () {
};

/**
 * @param directory        The directory for which we want the listing
 * @param successCallback  The callback which will be called on successful completion
 * @param failureCallback  The callback which will be called on error
 */
PreferencesPlugin.prototype.logEvent = function(event, successCallback, failureCallback)
{
	return PhoneGap.exec(successCallback, failureCallback, 'PreferencesPlugin', 'preferences', [event]);
};

/**
 * <ul>
 * <li>Register the Preferences Plugin</li>
 * <li>Also register native call which will be called when this plugin runs</li>
 * </ul>
 */
PhoneGap.addConstructor(function()
{
	// Register the javascript plugin with PhoneGap
	PhoneGap.addPlugin('preferences', new PreferencesPlugin());

	// Register the native class of plugin with PhoneGap
	PluginManager.addService("PreferencesPlugin", "t2.phonegap.plugin.preferences.PreferencesPlugin");
});

preferences = function (tag)
{
	try
	{
		window.plugins.preferences.logEvent(
			tag,
			function() {
				console.log("Callback reports preferences event recorded: " + tag);
			}, 
			function(error) {
				console.log("Callback reports preferences event FAILED: " + tag);
			}
		);
	}
	catch (err)
	{
		//TODO: probably don't need to give technical error back to user without addl niceness
		alert("error message =" + err.message);
		console.log ("Error calling preferences");
	}
};




/**
 * 
 * 
 * All actions here get sent to FlurryPlugin.execute and pass the action name.
 * 
 * @return Instance of FlurryPlugin
 */

// Log Research Data
var pluginLogData = {
    logData: function(types, success, fail) {
        return cordova.exec(success, fail, "pluginLogData", "logData", types);
    }
};

function logUserData(tag){
    pluginLogData.logData(
        [tag],
        function(result){
			console.log('Success logUserData : ' + result);
        },
        function(result){
			console.log('Error logUserData : ' + result);
        }
        );
}

// Fetch Enrollment Status
var pluginFetch = {
    fetchEnrollmentStatus: function(types, success, fail) {
        return cordova.exec(success, fail, "pluginFetch", "fetchEnrollmentStatus", types);
    }
};

function getStatus(tag){
    pluginFetch.fetchEnrollmentStatus(
	[tag],
	function(result){
        console.log('Success getEnrollmentStatus : ' + result);
	},
	function(result){
        console.log('Error getEnrollmentStatus : ' + result);
	}
	);
}

// Send Research Data
var pluginSend = {
    sendData: function(types, success, fail) {
		return cordova.exec(success, fail, "pluginLogData", "sendData", types);
    }
};

function sendData(tag){
    pluginSend.sendData(
        [tag],
        function(result){
			console.log('Success sendData : ' + result);
        },
        function(result){
			console.log('Error sendData : ' + result);
        }
        );
}

// Disenroll
var pluginDisenroll = {
    disenroll: function(types, success, fail) {
    return cordova.exec(success, fail, "pluginLogData", "disenroll", types);
    }
};

function disenroll(tag){
    pluginDisenroll.disenroll(
        [tag],
        function(result)
		{
			console.log('Success Disenroll : ' + result);
        },
        function(result)
		{
			console.log('Error Disenroll : ' + result);
        } );
}


