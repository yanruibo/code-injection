








var	httpReq = new XMLHttpRequest();
var	latlon = "";
var online =true;

var options = {timeout: 30000, maximumAge: 30000, enableHighAccuracy: true };	

function onPause() { return true;   }
function onOnLine()  { online = true ; }
function onOffLine()  {  online= false;  }
function onBackKeyDown()   {return true;}





function scan() {
   
    try {
    	var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        scanner.scan(function(args) {
					var ptag = "qr="+args.text+latlon;				
		            getRemoteData("https://riservata.bikeidentificator.com/bike.asp","POST",ptag,"success_bike","error_bike");
		            getRemoteData("https://riservata.bikeidentificator.com/bikev.asp","POST",ptag,"success_bikev",null);
    				}
    			,
			      function (error) {
			          alert("Scanning failed: " + error);
			      }
    		);
    } catch (ex) {
       ar_alert(ex.message);
    }   
}

function frmn(nm,nd) {
	var x = '';
	x = nm.toString();
	while ( x.length< nd ){	
		x = '0'+x ;

	}
	return x ;
}

function gps_time() {
	var data = new Date();
	return  frmn(data.getFullYear(),4)
  			+frmn(data.getMonth()+1,2)
  			+frmn(data.getDate(),2)
  			+'_'
  			+frmn(data.getHours(),2)
  			+frmn(data.getMinutes(),2)
  			+frmn(data.getSeconds(),2 )
			+frmn(data.getMilliseconds(),3 )
  			
  }
  


function suc_gps(p) {	  latlon = "&lon="+p.coords.longitude+"&lat="+p.coords.latitude; 	};
function fail_gps() 	{	};


function handleStateChange() {if (httpReq.readyState != 4)return;	};

function getRemoteData(url,metod,data,fnsuccess,fnfail) { 
	try {
		httpReq.onreadystatechange = handleStateChange;	
		httpReq.open(metod, url, false);
		httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		httpReq.send(data);
		if (httpReq.readyState == 4 && httpReq.status == 200) {			
			if ( fnsuccess != null)	eval(fnsuccess+'(httpReq.responseText)') ;				
			return null;
		} else {
			if ( fnfail != null)  eval(fnfail+'()') 			
			return null;			
		}
	} catch (ex) {
		 eval(fnfail+'("errore di connessione:'+ex.message+'")') 
		return null;
	}
}

function  error_bike(e) { ar_alert('Non riusciamo ad attivare la connessione dati, controlla di avere copertura telefonica e di essere abilitato alla navigazione. '+e);		};

function success_bike(rdata) {
	document.getElementById('bike').innerHTML= rdata; 
};

function success_bikev(rdata) {
	eval(rdata); 
};




