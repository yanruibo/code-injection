


     function onLoad(){
          document.addEventListener("deviceready", onDeviceReady, true);
     }
     function onDeviceReady(){
          //navigator.notification.alert("PhoneGap is working");
          var media = new Media('/android_asset/www/audio/pag_intro.mp3',function (e) {console.log(typeof(e)); alert('ok')},function () {alert('error')});
          media.play();
     }
  





	// If you want to prevent dragging, uncomment this section
	/*
	function preventBehavior(e) 
	{ 
      e.preventDefault(); 
    };
	document.addEventListener("touchmove", preventBehavior, false);
	*/
	
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	/*
	function handleOpenURL(url)
	{
		// TODO: do something with the url passed in.
	}
	*/
	
	function onBodyLoad()
	{		
		document.addEventListener("deviceready", onDeviceReady, false);
	}
	
	/* When this function is called, PhoneGap has been initialized and is ready to roll */
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	function onDeviceReady()
	{
		// do your thing!
		//navigator.notification.alert("PhoneGap is working")
	}
    
    

jQuery.fn.dump = function(showTypes, showAttributes) {
	jQuery.dump($(this), showTypes, showAttributes);
	return this;
};

jQuery.dump = function(object, showTypes, showAttributes) {
  var dump = '';
  var st = typeof showTypes == 'undefined' ? true : showTypes;
  var sa = typeof showAttributes == 'undefined' ? true : showAttributes;  
  var winName = 'dumpWin';
  var w = 760;
  var h = 500;
  var leftPos = screen.width ? (screen.width - w) / 2 : 0;
  var topPos = screen.height ? (screen.height - h) / 2 : 0;
  var settings = 'height=' + h + ',width=' + w + ',top=' + topPos + ',left=' + leftPos + ',scrollbars=yes,menubar=yes,status=yes,resizable=yes';
  var title = 'Dump';
  var script = 'function tRow(s) {t = s.parentNode.lastChild;tTarget(t, tSource(s)) ;}function tTable(s) {var switchToState = tSource(s) ;var table = s.parentNode.parentNode;for (var i = 1; i < table.childNodes.length; i++) {t = table.childNodes[i] ;if (t.style) {tTarget(t, switchToState);}}}function tSource(s) {if (s.style.fontStyle == "italic" || s.style.fontStyle == null) {s.style.fontStyle = "normal";s.title = "click to collapse";return "open";} else {s.style.fontStyle = "italic";s.title = "click to expand";return "closed" ;}}function tTarget (t, switchToState) {if (switchToState == "open") {t.style.display = "";} else {t.style.display = "none";}}';	
  
 var _recurse = function (o, type) {
    var i;
	var j = 0;
	var r = '';
	type = _dumpType(o);
	switch (type) {		
	  case 'regexp':
	    var t = type;
	    r += '<table' + _dumpStyles(t,'table') + '><tr><th colspan="2"' + _dumpStyles(t,'th') + '>' + t + '</th></tr>';
	    r += '<tr><td colspan="2"' + _dumpStyles(t,'td-value') + '><table' + _dumpStyles('arguments','table') + '><tr><td' + _dumpStyles('arguments','td-key') + '><i>RegExp: </i></td><td' + _dumpStyles(type,'td-value') + '>' + o + '</td></tr></table>';  
	    j++;
	    break;
	  case 'date':
	    var t = type;
	    r += '<table' + _dumpStyles(t,'table') + '><tr><th colspan="2"' + _dumpStyles(t,'th') + '>' + t + '</th></tr>';
	    r += '<tr><td colspan="2"' + _dumpStyles(t,'td-value') + '><table' + _dumpStyles('arguments','table') + '><tr><td' + _dumpStyles('arguments','td-key') + '><i>Date: </i></td><td' + _dumpStyles(type,'td-value') + '>' + o + '</td></tr></table>';  
	    j++;
	    break;
	  case 'function':
	    var t = type;
	    var a = o.toString().match(/^.*function.*?\((.*?)\)/im); 
	    var args = (a == null || typeof a[1] == 'undefined' || a[1] == '') ? 'none' : a[1];
	    r += '<table' + _dumpStyles(t,'table') + '><tr><th colspan="2"' + _dumpStyles(t,'th') + '>' + t + '</th></tr>';
	    r += '<tr><td colspan="2"' + _dumpStyles(t,'td-value') + '><table' + _dumpStyles('arguments','table') + '><tr><td' + _dumpStyles('arguments','td-key') + '><i>Arguments: </i></td><td' + _dumpStyles(type,'td-value') + '>' + args + '</td></tr><tr><td' + _dumpStyles('arguments','td-key') + '><i>Function: </i></td><td' + _dumpStyles(type,'td-value') + '>' + o + '</td></tr></table>';  
	    j++;
	    break;
	  case 'domelement':
	    var t = type;
		var attr = '';
		if (sa) {
		  for (i in o) {if (!/innerHTML|outerHTML/i.test(i)) {attr += i + ': ' + o[i] + '<br />';}}
		}
	    r += '<table' + _dumpStyles(t,'table') + '><tr><th colspan="2"' + _dumpStyles(t,'th') + '>' + t + '</th></tr>';
	    r += '<tr><td' + _dumpStyles(t,'td-key') + '><i>Node Name: </i></td><td' + _dumpStyles(type,'td-value') + '>' + o.nodeName.toLowerCase() + '</td></tr>';  
		r += '<tr><td' + _dumpStyles(t,'td-key') + '><i>Node Type: </i></td><td' + _dumpStyles(type,'td-value') + '>' + o.nodeType + '</td></tr>'; 
		r += '<tr><td' + _dumpStyles(t,'td-key') + '><i>Node Value: </i></td><td' + _dumpStyles(type,'td-value') + '>' + o.nodeValue + '</td></tr>';
		if (sa) {
		  r += '<tr><td' + _dumpStyles(t,'td-key') + '><i>Attributes: </i></td><td' + _dumpStyles(type,'td-value') + '>' + attr + '</td></tr>';  		
		  r += '<tr><td' + _dumpStyles(t,'td-key') + '><i>innerHTML: </i></td><td' + _dumpStyles(type,'td-value') + '>' + o.innerHTML + '</td></tr>'; 
		  if (typeof o.outerHTML != 'undefined') {
		    r += '<tr><td' + _dumpStyles(t,'td-key') + '><i>outerHTML: </i></td><td' + _dumpStyles(type,'td-value') + '>' + o.outerHTML + '</td></tr>'; 
		  }
		}
	    j++;
	    break;		
	}
	if (/object|array/.test(type)) {
      for (i in o) {
	    var t = _dumpType(o[i]);
	    if (j < 1) {
	      r += '<table' + _dumpStyles(type,'table') + '><tr><th colspan="2"' + _dumpStyles(type,'th') + '>' + type + '</th></tr>';
		  j++;	  
	    }
	    if (typeof o[i] == 'object' && o[i] != null) { 
		  r += '<tr><td' + _dumpStyles(type,'td-key') + '>' + i + (st ? ' [' + t + ']' : '') + '</td><td' + _dumpStyles(type,'td-value') + '>' + _recurse(o[i], t) + '</td></tr>';	
	    } else if (typeof o[i] == 'function') {
		  r += '<tr><td' + _dumpStyles(type ,'td-key') + '>' + i + (st ? ' [' + t + ']' : '') + '</td><td' + _dumpStyles(type,'td-value') + '>' + _recurse(o[i], t) + '</td></tr>';  	
		} else {
		  r += '<tr><td' + _dumpStyles(type,'td-key') + '>' + i + (st ? ' [' + t + ']' : '') + '</td><td' + _dumpStyles(type,'td-value') + '>' + o[i] + '</td></tr>';  
	    }
	  }
	}
	if (j == 0) {
	  r += '<table' + _dumpStyles(type,'table') + '><tr><th colspan="2"' + _dumpStyles(type,'th') + '>' + type + ' [empty]</th></tr>'; 	
	}
	r += '</table>';
	return r;
  };	
  var _dumpStyles = function(type, use) {
  var r = '';
  var table = 'font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;cell-spacing:2px;';
  var th = 'font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;text-align:left;color: white;padding: 5px;vertical-align :top;cursor:hand;cursor:pointer;';
  var td = 'font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;vertical-align:top;padding:3px;';
  var thScript = 'onClick="tTable(this);" title="click to collapse"';
  var tdScript = 'onClick="tRow(this);" title="click to collapse"';
  switch (type) {
	case 'string':
	case 'number':
	case 'boolean':
	case 'undefined':
	case 'object':
	  switch (use) {
		case 'table':  
		  r = ' style="' + table + 'background-color:#0000cc;"';
		  break;
		case 'th':
		  r = ' style="' + th + 'background-color:#4444cc;"' + thScript;
		  break;
		case 'td-key':
		  r = ' style="' + td + 'background-color:#ccddff;cursor:hand;cursor:pointer;"' + tdScript;
		  break;
		case 'td-value':
		  r = ' style="' + td + 'background-color:#fff;"';
		  break;
	  }
	  break;
	case 'array':
	  switch (use) {
		case 'table':  
		  r = ' style="' + table + 'background-color:#006600;"';
		  break;
		case 'th':
		  r = ' style="' + th + 'background-color:#009900;"' + thScript;
		  break;
		case 'td-key':
		  r = ' style="' + td + 'background-color:#ccffcc;cursor:hand;cursor:pointer;"' + tdScript;
		  break;
		case 'td-value':
		  r = ' style="' + td + 'background-color:#fff;"';
		  break;
	  }	
	  break;
	case 'function':
	  switch (use) {
		case 'table':  
		  r = ' style="' + table + 'background-color:#aa4400;"';
		  break;
		case 'th':
		  r = ' style="' + th + 'background-color:#cc6600;"' + thScript;
		  break;
		case 'td-key':
		  r = ' style="' + td + 'background-color:#fff;cursor:hand;cursor:pointer;"' + tdScript;
		  break;
		case 'td-value':
		  r = ' style="' + td + 'background-color:#fff;"';
		  break;
	  }	
	  break;
	case 'arguments':
	  switch (use) {
		case 'table':  
		  r = ' style="' + table + 'background-color:#dddddd;cell-spacing:3;"';
		  break;
		case 'td-key':
		  r = ' style="' + th + 'background-color:#eeeeee;color:#000000;cursor:hand;cursor:pointer;"' + tdScript;
		  break;	  
	  }	
	  break;
	case 'regexp':
	  switch (use) {
		case 'table':  
		  r = ' style="' + table + 'background-color:#CC0000;cell-spacing:3;"';
		  break;
		case 'th':
		  r = ' style="' + th + 'background-color:#FF0000;"' + thScript;
		  break;
		case 'td-key':
		  r = ' style="' + th + 'background-color:#FF5757;color:#000000;cursor:hand;cursor:pointer;"' + tdScript;
		  break;
		case 'td-value':
		  r = ' style="' + td + 'background-color:#fff;"';
		  break;		  
	  }	
	  break;
	case 'date':
	  switch (use) {
		case 'table':  
		  r = ' style="' + table + 'background-color:#663399;cell-spacing:3;"';
		  break;
		case 'th':
		  r = ' style="' + th + 'background-color:#9966CC;"' + thScript;
		  break;
		case 'td-key':
		  r = ' style="' + th + 'background-color:#B266FF;color:#000000;cursor:hand;cursor:pointer;"' + tdScript;
		  break;
		case 'td-value':
		  r = ' style="' + td + 'background-color:#fff;"';
		  break;		  
	  }	
	  break;
	case 'domelement':
	case 'document':
	case 'window':
	  switch (use) {
		case 'table':  
		  r = ' style="' + table + 'background-color:#FFCC33;cell-spacing:3;"';
		  break;
		case 'th':
		  r = ' style="' + th + 'background-color:#FFD966;"' + thScript;
		  break;
		case 'td-key':
		  r = ' style="' + th + 'background-color:#FFF2CC;color:#000000;cursor:hand;cursor:pointer;"' + tdScript;
		  break;
		case 'td-value':
		  r = ' style="' + td + 'background-color:#fff;"';
		  break;		  
	  }	
	  break;	  
  }
  return r;
  };
  var _dumpType = function (obj) {
    var t = typeof(obj);
    if (t == 'function') {
      var f = obj.toString();
      if ( ( /^\/.*\/[gi]??[gi]??$/ ).test(f)) {
        return 'regexp';
      } else if ((/^\[object.*\]$/i ).test(f)) {
        t = 'object'
      }
    }
    if (t != 'object') {
      return t;
    }
    switch (obj) {
      case null:
        return 'null';
      case window:
        return 'window';
	  case document:
	    return 'document';
      case window.event:
        return 'event';
    }
    if (window.event && (event.type == obj.type)) {
      return 'event';
    }
    var c = obj.constructor;
    if (c != null) {
      switch(c) {
        case Array:
          t = 'array';
          break;
        case Date:
          return 'date';
        case RegExp:
          return 'regexp';
        case Object:
          t = 'object';	
        break;
        case ReferenceError:
          return 'error';
        default:
          var sc = c.toString();
          var m = sc.match(/\s*function (.*)\(/);
          if (m != null) {
            return 'object';
          }
      }
    }
    var nt = obj.nodeType;
    if (nt != null) {
      switch(nt) {
        case 1:
          return 'domelement';
        case 3:
          return 'string';
      }
    }
    if (obj.toString != null) {
      var ex = obj.toString();
      var am = ex.match(/^\[object (.*)\]$/i);
      if (am != null) {
        var am = am[1];
        switch(am.toLowerCase()) {
          case 'event':
            return 'event';
          case 'nodelist':
          case 'htmlcollection':
          case 'elementarray':
            return 'array';
          case 'htmldocument':
            return 'htmldocument';
        }
      }
    }
    return t;
  };  
  dump += (/string|number|undefined|boolean/.test(typeof(object)) || object == null) ? object : _recurse(object, typeof object);
  winName = window.open('', '', settings);
  if (jQuery.browser.msie || jQuery.browser.browser == 'opera' || jQuery.browser.browser == 'safari') {
	winName.document.write('<html><head><title> ' + title + ' </title><script type="text/javascript">' + script + '</script><head>');
	winName.document.write('<body>' + dump + '</body></html>');
  } else {
	winName.document.body.innerHTML = dump;
	winName.document.title = title;
	var ffs = winName.document.createElement('script');
	ffs.setAttribute('type', 'text/javascript');
	ffs.appendChild(document.createTextNode(script));
	winName.document.getElementsByTagName('head')[0].appendChild(ffs);
  }
  winName.focus();  
};





                
                
                // If you want to prevent dragging, uncomment this section
                
                function preventBehavior(e) 
                { 
                    e.preventDefault(); 
                };
                document.addEventListener("touchmove", preventBehavior, false);
                
                
                /* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
                 see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
                 for more details -jm */
                /*
                 function handleOpenURL(url)
                 {
                 // TODO: do something with the url passed in.
                 }
                 */
                
                var googleAnalytics;
                function onBodyLoad()
                {		
                	document.addEventListener("pause", function () {  
                		if (my_media != undefined) {
                			stopping = 1;
                			my_media.stop();
                		}
                		
                	}, false);
                    document.addEventListener("deviceready", onDeviceReady, false);
                    console.log($(window).width());
                    if ($(window).width() <768 ) {
                        var margin = ($(window).width()- $('.resize').width() / 2)/2;
                        var margin = 0;
                        $('.resize').css({
                                         '-webkit-transform': 'scale(0.8,0.8)',
                                         'margin-top': '-12px', 
                                         'margin-left': margin+"px"
                                         
                                         
                                         });
                        
                        
                    }

                }
                
                /* When this function is called, PhoneGap has been initialized and is ready to roll */
                /* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
                 see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
                 for more details -jm */
                function onDeviceReady()
                {
                    // do your thing!
                    //navigator.notification.alert("PhoneGap is working")
                   mediaStart();
                   /* googleAnalytics = window.plugins.googleAnalyticsPlugin;
                    googleAnalytics.startTrackerWithAccountID("UA-28910717-1");
                    
                    googleAnalytics.trackPageview("/application/slideshow");
                    */
                   pageTracker._trackPageview('/android/application/slideshow');
                }
                
                var stop = 0;
                
                function start() {
                    stop = 1;
                    my_media.stop(); 
                    window.location.href='main.html'; 
                    
                }
                
                function mediaStart() 
                {
                    
                   my_media = new Media('/android_asset/www/audio/siglaarancino.mp3',onSuccess, onError);
                   my_media.play();
                    
                    //setInterval(timer,1400);
                }
                
                
                function onSuccess() {
                console.log("SUCCESS"); 
                    if (stop == 0) {
                        //console.log("Stopped");
                        //media = new Media('audio/siglaarancino.mp3',onSuccess, onError);
                        //media.play();
                    }
                    
                }
                
                // onError Callback 
                //
                function onError(error) {
                    
                   // alert('code: '    + error.code    + '\n' + 
                   //       'message: ' + error.message + '\n');
                }
                
                
                
                

            $(document).ready( function(){
                             
                              $('#slideshow').crossSlide({
                                                         sleep: 2,
                                                         fade: 1
                                                         }, [
                                                             { src: 'images/slideshow/MG_2055.jpg' },
                                                             { src: 'images/slideshow/MG_2062.jpg' },
                                                             { src: 'images/slideshow/MG_2063.jpg' },
                                                             { src: 'images/slideshow/ANIMAZIONE298.jpg' },
                                                             { src: 'images/slideshow/ANIMAZIONE316.jpg' },
                                                             { src: 'images/slideshow/ANIMAZIONE391.jpg' },
                                                             { src: 'images/slideshow/ANIMAZIONE589.jpg' },
                                                             ]);
                              });
            
                              


  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-28910717-1']);
  _gaq.push(['_trackPageview']);
  var pageTracker = _gat._getTracker("UA-28910717-1"); pageTracker._trackPageview();
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();






	// If you want to prevent dragging, uncomment this section
	var my_media = null;
	
	function preventBehavior(e) 
	{ 
      e.preventDefault(); 
    };
	document.addEventListener("touchmove", preventBehavior, false);
	
	
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	/*
	function handleOpenURL(url)
	{
		// TODO: do something with the url passed in.
	}
	*/
	
	function onBodyLoad()
	{		
		var img = new Image();
		img.src = "images/JPG/05.jpg";
		document.addEventListener("pause", function () {  
    		if (my_media != undefined) {
    			stop = 1;
    			my_media.stop();
    		}
    		
    	}, false);
		document.addEventListener("deviceready", onDeviceReady, false);
        
        
        if ($(window).width() <768 ) {
            var margin = ($(window).width()- $('.resize').width() / 2)/2;
            margin= 0;
            $('.resize').css({
                             '-webkit-transform': 'scale(0.8,0.8)',
                             'margin-top': '-12px', 
                             'margin-left': margin+"px"

                             
                             });
            
            
        }
    
	}
	
	/* When this function is called, PhoneGap has been initialized and is ready to roll */
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	function onDeviceReady()
	{
		//console.log("CIAOOOOO");
		// do your thing!
		//navigator.notification.alert("PhoneGap is working")
		
		mediaStart();
		/*
		console.log("PLUGINS: "+JSON.stringify(window.plugins));
		
		window.plugins.googleAnalytics.start ("UA-28910717-1",       //UA-account ID
                function() { console.log("started") },             //successCallBack
                function() { console.log("didn't start") }         //failureCallBack
       );

        window.plugins.googleAnalytics.trackPageView (          //**NB**: NOTE CAPITAL 'V'
                "/android/application/main",                                    //Page  (include /)
                function() {console.log("tracked page view")},           //successCallBack   
                function() {console.log("didn't track page view")}       //failureCallBack
       );

        */
		
        //        console.log("aaaaaaaaaaaaaa"+plugins);
	}
    
        var stop = 0;
        var googleAnalytics;   
        
        
        function start() {
        	window.location.href='main.html';
            stop = 1;
            my_media.stop(); 
             
        
        }

        function mediaStart() 
        {
    
            my_media = new Media('/android_asset/www/audio/pag_intro.mp3',onSuccess, onError);

            my_media.play();
            
            //setInterval(timer,1400);
        }
        
        
        function onSuccess(e) {
        	if (e != undefined) return;
            if (stop == 0) {
                //console.log("Stopped");
                $('#cover').attr('src','images/home.jpg');
                my_media = new Media('/android_asset/www/audio/siglaarancino.mp3',onSuccess, onError);
                my_media.play();
            }
            
        }
        
        // onError Callback 
        //
        function onError(error) {
            
          //  alert('code: '    + error.code    + '\n' + 
          //        'message: ' + error.message + '\n');
        }
        
        
        
    





	// If you want to prevent dragging, uncomment this section
	/*
	function preventBehavior(e) 
	{ 
      e.preventDefault(); 
    };
	document.addEventListener("touchmove", preventBehavior, false);
	*/
	
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	/*
	function handleOpenURL(url)
	{
		// TODO: do something with the url passed in.
	}
	*/
	
	function onBodyLoad()
	{		
		document.addEventListener("deviceready", onDeviceReady, false);
	}
	
	/* When this function is called, PhoneGap has been initialized and is ready to roll */
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	function onDeviceReady()
	{
		// do your thing!
		//navigator.notification.alert("PhoneGap is working")
	}
    
    





	// If you want to prevent dragging, uncomment this section

	
	function preventBehavior(e) {
		e.preventDefault();
	};
	document.addEventListener("touchmove", preventBehavior, false);

	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	/*
	function handleOpenURL(url)
	{
		// TODO: do something with the url passed in.
	}
	 */

	/* When this function is called, PhoneGap has been initialized and is ready to roll */
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */

	var googleAnalytics;
	var debug = 0;
	var nextPageInterval = undefined;
	var currentPage = 5;
	var stopping = 0;

	function preload() {
		if (currentPage == 5)
			page = 6;
		else
			page = currentPage + 2;
		if (page < 10)
			page = "0" + page;
		var img = new Image();

		img.src = 'images/JPG/' + page + '.jpg';
		//console.log("****************************** preload "  img.src);
	}

	function onDeviceReady() {
		
		
        
		document.addEventListener("pause", function() {
			if (my_media != undefined) {
				stopping = 1;
				my_media.stop();
			}

		}, false);

		loadPage(5);
		preload();
		// do your thing!
	}

	function loadPage(page) {
		stopping = 0;
		
//		_gaq.push([ '_trackPageview', '/android/application/page' + page ]);

		$('#image').hide();
		$('body').hide();
		$('.righe').remove();

		//if (page != currentPage)
		//	pageTurn();
		currentPage = page;
		$('body').fadeOut(
				function() {
					
					$('*').clearQueue().stop();
					$('#shakeme').css('left', '0');

					if (typeof (my_media) == 'object')
						my_media.stop();
					if (nextPageInterval != undefined)
						clearTimeout(nextPageInterval);

					if (page == 0) {
						window.location.href = 'index.html';
						return;
					}

					if (page == 32) {
						window.location.href = 'slideshow.html';
						return;
					}
					
					console.log('loading... ' + "page1/page" + page + ".js");
					
					$.ajax({
						type : "POST",
						url : "page1/page" + page + ".js",
						dataType : "script",
						success : function() {
							
							preload();
						}
					});
				});

	}
	function onBodyLoad() {

		if (debug == 1)
			onDeviceReady();
		// console.log("load...");
		//init();
		// console.log("Device ready");
        
		document.addEventListener("deviceready", onDeviceReady, false);
		//console.log($(window).width());
		if ($(window).width() < 768) {
			//var margin = ($(window).width()- $('.resize').width() / 2)/2;
			var margin = 0;
			$('.resize').css({
				'-webkit-transform' : 'scale(0.8,0.8)',
				'margin-top' : '-12px',
				'margin-left' : margin + "px"

			});

		}
		
		
	}

	function init() {
		stopping = 0;
		$('body').hide();
		setupFumetti();
		$('body').delay(500).fadeIn();

	}

	function setupFumetti() {

		var i, j, u;
		var div_id;
		var righe_fumetto = "";
		for (i in data) {
			righe_fumetto = data[i];
			for (j in righe_fumetto) {
				var id_riga = j;
				var obj_riga = righe_fumetto[j];

				var times = obj_riga["times"];
				var dom_element = createFinestraDomElement(i, id_riga, obj_riga);

				dom_element.appendTo('#content');

			}
		}

	}

	function startAnimations() {

		var i, j, u;
		var div_id;
		var righe_fumetto = "";
		for (i in data) {
			righe_fumetto = data[i];
			for (j in righe_fumetto) {
				var id_riga = j;
				var obj_riga = righe_fumetto[j];

				$('#' + i + '_' + j).delay(obj_riga.delay - 300).animate({
					left : '100%'
				}, obj_riga.length);

				// animate({opacity:1},200,'easeOutExpo')
				// $('#'+i+'_'+j).animate({opacity:1},obj_riga.delay,'easeOutExpo').animate({left: '100%'},obj_riga.length);

			}
		}

	}

	function createFinestraDomElement(fumetto_id, riga_id, obj) {
		var color = 'white';
		if (fumetto_id.indexOf('intro') == 0)
			color = '#f6e749';
		var element = $('<div class="righe" style="position: absolute; top: '+obj.top+'; left: '+obj.left+'; height: '+obj.height+'; width: '+obj.width+'; overflow: hidden; background-color: transparent"><div id="'
				+ fumetto_id
				+ '_'
				+ riga_id
				+ '" style="position: absolute; top: 0; left: 0%; height: 100%;width: 100%; background-color: '
				+ color + '; opacity: 0.8" class="riga"></div></div>');

		return element;

	}

	function pageTurn() {
		console.log("TURN START");
		if (debug == 1)
			return;
		var media1 = new Media('/android_asset/www/audio/page_turn.mp3',
				function() {
				}, function() {
				});
		media1.play();

	}

	function mediaStart() {
		
		//console.log("AUDIO START!!!!!!!!");

		if (debug == 1)
			return;
		my_media = new Media(audioFile, onAudioEnd, onError, onStatus);
		//alert("ciao1");
		my_media.play();
		
		
        
		
		//alert("ciao2");
        console.log("Media Play di "+audioFile);
		var counter = 0;
		var timerDur = setInterval(function() {
			//console.log("ppppppp");
			var dur = my_media.getDuration();
			console.log("DURATA: " + dur);
			if (dur > 0) {

				clearInterval(timerDur);

				nextPageInterval = setTimeout(function() {
					console.log("PROSSIMA PAGINA");
					console.log($('#next a'));
					$('#next a').mousedown();
				}, dur * 1000);
			}
		}, 500);

		//setInterval(timer,1400);
	}

	function onAudioEnd(e) {
		console.log("!!!!! " + e);
		if (e != undefined)
			return;
		
		console.log("AUDIO END");
		if (stopping == 1) {
			alert("Rileggi la pagina");
			loadPage(currentPage);
		} else {
			console.log("GIRA STA PAGGINA");

			//$('#next a').mousedown();

		}

	}

	function onSuccess(e) {
		if (e != undefined)
			return;
		console.log("MEDIA END");
	}

	// onError Callback 
	//
	function onError(error) {
		console.log("ERROR"+error);
		// alert('code: '    + error.code    + '\n' + 
		//       'message: ' + error.message + '\n');
	}

	function playToggle() {

		if ($('#play-button').is(':visible')) {
			//media.stop();
			// Stop

			//$('#play-button').hide();
			//$('#stop-button').show();

		} else {
			stopping = 1;
			console.log("STOPPING = " + stopping);

			my_media.stop();
			clearTimeout(nextPageInterval);
			nextPageInterval = undefined;

			//$('#play-button').show();
			//$('#stop-button').hide();
			//console.log('STOP');

		}
	}


data = {"fumetto1" : {
    "riga1": { // Secondo me, siete pazzi
        height: "2.23463687150838%",
        left: "8.222811671087532%",
        top: "6.33147113594041%",
        width: "31.299734748010607%",                   
        delay: 480,
        length: 2462
    },
    "riga2": { // ed incoscienti
        height: "1.6759776536312856%",
        left: "8.488063660477454%",
        top: "8.379888268156424%",
    width: "19.098143236074268%",                   
    delay: 2401,
    length: 1700
    },
},
    
    "fumetto2" : {
        "riga1": { // c-come?
            height: "1.8621973929236475%",
            left: "26.52519893899204%",
            top: "38.98985310417758%",
        width: "11.936339522546419%",                   
        delay: 4036,
        length: 1170
        }            
    },
    
    
    
    "fumetto3" : {
        "riga1": { // ho detto che siete dei pazzi
            height: "1.8621973929236502%",
            left: "53.58090185676392%",
            top: "7.262569832402234%",
        width: "37.931034482758626%",                   
        delay: 4985,
        length: 2704
        }            
    },
    
    
    "fumetto4" : {
        "riga1": { // e perchè?
            height: "2.0484171322160165%",
            left: "70.026525198939%",
            top: "38.756767287156656%",
        width: "13.793103448275858%",                   
        delay: 7508,
        length: 1483

        }            
    },
    
    "fumetto5" : {
        "riga1": { // primo 
            "top": "48.476004693294776%",
            "left": "8.203125%",
            "width": "10.026041666666668%",
            "height": "1.6536964980544795%",                   
        delay: 9560,
        length: 1000
        },
        "riga2": { // perchè è pericoloso
            "top": "48.37872842870334%",
            "left": "18.229166666666668%",
            "width": "28.083333333333332%",
            "height": "1.7509727626459153%",                   
        delay: 10826,
        length: 960
        },

        "riga3": { // stare così vicino alla sponda
            height: "1.7759776536312856%",
            left: "7.957559681697613%",
            top: "49.929951644698555%",
        width: "40.58355437665783%",                   
        delay: 11736,
        length: 1816
            
        }
    },
    
    
    "fumetto6" : {
        "riga1": { // si ma è 
            height: "1.8621973929236475%",
            left: "35.80901856763926%",
            top: "56.80484878284305%",
        width: "10.61007957559682%",                   
        delay: 13967,
        length: 655
        },
        "riga2": { // divertente
            height: "1.8621973929236475%",
            left: "33.687002652519894%",
            top: "58.48082643647434%",
        width: "15.119363395225463%",                   
        delay: 14592,
        length: 1009
        }
    },
    
    "fumetto7" : {
        "riga1": { // secondo
            "top": "86.78123385062014%",
            "left": "29.166666666666668%",
            "width": "13.281249999999996%",
            "height": "1.9455252918287869%",                   
        delay: 15453,
        length: 1178
        },
        "riga2": { // non è 
            "top": "86.57578637980301%",
            "left": "42.708333333333336%",
            "width": "8.984375%",
            "height": "2.0536964980544724%",                   
        delay: 16632,
        length: 392
        },

        "riga3": { // Una cosa intelligente
            height: "1.6621973929236475%",
            left: "26.52519893899204%",
            top: "88.59473731014315%",
        width: "28.616710875331563%",                   
        delay: 16984,
        length: 1433
        },
        "riga4": { // andare così
            height: "1.8621973929236475%",
            left: "31.83023872679045%",
            top: "90.17071496377444%",
        width: "16.976127320954905%",                   
        delay: 18276,
        length: 524
        },
        "riga5": { // All'avventura
            height: "1.8621973929236475%",
            left: "31.83023872679045%",
            top: "91.74669261740572%",
        width: "17.506631299734746%",                   
        delay: 18629,
        length: 1260
        },
        
    },
    
    
    "fumetto8" : {
        "riga1": { // ma qui
            height: "1.6759776536312856%",
            left: "68.926525198939%",
            top: "47.96353132365136%",
        width: "10.949071618037132%",                   
        delay: 20213,
        length: 544
        },
        "riga2": { // non è pericoloso
            height: "1.8759776536312856%",
            left: "59.41644562334218%",
            top: "49.639508977282645%",
        width: "30.503978779840843%",                   
        delay: 20732,
        length: 1079
        }
    },
    
    "fumetto9" : {
        "riga1": { // cosa vuoi che 
            height: "2.2221973929236475%",
            left: "65.78249336870026%",
            top: "88.46095704943552%",
        width: "19.893899204244036%",                   
        delay: 22050,
        length: 575
        },
        "riga2": { // ci succeda
            height: "1.8759776536312927%",
            left: "66.57824933687003%",
            top: "90.62315444235917%",
        width: "18.56763925729443%",                   
        delay: 22635,
        length: 736
        }
    },
    
};

//console.log('LOADING DONE');       


onStatus = function() {
  
    startAnimations();
    
}


$('#image').hide().attr('src','images/JPG/06.jpg').show();


$('#next').html('<a  alt="8" onmousedown="loadPage(8); return false;"><img src="images/icon-next.png"></a>').css('visibility','');
$('#prev').html('<a onmousedown="loadPage(5); return false;"><img src="images/icon-prev.png"></a>').css('visibility','');

init();
    audioFile = '/android_asset/www/audio/pag6.mp3';
    mediaStart();




 
  data = {
            "fumetto1" : {
           
                "riga1": { // AHIII 
                    "top": "44.898399026477385%",
                    "left": "17.708333333333332%",
                    "width": "7.8125%",
                    "height": "1.848249027237351%",
                    delay: 5707,
                    length: 782
                },
                "riga2": { // che botta!
                    "top": "44.898399026477385%",
                    "left": "25.260416666666668%",
                    "width": "15.494791666666668%",
                    "height": "1.945525291828794%",
                delay: 6576,
                length: 753                      
                },

                "riga3": { // Stavo per diventare una spremuta
                    "top": "46.60550458715596%",
                    "left": "8.463541666666666%",
                    "width": "44.661458333333336%",
                    "height": "1.6513761467889907%",
                delay: 7561,
                length: 1999                   
                },
                
        },
            
            "fumetto2" : {
                
                "riga1": { // AHHH 
                    "top": "49.85948852064081%",
                    "left": "61.197916666666664%",
                    "width": "10.716666666666664%",
                    "height": "1.6536964980544724%",
                delay: 9937,
                length: 898
                },
                "riga2": { // che volo!
                    "top": "49.76221225604937%",
                    "left": "71.74479166666667%",
                    "width": "13.802083333333329%",
                    "height": "1.945525291828794%",
                delay: 11182,
                length: 1361
                },
                
                               
            },

            "fumetto3" : {
                "riga0": { // mmmm
                    "top": "90.8154973724009%",
                    "left": "68.22916666666667%",
                    "width": "2.34375%",
                    "height": "1.6536964980544724%",
                delay: 12689,
                length: 1129
                },
                "riga1": { // Lo sapevo
                    "top": "90.8154973724009%",
                    "left": "70.57291666666667%",
                    "width": "12.760416666666657%",
                    "height": "1.945525291828801%",
                delay: 13790,
                length: 811
                },
                "riga2": { // Che dovevo starvi
                    "top": "92.26880733944953%",
                    "left": "64.97395833333333%",
                    "width": "23.30729166666667%",
                    "height": "1.959633027522949%",
                delay: 14386,
                length: 1126
                },
                "riga3": { // lontano
                    "top": "94.12844036697248%",
                    "left": "69.40104166666667%",
                    "width": "14.322916666666657%",
                    "height": "1.7431192660550323%",
                delay: 15397,
                length: 1123
                },
                
            },

        
    };
console.log('LOADING DONE');       


onStatus = function() {
    //$('body').fadeIn();
    
    startAnimations();
	
}


$('#image').hide().attr('src','images/JPG/08.jpg').show();

$('#prev').html('<a onmousedown="loadPage(6); return false;"><img src="images/icon-prev.png"></a>').css('visibility','');
$('#next').html('<a alt="10" onmousedown="loadPage(10); return false;"><img src="images/icon-next.png"></a>').css('visibility','');



init();

audioFile = '/android_asset/www/audio/pag8.mp3';

    mediaStart();
    $("#shakeme").delay(600).effect("shake", { times:4 }, 200); //,function () {$('#shakeme').effect("shake", { times:6 }, 300,function () {


//$("#shakeme").delay(600).effect("shake", { times:4 }, 200); //,function () {$('#shakeme').effect("shake", { times:6 }, 300,function () {
   
//})} );








	// If you want to prevent dragging, uncomment this section
	
	function preventBehavior(e) 
	{ 
      e.preventDefault(); 
    };
	document.addEventListener("touchmove", preventBehavior, false);
	
	
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	/*
	function handleOpenURL(url)
	{
		// TODO: do something with the url passed in.
	}
	*/
	
		
	/* When this function is called, PhoneGap has been initialized and is ready to roll */
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
 
        var data = {"fumetto1" : {
            "riga1": {
                height: "2.23463687150838%",
                left: "8.222811671087532%",
                top: "6.33147113594041%",
                width: "31.299734748010607%",                   
                times: [ 
                        {t: 0, perc: '0%'},
                        {t: 0.100, perc: '25%'},
                        {t: 0.200, perc: '50%'},
                        {t: 0.300, perc: '75%'},
                        {t: 0.400, perc: '100%'}
                        ],
            },
            "riga2": {
                height: "1.6759776536312856%",
                left: "8.488063660477454%",
                top: "8.379888268156424%",
                width: "19.098143236074268%",                  
                times: [ 
                        {t: 0, perc: '0%'},
                        {t: 0.100, perc: '25%'},
                        {t: 0.200, perc: '50%'},
                        {t: 0.300, perc: '75%'},
                        {t: 0.400, perc: '100%'}
                        ],
            },
        },
            
            "fumetto2" : {
                "riga1": {
                    height: "1.8621973929236475%",
                    left: "26.52519893899204%",
                    top: "38.98985310417758%",
                    width: "11.936339522546419%",
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                }            
            },
            
            
            
            "fumetto3" : {
                "riga1": {
                    height: "1.8621973929236502%",
                    left: "53.58090185676392%",
                    top: "7.262569832402234%",
                    width: "37.931034482758626%",
                    
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                }            
            },
            
            
            "fumetto4" : {
                "riga1": {
                    height: "2.0484171322160165%",
                    left: "70.026525198939%",
                    top: "38.756767287156656%",
                    width: "13.793103448275858%",        
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                }            
            },
            
            "fumetto5" : {
                "riga1": {
                    height: "1.8621973929236475%",
                    left: "7.161803713527852%",
                    top: "48.06775425177491%",
                    width: "39.52254641909814%",       
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                },
                "riga2": {
                    height: "1.6759776536312856%",
                    left: "7.957559681697613%",
                    top: "49.929951644698555%",
                    width: "40.58355437665783%",
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                }
            },
            
            
            "fumetto6" : {
                "riga1": {
                    height: "1.8621973929236475%",
                    left: "35.80901856763926%",
                    top: "56.80484878284305%",
                    width: "10.61007957559682%",       
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                },
                "riga2": {
                    height: "1.8621973929236475%",
                    left: "33.687002652519894%",
                    top: "58.48082643647434%",
                    width: "15.119363395225463%",
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                }
            },
            
            "fumetto7" : {
                "riga1": {
                    height: "1.8621973929236475%",
                    left: "28.647214854111407%",
                    top: "86.59875965651187%",
                    width: "23.076923076923077%",       
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                },
                "riga2": {
                    height: "1.8621973929236475%",
                    left: "26.52519893899204%",
                    top: "88.27473731014315%",
                    width: "28.116710875331563%",       
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                },
                "riga3": {
                    height: "1.8621973929236475%",
                    left: "31.83023872679045%",
                    top: "89.95071496377444%",
                    width: "16.976127320954905%",       
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                },
                "riga4": {
                    height: "1.8621973929236475%",
                    left: "31.83023872679045%",
                    top: "91.62669261740572%",
                    width: "17.506631299734746%",      
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                },
                
            },
            
            
            "fumetto8" : {
                "riga1": {
                    height: "1.6759776536312856%",
                    left: "70.026525198939%",
                    top: "47.96353132365136%",
                    width: "9.549071618037132%",       
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                },
                "riga2": {
                    height: "1.6759776536312856%",
                    left: "59.41644562334218%",
                    top: "49.639508977282645%",
                    width: "30.503978779840843%",
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                }
            },
            
            "fumetto9" : {
                "riga1": {
                    height: "1.8621973929236475%",
                    left: "65.78249336870026%",
                    top: "88.46095704943552%",
                    width: "19.893899204244036%",     
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                },
                "riga2": {
                    height: "1.6759776536312927%",
                    left: "66.57824933687003%",
                    top: "90.32315444235917%",
                    width: "18.56763925729443%",
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                }
            },
            
        };
        
 
        function onDeviceReady()
        {
            
            console.log("Device ready");
            init();
            mediaStart();                  
            
            $('body').show();
            
            // do your thing!
        }

        function onBodyLoad()
        {	
            console.log("load...");
            //init();
            document.addEventListener("deviceready", onDeviceReady, false);
        }

        
           function init() {
            setupFumetti(0.200);   
            var oldPercX=undefined,oldPercY=undefined;
            var rectangleOn = 0;
            var last_riga_ref = undefined;
            var edit = 0;
            
            $('#content').mousemove(function (e) {
                                    if (edit == 0) return;
                                    if (rectangleOn == 1 && oldPercX != undefined) {
                                    var newPercX = 100*(e.pageX - $('#content').offset().left)/$('#content').width();
                                    var newPercY = 100*(e.pageY - $('#content').offset().top)/$('#content').height();
                                    last_riga_ref.css(
                                                      {
                                                      top: oldPercY+'%',
                                                      left: oldPercX+'%',
                                                      width: (newPercX-oldPercX)+'%',
                                                      height: (newPercY-oldPercY)+'%'
                                                      });
                                    }
                                    });
           
            console.log("Attaching...");
            $('#content').mousedown(function (e) {
                                if (edit == 1) return;
                                var target = $(e.target);
                                //console.log(target);
                                console.log("!");

                                //if (target.is('.riga')) {
                                //console.log("!");

                                media.getCurrentPosition(function (dt) {
                                                         console.log(dt);                    
                                                         });
                                                         
                                //                         };
 
                                });
            
                                $('#content').click(function (e) {
                                                    
                                                    if (edit == 0) return;
                                                    
                                                    var newPercX = 100*(e.pageX - $('#content').offset().left)/$('#content').width();
                                                    var newPercY = 100*(e.pageY - $('#content').offset().top)/$('#content').height();
                                                    if (oldPercX != undefined) 
                                                    {
                                                    
                                                    var obj = {
                                                    top: oldPercY+'%',
                                                    left: oldPercX+'%',
                                                    width: (newPercX-oldPercX)+'%',
                                                    height: (newPercY-oldPercY)+'%' 
                                                    };
                                                    $('.righe').remove();
                                                    
                                                    var dom_element = createFinestraDomElement('a','b',obj);
                                                    
                                                    dom_element.appendTo('#content');
                                                    last_riga_ref = dom_element;
                                                    //console.log(obj);
                                                    rectangleOn = 1;
                                                    oldPercX = undefined;
                                                    oldPercY = undefined;
                                                    } else 
                                                    {
                                                    //$('.righe').remove();
                                                    oldPercX = newPercX;
                                                    oldPercY = newPercY;
                                                    
                                                    }
                                                    
                                                    
                                                    });
        }
                                    
        function setupFumetti(t) {
            
            var i,j,u;
            var div_id;
            var righe_fumetto = "";
            for (i in data)
            {
                righe_fumetto = data[i];
                for (j in righe_fumetto) {
                    var id_riga = j;
                    var obj_riga = righe_fumetto[j];
                    
                    var times = obj_riga["times"];
                    
                    // Identifica la % 
                    for (u in times) {
                        //console.log(t+">= "+times[u]['t']);
                        if (t >= times[u]["t"]) {
                            
                            var dom_element = createFinestraDomElement(i,id_riga,obj_riga);
                            
                            dom_element.appendTo('#content');
                            //console.log(dom_element);
                            break;
                            
                        }
                    }
                    
                    
                    
                }
            }
            
            
            
        }
        
        function createFinestraDomElement(fumetto_id,riga_id,obj) {
            var element = $('<div class="righe" style="position: absolute; top: '+obj.top+'; left: '+obj.left+'; height: '+obj.height+'; width: '+obj.width+'; overflow: hidden; background-color: transparent"><div id="'+fumetto_id+'_'+riga_id+'" style="position: absolute; top: 0; left: 0%; height: 100%;width: 100%; background-color: white; opacity: 0.8" class="riga"></div></div>');
            
            return element;                
            
        }
        
        

	function mediaStart() 
	{
        
		media = new Media('/page1/pag6.mp3',onSuccess, onError,onStatus);
		media.play();
        //setInterval(timer,1400);
	}
	
	function timer() {
		//media.getCurrentPosition(currentPosition);
		
	}
	
	function currentPosition(dt) {
		
		
	}
        function onStatus() {
            // Ho detto che siete dei pazzi
            $('#fumetto1_riga1').delay(480).animate({left: '100%'},2462);                       
            
            // E degli incoscienti
            $('#fumetto1_riga2').delay(2401).animate({left: '100%'},1700);                       
            
            // C-Come 
            $('#fumetto2_riga1').delay(4036).animate({left: '100%'},1170);   
            
            
            // Ho detto che siete dei pazzi
		    $('#dd').delay(4985).animate({left: '100%'},2704);     
            
            // E perchè?
		    $('#fumetto4_riga1').delay(7508).animate({left: '100%'},1483);
            
            
            // Primo perchè è pericoloso
            $('#fumetto5_riga1').delay(9597).animate({left: '100%'},2119);
            
            // stare vicino alla sponda
            $('#fumetto5_riga2').delay(11736).animate({left: '100%'},1816);
            
            
            // Si ma è 
            $('#fumetto6_riga1').delay(13967).animate({left: '100%'},655);
            
            // Divertente
            $('#fumetto6_riga2').delay(14592).animate({left: '100%'},1009);
            
            // Secondo me non è
            $('#fumetto7_riga1').delay(15369).animate({left: '100%'},1836);
            
            // Una cosa intelligente
            $('#fumetto7_riga2').delay(16984).animate({left: '100%'},1433);
           
            // Andare così
            $('#fumetto7_riga3').delay(18276).animate({left: '100%'},524);
           
            // All'avventura
            $('#fumetto7_riga4').delay(18629).animate({left: '100%'},1260);
            
            // Ma qui 
            $('#fumetto8_riga1').delay(20213).animate({left: '100%'},544);
            
            // Ma non è pericoloso
            $('#fumetto8_riga2').delay(20732).animate({left: '100%'},1079);
            
            // Cosa vuoi che 
            $('#fumetto9_riga1').delay(22050).animate({left: '100%'},575);
            
            // Ci succeda 
            $('#fumetto9_riga2').delay(22635).animate({left: '100%'},736);
            
            
            
            
        }
        
	// onSuccess Callback
        //
        function onSuccess() {
            console.log("playAudio():Audio Success");
        }

        // onError Callback 
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' + 
                  'message: ' + error.message + '\n');
        }
    
    


