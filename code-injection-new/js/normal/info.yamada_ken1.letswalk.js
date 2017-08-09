


            // Set virtual screen width size to 640 pixels (横幅640pxに設定)
            monaca.viewport({width: 640});
        


	  $("*").live("touchstart", function() {
      $(this).addClass("active");
    }).live("touchend", function() {
      $(this).removeClass("active");
    });
    document.addEventListener('touchmove', function(ev) {
  ev.preventDefault();
}, false);











/*
   copyright:
   Copyright (c) 2007-11, iUI Project Members.
   See LICENSE.txt for licensing terms.
   Version 0.40-alpha1
 */

/* note:
   This version of iUI has a partial implementation of the `busy` flag for Issue #191,
   it will not work with webapps that call `iui.showPage()` or `iui.showPageByHref()` directly.
   This issue will be resolved in a later version. */

(function() {

var slideSpeed = 20;
var slideInterval = 0;
var ajaxTimeoutVal = 30000;

var currentPage = null;
var currentDialog = null;
var currentWidth = 0;
var currentHeight = 0;
var currentHash = location.hash;
var hashPrefix = "#_";
var pageHistory = [];
var newPageCount = 0;
var checkTimer;
var hasOrientationEvent = false;
var portraitVal = "portrait";
var landscapeVal = "landscape";

// *************************************************************************************************

/*
events:
iUI fires a number of custom events on your panel and dialog elements. Handling
these events is the recommended way to do any just-in-time transformations or
loading (besides the ajax pre-loading built into iUI).
*/

window.iui =
{
	/*
	property: iui.busy
	This is set to `true` if a slide animation is in progress.
	*/
	busy: false,
	
	/*
	property: iui.animOn
	Determines whether to do horizontal slide animations with CSS transitions
	(http://www.w3.org/TR/css3-2d-transforms/) where supported (defaults	to
	`true`). Otherwise, manual `setInterval()` style animations are performed
	(vertical slide animations are always done manually).
	*/
	animOn: true,
	
	/*
	property: iui.ajaxErrHandler
	If defined, this user-set function will be called when an AJAX call returns
	with an HTTP status other than `200` (currently all HTTP statuses other than
	`200`, even including 200-level statuses like `201 Created`, are seen as
	errors.  A status of `0` is treated as success for file:// URLs).
	*/
	ajaxErrHandler : null,
	
	/*
	property: iui.httpHeaders
	An object defining headers to be sent with Ajax requests. This defaults to:
	
	example:
	  { 'X-Requested-With': 'XMLHttpRequest' }
	*/
	httpHeaders: {
	    "X-Requested-With" : "XMLHttpRequest"
	},

	/*
	method: iui.showPage(page[, backwards=false])
	`showPage()` should probably be an internal function, outside callers should
	call `showPageById()` instead. `showPage()` doesn't set the busy flag because
	it is already set by the public-facing functions.
	
	`page` is the html element to show. If `backwards` is set to `true`, it will
	display a right-to-left animation instead of the default left-to-right.
	
	If the currently-displayed page is passed, iui will do nothing. `showPage()`
	is used for both panel-type pages and dialog-type pages (dialogs float on top
	of the panels, have a cancel button and do not participate in sliding
	animations). Panel-type pages receive blur/focus events and load/unload events,
	but dialog-type pages only receive blur/focus events.
	*/	
	showPage: function(page, backwards)
	{
		if (page)
		{
//			if (window.iui_ext)	window.iui_ext.injectEventMethods(page);	// TG -- why was this comment left here??
			if (page == currentPage)
			{
				console.log("page = currentPage = " + page.id);
				iui.busy = false;	//  Don't do anything, just clear the busy flag and exit
				return;
			}
			
			if (currentDialog)
			{
				currentDialog.removeAttribute("selected");
				sendEvent("blur", currentDialog);					// EVENT: BLUR
				currentDialog = null;
			}

			/*
			events:
			Dialogs receive a `focus` event when they are shown and a `blur` event
			when hidden. Currently they don't receive any `load` or `unload` events.
			*/
			if (hasClass(page, "dialog"))
			{
				iui.busy = false;	// There's no slide transition, so clear busy flag
				// There's no LOAD/UNLOAD events for dialogs -- is that the way it should be??
				// Should the view the dialog is going over get a BLUR??
				sendEvent("focus", page);							// EVENT: FOCUS
				showDialog(page);
			}
			/*
			events:
			Panels receive `focus` and `blur` events and also receive a `load` event
			and (only when going backwards away from a panel) an `unload` event.
			*/
			else
			{
				sendEvent("load", page);    						// EVENT: LOAD
													// 127(stylesheet), 128(script), 129(onload)
													// 130(onFocus), 133(loadActionButton)
				var fromPage = currentPage;
				sendEvent("blur", currentPage);						// EVENT: BLUR
				currentPage = page;
				sendEvent("focus", page);							// EVENT: FOCUS

				if (fromPage)
				{
					setTimeout(slidePages, 0, fromPage, page, backwards);
				}
				else
				{
					updatePage(page, fromPage);
				}
					
			}
		}
	},


	/*
	method: iui.showPageById(pageId)
	Looks up the page element by the id and checks the internal history to
	determine if the page is on the stack -- if so, it will call `showPage()` with
	`backwards` set to `true`, reversing the direction of the animation. 
	*/
	showPageById: function(pageId)
	{
		var page = $(pageId);
		if (page)
		{
			if (!iui.busy)
			{
				iui.busy = true;
				var index = pageHistory.indexOf(pageId);
				var backwards = index != -1;
				if (backwards)
				{
					// we're going back, remove history from index on
					// remember - pageId will be added again in updatePage
					pageHistory.splice(index);
				}
	
				iui.showPage(page, backwards);
			}
		}
	},

	/*
	method: iui.goBack()
	Navigates to the previous page in the history stack.
	*/
	goBack: function()
	{
		if (!iui.busy)
		{
			iui.busy = true;
			pageHistory.pop();	// pop current page
			var pageID = pageHistory.pop();  // pop/get parent
			var page = $(pageID);
			iui.showPage(page, true);
		}
	},


	/*
	method: iui.replacePage(pageId)
	Loads a new page at the same level in the history stack. 
	Currently it will do a slide-in animation, but replaces
	the current page in the navStack.
	It should probably use a different animation (slide-up/slide-down).
	*/
	replacePage: function(pageId)
	{
		// Should probably take either an ID or an Element
		var page = $(pageId);
		if (page)
		{
			if (!iui.busy)
			{
				iui.busy = true;
				var index = pageHistory.indexOf(pageId);
				var backwards = index != -1;
				if (backwards)	// we're going back, shouldn't happen on replacePage()
					console.log("error: can't replace page with ancestor");
					
				pageHistory.pop();
	
				iui.showPage(page, false);
			}
		}
	},

	/*
	method: iui.showPageByHrefExt(href, args, method, replace, cb)
	Outside callers should use this version to do an ajax load programmatically
	from your webapp. In a future version, this will be renamed to
	`showPageByHref()` (once the old method and  all its calls are renamed).
	
	`href` is a URL string, `method` is the HTTP method (defaults to `GET`),
	`args` is an Object of key-value pairs that are used to generate the querystring,
	`replace` is an existing element that either is the panel or is a child of the
	panel that the incoming HTML will replace (if not supplied, iUI will append
	the incoming HTML to the `body`), and `cb` is a user-supplied callback function.
	*/
	showPageByHrefExt: function(href, args, method, replace, cb)
	{
		if (!iui.busy)
		{
			iui.busy = true;
			iui.showPageByHref(href, args, method, replace, cb);	
		}
	},

	/*
	method: iui.showPageByHref(href, args, method, replace, cb)
	This one should only be used by iUI internally.  It should be renamed and
	possibly moved into the closure.
	*/
	showPageByHref: function(href, args, method, replace, cb)
	{
	  // I don't think we need onerror, because readstate will still go to 4 in that case
		function spbhCB(xhr) 
		{
			console.log("xhr.readyState = " + xhr.readyState);
			if (xhr.readyState == 4)
			{
				if ((xhr.status == 200 || xhr.status == 0) && !xhr.aborted)
				{
				  // Add 'if (xhr.responseText)' to make sure we have something???
				  // Can't use createDocumentFragment() here because firstChild is null and childNodes is empty
				  var frag = document.createElement("div");
				  frag.innerHTML = xhr.responseText;
				  // EVENT beforeInsert->body
					/*
					events:
					When new pages are inserted into the DOM after an AJAX load, the `body`
					element receives a `beforeinsert` event with `{ fragment: frag }` parameters
					and afterwards receives an `afterinsert` event with `{insertedNode: docNode}` parameters.
					*/
				  sendEvent("beforeinsert", document.body, {fragment:frag})
				  if (replace)
				  {
					  replaceElementWithFrag(replace, frag);
					  iui.busy = false;
				  }
				  else
				  {
					  iui.insertPages(frag);
				  }
				}
				else
				{
					iui.busy = false;
					if (iui.ajaxErrHandler)
					{
						iui.ajaxErrHandler("Error contacting server, please try again later");
					}
				}
				if (cb)
				{
					setTimeout(cb, 1000, true);
				}
			}
		  
		};
	  iui.ajax(href, args, method, spbhCB);
	},
	
	/*
	method: iui.ajax(url, args, method, cb)
	Handles ajax requests and also fires a `setTimeout()` call
	to abort the request if it takes longer than 30 seconds. See `showPageByHrefExt()`
	above for a description of the various arguments (`url` is the same as `href`).
	*/
	ajax: function(url, args, method, cb)
	{
        var xhr = new XMLHttpRequest();
        method = method ? method.toUpperCase() : "GET";
        if (args && method == "GET")
        {
          url =  url + "?" + iui.param(args);
        }
        xhr.open(method, url, true);
        if (cb)
        {
			xhr.onreadystatechange = function() { cb(xhr); };
        }
        var data = null;
        if (args && method != "GET")
        {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            data = iui.param(args);
        }
        for (var header in iui.httpHeaders)
        {
            xhr.setRequestHeader(header, iui.httpHeaders[header]);
        }
        xhr.send(data);
        xhr.requestTimer = setTimeout( ajaxTimeout, ajaxTimeoutVal );
		return xhr;
        function ajaxTimeout()
        {
			try{
		 		xhr.abort();
		   		xhr.aborted = true;
			}
		   	catch(err){
				console.log(err);
		 	}
		}
	},
	
	/*
	method: iui.param(o)
	Stripped-down, simplified object-only version of a jQuery function that
	converts an object of keys/values into a URL-encoded querystring.
	*/
	param: function( o )
	{
	  var s = [ ];
	
	  // Serialize the key/values
	  for ( var key in o )
		s[ s.length ] = encodeURIComponent(key) + '=' + encodeURIComponent(o[key]);
  
	  // Return the resulting serialization
	  return s.join("&").replace(/%20/g, "+");
	},

	/*
	method: iui.insertPages(frag)
	If an AJAX call (`showPageByHref()`) is made without supplying a `replace`
	element, `insertPages()` is called to insert the newly-created element
	fragment into the page DOM. Each child-node of the HTML fragment is a panel
	and if any of them are already in the DOM, they will be replaced by the
	incoming elements.
	*/
	insertPages: function(frag)
	{
		var nodes = frag.childNodes;
		var targetPage;
		for (var i = 0; i < nodes.length; ++i)
		{
			var child = nodes[i];
			if (child.nodeType == 1)
			{
				if (!child.id)
					child.id = "__" + (++newPageCount) + "__";

				var clone = $(child.id);
				var docNode;
				if (clone) {
					clone.parentNode.replaceChild(child, clone);
				    docNode = $(child.id);
			    }
				else
					docNode = document.body.appendChild(child);
					
				sendEvent("afterinsert", document.body, {insertedNode:docNode});   

				// First child becomes selected page/view by default unless
				// selected="true" is set
				// BUG: selected="true" results in a visually incorrect transition
				if (child.getAttribute("selected") == "true" || !targetPage)
					targetPage = child;
				
				--i;
			}
		}
		sendEvent("afterinsertend", document.body, {fragment:frag})

		if (targetPage)
			iui.showPage(targetPage);

	},

	/*
	method: iui.getSelectedPage()
	Returns the panel element that is currently being viewed. Each panel must be a
	direct child of the `body` element. A panel is set as the selected panel by
	setting the `selected` attribute to `true`.
	*/
	getSelectedPage: function()
	{
		for (var child = document.body.firstChild; child; child = child.nextSibling)
		{
			if (child.nodeType == 1 && child.getAttribute("selected") == "true")
				return child;
		}	 
	},
	
	/*
	method: iui.getAllViews()
	Returns all panels -- currently requires querySelectorAll() will be fixed
	*/
	getAllViews: function()
	{
		return document.querySelectorAll("body > *:not(.toolbar)");
	},
	
	/*
	method: iui.isNativeUrl(href)
	Determines whether the supplied URL string launches a native iPhone app (maps,
	YouTube, phone, email, etc). If so, iUI does nothing (doesn't attempt to load
	a page or slide to it) and allows the phone to handle it the click natively.
	*/
	isNativeUrl: function(href)
	{
		for(var i = 0; i < iui.nativeUrlPatterns.length; i++)
		{
			if(href.match(iui.nativeUrlPatterns[i])) return true;
		}
		return false;
	},
	nativeUrlPatterns: [
		new RegExp("^http:\/\/maps.google.com\/maps\?"),
		new RegExp("^mailto:"),
		new RegExp("^tel:"),
		new RegExp("^http:\/\/www.youtube.com\/watch\\?v="),
		new RegExp("^http:\/\/www.youtube.com\/v\/"),
		new RegExp("^javascript:"),

	],
	/*
	method: iui.hasClass(self, name)
	Convenience function to determine if the given element (`self`) has the
	class `name`.
	*/
	hasClass: function(self, name)
	{
		var re = new RegExp("(^|\\s)"+name+"($|\\s)");
		return re.exec(self.getAttribute("class")) != null;
	},
	
	/*
	method: iui.addClass(self, name)
	Convenience function to add the given class `name` to element `self`.
	*/	
	addClass: function(self, name)
	{
	  if (!iui.hasClass(self,name)) self.className += " "+name;
	},
		
	/*
	method: iui.removeClass(self, name)
	Convenience function to remove the given class `name` to element `self`.
	*/
	removeClass: function(self, name)
	{
	  if (iui.hasClass(self,name)) {
		  var reg = new RegExp('(\\s|^)'+name+'(\\s|$)');
		self.className=self.className.replace(reg,' ');
	  }
	}
};

// *************************************************************************************************

/*
load: On Load
On load, iUI will determine which page to display primarily based on
the anchor part of the URL (everything after `#_`) and secondarily based on the
top-level (child of the `body`) element with the `selected` attribute set to
`true`. If these both exist, iui.showPage() will be called twice, but the
anchor-based load will win because it is done second.
*/
addEventListener("load", function(event)
{
	var page = iui.getSelectedPage();
	var locPage = getPageFromLoc();
		
	if (page)
			iui.showPage(page);
	
	if (locPage && (locPage != page))
		iui.showPage(locPage);
	
	setTimeout(preloadImages, 0);
	if (typeof window.onorientationchange == "object")
	{
		window.onorientationchange=orientChangeHandler;
		hasOrientationEvent = true;
		setTimeout(orientChangeHandler, 0);
	}
	setTimeout(checkOrientAndLocation, 0);
	checkTimer = setInterval(checkOrientAndLocation, 300);
}, false);

addEventListener("unload", function(event)
{
	return;
}, false);
	
/*
click: Link Click Handling
iUI captures all clicks on `a` elements and goes through a series of checks to
determine what to do:

1. If the link has a `href="#..."`, iUI will navigate to the panel ID specified
   after the # (no underscore).
2. If the link's ID is `backButton`, iUI will navigate to the previous screen
   (see `iui.goBack()`).
3. If the link has a `type="submit"`, iUI will find the parent `form` element,
   gather up all the input values and submit the form via AJAX (see
   `iui.showPageByHref()`).
4. If the link has a `type="cancel"`, iUI will cancel the parent `form` element
   dialog.
5. If the link has a `target="_replace"`, iUI will do an AJAX call based on the
   href of the link and replace the panel that the link is in with the contents
   of the AJAX response.
6. If the link is a native URL (see `iui.isNativeURL()`), iUI will do nothing.
7. If the link has a `target="_webapp"`, iUI will perform a normal link,
   navigating completely away from the iUI app and pointing the browser to the
   linked-to webapp instead.
8. If there is no `target` attribute, iUI will perform a normal (non-replace)
   AJAX slide (see `iui.showPageByHref()`).
*/
addEventListener("click", function(event)
{
	var link = findParent(event.target, "a");
	if (link)
	{
		function unselect() { link.removeAttribute("selected"); }
		if (link.href && link.hash && link.hash != "#" && !link.target)
		{
			followAnchor(link);
		}
		else if (link == $("backButton"))
		{
			iui.goBack();
		}
		else if (link.getAttribute("type") == "submit")
		{
			var form = findParent(link, "form");
			if (form.target == "_self")
			{
				// Note: this will not call any onsubmit handlers!
			    form.submit();
			    return;  // allow default
			}
			submitForm(form);
		}
		else if (link.getAttribute("type") == "cancel")
		{
			cancelDialog(findParent(link, "form"));
		}
		else if (link.target == "_replace")
		{
			followAjax(link, link);
		}
		else if (iui.isNativeUrl(link.href))
		{
			return;
		}
		else if (link.target == "_webapp")
		{
			location.href = link.href;
		}
		else if (!link.target && link.href)
		{
			followAjax(link, null);
		}
		else
			return;
		
		event.preventDefault();		   
	}
}, true);

/*
click: Div.toggle Click Handling
iUI also captures `div.toggle` clicks and displays/hides the element via setting
a `toggled` attribute to true/false.
*/
addEventListener("click", function(event)
{
	var div = findParent(event.target, "div");
	if (div && hasClass(div, "toggle"))
	{
		div.setAttribute("toggled", div.getAttribute("toggled") != "true");
		event.preventDefault();		   
	}
}, true);

function followAnchor(link)
{
	function unselect() { link.removeAttribute("selected"); }
	
	if (!iui.busy)
	{
		iui.busy = true;
		link.setAttribute("selected", "true");
		// We need to check for backlinks here like in showPageID()
		// That backlink functionality needs to be in here somewhere
		iui.showPage($(link.hash.substr(1)));
		setTimeout(unselect, 500);
	}
}

function followAjax(link, replaceLink)
{
	function unselect() { link.removeAttribute("selected"); }

	if (!iui.busy)
	{
		iui.busy = true;
		link.setAttribute("selected", "progress");
		iui.showPageByHref(link.href, null, "GET", replaceLink, unselect);	
	}
}

function sendEvent(type, node, props)
{
    if (node)
    {
        var event = document.createEvent("UIEvent");
        event.initEvent(type, false, false);  // no bubble, no cancel
        if (props)
        {
            for (i in props)
            {
                event[i] = props[i];
            }
        }
        node.dispatchEvent(event);
    }
}

function getPageFromLoc()
{
	var page;
	var result = location.hash.match(/#_([^\?_]+)/);
	if (result)
		page = result[1];
	if (page)
		page = $(page);
	return page;
}

function orientChangeHandler()
{
	var orientation=window.orientation;
	switch(orientation)
	{
	case 0:
		setOrientation(portraitVal);
		break;	
		
	case 90:
	case -90: 
		setOrientation(landscapeVal);
		break;
	}
}


function checkOrientAndLocation()
{
	if (!hasOrientationEvent)
	{
	  if ((window.innerWidth != currentWidth) || (window.innerHeight != currentHeight))
	  {	  
		  currentWidth = window.innerWidth;
		  currentHeight = window.innerHeight;
		  var orient = (currentWidth < currentHeight) ? portraitVal : landscapeVal;
		  setOrientation(orient);
	  }
	}

	if (location.hash != currentHash)
	{
		var pageId = location.hash.substr(hashPrefix.length);
		iui.showPageById(pageId);
	}
}

function setOrientation(orient)
{
	document.body.setAttribute("orient", orient);
//  Set class in addition to orient attribute:
	if (orient == portraitVal)
	{
		iui.removeClass(document.body, landscapeVal);
		iui.addClass(document.body, portraitVal);
	}
	else if (orient == landscapeVal)
	{
		iui.removeClass(document.body, portraitVal);
		iui.addClass(document.body, landscapeVal);
	}
	else
	{
		iui.removeClass(document.body, portraitVal);
		iui.removeClass(document.body, landscapeVal);
	}
	setTimeout(scrollTo, 100, 0, 1);
}

function showDialog(page)
{
	currentDialog = page;
	page.setAttribute("selected", "true");
	
	if (hasClass(page, "dialog"))
		showForm(page);
}

function showForm(form)
{
	form.onsubmit = function(event)
	{
//  submitForm and preventDefault are called in the click handler
//  when the user clicks the submit a.button
// 
		event.preventDefault();
		submitForm(form);
	};
	
	form.onclick = function(event)
	{
// Why is this code needed?  cancelDialog is called from
// the click hander.  When will this be called?
		if (event.target == form && hasClass(form, "dialog"))
			cancelDialog(form);
	};
}

function cancelDialog(form)
{
	form.removeAttribute("selected");
}

function updatePage(page, fromPage)
{
	if (!page.id)
		page.id = "__" + (++newPageCount) + "__";

	location.hash = currentHash = hashPrefix + page.id;
	pageHistory.push(page.id);

	var pageTitle = $("pageTitle");
	if (page.title)
		pageTitle.innerHTML = page.title;
	var ttlClass = page.getAttribute("ttlclass");
	pageTitle.className = ttlClass ? ttlClass : "";

	if (page.localName.toLowerCase() == "form" && !page.target)
		showForm(page);
		
	var backButton = $("backButton");
	if (backButton)
	{
		var prevPage = $(pageHistory[pageHistory.length-2]);
		if (prevPage && !page.getAttribute("hideBackButton"))
		{
			backButton.style.display = "inline";
			backButton.innerHTML = prevPage.title ? prevPage.title : "Back";
			var bbClass = prevPage.getAttribute("bbclass");
			backButton.className = (bbClass) ? 'button ' + bbClass : 'button';
		}
		else
			backButton.style.display = "none";
	}
	iui.busy = false;
}
/*
events:
Both panels involved in a slide animation receive `beforetransition` and
`aftertransition` events. The panel being navigated from receives event
parameters `{ out :true }`, the panel being navigated to receives `{ out: false }`.
*/
function slidePages(fromPage, toPage, backwards)
{		 
	var axis = (backwards ? fromPage : toPage).getAttribute("axis");

	clearInterval(checkTimer);
	
	sendEvent("beforetransition", fromPage, {out:true});
	sendEvent("beforetransition", toPage, {out:false});
	if (canDoSlideAnim() && axis != 'y')
	{
	  slide2(fromPage, toPage, backwards, slideDone);
	}
	else
	{
	  slide1(fromPage, toPage, backwards, axis, slideDone);
	}

	function slideDone()
	{
	  if (!hasClass(toPage, "dialog"))
		  fromPage.removeAttribute("selected");
	  checkTimer = setInterval(checkOrientAndLocation, 300);
	  setTimeout(updatePage, 0, toPage, fromPage);
	  fromPage.removeEventListener('webkitTransitionEnd', slideDone, false);
	  sendEvent("aftertransition", fromPage, {out:true});
      sendEvent("aftertransition", toPage, {out:false});
	  if (backwards) sendEvent("unload", fromPage);	// EVENT: UNLOAD
	}
}

function canDoSlideAnim()
{
  return (iui.animOn) && (typeof WebKitCSSMatrix == "object");
}

function slide1(fromPage, toPage, backwards, axis, cb)
{
	if (axis == "y")
		(backwards ? fromPage : toPage).style.top = "100%";
	else
		toPage.style.left = "100%";

	scrollTo(0, 1);
	toPage.setAttribute("selected", "true");
	var percent = 100;
	slide();
	var timer = setInterval(slide, slideInterval);

	function slide()
	{
		percent -= slideSpeed;
		if (percent <= 0)
		{
			percent = 0;
			clearInterval(timer);
			cb();
		}
	
		if (axis == "y")
		{
			backwards
				? fromPage.style.top = (100-percent) + "%"
				: toPage.style.top = percent + "%";
		}
		else
		{
			fromPage.style.left = (backwards ? (100-percent) : (percent-100)) + "%"; 
			toPage.style.left = (backwards ? -percent : percent) + "%"; 
		}
	}
}


function slide2(fromPage, toPage, backwards, cb)
{
	toPage.style.webkitTransitionDuration = '0ms'; // Turn off transitions to set toPage start offset
	// fromStart is always 0% and toEnd is always 0%
	// iPhone won't take % width on toPage
	var toStart = 'translateX(' + (backwards ? '-' : '') + window.innerWidth +	'px)';
	var fromEnd = 'translateX(' + (backwards ? '100%' : '-100%') + ')';
	toPage.style.webkitTransform = toStart;
	toPage.setAttribute("selected", "true");
	toPage.style.webkitTransitionDuration = '';	  // Turn transitions back on
	function startTrans()
	{
		fromPage.style.webkitTransform = fromEnd;
		toPage.style.webkitTransform = 'translateX(0%)'; //toEnd
	}
	fromPage.addEventListener('webkitTransitionEnd', cb, false);
	setTimeout(startTrans, 0);
}

function preloadImages()
{
	var preloader = document.createElement("div");
	preloader.id = "preloader";
	document.body.appendChild(preloader);
}

function submitForm(form)
{
 	if (!iui.busy)
	{
		iui.busy = true;
		iui.addClass(form, "progress");
		iui.showPageByHref(form.action, encodeForm(form), form.method || "GET", null, clear);
	}
    function clear() {   iui.removeClass(form, "progress"); }
}

function encodeForm(form)
{
	function encode(inputs)
	{
		for (var i = 0; i < inputs.length; ++i)
		{
	        if (inputs[i].name)
		        args[inputs[i].name] = inputs[i].value;
		}
	}

    var args = {};
    encode(form.getElementsByTagName("input"));
    encode(form.getElementsByTagName("textarea"));
    encode(form.getElementsByTagName("select"));
    encode(form.getElementsByTagName("button"));
    return args;	  
}

function findParent(node, localName)
{
	while (node && (node.nodeType != 1 || node.localName.toLowerCase() != localName))
		node = node.parentNode;
	return node;
}

function hasClass(self, name)
{
	return iui.hasClass(self,name);
}

function replaceElementWithFrag(replace, frag)
{
	var page = replace.parentNode;
	var parent = replace;
	while (page.parentNode != document.body)
	{
		page = page.parentNode;
		parent = parent.parentNode;
	}
	page.removeChild(parent);

    var docNode;
	while (frag.firstChild) {
		docNode = page.appendChild(frag.firstChild);
		sendEvent("afterinsert", document.body, {insertedNode:docNode});
    }
	sendEvent("afterinsertend", document.body, {fragment:frag})
}

function $(id) { return document.getElementById(id); }
function ddd() { console.log.apply(console, arguments); }

})();


(function(){var _1=20;var _2=0;var _3=30000;var _4=null;var _5=null;var _6=0;var _7=0;var _8=location.hash;var _9="#_";var _a=[];var _b=0;var _c;var _d=false;var _e="portrait";var _f="landscape";window.iui={busy:false,animOn:true,ajaxErrHandler:null,httpHeaders:{"X-Requested-With":"XMLHttpRequest"},showPage:function(_10,_11){if(_10){if(_10==_4){console.log("page = currentPage = "+_10.id);iui.busy=false;return;}if(_5){_5.removeAttribute("selected");sendEvent("blur",_5);_5=null;}if(hasClass(_10,"dialog")){iui.busy=false;sendEvent("focus",_10);showDialog(_10);}else{sendEvent("load",_10);var _12=_4;sendEvent("blur",_4);_4=_10;sendEvent("focus",_10);if(_12){setTimeout(slidePages,0,_12,_10,_11);}else{updatePage(_10,_12);}}}},showPageById:function(_13){var _14=$(_13);if(_14){if(!iui.busy){iui.busy=true;var _15=_a.indexOf(_13);var _16=_15!=-1;if(_16){_a.splice(_15);}iui.showPage(_14,_16);}}},goBack:function(){if(!iui.busy){iui.busy=true;_a.pop();var _17=_a.pop();var _18=$(_17);iui.showPage(_18,true);}},replacePage:function(_19){var _1a=$(_19);if(_1a){if(!iui.busy){iui.busy=true;var _1b=_a.indexOf(_19);var _1c=_1b!=-1;if(_1c){console.log("error: can't replace page with ancestor");}_a.pop();iui.showPage(_1a,false);}}},showPageByHrefExt:function(_1d,_1e,_1f,_20,cb){if(!iui.busy){iui.busy=true;iui.showPageByHref(_1d,_1e,_1f,_20,cb);}},showPageByHref:function(_22,_23,_24,_25,cb){function spbhCB(xhr){console.log("xhr.readyState = "+xhr.readyState);if(xhr.readyState==4){if((xhr.status==200||xhr.status==0)&&!xhr.aborted){var _28=document.createElement("div");_28.innerHTML=xhr.responseText;sendEvent("beforeinsert",document.body,{fragment:_28});if(_25){replaceElementWithFrag(_25,_28);iui.busy=false;}else{iui.insertPages(_28);}}else{iui.busy=false;if(iui.ajaxErrHandler){iui.ajaxErrHandler("Error contacting server, please try again later");}}if(cb){setTimeout(cb,1000,true);}}}iui.ajax(_22,_23,_24,spbhCB);},ajax:function(url,_2a,_2b,cb){var xhr=new XMLHttpRequest();_2b=_2b?_2b.toUpperCase():"GET";if(_2a&&_2b=="GET"){url=url+"?"+iui.param(_2a);}xhr.open(_2b,url,true);if(cb){xhr.onreadystatechange=function(){cb(xhr);};}var _2e=null;if(_2a&&_2b!="GET"){xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");_2e=iui.param(_2a);}for(var _2f in iui.httpHeaders){xhr.setRequestHeader(_2f,iui.httpHeaders[_2f]);}xhr.send(_2e);xhr.requestTimer=setTimeout(ajaxTimeout,_3);return xhr;function ajaxTimeout(){try{xhr.abort();xhr.aborted=true;}catch(err){console.log(err);}}},param:function(o){var s=[];for(var key in o){s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(o[key]);}return s.join("&").replace(/%20/g,"+");},insertPages:function(_33){var _34=_33.childNodes;var _35;for(var i=0;i<_34.length;++i){var _37=_34[i];if(_37.nodeType==1){if(!_37.id){_37.id="__"+(++_b)+"__";}var _38=$(_37.id);var _39;if(_38){_38.parentNode.replaceChild(_37,_38);_39=$(_37.id);}else{_39=document.body.appendChild(_37);}sendEvent("afterinsert",document.body,{insertedNode:_39});if(_37.getAttribute("selected")=="true"||!_35){_35=_37;}--i;}}sendEvent("afterinsertend",document.body,{fragment:_33});if(_35){iui.showPage(_35);}},getSelectedPage:function(){for(var _3a=document.body.firstChild;_3a;_3a=_3a.nextSibling){if(_3a.nodeType==1&&_3a.getAttribute("selected")=="true"){return _3a;}}},getAllViews:function(){return document.querySelectorAll("body > *:not(.toolbar)");},isNativeUrl:function(_3b){for(var i=0;i<iui.nativeUrlPatterns.length;i++){if(_3b.match(iui.nativeUrlPatterns[i])){return true;}}return false;},nativeUrlPatterns:[new RegExp("^http://maps.google.com/maps?"),new RegExp("^mailto:"),new RegExp("^tel:"),new RegExp("^http://www.youtube.com/watch\\?v="),new RegExp("^http://www.youtube.com/v/"),new RegExp("^javascript:"),],hasClass:function(_3d,_3e){var re=new RegExp("(^|\\s)"+_3e+"($|\\s)");return re.exec(_3d.getAttribute("class"))!=null;},addClass:function(_40,_41){if(!iui.hasClass(_40,_41)){_40.className+=" "+_41;}},removeClass:function(_42,_43){if(iui.hasClass(_42,_43)){var reg=new RegExp("(\\s|^)"+_43+"(\\s|$)");_42.className=_42.className.replace(reg," ");}}};addEventListener("load",function(_45){var _46=iui.getSelectedPage();var _47=getPageFromLoc();if(_46){iui.showPage(_46);}if(_47&&(_47!=_46)){iui.showPage(_47);}setTimeout(preloadImages,0);if(typeof window.onorientationchange=="object"){window.onorientationchange=orientChangeHandler;_d=true;setTimeout(orientChangeHandler,0);}setTimeout(checkOrientAndLocation,0);_c=setInterval(checkOrientAndLocation,300);},false);addEventListener("unload",function(_48){return;},false);addEventListener("click",function(_49){var _4a=findParent(_49.target,"a");if(_4a){function unselect(){_4a.removeAttribute("selected");}if(_4a.href&&_4a.hash&&_4a.hash!="#"&&!_4a.target){followAnchor(_4a);}else{if(_4a==$("backButton")){iui.goBack();}else{if(_4a.getAttribute("type")=="submit"){var _4b=findParent(_4a,"form");if(_4b.target=="_self"){_4b.submit();return;}submitForm(_4b);}else{if(_4a.getAttribute("type")=="cancel"){cancelDialog(findParent(_4a,"form"));}else{if(_4a.target=="_replace"){followAjax(_4a,_4a);}else{if(iui.isNativeUrl(_4a.href)){return;}else{if(_4a.target=="_webapp"){location.href=_4a.href;}else{if(!_4a.target&&_4a.href){followAjax(_4a,null);}else{return;}}}}}}}}_49.preventDefault();}},true);addEventListener("click",function(_4c){var div=findParent(_4c.target,"div");if(div&&hasClass(div,"toggle")){div.setAttribute("toggled",div.getAttribute("toggled")!="true");_4c.preventDefault();}},true);function followAnchor(_4e){function unselect(){_4e.removeAttribute("selected");}if(!iui.busy){iui.busy=true;_4e.setAttribute("selected","true");iui.showPage($(_4e.hash.substr(1)));setTimeout(unselect,500);}}function followAjax(_4f,_50){function unselect(){_4f.removeAttribute("selected");}if(!iui.busy){iui.busy=true;_4f.setAttribute("selected","progress");iui.showPageByHref(_4f.href,null,"GET",_50,unselect);}}function sendEvent(_51,_52,_53){if(_52){var _54=document.createEvent("UIEvent");_54.initEvent(_51,false,false);if(_53){for(i in _53){_54[i]=_53[i];}}_52.dispatchEvent(_54);}}function getPageFromLoc(){var _55;var _56=location.hash.match(/#_([^\?_]+)/);if(_56){_55=_56[1];}if(_55){_55=$(_55);}return _55;}function orientChangeHandler(){var _57=window.orientation;switch(_57){case 0:setOrientation(_e);break;case 90:case -90:setOrientation(_f);break;}}function checkOrientAndLocation(){if(!_d){if((window.innerWidth!=_6)||(window.innerHeight!=_7)){_6=window.innerWidth;_7=window.innerHeight;var _58=(_6<_7)?_e:_f;setOrientation(_58);}}if(location.hash!=_8){var _59=location.hash.substr(_9.length);iui.showPageById(_59);}}function setOrientation(_5a){document.body.setAttribute("orient",_5a);if(_5a==_e){iui.removeClass(document.body,_f);iui.addClass(document.body,_e);}else{if(_5a==_f){iui.removeClass(document.body,_e);iui.addClass(document.body,_f);}else{iui.removeClass(document.body,_e);iui.removeClass(document.body,_f);}}setTimeout(scrollTo,100,0,1);}function showDialog(_5b){_5=_5b;_5b.setAttribute("selected","true");if(hasClass(_5b,"dialog")){showForm(_5b);}}function showForm(_5c){_5c.onsubmit=function(_5d){_5d.preventDefault();submitForm(_5c);};_5c.onclick=function(_5e){if(_5e.target==_5c&&hasClass(_5c,"dialog")){cancelDialog(_5c);}};}function cancelDialog(_5f){_5f.removeAttribute("selected");}function updatePage(_60,_61){if(!_60.id){_60.id="__"+(++_b)+"__";}location.hash=_8=_9+_60.id;_a.push(_60.id);var _62=$("pageTitle");if(_60.title){_62.innerHTML=_60.title;}var _63=_60.getAttribute("ttlclass");_62.className=_63?_63:"";if(_60.localName.toLowerCase()=="form"&&!_60.target){showForm(_60);}var _64=$("backButton");if(_64){var _65=$(_a[_a.length-2]);if(_65&&!_60.getAttribute("hideBackButton")){_64.style.display="inline";_64.innerHTML=_65.title?_65.title:"Back";var _66=_65.getAttribute("bbclass");_64.className=(_66)?"button "+_66:"button";}else{_64.style.display="none";}}iui.busy=false;}function slidePages(_67,_68,_69){var _6a=(_69?_67:_68).getAttribute("axis");clearInterval(_c);sendEvent("beforetransition",_67,{out:true});sendEvent("beforetransition",_68,{out:false});if(canDoSlideAnim()&&_6a!="y"){slide2(_67,_68,_69,slideDone);}else{slide1(_67,_68,_69,_6a,slideDone);}function slideDone(){if(!hasClass(_68,"dialog")){_67.removeAttribute("selected");}_c=setInterval(checkOrientAndLocation,300);setTimeout(updatePage,0,_68,_67);_67.removeEventListener("webkitTransitionEnd",slideDone,false);sendEvent("aftertransition",_67,{out:true});sendEvent("aftertransition",_68,{out:false});if(_69){sendEvent("unload",_67);}}}function canDoSlideAnim(){return (iui.animOn)&&(typeof WebKitCSSMatrix=="object");}function slide1(_6b,_6c,_6d,_6e,cb){if(_6e=="y"){(_6d?_6b:_6c).style.top="100%";}else{_6c.style.left="100%";}scrollTo(0,1);_6c.setAttribute("selected","true");var _70=100;slide();var _71=setInterval(slide,_2);function slide(){_70-=_1;if(_70<=0){_70=0;clearInterval(_71);cb();}if(_6e=="y"){_6d?_6b.style.top=(100-_70)+"%":_6c.style.top=_70+"%";}else{_6b.style.left=(_6d?(100-_70):(_70-100))+"%";_6c.style.left=(_6d?-_70:_70)+"%";}}}function slide2(_72,_73,_74,cb){_73.style.webkitTransitionDuration="0ms";var _76="translateX("+(_74?"-":"")+window.innerWidth+"px)";var _77="translateX("+(_74?"100%":"-100%")+")";_73.style.webkitTransform=_76;_73.setAttribute("selected","true");_73.style.webkitTransitionDuration="";function startTrans(){_72.style.webkitTransform=_77;_73.style.webkitTransform="translateX(0%)";}_72.addEventListener("webkitTransitionEnd",cb,false);setTimeout(startTrans,0);}function preloadImages(){var _78=document.createElement("div");_78.id="preloader";document.body.appendChild(_78);}function submitForm(_79){if(!iui.busy){iui.busy=true;iui.addClass(_79,"progress");iui.showPageByHref(_79.action,encodeForm(_79),_79.method||"GET",null,clear);}function clear(){iui.removeClass(_79,"progress");}}function encodeForm(_7a){function encode(_7b){for(var i=0;i<_7b.length;++i){if(_7b[i].name){args[_7b[i].name]=_7b[i].value;}}}var _7d={};encode(_7a.getElementsByTagName("input"));encode(_7a.getElementsByTagName("textarea"));encode(_7a.getElementsByTagName("select"));encode(_7a.getElementsByTagName("button"));return _7d;}function findParent(_7e,_7f){while(_7e&&(_7e.nodeType!=1||_7e.localName.toLowerCase()!=_7f)){_7e=_7e.parentNode;}return _7e;}function hasClass(_80,_81){return iui.hasClass(_80,_81);}function replaceElementWithFrag(_82,_83){var _84=_82.parentNode;var _85=_82;while(_84.parentNode!=document.body){_84=_84.parentNode;_85=_85.parentNode;}_84.removeChild(_85);var _86;while(_83.firstChild){_86=_84.appendChild(_83.firstChild);sendEvent("afterinsert",document.body,{insertedNode:_86});}sendEvent("afterinsertend",document.body,{fragment:_83});}function $(id){return document.getElementById(id);}function ddd(){console.log.apply(console,arguments);}})();

/*
 * 【注意】
 * navigator.network.isReachable は PhoneGapバージョンアップで廃止された
 */
/*******************************************************************************
 * 0.0.1 2012/03/06 初期リリース
 * 0.0.2 2012/03/09 次の宿場まで○km
 * 0.0.3 2012/03/17 カレンダーのkm表示改善
 *                  幅の広い端末で東海道53次のバーの表示がおかしかったのを修正
 * 0.0.4 2012/03/19 (非公開)
 *                  ログにバージョン表記を追加
 *                  高解像度端末の操作性を改善
 * 0.0.5 2012/03/20 (公開バージョン)バージョンアップチェックのため
 * 0.0.6 2012/03/22 (非公開) 
 *                  地図機能追加
 *                  zeptoを削除
 * 0.0.7 2012/03/22 (公開バージョン)バージョンアップチェックのため
 * 0.0.8 2012/03/26 (非公開) 
 *                  iOS対応のため広告の target="_blank" とする
 *                  パネルの高さ調整
 * 0.0.9 2012/03/26 (公開バージョン)バージョンアップチェックのため
 * 0.1.0 2012/04/07 (非公開) 
 *                  高解像度のときのBackボタンの大きさ変更
 *                  ↑うまく行かずあきらめ（Backボタンがうまくいかない）
 *                  高解像度対応をzoomで行うようにする
 *       2012/04/08 低解像度のまちみえーるアイコンを小さくする
 *                  バランスが悪いので却下（iPhone対応はzoomを検討？）
 *                  起動時のログ（追加／上書き）の判断をlocalStorageで行うようにする
 *                  (起動速度改善)
 * 0.1.1 2012/04/10 (非公開)
 *                  0.1.0の対応では起動速度が改善しないので、ログを切り替える方式に変更
 * 0.1.2 2012/04/12 (公開バージョン)バージョンアップチェックのため
 * 0.1.3 2012/06/09 (非公開)移行機能を実装
 * 0.1.4 2012/06/10 (公開バージョン)バージョンアップチェックのため
 * 0.1.5 2012/06/13 Android4.0.4対応
 * 0.1.6 2012/06/15 レイアウト調整
 * 0.1.7 2012/06/17 多くの端末で表示できるようにレイアウト調整
 * 0.1.8 2012/09/21 Monaca新バージョンにアップグレード
 *                  東海道53次の進捗バーの幅を画面幅に合わせた
 * 0.1.9 2012/09/23 テキスト出力のbug対応除去
 * 0.2.0 2012/10/02 広告を小さくし、レイアウトを調整
 *                  Yahoo!地図への接続チェックを一新
 * 0.2.1 2012/10/07 広告表示にChildBrowserを使用
 * 0.2.2 2012/10/08 Shareプラグインで歩行記録共有
 * 0.2.3 2012/10/08 Shareプラグインでただいまの歩行記録共有
 * 0.2.4 2012/10/27 東海道53次に地図追加（透明画像の上書きを検討？）
 * 0.2.5 2012/10/27 0.2.4でビルドしすぎたので
 * 0.2.6 2012/12/12 安定版ビルド
 * 0.2.7 2013/03/10 GPSワープ対応（時速10Kmを超えたら、間引きするようにした）
 * 0.2.8 2013/03/14 GPSワープがあったことを _ で知らせる（隠し機能っぽいな）
 * 0.2.9 2013/03/15 0.2.8 のバグ修正（判断が反対だった）
 * 0.3.0 2013/03/23 ワープをログに記録するようにした
 * 0.3.1 2013/03/24 ワープ判断を時速20Kmに訂正
 * 0.3.2 2013/03/26 始点/終点がワープしたときに対応
 ******************************************************************************/
window.addEventListener("load", function() {
    //PhoneGapロード完了になったときに onDeviceReady 関数を呼ぶようにする
    document.addEventListener("deviceready", onDeviceReady, false);
});
//共通変数(ログ用)
var VERSION = "0.3.2";
var LOGFILE_PREFIX = "letswalk";
var LOG_NUMBER_MAX = 3;
var LOG_NUMBER_KEY = "LOG_NUMBER";

var logFile;
//var seekPos;
var logWriter;
//readyState = 1(WRITING)のため書き込めなかったメッセージ
var writeMiss = [];
///////////////////////////////////////////////////
//共通変数
//最大許容誤差(この値まで許容)
var MAX_ACC = 25;
//var MAX_ACC = 200;
//GPS監視ID
var watchId;
//自動終了日時(文字列)
var auto_end_date;
//GPS結果保存配列
var records = [];
//間引き後
var recordsCompress = [];
//記録開始・終了
var dateStart;
var dateEnd;
//計測の最大間隔
var maxDistance;
//localStorageキー(LOG_NUMBER_KEYもある)
//初回記録を記録する
var KEY_FIRST = "LWFirst";
//年月キーの接頭辞（デバッガーでlocalStorageが混在するため）
var MONTH_KEY_PREFIX = "LW";
//移行データを保管するキー
var MIGRATION_KEY = MONTH_KEY_PREFIX + "2012/01";
//移行データの日付
var MIGRATION_DATE = new Date(2012,0,1);
//カレンダーオプション
var optEvents;
var optHeader;
var optTitleFormat;
var optDayNamesShort;
var optButtonText;
//イベント配列
var dateEvents;
//タイマーID
var timerID;

//マージン
var TOP_MARGIN = 10;
var LEFT_MARGIN = 5;
//キャンバスの高さ
var CANVAS_HEIGHT = 50;
//キャンバス
var canvas;
//コンテキスト
var ctx;
//タイマーバーの幅
var barwidth;
//端末の幅
var screenWidth;
//東海道53次全長
var DISTANCE_ALL = 495500;
//東海道53次配列
var TOUKAIDOU =
            [
                {station : "日本橋", distance : 0, lat : 35.684406, lon : 139.774368},
                {station : "品川", distance : 7900, lat : 35.61853, lon : 139.743683},
                {station : "川崎", distance : 17700, lat : 35.533749, lon : 139.704605},
                {station : "神奈川", distance : 27500, lat : 35.47245, lon : 139.63179},
                {station : "保土ヶ谷", distance : 32400, lat : 35.444115, lon : 139.595718},
                {station : "戸塚", distance : 41200, lat : 35.397446, lon : 139.530502},
                {station : "藤沢", distance : 49100, lat : 35.347675, lon : 139.482834},
                {station : "平塚", distance : 62800, lat : 35.327545, lon : 139.337814},
                {station : "大磯", distance : 65800, lat : 35.309566, lon : 139.315445},
                {station : "小田原", distance : 81500, lat : 35.248475, lon : 139.160683},
                {station : "箱根", distance : 98100, lat : 35.19236, lon : 139.026169},
                {station : "三島", distance : 112900, lat : 35.1194, lon : 138.91481},
                {station : "沼津", distance : 118800, lat : 35.09869, lon : 138.859375},
                {station : "原", distance : 124700, lat : 35.125198, lon : 138.797974},
                {station : "吉原", distance : 136500, lat : 35.162071, lon : 138.688354},
                {station : "蒲原", distance : 147700, lat : 35.120022, lon : 138.605621},
                {station : "油井", distance : 151600, lat : 35.107853, lon : 138.567612},
                {station : "興津", distance : 160800, lat : 35.047001, lon : 138.514465},
                {station : "江尻", distance : 164900, lat : 35.018875, lon : 138.484177},
                {station : "府中", distance : 175500, lat : 34.976669, lon : 138.383453},
                {station : "丸子", distance : 181200, lat : 34.949291, lon : 138.341461},
                {station : "岡部", distance : 189000, lat : 34.918903, lon : 138.282623},
                {station : "藤枝", distance : 195800, lat : 34.872913, lon : 138.258942},
                {station : "島田", distance : 204500, lat : 34.832901, lon : 138.175903},
                {station : "金谷", distance : 208400, lat : 34.8228, lon : 138.128723},
                {station : "新坂", distance : 215000, lat : 34.80463, lon : 138.075668},
                {station : "掛川", distance : 222100, lat : 34.773026, lon : 138.015717},
                {station : "袋井", distance : 231700, lat : 34.748947, lon : 137.925339},
                {station : "見付", distance : 237600, lat : 34.726967, lon : 137.856979},
                {station : "浜松", distance : 254000, lat : 34.711369, lon : 137.725357},
                {station : "舞坂", distance : 265000, lat : 34.68454, lon : 137.608963},
                {station : "新居", distance : 270800, lat : 34.694458, lon : 137.561249},
                {station : "白須賀", distance : 277400, lat : 34.688656, lon : 137.500961},
                {station : "二川", distance : 283200, lat : 34.723434, lon : 137.449844},
                {station : "吉田", distance : 289300, lat : 34.769077, lon : 137.394073},
                {station : "御油", distance : 299500, lat : 34.844791, lon : 137.318542},
                {station : "赤坂", distance : 301300, lat : 34.856346, lon : 137.307327},
                {station : "藤川", distance : 310100, lat : 34.911491, lon : 137.221298},
                {station : "岡崎", distance : 316800, lat : 34.957802, lon : 137.160461},
                {station : "知立", distance : 331800, lat : 35.008263, lon : 137.041107},
                {station : "鳴海", distance : 342900, lat : 35.081322, lon : 136.950241},
                {station : "熱田", distance : 349400, lat : 35.12521, lon : 136.910629},
                {station : "桑名", distance : 376900, lat : 35.067097, lon : 136.698761},
                {station : "四日市", distance : 389600, lat : 34.967358, lon : 136.624451},
                {station : "石薬師", distance : 400400, lat : 34.89846, lon : 136.548492},
                {station : "庄野", distance : 403100, lat : 34.884178, lon : 136.52562},
                {station : "亀山", distance : 411000, lat : 34.8682365, lon : 136.459427},
                {station : "関", distance : 416900, lat : 34.852295, lon : 136.393234},
                {station : "坂之下", distance : 423400, lat : 34.889084, lon : 136.353271},
                {station : "土山", distance : 433200, lat : 34.934895, lon : 136.282394},
                {station : "水口", distance : 443800, lat : 34.970078, lon : 136.165604},
                {station : "石部", distance : 457500, lat : 35.010303, lon : 136.054031},
                {station : "草津", distance : 469300, lat : 35.01783, lon : 135.96022},
                {station : "大津", distance : 483700, lat : 35.006039, lon : 135.861511},
                {station : "三条大橋", distance : 495500, lat : 35.00906, lon : 135.77182}
            ];
//入力データ
var inputData;
//ウインドウの大きさを取得
var screenWidth;
var screenHeight;
//ワープがあったら"_"になる
var existsWarp = "";

//Androidか否かの判断
var isAndroid = function() {
    return !!navigator.userAgent.match(/Android|dream|CUPCAKE/);
};
//Shareする歩行記録
shareWalkRecords = [];

//PhoneGapロード完了になったときに呼ばれる処理
function onDeviceReady() {
    //ログ
    console.log("start(" + VERSION + ")");
    //ウインドウの大きさを取得
    screenWidth = screen.width;
    screenHeight = screen.height;
    console.log(
        "screen.width = " + screenWidth + ",screen.height = " + screenHeight + ", " +
        "device.name = " + device.name + ", " +
        "device.platform = " + device.platform + ", " +
        "device.version = "  + device.version + ", " +
        "window.devicePixelRatio = " + window.devicePixelRatio
        );
    //viewportを追加
    var meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    var content = 'initial-scale=1.0, minimum-scale=1.0, ' +
                'maximum-scale=1.0, width=device-width, user-scalable=0';
    content = content + ',target-densitydpi=medium-dpi';
    meta.setAttribute('content', content);
    document.getElementsByTagName('head')[0].appendChild(meta);
    //height,width調整の準備
    var multiplier;
    if (device.platform == "iPhone" || device.platform == "iPad" ||
        (device.platform == "Android" && device.version.substring(0,3) == "2.3")) {
        //iPadはscreen.width等が調整済みで返ってくる
        //Android2.3も同様
        //たぶんiPhoneも同様
        multiplier = 1;
    } else {
        multiplier = 1 / window.devicePixelRatio;
    }
    //panelのmin-height調整
    var minHeight = screenHeight * multiplier - 45; //45はツールバーの高さ
    //mapの高さ調整(height - 60)
    var mapHeight = screenHeight * multiplier - 60;
    //Android4.0はソフトキー領域、通知領域を考慮する必要あり
    if (device.platform == "Android" && device.version >= "4.0.0") {
        minHeight = minHeight - 70;
        mapHeight = mapHeight - 70;
    }
    //iPhone,iPadは通知領域を考慮する必要あり
    if (device.platform == "iPhone" || device.platform == "iPad") {
        minHeight = minHeight - 20;
        mapHeight = mapHeight - 20;
    }
    //Android2.1は通知領域を考慮する必要あり
    if (device.platform == "Android" && device.version.substring(0,3) == "2.1") {
        minHeight = minHeight - 20;
        mapHeight = mapHeight - 20;
    }
    //Android2.3はOK
    //Android2.2はOK(エミュレーターで確認)
    
    $(".panel").css("min-height", minHeight + "px");
    $("#yahooMap").css("height", mapHeight + "px");
    //mapの幅調整(width - 20)
    var mapWidth = screenWidth * multiplier - 20;
    $("#yahooMap").css("width", mapWidth + "px");

    //ファイルシステムを呼び出す
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
        onSuccessFileSystem, onFailFileSystem);
}
function onFailFileSystem(event) {
     alert(event.target.error.code);
}
//ファイルシステム呼び出し成功
function onSuccessFileSystem(fileSystem) {
    //rootディレクトリーからファイル取得
    var dirEntry = fileSystem.root;
    //ログファイル名作成
    var logFileName = crtLogFileName();
    dirEntry.getFile(logFileName, 
        {create: true, exclusive: false}, 
        onSuccessGetFile, onFailGetFile);
}
function crtLogFileName() {
    //localStorageから前回値取得
    var logNo = Number(localStorage.getItem(LOG_NUMBER_KEY));
    logNo = logNo + 1;
    if (logNo > LOG_NUMBER_MAX) {
        logNo = 1;
    }
    //localStorage書き込み
    localStorage.setItem(LOG_NUMBER_KEY,logNo);
    return LOGFILE_PREFIX + logNo + ".txt";
}

function onFailGetFile(error) {
    alert("Failed to retrieve file: " + error.code);
}
//getFile成功
function onSuccessGetFile(parent) {
    //FileWriter用にファイルエントリーを保存
    logFile = parent;
    //ファイルオブジェクト作成
    parent.file(onSuccessFile, onFailFile);
}
function onFailFile(error) {
    alert("Failed to file method: " + error.code);
}
//file成功
function onSuccessFile(file) {
/* 追加／上書きの判断変更
    var readText;
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        console.log("read success");
        //読み込んだ結果
        readText = evt.target.result;
        //最初の日付を判断し、上書きか、追記かを決定
        var logDate = readText.substr(0,10);
        if (logDate < _getYyyymmdd(new Date())) {
            seekPos = 0;
        } else {
            seekPos = file.size;
        }
        logFile.createWriter(onSuccessWriter, onFailWriter);
    };
    reader.readAsText(file);
*/
/*
    //localStorageから前回日付取得
    var prevDate= localStorage.getItem(KEY_PREV_DAY);
    if (prevDate == null) {
        prevDate = "";
    }
    //現在日付
    var nowDate = _getYyyymmdd(new Date());
    if (prevDate != nowDate) {
        //上書き
        seekPos = 0;
        //localStorage書き込み
        localStorage.setItem(KEY_PREV_DAY,nowDate);
    } else {
        //追記
        seekPos = file.size;
    }
*/
    logFile.createWriter(onSuccessWriter, onFailWriter);
}
function onFailWriter(error) {
    console.log("onFailWriter:" + error.code);
}
//writer成功
function onSuccessWriter(writer) {
    logWriter = writer;
//    writer.seek(seekPos);
    writer.seek(0);
    //アプリの初期化処理
    mainInit();    
}
//アプリの初期化処理
function mainInit() {
    //ShareプラグインはAndroid専用なので、Android以外は共有ボタンを隠す
    if (isAndroid()) {
        document.getElementById("shareButton").style.display = "block";
        document.getElementById("shareHelp").style.display = "block";
    }
    //トグルボタン表示
    document.getElementById("rec").style.display = "";
    _logWrite("Let's Walk(" + VERSION + ")開始しました。" + "\n" +
        "screen.width = " + screenWidth + ",screen.height = " + screenHeight + "\n" +
        "device.name = " + device.name + "\n" +
        "device.platform = " + device.platform + "\n" +
        "device.version = "  + device.version + "\n" +
        "window.devicePixelRatio = " + window.devicePixelRatio
        );
        canvas = document.getElementById('canvas');
    //キャンバスの幅を変更すると、表示がおかしくなるので、当面固定とする
//    canvas.style.width = width + "px";
    //2Dコンテキスト
    ctx = canvas.getContext('2d');
    //タイマーバーの幅設定
    barwidth = 300 - LEFT_MARGIN * 2;
    //Backボタンを隠す
    hideBackButton();
}

//終了時の処理
//書き込みできなかったメッセージを書き込む
function onUnload() {
    if (writeMiss.length == 0) {
        logWriter.write("---正常終了---\n");    
    } else {
        var lastMsg = "---busyで保留されたメッセージ---\n";
        for (var i = 0; i < writeMiss.length; i++) {
            lastMsg = lastMsg + writeMiss[i];
        }
        logWriter.write(lastMsg + "------\n");
    }
}
//ChildBrowser起動
function showPage() {
      window.plugins.childBrowser.showWebPage("http://www.machimie-ru.com/", { showLocationBar: true });
}

//Backボタンを隠す
function hideBackButton() {
    document.getElementById("home").setAttribute("hideBackButton", "true");
    document.getElementById("calendar").setAttribute("hideBackButton", "true");
    document.getElementById("toukaidou").setAttribute("hideBackButton", "true");
    document.getElementById("manual").setAttribute("hideBackButton", "true");
}

//記録トグルスイッチの処理
function toggleRec() {
    value = document.getElementById("rec").getAttribute('toggled');
    if (value == "true") {
        // 記録開始
        document.getElementById("accRow").style.display = "";
        gps();
    } else {
        // 記録終了
        document.getElementById("accRow").style.display = "none";
        endGps();
    }
}

// GPS監視開始
function gps(){
    //成功時の処理
    function onSuccess(p) {
        var lat = p.coords.latitude;
        var lon = p.coords.longitude;
        var acc = p.coords.accuracy;
        document.getElementById("acc").innerHTML="測定誤差(m):" + acc;
        if (dateStart == null) {
            dateStart = new Date();
            //ログ記録
            _logWrite("記録開始" + "\n" + 
                    _getYyyymmddhhmmssfff(new Date()) + "|" + 
                    lat + "," + lon + "," + acc);
        } else {
            //ログ記録
            _logWrite(lat + "," + lon + "," + acc);
        }
        //許容誤差のみ配列に記録
        if (acc <= MAX_ACC) {
            records.push({date : new Date(), lat : lat, lon : lon, acc : acc});
        }
        //自動終了日時を超えたら自動終了
        check_date = _getYyyymmddhhmmssfff(new Date());
        if (check_date > auto_end_date) {
            //ログ記録
            _logWrite("自動終了");
            document.getElementById("acc").innerHTML="自動終了";
            document.getElementById("rec").setAttribute('toggled',"false");
            //記録終了
            endGps();
        }
    }
    //失敗時の処理
    function onError(error) {
        //ログ記録
        _logWrite("位置取得失敗");
        //初回の失敗は記録終了、途中の失敗は無視する
        if (dateStart == null) {
            document.getElementById("acc").innerHTML="位置取得失敗";
            document.getElementById("rec").setAttribute('toggled',"false");
            //記録終了
            endGps();
        }
    }
    //初期化
    document.getElementById("acc").innerHTML="測定誤差(m):";
    //結果非表示
    document.getElementById("result").style.display = "none";
    document.getElementById("error").style.display = "none";
    document.getElementById("yahooMapButton").style.display = "none";
    document.getElementById("shareNowButton").style.display = "none";

    //自動終了日時(auto_end_date)作成
    var auto_end = new Date();
    auto_end.setHours(auto_end.getHours() + 1);
    auto_end_date = _getYyyymmddhhmmssfff(auto_end);
    //GPS結果保存配列初期化
    records = [];
    accMin = 99999999;
    dateStart = null;
    // GPS監視開始
    watchId = navigator.geolocation.watchPosition(onSuccess, onError, 
        { maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });    
    //ログ記録
    _logWrite("記録ON");
}

// 記録終了
function endGps() {
    navigator.geolocation.clearWatch(watchId);
    if (dateStart != null) {
        //ログ記録
        _logWrite("記録終了");
        console.log("記録終了");
        dateEnd = new Date();
        //結果解析
        analyze();
    }
}
//結果解析
function analyze() {
    var i;
    var j;
    var accs = [];
    existsWarp = "";
    //誤差を配列に抜き出す
    for (i = 0; i < records.length; i++) {
        var notFound = true;
        for (j = 0; j < accs.length; j++) {
            if (records[i].acc == accs[j]) {
                notFound = false;
                break;
            }
        }
        if (notFound) {
            accs.push(records[i].acc);
        }
    }
    //誤差の大きい方から間引き開始(最小誤差は間引きしない)
    if (accs.length > 1) {
        //数値の降順でソート
        accs.sort(compareDesc);
        for (j = 0; j < accs.length - 1; j++) {
            //両端はとりあえず間引きしない
            for (i = 1; i < records.length - 1; i++) {
                if (records[i].acc == accs[j]) {
                    if (_getNextDate(i).getTime() - 
                        _getPrevDate(i).getTime() < 15000) {
                        records[i].date = undefined;
                    }
                }
            }
        }
    }
/*
    //間引きを詰める
    recordsCompress = [];
    for (i = 0; i < records.length; i++) {
        if (records[i].date !== undefined) {
            recordsCompress.push(records[i]);
        }
    }
*/
    //間引きを詰める(1)
    recordsCompress1 = [];
    for (i = 0; i < records.length; i++) {
        if (records[i].date !== undefined) {
            recordsCompress1.push(records[i]);
        }
    }

    //ワープを間引き
    for (i = 1; i < recordsCompress1.length; i++) {
        var wkDistance2 =
        distance(recordsCompress1[i - 1].lat, 
                                recordsCompress1[i - 1].lon, 
                                recordsCompress1[i].lat, 
                                recordsCompress1[i].lon);
        var wkTime2 = recordsCompress1[i].date.getTime() -
                        recordsCompress1[i - 1].date.getTime();
        if (wkTime2 > 0) {
            //0.005555556 = 時速20Km
            if (wkDistance2 / wkTime2 > 0.005555556) {
                recordsCompress1[i-1].acc = undefined;
                recordsCompress1[i].acc = undefined;
                //記録
                var warpMsg = "【Warp!】" + recordsCompress1[i - 1].lat + "," + recordsCompress1[i - 1].lon + "," + 
                                recordsCompress1[i].lat + "," + recordsCompress1[i].lon + "," + 
                                "距離(m) = " + wkDistance2 + ",速度 = " + (wkDistance2 / wkTime2) * 3600;
                _logWrite(warpMsg);
            }
        }
    }
    
    //間引きを詰める(2)
    recordsCompress = [];
    for (i = 0; i < recordsCompress1.length; i++) {
        if (recordsCompress1[i].acc !== undefined) {
            recordsCompress.push(recordsCompress1[i]);
        } else {
            existsWarp = "_";
        }
    }

    //測定地点（間引き後）の数が 10 未満なら分析不能
    var minCount;
    minCount = 10;
    if (recordsCompress.length < minCount) {
        var errMsg = "測定地点の数が" + minCount + "未満(" + recordsCompress.length + ")";
        _logWrite(errMsg);
        //結果表示
        document.getElementById("error").style.display = "";
        document.getElementById("errormsg").innerHTML = errMsg;
        if (recordsCompress.length > 0) {
            document.getElementById("yahooMapButton").style.display = "block";
            if (isAndroid()) {
                document.getElementById("shareNowButton").style.display = "block";
            }
        }
        return;
    }

    //解析開始
    var dist = 0;
    //計測の最大間隔
    maxDistance = 0;
    for (i = 1; i < recordsCompress.length; i++) {
        var wkDistance =
        distance(recordsCompress[i - 1].lat, 
                                recordsCompress[i - 1].lon, 
                                recordsCompress[i].lat, 
                                recordsCompress[i].lon);
        //テスト用        
        console.log("wkDistance = " + wkDistance);
        dist = dist + wkDistance;
        maxDistance = Math.max(maxDistance,
                        recordsCompress[i].date.getTime() -
                        recordsCompress[i - 1].date.getTime());
    }
    //計測時間（開始・終了）
    var timStart = recordsCompress[0].date;
    var timEnd = recordsCompress[recordsCompress.length - 1].date;
    //経過時間（ミリ秒）
    var time1 = timEnd.getTime() - timStart.getTime();
    //平均速度（m/ミリ秒）
    var ave1 = 0;
    if (time1 > 0) {
        ave1 = dist / time1;
    }
    //距離補正
    var dist2 = dist +
                (timStart.getTime() - dateStart.getTime()) * ave1 +
                (dateEnd.getTime() - timEnd.getTime()) * ave1;
    //歩行時間(分)
    var miliSec = dateEnd.getTime() - dateStart.getTime();
    var walkMin = Math.round(miliSec / 60000);
    //平均時速
    var kmPh = Math.round(dist2 / 100 / (walkMin / 60)) / 10;
    //localStorage初回記録(記録開始を記録)
    _recFirst(_getYyyymmddhhmmssfff(dateStart));
    //記録オブジェクト作成
    //Dateオブジェクトはparseで復元できないため、文字列に整形して保管
    var objRec =    {
                    recStart : _getYyyymmddhhmmssfff(dateStart),
                    measurementStart : _getYyyymmddhhmmssfff(timStart),
                    measurementEnd : _getYyyymmddhhmmssfff(timEnd),
                    recEnd : _getYyyymmddhhmmssfff(dateEnd),
                    measurementCount : recordsCompress.length,
                    measurementMaxInterval : Math.round(maxDistance / 1000),
                    walkMin : walkMin,
                    walkDistance : Math.round(dist2),
                    kmPh : kmPh
                    };
    //localStorageに記録
    _recWalk(dateStart, objRec);
    //結果メッセージ（ログ用）
    var logMsg = "解析結果" +"\n" +
                "記録開始 = " + _getYyyymmddhhmmssfff(dateStart) +"\n" +
                "計測開始 = " + _getYyyymmddhhmmssfff(timStart) +"\n" +
                "計測終了 = " + _getYyyymmddhhmmssfff(timEnd) +"\n" +
                "記録終了 = " + _getYyyymmddhhmmssfff(dateEnd) +"\n" +
                "計測地点の数 = " + recordsCompress.length + "\n" +
                "計測の最大間隔 = " + Math.round(maxDistance / 1000) + "秒" + "\n" +
                "歩行時間 = " + walkMin + "分" +"\n" +
                "歩行距離 = " + Math.round(dist2) + "m" +"\n" +
                "平均時速 = " + kmPh + "km/h";
    //ログ記録
    _logWrite(logMsg);
    //結果表示
    document.getElementById("result").style.display = "";
    document.getElementById("msg1").innerHTML = walkMin + "分" + existsWarp;
    document.getElementById("msg2").innerHTML = Math.round(dist2) + "m" + existsWarp;
    document.getElementById("msg3").innerHTML = kmPh + "km/h" + existsWarp;
    document.getElementById("yahooMapButton").style.display = "";
    if (isAndroid()) {
        document.getElementById("shareNowButton").style.display = "block";
    }
}
//数値の降順でソートさせる関数
function compareDesc(a, b) { 
    return (b - a);
}
//records[i]の直前のdateを求める
//undefinedを考慮する
function _getPrevDate(i) {
    for (var k = i - 1; k >= 0; k--) {
        if (records[k].date !== undefined) {
            return records[k].date;
        }
    }
}
//records[i]の直後のdateを求める
//undefinedを考慮する
function _getNextDate(i) {
    for (var k = i + 1; k < records.length; k++) {
        if (records[k].date !== undefined) {
            return records[k].date;
        }
    }
}

//////////////////////////////////////////////////////////////////////////////
//カレンダー作成
function crtCalendar() {
    $('#walkCalendar').empty();
    //カレンダーオプション作成
    crtOption();
    //イベントプロパティー作成
    crtEvents();
    //カレンダー表示
    //カレンダーが表示されないことがあることへの対応
    //タイマー起動(100ミリ秒後に再描画)
    timerID = setTimeout( function () { displayCalendar(); }, 100);
}
//カレンダーオプション作成
function crtOption() {
    optHeader = {
                left : 'prev',
                center : 'title',
                right : 'next'
                };
    optTitleFormat = {month:'yyyy年 M月'};
    optDayNamesShort = ['日','月','火','水','木','金','土'];
    optButtonText = {
                    prev: '&lt;',
                    next: '&gt;'
                    }
}
//イベントプロパティー作成
function crtEvents() {
    shareWalkRecords = []; //共有する歩行記録
    optEvents = [];
    for(var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.substr(0,2) == MONTH_KEY_PREFIX) {
            if ((key != KEY_FIRST) && (key != LOG_NUMBER_KEY)) {
                var item = localStorage.getItem(key);
                if (item != null) {
                    var walkRecords = JSON.parse(item);
                    if (walkRecords.length > 0) {
                        var walkDate = walkRecords[0].recStart.substr(0,10);
                        var walkDistance = 0;
                        var walkDateNew = null;
                        var optTitle;
                        var opt;
                        for (var j = 0; j < walkRecords.length; j++) {
                            //共有する歩行記録を作成
                            shareWalkRecords.push(walkRecords[j]);
                            walkDateNew = walkRecords[j].recStart.substr(0,10);
                            if (walkDate == walkDateNew) {
                                walkDistance = walkDistance + walkRecords[j].walkDistance;
                            } else {
//                                optTitle = Math.round(walkDistance / 100) / 10 + "km";
                                if (walkDistance < 10000) {
                                    //0.1Km単位に丸める
                                    optTitle = Math.round(walkDistance / 100) / 10 + "km";
                                } else {
                                    //1Km単位に丸める
                                    optTitle = Math.round(walkDistance / 1000) + "km";
                                }
                                opt = {
                                            title : optTitle,
                                            start : walkDate,
                                            color : 'red',
                                            textColor : 'white'
                                };
                                optEvents.push(opt);
                                walkDate = walkDateNew;
                                walkDistance = walkRecords[j].walkDistance;
                            }
                        }
                        if (walkDistance < 10000) {
                            //0.1Km単位に丸める
                            optTitle = Math.round(walkDistance / 100) / 10 + "km";
                        } else {
                            //1Km単位に丸める
                            optTitle = Math.round(walkDistance / 1000) + "km";
                        }
                        opt = {
                                    title : optTitle,
                                    start : walkDate,
                                    color : 'red',
                                    textColor : 'white'
                        };
                        optEvents.push(opt);
                    }
                }
            }
        }
    }
}
//カレンダー作成
function displayCalendar() {
    $('#walkCalendar').fullCalendar(
        {
        events : optEvents,
        header : optHeader,
        titleFormat : optTitleFormat,
        dayNamesShort : optDayNamesShort,
        buttonText: optButtonText
        }
    );
}

//////////////////////////////////////////////////////////////////////////////
//東海道53次表示作成
function crtToukaidou() {
    var walkDistance = 0;
    for(var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.substr(0,2) == MONTH_KEY_PREFIX) {
            if ((key != KEY_FIRST) && (key != LOG_NUMBER_KEY)) {
                var item = localStorage.getItem(key);
                var walkRecords = JSON.parse(item);
                for (var j = 0; j < walkRecords.length; j++) {
                    walkDistance = walkDistance + walkRecords[j].walkDistance;
                }
            }
        }
    }
    //テスト用
//    walkDistance = 20200;
    //何回歩いたか
    var nTimes = Math.floor(walkDistance / DISTANCE_ALL);
    var remainder = walkDistance - nTimes * DISTANCE_ALL;
    //バーを描く
    ctx.fillStyle = "rgb(0, 255, 0)";
    ctx.fillRect(LEFT_MARGIN, TOP_MARGIN, barwidth, CANVAS_HEIGHT);
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fillRect(LEFT_MARGIN + barwidth * (DISTANCE_ALL - remainder) / DISTANCE_ALL,
                TOP_MARGIN, 
                barwidth * (remainder) / DISTANCE_ALL, CANVAS_HEIGHT);
    console.log("x = " + (LEFT_MARGIN + barwidth * (DISTANCE_ALL - remainder) / DISTANCE_ALL));
    console.log("w = " + (barwidth * (remainder) / DISTANCE_ALL));
    //歩いた距離をキャンバスに描く
    ctx.font = "20px 'ＭＳ ゴシック'";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.textBaseline="middle";
    var x = LEFT_MARGIN + barwidth / 2;
    var y = (CANVAS_HEIGHT + TOP_MARGIN) / 2;
    var msg = (nTimes + 1) + "回目 " + Math.round(remainder / 100) / 10 + "Km";
    //東海道53次どこまで歩いたか？
    var index = walk53(remainder);
    msg = msg + " " + TOUKAIDOU[index].station;
    ctx.fillText(msg, x, y);
    var next = TOUKAIDOU[index + 1].distance - remainder;
    var nextMsg = "次の宿場まで" + Math.round(next / 100) / 10 + "Km";
    document.getElementById("nextinn").innerHTML = nextMsg;
    //Yahoo!地図作成(東海道53次)
    yahooMap53(index);
}
//東海道53次どこまで歩いたか？    
function walk53(dist) {
    var ret = 0;
    for (var i = 0; i < TOUKAIDOU.length; i++) {
        if (TOUKAIDOU[i].distance > dist) {
            return ret;
        }
        ret = i;
    }
    return ret;
}
//Yahoo!地図作成(東海道53次)
function yahooMap53(index) {
    document.getElementById("yahooMap53").innerHTML = "";
    //ネットワーク接続確認(新バージョン)
    var href = "http://js.api.olp.yahooapis.jp/OpenLocalPlatform/V1/jsapi?appid=1vapUz.xg66TpynAf69zjWH3A3Yu0FFPxl6XPQy591swZHRMJS7c7fP.eb2lXUo-";
//    var href = "http://www.yahoo.co.jp/";
    $.ajax({
        url : href,
        type : "get",
        success : function(data){
            crtYahooMap53(index);
        },
        error : function(){
            return;
        }
    });
}
//Yahoo!地図作成(東海道53次)
function crtYahooMap53(index) {
    var nextIndex = Math.min(index + 1,54);
    var lat = 35.184473;
    var lon = 137.773094;
/*    
    var map = new Y.Map("yahooMap53", {
                        configure : {
                            dragging : false
                            ,mapType : Y.Map.TYPE.SMARTPHONE
                            }
    });
*/    
    var map = new Y.Map("yahooMap53");
    var zoomLevel = 7;
//    var zoomLevel = 8; //見づらいので却下
    map.drawMap(
        new Y.LatLng(lat, lon),
        zoomLevel,
        Y.LayerSetId.NORMAL  // 通常の地図を表示
        );
    // マーカーを表示する
    crtMarkers(nextIndex, map);
    //地図表示が乱れることがあるので、試しに遅延を入れてみる
//    var timerID2 = setTimeout( function () { crtMarkers(nextIndex, map); }, 500);
}
function crtMarkers(nextIndex, map) {
    //アイコンを変えると、Androidで表示されない（Webならok）
    //iPhoneもOK
//    var icon = new Y.Icon('images/point.png');
    for (i = 0; i < nextIndex; i++) {
        marker = new Y.Marker(     
           new Y.LatLng(
                    TOUKAIDOU[i].lat, 
                    TOUKAIDOU[i].lon
           )
        );
        map.addFeature(marker);
    }
}
//////////////////////////////////////////////////////////////////////////////
//Yahoo!地図作成
//yahooMap
function yahooMap() {
    document.getElementById("yahooMap").innerHTML = "";
    //ネットワーク接続確認(新バージョン)
    var href = "http://js.api.olp.yahooapis.jp/OpenLocalPlatform/V1/jsapi?appid=1vapUz.xg66TpynAf69zjWH3A3Yu0FFPxl6XPQy591swZHRMJS7c7fP.eb2lXUo-";
//    var href = "http://www.yahoo.co.jp/";
    $.ajax({
        url : href,
        type : "get",
        success : function(data){
            crtYahooMap();
        },
        error : function(){
            alert("Yahoo! 地図に接続できません");
            return;
        }
    });
}
function crtYahooMap() {
//測定地点の中心を算出
    var latMin = Number.MAX_VALUE;  // 緯度
    var latMax = 0;  // 緯度
    var lonMin = Number.MAX_VALUE; // 経度
    var lonMax = 0; // 経度
    for (i = 0; i < recordsCompress.length; i++) {
        latMin = Math.min(latMin, recordsCompress[i].lat);
        latMax = Math.max(latMax, recordsCompress[i].lat);
        lonMin = Math.min(lonMin, recordsCompress[i].lon);
        lonMax = Math.max(lonMax, recordsCompress[i].lon);
    }
    var lat = (latMin + latMax) / 2;
    var lon = (lonMin + lonMax) / 2;

    var map = new Y.Map("yahooMap");
    var zoomLevel = 16;
/*
    if (screenWidth >= 600) {
        zoomLevel = 17;
    }
*/
    map.drawMap(
        new Y.LatLng(lat, lon),
        zoomLevel,
        Y.LayerSetId.NORMAL  // 通常の地図を表示
        );
    // 地図の種類を切り換えるコントローラーを表示
//    map.addControl(new Y.LayerSetControl());
    // ズームコントローラーを表示   
    map.addControl(new Y.SliderZoomControlVertical());   
    // マーカーを表示する
    //アイコンを変えると、Androidで表示されない（Webならok）
    //iPhoneもOK
    var icon = new Y.Icon('images/point.png');
    for (i = 0; i < recordsCompress.length; i++) {
        marker = new Y.Marker(     
           new Y.LatLng(
                    recordsCompress[i].lat, 
                    recordsCompress[i].lon
           )
        );
        map.addFeature(marker);
    }
    iui.showPageById("map");
}
////////////////////////////////////////////////////////////////////////////////
//テンキー関連
function tenkey() {
    //inputDataをlocalStorageから取得
    var item = localStorage.getItem(MIGRATION_KEY);
    if (item == null) {
        inputData = "0";
    } else {
        var walkRecords = JSON.parse(item);
        inputData = String(walkRecords[0].walkDistance / 1000);
    }
    console.log("inputData = " + inputData);
    setInputData();
}

function setInputData() {
    document.getElementById("tenkey-in").innerHTML = inputData;
}
function keyin(strKey) {
    var dp;
    var inputOk;
    //0
    if (strKey === "0") {
        //小数点以下は1桁のみ入力可とする
        dp = inputData.indexOf(".");
        inputOk = false;
        if (dp < 0) {
            inputOk = true;
        } else {
            if (dp > inputData.length - 2) {
                inputOk = true;
            }
        }
        if (inputOk) {
            if (inputData !== "0") {
                inputData = inputData + strKey;
            }
        }
    }
    //1～9
    if (strKey >= "1" && strKey <= "9") {
        //小数点以下は1桁のみ入力可とする
        dp = inputData.indexOf(".");
        inputOk = false;
        if (dp < 0) {
            inputOk = true;
        } else {
            if (dp > inputData.length - 2) {
                inputOk = true;
            }
        }
        if (inputOk) {
            if (inputData !== "0") {
                inputData = inputData + strKey;
            } else {
                inputData = strKey;
            }
        }
    }
    //.
    if (strKey == ".") {
        if (inputData.indexOf(".") < 0) {
            inputData = inputData + strKey;
        }
    }
    //bs
    if (strKey == "bs") {
        if (inputData.length == 1) {
//            inputData = "0";
            inputData = "";
        } else {
            inputData = inputData.substr(0, inputData.length - 1);
            if (inputData == "-") {
                inputData = "0";
            }
        }
    }
    //-
    if (strKey == "-") {
        if (inputData !== "0") {
            if (inputData.indexOf("-") < 0) {
                inputData = strKey + inputData;
            } else {
                inputData = inputData.substr(1, inputData.length - 1);
            }
        }
    }
    //ent
    if (strKey == "ent") {
        console.log("inputData = " + inputData);
        //保管
        //Dateオブジェクトはparseで復元できないため、文字列に整形して保管
        var objRec =    {
                        recStart : _getYyyymmddhhmmssfff(MIGRATION_DATE),
                        measurementStart : _getYyyymmddhhmmssfff(MIGRATION_DATE),
                        measurementEnd : _getYyyymmddhhmmssfff(MIGRATION_DATE),
                        recEnd : _getYyyymmddhhmmssfff(MIGRATION_DATE),
                        measurementCount : 0,
                        measurementMaxInterval : 0,
                        walkMin : 0,
                        walkDistance : Number(inputData) * 1000,
                        kmPh : 0
                        };
        console.log("objRec.walkDistance = " + objRec.walkDistance);
        //localStorageに記録
        var walkRecords = [];
        walkRecords.push(objRec);
        //書き込み
        var newItem = JSON.stringify(walkRecords);
        localStorage.setItem(MIGRATION_KEY,newItem);
        //homeに戻る
        iui.showPageById("home");
        return;
    }
    //数値部に表示
    setInputData();
}
//////////////////////////////////////////////////////////////////////////////
//Shareプラグインを呼ぶ
function share() {
    shareWalkRecords.sort(function(a, b) {
        var av, bv;
        av = a.recStart;
        bv = b.recStart;
        if (av < bv) {
            return -1;
        } else if (av > bv) {
            return 1;
        } else {
            return 0;
        }
    });
    var shareText = JSON.stringify(shareWalkRecords);
    window.plugins.share.show(
        {
            subject: "Let's Walk 歩行記録共有",
            text: shareText
        },
        function() {}, // Success function
        function() {alert('Share が失敗しました。');} // Failure function
  );
    
}
//////////////////////////////////////////////////////////////////////////////
//Shareプラグインを呼ぶ(ただいまの歩行記録)
function shareNow() {
    var shareText = "Let's Walk と一緒に " + document.getElementById("msg2").innerHTML +
        " 歩きました。【http://goo.gl/KW9gJ】 #LetsWalkJP";
    window.plugins.share.show(
        {
            subject: "Let's Walk ただいまの歩行記録",
            text: shareText
        },
        function() {}, // Success function
        function() {alert('Share が失敗しました。');} // Failure function
  );
}

/**************************************************
 * [機能]   初回記録をlocalStorageに書き込みます。
 *          既にキーが存在すれば何もしません。
 * [引数]   recStartString 記録開始時刻の文字列
 * [戻値]   なし
 **************************************************/
function _recFirst(recStartString) {
    var firstRec = localStorage.getItem(KEY_FIRST);
    if (firstRec == null) {
        //書き込み
        localStorage.setItem(KEY_FIRST,recStartString);    
    }
}

/**************************************************
 * [機能]   localStorageに記録
 *          
 * [引数]   dateStart 記録開始時刻(キーの生成に使用)
 *          objRec    記録オブジェクト
 * [戻値]   なし
 **************************************************/
function _recWalk(dateStart, objRec) {
    var walkRecords = [];
    //キー生成
    var monthKey = MONTH_KEY_PREFIX + _getYyyymm(dateStart);
    //読み込み
    var item = localStorage.getItem(monthKey);
    if (item == null) {
        console.log(monthKey + "がなかった");
        walkRecords = [];
    } else {
        walkRecords = JSON.parse(item);
        console.log("walkRecords.length = " + walkRecords.length);
    }
    walkRecords.push(objRec);
    //書き込み
    var newItem = JSON.stringify(walkRecords);
    localStorage.setItem(monthKey,newItem);
//    _logWrite(newItem);
}

/**************************************************
 * [機能]   ログファイルに書き込みます。
 * [引数]   msg ログに書き込むメッセージ
 * [戻値]   なし
 **************************************************/
function _logWrite(msg) {
    /************************************************************
     * [重要]このコード作成時点でwriteメソッドにバグがあります。
     * 書き込む文字列がマルチバイトを含んでいると、
     * ポインターの移動が文字数(?)のため、次のwriteで
     * 前のデータの一部が上書きされます。
     * そのため、（バイト数－文字数）分の半角空白を追加します。
     * PhoneGapのバグがなおったらこのコードは修正の必要があります。
     *************************************************************/
    //（バイト数－文字数）を求める
//    var plusBytes = _byteCount(msg) - msg.length;
    var plus = "";
//    for (var i = 0; i < plusBytes; i++) {
//        plus = plus + " ";
//    }
    var logMsg = _getYyyymmddhhmmssfff(new Date()) + "|" + msg + "\n";
    var readyState = logWriter.readyState;
    console.log(readyState);
    if (readyState == 1) {
        //書き込み中は配列に蓄える
        writeMiss.push(logMsg);
    } else {
        //バグ対応のため余分な空白追加
        logWriter.write(logMsg + plus);
    }
}

/**************************************************
 * [機能]   日時を書式化します。
 * [引数]   date 日付
 * [戻値]    yyyy/MM/dd HH:mm:ss.fff
 **************************************************/
function _getYyyymmddhhmmssfff(date) {
    var res = date.getFullYear();
    res = res + "/" + _comPadZero(date.getMonth() + 1, 2);
    res = res + "/" + _comPadZero(date.getDate(), 2);
    res = res + " " + _comPadZero(date.getHours(), 2);
    res = res + ":" + _comPadZero(date.getMinutes(), 2);
    res = res + ":" + _comPadZero(date.getSeconds(), 2);
    res = res + "." + _comPadZero(date.getMilliseconds(), 3);
    return res;
}
/**************************************************
 * [機能]   日時を書式化します。
 * [引数]   date 日付
 * [戻値]    yyyy/MM/dd
 **************************************************/
function _getYyyymmdd(date) {
    var res = date.getFullYear();
    res = res + "/" + _comPadZero(date.getMonth() + 1, 2);
    res = res + "/" + _comPadZero(date.getDate(), 2);
    return res;
}
/**************************************************
 * [機能]   日時を書式化します。
 * [引数]   date 日付
 * [戻値]    yyyy/MM
 **************************************************/
function _getYyyymm(date) {
    var res = date.getFullYear();
    res = res + "/" + _comPadZero(date.getMonth() + 1, 2);
    return res;
}
/**************************************************
 * [機能]    ゼロパディングを行います
 * [引数]   value   対象の文字列
 *          length  長さ
 * [戻値]   結果文字列
 **************************************************/
function _comPadZero(value, length){
    return new Array(length - ('' + value).length + 1).join('0') + value;
}
/**************************************************
 * [機能]   文字列のバイト数を返します。
 * [引数]   文字列
 * [戻値]   バイト数
 **************************************************/
function _byteCount(str) {
    //urlエンコード
    var ue = encodeURI(str);
    //%の数を調べる
    var per = ue.match(/%/g);
    if (per == null) {
        return str.length;
    } else {
        return ue.length - per.length * 2;
    }
}



// http://www.logical-arts.jp/blog/?p=136 より引用しました。
//
// このプログラムはロジカルアーツ研究所（http://www.logical-arts.jp/）が作成しました。
// プログラムはご自由にお使いいただいて結構ですが、結果の保証はいたしません。
// 計算上の特性をよくご理解いただいてお使いください。
//
// この計算では緯度・経度ともに1度以上にわたる広い範囲には適用できません。
// 緯度・経度が数分以内のごく狭い範囲に限って適用可能です。
// 距離はメートル単位で返され、方位角は真東を0として±180度の範囲で返されます。
//

var A = 6378137;            // 地球の赤道半径
var RAD = Math.PI / 180;    // 1°あたりのラジアン

// 2点間の距離を求める関数
function distance(lat1, lon1, lat2, lon2) {
    // 度をラジアンに変換
    lat1 *= RAD;
    lon1 *= RAD;
    lat2 *= RAD;
    lon2 *= RAD;

    var lat_c = (lat1 + lat2) / 2;                  // 緯度の中心値
    var dx = A * (lon2 - lon1) * Math.cos(lat_c);
    var dy = A * (lat2 - lat1);

    return Math.sqrt(dx * dx + dy * dy);
}


/// This file is auto-generated by the IDE.
/// Changes to this file is not recommended.
///

///@import phonegap-2.0/js
document.write('<script' + ' src="plugins/phonegap/cordova.js.autover"></script>');
///@end

///@import monaca.js-1/js
document.write('<script' + ' src="plugins/monaca.js/monaca.js.autover"></script>');
document.write('<script' + ' src="plugins/monaca.js/monaca.viewport.js"></script>');
///@end
document.write('<script' + ' src="plugins/phonegap-plugins/childBrowser.js.autover"></script>');
document.write('<script' + ' src="plugins/phonegap-plugins/share.js.autover"></script>');