var bikeidentificator = {

	init: function(name, params) {
		var tmpTouch = new bikeidentificatorBox(name, params);
		if (params && typeof(params) == 'object' && params['page']) tmpTouch.loadPage(params['page']);
		return tmpTouch;
	},
	
	loadPage: function(url, params, callBack) {
		if (window.event) { var currObj = this.getCurrentBox(window.event.target); }
		// if target is defined - open there
		if (params && typeof(params) == 'object' && params['target']) {
			window.elements[params['target']].loadPage(url, params, callBack);
		} else {
			currObj.loadPage(url, params, callBack);
		}
	},
	
	loadContent: function(url, params, callBack) {
		if (window.event) { var currObj = this.getCurrentBox(window.event.target); }
		// if target is defined - open there
		if (params && typeof(params) == 'object' && params['target']) {
			window.elements[params['target']].loadContent(url, params, callBack);
		} else {
			if (currObj) {
				currObj.loadContent(url, params, callBack); 
			} else {
				// no current object -> loading into last current
				this.lastCurrObj.loadContent(url, params, callBack); 
			}
		}
	},
	
	overlayHTML: function(HTML, params, callBack) {
		// parse parameters
		var left		= null;
		var top			= null;
		var width  		= 300;
		var height 		= 300;
		var modal 		= false;
		var opacity 	= 0.3;		
		var bgcolor		= 'black';
		if (typeof(params) == 'object') {
			if (String(params['left']) 		!= 'undefined') left		= parseInt(params['left']);
			if (String(params['top']) 		!= 'undefined') top			= parseInt(params['top']);
			if (String(params['width']) 	!= 'undefined') width		= parseInt(params['width']);
			if (String(params['height']) 	!= 'undefined') height		= parseInt(params['height']);
			if (String(params['modal']) 	!= 'undefined') modal 		= params['modal'];
			if (String(params['opacity']) 	!= 'undefined') opacity		= params['opacity'];
			if (String(params['bgcolor']) 	!= 'undefined') bgcolor		= params['bgcolor'];
		}
		if (width  > window.innerWidth -10) width  = window.innerWidth - 10; 
		if (height > window.innerHeight-10) height = window.innerHeight- 10;
		// lock secreen
		var lock = document.createElement('div');
		lock.id = 'overlay_lock';
		lock.style.cssText = 'z-Index: 9; background-color: '+ bgcolor +'; opacity: 0; '+
			'position: absolute; left: '+ parseInt(document.body.scrollLeft) +'px; top: '+ parseInt(document.body.scrollTop) +'px; '+
			'-webkit-tap-highlight-color: rgba(0,0,0,0); -webkit-transition: all .4s ease-in-out; '+
			'width: '+ window.innerWidth +'px; height: '+ window.innerHeight +'px;';
		if (!modal) {
			lock.onclick = function (e) { bikeidentificator.overlayClose(); };
		} else {
			// if modal flash red background
			lock.ontouchstart = function (e) { $('#overlay_lock')[0].style.cssText += '-webkit-transition: none; background-color: white;'; };
			lock.ontouchend   = function (e) { $('#overlay_lock')[0].style.cssText += '-webkit-transition: all .4s ease-in-out; background-color: black;'; };
		}
		$(document.body).append(lock);	
		setTimeout("$('#overlay_lock').css('opacity', '"+ opacity +"');", 1); // otherwise transition is not working
		
		window.onscroll = function () {
			var winTop 	= parseInt(document.body.scrollTop) + (parseInt(window.innerHeight) - height) / 2;
			var winLeft = parseInt(document.body.scrollLeft) + (parseInt(window.innerWidth) - width) / 2;
			$('#overlay_lock')[0].style.cssText += 'top: '+ parseInt(document.body.scrollTop)+'px; left: '+ parseInt(document.body.scrollLeft)+'px;'+
				'width: '+ parseInt(window.innerWidth) +'px; height: '+ parseInt(window.innerHeight) +'px';  
			$('#overlay_box').css('top', winTop+'px');
			$('#overlay_box').css('left', winLeft+'px');
		}
		window.onresize = function () { window.onscroll(); }
		
		// create overlay
		var div = document.createElement('div');
		var winTop 	= parseInt(document.body.scrollTop) + (parseInt(window.innerHeight) - height) / 2;
		var winLeft = parseInt(document.body.scrollLeft) + (parseInt(window.innerWidth) - width) / 2;
		div.id = 'overlay_box';
		div.className = 'overlay';
		div.style.cssText += 'left: '+ winLeft +'px; top: '+ winTop +'px; width: '+ width +'px; height: '+ height +'px; -webkit-border-radius: 5px; '+
			'-webkit-transition: all .4s ease-in-out; opacity: 0;';
		div.innerHTML = HTML;
		$(document.body).append(div);			
		setTimeout("$('#overlay_box').css('opacity', '1');", 1); // otherwise transition is not working
		// add clicked class when clicked on the link
		$('#overlay_box a').click(new Function(
			"$('#overlay_box a').removeClass('clicked');"+
			"$(this).addClass('clicked');"));
	},
	
	overlayPage: function(url, params, callBack) {
		// create HTML overlay
		this.overlayHTML('<div class="content"></div>', params, callBack);
		// load overlay content
		$.get(url, {}, function (data) {
			$('#overlay_box').html(data);
			// isert another DIV (needed for iScroll)
			var tmp = $('.content', $('#overlay_box'))[0];
			if (tmp) tmp.innerHTML = '<div>' + tmp.innerHTML + '</div>';
			
			// check presens of footer and toolbar
			var isToolbar = ($('div.overlay div.toolbar').length > 0 ? true : false);
			var isFooter  = ($('div.overlay div.footer').length > 0 ? true : false);		
			if (isToolbar) $('div.overlay div.content').css('top', '45px');
			if (isFooter) $('div.overlay div.content').css('bottom', '60px');
			// init scroll
			if (bikeidentificator.overlay_scroll) { bikeidentificator.overlay_scroll.destroy(); bikeidentificator.overlay_scroll.scroll = null; }
			bikeidentificator.overlay_scroll = new iScroll($('div.overlay div.content')[0], { desktopCompatibility: true, zoom: false });
			// for buttons on top do it on touch start
			$('#overlay_box a.button').bind('touchstart', new Function(
				"$('#overlay_box a').removeClass('clicked');"+
				"$(this).addClass('clicked');"));
			// add clicked class when clicked on the link
			$('#overlay_box a').click(new Function(
				"$('#overlay_box a').removeClass('clicked');"+
				"$(this).addClass('clicked');"));
		});		
	},
	
	overlayClose: function() {
		$('#overlay_box').remove();
		$('#overlay_lock')[0].style.opacity = 0;
		setTimeout("$('#overlay_lock').remove();", 400);
	},
	
	resize: function() {
		for (el in window.elements) {
			window.elements[el].resize();
		}
	},
	
	getCurrentBox: function(el) {
		var currObj = null;
		var tmp 	= el;
		while (tmp && tmp.tagName != 'BODY') {
			if (tmp.tagName == 'DIV' && window.elements[tmp.id]) {
				currObj = window.elements[tmp.id];
				break;
			}
			tmp = tmp.parentNode;
		}
		if (currObj != null) this.lastCurrObj = currObj; // remember last real current
		return currObj;
	}
}

