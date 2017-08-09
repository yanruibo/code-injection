








		if (config.debug_content == true) {
		    window.localStorage.clear();
		}
		//window.localStorage.removeItem("tip");
	



    
        window.slideeffect = 'none';
    
	    var ua = navigator.userAgent;
	    window.checker = {
	        iphone: ua.match(/(iPhone|iPod)/),
	        ipad: ua.match(/(iPad)/),
	        blackberry: ua.match(/BlackBerry/),
	        mobile: ua.match(/Mobile/),
	        android: ua.match(/Android/)
	    };
    
        $(document).bind("touchstart", function(event){})
        $(document).bind("mobileinit", function(){
            $.mobile.autoInitializePage = false;
            $.mobile.transitionFallbacks.slide = "none";
            $.mobile.transitionFallbacks.slideout = "none";
            $.mobile.buttonMarkup.hoverDelay = 0;
            $.mobile.touchOverflowEnabled = true;
            
            $.mobile.pageContainer = $('#container');
            
            if (window.checker.iphone) {
                $.mobile.defaultPageTransition = 'none';
            } else {
                $.mobile.defaultPageTransition = window.slideeffect;
            }
            
            $.mobile.defaultDialogTransition = 'none';

            //$.mobile.page.prototype.options.addBackBtn = true;
            $.mobile.useFastClick  = false;
            
            //$.mobile.phonegapNavigationEnabled = true
            
        });
        
        if ((window.checker.android) || (window.checker.iphone) || (window.checker.ipad)) {
            document.addEventListener("deviceready", function(){
                document.addEventListener("backbutton", onBackKeyDown, false);
                init(); 
            }, false);
        } else{
            jQuery(document).ready(function($) { 
                init();
            });
        }
    

function init() {
    
    $('#loading_logo').css('width', (window.innerWidth) + 'px');
    
    var temp = Math.round(window.innerHeight * 0.5);
    $('#loading_logo').css('height', temp + 'px');
    $('#loading_logo').css('top', Math.round(window.innerHeight * 0.05) + 'px');
    if (temp <= 210) {
        var size = 'half';
    } else {
        var size = 'full';
    }
    $('#loading_logo').css('background', 'url(img/status/zero_' + size + '.png) center top no-repeat');
    $('#loading_logo').css('background-size', 'auto 100%');
    
    var temp_2 = Math.round(temp / 3.7838)
    $('#loading_logo_bar').css('top', Math.round(temp - temp_2) + 'px');
    $('#loading_logo_bar').css('height', temp_2 + 'px');
    $('#loading_logo_bar .inner').css('background', 'url(img/status/name_' + size + '.png) left top no-repeat');
    $('#loading_logo_bar .inner').css('background-size', '100% auto');
    if ((480*temp_2/111) < window.innerWidth)  {
        $('#loading_logo_bar .inner').css('background-size', 'auto 100%');
    }
    $('#loading_wkologo').css('height', Math.round(window.innerHeight * 0.15) + 'px');
    $('#loading_wkologo').css('top', Math.round(window.innerHeight * 0.825) + 'px');
    $('#loading_wkologo').css('background', 'url(img/loader_logo_full.png) center top no-repeat');
    $('#loading_wkologo').css('background-size', 'auto 100%');
    $('#loading_info').css('top', Math.round(window.innerHeight * 0.675) + 'px');
    
    $('#loading_info_bar').css('height', Math.round(window.innerHeight * 0.04) + 'px');
    $('#loading_info_bar').css('width', Math.round(window.innerWidth * 0.7) + 'px');
    $('#loading_info_bar').css('margin-left', Math.round((window.innerWidth-(window.innerWidth * 0.7))/2) + 'px');
    
    $('#loading_info_bar .inner').css('height', Math.round(window.innerHeight * 0.04) + 'px');
    setLoading(30);
    
    $('#black_screen').css('display', 'none');
    $('#black_screen').css('z-index', '1');
    
    window.language = 'de';
    window.tablet = false;
    
    if (window.checker.ipad) {
        window.tablet = true;
    } else {
        if ((window.checker.android) || (window.checker.iphone)) {
            if (window.checker.android) {
                if (window.checker.mobile) { } else {
                    window.tablet = true;
                }
            }
        } else {
            if ((window.innerWidth > 1000) || (window.innerHeight > 1000)) {
                window.tablet = true;
            } 
        }
    }
    
    window.showani = 1;
    if (window.checker.android) {
        var android_version = parseFloat(device.version);
        if (android_version < 4) {
            window.showani = 0;
        }
        $('head').append('<style type="text/css">.ui-body-a,.ui-bar-a,.ui-btn-up-a,.ui-btn-hover-a,.ui-btn-down-a,.ui-body-b,.ui-bar-b,.ui-btn-up-b,.ui-btn-hover-b,.ui-btn-down-b,.ui-body-c,.ui-bar-c,.ui-btn-up-c,.ui-btn-hover-c,.ui-btn-down-c,.ui-body-d,.ui-bar-d,.ui-btn-up-d,.ui-btn-hover-d,.ui-btn-down-d,.ui-body-e,.ui-bar-e,.ui-btn-up-e,.ui-btn-hover-e,.ui-btn-down-e,.ui-shadow-inset,.ui-icon-shadow,.ui-focus,.ui-overlay-shadow,.ui-shadow,.ui-btn-active,* {text-shadow: none !important;box-shadow: none !important;-moz-box-shadow: none !important;-webkit-box-shadow: none !important;}</style>');
    } 
    if (window.checker.iphone) {
        window.showani = 0;
        $('head').append('<style type="text/css">.ui-body-a,.ui-bar-a,.ui-btn-up-a,.ui-btn-hover-a,.ui-btn-down-a,.ui-body-b,.ui-bar-b,.ui-btn-up-b,.ui-btn-hover-b,.ui-btn-down-b,.ui-body-c,.ui-bar-c,.ui-btn-up-c,.ui-btn-hover-c,.ui-btn-down-c,.ui-body-d,.ui-bar-d,.ui-btn-up-d,.ui-btn-hover-d,.ui-btn-down-d,.ui-body-e,.ui-bar-e,.ui-btn-up-e,.ui-btn-hover-e,.ui-btn-down-e,.ui-shadow-inset,.ui-icon-shadow,.ui-focus,.ui-overlay-shadow,.ui-shadow,.ui-btn-active,* {text-shadow: none !important;box-shadow: none !important;-moz-box-shadow: none !important;-webkit-box-shadow: none !important;}</style>');
    }
    
    
    
    
    window.currentDetails = 0;
    window.statuss = {
        "main"  : 0,
        "phase" : [0,0,0]
    }

    
    $('#status').live('pageshow', function(event, ui) {
        $('#loading_screen').css('display', 'none');
        $('#loading_screen').css('z-index', '1');
        //$('#black_screen').css('display', 'none');
        //$('#black_screen').css('z-index', '1');
    }); 
    
    /*
    $('#test').live('pageshow', function(event, ui) {
        $('#loading_screen').css('display', 'none');
        $('#loading_screen').css('z-index', '1');
    });
    */
    
    //contentlaoding
    
    window.loadsteps = 3;
    window.loadstepsDone = 0;
    
    //contentabgleich local
    //contacts
    //items
    //texts
    //zahlen
    
    //contacts
    var data = window.localStorage.getItem('contacts_date');
    if (data) {
        if ((data < config.local_content_date) || (config.debug_content == true)) {
            $.getJSON('content/' + window.language + '/contacts.json', function(data) {
                window.contacts = data;
                localStorage.setItem('contacts', JSON.stringify(data));
                window.localStorage.setItem('contacts_date', config.local_content_date);
                window.loadstepsDone = window.loadstepsDone + 1;
            });
        } else {
            window.contacts = JSON.parse(localStorage.getItem('contacts'));
            window.loadstepsDone = window.loadstepsDone + 1;
        }
    } else {
        $.getJSON('content/' + window.language + '/contacts.json', function(data) {
            window.contacts = data;
            localStorage.setItem('contacts', JSON.stringify(data));
            window.localStorage.setItem('contacts_date', config.local_content_date);
            window.loadstepsDone = window.loadstepsDone + 1;
        });
    }
    //items
    var data = window.localStorage.getItem('items_date');
    if (data) {
        if ((data < config.local_content_date) || (config.debug_content == true)) {
            $.getJSON('content/' + window.language + '/items.json', function(data) {
                window.items = data;
                localStorage.setItem('items', JSON.stringify(data));
                window.localStorage.setItem('items_date', config.local_content_date);
                window.loadstepsDone = window.loadstepsDone + 1;
            });
        } else {
            window.items = JSON.parse(localStorage.getItem('items'));
            window.loadstepsDone = window.loadstepsDone + 1;
        }
    } else {
        $.getJSON('content/' + window.language + '/items.json', function(data) {
            window.items = data;
            localStorage.setItem('items', JSON.stringify(data));
            window.localStorage.setItem('items_date', config.local_content_date);
            window.loadstepsDone = window.loadstepsDone + 1;
        });
    }
    //texts
    var data = window.localStorage.getItem('texts_date');
    if (data) {
        if ((data < config.local_content_date) || (config.debug_content == true)) {
            $.getJSON('content/' + window.language + '/texts.json', function(data) {
                window.texts = data;
                localStorage.setItem('texts', JSON.stringify(data));
                window.localStorage.setItem('texts_date', config.local_content_date);
                window.loadstepsDone = window.loadstepsDone + 1;
            });
        } else {
            window.texts = JSON.parse(localStorage.getItem('texts'));
            window.loadstepsDone = window.loadstepsDone + 1;
        }
    } else { 
        $.getJSON('content/' + window.language + '/texts.json', function(data) {
            window.texts = data;
            localStorage.setItem('texts', JSON.stringify(data));
            window.localStorage.setItem('texts_date', config.local_content_date);
            window.loadstepsDone = window.loadstepsDone + 1;
        }); 
    }
    

    
    window.interval_check_loading_content = setInterval("check_loading_content()", 500);
}   
    
