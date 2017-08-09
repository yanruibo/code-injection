




    ga_storage._setAccount('UA-33997773-4'); //Replace with your own
    ga_storage._setDomain('none');
    ga_storage._trackPageview('CSUSB Rec Sports Mobile Main');





if(!((window.DocumentTouch&&document instanceof DocumentTouch)||'ontouchstart' in window)){
	var script=document.createElement("script");

	script.src="plugins/jq.desktopBrowsers.js";
	var tag=$("head").append(script);
	if(!$.os.ie){
	//	$.os.desktop=true;
	//	$.feat.nativeTouchScroll=true;
	}
}
















    /* This function runs once the page is loaded, but appMobi is not yet active */
	$.ui.autoLaunch=true;
    $.ui.openLinksNewTab=false;
    $.ui.resetScrollers=false;
    $.ui.blockPageScroll();
	$.ui.ready(function(){
	//alert("test");
	//$.ui.blockPageScroll();
	initialize();
	
	});

    

	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {
	//alert("Phonegap ready");
	//check for internet connection
	document.addEventListener("offline", function() {
                                      alert("No internet connection");
                                      }, false);
	console.log("We got device ready");
    window.setTimeout(function(){cordova.exec(null, null, "SplashScreen", "hide", []);},2000);
    //alert("Phonegap ready");
    
    
    }	
	
	function showHide(obj,objToHide){
		var el=$("#"+objToHide)[0];
		
		if(obj.className=="expanded"){
			obj.className="collapsed";
		}
		else{
			obj.className="expanded";
		}
		$(el).toggle();
		
	}
		function showHide2(obj,objToHide){
		var el=$("#"+objToHide)[0];
		
		if(obj.className=="expanded2"){
			obj.className="collapsed2";
		}
		else{
			obj.className="expanded2";
		}
		$(el).toggle();
		
	}



        function showSocial(){
            $("#jQUi").actionsheet('<a onclick="window.plugins.childBrowser.showWebPage(\'http://m.facebook.com/csusbrec\'); ga_storage._trackPageview(\'Facebook\');"  ><img style="right:5px;top:5px;position:relative !important;" width="26px" height="26px" src="img/facebook_button.png" />Facebook</a><a onclick="window.plugins.childBrowser.showWebPage(\'http://twitter.com/CSUSBRecSports\'); ga_storage._trackPageview(\'Twitter\');"  ><img style="right:5px;top:5px;position:relative !important;" width="26px" height="26px" src="img/twitter-button.png" />Twitter</a><a onclick="window.plugins.childBrowser.showWebPage(\'http://m.youtube.com/user/CSUSBRecSports07\'); ga_storage._trackPageview(\'Youtube\');"  ><img style="right:5px;top:5px;position:relative !important;" width="26px" height="26px" src="img/youtube_button.png" />Youtube</a>');
        }
    

	function showMask(text){

	$.ui.showMask(text);
	window.setTimeout(function(){$.ui.hideMask();},1000);
	}
		var menuOpen = false;
	var menuDiv = "";

	function menubutton() {
		document.addEventListener("deviceready", startup, false);
	}

	function startup() {
		console.log("test menu...");
		document.addEventListener("menubutton", doMenu, false);
	}

	function doMenu() {
		console.log("The menu was clicked...");
	jq.ui.toggleSideMenu();
	}
	

                        
                        function doPost(){
                            
                            document.getElementById("email").className = "jq-ui-forms";
                            document.getElementById("firstname").className = "jq-ui-forms";
                            document.getElementById("lastname").className = "jq-ui-forms";
                            document.getElementById("phone").className = "jq-ui-forms";
                            
                            var x=document.forms["myForm"]["firstname"].value;
                            if (x==null || x=="")
                            {
                                alert("first name must be filled out");
                                document.getElementById("firstname").className = "jq-ui-forms-invalid";
                                
                                
                            }
                            var u=document.forms["myForm"]["lastname"].value;
                            if (u==null || u=="")
                            {
                                alert("last name must be filled out");
                                document.getElementById("lastname").className = "jq-ui-forms-invalid";
                                
                                
                            }
                            
                            var y=document.forms["myForm"]["email"].value;
                            if (y==null || y=="")
                            {
                                alert("email must be filled out");
                                document.getElementById("email").className = "jq-ui-forms-invalid";
                                
                            }
                            var atpos=y.indexOf("@");
                            var dotpos=y.lastIndexOf(".");
                            if (atpos<1 || dotpos<atpos+2 || dotpos+2>=y.length)
                            {
                                alert("Not a valid e-mail address");
                                document.getElementById("email").className = "jq-ui-forms-invalid";
                                
                                
                            }
                            
                            var stripped = document.forms["myForm"]["phone"].value.replace(/[\(\)\.\-\ ]/g, '');
                            if (stripped != "") {
                                
                                if (isNaN(parseInt(stripped))) {
                                    alert("The phone number contains illegal characters.");
                                    document.getElementById("phone").className = "jq-ui-forms-invalid";
                                    
                                    
                                    
                                } else if (!(stripped.length == 10)) {
                                    alert("The phone number is the wrong length. Make sure you included an area code.");
                                    document.getElementById("phone").className = "jq-ui-forms-invalid";
                                    
                                    
                                    
                                }
                            }
                            
                            
                            
                            
                            var firstname = $('#firstname').val();
                            var lastname = $('#lastname').val();
                            
                            var email = $('#email').val();
                            var phone = $('#phone').val();
                            var affiliation = $('#affiliation').val();
                            
                            
                            
                            var varData = 'firstname=' + firstname + '&lastname=' + lastname + '&email=' + email + '&phone=' + phone + '&affiliation=' + affiliation;
                            console.log(varData);
                            
                            
                            $.ajax({
                                   type: "POST",
                                   url:'https://mobileapps.csusb.edu/9339d71085943cc0a3b8028b26cc5cde/training_form.php',
                                   //url:'https://mypupdvl.cms.csusb.edu/recsports/server/training_form.php',
                                   
                                   data: varData,
                                   success: function() {
                                   alert("Your request has been submitted");
                                   }
                                   
                                   });
                            
                            
                            
                        }
                        
                        
                        
                        

                        
                        function doContact(){
                            
                            document.getElementById("myemail").className = "jq-ui-forms";
                            document.getElementById("myfirstname").className = "jq-ui-forms";
                            document.getElementById("mylastname").className = "jq-ui-forms";
                            document.getElementById("myphone").className = "jq-ui-forms";
                            document.getElementById("comment").className = "jq-ui-forms";
                            document.getElementById("department").className = "dep_label";

                            
                            var x=document.forms["contactForm"]["myfirstname"].value;
                            if (x==null || x=="")
                            {
                                alert("first name must be filled out");
                                document.getElementById("myfirstname").className = "jq-ui-forms-invalid";
                                
                                
                            }
                            var u=document.forms["contactForm"]["mylastname"].value;
                            if (u==null || u=="")
                            {
                                alert("last name must be filled out");
                                document.getElementById("mylastname").className = "jq-ui-forms-invalid";
                                
                                
                            }
                            
                            var y=document.forms["contactForm"]["myemail"].value;
                            if (y==null || y=="")
                            {
                                alert("email must be filled out");
                                document.getElementById("myemail").className = "jq-ui-forms-invalid";
                                
                            }
                            var atpos=y.indexOf("@");
                            var dotpos=y.lastIndexOf(".");
                            if (atpos<1 || dotpos<atpos+2 || dotpos+2>=y.length)
                            {
                                alert("Not a valid e-mail address");
                                document.getElementById("myemail").className = "jq-ui-forms-invalid";
                                
                                
                            }
                            
                            var stripped = document.forms["contactForm"]["myphone"].value.replace(/[\(\)\.\-\ ]/g, '');
                            if (stripped != "") {
                                
                                if (isNaN(parseInt(stripped))) {
                                    alert("The phone number contains illegal characters.");
                                    document.getElementById("myphone").className = "jq-ui-forms-invalid";
                                    
                                    
                                    
                                } else if (!(stripped.length == 10)) {
                                    alert("The phone number is the wrong length. Make sure you included an area code.");
                                    document.getElementById("myphone").className = "jq-ui-forms-invalid";
                                    
                                    
                                    
                                }
                            }
                            
                            var q=document.forms["contactForm"]["department"].value;
                            if (q==null || q=="" || q=="nill")
                            {
                                alert("You must select a department");
                                document.getElementById("department").className = "dep_label_invalid";
                                
                                
                            }
                            var r=document.forms["contactForm"]["comment"].value;
                            if (r.length>150){
                                alert("The field cannot contain more than 150 characters")
                                document.getElementById("comment").className = "jq-ui-forms-invalid";
                                
                                
                            }if (r==null || r=="")
                            {
                                alert("Message must be filed out");
                                document.getElementById("comment").className = "jq-ui-forms-invalid";
                                
                                
                            }

                            
                            var firstname = $('#myfirstname').val();
                            var lastname = $('#mylastname').val();
                            
                            var email = $('#myemail').val();
                            var phone = $('#myphone').val();
                            var affiliation = $('#myaffiliation').val();
                            var department = $('#department').val();
                            var comment = $('#comment').val();
                            
                            
                            var varData = 'firstname=' + firstname + '&lastname=' + lastname + '&email=' + email + '&phone=' + phone + '&affiliation=' + affiliation + '&department=' + department  + '&comment=' + comment;
                            console.log(varData);
                            
                            
                            $.ajax({
                                   type: "POST",
                                   url:'https://mobileapps.csusb.edu/9339d71085943cc0a3b8028b26cc5cde/contact.php',
                                   //url:'https://mobileapps.dev.csusb.edu/csusbrecsports/contact.php',
                                   
                                   data: varData,
                                   success: function() {
                                   alert("Your request has been submitted");
                                   }
                                   
                                   });
                            
                            
                            
                        }
                        
                        
                        
                        





//Touch events are from zepto/touch.js
(function($) {
    var touch = {}, touchTimeout;
    
    function parentIfText(node) {
        return 'tagName' in node ? node : node.parentNode;
    }
    
    function swipeDirection(x1, x2, y1, y2) {
        var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2);
        if (xDelta >= yDelta) {
            return (x1 - x2 > 0 ? 'Left' : 'Right');
        } else {
            return (y1 - y2 > 0 ? 'Up' : 'Down');
        }
    }
    
    var longTapDelay = 750;
    function longTap() {
        if (touch.last && (Date.now() - touch.last >= longTapDelay)) {
            touch.el.trigger('longTap');
            touch = {};
        }
    }
    $(document).ready(function() {
        var prevEl;
        $(document.body).bind('touchstart', function(e) {
            if(!e.touches||e.touches.length==0) return;
            var now = Date.now(), delta = now - (touch.last || now);
            if(!e.touches||e.touches.length==0) return;
            touch.el = $(parentIfText(e.touches[0].target));
            touchTimeout && clearTimeout(touchTimeout);
            touch.x1 =  e.touches[0].pageX;
            touch.y1 = e.touches[0].pageY;
            touch.x2=touch.y2=0;
            if (delta > 0 && delta <= 250)
                touch.isDoubleTap = true;
            touch.last = now;
            setTimeout(longTap, longTapDelay);
            if (!touch.el.data("ignore-pressed"))
                touch.el.addClass("selected");
            if(prevEl&&!prevEl.data("ignore-pressed"))
                prevEl.removeClass("selected");
            prevEl=touch.el;
        }).bind('touchmove', function(e) {
            touch.x2 = e.touches[0].pageX;
            touch.y2 = e.touches[0].pageY;
        }).bind('touchend', function(e) {

            if (!touch.el)
                return;
            if (!touch.el.data("ignore-pressed"))
                touch.el.removeClass("selected");
            if (touch.isDoubleTap) {
                touch.el.trigger('doubleTap');
                touch = {};
            } else if (touch.x2 > 0 || touch.y2 > 0) {
                (Math.abs(touch.x1 - touch.x2) > 30 || Math.abs(touch.y1 - touch.y2) > 30) && 
                touch.el.trigger('swipe') && 
                touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
                touch.x1 = touch.x2 = touch.y1 = touch.y2 = touch.last = 0;
            } else if ('last' in touch) {
                touch.el.trigger('tap');

                
                touchTimeout = setTimeout(function() {
                    touchTimeout = null;
                    if (touch.el)
                        touch.el.trigger('singleTap');
                    touch = {};
                }, 250);
            }
        }).bind('touchcancel', function() {
            if(touch.el&& !touch.el.data("ignore-pressed"))
                touch.el.removeClass("selected");
            touch = {};

        });
    });
    
    ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(m) {
        $.fn[m] = function(callback) {
            return this.bind(m, callback)
        }
    });
})(jq);

//TouchLayer contributed by Carlos Ouro @ Badoo
//un-authoritive layer between touches and actions on the DOM 
//(un-authoritive: listeners do not require useCapture)
//handles overlooking JS and native scrolling, panning, 
//no delay on click, edit mode focus, preventing defaults, resizing content, 
//enter/exit edit mode (keyboard on screen), prevent clicks on momentum, etc
//It can be used independently in other apps but it is required by jqUi
//Object Events
//Enter Edit Mode:
//pre-enter-edit - when a possible enter-edit is actioned - happens before actual click or focus (android can still reposition elements and event is actioned)
//cancel-enter-edit - when a pre-enter-edit does not result in a enter-edit
//enter-edit - on a enter edit mode focus
//enter-edit-reshape - focus resized/scrolled event
//in-edit-reshape - resized/scrolled event when a different element is focused
//Exit Edit Mode
//exit-edit - on blur
//exit-edit-reshape - blur resized/scrolled event
//Other
//orientationchange-reshape - resize event due to an orientationchange action
//reshape - window.resize/window.scroll event (ignores onfocus "shaking") - general reshape notice
(function() {

	//singleton
	$.touchLayer = function(el) {
	//	if(jq.os.desktop||!jq.os.webkit) return;
		$.touchLayer = new touchLayer(el);
		return $.touchLayer;
	};
	//configuration stuff
	var inputElements = ['input', 'select', 'textarea'];
	var autoBlurInputTypes = ['button', 'radio', 'checkbox', 'range','date'];
	var requiresJSFocus = $.os.ios; //devices which require .focus() on dynamic click events
	var verySensitiveTouch = $.os.blackberry; //devices which have a very sensitive touch and touchmove is easily fired even on simple taps
	var inputElementRequiresNativeTap = $.os.blackberry || ($.os.android && !$.os.chrome); //devices which require the touchstart event to bleed through in order to actually fire the click on select elements
	var selectElementRequiresNativeTap = $.os.blackberry || ($.os.android && !$.os.chrome); //devices which require the touchstart event to bleed through in order to actually fire the click on select elements
	var focusScrolls = $.os.ios; //devices scrolling on focus instead of resizing
	var focusResizes = $.os.blackberry10;
	var requirePanning = $.os.ios; //devices which require panning feature
	var addressBarError = 0.97; //max 3% error in position
	var maxHideTries = 2; //HideAdressBar does not retry more than 2 times (3 overall)
	var skipTouchEnd=false; //Fix iOS bug with alerts/confirms
	function getTime(){
		var d = new Date();
		var n = d.getTime();
		return n;
	}
	var touchLayer = function(el) {
			this.clearTouchVars();
			el.addEventListener('touchstart', this, false);
			el.addEventListener('touchmove', this, false);
			el.addEventListener('touchend', this, false);
			el.addEventListener('click', this, false);
			el.addEventListener("focusin",this,false);
			document.addEventListener('scroll', this, false);
			window.addEventListener("resize", this, false);
			window.addEventListener("orientationchange", this, false);
			this.layer = el;
			//proxies
			this.scrollEndedProxy_ = $.proxy(this.scrollEnded, this);
			this.exitEditProxy_ = $.proxy(this.exitExit, this, []);
			this.launchFixUIProxy_ = $.proxy(this.launchFixUI, this);
			var that = this;
			this.scrollTimeoutExpireProxy_ = function() {
				that.scrollTimeout_ = null;
				that.scrollTimeoutEl_.addEventListener('scroll', that.scrollEndedProxy_, false);
			};
			this.retestAndFixUIProxy_ = function() {
				if(jq.os.android) that.layer.style.height = '100%';
				$.asap(that.testAndFixUI, that, arguments);
			};
			//iPhone double clicks workaround
			document.addEventListener('click', function(e) {
				if(e.clientX!==undefined&&that.lastTouchStartX!=null)
				{
					if(2>Math.abs(that.lastTouchStartX-e.clientX)&&2>Math.abs(that.lastTouchStartY-e.clientY)){
						e.preventDefault();
						e.stopPropagation();
					}
				}
			}, true);
			//js scrollers self binding
			$.bind(this, 'scrollstart', function(el) {
				that.isScrolling=true;
				that.scrollingEl_=el;
				that.fireEvent('UIEvents', 'scrollstart', el, false, false);
			});
			$.bind(this, 'scrollend', function(el) {
				that.isScrolling=false;

				that.fireEvent('UIEvents', 'scrollend', el, false, false);
			});
			//fix layer positioning
			this.launchFixUI(5); //try a lot to set page into place
		}

	touchLayer.prototype = {
		dX: 0,
		dY: 0,
		cX: 0,
		cY: 0,
		touchStartX:null,
		touchStartY:null,
		//elements
		layer: null,
		scrollingEl_: null,
		scrollTimeoutEl_: null,
		//handles / proxies
		scrollTimeout_: null,
		reshapeTimeout_: null,
		scrollEndedProxy_: null,
		exitEditProxy_: null,
		launchFixUIProxy_: null,
		reHideAddressBarTimeout_: null,
		retestAndFixUIProxy_: null,
		//options
		panElementId: "header",
		//public locks
		blockClicks: false,
		//private locks
		allowDocumentScroll_: false,
		ignoreNextResize_: false,
		blockPossibleClick_: false,
		//status vars
		isScrolling: false,
		isScrollingVertical_: false,
		wasPanning_: false,
		isPanning_: false,
		isFocused_: false,
		justBlurred_: false,
		requiresNativeTap: false,
		holdingReshapeType_: null,

		handleEvent: function(e) {
			switch(e.type) {
			case 'touchstart':
				this.onTouchStart(e);
				break;
			case 'touchmove':
				this.onTouchMove(e);
				break;
			case 'touchend':
				this.onTouchEnd(e);
				break;
			case 'click':
				this.onClick(e);
				break;
			case 'blur':
				this.onBlur(e);
				break;
			case 'scroll':
				this.onScroll(e);
				break;
			case 'orientationchange':
				this.onOrientationChange(e);
				break;
			case 'resize':
				this.onResize(e);
				break;
			case 'focusin':
				this.onFocusIn(e);
				break;
			}
		},
		launchFixUI: function(maxTries) {
			//this.log("launchFixUI");
			if(!maxTries) maxTries = maxHideTries;
			if(this.reHideAddressBarTimeout_ == null) return this.testAndFixUI(0, maxTries);
		},
		resetFixUI: function() {
			//this.log("resetFixUI");
			if(this.reHideAddressBarTimeout_) clearTimeout(this.reHideAddressBarTimeout_);
			this.reHideAddressBarTimeout_ = null;
		},
		testAndFixUI: function(retry, maxTries) {
			//this.log("testAndFixUI");
			//for ios or if the heights are incompatible (and not close)
			var refH = this.getReferenceHeight();
			var curH = this.getCurrentHeight();
			if((refH != curH && !(curH * addressBarError < refH && refH * addressBarError < curH))) {
				//panic! page is out of place!
				this.hideAddressBar(retry, maxTries);
				return true;
			}
			if(jq.os.android) this.resetFixUI();
			return false;
		},
		hideAddressBar: function(retry, maxTries) {
			if(retry >= maxTries) {
				this.resetFixUI();
				return; //avoid a possible loop
			}

			//this.log("hiding address bar");
			if(jq.os.desktop || jq.os.chrome) {
				this.layer.style.height = "100%";
			} else if(jq.os.android) {
				//on some phones its immediate
				window.scrollTo(1, 1);
				this.layer.style.height = this.isFocused_ ? (window.innerHeight) + "px" : (window.outerHeight / window.devicePixelRatio) + 'px';
				//sometimes android devices are stubborn
				that = this;
				//re-test in a bit (some androids (SII, Nexus S, etc) fail to resize on first try)
				var nextTry = retry + 1;
				this.reHideAddressBarTimeout_ = setTimeout(this.retestAndFixUIProxy_, 250 * nextTry, [nextTry, maxTries]); //each fix is progressibily longer (slower phones fix)
			} else if(!this.isFocused_) {
				document.documentElement.style.height = "5000px";
				window.scrollTo(0, 0);
				document.documentElement.style.height = window.innerHeight + "px";
				this.layer.style.height = window.innerHeight + "px";
			}
		},
		getReferenceHeight: function() {
			//the height the page should be at
			if(jq.os.android) {
				return Math.ceil(window.outerHeight / window.devicePixelRatio);
			} else return window.innerHeight;
		},
		getCurrentHeight: function() {
			//the height the page really is at
			if(jq.os.android) {
				return window.innerHeight;
			} else return numOnly(document.documentElement.style.height); //TODO: works well on iPhone, test BB
		},
		onOrientationChange: function(e) {
			//this.log("orientationchange");
			//if a resize already happened, fire the orientationchange
			if(!this.holdingReshapeType_ && this.reshapeTimeout_) {
				this.fireReshapeEvent('orientationchange');
			} else this.previewReshapeEvent('orientationchange');
		},
		onResize: function(e) {
			//avoid infinite loop on iPhone
			if(this.ignoreNextResize_) {
				//this.log('ignored resize');
				this.ignoreNextResize_ = false;
				return;
			}
			//this.logInfo('resize');
			if(this.launchFixUI()) {
				this.reshapeAction();
			}
		},
		onClick: function(e) {
			//handle forms
			var tag = e.target && e.target.tagName != undefined ? e.target.tagName.toLowerCase() : '';

			//this.log("click on "+tag);
			if(inputElements.indexOf(tag) !== -1 && (!this.isFocused_ || !e.target==(this.focusedElement))) {
				var type = e.target && e.target.type != undefined ? e.target.type.toLowerCase() : '';
				var autoBlur = autoBlurInputTypes.indexOf(type) !== -1;

				//focus
				if(!autoBlur) {
					//remove previous blur event if this keeps focus
					if(this.isFocused_) {
						this.focusedElement.removeEventListener('blur', this, false);
					}
					this.focusedElement = e.target;
					this.focusedElement.addEventListener('blur', this, false);
					//android bug workaround for UI
					if(!this.isFocused_ && !this.justBlurred_) {
						//this.log("enter edit mode");
						$.trigger(this, 'enter-edit', [e.target]);
						//fire / preview reshape event
						if($.os.ios) {
							var that = this;
							setTimeout(function() {
								that.fireReshapeEvent('enter-edit');
							}, 300); //TODO: get accurate reading from window scrolling motion and get rid of timeout
						} else this.previewReshapeEvent('enter-edit');
					}
					this.isFocused_ = true;
				} else {
					this.isFocused_ = false;
				}
				this.justBlurred_ = false;
				this.allowDocumentScroll_ = true;

				//fire focus action
				if(requiresJSFocus) {
					e.target.focus();
				}

				//BB10 needs to be preventDefault on touchstart and thus need manual blur on click
			} else if($.os.blackberry10 && this.isFocused_) {
				//this.log("forcing blur on bb10 ");
				this.focusedElement.blur();
			}
		},
		previewReshapeEvent: function(ev) {
			//a reshape event of this type should fire within the next 750 ms, otherwise fire it yourself
			that = this;
			this.reshapeTimeout_ = setTimeout(function() {
				that.fireReshapeEvent(ev);
				that.reshapeTimeout_ = null;
				that.holdingReshapeType_ = null;
			}, 750);
			this.holdingReshapeType_ = ev;
		},
		fireReshapeEvent: function(ev) {
			//this.log(ev?ev+'-reshape':'unknown-reshape');
			$.trigger(this, 'reshape'); //trigger a general reshape notice
			$.trigger(this, ev ? ev + '-reshape' : 'unknown-reshape'); //trigger the specific reshape
		},
		reshapeAction: function() {
			if(this.reshapeTimeout_) {
				//we have a specific reshape event waiting for a reshapeAction, fire it now
				clearTimeout(this.reshapeTimeout_);
				this.fireReshapeEvent(this.holdingReshapeType_);
				this.holdingReshapeType_ = null;
				this.reshapeTimeout_ = null;
			} else this.previewReshapeEvent();
		},
		onFocusIn:function(e){
			if(!this.isFocused_)
				this.onClick(e);
		},
		onBlur: function(e) {
			if(jq.os.android && e.target == window) return; //ignore window blurs
	
			this.isFocused_ = false;
			//just in case...
			if(this.focusedElement) this.focusedElement.removeEventListener('blur', this, false);
			this.focusedElement = null;
			//make sure this blur is not followed by another focus
			this.justBlurred_ = true;
			$.asap(this.exitEditProxy_, this, [e.target]);
		},
		exitExit: function(el) {
			this.justBlurred_ = false;
			if(!this.isFocused_) {
				//this.log("exit edit mode");
				$.trigger(this, 'exit-edit', [el]);
				//do not allow scroll anymore
				this.allowDocumentScroll_ = false;
				//fire / preview reshape event
				if($.os.ios) {
					var that = this;
					setTimeout(function() {
						that.fireReshapeEvent('exit-edit');
					}, 300); //TODO: get accurate reading from window scrolling motion and get rid of timeout
				} else this.previewReshapeEvent('exit-edit');
			}
		},
		onScroll: function(e) {
			//this.log("document scroll detected "+document.body.scrollTop);
			if(!this.allowDocumentScroll_ && !this.isPanning_ && e.target==(document)) {
				this.allowDocumentScroll_ = true;
				if(this.wasPanning_) {
					this.wasPanning_ = false;
					//give it a couple of seconds
					setTimeout(this.launchFixUIProxy_, 2000, [maxHideTries]);
				} else {
					//this.log("scroll forced page into place");
					this.launchFixUI();
				}
			}
		},

		onTouchStart: function(e) {
			//setup initial touch position
			this.dX = e.touches[0].pageX;
			this.dY = e.touches[0].pageY;
			this.lastTimestamp = e.timeStamp;
			this.lastTouchStartX=this.lastTouchStartY=null;


			//check dom if necessary
			if(requirePanning || $.feat.nativeTouchScroll) this.checkDOMTree(e.target, this.layer);
			//scrollend check
			if(this.isScrolling) {
				//remove prev timeout
				if(this.scrollTimeout_ != null) {
					clearTimeout(this.scrollTimeout_);
					this.scrollTimeout_ = null;
					//different element, trigger scrollend anyway
					if(this.scrollTimeoutEl_ != this.scrollingEl_) this.scrollEnded(false);
					else this.blockPossibleClick_ = true;
					//check if event was already set
				} else if(this.scrollTimeoutEl_) {
					//trigger 
					this.scrollEnded(true);
					this.blockPossibleClick_ = true;
				}

			}


			// We allow forcing native tap in android devices (required in special cases)
			var forceNativeTap = (jq.os.android && e && e.target && e.target.getAttribute && e.target.getAttribute("data-touchlayer") == "ignore");

			//if on edit mode, allow all native touches 
			//(BB10 must still be prevented, always clicks even after move)
			if(forceNativeTap || (this.isFocused_ && !$.os.blackberry10)) {
				this.requiresNativeTap = true;
				this.allowDocumentScroll_ = true;

				//some stupid phones require a native tap in order for the native input elements to work
			} else if(inputElementRequiresNativeTap && e.target && e.target.tagName != undefined) {
				var tag = e.target.tagName.toLowerCase();
				if(inputElements.indexOf(tag) !== -1) {
					//notify scrollers (android forms bug), except for selects
					if(tag != 'select') $.trigger(this, 'pre-enter-edit', [e.target]);
					this.requiresNativeTap = true;
				}
			}
			else if(e.target&&e.target.tagName!==undefined&&e.target.tagName.toLowerCase()=="input"&&e.target.type=="range"){
                this.requiresNativeTap=true;
            }

			//prevent default if possible
			if(!this.isPanning_ && !this.requiresNativeTap) {
                if((this.isScrolling && !$.feat.nativeTouchScroll)||(!this.isScrolling))
					e.preventDefault();
				//demand vertical scroll (don't let it pan the page)
			} else if(this.isScrollingVertical_) {
				this.demandVerticalScroll();
			}
		},
		demandVerticalScroll: function() {
			//if at top or bottom adjust scroll
			var atTop = this.scrollingEl_.scrollTop <= 0;
			if(atTop) {
				//this.log("adjusting scrollTop to 1");
				this.scrollingEl_.scrollTop = 1;
			} else {
				var scrollHeight = this.scrollingEl_.scrollTop + this.scrollingEl_.clientHeight;
				var atBottom = scrollHeight >= this.scrollingEl_.scrollHeight;
				if(atBottom) {
					//this.log("adjusting scrollTop to max-1");
					this.scrollingEl_.scrollTop = this.scrollingEl_.scrollHeight - this.scrollingEl_.clientHeight - 1;
				}
			}
		},
		//set rules here to ignore scrolling check on these elements
		//consider forcing user to use scroller object to assess these... might be causing bugs
		ignoreScrolling: function(el) {
			if(el['scrollWidth'] === undefined || el['clientWidth'] === undefined) return true;
			if(el['scrollHeight'] === undefined || el['clientHeight'] === undefined) return true;
			return false;
		},

		allowsVerticalScroll: function(el, styles) {
			var overflowY = styles.overflowY;
			if(overflowY == 'scroll') return true;
			if(overflowY == 'auto' && el['scrollHeight'] > el['clientHeight']) return true;
			return false;
		},
		allowsHorizontalScroll: function(el, styles) {
			var overflowX = styles.overflowX;
			if(overflowX == 'scroll') return true;
			if(overflowX == 'auto' && el['scrollWidth'] > el['clientWidth']) return true;
			return false;
		},


		//check if pan or native scroll is possible
		checkDOMTree: function(el, parentTarget) {

			//check panning
			//temporarily disabled for android - click vs panning issues
			if(requirePanning && this.panElementId == el.id) {
				this.isPanning_ = true;
				return;
			}
			//check native scroll
			if($.feat.nativeTouchScroll) {

				//prevent errors
				if(this.ignoreScrolling(el)) {
					return;
				}

				//check if vertical or hor scroll are allowed
				var styles = window.getComputedStyle(el);
				if(this.allowsVerticalScroll(el, styles)) {
					this.isScrollingVertical_ = true;
					this.scrollingEl_ = el;
					this.isScrolling = true;
					return;
				} else if(this.allowsHorizontalScroll(el, styles)) {
					this.isScrollingVertical_ = false;
					this.scrollingEl_ = null;
					this.isScrolling = true;
				}

			}
			//check recursive up to top element
			var isTarget = el==(parentTarget);
			if(!isTarget && el.parentNode) this.checkDOMTree(el.parentNode, parentTarget);
		},
		//scroll finish detectors
		scrollEnded: function(e) {
			//this.log("scrollEnded");
			if(e) this.scrollTimeoutEl_.removeEventListener('scroll', this.scrollEndedProxy_, false);
			this.fireEvent('UIEvents', 'scrollend', this.scrollTimeoutEl_, false, false);
			this.scrollTimeoutEl_ = null;
		},


		onTouchMove: function(e) {
			//set it as moved
			var wasMoving = this.moved;
			this.moved = true;
			//very sensitive devices check
			if(verySensitiveTouch) {
				this.cY = e.touches[0].pageY - this.dY;
				this.cX = e.touches[0].pageX - this.dX;
			}
			//panning check
			if(this.isPanning_) {
				return;
			}
			//native scroll (for scrollend)
			if(this.isScrolling) {

				if(!wasMoving) {
					//this.log("scrollstart");
					this.fireEvent('UIEvents', 'scrollstart', this.scrollingEl_, false, false);
				}
				//if(this.isScrollingVertical_) {
					this.speedY = (this.lastY - e.touches[0].pageY) / (e.timeStamp - this.lastTimestamp);
					this.lastY = e.touches[0].pageY;
					this.lastX = e.touches[0].pageX;
					this.lastTimestamp = e.timeStamp;
				//}
			}
			//non-native scroll devices

			if((!$.os.blackberry10 && !this.requiresNativeTap)) {
				//legacy stuff for old browsers
				if(!this.isScrolling ||!$.feat.nativeTouchScroll)
					e.preventDefault();
				return;
			}
		},

		onTouchEnd: function(e) {
			if($.os.ios){
				if(skipTouchEnd==e.changedTouches[0].identifier){
					e.preventDefault();
					return false;
				}
				skipTouchEnd=e.changedTouches[0].identifier;
			}
			//double check moved for sensitive devices
			var itMoved = this.moved;
			if(verySensitiveTouch) {
				itMoved = itMoved && !(Math.abs(this.cX) < 10 && Math.abs(this.cY) < 10);
			}

			//don't allow document scroll unless a specific click demands it further ahead
			if(!jq.os.ios || !this.requiresNativeTap) this.allowDocumentScroll_ = false;

			//panning action
			if(this.isPanning_ && itMoved) {
				//wait 2 secs and cancel
				this.wasPanning_ = true;

				//a generated click
			} else if(!itMoved && !this.requiresNativeTap) {

				//NOTE: on android if touchstart is not preventDefault(), click will fire even if touchend is prevented
				//this is one of the reasons why scrolling and panning can not be nice and native like on iPhone
				e.preventDefault();

				//fire click
				if(!this.blockClicks && !this.blockPossibleClick_) {
					var theTarget = e.target;
					if(theTarget.nodeType == 3) theTarget = theTarget.parentNode;
					this.fireEvent('Event', 'click', theTarget, true, e.mouseToTouch,e.changedTouches[0]);
					this.lastTouchStartX=this.dX;
					this.lastTouchStartY=this.dY;
				}

			} else if(itMoved) {
				//setup scrollend stuff
				if(this.isScrolling) {
					this.scrollTimeoutEl_ = this.scrollingEl_;
					if(Math.abs(this.speedY) < 0.01) {
						//fire scrollend immediatly
						//this.log(" scrollend immediately "+this.speedY);
						this.scrollEnded(false);
					} else {
						//wait for scroll event
						//this.log($.debug.since()+" setting scroll timeout "+this.speedY);
						this.scrollTimeout_ = setTimeout(this.scrollTimeoutExpireProxy_, 30)
					}
				}
				//trigger cancel-enter-edit on inputs
				if(this.requiresNativeTap) {
					if(!this.isFocused_) $.trigger(this, 'cancel-enter-edit', [e.target]);
				}
			}
			this.clearTouchVars();
		},

		clearTouchVars: function() {
			//this.log("clearing touchVars");
			this.speedY = this.lastY = this.cY = this.cX = this.dX = this.dY = 0;
			this.moved = false;
			this.isPanning_ = false;
			this.isScrolling = false;
			this.isScrollingVertical_ = false;
			this.requiresNativeTap = false;
			this.blockPossibleClick_ = false;
		},

		fireEvent: function(eventType, eventName, target, bubbles, mouseToTouch,data) {
			//this.log("Firing event "+eventName);
			//create the event and set the options
			var theEvent = document.createEvent(eventType);
			theEvent.initEvent(eventName, bubbles, true);
			theEvent.target = target;
            if(data){
                $.each(data,function(key,val){
                    theEvent[key]=val;
                });
            }
			//jq.DesktopBrowsers flag
			if(mouseToTouch) theEvent.mouseToTouch = true;
			target.dispatchEvent(theEvent);
		}
	};

})();
 /**
 * jq.ui - A User Interface library for creating jqMobi applications
 *
 * @copyright 2011
 * @author AppMobi
 */