function bikeidentificatorBox(name, params) {
	// -- variables
	this.name		 = name;		// - unique name for the element
	this.width		 = ''; 	    // - if empty - then full screen
	this.height		 = ''; 	    // - if empty - then full screen	
	// -- init function
	this.loadPage	 = bikeidentificator_loadPage;
	this.loadContent = bikeidentificator_loadContent;
	this.animate	 = bikeidentificator_animate;
	this.initScroll	 = bikeidentificator_initScroll;
	this.initTabs	 = bikeidentificator_initTabs;
	this.initLinks	 = bikeidentificator_initLinks;
	this.resize		 = bikeidentificator_resize;	
	// -- internal variables
	this._tmpCallBack;
	this._tmpTimer;
	this._lastDiv;
		
	function bikeidentificator_loadPage(url, params, callBack) {
		// -- save some temp variables		
		this._tmpCallBack	= callBack;
		// -- get the page
		this._tmpTimer = window.setTimeout(new Function("$('#"+ this.name +"').append('<div class=\"progress\">Loading...</div>')"), 200);		
		$.get(url, {}, new Function("data", 
			"$('#"+ this.name +" > .progress').remove(); "+
			"var obj = window.elements['"+ ((typeof(params) == 'object' && params['target']) ? params['target'] : this.name) +"']; "+ 
			"if (obj && typeof(obj) == 'object') { "+
			"	clearTimeout(obj._tmpTimer); "+
			"	obj.animate(data, '"+ ((typeof(params) == 'object' && params['transition']) ? params['transition'] : "") +"'); "+
			"	obj.initTabs();"+
			"	obj.initLinks();"+
			"	if (obj._tmpCallBack && obj._tmpCallBack == 'function') { obj._tmpCallBack(); } "+
			"}")
		);
	}
	
	function bikeidentificator_loadContent(url, params, callBack) {
		// -- save some temp variables		
		this._tmpCallBack	= callBack;
		// -- get the page
		this._tmpTimer = window.setTimeout(new Function("$('#"+ this.name +"').append('<div class=\"progress\">Loading...</div>')"), 200);		
		$.get(url, {}, new Function("data", 
			"$('#"+ this.name +" > .progress').remove();"+
			"var obj = window.elements['"+ ((typeof(params) == 'object' && params['target']) ? params['target'] : this.name) +"']; "+ 
			"if (obj && typeof(obj) == 'object') { "+
			"	clearTimeout(obj._tmpTimer); "+
			"	if (obj._lastDiv) {"+
			"		$('#"+ this.name +" > .bikeidentificator.div1 > div.content').html('<div>'+ data +'</div>');"+
			"	} else { "+
			"		$('#"+ this.name +" > .bikeidentificator.div2 > div.content').html('<div>'+ data +'</div>');"+
			"	}"+
			"	obj.initLinks();"+
			"	obj.initScroll();"+
			"	if (obj._tmpCallBack && obj._tmpCallBack == 'function') { obj._tmpCallBack(); } "+
			"}")
		);
	}
	
	function bikeidentificator_animate(HTML, transition) {
		// get width and height of the div
		var width  = this.width;
		var height = this.height;
		if (width == '')  width  = window.innerWidth;
		if (height == '') height = window.innerHeight;
		if (parseInt(width) < 0)  width = window.innerWidth + width;
		if (parseInt(height) < 0) height = window.innerHeight + height;
		// find two divs
		if (this._lastDiv) {
			var div_old = $('#'+ this.name +' > .bikeidentificator.div1')[0];
			var div_new = $('#'+ this.name +' > .bikeidentificator.div2')[0];
			this._lastDiv = false;
		} else {
			var div_old = $('#'+ this.name +' > .bikeidentificator.div2')[0];
			var div_new = $('#'+ this.name +' > .bikeidentificator.div1')[0];
			this._lastDiv = true;
		}
		$('#'+this.name)[0].style.cssText += '-webkit-perspective: 700px; overflow: hidden;';
		
		var comcss = ' width: '+ width +'px; height: '+ height +'px; overflow: hidden;';
		div_old.style.cssText = 'position: absolute; z-index: 0; -webkit-backface-visibility: hidden;';
		div_new.style.cssText = 'position: absolute; z-index: 1; -webkit-backface-visibility: hidden;';
		
		switch (transition) {
			case 'slide-left':
				// init divs
				div_old.style.cssText += comcss +'-webkit-transform: translate3d(0, 0, 0);';
				div_new.style.cssText += comcss +'-webkit-transform: translate3d('+ width +'px, 0, 0);';
				div_new.innerHTML = HTML;
				// -- need a timing function because otherwise not working
				window.setTimeout(function() {
					div_new.style.cssText += '-webkit-transition: .5s; -webkit-transform: translate3d(0px, 0, 0);';
					div_old.style.cssText += '-webkit-transition: .5s; -webkit-transform: translate3d(-'+ width +'px, 0, 0);';
				}, 1);
				break;
				
			case 'slide-right':
				// init divs
				div_old.style.cssText += comcss +'-webkit-transform: translate3d(0, 0, 0);';
				div_new.style.cssText += comcss +'-webkit-transform: translate3d(-'+ width +'px, 0, 0);';
				div_new.innerHTML = HTML;
				// -- need a timing function because otherwise not working
				window.setTimeout(function() {
					div_new.style.cssText += '-webkit-transition: .5s; -webkit-transform: translate3d(0px, 0, 0);';
					div_old.style.cssText += '-webkit-transition: .5s; -webkit-transform: translate3d('+ width +'px, 0, 0);';
				}, 1);
				break;
							
			case 'slide-down':
				// init divs
				div_old.style.cssText += comcss +'z-index: 1; -webkit-transform: translate3d(0, 0, 0);';
				div_new.style.cssText += comcss +'z-index: 0; -webkit-transform: translate3d(0, 0, 0);';
				div_new.innerHTML = HTML;
				// -- need a timing function because otherwise not working
				window.setTimeout(function() {
					div_new.style.cssText += '-webkit-transition: .5s; -webkit-transform: translate3d(0, 0, 0);';
					div_old.style.cssText += '-webkit-transition: .5s; -webkit-transform: translate3d(0, '+ height +'px, 0);';
				}, 1);
				break;
			
			case 'slide-up':
				// init divs
				div_old.style.cssText += comcss +'-webkit-transform: translate3d(0, 0, 0);';
				div_new.style.cssText += comcss +'-webkit-transform: translate3d(0, '+ height +'px, 0);';
				div_new.innerHTML = HTML;
				// -- need a timing function because otherwise not working
				window.setTimeout(function() {
					div_new.style.cssText += '-webkit-transition: .5s; -webkit-transform: translate3d(0, 0, 0);';
					div_old.style.cssText += '-webkit-transition: .5s; -webkit-transform: translate3d(0, 0, 0);';
				}, 1);
				break;
				
			case 'flip-left':
				// init divs
				div_old.style.cssText += comcss +'-webkit-transform: rotateY(0deg);';
				div_new.style.cssText += comcss +'-webkit-transform: rotateY(-180deg);';
				div_new.innerHTML = HTML;
				// -- need a timing function because otherwise not working
				window.setTimeout(function() {
					div_new.style.cssText += '-webkit-transition: .5s; -webkit-transform: rotateY(0deg);';
					div_old.style.cssText += '-webkit-transition: .5s; -webkit-transform: rotateY(180deg);';
				}, 1);
				break;
				
			case 'flip-right':
				// init divs
				div_old.style.cssText += comcss +'-webkit-transform: rotateY(0deg);';
				div_new.style.cssText += comcss +'-webkit-transform: rotateY(180deg);';
				div_new.innerHTML = HTML;
				// -- need a timing function because otherwise not working
				window.setTimeout(function() {
					div_new.style.cssText += '-webkit-transition: .5s; -webkit-transform: rotateY(0deg);';
					div_old.style.cssText += '-webkit-transition: .5s; -webkit-transform: rotateY(-180deg);';
				}, 1);
				break;
				
			case 'flip-top':
				// init divs
				div_old.style.cssText += comcss +'-webkit-transform: rotateX(0deg);';
				div_new.style.cssText += comcss +'-webkit-transform: rotateX(180deg);';
				div_new.innerHTML = HTML;
				// isert another DIV (needed for iScroll)
				var tmp = $('.content', div_new)[0];
				if (tmp) tmp.innerHTML = '<div>' + tmp.innerHTML + '</div>';
				// -- need a timing function because otherwise not working
				window.setTimeout(function() {
					div_new.style.cssText += '-webkit-transition: .5s; -webkit-transform: rotateX(0deg);';
					div_old.style.cssText += '-webkit-transition: .5s; -webkit-transform: rotateX(-180deg);';
				}, 1);
				break;
				
			case 'flip-bottom':
				// init divs
				div_old.style.cssText += comcss +'-webkit-transform: rotateX(0deg);';
				div_new.style.cssText += comcss +'-webkit-transform: rotateX(-180deg);';
				div_new.innerHTML = HTML;
				// -- need a timing function because otherwise not working
				window.setTimeout(function() {
					div_new.style.cssText += '-webkit-transition: .5s; -webkit-transform: rotateX(0deg);';
					div_old.style.cssText += '-webkit-transition: .5s; -webkit-transform: rotateX(180deg);';
				}, 1);
				break;
				
			case 'pop-in':
				// init divs
				div_old.style.cssText += comcss +'-webkit-transform: translate3d(0, 0, 0);';
				div_new.style.cssText += comcss +'-webkit-transform: translate3d(0, 0, 0); -webkit-transform: scale(.8); opacity: 0;';
				div_new.innerHTML = HTML;
				// -- need a timing function because otherwise not working
				window.setTimeout(function() {
					div_new.style.cssText += '-webkit-transition: .5s; -webkit-transform: scale(1); opacity: 1;';
					div_old.style.cssText += '-webkit-transition: .5s;';
				}, 1);
				break;
				
			case 'pop-out':
				// init divs
				div_old.style.cssText += comcss +'-webkit-transform: translate3d(0, 0, 0); -webkit-transform: scale(1); opacity: 1;';
				div_new.style.cssText += comcss +'-webkit-transform: translate3d(0, 0, 0); opacity: 0;';
				div_new.innerHTML = HTML;
				// -- need a timing function because otherwise not working
				window.setTimeout(function() {
					div_new.style.cssText += '-webkit-transition: .5s; opacity: 1;';
					div_old.style.cssText += '-webkit-transition: .5s; -webkit-transform: scale(1.7); opacity: 0;';
				}, 1);
				break;
				
			default:
				// init divs
				div_old.style.cssText += comcss +'-webkit-transform: translate3d(0, 0, 0); opacity: 1;';
				div_new.style.cssText += comcss +'-webkit-transform: translate3d(0, 0, 0); opacity: 0;';
				div_new.innerHTML = HTML;
				// -- need a timing function because otherwise not working
				window.setTimeout(function() {
					div_new.style.cssText += '-webkit-transition: .5s; opacity: 1;';
					div_old.style.cssText += '-webkit-transition: .5s; opacity: 1;';
				}, 1);
				break;
		}
		// isert another DIV (needed for iScroll)
		var tmp = $('.content', div_new)[0];
		if (tmp) tmp.innerHTML = '<div>' + tmp.innerHTML + '</div>';
		// insert <span> for back and forward buttons
		var tmp = $('.toolbar .button.back', div_new)[0];
		if (tmp) tmp.innerHTML = '<span class="s1"></span><span class="s2"></span>' + tmp.innerHTML;		
		var tmp = $('.toolbar .button.next', div_new)[0];
		if (tmp) tmp.innerHTML = '<span class="s1"></span><span class="s2"></span>' + tmp.innerHTML;		
		// execute scripts
		var d =	div_new.getElementsByTagName("script");
		var t = d.length;
		for (var x = 0; x < t; x++) {
			var ns = document.createElement('script');
			ns.type = "text/javascript";
			if (d[x].text != '') ns.text = d[x].text;
			if (d[x].src  != '') ns.src  = d[x].src;
			div_new.appendChild(ns);
		}				
		// -------
		this.resize();
		this.initScroll();
		//setTimeout("window.elements['"+ this.name +"'].initScroll();", 600); // if init scroll right away, then it slides upwards
	}
	
	function bikeidentificator_initScroll() {
		// make sure iScroll library is loaded
		if (String(window.iScroll) == 'undefined') {
			alert('You need to include iScroll.js library');
			return;
		}
		// make divs scrollable
		if (this._lastDiv) {
			var div = $('#'+ this.name +' > .bikeidentificator.div1 > div.content')[0];
		} else {
			var div = $('#'+ this.name +' > .bikeidentificator.div2 > div.content')[0];
		}
		// if (this.scroll) this.scroll.destroy(); // if destoyed - it flicks
		this.scroll = new iScroll(div, { desktopCompatibility: true, zoom: false });
		setTimeout(new Function("window.elements['"+ this.name +"'].scroll.refresh()"), 100);
	}
	
	function bikeidentificator_initTabs() {
		// if there are tabs - show/hide them, create onclick function
		$('#'+ this.name +' div.footer a').each( function (i, el) {	
			$(el).bind('touchstart', function () { $(this).click(); });
			$(el).bind('click', function() { 
				var currObj = bikeidentificator.getCurrentBox(window.event.currentTarget);
				$('#'+ currObj.name +' a').removeClass('clicked');
				$(window.event.currentTarget).addClass('clicked'); 
			});
		});
	}
	
	function bikeidentificator_initLinks() {
		// toolbar imediate click
		$('#'+ this.name +' div.toolbar a').bind('touchstart', new Function(
			"$('#"+ this.name +" div.toolbar a, #"+ this.name +" div.content a').removeClass('clicked');"+
			"$(this).addClass('clicked');"));
		// list click when not scrolling
		$('#'+ this.name +' div.toolbar a, #'+ this.name +' div.content a').click(new Function(
			"$('#"+ this.name +" div.toolbar a, #"+ this.name +" div.content a').removeClass('clicked');"+
			"$(this).addClass('clicked');"));
	}
	
	function bikeidentificator_resize() {
		// get width and height of the div
		var width  = this.width;
		var height = this.height;
		if (width == '')  width  = window.innerWidth;
		if (height == '') height = window.innerHeight;
		if (parseInt(width) < 0)  width = window.innerWidth + width;
		if (parseInt(height) < 0) height = window.innerHeight + height;

		// make divs scrollable
		if (this._lastDiv) { var tmp = 'div1'; } else { var tmp = 'div2'; }

		var div = $('#'+ this.name +' > .bikeidentificator.'+ tmp +' > div.content')[0];
		var isToolbar = ($('#'+ this.name +' > .bikeidentificator.'+ tmp +' > div.toolbar').length > 0 ? true : false);
		var isFooter  = ($('#'+ this.name +' > .bikeidentificator.'+ tmp +' > div.footer').length > 0 ? true : false);
		if (isToolbar) $(div).css('top', '45px');
		if (isFooter) $(div).css('bottom', '50px');

		// -- apply width (toolbar and footer)
		$('#'+ this.name).css('width', width+'px');
		$('#'+ this.name +' div.div1').css('width', width+'px');
		$('#'+ this.name +' div.div2').css('width', width+'px');
		$('#'+ this.name).css('height', height+'px');
		$('#'+ this.name +' div.div1').css('height', height+'px');
		$('#'+ this.name +' div.div2').css('height', height+'px');		
		// -- toolbar and footer
		$('#'+ this.name +' div.toolbar').css('width', width+'px');
		$('#'+ this.name +' div.footer').css('width', width+'px');
		// -- set scroll to 0, 0 (in the browser it will hide url bar)
		window.scrollTo(0, 1);		
	}
	
	// -- register in elements array
    if (!window.elements) window.elements = [];
    if (window.elements[this.name]) alert('The element with this name "'+ this.name +'" is already registered.');
    window.elements[this.name] = this;
	
	// -- init all param variables
	if (params != null && typeof(params) == 'object' && String(params) == '[object Object]') { // javascript object
		for (var e in params) { this[e] = params[e]; }
	}		
	
	// -- append 2 divs into the box (needed for transitions)
	var div1 = document.createElement('DIV');
	var div2 = document.createElement('DIV');
	div1.className = 'bikeidentificator div1';
	div2.className = 'bikeidentificator div2';
	$('#'+this.name).append(div1);
	$('#'+this.name).append(div2);
	// -- resize event
	// window.addEventListener('resize', new Function("setTimeout(\"window.elements['"+ this.name +"'].resize()\", 1)"));
}