data = {
    "fumetto1" : {
        "riga0": { // Già
            "top": "6.031128404669261%",
            "left": "5.859375%",
            "width": "7.03125%",
            "height": "1.945525291828794%",
        delay: 836,
        length: 132 
        },
        
        "riga1": { // se non parlavamo
            "top": "6.128404669260701%",
            "left": "12.630208333333334%",
            "width": "31.77083333333333%",
            "height": "1.7509727626459144%",
            delay: 1180,
            length: 1229 
        },
        "riga2": { // con te non saremmo mai caduti fuori
            "top": "7.879377431906615%",
            "left": "5.4945054945054945%",
            "width": "39.01098901098901%",
            "height": "1.6536964980544742%",
            delay: 2212,
            length: 2016 
        },
        
        "riga3": { // dal camion
            "top": "9.53307392996109%",
            "left": "5.769230769230769%",
            "width": "17.58241758241758%",
            "height": "1.4591439688715955%",
            delay: 4180,
            length: 934 
        },
        
    },
    
    "fumetto2" : {
        
        "riga1": { // Adesso vorresti dire
            "top": "14.007782101167315%",
            "left": "14.423076923076923%",
            "width": "26.648351648351646%",
            "height": "1.7509727626459153%",
            delay: 5438,
            length: 1510 
        },
        "riga2": { // Che è colpa mia?
            "top": "15.66147859922179%",
            "left": "13.873626373626374%",
            "width": "23.35164835164835%",
            "height": "1.5564202334630348%",
            delay: 7010,
            length: 1227 
        },
        
    },
    
    "fumetto3" : {
        "riga0": { // Calma ragazzi
            "top": "49.80544747081712%",
            "left": "19.642857142857142%",
            "width": "23.48901098901099%",
            "height": "1.7509727626459153%",
        delay: 8495,
        length: 1215 
        },
        "riga1": { // litigare
            "top": "51.69692874418622%",
            "left": "19.921875%",
            "width": "12.109375%",
            "height": "1.7509727626459153%",
            delay: 9737,
            length: 786 
        },
        "riga2": { // non
            "top": "51.67801556420233%",
            "left": "32.161458333333336%",
            "width": "6.380208333333329%",
            "height": "1.8482490272373582%",
        delay: 10671,
        length: 295 
        },
        "riga3": { // Serve a nulla
            "top": "53.40466926070039%",
            "left": "19.642857142857142%",
            "width": "21.56593406593407%",
            "height": "1.6536964980544795%",
            delay: 10917,
            length: 1376 
        },
        
        
    },
    
    
    "fumetto4" : {
        
        "riga1": { // Comunque, anche se non è il 
            "top": "5.058365758754864%",
            "left": "48.35164835164835%",
            "width": "39.56043956043956%",
            "height": "1.8482490272373546%",
            delay: 12197,
            length: 1792 
        },
        "riga2": { // momento più giusto
            "top": "6.809338521400778%",
            "left": "48.76373626373626%",
            "width": "26.236263736263737%",
            "height": "1.7509727626459144%",       
            delay: 14008,
            length: 1203  
        },
        "riga3": { // Io sono Arancino, piacere
            "top": "8.463035019455253%",
            "left": "48.76373626373626%",
            "width": "36.81318681318682%",
            "height": "1.8536964980544742%",
            delay: 15371,
            length: 2001 
        },
        
    },
    "fumetto5" : {
        
        "riga1": { // melina
            "top": "15.66147859922179%",
            "left": "75.41208791208791%",
            "width": "10.714285714285708%",
            "height": "1.8482490272373564%",
            delay: 17777,
            length: 1227 
        }
        
    },
    "fumetto6" : {
        "riga0": { // Come no 
            "top": "58.29280155642024%",
            "left": "6.770833333333333%",
            "width": "13.932291666666668%",
            "height": "1.9455252918287869%",
        delay: 19178,
        length: 836 
        },
        
        "riga1": { // le presentazioni
            "top": "58.39007782101167%",
            "left": "20.442708333333332%",
            "width": "21.744791666666668%",
            "height": "1.9536964980544724%",
            delay: 19916,
            length: 1475 
        },
        "riga2": { // bleahhh
            "top": "58.39007782101167%",
            "left": "42.057291666666664%",
            "width": "12.197916666666671%",
            "height": "1.848249027237351%",      
        delay: 21244,
        length: 688 
        },
        
        "riga3": { // io ne faccio volentieri a
            "top": "60.11673151750973%",
            "left": "8.37912087912088%",
            "width": "36.675824175824175%",
            "height": "1.7509727626459153%",       
            delay: 21927,
            length: 1129 
        },
        "riga4": { // meno
            "top": "61.673151750972764%",
            "left": "7.142857142857143%",
            "width": "9.478021978021978%",
            "height": "1.7509727626459153%",
            delay: 23069,
            length: 515 
            
        },
        
    },
    
    "fumetto7" : {
        "riga0": { // Eeheh 
            "top": "60.408557342648045%",
            "left": "62.239583333333336%",
            "width": "9.374999999999993%",
            "height": "1.945525291828794%",
        delay: 23801,
        length: 1180 
        },
        
        "riga1": { // non ci fare caso 
            "top": "60.103109871830924%",
            "left": "71.875%",
            "width": "24.08854166666667%",
            "height": "2.2509727626459153%",
            delay: 24785,
            length: 1376 
        },
        
        "riga2": { // E' solo un po acido
            "top": "62.2568093385214%",
            "left": "62.22527472527472%",
            "width": "30.357142857142854%",
            "height": "1.6536964980544724%",
            delay: 26150,
            length: 1461 
        },
        
    },    

    
    
};
//console.log('LOADING DONE');       


