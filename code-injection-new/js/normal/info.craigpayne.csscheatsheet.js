






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
        


                var GOOG_FIXURL_LANG = (navigator.language || '').slice(0,2),GOOG_FIXURL_SITE = location.host;
            


















            $().ready(function(){
                var library = getLibrary();
                library = JSLINQ(library)
                        .OrderBy(function(item) { return item.property; })
                        .Select(function(item){ return item;});

                $(library.items).each(function(index, element){
                    $(".data").append(element.description);
                });


                $("#navigation a").click(function(e){
                    $("#navigation a").each(function(index, element){
                        $(element).parent().attr("class", "");
                    });

                    var buttonName = $(this).text();
                    $(this).parent().attr("class", "active");
                    var items = JSLINQ(library.items)
                            .Where(function(item){return item.type == buttonName});

                    $("#information").html("");
                    $("#information").append("<tr><td><strong>Property</strong></td><td><strong>Description</strong></td><td><strong>Version</strong></td></tr>");
                    $(items.items).each(function(index, element){
                        $("#information").append("<tr>" +
                                "<td>" + element.property + "</td>" +
                                "<td>" + element.description + "</td>" +
                                "<td>" + element.version + "</td>" +
                                "</tr>");
                    });

                })
            });
        

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});


var toggleHandler = function(toggle) {
    var toggle = toggle;
    var radio = $(toggle).find("input");

    var checkToggleState = function() {
        if (radio.eq(0).is(":checked")) {
            $(toggle).removeClass("toggle-off");
        } else {
            $(toggle).addClass("toggle-off");
        }
    };

    checkToggleState();

    radio.eq(0).click(function() {
        $(toggle).toggleClass("toggle-off");
    });

    radio.eq(1).click(function() {
        $(toggle).toggleClass("toggle-off");
    });
};

$(document).ready(function() {
    $(".toggle").each(function(index, toggle) {
        toggleHandler(toggle);
    });
});


// Some general UI pack related JS

$(function () {
    // Custom selects
    $("select").dropkick();
});

$(document).ready(function() {
    // Todo list
    $(".todo li").click(function() {
        $(this).toggleClass("todo-done");
    });

    // Init tooltips
    $("[data-toggle=tooltip]").tooltip("show");

    // Init tags input
    $("#tagsinput").tagsInput();

    // Init jQuery UI slider
    $("#slider").slider({
        min: 1,
        max: 5,
        value: 2,
        orientation: "horizontal",
        range: "min",
    });

    // JS input/textarea placeholder
    $("input, textarea").placeholder();

    // Make pagination demo work
    $(".pagination a").click(function() {
        if (!$(this).parent().hasClass("previous") && !$(this).parent().hasClass("next")) {
            $(this).parent().siblings("li").removeClass("active");
            $(this).parent().addClass("active");
        }
    });

    $(".btn-group a").click(function() {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    });

    // Disable link click not scroll top
    $("a[href='#']").click(function() {
        return false
    });

});






/**
 * DropKick
 *
 * Highly customizable <select> lists
 * https://github.com/JamieLottering/DropKick
 *
 * &copy; 2011 Jamie Lottering <http://github.com/JamieLottering>
 *                        <http://twitter.com/JamieLottering>
 * 
 */