function initContent() {    
    
    //zahlencontent
    for (n=0;n<window.items.length;n++) {
        for (m=0;m<window.items[n].todo.length;m++) {
            if (window.items[n].todo[m].id == '0') { } else {
                window.loadsteps = window.loadsteps + 1;
                var data = window.localStorage.getItem('content_' + window.items[n].todo[m].id + '_date');
                if (data) {
                    if ((data < config.local_content_date) || (config.debug_content == true)) {
                        $.ajax({
                            url: 'content/' + window.language + '/' + window.items[n].todo[m].id + '.json',
                            dataType: 'json',
                            timeout: 1000,
                            async: false,
                            success: function(data, status){
                                localStorage.setItem('content_' + data.id, JSON.stringify(data));
                                window.localStorage.setItem('content_' + data.id + '_date', config.local_content_date);
                                window.loadstepsDone = window.loadstepsDone + 1;
                            },
                            error: function(){
                                window.loadstepsDone = window.loadstepsDone + 1;
                            }
                        });
                    } else {
                        window.loadstepsDone = window.loadstepsDone + 1;
                    }
                } else { 
                    $.ajax({
                        url: 'content/' + window.language + '/' + window.items[n].todo[m].id + '.json',
                        dataType: 'json',
                        timeout: 1000,
                        async: false,
                        success: function(data, status) { 
                            localStorage.setItem('content_' + data.id, JSON.stringify(data));
                            window.localStorage.setItem('content_' + data.id + '_date', config.local_content_date);
                            window.loadstepsDone = window.loadstepsDone + 1;
                        },
                        error: function(){
                            window.loadstepsDone = window.loadstepsDone + 1;
                        }
                    });
                }
            }
        }
    }
    
    //alert (window.loadsteps + ' ' + window.loadstepsDone);
    
    
    setLoading(60);
    $('#loading_info p').html('gleiche Daten online ab...');
    
    //contentabgleich online
    if (config.debug_content == false) { 
        window.loadsteps = window.loadsteps + 1;
        try { 
            $.ajax({
                type: 'GET',
                url: config.content_server + 'cmd=versions&language=' + window.language + '&jsoncallback=?',
                dataType: 'jsonp',
                timeout: 1000,
                success: function(data){ 
                    window.loadstepsDone = window.loadstepsDone + 1;
                    $.each(data, function(key, val) {
                        if (key == 'contacts') {
                            var localdata = window.localStorage.getItem('contacts_date');
                            if (localdata) {} else { localdata = '0'; }
                            if (localdata < val) {
                                window.loadsteps = window.loadsteps + 1;
                                try {
                                    $.ajax({
                                        type: 'GET',
                                        url: config.content_server + 'cmd=contacts&language=' + window.language + '&jsoncallback=?',
                                        dataType: 'jsonp',
                                        timeout: 1000,
                                        success: function(serverdata){   
                                            window.loadstepsDone = window.loadstepsDone + 1;
                                            window.contacts = serverdata;
                                            localStorage.setItem('contacts', JSON.stringify(serverdata));
                                            window.localStorage.setItem('contacts_date', val);
                                        },
                                        error: function(xhr, type){
                                            window.loadstepsDone = window.loadstepsDone + 1;
                                        }
                                    });
                                } catch(err) { window.loadstepsDone = window.loadstepsDone + 1; }
                            }
                        } else if (key == 'items') {
                            var localdata = window.localStorage.getItem('items_date');
                            if (localdata) {} else { localdata = '0'; }
                            if (localdata < val) {
                                window.loadsteps = window.loadsteps + 1;
                                try {
                                    $.ajax({
                                        type: 'GET',
                                        url: config.content_server + 'cmd=items&language=' + window.language + '&jsoncallback=?',
                                        dataType: 'jsonp',
                                        timeout: 1000,
                                        success: function(serverdata){   
                                            window.loadstepsDone = window.loadstepsDone + 1;
                                            window.contacts = serverdata;
                                            localStorage.setItem('items', JSON.stringify(serverdata));
                                            window.localStorage.setItem('items_date', val);
                                        },
                                        error: function(xhr, type){
                                            window.loadstepsDone = window.loadstepsDone + 1;
                                        }
                                    });
                                } catch(err) { window.loadstepsDone = window.loadstepsDone + 1; }
                            }
                        } else if (key == 'texts') { 
                            var localdata = window.localStorage.getItem('texts_date');
                            if (localdata) {} else { localdata = '0'; }
                            if (localdata < val) {
                                window.loadsteps = window.loadsteps + 1;
                                
                                try {
                                    $.ajax({
                                        type: 'GET',
                                        url: config.content_server + 'cmd=texts&language=' + window.language + '&jsoncallback=?',
                                        dataType: 'jsonp',
                                        timeout: 1000,
                                        success: function(serverdata){   
                                            window.loadstepsDone = window.loadstepsDone + 1;
                                            window.contacts = serverdata;
                                            localStorage.setItem('texts', JSON.stringify(serverdata));
                                            window.localStorage.setItem('texts_date', val);
                                        },
                                        error: function(xhr, type){
                                            window.loadstepsDone = window.loadstepsDone + 1;
                                        }
                                    });
                                } catch(err) { window.loadstepsDone = window.loadstepsDone + 1; }
                            }
                        } else {
                            if (isNumber(key)) {
                                var localdata = window.localStorage.getItem('content_' + key + '_date');
                                if (localdata) {} else { localdata = '0'; }
                                if (localdata < val) {
                                    window.loadsteps = window.loadsteps + 1;
                                    try {
                                        $.ajax({
                                            type: 'GET',
                                            url: config.content_server + 'cmd=' + key + '&language=' + window.language + '&jsoncallback=?',
                                            dataType: 'jsonp',
                                            timeout: 1000,
                                            success: function(serverdata){   
                                                window.loadstepsDone = window.loadstepsDone + 1;
                                                localStorage.setItem('content_' + serverdata.id, JSON.stringify(serverdata));
                                                window.localStorage.setItem('content_' + serverdata.id +'_date', val);
                                            },
                                            error: function(xhr, type){
                                                window.loadstepsDone = window.loadstepsDone + 1;
                                            }
                                        });
                                    } catch(err) { window.loadstepsDone = window.loadstepsDone + 1; }
                                }
                            
                            }
                        }
                    });
                },
                error: function(xhr, type){
                    window.loadstepsDone = window.loadstepsDone + 1;
                }
            });
        } catch(err) {
            window.loadstepsDone = window.loadstepsDone + 1;
        }
    }
    
    window.interval_check_loading = setInterval("check_loading()", 500); 
}   
    
    
function initDisplay() {    
    
    /*
    loadJs('content/' + window.language + '/items.js', function() { 
        loadJs('content/' + window.language + '/texts.js', function() {
            loadJs('content/' + window.language + '/contacts.js', function() {

    jQuery.getScript('content/' + window.language + '/items.js', function() {
        jQuery.getScript('content/' + window.language + '/texts.js', function() {
            jQuery.getScript('content/' + window.language + '/contacts.js', function() {
            */
        
            //anpassungen ios
            if ((window.checker.iphone) || (window.checker.ipad)) {
                $('#closeapp').css('display', 'none');
            }
                
        
            //textelemente
        	$('a[data-icon="back"]').html(window.texts.general_back); 
            $('#info h1').html(window.texts.imprint_topic); 
            $('#imprint_content').html(window.texts.imprint_content); 
            $('#terms_topic').html(window.texts.terms_topic); 
            $('#terms_content').html(window.texts.terms_content); 
            $('#offen_topic').html(window.texts.offen_topic); 
            $('#offen_content').html(window.texts.offen_content); 
            $('#fontsize_topic').html(window.texts.fontsize_topic);
            $('#fontsize_content').html(window.texts.fontsize_description);
            $('#font_size_1_text').html(window.texts.fontsize_small);
            $('#font_size_0_text').html(window.texts.fontsize_normal);
            $('#font_size_2_text').html(window.texts.fontsize_big);
            $('#reset_topic').html(window.texts.reset_topic);
            $('#reset_content').html(window.texts.reset_content);
            $('#reset_button').html(window.texts.reset_button);
            $('#content label[for="contentdisable"]').html(window.texts.content_deactivate); 
            $('#content div[data-role="collapsible"] h3').html(window.texts.content_more);
            $('#date_topic').html(window.texts.date_topic);
            $('#date_edit').html(window.texts.date_edit);
            $('#date_copy').html(window.texts.date_copy);
            $('#date_clear').html(window.texts.date_clear);
            $('#date_save').html(window.texts.date_save);
            $('#date_cancel').html(window.texts.date_cancel);
            $('#note_topic').html(window.texts.note_topic);
            $('#note_cancel').html(window.texts.note_cancel);
            $('#note_save').html(window.texts.note_save);
            $('.footer_home').html(window.texts.footer_home);
            $('.footer_note').html(window.texts.footer_note);
            $('.footer_contact').html(window.texts.footer_contact);
            $('#notes h1').html(window.texts.notes_topic); 
            $('#contacts h1').html(window.texts.contacts_topic); 
            $('#share h1').html(window.texts.share_topic);
            $('#share_cancel').html(window.texts.share_cancel);
            $('#tip_message').html(window.texts.tip_message);
            $('#tip_topic').html(window.texts.tip_topic);
            $('#tip_ok').html(window.texts.tip_ok);
            
            //kontakte
            var html = '<div><div data-role="collapsible-set" data-inset="false">';
            for (n=0;n<window.contacts.length;n++) {
                if (n == 0) {
                    //html += '<div data-role="collapsible" data-collapsed="false">';
                    html += '<div data-role="collapsible">';
                } else {
                    html += '<div data-role="collapsible">';
                }
                html += '<h3>' + window.contacts[n].name + '</h3>';
                
                for (m=0;m<window.contacts[n].contacts.length;m++) {
                    html += '<p><table>';
                    if (0 < window.contacts[n].contacts[m].name.length) {
                        html += '<tr><td>&nbsp;</td><td style="padding-bottom:5px;padding-left:10px;font-weight: bold;">' + window.contacts[n].contacts[m].name + '</td></tr>';
                    }
                    if (0 < window.contacts[n].contacts[m].email.length) {
                        html += '<tr><td><img src="img/contact_email.png" /></td><td style="padding-left:10px;"><a href="mailto:' + window.contacts[n].contacts[m].email + '">' + window.contacts[n].contacts[m].email + '</a></td></tr>';
                    }
                    if (0 < window.contacts[n].contacts[m].phone.length) {
                        html += '<tr><td style="padding-left:5px;"><img src="img/contact_phone.png" /></td><td style="padding-left:10px;"><a href="tel://' + window.contacts[n].contacts[m].phone + '">' + window.contacts[n].contacts[m].phone + '</a></td></tr>';
                    }
                    if (0 < window.contacts[n].contacts[m].fax.length) {
                        html += '<tr><td><img src="img/contact_fax.png" /></td><td style="padding-left:10px;">' + window.contacts[n].contacts[m].fax + '</td></tr>';
                    }
                    if (0 < window.contacts[n].contacts[m].address.length) {
                        html += '<tr><td style="padding-left:5px;"><img src="img/contact_address.png" /></td><td style="padding-left:10px;">' + window.contacts[n].contacts[m].address + '</td></tr>';
                    }
                    /*
                    if (0 < window.contacts[n].contacts[m].open.length) {
                        html += '<tr><td><img src="img/contact_open.png" / ></td><td style="padding-left:10px;">' + window.contacts[n].contacts[m].open + '</td></tr>';
                    }
                    */

                    html += '</table></p>';
                }
                html += '</div>';
            }
            html += '</div></div>';
            $('#contacts .ui-content').html(html);
            $('#contacts div[data-role="collapsible"]').bind('expand', function () {
                if (window.iscroll) {
                    setTimeout(function() {
                        //$("#contacts .ui-content").jqmData('iscrollview').iscroll.refresh();
                    }, 500 );    
                } 
            }).bind('collapse', function () {
                if (window.iscroll) {
                    setTimeout(function() {
                        //$("#contacts .ui-content").jqmData('iscrollview').iscroll.refresh();
                    }, 500 );    
                } 
            });
            
            
            //aufgaben
            var html_notes = '<div><div id="wko_notes_empty">' + window.texts.notes_empty + '</div>';//notes
            for (n=0;n<window.items.length;n++) {
                if (window.tablet) {
                    $('#phasebutton_'+n).html('<h3>' + window.items[n].name_button + '</h3><p>' + window.items[n].desc_button + '</p>');
                } else {
                    $('#phasebutton_'+n).html(window.items[n].name_button); 
                }
                $('#phase_'+n+' h1').html(window.items[n].name_topic); 
                
                //notes
                html_notes += '<div class="wko_notes_topic" id="notes_topic_todo_' + n + '">' + window.items[n].name_button + '</div>';
                
                var html = '<div class="scrollcontainer">';
                for (m=0;m<window.items[n].todo.length;m++) {
                	if (window.items[n].todo[m].id == '0') {
                		html += '<div class="wko_todo_topic">' + window.items[n].todo[m].topic + '</div>';
                	} else {
	                    //html += '<a href="#content?id=' + window.items[n].todo[m].id + '" data-role="button" data-mini="true">' + window.items[n].todo[m].name_button  + '</a>';
                		/*
                	    html += '<ul data-role="listview" data-inset="true">';
                	    html += '<li id="todobutton_' + window.items[n].todo[m].id + '_cont"><a id="todolink_' + window.items[n].todo[m].id + '" data-prefetch class="todolink" ';
                	    var data = window.localStorage.getItem("date_" + window.items[n].todo[m].id);
                        if (data) {
                            html += 'style="padding-right:110px;"';
                        }
                	    html += '><h3>' + window.items[n].todo[m].name_button  + '</h3><p>' + window.items[n].todo[m].desc_button + '</p></a>';
                	    html += '<span class="ui-li-count" style="display:';
                        if (data) {
                            html += 'block';
                        } else {
                            data = '';
                            window.localStorage.setItem("date_" + window.items[n].todo[m].id, '');
                            html += 'none';
                        }
                	    html += ';" id="tododateshow_' + window.items[n].todo[m].id +'">' + data + '</span></li>';
                	    html += '</ul>';
                	    */
                	    
                	    
                	    
                	    
                	    
                	    
                	    html += '<div id="todobutton_' + window.items[n].todo[m].id + '_cont" class="phase_red wko_bigbutton ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-count ui-corner-top ui-corner-bottom ui-li-last ui-btn-up-c" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c">';
                	    //html += '<div class="ui-btn-inner ui-li ui-corner-top">';
                	    //html += '<div class="ui-btn-text">';
                	    html += '<a id="todolink_' + window.items[n].todo[m].id + '" class="todolink ui-link-inherit" data-prefetch=""';
                	    var data = window.localStorage.getItem("date_" + window.items[n].todo[m].id);
                        if (data) {
                            html += 'style="padding-right:110px;"';
                        }
                	    html += '>';
                	    html += '<h3 class="ui-li-heading">' + window.items[n].todo[m].name_button  + '</h3>';
                	    html += '<p class="ui-li-desc">' + window.items[n].todo[m].desc_button + '</p>';
                	    html += '</a>';
                	    html += '<span id="tododateshow_' + window.items[n].todo[m].id +'" class="ui-li-count ui-btn-up-c ui-btn-corner-all" style="display: ';
                        if (data) {
                            html += 'block';
                        } else {
                            data = '';
                            window.localStorage.setItem("date_" + window.items[n].todo[m].id, '');
                            html += 'none';
                        }
                	    html += '">' + data + '</span>';
                	    //html += '</div>';
                	    html += '<span class="ui-icon ui-icon-arrow-r ui-icon-shadow"> </span>';
                	    //html += '</div>';
                	    html += '</div>';
                	    
                	    /*
	                    html += '<a data-role="button" data-icon="arrow-r" data-iconpos="right" data-transition="slide" class="todolink" data-mini="false" id="todolink_' + window.items[n].todo[m].id + '">' + window.items[n].todo[m].name_button  + '</a>';
	                    
	                    
	                	var data = window.localStorage.getItem("status_" + window.items[n].todo[m].id);
	                    if (data) {  } else { data = 0; window.localStorage.setItem("status_" + window.items[n].todo[m].id, '0'); }
	                    html += 'Status: <span id="todostateshow_' + window.items[n].todo[m].id +'">' + data + '</span>';
	                    
	                	var data = window.localStorage.getItem("date_" + window.items[n].todo[m].id);
	                    if (data) {  } else { data = ''; window.localStorage.setItem("date_" + window.items[n].todo[m].id, ''); }
	                    html += 'Termin: <span id="tododateshow_' + window.items[n].todo[m].id +'">' + data + '</span>';

	                    
	                    */

                	    /*
	                    html += '<div class="ui-grid-b" id="phase_buttoncontainer_' + window.items[n].todo[m].id + '">';
	                    html += '<div class="ui-block-a"><a data-role="button" data-theme="d" class="tododate" data-mini="true" data-icon="phase_date" id="tododate_' + window.items[n].todo[m].id + '">Termin</a></div>'
	                    html += '<div class="ui-block-b"><a data-role="button" data-theme="d" class="todonote" data-mini="true" data-icon="phase_note" id="todonote_' + window.items[n].todo[m].id + '">Notiz</a></div>';
	                    html += '<div class="ui-block-c"><a data-role="button" data-theme="d" class="todostate" data-mini="true" data-icon="phase_state" id="todostate_' + window.items[n].todo[m].id + '">Status</a></div>';
	                    html += '</div>';
	                    */
	                    
	                    html += '<div id="phase_buttoncontainer_' + window.items[n].todo[m].id + '" class="ui-grid-b" style="display: block;">';
	                    html += '<a id="tododate_' + window.items[n].todo[m].id + '" class="wko_tododate wko_smallbutton tododate ui-btn ui-shadow ui-btn-corner-all ui-mini ui-btn-icon-left ui-btn-up-d" data-icon="phase_date" data-mini="true" data-theme="d" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span">';
	                    html += '<span class="wko_smallbutton_text ui-btn-text">Termin</span>';
	                    html += '</a>';
	                    html += '<a id="todonote_' + window.items[n].todo[m].id + '" class="wko_todonote wko_smallbutton todonote ui-btn ui-btn-up-d ui-shadow ui-btn-corner-all ui-mini ui-btn-icon-left" data-icon="phase_note" data-mini="true" data-theme="d" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span">';
	                    html += '<span class="wko_smallbutton_text ui-btn-text">Notiz</span>';
	                    html += '</a>';
	                    html += '<a id="todostate_' + window.items[n].todo[m].id + '" class="wko_todostate wko_smallbutton todostate ui-btn ui-btn-up-d ui-shadow ui-btn-corner-all ui-mini ui-btn-icon-left" data-icon="phase_state" data-mini="true" data-theme="d" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span">';
	                    html += '<span class="wko_smallbutton_text ui-btn-text">Status</span>';
	                    html += '</a>';
	                    html += '</div>';
	                    
	                    //notes
	                    html_notes += '<div data-role="collapsible" data-inset="false" id="notes_todo_' + window.items[n].todo[m].id + '">';
	                    html_notes += '<h3>' + window.items[n].todo[m].name_button + '</h3>';
	                    html_notes += '<p></p>';
	                    html_notes += '<a data-role="button" data-theme="d" class="notes_edit" data-mini="true" data-iconpos="" data-icon="phase_note" id="notes_edit_' + window.items[n].todo[m].id + '">Bearbeiten</a>';
	                    html_notes += '</div>';
	                    
	                    /*
	                    html += '<div data-role="popup" id="popupStatus_' + window.items[n].todo[m].id + '">';
	                    html += '<p><div data-role="controlgroup">';
	                    html += '<a href="#" data-role="button" class="status_button_0">Nicht begonnen</a>';
	                    html += '<a href="#" data-role="button" class="status_button_1">Begonnen</a>';
	                    html += '<a href="#" data-role="button" class="status_button_2">Erledigt</a>';
	                    html += '</div><p>';
	                    html += '</div>';
	                    */
                    }

                }
                
                html += '<div data-role="popup" id="popupStatus_' + n + '" class="popupStatus">';
                html += '<p><div data-role="controlgroup">';
                html += '<a href="#" data-role="button" class="status_button_0">Nicht begonnen</a>';
                html += '<a href="#" data-role="button" class="status_button_1">Begonnen</a>';
                html += '<a href="#" data-role="button" class="status_button_2">Erledigt</a>';
                html += '</div><p>';
                html += '</div>';
                html += '</div>';
                
                $('#phase_' + n + ' .ui-content').html(html);
                //$('#test').html(html);
                
                //for (m=0;m<window.items[n].todo.length;m++) {
                    //$('todolink_' + window.items[n].todo[m].id)
                //}
                
            }
            //notes
            html_notes += '</div>';
            $('#notes .ui-content').html(html_notes);
            refreshNotes();
            
            //detaillink
            $('.todolink').click(function() {
                var id = $(this).attr('id');
                id  = id.substr(9);
                window.currentDetails = id;
                var data = window.localStorage.getItem('content_' + id);
                if (data) {
                    window.content = JSON.parse(data);
                	$('#content h1').html(window.content.topic); 
                	$('#content .shorttext').html(window.content.shorttext);
                	
                	$('#content_more').trigger('collapse');
                	if (0 < window.content.longtext.length) {
                    	if (window.tablet) {
                    		$('#content .longtexttablet').html(window.content.longtext);
                    		$('#content .longtexttablet').css('display', 'block');
                    		$('#content_more').css('display', 'none');
                    	} else {
                    	    $('#content .longtext').html(window.content.longtext);
                    	    $('#content_more').css('display', 'block');
                    	    $('#content .longtexttablet').css('display', 'none');
                        }
                	} else {
                	    $('#content_more').css('display', 'none');
                	    $('#content .longtexttablet').css('display', 'none');
                	}
                	
                    var data = window.localStorage.getItem("mandatory_" + window.currentDetails);
                    if (data) {
                        if (data == '1') { 
                            $('#contentdisable').attr('checked', true).checkboxradio('refresh');
                        } else {
                        	$('#contentdisable').attr('checked', false).checkboxradio('refresh');	
                        }
                    } else {
                    	$('#contentdisable').attr('checked', false).checkboxradio('refresh');
                    }
                    
                    if (window.content.deactivatable == false) {
                        $('#content_disable_container fieldset').css('display', 'none');
                    } else {
                        $('#content_disable_container fieldset').css('display', 'block');
                    }
                    
                    if (window.content.id == 22) {
                        $('#content_disable_right').css('display', 'block');
                    } else {
                        $('#content_disable_right').css('display', 'none');
                    }
                    
                    if (window.checker.android) {
                        $('.only_ios').css('display', 'none');
                    } else {
                        $('.only_android').css('display', 'none');
                    }

                    if (window.iscroll) {
                        //window.iscroll.scrollTo(0, 0, 1, true);
                        $("#content .ui-content").jqmData('iscrollview').iscroll.scrollTo(0,0,0,false);
                    } else {
                        $('#content .ui-content').scrollTop(0);
                    }
                    
                    //youtube videos in tablets einbetten, funktioniert aktuell nicht über iframe
                    /*
                    if (window.tablet) { 
                    	$('#content .ui-content .link_yt_cont').each(function() {
                    		var name = $(this).children('a').html();
                    		var href = $(this).children('a').attr('href');
                    		var videoId = href.replace(/^.*?(\?|&)(v=([^&]+)).*$/i,'$3');
                    		var videoWidth = window.innerWidth - 40;
                    		var videoHeight = Math.round((9 * videoWidth) / 16);
                    		var code = '<div style="padding-left: 5px;"><iframe width="' + videoWidth + '" height="' + videoHeight + '" src="http://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe><div style="width:100%;text-align:center;">' + name + '</div></div>';
                    		$(this).html(code);
                    	});
                    }
                    */
                    
                    //externe links für installierte app anpassen bei android
                    if (window.checker.android) {
                        $('#content .ui-content a').each(function() {
                            var href = $(this).attr('href');
                            $(this).attr('onclick', "navigator.app.loadUrl('" + href + "', { openExternal:true } )")
                                   .removeAttr('href')
                                   .removeAttr('target');
                        });
                    }
                    if (window.showani == 1) {
                    	$.mobile.changePage('#content', {
                    		transition: window.slideeffect,
                    		reverse: false
                    	});
                    } else {
                        $.mobile.changePage('#content', {
                            transition: "none",
                            reverse: false
                        });
                    }
                }
            });
            
            var data = window.localStorage.getItem('legalform');
            if (data) {
                $("#rights-choice-" + data).attr("checked", true);
            }
            
            $("[name=rights-choice]").change(function() {
                var temp = $('input[name=rights-choice]:checked').val();
                window.localStorage.setItem("status_22", '2');
                window.localStorage.setItem("legalform", temp);
                temp = parseInt(temp);
                for (m=0;m<window.items[2].todo.length;m++) {
                    if (window.items[2].todo[m].id == '0') {} else {
                        if ($.inArray(temp, window.items[2].todo[m].legalform) !== -1) {
                            window.localStorage.setItem("mandatory_"+window.items[2].todo[m].id, '0');
                        } else {
                            window.localStorage.setItem("mandatory_"+window.items[2].todo[m].id, '1');
                        }
                    }
                }
                calculateStatus(true);
            });
            
            //notizen
            /*
            $('#note').live('pageshow', function(event, ui) {
            	$('.ui-dialog-contain').css('margin', (window.innerHeight/10) +'px auto 0 auto');
            });
            */
            $('#note_content').css('height', (window.innerHeight - (window.innerWidth/5) - 110) +'px');
            $('.todonote').click(function() {
                var id = $(this).attr('id');
                id  = id.substr(9);
                window.currentDetails = id;
                
            	var data = window.localStorage.getItem("note_"+id);
                if (data) { $('#note_content').val(data); } else { $('#note_content').val(''); }
                
                if (window.showani == 1) {
                    $.mobile.changePage('#note', {
                        transition: "none",
                        role: 'dialog',
                        reverse: false
                    });
                } else {
                    $.mobile.changePage('#note', {
                        transition: "none",
                        role: 'dialog',
                        reverse: false
                    });
                }
            });
            $('#note_save').click(function() {
            	$('.ui-dialog').dialog('close');
            	window.localStorage.setItem("note_"+window.currentDetails, $('#note_content').val());
            	$('#note_content').val(' ');
            	refreshNotes();
            });	
            $('.notes_edit').click(function() {
                var id = $(this).attr('id');
                id  = id.substr(11);
                window.currentDetails = id;
                
                var data = window.localStorage.getItem("note_"+id);
                if (data) { $('#note_content').val(data); } else { $('#note_content').val(''); }
                
                if (window.showani == 1) {
                    $.mobile.changePage('#note', {
                        transition: "none",
                        role: 'dialog',
                        reverse: false
                    });
                } else {
                    $.mobile.changePage('#note', {
                        transition: "none",
                        role: 'dialog',
                        reverse: false
                    });
                }
            });
            
            
            
            //status
            $('.status_button_0').click(function() {
                window.localStorage.setItem("status_" + window.currentDetails, '0');
                calculateStatus(true);
                $('.popupStatus').popup('close');
            }); 
            $('.status_button_1').click(function() {
                window.localStorage.setItem("status_" + window.currentDetails, '1');
                calculateStatus(true);
                $('.popupStatus').popup('close');
            }); 
            $('.status_button_2').click(function() {
                window.localStorage.setItem("status_" + window.currentDetails, '2');
                calculateStatus(true);
                $('.popupStatus').popup('close');
                setTimeout(function() {
                    for (n=0;n<4;n++) { 
                        if($('#phase_' + n).css('display') == 'block'){ 
                            var temp = false;
                            for (m=0;m<window.items[n].todo.length;m++) {
                                if (window.items[n].todo[m].id == window.currentDetails) {
                                    if (window.items[n].todo[m].social == true) {
                                        share('todo', window.items[n].todo[m].name_button);
                                        temp = true;
                                    }
                                }
                            }
                            if (temp == false) {
                                if (window.statuss.phase[n] == 100) {
                                    share('phase', n);
                                }
                            }
                        }
                    }
                }, 500 );
                //spezial fuer gewerbeanmeldung
                if (window.currentDetails == 28) {
                    //15. nächster monat
                    var date = new Date();
                    date.setMonth(date.getMonth() + 1);
                    var tempDate = '15.';
                    if ((date.getMonth() + 1) < 10) {
                        tempDate += '0';
                    }
                    tempDate += (date.getMonth() + 1) + '.' + (date.getYear() + 1900);
                    window.localStorage.setItem("date_43", tempDate);
                    $('#tododateshow_43').html(tempDate);
                    $('#tododateshow_43').css('display', 'block');
                    $('#todolink_43').css('padding-right','110px');
                    //15. übernächster monat
                    var date = new Date();
                    date.setMonth(date.getMonth() + 2);
                    var tempDate = '15.';
                    if ((date.getMonth() + 1) < 10) {
                        tempDate += '0';
                    }
                    tempDate += (date.getMonth() + 1) + '.' + (date.getYear() + 1900);
                    window.localStorage.setItem("date_39", tempDate);
                    $('#tododateshow_39').html(tempDate);
                    $('#tododateshow_39').css('display', 'block');
                    $('#todolink_39').css('padding-right','110px');
                    //15.nächstes quartal
                    var date = new Date();
                    if (date.getDay() > 15) {
                        date.setMonth(date.getMonth() + 1);
                    }
                    var tempDate = '15.02.' + ((date.getYear() + 1900) + 1);
                    if (date.getMonth() <= 10) {
                        var tempDate = '15.11.' + (date.getYear() + 1900);
                    }
                    if (date.getMonth() <= 7) {
                        var tempDate = '15.08.' + (date.getYear() + 1900);
                    }
                    if (date.getMonth() <= 4) {
                        var tempDate = '15.05.' + (date.getYear() + 1900);
                    }
                    if (date.getMonth() <= 1) {
                        var tempDate = '15.02.' + (date.getYear() + 1900);
                    }
                    window.localStorage.setItem("date_40", tempDate);
                    $('#tododateshow_40').html(tempDate);
                    $('#tododateshow_40').css('display', 'block');
                    $('#todolink_40').css('padding-right','110px');
                    window.localStorage.setItem("date_41", tempDate);
                    $('#tododateshow_41').html(tempDate);
                    $('#tododateshow_41').css('display', 'block');
                    $('#todolink_41').css('padding-right','110px');
                }
            }); 

            
            
            
            $('.todostate').click(function() {
                var id = $(this).attr('id');
                id  = id.substr(10);
                window.currentDetails = id;
                for (n=0;n<4;n++) { 
                    if($('#phase_' + n).css('display') == 'block'){ 
                    	$('#popupStatus_' + n).popup('open');
                    }
                }
            });
            
            //date
            $('.tododate').click(function() {
                var id = $(this).attr('id');
                id  = id.substr(9);
                window.currentDetails = id;
                
                //$('#date_edit').html(window.texts.date_edit);
                
            	var data = window.localStorage.getItem("date_"+id);
                if (data) {
                	if (data == '') {
                	    $('#date_temp').val(window.texts.date_nodate);
                	    $('#date_edit span').html(window.texts.date_new);
                	} else {
                		$('#date_temp').val(data);
                		$('#date_edit span').html(window.texts.date_edit);
                	}
                } else {
                	$('#date_temp').val(window.texts.date_nodate);
                	$('#date_edit span').html(window.texts.date_new);
                }
                if (window.showani == 1) {
                    $.mobile.changePage('#date', {
                        transition: "none",
                        role: 'dialog',
                        reverse: false
                    });
                } else {
                    $.mobile.changePage('#date', {
                        transition: "none",
                        role: 'dialog',
                        reverse: false
                    });
                }
            });
            $('#date_save').click(function() {
            	$('.ui-dialog').dialog('close');
            	if ($('#date_temp').val() == window.texts.date_nodate) {
            	    window.localStorage.setItem("date_"+window.currentDetails, '');
            	    $('#tododateshow_'+window.currentDetails).html('');
            	    $('#tododateshow_'+window.currentDetails).css('display', 'none');
            	    $('#todolink_'+window.currentDetails).css('padding-right','35px');
            	} else {
            		window.localStorage.setItem("date_"+window.currentDetails, $('#date_temp').val());
            		$('#tododateshow_'+window.currentDetails).html($('#date_temp').val());
            		$('#tododateshow_'+window.currentDetails).css('display', 'block');
            		$('#todolink_'+window.currentDetails).css('padding-right','110px');
            	}
            });	
            $('#date_clear').click(function() {
            	$('#date_temp').val(window.texts.date_nodate);
            	$('#date_edit span').html(window.texts.date_new);
            });	
            $('#date_temp').scroller({
                preset: 'date',
                invalid: { daysOfWeek: [], daysOfMonth: [] },
                theme: 'jqm',
                display: 'modal',
                lang: window.language,
                mode: 'scroller',
                showLabel : false,
                dateOrder: 'D ddmmyy'
            });   
            $('#date_edit').click(function() {
            	$('#date_temp').scroller('show'); 
            	$('#date_edit span').html(window.texts.date_edit);
            });	
            $('#date_copy').click(function() {
                if ($('#date_temp').val() == window.texts.date_nodate) {
                } else {
                    var name = 'Gründernavi - ' + $('#todolink_' + window.currentDetails + ' h3').html();
                    var data = window.localStorage.getItem("note_" + window.currentDetails);
                    if (data) {
                        var note = data;
                    } else {
                        var note = 'Termin wurde durch die WKO Gründernavi App eingetragen.';
                    }
                    addtocalender(name, $('#date_temp').val(), note); 
                    //beim kopieren das datum auch in der app speichern
                    window.localStorage.setItem("date_"+window.currentDetails, $('#date_temp').val());
                    $('#tododateshow_'+window.currentDetails).html($('#date_temp').val());
                    $('#tododateshow_'+window.currentDetails).css('display', 'block');
                }
            }); 
            
            
            //detailbeschreibung
            $('#contentdisable').click(function() {
                if ($("#contentdisable").is(":checked")) {
                    window.localStorage.setItem("mandatory_"+window.currentDetails, '1');
                } else {
                    window.localStorage.setItem("mandatory_"+window.currentDetails, '0');    
                }
                calculateStatus(true);
                setTimeout(function() {
                    var temp = -1;
                    for (n=0;n<4;n++) { 
                        for (m=0;m<window.items[n].todo.length;m++) {
                            if (window.items[n].todo[m].id == window.currentDetails) {
                                temp = n;
                            }
                        }
                    }
                    if (temp > -1) {
                        if (window.statuss.phase[temp] == 100) {
                            share('phase', temp);
                        }
                    }
                }, 500 );
            }); 
            $('#content_more').bind('expand', function () {
                if (window.iscroll) {
                    setTimeout(function() {
                        //$("#content .ui-content").jqmData('iscrollview').iscroll.refresh();
                        $("#content .ui-content").jqmData('iscrollview').iscroll.scrollTo(0, window.innerHeight/2, 100, true);
                    }, 500 );    
                } else {
                    setTimeout(function() {
                        $('#content .ui-content').scrollTop(window.innerHeight/2);
                    }, 500 );
                }
            }).bind('collapse', function () {
            });
            
            //impressum
            var data = window.localStorage.getItem("fontsize");
            if (data) {
                $('#font_size_'+data).attr('checked', 'checked');
                if (data == '1') {
                    $('.shorttext').removeClass('shorttext_big').addClass('shorttext_small');
                    $('.longtext').removeClass('longtext_big').addClass('longtext_small');
                    $('.longtexttablet').removeClass('longtexttablet_big').addClass('longtexttablet_small');
                }
                if (data == '2') {
                    $('.shorttext').addClass('shorttext_big').removeClass('shorttext_small');
                    $('.longtext').addClass('longtext_big').removeClass('longtext_small');
                    $('.longtexttablet').addClass('longtexttablet_big').removeClass('longtexttablet_small');
                }
            } else {
                window.localStorage.setItem("fontsize", '0');
            }
            $('input[name="font_size"]').bind('click', function(event, ui) {
                var temp = $('input[name="font_size"]:checked').val();
                if (temp == 0) {
                    $('.shorttext').removeClass('shorttext_big').removeClass('shorttext_small');
                    $('.longtext').removeClass('longtext_big').removeClass('longtext_small');
                    $('.longtexttablet').removeClass('longtexttablet_big').removeClass('longtexttablet_small');
                }
                if (temp == 1) {
                    $('.shorttext').removeClass('shorttext_big').addClass('shorttext_small');
                    $('.longtext').removeClass('longtext_big').addClass('longtext_small');
                    $('.longtexttablet').removeClass('longtexttablet_big').addClass('longtexttablet_small');
                }
                if (temp == 2) {
                    $('.shorttext').addClass('shorttext_big').removeClass('shorttext_small');
                    $('.longtext').addClass('longtext_big').removeClass('longtext_small');
                    $('.longtexttablet').addClass('longtexttablet_big').removeClass('longtexttablet_small');
                }
                window.localStorage.setItem("fontsize", temp);
            });
            $('#reset_button').click(function() {
                navigator.notification.confirm(
                        window.texts.reset_sentence,  
                        function(button) {
                            if (button == 1) {
                                //löschen der daten
                                for (n=0;n<window.items.length;n++) {
                                    for (m=0;m<window.items[n].todo.length;m++) {
                                        window.localStorage.removeItem("status_" + window.items[n].todo[m].id);
                                        window.localStorage.removeItem("note_" + window.items[n].todo[m].id);
                                        window.localStorage.removeItem("mandatory_" + window.items[n].todo[m].id);
                                        window.localStorage.setItem("date_" + window.items[n].todo[m].id, '');
                                        $('#todobutton_' + window.items[n].todo[m].id + '_cont').removeClass('phase_green').removeClass('phase_yellow').addClass('phase_red');
                                        $('#tododateshow_'+window.items[n].todo[m].id ).html('');
                                        $('#tododateshow_'+window.items[n].todo[m].id ).css('display', 'none');
                                        $('#todolink_'+window.items[n].todo[m].id ).css('padding-right','35px');
                                        window.localStorage.removeItem("legalform");
                                    }
                                }
                                calculateStatus(true);
                                refreshNotes();
                                if (window.showani == 1) {
                                    $.mobile.changePage('#status', {
                                        transition: window.slideeffect,
                                        reverse: true
                                    });
                                } else {
                                    $.mobile.changePage('#status', {
                                        transition: "none",
                                        reverse: true
                                    });
                                }
                            }
                        },            
                        window.texts.reset_question,          
                        window.texts.reset_yes + ',' + window.texts.reset_no
                );
            });
            
            //datumsinterval weiterschalten
            var data = window.localStorage.getItem("date_40");
            if (data) {
                if (data == '') { } else {
                    var dateNow = new Date();
                    var myArray = data.split('.');
                    var date = new Date(parseInt(myArray[2]), parseInt(myArray[1]), parseInt(myArray[0]), 23, 59, 59, 0)
                    if (date < dateNow) {
                        var date = new Date();
                        if (date.getDay() > 15) {
                            date.setMonth(date.getMonth() + 1);
                        }
                        var tempDate = '15.02.' + ((date.getYear() + 1900) + 1);
                        if (date.getMonth() <= 1) {
                            var tempDate = '15.02.' + (date.getYear() + 1900);
                        }
                        if (date.getMonth() <= 4) {
                            var tempDate = '15.05.' + (date.getYear() + 1900);
                        }
                        if (date.getMonth() <= 7) {
                            var tempDate = '15.08.' + (date.getYear() + 1900);
                        }
                        if (date.getMonth() <= 10) {
                            var tempDate = '15.11.' + (date.getYear() + 1900);
                        }
                        window.localStorage.setItem("date_40", tempDate);
                        $('#tododateshow_40').html(tempDate);
                        $('#tododateshow_40').css('display', 'block');
                        window.localStorage.setItem("date_41", tempDate);
                        $('#tododateshow_41').html(tempDate);
                        $('#tododateshow_41').css('display', 'block');
                    }
                }
            }
            
            //tablet designanpassungen dateOrder: 'mmD ddyy'
            if (window.tablet) {
                tabletHeader();
            }
            //
            
            
            //statusgrafik
            calculateStatus(true);
            
            //statushinweis
            $('[data-role="page"][data-tip="enable"]').live('pageshow', function(event, ui) {
                var data = window.localStorage.getItem("tip");
                if (data) {} else {
                    setTimeout(function() {
                        $.mobile.changePage('#tip', {
                            transition: "none",
                            role: 'dialog',
                            reverse: true
                        });
                    }, 500 );
                    window.localStorage.setItem("tip", "1");
                }
            }); 
            
            
            //specialclicks
            $('#closeapp').click(function() {
                navigator.notification.confirm(
                        window.texts.exit_sentence,  
                        function(button) {
                            if (button == 1) {
                                navigator.app.exitApp();
                            }
                        },            
                        window.texts.exit_topic,          
                        window.texts.exit_yes + ',' + window.texts.exit_no
                );
            });
            
            //* long touch events ios
            if ((window.checker.iphone) || (window.checker.ipad)) {
                $("a").bind('taphold', function(event) {
                    event.preventDefault();
                });
            }
            
            //ios doubleclick
            if ((window.checker.iphone) || (window.checker.ipad)) {
                $('.center-wrapper').nodoubletapzoom();
                $('.ui-footer a').nodoubletapzoom();
                $('#note').nodoubletapzoom();
                $('#note a').nodoubletapzoom();
                $('#date').nodoubletapzoom();
                $('#date a').nodoubletapzoom();
            }
                
            //pagetransisions
            /*
            $( "#status" ).delegate("#phasebutton_0", 'tap', function(event) {
                $.mobile.showPageLoadingMsg();
                $.mobile.changePage( "#phase_1", { transition: "slide"} );                                               
                event.stopImmediatePropagation();
                return false;
            });  
            */
            
            //alert($.mobile);
            
            window.interval_check_loading_mobile = setInterval("check_loading_mobile()", 500); 
            
            
            /*
            $.mobile.initializePage();
            
            alert('done');
            
            //prereder the rest
            $("#status").live("pageshow",function(){
                $.mobile.loadPage("#status");
                $.mobile.loadPage("#info");
                $.mobile.loadPage("#phase_0");
                $.mobile.loadPage("#phase_1");
                $.mobile.loadPage("#phase_2");
                $.mobile.loadPage("#phase_3");
                $.mobile.loadPage("#content");
                $.mobile.loadPage("#notes");
                $.mobile.loadPage("#contacts");
            });
            */
            /*
            });
        });
    });
    */
}


