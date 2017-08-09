




    var default_zoomLevel = window.outerWidth / window.innerWidth;
    var deviceReadyDeferred = $.Deferred();
    var jqmReadyDeferred = $.Deferred();
    var domReady = $.Deferred();
    var favourites_array = [];

    $(window).load(function() {
        $(document).bind('deviceready', function () {
            $('.favourite_button').click(function(){
                $('#favourites_page').find('li a[href="#' + $(this).closest('.ui-page').attr('id') +'"]').closest('li').removeClass('ui-screen-hidden');
                add_favourite($(this).closest('.ui-page').attr('id'));
                navigator.notification.alert('Added this product to Favourites', function(){}, 'Favourites')
            });

            $('.hide_favourite_button').click(function(){
                $(this).closest('li').addClass('ui-screen-hidden');
                remove_favourite($(this).attr('id').replace('fav_delete_',''));
                navigator.notification.alert('Removed this product from Favourites', function(){}, 'Favourites')
            });

            function add_favourite(favourite_string){
                favourites_array.push(favourite_string);
                localStorage['favourites'] = JSON.stringify(favourites_array);
            }
            function remove_favourite(favourite_string){
                favourites_array = jQuery.grep(favourites_array, function(n, i){
                    return n != favourite_string
                });
                localStorage['favourites'] = JSON.stringify(favourites_array);
            }
            function loadURL(url){
                navigator.app.loadUrl(url, { openExternal:true });
                return false;
            }
            $('.external_website').click(function(e){
                e.preventDefault();
                loadURL($(this).attr('href'));
            });
            deviceReadyDeferred.resolve();
        });
    });

    $(document).one("mobileinit", function () {
        $.mobile.defaultPageTransition = 'none';
        $.mobile.page.prototype.options.backBtnText = "Back";
        $.mobile.metaViewportContent = 'width=device-width, initial-scale=1.0,user-scalable=no,maximum-scale=1';//,target-densitydpi=device-dpi';
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        // Navigation
        $.mobile.page.prototype.options.addBackBtn      = true;
        $.mobile.page.prototype.options.backBtnTheme    = "b";

        // Page
        $.mobile.page.prototype.options.headerTheme = "b";  // Page header only
        $.mobile.page.prototype.options.contentTheme    = "c";
        $.mobile.page.prototype.options.footerTheme = "b";
        jqmReadyDeferred.resolve();
    });

    $(document).ready(function(){
        domReady.resolve();
        function has3d() {
            var el = document.createElement('p'),
                    has3d,
                    transforms = {
                        'webkitTransform':'-webkit-transform',
                        'OTransform':'-o-transform',
                        'msTransform':'-ms-transform',
                        'MozTransform':'-moz-transform',
                        'transform':'transform'
                    };

            // Add it to the body to get the computed style.
            document.body.insertBefore(el, null);

            for (var t in transforms) {
                if (el.style[t] !== undefined) {
                    el.style[t] = "translate(1px,1px)";
                    has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                }
            }

            document.body.removeChild(el);

            return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
        }
        function hasScale() {
            var el = document.createElement('p'),
                    has3d,
                    transforms = {
                        'webkitTransform':'-webkit-transform',
                        'OTransform':'-o-transform',
                        'msTransform':'-ms-transform',
                        'MozTransform':'-moz-transform',
                        'transform':'transform'
                    };

            // Add it to the body to get the computed style.
            document.body.insertBefore(el, null);

            for (var t in transforms) {
                if (el.style[t] !== undefined) {
                    el.style[t] = "scale(2,2)";
                    has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                }
            }

            document.body.removeChild(el);

            return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
        }
    });

    $.when(deviceReadyDeferred, jqmReadyDeferred, domReady).then(doWhenBothFrameworksLoaded);

    function doWhenBothFrameworksLoaded() {

        if(localStorage['favourites']){
            favourites_array = JSON.parse(localStorage['favourites']);
            for(var i = 0; i < favourites_array.length;i++){
                $('#favourites_page').find('li a[href="#' + favourites_array[i] +'"]').closest('li').removeClass('ui-screen-hidden');
            }

        }

        $('.image_page').on('pageshow',function(){
            check_for_header($(this), 0);
        });
        $('.image_page').one('pageshow',function(){
            check_for_header_init($(this), 0);
        });

        function initialize_image_size_position(){
           if($.mobile.activePage.is('.image_page')){
                var the_image = $('.image_page').find('.centered_image'),
                    content_div = $('.image_page').find('.ui-content'),
                    header_height = $.mobile.activePage.find('.ui-header').outerHeight(true) || 0,
                    footer_height = $.mobile.activePage.find('.ui-footer').outerHeight(true) || 0,
                    page_real_height = window.innerHeight - (header_height + footer_height);
                reset_tranforms(the_image);
                var content_aspect_ratio = window.innerWidth / page_real_height;
                content_div.css({
                    'width':  '100%',
                    'height': page_real_height + 'px'
                });
                content_div.css({
                    'padding-left': '0',
                    'padding-right': '0'
                });
                if(content_aspect_ratio > 1){

                }else{
                    if((page_real_height) < window.innerWidth * 1295 / 945){
                        var padding_sides= Math.round((window.innerWidth - (page_real_height) * 945/1295)/2);
                        content_div.css({
                            'padding-left': padding_sides + 'px',
                            'padding-right': padding_sides + 'px',
                            'padding-top': '0'
                        });
                    }
                }
            //check if the resolution is such that the 100% width would force the height to overlay the footer and header
            }
        }

        function adjust_image_size_position(){
            if($.mobile.activePage.is('.image_page')){
                var the_image = $.mobile.activePage.find('.centered_image'),
                    content_div = $.mobile.activePage.find('.ui-content'),
                    header_height = $.mobile.activePage.find('.ui-header').outerHeight(true) || 0,
                    footer_height = $.mobile.activePage.find('.ui-footer').outerHeight(true) || 0,
                    page_real_height = window.innerHeight - (header_height + footer_height);
                reset_tranforms(the_image);
                var content_aspect_ratio = window.innerWidth / page_real_height;
                content_div.css({
                    'width':  '100%',
                    'height': page_real_height + 'px'
                });
                content_div.css({
                    'padding-left': '0',
                    'padding-right': '0',
                    'padding-top': ((page_real_height - the_image.height()) / 2) + 'px'
                });
                if(content_aspect_ratio > 1){

                }else{
                    if((page_real_height) < window.innerWidth * 1295 / 945){
                        var padding_sides= Math.round((window.innerWidth - (page_real_height) * 945/1295)/2);
                        content_div.css({
                            'padding-left': padding_sides + 'px',
                            'padding-right': padding_sides + 'px',
                            'padding-top': '0'
                        });
                    }
                }
            //check if the resolution is such that the 100% width would force the height to overlay the footer and header
            }
        }
        function check_for_header(ele, inc){
            if(ele.find('.ui-header').outerHeight(true) && inc < 20){
                adjust_image_size_position();
            }else{
                if(inc < 20){
                    setTimeout(function(){check_for_header(ele, inc + 1)},10);
                }
            }
        }

        function check_for_header_init(ele, inc){
            if(ele.find('.ui-header').outerHeight(true) && inc < 20){
                initialize_image_size_position();
            }else{
                if(inc < 20){
                    setTimeout(function(){check_for_header_init(ele, inc + 1)},10);
                }
            }
        }

        function loading(showOrHide) {
            setTimeout(function(){
                $.mobile.loading(showOrHide, {
                    text: 'Loading',
                    textVisible: true,
                    theme: 'a'
                });
            }, 1);
        }

        $(document).on('pageshow', '#search_page' , function(){
            var $listview = $('#search_list');
            if ($listview.children(':visible').not('#no-results').length === 0) {
                $('#no-results').fadeIn(500);
            } else {
                $('#no-results').fadeOut(250);
            }
        });

        $(document).on('pageinit', '#search_page', function() {
            var $listview = $('#search_list');
            $(this).on('keyup', 'input[data-type="search"]', function() {
                if ($listview.children(':visible').not('#no-results').length === 0) {
                    $('#no-results').fadeIn(500);
                } else {
                    $('#no-results').fadeOut(250);
                }
            });
            $(this).on('click', '.ui-input-clear', function() {
                $('#no-results').fadeOut(100);
            });
        });

        $("div[data-role='page']").on('pagebeforehide', function(){
            loading('show');
        });

        $("div[data-role='page']").on('pageshow', function(){
            loading('hide');
        });

        $( ".image_fixed_header" ).fixedtoolbar({
            create: function(event, ui) {
            },
            disablePageZoom: false
        });

        function reset_tranforms($the_image){
            var transform = "translate(0, 0) " +
                    "scale(1, 1)";
            zoomed = false;
            posX=0;
            posY=0;
            scale=1;
            last_scale = 1;
            saved_posX = 0;
            saved_posY = 0;
            $the_image[0].style.transform = transform;
            $the_image[0].style.oTransform = transform;
            $the_image[0].style.msTransform = transform;
            $the_image[0].style.mozTransform = transform;
            $the_image[0].style.webkitTransform = transform;
        }

        $('.image_page').hammer().on('swipeleft', function(ev) {
            if(scale == 1){
                var next_page = $(this).next('.image_page:not(.not_catalog_image)');
                if(next_page.length){
                    $.mobile.changePage(next_page,{ transition:'slide'});
                }
            }
        });

        $('.image_page').hammer().on('swiperight', function(ev) {
            if(scale == 1){
                var previous_page = $(this).prev('.image_page:not(.not_catalog_image)');
                if(previous_page.length){
                    $.mobile.changePage(previous_page, {reverse:true, transition:'slide'});
                }
            }
        });


        $('.image_page').hammer().on("doubletap", function(event) {
            var $the_image = $(this).find('.centered_image');
            zoomed = !zoomed;
            scale = 1;
            last_scale = 1;
            var transform =
                    "translate(0, 0) " +
                            "scale(1, 1)";
            if(zoomed){
                scale = 2;
                last_scale = 2;
                transform =
                        "translate("+posX+"px,"+posY+"px) " +
                                "scale(2, 2)";
                $the_image.addClass('relative_for_zoom');
            }else{
                $the_image.removeClass('relative_for_zoom');
                reset_tranforms($the_image);
            }
            $the_image[0].style.transform = transform;
            $the_image[0].style.oTransform = transform;
            $the_image[0].style.msTransform = transform;
            $the_image[0].style.mozTransform = transform;
            $the_image[0].style.webkitTransform = transform;
        });

        var posX=0, posY=0, saved_posX = 0, saved_posY = 0,
                scale=1, last_scale, zoomed=false;

        $('.image_page').hammer().on('touch drag transform dragend', function(ev) {
            var $the_image = $(this).find('.centered_image');
            switch(ev.type) {
                case 'touch':
                    last_scale = scale;
                    break;

                case 'drag':
                        if(scale == 1){
                            //allow for some vertical scrolling in landscape
                            if(window.innerWidth > window.innerHeight){
                                if((saved_posY + ev.gesture.deltaY) < ($the_image.height() - $(this).height()) && (saved_posY + ev.gesture.deltaY) > 0){
                                    posY = saved_posY + ev.gesture.deltaY;
                                }
                            }else{
                                posX = 0;
                                posY = 0;
                                saved_posX = 0;
                                saved_posY = 0;
                            }
                        }else{
                            posX = saved_posX + ev.gesture.deltaX;
                            posY = saved_posY + ev.gesture.deltaY;
                        }
                    break;

                case 'transform':
                    scale = Math.max(1, Math.min(last_scale * ev.gesture.scale, 10));
                    break;

                case 'dragend':
                    saved_posX = posX;
                    saved_posY = posY;
                    break;
            }
            var transform = "translate(0, 0) " +
            "scale(1, 1)";
            if(scale != 1){
                // transform!
                transform =
                        "translate("+posX+"px,"+posY+"px) " +
                                "scale("+scale+","+scale+")";
            }

            $the_image[0].style.transform = transform;
            $the_image[0].style.oTransform = transform;
            $the_image[0].style.msTransform = transform;
            $the_image[0].style.mozTransform = transform;
            $the_image[0].style.webkitTransform = transform;
        });

        $(window).bind( 'orientationchange', function(e){
            if(e.orientation == 'landscape'){
                adjust_image_size_position();
            }
        });
        $(window).bind( 'resize', function(e){
            if($.mobile.activePage.is('.image_page')){
                adjust_image_size_position();
            }
        });

        $('#unit_type_select').change(function(){
            var select_value = $(this).val();
            var utf = $('#unit_type_from');
            var utt = $('#unit_type_to');
            switch (select_value){
                case 'pressure':
                        utf.html('<option value="kgcmm">kg/cm&#178;</option><option value="bar">bar</option><option value="kPa">kPa</option><option value="psi">psi</option>');
                        utt.html('<option value="kgcmm">kg/cm&#178;</option><option value="bar">bar</option><option value="kPa">kPa</option><option value="psi">psi</option>');
                        break;
                    case 'water_head':
                        utf.html('<option value="m">m</option><option value="psi">psi</option>');
                        utt.html('<option value="m">m</option><option value="psi">psi</option>');
                        break;
                    case 'flow':
                        utf.html('<option value="ls">l/s</option><option value="mmmh">m&#179;/h</option><option value="gpm">gpm</option>');
                        utt.html('<option value="ls">l/s</option><option value="mmmh">m&#179;/h</option><option value="gpm">gpm</option>');
                        break;
                    case 'length':
                        utf.html('<option value="mm">mm</option><option value="m">m</option><option value="in">in</option><option value="ft">ft</option>');
                        utt.html('<option value="mm">mm</option><option value="m">m</option><option value="in">in</option><option value="ft">ft</option>');
                        break;
                    case 'volume':
                        utf.html('<option value="l">l</option><option value="mmm">m&#179;</option><option value="gal">gal</option><option value="fttt">ft&#179;</option>');
                        utt.html('<option value="l">l</option><option value="mmm">m&#179;</option><option value="gal">gal</option><option value="fttt">ft&#179;</option>');
                        break;
                    case 'weight':
                        utf.html('<option value="kg">kg</option><option value="lb">lb</option>');
                        utt.html('<option value="kg">kg</option><option value="lb">lb</option>');
                        break;
            }
            utf.selectmenu("refresh");
            utt.selectmenu("refresh");
            $('#converted_number_span').val("");
        });

        $('#convert_button').click(function(){
            var num_to_display = parseFloat(Math.round(do_unit_conversion($('#unit_type_from').val(), $('#unit_type_to').val(),$('#number_of_units_to_convert').val()) * 100) / 100).toFixed(2)
            $('#converted_number_span').val(num_to_display);
        });
        $('#unit_type_to').change(function(){
            $('#converted_number_span').val("");
        });
        $('#unit_type_from').change(function(){
            $('#converted_number_span').val("");
        });

    }

    function empty_click_function(){}

    function do_unit_conversion(from,to,val){
        switch(from){
            case 'kgcmm':
                if(to == "kgcmm"){return val;}
                if(to == "bar"){return val * 14.22 * 0.069;}
                if(to == "kPa"){return val * 14.22 * 6.896;}
                if(to == "psi"){return val * 14.22;}
                break;
            case 'bar':
                if(to == "kgcmm"){return val * 14.50 * 0.070;}
                if(to == "bar"){return val;}
                if(to == "kPa"){return val * 14.50 * 6.896;}
                if(to == "psi"){return val * 14.50;}
                break;
            case 'kPa':
                if(to == "kgcmm"){return val * 0.145 * 0.070;}
                if(to == "bar"){return val * 0.145 * 0.069;}
                if(to == "kPa"){return val;}
                if(to == "psi"){return val * 0.145;}
                break;
            case 'psi':
                if(to == "kgcmm"){return val * 0.070;}
                if(to == "bar"){return val * 0.069;}
                if(to == "kPa"){return val * 6.896;}
                if(to == "psi"){return val;}
                if(to == "m"){return val * 0.703;}
                break;
            case 'm':
                if(to == "m"){return val;}
                if(to == "psi"){return val * 1.422;}
                if(to == "mm"){return val * 1000;}
                if(to == "in"){return val * 39.3700787;}
                if(to == "ft"){return val * 3.2808;}
                break;
            case 'mm':
                if(to == "m"){return val / 1000;}
                if(to == "mm"){return val;}
                if(to == "in"){return val * 39.3700787 / 1000;}
                if(to == "ft"){return val * 3.2808 / 1000;}
                break;
            case 'in':
                if(to == "m"){return val / 39.3700787;}
                if(to == "mm"){return val * 1000 / 39.3700787;}
                if(to == "in"){return val;}
                if(to == "ft"){return val * 3.2808 / 39.3700787;}
                break;
            case 'ft':
                if(to == "m"){return val / 3.2808;}
                if(to == "mm"){return val * 1000 / 3.2808;}
                if(to == "in"){return val * 39.3700787 / 3.2808;}
                if(to == "ft"){return val;}
                break;
            case 'l':
                if(to == "l"){return val;}
                if(to == "mmm"){return val * 0.00378 * 0.264;}
                if(to == "gal"){return val * 0.264;}
                if(to == "fttt"){return val * 0.00378 * 0.264 * 35.315;}
                break;
            case 'mmm':
                if(to == "l"){return val /(0.00378 * 0.264);}
                if(to == "mmm"){return val;}
                if(to == "gal"){return val * 0.264 / (0.00378 * 0.264);}
                if(to == "fttt"){return val * 0.00378 * 0.264 * 35.315 / (0.00378 * 0.264);}
                break;
            case 'gal':
                if(to == "l"){return val  / 0.264;}
                if(to == "mmm"){return val * 0.00378 * 0.264 / 0.264;}
                if(to == "gal"){return val * 0.264 / 0.264;}
                if(to == "fttt"){return val * 0.00378 * 0.264 * 35.315 / 0.264;}
                break;
            case 'fttt':
                if(to == "l"){return val / (0.00378 * 0.264 * 35.315);}
                if(to == "mmm"){return val * 0.00378 * 0.264 / (0.00378 * 0.264 * 35.315);}
                if(to == "gal"){return val * 0.264 / (0.00378 * 0.264 * 35.315);}
                if(to == "fttt"){return val * 0.00378 * 0.264 * 35.315 / (0.00378 * 0.264 * 35.315);}
                break;
            case 'kg':
                if(to == "kg"){return val;}
                if(to == "lb"){return val * 2.205;}
                break;
            case 'lb':
                if(to == "kg"){return val / 2.205;}
                if(to == "lb"){return val;}
                break;

            case 'ls':
                if(to == "ls"){return val;}
                if(to == "mmmh"){return val * 15.873 * 0.227;}
                if(to == "gpm"){return val * 15.873;}
                break;
            case 'mmmh':
                if(to == "ls"){return val;}
                if(to == "mmmh"){return val * 4.405 * 0.063;}
                if(to == "gpm"){return val * 4.405;}
                break;
            case 'gpm':
                if(to == "ls"){return val * 0.063;}
                if(to == "mmmh"){return val * 0.227;}
                if(to == "gpm"){return val;}
                break;
        }
    }


    