(function ($, window, document) {

  document.documentElement.className = document.documentElement.className + ' dk_fouc';
  
  var
    // Public methods exposed to $.fn.dropkick()
    methods = {},

    // Cache every <select> element that gets dropkicked
    lists   = [],

    // Convenience keys for keyboard navigation
    keyMap = {
      'left'  : 37,
      'up'    : 38,
      'right' : 39,
      'down'  : 40,
      'enter' : 13
    },

    // HTML template for the dropdowns
    dropdownTemplate = [
      '<div class="dk_container {{ classname }}" id="dk_container_{{ id }}" tabindex="{{ tabindex }}">',
        '<a class="dk_toggle">',
          '<span class="dk_label">{{ label }}</span>',
          '<span class="select-icon"></span>',
        '</a>',
        '<div class="dk_options">',
          '<ul class="dk_options_inner">',
          '</ul>',
        '</div>',
      '</div>'
    ].join(''),

    // HTML template for dropdown options
    optionTemplate = '<li class="{{ current }}"><a data-dk-dropdown-value="{{ value }}">{{ text }}</a></li>',

    // Some nice default values
    defaults = {
      startSpeed : 100,  // I recommend a high value here, I feel it makes the changes less noticeable to the user
      theme  : false,
      change : false
    },

    // Make sure we only bind keydown on the document once
    keysBound = false
  ;

  // Called by using $('foo').dropkick();
  methods.init = function (settings) {
    settings = $.extend({}, defaults, settings);

    return this.each(function () {
      var
        // The current <select> element
        $select = $(this),

        // Store a reference to the originally selected <option> element
        $original = $select.find(':selected').first(),

        // Save all of the <option> elements
        $options = $select.find('option'),

        // We store lots of great stuff using jQuery data
        data = $select.data('dropkick') || {},

        // This gets applied to the 'dk_container' element
        id = $select.attr('id') || $select.attr('name'),

        // This gets updated to be equal to the longest <option> element
        width  = settings.width || $select.outerWidth(),

        // Check if we have a tabindex set or not
        tabindex  = $select.attr('tabindex') ? $select.attr('tabindex') : '',

        // Check if we have a class name set or not
        classname  = $select.attr('class') ? $select.attr('class') : '',

        // The completed dk_container element
        $dk = false,

        theme
      ;

      // Dont do anything if we've already setup dropkick on this element
      if (data.id) {
        return $select;
      } else {
        data.settings  = settings;
        data.tabindex  = tabindex;
        data.classname = classname;
        data.id        = id;
        data.$original = $original;
        data.$select   = $select;
        data.value     = _notBlank($select.val()) || _notBlank($original.attr('value'));
        data.label     = $original.text();
        data.options   = $options;
      }

      // Build the dropdown HTML
      $dk = _build(dropdownTemplate, data);

      // Make the dropdown fixed width if desired
      $dk.find('.dk_toggle').css({
        // Disable inline width since it should fill all available parrent space
        // 'width' : width + 'px'
      });

      // Hide the <select> list and place our new one in front of it
      $select.before($dk);

      // Update the reference to $dk
      $dk = $('#dk_container_' + id).addClass('dk_shown');

      // Save the current theme
      theme = settings.theme ? settings.theme : 'default';
      $dk.addClass('dk_theme_' + theme);
      data.theme = theme;

      // Save the updated $dk reference into our data object
      data.$dk = $dk;

      // Save the dropkick data onto the <select> element
      $select.data('dropkick', data);

      // Do the same for the dropdown, but add a few helpers
      $dk.data('dropkick', data);

      lists[lists.length] = $select;

      // Focus events
      $dk.bind('focus.dropkick', function (e) {
        $dk.addClass('dk_focus');
      }).bind('blur.dropkick', function (e) {
        $dk.removeClass('dk_open dk_focus');
      });

      setTimeout(function () {
        $select.hide();
      }, 0);
    });
  };

  // Allows dynamic theme changes
  methods.theme = function (newTheme) {
    var
      $select   = $(this),
      list      = $select.data('dropkick'),
      $dk       = list.$dk,
      oldtheme  = 'dk_theme_' + list.theme
    ;

    $dk.removeClass(oldtheme).addClass('dk_theme_' + newTheme);

    list.theme = newTheme;
  };

  // Reset all <selects and dropdowns in our lists array
  methods.reset = function () {
    for (var i = 0, l = lists.length; i < l; i++) {
      var
        listData  = lists[i].data('dropkick'),
        $dk       = listData.$dk,
        $current  = $dk.find('li').first()
      ;

      $dk.find('.dk_label').text(listData.label);
      $dk.find('.dk_options_inner').animate({ scrollTop: 0 }, 0);

      _setCurrent($current, $dk);
      _updateFields($current, $dk, true);
    }
  };

  // Expose the plugin
  $.fn.dropkick = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    }
  };

  // private
  function _handleKeyBoardNav(e, $dk) {
    var
      code     = e.keyCode,
      data     = $dk.data('dropkick'),
      options  = $dk.find('.dk_options'),
      open     = $dk.hasClass('dk_open'),
      current  = $dk.find('.dk_option_current'),
      first    = options.find('li').first(),
      last     = options.find('li').last(),
      next,
      prev
    ;

    switch (code) {
      case keyMap.enter:
        if (open) {
          _updateFields(current.find('a'), $dk);
          _closeDropdown($dk);
        } else {
          _openDropdown($dk);
        }
        e.preventDefault();
      break;

      case keyMap.up:
        prev = current.prev('li');
        if (open) {
          if (prev.length) {
            _setCurrent(prev, $dk);
          } else {
            _setCurrent(last, $dk);
          }
        } else {
          _openDropdown($dk);
        }
        e.preventDefault();
      break;

      case keyMap.down:
        if (open) {
          next = current.next('li').first();
          if (next.length) {
            _setCurrent(next, $dk);
          } else {
            _setCurrent(first, $dk);
          }
        } else {
          _openDropdown($dk);
        }
        e.preventDefault();
      break;

      default:
      break;
    }
  }

  // Update the <select> value, and the dropdown label
  function _updateFields(option, $dk, reset) {
    var value, label, data;

    value = option.attr('data-dk-dropdown-value');
    label = option.text();
    data  = $dk.data('dropkick');

    $select = data.$select;
    $select.val(value);

    $dk.find('.dk_label').text(label);

    reset = reset || false;

    if (data.settings.change && !reset) {
      data.settings.change.call($select, value, label);
    }
  }

  // Set the currently selected option
  function _setCurrent($current, $dk) {
    $dk.find('.dk_option_current').removeClass('dk_option_current');
    $current.addClass('dk_option_current');

    _setScrollPos($dk, $current);
  }

  function _setScrollPos($dk, anchor) {
    var height = anchor.prevAll('li').outerHeight() * anchor.prevAll('li').length;
    $dk.find('.dk_options_inner').animate({ scrollTop: height + 'px' }, 0);
  }

  // Close a dropdown
  function _closeDropdown($dk) {
    $dk.removeClass('dk_open');
  }

  // Open a dropdown
  function _openDropdown($dk) {
    var data = $dk.data('dropkick');
    $dk.find('.dk_options').css({ top : $dk.find('.dk_toggle').outerHeight() - 1 });
    $dk.toggleClass('dk_open');

  }

  /**
   * Turn the dropdownTemplate into a jQuery object and fill in the variables.
   */
  function _build (tpl, view) {
    var
      // Template for the dropdown
      template  = tpl,
      // Holder of the dropdowns options
      options   = [],
      $dk
    ;

    template = template.replace('{{ id }}', view.id);
    template = template.replace('{{ label }}', view.label);
    template = template.replace('{{ tabindex }}', view.tabindex);
    template = template.replace('{{ classname }}', view.classname);

    if (view.options && view.options.length) {
      for (var i = 0, l = view.options.length; i < l; i++) {
        var
          $option   = $(view.options[i]),
          current   = 'dk_option_current',
          oTemplate = optionTemplate
        ;

        oTemplate = oTemplate.replace('{{ value }}', $option.val());
        oTemplate = oTemplate.replace('{{ current }}', (_notBlank($option.val()) === view.value) ? current : '');
        oTemplate = oTemplate.replace('{{ text }}', $option.text());

        options[options.length] = oTemplate;
      }
    }

    $dk = $(template);
    $dk.find('.dk_options_inner').html(options.join(''));

    return $dk;
  }

  function _notBlank(text) {
    return ($.trim(text).length > 0) ? text : false;
  }

  $(function () {

    // Handle click events on the dropdown toggler
    $(document).on('click', '.dk_toggle', function (e) {
      var $dk  = $(this).parents('.dk_container').first();

      _openDropdown($dk);

      if ("ontouchstart" in window) {
        $dk.addClass('dk_touch');
        $dk.find('.dk_options_inner').addClass('scrollable vertical');
      }

      e.preventDefault();
      return false;
    });

    // Handle click events on individual dropdown options
    $(document).on('click', '.dk_options a', function (e) {
      var
        $option = $(this),
        $dk     = $option.parents('.dk_container').first(),
        data    = $dk.data('dropkick')
      ;
    
      _closeDropdown($dk);
      _updateFields($option, $dk);
      _setCurrent($option.parent(), $dk);
    
      e.preventDefault();
      return false;
    });

    // Setup keyboard nav
    $(document).bind('keydown.dk_nav', function (e) {
      var
        // Look for an open dropdown...
        $open    = $('.dk_container.dk_open'),

        // Look for a focused dropdown
        $focused = $('.dk_container.dk_focus'),

        // Will be either $open, $focused, or null
        $dk = null
      ;

      // If we have an open dropdown, key events should get sent to that one
      if ($open.length) {
        $dk = $open;
      } else if ($focused.length && !$open.length) {
        // But if we have no open dropdowns, use the focused dropdown instead
        $dk = $focused;
      }

      if ($dk) {
        _handleKeyBoardNav(e, $dk);
      }
    });
  });
})(jQuery, window, document);