onStatus = function() {
    //$('body').fadeIn();
    startAnimations();                        
    }
                                             

                                          
$('#image').hide().attr('src','images/JPG/10.jpg').show();
                                             
$('#prev').html('<a onmousedown="loadPage(8); return false;"><img src="images/icon-prev.png"></a>').css('visibility','');
$('#next').html('<a  alt="12"  onmousedown="loadPage(12); return false;"><img src="images/icon-next.png"></a>').css('visibility','');
                                             
init();                                             
                                                                        
audioFile = '/android_asset/www/audio/pag10.mp3';
                                             
mediaStart();

                                            

$('#fumetto1_riga1').delay(870).animate({left: '100%'},1497);                       
$('#fumetto2_riga1').delay(2681).animate({left: '100%'},2031);     
$('#fumetto3_riga1').delay(5015).animate({left: '100%'},1462);     
$('#fumetto3_riga2').delay(6513).animate({left: '100%'},1021);

$('#fumetto4_riga1').delay(7906).animate({left: '100%'},766);
$('#fumetto4_riga2').delay(8637).animate({left: '100%'},905);
$('#fumetto4_riga3').delay(9671).animate({left: '100%'},963);
$('#fumetto4_riga4').delay(10643).animate({left: '100%'},545);

$('#fumetto5_riga1').delay(11818).animate({left: '100%'},1393);


        var data = {"fumetto1" : {
                      "riga1": {
                          height: "1.6728624535315966%",
                          left: "12.962962962962964%",
                          top: "17.843866171003718%",
                          width: "25.925925925925924%",                        
                          times: [ 
                                  {t: 0, perc: '0%'},
                                  {t: 0.100, perc: '25%'},
                                  {t: 0.200, perc: '50%'},
                                  {t: 0.300, perc: '75%'},
                                  {t: 0.400, perc: '100%'}
                                ],
                        },
                      },
            
                    "fumetto2": {
                        "riga1": {
                            height: "1.672862453531593%",
                            left: "56.87830687830688%",
                            top: "44.98141263940521%",
                            width: "27.248677248677247%",
                            times: [ 
                                    {t: 0, perc: '0%'},
                                    {t: 0.600, perc: '25%'},
                                    {t: 0.700, perc: '50%'},
                                    {t: 0.800, perc: '75%'},
                                    {t: 0.900, perc: '100%'}
                            ],
                        },
                    },
            "fumetto3": {
                "riga1": {
                    height: "1.8587360594795541%",
                    left: "8.994708994708995%",
                    top: "58.34595350527852%",
                    width: "32.01058201058201%",
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.600, perc: '25%'},
                            {t: 0.700, perc: '50%'},
                            {t: 0.800, perc: '75%'},
                            {t: 0.900, perc: '100%'}
                            ],
                },
                "riga2": {
                    height: "1.672862453531593%",
                    left: "14.814814814814815%",
                    top: "60.20468956475808%",
                    width: "24.07407407407407%",
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.600, perc: '25%'},
                            {t: 0.700, perc: '50%'},
                            {t: 0.800, perc: '75%'},
                            {t: 0.900, perc: '100%'}
                            ],
                },
            },
            "fumetto4": {
                "riga1": {
                    height: "1.8621973929236475%",
                    left: "31.03448275862069%",
                    top: "75.23361007150547%",
                    width: "10.344827586206897%",
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.600, perc: '25%'},
                            {t: 0.700, perc: '50%'},
                            {t: 0.800, perc: '75%'},
                            {t: 0.900, perc: '100%'}
                            ],
                },
                "riga2": {
                    height: "1.6759776536312927%",
                    left: "25.46419098143236%",
                    top: "77.09580746442911%",
                    width: "22.54641909814324%",
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.600, perc: '25%'},
                            {t: 0.700, perc: '50%'},
                            {t: 0.800, perc: '75%'},
                            {t: 0.900, perc: '100%'}
                            ],
                },
                "riga3": {
                    height: "1.6759776536312785%",
                    left: "25.46419098143236%",
                    top: "78.77178511806041%",
                    width: "22.811671087533156%",
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.600, perc: '25%'},
                            {t: 0.700, perc: '50%'},
                            {t: 0.800, perc: '75%'},
                            {t: 0.900, perc: '100%'}
                            ],
                },
                "riga4": {
                    height: "1.6759776536312927%",
                    left: "31.03448275862069%",
                    top: "80.44776277169169%",
                    width: "9.283819628647215%",
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.600, perc: '25%'},
                            {t: 0.700, perc: '50%'},
                            {t: 0.800, perc: '75%'},
                            {t: 0.900, perc: '100%'}
                            ],
                },

            },
            "fumetto5": {
                "riga1": {
                    height: "2.0484171322160165%",
                    left: "52.51989389920424%",
                    top: "57.35651509943843%",
                    width: "35.278514588859416%",
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.600, perc: '25%'},
                            {t: 0.700, perc: '50%'},
                            {t: 0.800, perc: '75%'},
                            {t: 0.900, perc: '100%'}
                            ],
                },
            },

        };
        