var config = { 
    "content_server"      : "http://wkounternehmertest.aboliton.at/gruendernavi/api.php?",
    "local_content_date"  : "2013-01-01",
    "facebook_apiid"      : "501940806503801",
    "facebook_picurl"     : "",
    "facebook_sharelink"  : "http://wkounternehmertest.aboliton.at/gruendernavi/facebook.php",
    "facebook_sharetitle" : "Gründernavi",
    "googlep_sharelink"   : "http://www.gruenderservice.at/format_detail.wk?stid=708634&chid=26",
    "twitter_sharelink"   : "http://www.gruenderservice.at/format_detail.wk?stid=708634&chid=26",
    "debug_content"       : false
};

(function(){if("ontouchstart"in window&&!/chrome/i.test(navigator.userAgent)){var g,h,i,e=function(a,c){return 5<Math.abs(a[0]-c[0])||5<Math.abs(a[1]-c[1])},m=function(a,c){for(var b=a,f=c.toUpperCase();b!==document.body;){if(!b||b.nodeName===f)return b;b=b.parentNode}return null};document.addEventListener("touchstart",function(a){this.startXY=[a.touches[0].clientX,a.touches[0].clientY];this.treshold=!1},!1);document.addEventListener("touchmove",function(a){if(this.treshold)return!1;this.threshold=
e(this.startXY,[a.touches[0].clientX,a.touches[0].clientY])},!1);document.addEventListener("touchend",function(a){if(!this.treshold&&!e(this.startXY,[a.changedTouches[0].clientX,a.changedTouches[0].clientY])){var c=a.changedTouches[0],b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null);b.simulated=!0;a.target.dispatchEvent(b)}},!1);document.addEventListener("click",function(a){var c=Date.now(),b=c-g,f=a.clientX,
e=a.clientY,j=[Math.abs(h-f),Math.abs(i-e)],d=m(a.target,"A")||a.target,k="A"===d.nodeName,l=window.navigator.standalone&&k&&a.target.getAttribute("href");g=c;h=f;i=e;if(!a.simulated&&(500>b||1500>b&&50>j[0]&&50>j[1])||l)if(a.preventDefault(),a.stopPropagation(),!l)return!1;window.navigator.standalone&&k&&d.getAttribute("href")&&(window.location=d.getAttribute("href"));d&&d.classList&&(d.classList.add("m-focus"),window.setTimeout(function(){d.classList.remove("m-focus")},150))},!0)}})();



