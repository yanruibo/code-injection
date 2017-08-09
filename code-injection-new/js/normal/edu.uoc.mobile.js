


























            $(function() {
                FastClick.attach(document.body);
            });
            $(document).live('pagecreate', function(e, obj) {
                $.edu_uoc_Localization.loadLocale(e.target);
                $.edu_uoc_phonegap_Loader.hideLoader();
                if($(e.target).attr('id') != 'externalPage' && $(e.target).attr('data-role') == 'page' && $(e.target).attr('data-created') != 'true') {
                    console.log('@@@@ RESIZING ON PAGECREATE: ' + $(e.target).attr('id'));
                    var headerH = $(e.target).find('[data-role="header"]').outerHeight();
                    var contentH = $(window).height();
                    $(e.target).find('[data-role="content"]').css('min-height', (contentH-headerH));
                    $(e.target).attr('data-created', 'true');
                    console.log('@@@ CREATED @@@ - ' + $(e.target).attr('id') + ': ' + $(e.target).attr('data-created'));
                }
            });
            $(document).live('pageshow', function(e, obj) {
                if($(e.target).attr('data-role') == 'page' && $(e.target).attr('id') != 'externalPage') {
                    $.edu_uoc_phonegap_GoogleAnalytics.trackPageView($(e.target).attr('id'));
                    if(obj.prevPage.attr('id') != 'comentariPage' && $.mobile.activePage.attr('id') != 'home') {
                        if($.mobile.activePage.data('ui.prevPage') == undefined) {
                            $.mobile.activePage.data('ui.prevPage',obj.prevPage);
                        }
                    }
                }

            });

            function onDeviceReady() {

            }
            
            $(document).ready(function() {
                if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
                    document.addEventListener("deviceready", onDeviceReady, false);
                } else {
                    onDeviceReady();
                }
            });
        






		var perfil=obtePerfil('tots');
		_uacct = "UA-3749657-1";
		__utmSetVar(perfil);
		urchinTracker();
	












                














            $(function() {
              $.preload.images();
              
              if(isIOS() && window.device && parseFloat(window.device.version) >= 7.0) {
                    $('body').addClass('ios7');
                    console.log('@@@@@ IOS7 @@@@@: ' + $('body').attr('class'));
              } else {
                FastClick.attach(document.body);
              }
                var selScrollable = '[data-role="content"]';
                // Uses document because document will be topmost level in bubbling
                $(document).on('touchmove',function(e){
                  e.preventDefault();
                });
                // Uses body because jQuery on events are called off of the element they are
                // added to, so bubbling would not work if we used document instead.
                $('body').on('touchstart', selScrollable, function(e) {
                  if (e.currentTarget.scrollTop === 0) {
                    e.currentTarget.scrollTop = 1;
                  } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
                    e.currentTarget.scrollTop -= 1;
                  }
                });
                // Stops preventDefault from being called on document if it sees a scrollable div
                $('body').on('touchmove', selScrollable, function(e) {
                  e.stopPropagation();
                });
            });
            $('#noticiesPage').live('pageshow', function(e) {
                localStorage.setObject($.edu_uoc_Authentication.getCampusUsername() + '-has-news',false);
                $('#news .alert').addClass('ninja');
            });

            $('#avisosDlg').live('pageshow', function(e) {
                localStorage.setObject($.edu_uoc_Authentication.getCampusUsername() + '-has-announcements',false);
                $('#announcement .alert').addClass('ninja');
            });

            $('#externalPage').live('pageshow', function(e) {
                if($.mobile.activePage.find('iframe').length == 0) {
                    $.mobile.changePage('#home');
                };
            });
            $('#menuPage').live('pagebeforeshow', function(e) {
                getAppVersion(function(version) {
                    console.log('@@ VERSION @@ - Javascript: ' + version);
                    var beta = (version.split('.')[1])%2 == 0 ? '' : ' beta';
                    $('#version').text($.edu_uoc_Localization.getLocale('version') + ': ' + version + beta);
                });
                var headerH = $(this).find('[data-role="header"]').outerHeight();
                var contentH = $(window).height();
                $('#menuPage').find('[data-role="content"]').css('min-height', (contentH-headerH));
            });
            $(window).bind('resize', function(e){
                if(isDeviceTablet() && isDeviceLandscape()) {
                    $($.mobile.activePage).adaptAgendaHeightPage();
                }
                if($.mobile.activePage.attr('id') == 'menuPage') {
                    var headerH = $(this).find('[data-role="header"]').outerHeight();
                    var contentH = $(window).height();
                    $('#menuPage').find('[data-role="content"]').css('min-height', (contentH-headerH));
                }
            });
            $(document).live('pagecreate', function(e, obj) {
                $.edu_uoc_Localization.loadLocale(e.target);
                if($(e.target).attr('id') != 'externalPage' && $(e.target).attr('data-role') == 'page' && $(e.target).attr('data-created') != 'true') {
                    console.log('@@@@ RESIZING ON PAGECREATE: ' + $(e.target).attr('id'));
                    var headerH = $(e.target).find('[data-role="header"]').outerHeight();
                    var contentH = $(window).height();
                    $(e.target).find('[data-role="content"]').css('min-height', (contentH-headerH));
                    $(e.target).attr('data-created', 'true');
                    console.log('@@@ CREATED @@@ - ' + $(e.target).attr('id') + ': ' + $(e.target).attr('data-created'));
                }

                if($(e.target).attr('data-role') == 'page' && $(e.target).attr('id') != 'externalPage') {
                    if(!window.firstOpen) {
                        console.log('@@@ HIDE LOADER PAGE CREATE @@@');
                        $.edu_uoc_phonegap_Loader.hideLoader();
                    }
                }
            });
            $(document).live('pageshow', function(e, obj) {
                if($(e.target).attr('data-role') == 'page' && $(e.target).attr('id') != 'externalPage') {
                    $.edu_uoc_phonegap_GoogleAnalytics.trackPageView($(e.target).attr('id'));
                    if(obj.prevPage.attr('id') != 'comentariPage' && $.mobile.activePage.attr('id') != 'home') {
                        if($.mobile.activePage.data('ui.prevPage') == undefined) {
                            $.mobile.activePage.data('ui.prevPage',obj.prevPage);
                        }
                    }
                }
                if(!window.firstOpen && $(e.target).attr('id') != 'home') {
                    $.edu_uoc_phonegap_Loader.hideLoader();
                }
                try {
                    if(typeof obj.prevPage !== 'undefined' && obj.prevPage.attr('id') == 'externalPage') {
                        setTimeout(edu.uoc.Inbox.refreshUI, 1);
                        setTimeout(refreshHome, 1);
                    }
                    if(typeof obj.prevPage !== 'undefined' && (obj.prevPage.attr('id').toLowerCase().indexOf('agenda') >= 0 || obj.prevPage.attr('id').toLowerCase().indexOf('creacita') >= 0)) {
                        setTimeout($.mobile.activePage.refreshAgendaData, 1);
                    }
                } catch(e) {}
            });
            $('#agendaPage').live('pagebeforeshow', function(e) {
                $(e.target).buildAgenda();
                $(e.target).applyAgendaData();
            });
            $("#agendaPage").live("swipeleft", function onAgendaSwipeLeft() {
                var d = window.agendaDataCurrentDate;
                d.setMonth(d.getMonth() + 1);
                $.mobile.activePage.setCalendarDate(d);
            });
            $("#agendaPage").live("swiperight", function onAgendaSwipeRight() {
                var d = window.agendaDataCurrentDate;
                d.setMonth(d.getMonth() - 1);
                $.mobile.activePage.setCalendarDate(d);
            });
            $("#agendaDayPage").live("swipeleft", function onAgendaSwipeLeft() {
                var d = window.agendaDataCurrentDate;
                d.setHours(d.getHours() + 24)
                $.mobile.activePage.setCalendarDate(d);
            });
            $("#agendaDayPage").live("swiperight", function onAgendaSwipeRight() {
                var d = window.agendaDataCurrentDate;
                d.setHours(d.getHours() - 24)
                $.mobile.activePage.setCalendarDate(d);
            });
            $('#notasPage').live('pagebeforeshow', function (e) {
                $.edu_uoc_phonegap_Loader.showLoader();
                refreshNotesPage();
            });

            $('#materials').live('pageshow', function(e) {
                if(navigator.network) {
                    console.log('@@ Network type: ' + navigator.network.connection.type);
                    if(navigator.network.connection.type == Connection.CELL_2G
                       || navigator.network.connection.type == Connection.CELL_3G
                       || navigator.network.connection.type == Connection.CELL_4G) {
                        if(window.nowifi == undefined) {
                            $.mobile.changePage('#noWifi');
                            window.nowifi = true;
                        }
                    }
                }
            });
            $('#agendaPage').live('pageshow', function(e) {
                if(isDeviceTablet() && isDeviceLandscape()) {
                    $($.mobile.activePage).adaptAgendaHeightPage();
                }
            });

            $('#agendaDayPage').live('pagebeforeshow', function(e) {
                $(e.target).applyAgendaData();
            });
            $('#novacita').live('pageinit', function(e){
                $(e.target).buildNewEvent();
            });
            // Handle the pause event
            //
            function onPause() {
                if(window.started) {
                    //$.unblockUI();
                    clearTimer();    
                }  
            }

            function onOffline() {
                console.log('@@ ONLINE STATUS: Offline');
                $('.lostconnection').show();
                $('#homeOffline').show();
                $('#email').addClass('ui-disabled');
                $('#menuitem-email').addClass('ui-disabled');
                $('#serveiatencio').addClass('ui-disabled');
                $('#menuitem-serveiatencio').addClass('ui-disabled');
                $("[id^=classroom_]").each(function() {
                    $(this).addClass('ui-disabled');
                });
                if($.mobile.activePage.attr('id') == 'externalPage') {
                    
                }
                clearTimer();
                $.edu_uoc_phonegap_Loader.hideLoader();
            }

            function onOnline() {
                console.log('@@ ONLINE STATUS: Online');
                $('.lostconnection').hide();
                $('#homeOffline').hide();
                $('#email').removeClass('ui-disabled');
                $('#menuitem-email').removeClass('ui-disabled');
                $('#serveiatencio').removeClass('ui-disabled');
                $('#menuitem-serveiatencio').removeClass('ui-disabled');
                $("[id^=classroom_]").each(function() {
                    $(this).removeClass('ui-disabled');
                });
                if($.mobile.activePage.attr('id') == 'externalPage') {
                    
                }
                if(window.started && $.edu_uoc_Network.isOnLine()) {
                    $.edu_uoc_Authentication.isAuthenticated(
                        initTimer,
                        function() {
                            console.log('@@ No valid session. Return to login');
                            window.closeApp = false;
                            $.blockUI();
                            document.location.href = 'index.html#login-page';
                            document.location.href = 'index.html#login-page';
                        }
                    );
                }
            }
            // Handle the pause event
            //
            function onResume() {
                if(window.started && $.edu_uoc_Network.isOnLine()) {
                    $.edu_uoc_Authentication.isAuthenticated(
                        initTimer,
                        function() {
                            console.log('@@ No valid session. Return to login');
                            window.closeApp = false;
                            $.blockUI();
                            document.location.href = 'index.html#login-page';
                            document.location.href = 'index.html#login-page';
                        }
                    );
                }
            }

            function onDeviceReady() {
                $.edu_uoc_phonegap_Loader.showLoader();
                document.addEventListener('online', onOnline, false);
                document.addEventListener('offline', onOffline, false);
                document.addEventListener("pause", onPause, false);
                document.addEventListener("resume", onResume, false);
                document.addEventListener("menubutton", showMenu, false);
                document.addEventListener("backbutton", goBack, false);
                if(!$.edu_uoc_Network.isOnLine()) {
                    onOffline();
                }
                $.ajax({
                url: 'menu.json',
                dataType: 'json'
                }).then(function(data) {
                    getAppVersion(function(version) {
                        console.log('@@ VERSION @@ - Javascript: ' + version);
                        var beta = (version.split('.')[1])%2 == 0 ? '' : ' beta';
                        $('#version').text($.edu_uoc_Localization.getLocale('version') + ': ' + version + beta);

                        var template = $('#mainmenu-item-template').html();
                        if(beta != '') {
                            Array.prototype.push.apply(data['items'],data['beta']);
                        }

                        data['items'] = data['items'].filter(function filterMenuByApp(element) {
                            if(element.disabledApps != undefined) {
                                if(element.disabledApps.indexOf($.edu_uoc_Authentication.getCampusObjectSession().currentProfile.appId) >= 0) {
                                    return false;
                                }
                            }

                            return true;
                        });


                        var html = Mustache.to_html(template, data);
                        html = $(html);
                        $.edu_uoc_Localization.loadLocale(html);
                        if($('#grid').children().first().length > 0) {
                            $('#grid').children().first().before(html);
                        } else {
                            $('#grid').append(html);
                        }

                        template = $('#menu-item-template').html();
                        html = Mustache.to_html(template, data);
                        html = $(html);
                        $.edu_uoc_Localization.loadLocale(html);
                        $('#menugrid').children().first().after(html);
                        initTimer(1);
                    });

                }).fail(function(e) {
                    showGeneralError();
                });

                
            }
            
            $(document).ready(function() {
                if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
                    document.addEventListener("deviceready", onDeviceReady, false);
                } else {
                    onDeviceReady();
                }
            });
        



                if (!window.agendaDataCurrentDate) {
                    console.log("Setting date to today.");
                    window.agendaDataCurrentDate = new Date();
                    $('.monthpicker').val(window.agendaDataCurrentDate.toJSON().slice(0,7));
                    $('.daylpicker').val(window.agendaDataCurrentDate.toJSON().slice(0,10));
                } else {
                    // Update displays
                    $('.nativedatepicker').each(function() {
                        $(this).val(window.agendaDataCurrentDate.toString("dd/MMM/yyyy"));
                    });
        	 
                    $('#agendaDayPage').updateAgendaDateDisplay(window.agendaDataCurrentDate);
             
                    // This fixes the problem you mention at the bottom of this script with it not working a second/third time around, because it is in focus.
                    $('.nativedatepicker').each(function() {
                        $(this).val(window.agendaDataCurrentDate.toString("dd/MMM/yyyy"));
                    });
                }
            
                $('.monthpicker').on('focus', function(e) {
                        $(this).val(window.agendaDataCurrentDate.toJSON().slice(0,7));
                });
                $('.daylpicker').on('focus', function(e) {
                        $(this).val(window.agendaDataCurrentDate.toJSON().slice(0,10));
                });

                $('.monthpicker').on('change', function(e) {
                    if($(this).val() === '') {
                        return;
                    }
                    newDate = new Date($(this).val());
                    window.agendaDataCurrentDate = newDate;

                    $.mobile.activePage.updateAgendaDateDisplay(newDate);
                    $.mobile.activePage.buildCalendar(newDate.getMonth(), newDate.getFullYear());
                });
                $('.daylpicker').on('change', function(e) {
                    if($(this).val() === '') {
                        return;
                    }
                    newDate = new Date($(this).val());
                    window.agendaDataCurrentDate = newDate;
                    $('#agendaDayPage').updateAgendaDiaDateDisplay(newDate);
                    $('#agendaDayPage').refreshPageDay(newDate);
                });

                /*$('.nativedatepicker').on( "vclick",function(event) {
                    console.log('.nativedatepicker Clicked');
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    var currentField = $(this);
                    var myNewDate = Date.parse(currentField.val()) || new Date();

                    // Same handling for iPhone and Android
                    window.plugins.datePicker.show({
                        date : myNewDate,
                        mode : 'date', // date or time or blank for both
                        allowOldDates : true,
                        allowKitKat: true
                    }, function(returnDate) {
                        console.log('Return DATEPICKER DATE:' + returnDate);
                        var newDate = new Date(returnDate);
                        // Update both fields
                        $('.nativedatepicker').each(function() {
                            $(this).val(newDate.toString("dd/MMM/yyyy"));
                        });

                        // Update data
                        window.agendaDataCurrentDate = newDate;

                        if($.mobile.activePage.attr('id') == 'agendaDayPage') {
                            $('#agendaDayPage').updateAgendaDiaDateDisplay(newDate);
                            $('#agendaDayPage').refreshPageDay(newDate);
                        } else {
                            $.mobile.activePage.updateAgendaDateDisplay(newDate);
                            $.mobile.activePage.buildCalendar(newDate.getMonth(), newDate.getFullYear());
                        }

                        // This fixes the problem you mention at the bottom of this script with it not working a second/third time around, because it is in focus.
                        $('.nativedatepicker').each(function() {
                            $(this).val(newDate.toString("dd/MMM/yyyy"));
                        });
                        $('.nativedatepicker').blur();
                    });
                });*/
            





                        $('#agendaDayPage').bind('pagebeforeshow', function(e, data){
                        	if($(e.target).find('table tbody tr').length == 1) {
                                tbody = $(e.target).find('table tbody');
                                baseDate = new Date();
                                for(i=0; i < 24; i++) {
                                    baseDate.setHours(i);
                                    baseDate.setMinutes(0);
                                    tbody.append('<tr><td scope="row">' + baseDate.toString('HH:mm') + '</td><td scope="row"><ul id="' + i + '"></ul></td></tr>');
                                }
                                
                            }
                            $(e.target).beforeShowPageDay(data);
                        });


                        /*$('.nativedatepicker').click(function(event) {
                            console.log('@@ PICKER @@ CLICK');
                            var currentField = $(this);
                            var myNewDate = Date.parse(currentField.val()) || new Date();

                            // Same handling for iPhone and Android
                            window.plugins.datePicker.show({
                                date : myNewDate,
                                mode : 'date', // date or time or blank for both
                                allowOldDates : true,
                                allowKitKat: true
                            }, function(returnDate) {
                                console.log('Return DATEPICKER DATE:' + returnDate);
                                var newDate = new Date(returnDate);
                                // Update both fields
                                $('.nativedatepicker').each(function() {
                                    $(this).val(newDate.toString("dd/MMM/yyyy"));
                                });

                                // Update data
                                window.agendaDataCurrentDate = newDate;

                                $('#agendaDayPage').updateAgendaDiaDateDisplay(newDate);
                                $('#agendaDayPage').refreshPageDay(newDate);


                                // This fixes the problem you mention at the bottom of this script with it not working a second/third time around, because it is in focus.
                                $('.nativedatepicker').each(function() {
                                    $(this).val(newDate.toString("dd/MMM/yyyy"));
                                });
                                $('.nativedatepicker').blur();
                            });
                        });*/
                    

















            $(function() {
                $.preload.images();
                FastClick.attach(document.body);
                setTimeout(function() { $('#splah-loading').show(); }, 2000);
            });
            $(document).live('pagecreate', function(e,obj) {
                $.edu_uoc_Localization.loadLocale(e.target);
                var headerH = $(this).find('[data-role="header"]').outerHeight();
                var contentH = $(window).height();
                $($.mobile.activePage).find('[data-role="content"]').css('min-height', (contentH-headerH));
            });
            $('#login-page').live('pageinit', function() {
                $('#login-form').uocBindAuthentication();
            });
            $('#login-page').live('pageshow', function(e) {
                setTimeout(function() {
                    $.edu_uoc_phonegap_Loader.hideLoader();
                },500);
            });
            $('#splash-page').live('pageshow', function(e) {
                setTimeout(function() { $('#splash-loading').show(); }, 3000);
                $.edu_uoc_Authentication.isAuthenticated(
                    function() {
                        window.location.href = 'home.html';
                    }
                    ,
                    function() {
                        if(localStorage.getItem('uoc-username')
                            && localStorage.getItem('uoc-password')
                            && history.length <= 1) {
                            $.edu_uoc_Authentication.performBinaryAuthentication(
                                localStorage.getItem('uoc-username'),
                                localStorage.getItem('uoc-password'),
                                function() {
                                    window.location.href = 'home.html';
                                }
                                ,
                                function() {
                                    $.mobile.changePage('#login-page', { transition: 'fade', changeHash:true});
                                }
                            );
                        } else {
                            setTimeout(function() {$.mobile.changePage('#login-page', { transition: 'fade', changeHash:true});},1500);
                        }
                    }
                );
            });
            function onDeviceReady() {
                getAppVersion(function(version) {
                    console.log('@@ VERSION @@ - Javascript: ' + version);
                    var beta = (version.split('.')[1])%2 == 0 ? '' : ' beta';
                    $('#version').text($.edu_uoc_Localization.getLocale('version') + ': ' + version + beta);
                });
            }
            
            $(document).ready(function() {
                if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
                    document.addEventListener("deviceready", onDeviceReady, false);
                } else {
                    onDeviceReady();
                }
            });
            
            cordova.addConstructor(function() {
                document.addEventListener("backbutton", function() {
                    navigator.app.exitApp();
                }, false);
            });
        



                    $('#creaCitaPage').bind('pagecreate', function(e, data){
                        $('.error').hide();
                        $(e.target).find('form').each(function() {
                            $(this).bindNewEvent();
                        });
                        $(e.target).bindNativeDatePickerToDateInputs();
                        $(e.target).bindNativeTimePickerToTimeInputs();

                        $(e.target).find('#totdia').bind('click', function() {
                            if($(this).is(':checked')) {
                                $(e.target).find('#totdiaset').hide();
                            } else {
                                $(e.target).find('#totdiaset').show();
                            }
                        });
                        $(e.target).find('#repetir').bind('click', function() {
                            if($(this).is(':checked')) {
                                $(e.target).find('.detalls-repetir').show();
                            } else {
                                $(e.target).find('.detalls-repetir').hide();
                            }
                        });
                        $('#data').val(new Date().toString("yyyy-MM-dd"));
                        $('#datafi').val(new Date().addDays(1).toString("yyyy-MM-dd"));
                        $('#horainici').val(new Date().toString("HH:mm"));
                        $('#horadurada').val(new Date().addHours(1).toString("HH:mm"));
                        $('#diarepetir').each(function() {
                            $(this).empty();
                            for(i=1; i < 100;i++) {
                                $(this).append(new Option(i, i));
                            }
                        });
                    });
                





            // fragment de codi de google analytics de Serveis d'informacio (indicadorsgoc)
            var perfil=obtePerfil('tots');
            var entorn=obtePerfil('entorn');
            var tracking_id = '';
            var domini = document.domain;
            if (document.domain=='cv.uoc.edu') tracking_id = 'UA-3749657-1';
            else if (document.domain=='cv-pre.uoc.edu') tracking_id = 'UA-3749657-3';
            else if (document.domain=='cv-test.uoc.edu') tracking_id = 'UA-3749657-4';
            var _gaq = _gaq || [];	_gaq.push(['_setAccount', tracking_id]);
            _gaq.push(['_setDomainName', domini]);	_gaq.push(['_setSessionCookieTimeout', 4800000]);
            _gaq.push(['_setCustomVar',1,'TipusUsuari',perfil,3]);
            _gaq.push(['_setCustomVar',2,'Meus Materials', 'Meus Materials',3]); _gaq.push(['_setCustomVar',3,'',entorn,3]);
            _gaq.push(['_setCustomVar',4,'Tipus de contingut','Selecció assignatura',3]);
            _gaq.push(['_trackPageview']);
            _gaq.push(['sxa._setAccount', 'UA-36657906-1']);
            _gaq.push(['sxa._setDomainName', 'uoc.edu']);
            _gaq.push(['sxa._trackPageview']);
            (function() { var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;     ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';     var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);   })();
        










		var perfil=obtePerfil('tots');
		_uacct = "UA-3749657-1";
		__utmSetVar(perfil);
		urchinTracker();
	



            setTimeout(function() {
                    buildQuotes();
            }, 500);
        

function getWinNm() {
// Genera un nom de finestra per a poder-ne obrir m? d'una
///////////////////////////////////////////////////////////
  var now = new Date();
  var hr = new String(now.getHours());
  var mn = new String(now.getMinutes());
  var sc = new String(now.getSeconds());
  var ms = new String(now.getMilliseconds());
  var winNm = hr + mn + sc + ms;
  return winNm;
}

function obtePerfil(tipus,format)
// retorna dades de perfils de l'usuari segons el par?etre que se li passi.
// 'entorn' -> Retorna l'appid; 'perfil' -> Retorna l'usertypeid; 'subperfil' -> Retorna la descripci?del usersubtypeid
// 'tots' -> Retorna la concatenaci?entorn/perfil/descripci?supperfil
{   var nargs = new Number(arguments.length);
    if (nargs <2) format='';
    var cad_perf = new String('');
	var tipus_tmp = new String('');
	var entorn = new String('');var perfil = new String('');var subperfil = new String('');var tots = new String('');
	tipus_tmp=""+top.window.name;
  s=""+tipus_tmp; q=s.search(/entorn/);
  if (window.name=='frm_viewMssgHead') {
  	        entorn=parent.opener.top._user_app; perfil=parent.opener.top._user_type; subperfil=parent.opener.top._user_subtype;
           }
  else {
      if(top.logobar==null||q!=-1) {
          for(i=0;i<10;i++){
            tipus_tmp=tipus_tmp.replace('charespai',' '); tipus_tmp=tipus_tmp.replace('charcoma',',');
            tipus_tmp=tipus_tmp.replace('charpunt','.');  tipus_tmp=tipus_tmp.replace('charmajor','>');
            tipus_tmp=tipus_tmp.replace('chararroba','@');tipus_tmp=tipus_tmp.replace('charampersand','&');
            tipus_tmp=tipus_tmp.replace('charpuntcoma',';'); tipus_tmp=tipus_tmp.replace('chartancat','?');
            tipus_tmp=tipus_tmp.replace('charobert','`'); tipus_tmp=tipus_tmp.replace('chardollar','$');
            }
        s=""+tipus_tmp;
        q=s.search(/entorn/); t=s.search(/perfil/); p=s.search(/subperfil/);
        if (t==-1||q==-1) {}
        else { entorn=s.substring(q+6,t);}
        if (p==-1) {}
        else {perfil=s.substring(t+6,p); subperfil=s.substring(p+9,s.length);}
   		  }
      else {entorn=top._user_app; perfil=top._user_type; subperfil=top._user_subtype; }
   	   }
   	
   switch(tipus) {
   	     case 'entorn': cad_perf+=entorn; break;
         case 'perfil': cad_perf+=perfil; break;
         case 'subperfil': cad_perf+=subperfil; break;
         case 'tots': if (format=='guio') cad_perf+=entorn + '-' + perfil + '-' + subperfil;
		              else cad_perf+=entorn + '/' + perfil + '/' + subperfil;
                      if (cad_perf=='//') cad_perf='';
                      break;
         default : cad_perf+=perfil; break;
    }	
 return(cad_perf);
}

function oWin(adr, x, y, z) {
// Obre una finestra nova amb els par?etres passats o per defecte.
// El par?etre 'z' obre una finestra sense barres d'estat ni botons.
// Passa tamb?informaci?del perfil en el window name.
////////////////////////////////////////////////////////////////////
/* Exemples de crida
adr             oWin('blanc.htm')
adr,x,y         oWin('blanc.htm', '100', '100')
*/

  var nargs = new Number(arguments.length);
  var xdef = new String('750');
  var ydef = new String('450');
	var zdef = new String('0');
	var propietats = new String('');
	var cad_temp = new String('');

	if(nargs<4) z = zdef;
  if((nargs<3)||(x=='')) {
    x = new String(xdef);
    y = new String(ydef);
  }
	switch(z) {
		case '0': propietats = ',menubar=yes,resizable=yes,scrollbars=yes,status=yes';
							break;
		case '1': propietats = ',menubar=no,resizable=yes,scrollbars=yes,status=no';
							break;
		case '2': propietats = ',menubar=yes,toolbar=yes,resizable=yes,scrollbars=yes,status=yes';
							break;
		default:	propietats = ',menubar=yes,resizable=yes,scrollbars=yes,status=yes';
	}
	var cad_temp = 'entorn' + obtePerfil('entorn') + 'perfil' + obtePerfil('perfil') + 'subperfil' + obtePerfil('subperfil');
	var perfils='';
  for(i=0;i<cad_temp.length;i++)
   { switch(cad_temp.substring(i,i+1)){
         case ' ': perfils+='charespai'; break;
         case '.': perfils+='charpunt'; break;
         case ',': perfils+='charcoma'; break;
         case '>': perfils+='charmajor'; break;
         case '@': perfils+='chararroba'; break;
         case '&': perfils+='charampersand'; break;
         case ';': perfils+='charpuntcoma'; break;
         case '?': perfils+='chartancat'; break;
         case '`': perfils+='charobert'; break;
		 case '$': perfils+='chardollar'; break;
         default : perfils+=cad_temp.substring(i,i+1); break;
      }
   }
  perfils=getWinNm()+perfils;
  var messWin = window.open(adr,perfils,'width='+ x + ',height=' + y + propietats);
}

function obtNumSesOld(s) {
// Obt?el numero de sessi?del frame 'logobar', si existeix, i si no del top.window.name
// Automatitza l'obtenci?del numSes independentment de si la finestra ha estat oberta
// amb oWinSes o amb oWinName
// s='1' retorna l'oldsession. s='2' retorna una cadena amb session + oldession.
///////////////////////////////////////////////////////////////////////////////////////// 
  var nargs = new Number(arguments.length);
  var ns = new String();
  var s_nou = new String(''); var s_vell = new String('');

  if (nargs<1) s = '0';

// Assigna els valors de sessi?segons el tipus de finestra
  if(top.logobar==null) { 
    if (parent.opener.top._sessionid) {
        s_nou = parent.opener.top._sessionid;
        s_vell = '';
    }
    // comprovar si estem en segon nivell
    else {
      if (parent.opener.opener && parent.opener.opener.top._sessionid) {
        s_nou = parent.opener.opener.top._sessionid;
        s_vell = '';
      }
      else {
        if (window.name=='frm_viewMssgHead') {
           s_nou = parent.opener.top.logobar.document.IDs.session.value;
           s_vell = parent.opener.top.logobar.document.IDs.oldsession.value;
        }
        else {
           s_nou = top.window.name.substring(0,128);
           s_vell = top.window.name.substring(128,top.window.name.length);
        }
      }
    }
  }
  else {
    s_nou = top.logobar.document.IDs.session.value;
   if (document.getElementById(top.logobar.document.IDs.oldsession)) 
      s_vell = top.logobar.document.IDs.oldsession.value; 
  }

// Retorna session, oldsession o tots dos segons el par?etre passat.
  switch(s) {
    case '0': ns = s_nou;
              break;
    case '1': ns = s_vell;
              break;
    case '2': ns = s_nou + s_vell;
              break;
    default:  break;
  }
  return ns;
}

function obtNumSes(s) {
  var nargs = new Number(arguments.length);
  var ns = new String();
  var s_nou = new String(''); var s_vell = new String('');
  var trobada=0;
  if (nargs<1) s = '0';
  // Assigna els valors de sessi?segons el tipus de finestra
  
  if(top.logobar==null) { 
    
  var win = window;
  var te = true;
  while (win != null) {
                if (win.top.logobar) {
                        s_nou = win.top.logobar.document.IDs.session.value;
						if (document.getElementById(win.top.logobar.document.IDs.oldsession)) 
						     s_vell = win.top.logobar.document.IDs.oldsession.value; 						
						trobada=1;
                }
				if (win.top.opener) win = win.top.opener;
				else  break;
        }
  if(!trobada) { 
           s_nou = top.window.name.substring(0,128);
           s_vell = top.window.name.substring(128,top.window.name.length);
		   trobada=1;
    }
  }
 else { 
  s_nou = top.logobar.document.IDs.session.value;
  if (document.getElementById(top.logobar.document.IDs.oldsession)) 
      s_vell = top.logobar.document.IDs.oldsession.value; 
  } 
// Retorna session, oldsession o tots dos segons el par?etre passat.
  switch(s) {
    case '0': ns = s_nou; break;
    case '1': ns = s_vell; break;
    case '2': ns = s_nou + s_vell; break;
    default:  break;
  }
  return ns;
}


function oWinSes(adr, x, y) {
// Obre una finestra nova amb numSes
// Passa tamb?informaci?del perfil en el window name
////////////////////////////////////
  var nargs = new Number(arguments.length);
  var xdef = new String('750');
  var ydef = new String('450');
  var cad_temp = new String('');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }
  var cad_temp = 'entorn' + obtePerfil('entorn') + 'perfil' + obtePerfil('perfil') + 'subperfil' + obtePerfil('subperfil');
	var perfils='';
  for(i=0;i<cad_temp.length;i++)
   { switch(cad_temp.substring(i,i+1)){
         case ' ': perfils+='charespai'; break;
         case '.': perfils+='charpunt'; break;
         case ',': perfils+='charcoma'; break;
         case '>': perfils+='charmajor'; break;
         case '@': perfils+='chararroba'; break;
         case '&': perfils+='charampersand'; break;
         case ';': perfils+='charpuntcoma'; break;
         case '?': perfils+='chartancat'; break;
         case '`': perfils+='charobert'; break;
		 case '$': perfils+='chardollar'; break;
         default : perfils+=cad_temp.substring(i,i+1); break;
      }
   }
  perfils=getWinNm()+perfils;
  var numSes = obtNumSes();
  var cgi = '/FinestraNova.html?s=' + numSes + '&htm=' + adr + '&appid=' + genDir('campus');
  var messWin = window.open(cgi,perfils,'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}


function oWinName(adr, x, y) {
// Com oWin per?posa el numSes en el window.name
//////////////////////////////////////////////////
/* Exemples de crida
adr             oWin('blanc.htm')
adr,x,y         oWin('blanc.htm', '100', '100')
*/

  var nargs = new Number(arguments.length);
  var xdef = new String('750');
  var ydef = new String('500');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }    
  
  var messWin = window.open(adr,obtNumSes('2'),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}


function oWinSesName(adr, x, y) {
// Obre una finestra nova amb numSes al top.logobar i al window.name.
////////////////////////////////////////////////////////////////////////
  var nargs = new Number(arguments.length);
  var xdef = new String('750');
  var ydef = new String('500');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }  
  var numSes=obtNumSes();    
  var cgi = '/FinestraNova.html?s=' + numSes + '&htm=' + adr + '&appid=' + genDir('campus');
  var messWin = window.open(cgi,obtNumSes('2'),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function _oWinSesName(adr, x, y) {
// Obre una finestra nova amb numSes. Cal passar el cam?complet d'adr
/////////////////////////////////////////////////////////////////////
  var nargs = new Number(arguments.length);
  var xdef = new String('750');
  var ydef = new String('500');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }

  var numSes = obtNumSes();
  var cgi = '/UOC/a/informacio/cercador/FinestraNova2.html?s=' + numSes + '&htm=' + adr;
  var messWin = window.open(cgi,numSes,'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function oWinSesLogo(adr, x, y) {
  var nargs = new Number(arguments.length);
  var xdef = new String('750');
  var ydef = new String('450');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }

  var numSes = obtNumSes();
//  var cgi = '/UOC/a/informacio/cercador/FinestraNova.html?s=' + numSes + '&htm=' + adr + '&appid=';
  var cgi = '/FinestraNova.html?s=' + numSes + '&htm=' + adr + '&appid=';
  var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');

}


function oWinBotons(adr, x, y) {
// Obre una finestra nova amb els par?etres passats o per defecte.
//////////////////////////////////////////////////////////////////
/* Exemples de crida
adr             oWin('blanc.htm')
adr,x,y         oWin('blanc.htm', '100', '100')
*/

  var nargs = new Number(arguments.length);
  var xdef = new String('750');
  var ydef = new String('450');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }

  var messWin = window.open(adr,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,statusbar=yes,toolbar=yes,status=yes');
}

function avisEspera(msg, x, y) {
  var inici_html = "<html>\n<head>\n<title></title>\n</head>\n<body bgcolor=\"#fff5e0\">\n\n<font face=\"Arial\" size=\"-1\">\n";
  var final_html = "\n</font>\n<p align=\"center\"><a HREF=\"javascript:self.close()\"><img src=\"/UOC/a/mc-icons/sortir.gif\" border=0></a></p>\n\n</body>\n</html>";
  var s = inici_html + msg + final_html;

  var nargs = new Number(arguments.length);
  var xdef = new String('400');
  var ydef = new String('200');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }
  var messWin = window.open('',getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');

  d = messWin.document;
  d.open();  d.write(s);  d.close();
}

function doTren(adr, x, y) {
// Obre finestra del tren amb numSes
// adr del tipus 'GAT_EXP.DADESBANC/dadesbanc_tren.dadesbanc'
// Opcions: adr: obre amb dimensions predefinides
//          adr,x,y: obre en finestra nova de dimensions x i y
//          adr,'': carrega adr en el marc actual
//////////////////////////////////////////////////////////////
 var p = new String(''); 

 var nargs = new Number(arguments.length);
 var xdef = new String('750');
 var ydef = new String('450');   

 if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
 }

 p='https://';
 if (adr=='GAT_EXP.CONSMATASIG'||adr=='GAT_EXPIB.CONSMATASIG') p='http://';
 
 var numSes = obtNumSes();  // Amb el par?etre 1 obt?el n? de sessi?antic. 
 var cgi = p + location.hostname + '/tren/trenacc?s=' + numSes + '&modul=' + adr;

 if (nargs=='2')  self.location= p + location.hostname + '/tren/trenacc?s=' + numSes + '&modul=' + adr;
 else var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function doTrenEntorn(adr, x, y) {
var adr_trad = new String(''); 
var nargs = new Number(arguments.length);
var xdef = new String('750');
var ydef = new String('450');   
var appid = new String('');
if(nargs<3) { x = new String(xdef);  y = new String(ydef); }
if (top._user_app) appid=top._user_app;	// Pren el directori on resideix l'entorn del top.	
else appid='UOC';

adr_trad=adr;		
if (appid=='UOC2000') {
 if (adr_trad.indexOf('GAT_EXP.')!=-1) adr_trad=adr_trad.replace('GAT_EXP','GAT_EXPIB');
 //if (adr=='GAT_EXP.PAPERETES/paperetes.paperetes') adr_trad='GAT_EXPIB.PAPERETES/paperetes.paperetes';
}
 
 doTren(adr_trad,x,y);
}
 
function doWebapps(adr, x, y) {
// Obre finestra d'aplicacions webapps 
//          adr,x,y: obre en finestra nova de dimensions x i y
//          adr,'': carrega adr en el marc actual
//////////////////////////////////////////////////////////////
 var p = new String(''); 
 var adr_aux = new String('');
 var adr_part1 = '';
 var adr_part2 = '';
 var cadena = '';
 
 
 var nargs = new Number(arguments.length);
 var xdef = new String('750');
 var ydef = new String('450');   
 var numSes = obtNumSes();  // Amb el par?etre 1 obt?el n? de sessi?antic. 

 if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
 }

 p='http://';
 
 cadena+=adr;
 interrogant=cadena.indexOf("?");
 ampersand=cadena.indexOf("&");
 if (interrogant==-1) { 
	if (ampersand==-1) { 
		adr_aux = adr + '?s=' + numSes;
	}
	else {
	    adr_part1=cadena.substring(0,ampersand);
		adr_part2=cadena.substring(ampersand,cadena.length);
		adr_aux = adr_part1 + '?s=' + numSes + adr_part2;
	}
 }
 else  adr_aux = adr + '&s=' + numSes;
    
 
 var cgi = p + location.hostname + adr_aux;

 if (nargs=='2')  self.location= p + location.hostname + adr_aux;
 else var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function doWebappsParam(adr, param, x, y) {
// Obre finestra d'aplicacions webapps 
//          adr,x,y: obre en finestra nova de dimensions x i y
//          adr,'': carrega adr en el marc actual
//////////////////////////////////////////////////////////////
 var p = new String(''); 

 var nargs = new Number(arguments.length);
 var xdef = new String('750');
 var ydef = new String('450');   

 if(nargs<4) {
    x = new String(xdef);
    y = new String(ydef);
 }

 p='http://';
 
 var numSes = obtNumSes();  // Amb el par?etre 1 obt?el n? de sessi?antic. 
 var cgi = p + location.hostname + adr +'?s=' + numSes + param;

 if (nargs=='3')  self.location= p + location.hostname + adr +'?s=' + numSes + param;
 else var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function doTrenHelp(adr, help, x, y) {
// Obre finestra del tren amb numSes i amb help
// adr del tipus 'GAT_EXP.DADESBANC/dadesbanc_tren.dadesbanc'
// Opcions: adr: obre amb dimensions predefinides
//          adr,x,y: obre en finestra nova de dimensions x i y
//          adr,'': carrega adr en el marc actual
//////////////////////////////////////////////////////////////
 var p = new String('');

 var nargs = new Number(arguments.length);
 var xdef = new String('750');
 var ydef = new String('450');

 if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
 }

 p='https://';
 var numSes = obtNumSes();  // Amb el par\340metre 1 obt\351 el n\272 de sessi\363 antic.
 var cgi = p + location.hostname + '/tren/trenacc?s=' + numSes + '&modul=' + adr;
 var messWin = window.open('/UOC/trenInit.html?url='+cgi+'&help='+help,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}


function doPla(any,codi,lang, x, y)
// Obre la fitxa del pla docent d'una assignatura
// any:  Any acad?ic. Ex: 20031
// codi: Codi assignatura. Ex: 05.001
// lang: Idioma. Ex: CAT
// x,y:  dimensions de la finestra x i y
{
 var nargs = new Number(arguments.length);
 var xdef = new String('750');
 var ydef = new String('450');
 if(nargs<4) {
    x = new String(xdef);
    y = new String(ydef);
 }
 
 //var url="http://cv.uoc.edu/tren/trenacc/web/GATILLO.PLANDOCENTE?" + "any_academico="+ any + "&cod_asignatura="+codi+"&idioma="+lang+"&pagina=PD_PREV_SECRE";
 var url="http://"+ location.hostname + "/tren/trenacc/web/GAT_EXP.PLANDOCENTE?" + "any_academico="+ any + "&cod_asignatura="+codi+"&idioma="+lang+"&pagina=PD_PREV_SECRE&cache=S";
 var messWin = window.open(url,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');	
}

function doIglu(adr, x, y) {
// Obre finestra del tren amb numSes
// adr del tipus 'trameses/plsql/tramweb.dades'
///////////////////////////////////////////////////////////
  var nargs = new Number(arguments.length);
  var xdef = new String('750');
  var ydef = new String('450');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }

  var numSes = obtNumSes(1);  // Amb el par?etre 1 obt?el n? de sessi?antic.   
  var cgi = 'http://iglu.uoc.es:448/' + adr + '?s=' + numSes;
  var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function doPrefer(opcio, tema) {
// Canvia les prefer?cies
// En lloc d'escriure-les amb javascript, ho fem en HTML per a poder aplicar estils m? f?ilment.
/////////////////////////////////////////////////////////////////////////////////////////////////
  var adr = new String();
  var ruta = new String('/cgi-bin/comuni/');

  var nargs = new Number(arguments.length);
  if(nargs<2) tema = new String('');
  else tema = '&t=' + tema;

  adr = ruta + opcio + '?s=' + obtNumSes() + tema;
  self.document.URL = adr;
}

function doVirtual(s) {
  var lang = new String(s);
  var nom = new String();
  var numSes = new String(top.logobar.document.IDs.session.value);
  var oldNumSes = new String(top.logobar.document.IDs.oldsession.value);

  nom = 'sessio' + numSes + 'sessiovell' + oldNumSes + 'lang' + lang;
  var adr = 'http://www.lavirtual.com/lavirtual.htm?lang=' + lang + '&s=' + numSes;
  var altura=screen.height; 
  var anchura=screen.width;
  var vent_x=770;
  var vent_y=500;
  var posx=(screen.width/2)-400;
  var posy=(screen.height/2)-300;
  var finestra =
window.open(adr,nom,'resizable=1,toolbar=1,location=0,directories=0,status=1,menubar=0,scrollbars=0,width=770,height=500,screenX='+posx+',screenY='+posy+',left='+posx+',top='+posy+'');
}

function inclou_css(css_explorer, css_netscape) {
// Aquesta funci?importa el css que se li passi per par?etre. El primer 
// par?etre es el css per explorer i el segon per netscape. Si s'en posa
// nom? un, ser?el css per tots dos navegador. Si no posem cap par?etre
// els css incl? es /UOC/uoc.css

  var quin_css='/UOC/uoc.css';
  var nargs = new Number(arguments.length);
  var unitat_local= 'file:///Q:';
  var tmp= location.href;
  if(nargs==1) quin_css=css_explorer;
  if(nargs==2)
   {  	if (navigator.appName == "Netscape") quin_css=css_netscape;
  	else quin_css=css_explorer;
   }

  if((tmp.indexOf('file:')>-1 || tmp.charAt(1)==':') && (quin_css.charAt(0)=='/')) {
		quin_css=unitat_local+quin_css;
	}
	document.write('<link rel="stylesheet" href="'+ quin_css +'" type="text/css">');
}

function doAjuda(num) {
// Obre una plana d'obertura i consulta d'incid?cies per a l'usuari actual
// El par?etre num ? el n?mero de sessi? sin?es passa, s'obt?el n? antic amb la funci?obtNumSes('1');

	var nargs = new Number(arguments.length);
	var numSes;
	if(nargs<1) numSes = obtNumSes('1');  else  numSes = num;    
    	//var cgi = 'http://argentina.uoc.es/incidenciescv/pls/usr.NewIncidFromUser?sid='+ numSes;
	var cgi = 'http://'+ location.hostname +'/incidenciescv/pls/usr.NewIncidFromUser?sid='+ numSes;
	//var cgi = 'http://trineu.uoc.es/incidenciescv/pls/usr.NewIncidFromUser?sid='+ numSes;
	var winNm = getWinNm();
	var messWin = window.open(cgi,winNm,'width=600,height=450,menubar=no,resizable=no,scrollbars=yes,status=yes');
}

function doUser(num) {
//Funci?necess?ia per a que aparegui el formulari d'incid?cia d'Ajuda Inform?ica
	var nargs = new Number(arguments.length);
	var numSes;
	if(nargs<1) numSes = obtNumSes('1');  else  numSes = num;      	
	//var cgi = 'http://argentina.uoc.es/incidenciescv/pls/usr.NewIncidFromUser?sid='+ numSes;
	//var cgi = 'http://trineu.uoc.es/incidenciescv/pls/usr.NewIncidFromUser?sid='+ numSes;
	var cgi = 'http://'+ location.hostname +'/incidenciescv/pls/usr.NewIncidFromUser?sid='+ numSes;
	var winNm = getWinNm();
	var messWin = window.open(cgi,winNm,'width=600,height=450,menubar=no,resizable=no,scrollbars=yes,status=yes');
}

function doLlista(adr, x, y) {
// Obre finestra del trineu amb numSes
// adr del tipus 'campus/plsql/llistes.print_members?lid=5421&psid='
// Opcions: adr: obre amb dimensions predefinides
//          adr,x,y: obre en finestra nova de dimensions x i y
//          adr,'': carrega adr en el marc actual
//////////////////////////////////////////////////////////////
  var nargs = new Number(arguments.length);
  var xdef = new String('600');
  var ydef = new String('400');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }

  var numSes = obtNumSes();
  var cgi = 'http://trineu.uoc.es:445/' + adr + numSes;
  if (nargs=='2') self.location= cgi;
  else var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function doRes(suid) {
	var numSes = obtNumSes();
	var cgi = '/UOC/a/resume_0.html?s='+numSes+'&uid=' + suid;
	var winNm = getWinNm();
	var messWin = window.open(cgi,winNm,'width=700,height=400,menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function doTrineu(adr, x, y) {
// Obre finestra del trineu amb numSes
// adr del tipus 'campus/plsql/llistes.print_members?lid=5421&psid='
// Opcions: adr: obre amb dimensions predefinides
//          adr,x,y: obre en finestra nova de dimensions x i y
//          adr,'': carrega adr en el marc actual
//////////////////////////////////////////////////////////////
  var nargs = new Number(arguments.length);
  var xdef = new String('600');
  var ydef = new String('400');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }

  if((adr.indexOf('Incidencies.showIncidFromUOC?sid=')!='-1')||(adr.indexOf('usr.newincidfromUser?sid=')!='-1')) var numSes = obtNumSes('1');
  else var numSes = obtNumSes();

  var cgi = 'http://trineu.uoc.es:445/' + adr + numSes;
  if (nargs=='2') self.location= cgi;
  else var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=no,scrollbars=yes,status=yes');
}

function doWrite(to,cc,re,bo) {
// Obre una finestra amb un missatge preadre?t
// El camp 'bo' pot contenir unes paraules que apareixeran al cos del missatge. Per a textos
// m? extensos, cal passar el nom d'un fitxer .mail, que col.locarem al directori /home/tmp
// i que cont?el text del cos del missatge.
////////////////////////////////////////////////////////////////////////////////////////////
  var nargs = new Number(arguments.length);
  if(nargs<4) {
    cc = new String('');
    re = new String('');
    bo = new String('');
  }

  var cgi = new String();
  var numSes = obtNumSes();
  // if(bo.indexOf('.mail')==-1) cgi='/cgi-bin/bustia/wrte_fcnt0?s=' + numSes + '&l=pers&to=' + to + '&fr=&cc=' + cc + '&re=' + re + '&bo=' + bo;
  // else  cgi='/cgi-bin/bustia/wrte_fcnt0?s=' + numSes + '&to=' + to + '&fr=&cc=' + cc + '&re=' + re + '&fi=' + bo;

  if(bo.indexOf('.mail')==-1) cgi='/UOC/a/cgi-bin/ma_writeFS?s=' + numSes + '&l=pers&to=' + to + '&fr=&cc=' + cc + '&re=' + re + '&bo=' + bo + '&opId=new';
  else  cgi='/cgi-bin/bustia/wrte_fcnt0?s=' + numSes + '&to=' + to + '&fr=&cc=' + cc + '&re=' + re + '&fi=' + bo;


  var messWin = window.open(cgi,getWinNm(),'width=600,height=400,menubar=yes,resizable=no,scrollbars=yes,status=yes');
}

function statusMsg(msg) {
// Sense par?etre esborra l'status i amb par?etre mostra el missatge
//////////////////////////////////////////////////////////////////////
  var nargs = new Number(arguments.length);
  if(nargs<1) var msg = ' ';
  self.status = msg;
}

function mouseOver(msg) {
  self.status = msg;
}

function mouseOut(msg) {
// Sense par?etre esborra l'status i amb par?etre mostra el missatge
/////////////////////////////////////////////////////////////////////
  var nargs = new Number(arguments.length);
  if(nargs<1) msg = ' ';
  self.status = msg
}

function si(x) {
// si() i no() canvien la icona petita de la UOC
////////////////////////////////////////////////
  document.images[x].src="http://campus.uoc.es/mc-icons/blar.gif"
}

function no(x) {
  document.images[x].src="http://campus.uoc.es/mc-icons/bla.gif"
}

function carregaImatges() {
// Precarrega les imatges passades com a par?etre
//////////////////////////////////////////////////
  var llistaCarrega = new Array();
  var imatges = carregaImatges.arguments;
  if (document.images) {
    for (var i=0; i<imatges.length; i++) {
      llistaCarrega[i] = new Image;
      llistaCarrega[i].src = imatges[i];
    }
  }
}

function canviaImatge(imatge, nom) {
//Fa l'efecte de canviar la imatge existent per la passada com a par?etre.
//Cal haver-li donat nom a la imatge amb l'etiqueta 'name' de l'HTML
////////////////////////////////////////////////////////////////////
	if(self.document.images) self.document.images[nom].src = imatge;
}

function enrera() {
// Pot substituir l'history.back. Si t?history, fa un back; si ? finestra nova inicial,
// la tanca; si l'anterior ? l'entrada al campus, fa un reInici() (v.CLUB)
////////////////////////////////////////////////////////////////////////////////////////
  var wnom = new String(top.window.name);
  var historial = new Number(history.length);

  if(detectaVis()=='ne') historial = historial-1;

  if(historial>0) history.back();
  else {
    if(wnom!='') top.close();
    else reInici();
  }
}

function genDir(s) {
// Funci?gen?ica que retorna el nom del campus, la llengua o la ruta fins el nom
// del campus segons el par?etre passat. El protocol i el domini s'extreuen des
// del document amb location.protocol i location.hostname;
// Si hom crida la funci?des d'una plana d'informaci?associada (/ACRONIM/mat)
// agafa la llengua de la finestra top.main.claslist on es despleguen les aules.
//////////////////////////////////////////////////////////////////////////////////
  var ruta = location.pathname.split('/');
  if(ruta[2]=='mat') ruta = top.main.claslist.location.pathname.split('/');
  var r = new String();;

  switch(s) {
    case 'arrel'  : r = location.protocol + '//' + location.hostname;
                    break;
    case 'campus' : r = ruta[1];
                    break;
    case 'llengua': r = ruta[2];
                    break;
    default: break;
  }  
  return r;
}


function detectaVis() {
// Funci?gen?ica que retorna nom de codi del visualitzador
// Retorna 'ne' o 'ie'
////////////////////////////////////////////////////////////
  var s = new String();
  switch(navigator.appName) {
    case 'Netscape':  s = 'ne';
          break;
    case 'Microsoft Internet Explorer': s = 'ie';
          break;
    default: s = 'ie';
          break;
  }
  return s;
}

function reInici() {
// Torna a la plana d'inici tenint en compte la llengua del campus
//////////////////////////////////////////////////////////////////
  var numSes = obtNumSes();
  var adr = '/' + genDir('campus') + '/' + genDir('llengua') + '/extcgi_0.html?s=' + numSes + '&img=hola&cgi=hola';
  parent.location = adr;
}

function xatVeu(idv) {
	var adr = 'http://guatemala.uoc.es:8888/vchat/UOC/a/vchat/interface/EnterConnectionPublic.jsp?s=' + obtNumSes() + '&vid=' + idv;
	var accio = 'EnterConnection';
	var messWin = window.open(adr,accio,'width=600,height=500,menubar=no,resizable=no,scrollbars=no,status=no,location=no,toolbar=no');
}

/*
function obreBustia(lo,i1,i2,i3) {
  adr = new String();
  var nargs = new Number(arguments.length);
  var numSes = obtNumSes();
 
  if (numSes == 'extern') {
    alert ('Opci?no disponible');
    return;
  }

  if(nargs<2) i1 = new String('blanc.gif');
  if(nargs<3) i2 = new String('blanc.gif');
  if(nargs<4) i3 = new String('blanc.gif');

  adr = genDir('arrel') + '/' + genDir('campus') + '/' + genDir('llengua') + '/cgi-bin/activi/debat_0?s=' + numSes + '&l=' + lo + '&img1=' + i1 + '&img2=' + i2 + '&img3=' + i3;
  oWin(adr,'600','400');
}
*/

function obreBustia(lo,i1,i2,i3) {
// Obre el CONVERSATION amb l'adre? generada.
/////////////////////////////////////////////////////////////////
  adr = new String();
  var nargs = new Number(arguments.length);
  var numSes = obtNumSes();

  if(nargs<2) i1 = new String('blanc.gif');
  if(nargs<3) i2 = new String('blanc.gif');
  if(nargs<4) i3 = new String('blanc.gif');

  adr = genDir('arrel') + '/' + genDir('campus') + '/' + genDir('llengua') + '/cgi-bin/ma_mainMailFS?s=' + numSes + '&e=1&l=' + lo;
  window.open(adr,'','width=700,height=500,menubar,resizable,scrollbars,status');
}

function obreConv(lo) {
// Obre el CONVERSATION amb l'adre? generada.
/////////////////////////////////////////////////////////////////
  adr = new String();
  var numSes = obtNumSes();
  adr = genDir('arrel') + '/' + genDir('campus') + '/' + genDir('llengua') + '/cgi-bin/ma_mainMailFS?s=' + numSes + '&e=1&l=' + lo;
  window.open(adr,'','width=700,height=500,menubar,resizable,scrollbars,status');
}

function obreForum(f,a) {
// Si no se li han passat sessio, foum i arbre surt directement.
// Obre la b?stia amb l'adre? generada.
/////////////////////////////////////////////////////////////////
  adr = new String();
  var nargs = new Number(arguments.length);
  var numSes = obtNumSes();
  if(nargs<2) return;

  adr = genDir('arrel') + '/' + genDir('campus') + '/openforum.htm?s=' + numSes + '&tree=' + a  + '&for=' + f;
  oWin(adr,'600','400');
}

function obreDisc(lo,i1,i2,i3) {
// Si no se li han passat gifs de navegaci? hi assigna blanc.gif
// Obre l'espai de fitxers amb l'adre? generada.
/////////////////////////////////////////////////////////////////
  adr = new String();
  var nargs = new Number(arguments.length);
  var numSes = obtNumSes();
 
  if(nargs<2) i1 = new String('blanc.gif');
  if(nargs<3) i2 = new String('blanc.gif');
  if(nargs<4) i3 = new String('blanc.gif');

  //adr = genDir('arrel') + '/' + genDir('campus') + '/' + genDir('llengua') + '/cgi-bin/activi/fdebat_0?s=' + numSes + '&l=' + lo + '&img1=' + i1 + '&img2=' + i2 + '&img3=' + i3;
  //oWin(adr,'600','400');
adr = 'http://cv.uoc.edu/webapps/filearea/servlet/iuoc.fileserver.servlets.LoginFilearea?company=UOC&sessionId=' + numSes + '&lang=a&sto=' + lo + '&operation=login';
window.open(adr,getWinNm(),'scrollbars,menubar,status,resizable,width=700,height=450');
}

/*
20010914-dgarciaf-errorIE_activi_0.html?classes?
function openDebat(login,debatGif) {
 Utilitzada per UOC/a/varis/xvc Assemblea de La Virtual. Assimilada a obreBustia
  var numSes = obtNumSes();
  if (numSes == 'extern') {
    alert ('Opci?no disponible');
    return
  }
  var cgi = '/cgi-bin/activi/debat_0?s=' + numSes + '&l=' + login + '&img1=' + debatGif + '&img2=ser_coop.gif&img3=blanc.gif';
  var winNm = getWinNm();
  window.open(cgi,winNm,'width=600,height=400,menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}
*/

function openBusties(lad,lac) {
// Utilitzada per centres/tauler.htm . Pendent.
//////////////////////////////////////////////////////////////////////////////////
  var numSes = obtNumSes();
  self.location  = '/cgi-bin/activi/debats?s=' + numSes + '&d=' + lad + '&c=' + lac;
}

function doVota() {
// Utilitzada per UOC/a/varis/xvc Assemblea de La Virtual. Pendent de reducci?/////////////////////////////////////////////////////////
  var numSes = obtNumSes(1);  // Amb el par?etre 1 obt?el n? de sessi?antic.   
  var cgi = 'http://iglu.uoc.es:448/enq/plsql/enq.enq?s=' + numSes + '&codi=XVCVOT';
  var winNm = getWinNm();
  top.main.location = cgi;
}

function obreLlengua() {
// Genera el nom del servidor i del directori de campus, el qual serveix per a identificar
// el campus d'origen dins del web de llengua. Si no se li han passat gifs de navegaci?
// hi assigna blanc.gif. Obre la b?stia amb l'adre? generada.
/////////////////////////////////////////////////////////////////////////////////////////
  var x = new String('750');
  var y = new String('500');
  var numSes = obtNumSes('1');

  var cgi = genDir('arrel') + '/UOC/a/seu_central/llengua/index.html?s=' + numSes + '&e=' + genDir('campus');
  var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function doBiblioteca(s) {
// Obre la plana de biblioteca representada per <i>adr</i>
// Utilitza el document xina.uoc.es/comodin.html
//////////////////////////////////////////////////////////
  if(!s) s = genDir('campus');

  var appid = new String(s);
  var numSes = new String(top.logobar.document.IDs.session.value);
  var oldNumSes = new String(top.logobar.document.IDs.oldsession.value);
  var nom = new String('');
  var adr = new String('');
  var ho = new String('');

  if (location.hostname == 'uocadsl.uoc.es' )  var ho = 'bibadsl.uoc.es';
  else ho = 'xina.uoc.es';
  
  // Si la llengua des d'on s'obre es el castella, obre en castella sino en catala.
  
  if(genDir('llengua')=='b') adr = 'http://' + ho + '/cas/index.html';
  else adr = 'http://' + ho + '/cat/index.html';

  nom = 'sessio' + numSes + 'sessiovell' + oldNumSes + 'appid' + appid;
  var altura=screen.height;       var anchura=screen.width;
  var vent_x=770;                 var vent_y=500;
  var posx=(screen.width/2)-400;  var posy=(screen.height/2)-300;
  var finestra = window.open(adr,nom,'resizable=1,toolbar=1,location=0,directories=0,status=1,menubar=0,scrollbars=0,width=770,height=500,screenX='+posx+',screenY='+posy+',left='+posx+',top='+posy+'');
}

function doBibliotecaOld(url) {
   var numSes = obtNumSes();
   oWinSes('http://xina.uoc.es/comodin.html?s=' + numSes + '&p=' + url,600,400);
}

function posaFrames(url,pestanyes) {
// GOATE 17-12-2002
   var cadena = new String('');
   if (arguments.length >= 2) {
      if ((pestanyes.search(/t=/)!=-1)&&(top._user_type!='MEMBRE')&&(top._user_type!='SOCI_GRADUAT')) cadena+='/UOC/celler/navegacio/frames_multisecre.html?u='+url+'&p='+pestanyes;
      else cadena+='/UOC/celler/navegacio/frames.html?u='+url+'&p='+pestanyes;
      }
   else {
      cadena+='/UOC/celler/navegacio/frames.html?u='+url;
      }
   if (self.name=="cl_main") {
      self.parent.location=cadena;
      }
   else {
     if (self.name=="cl_submain") self.parent.parent.location=cadena;
     else self.location=cadena;
     }
}


function sona_wsa(f, x, y) {
  if(arguments.length<3) {
    var x = 100;
    var y = 25;
  }

  document.write('<APPLET ARCHIVE="AudioPlayer.jar" CODE=AudioPlayer.class width=' + x +' height=' + y + '">');
  document.write('<PARAM name=cabname value="AudioPlayer.cab">');
  document.write('<PARAM name=soundfilename value="');
  document.write(f);
  document.write('"<PARAM name="autoStart" value = "false">');
  document.write('"<PARAM name=loop value="false"></APPLET>');
}

function sona_ea(f, x, y) {
  if(arguments.length<3) {
    var x = 120;
    var y = 22;
  }

  document.write('<APPLET codebase="/UOC/a/audio/ea/" code=PlayerEmblaze.class id=menu width=' + x +' height=' + y + ' archive="PlayerEmblaze.jar">');
  document.write('<PARAM name=cabbase value="PlayerEmblaze.cab">');
  document.write('<PARAM name=soundfilename value="');
  document.write(f);
  document.write('"<PARAM name=loop value="1"></APPLET>');
}

function posar_registre_ac(){
//CDC
  document.write('<TABLE BORDER="0"><TR><TD><img src="/mc-icons/b2fg.gif" BORDER="0"> <a href="javascript:doTren(\'GAT_EXP.NOTESAVAL/notesaval_tren.notesaval\')">Consulta de Evaluaci? continuada</a></TD></TR></TD></TABLE>');
}

function obreBar(canal) {
//CDC
  var numSes = obtNumSes();
  var adr = '/servlet/InviteChannel?ACCEPT=TRUE&SESSIONID=' + numSes + '&CHANNELID=' + canal;
  top.winOpen(adr,'noprefix');
}

function obreAules(domini_pare) {
//CDC. Obre les aules d'un usuari
/////////////////////////////////
  var numSes = obtNumSes();
  parent.location = '/CDC/a/activi_0.html?s=' + numSes + '&c=none&d=' + domini_pare + '&t=aula&img=assignat';
}

function doBanner(origen) {
//CLUB
 var id= new Number(141223); // Li donem valor a causa del bug del default en Navigator.
	switch  (origen)	{				
		case "lavirtual": id=141518; break;
		case "borsa":
		case "forums":
		case "anuncis":			
		case "espais":  id=141223; break;
		case "home":    id=141220; break;
		default:        id=141223; break;
	}
 document.write('<table><tr>');
 document.write('<td><A HREF="http://adforce.imgis.com/?adlink|318|'+id+'|1|1|misc=NUMRAND;" TARGET=_blank><IMG SRC="http://adforce.imgis.com/?adserv|318|'+id+'|1|1|misc=NUMRAND;" BORDER=0 HEIGHT=60 WIDTH=468 NATURALSIZEFLAG=0 ALIGN=BOTTOM ALT="I-Network ad"></A></td>');
 document.write('</tr></table>');
}

/////////////////////////////////////////////////////////////////////////
// Banner(string0,url0,...,stringN,urlN) 
// Cada parell de par?etres corresp? al text i la url de cada link.
// string: Text del link
// url:    num?ic -> corresp? la variable saltar de /UOC/a/varis/uoc_saltar.html?s=
//		 /UOC/.. -> link relatiu
//		 http:// -> link extern
//
////////////////////////////////////////////////////////////////////////
function _Banner() {
//CLUB
var links = new Number((arguments.length)/2);
var cad = new String();
var url = new String();

document.write('<APPLET  code=panellCampus.class   codebase=/CLUB/a/club/java/   name=panellCampus  width=380   height=18>');
for(i=0,j=0;i<links;i++,j+=2) {
	cad+='<param name="string'+i+'" value="'+arguments[j]+'">';	
	url=arguments[j+1];
	
	// Si es tracta d'una url amb http fa la crida externa, si no li posa la url del campus actual	
	if(typeof(arguments[j+1])=='number') url='/CLUB/a/club/saltar.html?s='+url;
	if((url.substr(0,7)!="http://") && (url.charCodeAt(0)==47)) url=genDir('arrel')+url;	
	cad+='<param name="url'+i+'" value="'+url+'">';
}
document.write(cad);
document.write('<PARAM name=colorNorFont value="0,0,255">');
document.write('<PARAM name=colorAltFont value="255,0,0">');
document.write('<PARAM name=colorFons value="255,255,255">');
document.write('<PARAM name=nomFont value="Arial">');
document.write('<PARAM name=tipusFont value="1">');
document.write('<PARAM name=tamanyFont value="12">');
document.write('<PARAM name=sleep value="5">');
document.write('<PARAM name=delay value="500">');
document.write('</APPLET>');
}

//////////////////////////////////////////////////////////////
///////////// Banner_cat(string0,url0,...,stringN,urlN)
// Cada parell de par?etres corresp? al text i la url de cada link.
// string: Text del link// url:    num?ic -> corresp? la variable saltar de /DOCTORAT/a/docs/banner/saltar.html?s=
//		 /UOC/.. -> link relatiu
//		 http:// -> link extern///////////////////////
///////////////////////////////////////////////////
function Banner_cat() {var links = new Number((arguments.length)/2);
//DOCTORAT
var cad = new String();
var url = new String();
document.write('<APPLET  code=panellCampus.class   codebase=/CLUB/a/club/java/  name=panellCampus  width=500   height=15>');
for(i=0,j=0;i<links;i++,j+=2)
 {	cad+='<param name="string'+i+'" value="'+arguments[j]+'">';
 		url=arguments[j+1];		// Si es tracte d'una url amb http fa la crida externa, si no li posa la url del campus actual
 			if(typeof(arguments[j+1])=='number') url='/DOCTORAT/a/docs/banner/saltar.html?s='+url;
 				if((url.substr(0,7)!="http://") && (url.charCodeAt(0)==47)) url=genDir('arrel')+url;
 						cad+='<param name="url'+i+'" value="'+url+'">';
 					}
 document.write(cad);document.write('<PARAM name=colorContorn value="239,247,255">');
 document.write('<PARAM name=quadrat value="true">');
 document.write('<PARAM name=genFons value="255,255,255">');
 document.write('<PARAM name=colorNorFont value="255,0,0">');
 document.write('<PARAM name=colorAltFont value="255,0,0">');
 document.write('<PARAM name=colorFons value="255,255,255">');
 document.write('<PARAM name=nomFont value="Arial">');
 document.write('<PARAM name=tipusFont value="1">');
 document.write('<PARAM name=tamanyFont value="11">');
 document.write('<PARAM name=sleep value="5">');
 document.write('<PARAM name=delay value="500">');
 document.write('</APPLET>');
 }


//////////////////////////////////////////////////////////////
///////////// Banner_cast(string0,url0,...,stringN,urlN)
// Cada parell de par?etres corresp? al text i la url de cada link.
// string: Text del link// url:    num?ic -> corresp? la variable saltar de /DOCTORAT/b/docs/banner/saltar.html?s=
//		 /UOC/.. -> link relatiu
//		 http:// -> link extern///////////////////////
///////////////////////////////////////////////////
function Banner_cast() {var links = new Number((arguments.length)/2);
//DOCTORAT
var cad = new String();
var url = new String();
document.write('<APPLET  code=panellCampus.class   codebase=/CLUB/a/club/java/  name=panellCampus  width=520   height=15>');
for(i=0,j=0;i<links;i++,j+=2)
 {	cad+='<param name="string'+i+'" value="'+arguments[j]+'">';
 		url=arguments[j+1];		// Si es tracte d'una url amb http fa la crida externa, si no li posa la url del campus actual
 			if(typeof(arguments[j+1])=='number') url='/DOCTORAT/b/docs/banner/saltar.html?s='+url;
 				if((url.substr(0,7)!="http://") && (url.charCodeAt(0)==47)) url=genDir('arrel')+url;
 						cad+='<param name="url'+i+'" value="'+url+'">';
 					}
 document.write(cad);document.write('<PARAM name=colorContorn value="239,247,255">');
 document.write('<PARAM name=quadrat value="true">');
 document.write('<PARAM name=genFons value="255,255,255">');
 document.write('<PARAM name=colorNorFont value="255,0,0">');
 document.write('<PARAM name=colorAltFont value="255,0,0">');
 document.write('<PARAM name=colorFons value="255,255,255">');
 document.write('<PARAM name=nomFont value="Arial">');
 document.write('<PARAM name=tipusFont value="1">');
 document.write('<PARAM name=tamanyFont value="11">');
 document.write('<PARAM name=sleep value="5">');
 document.write('<PARAM name=delay value="500">');
 document.write('</APPLET>');
 }

function linkDoc(text,url) {
//DOCTORAT
  if (navigator.appName == "Netscape")  {
    document.write('<A HREF="'+url+'">'+text+'</A>');
  }
  else {
    document.write('<A HREF="'+url+'" TARGET="_blank">'+text+'</A>');
  }
}

function doHit(plana){
	var numSes = obtNumSes();
	var codi = new String();
  if (plana == null) plana = location.pathname;
  codi = '<IMG SRC=http://cv.uoc.edu/servlet/Hit?s=' + numSes + '&plana=' + plana + ' WIDTH=0 HEIGHT=0>';
	document.write(codi);
}

// Funci?per obrir l'Ajuda del Campus contextualment
function obreHelp(gif) {
	var nargs = new Number(arguments.length);	
	var numSes;
	if(top._langRel) lang=top._langRel.substring(1,2); // Pren l'idioma del top.
	else lang='a';
	if (top._user_app) appid=top._user_app;	// Pren el directori on resideix l'entorn del top.	
        else appid='UOC';
	if(nargs<1) gif='help';
	numSes = obtNumSes('1');	
	var cgi = '/'+appid+'/'+lang+'/ajuda/index.html?s='+ numSes + '&gif='+gif;	 	
	var winNm = getWinNm();
	var messWin = window.open(cgi,winNm,'width=750,height=550,menubar=no,resizable=no,scrollbars=yes,status=yes');
}

function doFaq(node) {
// Obre una finestra amb les FAQs del CUC d'una opci?final concreta.
// node: ? el codi del node final a mosrtar les FAQs
// Poden obternir-se els n? de node a CUC - Manteniments - Ordena les FAQs
//////////////////////////////////////////////////////////////
 var p = new String(''); 
 var numSes;
 var nargs = new Number(arguments.length);
 var xdef = new String('750');
 var ydef = new String('450');   
 
 if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
 }
bloq=1;
if (bloq==0) alert('Durant el dia d\'avui aquesta aplicaci?romandr?fora de servei per tasques de manteniment. Disculpeu-nos les mol?ties.');
else {
 p='http://cv.uoc.edu/tren/trenacc?s=';
 if (window.name == 'frm_preview')
{
	var s_nou = top.logobar.document.IDs.session.value;
	var s_vell = top.logobar.document.IDs.oldsession.value;
	numSes = s_nou; 
}
else
{       if (window.name == 'frm_viewMssgHead') {
	   s_nou = parent.opener.top.logobar.document.IDs.session.value;
	   s_vell = parent.opener.top.logobar.document.IDs.oldsession.value;
	   numSes = s_nou; 
        }
        else  numSes=obtNumSes();
} 


 var cgi = p + numSes + '&modul=CUC.FAQS_OPCION/faqs_opcion.consultafaqs&pArgumentos=*&pValores=*&institucio=CO&popcio='+node+'&pagina=FP_FAQSPROCESO';
 var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}
}

function doNouRac(semestre,modul)
{var nargs = new Number(arguments.length);
 var numSes = obtNumSes();
 if (nargs > 0) semestre='&anyAcademic='+semestre;
 if (nargs > 1) modul='&modul='+modul;
 semestre = '&anyAcademic=20101';
 
 //var cgi = '/webapps/rac/viewSecretaria.action?s='+numSes+semestre+modul;
 var cgi = '/webapps/rac/viewSecretaria.action?s='+numSes+modul;
 var winNm = getWinNm();
 window.open(cgi,winNm,'scrollbars,menubar,status,resizable,width=700,height=500'); 
}

function doNouRacPG(semestre)
{
 var nargs = new Number(arguments.length);
 var sem = '&anyAcademic=20111';
 if (nargs>0) sem='&anyAcademic='+semestre;
 
 var numSes = obtNumSes();
 //var cgi = '/webapps/classroom/062_common/racEstudiant.jsp?s='+numSes+sem;
 var cgi = 'http://'+location.hostname+'/webapps/rac/listEstudiant.action?s='+numSes+sem;
 var winNm = getWinNm();
 window.open(cgi,winNm,'scrollbars,menubar,status,resizable,width=700,height=500'); 
}

function marca_aplicacio(adr) {
var cadena = '';
cadena+=document.location;
inici=cadena.indexOf("//");
cadena=cadena.substr(inici+3,cadena.length);
inici=cadena.indexOf("/");
fi=cadena.lastIndexOf("/");
cadena=cadena.substring(inici,fi+1);
cadena=cadena+'aplicacio/'+adr;
urchinTracker(cadena);
}

// Obre la fitxa de l'expedient PG
function doExpPG_antic(){
 var p = new String(''); 
 var nargs = new Number(arguments.length);
 var xdef = new String('800');
 var ydef = new String('450');

 if(nargs<4) {
    x = new String(xdef);
    y = new String(ydef);
 }
 var numSes = obtNumSes();  
 var userid;
 if(top.logobar==null) { 
    userid = parent.opener.top.logobar.document.IDs.uid.value;
    }
   else {
    userid = top.logobar.document.IDs.uid.value;
  }
  
 var adr='&entidad_gestora=UOC&modul=ADN.MOSTRAR_FICHA&tipo_identificador='+'USER_ID&codi_identificador='+userid+'&tipo_ficha=PG&logo=S';
 var cgi = 'http://'+location.hostname+'/tren/trenacc?s=' + numSes + adr;
  var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function doExpPG(){
 var p = new String(''); 
 var nargs = new Number(arguments.length);
 var xdef = new String('800');
 var ydef = new String('450');

 if(nargs<4) {
    x = new String(xdef);
    y = new String(ydef);
 }
 var numSes = obtNumSes();  

 var userid;
 if(top.logobar==null) { 
    userid = parent.opener.top.logobar.document.IDs.uid.value;
    }
   else {
    userid = top.logobar.document.IDs.uid.value;
  }

 var url = 'http://'+location.hostname+'/webapps/seleccioexpedient/cerca.html?s=' + numSes;
  var messWin = window.open(url,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}


function doUrlSes(url , x , y) {

   var p = new String(''); 
   var nargs = new Number(arguments.length);
   var xdef = new String('750');
   var ydef = new String('450');   

 if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
 }

 p='https://';
 var numSes = obtNumSes();  // Amb el par?etre 1 obt?el n? de sessi?antic. 
 var cgi = p + location.hostname + url + '&s=' + numSes;

 if (nargs=='2')  self.location= p + location.hostname + url + '&s=' + numSes;
 else var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function getTopParams(pStr)
{
  var dls = pStr || top.document.location.search;
  var idx = dls.indexOf('?');
  var params = [];
  if (idx != -1)
  {
    var pairs = dls.substring(idx+1, dls.length).split('&');
    for (var i=0; i<pairs.length; i++)
    {
      nameVal = pairs[i].split('=');
      params[unescape(nameVal[0])] = unescape(nameVal[1]);
    }
  }
  return params;
}


function anar_inici( theApp, theLang ){
  var params = getTopParams();
  var ap = '';
  theApp='UOC';
  theLang='a';
  if (params['newStartingPage']) {
    ap = '?newStartingPage=' + params['newStartingPage'];
  }
  var ns = new String();
// Assigna els valors de sessi\363 segons el tipus de finestra
  if(top.logobar==null) {
    ns = top.window.name.substring(0,128);
  }
  else {
    ns = top.logobar.document.IDs.session.value;
  }


//  url='http://cv.uoc.edu/UOC/a/extcgi_0.html?s='+ns+'&img=hola&cgi=hola';
  url='/' + theApp + '/' + theLang +'/extcgi_0.html?s='+ns+'&img=hola&cgi=hola'+ap;
  if (self.parent.frames.length != 0)
  self.parent.location=url;
}

function canvi_idioma(idioma)
{
  var cad=''+document.location;
  var desti="/"+idioma+"/";
  var origen='';
  if (cad.indexOf("/a/")!=-1) origen="/a/";
  else if (cad.indexOf("/b/")!=-1) origen="/b/";
  else if (cad.indexOf("/c/")!=-1) origen="/c/";
  else origen=-1;
  if (origen!=-1) {
    cad=cad.replace(origen,desti);
    document.location=cad;
	}
}


var isExtended = false;

function slideSideBar(){
	if(!isExtended){
		//new Effect.Morph('llegenda', { style: 'right:0px', duration: 1.5 });
		new Effect.Morph('contingut-llegenda', { style: 'width:391px', duration: 1.5 });
		Effect.Appear('contingut-llegenda', { duration: 1.5 });
		$('pestanya').childElements()[0].src = $('pestanya').childElements()[0].src.replace(/(\.[^.]+)$/, '-tancar$1');
		isExtended = true;
	}
	else{
		//new Effect.Morph('llegenda', { style: 'right:-390px', duration: 1.5 });
		new Effect.Morph('contingut-llegenda', { style: 'width:0px', duration: 1.5 });
		Effect.Fade('contingut-llegenda', { duration: 1.5 });
		$('pestanya').childElements()[0].src = $('pestanya').childElements()[0].src.replace(/-tancar(\.[^.]+)$/, '$1');
		isExtended = false;
	}
}

document.observe('dom:loaded', function(){
	Event.observe('llegenda', 'click', slideSideBar, true);
});




function getWinNm() {
// Genera un nom de finestra per a poder-ne obrir m? d'una
///////////////////////////////////////////////////////////
  var now = new Date();
  var hr = new String(now.getHours());
  var mn = new String(now.getMinutes());
  var sc = new String(now.getSeconds());
  var ms = new String(now.getMilliseconds());
  var winNm = hr + mn + sc + ms;
  return winNm;
}

function obtePerfil(tipus,format)
// retorna dades de perfils de l'usuari segons el par?etre que se li passi.
// 'entorn' -> Retorna l'appid; 'perfil' -> Retorna l'usertypeid; 'subperfil' -> Retorna la descripci?del usersubtypeid
// 'tots' -> Retorna la concatenaci?entorn/perfil/descripci?supperfil
{   var nargs = new Number(arguments.length);
    if (nargs <2) format='';
    var cad_perf = new String('');
	var tipus_tmp = new String('');
	var entorn = new String('');var perfil = new String('');var subperfil = new String('');var tots = new String('');
	tipus_tmp=""+top.window.name;
  s=""+tipus_tmp; q=s.search(/entorn/);
  if (window.name=='frm_viewMssgHead') {
  	        entorn=parent.opener.top._user_app; perfil=parent.opener.top._user_type; subperfil=parent.opener.top._user_subtype;
           }
  else {
      if(top.logobar==null||q!=-1) {
          for(i=0;i<10;i++){
            tipus_tmp=tipus_tmp.replace('charespai',' '); tipus_tmp=tipus_tmp.replace('charcoma',',');
            tipus_tmp=tipus_tmp.replace('charpunt','.');  tipus_tmp=tipus_tmp.replace('charmajor','>');
            tipus_tmp=tipus_tmp.replace('chararroba','@');tipus_tmp=tipus_tmp.replace('charampersand','&');
            tipus_tmp=tipus_tmp.replace('charpuntcoma',';'); tipus_tmp=tipus_tmp.replace('chartancat','?');
            tipus_tmp=tipus_tmp.replace('charobert','`'); tipus_tmp=tipus_tmp.replace('chardollar','$');
            }
        s=""+tipus_tmp;
        q=s.search(/entorn/); t=s.search(/perfil/); p=s.search(/subperfil/);
        if (t==-1||q==-1) {}
        else { entorn=s.substring(q+6,t);}
        if (p==-1) {}
        else {perfil=s.substring(t+6,p); subperfil=s.substring(p+9,s.length);}
   		  }
      else {entorn=top._user_app; perfil=top._user_type; subperfil=top._user_subtype; }
   	   }
   	
   switch(tipus) {
   	     case 'entorn': cad_perf+=entorn; break;
         case 'perfil': cad_perf+=perfil; break;
         case 'subperfil': cad_perf+=subperfil; break;
         case 'tots': if (format=='guio') cad_perf+=entorn + '-' + perfil + '-' + subperfil;
		              else cad_perf+=entorn + '/' + perfil + '/' + subperfil;
                      if (cad_perf=='//') cad_perf='';
                      break;
         default : cad_perf+=perfil; break;
    }	
 return(cad_perf);
}

function oWin(adr, x, y, z) {
// Obre una finestra nova amb els par?etres passats o per defecte.
// El par?etre 'z' obre una finestra sense barres d'estat ni botons.
// Passa tamb?informaci?del perfil en el window name.
////////////////////////////////////////////////////////////////////
/* Exemples de crida
adr             oWin('blanc.htm')
adr,x,y         oWin('blanc.htm', '100', '100')
*/

  var nargs = new Number(arguments.length);
  var xdef = new String('750');
  var ydef = new String('450');
	var zdef = new String('0');
	var propietats = new String('');
	var cad_temp = new String('');

	if(nargs<4) z = zdef;
  if((nargs<3)||(x=='')) {
    x = new String(xdef);
    y = new String(ydef);
  }
	switch(z) {
		case '0': propietats = ',menubar=yes,resizable=yes,scrollbars=yes,status=yes';
							break;
		case '1': propietats = ',menubar=no,resizable=yes,scrollbars=yes,status=no';
							break;
		case '2': propietats = ',menubar=yes,toolbar=yes,resizable=yes,scrollbars=yes,status=yes';
							break;
		default:	propietats = ',menubar=yes,resizable=yes,scrollbars=yes,status=yes';
	}
	var cad_temp = 'entorn' + obtePerfil('entorn') + 'perfil' + obtePerfil('perfil') + 'subperfil' + obtePerfil('subperfil');
	var perfils='';
  for(i=0;i<cad_temp.length;i++)
   { switch(cad_temp.substring(i,i+1)){
         case ' ': perfils+='charespai'; break;
         case '.': perfils+='charpunt'; break;
         case ',': perfils+='charcoma'; break;
         case '>': perfils+='charmajor'; break;
         case '@': perfils+='chararroba'; break;
         case '&': perfils+='charampersand'; break;
         case ';': perfils+='charpuntcoma'; break;
         case '?': perfils+='chartancat'; break;
         case '`': perfils+='charobert'; break;
		 case '$': perfils+='chardollar'; break;
         default : perfils+=cad_temp.substring(i,i+1); break;
      }
   }
  perfils=getWinNm()+perfils;
  var messWin = window.open(adr,perfils,'width='+ x + ',height=' + y + propietats);
}

function obtNumSesOld(s) {
// Obt?el numero de sessi?del frame 'logobar', si existeix, i si no del top.window.name
// Automatitza l'obtenci?del numSes independentment de si la finestra ha estat oberta
// amb oWinSes o amb oWinName
// s='1' retorna l'oldsession. s='2' retorna una cadena amb session + oldession.
///////////////////////////////////////////////////////////////////////////////////////// 
  var nargs = new Number(arguments.length);
  var ns = new String();
  var s_nou = new String(''); var s_vell = new String('');

  if (nargs<1) s = '0';

// Assigna els valors de sessi?segons el tipus de finestra
  if(top.logobar==null) { 
    if (parent.opener.top._sessionid) {
        s_nou = parent.opener.top._sessionid;
        s_vell = '';
    }
    // comprovar si estem en segon nivell
    else {
      if (parent.opener.opener && parent.opener.opener.top._sessionid) {
        s_nou = parent.opener.opener.top._sessionid;
        s_vell = '';
      }
      else {
        if (window.name=='frm_viewMssgHead') {
           s_nou = parent.opener.top.logobar.document.IDs.session.value;
           s_vell = parent.opener.top.logobar.document.IDs.oldsession.value;
        }
        else {
           s_nou = top.window.name.substring(0,128);
           s_vell = top.window.name.substring(128,top.window.name.length);
        }
      }
    }
  }
  else {
    s_nou = top.logobar.document.IDs.session.value;
   if (document.getElementById(top.logobar.document.IDs.oldsession)) 
      s_vell = top.logobar.document.IDs.oldsession.value; 
  }

// Retorna session, oldsession o tots dos segons el par?etre passat.
  switch(s) {
    case '0': ns = s_nou;
              break;
    case '1': ns = s_vell;
              break;
    case '2': ns = s_nou + s_vell;
              break;
    default:  break;
  }
  return ns;
}

function obtNumSes(s) {
  var nargs = new Number(arguments.length);
  var ns = new String();
  var s_nou = new String(''); var s_vell = new String('');
  var trobada=0;
  if (nargs<1) s = '0';
  // Assigna els valors de sessi?segons el tipus de finestra
  
  if(top.logobar==null) { 
    
  var win = window;
  var te = true;
  while (win != null) {
                if (win.top.logobar) {
                        s_nou = win.top.logobar.document.IDs.session.value;
						if (document.getElementById(win.top.logobar.document.IDs.oldsession)) 
						     s_vell = win.top.logobar.document.IDs.oldsession.value; 						
						trobada=1;
                }
				if (win.top.opener) win = win.top.opener;
				else  break;
        }
  if(!trobada) { 
           s_nou = top.window.name.substring(0,128);
           s_vell = top.window.name.substring(128,top.window.name.length);
		   trobada=1;
    }
  }
 else { 
  s_nou = top.logobar.document.IDs.session.value;
  if (document.getElementById(top.logobar.document.IDs.oldsession)) 
      s_vell = top.logobar.document.IDs.oldsession.value; 
  } 
// Retorna session, oldsession o tots dos segons el par?etre passat.
  switch(s) {
    case '0': ns = s_nou; break;
    case '1': ns = s_vell; break;
    case '2': ns = s_nou + s_vell; break;
    default:  break;
  }
  return ns;
}


function oWinSes(adr, x, y) {
// Obre una finestra nova amb numSes
// Passa tamb?informaci?del perfil en el window name
////////////////////////////////////
  var nargs = new Number(arguments.length);
  var xdef = new String('750');
  var ydef = new String('450');
  var cad_temp = new String('');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }
  var cad_temp = 'entorn' + obtePerfil('entorn') + 'perfil' + obtePerfil('perfil') + 'subperfil' + obtePerfil('subperfil');
	var perfils='';
  for(i=0;i<cad_temp.length;i++)
   { switch(cad_temp.substring(i,i+1)){
         case ' ': perfils+='charespai'; break;
         case '.': perfils+='charpunt'; break;
         case ',': perfils+='charcoma'; break;
         case '>': perfils+='charmajor'; break;
         case '@': perfils+='chararroba'; break;
         case '&': perfils+='charampersand'; break;
         case ';': perfils+='charpuntcoma'; break;
         case '?': perfils+='chartancat'; break;
         case '`': perfils+='charobert'; break;
		 case '$': perfils+='chardollar'; break;
         default : perfils+=cad_temp.substring(i,i+1); break;
      }
   }
  perfils=getWinNm()+perfils;
  var numSes = obtNumSes();
  var cgi = '/FinestraNova.html?s=' + numSes + '&htm=' + adr + '&appid=' + genDir('campus');
  var messWin = window.open(cgi,perfils,'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}


function oWinName(adr, x, y) {
// Com oWin per?posa el numSes en el window.name
//////////////////////////////////////////////////
/* Exemples de crida
adr             oWin('blanc.htm')
adr,x,y         oWin('blanc.htm', '100', '100')
*/

  var nargs = new Number(arguments.length);
  var xdef = new String('750');
  var ydef = new String('500');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }    
  
  var messWin = window.open(adr,obtNumSes('2'),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}


function oWinSesName(adr, x, y) {
// Obre una finestra nova amb numSes al top.logobar i al window.name.
////////////////////////////////////////////////////////////////////////
  var nargs = new Number(arguments.length);
  var xdef = new String('750');
  var ydef = new String('500');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }  
  var numSes=obtNumSes();    
  var cgi = '/FinestraNova.html?s=' + numSes + '&htm=' + adr + '&appid=' + genDir('campus');
  var messWin = window.open(cgi,obtNumSes('2'),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function _oWinSesName(adr, x, y) {
// Obre una finestra nova amb numSes. Cal passar el cam?complet d'adr
/////////////////////////////////////////////////////////////////////
  var nargs = new Number(arguments.length);
  var xdef = new String('750');
  var ydef = new String('500');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }

  var numSes = obtNumSes();
  var cgi = '/UOC/a/informacio/cercador/FinestraNova2.html?s=' + numSes + '&htm=' + adr;
  var messWin = window.open(cgi,numSes,'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function oWinSesLogo(adr, x, y) {
  var nargs = new Number(arguments.length);
  var xdef = new String('750');
  var ydef = new String('450');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }

  var numSes = obtNumSes();
//  var cgi = '/UOC/a/informacio/cercador/FinestraNova.html?s=' + numSes + '&htm=' + adr + '&appid=';
  var cgi = '/FinestraNova.html?s=' + numSes + '&htm=' + adr + '&appid=';
  var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');

}


function oWinBotons(adr, x, y) {
// Obre una finestra nova amb els par?etres passats o per defecte.
//////////////////////////////////////////////////////////////////
/* Exemples de crida
adr             oWin('blanc.htm')
adr,x,y         oWin('blanc.htm', '100', '100')
*/

  var nargs = new Number(arguments.length);
  var xdef = new String('750');
  var ydef = new String('450');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }

  var messWin = window.open(adr,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,statusbar=yes,toolbar=yes,status=yes');
}

function avisEspera(msg, x, y) {
  var inici_html = "<html>\n<head>\n<title></title>\n</head>\n<body bgcolor=\"#fff5e0\">\n\n<font face=\"Arial\" size=\"-1\">\n";
  var final_html = "\n</font>\n<p align=\"center\"><a HREF=\"javascript:self.close()\"><img src=\"/UOC/a/mc-icons/sortir.gif\" border=0></a></p>\n\n</body>\n</html>";
  var s = inici_html + msg + final_html;

  var nargs = new Number(arguments.length);
  var xdef = new String('400');
  var ydef = new String('200');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }
  var messWin = window.open('',getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');

  d = messWin.document;
  d.open();  d.write(s);  d.close();
}

function doTren(adr, x, y) {
// Obre finestra del tren amb numSes
// adr del tipus 'GAT_EXP.DADESBANC/dadesbanc_tren.dadesbanc'
// Opcions: adr: obre amb dimensions predefinides
//          adr,x,y: obre en finestra nova de dimensions x i y
//          adr,'': carrega adr en el marc actual
//////////////////////////////////////////////////////////////
 var p = new String(''); 

 var nargs = new Number(arguments.length);
 var xdef = new String('750');
 var ydef = new String('450');   

 if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
 }

 p='https://';
 if (adr=='GAT_EXP.CONSMATASIG'||adr=='GAT_EXPIB.CONSMATASIG') p='http://';
 
 var numSes = obtNumSes();  // Amb el par?etre 1 obt?el n? de sessi?antic. 
 var cgi = p + location.hostname + '/tren/trenacc?s=' + numSes + '&modul=' + adr;

 if (nargs=='2')  self.location= p + location.hostname + '/tren/trenacc?s=' + numSes + '&modul=' + adr;
 else var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function doTrenEntorn(adr, x, y) {
var adr_trad = new String(''); 
var nargs = new Number(arguments.length);
var xdef = new String('750');
var ydef = new String('450');   
var appid = new String('');
if(nargs<3) { x = new String(xdef);  y = new String(ydef); }
if (top._user_app) appid=top._user_app;	// Pren el directori on resideix l'entorn del top.	
else appid='UOC';

adr_trad=adr;		
if (appid=='UOC2000') {
 if (adr_trad.indexOf('GAT_EXP.')!=-1) adr_trad=adr_trad.replace('GAT_EXP','GAT_EXPIB');
 //if (adr=='GAT_EXP.PAPERETES/paperetes.paperetes') adr_trad='GAT_EXPIB.PAPERETES/paperetes.paperetes';
}
 
 doTren(adr_trad,x,y);
}
 
function doWebapps(adr, x, y) {
// Obre finestra d'aplicacions webapps 
//          adr,x,y: obre en finestra nova de dimensions x i y
//          adr,'': carrega adr en el marc actual
//////////////////////////////////////////////////////////////
 var p = new String(''); 
 var adr_aux = new String('');
 var adr_part1 = '';
 var adr_part2 = '';
 var cadena = '';
 
 
 var nargs = new Number(arguments.length);
 var xdef = new String('750');
 var ydef = new String('450');   
 var numSes = obtNumSes();  // Amb el par?etre 1 obt?el n? de sessi?antic. 

 if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
 }

 p='http://';
 
 cadena+=adr;
 interrogant=cadena.indexOf("?");
 ampersand=cadena.indexOf("&");
 if (interrogant==-1) { 
	if (ampersand==-1) { 
		adr_aux = adr + '?s=' + numSes;
	}
	else {
	    adr_part1=cadena.substring(0,ampersand);
		adr_part2=cadena.substring(ampersand,cadena.length);
		adr_aux = adr_part1 + '?s=' + numSes + adr_part2;
	}
 }
 else  adr_aux = adr + '&s=' + numSes;
    
 
 var cgi = p + location.hostname + adr_aux;

 if (nargs=='2')  self.location= p + location.hostname + adr_aux;
 else var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function doWebappsParam(adr, param, x, y) {
// Obre finestra d'aplicacions webapps 
//          adr,x,y: obre en finestra nova de dimensions x i y
//          adr,'': carrega adr en el marc actual
//////////////////////////////////////////////////////////////
 var p = new String(''); 

 var nargs = new Number(arguments.length);
 var xdef = new String('750');
 var ydef = new String('450');   

 if(nargs<4) {
    x = new String(xdef);
    y = new String(ydef);
 }

 p='http://';
 
 var numSes = obtNumSes();  // Amb el par?etre 1 obt?el n? de sessi?antic. 
 var cgi = p + location.hostname + adr +'?s=' + numSes + param;

 if (nargs=='3')  self.location= p + location.hostname + adr +'?s=' + numSes + param;
 else var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function doTrenHelp(adr, help, x, y) {
// Obre finestra del tren amb numSes i amb help
// adr del tipus 'GAT_EXP.DADESBANC/dadesbanc_tren.dadesbanc'
// Opcions: adr: obre amb dimensions predefinides
//          adr,x,y: obre en finestra nova de dimensions x i y
//          adr,'': carrega adr en el marc actual
//////////////////////////////////////////////////////////////
 var p = new String('');

 var nargs = new Number(arguments.length);
 var xdef = new String('750');
 var ydef = new String('450');

 if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
 }

 p='https://';
 var numSes = obtNumSes();  // Amb el par\340metre 1 obt\351 el n\272 de sessi\363 antic.
 var cgi = p + location.hostname + '/tren/trenacc?s=' + numSes + '&modul=' + adr;
 var messWin = window.open('/UOC/trenInit.html?url='+cgi+'&help='+help,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}


function doPla(any,codi,lang, x, y)
// Obre la fitxa del pla docent d'una assignatura
// any:  Any acad?ic. Ex: 20031
// codi: Codi assignatura. Ex: 05.001
// lang: Idioma. Ex: CAT
// x,y:  dimensions de la finestra x i y
{
 var nargs = new Number(arguments.length);
 var xdef = new String('750');
 var ydef = new String('450');
 if(nargs<4) {
    x = new String(xdef);
    y = new String(ydef);
 }
 
 //var url="http://cv.uoc.edu/tren/trenacc/web/GATILLO.PLANDOCENTE?" + "any_academico="+ any + "&cod_asignatura="+codi+"&idioma="+lang+"&pagina=PD_PREV_SECRE";
 var url="http://"+ location.hostname + "/tren/trenacc/web/GAT_EXP.PLANDOCENTE?" + "any_academico="+ any + "&cod_asignatura="+codi+"&idioma="+lang+"&pagina=PD_PREV_SECRE&cache=S";
 var messWin = window.open(url,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');	
}

function doIglu(adr, x, y) {
// Obre finestra del tren amb numSes
// adr del tipus 'trameses/plsql/tramweb.dades'
///////////////////////////////////////////////////////////
  var nargs = new Number(arguments.length);
  var xdef = new String('750');
  var ydef = new String('450');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }

  var numSes = obtNumSes(1);  // Amb el par?etre 1 obt?el n? de sessi?antic.   
  var cgi = 'http://iglu.uoc.es:448/' + adr + '?s=' + numSes;
  var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function doPrefer(opcio, tema) {
// Canvia les prefer?cies
// En lloc d'escriure-les amb javascript, ho fem en HTML per a poder aplicar estils m? f?ilment.
/////////////////////////////////////////////////////////////////////////////////////////////////
  var adr = new String();
  var ruta = new String('/cgi-bin/comuni/');

  var nargs = new Number(arguments.length);
  if(nargs<2) tema = new String('');
  else tema = '&t=' + tema;

  adr = ruta + opcio + '?s=' + obtNumSes() + tema;
  self.document.URL = adr;
}

function doVirtual(s) {
  var lang = new String(s);
  var nom = new String();
  var numSes = new String(top.logobar.document.IDs.session.value);
  var oldNumSes = new String(top.logobar.document.IDs.oldsession.value);

  nom = 'sessio' + numSes + 'sessiovell' + oldNumSes + 'lang' + lang;
  var adr = 'http://www.lavirtual.com/lavirtual.htm?lang=' + lang + '&s=' + numSes;
  var altura=screen.height; 
  var anchura=screen.width;
  var vent_x=770;
  var vent_y=500;
  var posx=(screen.width/2)-400;
  var posy=(screen.height/2)-300;
  var finestra =
window.open(adr,nom,'resizable=1,toolbar=1,location=0,directories=0,status=1,menubar=0,scrollbars=0,width=770,height=500,screenX='+posx+',screenY='+posy+',left='+posx+',top='+posy+'');
}

function inclou_css(css_explorer, css_netscape) {
// Aquesta funci?importa el css que se li passi per par?etre. El primer 
// par?etre es el css per explorer i el segon per netscape. Si s'en posa
// nom? un, ser?el css per tots dos navegador. Si no posem cap par?etre
// els css incl? es /UOC/uoc.css

  var quin_css='/UOC/uoc.css';
  var nargs = new Number(arguments.length);
  var unitat_local= 'file:///Q:';
  var tmp= location.href;
  if(nargs==1) quin_css=css_explorer;
  if(nargs==2)
   {  	if (navigator.appName == "Netscape") quin_css=css_netscape;
  	else quin_css=css_explorer;
   }

  if((tmp.indexOf('file:')>-1 || tmp.charAt(1)==':') && (quin_css.charAt(0)=='/')) {
		quin_css=unitat_local+quin_css;
	}
	document.write('<link rel="stylesheet" href="'+ quin_css +'" type="text/css">');
}

function doAjuda(num) {
// Obre una plana d'obertura i consulta d'incid?cies per a l'usuari actual
// El par?etre num ? el n?mero de sessi? sin?es passa, s'obt?el n? antic amb la funci?obtNumSes('1');

	var nargs = new Number(arguments.length);
	var numSes;
	if(nargs<1) numSes = obtNumSes('1');  else  numSes = num;    
    	//var cgi = 'http://argentina.uoc.es/incidenciescv/pls/usr.NewIncidFromUser?sid='+ numSes;
	var cgi = 'http://'+ location.hostname +'/incidenciescv/pls/usr.NewIncidFromUser?sid='+ numSes;
	//var cgi = 'http://trineu.uoc.es/incidenciescv/pls/usr.NewIncidFromUser?sid='+ numSes;
	var winNm = getWinNm();
	var messWin = window.open(cgi,winNm,'width=600,height=450,menubar=no,resizable=no,scrollbars=yes,status=yes');
}

function doUser(num) {
//Funci?necess?ia per a que aparegui el formulari d'incid?cia d'Ajuda Inform?ica
	var nargs = new Number(arguments.length);
	var numSes;
	if(nargs<1) numSes = obtNumSes('1');  else  numSes = num;      	
	//var cgi = 'http://argentina.uoc.es/incidenciescv/pls/usr.NewIncidFromUser?sid='+ numSes;
	//var cgi = 'http://trineu.uoc.es/incidenciescv/pls/usr.NewIncidFromUser?sid='+ numSes;
	var cgi = 'http://'+ location.hostname +'/incidenciescv/pls/usr.NewIncidFromUser?sid='+ numSes;
	var winNm = getWinNm();
	var messWin = window.open(cgi,winNm,'width=600,height=450,menubar=no,resizable=no,scrollbars=yes,status=yes');
}

function doLlista(adr, x, y) {
// Obre finestra del trineu amb numSes
// adr del tipus 'campus/plsql/llistes.print_members?lid=5421&psid='
// Opcions: adr: obre amb dimensions predefinides
//          adr,x,y: obre en finestra nova de dimensions x i y
//          adr,'': carrega adr en el marc actual
//////////////////////////////////////////////////////////////
  var nargs = new Number(arguments.length);
  var xdef = new String('600');
  var ydef = new String('400');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }

  var numSes = obtNumSes();
  var cgi = 'http://trineu.uoc.es:445/' + adr + numSes;
  if (nargs=='2') self.location= cgi;
  else var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function doRes(suid) {
	var numSes = obtNumSes();
	var cgi = '/UOC/a/resume_0.html?s='+numSes+'&uid=' + suid;
	var winNm = getWinNm();
	var messWin = window.open(cgi,winNm,'width=700,height=400,menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function doTrineu(adr, x, y) {
// Obre finestra del trineu amb numSes
// adr del tipus 'campus/plsql/llistes.print_members?lid=5421&psid='
// Opcions: adr: obre amb dimensions predefinides
//          adr,x,y: obre en finestra nova de dimensions x i y
//          adr,'': carrega adr en el marc actual
//////////////////////////////////////////////////////////////
  var nargs = new Number(arguments.length);
  var xdef = new String('600');
  var ydef = new String('400');

  if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
  }

  if((adr.indexOf('Incidencies.showIncidFromUOC?sid=')!='-1')||(adr.indexOf('usr.newincidfromUser?sid=')!='-1')) var numSes = obtNumSes('1');
  else var numSes = obtNumSes();

  var cgi = 'http://trineu.uoc.es:445/' + adr + numSes;
  if (nargs=='2') self.location= cgi;
  else var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=no,scrollbars=yes,status=yes');
}

function doWrite(to,cc,re,bo) {
// Obre una finestra amb un missatge preadre?t
// El camp 'bo' pot contenir unes paraules que apareixeran al cos del missatge. Per a textos
// m? extensos, cal passar el nom d'un fitxer .mail, que col.locarem al directori /home/tmp
// i que cont?el text del cos del missatge.
////////////////////////////////////////////////////////////////////////////////////////////
  var nargs = new Number(arguments.length);
  if(nargs<4) {
    cc = new String('');
    re = new String('');
    bo = new String('');
  }

  var cgi = new String();
  var numSes = obtNumSes();
  // if(bo.indexOf('.mail')==-1) cgi='/cgi-bin/bustia/wrte_fcnt0?s=' + numSes + '&l=pers&to=' + to + '&fr=&cc=' + cc + '&re=' + re + '&bo=' + bo;
  // else  cgi='/cgi-bin/bustia/wrte_fcnt0?s=' + numSes + '&to=' + to + '&fr=&cc=' + cc + '&re=' + re + '&fi=' + bo;

  if(bo.indexOf('.mail')==-1) cgi='/UOC/a/cgi-bin/ma_writeFS?s=' + numSes + '&l=pers&to=' + to + '&fr=&cc=' + cc + '&re=' + re + '&bo=' + bo + '&opId=new';
  else  cgi='/cgi-bin/bustia/wrte_fcnt0?s=' + numSes + '&to=' + to + '&fr=&cc=' + cc + '&re=' + re + '&fi=' + bo;


  var messWin = window.open(cgi,getWinNm(),'width=600,height=400,menubar=yes,resizable=no,scrollbars=yes,status=yes');
}

function statusMsg(msg) {
// Sense par?etre esborra l'status i amb par?etre mostra el missatge
//////////////////////////////////////////////////////////////////////
  var nargs = new Number(arguments.length);
  if(nargs<1) var msg = ' ';
  self.status = msg;
}

function mouseOver(msg) {
  self.status = msg;
}

function mouseOut(msg) {
// Sense par?etre esborra l'status i amb par?etre mostra el missatge
/////////////////////////////////////////////////////////////////////
  var nargs = new Number(arguments.length);
  if(nargs<1) msg = ' ';
  self.status = msg
}

function si(x) {
// si() i no() canvien la icona petita de la UOC
////////////////////////////////////////////////
  document.images[x].src="http://campus.uoc.es/mc-icons/blar.gif"
}

function no(x) {
  document.images[x].src="http://campus.uoc.es/mc-icons/bla.gif"
}

function carregaImatges() {
// Precarrega les imatges passades com a par?etre
//////////////////////////////////////////////////
  var llistaCarrega = new Array();
  var imatges = carregaImatges.arguments;
  if (document.images) {
    for (var i=0; i<imatges.length; i++) {
      llistaCarrega[i] = new Image;
      llistaCarrega[i].src = imatges[i];
    }
  }
}

function canviaImatge(imatge, nom) {
//Fa l'efecte de canviar la imatge existent per la passada com a par?etre.
//Cal haver-li donat nom a la imatge amb l'etiqueta 'name' de l'HTML
////////////////////////////////////////////////////////////////////
	if(self.document.images) self.document.images[nom].src = imatge;
}

function enrera() {
// Pot substituir l'history.back. Si t?history, fa un back; si ? finestra nova inicial,
// la tanca; si l'anterior ? l'entrada al campus, fa un reInici() (v.CLUB)
////////////////////////////////////////////////////////////////////////////////////////
  var wnom = new String(top.window.name);
  var historial = new Number(history.length);

  if(detectaVis()=='ne') historial = historial-1;

  if(historial>0) history.back();
  else {
    if(wnom!='') top.close();
    else reInici();
  }
}

function genDir(s) {
// Funci?gen?ica que retorna el nom del campus, la llengua o la ruta fins el nom
// del campus segons el par?etre passat. El protocol i el domini s'extreuen des
// del document amb location.protocol i location.hostname;
// Si hom crida la funci?des d'una plana d'informaci?associada (/ACRONIM/mat)
// agafa la llengua de la finestra top.main.claslist on es despleguen les aules.
//////////////////////////////////////////////////////////////////////////////////
  var ruta = location.pathname.split('/');
  if(ruta[2]=='mat') ruta = top.main.claslist.location.pathname.split('/');
  var r = new String();;

  switch(s) {
    case 'arrel'  : r = location.protocol + '//' + location.hostname;
                    break;
    case 'campus' : r = ruta[1];
                    break;
    case 'llengua': r = ruta[2];
                    break;
    default: break;
  }  
  return r;
}


function detectaVis() {
// Funci?gen?ica que retorna nom de codi del visualitzador
// Retorna 'ne' o 'ie'
////////////////////////////////////////////////////////////
  var s = new String();
  switch(navigator.appName) {
    case 'Netscape':  s = 'ne';
          break;
    case 'Microsoft Internet Explorer': s = 'ie';
          break;
    default: s = 'ie';
          break;
  }
  return s;
}

function reInici() {
// Torna a la plana d'inici tenint en compte la llengua del campus
//////////////////////////////////////////////////////////////////
  var numSes = obtNumSes();
  var adr = '/' + genDir('campus') + '/' + genDir('llengua') + '/extcgi_0.html?s=' + numSes + '&img=hola&cgi=hola';
  parent.location = adr;
}

function xatVeu(idv) {
	var adr = 'http://guatemala.uoc.es:8888/vchat/UOC/a/vchat/interface/EnterConnectionPublic.jsp?s=' + obtNumSes() + '&vid=' + idv;
	var accio = 'EnterConnection';
	var messWin = window.open(adr,accio,'width=600,height=500,menubar=no,resizable=no,scrollbars=no,status=no,location=no,toolbar=no');
}

/*
function obreBustia(lo,i1,i2,i3) {
  adr = new String();
  var nargs = new Number(arguments.length);
  var numSes = obtNumSes();
 
  if (numSes == 'extern') {
    alert ('Opci?no disponible');
    return;
  }

  if(nargs<2) i1 = new String('blanc.gif');
  if(nargs<3) i2 = new String('blanc.gif');
  if(nargs<4) i3 = new String('blanc.gif');

  adr = genDir('arrel') + '/' + genDir('campus') + '/' + genDir('llengua') + '/cgi-bin/activi/debat_0?s=' + numSes + '&l=' + lo + '&img1=' + i1 + '&img2=' + i2 + '&img3=' + i3;
  oWin(adr,'600','400');
}
*/

function obreBustia(lo,i1,i2,i3) {
// Obre el CONVERSATION amb l'adre? generada.
/////////////////////////////////////////////////////////////////
  adr = new String();
  var nargs = new Number(arguments.length);
  var numSes = obtNumSes();

  if(nargs<2) i1 = new String('blanc.gif');
  if(nargs<3) i2 = new String('blanc.gif');
  if(nargs<4) i3 = new String('blanc.gif');

  adr = genDir('arrel') + '/' + genDir('campus') + '/' + genDir('llengua') + '/cgi-bin/ma_mainMailFS?s=' + numSes + '&e=1&l=' + lo;
  window.open(adr,'','width=700,height=500,menubar,resizable,scrollbars,status');
}

function obreConv(lo) {
// Obre el CONVERSATION amb l'adre? generada.
/////////////////////////////////////////////////////////////////
  adr = new String();
  var numSes = obtNumSes();
  adr = genDir('arrel') + '/' + genDir('campus') + '/' + genDir('llengua') + '/cgi-bin/ma_mainMailFS?s=' + numSes + '&e=1&l=' + lo;
  window.open(adr,'','width=700,height=500,menubar,resizable,scrollbars,status');
}

function obreForum(f,a) {
// Si no se li han passat sessio, foum i arbre surt directement.
// Obre la b?stia amb l'adre? generada.
/////////////////////////////////////////////////////////////////
  adr = new String();
  var nargs = new Number(arguments.length);
  var numSes = obtNumSes();
  if(nargs<2) return;

  adr = genDir('arrel') + '/' + genDir('campus') + '/openforum.htm?s=' + numSes + '&tree=' + a  + '&for=' + f;
  oWin(adr,'600','400');
}

function obreDisc(lo,i1,i2,i3) {
// Si no se li han passat gifs de navegaci? hi assigna blanc.gif
// Obre l'espai de fitxers amb l'adre? generada.
/////////////////////////////////////////////////////////////////
  adr = new String();
  var nargs = new Number(arguments.length);
  var numSes = obtNumSes();
 
  if(nargs<2) i1 = new String('blanc.gif');
  if(nargs<3) i2 = new String('blanc.gif');
  if(nargs<4) i3 = new String('blanc.gif');

  //adr = genDir('arrel') + '/' + genDir('campus') + '/' + genDir('llengua') + '/cgi-bin/activi/fdebat_0?s=' + numSes + '&l=' + lo + '&img1=' + i1 + '&img2=' + i2 + '&img3=' + i3;
  //oWin(adr,'600','400');
adr = 'http://cv.uoc.edu/webapps/filearea/servlet/iuoc.fileserver.servlets.LoginFilearea?company=UOC&sessionId=' + numSes + '&lang=a&sto=' + lo + '&operation=login';
window.open(adr,getWinNm(),'scrollbars,menubar,status,resizable,width=700,height=450');
}

/*
20010914-dgarciaf-errorIE_activi_0.html?classes?
function openDebat(login,debatGif) {
 Utilitzada per UOC/a/varis/xvc Assemblea de La Virtual. Assimilada a obreBustia
  var numSes = obtNumSes();
  if (numSes == 'extern') {
    alert ('Opci?no disponible');
    return
  }
  var cgi = '/cgi-bin/activi/debat_0?s=' + numSes + '&l=' + login + '&img1=' + debatGif + '&img2=ser_coop.gif&img3=blanc.gif';
  var winNm = getWinNm();
  window.open(cgi,winNm,'width=600,height=400,menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}
*/

function openBusties(lad,lac) {
// Utilitzada per centres/tauler.htm . Pendent.
//////////////////////////////////////////////////////////////////////////////////
  var numSes = obtNumSes();
  self.location  = '/cgi-bin/activi/debats?s=' + numSes + '&d=' + lad + '&c=' + lac;
}

function doVota() {
// Utilitzada per UOC/a/varis/xvc Assemblea de La Virtual. Pendent de reducci?/////////////////////////////////////////////////////////
  var numSes = obtNumSes(1);  // Amb el par?etre 1 obt?el n? de sessi?antic.   
  var cgi = 'http://iglu.uoc.es:448/enq/plsql/enq.enq?s=' + numSes + '&codi=XVCVOT';
  var winNm = getWinNm();
  top.main.location = cgi;
}

function obreLlengua() {
// Genera el nom del servidor i del directori de campus, el qual serveix per a identificar
// el campus d'origen dins del web de llengua. Si no se li han passat gifs de navegaci?
// hi assigna blanc.gif. Obre la b?stia amb l'adre? generada.
/////////////////////////////////////////////////////////////////////////////////////////
  var x = new String('750');
  var y = new String('500');
  var numSes = obtNumSes('1');

  var cgi = genDir('arrel') + '/UOC/a/seu_central/llengua/index.html?s=' + numSes + '&e=' + genDir('campus');
  var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function doBiblioteca(s) {
// Obre la plana de biblioteca representada per <i>adr</i>
// Utilitza el document xina.uoc.es/comodin.html
//////////////////////////////////////////////////////////
  if(!s) s = genDir('campus');

  var appid = new String(s);
  var numSes = new String(top.logobar.document.IDs.session.value);
  var oldNumSes = new String(top.logobar.document.IDs.oldsession.value);
  var nom = new String('');
  var adr = new String('');
  var ho = new String('');

  if (location.hostname == 'uocadsl.uoc.es' )  var ho = 'bibadsl.uoc.es';
  else ho = 'xina.uoc.es';
  
  // Si la llengua des d'on s'obre es el castella, obre en castella sino en catala.
  
  if(genDir('llengua')=='b') adr = 'http://' + ho + '/cas/index.html';
  else adr = 'http://' + ho + '/cat/index.html';

  nom = 'sessio' + numSes + 'sessiovell' + oldNumSes + 'appid' + appid;
  var altura=screen.height;       var anchura=screen.width;
  var vent_x=770;                 var vent_y=500;
  var posx=(screen.width/2)-400;  var posy=(screen.height/2)-300;
  var finestra = window.open(adr,nom,'resizable=1,toolbar=1,location=0,directories=0,status=1,menubar=0,scrollbars=0,width=770,height=500,screenX='+posx+',screenY='+posy+',left='+posx+',top='+posy+'');
}

function doBibliotecaOld(url) {
   var numSes = obtNumSes();
   oWinSes('http://xina.uoc.es/comodin.html?s=' + numSes + '&p=' + url,600,400);
}

function posaFrames(url,pestanyes) {
// GOATE 17-12-2002
   var cadena = new String('');
   if (arguments.length >= 2) {
      if ((pestanyes.search(/t=/)!=-1)&&(top._user_type!='MEMBRE')&&(top._user_type!='SOCI_GRADUAT')) cadena+='/UOC/celler/navegacio/frames_multisecre.html?u='+url+'&p='+pestanyes;
      else cadena+='/UOC/celler/navegacio/frames.html?u='+url+'&p='+pestanyes;
      }
   else {
      cadena+='/UOC/celler/navegacio/frames.html?u='+url;
      }
   if (self.name=="cl_main") {
      self.parent.location=cadena;
      }
   else {
     if (self.name=="cl_submain") self.parent.parent.location=cadena;
     else self.location=cadena;
     }
}


function sona_wsa(f, x, y) {
  if(arguments.length<3) {
    var x = 100;
    var y = 25;
  }

  document.write('<APPLET ARCHIVE="AudioPlayer.jar" CODE=AudioPlayer.class width=' + x +' height=' + y + '">');
  document.write('<PARAM name=cabname value="AudioPlayer.cab">');
  document.write('<PARAM name=soundfilename value="');
  document.write(f);
  document.write('"<PARAM name="autoStart" value = "false">');
  document.write('"<PARAM name=loop value="false"></APPLET>');
}

function sona_ea(f, x, y) {
  if(arguments.length<3) {
    var x = 120;
    var y = 22;
  }

  document.write('<APPLET codebase="/UOC/a/audio/ea/" code=PlayerEmblaze.class id=menu width=' + x +' height=' + y + ' archive="PlayerEmblaze.jar">');
  document.write('<PARAM name=cabbase value="PlayerEmblaze.cab">');
  document.write('<PARAM name=soundfilename value="');
  document.write(f);
  document.write('"<PARAM name=loop value="1"></APPLET>');
}

function posar_registre_ac(){
//CDC
  document.write('<TABLE BORDER="0"><TR><TD><img src="/mc-icons/b2fg.gif" BORDER="0"> <a href="javascript:doTren(\'GAT_EXP.NOTESAVAL/notesaval_tren.notesaval\')">Consulta de Evaluaci? continuada</a></TD></TR></TD></TABLE>');
}

function obreBar(canal) {
//CDC
  var numSes = obtNumSes();
  var adr = '/servlet/InviteChannel?ACCEPT=TRUE&SESSIONID=' + numSes + '&CHANNELID=' + canal;
  top.winOpen(adr,'noprefix');
}

function obreAules(domini_pare) {
//CDC. Obre les aules d'un usuari
/////////////////////////////////
  var numSes = obtNumSes();
  parent.location = '/CDC/a/activi_0.html?s=' + numSes + '&c=none&d=' + domini_pare + '&t=aula&img=assignat';
}

function doBanner(origen) {
//CLUB
 var id= new Number(141223); // Li donem valor a causa del bug del default en Navigator.
	switch  (origen)	{				
		case "lavirtual": id=141518; break;
		case "borsa":
		case "forums":
		case "anuncis":			
		case "espais":  id=141223; break;
		case "home":    id=141220; break;
		default:        id=141223; break;
	}
 document.write('<table><tr>');
 document.write('<td><A HREF="http://adforce.imgis.com/?adlink|318|'+id+'|1|1|misc=NUMRAND;" TARGET=_blank><IMG SRC="http://adforce.imgis.com/?adserv|318|'+id+'|1|1|misc=NUMRAND;" BORDER=0 HEIGHT=60 WIDTH=468 NATURALSIZEFLAG=0 ALIGN=BOTTOM ALT="I-Network ad"></A></td>');
 document.write('</tr></table>');
}

/////////////////////////////////////////////////////////////////////////
// Banner(string0,url0,...,stringN,urlN) 
// Cada parell de par?etres corresp? al text i la url de cada link.
// string: Text del link
// url:    num?ic -> corresp? la variable saltar de /UOC/a/varis/uoc_saltar.html?s=
//		 /UOC/.. -> link relatiu
//		 http:// -> link extern
//
////////////////////////////////////////////////////////////////////////
function _Banner() {
//CLUB
var links = new Number((arguments.length)/2);
var cad = new String();
var url = new String();

document.write('<APPLET  code=panellCampus.class   codebase=/CLUB/a/club/java/   name=panellCampus  width=380   height=18>');
for(i=0,j=0;i<links;i++,j+=2) {
	cad+='<param name="string'+i+'" value="'+arguments[j]+'">';	
	url=arguments[j+1];
	
	// Si es tracta d'una url amb http fa la crida externa, si no li posa la url del campus actual	
	if(typeof(arguments[j+1])=='number') url='/CLUB/a/club/saltar.html?s='+url;
	if((url.substr(0,7)!="http://") && (url.charCodeAt(0)==47)) url=genDir('arrel')+url;	
	cad+='<param name="url'+i+'" value="'+url+'">';
}
document.write(cad);
document.write('<PARAM name=colorNorFont value="0,0,255">');
document.write('<PARAM name=colorAltFont value="255,0,0">');
document.write('<PARAM name=colorFons value="255,255,255">');
document.write('<PARAM name=nomFont value="Arial">');
document.write('<PARAM name=tipusFont value="1">');
document.write('<PARAM name=tamanyFont value="12">');
document.write('<PARAM name=sleep value="5">');
document.write('<PARAM name=delay value="500">');
document.write('</APPLET>');
}

//////////////////////////////////////////////////////////////
///////////// Banner_cat(string0,url0,...,stringN,urlN)
// Cada parell de par?etres corresp? al text i la url de cada link.
// string: Text del link// url:    num?ic -> corresp? la variable saltar de /DOCTORAT/a/docs/banner/saltar.html?s=
//		 /UOC/.. -> link relatiu
//		 http:// -> link extern///////////////////////
///////////////////////////////////////////////////
function Banner_cat() {var links = new Number((arguments.length)/2);
//DOCTORAT
var cad = new String();
var url = new String();
document.write('<APPLET  code=panellCampus.class   codebase=/CLUB/a/club/java/  name=panellCampus  width=500   height=15>');
for(i=0,j=0;i<links;i++,j+=2)
 {	cad+='<param name="string'+i+'" value="'+arguments[j]+'">';
 		url=arguments[j+1];		// Si es tracte d'una url amb http fa la crida externa, si no li posa la url del campus actual
 			if(typeof(arguments[j+1])=='number') url='/DOCTORAT/a/docs/banner/saltar.html?s='+url;
 				if((url.substr(0,7)!="http://") && (url.charCodeAt(0)==47)) url=genDir('arrel')+url;
 						cad+='<param name="url'+i+'" value="'+url+'">';
 					}
 document.write(cad);document.write('<PARAM name=colorContorn value="239,247,255">');
 document.write('<PARAM name=quadrat value="true">');
 document.write('<PARAM name=genFons value="255,255,255">');
 document.write('<PARAM name=colorNorFont value="255,0,0">');
 document.write('<PARAM name=colorAltFont value="255,0,0">');
 document.write('<PARAM name=colorFons value="255,255,255">');
 document.write('<PARAM name=nomFont value="Arial">');
 document.write('<PARAM name=tipusFont value="1">');
 document.write('<PARAM name=tamanyFont value="11">');
 document.write('<PARAM name=sleep value="5">');
 document.write('<PARAM name=delay value="500">');
 document.write('</APPLET>');
 }


//////////////////////////////////////////////////////////////
///////////// Banner_cast(string0,url0,...,stringN,urlN)
// Cada parell de par?etres corresp? al text i la url de cada link.
// string: Text del link// url:    num?ic -> corresp? la variable saltar de /DOCTORAT/b/docs/banner/saltar.html?s=
//		 /UOC/.. -> link relatiu
//		 http:// -> link extern///////////////////////
///////////////////////////////////////////////////
function Banner_cast() {var links = new Number((arguments.length)/2);
//DOCTORAT
var cad = new String();
var url = new String();
document.write('<APPLET  code=panellCampus.class   codebase=/CLUB/a/club/java/  name=panellCampus  width=520   height=15>');
for(i=0,j=0;i<links;i++,j+=2)
 {	cad+='<param name="string'+i+'" value="'+arguments[j]+'">';
 		url=arguments[j+1];		// Si es tracte d'una url amb http fa la crida externa, si no li posa la url del campus actual
 			if(typeof(arguments[j+1])=='number') url='/DOCTORAT/b/docs/banner/saltar.html?s='+url;
 				if((url.substr(0,7)!="http://") && (url.charCodeAt(0)==47)) url=genDir('arrel')+url;
 						cad+='<param name="url'+i+'" value="'+url+'">';
 					}
 document.write(cad);document.write('<PARAM name=colorContorn value="239,247,255">');
 document.write('<PARAM name=quadrat value="true">');
 document.write('<PARAM name=genFons value="255,255,255">');
 document.write('<PARAM name=colorNorFont value="255,0,0">');
 document.write('<PARAM name=colorAltFont value="255,0,0">');
 document.write('<PARAM name=colorFons value="255,255,255">');
 document.write('<PARAM name=nomFont value="Arial">');
 document.write('<PARAM name=tipusFont value="1">');
 document.write('<PARAM name=tamanyFont value="11">');
 document.write('<PARAM name=sleep value="5">');
 document.write('<PARAM name=delay value="500">');
 document.write('</APPLET>');
 }

function linkDoc(text,url) {
//DOCTORAT
  if (navigator.appName == "Netscape")  {
    document.write('<A HREF="'+url+'">'+text+'</A>');
  }
  else {
    document.write('<A HREF="'+url+'" TARGET="_blank">'+text+'</A>');
  }
}

function doHit(plana){
	var numSes = obtNumSes();
	var codi = new String();
  if (plana == null) plana = location.pathname;
  codi = '<IMG SRC=http://cv.uoc.edu/servlet/Hit?s=' + numSes + '&plana=' + plana + ' WIDTH=0 HEIGHT=0>';
	document.write(codi);
}

// Funci?per obrir l'Ajuda del Campus contextualment
function obreHelp(gif) {
	var nargs = new Number(arguments.length);	
	var numSes;
	if(top._langRel) lang=top._langRel.substring(1,2); // Pren l'idioma del top.
	else lang='a';
	if (top._user_app) appid=top._user_app;	// Pren el directori on resideix l'entorn del top.	
        else appid='UOC';
	if(nargs<1) gif='help';
	numSes = obtNumSes('1');	
	var cgi = '/'+appid+'/'+lang+'/ajuda/index.html?s='+ numSes + '&gif='+gif;	 	
	var winNm = getWinNm();
	var messWin = window.open(cgi,winNm,'width=750,height=550,menubar=no,resizable=no,scrollbars=yes,status=yes');
}

function doFaq(node) {
// Obre una finestra amb les FAQs del CUC d'una opci?final concreta.
// node: ? el codi del node final a mosrtar les FAQs
// Poden obternir-se els n? de node a CUC - Manteniments - Ordena les FAQs
//////////////////////////////////////////////////////////////
 var p = new String(''); 
 var numSes;
 var nargs = new Number(arguments.length);
 var xdef = new String('750');
 var ydef = new String('450');   
 
 if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
 }
bloq=1;
if (bloq==0) alert('Durant el dia d\'avui aquesta aplicaci?romandr?fora de servei per tasques de manteniment. Disculpeu-nos les mol?ties.');
else {
 p='http://cv.uoc.edu/tren/trenacc?s=';
 if (window.name == 'frm_preview')
{
	var s_nou = top.logobar.document.IDs.session.value;
	var s_vell = top.logobar.document.IDs.oldsession.value;
	numSes = s_nou; 
}
else
{       if (window.name == 'frm_viewMssgHead') {
	   s_nou = parent.opener.top.logobar.document.IDs.session.value;
	   s_vell = parent.opener.top.logobar.document.IDs.oldsession.value;
	   numSes = s_nou; 
        }
        else  numSes=obtNumSes();
} 


 var cgi = p + numSes + '&modul=CUC.FAQS_OPCION/faqs_opcion.consultafaqs&pArgumentos=*&pValores=*&institucio=CO&popcio='+node+'&pagina=FP_FAQSPROCESO';
 var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}
}

function doNouRac(semestre,modul)
{var nargs = new Number(arguments.length);
 var numSes = obtNumSes();
 if (nargs > 0) semestre='&anyAcademic='+semestre;
 if (nargs > 1) modul='&modul='+modul;
 semestre = '&anyAcademic=20101';
 
 //var cgi = '/webapps/rac/viewSecretaria.action?s='+numSes+semestre+modul;
 var cgi = '/webapps/rac/viewSecretaria.action?s='+numSes+modul;
 var winNm = getWinNm();
 window.open(cgi,winNm,'scrollbars,menubar,status,resizable,width=700,height=500'); 
}

function doNouRacPG(semestre)
{
 var nargs = new Number(arguments.length);
 var sem = '&anyAcademic=20111';
 if (nargs>0) sem='&anyAcademic='+semestre;
 
 var numSes = obtNumSes();
 //var cgi = '/webapps/classroom/062_common/racEstudiant.jsp?s='+numSes+sem;
 var cgi = 'http://'+location.hostname+'/webapps/rac/listEstudiant.action?s='+numSes+sem;
 var winNm = getWinNm();
 window.open(cgi,winNm,'scrollbars,menubar,status,resizable,width=700,height=500'); 
}

function marca_aplicacio(adr) {
var cadena = '';
cadena+=document.location;
inici=cadena.indexOf("//");
cadena=cadena.substr(inici+3,cadena.length);
inici=cadena.indexOf("/");
fi=cadena.lastIndexOf("/");
cadena=cadena.substring(inici,fi+1);
cadena=cadena+'aplicacio/'+adr;
urchinTracker(cadena);
}

// Obre la fitxa de l'expedient PG
function doExpPG_antic(){
 var p = new String(''); 
 var nargs = new Number(arguments.length);
 var xdef = new String('800');
 var ydef = new String('450');

 if(nargs<4) {
    x = new String(xdef);
    y = new String(ydef);
 }
 var numSes = obtNumSes();  
 var userid;
 if(top.logobar==null) { 
    userid = parent.opener.top.logobar.document.IDs.uid.value;
    }
   else {
    userid = top.logobar.document.IDs.uid.value;
  }
  
 var adr='&entidad_gestora=UOC&modul=ADN.MOSTRAR_FICHA&tipo_identificador='+'USER_ID&codi_identificador='+userid+'&tipo_ficha=PG&logo=S';
 var cgi = 'http://'+location.hostname+'/tren/trenacc?s=' + numSes + adr;
  var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function doExpPG(){
 var p = new String(''); 
 var nargs = new Number(arguments.length);
 var xdef = new String('800');
 var ydef = new String('450');

 if(nargs<4) {
    x = new String(xdef);
    y = new String(ydef);
 }
 var numSes = obtNumSes();  

 var userid;
 if(top.logobar==null) { 
    userid = parent.opener.top.logobar.document.IDs.uid.value;
    }
   else {
    userid = top.logobar.document.IDs.uid.value;
  }

 var url = 'http://'+location.hostname+'/webapps/seleccioexpedient/cerca.html?s=' + numSes;
  var messWin = window.open(url,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}


function doUrlSes(url , x , y) {

   var p = new String(''); 
   var nargs = new Number(arguments.length);
   var xdef = new String('750');
   var ydef = new String('450');   

 if(nargs<3) {
    x = new String(xdef);
    y = new String(ydef);
 }

 p='https://';
 var numSes = obtNumSes();  // Amb el par?etre 1 obt?el n? de sessi?antic. 
 var cgi = p + location.hostname + url + '&s=' + numSes;

 if (nargs=='2')  self.location= p + location.hostname + url + '&s=' + numSes;
 else var messWin = window.open(cgi,getWinNm(),'width='+ x + ',height=' + y + ',menubar=yes,resizable=yes,scrollbars=yes,status=yes');
}

function getTopParams(pStr)
{
  var dls = pStr || top.document.location.search;
  var idx = dls.indexOf('?');
  var params = [];
  if (idx != -1)
  {
    var pairs = dls.substring(idx+1, dls.length).split('&');
    for (var i=0; i<pairs.length; i++)
    {
      nameVal = pairs[i].split('=');
      params[unescape(nameVal[0])] = unescape(nameVal[1]);
    }
  }
  return params;
}


function anar_inici( theApp, theLang ){
  var params = getTopParams();
  var ap = '';
  theApp='UOC';
  theLang='a';
  if (params['newStartingPage']) {
    ap = '?newStartingPage=' + params['newStartingPage'];
  }
  var ns = new String();
// Assigna els valors de sessi\363 segons el tipus de finestra
  if(top.logobar==null) {
    ns = top.window.name.substring(0,128);
  }
  else {
    ns = top.logobar.document.IDs.session.value;
  }


//  url='http://cv.uoc.edu/UOC/a/extcgi_0.html?s='+ns+'&img=hola&cgi=hola';
  url='/' + theApp + '/' + theLang +'/extcgi_0.html?s='+ns+'&img=hola&cgi=hola'+ap;
  if (self.parent.frames.length != 0)
  self.parent.location=url;
}

function canvi_idioma(idioma)
{
  var cad=''+document.location;
  var desti="/"+idioma+"/";
  var origen='';
  if (cad.indexOf("/a/")!=-1) origen="/a/";
  else if (cad.indexOf("/b/")!=-1) origen="/b/";
  else if (cad.indexOf("/c/")!=-1) origen="/c/";
  else origen=-1;
  if (origen!=-1) {
    cad=cad.replace(origen,desti);
    document.location=cad;
	}
}







if (!$.localize) {
    alert('edu.uoc.Localization requires jquery.localize plugin');
} else {
    $.extend({
        edu_uoc_Localization : {
            /**
             * Nos devuelve el lenguaje actual del usuario (por navegador o
             * por sesión)
             * 
             * @returns
             */
             getLanguage : function() {
                var lang = window.navigator.language;
                if ($.edu_uoc_Authentication.getCampusLocale()) {
                    lang = $.edu_uoc_Authentication.getCampusLocale().split('_')[0];
                }
                try {
                    if($.edu_uoc_Authentication.getUrlVar('app:lang'))
                        lang = $.edu_uoc_Authentication.getUrlVar('app:lang');    
                } catch(e) {}
                return lang.substr(0,2);
            },
            getBinaryLanguage : function() {
            	var lang = this.getLanguage();
            	var bLang = 'c';
            	if(lang == 'ca')
            		bLang = 'a';
            	if(lang == 'es')
            		bLang = 'b';
            	
            	return bLang;
            },
            /**
             * Carga los textos localizados en la página actual buscando los
             * atributos [rel*=localize]
             * 
             * @param pkg_name
             */
             loadLocale : function(page,pkg_name) {
                if(page == null) {
                    page = $('body');
                } else {
                    console.log('Localizando: ' + $(page).attr('id'));
                }
                
                if (pkg_name == null)
                    pkg_name = 'translations';
                try {
                    $(page).find("[data-localize]").localize(pkg_name, {
                        language : this.getLanguage()
                    });
                } catch(e) {
                }

                var my = this;
                $(page).find("[placeholder]").each(function() {
                    var key = $(this).attr('placeholder');
                    try {
                        var value = my.getLocale(key);
                        $(this).attr('placeholder', value);
                    } catch(e) {
                    }

                });
                $(page).find("[alt]").each(function() {
                    var key = $(this).attr('alt');
                    try {
                        var value = my.getLocale(key);
                        $(this).attr('alt', value);
                    } catch(e) {
                    }

                });
                $(page).find("[title]").each(function() {
                    var key = $(this).attr('alt');
                    try {
                        var value = my.getLocale(key);
                        $(this).attr('alt', value);
                    } catch(e) {
                    }

                });
                $(page).find("[alt]").each(function() {
                    var key = $(this).attr('alt');
                    try {
                        var value = my.getLocale(key);
                        $(this).attr('alt', value);
                    } catch(e) {
                    }

                });
                $(page).find("[summary]").each(function() {
                    var key = $(this).attr('summary');
                    try {
                        var value = my.getLocale(key);
                        $(this).attr('summary', value);
                    } catch(e) {
                    }

                });
                // ui-collapsible-heading-status
                $(page).find(".ui-collapsible-heading-status").each(function() {
                    var key = $(this).text().trim();
                    try {
                        var value = my.getLocale(key);
                        $(this).text(value);
                    } catch(e) {
                    }

                });
                try {
                    $.mobile.collapsible.prototype.options.collapseCueText = my.getLocale('click to collapse contents');
                    $.mobile.collapsible.prototype.options.expandCueText = my.getLocale('click to expand contents');
                } catch(e) {
                }
                $(page).live('pagebeforeshow', function(e) {
                    $(page).find(".ui-collapsible-heading-status").each(function() {
                        var key = $(this).text().trim();
                        try {
                            var value = my.getLocale(key);
                            $(this).text(value);
                        } catch(e) {
                        }

                    });
                });
            },
            /**
             * Devuelve una traducción basado en su key.
             * 
             * @param key
             * @returns Traducción
             */
             getLocale : function(key) {
                if (!$.localize.data) {
                    $.uoc.Localization.loadLocale();
                }
                if(!$.localize.data) {
                    return key;
                }
                return eval('$.localize.data[\'translations\'][\'' + key + '\']');
            }
        }
    });
}


window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
                     window.MozBlobBuilder || window.MSBlobBuilder;
window.URL = window.URL || window.webkitURL;
$.extend({
    edu_uoc_FileSystem : {
        writeFile: function(fileName, text, size, successCallback, errorCallback) {
            console.log('@@ FS @@ - writeFile: '+fileName);
            window.requestFileSystem(window.TEMPORARY, size, function(fs) {
                fs.root.getFile(fileName, {create: true}, function(fileEntry) {
                    console.log('@@ FS @@ - writeFile getFile: '+fileName);
                    // Create a FileWriter object for our FileEntry (log.txt).
                    fileEntry.createWriter(function(fileWriter) {
                        console.log('@@ FS @@ - Writer created');
                        fileWriter.onwriteend = function() {
                            console.log('@@ FS @@ - Writer Success!');
                            if(successCallback)
                                successCallback();
                        };

                        fileWriter.onerror = function(e) {
                             console.log('@@ FS @@ - Writer ERROR!!!! ' + e.toString());
                             if(errorCallback)
                                errorCallback(e);
                         };
                         var aFileParts = new Array(text);
                         var oMyBlob = new Blob(aFileParts, {type : 'text/html'}); // the blob
                         fileWriter.write(text);
                        //var blob = new Blob([text], {type: 'text/html'});
                        //fileWriter.write(blob);
                        //var bb = new BlobBuilder(); // Note: window.WebKitBlobBuilder in Chrome 12.
                        //bb.append(text);
                        //fileWriter.write(bb.getBlob('text/html'));
                        if(successCallback)
                            successCallback();

                    }, function(e) {
                        console.log('@@ FS @@ - Writer ERROR!!!! ' + e.toString());
                        if(errorCallback)
                            errorCallback(e);
                    });

                }, errorCallback);
            }, errorCallback);
        },
        fileExists: function(fileName, successCallback, errorCallback) {
            console.log('@@ FS @@ - fileExists: '+fileName);
            window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
                fs.root.getFile(fileName, {}, function(fileEntry) {
                    console.log('@@ FS @@ - fileExists: getFile '+fileName);
                    // Get a File object representing the file,
                    // then use FileReader to read its contents.
                    fileEntry.file(function(file) {
                        var reader = new FileReader();
                        reader.readAsText(file);
                        console.log('@@ FS @@ - fileExists: Success! : ' + fileEntry.toURL());
                        console.log('@@ FS @@ - fileExists: Size: ' + fileEntry.length);
                        successCallback(fileEntry.toURL());
                    }, errorCallback);
                }, errorCallback);
            }, errorCallback);
        }
    }
});


$.extend({
    edu_uoc_Network : {
        /**
         * Devuelve verdadero si estamos en línea.
         * @returns {Boolean}
         */
        isOnLine: function() {
            var result = null;
            try {
                if (window.device) {
                    var networkState = navigator.connection.type;
                    console.log('NetworkState [window.device]: ' + networkState);
                    result = (networkState != 'none');
                    if(networkState == null || networkState == undefined)
                        result = null;
                }
                if(result == null && navigator.onLine != null) {
                    result = navigator.onLine;
                    console.log('NetworkState [navigator.onLine]: ' + result);
                }
                if (result == null && window.navigator.onLine != null) {
                    result = window.navigator.onLine;
                    console.log('NetworkState [window.navigator.onLine]: ' + result);
                }
            } catch(e) {
                console.warn('Error on $.edu_uoc_Network.isOnLine(): ' + e.toString());
            }
            

            if(result == null)
                result = true;

            return result;
        }
    }
});

var edu = edu || {
    uoc: {}
}
edu.uoc.Announcements = {
    fetch: function() {
        var urlGet = $.edu_uoc_Authentication.getCampusUrlBase() + "/rb/inici/grid.rss?app:mobile=true&s=" + $.edu_uoc_Authentication.getCampusSession() + "&app:cache=false&app:only=avisos";

        return $.ajax({
            url: urlGet,
            type: "GET"
        }).then(function storeData(data) {
            localStorage.setItem('Announcements:' + $.edu_uoc_Authentication.getCampusUsername(), (new XMLSerializer()).serializeToString(data));
        });
    },
    getData: function(cache) {
        cache = cache || true;
        var deferred = jQuery.Deferred();

        setTimeout(function getAnnouncementsData() {
            var data;
            try {
                data = $.parseXML(localStorage.getItem('Announcements:' + $.edu_uoc_Authentication.getCampusUsername()));
            } catch (e) {}

            if (typeof data !== 'undefined' && cache) {
                deferred.notify(data);
            }
            edu.uoc.Announcements.fetch().then(function onRssData(data) {
                deferred.resolve(data);
            }).fail(function onRssError(error) {
                try {
                    data = $.parseXML(localStorage.getItem('Announcements:' + $.edu_uoc_Authentication.getCampusUsername()));
                } catch (e) {}

                if (typeof data !== 'undefined') {
                    deferred.resolve(data);
                }
            });

        }, 1);

        return deferred.promise();
    },
    refreshUI: function(cache) {
        cache = cache || true;
        var globalCache = cache;
        var onRssData = function(data,useCache) {
            if ($(data).find('item').length > 0) {
                if (localStorage.getItem($.edu_uoc_Authentication.getCampusUsername() + '-has-announcements') === null) {
                    localStorage.setItem($.edu_uoc_Authentication.getCampusUsername() + '-has-announcements', true);
                }
                $('#avisosDlg ul.avisos').empty();

                var numAvisos = 0;
                var announcementsLastPubdate = null;
                $(data)
                    .find('item')
                    .each(
                        function() {
                            // name the current found item this
                            // for this particular loop run
                            var $item = $(this);
                            // grab the post title
                            var title = $item.find('title')
                                .text();
                            // grab the post description
                            var description_html = $item.find(
                                'description').text();
                            // grab the post's URL
                            var link = $item.find('link')
                                .text();
                            // categories
                            var categories = $item
                                .find('categories');
                            var category = $item
                                .find('category');

                            title = $("<div/>").html(title).text();

                            var description = $("<div/>").html(description_html).text();

                            if (category.text().indexOf(
                                'ANNOUNCEMENT') >= 0) {
                                var pubDate = new Date($item.find('pubDate').text());
                                var lastPubDate = new Date(localStorage.getItem($.edu_uoc_Authentication.getCampusUsername() + '-announcement-last-pubdate'));
                                if (lastPubDate == null || pubDate > lastPubDate) {
                                    localStorage.setItem($.edu_uoc_Authentication.getCampusUsername() + '-has-announcements', true);
                                    if(announcementsLastPubdate == null || announcementsLastPubdate < pubDate) {
                                        announcementsLastPubdate = pubDate;
                                    }
                                    numAvisos += 1;
                                }

                                description = description
                                    .replace(
                                        /__WC_CAMPUS_ID__/g,
                                        $
                                        .edu_uoc_Authentication.getCampusSession());
                                description = description.replace(/href=\"([^\"]*)\"/gi, 'href="javascript:$.edu_uoc_phonegap_Downloader.downloadFile(\'$1\')"');

                                var avisHtml = $('#avisos-item-template').html();

                                $('#avisosDlg ul.avisos')
                                    .append(Mustache.to_html(avisHtml, {
                                        title: title,
                                        text: description_html
                                    }));
                            }
                        });
                if ($('#avisosDlg ul.avisos li').length == 0) {
                    $('#avisosDlg ul.avisos').empty();
                    $('#avisosDlg ul.avisos').append('<li class="item"><span data-localize="No-Alerts">' + $.edu_uoc_Localization.getLocale('No-Alerts') + '</span></li>');
                }
                setAlert('#announcement', numAvisos, false, (localStorage.getItem($.edu_uoc_Authentication.getCampusUsername() + '-has-announcements') == 'false'));
                if(announcementsLastPubdate) {
                    localStorage.setItem($.edu_uoc_Authentication.getCampusUsername() + '-announcement-last-pubdate', announcementsLastPubdate);
                }

                if ($($.mobile.activePage).attr('data-created') == 'true') {
                    $.mobile.activePage.trigger('create');
                }

                if ($($.mobile.activePage).attr('id') != 'avisosDlg') {
                    $('#avisosDlg').trigger('refresh');
                }
            }
        }
        edu.uoc.Announcements.getData(cache).then(function(data) { onRssData(data,false); }).progress(function(data) { onRssData(data,cache); });
    }
};

var edu = edu || {
    uoc: {}
}
edu.uoc.Inbox = {
    resolveData: function(data) {
        var item = $(data).find('item').first();
        var description_html = item.find('description').text();
        var patt = /:([0-9]+):([0-9]+)$/;
        return patt.exec(description_html)[1];
    },
    fetch: function() {
        var urlGet = $.edu_uoc_Authentication.getCampusUrlBase() + "/rb/inici/grid.rss?app:mobile=true&s=" + $.edu_uoc_Authentication.getCampusSession() + "&app:cache=false&app:only=bustia";

        return $.ajax({
            url: urlGet,
            type: "GET"
        }).then(function storeData(data) {
            localStorage.setItem('Inbox:' + $.edu_uoc_Authentication.getCampusUsername(), (new XMLSerializer()).serializeToString(data));
        });
    },
    getNumEmails: function(cache) {
        cache = cache || true;
        var deferred = jQuery.Deferred();

        setTimeout(function getInboxData() {
            var data;
            try {
                data = $.parseXML(localStorage.getItem('Inbox:' + $.edu_uoc_Authentication.getCampusUsername()));
            } catch (e) {}

            if (typeof data !== 'undefined' && cache) {
                deferred.notify(edu.uoc.Inbox.resolveData(data));
            }

            edu.uoc.Inbox.fetch().then(function onRssData(data) {
                var numCorreos = edu.uoc.Inbox.resolveData(data);

                deferred.resolve(numCorreos);
            }).fail(function onRssError(error) {
                deferred.reject(error);
            });
        }, 1);



        return deferred.promise();
    },
    refreshUI: function(cache) {
        cache = cache || true;
        edu.uoc.Inbox.getNumEmails(cache)
            .then(function onNumEmails(numCorreos) {
                setAlert('#email', numCorreos, false);
            }).progress(function onNumEmails(numCorreos) {
                setAlert('#email', numCorreos, false);
                setLoading('#email');
            }).fail(function onError(error) {
                var data;
                try {
                    data = $.parseXML(localStorage.getItem('Inbox:' + $.edu_uoc_Authentication.getCampusUsername()));
                } catch (e) {}

                if (typeof data !== 'undefined') {
                    var numCorreos = edu.uoc.Inbox.resolveData(data);
                    setAlert('#email', numCorreos, false);
                }
            });
    }
};

window.agendaDataCurrentDate = undefined;
window.agendaDataEvents = {};
window.agendaDataMonths = new Array(12);
window.agendaDataMonths[0] = "Enero";
window.agendaDataMonths[1] = "Febrero";
window.agendaDataMonths[2] = "Marzo";
window.agendaDataMonths[3] = "Abril";
window.agendaDataMonths[4] = "Mayo";
window.agendaDataMonths[5] = "Junio";
window.agendaDataMonths[6] = "Julio";
window.agendaDataMonths[7] = "Agosto";
window.agendaDataMonths[8] = "Septiembre";
window.agendaDataMonths[9] = "Octubre";
window.agendaDataMonths[10] = "Noviembre";
window.agendaDataMonths[11] = "Diciembre";

(function($) {
    $.fn.applyAgendaData = function() {
        $(this).find('[data-agenda]').each(function() {
            var dataKey = $(this).attr('data-agenda');
            var value = $(this).text();

            if (dataKey == 'today') {
                value = (new Date()).toString('dd');
            }
            if (dataKey == 'year') {
                value = (new Date()).getFullYear();
            }
            if (dataKey == 'month') {
                value = $.edu_uoc_Localization.getLocale(window.agendaDataMonths[(new Date()).getMonth()]);
            }
            if (dataKey == 'previousYear') {
                value = (new Date()).getFullYear() - 1;
            }
            if (dataKey == 'previousMonth') {
                var m = (new Date()).getMonth() - 1;
                if (m <= 0)
                    m = 12;

                value = $.edu_uoc_Localization.getLocale(window.agendaDataMonths[m]);
            }

            $(this).text(value);
        });
    },
    $.fn.setCalendarDate = function(date) {
        window.agendaDataCurrentDate = date;
        $.mobile.activePage.buildAgenda();
    },
    $.fn.updateAgendaDiaDateDisplay = function(date) {
        var m = date.getMonth();
        $(this).find('#viewday').text(date.getDate());
        $(this).find('#viewmonth').text($.edu_uoc_Localization.getLocale(window.agendaDataMonths[m]));
        $(this).find('#viewyear').text(date.getFullYear());

        if (date.toString('dd/MM/yyyy') == (new Date()).toString('dd/MM/yyyy')) {
            $(this).find('.avui').addClass('ui-disabled');
        } else {
            $(this).find('.avui').removeClass('ui-disabled');
        }
    },
    $.fn.updateAgendaDateDisplay = function(date) {
        var m = date.getMonth();
        $(this).find('#viewmonth').text($.edu_uoc_Localization.getLocale(window.agendaDataMonths[m]));
        $(this).find('#viewyear').text(date.getFullYear());
    },
    $.fn.setActualDate = function(newDate) {
        if (newDate == undefined)
            window.agendaDataCurrentDate = new Date();
        else
            window.agendaDataCurrentDate = newDate;

        $(this).updateAgendaDateDisplay(window.agendaDataCurrentDate);
        $(this).find('.nativedatepicker').each(function() {
            $(this).val(window.agendaDataCurrentDate.toString("dd/MMM/yyyy"));
        });
        $(this).find('.nativedatepicker').each(function() {
            $(this).val(window.agendaDataCurrentDate.toString("dd/MMM/yyyy"));
        });
        if ($(this).attr('id') == "agendaPage") {
            $(this).buildCalendar(window.agendaDataCurrentDate.getMonth(), window.agendaDataCurrentDate.getFullYear());
        }
        if ($(this).attr('id') == "agendaDayPage") {
            $('#agendaDayPage').updateAgendaDiaDateDisplay(window.agendaDataCurrentDate);
            $('#agendaDayPage').refreshPageDay(window.agendaDataCurrentDate);
        }
    },
    $.fn.buildCalendar = function(month, year) {
        var node = $(this).find('#calendar-body');

        if (node.length > 0) {
            node = $(node[0]);

            node.empty();

            // Build calendar table
            var today = new Date();
            var daytoday = today.getDate();
            
            var selectedDate = new Date((month+1) + '/1/'+year);
            var realMonth = today.getMonth() + 1;
            
            var first = selectedDate;
            first.setDate(1);

            if (today.toString('MM/yyyy') == (new Date()).toString('MM/yyyy')) {
                $(this).find('.avui').addClass('ui-disabled');
            } else {
                $(this).find('.avui').removeClass('ui-disabled');
            }

            var firstDayWeekNumber = first.getDay();
            var daysInMonth = Date.getDaysInMonth (year, month);
            var gDay = 50;
            monthbefore = month - 1;
            var daysMonthBefore = Date.getDaysInMonth(year, monthbefore);

            //var x = document.getElementById("mes");
            $('#viewmonthcalendar').html($.edu_uoc_Localization.getLocale(window.agendaDataMonths[month]));

            //x = document.getElementById("year");
            $('#viewyearcalendar').html(year);

            month++;
            monthafter = month + 1;

            var firstDayCalendar;
            var finalrow = 5;
            var mesAnterior = 1;
            var mesSiguiente = 0;
            var calendarDay = 0;
            switch (firstDayWeekNumber) {
                case 0:
                    firstDayCalendar = daysMonthBefore - 5;
                    if (daysInMonth == 31)
                        finalrow = 6;
                    break;
                case 1:
                    calendarDay = 1;
                    mesAnterior = 0;
                    gDay = 1;
                    break;
                case 2:
                    firstDayCalendar = daysMonthBefore;
                    break;
                case 3:
                    firstDayCalendar = daysMonthBefore - 1;
                    break;
                case 4:
                    firstDayCalendar = daysMonthBefore - 2;
                    break;
                case 5:
                    firstDayCalendar = daysMonthBefore - 3;
                    break;
                case 6:
                    firstDayCalendar = daysMonthBefore - 4;
                    if (daysInMonth == 31)
                        finalrow = 6;
                    break;
            }

            var newnode = null;
            for (var row = 0; row < finalrow; row++) {
                node.append("<tr id=\"row" + row + "\"><\tr>");
                newnode = $("#row" + row);
                for (var day = 0; day < 7; day++) {



                    if (daysInMonth >= gDay) {
                        if ((gDay == daytoday) && (month == realMonth)) {
                            newnode.buildCalendarEvent(calendarDay, (month - 1), year, 'actual');
                        } else if ((gDay < daytoday) && (month == realMonth)) {
                            newnode.buildCalendarEvent(calendarDay, (month - 1), year, 'danterior');
                        } else {
                            newnode.buildCalendarEvent(calendarDay, (month - 1), year);
                        }

                        gDay++;

                    } else if ((firstDayCalendar <= daysMonthBefore) && mesAnterior) {
                        monthText = $.edu_uoc_Localization.getLocale(window.agendaDataMonths[monthbefore]);
                        newnode.buildCalendarEvent(firstDayCalendar, (monthbefore), year, 'danterior', monthText);
                        if (firstDayCalendar == daysMonthBefore) {
                            gDay = 1;
                            mesAnterior = 0;
                            calendarDay = 0;
                        }
                    } else if ((gDay > daysInMonth) && mesSiguiente) {
                        monthText = $.edu_uoc_Localization.getLocale(window.agendaDataMonths[monthafter - 1]);
                        newnode.buildCalendarEvent(calendarDay, (monthafter - 1), year, 'seguent', monthText);
                        gDay++;
                    }
                    if (calendarDay == daysInMonth) {
                        mesSiguiente = 1;
                        calendarDay = 0;
                    }
                    firstDayCalendar++;
                    calendarDay++;
                }
            }
        }

        $('#nextAppointments').empty();
        if ($('#no-next-appointments')) {
            $('#no-next-appointments').remove();
        }
        var yesterday = new Date();

        yesterday.setDate(yesterday.getDate() - 1);
        $.each(window.agendaDataEvents, function(x, valor) {
            x = x.split('/');
            i = x[1] + '-' + x[0] + '-' + x[2];

            date = Date.parse(i);
            if (date > yesterday && date.getMonth() <= ((new Date).getMonth())) {
                var length = valor.events.length;
                var str;
                for (var j = 0; j < length; j++) {
                    var eventLink = '$.mobile.activePage.setDayView(' + date.getFullYear() + ',' + date.getMonth() + ',' + date.getDate() + ')';
                    str = '<li onclick="' + eventLink + '">';
                    str += $(valor).imgFromEvents(j);
                    str += '<span class="icona">' + date.toString('dd') + '</span>';
                    str += '<span class="data">' + date.toString('dd/MM/yyyy');
                    if (valor.hour[j]) {
                        str += ' - ' + valor.hour[j];
                        str += '<abbr title="hora">h</abbr>';
                    }
                    str += '</span>';
                    str += '<span class="titol">' + valor.events[j] + '</span></li>';

                    $('#nextAppointments').append(str);
                }
            }
        });
        if ($('#nextAppointments').find('li').length == 0) {
            $('#nextAppointments').parent().append('<i id="no-next-appointments">' + $.edu_uoc_Localization.getLocale('no-next-appointments') + '</i>');
        }
    },
    $.fn.buildAgenda = function() {
        $(this).refreshAgendaData();

        var date;
        if (!window.agendaDataCurrentDate)
            date = new Date();
        else
            date = window.agendaDataCurrentDate;

        month = date.getMonth();
        year = date.getFullYear();

        $(this).updateAgendaDateDisplay(date);
        $(this).buildCalendar(month, year);
    },
    $.fn.buildCalendarEvent = function(calendarDay, month, year, appendCSS, hiddenText) {
        var dateActual = (calendarDay) + "/" + (month + 1) + "/" + year;
        if (appendCSS == undefined)
            appendCSS = "";
        var html = "";
        if (hiddenText) {
            html += '<span class=\"amagar\">' + hiddenText + '</span>';
        }
        if (window.agendaDataEvents[dateActual]) {
            html += "<span class=\"alert\" > " + window.agendaDataEvents[dateActual].events.length + " <span class=\"amagar\">citas</span></span>";
        }

        $(this).append("<td class=\"link " + appendCSS + "\"><a href=\"#\" onclick=\"$.mobile.activePage.setDayView(" + year + "," + month + "," + calendarDay + ")\">" + calendarDay + " " + html + " </a></td>");
    },
    $.fn.setDayView = function(year, month, day) {
        $(this).find('datatoday').each(function() {
            $(this).remove();
        });
        $(this).append("<div hidden=\"true\" id=\"datatoday\" day=\"" + day +
            "\" month=\"" + month + "\" + year=\"" + year + "\"></div>");
        $.mobile.changePage("agendadia.html", {
            transition: 'none',
            changeHash: true
        });
    },
    $.fn.refreshAgendaData = function(cache) {
        cache = cache || true;
        var fetchAgendaData = function() {
            var urlGet = $.edu_uoc_Authentication.getCampusUrlBase() + "/rb/inici/grid.rss?app:mobile=true&s=" + $.edu_uoc_Authentication.getCampusSession() + "&app:cache=false&app:only=agenda";
            return $.ajax({
                url: urlGet,
                type: "GET"
            }).then(function storeData(data) {
                if($(data).find('item category:contains(\'CALENDAR\')').length > 0) {
                    localStorage.setItem('Agenda:' + $.edu_uoc_Authentication.getCampusUsername(), (new XMLSerializer()).serializeToString(data));
                } else {
                    data = $.parseXML(localStorage.getItem('Agenda:' + $.edu_uoc_Authentication.getCampusUsername()));
                }

                return data;
            });
        };
        var getAgendaData = function(cache) {
            cache = cache || true;
            var deferred = jQuery.Deferred();

            setTimeout(function getData() {
                var data;
                try {
                    data = $.parseXML(localStorage.getItem('Agenda:' + $.edu_uoc_Authentication.getCampusUsername()));
                } catch (e) {}

                if (typeof data !== 'undefined' && cache) {
                    deferred.notify(data);
                }

                fetchAgendaData().then(function onRSSData(data) {
                    deferred.resolve(data);
                });


            }, 1);

            return deferred.promise();
        };

        var refreshUI = function(data) {
            disableSection('#events');
            window.agendaDataEvents = {};

            $(data).find('item category:contains(\'CALENDAR\')').each(
                function() {
                    // name the current found item this
                    // for this particular loop run
                    var $item = $(this).parent();
                    // grab the post title
                    var title = unescape($item.find('title')
                        .text());
                    var eventType = $item.find('category[domain=\'EVENT_TYPE\']') ? $item.find('category[domain=\'EVENT_TYPE\']').text() : '0';
                    var eventIsDomain = $item.find('category[domain=\'EVENT_IS_DOMAIN\']') ? $item.find('category[domain=\'EVENT_IS_DOMAIN\']').text() == 'true' : false;
                    var eventColor = $item.find('category[domain=\'EVENT_COLOR\']') ? $item.find('category[domain=\'EVENT_COLOR\']').text() : '';
                    var eventFolder = $item.find('category[domain=\'EVENT_FOLDER\']') ? $item.find('category[domain=\'EVENT_FOLDER\']').text() : 'sin archivar';

                    // grab the post description
                    var description = $item.find(
                        'description').text();
                    // grab the post's URL
                    var link = $item.find('link').text();

                    if (title != "no hay datos" && link != $.edu_uoc_Authentication.getCampusUrlBase()) {
                        //Hay que descomentar esto para que vuelva a funcionar correctamente
                        var pubDateString = $item.find('pubDate').text();
                        //var dateText = Date.parse(pubDate);
                        var hasHour = false;
                        var dateTextString = pubDateString;
                        if (pubDateString.indexOf('T') > 0) {
                            var dateText2 = pubDateString.replace("T", " ");
                            dateTextString = dateText2.replace(":00+00", "");
                            hasHour = true;
                        }
                        pubDate = Date.parse(dateTextString);
                        var dateText = pubDate.toString('d/M/yyyy');
                        var hourText = pubDate.toString('HH:mm');
                        if (!hasHour)
                            hourText = "Todo el día";

                        var eventYear = pubDate.getFullYear();
                        var eventMonth = pubDate.getMonth();
                        var dateYear = new Date();
                        //Para comprobar si es mayor que la fecha actual o como máximo un mes antes
                        actualYear = dateYear.getFullYear();
                        actualMonth = dateYear.getMonth();
                        actualMonth = actualMonth - 1;

                        if (eventYear >= actualYear) {
                            if (eventMonth >= actualMonth) {
                                var hKey = (hasHour ? hourText : null);
                                if (window.agendaDataEvents[dateText]) {
                                    window.agendaDataEvents[dateText].hour.push(hKey);
                                    window.agendaDataEvents[dateText].events.push(title);
                                    window.agendaDataEvents[dateText].types.push(eventType);
                                    window.agendaDataEvents[dateText].isDomains.push(eventIsDomain);
                                    window.agendaDataEvents[dateText].folders.push(eventFolder);
                                    window.agendaDataEvents[dateText].colors.push(eventColor);
                                } else {
                                    window.agendaDataEvents[dateText] = {
                                        hour: [(hasHour ? hourText : null)],
                                        events: [title],
                                        types: [eventType],
                                        isDomains: [eventIsDomain],
                                        folders: [eventFolder],
                                        colors: [eventColor]
                                    };
                                }
                            }

                        }
                    }
                });
            var numEventos = 0;
            $.each(window.agendaDataEvents, function(i, valor) {
                var splittedDate = i.split('/');
                var eventDate = Date.parse(splittedDate[1] + '/' + splittedDate[0] + '/' + splittedDate[2])
                if (Date.today().getMonth() == eventDate.getMonth()) {
                    console.log('@@ EVENT @@ - ' + eventDate);
                    console.log('@@ EVENT @@ - ' + eventDate.getTime() + ' > ' + Date.today().getTime() + ' = ' + (eventDate.getTime() >= Date.today().getTime()));
                    if (eventDate.getTime() >= Date.today().getTime()) {
                        numEventos += valor.events.length;
                    }
                }
            });

            enableSection('#events');
            setAlert('#events', numEventos, false);

        };


        return getAgendaData(cache).then(refreshUI).progress(refreshUI);
    },
    $.fn.buildNewEvent = function() {
        var src = $.edu_uoc_Authentication.getCampusUrlBase() + '/webapps/Agenda/NavigationServlet?operacion=new&jsp=/jsp/Calendar/agEvent.jsp&activeView=&l=a&id=-1&hora=-2&s=' + $.edu_uoc_Authentication.getCampusSession();
        if ($.edu_uoc_Network.isOnLine()) {
            $.blockUI();
            var targetDiv = $(this).find('div[data-role="content"]');
            targetDiv.empty();

            setTimeout(function() {
                var htmliFrame = '<iframe src="' + src + '" onload="$.unblockUI();this.contentWindow.addEventListener(\'unload\', $.blockUI);"/>';
                var iframe = targetDiv.append(htmliFrame);
                iframe.ready(function() {
                    $.blockUI();
                });
            }, 1000);
        } else {
            showGeneralError($.edu_uoc_Localization.getLocale('no-connection-error'), false);
        }
    },
    $.fn.beforeShowPageDay = function(data) {
        var from = data.prevPage;
        if ($($(from).find('#datatoday')).length > 0) {
            var elem = $($(from).find('#datatoday')[0]);

            var day = elem.attr('day');
            var month = elem.attr('month');
            var year = elem.attr('year');

            var date = new Date();
            date.setFullYear(parseInt(year));
            date.setDate(parseInt(day));
            date.setMonth(parseInt(month));

            $(this).refreshPageDay(date);
        }
    },
    $.fn.refreshPageDay = function(date) {
        window.agendaDataCurrentDate = date;
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

        // Update displays
        $(this).find('.nativedatepicker').each(function() {
            $(this).val(window.agendaDataCurrentDate.toString("dd/MMM/yyyy"));
        });

        $(this).updateAgendaDiaDateDisplay(window.agendaDataCurrentDate);

        // This fixes the problem you mention at the bottom of this script with it not working a second/third time around, because it is in focus.
        $(this).find('.nativedatepicker').each(function() {
            $(this).val(window.agendaDataCurrentDate.toString("dd/MMM/yyyy"));
        });

        // Clear old data
        $('#fulldayevents').empty();
        for (var i = 0; i < 23; i++) {
            if ($('#' + i))
                $('#' + i).empty();
        }

        /* Fill new data */
        var events = window.agendaDataEvents[day + "/" + (month + 1) + "/" + year];
        if (!events) {
            return;
        }

        var titleEvents = events.events;

        var len = titleEvents.length;
        var htmlEvent = "";
        var target;
        for (var i = 0; i < len; i++) {
            target = null;

            var theHour = Date.parse(events.hour[i]);
            if (theHour) {
                // Evento con hora
                var tHour = theHour.getHours();
                target = $('#' + tHour + '');
            } else {
                // Evento todo el día
                target = $('#fulldayevents');
            }
            htmlEvent = '<li>';

            htmlEvent += $(events).imgFromEvents(i);
            htmlEvent += titleEvents[i];
            htmlEvent += '</li>';
            target.append(htmlEvent);
        }
    },
    $.fn.imgFromEvents = function(position) {
        var events = this[0];
        var imgHtmlEvent = "";
        var isDomain = events.isDomains[position];
        var eventType = events.types[position];
        var title = events.events[position];

        if (isDomain) {
            lliurament = '';
            if (eventType == '29') lliurament = "-imp";
            imgHtmlEvent += "<img src='css/images/cites/ico-";
            imgHtmlEvent += events.colors[position];
            imgHtmlEvent += lliurament + ".svg' alt='" + title + "' title='" + title + "'>";
        } else {
            lliurament = "ico-personal.svg";
            if (eventType == '16') {
                lliurament = "academic-" + events.colors[position] + '.svg';
            }
            imgHtmlEvent += "<img src='css/images/cites/";
            imgHtmlEvent += lliurament + "' alt='" + title + "' title='" + title + "'>";
        }
        return imgHtmlEvent;
    },
    $.fn.bindNewEvent = function() {
        var thisForm = $(this);

        this.submit(function() {
            var src = $.edu_uoc_Authentication.getCampusUrlBase() + '/webapps/Agenda/AgendaServlet';
            var INITIALDATE_HH = '0';
            var INITIALDATE_MM = '0';
            var DURATION_HH = '1';
            var DURATION_MM = '0';
            var validForm = true;
            thisForm.find('[required]').each(function() {
                if ($(this).val() == '')
                    validForm = false;
            });
            if (!validForm) {
                $.mobile.activePage.find('.error').show();
                $.mobile.activePage.addClass('b-error');
                $('html, body').animate({
                    scrollTop: 0
                }, 0);
                return false;
            }
            $.mobile.activePage.find('.error').hide();
            if (thisForm.find('#horainici').val().split(':').length > 1) {
                var INITIALDATE = new Date();
                INITIALDATE.setHours(thisForm.find('#horainici').val().split(':')[0]);
                INITIALDATE.setMinutes(thisForm.find('#horainici').val().split(':')[1]);
                INITIALDATE_HH = INITIALDATE.toString('H');
                INITIALDATE_MM = INITIALDATE.toString('m');
            }
            if (thisForm.find('#horadurada').val().split(':').length > 1 && thisForm.find('#horainici').val().split(':').length > 1) {
                var iniDate = Date.parse('1/1/2000 ' + thisForm.find('#horainici').val());
                var finDate = Date.parse('1/1/2000 ' + thisForm.find('#horadurada').val());
                DURATION_HH = parseInt(((finDate.getTime() - iniDate.getTime() + 1) / 1000) / 60 / 60);
                DURATION_MM = parseInt(((finDate.getTime() - iniDate.getTime() + 1) / 1000) % 60);
                if (DURATION_HH < 0 || DURATION_MM < 0) {
                    showGeneralError(null, false);
                    return false;
                }

            }

            var data = {
                INITIALDATE: Date.parse(thisForm.find('#data').val()).toString('dd/MM/yyyy'),
                activeView: "dailyView",
                appId: "UOC",
                bimonthly_category: "-1",
                bimonthly_date_fin: "none",
                bimonthly_date_ini: "none",
                bimonthly_date_next: "none",
                bimonthly_date_now: (new Date()).toString('dd/MM/yyyy'),
                bimonthly_date_prev: "none",
                bimonthly_date_view: (new Date()).toString('dd/MM/yyyy'),
                canDisplay: "true",
                canInsertDelete: "true",
                canModify: "true",
                categ: "0",
                categType: "1",
                cbShared: "0",
                comboLocked: "false",
                contextApp: "/webapps/Agenda",
                counter: "0",
                daily_date_fin: "none",
                daily_date_ini: "none",
                daily_date_next: "none",
                daily_date_now: (new Date()).toString('dd/MM/yyyy'),
                daily_date_prev: "none",
                daily_date_view: (new Date()).toString('dd/MM/yyyy'),
                defaultPreferences: "1,1,1",
                defaultView: "0",
                diasRepiteCada: thisForm.find('#diarepetir').val(),
                events_filter_category: "-1",
                events_filter_fechaFin: "",
                events_filter_fechaIni: "",
                hora: "-2",
                id: "-1",
                idCateg_contacto: "TODAS",
                idCateg_nota: "TODAS",
                idLang: $.edu_uoc_Authentication.getCampusLang(),
                id_usuario_agenda: $.edu_uoc_Authentication.getCampusUserId().split('.')[1],
                id_usuario_conectado: $.edu_uoc_Authentication.getCampusUserId().split('.')[1],
                jsp: "/jsp/Calendar/agEvent.jsp",
                l: $.edu_uoc_Authentication.getCampusLang(),
                minicalendar_category: "-1",
                minicalendar_date_fin: "none",
                minicalendar_date_ini: "none",
                minicalendar_date_next: "none",
                minicalendar_date_now: (new Date()).toString('dd/MM/yyyy'),
                minicalendar_date_prev: "none",
                minicalendar_date_view: (new Date()).toString('dd/MM/yyyy'),
                monthly_category: "-1",
                monthly_date_fin: "none",
                monthly_date_ini: "none",
                monthly_date_next: "none",
                monthly_date_now: (new Date()).toString('dd/MM/yyyy'),
                monthly_date_prev: "none",
                monthly_date_view: (new Date()).toString('dd/MM/yyyy'),
                nombre: escape(thisForm.find('#assumpte').val()),
                nombre_agenda_seleccionada: "Personal",
                notes: escape(thisForm.find('#descripcio').val()),
                operacion: "new",
                paramLang: "l",
                query_contacto: "",
                refreshAccess: "false",
                repTillDate: (thisForm.find('#datafi').val() != "") ? Date.parse(thisForm.find('#datafi').val()).toString('dd/MM/yyyy') : "",
                s: $.edu_uoc_Authentication.getCampusSession(),
                sel_DURATION_HH: DURATION_HH,
                sel_DURATION_MM: DURATION_MM,
                sel_INITIALDATE_HH: INITIALDATE_HH,
                sel_INITIALDATE_MM: INITIALDATE_MM,
                visibility: 'a',
                weekly_category: "-1",
                weekly_date_fin: "none",
                weekly_date_ini: "none",
                weekly_date_next: "none",
                weekly_date_now: (new Date()).toString('dd/MM/yyyy'),
                weekly_date_prev: "none",
                weekly_date_view: (new Date()).toString('dd/MM/yyyy')
            };
            if (thisForm.find('#repAlways').is(':checked'))
                data.repAlways = 1;
            if (thisForm.find('#cbAnual').is(':checked'))
                data.cbAnual = 1;
            if (thisForm.find('#totdia').is(':checked'))
                data.cbNOTIME = 1;
            if (thisForm.find('#repetir').is(':checked'))
                data.cbNOTIME2 = 1;

            $.post(src, data, function(data) {
                if (data.indexOf('redirectFather') > 0) {
                    clearTimer();
                    refreshHome(function() {
                        $.mobile.changePage('agenda.html');
                        $.mobile.activePage.refreshAgendaData();
                        $.mobile.activePage.setActualDate(window.agendaDataCurrentDate);
                        initTimer();
                    }, false);
                } else {
                    showGeneralError(null, false);
                }
            });
            return false;
        });
    }, $.fn.bindNativeDatePicker = function() {
        if ($(this).attr('data-bind')) {
            return;
        }
        $(this).attr('data-bind', 'nativedatepicker');
        $(this).bind('click', function(e) {
            var currentField = $(this);
            var myNewDate = Date.parse(currentField.val()) || new Date();

            window.plugins.datePicker.show({
                date: myNewDate,
                mode: 'date', // date or time or blank for both
                allowOldDates: false
            }, function(returnDate) {
                var newDate = new Date(returnDate);
                // Update both fields
                currentField.val(newDate.toString("dd/MM/yyyy"));
            });
        });
    }, $.fn.bindNativeDatePickerToDateInputs = function() {
        $(this).find('[type=date]').each(function() {
            $(this).bindNativeDatePicker();
        });
    }, $.fn.bindNativeTimePicker = function() {
        if ($(this).attr('data-bind')) {
            return;
        }
        $(this).attr('data-bind', 'nativetimepicker');
        $(this).bind('click', function(e) {
            var currentField = $(this);
            var myNewDate = Date.parse((new Date()).toString("MM/dd/yyyy ") + currentField.val()) || new Date();

            window.plugins.datePicker.show({
                date: myNewDate,
                mode: 'time', // date or time or blank for both
                allowOldDates: true
            }, function(returnDate) {
                var newDate = new Date(returnDate);
                // Update both fields
                currentField.val(newDate.toString("HH:mm"));
            });
        });
    }, $.fn.bindNativeTimePickerToTimeInputs = function() {
        $(this).find('[type=time]').each(function() {
            $(this).bindNativeTimePicker();
        });
    }, $.fn.adaptAgendaHeightPage = function() {
        var headerH = $(this).find('[data-role="header"]').outerHeight();
        var capceleraH = $(this).find('div.capcalera').outerHeight();
        var contentH = $(window).height();

        $(this).find('div.cites').css('min-height', (contentH - (headerH + capceleraH)));
        $(this).find('table').css('height', (contentH - (headerH + capceleraH)));
    };
})(jQuery);

var refreshTimer = null;
var entry;
var j = 0;
window.rssRetry = 0;
window.firstOpen = true;

function showGeneralError(message, logout, closeApp) {
    var onclickJS = 'goBack();';

    try {
        if (logout == null) {
            logout = true;
        }
        if (closeApp == null) {
            closeApp = false;
        }
        if (message == null) {
            message = $.edu_uoc_Localization.getLocale('error-general-description');
        }

        $('#generalErrorDlg').bind('pageshow', function(e) {
            console.log('@@ generalErrorDlg @@ - Message: ' + message);
            $(this).find('#description').text(message);
            $(this).find('a').each(function() {
                console.log('@@ generalErrorDlg @@ - Remove click');
                console.log('@@ generalErrorDlg @@ - Added click');
                $(this).unbind('click');
                $(this).bind('click', function() {
                    if (logout) {
                        console.log('@@ generalErrorDlg @@ - Logout');
                        $.edu_uoc_Authentication.logoutApp(closeApp);
                    } else {
                        $("#generalErrorDlg").dialog("close");
                    }
                });
            });
            $(this).unbind(e);
        });

        $.mobile.changePage('#generalErrorDlg', {
            transition: 'pop',
            changeHash: false
        });

        if (message && message != $.edu_uoc_Localization.getLocale('no-connection-error')) {
            if (printStackTrace && message) {
                try {
                    var complete_message = message + ' <br/>[' + printStackTrace().join('\n\n') + ']';
                    console.log('@@ EE @@ => ' + complete_message);
                } catch (err) {}
            }
            $.edu_uoc_phonegap_GoogleAnalytics.trackException(message, closeApp);
        }
    } catch (err) {}
    $.edu_uoc_phonegap_Loader.hideLoader();
}

function goBack() {
    try {
        if ($.mobile.urlHistory.getPrev().pageUrl == 'menuPage') {
            window.history.go(-2);
        } else if ($.mobile.urlHistory.getPrev().pageUrl == 'login-page' && $.mobile.activePage.attr('data-role') == 'dialog') {
            $.mobile.activePage.dialog('close');
        } else if ($.mobile.urlHistory.getPrev().pageUrl.indexOf('creacita') > 0) {
            $.mobile.changePage('home.html');
        } else {
            window.history.back();
        }
    } catch (err) {
        window.history.back();
    }

}

function showMenu() {
    if ($.mobile.activePage.find('a[href="#menuPage"]')) {
        $.mobile.activePage.find('a[href="#menuPage"]').click();
    } else {
        $.mobile.changePage('#menuPage', {
            transition: 'slide',
            changeHash: true
        });
    }
}

function openExternal(src) {
    console.log('[openExternal] Abriendo: ' + src);
    if ($.edu_uoc_Network.isOnLine()) {
        $.edu_uoc_phonegap_Loader.showLoader();
        $('#externalPage iframe').remove();

        var iframe = $('<iframe dara-role="content" class="ui-content loading" role="content" src="' + src + '"/>');
        iframe.attr('width', '0');
        iframe.attr('height', '0');

        $('#externalPage').append(iframe).trigger('create');

        iframe.ready(function() {
            $.edu_uoc_phonegap_Loader.showLoader();
            console.log('@@@@ IFRAME READY');
        });
        iframe.load(function(a, b, c) {
            if (!iframe.attr('style')) {
                var headerH = $.mobile.activePage.find('[data-role="header"]').outerHeight();
                var contentH = $(window).height();
                var maxWidth = $(window).width();
                iframe.attr('width', maxWidth);
                iframe.attr('height', contentH - headerH);
                iframe.attr('style', 'margin-top:' + headerH + 'px');
                iframe.contents().scrollTop(0);
            }
            console.log('@@@@ IFRAME LOAD');
            this.contentWindow.addEventListener('beforeunload', function() {
                $.edu_uoc_phonegap_Loader.showLoader();
                console.log('@@@@ IFRAME BEFOREUNLOAD');
            });
            this.contentWindow.window.addEventListener("uoc-download", uoc_download_Handler, false);
            if (this.contentWindow.document.location.href.indexOf('#') < 0) {
                this.contentWindow.scrollTo(0, 0);
            }
        });
        iframe.bind('load', function() {
            $.edu_uoc_phonegap_Loader.hideLoader();
            console.log('@@ IFRAME @@ - LOAD');
            $(this).removeClass('loading');
        });
        iframe.bind('uoc-download', function(eventObj, url) {
            console.log('@@@@ IFRAME BIND UOC DOWNLOAD: ' + url);
            $.edu_uoc_phonegap_Downloader(url);
        });
        $.mobile.changePage('#externalPage');
    } else {
        console.log('[openExternal] No hay conexión');
        showGeneralError($.edu_uoc_Localization.getLocale('no-connection-error'), false);
    }
}

function resolveServeiAtencio() {
    window.serveiAtencioUrl = null;
    var session = $.edu_uoc_Authentication.getCampusObjectSession();

    if (session.currentProfile.appId == 'UOC') {
        if (
            session.currentProfile.userTypeId != 'ESTUDIANT_M25' && session.currentProfile.userTypeId != 'ESTUDIANT_AMIDA' && session.currentProfile.userTypeId != 'ESTUDIANT_EV' && session.currentProfile.userTypeId != 'CONVENI' && session.currentProfile.userTypeId != 'INCORPORACIO_CONVENI' && session.currentProfile.userTypeId != 'DOCTORANT_DT' && !(session.currentProfile.userTypeId == 'PARTICIPANT_FC' && session.currentProfile.userSubTypeId == 'oc') && !(session.currentProfile.userTypeId == 'ESTUDIANT' && session.currentProfile.userSubTypeId == 'ms05') && !(session.currentProfile.userTypeId == 'INCORPORACIO_PG' && session.currentProfile.userSubTypeId == 'bs')
        ) {
            window.serveiAtencioUrl = '/estudiant/servei_atencio/ca/index.html';
        }


    } else
    if (session.currentProfile.appId == 'UOC2000') {
        if (
            session.currentProfile.userTypeId != 'ESTUDIANT_M25' && session.currentProfile.userTypeId != 'ESTUDIANT_AMIDA' && session.currentProfile.userTypeId != 'EXAMEN_M25' && session.currentProfile.userTypeId != 'CONVENI_UOC_IB' && !(session.currentProfile.userTypeId == 'ESTUDIANTE_FC_IB' && session.currentProfile.userSubTypeId == 'oc') && !(session.currentProfile.userTypeId == 'INCORPORACIO_PG' && session.currentProfile.userSubTypeId == 'bs')
        ) {
            if (session.currentProfile.userTypeId == 'ESTUDIANT_PG') {
                var lang = $.edu_uoc_Localization.getLanguage() == 'ca' ? 'ca' : 'es';
                window.serveiAtencioUrl = '/estudiant/servei_atencio/' + lang + '/index.html';
            } else {
                window.serveiAtencioUrl = '/estudiant/servei_atencio/es/index.html';
            }
        }
    }
    if (window.serveiAtencioUrl == null) {
        var lang = $.edu_uoc_Localization.getLanguage() == 'ca' ? 'ca' : 'es';
        window.serveiAtencioUrl = '/estudiant/servei_atencio/' + lang + '/index.html';
    }
}

function openServeiAtencio() {
    $.edu_uoc_phonegap_GoogleAnalytics.trackPageView("ServeiAtencio");
    openExternal($.edu_uoc_Authentication.getCampusUrlBase(false) + window.serveiAtencioUrl + '?s=' + $.edu_uoc_Authentication.getCampusSession() + '&userId=' + $.edu_uoc_Authentication.getCampusUserId().split('.')[1] + '&appId=' + $.edu_uoc_Authentication.getCampusObjectSession().currentProfile.appId + '&app:mobile=true');
}

function openExpedient() {
    // http://cv.uoc.edu/webapps/seleccioexpedient/cerca.html?s=[sessio
    $.edu_uoc_phonegap_GoogleAnalytics.trackPageView("Expedient");
    openExternal($.edu_uoc_Authentication.getCampusUrlBase(false) + '/webapps/seleccioexpedient/cerca.html?s=' + $.edu_uoc_Authentication.getCampusSession() + '&app:mobile=true');
}

function openBustia() {
    $.removeCookie('JSESSIONID', {
        path: '/WebMail'
    });
    $.edu_uoc_phonegap_GoogleAnalytics.trackPageView("WebMail");
    openExternal($.edu_uoc_Authentication.getCampusUrlBase() + '/WebMail/attach.do?mobile=yes&android=yes&phonegap=yes&pib=false&s=' + $.edu_uoc_Authentication.getCampusSession() + '&app:ts=' + Date.now().getTime().toString()); // TIMESTAMP en la llamada para evitar caches.
}

function openMateriales() {
    openExternal($.edu_uoc_Authentication.getCampusUrlBase() + '/webapps/mymat/listAssigAct.action?s=' + $.edu_uoc_Authentication.getCampusSession());
}

function openAgenda() {
    openExternal($.edu_uoc_Authentication.getCampusUrlBase() + '/webapps/Agenda/NavigationServlet?operacion=new&jsp=/jsp/Calendar/agEvent.jsp&activeView=&l=a&id=-1&hora=-2&s=' + $.edu_uoc_Authentication.getCampusSession());
}

function openAula(widgetCode, domainCode) {
    $.edu_uoc_phonegap_GoogleAnalytics.trackPageView("Aula");
    $.edu_uoc_phonegap_Loader.showLoader();
    //  http://cv-test.uoc.edu/rb/inici/widget/render_classroom/51254?s=cd71eca866f9ad9e84aeb53230225b75a89aeddd05f9849cc201335635729ce275d50f724815d23161ac48c15973d1078ea073eb15946d07b97c0bdffbc3c60f
    $.edu_uoc_Authentication.isAuthenticated(function() {
        var link = $.edu_uoc_Authentication.getCampusUrlBase() + '/rb/inici/widget/render_classroom/' + widgetCode + '?s=' + $.edu_uoc_Authentication.getCampusSession();

        if (domainCode) {
            link += '&dCode=' + domainCode;
        }
        openExternal(link);
    }, function() {
        $.edu_uoc_Authentication.logoutApp(false);
    });
}
function setLoading(id) {
    var disabled = $(id).hasClass('ui-disabled');
    setAlert(id, 999);
    var html = Mustache.to_html($('#icon-loading-template').html(), {
        text: $.edu_uoc_Localization.getLocale('news')
    });
    $(id + ' .alert').html(html);
    if(disabled) {
        $(id).addClass('ui-disabled');
    }
}
function setAlert(id, num, toggle, hiddeBubble, hide) {
    var disabled = $(id).hasClass('ui-disabled')
    num = parseInt(num);
    if (toggle == null)
        toggle = true;

    if (hiddeBubble == null)
        hiddeBubble = false;
    if (hide == null)
        hide = false;

    if (num > 0) {
        enableButton(id);
        enableButton('#menuitem-' + id.replace('#', ''));
        if (num > 99) {
            num = '99+';
        }
        $(id + ' .alert').removeClass('ninja');

        var tkey = $.trim(num) > 1 || $.trim(num).indexOf('+') ? 'news' : 'novelty';

        if ($(id + ' .alert').hasClass('comptador')) {
            tkey = $.trim(num) > 1 || $.trim(num).indexOf('+') ? 'items' : 'item';
        }

        $(id + ' .alert').html(Mustache.to_html($('#icon-alert-template').html(), {
            counter: $.trim(num),
            text: $.edu_uoc_Localization.getLocale(tkey)
        }));
    } else {
        if (toggle) {
            disableButton(id, hide);
            disableButton('#menuitem-' + id.replace('#', ''), hide);
        }
        $(id + ' .alert').addClass('ninja');
        $(id + ' .alert').text(0);
    }

    if (hiddeBubble) {
        $(id + ' .alert').addClass('ninja');
    }

    if(disabled) {
        $(id).addClass('ui-disabled');
    }

}

function addRoom($item, cache) {
    cache = cache || false;
    var counter = 0;
    var domainCode = $item.find('category').text().split('-')[0];

    var user_modul_id = 0;
    if ($item.find('category:contains("USER_MODUL_ID")').length > 0) {
        user_modul_id = parseInt($item.find('category:contains("USER_MODUL_ID")').first().text().split('#')[1]);
    }

    try {
        $(getLastData()).find("item > category:contains('" + domainCode + "-AULA'):contains('_RESOURCES')").each(function() {
            var item = $(this).parent();
            if (item.find('title').first().text() != 'Microblog') {
                pvalue = parseInt(item.find('description').first().text().split(':')[0]);
                if (pvalue > 0)
                    counter += parseInt(item.find('description').first().text().split(':')[0]);
            }
        });
    } catch (err) {}
    // var gaAction = "$.edu_uoc_phonegap_GoogleAnalytics.trackPageView('Aula: " + $item.find('title').text() + "');";
    var link = "openAula('" + user_modul_id + "');";
    var aula_image = 'asignatura.svg';

    if ($item.find('category').text().indexOf('AULA_TUTOR_DEFINITION') >= 0) {
        link = "openAula('" + user_modul_id + "', '" + domainCode + "');";
        aula_image = 'tutor.svg';
    }

    // link += gaAction;

    $('#grid').find('#classroom_' + domainCode).each(function() {
        $(this).remove();
    });
    $('#grid').append(
        '<div class="phone-large-icon" id="classroom_' + domainCode + '">' + '<a class="ui-link" href="#" onclick="' + link + '" ontouchstart="return true;">' + '  <img src="css/images/' + aula_image + '" alt/>' + '  <span class="ninja alert">0</span>' + '  <span class="nom"><span>' + $item.find('title').text() + '</span></span>' + '</a>' + '</div>'
    );
    setAlert('#classroom_' + domainCode, counter, false);
    if(cache && $.edu_uoc_Network.isOnLine()) {
        setLoading('#classroom_' + domainCode);
    }
    if (!$.edu_uoc_Network.isOnLine()) {
        disableButton('#classroom_' + domainCode);
    }
}

function enableSection(id) {
    enableButton(id);
    enableButton('#menuitem-' + id.replace('#', ''));
}

function disableSection(id) {
    disableButton(id);
    disableButton('#menuitem-' + id.replace('#', ''));
}

function enableButton(id) {
    console.log('@@ Hablilitando el id: ' + id);
    $(id).removeClass('ui-disabled');
    $(id).show();
}

function disableButton(id, hide) {
    console.log('@@ Deshablilitando el id: ' + id);
    if (hide == undefined || hide == null)
        hide = false;
    $(id).addClass('ui-disabled');
    if (hide)
        $(id).hide();
}

function refreshHome(callback) {
    if (getLastData()) {
        refreshHomePage(getLastData(), true);
        $.edu_uoc_phonegap_Loader.hideLoader();
    }
    fetchHomeData(
        false,
        function() {
            refreshHomePage(getLastData());
            if (callback)
                callback();
            $.mobile.activePage.trigger('create');
        },
        function() {
            if (!$.edu_uoc_Network.isOnLine() && getLastData()) {
                refreshHomePage(getLastData(), true);
            } else {
                showGeneralError();
            }
        }
    );
}

function refreshHomePage(data, cache) {
    cache = cache || false;
    $('#home [id^=classroom]').remove();


    if ($.edu_uoc_Authentication.isStudent()) {
        $('#home #notes').show();
        $('#menuitem-notes').show();
        $('#home #expedient').show();
        $('#menuitem-expedient').show();
    } else {
        $('#home #notes').hide();
        $('#menuitem-notes').hide();
        $('#home #expedient').hide();
        $('#menuitem-expedient').hide();
    }

    if ($(data).find('item').length > 0) {
        $(data)
            .find('item')
            .each(
                function() {
                    // name the current found item this
                    // for this particular loop run
                    var $item = $(this);
                    // grab the post title
                    var title = $item.find('title')
                        .text();
                    // grab the post description
                    var description_html = $item.find(
                        'description').text();
                    // grab the post's URL
                    var link = $item.find('link')
                        .text();
                    // categories
                    var categories = $item
                        .find('categories');
                    var category = $item
                        .find('category');

                    title = $("<div/>").html(title).text();

                    var description = $("<div/>").html(description_html).text();

                    if (category.text().indexOf(
                        'AULA_DEFINITION') >= 0 || category.text().indexOf(
                        'AULA_TUTOR_DEFINITION') >= 0) {
                        addRoom($item, cache);
                    }
                });

        refreshHomeEnd();
    } else if(!cache) {
        refreshHomeEnd();
    }
}

function refreshHomeEnd() {
    refreshProfiles();


    if ($($.mobile.activePage).attr('data-created') == 'true') {
        $.mobile.activePage.trigger('create');
    }
    if ($($.mobile.activePage).attr('id') != 'noticesPage') {
        $('#noticiesPage').trigger('refresh');
    }
    if ($($.mobile.activePage).attr('id') != 'avisosDlg') {
        $('#avisosDlg').trigger('refresh');
    }

    resolveServeiAtencio();
    window.firstOpen = false;

    $.edu_uoc_phonegap_Loader.hideLoader();
}

function storeLastData(data) {
    localStorage.setItem('uoc-rss-data-' + $.edu_uoc_Authentication.getCampusUsername(), (new XMLSerializer()).serializeToString(data));
}

function getLastData() {
    try {
        var data = $.parseXML(localStorage.getItem('uoc-rss-data-' + $.edu_uoc_Authentication.getCampusUsername()));
        if(data != null && $(data).find('item').length <= 0) {
            return null;
        }
        return data;
    } catch (e) {}

    return null;
}

function fetchHomeData(use_cache, success_callback, error_callback) {
    if ($.edu_uoc_Network.isOnLine() == false)
        return;
    if ($.edu_uoc_Authentication.getCampusSession() == null) {
        if (error_callback)
            error_callback();
        return;
    }
    if (use_cache == undefined || use_cache == null) {
        use_cache = true;
    } else if (use_cache != false) {
        use_cache = true;
    }
    var urlGet = $.edu_uoc_Authentication.getCampusUrlBase() + "/rb/inici/grid.rss?app:mobile=true&s=" + $.edu_uoc_Authentication.getCampusSession() + "&app:cache=" + use_cache + '&app:only=aules';
    console.log('Fetching: ' + urlGet);
    $.ajax({
        url: urlGet,
        type: "GET",
        success: function(data) {
            storeLastData(data);
            window.rssRetry = 0;

            if (success_callback)
                success_callback();
        },
        error: function(jqXHR, errorType, exceptionObject) {
            if (jqXHR.error) {
                try {
                    $.edu_uoc_phonegap_GoogleAnalytics.trackException("Ajax Error on RSS: " + jqXHR.error().statusText + '[' + errorType + '] =>' + exceptionObject, false);
                    $.edu_uoc_phonegap_GoogleAnalytics.trackEvent('Rss Error: ' + data.error().statusText, 'User Type', $(session).find('profile').first().find('userType').text() + " - " + $(session).find('profile').first().find('userSubType').text());
                } catch (err) {}
            }
            if (error_callback)
                error_callback();
        }
    });
}

function clearTimer() {
    try {
        if (refreshTimer) {
            console.log('@@ clearTimer');
            clearTimeout(refreshTimer);
        }
    } catch (err) {}
}

function initTimer(value) {
    if (!value) {
        if (window.nextRefresh) {
            value = window.nextRefresh - Date.now().getTime();
            if (value <= 0) {
                value = 0;
                window.nextRefresh = Date.now().getTime() + (1000*60*40);
            }
        } else {
            value = (1000*60*40);
            window.nextRefresh = Date.now().getTime() + value;
        }
    }
    console.log('@@ initTimer: ' + value);
    clearTimer();
    refreshTimer = setTimeout(function() {
        console.log('@@ initTimer Go!');
        setTimeout(edu.uoc.Inbox.refreshUI, 1);
        setTimeout(edu.uoc.Announcements.refreshUI, 1);
        setTimeout(edu.uoc.News.refreshUI, 1);
        setTimeout($.mobile.activePage.refreshAgendaData, 1);
        setTimeout(refreshHome, 1);
        setTimeout(refreshMaterialsList, 1);
        if ($.edu_uoc_Authentication.isStudent()) {
            setTimeout(refreshNotesPage, 1);
        }
        initTimer();
        window.started = true;
    }, value);
}

function startHomeWorker() {
    var worker = new Worker('js/workers/home.js');
    worker.addEventListener('message', function(e) {
        if (!e.data.error) {
            storeLastData($.parseXML(e.data.xml));
            console.log('@@@ Refreshing Home Page with Home worker data');
            refreshHomePage(getLastData());
        } else {
            showGeneralError(e.data.error.message);
        }
    }, false);

    worker.postMessage({
        'urlBase': $.edu_uoc_Authentication.getCampusUrlBase(),
        'session': $.edu_uoc_Authentication.getCampusSession(),
        'envTest': (window.location.href.indexOf('cv-test') > 0)
    }); // Send data to our worker.
}

function refreshProfiles() {
    setTimeout(function refreshProfilesMenu() {
        var selector = $('#menuPage #profile-selector');
        selector.empty();
        var objSession = $.edu_uoc_Authentication.getCampusObjectSession();
        $(Object.keys(objSession.profiles)).each(function() {
            var key = this;
            var profile = objSession.profiles[key];
            var selected = (profile.id == objSession.currentProfile.id);
            $(selector).append(new Option(profile.appDescription + '-' + profile.userType + '-' + profile.userSubType, profile.id, selected, selected));
        });
        try {
            $(selector).selectmenu('refresh');
        } catch (err) {}
    }, 1);
}

function changeProfile(profile_id) {
    if (profile_id == null)
        profile_id = $('#profile-selector option:selected').first().attr('value');
    var profile = $.edu_uoc_Authentication.getCampusObjectSession().profiles[profile_id];

    $.ajax({
        url: $.edu_uoc_Authentication.getCampusUrlBase() + "/webapps/campusGateway/agents/" + $.edu_uoc_Authentication.getCampusSession() + "/profiles/current.xml",
        type: "PUT",
        contentType: "application/xml;charset=utf-8",
        processData: true,
        crossDomain: true,
        data: "<profile>" + "<appId>" + profile.appId + "</appId>" + "<userTypeId>" + profile.userTypeId + "</userTypeId>" + "<userSubTypeId>" + profile.userSubTypeId + "</userSubTypeId>" + "<langId>" + profile.langId + "</langId>" + "</profile>",
        success: function() {
            var objSession = $.edu_uoc_Authentication.getCampusObjectSession();
            objSession.currentProfile = profile;
            $.edu_uoc_Authentication.setCampusObjectSession(objSession);
            window.closeApp = false;
            document.location.href = 'home.html';

        },
        error: function() {
            refreshProfiles();
        }
    });
}


function startMaterialsWorker() {
    var worker = new Worker('js/workers/materials.js');
    worker.addEventListener('message', function(e) {
        if (!e.data.error) {
            storeMaterialsData(e.data.json);
            console.log('@@@ Refreshing Home Page with Home worker data');
            refreshMaterialsPage(getMaterialsData());
        } else {
            showGeneralError(e.data.error.message);
        }
    }, false);

    worker.postMessage({
        'urlBase': $.edu_uoc_Authentication.getCampusUrlBase(),
        'session': $.edu_uoc_Authentication.getCampusSession(),
        'envTest': (window.location.href.indexOf('cv-test') > 0),
        'userId': $.edu_uoc_Authentication.getCampusUserId().split('.')[1]
    }); // Send data to our worker.
}

function refreshMaterialsList(callback, use_cache) {
    console.log('@@ MATERIALS @@ - refreshMaterialsList: ' + use_cache);
    if (use_cache == undefined || use_cache == null) {
        use_cache = !$.edu_uoc_Network.isOnLine();
    } else if (use_cache != false) {
        use_cache = true;
    }

    if (use_cache && getMaterialsData()) {
        console.log('@@ MATERIALS @@ - refreshMaterialsList: with cache');
        refreshMaterialsPage(getMaterialsData());
        if (callback)
            callback();
    } else {
        fetchMaterialsData(
            function() {
                refreshMaterialsPage(getMaterialsData());
                if (callback)
                    callback();
                $.mobile.activePage.trigger('create');
            },
            function() {
                refreshMaterialsPage([]);
            });
    }
}

function refreshMaterialsPage(data) {
    console.log('@@ MATERIALS @@ - refreshMaterialsPage...');
    $('#materialsListContainer').empty();
    var numMats = 0;
    if (data.length > 0) {
        var html = $(Mustache.to_html($('#list-materials-template').html(), {}));
        $.edu_uoc_Localization.loadLocale(html);
        $('#materialsListContainer').append(html);
        $(data).each(
            function() {
                var title = this.title;
                var codAsignatura = this.code;
                var entryTemplate = $('#material-entry-template').html();
                var dataItem = {
                    title: title,
                    items: []
                };
                $(this.dades)
                    .each(
                        function() {
                            var itemTemplate = $('#material-item-template').html();
                            var itemData = {
                                title: this.titol,
                                formats: []
                            }
                            var name = this.titol;
                            $(this.formats)
                                .each(
                                    function() {
                                        var action = '';
                                        var fileType = this.tipus._name.toLowerCase();

                                        if (this.tipus._name == 'AUDIOLLIBRE') {
                                            fileType = 'xml';
                                        }
                                        if (this.tipus._name == 'MOBIPOCKET') {
                                            fileType = 'mobi';
                                        }
                                        if (this.tipus._name == 'VIDEOLLIBRE') {
                                            fileType = 'xml';
                                        }

                                        var fileName = name + '.' + fileType;
                                        fileName = RemoveAccents(fileName.replace(/'/g, "\\'"));
                                        var asignatura = RemoveAccents(title.replace(/'/g, "\\'"));
                                        action = "$.edu_uoc_phonegap_Downloader.downloadMaterial('" + this.url + "','" + fileName + "','" + fileType + "','" + asignatura + "','" + codAsignatura + "','" + this.tipus.nom + "')";

                                        itemData['formats'].push({
                                            action: action,
                                            image: 'css/images/filetypes/' + this.tipus.src,
                                            alt: this.tipus._name

                                        });
                                    });
                            dataItem['items'].push(itemData);
                            numMats += 1;
                        });
                dataItem['nomaterials'] = (dataItem['items'].length === 0);
                var html = $(Mustache.to_html(entryTemplate, dataItem));
                $.edu_uoc_Localization.loadLocale(html);
                $('#materialsList').append(html);
            });
        $('#materialsList li').each(function(index, el) {
            $(el).click(function(event) {
                toggleCollapse(event, el);
            });
        });
    } else {
        var html = $(Mustache.to_html($('#no-materials-template').html(), {}));
        $.edu_uoc_Localization.loadLocale(html);
        $('#materialsListContainer').append(html);
    }

    setAlert('#material', numMats, false, false, false);

    var html = $(Mustache.to_html($('#all-materials-template').html(), {
        urlBase: $.edu_uoc_Authentication.getCampusUrlBase(),
        session_id: $.edu_uoc_Authentication.getCampusSession(),
        user_id: $.edu_uoc_Authentication.getCampusUserId().split('.')[1]
    }));
    $.edu_uoc_Localization.loadLocale(html);
    $('#materialsListContainer').append(html);
}

function fetchMaterialsData(success_callback, error_callback) {
    if ($.edu_uoc_Network.isOnLine() == false)
        return;
    if ($.edu_uoc_Authentication.getCampusSession() == null) {
        if (error_callback)
            error_callback();
        return;
    }

    var urlGet = $.edu_uoc_Authentication.getCampusUrlBase() + '/webapps/mymat/listAssigAct.action?s=' + $.edu_uoc_Authentication.getCampusSession() + '&userId=' + $.edu_uoc_Authentication.getCampusUserId().split('.')[1];


    /* SOLO PARA DESARROLLO */
    if (window.location.href.indexOf('cv-test') > 0 || $.edu_uoc_Authentication.getCampusUsername() == 'icv5')
        urlGet = 'mat1.html';

    console.log('Fetching: ' + urlGet);

    var materialsObject = [];
    $.ajax({
        url: urlGet,
        type: "GET",
        success: function(data) {
            var childrens = $(data).children('li');
            var liCounter = childrens.length;
            if (liCounter > 0) {
                childrens.each(
                    function() {
                        var title = $(this).find('a')
                            .text();
                        var codigo_asignatura = $(this)
                            .find('a:first-child')
                            .attr('href').split('=');
                        codigo_asignatura = codigo_asignatura[codigo_asignatura.length - 1];
                        fetchMaterialData(codigo_asignatura, function(data) {
                            liCounter = liCounter - 1;
                            console.log('Fetching Materials:' + liCounter);
                            data.title = title;
                            materialsObject.push(data);
                            if (liCounter == 0) {
                                console.log('Fetching Materials END!');
                                storeMaterialsData(materialsObject);
                                if (success_callback)
                                    success_callback();
                            }

                        });
                    });
            } else {
                storeMaterialsData(materialsObject);
                if (success_callback)
                    success_callback();
            }
        },
        error: function(jqXHR, errorType, exceptionObject) {
            if (jqXHR.error) {
                try {
                    $.edu_uoc_phonegap_GoogleAnalytics.trackException("Ajax Error on RSS: " + jqXHR.error().statusText + '[' + errorType + '] =>' + exceptionObject, false);
                    $.edu_uoc_phonegap_GoogleAnalytics.trackEvent('Rss Error: ' + data.error().statusText, 'User Type', $(session).find('profile').first().find('userType').text() + " - " + $(session).find('profile').first().find('userSubType').text());
                } catch (err) {}
            }
            if (error_callback)
                error_callback();
        }
    });
}

function fetchMaterialData(codigo_asignatura, success_callback) {
    // Fetch data from :http://cv.uoc.edu/webapps/mymat/listMatAct.action?s=403f582386cb5cab01b017d7945c0f2dec70a9a2bd37754145230f3487a21e983fd09442a4a0795ff271d19e37fa0834790ded73929267fee74d708ae6c2e14d&idLang=&userId=0&codAssig=06.515
    // "http://#{@whost}/webapps/mymat/listMaterialsAjax.action?s=#{@session_id}&userId=#{@user_id}&orig=widget&codAssig=#{codigo_asignatura}"
    //  http://#{@whost}/webapps/mymat/listMaterialsAjax.action?s=#{@session_id}&userId=#{@user_id}&codAssig=06.515
    var url = $.edu_uoc_Authentication.getCampusUrlBase() + '/webapps/mymat/listMaterialsAjax.action?s=' + $.edu_uoc_Authentication.getCampusSession() + '&userId=' + $.edu_uoc_Authentication.getCampusUserId() + '&codAssig=' + codigo_asignatura + '&orig=widget';
    /* SOLO PARA DESARROLLO */
    if (window.location.href.indexOf('cv-test') > 0 || $.edu_uoc_Authentication.getCampusUsername() == 'icv5')
        url = 'mat2.json';
    console.log('Fetching: ' + url);
    $
        .getJSON(
            url,
            function(data) {
                if(data.dades.length > 0) {
                    data.code = codigo_asignatura;
                    success_callback(data);
                } else {
                    url = url.replace(/.orig.widget$/,'');
                    $.getJSON(url,
                        function(data) {
                                data.code = codigo_asignatura;
                                success_callback(data);
                    });
                }
            });
}

function storeMaterialsData(data) {
    localStorage.setObject('uoc-materials-data-' + $.edu_uoc_Authentication.getCampusUsername(), data);
}

function getMaterialsData() {
    try {
        return localStorage.getObject('uoc-materials-data-' + $.edu_uoc_Authentication.getCampusUsername());
    } catch (e) {}

    return null;
}

function toggleCollapse(event, obj) {
    event.stopPropagation();
    if ($(obj).children('ul:first')) {
        $(obj).children('ul:first').slideToggle();
    } else if ($(obj).children('table:first')) {
        $(obj).children('table:first').slideToggle();
    }
    $(obj).toggleClass('actiu');
}

function getDeviceType() {
    var val='mobile';
    try {
        var sel = '#' + $.mobile.activePage.attr('id') + ' #devicetype';
        val = window.getComputedStyle(document.querySelector(sel), ':after').getPropertyValue('content')
    } catch(e) {}

    return val;
}

function getDeviceOrientation() {
    var val='portrait';
    try {
        var sel = '#' + $.mobile.activePage.attr('id') + ' #deviceorientation';
        val = window.getComputedStyle(document.querySelector(sel), ':after').getPropertyValue('content')
    } catch(e) {}

    return val;
}

function isDeviceMobile() {
    return getDeviceType() === 'mobile';
}

function isDeviceTablet() {
    return getDeviceType() === 'tablet';
}


function isDeviceLandscape() {
    return getDeviceOrientation() === 'landscape';
}

function isDevicePortrait() {
    return getDeviceOrientation() !== 'landscape';
}

function RemoveAccents(strAccents) {
    var strAccents = strAccents.split('');
    var strAccentsOut = new Array();
    var strAccentsLen = strAccents.length;
    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    for (var y = 0; y < strAccentsLen; y++) {
        if (accents.indexOf(strAccents[y]) != -1) {
            strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
        } else
            strAccentsOut[y] = strAccents[y];
    }
    strAccentsOut = strAccentsOut.join('');
    return strAccentsOut;
}

function isIOS() {
    return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
}

/* Sobreescribimos el objeto Storage para poder guardar objetos JSON */
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
};

document.location.href = document.location.href.substr(0,document.location.href.lastIndexOf('/')+1);

(function($) {
    $.fn.uocBindAuthentication = function(redirect_url) {
        if (redirect_url == null && this.attr('action'))
            redirect_url = this.attr('action');

        $.edu_uoc_Authentication.isAuthenticated(function() {
            window.location.href = redirect_url;
        });
        if (localStorage.getItem('uoc-username'))
            $(this).find('#username').val(localStorage.getItem('uoc-username'));

        if (localStorage.getItem('uoc-username') && localStorage.getItem('uoc-password')) {
            $(this).find('#password').val(localStorage.getItem('uoc-password'));
            $(this).find('#save-password').attr("checked", true);
        }
        this.submit(function() {
            if (!$.edu_uoc_Network.isOnLine()) {
                showGeneralError($.edu_uoc_Localization.getLocale('no-connection-error'), false);
                return false;
            }

            var lform = $(this);
            var username = lform.find('#username').val();
            var password = lform.find('#password').val();
            if (username == '' || password == '') {
                $.edu_uoc_phonegap_Loader.hideLoader();
                $.mobile.changePage('#authErrorDlg');
                return false;
            }
            $.edu_uoc_phonegap_Loader.showLoader();
            $.edu_uoc_Authentication.performBinaryAuthentication(username, password, function(session) {
                    localStorage.setItem('uoc-username', username);
                    if (lform.find('#save-password').attr("checked") == 'checked') {
                        localStorage.setItem('uoc-password', password);
                    } else {
                        localStorage.removeItem('uoc-password');
                    }
                    window.location.href = redirect_url;
                },
                function(authError) {
                    if (authError) {
                        $.mobile.changePage('#authErrorDlg');
                    } else {
                        $.mobile.changePage('#generalErrorDlg');
                    }
                    $.edu_uoc_phonegap_Loader.hideLoader();

                }
            );
            return false;
        });
    };
})(jQuery);
$.extend({
    edu_uoc_Authentication: {
        isAuthenticated: function(callback_success, callback_error) {
            if ($.edu_uoc_Authentication.getCampusObjectSession() != null && !$.edu_uoc_Network.isOnLine()) {
                if (callback_success) {
                    callback_success();
                }
            } else if (localStorage.getItem('uoc-campus-session') && $.edu_uoc_Network.isOnLine()) {
                $.ajax({
                    url: this.getCampusUrlBase() + "/webapps/campusGateway/extendedsessions/" + localStorage.getItem('uoc-campus-session') + ".xml",
                    type: "GET",
                    contentType: "application/xml;charset=utf-8",
                    dataType: "xml",
                    processData: true,
                    crossDomain: true,
                    cache: false,
                    success: function(session) {
                        if ($(session).find('authenticated').text() == 'true') {
                            console.log('Authentication success! [' + $(session).find('id').first().text() + ']');
                            window.session = $(session);
                            var objSession = {
                                id: $(session).find('id').first().text(),
                                userId: $(session).find('userId').first().text(),
                                locale: $(session).find('locale').first().text(),
                                lang: $(session).find('lang').first().text(),
                                profiles: {},
                                currentProfile: {}
                            };
                            $(session).find('profile').each(function() {
                                var objProfile = {
                                    id: $(this).find('id').text(),
                                    appId: $(this).find('appId').text(),
                                    appDescription: $("<div/>").html($(this).find('appDescription').text()).text(),
                                    userTypeId: $(this).find('userTypeId').text(),
                                    userType: $("<div/>").html($(this).find('userType').text()).text(),
                                    userSubTypeId: $(this).find('userSubTypeId').text(),
                                    langId: $(this).find('langId').text(),
                                    userSubType: $("<div/>").html($(this).find('userSubType').text()).text()
                                };
                                if (Object.keys(objSession.profiles).length == 0)
                                    objSession.currentProfile = objProfile;
                                if (!objSession.profiles[objProfile.id])
                                    objSession.profiles[objProfile.id] = objProfile;
                            });
                            localStorage.setObject('uoc-campus-obj-session', objSession);
                            localStorage.setItem('uoc-campus-session', $(session)
                                .find('id').first().text());
                            localStorage.setItem('uoc-campus-user-id', $(session)
                                .find('userId').first().text());
                            localStorage.setItem('uoc-campus-locale', $(session)
                                .find('locale').first().text());
                            localStorage.setItem('uoc-campus-lang', $(session)
                                .find('lang').first().text());
                            if (callback_success) {
                                callback_success();
                            }
                        } else {
                            window.session = null;
                            localStorage.removeItem('uoc-campus-session');
                            if (callback_error) {
                                callback_error(true);
                            }
                        }
                    },
                    error: function(data) {
                        if (callback_error) {
                            callback_error(false);
                        }
                    }
                });
            } else {
                if (callback_error) {
                    callback_error(false);
                }
            }
        },
        performBinaryAuthentication: function(username, password, callback_success, callback_error) {
            username = escape(username);
            password = escape(password);
            $.ajax({
                type: 'POST',
                url: this.getCampusUrlBase() + "/cgi-bin/uoc",
                contentType: 'application/x-www-form-urlencoded',
                processData: false,
                crossDomain: true,
                data: 'l=' + username + '&p=' + password + '&appid=WUOC&nil=XXXXXX&lb=' + $.edu_uoc_Localization.getBinaryLanguage() + '&dr=/index.html',
                success: function(output, status, xhr) {
                    var matchs = xhr.responseText.match(/&s=[0-9a-z]+"/);
                    if (matchs) {
                        localStorage.setItem('uoc-campus-session', matchs[0].substr(3, 128));
                        $.edu_uoc_Authentication.isAuthenticated(callback_success, callback_error);
                    } else {
                        matchs = xhr.responseText.match(/var error = '([^\']+)'/);
                        if (matchs != null && matchs.length > 0) {
                            var message = matchs[1];
                            message = message.replace(/contrase.a/, 'contraseña').replace(/escr.balos/, 'escríbalos').replace('<BR>', "\n").replace(/d.usuari/, "d'usuari'").replace('s.n', 'són');
                            //showGeneralError(message, false, false);
                            $.mobile.changePage('#authErrorDlg');
                            $.edu_uoc_phonegap_Loader.hideLoader();
                        } else {
                            matchs = xhr.responseText.match(/recuperacioPassword/);
                            if (matchs) {
                                showGeneralError($.edu_uoc_Localization.getLocale('error-change-password'), true, true);
                            } else {
                                if (!$.edu_uoc_Network.isOnLine()) {
                                    showGeneralError($.edu_uoc_Localization.getLocale('no-connection-error'), false);
                                } else {
                                    showGeneralError(null, true, true);
                                }
                            }
                        }
                    }
                },
                cache: false,
                error: function(data, textStatus, errorThrown) {
                    console.error(textStatus);
                    console.error(errorThrown);
                    console.error("Status:" + data.status);
                    console.error("responseText:" + data.responseText);
                    console.error("responseXML:" + data.responseXML);
                    console.error("statusCode:" + data.statusCode());
                    if (callback_error)
                        callback_error(data);
                }
            });
        },
        performAuthentication: function(username, password, callback_success, callback_error) {
            $.ajax({
                url: this.getCampusUrlBase() + "/webapps/campusGateway/extendedsessions.xml",
                type: "POST",
                contentType: "text/xml;charset=utf-8",
                dataType: "xml",
                processData: true,
                crossDomain: true,
                cache: false,
                data: "<session><name>" + username + "</name><password>" + password + "</password></session>",
                success: function(session) {
                    if ($(session).find('authenticated').text() == 'true') {
                        console.log('Authentication success! [' + $(session).find('id').first().text() + ']');
                        window.session = $(session);
                        var objSession = {
                            id: $(session).find('id').first().text(),
                            userId: $(session).find('userId').first().text(),
                            locale: $(session).find('locale').first().text(),
                            lang: $(session).find('lang').first().text(),
                            profiles: {},
                            currentProfile: {}
                        };
                        $(session).find('profile').each(function() {
                            var objProfile = {
                                id: $(this).find('id').text(),
                                appId: $(this).find('appId').text(),
                                appDescription: $("<div/>").html($(this).find('appDescription').text()).text(),
                                userTypeId: $(this).find('userTypeId').text(),
                                userType: $("<div/>").html($(this).find('userType').text()).text(),
                                userSubTypeId: $(this).find('userSubTypeId').text(),
                                langId: $(this).find('langId').text(),
                                userSubType: $("<div/>").html($(this).find('userSubType').text()).text()
                            };
                            if (Object.keys(objSession.profiles).length == 0)
                                objSession.currentProfile = objProfile;
                            if (!objSession.profiles[objProfile.id])
                                objSession.profiles[objProfile.id] = objProfile;
                        });
                        localStorage.setObject('uoc-campus-obj-session', objSession);
                        localStorage.setItem('uoc-campus-session', $(session)
                            .find('id').first().text());
                        localStorage.setItem('uoc-campus-user-id', $(session)
                            .find('userId').first().text());
                        localStorage.setItem('uoc-campus-locale', $(session)
                            .find('locale').first().text());
                        localStorage.setItem('uoc-campus-lang', $(session)
                            .find('lang').first().text());
                        if (callback_success)
                            callback_success(session);
                    } else {
                        if (callback_error)
                            callback_error(session);
                    }
                },
                error: function(data, textStatus, errorThrown) {
                    console.error(textStatus);
                    console.error(errorThrown);
                    console.error("Status:" + data.status);
                    console.error("responseText:" + data.responseText);
                    console.error("responseXML:" + data.responseXML);
                    console.error("statusCode:" + data.statusCode());
                    if (callback_error)
                        callback_error(data);
                }
            });
        },
        getUrlVars: function() {
            var vars = [],
                hash;
            var hashes = window.location.href.slice(
                window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getUrlVar: function(name) {
            return this.getUrlVars()[name];
        },
        getCampusUrlBase: function(secure) {
            if (secure == null)
                secure = true;
            var protocol = secure ? 'https' : 'http';
            if (window.location.href.indexOf('cv-test') > 0)
                return "http://cv-test.uoc.edu";
            return protocol + "://cv.uoc.edu";
        },
        getCampusUserId: function() {
            return localStorage.getItem('uoc-campus-user-id');
        },
        getCampusUsername: function() {
            return localStorage.getItem('uoc-username');
        },
        getCampusLocale: function() {
            var locale = localStorage.getItem('uoc-campus-locale');

            return locale;
        },
        getCampusLang: function() {
            var locale = localStorage.getItem('uoc-campus-lang');

            return locale;
        },
        getCampusSession: function() {
            var session = localStorage.getItem('uoc-campus-session');
            if (session == null || session == '' || session == undefined) {
                if ($.edu_uoc_Authentication.getCampusObjectSession() != null && $.edu_uoc_Authentication.getCampusObjectSession() != undefined) {
                    session = $.edu_uoc_Authentication.getCampusObjectSession().id;
                } else {
                    session = this.getUrlVar('s');
                }
            }

            return session;
        },
        getCampusObjectSession: function() {
            return localStorage.getObject('uoc-campus-obj-session');
        },
        setCampusObjectSession: function(obj) {
            return localStorage.setObject('uoc-campus-obj-session', obj);
        },
        logoutCampusSession: function() {
            localStorage.setItem('uoc-campus-obj-session', null);
            localStorage.setItem('uoc-campus-session', null);
            localStorage.removeItem('uoc-campus-session');
            localStorage.setItem('uoc-campus-user-id', null);
            localStorage.removeItem('uoc-campus-user-id');
            localStorage.setItem('uoc-campus-locale', null);
            localStorage.removeItem('uoc-campus-locale');
            localStorage.setItem('uoc-campus-lang', null);
            localStorage.removeItem('uoc-campus-lang');
        },
        logoutApp: function(closeApp) {
            if ($('iframe')) {
                $('iframe').remove();
            }

            if (closeApp == null) {
                closeApp = true;
            }

            if(!closeApp) {
            	this.logoutCampusSession();
            }
            
            if (refreshTimer) {
                clearTimeout(refreshTimer);
            }
            if (closeApp && navigator.app) {
                if (navigator.app.exitApp) {
                    navigator.app.exitApp();
                }
            }
            window.closeApp = closeApp;
            document.location.href = 'index.html#login-page';
        },
        isStudent: function() {
            var res = false;
            console.log('@@ ISSTUDENT @@');
            $(Object.keys($.edu_uoc_Authentication.getCampusObjectSession().profiles)).each(function() {
                if (this.indexOf('ESTUDIANT') >= 0 || window.location.href.indexOf('cv-test') > 0) {
                    res = true;
                }
            });
            return res;
        }
    }
});

var edu = edu || {
    uoc: {}
}
edu.uoc.News = {
    fetch: function() {
        var urlGet = $.edu_uoc_Authentication.getCampusUrlBase() + "/rb/inici/grid.rss?app:mobile=true&s=" + $.edu_uoc_Authentication.getCampusSession() + "&app:cache=false&app:only=noticies";

        return $.ajax({
            url: urlGet,
            type: "GET"
        }).then(function storeData(data) {
            localStorage.setItem('News:' + $.edu_uoc_Authentication.getCampusUsername(), (new XMLSerializer()).serializeToString(data));
        });
    },
    getData: function(cache) {
        cache = cache || true;
        var deferred = jQuery.Deferred();

        setTimeout(function getNewsData() {
            var data;
            try {
                data = $.parseXML(localStorage.getItem('News:' + $.edu_uoc_Authentication.getCampusUsername()));
            } catch (e) {}

            if (typeof data !== 'undefined' && cache) {
                deferred.notify(data);
            }
            edu.uoc.News.fetch().then(function onRssData(data) {
                deferred.resolve(data);
            }).fail(function onRssError(error) {
                try {
                    data = $.parseXML(localStorage.getItem('News:' + $.edu_uoc_Authentication.getCampusUsername()));
                } catch (e) {}

                if (typeof data !== 'undefined') {
                    deferred.resolve(data);
                }
            });

        }, 1);

        return deferred.promise();
    },
    refreshUI: function(cache) {
        cache = cache || true;
        var globalCache = cache;
        var onRssData = function(data,useCache) {
            if ($(data).find('item').length > 0) {
                if (localStorage.getItem($.edu_uoc_Authentication.getCampusUsername() + '-has-news') === null) {
                    localStorage.setItem($.edu_uoc_Authentication.getCampusUsername() + '-has-news', true);
                }

                $('#noticiesPage #content #destacades').empty();
                $('#noticiesPage #content #nodestacades').empty();
                var numNoticies = 0;
                var newsLastPubdate = null;
                $(data)
                    .find('item')
                    .each(
                        function() {
                            // name the current found item this
                            // for this particular loop run
                            var $item = $(this);
                            // grab the post title
                            var title = $item.find('title')
                                .text();
                            // grab the post description
                            var description_html = $item.find(
                                'description').text();
                            // grab the post's URL
                            var link = $item.find('link')
                                .text();
                            // categories
                            var categories = $item
                                .find('categories');
                            var category = $item
                                .find('category');

                            title = $("<div/>").html(title).text();

                            var description = $("<div/>").html(description_html).text();

                            if (category.text().indexOf(
                                'destacades') >= 0 || category.text().indexOf(
                                'altres') >= 0) {
                                var pubDate = new Date($item.find('pubDate').text());
                                var lastPubDate = new Date(localStorage.getItem($.edu_uoc_Authentication.getCampusUsername() + '-news-last-pubdate'));
                                console.log('@@ NEWS @@ - lastPubDate: ' + lastPubDate);
                                console.log('@@ NEWS @@ - pubDate: ' + pubDate);
                                console.log('@@ NEWS @@ - has news? ' + (pubDate > lastPubDate));
                                if (lastPubDate == null || pubDate > lastPubDate) {
                                    localStorage.setItem($.edu_uoc_Authentication.getCampusUsername() + '-has-news', true);
                                    if(newsLastPubdate == null || newsLastPubdate < pubDate) {
                                        newsLastPubdate = pubDate;
                                    }
                                    numNoticies += 1;
                                }

                                if (link.indexOf('http') < 0) {

                                    link = $.edu_uoc_Authentication.getCampusUrlBase() + link;
                                }

                                var action = "$.edu_uoc_phonegap_Downloader.downloadFile('" + link + "','','web','')";
                                if (category.text().indexOf(
                                    'destacades') >= 0) {
                                    var url = $item.find(
                                        'enclosure').attr(
                                        'url');
                                    if (url.indexOf('http') < 0)
                                        url = $
                                            .edu_uoc_Authentication.getCampusUrlBase() + url;

                                    $('#noticiesPage #content #destacades')
                                        .append(Mustache.to_html(
                                            $('#noticies-destacades-item-template').html(), {
                                                action: action,
                                                title: title,
                                                url: url,
                                                description: description
                                            }
                                        ));
                                } else {
                                    $('#noticiesPage #content #nodestacades')
                                        .append(Mustache.to_html(
                                            $('#noticies-nodestacades-item-template').html(), {
                                                action: action,
                                                title: title,
                                                description: description
                                            }
                                        ));
                                }
                            }
                        });
                if ($('#noticiesPage #content div.item').length == 0) {
                    $('#noticiesPage #content #destacades').empty();
                    $('#noticiesPage #content #nodestacades').empty();
                    $('#noticiesPage #content #destacades').append('<div class="item"><p data-localize="No-News">' + $.edu_uoc_Localization.getLocale('No-News') + '</p></div>');
                }
                if(newsLastPubdate) {
                    localStorage.setItem($.edu_uoc_Authentication.getCampusUsername() + '-news-last-pubdate', newsLastPubdate);
                }
                setAlert('#news', numNoticies, false, (localStorage.getItem($.edu_uoc_Authentication.getCampusUsername() + '-has-news').toString() == 'false'));


                refreshProfiles();


                if ($($.mobile.activePage).attr('data-created') == 'true') {
                    $.mobile.activePage.trigger('create');
                }
                if ($($.mobile.activePage).attr('id') != 'noticesPage') {
                    $('#noticiesPage').trigger('refresh');
                }
            }
        }
        edu.uoc.News.getData(cache).then(function(data) { onRssData(data,false); }).progress(function(data) { onRssData(data,cache); });
    }
};

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (root, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else {
    var mustache = {};
    factory(mustache);
    if (typeof define === "function" && define.amd) {
      define(mustache); // AMD
    } else {
      root.Mustache = mustache; // <script>
    }
  }
}(this, function (mustache) {

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var RegExp_test = RegExp.prototype.test;
  function testRegExp(re, string) {
    return RegExp_test.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var Object_toString = Object.prototype.toString;
  var isArray = Array.isArray || function (object) {
    return Object_toString.call(object) === '[object Array]';
  };

  function isFunction(object) {
    return typeof object === 'function';
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function escapeTags(tags) {
    if (!isArray(tags) || tags.length !== 2) {
      throw new Error('Invalid tags: ' + tags);
    }

    return [
      new RegExp(escapeRegExp(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRegExp(tags[1]))
    ];
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate(template, tags) {
    tags = tags || mustache.tags;
    template = template || '';

    if (typeof tags === 'string') {
      tags = tags.split(spaceRe);
    }

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          delete tokens[spaces.pop()];
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(tagRes[0]);
      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(['text', chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n') {
            stripSpace();
          }
        }
      }

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) break;
      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === '{') {
        value = scanner.scanUntil(new RegExp('\\s*' + escapeRegExp('}' + tags[1])));
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = '&';
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) {
        throw new Error('Unclosed tag at ' + scanner.pos);
      }

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection) {
          throw new Error('Unopened section "' + value + '" at ' + start);
        }
        if (openSection[1] !== value) {
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
        }
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        tagRes = escapeTags(tags = value.split(spaceRe));
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();
    if (openSection) {
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
    }

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
      case '^':
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case '/':
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      var string = match[0];
      this.tail = this.tail.substring(string.length);
      this.pos += string.length;
      return string;
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var index = this.tail.search(re), match;

    switch (index) {
    case -1:
      match = this.tail;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context(view, parentContext) {
    this.view = view == null ? {} : view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function (name) {
    var value;
    if (name in this.cache) {
      value = this.cache[name];
    } else {
      var context = this;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;

          var names = name.split('.'), i = 0;
          while (value != null && i < names.length) {
            value = value[names[i++]];
          }
        } else {
          value = context.view[name];
        }

        if (value != null) break;

        context = context.parent;
      }

      this.cache[name] = value;
    }

    if (isFunction(value)) {
      value = value.call(this.view);
    }

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer() {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null) {
      tokens = cache[template] = parseTemplate(template, tags);
    }

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function (tokens, context, partials, originalTemplate) {
    var buffer = '';

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    var self = this;
    function subRender(template) {
      return self.render(template, context, partials);
    }

    var token, value;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
        value = context.lookup(token[1]);
        if (!value) continue;

        if (isArray(value)) {
          for (var j = 0, jlen = value.length; j < jlen; ++j) {
            buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
          }
        } else if (typeof value === 'object' || typeof value === 'string') {
          buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
        } else if (isFunction(value)) {
          if (typeof originalTemplate !== 'string') {
            throw new Error('Cannot use higher-order sections without the original template');
          }

          // Extract the portion of the original template that the section contains.
          value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

          if (value != null) buffer += value;
        } else {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }

        break;
      case '^':
        value = context.lookup(token[1]);

        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || (isArray(value) && value.length === 0)) {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }

        break;
      case '>':
        if (!partials) continue;
        value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
        if (value != null) buffer += this.renderTokens(this.parse(value), context, partials, value);
        break;
      case '&':
        value = context.lookup(token[1]);
        if (value != null) buffer += value;
        break;
      case 'name':
        value = context.lookup(token[1]);
        if (value != null) buffer += mustache.escape(value);
        break;
      case 'text':
        buffer += token[1];
        break;
      }
    }

    return buffer;
  };

  mustache.name = "mustache.js";
  mustache.version = "0.8.1";
  mustache.tags = [ "{{", "}}" ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function (template, view, partials) {
    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  mustache.to_html = function (template, view, partials, send) {
    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

}));


// Generated by CoffeeScript 1.3.3
(function() {
  var $, normaliseLang;

  $ = jQuery;

  normaliseLang = function(lang) {
    lang = lang.replace(/_/, '-').toLowerCase();
    if (lang.length > 3) {
      lang = lang.substring(0, 3) + lang.substring(3).toUpperCase();
    }
    return lang;
  };

  $.defaultLanguage = normaliseLang(navigator.language || navigator.userLanguage);

  $.localize = function(pkg, options) {
    var defaultCallback, fileExtension, intermediateLangData, jsonCall, lang, loadLanguage, localizeElement, localizeForSpecialKeys, localizeImageElement, localizeInputElement, localizeOptgroupElement, notifyDelegateLanguageLoaded, regexify, setAttrFromValueForKey, setTextFromValueForKey, valueForKey, wrappedSet;
    if (options == null) {
      options = {};
    }
    wrappedSet = this;
    intermediateLangData = {};
    fileExtension = options.fileExtension || "json";
    loadLanguage = function(pkg, lang, level) {
      var file;
      if (level == null) {
        level = 1;
      }
      switch (level) {
        case 1:
          intermediateLangData = {};
          if (options.loadBase) {
            file = pkg + ("." + fileExtension);
            return jsonCall(file, pkg, lang, level);
          } else {
            return loadLanguage(pkg, lang, 2);
          }
          break;
        case 2:
          if (lang.length >= 2) {
            file = "" + pkg + "-" + (lang.substring(0, 2)) + "." + fileExtension;
            return jsonCall(file, pkg, lang, level);
          }
          break;
        case 3:
          if (lang.length >= 5) {
            file = "" + pkg + "-" + (lang.substring(0, 5)) + "." + fileExtension;
            return jsonCall(file, pkg, lang, level);
          }
      }
    };
    jsonCall = function(file, pkg, lang, level) {
      var ajaxOptions, successFunc;
      if (options.pathPrefix != null) {
        file = "" + options.pathPrefix + "/" + file;
      }
      successFunc = function(d) {
        $.extend(intermediateLangData, d);
        notifyDelegateLanguageLoaded(intermediateLangData);
        return loadLanguage(pkg, lang, level + 1);
      };
      ajaxOptions = {
        url: file,
        dataType: "json",
        async: false,
        timeout: options.timeout != null ? options.timeout : 500,
        success: successFunc
      };
      if (window.location.protocol === "file:") {
        ajaxOptions.error = function(xhr) {
          return successFunc($.parseJSON(xhr.responseText));
        };
      }
      return $.ajax(ajaxOptions);
    };
    notifyDelegateLanguageLoaded = function(data) {
      if (options.callback != null) {
        return options.callback(data, defaultCallback);
      } else {
        return defaultCallback(data);
      }
    };
    defaultCallback = function(data) {
      $.localize.data[pkg] = data;
      return wrappedSet.each(function() {
        var elem, key, value;
        elem = $(this);
        key = elem.data("localize");
        key || (key = elem.attr("rel").match(/localize\[(.*?)\]/)[1]);
        value = valueForKey(key, data);
        return localizeElement(elem, key, value);
      });
    };
    localizeElement = function(elem, key, value) {
      if (elem.is('input')) {
        localizeInputElement(elem, key, value);
      } else if (elem.is('img')) {
        localizeImageElement(elem, key, value);
      } else if (elem.is('optgroup')) {
        localizeOptgroupElement(elem, key, value);
      } else if (!$.isPlainObject(value)) {
        elem.html(value);
      }
      if ($.isPlainObject(value)) {
        return localizeForSpecialKeys(elem, value);
      }
    };
    localizeInputElement = function(elem, key, value) {
      if (elem.is("[placeholder]")) {
        return elem.attr("placeholder", value);
      } else {
        return elem.val(value);
      }
    };
    localizeForSpecialKeys = function(elem, value) {
      setAttrFromValueForKey(elem, "title", value);
      return setTextFromValueForKey(elem, "text", value);
    };
    localizeOptgroupElement = function(elem, key, value) {
      return elem.attr("label", value);
    };
    localizeImageElement = function(elem, key, value) {
      setAttrFromValueForKey(elem, "alt", value);
      return setAttrFromValueForKey(elem, "src", value);
    };
    valueForKey = function(key, data) {
      var keys, value, _i, _len;
      keys = key.split(/\./);
      value = data;
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        value = value != null ? value[key] : null;
      }
      return value;
    };
    setAttrFromValueForKey = function(elem, key, value) {
      value = valueForKey(key, value);
      if (value != null) {
        return elem.attr(key, value);
      }
    };
    setTextFromValueForKey = function(elem, key, value) {
      value = valueForKey(key, value);
      if (value != null) {
        return elem.text(value);
      }
    };
    regexify = function(string_or_regex_or_array) {
      var thing;
      if (typeof string_or_regex_or_array === "string") {
        return "^" + string_or_regex_or_array + "$";
      } else if (string_or_regex_or_array.length != null) {
        return ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = string_or_regex_or_array.length; _i < _len; _i++) {
            thing = string_or_regex_or_array[_i];
            _results.push(regexify(thing));
          }
          return _results;
        })()).join("|");
      } else {
        return string_or_regex_or_array;
      }
    };
    lang = normaliseLang(options.language ? options.language : $.defaultLanguage);
    if (!(options.skipLanguage && lang.match(regexify(options.skipLanguage)))) {
      loadLanguage(pkg, lang, 1);
    }
    return wrappedSet;
  };

  $.fn.localize = $.localize;

  $.localize.data = {};

}).call(this);

function refreshNotesPage(force) {
    if (force == null) {
        force = true;
    }
    if ($('#notasPage ul > li span[data-localize="No-Notes"]').length || force) {
        if (force) {
            storeNotesData(null);
        }
        var container = $('#notasPage #content').first();
        container.writeNotes();
    }
}

function fetchNotesData(success_callback, error_callback) {
    if ($.edu_uoc_Network.isOnLine() == false)
        return;
    if ($.edu_uoc_Authentication.getCampusSession() == null) {
        if (error_callback)
            error_callback();
        return;
    }

    var urlGet = $.edu_uoc_Authentication.getCampusUrlBase() + '/webapps/rac/rest/actividades/notas/' + $.edu_uoc_Authentication.getCampusSession();
    if (window.location.href.indexOf('cv-test') > 0 || $.edu_uoc_Authentication.getCampusUsername() == 'icv5')
        urlGet = 'notas.xml';
    console.log('@@ NOTES @@ - Fetching: ' + urlGet);
    $.ajax({
        url: urlGet,
        type: "GET",
        success: function(data) {
            console.log('@@ NOTES @@ - Fetched!');
            storeNotesData(data);
            if (success_callback)
                success_callback();
        },
        error: function(jqXHR, errorType, exceptionObject) {
            console.log('@@ NOTES @@ - ERROR:' + errorType);
            if (error_callback)
                error_callback();
        }
    });
}

function storeNotesData(data) {
    try {
        localStorage.setItem('uoc-notes-data-' + $.edu_uoc_Authentication.getCampusUsername(), (new XMLSerializer()).serializeToString(data));
    } catch (e) {
        localStorage.setItem('uoc-notes-data-' + $.edu_uoc_Authentication.getCampusUsername(), null);
    }

}

function getNotesData() {
    try {
        return $.parseXML(localStorage.getItem('uoc-notes-data-' + $.edu_uoc_Authentication.getCampusUsername()));
    } catch (e) {
        console.log('@@ NOTES @@ - ERROR:' + e.toString());
    }

    return null;
}


function openComments(event, pacId) {

    var container = $('#comentariPage').find('#content');
    var htmlTemplate = $('#notes-comentari-template').html();

    var activity = $(getNotesData()).find('actividad pacId:contains(' + pacId + ')').first().parent();
    var subject = activity.parent().parent();
    var name = activity.find('descripcion').first().text();
    var qualif = activity.find('nota').first().text();
    var jsonActivity = $.xml2json((new window.XMLSerializer()).serializeToString(activity[0]));
    var listaComentarios = jsonActivity.listaComentarios;

    $(listaComentarios.comentario).each(function() {
        if (this.adjunto) {
            var extFile = this.adjunto.substr(this.adjunto.lastIndexOf('.') + 1);
            var attLink = "$.edu_uoc_phonegap_Downloader.downloadFile('";
            attLink += $.edu_uoc_Authentication.getCampusUrlBase() + "/webapps/rac/dowloadFileComentari.action?comentariId=" + this.id + "&pacId=" + jsonActivity.pacId + "&codiTercers=" + jsonActivity.codiTercer + "&anyAcademic=" + jsonActivity.semestre + "&numAula=" + subject.find('numAula').first().text() + "&s=" + $.edu_uoc_Authentication.getCampusSession();
            attLink += "','" + this.adjunto + "','" + extFile + "','');";
            this.adjunto = {
                filename: this.adjunto,
                extension: extFile,
                alt: extFile,
                action: attLink
            };
        }
    });

    var commentData = {
        title: $.edu_uoc_Localization.getLocale('Comment') + ' ' + name,
        nota: $.edu_uoc_Localization.getLocale('Qualification') + ': ' + qualif,
        listaComentarios: listaComentarios
    };



    var html = $(Mustache.to_html(htmlTemplate, commentData));
    $.edu_uoc_Localization.loadLocale(html);

    container.empty();

    container.append(html);

    event.stopPropagation();

    $.mobile.changePage('#comentariPage', {
        transition: 'none',
        changeHash: true
    });
}

function startNotesWorker() {
    var worker = new Worker('js/workers/notes.js');
    worker.addEventListener('message', function(e) {
        if (!e.data.error) {
            storeNotesData($.parseXML(e.data.xml));
            refreshNotesPage(true);
        }
    }, false);

    worker.postMessage({
        'urlBase': $.edu_uoc_Authentication.getCampusUrlBase(),
        'session': $.edu_uoc_Authentication.getCampusSession(),
        'envTest': (window.location.href.indexOf('cv-test') > 0)
    }); // Send data to our worker.
}

(function($) {
    $.fn.convertToHtmlNotes = function(expedientesContainer) {
        var xml = $(this);
        if (xml.find('error').length > 0) {
            console.log('@@ NOTES @@ - error found in XML: ' + xml.find('error').first().text());
            $('#notasPage #content').writeNoNotes(xml.find('error').first().text());
            return;
        }

        var notesData = $.xml2json((new window.XMLSerializer()).serializeToString(xml[0]));
        window.notesData = notesData;

        console.log('@@ NOTES @@ - convertToHtmlNotes -> CONTAINER: ' + expedientesContainer);
        console.log('@@ NOTES @@ - convertToHtmlNotes -> CONTAINER: ' + expedientesContainer.html());
        var htmlTemplate = $('#notes-template').html();

        var html = $(Mustache.to_html(htmlTemplate, notesData));
        $.edu_uoc_Localization.loadLocale(html);
        expedientesContainer.append(html);
    };
    $.fn.writeNotes = function() {
        console.log('@@ NOTES @@ - writeNotes...');
        var container = $(this);
        console.log('@@ NOTES @@ - writeNotes -> CONTAINER: ' + container);
        console.log('@@ NOTES @@ - writeNotes -> CONTAINER: ' + container.html());
        if(container.find('ul')) {
            container.find('ul').remove();
        }
        if(container.find('div')) {
            container.find('div').remove();
        }
        var data = getNotesData();
        if (data) {
            container.append(Mustache.to_html($('#notes-template-base').html(), {}));
            container = $(container.find('ul').first());
            console.log('@@ NOTES @@ - writeNotes: Processing data...');
            $(data).convertToHtmlNotes(container);
            $('#notasPage').find('.desplegable li').each(function(index, el) {
                $(el).click(function(event) {
                    toggleCollapse(event, el);
                });
            });
            if ($('#notasPage #content > ul > li').length == 1) {
                $('#notasPage #content > ul > li h3').addClass('amagar');
                $('#notasPage #content > ul > li').addClass('actiu');
            }
            setAlert('#notes', $(data).find('nota').not(':contains("-")').length, false);
        } else {
            fetchNotesData(
                function() {
                    container.writeNotes();
                },
                function() {
                    localStorage.removeItem('uoc-notes-data-' + $.edu_uoc_Authentication.getCampusUsername());
                    $('#notasPage #content').writeNoNotes();
                }
            );
        }
    };
    $.fn.writeNoNotes = function(message) {
        if (message == null) {
            message = $.edu_uoc_Localization.getLocale('No-Notes');
        }
        var container = $(this);
        if(container.find('ul')) {
            container.find('ul').remove();
        }
        if(container.find('div')) {
            container.find('div').remove();
        }
        container.append(Mustache.to_html($('#notes-noitems-template').html(), {
            message: message
        }));
    };
})(jQuery);

(function($) {
  function parseImagesFromCSS(doc) {
    var i, j,
      rule,
      image,
      pattern = /url\((.*)\)/,
      properties = ['background-image', '-webkit-border-image'],
      images = {};

    if (doc.styleSheets) {
      for (i = 0; i < doc.styleSheets.length; ++i) {
        images = $.extend(images, parseImagesFromCSS(doc.styleSheets[i]));
      }
    } else if (doc.cssRules) {
      for (i = 0; i < doc.cssRules.length; ++i) {
        rule = doc.cssRules[i];
        if (rule.styleSheet) {
          images = $.extend(images, parseImagesFromCSS(rule.styleSheet));
        } else if (rule.style) {
          for (j=0; j < properties.length; j++) {
            image = pattern.exec(rule.style.getPropertyValue(properties[j]));
            if (image && image.length === 2) {
              images[image[1]] = image[0];
            }
          }
        }
      }
    }

    return images;
  };

  $.extend({
    preload: {
      images: function(doc) {
        doc = doc || document;
        var images = $.map(parseImagesFromCSS(doc), function(url) { return url; }),
          head = doc.getElementsByTagName('head')[0],
          style = doc.createElement('style');
        style.type = 'text/css';
        style.id = 'preload';
        style.innerHTML = 'body::after { content: ' + images.join(' ') + '; display: none; }';
        head.appendChild(style);
      }
    }
  });
})(jQuery);

$(function() {
    $('div[data-role="dialog"]').live('pagebeforeshow', function(e, ui) {
	ui.prevPage.addClass("ui-dialog-background ");
	});

    $('div[data-role="dialog"]').live('pagehide', function(e, ui) {
	$(".ui-dialog-background ").removeClass("ui-dialog-background ");
	});
});

self.addEventListener('message', function(e) {
    console.log('@@@@ NOTES WORKER @@@@');
    var params = e.data;
    var urlGet = params.urlBase + '/webapps/rac/rest/actividades/notas/' + params.session;
    if (params.envTest)
        urlGet = '../../notas.xml';
    console.log('@@ NOTES @@ - Fetching: ' + urlGet);


    var request = new XMLHttpRequest();

    try {
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status != 200) {
                console.log(request.responseText);
                throw "Error! Status " + request.status + " - " + request.statusText;
            }
        };
        request.open('GET', urlGet, false);
        request.send();
        self.postMessage({
            'xml': request.responseText
        });
    } catch (e) {
        self.postMessage({
            'error': e
        });
    }
}, false);

self.addEventListener('message', function(e) {
    console.log('@@@@ HOME WORKER @@@@');
    var params = e.data;
    var urlGet = params.urlBase + "/rb/inici/grid.rss?app:mobile=true&s=" + params.session + "&app:cache=false";

    var request = new XMLHttpRequest();

    console.log('@@@@ HOME WORKER Fetching: ' + urlGet);
    try {
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status != 200) {
                console.log(request.responseText);
                throw "Error! Status " + request.status + " - " + request.statusText;
            }
        };
        request.open('GET', urlGet, false);
        request.send();
        self.postMessage({
            'xml': request.responseText
        });
    } catch (e) {
        self.postMessage({
            'error': e
        });
    }
}, false);

function fetchMaterialsData(urlBase, session, userId, envTest) {
    debugger;
    var urlGet = urlBase + '/webapps/mymat/listAssigAct.action?s=' + session + '&userId=' + userId;


    /* SOLO PARA DESARROLLO */
    if (envTest)
        urlGet = '../../mat1.html';

    console.log('@@@ MATERIALS WORKER Fetching: ' + urlGet);

    var request = new XMLHttpRequest();

    var materialsObject = [];

    try {
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status != 200) {
                console.log(request.responseText);
                throw "Error! Status " + request.status + " - " + request.statusText;
            }
        };
        request.open('GET', urlGet, false);
        request.send();

        return request.responseText;

    } catch (e) {
        console.error(e);
    }
    /*$.ajax({
        url: urlGet,
        type: "GET",
        success: function(data) {
            var childrens = $(data).children('li');
            var liCounter = childrens.length;
            if (liCounter > 0) {
                childrens.each(
                    function() {
                        var title = $(this).find('a')
                            .text();
                        var codigo_asignatura = $(this)
                            .find('a:first-child')
                            .attr('href').split('=');
                        codigo_asignatura = codigo_asignatura[codigo_asignatura.length - 1];
                        fetchMaterialData(codigo_asignatura, function(data) {
                            liCounter = liCounter - 1;
                            console.log('Fetching Materials:' + liCounter);
                            data.title = title;
                            materialsObject.push(data);
                            if (liCounter == 0) {
                                console.log('Fetching Materials END!');
                                storeMaterialsData(materialsObject);
                                if (success_callback)
                                    success_callback();
                            }

                        });
                    });
            } else {
                storeMaterialsData(materialsObject);
                if (success_callback)
                    success_callback();
            }
        },
        error: function(jqXHR, errorType, exceptionObject) {
            if (jqXHR.error) {
                try {
                    $.edu_uoc_phonegap_GoogleAnalytics.trackException("Ajax Error on RSS: " + jqXHR.error().statusText + '[' + errorType + '] =>' + exceptionObject, false);
                    $.edu_uoc_phonegap_GoogleAnalytics.trackEvent('Rss Error: ' + data.error().statusText, 'User Type', $(session).find('profile').first().find('userType').text() + " - " + $(session).find('profile').first().find('userSubType').text());
                } catch (err) {}
            }
            if (error_callback)
                error_callback();
        }
    });*/
};

function fetchMaterialData(codigo_asignatura, success_callback) {
    // Fetch data from :http://cv.uoc.edu/webapps/mymat/listMatAct.action?s=403f582386cb5cab01b017d7945c0f2dec70a9a2bd37754145230f3487a21e983fd09442a4a0795ff271d19e37fa0834790ded73929267fee74d708ae6c2e14d&idLang=&userId=0&codAssig=06.515
    // "http://#{@whost}/webapps/mymat/listMaterialsAjax.action?s=#{@session_id}&userId=#{@user_id}&orig=widget&codAssig=#{codigo_asignatura}"
    //  http://#{@whost}/webapps/mymat/listMaterialsAjax.action?s=#{@session_id}&userId=#{@user_id}&codAssig=06.515
    var url = $.edu_uoc_Authentication.getCampusUrlBase() + '/webapps/mymat/listMaterialsAjax.action?s=' + $.edu_uoc_Authentication.getCampusSession() + '&userId=' + $.edu_uoc_Authentication.getCampusUserId() + '&codAssig=' + codigo_asignatura + '&orig=widget';
    /* SOLO PARA DESARROLLO */
    if (window.location.href.indexOf('cv-test') > 0)
        url = 'mat2.json';
    console.log('Fetching: ' + url);
    $
        .getJSON(
            url,
            function(data) {
                data.code = codigo_asignatura;
                success_callback(data);
            });
};


self.addEventListener('message', function(e) {
    debugger;
    console.log('@@@@ MATERIALS WORKER @@@@');
    var params = e.data;

    var jsonObject = fetchMaterialsData(params.urlBase, params.session, params.userId, params.envTest);

    self.postMessage({
        'json': jsonObject
    });
}, false);
