

























(function ($) {
  
  $.fn.foundationAlerts = function (options) {
    var settings = $.extend({
      callback: $.noop
    }, options);
    
    $(document).on("click", ".alert-box a.close", function (event) {
      event.preventDefault();
      $(this).closest(".alert-box").fadeOut(function (event) {
        $(this).remove();
        // Do something else after the alert closes
        settings.callback();
      });
    });
    
  };

})(jQuery);


(function ($) {

  $.fn.foundationButtons = function(options) {
    // Prevent event propagation on disabled buttons
    $(document).on('click.fndtn', '.button.disabled', function (e) {
      e.preventDefault();
    });

    $('.button.dropdown > ul', this).addClass('no-hover');

    $(document).on('click.fndtn', '.button.dropdown, .button.dropdown.split span', function (e) {
      // Stops further propagation of the event up the DOM tree when clicked on the button.
      // Events fired by its descendants are not being blocked.
      if (e.target === this) {
        e.stopPropagation();
      }
    });
    $(document).on('click.fndtn', '.button.dropdown.split span', function (e) {
      e.preventDefault();
      $('.button.dropdown', this).not($(this).parent()).children('ul').removeClass('show-dropdown');
      $(this).siblings('ul').toggleClass('show-dropdown');
    });
    $(document).on('click.fndtn', '.button.dropdown:not(.split)', function (e) {
      $('.button.dropdown', this).not(this).children('ul').removeClass('show-dropdown');
      $(this).children('ul').toggleClass('show-dropdown');
    });
    $(document).on('click.fndtn', 'body, html', function () {
      $('.button.dropdown ul').removeClass('show-dropdown');
    });

    // Positioning the Flyout List
    var normalButtonHeight  = $('.button.dropdown:not(.large):not(.small):not(.tiny)', this).outerHeight() - 1,
        largeButtonHeight   = $('.button.large.dropdown', this).outerHeight() - 1,
        smallButtonHeight   = $('.button.small.dropdown', this).outerHeight() - 1,
        tinyButtonHeight    = $('.button.tiny.dropdown', this).outerHeight() - 1;

    $('.button.dropdown:not(.large):not(.small):not(.tiny) > ul', this).css('top', normalButtonHeight);
    $('.button.dropdown.large > ul', this).css('top', largeButtonHeight);
    $('.button.dropdown.small > ul', this).css('top', smallButtonHeight);
    $('.button.dropdown.tiny > ul', this).css('top', tinyButtonHeight);

    $('.button.dropdown.up:not(.large):not(.small):not(.tiny) > ul', this).css('top', 'auto').css('bottom', normalButtonHeight - 2);
    $('.button.dropdown.up.large > ul', this).css('top', 'auto').css('bottom', largeButtonHeight - 2);
    $('.button.dropdown.up.small > ul', this).css('top', 'auto').css('bottom', smallButtonHeight - 2);
    $('.button.dropdown.up.tiny > ul', this).css('top', 'auto').css('bottom', tinyButtonHeight - 2);

  };

})( jQuery );




(function ($) {
  
  $.fn.foundationMediaQueryViewer = function (options) {
    
    var settings  = $.extend(options,{toggleKey:77}); // // Press 'M'
    $(document).on("keyup.mediaQueryViewer", ":input", function(e){
      if (e.which === settings.toggleKey) {
        e.stopPropagation();
      }
    });
    $(document).on("keyup.mediaQueryViewer", function(e) {
      var $mqViewer = $('#fqv');

      if (e.which === settings.toggleKey) { 
        if ($mqViewer.length > 0) {
          $mqViewer.remove();
        } else {
          $('body').prepend('<div id="fqv" style="position:fixed;top:4px;left:4px;z-index:999;color:#fff;"><p style="font-size:12px;background:rgba(0,0,0,0.75);padding:5px;margin-bottom:1px;line-height:1.2;"><span class="left">Media:</span> <span style="font-weight:bold;" class="show-for-xlarge">Extra Large</span><span style="font-weight:bold;" class="show-for-large">Large</span><span style="font-weight:bold;" class="show-for-medium">Medium</span><span style="font-weight:bold;" class="show-for-small">Small</span><span style="font-weight:bold;" class="show-for-landscape">Landscape</span><span style="font-weight:bold;" class="show-for-portrait">Portrait</span><span style="font-weight:bold;" class="show-for-touch">Touch</span></p></div>');
        }
      }
    });

  };

})(jQuery);

(function ($){

  $.fn.foundationAccordion = function (options) {

    $(document).on('click.fndtn', '.accordion li', function () {
      var flyout = $(this).children('.content').first();
      $('.accordion .content').not(flyout).hide().parent('li').removeClass('active');
      flyout.show(0, function () {
        flyout.parent('li').addClass('active');
      });
    });

  };

})( jQuery );


(function ($) {

  $.fn.foundationTabs = function (options) {

    var settings = $.extend({
      callback: $.noop
    }, options);

    var activateTab = function ($tab) {
      var $activeTab = $tab.closest('dl').find('dd.active'),
          contentLocation = $tab.children('a').attr("href") + 'Tab';

      // Strip off the current url that IE adds
      contentLocation = contentLocation.replace(/^.+#/, '#');

      //Make Tab Active
      $activeTab.removeClass('active');
      $tab.addClass('active');

      //Show Tab Content
      $(contentLocation).closest('.tabs-content').children('li').removeClass('active').hide();
      $(contentLocation).css('display', 'block').addClass('active');
    };

    $(document).on('click.fndtn', 'dl.tabs dd a', function (event){
      activateTab($(this).parent('dd'));
    });

    if (window.location.hash) {
      activateTab($('a[href="' + window.location.hash + '"]').parent('dd'));
      settings.callback();
    }

  };

})(jQuery);




(function($){  
  $(function(){
    $(document).foundationMediaQueryViewer();
    
    $(document).foundationAlerts();
    $(document).foundationAccordion();
    $(document).tooltips();
    $('input, textarea').placeholder();
    
    
    
    $(document).foundationButtons();
    
    
    
    $(document).foundationNavigation();
    
    
    
    $(document).foundationCustomForms();
    
    
    
      
      $(document).foundationTabs({callback:$.foundation.customForms.appendCustomMarkup});
      
    
    
    
    $("#featured").orbit();
    
    
    // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
    // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'left'});
    // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'left'});
    // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'left'});
    // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'left'});
  });
  
})(jQuery);


