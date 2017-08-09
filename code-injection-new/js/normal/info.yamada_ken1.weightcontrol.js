









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

/**************************************************
 * 0.0.1 2012/03/10 初期リリース
 * 0.0.2 2012/03/20 (非公開)
 *                  高解像度端末の操作性を改善
 * 0.0.3 2012/03/20 (公開バージョン)バージョンアップチェックのため
 * 0.0.4 2012/03/21 (ボツバージョン)
 *                  高解像度対応をviewportで行うようにする
 *                  Web表示ではOKだが、MonacaビルドはNG
 *                  コードは元に戻した
 * 0.0.5 2012/03/26 iOS対応のため広告の target="_blank" とする
 *                  パネルの高さ調整
 * 0.0.6 2012/03/27 (非公開)
 *                  高解像度端末の操作性を改善
 *                  [前の日]ボタンを広告からはなす
 *                  テンキー部のBackボタン自作
 * 0.0.7 2012/03/27 (公開バージョン)バージョンアップチェックのため
 * 0.0.8 2012/04/07 (非公開)
 *                  高解像度対応をzoomで行うようにする
 *                  chartは横幅可変だったため、別対応
 * 0.0.9 2012/04/07 (公開バージョン)バージョンアップチェックのため
 * 0.1.0 2012/06/12 Android4.0.4対応
 * 0.1.1 2012/06/13 レイアウト調整
 * 0.1.2 2012/06/16 多くの端末で表示できるようにレイアウト調整
 **************************************************/
window.addEventListener("load", function() {
    //PhoneGapロード完了になったときに onDeviceReady 関数を呼ぶようにする
    document.addEventListener("deviceready", onDeviceReady, false);
});
//共通変数
//localStorageキー
//年月キーの接頭辞（デバッガーでlocalStorageが混在するため）
var MONTH_KEY_PREFIX = "WeightControl";
//体重配列
var weightArray = [];
//当日（表示データの日付）
var today;
//最大日付
var maxDay;
//最大日付－1カ月＋1日(グラフ開始日の基本)
var graphStart;
//入力ID
var inputId;
//入力データ
var inputData;
//グラフ関連
var optData = [];
var optXaxis;
var optYaxis;
var optGrid;
//端末の幅
var screenWidth;

//PhoneGapロード完了になったときに呼ばれる処理
function onDeviceReady() {
    //ログ
    console.log("Weight Control start");
    //ウインドウの大きさを取得
    var screenWidth = screen.width;
    var screenHeight = screen.height;
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
    if (device.platform == "iPhone" || device.platform == "iPad") {
        //iPadはscreen.width等が調整済みで返ってくる
        //たぶんiPhoneも同様
        multiplier = 1;
    } else {
        multiplier = 1 / window.devicePixelRatio;
    }
    //panelのmin-height調整
    var minHeight = screenHeight * multiplier - 45; //45はツールバーの高さ
    //chartの高さ調整(height - 280)
    var chartHeight = screenHeight * multiplier - 280;
    //Android4.0はソフトキー領域、通知領域を考慮する必要あり
    if (device.platform == "Android" && device.version >= "4.0.0") {
        minHeight = minHeight - 70;
        chartHeight = chartHeight - 70;
    }
    //iPhone,iPadは通知領域を考慮する必要あり
    if (device.platform == "iPhone" || device.platform == "iPad") {
        minHeight = minHeight - 20;
        chartHeight = chartHeight - 20;
    }
    //Android2.1は通知領域を考慮する必要あり
    if (device.platform == "Android" && device.version.substring(0,3) == "2.1") {
        minHeight = minHeight - 20;
        chartHeight = chartHeight - 20;
    }
    //Android2.3はOK
    //Android2.2はOK(エミュレーターで確認)
    
    $(".panel").css("min-height", minHeight + "px");
    $("#chart").css("height", chartHeight + "px");
    //chartの幅調整(width - 20)
    var chartWidth = screenWidth * multiplier - 20;
    $("#chart").css("width", chartWidth + "px");
    //本日のデータを表示
    var tmpDate = new Date();
    today = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate());
    maxDay = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate());
    //最大日付－1カ月＋1日(グラフ開始日の基本)
    graphStart = new Date(tmpDate.getFullYear(), tmpDate.getMonth() - 1, tmpDate.getDate());
    graphStart.setDate(graphStart.getDate() + 1);
    
    //localStorage から 体重データを取得
    getWeight();
    //データ表示
    dispWeight();
}