(function($) {
    
    
    var hasLaunched = false;
    var startPath = window.location.pathname;
    var defaultHash = window.location.hash;
    var previousTarget = defaultHash;
    var ui = function() {
        // Init the page
        var that = this;

        //setup the menu and boot touchLayer
        jq(document).ready(function() {

            //boot touchLayer
            //create jQUi element if it still does not exist
            var jQUi = document.getElementById("jQUi");
            if (jQUi == null) {
                jQUi = document.createElement("div");
                jQUi.id = "jQUi";
                var body = document.body;
                while (body.firstChild) {
                    jQUi.appendChild(body.firstChild);
                }
                jq(document.body).prepend(jQUi);
            }
            if (jq.os.supportsTouch)
                $.touchLayer(jQUi);
        });
        
        if (window.AppMobi)
            document.addEventListener("appMobi.device.ready", function() {
                that.autoBoot();
                this.removeEventListener("appMobi.device.ready", arguments.callee);
            }, false);
        else if (document.readyState == "complete" || document.readyState == "loaded") {
            this.autoBoot();
        } else
            document.addEventListener("DOMContentLoaded", function() {
                that.autoBoot();
                this.removeEventListener("DOMContentLoaded", arguments.callee);
            }, false);
        
        if (!window.AppMobi)
            AppMobi = {}, AppMobi.webRoot = "";

        //click back event
         window.addEventListener("popstate", function() {
            var id = $.ui.getPanelId(document.location.hash);
            //make sure we allow hash changes outside jqUi
            if(id=="")
                return;
            if(document.querySelectorAll(id+".panel").length===0)
                return;
            if (id != "#" + $.ui.activeDiv.id)
                that.goBack();
        }, false);

        /**
         * Helper function to setup the transition objects
         * Custom transitions can be added via $.ui.availableTransitions
           ```
           $.ui.availableTransitions['none']=function();
           ```
         */
        
        this.availableTransitions = {};
        this.availableTransitions['default'] = this.availableTransitions['none'] = this.noTransition;
    };
    
    
    ui.prototype = {
        showLoading: true,
        loadContentQueue: [],
        isAppMobi: false,
        titlebar: "",
        navbar: "",
        header: "",
        viewportContainer: "",
        backButton: "",
        remotePages: {},
        history: [],
        homeDiv: "",
        screenWidth: "",
        content: "",
        modalWindow: "",
        customFooter: false,
        defaultFooter: "",
        defaultHeader: null,
        customMenu: false,
        defaultMenu: "",
        _readyFunc: null,
        doingTransition: false,
        passwordBox: jq.passwordBox ? new jq.passwordBox() : false,
        selectBox: jq.selectBox ? jq.selectBox : false,
        ajaxUrl: "",
        transitionType: "slide",
        scrollingDivs: [],
        firstDiv: "",
        hasLaunched: false,
        launchCompleted: false,
        activeDiv: "",
        customClickHandler: "",
        activeDiv: "",
        menuAnimation: null,
        togglingSideMenu: false,
        autoBoot: function() {
            this.hasLaunched = true;
            if (this.autoLaunch) {
                this.launch();
            }
        },
        css3animate: function(el, opts) {
            el = jq(el);
            return el.css3Animate(opts);
        },

        /**
         * this is a boolean when set to true (default) it will load that panel when the app is started
           ```
           $.ui.loadDefaultHash=false; //Never load the page from the hash when the app is started
           $.ui.loadDefaultHash=true; //Default
           ```
         *@title $.ui.loadDefaultHash
         */
        loadDefaultHash: true,
        /**
         * This is a boolean that when set to true will add "&cache=_rand_" to any ajax loaded link
           ```
           $.ui.useAjaxCacheBuster=true;
           ```
          *@title $.ui.useAjaxCacheBuster
          */
        useAjaxCacheBuster: false,
        /**
         * This is a shorthand call to the jq.actionsheet plugin.  We wire it to the jQUi div automatically
           ```
           $.ui.actionsheet("<a href='javascript:;' class='button'>Settings</a> <a href='javascript:;' class='button red'>Logout</a>")
           $.ui.actionsheet("[{
                        text: 'back',
                        cssClasses: 'red',
                        handler: function () { $.ui.goBack(); ; }
                    }, {
                        text: 'show alert 5',
                        cssClasses: 'blue',
                        handler: function () { alert("hi"); }
                    }, {
                        text: 'show alert 6',
                        cssClasses: '',
                        handler: function () { alert("goodbye"); }
                    }]");
           ```
         * @param {String,Array} links
         * @title $.ui.actionsheet()
         */
        actionsheet: function(opts) {
            return jq("#jQUi").actionsheet(opts);
        },
        /**
         * This is a wrapper to jq.popup.js plugin.  If you pass in a text string, it acts like an alert box and just gives a message
           ```
           $.ui.popup(opts);
           $.ui.popup( {
                        title:"Alert! Alert!",
                        message:"This is a test of the emergency alert system!! Don't PANIC!",
                        cancelText:"Cancel me", 
                        cancelCallback: function(){console.log("cancelled");},
                        doneText:"I'm done!",
                        doneCallback: function(){console.log("Done for!");},
                        cancelOnly:false
                      });
           $.ui.popup('Hi there');
           ```
         * @param {Object|String} options
         * @title $.ui.popup(opts)
         */
        popup: function(opts) {
            return $("#jQUi").popup(opts);
        },

        /**
         *This will throw up a mask and block the UI
         ```
         $.ui.blockUI(.9)
         ````
         * @param {Float} opacity
         * @title $.ui.blockUI(opacity)
         */
        blockUI: function(opacity) {
            $.blockUI(opacity);
        },
        /**
         *This will remove the UI mask
         ```
         $.ui.unblockUI()
         ````
         * @title $.ui.unblockUI()
         */
        unblockUI: function() {
            $.unblockUI();
        },
        /**
         * Will remove the bottom nav bar menu from your application
           ```
           $.ui.removeFooterMenu();
           ```
         * @title $.ui.removeFooterMenu
         */
        removeFooterMenu: function() {
            jq("#navbar").hide();
            jq("#content").css("bottom", "0px");
            this.showNavMenu = false;
        },
        /**
         * Boolean if you want to show the bottom nav menu.
           ```
           $.ui.showNavMenu = false;
           ```
         * @title $.ui.showNavMenu
         */
        showNavMenu: true,
        /**
         * Boolean if you want to auto launch jqUi
           ```
           $.ui.autoLaunch = false; //
         * @title $.ui.autoLaunch
         */
        autoLaunch: true,
        /**
         * Boolean if you want to show the back button
           ```
           $.ui.showBackButton = false; //
         * @title $.ui.showBackButton
         */
        showBackbutton: false,
        /**
         * @api private
         */
        backButtonText: "",
        /**
         * Boolean if you want to reset the scroller position when navigating panels.  Default is true
           ```
           $.ui.resetScrollers=false; //Do not reset the scrollers when switching panels
           ```
         * @title $.ui.resetScrollers
         */
        resetScrollers: true,
        /**
         * function to fire when jqUi is ready and completed launch
           ```
           $.ui.ready(function(){console.log('jqUi is ready');});
           ```
         * @param {Function} function to execute
         * @title $.ui.ready
         */
        ready: function(param) {
            if (this.launchCompleted)
                param();
            else
                document.addEventListener("jq.ui.ready", function(e) {
                    param();
                    this.removeEventListener('jq.ui.ready', arguments.callee);
                }, false);
        },
        /**
         * Override the back button class name
           ```
           $.ui.setBackButtonStyle('newClass');
           ```
         * @param {String} new class name
         * @title $.ui.setBackButtonStyle(class)
         */
        setBackButtonStyle: function(className) {
            jq("#backButton").get(0).className = className;
        },
        /**
         * Initiate a back transition
           ```
           $.ui.goBack()
           ```
           
         * @title $.ui.goBack()
         */
        goBack: function() {
            if (this.history.length > 0) {
                var that = this;
                var tmpEl = this.history.pop();
                $.asap(
                
                function() {
                    that.loadContent(tmpEl.target + "", 0, 1, tmpEl.transition);
                    that.transitionType = tmpEl.transition;
                    //document.location.hash=tmpEl.target;
                    that.updateHash(tmpEl.target);
                //for Android 4.0.x, we must touchLayer.hideAdressBar()
                });
            }
        },
        /**
         * Clear the history queue
           ```
           $.ui.clearHistory()
           ```
           
         * @title $.ui.clearHistory()
         */
        clearHistory: function() {
            this.history = [];
            this.setBackButtonVisibility(false)
        },

        /**
         * PushHistory
           ```
           $.ui.pushHistory(previousPage, newPage, transition, hashExtras)
           ```
           
         * @title $.ui.pushHistory()
         */
        pushHistory: function(previousPage, newPage, transition, hashExtras) {
            //push into local history
            this.history.push({
                target: previousPage,
                transition: transition
            });
            //push into the browser history
            try {
                window.history.pushState(newPage, newPage, startPath + '#' + newPage + hashExtras);
                $(window).trigger("hashchange", {
                    newUrl: startPath + '#' + newPage + hashExtras,
                    oldURL: startPath + previousPage
                });
            } catch (e) {
            }
        },


        /**
         * Updates the current window hash
         *
         * @param {String} newHash New Hash value
         * @title $.ui.updateHash(newHash)
         */
        updateHash: function(newHash) {
            newHash = newHash.indexOf('#') == -1 ? '#' + newHash : newHash; //force having the # in the begginning as a standard
            previousTarget = newHash;
            
            var previousHash = window.location.hash;
            var panelName = this.getPanelId(newHash).substring(1); //remove the #
            try {
                window.history.replaceState(panelName, panelName, startPath + newHash);
                $(window).trigger("hashchange", {
                    newUrl: startPath + newHash,
                    oldUrl: startPath + previousHash
                });
            } catch (e) {
            }
        },
        /*gets the panel name from an hash*/
        getPanelId: function(hash) {
            var firstSlash = hash.indexOf('/');
            return firstSlash == -1 ? hash : hash.substring(0, firstSlash);
        },

        /**
         * Update a badge on the selected target.  Position can be
            bl = bottom left
            tl = top left
            br = bottom right
            tr = top right (default)
           ```
           $.ui.updateBadge('#mydiv','3','bl','green');
           ```
         * @param {String} target
         * @param {String} Value
         * @param {String} [position]         
         * @param {String|Object} [color or CSS hash]         
         * @title $.ui.updateBadge(target,value,[position],[color])
         */
        updateBadge: function(target, value, position, color) {
            if (position === undefined)
                position = "";
            if (target[0] != "#")
                target = "#" + target;
            var badge = jq(target).find("span.jq-badge");
            
            if (badge.length == 0) {
                if (jq(target).css("position") != "absolute")
                    jq(target).css("position", "relative");
                badge = jq("<span class='jq-badge " + position + "'>" + value + "</span>");
                jq(target).append(badge);
            } else
                badge.html(value);
            
            
            if (jq.isObject(color)) {
                badge.css(color);
            } else if (color) {
                badge.css("background", color);
            }
            
            badge.data("ignore-pressed", "true");
        
        },
        /**
         * Removes a badge from the selected target.
           ```
           $.ui.removeBadge('#mydiv');
           ```
         * @param {String} target
         * @title $.ui.removeBadge(target)
         */
        removeBadge: function(target) {
            jq(target).find("span.jq-badge").remove();
        },
        /**
         * Toggles the bottom nav nav menu.  Force is a boolean to force show or hide.
           ```
           $.ui.toggleNavMenu();//toggle it
           $.ui.toggleNavMenu(true); //force show it
           ```
         * @param {Boolean} [force]
         * @title $.ui.toggleNavMenu([force])
         */
        toggleNavMenu: function(force) {
            if (!jq.ui.showNavMenu)
                return;
            if (jq("#navbar").css("display") != "none" && ((force !== undefined && force !== true) || force === undefined)) {
                jq("#content").css("bottom", "0px");
                jq("#navbar").hide();
            } else if (force === undefined || (force !== undefined && force === true)) {
                jq("#navbar").show();
                jq("#content").css("bottom", jq("#navbar").css("height"));
            
            }
        },
        /**
         * Toggles the top header menu.
           ```
           $.ui.toggleHeaderMenu();//toggle it
           ```
         * @param {Boolean} [force]
         * @title $.ui.toggleHeaderMenu([force])
         */
        toggleHeaderMenu: function(force) {
            if (jq("#header").css("display") != "none" && ((force !== undefined && force !== true) || force === undefined)) {
                jq("#content").css("top", "0px");
                jq("#header").hide();
            } else if (force === undefined || (force !== undefined && force === true)) {
                jq("#header").show();
                var val = numOnly(jq("#header").css("height"));
                jq("#content").css("top", val + 'px');
            }
        },
        /**
         * Toggles the side menu.  Force is a boolean to force show or hide.
           ```
           $.ui.toggleSideMenu();//toggle it
           ```
         * @param {Boolean} [force]
         * @title $.ui.toggleSideMenu([force])
         */
        toggleSideMenu: function(force, callback) {
            if (!this.isSideMenuEnabled() || this.togglingSideMenu)
                return;
            this.togglingSideMenu = true;
            
            var that = this;
            var menu = jq("#menu");
            var els = jq("#content, #menu, #header, #navbar");
            
            if (!(menu.hasClass("on") || menu.hasClass("to-on")) && ((force !== undefined && force !== false) || force === undefined)) {
                
                menu.show();
                that.css3animate(els, {
                    "removeClass": "to-off off on",
                    "addClass": "to-on",
                    complete: function(canceled) {
                        if (!canceled) {
                            that.css3animate(els, {
                                "removeClass": "to-off off to-on",
                                "addClass": "on",
                                time: 0,
                                complete: function() {
                                    that.togglingSideMenu = false;
                                    if (callback)
                                        callback(false);
                                }
                            });
                        } else {
                            that.togglingSideMenu = false;
                            if (callback)
                                callback(true);
                        }
                    }
                });
            
            } else if (force === undefined || (force !== undefined && force === false)) {
                
                
                that.css3animate(els, {
                    "removeClass": "on off to-on",
                    "addClass": "to-off",
                    complete: function(canceled) {
                        if (!canceled) {
                            that.css3animate(els, {
                                "removeClass": "to-off on to-on",
                                "addClass": "off",
                                time: 0,
                                complete: function() {
                                    menu.hide();
                                    that.togglingSideMenu = false;
                                    if (callback)
                                        callback(false);
                                }
                            });
                        } else {
                            that.togglingSideMenu = false;
                            if (callback)
                                callback(true);
                        }
                    }
                });
            }
        },
        /**
         * Disables the side menu
           ```
           $.ui.disableSideMenu();
           ```
        * @title $.ui.disableSideMenu();
        */
        disableSideMenu: function() {
            var that = this;
            var els = jq("#content, #menu, #header, #navbar");
            if (this.isSideMenuOn()) {
                this.toggleSideMenu(false, function(canceled) {
                    if (!canceled)
                        els.removeClass("hasMenu");
                });
            } else
                els.removeClass("hasMenu");
        },
        /**
         * Enables the side menu
           ```
           $.ui.enableSideMenu();
           ```
        * @title $.ui.enableSideMenu();
        */
        enableSideMenu: function() {
            var that = this;
            var els = jq("#content, #menu, #header, #navbar");
            els.addClass("hasMenu");
        },
        isSideMenuEnabled: function() {
            return jq("#content").hasClass("hasMenu");
        },
        isSideMenuOn: function() {
            var menu = jq('#menu');
            return this.isSideMenuEnabled() && (menu.hasClass("on") || menu.hasClass("to-on"));
        },

        /**
         * Updates the elements in the navbar
           ```
           $.ui.updateNavbarElements(elements);
           ```
         * @param {String|Object} Elements
         * @title $.ui.updateNavbarElements(Elements)
         */
        updateNavbarElements: function(elems) {
            var nb = jq("#navbar");
            if (elems === undefined || elems == null)
                return;
            if (typeof (elems) == "string")
                return nb.html(elems, true), null;
            nb.html("");
            for (var i = 0; i < elems.length; i++) {
                var node = elems[i].cloneNode(true);
                if (elems[i].oldhash) {
                    node.href = elems[i].oldhref;
                    node.onclick = elems[i].oldonclick;
                }
                nb.append(node);
            }
            var tmpAnchors = jq("#navbar a");
            if (tmpAnchors.length > 0)
                tmpAnchors.data("ignore-pressed", "true").data("resetHistory", "true");
        },
        /**
         * Updates the elements in the header
           ```
           $.ui.updateHeaderElements(elements);
           ```
         * @param {String|Object} Elements
         * @title $.ui.updateHeaderElement(Elements)
         */
        updateHeaderElements: function(elems) {
            var nb = jq("#header");
            if (elems === undefined || elems == null)
                return;
            if (typeof (elems) == "string")
                return nb.html(elems, true), null;
            nb.html("");
            for (var i = 0; i < elems.length; i++) {
                var node = elems[i].cloneNode(true);
                nb.append(node);
            }
        },
        /**
         * Updates the elements in the side menu
           ```
           $.ui.updateSideMenu(elements);
           ```
         * @param {String|Object} Elements
         * @title $.ui.updateSideMenu(Elements)
         */
        updateSideMenu: function(elems) {
            var that = this;
            
            var nb = jq("#menu_scroller");
            
            if (elems === undefined || elems == null)
                return;
            if (typeof (elems) == "string") {
                nb.html(elems, true)
            } 
            else {
                nb.html('');
                var close = document.createElement("a");
                close.className = "closebutton jqMenuClose";
                close.href = "javascript:;"
                close.onclick = function() {
                    that.toggleSideMenu(false);
                };
                nb.append(close);
                var tmp = document.createElement("div");
                tmp.className = "jqMenuHeader";
                tmp.innerHTML = "Menu";
                nb.append(tmp);
                for (var i = 0; i < elems.length; i++) {
                    var node = elems[i].cloneNode(true);
                    if (elems[i].oldhash) {
                        node.href = elems[i].oldhref;
                        node.onclick = elems[i].oldonclick;
                    }
                    nb.append(node);
                }
            }
            //Move the scroller to the top and hide it
            this.scrollingDivs['menu_scroller'].hideScrollbars();
            this.scrollingDivs['menu_scroller'].scrollToTop();
        },
        /**
         * Set the title of the current panel
           ```
           $.ui.setTitle("new title");
           ```
           
         * @param {String} value
         * @title $.ui.setTitle(value)
         */
        setTitle: function(val) {
            jq("#header #pageTitle").html(val);
        },
        /**
         * Override the text for the back button
           ```
           $.ui.setBackButtonText("GO...");
           ```
           
         * @param {String} value
         * @title $.ui.setBackButtonText(value)
         */
        setBackButtonText: function(text) {
            if (this.backButtonText.length > 0)
                jq("#header #backButton").html(this.backButtonText);
            else
                jq("#header #backButton").html(text);
        },
        /**
         * Toggle visibility of the back button
         */
        setBackButtonVisibility: function(show) {
            if (!show)
                jq("#header #backButton").css("visibility", "hidden");
            else
                jq("#header #backButton").css("visibility", "visible");
        },
        /**
         * Show the loading mask
           ```
           $.ui.showMask()
           $.ui.showMask(;Doing work')
           ```
           
         * @param {String} [text]
         * @title $.ui.showMask(text);
         */
        showMask: function(text) {
            if (!text)
                text = "Loading Content";
            jq("#jQui_mask>h1").html(text);
            jq("#jQui_mask").show()
        },
        /**
         * Hide the loading mask
         * @title $.ui.hideMask();
         */
        hideMask: function() {
            jq("#jQui_mask").hide()
        },
        /**
         * Load a content panel in a modal window.  We set the innerHTML so event binding will not work.
           ```
           $.ui.showModal("#myDiv");
           ```
         * @param {String|Object} panel to show
         * @title $.ui.showModal();
         */
        showModal: function(id) {
            var that = this;
            id="#"+id.replace("#","");
            try {
                if (jq(id)) {
                    jq("#modalContainer").html($.feat.nativeTouchScroll ? jq(id).html() : jq(id).get(0).childNodes[0].innerHTML + '', true);
                    jq('#modalContainer').append("<a href='javascript:;' onclick='$.ui.hideModal();' class='closebutton modalbutton'></a>");
                    this.modalWindow.style.display = "block";
                    
                    button = null;
                    content = null;
                    this.scrollingDivs['modal_container'].enable(that.resetScrollers);
                    this.scrollToTop('modal');
                     jq("#modalContainer").data("panel",id);
                }
            } catch (e) {
                console.log("Error with modal - " + e, this.modalWindow);
            }
        },
        /**
         * Hide the modal window and remove the content
           ```
           $.ui.hideModal("#myDiv");
           ```
         * @title $.ui.hideModal();
         */
        hideModal: function() {
            $("#modalContainer").html("", true);
            jq("#jQui_modal").hide()
            
            this.scrollingDivs['modal_container'].disable();

            var tmp=$($("#modalContainer").data("panel"));
            var fnc = tmp.data("unload");
            if (typeof fnc == "string" && window[fnc]) {
                window[fnc](tmp.get(0));
            }
            tmp.trigger("unloadpanel");

        },

        /**
         * Update the HTML in a content panel
           ```
           $.ui.updateContentDiv("#myDiv","This is the new content");
           ```
         * @param {String,Object} panel
         * @param {String} html to update with
         * @title $.ui.updateContentDiv(id,content);
         */
        updateContentDiv: function(id, content) {
            id="#"+id.replace("#","");
            var el = jq(id).get(0);
            if (!el)
                return;
            
            var newDiv = document.createElement("div");
            newDiv.innerHTML = content;
            if ($(newDiv).children('.panel') && $(newDiv).children('.panel').length > 0)
                newDiv = $(newDiv).children('.panel').get();
            
            
            
            if (el.getAttribute("js-scrolling") && el.getAttribute("js-scrolling").toLowerCase() == "yes") {
                $.cleanUpContent(el.childNodes[0], false, true);
                el.childNodes[0].innerHTML = content;
            } else {
                $.cleanUpContent(el, false, true);
                el.innerHTML = content;
            }
            if ($(newDiv).title)
                el.title = $(newDiv).title;
        },
        /**
         * Dynamically create a new panel on the fly.  It wires events, creates the scroller, applies Android fixes, etc.
           ```
           $.ui.addContentDiv("myDiv","This is the new content","Title");
           ```
         * @param {String|Object} Element to add
         * @param {String} Content
         * @param {String} title
         * @title $.ui.addContentDiv(id,content,title);
         */
        addContentDiv: function(el, content, title, refresh, refreshFunc) {
            el = typeof (el) !== "string" ? el : el.indexOf("#") == -1 ? "#" + el : el;
            var myEl = jq(el).get(0);
            if (!myEl) {
                var newDiv = document.createElement("div");
                newDiv.innerHTML = content;
                if ($(newDiv).children('.panel') && $(newDiv).children('.panel').length > 0)
                    newDiv = $(newDiv).children('.panel').get();
                
                if (!newDiv.title && title)
                    newDiv.title = title;
                var newId = (newDiv.id) ? newDiv.id : el.replace("#",""); //figure out the new id - either the id from the loaded div.panel or the crc32 hash
                newDiv.id = newId;
                if (newDiv.id != el)
                    newDiv.setAttribute("data-crc", el.replace("#",""));
            } else {
                newDiv = myEl;
            }
            newDiv.className = "panel";
            var that = this;
            
            myEl = null;
            that.addDivAndScroll(newDiv, refresh, refreshFunc);
            newDiv = null;
            return newId;
        },
        /**
         *  Takes a div and sets up scrolling for it..
           ```
           $.ui.addDivAndScroll(object);
           ```
         * @param {Object} Element
         * @title $.ui.addDivAndScroll(element);
         * @api private
         */
        addDivAndScroll: function(tmp, refreshPull, refreshFunc, container) {
            var jsScroll = false;
            var overflowStyle = tmp.style.overflow;
            var hasScroll = overflowStyle != 'hidden' && overflowStyle != 'visible';
            
            container = container || this.content;
            //sets up scroll when required and not supported
            if (!$.feat.nativeTouchScroll && hasScroll)
                tmp.setAttribute("js-scrolling", "yes");
            
            if (tmp.getAttribute("js-scrolling") && tmp.getAttribute("js-scrolling").toLowerCase() == "yes") {
                jsScroll = true;
                hasScroll = true;
            }
            
            
            
            if (tmp.getAttribute("scrolling") && tmp.getAttribute("scrolling") == "no") {
                hasScroll = false;
                jsScroll = false;
            }
            
            if (!jsScroll) {
                container.appendChild(tmp);
                var scrollEl = tmp;
                tmp.style['-webkit-overflow-scrolling'] = "none"
            } else {
                //WE need to clone the div so we keep events
                var scrollEl = tmp.cloneNode(false);
                
                
                tmp.title = null;
                tmp.id = null;
                tmp.removeAttribute("data-footer");
                tmp.removeAttribute("data-nav");
                tmp.removeAttribute("data-header");
                tmp.removeAttribute("selected");
                tmp.removeAttribute("data-load");
                tmp.removeAttribute("data-unload");
                tmp.removeAttribute("data-tab");
                jq(tmp).replaceClass("panel", "jqmScrollPanel");
                
                scrollEl.appendChild(tmp);
                
                container.appendChild(scrollEl);
                
                if (this.selectBox !== false)
                    this.selectBox.getOldSelects(scrollEl.id);
                if (this.passwordBox !== false)
                    this.passwordBox.getOldPasswords(scrollEl.id);
            
            }
            
            if (hasScroll) {
                this.scrollingDivs[scrollEl.id] = (jq(tmp).scroller({
                    scrollBars: true,
                    verticalScroll: true,
                    horizontalScroll: false,
                    vScrollCSS: "jqmScrollbar",
                    refresh: refreshPull,
                    useJsScroll: jsScroll,
                    noParent: !jsScroll,
                    autoEnable: false //dont enable the events unnecessarilly
                }));
                //backwards compatibility
                if (refreshFunc)
                    $.bind(this.scrollingDivs[scrollEl.id], 'refresh-release', function(trigger) {
                        if (trigger)
                            refreshFunc()
                    });
            }
            
            tmp = null;
            scrollEl = null;
        },

        /**
         *  Scrolls a panel to the top
           ```
           $.ui.scrollToTop(id);
           ```
         * @param {String} id without hash
         * @title $.ui.scrollToTop(id);
         */
        scrollToTop: function(id) {
            if (this.scrollingDivs[id]) {
                this.scrollingDivs[id].scrollToTop();
            }
        },
        scrollToBottom: function(id) {
            if (this.scrollingDivs[id]) {
                this.scrollingDivs[id].scrollToBottom();
            }
        },

        /**
         *  This is used when a transition fires to do helper events.  We check to see if we need to change the nav menus, footer, and fire
         * the load/onload functions for panels
           ```
           $.ui.parsePanelFunctions(currentDiv,oldDiv);
           ```
         * @param {Object} current div
         * @param {Object} old div
         * @title $.ui.parsePanelFunctions(currentDiv,oldDiv);
         * @api private
         */
        parsePanelFunctions: function(what, oldDiv) {
            //check for custom footer
            var that = this;
            var hasFooter = what.getAttribute("data-footer");
            var hasHeader = what.getAttribute("data-header");

            //$asap removed since animations are fixed in css3animate
            if (hasFooter && hasFooter.toLowerCase() == "none") {
                that.toggleNavMenu(false);
            } else {
                that.toggleNavMenu(true);
            }
            if (hasFooter && that.customFooter != hasFooter) {
                that.customFooter = hasFooter;
                that.updateNavbarElements(jq("#" + hasFooter).children());
            } else if (hasFooter != that.customFooter) {
                if (that.customFooter)
                    that.updateNavbarElements(that.defaultFooter);
                that.customFooter = false;
            }
            if (hasHeader && that.customHeader != hasHeader) {
                that.customHeader = hasHeader;
                that.updateHeaderElements(jq("#" + hasHeader).children());
            } else if (hasHeader != that.customHeader) {
                if (that.customHeader) {
                    that.updateHeaderElements(that.defaultHeader);
                    that.setTitle(that.activeDiv.title);
                }
                that.customHeader = false;
            }
            if (what.getAttribute("data-tab")) { //Allow the dev to force the footer menu
                jq("#navbar a").removeClass("selected");
                jq("#" + what.getAttribute("data-tab")).addClass("selected");
            }

            //Load inline footers
            var inlineFooters = $(what).find("footer");
            if (inlineFooters.length > 0) {
                that.customFooter = what.id;
                that.updateNavbarElements(inlineFooters.children());
            }
            //load inline headers
            var inlineHeader = $(what).find("header");
            
            
            if (inlineHeader.length > 0) {
                that.customHeader = what.id;
                that.updateHeaderElements(inlineHeader.children());
            }
            //check if the panel has a footer
            if (what.getAttribute("data-tab")) { //Allow the dev to force the footer menu
                jq("#navbar a").removeClass("selected");
                jq("#navbar #" + what.getAttribute("data-tab")).addClass("selected");
            }
            
            var hasMenu = what.getAttribute("data-nav");
            if (hasMenu && this.customMenu != hasMenu) {
                this.customMenu = hasMenu;
                this.updateSideMenu(jq("#" + hasMenu).children());
            } else if (hasMenu != this.customMenu) {
                if (this.customMenu) {
                    this.updateSideMenu(this.defaultMenu);
                }
                this.customMenu = false;
            }
            
            
            
            if (oldDiv) {
                fnc = oldDiv.getAttribute("data-unload");
                if (typeof fnc == "string" && window[fnc]) {
                    window[fnc](oldDiv);
                }
                $(oldDiv).trigger("unloadpanel");
            }
            var fnc = what.getAttribute("data-load");
            if (typeof fnc == "string" && window[fnc]) {
                window[fnc](what);
            }
            $(what).trigger("loadpanel");
            if (this.isSideMenuOn()) {
                this.toggleSideMenu(false);
            }
        },
        /**
         * Helper function that parses a contents html for any script tags and either adds them or executes the code
         * @api private
         */
        parseScriptTags: function(div) {
            if (!div)
                return;
            $.parseJS(div);
        },
        /**
         * This is called to initiate a transition or load content via ajax.
         * We can pass in a hash+id or URL and then we parse the panel for additional functions
           ```
           $.ui.loadContent("#main",false,false,"up");
           ```
         * @param {String} target
         * @param {Boolean} newtab (resets history)
         * @param {Boolean} go back (initiate the back click)
         * @param {String} transition
         * @title $.ui.loadContent(target,newTab,goBack,transition);
         * @api public
         */
        loadContent: function(target, newTab, back, transition, anchor) {
            
            if (this.doingTransition) {
                var that = this;
                this.loadContentQueue.push([target, newTab, back, transition, anchor]);
                return
            }
            if (target.length === 0)
                return;
            
            what = null;
            var that = this;
            var loadAjax = true;
            anchor = anchor || document.createElement("a"); //Hack to allow passing in no anchor
            if (target.indexOf("#") == -1) {
                var urlHash = "url" + crc32(target); //Ajax urls
                var crcCheck = jq("div.panel[data-crc='" + urlHash + "']");
                if (jq("#" + target).length > 0) {
                    loadAjax = false;
                } 
                else if (crcCheck.length > 0) {
                    loadAjax = false;
                    if (anchor.getAttribute("data-refresh-ajax") === 'true' || (anchor.refresh && anchor.refresh === true || this.isAjaxApp)) {
                        loadAjax = true;
                    }
                    else {
                        target = "#" + crcCheck.get(0).id;
                    }
                } else if (jq("#" + urlHash).length > 0) {

                    //ajax div already exists.  Let's see if we should be refreshing it.
                    loadAjax = false;
                    if (anchor.getAttribute("data-refresh-ajax") === 'true' || (anchor.refresh && anchor.refresh === true || this.isAjaxApp)) {
                        loadAjax = true;
                    } else
                        target = "#" + urlHash;
                }
            }
            if (target.indexOf("#") == -1 && loadAjax) {
                this.loadAjax(target, newTab, back, transition, anchor);
            } else {
                this.loadDiv(target, newTab, back, transition);
            }
        },
        /**
         * This is called internally by loadContent.  Here we are loading a div instead of an Ajax link
           ```
           $.ui.loadDiv("#main",false,false,"up");
           ```
         * @param {String} target
         * @param {Boolean} newtab (resets history)
         * @param {Boolean} go back (initiate the back click)
         * @param {String} transition
         * @title $.ui.loadDiv(target,newTab,goBack,transition);
         * @api private
         */
        loadDiv: function(target, newTab, back, transition) {
            // load a div
            var that=this;
            what = target.replace("#", "");
            
            var slashIndex = what.indexOf('/');
            var hashLink = "";
            if (slashIndex != -1) {
                // Ignore everything after the slash for loading
                hashLink = what.substr(slashIndex);
                what = what.substr(0, slashIndex);
            }
            
            what = jq("#" + what).get(0);
            
            if (!what)
                return console.log ("Target: " + target + " was not found");
            if (what == this.activeDiv && !back) {
                //toggle the menu if applicable
                if (this.isSideMenuOn())
                    this.toggleSideMenu(false);
                return;
            }
            this.transitionType = transition;
            var oldDiv = this.activeDiv;
            var currWhat = what;
            
            if (what.getAttribute("data-modal") == "true" || what.getAttribute("modal") == "true") {
                var fnc = what.getAttribute("data-load");
                if (typeof fnc == "string" && window[fnc]) {
                    window[fnc](what);
                }
                $(what).trigger("loadpanel");
                return this.showModal(what.id);
            }
                        
            
          
            
            if (oldDiv == currWhat) //prevent it from going to itself
                return;
            
            if (newTab) {
                this.clearHistory();
                this.pushHistory("#" + this.firstDiv.id, what.id, transition, hashLink);
            } else if (!back) {
                this.pushHistory(previousTarget, what.id, transition, hashLink);
            }
            
            
            previousTarget = '#' + what.id + hashLink;
            
            
            this.doingTransition = true;

            oldDiv.style.display="block";
            currWhat.style.display="block";
            
            this.runTransition(transition, oldDiv, currWhat, back);              
            
            
            //Let's check if it has a function to run to update the data
            this.parsePanelFunctions(what, oldDiv);
            //Need to call after parsePanelFunctions, since new headers can override
            this.loadContentData(what, newTab, back, transition);
            var that=this;
            setTimeout(function(){
                if(that.scrollingDivs[oldDiv.id]) {
                    that.scrollingDivs[oldDiv.id].disable();
                }
            },200);
        
        },
        /**
         * This is called internally by loadDiv.  This sets up the back button in the header and scroller for the panel
           ```
           $.ui.loadContentData("#main",false,false,"up");
           ```
         * @param {String} target
         * @param {Boolean} newtab (resets history)
         * @param {Boolean} go back (initiate the back click)
         * @param {String} transition
         * @title $.ui.loadDiv(target,newTab,goBack,transition);
         * @api private
         */
        loadContentData: function(what, newTab, back, transition) {
            if (back) {
                if (this.history.length > 0) {
                    var val = this.history[this.history.length - 1];
                    var slashIndex = val.target.indexOf('/');
                    if (slashIndex != -1) {
                        var prevId = val.target.substr(0, slashIndex);
                    } else
                        var prevId = val.target;
                    var el = jq(prevId).get(0);
                    //make sure panel is there
                    if (el)
                        this.setBackButtonText(el.title);
                    else
                        this.setBackButtonText("Back");
                }
            } else if (this.activeDiv.title)
                this.setBackButtonText(this.activeDiv.title)
            else
                this.setBackButtonText("Back");
            if (what.title) {
                this.setTitle(what.title);
            }
            if (newTab) {
                this.setBackButtonText(this.firstDiv.title)
            }
            
            if (this.history.length == 0) {
                this.setBackButtonVisibility(false);
                this.history = [];
            } else if (this.showBackbutton)
                this.setBackButtonVisibility(true);
            this.activeDiv = what;
            if (this.scrollingDivs[this.activeDiv.id]) {
                this.scrollingDivs[this.activeDiv.id].enable(this.resetScrollers);
            }
        },
        /**
         * This is called internally by loadContent.  Here we are using Ajax to fetch the data
           ```
           $.ui.loadDiv("page.html",false,false,"up");
           ```
         * @param {String} target
         * @param {Boolean} newtab (resets history)
         * @param {Boolean} go back (initiate the back click)
         * @param {String} transition
         * @title $.ui.loadDiv(target,newTab,goBack,transition);
         * @api private
         */
        loadAjax: function(target, newTab, back, transition, anchor) {
            // XML Request
            if (this.activeDiv.id == "jQui_ajax" && target == this.ajaxUrl)
                return;
            var urlHash = "url" + crc32(target); //Ajax urls
            var that = this;
            if (target.indexOf("http") == -1)
                target = AppMobi.webRoot + target;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    this.doingTransition = false;
                    
                    var doReturn = false;

                    //Here we check to see if we are retaining the div, if so update it
                    if (jq("#" + urlHash).length > 0) {
                        that.updateContentDiv(urlHash, xmlhttp.responseText);
                        jq("#" + urlHash).get(0).title = anchor.title ? anchor.title : target;
                    } else if (anchor.getAttribute("data-persist-ajax") || that.isAjaxApp) {
                        
                        var refresh = (anchor.getAttribute("data-pull-scroller") === 'true') ? true : false;
                        refreshFunction = refresh ? 
                        function() {
                            anchor.refresh = true;
                            that.loadContent(target, newTab, back, transition, anchor);
                            anchor.refresh = false;
                        } : null;
                        //that.addContentDiv(urlHash, xmlhttp.responseText, refresh, refreshFunction);
                        urlHash = that.addContentDiv(urlHash, xmlhttp.responseText, anchor.title ? anchor.title : target, refresh, refreshFunction);
                    } else {
                        that.updateContentDiv("jQui_ajax", xmlhttp.responseText);
                        jq("#jQui_ajax").get(0).title = anchor.title ? anchor.title : target;
                        that.loadContent("#jQui_ajax", newTab, back);
                        doReturn = true;
                    }
                    //Let's load the content now.
                    //We need to check for any script tags and handle them
                    var div = document.createElement("div");
                    div.innerHTML = xmlhttp.responseText;
                    that.parseScriptTags(div);

                    if (doReturn)
                    {
                         if (that.showLoading)
                            that.hideMask();
                        return;
                    }
                    
                    that.loadContent("#" + urlHash);
                    if (that.showLoading)
                       that.hideMask();
                    return null;
                }
            };
            ajaxUrl = target;
            var newtarget = this.useAjaxCacheBuster ? target + (target.split('?')[1] ? '&' : '?') + "cache=" + Math.random() * 10000000000000000 : target;
            xmlhttp.open("GET", newtarget, true);
            xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xmlhttp.send();
            // show Ajax Mask
            if (this.showLoading)
                this.showMask();
        },
        /**
         * This executes the transition for the panel
            ```
            $.ui.runTransition(transition,oldDiv,currDiv,back)
            ```
         * @api private
         * @title $.ui.runTransition(transition,oldDiv,currDiv,back)
         */
        runTransition: function(transition, oldDiv, currWhat, back) {
            if (!this.availableTransitions[transition])
                transition = 'default';
            this.availableTransitions[transition].call(this, oldDiv, currWhat, back);
        },

        /**
         * This is callled when you want to launch jqUi.  If autoLaunch is set to true, it gets called on DOMContentLoaded.
         * If autoLaunch is set to false, you can manually invoke it.
           ```
           $.ui.autoLaunch=false;
           $.ui.launch();
           ```
         * @title $.ui.launch();
         */
        launch: function() {
            
            if (this.hasLaunched == false || this.launchCompleted) {
                this.hasLaunched = true;
                return;
            }
            
            var that = this;
            this.isAppMobi = (window.AppMobi && typeof (AppMobi) == "object" && AppMobi.app !== undefined) ? true : false;
            this.viewportContainer = jq("#jQUi");
            this.navbar = jq("#navbar").get(0);
            this.content = jq("#content").get(0);
            ;
            this.header = jq("#header").get(0);
            ;
            this.menu = jq("#menu").get(0);
            ;
            //set anchor click handler for UI
            this.viewportContainer[0].addEventListener('click', function(e) {
                var theTarget = e.target;
                checkAnchorClick(e, theTarget);
            }, false);


            //enter-edit scroll paddings fix
            //focus scroll adjust fix
            var enterEditEl = null;
            //on enter-edit keep a reference of the actioned element
            $.bind($.touchLayer, 'enter-edit', function(el) {
                enterEditEl = el;
            });
            //enter-edit-reshape panel padding and scroll adjust
            $.bind($.touchLayer, 'enter-edit-reshape', function() {
                //onReshape UI fixes
                //check if focused element is within active panel
                var jQel = $(enterEditEl);
                var jQactive = jQel.closest(that.activeDiv);
                if (jQactive && jQactive.size() > 0) {
                    if ($.os.ios || $.os.chrome) {
                        var paddingTop, paddingBottom;
                        if (document.body.scrollTop) {
                            paddingTop = document.body.scrollTop - jQactive.offset().top;
                        } else {
                            paddingTop = 0;
                        }
                        //not exact, can be a little above the actual value
                        //but we haven't found an accurate way to measure it and this is the best so far
                        paddingBottom = jQactive.offset().bottom - jQel.offset().bottom;
                        that.scrollingDivs[that.activeDiv.id].setPaddings(paddingTop, paddingBottom);
                    
                    } else if ($.os.android || $.os.blackberry) {
                        var elPos = jQel.offset();
                        var containerPos = jQactive.offset();
                        if (elPos.bottom > containerPos.bottom && elPos.height < containerPos.height) {
                            //apply fix
                            that.scrollingDivs[that.activeDiv.id].scrollToItem(jQel, 'bottom');
                        }
                    }
                }
            });
            if ($.os.ios) {
                $.bind($.touchLayer, 'exit-edit-reshape', function() {
                    that.scrollingDivs[that.activeDiv.id].setPaddings(0, 0);
                });
            }

            //elements setup
            if (!this.navbar) {
                this.navbar = document.createElement("div");
                this.navbar.id = "navbar";
                this.navbar.style.cssText = "display:none";
                this.viewportContainer.append(this.navbar);
            }
            if (!this.header) {
                this.header = document.createElement("div");
                this.header.id = "header";
                this.viewportContainer.prepend(this.header);
            }
            if (!this.menu) {
                this.menu = document.createElement("div");
                this.menu.id = "menu";
                //this.menu.style.overflow = "hidden";
                this.menu.innerHTML = '<div id="menu_scroller"></div>';
                this.viewportContainer.append(this.menu);
                this.menu.style.overflow = "hidden";
                this.scrollingDivs["menu_scroller"] = jq("#menu_scroller").scroller({
                    scrollBars: true,
                    verticalScroll: true,
                    vScrollCSS: "jqmScrollbar",
                    useJsScroll: !$.feat.nativeTouchScroll,
                    noParent: $.feat.nativeTouchScroll
                });
                if ($.feat.nativeTouchScroll)
                    $("#menu_scroller").css("height", "100%");
            }
            
            if (!this.content) {
                this.content = document.createElement("div");
                this.content.id = "content";
                this.viewportContainer.append(this.content);
            }

            //insert backbutton (should optionally be left to developer..)
            this.header.innerHTML = '<a id="backButton"  href="javascript:;"></a> <h1 id="pageTitle"></h1>' + header.innerHTML;
            this.backButton = $("#header #backButton").get(0);
            this.backButton.className = "button";
            jq(document).on("click", "#header #backButton", function() {
                that.goBack();
            });
            this.backButton.style.visibility = "hidden";

            //page title (should optionally be left to developer..)
            this.titleBar = $("#header #pageTitle").get(0);

            //setup ajax mask
            this.addContentDiv("jQui_ajax", "");
            var maskDiv = document.createElement("div");
            maskDiv.id = "jQui_mask";
            maskDiv.className = "ui-loader";
            maskDiv.innerHTML = "<span class='ui-icon ui-icon-loading spin'></span><h1>Loading Content</h1>";
            maskDiv.style.zIndex = 20000;
            maskDiv.style.display = "none";
            document.body.appendChild(maskDiv);
            //setup modalDiv
            var modalDiv = document.createElement("div");
            modalDiv.id = "jQui_modal";
            this.viewportContainer.prepend(modalDiv);
            modalDiv.appendChild(jq("<div id='modalContainer'></div>").get());
            this.scrollingDivs['modal_container'] = jq("#modalContainer").scroller({
                scrollBars: true,
                vertical: true,
                vScrollCSS: "jqmScrollbar",
                noParent: true
            });
            
            this.modalWindow = modalDiv;
            //get first div, defer
            var defer = {};
            var contentDivs = this.viewportContainer.get().querySelectorAll(".panel");
            for (var i = 0; i < contentDivs.length; i++) {
                var el = contentDivs[i];
                var tmp = el;
                var id;
                var prevSibling=el.previousSibling;
                if (el.parentNode && el.parentNode.id != "content") {

                    el.parentNode.removeChild(el);
                    var id = el.id;
                    if (tmp.getAttribute("selected"))
                        this.firstDiv = jq("#" + id).get(0);
                    this.addDivAndScroll(tmp);
                    jq("#"+id).insertAfter(prevSibling);
                } else if (!el.parsedContent) {
                    el.parsedContent = 1;
                    el.parentNode.removeChild(el);
                    var id = el.id;
                    if (tmp.getAttribute("selected"))
                        this.firstDiv = jq("#" + id).get(0);
                    this.addDivAndScroll(tmp);
                    jq("#"+id).insertAfter(prevSibling);
                }
                if (el.getAttribute("data-defer")) {
                    defer[id] = el.getAttribute("data-defer");
                }
                if (!this.firstDiv)
                    this.firstDiv = $("#" + id).get(0);
                
                el = null;
            }
            contentDivs = null;
            var loadingDefer = false;
            var toLoad = Object.keys(defer).length;
            if (toLoad > 0) {
                loadingDefer = true;
                var loaded = 0;
                for (var j in defer) {
                    (function(j) {
                        jq.ajax({
                            url: AppMobi.webRoot + defer[j],
                            success: function(data) {
                                if (data.length == 0)
                                    return;
                                $.ui.updateContentDiv(j, data);
                                that.parseScriptTags(jq(j).get());
                                loaded++;
                                if (loaded >= toLoad) {
                                    $(document).trigger("defer:loaded");
                                    loadingDefer = false;
                                
                                }
                            },
                            error: function(msg) {
                                //still trigger the file as being loaded to not block jq.ui.ready
                                console.log("Error with deferred load " + AppMobi.webRoot + defer[j])
                                loaded++;
                                if (loaded >= toLoad) {
                                    $(document).trigger("defer:loaded");
                                    loadingDefer = false;
                                }
                            }
                        });
                    })(j);
                }
            }
            if (this.firstDiv) {
                
                var that = this;
                // Fix a bug in iOS where translate3d makes the content blurry
                this.activeDiv = this.firstDiv;
                
                if (this.scrollingDivs[this.activeDiv.id]) {
                    this.scrollingDivs[this.activeDiv.id].enable();
                }

                //window.setTimeout(function() {
                var loadFirstDiv = function() {
                    
                    
                    if (jq("#navbar a").length > 0) {
                        jq("#navbar a").data("ignore-pressed", "true").data("resetHistory", "true");
                        that.defaultFooter = jq("#navbar").children().clone();
                        that.updateNavbarElements(that.defaultFooter);
                    }
                    //setup initial menu
                    var firstMenu = jq("nav").get();
                    if (firstMenu) {
                        that.defaultMenu = jq(firstMenu).children().clone();
                        that.updateSideMenu(that.defaultMenu);
                    }
                    //get default header
                    that.defaultHeader = jq("#header").children().clone();
                    //
                    jq("#navbar").on("click", "a", function(e) {
                        jq("#navbar a").not(this).removeClass("selected");
                            $(e.target).addClass("selected");
                    });


                    //go to activeDiv
                    var firstPanelId = that.getPanelId(defaultHash);
                    //that.history=[{target:'#'+that.firstDiv.id}];   //set the first id as origin of path
                    if (firstPanelId.length > 0 && that.loadDefaultHash && firstPanelId != ("#" + that.firstDiv.id)&&$(firstPanelId).length>0) {
                        that.loadContent(defaultHash, true, false, 'none'); //load the active page as a newTab with no transition
                    } else {
                        previousTarget = "#" + that.firstDiv.id;
                        that.loadContentData(that.firstDiv); //load the info off the first panel
                        that.parsePanelFunctions(that.firstDiv);
                        
                        that.firstDiv.style.display = "block";
                        $("#header #backButton").css("visibility", "hidden");
                        if (that.firstDiv.getAttribute("data-modal") == "true" || that.firstDiv.getAttribute("modal") == "true") {            
                            that.showModal(that.firstDiv.id);
                        }
                    }
                    
                    that.launchCompleted = true;
                    if (jq("nav").length > 0) {
                        jq("#jQUi #header").addClass("hasMenu off");
                        jq("#jQUi #content").addClass("hasMenu off");
                        jq("#jQUi #navbar").addClass("hasMenu off");
                    }
                    //trigger ui ready
                    jq(document).trigger("jq.ui.ready");
                    //remove splashscreen

                    // Run after the first div animation has been triggered - avoids flashing
                    jq("#splashscreen").remove();
                };
                if (loadingDefer) {
                    $(document).one("defer:loaded", loadFirstDiv);
                } else
                    loadFirstDiv();
            }
            var that = this;
            $.bind($.ui, "content-loaded", function() {
                if (that.loadContentQueue.length > 0) {
                    var tmp = that.loadContentQueue.splice(0, 1)[0];
                    that.loadContent(tmp[0], tmp[1], tmp[2], tmp[3], tmp[4]);
                }
            });
            if (window.navigator.standalone) {
                this.blockPageScroll();
            }
            this.topClickScroll();
           
        },
        /**
         * This simulates the click and scroll to top of browsers
         */
        topClickScroll:function(){
             document.getElementById("header").addEventListener("click",function(e){
                if(e.clientY<=15&&e.target.nodeName.toLowerCase()=="h1") //hack - the title spans the whole width of the header
                    $.ui.scrollingDivs[$.ui.activeDiv.id].scrollToTop("100");
            });
        
        },
        /**
         * This blocks the page from scrolling/panning.  Usefull for native apps
         */
        blockPageScroll: function() {
            jq("#jQUi #header").bind("touchmove", function(e) {
                e.preventDefault();
            });
        },
        /**
         * This is the default transition.  It simply shows the new panel and hides the old
         */
        noTransition: function(oldDiv, currDiv, back) {
            currDiv.style.display = "block";
            oldDiv.style.display = "block";
            var that = this;
            that.clearAnimations(currDiv);
            that.css3animate(oldDiv, {
                x: "0%",
                y: 0
            });
            that.finishTransition(oldDiv);
            currDiv.style.zIndex = 2;
            oldDiv.style.zIndex = 1;
        },
        /**
         * This must be called at the end of every transition to hide the old div and reset the doingTransition variable
         *
         * @param {Object} Div that transitioned out
         * @title $.ui.finishTransition(oldDiv)
         */
        finishTransition: function(oldDiv, currDiv) {
            oldDiv.style.display = 'none';
            this.doingTransition = false;
            if (currDiv)
                this.clearAnimations(currDiv);
            if (oldDiv)
                this.clearAnimations(oldDiv);
            $.trigger(this, "content-loaded");
        },

        /**
         * This must be called at the end of every transition to remove all transforms and transitions attached to the inView object (performance + native scroll)
         *
         * @param {Object} Div that transitioned out
         * @title $.ui.finishTransition(oldDiv)
         */
        clearAnimations: function(inViewDiv) {
            inViewDiv.style[$.feat.cssPrefix + 'Transform'] = "none";
            inViewDiv.style[$.feat.cssPrefix + 'Transition'] = "none";
        }

    /**
         * END
         * @api private
         */
    };


    //lookup for a clicked anchor recursively and fire UI own actions when applicable 
    var checkAnchorClick = function(e, theTarget) {
        
        
        if (theTarget == (jQUi)) {
            return;
        }

        //this technique fails when considerable content exists inside anchor, should be recursive ?
        if (theTarget.tagName.toLowerCase() != "a" && theTarget.parentNode)
            return checkAnchorClick(e, theTarget.parentNode); //let's try the parent (recursive)
        //anchors
        if (theTarget.tagName !== "undefined" && theTarget.tagName.toLowerCase() == "a") {
            
            var custom = (typeof jq.ui.customClickHandler == "function") ? jq.ui.customClickHandler : false;
            if (custom !== false) {
                if(jq.ui.customClickHandler(theTarget))
                   return e.preventDefault();
                
            }
            if (theTarget.href.toLowerCase().indexOf("javascript:") !== -1 || theTarget.getAttribute("data-ignore")) {
                return;
            }
            

            if (theTarget.href.indexOf("tel:") === 0)
                return false;

            //external links
            if (theTarget.hash.indexOf("#") === -1 && theTarget.target.length > 0) {
                if (theTarget.href.toLowerCase().indexOf("javascript:") != 0) {
                    if (jq.ui.isAppMobi) {
                        e.preventDefault();
                        AppMobi.device.launchExternal(theTarget.href);
                    } else if (!jq.os.desktop) {
                        e.target.target = "_blank";
                    }
                }
                return;
            }

            /* IE 10 fixes*/

            var href = theTarget.href,
            prefix = location.protocol + "//" + location.hostname+":"+location.port;
            if (href.indexOf(prefix) === 0) {
                href = href.substring(prefix.length+1);
            }
            //empty links
            if (href == "#" ||(href.indexOf("#")===href.length-1)|| (href.length == 0 && theTarget.hash.length == 0))
                return;

            //internal links
            e.preventDefault();
            var mytransition = theTarget.getAttribute("data-transition");
            var resetHistory = theTarget.getAttribute("data-resetHistory");
            resetHistory = resetHistory && resetHistory.toLowerCase() == "true" ? true : false;
            var href = theTarget.hash.length > 0 ? theTarget.hash : theTarget.href;
            jq.ui.loadContent(href, resetHistory, 0, mytransition, theTarget);
            return;
        }
    }
    
    var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D"; /* Number */
    var crc32 = function( /* String */str,  /* Number */crc) {
        if (crc == undefined)
            crc = 0;
        var n = 0; //a number between 0 and 255 
        var x = 0; //an hex number 
        crc = crc ^ (-1);
        for (var i = 0, iTop = str.length; i < iTop; i++) {
            n = (crc ^ str.charCodeAt(i)) & 0xFF;
            x = "0x" + table.substr(n * 9, 8);
            crc = (crc >>> 8) ^ x;
        }
        return crc ^ (-1);
    };
    
    
    $.ui = new ui;

})(jq);