function test() {
    /*
    var later = new Date();
    later.setDate(later.getDate() + 15); // 3 days from now

    
    cordova.require('cordova/plugin/calendar').findEvents(function(events) {
      alert(events);
    }, function() {
        alert(error);
    }, {
      'startAfter': new Date().getTime(),
      'startBefore': later.getTime()
    });
    
    /*
    cordova.require('cordova/plugin/calendar').echo(function(stringding) {
        alert(stringding);
    } , {
            'startAfter': new Date().getTime(),
            'startBefore': later.getTime()
          });
    
    */
    
    /*
    var address = 'neubaugasse 52, vienna, austria';
    
    window.plugins.webintent.startActivity({
        action: WebIntent.ACTION_VIEW,
        url: 'geo:0,0?q=' + address}, 
        function() {}, 
        function() {alert('Failed to open URL via Android Intent')}
    );
    */
    
    /*
    var extras = {};
    extras[WebIntent.EXTRA_SUBJECT] = 'subject';
    extras[WebIntent.EXTRA_TEXT] = 'body';
    window.plugins.webintent.startActivity({
        url: 'bernd@kantoks.de',
        action: WebIntent.ACTION_SEND,
        type: 'text/plain', 
        extras: extras 
      }, 
      function() {
          alert("mail sent");
      }, 
      function() {
        alert('Failed to send email via Android Intent');
      }
    ); 
    */
    /*
    Intent intent = new Intent(Intent.ACTION_EDIT);
    intent.setType("vnd.android.cursor.item/event");
    intent.putExtra("beginTime", cal.getTimeInMillis());
    intent.putExtra("allDay", true);
    intent.putExtra("rrule", "FREQ=YEARLY");
    intent.putExtra("endTime", cal.getTimeInMillis()+60*60*1000);
    intent.putExtra("title", "A Test Event from android app");
    //startActivity(intent);
    */
    /*
    var extras = {};
    extras['beginTime'] = 0;
    extras['allDay'] = true;
    extras['rrule'] = 'FREQ=YEARLY';
    extras['endTime'] = 0;
    extras['title'] = 'A Test Event from android app';
    window.plugins.webintent.startActivity({
        action: 'android.intent.action.EDIT',
        type: 'vnd.android.cursor.item/event', 
        extras: extras 
      }, 
      function() {
          alert("angelegt");
      }, 
      function() {
        alert('Failed ');
      }
    ); 
    
       
    alert('test2');
    */
}

