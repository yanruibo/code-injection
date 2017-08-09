








            app.initialize();
        







            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        

(function($) {
  $.widget('mobile.tabbar', $.mobile.navbar, {
    _create: function() {
      // Set the theme before we call the prototype, which will 
      // ensure buttonMarkup() correctly grabs the inheritied theme.
      // We default to the "a" swatch if none is found
      var theme = this.element.jqmData('theme') || "a";
      this.element.addClass('ui-footer ui-footer-fixed ui-bar-' + theme);

      // Make sure the page has padding added to it to account for the fixed bar
      this.element.closest('[data-role="page"]').addClass('ui-page-footer-fixed');


      // Call the NavBar _create prototype
      $.mobile.navbar.prototype._create.call(this);
    },

    // Set the active URL for the Tab Bar, and highlight that button on the bar
    setActive: function(url) {
      // Sometimes the active state isn't properly cleared, so we reset it ourselves
      this.element.find('a').removeClass('ui-btn-active ui-state-persist');
      this.element.find('a[href="' + url + '"]').addClass('ui-btn-active ui-state-persist');
    }
  });

  $(document).bind('pagecreate create', function(e) {
    return $(e.target).find(":jqmData(role='tabbar')").tabbar();
  });
  
  $(":jqmData(role='page')").live('pageshow', function(e) {
    // Grab the id of the page that's showing, and select it on the Tab Bar on the page
    var tabBar, id = $(e.target).attr('id');

    tabBar = $.mobile.activePage.find(':jqmData(role="tabbar")');
    if(tabBar.length) {
      tabBar.tabbar('setActive', '#' + id);
    }
  });

var attachEvents = function() {
	var hoverDelay = $.mobile.buttonMarkup.hoverDelay, hov, foc;

	$( document ).bind( {
		"vmousedown vmousecancel vmouseup vmouseover vmouseout focus blur scrollstart": function( event ) {
			var theme,
				$btn = $( closestEnabledButton( event.target ) ),
				evt = event.type;
		
			if ( $btn.length ) {
				theme = $btn.attr( "data-" + $.mobile.ns + "theme" );
		
				if ( evt === "vmousedown" ) {
					if ( $.support.touch ) {
						hov = setTimeout(function() {
							$btn.removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-down-" + theme );
						}, hoverDelay );
					} else {
						$btn.removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-down-" + theme );
					}
				} else if ( evt === "vmousecancel" || evt === "vmouseup" ) {
					$btn.removeClass( "ui-btn-down-" + theme ).addClass( "ui-btn-up-" + theme );
				} else if ( evt === "vmouseover" || evt === "focus" ) {
					if ( $.support.touch ) {
						foc = setTimeout(function() {
							$btn.removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-hover-" + theme );
						}, hoverDelay );
					} else {
						$btn.removeClass( "ui-btn-up-" + theme ).addClass( "ui-btn-hover-" + theme );
					}
				} else if ( evt === "vmouseout" || evt === "blur" || evt === "scrollstart" ) {
					$btn.removeClass( "ui-btn-hover-" + theme  + " ui-btn-down-" + theme ).addClass( "ui-btn-up-" + theme );
					if ( hov ) {
						clearTimeout( hov );
					}
					if ( foc ) {
						clearTimeout( foc );
					}
				}
			}
		},
		"focusin focus": function( event ){
			$( closestEnabledButton( event.target ) ).addClass( $.mobile.focusClass );
		},
		"focusout blur": function( event ){
			$( closestEnabledButton( event.target ) ).removeClass( $.mobile.focusClass );
		}
	});

	attachEvents = null;
};

$.fn.buttonMarkup = function( options ) {
	var $workingSet = this;

	// Enforce options to be of type string
	options = ( options && ( $.type( options ) == "object" ) )? options : {};
	for ( var i = 0; i < $workingSet.length; i++ ) {
		var el = $workingSet.eq( i ),
			e = el[ 0 ],
			o = $.extend( {}, $.fn.buttonMarkup.defaults, {
				icon:       options.icon       !== undefined ? options.icon       : el.jqmData( "icon" ),
				iconpos:    options.iconpos    !== undefined ? options.iconpos    : el.jqmData( "iconpos" ),
				theme:      options.theme      !== undefined ? options.theme      : el.jqmData( "theme" ) || $.mobile.getInheritedTheme( el, "c" ),
				inline:     options.inline     !== undefined ? options.inline     : el.jqmData( "inline" ),
				shadow:     options.shadow     !== undefined ? options.shadow     : el.jqmData( "shadow" ),
				corners:    options.corners    !== undefined ? options.corners    : el.jqmData( "corners" ),
				iconshadow: options.iconshadow !== undefined ? options.iconshadow : el.jqmData( "iconshadow" ),
				iconsize:   options.iconsize   !== undefined ? options.iconsize   : el.jqmData( "iconsize" ),
				mini:       options.mini       !== undefined ? options.mini       : el.jqmData( "mini" )
			}, options ),

			// Classes Defined
			innerClass = "ui-btn-inner",
			textClass = "ui-btn-text",
			buttonClass, iconClass,
			// Button inner markup
			buttonInner,
			buttonText,
			buttonIcon,
			buttonElements;

		$.each(o, function(key, value) {
			e.setAttribute( "data-" + $.mobile.ns + key, value );
			el.jqmData(key, value);
		});

		// Check if this element is already enhanced
		buttonElements = $.data(((e.tagName === "INPUT" || e.tagName === "BUTTON") ? e.parentNode : e), "buttonElements");

		if (buttonElements) {
			e = buttonElements.outer;
			el = $(e);
			buttonInner = buttonElements.inner;
			buttonText = buttonElements.text;
			// We will recreate this icon below
			$(buttonElements.icon).remove();
			buttonElements.icon = null;
		}
		else {
			buttonInner = document.createElement( o.wrapperEls );
			buttonText = document.createElement( o.wrapperEls );
		}
		buttonIcon = o.icon ? document.createElement( "span" ) : null;

		if ( attachEvents && !buttonElements) {
			attachEvents();
		}
		
		// if not, try to find closest theme container	
		if ( !o.theme ) {
			o.theme = $.mobile.getInheritedTheme( el, "c" );	
		}		

		buttonClass = "ui-btn ui-btn-up-" + o.theme;
		buttonClass += o.inline ? " ui-btn-inline" : "";
		buttonClass += o.shadow ? " ui-shadow" : "";
		buttonClass += o.corners ? " ui-btn-corner-all" : "";

		if ( o.mini !== undefined ) {
			// Used to control styling in headers/footers, where buttons default to `mini` style.
			buttonClass += o.mini ? " ui-mini" : " ui-fullsize";
		}
		
		if ( o.inline !== undefined ) {			
			// Used to control styling in headers/footers, where buttons default to `mini` style.
			buttonClass += o.inline === false ? " ui-btn-block" : " ui-btn-inline";
		}
		
		
		if ( o.icon ) {
			o.icon = "ui-icon-" + o.icon;
			o.iconpos = o.iconpos || "left";

			iconClass = "ui-icon " + o.icon;

			if ( o.iconshadow ) {
				iconClass += " ui-icon-shadow";
			}

			if ( o.iconsize ) {
				iconClass += " ui-iconsize-" + o.iconsize;
			}
		}

		if ( o.iconpos ) {
			buttonClass += " ui-btn-icon-" + o.iconpos;

			if ( o.iconpos == "notext" && !el.attr( "title" ) ) {
				el.attr( "title", el.getEncodedText() );
			}
		}
    
		innerClass += o.corners ? " ui-btn-corner-all" : "";

		if ( o.iconpos && o.iconpos === "notext" && !el.attr( "title" ) ) {
			el.attr( "title", el.getEncodedText() );
		}

		if ( buttonElements ) {
			el.removeClass( buttonElements.bcls || "" );
		}
		el.removeClass( "ui-link" ).addClass( buttonClass );

		buttonInner.className = innerClass;

		buttonText.className = textClass;
		if ( !buttonElements ) {
			buttonInner.appendChild( buttonText );
		}
		if ( buttonIcon ) {
			buttonIcon.className = iconClass;
			if ( !(buttonElements && buttonElements.icon) ) {
				buttonIcon.appendChild( document.createTextNode("\u00a0") );
				buttonInner.appendChild( buttonIcon );
			}
		}

		while ( e.firstChild && !buttonElements) {
			buttonText.appendChild( e.firstChild );
		}

		if ( !buttonElements ) {
			e.appendChild( buttonInner );
		}

		// Assign a structure containing the elements of this button to the elements of this button. This
		// will allow us to recognize this as an already-enhanced button in future calls to buttonMarkup().
		buttonElements = {
			bcls  : buttonClass,
			outer : e,
			inner : buttonInner,
			text  : buttonText,
			icon  : buttonIcon
		};

		$.data(e,           'buttonElements', buttonElements);
		$.data(buttonInner, 'buttonElements', buttonElements);
		$.data(buttonText,  'buttonElements', buttonElements);
		if (buttonIcon) {
			$.data(buttonIcon, 'buttonElements', buttonElements);
		}
	}

	return this;
};

$.fn.buttonMarkup.defaults = {
	corners: true,
	shadow: true,
	iconshadow: true,
	iconsize: 18,
	wrapperEls: "span"
};

function closestEnabledButton( element ) {
    var cname;

    while ( element ) {
		// Note that we check for typeof className below because the element we
		// handed could be in an SVG DOM where className on SVG elements is defined to
		// be of a different type (SVGAnimatedString). We only operate on HTML DOM
		// elements, so we look for plain "string".
        cname = ( typeof element.className === 'string' ) && (element.className + ' ');
        if ( cname && cname.indexOf("ui-btn ") > -1 && cname.indexOf("ui-disabled ") < 0 ) {
            break;
        }

        element = element.parentNode;
    }

    return element;
}

	
})(jQuery);












            localStorage.clear();
            app.initialize();
        

           //$('#categories').hide();
        