data = {
    
    "fumetto1" : {
        
        "riga1": { // Fermatevi!
            "top": "6.517509727626459%",
            "left": "11.71875%",
            "width": "25%",
            "height": "2.334630350194553%",
            delay: 255,
            length: 561 
        },
    },
    
    "fumetto2" : {
        
        "riga1": { //Gambe ragazzi!
            "top": "12.645914396887159%",
            "left": "26.041666666666668%",
            "width": "24.999999999999996%",
            "height": "1.5564202334630348%",
            delay: 739,
            length: 1760 
        },
        
    },
    "fumetto3" : {
        
        "riga1": { // ancora?
            "top": "18.09338521400778%",
            "left": "46.614583333333336%",
            "width": "14.322916666666664%",
            "height": "1.653696498054476%",
        delay: 2525,
        length: 1122 
        },
        
    },
    
    
    "fumetto4" : {
        
        "riga1": { // Urghh
            "top": "5.739299610894942%",
            "left": "72.13541666666667%",
            "width": "11.067708333333329%",
            "height": "1.945525291828794%",
            delay: 4107,
            length: 7142 
        },
        "riga2": { // possibile che
            "top": "7.490272373540856%",
            "left": "68.75%",
            "width": "18.359375%",
            "height": "1.7509727626459135%",
        delay: 4898,
            length: 2193 
        },
        "riga3": { // non si faccia altro
            "top": "9.24124513618677%",
            "left": "64.97395833333333%",
            "width": "25.820833333333343%",
            "height": "1.653696498054476%",
        delay: 7091,
        length: 1045 
        },
        "riga4": { // che correre???
            "top": "10.797665369649806%",
            "left": "67.31770833333333%",
            "width": "21.09375%",
            "height": "1.8482490272373528%",
        delay: 8163,
        length: 1173 
        },

    },
    
    "fumetto5" : {
        
        "riga1": { // UFF
            "top": "55.93385214007782%",
            "left": "7.552083333333333%",
            "width": "8.984375%",
            "height": "1.8482490272373582%",
        delay: 12567,
        length: 2406 
        },
          },
    "fumetto6" : {
        
        "riga1": { // Sono stanca
            "top": "59.90856031128405%",
            "left": "23.828125%",
            "width": "19.661458333333336%",
            "height": "2.445525291828794%",
        delay: 13265,
        length: 1250 
        },
    },
    "fumetto7" : {
        
        "riga1": { // Nascondiamoci qui dentro
            "top": "51.55642023346304%",
            "left": "20.572916666666668%",
            "width": "37.109375%",
            "height": "1.848249027237351%",
        delay: 10331,
        length: 2500 
        },
    },
    
    
};
console.log('LOADING DONE');       


onStatus = function() {
    //$('body').fadeIn();
    startAnimations();                        
    }
                                             
                                          
$('#image').hide().attr('src','images/JPG/18.jpg').show();
                                             
$('#prev').html('<a onmousedown="loadPage(16); return false;"><img src="images/icon-prev.png"></a>').css('visibility','');
$('#next').html('<a  alt="20"  onmousedown="loadPage(20); return false;"><img src="images/icon-next.png"></a>').css('visibility','');
                                             
                                             
init();
                                                                        
audioFile = '/android_asset/www/audio/pag18.mp3';
                                             
mediaStart();

                                            