touchMove = function(event) {
    event.preventDefault();
}

function onBackKeyDown() {
    if ($('#status').css('display') == 'block') {
        navigator.notification.confirm(
                window.texts.exit_sentence,  
                function(button) {
                    if (button == 1) {
                        navigator.app.exitApp();
                    }
                },            
                window.texts.exit_topic,          
                window.texts.exit_yes + ',' + window.texts.exit_no
        );
    } else {
        parent.history.back();
    }
}

function setLoading(value) {
	$('#loading_info_bar .inner').css('width', Math.round(window.innerWidth * 0.7 * (value/100)) + 'px');
}

function isNumber (o) {
    return ! isNaN (o-0);
}

function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}

function check_loading_content() {
    if (window.loadsteps == window.loadstepsDone) {
        clearInterval(window.interval_check_loading_content);
        
        
        loadJs('js/jquery/jquery.mobile-1.2.0.min.js', function() { 
            $.mobile.defaultHomeScroll = 0;
            $.mobile.ajaxLinksEnabled = false;
            
            
            var showscroll = 1;
            if (window.checker.android) {
                var android_version = parseFloat(device.version);
                if (android_version >= 4) {
                    showscroll = 0;
                }
            } else {
                /*
                if ((window.checker.iphone) || (window.checker.ipad)) {
                    var ios_version = parseFloat(device.version);
                    if (ios_version >= 5) {
                        showscroll = 0;
                    }
                }
                */
            }
            if (showscroll == 1) {
                //loadJs('js/iscroll-lite.js?v4', function() { 
                loadJs('js/iscroll.js', function() {    
                    loadJs('js/jquery.mobile.iscrollview.js', function() { 
                        window.iscroll = true;
                    });
                });
            }
        }); 
        
        //doubletap per js unterdruecken
        if ((window.checker.iphone) || (window.checker.ipad)) {
            loadJs('js/ios/nodoubltetab.js', function() { }); 
        }
        
        /*
        $.ajax({
            url: 'js/jquery/jquery.mobile-1.2.0.js',
            dataType: 'script',
            timeout: 1000,
            async: false,
            success: function(data, status){
                $.mobile.defaultHomeScroll = 0;
                $.mobile.ajaxLinksEnabled = false;
                alert('2');
            },
            error: function(){ }
        });
        $.ajax({
            url: 'js/iscroll-lite.js?v4',
            dataType: 'script',
            timeout: 1000,
            async: false,
            success: function(data, status){
            },
            error: function(){ }
        });
        $.ajax({
            url: 'js/jquery.mobile.iscroll.js',
            dataType: 'script',
            timeout: 1000,
            async: false,
            success: function(data, status){
            },
            error: function(){ }
        });
        */
        
        initContent();
    }
}

function check_loading_mobile() {
    if ($.mobile) {
        clearInterval(window.interval_check_loading_mobile);
        $.mobile.defaultHomeScroll = 0;
        $.mobile.ajaxLinksEnabled = false;
        $.mobile.initializePage();
        $("#status").live("pageshow",function(){
            $.mobile.loadPage("#status");
            $.mobile.loadPage("#info");
            $.mobile.loadPage("#phase_0");
            $.mobile.loadPage("#phase_1");
            $.mobile.loadPage("#phase_2");
            $.mobile.loadPage("#phase_3");
            $.mobile.loadPage("#content");
            $.mobile.loadPage("#notes");
            $.mobile.loadPage("#contacts");
            //$.mobile.loadPage("#tip");
            $.mobile.loadPage("#tip", {role: 'dialog'});
        });
        $.mobile.changePage('#status', {
            transition: "slide",
            reverse: false
        });
        
    }
}


function check_loading() {
    if (window.loadsteps == window.loadstepsDone) {
    	setLoading(80);
        $('#loading_info p').html('generiere Struktur...');
        clearInterval(window.interval_check_loading);
        initDisplay();
    }
}

function addtocalender(name, date, note) {
    if (window.checker.android) {
        var myArray = date.split('.');
        window.createevent(name, parseInt(myArray[2]), parseInt(myArray[1])-1, parseInt(myArray[0]), note, function(data) {
            navigator.notification.alert(
                    window.texts.datedia_message, 
                    function() { }, 
                    window.texts.datedia_topic, 
                    window.texts.datedia_ok 
            );
        });
        /* mögliche alternativen wie webintent oder webinterface
        var android_version = parseFloat(device.version);
        if (android_version >= 4) {
            
            window.createevent('test','datum', function(data) {
                alert(data);
            });
            
            var myArray = date.split('.');
            var myDate = new Date(myArray[2] + "-" + myArray[1] + "-" + myArray[0] + "T08:00:00+0000");
            var beginTime = myDate.getTime();
            var endTime = myDate.getTime();
            
            var extras = {};
            extras['beginTime'] = beginTime;
            extras['allDay'] = false;
            //extras['hasAlarm'] = 0;
            extras['rrule'] = 'FREQ=YEARLY';
            extras['endTime'] = endTime;
            extras['title'] = name;
            window.plugins.webintent.startActivity({
                action: 'android.intent.action.EDIT',
                type: 'vnd.android.cursor.item/event', 
                extras: extras 
              }, 
              function() {
                  alert("angelegt");
              }, 
              function() {
                alert('Failed ');
              }
            ); 
            
        } else {
            var callink = 'http://www.google.com/calendar/gp#~calendar:view=e&bm=1&action=TEMPLATE&text=' + encodeURI(name) + '&dates=';
            var myArray = date.split('.');
            callink = callink  + myArray[2] + myArray[1] + myArray[0] + 'T080000Z/' + myArray[2] + myArray[1] + myArray[0] + 'T100000Z&details=&location=&trp=false'
            window.plugins.childBrowser.showWebPage(callink, { showLocationBar: true });
        }
    */
    } 
    if ((window.checker.iphone) || (window.checker.ipad)) {
        var myArray = date.split('.');
        var title= name;
        var location = "";
        var notes = note;
        var startDate = myArray[2] + "-" + myArray[1] + "-" + myArray[0] + " 08:30:00";
        var endDate = myArray[2] + "-" + myArray[1] + "-" + myArray[0] + " 10:00:00";
        var calendarName = "Work"; 
        window.plugins.calendarPlugin.createEvent(title,location,notes,startDate,endDate, calendarName);
    }
}

function touchScrollElement(element){
    if(isTouchDevice()){
        var scrollStartPosY=0;
        var scrollStartPosX=0;
        element.addEventListener("touchstart", function(event) {
            scrollStartPosY=this.scrollTop+event.touches[0].pageY;
            scrollStartPosX=this.scrollLeft+event.touches[0].pageX;
        },false);
        element.addEventListener("touchmove", function(event) {
            if ((this.scrollTop < this.scrollHeight-this.offsetHeight &&
                this.scrollTop+event.touches[0].pageY < scrollStartPosY-5) ||
            (this.scrollTop != 0 && this.scrollTop+event.touches[0].pageY > scrollStartPosY+5))
                event.preventDefault();
            if ((this.scrollLeft < this.scrollWidth-this.offsetWidth &&
                this.scrollLeft+event.touches[0].pageX < scrollStartPosX-5) ||
            (this.scrollLeft != 0 && this.scrollLeft+event.touches[0].pageX > scrollStartPosX+5))
                event.preventDefault();
            this.scrollTop=scrollStartPosY-event.touches[0].pageY;
            this.scrollLeft=scrollStartPosX-event.touches[0].pageX;
        },false);
    }
}

$(window).bind( 'orientationchange', function(e){
    setTimeout(function() {
        if (window.tablet) {
            tabletHeader();
        }
        renderStatus();
        $('#note_content').css('height', (window.innerHeight - (window.innerWidth/5) - 110) +'px');
        if (window.iscroll) {
            setTimeout(function() {
                //$("#content .ui-content").jqmData('iscrollview').iscroll.refresh();
            }, 500 );    
        } 
    }, 500 ); 
});

function loadJs(src, callback) {
    var s = document.createElement('script');
    document.getElementsByTagName('head')[0].appendChild(s);
    s.onload = function() {
        if (typeof callback == "function") callback();
        callback = null;
    }
    s.onreadystatechange = function() {
        if (s.readyState == 4 || s.readyState == "complete") {
            if (typeof callback == "function") callback();
            callback = null; 
        }
    }
    s.src = src;
}

function tabletHeader() {
    $('#status .center-wrapper').html('<img src="img/logo_big.png" height="' + (100/1024*window.innerHeight) + '" alt="WKO" style="margin: 0 auto;">');
    $('#status .center-wrapper').css('height', (150/1024*window.innerHeight) + 'px');
    $('#status .center-wrapper').css('padding', (50/1024*window.innerHeight) + 'px 0 0 0');
}

function renderStatus() {
	$('#status_sign').css('width', (window.innerWidth) + 'px');
	var temp = 34;
	if (window.tablet) {
		temp = temp + (4*81);
		temp = temp + (200/1024*window.innerHeight);
	} else {
		temp = temp + (4*45);
		temp = temp + 44;
	}
	temp = window.innerHeight - temp - 45;
	$('#status_sign').css('height', temp + 'px');
    if (window.tablet) {
        //$('#status .ui-content').css('top', (temp + (200/1024*window.innerHeight)) + 'px');
        $('#status_content_container').css('top', (temp + (200/1024*window.innerHeight)) + 'px');
        $('#status_sign').css('top', (200/1024*window.innerHeight) + 'px');
        $('#status_content_container').css('height', (window.innerHeight - (temp + (200/1024*window.innerHeight))) + 'px');
    } else {
        //$('#status .ui-content').css('top', (temp + 44) + 'px');
        $('#status_content_container').css('top', (temp + 44) + 'px');
        $('#status_sign').css('top', '43px');
        $('#status_content_container').css('height', (window.innerHeight - (temp + 44)) + 'px');
    }
    
    if (temp <= 210) {
        var size = 'half';
    } else {
        var size = 'full';
    }
    if (window.statuss.main == 0) {
        $('#status_sign').css('background', 'url(img/status/zero_' + size + '.png) center top no-repeat');
        $('#status_sign').css('background-size', 'auto 100%');
        $('#status_front').css('display', 'none');
        $('#status_full').css('display', 'none');
        $('#status_canvas').css('display', 'none');
    } else {
        if (window.statuss.main == 100) {
            $('#status_sign').css('background', 'url(img/status/background_' + size + '.png) center top no-repeat');
            $('#status_sign').css('background-size', 'auto 100%');
            $('#status_front').css('display', 'block');
            $('#status_front').css('background', 'url(img/status/front_' + size + '.png) center top no-repeat');
            $('#status_front').css('background-size', 'auto 100%');
            $('#status_full').css('display', 'block');
            $('#status_full').css('background', 'url(img/status/circle_' + size + '.png) center top no-repeat');
            $('#status_full').css('background-size', 'auto 100%');
            $('#status_canvas').css('display', 'none');
        } else {
            $('#status_sign').css('background', 'url(img/status/background_' + size + '.png) center top no-repeat');
            $('#status_sign').css('background-size', 'auto 100%');
            $('#status_front').css('display', 'block');
            $('#status_front').css('background', 'url(img/status/front_' + size + '.png) center top no-repeat');
            $('#status_front').css('background-size', 'auto 100%');
            $('#status_full').css('display', 'none');
            $('#status_canvas').css('display', 'block');
            //$('#status_canvas').css('padding', '0 0 0 ' + Math.round((window.innerWidth - temp)/2) + 'px');
            $('#status_circle').css('margin-left', Math.round((window.innerWidth - temp)/2) + 'px');
            $('#status_circle').width(temp).height(temp);
            var canvas = document.getElementById("status_circle");
            canvas.width  = temp;
            canvas.height = temp;
            var ctx = canvas.getContext("2d");
            if (ctx.clear) {
                ctx.clear();
            } else {
                ctx.clearRect(0, 0, temp, temp);
            }
            var canvas_size = [canvas.width, canvas.height];
            var radius = Math.round(133/(420/temp));
            var center = [Math.round(209/(420/temp)), Math.round(202/(420/temp))];
            ctx.beginPath();
            ctx.moveTo(center[0], center[1]); 
            ctx.arc(  
                center[0],
                center[1],
                radius,
                Math.PI * (- 0.5 + 2 * 0),
                Math.PI * (- 0.5 + 2 * (((window.statuss.main*3.6)*(1/360)) + (1/1200)  )),
                false
            );
            ctx.lineTo(center[0], center[1]);
            ctx.closePath();
            
            ctx.fillStyle = "rgb(255,1,0)";
            if (window.statuss.main >= 10) { ctx.fillStyle = "rgb(253,57,0)"; }
            if (window.statuss.main >= 20) { ctx.fillStyle = "rgb(252,97,0)"; }
            if (window.statuss.main >= 30) { ctx.fillStyle = "rgb(251,126,0)"; }
            if (window.statuss.main >= 40) { ctx.fillStyle = "rgb(252,161,0)"; }
            if (window.statuss.main >= 50) { ctx.fillStyle = "rgb(253,195,0)"; }
            if (window.statuss.main >= 60) { ctx.fillStyle = "rgb(254,231,0)"; }
            if (window.statuss.main >= 70) { ctx.fillStyle = "rgb(237,244,0)"; }
            if (window.statuss.main >= 80) { ctx.fillStyle = "rgb(194,239,2)"; }
            if (window.statuss.main >= 90) { ctx.fillStyle = "rgb(133,232,2)"; }
            ctx.fill();
        }
    }
    //titel
    var temp_2 = Math.round(temp / 3.7838)
    $('#status_bar').css('top', Math.round(temp - temp_2) + 'px');
    $('#status_bar').css('height', temp_2 + 'px');
    $('#status_bar .inner').css('background', 'url(img/status/name_' + size + '.png) left top no-repeat');
    $('#status_bar .inner').css('background-size', '100% auto');
    if ((480*temp_2/111) < window.innerWidth)  {
        $('#status_bar .inner').css('background-size', 'auto 100%');
    }
}