afterEach(function() {
    document.getElementById('stage').innerHTML = '';
});

var helper = {
    trigger: function(obj, name) {
        var e = document.createEvent('Event');
        e.initEvent(name, true, true);
        obj.dispatchEvent(e);
    }
};


describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'deviceready');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.deviceready.calls.length > 0);
            }, 'deviceready should be called once', 500);

            runs(function() {
                expect(app.deviceready).toHaveBeenCalled();
            });
        });
    });

    describe('deviceready', function() {
        it('should report that it fired', function() {
            spyOn(app, 'report');
            app.deviceready();
            expect(app.report).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('report', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="status pending">Pending</p>',
                            '    <p class="status complete hide">Complete</p>',
                            '</div>'].join('\n');
        });

        it('should show the completion state', function() {
            app.report('deviceready');
            var el = document.querySelector('#deviceready .complete:not(.hide)');
            expect(el).toBeTruthy();
        });

        it('should hide the pending state', function() {
            app.report('deviceready');
            var el = document.querySelector('#deviceready .pending.hide');
            expect(el).toBeTruthy();
        });
    });
});


var app = {
initialize: function() {
    this.bind();
    //initTransition();
},
bind: function() {
    document.addEventListener('deviceready', this.deviceready, false);
    document.addEventListener("menu_quit", onMenuKeyDown, false);
},
deviceready: function() {
    // note that this is an event handler so the scope is that of the event
    // so we need to call app.report(), and not this.report()
    clear_outdated_localstorage();
}
};