//The following functions are utilitiy functions for jqUi within appMobi.

(function() {
    document.addEventListener("appMobi.device.ready", function() { //in AppMobi, we need to undo the height stuff since it causes issues.
        setTimeout(function() {
            document.getElementById('jQUi').style.height = "100%";
            document.body.style.height = "100%";
            document.documentElement.style.minHeight = window.innerHeight;
        }, 300);
        this.removeEventListener("appMobi.device.ready", arguments.callee);
    });

})();
(function($ui){
    
        function fadeTransition (oldDiv, currDiv, back) {
            oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this
            if (back) {
                currDiv.style.zIndex = 1;
                oldDiv.style.zIndex = 2;
                that.clearAnimations(currDiv);
                that.css3animate(oldDiv, {
                    x: "0%",
                    time: "150ms",
                    opacity: .1,
                    complete: function(canceled) {
                        if(canceled) {
                            that.finishTransition(oldDiv, currDiv);
                            return;
                        }
                        
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            opacity: 1,
                            complete: function() {
                                that.finishTransition(oldDiv);
                            }
                        
                        });
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }
                });
            } else {
                oldDiv.style.zIndex = 1;
                currDiv.style.zIndex = 2;
                currDiv.style.opacity = 0;
                that.css3animate(currDiv, {
                    x: "0%",
                    opacity: .1,
                    complete: function() {
                        that.css3animate(currDiv, {
                            x: "0%",
                            time: "150ms",
                            opacity: 1,
                            complete:function(canceled){
                                if(canceled) {
                                    that.finishTransition(oldDiv, currDiv);
                                    return;
                                }
                                
                                that.clearAnimations(currDiv);
                                that.css3animate(oldDiv, {
                                    x: "-100%",
                                    y: 0,
                                    complete: function() {
                                        that.finishTransition(oldDiv);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
        $ui.availableTransitions.fade = fadeTransition;
})($.ui);
(function($ui){
    
        function flipTransition (oldDiv, currDiv, back) {
             oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this
            if (back) {
                that.css3animate(currDiv, {
                    x: "100%",
                    scale: .8,
                    rotateY: "180deg",
                    complete: function() {
                        that.css3animate(currDiv, {
                            x: "0%",
                            scale: 1,
                            time: "150ms",
                            rotateY: "0deg",
                            complete: function(){
                                that.clearAnimations(currDiv);
                            }
                        });
                    }
                });
                that.css3animate(oldDiv, {
                    x: "100%",
                    time: "150ms",
                    scale: .8,
                    rotateY: "180deg",
                    complete: function() {
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            opacity: 1,
                            scale: 1,
                            rotateY: "0deg",
                            complete: function() {
                                that.finishTransition(oldDiv);
                            }
                        });
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }
                });
            } else {
                oldDiv.style.zIndex = 1;
                currDiv.style.zIndex = 2;
                that.css3animate(oldDiv, {
                    x: "100%",
                    time: "150ms",
                    scale: .8,
                    rotateY: "180deg",
                    complete: function() {
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            y: 0,
                            time: "1ms",
                            scale: 1,
                            rotateY: "0deg",
                            complete: function() {
                                that.finishTransition(oldDiv);
                            }
                        });
                    }
                });
                that.css3animate(currDiv, {
                    x: "100%",
                    time: "1ms",
                    scale: .8,
                    rotateY: "180deg",
                    complete: function() {
                        that.css3animate(currDiv, {
                            x: "0%",
                            time: "150ms",
                            scale: 1,
                            rotateY: "0deg",
                            complete:function(){
                                that.clearAnimations(currDiv);
                            }
                        });
                    }
                });
            }
        }
        $ui.availableTransitions.flip = flipTransition;
})($.ui);
(function($ui){
        
         function popTransition(oldDiv, currDiv, back) {
            oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this
            if (back) {
                currDiv.style.zIndex = 1;
                oldDiv.style.zIndex = 2;
                that.clearAnimations(currDiv);
                that.css3animate(oldDiv, {
                    x: "0%",
                    time: "150ms",
                    opacity: .1,
                    scale: .2,
                    origin: "-50%"+" 50%",
                    complete: function(canceled) {
                        if(canceled) {
                            that.finishTransition(oldDiv);
                            return;
                        }
                        
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            complete: function() {
                                that.finishTransition(oldDiv);
                            }
                        });
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }
                });
            } else {
                oldDiv.style.zIndex = 1;
                currDiv.style.zIndex = 2;
                that.css3animate(currDiv, {
                    x: "0%",
                    y: "0%",
                    scale: .2,
                    origin: "-50%"+" 50%",
                    opacity: .1,
                    complete: function() {
                        that.css3animate(currDiv, {
                            x: "0%",
                            time: "150ms",
                            scale: 1,
                            opacity: 1,
                            origin: "0%"+" 0%",
                            complete: function(canceled){
                                if(canceled) {
                                    that.finishTransition(oldDiv, currDiv);
                                    return;
                                }
                                
                                that.clearAnimations(currDiv);
                                that.css3animate(oldDiv, {
                                    x: "100%",
                                    y: 0,
                                    complete: function() {
                                        that.finishTransition(oldDiv);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
        $ui.availableTransitions.pop = popTransition;
})($.ui);
(function($ui){
    
        /**
         * Initiate a sliding transition.  This is a sample to show how transitions are implemented.  These are registered in $ui.availableTransitions and take in three parameters.
         * @param {Object} previous panel
         * @param {Object} current panel
         * @param {Boolean} go back
         * @title $ui.slideTransition(previousPanel,currentPanel,goBack);
         */
        function slideTransition(oldDiv, currDiv, back) {
          	oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this;
            if (back) {
                that.css3animate(oldDiv, {
					x:"0%",
					y:"0%",
					complete:function(){
		                that.css3animate(oldDiv, {
		                    x: "100%",
		                    time: "0ms",
		                    complete: function() {
		                        that.finishTransition(oldDiv, currDiv);
		                    }
		                }).link(currDiv, {
	                        x: "0%",
	                        time: "0ms"
	                    });
					}
				}).link(currDiv, {
					x:"-100%",
					y:"0%"
				});
            } else {
                that.css3animate(oldDiv, {
					x:"0%",
					y:"0%",
					complete:function(){
		                that.css3animate(oldDiv, {
		                    x: "-100%",
		                    time: "0ms",
		                    complete: function() {
		                        that.finishTransition(oldDiv, currDiv);
		                    }
		                }).link(currDiv, {
	                        x: "0%",
	                        time: "0ms"
	                    });
					}
				}).link(currDiv, {
					x:"100%",
					y:"0%"
				});
            }
        }
        $ui.availableTransitions.slide = slideTransition;
        $ui.availableTransitions['default'] = slideTransition;
})($.ui);
(function($ui){
    
        function slideDownTransition (oldDiv, currDiv, back) {
            oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this
            if (back) {
                currDiv.style.zIndex = 1;
                oldDiv.style.zIndex = 2;
                that.clearAnimations(currDiv);
                that.css3animate(oldDiv, {
                    y: "-100%",
                    x: "0%",
                    time: "150ms",
                    complete: function(canceled) {
                        if(canceled) {
                            that.finishTransition(oldDiv, currDiv);
                            return;
                        }
                        
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            y: 0,
                            complete: function() {
                                that.finishTransition(oldDiv);
                            
                            }
                        });
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }
                });
            } else {
                oldDiv.style.zIndex = 1;
                currDiv.style.zIndex = 2;
                that.css3animate(currDiv, {
                    y: "-100%",
                    x: "0%",
                    complete: function() {
                        that.css3animate(currDiv, {
                            y: "0%",
                            x: "0%",
                            time: "150ms",
                            complete: function(canceled){
                                if(canceled) {
                                    that.finishTransition(oldDiv, currDiv);
                                    return;
                                }
                                
                                that.clearAnimations(currDiv);
                                that.css3animate(oldDiv, {
                                    x: "-100%",
                                    y: 0,
                                    complete: function() {
                                        that.finishTransition(oldDiv);
                                    }
                                });
                                
                            }
                        });
                    }
                });
            }
        }
        $ui.availableTransitions.down = slideDownTransition;
})($.ui);

(function($ui){
    
        function slideUpTransition(oldDiv, currDiv, back) {
             oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this;
            if (back) {
                currDiv.style.zIndex = 1;
                oldDiv.style.zIndex = 2;
                
                that.clearAnimations(currDiv);

                that.css3animate(oldDiv, {
                    y: "100%",
                    x: "0%",
                    time: "150ms",
                    complete: function() {
                        that.finishTransition(oldDiv);
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }
                });
            } else {
                currDiv.style.zIndex = 2;
                oldDiv.style.zIndex = 1;
                that.css3animate(currDiv, {
                    y: "100%",
                    x: "0%",
                    complete: function() {
                        that.css3animate(currDiv, {
                            y: "0%",
                            x: "0%",
                            time: "150ms",
                            complete: function(canceled) {
                                if(canceled) {
                                    that.finishTransition(oldDiv, currDiv);
                                    return;
                                }
                                
                                that.clearAnimations(currDiv);
                                that.css3animate(oldDiv, {
                                    x: "-100%",
                                    y: 0,
                                    complete: function() {
                                        that.finishTransition(oldDiv);
                                    }
                                });
                                
                            }
                        });
                    }
                });
            }
        }
        $ui.availableTransitions.up = slideUpTransition;
})($.ui);



 /**
 * jq.ui - A User Interface library for creating jqMobi applications
 *
 * @copyright 2011
 * @author AppMobi
 */
(function($) {
    
    
    var hasLaunched = false;
    var startPath = window.location.pathname;
    var defaultHash = window.location.hash;
    var previousTarget = defaultHash;
    var ui = function() {
        // Init the page
        var that = this;

        //setup the menu and boot touchLayer
        jq(document).ready(function() {

            //boot touchLayer
            //create jQUi element if it still does not exist
            var jQUi = document.getElementById("jQUi");
            if (jQUi == null) {
                jQUi = document.createElement("div");
                jQUi.id = "jQUi";
                var body = document.body;
                while (body.firstChild) {
                    jQUi.appendChild(body.firstChild);
                }
                jq(document.body).prepend(jQUi);
            }
            if (jq.os.supportsTouch)
                $.touchLayer(jQUi);
        });
        
        if (window.AppMobi)
            document.addEventListener("appMobi.device.ready", function() {
                that.autoBoot();
                this.removeEventListener("appMobi.device.ready", arguments.callee);
            }, false);
        else if (document.readyState == "complete" || document.readyState == "loaded") {
            this.autoBoot();
        } else
            document.addEventListener("DOMContentLoaded", function() {
                that.autoBoot();
                this.removeEventListener("DOMContentLoaded", arguments.callee);
            }, false);
        
        if (!window.AppMobi)
            AppMobi = {}, AppMobi.webRoot = "";

        //click back event
         window.addEventListener("popstate", function() {
            var id = $.ui.getPanelId(document.location.hash);
            //make sure we allow hash changes outside jqUi
            if(id=="")
                return;
            if(document.querySelectorAll(id+".panel").length===0)
                return;
            if (id != "#" + $.ui.activeDiv.id)
                that.goBack();
        }, false);

        /**
         * Helper function to setup the transition objects
         * Custom transitions can be added via $.ui.availableTransitions
           ```
           $.ui.availableTransitions['none']=function();
           ```
         */
        
        this.availableTransitions = {};
        this.availableTransitions['default'] = this.availableTransitions['none'] = this.noTransition;
    };
    
    
    ui.prototype = {
        showLoading: true,
        loadContentQueue: [],
        isAppMobi: false,
        titlebar: "",
        navbar: "",
        header: "",
        viewportContainer: "",
        backButton: "",
        remotePages: {},
        history: [],
        homeDiv: "",
        screenWidth: "",
        content: "",
        modalWindow: "",
        customFooter: false,
        defaultFooter: "",
        defaultHeader: null,
        customMenu: false,
        defaultMenu: "",
        _readyFunc: null,
        doingTransition: false,
        passwordBox: jq.passwordBox ? new jq.passwordBox() : false,
        selectBox: jq.selectBox ? jq.selectBox : false,
        ajaxUrl: "",
        transitionType: "slide",
        scrollingDivs: [],
        firstDiv: "",
        hasLaunched: false,
        launchCompleted: false,
        activeDiv: "",
        customClickHandler: "",
        activeDiv: "",
        menuAnimation: null,
        togglingSideMenu: false,
        autoBoot: function() {
            this.hasLaunched = true;
            if (this.autoLaunch) {
                this.launch();
            }
        },
        css3animate: function(el, opts) {
            el = jq(el);
            return el.css3Animate(opts);
        },

        /**
         * this is a boolean when set to true (default) it will load that panel when the app is started
           ```
           $.ui.loadDefaultHash=false; //Never load the page from the hash when the app is started
           $.ui.loadDefaultHash=true; //Default
           ```
         *@title $.ui.loadDefaultHash
         */
        loadDefaultHash: true,
        /**
         * This is a boolean that when set to true will add "&cache=_rand_" to any ajax loaded link
           ```
           $.ui.useAjaxCacheBuster=true;
           ```
          *@title $.ui.useAjaxCacheBuster
          */
        useAjaxCacheBuster: false,
        /**
         * This is a shorthand call to the jq.actionsheet plugin.  We wire it to the jQUi div automatically
           ```
           $.ui.actionsheet("<a href='javascript:;' class='button'>Settings</a> <a href='javascript:;' class='button red'>Logout</a>")
           $.ui.actionsheet("[{
                        text: 'back',
                        cssClasses: 'red',
                        handler: function () { $.ui.goBack(); ; }
                    }, {
                        text: 'show alert 5',
                        cssClasses: 'blue',
                        handler: function () { alert("hi"); }
                    }, {
                        text: 'show alert 6',
                        cssClasses: '',
                        handler: function () { alert("goodbye"); }
                    }]");
           ```
         * @param {String,Array} links
         * @title $.ui.actionsheet()
         */
        actionsheet: function(opts) {
            return jq("#jQUi").actionsheet(opts);
        },
        /**
         * This is a wrapper to jq.popup.js plugin.  If you pass in a text string, it acts like an alert box and just gives a message
           ```
           $.ui.popup(opts);
           $.ui.popup( {
                        title:"Alert! Alert!",
                        message:"This is a test of the emergency alert system!! Don't PANIC!",
                        cancelText:"Cancel me", 
                        cancelCallback: function(){console.log("cancelled");},
                        doneText:"I'm done!",
                        doneCallback: function(){console.log("Done for!");},
                        cancelOnly:false
                      });
           $.ui.popup('Hi there');
           ```
         * @param {Object|String} options
         * @title $.ui.popup(opts)
         */
        popup: function(opts) {
            return $("#jQUi").popup(opts);
        },

        /**
         *This will throw up a mask and block the UI
         ```
         $.ui.blockUI(.9)
         ````
         * @param {Float} opacity
         * @title $.ui.blockUI(opacity)
         */
        blockUI: function(opacity) {
            $.blockUI(opacity);
        },
        /**
         *This will remove the UI mask
         ```
         $.ui.unblockUI()
         ````
         * @title $.ui.unblockUI()
         */
        unblockUI: function() {
            $.unblockUI();
        },
        /**
         * Will remove the bottom nav bar menu from your application
           ```
           $.ui.removeFooterMenu();
           ```
         * @title $.ui.removeFooterMenu
         */
        removeFooterMenu: function() {
            jq("#navbar").hide();
            jq("#content").css("bottom", "0px");
            this.showNavMenu = false;
        },
        /**
         * Boolean if you want to show the bottom nav menu.
           ```
           $.ui.showNavMenu = false;
           ```
         * @title $.ui.showNavMenu
         */
        showNavMenu: true,
        /**
         * Boolean if you want to auto launch jqUi
           ```
           $.ui.autoLaunch = false; //
         * @title $.ui.autoLaunch
         */
        autoLaunch: true,
        /**
         * Boolean if you want to show the back button
           ```
           $.ui.showBackButton = false; //
         * @title $.ui.showBackButton
         */
        showBackbutton: true,
        /**
         * @api private
         */
        backButtonText: "",
        /**
         * Boolean if you want to reset the scroller position when navigating panels.  Default is true
           ```
           $.ui.resetScrollers=false; //Do not reset the scrollers when switching panels
           ```
         * @title $.ui.resetScrollers
         */
        resetScrollers: true,
        /**
         * function to fire when jqUi is ready and completed launch
           ```
           $.ui.ready(function(){console.log('jqUi is ready');});
           ```
         * @param {Function} function to execute
         * @title $.ui.ready
         */
        ready: function(param) {
            if (this.launchCompleted)
                param();
            else
                document.addEventListener("jq.ui.ready", function(e) {
                    param();
                    this.removeEventListener('jq.ui.ready', arguments.callee);
                }, false);
        },
        /**
         * Override the back button class name
           ```
           $.ui.setBackButtonStyle('newClass');
           ```
         * @param {String} new class name
         * @title $.ui.setBackButtonStyle(class)
         */
        setBackButtonStyle: function(className) {
            jq("#backButton").get(0).className = className;
        },
        /**
         * Initiate a back transition
           ```
           $.ui.goBack()
           ```
           
         * @title $.ui.goBack()
         */
        goBack: function() {
            if (this.history.length > 0) {
                var that = this;
                var tmpEl = this.history.pop();
                $.asap(
                
                function() {
                    that.loadContent(tmpEl.target + "", 0, 1, tmpEl.transition);
                    that.transitionType = tmpEl.transition;
                    //document.location.hash=tmpEl.target;
                    that.updateHash(tmpEl.target);
                //for Android 4.0.x, we must touchLayer.hideAdressBar()
                });
            }
        },
        /**
         * Clear the history queue
           ```
           $.ui.clearHistory()
           ```
           
         * @title $.ui.clearHistory()
         */
        clearHistory: function() {
            this.history = [];
            this.setBackButtonVisibility(false)
        },

        /**
         * PushHistory
           ```
           $.ui.pushHistory(previousPage, newPage, transition, hashExtras)
           ```
           
         * @title $.ui.pushHistory()
         */
        pushHistory: function(previousPage, newPage, transition, hashExtras) {
            //push into local history
            this.history.push({
                target: previousPage,
                transition: transition
            });
            //push into the browser history
            try {
                window.history.pushState(newPage, newPage, startPath + '#' + newPage + hashExtras);
                $(window).trigger("hashchange", {
                    newUrl: startPath + '#' + newPage + hashExtras,
                    oldURL: startPath + previousPage
                });
            } catch (e) {
            }
        },


        /**
         * Updates the current window hash
         *
         * @param {String} newHash New Hash value
         * @title $.ui.updateHash(newHash)
         */
        updateHash: function(newHash) {
            newHash = newHash.indexOf('#') == -1 ? '#' + newHash : newHash; //force having the # in the begginning as a standard
            previousTarget = newHash;
            
            var previousHash = window.location.hash;
            var panelName = this.getPanelId(newHash).substring(1); //remove the #
            try {
                window.history.replaceState(panelName, panelName, startPath + newHash);
                $(window).trigger("hashchange", {
                    newUrl: startPath + newHash,
                    oldUrl: startPath + previousHash
                });
            } catch (e) {
            }
        },
        /*gets the panel name from an hash*/
        getPanelId: function(hash) {
            var firstSlash = hash.indexOf('/');
            return firstSlash == -1 ? hash : hash.substring(0, firstSlash);
        },

        /**
         * Update a badge on the selected target.  Position can be
            bl = bottom left
            tl = top left
            br = bottom right
            tr = top right (default)
           ```
           $.ui.updateBadge('#mydiv','3','bl','green');
           ```
         * @param {String} target
         * @param {String} Value
         * @param {String} [position]         
         * @param {String|Object} [color or CSS hash]         
         * @title $.ui.updateBadge(target,value,[position],[color])
         */
        updateBadge: function(target, value, position, color) {
            if (position === undefined)
                position = "";
            if (target[0] != "#")
                target = "#" + target;
            var badge = jq(target).find("span.jq-badge");
            
            if (badge.length == 0) {
                if (jq(target).css("position") != "absolute")
                    jq(target).css("position", "relative");
                badge = jq("<span class='jq-badge " + position + "'>" + value + "</span>");
                jq(target).append(badge);
            } else
                badge.html(value);
            
            
            if (jq.isObject(color)) {
                badge.css(color);
            } else if (color) {
                badge.css("background", color);
            }
            
            badge.data("ignore-pressed", "true");
        
        },
        /**
         * Removes a badge from the selected target.
           ```
           $.ui.removeBadge('#mydiv');
           ```
         * @param {String} target
         * @title $.ui.removeBadge(target)
         */
        removeBadge: function(target) {
            jq(target).find("span.jq-badge").remove();
        },
        /**
         * Toggles the bottom nav nav menu.  Force is a boolean to force show or hide.
           ```
           $.ui.toggleNavMenu();//toggle it
           $.ui.toggleNavMenu(true); //force show it
           ```
         * @param {Boolean} [force]
         * @title $.ui.toggleNavMenu([force])
         */
        toggleNavMenu: function(force) {
            if (!jq.ui.showNavMenu)
                return;
            if (jq("#navbar").css("display") != "none" && ((force !== undefined && force !== true) || force === undefined)) {
                jq("#content").css("bottom", "0px");
                jq("#navbar").hide();
            } else if (force === undefined || (force !== undefined && force === true)) {
                jq("#navbar").show();
                jq("#content").css("bottom", jq("#navbar").css("height"));
            
            }
        },
        /**
         * Toggles the top header menu.
           ```
           $.ui.toggleHeaderMenu();//toggle it
           ```
         * @param {Boolean} [force]
         * @title $.ui.toggleHeaderMenu([force])
         */
        toggleHeaderMenu: function(force) {
            if (jq("#header").css("display") != "none" && ((force !== undefined && force !== true) || force === undefined)) {
                jq("#content").css("top", "0px");
                jq("#header").hide();
            } else if (force === undefined || (force !== undefined && force === true)) {
                jq("#header").show();
                var val = numOnly(jq("#header").css("height"));
                jq("#content").css("top", val + 'px');
            }
        },
        /**
         * Toggles the side menu.  Force is a boolean to force show or hide.
           ```
           $.ui.toggleSideMenu();//toggle it
           ```
         * @param {Boolean} [force]
         * @title $.ui.toggleSideMenu([force])
         */
        toggleSideMenu: function(force, callback) {
            if (!this.isSideMenuEnabled() || this.togglingSideMenu)
                return;
            this.togglingSideMenu = true;
            
            var that = this;
            var menu = jq("#menu");
            var els = jq("#content, #menu, #header, #navbar");
            
            if (!(menu.hasClass("on") || menu.hasClass("to-on")) && ((force !== undefined && force !== false) || force === undefined)) {
                
                menu.show();
                that.css3animate(els, {
                    "removeClass": "to-off off on",
                    "addClass": "to-on",
                    complete: function(canceled) {
                        if (!canceled) {
                            that.css3animate(els, {
                                "removeClass": "to-off off to-on",
                                "addClass": "on",
                                time: 0,
                                complete: function() {
                                    that.togglingSideMenu = false;
                                    if (callback)
                                        callback(false);
                                }
                            });
                        } else {
                            that.togglingSideMenu = false;
                            if (callback)
                                callback(true);
                        }
                    }
                });
            
            } else if (force === undefined || (force !== undefined && force === false)) {
                
                
                that.css3animate(els, {
                    "removeClass": "on off to-on",
                    "addClass": "to-off",
                    complete: function(canceled) {
                        if (!canceled) {
                            that.css3animate(els, {
                                "removeClass": "to-off on to-on",
                                "addClass": "off",
                                time: 0,
                                complete: function() {
                                    menu.hide();
                                    that.togglingSideMenu = false;
                                    if (callback)
                                        callback(false);
                                }
                            });
                        } else {
                            that.togglingSideMenu = false;
                            if (callback)
                                callback(true);
                        }
                    }
                });
            }
        },
        /**
         * Disables the side menu
           ```
           $.ui.disableSideMenu();
           ```
        * @title $.ui.disableSideMenu();
        */
        disableSideMenu: function() {
            var that = this;
            var els = jq("#content, #menu, #header, #navbar");
            if (this.isSideMenuOn()) {
                this.toggleSideMenu(false, function(canceled) {
                    if (!canceled)
                        els.removeClass("hasMenu");
                });
            } else
                els.removeClass("hasMenu");
        },
        /**
         * Enables the side menu
           ```
           $.ui.enableSideMenu();
           ```
        * @title $.ui.enableSideMenu();
        */
        enableSideMenu: function() {
            var that = this;
            var els = jq("#content, #menu, #header, #navbar");
            els.addClass("hasMenu");
        },
        isSideMenuEnabled: function() {
            return jq("#content").hasClass("hasMenu");
        },
        isSideMenuOn: function() {
            var menu = jq('#menu');
            return this.isSideMenuEnabled() && (menu.hasClass("on") || menu.hasClass("to-on"));
        },

        /**
         * Updates the elements in the navbar
           ```
           $.ui.updateNavbarElements(elements);
           ```
         * @param {String|Object} Elements
         * @title $.ui.updateNavbarElements(Elements)
         */
        updateNavbarElements: function(elems) {
            var nb = jq("#navbar");
            if (elems === undefined || elems == null)
                return;
            if (typeof (elems) == "string")
                return nb.html(elems, true), null;
            nb.html("");
            for (var i = 0; i < elems.length; i++) {
                var node = elems[i].cloneNode(true);
                if (elems[i].oldhash) {
                    node.href = elems[i].oldhref;
                    node.onclick = elems[i].oldonclick;
                }
                nb.append(node);
            }
            var tmpAnchors = jq("#navbar a");
            if (tmpAnchors.length > 0)
                tmpAnchors.data("ignore-pressed", "true").data("resetHistory", "true");
        },
        /**
         * Updates the elements in the header
           ```
           $.ui.updateHeaderElements(elements);
           ```
         * @param {String|Object} Elements
         * @title $.ui.updateHeaderElement(Elements)
         */
        updateHeaderElements: function(elems) {
            var nb = jq("#header");
            if (elems === undefined || elems == null)
                return;
            if (typeof (elems) == "string")
                return nb.html(elems, true), null;
            nb.html("");
            for (var i = 0; i < elems.length; i++) {
                var node = elems[i].cloneNode(true);
                nb.append(node);
            }
        },
        /**
         * Updates the elements in the side menu
           ```
           $.ui.updateSideMenu(elements);
           ```
         * @param {String|Object} Elements
         * @title $.ui.updateSideMenu(Elements)
         */
        updateSideMenu: function(elems) {
            var that = this;
            
            var nb = jq("#menu_scroller");
            
            if (elems === undefined || elems == null)
                return;
            if (typeof (elems) == "string") {
                nb.html(elems, true)
            } 
            else {
                nb.html('');
                var close = document.createElement("a");
                close.className = "closebutton jqMenuClose";
                close.href = "javascript:;"
                close.onclick = function() {
                    that.toggleSideMenu(false);
                };
                nb.append(close);
                var tmp = document.createElement("div");
                tmp.className = "jqMenuHeader";
                tmp.innerHTML = "Menu";
                nb.append(tmp);
                for (var i = 0; i < elems.length; i++) {
                    var node = elems[i].cloneNode(true);
                    if (elems[i].oldhash) {
                        node.href = elems[i].oldhref;
                        node.onclick = elems[i].oldonclick;
                    }
                    nb.append(node);
                }
            }
            //Move the scroller to the top and hide it
            this.scrollingDivs['menu_scroller'].hideScrollbars();
            this.scrollingDivs['menu_scroller'].scrollToTop();
        },
        /**
         * Set the title of the current panel
           ```
           $.ui.setTitle("new title");
           ```
           
         * @param {String} value
         * @title $.ui.setTitle(value)
         */
        setTitle: function(val) {
            jq("#header #pageTitle").html(val);
        },
        /**
         * Override the text for the back button
           ```
           $.ui.setBackButtonText("GO...");
           ```
           
         * @param {String} value
         * @title $.ui.setBackButtonText(value)
         */
        setBackButtonText: function(text) {
            if (this.backButtonText.length > 0)
                jq("#header #backButton").html(this.backButtonText);
            else
                jq("#header #backButton").html(text);
        },
        /**
         * Toggle visibility of the back button
         */
        setBackButtonVisibility: function(show) {
            if (!show)
                jq("#header #backButton").css("visibility", "hidden");
            else
                jq("#header #backButton").css("visibility", "visible");
        },
        /**
         * Show the loading mask
           ```
           $.ui.showMask()
           $.ui.showMask(;Doing work')
           ```
           
         * @param {String} [text]
         * @title $.ui.showMask(text);
         */
        showMask: function(text) {
            if (!text)
                text = "Loading Content";
            jq("#jQui_mask>h1").html(text);
            jq("#jQui_mask").show()
        },
        /**
         * Hide the loading mask
         * @title $.ui.hideMask();
         */
        hideMask: function() {
            jq("#jQui_mask").hide()
        },
        /**
         * Load a content panel in a modal window.  We set the innerHTML so event binding will not work.
           ```
           $.ui.showModal("#myDiv");
           ```
         * @param {String|Object} panel to show
         * @title $.ui.showModal();
         */
        showModal: function(id) {
            var that = this;
            id="#"+id.replace("#","");
            try {
                if (jq(id)) {
                    jq("#modalContainer").html($.feat.nativeTouchScroll ? jq(id).html() : jq(id).get(0).childNodes[0].innerHTML + '', true);
                    jq('#modalContainer').append("<a href='javascript:;' onclick='$.ui.hideModal();' class='closebutton modalbutton'></a>");
                    this.modalWindow.style.display = "block";
                    
                    button = null;
                    content = null;
                    this.scrollingDivs['modal_container'].enable(that.resetScrollers);
                    this.scrollToTop('modal');
                     jq("#modalContainer").data("panel",id);
                }
            } catch (e) {
                console.log("Error with modal - " + e, this.modalWindow);
            }
        },
        /**
         * Hide the modal window and remove the content
           ```
           $.ui.hideModal("#myDiv");
           ```
         * @title $.ui.hideModal();
         */
        hideModal: function() {
            $("#modalContainer").html("", true);
            jq("#jQui_modal").hide()
            
            this.scrollingDivs['modal_container'].disable();

            var tmp=$($("#modalContainer").data("panel"));
            var fnc = tmp.data("unload");
            if (typeof fnc == "string" && window[fnc]) {
                window[fnc](tmp.get(0));
            }
            tmp.trigger("unloadpanel");

        },

        /**
         * Update the HTML in a content panel
           ```
           $.ui.updateContentDiv("#myDiv","This is the new content");
           ```
         * @param {String,Object} panel
         * @param {String} html to update with
         * @title $.ui.updateContentDiv(id,content);
         */
        updateContentDiv: function(id, content) {
            id="#"+id.replace("#","");
            var el = jq(id).get(0);
            if (!el)
                return;
            
            var newDiv = document.createElement("div");
            newDiv.innerHTML = content;
            if ($(newDiv).children('.panel') && $(newDiv).children('.panel').length > 0)
                newDiv = $(newDiv).children('.panel').get();
            
            
            
            if (el.getAttribute("js-scrolling") && el.getAttribute("js-scrolling").toLowerCase() == "yes") {
                $.cleanUpContent(el.childNodes[0], false, true);
                el.childNodes[0].innerHTML = content;
            } else {
                $.cleanUpContent(el, false, true);
                el.innerHTML = content;
            }
            if ($(newDiv).title)
                el.title = $(newDiv).title;
        },
        /**
         * Dynamically create a new panel on the fly.  It wires events, creates the scroller, applies Android fixes, etc.
           ```
           $.ui.addContentDiv("myDiv","This is the new content","Title");
           ```
         * @param {String|Object} Element to add
         * @param {String} Content
         * @param {String} title
         * @title $.ui.addContentDiv(id,content,title);
         */
        addContentDiv: function(el, content, title, refresh, refreshFunc) {
            el = typeof (el) !== "string" ? el : el.indexOf("#") == -1 ? "#" + el : el;
            var myEl = jq(el).get(0);
            if (!myEl) {
                var newDiv = document.createElement("div");
                newDiv.innerHTML = content;
                if ($(newDiv).children('.panel') && $(newDiv).children('.panel').length > 0)
                    newDiv = $(newDiv).children('.panel').get();
                
                if (!newDiv.title && title)
                    newDiv.title = title;
                var newId = (newDiv.id) ? newDiv.id : el.replace("#",""); //figure out the new id - either the id from the loaded div.panel or the crc32 hash
                newDiv.id = newId;
                if (newDiv.id != el)
                    newDiv.setAttribute("data-crc", el.replace("#",""));
            } else {
                newDiv = myEl;
            }
            newDiv.className = "panel";
            var that = this;
            
            myEl = null;
            that.addDivAndScroll(newDiv, refresh, refreshFunc);
            newDiv = null;
            return newId;
        },
        /**
         *  Takes a div and sets up scrolling for it..
           ```
           $.ui.addDivAndScroll(object);
           ```
         * @param {Object} Element
         * @title $.ui.addDivAndScroll(element);
         * @api private
         */
        addDivAndScroll: function(tmp, refreshPull, refreshFunc, container) {
            var jsScroll = false;
            var overflowStyle = tmp.style.overflow;
            var hasScroll = overflowStyle != 'hidden' && overflowStyle != 'visible';
            
            container = container || this.content;
            //sets up scroll when required and not supported
            if (!$.feat.nativeTouchScroll && hasScroll)
                tmp.setAttribute("js-scrolling", "yes");
            
            if (tmp.getAttribute("js-scrolling") && tmp.getAttribute("js-scrolling").toLowerCase() == "yes") {
                jsScroll = true;
                hasScroll = true;
            }
            
            
            
            if (tmp.getAttribute("scrolling") && tmp.getAttribute("scrolling") == "no") {
                hasScroll = false;
                jsScroll = false;
            }
            
            if (!jsScroll) {
                container.appendChild(tmp);
                var scrollEl = tmp;
                tmp.style['-webkit-overflow-scrolling'] = "none"
            } else {
                //WE need to clone the div so we keep events
                var scrollEl = tmp.cloneNode(false);
                
                
                tmp.title = null;
                tmp.id = null;
                tmp.removeAttribute("data-footer");
                tmp.removeAttribute("data-nav");
                tmp.removeAttribute("data-header");
                tmp.removeAttribute("selected");
                tmp.removeAttribute("data-load");
                tmp.removeAttribute("data-unload");
                tmp.removeAttribute("data-tab");
                jq(tmp).replaceClass("panel", "jqmScrollPanel");
                
                scrollEl.appendChild(tmp);
                
                container.appendChild(scrollEl);
                
                if (this.selectBox !== false)
                    this.selectBox.getOldSelects(scrollEl.id);
                if (this.passwordBox !== false)
                    this.passwordBox.getOldPasswords(scrollEl.id);
            
            }
            
            if (hasScroll) {
                this.scrollingDivs[scrollEl.id] = (jq(tmp).scroller({
                    scrollBars: true,
                    verticalScroll: true,
                    horizontalScroll: false,
                    vScrollCSS: "jqmScrollbar",
                    refresh: refreshPull,
                    useJsScroll: jsScroll,
                    noParent: !jsScroll,
                    autoEnable: false //dont enable the events unnecessarilly
                }));
                //backwards compatibility
                if (refreshFunc)
                    $.bind(this.scrollingDivs[scrollEl.id], 'refresh-release', function(trigger) {
                        if (trigger)
                            refreshFunc()
                    });
            }
            
            tmp = null;
            scrollEl = null;
        },

        /**
         *  Scrolls a panel to the top
           ```
           $.ui.scrollToTop(id);
           ```
         * @param {String} id without hash
         * @title $.ui.scrollToTop(id);
         */
        scrollToTop: function(id) {
            if (this.scrollingDivs[id]) {
                this.scrollingDivs[id].scrollToTop();
            }
        },
        scrollToBottom: function(id) {
            if (this.scrollingDivs[id]) {
                this.scrollingDivs[id].scrollToBottom();
            }
        },

        /**
         *  This is used when a transition fires to do helper events.  We check to see if we need to change the nav menus, footer, and fire
         * the load/onload functions for panels
           ```
           $.ui.parsePanelFunctions(currentDiv,oldDiv);
           ```
         * @param {Object} current div
         * @param {Object} old div
         * @title $.ui.parsePanelFunctions(currentDiv,oldDiv);
         * @api private
         */
        parsePanelFunctions: function(what, oldDiv) {
            //check for custom footer
            var that = this;
            var hasFooter = what.getAttribute("data-footer");
            var hasHeader = what.getAttribute("data-header");

            //$asap removed since animations are fixed in css3animate
            if (hasFooter && hasFooter.toLowerCase() == "none") {
                that.toggleNavMenu(false);
            } else {
                that.toggleNavMenu(true);
            }
            if (hasFooter && that.customFooter != hasFooter) {
                that.customFooter = hasFooter;
                that.updateNavbarElements(jq("#" + hasFooter).children());
            } else if (hasFooter != that.customFooter) {
                if (that.customFooter)
                    that.updateNavbarElements(that.defaultFooter);
                that.customFooter = false;
            }
            if (hasHeader && that.customHeader != hasHeader) {
                that.customHeader = hasHeader;
                that.updateHeaderElements(jq("#" + hasHeader).children());
            } else if (hasHeader != that.customHeader) {
                if (that.customHeader) {
                    that.updateHeaderElements(that.defaultHeader);
                    that.setTitle(that.activeDiv.title);
                }
                that.customHeader = false;
            }
            if (what.getAttribute("data-tab")) { //Allow the dev to force the footer menu
                jq("#navbar a").removeClass("selected");
                jq("#" + what.getAttribute("data-tab")).addClass("selected");
            }

            //Load inline footers
            var inlineFooters = $(what).find("footer");
            if (inlineFooters.length > 0) {
                that.customFooter = what.id;
                that.updateNavbarElements(inlineFooters.children());
            }
            //load inline headers
            var inlineHeader = $(what).find("header");
            
            
            if (inlineHeader.length > 0) {
                that.customHeader = what.id;
                that.updateHeaderElements(inlineHeader.children());
            }
            //check if the panel has a footer
            if (what.getAttribute("data-tab")) { //Allow the dev to force the footer menu
                jq("#navbar a").removeClass("selected");
                jq("#navbar #" + what.getAttribute("data-tab")).addClass("selected");
            }
            
            var hasMenu = what.getAttribute("data-nav");
            if (hasMenu && this.customMenu != hasMenu) {
                this.customMenu = hasMenu;
                this.updateSideMenu(jq("#" + hasMenu).children());
            } else if (hasMenu != this.customMenu) {
                if (this.customMenu) {
                    this.updateSideMenu(this.defaultMenu);
                }
                this.customMenu = false;
            }
            
            
            
            if (oldDiv) {
                fnc = oldDiv.getAttribute("data-unload");
                if (typeof fnc == "string" && window[fnc]) {
                    window[fnc](oldDiv);
                }
                $(oldDiv).trigger("unloadpanel");
            }
            var fnc = what.getAttribute("data-load");
            if (typeof fnc == "string" && window[fnc]) {
                window[fnc](what);
            }
            $(what).trigger("loadpanel");
            if (this.isSideMenuOn()) {
                this.toggleSideMenu(false);
            }
        },
        /**
         * Helper function that parses a contents html for any script tags and either adds them or executes the code
         * @api private
         */
        parseScriptTags: function(div) {
            if (!div)
                return;
            $.parseJS(div);
        },
        /**
         * This is called to initiate a transition or load content via ajax.
         * We can pass in a hash+id or URL and then we parse the panel for additional functions
           ```
           $.ui.loadContent("#main",false,false,"up");
           ```
         * @param {String} target
         * @param {Boolean} newtab (resets history)
         * @param {Boolean} go back (initiate the back click)
         * @param {String} transition
         * @title $.ui.loadContent(target,newTab,goBack,transition);
         * @api public
         */
        loadContent: function(target, newTab, back, transition, anchor) {
            
            if (this.doingTransition) {
                var that = this;
                this.loadContentQueue.push([target, newTab, back, transition, anchor]);
                return
            }
            if (target.length === 0)
                return;
            
            what = null;
            var that = this;
            var loadAjax = true;
            anchor = anchor || document.createElement("a"); //Hack to allow passing in no anchor
            if (target.indexOf("#") == -1) {
                var urlHash = "url" + crc32(target); //Ajax urls
                var crcCheck = jq("div.panel[data-crc='" + urlHash + "']");
                if (jq("#" + target).length > 0) {
                    loadAjax = false;
                } 
                else if (crcCheck.length > 0) {
                    loadAjax = false;
                    if (anchor.getAttribute("data-refresh-ajax") === 'true' || (anchor.refresh && anchor.refresh === true || this.isAjaxApp)) {
                        loadAjax = true;
                    }
                    else {
                        target = "#" + crcCheck.get(0).id;
                    }
                } else if (jq("#" + urlHash).length > 0) {

                    //ajax div already exists.  Let's see if we should be refreshing it.
                    loadAjax = false;
                    if (anchor.getAttribute("data-refresh-ajax") === 'true' || (anchor.refresh && anchor.refresh === true || this.isAjaxApp)) {
                        loadAjax = true;
                    } else
                        target = "#" + urlHash;
                }
            }
            if (target.indexOf("#") == -1 && loadAjax) {
                this.loadAjax(target, newTab, back, transition, anchor);
            } else {
                this.loadDiv(target, newTab, back, transition);
            }
        },
        /**
         * This is called internally by loadContent.  Here we are loading a div instead of an Ajax link
           ```
           $.ui.loadDiv("#main",false,false,"up");
           ```
         * @param {String} target
         * @param {Boolean} newtab (resets history)
         * @param {Boolean} go back (initiate the back click)
         * @param {String} transition
         * @title $.ui.loadDiv(target,newTab,goBack,transition);
         * @api private
         */
        loadDiv: function(target, newTab, back, transition) {
            // load a div
            var that=this;
            what = target.replace("#", "");
            
            var slashIndex = what.indexOf('/');
            var hashLink = "";
            if (slashIndex != -1) {
                // Ignore everything after the slash for loading
                hashLink = what.substr(slashIndex);
                what = what.substr(0, slashIndex);
            }
            
            what = jq("#" + what).get(0);
            
            if (!what)
                return console.log ("Target: " + target + " was not found");
            if (what == this.activeDiv && !back) {
                //toggle the menu if applicable
                if (this.isSideMenuOn())
                    this.toggleSideMenu(false);
                return;
            }
            this.transitionType = transition;
            var oldDiv = this.activeDiv;
            var currWhat = what;
            
            if (what.getAttribute("data-modal") == "true" || what.getAttribute("modal") == "true") {
                var fnc = what.getAttribute("data-load");
                if (typeof fnc == "string" && window[fnc]) {
                    window[fnc](what);
                }
                $(what).trigger("loadpanel");
                return this.showModal(what.id);
            }
                        
            
          
            
            if (oldDiv == currWhat) //prevent it from going to itself
                return;
            
            if (newTab) {
                this.clearHistory();
                this.pushHistory("#" + this.firstDiv.id, what.id, transition, hashLink);
            } else if (!back) {
                this.pushHistory(previousTarget, what.id, transition, hashLink);
            }
            
            
            previousTarget = '#' + what.id + hashLink;
            
            
            this.doingTransition = true;

            oldDiv.style.display="block";
            currWhat.style.display="block";
            
            this.runTransition(transition, oldDiv, currWhat, back);              
            
            
            //Let's check if it has a function to run to update the data
            this.parsePanelFunctions(what, oldDiv);
            //Need to call after parsePanelFunctions, since new headers can override
            this.loadContentData(what, newTab, back, transition);
            var that=this;
            setTimeout(function(){
                if(that.scrollingDivs[oldDiv.id]) {
                    that.scrollingDivs[oldDiv.id].disable();
                }
            },200);
        
        },
        /**
         * This is called internally by loadDiv.  This sets up the back button in the header and scroller for the panel
           ```
           $.ui.loadContentData("#main",false,false,"up");
           ```
         * @param {String} target
         * @param {Boolean} newtab (resets history)
         * @param {Boolean} go back (initiate the back click)
         * @param {String} transition
         * @title $.ui.loadDiv(target,newTab,goBack,transition);
         * @api private
         */
        loadContentData: function(what, newTab, back, transition) {
            if (back) {
                if (this.history.length > 0) {
                    var val = this.history[this.history.length - 1];
                    var slashIndex = val.target.indexOf('/');
                    if (slashIndex != -1) {
                        var prevId = val.target.substr(0, slashIndex);
                    } else
                        var prevId = val.target;
                    var el = jq(prevId).get(0);
                    //make sure panel is there
                    if (el)
                        this.setBackButtonText(el.title);
                    else
                        this.setBackButtonText("Back");
                }
            } else if (this.activeDiv.title)
                this.setBackButtonText(this.activeDiv.title)
            else
                this.setBackButtonText("Back");
            if (what.title) {
                this.setTitle(what.title);
            }
            if (newTab) {
                this.setBackButtonText(this.firstDiv.title)
            }
            
            if (this.history.length == 0) {
                this.setBackButtonVisibility(false);
                this.history = [];
            } else if (this.showBackbutton)
                this.setBackButtonVisibility(true);
            this.activeDiv = what;
            if (this.scrollingDivs[this.activeDiv.id]) {
                this.scrollingDivs[this.activeDiv.id].enable(this.resetScrollers);
            }
        },
        /**
         * This is called internally by loadContent.  Here we are using Ajax to fetch the data
           ```
           $.ui.loadDiv("page.html",false,false,"up");
           ```
         * @param {String} target
         * @param {Boolean} newtab (resets history)
         * @param {Boolean} go back (initiate the back click)
         * @param {String} transition
         * @title $.ui.loadDiv(target,newTab,goBack,transition);
         * @api private
         */
        loadAjax: function(target, newTab, back, transition, anchor) {
            // XML Request
            if (this.activeDiv.id == "jQui_ajax" && target == this.ajaxUrl)
                return;
            var urlHash = "url" + crc32(target); //Ajax urls
            var that = this;
            if (target.indexOf("http") == -1)
                target = AppMobi.webRoot + target;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    this.doingTransition = false;
                    
                    var doReturn = false;

                    //Here we check to see if we are retaining the div, if so update it
                    if (jq("#" + urlHash).length > 0) {
                        that.updateContentDiv(urlHash, xmlhttp.responseText);
                        jq("#" + urlHash).get(0).title = anchor.title ? anchor.title : target;
                    } else if (anchor.getAttribute("data-persist-ajax") || that.isAjaxApp) {
                        
                        var refresh = (anchor.getAttribute("data-pull-scroller") === 'true') ? true : false;
                        refreshFunction = refresh ? 
                        function() {
                            anchor.refresh = true;
                            that.loadContent(target, newTab, back, transition, anchor);
                            anchor.refresh = false;
                        } : null;
                        //that.addContentDiv(urlHash, xmlhttp.responseText, refresh, refreshFunction);
                        urlHash = that.addContentDiv(urlHash, xmlhttp.responseText, anchor.title ? anchor.title : target, refresh, refreshFunction);
                    } else {
                        that.updateContentDiv("jQui_ajax", xmlhttp.responseText);
                        jq("#jQui_ajax").get(0).title = anchor.title ? anchor.title : target;
                        that.loadContent("#jQui_ajax", newTab, back);
                        doReturn = true;
                    }
                    //Let's load the content now.
                    //We need to check for any script tags and handle them
                    var div = document.createElement("div");
                    div.innerHTML = xmlhttp.responseText;
                    that.parseScriptTags(div);

                    if (doReturn)
                    {
                         if (that.showLoading)
                            that.hideMask();
                        return;
                    }
                    
                    that.loadContent("#" + urlHash);
                    if (that.showLoading)
                       that.hideMask();
                    return null;
                }
            };
            ajaxUrl = target;
            var newtarget = this.useAjaxCacheBuster ? target + (target.split('?')[1] ? '&' : '?') + "cache=" + Math.random() * 10000000000000000 : target;
            xmlhttp.open("GET", newtarget, true);
            xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xmlhttp.send();
            // show Ajax Mask
            if (this.showLoading)
                this.showMask();
        },
        /**
         * This executes the transition for the panel
            ```
            $.ui.runTransition(transition,oldDiv,currDiv,back)
            ```
         * @api private
         * @title $.ui.runTransition(transition,oldDiv,currDiv,back)
         */
        runTransition: function(transition, oldDiv, currWhat, back) {
            if (!this.availableTransitions[transition])
                transition = 'default';
            this.availableTransitions[transition].call(this, oldDiv, currWhat, back);
        },

        /**
         * This is callled when you want to launch jqUi.  If autoLaunch is set to true, it gets called on DOMContentLoaded.
         * If autoLaunch is set to false, you can manually invoke it.
           ```
           $.ui.autoLaunch=false;
           $.ui.launch();
           ```
         * @title $.ui.launch();
         */
        launch: function() {
            
            if (this.hasLaunched == false || this.launchCompleted) {
                this.hasLaunched = true;
                return;
            }
            
            var that = this;
            this.isAppMobi = (window.AppMobi && typeof (AppMobi) == "object" && AppMobi.app !== undefined) ? true : false;
            this.viewportContainer = jq("#jQUi");
            this.navbar = jq("#navbar").get(0);
            this.content = jq("#content").get(0);
            ;
            this.header = jq("#header").get(0);
            ;
            this.menu = jq("#menu").get(0);
            ;
            //set anchor click handler for UI
            this.viewportContainer[0].addEventListener('click', function(e) {
                var theTarget = e.target;
                checkAnchorClick(e, theTarget);
            }, false);


            //enter-edit scroll paddings fix
            //focus scroll adjust fix
            var enterEditEl = null;
            //on enter-edit keep a reference of the actioned element
            $.bind($.touchLayer, 'enter-edit', function(el) {
                enterEditEl = el;
            });
            //enter-edit-reshape panel padding and scroll adjust
            $.bind($.touchLayer, 'enter-edit-reshape', function() {
                //onReshape UI fixes
                //check if focused element is within active panel
                var jQel = $(enterEditEl);
                var jQactive = jQel.closest(that.activeDiv);
                if (jQactive && jQactive.size() > 0) {
                    if ($.os.ios || $.os.chrome) {
                        var paddingTop, paddingBottom;
                        if (document.body.scrollTop) {
                            paddingTop = document.body.scrollTop - jQactive.offset().top;
                        } else {
                            paddingTop = 0;
                        }
                        //not exact, can be a little above the actual value
                        //but we haven't found an accurate way to measure it and this is the best so far
                        paddingBottom = jQactive.offset().bottom - jQel.offset().bottom;
                        that.scrollingDivs[that.activeDiv.id].setPaddings(paddingTop, paddingBottom);
                    
                    } else if ($.os.android || $.os.blackberry) {
                        var elPos = jQel.offset();
                        var containerPos = jQactive.offset();
                        if (elPos.bottom > containerPos.bottom && elPos.height < containerPos.height) {
                            //apply fix
                            that.scrollingDivs[that.activeDiv.id].scrollToItem(jQel, 'bottom');
                        }
                    }
                }
            });
            if ($.os.ios) {
                $.bind($.touchLayer, 'exit-edit-reshape', function() {
                    that.scrollingDivs[that.activeDiv.id].setPaddings(0, 0);
                });
            }

            //elements setup
            if (!this.navbar) {
                this.navbar = document.createElement("div");
                this.navbar.id = "navbar";
                this.navbar.style.cssText = "display:none";
                this.viewportContainer.append(this.navbar);
            }
            if (!this.header) {
                this.header = document.createElement("div");
                this.header.id = "header";
                this.viewportContainer.prepend(this.header);
            }
            if (!this.menu) {
                this.menu = document.createElement("div");
                this.menu.id = "menu";
                //this.menu.style.overflow = "hidden";
                this.menu.innerHTML = '<div id="menu_scroller"></div>';
                this.viewportContainer.append(this.menu);
                this.menu.style.overflow = "hidden";
                this.scrollingDivs["menu_scroller"] = jq("#menu_scroller").scroller({
                    scrollBars: true,
                    verticalScroll: true,
                    vScrollCSS: "jqmScrollbar",
                    useJsScroll: !$.feat.nativeTouchScroll,
                    noParent: $.feat.nativeTouchScroll
                });
                if ($.feat.nativeTouchScroll)
                    $("#menu_scroller").css("height", "100%");
            }
            
            if (!this.content) {
                this.content = document.createElement("div");
                this.content.id = "content";
                this.viewportContainer.append(this.content);
            }

            //insert backbutton (should optionally be left to developer..)
            this.header.innerHTML = '<a id="backButton"  href="javascript:;"></a> <h1 id="pageTitle"></h1>' + header.innerHTML;
            this.backButton = $("#header #backButton").get(0);
            this.backButton.className = "button";
            jq(document).on("click", "#header #backButton", function() {
                that.goBack();
            });
            this.backButton.style.visibility = "hidden";

            //page title (should optionally be left to developer..)
            this.titleBar = $("#header #pageTitle").get(0);

            //setup ajax mask
            this.addContentDiv("jQui_ajax", "");
            var maskDiv = document.createElement("div");
            maskDiv.id = "jQui_mask";
            maskDiv.className = "ui-loader";
            maskDiv.innerHTML = "<span class='ui-icon ui-icon-loading spin'></span><h1>Loading Content</h1>";
            maskDiv.style.zIndex = 20000;
            maskDiv.style.display = "none";
            document.body.appendChild(maskDiv);
            //setup modalDiv
            var modalDiv = document.createElement("div");
            modalDiv.id = "jQui_modal";
            this.viewportContainer.prepend(modalDiv);
            modalDiv.appendChild(jq("<div id='modalContainer'></div>").get());
            this.scrollingDivs['modal_container'] = jq("#modalContainer").scroller({
                scrollBars: true,
                vertical: true,
                vScrollCSS: "jqmScrollbar",
                noParent: true
            });
            
            this.modalWindow = modalDiv;
            //get first div, defer
            var defer = {};
            var contentDivs = this.viewportContainer.get().querySelectorAll(".panel");
            for (var i = 0; i < contentDivs.length; i++) {
                var el = contentDivs[i];
                var tmp = el;
                var id;
                var prevSibling=el.previousSibling;
                if (el.parentNode && el.parentNode.id != "content") {

                    el.parentNode.removeChild(el);
                    var id = el.id;
                    if (tmp.getAttribute("selected"))
                        this.firstDiv = jq("#" + id).get(0);
                    this.addDivAndScroll(tmp);
                    jq("#"+id).insertAfter(prevSibling);
                } else if (!el.parsedContent) {
                    el.parsedContent = 1;
                    el.parentNode.removeChild(el);
                    var id = el.id;
                    if (tmp.getAttribute("selected"))
                        this.firstDiv = jq("#" + id).get(0);
                    this.addDivAndScroll(tmp);
                    jq("#"+id).insertAfter(prevSibling);
                }
                if (el.getAttribute("data-defer")) {
                    defer[id] = el.getAttribute("data-defer");
                }
                if (!this.firstDiv)
                    this.firstDiv = $("#" + id).get(0);
                
                el = null;
            }
            contentDivs = null;
            var loadingDefer = false;
            var toLoad = Object.keys(defer).length;
            if (toLoad > 0) {
                loadingDefer = true;
                var loaded = 0;
                for (var j in defer) {
                    (function(j) {
                        jq.ajax({
                            url: AppMobi.webRoot + defer[j],
                            success: function(data) {
                                if (data.length == 0)
                                    return;
                                $.ui.updateContentDiv(j, data);
                                that.parseScriptTags(jq(j).get());
                                loaded++;
                                if (loaded >= toLoad) {
                                    $(document).trigger("defer:loaded");
                                    loadingDefer = false;
                                
                                }
                            },
                            error: function(msg) {
                                //still trigger the file as being loaded to not block jq.ui.ready
                                console.log("Error with deferred load " + AppMobi.webRoot + defer[j])
                                loaded++;
                                if (loaded >= toLoad) {
                                    $(document).trigger("defer:loaded");
                                    loadingDefer = false;
                                }
                            }
                        });
                    })(j);
                }
            }
            if (this.firstDiv) {
                
                var that = this;
                // Fix a bug in iOS where translate3d makes the content blurry
                this.activeDiv = this.firstDiv;
                
                if (this.scrollingDivs[this.activeDiv.id]) {
                    this.scrollingDivs[this.activeDiv.id].enable();
                }

                //window.setTimeout(function() {
                var loadFirstDiv = function() {
                    
                    
                    if (jq("#navbar a").length > 0) {
                        jq("#navbar a").data("ignore-pressed", "true").data("resetHistory", "true");
                        that.defaultFooter = jq("#navbar").children().clone();
                        that.updateNavbarElements(that.defaultFooter);
                    }
                    //setup initial menu
                    var firstMenu = jq("nav").get();
                    if (firstMenu) {
                        that.defaultMenu = jq(firstMenu).children().clone();
                        that.updateSideMenu(that.defaultMenu);
                    }
                    //get default header
                    that.defaultHeader = jq("#header").children().clone();
                    //
                    jq("#navbar").on("click", "a", function(e) {
                        jq("#navbar a").not(this).removeClass("selected");
                            $(e.target).addClass("selected");
                    });


                    //go to activeDiv
                    var firstPanelId = that.getPanelId(defaultHash);
                    //that.history=[{target:'#'+that.firstDiv.id}];   //set the first id as origin of path
                    if (firstPanelId.length > 0 && that.loadDefaultHash && firstPanelId != ("#" + that.firstDiv.id)&&$(firstPanelId).length>0) {
                        that.loadContent(defaultHash, true, false, 'none'); //load the active page as a newTab with no transition
                    } else {
                        previousTarget = "#" + that.firstDiv.id;
                        that.loadContentData(that.firstDiv); //load the info off the first panel
                        that.parsePanelFunctions(that.firstDiv);
                        
                        that.firstDiv.style.display = "block";
                        $("#header #backButton").css("visibility", "hidden");
                        if (that.firstDiv.getAttribute("data-modal") == "true" || that.firstDiv.getAttribute("modal") == "true") {            
                            that.showModal(that.firstDiv.id);
                        }
                    }
                    
                    that.launchCompleted = true;
                    if (jq("nav").length > 0) {
                        jq("#jQUi #header").addClass("hasMenu off");
                        jq("#jQUi #content").addClass("hasMenu off");
                        jq("#jQUi #navbar").addClass("hasMenu off");
                    }
                    //trigger ui ready
                    jq(document).trigger("jq.ui.ready");
                    //remove splashscreen

                    // Run after the first div animation has been triggered - avoids flashing
                    jq("#splashscreen").remove();
                };
                if (loadingDefer) {
                    $(document).one("defer:loaded", loadFirstDiv);
                } else
                    loadFirstDiv();
            }
            var that = this;
            $.bind($.ui, "content-loaded", function() {
                if (that.loadContentQueue.length > 0) {
                    var tmp = that.loadContentQueue.splice(0, 1)[0];
                    that.loadContent(tmp[0], tmp[1], tmp[2], tmp[3], tmp[4]);
                }
            });
            if (window.navigator.standalone) {
                this.blockPageScroll();
            }
            this.topClickScroll();
           
        },
        /**
         * This simulates the click and scroll to top of browsers
         */
        topClickScroll:function(){
             document.getElementById("header").addEventListener("click",function(e){
                if(e.clientY<=15&&e.target.nodeName.toLowerCase()=="h1") //hack - the title spans the whole width of the header
                    $.ui.scrollingDivs[$.ui.activeDiv.id].scrollToTop("100");
            });
        
        },
        /**
         * This blocks the page from scrolling/panning.  Usefull for native apps
         */
        blockPageScroll: function() {
            jq("#jQUi #header").bind("touchmove", function(e) {
                e.preventDefault();
            });
        },
        /**
         * This is the default transition.  It simply shows the new panel and hides the old
         */
        noTransition: function(oldDiv, currDiv, back) {
            currDiv.style.display = "block";
            oldDiv.style.display = "block";
            var that = this;
            that.clearAnimations(currDiv);
            that.css3animate(oldDiv, {
                x: "0%",
                y: 0
            });
            that.finishTransition(oldDiv);
            currDiv.style.zIndex = 2;
            oldDiv.style.zIndex = 1;
        },
        /**
         * This must be called at the end of every transition to hide the old div and reset the doingTransition variable
         *
         * @param {Object} Div that transitioned out
         * @title $.ui.finishTransition(oldDiv)
         */
        finishTransition: function(oldDiv, currDiv) {
            oldDiv.style.display = 'none';
            this.doingTransition = false;
            if (currDiv)
                this.clearAnimations(currDiv);
            if (oldDiv)
                this.clearAnimations(oldDiv);
            $.trigger(this, "content-loaded");
        },

        /**
         * This must be called at the end of every transition to remove all transforms and transitions attached to the inView object (performance + native scroll)
         *
         * @param {Object} Div that transitioned out
         * @title $.ui.finishTransition(oldDiv)
         */
        clearAnimations: function(inViewDiv) {
            inViewDiv.style[$.feat.cssPrefix + 'Transform'] = "none";
            inViewDiv.style[$.feat.cssPrefix + 'Transition'] = "none";
        }

    /**
         * END
         * @api private
         */
    };


    //lookup for a clicked anchor recursively and fire UI own actions when applicable 
    var checkAnchorClick = function(e, theTarget) {
        
        
        if (theTarget == (jQUi)) {
            return;
        }

        //this technique fails when considerable content exists inside anchor, should be recursive ?
        if (theTarget.tagName.toLowerCase() != "a" && theTarget.parentNode)
            return checkAnchorClick(e, theTarget.parentNode); //let's try the parent (recursive)
        //anchors
        if (theTarget.tagName !== "undefined" && theTarget.tagName.toLowerCase() == "a") {
            
            var custom = (typeof jq.ui.customClickHandler == "function") ? jq.ui.customClickHandler : false;
            if (custom !== false) {
                if(jq.ui.customClickHandler(theTarget))
                   return e.preventDefault();
                
            }
            if (theTarget.href.toLowerCase().indexOf("javascript:") !== -1 || theTarget.getAttribute("data-ignore")) {
                return;
            }
            

            if (theTarget.href.indexOf("tel:") === 0)
                return false;

            //external links
            if (theTarget.hash.indexOf("#") === -1 && theTarget.target.length > 0) {
                if (theTarget.href.toLowerCase().indexOf("javascript:") != 0) {
                    if (jq.ui.isAppMobi) {
                        e.preventDefault();
                        AppMobi.device.launchExternal(theTarget.href);
                    } else if (!jq.os.desktop) {
                        e.target.target = "_blank";
                    }
                }
                return;
            }

            /* IE 10 fixes*/

            var href = theTarget.href,
            prefix = location.protocol + "//" + location.hostname+":"+location.port;
            if (href.indexOf(prefix) === 0) {
                href = href.substring(prefix.length+1);
            }
            //empty links
            if (href == "#" ||(href.indexOf("#")===href.length-1)|| (href.length == 0 && theTarget.hash.length == 0))
                return;

            //internal links
            e.preventDefault();
            var mytransition = theTarget.getAttribute("data-transition");
            var resetHistory = theTarget.getAttribute("data-resetHistory");
            resetHistory = resetHistory && resetHistory.toLowerCase() == "true" ? true : false;
            var href = theTarget.hash.length > 0 ? theTarget.hash : theTarget.href;
            jq.ui.loadContent(href, resetHistory, 0, mytransition, theTarget);
            return;
        }
    }
    
    var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D"; /* Number */
    var crc32 = function( /* String */str,  /* Number */crc) {
        if (crc == undefined)
            crc = 0;
        var n = 0; //a number between 0 and 255 
        var x = 0; //an hex number 
        crc = crc ^ (-1);
        for (var i = 0, iTop = str.length; i < iTop; i++) {
            n = (crc ^ str.charCodeAt(i)) & 0xFF;
            x = "0x" + table.substr(n * 9, 8);
            crc = (crc >>> 8) ^ x;
        }
        return crc ^ (-1);
    };
    
    
    $.ui = new ui;

})(jq);



//The following functions are utilitiy functions for jqUi within appMobi.

(function() {
    document.addEventListener("appMobi.device.ready", function() { //in AppMobi, we need to undo the height stuff since it causes issues.
        setTimeout(function() {
            document.getElementById('jQUi').style.height = "100%";
            document.body.style.height = "100%";
            document.documentElement.style.minHeight = window.innerHeight;
        }, 300);
        this.removeEventListener("appMobi.device.ready", arguments.callee);
    });

})();


(function($ui){
    
        function slideUpTransition(oldDiv, currDiv, back) {
             oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this;
            if (back) {
                currDiv.style.zIndex = 1;
                oldDiv.style.zIndex = 2;
                
                that.clearAnimations(currDiv);

                that.css3animate(oldDiv, {
                    y: "100%",
                    x: "0%",
                    time: "150ms",
                    complete: function() {
                        that.finishTransition(oldDiv);
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }
                });
            } else {
                currDiv.style.zIndex = 2;
                oldDiv.style.zIndex = 1;
                that.css3animate(currDiv, {
                    y: "100%",
                    x: "0%",
                    complete: function() {
                        that.css3animate(currDiv, {
                            y: "0%",
                            x: "0%",
                            time: "150ms",
                            complete: function(canceled) {
                                if(canceled) {
                                    that.finishTransition(oldDiv, currDiv);
                                    return;
                                }
                                
                                that.clearAnimations(currDiv);
                                that.css3animate(oldDiv, {
                                    x: "-100%",
                                    y: 0,
                                    complete: function() {
                                        that.finishTransition(oldDiv);
                                    }
                                });
                                
                            }
                        });
                    }
                });
            }
        }
        $ui.availableTransitions.up = slideUpTransition;
})($.ui);

(function($ui){
    
        function fadeTransition (oldDiv, currDiv, back) {
            oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this
            if (back) {
                currDiv.style.zIndex = 1;
                oldDiv.style.zIndex = 2;
                that.clearAnimations(currDiv);
                that.css3animate(oldDiv, {
                    x: "0%",
                    time: "150ms",
                    opacity: .1,
                    complete: function(canceled) {
                        if(canceled) {
                            that.finishTransition(oldDiv, currDiv);
                            return;
                        }
                        
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            opacity: 1,
                            complete: function() {
                                that.finishTransition(oldDiv);
                            }
                        
                        });
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }
                });
            } else {
                oldDiv.style.zIndex = 1;
                currDiv.style.zIndex = 2;
                currDiv.style.opacity = 0;
                that.css3animate(currDiv, {
                    x: "0%",
                    opacity: .1,
                    complete: function() {
                        that.css3animate(currDiv, {
                            x: "0%",
                            time: "150ms",
                            opacity: 1,
                            complete:function(canceled){
                                if(canceled) {
                                    that.finishTransition(oldDiv, currDiv);
                                    return;
                                }
                                
                                that.clearAnimations(currDiv);
                                that.css3animate(oldDiv, {
                                    x: "-100%",
                                    y: 0,
                                    complete: function() {
                                        that.finishTransition(oldDiv);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
        $ui.availableTransitions.fade = fadeTransition;
})($.ui);
(function($ui){
    
        function flipTransition (oldDiv, currDiv, back) {
             oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this
            if (back) {
                that.css3animate(currDiv, {
                    x: "100%",
                    scale: .8,
                    rotateY: "180deg",
                    complete: function() {
                        that.css3animate(currDiv, {
                            x: "0%",
                            scale: 1,
                            time: "150ms",
                            rotateY: "0deg",
                            complete: function(){
                                that.clearAnimations(currDiv);
                            }
                        });
                    }
                });
                that.css3animate(oldDiv, {
                    x: "100%",
                    time: "150ms",
                    scale: .8,
                    rotateY: "180deg",
                    complete: function() {
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            opacity: 1,
                            scale: 1,
                            rotateY: "0deg",
                            complete: function() {
                                that.finishTransition(oldDiv);
                            }
                        });
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }
                });
            } else {
                oldDiv.style.zIndex = 1;
                currDiv.style.zIndex = 2;
                that.css3animate(oldDiv, {
                    x: "100%",
                    time: "150ms",
                    scale: .8,
                    rotateY: "180deg",
                    complete: function() {
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            y: 0,
                            time: "1ms",
                            scale: 1,
                            rotateY: "0deg",
                            complete: function() {
                                that.finishTransition(oldDiv);
                            }
                        });
                    }
                });
                that.css3animate(currDiv, {
                    x: "100%",
                    time: "1ms",
                    scale: .8,
                    rotateY: "180deg",
                    complete: function() {
                        that.css3animate(currDiv, {
                            x: "0%",
                            time: "150ms",
                            scale: 1,
                            rotateY: "0deg",
                            complete:function(){
                                that.clearAnimations(currDiv);
                            }
                        });
                    }
                });
            }
        }
        $ui.availableTransitions.flip = flipTransition;
})($.ui);
(function($ui){
        
         function popTransition(oldDiv, currDiv, back) {
            oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this
            if (back) {
                currDiv.style.zIndex = 1;
                oldDiv.style.zIndex = 2;
                that.clearAnimations(currDiv);
                that.css3animate(oldDiv, {
                    x: "0%",
                    time: "150ms",
                    opacity: .1,
                    scale: .2,
                    origin: "-50%"+" 50%",
                    complete: function(canceled) {
                        if(canceled) {
                            that.finishTransition(oldDiv);
                            return;
                        }
                        
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            complete: function() {
                                that.finishTransition(oldDiv);
                            }
                        });
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }
                });
            } else {
                oldDiv.style.zIndex = 1;
                currDiv.style.zIndex = 2;
                that.css3animate(currDiv, {
                    x: "0%",
                    y: "0%",
                    scale: .2,
                    origin: "-50%"+" 50%",
                    opacity: .1,
                    complete: function() {
                        that.css3animate(currDiv, {
                            x: "0%",
                            time: "150ms",
                            scale: 1,
                            opacity: 1,
                            origin: "0%"+" 0%",
                            complete: function(canceled){
                                if(canceled) {
                                    that.finishTransition(oldDiv, currDiv);
                                    return;
                                }
                                
                                that.clearAnimations(currDiv);
                                that.css3animate(oldDiv, {
                                    x: "100%",
                                    y: 0,
                                    complete: function() {
                                        that.finishTransition(oldDiv);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
        $ui.availableTransitions.pop = popTransition;
})($.ui);
(function($ui){
    
        /**
         * Initiate a sliding transition.  This is a sample to show how transitions are implemented.  These are registered in $ui.availableTransitions and take in three parameters.
         * @param {Object} previous panel
         * @param {Object} current panel
         * @param {Boolean} go back
         * @title $ui.slideTransition(previousPanel,currentPanel,goBack);
         */
        function slideTransition(oldDiv, currDiv, back) {
          	oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this;
            if (back) {
                that.css3animate(oldDiv, {
					x:"0%",
					y:"0%",
					complete:function(){
		                that.css3animate(oldDiv, {
		                    x: "100%",
		                    time: "150ms",
		                    complete: function() {
		                        that.finishTransition(oldDiv, currDiv);
		                    }
		                }).link(currDiv, {
	                        x: "0%",
	                        time: "150ms"
	                    });
					}
				}).link(currDiv, {
					x:"-100%",
					y:"0%"
				});
            } else {
                that.css3animate(oldDiv, {
					x:"0%",
					y:"0%",
					complete:function(){
		                that.css3animate(oldDiv, {
		                    x: "-100%",
		                    time: "150ms",
		                    complete: function() {
		                        that.finishTransition(oldDiv, currDiv);
		                    }
		                }).link(currDiv, {
	                        x: "0%",
	                        time: "150ms"
	                    });
					}
				}).link(currDiv, {
					x:"100%",
					y:"0%"
				});
            }
        }
        $ui.availableTransitions.slide = slideTransition;
        $ui.availableTransitions['default'] = slideTransition;
})($.ui);
(function($ui){
    
        function slideDownTransition (oldDiv, currDiv, back) {
            oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this
            if (back) {
                currDiv.style.zIndex = 1;
                oldDiv.style.zIndex = 2;
                that.clearAnimations(currDiv);
                that.css3animate(oldDiv, {
                    y: "-100%",
                    x: "0%",
                    time: "150ms",
                    complete: function(canceled) {
                        if(canceled) {
                            that.finishTransition(oldDiv, currDiv);
                            return;
                        }
                        
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            y: 0,
                            complete: function() {
                                that.finishTransition(oldDiv);
                            
                            }
                        });
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }
                });
            } else {
                oldDiv.style.zIndex = 1;
                currDiv.style.zIndex = 2;
                that.css3animate(currDiv, {
                    y: "-100%",
                    x: "0%",
                    complete: function() {
                        that.css3animate(currDiv, {
                            y: "0%",
                            x: "0%",
                            time: "150ms",
                            complete: function(canceled){
                                if(canceled) {
                                    that.finishTransition(oldDiv, currDiv);
                                    return;
                                }
                                
                                that.clearAnimations(currDiv);
                                that.css3animate(oldDiv, {
                                    x: "-100%",
                                    y: 0,
                                    complete: function() {
                                        that.finishTransition(oldDiv);
                                    }
                                });
                                
                            }
                        });
                    }
                });
            }
        }
        $ui.availableTransitions.down = slideDownTransition;
})($.ui);

(function($ui){
    
        function slideUpTransition(oldDiv, currDiv, back) {
             oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this;
            if (back) {
                currDiv.style.zIndex = 1;
                oldDiv.style.zIndex = 2;
                
                that.clearAnimations(currDiv);

                that.css3animate(oldDiv, {
                    y: "100%",
                    x: "0%",
                    time: "150ms",
                    complete: function() {
                        that.finishTransition(oldDiv);
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }
                });
            } else {
                currDiv.style.zIndex = 2;
                oldDiv.style.zIndex = 1;
                that.css3animate(currDiv, {
                    y: "100%",
                    x: "0%",
                    complete: function() {
                        that.css3animate(currDiv, {
                            y: "0%",
                            x: "0%",
                            time: "150ms",
                            complete: function(canceled) {
                                if(canceled) {
                                    that.finishTransition(oldDiv, currDiv);
                                    return;
                                }
                                
                                that.clearAnimations(currDiv);
                                that.css3animate(oldDiv, {
                                    x: "-100%",
                                    y: 0,
                                    complete: function() {
                                        that.finishTransition(oldDiv);
                                    }
                                });
                                
                            }
                        });
                    }
                });
            }
        }
        $ui.availableTransitions.up = slideUpTransition;
})($.ui);


(function($ui){
        
         function popTransition(oldDiv, currDiv, back) {
            oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this
            if (back) {
                currDiv.style.zIndex = 1;
                oldDiv.style.zIndex = 2;
                that.clearAnimations(currDiv);
                that.css3animate(oldDiv, {
                    x: "0%",
                    time: "150ms",
                    opacity: .1,
                    scale: .2,
                    origin: "-50%"+" 50%",
                    complete: function(canceled) {
                        if(canceled) {
                            that.finishTransition(oldDiv);
                            return;
                        }
                        
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            complete: function() {
                                that.finishTransition(oldDiv);
                            }
                        });
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }
                });
            } else {
                oldDiv.style.zIndex = 1;
                currDiv.style.zIndex = 2;
                that.css3animate(currDiv, {
                    x: "0%",
                    y: "0%",
                    scale: .2,
                    origin: "-50%"+" 50%",
                    opacity: .1,
                    complete: function() {
                        that.css3animate(currDiv, {
                            x: "0%",
                            time: "150ms",
                            scale: 1,
                            opacity: 1,
                            origin: "0%"+" 0%",
                            complete: function(canceled){
                                if(canceled) {
                                    that.finishTransition(oldDiv, currDiv);
                                    return;
                                }
                                
                                that.clearAnimations(currDiv);
                                that.css3animate(oldDiv, {
                                    x: "100%",
                                    y: 0,
                                    complete: function() {
                                        that.finishTransition(oldDiv);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
        $ui.availableTransitions.pop = popTransition;
})($.ui);

(function($ui){
    
        function slideDownTransition (oldDiv, currDiv, back) {
            oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this
            if (back) {
                currDiv.style.zIndex = 1;
                oldDiv.style.zIndex = 2;
                that.clearAnimations(currDiv);
                that.css3animate(oldDiv, {
                    y: "-100%",
                    x: "0%",
                    time: "150ms",
                    complete: function(canceled) {
                        if(canceled) {
                            that.finishTransition(oldDiv, currDiv);
                            return;
                        }
                        
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            y: 0,
                            complete: function() {
                                that.finishTransition(oldDiv);
                            
                            }
                        });
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }
                });
            } else {
                oldDiv.style.zIndex = 1;
                currDiv.style.zIndex = 2;
                that.css3animate(currDiv, {
                    y: "-100%",
                    x: "0%",
                    complete: function() {
                        that.css3animate(currDiv, {
                            y: "0%",
                            x: "0%",
                            time: "150ms",
                            complete: function(canceled){
                                if(canceled) {
                                    that.finishTransition(oldDiv, currDiv);
                                    return;
                                }
                                
                                that.clearAnimations(currDiv);
                                that.css3animate(oldDiv, {
                                    x: "-100%",
                                    y: 0,
                                    complete: function() {
                                        that.finishTransition(oldDiv);
                                    }
                                });
                                
                            }
                        });
                    }
                });
            }
        }
        $ui.availableTransitions.down = slideDownTransition;
})($.ui);

(function($ui){
    
        /**
         * Initiate a sliding transition.  This is a sample to show how transitions are implemented.  These are registered in $ui.availableTransitions and take in three parameters.
         * @param {Object} previous panel
         * @param {Object} current panel
         * @param {Boolean} go back
         * @title $ui.slideTransition(previousPanel,currentPanel,goBack);
         */
        function slideTransition(oldDiv, currDiv, back) {
        	
          	oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this;
            if (back) {
                that.css3animate(oldDiv, {
					x:"0%",
					y:"0%",
					complete:function(){
		                that.css3animate(oldDiv, {
		                    x: "100%",
		                    time: "150ms",
		                    complete: function() {
		                        that.finishTransition(oldDiv, currDiv);
		                    }
		                }).link(currDiv, {
	                        x: "0%",
	                        time: "150ms"
	                    });
					}
				}).link(currDiv, {
					x:"-100%",
					y:"0%"
				});
            } else {
                that.css3animate(oldDiv, {
					x:"0%",
					y:"0%",
					complete:function(){
		                that.css3animate(oldDiv, {
		                    x: "-100%",
		                    time: "150ms",
		                    complete: function() {
		                        that.finishTransition(oldDiv, currDiv);
		                    }
		                }).link(currDiv, {
	                        x: "0%",
	                        time: "150ms"
	                    });
					}
				}).link(currDiv, {
					x:"100%",
					y:"0%"
				});
            }
        }
        $ui.availableTransitions.slide = slideTransition;
        $ui.availableTransitions['default'] = slideTransition;
})($.ui);

(function($ui){
    
        function fadeTransition (oldDiv, currDiv, back) {
            oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this
            if (back) {
                currDiv.style.zIndex = 1;
                oldDiv.style.zIndex = 2;
                that.clearAnimations(currDiv);
                that.css3animate(oldDiv, {
                    x: "0%",
                    time: "150ms",
                    opacity: .1,
                    complete: function(canceled) {
                        if(canceled) {
                            that.finishTransition(oldDiv, currDiv);
                            return;
                        }
                        
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            opacity: 1,
                            complete: function() {
                                that.finishTransition(oldDiv);
                            }
                        
                        });
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }
                });
            } else {
                oldDiv.style.zIndex = 1;
                currDiv.style.zIndex = 2;
                currDiv.style.opacity = 0;
                that.css3animate(currDiv, {
                    x: "0%",
                    opacity: .1,
                    complete: function() {
                        that.css3animate(currDiv, {
                            x: "0%",
                            time: "150ms",
                            opacity: 1,
                            complete:function(canceled){
                                if(canceled) {
                                    that.finishTransition(oldDiv, currDiv);
                                    return;
                                }
                                
                                that.clearAnimations(currDiv);
                                that.css3animate(oldDiv, {
                                    x: "-100%",
                                    y: 0,
                                    complete: function() {
                                        that.finishTransition(oldDiv);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
        $ui.availableTransitions.fade = fadeTransition;
})($.ui);

(function($ui){
    
        function flipTransition (oldDiv, currDiv, back) {
             oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this
            if (back) {
                that.css3animate(currDiv, {
                    x: "100%",
                    scale: .8,
                    rotateY: "180deg",
                    complete: function() {
                        that.css3animate(currDiv, {
                            x: "0%",
                            scale: 1,
                            time: "150ms",
                            rotateY: "0deg",
                            complete: function(){
                                that.clearAnimations(currDiv);
                            }
                        });
                    }
                });
                that.css3animate(oldDiv, {
                    x: "100%",
                    time: "150ms",
                    scale: .8,
                    rotateY: "180deg",
                    complete: function() {
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            opacity: 1,
                            scale: 1,
                            rotateY: "0deg",
                            complete: function() {
                                that.finishTransition(oldDiv);
                            }
                        });
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }
                });
            } else {
                oldDiv.style.zIndex = 1;
                currDiv.style.zIndex = 2;
                that.css3animate(oldDiv, {
                    x: "100%",
                    time: "150ms",
                    scale: .8,
                    rotateY: "180deg",
                    complete: function() {
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            y: 0,
                            time: "1ms",
                            scale: 1,
                            rotateY: "0deg",
                            complete: function() {
                                that.finishTransition(oldDiv);
                            }
                        });
                    }
                });
                that.css3animate(currDiv, {
                    x: "100%",
                    time: "1ms",
                    scale: .8,
                    rotateY: "180deg",
                    complete: function() {
                        that.css3animate(currDiv, {
                            x: "0%",
                            time: "150ms",
                            scale: 1,
                            rotateY: "0deg",
                            complete:function(){
                                that.clearAnimations(currDiv);
                            }
                        });
                    }
                });
            }
        }
        $ui.availableTransitions.flip = flipTransition;
})($.ui);

﻿//CSUSB Mobile Map v2.0 Geoxml3 

// Extend the global String object with a method to remove leading and trailing whitespace
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

// Declare namespace
geoXML3 = window.geoXML3 || {instances: []};

// Constructor for the root KML parser object
geoXML3.parser = function (options) {
  // Private variables
  var parserOptions = geoXML3.combineOptions(options, {
    singleInfoWindow: false,
    processStyles: true,
    zoom: true
  });
  var docs = []; // Individual KML documents
  var lastPlacemark;
  var parserName;
  if (typeof parserOptions.suppressInfoWindows == "undefined") parserOptions.suppressInfoWindows = false;
  if (!parserOptions.infoWindow && parserOptions.singleInfoWindow)
    parserOptions.infoWindow = new google.maps.InfoWindow();

  var parseKmlString = function (kmlString, docSet) {
    // Internal values for the set of documents as a whole
    var internals = {
      parser: this,
      docSet: docSet || [],
      remaining: 1,
      parseOnly: !(parserOptions.afterParse || parserOptions.processStyles)
    };
    thisDoc = new Object();
    thisDoc.internals = internals;
    internals.docSet.push(thisDoc);
    render(geoXML3.xmlParse(kmlString),thisDoc);
  }

  var parse = function (urls, docSet) {
    // Process one or more KML documents
    if (!parserName) {
      parserName = 'geoXML3.instances[' + (geoXML3.instances.push(this) - 1) + ']';
    }
    
    if (typeof urls === 'string') {
      // Single KML document
      urls = [urls];
    }

    // Internal values for the set of documents as a whole
    var internals = {
      parser: this,
      docSet: docSet || [],
      remaining: urls.length,
      parseOnly: !(parserOptions.afterParse || parserOptions.processStyles)
    };
    var thisDoc, j;
    for (var i = 0; i < urls.length; i++) {
      var baseUrl = urls[i].split('?')[0];
      for (j = 0; j < docs.length; j++) {
        if (baseUrl === docs[j].baseUrl) {
          // Reloading an existing document
          thisDoc = docs[j];
          thisDoc.reload    = true;
          break;
        }
      }
      if (j >= docs.length) {
        thisDoc = new Object();
        thisDoc.baseUrl = baseUrl;
        internals.docSet.push(thisDoc);
      }
      thisDoc.url       = urls[i];
      thisDoc.internals = internals;
      fetchDoc(thisDoc.url, thisDoc);
    }
  };

  function fetchDoc(url, doc) {
      geoXML3.fetchXML(url, function (responseXML) { render(responseXML, doc);})
  }

  var hideDocument = function (doc) {
    if (!doc) doc = docs[0];
    // Hide the map objects associated with a document 
    var i;
    if (!!doc.markers) {
      for (i = 0; i < doc.markers.length; i++) {
        if(!!doc.markers[i].infoWindow) doc.markers[i].infoWindow.close();
        doc.markers[i].setVisible(false);
      }
    }
    if (!!doc.ggroundoverlays) {
      for (i = 0; i < doc.ggroundoverlays.length; i++) {
        doc.ggroundoverlays[i].setOpacity(0);
      }
    }
    if (!!doc.gpolylines) {
      for (i=0;i<doc.gpolylines.length;i++) {
        if(!!doc.gpolylines[i].infoWindow) doc.gpolylines[i].infoWindow.close();
        doc.gpolylines[i].setMap(null);
      }
    }
    if (!!doc.gpolygons) {
      for (i=0;i<doc.gpolygons.length;i++) {
        if(!!doc.gpolygons[i].infoWindow) doc.gpolygons[i].infoWindow.close();
        doc.gpolygons[i].setMap(null);
      }
    }
  };
  
  var showDocument = function (doc) {
    if (!doc) doc = docs[0];
    // Show the map objects associated with a document 
    var i;
    if (!!doc.markers) {
      for (i = 0; i < doc.markers.length; i++) {
        doc.markers[i].setVisible(true);
      }
    }
    if (!!doc.ggroundoverlays) {
      for (i = 0; i < doc.ggroundoverlays.length; i++) {
        doc.ggroundoverlays[i].setOpacity(doc.ggroundoverlays[i].percentOpacity_);
      }
    }
    if (!!doc.gpolylines) {
      for (i=0;i<doc.gpolylines.length;i++) {
        doc.gpolylines[i].setMap(parserOptions.map);
      }
    }
    if (!!doc.gpolygons) {
      for (i=0;i<doc.gpolygons.length;i++) {
        doc.gpolygons[i].setMap(parserOptions.map);
      }
    }
  };

var defaultStyle = {
  color: "ff000000", // black
  width: 1,
  fill: true,
  outline: true,
  fillcolor: "3fff0000" // blue
};

function processStyle(thisNode, styles, styleID) {
      var nodeValue  = geoXML3.nodeValue;
      styles[styleID] = styles[styleID] || clone(defaultStyle);
      var styleNodes = thisNode.getElementsByTagName('IconStyle');
      if (!!styleNodes && !!styleNodes.length && (styleNodes.length > 0)) {
        styles[styleID].scale = parseFloat(nodeValue(styleNodes[0].getElementsByTagName('scale')[0]));
      }
      if (isNaN(styles[styleID].scale)) styles[styleID].scale = 1.0;
      styleNodes = thisNode.getElementsByTagName('Icon');
      if (!!styleNodes && !!styleNodes.length && (styleNodes.length > 0)) {
        styles[styleID].href = nodeValue(styleNodes[0].getElementsByTagName('href')[0]);
      }
      styleNodes = thisNode.getElementsByTagName('LineStyle');
      if (!!styleNodes && !!styleNodes.length && (styleNodes.length > 0)) {
        styles[styleID].color = nodeValue(styleNodes[0].getElementsByTagName('color')[0]);
        styles[styleID].width = nodeValue(styleNodes[0].getElementsByTagName('width')[0]);
      }
      styleNodes = thisNode.getElementsByTagName('PolyStyle');
      if (!!styleNodes && !!styleNodes.length && (styleNodes.length > 0)) {
        styles[styleID].outline   = getBooleanValue(styleNodes[0].getElementsByTagName('outline')[0]);
        styles[styleID].fill      = getBooleanValue(styleNodes[0].getElementsByTagName('fill')[0]);
        styles[styleID].fillcolor = nodeValue(styleNodes[0].getElementsByTagName('color')[0]);
      }
      return styles[styleID];
}

// from http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-a-javascript-object
// http://keithdevens.com/weblog/archive/2007/Jun/07/javascript.clone
  function clone(obj){
      if(obj == null || typeof(obj) != 'object') return obj;
      var temp = new obj.constructor(); 
      for(var key in obj) temp[key] = clone(obj[key]);
      return temp;
  }

function processStyleMap(thisNode, styles, styleID) {
  var nodeValue  = geoXML3.nodeValue;
  var pairs = thisNode.getElementsByTagName('Pair');
  var map = new Object();
  // add each key to the map
  for (var pr=0;pr<pairs.length;pr++) {
    var pairkey = nodeValue(pairs[pr].getElementsByTagName('key')[0]);
    var pairstyle = nodeValue(pairs[pr].getElementsByTagName('Style')[0]);
    var pairstyleurl = nodeValue(pairs[pr].getElementsByTagName('styleUrl')[0]);
    if (!!pairstyle) {
      processStyle(pairstyle, map[pairkey], styleID);
    } else if (!!pairstyleurl && !!styles[pairstyleurl]) {
      map[pairkey] = clone(styles[pairstyleurl]);
    }
  }
  if (!!map["normal"]) {
    styles[styleID] = clone(map["normal"]);
  } else {
    styles[styleID] =  clone(defaultStyle);
  }      
  if (!!map["highlight"]) {
    processStyleID(map["highlight"]);
  }
  styles[styleID].map = clone(map);
}

function getBooleanValue(node) {
  var nodeContents = geoXML3.nodeValue(node);
  if (!nodeContents) return true;
  if (nodeContents) nodeContents = parseInt(nodeContents);
  if (isNaN(nodeContents)) return true;
  if (nodeContents == 0) return false;
  else return true;
}   

function processPlacemarkCoords(node, tag) {
   var parent = node.getElementsByTagName(tag);
var coordListA = [];
  for (var i=0; i<parent.length; i++) {
  var coordNodes = parent[i].getElementsByTagName('coordinates')
  if (!coordNodes) {
    if (coordListA.length > 0) {
      break;
    } else {
      return [{coordinates: []}];
    }
  }

  for (var j=0; j<coordNodes.length;j++) { 
    var coords = geoXML3.nodeValue(coordNodes[j]).trim();
    coords = coords.replace(/,\s+/g, ',');
    var path = coords.split(/\s+/g);
    var pathLength = path.length;
    var coordList = [];
    for (var k = 0; k < pathLength; k++) {
      coords = path[k].split(',');
      if (!isNaN(coords[0]) && !isNaN(coords[1])) {
        coordList.push({
          lat: parseFloat(coords[1]), 
          lng: parseFloat(coords[0]), 
          alt: parseFloat(coords[2])
        });
      }
    }
    coordListA.push({coordinates: coordList});
  }
}
  return coordListA;
}

  var render = function (responseXML, doc) {
    // Callback for retrieving a KML document: parse the KML and display it on the map
    if (!responseXML) {
      // Error retrieving the data
      geoXML3.log('Unable to retrieve ' + doc.url);
      if (parserOptions.failedParse) {
        parserOptions.failedParse(doc);
      }
    } else if (!doc) {
      throw 'geoXML3 internal error: render called with null document';
    } else { //no errors
      var i;
      var styles = {};
      doc.placemarks     = [];
      doc.groundoverlays = [];
      doc.ggroundoverlays = [];
      doc.networkLinks   = [];
      doc.gpolygons      = [];
      doc.gpolylines     = [];

    // Declare some helper functions in local scope for better performance
    var nodeValue  = geoXML3.nodeValue;

    // Parse styles
    var styleID, styleNodes;
    nodes = responseXML.getElementsByTagName('Style');
    nodeCount = nodes.length;
    for (i = 0; i < nodeCount; i++) {
      thisNode = nodes[i];
      var thisNodeId = thisNode.getAttribute('id');
      if (!!thisNodeId) {
        styleID    = '#' + thisNodeId;
        processStyle(thisNode, styles, styleID);
      }
    }
    // rudamentary support for StyleMap
    // use "normal" mapping only
    nodes = responseXML.getElementsByTagName('StyleMap');
    for (i = 0; i < nodes.length; i++) {
      thisNode = nodes[i];
      var thisNodeId = thisNode.getAttribute('id');
      if (!!thisNodeId) {
        styleID    = '#' + thisNodeId;
	processStyleMap(thisNode, styles, styleID);
      }
    }
    doc.styles = styles;
      if (!!parserOptions.processStyles || !parserOptions.createMarker) {
        // Convert parsed styles into GMaps equivalents
        processStyles(doc);
      }
      
      // Parse placemarks
      if (!!doc.reload && !!doc.markers) {
        for (i = 0; i < doc.markers.length; i++) {
          doc.markers[i].active = false;
        }
      }
      var placemark, node, coords, path, marker, poly;
      var placemark, coords, path, pathLength, marker, polygonNodes, coordList;
      var placemarkNodes = responseXML.getElementsByTagName('Placemark');
      for (pm = 0; pm < placemarkNodes.length; pm++) {
        // Init the placemark object
        node = placemarkNodes[pm];
        placemark = {
          name:  geoXML3.nodeValue(node.getElementsByTagName('name')[0]),
          building:  geoXML3.nodeValue(node.getElementsByTagName('building')[0]),
          description: geoXML3.nodeValue(node.getElementsByTagName('description')[0]),
          styleUrl: geoXML3.nodeValue(node.getElementsByTagName('styleUrl')[0])
        };
        placemark.style = doc.styles[placemark.styleUrl] || clone(defaultStyle);
        // inline style overrides shared style
        var inlineStyles = node.getElementsByTagName('Style');
        if (inlineStyles && (inlineStyles.length > 0)) {
          var style = processStyle(node,doc.styles,"inline");
	  processStyleID(style);
	  if (style) placemark.style = style;
        }
        if (/^https?:\/\//.test(placemark.description)) {
          placemark.description = ['<a href="', placemark.description, '">', placemark.description, '</a>'].join('');
        }

        // process MultiGeometry
        var GeometryNodes = node.getElementsByTagName('coordinates');
        var Geometry = null;
	if (!!GeometryNodes && (GeometryNodes.length > 0)) {
          for (var gn=0;gn<GeometryNodes.length;gn++) {
             if (!GeometryNodes[gn].parentNode ||
                 !GeometryNodes[gn].parentNode.nodeName) {

             } else { // parentNode.nodeName exists
               var GeometryPN = GeometryNodes[gn].parentNode;
               Geometry = GeometryPN.nodeName;
       
        // Extract the coordinates
        // What sort of placemark?
        switch(Geometry) {
          case "Point":
            placemark.Point = processPlacemarkCoords(node, "Point")[0]; 
            placemark.latlng = new google.maps.LatLng(placemark.Point.coordinates[0].lat, placemark.Point.coordinates[0].lng);
            pathLength = 1;
            break;
          case "LinearRing":
            // Polygon/line
            polygonNodes = node.getElementsByTagName('Polygon');
            // Polygon
            if (!placemark.Polygon)
              placemark.Polygon = [{
                outerBoundaryIs: {coordinates: []},
                innerBoundaryIs: [{coordinates: []}]
              }];
            for (var pg=0;pg<polygonNodes.length;pg++) {
               placemark.Polygon[pg] = {
                 outerBoundaryIs: {coordinates: []},
                 innerBoundaryIs: [{coordinates: []}]
               }
               placemark.Polygon[pg].outerBoundaryIs = processPlacemarkCoords(polygonNodes[pg], "outerBoundaryIs");
               placemark.Polygon[pg].innerBoundaryIs = processPlacemarkCoords(polygonNodes[pg], "innerBoundaryIs");
            }
            coordList = placemark.Polygon[0].outerBoundaryIs;
            break;

          case "LineString":
            pathLength = 0;
            placemark.LineString = processPlacemarkCoords(node,"LineString");
            break;

          default:
            break;
      }
      } // parentNode.nodeName exists
      } // GeometryNodes loop
      } // if GeometryNodes 
      // call the custom placemark parse function if it is defined
      if (!!parserOptions.pmParseFn) parserOptions.pmParseFn(node, placemark);
      doc.placemarks.push(placemark);
      
      if (placemark.Point) {
          if (!!google.maps) {
            doc.bounds = doc.bounds || new google.maps.LatLngBounds();
            doc.bounds.extend(placemark.latlng);
          }

          if (!!parserOptions.createMarker) {
            // User-defined marker handler
            parserOptions.createMarker(placemark, doc);
          } else { // !user defined createMarker
            // Check to see if this marker was created on a previous load of this document
            var found = false;
            if (!!doc) {
              doc.markers = doc.markers || [];
              if (doc.reload) {
                for (var j = 0; j < doc.markers.length; j++) {
                  if (doc.markers[j].getPosition().equals(placemark.latlng)) {
                    found = doc.markers[j].active = true;
                    break;
                  }
                }
              } 
            }

            if (!found) {
              // Call the built-in marker creator
              marker = createMarker(placemark, doc);
              marker.active = true;
            }
          }
        }
        if (placemark.Polygon) { // poly test 2
            if (!!doc) {
              doc.gpolygons = doc.gpolygons || [];
            }

            if (!!parserOptions.createPolygon) {
              // User-defined polygon handler
              poly = parserOptions.createPolygon(placemark, doc);
            } else {  // ! user defined createPolygon
              // Check to see if this marker was created on a previous load of this document
              poly = createPolygon(placemark,doc);
              poly.active = true;
            }
          if (!!google.maps) {
            doc.bounds = doc.bounds || new google.maps.LatLngBounds();
            doc.bounds.union(poly.bounds);
          }
          } 
          if (placemark.LineString) { // polyline
            if (!!doc) {
              doc.gpolylines = doc.gpolylines || [];
            }
            if (!!parserOptions.createPolyline) {
              // User-defined polyline handler
              poly = parserOptions.createPolyline(placemark, doc);
            } else { // ! user defined createPolyline
              // Check to see if this marker was created on a previous load of this document
              poly = createPolyline(placemark,doc);
              poly.active = true;
            }
          if (!!google.maps) {
            doc.bounds = doc.bounds || new google.maps.LatLngBounds();
            doc.bounds.union(poly.bounds);
          }
          }
          
      } // placemark loop

      if (!!doc.reload && !!doc.markers) {
        for (i = doc.markers.length - 1; i >= 0 ; i--) {
          if (!doc.markers[i].active) {
            if (!!doc.markers[i].infoWindow) {
              doc.markers[i].infoWindow.close();
            }
            doc.markers[i].setMap(null);
            doc.markers.splice(i, 1);
          }
        }
      }

      // Parse ground overlays
      if (!!doc.reload && !!doc.groundoverlays) {
        for (i = 0; i < doc.groundoverlays.length; i++) {
          doc.groundoverlays[i].active = false;
        }
      }

      if (!!doc) {
        doc.groundoverlays = doc.groundoverlays || [];
      }
      // doc.groundoverlays =[];
      var groundOverlay, color, transparency, overlay;
      var groundNodes = responseXML.getElementsByTagName('GroundOverlay');
      for (i = 0; i < groundNodes.length; i++) {
        node = groundNodes[i];
        
        // Init the ground overlay object
        groundOverlay = {
          name:        geoXML3.nodeValue(node.getElementsByTagName('name')[0]),
          description: geoXML3.nodeValue(node.getElementsByTagName('description')[0]),
          icon: {href: geoXML3.nodeValue(node.getElementsByTagName('href')[0])},
          latLonBox: {
            north: parseFloat(geoXML3.nodeValue(node.getElementsByTagName('north')[0])),
            east:  parseFloat(geoXML3.nodeValue(node.getElementsByTagName('east')[0])),
            south: parseFloat(geoXML3.nodeValue(node.getElementsByTagName('south')[0])),
            west:  parseFloat(geoXML3.nodeValue(node.getElementsByTagName('west')[0]))
          }
        };
        if (!!google.maps) {
          doc.bounds = doc.bounds || new google.maps.LatLngBounds();
          doc.bounds.union(new google.maps.LatLngBounds(
            new google.maps.LatLng(groundOverlay.latLonBox.south, groundOverlay.latLonBox.west),
            new google.maps.LatLng(groundOverlay.latLonBox.north, groundOverlay.latLonBox.east)
          ));
        }

      // Opacity is encoded in the color node
      var colorNode = node.getElementsByTagName('color');
      if ( colorNode && colorNode.length && (colorNode.length > 0)) {
        groundOverlay.opacity = geoXML3.getOpacity(nodeValue(colorNode[0]));
      } else {
        groundOverlay.opacity = 0.45;
      }

      doc.groundoverlays.push(groundOverlay);
  
        if (!!parserOptions.createOverlay) {
          // User-defined overlay handler
          parserOptions.createOverlay(groundOverlay, doc);
        } else { // ! user defined createOverlay
          // Check to see if this overlay was created on a previous load of this document
          var found = false;
          if (!!doc) {
            doc.groundoverlays = doc.groundoverlays || [];
            if (doc.reload) {
              overlayBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(groundOverlay.latLonBox.south, groundOverlay.latLonBox.west),
                new google.maps.LatLng(groundOverlay.latLonBox.north, groundOverlay.latLonBox.east));
            var overlays = doc.groundoverlays;
            for (i = overlays.length; i--;) {
              if ((overlays[i].bounds().equals(overlayBounds)) &&
                  (overlays.url_ === groundOverlay.icon.href)) {
                found = overlays[i].active = true;
                break;
              }
            }
          } 
        }
  
          if (!found) {
            // Call the built-in overlay creator
            overlay = createOverlay(groundOverlay, doc);
            overlay.active = true;
          }
        }
    if (!!doc.reload && !!doc.groundoverlays && !!doc.groundoverlays.length) {
      var overlays = doc.groundoverlays;
      for (i = overlays.length; i--;) {
        if (!overlays[i].active) {
          overlays[i].remove();
          overlays.splice(i, 1);
          }
      }
      doc.groundoverlays = overlays;
    }
      }
      // Parse network links
      var networkLink;
      var docPath = document.location.pathname.split('/');
      docPath = docPath.splice(0, docPath.length - 1).join('/');
      var linkNodes = responseXML.getElementsByTagName('NetworkLink');
      for (i = 0; i < linkNodes.length; i++) {
        node = linkNodes[i];
        
        // Init the network link object
        networkLink = {
          name: geoXML3.nodeValue(node.getElementsByTagName('name')[0]),
          link: {
            href:        geoXML3.nodeValue(node.getElementsByTagName('href')[0]),
            refreshMode:     geoXML3.nodeValue(node.getElementsByTagName('refreshMode')[0])
          }
        };
        
        // Establish the specific refresh mode 
        if (networkLink.link.refreshMode === '') {
          networkLink.link.refreshMode = 'onChange';
        }
        if (networkLink.link.refreshMode === 'onInterval') {
          networkLink.link.refreshInterval = parseFloat(geoXML3.nodeValue(node.getElementsByTagName('refreshInterval')[0]));
          if (isNaN(networkLink.link.refreshInterval)) {
            networkLink.link.refreshInterval = 0;
          }
        } else if (networkLink.link.refreshMode === 'onChange') {
          networkLink.link.viewRefreshMode = geoXML3.nodeValue(node.getElementsByTagName('viewRefreshMode')[0]);
          if (networkLink.link.viewRefreshMode === '') {
            networkLink.link.viewRefreshMode = 'never';
          }
          if (networkLink.link.viewRefreshMode === 'onStop') {
            networkLink.link.viewRefreshTime = geoXML3.nodeValue(node.getElementsByTagName('refreshMode')[0]);
            networkLink.link.viewFormat =      geoXML3.nodeValue(node.getElementsByTagName('refreshMode')[0]);
            if (networkLink.link.viewFormat === '') {
              networkLink.link.viewFormat = 'BBOX=[bboxWest],[bboxSouth],[bboxEast],[bboxNorth]';
            }
          }
        }

        if (!/^[\/|http]/.test(networkLink.link.href)) {
          // Fully-qualify the HREF
          networkLink.link.href = docPath + '/' + networkLink.link.href;
        }

        // Apply the link
        if ((networkLink.link.refreshMode === 'onInterval') && 
            (networkLink.link.refreshInterval > 0)) {
          // Reload at regular intervals
          setInterval(parserName + '.parse("' + networkLink.link.href + '")', 
                      1000 * networkLink.link.refreshInterval); 
        } else if (networkLink.link.refreshMode === 'onChange') {
          if (networkLink.link.viewRefreshMode === 'never') {
            // Load the link just once
            doc.internals.parser.parse(networkLink.link.href, doc.internals.docSet);
          } else if (networkLink.link.viewRefreshMode === 'onStop') {
            // Reload when the map view changes
            
          }
        }
      }
}

      if (!!doc.bounds) {
        doc.internals.bounds = doc.internals.bounds || new google.maps.LatLngBounds();
        doc.internals.bounds.union(doc.bounds); 
      }
      if (!!doc.markers || !!doc.groundoverlays || !!doc.gpolylines || !!doc.gpolygons) {
        doc.internals.parseOnly = false;
      }

      doc.internals.remaining -= 1;
      if (doc.internals.remaining === 0) {
        // We're done processing this set of KML documents
        // Options that get invoked after parsing completes
        if (parserOptions.zoom && !!doc.internals.bounds && !!parserOptions.map) {
          parserOptions.map.fitBounds(doc.internals.bounds); 
        }
        if (parserOptions.afterParse) {
          parserOptions.afterParse(doc.internals.docSet);
        }

        if (!doc.internals.parseOnly) {
          // geoXML3 is not being used only as a real-time parser, so keep the processed documents around
            for (var i=0;i<doc.internals.docSet.length;i++) {
              docs.push(doc.internals.docSet[i]);
            }
        }
      }
  };

var kmlColor = function (kmlIn) {
  var kmlColor = {};
  if (kmlIn) {
   aa = kmlIn.substr(0,2);
   bb = kmlIn.substr(2,2);
   gg = kmlIn.substr(4,2);
   rr = kmlIn.substr(6,2);
   kmlColor.color = "#" + rr + gg + bb;
   kmlColor.opacity = parseInt(aa,16)/256;
  } else {
   // defaults
   kmlColor.color = randomColor();
   kmlColor.opacity = 0.45;
  }
  return kmlColor;
}

var randomColor = function(){ 
  var color="#";
  var colorNum = Math.random()*8388607.0;  // 8388607 = Math.pow(2,23)-1
  var colorStr = colorNum.toString(16);
  color += colorStr.substring(0,colorStr.indexOf('.'));
  return color;
};

  var processStyleID = function (style) {
      var zeroPoint = new google.maps.Point(0,0);
      if (!!style.href) {
        var markerRegEx = /\/(red|blue|green|yellow|lightblue|purple|pink|orange|pause|go|stop)(-dot)?\.png/;
        if (markerRegEx.test(style.href)) {
         //bottom middle
	  var anchorPoint = new google.maps.Point(16*style.scale, 32*style.scale);
	} else {
	  var anchorPoint = new google.maps.Point(16*style.scale, 16*style.scale);
	}
        // Init the style object with a standard KML icon
        style.icon =  new google.maps.MarkerImage(
          style.href,
          new google.maps.Size(32*style.scale, 32*style.scale),
          zeroPoint,
          // bottom middle 
          anchorPoint,
          new google.maps.Size(32*style.scale, 32*style.scale)

        );

        // Look for a predictable shadow
        var stdRegEx = /\/(red|blue|green|yellow|lightblue|purple|pink|orange)(-dot)?\.png/;
        var shadowSize = new google.maps.Size(59, 32);
	var shadowPoint = new google.maps.Point(16,32);
        if (stdRegEx.test(style.href)) {
          // A standard GMap-style marker icon
          style.shadow = new google.maps.MarkerImage(
              'http://maps.google.com/mapfiles/ms/micons/msmarker.shadow.png',
              shadowSize,
              zeroPoint,
              shadowPoint,
              shadowSize);
        } else if (style.href.indexOf('-pushpin.png') > -1) {
          // Pushpin marker icon
          style.shadow = new google.maps.MarkerImage(
            'http://maps.google.com/mapfiles/ms/micons/pushpin_shadow.png',
            shadowSize,
            zeroPoint,
            shadowPoint,
            shadowSize);
        } else {
          // Other MyMaps KML standard icon
          style.shadow = new google.maps.MarkerImage(
            style.href.replace('.png', '.shadow.png'),	      		   
            shadowSize,	   					   
            zeroPoint,					
            shadowPoint,
            shadowSize);
        }
      }
  }
    
  var processStyles = function (doc) {
    for (var styleID in doc.styles) {
      processStyleID(doc.styles[styleID]);
    }
  };

  var createMarker = function (placemark, doc) {
    // create a Marker to the map from a placemark KML object

    // Load basic marker properties
    var markerOptions = geoXML3.combineOptions(parserOptions.markerOptions, {
      map:      parserOptions.map,
      position: new google.maps.LatLng(placemark.Point.coordinates[0].lat, placemark.Point.coordinates[0].lng),
      title:    placemark.name,
      zIndex:   Math.round(placemark.Point.coordinates[0].lat * -100000)<<5,
      icon:     placemark.style.icon,
      shadow:   placemark.style.shadow 
    });
  
    // Create the marker on the map
    var marker = new google.maps.Marker(markerOptions);
    if (!!doc) {
      doc.markers.push(marker);
    }

    // Set up and create the infowindow if it is not suppressed
    if (!parserOptions.suppressInfoWindows) {
      var infoWindowOptions = geoXML3.combineOptions(parserOptions.infoWindowOptions, {
        content: '<span class="maplabel">' + placemark.name + 
                 '</span><span class="mapinfo">' + placemark.description + '</span>',
        pixelOffset: new google.maps.Size(0, 2)
      });
      if (parserOptions.infoWindow) {
        marker.infoWindow = parserOptions.infoWindow;
      } else {
        marker.infoWindow = new google.maps.InfoWindow(infoWindowOptions);
      }
      marker.infoWindowOptions = infoWindowOptions;
      
      // Infowindow-opening event handler
      google.maps.event.addListener(marker, 'click', function() {
        this.infoWindow.close();
        marker.infoWindow.setOptions(this.infoWindowOptions);
        this.infoWindow.open(this.map, this);
      });
    }
    placemark.marker = marker;
    return marker;
  };
  
  var createOverlay = function (groundOverlay, doc) {
    // Add a ProjectedOverlay to the map from a groundOverlay KML object

    if (!window.ProjectedOverlay) {
      throw 'geoXML3 error: ProjectedOverlay not found while rendering GroundOverlay from KML';
    }

    var bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(groundOverlay.latLonBox.south, groundOverlay.latLonBox.west),
        new google.maps.LatLng(groundOverlay.latLonBox.north, groundOverlay.latLonBox.east)
    );
    var overlayOptions = geoXML3.combineOptions(parserOptions.overlayOptions, {percentOpacity: groundOverlay.opacity*100});
    var overlay = new ProjectedOverlay(parserOptions.map, groundOverlay.icon.href, bounds, overlayOptions);
    
    if (!!doc) {
      doc.ggroundoverlays = doc.ggroundoverlays || [];
      doc.ggroundoverlays.push(overlay);
    }

    return overlay;
  };

// Create Polyline
var createPolyline = function(placemark, doc) {
  var path = [];
  for (var j=0; j<placemark.LineString.length; j++) {
    var coords = placemark.LineString[j].coordinates;
    var bounds = new google.maps.LatLngBounds();
    for (var i=0;i<coords.length;i++) {
      var pt = new google.maps.LatLng(coords[i].lat, coords[i].lng);
      path.push(pt);
      bounds.extend(pt);
    }
  }
  // point to open the infowindow if triggered 
  var point = path[Math.floor(path.length/2)];
  // Load basic polyline properties
  var kmlStrokeColor = kmlColor(placemark.style.color);
  var polyOptions = geoXML3.combineOptions(parserOptions.polylineOptions, {
    map:      parserOptions.map,
    path: path,
    strokeColor: kmlStrokeColor.color,
    strokeWeight: placemark.style.width,
    strokeOpacity: kmlStrokeColor.opacity,
    title:    placemark.name
  });
  var p = new google.maps.Polyline(polyOptions);
  p.bounds = bounds;
  // setup and create the infoWindow if it is not suppressed
  if (!parserOptions.suppressInfoWindows) {
            var infoWindowOptions = geoXML3.combineOptions(parserOptions.infoWindowOptions, {
             content: '<span class="maplabel">' + placemark.name +
             '</span><span class="mapinfo">' + placemark.description + '</span>',
             pixelOffset: new google.maps.Size(0, 2)
    });
    if (parserOptions.infoWindow) {
      p.infoWindow = parserOptions.infoWindow;
    } else {
      p.infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    }
    p.infoWindowOptions = infoWindowOptions;
    // Infowindow-opening event handler
    google.maps.event.addListener(p, 'click', function(e) {
      p.infoWindow.close();
      p.infoWindow.setOptions(p.infoWindowOptions);
      if (e && e.latLng) {
        p.infoWindow.setPosition(e.latLng);
      } else {
        p.infoWindow.setPosition(point);
      }
      p.infoWindow.open(this.map);
    });
  }
  if (!!doc) doc.gpolylines.push(p);
  placemark.polyline = p;
  return p;
}

// Create Polygon
var createPolygon = function(placemark, doc) {
  var bounds = new google.maps.LatLngBounds();
  var pathsLength = 0;
  var paths = [];
  for (var polygonPart=0;polygonPart<placemark.Polygon.length;polygonPart++) {
    for (var j=0; j<placemark.Polygon[polygonPart].outerBoundaryIs.length; j++) {
      var coords = placemark.Polygon[polygonPart].outerBoundaryIs[j].coordinates;
      var path = [];
      for (var i=0;i<coords.length;i++) {
        var pt = new google.maps.LatLng(coords[i].lat, coords[i].lng);
        path.push(pt);
        bounds.extend(pt);
      }
      paths.push(path);
      pathsLength += path.length;
    }
    for (var j=0; j<placemark.Polygon[polygonPart].innerBoundaryIs.length; j++) {
      var coords = placemark.Polygon[polygonPart].innerBoundaryIs[j].coordinates;
      var path = [];
      for (var i=0;i<coords.length;i++) {
        var pt = new google.maps.LatLng(coords[i].lat, coords[i].lng);
        path.push(pt);
        bounds.extend(pt);
      }
      paths.push(path);
      pathsLength += path.length;
    }
  }

  // Load basic polygon properties
  var kmlStrokeColor = kmlColor(placemark.style.color);
  var kmlFillColor = kmlColor(placemark.style.fillcolor);
  if (!placemark.style.fill) kmlFillColor.opacity = 0.0;
  var strokeWeight = placemark.style.width;
  if (!placemark.style.outline) {
    strokeWeight = 0;
    kmlStrokeColor.opacity = 0.0;
  }
  var polyOptions = geoXML3.combineOptions(parserOptions.polygonOptions, {
    map:      parserOptions.map,
    paths:    paths,
    title:    placemark.name,
    strokeColor: kmlStrokeColor.color,
    strokeWeight: strokeWeight,
    strokeOpacity: kmlStrokeColor.opacity,
    fillColor: kmlFillColor.color,
    fillOpacity: kmlFillColor.opacity
  });
  var p = new google.maps.Polygon(polyOptions);
  p.bounds = bounds;
  if (!parserOptions.suppressInfoWindows) {
            var infoWindowOptions = geoXML3.combineOptions(parserOptions.infoWindowOptions, {
            content: '<span class="maplabel">' + placemark.name +
            '</span><span class="mapinfo">' + placemark.description + '</span>',
            pixelOffset: new google.maps.Size(0, 2)

    });
    if (parserOptions.infoWindow) {
      p.infoWindow = parserOptions.infoWindow;
    } else {
      p.infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    }
    p.infoWindowOptions = infoWindowOptions;
    // Infowindow-opening event handler
    google.maps.event.addListener(p, 'click', function(e) {
      p.infoWindow.close();
      p.infoWindow.setOptions(p.infoWindowOptions);
      if (e && e.latLng) {
        p.infoWindow.setPosition(e.latLng);
      } else {
        p.infoWindow.setPosition(p.bounds.getCenter());
      }
      p.infoWindow.open(this.map);
    });
  }
  if (!!doc) doc.gpolygons.push(p);
  placemark.polygon = p;
  return p;
}

  return {
    // Expose some properties and methods

    options: parserOptions,
    docs:    docs,
    
    parse:          parse,
    parseKmlString: parseKmlString,
    hideDocument:   hideDocument,
    showDocument:   showDocument,
    processStyles:  processStyles, 
    createMarker:   createMarker,
    createOverlay:  createOverlay,
    createPolyline: createPolyline,
    createPolygon:  createPolygon
  };
};
// End of KML Parser

// Helper objects and functions
geoXML3.getOpacity = function (kmlColor) {
  // Extract opacity encoded in a KML color value. Returns a number between 0 and 1.
  if (!!kmlColor &&
      (kmlColor !== '') &&
      (kmlColor.length == 8)) {
    var transparency = parseInt(kmlColor.substr(0, 2), 16);
    return transparency / 255;
  } else {
    return 1;
  }
};

// Log a message to the debugging console, if one exists
geoXML3.log = function(msg) {
  if (!!window.console) {
    console.log(msg);
  } else { alert("log:"+msg); }
};

// Combine two options objects: a set of default values and a set of override values 
geoXML3.combineOptions = function (overrides, defaults) {
  var result = {};
  if (!!overrides) {
    for (var prop in overrides) {
      if (overrides.hasOwnProperty(prop)) {
        result[prop] = overrides[prop];
      }
    }
  }
  if (!!defaults) {
    for (prop in defaults) {
      if (defaults.hasOwnProperty(prop) && (result[prop] === undefined)) {
        result[prop] = defaults[prop];
      }
    }
  }
  return result;
};

// Retrieve an XML document from url and pass it to callback as a DOM document
geoXML3.fetchers = [];

// parse text to XML doc
/**
 * Parses the given XML string and returns the parsed document in a
 * DOM data structure. This function will return an empty DOM node if
 * XML parsing is not supported in this browser.
 * @param {string} str XML string.
 * @return {Element|Document} DOM.
 */
geoXML3.xmlParse = function (str) {
  if (typeof ActiveXObject != 'undefined' && typeof GetObject != 'undefined') {
    var doc = new ActiveXObject('Microsoft.XMLDOM');
    doc.loadXML(str);
    return doc;
  }

  if (typeof DOMParser != 'undefined') {
    return (new DOMParser()).parseFromString(str, 'text/xml');
  }

  return createElement('div', null);
}

geoXML3.fetchXML = function (url, callback) {
  function timeoutHandler() {
    callback();
  };

  var xhrFetcher = new Object();
  if (!!geoXML3.fetchers.length) {
    xhrFetcher = geoXML3.fetchers.pop();
  } else {
    if (!!window.XMLHttpRequest) {
      xhrFetcher.fetcher = new window.XMLHttpRequest(); // Most browsers
    } else if (!!window.ActiveXObject) {
      xhrFetcher.fetcher = new window.ActiveXObject('Microsoft.XMLHTTP'); // Some IE
    }
  }

  if (!xhrFetcher.fetcher) {
    geoXML3.log('Unable to create XHR object');
    callback(null);
  } else {
      if (xhrFetcher.fetcher.overrideMimeType) {
        xhrFetcher.fetcher.overrideMimeType('text/xml');
      }
      xhrFetcher.fetcher.open('GET', url, true);
      xhrFetcher.fetcher.onreadystatechange = function () {
      if (xhrFetcher.fetcher.readyState === 4) {
        // Retrieval complete
        if (!!xhrFetcher.xhrtimeout)
          clearTimeout(xhrFetcher.xhrtimeout);
        if (xhrFetcher.fetcher.status >= 400) {
          geoXML3.log('HTTP error ' + xhrFetcher.fetcher.status + ' retrieving ' + url);
          callback();
        } else {
          // Returned successfully
	    callback(geoXML3.xmlParse(xhrFetcher.fetcher.responseText));
        }
        // We're done with this fetcher object
        geoXML3.fetchers.push(xhrFetcher);
      }
    };
    xhrFetcher.xhrtimeout = setTimeout(timeoutHandler, 60000);
    xhrFetcher.fetcher.send(null);
  }
};

//nodeValue: Extract the text value of a DOM node, with leading and trailing whitespace trimmed
geoXML3.nodeValue = function(node) {
  var retStr="";
  if (!node) {
    return '';
  }
   if(node.nodeType==3||node.nodeType==4||node.nodeType==2){
      retStr+=node.nodeValue;
   }else if(node.nodeType==1||node.nodeType==9||node.nodeType==11){
      for(var i=0;i<node.childNodes.length;++i){
         retStr+=arguments.callee(node.childNodes[i]);
      }
   }
   return retStr;
};

redirectMouseToTouch = function(type, originalEvent) 
{

    //stop propagation, and remove default behavior for everything but INPUT, TEXTAREA & SELECT fields
    // originalEvent.stopPropagation();
    if (originalEvent.target.tagName.toUpperCase().indexOf("SELECT") == -1 && 
    originalEvent.target.tagName.toUpperCase().indexOf("TEXTAREA") == -1 && 
    originalEvent.target.tagName.toUpperCase().indexOf("INPUT") == -1)  //SELECT, TEXTAREA & INPUT
    {
        //if(type != 'touchstart')
        //originalEvent.stopPropagation();//originalEvent.preventDefault();
        //else
        //originalEvent.preventDefault();
        originalEvent.stopPropagation();
    }
    
    var touchevt = document.createEvent("Event");
    touchevt.initEvent(type, true, true);
    touchevt.touches = new Array();
    touchevt.touches[0] = new Object();
    touchevt.touches[0].pageX = originalEvent.pageX;
    touchevt.touches[0].pageY = originalEvent.pageY;
    touchevt.touches[0].target = originalEvent.target;
    touchevt.changedTouches = touchevt.touches; //for jqtouch
    touchevt.targetTouches = touchevt.touches; //for jqtouch
    touchevt.target = originalEvent.target;
    originalEvent.target.dispatchEvent(touchevt);
    return touchevt;
}

emulateTouchEvents = function() 
{
    var ee = document;

    document.mouseMoving = false;
    
    
    document.addEventListener("mousedown", function(e) 
    {
        try 
        {
            this.mouseMoving = true;
            var touchevt = redirectMouseToTouch("touchstart", e);
            if (document.ontouchstart)
                document.ontouchstart(touchevt);
            if(e.target.ontouchstart)
                e.target.ontouchstart(e);
            
        } catch (e) {
        }
    });

    //ee[x].onmouseup=function(e)
    document.addEventListener("mouseup", function(e) 
    {
        try 
        {
            this.mouseMoving = false;

            var touchevt = redirectMouseToTouch("touchend", e);
            if (document.ontouchend)
                document.ontouchend(touchevt);
            if(e.target.ontouchend)
                e.target.ontouchend(e);
        } 
        catch (e) {
        }
    });
    //ee[x].onmousemove=function(e)
    document.addEventListener("mousemove", function(e) 
    {
        try 
        {
            if (!this.mouseMoving)
                return
            var touchevt = redirectMouseToTouch("touchmove", e);
            if (document.ontouchmove)
                document.ontouchmove(touchevt);
            if(e.target.ontouchmove)
                e.target.ontouchmove(e);
        } 
        catch (e) {
        }
    });
// }
}
emulateTouchEvents();
window.addEventListener("resize",function(){
var touchevt = document.createEvent("Event");
 touchevt.initEvent("orientationchange", true, true);
    document.dispatchEvent(touchevt);
},false);




	var row = 'odd';
    var row = 'even';


	$.fn.weatherfeed = function(locations, options) {

		// Set pluign defaults
		var defaults = {
			unit: 'f',
			image: true,
			highlow: true,
			wind: true,
			link: true,
			showerror: false
		};
		var options = $.extend(defaults, options);

		// Functions
		return this.each(function(i, e) {
			var $e = $(e);

			// Add feed class to user div
			if (!$e.hasClass('weatherFeed')) $e.addClass('weatherFeed');

			// Check and append locations
			if (!$.isArray(locations)) return false;
			var count = locations.length;
			if (count > 10) count = 10;
			var locationid = '';
			for (var i=0; i<count; i++) {
				if (locationid != '') locationid += ',';
				locationid += "'"+ locations[i] + "'";
			}

			// Cache results for an hour to prevent overuse
			now = new Date()

			// Create Yahoo Weather feed API address
			var query = "select * from weather.forecast where location in ("+ locationid +") and u='"+ options.unit +"'";
			var api = 'http://query.yahooapis.com/v1/public/yql?q='+ encodeURIComponent(query) +'&rnd='+ now.getFullYear() + now.getMonth() + now.getDay() + now.getHours() +'&format=json&callback=?';

			// Send request
			//$.getJSON(api, function(data) {
			$.ajax({
				type: 'GET',
				url: api,
				dataType: 'json',
				success: function(data) {

					if (data.query) {

						if (data.query.results.channel.length > 0 ) {

							// Multiple locations
							var result = data.query.results.channel.length;
							for (var i=0; i<result; i++) {

								// Create weather feed item
								_callback(e, data.query.results.channel[i], options);
							}
						} else {

							// Single location only
							_callback(e, data.query.results.channel, options);
						}
					} else {
						if (options.showerror) $e.html('<p>Weather information unavailable</p>');
					}
				},
				error: function(data) {
					if (options.showerror)  $e.html('<p>Weather request failed</p>');
				}
			});

		});
	};

	// Function to each feed item
	var _callback = function(e, feed, options) {
		var $e = $(e);

		// Format feed items
		var wd = feed.wind.direction;
		if (wd>=348.75&&wd<=360){wd="N"};if(wd>=0&&wd<11.25){wd="N"};if(wd>=11.25&&wd<33.75){wd="NNE"};if(wd>=33.75&&wd<56.25){wd="NE"};if(wd>=56.25&&wd<78.75){wd="ENE"};if(wd>=78.75&&wd<101.25){wd="E"};if(wd>=101.25&&wd<123.75){wd="ESE"};if(wd>=123.75&&wd<146.25){wd="SE"};if(wd>=146.25&&wd<168.75){wd="SSE"};if(wd>=168.75&&wd<191.25){wd="S"};if(wd>=191.25 && wd<213.75){wd="SSW"};if(wd>=213.75&&wd<236.25){wd="SW"};if(wd>=236.25&&wd<258.75){wd="WSW"};if(wd>=258.75 && wd<281.25){wd="W"};if(wd>=281.25&&wd<303.75){wd="WNW"};if(wd>=303.75&&wd<326.25){wd="NW"};if(wd>=326.25&&wd<348.75){wd="NNW"};
		var wf = feed.item.forecast[0];

		// Determine day or night image
		wpd = feed.item.pubDate;
		n = wpd.indexOf(":");
		tpb = _getTimeAsDate(wpd.substr(n-2,8));
		tsr = _getTimeAsDate(feed.astronomy.sunrise);
		tss = _getTimeAsDate(feed.astronomy.sunset);

		if (tpb>tsr && tpb<tss) { daynight = 'd'; } else { daynight = 'n'; }

		// Add item container
		var html = '<div class="weatherItem '+ row +'"';
		if (options.image) html += ' style="background-image: url(http://l.yimg.com/a/i/us/nws/weather/gr/'+ feed.item.condition.code + daynight +'.png); background-repeat: no-repeat;"';
		html += '>';


		var feedCity = feed.location.city;
		var CustomCity;
		if(feed.location.city == "Cedar Glen")
			{
				CustomCity = "SAN BERNARDINO";
			}
			else
			{
				CustomCity = feed.location.city;
			}


		// Add item data

		html += '<div class="weatherCity">'+ CustomCity +'</div>';
		html += '<div class="weatherTemp">'+ feed.item.condition.temp +'&deg;</div>';
		//html += '<div class="weatherDesc">'+ feed.item.condition.text +'</div>';
		if (options.highlow) html += '<div class="weatherRange">High: '+ wf.high +'&deg; Low: '+ wf.low +'&deg;</div>';
		if (options.wind) html += '<div class="weatherWind">Wind: '+ wd +' '+ feed.wind.speed + feed.units.speed +'</div>';
		if (options.link) html += '<span style="width:120px;text-align:center;border:#000 1px solid;border-radius:3px;background: -webkit-linear-gradient(top, rgba(191,210,85,1) 0%,rgba(142,185,42,1) 50%,rgba(114,170,0,1) 51%,rgba(158,203,45,1) 100%);color:#000;font-weight:bold;padding:2px;margin-top:4px !important;" onclick="window.plugins.childBrowser.showWebPage(\''+ feed.item.link +'\');">Read full forecast</span>';

		html += '</div>';
		// Alternate row classes
		if (row == 'odd') { row = 'even'; } else { row = 'odd';	}

		$e.append(html);
	};

	// Get time string as date
	var _getTimeAsDate = function(t) {

		d = new Date();
		r = new Date(d.toDateString() +' '+ t);

		return r;
	};





document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {


    $('#news').rssfeed('http://libnews.lib.csusb.edu/?feed=rss2', {
                       limit: 10,
                       media:true,
                       snippet:true,
                       content:true,
                       header:true,
                       
                       
                       });
    
    
                                                       



}





	$.fn.rssfeed = function(url, options, fn) {	
	
		// Set pluign defaults
		var defaults = {
			limit: 10,
			header: true,
			titletag: 'h4',
			date: true,
			content: true,
			snippet: true,
			media: true,
			showerror: true,
			errormsg: '',
			key: null,
			ssl: false,
			linktarget: '_self'
		};  
		var options = $.extend(defaults, options); 
		
		// Functions
		return this.each(function(i, e) {
			var $e = $(e);
			var s = '';

			// Check for SSL protocol
			if (options.ssl) s = 's';
			
			// Add feed class to user div
			if (!$e.hasClass('rssFeed')) $e.addClass('rssFeed');
			
			// Check for valid url
			if(url == null) return false;
			
			// Create Google Feed API address
			var api = "http"+ s +"://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + encodeURIComponent(url);
			if (options.limit != null) api += "&num=" + options.limit;
			if (options.key != null) api += "&key=" + options.key;
			api += "&output=json_xml"

			// Send request
			$.getJSON(api, function(data){
				
				// Check for error
				if (data.responseStatus == 200) {
	
					// Process the feeds
					_process(e, data.responseData, options);

					// Optional user callback function
					if ($.isFunction(fn)) fn.call(this,$e);
					
				} else {

					// Handle error if required
					if (options.showerror)
						if (options.errormsg != '') {
							var msg = options.errormsg;
						} else {
							var msg = data.responseDetails;
						};
						$(e).html('<div class="rssError"><p>'+ msg +'</p></div>');
				};
			});				
		});
	};
	
	// Function to create HTML result
	var _process = function(e, data, options) {

		// Get JSON feed data
		var feeds = data.feed;
		if (!feeds) {
			return false;
		}
		var html = '';	
		
		// Get XML data for media (parseXML not used as requires 1.5+)
		if (options.media) {
			var xml = getXMLDocument(data.xmlString);
			var xmlEntries = xml.getElementsByTagName('item');
		}
		
		// Add header if required
		//if (options.header)
			//html +=	'<br><legend>' +
				//feeds.description + feeds.title +
			//	'</legend><br>';
			

		
		// Add feeds
		for (var i=0; i<feeds.entries.length; i++) {
			
			// Get individual feed
			var entry = feeds.entries[i];
			var pubDate;

			// Format published date
			if (entry.publishedDate) {
				var entryDate = new Date(entry.publishedDate);
				var pubDate = entryDate.toLocaleDateString() + ' ' + entryDate.toLocaleTimeString();
			}
			html += '<div class="rssContainer"><div class="feedTitle" >'
 html +=
 '<div class="rssTitle">'+ entry.title +'</div></div>'

			// Add any media
			if (options.media && xmlEntries.length > 0) {
				var xmlMedia = xmlEntries[i].getElementsByTagName('enclosure');
				if (xmlMedia.length > 0) {
					
					for (var m=0; m<xmlMedia.length; m++) {
						var xmlUrl = xmlMedia[m].getAttribute("url");
						var xmlType = xmlMedia[m].getAttribute("type");
						var xmlSize = xmlMedia[m].getAttribute("length");
						html += '<img style="margin:12px 5px 0px 5px;border-radius:5px; float:left;" src="'+ xmlUrl +'"/>';
					}
				}
				
			}
			
			// Add feed row

			if (options.content) {
			
				// Use feed snippet if available and optioned
				if (options.snippet && entry.contentSnippet != '') {
					var content = entry.contentSnippet;
				} else {
					var content = entry.content;
				}
				
 html += '<div class="rssStory" style="margin-top:5px !important;">'+ content +'</div>'

			}
			

			html += '<div align="right"><a class="greenRss" onclick="window.plugins.childBrowser.showWebPage(\''+ entry.link +'\');"  >Read More</a></div>'
 if (options.date && pubDate) html += '<div class="rssDate">'+ pubDate + '</div></div>'

		}
		
		
		
		$(e).html(html);

		
	};
	
	function formatFilesize(bytes) {
		var s = ['bytes', 'kb', 'MB', 'GB', 'TB', 'PB'];
		var e = Math.floor(Math.log(bytes)/Math.log(1024));
		return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];
	}

	function getXMLDocument(string) {
		var browser = navigator.appName;
		var xml;
		if (browser == 'Microsoft Internet Explorer') {
			xml = new ActiveXObject('Microsoft.XMLDOM');
			xml.async = 'false'
			xml.loadXML(string);
		} else {
			xml = (new DOMParser()).parseFromString(string, 'text/xml');
		}
		return xml;
	}












//CSUSB Mobile Map v2.0.2

    var geoXml = null;
    var map = null;
    var geocoder = null;
    var toggleState = 1;
    var infowindow = null;
    var marker = null;
    var geoXmlDoc = null;

      function initialize() {
	geocoder = new google.maps.Geocoder();
	infowindow = new google.maps.InfoWindow({size: new google.maps.Size(150,50) }); 
	
          var imageBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(34.1750447916351, -117.33108758926392),
          new google.maps.LatLng(34.18842909634099, -117.3131275177002));

              var myOptions = {
                disableDefaultUI: true,
                zoomControl: true,
                zoom: 16,
                minZoom: 16,
                maxZoom: 17,
                streetViewControl:true,
                zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP
                };
    
	
	 map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
         var oldmap = new google.maps.GroundOverlay(
                                                   "img/map.png",
                                                   imageBounds);
                                                   
                                                   
        oldmap.setMap(map)
        

          
          // bounds of the desired area
          var allowedBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(34.1750447916351, -117.33108758926392),
          new google.maps.LatLng(34.18842909634099, -117.3131275177002));
          var lastValidCenter = map.getCenter();
          
          google.maps.event.addListener(map, 'center_changed', function() {
          if (allowedBounds.contains(map.getCenter())) {
          // still within valid bounds, so save the last valid position
           lastValidCenter = map.getCenter();
           return; 
              }
          
          // not valid anymore => return to last valid position
           map.panTo(lastValidCenter);
            });  
          
          
	// Called when user accept the Geocoding request
		function showMap(position) 
		{
			// Get user's position
			userLat = position.coords.latitude;
			userLong = position.coords.longitude;
			userPosition = new google.maps.LatLng(userLat, userLong);
			have_user_position = true; 
			
			if( userLat > 34.1750447916351 && userLat < 34.18842909634099 && userLong > -117.33108758926392 && userLong < -117.3131275177002)
			{
				// If within campus, display marker & don't show directions
                var myIcon = new google.maps.MarkerImage("img/pin3.png", null, null, null, new google.maps.Size(50,45));
				var userLoc = new google.maps.LatLng(userLat, userLong);
				var marker = new google.maps.Marker({
                                                    animation: google.maps.Animation.DROP,
                                                    map: map,
                                                    position: userLoc,
                                                    icon: myIcon,

                                                    title: 'You are here!'
                                                    });
        
                

			}


		}
        
// Called if geocoding fails, or if users deny it
		function errorCallback(error) 
		{
			//Nothing here; fails silently
			/*switch(error.code) 
             {
             case error.TIMEOUT:
             alert ('Timeout');
             break;
             case error.POSITION_UNAVAILABLE:
             alert ('Position unavailable');
             break;
             case error.PERMISSION_DENIED:
             alert ('Permission denied');
             break;
             case error.UNKNOWN_ERROR:
             alert ('Unknown error');
             break;
             }
             */
		}
		
        $(function(){
          document.addEventListener("deviceready", onDeviceReady, false);
          })
        
        function onDeviceReady() {
            // Ask for permission to know user's latitude and longitude
            navigator.geolocation.getCurrentPosition(showMap,errorCallback,{timeout:10000});  
        }
		
     
	geoXml = new geoXML3.parser({
                    map: map,
                    singleInfoWindow: true,
                    afterParse: useTheData
                });
	geoXml.parse('xml/production_map.xml');
  }
  

function kmlClick(poly) {
//   map.fitBounds(geoXmlDoc.gpolygons[poly].bounds);
   google.maps.event.trigger(geoXmlDoc.gpolygons[poly],"click");
}

   map.fitBounds(geoXmlDoc.gpolygons[poly].bounds);
   for (var i=0;i<geoXmlDoc.gpolygons.length;i++) {
     if (i == poly) {
       geoXmlDoc.gpolygons[i].setMap(map);
     } else {
       geoXmlDoc.gpolygons[i].setMap(null);
     }
   }

function showAll() {
   map.fitBounds(geoXmlDoc.bounds);
   for (var i=0;i<geoXmlDoc.gpolygons.length;i++) {
     geoXmlDoc.gpolygons[i].setMap(map);
   }
}

function useTheData(doc){
  // Geodata handling goes here, using JSON properties of the doc object
  var sidebarHtml = '<ul><li><a href="javascript:showAll();">Show All</a></li>';
  geoXmlDoc = doc[0];
  for (var i = 0; i < doc[0].gpolygons.length; i++) {
    // console.log(doc[0].markers[i].title);
    sidebarHtml += '<li><a href="javascript:jq.ui.toggleSideMenu();showMask(\'<h1>Loading Content</h1>\');" onclick="javascript:kmlClick('+i+');highlight_link(this);return false;"  ><span class="building">'+doc[0].placemarks[i].name+' </span><span>'+doc[0].placemarks[i].building+'</span></a></li>';
  }
 
  document.getElementById("sidebar").innerHTML = sidebarHtml;
};
            

   function hide_markers_kml(){

            geoXml.hideDocument();  

   }

   function unhide_markers_kml(){

            geoXml.showDocument();  

   }