function share(option,val) {
    $('#fb_share').unbind('click');
    $('#tw_share').unbind('click');
    $('#gp_share').unbind('click');
    if (option == 'phase') {
        /*
        window.fblink = 'https://www.facebook.com/dialog/feed?app_id=' + config.facebook_apiid +
            '&link=' + config.facebook_sharelink +
            '&picture=' + config.facebook_picurl +
            '&name=' + window.texts.facebook_topic +
            '&caption=' + window.texts.facebook_caption +
            '&description=' + window.texts.facebook_description +
            '&redirect_uri=' + document.URL;
        */
        //window.fblink = 'https://www.facebook.com/dialog/feed?app_id=458358780877780&link=https://developers.facebook.com/docs/reference/dialogs/&picture=http://fbrell.com/f8.jpg&name=Facebook%20Dialogs&caption=Reference%20Documentation&description=Using%20Dialogs%20to%20interact%20with%20users.&redirect_uri=https://mighty-lowlands-6381.herokuapp.com/';
        
        $('#fb_share').click(function() {
            window.plugins.childBrowser.showWebPage("http://m.facebook.com/sharer.php?u=" + encodeURI(config.facebook_sharelink) + "&t=" + encodeURI(config.facebook_sharetitle), { showLocationBar: true });
        });
        $('#tw_share').click(function() {
            window.plugins.childBrowser.showWebPage("https://mobile.twitter.com/compose/tweet?status=" + encodeURI(config.twitter_sharelink), { showLocationBar: true });
        });
        $('#gp_share').click(function() {
            window.plugins.childBrowser.showWebPage("https://plus.google.com/share?url=" + encodeURI(config.googlep_sharelink), { showLocationBar: true });
        });
        $('#share .ui-content p').html(window.texts.share_content_phase);
        $.mobile.changePage('#share', {
            transition: "none",
            role: 'dialog',
            reverse: false
        });
    }
    if (option == 'todo') {
        $('#fb_share').click(function() {
            window.plugins.childBrowser.showWebPage("http://m.facebook.com/sharer.php?u=" + encodeURI(config.facebook_sharelink) + "&t=" + encodeURI(config.facebook_sharetitle), { showLocationBar: true });
        });
        $('#tw_share').click(function() {
            window.plugins.childBrowser.showWebPage("https://mobile.twitter.com/compose/tweet?status=" + encodeURI(config.twitter_sharelink), { showLocationBar: true });
        });
        $('#gp_share').click(function() {
            window.plugins.childBrowser.showWebPage("https://plus.google.com/share?url=" + encodeURI(config.googlep_sharelink), { showLocationBar: true });
        });
        $('#share .ui-content p').html(window.texts.share_content_todo);
        $.mobile.changePage('#share', {
            transition: "none",
            role: 'dialog',
            reverse: false
        });
    }
}

function calculateStatus(render) {
    var count = 0;
    var countDone = 0;
    for (n=0;n<4;n++) {
        var temp_count = 0;
        var temp_countDone = 0;
        if (window.items[n].todo.length == 0) {
            window.statuss.phase[n] = 0;
        } else {
            for (m=0;m<window.items[n].todo.length;m++) {
                if (window.items[n].todo[m].id == '0') {} else {
                    var mandatory = 0;
                    var data = window.localStorage.getItem("mandatory_" + window.items[n].todo[m].id);
                    if (data) {
                        if (data == '1') {
                            mandatory = 1;
                        }
                    } 
                    if (mandatory == 0) {
                        $('#phase_buttoncontainer_' + window.items[n].todo[m].id).css('display', 'block');
                        $('#todobutton_' + window.items[n].todo[m].id + '_cont').removeClass('ui-btn-up-d').addClass('ui-btn-up-c');
                        temp_count = temp_count + 1;
                        var data = window.localStorage.getItem("status_" + window.items[n].todo[m].id);
                        if (data) {
                            if (data == '2') {
                                temp_countDone = temp_countDone + 1;
                                $('#todobutton_' + window.items[n].todo[m].id + '_cont').removeClass('phase_red').removeClass('phase_yellow').addClass('phase_green');
                            } else if (data == '1') {
                                $('#todobutton_' + window.items[n].todo[m].id + '_cont').removeClass('phase_green').removeClass('phase_red').addClass('phase_yellow');
                            } else if (data == '0') {
                                $('#todobutton_' + window.items[n].todo[m].id + '_cont').removeClass('phase_green').removeClass('phase_yellow').addClass('phase_red');
                            }
                        } else {
                            $('#todobutton_' + window.items[n].todo[m].id + '_cont').removeClass('phase_green').removeClass('phase_yellow').addClass('phase_red');
                        }
                        if ($('#todolink_' + window.items[n].todo[m].id + ' p').html() != window.items[n].todo[m].desc_button) {
                            $('#todolink_' + window.items[n].todo[m].id + ' p').html(window.items[n].todo[m].desc_button);
                        }
                    } else {
                        $('#phase_buttoncontainer_' + window.items[n].todo[m].id).css('display', 'none');
                        $('#todobutton_' + window.items[n].todo[m].id + '_cont').removeClass('ui-btn-up-c').addClass('ui-btn-up-d');
                        $('#todobutton_' + window.items[n].todo[m].id + '_cont').removeClass('phase_green').removeClass('phase_yellow').removeClass('phase_red');
                        if ($('#todolink_' + window.items[n].todo[m].id + ' p').html() != window.texts.todo_notmine) {
                            $('#todolink_' + window.items[n].todo[m].id + ' p').html(window.texts.todo_notmine);
                        }
                    }
                    
                }
            }
            if (temp_count == 0) {
                window.statuss.phase[n] = 0;
            } else {
                window.statuss.phase[n] = Math.round(temp_countDone / (temp_count / 100));
            }
            if (n<3) {
                count = count + temp_count;
                countDone = countDone + temp_countDone;
            }
        }
        $('#phasebutton_' + n + '_count').html('&nbsp;' + window.statuss.phase[n] + '%');
        if (window.statuss.phase[n] < 20) {
            //rot
            $('#phasebutton_' + n + '_cont').removeClass('phase_green').removeClass('phase_yellow').addClass('phase_red');
        } else if (window.statuss.phase[n] > 79) {
            //grün
            $('#phasebutton_' + n + '_cont').removeClass('phase_red').removeClass('phase_yellow').addClass('phase_green');
        } else {
            //gelb
            $('#phasebutton_' + n + '_cont').removeClass('phase_green').removeClass('phase_red').addClass('phase_yellow');
        }
    }
    window.statuss.main = Math.round(countDone / (count / 100));
	if (render == true) {
	    renderStatus()
	}
}

function refreshNotes() {
    var notes_phase = [0,0,0,0];
    for (n=0;n<window.items.length;n++) {
        for (m=0;m<window.items[n].todo.length;m++) {
            if (window.items[n].todo[m].id == '0') {
            } else {
                var data = window.localStorage.getItem("note_" + window.items[n].todo[m].id);
                if (data) {
                    data = nl2br(data);
                    $('#notes_todo_' + window.items[n].todo[m].id + ' p').html(data);
                    $('#notes_todo_' + window.items[n].todo[m].id).css('display', 'block');
                    $('#todonote_' + window.items[n].todo[m].id).addClass('todonote_on');
                    notes_phase[n] = 1;
                } else {
                    $('#note_content').val('');
                    $('#notes_todo_' + window.items[n].todo[m].id).css('display', 'none');
                    $('#todonote_' + window.items[n].todo[m].id).removeClass('todonote_on');
                }
            }
        }
    }
    var temp = 0;
    for (n=0;n<4;n++) {
        if (notes_phase[n] == 1) {
            $('#notes_topic_todo_' + n).css('display', 'block');
            temp = 1;
        } else {
            $('#notes_topic_todo_' + n).css('display', 'none');
        }
    }
    if (temp == 1) {
        $('#wko_notes_empty').css('display', 'none');
    } else {
        $('#wko_notes_empty').css('display', 'block');
    }
    $('#notes div[data-role="collapsible"]').bind('expand', function () {
        if (window.iscroll) {
            setTimeout(function() {
                $("#notes .ui-content").jqmData('iscrollview').iscroll.refresh();
            }, 500 );    
        } 
    }).bind('collapse', function () {
        if (window.iscroll) {
            setTimeout(function() {
                $("#notes .ui-content").jqmData('iscrollview').iscroll.refresh();
            }, 500 );    
        } 
    });
}