// -- few events
window.addEventListener('resize', new Function("setTimeout(\"bikeidentificator.resize()\", 1)"));
window.applicationCache.addEventListener('updateready', function(){ window.applicationCache.swapCache(); }, false);
//window.addEventListener('updateready', function(){ window.applicationCache.swapCache(); }, false);



if ( navigator.userAgent.indexOf("BlackBerry") != (-1)  ){
	window.location.href = 'bbindex.html';
}


function ar_alert(xtesto){
	bikeidentificator.overlayHTML('<div class=\'content\'>'+xtesto+'</div>', {   });
}

		

function ar_confirm(xtesto,xfunction){


	xconfirm=false 
	msg="<div class='content'>"+xtesto+"</div>"
	msg+="<div class='footer'>"
	msg+="<a href='javascript: bikeidentificator.overlayClose();"+xfunction+"' class='button-green' style='width: 70px;'> SI </a>" 
	msg+="<a href='javascript: xconfirm=true;  bikeidentificator.overlayClose();' class='button-gray' style='width: 70px;'> NO </a>"
	msg+="</div>"

	 bikeidentificator.overlayHTML(msg, {  modal: true } );
}



function arload(pagina,xapri_pagina,xtitolo,xargomento,modo) 
{
	document.getElementById('messaggi').innerHTML='';
	apri_pagina=xapri_pagina;
	titolo=xtitolo;
	argomento=xargomento;	
	bikeidentificator.loadPage("pages/"+pagina+'?dummy='+gps_time() , modo);
 }
 