(function($, undefined) {
    'use strict';

    // no jQuery or Zepto!
    if($ === undefined) {
        return;
    }

    /**
     * bind dom events
     * this overwrites addEventListener
     * @param {HTMLElement} element
     * @param {String} eventTypes
     * @param {Function} handler
     */
    Hammer.event.bindDom = function(element, eventTypes, handler) {
        $(element).on(eventTypes, function(ev) {
            var data = ev.originalEvent || ev;

            // IE pageX fix
            if(data.pageX === undefined) {
                data.pageX = ev.pageX;
                data.pageY = ev.pageY;
            }

            // IE target fix
            if(!data.target) {
                data.target = ev.target;
            }

            // IE button fix
            if(data.which === undefined) {
                data.which = data.button;
            }

            // IE preventDefault
            if(!data.preventDefault) {
                data.preventDefault = ev.preventDefault;
            }

            // IE stopPropagation
            if(!data.stopPropagation) {
                data.stopPropagation = ev.stopPropagation;
            }

            handler.call(this, data);
        });
    };

    /**
     * the methods are called by the instance, but with the jquery plugin
     * we use the jquery event methods instead.
     * @this {Hammer.Instance}
     * @return {jQuery}
     */
    Hammer.Instance.prototype.on = function(types, handler) {
        return $(this.element).on(types, handler);
    };
    Hammer.Instance.prototype.off = function(types, handler) {
        return $(this.element).off(types, handler);
    };


    /**
     * trigger events
     * this is called by the gestures to trigger an event like 'tap'
     * @this {Hammer.Instance}
     * @param {String} gesture
     * @param {Object} eventData
     * @return {jQuery}
     */
    Hammer.Instance.prototype.trigger = function(gesture, eventData){
        var el = $(this.element);
        if(el.has(eventData.target).length) {
            el = $(eventData.target);
        }

        return el.trigger({
            type: gesture,
            gesture: eventData
        });
    };


    /**
     * jQuery plugin
     * create instance of Hammer and watch for gestures,
     * and when called again you can change the options
     * @param {Object} [options={}]
     * @return {jQuery}
     */
    $.fn.hammer = function(options) {
        return this.each(function() {
            var el = $(this);
            var inst = el.data('hammer');
            // start new hammer instance
            if(!inst) {
                el.data('hammer', new Hammer(this, options || {}));
            }
            // change the options
            else if(inst && options) {
                Hammer.utils.extend(inst.options, options);
            }
        });
    };

})(window.jQuery || window.Zepto);