// Custom checkbox and radios
function setupLabel() {
    // Checkbox
    var checkBox = ".checkbox";
    var checkBoxInput = checkBox + " input[type='checkbox']";
    var checkBoxChecked = "checked";
    var checkBoxDisabled = "disabled";

    // Radio
    var radio = ".radio";
    var radioInput = radio + " input[type='radio']";
    var radioOn = "checked";
    var radioDisabled = "disabled";

    // Checkboxes
    if ($(checkBoxInput).length) {
        $(checkBox).each(function(){
            $(this).removeClass(checkBoxChecked);
        });
        $(checkBoxInput + ":checked").each(function(){
            $(this).parent(checkBox).addClass(checkBoxChecked);
        });
        $(checkBoxInput + ":disabled").each(function(){
            $(this).parent(checkBox).addClass(checkBoxDisabled);
        });
    };

    // Radios
    if ($(radioInput).length) {
        $(radio).each(function(){
            $(this).removeClass(radioOn);
        });
        $(radioInput + ":checked").each(function(){
            $(this).parent(radio).addClass(radioOn);
        });
        $(radioInput + ":disabled").each(function(){
            $(this).parent(radio).addClass(radioDisabled);
        });
    };
};

$(document).ready(function(){
    $("html").addClass("has-js");

    // First let's prepend icons (needed for effects)
    $(".checkbox, .radio").prepend("<span class='icon'></span><span class='icon-to-fade'></span>");

    $(".checkbox, .radio").click(function(){
        setupLabel();
    });
    setupLabel();
});