(function(b){function n(a,c){function m(a){return b.isArray(f.readonly)?(a=b(".dwwl",s).index(a),f.readonly[a]):f.readonly}function o(a){var b="",c=f.height,o;for(o in M[a])b+='<li class="dw-v" data-val="'+o+'" style="height:'+c+"px;line-height:"+c+'px;">'+M[a][o]+"</li>";return b}function y(){var a=document.body,b=document.documentElement;return Math.max(a.scrollHeight,a.offsetHeight,b.clientHeight,b.scrollHeight,b.offsetHeight)}function O(a){h=b("li.dw-v",a).eq(0).index();d=b("li.dw-v",a).eq(-1).index();
t=b("ul",s).index(a);e=f.height;p=g}function n(a){var b=f.headerText;return b?"function"==typeof b?b.call(D,a):b.replace(/{value}/i,a):""}function Q(){g.temp=J&&null!==g.val&&g.val!=a.val()||null===g.values?f.parseValue(a.val()?a.val():"",g):g.values.slice(0);g.setValue(!0)}function r(a,c,o,d,y){f.validate.call(D,s,o,a);b(".dww ul",s).each(function(f){var d=b(this),e=b('li[data-val="'+g.temp[f]+'"]',d),d=e.index();if(!e.hasClass("dw-v")){for(var j=e,h=0,k=0;j.prev().length&&!j.hasClass("dw-v");)j=
j.prev(),h++;for(;e.next().length&&!e.hasClass("dw-v");)e=e.next(),k++;(k<h&&k&&1==!y||!h||!j.hasClass("dw-v")||1==y)&&e.hasClass("dw-v")?d+=k:(e=j,d-=h);g.temp[f]=e.attr("data-val")}e=f==o||void 0===o;g.scroll(b(this),d,e?a:0.2,c,f)});g.change(d)}function B(){function c(){b(".dwc",s).each(function(){"none"!=b(this).css("display")&&(k=b(this).outerWidth(!0),d+=k,o=k>o?k:o)});k=d>e?o:d;k=b(".dwwr",s).width(k+1).outerWidth();p=h.outerHeight()}if("inline"!=f.display){var d=0,o=0,e=b(window).width(),
g=window.innerHeight,j=b(window).scrollTop(),h=b(".dw",s),k,i,m,p,l,q={},A,u=void 0===f.anchor?a:f.anchor,g=g?g:b(window).height();if("modal"==f.display)c(),m=(e-k)/2,i=j+(g-p)/2;else if("bubble"==f.display){c();var r=u.offset(),z=b(".dw-arr",s),v=b(".dw-arrw-i",s),n=h.outerWidth();l=u.outerWidth();m=r.left-(h.outerWidth(!0)-l)/2;m=m>e-n?e-(n+20):m;m=0<=m?m:20;i=r.top-(h.outerHeight()+3);i<j||r.top>j+g?(h.removeClass("dw-bubble-top").addClass("dw-bubble-bottom"),i=r.top+u.outerHeight()+3,A=i+h.outerHeight(!0)>
j+g||r.top>j+g):h.removeClass("dw-bubble-bottom").addClass("dw-bubble-top");i=i>=j?i:j;j=r.left+l/2-(m+(n-v.outerWidth())/2);j>v.outerWidth()&&(j=v.outerWidth());z.css({left:j})}else q.width="100%","top"==f.display?i=j:"bottom"==f.display&&(i=j+g-h.outerHeight(),i=0<=i?i:0);q.top=i;q.left=m;h.css(q);b(".dwo, .dw-persp").height(0).height(y());A&&b(window).scrollTop(i+h.outerHeight(!0)-g)}}function U(a){var b=+a.data("pos")+1;q(a,b>d?h:b,1)}function F(a){var b=+a.data("pos")-1;q(a,b<h?d:b,2)}var g=
this,D=a,a=b(D),P,R,f=b.extend({},G),S,s,M=[],N={},J=a.is("input"),K=!1;g.enable=function(){f.disabled=!1;J&&a.prop("disabled",!1)};g.disable=function(){f.disabled=!0;J&&a.prop("disabled",!0)};g.scroll=function(a,b,c,d,o){var e=(S-b)*f.height;a.attr("style",(c?I+"-transition:all "+c.toFixed(1)+"s ease-out;":"")+(L?I+"-transform:translate3d(0,"+e+"px,0);":"top:"+e+"px;"));clearInterval(N[o]);if(c&&void 0!==d){var g=0;N[o]=setInterval(function(){g+=0.1;a.data("pos",Math.round((b-d)*Math.sin(g/c*(Math.PI/
2))+d));g>=c&&(clearInterval(N[o]),a.data("pos",b).closest(".dwwl").removeClass("dwa"))},100)}else a.data("pos",b)};g.setValue=function(b,c,d,o){o||(g.values=g.temp.slice(0));K&&b&&r(d);c&&(b=f.formatResult(g.temp),g.val=b,J&&a.val(b).trigger("change"))};g.validate=function(a,b,c,d){r(a,b,c,!0,d)};g.change=function(a){var c=f.formatResult(g.temp);"inline"==f.display?g.setValue(!1,a):b(".dwv",s).html(n(c));a&&f.onChange.call(D,c,g)};g.hide=function(c){if(!1===f.onClose.call(D,g.val,g))return!1;b(".dwtd").prop("disabled",
!1).removeClass("dwtd");a.blur();s&&("inline"!=f.display&&f.animate&&!c?(b(".dw",s).addClass("dw-"+f.animate+" dw-out"),setTimeout(function(){s.remove();s=null},350)):(s.remove(),s=null),K=!1,b(window).unbind(".dw"))};g.changeWheel=function(){if(s){var a=0,c=arguments.length,d;for(d in f.wheels)for(var e in f.wheels[d]){if(-1<b.inArray(a,arguments)&&(M[a]=f.wheels[d][e],b("ul",s).eq(a).html(o(a)),!--c)){B();r();return}a++}}};g.show=function(c){if(f.disabled||K)return!1;"top"==f.display&&(f.animate=
"slidedown");"bottom"==f.display&&(f.animate="slideup");Q();f.onBeforeShow.call(D,s,g);var d=0,e=f.height,y="",h="",k="";f.animate&&!c&&(h='<div class="dw-persp">',k="</div>",y="dw-"+f.animate+" dw-in");c='<div class="'+f.theme+" dw-"+f.display+'">'+("inline"==f.display?'<div class="dw dwbg dwi"><div class="dwwr">':h+'<div class="dwo"></div><div class="dw dwbg '+y+'"><div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div><div class="dwwr">'+(f.headerText?'<div class="dwv"></div>':
""));for(y=0;y<f.wheels.length;y++){var c=c+('<div class="dwc'+("scroller"!=f.mode?" dwpm":" dwsc")+(f.showLabel?"":" dwhl")+'"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>'),p;for(p in f.wheels[y])M[d]=f.wheels[y][p],c+='<td><div class="dwwl dwrc dwwl'+d+'">'+("scroller"!=f.mode?'<div class="dwwb dwwbp" style="height:'+e+"px;line-height:"+e+'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:'+e+"px;line-height:"+e+'px;"><span>&ndash;</span></div>':"")+'<div class="dwl">'+
p+'</div><div class="dww dwrc" style="height:'+f.rows*e+"px;min-width:"+f.width+'px;"><ul>',c+=o(d),c+='</ul><div class="dwwo"></div></div><div class="dwwol"></div></div></td>',d++;c+="</tr></table></div></div>"}c+=("inline"!=f.display?'<div class="dwbc'+(f.button3?" dwbc-p":"")+'"><span class="dwbw dwb-s"><span class="dwb">'+f.setText+"</span></span>"+(f.button3?'<span class="dwbw dwb-n"><span class="dwb">'+f.button3Text+"</span></span>":"")+'<span class="dwbw dwb-c"><span class="dwb">'+f.cancelText+
"</span></span></div>"+k:'<div class="dwcc"></div>')+"</div></div></div>";s=b(c);r();"inline"!=f.display?s.appendTo("body"):a.is("div")?a.html(s):s.insertAfter(a);K=!0;"inline"!=f.display&&(b(".dwb-s span",s).click(function(){g.hide();g.setValue(false,true);f.onSelect.call(D,g.val,g);return false}),b(".dwb-c span",s).click(function(){g.hide();f.onCancel.call(D,g.val,g);return false}),f.button3&&b(".dwb-n span",s).click(f.button3),f.scrollLock&&s.bind("touchmove",function(a){a.preventDefault()}),b("input,select").each(function(){b(this).prop("disabled")||
b(this).addClass("dwtd")}),b("input,select").prop("disabled",!0),B(),b(window).bind("resize.dw",B));s.delegate(".dwwl","DOMMouseScroll mousewheel",function(a){if(!m(this)){a.preventDefault();var a=a.originalEvent,a=a.wheelDelta?a.wheelDelta/120:a.detail?-a.detail/3:0,c=b("ul",this),d=+c.data("pos"),d=Math.round(d-a);O(c);q(c,d,a<0?1:2)}}).delegate(".dwb, .dwwb",H,function(){b(this).addClass("dwb-a")}).delegate(".dwwb",H,function(a){var c=b(this).closest(".dwwl");if(!m(c)&&!c.hasClass("dwa")){a.preventDefault();
a.stopPropagation();var d=c.find("ul"),o=b(this).hasClass("dwwbp")?U:F;u=true;O(d);clearInterval(i);i=setInterval(function(){o(d)},f.delay);o(d)}}).delegate(".dwwl",H,function(a){a.preventDefault();if(!m(this)&&!u&&f.mode!="clickpick"){j=true;z=b("ul",this);z.closest(".dwwl").addClass("dwa");A=+z.data("pos");O(z);clearInterval(N[t]);C=l(a);x=new Date;w=C;g.scroll(z,A)}});f.onShow.call(D,s,g);P.init(s,g)};g.init=function(d){P=b.extend({defaults:{},init:v},b.scroller.themes[d.theme?d.theme:f.theme]);
R=b.scroller.i18n[d.lang?d.lang:f.lang];b.extend(f,P.defaults,R,c,d);g.settings=f;S=Math.floor(f.rows/2);var o=b.scroller.presets[f.preset];a.unbind(".dw");o&&(o=o.call(D,g),b.extend(f,o,c,d),b.extend(E,o.methods));void 0!==a.data("dwro")&&(D.readOnly=k(a.data("dwro")));K&&g.hide();"inline"==f.display?g.show():(Q(),J&&f.showOnFocus&&(a.data("dwro",D.readOnly),D.readOnly=!0,a.bind("focus.dw",function(){g.show()})))};g.values=null;g.val=null;g.temp=null;g.init(c)}function F(a){for(var b in a)if(void 0!==
B[a[b]])return!0;return!1}function l(a){return a.changedTouches||a.originalEvent&&a.originalEvent.changedTouches?a.originalEvent?a.originalEvent.changedTouches[0].pageY:a.changedTouches[0].pageY:a.pageY}function k(a){return!0===a||"true"==a}function q(a,c,e,o,y){c=c>d?d:c;c=c<h?h:c;a=b("li",a).eq(c);p.temp[t]=a.attr("data-val");p.validate(o?c==y?0.1:Math.abs(0.1*(c-y)):0,y,t,e)}var m={},i,v=function(){},e,h,d,p,r=(new Date).getTime(),j,u,z,t,C,w,x,A,B=document.createElement("modernizr").style,L=F(["perspectiveProperty",
"WebkitPerspective","MozPerspective","OPerspective","msPerspective"])&&"webkitPerspective"in document.documentElement.style,I=function(){var a=["Webkit","Moz","O","ms"],b;for(b in a)if(F([a[b]+"Transform"]))return"-"+a[b].toLowerCase();return""}(),H="touchstart mousedown",G={width:70,height:40,rows:3,delay:300,disabled:!1,readonly:!1,showOnFocus:!0,showLabel:!0,wheels:[],theme:"",headerText:"{value}",display:"modal",mode:"scroller",preset:"",lang:"en-US",setText:"Set",cancelText:"Cancel",scrollLock:!0,
onBeforeShow:v,onShow:v,onClose:v,onSelect:v,onCancel:v,onChange:v,formatResult:function(a){for(var b="",d=0;d<a.length;d++)b+=(0<d?" ":"")+a[d];return b},parseValue:function(a,b){for(var d=b.settings.wheels,a=a.split(" "),o=[],e=0,j=0;j<d.length;j++)for(var h in d[j]){if(void 0!==d[j][h][a[e]])o.push(a[e]);else for(var k in d[j][h]){o.push(k);break}e++}return o},validate:v},E={init:function(a){void 0===a&&(a={});return this.each(function(){this.id||(r+=1,this.id="scoller"+r);m[this.id]=new n(this,
a)})},enable:function(){return this.each(function(){var a=m[this.id];a&&a.enable()})},disable:function(){return this.each(function(){var a=m[this.id];a&&a.disable()})},isDisabled:function(){var a=m[this[0].id];if(a)return a.settings.disabled},option:function(a,b){return this.each(function(){var d=m[this.id];if(d){var o={};"object"===typeof a?o=a:o[a]=b;d.init(o)}})},setValue:function(a,b,d,o){return this.each(function(){var e=m[this.id];e&&(e.temp=a,e.setValue(!0,b,d,o))})},getInst:function(){return m[this[0].id]},
getValue:function(){var a=m[this[0].id];if(a)return a.values},show:function(){var a=m[this[0].id];if(a)return a.show()},hide:function(){return this.each(function(){var a=m[this.id];a&&a.hide()})},destroy:function(){return this.each(function(){var a=m[this.id];a&&(a.hide(),b(this).unbind(".dw"),delete m[this.id],b(this).is("input")&&(this.readOnly=k(b(this).data("dwro"))))})}};b(document).bind("touchmove mousemove",function(a){j&&(a.preventDefault(),w=l(a),a=A+(C-w)/e,a=a>d+1?d+1:a,a=a<h-1?h-1:a,p.scroll(z,
a))});b(document).bind("touchend mouseup",function(a){if(j){a.preventDefault();var c=new Date-x,a=A+(C-w)/e,a=a>d+1?d+1:a,a=a<h-1?h-1:a;300>c?(c=(w-C)/c,c=c*c/0.0012,0>w-C&&(c=-c)):c=w-C;q(z,Math.round(A-c/e),0,!0,Math.round(a));j=!1;z=null}u&&(clearInterval(i),u=!1);b(".dwb-a").removeClass("dwb-a")});b.fn.scroller=function(a){if(E[a])return E[a].apply(this,Array.prototype.slice.call(arguments,1));if("object"===typeof a||!a)return E.init.apply(this,arguments);b.error("Unknown method")};b.scroller=
{setDefaults:function(a){b.extend(G,a)},presets:{},themes:{},i18n:{}}})(jQuery);(function(b){b.scroller.i18n.de=b.extend(b.scroller.i18n.de,{setText:"OK",cancelText:"Abbrechen"})})(jQuery);(function(b){var n=new Date,F={dateFormat:"mm/dd/yy",dateOrder:"mmddy",timeWheels:"hhiiA",timeFormat:"hh:ii A",startYear:n.getFullYear()-100,endYear:n.getFullYear()+1,monthNames:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),monthNamesShort:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),dayNames:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),dayNamesShort:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),shortYearCutoff:"+10",
monthText:"Month",dayText:"Day",yearText:"Year",hourText:"Hours",minuteText:"Minutes",secText:"Seconds",ampmText:"&nbsp;",nowText:"Now",showNow:!1,stepHour:1,stepMinute:1,stepSecond:1,separator:" "},n=function(l){function k(a,b,d){return void 0!==j[b]?+a[j[b]]:void 0!==d?d:B[u[b]]?B[u[b]]():u[b](B)}function q(a,b){return Math.floor(a/b)*b}function m(a){var b=k(a,"h",0);return new Date(k(a,"y"),k(a,"m"),k(a,"d",1),k(a,"ap")?b+12:b,k(a,"i",0),k(a,"s",0))}var i=b(this),v={},e;if(i.is("input")){switch(i.attr("type")){case "date":e=
"yy-mm-dd";break;case "datetime":e="yy-mm-ddTHH:ii:ssZ";break;case "datetime-local":e="yy-mm-ddTHH:ii:ss";break;case "month":e="yy-mm";v.dateOrder="mmyy";break;case "time":e="HH:ii:ss"}var h=i.attr("min"),i=i.attr("max");h&&(v.minDate=b.scroller.parseDate(e,h));i&&(v.maxDate=b.scroller.parseDate(e,i))}var d=b.extend({},F,v,l.settings),p=0,v=[],r=[],j={},u={y:"getFullYear",m:"getMonth",d:"getDate",h:function(a){a=a.getHours();a=x&&12<=a?a-12:a;return q(a,L)},i:function(a){return q(a.getMinutes(),I)},
s:function(a){return q(a.getSeconds(),H)},ap:function(a){return w&&11<a.getHours()?1:0}},i=d.preset,n=d.dateOrder,t=d.timeWheels,C=n.match(/D/),w=t.match(/a/i),x=t.match(/h/),A="datetime"==i?d.dateFormat+d.separator+d.timeFormat:"time"==i?d.timeFormat:d.dateFormat,B=new Date,L=d.stepHour,I=d.stepMinute,H=d.stepSecond,G=d.minDate?d.minDate:new Date(d.startYear,0,1),E=d.maxDate?d.maxDate:new Date(d.endYear,11,31,23,59,59);e=e?e:A;if(i.match(/date/i)){b.each(["y","m","d"],function(a,b){a=n.search(RegExp(b,
"i"));-1<a&&r.push({o:a,v:b})});r.sort(function(a,b){return a.o>b.o?1:-1});b.each(r,function(a,b){j[b.v]=a});for(var h={},a=0;3>a;a++)if(a==j.y){p++;h[d.yearText]={};for(var c=G.getFullYear(),T=E.getFullYear();c<=T;c++)h[d.yearText][c]=n.match(/yy/i)?c:(c+"").substr(2,2)}else if(a==j.m){p++;h[d.monthText]={};for(c=0;12>c;c++)h[d.monthText][c]=n.match(/MM/)?d.monthNames[c]:n.match(/M/)?d.monthNamesShort[c]:n.match(/mm/)&&9>c?"0"+(c+1):c+1}else if(a==j.d){p++;h[d.dayText]={};for(c=1;32>c;c++)h[d.dayText][c]=
n.match(/dd/i)&&10>c?"0"+c:c}v.push(h)}if(i.match(/time/i)){r=[];b.each(["h","i","s"],function(a,b){a=t.search(RegExp(b,"i"));-1<a&&r.push({o:a,v:b})});r.sort(function(a,b){return a.o>b.o?1:-1});b.each(r,function(a,b){j[b.v]=p+a});h={};for(a=p;a<p+3;a++)if(a==j.h){p++;h[d.hourText]={};for(c=0;c<(x?12:24);c+=L)h[d.hourText][c]=x&&0==c?12:t.match(/hh/i)&&10>c?"0"+c:c}else if(a==j.i){p++;h[d.minuteText]={};for(c=0;60>c;c+=I)h[d.minuteText][c]=t.match(/ii/)&&10>c?"0"+c:c}else if(a==j.s){p++;h[d.secText]=
{};for(c=0;60>c;c+=H)h[d.secText][c]=t.match(/ss/)&&10>c?"0"+c:c}w&&(j.ap=p++,i=t.match(/A/),h[d.ampmText]={"0":i?"AM":"am",1:i?"PM":"pm"});v.push(h)}l.setDate=function(a,b,d,c){for(var e in j)this.temp[j[e]]=a[u[e]]?a[u[e]]():u[e](a);this.setValue(!0,b,d,c)};l.getDate=function(a){return m(a)};return{button3Text:d.showNow?d.nowText:void 0,button3:d.showNow?function(){l.setDate(new Date,!1,0.3,!0)}:void 0,wheels:v,headerText:function(){return b.scroller.formatDate(A,m(l.temp),d)},formatResult:function(a){return b.scroller.formatDate(e,
m(a),d)},parseValue:function(a){var c=new Date,h=[];try{c=b.scroller.parseDate(e,a,d)}catch(k){}for(var i in j)h[j[i]]=c[u[i]]?c[u[i]]():u[i](c);return h},validate:function(a){var c=l.temp,e={y:G.getFullYear(),m:0,d:1,h:0,i:0,s:0,ap:0},h={y:E.getFullYear(),m:11,d:31,h:q(x?11:23,L),i:q(59,I),s:q(59,H),ap:1},i=!0,m=!0;b.each("y,m,d,ap,h,i,s".split(","),function(p,l){if(j[l]!==void 0){var q=e[l],g=h[l],A=31,r=k(c,l),v=b("ul",a).eq(j[l]),f,t;if(l=="d"){f=k(c,"y");t=k(c,"m");g=A=32-(new Date(f,t,32)).getDate();
C&&b("li",v).each(function(){var a=b(this),c=a.data("val"),e=(new Date(f,t,c)).getDay(),c=n.replace(/[my]/gi,"").replace(/dd/,c<10?"0"+c:c).replace(/d/,c);a.html(c.match(/DD/)?c.replace(/DD/,d.dayNames[e]):c.replace(/D/,d.dayNamesShort[e]))})}i&&G&&(q=G[u[l]]?G[u[l]]():u[l](G));m&&E&&(g=E[u[l]]?E[u[l]]():u[l](E));if(l!="y"){var s=b('li[data-val="'+q+'"]',v).index(),w=b('li[data-val="'+g+'"]',v).index();b("li",v).removeClass("dw-v").slice(s,w+1).addClass("dw-v");l=="d"&&b("li",v).removeClass("dw-h").slice(A).addClass("dw-h")}r<
q&&(r=q);r>g&&(r=g);i&&(i=r==q);m&&(m=r==g);if(d.invalid&&l=="d"){var B=[];d.invalid.dates&&b.each(d.invalid.dates,function(a,b){b.getFullYear()==f&&b.getMonth()==t&&B.push(b.getDate()-1)});if(d.invalid.daysOfWeek){var x=(new Date(f,t,1)).getDay();b.each(d.invalid.daysOfWeek,function(a,b){for(var c=b-x;c<A;c=c+7)c>=0&&B.push(c)})}d.invalid.daysOfMonth&&b.each(d.invalid.daysOfMonth,function(a,b){b=(b+"").split("/");b[1]?b[0]-1==t&&B.push(b[1]-1):B.push(b[0]-1)});b.each(B,function(a,c){b("li",v).eq(c).removeClass("dw-v")})}c[j[l]]=
r}})},methods:{getDate:function(a){var c=b(this).scroller("getInst");if(c)return c.getDate(a?c.temp:c.values)},setDate:function(a,c,d,e){void 0==c&&(c=!1);return this.each(function(){var j=b(this).scroller("getInst");j&&j.setDate(a,c,d,e)})}}}};b.scroller.presets.date=n;b.scroller.presets.datetime=n;b.scroller.presets.time=n;b.scroller.formatDate=function(l,k,q){if(!k)return null;for(var q=b.extend({},F,q),m=function(b){for(var e=0;d+1<l.length&&l.charAt(d+1)==b;)e++,d++;return e},i=function(b,d,
e){d=""+d;if(m(b))for(;d.length<e;)d="0"+d;return d},n=function(b,d,e,h){return m(b)?h[d]:e[d]},e="",h=!1,d=0;d<l.length;d++)if(h)"'"==l.charAt(d)&&!m("'")?h=!1:e+=l.charAt(d);else switch(l.charAt(d)){case "d":e+=i("d",k.getDate(),2);break;case "D":e+=n("D",k.getDay(),q.dayNamesShort,q.dayNames);break;case "o":e+=i("o",(k.getTime()-(new Date(k.getFullYear(),0,0)).getTime())/864E5,3);break;case "m":e+=i("m",k.getMonth()+1,2);break;case "M":e+=n("M",k.getMonth(),q.monthNamesShort,q.monthNames);break;
case "y":e+=m("y")?k.getFullYear():(10>k.getYear()%100?"0":"")+k.getYear()%100;break;case "h":var p=k.getHours(),e=e+i("h",12<p?p-12:0==p?12:p,2);break;case "H":e+=i("H",k.getHours(),2);break;case "i":e+=i("i",k.getMinutes(),2);break;case "s":e+=i("s",k.getSeconds(),2);break;case "a":e+=11<k.getHours()?"pm":"am";break;case "A":e+=11<k.getHours()?"PM":"AM";break;case "'":m("'")?e+="'":h=!0;break;default:e+=l.charAt(d)}return e};b.scroller.parseDate=function(l,k,q){var m=new Date;if(!l||!k)return m;
for(var k="object"==typeof k?k.toString():k+"",i=b.extend({},F,q),n=i.shortYearCutoff,q=m.getFullYear(),e=m.getMonth()+1,h=m.getDate(),d=-1,p=m.getHours(),m=m.getMinutes(),r=0,j=-1,u=!1,z=function(b){(b=x+1<l.length&&l.charAt(x+1)==b)&&x++;return b},t=function(b){z(b);b=k.substr(w).match(RegExp("^\\d{1,"+("@"==b?14:"!"==b?20:"y"==b?4:"o"==b?3:2)+"}"));if(!b)return 0;w+=b[0].length;return parseInt(b[0],10)},C=function(b,d,e){b=z(b)?e:d;for(d=0;d<b.length;d++)if(k.substr(w,b[d].length).toLowerCase()==
b[d].toLowerCase())return w+=b[d].length,d+1;return 0},w=0,x=0;x<l.length;x++)if(u)"'"==l.charAt(x)&&!z("'")?u=!1:w++;else switch(l.charAt(x)){case "d":h=t("d");break;case "D":C("D",i.dayNamesShort,i.dayNames);break;case "o":d=t("o");break;case "m":e=t("m");break;case "M":e=C("M",i.monthNamesShort,i.monthNames);break;case "y":q=t("y");break;case "H":p=t("H");break;case "h":p=t("h");break;case "i":m=t("i");break;case "s":r=t("s");break;case "a":j=C("a",["am","pm"],["am","pm"])-1;break;case "A":j=C("A",
["am","pm"],["am","pm"])-1;break;case "'":z("'")?w++:u=!0;break;default:w++}100>q&&(q+=(new Date).getFullYear()-(new Date).getFullYear()%100+(q<=("string"!=typeof n?n:(new Date).getFullYear()%100+parseInt(n,10))?0:-100));if(-1<d){e=1;h=d;do{i=32-(new Date(q,e-1,32)).getDate();if(h<=i)break;e++;h-=i}while(1)}p=new Date(q,e-1,h,-1==j?p:j&&12>p?p+12:!j&&12==p?0:p,m,r);if(p.getFullYear()!=q||p.getMonth()+1!=e||p.getDate()!=h)throw"Invalid date";return p}})(jQuery);(function(b){b.scroller.i18n.de=b.extend(b.scroller.i18n.de,{dateFormat:"dd.mm.yy",dateOrder:"ddmmyy",dayNames:"Sonntag,Montag,Dienstag,Mittwoch,Donnerstag,Freitag,Samstag".split(","),dayNamesShort:"So,Mo,Di,Mi,Do,Fr,Sa".split(","),dayText:"Tag",hourText:"Stunde",minuteText:"Minuten",monthNames:"Januar,Februar,M\u00e4rz,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember".split(","),monthNamesShort:"Jan,Feb,M\u00e4r,Apr,Mai,Jun,Jul,Aug,Sep,Okt,Nov,Dez".split(","),monthText:"Monat",secText:"Sekunden",
timeFormat:"HH:ii",timeWheels:"HHii",yearText:"Jahr",nowText:"Jetzt"})})(jQuery);(function(b){b.scroller.themes.jqm={defaults:{jqmBody:"c",jqmHeader:"b",jqmWheel:"d",jqmClickPick:"c",jqmSet:"b",jqmCancel:"c"},init:function(n,F){var l=F.settings;b(".dw",n).removeClass("dwbg").addClass("ui-overlay-shadow ui-corner-all ui-body-a");b(".dwb-s span",n).attr("data-role","button").attr("data-theme",l.jqmSet);b(".dwb-n span",n).attr("data-role","button").attr("data-theme",l.jqmCancel);b(".dwb-c span",n).attr("data-role","button").attr("data-theme",l.jqmCancel);b(".dwwb",n).attr("data-role",
"button").attr("data-theme",l.jqmClickPick);b(".dwv",n).addClass("ui-header ui-bar-"+l.jqmHeader);b(".dwwr",n).addClass("ui-body-"+l.jqmBody);b(".dwpm .dww",n).addClass("ui-body-"+l.jqmWheel);"inline"!=l.display&&b(".dw",n).addClass("pop in");n.trigger("create");b(".dwo",n).click(function(){F.hide()})}}})(jQuery);