//localStorage から 体重データを取得
function getWeight() {
    //キー生成
    var monthKey = MONTH_KEY_PREFIX + _getYyyymm(today);
    //読み込み
    var item = localStorage.getItem(monthKey);
    if (item == null) {
        weightArray = [];
    } else {
        try{
            //parse
            weightArray = JSON.parse(item);
        }catch( e ){
            //itemがJSON形式でないときは空配列を返す
            weightArray = [];
        }
    }
}

//体重データを表示
function dispWeight() {
    //日付表示
    document.getElementById("today").innerHTML = _getYyyymdJp(today);
    //次の日の色を設定
    if (today.getTime() >= maxDay.getTime()) {
        document.getElementById("nextDay").style.color = "silver";
    } else {
        document.getElementById("nextDay").style.color = "";
    }
    //配列からデータを取り出す
    var morningWeight = ""; 
    var nightWeight = "";
    try{
        var dayWeight = weightArray[today.getDate()];
        try{
            morningWeight = dayWeight[0];
        }catch( e1 ){
        }
        try{
            nightWeight = dayWeight[1];
        }catch( e2 ){
        }
    }catch( e0 ){
    }
    if (morningWeight == null) {
        document.getElementById("num1").value = "";
    } else {
        document.getElementById("num1").value = _formatNumber(morningWeight);
    }
    if (nightWeight == null) {
        document.getElementById("num2").value = "";
    } else {
        document.getElementById("num2").value = _formatNumber(nightWeight);
    }
    //グラフ表示
    crtGraph();
}
//グラフ表示
function crtGraph() {
    var dayStart;
    var dayEnd;
    //表示範囲作成
    if (today.getTime() < graphStart.getTime()) {
        dayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        dayEnd = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        dayEnd.setDate(dayEnd.getDate() - 1);
    } else {
        dayStart = new Date(graphStart.getFullYear(), graphStart.getMonth(), graphStart.getDate());
        dayEnd = new Date(maxDay.getFullYear(), maxDay.getMonth(), maxDay.getDate());
    }
//    console.log("dayStart = " + _getYyyymmdd(dayStart));
//    console.log("dayEnd = " + _getYyyymmdd(dayEnd));
    //localStorageからデータ取得
    var weightArray1 = [];
    var weightArray2 = [];
    //キー生成
    var monthKey1 = MONTH_KEY_PREFIX + _getYyyymm(dayStart);
    //読み込み
    var item = localStorage.getItem(monthKey1);
    if (item == null) {
        weightArray1 = [];
    } else {
        try{
            //parse
            weightArray1 = JSON.parse(item);
        }catch( e1 ){
            //itemがJSON形式でないときは空配列を返す
            weightArray1 = [];
        }
    }
    //キー生成
    var monthKey2 = MONTH_KEY_PREFIX + _getYyyymm(dayEnd);
    //読み込み
    item = localStorage.getItem(monthKey2);
    if (item == null) {
        weightArray2 = [];
    } else {
        try{
            //parse
            weightArray2 = JSON.parse(item);
        }catch( e2 ){
            //itemがJSON形式でないときは空配列を返す
            weightArray2 = [];
        }
    }
    //グラフデータ用配列
    var d1 = [];    //入力値
    //日付初期値
    var date = new Date(dayStart.getFullYear(), dayStart.getMonth(), dayStart.getDate());
    var dayWeight;
    while (date.getTime() <= dayEnd.getTime()) {
//        console.log("date = " + _getYyyymmdd(date));
        //体重データを配列から取得
        var morningWeight = ""; 
        var nightWeight = "";
        if (MONTH_KEY_PREFIX + _getYyyymm(date) == monthKey1) {
            try{
                dayWeight = weightArray1[date.getDate()];
                try{
                    morningWeight = dayWeight[0];
                }catch( e3 ){
                }
                try{
                    nightWeight = dayWeight[1];
                }catch( e4 ){
                }
            }catch( e5 ){
            }
        } else {
            try{
                dayWeight = weightArray2[date.getDate()];
                try{
                    morningWeight = dayWeight[0];
                }catch( e6 ){
                }
                try{
                    nightWeight = dayWeight[1];
                }catch( e7 ){
                }
            }catch( e8 ){
            }
        }
        var dateX;
        //朝の体重
        if (morningWeight != "" && morningWeight != null) {
            dateX = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                    8,0,0);
            d1.push([dateX, morningWeight]);
        }
        //夜の体重
        if (nightWeight != "" && nightWeight != null) {
            dateX = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                    20,0,0);
            d1.push([dateX, nightWeight]);
        }
        //次の日付
        date.setDate(date.getDate() + 1);
    }
    //グラフ作成
    $("#chart").empty();
    if (d1.length > 1) {
        optData = [];
        var optData1 =  {
                label: "",  
                data: d1,
                lines: { show: true },
                points: { show: true },
                color:"rgba(255,150,150,1)"
        };
        optData.push(optData1);
        optXaxis =  {
                        mode : "time",
                        timeformat: "%m/%d"
                        };
        optYaxis =  {};
        optGrid =  {
                //違う色を指定して背景をグラデーションさせる
                backgroundColor: { colors: ["#fff", "#9ff"] } 
        };
        //グラフ表示がおかしいことへの対応
        //タイマー起動(200ミリ秒後に再描画)
        timerID = setTimeout( function () { crtGraphTimer(); }, 200);
    }
}