data = {
    
    "fumetto1" : {
        
        "riga1": { // Non ne posso più
            "top": "6.906614785992218%",
            "left": "6.25%",
            "width": "25%",
            "height": "1.945525291828794%",
            delay: 2794,
            length: 859 
        },
        "riga2": { // Di correre
            "top": "8.754863813229573%",
            "left": "10.677083333333334%",
            "width": "16.796875%",
            "height": "1.8482490272373528%",
        delay: 3611,
        length: 1160 
        },
        
        
    },
    
    "fumetto2" : {
        
        "riga1": { // ma ha sempre
            "top": "26.653696498054476%",
            "left": "21.484375%",
            "width": "18.229166666666664%",
            "height": "1.7509727626459117%",
            delay: 5029,
            length: 1117 
        },
        "riga2": { // da lamentarti?
            "top": "28.404669260700388%",
            "left": "19.791666666666668%",
            "width": "22.265624999999996%",
            "height": "1.7509727626459153%",
        delay: 6362,
        length: 1117 
        },
        
        
    },
    
    "fumetto3" : {
        
        "riga1": { // ma dove
            "top": "4.085603112840467%",
            "left": "52.473958333333336%",
            "width": "13.020833333333336%",
            "height": "1.8482490272373546%",
        delay: 8124,
        length: 386 
        },
        "riga2": { // siamo finiti
            "top": "5.836575875486381%",
            "left": "49.739583333333336%",
            "width": "17.708333333333336%",
            "height": "1.945525291828794%",
        delay: 8511,
        length: 1203 
        },
        
        
    },

    "fumetto4" : {
        
        "riga1": { // vediamo
            "top": "12.062256809338521%",
            "left": "65.88541666666667%",
            "width": "12.369791666666657%",
            "height": "1.6536964980544742%",
        delay: 9629,
        length: 902 
        },
        "riga2": { // se c'è un 
            "top": "28.11284046692607%",
            "left": "55.989583333333336%",
            "width": "14.453124999999993%",
            "height": "1.3618677042801544%",
        delay: 10704,
        length: 558 
        },
        
        "riga3": { // interruttore
            "top": "29.669260700389106%",
            "left": "54.947916666666664%",
            "width": "16.666666666666664%",
            "height": "1.7509727626459117%",
        delay: 11220,
        length: 773 
        },
        
        "riga4": { // della luce
            "top": "31.420233463035018%",
            "left": "55.46875%",
            "width": "15.494791666666671%",
            "height": "1.6536964980544795%",
        delay: 11993,
        length: 644 
        },
        
        
    },

    
    "intro1" : {
        
        "riga1": { // si accende la luce e...
            "top": "38.42412451361868%",
            "left": "8.463541666666666%",
            "width": "29.6875%",
            "height": "2.1400778210116727%",
        delay: 14100,
        length: 1848 
        },
        
    },
    
    
    "fumetto5" : {
        "riga1": { // oh
            "top": "48.70298214923547%",
            "left": "17.578125%",
            "width": "4.947916666666668%",
            "height": "1.6536964980544795%",
            
        delay: 16097,
        length: 989 
        },
        
        "riga2": { // quanti bei vestiti
            "top": "48.60570588464403%",
            "left": "22.916666666666668%",
            "width": "22.656249999999996%",
            "height": "1.6536964980544724%",
        delay: 17689,
        length: 2582 
        },
        
    },
    
    
    "fumetto6" : {
        
        "riga1": { // Uhhhh
            "top": "56.22568093385214%",
            "left": "36.458333333333336%",
            "width": "9.635416666666664%",
            "height": "1.6536964980544724%",
            delay: 20376,
            length: 1289 
        },
    },

    "fumetto7" : {
        
        "riga1": { // Possiamo utilizzarli
            "top": "59.33852140077821%",
            "left": "60.15625%",
            "width": "26.43229166666667%",
            "height": "1.6536964980544724%",
        delay: 21666,
        length: 1160 
        },
        "riga2": { // per non farci
            "top": "60.892217898832685%",
            "left": "64.84375%",
            "width": "17.05729166666667%",
            "height": "1.6591439688715937%",
        delay: 22870,
        length: 601 
        },
        "riga3": { // riconoscere
            "top": "62.35408560311284%",
            "left": "65.75520833333333%",
            "width": "17.1875%",
            "height": "1.7509727626459082%",
        delay: 23471,
        length: 1160 
        },
    },
    
};
console.log('LOADING DONE');       


onStatus = function() {
    
    $('body').fadeIn();
    
    startAnimations(); 
    
    }
    
$('<div class="overlayer"></div>').appendTo('body');
setTimeout(function () { $('.overlayer').remove(); },13256);

init();
                                          
$('#image').hide().attr('src','images/JPG/20.jpg').show();
                                             
$('#prev').html('<a onmousedown="loadPage(18); return false;"><img src="images/icon-prev.png"></a>').css('visibility','');
$('#next').html('<a alt="22" onmousedown="loadPage(22); return false;"><img src="images/icon-next.png"></a>').css('visibility','');
                                             
                                             
                                                                        
audioFile = '/android_asset/www/audio/pag20.mp3';
                                             
mediaStart();

                                            



var data = {
    "intro1" : {
        "riga1": { // Dentro un camion che trasporta frutta
            "top": "6.517509727626459%",
            "left": "7.942708333333333%",
            "width": "53.125%",
            "height": "2.0428015564202333%",
            delay: 7746,
            length: 2231
          },
        "riga2": { // Alcuni personaggi particolari
            "top": "8.365758754863814%",
            "left": "8.072916666666666%",
            "width": "38.411458333333336%",
            "height": "1.8482490272373528%",
            delay: 10467,
            length: 1760    
        },
        
        "riga3": { // stanno discutendo
            "top": "8.365758754863814%",
            "left": "46.744791666666664%",
            "width": "23.958333333333336%",
            "height": "1.7509727626459135%" ,
        delay: 12228,
        length: 1125    
        },
        
        
        "riga4": { // Su come cambiare la loro vita
            "top": "10.019455252918288%",
            "left": "8.072916666666666%",
            "width": "39.71354166666667%",
            "height": "1.7509727626459153%",
            delay: 13299,
            length: 2550
            
        },
    },
    
    
    
    "fumetto1" : { // Allora sei pronto
    "riga1": {
        "top": "17.509727626459146%",
        "left": "12.5%",
        "width": "26.302083333333336%",
        "height": "1.9455252918287904%",
        "delay":17273,
        "length":1316
        
    },
},
    
    "fumetto2": {
        "riga1": { // Si ma dove andiamo
            "top": "45.00648409476076%",
            "left": "56.380208333333336%",
            "width": "27.864583333333336%",
            "height": "2.042801556420237%",
            "delay":18295,
            "length":1723

        },
    },
    "fumetto3": {
        "riga1": { // All'avventura saltiamo
            "top": "58.72243740215376%",
            "left": "8.723958333333334%",
            "width": "31.510416666666664%",
            "height": "1.8536964980544724%",
            "delay":19837,
            "length":1723

        },
        "riga2": { // fuori dal camion
            "top": "60.37613390020823%",
            "left": "14.583333333333334%",
            "width": "23.4375%",
            "height": "1.7509727626459153%",
            "delay":21529,
            "length":614

        },
    },
    "fumetto4": {
        "riga1": { // Si Si
            "top": "75.04312383154488%",
            "left": "31.380208333333332%",
            "width": "9.635416666666668%",
            "height": "2.348249027237344%",
            "delay": 22682,
            "length":614
        },
        "riga2": { // Dobbiamo saltare
            "top": "77.29409659419078%",
            "left": "25.390625%",
            "width": "22.395833333333336%",
            "height": "1.7509727626459153%",
            "delay": 23364,
            "length": 1176
        },
       
        "riga3": { // Scoprire cosa c'è
            "top": "78.94779309224526%",
            "left": "25.260416666666668%",
            "width": "22.916666666666668%",
            "height": "1.7509727626459153%",
            "delay": 24573,
            "length": 1183

        },
        "riga4": { // Fuori
            "top": "80.60148959029974%",
            "left": "31.380208333333332%",
            "width": "8.463541666666668%",
            "height": "1.6536964980544724%",
            "delay": 25832,
            "length": 513

               },
        
    },
    "fumetto5": {
        "riga1": { // Avviciniamoci alla sponda
            "top": "57.674016099031796%",
            "left": "52.473958333333336%",
            "width": "35.37499999999999%",
            "height": "1.7509727626459153%",
            "delay": 26502,
            "length": 1529

                },
    },
    
};

//console.log('LOADING DONE');       


onStatus = function() {
    
    startAnimations(); 
    }
                                             
                                             
                                             $('#image').hide().attr('src','images/JPG/05.jpg').show();

                                            	/*
                                            	 var content_width = 768;
                                         		var body_width = $(window).width();
                                         		var margin = (body_width - content_width)/2;
                                         		
                                                 $('#shakeme').css('margin-left',margin+'px');
                                            	 */

$('#next').html('<a alt="6" onmousedown="loadPage(6); return false;"><img src="images/icon-next.png"></a>').css('visibility','');
$('#prev').html('<a onmousedown="loadpage(0); return false;"><img src="images/icon-prev.png"></a>').css('visibility','hidden');
                                             
init();

                                             
                                             
                                             audioFile = '/android_asset/www/audio/pag5.mp3';
                                             
                                             mediaStart();
                                             


data = {
    "intro1" : {
        
        "riga1": { // E mentre i nostri amici parlano un rumore improvviso
            "top": "5.252918287937743%",
            "left": "7.161458333333333%",
            "width": "69.40104166666667%",
            "height": "2.1400778210116735%",
        delay: 601,
        length: 3824 
        },
        "riga2": { // mette fine alle loro discussioni
            "top": "7.2957198443579765%",
            "left": "7.161458333333333%",
            "width": "42.578125%",
            "height": "1.945525291828793%",
        delay: 3910,
        length: 1761 
        },
    },
    
    "intro2" : {
        
        "riga1": { // Infatti da dietro un cespuglio
            "top": "40.95330739299611%",
            "left": "41.015625%",
            "width": "42.44791666666667%",
            "height": "1.7509727626459153%",
        delay: 6101,
        length: 2449 
        },
        "riga2": { // esce uma macchina infernale
            "top": "42.60700389105058%",
            "left": "41.145833333333336%",
            "width": "41.536458333333336%",
            "height": "1.7509727626459153%",
        delay: 8766,
        length: 2062 
        },
        
        "riga3": { // è un contadino che sta spargendo
            "top": "44.26070038910506%",
            "left": "40.234375%",
            "width": "47.52604166666667%",
            "height": "1.7509727626459153%",
        delay: 11000,
        length: 1976 
        },
        "riga4": { // pesticidi con il suo trattore
            "top": "45.91439688715953%",
            "left": "41.536458333333336%",
            "width": "38.541666666666664%",
            "height": "1.7509727626459153%",
        delay: 12977,
        length: 1804 
        },
        "riga5": { // e non si è accorto dei tre
            "top": "47.568093385214006%",
            "left": "41.40625%",
            "width": "38.80208333333333%",
            "height": "1.945525291828794%",
        delay: 15211,
        length: 1632 
        },
        
        
    },
    
    
    "fumetto1" : {
        "riga0": { // ulp!! 
            "top": "55.54474411307606%",
            "left": "8.723958333333334%",
            "width": "8.012499999999998%",
            "height": "1.945525291828794%",
        delay: 17302,
        length: 645 
        },
        "riga1": { // chh
            "top": "55.739296642258935%",
            "left": "16.40625%",
            "width": "2.994791666666668%",
            "height": "1.7509727626459153%",
            delay: 18077,
            length: 473 
        },
        "riga2": { // cos'è quel coso?
            "top": "55.54474411307606%",
            "left": "19.270833333333332%",
            "width": "22.786458333333332%",
            "height": "1.945525291828794%",
        delay: 18550,
        length: 1420 
        }
    },
    
    "fumetto2" : {
        
        "riga1": { // Ah
            "top": "60.311284046692606%",
            "left": "46.484375%",
            "width": "5.078125%",
            "height": "2.3346303501945513%",
            delay: 19809,
            length: 816 
        },
        
    },
    
    "fumetto3" : {
        
        "riga1": { // n-non lo so
            "top": "55.1556420233463%",
            "left": "63.151041666666664%",
            "width": "20.052083333333336%",
            "height": "1.6536964980544724%",
            delay: 20711,
            length: 1246 
        },
        "riga2": { // ma prima che ci schiacci
            "top": "56.71206225680934%",
            "left": "63.28125%",
            "width": "31.25%",
            "height": "1.945525291828794%",
        delay: 22860,
            length: 1160 
        },
        "riga3": { // conviene
            "top": "58.463035019455255%",
            "left": "63.541666666666664%",
            "width": "13.281250000000007%",
            "height": "1.6536964980544724%",
            delay: 24235,
            length: 644 
        },
        
        
    },
    
};
//console.log('LOADING DONE');       


onStatus = function() {
    //$('body').fadeIn();
    startAnimations();                        
    }
                                             
                                          
$('#image').hide().attr('src','images/JPG/12.jpg').show();
                                             
$('#prev').html('<a onmousedown="loadPage(10); return false;"><img src="images/icon-prev.png"></a>').css('visibility','');
$('#next').html('<a  alt="14"  onmousedown="loadPage(14); return false;"><img src="images/icon-next.png"></a>').css('visibility','');
                                             
                                             
init();
                                                                        
audioFile = '/android_asset/www/audio/pag12.mp3';
                                             