function onMenuKeyDown() {
    // Handle the back buton
    alert("quit!");
}


function clear_outdated_localstorage(){
    var hours = 12; // Reset when storage is more than 24hours
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
    	getCategories();
        localStorage.setItem('setupTime', now);
        console.log('set storage time and get categories');
    } else {
        if(now-setupTime > hours*60*60*1000) {
            localStorage.clear()
            getCategories();            
            localStorage.setItem('setupTime', now);
            console.log('clear storage and set storage time');
        }else{
            console.log('get categories');
            var currentval = localStorage.categories;
            currentval = JSON.parse(currentval);
            setCategories(currentval);
        }
    }
}


function getCategories(){
    console.log('show categories');
    $.ajax({
           type: "POST",
           url: "http://www.xrimaonline.gr/jsonrpc",
           cache: false,
           dataType: "jsonp",
           data: {"jsonrpc": "2.0", "method": "getCategories", "params":["1"],id:"2"},
           success: function (result) {
           //setCategory(result);
           setCategories(result);
           localStorage.categories = JSON.stringify(result);
           $.mobile.hidePageLoadingMsg();
           },
           error: function (request, status, error) {
           console.log(error);
             alert('Please check your internet connection...');
             device.exitApp();
           },
           timeout: 10 * 10000,
           beforeSend: function (){
           $.mobile.loadingMessageTextVisible = true;
           $.mobile.loadingMessage = "please wait...";
           $.mobile.showPageLoadingMsg();
           },
           complete: function (){
           //$("#ajaxspinner").hide();
           //alert('edit load');
           }
           });
}

