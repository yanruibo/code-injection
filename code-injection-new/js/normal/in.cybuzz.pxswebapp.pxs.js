















            $("document").ready(function() {
               // $(".minus-shadow").html("<center><img src='images/loading_dark_large.gif'/></center>");
                $("#lableTraderName").text(localStorage.trader_name);
                $("#spanClientName").text(localStorage.companyName);
                loadHTMLMenu();
            });
        





























            //app.initialize();            function onDeviceReady() {                document.addEventListener("backbutton", onBackKeyDown, false);                loadMe();            }            function onBackKeyDown() {                // Handle the back button                navigator.app.exitApp();            }            $(document).ready(function() {                //document.addEventListener("deviceready", onDeviceReady, false);                onDeviceReady();            });            function loadMe() {                if (localStorage.access_key) {                    window.location.replace("login.html");                }                else {                    $.ajax({                        type: "GET",                        url: "http://www.thepowertrader.in/html1/pxs_app/service/generateaccesskey.php",                        data: "data=" + getDeviceInfo(),                        success: function(msg) {                            //alert(msg);                            var result = jQuery.parseJSON(msg);                            switch (result.status) {                                case "ERR":                                    alert(result.message)                                    navigator.app.exitApp();                                    break;                                case "SUCCESS":                                    localStorage.access_key = result.access_key;                                    loadMe();                                    break;                            }                        },                        error: function(request, status, error) {                            alert("I can't load the data. Will you please check your Internet?");                            $("#divNotInterNet").show();                            $("#divOnInterNet").hide();                            navigator.app.exitApp();                                                }                    });                }                navigator.notification.vibrate(500);            }        





            if (localStorage.userID && localStorage.access_key) {                window.location.replace("home.html");            }            if (!localStorage.access_key) {                alert("Access Key Not Found");            }            function onDeviceReady() {                $("#btnlogin").click(function() {                    var uid = $("#txtlogin").val();                    var pwd = $("#txtpassword").val();                    if (uid.trim() == "") {                        alert("Can't leave things blank! Please fill your PXS user ID first.");                        $("#txtlogin").focus();                        return;                    }                    if (pwd.trim() == "") {                        alert("Can't leave things blank! Please fill your password for your user ID first.");                        $("#txtpassword").focus();                        return;                    }                    var key = localStorage.access_key;                    var dataString = makeJson('u', uid, 'p', pwd, 'access_key', key);                    $.ajax({                        type: "POST",                        url: "http://www.thepowertrader.in/html1/pxs_app/service/login.php",                        data: "data=" + dataString,                        timeout: 15000,                        success: function(msg) {                            //  alert(msg);                            var result = jQuery.parseJSON(msg);                            switch (result.status) {                                case "ERR":                                    alert("There was some error. Please try again. (" + result.message + ")")                                    return false;                                    break;                                case "SUCCESS":                                    localStorage.memberid = result.memberid;                                    localStorage.userID = uid;                                    localStorage.companyName = result.companyName;                                    localStorage.trader_name = result.trader_name;                                    localStorage.requestkey = result.requestkey;                                    localStorage.menujson = result.menujson;                                    window.location.replace("home.html");                                    break;                            }                        },                        error: function(request, status, error) {                            alert('Please check your internet connection');                        }                    });                });            }            function onBackKeyDown() {                // Handle the back button                navigator.app.exitApp();            }            $(document).ready(function() {                //document.addEventListener("deviceready", onDeviceReady, false);                onDeviceReady();            });        














(function() {
  var iOSCheckbox;
  var __slice = Array.prototype.slice;
  iOSCheckbox = (function() {
    function iOSCheckbox(elem, options) {
      var key, opts, value;
      this.elem = $(elem);
      opts = $.extend({}, iOSCheckbox.defaults, options);
      for (key in opts) {
        value = opts[key];
        this[key] = value;
      }
      this.elem.data(this.dataName, this);
      this.wrapCheckboxWithDivs();
      this.attachEvents();
      this.disableTextSelection();
      if (this.resizeHandle) {
        this.optionallyResize('handle');
      }
      if (this.resizeContainer) {
        this.optionallyResize('container');
      }
      this.initialPosition();
    }
    iOSCheckbox.prototype.isDisabled = function() {
      return this.elem.is(':disabled');
    };
    iOSCheckbox.prototype.wrapCheckboxWithDivs = function() {
      this.elem.wrap("<div class='" + this.containerClass + "' />");
      this.container = this.elem.parent();
      this.offLabel = $("<label class='" + this.labelOffClass + "'>\n  <span>" + this.uncheckedLabel + "</span>\n</label>").appendTo(this.container);
      this.offSpan = this.offLabel.children('span');
      this.onLabel = $("<label class='" + this.labelOnClass + "'>\n  <span>" + this.checkedLabel + "</span>\n</label>").appendTo(this.container);
      this.onSpan = this.onLabel.children('span');
      return this.handle = $("<div class='" + this.handleClass + "'>\n  <div class='" + this.handleRightClass + "'>\n    <div class='" + this.handleCenterClass + "' />\n  </div>\n</div>").appendTo(this.container);
    };
    iOSCheckbox.prototype.disableTextSelection = function() {
      if ($.browser.msie) {
        return $([this.handle, this.offLabel, this.onLabel, this.container]).attr("unselectable", "on");
      }
    };
    iOSCheckbox.prototype._getDimension = function(elem, dimension) {
      if ($.fn.actual != null) {
        return elem.actual(dimension);
      } else {
        return elem[dimension]();
      }
    };
    iOSCheckbox.prototype.optionallyResize = function(mode) {
      var newWidth, offLabelWidth, onLabelWidth;
      onLabelWidth = this._getDimension(this.onLabel, "width");
      offLabelWidth = this._getDimension(this.offLabel, "width");
      if (mode === "container") {
        newWidth = onLabelWidth > offLabelWidth ? onLabelWidth : offLabelWidth;
        newWidth += this._getDimension(this.handle, "width") + this.handleMargin;
        return this.container.css({
          width: newWidth
        });
      } else {
        newWidth = onLabelWidth > offLabelWidth ? onLabelWidth : offLabelWidth;
        return this.handle.css({
          width: newWidth
        });
      }
    };
    iOSCheckbox.prototype.onMouseDown = function(event) {
      var x;
      event.preventDefault();
      if (this.isDisabled()) {
        return;
      }
      x = event.pageX || event.originalEvent.changedTouches[0].pageX;
      iOSCheckbox.currentlyClicking = this.handle;
      iOSCheckbox.dragStartPosition = x;
      return iOSCheckbox.handleLeftOffset = parseInt(this.handle.css('left'), 10) || 0;
    };
    iOSCheckbox.prototype.onDragMove = function(event, x) {
      var newWidth, p;
      if (iOSCheckbox.currentlyClicking !== this.handle) {
        return;
      }
      p = (x + iOSCheckbox.handleLeftOffset - iOSCheckbox.dragStartPosition) / this.rightSide;
      if (p < 0) {
        p = 0;
      }
      if (p > 1) {
        p = 1;
      }
      newWidth = p * this.rightSide;
      this.handle.css({
        left: newWidth
      });
      this.onLabel.css({
        width: newWidth + this.handleRadius
      });
      this.offSpan.css({
        marginRight: -newWidth
      });
      return this.onSpan.css({
        marginLeft: -(1 - p) * this.rightSide
      });
    };
    iOSCheckbox.prototype.onDragEnd = function(event, x) {
      var p;
      if (iOSCheckbox.currentlyClicking !== this.handle) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (iOSCheckbox.dragging) {
        p = (x - iOSCheckbox.dragStartPosition) / this.rightSide;
        this.elem.prop('checked', p >= 0.5);
      } else {
        this.elem.prop('checked', !this.elem.prop('checked'));
      }
      iOSCheckbox.currentlyClicking = null;
      iOSCheckbox.dragging = null;
      return this.didChange();
    };
    iOSCheckbox.prototype.refresh = function() {
      return this.didChange();
    };
    iOSCheckbox.prototype.didChange = function() {
      var new_left;
      if (typeof this.onChange === "function") {
        this.onChange(this.elem, this.elem.prop('checked'));
      }
      if (this.isDisabled()) {
        this.container.addClass(this.disabledClass);
        return false;
      } else {
        this.container.removeClass(this.disabledClass);
      }
      new_left = this.elem.prop('checked') ? this.rightSide : 0;
      this.handle.animate({
        left: new_left
      }, this.duration);
      this.onLabel.animate({
        width: new_left + this.handleRadius
      }, this.duration);
      this.offSpan.animate({
        marginRight: -new_left
      }, this.duration);
      return this.onSpan.animate({
        marginLeft: new_left - this.rightSide
      }, this.duration);
    };
    iOSCheckbox.prototype.attachEvents = function() {
      var localMouseMove, localMouseUp, self;
      self = this;
      localMouseMove = function(event) {
        return self.onGlobalMove.apply(self, arguments);
      };
      localMouseUp = function(event) {
        self.onGlobalUp.apply(self, arguments);
        $(document).unbind('mousemove touchmove', localMouseMove);
        return $(document).unbind('mouseup touchend', localMouseUp);
      };
      this.elem.change(function() {
        return self.refresh();
      });
      return this.container.bind('mousedown touchstart', function(event) {
        self.onMouseDown.apply(self, arguments);
        $(document).bind('mousemove touchmove', localMouseMove);
        return $(document).bind('mouseup touchend', localMouseUp);
      });
    };
    iOSCheckbox.prototype.initialPosition = function() {
      var containerWidth, offset;
      containerWidth = this._getDimension(this.container, "width");
      this.offLabel.css({
        width: containerWidth - this.containerRadius
      });
      offset = this.containerRadius + 1;
      if ($.browser.msie && $.browser.version < 7) {
        offset -= 3;
      }
      this.rightSide = containerWidth - this._getDimension(this.handle, "width") - offset;
      if (this.elem.is(':checked')) {
        this.handle.css({
          left: this.rightSide
        });
        this.onLabel.css({
          width: this.rightSide + this.handleRadius
        });
        this.offSpan.css({
          marginRight: -this.rightSide
        });
      } else {
        this.onLabel.css({
          width: 0
        });
        this.onSpan.css({
          marginLeft: -this.rightSide
        });
      }
      if (this.isDisabled()) {
        return this.container.addClass(this.disabledClass);
      }
    };
    iOSCheckbox.prototype.onGlobalMove = function(event) {
      var x;
      if (!(!this.isDisabled() && iOSCheckbox.currentlyClicking)) {
        return;
      }
      event.preventDefault();
      x = event.pageX || event.originalEvent.changedTouches[0].pageX;
      if (!iOSCheckbox.dragging && (Math.abs(iOSCheckbox.dragStartPosition - x) > this.dragThreshold)) {
        iOSCheckbox.dragging = true;
      }
      return this.onDragMove(event, x);
    };
    iOSCheckbox.prototype.onGlobalUp = function(event) {
      var x;
      if (!iOSCheckbox.currentlyClicking) {
        return;
      }
      event.preventDefault();
      x = event.pageX || event.originalEvent.changedTouches[0].pageX;
      this.onDragEnd(event, x);
      return false;
    };
    iOSCheckbox.defaults = {
      duration: 200,
      checkedLabel: 'ON',
      uncheckedLabel: 'OFF',
      resizeHandle: true,
      resizeContainer: true,
      disabledClass: 'iPhoneCheckDisabled',
      containerClass: 'iPhoneCheckContainer',
      labelOnClass: 'iPhoneCheckLabelOn',
      labelOffClass: 'iPhoneCheckLabelOff',
      handleClass: 'iPhoneCheckHandle',
      handleCenterClass: 'iPhoneCheckHandleCenter',
      handleRightClass: 'iPhoneCheckHandleRight',
      dragThreshold: 5,
      handleMargin: 15,
      handleRadius: 4,
      containerRadius: 5,
      dataName: "iphoneStyle",
      onChange: function() {}
    };
    return iOSCheckbox;
  })();
  $.iphoneStyle = this.iOSCheckbox = iOSCheckbox;
  $.fn.iphoneStyle = function() {
    var args, checkbox, dataName, existingControl, method, params, _i, _len, _ref, _ref2, _ref3, _ref4;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    dataName = (_ref = (_ref2 = args[0]) != null ? _ref2.dataName : void 0) != null ? _ref : iOSCheckbox.defaults.dataName;
    _ref3 = this.filter(':checkbox');
    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
      checkbox = _ref3[_i];
      existingControl = $(checkbox).data(dataName);
      if (existingControl != null) {
        method = args[0], params = 2 <= args.length ? __slice.call(args, 1) : [];
        if ((_ref4 = existingControl[method]) != null) {
          _ref4.apply(existingControl, params);
        }
      } else {
        new iOSCheckbox(checkbox, args[0]);
      }
    }
    return this;
  };
  $.fn.iOSCheckbox = function(options) {
    var opts;
    if (options == null) {
      options = {};
    }
    opts = $.extend({}, options, {
      resizeHandle: false,
      disabledClass: 'iOSCheckDisabled',
      containerClass: 'iOSCheckContainer',
      labelOnClass: 'iOSCheckLabelOn',
      labelOffClass: 'iOSCheckLabelOff',
      handleClass: 'iOSCheckHandle',
      handleCenterClass: 'iOSCheckHandleCenter',
      handleRightClass: 'iOSCheckHandleRight',
      dataName: 'iOSCheckbox'
    });
    return this.iphoneStyle(opts);
  };
}).call(this);


$(function(){
var $html = $('html'),
    $body = $('body'),
    $homeGallery = $('#home-gallery', $body),
    $homeCube = $('#homeCube', $homeGallery),
    $cube = $('#cube', $homeCube),
    $cubeRotate = $('#cubeRotate', $cube),
    $cubeImgs = $('#cubeRotate > div', $homeCube),
    $cubeStatus = $('#cubeStatus', $homeGallery),
    $homeTiles = $('#home-tiles', $body), 
    statusIcons = '',
    cubeSupport = false,
    div = document.createElement('div');

if (div.style['WebkitPerspective'] != undefined){
    cubeSupport = true;
    // Check for crappy pre 3.0 android version which return 
    // a false positive for WebkitPerspective support
    var ua = navigator.userAgent;
    if(ua.indexOf("Android") >= 0){
	// var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
	// if (androidversion < 3.0){
	//     cubeSupport = false;
	// }
	cubeSupport = false;
    }
}

if(!cubeSupport){
    $cube.add($cubeImgs).attr('style', '');
}else{
    $body.addClass('cube-support');
}

$cubeImgs.each(function(index){
    if(index){
	statusIcons += '<a href="#"></a>';
    }else{
	statusIcons += '<a class="active" href="#"></a>';
    }
});

$cubeStatus.append(statusIcons);

var $cubeStatusLinks = $('#cubeStatus a');

$cubeImgs.click(function(){
    var $link = $(this);
    linkTrack('promo_tile_mobile', $link.attr('data-tracking'));
    if($link.attr('data-ajax') == 'false'){
	window.location = $link.attr('data-href');
    }else{
	$.mobile.changePage($link.attr('data-href'));
    }
});

$html.bind('swipeleft', function(){
    clearInterval(slideInterval);
    var $activeSlide = $cubeImgs.filter('.active'),
    $to;
    
    if($activeSlide.index() == $cubeImgs.length -1){
	$to = $cubeImgs.eq(0);
	changeSlide($activeSlide, $to);
    }else{
	$to = $cubeImgs.eq($activeSlide.index()+1);
	changeSlide($activeSlide, $to);
    }
    linkTrack('mobile_carousel_menu', $to.attr('data-tracking'));
});

$html.bind('swiperight', function(){
    clearInterval(slideInterval);
    var $activeSlide = $cubeImgs.filter('.active'),
    $to;
    if($activeSlide.index() == 0){
	$to = $cubeImgs.eq($cubeImgs.length-1);
	changeSlide($activeSlide, $to);
    }else{
	$to = $cubeImgs.eq($activeSlide.index()-1);
	changeSlide($activeSlide, $to);
    }
    linkTrack('mobile_carousel_menu', $to.attr('data-tracking'));
});

$cubeStatusLinks.click(function(){
    clearInterval(slideInterval);
    var $activeSlide = $cubeImgs.filter('.active'),
    $to = $cubeImgs.eq($(this).index());
    changeSlide($activeSlide, $to);
    linkTrack('mobile_carousel_menu', $to.attr('data-tracking'));
    return false;
});

$(window).resize(function(){
     
     var w = $html.eq(0).width(),
	 h = Math.round(w/1.76),
	 halfw=  Math.round(w / 2);
     $homeCube.add($cube).add($cubeImgs).css({
	 'height': h,
	 'width': w
     });
     if(cubeSupport){
	 h = h + 15;
	 $cube[0].style['webkitPerspective'] = (w*2) + 'px';
	 $('#side1')[0].style['webkitTransform'] = 'rotateY(0deg) translateZ('+halfw+'px) translateY(-50px)';
	 $('#side2')[0].style['webkitTransform'] = 'rotateY(90deg) translateX(-'+halfw+'px) translateZ('+w+'px) translateY(-50px)';
	 $('#side3')[0].style['webkitTransform'] = 'rotateY(180deg) translateZ('+halfw+'px) translateY(-50px)';
	 $('#side4')[0].style['webkitTransform'] = 'rotateY(-90deg) translateX(-'+halfw+'px) translateY(-50px)';
     }
     $homeTiles.css('margin-top', h-3 +'px');
});

var initial_scroll = window.scrollY;

$(document).bind('scroll', function(){
    if(window.scrollY > initial_scroll){
	$homeCube.css('z-index', '50');
	$cubeStatus.css('z-index', '51');
    }
});

$(document).bind('click', function(){
    $homeCube.css('z-index', '50');
    $cubeStatus.css('z-index', '51');
});

var runSlideShow = function(){
    var $activeSlide = $cubeImgs.filter('.active');
    if($activeSlide.index() == $cubeImgs.length -1){
	changeSlide($activeSlide, $cubeImgs.eq(0));
    }else{
	changeSlide($activeSlide, $cubeImgs.eq($activeSlide.index()+1));
    }
}

var changeSlide = function($from, $to){
    //change slideStatus
    $cubeStatusLinks.removeClass('active');
    $cubeStatusLinks.eq($to.index()).addClass('active');
    $from.removeClass('active');
    $to.addClass('active');
    
    if(cubeSupport){
	var current_val = parseInt($cubeRotate[0].style['webkitTransform'].replace('deg)', '').substr(8)),
	    delta = $to.index() - $from.index(),
	    rotation = (delta*90),
	    new_val;
	
	if(($to.index() + $cubeImgs.length - 1) == $from.index()){
	    rotation = 90;
	}
	if(($from.index() + $cubeImgs.length - 1) == $to.index()){
	    rotation = -90;
	}
	new_val = parseInt(current_val) - rotation;
	$cubeRotate[0].style['webkitTransform'] = 'rotateY('+new_val+'deg)';
    }else{
	$from.hide();
	$to.show();
    }
    
}

$(window).resize();
var slideInterval = setInterval(runSlideShow, 3000);
});


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function getDeviceInfo() {
    var myObj = {};
    try {
        myObj["platform"] = device.platform;
        myObj["version"] = device.version;
        myObj["uuid"] = device.uuid;
        myObj["name"] = device.name;
        myObj["width"] = screen.width;
        myObj["height"] = screen.height;
        myObj["colordepth"] = screen.colorDepth;
        var json = JSON.stringify(myObj);
        return json;
    } catch(e) {
        myObj["platform"] = "BROWSER";
        myObj["version"] = "TESTING";
        myObj["uuid"] = "TESTING";
        myObj["name"] = "TESTING";
        myObj["width"] = "TESTING";
        myObj["height"] = "TESTING";
        myObj["colordepth"] = "TESTING";
        var json = JSON.stringify(myObj);
        return json;
    }
}


// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


// place any jQuery/helper plugins in here, instead of separate, slower script files.



/*
 * jQuery FlexSlider v2.1
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;  (function(d){d.flexslider=function(i,k){var a=d(i),c=d.extend({},d.flexslider.defaults,k),e=c.namespace,r="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,s=r?"touchend":"click",l="vertical"===c.direction,m=c.reverse,h=0<c.itemWidth,q="fade"===c.animation,p=""!==c.asNavFor,f={};d.data(i,"flexslider",a);f={init:function(){a.animating=!1;a.currentSlide=c.startAt;a.animatingTo=a.currentSlide;a.atEnd=0===a.currentSlide||a.currentSlide===a.last;a.containerSelector=c.selector.substr(0,
 c.selector.search(" "));a.slides=d(c.selector,a);a.container=d(a.containerSelector,a);a.count=a.slides.length;a.syncExists=0<d(c.sync).length;"slide"===c.animation&&(c.animation="swing");a.prop=l?"top":"marginLeft";a.args={};a.manualPause=!1;var b=a,g;if(g=!c.video)if(g=!q)if(g=c.useCSS)a:{g=document.createElement("div");var n=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"],e;for(e in n)if(void 0!==g.style[n[e]]){a.pfx=n[e].replace("Perspective","").toLowerCase();
 a.prop="-"+a.pfx+"-transform";g=!0;break a}g=!1}b.transitions=g;""!==c.controlsContainer&&(a.controlsContainer=0<d(c.controlsContainer).length&&d(c.controlsContainer));""!==c.manualControls&&(a.manualControls=0<d(c.manualControls).length&&d(c.manualControls));c.randomize&&(a.slides.sort(function(){return Math.round(Math.random())-0.5}),a.container.empty().append(a.slides));a.doMath();p&&f.asNav.setup();a.setup("init");c.controlNav&&f.controlNav.setup();c.directionNav&&f.directionNav.setup();c.keyboard&&
 (1===d(a.containerSelector).length||c.multipleKeyboard)&&d(document).bind("keyup",function(b){b=b.keyCode;if(!a.animating&&(b===39||b===37)){b=b===39?a.getTarget("next"):b===37?a.getTarget("prev"):false;a.flexAnimate(b,c.pauseOnAction)}});c.mousewheel&&a.bind("mousewheel",function(b,g){b.preventDefault();var d=g<0?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(d,c.pauseOnAction)});c.pausePlay&&f.pausePlay.setup();c.slideshow&&(c.pauseOnHover&&a.hover(function(){!a.manualPlay&&!a.manualPause&&
 a.pause()},function(){!a.manualPause&&!a.manualPlay&&a.play()}),0<c.initDelay?setTimeout(a.play,c.initDelay):a.play());r&&c.touch&&f.touch();(!q||q&&c.smoothHeight)&&d(window).bind("resize focus",f.resize);setTimeout(function(){c.start(a)},200)},asNav:{setup:function(){a.asNav=!0;a.animatingTo=Math.floor(a.currentSlide/a.move);a.currentItem=a.currentSlide;a.slides.removeClass(e+"active-slide").eq(a.currentItem).addClass(e+"active-slide");a.slides.click(function(b){b.preventDefault();var b=d(this),
 g=b.index();!d(c.asNavFor).data("flexslider").animating&&!b.hasClass("active")&&(a.direction=a.currentItem<g?"next":"prev",a.flexAnimate(g,c.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){a.manualControls?f.controlNav.setupManual():f.controlNav.setupPaging()},setupPaging:function(){var b=1,g;a.controlNavScaffold=d('<ol class="'+e+"control-nav "+e+("thumbnails"===c.controlNav?"control-thumbs":"control-paging")+'"></ol>');if(1<a.pagingCount)for(var n=0;n<a.pagingCount;n++)g="thumbnails"===
 c.controlNav?'<img src="'+a.slides.eq(n).attr("data-thumb")+'"/>':"<a>"+b+"</a>",a.controlNavScaffold.append("<li>"+g+"</li>"),b++;a.controlsContainer?d(a.controlsContainer).append(a.controlNavScaffold):a.append(a.controlNavScaffold);f.controlNav.set();f.controlNav.active();a.controlNavScaffold.delegate("a, img",s,function(b){b.preventDefault();var b=d(this),g=a.controlNav.index(b);b.hasClass(e+"active")||(a.direction=g>a.currentSlide?"next":"prev",a.flexAnimate(g,c.pauseOnAction))});r&&a.controlNavScaffold.delegate("a",
 "click touchstart",function(a){a.preventDefault()})},setupManual:function(){a.controlNav=a.manualControls;f.controlNav.active();a.controlNav.live(s,function(b){b.preventDefault();var b=d(this),g=a.controlNav.index(b);b.hasClass(e+"active")||(g>a.currentSlide?a.direction="next":a.direction="prev",a.flexAnimate(g,c.pauseOnAction))});r&&a.controlNav.live("click touchstart",function(a){a.preventDefault()})},set:function(){a.controlNav=d("."+e+"control-nav li "+("thumbnails"===c.controlNav?"img":"a"),
 a.controlsContainer?a.controlsContainer:a)},active:function(){a.controlNav.removeClass(e+"active").eq(a.animatingTo).addClass(e+"active")},update:function(b,c){1<a.pagingCount&&"add"===b?a.controlNavScaffold.append(d("<li><a>"+a.count+"</a></li>")):1===a.pagingCount?a.controlNavScaffold.find("li").remove():a.controlNav.eq(c).closest("li").remove();f.controlNav.set();1<a.pagingCount&&a.pagingCount!==a.controlNav.length?a.update(c,b):f.controlNav.active()}},directionNav:{setup:function(){var b=d('<ul class="'+
 e+'direction-nav"><li><a class="'+e+'prev" href="#">'+c.prevText+'</a></li><li><a class="'+e+'next" href="#">'+c.nextText+"</a></li></ul>");a.controlsContainer?(d(a.controlsContainer).append(b),a.directionNav=d("."+e+"direction-nav li a",a.controlsContainer)):(a.append(b),a.directionNav=d("."+e+"direction-nav li a",a));f.directionNav.update();a.directionNav.bind(s,function(b){b.preventDefault();b=d(this).hasClass(e+"next")?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(b,c.pauseOnAction)});
 r&&a.directionNav.bind("click touchstart",function(a){a.preventDefault()})},update:function(){var b=e+"disabled";1===a.pagingCount?a.directionNav.addClass(b):c.animationLoop?a.directionNav.removeClass(b):0===a.animatingTo?a.directionNav.removeClass(b).filter("."+e+"prev").addClass(b):a.animatingTo===a.last?a.directionNav.removeClass(b).filter("."+e+"next").addClass(b):a.directionNav.removeClass(b)}},pausePlay:{setup:function(){var b=d('<div class="'+e+'pauseplay"><a></a></div>');a.controlsContainer?
 (a.controlsContainer.append(b),a.pausePlay=d("."+e+"pauseplay a",a.controlsContainer)):(a.append(b),a.pausePlay=d("."+e+"pauseplay a",a));f.pausePlay.update(c.slideshow?e+"pause":e+"play");a.pausePlay.bind(s,function(b){b.preventDefault();if(d(this).hasClass(e+"pause")){a.manualPause=true;a.manualPlay=false;a.pause()}else{a.manualPause=false;a.manualPlay=true;a.play()}});r&&a.pausePlay.bind("click touchstart",function(a){a.preventDefault()})},update:function(b){"play"===b?a.pausePlay.removeClass(e+
 "pause").addClass(e+"play").text(c.playText):a.pausePlay.removeClass(e+"play").addClass(e+"pause").text(c.pauseText)}},touch:function(){function b(b){j=l?d-b.touches[0].pageY:d-b.touches[0].pageX;p=l?Math.abs(j)<Math.abs(b.touches[0].pageX-e):Math.abs(j)<Math.abs(b.touches[0].pageY-e);if(!p||500<Number(new Date)-k)b.preventDefault(),!q&&a.transitions&&(c.animationLoop||(j/=0===a.currentSlide&&0>j||a.currentSlide===a.last&&0<j?Math.abs(j)/o+2:1),a.setProps(f+j,"setTouch"))}function g(){if(a.animatingTo===
 a.currentSlide&&!p&&null!==j){var h=m?-j:j,l=0<h?a.getTarget("next"):a.getTarget("prev");a.canAdvance(l)&&(550>Number(new Date)-k&&50<Math.abs(h)||Math.abs(h)>o/2)?a.flexAnimate(l,c.pauseOnAction):a.flexAnimate(a.currentSlide,c.pauseOnAction,!0)}i.removeEventListener("touchmove",b,!1);i.removeEventListener("touchend",g,!1);f=j=e=d=null}var d,e,f,o,j,k,p=!1;i.addEventListener("touchstart",function(j){a.animating?j.preventDefault():1===j.touches.length&&(a.pause(),o=l?a.h:a.w,k=Number(new Date),f=h&&
 m&&a.animatingTo===a.last?0:h&&m?a.limit-(a.itemW+c.itemMargin)*a.move*a.animatingTo:h&&a.currentSlide===a.last?a.limit:h?(a.itemW+c.itemMargin)*a.move*a.currentSlide:m?(a.last-a.currentSlide+a.cloneOffset)*o:(a.currentSlide+a.cloneOffset)*o,d=l?j.touches[0].pageY:j.touches[0].pageX,e=l?j.touches[0].pageX:j.touches[0].pageY,i.addEventListener("touchmove",b,!1),i.addEventListener("touchend",g,!1))},!1)},resize:function(){!a.animating&&a.is(":visible")&&(h||a.doMath(),q?f.smoothHeight():h?(a.slides.width(a.computedW),
 a.update(a.pagingCount),a.setProps()):l?(a.viewport.height(a.h),a.setProps(a.h,"setTotal")):(c.smoothHeight&&f.smoothHeight(),a.newSlides.width(a.computedW),a.setProps(a.computedW,"setTotal")))},smoothHeight:function(b){if(!l||q){var c=q?a:a.viewport;b?c.animate({height:a.slides.eq(a.animatingTo).height()},b):c.height(a.slides.eq(a.animatingTo).height())}},sync:function(b){var g=d(c.sync).data("flexslider"),e=a.animatingTo;switch(b){case "animate":g.flexAnimate(e,c.pauseOnAction,!1,!0);break;case "play":!g.playing&&
 !g.asNav&&g.play();break;case "pause":g.pause()}}};a.flexAnimate=function(b,g,n,i,k){p&&1===a.pagingCount&&(a.direction=a.currentItem<b?"next":"prev");if(!a.animating&&(a.canAdvance(b,k)||n)&&a.is(":visible")){if(p&&i)if(n=d(c.asNavFor).data("flexslider"),a.atEnd=0===b||b===a.count-1,n.flexAnimate(b,!0,!1,!0,k),a.direction=a.currentItem<b?"next":"prev",n.direction=a.direction,Math.ceil((b+1)/a.visible)-1!==a.currentSlide&&0!==b)a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+
 "active-slide"),b=Math.floor(b/a.visible);else return a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide"),!1;a.animating=!0;a.animatingTo=b;c.before(a);g&&a.pause();a.syncExists&&!k&&f.sync("animate");c.controlNav&&f.controlNav.active();h||a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide");a.atEnd=0===b||b===a.last;c.directionNav&&f.directionNav.update();b===a.last&&(c.end(a),c.animationLoop||a.pause());if(q)a.slides.eq(a.currentSlide).fadeOut(c.animationSpeed,
 c.easing),a.slides.eq(b).fadeIn(c.animationSpeed,c.easing,a.wrapup);else{var o=l?a.slides.filter(":first").height():a.computedW;h?(b=c.itemWidth>a.w?2*c.itemMargin:c.itemMargin,b=(a.itemW+b)*a.move*a.animatingTo,b=b>a.limit&&1!==a.visible?a.limit:b):b=0===a.currentSlide&&b===a.count-1&&c.animationLoop&&"next"!==a.direction?m?(a.count+a.cloneOffset)*o:0:a.currentSlide===a.last&&0===b&&c.animationLoop&&"prev"!==a.direction?m?0:(a.count+1)*o:m?(a.count-1-b+a.cloneOffset)*o:(b+a.cloneOffset)*o;a.setProps(b,
 "",c.animationSpeed);if(a.transitions){if(!c.animationLoop||!a.atEnd)a.animating=!1,a.currentSlide=a.animatingTo;a.container.unbind("webkitTransitionEnd transitionend");a.container.bind("webkitTransitionEnd transitionend",function(){a.wrapup(o)})}else a.container.animate(a.args,c.animationSpeed,c.easing,function(){a.wrapup(o)})}c.smoothHeight&&f.smoothHeight(c.animationSpeed)}};a.wrapup=function(b){!q&&!h&&(0===a.currentSlide&&a.animatingTo===a.last&&c.animationLoop?a.setProps(b,"jumpEnd"):a.currentSlide===
 a.last&&(0===a.animatingTo&&c.animationLoop)&&a.setProps(b,"jumpStart"));a.animating=!1;a.currentSlide=a.animatingTo;c.after(a)};a.animateSlides=function(){a.animating||a.flexAnimate(a.getTarget("next"))};a.pause=function(){clearInterval(a.animatedSlides);a.playing=!1;c.pausePlay&&f.pausePlay.update("play");a.syncExists&&f.sync("pause")};a.play=function(){a.animatedSlides=setInterval(a.animateSlides,c.slideshowSpeed);a.playing=!0;c.pausePlay&&f.pausePlay.update("pause");a.syncExists&&f.sync("play")};
 a.canAdvance=function(b,g){var d=p?a.pagingCount-1:a.last;return g?!0:p&&a.currentItem===a.count-1&&0===b&&"prev"===a.direction?!0:p&&0===a.currentItem&&b===a.pagingCount-1&&"next"!==a.direction?!1:b===a.currentSlide&&!p?!1:c.animationLoop?!0:a.atEnd&&0===a.currentSlide&&b===d&&"next"!==a.direction?!1:a.atEnd&&a.currentSlide===d&&0===b&&"next"===a.direction?!1:!0};a.getTarget=function(b){a.direction=b;return"next"===b?a.currentSlide===a.last?0:a.currentSlide+1:0===a.currentSlide?a.last:a.currentSlide-
 1};a.setProps=function(b,g,d){var e,f=b?b:(a.itemW+c.itemMargin)*a.move*a.animatingTo;e=-1*function(){if(h)return"setTouch"===g?b:m&&a.animatingTo===a.last?0:m?a.limit-(a.itemW+c.itemMargin)*a.move*a.animatingTo:a.animatingTo===a.last?a.limit:f;switch(g){case "setTotal":return m?(a.count-1-a.currentSlide+a.cloneOffset)*b:(a.currentSlide+a.cloneOffset)*b;case "setTouch":return b;case "jumpEnd":return m?b:a.count*b;case "jumpStart":return m?a.count*b:b;default:return b}}()+"px";a.transitions&&(e=l?
 "translate3d(0,"+e+",0)":"translate3d("+e+",0,0)",d=void 0!==d?d/1E3+"s":"0s",a.container.css("-"+a.pfx+"-transition-duration",d));a.args[a.prop]=e;(a.transitions||void 0===d)&&a.container.css(a.args)};a.setup=function(b){if(q)a.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===b&&a.slides.eq(a.currentSlide).fadeIn(c.animationSpeed,c.easing),c.smoothHeight&&f.smoothHeight();else{var g,n;"init"===b&&(a.viewport=d('<div class="'+e+'viewport"></div>').css({overflow:"hidden",
 position:"relative"}).appendTo(a).append(a.container),a.cloneCount=0,a.cloneOffset=0,m&&(n=d.makeArray(a.slides).reverse(),a.slides=d(n),a.container.empty().append(a.slides)));c.animationLoop&&!h&&(a.cloneCount=2,a.cloneOffset=1,"init"!==b&&a.container.find(".clone").remove(),a.container.append(a.slides.first().clone().addClass("clone")).prepend(a.slides.last().clone().addClass("clone")));a.newSlides=d(c.selector,a);g=m?a.count-1-a.currentSlide+a.cloneOffset:a.currentSlide+a.cloneOffset;l&&!h?(a.container.height(200*
 (a.count+a.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){a.newSlides.css({display:"block"});a.doMath();a.viewport.height(a.h);a.setProps(g*a.h,"init")},"init"===b?100:0)):(a.container.width(200*(a.count+a.cloneCount)+"%"),a.setProps(g*a.computedW,"init"),setTimeout(function(){a.doMath();a.newSlides.css({width:a.computedW,"float":"left",display:"block"});c.smoothHeight&&f.smoothHeight()},"init"===b?100:0))}h||a.slides.removeClass(e+"active-slide").eq(a.currentSlide).addClass(e+
 "active-slide")};a.doMath=function(){var b=a.slides.first(),d=c.itemMargin,e=c.minItems,f=c.maxItems;a.w=a.width();a.h=b.height();a.boxPadding=b.outerWidth()-b.width();h?(a.itemT=c.itemWidth+d,a.minW=e?e*a.itemT:a.w,a.maxW=f?f*a.itemT:a.w,a.itemW=a.minW>a.w?(a.w-d*e)/e:a.maxW<a.w?(a.w-d*f)/f:c.itemWidth>a.w?a.w:c.itemWidth,a.visible=Math.floor(a.w/(a.itemW+d)),a.move=0<c.move&&c.move<a.visible?c.move:a.visible,a.pagingCount=Math.ceil((a.count-a.visible)/a.move+1),a.last=a.pagingCount-1,a.limit=1===
 a.pagingCount?0:c.itemWidth>a.w?(a.itemW+2*d)*a.count-a.w-d:(a.itemW+d)*a.count-a.w-d):(a.itemW=a.w,a.pagingCount=a.count,a.last=a.count-1);a.computedW=a.itemW-a.boxPadding};a.update=function(b,d){a.doMath();h||(b<a.currentSlide?a.currentSlide+=1:b<=a.currentSlide&&0!==b&&(a.currentSlide-=1),a.animatingTo=a.currentSlide);if(c.controlNav&&!a.manualControls)if("add"===d&&!h||a.pagingCount>a.controlNav.length)f.controlNav.update("add");else if("remove"===d&&!h||a.pagingCount<a.controlNav.length)h&&a.currentSlide>
 a.last&&(a.currentSlide-=1,a.animatingTo-=1),f.controlNav.update("remove",a.last);c.directionNav&&f.directionNav.update()};a.addSlide=function(b,e){var f=d(b);a.count+=1;a.last=a.count-1;l&&m?void 0!==e?a.slides.eq(a.count-e).after(f):a.container.prepend(f):void 0!==e?a.slides.eq(e).before(f):a.container.append(f);a.update(e,"add");a.slides=d(c.selector+":not(.clone)",a);a.setup();c.added(a)};a.removeSlide=function(b){var e=isNaN(b)?a.slides.index(d(b)):b;a.count-=1;a.last=a.count-1;isNaN(b)?d(b,
 a.slides).remove():l&&m?a.slides.eq(a.last).remove():a.slides.eq(b).remove();a.doMath();a.update(e,"remove");a.slides=d(c.selector+":not(.clone)",a);a.setup();c.removed(a)};f.init()};d.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7E3,animationSpeed:600,initDelay:0,randomize:!1,pauseOnAction:!0,pauseOnHover:!1,useCSS:!0,touch:!0,video:!1,controlNav:!0,
 directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:0,maxItems:0,move:0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){}};d.fn.flexslider=function(i){void 0===i&&(i={});if("object"===typeof i)return this.each(function(){var a=d(this),c=a.find(i.selector?
 i.selector:".slides > li");1===c.length?(c.fadeIn(400),i.start&&i.start(a)):void 0===a.data("flexslider")&&new d.flexslider(this,i)});var k=d(this).data("flexslider");switch(i){case "play":k.play();break;case "pause":k.pause();break;case "next":k.flexAnimate(k.getTarget("next"),!0);break;case "prev":case "previous":k.flexAnimate(k.getTarget("prev"),!0);break;default:"number"===typeof i&&k.flexAnimate(i,!0)}}})(jQuery);

var menuStatus;
var App = new Object();

App = {
    splashScreenDuration: 1000,
    init: function() {
        
        //this should run only once
        $("#menu li a").click(function(){
            $("#menu").hide();
            $(".ui-page-active").animate({marginLeft: 0});
	    $("body").scrollTop(0);
            menuStatus = false;
            var p = $(this).parent();
            if($(p).hasClass('active')){
                $("#menu li").removeClass('active');
            } else {
                $("#menu li").removeClass('active');
                $(p).addClass('active');
            }
        });
        
        setTimeout(function() {
		$("#splash").fadeOut(800);
	}, App.splashScreenDuration);
        
        App.pageInit();
	$(document).bind("pagebeforechange", function() {
		//remove anim-done from previous page's slider
		$(".cherry-slider.anim-done").removeClass("anim-done");
	});
        $(document).bind("pageinit", App.pageInit);
	$(document).bind("pageshow", function() {
		$("body").scrollTop(0);
		$("body").scrollTop(0);
		setTimeout(App.windowLoaded, 1000);
	})
    },
    pageInit: function() {
	
	App.navInit();
        
	setTimeout(function() {
		$('.flexslider:not(.flexslidered)').addClass("flexslidered").flexslider({
			animation: "slide",
			controlNav: false
		});
	}, 1000)
      
      
      //custom checkboxes
      $('.on-off:not(.iphoneStyled)').addClass("iphoneStyled").iphoneStyle();
      
      //initialize photoswipe for portfolio page
      if ($(".photoswipe a:not(.photoSwiped)").length) //dont run if already ran before
         $(".photoswipe a:not(.photoSwiped)").addClass("photoSwiped").click(function(e) {
	}).photoSwipe({});
	
	
        $("#menu").hide();
        $(".ui-page-active").css({
            marginLeft: 0
        });
            
	$(".scroll-to-top").click(function() {
		$("body").animate({scrollTop: 0}, 1000);
	});
	
        $("body").scrollTop(0);
        $("body").scrollTop(0);
        setTimeout(App.windowLoaded, 1000);
	
	//maps
	App.refreshMaps();
	App.Forms.bind();
	App.afterPageInit();
    },
    afterPageInit: function() {
      //tap event effects for links
      $("a:not(.tapInEffected)").addClass("tapInEffected").bind("touchstart mousedown", function() {
         $(this).addClass("hover");
      });
      $("a:not(.tapOutEffected)").addClass("tapOutEffected").bind("touchmove touchend mouseup", function() {
         $(this).removeClass("hover");
      });
      
      
   },

    navInit: function() {
        
        //$.event.special.swipe.horizontalDistanceThreshold = 100;
        
	$(".slider-component, .prevent-swipe-menu").bind("swiperight", function(e) {
		e.stopPropagation();
	});
	
        $('.pages').bind("swipeleft", function(){
                $(".ui-page-active").css({
                    marginLeft: "0px",
                }, 300,
                function(){
                    menuStatus = false;
                    $("#menu").hide();
                });
        });
        $('.pages').bind("swiperight", function(){
				if ($(".pages").width() < 1010)
					return;
                $("#menu").show();

                $(".ui-page-active").css({
                    marginLeft: "165px",
                }, 300, function(){
                    menuStatus = true
                });
				$("body").animate({scrollLeft: 0, scrollTop: 0});
        });
        $("a.back-button").click(function(e) {
            e.preventDefault();
            history.back();
        });
        $("a.showMenu").click(function(){
            if(menuStatus != true){
                $("#menu").show();
                $(".ui-page-active").css({
                    marginLeft: "165px",
                });
		menuStatus = true;
                return false;
            } else {
                $(".ui-page-active").css({
                    marginLeft: "0px",
                });
		menuStatus = false;
                return false;
            }
        });
        
        
        
    },
    windowLoaded: function() {
        //cherry slider
        if ($(".cherry-slider:not(.anim-done)").length) {
            $.each($(".cherry-slider"), function(i, elem) {
                App.cherrySliderInit(elem)
            });
        }
    },
    refreshMaps: function(){
	if (!$(".map").length)
	   return;
	$('.map').each(function(){
	     var me = $(this);
	     var locationTitle = $(this).attr('data-location');
	     var myId = $(me).attr('id');
	     var geocoder = new google.maps.Geocoder();
	     geocoder.geocode({
		  address: locationTitle
	      }, function(locResult) {
		  var latVal = locResult[0].geometry.location.lat();
		  var longVal = locResult[0].geometry.location.lng();
		  App.initializeMap(myId, locationTitle, latVal, longVal);
	      });
	});
     },
     initializeMap: function(locationVal, titleVal, latVal, longVal) {
	var latlng = new google.maps.LatLng(latVal, longVal);
	var settings = {
		zoom: 13,
		center: latlng,
		mapTypeControl: false,
		mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
		navigationControl: false,
		navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
		streetViewControl: false,
		zoomControl: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP 
	};
	var map = new google.maps.Map(document.getElementById(locationVal), settings);
	
	
	var nibrasPos= new google.maps.LatLng(latVal, longVal);
	var nibrasMarker = new google.maps.Marker({
		  position: nibrasPos,
		  map: map,
		  title:titleVal
	});
     },
    cherrySliderInit: function(elem) {
        var sliderHelper = {
            myParseInt: function(val) {
                if (val == undefined)
                    return undefined;
                if (val.indexOf("%") >= 0)
                    return val;
                else
                    return parseInt(val)
            },
            animate: function(item) {
		if (!$(elem).is(":visible")) {
			return;
		}
                //decide anim
                var anim = item.attr("anim");
                var direction = item.attr("anim-direction");
                var left = sliderHelper.myParseInt(item.attr("anim-position-left"));
                var right = sliderHelper.myParseInt(item.attr("anim-position-right"));
                var top = sliderHelper.myParseInt(item.attr("anim-position-top"));
                var animSpeed = sliderHelper.myParseInt(item.attr("anim-speed"));
		var times = sliderHelper.myParseInt(item.attr("anim-times"));
                var action = item.attr("anim-action");
                if (action == "restart") {
                    setTimeout(function() {
                        sliderHelper.animate(item.parent().find(".anim-item:first"));
                    }, animSpeed);
                } else if (action == "break") {
                    if (anim == "fade") {
                        item.prevAll(".anim-item").fadeOut(animSpeed);
                    } else {
                        item.prevAll(".anim-item").effect(anim, {mode: "hide", direction: direction}, animSpeed);
                    }
                    setTimeout(function() {
                        if (item.next().hasClass("anim-item"))
                            sliderHelper.animate(item.next())
                    }, animSpeed);

                } else if (anim == "slide") {
                    if (direction == "right" && left)
                        item.css({left: $(item).parents(".cherry-slider").width()});
                    if (direction == "left" && right)
                        item.css({right: $(item).parents(".cherry-slider").width()});
                    if (direction == "down")
                        item.css({top: $(item).parents(".cherry-slider").height()});
                    item.css({opacity: 0}).show();
                    item.animate({opacity: 1, right: right, left: left, top: top}, parseInt(animSpeed), function() {
                        if (item.next().hasClass("anim-item"))
                            sliderHelper.animate(item.next())
                    });
                } else if (anim == "fade") {
                    
                    item.css({opacity: 0, right: right, left: left, top: top});
                    item.show();
                    item.animate({opacity: 1}, parseInt(animSpeed), function() {
                        if (item.next().hasClass("anim-item"))
                            sliderHelper.animate(item.next())
                    });
                } else if (anim == "drop") {
                    if (right != undefined)
                        left = $(item).parents(".cherry-slider").width() - right - item.width();
                    item.css({opacity: 1, left: left, top: top});
                    //item.hide();
                    item.effect("drop", {mode: "show", distance: 8, direction: direction}, animSpeed, function() {
                        if (item.next().hasClass("anim-item"))
                            sliderHelper.animate(item.next())
                    });
                } else if (anim == "bounce") {
                    if (right != undefined)
                        left = $(item).parents(".cherry-slider").width() - right - item.width();
                    item.css({opacity: 1, left: left, top: top});
                    item.hide();
                    item.effect("bounce", {times: (times == undefined ? 1 : times), distance: 10, mode: "show", direction: direction}, animSpeed, function() {
                        if (item.next().hasClass("anim-item"))
                            sliderHelper.animate(item.next())
                    });
                    
                } else if (anim == "puff") {
                    if (right != undefined)
                        left = $(item).parents(".cherry-slider").width() - right - item.width();
                    item.css({opacity: 1, left: left, top: top});
                    item.hide();
                    item.effect("puff", {mode: "show", direction: direction}, animSpeed, function() {
                        if (item.next().hasClass("anim-item"))
                            sliderHelper.animate(item.next())
                    });
                } else if (anim == "blind") {
                    if (right != undefined)
                        left = $(item).parents(".cherry-slider").width() - right - item.width();
                    item.css({opacity: 1, left: left, top: top});
                    item.hide();
                    item.effect("blind", {mode: "show", direction: direction}, animSpeed, function() {
                        if (item.next().hasClass("anim-item"))
                            sliderHelper.animate(item.next())
                    });
                }
            }
        }
	if ($(elem).hasClass("anim-done")) {
            //restart anim
	    $(".anim-item").effect("fade", {mode: "hide"}, 100, function() {
		sliderHelper.animate($(".anim-item:first", $(elem)));
	    });
	    return;
        }
        else
            $(elem).addClass("anim-done");
        
        $(".anim-item", elem).css({opacity: 0}).show();
        var currentItem = $(".anim-item:first", elem);
        sliderHelper.animate(currentItem);
    },
    Util: {
	mobile: {
         detect:function(){
            var uagent = navigator.userAgent.toLowerCase(); 
            var list = this.mobiles;
            var ismobile = false;
            for(var d=0;d<list.length;d+=1){
                    if(uagent.indexOf(list[d])!=-1){
                            ismobile = list[d];
                    }
            }
            return ismobile;
         },
         mobiles:[
            "midp","240x320","blackberry","netfront","nokia","panasonic",
            "portalmmm","sharp","sie-","sonyericsson","symbian",
            "windows ce","benq","mda","mot-","opera mini",
            "philips","pocket pc","sagem","samsung","sda",
            "sgh-","vodafone","xda","palm","iphone",
            "ipod","android"
         ]
       }
    },
    Forms: {
      bind: function() {
         // Add required class to inputs
         $(':input[required]').addClass('required');
         
         // Block submit if there are invalid classes found
         $('form.ajax-form:not(.html5enhanced)').addClass("html5enhanced").submit(function() {
               var formEl = this;
                 $('input,textarea').each(function() {
                         App.Forms.validate(this);
                 });
                 
                 if(($(this).find(".invalid").length) == 0){
                         // Delete all placeholder text
                         $('input,textarea').each(function() {
                                 if($(this).val() == $(this).attr('placeholder')) $(this).val('');
                         });
                         

						//submit without ajax
						if ($(formEl).hasClass("no-ajax")) {
							return true;
						}
						
                         //if it reached here, submit form via ajax
                         $.ajax({
                           url: $(formEl).attr("action"),
                           type: $(formEl).attr("method"),
                           data: $(formEl).serialize(),
                           success: function(r) {
                              if (r) {
                                 $(".success-message").slideDown().removeClass("hidden");
                              }
                           }
                         })
                         return false;
                 }else{
                         return false;
                 }
         });

      },
      is_email: function(value){
	return (/^([a-z0-9])(([-a-z0-9._])*([a-z0-9]))*\@([a-z0-9])(([a-z0-9-])*([a-z0-9]))+(\.([a-z0-9])([-a-z0-9_-])?([a-z0-9])+)+$/).test(value);
      },
      is_url: function(value){
              return (/^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i).test(value);
      },
      is_number: function(value){
              return (typeof(value) === 'number' || typeof(value) === 'string') && value !== '' && !isNaN(value);
      },
      validate: function(element) {
         var $$ = $(element);
         var validator = element.getAttribute('type'); // Using pure javascript because jQuery always returns text in none HTML5 browsers
         var valid = true;
         var apply_class_to = $$;
         
         var required = element.getAttribute('required') == null ? false : true;
         switch(validator){
                 case 'email': valid = App.Forms.is_email($$.val()); break;
                 case 'url': valid = App.Forms.is_url($$.val()); break;
                 case 'number': valid = App.Forms.is_number($$.val()); break;
         }
         
         // Extra required validation
         if(valid && required && $$.val().replace($$.attr('placeholder'), '') == ''){
                 valid = false;
         }
         
         // Set input to valid of invalid
         if(valid || (!required && $$.val() == '')){
                 apply_class_to.removeClass('invalid');
                 apply_class_to.addClass('valid');
                 return true;
         }else{
                 apply_class_to.removeClass('valid');
                 apply_class_to.addClass('invalid');
                 return false;
         }
      }

   }

}


$(App.init);