mediaStart();

                                            






	// If you want to prevent dragging, uncomment this section
	/*
	function preventBehavior(e) 
	{ 
      e.preventDefault(); 
    };
	document.addEventListener("touchmove", preventBehavior, false);
	*/
	
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	/*
	function handleOpenURL(url)
	{
		// TODO: do something with the url passed in.
	}
	*/
	
		
	/* When this function is called, PhoneGap has been initialized and is ready to roll */
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
        
        
        var data = {
            "fumetto1" : { 
                "riga1": { // AHIII che botta!
                    "top": "44.862385321100916%",
                    "left": "18.098958333333332%",
                    "width": "22.395833333333332%",
                    "height": "1.6513761467889907%"                      
                },
                "riga2": { // Stavo per diventare una spremuta
                    "top": "46.60550458715596%",
                    "left": "8.463541666666666%",
                    "width": "44.661458333333336%",
                    "height": "1.6513761467889907%"                  
                },
                
                
        },
            
                     
        };
        
        function onDeviceReady()
        {
            
            console.log("Device ready");
            
            //setupFumetti(0.2);
            init();
            mediaStart();                  
            // do your thing!
        }

        function onBodyLoad()
        {		
           
            console.log("load...");
            init();
            document.addEventListener("deviceready", onDeviceReady, false);
             $('img').attr('unselectable','on').css('MozUserSelect','none');
            
            
            
        }

        
           function init() {
               setupFumetti();   
               var oldPercX=undefined,oldPercY=undefined;
               var rectangleOn = 0;
               var last_riga_ref = undefined;
               var edit = 1;
               
               $('#content').mousemove(function (e) {
                                       if (edit == 0) return;
                                       if (rectangleOn == 1 && oldPercX != undefined) {
                                       var newPercX = 100*(e.pageX - $('#content').offset().left)/$('#content').width();
                                       var newPercY = 100*(e.pageY - $('#content').offset().top)/$('#content').height();
                                       last_riga_ref.css(
                                                         {
                                                         top: oldPercY+'%',
                                                         left: oldPercX+'%',
                                                         width: (newPercX-oldPercX)+'%',
                                                         height: (newPercY-oldPercY)+'%'
                                                         });
                                       }
                                       });
               
               console.log("Attaching...");
               $('#content').mousedown(function (e) {
                                       if (edit == 1) return;
                                       var target = $(e.target);
                                       //console.log(target);
                                       console.log("!");
                                       
                                       //if (target.is('.riga')) {
                                       //console.log("!");
                                       
                                       media.getCurrentPosition(function (dt) {
                                                                console.log(dt);                    
                                                                });
                                       
                                       //                         };
                                       
                                       });
               
               $('#content').click(function (e) {
                                   
                                   if (edit == 0) return;
                                   
                                   var newPercX = 100*(e.pageX - $('#content').offset().left)/$('#content').width();
                                   var newPercY = 100*(e.pageY - $('#content').offset().top)/$('#content').height();
                                   if (oldPercX != undefined) 
                                   {
                                   
                                   var obj = {
                                   top: oldPercY+'%',
                                   left: oldPercX+'%',
                                   width: (newPercX-oldPercX)+'%',
                                   height: (newPercY-oldPercY)+'%' 
                                   };
                                   $('.righe').remove();
                                   
                                   var dom_element = createFinestraDomElement('a','b',obj);
                                   console.log(JSON.stringify(obj, null, 2));
                                   dom_element.appendTo('#content');
                                   last_riga_ref = dom_element;
                                   //console.log(obj);
                                   rectangleOn = 1;
                                   oldPercX = undefined;
                                   oldPercY = undefined;
                                   } else 
                                   {
                                   //$('.righe').remove();
                                   oldPercX = newPercX;
                                   oldPercY = newPercY;
                                   
                                   }
                                   
                                   
                                   });
           }        
        
                                    
        function setupFumetti() {
            
            var i,j,u;
            var div_id;
            var righe_fumetto = "";
            for (i in data)
            {
                righe_fumetto = data[i];
                for (j in righe_fumetto) {
                    var id_riga = j;
                    var obj_riga = righe_fumetto[j];
                    
                    var times = obj_riga["times"];
                    var dom_element = createFinestraDomElement(i,id_riga,obj_riga);
                    
                    dom_element.appendTo('#content');
                    
                    
                    
                    
                    
                }
            }
            
            
            
        }
        
        function createFinestraDomElement(fumetto_id,riga_id,obj) {
            var element = $('<div class="righe" style="position: absolute; top: '+obj.top+'; left: '+obj.left+'; height: '+obj.height+'; width: '+obj.width+'; overflow: hidden; background-color: transparent"><div id="'+fumetto_id+'_'+riga_id+'" style="position: absolute; top: 0; left: 0%; height: 100%;width: 100%; background-color: white; opacity: 0.8" class="riga"></div></div>');
            
            return element;                
            
        }
        
        

	function mediaStart() 
	{
        
		media = new Media('/page1/audio.mp3',onSuccess, onError,onStatus);
		media.play();
        //setInterval(timer,1400);
	}
	
	function timer() {
		//media.getCurrentPosition(currentPosition);
		
	}
	
	function currentPosition(dt) {
		
		
	}
        function onStatus() {
           // $('#fumetto1_riga1').delay(5575).animate({left: '100%'},1704);                       
           // $('#fumetto1_riga2').delay(7510).animate({left: '100%'},2051);                       
            
            /*
            $('#fumetto2_riga1').delay(2681).animate({left: '100%'},2031);   
            
		    $('#fumetto3_riga1').delay(5015).animate({left: '100%'},1462);     
		    $('#fumetto3_riga2').delay(6513).animate({left: '100%'},1021);
            
            $('#fumetto4_riga1').delay(7906).animate({left: '100%'},766);
            $('#fumetto4_riga2').delay(8637).animate({left: '100%'},905);
            $('#fumetto4_riga3').delay(9671).animate({left: '100%'},963);
            $('#fumetto4_riga4').delay(10643).animate({left: '100%'},545);
            
            $('#fumetto5_riga1').delay(11818).animate({left: '100%'},1393);
            */
        }
        
	// onSuccess Callback
        //
        function onSuccess() {
            console.log("playAudio():Audio Success");
        }

        // onError Callback 
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' + 
                  'message: ' + error.message + '\n');
        }
    
              
    


data = {
    "intro1" : {
        
        "riga1": { // Mentre i nostri amici si vestono
            "top": "5.058365758754864%",
            "left": "6.901041666666667%",
            "width": "41.927083333333336%",
            "height": "2.0428015564202333%",
        delay: 1151,
        length: 2295 
        },
        "riga2": { // Odono tutt'a un tratto delle voci da fuori
            "top": "7.101167315175097%",
            "left": "7.161458333333333%",
            "width": "59.505208333333336%",
            "height": "1.945525291828794%",
        delay: 3214,
        length: 2623 
        },
        
        
    },
    
    "fumetto1" : {
        
        "riga1": { // Allora? sono arrivati i ragazzi
            "top": "12.743190661478598%",
            "left": "14.322916666666666%",
            "width": "41.48541666666667%",
            "height": "1.5564202334630366%",
            delay: 11938,
            length: 2426 
        },
        "riga2": { // Che dovevano fare le mascotte?
            "top": "14.299610894941635%",
            "left": "13.151041666666666%",
            "width": "42.817708333333336%",
            "height": "1.5564202334630348%",
        delay: 14496,
        length: 2426 
        },
        
        
    },
    
    "fumetto2" : {
        
        "riga1": { // Ehm... ancora no capo
            "top": "29.669260700389106%",
            "left": "45.442708333333336%",
            "width": "31.029166666666664%",
            "height": "1.6536964980544724%",
            delay: 16988,
            length: 2164 
        },
            },
    
    "fumetto3" : {
        
        "riga1": { // Come?? sono giorni
            "top": "35.797665369649806%",
            "left": "54.6875%",
            "width": "26.30208333333333%",
            "height": "1.6536964980544724%",
        delay: 19219,
        length: 1902 
        },
        "riga2": { // che li aspettiamo
            "top": "37.45136186770428%",
            "left": "54.817708333333336%",
            "width": "26.432291666666664%",
            "height": "1.945525291828794%",
        delay: 21318,
        length: 1508 
        },
    },   

    "fumetto4" : {
        
        "riga1": { // Ah siete qui??
            "top": "43.190661478599225%",
            "left": "10.9375%",
            "width": "18.229166666666668%",
            "height": "1.7509727626459082%",
        delay: 23941,
        length: 1574 
        },
        "riga2": { // dai che mancate solo voi...
            "top": "44.8443579766537%",
            "left": "5.859375%",
            "width": "31.380208333333336%",
            "height": "1.7509727626459153%",
        delay: 26172,
        length: 2033 
        },
        
        "riga3": { // lo spettacolo sta per iniziare!
            "top": "46.49805447470817%",
            "left": "5.729166666666667%",
            "width": "41.145833333333336%",
            "height": "1.6536964980544795%",
        delay: 28336,
        length: 2164 
        },
        
    },

    
    "fumetto5" : {
        
        "riga1": { // s-spettacolo??
            "top": "85.21400778210116%",
            "left": "15.234375%",
            "width": "18.759375%",
            "height": "2.2373540856031155%",
        delay: 30566,
        length: 1639 
        },
        
        
    },
    
    
    
    "fumetto6" : {
        
        "riga1": { // Ehm credo ci sia un
            "top": "45.525291828793776%",
            "left": "56.510416666666664%",
            "width": "26.302083333333336%",
            "height": "1.848249027237351%",
        delay: 32272,
        length: 1639 
        },
        
        
        "riga2": { // Errore
            "top": "47.27626459143969%",
            "left": "63.671875%",
            "width": "11.71875%",
            "height": "2.2373540856031084%",
        delay: 34043,
        length: 721 
        },
        
    },
    
    
    "fumetto7" : {
        
        "riga1": { // forza muovetevi
            "top": "90.56420233463035%",
            "left": "70.96354166666667%",
            "width": "23.17708333333333%",
            "height": "1.8482490272373582%",
            delay: 35027,
            length: 1508 
        },
        
        
        "riga2": { // che è tardi
            "top": "92.21789883268482%",
            "left": "71.35416666666667%",
            "width": "17.057291666666657%",
            "height": "2.2373540856031155%",
        delay: 36536,
        length: 1311 
        },
        
    },
};
console.log('LOADING DONE');       


onStatus = function() {
    //$('body').fadeIn();
    startAnimations();                        
    }
                                             
                                          
$('#image').hide().attr('src','images/JPG/24.jpg').show();
                                             
$('#prev').html('<a onmousedown="loadPage(22); return false;"><img src="images/icon-prev.png"></a>').css('visibility','');
$('#next').html('<a alt="26" onmousedown="loadPage(26); return false;"><img src="images/icon-next.png"></a>').css('visibility','');

init();
                                             
                                             
                                                                        
audioFile = '/android_asset/www/audio/pag24.mp3';
                                             
mediaStart();

                                            


data = {
    "intro1" : {
        
        "riga1": { // Arancino, limonello e melina sono riusciti a salvarsi
            "top": "4.669260700389105%",
            "left": "20.052083333333332%",
            "width": "67.44791666666667%",
            "height": "1.945525291828793%",
        delay: 899,
        length: 3373 
        },
        "riga2": { // ed ora si ritrovano in un posto che non conoscono
            "top": "6.614785992217898%",
            "left": "21.354166666666668%",
            "width": "69.921875%",
            "height": "1.8482490272373546%",
        delay: 4402,
        length: 2602 
        },
    },
    
    
    "fumetto1" : {
        
        "riga1": { // Ma... dove siamo?
            "top": "27.33463035019455%",
            "left": "21.875%",
            "width": "23.135416666666664%",
            "height": "1.653696498054476%",
            delay: 7936,
            length: 2506 
        },
    },
    
    "fumetto2" : {
        
        "riga1": { // Non lo so ma è bello
            "top": "31.71206225680934%",
            "left": "50.911458333333336%",
            "width": "31.059374999999993%",
            "height": "1.7591439688715937%",
            delay: 10378,
            length: 1253 
        },
        
    },
    
    "intro2" : {
        
        "riga1": { // Ma i guai non sono finiti... sbuca all'improvviso un uomo
            "top": "50.29182879377432%",
            "left": "5.208333333333333%",
            "width": "70.57291666666667%",
            "height": "1.7509727626459153%",
            delay: 11599,
            length: 3277 
        },
        "riga2": { // della sicurezza
            "top": "51.945525291828794%",
            "left": "5.598958333333333%",
            "width": "21.354166666666668%",
            "height": "1.848249027237351%",
        delay: 14844,
            length: 996 
        },
    },
    
    "fumetto3" : {
        
        "riga1": { // Ehi boi alt!!
            "top": "57.87937743190661%",
            "left": "48.697916666666664%",
            "width": "17.166666666666664%",
            "height": "1.8482490272373582%",
        delay: 15776,
        length: 1413 
        },
        "riga2": { // chi siete?
            "top": "59.53307392996109%",
            "left": "48.567708333333336%",
            "width": "14.583333333333329%",
            "height": "1.945525291828794%",
        delay: 17415,
        length: 481 
        },
    },
    "fumetto4" : {
        
        "riga1": { // UH-OH
            "top": "90.27237354085604%",
            "left": "56.770833333333336%",
            "width": "8.854166666666664%",
            "height": "1.7509727626459153%",
        delay: 18218,
        length: 353 
        },
    },
    "fumetto5" : {
        
        "riga1": { // acc!!
            "top": "87.7295719844358%",
            "left": "79.296875%",
            "width": "7.552083333333329%",
            "height": "1.9591439688716008%",
        delay: 19157,
        length: 427 
        },
    },
    
    
};
console.log('LOADING DONE');       


onStatus = function() {
    //$('body').fadeIn();
    startAnimations();                        
    }
                                             
                                          
$('#image').hide().attr('src','images/JPG/16.jpg').show();
                                             
$('#prev').html('<a onmousedown="loadPage(14); return false;"><img src="images/icon-prev.png"></a>').css('visibility','');
$('#next').html('<a  alt="18"  onmousedown="loadPage(18); return false;"><img src="images/icon-next.png"></a>').css('visibility','');
                                             
                                             
init();
                                                                        
audioFile = '/android_asset/www/audio/pag16.mp3';
                                             
mediaStart();

                                            


data = {
    "fumetto1" : {
        
        "riga1": { // Ah
            "top": "6.22568093385214%",
            "left": "9.635416666666666%",
            "width": "4.036458333333334%",
            "height": "2.042801556420234%",
        delay: 671,
        length: 1512 
        },
        
        "riga2": { // finalmente
            "top": "6.517509727626459%",
            "left": "14.0625%",
            "width": "15.104166666666668%",
            "height": "1.7509727626459153%",
        delay: 1596,
        length: 1512 
        },
        "riga3": { // era ora
            "top": "6.517509727626459%",
            "left": "29.166666666666668%",
            "width": "11.458333333333332%",
            "height": "1.8482490272373546%",
        delay: 3108,
        length: 1316 
        },
        "riga4": { // la prossima volta che arrivate in ritardo
            "top": "6.22568093385214%",
            "left": "40.234375%",
            "width": "51.953125%",
            "height": "2.042801556420234%",
        delay: 4453,
        length: 3024 
        },
        
        
        "riga5": { // vi faccio vedere io
            "top": "8.073929961089494%",
            "left": "9.244791666666666%",
            "width": "25.520833333333336%",
            "height": "1.8482490272373546%",
        delay: 7561,
        length: 1820 
        },
        "riga6": { // capito??
            "top": "8.149589267686183%",
            "left": "35.546875%",
            "width": "10.416666666666664%",
            "height": "1.7509727626459153%",
        delay: 9466,
        length: 1204 
        },
        
        
        
    },
    
    "fumetto2" : {
        
        "riga1": { // Ed ora...
            "top": "31.80933852140078%",
            "left": "58.984375%",
            "width": "13.411458333333329%",
            "height": "1.8482490272373546%",
            delay: 10682,
            length: 894 
        },
        "riga2": { // Che inizi lo spettacolo
            "top": "33.56031128404669%",
            "left": "58.59375%",
            "width": "31.640625%",
            "height": "1.5564202334630366%",
        delay: 11577,
        length: 2181 
        },
        "riga3": { // Musica Musica
            "top": "35.01945525291829%",
            "left": "58.463541666666664%",
            "width": "19.791666666666664%",
            "height": "2.431906614785987%",
        delay: 13871,
        length: 1901 
        },
        
        
        
    },
    
    "fumetto3" : {
        
        "riga1": { // Ehm... scusi... c-credo
            "top": "42.4124513618677%",
            "left": "7.8125%",
            "width": "25%",
            "height": "1.945525291828794%",
            delay: 16779,
            length: 2237 
        },
        "riga2": { // che si stia sbagliando
            "top": "44.16342412451362%",
            "left": "8.203125%",
            "width": "28.776041666666664%",
            "height": "1.8482490272373582%",
        delay: 19072,
        length: 1789 
        },
        "riga3": { // noi...
            "top": "46.011673151750976%",
            "left": "8.723958333333334%",
            "width": "6.770833333333332%",
            "height": "2.0428015564202298%",
        delay: 20918,
        length: 783
        },
        
        
            },
    
    "fumetto4" : {
        
        "riga1": { // sssss zitto
            "top": "50.29182879377432%",
            "left": "31.640625%",
            "width": "17.708333333333336%",
            "height": "1.848249027237351%",
        delay: 21869,
        length: 1398 
        },
        "riga2": { // altrimenti
            "top": "51.945525291828794%",
            "left": "33.203125%",
            "width": "12.630208333333336%",
            "height": "1.6564202334630366%",
        delay: 23379,
        length: 615 
        },
        "riga3": { // ci cacciano 
            "top": "53.50194552529183%",
            "left": "32.03125%",
            "width": "15.364583333333336%",
            "height": "1.5564202334630366%",
        delay: 23994,
        length: 559 
        },
        "riga4": { // via
            "top": "54.961089494163424%",
            "left": "40.885416666666664%",
            "width": "4.557291666666671%",
            "height": "1.7509727626459153%",
        delay: 24609,
        length: 671 
        },
        
    },   

    "fumetto5" : {
        
        "riga1": { // ma ma
            "top": "44.06614785992218%",
            "left": "60.807291666666664%",
            "width": "9.723958333333336%",
            "height": "1.945525291828794%",
        delay: 25336,
        length: 615 
        },
        "riga2": { // non sappiamo cosa
            "top": "45.81712062256809%",
            "left": "53.255208333333336%",
            "width": "24.218749999999993%",
            "height": "1.7509727626459153%",
        delay: 26008,
        length: 1118 
        },
        
        "riga3": { // dobbiamo fare
            "top": "47.37354085603113%",
            "left": "54.036458333333336%",
            "width": "22.526041666666664%",
            "height": "2.1400778210116727%",
        delay: 27182,
        length: 1342 
        },
        
    },

    
    "fumetto6" : {
        
        "riga1": { // facciamoci guidare
            "top": "53.21011673151751%",
            "left": "70.57291666666667%",
            "width": "24.73958333333333%",
            "height": "1.6536964980544724%",
        delay: 28692,
        length: 950 
        },
        "riga2": { // dalla musica
            "top": "54.86381322957198%",
            "left": "73.4375%",
            "width": "18.75%",
            "height": "1.6536964980544795%",
        delay: 29699,
        length: 950 
        },
        
        
    },
    
    
    
    "fumetto7" : {
        
        "riga1": { // vedrete
            "top": "88.32684824902724%",
            "left": "79.94791666666667%",
            "width": "11.848958333333329%",
            "height": "1.7509727626459153%",
        delay: 30762,
        length: 503 
        },
        
        
        "riga2": { // tutto andrà
            "top": "89.96433005722581%",
            "left": "77.47395833333333%",
            "width": "16.796875%",
            "height": "1.7509727626459153%",
        delay: 31321,
        length: 615
        },
        
        "riga3": { // alla grande
            "top": "91.31257908446315%",
            "left": "78.125%",
            "width": "16.66666666666667%",
            "height": "1.9564202334630437%",
        delay: 31880,
        length: 783 
        },
        
    },
    
    
};
console.log('LOADING DONE');       