function setCategories(data){
    
    var level = 0;
    var counter = 0;
    //var items = '<li data-role="list-divider" role="heading">Κατηγορίες</li>';
    var items="";
    
    while (counter< data.result.length){
        //items += '<li  data-theme="c"><a data-ajax="false"  data-transition="flip" href="category.html?id='+data.result[counter]['page_unique_id']+'">'+data.result[counter]['page_title']+'</a></li>';
        items += '<li  data-theme="c"><a href="javascript:gotoUrl('+data.result[counter]['page_unique_id']+');">'+data.result[counter]['page_title']+'</a></li>';
        counter+=1;
    }
    $('#categories li').remove();
    $('#categories').html(items);
    $('#categories').trigger("create");
    $('#categories').listview('refresh');
    console.log('items loaded');
    
}

function gotoUrl(id){
	//set id on localstorage
	localStorage.catid = id;
	
	//send to page
	//$.mobile.changePage(page);
	window.location.href = "category.html";
}















var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        //app.report('deviceready');
        app.getContents();
    },
    getContents: function(){
        //var params = document.location.href;
        //console.log(params);
        //var id = getURLParameter('id'  , params);
        var id = localStorage.catid;
        console.log(id);
        console.log('show contents');
        $.mobile.showPageLoadingMsg();
        
        $.ajax({
               type: "POST",
               url: "http://www.xrimaonline.gr/jsonrpc",
               cache: false,
               dataType: "jsonp",
               data: {"jsonrpc": "2.0", "method": "getArticles", "params":["1",id,"0","20"],id:"2"},
               success: function (result) {
                    //setCategory(result);
                    console.log(result);
                    setContents(result);
                    $.mobile.hidePageLoadingMsg();
               },
               timeout: 10 * 10000,
               error: function (request, status, error) {
               		alert('Please check your internet connection...');
               		device.exitApp();
               },
               beforeSend: function (){
                    //$.mobile.loadingMessageTextVisible = true;
                    //$.mobile.loadingMessage = "please wait...";
                    //$.mobile.showPageLoadingMsg();
                    //$("#ajaxspinner").show();
               },
               complete: function (){
                    //$("#ajaxspinner").hide();
                    //alert('edit load');
               }
               });
        
        
    }
};

$(document).live('pageshow', '#contentin',  function(e , ui) {
    //var params = e.currentTarget.location.hash;
    //var id = getURLParameter('id'  , params);
    var id = localStorage.id;       
    if(id != "null"){
        setArticleContent(id, "1");
    }
                 
});

$(document).live('pagebeforeshow', '#contentin',  function(e , ui) {
                 //var params = e.currentTarget.location.hash;
                 //var id = getURLParameter('id'  , params);
                 var id = localStorage.id;

                 if(id != "null"){
                 $('#content_title').html("");
                 $('#content_photo').html("");
                 $('#content_desc').html("");
                 $('#content_video').html("");
                 }
});