/**
 * cordova Web Intent plugin
 * Copyright (c) Boris Smus 2010
 *
 */
var WebIntent = function() { 

};

WebIntent.ACTION_SEND = "android.intent.action.SEND";
WebIntent.ACTION_VIEW= "android.intent.action.VIEW";
WebIntent.EXTRA_TEXT = "android.intent.extra.TEXT";
WebIntent.EXTRA_SUBJECT = "android.intent.extra.SUBJECT";
WebIntent.EXTRA_STREAM = "android.intent.extra.STREAM";
WebIntent.EXTRA_EMAIL = "android.intent.extra.EMAIL";

WebIntent.prototype.startActivity = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'startActivity', [params]);
};

WebIntent.prototype.hasExtra = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'hasExtra', [params]);
};

WebIntent.prototype.getUri = function(success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getUri', []);
};

WebIntent.prototype.getExtra = function(params, success, fail) {
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getExtra', [params]);
};


WebIntent.prototype.onNewIntent = function(callback) {
	return cordova.exec(function(args) {
		callback(args);
    }, function(args) {
    }, 'WebIntent', 'onNewIntent', []);
};

WebIntent.prototype.sendBroadcast = function(params, success, fail) {
    return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'sendBroadcast', [params]);
};

cordova.addConstructor(function() {
	window.webintent = new WebIntent();
	
	// backwards compatibility	
	window.plugins = window.plugins || {};
	window.plugins.webintent = window.webintent;
});




// this is only for Android..for now
/*
PhoneGap.addConstructor(function() {
   navigator.app.addService('HelloWorld','com.phonegap.plugin.HelloWorld');
})
*/

window.createevent = function(name, year, month, day, note, callback) {
    cordova.exec(callback, function(err) { }, "CreateEvent", "createevent", [name,year,month,day,note]);
};