var bikeidentificatorleft; 
var bikeidentificatorright;

function onDeviceReady() {
		geolocationWatchTimer = navigator.geolocation.watchPosition(suc_gps,fail_gps,options);									
}


$(document).ready(function () { 


	document.addEventListener("deviceready", onDeviceReady, false)
	
	// create containers
	
	document.addEventListener("pause", onPause, false);    
	document.addEventListener("online", onOnLine, false);
	document.addEventListener("offline", onOffLine, false);
	document.addEventListener("backbutton", onBackKeyDown, false);

	$(document.body).append('<div id="bikeidentificatorleft" class="bikeidentificatorPanel" style="position: absolute; left: 0px; top: 0px; border-left: 0px !important;"></div>');
	$(document.body).append('<div id="bikeidentificatorright" class="bikeidentificatorPanel" style="position: absolute; left: 320px; top: 0px;"></div>');
	// init boxes
	bikeidentificatorleft = bikeidentificator.init('bikeidentificatorleft', { width: 320,  page: 'pages/menu.html' } );
	bikeidentificatorright = bikeidentificator.init('bikeidentificatorright', { width: -320, page: 'pages/info.html' } );
	// unload page event
	resize();																	

});
// events
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false); // prevent default scroll 
document.addEventListener('orientationchange', resize, false);
window.addEventListener('resize', resize, false);