onStatus = function() {
    //$('body').fadeIn();
    startAnimations();                        
    }
                                             
                                          
$('#image').hide().attr('src','images/JPG/26.jpg').show();
                                             
$('#prev').html('<a onmousedown="loadPage(24); return false;"><img src="images/icon-prev.png"></a>').css('visibility','');
$('#next').html('<a alt="28" onmousedown="loadPage(28); return false;"><img src="images/icon-next.png"></a>').css('visibility','');
                                             
                                             
init();
                                                                        
audioFile = '/android_asset/www/audio/pag26.mp3';
                                             
mediaStart();

                                            


data = {
    "intro1" : {
        
        "riga1": { // Infatti
            "top": "5.447470817120623%",
            "left": "7.682291666666667%",
            "width": "12.5%",
            "height": "2.0428015564202333%",
        delay: 1351,
        length: 931 
        },
        
    },

    "fumetto1" : {
        
        "riga1": { // Wow
            "top": "6.128404669260701%",
            "left": "27.473958333333332%",
            "width": "9.114583333333332%",
            "height": "1.7509727626459144%",
        delay: 2795,
        length: 978 
        },
        "riga2": { // Yeah
            "top": "7.587548638132295%",
            "left": "27.994791666666668%",
            "width": "7.682291666666668%",
            "height": "1.945525291828794%",
        delay: 3867,
        length: 1351 
        },
        
        
    },
    
    "fumetto2" : {
        
        "riga1": { // Che bello
            "top": "6.517509727626459%",
            "left": "44.921875%",
            "width": "14.84375%",
            "height": "1.5564202334630348%",
            delay: 5219,
            length: 1071 
        },
        "riga2": { // E' fighissimo
            "top": "7.976653696498055%",
            "left": "44.010416666666664%",
            "width": "16.796875%",
            "height": "1.945525291828794%",
        delay: 6430,
        length: 1444 
        },
    },
    
    "fumetto3" : {
        
        "riga1": { // Dai arancino
            "top": "6.3229571984435795%",
            "left": "70.703125%",
            "width": "20.44270833333333%",
            "height": "1.5564202334630357%",
            delay: 7921,
            length: 1211 
        },
        "riga2": { // inventati un passo
            "top": "7.684824902723736%",
            "left": "70.703125%",
            "width": "25.52083333333333%",
            "height": "1.8482490272373537%",
        delay: 9226,
        length: 2143 
        },
        
            },
    "intro2" : {
        
        "riga1": { // Arancino preso dalla foga inizia a saltellare
            "top": "38.2295719844358%",
            "left": "5.989583333333333%",
            "width": "61.588541666666664%",
            "height": "1.848249027237351%",
        delay: 12068,
        length: 3588 
        },
        "riga2": { // girando su se stesso
            "top": "39.98054474708171%",
            "left": "6.25%",
            "width": "29.166666666666664%",
            "height": "2.042801556420237%",
        delay: 15703,
        length: 1584 
        },
        
        
    },
    "intro3" : {
        
        "riga1": { // E balla
            "top": "70.66580033951696%",
            "left": "42.317708333333336%",
            "width": "10.9375%",
            "height": "1.5564202334630295%",
        delay: 19990,
        length: 873 
        },
        
        "riga2": { // e canta
            "top": "70.64418273213309%",
            "left": "53.90625%",
            "width": "10.416666666666671%",
            "height": "1.6536964980544724%",
        delay: 20958,
        length: 619 
        },
        
        "riga3": { // entusiasmando tutti
            "top": "70.64418273213309%",
            "left": "64.71354166666667%",
            "width": "27.213541666666657%",
            "height": "1.6536964980544724%",
        delay: 21868,
        length: 1430 
        },
        
        
    },
    
    
    };
console.log('LOADING DONE');       


onStatus = function() {
  //  $('body').fadeIn();
    startAnimations();                        
    }
                                             
                                          
$('#image').hide().attr('src','images/JPG/28.jpg').show();
                                             
$('#prev').html('<a onmousedown="loadPage(26); return false;"><img src="images/icon-prev.png"></a>').css('visibility','');
$('#next').html('<a alt="30" onmousedown="loadPage(30); return false;"><img src="images/icon-next.png"></a>').css('visibility','');
                                             
                                             
init();
                                                                        
audioFile = '/android_asset/www/audio/pag28.mp3';
                                             
mediaStart();

                                            






	// If you want to prevent dragging, uncomment this section
	
	function preventBehavior(e) 
	{ 
      e.preventDefault(); 
    };
	document.addEventListener("touchmove", preventBehavior, false);
	
	
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	/*
	function handleOpenURL(url)
	{
		// TODO: do something with the url passed in.
	}
	*/
	
		
	/* When this function is called, PhoneGap has been initialized and is ready to roll */
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
 
        var data = {
            "fumetto1" : {
           
                "riga1": { // AHIII che botta!
                    "top": "44.862385321100916%",
                    "left": "18.098958333333332%",
                    "width": "22.695833333333332%",
                    "height": "1.8513761467889907%"                      
                },
                "riga2": { // Stavo per diventare una spremuta
                    "top": "46.60550458715596%",
                    "left": "8.463541666666666%",
                    "width": "44.661458333333336%",
                    "height": "1.6513761467889907%"                  
                },
                
        },
            
            "fumetto2" : {
                
                "riga1": { // AHHH che volo!
                    "top": "49.54128440366973%",
                    "left": "61.328125%",
                    "width": "23.95833333333333%",
                    "height": "1.926605504587151%"
                },
                               
            },

            "fumetto3" : {
                
                "riga1": { // Lo sapevo
                    "top": "90.6256880733945%",
                    "left": "67.83854166666667%",
                    "width": "15.104166666666657%",
                    "height": "1.5596330275229349%"
                },
                "riga2": { // Che dovevo starvi
                    "top": "92.26880733944953%",
                    "left": "64.97395833333333%",
                    "width": "23.30729166666667%",
                    "height": "1.759633027522949%"
                },
                "riga3": { // lontano
                    "top": "94.12844036697248%",
                    "left": "69.40104166666667%",
                    "width": "14.322916666666657%",
                    "height": "1.7431192660550323%"
                },
                
            },

        
    };
        
 
        function onDeviceReady()
        {
            
            console.log("Device ready");
            init();
            mediaStart();                  
            
            $('body').show();
            
            // do your thing!
        }

        function onBodyLoad()
        {	
            
                       
            console.log("load...");
            //init();
            document.addEventListener("deviceready", onDeviceReady, false);
        }

        
           function init() {
            setupFumetti();   
            var oldPercX=undefined,oldPercY=undefined;
            var rectangleOn = 0;
            var last_riga_ref = undefined;
            var edit = 0;
            
            $('#content').mousemove(function (e) {
                                    if (edit == 0) return;
                                    if (rectangleOn == 1 && oldPercX != undefined) {
                                    var newPercX = 100*(e.pageX - $('#content').offset().left)/$('#content').width();
                                    var newPercY = 100*(e.pageY - $('#content').offset().top)/$('#content').height();
                                    last_riga_ref.css(
                                                      {
                                                      top: oldPercY+'%',
                                                      left: oldPercX+'%',
                                                      width: (newPercX-oldPercX)+'%',
                                                      height: (newPercY-oldPercY)+'%'
                                                      });
                                    }
                                    });
           
            console.log("Attaching...");
            $('#content').mousedown(function (e) {
                                if (edit == 1) return;
                                var target = $(e.target);
                                //console.log(target);
                                console.log("!");

                                //if (target.is('.riga')) {
                                //console.log("!");

                                media.getCurrentPosition(function (dt) {
                                                         console.log(dt);                    
                                                         });
                                                         
                                //                         };
 
                                });
            
                                $('#content').click(function (e) {
                                                    
                                                    if (edit == 0) return;
                                                    
                                                    var newPercX = 100*(e.pageX - $('#content').offset().left)/$('#content').width();
                                                    var newPercY = 100*(e.pageY - $('#content').offset().top)/$('#content').height();
                                                    if (oldPercX != undefined) 
                                                    {
                                                    
                                                    var obj = {
                                                    top: oldPercY+'%',
                                                    left: oldPercX+'%',
                                                    width: (newPercX-oldPercX)+'%',
                                                    height: (newPercY-oldPercY)+'%' 
                                                    };
                                                    $('.righe').remove();
                                                    
                                                    var dom_element = createFinestraDomElement('a','b',obj);
                                                    
                                                    dom_element.appendTo('#content');
                                                    last_riga_ref = dom_element;
                                                    //console.log(obj);
                                                    rectangleOn = 1;
                                                    oldPercX = undefined;
                                                    oldPercY = undefined;
                                                    } else 
                                                    {
                                                    //$('.righe').remove();
                                                    oldPercX = newPercX;
                                                    oldPercY = newPercY;
                                                    
                                                    }
                                                    
                                                    
                                                    });
        }
                                    
        function setupFumetti() {
            
            var i,j,u;
            var div_id;
            var righe_fumetto = "";
            for (i in data)
            {
                righe_fumetto = data[i];
                for (j in righe_fumetto) {
                    var id_riga = j;
                    var obj_riga = righe_fumetto[j];
                    
                    var times = obj_riga["times"];
                    var dom_element = createFinestraDomElement(i,id_riga,obj_riga);
                    
                    dom_element.appendTo('#content');
                                        
                    
                    
                }
            }
            
            
            
        }
        
        function createFinestraDomElement(fumetto_id,riga_id,obj) {
            var element = $('<div class="righe" style="position: absolute; top: '+obj.top+'; left: '+obj.left+'; height: '+obj.height+'; width: '+obj.width+'; overflow: hidden; background-color: transparent"><div id="'+fumetto_id+'_'+riga_id+'" style="position: absolute; top: 0; left: 0%; height: 100%;width: 100%; background-color: white; opacity: 0.8" class="riga"></div></div>');
            
            return element;                
            
        }
        
        

	function mediaStart() 
	{
        
		media = new Media('/audio/pag8.mp3',onSuccess, onError,onStatus);
		media.play();
        //setInterval(timer,1400);
	}
	
	function timer() {
		//media.getCurrentPosition(currentPosition);
		
	}
	
	function currentPosition(dt) {
		
		
	}
        function onStatus() {
            // AHII! che votta
            $('#fumetto1_riga1').delay(5575).animate({left: '100%'},1704);                       
            // Stavo per diventare una spremuta
            $('#fumetto1_riga2').delay(7510).animate({left: '100%'},2051);
            
            // AHHHH che volo!
            $('#fumetto2_riga1').delay(9850).animate({left: '100%'},2599);
            
            // Lo sapevo
            $('#fumetto3_riga1').delay(12681).animate({left: '100%'},1819);
            // Che dovevo starvi
            $('#fumetto3_riga2').delay(14386).animate({left: '100%'},1126);
            // Lontano
            $('#fumetto3_riga3').delay(15397).animate({left: '100%'},1123);

            
            
            
            
            
        }
        
	// onSuccess Callback
        //
        function onSuccess() {
            console.log("playAudio():Audio Success");
        }

        // onError Callback 
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' + 
                  'message: ' + error.message + '\n');
        }
    
    


data = {
    "intro1" : {
        
        "riga1": { // Alla fine tutta l'equipe festeggia arancino
            "top": "4.280155642023346%",
            "left": "9.244791666666666%",
            "width": "57.42187500000001%",
            "height": "2.237354085603113%",
        delay: 530,
        length: 3604 
        },
        
    },

    "fumetto1" : {
        
        "riga1": { // Siete stati eccezionali
            "top": "9.04669260700389%",
            "left": "47.65625%",
            "width": "28.77604166666667%",
            "height": "1.8482490272373546%",
        delay: 4134,
        length: 2756 
        },
        "riga2": { // Rimanete con noi!!!
            "top": "10.700389105058365%",
            "left": "47.916666666666664%",
            "width": "25.000000000000007%",
            "height": "1.7509727626459153%",
        delay: 6943,
        length: 2385 
        },
        
        
    },
    
    "fumetto2" : {
        
        "riga1": { // Che facciamo
            "top": "29.085603112840467%",
            "left": "12.760416666666666%",
            "width": "19.40104166666667%",
            "height": "2.0428015564202333%",
            delay: 9646,
            length: 1060 
        },
        
    },
    
    "fumetto3" : {
        
        "riga1": { // Rimaniamo?
            "top": "29.961089494163424%",
            "left": "44.661458333333336%",
            "width": "14.0625%",
            "height": "1.5564202334630366%",
            delay: 10600,
            length: 1431 
        },
        
            },
    
    "fumetto4" : {
        
        "riga1": { // Rimaniamo?
            "top": "29.377431906614785%",
            "left": "73.046875%",
            "width": "18.22916666666667%",
            "height": "1.5564202334630366%",
        delay: 11925,
        length: 1166 
        },
        "riga2": { // E me lo chiedete
            "top": "30.739299610894943%",
            "left": "72.00520833333333%",
            "width": "21.09375%",
            "height": "1.653696498054476%",
        delay: 13144,
        length: 954 
        },
        "riga3": { // pure??
            "top": "32.39299610894942%",
            "left": "78.77604166666667%",
            "width": "7.161458333333329%",
            "height": "1.7509727626459153%",
        delay: 14098,
        length: 795 
        },
        
    },
    
    
    
    "intro2" : {
        
        "riga1": { // E così
            "top": "64.15628954223158%",
            "left": "66.14583333333333%",
            "width": "8.854166666666671%",
            "height": "2.3536964980544724%",
        delay: 18285,
        length: 848 
        },
        "riga2": { // I nostri tre amici
            "top": "66.11543351110318%",
            "left": "66.14583333333333%",
            "width": "22.005208333333343%",
            "height": "1.848249027237344%",
        delay: 19133,
        length: 1643 
        },
        "riga3": { // Iniziano la loro
            "top": "68.06368253834052%",
            "left": "66.40625%",
            "width": "21.74479166666667%",
            "height": "1.8482490272373582%",
        delay: 20723,
        length: 1219 
        },
        "riga4": { // avventura come
            "top": "69.61737903639501%",
            "left": "66.40625%",
            "width": "19.79166666666667%",
            "height": "1.6536964980544724%",
        delay: 21889,
        length: 848 
        },
        "riga5": { // Mascotte
            "top": "71.27107553444948%",
            "left": "66.27604166666667%",
            "width": "14.192708333333329%",
            "height": "1.9455252918287869%",
        delay: 22737,
        length: 795 
        },
        "riga6": { // Chissà cosa
            "top": "74.07846853055842%",
            "left": "66.14583333333333%",
            "width": "17.05729166666667%",
            "height": "2.2509727626459153%",
        delay: 23691,
        length: 689 
        },
        "riga7": { // Combineranno
            "top": "76.2321650286129%",
            "left": "66.27604166666667%",
            "width": "18.48958333333333%",
            "height": "1.7509727626459153%",
        delay: 24380,
        length: 636 
        },
        "riga8": { // La prossima volta
            "top": "77.6913089974845%",
            "left": "66.40625%",
            "width": "23.828125%",
            "height": "2.2373540856031155%",
        delay: 25069,
        length: 1007 
        },
        "riga9": { // A presto
            "top": "80.12321561227049%",
            "left": "65.75520833333333%",
            "width": "13.151041666666671%",
            "height": "2.2373540856031155%",
        delay: 26818,
        length: 1007 
        },
        
        
    },
      
    };