function crtGraphTimer() {
    $.plot($("#chart"), optData,
            {
            //X軸、Y軸を自動にする
            xaxis: optXaxis,
            yaxis: optYaxis,
            grid: optGrid
            }
    );
}
//Backボタン
function backPage() {
    iui.showPageById("home");
}

//前の日
function prevDay() {
    today.setDate(today.getDate() - 1);
    //localStorage から 体重データを取得
    getWeight();
    //データ表示
    dispWeight();
}
//次の日
function nextDay() {
    if (today.getTime() >= maxDay.getTime()) {
        return;        
    }
    today.setDate(today.getDate() + 1);
    //localStorage から 体重データを取得
    getWeight();
    //データ表示
    dispWeight();
}

////////////////////////////////////////////////////////////////////////////////
//テンキー関連
function tenkey(id) {
    inputId = id;
    inputData = document.getElementById(inputId).value;
    if (inputData == "") {
        inputData = "0";
    }
    setInputData();
    location.hash = "_tenkeyForm";
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
//        console.log(inputData);
        document.getElementById(inputId).value = _formatNumber(inputData);
        //保管(連想配列はstringifyできない)
        var num1 = document.getElementById("num1").value;
        if (num1 == null) {
            num1 = "";
        }
        var num2 = document.getElementById("num2").value;
        if (num2 == null) {
            num2 = "";
        }
//        console.log("num1 = " + num1 + "," + "num2 = " + num2);
        weightArray[today.getDate()] = [
                                        num1,
                                        num2
                                        ];
        var newItem = JSON.stringify(weightArray);
//        console.log(newItem);
        //キー生成
        var monthKey = MONTH_KEY_PREFIX + _getYyyymm(today);
        localStorage.setItem(monthKey,newItem);
        //グラフ再作成
        crtGraph();
        //homeに戻る
        iui.showPageById("home");
        return;
    }
    //数値部に表示
    setInputData();
}
/**************************************************
 * [機能]   61 や 61. を 61.0 に整形します
 * [引数]   number 数値
 * [戻値]   整形後の値
 **************************************************/
function _formatNumber(number) {
    if (number == null || number == "") {
        return "";
    }
    var pointPos = number.indexOf(".");
    if (pointPos < 0) {
        return number + ".0";
    }
    if (pointPos == number.length - 1) {
        return number + "0";
    }
    return number;
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
 * [戻値]    yyyy年M月d日
 **************************************************/
function _getYyyymdJp(date) {
    var res = date.getFullYear();
    res = res + "年" + (date.getMonth() + 1);
    res = res + "月" + date.getDate();
    res = res + "日";
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
 * [引数]    value    対象の文字列
 *          length  長さ
 * [戻値]	結果文字列
 **************************************************/
function _comPadZero(value, length){
    return new Array(length - ('' + value).length + 1).join('0') + value;
}