function resize() {
	var width  = parseInt(window.innerWidth);
	var height = parseInt(window.innerHeight);
	if (width > 1000 || height > 1000) {
		mntarget="bikeidentificatorright";
		bikeidentificatorleft.width = 320;
		bikeidentificatorright.width = -320;
		$('#bikeidentificatorright').css('left', 320);
	} else {
		mntarget="bikeidentificatorleft";
		bikeidentificatorleft.width = width;
		$('#bikeidentificatorright').css('left', width);
	}
	bikeidentificator.resize();
}




// Convenience array of status values
var cacheStatusValues = [];
cacheStatusValues[0] = 'uncached';
cacheStatusValues[1] = 'idle';
cacheStatusValues[2] = 'checking';
cacheStatusValues[3] = 'downloading';
cacheStatusValues[4] = 'updateready';
cacheStatusValues[5] = 'obsolete';

// Listeners for all possible events
var cache = window.applicationCache;
cache.addEventListener('cached', logEvent, false);
cache.addEventListener('checking', logEvent, false);
cache.addEventListener('downloading', logEvent, false);
cache.addEventListener('error', logEvent, false);
cache.addEventListener('noupdate', logEvent, false);
cache.addEventListener('obsolete', logEvent, false);
cache.addEventListener('progress', logEvent, false);
cache.addEventListener('updateready', logEvent, false);

// Log every event to the console
function logEvent(e) {
    var online, status, type, message;
    online = (navigator.onLine) ? 'yes' : 'no';
    status = cacheStatusValues[cache.status];
    type = e.type;
    message = 'online: ' + online;
    message+= ', event: ' + type;
    message+= ', status: ' + status;
    if (type == 'error' && navigator.onLine) {
        message+= ' (prolly a syntax error in manifest)';
    }
    console.log(message);
}

// Swap in newly downloaded files when update is ready
window.applicationCache.addEventListener(
    'updateready', 
    function(){
		alert('cache ready');
        window.applicationCache.swapCache();
        console.log('swap cache has been called');
    }, 
    false
);

// Check for manifest changes every 10 seconds
setInterval(function(){cache.update()}, 15000);



scan()