/* Use this script if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'Flat-UI-Icons-16\'">' + entity + '</span>' + html;
	}
	var icons = {
			'fui-volume-16' : '&#xe000;',
			'fui-video-16' : '&#xe001;',
			'fui-time-16' : '&#xe002;',
			'fui-settings-16' : '&#xe003;',
			'fui-plus-16' : '&#xe004;',
			'fui-new-16' : '&#xe005;',
			'fui-menu-16' : '&#xe006;',
			'fui-man-16' : '&#xe007;',
			'fui-mail-16' : '&#xe008;',
			'fui-lock-16' : '&#xe009;',
			'fui-location-16' : '&#xe00a;',
			'fui-heart-16' : '&#xe00b;',
			'fui-eye-16' : '&#xe00c;',
			'fui-cross-16' : '&#xe00d;',
			'fui-cmd-16' : '&#xe00e;',
			'fui-checkround-16' : '&#xe00f;',
			'fui-checkmark-16' : '&#xe010;',
			'fui-camera-16' : '&#xe011;',
			'fui-calendar-16' : '&#xe012;',
			'fui-bubble-16' : '&#xe013;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; i < els.length; i += 1) {
		el = els[i];
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/fui-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};


/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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


// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.


function getLibrary(){
    return [
        {"type":"Animation","property":"@keyframes","description":"Specifies the animation","version":3},
        {"type":"Animation","property":"animation","description":"A shorthand property for all the animation properties below, except the animation-play-state property","version":3},
        {"type":"Animation","property":"animation-name","description":"Specifies a name for the @keyframes animation","version":3},
        {"type":"Animation","property":"animation-duration","description":"Specifies how many seconds or milliseconds an animation takes to complete one cycle","version":3},
        {"type":"Animation","property":"animation-timing-function","description":"Specifies the speed curve of the animation","version":3},
        {"type":"Animation","property":"animation-delay","description":"Specifies when the animation will start","version":3},
        {"type":"Animation","property":"animation-iteration-count","description":"Specifies the number of times an animation should be played","version":3},
        {"type":"Animation","property":"animation-direction","description":"Specifies whether or not the animation should play in reverse on alternate cycles","version":3},
        {"type":"Animation","property":"animation-play-state","description":"Specifies whether the animation is running or paused","version":3},
        {"type":"Background","property":"background","description":"Sets all the background properties in one declaration","version":1},
        {"type":"Background","property":"background-attachment","description":"Sets whether a background image is fixed or scrolls with the rest of the page","version":1},
        {"type":"Background","property":"background-color","description":"Sets the background color of an element","version":1},
        {"type":"Background","property":"background-image","description":"Sets the background image for an element","version":1},
        {"type":"Background","property":"background-position","description":"Sets the starting position of a background image","version":1},
        {"type":"Background","property":"background-repeat","description":"Sets how a background image will be repeated","version":1},
        {"type":"Background","property":"background-clip","description":"Specifies the painting area of the background","version":3},
        {"type":"Background","property":"background-origin","description":"Specifies the positioning area of the background images","version":3},
        {"type":"Background","property":"background-size","description":"Specifies the size of the background images","version":3},
        {"type":"Border/Outline","property":"border","description":"Sets all the border properties in one declaration","version":1},
        {"type":"Border/Outline","property":"border-bottom","description":"Sets all the bottom border properties in one declaration","version":1},
        {"type":"Border/Outline","property":"border-bottom-color","description":"Sets the color of the bottom border","version":1 },
        {"type":"Border/Outline","property":"border-bottom-style","description":"Sets the style of the bottom border","version":1},
        {"type":"Border/Outline","property":"border-bottom-width","description":"Sets the width of the bottom border","version":1},
        {"type":"Border/Outline","property":"border-color","description":"Sets the color of the four borders","version":1},
        {"type":"Border/Outline","property":"border-left","description":"Sets all the left border properties in one declaration","version":1},
        {"type":"Border/Outline","property":"border-left-color","description":"Sets the color of the left border","version":1},
        {"type":"Border/Outline","property":"border-left-style","description":"Sets the style of the left border","version":1},
        {"type":"Border/Outline","property":"border-left-width","description":"Sets the width of the left border","version":1},
        {"type":"Border/Outline","property":"border-right","description":"Sets all the right border properties in one declaration","version":1},
        {"type":"Border/Outline","property":"border-right-color","description":"Sets the color of the right border","version":1},
        {"type":"Border/Outline","property":"border-right-style","description":"Sets the style of the right border","version":1},
        {"type":"Border/Outline","property":"border-right-width","description":"Sets the width of the right border","version":1},
        {"type":"Border/Outline","property":"border-style","description":"Sets the style of the four borders","version":1},
        {"type":"Border/Outline","property":"border-top","description":"Sets all the top border properties in one declaration","version":1},
        {"type":"Border/Outline","property":"border-top-color","description":"Sets the color of the top border","version":1},
        {"type":"Border/Outline","property":"border-top-style","description":"Sets the style of the top border","version":1},
        {"type":"Border/Outline","property":"border-top-width","description":"Sets the width of the top border","version":1},
        {"type":"Border/Outline","property":"border-width","description":"Sets the width of the four borders","version":1},
        {"type":"Border/Outline","property":"outline","description":"Sets all the outline properties in one declaration","version":2},
        {"type":"Border/Outline","property":"outline-color","description":"Sets the color of an outline","version":2},
        {"type":"Border/Outline","property":"outline-style","description":"Sets the style of an outline","version":2},
        {"type":"Border/Outline","property":"outline-width","description":"Sets the width of an outline","version":2},
        {"type":"Border/Outline","property":"border-bottom-left-radius","description":"Defines the shape of the border of the bottom-left corner","version":3},
        {"type":"Border/Outline","property":"border-bottom-right-radius","description":"Defines the shape of the border of the bottom-right corner","version":3},
        {"type":"Border/Outline","property":"border-image","description":"A shorthand property for setting all the border-image-* properties","version":3},
        {"type":"Border/Outline","property":"border-image-outset","description":"Specifies the amount by which the border image area extends beyond the border box","version":3},
        {"type":"Border/Outline","property":"border-image-repeat","description":"Specifies whether the image-border should be repeated, rounded or stretched","version":3},
        {"type":"Border/Outline","property":"border-image-slice","description":"Specifies the inward offsets of the image-border","version":3},
        {"type":"Border/Outline","property":"border-image-source","description":"Specifies an image to be used as a border","version":3},
        {"type":"Border/Outline","property":"border-image-width","description":"Specifies the widths of the image-border","version":3},
        {"type":"Border/Outline","property":"border-radius","description":"A shorthand property for setting all the four border-*-radius properties","version":3},
        {"type":"Border/Outline","property":"border-top-left-radius","description":"Defines the shape of the border of the top-left corner","version":3},
        {"type":"Border/Outline","property":"border-top-right-radius","description":"Defines the shape of the border of the top-right corner","version":3},
        {"type":"Border/Outline","property":"box-decoration-break","description":"","version":3},
        {"type":"Border/Outline","property":"box-shadow","description":"Attaches one or more drop-shadows to the box","version":3},
        {"type":"Box","property":"overflow-x","description":"Specifies whether or not to clip the left/right edges of the content, if it overflows the element's content area","version":3},
        {"type":"Box","property":"overflow-y","description":"Specifies whether or not to clip the top/bottom edges of the content, if it overflows the element's content area","version":3},
        {"type":"Box","property":"overflow-style","description":"Specifies the preferred scrolling method for elements that overflow","version":3},
        {"type":"Box","property":"rotation","description":"Rotates an element around a given point defined by the rotation-point property","version":3},
        {"type":"Box","property":"rotation-point","description":"Defines a point as an offset from the top left border edge","version":3},
        {"type":"Color","property":"color-profile","description":"Permits the specification of a source color profile other than the default","version":3},
        {"type":"Color","property":"opacity","description":"Sets the opacity level for an element","version":3},
        {"type":"Color","property":"rendering-intent","description":"Permits the specification of a color profile rendering intent other than the default","version":3},
        {"type":"Paged Media","property":"bookmark-label","description":"Specifies the label of the bookmark","version":3},
        {"type":"Paged Media","property":"bookmark-level","description":"Specifies the level of the bookmark","version":3},
        {"type":"Paged Media","property":"bookmark-target","description":"Specifies the target of the bookmark link","version":3},
        {"type":"Paged Media","property":"float-offset","description":"Pushes floated elements in the opposite direction of the where they have been floated with float","version":3},
        {"type":"Paged Media","property":"hyphenate-after","description":"Specifies the minimum number of characters in a hyphenated word after the hyphenation character","version":3},
        {"type":"Paged Media","property":"hyphenate-before","description":"Specifies the minimum number of characters in a hyphenated word before the hyphenation character","version":3},
        {"type":"Paged Media","property":"hyphenate-character","description":"Specifies a string that is shown when a hyphenate-break occurs","version":3},
        {"type":"Paged Media","property":"hyphenate-lines","description":"Indicates the maximum number of successive hyphenated lines in an element","version":3},
        {"type":"Paged Media","property":"hyphenate-resource","description":"Specifies a comma-separated list of external resources that can help the browser determine hyphenation points","version":3},
        {"type":"Paged Media","property":"hyphens","description":"Sets how to split words to improve the layout of paragraphs","version":3},
        {"type":"Paged Media","property":"image-resolution","description":"Specifies the correct resolution of images","version":3},
        {"type":"Paged Media","property":"marks","description":"Adds crop and/or cross marks to the document","version":3},
        {"type":"Paged Media","property":"string-set","description":"","version":3},
        {"type":"Dimension","property":"height","description":"Sets the height of an element","version":1},
        {"type":"Dimension","property":"max-height","description":"Sets the maximum height of an element","version":2},
        {"type":"Dimension","property":"max-width","description":"Sets the maximum width of an element","version":2},
        {"type":"Dimension","property":"min-height","description":"Sets the minimum height of an element","version":2},
        {"type":"Dimension","property":"min-width","description":"Sets the minimum width of an element","version":2},
        {"type":"Dimension","property":"width","description":"Sets the width of an element","version":1},
        {"type":"Flexible Box","property":"box-align","description":"Specifies how to align the child elements of a box","version":3},
        {"type":"Flexible Box","property":"box-direction","description":"Specifies in which direction the children of a box are displayed","version":3},
        {"type":"Flexible Box","property":"box-flex","description":"Specifies whether the children of a box is flexible or inflexible in size","version":3},
        {"type":"Flexible Box","property":"box-flex-group","description":"Assigns flexible elements to flex groups","version":3},
        {"type":"Flexible Box","property":"box-lines","description":"Specifies whether columns will go onto a new line whenever it runs out of space in the parent box","version":3},
        {"type":"Flexible Box","property":"box-ordinal-group","description":"Specifies the display order of the child elements of a box","version":3},
        {"type":"Flexible Box","property":"box-orient","description":"Specifies whether the children of a box should be laid out horizontally or vertically","version":3},
        {"type":"Flexible Box","property":"box-pack","description":"Specifies the horizontal position in horizontal boxes and the vertical position in vertical boxes","version":3},
        {"type":"Font","property":"font","description":"Sets all the font properties in one declaration","version":1},
        {"type":"Font","property":"font-family","description":"Specifies the font family for text","version":1},
        {"type":"Font","property":"font-size","description":"Specifies the font size of text","version":1},
        {"type":"Font","property":"font-style","description":"Specifies the font style for text","version":1},
        {"type":"Font","property":"font-variant","description":"Specifies whether or not a text should be displayed in a small-caps font","version":1},
        {"type":"Font","property":"font-weight","description":"Specifies the weight of a font","version":1},
        {"type":"Font","property":"@font-face","description":"A rule that allows websites to download and use fonts other than the web-safe fonts","version":3},
        {"type":"Font","property":"font-size-adjust","description":"Preserves the readability of text when font fallback occurs","version":3},
        {"type":"Font","property":"font-stretch","description":"Selects a normal, condensed, or expanded face from a font family","version":3},
        {"type":"Generated Content","property":"content","description":"Used with the :before and :after pseudo-elements, to insert generated content","version":2},
        {"type":"Generated Content","property":"counter-increment","description":"Increments one or more counters","version":2},
        {"type":"Generated Content","property":"counter-reset","description":"Creates or resets one or more counters","version":2},
        {"type":"Generated Content","property":"quotes","description":"Sets the type of quotation marks for embedded quotations","version":2},
        {"type":"Generated Content","property":"crop","description":"Allows a replaced element to be just a rectangular area of an object, instead of the whole object","version":3},
        {"type":"Generated Content","property":"move-to","description":"Causes an element to be removed from the flow and reinserted at a later point in the document","version":3},
        {"type":"Generated Content","property":"page-policy","description":"Determines which page-based occurance of a given element is applied to a counter or string value","version":3},
        {"type":"Grid","property":"grid-columns","description":"Specifies the width of each column in a grid","version":3},
        {"type":"Grid","property":"grid-rows","description":"Specifies the height of each column in a grid","version":3},
        {"type":"Hyperlink","property":"target","description":"A shorthand property for setting the target-name, target-new, and target-position properties","version":3},
        {"type":"Hyperlink","property":"target-name","description":"Specifies where to open links (target destination)","version":3},
        {"type":"Hyperlink","property":"target-new","description":"Specifies whether new destination links should open in a new window or in a new tab of an existing window","version":3},
        {"type":"Hyperlink","property":"target-position","description":"Specifies where new destination links should be placed","version":3},
        {"type":"Linebox","property":"alignment-adjust","description":"Allows more precise alignment of elements","version":3},
        {"type":"Linebox","property":"alignment-baseline","description":"Specifies how an inline-level element is aligned with respect to its parent","version":3},
        {"type":"Linebox","property":"baseline-shift","description":"Allows repositioning of the dominant-baseline relative to the dominant-baseline","version":3},
        {"type":"Linebox","property":"dominant-baseline","description":"Specifies a scaled-baseline-table","version":3},
        {"type":"Linebox","property":"drop-initial-after-adjust","description":"Sets the alignment point of the drop initial for the primary connection point","version":3},
        {"type":"Linebox","property":"drop-initial-after-align","description":"Sets which alignment line within the initial line box is used at the primary connection point with the initial letter box","version":3},
        {"type":"Linebox","property":"drop-initial-before-adjust","description":"Sets the alignment point of the drop initial for the secondary connection point","version":3},
        {"type":"Linebox","property":"drop-initial-before-align","description":"Sets which alignment line within the initial line box is used at the secondary connection point with the initial letter box","version":3},
        {"type":"Linebox","property":"drop-initial-size","description":"Controls the partial sinking of the initial letter","version":3},
        {"type":"Linebox","property":"drop-initial-value","description":"Activates a drop-initial effect","version":3 },
        {"type":"Linebox","property":"inline-box-align","description":"Sets which line of a multi-line inline block align with the previous and next inline elements within a line","version":3},
        {"type":"Linebox","property":"line-stacking","description":"A shorthand property for setting the line-stacking-strategy, line-stacking-ruby, and line-stacking-shift properties","version":3},
        {"type":"Linebox","property":"line-stacking-ruby","description":"Sets the line stacking method for block elements containing ruby annotation elements","version":3},
        {"type":"Linebox","property":"line-stacking-shift","description":"Sets the line stacking method for block elements containing elements with base-shift","version":3},
        {"type":"Linebox","property":"line-stacking-strategy","description":"Sets the line stacking strategy for stacked line boxes within a containing block element","version":3},
        {"type":"Linebox","property":"text-height","description":"Sets the block-progression dimension of the text content area of an inline box","version":3},
        {"type":"List","property":"list-style","description":"Sets all the properties for a list in one declaration","version":1},
        {"type":"List","property":"list-style-image","description":"Specifies an image as the list-item marker","version":1},
        {"type":"List","property":"list-style-position","description":"Specifies if the list-item markers should appear inside or outside the content flow","version":1},
        {"type":"List","property":"list-style-type","description":"Specifies the type of list-item marker","version":1},
        {"type":"Margin","property":"margin","description":"Sets all the margin properties in one declaration","version":1},
        {"type":"Margin","property":"margin-bottom","description":"Sets the bottom margin of an element","version":1},
        {"type":"Margin","property":"margin-left","description":"Sets the left margin of an element","version":1},
        {"type":"Margin","property":"margin-right","description":"Sets the right margin of an element","version":1},
        {"type":"Margin","property":"margin-top","description":"Sets the top margin of an element","version":1},
        {"type":"Marquee","property":"marquee-direction","description":"Sets the direction of the moving content","version":3},
        {"type":"Marquee","property":"marquee-play-count","description":"Sets how many times the content move","version":3},
        {"type":"Marquee","property":"marquee-speed","description":"Sets how fast the content scrolls","version":3},
        {"type":"Marquee","property":"marquee-style","description":"Sets the style of the moving content","version":3},
        {"type":"Multi column","property":"column-count","description":"Specifies the number of columns an element should be divided into","version":3},
        {"type":"Multi column","property":"column-fill","description":"Specifies how to fill columns","version":3},
        {"type":"Multi column","property":"column-gap","description":"Specifies the gap between the columns","version":3},
        {"type":"Multi column","property":"column-rule","description":"A shorthand property for setting all the column-rule-* properties","version":3},
        {"type":"Multi column","property":"column-rule-color","description":"Specifies the color of the rule between columns","version":3},
        {"type":"Multi column","property":"column-rule-style","description":"Specifies the style of the rule between columns","version":3},
        {"type":"Multi column","property":"column-rule-width","description":"Specifies the width of the rule between columns","version":3},
        {"type":"Multi column","property":"column-span","description":"Specifies how many columns an element should span across","version":3},
        {"type":"Multi column","property":"column-width","description":"Specifies the width of the columns","version":3},
        {"type":"Multi column","property":"columns","description":"A shorthand property for setting column-width and column-count","version":3},
        {"type":"Padding","property":"padding","description":"Sets all the padding properties in one declaration","version":1},
        {"type":"Padding","property":"padding-bottom","description":"Sets the bottom padding of an element","version":1},
        {"type":"Padding","property":"padding-left","description":"Sets the left padding of an element","version":1},
        {"type":"Padding","property":"padding-right","description":"Sets the right padding of an element","version":1},
        {"type":"Padding","property":"padding-top","description":"Sets the top padding of an element","version":1},
        {"type":"Paged media","property":"fit","description":"Gives a hint for how to scale a replaced element if neither its width nor its height property is auto","version":3},
        {"type":"Paged media","property":"fit-position","description":"Determines the alignment of the object inside the box","version":3},
        {"type":"Paged media","property":"image-orientation","description":"Specifies a rotation in the right or clockwise direction that a user agent applies to an image","version":3},
        {"type":"Paged media","property":"page","description":"Specifies a particular type of page where an element SHOULD be displayed","version":3},
        {"type":"Paged media","property":"size","description":"Specifies the size and orientation of the containing box for page content","version":3},
        {"type":"Positioning","property":"bottom","description":"Specifies the bottom position of a positioned element","version":2},
        {"type":"Positioning","property":"clear","description":"Specifies which sides of an element where other floating elements are not allowed","version":1},
        {"type":"Positioning","property":"clip","description":"Clips an absolutely positioned element","version":2},
        {"type":"Positioning","property":"cursor","description":"Specifies the type of cursor to be displayed","version":2},
        {"type":"Positioning","property":"display","description":"Specifies how a certain HTML element should be displayed","version":1},
        {"type":"Positioning","property":"float","description":"Specifies whether or not a box should float","version":1},
        {"type":"Positioning","property":"left","description":"Specifies the left position of a positioned element","version":2},
        {"type":"Positioning","property":"overflow","description":"Specifies what happens if content overflows an element's box","version":2},
        {"type":"Positioning","property":"position","description":"Specifies the type of positioning method used for an element (static, relative, absolute or fixed)","version":2},
        {"type":"Positioning","property":"right","description":"Specifies the right position of a positioned element","version":2},
        {"type":"Positioning","property":"top","description":"Specifies the top position of a positioned element","version":2},
        {"type":"Positioning","property":"visibility","description":"Specifies whether or not an element is visible","version":2},
        {"type":"Positioning","property":"z-index","description":"Sets the stack order of a positioned element","version":2},
        {"type":"Print","property":"orphans","description":"Sets the minimum number of lines that must be left at the bottom of a page when a page break occurs inside an element","version":2},
        {"type":"Print","property":"page-break-after","description":"Sets the page-breaking behavior after an element","version":2},
        {"type":"Print","property":"page-break-before","description":"Sets the page-breaking behavior before an element","version":2},
        {"type":"Print","property":"page-break-inside","description":"Sets the page-breaking behavior inside an element","version":2},
        {"type":"Print","property":"widows","description":"Sets the minimum number of lines that must be left at the top of a page when a page break occurs inside an element","version":2},
        {"type":"Ruby","property":"ruby-align","description":"Controls the text alignment of the ruby text and ruby base contents relative to each other","version":3},
        {"type":"Ruby","property":"ruby-overhang","description":"Determines whether, and on which side, ruby text is allowed to partially overhang any adjacent text in addition to its own base, when the ruby text is wider than the ruby base","version":3},
        {"type":"Ruby","property":"ruby-position","description":"Controls the position of the ruby text with respect to its base","version":3},
        {"type":"Ruby","property":"ruby-span","description":"Controls the spanning behavior of annotation elements","version":3},
        {"type":"Speech","property":"mark","description":"A shorthand property for setting the mark-before and mark-after properties","version":3},
        {"type":"Speech","property":"mark-after","description":"Allows named markers to be attached to the audio stream","version":3},
        {"type":"Speech","property":"mark-before","description":"Allows named markers to be attached to the audio stream","version":3},
        {"type":"Speech","property":"phonemes","description":"Specifies a phonetic pronunciation for the text contained by the corresponding element","version":3},
        {"type":"Speech","property":"rest","description":"A shorthand property for setting the rest-before and rest-after properties","version":3},
        {"type":"Speech","property":"rest-after","description":"Specifies a rest or prosodic boundary to be observed after speaking an element's content","version":3},
        {"type":"Speech","property":"rest-before","description":"Specifies a rest or prosodic boundary to be observed before speaking an element's content","version":3},
        {"type":"Speech","property":"voice-balance","description":"Specifies the balance between left and right channels","version":3},
        {"type":"Speech","property":"voice-duration","description":"Specifies how long it should take to render the selected element's content","version":3},
        {"type":"Speech","property":"voice-pitch","description":"Specifies the average pitch (a frequency) of the speaking voice","version":3},
        {"type":"Speech","property":"voice-pitch-range","description":"Specifies variation in average pitch","version":3},
        {"type":"Speech","property":"voice-rate","description":"Controls the speaking rate","version":3},
        {"type":"Speech","property":"voice-stress","description":"Indicates the strength of emphasis to be applied","version":3},
        {"type":"Speech","property":"voice-volume","description":"Refers to the amplitude of the waveform output by the speech synthesises","version":3},
        {"type":"Table","property":"border-collapse","description":"Specifies whether or not table borders should be collapsed","version":2},
        {"type":"Table","property":"border-spacing","description":"Specifies the distance between the borders of adjacent cells","version":2},
        {"type":"Table","property":"caption-side","description":"Specifies the placement of a table caption","version":2},
        {"type":"Table","property":"empty-cells","description":"Specifies whether or not to display borders and background on empty cells in a table","version":2},
        {"type":"Table","property":"table-layout","description":"Sets the layout algorithm to be used for a table","version":2},
        {"type":"Text","property":"color","description":"Sets the color of text","version":1},
        {"type":"Text","property":"direction","description":"Specifies the text direction/writing direction","version":2},
        {"type":"Text","property":"letter-spacing","description":"Increases or decreases the space between characters in a text","version":1},
        {"type":"Text","property":"line-height","description":"Sets the line height","version":1},
        {"type":"Text","property":"text-align","description":"Specifies the horizontal alignment of text","version":1},
        {"type":"Text","property":"text-decoration","description":"Specifies the decoration added to text","version":1},
        {"type":"Text","property":"text-indent","description":"Specifies the indentation of the first line in a text-block","version":1},
        {"type":"Text","property":"text-transform","description":"Controls the capitalization of text","version":1},
        {"type":"Text","property":"unicode-bidi","description":"","version":2},
        {"type":"Text","property":"vertical-align","description":"Sets the vertical alignment of an element","version":1},
        {"type":"Text","property":"white-space","description":"Specifies how white-space inside an element is handled","version":1},
        {"type":"Text","property":"word-spacing","description":"Increases or decreases the space between words in a text","version":1},
        {"type":"Text","property":"hanging-punctuation","description":"Specifies whether a punctuation character may be placed outside the line box","version":3},
        {"type":"Text","property":"punctuation-trim","description":"Specifies whether a punctuation character should be trimmed","version":3},
        {"type":"Text","property":"text-align-last","description":"Describes how the last line of a block or a line right before a forced line break is aligned when text-align is justify","version":3},
        {"type":"Text","property":"text-justify","description":"Specifies the justification method used when text-align is justify","version":3},
        {"type":"Text","property":"text-outline","description":"Specifies a text outline","version":3},
        {"type":"Text","property":"text-overflow","description":"Specifies what should happen when text overflows the containing element","version":3},
        {"type":"Text","property":"text-shadow","description":"Adds shadow to text","version":3},
        {"type":"Text","property":"text-wrap","description":"Specifies line breaking rules for text","version":3},
        {"type":"Text","property":"word-break","description":"Specifies line breaking rules for non-CJK scripts","version":3},
        {"type":"Text","property":"word-wrap","description":"Allows long, unbreakable words to be broken and wrap to the next line","version":3},
        {"type":"Transform 2d/3d","property":"transform","description":"Applies a 2D or 3D transformation to an element","version":3},
        {"type":"Transform 2d/3d","property":"transform-origin","description":"Allows you to change the position on transformed elements","version":3},
        {"type":"Transform 2d/3d","property":"transform-style","description":"Specifies how nested elements are rendered in 3D space","version":3},
        {"type":"Transform 2d/3d","property":"perspective","description":"Specifies the perspective on how 3D elements are viewed","version":3},
        {"type":"Transform 2d/3d","property":"perspective-origin","description":"Specifies the bottom position of 3D elements","version":3},
        {"type":"Transform 2d/3d","property":"backface-visibility","description":"Defines whether or not an element should be visible when not facing the screen","version":3},
        {"type":"Transition","property":"transition","description":"A shorthand property for setting the four transition properties","version":3},
        {"type":"Transition","property":"transition-property","description":"Specifies the name of the CSS property the transition effect is for","version":3},
        {"type":"Transition","property":"transition-duration","description":"Specifies how many seconds or milliseconds a transition effect takes to complete","version":3},
        {"type":"Transition","property":"transition-timing-function","description":"Specifies the speed curve of the transition effect","version":3},
        {"type":"Transition","property":"transition-delay","description":"Specifies when the transition effect will start","version":3},
        {"type":"User interface","property":"appearance","description":"Allows you to make an element look like a standard user interface element","version":3},
        {"type":"User interface","property":"box-sizing","description":"Allows you to define certain elements to fit an area in a certain way","version":3},
        {"type":"User interface","property":"icon","description":"Provides the author the ability to style an element with an iconic equivalent","version":3},
        {"type":"User interface","property":"nav-down","description":"Specifies where to navigate when using the arrow-down navigation key","version":3},
        {"type":"User interface","property":"nav-index","description":"Specifies the tabbing order for an element","version":3},
        {"type":"User interface","property":"nav-left","description":"Specifies where to navigate when using the arrow-left navigation key","version":3},
        {"type":"User interface","property":"nav-right","description":"Specifies where to navigate when using the arrow-right navigation key","version":3},
        {"type":"User interface","property":"nav-up","description":"Specifies where to navigate when using the arrow-up navigation key","version":3},
        {"type":"User interface","property":"outline-offset","description":"Offsets an outline, and draws it beyond the border edge","version":3},
        {"type":"User interface","property":"resize","description":"Specifies whether or not an element is resizable by the user","version":3}];
}

/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(window, document, $) {

	var isInputSupported = 'placeholder' in document.createElement('input'),
	    isTextareaSupported = 'placeholder' in document.createElement('textarea'),
	    prototype = $.fn,
	    valHooks = $.valHooks,
	    hooks,
	    placeholder;

	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);
				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);
				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != document.activeElement) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		isInputSupported || (valHooks.input = hooks);
		isTextareaSupported || (valHooks.textarea = hooks);

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {},
		    rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this,
		    $input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
				input == document.activeElement && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement,
		    input = this,
		    $input = $(input),
		    $origInput = $input,
		    id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': true,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}

}(this, document, jQuery));

/* Use this script if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'Flat-UI-Icons-24\'">' + entity + '</span>' + html;
	}
	var icons = {
			'fui-video-24' : '&#xe000;',
			'fui-time-24' : '&#xe001;',
			'fui-settings-24' : '&#xe002;',
			'fui-plus-24' : '&#xe003;',
			'fui-new-24' : '&#xe005;',
			'fui-menu-24' : '&#xe006;',
			'fui-man-24' : '&#xe007;',
			'fui-mail-24' : '&#xe008;',
			'fui-lock-24' : '&#xe009;',
			'fui-location-24' : '&#xe00a;',
			'fui-heart-24' : '&#xe00b;',
			'fui-eye-24' : '&#xe00c;',
			'fui-cross-24' : '&#xe00d;',
			'fui-cmd-24' : '&#xe00e;',
			'fui-checkround-24' : '&#xe00f;',
			'fui-checkmark-24' : '&#xe010;',
			'fui-calendar-24' : '&#xe011;',
			'fui-bubble-24' : '&#xe012;',
			'fui-volume-24' : '&#xe013;',
			'fui-camera-24' : '&#xe004;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; i < els.length; i += 1) {
		el = els[i];
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/fui-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){var e=a[d];if(!G(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}function K(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return J("flexWrap")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!J("indexedDB",a)},s.hashchange=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.hsla=function(){return D("background-color:hsla(120,40%,100%,.5)"),G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return J("animationName")},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.cssreflections=function(){return J("boxReflect")},s.csstransforms=function(){return!!J("transform")},s.csstransforms3d=function(){var a=!!J("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return J("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var L in s)C(s,L)&&(x=L.toLowerCase(),e[x]=s[L](),v.push((e[x]?"":"no-")+x));return e.input||K(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)C(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},D(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,e.prefixed=function(a,b,c){return b?J(a,b,c):J(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