function getURLParameter(name , paramaters) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(paramaters)||[,null])[1]
    );
}

function setArticleContent(pageId, lang){
    $.mobile.showPageLoadingMsg();
    console.log('-->'+localStorage.id);
    $.ajax({
           type: "POST",
           url: "http://www.xrimaonline.gr/jsonrpc",
           cache: false,
           dataType: "jsonp",
        data: {"jsonrpc": "2.0", "method": "getArticle", "params":[pageId,lang],id:"2"},
           success: function (result) {
           setArticle(result);
           },
           timeout: 10 * 10000,
           error: function (request, status, error) {
           		alert('Please check your internet connection...');
           		device.exitApp();
           },    		
           beforeSend: function (){
           $.mobile.loadingMessageTextVisible = true;
           $.mobile.loadingMessage = "please wait...";
           $.mobile.showPageLoadingMsg();
           },
           complete: function (){
           $.mobile.hidePageLoadingMsg();
           }
           });
}

function setArticle(result){
    
    //set content title
    var page_title = result.result['page_title'];
    if(page_title){
        $('#content_title').html("<h3>"+page_title+"</h3>");
    }
    
    //set content text
    var strin = result.result['page_content'];
    $('#content_desc').html(strin);
    var t = $('#content_desc');
    t.html(t.text());
    
    //set photo
    var photo = result.result['photo'];
    if(photo){
      var photosrc = "http://www.xrimaonline.gr/thumbnail?filepath="+photo+"&width=290";
      var photostr = '<img src="'+photosrc+'" align="left" style="padding:0px 10px 10px 0px;">';
      $('#content_photo').html(photostr);
    }

    //set video
    var video = result.result['youtubeid'];
    if(video){
        var videostr = '<iframe  class="youtube-player" type="text/html" width="280" height="194" src="http://www.youtube.com/embed/'+video+'" frameborder="0"></iframe>';
        $('#content_video').html(videostr);
    }
}

function setContents(data){

    var level = 0;
    var counter = 0;
    var items = '<li data-role="list-divider" role="heading">Άρθρα</li>';
    var items2 = '';
    var linkstr = '';

    while (counter< data.result.length){
        
        var video = data.result[counter]['youtubeid'];
        var pdf = data.result[counter]['pdf'];

        var photo = data.result[counter]['photo'];
        if(photo != ""){
            photostr = "http://www.xrimaonline.gr/thumbnail?filepath="+photo+"&width=290";
            //linkstr = '#contentin?id='+data.result[counter]['page_id'];
            linkstr = 'javascript:gotopage('+data.result[counter]['page_id']+')';
        }
        
        if(photo == null && video != null){
            photostr = "http://img.youtube.com/vi/"+video+"/hqdefault.jpg";
            linkstr = "javascript:window.plugins.childBrowser.openExternal('http://www.youtube.com/watch?v="+video+"');";
        }
        
        if(pdf != null){
            photostr = "http://www.xrimaonline.gr/thumbnail?filepath="+photo+"&width=290";
            linkstr = "javascript:window.plugins.childBrowser.openExternal('http://www.xrimaonline.gr/"+pdf+"');";
        }        
        
        items2 += '<li  data-icon="false"><a href="'+linkstr+'"><h2 class="ui-li-heading" style="white-space:normal">'+data.result[counter]['page_title']+'</h2><p><img src="'+photostr+'" width="290"/></p><p class="ui-li-desc" style="white-space:normal">'+data.result[counter]['page_description']+'</p></a></li>';
        
        counter+=1;
    }

    $('#contents li').remove();
    $('#contents').html(items2);
    $('#contents').trigger("create");
    $('#contents').listview('refresh');
    console.log('items loaded');
}

function gotopage(id){
	localStorage.id = id;
	$.mobile.changePage('#contentin',{transition:"slide"});
}