console.log('LOADING DONE');       


onStatus = function() {
    //$('body').fadeIn();
    startAnimations();                        
    }
                                             
                                          
$('#image').hide().attr('src','images/JPG/30.jpg').show();
                                             
$('#prev').html('<a onmousedown="loadPage(28); return false;"><img src="images/icon-prev.png"></a>').css('visibility','');
$('#next').html('<a onmousedown="loadPage(32); return false;"><img src="images/icon-next.png"></a>').css('visibility','');
                                             
                                             
init();
                                                                        
audioFile = '/android_asset/www/audio/pag30.mp3';
                                             
mediaStart();

                                            


data = {
    
    "fumetto1" : {
        
        "riga1": { //Ok mettiamoci
            "top": "5.3501945525291825%",
            "left": "7.291666666666667%",
            "width": "19.270833333333332%",
            "height": "1.8482490272373546%",
            delay: 758,
            length: 1220 
        },
        "riga2": { // Queste scarpe
            "top": "7.003891050583658%",
            "left": "7.291666666666667%",
            "width": "20.052083333333332%",
            "height": "1.8536964980544742%",
        delay: 1913,
        length: 1187 
        },
        
        
    },
    
    "fumetto2" : {
        
        "riga1": { // Voilà
            "top": "5.544747081712062%",
            "left": "52.473958333333336%",
            "width": "10.546875%",
            "height": "1.7509727626459144%",
            delay: 3200,
            length: 791 
        },
            },
    
    "fumetto3" : {
        
        "riga1": { // Limo perchè non ti
            "top": "47.27626459143969%",
            "left": "6.25%",
            "width": "25.78125%",
            "height": "1.8536964980544724%",
        delay: 4487,
        length: 1484 
        },
        "riga2": { // metti questo cappello
            "top": "49.02723735408561%",
            "left": "6.380208333333333%",
            "width": "30.989583333333332%",
            "height": "1.5564202334630295%",
        delay: 6038,
        length: 1121 
        },
        
        "riga3": { // Hi hi... Ti starebbe
            "top": "50.37548638132296%",
            "left": "6.640625%",
            "width": "22.395833333333332%",
            "height": "1.984591439688715%",
        delay: 7291,
        length: 1682 
        },
        "riga4": { // bene
            "top": "52.33463035019455%",
            "left": "8.854166666666666%",
            "width": "7.952083333333334%",
            "height": "1.9564202334630366%",
        delay: 9073,
        length: 626 
        },
 
        
    },

    "fumetto4" : {
        
        "riga1": { // Pulzella io
            "top": "53.793774319066145%",
            "left": "26.825%",
            "width": "17.234375%",
            "height": "1.7591439688716008%",
        delay: 10096,
        length: 1418 
        },
        "riga2": { // ho il mio style 
            "top": "55.35019455252918%",
            "left": "26.171875%",
            "width": "20.963541666666664%",
            "height": "1.5564202334630366%",
        delay: 11548,
        length: 1022 
        },
        
        
    },

    
    "fumetto5" : {
        
        "riga1": { // preferisco questo
            "top": "89.8750972762646%",
            "left": "18.75%",
            "width": "27.573958333333336%",
            "height": "2.1482490272373582%",
        delay: 12670,
        length: 923 
        },
        
        "riga2": { // di cappello! tzk!
            "top": "92.02607003891051%",
            "left": "19.270833333333332%",
            "width": "23.697916666666668%",
            "height": "1.8455252918287869%",
        delay: 13627,
        length: 1088 
        },
        
    },
    
    
    
    "fumetto6" : {
        
        "riga1": { // E poi guarda che bekka fionda
            "top": "47.762645914396884%",
            "left": "53.776041666666664%",
            "width": "42.447916666666664%",
            "height": "1.5564202334630366%",
        delay: 14913,
        length: 1880 
        },
        
        
        "riga2": { // Che ho trovato
            "top": "49.221789883268485%",
            "left": "60.416666666666664%",
            "width": "23.177083333333336%",
            "height": "1.7509727626459082%",
        delay: 16860,
        length: 824 
        },
        
    },
    
    
    "fumetto7" : {
        
        "riga1": { // me la tengo
            "top": "89.98054474708171%",
            "left": "58.984375%",
            "width": "19.140625%",
            "height": "1.7509727626459153%",
            delay: 17916,
            length: 791 
        },
        
        
        "riga2": { // Si si
            "top": "91.63424124513618%",
            "left": "65.36458333333333%",
            "width": "7.119791666666671%",
            "height": "1.9564202334630437%",
        delay: 18774,
        length: 527 
        },
        
    },
};
console.log('LOADING DONE');       


onStatus = function() {
    //$('body').fadeIn();
    startAnimations();                        
    }
                                             
                                          
$('#image').hide().attr('src','images/JPG/22.jpg').show();
                                             
$('#prev').html('<a onmousedown="loadPage(20); return false;"><img src="images/icon-prev.png"></a>').css('visibility','');
$('#next').html('<a alt="24" onmousedown="loadPage(24); return false;"><img src="images/icon-next.png"></a>').css('visibility','');
                                             
                                             
init();
                                                                        
audioFile = '/android_asset/www/audio/pag22.mp3';
                                             
mediaStart();

                                            


data = {
       "fumetto1" : {
        
        "riga1": { // correre
            "top": "5.155642023346304%",
            "left": "16.015625%",
            "width": "43.489583333333336%",
            "height": "2.4319066147859916%",
            delay: 759,
            length: 3887 
        },
    },
    
    "fumetto2" : {
        
        "riga1": { // oh noo
            "top": "41.63424124513619%",
            "left": "14.0625%",
            "width": "12.5%",
            "height": "1.5564202334630366%",
            delay: 6348,
            length: 713 
        },
        "riga2": { // che facciamo adesso??
            "top": "43.190661478599225%",
            "left": "6.380208333333333%",
            "width": "29.427083333333332%",
            "height": "1.8536964980544724%",
        delay: 7452,
        length: 1541 
        },
        
        
    },
    
    "fumetto3" : {
        
        "riga1": { // s-serve
            "top": "86.67315175097276%",
            "left": "20.182291666666668%",
            "width": "12.630208333333332%",
            "height": "1.7509727626459153%",
            delay: 9062,
            length: 828 
        },
        "riga2": { // una soluzione
            "top": "88.32684824902724%",
            "left": "15.364583333333334%",
            "width": "20.3125%",
            "height": "2.0428015564202298%",
        delay: 10005,
            length: 1518 
        },
       
        
    },
    "fumetto4" : {
        
        "riga1": { // da questa parte
            "top": "34.72762645914397%",
            "left": "55.859375%",
            "width": "21.74479166666667%",
            "height": "1.945525291828794%",
        delay: 11684,
        length: 759 
        },
        "riga2": { // presto
            "top": "36.57587548638132%",
            "left": "62.239583333333336%",
            "width": "10.677083333333336%",
            "height": "1.8482490272373582%",
        delay: 12466,
        length: 529 
        },
        
        
    },
    
};
//console.log('LOADING DONE');       


onStatus = function() {
    //$('body').fadeIn();
    startAnimations();                        
    }
                                             
                                          
$('#image').hide().attr('src','images/JPG/14.jpg').show();
                                             
$('#prev').html('<a onmousedown="loadPage(12); return false;"><img src="images/icon-prev.png"></a>').css('visibility','');
$('#next').html('<a  alt="16"  onmousedown="loadPage(16); return false;"><img src="images/icon-next.png"></a>').css('visibility','');
                                             
                                             
init();
                                                                        
audioFile = '/android_asset/www/audio/pag14.mp3';
                                             
mediaStart();

                                            

       var data = {"fumetto1" : {
                      "riga1": {
                          height: "2.23463687150838%",
                          left: "8.222811671087532%",
                          top: "6.33147113594041%",
                          width: "31.299734748010607%",                   
                          times: [ 
                                  {t: 0, perc: '0%'},
                                  {t: 0.100, perc: '25%'},
                                  {t: 0.200, perc: '50%'},
                                  {t: 0.300, perc: '75%'},
                                  {t: 0.400, perc: '100%'}
                                ],
                        },
            "riga2": {
                height: "1.6759776536312856%",
                left: "8.488063660477454%",
                top: "8.379888268156424%",
                width: "19.098143236074268%",                  
                times: [ 
                        {t: 0, perc: '0%'},
                        {t: 0.100, perc: '25%'},
                        {t: 0.200, perc: '50%'},
                        {t: 0.300, perc: '75%'},
                        {t: 0.400, perc: '100%'}
                        ],
            },
                      },
            
            "fumetto2" : {
                "riga1": {
                    height: "1.8621973929236475%",
                    left: "26.52519893899204%",
                    top: "38.98985310417758%",
                    width: "11.936339522546419%",
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                }            
            },

            
            
            "fumetto3" : {
                "riga1": {
                    height: "1.8621973929236502%",
                    left: "53.58090185676392%",
                    top: "7.262569832402234%",
                    width: "37.931034482758626%",
                    
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                }            
            },
            
            
            "fumetto4" : {
                "riga1": {
                    height: "2.0484171322160165%",
                    left: "70.026525198939%",
                    top: "38.756767287156656%",
                    width: "13.793103448275858%",        
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                }            
            },
            
            "fumetto5" : {
                "riga1": {
                    height: "1.8621973929236475%",
                    left: "7.161803713527852%",
                    top: "48.06775425177491%",
                    width: "39.52254641909814%",       
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                },
                "riga2": {
                    height: "1.6759776536312856%",
                    left: "7.957559681697613%",
                    top: "49.929951644698555%",
                    width: "40.58355437665783%",
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                }
            },
            
            
            "fumetto6" : {
                "riga1": {
                    height: "1.8621973929236475%",
                    left: "35.80901856763926%",
                    top: "56.80484878284305%",
                    width: "10.61007957559682%",       
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                },
                "riga2": {
                    height: "1.8621973929236475%",
                    left: "33.687002652519894%",
                    top: "58.48082643647434%",
                    width: "15.119363395225463%",
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                }
            },
            
            "fumetto8" : {
                "riga1": {
                    height: "1.8621973929236475%",
                    left: "28.647214854111407%",
                    top: "86.59875965651187%",
                    width: "23.076923076923077%",       
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                },
                "riga2": {
                    height: "1.8621973929236475%",
                    left: "26.52519893899204%",
                    top: "88.27473731014315%",
                    width: "28.116710875331563%",       
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                },
                "riga3": {
                    height: "1.8621973929236475%",
                    left: "31.83023872679045%",
                    top: "89.95071496377444%",
                    width: "16.976127320954905%",       
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                },
                "riga4": {
                    height: "1.8621973929236475%",
                    left: "31.83023872679045%",
                    top: "91.62669261740572%",
                    width: "17.506631299734746%",      
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                },
                
            },

            
            "fumetto9" : {
                "riga1": {
                    height: "1.6759776536312856%",
                    left: "70.026525198939%",
                    top: "47.96353132365136%",
                    width: "9.549071618037132%",       
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                },
                "riga2": {
                    height: "1.6759776536312856%",
                    left: "59.41644562334218%",
                    top: "49.639508977282645%",
                    width: "30.503978779840843%",
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                }
            },
            
            "fumetto10" : {
                "riga1": {
                    height: "1.8621973929236475%",
                    left: "65.78249336870026%",
                    top: "88.46095704943552%",
                    width: "19.893899204244036%",     
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                },
                "riga2": {
                    height: "1.6759776536312927%",
                    left: "66.57824933687003%",
                    top: "90.32315444235917%",
                    width: "18.56763925729443%",
                    times: [ 
                            {t: 0, perc: '0%'},
                            {t: 0.100, perc: '25%'},
                            {t: 0.200, perc: '50%'},
                            {t: 0.300, perc: '75%'},
                            {t: 0.400, perc: '100%'}
                            ],
                }
            },
            
        };



// Ho detto che siete dei pazzi
$('#fumetto1_riga1').delay(480).animate({left: '100%'},2462);                       

// E degli incoscienti
$('#fumetto1_riga2').delay(2401).animate({left: '100%'},1700);                       

// C-Come 
$('#fumetto2_riga1').delay(4036).animate({left: '100%'},1170);   


// Ho detto che siete dei pazzi
$('#fumetto3_riga1').delay(4985).animate({left: '100%'},2704);     

// E perchè?
$('#fumetto4_riga1').delay(7508).animate({left: '100%'},1483);


// Primo perchè è pericoloso
$('#fumetto5_riga1').delay(9597).animate({left: '100%'},2119);

// stare vicino alla sponda
$('#fumetto5_riga2').delay(11736).animate({left: '100%'},1816);


// Si ma è 
$('#fumetto6_riga1').delay(13967).animate({left: '100%'},655);

// Divertente
$('#fumetto6_riga2').delay(14592).animate({left: '100%'},1009);

// Secondo me non è
$('#fumetto7_riga1').delay(15369).animate({left: '100%'},1836);

// Una cosa intelligente
$('#fumetto7_riga2').delay(16984).animate({left: '100%'},1433);

// Andare così
$('#fumetto7_riga3').delay(18276).animate({left: '100%'},524);

// All'avventura
$('#fumetto7_riga4').delay(18629).animate({left: '100%'},1260);

// Ma qui 
$('#fumetto8_riga1').delay(20213).animate({left: '100%'},544);

// Ma non è pericoloso
$('#fumetto8_riga2').delay(20732).animate({left: '100%'},1079);

// Cosa vuoi che 
$('#fumetto9_riga1').delay(22050).animate({left: '100%'},575);

// Ci succeda 
$('#fumetto9_riga2').delay(22635).animate({left: '100%'},736);



 
